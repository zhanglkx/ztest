/**
 * DI（依赖注入）、AOP（面向切面编程）、IOC（控制反转）等设计模式概念演示
 * 
 * 本文件通过简单的代码示例介绍这些核心概念
 * JavaScript 版本 - 无需 TypeScript 编译
 */

// ============================================================================
// 1. IOC（控制反转 - Inversion of Control）概念演示
// ============================================================================

console.log('\n========== 1. IOC（控制反转）概念演示 ==========\n')

/**
 * 传统模式：类内部创建依赖
 * 问题：紧耦合，难以测试和替换依赖
 */
class TraditionalDatabase {
  connect() {
    return '连接到 MySQL 数据库'
  }
}

class TraditionalUserService {
  constructor() {
    // 在类内部直接创建依赖 - 控制权在类内部
    this.db = new TraditionalDatabase()
  }

  getUser(id) {
    console.log(this.db.connect())
    return `获取用户 ${id}`
  }
}

/**
 * IOC 模式：依赖从外部注入
 * 优势：松耦合，易于测试和替换依赖
 */
class MySQLDatabase {
  connect() {
    return '连接到 MySQL 数据库'
  }
}

class PostgreSQLDatabase {
  connect() {
    return '连接到 PostgreSQL 数据库'
  }
}

class IOCUserService {
  constructor(db) {
    // 依赖通过构造函数传入 - 控制权在外部
    this.db = db
  }

  getUser(id) {
    console.log(this.db.connect())
    return `获取用户 ${id}`
  }
}

// 使用示例
console.log('传统模式（紧耦合）：')
const traditionalService = new TraditionalUserService()
traditionalService.getUser(1)

console.log('\nIOC 模式（松耦合）：')
const mysqlDb = new MySQLDatabase()
const iocService1 = new IOCUserService(mysqlDb)
iocService1.getUser(1)

// 轻松切换数据库实现
const postgresDb = new PostgreSQLDatabase()
const iocService2 = new IOCUserService(postgresDb)
iocService2.getUser(2)

// ============================================================================
// 2. DI（依赖注入 - Dependency Injection）实现
// ============================================================================

console.log('\n========== 2. DI（依赖注入）实现 ==========\n')

/**
 * DI 是 IOC 的具体实现方式
 * 常见的注入方式：
 * 1. 构造函数注入（最常用）
 * 2. 属性注入
 * 3. 方法注入
 */

// 日志实现
class ConsoleLogger {
  log(message) {
    console.log(`[ConsoleLogger] ${message}`)
  }
}

class FileLogger {
  log(message) {
    console.log(`[FileLogger] 写入文件: ${message}`)
  }
}

// 数据仓库实现
class UserRepository {
  findById(id) {
    return `用户${id}的数据`
  }

  save(name) {
    console.log(`保存用户: ${name}`)
  }
}

/**
 * 用户服务 - 演示构造函数注入
 */
class UserService {
  constructor(repository, logger) {
    // 通过构造函数注入多个依赖
    this.repository = repository
    this.logger = logger
  }

  getUserById(id) {
    this.logger.log(`正在查询用户 ${id}`)
    const user = this.repository.findById(id)
    this.logger.log(`查询成功: ${user}`)
    return user
  }

  createUser(name) {
    this.logger.log(`正在创建用户 ${name}`)
    this.repository.save(name)
    this.logger.log('创建成功')
  }
}

// 使用示例 - 手动注入依赖
const repository = new UserRepository()
const consoleLogger = new ConsoleLogger()
const userService1 = new UserService(repository, consoleLogger)
userService1.getUserById(1)
userService1.createUser('张三')

console.log('\n切换日志实现：')
const fileLogger = new FileLogger()
const userService2 = new UserService(repository, fileLogger)
userService2.getUserById(2)

// ============================================================================
// 3. Service Container（服务容器 - DI 容器）
// ============================================================================

console.log('\n========== 3. Service Container（服务容器）演示 ==========\n')

