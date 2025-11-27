// ==================== TypeScript 泛型完整学习指南 ====================

// ==================== 1. 基础泛型函数 ====================

// 1.1 最简单的泛型函数 - 返回传入的值
// T 是类型参数，可以是任何类型
function identity<T>(arg: T): T {
  return arg;
}

// 使用方式1：显式指定类型
const num1 = identity<number>(42); // num1 类型是 number
const str1 = identity<string>("Hello"); // str1 类型是 string

// 使用方式2：类型推断（推荐）
const num2 = identity(100); // TypeScript 自动推断 T 为 number
const str2 = identity("World"); // TypeScript 自动推断 T 为 string

console.log("基础泛型:", num1, str1, num2, str2);

// 1.2 泛型函数 - 数组操作
// 获取数组的第一个元素
function getFirstElement<T>(arr: T[]): T | undefined {
  return arr[0];
}

const firstNum = getFirstElement([1, '1', 3]); // 实际类型: string | number | undefined
const firstName = getFirstElement(["Alice", "Bob"]); // string | undefined
const firstObj = getFirstElement([{ id: 1 }, { id: 2 }]); // { id: number } | undefined

console.log("数组第一个元素:", firstNum, firstName, firstObj);

// 演示：混合类型数组的类型推断
const mixedResult = getFirstElement([1, '1', 3]);
console.log("混合数组结果:", mixedResult, "类型:", typeof mixedResult);

// 如果使用混合类型的结果，需要类型判断
if (typeof mixedResult === 'number') {
  console.log("是数字，可以进行数学运算:", mixedResult * 2);
} else if (typeof mixedResult === 'string') {
  console.log("是字符串，可以转大写:", mixedResult.toUpperCase());
}

// 如果想要严格类型，需要显式指定
const strictNumber = getFirstElement<number>([1, 2, 3]); // 只能是 number | undefined
// const strictError = getFirstElement<number>([1, '1', 3]); // ❌ 这会报错！
console.log("严格数字类型:", strictNumber);

// 1.3 泛型函数 - 返回数组
function createArray<T>(length: number, value: T): T[] {
  return Array(length).fill(value);
}

const numArray = createArray(3, 0); // number[]
const strArray = createArray(3, "x"); // string[]
console.log("创建数组:", numArray, strArray);

// 1.3.5 严格类型版本的 getFirstElement（使用函数重载）
function getFirstStrict1(arr: number[]): number | undefined;
function getFirstStrict1(arr: string[]): string | undefined;
function getFirstStrict1<T>(arr: T[]): T | undefined {
  return arr[0];
}

const strictNum1 = getFirstStrict1([1, 2, 3]); // number | undefined ✅
const strictStr1 = getFirstStrict1(['a', 'b']); // string | undefined ✅
// const strictMixed = getFirstStrict1([1, '1', 3]); // ❌ 编译错误！不允许混合类型

console.log("严格类型函数:", strictNum1, strictStr1);

// 1.4 泛型函数 - 交换元组
function swap<T, U>(tuple: [T, U]): [U, T] {
  return [tuple[1], tuple[0]];
}

const swapped1 = swap([1, "hello"]); // ["hello", 1]
const swapped2 = swap(["world", 100]); // [100, "world"]
console.log("交换元组:", swapped1, swapped2);

// ==================== 2. 高级泛型函数 ====================

// 2.1 多个类型参数
// 合并两个对象
function merge<T, U>(obj1: T, obj2: U): T & U {
  return { ...obj1, ...obj2 };
}

const merged = merge({ name: "Alice" }, { age: 25 });
// merged 类型是 { name: string } & { age: number }
console.log("合并对象:", merged); // { name: 'Alice', age: 25 }

// 2.2 泛型约束 - 限制类型必须有特定属性
// extends 关键字用于约束泛型类型
interface Lengthwise {
  length: number;
}

function logLength<T extends Lengthwise>(arg: T): T {
  console.log("长度:", arg.length);
  return arg;
}

logLength("hello"); // 字符串有 length 属性，OK
logLength([1, 2, 3]); // 数组有 length 属性，OK
logLength({ length: 10, value: "test" }); // 对象有 length 属性，OK
// logLength(123); // 错误：数字没有 length 属性

