// function _new(fn, args) {
//   const obj = Object.create(fn.prototype);
//   const ret = fn.apply(obj, args);
//   return ret instanceof Object ? ret : obj;
// }


function __new(fn, ...args) {
  const obj = Object.create(fn.prototype);
  const rej = fn.apply(obj.args);
  return rej instanceof Object ? rej :obj;
}

function _new(fn, ...arg) {
  //以一个现有对象作为原型，创建一个新对象,继承fn原型链上的属性
  const obj = Object.create(fn.prototype);
  // 使用 apply，改变构造函数 this 的指向到新建的对象，这样 obj 就可以访问到构造函数中的属性
  const ret = fn.apply(obj, arg);
  // 如果函数没有返回对象类型Object(包含Functoin, Array, Date, RegExg, Error)，那么new表达式中的函数调用会自动返回这个新的对象。
  return ret instanceof Object ? ret : obj;
}
function Person(name, age) {
  this.name = name;
  this.age = age;

  return {
    hair: 'black',
    gender: 'man'
  };
}

const person = _new(Person, '后俊生', 18);
console.log(person.name); //undefined
console.log(person.age); //undefined
console.log(person.hair); //black
console.log(person.gender); //man