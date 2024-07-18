// let a= {
//     valueOf(){
//         return 1;
//     }
// }
// console.log(a+2);


function test(params) {
    for (let i = 0; i < 10; i++) {
        if (i === 5) {
            // break;
            // return
            continue;
        }
        console.log(i);
    }
}
// test()

// let a = 1;
// outer:
// for (let i = 0; i < 6; i++) {
//     inner:
//     for (let j = 0; j < 6; j++) {
//         if (j === 3) {
//             // break outer;
//             // break
//             // return
//             continue
//             continue outer;
//         }
//         console.log(i, j);
//     }
// }

function ResidualParameter(...args) {
    console.log(arguments);
    console.log(Array.from(arguments));
}
// ResidualParameter(1, 2, 3, 4, 57)

function sum(...numbers) {
    console.log(numbers);
    // return numbers.reduce((total, num) => total + num, 0);
}

console.log(sum(1, 2, 3)); // 输出: 6
console.log(sum(4, 5, 6, 7)); // 输出: 22
