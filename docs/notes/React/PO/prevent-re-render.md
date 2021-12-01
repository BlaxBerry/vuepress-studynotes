# 避免重复渲染子组件

React 的默认更新机制是：只要父组件的重新渲染子组件也会重新渲染

即使子组件中没用到的状态变化也会导致子组件进行无意义的渲染，若子组件无关的数据变化子组件是没必要跟着父组件一起更新的，所以需要进行限制来避免不必要重新渲染

[[toc]]

## 类组件

::: tip 类组件的解决方法

- **方法一：`shouldComponentUpdate`生命周期钩子**

- **方法二： 类组件继承`React.PureComponent`**

:::

### React.PureComponent

子组件创建时继承`React.PureComponent`而不是`React.Component`

```jsx
import React, { PureComponent } from "react";

export default class Demo extends PureComponent {
  constructor(props) {
    super(props)
  }
  render(<></>)
}
```

### shouldComponentUpdate()

生命周期钩子`shouldComponentUpdate`在组件重新渲染执行前调用，

根据该钩子函数返回值决定是否渲染该组件

```jsx
shouldComponentUpdate(更新后的props, 更新后的tate){
  // 比较 newProps, newState 与 this.newProps, this.newState
  return true 或 false
}
```

::: tip 使用步骤:

1. 子组件内通过`shouldComponentUpdate`的参数获取变化后的`props`、`state`

2. 比较更新跟前后的`props`、`state`

3. 返回比较结果`true`或`false`

:::

::: tip 根据 return 比较的返回值决定是否渲染:

返回值为 **true**：重新渲染该组件

返回值为 **false**：不渲染该组件

:::

::: tip 比较的双方:

**子组件自身状态的前后变化**：<br/>
比较`newState.状态`与`this.state.状态`

**父组件传递的状态与子组件自身的状态：**<br/>
比较`newProps.状态`与`this.props.状态`

:::

#### 实例：比较自身状态

```jsx
import React, { Component } from "react";
export default class Demo extends Component {
  state = { randomNum: 0 };

  getNum = () => {
    this.setState(() => ({
      randomNum: Math.random(),
    }));
  };

  shouldComponentUpdate(newProps, newState) {
    return !(newState.randomNum === this.state.randomNum);
  }

  console.log('rendered')

  render() {
    return (
      <>
        <p>{this.state.randomNum}</p>
        <button onClick={this.getNum}>生成新的随机数</button>
      </>
    );
  }
}
```

#### 实例：比较父组件传递的状态与子组件自身的状态

```jsx
// 子组件
import React, { Component } from "react";
class Child extends Component {

  shouldComponentUpdate(newProps, newState) {
    return !(newProps.num === this.props.num);
  }

  console.log('rendered')

  render() {
    return <h1>{this.props.num}</h1>;
  }
}
```

```jsx
// 父组件
import React, { Component } from "react";
export default class Father extends Component {
  state = { randomNum: 0 };

  getNum = () => {
    this.setState(() => ({
      randomNum: Math.floor(Math.random() * 5), // 0~4
    }));
  };

  render() {
    return (
      <div>
        <Child num={this.state.randomNum} />

        <button onClick={this.getNum}>生成新的随机数</button>
      </div>
    );
  }
}
```

## 函数组件

::: tip 函数组件的解决方法：

- **方法一： 导出`React.memo()`，函数组件作为参数**

- **方法二： `useMemo()`**

- **方法三： `useCallback()`**

:::

### React.memo

不再直接暴露函数组件，而是将函数组件作为`React.memo()`这个方法的参数，

然后暴露 `React.memo()`这个方法

```jsx
import React from "react";
export default React.memo(函数组件);
```

如下：

> 父组件中有两个状态`num`和`age`，仅传递`num`给子组件，
>
> 子组件仅在`num`变化时才会重新渲染

```jsx
// Son组件
import React from "react";

export default React.memo((props) => {
  console.log("子组件渲染"); // 调用 n+1 次（仅父组件中num改变时）

  return <h3>{props.num}</h3>;
});
```

```jsx
// Father组件
import React from "react";
import Son from "./Son";
import { useState } from "react";

export default function Father() {
  const [num, setNum] = useState(0);
  const [age, setAge] = useState(20);

  return (
    <div>
      <Son num={num} />
      <button onClick={() => setNum(num + 1)}>num +1</button>

      <h3>{age}</h3>
      <button onClick={() => setAge(age + 1)}>age +1</button>
    </div>
  );
}
```

### useMemo()

### useCallback()

https://reffect.co.jp/react/react-memo#useMemo
