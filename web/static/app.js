/* DeepVoice - Frontend Application */

// ── i18n ───────────────────────────────────────────────────────────────────
const TRANSLATIONS = {
  zh: {
    // Sidebar static
    subtitle: 'AI 声音识别教学平台',
    nav_section_nav: '导航',
    nav_dashboard: '数据总览 Dashboard',
    nav_specrnet: 'SpecRNet 深度模型',
    nav_section_ml: '机器学习模型',
    nav_lr: '逻辑回归',
    nav_rf: '随机森林',
    nav_svm: '支持向量机 SVM',
    nav_xgb: 'XGBoost',
    nav_knn: 'K近邻 KNN',
    nav_mlp: '神经网络 MLP',
    nav_section_results: '结果分析',
    nav_summary: '模型总结 Summary',
    nav_test: '测试模型',
    topbar_badge: '教学演示平台',
    lang_switch_label: 'English',
    lang_switch_flag: '🇺🇸',
    // Page titles
    page_dashboard: '📊 数据总览 Dashboard',
    page_specrnet: '🔊 SpecRNet 深度学习声音识别模型',
    page_lr: '📈 逻辑回归 Logistic Regression',
    page_rf: '🌲 随机森林 Random Forest',
    page_svm: '🔷 支持向量机 SVM',
    page_xgb: '⚡ XGBoost 梯度提升树',
    page_knn: '📍 K近邻 KNN',
    page_mlp: '🧠 神经网络 MLP',
    page_summary: '📋 模型总结 Summary',
    page_test: '🔬 测试模型',
    // Dashboard
    dash_loading: '正在加载数据...',
    dash_total: '📁 总样本数',
    dash_real: '✅ 真实声音 (REAL)',
    dash_fake: '🤖 AI合成声音 (FAKE)',
    dash_features: '🔢 声学特征维度',
    dash_training_data: '训练数据集',
    dash_proportion: '占比',
    dash_mfcc: 'MFCC + 频谱特征',
    dash_pie_title: '🥧 数据集构成',
    dash_feat_dist: '📡 特征类别分布',
    dash_feat_compare: '📊 特征对比：真实 vs AI声音（均值比较）',
    dash_real_label: '真实声音 REAL',
    dash_fake_label: 'AI声音 FAKE',
    dash_feat_table_title: '📋 声学特征说明',
    dash_feat_col1: '特征名', dash_feat_col2: '含义', dash_feat_col3: '真实均值',
    dash_feat_col4: 'AI均值', dash_feat_col5: '差异',
    dash_note: '💡 <strong>注意：</strong>数据集已经过平衡处理，真实与AI声音各占约50%，避免了模型偏向某一类的问题。',
    dash_feat_annotation: '真实均值',
    dash_fake_annotation: 'AI均值',
    dash_diff_annotation: '差异',
    // Feature descriptions
    feat_chroma: '音调色谱，反映音调分布',
    feat_rms: '均方根能量，反映音量大小',
    feat_cent: '频谱质心，声音"亮度"',
    feat_bw: '频谱带宽，频率范围',
    feat_rolloff: '频谱滚降，高频能量边界',
    feat_zcr: '过零率，声音粗糙程度',
    feat_mfcc: '第%n个MFCC倒谱系数',
    // Model page
    model_run_btn: '▶ 运行此模型',
    model_rerun_btn: '🔄 重新训练',
    model_cached: '✅ 已有缓存结果',
    model_launching: '🚀 正在启动...',
    model_cached_used: '✅ 使用缓存结果',
    model_training: '⏳ 训练中...',
    model_done: '✅ 训练完成！',
    model_error_prefix: '❌ 错误: ',
    model_fail: '❌ 训练失败',
    model_start_fail: '❌ 启动失败: ',
    model_rerun_confirm: '确定要清除缓存并重新训练吗？这可能需要几分钟时间。',
    model_wait: '⏳ 模型已在训练中，等待结果...',
    model_start: '⏳ 开始训练模型...',
    poll_disconnect: '⚠️ 连接断开，正在轮询结果...',
    tab_metrics: '📊 评估指标',
    tab_importance: '🏆 特征重要性',
    tab_sweep: '📉 降维曲线',
    tab_training: '📈 训练过程',
    tab_ksel: '🔍 K值搜索',
    metric_accuracy: '准确率',
    metric_precision: '精确率',
    metric_recall: '召回率',
    metric_f1: 'F1分数',
    metric_precision_fake: '精确率(FAKE)',
    metric_recall_fake: '召回率(FAKE)',
    metric_f1_fake: 'F1(FAKE)',
    metric_precision_real: '精确率(REAL)',
    metric_recall_real: '召回率(REAL)',
    cm_title: '🔲 混淆矩阵',
    cm_pred_fake: '预测: FAKE',
    cm_pred_real: '预测: REAL',
    cm_actual_fake: '实际: FAKE',
    cm_actual_real: '实际: REAL',
    cm_correct: '✅ <strong>绿色格</strong>: 判断正确 (TN + TP)',
    cm_wrong: '❌ <strong>红色格</strong>: 判断错误 (FP + FN)',
    metrics_chart_title: '📊 各类别详细指标',
    metrics_note: '💡 <strong>解读：</strong><strong>准确率</strong>表示预测正确的比例。<strong>精确率</strong>表示预测为某类中真正是该类的比例。<strong>召回率</strong>表示该类中被正确识别出来的比例。<strong>F1分数</strong>是精确率和召回率的调和平均数。',
    feat_imp_note: '💡 特征重要性越高，说明该特征对区分真假声音越关键。',
    sweep_note: '💡 <strong>降维实验：</strong>逐步增加使用的特征数量（k），观察模型准确率的变化。⭐ 表示<strong>最高点</strong>（最优特征数），🔺 表示<strong>拐点</strong>（性价比最佳点）。',
    sweep_xlabel: '特征数量 k',
    sweep_ylabel: '交叉验证准确率',
    sweep_cv_label: 'CV准确率 (3折)',
    sweep_peak_label: '⭐ <strong>最高点</strong>: k=%k，准确率=%acc',
    sweep_infl_label: '🔺 <strong>拐点</strong>: k=%k，使用%k个特征即可达到性价比最优',
    sweep_insight: '💡 <strong>解读：</strong>拐点之后继续增加特征，准确率提升很小甚至下降，说明多余特征引入了噪声。实际应用中通常选择拐点附近的特征数量，在准确率和计算效率之间取得平衡。',
    training_note: '💡 <strong>训练过程：</strong>每个Epoch（轮次）模型的准确率变化。训练集和验证集曲线趋于一致时，说明模型学习良好。',
    training_xlabel: '训练轮次 Epoch',
    training_ylabel: '准确率',
    train_acc_label: '训练集准确率',
    val_acc_label: '验证集准确率',
    train_loss_label: '训练Loss',
    ksel_note: '💡 <strong>K值搜索：</strong>通过交叉验证找到KNN最优的K值，即"参考最近邻居的数量"。',
    ksel_best: '最优 K 值 = ',
    best_val_acc_label: '最优验证准确率: ',
    // Summary
    summary_loading: '加载模型总结...',
    summary_no_models: '⚠️ 还没有任何模型运行过。请先到左侧各模型页面运行模型，然后再查看总结。',
    summary_missing: '⚠️ 以下模型尚未运行：%names。前往对应页面运行后数据会更新。',
    summary_acc_title: '📊 模型性能对比',
    summary_table_title: '🔢 各模型详细指标对比',
    summary_sweep_title: '📉 各模型降维曲线对比（拐点 & 最优特征数）',
    summary_sweep_note: '💡 不同模型对特征数量的敏感程度不同。曲线越早平稳，说明该模型用更少特征就能达到高精度。',
    summary_comment_title: '💬 总结与评价',
    tbl_model: '模型', tbl_acc: '准确率 ↑', tbl_prec_fake: '精确率(FAKE)',
    tbl_rec_fake: '召回率(FAKE)', tbl_f1_fake: 'F1(FAKE)',
    tbl_prec_real: '精确率(REAL)', tbl_rec_real: '召回率(REAL)', tbl_f1_real: 'F1(REAL)',
    // Test page
    rec_or: '或直接录音',
    rec_title: '实时录音',
    rec_start_btn: '开始录音',
    rec_stop_btn: '停止录音',
    rec_mic_denied: '麦克风访问被拒绝：',
    test_title: '🔬 测试模型 - 上传音频进行预测',
    test_note: '💡 上传一段声音文件，系统会自动提取 26 维声学特征，然后调用你选择的模型来判断是<strong>真实人声</strong>还是<strong>AI合成声音</strong>。',
    test_select_model: '选择模型：',
    test_format_hint: '支持格式：wav / mp3 / flac / ogg（最大200MB）',
    test_upload_text: '点击选择音频文件，或拖放至此处',
    test_upload_hint: 'wav · mp3 · flac · ogg · m4a',
    test_predict_btn: '🔍 开始预测',
    test_loading: '正在提取特征并预测，请稍候...',
    test_loading_sub: '（首次使用某个模型需要先训练，可能需要1-3分钟）',
    test_real_msg: '🎉 模型判断这是<strong>真实的人类声音</strong>。真实声音通常有更自然的频谱变化和独特的音色特征。',
    test_fake_msg: '⚠️ 模型判断这是<strong>AI合成的声音</strong>。AI声音往往有特定的频谱模式，在某些频段可能过于"完美"。',
    test_feat_title: '🔢 提取的声学特征（前 10 维）',
    test_feat_total: '完整特征：共 %n 维',
    test_feat_col1: '特征名', test_feat_col2: '特征值', test_feat_col3: '含义',
    pred_confidence: '置信度：',
    pred_model_used: '使用模型：',
    pred_real: '✅ 真实人声 REAL',
    pred_fake: '🤖 AI合成声音 FAKE',
    // SpecRNet
    sr_loading: '加载 SpecRNet 预计算结果...',
    sr_desc: 'SpecRNet 是专为音频真假识别设计的深度学习架构，结合残差卷积块（ResBlock）、通道注意力机制（Channel Attention）与双向 GRU，在仅 <strong>278K</strong> 参数的情况下实现接近 <strong>99%</strong> 的检测精度。',
    sr_tags: ['残差卷积块 ResBlock','通道注意力 Attention','双向GRU','LFCC特征','278K参数'],
    sr_stat_acc: '🏆 准确率 (seed=42)',
    sr_stat_auc: '📊 AUC',
    sr_stat_f1: '⚡ F1 Score',
    sr_stat_eer: '🎯 EER',
    sr_test_set: '测试集',
    sr_auc_sub: 'ROC曲线下面积',
    sr_f1_sub: '精确率与召回率调和均值',
    sr_eer_sub: '等错误率（越低越好）',
    sr_tab_training: '📈 训练曲线',
    sr_tab_baseline: '🏆 多种子基线',
    sr_tab_ablation: '🔬 消融实验',
    sr_tab_demo: '▶ 演示评估',
    sr_tab_predict: '🎵 上传预测',
    sr_training_note: '💡 下图为 SpecRNet（seed=42, default variant）在 10 个 Epoch 中的训练损失与验证集各项指标变化。最佳模型在第 <strong>%e</strong> 个 Epoch 保存（验证 F1 = %f）。',
    sr_loss_label: '训练 Loss',
    sr_loss_y: 'Cross-Entropy Loss',
    sr_val_f1: '验证 F1',
    sr_val_auc: '验证 AUC',
    sr_val_acc: '验证 Accuracy',
    sr_metrics_y: '指标值',
    sr_baseline_note: '💡 以相同超参数在三个不同随机种子下训练，验证结果的<strong>稳定性与可复现性</strong>。',
    sr_bl_col1: '变体', sr_bl_col2: '随机种子',
    sr_ablation_note: '💡 <strong>消融实验</strong>通过逐一移除或修改模型组件，分析每个组件对性能的贡献。',
    sr_abl_col1: '实验配置', sr_abl_col_params: '参数量', sr_abl_col_time: '推理时间', sr_abl_col5: '说明',
    sr_abl_noatt: '移除注意力机制',
    sr_abl_gap: '用全局平均池化替换GRU',
    sr_abl_dur1: '仅使用1秒音频',
    sr_abl_wloff: '标准交叉熵损失（基线）',
    sr_abl_wlon: '类别加权交叉熵损失',
    sr_demo_note: '💡 使用预训练的 SpecRNet (seed=42) 对本项目的 <strong>KAGGLE/AUDIO</strong> 音频文件进行实时推理，展示模型在真实数据上的泛化能力。每类最多取 20 个文件。',
    sr_demo_run_btn: '▶ 运行演示评估',
    sr_demo_running: '⏳ 推理中...',
    sr_demo_done: '✅ 完成！',
    sr_demo_fail: '❌ 失败',
    sr_demo_cm: '🔲 混淆矩阵',
    sr_demo_files: '📋 逐文件结果（前20条）',
    sr_demo_col1: '文件', sr_demo_col2: '真实', sr_demo_col3: '预测',
    sr_demo_col4: '置信度', sr_demo_col5: '结果',
    sr_predict_note: '💡 上传任意音频，SpecRNet 将把它转换为 <strong>80×404 LFCC 特征矩阵</strong>，然后判断真假。',
    sr_upload_text: '点击选择音频，或拖放至此',
    sr_predict_btn: '🔍 SpecRNet 预测',
    sr_predict_loading: '正在提取 LFCC 特征并推理...',
    sr_lfcc_title: '📡 LFCC 特征均值（前20维）',
    sr_real_msg: '🎉 SpecRNet 判断这是<strong>真实人类声音</strong>。模型基于 LFCC 频谱特征检测到自然的声学模式。',
    sr_fake_msg: '⚠️ SpecRNet 判断这是<strong>AI合成声音</strong>。LFCC 特征显示出人工合成声音的频谱痕迹。',
    sr_confidence: '置信度：',
    sr_model_used: '模型：SpecRNet (seed=42)',
    // Common
    loading: '正在加载...',
    n_samples: '样本数',
    auc_label: 'AUC',
    f1_label: 'F1',
    acc_label: '准确率',
    eer_label: 'EER',
    seed_label: 'seed = ',
    mean_std: '均值 ± 标准差',
    // Summary comments
    sc_ensemble: '🌲 <strong>集成学习方法</strong>（%names）平均准确率为 %acc，体现了"集体智慧"的优势。',
    sc_mlp: '🧠 <strong>神经网络（MLP）</strong>通过逐轮训练不断优化，最终验证集准确率达到 %acc。神经网络的训练过程展示了深度学习的学习机制。',
    sc_knn: '📍 <strong>K近邻（KNN）</strong>不需要"训练"，直接通过相似性比较进行判断，最优K值为 %k，准确率为 %acc。',
    sc_dim: '📉 <strong>降维分析</strong>显示：%name 只需 <strong>%k</strong> 个特征就能达到接近最优的表现，说明并非所有声音特征对识别都同等重要。',
    sc_conclusion: '📌 <strong>总体结论：</strong>在真假声音识别任务中，所有模型都能达到较高的准确率，说明声学特征能够有效区分人类声音和AI合成声音。实际应用中应综合考虑准确率、训练速度和可解释性来选择合适的模型。',
  },
  en: {
    // Sidebar static
    subtitle: 'AI Voice Detection Teaching Platform',
    nav_section_nav: 'Navigation',
    nav_dashboard: 'Dashboard',
    nav_specrnet: 'SpecRNet Deep Model',
    nav_section_ml: 'ML Models',
    nav_lr: 'Logistic Regression',
    nav_rf: 'Random Forest',
    nav_svm: 'Support Vector Machine',
    nav_xgb: 'XGBoost',
    nav_knn: 'K-Nearest Neighbors',
    nav_mlp: 'Neural Network MLP',
    nav_section_results: 'Results',
    nav_summary: 'Summary',
    nav_test: 'Test Model',
    topbar_badge: 'Teaching Platform',
    lang_switch_label: '中文',
    lang_switch_flag: '🇨🇳',
    // Page titles
    page_dashboard: '📊 Data Overview Dashboard',
    page_specrnet: '🔊 SpecRNet Deep Learning Voice Detection',
    page_lr: '📈 Logistic Regression',
    page_rf: '🌲 Random Forest',
    page_svm: '🔷 Support Vector Machine (SVM)',
    page_xgb: '⚡ XGBoost Gradient Boosting',
    page_knn: '📍 K-Nearest Neighbors (KNN)',
    page_mlp: '🧠 Neural Network (MLP)',
    page_summary: '📋 Model Summary',
    page_test: '🔬 Test Model',
    // Dashboard
    dash_loading: 'Loading data...',
    dash_total: '📁 Total Samples',
    dash_real: '✅ Real Voice (REAL)',
    dash_fake: '🤖 AI-Generated (FAKE)',
    dash_features: '🔢 Feature Dimensions',
    dash_training_data: 'Training Dataset',
    dash_proportion: 'proportion',
    dash_mfcc: 'MFCC + Spectral Features',
    dash_pie_title: '🥧 Dataset Composition',
    dash_feat_dist: '📡 Feature Category Distribution',
    dash_feat_compare: '📊 Feature Comparison: Real vs AI (Mean Values)',
    dash_real_label: 'Real Voice REAL',
    dash_fake_label: 'AI Voice FAKE',
    dash_feat_table_title: '📋 Acoustic Feature Reference',
    dash_feat_col1: 'Feature', dash_feat_col2: 'Description', dash_feat_col3: 'Real Mean',
    dash_feat_col4: 'AI Mean', dash_feat_col5: 'Difference',
    dash_note: '💡 <strong>Note:</strong> The dataset is balanced with ~50% real and ~50% AI voices, preventing model bias toward one class.',
    dash_feat_annotation: 'Real mean',
    dash_fake_annotation: 'AI mean',
    dash_diff_annotation: 'Difference',
    // Feature descriptions
    feat_chroma: 'Chroma spectrum, reflects pitch distribution',
    feat_rms: 'Root mean square energy, reflects volume',
    feat_cent: 'Spectral centroid, sound "brightness"',
    feat_bw: 'Spectral bandwidth, frequency range',
    feat_rolloff: 'Spectral rolloff, high-frequency energy boundary',
    feat_zcr: 'Zero-crossing rate, sound roughness',
    feat_mfcc: 'MFCC coefficient #%n',
    // Model page
    model_run_btn: '▶ Run This Model',
    model_rerun_btn: '🔄 Retrain',
    model_cached: '✅ Cached result available',
    model_launching: '🚀 Launching...',
    model_cached_used: '✅ Using cached result',
    model_training: '⏳ Training...',
    model_done: '✅ Training complete!',
    model_error_prefix: '❌ Error: ',
    model_fail: '❌ Training failed',
    model_start_fail: '❌ Launch failed: ',
    model_rerun_confirm: 'Clear cache and retrain? This may take a few minutes.',
    model_wait: '⏳ Model already running, waiting for result...',
    model_start: '⏳ Starting model training...',
    poll_disconnect: '⚠️ SSE disconnected, polling...',
    tab_metrics: '📊 Metrics',
    tab_importance: '🏆 Feature Importance',
    tab_sweep: '📉 Dimensionality Reduction',
    tab_training: '📈 Training Curves',
    tab_ksel: '🔍 K Selection',
    metric_accuracy: 'Accuracy',
    metric_precision: 'Precision',
    metric_recall: 'Recall',
    metric_f1: 'F1 Score',
    metric_precision_fake: 'Precision (FAKE)',
    metric_recall_fake: 'Recall (FAKE)',
    metric_f1_fake: 'F1 (FAKE)',
    metric_precision_real: 'Precision (REAL)',
    metric_recall_real: 'Recall (REAL)',
    cm_title: '🔲 Confusion Matrix',
    cm_pred_fake: 'Pred: FAKE',
    cm_pred_real: 'Pred: REAL',
    cm_actual_fake: 'Actual: FAKE',
    cm_actual_real: 'Actual: REAL',
    cm_correct: '✅ <strong>Green</strong>: Correct (TN + TP)',
    cm_wrong: '❌ <strong>Red</strong>: Incorrect (FP + FN)',
    metrics_chart_title: '📊 Per-Class Metrics',
    metrics_note: '💡 <strong>Guide:</strong> <strong>Accuracy</strong>: fraction of correct predictions. <strong>Precision</strong>: of all predicted positive, how many truly are. <strong>Recall</strong>: of all true positive, how many were found. <strong>F1</strong>: harmonic mean of precision and recall.',
    feat_imp_note: '💡 Higher importance means the feature is more critical for distinguishing real vs. AI voices.',
    sweep_note: '💡 <strong>Dimensionality Experiment:</strong> We add features one by one and measure CV accuracy. ⭐ = <strong>peak</strong> (optimal k), 🔺 = <strong>inflection point</strong> (best trade-off).',
    sweep_xlabel: 'Number of Features k',
    sweep_ylabel: 'CV Accuracy',
    sweep_cv_label: 'CV Accuracy (3-fold)',
    sweep_peak_label: '⭐ <strong>Peak</strong>: k=%k, accuracy=%acc',
    sweep_infl_label: '🔺 <strong>Inflection</strong>: k=%k features already close to optimal',
    sweep_insight: '💡 <strong>Insight:</strong> Beyond the inflection point, adding more features yields diminishing returns. In practice, we choose around the inflection k to balance accuracy vs. efficiency.',
    training_note: '💡 <strong>Training Progress:</strong> Accuracy per epoch. When train and validation curves converge, the model is learning well.',
    training_xlabel: 'Epoch',
    training_ylabel: 'Accuracy',
    train_acc_label: 'Train Accuracy',
    val_acc_label: 'Validation Accuracy',
    train_loss_label: 'Train Loss',
    ksel_note: '💡 <strong>K Selection:</strong> Cross-validation finds the optimal K — i.e., how many nearest neighbors to consult.',
    ksel_best: 'Optimal K = ',
    best_val_acc_label: 'Best Val Accuracy: ',
    // Summary
    summary_loading: 'Loading model summary...',
    summary_no_models: '⚠️ No models have been run yet. Go to each model page in the sidebar and run them first.',
    summary_missing: '⚠️ These models have not been run: %names. Run them to see full comparison.',
    summary_acc_title: '📊 Model Accuracy Comparison',
    summary_table_title: '🔢 Detailed Metrics Comparison',
    summary_sweep_title: '📉 Dimensionality Reduction Curves (Peak & Inflection)',
    summary_sweep_note: '💡 Different models have different sensitivities to the number of features. A curve that flattens early means the model needs fewer features to perform well.',
    summary_comment_title: '💬 Summary & Comments',
    tbl_model: 'Model', tbl_acc: 'Accuracy ↑', tbl_prec_fake: 'Precision (FAKE)',
    tbl_rec_fake: 'Recall (FAKE)', tbl_f1_fake: 'F1 (FAKE)',
    tbl_prec_real: 'Precision (REAL)', tbl_rec_real: 'Recall (REAL)', tbl_f1_real: 'F1 (REAL)',
    // Test page
    rec_or: 'or record directly',
    rec_title: 'Live Recording',
    rec_start_btn: 'Start Recording',
    rec_stop_btn: 'Stop',
    rec_mic_denied: 'Microphone access denied: ',
    test_title: '🔬 Test Model — Upload Audio for Prediction',
    test_note: '💡 Upload an audio file and the system will extract 26 acoustic features, then use the selected model to judge if it is <strong>real</strong> or <strong>AI-generated</strong>.',
    test_select_model: 'Select Model:',
    test_format_hint: 'Supported: wav / mp3 / flac / ogg (max 200 MB)',
    test_upload_text: 'Click to select audio, or drag and drop here',
    test_upload_hint: 'wav · mp3 · flac · ogg · m4a',
    test_predict_btn: '🔍 Predict',
    test_loading: 'Extracting features and predicting...',
    test_loading_sub: '(First use of a model may take 1–3 min to train)',
    test_real_msg: '🎉 Model says this is a <strong>real human voice</strong>. Real voices have natural spectral variation and unique timbre.',
    test_fake_msg: '⚠️ Model says this is an <strong>AI-generated voice</strong>. AI audio often shows specific spectral patterns.',
    test_feat_title: '🔢 Extracted Acoustic Features (first 10)',
    test_feat_total: 'Full feature vector: %n dimensions',
    test_feat_col1: 'Feature', test_feat_col2: 'Value', test_feat_col3: 'Description',
    pred_confidence: 'Confidence: ',
    pred_model_used: 'Model: ',
    pred_real: '✅ Real Voice REAL',
    pred_fake: '🤖 AI-Generated FAKE',
    // SpecRNet
    sr_loading: 'Loading SpecRNet pre-computed results...',
    sr_desc: 'SpecRNet is a lightweight deep learning architecture for audio deepfake detection. It combines residual convolutional blocks, channel attention, and bidirectional GRU — achieving near <strong>99%</strong> detection accuracy with only <strong>278K</strong> parameters.',
    sr_tags: ['Residual Blocks','Channel Attention','Bi-GRU','LFCC Features','278K Params'],
    sr_stat_acc: '🏆 Accuracy (seed=42)',
    sr_stat_auc: '📊 AUC',
    sr_stat_f1: '⚡ F1 Score',
    sr_stat_eer: '🎯 EER',
    sr_test_set: 'Test Set',
    sr_auc_sub: 'Area under ROC curve',
    sr_f1_sub: 'Harmonic mean of precision & recall',
    sr_eer_sub: 'Equal Error Rate (lower is better)',
    sr_tab_training: '📈 Training Curves',
    sr_tab_baseline: '🏆 Multi-Seed Baseline',
    sr_tab_ablation: '🔬 Ablation Study',
    sr_tab_demo: '▶ Demo Evaluation',
    sr_tab_predict: '🎵 Upload & Predict',
    sr_training_note: 'Training loss and validation metrics for SpecRNet (seed=42, default variant) over 10 epochs. Best model saved at epoch <strong>%e</strong> (val F1 = %f).',
    sr_loss_label: 'Train Loss',
    sr_loss_y: 'Cross-Entropy Loss',
    sr_val_f1: 'Val F1',
    sr_val_auc: 'Val AUC',
    sr_val_acc: 'Val Accuracy',
    sr_metrics_y: 'Score',
    sr_baseline_note: '💡 Training with identical hyperparameters across three random seeds to validate <strong>stability and reproducibility</strong>.',
    sr_bl_col1: 'Variant', sr_bl_col2: 'Seed',
    sr_ablation_note: '💡 <strong>Ablation study</strong>: each component is removed or modified to quantify its contribution to performance.',
    sr_abl_col1: 'Experiment', sr_abl_col_params: 'Params', sr_abl_col_time: 'Inference Time', sr_abl_col5: 'Description',
    sr_abl_noatt: 'Remove attention modules',
    sr_abl_gap: 'Replace GRU with global average pooling',
    sr_abl_dur1: 'Use only 1-second audio clips',
    sr_abl_wloff: 'Standard cross-entropy loss (baseline)',
    sr_abl_wlon: 'Class-weighted cross-entropy loss',
    sr_demo_note: '💡 Run inference with the pretrained SpecRNet (seed=42) on <strong>KAGGLE/AUDIO</strong> files — up to 20 per class — to show real-world generalization.',
    sr_demo_run_btn: '▶ Run Demo Evaluation',
    sr_demo_running: '⏳ Running inference...',
    sr_demo_done: '✅ Done!',
    sr_demo_fail: '❌ Failed',
    sr_demo_cm: '🔲 Confusion Matrix',
    sr_demo_files: '📋 Per-File Results (first 20)',
    sr_demo_col1: 'File', sr_demo_col2: 'True', sr_demo_col3: 'Pred',
    sr_demo_col4: 'Confidence', sr_demo_col5: 'Result',
    sr_predict_note: '💡 Upload any audio file. SpecRNet will convert it to an <strong>80×404 LFCC matrix</strong> and predict real or fake.',
    sr_upload_text: 'Click to select audio, or drag and drop',
    sr_predict_btn: '🔍 SpecRNet Predict',
    sr_predict_loading: 'Extracting LFCC features and running inference...',
    sr_lfcc_title: '📡 LFCC Feature Profile (first 20 coefficients)',
    sr_real_msg: '🎉 SpecRNet predicts <strong>real human voice</strong>. The LFCC spectrum shows natural acoustic patterns.',
    sr_fake_msg: '⚠️ SpecRNet predicts <strong>AI-generated voice</strong>. LFCC features reveal synthetic spectral artifacts.',
    sr_confidence: 'Confidence: ',
    sr_model_used: 'Model: SpecRNet (seed=42)',
    // Common
    loading: 'Loading...',
    n_samples: 'Samples',
    auc_label: 'AUC',
    f1_label: 'F1',
    acc_label: 'Accuracy',
    eer_label: 'EER',
    seed_label: 'seed = ',
    mean_std: 'Mean ± Std',
    // Summary comments
    sc_ensemble: '🌲 <strong>Ensemble methods</strong> (%names) average accuracy: %acc, demonstrating the power of combining models.',
    sc_mlp: '🧠 <strong>Neural Network (MLP)</strong> improved epoch by epoch, reaching final validation accuracy of %acc. Training curves illustrate how deep learning learns.',
    sc_knn: '📍 <strong>KNN</strong> requires no training — it classifies by similarity. Optimal k=%k, accuracy=%acc.',
    sc_dim: '📉 <strong>Dimensionality analysis</strong>: %name needs only <strong>%k</strong> features to approach peak performance, showing not all features matter equally.',
    sc_conclusion: '📌 <strong>Conclusion:</strong> All models achieve high accuracy on voice deepfake detection, confirming that acoustic features can effectively distinguish real from AI-generated speech. In practice, model choice should balance accuracy, training speed, and interpretability.',
  },
};

