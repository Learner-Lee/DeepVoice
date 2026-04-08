"""SpecRNet Runner — loads pre-trained model, runs demo evaluation, single-file prediction."""

import sys
import json
import threading
import numpy as np
import pandas as pd
from pathlib import Path

DL_DIR = Path(__file__).parent.parent / "DL" / "specrnet-deepfake-detection"
ROOT = Path(__file__).parent.parent
CHECKPOINT = DL_DIR / "results_paper_aligned" / "default" / "seed_42" / "best_specrnet_default_seed42.pt"
PKG_DIR = DL_DIR / "int6068_final_package"
TRAIN_LOG = DL_DIR / "results_paper_aligned" / "default" / "seed_42" / "train_log.csv"
SUMMARY_JSON = DL_DIR / "results_paper_aligned" / "default" / "seed_42" / "summary.json"
KAGGLE_AUDIO = ROOT / "KAGGLE" / "AUDIO"

# Cache loaded model globally (thread-safe via lock)
_model = None
_model_lock = threading.Lock()


def _ensure_dl_in_path():
    dl_str = str(DL_DIR)
    if dl_str not in sys.path:
        sys.path.insert(0, dl_str)


def load_precomputed_results() -> dict:
    """Return pre-computed training + evaluation results from CSV/JSON files."""
    out = {}

    # Training curves (seed 42)
    if TRAIN_LOG.exists():
        df = pd.read_csv(TRAIN_LOG)
        out["training_curves"] = df.to_dict(orient="records")

    # Baseline: 3-seed results
    bl_path = PKG_DIR / "baseline_table.csv"
    if bl_path.exists():
        out["baseline_results"] = pd.read_csv(bl_path).to_dict(orient="records")

    # Ablation study
    ext_path = PKG_DIR / "extension_table.csv"
    if ext_path.exists():
        out["ablation_results"] = pd.read_csv(ext_path).to_dict(orient="records")

    # Speed / complexity table
    speed_path = PKG_DIR / "speed_complexity_table.csv"
    if speed_path.exists():
        out["speed_results"] = pd.read_csv(speed_path).to_dict(orient="records")

    # Summary (params, best_epoch, best_f1, inference_ms)
    if SUMMARY_JSON.exists():
        out["summary"] = json.loads(SUMMARY_JSON.read_text())

    return out


def _load_model():
    """Load and cache the SpecRNet model (CPU)."""
    global _model
    with _model_lock:
        if _model is not None:
            return _model

        _ensure_dl_in_path()
        import torch
        from model import SpecRNet
        from config import get_specrnet_config

        ckpt = torch.load(str(CHECKPOINT), map_location="cpu", weights_only=False)
        conf = ckpt.get("config") or get_specrnet_config(input_channels=1, variant="default", seed=42)
        variant = ckpt.get("variant", "default")

        model = SpecRNet(conf, variant=variant, device="cpu")
        model.load_state_dict(ckpt["state_dict"])
        model.eval()
        _model = model
        return _model


def extract_lfcc(audio_path: str, n_lfcc: int = 80, n_frames: int = 404, sr: int = 16000) -> np.ndarray:
    """Extract LFCC features from audio file → numpy [n_lfcc, n_frames]."""
    import librosa
    from scipy.fft import dct

    y, _ = librosa.load(audio_path, sr=sr, mono=True)

    # Pad or trim to exactly 4 seconds
    target = sr * 4
    if len(y) < target:
        y = np.pad(y, (0, target - len(y)), mode="wrap")
    else:
        y = y[:target]

    # Short-Time Fourier Transform
    stft = np.abs(librosa.stft(y, n_fft=512, hop_length=160, win_length=400))

    # Linear filterbank
    freqs = np.linspace(0, sr / 2, stft.shape[0])
    edges = np.linspace(0, sr / 2, n_lfcc + 2)
    fb = np.zeros((n_lfcc, len(freqs)), dtype=np.float32)
    for i in range(1, n_lfcc + 1):
        l, c, r = edges[i - 1], edges[i], edges[i + 1]
        fb[i - 1] = np.maximum(
            0.0,
            np.minimum((freqs - l) / (c - l + 1e-10), (r - freqs) / (r - c + 1e-10)),
        )

    energies = np.log(np.dot(fb, stft) + 1e-6)
    lfcc = dct(energies, type=2, axis=0, norm="ortho")[:n_lfcc].astype(np.float32)

    # Pad/trim time axis
    if lfcc.shape[1] < n_frames:
        lfcc = np.pad(lfcc, ((0, 0), (0, n_frames - lfcc.shape[1])), mode="edge")
    else:
        lfcc = lfcc[:, :n_frames]

    # Per-sample normalisation
    mu, sigma = lfcc.mean(), lfcc.std()
    lfcc = (lfcc - mu) / (sigma + 1e-6)
    return lfcc


