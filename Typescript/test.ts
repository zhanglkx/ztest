type StringOrNumber = string | number;

function isString(value: StringOrNumber): value is string {
    return typeof value === 'string';
}

const value: StringOrNumber = "hello";

if (isString(value)) {
    console.log(value.toUpperCase());
} else {
    // 在这个分支中，TypeScript 会正确推断 value 是 number 类型
    console.log(value.toFixed(2));
}