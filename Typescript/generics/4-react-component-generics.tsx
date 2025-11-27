/* eslint-disable */
// @ts-nocheck
/**
 * React Component 泛型详解
 * 
 * 本文件详细介绍 React.Component 的泛型设计与实际应用
 * 包含：
 * 1. React Component 泛型参数详解
 * 2. defaultProps vs State 的区别
 * 3. TypeScript 类型系统与 Props 的关系
 * 4. 生产环境中的实际案例
 * 
 * 注意：本文件包含 React JSX 示例代码
 * - 使用 @ts-nocheck 忽略类型检查（仅用于学习参考）
 * - 如需实际运行，请将文件扩展名改为 .tsx 并安装 React
 * - 当前为学习参考文件，代码示例仅用于理解概念
 * 
 * ⚠️ 此文件包含伪代码和示例，不作为可执行代码
 */

// ==================== 1. React Component 泛型参数详解 ====================

/**
 * React Component 的泛型定义：
 * 
 * interface Component<P = {}, S = {}, SS = any> extends ComponentLifecycle<P, S, SS> {}
 * 
 * class Component<P, S> {
 *   readonly props: Readonly<P>;
 *   state: Readonly<S>;
 *   setState<K extends keyof S>(...): void;
 * }
 * 
 * 泛型参数含义：
 * - P (Props): 组件的属性类型
 * - S (State): 组件的状态类型
 * - SS (SnapShot): getSnapshotBeforeUpdate 返回值类型（较少使用）
 */

// ==================== 2. 默认类型参数的作用 ====================

/**
 * 为什么这里默认类型参数很有用？
 * 
 * 与普通函数不同，类的泛型参数无法从构造函数推断，
 * 必须在继承或实例化时显式指定或使用默认值。
 */

// 示例 1：最简单的组件（无 Props 和 State）
// import React from 'react';

// 使用默认类型 P = {}, S = {}
/*
class SimpleButton extends React.Component {
  render() {
    return <button>点击</button>;
  }
}

// 等价于：
class SimpleButtonExplicit extends React.Component<{}, {}> {
  render() {
    return <button>点击</button>;
  }
}
*/

// ==================== 3. 只有 Props，没有 State（最常见） ====================

// 用户信息卡片组件
interface UserCardProps {
  userId: number;
  name: string;
  avatar?: string;
  onEdit?: (id: number) => void;
}

class UserCard extends React.Component<UserCardProps> {
  // 第二个泛型参数使用默认值 {}

  handleEdit = () => {
    const { userId, onEdit } = this.props;
    onEdit?.(userId);
  };

  render() {
    const { name, avatar } = this.props;
    return (
      <div className= "user-card" >
      { avatar && <img src={ avatar } alt = { name } />}
        <h3>{ this.props.name } </h3>
  < button onClick = { this.handleEdit } > 编辑 </>
    </div>
    );
  }
}

// 使用示例
// <UserCard userId={123} name="张三" onEdit={(id) => console.log(id)} />

// ==================== 4. 有 Props 和 State（复杂交互） ====================

// 表单组件示例
interface LoginFormProps {
  onSubmit: (username: string, password: string) => Promise<void>;
  initialUsername?: string;
  loading?: boolean;
}

interface LoginFormState {
  username: string;
  password: string;
  errors: {
    username?: string;
    password?: string;
  };
  isSubmitting: boolean;
}

class LoginForm extends React.Component<LoginFormProps, LoginFormState> {
  // 明确指定两个泛型参数

  constructor(props: LoginFormProps) {
    super(props);
    this.state = {
      username: props.initialUsername || '',
      password: '',
      errors: {},
      isSubmitting: false,
    };
  }

