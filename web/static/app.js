/* DeepVoice - Frontend Application */

// ── State ──────────────────────────────────────────────────────────────────
const state = {
  currentPage: 'dashboard',
  charts: {},
};

const MODEL_META = {
  logistic_regression: {
    name: '逻辑回归',
    en: 'Logistic Regression',
    icon: '📈',
    color: '#4f46e5',
    desc: '逻辑回归是最经典的二分类算法，通过寻找一个线性决策边界来区分真假声音。它简单、可解释，是机器学习的入门算法。',
    tags: ['线性模型', '可解释性强', '训练速度快'],
  },
  random_forest: {
    name: '随机森林',
    en: 'Random Forest',
    icon: '🌲',
    color: '#10b981',
    desc: '随机森林由许多决策树组成，每棵树投票决定最终结果。就像问100个专家意见，综合判断比单一专家更准确。',
    tags: ['集成学习', '抗过拟合', '特征重要性'],
  },
  svm: {
    name: '支持向量机',
    en: 'Support Vector Machine',
    icon: '🔷',
    color: '#f59e0b',
    desc: 'SVM 寻找最宽的"分界线"来区分真假声音。使用 RBF 核函数可以处理非线性的复杂边界，是经典的高精度分类器。',
    tags: ['最大间隔', 'RBF核', '高维效果好'],
  },
  xgboost: {
    name: 'XGBoost',
    en: 'XGBoost (梯度提升树)',
    icon: '⚡',
    color: '#ef4444',
    desc: 'XGBoost 是竞赛中最常获奖的算法，通过逐步修正错误来提升精度。每一步都专注于改正上一步出错的样本。',
    tags: ['梯度提升', '竞赛神器', '速度与精度兼顾'],
  },
  knn: {
    name: 'K近邻',
    en: 'K-Nearest Neighbors',
    icon: '📍',
    color: '#06b6d4',
    desc: 'KNN 的思路最直观：找K个最相似的已知样本，看它们多数属于哪类。"物以类聚"就是它的核心哲学。',
    tags: ['实例学习', '无训练', '直觉易懂'],
  },
  mlp: {
    name: '神经网络',
    en: 'Multi-Layer Perceptron',
    icon: '🧠',
    color: '#8b5cf6',
    desc: '多层感知机（MLP）模拟人脑神经元连接，通过层层变换学习复杂的声音特征模式。这是深度学习的基础结构。',
    tags: ['深度学习', 'PyTorch', '多层神经元'],
  },
};

const PAGE_TITLES = {
  dashboard: '📊 数据总览 Dashboard',
  'model-logistic_regression': '📈 逻辑回归 Logistic Regression',
  'model-random_forest': '🌲 随机森林 Random Forest',
  'model-svm': '🔷 支持向量机 SVM',
  'model-xgboost': '⚡ XGBoost 梯度提升树',
  'model-knn': '📍 K近邻 KNN',
  'model-mlp': '🧠 神经网络 MLP',
  summary: '📋 模型总结 Summary',
  test: '🔬 测试模型',
};

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
  $('page-title').textContent = PAGE_TITLES[page] || page;

  if (page === 'dashboard') renderDashboard();
  else if (page.startsWith('model-')) renderModel(page.replace('model-', ''));
  else if (page === 'summary') renderSummary();
  else if (page === 'test') renderTest();
}

// ── Dashboard ──────────────────────────────────────────────────────────────

