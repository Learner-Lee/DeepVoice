"""DeepVoice WebUI - FastAPI Application"""
import sys
import os
import json
import threading
import uuid
import asyncio
import tempfile
from pathlib import Path

ROOT = Path(__file__).parent.parent
DATA_PATH = ROOT / "KAGGLE" / "DATASET-balanced.csv"
CACHE_DIR = Path(__file__).parent / "cache"
CACHE_DIR.mkdir(exist_ok=True)
STATIC_DIR = Path(__file__).parent / "static"

from fastapi import FastAPI, UploadFile, File, HTTPException, Form
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse, StreamingResponse, JSONResponse
import pandas as pd
import numpy as np

app = FastAPI(title="DeepVoice AI 声音识别教学平台")
app.mount("/static", StaticFiles(directory=str(STATIC_DIR)), name="static")

# ── Job registry ──────────────────────────────────────────────────────────────
_jobs: dict = {}   # job_id -> {status, progress, result}
_jobs_lock = threading.Lock()


def _job_set(jid, **kwargs):
    with _jobs_lock:
        if jid not in _jobs:
            _jobs[jid] = {"status": "running", "progress": [], "result": None}
        _jobs[jid].update(kwargs)


def _job_append(jid, msg):
    with _jobs_lock:
        _jobs[jid]["progress"].append(msg)


def _run_model_bg(jid: str, model_name: str):
    try:
        from web.ml_runners import MODEL_RUNNERS
        _job_append(jid, f"⏳ 开始运行 {model_name} ...")
        result = MODEL_RUNNERS[model_name](progress_cb=lambda m: _job_append(jid, m))
        cache_file = CACHE_DIR / f"{model_name}.json"
        with open(cache_file, "w") as f:
            json.dump(result, f)
        _job_set(jid, status="done", result=result)
    except Exception as e:
        import traceback
        _job_set(jid, status="error", result={"error": str(e), "trace": traceback.format_exc()})


# ── Routes ────────────────────────────────────────────────────────────────────

@app.get("/")
async def index():
    return FileResponse(str(STATIC_DIR / "index.html"))


# ── Dashboard ─────────────────────────────────────────────────────────────────

@app.get("/api/dashboard")
async def dashboard():
    df = pd.read_csv(str(DATA_PATH))
    feat_df = df.drop("LABEL", axis=1)
    feat_names = feat_df.columns.tolist()

    label_counts = df["LABEL"].value_counts()
    n_real = int(label_counts.get("REAL", 0))
    n_fake = int(label_counts.get("FAKE", 0))

    real_df = df[df["LABEL"] == "REAL"].drop("LABEL", axis=1)
    fake_df = df[df["LABEL"] == "FAKE"].drop("LABEL", axis=1)

    feature_by_label = {}
    for col in feat_names:
        r = real_df[col]
        f = fake_df[col]
        feature_by_label[col] = {
            "real_mean": round(float(r.mean()), 4),
            "fake_mean": round(float(f.mean()), 4),
            "real_std": round(float(r.std()), 4),
            "fake_std": round(float(f.std()), 4),
            "real_q25": round(float(r.quantile(0.25)), 4),
            "real_q75": round(float(r.quantile(0.75)), 4),
            "fake_q25": round(float(f.quantile(0.25)), 4),
            "fake_q75": round(float(f.quantile(0.75)), 4),
        }

    # Overall feature stats for correlation-like overview
    feature_stats = {}
    for col in feat_names:
        c = feat_df[col]
        feature_stats[col] = {
            "mean": round(float(c.mean()), 4),
            "std": round(float(c.std()), 4),
            "min": round(float(c.min()), 4),
            "max": round(float(c.max()), 4),
        }

    return JSONResponse({
        "total": len(df),
        "real": n_real,
        "fake": n_fake,
        "features": feat_names,
        "feature_stats": feature_stats,
        "feature_by_label": feature_by_label,
    })


# ── ML Models ─────────────────────────────────────────────────────────────────

VALID_MODELS = ["logistic_regression", "random_forest", "svm", "xgboost", "knn", "mlp"]


@app.post("/api/models/{model_name}/run")
async def run_model(model_name: str):
    if model_name not in VALID_MODELS:
        raise HTTPException(status_code=404, detail=f"模型 {model_name} 不存在")

    cache_file = CACHE_DIR / f"{model_name}.json"
    if cache_file.exists():
        with open(cache_file) as f:
            return JSONResponse({"job_id": "cached", "cached": True, "result": json.load(f)})

    jid = model_name  # Use model name as job ID so only one run at a time
    with _jobs_lock:
        existing = _jobs.get(jid)
        if existing and existing["status"] == "running":
            return JSONResponse({"job_id": jid, "cached": False, "already_running": True})

    _jobs[jid] = {"status": "running", "progress": [], "result": None}
    t = threading.Thread(target=_run_model_bg, args=(jid, model_name), daemon=True)
    t.start()
    return JSONResponse({"job_id": jid, "cached": False})


