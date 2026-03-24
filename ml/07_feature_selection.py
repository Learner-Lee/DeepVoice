"""
6 模型特征降维对比实验
每个模型在 k=1~26 维特征下做 5 折交叉验证，输出折线对比图。

降维策略：
  LR    : L1 正则(变化C) → 非零系数特征集 → 重训练标准 LR
  SVM   : 一次 RFE 得到特征排序 → 逐步增加 k → SVM(RBF)
  XGB   : XGBoost gain 重要性排序 → 逐步增加 k → XGBoost
  KNN   : f_classif 统计排序 → 逐步增加 k → KNN
  RF    : RF 重要性排序 → 逐步增加 k → RF
  MLP   : RF 重要性排序(借用) → 逐步增加 k → MLP(sklearn)
"""

import numpy as np
import pandas as pd
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import matplotlib.ticker as ticker
import warnings
warnings.filterwarnings("ignore")

from sklearn.model_selection import cross_val_score, train_test_split
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.svm import SVC
from sklearn.ensemble import RandomForestClassifier
from sklearn.neighbors import KNeighborsClassifier
from sklearn.neural_network import MLPClassifier
from sklearn.feature_selection import SelectKBest, f_classif, RFE
from xgboost import XGBClassifier

# ── 数据 ─────────────────────────────────────────────────
df = pd.read_csv("../KAGGLE/DATASET-balanced.csv")
feat_names = np.array(df.drop("LABEL", axis=1).columns.tolist())
X = df.drop("LABEL", axis=1).values
y = LabelEncoder().fit_transform(df["LABEL"])
N = len(feat_names)

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)
scaler = StandardScaler()
Xs_train = scaler.fit_transform(X_train)
Xs_test  = scaler.transform(X_test)

CV = 5

def cv_acc(Xtr, ytr, model):
    return cross_val_score(model, Xtr, ytr, cv=CV, scoring="accuracy", n_jobs=-1).mean()

def _best(ks, accs, idxs):
    """返回 (best_k, best_acc, best_feature_idx)，acc 相同时取更少维度"""
    best_i = max(range(len(ks)), key=lambda i: (accs[i], -ks[i]))
    return ks[best_i], accs[best_i], np.array(idxs[best_i])

def sweep(ranking_idx, Xtr, ytr, model_fn, label):
    """按 ranking_idx 顺序逐步增加特征，返回 (k_list, acc_list)"""
    ks, accs = [], []
    for k in range(1, N + 1):
        idx = ranking_idx[:k]
        acc = cv_acc(Xtr[:, idx], ytr, model_fn())
        ks.append(k); accs.append(acc)
        print(f"  [{label}] k={k:2d}  cv_acc={acc:.4f}")
    return ks, accs


results = {}   # method -> (ks, accs, best_k, best_acc, best_features)

# ══════════════════════════════════════════════════════════
# 1. Logistic Regression (L1)
# ══════════════════════════════════════════════════════════
print("\n[1/6] Logistic Regression (L1) ...")
C_values = np.logspace(-3, 3, 80)
seen, l1_rows = set(), []
for C in C_values:
    lr = LogisticRegression(penalty="l1", solver="saga", C=C, max_iter=3000, random_state=42)
    lr.fit(Xs_train, y_train)
    idx = np.where(np.abs(lr.coef_[0]) > 1e-6)[0]
    n = len(idx)
    if n == 0 or n in seen: continue
    seen.add(n)
    acc = cv_acc(Xs_train[:, idx], y_train,
                 LogisticRegression(max_iter=1000, random_state=42))
    l1_rows.append((n, acc, idx.copy()))
    print(f"  [LR]  C={C:.5f}  k={n:2d}  cv_acc={acc:.4f}")

# 补全缺失的 k（用最近邻特征集插值）
covered = {r[0]: r for r in l1_rows}
all_idx_ref = sorted(covered.keys())
lr_ks, lr_accs, lr_idxs = [], [], []
for k in range(1, N + 1):
    if k in covered:
        _, acc, idx = covered[k]
    else:
        # 找最近的已有 k
        nearest = min(all_idx_ref, key=lambda x: abs(x - k))
        _, acc, idx = covered[nearest]
    lr_ks.append(k); lr_accs.append(acc); lr_idxs.append(idx)

results["LR (L1)"] = (lr_ks, lr_accs,
                      *_best(lr_ks, lr_accs, lr_idxs))


# ══════════════════════════════════════════════════════════
# 2. SVM (RFE 排序)
# ══════════════════════════════════════════════════════════
print("\n[2/6] SVM + RFE ranking ...")
rfe = RFE(SVC(kernel="linear", C=1, random_state=42), n_features_to_select=1, step=1)
rfe.fit(Xs_train, y_train)
# ranking_: 1 = 最先选，越大越晚选 → 反转得到重要性排序
svm_order = np.argsort(rfe.ranking_)   # 最重要在前

ks, accs = sweep(svm_order, Xs_train, y_train,
                 lambda: SVC(kernel="rbf", C=10, gamma="scale", random_state=42), "SVM")
idxs = [svm_order[:k].tolist() for k in ks]
results["SVM (RFE)"] = (ks, accs, *_best(ks, accs, idxs))


# ══════════════════════════════════════════════════════════
# 3. XGBoost (gain 重要性)
# ══════════════════════════════════════════════════════════
print("\n[3/6] XGBoost (gain importance) ...")
xgb_full = XGBClassifier(n_estimators=200, random_state=42, n_jobs=-1,
                         eval_metric="logloss", verbosity=0)
xgb_full.fit(X_train, y_train)
xgb_order = np.argsort(xgb_full.feature_importances_)[::-1]

