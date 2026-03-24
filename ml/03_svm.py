"""模型 3：支持向量机（SVM，RBF 核）"""
from utils import load_data, report
from sklearn.svm import SVC

X_train, X_test, y_train, y_test = load_data(scale=True)

model = SVC(kernel="rbf", C=10, gamma="scale", random_state=42)
model.fit(X_train, y_train)

report("SVM (RBF kernel)", y_test, model.predict(X_test))
