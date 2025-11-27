// 将整个文件包装为模块，避免全局命名冲突
export {};

/**
 * ==========================================
 * 装饰器实用场景示例 (Practical Use Cases)
 * ==========================================
 * 
 * 这个文件展示了装饰器在实际项目中的常见应用场景
 * 包括：日志、性能监控、缓存、防抖节流、权限验证等
 */

console.log("==========================================");
console.log("装饰器实用场景示例");
console.log("==========================================\n");

// ==========================================
// 1. 日志装饰器 (@Log)
// ==========================================
console.log("【场景 1】日志装饰器:\n");

class PaymentService {
  @Log({ level: "INFO", includeArgs: true, includeResult: true })
  processPayment(amount: number, currency: string): any {
    return {
      success: true,
      transactionId: `TXN-${Date.now()}`,
      amount,
      currency
    };
  }

  @Log({ level: "ERROR", includeArgs: true })
  refundPayment(transactionId: string): void {
    if (!transactionId.startsWith("TXN-")) {
      throw new Error("无效的交易ID");
    }
    console.log(`  退款处理: ${transactionId}`);
  }
}

interface LogOptions {
  level?: "INFO" | "WARN" | "ERROR" | "DEBUG";
  includeArgs?: boolean;
  includeResult?: boolean;
  includeTime?: boolean;
}

function Log(options: LogOptions = {}) {
  const { level = "INFO", includeArgs = true, includeResult = true, includeTime = true } = options;

  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      const timestamp = new Date().toISOString();
      const timeStr = includeTime ? `[${timestamp}] ` : "";
      
      console.log(`${timeStr}[${level}] 调用方法: ${propertyKey}`);
      
      if (includeArgs) {
        console.log(`  参数:`, args);
      }

      try {
        const result = originalMethod.apply(this, args);
        
        if (includeResult) {
          console.log(`  返回:`, result);
        }
        
        return result;
      } catch (error) {
        console.log(`  错误:`, error.message);
        throw error;
      }
    };

    return descriptor;
  };
}

const paymentService = new PaymentService();
paymentService.processPayment(100, "USD");
console.log();

try {
  paymentService.refundPayment("INVALID");
} catch (error) {
  // 错误已被日志记录
}

console.log("\n");

// ==========================================
// 2. 性能监控装饰器 (@Performance)
// ==========================================
console.log("【场景 2】性能监控装饰器:\n");

class DataProcessor {
  @Performance({ threshold: 50, warn: true })
  processLargeDataset(size: number): number[] {
    console.log(`  处理 ${size} 条数据...`);
    const data: number[] = [];
    for (let i = 0; i < size; i++) {
      data.push(Math.random() * 100);
    }
    return data;
  }

  @Performance({ threshold: 10 })
  quickOperation(): string {
    return "快速操作完成";
  }
}

interface PerformanceOptions {
  threshold?: number; // 性能阈值（毫秒）
  warn?: boolean; // 超过阈值时是否警告
}

function Performance(options: PerformanceOptions = {}) {
  const { threshold = 100, warn = false } = options;

  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      const start = performance.now();
      const result = originalMethod.apply(this, args);
      const duration = performance.now() - start;

      const emoji = duration > threshold ? "⚠️ " : "✅";
      console.log(`${emoji} [Performance] ${propertyKey}: ${duration.toFixed(2)}ms`);

      if (warn && duration > threshold) {
        console.log(`   ⚠️  警告: 执行时间超过阈值 ${threshold}ms`);
      }

      return result;
    };

    return descriptor;
  };
}

const processor = new DataProcessor();
processor.processLargeDataset(100000);
processor.quickOperation();

console.log("\n");

// ==========================================
// 3. 缓存装饰器 (@Cache)
// ==========================================
console.log("【场景 3】缓存装饰器:\n");

class ApiService {
  @Cache({ ttl: 5000, key: (args) => `user:${args[0]}` })
  async fetchUser(id: number): Promise<any> {
    console.log(`  🌐 从 API 获取用户 ${id}...`);
    await new Promise(resolve => setTimeout(resolve, 100));
    return { id, name: `用户${id}`, email: `user${id}@example.com` };
  }

  @Cache({ ttl: 3000 })
  getConfig(): any {
    console.log(`  🌐 获取配置...`);
    return { theme: "dark", language: "zh-CN" };
  }
}

