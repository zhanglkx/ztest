// 将整个文件包装为模块，避免全局命名冲突
export {};

/**
 * ==========================================
 * 方法装饰器工厂 (Method Decorator Factory)
 * ==========================================
 * 
 * 方法装饰器工厂是一个返回方法装饰器的函数，可以接受参数来配置装饰器的行为
 * 这是装饰器最常用的形式，因为它提供了更大的灵活性
 * 
 * 签名：(参数) => (target: any, propertyKey: string, descriptor: PropertyDescriptor) => PropertyDescriptor | void
 */

// ==========================================
// 示例 1: 注入前缀装饰器
// ==========================================
class Hero {
  @InjectPrefix("超级英雄-")
  introduce(name: string) {
    console.log(name);
    return name;
  }

  @InjectPrefix("反派-")
  introduceVillain(name: string) {
    console.log(name);
    return name;
  }
}

function InjectPrefix(prefix: string) {
  // 外层函数接收配置参数
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    // 内层函数是真正的方法装饰器
    const originalMethod = descriptor.value;
    
    descriptor.value = function (...args: any[]) {
      // 使用配置参数
      const modifiedArgs = [prefix + args[0], ...args.slice(1)];
      return originalMethod.apply(this, modifiedArgs);
    };
    
    return descriptor;
  };
}

console.log("示例1 - 注入前缀:");
const hero = new Hero();
hero.introduce("钢铁侠");
hero.introduceVillain("灭霸");

console.log("\n");

// ==========================================
// 示例 2: 日志级别装饰器
// ==========================================
class Logger {
  @Log("INFO")
  info(message: string) {
    return message;
  }

  @Log("ERROR")
  error(message: string) {
    return message;
  }

  @Log("DEBUG")
  debug(message: string) {
    return message;
  }
}

function Log(level: string) {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    
    descriptor.value = function (...args: any[]) {
      const timestamp = new Date().toISOString();
      console.log(`[${timestamp}] [${level}] ${key}: ${args.join(", ")}`);
      return originalMethod.apply(this, args);
    };
    
    return descriptor;
  };
}

console.log("示例2 - 日志级别:");
const logger = new Logger();
logger.info("应用启动成功");
logger.error("发生错误");
logger.debug("调试信息");

console.log("\n");

// ==========================================
// 示例 3: 重试装饰器
// ==========================================
class ApiService {
  private attemptCount = 0;

  @Retry(3, 100)
  fetchDataWithRetry(shouldFail: boolean) {
    this.attemptCount++;
    console.log(`第 ${this.attemptCount} 次尝试`);
    
    if (shouldFail && this.attemptCount < 3) {
      throw new Error("请求失败");
    }
    
    return { success: true, data: "数据获取成功" };
  }
}

function Retry(maxRetries: number, delay: number) {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    
    descriptor.value = async function (...args: any[]) {
      let lastError: any;
      
      for (let i = 0; i < maxRetries; i++) {
        try {
          return await originalMethod.apply(this, args);
        } catch (error) {
          lastError = error;
          console.log(`重试 ${i + 1}/${maxRetries} 失败: ${error.message}`);
          
          if (i < maxRetries - 1) {
            // 等待一段时间后重试
            await new Promise(resolve => setTimeout(resolve, delay));
          }
        }
      }
      
      throw lastError;
    };
    
    return descriptor;
  };
}

console.log("示例3 - 重试机制:");
const apiService = new ApiService();
apiService.fetchDataWithRetry(true).then(result => {
  console.log("最终结果:", result);
});
