// 使此文件成为模块，避免全局作用域冲突
export { };

function testFu(a: number, b: number): number {
  return a + b;
}

console.log(testFu(1, 2));

// 泛型相关内容已移至：Typescript/generics/ 目录
// - 完整学习指南：1-generics-complete-guide.ts
// - 默认类型参数：2-default-type-parameters.ts
// - 联合类型演示：3-union-type-demo.ts
// - React Component 泛型：4-react-component-generics.ts