interface CacheOptions {
  ttl?: number; // 缓存时间（毫秒）
  key?: (args: any[]) => string; // 缓存键生成函数
}

function Cache(options: CacheOptions = {}) {
  const { ttl = 60000, key } = options;
  const cache = new Map<string, { value: any; timestamp: number }>();

  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const cacheKey = key ? key(args) : `${propertyKey}:${JSON.stringify(args)}`;
      const cached = cache.get(cacheKey);
      const now = Date.now();

      if (cached && now - cached.timestamp < ttl) {
        console.log(`  💾 [Cache] 命中缓存: ${cacheKey}`);
        return cached.value;
      }

      console.log(`  🔄 [Cache] 缓存未命中: ${cacheKey}`);
      const result = await originalMethod.apply(this, args);
      cache.set(cacheKey, { value: result, timestamp: now });
      return result;
    };

    return descriptor;
  };
}

(async () => {
  const apiService = new ApiService();
  
  console.log("第 1 次请求:");
  await apiService.fetchUser(1);
  
  console.log("\n第 2 次请求（缓存）:");
  await apiService.fetchUser(1);
  
  console.log("\n第 3 次请求（不同 ID）:");
  await apiService.fetchUser(2);
  
  console.log("\n");
})();

// ==========================================
// 4. 防抖装饰器 (@Debounce)
// ==========================================
console.log("【场景 4】防抖装饰器:\n");

class SearchService {
  @Debounce(300)
  search(keyword: string): void {
    console.log(`  🔍 搜索: "${keyword}"`);
  }
}

function Debounce(delay: number) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    let timeoutId: NodeJS.Timeout;

    descriptor.value = function (...args: any[]) {
      console.log(`  ⏳ [Debounce] 延迟执行 ${delay}ms`);
      
      clearTimeout(timeoutId);
      
      timeoutId = setTimeout(() => {
        originalMethod.apply(this, args);
      }, delay);
    };

    return descriptor;
  };
}

const searchService = new SearchService();
console.log("快速输入多次:");
searchService.search("a");
searchService.search("ab");
searchService.search("abc");
console.log("（只有最后一次会执行）");

setTimeout(() => {
  console.log("\n");
}, 400);

// ==========================================
// 5. 节流装饰器 (@Throttle)
// ==========================================
console.log("【场景 5】节流装饰器:\n");

class ScrollHandler {
  @Throttle(1000)
  handleScroll(position: number): void {
    console.log(`  📜 处理滚动事件: 位置 ${position}`);
  }
}

function Throttle(interval: number) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    let lastCallTime = 0;

    descriptor.value = function (...args: any[]) {
      const now = Date.now();
      
      if (now - lastCallTime < interval) {
        console.log(`  ⏸️  [Throttle] 节流中，跳过执行`);
        return;
      }

      lastCallTime = now;
      return originalMethod.apply(this, args);
    };

    return descriptor;
  };
}

const scrollHandler = new ScrollHandler();
console.log("连续触发滚动事件:");
scrollHandler.handleScroll(100);
scrollHandler.handleScroll(200);
scrollHandler.handleScroll(300);

setTimeout(() => {
  console.log("\n1秒后再次触发:");
  scrollHandler.handleScroll(400);
  console.log("\n");
}, 1100);

// ==========================================
// 6. 权限验证装饰器 (@Authorize)
// ==========================================
console.log("【场景 6】权限验证装饰器:\n");

// 模拟当前用户
let currentUser = {
  id: 1,
  role: "admin",
  permissions: ["read", "write", "delete"]
};

class UserManager {
  @Authorize(["read"])
  getUsers(): any[] {
    console.log(`  ✅ 获取用户列表`);
    return [{ id: 1, name: "张三" }, { id: 2, name: "李四" }];
  }

  @Authorize(["write"])
  updateUser(id: number, data: any): void {
    console.log(`  ✅ 更新用户 ${id}:`, data);
  }

  @Authorize(["delete"])
  deleteUser(id: number): void {
    console.log(`  ✅ 删除用户 ${id}`);
  }
}

function Authorize(requiredPermissions: string[]) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      console.log(`  🔐 [Auth] 验证权限: ${requiredPermissions.join(", ")}`);
      
      const hasPermission = requiredPermissions.every(
        permission => currentUser.permissions.includes(permission)
      );

      if (!hasPermission) {
        throw new Error(`❌ 权限不足: 需要 [${requiredPermissions.join(", ")}]`);
      }

      console.log(`  ✅ [Auth] 权限验证通过`);
      return originalMethod.apply(this, args);
    };

    return descriptor;
  };
}

