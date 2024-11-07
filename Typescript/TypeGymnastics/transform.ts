// 定义一个类型操作 Push，用于将元素 Ele 推入数组 Arr 的末尾
type Push<Arr extends unknown[], Ele> = [...Arr, Ele];
// 定义一个类型操作 Push1，与 Push 类似，但使用 any[] 而不是 unknown[]
type Push1<Arr extends any[], Ele> = [...Arr, Ele];

// 示例：将 4 推入数组 [1, 2, 3] 的末尾
type push = Push<[1, 2, 3], 4>;

// 定义一个类型操作 Zip，用于将两个数组 One 和 Other 进行拉链操作
type Zip<One extends [unknown, unknown], Other extends [unknown, unknown]> = One extends [infer OneFirst, infer OneSecond]
  ? Other extends [infer OtherFirst, infer OtherSecond]
    ? [[OneFirst, OtherFirst], [OneSecond, OtherSecond]]
    : []
  : [];

// 示例：将数组 [1, "a"] 和 [2, "b"] 进行拉链操作
type Zipped = Zip<[1, "a"], [2, "b"]>;

// 定义一个类型操作 ZipRandomLength，用于将两个数组 T 和 K 进行随机长度的拉链操作
type ZipRandomLength<T extends unknown[], K extends unknown[]> = T extends [infer M, ...infer RestM]
  ? K extends [infer N, ...infer RestN]
    ? [[M, N], ...ZipRandomLength<RestM, RestN>]
    : []
  : [];

// 示例：将数组 [1, 2, 3, 4, 5] 和 ["a", "b", "c", "d", "e"] 进行随机长度的拉链操作
type ZipRandomLength1 = ZipRandomLength<[1, 2, 3, 4, 5], ["a", "b", "c", "d", "e"]>;

type CapitalizeStr<Str extends string> = Str extends `${infer First}${infer Rest}` ? `${Uppercase<First>}${Rest}` : Str;

type capitalized = CapitalizeStr<"hello">;

/**
 * snakeCase 转 camelCase
 */

type ToCamel<T extends string> = T extends `${infer K}_${infer M}${infer Rest}` ? `${K}${Uppercase<M>}${ToCamel<Rest>}` : T;

type caseCamel1 = ToCamel<"a_b_c_dog_e">;

//获取函数返回值
// 给User添加一个函数，返回值为string

interface User {
  name: string;
  age: number;
  getString: () => string;
}

type ReturnType1 = ReturnType<User["getString"]>;

// 索引类型
type obj = {
  readonly name: string;
  readonly age?: number;
  readonly gender: boolean;
};
type Mapping<Obj extends object> = {
  [Key in keyof Obj]: Obj[Key];
};

type Mapped = Mapping<obj>;

// 去除只读类型
type ToMutable<T> = {
  -readonly [key in keyof T]: T[key];
};

type caseMu = ToMutable<obj>;

// 去除可选操作符
type RemoveReq<T> = {
  [key in keyof T]-?: T[key];
};

type caseRe = RemoveReq<obj>;

type T = Record<string, number>;

// 提取 Promise 数据
type GetPromiseType<T extends Promise<unknown>> = T extends Promise<infer K> ? (K extends Promise<unknown> ? GetPromiseType<K> : K) : never;

type GetPromiseTypeLite<T> = T extends Promise<infer K> ? GetPromiseTypeLite<K> : T;

type ttt = Promise<Promise<Promise<Record<string, any>>>>;

type casePro = GetPromiseType<ttt>;
type caseProLite = GetPromiseTypeLite<ttt>;
// 数组/元组反转
type ReverseArr<T extends unknown[]> = T extends [infer First, ...infer Rest] ? [...ReverseArr<Rest>, First] : T;

type CaseRev = ReverseArr<[1, 2, 3, 4]>;

// BuildArray
type BuildArray<Length extends number, Ele = unknown, Arr extends unknown[] = []> = Arr["length"] extends Length
  ? Arr
  : BuildArray<Length, Ele, [...Arr, Ele]>;

type BuildArrayCase = BuildArray<5>;
