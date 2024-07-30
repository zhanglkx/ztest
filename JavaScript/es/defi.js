let person = {
    name: 'John',
    age: 30,
    city: 'New York',
    country: 'USA'
};

Object.defineProperties(person, {
    name: {
        writable: false,
        enumerable: true,
        configurable: true
    },
    age: {
        writable: true,
        enumerable: true,
        configurable: true
    },
    city: {
        writable: true,
        enumerable: true,
        configurable: true
    },
    country: {
        writable: true,
        enumerable: true,
    }
})

person.name = 1
person.country = 2

console.log(person);