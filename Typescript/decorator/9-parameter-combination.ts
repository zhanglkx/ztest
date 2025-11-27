// 将整个文件包装为模块，避免全局命名冲突
export {};

/**
 * ==========================================
 * 参数装饰器与方法装饰器组合使用
 * ==========================================
 * 
 * 参数装饰器通常单独使用意义不大，需要配合方法装饰器来实现完整的功能
 * 
 * 工作流程：
 * 1. 参数装饰器收集元数据（如：哪些参数是必需的）
 * 2. 方法装饰器读取元数据并执行验证逻辑
 * 3. 方法被调用时，验证逻辑会先执行
 */

// ==========================================
// 示例 1: 必需参数验证（完整实现）
// ==========================================
class UserController {
  @Validate
  createUser(@require name?: string, @require age?: number, email?: string) {
    console.log(`✅ 用户创建成功: ${name}, ${age}岁, 邮箱: ${email || "未提供"}`);
    return { name, age, email };
  }

  @Validate
  updateUser(id: number, @require name?: string) {
    console.log(`✅ 更新用户 ${id}: ${name}`);
    return { id, name };
  }
}

// 参数装饰器：标记必需参数
function require(target: any, propertyKey: string, parameterIndex: number) {
  // 在方法上存储必需参数的索引数组
  const requiredParams: number[] = target[propertyKey]?.required || [];
  requiredParams.push(parameterIndex);
  
  // 将元数据附加到方法上
  if (!target[propertyKey]) {
    target[propertyKey] = function () {};
  }
  target[propertyKey].required = requiredParams;
  
  console.log(`🏷️  标记方法 ${propertyKey} 的参数 ${parameterIndex} 为必需`);
}

// 方法装饰器：执行参数验证
function Validate(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  
  // 从原型上获取必需参数的索引
  const requiredParams: number[] = target[propertyKey]?.required || [];
  
  console.log(`🔍 方法 ${propertyKey} 的必需参数索引:`, requiredParams);
  
  descriptor.value = function (...args: any[]) {
    // 验证必需参数
    requiredParams.forEach((index) => {
      if (args[index] === undefined || args[index] === null || args[index] === '') {
        throw new Error(`❌ 参数 ${index} 是必需的，但未提供！`);
      }
    });
    
    // 验证通过，调用原始方法
    return originalMethod.apply(this, args);
  };
  
  return descriptor;
}

console.log("示例1 - 必需参数验证:\n");

const controller = new UserController();

console.log("\n测试1 - 提供所有必需参数:");
try {
  controller.createUser("张三", 25, "zhangsan@example.com");
} catch (error) {
  console.log(error.message);
}

console.log("\n测试2 - 缺少必需参数:");
try {
  controller.createUser("李四"); // 缺少 age 参数
} catch (error) {
  console.log(error.message);
}

console.log("\n测试3 - 所有参数都缺少:");
try {
  controller.createUser(); // 缺少 name 和 age
} catch (error) {
  console.log(error.message);
}

console.log("\n");

// ==========================================
// 示例 2: 参数类型验证
// ==========================================
class MathService {
  @ValidateTypes
  divide(@expectType("number") a: any, @expectType("number") b: any) {
    return a / b;
  }
}

function expectType(expectedType: string) {
  return function (target: any, propertyKey: string, parameterIndex: number) {
    const typeMetadata = target[propertyKey]?.types || [];
    typeMetadata[parameterIndex] = expectedType;
    
    if (!target[propertyKey]) {
      target[propertyKey] = function () {};
    }
    target[propertyKey].types = typeMetadata;
  };
}

function ValidateTypes(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const expectedTypes = target[propertyKey]?.types || [];
  
  descriptor.value = function (...args: any[]) {
    expectedTypes.forEach((expectedType: string, index: number) => {
      const actualType = typeof args[index];
      if (actualType !== expectedType) {
        throw new Error(
          `❌ 参数 ${index} 类型错误: 期望 ${expectedType}，实际 ${actualType}`
        );
      }
    });
    
    return originalMethod.apply(this, args);
  };
  
  return descriptor;
}

console.log("示例2 - 参数类型验证:\n");

const mathService = new MathService();

console.log("测试1 - 正确类型:");
try {
  console.log("10 / 2 =", mathService.divide(10, 2));
} catch (error) {
  console.log(error.message);
}

console.log("\n测试2 - 错误类型:");
try {
  console.log(mathService.divide("10", "2"));
} catch (error) {
  console.log(error.message);
}
