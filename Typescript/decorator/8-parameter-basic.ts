// 将整个文件包装为模块，避免全局命名冲突
export {};

/**
 * ==========================================
 * 参数装饰器 (Parameter Decorator)
 * ==========================================
 * 
 * 参数装饰器用于观察方法的参数
 * 
 * 签名：(target: any, propertyKey: string, parameterIndex: number) => void
 * - target: 对于静态成员是类的构造函数，对于实例成员是类的原型对象
 * - propertyKey: 方法的名称（注意：不是参数名）
 * - parameterIndex: 参数在函数参数列表中的索引（从0开始）
 * 
 * 注意：
 * 1. 参数装饰器的返回值会被忽略
 * 2. 参数装饰器通常用于记录元数据，配合方法装饰器使用
 * 3. 多个参数装饰器会从右到左执行（索引大的先执行）
 */

// ==========================================
// 示例 1: 基础参数装饰器 - 记录参数信息
// ==========================================
class UserService {
  register(@logParam name: string, @logParam age: number, @logParam email: string) {
    console.log(`注册用户: ${name}, ${age}岁, 邮箱: ${email}`);
    return { name, age, email };
  }
}

function logParam(target: any, propertyKey: string, parameterIndex: number) {
  // target: UserService 的原型对象
  // propertyKey: "register"
  // parameterIndex: 参数的索引位置
  console.log(`参数装饰器被调用 - 方法: ${propertyKey}, 参数索引: ${parameterIndex}`);
  
  // 参数装饰器通常用于收集元数据，而不是直接修改参数
  // 注意：装饰器从右到左执行，所以会先看到索引 2, 1, 0
}

console.log("示例1 - 基础参数装饰器:");
console.log("装饰器执行顺序（从右到左）:");
const userService = new UserService();
console.log("\n调用方法:");
userService.register("张三", 25, "zhangsan@example.com");

console.log("\n");

// ==========================================
// 示例 2: 标记必需参数
// ==========================================
class ProductService {
  createProduct(@required name: string, @required price: number, description?: string) {
    console.log(`创建产品: ${name}, 价格: ${price}, 描述: ${description || "无"}`);
    return { name, price, description };
  }
}

function required(target: any, propertyKey: string, parameterIndex: number) {
  // 在目标对象上存储必需参数的索引
  const existingRequiredParameters: number[] = Reflect.getOwnMetadata('required', target, propertyKey) || [];
  existingRequiredParameters.push(parameterIndex);
  Reflect.defineMetadata('required', existingRequiredParameters, target, propertyKey);
  
  console.log(`标记参数 ${parameterIndex} 为必需参数 (方法: ${propertyKey})`);
}

console.log("示例2 - 标记必需参数:");
const productService = new ProductService();
// 注意：这里只是标记，实际验证需要配合方法装饰器
// 参见 paramFac.ts 中的完整实现

console.log("\n");

// ==========================================
// 示例 3: 参数类型记录
// ==========================================
class Calculator {
  add(@recordType a: number, @recordType b: number) {
    return a + b;
  }

  concat(@recordType str1: string, @recordType str2: string) {
    return str1 + str2;
  }
}

function recordType(target: any, propertyKey: string, parameterIndex: number) {
  // 使用 Reflect.getMetadata 获取参数类型（需要 emitDecoratorMetadata: true）
  const paramTypes = Reflect.getMetadata('design:paramtypes', target, propertyKey);
  
  if (paramTypes) {
    console.log(`方法 ${propertyKey} 的参数 ${parameterIndex} 类型:`, paramTypes[parameterIndex].name);
  }
}

console.log("示例3 - 参数类型记录:");
const calc = new Calculator();
console.log("5 + 3 =", calc.add(5, 3));
console.log('"Hello" + " World" =', calc.concat("Hello", " World"));
