"""ML Model Wrappers - adapted from ml/ scripts to return JSON-serializable dicts"""

import sys
from pathlib import Path

ROOT = Path(__file__).parent.parent
DATA_PATH = ROOT / "KAGGLE" / "DATASET-balanced.csv"

import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.metrics import classification_report, confusion_matrix, accuracy_score
from sklearn.feature_selection import f_classif


def load_data(scale=True):
    df = pd.read_csv(str(DATA_PATH))
    feature_names = df.drop("LABEL", axis=1).columns.tolist()
    X = df.drop("LABEL", axis=1).values
    y = LabelEncoder().fit_transform(df["LABEL"])  # FAKE=0, REAL=1

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )

    scaler = None
    if scale:
        scaler = StandardScaler()
        X_train = scaler.fit_transform(X_train)
        X_test = scaler.transform(X_test)

    return X_train, X_test, y_train, y_test, scaler, feature_names


def build_result(model_name, y_test, y_pred, feature_names,
                 feature_importance=None, training_curves=None, sweep_data=None, extra=None):
    acc = float(accuracy_score(y_test, y_pred))
    report = classification_report(y_test, y_pred, target_names=["FAKE", "REAL"], output_dict=True)
    cm = confusion_matrix(y_test, y_pred).tolist()

    result = {
        "model_name": model_name,
        "accuracy": acc,
        "metrics": {
            "FAKE": {k: float(v) for k, v in report["FAKE"].items()},
            "REAL": {k: float(v) for k, v in report["REAL"].items()},
            "macro avg": {k: float(v) for k, v in report["macro avg"].items()},
        },
        "confusion_matrix": cm,
        "feature_names": feature_names,
    }

    if feature_importance is not None:
        pairs = sorted(zip(feature_names, feature_importance.tolist()),
                       key=lambda x: x[1], reverse=True)
        result["feature_importance"] = [{"feature": f, "importance": float(i)} for f, i in pairs]

    if training_curves is not None:
        result["training_curves"] = training_curves

    if sweep_data is not None:
        result["sweep"] = sweep_data

    if extra:
        result.update(extra)

    return result


def find_knee(ks, accs):
    """Find inflection (elbow) and best k."""
    x = np.array(ks, dtype=float)
    y = np.array(accs, dtype=float)

    best_k = int(ks[int(np.argmax(y))])
    best_acc = float(np.max(y))

    if len(ks) < 3:
        return best_k, best_k, best_acc

    # Normalize to unit square
    x_n = (x - x[0]) / (x[-1] - x[0]) if x[-1] != x[0] else x
    y_range = y[-1] - y[0]
    y_n = (y - y[0]) / y_range if y_range != 0 else np.zeros_like(y)

    # Max distance from diagonal line
    distances = np.abs(y_n - x_n)
    inflection_k = int(ks[int(np.argmax(distances))])

    return inflection_k, best_k, best_acc


def run_feature_sweep(X_tr, y_tr, order, model_fn, cv=3, progress_cb=None):
    n = X_tr.shape[1]
    ks, accs = [], []
    for k in range(1, n + 1):
        idx = order[:k]
        scores = cross_val_score(model_fn(), X_tr[:, idx], y_tr, cv=cv,
                                 scoring="accuracy", n_jobs=-1)
        acc = float(scores.mean())
        ks.append(k)
        accs.append(acc)
        if progress_cb:
            progress_cb(f"  特征维度 k={k:2d}/{n}: CV准确率 = {acc:.4f}")

    inflection_k, best_k, best_acc = find_knee(ks, accs)
    return {
        "k_values": ks,
        "accuracies": accs,
        "best_k": best_k,
        "best_acc": best_acc,
        "inflection_k": inflection_k,
    }


# ── Model runners ─────────────────────────────────────────────────────────────

