"""模型 6：多层感知机（MLP，PyTorch 实现）"""
import numpy as np
import pandas as pd
import torch
import torch.nn as nn
from torch.utils.data import DataLoader, TensorDataset
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.metrics import classification_report, confusion_matrix, accuracy_score

# ── 数据加载 ──────────────────────────────────────────────
df = pd.read_csv("../KAGGLE/DATASET-balanced.csv")
X = df.drop("LABEL", axis=1).values.astype(np.float32)
y = LabelEncoder().fit_transform(df["LABEL"]).astype(np.int64)

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

scaler = StandardScaler()
X_train = scaler.fit_transform(X_train).astype(np.float32)
X_test  = scaler.transform(X_test).astype(np.float32)

train_ds = TensorDataset(torch.from_numpy(X_train), torch.from_numpy(y_train))
test_ds  = TensorDataset(torch.from_numpy(X_test),  torch.from_numpy(y_test))
train_loader = DataLoader(train_ds, batch_size=256, shuffle=True)
test_loader  = DataLoader(test_ds,  batch_size=256)

# ── 模型定义 ──────────────────────────────────────────────
class MLP(nn.Module):
    def __init__(self, in_dim=26):
        super().__init__()
        self.net = nn.Sequential(
            nn.Linear(in_dim, 128), nn.BatchNorm1d(128), nn.ReLU(), nn.Dropout(0.3),
            nn.Linear(128, 256),    nn.BatchNorm1d(256), nn.ReLU(), nn.Dropout(0.3),
            nn.Linear(256, 128),    nn.BatchNorm1d(128), nn.ReLU(), nn.Dropout(0.2),
            nn.Linear(128, 64),     nn.BatchNorm1d(64),  nn.ReLU(),
            nn.Linear(64, 2),
        )

    def forward(self, x):
        return self.net(x)

# ── 训练 ──────────────────────────────────────────────────
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
print(f"使用设备: {device}")

model = MLP().to(device)
optimizer = torch.optim.Adam(model.parameters(), lr=1e-3, weight_decay=1e-4)
scheduler = torch.optim.lr_scheduler.ReduceLROnPlateau(optimizer, patience=5, factor=0.5)
criterion = nn.CrossEntropyLoss()

EPOCHS = 100
best_val_acc, best_state = 0.0, None

print(f"\n{'Epoch':>6} {'Train Loss':>12} {'Train Acc':>10} {'Val Acc':>10} {'LR':>10}")
print("-" * 54)

for epoch in range(1, EPOCHS + 1):
    # 训练
    model.train()
    total_loss, correct, total = 0.0, 0, 0
    for xb, yb in train_loader:
        xb, yb = xb.to(device), yb.to(device)
        optimizer.zero_grad()
        out = model(xb)
        loss = criterion(out, yb)
        loss.backward()
        optimizer.step()
        total_loss += loss.item() * len(yb)
        correct += (out.argmax(1) == yb).sum().item()
        total += len(yb)
    train_loss = total_loss / total
    train_acc  = correct / total

    # 验证
    model.eval()
    val_correct, val_total = 0, 0
    with torch.no_grad():
        for xb, yb in test_loader:
            xb, yb = xb.to(device), yb.to(device)
            val_correct += (model(xb).argmax(1) == yb).sum().item()
            val_total += len(yb)
    val_acc = val_correct / val_total

    scheduler.step(1 - val_acc)

    if val_acc > best_val_acc:
        best_val_acc = val_acc
        best_state = {k: v.clone() for k, v in model.state_dict().items()}

    if epoch % 10 == 0 or epoch == 1:
        lr = optimizer.param_groups[0]["lr"]
        print(f"{epoch:>6} {train_loss:>12.4f} {train_acc:>10.4f} {val_acc:>10.4f} {lr:>10.2e}")

# ── 最终评估（加载最优权重）────────────────────────────────
model.load_state_dict(best_state)
model.eval()

all_preds = []
with torch.no_grad():
    for xb, _ in test_loader:
        all_preds.append(model(xb.to(device)).argmax(1).cpu().numpy())
y_pred = np.concatenate(all_preds)

print(f"\n{'='*50}")
print(f"  MLP (PyTorch)  —  Best Val Acc: {best_val_acc:.4f}")
print(f"{'='*50}")
print(f"Accuracy : {accuracy_score(y_test, y_pred):.4f}")
print(classification_report(y_test, y_pred, target_names=["FAKE", "REAL"]))
cm = confusion_matrix(y_test, y_pred)
print("Confusion Matrix:")
print(f"  {'':6s} FAKE  REAL")
print(f"  FAKE   {cm[0,0]:4d}  {cm[0,1]:4d}")
print(f"  REAL   {cm[1,0]:4d}  {cm[1,1]:4d}")
