// 将整个文件包装为模块，避免全局命名冲突
export {};

/**
 * ==========================================
 * 装饰器执行顺序 (Decorator Execution Order)
 * ==========================================
 * 
 * 装饰器的执行顺序遵循以下规则：
 * 
 * 1. 实例成员的装饰器（按照出现顺序）：
 *    - 参数装饰器，然后是方法、访问器或属性装饰器
 * 
 * 2. 静态成员的装饰器（按照出现顺序）：
 *    - 参数装饰器，然后是方法、访问器或属性装饰器
 * 
 * 3. 构造函数的参数装饰器
 * 
 * 4. 类装饰器
 * 
 * 同一目标上的多个装饰器：
 * - 求值顺序：从上到下
 * - 调用顺序：从下到上（类似洋葱模型）
 */

console.log("==========================================");
console.log("装饰器执行顺序演示");
console.log("==========================================\n");

// ==========================================
// 示例 1: 单个类的完整装饰器执行顺序
// ==========================================
console.log("【示例 1】单个类的完整装饰器执行顺序:\n");

@ClassDecorator
class Demo {
  // 实例属性装饰器
  @PropertyDecorator
  instanceProperty: string = "实例属性";

  // 静态属性装饰器
  @PropertyDecorator
  static staticProperty: string = "静态属性";

  // 构造函数参数装饰器
  constructor(@ParameterDecorator message: string) {
    console.log(`  [构造函数执行] message: ${message}\n`);
  }

  // 实例方法装饰器 + 参数装饰器
  @MethodDecorator
  instanceMethod(@ParameterDecorator param: string) {
    console.log(`  [实例方法执行] param: ${param}`);
  }

  // 静态方法装饰器 + 参数装饰器
  @MethodDecorator
  static staticMethod(@ParameterDecorator param: string) {
    console.log(`  [静态方法执行] param: ${param}`);
  }

  // 访问器装饰器
  private _value: number = 0;

  @AccessorDecorator
  get value(): number {
    return this._value;
  }

  set value(val: number) {
    this._value = val;
  }
}

function PropertyDecorator(target: any, propertyKey: string) {
  console.log(`3️⃣  属性装饰器: ${propertyKey}`);
}

function MethodDecorator(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  console.log(`5️⃣  方法装饰器: ${propertyKey}`);
}

function AccessorDecorator(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  console.log(`4️⃣  访问器装饰器: ${propertyKey}`);
}

function ParameterDecorator(target: any, propertyKey: string | symbol, parameterIndex: number) {
  console.log(`2️⃣  参数装饰器: ${String(propertyKey)}, 参数索引: ${parameterIndex}`);
}

function ClassDecorator(constructor: Function) {
  console.log(`6️⃣  类装饰器: ${constructor.name}\n`);
}

console.log("创建实例:");
const demo = new Demo("Hello");

console.log("\n");

// ==========================================
// 示例 2: 多个装饰器的执行顺序（洋葱模型）
// ==========================================
console.log("【示例 2】多个装饰器的执行顺序（洋葱模型）:\n");

class MultiDecorator {
  @First
  @Second
  @Third
  method() {
    console.log("    ▶️  原始方法执行");
  }
}

function First(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  console.log("1️⃣  First 装饰器求值（定义时）");
  const originalMethod = descriptor.value;
  descriptor.value = function (...args: any[]) {
    console.log("  🟢 First 装饰器 - 进入");
    const result = originalMethod.apply(this, args);
    console.log("  🟢 First 装饰器 - 退出");
    return result;
  };
  return descriptor;
}

function Second(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  console.log("2️⃣  Second 装饰器求值（定义时）");
  const originalMethod = descriptor.value;
  descriptor.value = function (...args: any[]) {
    console.log("  🟡 Second 装饰器 - 进入");
    const result = originalMethod.apply(this, args);
    console.log("  🟡 Second 装饰器 - 退出");
    return result;
  };
  return descriptor;
}

function Third(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  console.log("3️⃣  Third 装饰器求值（定义时）\n");
  const originalMethod = descriptor.value;
  descriptor.value = function (...args: any[]) {
    console.log("  🔵 Third 装饰器 - 进入");
    const result = originalMethod.apply(this, args);
    console.log("  🔵 Third 装饰器 - 退出");
    return result;
  };
  return descriptor;
}

