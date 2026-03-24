# 🎙️ DeepVoice — AI 声音识别教学平台

> 一个面向中学生的数据挖掘教学工具，通过可交互的 Web 界面，直观展示机器学习如何辨别**真实人声**与 **AI 合成声音**。

---

## ✨ 功能一览

| 模块 | 功能 |
|------|------|
| 📊 **Dashboard** | 数据集可视化 · 特征分布 · REAL/FAKE 对比分析 |
| 🧠 **深度学习** | 6 种机器学习算法逐一运行 · 指标可视化 · 混淆矩阵 |
| 📉 **降维曲线** | 特征重要性 · 自动标注最高点与拐点 |
| 📋 **模型总结** | 所有模型横向对比 · 自动生成文字评论 |
| 🔬 **测试模型** | 上传音频 → 自动提取特征 → 实时预测 |

**支持的机器学习算法：**
逻辑回归 · 随机森林 · SVM · XGBoost · KNN · MLP 神经网络（PyTorch）

---

## 🚀 快速启动（推荐 Docker）

### 前置要求

- [Docker](https://www.docker.com/) 已安装
- 端口 `8300` 未被占用

### 一键启动

```bash
# 克隆项目
git clone <your-repo-url>
cd deepvoice

# 启动容器
docker compose up -d

# 访问平台
open http://localhost:8300
```

### 停止服务

```bash
docker compose down
```

---

## 🖥️ 本地开发（不用 Docker）

```bash
# 激活虚拟环境
source venv/bin/activate

# 启动服务器
bash start.sh

# 或者直接运行
python -m uvicorn web.app:app --host 0.0.0.0 --port 8300
```

> ⚠️ 若端口 8300 已被占用，`start.sh` 会自动提示并退出，请释放端口后重试。

---

## 📂 项目结构

```
deepvoice/
├── 📁 KAGGLE/
│   ├── AUDIO/
│   │   ├── REAL/          # 8 位真实人物原声（Biden · Musk · Obama…）
│   │   └── FAKE/          # 56 段 AI 变声音频
│   └── DATASET-balanced.csv   # 训练数据集（11,778 条 × 26 维特征）
│
├── 📁 ml/                 # 机器学习模型脚本（原始版本）
│   ├── 01_logistic_regression.py
│   ├── 02_random_forest.py
│   ├── 03_svm.py
│   ├── 04_xgboost.py
│   ├── 05_knn.py
│   ├── 06_mlp.py
│   └── 07_feature_selection.py
│
├── 📁 web/                # Web 应用
│   ├── app.py             # FastAPI 后端
│   ├── ml_runners.py      # 模型运行器（带进度回调）
│   ├── cache/             # 模型结果缓存（容器重启后清空）
│   └── static/
│       ├── index.html     # 单页应用入口
│       ├── app.js         # 前端逻辑
│       └── style.css      # 样式
│
├── extract_features.py    # 音频 → 26 维声学特征提取器
├── Dockerfile
├── docker-compose.yml
├── requirements_web.txt
└── start.sh               # 本地启动脚本（含端口检测）
```

---

## 🎓 使用指南

### 1. Dashboard — 了解数据

打开平台，首先看到数据总览：

- **数据集构成**：真实声音与 AI 声音各占 50%（平衡数据集）
- **26 维声学特征**：MFCC × 20 + 频谱特征 × 6
- **特征对比**：切换下拉框，对比每个特征在真实/AI 声音中的均值差异

### 2. 深度学习 — 运行模型

从左侧侧边栏选择任意模型（如"随机森林"），点击 **▶ 运行此模型**：

1. 实时进度日志滚动显示训练过程
2. 训练完成后自动展示：
   - **准确率 / 精确率 / 召回率 / F1**
   - **混淆矩阵**（绿色=正确，红色=错误）
   - **特征重要性**排行（Top 15）
   - **降维曲线**：⭐ 最高点 + 🔺 拐点自动标注

> 💡 **降维曲线**展示了"用多少个特征能达到最好效果"。拐点之后继续增加特征，准确率提升极小——这就是特征工程的核心洞察。

### 3. 模型总结 — 横向对比

在所有（或部分）模型运行完成后，进入 **Summary** 页面：

- 柱状图直观对比各模型准确率
- 多模型降维曲线叠加对比
- 系统自动生成文字评语

### 4. 测试模型 — 上传你自己的声音

1. 选择要使用的模型
2. 上传 `.wav` / `.mp3` / `.flac` 音频文件（最大 200 MB）
3. 系统自动：
   - 提取 26 维声学特征
   - 调用模型预测
   - 显示预测结果 + 置信度 + 概率条形图

---

## 🔬 数据集说明

| 属性 | 值 |
|------|-----|
| 总样本数 | 11,778 条 |
| 类别分布 | REAL: 5,889 · FAKE: 5,889（1:1 平衡） |
| 特征维度 | 26 维（均值化声学特征） |
| 真实来源 | 8 位公众人物原声（Biden · Linus · Musk · Obama · Trump · Taylor · Margot · Ryan） |
| AI 来源 | 56 段 AI 变声（7 × 8 说话人交叉变换） |

**26 维特征说明：**

| 特征 | 数量 | 含义 |
|------|------|------|
| chroma_stft | 1 | 音调色谱，反映音调分布 |
| rms | 1 | 均方根能量，反映音量 |
| spectral_centroid | 1 | 频谱质心，声音"亮度" |
| spectral_bandwidth | 1 | 频谱带宽，频率范围 |
| rolloff | 1 | 频谱滚降，高频能量边界 |
| zero_crossing_rate | 1 | 过零率，声音粗糙程度 |
| MFCC 1~20 | 20 | 梅尔倒谱系数，最核心的语音特征 |

---

## ⚙️ 技术栈

| 层次 | 技术 |
|------|------|
| **后端** | Python 3.12 · FastAPI · Uvicorn |
| **前端** | 原生 HTML/CSS/JS · Chart.js 4 |
| **机器学习** | scikit-learn · XGBoost · PyTorch (CPU) |
| **音频处理** | librosa · soundfile · ffmpeg |
| **部署** | Docker · docker-compose |

---

## 📊 模型性能参考

> 以下为在 DATASET-balanced.csv 上的测试集（20%）结果，实际运行结果可能略有浮动。

| 模型 | 准确率 | 特点 |
|------|--------|------|
| 逻辑回归 | ~90% | 线性基线，训练最快 |
| 随机森林 | ~95% | 集成学习，特征重要性可解释 |
| SVM (RBF) | ~96% | 高维效果好，训练较慢 |
| XGBoost | ~96% | 竞赛级精度，梯度提升 |
| KNN | ~93% | 无需训练，实例比对 |
| MLP (PyTorch) | ~96% | 深度神经网络，带训练曲线 |

---

## 🐳 Docker 说明

镜像基于 `python:3.12-slim`，使用 **CPU-only PyTorch**，无需 GPU。

```
镜像大小：~2.6 GB
端口：8300
```

**注意：** 每次容器重启，模型训练结果会清空（从零开始）。如需持久化，可修改 `docker-compose.yml` 添加缓存挂载：

```yaml
volumes:
  - ./web/cache:/app/web/cache   # 取消此行注释以持久化结果
```

---

## 🛠️ 常见问题

**Q: 端口 8300 被占用怎么办？**
```bash
# 查看占用进程
lsof -i :8300
# 或修改 docker-compose.yml 中的端口映射
ports:
  - "8301:8300"   # 改为其他端口
```

**Q: 模型运行需要多久？**

| 模型 | 预计时间 |
|------|----------|
| 逻辑回归 | 1~2 分钟 |
| KNN | 1~2 分钟 |
| XGBoost | 2~3 分钟 |
| 随机森林 | 3~4 分钟 |
| SVM | 3~5 分钟 |
| MLP 神经网络 | 5~8 分钟 |

**Q: 测试模型支持哪些音频格式？**

`.wav` · `.mp3` · `.flac` · `.ogg` · `.m4a`（最大 200 MB）

---

## 📄 License

本项目仅供教学用途。
