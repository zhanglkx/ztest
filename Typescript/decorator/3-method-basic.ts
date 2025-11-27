// 将整个文件包装为模块，避免全局命名冲突
export {};

/**
 * ==========================================
 * 方法装饰器 (Method Decorator)
 * ==========================================
 * 
 * 方法装饰器用于观察、修改或替换方法定义
 * 
 * 签名：(target: any, propertyKey: string, descriptor: PropertyDescriptor) => PropertyDescriptor | void
 * - target: 对于静态成员是类的构造函数，对于实例成员是类的原型对象
 * - propertyKey: 方法的名称
 * - descriptor: 方法的属性描述符，包含 value, writable, enumerable, configurable
 * 
 * PropertyDescriptor 结构：
 * {
 *   value: 方法本身,
 *   writable: 是否可写,
 *   enumerable: 是否可枚举,
 *   configurable: 是否可配置
 * }
 */

// ==========================================
// 示例 1: 基础方法装饰器 - 修改参数
// ==========================================
class Calculator {
  @AddOne
  log(x: number) {
    console.log(`计算结果: ${x}`);
    return x;
  }
}

function AddOne(target: any, key: string, descriptor: PropertyDescriptor) {
  console.log("方法装饰器被调用:");
  console.log("  target:", target); // Calculator 的原型对象
  console.log("  key:", key); // "log"
  console.log("  descriptor:", descriptor);
  
  // 保存原始方法
  const originalMethod = descriptor.value;
  
  // 替换方法实现
  descriptor.value = function (...args: any[]) {
    console.log("方法被调用，参数被 +1");
    // 修改参数后调用原始方法
    return originalMethod.call(this, args[0] + 1);
  };
  
  return descriptor;
}

console.log("示例1 - 修改参数:");
const calculator = new Calculator();
calculator.log(1); // 参数 1 会被加 1，实际输出 2

console.log("\n");

// ==========================================
// 示例 2: 性能监控装饰器
// ==========================================
class Service {
  @Performance
  complexCalculation(n: number) {
    // 模拟复杂计算
    let result = 0;
    for (let i = 0; i < n; i++) {
      result += Math.sqrt(i);
    }
    return result;
  }
}

function Performance(target: any, key: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  
  descriptor.value = function (...args: any[]) {
    const start = performance.now();
    const result = originalMethod.apply(this, args);
    const end = performance.now();
    console.log(`方法 ${key} 执行耗时: ${(end - start).toFixed(2)}ms`);
    return result;
  };
  
  return descriptor;
}

console.log("示例2 - 性能监控:");
const service = new Service();
service.complexCalculation(1000000);

console.log("\n");

// ==========================================
// 示例 3: 错误处理装饰器
// ==========================================
class DataService {
  @ErrorHandler
  fetchData(shouldFail: boolean) {
    if (shouldFail) {
      throw new Error("数据获取失败！");
    }
    return { data: "成功获取数据" };
  }
}

function ErrorHandler(target: any, key: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  
  descriptor.value = function (...args: any[]) {
    try {
      return originalMethod.apply(this, args);
    } catch (error) {
      console.error(`方法 ${key} 执行出错:`, error.message);
      // 返回默认值或重新抛出
      return { error: error.message };
    }
  };
  
  return descriptor;
}

console.log("示例3 - 错误处理:");
const dataService = new DataService();
console.log(dataService.fetchData(false));
console.log(dataService.fetchData(true));