// 2.3 泛型约束 - keyof 关键字
// 确保 key 是 obj 的属性名
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const personObj = { name: "Bob", age: 30, city: "Beijing" };
const personName = getProperty(personObj, "name"); // string
const personAge = getProperty(personObj, "age"); // number
// const invalid = getProperty(personObj, "salary"); // 错误：'salary' 不是 person 的属性

console.log("获取属性:", personName, personAge);

// 2.4 默认类型参数
function createInstance<T = string>(value: T): { value: T } {
  return { value };
}

const instance1 = createInstance("hello"); // T 推断为 string
const instance2 = createInstance(42); // T 推断为 number
// const instance3 = createInstance(); // 这行会报错，因为缺少必需参数

console.log("创建实例:", instance1, instance2);

// 2.5 泛型与联合类型结合
function processValue<T extends string | number>(value: T): string {
  if (typeof value === "string") {
    return value.toUpperCase();
  }
  return value.toString();
}

console.log(processValue("hello")); // "HELLO"
console.log(processValue(123)); // "123"

// 2.6 泛型函数类型
// 定义一个泛型函数类型
type GenericFunction<T> = (arg: T) => T;

const myIdentity: GenericFunction<number> = (x) => x;
const result = myIdentity(100);
console.log("泛型函数类型:", result);

// 2.7 泛型约束之间的关系
// K extends keyof T 确保 K 是 T 的键
function pick<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  const result = {} as Pick<T, K>;
  keys.forEach((key) => {
    result[key] = obj[key];
  });
  return result;
}

const userObj = { id: 1, name: "Alice", email: "alice@example.com", age: 25 };
const picked = pick(userObj, ["name", "email"]);
// picked 类型是 { name: string; email: string }
console.log("挑选属性:", picked);

// ==================== 3. 泛型类 ====================

// 3.1 基础泛型类
// 通用的键值对存储类
class KeyValuePair<K, V> {
  constructor(public key: K, public value: V) { }

  display(): void {
    console.log(`键: ${this.key}, 值: ${this.value}`);
  }
}

const pair1 = new KeyValuePair<string, number>("age", 25);
const pair2 = new KeyValuePair<number, string>(1, "first");
const pair3 = new KeyValuePair("name", "Alice"); // 类型推断
pair1.display();
pair2.display();

// 3.2 泛型类 - 数据容器
class Box<T> {
  private content: T;

  constructor(value: T) {
    this.content = value;
  }

  getValue(): T {
    return this.content;
  }

  setValue(value: T): void {
    this.content = value;
  }
}

const numberBox = new Box<number>(100);
console.log("盒子内容:", numberBox.getValue());
numberBox.setValue(200);

const stringBox = new Box("Hello");
console.log("盒子内容:", stringBox.getValue());

// 3.3 泛型类 - 栈（Stack）实现
class Stack<T> {
  private items: T[] = [];

  push(item: T): void {
    this.items.push(item);
  }

  pop(): T | undefined {
    return this.items.pop();
  }

  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  size(): number {
    return this.items.length;
  }

  clear(): void {
    this.items = [];
  }
}

const numberStack = new Stack<number>();
numberStack.push(1);
numberStack.push(2);
numberStack.push(3);
console.log("栈顶元素:", numberStack.peek()); // 3
console.log("弹出元素:", numberStack.pop()); // 3
console.log("栈大小:", numberStack.size()); // 2

// 3.4 泛型类 - 队列（Queue）实现
class Queue<T> {
  private items: T[] = [];

  enqueue(item: T): void {
    this.items.push(item);
  }

  dequeue(): T | undefined {
    return this.items.shift();
  }

  front(): T | undefined {
    return this.items[0];
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  size(): number {
    return this.items.length;
  }
}

const stringQueue = new Queue<string>();
stringQueue.enqueue("first");
stringQueue.enqueue("second");
stringQueue.enqueue("third");
console.log("队首元素:", stringQueue.front()); // "first"
console.log("出队:", stringQueue.dequeue()); // "first"
console.log("队列大小:", stringQueue.size()); // 2

// 3.5 泛型类的继承
class Animal {
  constructor(public name: string) { }
}

class Dog extends Animal {
  bark(): void {
    console.log("汪汪汪!");
  }
}

// 泛型类继承
class AnimalShelter<T extends Animal> {
  private animals: T[] = [];