def run_logistic_regression(progress_cb=None):
    from sklearn.linear_model import LogisticRegression

    if progress_cb: progress_cb("正在加载数据集...")
    X_train, X_test, y_train, y_test, _, feat_names = load_data(scale=True)
    N = len(feat_names)

    if progress_cb: progress_cb("正在训练逻辑回归模型...")
    model = LogisticRegression(max_iter=1000, random_state=42)
    model.fit(X_train, y_train)
    y_pred = model.predict(X_test)

    coef = np.abs(model.coef_[0])

    # L1 sweep for feature ordering
    if progress_cb: progress_cb("正在计算L1正则化特征选择曲线...")
    C_values = np.logspace(-3, 3, 50)
    seen, l1_rows = set(), []
    for C in C_values:
        lr_l1 = LogisticRegression(penalty="l1", solver="saga", C=C, max_iter=2000, random_state=42)
        lr_l1.fit(X_train, y_train)
        idx = np.where(np.abs(lr_l1.coef_[0]) > 1e-6)[0]
        n = len(idx)
        if n == 0 or n in seen:
            continue
        seen.add(n)
        cv_acc = float(cross_val_score(
            LogisticRegression(max_iter=1000, random_state=42),
            X_train[:, idx], y_train, cv=3, scoring="accuracy", n_jobs=-1
        ).mean())
        l1_rows.append((n, cv_acc, idx.tolist()))
        if progress_cb:
            progress_cb(f"  L1特征数 k={n:2d}: CV准确率 = {cv_acc:.4f}")

    covered = {r[0]: r for r in l1_rows}
    all_ref = sorted(covered.keys())
    lr_ks, lr_accs = [], []
    for k in range(1, N + 1):
        if k in covered:
            _, acc, _ = covered[k]
        elif all_ref:
            nearest = min(all_ref, key=lambda x: abs(x - k))
            _, acc, _ = covered[nearest]
        else:
            acc = 0.5
        lr_ks.append(k)
        lr_accs.append(acc)

    inflection_k, best_k, best_acc = find_knee(lr_ks, lr_accs)
    sweep = {"k_values": lr_ks, "accuracies": lr_accs,
             "best_k": best_k, "best_acc": best_acc, "inflection_k": inflection_k}

    return build_result("逻辑回归 (Logistic Regression)",
                        y_test, y_pred, feat_names,
                        feature_importance=coef, sweep_data=sweep)


def run_random_forest(progress_cb=None):
    from sklearn.ensemble import RandomForestClassifier

    if progress_cb: progress_cb("正在加载数据集...")
    X_train, X_test, y_train, y_test, _, feat_names = load_data(scale=False)

    if progress_cb: progress_cb("正在训练随机森林模型 (200棵决策树)...")
    model = RandomForestClassifier(n_estimators=200, random_state=42, n_jobs=-1)
    model.fit(X_train, y_train)
    y_pred = model.predict(X_test)

    importance = model.feature_importances_
    order = np.argsort(importance)[::-1]

    if progress_cb: progress_cb("正在计算特征降维曲线...")
    sweep = run_feature_sweep(
        X_train, y_train, order,
        lambda: RandomForestClassifier(n_estimators=50, random_state=42, n_jobs=-1),
        cv=3, progress_cb=progress_cb
    )
    return build_result("随机森林 (Random Forest)",
                        y_test, y_pred, feat_names,
                        feature_importance=importance, sweep_data=sweep)


def run_svm(progress_cb=None):
    from sklearn.svm import SVC

    if progress_cb: progress_cb("正在加载数据集...")
    X_train, X_test, y_train, y_test, _, feat_names = load_data(scale=True)

    if progress_cb: progress_cb("正在训练SVM模型 (RBF核, C=10)...")
    model = SVC(kernel="rbf", C=10, gamma="scale", random_state=42)
    model.fit(X_train, y_train)
    y_pred = model.predict(X_test)

    # Linear SVM for feature ordering (faster than RFE)
    if progress_cb: progress_cb("正在用线性SVM计算特征重要性排序...")
    lin_svm = SVC(kernel="linear", C=1, random_state=42)
    lin_svm.fit(X_train, y_train)
    svm_coef = np.abs(lin_svm.coef_[0])
    order = np.argsort(svm_coef)[::-1]

    if progress_cb: progress_cb("正在计算特征降维曲线...")
    sweep = run_feature_sweep(
        X_train, y_train, order,
        lambda: SVC(kernel="rbf", C=10, gamma="scale", random_state=42),
        cv=3, progress_cb=progress_cb
    )
    return build_result("支持向量机 (SVM)",
                        y_test, y_pred, feat_names,
                        feature_importance=svm_coef, sweep_data=sweep)


