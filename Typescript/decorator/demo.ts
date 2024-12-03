/**
 * @Init
class Index {
  public age = 12;
}

function Init<T extends { new (...args: any[]): {} }>(constructor: T) {
  // 使用 Function.prototype 来检查是否是构造函数
  console.log("🚀日志=====", constructor.prototype instanceof Object);
  // 或者直接打印构造函数
  console.log("Constructor:", constructor);

  return class extends constructor {
    name = 21;
  };
}
 */

// console.log(new Index());

// class_1 { age: 21 }

// function Init<T extends new (...args: any[]) => {}>(constructor: T): {
//  new (...args: any[]): (Anonymous class);
//  prototype: Init<any>.(Anonymous class);
// } & T

@InjectSex("男")
class Two {}

function InjectSex(sex: "男" | "女") {
  return function <T extends { new (...args: any): {} }>(target: T) {
    target.prototype.sex = sex;
    return target;
  };
}

console.log(Reflect.getPrototypeOf(new Two()));

// { sex: '男' }
