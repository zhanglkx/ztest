type StrMatch<T extends string, K extends string, M extends string> = T extends `${infer L}${K}${infer R}` ? `${L}${M}${StrMatch<R, K, M>}` : T;

type Case1 = StrMatch<"6 6 6", "6", "5">;

type StringUnion1<T extends string> = T extends `${infer M}${infer Rest}` ? M | StringUnion1<Rest> : never;

type StringToUnion<Str extends string> = Str extends `${infer First}${infer Rest}` ? First | StringToUnion<Rest> : never;

type CaseUnion1 = StringUnion1<"ZHANG">;
type CaseUnion = StringToUnion<"ZHANG">;

type DeepReadOnly<T extends Record<string, any>> = {
  readonly [key in keyof T]: T[key] extends object ? (T[key] extends Function ? T[key] : DeepReadOnly<T>) : T[key];
};
// 这个不会触发计算
// type DeepReadonly<Obj extends Record<string, any>> = {
//   // 遍历传入对象的所有键
//   readonly [Key in keyof Obj]: Obj[Key] extends object // 判断当前属性值是否为对象类型
//     ? // 如果是对象，进一步判断是否为函数类型
//       Obj[Key] extends Function
//       ? // 如果是函数，直接返回原函数类型，因为函数本身就是不可变的（在这种只读处理的情境下）
//         Obj[Key]
//       : // 如果不是函数，递归地应用DeepReadonly类型来处理嵌套的对象
//         DeepReadonly<Obj[Key]>
//     : // 如果当前属性值不是对象类型，直接返回原属性值类型
//       Obj[Key];
// };
// 这个会触发计算
type DeepReadonly<Obj extends Record<string, any>> = Obj extends any
  ? {
      readonly [Key in keyof Obj]: Obj[Key] extends object ? (Obj[Key] extends Function ? Obj[Key] : DeepReadonly<Obj[Key]>) : Obj[Key];
    }
  : never;

type CaseDeep = DeepReadOnly<{
  name: "John";
  age: 30;
}>;

type MyObject = {
  name: string;
  age: number;
  address: {
    city: string;
    street: string;
  };
  greet: () => void;
};

// 使用DeepReadonly类型
type ReadonlyMyObject = DeepReadonly<MyObject>;

type BuildArray<Length extends number, Ele = unknown, Arr extends unknown[] = []> = Arr["length"] extends Length
  ? Arr
  : BuildArray<Length, Ele, [...Arr, Ele]>;

type re11 = BuildArray<11>;

type Add<Num1 extends number, Num2 extends number> = [...BuildArray<Num1>, ...BuildArray<Num2>]["length"];

type AddRes = Add<1, 2>;

type TestUnion<A, B = A> = A extends A ? { a: A; b: B } : never;

type TestUnionResult = TestUnion<"a" | "b" | "c">;


// Element[number] 表示从 Element 数组中获取所有可能的元素类型。
// 同样，Modifiers[number] 表示从 Modifiers 数组中获取所有可能的元素类型。
// 这两个表达式将分别生成 Element 和 Modifiers 中的联合类型。


// 当 Element 是 ['aaa', 'bbb'] 时，Element[number] 是 'aaa' | 'bbb'。
// 当 Modifiers 是 ['warning', 'success'] 时，Modifiers[number] 是 'warning' | 'success'。
// 通过模板字面量类型 ${Block}__${Element[number]}--${Modifiers[number]}，TypeScript 会生成所有可能的字符串组合：
// 'guang__aaa--warning'
// 'guang__aaa--success'
// 'guang__bbb--warning'
// 'guang__bbb--success'
type BEM<Block extends string, Element extends string[], Modifiers extends string[]> = `${Block}__${Element[number]}--${Modifiers[number]}`;

type bemResult = BEM<"guang", ["aaa", "bbb"], ["warning", "success"]>;