  addAnimal(animal: T): void {
    this.animals.push(animal);
  }

  getAnimals(): T[] {
    return this.animals;
  }

  findByName(name: string): T | undefined {
    return this.animals.find((animal) => animal.name === name);
  }
}

const dogShelter = new AnimalShelter<Dog>();
dogShelter.addAnimal(new Dog("旺财"));
dogShelter.addAnimal(new Dog("小黑"));
console.log("收容所的狗:", dogShelter.getAnimals());

// 3.6 泛型类 - 带约束的类
interface Comparable<T> {
  compareTo(other: T): number;
}

class NumberWrapper implements Comparable<NumberWrapper> {
  constructor(public value: number) { }

  compareTo(other: NumberWrapper): number {
    return this.value - other.value;
  }
}

class SortedList<T extends Comparable<T>> {
  private items: T[] = [];

  add(item: T): void {
    this.items.push(item);
    this.items.sort((a, b) => a.compareTo(b));
  }

  getItems(): T[] {
    return this.items;
  }
}

const sortedNumbers = new SortedList<NumberWrapper>();
sortedNumbers.add(new NumberWrapper(5));
sortedNumbers.add(new NumberWrapper(2));
sortedNumbers.add(new NumberWrapper(8));
sortedNumbers.add(new NumberWrapper(1));
console.log(
  "排序后的数字:",
  sortedNumbers.getItems().map((item) => item.value)
); // [1, 2, 5, 8]

// 3.7 多类型参数的泛型类
class Pair<T, U> {
  constructor(public first: T, public second: U) { }

  swap(): Pair<U, T> {
    return new Pair(this.second, this.first);
  }
}

const numStrPair = new Pair(100, "hundred");
console.log("原始配对:", numStrPair.first, numStrPair.second);
const swappedPair = numStrPair.swap();
console.log("交换后:", swappedPair.first, swappedPair.second);

// ==================== 4. 泛型接口和类型 ====================

// 4.1 泛型接口 - 基础定义
interface Repository<T> {
  getById(id: string): T | null;
  getAll(): T[];
  create(item: T): T;
  update(id: string, item: T): T | null;
  delete(id: string): boolean;
}

// 实现泛型接口
interface UserEntity {
  id: string;
  name: string;
  email: string;
}

class UserEntityRepository implements Repository<UserEntity> {
  private users: UserEntity[] = [];

  getById(id: string): UserEntity | null {
    return this.users.find((user) => user.id === id) || null;
  }

  getAll(): UserEntity[] {
    return this.users;
  }

  create(user: UserEntity): UserEntity {
    this.users.push(user);
    return user;
  }

  update(id: string, user: UserEntity): UserEntity | null {
    const index = this.users.findIndex((u) => u.id === id);
    if (index !== -1) {
      this.users[index] = user;
      return user;
    }
    return null;
  }

