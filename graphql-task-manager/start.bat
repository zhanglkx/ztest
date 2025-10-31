@echo off

REM 切换到脚本所在目录
cd /d "%~dp0"

echo 🚀 启动GraphQL任务管理系统...

REM 检查是否安装了依赖
if not exist "server\node_modules" (
    echo 📦 安装服务器依赖...
    cd server
    call npm install --legacy-peer-deps
    cd ..
)

if not exist "client\node_modules" (
    echo 📦 安装客户端依赖...
    cd client
    call npm install --legacy-peer-deps
    cd ..
)

REM 启动服务器
echo 🔧 启动GraphQL服务器...
cd server
start "GraphQL Server" cmd /k "npm run dev"
cd ..

REM 等待服务器启动
timeout /t 5 /nobreak > nul

REM 启动客户端
echo 🎨 启动React客户端...
cd client
start "React Client" cmd /k "npm start"
cd ..

echo ✅ 系统启动完成！
echo 📊 GraphQL服务器: http://localhost:5353/graphql
echo 🌐 React应用: http://localhost:5354
echo.
echo 关闭命令行窗口来停止服务
pause