let currentLang = localStorage.getItem('dv_lang') || 'zh';

function t(key, vars) {
  const dict = TRANSLATIONS[currentLang] || TRANSLATIONS.zh;
  let str = dict[key] ?? TRANSLATIONS.zh[key] ?? key;
  if (vars) Object.entries(vars).forEach(([k, v]) => { str = str.replaceAll('%' + k, v); });
  return str;
}

function setLang(lang) {
  if (lang === currentLang) return;
  currentLang = lang;
  localStorage.setItem('dv_lang', currentLang);
  applyI18nStatic();
  navigate(state.currentPage);
}

// keep for legacy onclick if any remain
function toggleLanguage() { setLang(currentLang === 'zh' ? 'en' : 'zh'); }

function applyI18nStatic() {
  // Update all data-i18n elements in sidebar
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (TRANSLATIONS[currentLang][key] !== undefined) {
      el.textContent = TRANSLATIONS[currentLang][key];
    }
  });
  // Update segmented control active state
  const zhBtn = document.getElementById('seg-zh');
  const enBtn = document.getElementById('seg-en');
  if (zhBtn) zhBtn.classList.toggle('active', currentLang === 'zh');
  if (enBtn) enBtn.classList.toggle('active', currentLang === 'en');
  // Update html lang attr
  document.getElementById('html-root').lang = currentLang === 'zh' ? 'zh-CN' : 'en';
}

