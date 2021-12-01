# 类组件复用

::: tip 复用组件的几种模式：

- render props 模式

- 通过 `props.children`直接传递子节点

- 高阶组件（HOC）模式

:::

## render props 模式

利用函数在组件外获取组件的状态、方法

### 使用

使用被复用组件时，传入一个函数作为组件属性。

被复用的组件内不设定 UI 结构，渲染内容取决于组件复用调用时传入的函数。

传入的函数的内容是要渲染的 JSX 结构，

传入的函数的参数是被复用组件的状态，该函数在被复用组件内部被调用时便可暴露组件状态。

```jsx
// 父组件中复用
<被复用的组件
  自定义方法名={(被复用组件中的状态) => {
    return <>{/* 使用了公共状态的公共 JSX 结构 */}</>;
  }}
/>
```

### 实例

如下：

```jsx
// 子组件（被复用者）
import React, { Component } from "react";
export default class Common extends Component {
  state = {
    x: 0,
    y: 0,
  };

  move = (e) => {
    this.setState({
      x: e.clientX,
      y: e.clientY,
    });
  };

  componentDidMount() {
    window.addEventListener("mousemove", this.move);
  }
  componentWillUnmount() {
    window.removeEventListener("mousemove", this.move);
  }
  render() {
    return this.props.render(this.state);
  }
}
```

```jsx
// 父组件（使用者）
import React, { Component } from "react";
import pic from "src目录下地址";
export default class Father extends Component {
  render() {
    return (
      <>
        {/* 复用 */}
        <Common
          render={(state) => {
            return (
              <div>
                x:<p>{state.x}</p>
                y:<p>{state.y}</p>
              </div>
            );
          }}
        />

        {/* 复用 */}
        <Common
          render={(state) => {
            return (
              <img
                src={pic}
                style={{
                  position: "absolute",
                  top: state.y,
                  left: state.x,
                }}
              />
            );
          }}
        />
      </>
    );
  }
}
```

## props.children

通过 `props.children`，详见 [类组件的 props.children 属性](../Components/Class/ClassComponent.md#children-属性)

比起 `render props 模式`以属性的方式传入函数的做法更直观

### 使用

将一个函数作为被复用组件的子节点传入

被复用组件内通过的`props.children.函数名`获取并调用传入的函数

被复用组件调用该函数时将自身的状态、方法作为参数传入

```jsx
<被复用组件>
  {(被复用组件的状态) => {
    return <>{/* 使用了公共状态的公共 JSX 结构 */}</>;
  }}
</组件>
```

### 实例

如下：

```jsx
// 被复用组件
import React, { Component } from "react";
export default class Common extends Component {
  state = {
    x: 0,
    y: 0,
  };

  move = (e) => {
    this.setState({
      x: e.clientX,
      y: e.clientY,
    });
  };

  componentDidMount() {
    window.addEventListener("mousemove", this.move);
  }
  componentWillUnmount() {
    window.removeEventListener("mousemove", this.move);
  }
  render() {
    return this.props.children(this.state);
  }
}
```

```jsx
// 父组件（使用者）
import React, { Component } from "react";
import pic from "../assets/logo.jpeg";
export default class Father extends Component {
  render() {
    return (
      <>
        {/* 复用 */}
        <Common>
          {(state) => {
            return (
              <div>
                x:<p>{state.x}</p>
                y:<p>{state.y}</p>
              </div>
            );
          }}
        </Common>

        {/* 复用 */}
        <Common>
          {(state) => {
            return (
              <img
                src={pic}
                style={{
                  position: "absolute",
                  top: state.y,
                  left: state.x,
                }}
              />
            );
          }}
        </Common>
      </>
    );
  }
}
```

## 高阶组件 (HOC) 模式

高阶组件（High-Order-Component）实际是个函数，

通过包裹包装其他组件的方式，来传递自身的状态最终实现复用高级组件

> 可理解为通过高级组件函数创建一个【通用外壳】组件
>
> 用该【通用外壳】来包装别的组件生成增强的组件
>
> 然后使用包装后的组件，实现组件的复用

### 步骤

#### 1. 创建

1.  创建一个的函数，命名以 `with` 开头

2.  将需要被包装的组件作为参数传入该高阶组件函数

3.  在函数内创建并返回一个类组件

4.  该类组件中提供了要复用的状态 `state` 和状态处理代码

    并将状态 `state` 通过 `prop` 属性传递给参数接收的要被包装的组件

5.  给高阶组件设定 `display` 属性

    被高级组件包装后的组件名由传入组件名决定

#### 2. 使用

1.  创建要被包装的组件

2.  调用高级组件，传入要被包装的组件

    生成被高级组件包装后的增强组件

3.  最后将该包装增强后的组件导入需要的组件

    实现对组件的复用

```jsx
// 设置 高阶组件的 displayName
function getDisplayName(ComponentWarpped) {
  return ComponentWarpped.displayeName || ComponentWarpped.name;
}

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
```

```jsx
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

### 实例

如下：

```jsx
function withMouse(ComponentWarpped) {
 class Mouse extends React.Component {
     state = {
         x: 0,
         y: 0
     }
     handle = e => {
         this.setState({
             x: e.clientX,
             y: e.clientY,
         })
     }
     componentDidMount() {
         window.addEventListener('mousemove', this.handle)
     }
     componentWillUnmount() {
         window.removeEventListener('mousemove', this.handle)
     }
     render() {
         return (
             <ComponentWarpped
               {...this.state}
               {...this.props}
             />
          )
      }
  }
 		Mouse.displayName = `WithMouse ${getDisplayName(ComponentWarpped)}`

 		return Mouse
 }
 // 设置 高阶组件的 displayName
 function getDisplayName(ComponentWarpped){
 return ComponentWarpped.displayeName || ComponentWarpped.name
 }


 const MousePosition = props => (
 	<div>
 	x: <p>{this.props.x}</p>
  y: <p>{this.props.y}</p>
 </div>
 )
 const PicMovement = props => (
 	<img
  src={pic}
  style={{
    postion: 'absolute'
    top: props.y
    left: props.x
  }}
 />
 )

 const EnhancedMousePosition = withMouse(MousePosition)
 const EnhancedPicMovement = withMouse(PicMovement)

 class Demo01 extends React.Component {
 render(){
  return (
  	<div>
      { /* 复用例 */}
      <EnhancedMousePosition />
      { /* 复用例 */}
      <EnhancedPicMovement />
    </div>
  )
 	}
 }
```
