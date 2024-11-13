type IsEqual2<A, B> = (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B ? 1 : 2 ? true : false;

type IsUnion<A, B = A> = A extends A ? ([B] extends [A] ? false : true) : never;
// 输入 never 回返回 never
type TestNever<T> = T extends number ? 1 : 2;

type IsNever<T> = [T] extends [never] ? true : false;

type TestAny<T> = T extends number ? 1 : 2;
// 分布式条件类型 由于 any 可以是 number 也可以不是，所以会分别两步进行
type CaseAny = TestAny<any>;

type UnionToIntersection<U> = (U extends U ? (x: U) => unknown : never) extends (x: infer R) => unknown ? R : never;

type GetOptional<Obj extends Record<string, any>> = {
  [Key in keyof Obj as {} extends Pick<Obj, Key> ? Key : never]: Obj[Key];
};

type GetOptionalResult = GetOptional<{
  name: string;
  age?: number;
}>;
