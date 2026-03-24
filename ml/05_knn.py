"""模型 5：K 近邻（KNN）"""
from utils import load_data, report
from sklearn.neighbors import KNeighborsClassifier
from sklearn.model_selection import cross_val_score
import numpy as np

X_train, X_test, y_train, y_test = load_data(scale=True)

# 用交叉验证选最优 k
print("搜索最优 k (1~20)...")
best_k, best_score = 1, 0
for k in range(1, 21):
    scores = cross_val_score(
        KNeighborsClassifier(n_neighbors=k), X_train, y_train, cv=5, scoring="accuracy"
    )
    mean = scores.mean()
    print(f"  k={k:2d}: cv_acc={mean:.4f}")
    if mean > best_score:
        best_k, best_score = k, mean

print(f"\n最优 k={best_k}，CV accuracy={best_score:.4f}")
model = KNeighborsClassifier(n_neighbors=best_k)
model.fit(X_train, y_train)

report(f"KNN (k={best_k})", y_test, model.predict(X_test))
