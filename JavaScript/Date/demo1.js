const obj1 = {
    name: "Alice",
    age: 30,
    city: "Wonderland"
};

// console.dir(obj, { depth: null });

let arr = [1, 2, 3, 4, 5];
let iter = arr[Symbol.iterator]()
// console.log(iter.next());
// console.log(iter.next());
// console.log(iter.next());
// console.log(iter.next());
// console.log(iter.next());
// console.log(iter.next());

const obj = { a: 1, b: 2, c: 3 };

for (const [key, value] of Object.entries(obj)) {
    console.log(Object.entries(obj));
    console.log(`${key}: ${value}`);
}

import { getData } from './demo2.js';
import getData from './demo222.js';
