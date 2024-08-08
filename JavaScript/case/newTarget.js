class Verhicel {

}

const FooMixins = (superclass) => class extends superclass {
    foo() {
        console.log('foo')
    }
}

const BarMixins = (superclass) => class extends superclass {
    bar() {
        console.log('bar')
    }
}

const BazMixins = (superclass) => class extends superclass {
    baz() {
        console.log('baz')
    }
}

function mix(BaseClass, ...Mixins) {
    return Mixins.reduce((c, mixin) => mixin(c), BaseClass)
}

class Car extends mix(Verhicel, FooMixins, BarMixins, BazMixins) {

}

let car = new Car()
car.foo()
car.bar()
car.baz()