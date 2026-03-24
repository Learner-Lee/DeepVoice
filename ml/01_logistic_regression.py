"""模型 1：逻辑回归（Logistic Regression）"""
from utils import load_data, report
from sklearn.linear_model import LogisticRegression

X_train, X_test, y_train, y_test = load_data(scale=True)

model = LogisticRegression(max_iter=1000, random_state=42)
model.fit(X_train, y_train)

report("Logistic Regression", y_test, model.predict(X_test))
