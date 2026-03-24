"""模型 2：随机森林（Random Forest）"""
from utils import load_data, report
from sklearn.ensemble import RandomForestClassifier

X_train, X_test, y_train, y_test = load_data(scale=False)   # 树模型不需要标准化

model = RandomForestClassifier(n_estimators=200, random_state=42, n_jobs=-1)
model.fit(X_train, y_train)

report("Random Forest", y_test, model.predict(X_test))

# 特征重要性 Top 10
import pandas as pd, numpy as np
feat_names = pd.read_csv("../KAGGLE/DATASET-balanced.csv").drop("LABEL", axis=1).columns
importance = pd.Series(model.feature_importances_, index=feat_names).sort_values(ascending=False)
print("\nFeature Importance (Top 10):")
print(importance.head(10).to_string())
