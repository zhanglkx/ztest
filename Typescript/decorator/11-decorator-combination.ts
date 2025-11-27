// 将整个文件包装为模块，避免全局命名冲突
export {};

/**
 * ==========================================
 * 多装饰器组合使用 (Decorator Composition)
 * ==========================================
 * 
 * 多个装饰器可以应用于同一个目标，它们会按照特定的顺序执行
 * 这种组合方式可以创建强大且可复用的功能模块
 * 
 * 关键点：
 * 1. 装饰器可以堆叠使用，实现功能的组合
 * 2. 执行顺序：从下到上（最接近目标的装饰器最先执行）
 * 3. 每个装饰器都可以修改或包装目标
 */

console.log("==========================================");
console.log("多装饰器组合使用演示");
console.log("==========================================\n");

// ==========================================
// 示例 1: 日志 + 性能监控组合
// ==========================================
console.log("【示例 1】日志 + 性能监控组合:\n");

class UserService {
  @Log
  @Measure
  async getUser(id: number): Promise<any> {
    // 模拟异步操作
    await new Promise(resolve => setTimeout(resolve, 100));
    return { id, name: "张三", email: "zhangsan@example.com" };
  }

  @Log
  @Measure
  async saveUser(user: any): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 50));
    console.log(`  📝 保存用户:`, user);
  }
}

function Log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;

  descriptor.value = async function (...args: any[]) {
    console.log(`📋 [Log] 方法 ${propertyKey} 被调用`);
    console.log(`   参数:`, args);
    const result = await originalMethod.apply(this, args);
    console.log(`   返回值:`, result);
    return result;
  };

  return descriptor;
}

function Measure(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;

  descriptor.value = async function (...args: any[]) {
    const start = performance.now();
    const result = await originalMethod.apply(this, args);
    const duration = performance.now() - start;
    console.log(`⏱️  [Measure] ${propertyKey} 耗时: ${duration.toFixed(2)}ms`);
    return result;
  };

  return descriptor;
}

(async () => {
  const userService = new UserService();
  await userService.getUser(1);
  console.log();
  await userService.saveUser({ id: 2, name: "李四" });
  console.log("\n");
})();

// ==========================================
// 示例 2: 验证 + 缓存 + 日志组合
// ==========================================
console.log("【示例 2】验证 + 缓存 + 日志组合:\n");

class ProductService {
  @LogMethod
  @Cache(3000) // 缓存 3 秒
  @ValidateParams
  getProduct(@NonNegative id: number): any {
    console.log(`  🔍 从数据库查询产品 ${id}`);
    return { id, name: "笔记本电脑", price: 5999 };
  }
}

// 参数验证装饰器
function ValidateParams(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const requiredParams = Reflect.getOwnMetadata('validate', target, propertyKey) || [];

  descriptor.value = function (...args: any[]) {
    for (const { index, validator, message } of requiredParams) {
      if (!validator(args[index])) {
        throw new Error(`❌ 参数验证失败: ${message}`);
      }
    }
    console.log(`✅ [Validate] 参数验证通过`);
    return originalMethod.apply(this, args);
  };

  return descriptor;
}

// 参数装饰器：非负数
function NonNegative(target: any, propertyKey: string, parameterIndex: number) {
  const existingParams = Reflect.getOwnMetadata('validate', target, propertyKey) || [];
  existingParams.push({
    index: parameterIndex,
    validator: (value: number) => typeof value === 'number' && value >= 0,
    message: `参数 ${parameterIndex} 必须是非负数`
  });
  Reflect.defineMetadata('validate', existingParams, target, propertyKey);
}

// 缓存装饰器
function Cache(duration: number) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    const cache = new Map<string, { value: any; timestamp: number }>();

    descriptor.value = function (...args: any[]) {
      const key = JSON.stringify(args);
      const cached = cache.get(key);
      const now = Date.now();

      if (cached && now - cached.timestamp < duration) {
        console.log(`💾 [Cache] 命中缓存`);
        return cached.value;
      }

      console.log(`🔄 [Cache] 缓存未命中或已过期，执行方法`);
      const result = originalMethod.apply(this, args);
      cache.set(key, { value: result, timestamp: now });
      return result;
    };

    return descriptor;
  };
}

function LogMethod(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: any[]) {
    console.log(`📝 [Log] 调用 ${propertyKey}(${args.join(', ')})`);
    const result = originalMethod.apply(this, args);
    console.log(`📝 [Log] 返回结果`);
    return result;
  };

  return descriptor;
}

const productService = new ProductService();

console.log("第 1 次调用:");
console.log(productService.getProduct(1));
console.log();