const userManager = new UserManager();

console.log("管理员操作:");
userManager.getUsers();
userManager.updateUser(1, { name: "张三三" });
userManager.deleteUser(2);

console.log("\n普通用户操作:");
currentUser = { id: 2, role: "user", permissions: ["read"] };
try {
  userManager.getUsers(); // 应该成功
  userManager.deleteUser(3); // 应该失败
} catch (error) {
  console.log(error.message);
}

console.log("\n");

// ==========================================
// 7. 只读装饰器 (@Readonly)
// ==========================================
console.log("【场景 7】只读装饰器:\n");

class Configuration {
  @Readonly
  apiKey: string = "secret-key-12345";

  @Readonly
  maxConnections: number = 100;

  version: string = "1.0.0"; // 普通属性，可以修改
}

function Readonly(target: any, propertyKey: string) {
  const privateKey = `_readonly_${propertyKey}`;

  Object.defineProperty(target, propertyKey, {
    get() {
      return this[privateKey];
    },
    set(value: any) {
      if (this[privateKey] !== undefined) {
        console.log(`  ⚠️  [Readonly] 属性 ${propertyKey} 是只读的，无法修改`);
        return;
      }
      this[privateKey] = value;
    },
    enumerable: true,
    configurable: true
  });
}

const config = new Configuration();
console.log("初始配置:", config);

console.log("\n尝试修改只读属性:");
config.apiKey = "new-key"; // 不会生效
console.log("apiKey:", config.apiKey);

console.log("\n修改普通属性:");
config.version = "2.0.0"; // 可以修改
console.log("version:", config.version);

console.log("\n");

// ==========================================
// 8. 重试装饰器 (@Retry)
// ==========================================
console.log("【场景 8】重试装饰器:\n");

class NetworkService {
  private attemptCount = 0;

  @Retry({ maxRetries: 3, delay: 100, exponential: true })
  async fetchData(): Promise<string> {
    this.attemptCount++;
    console.log(`  🌐 尝试请求... (第 ${this.attemptCount} 次)`);

    if (this.attemptCount < 3) {
      throw new Error("网络错误");
    }

    this.attemptCount = 0;
    return "数据获取成功";
  }
}

interface RetryOptions {
  maxRetries?: number;
  delay?: number;
  exponential?: boolean; // 指数退避
}

function Retry(options: RetryOptions = {}) {
  const { maxRetries = 3, delay = 1000, exponential = false } = options;

  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      let lastError: any;

      for (let i = 0; i < maxRetries; i++) {
        try {
          return await originalMethod.apply(this, args);
        } catch (error) {
          lastError = error;
          console.log(`  ❌ [Retry] 第 ${i + 1} 次失败: ${error.message}`);

          if (i < maxRetries - 1) {
            const waitTime = exponential ? delay * Math.pow(2, i) : delay;
            console.log(`  ⏳ [Retry] 等待 ${waitTime}ms 后重试...`);
            await new Promise(resolve => setTimeout(resolve, waitTime));
          }
        }
      }

      throw lastError;
    };

    return descriptor;
  };
}

(async () => {
  const networkService = new NetworkService();
  try {
    const result = await networkService.fetchData();
    console.log(`  ✅ ${result}`);
  } catch (error) {
    console.log(`  ❌ 最终失败: ${error.message}`);
  }

  console.log("\n");
})();

// ==========================================
// 总结
// ==========================================
setTimeout(() => {
  console.log("==========================================");
  console.log("📚 实用装饰器场景总结:");
  console.log("==========================================");
  console.log("1. @Log          - 日志记录");
  console.log("2. @Performance  - 性能监控");
  console.log("3. @Cache        - 结果缓存");
  console.log("4. @Debounce     - 防抖（延迟执行）");
  console.log("5. @Throttle     - 节流（限制频率）");
  console.log("6. @Authorize    - 权限验证");
  console.log("7. @Readonly     - 只读属性");
  console.log("8. @Retry        - 失败重试");
  console.log("");
  console.log("这些装饰器可以:");
  console.log("- 提高代码复用性");
  console.log("- 保持业务逻辑清晰");
  console.log("- 分离关注点");
  console.log("- 提供声明式编程体验");
  console.log("==========================================");
}, 2000);
