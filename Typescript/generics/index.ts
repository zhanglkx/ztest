/**
 * TypeScript 泛型学习资料索引
 * 
 * 本文件提供所有泛型学习资料的快速导航
 */

// ==================== 快速导航 ====================

/**
 * 1. 泛型基础与进阶
 * 文件：1-generics-complete-guide.ts
 * 
 * 内容涵盖：
 * - 基础泛型函数（identity、数组操作、元组）
 * - 高级泛型函数（多类型参数、约束、keyof）
 * - 泛型类（Stack、Queue、Repository）
 * - 泛型接口和类型（映射类型、条件类型）
 * - 实际应用（API 封装、状态管理、缓存等）
 * 
 * 适合：初学者到进阶开发者
 * 学习时间：4-6 小时
 */

/**
 * 2. 默认类型参数专题
 * 文件：2-default-type-parameters.ts
 * 
 * 深入解答：
 * - 为什么有些默认类型参数没有作用？
 * - 默认类型参数的真正使用场景
 * - React Component 中的默认类型参数
 * - 实际应用案例（API Client、Cache）
 * 
 * 适合：理解默认类型参数的使用场景
 * 学习时间：1-2 小时
 */

/**
 * 3. 泛型中的联合类型
 * 文件：3-union-type-demo.ts
 * 
 * 演示内容：
 * - TypeScript 如何推断混合类型数组
 * - 为什么 [1, '1', 3] 不会报错
 * - 如何限制只允许单一类型
 * - 三种解决方案对比
 * 
 * 适合：理解泛型类型推断机制
 * 学习时间：30 分钟
 */

/**
 * 4. React Component 泛型详解
 * 文件：4-react-component-generics.ts
 * 
 * React 专题：
 * - React.Component<P, S, SS> 泛型参数详解
 * - Props vs State 的本质区别
 * - defaultProps vs State 的使用场景
 * - TypeScript 类型系统与 Props 的关系
 * - 7+ 个生产环境实战案例
 * 
 * 适合：React 开发者必读
 * 学习时间：2-3 小时
 */

/**
 * 5. README 学习指南
 * 文件：README.md
 * 
 * 包含：
 * - 完整的学习路径规划
 * - 核心概念总结
 * - 实战技巧和最佳实践
 * - 练习建议
 * 
 * 适合：开始学习前必读
 */

// ==================== 学习路径推荐 ====================

/**
 * 路径 1：从零开始（初学者）
 * 
 * Day 1: README.md（了解概览）
 * Day 2-3: 1-generics-complete-guide.ts（1-3 章）
 * Day 4: 2-default-type-parameters.ts（理解默认类型参数）
 * Day 5-6: 1-generics-complete-guide.ts（4-5 章）
 * Day 7: 4-react-component-generics.ts（React 专题）
 * 
 * 总计：约 12-15 小时
 */

/**
 * 路径 2：快速上手（有基础）
 * 
 * Step 1: README.md（快速浏览）
 * Step 2: 2-default-type-parameters.ts（核心概念）
 * Step 3: 4-react-component-generics.ts（React 实战）
 * Step 4: 1-generics-complete-guide.ts（查缺补漏）
 * 
 * 总计：约 5-6 小时
 */

/**
 * 路径 3：问题导向（查阅参考）
 * 
 * - 不理解默认类型参数？→ 2-default-type-parameters.ts
 * - React 组件类型定义？→ 4-react-component-generics.ts
 * - 泛型约束怎么用？→ 1-generics-complete-guide.ts（第 2 章）
 * - 映射类型是什么？→ 1-generics-complete-guide.ts（第 4 章）
 * - 实际项目如何应用？→ 1-generics-complete-guide.ts（第 5 章）
 */

// ==================== 重点知识点索引 ====================

/**
 * 泛型基础
 * -------
 * - 基础泛型函数 → 1-generics-complete-guide.ts L12-88
 * - 类型推断 → 1-generics-complete-guide.ts L24-26
 * - 多类型参数 → 1-generics-complete-guide.ts L91-99
 */

/**
 * 泛型约束
 * -------
 * - extends 关键字 → 1-generics-complete-guide.ts L101-115
 * - keyof 关键字 → 1-generics-complete-guide.ts L117-128
 * - 约束之间的关系 → 1-generics-complete-guide.ts L160-173
 */

/**
 * 默认类型参数
 * -----------
 * - 基本概念 → 2-default-type-parameters.ts L1-20
 * - 有用的场景 → 2-default-type-parameters.ts L22-80
 * - React 案例 → 2-default-type-parameters.ts L82-135
 * - 最佳实践 → 2-default-type-parameters.ts L289-334
 */

