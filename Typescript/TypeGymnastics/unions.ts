// type Combination<A extends string, B extends string> = A | B | `${A}${B}` | `${B}${A}`;

// type AllCombinations<A extends string, B extends string = A> = A extends A ? Combination<A, AllCombinations<Exclude<B, A>>> : never;

// type res = AllCombinations<"A" | "T" | "K", "B" | "C">;

type Combination<A extends string, B extends string> = A | B | `${A}${B}` | `${B}${A}`;
type AllCombinations<A extends string, B extends string = A> = A extends A ? Combination<A, AllCombinations<A, Exclude<B, A>>> : never;