@app.get("/api/models/{model_name}/cache")
async def get_cached(model_name: str):
    cache_file = CACHE_DIR / f"{model_name}.json"
    if cache_file.exists():
        with open(cache_file) as f:
            return JSONResponse({"cached": True, "result": json.load(f)})
    return JSONResponse({"cached": False})


@app.delete("/api/models/{model_name}/cache")
async def clear_cache(model_name: str):
    cache_file = CACHE_DIR / f"{model_name}.json"
    if cache_file.exists():
        cache_file.unlink()
    return JSONResponse({"cleared": True})


@app.get("/api/jobs/{jid}/stream")
async def stream_job(jid: str):
    """Server-Sent Events for job progress."""
    async def generator():
        sent = 0
        while True:
            with _jobs_lock:
                job = _jobs.get(jid)

            if job is None:
                yield f"data: {json.dumps({'type': 'error', 'message': 'Job not found'})}\n\n"
                return

            progress = job["progress"]
            for msg in progress[sent:]:
                yield f"data: {json.dumps({'type': 'progress', 'message': msg})}\n\n"
            sent = len(progress)

            if job["status"] == "done":
                yield f"data: {json.dumps({'type': 'done', 'result': job['result']})}\n\n"
                return
            elif job["status"] == "error":
                yield f"data: {json.dumps({'type': 'error', 'message': str(job['result'])})}\n\n"
                return

            await asyncio.sleep(0.5)

    return StreamingResponse(generator(), media_type="text/event-stream",
                             headers={"Cache-Control": "no-cache", "X-Accel-Buffering": "no"})


@app.get("/api/jobs/{jid}")
async def get_job(jid: str):
    with _jobs_lock:
        job = _jobs.get(jid)
    if job is None:
        raise HTTPException(status_code=404, detail="Job not found")
    return JSONResponse(job)


# ── Summary ───────────────────────────────────────────────────────────────────

@app.get("/api/summary")
async def summary():
    results = {}
    for m in VALID_MODELS:
        cache_file = CACHE_DIR / f"{m}.json"
        if cache_file.exists():
            with open(cache_file) as f:
                results[m] = json.load(f)
    return JSONResponse(results)


# ── Predict ───────────────────────────────────────────────────────────────────

@app.post("/api/predict")
async def predict(
    file: UploadFile = File(...),
    model_name: str = Form(default="random_forest")
):
    if model_name not in VALID_MODELS:
        raise HTTPException(status_code=400, detail=f"无效模型: {model_name}")

    suffix = Path(file.filename).suffix.lower() if file.filename else ".wav"
    if suffix not in (".wav", ".mp3", ".flac", ".ogg", ".m4a"):
        raise HTTPException(status_code=400, detail="不支持的音频格式，请上传 wav/mp3/flac")

    content = await file.read()
    if len(content) > 200 * 1024 * 1024:
        raise HTTPException(status_code=400, detail="文件过大 (最大200MB)")

    with tempfile.NamedTemporaryFile(suffix=suffix, delete=False) as tmp:
        tmp.write(content)
        tmp_path = tmp.name

    try:
        # Extract features from audio
        sys.path.insert(0, str(ROOT))
        from extract_features import extract_features as _extract

        feat_values = _extract(tmp_path)
        feat_names = [
            "chroma_stft", "rms", "spectral_centroid", "spectral_bandwidth",
            "rolloff", "zero_crossing_rate"
        ] + [f"mfcc{i}" for i in range(1, 21)]

        X = np.array(feat_values, dtype=float).reshape(1, -1)

        # Load trained model or train on-the-fly
        cache_file = CACHE_DIR / f"{model_name}.json"
        if not cache_file.exists():
            # Train quickly with fewer resources
            _train_quick(model_name)

        result = _predict_with_model(X, model_name, feat_names)
        return JSONResponse(result)
    except Exception as e:
        import traceback
        raise HTTPException(status_code=500, detail=f"预测失败: {str(e)}\n{traceback.format_exc()}")
    finally:
        os.unlink(tmp_path)


