// 将整个文件包装为模块，避免全局命名冲突
export { };

/**
 * ==========================================
 * 装饰器元数据反射 (Decorator Metadata Reflection)
 * ==========================================
 * 
 * 元数据反射允许装饰器存储和读取关于类、方法、属性的额外信息
 * 
 * ⚠️  重要：本文件需要 reflect-metadata 库才能正常运行
 * 
 * 安装方法：
 * npm install reflect-metadata
 * 
 * 使用方法：
 * 1. 在文件开头取消注释 import "reflect-metadata"
 * 2. 配置 tsconfig.json：
 * {
 *   "compilerOptions": {
 *     "experimentalDecorators": true,
 *     "emitDecoratorMetadata": true  // 重要：自动生成类型元数据
 *   }
 * }
 * 
 * Reflect Metadata API:
 * - Reflect.defineMetadata(key, value, target, propertyKey?)
 * - Reflect.getMetadata(key, target, propertyKey?)
 * - Reflect.hasMetadata(key, target, propertyKey?)
 * - Reflect.getMetadataKeys(target, propertyKey?)
 * 
 * 内置元数据键：
 * - "design:type"         - 属性类型
 * - "design:paramtypes"   - 参数类型数组
 * - "design:returntype"   - 返回值类型
 */

// ⚠️  取消下面这行的注释来启用 reflect-metadata（需要先安装）
// import "reflect-metadata";

// 为了避免 TypeScript 错误，我们为 Reflect 添加类型定义
declare global {
  namespace Reflect {
    function defineMetadata(key: string, value: any, target: any, propertyKey?: string): void;
    function getMetadata(key: string, target: any, propertyKey?: string): any;
    function getMetadataKeys(target: any, propertyKey?: string): string[];
    function hasMetadata(key: string, target: any, propertyKey?: string): boolean;
    function getOwnMetadata(key: string, target: any, propertyKey?: string): any;
  }
}

console.log("==========================================");
console.log("装饰器元数据反射示例");
console.log("==========================================\n");

console.log("⚠️  注意：以下示例需要 reflect-metadata 库");
console.log("   安装: npm install reflect-metadata");
console.log("   在代码开头: import 'reflect-metadata'\n");

// ==========================================
// 示例 1: 自定义元数据存储和读取
// ==========================================
console.log("【示例 1】自定义元数据存储和读取:\n");

class User {
  @SetMetadata("description", "用户ID")
  @SetMetadata("required", true)
  id: number;

  @SetMetadata("description", "用户名")
  @SetMetadata("maxLength", 50)
  name: string;

  @SetMetadata("description", "用户邮箱")
  @SetMetadata("format", "email")
  email: string;

  constructor() {
    this.id = 0;
    this.name = "";
    this.email = "";
  }
}

function SetMetadata(key: string, value: any) {
  return function (target: any, propertyKey: string) {
    // 存储元数据
    Reflect.defineMetadata(key, value, target, propertyKey);
    console.log(`💾 存储元数据: ${propertyKey}.${key} = ${value}`);
  };
}

// 读取元数据
function getPropertyMetadata(target: any, propertyKey: string) {
  const keys = Reflect.getMetadataKeys(target, propertyKey);
  const metadata: any = {};

  for (const key of keys) {
    metadata[key] = Reflect.getMetadata(key, target, propertyKey);
  }

  return metadata;
}

console.log("\n读取元数据:");
const userPrototype = User.prototype;
console.log("id 元数据:", getPropertyMetadata(userPrototype, "id"));
console.log("name 元数据:", getPropertyMetadata(userPrototype, "name"));
console.log("email 元数据:", getPropertyMetadata(userPrototype, "email"));

console.log("\n");

// ==========================================
// 示例 2: 使用类型元数据进行验证
// ==========================================
console.log("【示例 2】使用类型元数据进行验证:\n");

class Product {
  @Required
  @IsString
  name: string = "";

