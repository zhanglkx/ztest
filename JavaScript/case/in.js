const person = {
    name: 'John',
    age: 30,
    city: 'New York'
};

// 错误的原型使用，应该是 Object.prototype 而不是 person.prototype
Object.prototype.greet = function () {
    console.log('Hello, my name is ' + this.name);
};

// // 错误的属性检查，应该检查 'greet' 而不是 'age'
// if ('greet' in person) {
//     console.log('The person object has a method called greet.');
// } else {
//     console.log('The person object does not have a method called greet.');
// }

// if ('greet' in person) {
//     console.log('The person object has a property called age.');
// } else {
//     console.log('The person object does not have a property called age.');

// }

// 正确的属性检查，使用 hasOwnProperty 方法
if (person.hasOwnProperty('greet')) {
    console.log('The person object has a method called greet.');
} else {
    console.log('The person object does not have a method called greet.');
}