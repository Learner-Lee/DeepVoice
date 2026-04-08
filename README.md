# 🎙️ DeepVoice — AI 声音识别教学平台

> 一个面向中学生的数据挖掘教学工具，通过可交互的 Web 界面，直观展示机器学习如何辨别**真实人声**与 **AI 合成声音**。支持中英文切换。

---

## ✨ 功能一览

| 模块 | 功能 |
|------|------|
| 📊 **Dashboard** | 数据集可视化 · 特征分布 · AI vs 真实声音偏差百分比对比 |
| 🔊 **SpecRNet** | 深度学习模型架构图 · 训练曲线 · 多种子基线 · 消融实验（含推理时间折线） · Demo 评估 · 上传预测 |
| 🧠 **ML 模型 × 6** | 逐一运行 · 指标可视化 · 混淆矩阵 · 特征重要性 · 降维曲线 |
| 📋 **模型总结** | 所有模型横向对比 · 自动生成文字评语 |
| 🔬 **测试模型** | 上传音频 → 自动提取特征 → 实时预测 · 置信度 · 概率图 |
| 🌐 **中英文切换** | 顶栏 Apple 风格分段控件，一键切换，持久化 |

**支持的机器学习算法：**
逻辑回归 · 随机森林 · SVM · XGBoost · KNN · MLP 神经网络（PyTorch）

---

## 🚀 快速启动（推荐 Docker）

### 前置要求

