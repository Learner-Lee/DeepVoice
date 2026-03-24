"""
从 REAL / FAKE 音频文件中提取声学特征，输出与 DATASET-balanced.csv 格式一致的 CSV。

特征列（共 26 维）：
  chroma_stft, rms, spectral_centroid, spectral_bandwidth, rolloff,
  zero_crossing_rate, mfcc1 ~ mfcc20

每段音频按固定帧长提取后取均值，得到一行特征向量。
"""

import os
import csv
import numpy as np
import librosa

# ── 路径配置 ──────────────────────────────────────────────
AUDIO_ROOT = os.path.join(os.path.dirname(__file__), "KAGGLE", "AUDIO")
OUTPUT_CSV = os.path.join(os.path.dirname(__file__), "DATASET-extracted.csv")

# ── 特征提取参数（与 Kaggle 数据集保持一致）─────────────────
SR = None          # 保留原始采样率，不重采样
N_MFCC = 20       # MFCC 阶数
HOP_LENGTH = 512
N_FFT = 2048

HEADER = (
    ["chroma_stft", "rms", "spectral_centroid", "spectral_bandwidth",
     "rolloff", "zero_crossing_rate"]
    + [f"mfcc{i}" for i in range(1, N_MFCC + 1)]
    + ["LABEL"]
)


def extract_features(file_path: str) -> list[float]:
    """加载音频并提取 26 维声学特征（均值）。"""
    y, sr = librosa.load(file_path, sr=SR, mono=True)

    chroma   = librosa.feature.chroma_stft(y=y, sr=sr, hop_length=HOP_LENGTH, n_fft=N_FFT)
    rms      = librosa.feature.rms(y=y, hop_length=HOP_LENGTH)
    cent     = librosa.feature.spectral_centroid(y=y, sr=sr, hop_length=HOP_LENGTH, n_fft=N_FFT)
    bw       = librosa.feature.spectral_bandwidth(y=y, sr=sr, hop_length=HOP_LENGTH, n_fft=N_FFT)
    rolloff  = librosa.feature.spectral_rolloff(y=y, sr=sr, hop_length=HOP_LENGTH, n_fft=N_FFT)
    zcr      = librosa.feature.zero_crossing_rate(y=y, hop_length=HOP_LENGTH)
    mfcc     = librosa.feature.mfcc(y=y, sr=sr, n_mfcc=N_MFCC,
                                    hop_length=HOP_LENGTH, n_fft=N_FFT)

    features = [
        float(np.mean(chroma)),
        float(np.mean(rms)),
        float(np.mean(cent)),
        float(np.mean(bw)),
        float(np.mean(rolloff)),
        float(np.mean(zcr)),
    ] + [float(np.mean(mfcc[i])) for i in range(N_MFCC)]

    return features


def collect_files() -> list[tuple[str, str]]:
    """返回 (文件路径, 标签) 列表，REAL 在前，FAKE 在后。"""
    entries = []
    for label in ("REAL", "FAKE"):
        folder = os.path.join(AUDIO_ROOT, label)
        for fname in sorted(os.listdir(folder)):
            if fname.lower().endswith((".wav", ".mp3", ".flac")):
                entries.append((os.path.join(folder, fname), label))
    return entries


def main():
    files = collect_files()
    print(f"共找到 {len(files)} 个音频文件（REAL + FAKE）")

    with open(OUTPUT_CSV, "w", newline="") as f:
        writer = csv.writer(f)
        writer.writerow(HEADER)

        for idx, (path, label) in enumerate(files, 1):
            fname = os.path.basename(path)
            print(f"[{idx:3d}/{len(files)}] 处理: {label}/{fname} ...", end=" ", flush=True)
            try:
                feats = extract_features(path)
                writer.writerow(feats + [label])
                print("OK")
            except Exception as e:
                print(f"ERROR: {e}")

    print(f"\n完成！结果已保存至: {OUTPUT_CSV}")


if __name__ == "__main__":
    main()