async function renderDashboard() {
  setContent(`<div style="display:flex;align-items:center;justify-content:center;height:200px;">
    <div class="spinner"></div><span style="margin-left:12px;color:#64748b">正在加载数据...</span>
  </div>`);

  let data;
  try { data = await api('/api/dashboard'); }
  catch(e) { setContent(`<div class="alert alert-danger">❌ 加载失败: ${e.message}</div>`); return; }

  const { total, real, fake, features, feature_by_label, feature_stats } = data;

  const html = `
<div class="grid-4" style="margin-bottom:20px;">
  <div class="stat-card">
    <div class="stat-label">📁 总样本数</div>
    <div class="stat-value" style="color:#4f46e5">${total.toLocaleString()}</div>
    <div class="stat-sub">训练数据集</div>
  </div>
  <div class="stat-card">
    <div class="stat-label">✅ 真实声音 (REAL)</div>
    <div class="stat-value" style="color:#10b981">${real.toLocaleString()}</div>
    <div class="stat-sub">${(real/total*100).toFixed(1)}% 占比</div>
  </div>
  <div class="stat-card">
    <div class="stat-label">🤖 AI合成声音 (FAKE)</div>
    <div class="stat-value" style="color:#ef4444">${fake.toLocaleString()}</div>
    <div class="stat-sub">${(fake/total*100).toFixed(1)}% 占比</div>
  </div>
  <div class="stat-card">
    <div class="stat-label">🔢 声学特征维度</div>
    <div class="stat-value" style="color:#f59e0b">${features.length}</div>
    <div class="stat-sub">MFCC + 频谱特征</div>
  </div>
</div>

<div class="grid-2">
  <div class="card">
    <div class="card-title"><span class="icon">🥧</span>数据集构成</div>
    <div class="chart-container" style="height:220px;">
      <canvas id="chart-pie"></canvas>
    </div>
    <div class="alert alert-info" style="margin-top:12px;margin-bottom:0">
      💡 <strong>注意：</strong>数据集已经过平衡处理，真实与AI声音各占约50%，
      避免了模型偏向某一类的问题。
    </div>
  </div>
  <div class="card">
    <div class="card-title"><span class="icon">📡</span>特征类别分布</div>
    <div class="chart-container" style="height:220px;">
      <canvas id="chart-feat-types"></canvas>
    </div>
    <div style="margin-top:12px;font-size:12px;color:#64748b">
      共 <strong>${features.length}</strong> 维特征：
      chroma_stft · rms · 频谱质心 · 频谱带宽 · 频谱滚降 · 过零率 · MFCC(×20)
    </div>
  </div>
</div>

<div class="card">
  <div class="card-title">
    <span class="icon">📊</span>
    特征对比：真实 vs AI声音（均值比较）
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
  <div class="card-title"><span class="icon">📋</span>声学特征说明</div>
  <div class="table-wrap">
    <table>
      <thead><tr>
        <th>特征名</th><th>含义</th><th>真实均值</th><th>AI均值</th><th>差异</th>
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
      labels: ['真实声音 REAL', 'AI合成声音 FAKE'],
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
            label: ctx => ` ${ctx.label}: ${ctx.parsed.toLocaleString()} 条 (${(ctx.parsed/total*100).toFixed(1)}%)`
          }
        }
      }
    }
  });

  // Feature type donut
  state.charts['feat-types'] = new Chart($('chart-feat-types'), {
    type: 'doughnut',
    data: {
      labels: ['MFCC系数 (×20)', 'chroma色度', 'RMS能量', '频谱质心', '频谱带宽', '频谱滚降', '过零率'],
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
    chroma_stft: '音调色谱特征，反映音调分布',
    rms: '均方根能量，反映音量大小',
    spectral_centroid: '频谱质心，声音"亮度"',
    spectral_bandwidth: '频谱带宽，频率范围',
    rolloff: '频谱滚降，高频能量边界',
    zero_crossing_rate: '过零率，声音粗糙程度',
  };
  tbody.innerHTML = features.map(f => {
    const d = feature_by_label[f];
    const diff = Math.abs(d.real_mean - d.fake_mean);
    const diffPct = d.real_mean !== 0 ? (diff / Math.abs(d.real_mean) * 100).toFixed(1) : '—';
    const desc = FEAT_DESC[f] || (f.startsWith('mfcc') ? `第${f.replace('mfcc','')}个MFCC倒谱系数` : f);
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
  // Build data for all features bar chart
  const realMeans = features.map(f => feature_by_label[f].real_mean);
  const fakeMeans = features.map(f => feature_by_label[f].fake_mean);

  state.charts['features'] = new Chart($('chart-features'), {
    type: 'bar',
    data: {
      labels: features,
      datasets: [
        { label: '真实声音 REAL', data: realMeans, backgroundColor: 'rgba(16,185,129,.7)', borderRadius: 4 },
        { label: 'AI声音 FAKE', data: fakeMeans, backgroundColor: 'rgba(239,68,68,.7)', borderRadius: 4 },
      ]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { position: 'top' } },
      scales: {
        x: { ticks: { font: { size: 10 }, maxRotation: 45 } },
        y: { beginAtZero: false }
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

  const backgroundsReal = state.dashData.features.map((_, i) =>
    i === idx ? 'rgba(16,185,129,1)' : 'rgba(16,185,129,.35)');
  const backgroundsFake = state.dashData.features.map((_, i) =>
    i === idx ? 'rgba(239,68,68,1)' : 'rgba(239,68,68,.35)');

  chart.data.datasets[0].backgroundColor = backgroundsReal;
  chart.data.datasets[1].backgroundColor = backgroundsFake;
  chart.update();

  const annotation = $('feat-annotation');
  if (annotation) {
    const diff = ((d.real_mean - d.fake_mean) / (Math.abs(d.real_mean) || 1) * 100).toFixed(1);
    annotation.innerHTML = `
      <strong>${f}</strong>：真实均值 = <span style="color:#10b981">${fmtN(d.real_mean)}</span>，
      AI均值 = <span style="color:#ef4444">${fmtN(d.fake_mean)}</span>，
      差异 = ${Math.abs(diff)}%
    `;
  }
}

// ── Model Page ─────────────────────────────────────────────────────────────

async function renderModel(modelKey) {
  const meta = MODEL_META[modelKey];
  if (!meta) { setContent('<div class="alert alert-danger">模型不存在</div>'); return; }

  const html = `
<div class="card" style="padding:24px;">
  <div class="model-header">
    <div class="model-icon" style="background:${meta.color}22;">${meta.icon}</div>
    <div class="model-info">
      <h2>${meta.name} <span style="color:#64748b;font-size:14px;font-weight:400">${meta.en}</span></h2>
      <p>${meta.desc}</p>
      <div style="display:flex;gap:6px;margin-top:8px;flex-wrap:wrap;">
        ${meta.tags.map(t => `<span style="background:${meta.color}15;color:${meta.color};padding:2px 8px;border-radius:10px;font-size:11px;font-weight:600">${t}</span>`).join('')}
      </div>
    </div>
  </div>

  <div class="run-section">
    <button class="btn btn-primary" id="run-btn" onclick="runModel('${modelKey}')">
      ▶ 运行此模型
    </button>
    <button class="btn btn-outline btn-sm" id="rerun-btn" onclick="rerunModel('${modelKey}')" style="display:none;">
      🔄 重新训练
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
      $('run-status').textContent = '✅ 已有缓存结果';
      $('rerun-btn').style.display = '';
      renderModelResults(modelKey, cache.result);
    }
  } catch(e) {}
}

