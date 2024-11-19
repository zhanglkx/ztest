let a = new Promise((resolve, reject) => {
    resolve(1)
})

let b = Promise.resolve(1)

let c = Promise.resolve(Promise.resolve(1))

console.log(a === b);