- [Docker](https://www.docker.com/) 已安装
- 端口 `8443` 未被占用

### 一键启动

```bash
# 克隆项目
git clone <your-repo-url>
cd deepvoice

# 启动容器
docker compose up -d

# 访问平台（HTTP）
open http://localhost:8443
```

### 停止服务

```bash
docker compose down
```

---

## 🔒 HTTPS 部署（可选）

如需通过域名以 HTTPS 访问（如配合 Cloudflare），先生成自签名证书：

```bash
mkdir -p certs
openssl req -x509 -newkey rsa:2048 \
  -keyout certs/key.pem -out certs/cert.pem \
  -days 3650 -nodes -subj "/CN=your-domain.com"
```

启动时挂载证书并启用 SSL：

```bash
docker run -d --name deepvoice \
  -p 8443:8443 \
  -v $(pwd)/KAGGLE:/app/KAGGLE:ro \
  -v $(pwd)/web/cache:/app/web/cache \
  -v $(pwd)/web/static:/app/web/static:ro \
  -v $(pwd)/certs:/app/certs:ro \
  deepvoice:latest \
  python -m uvicorn web.app:app --host 0.0.0.0 --port 8443 \
    --ssl-keyfile /app/certs/key.pem --ssl-certfile /app/certs/cert.pem
```

> **配合 Cloudflare：** 在 Cloudflare Dashboard → SSL/TLS → Overview 选择 **Full** 模式以接受自签名证书。

---

## 🖥️ 本地开发（不用 Docker）

```bash
# 激活虚拟环境
source venv/bin/activate

# 启动服务器
bash start.sh

# 或者直接运行
python -m uvicorn web.app:app --host 0.0.0.0 --port 8443
```

---

## 📂 项目结构

```
deepvoice/
├── 📁 KAGGLE/
│   ├── AUDIO/
│   │   ├── REAL/              # 8 位真实人物原声（Biden · Musk · Obama…）
│   │   └── FAKE/              # 56 段 AI 变声音频
│   └── DATASET-balanced.csv   # 训练数据集（11,778 条 × 26 维特征）
│
├── 📁 DL/                     # 深度学习模块
│   └── specrnet-deepfake-detection/
│       ├── results_paper_aligned/   # 训练结果（多种子）
│       └── int6068_final_package/   # 基线表 · 消融表 · 速度表
│
├── 📁 image/                  # 静态资源（架构图等）
│   └── 1.png                  # SpecRNet 架构图
│
├── 📁 ml/                     # 机器学习模型脚本
│   ├── 01_logistic_regression.py
│   ├── 02_random_forest.py
│   ├── 03_svm.py
│   ├── 04_xgboost.py
│   ├── 05_knn.py
│   ├── 06_mlp.py
│   └── 07_feature_selection.py
│
├── 📁 web/                    # Web 应用
│   ├── app.py                 # FastAPI 后端
│   ├── ml_runners.py          # 模型运行器（带进度回调）
│   ├── specrnet_runner.py     # SpecRNet 推理 · 预计算结果加载
│   ├── cache/                 # 模型结果缓存（已持久化挂载）
│   └── static/
│       ├── index.html         # 单页应用入口
│       ├── app.js             # 前端逻辑（含 i18n）
│       ├── style.css          # 样式
│       └── image/             # 前端静态图片
│
├── 📁 certs/                  # SSL 证书（HTTPS 部署时使用）
├── extract_features.py        # 音频 → 26 维声学特征提取器
├── Dockerfile
├── docker-compose.yml
├── requirements_web.txt
└── start.sh                   # 本地启动脚本
```

---

## 🎓 使用指南

### 1. Dashboard — 了解数据

- **数据集构成**：真实声音与 AI 声音各占 50%（平衡数据集）
- **26 维声学特征**：MFCC × 20 + 频谱特征 × 6
- **特征偏差图**：以百分比形式对比每个特征在 AI 与真实声音间的差异，所有特征统一尺度，直观可读

### 2. SpecRNet — 深度学习模型

- **架构图**：可视化网络结构（ResBlock · ChannelAttention · Bi-GRU）
- **训练曲线**：Loss / F1 / AUC / Accuracy 随 Epoch 变化
- **多种子基线**：3 个随机种子验证结果稳定性
- **消融实验**：AUC / F1 / Accuracy 柱状图 + 推理时间折线叠加对比
- **Demo 评估**：对本地 KAGGLE/AUDIO 文件批量推理
- **上传预测**：上传任意音频，提取 LFCC 特征后实时判断

### 3. ML 模型 — 运行与分析

从左侧侧边栏选择模型，点击 **▶ 运行此模型**：

1. 实时进度日志
2. 训练完成后展示：准确率 · 混淆矩阵 · 特征重要性 · 降维曲线（⭐ 最高点 + 🔺 拐点）

### 4. 模型总结 — 横向对比

所有模型运行后，进入 **Summary** 页面查看准确率柱状图、降维曲线叠加和自动评语。

### 5. 测试模型 — 上传音频预测

1. 选择模型
2. 上传 `.wav` / `.mp3` / `.flac` / `.ogg` / `.m4a`（最大 200 MB）
3. 查看预测结果 · 置信度 · 概率柱状图 · 提取的声学特征

---

## 🔬 数据集说明

| 属性 | 值 |
|------|-----|
| 总样本数 | 11,778 条 |
| 类别分布 | REAL: 5,889 · FAKE: 5,889（1:1 平衡） |
| 特征维度 | 26 维（均值化声学特征） |
| 真实来源 | 8 位公众人物原声（Biden · Linus · Musk · Obama · Trump · Taylor · Margot · Ryan） |
| AI 来源 | 56 段 AI 变声（7 × 8 说话人交叉变换） |

**26 维特征：**

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
| **深度学习** | SpecRNet (PyTorch CPU · 278K 参数) |
| **机器学习** | scikit-learn · XGBoost · PyTorch (CPU) |
| **音频处理** | librosa · soundfile · ffmpeg |
| **部署** | Docker · docker-compose · 可选 HTTPS/Cloudflare |

---

## 📊 模型性能参考

> 以下为在 DATASET-balanced.csv 上的测试集（20%）结果，实际运行结果可能略有浮动。

| 模型 | 准确率 | 特点 |
|------|--------|------|
| SpecRNet（深度学习） | ~99% | LFCC + ResBlock + Bi-GRU，278K 参数 |
| 逻辑回归 | ~90% | 线性基线，训练最快 |
| 随机森林 | ~95% | 集成学习，特征重要性可解释 |
| SVM (RBF) | ~96% | 高维效果好 |
| XGBoost | ~96% | 竞赛级精度，梯度提升 |
| KNN | ~93% | 无需训练，实例比对 |
| MLP (PyTorch) | ~96% | 深度神经网络，带训练曲线 |

---

## 🐳 Docker 说明

镜像基于 `python:3.12-slim`，使用 **CPU-only PyTorch**，无需 GPU。

```
镜像大小：~2.6 GB
端口：8443
```

模型训练结果通过 volume 挂载持久化，容器重启后结果保留：

```yaml
# docker-compose.yml 中已配置
volumes:
  - ./web/cache:/app/web/cache
```

---

## 🛠️ 常见问题

**Q: 端口 8443 被占用怎么办？**
```bash
# 查看占用进程
lsof -i :8443
# 或修改 docker-compose.yml 中的端口映射
ports:
  - "8444:8443"
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

**Q: 访问 https://your-domain:8443 提示 526 错误？**

Cloudflare SSL 模式需设为 **Full**（非 Full Strict），详见上方 HTTPS 部署说明。

---

## 📄 License

本项目仅供教学用途。