def run_xgboost(progress_cb=None):
    from xgboost import XGBClassifier

    if progress_cb: progress_cb("正在加载数据集...")
    X_train, X_test, y_train, y_test, _, feat_names = load_data(scale=False)

    if progress_cb: progress_cb("正在训练XGBoost模型 (300棵树)...")
    model = XGBClassifier(
        n_estimators=300, learning_rate=0.05, max_depth=6,
        eval_metric="logloss", random_state=42, n_jobs=-1, verbosity=0
    )
    model.fit(X_train, y_train)
    y_pred = model.predict(X_test)

    importance = model.feature_importances_
    order = np.argsort(importance)[::-1]

    if progress_cb: progress_cb("正在计算特征降维曲线...")
    sweep = run_feature_sweep(
        X_train, y_train, order,
        lambda: XGBClassifier(n_estimators=50, random_state=42, n_jobs=-1,
                              eval_metric="logloss", verbosity=0),
        cv=3, progress_cb=progress_cb
    )
    return build_result("XGBoost (梯度提升树)",
                        y_test, y_pred, feat_names,
                        feature_importance=importance, sweep_data=sweep)


def run_knn(progress_cb=None):
    from sklearn.neighbors import KNeighborsClassifier

    if progress_cb: progress_cb("正在加载数据集...")
    X_train, X_test, y_train, y_test, _, feat_names = load_data(scale=True)

    if progress_cb: progress_cb("正在搜索最优K值 (k=1~20)...")
    best_k, best_score = 1, 0.0
    k_scores = []
    for k in range(1, 21):
        scores = cross_val_score(
            KNeighborsClassifier(n_neighbors=k), X_train, y_train,
            cv=5, scoring="accuracy", n_jobs=-1
        )
        mean = float(scores.mean())
        k_scores.append({"k": k, "cv_acc": mean})
        if mean > best_score:
            best_k, best_score = k, mean
        if progress_cb:
            progress_cb(f"  k={k:2d}: CV准确率 = {mean:.4f}")

    if progress_cb: progress_cb(f"最优 k={best_k}，正在训练KNN模型...")
    model = KNeighborsClassifier(n_neighbors=best_k)
    model.fit(X_train, y_train)
    y_pred = model.predict(X_test)

    scores_f, _ = f_classif(X_train, y_train)
    scores_f = np.nan_to_num(scores_f)
    order = np.argsort(scores_f)[::-1]

    if progress_cb: progress_cb("正在计算特征降维曲线...")
    sweep = run_feature_sweep(
        X_train, y_train, order,
        lambda: KNeighborsClassifier(n_neighbors=best_k),
        cv=3, progress_cb=progress_cb
    )

    result = build_result(f"K近邻 (KNN, best k={best_k})",
                          y_test, y_pred, feat_names,
                          feature_importance=scores_f, sweep_data=sweep)
    result["k_selection"] = k_scores
    result["best_k_value"] = best_k
    return result


