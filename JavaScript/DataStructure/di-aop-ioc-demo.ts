/**
 * DI（依赖注入）、AOP（面向切面编程）、IOC（控制反转）等设计模式概念演示
 * 
 * 本文件通过简单的代码示例介绍这些核心概念
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
  private db: TraditionalDatabase

  constructor() {
    // 在类内部直接创建依赖 - 控制权在类内部
    this.db = new TraditionalDatabase()
  }

  getUser(id: number) {
    console.log(this.db.connect())
    return `获取用户 ${id}`
  }
}

/**
 * IOC 模式：依赖从外部注入
 * 优势：松耦合，易于测试和替换依赖
 */
interface IDatabase {
  connect(): string
}

class MySQLDatabase implements IDatabase {
  connect() {
    return '连接到 MySQL 数据库'
  }
}

class PostgreSQLDatabase implements IDatabase {
  connect() {
    return '连接到 PostgreSQL 数据库'
  }
}

class IOCUserService {
  // 依赖通过构造函数传入 - 控制权在外部
  constructor(private db: IDatabase) { }

  getUser(id: number) {
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

// 日志接口
interface ILogger {
  log(message: string): void
}

class ConsoleLogger implements ILogger {
  log(message: string) {
    console.log(`[ConsoleLogger] ${message}`)
  }
}

class FileLogger implements ILogger {
  log(message: string) {
    console.log(`[FileLogger] 写入文件: ${message}`)
  }
}

// 数据仓库接口
interface IUserRepository {
  findById(id: number): string
  save(name: string): void
}

class UserRepository implements IUserRepository {
  findById(id: number) {
    return `用户${id}的数据`
  }

  save(name: string) {
    console.log(`保存用户: ${name}`)
  }
}

/**
 * 用户服务 - 演示构造函数注入
 */
class UserService {
  // 通过构造函数注入多个依赖
  constructor(
    private repository: IUserRepository,
    private logger: ILogger
  ) { }

  getUserById(id: number) {
    this.logger.log(`正在查询用户 ${id}`)
    const user = this.repository.findById(id)
    this.logger.log(`查询成功: ${user}`)
    return user
  }

  createUser(name: string) {
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

type ServiceFactory<T> = () => T
type ServiceName = string

class ServiceContainer {
  private services = new Map<ServiceName, any>()
  private factories = new Map<ServiceName, ServiceFactory<any>>()

  /**
   * 注册单例服务（只创建一次）
   */
  registerSingleton<T>(name: ServiceName, instance: T) {
    this.services.set(name, instance)
  }

  /**
   * 注册工厂方法（每次调用都创建新实例）
   */
  registerFactory<T>(name: ServiceName, factory: ServiceFactory<T>) {
    this.factories.set(name, factory)
  }

  /**
   * 解析服务（获取服务实例）
   */
  resolve<T>(name: ServiceName): T {
    // 先查找单例
    if (this.services.has(name)) {
      return this.services.get(name)
    }

    // 再查找工厂方法
    if (this.factories.has(name)) {
      const factory = this.factories.get(name)!
      return factory()
    }

    throw new Error(`服务 "${name}" 未注册`)
  }

  /**
   * 检查服务是否已注册
   */
  has(name: ServiceName): boolean {
    return this.services.has(name) || this.factories.has(name)
  }
}

// 使用示例
const container = new ServiceContainer()

// 注册单例服务
container.registerSingleton<ILogger>('logger', new ConsoleLogger())
container.registerSingleton<IUserRepository>('userRepository', new UserRepository())

// 注册工厂方法（每次创建新实例）
container.registerFactory<UserService>('userService', () => {
  const logger = container.resolve<ILogger>('logger')
  const repo = container.resolve<IUserRepository>('userRepository')
  return new UserService(repo, logger)
})

// 从容器中解析服务
const userService3 = container.resolve<UserService>('userService')
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
function withLogging<T extends (...args: any[]) => any>(fn: T, methodName: string): T {
  return ((...args: any[]) => {
    console.log(`[日志切面] 调用方法: ${methodName}`)
    console.log(`[日志切面] 参数:`, args)
    const result = fn(...args)
    console.log(`[日志切面] 返回值:`, result)
    return result
  }) as T
}

/**
 * 性能监控切面：测量方法执行时间
 */
function withTiming<T extends (...args: any[]) => any>(fn: T, methodName: string): T {
  return ((...args: any[]) => {
    const start = Date.now()
    const result = fn(...args)
    const end = Date.now()
    console.log(`[性能切面] ${methodName} 执行时间: ${end - start}ms`)
    return result
  }) as T
}

/**
 * 错误处理切面：捕获和处理异常
 */
function withErrorHandling<T extends (...args: any[]) => any>(fn: T, methodName: string): T {
  return ((...args: any[]) => {
    try {
      return fn(...args)
    } catch (error) {
      console.error(`[错误切面] ${methodName} 发生错误:`, error)
      throw error
    }
  }) as T
}

/**
 * 组合多个切面
 */
function applyAspects<T extends (...args: any[]) => any>(
  fn: T,
  methodName: string,
  aspects: Array<(fn: T, name: string) => T>
): T {
  return aspects.reduce((wrappedFn, aspect) => aspect(wrappedFn, methodName), fn)
}

// 业务类
class OrderService {
  calculateTotal(items: number[]): number {
    // 模拟耗时操作
    let sum = 0
    for (let i = 0; i < 1000000; i++) {
      sum += i % 10
    }
    return items.reduce((acc, item) => acc + item, 0)
  }

  processOrder(orderId: number): string {
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

interface Request {
  url: string
  method: string
  headers: Record<string, string>
  user?: { id: number; name: string }
}

interface Response {
  status: number
  body: any
}

type NextFunction = () => void
type Middleware = (req: Request, res: Response, next: NextFunction) => void

class MiddlewareStack {
  private middlewares: Middleware[] = []

  use(middleware: Middleware) {
    this.middlewares.push(middleware)
  }

  execute(req: Request, res: Response) {
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
const loggerMiddleware: Middleware = (req, res, next) => {
  console.log(`[日志中间件] ${req.method} ${req.url}`)
  next()
}

// 认证中间件
const authMiddleware: Middleware = (req, res, next) => {
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
const permissionMiddleware: Middleware = (req, res, next) => {
  if (req.user) {
    console.log(`[权限中间件] 检查用户 ${req.user.name} 的权限`)
    next()
  } else {
    res.status = 403
    res.body = { error: '无权限' }
  }
}

// 业务处理中间件
const businessMiddleware: Middleware = (req, res, next) => {
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
const req1: Request = {
  url: '/api/users',
  method: 'GET',
  headers: { authorization: 'valid-token' }
}
const res1: Response = { status: 0, body: null }
app.execute(req1, res1)
console.log('最终响应:', res1)

console.log('\n场景2：无效的认证令牌（中间件链中断）')
const req2: Request = {
  url: '/api/users',
  method: 'GET',
  headers: { authorization: 'invalid-token' }
}
const res2: Response = { status: 0, body: null }
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
  constructor(
    private logger: ILogger,
    private cache: Map<number, string>
  ) { }

  getProduct(id: number): string {
    this.logger.log(`查询产品 ${id}`)

    // 检查缓存
    if (this.cache.has(id)) {
      this.logger.log('从缓存获取')
      return this.cache.get(id)!
    }

    // 模拟数据库查询
    const product = `产品${id}的详细信息`
    this.cache.set(id, product)
    return product
  }
}

// 创建服务容器
const appContainer = new ServiceContainer()
appContainer.registerSingleton<ILogger>('logger', new ConsoleLogger())
appContainer.registerSingleton('cache', new Map<number, string>())
appContainer.registerFactory('productService', () => {
  return new ProductService(
    appContainer.resolve('logger'),
    appContainer.resolve('cache')
  )
})

// 从容器获取服务
const productService = appContainer.resolve<ProductService>('productService')

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
const req: Request = { url: '/api/products/1', method: 'GET', headers: {} }
const res: Response = { status: 0, body: null }
apiApp.execute(req, res)
console.log('响应:', res.body)

// 再次请求（测试缓存）
console.log('\n第二次请求（应该从缓存获取）:')
const req2: Request = { url: '/api/products/1', method: 'GET', headers: {} }
const res2: Response = { status: 0, body: null }
apiApp.execute(req2, res2)

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
 * 方式 1: 使用 ts-node（推荐）
 * ```bash
 * npx ts-node JavaScript/DataStructure/di-aop-ioc-demo.ts
 * ```
 *
 * 方式 2: 先编译再运行
 * ```bash
 * tsc JavaScript/DataStructure/di-aop-ioc-demo.ts
 * node JavaScript/DataStructure/di-aop-ioc-demo.js
 * ```
 *
 * 方式 3: 使用 tsx（更快）
 * ```bash
 * npx tsx JavaScript/DataStructure/di-aop-ioc-demo.ts
 * ```
 *
 * 注意：确保你的项目中已安装 TypeScript
 * 如果没有安装，可以运行：npm install -D typescript @types/node
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
 */

/**
 * 练习 2: 创建装饰器版本
 * 使用 TypeScript 装饰器重写 DI 和 AOP 示例：
 * - @Injectable() 装饰器标记可注入的类
 * - @Inject() 装饰器注入依赖
 * - @Log() 装饰器添加日志功能
 * - @Timing() 装饰器添加性能监控
 */

/**
 * 练习 3: 实现真实场景
 * 创建一个简单的博客系统，包含：
 * - PostService: 文章服务
 * - CommentService: 评论服务
 * - UserService: 用户服务
 * 使用 DI 管理依赖，使用 AOP 添加日志和缓存
 */

/**
 * 练习 4: 异步中间件
 * 扩展中间件示例支持异步操作：
 * - 支持 async/await
 * - 添加错误处理中间件
 * - 实现请求超时控制
 */

// ============================================================================
// 参考资料
// ============================================================================

/**
 * 深入学习资源：
 *
 * 1. IOC/DI:
 *    - InversifyJS: https://inversify.io/
 *    - TypeDI: https://github.com/typestack/typedi
 *    - Awilix: https://github.com/jeffijoe/awilix
 *
 * 2. AOP:
 *    - Aspect.js: https://github.com/mgechev/aspect.js
 *    - Kaop-ts: https://github.com/k1r0s/kaop-ts
 *
 * 3. 中间件模式:
 *    - Express.js: https://expressjs.com/
 *    - Koa.js: https://koajs.com/
 *
 * 4. 设计模式书籍:
 *    - 《设计模式：可复用面向对象软件的基础》(GoF)
 *    - 《企业应用架构模式》(Martin Fowler)
 *    - 《依赖注入》(Mark Seemann)
 */

// ============================================================================
// 实际应用场景
// ============================================================================

/**
 * 这些模式在实际项目中的应用：
 * 
 * 1. 后端框架:
 *    - NestJS: 大量使用 DI 和 AOP
 *    - Angular: 内置强大的 DI 系统
 *    - Spring: Java 生态最著名的 IOC 框架
 * 
 * 2. 测试:
 *    - 使用 DI 方便 Mock 依赖
 *    - 使用 AOP 统一处理测试数据
 * 
 * 3. 日志和监控:
 *    - 使用 AOP 统一添加日志
 *    - 使用中间件记录请求响应
 * 
 * 4. 权限控制:
 *    - 使用中间件检查用户权限
 *    - 使用 AOP 实现方法级权限控制
 * 
 * 5. 事务管理:
 *    - 使用 AOP 统一处理数据库事务
 *    - 自动回滚失败的操作
 */