ks, accs = sweep(xgb_order, X_train, y_train,
                 lambda: XGBClassifier(n_estimators=100, random_state=42,
                                       n_jobs=-1, eval_metric="logloss", verbosity=0), "XGB")
idxs = [xgb_order[:k].tolist() for k in ks]
results["XGBoost"] = (ks, accs, *_best(ks, accs, idxs))


# ══════════════════════════════════════════════════════════
# 4. KNN (f_classif 排序)
# ══════════════════════════════════════════════════════════
print("\n[4/6] KNN (f_classif ranking) ...")
scores_f, _ = f_classif(Xs_train, y_train)
knn_order = np.argsort(scores_f)[::-1]

ks, accs = sweep(knn_order, Xs_train, y_train,
                 lambda: KNeighborsClassifier(n_neighbors=3), "KNN")
idxs = [knn_order[:k].tolist() for k in ks]
results["KNN"] = (ks, accs, *_best(ks, accs, idxs))


# ══════════════════════════════════════════════════════════
# 5. Random Forest (RF 重要性)
# ══════════════════════════════════════════════════════════
print("\n[5/6] Random Forest (importance ranking) ...")
rf_full = RandomForestClassifier(n_estimators=200, random_state=42, n_jobs=-1)
rf_full.fit(X_train, y_train)
rf_order = np.argsort(rf_full.feature_importances_)[::-1]

ks, accs = sweep(rf_order, X_train, y_train,
                 lambda: RandomForestClassifier(n_estimators=100, random_state=42, n_jobs=-1), "RF")
idxs = [rf_order[:k].tolist() for k in ks]
results["Random Forest"] = (ks, accs, *_best(ks, accs, idxs))


# ══════════════════════════════════════════════════════════
# 6. MLP (借用 RF 重要性排序)
# ══════════════════════════════════════════════════════════
print("\n[6/6] MLP (RF importance ranking) ...")
ks, accs = sweep(rf_order, Xs_train, y_train,
                 lambda: MLPClassifier(hidden_layer_sizes=(128, 256, 128, 64),
                                       max_iter=300, random_state=42,
                                       early_stopping=True, validation_fraction=0.1), "MLP")
idxs = [rf_order[:k].tolist() for k in ks]
results["MLP"] = (ks, accs, *_best(ks, accs, idxs))


# ══════════════════════════════════════════════════════════
# 汇总打印
# ══════════════════════════════════════════════════════════
print("\n" + "="*60)
print(f"{'模型':<18} {'最优k':>6} {'CV-Acc':>8}  最优特征集")
print("="*60)
for method, (ks, accs, bk, ba, bidx) in results.items():
    feats = feat_names[bidx].tolist()
    print(f"{method:<18} {bk:>6} {ba:>8.4f}  {feats}")


# ══════════════════════════════════════════════════════════
# 绘图
# ══════════════════════════════════════════════════════════
COLORS = {
    "LR (L1)":      "#4C72B0",
    "SVM (RFE)":    "#DD8452",
    "XGBoost":      "#55A868",
    "KNN":          "#C44E52",
    "Random Forest":"#8172B2",
    "MLP":          "#937860",
}
MARKERS = {"LR (L1)": "o", "SVM (RFE)": "s", "XGBoost": "^",
           "KNN": "D", "Random Forest": "P", "MLP": "X"}

fig, (ax_main, ax_zoom) = plt.subplots(1, 2, figsize=(16, 6))
fig.suptitle("Feature Dimensionality Reduction: All 6 Models", fontsize=14, fontweight="bold")

for method, (ks, accs, bk, ba, bidx) in results.items():
    c, m = COLORS[method], MARKERS[method]
    for ax in (ax_main, ax_zoom):
        ax.plot(ks, accs, color=c, marker=m, markersize=4,
                linewidth=1.8, label=method, zorder=2)
        ax.scatter([bk], [ba], color=c, s=120, edgecolors="black",
                   linewidths=1.2, zorder=5)

# 主图
ax_main.set_title("Full Range (k=1~26)")
ax_main.set_xlabel("Number of Features")
ax_main.set_ylabel("CV Accuracy (5-fold)")
ax_main.set_xlim(0, N + 1)
ax_main.xaxis.set_major_locator(ticker.MultipleLocator(2))
ax_main.grid(True, alpha=0.3)
ax_main.legend(fontsize=9, loc="lower right")

# 局部放大图（高准确率区域）
all_accs = [a for _, accs, *_ in results.values() for a in accs]
zoom_min = max(0.88, np.percentile(all_accs, 10) - 0.01)
ax_zoom.set_title("Zoomed (high accuracy region)")
ax_zoom.set_xlabel("Number of Features")
ax_zoom.set_ylabel("CV Accuracy (5-fold)")
ax_zoom.set_xlim(0, N + 1)
ax_zoom.set_ylim(zoom_min, 1.002)
ax_zoom.xaxis.set_major_locator(ticker.MultipleLocator(2))
ax_zoom.grid(True, alpha=0.3)
ax_zoom.legend(fontsize=9, loc="lower right")

# 标注最优点（仅在放大图）
for method, (ks, accs, bk, ba, bidx) in results.items():
    ax_zoom.annotate(f"{method}\nk={bk},{ba:.4f}",
                     xy=(bk, ba),
                     xytext=(bk + 0.3, ba + (0.0005 * (list(results.keys()).index(method) - 2))),
                     fontsize=7, color=COLORS[method],
                     arrowprops=dict(arrowstyle="->", color=COLORS[method], lw=0.8))

plt.tight_layout()
out_path = "../feature_selection.png"
plt.savefig(out_path, dpi=150, bbox_inches="tight")
print(f"\n折线图已保存至: {out_path}")
