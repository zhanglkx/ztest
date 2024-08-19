const myTarget = {
    kkkkkk: 'kkkkkk'
};

const proxy = new Proxy(myTarget, {
    get(target, property, receiver) {
        console.log('get()');
        console.log(target, property, receiver);
        console.log(...arguments);

        return Reflect.get(...arguments);
    },
    defineProperty(target, property, attributes) {
        console.log('defineProperty()');
        console.log(target, property, attributes);
        console.log(...arguments);

        const success = Reflect.defineProperty(...arguments);
        console.log('defineProperty success:', success);
        return success;
    }
});

proxy.foo;

const success = Object.defineProperty(proxy, 'bar', { value: 'bar' });
console.log('defineProperty result:', success);
console.log('proxy.bar:', proxy.bar);
