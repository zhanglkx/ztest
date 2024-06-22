//基本用法的async函数
let asyncFun = async function () {
  return 1;
};
console.log(asyncFun());
//会返回一个promise对象

//使用场景
//xx
function dice() {
  return new Promise((resolve, reject) => {
    let sino = parseInt(Math.random() * 6 + 1); //生成一个1~6之间的随机小数
    setTimeout(() => {
      console.log("随机数是" + sino);
      resolve(sino);
    }, 2000);
  });
}
//异步方法
async function text() {
  console.log("开始摇色子");
  let n = await dice();
  //await 关键字后面调用摇色子方法执行完毕之后，才进行变量赋值
  console.log("摇出来" + n); //最后打印出摇出来的数
}
text();