def run_mlp(progress_cb=None):
    import torch
    import torch.nn as nn
    from torch.utils.data import DataLoader, TensorDataset
    from sklearn.ensemble import RandomForestClassifier
    from sklearn.neural_network import MLPClassifier

    if progress_cb: progress_cb("正在加载数据集...")
    X_train_raw, X_test_raw, y_train, y_test, _, feat_names = load_data(scale=False)

    scaler = StandardScaler()
    X_train = scaler.fit_transform(X_train_raw).astype(np.float32)
    X_test = scaler.transform(X_test_raw).astype(np.float32)
    y_train_t = y_train.astype(np.int64)
    y_test_t = y_test.astype(np.int64)

    train_ds = TensorDataset(torch.from_numpy(X_train), torch.from_numpy(y_train_t))
    test_ds = TensorDataset(torch.from_numpy(X_test), torch.from_numpy(y_test_t))
    train_loader = DataLoader(train_ds, batch_size=256, shuffle=True)
    test_loader = DataLoader(test_ds, batch_size=256)

    class MLPNet(nn.Module):
        def __init__(self, in_dim=26):
            super().__init__()
            self.net = nn.Sequential(
                nn.Linear(in_dim, 128), nn.BatchNorm1d(128), nn.ReLU(), nn.Dropout(0.3),
                nn.Linear(128, 256), nn.BatchNorm1d(256), nn.ReLU(), nn.Dropout(0.3),
                nn.Linear(256, 128), nn.BatchNorm1d(128), nn.ReLU(), nn.Dropout(0.2),
                nn.Linear(128, 64), nn.BatchNorm1d(64), nn.ReLU(),
                nn.Linear(64, 2),
            )
        def forward(self, x): return self.net(x)

    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    net = MLPNet().to(device)
    optimizer = torch.optim.Adam(net.parameters(), lr=1e-3, weight_decay=1e-4)
    scheduler = torch.optim.lr_scheduler.ReduceLROnPlateau(optimizer, patience=5, factor=0.5)
    criterion = nn.CrossEntropyLoss()

    EPOCHS = 100
    best_val_acc, best_state = 0.0, None
    training_curves = []

    if progress_cb: progress_cb(f"开始训练PyTorch MLP神经网络 (共{EPOCHS}轮)...")

    for epoch in range(1, EPOCHS + 1):
        net.train()
        total_loss, correct, total = 0.0, 0, 0
        for xb, yb in train_loader:
            xb, yb = xb.to(device), yb.to(device)
            optimizer.zero_grad()
            out = net(xb)
            loss = criterion(out, yb)
            loss.backward()
            optimizer.step()
            total_loss += loss.item() * len(yb)
            correct += (out.argmax(1) == yb).sum().item()
            total += len(yb)
        train_loss = total_loss / total
        train_acc = correct / total

        net.eval()
        vc, vt = 0, 0
        with torch.no_grad():
            for xb, yb in test_loader:
                xb, yb = xb.to(device), yb.to(device)
                vc += (net(xb).argmax(1) == yb).sum().item()
                vt += len(yb)
        val_acc = vc / vt
        scheduler.step(1 - val_acc)

        if val_acc > best_val_acc:
            best_val_acc = val_acc
            best_state = {k: v.clone() for k, v in net.state_dict().items()}

        training_curves.append({
            "epoch": epoch,
            "train_loss": round(float(train_loss), 4),
            "train_acc": round(float(train_acc), 4),
            "val_acc": round(float(val_acc), 4),
        })

        if epoch % 10 == 0 and progress_cb:
            progress_cb(f"  Epoch {epoch:3d}/{EPOCHS}: 训练准确率={train_acc:.4f}, 验证准确率={val_acc:.4f}")

    net.load_state_dict(best_state)
    net.eval()
    preds = []
    with torch.no_grad():
        for xb, _ in test_loader:
            preds.append(net(xb.to(device)).argmax(1).cpu().numpy())
    y_pred = np.concatenate(preds)

    # Feature sweep using sklearn MLP (faster for CV)
    if progress_cb: progress_cb("正在计算特征降维曲线 (使用sklearn MLP)...")
    rf_tmp = RandomForestClassifier(n_estimators=100, random_state=42, n_jobs=-1)
    rf_tmp.fit(X_train_raw, y_train)
    order = np.argsort(rf_tmp.feature_importances_)[::-1]

    sweep = run_feature_sweep(
        X_train, y_train,
        order,
        lambda: MLPClassifier(hidden_layer_sizes=(128, 256, 128, 64),
                               max_iter=200, random_state=42, early_stopping=True),
        cv=3, progress_cb=progress_cb
    )

    result = build_result("多层感知机 (MLP, PyTorch)",
                          y_test_t, y_pred, feat_names,
                          training_curves=training_curves, sweep_data=sweep)
    result["best_val_acc"] = round(float(best_val_acc), 4)
    return result


MODEL_RUNNERS = {
    "logistic_regression": run_logistic_regression,
    "random_forest": run_random_forest,
    "svm": run_svm,
    "xgboost": run_xgboost,
    "knn": run_knn,
    "mlp": run_mlp,
}