async function runModel(modelKey) {
  $('run-btn').disabled = true;
  $('run-status').textContent = '🚀 正在启动...';

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
      addLog('✅ 使用缓存结果', 'log-done');
      $('run-btn').disabled = false;
      $('run-status').textContent = '';
      renderModelResults(modelKey, resp.result);
      return;
    }

    if (resp.already_running) {
      addLog('⏳ 模型已在训练中，等待结果...');
    } else {
      addLog('⏳ 开始训练模型...');
    }

    const jid = resp.job_id;
    const evtSource = new EventSource(`/api/jobs/${jid}/stream`);

    evtSource.onmessage = (e) => {
      const msg = JSON.parse(e.data);
      if (msg.type === 'progress') {
        addLog(msg.message);
        $('run-status').textContent = '⏳ 训练中...';
      } else if (msg.type === 'done') {
        evtSource.close();
        addLog('✅ 训练完成！', 'log-done');
        $('run-btn').disabled = false;
        $('run-status').textContent = '';
        $('rerun-btn').style.display = '';
        renderModelResults(modelKey, msg.result);
      } else if (msg.type === 'error') {
        evtSource.close();
        addLog('❌ 错误: ' + JSON.stringify(msg.message), 'log-error');
        $('run-btn').disabled = false;
        $('run-status').textContent = '❌ 训练失败';
      }
    };

    evtSource.onerror = () => {
      evtSource.close();
      addLog('⚠️ 连接断开，正在轮询结果...', 'log-error');
      pollJob(jid, modelKey, addLog);
    };

  } catch(e) {
    addLog('❌ 启动失败: ' + e.message, 'log-error');
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
        addLog('✅ 训练完成！', 'log-done');
        $('run-btn').disabled = false;
        $('rerun-btn').style.display = '';
        renderModelResults(modelKey, job.result);
        return;
      } else if (job.status === 'error') {
        addLog('❌ 训练失败: ' + JSON.stringify(job.result), 'log-error');
        $('run-btn').disabled = false;
        return;
      }
      // Show latest progress
      const progress = job.progress || [];
      if (progress.length > 0) {
        addLog(progress[progress.length - 1]);
      }
    } catch(e) {
      addLog('⚠️ 轮询失败: ' + e.message);
    }
  }
}

