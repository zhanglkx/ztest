// 将整个文件包装为模块，避免全局命名冲突
export {};

/**
 * ==========================================
 * 属性装饰器工厂 (Property Decorator Factory)
 * ==========================================
 * 
 * 属性装饰器用于观察、修改或替换属性定义
 * 
 * 签名：(target: any, propertyKey: string) => void
 * - target: 对于静态成员是类的构造函数，对于实例成员是类的原型对象
 * - propertyKey: 属性的名称
 * 
 * 注意：属性装饰器不能直接修改属性值，但可以在原型上设置默认值
 */

// ==========================================
// 示例 1: 属性装饰器工厂 - 设置默认值
// ==========================================
class Person {
  @init(16)
  age: number;

  @init("张三")
  name: string;
}

function init(defaultValue: any): any {
  return function (target: any, key: string | symbol) {
    // target: 类的原型对象
    // key: 属性名
    console.log(`属性装饰器被调用 - 属性: ${String(key)}, 默认值: ${defaultValue}`);
    
    // 在原型上设置默认值
    target[key] = defaultValue;
  };
}

console.log("示例1 - 设置默认值:");
const person = new Person();
console.log(`姓名: ${person.name}, 年龄: ${person.age}`);
// 输出: 姓名: 张三, 年龄: 16

console.log("\n");

// ==========================================
// 示例 2: 只读属性装饰器
// ==========================================
class Product {
  @readonly
  id: number = 12345;

  @readonly
  type: string = "电子产品";
}

function readonly(target: any, key: string | symbol): any {
  // 使用 Object.defineProperty 定义只读属性
  const keyStr = String(key);
  const privateKey = `_${keyStr}`;
  
  Object.defineProperty(target, key, {
    get() {
      return this[privateKey];
    },
    set(value: any) {
      // 如果已经有值了，抛出错误
      if (this[privateKey] !== undefined) {
        throw new Error(`属性 ${keyStr} 是只读的，不能修改！`);
      }
      this[privateKey] = value;
    },
    enumerable: true,
    configurable: true
  });
}

console.log("示例2 - 只读属性:");
const product = new Product();
console.log(product);
try {
  product.id = 99999; // 尝试修改只读属性
} catch (error) {
  console.log(error.message);
}

console.log("\n");

// ==========================================
// 示例 3: 属性格式化装饰器
// ==========================================
class User {
  @uppercase
  username: string = "john_doe";

  @lowercase
  email: string = "JOHN@EXAMPLE.COM";
}

function uppercase(target: any, key: string | symbol): any {
  const keyStr = String(key);
  const privateKey = `_${keyStr}`;
  
  Object.defineProperty(target, key, {
    get() {
      return this[privateKey];
    },
    set(value: string) {
      this[privateKey] = value?.toUpperCase();
    },
    enumerable: true,
    configurable: true
  });
}

function lowercase(target: any, key: string | symbol): any {
  const keyStr = String(key);
  const privateKey = `_${keyStr}`;
  
  Object.defineProperty(target, key, {
    get() {
      return this[privateKey];
    },
    set(value: string) {
      this[privateKey] = value?.toLowerCase();
    },
    enumerable: true,
    configurable: true
  });
}

console.log("示例3 - 属性格式化:");
const user = new User();
console.log(`用户名: ${user.username}, 邮箱: ${user.email}`);
// 输出: 用户名: JOHN_DOE, 邮箱: john@example.com