// ── State ──────────────────────────────────────────────────────────────────
const state = {
  currentPage: 'dashboard',
  charts: {},
};

const MODEL_META = {
  logistic_regression: {
    name: '逻辑回归', en: 'Logistic Regression',
    icon: '📈', color: '#4f46e5',
    desc: '逻辑回归是最经典的二分类算法，通过寻找一个线性决策边界来区分真假声音。它简单、可解释，是机器学习的入门算法。',
    desc_en: 'Logistic Regression is a classic binary classification algorithm that finds a linear decision boundary. Simple, interpretable, and great as a first ML model.',
    tags: ['线性模型', '可解释性强', '训练速度快'],
    tags_en: ['Linear Model', 'Interpretable', 'Fast Training'],
  },
  random_forest: {
    name: '随机森林', en: 'Random Forest',
    icon: '🌲', color: '#10b981',
    desc: '随机森林由许多决策树组成，每棵树投票决定最终结果。就像问100个专家意见，综合判断比单一专家更准确。',
    desc_en: 'Random Forest combines many decision trees, each voting on the final result — like asking 100 experts. The collective wisdom beats any single tree.',
    tags: ['集成学习', '抗过拟合', '特征重要性'],
    tags_en: ['Ensemble', 'Anti-Overfitting', 'Feature Importance'],
  },
  svm: {
    name: '支持向量机', en: 'Support Vector Machine',
    icon: '🔷', color: '#f59e0b',
    desc: 'SVM 寻找最宽的"分界线"来区分真假声音。使用 RBF 核函数可以处理非线性的复杂边界，是经典的高精度分类器。',
    desc_en: 'SVM finds the widest possible margin to separate real from fake voices. The RBF kernel handles non-linear boundaries, making it a classic high-accuracy classifier.',
    tags: ['最大间隔', 'RBF核', '高维效果好'],
    tags_en: ['Max Margin', 'RBF Kernel', 'High-Dim Friendly'],
  },
  xgboost: {
    name: 'XGBoost', en: 'XGBoost (Gradient Boosting)',
    icon: '⚡', color: '#ef4444',
    desc: 'XGBoost 是竞赛中最常获奖的算法，通过逐步修正错误来提升精度。每一步都专注于改正上一步出错的样本。',
    desc_en: 'XGBoost is the go-to algorithm in competitions, boosting accuracy by iteratively correcting mistakes. Each step focuses on the samples the previous step got wrong.',
    tags: ['梯度提升', '竞赛神器', '速度与精度兼顾'],
    tags_en: ['Gradient Boosting', 'Competition Favorite', 'Speed & Accuracy'],
  },
  knn: {
    name: 'K近邻', en: 'K-Nearest Neighbors',
    icon: '📍', color: '#06b6d4',
    desc: 'KNN 的思路最直观：找K个最相似的已知样本，看它们多数属于哪类。"物以类聚"就是它的核心哲学。',
    desc_en: 'KNN is the most intuitive classifier: find the K most similar known samples and take a majority vote. "Birds of a feather flock together" is its core philosophy.',
    tags: ['实例学习', '无训练', '直觉易懂'],
    tags_en: ['Instance-Based', 'No Training', 'Intuitive'],
  },
  mlp: {
    name: '神经网络', en: 'Multi-Layer Perceptron',
    icon: '🧠', color: '#8b5cf6',
    desc: '多层感知机（MLP）模拟人脑神经元连接，通过层层变换学习复杂的声音特征模式。这是深度学习的基础结构。',
    desc_en: 'MLP simulates brain neuron connections, learning complex voice feature patterns through layer-by-layer transformations. It is the foundation of deep learning.',
    tags: ['深度学习', 'PyTorch', '多层神经元'],
    tags_en: ['Deep Learning', 'PyTorch', 'Multi-Layer Neurons'],
  },
};

function getModelDisplayName(key) {
  const meta = MODEL_META[key];
  return currentLang === 'en' ? meta.en : meta.name;
}
function getModelSubtitle(key) {
  const meta = MODEL_META[key];
  return currentLang === 'en' ? '' : meta.en;
}
function getModelDesc(meta) {
  return currentLang === 'en' ? (meta.desc_en || meta.desc) : meta.desc;
}
function getModelTags(meta) {
  return currentLang === 'en' ? (meta.tags_en || meta.tags) : meta.tags;
}

function getPageTitle(page) {
  const map = {
    dashboard: 'page_dashboard', specrnet: 'page_specrnet',
    'model-logistic_regression': 'page_lr', 'model-random_forest': 'page_rf',
    'model-svm': 'page_svm', 'model-xgboost': 'page_xgb',
    'model-knn': 'page_knn', 'model-mlp': 'page_mlp',
    summary: 'page_summary', test: 'page_test',
  };
  return t(map[page] || page);
}

// ── Utilities ──────────────────────────────────────────────────────────────

function $(id) { return document.getElementById(id); }

function destroyCharts() {
  Object.values(state.charts).forEach(c => { try { c.destroy(); } catch(e){} });
  state.charts = {};
}

function setContent(html) {
  destroyCharts();
  $('content').innerHTML = html;
}

function fmt(v, digits=4) {
  if (typeof v !== 'number') return v;
  return (v * 100).toFixed(digits > 4 ? digits-2 : 1) + '%';
}

function fmtN(v, digits=4) {
  return typeof v === 'number' ? v.toFixed(digits) : v;
}

function accClass(acc) {
  if (acc >= 0.95) return 'acc-high';
  if (acc >= 0.85) return 'acc-med';
  return 'acc-low';
}

function accEmoji(acc) {
  if (acc >= 0.97) return '🏆';
  if (acc >= 0.95) return '⭐';
  if (acc >= 0.90) return '✅';
  return '📌';
}

