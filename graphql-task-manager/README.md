# GraphQL 任务管理系统

这是一个完整的GraphQL学习项目，包含了GraphQL的所有核心功能：查询(Query)、变更(Mutation)、订阅(Subscription)以及高级特性如分页、过滤、排序等。

## 项目特性

### 🚀 核心功能
- **用户管理**: 创建、更新、删除用户
- **项目管理**: 项目的完整CRUD操作
- **任务管理**: 任务的创建、分配、状态更新
- **实时更新**: 基于WebSocket的实时任务状态同步

### 📊 GraphQL功能覆盖
- **基础查询**: 获取用户、项目、任务列表和详情
- **嵌套查询**: 一次查询获取关联数据（项目包含任务，任务包含分配者）
- **变更操作**: 完整的CRUD操作
- **实时订阅**: 任务创建、更新、删除的实时通知
- **高级功能**: 分页、过滤、排序、联合查询

### 🛠 技术栈

#### 后端
- **Apollo Server**: GraphQL服务器
- **TypeScript**: 类型安全
- **GraphQL Subscriptions**: 实时功能
- **JSON文件**: 数据持久化

#### 前端
- **React 18**: UI框架
- **Apollo Client**: GraphQL客户端
- **TypeScript**: 类型安全
- **Tailwind CSS**: 样式框架

## 快速开始

### 1. 安装依赖

#### 后端
```bash
cd server
npm install
```

#### 前端
```bash
cd client
npm install
```

### 2. 启动服务

#### 启动后端服务器
```bash
cd server
npm run dev
```
服务器将在 http://localhost:5353/graphql 启动

#### 启动前端应用
```bash
cd client
npm start
```
前端应用将在 http://localhost:5354 启动

### 3. 访问GraphQL Playground

打开浏览器访问 http://localhost:5353/graphql 可以使用Apollo Studio进行GraphQL查询测试。

## GraphQL学习要点

### 1. Schema设计
查看 `server/src/schema/typeDefs.ts` 了解如何设计GraphQL Schema：
- 类型定义 (Type Definitions)
- 输入类型 (Input Types)
- 枚举类型 (Enums)
- 接口和联合类型

### 2. Resolver实现
查看 `server/src/resolvers/` 目录了解解析器的实现：
- 查询解析器 (Query Resolvers)
- 变更解析器 (Mutation Resolvers)
- 订阅解析器 (Subscription Resolvers)
- 字段解析器 (Field Resolvers)

### 3. 客户端集成
查看 `client/src/` 目录了解Apollo Client的使用：
- GraphQL查询和变更
- 实时订阅
- 缓存管理
- 错误处理

## 示例查询

### 获取所有任务（带分页和过滤）
```graphql
query GetTasks($filters: TaskFilters, $sort: TaskSort, $first: Int, $after: String) {
  tasks(filters: $filters, sort: $sort, first: $first, after: $after) {
    edges {
      node {
        id
        title
        description
        status
        priority
        assignee {
          id
          name
        }
        project {
          id
          title
        }
        createdAt
        updatedAt
      }
      cursor
    }
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
    totalCount
  }
}
```

### 创建新任务
```graphql
mutation CreateTask($input: CreateTaskInput!) {
  createTask(input: $input) {
    id
    title
    description
    status
    priority
    assignee {
      id
      name
    }
    project {
      id
      title
    }
    createdAt
    updatedAt
  }
}
```

### 订阅任务更新
```graphql
subscription TaskUpdated {
  taskUpdated {
    id
    title
    status
    priority
    assignee {
      id
      name
    }
    project {
      id
      title
    }
    updatedAt
  }
}
```

## 项目结构

```
graphql-task-manager/
├── server/                 # GraphQL后端
│   ├── src/
│   │   ├── schema/        # GraphQL Schema定义
│   │   ├── resolvers/     # 解析器
│   │   ├── data/          # JSON数据存储
│   │   └── server.ts      # 服务器入口
│   └── package.json
└── client/                # React前端
    ├── src/
    │   ├── components/    # React组件
    │   ├── graphql/       # GraphQL查询和变更
    │   └── App.tsx
    └── package.json
```

## 学习建议

1. **从Schema开始**: 理解GraphQL的类型系统
2. **实践查询**: 在GraphQL Playground中尝试各种查询
3. **理解Resolver**: 学习数据解析的逻辑
4. **掌握客户端**: 了解Apollo Client的缓存和状态管理
5. **实时功能**: 体验GraphQL订阅的强大功能

## 扩展功能

可以考虑添加以下功能来进一步学习：
- 用户认证和授权
- 文件上传
- 数据验证
- 性能优化（DataLoader）
- 错误处理最佳实践
- 测试（单元测试和集成测试）

## 故障排除

### 常见问题

1. **端口冲突**: 确保5353和5354端口未被占用
2. **依赖问题**: 删除node_modules重新安装
3. **WebSocket连接失败**: 检查防火墙设置

### 调试技巧

1. 使用Apollo Studio调试GraphQL查询
2. 查看浏览器控制台的错误信息
3. 检查服务器日志输出

## 贡献

欢迎提交Issue和Pull Request来改进这个学习项目！