  @Required
  @IsNumber
  @Min(0)
  price: number = 0;

  @IsNumber
  @Min(0)
  @Max(1000)
  stock: number = 0;
}

function Required(target: any, propertyKey: string) {
  Reflect.defineMetadata("required", true, target, propertyKey);
}

function IsString(target: any, propertyKey: string) {
  Reflect.defineMetadata("type", "string", target, propertyKey);
}

function IsNumber(target: any, propertyKey: string) {
  Reflect.defineMetadata("type", "number", target, propertyKey);
}

function Min(min: number) {
  return function (target: any, propertyKey: string) {
    Reflect.defineMetadata("min", min, target, propertyKey);
  };
}

function Max(max: number) {
  return function (target: any, propertyKey: string) {
    Reflect.defineMetadata("max", max, target, propertyKey);
  };
}

// 验证器
function validate(obj: any): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  const prototype = Object.getPrototypeOf(obj);
  const properties = Object.getOwnPropertyNames(obj);

  for (const property of properties) {
    const value = obj[property];

    // 检查必需
    const required = Reflect.getMetadata("required", prototype, property);
    if (required && (value === null || value === undefined || value === "")) {
      errors.push(`${property} 是必需的`);
      continue;
    }

    // 检查类型
    const expectedType = Reflect.getMetadata("type", prototype, property);
    if (expectedType && typeof value !== expectedType) {
      errors.push(`${property} 必须是 ${expectedType} 类型`);
    }

    // 检查最小值
    const min = Reflect.getMetadata("min", prototype, property);
    if (min !== undefined && typeof value === "number" && value < min) {
      errors.push(`${property} 必须大于等于 ${min}`);
    }

    // 检查最大值
    const max = Reflect.getMetadata("max", prototype, property);
    if (max !== undefined && typeof value === "number" && value > max) {
      errors.push(`${property} 必须小于等于 ${max}`);
    }
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

console.log("验证有效对象:");
const validProduct = new Product();
validProduct.name = "笔记本电脑";
validProduct.price = 5999;
validProduct.stock = 100;
const result1 = validate(validProduct);
console.log("结果:", result1.valid ? "✅ 验证通过" : "❌ 验证失败");
if (!result1.valid) console.log("错误:", result1.errors);

console.log("\n验证无效对象:");
const invalidProduct = new Product();
invalidProduct.name = ""; // 必需但为空
invalidProduct.price = -100; // 小于最小值
invalidProduct.stock = 2000; // 大于最大值
const result2 = validate(invalidProduct);
console.log("结果:", result2.valid ? "✅ 验证通过" : "❌ 验证失败");
if (!result2.valid) console.log("错误:", result2.errors);

console.log("\n");

// ==========================================
// 示例 3: 依赖注入（简化版）
// ==========================================
console.log("【示例 3】依赖注入（简化版）:\n");

// 服务容器
class ServiceContainer {
  private services = new Map<string, any>();

  register<T>(token: string, service: T): void {
    this.services.set(token, service);
    console.log(`📦 注册服务: ${token}`);
  }

  resolve<T>(token: string): T {
    const service = this.services.get(token);
    if (!service) {
      throw new Error(`服务 ${token} 未注册`);
    }
    return service;
  }
}

const container = new ServiceContainer();

// 注册服务标记装饰器
function Injectable(token: string) {
  return function <T extends { new(...args: any[]): {} }>(constructor: T) {
    Reflect.defineMetadata("injectable", token, constructor);
    console.log(`🏷️  标记为可注入: ${token}`);
    return constructor;
  };
}

// 注入装饰器
function Inject(token: string) {
  return function (target: any, propertyKey: string) {
    Reflect.defineMetadata("inject", token, target, propertyKey);

    // 定义 getter，自动从容器获取服务
    Object.defineProperty(target, propertyKey, {
      get() {
        const injectedToken = Reflect.getMetadata("inject", target, propertyKey);
        return container.resolve(injectedToken);
      },
      enumerable: true,
      configurable: true
    });
  };
}

// 定义服务
@Injectable("Logger")
class Logger {
  log(message: string): void {
    console.log(`  📝 [Logger] ${message}`);
  }
}

@Injectable("Database")
class Database {
  connect(): void {
    console.log(`  🔌 [Database] 连接数据库`);
  }

  query(sql: string): any {
    console.log(`  🔍 [Database] 执行查询: ${sql}`);
    return [{ id: 1, name: "数据" }];
  }
}

// 使用服务
class UserRepository {
  @Inject("Logger")
  private logger!: Logger;

  @Inject("Database")
  private db!: Database;

  findAll(): any[] {
    this.logger.log("查询所有用户");
    this.db.connect();
    return this.db.query("SELECT * FROM users");
  }
}

// 注册服务实例
container.register("Logger", new Logger());
container.register("Database", new Database());

console.log("\n使用依赖注入:");
const userRepo = new UserRepository();
const users = userRepo.findAll();
console.log("  结果:", users);

console.log("\n");

// ==========================================
// 示例 4: 路由装饰器（类似 NestJS）
// ==========================================
console.log("【示例 4】路由装饰器（类似 NestJS）:\n");

// 路由注册表
const routes: Array<{
  controller: string;
  path: string;
  method: string;
  handler: string;
}> = [];

function Controller(basePath: string) {
  return function (constructor: Function) {
    Reflect.defineMetadata("basePath", basePath, constructor);
    console.log(`🎯 注册控制器: ${basePath}`);
  };
}

function Get(path: string) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const basePath = Reflect.getMetadata("basePath", target.constructor) || "";
    const fullPath = basePath + path;

    routes.push({
      controller: target.constructor.name,
      path: fullPath,
      method: "GET",
      handler: propertyKey
    });

    console.log(`  📍 注册路由: GET ${fullPath} -> ${propertyKey}`);
  };
}

