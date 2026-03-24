"""模型 4：XGBoost（梯度提升树）"""
from utils import load_data, report
from xgboost import XGBClassifier

X_train, X_test, y_train, y_test = load_data(scale=False)

model = XGBClassifier(
    n_estimators=300,
    learning_rate=0.05,
    max_depth=6,
    use_label_encoder=False,
    eval_metric="logloss",
    random_state=42,
    n_jobs=-1,
)
model.fit(X_train, y_train)

report("XGBoost", y_test, model.predict(X_test))
