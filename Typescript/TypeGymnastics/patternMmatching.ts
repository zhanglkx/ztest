/**
 * 提取构造器返回值类型
 */

type ConstructorReturn<T extends new (...args: any[]) => any> = T extends new (...args: any[]) => infer R ? R : any;

type GetConstructorParameters<ConstructorType extends new (...args: any) => any> = ConstructorType extends new (...args: infer ParametersType) => any
  ? ParametersType
  : never;

type re<T extends new (...args: any) => any> = T extends new (...args: infer K) => any ? K : never;

type GetRefProps<Props> = "ref" extends keyof Props ? (Props extends { ref?: infer Value | undefined } ? Value : never) : never;
type GetRefProps1<Props> = "ref" extends keyof Props ? Props : never;

type KeyType1 = keyof { ref: 1; a: 2; 1: 2 };

type Props = GetRefProps1<{ ref: 1; a: 2 }>;

//exercise trim space

type Space = " " | "/n" | "/t";

type TrimSpace<T extends string> = T extends `${infer Prefix}${Space}`
  ? TrimSpace<Prefix>
  : T extends `${Space}${infer Suffix}`
  ? TrimSpace<Suffix>
  : T extends `${infer Prefix}${Space}${infer Suffix}`
  ? TrimSpace<`${Prefix}${Suffix}`>
  : T;

type AfterTrim = TrimSpace<"1 1">;
type AfterTrim1 = TrimSpace<" 1 1">;
type AfterTrim2 = TrimSpace<" 1 1 ">;