console.log("第 2 次调用（应该命中缓存）:");
console.log(productService.getProduct(1));
console.log();

console.log("第 3 次调用（不同参数）:");
console.log(productService.getProduct(2));
console.log();

console.log("第 4 次调用（无效参数）:");
try {
  productService.getProduct(-1);
} catch (error) {
  console.log(error.message);
}
console.log("\n");

// ==========================================
// 示例 3: 权限 + 重试 + 错误处理组合
// ==========================================
console.log("【示例 3】权限 + 重试 + 错误处理组合:\n");

// 模拟当前用户
let currentUser = { role: "admin", permissions: ["read", "write", "delete"] };

class AdminService {
  private attemptCount = 0;

  @ErrorHandler
  @Retry(3)
  @RequirePermission("delete")
  deleteUser(id: number): string {
    this.attemptCount++;
    console.log(`  🔄 尝试删除用户 ${id}，第 ${this.attemptCount} 次`);
    
    // 模拟偶尔失败
    if (this.attemptCount < 2) {
      throw new Error("网络错误");
    }
    
    this.attemptCount = 0;
    return `用户 ${id} 已删除`;
  }
}

// 权限验证装饰器
function RequirePermission(permission: string) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      if (!currentUser.permissions.includes(permission)) {
        throw new Error(`❌ [Auth] 权限不足: 需要 ${permission} 权限`);
      }
      console.log(`✅ [Auth] 权限验证通过: ${permission}`);
      return originalMethod.apply(this, args);
    };

    return descriptor;
  };
}

// 重试装饰器
function Retry(maxRetries: number) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      let lastError: any;

      for (let i = 0; i < maxRetries; i++) {
        try {
          const result = originalMethod.apply(this, args);
          if (i > 0) {
            console.log(`✅ [Retry] 重试成功`);
          }
          return result;
        } catch (error) {
          lastError = error;
          console.log(`⚠️  [Retry] 第 ${i + 1} 次尝试失败: ${error.message}`);
          
          if (i < maxRetries - 1) {
            console.log(`   继续重试...`);
          }
        }
      }

      throw lastError;
    };

    return descriptor;
  };
}

// 错误处理装饰器
function ErrorHandler(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: any[]) {
    try {
      return originalMethod.apply(this, args);
    } catch (error) {
      console.log(`🚨 [ErrorHandler] 捕获错误: ${error.message}`);
      // 可以在这里记录日志、发送通知等
      throw error; // 重新抛出或返回默认值
    }
  };

  return descriptor;
}

const adminService = new AdminService();

console.log("测试 1 - 有权限且最终成功:");
try {
  const result = adminService.deleteUser(123);
  console.log(`✅ 结果: ${result}`);
} catch (error) {
  console.log(`❌ 失败: ${error.message}`);
}
console.log();

console.log("测试 2 - 无权限:");
currentUser = { role: "user", permissions: ["read"] };
try {
  adminService.deleteUser(456);
} catch (error) {
  console.log(`❌ 失败: ${error.message}`);
}
console.log("\n");

// ==========================================
// 示例 4: 多个类装饰器组合
// ==========================================
console.log("【示例 4】多个类装饰器组合:\n");

@Serializable
@Timestamped
@Frozen
class DataModel {
  name: string = "数据模型";
  value: number = 100;
}

function Serializable<T extends { new(...args: any[]): {} }>(constructor: T) {
  return class extends constructor {
    toJSON() {
      console.log(`📦 [Serializable] 序列化对象`);
      return JSON.stringify(this);
    }
  };
}

function Timestamped<T extends { new(...args: any[]): {} }>(constructor: T) {
  return class extends constructor {
    createdAt = new Date();
    updatedAt = new Date();
  } as T;
}

function Frozen<T extends { new(...args: any[]): {} }>(constructor: T) {
  console.log(`❄️  [Frozen] 冻结类 ${constructor.name}`);
  Object.freeze(constructor.prototype);
  return constructor;
}

const model = new DataModel();
console.log("模型实例:", model);
console.log((model as any).toJSON());

console.log("\n");

// ==========================================
// 总结
// ==========================================
console.log("==========================================");
console.log("📚 装饰器组合使用总结:");
console.log("==========================================");
console.log("1. 装饰器可以堆叠使用，实现功能的组合");
console.log("2. 每个装饰器负责单一职责，保持简单");
console.log("3. 通过组合可以创建复杂的功能");
console.log("4. 执行顺序：从下到上（洋葱模型）");
console.log("5. 常见组合模式:");
console.log("   - 日志 + 性能监控");
console.log("   - 验证 + 缓存");
console.log("   - 权限 + 重试 + 错误处理");
console.log("==========================================");
