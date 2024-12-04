class Param {
  @Validate
  log(@require name?: string, @require age?: number) {
    console.log(name, age);
  }
}

function Validate(target, key, descriptor) {
  const val = descriptor.value;
  const required = val.required;
  console.log("🚀日志=====val", val);
  console.log(required); // [0, 1]
  descriptor.value = function (...args) {
    required.forEach((index) => {
      console.log("🚀日志=====", args);
      if (!args[index]) {
        throw new Error("缺少参数");
      }
    });
    return val(...args);
  };
  return descriptor;
}

function require(target, key, index) {
  console.log("🚀日志=====", [index, ...(target[key].required || [])]);
  target[key].required = [index, ...(target[key].required || [])];

  return target;
}

const param1 = new Param();
param1.log();