/**
 * 泛型类
 * -----
 * - 基础泛型类 → 1-generics-complete-guide.ts L175-216
 * - Stack 实现 → 1-generics-complete-guide.ts L217-253
 * - Queue 实现 → 1-generics-complete-guide.ts L254-286
 * - 泛型类继承 → 1-generics-complete-guide.ts L287-319
 */

/**
 * 泛型接口和类型
 * -------------
 * - Repository 模式 → 1-generics-complete-guide.ts L370-427
 * - 映射类型 → 1-generics-complete-guide.ts L452-502
 * - 条件类型 → 1-generics-complete-guide.ts L504-518
 */

/**
 * React Component
 * --------------
 * - 泛型参数详解 → 4-react-component-generics.ts L1-31
 * - Props vs State → 4-react-component-generics.ts L487-566
 * - defaultProps 用法 → 4-react-component-generics.ts L229-264
 * - TypeScript 类型系统 → 4-react-component-generics.ts L568-672
 * - 最佳实践 → 4-react-component-generics.ts L674-805
 */

/**
 * 实战应用
 * -------
 * - API 响应封装 → 1-generics-complete-guide.ts L564-599
 * - HTTP 客户端 → 1-generics-complete-guide.ts L601-640
 * - 本地存储 → 1-generics-complete-guide.ts L641-678
 * - 事件发射器 → 1-generics-complete-guide.ts L679-724
 * - 缓存管理 → 1-generics-complete-guide.ts L725-783
 * - 状态管理 → 1-generics-complete-guide.ts L784-853
 * - 表单验证 → 1-generics-complete-guide.ts L854-894
 * - 查询构建器 → 1-generics-complete-guide.ts L896-963
 */

// ==================== 常见问题 Q&A ====================

/**
 * Q1: 默认类型参数什么时候有用？
 * A: 查看 2-default-type-parameters.ts
 *    - 参数可选时
 *    - 无法从参数推断时
 *    - 类/接口定义时
 */

/**
 * Q2: Props 和 State 有什么区别？
 * A: 查看 4-react-component-generics.ts L487-566
 *    - Props：父组件传入，不可修改
 *    - State：组件内部，可通过 setState 修改
 */

/**
 * Q3: 为什么需要定义 Props 接口？
 * A: 查看 4-react-component-generics.ts L568-672
 *    - TypeScript 不会从 defaultProps 推断类型
 *    - 必须显式定义并传给 Component<Props>
 */

/**
 * Q4: 什么时候用泛型约束？
 * A: 查看 1-generics-complete-guide.ts L101-173
 *    - 需要访问特定属性时（extends Lengthwise）
 *    - 需要操作对象键时（extends keyof T）
 */

/**
 * Q5: 如何实现类型安全的 API 客户端？
 * A: 查看 1-generics-complete-guide.ts L601-640
 *    - 使用泛型方法定义响应类型
 *    - 结合 Promise<T> 处理异步
 */

// ==================== 代码片段速查 ====================

/**
 * 基础泛型函数
 */
function identity<T>(arg: T): T {
  return arg;
}

/**
 * 泛型约束
 */
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

/**
 * 默认类型参数
 */
function createArray<T = number>(length: number): T[] {
  return new Array(length);
}

/**
 * 泛型类
 */
class Box<T> {
  constructor(public value: T) { }
}

/**
 * 泛型接口
 */
interface Repository<T> {
  getById(id: string): T | null;
  getAll(): T[];
}

/**
 * React Component
 */
// import React from 'react';

interface MyProps {
  title?: string;
}

interface MyState {
  count: number;
}

/*
class MyComponent extends React.Component<MyProps, MyState> {
  static defaultProps = {
    title: 'Default',
  };
  
  constructor(props: MyProps) {
    super(props);
    this.state = { count: 0 };
  }
}
*/

// ==================== 学习检查清单 ====================

/**
 * 完成以下内容表示掌握了 TypeScript 泛型：
 * 
 * □ 理解泛型的基本概念和语法
 * □ 能够编写泛型函数和类
 * □ 理解并使用泛型约束
 * □ 掌握 keyof 和 extends 关键字
 * □ 理解默认类型参数的使用场景
 * □ 能够定义泛型接口和类型别名
 * □ 了解映射类型和条件类型
 * □ 在 React 中正确使用泛型
 * □ 理解 Props vs State 的区别
 * □ 能够封装类型安全的工具类
 */

// ==================== 进阶学习方向 ====================

/**
 * 掌握基础后，可以继续学习：
 * 
 * 1. 高级类型（../TypeGymnastics/）
 *    - 类型体操
 *    - 递归类型
 *    - 模式匹配
 * 
 * 2. 装饰器（../decorator/）
 *    - 类装饰器
 *    - 方法装饰器
 *    - 参数装饰器
 * 
 * 3. 类型编程
 *    - infer 关键字
 *    - 分布式条件类型
 *    - 协变与逆变
 */

export { };
