#!/bin/bash
# DeepVoice 启动脚本

PORT=8300
PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "====================================="
echo "  DeepVoice AI 声音识别教学平台"
echo "====================================="
echo ""

# Check if port is in use
if lsof -Pi :$PORT -sTCP:LISTEN -t > /dev/null 2>&1; then
    echo "❌ 错误：端口 $PORT 已被占用！"
    echo ""
    echo "请使用以下命令查看占用进程："
    echo "  lsof -i :$PORT"
    echo ""
    echo "如需更换端口，请修改此脚本中的 PORT 变量。"
    exit 1
fi

echo "✅ 端口 $PORT 可用"
echo ""

# Activate virtual environment
if [ -f "$PROJECT_DIR/venv/bin/activate" ]; then
    source "$PROJECT_DIR/venv/bin/activate"
    echo "✅ 已激活虚拟环境"
else
    echo "⚠️  未找到虚拟环境，使用系统Python"
fi

echo ""
echo "🚀 正在启动服务器..."
echo "📌 访问地址：http://localhost:$PORT"
echo "   按 Ctrl+C 停止服务"
echo ""

cd "$PROJECT_DIR"
python -m uvicorn web.app:app --host 0.0.0.0 --port $PORT
