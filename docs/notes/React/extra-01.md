# setState()

![](https://i2.wp.com/css-tricks.com/wp-content/uploads/2018/04/setState.jpg?fit=1200%2C600&ssl=1)

类组件中的数据更新修改是通过 `setState()` 方法

## 两种写法

调用 `setState()` 通过传递参数来修改组件状态 `state` 中数据，

::: tip 参数可以是对象也可以是函数：

- **对象形式**：

  ```jsx
  this.setState({
    数据: 值,
    数据: 值,
  });
  ```

- **回调函数函数形式**：

  ```jsx
  this.setState((state, props) => {
    数据: 值,
    数据: 值,
  })
  ```

  > 详见下文 [第一个回调函数](#第一个回调函数)

  ```jsx
  this.setState(
    (state, props) => {},
    () => {}
  );
  ```

  > 详见下文 [第二个回调函数](#第二个回调函数)

:::

## 异步更新

`setState()` 是**异步更新**

被调用后组件状态 `state` 中数据并没被立刻改变

> 验证如下：
>
> 调用 `setState()` 后立即打印 `state` 中 `num` 验证，可见并未被立刻修改
>
> ```jsx
> import React, { Component } from "react";
> export default class Demo extends Component {
>   state = { num: 1 };
>
>   add = () => {
>     this.setState({ num: this.state.num + 1 });
>     console.log(this.state.num); // 并没有被立刻改变,还是 1
>
>     this.setState({ num: this.state.num + 1 });
>     console.log(this.state.num); // 并没有被立刻改变,还是 1
>   };
>
>   render() {
>     return (
>       <div>
>         <p>{this.state.num}</p>
>         <button onClick={this.add}>num+1</button>
>       </div>
>     );
>   }
> }
> ```

## 多次调用

`setState()` 可被调用多次，但 React 处于性能考虑进行了统一整合，

即使多次调用修改最终也统一整合后修改

> 验证：只调用了一次 `render()`

```jsx
import React, { Component } from "react";
export default class Demo extends Component {
  state = { num: 1 };

  add = () => {
    this.setState({ num: this.state.num + 1 });
    this.setState({ num: this.state.num + 1 });
  };

  render() {
    console.log("render");
    return (
      <div>
        <p>{this.state.num}</p> {/* 每次只加 1 */}
        <button onClick={this.add}>num+1</button>
      </div>
    );
  }
}
```

## 无限递归

setState() 是数据驱动视图，又能更新状态又能更新 UI：

::: tip

1. 先修改 state 中的数据
2. 然后渲染数据到页面，更新 UI

:::

所以在更新阶段生命周期中调用 `setstate()`容易出现无限递归问题

- [render() 中](<#render()中>)
- [componentDidUpdate() 中](<#componentDidUpdate()中>)

#### render() 中

`setState()` 不能放在在 `render()` 中，会导致无限递归

- `render()` 在每次组件渲染时候调用
- `setState()` 不但修改状态又能渲染数据
  > ```jsx
  > import React, { Component } from "react";
  > export default class Demo extends Component {
  >   render() {
  >     this.setState({}); // 报错
  >     return <div></div>;
  >   }
  > }
  > ```
  >
  > ::: danger 无限递归无限循环
  >
  > Error: Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. React limits the number of nested updates to prevent infinite loops.
  > :::

#### componentDidUpdate() 中

`setState()` 也不能直接放在生命周期钩子 `componentDidUpdate ()` 中，

必须通过 `if` 条件判断，否则也会导致无限递归

- `componentDidUpdate()` 在组件完成更新时调用，
- `setState()` 修改了状态会导致组件更新
  > ```jsx
  > import React, { Component } from "react";
  > export default class Demo extends Component {
  >   componentDidUpdate() {
  >     this.setState({}); // 报错
  >   }
  >   render() {
  >     return <div></div>;
  >   }
  > }
  > ```
  >
  > ::: danger 无限递归无限循环
  >
  > Error: Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. React limits the number of nested updates to prevent infinite loops.
  > :::

## 回调函数形式

### 第一个回调函数

> 因为 `setState()` 是异步操作，若多个 `setState()` 连用，后面的 `setState()` 中的 `this.state` 数据还是原值不是最新值，并没有被前一个 `setState()` 修改

若想在 `setState()` 中获取上一次修改后的最新状态的数据，

::: tip 需要调用 setState() 时传入函数形式的参数：

- 函数参数 `state`：最新的状态`state`

- 函数参数 `props`：最新的 `props`

- 函数返回值用对象形式对组件状态中数据更新

:::
函数参数的 `setState` 写法还是异步任务

```js
this.setState((state, props) => {
  return {
    状态数据: state.状态数据,
  };
});
```

> 如下：第二次修改时的状态是上一次修改后的最新状态
>
> ```jsx
> import React, { Component } from "react";
> export default class Demo extends Component {
>   state = {
>     num: 1,
>   };
>
>   add = () => {
>     this.setState((state, props) => {
>       return {
>         num: state.num + 1,
>       };
>     });
>     this.setState((state, props) => {
>       console.log(this.state.num); // 2
>       return {
>         num: state.num + 1,
>       };
>     });
>     console.log(this.state.num); // 还是异步，数据还是1
>   };
>
>   render() {
>     return (
>       <div>
>         <p>{this.state.num}</p> {/* 每次+2 */}
>         <button onClick={this.add}>num+1</button>
>       </div>
>     );
>   }
> }
> ```

### 第二个回调函数

函数形式写法的 `setState()` 还可写第二个参数，

第二个参数也是个回调函数。在状态更新并渲染后立刻执行，功能类似生命周期钩子 `componentDidUpdate()`

```jsx
this.setState(
  (state, props) => {
    return {
      /* 更新状态 */
    };
  },
  () => {
    // 状态更新后立即执行
  }
);
```

```jsx
import React, { Component } from "react";

export default class B extends Component {
  state = { num: 1 };

  add = () => {
    this.setState(
      (state, props) => {},
      () => {
        document.title = "hello demo";
      }
    );
  };

  render() {
    console.log("render");
    return (
      <div>
        <p>{this.state.num}</p>
        <button onClick={this.add}>num+1</button>
      </div>
    );
  }
}
```