  // setState 的泛型魔法：K extends keyof S 确保只能更新 state 中存在的键
  handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      username: e.target.value,
      errors: { ...this.state.errors, username: undefined },
    });
  };

  handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      password: e.target.value,
      errors: { ...this.state.errors, password: undefined },
    });
  };

  validate = (): boolean => {
    const errors: LoginFormState['errors'] = {};

    if (!this.state.username) {
      errors.username = '请输入用户名';
    }
    if (!this.state.password || this.state.password.length < 6) {
      errors.password = '密码至少6位';
    }

    this.setState({ errors });
    return Object.keys(errors).length === 0;
  };

  handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!this.validate()) return;

    this.setState({ isSubmitting: true });

    try {
      await this.props.onSubmit(this.state.username, this.state.password);
    } catch (error) {
      this.setState({
        errors: { username: '登录失败，请检查账号密码' },
      });
    } finally {
      this.setState({ isSubmitting: false });
    }
  };

  render() {
    const { username, password, errors, isSubmitting } = this.state;
    const { loading } = this.props;

    return (
      <form onSubmit= { this.handleSubmit } className = "login-form" >
        <div className="form-group" >
          <input
            type="text"
    value = { username }
    onChange = { this.handleUsernameChange }
    placeholder = "用户名"
      />
      { errors.username && <span className="error"> { errors.username } </span> }
      </div>

      <div div className = "form-group" >
        <input
            type="password"
    value = { password }
    onChange = { this.handlePasswordChange }
    placeholder = "密码"
      />
      { errors.password && <span className="error"> { errors.password } </span> }
      </div>

      <button button
    type = "submit"
    disabled = { isSubmitting || loading
  }
        >
  { isSubmitting? '登录中...': '登录' }
  </button>
  </form>
    );
  }
}

// ==================== 5. 复杂业务：列表组件（带筛选、分页、排序） ====================

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  stock: number;
}

interface ProductListProps {
  initialProducts?: Product[];
  onProductClick?: (product: Product) => void;
  pageSize?: number;
}

interface ProductListState {
  products: Product[];
  filteredProducts: Product[];
  currentPage: number;
  searchKeyword: string;
  selectedCategory: string;
  sortBy: 'price' | 'name' | 'stock';
  sortOrder: 'asc' | 'desc';
  isLoading: boolean;
}

class ProductList extends React.Component<ProductListProps, ProductListState> {
  static defaultProps = {
    pageSize: 20,
  };

  constructor(props: ProductListProps) {
    super(props);

    this.state = {
      products: props.initialProducts || [],
      filteredProducts: props.initialProducts || [],
      currentPage: 1,
      searchKeyword: '',
      selectedCategory: 'all',
      sortBy: 'name',
      sortOrder: 'asc',
      isLoading: false,
    };
  }

  componentDidMount() {
    if (!this.props.initialProducts) {
      this.fetchProducts();
    }
  }

  fetchProducts = async () => {
    this.setState({ isLoading: true });

    try {
      const response = await fetch('/api/products');
      const products = await response.json();

      this.setState({
        products,
        filteredProducts: products,
        isLoading: false,
      });
    } catch (error) {
      console.error('Failed to fetch products:', error);
      this.setState({ isLoading: false });
    }
  };

  // 使用函数式 setState 确保基于最新状态更新
  handleSearch = (keyword: string) => {
    this.setState((prevState) => {
      const filtered = prevState.products.filter((p) =>
        p.name.toLowerCase().includes(keyword.toLowerCase())
      );

      return {
        searchKeyword: keyword,
        filteredProducts: filtered,
        currentPage: 1,
      };
    });
  };

  handleCategoryChange = (category: string) => {
    this.setState((prevState) => {
      const filtered = category === 'all'
        ? prevState.products
        : prevState.products.filter((p) => p.category === category);

      return {
        selectedCategory: category,
        filteredProducts: filtered,
        currentPage: 1,
      };
    });
  };

