class Param {
  log(@require name: string, @require age: number) {
    console.log(name, age);
  }
}

function require(target, key, index) {
  console.log(target, key, index);
  target = 1;
  return 2;
  return target;
}

const param = new Param();
param.log("张三", 18);

// { log: [Function (anonymous)] } log 1
// { log: [Function (anonymous)] } log 0
// 张三 18
