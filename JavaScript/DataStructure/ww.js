let obj = {
  say: {
    a: 1,
  },
};

function deepClone(obj) {
  const target = {};
  const root = {
    // 要拷贝的源对象
    source: obj,
    // 要拷贝的目标对象
    target,
  };
  const stack = [root];
  while (stack.length > 0) {
    const { source, target: innerTarget } = stack.pop();
    for (let innerKey in source) {
      if (Object.prototype.hasOwnProperty.call(source, innerKey)) {
        const value = source[innerKey];
        if (typeof value === "object") {
          // 初始化新的对象，并将其放入父对象对应的key
          const newTarget = {};
          innerTarget[innerKey] = newTarget;
          stack.push({
            source: value,
            target: newTarget,
          });
        } else {
          innerTarget[innerKey] = value;
        }
      }
    }
  }
  return target;
}

let obj1 = deepClone(obj);
console.log(obj1);
