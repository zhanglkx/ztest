const targrt = {
    foo() { }
}

const proxy = new Proxy(targrt, {
    get(target, propKey, receiver) {
        console.log({ target, propKey, receiver, Reflect });
        return Reflect.get(target, propKey, receiver);
    },
    set(target, propKey, value, receiver) {
        console.log(`setting ${propKey}!`);
        return Reflect.set(target, propKey, value, receiver);
    }
})

proxy.foo();
console.log(proxy);