def _train_quick(model_name: str):
    """Quick training for prediction (no feature sweep)."""
    from web.ml_runners import load_data
    from sklearn.linear_model import LogisticRegression
    from sklearn.ensemble import RandomForestClassifier
    from sklearn.svm import SVC
    from sklearn.neighbors import KNeighborsClassifier
    from xgboost import XGBClassifier

    runners_map = {
        "logistic_regression": (True, lambda Xtr, ytr: LogisticRegression(max_iter=1000, random_state=42).fit(Xtr, ytr)),
        "random_forest": (False, lambda Xtr, ytr: RandomForestClassifier(n_estimators=100, random_state=42, n_jobs=-1).fit(Xtr, ytr)),
        "svm": (True, lambda Xtr, ytr: SVC(kernel="rbf", C=10, gamma="scale", random_state=42, probability=True).fit(Xtr, ytr)),
        "xgboost": (False, lambda Xtr, ytr: XGBClassifier(n_estimators=100, random_state=42, n_jobs=-1, eval_metric="logloss", verbosity=0).fit(Xtr, ytr)),
        "knn": (True, lambda Xtr, ytr: KNeighborsClassifier(n_neighbors=5).fit(Xtr, ytr)),
        "mlp": (True, None),
    }
    # Just run the full runner to populate cache
    from web.ml_runners import MODEL_RUNNERS
    result = MODEL_RUNNERS[model_name]()
    cache_file = CACHE_DIR / f"{model_name}.json"
    with open(cache_file, "w") as f:
        json.dump(result, f)


def _predict_with_model(X: np.ndarray, model_name: str, feat_names: list) -> dict:
    """Predict using a model trained on full dataset."""
    from web.ml_runners import load_data, MODEL_RUNNERS
    from sklearn.preprocessing import LabelEncoder, StandardScaler
    import pandas as pd

    df = pd.read_csv(str(DATA_PATH))
    X_all = df.drop("LABEL", axis=1).values
    y_all = LabelEncoder().fit_transform(df["LABEL"])

    needs_scale = model_name in ("logistic_regression", "svm", "knn", "mlp")
    scaler = None
    if needs_scale:
        scaler = StandardScaler()
        X_all_s = scaler.fit_transform(X_all)
        X_pred = scaler.transform(X)
    else:
        X_all_s = X_all
        X_pred = X

    if model_name == "logistic_regression":
        from sklearn.linear_model import LogisticRegression
        m = LogisticRegression(max_iter=1000, random_state=42)
        m.fit(X_all_s, y_all)
        pred = int(m.predict(X_pred)[0])
        proba = m.predict_proba(X_pred)[0].tolist()
    elif model_name == "random_forest":
        from sklearn.ensemble import RandomForestClassifier
        m = RandomForestClassifier(n_estimators=100, random_state=42, n_jobs=-1)
        m.fit(X_all_s, y_all)
        pred = int(m.predict(X_pred)[0])
        proba = m.predict_proba(X_pred)[0].tolist()
    elif model_name == "svm":
        from sklearn.svm import SVC
        m = SVC(kernel="rbf", C=10, gamma="scale", random_state=42, probability=True)
        m.fit(X_all_s, y_all)
        pred = int(m.predict(X_pred)[0])
        proba = m.predict_proba(X_pred)[0].tolist()
    elif model_name == "xgboost":
        from xgboost import XGBClassifier
        m = XGBClassifier(n_estimators=100, random_state=42, n_jobs=-1,
                          eval_metric="logloss", verbosity=0)
        m.fit(X_all_s, y_all)
        pred = int(m.predict(X_pred)[0])
        proba = m.predict_proba(X_pred)[0].tolist()
    elif model_name == "knn":
        from sklearn.neighbors import KNeighborsClassifier
        m = KNeighborsClassifier(n_neighbors=5)
        m.fit(X_all_s, y_all)
        pred = int(m.predict(X_pred)[0])
        proba = m.predict_proba(X_pred)[0].tolist()
    elif model_name == "mlp":
        from sklearn.neural_network import MLPClassifier
        m = MLPClassifier(hidden_layer_sizes=(128, 256, 128, 64), max_iter=300, random_state=42)
        m.fit(X_all_s, y_all)
        pred = int(m.predict(X_pred)[0])
        proba = m.predict_proba(X_pred)[0].tolist()
    else:
        raise ValueError(f"Unknown model: {model_name}")

    label = "REAL" if pred == 1 else "FAKE"
    confidence = round(float(max(proba)), 4)

    features_display = [
        {"name": feat_names[i], "value": round(float(X[0, i]), 6)}
        for i in range(len(feat_names))
    ]

    return {
        "label": label,
        "prediction": pred,
        "confidence": confidence,
        "fake_prob": round(float(proba[0]), 4),
        "real_prob": round(float(proba[1]), 4),
        "model_used": model_name,
        "features": features_display,
    }


if __name__ == "__main__":
    import socket
    # Check port availability
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    result = sock.connect_ex(("localhost", 8300))
    sock.close()
    if result == 0:
        print("错误: 端口 8300 已被占用！请选择其他端口。")
        sys.exit(1)

    import uvicorn
    print("DeepVoice 启动中... 访问 http://localhost:8300")
    uvicorn.run("web.app:app", host="0.0.0.0", port=8300, reload=False)
