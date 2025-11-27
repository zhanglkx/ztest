// 将整个文件包装为模块，避免全局命名冲突
export {};

/**
 * ==========================================
 * 访问器装饰器工厂 (Accessor Decorator Factory)
 * ==========================================
 * 
 * 访问器装饰器工厂是一个返回访问器装饰器的函数，可以接受参数来配置装饰器的行为
 * 
 * 签名：(参数) => (target: any, propertyKey: string, descriptor: PropertyDescriptor) => PropertyDescriptor | void
 */

// ==========================================
// 示例 1: 范围验证装饰器工厂
// ==========================================
class Student {
  private _score: number = 0;

  get score(): number {
    return this._score;
  }

  @Range(0, 100)
  set score(value: number) {
    this._score = value;
  }

  private _age: number = 0;

  get age(): number {
    return this._age;
  }

  @Range(1, 150)
  set age(value: number) {
    this._age = value;
  }
}

function Range(min: number, max: number) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalSetter = descriptor.set;

    if (originalSetter) {
      descriptor.set = function (value: number) {
        if (value < min || value > max) {
          throw new Error(
            `❌ ${propertyKey} 必须在 ${min} 到 ${max} 之间，当前值: ${value}`
          );
        }
        console.log(`✅ ${propertyKey} 验证通过: ${value}`);
        originalSetter.call(this, value);
      };
    }

    return descriptor;
  };
}

console.log("示例1 - 范围验证:\n");
const student = new Student();

console.log("设置有效分数:");
try {
  student.score = 85;
  console.log("分数:", student.score);
} catch (error) {
  console.log(error.message);
}

console.log("\n设置无效分数:");
try {
  student.score = 150;
} catch (error) {
  console.log(error.message);
}

console.log("\n设置有效年龄:");
try {
  student.age = 20;
  console.log("年龄:", student.age);
} catch (error) {
  console.log(error.message);
}

console.log("\n");

// ==========================================
// 示例 2: 格式化装饰器工厂
// ==========================================
class UserProfile {
  private _phone: string = "";

  @Format(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3")
  get phone(): string {
    return this._phone;
  }

  set phone(value: string) {
    this._phone = value;
  }

  private _idCard: string = "";

  @Format(/(\d{6})(\d{8})(\d{4})/, "$1-$2-$3")
  get idCard(): string {
    return this._idCard;
  }

  set idCard(value: string) {
    this._idCard = value;
  }
}

function Format(pattern: RegExp, replacement: string) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalGetter = descriptor.get;

    if (originalGetter) {
      descriptor.get = function () {
        const value = originalGetter.call(this);
        if (typeof value === 'string' && pattern.test(value)) {
          return value.replace(pattern, replacement);
        }
        return value;
      };
    }

    return descriptor;
  };
}

console.log("示例2 - 格式化:\n");
const profile = new UserProfile();
profile.phone = "13812345678";
profile.idCard = "110101199001011234";

console.log("手机号:", profile.phone);
console.log("身份证:", profile.idCard);

console.log("\n");

// ==========================================
// 示例 3: 延迟加载装饰器工厂
// ==========================================
class DataService {
  @Lazy(() => {
    console.log("🔄 加载用户数据...");
    return { id: 1, name: "张三", email: "zhangsan@example.com" };
  })
  get userData(): any {
    return null; // 初始值，会被装饰器替换
  }

  @Lazy(() => {
    console.log("🔄 加载配置数据...");
    return { theme: "dark", language: "zh-CN" };
  })
  get config(): any {
    return null;
  }
}

function Lazy(initializer: () => any) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    let value: any;
    let initialized = false;

    descriptor.get = function () {
      if (!initialized) {
        console.log(`💾 首次访问 ${propertyKey}，执行初始化`);
        value = initializer();
        initialized = true;
      } else {
        console.log(`⚡ 使用已缓存的 ${propertyKey}`);
      }
      return value;
    };

    return descriptor;
  };
}

console.log("示例3 - 延迟加载:\n");
const dataService = new DataService();

console.log("第一次访问 userData:");
console.log(dataService.userData);

console.log("\n第二次访问 userData:");
console.log(dataService.userData);

console.log("\n第一次访问 config:");
console.log(dataService.config);

console.log("\n");

// ==========================================
// 示例 4: 访问频率限制装饰器工厂
// ==========================================
class RateLimitedService {
  @Throttle(2000) // 2秒内只能访问一次
  get expensiveData(): string {
    console.log("📡 获取昂贵数据...");
    return "重要数据";
  }
}

function Throttle(delay: number) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalGetter = descriptor.get;
    let lastCallTime = 0;
    let cachedValue: any;

    if (originalGetter) {
      descriptor.get = function () {
        const now = Date.now();
        
        if (now - lastCallTime < delay) {
          console.log(`⏰ 距离上次调用不足 ${delay}ms，返回缓存值`);
          return cachedValue;
        }

        console.log("✅ 可以调用，执行方法");
        lastCallTime = now;
        cachedValue = originalGetter.call(this);
        return cachedValue;
      };
    }

    return descriptor;
  };
}

console.log("示例4 - 访问频率限制:\n");
const rateLimited = new RateLimitedService();

console.log("第1次访问:");
console.log(rateLimited.expensiveData);

console.log("\n立即第2次访问:");
console.log(rateLimited.expensiveData);

setTimeout(() => {
  console.log("\n2秒后第3次访问:");
  console.log(rateLimited.expensiveData);
}, 2100);

console.log("\n");

// ==========================================
// 示例 5: 类型转换装饰器工厂
// ==========================================
class FormData {
  private _count: any = "0";
  private _price: any = "99.99";
  private _active: any = "true";

  @ConvertType("number")
  get count(): number {
    return this._count;
  }

  set count(value: any) {
    this._count = value;
  }

  @ConvertType("number")
  get price(): number {
    return this._price;
  }

  set price(value: any) {
    this._price = value;
  }

  @ConvertType("boolean")
  get active(): boolean {
    return this._active;
  }

  set active(value: any) {
    this._active = value;
  }
}

function ConvertType(type: "number" | "boolean" | "string") {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalGetter = descriptor.get;

    if (originalGetter) {
      descriptor.get = function () {
        const value = originalGetter.call(this);

        switch (type) {
          case "number":
            return Number(value);
          case "boolean":
            return value === "true" || value === true;
          case "string":
            return String(value);
          default:
            return value;
        }
      };
    }

    return descriptor;
  };
}

console.log("示例5 - 类型转换:\n");
const form = new FormData();
console.log("count:", form.count, typeof form.count);
console.log("price:", form.price, typeof form.price);
console.log("active:", form.active, typeof form.active);

console.log("\n设置新值:");
form.count = "42";
form.price = "199.99";
form.active = "false";
console.log("count:", form.count, typeof form.count);
console.log("price:", form.price, typeof form.price);
console.log("active:", form.active, typeof form.active);
