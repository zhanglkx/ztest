async function foo() {
    console.log(2);
    await asyncFun();
    console.log(4);
}

console.log(1);
foo()

console.log(3);

function asyncFun(params) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('deno');

            resolve(1);
        }, 1000);
    });
}