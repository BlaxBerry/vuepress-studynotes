# 组件性能优化

![](https://cdn-ssl-devio-img.classmethod.jp/wp-content/uploads/2019/07/react.jpg)

[[toc]]

## 减轻 state

为了保证 React 渲染的效率

组件的状态 `state` 中只应该存放与该组件渲染相关的数据

> 比如：列表数据、用于判断的布尔值等

对于不需要渲染应该直接存放到 `this` 组件实例对象上

> 比如：定时器的 id
>
> ```jsx
> class Demo extends React.Component {
>   componentDidMount() {
>     this.timer = setInterval(() => {}, 1000);
>   }
>   componentWillUnmount() {
>     clearInterval(this.timer);
>   }
>   render() {
>     return <div></div>;
>   }
> }
> ```

## 避免不必要重新渲染

React 的更新机制是：父组件被更新了也会引起其子组件的更新

但是若子组件内没有任何数据变化，则没必要跟着父组件一起更新

应该在子组件内通过生命周期钩子 **`shouldComponentUpdate`** 判断

或类组件创建时继承 `PureComponent` 而不是 `Component`

### shouldComponentUpdate()

`shouldComponentUpdate` 是更新阶段钩子函数，在组件重新渲染执行前调用

通过参数判断更新跟前后的`props`、`state` 然后返回 `true` 或 `false` 来决定当前组件是否更新渲染

```js
shouldComponentUpdate(newProps, newState){
  // return true 或 false
}
```

#### 返回值

```js
shouldComponentUpdate(){
  return true 或 false
}
```

::: tip 根据该钩子函数返回值决定是否渲染该组件

- 返回值为 `true`：该组件重新渲染
- 返回值为 `false`：该组件不渲染

:::

> 如下：返回值为 false，组件没有重新渲染

```jsx
import React, { Component } from "react";
export default class Demo extends Component {
  state = { num: 1 };

  add = () => {
    this.setState({ num: this.state.num + 1 });
  };

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <div>
        <p>{this.state.num}</p>
        <button onClick={this.add}>num+1</button>
      </div>
    );
  }
}
```

#### 参数

```js
shoulComponentUpdate(newProps, newState){
  newProps // 更新后的最新props
  newState // 更新后的最新state

  this.props // 当前更新前的props
  this.state // 当前更新前的state
}
```

::: tip 根据该钩子函数中获取的更新跟前后的 props、state

若状态是组件自己的，则判断 `newState.状态数据`、`this.state`.状态数据

若状态是父组件传递的，则判断 `newProps.状态数据`、`this.props.状态数据`

最终根据判断条件后 `return` 返回的 `true` 或 `false`来决定该组件是否进行重新渲染

:::

#### 实例

> 如下：通过判断更新前后的 `state` 决定返回值
>
> ```jsx
> import React, { Component } from "react";
> export default class Demo extends Component {
>   state = { randomNum: 0 };
>   getNum = () => {
>     this.setState(() => ({
>       randomNum: Math.random(),
>     }));
>   };
>   shouldComponentUpdate(newProps, newState) {
>     return !(newState.randomNum === this.state.randomNum);
>   }
>   render() {
>     return (
>       <div>
>         <p>{this.state.randomNum}</p>
>         <button onClick={this.getNum}>生成新的随机数</button>
>       </div>
>     );
>   }
> }
> ```

通过判断更新前后的 `props` 决定返回值

> 如下：
>
> ```jsx
> import React, { Component } from "react";
> export default class Father extends Component {
>   state = { randomNum: 0 };
>   getNum = () => {
>     this.setState(() => ({
>       randomNum: Math.floor(Math.random() * 5), // 0~4
>     }));
>   };
>   render() {
>     return (
>       <div>
>         <Child num={this.state.randomNum} />
>         <button onClick={this.getNum}>生成新的随机数</button>
>       </div>
>     );
>   }
> }
> ```
>
> ```jsx
> import React, { Component } from "react";
> class Child extends Component {
>   shouldComponentUpdate(newProps, newState) {
>     return !(newProps.num === this.props.num);
>   }
>
>   render() {
>     return <h1>{this.props.num}</h1>;
>   }
> }
> ```

### PureComponent（常用）

```jsx
import React, { PureComponent } from "react";
export default class Demo extends PureComponent {}
```

## 错误边界

错误边界（ErrorBoundary）用于在生产环境中捕获子组件生命周期的错误，然后渲染出备用页面

错误边界要写在出错误的组件的父组件中，将错误控制在某个子组件内，不让一个子组件的内部错误影响到父组件

```jsx
import React, { Component, Fragment } from "react";
export default class Father extends Component {
  state = {
    hasError: "",
  };

  static getDerivedStatedFromError(error) {
    console.log(error);
    return { hasError: error };
  }

  componentDidCatch() {
    // 统计错误犯给服务器
  }

  render() {
    return <Fragment>{this.state.hasError ? <Error /> : <Child />}</Fragment>;
  }
}
```

## Fragment 和 空标签

React 要求 JSX 必须被一个根标签包裹，但该根标签也会被渲染为页面真实 DOM，容易导致页面会有多个无意义的标签

可以通过 `<Fragment>` 组件代替根组件包裹 JSX， `<Fragment>` 标签不会被解析为页面真实 DOM

```jsx
import React, { Component, Fragment } from "react";
export default class App extends Component {
  render() {
    return (
      <Fragment>
        <div>title</div>
        <div>content</div>
      </Fragment>
    );
  }
}
```

::: tip

- **`<Fragment>` 标签**

  因为不被解析为真实 DOM，不能添加标签属性<br>
  但是可以添加`key` 属性，即可写入遍历

- **`<>`空标签**

  不允许添加任何标签属性，不能写入遍历

:::

## 组件复用的模式

::: tip 可通过两种模式复用组件：

- render props 模式

  > 也可直接利用传递子节点，通过 `props.children`

- 高阶组件（HOC）模式

:::

### render props 模式

通过利用函数在组件外获取 组件的状态、方法 的做法

::: tip 使用：

使用组件时，将一个函数作为属性传递进去。函数的参数是组件的状态，该函数在组件内部被调用时便可暴露组件状态。函数的内容是要渲染的 JSX 结构，组件内不设定 UI 结构，渲染内容取决于组件调用时传入的函数

```jsx
<组件
  render={(要复用的组件状态) => {
    return <div>{/* 使用了公共状态的公共 JSX 结构 */}</div>;
  }}
/>
```

:::

> 如下：
>
> ```jsx
> import React, { Component } from "react";
> import pic from "src目录下地址";
> export default class Father extends Component {
>   render() {
>     return (
>       <div>
>         {/* 复用 */}
>         <Common
>           render={(state) => {
>             return (
>               <div>
>                 x:<p>{state.x}</p>
>                 y:<p>{state.y}</p>
>               </div>
>             );
>           }}
>         />
>
>         {/* 复用 */}
>         <Common
>           render={(state) => {
>             return (
>               <img
>                 src={pic}
>                 style={{
>                   position: "absolute",
>                   top: state.y,
>                   left: state.x,
>                 }}
>               />
>             );
>           }}
>         />
>       </div>
>     );
>   }
> }
> ```
>
> ```jsx
> import React, { Component } from "react";
> export default class Common extends Component {
>   state = {
>     x: 0,
>     y: 0,
>   };
>
>   move = (e) => {
>     this.setState({
>       x: e.clientX,
>       y: e.clientY,
>     });
>   };
>
>   componentDidMount() {
>     window.addEventListener("mousemove", this.move);
>   }
>   componentWillUnmount() {
>     window.removeEventListener("mousemove", this.move);
>   }
>   render() {
>     return this.props.render(this.state);
>   }
> }
> ```

也通过 `props.children`，详见 [组件 props 属性 的 children 属性]()

比起 render props 模式以 `prop`属性的方式传入函数的做法更直观

将函数作为组件的子节点传入，组件内通过的`props.children`获取函数并传入状态、方法

通过 props.children 实现组件复用：

```jsx
<组件>
  {(复用的组件状态) => {
    return <div>{/* 使用了公共状态的公共 JSX 结构 */}</div>;
  }}
</组件>
```

> 如下：
>
> ```jsx
> import React, { Component } from "react";
> import pic from "../assets/logo.jpeg";
>
> export default class Father extends Component {
>   render() {
>     return (
>       <div>
>         {/* 复用 */}
>         <Common>
>           {(state) => {
>             return (
>               <div>
>                 x:<p>{state.x}</p>
>                 y:<p>{state.y}</p>
>               </div>
>             );
>           }}
>         </Common>
>
>         {/* 复用 */}
>         <Common>
>           {(state) => {
>             return (
>               <img
>                 src={pic}
>                 style={{
>                   position: "absolute",
>                   top: state.y,
>                   left: state.x,
>                 }}
>               />
>             );
>           }}
>         </Common>
>       </div>
>     );
>   }
> }
> ```
>
> ```jsx
> import React, { Component } from "react";
> export default class Common extends Component {
>   state = {
>     x: 0,
>     y: 0,
>   };
>
>   move = (e) => {
>     this.setState({
>       x: e.clientX,
>       y: e.clientY,
>     });
>   };
>
>   componentDidMount() {
>     window.addEventListener("mousemove", this.move);
>   }
>   componentWillUnmount() {
>     window.removeEventListener("mousemove", this.move);
>   }
>   render() {
>     return this.props.children(this.state);
>   }
> }
> ```

### 高阶组件 (HOC) 模式

高阶组件（High-Order-Component）实际是个函数，

通过包裹包装其他组件的方式，来传递自身的状态最终实现复用高级组件

> 可理解为通过高级组件函数创建一个【通用外壳】组件
>
> 用该【通用外壳】来包装别的组件生成增强的组件
>
> 然后使用包装后的组件，实现组件的复用

::: tip 高阶组件的使用步骤：

1. 创建

   1. 创建一个的函数，命名以 `with` 开头

   2. 将需要被包装的组件作为参数传入该高阶组件函数

   3. 在函数内创建并返回一个类组件

   4. 该类组件中提供了要复用的状态 `state` 和状态处理代码

      并将状态 `state` 通过 `prop` 属性传递给参数接收的要被包装的组件

   5. 给高阶组件设定 `display` 属性

      被高级组件包装后的组件名由传入组件名决定

2. 使用

   1. 创建要被包装的组件

   2. 调用高级组件，传入要被包装的组件

      生成被高级组件包装后的增强组件

   3. 最后将该包装增强后的组件导入需要的组件

      实现对组件的复用

```jsx
// 创建高阶组件
function with自定义函数名(要被包装的组件) {
  class 组件 extends React.Component {
    state = {
      /* 状态 */
    };
    实例方法函数 = () => {
      /* 状态处理 */
    };

    render() {
      return <要被包装的组件 {...this.state} {...this.props} />;
    }
  }

  组件.displayName = "with自定义函数名" + getDisplayName(要被包装的组件);

  return 组件;
}

// 设置 高阶组件的 displayName
function getDisplayName(ComponentWarpped) {
  return ComponentWarpped.displayeName || ComponentWarpped.name;
}

// 创建要被包装的组件
const 要被包装的组件 = (props) => <div>{/* 内容 */}</div>;

// 获取被高级组件包装增强后的组件
const 被包装后的组件 = 高级组件(要被包装的组件);

// 使用
class 使用被包装后组件的组件 extends React.Component {
  render() {
    return (
      <div>
        {/* 其余内容 */}
        <被包装后的组件 />
        {/* 其余内容 */}
      </div>
    );
  }
}
```

:::

> 如下：
>
> ```jsx
> function withMouse(ComponentWarpped) {
>     class Mouse extends React.Component {
>         state = {
>             x: 0,
>             y: 0
>         }
>         handle = e => {
>             this.setState({
>                 x: e.clientX,
>                 y: e.clientY,
>             })
>         }
>         componentDidMount() {
>             window.addEventListener('mousemove', this.handle)
>         }
>         componentWillUnmount() {
>             window.removeEventListener('mousemove', this.handle)
>         }
>         render() {
>             return (
>                 <ComponentWarpped
>                   {...this.state}
>                   {...this.props}
>                 />
>             )
>         }
>     }
> 		Mouse.displayName = `WithMouse ${getDisplayName(ComponentWarpped)}`
>
> 		return Mouse
> }
> // 设置 高阶组件的 displayName
> function getDisplayName(ComponentWarpped){
>   return ComponentWarpped.displayeName || ComponentWarpped.name
> }
>
>
> const MousePosition = props => (
> 	<div>
>   	x: <p>{this.props.x}</p>
>     y: <p>{this.props.y}</p>
>   </div>
> )
> const PicMovement = props => (
> 	<img
>     src={pic}
>     style={{
>       postion: 'absolute'
>       top: props.y
>       left: props.x
>     }}
>   />
> )
>
> const EnhancedMousePosition = withMouse(MousePosition)
> const EnhancedPicMovement = withMouse(PicMovement)
>
> class Demo01 extends React.Component {
>   render(){
>     return (
>     	<div>
>         { /* 复用例 */}
>         <EnhancedMousePosition />
>         { /* 复用例 */}
>         <EnhancedPicMovement />
>       </div>
>     )
> 	}
> }
> ```
