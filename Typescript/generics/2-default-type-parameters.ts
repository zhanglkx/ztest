/**
 * 默认类型参数详解
 * 
 * 本文件详细解答：默认类型参数的作用和使用场景
 * 
 * 核心问题：
 * 在函数 function createInstance<T = string>(value: T) 中，
 * 因为有必需参数 value，TypeScript 总能推断出 T 的类型，
 * 所以默认类型参数 T = string 在这里没有实际作用。
 * 
 * 那么，默认类型参数真正有用的场景是什么？
 */

// ==================== 1. 默认类型参数没有作用的场景 ====================

// ❌ 示例：默认类型参数在这里无意义
function createInstance<T = string>(value: T): { value: T } {
  return { value };
}

const instance1 = createInstance("hello"); // T 推断为 string
const instance2 = createInstance(42); // T 推断为 number
// 因为参数 value 是必需的，TypeScript 总能从实参推断出 T
// 所以 T = string 这个默认值永远不会被使用

// ==================== 2. 默认类型参数真正有用的场景 ====================

// ✅ 场景 1：参数是可选的
function createContainer<T = string>(value?: T): { value: T | undefined } {
  return { value };
}

// 现在默认类型参数发挥作用了
const c1 = createContainer(); // T 使用默认类型 string
const c2 = createContainer(42); // T 推断为 number
const c3 = createContainer<boolean>(); // T 显式指定为 boolean

// ✅ 场景 2：泛型只在返回值中使用
function createArray<T = number>(length: number): T[] {
  return new Array(length);
}

// 无法从 length 推断 T，所以使用默认类型
const arr1 = createArray(5); // T 默认为 number，返回 number[]
const arr2 = createArray<string>(5); // 显式指定为 string[]

// ✅ 场景 3：在类或接口中提供默认类型
interface Response<T = any> {
  data: T;
  status: number;
  message: string;
}

// 不指定泛型时，使用默认的 any
const response1: Response = {
  data: "anything",
  status: 200,
  message: "success"
};

// 指定具体类型
interface User {
  id: number;
  name: string;
}

const response2: Response<User> = {
  data: { id: 1, name: "Alice" },
  status: 200,
  message: "success"
};

// ✅ 场景 4：多个泛型参数，只想指定部分
function pair<T = string, U = number>(
  first: T,
  second?: U
): [T, U?] {
  return second !== undefined ? [first, second] : [first];
}

pair("hello"); // T=string (推断), U=number (默认)
pair<boolean>(true, 100); // T=boolean (指定), U=number (推断)
pair<string, boolean>("yes", true); // T=string, U=boolean

// ==================== 3. React 中的经典案例 ====================

/**
 * React.Component 的泛型定义：
 * class Component<P = {}, S = {}, SS = any>
 * 
 * 这是默认类型参数最典型的应用场景
 */

// 示例代码（伪代码，展示概念）
// import React from 'react';

// ✅ 无 Props 和 State 时，使用默认值
// class SimpleButton extends React.Component {
//   // 等价于 React.Component<{}, {}>
//   render() {
//     return <button>点击</button>;
//   }
// }

// ✅ 只有 Props，State 使用默认值
interface ButtonProps {
  text: string;
  onClick: () => void;
}

// class Button extends React.Component<ButtonProps> {
//   // 等价于 React.Component<ButtonProps, {}>
//   render() {
//     return <button onClick={this.props.onClick}>{this.props.text}</button>;
//   }
// }

// ✅ 有 Props 和 State，显式指定
interface CounterProps {
  initialCount?: number;
}

interface CounterState {
  count: number;
}

// class Counter extends React.Component<CounterProps, CounterState> {
//   static defaultProps = {
//     initialCount: 0,
//   };

//   constructor(props: CounterProps) {
//     super(props);
//     this.state = { count: props.initialCount || 0 };
//   }

//   render() {
//     return <div>Count: {this.state.count}</div>;
//   }
// }

// ==================== 4. 实际应用：API 客户端 ====================

interface ApiConfig {
  baseURL: string;
  timeout: number;
  headers: Record<string, string>;
}

// ✅ 使用默认类型参数简化 API
class ApiClient<TConfig extends Partial<ApiConfig> = {}> {
  private config: ApiConfig;

  constructor(config?: TConfig) {
    // 合并默认配置和用户配置
    this.config = {
      baseURL: 'https://api.example.com',
      timeout: 5000,
      headers: {},
      ...config,
    };
  }

  async get<TResponse = any>(url: string): Promise<TResponse> {
    console.log(`GET ${this.config.baseURL}${url}`);
    return {} as TResponse; // 模拟响应
  }

  async post<TResponse = any, TData = any>(
    url: string,
    data?: TData
  ): Promise<TResponse> {
    console.log(`POST ${this.config.baseURL}${url}`, data);
    return {} as TResponse; // 模拟响应
  }
}

// 使用默认配置
const client1 = new ApiClient();
client1.get('/users'); // TResponse 使用默认类型 any