/**
 * 服务容器：自动管理依赖的创建和注入
 * 避免手动创建大量实例
 */
class ServiceContainer {
  constructor() {
    this.services = new Map()
    this.factories = new Map()
  }

  /**
   * 注册单例服务（只创建一次）
   */
  registerSingleton(name, instance) {
    this.services.set(name, instance)
  }

  /**
   * 注册工厂方法（每次调用都创建新实例）
   */
  registerFactory(name, factory) {
    this.factories.set(name, factory)
  }

  /**
   * 解析服务（获取服务实例）
   */
  resolve(name) {
    // 先查找单例
    if (this.services.has(name)) {
      return this.services.get(name)
    }

    // 再查找工厂方法
    if (this.factories.has(name)) {
      const factory = this.factories.get(name)
      return factory()
    }

    throw new Error(`服务 "${name}" 未注册`)
  }

  /**
   * 检查服务是否已注册
   */
  has(name) {
    return this.services.has(name) || this.factories.has(name)
  }
}

// 使用示例
const container = new ServiceContainer()

// 注册单例服务
container.registerSingleton('logger', new ConsoleLogger())
container.registerSingleton('userRepository', new UserRepository())

// 注册工厂方法（每次创建新实例）
container.registerFactory('userService', () => {
  const logger = container.resolve('logger')
  const repo = container.resolve('userRepository')
  return new UserService(repo, logger)
})

// 从容器中解析服务
const userService3 = container.resolve('userService')
userService3.getUserById(100)

console.log('\n容器管理的优势：')
console.log('- 集中管理所有依赖')
console.log('- 自动解析依赖关系')
console.log('- 支持单例和工厂模式')
console.log(`- 已注册服务: logger=${container.has('logger')}, userRepository=${container.has('userRepository')}`)

// ============================================================================
// 4. AOP（面向切面编程 - Aspect Oriented Programming）
// ============================================================================

console.log('\n========== 4. AOP（面向切面编程）演示 ==========\n')

/**
 * AOP：将横切关注点（如日志、性能监控、权限检查）从业务逻辑中分离
 * 通过"切面"统一处理这些通用功能
 */

/**
 * 日志切面：记录方法的调用
 */
function withLogging(fn, methodName) {
  return function(...args) {
    console.log(`[日志切面] 调用方法: ${methodName}`)
    console.log(`[日志切面] 参数:`, args)
    const result = fn.apply(this, args)
    console.log(`[日志切面] 返回值:`, result)
    return result
  }
}

/**
 * 性能监控切面：测量方法执行时间
 */
function withTiming(fn, methodName) {
  return function(...args) {
    const start = Date.now()
    const result = fn.apply(this, args)
    const end = Date.now()
    console.log(`[性能切面] ${methodName} 执行时间: ${end - start}ms`)
    return result
  }
}

/**
 * 错误处理切面：捕获和处理异常
 */
function withErrorHandling(fn, methodName) {
  return function(...args) {
    try {
      return fn.apply(this, args)
    } catch (error) {
      console.error(`[错误切面] ${methodName} 发生错误:`, error)
      throw error
    }
  }
}

/**
 * 组合多个切面
 */
function applyAspects(fn, methodName, aspects) {
  return aspects.reduce((wrappedFn, aspect) => {
    return aspect(wrappedFn, methodName)
  }, fn)
}

// 业务类
class OrderService {
  calculateTotal(items) {
    // 模拟耗时操作
    let sum = 0
    for (let i = 0; i < 1000000; i++) {
      sum += i % 10
    }
    return items.reduce((acc, item) => acc + item, 0)
  }

  processOrder(orderId) {
    return `处理订单 ${orderId}`
  }
}

// 使用 AOP 增强方法
const orderService = new OrderService()

// 为 calculateTotal 添加日志和性能监控切面
const enhancedCalculate = applyAspects(
  orderService.calculateTotal.bind(orderService),
  'calculateTotal',
  [withLogging, withTiming, withErrorHandling]
)

