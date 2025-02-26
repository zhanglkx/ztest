// 没有使用 value is
function isFunction(value: unknown): boolean {
  return typeof value === 'function';
}

const something: unknown = () => console.log('hello');

if (isFunction(something)) {
  // ❌ 错误：TypeScript 仍然认为 something 是 unknown 类型
  // 即使我们已经检查了它是函数
  something(); // Error: Object is of type 'unknown'
}