  handleSort = (sortBy: ProductListState['sortBy']) => {
    this.setState((prevState) => {
      const sortOrder =
        prevState.sortBy === sortBy && prevState.sortOrder === 'asc'
          ? 'desc'
          : 'asc';

      const sorted = [...prevState.filteredProducts].sort((a, b) => {
        const aVal = a[sortBy];
        const bVal = b[sortBy];

        if (sortOrder === 'asc') {
          return aVal > bVal ? 1 : -1;
        }
        return aVal < bVal ? 1 : -1;
      });

      return {
        sortBy,
        sortOrder,
        filteredProducts: sorted,
      };
    });
  };

  // 部分更新 state，利用 Pick<S, K>
  handlePageChange = (page: number) => {
    this.setState({ currentPage: page });
  };

  render() {
    const {
      filteredProducts,
      currentPage,
      searchKeyword,
      sortBy,
      sortOrder,
      isLoading,
    } = this.state;

    const { pageSize = 20, onProductClick } = this.props;

    if (isLoading) {
      return <div className="loading" > 加载中...</div>;
    }

    const startIndex = (currentPage - 1) * pageSize;
    const displayProducts = filteredProducts.slice(
      startIndex,
      startIndex + pageSize
    );

    return (
      <div className= "product-list" >
      <div className="toolbar" >
        <input
            type="text"
    value = { searchKeyword }
    onChange = {(e) => this.handleSearch(e.target.value)
  }
  placeholder = "搜索商品..."
    />

    <select onChange={ (e) => this.handleCategoryChange(e.target.value) }>
      <option value="all" > 全部分类 </option>
        < option value = "electronics" > 电子产品 </option>
          < option value = "clothing" > 服装 </option>
            </select>
            </div>

            < table >
            <thead>
            <tr>
            <th onClick={ () => this.handleSort('name') }>
              名称 { sortBy === 'name' && (sortOrder === 'asc' ? '↑' : '↓') }
</th>
  < th onClick = {() => this.handleSort('price')}>
    价格 { sortBy === 'price' && (sortOrder === 'asc' ? '↑' : '↓') }
</th>
  < th onClick = {() => this.handleSort('stock')}>
    库存 { sortBy === 'stock' && (sortOrder === 'asc' ? '↑' : '↓') }
</th>
  </tr>
  </thead>
  <tbody>
{
  displayProducts.map((product) => (
    <tr
                key= { product.id }
                onClick = {() => onProductClick?.(product)}
style = {{ cursor: 'pointer' }}
              >
  <td>{ product.name } </td>
  <td>¥{ product.price.toFixed(2) } </td>
    < td > { product.stock } </td>
    </tr>
            ))}
</tbody>
  </table>

  < div className = "pagination" >
    <button
            disabled={ currentPage === 1 }
onClick = {() => this.handlePageChange(currentPage - 1)}
          >
  上一页
  </button>
  < span > 第 { currentPage } 页 </span>
    < button
disabled = { startIndex + pageSize >= filteredProducts.length}
onClick = {() => this.handlePageChange(currentPage + 1)}
          >
  下一页
  </button>
  </div>
  </div>
    );
  }
}

// ==================== 6. 使用 Snapshot（第三个泛型参数） ====================

interface ScrollListProps {
  items: string[];
}

interface ScrollListState {
  items: string[];
}

// 第三个泛型参数：snapshot 类型
class ScrollList extends React.Component<
  ScrollListProps,
  ScrollListState,
  number // getSnapshotBeforeUpdate 返回滚动位置