console.log('调用增强后的方法：')
const total = enhancedCalculate([100, 200, 300])
console.log(`最终结果: ${total}\n`)

// ============================================================================
// 5. Middleware（中间件模式 - 责任链模式）
// ============================================================================

console.log('========== 5. Middleware（中间件模式）演示 ==========\n')

/**
 * 中间件模式：请求通过一系列处理器，每个处理器可以：
 * 1. 处理请求
 * 2. 传递给下一个处理器
 * 3. 中断请求
 */

class MiddlewareStack {
  constructor() {
    this.middlewares = []
  }

  use(middleware) {
    this.middlewares.push(middleware)
  }

  execute(req, res) {
    let index = 0

    const next = () => {
      if (index < this.middlewares.length) {
        const middleware = this.middlewares[index++]
        middleware(req, res, next)
      }
    }

    next()
  }
}

// 日志中间件
const loggerMiddleware = (req, res, next) => {
  console.log(`[日志中间件] ${req.method} ${req.url}`)
  next()
}

// 认证中间件
const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization']
  if (token === 'valid-token') {
    req.user = { id: 1, name: '张三' }
    console.log('[认证中间件] 认证成功')
    next()
  } else {
    console.log('[认证中间件] 认证失败')
    res.status = 401
    res.body = { error: '未授权' }
    // 不调用 next()，中断请求
  }
}

// 权限检查中间件
const permissionMiddleware = (req, res, next) => {
  if (req.user) {
    console.log(`[权限中间件] 检查用户 ${req.user.name} 的权限`)
    next()
  } else {
    res.status = 403
    res.body = { error: '无权限' }
  }
}

// 业务处理中间件
const businessMiddleware = (req, res, next) => {
  console.log('[业务中间件] 处理业务逻辑')
  res.status = 200
  res.body = { message: '处理成功', user: req.user }
  next()
}

// 使用示例
const app = new MiddlewareStack()
app.use(loggerMiddleware)
app.use(authMiddleware)
app.use(permissionMiddleware)
app.use(businessMiddleware)

console.log('场景1：有效的认证令牌')
const req1 = {
  url: '/api/users',
  method: 'GET',
  headers: { authorization: 'valid-token' }
}
const res1 = { status: 0, body: null }
app.execute(req1, res1)
console.log('最终响应:', res1)

console.log('\n场景2：无效的认证令牌（中间件链中断）')
const req2 = {
  url: '/api/users',
  method: 'GET',
  headers: { authorization: 'invalid-token' }
}
const res2 = { status: 0, body: null }
app.execute(req2, res2)
console.log('最终响应:', res2)

// ============================================================================
// 6. 综合示例：结合 DI、AOP、Middleware
// ============================================================================

console.log('\n========== 6. 综合示例 ==========\n')

/**
 * 一个完整的示例，展示如何结合使用这些模式
 */

// 服务层
class ProductService {
  constructor(logger, cache) {
    this.logger = logger
    this.cache = cache
  }

  getProduct(id) {
    this.logger.log(`查询产品 ${id}`)
    
    // 检查缓存
    if (this.cache.has(id)) {
      this.logger.log('从缓存获取')
      return this.cache.get(id)
    }

    // 模拟数据库查询
    const product = `产品${id}的详细信息`
    this.cache.set(id, product)
    return product
  }
}

// 创建服务容器
const appContainer = new ServiceContainer()
appContainer.registerSingleton('logger', new ConsoleLogger())
appContainer.registerSingleton('cache', new Map())
appContainer.registerFactory('productService', () => {
  return new ProductService(
    appContainer.resolve('logger'),
    appContainer.resolve('cache')
  )
})

// 从容器获取服务
const productService = appContainer.resolve('productService')

// 使用 AOP 增强服务方法
const enhancedGetProduct = applyAspects(
  productService.getProduct.bind(productService),
  'getProduct',
  [withTiming]
)

