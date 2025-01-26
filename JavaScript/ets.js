const baseObj = {
  a: 1,
  b: {
    name: '修言'
  }
};

const newObj = new Proxy(baseObj, {
  get(target, key, receiver) {
    console.log('get', key);
    return target[key];
  },
  set(target, key, value) {
    console.log('set', key, value);
    target[key] = value;
  }
});

newObj.b.name = 2;
newObj.b = {
  name: '修言1'
};