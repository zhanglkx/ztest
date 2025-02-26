type StringOrNumber = string | number;

function isString(value: StringOrNumber): value is string {
    return typeof value === 'string';
}

function isNumber(value: StringOrNumber): value is number {
    return typeof value === 'number';
}

let value: StringOrNumber = "hello";

if (isString(value)) {
    console.log(value.toUpperCase());
} else if (isNumber(value)) {
    console.log(value.toFixed(2));
} 