// 使用中间件处理请求
const apiApp = new MiddlewareStack()
apiApp.use((req, res, next) => {
  console.log(`\n处理请求: ${req.url}`)
  next()
})
apiApp.use((req, res, next) => {
  // 调用增强后的服务方法
  const productId = parseInt(req.url.split('/').pop() || '0')
  const product = enhancedGetProduct(productId)
  res.status = 200
  res.body = { product }
  next()
})

// 执行请求
const req = { url: '/api/products/1', method: 'GET', headers: {} }
const res = { status: 0, body: null }
apiApp.execute(req, res)
console.log('响应:', res.body)

// 再次请求（测试缓存）
console.log('\n第二次请求（应该从缓存获取）:')
const req2_final = { url: '/api/products/1', method: 'GET', headers: {} }
const res2_final = { status: 0, body: null }
apiApp.execute(req2_final, res2_final)

console.log('\n========== 概念总结 ==========\n')
console.log('1. IOC (控制反转): 将依赖关系的控制权从类内部转移到外部')
console.log('2. DI (依赖注入): IOC 的具体实现，通过构造函数等方式注入依赖')
console.log('3. Service Container: 自动管理依赖的创建和注入，支持单例和工厂模式')
console.log('4. AOP (面向切面编程): 将横切关注点从业务逻辑中分离，统一处理')
console.log('5. Middleware (中间件): 责任链模式，请求依次经过多个处理器')
console.log('\n这些模式的核心目标：')
console.log('- 降低耦合度')
console.log('- 提高代码复用性')
console.log('- 便于测试和维护')
console.log('- 关注点分离\n')

// ============================================================================
// 运行说明
// ============================================================================

/**
 * 如何运行此文件：
 * 
 * 方式 1: 直接使用 Node.js 运行
 * ```bash
 * node JavaScript/DataStructure/di-aop-ioc-demo.js
 * ```
 * 
 * 方式 2: 在浏览器中运行
 * 创建一个 HTML 文件，引入此脚本：
 * ```html
 * <!DOCTYPE html>
 * <html>
 * <head><title>DI/AOP/IOC Demo</title></head>
 * <body>
 *   <h1>打开浏览器控制台查看输出</h1>
 *   <script src="di-aop-ioc-demo.js"></script>
 * </body>
 * </html>
 * ```
 * 
 * 注意：这是纯 JavaScript 版本，无需任何编译步骤
 */

// ============================================================================
// 扩展练习
// ============================================================================

/**
 * 练习 1: 扩展服务容器
 * 为 ServiceContainer 添加以下功能：
 * - 支持依赖的自动解析（根据构造函数参数自动注入）
 * - 支持作用域（Scope）：单例、瞬时、请求级别
 * - 添加生命周期钩子（onCreate, onDestroy）
 * 
 * 提示：可以使用 Function.toString() 来解析构造函数参数
 */

/**
 * 练习 2: 使用 Proxy 实现 AOP
 * 使用 ES6 的 Proxy 来实现更优雅的 AOP：
 * ```javascript
 * const proxy = new Proxy(orderService, {
 *   get(target, prop) {
 *     const original = target[prop];
 *     if (typeof original === 'function') {
 *       return function(...args) {
 *         console.log(`调用方法: ${prop}`);
 *         return original.apply(target, args);
 *       };
 *     }
 *     return original;
 *   }
 * });
 * ```
 */

/**
 * 练习 3: 实现异步中间件
 * 扩展中间件示例支持异步操作：
 * ```javascript
 * class AsyncMiddlewareStack {
 *   async execute(req, res) {
 *     for (const middleware of this.middlewares) {
 *       await middleware(req, res);
 *     }
 *   }
 * }
 * ```
 */

/**
 * 练习 4: 实现简单的事件总线
 * 结合这些模式实现一个事件驱动的架构：
 * - 使用 DI 注入事件总线
 * - 使用 AOP 自动触发事件
 * - 使用中间件处理事件
 */

// ============================================================================
// 使用 Proxy 实现的 AOP 示例（扩展）
// ============================================================================