function Post(path: string) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const basePath = Reflect.getMetadata("basePath", target.constructor) || "";
    const fullPath = basePath + path;

    routes.push({
      controller: target.constructor.name,
      path: fullPath,
      method: "POST",
      handler: propertyKey
    });

    console.log(`  📍 注册路由: POST ${fullPath} -> ${propertyKey}`);
  };
}

@Controller("/api/users")
class UserController {
  @Get("/")
  getAllUsers() {
    return [{ id: 1, name: "张三" }];
  }

  @Get("/:id")
  getUser() {
    return { id: 1, name: "张三" };
  }

  @Post("/")
  createUser() {
    return { id: 2, name: "李四" };
  }
}

@Controller("/api/products")
class ProductController {
  @Get("/")
  getAllProducts() {
    return [{ id: 1, name: "产品A" }];
  }

  @Post("/")
  createProduct() {
    return { id: 2, name: "产品B" };
  }
}

console.log("\n注册的路由表:");
routes.forEach(route => {
  console.log(`  ${route.method.padEnd(6)} ${route.path.padEnd(20)} -> ${route.controller}.${route.handler}`);
});

console.log("\n");

// ==========================================
// 总结
// ==========================================
console.log("==========================================");
console.log("📚 元数据反射总结:");
console.log("==========================================");
console.log("1. 存储自定义元数据到类/方法/属性");
console.log("2. 运行时读取和验证元数据");
console.log("3. 实现依赖注入容器");
console.log("4. 创建路由系统");
console.log("5. 构建验证框架");
console.log("");
console.log("常见应用场景:");
console.log("- ORM 框架（实体映射）");
console.log("- 依赖注入（Angular, NestJS）");
console.log("- 路由系统（Express, NestJS）");
console.log("- 验证框架（class-validator）");
console.log("- 序列化/反序列化");
console.log("==========================================");
