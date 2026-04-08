# DeepVoice - AI 声音识别教学平台
# Python 3.12 slim image

FROM python:3.12-slim

# Install system dependencies for librosa (audio processing)
RUN apt-get update && apt-get install -y --no-install-recommends \
    libsndfile1 \
    ffmpeg \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Install PyTorch CPU-only first (avoids downloading ~4GB CUDA libraries)
RUN pip install --no-cache-dir \
    torch --index-url https://download.pytorch.org/whl/cpu

# Copy requirements and install remaining dependencies
COPY requirements_web.txt .
RUN pip install --no-cache-dir -r requirements_web.txt

# Copy only the dataset CSV (not the 5GB audio files)
COPY KAGGLE/DATASET-balanced.csv ./KAGGLE/DATASET-balanced.csv
COPY ml/ ./ml/
COPY extract_features.py .
COPY web/ ./web/
# Copy SpecRNet model code and checkpoints (excludes large files via .dockerignore)
COPY DL/ ./DL/

# Expose port 8443
EXPOSE 8443

# Check port not in use and start server
CMD ["python", "-m", "uvicorn", "web.app:app", "--host", "0.0.0.0", "--port", "8443"]
