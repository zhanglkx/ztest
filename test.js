function createCounter() {
    let _count = 0;
    console.log(_count);
    return function () {
        _count = _count + 1;
        console.log(_count);
        return _count;
    }
}
let counter = createCounter();

let count = counter();
count = counter();
count = counter();
count = counter();
count = counter();