console.log("调用方法:");
const multi = new MultiDecorator();
multi.method();

console.log("\n解释:");
console.log("- 求值顺序：从上到下（First → Second → Third）");
console.log("- 调用顺序：从下到上（Third → Second → First）");
console.log("- 类似洋葱模型：最外层装饰器最先进入，最后退出\n");

console.log("\n");

// ==========================================
// 示例 3: 装饰器工厂的执行顺序
// ==========================================
console.log("【示例 3】装饰器工厂的执行顺序:\n");

class FactoryDemo {
  @FactoryA("A 参数")
  @FactoryB("B 参数")
  method() {
    console.log("    ▶️  方法执行");
  }
}

function FactoryA(config: string) {
  console.log(`1️⃣  FactoryA 工厂函数执行，参数: ${config}`);
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log(`3️⃣  FactoryA 装饰器执行`);
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
      console.log(`  🟢 FactoryA 包装 - 配置: ${config}`);
      return originalMethod.apply(this, args);
    };
    return descriptor;
  };
}

function FactoryB(config: string) {
  console.log(`2️⃣  FactoryB 工厂函数执行，参数: ${config}`);
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log(`4️⃣  FactoryB 装饰器执行\n`);
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
      console.log(`  🟡 FactoryB 包装 - 配置: ${config}`);
      return originalMethod.apply(this, args);
    };
    return descriptor;
  };
}

console.log("调用方法:");
const factory = new FactoryDemo();
factory.method();

console.log("\n解释:");
console.log("- 工厂函数从上到下执行（FactoryA → FactoryB）");
console.log("- 返回的装饰器从下到上执行（FactoryB → FactoryA）\n");

console.log("\n");

// ==========================================
// 示例 4: 完整的装饰器顺序追踪
// ==========================================
console.log("【示例 4】完整的装饰器顺序追踪:\n");

let orderCounter = 1;

@TrackClass("MyClass")
class OrderTracking {
  @TrackProperty("prop1")
  prop1: string = "属性1";

  @TrackProperty("prop2")
  static prop2: string = "静态属性";

  constructor(@TrackParam message: string) {
    console.log(`  [构造函数] ${message}`);
  }

  @TrackMethod("method1")
  method1(@TrackParam p1: string, @TrackParam p2: number) {
    return `${p1}-${p2}`;
  }

  @TrackMethod("method2")
  static staticMethod(@TrackParam p: string) {
    return p;
  }
}

function TrackClass(name: string) {
  return function (constructor: Function) {
    console.log(`${orderCounter++}. 类装饰器: ${name}\n`);
  };
}

function TrackMethod(name: string) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log(`${orderCounter++}. 方法装饰器: ${name}`);
  };
}

function TrackProperty(name: string) {
  return function (target: any, propertyKey: string) {
    console.log(`${orderCounter++}. 属性装饰器: ${name}`);
  };
}

function TrackParam(target: any, propertyKey: string | symbol, parameterIndex: number) {
  console.log(`${orderCounter++}. 参数装饰器: ${String(propertyKey)}[${parameterIndex}]`);
}

console.log("\n");

// ==========================================
// 总结
// ==========================================
console.log("==========================================");
console.log("📚 装饰器执行顺序总结:");
console.log("==========================================");
console.log("1. 实例成员:");
console.log("   - 参数装饰器（从右到左）");
console.log("   - 方法/访问器/属性装饰器（按出现顺序）");
console.log("");
console.log("2. 静态成员:");
console.log("   - 参数装饰器（从右到左）");
console.log("   - 方法/访问器/属性装饰器（按出现顺序）");
console.log("");
console.log("3. 构造函数:");
console.log("   - 参数装饰器（从右到左）");
console.log("");
console.log("4. 类装饰器");
console.log("");
console.log("5. 同一目标的多个装饰器:");
console.log("   - 求值：从上到下");
console.log("   - 调用：从下到上（洋葱模型）");
console.log("==========================================");
