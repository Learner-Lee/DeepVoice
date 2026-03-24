"""公共工具：加载数据、评估报告"""
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.metrics import classification_report, confusion_matrix, accuracy_score
import numpy as np

DATA_PATH = "../KAGGLE/DATASET-balanced.csv"


def load_data(scale=True):
    df = pd.read_csv(DATA_PATH)
    X = df.drop("LABEL", axis=1).values
    y = LabelEncoder().fit_transform(df["LABEL"])   # FAKE=0, REAL=1

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )

    if scale:
        scaler = StandardScaler()
        X_train = scaler.fit_transform(X_train)
        X_test  = scaler.transform(X_test)

    return X_train, X_test, y_train, y_test


def report(name, y_test, y_pred):
    acc = accuracy_score(y_test, y_pred)
    print(f"\n{'='*50}")
    print(f"  {name}")
    print(f"{'='*50}")
    print(f"Accuracy : {acc:.4f}")
    print(classification_report(y_test, y_pred, target_names=["FAKE", "REAL"]))
    cm = confusion_matrix(y_test, y_pred)
    print("Confusion Matrix:")
    print(f"  {'':6s} FAKE  REAL")
    print(f"  FAKE   {cm[0,0]:4d}  {cm[0,1]:4d}")
    print(f"  REAL   {cm[1,0]:4d}  {cm[1,1]:4d}")
