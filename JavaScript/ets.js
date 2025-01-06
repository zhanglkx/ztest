class Car {
    constructor(brand) {
        this.brand = brand;
        this.speed = 0;
    }
    
    // 非静态方法
    accelerate() {
        this.speed += 10;
        return this.speed;
    }
    
    static brake() {
        this.speed -= 5;
        return this.speed;
    }
}

// 使用非静态方法 - 需要先创建实例
const myCar = new Car('Toyota');
console.log(myCar.accelerate()); // 输出: 10
console.log(Car.brake()); // 输出: 5
