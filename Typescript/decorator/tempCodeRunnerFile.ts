// @Init
// class Index {
//   public age = 12;
// }

// function Init<T extends { new (...args: any[]): {} }>(constructor: T) {
//   // 使用 Function.prototype 来检查是否是构造函数
//   console.log("🚀日志=====", constructor.prototype instanceof Object);
//   // 或者直接打印构造函数
//   console.log("Constructor:", constructor);

//   return class extends constructor {
//     name = 21;
//   };
// }