// TypeScript 泛型中的联合类型推断演示

// 使此文件成为模块，避免全局作用域冲突
export { };

function getFirstElement<T>(arr: T[]): T | undefined {
  return arr[0];
}

console.log("=== 联合类型推断演示 ===\n");

// 1. 纯数字数组
const pureNumbers = getFirstElement([1, 2, 3]);
console.log("1. 纯数字数组:");
console.log("   值:", pureNumbers);
console.log("   类型: number | undefined\n");

// 2. 纯字符串数组
const pureStrings = getFirstElement(["hello", "world"]);
console.log("2. 纯字符串数组:");
console.log("   值:", pureStrings);
console.log("   类型: string | undefined\n");

// 3. 混合类型数组 - 这就是你的问题！
const mixedArray = getFirstElement([1, "1", 3]);
console.log("3. 混合类型数组 [1, '1', 3]:");
console.log("   值:", mixedArray);
console.log("   实际类型: string | number | undefined");
console.log("   TypeScript 推断 T = string | number");
console.log("   所以不会报错！这是合法的！\n");

// 4. 使用混合类型结果需要类型守卫
console.log("4. 使用混合类型结果:");
if (typeof mixedArray === "number") {
  console.log("   是数字:", mixedArray * 2);
} else if (typeof mixedArray === "string") {
  console.log("   是字符串:", mixedArray.toUpperCase());
} else {
  console.log("   是 undefined");
}

console.log("\n=== 如何限制只能传入单一类型？ ===\n");

// 方法1: 显式指定类型参数
console.log("方法1: 显式指定类型参数");
const explicit = getFirstElement<number>([1, 2, 3]);
console.log("   getFirstElement<number>([1, 2, 3]) ✅");
// const error = getFirstElement<number>([1, '1', 3]); // ❌ 编译错误！
console.log("   getFirstElement<number>([1, '1', 3]) ❌ 会报错\n");

// 方法2: 函数重载
console.log("方法2: 使用函数重载（最严格）");

function getFirstStrict(arr: number[]): number | undefined;
function getFirstStrict(arr: string[]): string | undefined;
function getFirstStrict<T>(arr: T[]): T | undefined {
  return arr[0];
}

const strictNum = getFirstStrict([1, 2, 3]); // ✅ OK
const strictStr = getFirstStrict(["a", "b"]); // ✅ OK
// const strictMixed = getFirstStrict([1, '1', 3]); // ❌ 编译错误！

console.log("   getFirstStrict([1, 2, 3]) ✅", strictNum);
console.log("   getFirstStrict(['a', 'b']) ✅", strictStr);
console.log("   getFirstStrict([1, '1', 3]) ❌ 会报错（类型不匹配）\n");

// 方法3: 使用泛型约束（部分限制）
console.log("方法3: 使用泛型约束");

function getFirstConstrained<T extends number>(arr: T[]): T | undefined {
  return arr[0];
}

const constrained = getFirstConstrained([1, 2, 3]); // ✅ OK
// const constrainedError = getFirstConstrained([1, '1', 3]); // ❌ 编译错误！
console.log("   只允许 number 类型:", constrained);

console.log("\n=== 总结 ===");
console.log("• TypeScript 会将 [1, '1', 3] 推断为 (number | string)[]");
console.log("• 泛型 T 会被推断为 number | string");
console.log("• 这是完全合法的，不会报错");
console.log("• 如果需要严格类型，使用显式类型参数或函数重载");