  delete(id: string): boolean {
    const index = this.users.findIndex((u) => u.id === id);
    if (index !== -1) {
      this.users.splice(index, 1);
      return true;
    }
    return false;
  }
}

const userRepo = new UserEntityRepository();
userRepo.create({ id: "1", name: "Alice", email: "alice@test.com" });
userRepo.create({ id: "2", name: "Bob", email: "bob@test.com" });
console.log("所有用户:", userRepo.getAll());

// 4.2 泛型接口 - 函数类型
interface GenericIdentityFn<T> {
  (arg: T): T;
}

const myFunc: GenericIdentityFn<number> = (x) => x;
console.log("泛型函数接口:", myFunc(100));

// 4.3 泛型类型别名
type Nullable<T> = T | null;
type Maybe<T> = T | undefined;
type ArrayOrSingle<T> = T | T[];

const nullableString: Nullable<string> = null;
const maybeNumber: Maybe<number> = undefined;
const arrayOrSingle: ArrayOrSingle<number> = [1, 2, 3];

// 4.4 泛型类型别名 - Promise 类型
type AsyncFunction<T> = () => Promise<T>;

const fetchUser: AsyncFunction<UserEntity> = async () => {
  return { id: "1", name: "Alice", email: "alice@test.com" };
};

// 4.5 映射类型 - Partial（所有属性变为可选）
type MyPartial<T> = {
  [P in keyof T]?: T[P];
};

interface Product {
  id: number;
  name: string;
  price: number;
}

const partialProduct: MyPartial<Product> = {
  name: "iPhone",
  // id 和 price 可以省略
};

// 4.6 映射类型 - Readonly（所有属性变为只读）
type MyReadonly<T> = {
  readonly [P in keyof T]: T[P];
};

const readonlyProduct: MyReadonly<Product> = {
  id: 1,
  name: "MacBook",
  price: 9999,
};
// readonlyProduct.price = 8888; // 错误：无法修改只读属性

// 4.7 映射类型 - Pick（选择部分属性）
type MyPick<T, K extends keyof T> = {
  [P in K]: T[P];
};

type ProductPreview = MyPick<Product, "name" | "price">;
const preview: ProductPreview = {
  name: "iPad",
  price: 4999,
  // id 属性不存在
};

// 4.8 映射类型 - Record（创建键值对类型）
type MyRecord<K extends keyof any, T> = {
  [P in K]: T;
};

type PageInfo = MyRecord<"home" | "about" | "contact", { title: string; url: string }>;
const pages: PageInfo = {
  home: { title: "首页", url: "/" },
  about: { title: "关于", url: "/about" },
  contact: { title: "联系", url: "/contact" },
};

// 4.9 条件类型
type IsString<T> = T extends string ? "yes" : "no";

type Test1 = IsString<string>; // "yes"
type Test2 = IsString<number>; // "no"

// 4.10 条件类型 - 提取函数返回类型
type ReturnTypeOf<T> = T extends (...args: any[]) => infer R ? R : never;

function getUserName(): string {
  return "Alice";
}

type UserNameType = ReturnTypeOf<typeof getUserName>; // string

// 4.11 泛型工具类型组合
interface Employee {
  id: number;
  name: string;
  email: string;
  salary: number;
  department: string;
}

// 只读 + 部分属性
type ReadonlyPartial<T> = {
  readonly [P in keyof T]?: T[P];
};

const employeeUpdate: ReadonlyPartial<Employee> = {
  salary: 8000,
  department: "Engineering",
};

// 4.12 泛型接口嵌套
interface Result<T> {
  success: boolean;
  data: T;
  message?: string;
}

interface PaginatedResult<T> extends Result<T[]> {
  page: number;
  pageSize: number;
  total: number;
}

const userList: PaginatedResult<UserEntity> = {
  success: true,
  data: [
    { id: "1", name: "Alice", email: "alice@test.com" },
    { id: "2", name: "Bob", email: "bob@test.com" },
  ],
  page: 1,
  pageSize: 10,
  total: 2,
};

console.log("分页结果:", userList);

// ==================== 5. 实际应用场景 ====================

// 5.1 API 响应封装
interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
  timestamp: number;
}

// 成功响应构造函数
function createSuccessResponse<T>(data: T): ApiResponse<T> {
  return {
    code: 200,
    message: "success",
    data,
    timestamp: Date.now(),
  };
}

// 错误响应构造函数
function createErrorResponse<T = null>(
  code: number,
  message: string
): ApiResponse<T> {
  return {
    code,
    message,
    data: null as T,
    timestamp: Date.now(),
  };
}

const successResponse = createSuccessResponse({ userId: 1, username: "Alice" });
const errorResponse = createErrorResponse(404, "用户不存在");
console.log("API 响应:", successResponse, errorResponse);

// 5.2 HTTP 请求封装
class HttpClient {
  async get<T>(url: string): Promise<ApiResponse<T>> {
    // 模拟 HTTP GET 请求
    console.log(`GET ${url}`);
    return createSuccessResponse({} as T);
  }

  async post<T, U = any>(url: string, data: U): Promise<ApiResponse<T>> {
    // 模拟 HTTP POST 请求
    console.log(`POST ${url}`, data);
    return createSuccessResponse({} as T);
  }

  async put<T, U = any>(url: string, data: U): Promise<ApiResponse<T>> {
    console.log(`PUT ${url}`, data);
    return createSuccessResponse({} as T);
  }

