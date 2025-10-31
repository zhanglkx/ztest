#!/bin/bash

# 获取脚本所在目录并切换到该目录
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$SCRIPT_DIR"

echo "🚀 启动GraphQL任务管理系统..."

# 检查是否安装了依赖
if [ ! -d "server/node_modules" ]; then
    echo "📦 安装服务器依赖..."
    cd server && npm install --legacy-peer-deps --no-package-lock && cd ..
fi

if [ ! -d "client/node_modules" ]; then
    echo "📦 安装客户端依赖..."
    cd client && npm install --legacy-peer-deps --no-package-lock && cd ..
fi

# 启动服务器（后台运行）
echo "🔧 启动GraphQL服务器..."
cd server && npm run dev &
SERVER_PID=$!

# 等待服务器启动
sleep 5

# 启动客户端
echo "🎨 启动React客户端..."
cd ../client && npm start &
CLIENT_PID=$!

echo "✅ 系统启动完成！"
echo "📊 GraphQL服务器: http://localhost:5353/graphql"
echo "🌐 React应用: http://localhost:5354"
echo ""
echo "按 Ctrl+C 停止所有服务"

# 等待用户中断
wait $CLIENT_PID $SERVER_PID
