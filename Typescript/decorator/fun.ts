class Fun {
  @AddOne
  log(x: number) {
    console.log(x);
  }
}

function AddOne(target, key, descriptor) {
  console.log(target, "target"); // { log: [Function (anonymous)] } target
  console.log(key, "key"); // log key
  console.log(descriptor, "descriptor");
  console.log("🚀日志=====", descriptor.value === target);
  // {
  //   value: [Function (anonymous)],
  //   writable: true,
  //   enumerable: true,
  //   configurable: true
  // } descriptor

  const val = descriptor.value;
  descriptor.value = function (...args) {
    console.log("🚀日志=====111", val, args);
    return val(args[0] + 1);
  };
  return descriptor;
}

const fun = new Fun();
fun.log(1);

// 2
