# 安装和启动指南

## 🚀 快速开始

### 前置要求
- Node.js 16+ 
- npm 或 yarn

### 方法一：手动安装（推荐）

#### 1. 解决权限问题（如果遇到）
```bash
# 修复项目权限
sudo chown -R $(whoami) graphql-task-manager/
cd graphql-task-manager
```

#### 2. 安装服务器依赖
```bash
cd server
npm install --legacy-peer-deps
# 如果仍有问题，尝试：
# npm install --legacy-peer-deps --force
```

#### 3. 安装客户端依赖
```bash
cd ../client
npm install --legacy-peer-deps
# 如果仍有问题，尝试：
# npm install --legacy-peer-deps --force
```

#### 4. 启动服务器
```bash
cd ../server
npm run dev
```
✅ 服务器将在 http://localhost:4000/graphql 启动

#### 5. 启动客户端（新终端窗口）
```bash
cd graphql-task-manager/client
npm start
```
✅ 客户端将在 http://localhost:3000 启动

### 方法二：一键启动脚本

```bash
cd graphql-task-manager
chmod +x start.sh
./start.sh
```

## 🔧 常见问题解决

### 1. TypeScript版本冲突
```bash
# 删除现有依赖重新安装
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps --force
```

### 2. 权限问题 (EACCES)
```bash
# 方法1：修改所有权
sudo chown -R $(whoami) graphql-task-manager/

# 方法2：使用sudo安装（不推荐）
sudo npm install --legacy-peer-deps --unsafe-perm=true --allow-root
```

### 3. 端口占用
```bash
# 检查端口占用
lsof -ti:4000  # 服务器端口
lsof -ti:3000  # 客户端端口

# 杀死占用进程
kill -9 $(lsof -ti:4000)
kill -9 $(lsof -ti:3000)
```

### 4. React Scripts 错误
如果客户端启动失败，尝试：
```bash
cd client
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
npm start
```

## ✅ 验证安装

### 1. 检查服务器
访问 http://localhost:4000/graphql
- 应该看到 Apollo Studio 界面
- 可以查看 GraphQL Schema
- 可以运行查询

### 2. 检查客户端  
访问 http://localhost:3000
- 应该看到任务管理界面
- 可以查看默认的示例数据
- 可以创建、编辑、删除任务

## 🎯 开始学习

### 1. 探索 GraphQL Playground
- 打开 http://localhost:4000/graphql
- 运行 `examples/queries.graphql` 中的示例查询
- 查看 Schema 文档

### 2. 学习资源
- 📖 `README.md` - 项目概述和功能介绍
- 📚 `LEARNING_GUIDE.md` - 分阶段学习路径  
- 💡 `examples/queries.graphql` - GraphQL查询示例

### 3. 实践练习
1. 在 Apollo Studio 中运行各种查询
2. 在前端界面中操作任务
3. 观察实时订阅效果
4. 尝试修改代码

## 🐛 故障排除

如果遇到其他问题：

1. **清理缓存**
```bash
npm cache clean --force
```

2. **重新安装所有依赖**
```bash
rm -rf server/node_modules client/node_modules
rm -f server/package-lock.json client/package-lock.json
cd server && npm install --legacy-peer-deps
cd ../client && npm install --legacy-peer-deps
```

3. **检查Node.js版本**
```bash
node --version  # 应该是 16+
npm --version   # 应该是 8+
```

## 📞 需要帮助？

如果安装过程中遇到问题，请检查：
- Node.js 版本是否符合要求
- 网络连接是否正常
- 磁盘空间是否充足
- 是否有防火墙阻止端口访问
