class FuncTwo {
  @InjectPrefix("托尼-")
  log(x) {
    console.log(x);
  }
}

function InjectPrefix(prefix: string) {
  return function (target, key, descriptor) {
    const val = descriptor.value;
    descriptor.value = function (...args) {
      return val(prefix + args[0]);
    };
    return descriptor;
  };
}

const funcTwo = new FuncTwo();
funcTwo.log("斯塔克");

// 托尼-斯塔克
