// 将整个文件包装为模块，避免全局命名冲突
export {};

/**
 * ==========================================
 * 访问器装饰器 (Accessor Decorator)
 * ==========================================
 * 
 * 访问器装饰器应用于访问器（getter/setter）的属性描述符
 * 
 * 签名：(target: any, propertyKey: string, descriptor: PropertyDescriptor) => PropertyDescriptor | void
 * - target: 对于静态成员是类的构造函数，对于实例成员是类的原型对象
 * - propertyKey: 访问器的名称
 * - descriptor: 访问器的属性描述符
 * 
 * 注意：
 * 1. TypeScript 不允许同时装饰一个成员的 get 和 set 访问器
 * 2. 必须将装饰器应用到最先出现的访问器上
 * 3. 访问器装饰器的 descriptor 包含 get 和/或 set 方法
 */

// ==========================================
// 示例 1: 基础访问器装饰器 - 日志记录
// ==========================================
class Person {
  private _age: number = 0;

  @LogAccess
  get age(): number {
    return this._age;
  }

  set age(value: number) {
    this._age = value;
  }
}

function LogAccess(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalGetter = descriptor.get;
  const originalSetter = descriptor.set;

  console.log(`访问器装饰器被调用 - 属性: ${propertyKey}`);

  // 包装 getter
  if (originalGetter) {
    descriptor.get = function () {
      console.log(`📖 读取属性 ${propertyKey}`);
      const result = originalGetter.call(this);
      console.log(`   返回值: ${result}`);
      return result;
    };
  }

  // 包装 setter
  if (originalSetter) {
    descriptor.set = function (value: any) {
      console.log(`✏️  设置属性 ${propertyKey} = ${value}`);
      originalSetter.call(this, value);
    };
  }

  return descriptor;
}

console.log("示例1 - 访问器日志:\n");
const person = new Person();
person.age = 25;
console.log("当前年龄:", person.age);
person.age = 26;
console.log("当前年龄:", person.age);

console.log("\n");

// ==========================================
// 示例 2: 访问控制装饰器
// ==========================================
let currentUser = { role: "admin" };

class Document {
  private _content: string = "机密文档内容";

  @RequireAdmin
  get content(): string {
    return this._content;
  }

  set content(value: string) {
    this._content = value;
  }
}

function RequireAdmin(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalGetter = descriptor.get;

  if (originalGetter) {
    descriptor.get = function () {
      if (currentUser.role !== "admin") {
        throw new Error("❌ 权限不足：需要管理员权限");
      }
      console.log("✅ 权限验证通过");
      return originalGetter.call(this);
    };
  }

  return descriptor;
}

console.log("示例2 - 访问控制:\n");
const doc = new Document();

console.log("管理员访问:");
try {
  console.log(doc.content);
} catch (error) {
  console.log(error.message);
}

console.log("\n普通用户访问:");
currentUser = { role: "user" };
try {
  console.log(doc.content);
} catch (error) {
  console.log(error.message);
}

console.log("\n");

// ==========================================
// 示例 3: 值转换装饰器
// ==========================================
class Temperature {
  private _celsius: number = 0;

  @RoundToTwo
  get celsius(): number {
    return this._celsius;
  }

  set celsius(value: number) {
    this._celsius = value;
  }

  @RoundToTwo
  get fahrenheit(): number {
    return (this._celsius * 9) / 5 + 32;
  }

  set fahrenheit(value: number) {
    this._celsius = ((value - 32) * 5) / 9;
  }
}

function RoundToTwo(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalGetter = descriptor.get;

  if (originalGetter) {
    descriptor.get = function () {
      const result = originalGetter.call(this);
      return Math.round(result * 100) / 100;
    };
  }

  return descriptor;
}

console.log("示例3 - 值转换:\n");
const temp = new Temperature();
temp.celsius = 25.6789;
console.log(`摄氏度: ${temp.celsius}°C`);
console.log(`华氏度: ${temp.fahrenheit}°F`);

console.log("\n");

// ==========================================
// 示例 4: 缓存装饰器
// ==========================================
class ExpensiveCalculation {
  private _input: number = 0;

  set input(value: number) {
    this._input = value;
  }

  @Memoize
  get result(): number {
    console.log("🔄 执行复杂计算...");
    // 模拟复杂计算
    let sum = 0;
    for (let i = 0; i < this._input; i++) {
      sum += Math.sqrt(i);
    }
    return sum;
  }
}

function Memoize(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalGetter = descriptor.get;
  let cachedValue: any;
  let isCached = false;

  if (originalGetter) {
    descriptor.get = function () {
      if (!isCached) {
        console.log("💾 计算并缓存结果");
        cachedValue = originalGetter.call(this);
        isCached = true;
      } else {
        console.log("⚡ 使用缓存结果");
      }
      return cachedValue;
    };
  }

  return descriptor;
}

console.log("示例4 - 缓存:\n");
const calc = new ExpensiveCalculation();
calc.input = 1000000;

console.log("第一次访问:");
console.log("结果:", calc.result);

console.log("\n第二次访问:");
console.log("结果:", calc.result);

console.log("\n第三次访问:");
console.log("结果:", calc.result);

console.log("\n");

// ==========================================
// 示例 5: 值验证装饰器
// ==========================================
class BankAccount {
  private _balance: number = 0;

  get balance(): number {
    return this._balance;
  }

  @ValidatePositive
  set balance(value: number) {
    this._balance = value;
  }
}

function ValidatePositive(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalSetter = descriptor.set;

  if (originalSetter) {
    descriptor.set = function (value: any) {
      if (typeof value !== 'number' || value < 0) {
        throw new Error(`❌ ${propertyKey} 必须是非负数，当前值: ${value}`);
      }
      console.log(`✅ 验证通过，设置 ${propertyKey} = ${value}`);
      originalSetter.call(this, value);
    };
  }

  return descriptor;
}

console.log("示例5 - 值验证:\n");
const account = new BankAccount();

console.log("设置有效值:");
try {
  account.balance = 1000;
  console.log("余额:", account.balance);
} catch (error) {
  console.log(error.message);
}

console.log("\n设置无效值:");
try {
  account.balance = -500;
} catch (error) {
  console.log(error.message);
}