async function rerunModel(modelKey) {
  if (!confirm('确定要清除缓存并重新训练吗？这可能需要几分钟时间。')) return;
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
      <div class="tab active" onclick="switchTab(event, 'tab-metrics')">📊 评估指标</div>
      ${hasFeatImp ? '<div class="tab" onclick="switchTab(event, \'tab-importance\')">🏆 特征重要性</div>' : ''}
      ${hasSweep ? '<div class="tab" onclick="switchTab(event, \'tab-sweep\')">📉 降维曲线</div>' : ''}
      ${hasTraining ? '<div class="tab" onclick="switchTab(event, \'tab-training\')">📈 训练过程</div>' : ''}
      ${hasKsel ? '<div class="tab" onclick="switchTab(event, \'tab-ksel\')">🔍 K值搜索</div>' : ''}
    </div>`;

  // Metrics tab
  let tabMetrics = `
  <div class="tab-panel active" id="tab-metrics">
    <div class="metric-row">
      <div class="metric-pill">准确率 <span>${fmt(acc)}</span></div>
      <div class="metric-pill">精确率(FAKE) <span>${fmt(m.FAKE?.precision)}</span></div>
      <div class="metric-pill">召回率(FAKE) <span>${fmt(m.FAKE?.recall)}</span></div>
      <div class="metric-pill">F1(FAKE) <span>${fmt(m.FAKE?.['f1-score'])}</span></div>
      <div class="metric-pill">精确率(REAL) <span>${fmt(m.REAL?.precision)}</span></div>
      <div class="metric-pill">召回率(REAL) <span>${fmt(m.REAL?.recall)}</span></div>
    </div>

    <div class="grid-2" style="gap:20px;">
      <div>
        <div class="card-title"><span class="icon">📊</span>各类别详细指标</div>
        <div style="height:220px;"><canvas id="chart-${modelKey}-metrics"></canvas></div>
      </div>
      <div>
        <div class="card-title"><span class="icon">🔲</span>混淆矩阵</div>
        <div style="margin-top:8px;">
          <div style="text-align:center;font-size:11px;color:#64748b;margin-bottom:4px;">预测结果 →</div>
          <div class="cm-grid">
            <div class="cm-label"></div>
            <div class="cm-label">预测: FAKE</div>
            <div class="cm-label">预测: REAL</div>
            <div class="cm-label" style="writing-mode:vertical-lr;text-orientation:mixed;transform:rotate(180deg)">实际: FAKE</div>
            <div class="cm-cell cm-tn">${tn}<div class="cm-sub">真负(TN)</div></div>
            <div class="cm-cell cm-fp">${fp}<div class="cm-sub">假正(FP)</div></div>
            <div class="cm-label" style="writing-mode:vertical-lr;text-orientation:mixed;transform:rotate(180deg)">实际: REAL</div>
            <div class="cm-cell cm-fn">${fn}<div class="cm-sub">假负(FN)</div></div>
            <div class="cm-cell cm-tp">${tp}<div class="cm-sub">真正(TP)</div></div>
          </div>
          <div style="margin-top:12px;font-size:12px;color:#64748b;">
            <div>✅ <strong>绿色格</strong>: 判断正确 (TN + TP)</div>
            <div>❌ <strong>红色格</strong>: 判断错误 (FP + FN)</div>
          </div>
        </div>
      </div>
    </div>

    <div class="alert alert-info" style="margin-top:16px;margin-bottom:0;">
      💡 <strong>解读：</strong>
      <strong>准确率</strong>表示预测正确的比例。
      <strong>精确率</strong>表示预测为某类中真正是该类的比例。
      <strong>召回率</strong>表示该类中被正确识别出来的比例。
      <strong>F1分数</strong>是精确率和召回率的调和平均数。
    </div>
  </div>`;

  // Feature importance tab
  let tabImportance = hasFeatImp ? `
  <div class="tab-panel" id="tab-importance">
    <div class="alert alert-info" style="margin-bottom:16px;">
      💡 特征重要性越高，说明该特征对区分真假声音越关键。
    </div>
    <div id="feat-imp-bars" style="max-width:600px;"></div>
  </div>` : '';

  // Sweep tab
  let tabSweep = hasSweep ? `
  <div class="tab-panel" id="tab-sweep">
    <div class="alert alert-info" style="margin-bottom:16px;">
      💡 <strong>降维实验：</strong>逐步增加使用的特征数量（k），观察模型准确率的变化。
      ⭐ 表示<strong>最高点</strong>（最优特征数），🔺 表示<strong>拐点</strong>（性价比最佳点）。
    </div>
    <div style="height:320px;"><canvas id="chart-${modelKey}-sweep"></canvas></div>
    <div id="sweep-info" style="margin-top:12px;display:flex;gap:16px;flex-wrap:wrap;font-size:13px;"></div>
  </div>` : '';

  // Training curves tab
  let tabTraining = hasTraining ? `
  <div class="tab-panel" id="tab-training">
    <div class="alert alert-info" style="margin-bottom:16px;">
      💡 <strong>训练过程：</strong>每个Epoch（轮次）模型的准确率变化。
      训练集和验证集曲线趋于一致时，说明模型学习良好。
    </div>
    <div style="height:300px;"><canvas id="chart-${modelKey}-training"></canvas></div>
  </div>` : '';

  // K selection tab
  let tabKsel = hasKsel ? `
  <div class="tab-panel" id="tab-ksel">
    <div class="alert alert-info" style="margin-bottom:16px;">
      💡 <strong>K值搜索：</strong>通过交叉验证找到KNN最优的K值，即"参考最近邻居的数量"。
    </div>
    <div style="height:300px;"><canvas id="chart-${modelKey}-ksel"></canvas></div>
    <div style="margin-top:12px;font-size:13px;color:#64748b;text-align:center;">
      最优 K 值 = <strong style="color:#4f46e5;font-size:16px">${result.best_k_value || '?'}</strong>
    </div>
  </div>` : '';

  container.innerHTML = `
<div class="card" style="margin-top:4px;">
  <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px;">
    <div class="acc-badge ${accClass(acc)}">
      ${accEmoji(acc)} 准确率: ${fmt(acc)}
    </div>
    <div style="font-size:13px;color:#64748b;font-weight:600">${result.model_name}</div>
    ${result.best_val_acc ? `<div class="acc-badge acc-high">最优验证准确率: ${fmt(result.best_val_acc)}</div>` : ''}
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
  tabs.forEach(t => t.classList.remove('active'));
  panels.forEach(p => p.classList.remove('active'));
  event.target.classList.add('active');
  const panel = $(tabId);
  if (panel) panel.classList.add('active');
}

