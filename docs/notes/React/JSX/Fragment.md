# Fragment 和 空标签<></>

React 要求 JSX 必须被一个根标签包裹，默认是`<div><div/>`

但根标签也会被渲染为页面上的真实 DOM，导致页面最终出现有多个无意义的标签

若不想有真实的 DOM 节点可使用`<React.Fragment>`或空标签`<></>`来包裹组件

## React.Fragment

可以通过 **`<React.Fragment>`** 组件代替根组件包裹 JSX

**`<React.Fragment>`** 标签不会被解析为页面真实 DOM

因为不被解析为真实 DOM，所以不能添加标签属性，但可以被遍历并添加唯一标记`key`

只能传递`key`这一个属性

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

## 空标签<></>

`<></>`是`<React.Fragment>`的语法糖

主要用于不需要被一个实体的父元素或者根元素包裹的场合

不允许添加任何标签属性，不能入被遍历

如下：

> 用于根标签

```jsx
import React, { Component } from "react";

export default class Demo extends Component {
  render() {
    return (
      <>
        <div>1</div>
        <div>2</div>
      </>
    );
  }
}
```

如下：

> 用于父元素
>
> 如下穿插的表格中结构中不能出现`<div></div>`，所以可使用空标签

```jsx
import { Component } from "react";

export default class App extends Component {
  state = {
    name: "andy",
    age: "28",
  };

  const table = ()=>{
    return (
      <>
        <td> {this.state.name} </td>
        <td> {this.state.age} </td>
      </>
    );
  }

  render() {
    return (
      <table>
        <thead></thead>
        <tbody>
          <tr>{this.tableData()}</tr>
        </tbody>
      </table>
    );
  }
}
```