def predict_audio(audio_path: str) -> dict:
    """Predict a single audio file. Returns dict with label, probs, confidence."""
    import torch

    model = _load_model()
    lfcc = extract_lfcc(audio_path)
    x = torch.from_numpy(lfcc).unsqueeze(0).unsqueeze(0)  # [1,1,80,404]

    with torch.no_grad():
        logits = model(x)
        probs = torch.softmax(logits, dim=1)[0].numpy()
        pred = int(np.argmax(probs))

    return {
        "label": "FAKE" if pred == 1 else "REAL",
        "prediction": pred,
        "real_prob": round(float(probs[0]), 4),
        "fake_prob": round(float(probs[1]), 4),
        "confidence": round(float(probs.max()), 4),
    }


def run_demo_evaluation(max_per_class: int = 20, progress_cb=None) -> dict:
    """
    Run SpecRNet inference on a sample of KAGGLE/AUDIO files.
    Returns accuracy, F1, confusion matrix, and per-file breakdown.
    """
    from sklearn.metrics import (
        accuracy_score, f1_score, roc_auc_score, confusion_matrix, precision_score, recall_score
    )

    if progress_cb:
        progress_cb("正在加载 SpecRNet 模型 (seed=42, default variant)...")
    _load_model()

    if not KAGGLE_AUDIO.exists():
        raise RuntimeError("未找到 KAGGLE/AUDIO 目录，请确保数据卷已挂载")

    # Collect audio files
    audio_files = []
    for label_name, label_id in [("REAL", 0), ("FAKE", 1)]:
        folder = KAGGLE_AUDIO / label_name
        wavs = sorted(folder.glob("*.wav"))[:max_per_class] if folder.exists() else []
        for w in wavs:
            audio_files.append((str(w), label_id, label_name))

    if not audio_files:
        raise RuntimeError("未找到音频文件")

    if progress_cb:
        progress_cb(f"共 {len(audio_files)} 个音频文件（REAL × {sum(1 for _,l,_ in audio_files if l==0)}，FAKE × {sum(1 for _,l,_ in audio_files if l==1)}）")

    y_true, y_pred, y_prob = [], [], []
    per_file = []

    for i, (path, true_id, true_name) in enumerate(audio_files):
        fname = Path(path).name
        if progress_cb and i % 5 == 0:
            progress_cb(f"  [{i+1:2d}/{len(audio_files)}] 推理: {fname}")

        result = predict_audio(path)
        y_true.append(true_id)
        y_pred.append(result["prediction"])
        y_prob.append(result["fake_prob"])
        per_file.append({
            "file": fname,
            "true": true_name,
            "pred": result["label"],
            "confidence": result["confidence"],
            "correct": true_id == result["prediction"],
        })

    if progress_cb:
        progress_cb("✅ 推理完成，正在计算指标...")

    acc = float(accuracy_score(y_true, y_pred))
    f1 = float(f1_score(y_true, y_pred, zero_division=0))
    prec = float(precision_score(y_true, y_pred, zero_division=0))
    rec = float(recall_score(y_true, y_pred, zero_division=0))
    cm = confusion_matrix(y_true, y_pred, labels=[0, 1]).tolist()

    auc = None
    if len(set(y_true)) > 1:
        try:
            auc = round(float(roc_auc_score(y_true, y_prob)), 4)
        except Exception:
            pass

    return {
        "accuracy": round(acc, 4),
        "f1": round(f1, 4),
        "precision": round(prec, 4),
        "recall": round(rec, 4),
        "auc": auc,
        "confusion_matrix": cm,
        "n_samples": len(audio_files),
        "per_file": per_file,
    }