> {
  listRef = React.createRef<HTMLDivElement>();

  constructor(props: ScrollListProps) {
    super(props);
    this.state = { items: props.items };
  }

  // 在更新前保存滚动位置
  getSnapshotBeforeUpdate(
    prevProps: ScrollListProps,
    prevState: ScrollListState
  ): number | null {
    // 如果添加了新项目，保存当前滚动位置
    if (prevState.items.length < this.state.items.length) {
      const list = this.listRef.current;
      return list ? list.scrollHeight - list.scrollTop : null;
    }
    return null;
  }

  // 在更新后恢复滚动位置
  componentDidUpdate(
    prevProps: ScrollListProps,
    prevState: ScrollListState,
    snapshot: number | null
  ) {
    if (snapshot !== null) {
      const list = this.listRef.current;
      if (list) {
        list.scrollTop = list.scrollHeight - snapshot;
      }
    }
  }

  addItem = () => {
    this.setState((prevState) => ({
      items: [`新项目 ${Date.now()}`, ...prevState.items],
    }));
  };

  render() {
    return (
      <div>
      <button onClick= { this.addItem } > 添加项目 </button>
      < div ref = { this.listRef } style = {{ height: 300, overflow: 'auto' }
  }>
  {
    this.state.items.map((item, idx) => (
      <div key= { idx } > { item } </div>
    ))
  }
    </div>
    </div>
    );
  }
}

// ==================== 7. defaultProps vs State 详解 ====================

/**
 * Props vs State 的核心区别：
 * 
 * Props（属性）：
 * - 从父组件传入，组件自身不能修改
 * - 用于配置组件的行为
 * - defaultProps 提供缺省配置
 * 
 * State（状态）：
 * - 组件内部管理，可以通过 setState 修改
 * - 用于跟踪组件自身的动态数据
 */

// ❌ 错误做法：把配置项放在 State
class WrongProductList extends React.Component<ProductListProps, ProductListState> {
  constructor(props: ProductListProps) {
    super(props);

    this.state = {
      // 错误：把 props 的配置项放在 state 里
      pageSize: props.pageSize || 20,  // ❌ 不好
      products: [],
      currentPage: 1,
    };
  }

  // 问题：如果父组件更新了 props.pageSize，这里的 state.pageSize 不会变
}

// ✅ 正确做法：使用 defaultProps
class CorrectProductList extends React.Component<ProductListProps, ProductListState> {
  static defaultProps = {
    pageSize: 20,  // ✅ 配置项用 defaultProps
  };

  constructor(props: ProductListProps) {
    super(props);

    // state 只存放组件内部的动态状态
    this.state = {
      products: props.initialProducts || [],
      currentPage: 1,  // 这是内部状态，会变化
      searchKeyword: '',  // 这是内部状态，会变化
      // 注意：没有 pageSize
    };
  }

  render() {
    // ✅ 直接从 props 读取
    const { pageSize } = this.props;
    const startIndex = (this.state.currentPage - 1) * pageSize;
    // ...
  }
}

// 示例：什么时候应该放在 State 里？
// 只有当数据需要组件内部修改时，才放在 State

interface TimerProps {
  initialSeconds?: number;  // 配置：初始秒数
}

interface TimerState {
  seconds: number;  // 状态：当前秒数（会变化）
}

class Timer extends React.Component<TimerProps, TimerState> {
  static defaultProps = {
    initialSeconds: 60,  // ✅ 配置项用 defaultProps
  };

  intervalId?: number;

  constructor(props: TimerProps) {
    super(props);

    // ✅ 从 props 初始化 state（只在构造时一次性读取）
    this.state = {
      seconds: props.initialSeconds!,
    };
  }

  componentDidMount() {
    this.intervalId = window.setInterval(() => {
      // ✅ State 可以修改
      this.setState((prev) => ({ seconds: prev.seconds - 1 }));
    }, 1000);
  }

  componentWillUnmount() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  render() {
    return <div>剩余时间: { this.state.seconds } s </div>;
  }
}

// ==================== 8. TypeScript 类型系统与 Props ====================

/**
 * 为什么需要定义 Props 接口？
 * 
 * 问题：TypeScript 不会自动从 defaultProps 推断 Props 的类型
 * 解决：必须显式定义 Props 接口并传给 React.Component<Props>
 */

// ❌ 错误示例：没有定义 Props 类型
class BoxWrong extends React.Component {
  // 相当于 React.Component<{}, {}>
  // TypeScript 认为 this.props 是空对象 {}

