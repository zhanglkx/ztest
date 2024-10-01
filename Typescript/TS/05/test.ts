type GetFirstType<Arr extends unknown[]> = Arr extends [infer First, ...unknown[]] ? First : never

type Demo1 = GetFirstType<[1, 2, 3]>
type Demo2 = GetFirstType<[number, string]>

type GetLastType<Arr extends unknown[]> = Arr extends [...unknown[], infer Last] ? Last : never

type Demo3 = GetLastType<[1, 2, 3]>

// 获取剩余类型
type GetRestType<Arr extends unknown[]> = Arr extends [infer First, ...infer Rest] ? Rest : never
type Demo4 = GetRestType<[1, 2, 3]>
type Demo5 = GetRestType<[]>

// 字符串类型匹配
type IsStartWith<Str extends string, Start extends string> = Str extends `${Start}${infer Rest}` ? true : false
type Demo6 = IsStartWith<'abc', 'a'>
type Demo7 = IsStartWith<'abc', 'b'>

type IsEndWith<Str extends string, End extends string> = Str extends `${infer Rest}${End}` ? true : false
type Demo8 = IsEndWith<'abc', 'b'>
type Demo9 = IsEndWith<'abc', 'c'>

// replace str
type Replace<Str extends string, From extends string, To extends string> = Str extends `${infer Start}${From}${infer End}` ? `${Start}${To}${End}` : Str
type Demo10 = Replace<'abc', 'b', 'd'>
type Demo11 = Replace<'abc', 'c', 'd'>

// trim end 
type TrimEnd<str extends string> = str extends `${infer Rest}${' ' | '\n' | '\t'}` ? TrimEnd<Rest> : str
type Demo12 = TrimEnd<'   abc   '>
type Demo13 = TrimEnd<'abc   '>

// match function
type GetParams<Func extends Function> = Func extends (...args: infer Args) => unknown ? Args : never
type PramType = GetParams<(a: number, b: string) => void>

type GetReturnType<Func extends Function> = Func extends (...args: any[]) => infer Return ? Return : never
type ReturnTypes = GetReturnType<(a: number, b: string) => string>

// this
class Dong {
    name: string;

    constructor() {
        this.name = "dong";
    }

    hello(this: Dong) {
        return 'hello, I\'m ' + this.name;
    }
}

const dong = new Dong();
dong.hello();
dong.hello.call({ xxx: 1 });

type GetThisParameterType<T>
    = T extends (this: infer ThisType, ...args: any[]) => any
    ? ThisType
    : unknown;