console.log('\n========== 扩展：使用 Proxy 实现 AOP ==========\n')

/**
 * 使用 ES6 Proxy 实现更优雅的 AOP
 */
function createAOPProxy(target, handlers = {}) {
  return new Proxy(target, {
    get(obj, prop) {
      const original = obj[prop]
      
      // 如果不是方法，直接返回
      if (typeof original !== 'function') {
        return original
      }
      
      // 返回包装后的方法
      return function(...args) {
        // 前置处理
        if (handlers.before) {
          handlers.before(prop, args)
        }
        
        // 执行原方法
        let result
        try {
          result = original.apply(obj, args)
        } catch (error) {
          // 错误处理
          if (handlers.error) {
            handlers.error(prop, error)
          }
          throw error
        }
        
        // 后置处理
        if (handlers.after) {
          handlers.after(prop, result)
        }
        
        return result
      }
    }
  })
}

// 使用示例
class CalculatorService {
  add(a, b) {
    return a + b
  }
  
  divide(a, b) {
    if (b === 0) throw new Error('除数不能为0')
    return a / b
  }
}

const calculator = new CalculatorService()
const proxyCalculator = createAOPProxy(calculator, {
  before(method, args) {
    console.log(`[Proxy AOP] 调用方法: ${method}, 参数:`, args)
  },
  after(method, result) {
    console.log(`[Proxy AOP] 方法 ${method} 返回:`, result)
  },
  error(method, error) {
    console.error(`[Proxy AOP] 方法 ${method} 错误:`, error.message)
  }
})

console.log('使用 Proxy 增强的计算器：')
console.log('结果:', proxyCalculator.add(5, 3))

console.log('\n测试错误处理：')
try {
  proxyCalculator.divide(10, 0)
} catch (e) {
  console.log('错误已被捕获')
}

// ============================================================================
// 参考资料
// ============================================================================

/**
 * 深入学习资源：
 * 
 * 1. JavaScript 中的 IOC/DI:
 *    - InversifyJS: https://inversify.io/
 *    - Awilix: https://github.com/jeffijoe/awilix
 *    - Bottle.js: https://github.com/young-steveo/bottlejs
 * 
 * 2. AOP 在 JavaScript 中:
 *    - meld: https://github.com/cujojs/meld
 *    - ES6 Proxy: MDN 文档
 * 
 * 3. 中间件模式:
 *    - Express.js: https://expressjs.com/
 *    - Koa.js: https://koajs.com/
 *    - Connect: https://github.com/senchalabs/connect
 * 
 * 4. 设计模式书籍:
 *    - 《JavaScript 设计模式与开发实践》
 *    - 《JavaScript 高级程序设计》
 *    - 《深入理解 ES6》
 */

// ============================================================================
// 实际应用场景
// ============================================================================

/**
 * 这些模式在实际 JavaScript 项目中的应用：
 * 
 * 1. 前端框架:
 *    - Angular: 内置强大的 DI 系统
 *    - Vue 3: 提供 provide/inject API
 *    - React: Context API 和 依赖注入
 * 
 * 2. 后端框架:
 *    - NestJS: 大量使用 DI 和 AOP（类似 Angular）
 *    - Express/Koa: 中间件模式的经典应用
 *    - Fastify: 基于插件和钩子的架构
 * 
 * 3. 测试:
 *    - 使用 DI 方便 Mock 和 Stub
 *    - Jest 的 mock 功能
 *    - Sinon.js 的 spy 和 stub
 * 
 * 4. 日志和监控:
 *    - Winston: 传输层使用了类似 DI 的模式
 *    - Pino: 高性能日志库
 *    - New Relic: AOP 方式的性能监控
 * 
 * 5. 状态管理:
 *    - Redux: 中间件模式处理异步操作
 *    - MobX: 响应式编程和依赖注入
 *    - Zustand: 轻量级状态管理
 */

console.log('\n✅ Demo 运行完成！')
console.log('提示：你可以修改代码并重新运行来实验不同的场景\n')
