// 将整个文件包装为模块，避免全局命名冲突
export { };

/**
 * ==========================================
 * 纯类装饰器 (Class Decorator)
 * ==========================================
 * 
 * 类装饰器应用于类的构造函数，可以用来观察、修改或替换类的定义
 * 
 * 签名：(constructor: Function) => Function | void
 * - constructor: 类的构造函数
 * - 返回值：可以返回一个新的构造函数来替换原来的类，或者不返回（返回 void）
 * 
 * 类装饰器在类定义时执行，而不是在实例化时执行
 */

// ==========================================
// 示例 1: 基础类装饰器 - 添加静态属性
// ==========================================
@AddTimestamp
class Article {
  title: string;
  content: string;

  constructor(title: string, content: string) {
    this.title = title;
    this.content = content;
  }
}

function AddTimestamp(constructor: Function) {
  // 在构造函数上添加静态属性
  constructor.prototype.createdAt = new Date();
  constructor.prototype.version = "1.0.0";

  console.log(`类 ${constructor.name} 被装饰，添加了时间戳和版本信息`);
}

console.log("示例1 - 添加静态属性:");
const article = new Article("TypeScript 装饰器", "装饰器详解...");
console.log(article);
console.log("创建时间:", (article as any).createdAt);
console.log("版本:", (article as any).version);

console.log("\n");

// ==========================================
// 示例 2: 替换构造函数 - 添加属性
// ==========================================
@AddId
class User {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  sayHello() {
    console.log(`你好，我是 ${this.name}`);
  }
}

function AddId<T extends { new(...args: any[]): {} }>(constructor: T) {
  // 返回一个新的类，继承原类并添加新属性
  return class extends constructor {
    id = Math.random().toString(36).substr(2, 9);
    createdAt = new Date();
  };
}

console.log("示例2 - 替换构造函数:");
const user1 = new User("张三");
const user2 = new User("李四");
console.log(user1);
console.log(user2);
user1.sayHello();

console.log("\n");

// ==========================================
// 示例 3: 密封类 - 防止修改
// ==========================================
@Sealed
class Config {
  apiUrl = "https://api.example.com";
  timeout = 5000;
}

function Sealed(constructor: Function) {
  // 密封构造函数和原型，防止添加或删除属性
  Object.seal(constructor);
  Object.seal(constructor.prototype);

  console.log(`类 ${constructor.name} 已被密封`);
}

console.log("示例3 - 密封类:");
const config = new Config();
console.log(config);

// 尝试在原型上添加新属性（严格模式下会报错）
try {
  (Config.prototype as any).newProperty = "这不会生效";
  console.log("新属性:", (Config.prototype as any).newProperty);
} catch (error) {
  console.log("无法添加新属性:", error.message);
}

console.log("\n");

// ==========================================
// 示例 4: 冻结类 - 完全只读
// ==========================================
@Frozen
class Constants {
  PI = 3.14159;
  E = 2.71828;
}

function Frozen(constructor: Function) {
  // 冻结构造函数和原型，完全只读
  Object.freeze(constructor);
  Object.freeze(constructor.prototype);

  console.log(`类 ${constructor.name} 已被冻结`);
}

console.log("示例4 - 冻结类:");
const constants = new Constants();
console.log(constants);

console.log("\n");

// ==========================================
// 示例 5: 单例模式
// ==========================================
@Singleton
class Database {
  private connections: number = 0;

  connect() {
    this.connections++;
    console.log(`数据库连接已建立，当前连接数: ${this.connections}`);
  }

  getConnectionCount() {
    return this.connections;
  }
}

function Singleton<T extends { new(...args: any[]): {} }>(constructor: T) {
  let instance: any;

  // 返回一个新的构造函数，实现单例模式
  return class extends constructor {
    constructor(...args: any[]) {
      if (instance) {
        return instance;
      }
      super(...args);
      instance = this;
    }
  } as T;
}

console.log("示例5 - 单例模式:");
const db1 = new Database();
const db2 = new Database();
const db3 = new Database();

db1.connect();
db2.connect();
db3.connect();

console.log("db1 === db2:", db1 === db2);
console.log("db2 === db3:", db2 === db3);
console.log("总连接数:", db1.getConnectionCount());

console.log("\n");

// ==========================================
// 示例 6: 日志记录类的实例化
// ==========================================
@LogInstantiation
class Product {
  constructor(public name: string, public price: number) { }
}

function LogInstantiation<T extends { new(...args: any[]): {} }>(constructor: T) {
  return class extends constructor {
    constructor(...args: any[]) {
      console.log(`🏗️  正在创建 ${constructor.name} 的实例，参数:`, args);
      super(...args);
      console.log(`✅ ${constructor.name} 实例创建完成`);
    }
  } as T;
}

console.log("示例6 - 日志记录实例化:");
const product = new Product("笔记本电脑", 5999);
console.log(product);

console.log("\n");

// ==========================================
// 示例 7: 自动绑定方法
// ==========================================
@AutoBind
class Button {
  label = "点击我";

  handleClick() {
    console.log(`按钮"${this.label}"被点击了`);
  }
}

function AutoBind(constructor: Function) {
  const prototype = constructor.prototype;
  const propertyNames = Object.getOwnPropertyNames(prototype);

  propertyNames.forEach((name) => {
    const descriptor = Object.getOwnPropertyDescriptor(prototype, name);

    if (!descriptor || name === 'constructor') {
      return;
    }

    if (typeof descriptor.value === 'function') {
      const originalMethod = descriptor.value;

      Object.defineProperty(prototype, name, {
        configurable: true,
        get() {
          // 自动绑定 this
          return originalMethod.bind(this);
        }
      });
    }
  });
}

console.log("示例7 - 自动绑定方法:");
const button = new Button();
const clickHandler = button.handleClick;
// 即使方法被解构，this 仍然指向正确的实例
clickHandler();