function renderMetricsChart(modelKey, m, meta) {
  const el = $(`chart-${modelKey}-metrics`);
  if (!el) return;
  const labels = ['精确率', '召回率', 'F1分数'];
  state.charts[`${modelKey}-metrics`] = new Chart(el, {
    type: 'bar',
    data: {
      labels,
      datasets: [
        {
          label: 'FAKE (AI声音)',
          data: [m.FAKE?.precision, m.FAKE?.recall, m.FAKE?.['f1-score']],
          backgroundColor: 'rgba(239,68,68,.7)',
          borderRadius: 4,
        },
        {
          label: 'REAL (真实声音)',
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
        label: 'CV准确率 (3折)',
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
            title: ctx => `特征数 k=${ctx[0].label}`,
            label: ctx => ` 准确率: ${(ctx.parsed.y*100).toFixed(2)}%`,
            afterBody: (ctx) => {
              const i = ctx[0].dataIndex;
              const k = k_values[i];
              if (k === best_k) return ['⭐ 最高点 (Peak)'];
              if (k === inflection_k) return ['🔺 拐点 (Inflection)'];
              return [];
            }
          }
        }
      },
      scales: {
        x: { title: { display: true, text: '特征数量 k' } },
        y: {
          title: { display: true, text: '交叉验证准确率' },
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
          <span>⭐ <strong>最高点</strong>: k=${best_k}，准确率=${fmt(best_acc)}</span>
        </div>
        <div style="display:flex;align-items:center;gap:6px;">
          <span style="background:#8b5cf6;width:14px;height:14px;border-radius:50%;display:inline-block;"></span>
          <span>🔺 <strong>拐点</strong>: k=${inflection_k}，使用${inflection_k}个特征即可达到性价比最优</span>
        </div>
      </div>
      <div style="font-size:12px;color:#64748b;margin-top:8px;">
        💡 <strong>解读：</strong>拐点之后继续增加特征，准确率提升很小甚至下降，说明多余特征引入了噪声。
        实际应用中通常选择拐点附近的特征数量，在准确率和计算效率之间取得平衡。
      </div>`;
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
          label: '训练集准确率',
          data: curves.map(c => c.train_acc),
          borderColor: meta.color,
          backgroundColor: 'transparent',
          tension: 0.3,
          pointRadius: 0,
          borderWidth: 2,
        },
        {
          label: '验证集准确率',
          data: curves.map(c => c.val_acc),
          borderColor: '#10b981',
          backgroundColor: 'transparent',
          tension: 0.3,
          pointRadius: 0,
          borderWidth: 2,
          borderDash: [5, 3],
        },
        {
          label: '训练Loss',
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
        x: { title: { display: true, text: '训练轮次 Epoch' } },
        y: {
          title: { display: true, text: '准确率' },
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
        label: 'CV准确率',
        data: accs,
        backgroundColor: colors,
        borderRadius: 4,
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: { callbacks: { label: ctx => ` 准确率: ${(ctx.parsed.y*100).toFixed(2)}%` } }
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
    <div class="spinner"></div><span style="margin-left:12px;color:#64748b">加载模型总结...</span>
  </div>`);

  let data;
  try { data = await api('/api/summary'); }
  catch(e) { setContent(`<div class="alert alert-danger">❌ 加载失败: ${e.message}</div>`); return; }

  const modelKeys = ['logistic_regression', 'random_forest', 'svm', 'xgboost', 'knn', 'mlp'];
  const loaded = modelKeys.filter(k => data[k]);
  const missing = modelKeys.filter(k => !data[k]);

  if (loaded.length === 0) {
    setContent(`
    <div class="alert alert-warning">
      ⚠️ 还没有任何模型运行过。请先到左侧各模型页面运行模型，然后再查看总结。
    </div>`);
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
      <td><span style="font-size:16px;">${meta.icon}</span> ${meta.name}</td>
      <td class="${isB ? 'best-cell' : ''}">${fmt(r.accuracy)}</td>
      <td>${fmt(m.FAKE?.precision)}</td>
      <td>${fmt(m.FAKE?.recall)}</td>
      <td>${fmt(m.FAKE?.['f1-score'])}</td>
      <td>${fmt(m.REAL?.precision)}</td>
      <td>${fmt(m.REAL?.recall)}</td>
      <td>${fmt(m.REAL?.['f1-score'])}</td>
    </tr>`;
  }).join('');

  const html = `
${missing.length > 0 ? `<div class="alert alert-warning">
  ⚠️ 以下模型尚未运行：${missing.map(k => MODEL_META[k].name).join('、')}。前往对应页面运行后数据会更新。
</div>` : ''}

<div class="card">
  <div class="card-title"><span class="icon">📊</span>模型性能对比</div>
  <div style="height:300px;"><canvas id="chart-summary-acc"></canvas></div>
</div>

<div class="card">
  <div class="card-title"><span class="icon">🔢</span>各模型详细指标对比</div>
  <div class="table-wrap">
    <table>
      <thead><tr>
        <th>模型</th>
        <th>准确率 ↑</th>
        <th>精确率(FAKE)</th>
        <th>召回率(FAKE)</th>
        <th>F1(FAKE)</th>
        <th>精确率(REAL)</th>
        <th>召回率(REAL)</th>
        <th>F1(REAL)</th>
      </tr></thead>
      <tbody>${tableRows}</tbody>
    </table>
  </div>
</div>

${loaded.some(k => data[k].sweep) ? `
<div class="card">
  <div class="card-title"><span class="icon">📉</span>各模型降维曲线对比（拐点 & 最优特征数）</div>
  <div style="height:360px;"><canvas id="chart-summary-sweep"></canvas></div>
  <div style="margin-top:12px;font-size:12px;color:#64748b;">
    💡 不同模型对特征数量的敏感程度不同。曲线越早平稳，说明该模型用更少特征就能达到高精度。
  </div>
</div>` : ''}

<div class="card">
  <div class="card-title"><span class="icon">💬</span>总结与评价</div>
  <div id="summary-comments"></div>
</div>`;

  setContent(html);

  // Accuracy comparison chart
  const colors = loaded.map(k => MODEL_META[k].color);
  state.charts['summary-acc'] = new Chart($('chart-summary-acc'), {
    type: 'bar',
    data: {
      labels: loaded.map(k => MODEL_META[k].name),
      datasets: [{
        label: '测试集准确率',
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
        tooltip: { callbacks: { label: ctx => ` 准确率: ${(ctx.parsed.y*100).toFixed(2)}%` } }
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
          label: meta.name,
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
          x: { title: { display: true, text: '特征数量 k' } },
          y: {
            title: { display: true, text: 'CV准确率' },
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
  const worst = loaded.reduce((a, b) => data[a].accuracy < data[b].accuracy ? a : b);

  const comments = [];

  if (data[best].accuracy >= 0.97) {
    comments.push(`🏆 <strong>${MODEL_META[best].name}</strong> 表现最优，准确率高达 <strong>${fmt(data[best].accuracy)}</strong>，说明该模型非常擅长区分真实声音和AI合成声音。`);
  }

  if (loaded.includes('random_forest') || loaded.includes('xgboost')) {
    const ensembleModels = ['random_forest', 'xgboost'].filter(k => loaded.includes(k));
    const ensembleAvg = ensembleModels.reduce((sum, k) => sum + data[k].accuracy, 0) / ensembleModels.length;
    comments.push(`🌲 <strong>集成学习方法</strong>（${ensembleModels.map(k => MODEL_META[k].name).join('、')}）平均准确率为 ${fmt(ensembleAvg)}，体现了"集体智慧"的优势。`);
  }

  if (loaded.includes('mlp') && data['mlp'].training_curves) {
    const finalAcc = data['mlp'].training_curves[data['mlp'].training_curves.length - 1].val_acc;
    comments.push(`🧠 <strong>神经网络（MLP）</strong>通过逐轮训练不断优化，最终验证集准确率达到 ${fmt(data['mlp'].best_val_acc || finalAcc)}。神经网络的训练过程展示了深度学习的学习机制。`);
  }

  if (loaded.includes('knn')) {
    const knnAcc = data['knn'].accuracy;
    const knnBestK = data['knn'].best_k_value;
    comments.push(`📍 <strong>K近邻（KNN）</strong>不需要"训练"，直接通过相似性比较进行判断，最优K值为 ${knnBestK}，准确率为 ${fmt(knnAcc)}。`);
  }

  const allSweeps = loaded.filter(k => data[k].sweep);
  if (allSweeps.length > 0) {
    const minFeats = allSweeps.reduce((best, k) => {
      return data[k].sweep.inflection_k < data[best].sweep.inflection_k ? k : best;
    });
    comments.push(`📉 <strong>降维分析</strong>显示：${MODEL_META[minFeats].name} 只需 <strong>${data[minFeats].sweep.inflection_k}</strong> 个特征就能达到接近最优的表现，说明并非所有声音特征对识别都同等重要。`);
  }

  comments.push(`📌 <strong>总体结论：</strong>在真假声音识别任务中，所有模型都能达到较高的准确率，说明声学特征能够有效区分人类声音和AI合成声音。实际应用中应综合考虑准确率、训练速度和可解释性来选择合适的模型。`);

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
  <div class="card-title"><span class="icon">🔬</span>测试模型 - 上传音频进行预测</div>
  <div class="alert alert-info" style="margin-bottom:16px;">
    💡 上传一段声音文件，系统会自动提取 26 维声学特征，然后调用你选择的模型来判断是<strong>真实人声</strong>还是<strong>AI合成声音</strong>。
  </div>

  <div style="display:flex;gap:12px;align-items:center;margin-bottom:16px;flex-wrap:wrap;">
    <label style="font-size:13px;font-weight:600;">选择模型：</label>
    <select id="model-select">
      <option value="logistic_regression">📈 逻辑回归</option>
      <option value="random_forest" selected>🌲 随机森林</option>
      <option value="svm">🔷 支持向量机 SVM</option>
      <option value="xgboost">⚡ XGBoost</option>
      <option value="knn">📍 K近邻 KNN</option>
      <option value="mlp">🧠 神经网络 MLP</option>
    </select>
    <span style="font-size:12px;color:#64748b;">支持格式：wav / mp3 / flac / ogg（最大200MB）</span>
  </div>

  <div class="upload-area" id="upload-area" onclick="$('file-input').click()"
       ondragover="event.preventDefault();this.classList.add('drag-over')"
       ondragleave="this.classList.remove('drag-over')"
       ondrop="handleDrop(event)">
    <div class="upload-icon">🎵</div>
    <div class="upload-text">点击选择音频文件，或拖放至此处</div>
    <div class="upload-hint">wav · mp3 · flac · ogg · m4a</div>
  </div>
  <input type="file" id="file-input" accept=".wav,.mp3,.flac,.ogg,.m4a" style="display:none"
         onchange="handleFileSelect(this.files[0])"/>

  <div id="selected-file" style="display:none;margin-top:12px;padding:12px;background:#f8fafc;border-radius:8px;font-size:13px;">
    <span id="file-name"></span>
    <button class="btn btn-primary btn-sm" style="margin-left:12px;" onclick="submitPredict()">
      🔍 开始预测
    </button>
  </div>

  <div id="predict-loading" style="display:none;margin-top:16px;text-align:center;color:#64748b;">
    <div class="spinner" style="margin:0 auto 8px;"></div>
    <div>正在提取特征并预测，请稍候...</div>
    <div style="font-size:12px;margin-top:4px;">（首次使用某个模型需要先训练，可能需要1-3分钟）</div>
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
      $('predict-result').innerHTML = `<div class="card"><div class="alert alert-danger">❌ 预测失败: ${data.detail || JSON.stringify(data)}</div></div>`;
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
  const modelName = MODEL_META[data.model_used]?.name || data.model_used;

  const resultHtml = `
<div class="card" style="margin-top:20px;">
  <div class="prediction-result">
    <div class="pred-emoji">${isReal ? '✅' : '🤖'}</div>
    <div class="pred-label ${isReal ? 'pred-real' : 'pred-fake'}">
      ${isReal ? '✅ 真实人声 REAL' : '🤖 AI合成声音 FAKE'}
    </div>
    <div class="pred-confidence">
      置信度：<strong>${(data.confidence * 100).toFixed(1)}%</strong> &nbsp;
      （使用模型：${modelName}）
    </div>
  </div>

  <div style="height:160px;max-width:400px;margin:16px auto 0;">
    <canvas id="chart-pred-prob"></canvas>
  </div>

  <div style="margin-top:20px;">
    <div class="card-title"><span class="icon">🔢</span>提取的声学特征（前 10 维）</div>
    <div class="table-wrap">
      <table>
        <thead><tr><th>特征名</th><th>特征值</th><th>含义</th></tr></thead>
        <tbody>
          ${data.features.slice(0, 10).map(f => `<tr>
            <td><code style="background:#f1f5f9;padding:2px 6px;border-radius:4px;font-size:11px">${f.name}</code></td>
            <td>${f.value.toFixed(6)}</td>
            <td style="font-size:12px;color:#64748b">${getFeatDesc(f.name)}</td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>
    <div style="font-size:12px;color:#94a3b8;margin-top:6px;">完整特征：共 ${data.features.length} 维</div>
  </div>

  <div class="alert alert-${isReal ? 'success' : 'warning'}" style="margin-top:16px;margin-bottom:0;">
    ${isReal
      ? '🎉 模型判断这是<strong>真实的人类声音</strong>。真实声音通常有更自然的频谱变化和独特的音色特征。'
      : '⚠️ 模型判断这是<strong>AI合成的声音</strong>。AI声音往往有特定的频谱模式，在某些频段可能过于"完美"。'}
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
        labels: ['AI合成声音 (FAKE)', '真实人声 (REAL)'],
        datasets: [{
          label: '概率',
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
    chroma_stft: '音调色谱，反映音调分布',
    rms: '均方根能量，音量大小',
    spectral_centroid: '频谱质心，声音"亮度"',
    spectral_bandwidth: '频谱带宽，频率范围',
    rolloff: '频谱滚降，高频能量边界',
    zero_crossing_rate: '过零率，声音粗糙程度',
  };
  if (desc[name]) return desc[name];
  if (name.startsWith('mfcc')) return `第${name.replace('mfcc','')}个MFCC倒谱系数`;
  return '';
}

// ── Init ──────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  navigate('dashboard');
});
