async function getData() {
    const data = await new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('data');
        }, 1000);
    });
    return data + ' processed';
}

async function getData1() {
    const data = await new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('data');
        }, 1000);
    })
    return data + ' processed';
}
