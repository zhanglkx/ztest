let person = {
    country: 'USA'
};

Object.defineProperties(person, {
    country: {
        enumerable: true,
        get() {
            debugger
            // console.trace()
            return 1;
        },
        set(value) {
            // console.trace()
            this._country = value;
        }
    }
});

person.name = 1;
person.country = 2;

// console.log(person);  // { name: 1, _country: 2 }
// console.log(person.country);  // 2
Object.getOwnPropertyDescriptors(person);
// console.log(Object.getOwnPropertyDescriptors(person));


function Person() { }
Person.prototype.name = "Nicholas";
Person.prototype.age = 29;
Person.prototype.job = "Software Engineer";
Person.prototype.sayName = function () {
    console.log(this.name);
};
let keys = Object.keys(Person.prototype);
console.log(keys);   // "name,age,job,sayName"
let p1 = new Person();
p1.name1 = "Rob";
p1.age1 = 31;
let p1keys = Object.keys(p1);
console.log(p1keys); // "[name,age]"