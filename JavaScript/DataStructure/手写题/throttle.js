const throttle = (fn, wait) => {
  let start = Date.now();
  return (...args) => {
    if (Date.now() - start > wait) {
      start = Date.now();
      fn.apply(this, args);
    }
  };
};


// 优化 解决 this 问题 
// 在 fn.apply(this, args) 中，this 可能不是调用函数时期望的上下文。因为 this 在箭头函数（(...) => {}）中是继承自定义 throttle 的地方，而不是动态绑定的。
const throttle1 = (fn, wait) => {
  let start = 0; // 确保第一次调用立即执行
  return function (...args) {
    const now = Date.now();
    if (now - start > wait) {
      start = now;
      fn.apply(this, args); // 使用普通函数来正确绑定 `this`
    }
  };
};