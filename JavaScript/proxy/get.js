
const myTarget = {};

const proxy = new Proxy(myTarget, {
    get(target, property, receiver) {
        console.log('get()');
        console.log(target, property, receiver);
        console.log(...arguments);

        return Reflect.get(...arguments);
    }
});
proxy.foo;
