async function delay(params) {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log(params)
            resolve(params)
            return params
        }, 1000);
    })
}

async function test() {
    // console.log(await delay(1));
    // console.log(await delay(2));
    // console.log(await delay(3));
    // console.log(await delay(4));
    const p1 = delay(1)
    const p2 = delay(2)
    const p3 = delay(3)
    const p4 = delay(4)
    // const res = await Promise.all([p1, p2, p3, p4])
    console.log(await p1);
    console.log(await p2);
    console.log(await p3);
    console.log(await p4);

}
test()