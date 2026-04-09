# Limitation & Future Work

## Current Limitations

### 1. Dataset Constraints

- **Small scale**: The dataset contains only 11,778 samples from 8 real speakers and 7 AI voice conversion systems. Real-world deepfake detection requires exposure to a far broader distribution of voices and generation methods.
- **Speaker imbalance**: All 8 real speakers are English-speaking public figures (Biden, Obama, Musk, etc.). The models may not generalize to other languages, accents, or demographics.
- **Static dataset**: The training data is fixed. As AI voice synthesis technology rapidly improves (e.g., new TTS/VC models released in 2024–2025), the models will not automatically adapt.
- **Audio quality uniformity**: Samples were collected under relatively clean conditions. The models have not been evaluated against background noise, compression artifacts, or telephone-quality audio.

### 2. Feature Engineering Limitations

- **26-dimensional mean features**: Each audio clip is reduced to a single 26-dimensional vector by averaging over time. This discards temporal dynamics, which are often critical for distinguishing real from synthesized speech.
- **No prosody or pitch modeling**: Features such as F0 (fundamental frequency) contours, rhythm, and prosodic patterns are not included, despite being strong indicators of synthesis.
- **Fixed feature set**: The feature extraction pipeline (`extract_features.py`) uses a predetermined set of MFCC and spectral statistics. There is no automated feature selection or learning end-to-end from raw audio.

### 3. Model Scope

- **No real-time stream processing**: All models require a complete audio file as input. Detection on live audio streams is not supported.
- **Binary classification only**: The system distinguishes REAL vs. FAKE but cannot identify *which* AI system generated a fake, or quantify the degree of manipulation.
- **ML models are not robust to domain shift**: Models trained on the balanced CSV dataset may perform poorly when the upload audio differs significantly in format, duration, or recording environment.
- **SpecRNet is CPU-only**: The deep learning model runs on CPU inside Docker, resulting in slower inference (~1–3 seconds per file). GPU acceleration is not configured.

### 4. Platform & Deployment

- **No user authentication**: The platform is open to anyone with network access. In a shared deployment, multiple users running models simultaneously may cause resource contention.
- **No persistent user sessions**: Model results are cached globally, not per-user. Concurrent runs of the same model from different users may interfere.
- **Single-node deployment**: The current Docker Compose setup runs everything on one container with no load balancing or horizontal scaling.
- **Self-signed HTTPS**: HTTPS support requires a self-signed certificate and Cloudflare "Full" SSL mode, which is not suitable for production use without a properly signed certificate (e.g., via Let's Encrypt).
- **Audio file size cap**: Uploads are limited to 200 MB. Very long recordings or lossless audio files may exceed this limit.

### 5. Educational UX

- **No guided tutorial mode**: Users are expected to explore independently. There is no step-by-step walkthrough for students unfamiliar with machine learning concepts.
- **Limited explainability**: Prediction results show confidence scores and a probability bar chart, but do not visually highlight *which part* of the audio triggered the prediction.
- **No quiz or assessment module**: The platform currently has no mechanism to test student understanding or record learning outcomes.

---

## Future Work

### 1. Expanded and Diverse Datasets

- Incorporate multilingual datasets (Mandarin, Spanish, French, etc.) to improve generalization across languages and accents.
- Continuously update the dataset with samples from newly released AI voice systems (e.g., ElevenLabs, Suno, Kling Audio).
- Add noisy/degraded audio variants to improve robustness evaluation.

### 2. Richer Audio Representations

- Replace mean-aggregated features with **sequence-level representations** (e.g., frame-by-frame MFCC sequences fed into RNNs or Transformers).
- Incorporate **prosody features**: pitch contour (F0), speaking rate, energy dynamics.
- Explore **raw waveform models** (e.g., RawNet2, Wav2Vec 2.0 fine-tuned for deepfake detection) that learn directly from audio without hand-crafted features.

### 3. Model Improvements

- Add **attention visualization**: highlight the time segments most responsible for a prediction, making the model's decision interpretable for students.
- Support **multi-class output**: identify the likely generation method (TTS, voice conversion, concatenative synthesis) in addition to the binary real/fake label.
- Integrate **ensemble prediction**: combine SpecRNet and ML model outputs into a weighted voting ensemble for higher accuracy.
- Evaluate **adversarial robustness**: test model performance against audio manipulated to fool detectors.

### 4. Real-Time Detection

- Implement **streaming inference** using WebSocket or WebRTC to detect deepfakes in near-real-time during a live call or broadcast.
- Add a **browser-based recording and instant analysis** pipeline (reintroduced with proper UX) that processes audio in chunks.

### 5. Platform & Infrastructure

- Add **user accounts and progress tracking** so teachers can monitor which models each student has run and reviewed.
- Implement **per-user result isolation** so concurrent sessions do not interfere with each other.
- Support **GPU inference** via NVIDIA Container Toolkit for faster SpecRNet evaluation.
- Introduce **Let's Encrypt** auto-renewal for production HTTPS without relying on Cloudflare.
- Provide a **one-click cloud deployment** template (e.g., Railway, Render, or Hugging Face Spaces) for schools without local server infrastructure.

### 6. Educational Enhancements

- **Guided tutorial mode**: A step-by-step walkthrough that introduces data → features → training → evaluation in sequence.
- **Quiz module**: Embed comprehension checks after each section (e.g., "Which model has the highest AUC? Why might SVM outperform KNN here?").
- **Counterfactual explorer**: Let students adjust feature values and observe how predictions change, building intuition for feature importance.
- **Assignment export**: Allow teachers to export model comparison tables and confusion matrices as PDF reports for student submissions.

### 7. Multilingual and Accessibility

- Expand i18n beyond Chinese/English to support Japanese, Korean, Spanish, and other languages commonly used in international classrooms.
- Add ARIA labels and keyboard navigation for accessibility compliance.
- Provide **screen-reader-friendly** chart descriptions alongside visual charts.

---

## Summary Table

| Area | Current State | Future Direction |
|------|--------------|-----------------|
| Dataset | 11,778 samples, 8 speakers, English only | Multilingual, continuously updated |
| Features | 26-dim mean statistics | Temporal sequences, prosody, raw waveform |
| Models | 6 ML + 1 DL (binary) | Ensemble, multi-class, adversarial robustness |
| Inference | File upload, CPU-only | Real-time streaming, GPU support |
| Explainability | Confidence score only | Attention heatmap, counterfactual explorer |
| Deployment | Single-node Docker, self-signed cert | Multi-user, Let's Encrypt, cloud templates |
| Education | Free exploration | Guided tutorial, quiz, assignment export |

---

*This document was written as part of the DeepVoice v1.0 project — an AI voice deepfake detection teaching platform for secondary school students.*