async function api(url, opts={}) {
  const res = await fetch(url, opts);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API Error ${res.status}: ${text}`);
  }
  return res.json();
}

// ── Navigation ─────────────────────────────────────────────────────────────

function toggleSidebar() {
  $('sidebar').classList.toggle('collapsed');
}

function navigate(page) {
  state.currentPage = page;
  document.querySelectorAll('.nav-item').forEach(el => {
    el.classList.toggle('active', el.dataset.page === page);
  });
  $('page-title').textContent = getPageTitle(page);

  if (page === 'dashboard') renderDashboard();
  else if (page === 'specrnet') renderSpecRNet();
  else if (page.startsWith('model-')) renderModel(page.replace('model-', ''));
  else if (page === 'summary') renderSummary();
  else if (page === 'test') renderTest();
}

// ── SpecRNet Page ──────────────────────────────────────────────────────────

async function renderSpecRNet() {
  setContent(`<div style="display:flex;align-items:center;justify-content:center;height:200px;">
    <div class="spinner"></div><span style="margin-left:12px;color:#64748b">${t('sr_loading')}</span>
  </div>`);

  let pre;
  try { pre = await api('/api/specrnet/precomputed'); }
  catch(e) { setContent(`<div class="alert alert-danger">❌ ${e.message}</div>`); return; }

  const summary = pre.summary || {};
  const curves = pre.training_curves || [];
  const baseline = pre.baseline_results || [];
  const ablation = pre.ablation_results || [];
  const speed = pre.speed_results || [];

  // Best result from baseline
  const best = baseline.reduce((b, r) => (r.Accuracy > (b?.Accuracy || 0) ? r : b), null) || {};

  const html = `
<!-- Architecture intro -->
<div class="card">
  <div class="model-header">
    <div class="model-icon" style="background:#6d28d915;font-size:28px;">🔊</div>
    <div class="model-info">
      <h2>SpecRNet <span style="color:#64748b;font-size:14px;font-weight:400">— ${currentLang==='zh'?'轻量级音频深度伪造检测神经网络':'Lightweight Audio Deepfake Detection Network'}</span></h2>
      <p>${t('sr_desc')}</p>
      <div style="display:flex;gap:6px;margin-top:8px;flex-wrap:wrap;">
        ${t('sr_tags').map(tag =>
          `<span style="background:#6d28d915;color:#6d28d9;padding:2px 8px;border-radius:10px;font-size:11px;font-weight:600">${tag}</span>`).join('')}
      </div>
    </div>
  </div>

  <!-- Architecture diagram -->
  <div style="text-align:center;">
    <img src="/static/image/1.png" alt="SpecRNet Architecture" style="max-width:100%;border-radius:10px;"/>
  </div>
</div>

<!-- Key metrics -->
<div class="grid-4">
  <div class="stat-card">
    <div class="stat-label">${t('sr_stat_acc')}</div>
    <div class="stat-value" style="color:#6d28d9">${((best.Accuracy||0)*100).toFixed(2)}%</div>
    <div class="stat-sub">${t('sr_test_set')}</div>
  </div>
  <div class="stat-card">
    <div class="stat-label">${t('sr_stat_auc')}</div>
    <div class="stat-value" style="color:#0891b2">${((best.AUC||0)*100).toFixed(2)}%</div>
    <div class="stat-sub">${t('sr_auc_sub')}</div>
  </div>
  <div class="stat-card">
    <div class="stat-label">${t('sr_stat_f1')}</div>
    <div class="stat-value" style="color:#059669">${((best.F1||0)*100).toFixed(2)}%</div>
    <div class="stat-sub">${t('sr_f1_sub')}</div>
  </div>
  <div class="stat-card">
    <div class="stat-label">${t('sr_stat_eer')}</div>
    <div class="stat-value" style="color:#d97706">${((best.EER||0)*100).toFixed(2)}%</div>
    <div class="stat-sub">${t('sr_eer_sub')}</div>
  </div>
</div>

<!-- Tabs -->
<div class="card" style="margin-top:4px;">
  <div class="tabs">
    <div class="tab active" onclick="switchTab(event,'stab-training')">${t('sr_tab_training')}</div>
    <div class="tab" onclick="switchTab(event,'stab-baseline')">${t('sr_tab_baseline')}</div>
    <div class="tab" onclick="switchTab(event,'stab-ablation')">${t('sr_tab_ablation')}</div>
    <div class="tab" onclick="switchTab(event,'stab-demo')">${t('sr_tab_demo')}</div>
    <div class="tab" onclick="switchTab(event,'stab-predict')">${t('sr_tab_predict')}</div>
  </div>

  <!-- Training curves -->
  <div class="tab-panel active" id="stab-training">
    <div class="alert alert-info" style="margin-bottom:16px;">
      ${t('sr_training_note', {e: summary.best_epoch ?? '?', f: summary.best_f1?.toFixed(4) ?? '?'})}
    </div>
    <div style="height:300px;"><canvas id="chart-sr-loss"></canvas></div>
    <div style="height:260px;margin-top:16px;"><canvas id="chart-sr-metrics"></canvas></div>
  </div>

  <!-- Baseline table -->
  <div class="tab-panel" id="stab-baseline">
    <div class="alert alert-info" style="margin-bottom:16px;">${t('sr_baseline_note')}</div>
    <div class="table-wrap">
      <table>
        <thead><tr><th>${t('sr_bl_col1')}</th><th>${t('sr_bl_col2')}</th><th>AUC ↑</th><th>EER ↓</th><th>F1 ↑</th><th>${t('acc_label')} ↑</th></tr></thead>
        <tbody>
          ${baseline.map(r => `<tr>
            <td>${r.variant || 'default'}</td>
            <td>${t('seed_label')}${r.seed}</td>
            <td>${(r.AUC*100).toFixed(2)}%</td>
            <td>${(r.EER*100).toFixed(2)}%</td>
            <td>${(r.F1*100).toFixed(2)}%</td>
            <td>${(r.Accuracy*100).toFixed(2)}%</td>
          </tr>`).join('')}
          <tr style="background:#f8fafc;font-weight:700;">
            <td colspan="2">${t('mean_std')}</td>
            <td>${specMeanStd(baseline,'AUC')}</td>
            <td>${specMeanStd(baseline,'EER')}</td>
            <td>${specMeanStd(baseline,'F1')}</td>
            <td>${specMeanStd(baseline,'Accuracy')}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div style="height:260px;margin-top:20px;"><canvas id="chart-sr-baseline"></canvas></div>
  </div>

  <!-- Ablation -->
  <div class="tab-panel" id="stab-ablation">
    <div class="alert alert-info" style="margin-bottom:16px;">${t('sr_ablation_note')}</div>
    <div class="table-wrap">
      <table>
        <thead><tr><th>${t('sr_abl_col1')}</th><th>AUC ↑</th><th>EER ↓</th><th>F1 ↑</th><th>${t('acc_label')} ↑</th><th>${t('sr_abl_col_params')}</th><th>${t('sr_abl_col_time')}</th><th>${t('sr_abl_col5')}</th></tr></thead>
        <tbody>
          ${(() => {
            const expToVariant = { duration_1s: 'duration_1s_default' };
            const speedMap = {};
            (speed || []).forEach(r => { speedMap[r.variant] = r; });
            return ablation.map(r => {
              const ablLabels = {
                'no-att': t('sr_abl_noatt'),
                'gap': t('sr_abl_gap'),
                'duration_1s': t('sr_abl_dur1'),
                'weighted_loss_off': t('sr_abl_wloff'),
                'weighted_loss_on': t('sr_abl_wlon'),
              };
              const key = expToVariant[r.experiment] || r.experiment;
              const sp = speedMap[key];
              const paramsStr = sp ? (sp.params >= 1e6 ? (sp.params/1e6).toFixed(2)+'M' : (sp.params/1e3).toFixed(1)+'K') : '—';
              const timeStr  = sp ? sp.inference_ms_per_sample.toFixed(2)+' ms' : '—';
              return `<tr>
                <td><strong>${r.experiment}</strong></td>
                <td>${(r.AUC*100).toFixed(2)}%</td>
                <td>${(r.EER*100).toFixed(2)}%</td>
                <td>${(r.F1*100).toFixed(2)}%</td>
                <td>${(r.Accuracy*100).toFixed(2)}%</td>
                <td style="font-family:monospace">${paramsStr}</td>
                <td style="font-family:monospace">${timeStr}</td>
                <td style="font-size:11px;color:#64748b">${ablLabels[r.experiment] || ''}</td>
              </tr>`;
            }).join('');
          })()}
        </tbody>
      </table>
    </div>
    <div style="height:280px;margin-top:20px;"><canvas id="chart-sr-ablation"></canvas></div>
  </div>

  <!-- Demo evaluation -->
  <div class="tab-panel" id="stab-demo">
    <div class="alert alert-info" style="margin-bottom:16px;">${t('sr_demo_note')}</div>
    <div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap;margin-bottom:16px;">
      <button class="btn btn-primary" id="demo-run-btn" onclick="runSpecRNetDemo()">${t('sr_demo_run_btn')}</button>
      <span id="demo-status" style="font-size:13px;color:#64748b;"></span>
    </div>
    <div id="demo-log" style="display:none;" class="progress-container" style="max-height:160px;overflow-y:auto;"></div>
    <div id="demo-result" style="display:none;"></div>
  </div>

  <!-- Upload predict -->
  <div class="tab-panel" id="stab-predict">
    <div class="alert alert-info" style="margin-bottom:16px;">${t('sr_predict_note')}</div>
    <div class="upload-area" id="sr-upload-area" onclick="$('sr-file-input').click()"
         ondragover="event.preventDefault();this.classList.add('drag-over')"
         ondragleave="this.classList.remove('drag-over')"
         ondrop="handleSRDrop(event)">
      <div class="upload-icon">🎵</div>
      <div class="upload-text">${t('sr_upload_text')}</div>
      <div class="upload-hint">wav · mp3 · flac · ogg · m4a</div>
    </div>
    <input type="file" id="sr-file-input" accept=".wav,.mp3,.flac,.ogg,.m4a" style="display:none"
           onchange="handleSRFileSelect(this.files[0])"/>
    <div id="sr-selected" style="display:none;margin-top:12px;padding:12px;background:#f8fafc;border-radius:8px;font-size:13px;">
      <span id="sr-file-name"></span>
      <button class="btn btn-primary btn-sm" style="margin-left:12px;" onclick="submitSRPredict()">${t('sr_predict_btn')}</button>
    </div>
    <div id="sr-loading" style="display:none;margin-top:16px;text-align:center;color:#64748b;">
      <div class="spinner" style="margin:0 auto 8px;"></div>
      <div>${t('sr_predict_loading')}</div>
    </div>
    <div id="sr-result" style="display:none;"></div>
  </div>

</div>`;

  setContent(html);

  // Render training charts after DOM update
  setTimeout(() => {
    renderSRTrainingCharts(curves);
    renderSRBaselineChart(baseline);
    renderSRAblationChart(ablation, speed);
  }, 50);
}

function specMeanStd(rows, key) {
  const vals = rows.map(r => r[key]).filter(v => v != null);
  if (!vals.length) return '—';
  const mean = vals.reduce((s, v) => s + v, 0) / vals.length;
  const std = Math.sqrt(vals.reduce((s, v) => s + (v - mean) ** 2, 0) / vals.length);
  return `${(mean*100).toFixed(2)}% ± ${(std*100).toFixed(2)}%`;
}

function renderSRTrainingCharts(curves) {
  if (!curves.length) return;
  const epochs = curves.map(c => c.epoch + 1);

  // Loss chart
  const lossEl = $('chart-sr-loss');
  if (lossEl) {
    state.charts['sr-loss'] = new Chart(lossEl, {
      type: 'line',
      data: {
        labels: epochs,
        datasets: [{
          label: t('sr_loss_label'),
          data: curves.map(c => c.train_loss),
          borderColor: '#ef4444',
          backgroundColor: 'rgba(239,68,68,.1)',
          fill: true,
          tension: 0.3,
          pointRadius: 4,
        }]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { position: 'top' } },
        scales: {
          x: { title: { display: true, text: 'Epoch' } },
          y: { title: { display: true, text: t('sr_loss_y') }, beginAtZero: true },
        }
      }
    });
  }

  // Metrics chart (F1, AUC, Acc)
  const metEl = $('chart-sr-metrics');
  if (metEl) {
    state.charts['sr-metrics'] = new Chart(metEl, {
      type: 'line',
      data: {
        labels: epochs,
        datasets: [
          { label: t('sr_val_f1'), data: curves.map(c => c.val_f1), borderColor: '#6d28d9', tension: 0.3, pointRadius: 4, fill: false },
          { label: t('sr_val_auc'), data: curves.map(c => c.val_auc), borderColor: '#0891b2', tension: 0.3, pointRadius: 4, fill: false },
          { label: t('sr_val_acc'), data: curves.map(c => c.val_acc), borderColor: '#059669', tension: 0.3, pointRadius: 4, fill: false },
        ]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { position: 'top' } },
        scales: {
          x: { title: { display: true, text: 'Epoch' } },
          y: {
            title: { display: true, text: t('sr_metrics_y') },
            min: 0.8, max: 1.01,
            ticks: { callback: v => (v * 100).toFixed(0) + '%' }
          }
        }
      }
    });
  }
}

function renderSRBaselineChart(baseline) {
  const el = $('chart-sr-baseline');
  if (!el || !baseline.length) return;
  const seeds = baseline.map(r => `Seed ${r.seed}`);
  state.charts['sr-baseline'] = new Chart(el, {
    type: 'bar',
    data: {
      labels: seeds,
      datasets: [
        { label: 'AUC', data: baseline.map(r => r.AUC), backgroundColor: 'rgba(8,145,178,.7)', borderRadius: 4 },
        { label: 'F1', data: baseline.map(r => r.F1), backgroundColor: 'rgba(109,40,217,.7)', borderRadius: 4 },
        { label: 'Accuracy', data: baseline.map(r => r.Accuracy), backgroundColor: 'rgba(5,150,105,.7)', borderRadius: 4 },
      ]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { position: 'top' } },
      scales: {
        y: {
          min: 0.95, max: 1.01,
          ticks: { callback: v => (v * 100).toFixed(1) + '%' }
        }
      }
    }
  });
}

function renderSRAblationChart(ablation, speed) {
  const el = $('chart-sr-ablation');
  if (!el || !ablation.length) return;
  const labels = ablation.map(r => r.experiment);
  const colors = ['#6d28d9', '#0891b2', '#ef4444', '#059669', '#f59e0b'];

  // Map ablation experiment name → inference_ms from speed table
  const speedMap = {};
  (speed || []).forEach(r => { speedMap[r.variant] = r.inference_ms_per_sample; });
  const expToVariant = { duration_1s: 'duration_1s_default' }; // name mismatch
  const msData = ablation.map(r => {
    const key = expToVariant[r.experiment] || r.experiment;
    return speedMap[key] ?? null;
  });
  const hasMs = msData.some(v => v !== null);

  const datasets = [
    { label: 'AUC',           data: ablation.map(r => r.AUC),      backgroundColor: colors.map(c => c + 'cc'), borderRadius: 4, yAxisID: 'y' },
    { label: 'F1',            data: ablation.map(r => r.F1),       backgroundColor: colors.map(c => c + '88'), borderRadius: 4, yAxisID: 'y' },
    { label: t('acc_label'),  data: ablation.map(r => r.Accuracy), backgroundColor: colors.map(c => c + '44'), borderRadius: 4, yAxisID: 'y' },
  ];
  if (hasMs) {
    datasets.push({
      type: 'line',
      label: currentLang === 'zh' ? '推理时间 (ms)' : 'Inference Time (ms)',
      data: msData,
      borderColor: '#f59e0b',
      backgroundColor: 'rgba(245,158,11,.15)',
      pointBackgroundColor: '#f59e0b',
      pointRadius: 5,
      tension: 0.3,
      yAxisID: 'yMs',
    });
  }

  state.charts['sr-ablation'] = new Chart(el, {
    type: 'bar',
    data: { labels, datasets },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { position: 'top' } },
      scales: {
        x: { ticks: { font: { size: 11 } } },
        y: {
          min: 0.9, max: 1.01,
          ticks: { callback: v => (v * 100).toFixed(1) + '%' },
        },
        ...(hasMs ? {
          yMs: {
            type: 'linear', position: 'right',
            title: { display: true, text: currentLang === 'zh' ? '推理时间 (ms)' : 'Inference Time (ms)', font: { size: 11 } },
            ticks: { callback: v => v.toFixed(2) + ' ms' },
            grid: { drawOnChartArea: false },
          }
        } : {}),
      }
    }
  });
}


// Demo evaluation
async function runSpecRNetDemo() {
  $('demo-run-btn').disabled = true;
  $('demo-status').textContent = t('model_launching');
  const logEl = $('demo-log');
  logEl.style.display = 'block';
  logEl.innerHTML = '';
  $('demo-result').style.display = 'none';

  function addLog(msg, cls='') {
    const line = document.createElement('div');
    line.className = 'log-line ' + cls;
    line.textContent = msg;
    logEl.appendChild(line);
    logEl.scrollTop = logEl.scrollHeight;
  }

  try {
    const resp = await api('/api/specrnet/run', { method: 'POST' });
    const jid = resp.job_id;
    const evtSource = new EventSource(`/api/jobs/${jid}/stream`);

    evtSource.onmessage = (e) => {
      const msg = JSON.parse(e.data);
      if (msg.type === 'progress') {
        addLog(msg.message);
        $('demo-status').textContent = t('sr_demo_running');
      } else if (msg.type === 'done') {
        evtSource.close();
        addLog(t('sr_demo_done'), 'log-done');
        $('demo-run-btn').disabled = false;
        $('demo-status').textContent = '';
        renderDemoResult(msg.result);
      } else if (msg.type === 'error') {
        evtSource.close();
        addLog('❌ ' + JSON.stringify(msg.message), 'log-error');
        $('demo-run-btn').disabled = false;
        $('demo-status').textContent = t('sr_demo_fail');
      }
    };
    evtSource.onerror = () => {
      evtSource.close();
      addLog(t('poll_disconnect'), 'log-error');
      pollSpecRNetDemo(jid, addLog);
    };
  } catch(e) {
    addLog('❌ ' + e.message, 'log-error');
    $('demo-run-btn').disabled = false;
  }
}

async function pollSpecRNetDemo(jid, addLog) {
  while (true) {
    await new Promise(r => setTimeout(r, 1500));
    try {
      const job = await api(`/api/jobs/${jid}`);
      if (job.status === 'done') { renderDemoResult(job.result); $('demo-run-btn').disabled = false; return; }
      if (job.status === 'error') { addLog('❌ ' + JSON.stringify(job.result), 'log-error'); $('demo-run-btn').disabled = false; return; }
    } catch(e) { addLog('⚠️ ' + e.message); }
  }
}

function renderDemoResult(r) {
  const cm = r.confusion_matrix || [[0,0],[0,0]];
  const tn=cm[0][0], fp=cm[0][1], fn=cm[1][0], tp=cm[1][1];
  const correctCount = r.per_file?.filter(f => f.correct).length || 0;

  const resultEl = $('demo-result');
  resultEl.style.display = 'block';
  resultEl.innerHTML = `
    <div style="margin-top:16px;">
      <div class="metric-row">
        <div class="metric-pill">${t('acc_label')} <span>${(r.accuracy*100).toFixed(2)}%</span></div>
        <div class="metric-pill">F1 <span>${(r.f1*100).toFixed(2)}%</span></div>
        <div class="metric-pill">${t('metric_precision')} <span>${(r.precision*100).toFixed(2)}%</span></div>
        <div class="metric-pill">${t('metric_recall')} <span>${(r.recall*100).toFixed(2)}%</span></div>
        ${r.auc ? `<div class="metric-pill">AUC <span>${(r.auc*100).toFixed(2)}%</span></div>` : ''}
        <div class="metric-pill">${t('n_samples')} <span>${r.n_samples}</span></div>
      </div>
      <div class="grid-2">
        <div>
          <div class="card-title"><span class="icon">🔲</span>${t('sr_demo_cm').replace('🔲 ','')}</div>
          <div class="cm-grid">
            <div class="cm-label"></div>
            <div class="cm-label">${t('cm_pred_real')}</div>
            <div class="cm-label">${t('cm_pred_fake')}</div>
            <div class="cm-label" style="writing-mode:vertical-lr;transform:rotate(180deg)">${t('cm_actual_real')}</div>
            <div class="cm-cell cm-tn">${tn}<div class="cm-sub">TN</div></div>
            <div class="cm-cell cm-fp">${fp}<div class="cm-sub">FP</div></div>
            <div class="cm-label" style="writing-mode:vertical-lr;transform:rotate(180deg)">${t('cm_actual_fake')}</div>
            <div class="cm-cell cm-fn">${fn}<div class="cm-sub">FN</div></div>
            <div class="cm-cell cm-tp">${tp}<div class="cm-sub">TP</div></div>
          </div>
        </div>
        <div>
          <div class="card-title"><span class="icon">📋</span>${t('sr_demo_files').replace('📋 ','')}</div>
          <div class="table-wrap" style="max-height:200px;overflow-y:auto;">
            <table style="font-size:12px;">
              <thead><tr><th>${t('sr_demo_col1')}</th><th>${t('sr_demo_col2')}</th><th>${t('sr_demo_col3')}</th><th>${t('sr_demo_col4')}</th><th>${t('sr_demo_col5')}</th></tr></thead>
              <tbody>
                ${(r.per_file||[]).slice(0,20).map(f => `<tr>
                  <td style="max-width:120px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;" title="${f.file}">${f.file}</td>
                  <td>${f.true}</td>
                  <td>${f.pred}</td>
                  <td>${(f.confidence*100).toFixed(1)}%</td>
                  <td>${f.correct ? '✅' : '❌'}</td>
                </tr>`).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>`;
}

// Single file prediction via SpecRNet
function handleSRDrop(event) {
  event.preventDefault();
  $('sr-upload-area').classList.remove('drag-over');
  const file = event.dataTransfer.files[0];
  if (file) handleSRFileSelect(file);
}

function handleSRFileSelect(file) {
  if (!file) return;
  state.srFile = file;
  $('sr-file-name').textContent = `📎 ${file.name}  (${(file.size/1024/1024).toFixed(2)} MB)`;
  $('sr-selected').style.display = 'block';
  $('sr-upload-area').style.borderColor = '#6d28d9';
}

async function submitSRPredict() {
  if (!state.srFile) return;
  $('sr-loading').style.display = 'block';
  $('sr-result').style.display = 'none';

  const fd = new FormData();
  fd.append('file', state.srFile);

  try {
    const res = await fetch('/api/specrnet/predict', { method: 'POST', body: fd });
    const data = await res.json();
    $('sr-loading').style.display = 'none';

    if (!res.ok) {
      $('sr-result').innerHTML = `<div class="alert alert-danger">❌ ${data.detail}</div>`;
      $('sr-result').style.display = 'block';
      return;
    }
    renderSRPredictResult(data);
  } catch(e) {
    $('sr-loading').style.display = 'none';
    $('sr-result').innerHTML = `<div class="alert alert-danger">❌ ${e.message}</div>`;
    $('sr-result').style.display = 'block';
  }
}

function renderSRPredictResult(data) {
  const isReal = data.label === 'REAL';
  const resultEl = $('sr-result');
  resultEl.style.display = 'block';
  resultEl.innerHTML = `
    <div style="margin-top:16px;">
      <div class="prediction-result">
        <div class="pred-emoji">${isReal ? '✅' : '🤖'}</div>
        <div class="pred-label ${isReal ? 'pred-real' : 'pred-fake'}">
          ${isReal ? t('pred_real') : t('pred_fake')}
        </div>
        <div class="pred-confidence">
          ${t('sr_confidence')}<strong>${(data.confidence*100).toFixed(1)}%</strong> &nbsp; · &nbsp; ${t('sr_model_used')}
        </div>
      </div>

      <div class="grid-2" style="margin-top:16px;">
        <div style="height:180px;"><canvas id="sr-prob-chart"></canvas></div>
        ${data.lfcc_profile ? `
        <div>
          <div class="card-title"><span class="icon">📡</span>${t('sr_lfcc_title').replace('📡 ','')}</div>
          <div style="height:150px;"><canvas id="sr-lfcc-chart"></canvas></div>
        </div>` : ''}
      </div>

      <div class="alert alert-${isReal ? 'success' : 'warning'}" style="margin-top:12px;margin-bottom:0;">
        ${isReal ? t('sr_real_msg') : t('sr_fake_msg')}
      </div>
    </div>`;

  setTimeout(() => {
    const probEl = $('sr-prob-chart');
    if (probEl) {
      state.charts['sr-prob'] = new Chart(probEl, {
        type: 'bar',
        data: {
          labels: [t('pred_real'), t('pred_fake')],
          datasets: [{ data: [data.real_prob, data.fake_prob],
            backgroundColor: ['rgba(5,150,105,.7)', 'rgba(239,68,68,.7)'], borderRadius: 6 }]
        },
        options: {
          responsive: true, maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: { y: { min: 0, max: 1, ticks: { callback: v => (v*100).toFixed(0)+'%' } } }
        }
      });
    }
    const lfccEl = $('sr-lfcc-chart');
    if (lfccEl && data.lfcc_profile) {
      state.charts['sr-lfcc'] = new Chart(lfccEl, {
        type: 'bar',
        data: {
          labels: data.lfcc_profile.map((_, i) => `LFCC${i+1}`),
          datasets: [{ label: currentLang === 'zh' ? 'LFCC 均值' : 'LFCC Mean', data: data.lfcc_profile,
            backgroundColor: '#6d28d988', borderRadius: 3 }]
        },
        options: {
          responsive: true, maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: { x: { ticks: { font: { size: 9 }, maxRotation: 45 } } }
        }
      });
    }
  }, 50);
}

// ── Dashboard ──────────────────────────────────────────────────────────────

async function renderDashboard() {
  setContent(`<div style="display:flex;align-items:center;justify-content:center;height:200px;">
    <div class="spinner"></div><span style="margin-left:12px;color:#64748b">${t('dash_loading')}</span>
  </div>`);

  let data;
  try { data = await api('/api/dashboard'); }
  catch(e) { setContent(`<div class="alert alert-danger">❌ ${e.message}</div>`); return; }

  const { total, real, fake, features, feature_by_label, feature_stats } = data;

  const html = `
<div class="grid-4" style="margin-bottom:20px;">
  <div class="stat-card">
    <div class="stat-label">${t('dash_total')}</div>
    <div class="stat-value" style="color:#4f46e5">${total.toLocaleString()}</div>
    <div class="stat-sub">${t('dash_training_data')}</div>
  </div>
  <div class="stat-card">
    <div class="stat-label">${t('dash_real')}</div>
    <div class="stat-value" style="color:#10b981">${real.toLocaleString()}</div>
    <div class="stat-sub">${(real/total*100).toFixed(1)}% ${t('dash_proportion')}</div>
  </div>
  <div class="stat-card">
    <div class="stat-label">${t('dash_fake')}</div>
    <div class="stat-value" style="color:#ef4444">${fake.toLocaleString()}</div>
    <div class="stat-sub">${(fake/total*100).toFixed(1)}% ${t('dash_proportion')}</div>
  </div>
  <div class="stat-card">
    <div class="stat-label">${t('dash_features')}</div>
    <div class="stat-value" style="color:#f59e0b">${features.length}</div>
    <div class="stat-sub">${t('dash_mfcc')}</div>
  </div>
</div>

<div class="grid-2">
  <div class="card">
    <div class="card-title"><span class="icon">🥧</span>${t('dash_pie_title').replace('🥧 ','')}</div>
    <div class="chart-container" style="height:220px;">
      <canvas id="chart-pie"></canvas>
    </div>
    <div class="alert alert-info" style="margin-top:12px;margin-bottom:0">
      ${t('dash_note')}
    </div>
  </div>
  <div class="card">
    <div class="card-title"><span class="icon">📡</span>${t('dash_feat_dist').replace('📡 ','')}</div>
    <div class="chart-container" style="height:220px;">
      <canvas id="chart-feat-types"></canvas>
    </div>
    <div style="margin-top:12px;font-size:12px;color:#64748b">
      <strong>${features.length}</strong> ${currentLang==='zh'?'维特征：':' features: '}
      chroma_stft · rms · spectral_centroid · spectral_bandwidth · rolloff · zero_crossing_rate · MFCC(×20)
    </div>
  </div>
</div>

<div class="card">
  <div class="card-title">
    <span class="icon">📊</span>
    ${t('dash_feat_compare').replace('📊 ','')}
    <div style="flex:1"></div>
    <select id="feat-select" onchange="updateFeatChart()" style="font-size:12px;padding:4px 8px;">
      ${features.map((f,i) => `<option value="${i}">${f}</option>`).join('')}
    </select>
  </div>
  <div class="chart-container" style="height:260px;">
    <canvas id="chart-features"></canvas>
  </div>
  <div id="feat-annotation" style="margin-top:8px;font-size:12px;color:#64748b;text-align:center;"></div>
</div>

<div class="card">
  <div class="card-title"><span class="icon">📋</span>${t('dash_feat_table_title').replace('📋 ','')}</div>
  <div class="table-wrap">
    <table>
      <thead><tr>
        <th>${t('dash_feat_col1')}</th><th>${t('dash_feat_col2')}</th>
        <th>${t('dash_feat_col3')}</th><th>${t('dash_feat_col4')}</th><th>${t('dash_feat_col5')}</th>
      </tr></thead>
      <tbody id="feat-table-body"></tbody>
    </table>
  </div>
</div>`;

  setContent(html);

  // Store data for later use
  state.dashData = { features, feature_by_label };

  // Pie chart
  state.charts['pie'] = new Chart($('chart-pie'), {
    type: 'doughnut',
    data: {
      labels: [t('dash_real_label'), t('dash_fake_label')],
      datasets: [{
        data: [real, fake],
        backgroundColor: ['#10b981', '#ef4444'],
        borderWidth: 0,
        hoverOffset: 8,
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: {
        legend: { position: 'bottom' },
        tooltip: {
          callbacks: {
            label: ctx => ` ${ctx.label}: ${ctx.parsed.toLocaleString()} ${t('n_samples')} (${(ctx.parsed/total*100).toFixed(1)}%)`
          }
        }
      }
    }
  });

  // Feature type donut
  state.charts['feat-types'] = new Chart($('chart-feat-types'), {
    type: 'doughnut',
    data: {
      labels: currentLang === 'zh'
        ? ['MFCC系数 (×20)', 'chroma色度', 'RMS能量', '频谱质心', '频谱带宽', '频谱滚降', '过零率']
        : ['MFCC (×20)', 'Chroma', 'RMS Energy', 'Spectral Centroid', 'Bandwidth', 'Rolloff', 'ZCR'],
      datasets: [{
        data: [20, 1, 1, 1, 1, 1, 1],
        backgroundColor: ['#4f46e5','#10b981','#f59e0b','#ef4444','#06b6d4','#8b5cf6','#ec4899'],
        borderWidth: 0,
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { position: 'right', labels: { font: { size: 11 } } } }
    }
  });

  // Feature comparison bar chart
  buildFeatChart(features, feature_by_label);
  updateFeatChart();

  // Feature table
  const tbody = $('feat-table-body');
  const FEAT_DESC = {
    chroma_stft: t('feat_chroma'),
    rms: t('feat_rms'),
    spectral_centroid: t('feat_cent'),
    spectral_bandwidth: t('feat_bw'),
    rolloff: t('feat_rolloff'),
    zero_crossing_rate: t('feat_zcr'),
  };
  tbody.innerHTML = features.map(f => {
    const d = feature_by_label[f];
    const diff = Math.abs(d.real_mean - d.fake_mean);
    const diffPct = d.real_mean !== 0 ? (diff / Math.abs(d.real_mean) * 100).toFixed(1) : '—';
    const desc = FEAT_DESC[f] || (f.startsWith('mfcc') ? t('feat_mfcc', {n: f.replace('mfcc','')}) : f);
    return `<tr>
      <td><code style="background:#f1f5f9;padding:2px 6px;border-radius:4px;font-size:11px">${f}</code></td>
      <td style="color:#64748b;font-size:12px">${desc}</td>
      <td>${fmtN(d.real_mean, 4)}</td>
      <td>${fmtN(d.fake_mean, 4)}</td>
      <td>${diffPct !== '—' ? diffPct + '%' : diffPct}</td>
    </tr>`;
  }).join('');
}

function buildFeatChart(features, feature_by_label) {
  // Show % difference: (fake - real) / |real| * 100
  // All features on the same scale regardless of unit magnitude
  const diffPct = features.map(f => {
    const d = feature_by_label[f];
    return d.real_mean !== 0
      ? parseFloat(((d.fake_mean - d.real_mean) / Math.abs(d.real_mean) * 100).toFixed(2))
      : 0;
  });
  const bgColors = diffPct.map(v => v >= 0 ? 'rgba(239,68,68,.75)' : 'rgba(16,185,129,.75)');

  const yLabel = currentLang === 'zh' ? 'AI声音相对真实声音偏差 (%)' : 'AI vs Real Deviation (%)';
  state.charts['features'] = new Chart($('chart-features'), {
    type: 'bar',
    data: {
      labels: features,
      datasets: [{
        label: yLabel,
        data: diffPct,
        backgroundColor: bgColors,
        borderRadius: 4,
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: ctx => {
              const v = ctx.parsed.y;
              return ` ${v > 0 ? '+' : ''}${v.toFixed(2)}%`;
            }
          }
        }
      },
      scales: {
        x: { ticks: { font: { size: 10 }, maxRotation: 45 } },
        y: {
          title: { display: true, text: yLabel, font: { size: 11 } },
          ticks: { callback: v => v + '%' },
        }
      }
    }
  });
}

function updateFeatChart() {
  const sel = $('feat-select');
  if (!sel || !state.dashData) return;
  const idx = parseInt(sel.value);
  const f = state.dashData.features[idx];
  const d = state.dashData.feature_by_label[f];

  // Update chart to highlight selected feature
  const chart = state.charts['features'];
  if (!chart) return;

  const diffPct = state.dashData.features.map(feat => {
    const fd = state.dashData.feature_by_label[feat];
    return fd.real_mean !== 0
      ? parseFloat(((fd.fake_mean - fd.real_mean) / Math.abs(fd.real_mean) * 100).toFixed(2))
      : 0;
  });
  chart.data.datasets[0].backgroundColor = diffPct.map((v, i) => {
    const base = v >= 0 ? '239,68,68' : '16,185,129';
    return i === idx ? `rgba(${base},1)` : `rgba(${base},.35)`;
  });
  chart.update();

  const annotation = $('feat-annotation');
  if (annotation) {
    const diff = ((d.real_mean - d.fake_mean) / (Math.abs(d.real_mean) || 1) * 100).toFixed(1);
    const sep = currentLang === 'zh' ? '，' : ', ';
    annotation.innerHTML = `
      <strong>${f}</strong>${sep}${t('dash_feat_annotation')} = <span style="color:#10b981">${fmtN(d.real_mean)}</span>${sep}
      ${t('dash_fake_annotation')} = <span style="color:#ef4444">${fmtN(d.fake_mean)}</span>${sep}
      ${t('dash_diff_annotation')} = ${Math.abs(diff)}%
    `;
  }
}

// ── Model Page ─────────────────────────────────────────────────────────────

async function renderModel(modelKey) {
  const meta = MODEL_META[modelKey];
  if (!meta) { setContent('<div class="alert alert-danger">Model not found</div>'); return; }

  const displayName = getModelDisplayName(modelKey);
  const subtitle = getModelSubtitle(modelKey);
  const html = `
<div class="card" style="padding:24px;">
  <div class="model-header">
    <div class="model-icon" style="background:${meta.color}22;">${meta.icon}</div>
    <div class="model-info">
      <h2>${displayName} <span style="color:#64748b;font-size:14px;font-weight:400">${subtitle}</span></h2>
      <p>${getModelDesc(meta)}</p>
      <div style="display:flex;gap:6px;margin-top:8px;flex-wrap:wrap;">
        ${getModelTags(meta).map(tag => `<span style="background:${meta.color}15;color:${meta.color};padding:2px 8px;border-radius:10px;font-size:11px;font-weight:600">${tag}</span>`).join('')}
      </div>
    </div>
  </div>

  <div class="run-section">
    <button class="btn btn-primary" id="run-btn" onclick="runModel('${modelKey}')">
      ${t('model_run_btn')}
    </button>
    <button class="btn btn-outline btn-sm" id="rerun-btn" onclick="rerunModel('${modelKey}')" style="display:none;">
      ${t('model_rerun_btn')}
    </button>
    <span id="run-status" style="font-size:13px;color:#64748b;"></span>
  </div>
</div>

<div id="progress-container" style="display:none;">
  <div id="progress-log"></div>
</div>

<div id="model-results" style="display:none;"></div>`;

  setContent(html);

  // Check if cached
  try {
    const cache = await api(`/api/models/${modelKey}/cache`);
    if (cache.cached) {
      $('run-status').textContent = t('model_cached');
      $('rerun-btn').style.display = '';
      renderModelResults(modelKey, cache.result);
    }
  } catch(e) {}
}

async function runModel(modelKey) {
  $('run-btn').disabled = true;
  $('run-status').textContent = t('model_launching');

  const pc = $('progress-container');
  const pl = $('progress-log');
  pc.style.display = 'block';
  pl.innerHTML = '';
  $('model-results').style.display = 'none';

  function addLog(msg, cls='') {
    const line = document.createElement('div');
    line.className = 'log-line ' + cls;
    line.textContent = msg;
    pl.appendChild(line);
    pc.scrollTop = pc.scrollHeight;
  }

  try {
    const resp = await api(`/api/models/${modelKey}/run`, { method: 'POST' });

    if (resp.cached) {
      addLog(t('model_cached_used'), 'log-done');
      $('run-btn').disabled = false;
      $('run-status').textContent = '';
      renderModelResults(modelKey, resp.result);
      return;
    }

    if (resp.already_running) {
      addLog(t('model_wait'));
    } else {
      addLog(t('model_start'));
    }

    const jid = resp.job_id;
    const evtSource = new EventSource(`/api/jobs/${jid}/stream`);

    evtSource.onmessage = (e) => {
      const msg = JSON.parse(e.data);
      if (msg.type === 'progress') {
        addLog(msg.message);
        $('run-status').textContent = t('model_training');
      } else if (msg.type === 'done') {
        evtSource.close();
        addLog(t('model_done'), 'log-done');
        $('run-btn').disabled = false;
        $('run-status').textContent = '';
        $('rerun-btn').style.display = '';
        renderModelResults(modelKey, msg.result);
      } else if (msg.type === 'error') {
        evtSource.close();
        addLog(t('model_error_prefix') + JSON.stringify(msg.message), 'log-error');
        $('run-btn').disabled = false;
        $('run-status').textContent = t('model_fail');
      }
    };

    evtSource.onerror = () => {
      evtSource.close();
      addLog(t('poll_disconnect'), 'log-error');
      pollJob(jid, modelKey, addLog);
    };

  } catch(e) {
    addLog(t('model_start_fail') + e.message, 'log-error');
    $('run-btn').disabled = false;
    $('run-status').textContent = '';
  }
}

async function pollJob(jid, modelKey, addLog) {
  while (true) {
    await new Promise(r => setTimeout(r, 1500));
    try {
      const job = await api(`/api/jobs/${jid}`);
      if (job.status === 'done') {
        addLog(t('model_done'), 'log-done');
        $('run-btn').disabled = false;
        $('rerun-btn').style.display = '';
        renderModelResults(modelKey, job.result);
        return;
      } else if (job.status === 'error') {
        addLog(t('model_fail') + ': ' + JSON.stringify(job.result), 'log-error');
        $('run-btn').disabled = false;
        return;
      }
      // Show latest progress
      const progress = job.progress || [];
      if (progress.length > 0) {
        addLog(progress[progress.length - 1]);
      }
    } catch(e) {
      addLog(`⚠️ ${currentLang==='zh'?'轮询失败':'Poll failed'}: ` + e.message);
    }
  }
}

async function rerunModel(modelKey) {
  if (!confirm(t('model_rerun_confirm'))) return;
  await fetch(`/api/models/${modelKey}/cache`, { method: 'DELETE' });
  $('rerun-btn').style.display = 'none';
  $('model-results').style.display = 'none';
  runModel(modelKey);
}

function renderModelResults(modelKey, result) {
  const meta = MODEL_META[modelKey];
  const container = $('model-results');
  container.style.display = 'block';

  const cm = result.confusion_matrix || [[0,0],[0,0]];
  const tn = cm[0][0], fp = cm[0][1], fn = cm[1][0], tp = cm[1][1];
  const acc = result.accuracy || 0;
  const m = result.metrics || {};

  // Build tab content
  const hasSweep = result.sweep && result.sweep.k_values;
  const hasFeatImp = result.feature_importance && result.feature_importance.length;
  const hasTraining = result.training_curves && result.training_curves.length;
  const hasKsel = result.k_selection;

  let tabs = `
    <div class="tabs">
      <div class="tab active" onclick="switchTab(event, 'tab-metrics')">${t('tab_metrics')}</div>
      ${hasFeatImp ? `<div class="tab" onclick="switchTab(event, 'tab-importance')">${t('tab_importance')}</div>` : ''}
      ${hasSweep ? `<div class="tab" onclick="switchTab(event, 'tab-sweep')">${t('tab_sweep')}</div>` : ''}
      ${hasTraining ? `<div class="tab" onclick="switchTab(event, 'tab-training')">${t('tab_training')}</div>` : ''}
      ${hasKsel ? `<div class="tab" onclick="switchTab(event, 'tab-ksel')">${t('tab_ksel')}</div>` : ''}
    </div>`;

  // Metrics tab
  const cmPredDir = currentLang === 'zh' ? '预测结果 →' : 'Predicted →';
  const tnLabel = currentLang === 'zh' ? '真负(TN)' : 'TN';
  const fpLabel = currentLang === 'zh' ? '假正(FP)' : 'FP';
  const fnLabel = currentLang === 'zh' ? '假负(FN)' : 'FN';
  const tpLabel = currentLang === 'zh' ? '真正(TP)' : 'TP';
  let tabMetrics = `
  <div class="tab-panel active" id="tab-metrics">
    <div class="metric-row">
      <div class="metric-pill">${t('metric_accuracy')} <span>${fmt(acc)}</span></div>
      <div class="metric-pill">${t('metric_precision_fake')} <span>${fmt(m.FAKE?.precision)}</span></div>
      <div class="metric-pill">${t('metric_recall_fake')} <span>${fmt(m.FAKE?.recall)}</span></div>
      <div class="metric-pill">${t('metric_f1_fake')} <span>${fmt(m.FAKE?.['f1-score'])}</span></div>
      <div class="metric-pill">${t('metric_precision_real')} <span>${fmt(m.REAL?.precision)}</span></div>
      <div class="metric-pill">${t('metric_recall_real')} <span>${fmt(m.REAL?.recall)}</span></div>
    </div>

    <div class="grid-2" style="gap:20px;">
      <div>
        <div class="card-title"><span class="icon">📊</span>${t('metrics_chart_title').replace('📊 ','')}</div>
        <div style="height:220px;"><canvas id="chart-${modelKey}-metrics"></canvas></div>
      </div>
      <div>
        <div class="card-title"><span class="icon">🔲</span>${t('cm_title').replace('🔲 ','')}</div>
        <div style="margin-top:8px;">
          <div style="text-align:center;font-size:11px;color:#64748b;margin-bottom:4px;">${cmPredDir}</div>
          <div class="cm-grid">
            <div class="cm-label"></div>
            <div class="cm-label">${t('cm_pred_fake')}</div>
            <div class="cm-label">${t('cm_pred_real')}</div>
            <div class="cm-label" style="writing-mode:vertical-lr;text-orientation:mixed;transform:rotate(180deg)">${t('cm_actual_fake')}</div>
            <div class="cm-cell cm-tn">${tn}<div class="cm-sub">${tnLabel}</div></div>
            <div class="cm-cell cm-fp">${fp}<div class="cm-sub">${fpLabel}</div></div>
            <div class="cm-label" style="writing-mode:vertical-lr;text-orientation:mixed;transform:rotate(180deg)">${t('cm_actual_real')}</div>
            <div class="cm-cell cm-fn">${fn}<div class="cm-sub">${fnLabel}</div></div>
            <div class="cm-cell cm-tp">${tp}<div class="cm-sub">${tpLabel}</div></div>
          </div>
          <div style="margin-top:12px;font-size:12px;color:#64748b;">
            <div>${t('cm_correct')}</div>
            <div>${t('cm_wrong')}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="alert alert-info" style="margin-top:16px;margin-bottom:0;">
      ${t('metrics_note')}
    </div>
  </div>`;

  // Feature importance tab
  let tabImportance = hasFeatImp ? `
  <div class="tab-panel" id="tab-importance">
    <div class="alert alert-info" style="margin-bottom:16px;">${t('feat_imp_note')}</div>
    <div id="feat-imp-bars" style="max-width:600px;"></div>
  </div>` : '';

  // Sweep tab
  let tabSweep = hasSweep ? `
  <div class="tab-panel" id="tab-sweep">
    <div class="alert alert-info" style="margin-bottom:16px;">${t('sweep_note')}</div>
    <div style="height:320px;"><canvas id="chart-${modelKey}-sweep"></canvas></div>
    <div id="sweep-info" style="margin-top:12px;display:flex;gap:16px;flex-wrap:wrap;font-size:13px;"></div>
  </div>` : '';

  // Training curves tab
  let tabTraining = hasTraining ? `
  <div class="tab-panel" id="tab-training">
    <div class="alert alert-info" style="margin-bottom:16px;">${t('training_note')}</div>
    <div style="height:300px;"><canvas id="chart-${modelKey}-training"></canvas></div>
  </div>` : '';

  // K selection tab
  let tabKsel = hasKsel ? `
  <div class="tab-panel" id="tab-ksel">
    <div class="alert alert-info" style="margin-bottom:16px;">${t('ksel_note')}</div>
    <div style="height:300px;"><canvas id="chart-${modelKey}-ksel"></canvas></div>
    <div style="margin-top:12px;font-size:13px;color:#64748b;text-align:center;">
      ${t('ksel_best')}<strong style="color:#4f46e5;font-size:16px">${result.best_k_value || '?'}</strong>
    </div>
  </div>` : '';

  container.innerHTML = `
<div class="card" style="margin-top:4px;">
  <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px;">
    <div class="acc-badge ${accClass(acc)}">
      ${accEmoji(acc)} ${t('metric_accuracy')}: ${fmt(acc)}
    </div>
    <div style="font-size:13px;color:#64748b;font-weight:600">${getModelDisplayName(modelKey)}</div>
    ${result.best_val_acc ? `<div class="acc-badge acc-high">${t('best_val_acc_label')}${fmt(result.best_val_acc)}</div>` : ''}
  </div>
  ${tabs}
  <div id="tab-panels">
    ${tabMetrics}
    ${tabImportance}
    ${tabSweep}
    ${tabTraining}
    ${tabKsel}
  </div>
</div>`;

  // Render charts after DOM update
  setTimeout(() => {
    renderMetricsChart(modelKey, m, meta);
    if (hasFeatImp) renderFeatImportance(modelKey, result.feature_importance, meta);
    if (hasSweep) renderSweepChart(modelKey, result.sweep, meta);
    if (hasTraining) renderTrainingChart(modelKey, result.training_curves, meta);
    if (hasKsel) renderKSelChart(modelKey, result.k_selection, result.best_k_value, meta);
  }, 50);
}

function switchTab(event, tabId) {
  const container = event.target.closest('.card') || document.querySelector('.card');
  const tabs = document.querySelectorAll('.tab');
  const panels = document.querySelectorAll('.tab-panel');
  tabs.forEach(tab => tab.classList.remove('active'));
  panels.forEach(p => p.classList.remove('active'));
  event.target.classList.add('active');
  const panel = $(tabId);
  if (panel) panel.classList.add('active');
}

function renderMetricsChart(modelKey, m, meta) {
  const el = $(`chart-${modelKey}-metrics`);
  if (!el) return;
  const labels = [t('metric_precision'), t('metric_recall'), t('metric_f1')];
  state.charts[`${modelKey}-metrics`] = new Chart(el, {
    type: 'bar',
    data: {
      labels,
      datasets: [
        {
          label: `FAKE (${currentLang==='zh'?'AI声音':'AI Voice'})`,
          data: [m.FAKE?.precision, m.FAKE?.recall, m.FAKE?.['f1-score']],
          backgroundColor: 'rgba(239,68,68,.7)',
          borderRadius: 4,
        },
        {
          label: `REAL (${currentLang==='zh'?'真实声音':'Real Voice'})`,
          data: [m.REAL?.precision, m.REAL?.recall, m.REAL?.['f1-score']],
          backgroundColor: 'rgba(16,185,129,.7)',
          borderRadius: 4,
        },
      ]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { position: 'top' } },
      scales: {
        y: { min: 0.5, max: 1.0, ticks: { callback: v => (v*100).toFixed(0)+'%' } }
      }
    }
  });
}

function renderFeatImportance(modelKey, featImp, meta) {
  const container = $('feat-imp-bars');
  if (!container) return;
  const top15 = featImp.slice(0, 15);
  const maxVal = top15[0]?.importance || 1;
  container.innerHTML = top15.map((f, i) => `
    <div class="feat-bar-row">
      <div class="feat-bar-label" title="${f.feature}">${i+1}. ${f.feature}</div>
      <div class="feat-bar-track">
        <div class="feat-bar-fill" style="width:${(f.importance/maxVal*100).toFixed(1)}%;background:${meta.color}"></div>
      </div>
      <div class="feat-bar-val">${f.importance.toFixed(4)}</div>
    </div>
  `).join('');
}

function renderSweepChart(modelKey, sweep, meta) {
  const el = $(`chart-${modelKey}-sweep`);
  if (!el) return;

  const { k_values, accuracies, best_k, best_acc, inflection_k } = sweep;
  const bestIdx = k_values.indexOf(best_k);
  const inflIdx = k_values.indexOf(inflection_k);

  // Point styles and radii
  const pointRadii = k_values.map((_, i) =>
    i === bestIdx ? 10 : i === inflIdx ? 8 : 4
  );
  const pointBg = k_values.map((_, i) =>
    i === bestIdx ? '#f59e0b' : i === inflIdx ? '#8b5cf6' : meta.color
  );
  const pointStyle = k_values.map((_, i) =>
    i === bestIdx ? 'star' : i === inflIdx ? 'triangle' : 'circle'
  );

  state.charts[`${modelKey}-sweep`] = new Chart(el, {
    type: 'line',
    data: {
      labels: k_values,
      datasets: [{
        label: t('sweep_cv_label'),
        data: accuracies,
        borderColor: meta.color,
        backgroundColor: meta.color + '15',
        fill: true,
        tension: 0.3,
        pointRadius: pointRadii,
        pointBackgroundColor: pointBg,
        pointStyle: pointStyle,
        pointBorderColor: '#fff',
        pointBorderWidth: 1.5,
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            title: ctx => `${t('sweep_xlabel')} = ${ctx[0].label}`,
            label: ctx => ` ${t('metric_accuracy')}: ${(ctx.parsed.y*100).toFixed(2)}%`,
            afterBody: (ctx) => {
              const i = ctx[0].dataIndex;
              const k = k_values[i];
              if (k === best_k) return ['⭐ Peak'];
              if (k === inflection_k) return ['🔺 Inflection'];
              return [];
            }
          }
        }
      },
      scales: {
        x: { title: { display: true, text: t('sweep_xlabel') } },
        y: {
          title: { display: true, text: t('sweep_ylabel') },
          ticks: { callback: v => (v*100).toFixed(1)+'%' },
          min: Math.max(0, Math.min(...accuracies) - 0.05),
          max: Math.min(1, Math.max(...accuracies) + 0.02),
        }
      }
    }
  });

  const infoEl = $('sweep-info');
  if (infoEl) {
    infoEl.innerHTML = `
      <div style="display:flex;gap:16px;align-items:center;flex-wrap:wrap;">
        <div style="display:flex;align-items:center;gap:6px;">
          <span style="background:#f59e0b;width:14px;height:14px;border-radius:50%;display:inline-block;"></span>
          <span>${t('sweep_peak_label', {k: best_k, acc: fmt(best_acc)})}</span>
        </div>
        <div style="display:flex;align-items:center;gap:6px;">
          <span style="background:#8b5cf6;width:14px;height:14px;border-radius:50%;display:inline-block;"></span>
          <span>${t('sweep_infl_label', {k: inflection_k})}</span>
        </div>
      </div>
      <div style="font-size:12px;color:#64748b;margin-top:8px;">${t('sweep_insight')}</div>`;
  }
}

function renderTrainingChart(modelKey, curves, meta) {
  const el = $(`chart-${modelKey}-training`);
  if (!el) return;
  const epochs = curves.map(c => c.epoch);
  state.charts[`${modelKey}-training`] = new Chart(el, {
    type: 'line',
    data: {
      labels: epochs,
      datasets: [
        {
          label: t('train_acc_label'),
          data: curves.map(c => c.train_acc),
          borderColor: meta.color,
          backgroundColor: 'transparent',
          tension: 0.3,
          pointRadius: 0,
          borderWidth: 2,
        },
        {
          label: t('val_acc_label'),
          data: curves.map(c => c.val_acc),
          borderColor: '#10b981',
          backgroundColor: 'transparent',
          tension: 0.3,
          pointRadius: 0,
          borderWidth: 2,
          borderDash: [5, 3],
        },
        {
          label: t('train_loss_label'),
          data: curves.map(c => c.train_loss),
          borderColor: '#f59e0b',
          backgroundColor: 'transparent',
          tension: 0.3,
          pointRadius: 0,
          borderWidth: 1.5,
          yAxisID: 'y2',
        },
      ]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { position: 'top' } },
      scales: {
        x: { title: { display: true, text: t('training_xlabel') } },
        y: {
          title: { display: true, text: t('training_ylabel') },
          ticks: { callback: v => (v*100).toFixed(0)+'%' },
          min: 0, max: 1,
        },
        y2: {
          position: 'right',
          title: { display: true, text: 'Loss' },
          grid: { drawOnChartArea: false },
        }
      }
    }
  });
}

function renderKSelChart(modelKey, kScores, bestK, meta) {
  const el = $(`chart-${modelKey}-ksel`);
  if (!el) return;
  const ks = kScores.map(s => s.k);
  const accs = kScores.map(s => s.cv_acc);
  const colors = ks.map(k => k === bestK ? meta.color : meta.color + '60');

  state.charts[`${modelKey}-ksel`] = new Chart(el, {
    type: 'bar',
    data: {
      labels: ks.map(k => `k=${k}`),
      datasets: [{
        label: t('sweep_cv_label'),
        data: accs,
        backgroundColor: colors,
        borderRadius: 4,
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: { callbacks: { label: ctx => ` ${t('metric_accuracy')}: ${(ctx.parsed.y*100).toFixed(2)}%` } }
      },
      scales: {
        y: {
          min: Math.max(0.5, Math.min(...accs) - 0.02),
          max: Math.min(1.0, Math.max(...accs) + 0.01),
          ticks: { callback: v => (v*100).toFixed(1)+'%' }
        }
      }
    }
  });
}

// ── Summary Page ──────────────────────────────────────────────────────────

async function renderSummary() {
  setContent(`<div style="display:flex;align-items:center;justify-content:center;height:200px;">
    <div class="spinner"></div><span style="margin-left:12px;color:#64748b">${t('summary_loading')}</span>
  </div>`);

  let data;
  try { data = await api('/api/summary'); }
  catch(e) { setContent(`<div class="alert alert-danger">❌ ${e.message}</div>`); return; }

  const modelKeys = ['logistic_regression', 'random_forest', 'svm', 'xgboost', 'knn', 'mlp'];
  const loaded = modelKeys.filter(k => data[k]);
  const missing = modelKeys.filter(k => !data[k]);

  if (loaded.length === 0) {
    setContent(`<div class="alert alert-warning">${t('summary_no_models')}</div>`);
    return;
  }

  const accList = loaded.map(k => data[k].accuracy);
  const bestAcc = Math.max(...accList);

  // Build comparison table
  const tableRows = loaded.map(k => {
    const r = data[k];
    const m = r.metrics || {};
    const isB = r.accuracy === bestAcc;
    const meta = MODEL_META[k];
    return `<tr>
      <td><span style="font-size:16px;">${meta.icon}</span> ${getModelDisplayName(k)}</td>
      <td class="${isB ? 'best-cell' : ''}">${fmt(r.accuracy)}</td>
      <td>${fmt(m.FAKE?.precision)}</td>
      <td>${fmt(m.FAKE?.recall)}</td>
      <td>${fmt(m.FAKE?.['f1-score'])}</td>
      <td>${fmt(m.REAL?.precision)}</td>
      <td>${fmt(m.REAL?.recall)}</td>
      <td>${fmt(m.REAL?.['f1-score'])}</td>
    </tr>`;
  }).join('');

  const sep = currentLang === 'zh' ? '、' : ', ';
  const html = `
${missing.length > 0 ? `<div class="alert alert-warning">
  ${t('summary_missing', {names: missing.map(k => getModelDisplayName(k)).join(sep)})}
</div>` : ''}

<div class="card">
  <div class="card-title"><span class="icon">📊</span>${t('summary_acc_title').replace('📊 ','')}</div>
  <div style="height:300px;"><canvas id="chart-summary-acc"></canvas></div>
</div>

<div class="card">
  <div class="card-title"><span class="icon">🔢</span>${t('summary_table_title').replace('🔢 ','')}</div>
  <div class="table-wrap">
    <table>
      <thead><tr>
        <th>${t('tbl_model')}</th>
        <th>${t('tbl_acc')}</th>
        <th>${t('tbl_prec_fake')}</th>
        <th>${t('tbl_rec_fake')}</th>
        <th>${t('tbl_f1_fake')}</th>
        <th>${t('tbl_prec_real')}</th>
        <th>${t('tbl_rec_real')}</th>
        <th>${t('tbl_f1_real')}</th>
      </tr></thead>
      <tbody>${tableRows}</tbody>
    </table>
  </div>
</div>

${loaded.some(k => data[k].sweep) ? `
<div class="card">
  <div class="card-title"><span class="icon">📉</span>${t('summary_sweep_title').replace('📉 ','')}</div>
  <div style="height:360px;"><canvas id="chart-summary-sweep"></canvas></div>
  <div style="margin-top:12px;font-size:12px;color:#64748b;">${t('summary_sweep_note')}</div>
</div>` : ''}

<div class="card">
  <div class="card-title"><span class="icon">💬</span>${t('summary_comment_title').replace('💬 ','')}</div>
  <div id="summary-comments"></div>
</div>`;

  setContent(html);

  // Accuracy comparison chart
  const colors = loaded.map(k => MODEL_META[k].color);
  state.charts['summary-acc'] = new Chart($('chart-summary-acc'), {
    type: 'bar',
    data: {
      labels: loaded.map(k => getModelDisplayName(k)),
      datasets: [{
        label: t('acc_label'),
        data: loaded.map(k => data[k].accuracy),
        backgroundColor: colors.map(c => c + 'cc'),
        borderColor: colors,
        borderWidth: 2,
        borderRadius: 6,
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: { callbacks: { label: ctx => ` ${t('metric_accuracy')}: ${(ctx.parsed.y*100).toFixed(2)}%` } }
      },
      scales: {
        y: {
          min: Math.max(0.5, Math.min(...accList) - 0.05),
          max: Math.min(1.0, Math.max(...accList) + 0.02),
          ticks: { callback: v => (v*100).toFixed(1)+'%' }
        }
      }
    }
  });

  // Sweep comparison chart
  const sweepEl = $('chart-summary-sweep');
  if (sweepEl) {
    const sweepDatasets = loaded
      .filter(k => data[k].sweep)
      .map(k => {
        const s = data[k].sweep;
        const meta = MODEL_META[k];
        return {
          label: getModelDisplayName(k),
          data: s.accuracies,
          borderColor: meta.color,
          backgroundColor: 'transparent',
          tension: 0.3,
          pointRadius: s.k_values.map((_, i) => {
            if (i === s.k_values.indexOf(s.best_k)) return 8;
            if (i === s.k_values.indexOf(s.inflection_k)) return 6;
            return 2;
          }),
        };
      });

    state.charts['summary-sweep'] = new Chart(sweepEl, {
      type: 'line',
      data: {
        labels: Array.from({length: 26}, (_, i) => i+1),
        datasets: sweepDatasets,
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { position: 'top' } },
        scales: {
          x: { title: { display: true, text: t('sweep_xlabel') } },
          y: {
            title: { display: true, text: t('sweep_ylabel') },
            ticks: { callback: v => (v*100).toFixed(1)+'%' },
          }
        }
      }
    });
  }

  // Generate comments
  buildSummaryComments(loaded, data, $('summary-comments'));
}

function buildSummaryComments(loaded, data, container) {
  const best = loaded.reduce((a, b) => data[a].accuracy > data[b].accuracy ? a : b);

  const comments = [];
  const sep = currentLang === 'zh' ? '、' : ', ';

  if (data[best].accuracy >= 0.97) {
    const bestLabel = currentLang === 'zh'
      ? `🏆 <strong>${MODEL_META[best].name}</strong> 表现最优，准确率高达 <strong>${fmt(data[best].accuracy)}</strong>，说明该模型非常擅长区分真实声音和AI合成声音。`
      : `🏆 <strong>${MODEL_META[best].en}</strong> achieved the best accuracy of <strong>${fmt(data[best].accuracy)}</strong>, showing it excels at distinguishing real from AI-generated voices.`;
    comments.push(bestLabel);
  }

  if (loaded.includes('random_forest') || loaded.includes('xgboost')) {
    const ensembleModels = ['random_forest', 'xgboost'].filter(k => loaded.includes(k));
    const ensembleAvg = ensembleModels.reduce((sum, k) => sum + data[k].accuracy, 0) / ensembleModels.length;
    comments.push(t('sc_ensemble', {names: ensembleModels.map(k => getModelDisplayName(k)).join(sep), acc: fmt(ensembleAvg)}));
  }

  if (loaded.includes('mlp') && data['mlp'].training_curves) {
    const finalAcc = data['mlp'].training_curves[data['mlp'].training_curves.length - 1].val_acc;
    comments.push(t('sc_mlp', {acc: fmt(data['mlp'].best_val_acc || finalAcc)}));
  }

  if (loaded.includes('knn')) {
    comments.push(t('sc_knn', {k: data['knn'].best_k_value, acc: fmt(data['knn'].accuracy)}));
  }

  const allSweeps = loaded.filter(k => data[k].sweep);
  if (allSweeps.length > 0) {
    const minFeats = allSweeps.reduce((b, k) => {
      return data[k].sweep.inflection_k < data[b].sweep.inflection_k ? k : b;
    });
    comments.push(t('sc_dim', {name: getModelDisplayName(minFeats), k: data[minFeats].sweep.inflection_k}));
  }

  comments.push(t('sc_conclusion'));

  container.innerHTML = comments.map((c, i) => `
    <div class="alert alert-${i === comments.length-1 ? 'success' : 'info'}" style="margin-bottom:12px;">
      ${c}
    </div>
  `).join('');
}

// ── Test Model Page ───────────────────────────────────────────────────────

function renderTest() {
  const html = `
<div class="card">
  <div class="card-title"><span class="icon">🔬</span>${t('test_title').replace('🔬 ','')}</div>
  <div class="alert alert-info" style="margin-bottom:16px;">${t('test_note')}</div>

  <div style="display:flex;gap:12px;align-items:center;margin-bottom:16px;flex-wrap:wrap;">
    <label style="font-size:13px;font-weight:600;">${t('test_select_model')}</label>
    <select id="model-select">
      <option value="logistic_regression">📈 ${getModelDisplayName('logistic_regression')}</option>
      <option value="random_forest" selected>🌲 ${getModelDisplayName('random_forest')}</option>
      <option value="svm">🔷 ${getModelDisplayName('svm')}</option>
      <option value="xgboost">⚡ ${getModelDisplayName('xgboost')}</option>
      <option value="knn">📍 ${getModelDisplayName('knn')}</option>
      <option value="mlp">🧠 ${getModelDisplayName('mlp')}</option>
    </select>
    <span style="font-size:12px;color:#64748b;">${t('test_format_hint')}</span>
  </div>

  <div class="upload-area" id="upload-area" onclick="$('file-input').click()"
       ondragover="event.preventDefault();this.classList.add('drag-over')"
       ondragleave="this.classList.remove('drag-over')"
       ondrop="handleDrop(event)">
    <div class="upload-icon">🎵</div>
    <div class="upload-text">${t('test_upload_text')}</div>
    <div class="upload-hint">${t('test_upload_hint')}</div>
  </div>
  <input type="file" id="file-input" accept=".wav,.mp3,.flac,.ogg,.m4a" style="display:none"
         onchange="handleFileSelect(this.files[0])"/>

  <div id="selected-file" style="display:none;margin-top:12px;padding:12px;background:#f8fafc;border-radius:8px;font-size:13px;">
    <span id="file-name"></span>
    <button class="btn btn-primary btn-sm" style="margin-left:12px;" onclick="submitPredict()">
      ${t('test_predict_btn')}
    </button>
  </div>

  <div id="predict-loading" style="display:none;margin-top:16px;text-align:center;color:#64748b;">
    <div class="spinner" style="margin:0 auto 8px;"></div>
    <div>${t('test_loading')}</div>
    <div style="font-size:12px;margin-top:4px;">${t('test_loading_sub')}</div>
  </div>
</div>

<div id="predict-result" style="display:none;"></div>`;

  setContent(html);
  state.selectedFile = null;
}

function handleDrop(event) {
  event.preventDefault();
  $('upload-area').classList.remove('drag-over');
  const file = event.dataTransfer.files[0];
  if (file) handleFileSelect(file);
}

function handleFileSelect(file) {
  if (!file) return;
  state.selectedFile = file;
  $('file-name').textContent = `📎 ${file.name}  (${(file.size/1024/1024).toFixed(2)} MB)`;
  $('selected-file').style.display = 'block';
  $('upload-area').style.borderColor = '#4f46e5';
}

async function submitPredict() {
  if (!state.selectedFile) return;

  $('predict-loading').style.display = 'block';
  $('predict-result').style.display = 'none';

  const formData = new FormData();
  formData.append('file', state.selectedFile);
  formData.append('model_name', $('model-select').value);

  try {
    const res = await fetch('/api/predict', { method: 'POST', body: formData });
    const data = await res.json();

    $('predict-loading').style.display = 'none';

    if (!res.ok) {
      $('predict-result').innerHTML = `<div class="card"><div class="alert alert-danger">❌ ${currentLang==='zh'?'预测失败':'Prediction failed'}: ${data.detail || JSON.stringify(data)}</div></div>`;
      $('predict-result').style.display = 'block';
      return;
    }

    renderPredictResult(data);
  } catch(e) {
    $('predict-loading').style.display = 'none';
    $('predict-result').innerHTML = `<div class="card"><div class="alert alert-danger">❌ ${e.message}</div></div>`;
    $('predict-result').style.display = 'block';
  }
}

function renderPredictResult(data) {
  const isReal = data.label === 'REAL';
  const modelName = getModelDisplayName(data.model_used) || data.model_used;

  const resultHtml = `
<div class="card" style="margin-top:20px;">
  <div class="prediction-result">
    <div class="pred-emoji">${isReal ? '✅' : '🤖'}</div>
    <div class="pred-label ${isReal ? 'pred-real' : 'pred-fake'}">
      ${isReal ? t('pred_real') : t('pred_fake')}
    </div>
    <div class="pred-confidence">
      ${t('pred_confidence')}<strong>${(data.confidence * 100).toFixed(1)}%</strong> &nbsp;
      ${t('pred_model_used')}${modelName}
    </div>
  </div>

  <div style="height:160px;max-width:400px;margin:16px auto 0;">
    <canvas id="chart-pred-prob"></canvas>
  </div>

  <div style="margin-top:20px;">
    <div class="card-title"><span class="icon">🔢</span>${t('test_feat_title').replace('🔢 ','')}</div>
    <div class="table-wrap">
      <table>
        <thead><tr><th>${t('test_feat_col1')}</th><th>${t('test_feat_col2')}</th><th>${t('test_feat_col3')}</th></tr></thead>
        <tbody>
          ${data.features.slice(0, 10).map(f => `<tr>
            <td><code style="background:#f1f5f9;padding:2px 6px;border-radius:4px;font-size:11px">${f.name}</code></td>
            <td>${f.value.toFixed(6)}</td>
            <td style="font-size:12px;color:#64748b">${getFeatDesc(f.name)}</td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>
    <div style="font-size:12px;color:#94a3b8;margin-top:6px;">${t('test_feat_total', {n: data.features.length})}</div>
  </div>

  <div class="alert alert-${isReal ? 'success' : 'warning'}" style="margin-top:16px;margin-bottom:0;">
    ${isReal ? t('test_real_msg') : t('test_fake_msg')}
  </div>
</div>`;

  $('predict-result').innerHTML = resultHtml;
  $('predict-result').style.display = 'block';

  // Probability chart
  setTimeout(() => {
    const el = $('chart-pred-prob');
    if (!el) return;
    state.charts['pred-prob'] = new Chart(el, {
      type: 'bar',
      data: {
        labels: [t('pred_fake'), t('pred_real')],
        datasets: [{
          label: currentLang === 'zh' ? '概率' : 'Probability',
          data: [data.fake_prob, data.real_prob],
          backgroundColor: ['rgba(239,68,68,.7)', 'rgba(16,185,129,.7)'],
          borderRadius: 6,
        }]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          y: { min: 0, max: 1, ticks: { callback: v => (v*100).toFixed(0)+'%' } }
        }
      }
    });
  }, 50);
}

function getFeatDesc(name) {
  const desc = {
    chroma_stft: t('feat_chroma'),
    rms: t('feat_rms'),
    spectral_centroid: t('feat_cent'),
    spectral_bandwidth: t('feat_bw'),
    rolloff: t('feat_rolloff'),
    zero_crossing_rate: t('feat_zcr'),
  };
  if (desc[name]) return desc[name];
  if (name.startsWith('mfcc')) return t('feat_mfcc', {n: name.replace('mfcc','')});
  return '';
}


// ── Init ──────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  applyI18nStatic();
  navigate('dashboard');
});