  async delete<T>(url: string): Promise<ApiResponse<T>> {
    console.log(`DELETE ${url}`);
    return createSuccessResponse({} as T);
  }
}

const httpClient = new HttpClient();

// 使用示例
interface UserDetail {
  id: number;
  name: string;
  email: string;
  avatar: string;
}

async function fetchUserDetail(userId: number) {
  const response = await httpClient.get<UserDetail>(`/api/users/${userId}`);
  return response.data;
}

// 5.3 本地存储封装
class LocalStorage<T> {
  constructor(private key: string) { }

  set(value: T): void {
    localStorage.setItem(this.key, JSON.stringify(value));
  }

  get(): T | null {
    const item = localStorage.getItem(this.key);
    if (!item) return null;
    try {
      return JSON.parse(item) as T;
    } catch {
      return null;
    }
  }

  remove(): void {
    localStorage.removeItem(this.key);
  }

  clear(): void {
    localStorage.clear();
  }
}

// 使用示例
interface UserSettings {
  theme: "light" | "dark";
  language: string;
  notifications: boolean;
}

const settingsStorage = new LocalStorage<UserSettings>("user-settings");
// settingsStorage.set({ theme: "dark", language: "zh-CN", notifications: true });
// const settings = settingsStorage.get();

// 5.4 事件发射器
type EventHandler<T> = (data: T) => void;

class EventEmitter<T extends Record<string, any>> {
  private events: Map<keyof T, EventHandler<any>[]> = new Map();

  on<K extends keyof T>(event: K, handler: EventHandler<T[K]>): void {
    if (!this.events.has(event)) {
      this.events.set(event, []);
    }
    this.events.get(event)!.push(handler);
  }

  off<K extends keyof T>(event: K, handler: EventHandler<T[K]>): void {
    const handlers = this.events.get(event);
    if (handlers) {
      const index = handlers.indexOf(handler);
      if (index !== -1) {
        handlers.splice(index, 1);
      }
    }
  }

  emit<K extends keyof T>(event: K, data: T[K]): void {
    const handlers = this.events.get(event);
    if (handlers) {
      handlers.forEach((handler) => handler(data));
    }
  }
}

// 使用示例
interface AppEvents {
  userLogin: { userId: string; username: string };
  userLogout: { userId: string };
  dataUpdate: { entity: string; id: string };
}

const emitter = new EventEmitter<AppEvents>();

emitter.on("userLogin", (data) => {
  console.log("用户登录:", data.username);
});

emitter.emit("userLogin", { userId: "1", username: "Alice" });

// 5.5 缓存管理器
class CacheManager<K, V> {
  private cache: Map<K, { value: V; expiry: number }> = new Map();

  set(key: K, value: V, ttl: number = 60000): void {
    const expiry = Date.now() + ttl;
    this.cache.set(key, { value, expiry });
  }

  get(key: K): V | null {
    const item = this.cache.get(key);
    if (!item) return null;

    if (Date.now() > item.expiry) {
      this.cache.delete(key);
      return null;
    }

    return item.value;
  }

  has(key: K): boolean {
    return this.get(key) !== null;
  }

  delete(key: K): boolean {
    return this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }

  size(): number {
    // 清理过期项
    for (const [key, item] of this.cache.entries()) {
      if (Date.now() > item.expiry) {
        this.cache.delete(key);
      }
    }
    return this.cache.size;
  }
}

// 使用示例
const userCache = new CacheManager<string, UserDetail>();
userCache.set(
  "user-1",
  {
    id: 1,
    name: "Alice",
    email: "alice@test.com",
    avatar: "/avatar/1.jpg",
  },
  30000
); // 30秒过期

console.log("缓存的用户:", userCache.get("user-1"));

// 5.6 状态管理
interface State<T> {
  value: T;
  subscribers: Array<(value: T) => void>;
}

class Store<T> {
  private state: State<T>;

  constructor(initialValue: T) {
    this.state = {
      value: initialValue,
      subscribers: [],
    };
  }

  getState(): T {
    return this.state.value;
  }

