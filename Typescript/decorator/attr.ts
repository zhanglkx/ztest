class Prop {
  @init(16)
  age: number;
}

function init(age: number) {
  return function (target, key) {
    console.log("🚀日志=====", arguments);
    target[key] = age;
    return target;
  };
}

const prop = new Prop();
console.log(prop.age);

// 16