  static defaultProps = {
    type: 'button',
    size: 'medium',
    disabled: false,
  };

  aa() {
    // ❌ 类型错误：类型"{}"上不存在属性"type"
    const type = this.props.type;
    console.log(type);
  }
}

// ✅ 正确示例：定义 Props 接口
interface BoxProps {
  type?: 'button' | 'submit' | 'reset';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
}

class BoxCorrect extends React.Component<BoxProps> {
  // 现在 TypeScript 知道 this.props 有这些属性了

  static defaultProps: BoxProps = {
    type: 'button',
    size: 'medium',
    disabled: false,
  };

  aa() {
    // ✅ 正确：TypeScript 知道 type 存在
    const type = this.props.type;
    console.log(type);
  }

  render() {
    return <div>Box </div>;
  }
}

// ==================== 9. 最佳实践完整示例 ====================

// 1. 定义 Props 接口
interface ButtonProps {
  type?: 'button' | 'submit' | 'reset';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
}

// 2. 定义 State 接口（如果有）
interface ButtonState {
  isHovered: boolean;
}

// 3. 定义组件
class Button extends React.Component<ButtonProps, ButtonState> {
  // 4. 提供默认 Props
  static defaultProps: Partial<ButtonProps> = {
    type: 'button',
    size: 'medium',
    disabled: false,
  };

  // 5. 初始化 State
  constructor(props: ButtonProps) {
    super(props);
    this.state = {
      isHovered: false,
    };
  }

  // 6. 方法中可以安全访问 props
  handleClick = () => {
    if (!this.props.disabled && this.props.onClick) {
      this.props.onClick();
    }
  };

  handleMouseEnter = () => {
    this.setState({ isHovered: true });
  };

  handleMouseLeave = () => {
    this.setState({ isHovered: false });
  };

  // 7. 渲染
  render() {
    // ✅ TypeScript 知道这些属性存在
    const { type, size, disabled, children } = this.props;
    const { isHovered } = this.state;

    const className = `
      btn 
      btn-${size} 
      ${disabled ? 'btn-disabled' : ''} 
      ${isHovered ? 'btn-hovered' : ''}
    `.trim();

    return (
      <button
        type= { type }
    className = { className }
    disabled = { disabled }
    onClick = { this.handleClick }
    onMouseEnter = { this.handleMouseEnter }
    onMouseLeave = { this.handleMouseLeave }
      >
      { children }
      </button>
    );
  }
}

// 使用示例
// <Button>默认按钮</Button>
// <Button size="large" type="submit">提交</Button>
// <Button disabled onClick={() => console.log('不会执行')}>禁用</Button>

/**
 * ==================== 核心要点总结 ====================
 * 
 * 1. setState 的泛型机制：
 *    setState<K extends keyof S>(state: Pick<S, K> | S | null): void
 *    - K extends keyof S 确保只能更新 state 中存在的键
 *    - 支持部分更新（Pick<S, K>）或全量更新（S）
 * 
 * 2. 默认类型参数的价值：
 *    - 简化代码：无 props/state 时不需要写 <{}, {}>
 *    - 渐进式类型：可以先写 Component<Props>，以后再加 State
 *    - 向后兼容：旧代码不需要修改
 * 
 * 3. Props vs State 对比：
 *    Props (defaultProps)    | State
 *    ----------------------|------------------
 *    父组件传入             | 组件内部
 *    不能修改（只读）       | 能修改（setState）
 *    自动响应父组件更新     | 需要 componentDidUpdate
 *    配置项、默认值         | 动态数据、UI 状态
 * 
 * 4. 最佳实践：
 *    ✅ 始终明确定义 Props 和 State 接口
 *    ✅ 配置项用 defaultProps，动态状态用 state
 *    ✅ Props 接口中的属性应该是可选的（?:）
 *    ⚠️ 避免使用 any 或忽略类型
 */

export { };