  setState(newValue: T | ((prev: T) => T)): void {
    const value =
      typeof newValue === "function"
        ? (newValue as (prev: T) => T)(this.state.value)
        : newValue;

    this.state.value = value;
    this.notify();
  }

  subscribe(callback: (value: T) => void): () => void {
    this.state.subscribers.push(callback);

    // 返回取消订阅函数
    return () => {
      const index = this.state.subscribers.indexOf(callback);
      if (index !== -1) {
        this.state.subscribers.splice(index, 1);
      }
    };
  }

  private notify(): void {
    this.state.subscribers.forEach((callback) => callback(this.state.value));
  }
}

// 使用示例
interface AppState {
  user: UserEntity | null;
  isLoading: boolean;
  error: string | null;
}

const store = new Store<AppState>({
  user: null,
  isLoading: false,
  error: null,
});

const unsubscribe = store.subscribe((state) => {
  console.log("状态更新:", state);
});

store.setState({
  user: { id: "1", name: "Alice", email: "alice@test.com" },
  isLoading: false,
  error: null,
});

// 5.7 表单验证器
type ValidationRule<T> = (value: T) => string | null;

class Validator<T> {
  private rules: ValidationRule<T>[] = [];

  addRule(rule: ValidationRule<T>): this {
    this.rules.push(rule);
    return this;
  }

  validate(value: T): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    for (const rule of this.rules) {
      const error = rule(value);
      if (error) {
        errors.push(error);
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }
}

// 使用示例
const emailValidator = new Validator<string>()
  .addRule((value) => (!value ? "邮箱不能为空" : null))
  .addRule((value) => (!value.includes("@") ? "邮箱格式不正确" : null))
  .addRule((value) => (value.length > 50 ? "邮箱长度不能超过50个字符" : null));

const result1 = emailValidator.validate("");
const result2 = emailValidator.validate("invalid");
const result3 = emailValidator.validate("alice@test.com");

console.log("验证结果1:", result1);
console.log("验证结果2:", result2);
console.log("验证结果3:", result3);

// 5.8 链式调用构建器
class QueryBuilder<T> {
  private conditions: Array<(item: T) => boolean> = [];
  private sortFn?: (a: T, b: T) => number;
  private limitValue?: number;

  where(condition: (item: T) => boolean): this {
    this.conditions.push(condition);
    return this;
  }

  sort(compareFn: (a: T, b: T) => number): this {
    this.sortFn = compareFn;
    return this;
  }

  limit(count: number): this {
    this.limitValue = count;
    return this;
  }

  execute(data: T[]): T[] {
    let result = [...data];

    // 应用条件过滤
    for (const condition of this.conditions) {
      result = result.filter(condition);
    }

    // 应用排序
    if (this.sortFn) {
      result.sort(this.sortFn);
    }

    // 应用限制
    if (this.limitValue !== undefined) {
      result = result.slice(0, this.limitValue);
    }

    return result;
  }
}

// 使用示例
interface Book {
  id: number;
  title: string;
  author: string;
  year: number;
  price: number;
}

const books: Book[] = [
  { id: 1, title: "TypeScript 入门", author: "张三", year: 2022, price: 89 },
  { id: 2, title: "JavaScript 高级", author: "李四", year: 2021, price: 99 },
  { id: 3, title: "React 实战", author: "王五", year: 2023, price: 79 },
  { id: 4, title: "Vue3 指南", author: "赵六", year: 2023, price: 85 },
];

const queryBuilder = new QueryBuilder<Book>();
const recentExpensiveBooks = queryBuilder
  .where((book) => book.year >= 2022)
  .where((book) => book.price > 80)
  .sort((a, b) => b.price - a.price)
  .limit(2)
  .execute(books);

console.log("查询结果:", recentExpensiveBooks);

// ==================== 总结 ====================
console.log("\n=== TypeScript 泛型学习完成 ===");
console.log("1. 泛型函数：让函数可以处理多种类型");
console.log("2. 泛型类：创建可复用的数据结构");
console.log("3. 泛型接口：定义灵活的契约");
console.log("4. 泛型约束：限制泛型的类型范围");
console.log("5. 实际应用：API 封装、状态管理、缓存等");
console.log("\n泛型的核心价值：类型安全 + 代码复用 + 灵活性");