// 使用自定义配置
const client2 = new ApiClient({ baseURL: 'https://custom.api.com' });

// 指定响应类型
interface UserData {
  id: number;
  name: string;
}
client2.get<UserData>('/users/1'); // TResponse 明确为 UserData

// ==================== 5. 实际应用：缓存管理器 ====================

// ✅ 默认类型参数让使用更灵活
class Cache<K = string, V = any> {
  private storage = new Map<K, V>();

  set(key: K, value: V): void {
    this.storage.set(key, value);
  }

  get(key: K): V | undefined {
    return this.storage.get(key);
  }

  has(key: K): boolean {
    return this.storage.has(key);
  }

  delete(key: K): boolean {
    return this.storage.delete(key);
  }
}

// 使用默认类型：string 键，any 值
const cache1 = new Cache();
cache1.set("user:1", { id: 1, name: "Alice" });
cache1.set("count", 100);

// 指定键类型，值使用默认
const cache2 = new Cache<number>();
cache2.set(1, "first");
cache2.set(2, { data: "second" });

// 指定键值类型
interface Product {
  id: number;
  name: string;
  price: number;
}

const cache3 = new Cache<string, Product>();
cache3.set("product:1", { id: 1, name: "iPhone", price: 5999 });
// cache3.set("product:2", "invalid"); // ❌ 类型错误

// ==================== 6. 工具类型示例 ====================

// ✅ 自定义 Promise 包装器
type PromiseOr<T, UsePromise extends boolean = true> =
  UsePromise extends true ? Promise<T> : T;

// 默认返回 Promise
function fetchData1<T>(url: string): PromiseOr<T> {
  return fetch(url).then(r => r.json()) as PromiseOr<T>;
}

// 指定不使用 Promise
function fetchData2<T>(url: string): PromiseOr<T, false> {
  return {} as T; // 同步返回
}

// ✅ 递归类型示例
type DeepPartial<T, MaxDepth extends number = 5> =
  MaxDepth extends 0
  ? T
  : T extends object
  ? { [P in keyof T]?: DeepPartial<T[P], Decrement<MaxDepth>> }
  : T;

// 辅助类型（简化版）
type Decrement<N extends number> = N extends 5 ? 4 : N extends 4 ? 3 : number;

interface NestedConfig {
  server: {
    host: string;
    port: number;
    ssl: {
      enabled: boolean;
      cert: string;
    };
  };
}

// 默认深度为 5
const config1: DeepPartial<NestedConfig> = {
  server: {
    ssl: {
      enabled: true,
      // cert 可以省略
    },
  },
};

// ==================== 7. 对比总结 ====================

/**
 * 默认类型参数的使用场景：
 * 
 * ✅ 参数可选或不存在时
 * ✅ 泛型无法从参数推断时（只在返回值使用）
 * ✅ 类/接口定义时提供便利
 * ✅ 多泛型参数时简化使用
 * 
 * ❌ 参数必需且可推断类型时（无意义）
 */

// ❌ 无意义的默认类型参数
function bad1<T = string>(value: T): T {
  return value; // T 总能从 value 推断，默认类型永不使用
}

function bad2<T = number>(arr: T[]): T | undefined {
  return arr[0]; // T 总能从 arr 推断
}

// ✅ 有意义的默认类型参数
function good1<T = string>(value?: T): T | undefined {
  return value; // value 可选，可能需要默认类型
}

function good2<T = number>(length: number): T[] {
  return new Array(length); // 无法从 length 推断 T
}

class Good3<T = any> {
  // 类的泛型无法推断，需要默认值
  private data: T[] = [];

  add(item: T): void {
    this.data.push(item);
  }
}

// ==================== 8. 最佳实践 ====================

/**
 * 1. 只在需要时使用默认类型参数
 *    - 参数可选
 *    - 无法推断
 *    - 类/接口定义
 * 
 * 2. 默认类型的选择
 *    - 通用场景：any、unknown
 *    - 特定场景：string、number、{}
 *    - 看具体业务需求
 * 
 * 3. 避免过度使用
 *    - 如果类型总能推断，不需要默认值
 *    - 如果必须显式指定，不需要默认值
 */

// ✅ 好的设计
interface Result<T = unknown> {
  success: boolean;
  data: T;
  error?: string;
}

function wrapResult<T = unknown>(data: T): Result<T> {
  return { success: true, data };
}

// 使用默认类型
const result1: Result = { success: true, data: "anything" };

// 使用推断类型
const result2 = wrapResult({ id: 1 }); // Result<{ id: number }>

// 显式指定类型
const result3: Result<number> = { success: true, data: 42 };

/**
 * 核心结论：
 * 
 * 默认类型参数主要用于类/接口定义和无法从参数推断类型的场景。
 * 在函数参数能推断类型的情况下，默认类型参数没有实际作用。
 * 
 * React.Component<P = {}, S = {}> 是经典案例：
 * - 类的泛型无法推断
 * - 提供默认值简化使用
 * - 灵活支持各种场景
 */

export { };
