// 将整个文件包装为模块，避免全局命名冲突
export {};

/**
 * ==========================================
 * 类装饰器工厂 (Class Decorator Factory)
 * ==========================================
 * 
 * 类装饰器工厂是一个返回类装饰器的函数，可以接受参数来配置装饰器的行为
 * 
 * 签名：(参数) => (constructor: Function) => Function | void
 */

// ==========================================
// 示例 1: 基础类装饰器 - 修改类的原型
// ==========================================
@Init
class Index {
  public age = 12;
}

function Init<T extends { new (...args: any[]): {} }>(constructor: T) {
  // 类装饰器接收类的构造函数作为参数
  console.log("🚀日志=====", constructor.prototype instanceof Object);
  console.log("Constructor:", constructor);

  // 返回一个继承自原类的新类，添加新的属性
  return class extends constructor {
    name = 21;
  };
}

console.log("示例1 - 基础类装饰器:");
console.log(new Index());
// 输出: class_1 { age: 12, name: 21 }

console.log("\n");

// ==========================================
// 示例 2: 类装饰器工厂 - 注入属性
// ==========================================
@InjectSex("男")
class Person {
  name = "张三";
}

// 类装饰器工厂：返回一个类装饰器
function InjectSex(sex: "男" | "女") {
  return function <T extends { new (...args: any): {} }>(target: T) {
    // 在类的原型上添加 sex 属性
    target.prototype.sex = sex;
    return target;
  };
}

console.log("示例2 - 类装饰器工厂:");
const person = new Person();
console.log(person);
console.log("性别:", Reflect.getPrototypeOf(person));
// 输出: { sex: '男' }

console.log("\n");

// ==========================================
// 示例 3: 密封类装饰器 - 防止扩展
// ==========================================
@Sealed
class SealedClass {
  value = 100;
}

function Sealed<T extends { new (...args: any[]): {} }>(constructor: T) {
  // 密封构造函数和原型，防止添加新属性
  Object.seal(constructor);
  Object.seal(constructor.prototype);
  return constructor;
}

console.log("示例3 - 密封类:");
const sealed = new SealedClass();
console.log(sealed);
// 尝试添加新属性将失败（严格模式下会报错）

console.log("\n");

// ==========================================
// 示例 4: 添加时间戳
// ==========================================
@Timestamped
class Task {
  name = "重要任务";
}

function Timestamped<T extends { new (...args: any[]): {} }>(constructor: T) {
  return class extends constructor {
    createdAt = new Date();
    updatedAt = new Date();
  };
}

console.log("示例4 - 添加时间戳:");
const task = new Task();
console.log(task);
// 输出: class_1 { name: '重要任务', createdAt: 2024-..., updatedAt: 2024-... }
