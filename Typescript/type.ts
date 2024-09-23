// type a = { a: string } & { b: number }

// type GetValueType<P> = P extends Promise<infer Value> ? Value : never;
// type A = GetValueType<Promise<'guang'>>;

// type KeyT = keyof any;

// type Key1T = keyof object;  // never

// type Result = keyof ['a', 'b', 'c'];

// type A = { a: string; z: boolean };
// type B = { b: string; z: boolean };

// 返回 'z'
// type KeyT = keyof (A | B);
// type Key1T =  A | B;

// type A = { a: string; x: boolean };
// type B = { b: string; y: number };

// // 返回 'a' | 'x' | 'b' | 'y'
// type KeyT = keyof (A & B);
type A = { a: string; x: boolean; y: boolean };
type B = { b: string; y: boolean };

type c= keyof A & keyof B