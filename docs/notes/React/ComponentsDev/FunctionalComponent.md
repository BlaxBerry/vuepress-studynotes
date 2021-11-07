# React 函数组件

![](https://cdn-ssl-devio-img.classmethod.jp/wp-content/uploads/2019/07/react.jpg)

[[toc]]

## 组件创建与使用

React 以 JS 中函数定义的组件

### 创建

::: tip Reac 对函数创建组件的要求：

- 函数名即组件名，必须**首字母大写**

- 函数必须有返回值，**返回 JSX 结构** 作为组件要渲染的内容

  若返回值为 `null` ，则该组件不渲染任何内容

```jsx
function 组件名() {
  return <div>函数组件</div>;
}

// 或用箭头函数的方式

const 组件名 = () => {
  return <div>函数组件</div>;
};
```

:::

### 独立文件

每个 `.js` 或 `.jsx` 文件就是一个组件

- 每个文件中必须 **`import from`** 导入 **`React`**
- 每个组件必须要被 **`export default` 导出**，以供其他组件引用

> 如下：
>
> ```jsx
> import React from "react";
>
> export default function 组件名() {
>   return <div>函数组件</div>;
> }
> ```
>
> 或箭头函数的方式
>
> ```jsx
> import React from "react";
>
> const App = () => {
>   return <div>函数组件</div>;
> };
>
> export default App;
> ```

### 使用

函数式组件使用 JSX 标签的形式渲染到页面，函数名为标签名

> 如下：脚手架中的 `index.js` 入口文件：
>
> ```jsx
> import React from 'react';
> import ReactDOM from 'react-dom';
> import App from './App';
>
> ReactDOM.render(){
>   <App/>,
> 	document.getElementById('root')
> }
> ```

### 函数组件的 this

**函数组件中没有 this**（`undefined`）

## 事件处理

### 事件绑定与使用

React 中事件名用驼峰命名

```js
// 触发事件时才调用函数
on + 事件名 = { 函数 }

// 绑定事件的元素挂载到页面时就调用函数,后续不会再被触发
on + 事件名 = { 函数() }
```

```jsx
<div onClick={ 函数 }></div>
<div onMouseEnter={ 函数 }></div>
```

> 如下：
>
> ```jsx
> import React from "react";
>
> export default function A() {
>   function fun() {
>     console.log("clicked");
>   }
>
>   return (
>     <div>
>       <button onClick={fun}>点击</button>
>     </div>
>   );
> }
> ```
>
> 箭头函数定义方法：
>
> ```jsx
> import React from "react";
>
> export default function A() {
>   const fun = () => {
>     console.log("clicked");
>   };
>
>   return (
>     <div>
>       <button onClick={fun}>点击</button>
>     </div>
>   );
> }
> ```

### 事件对象

通过事件处理程序的方法的参数获取事件对象

React 中的事件对象叫着 **合成事件**，兼容所有浏览器

函数组件中的事件对象的使用如下：

```jsx
function 方法(事件对象) {
  //使用事件对象
}

return (
  <div>
    <标签 on事件={方法} />
  </div>
);
```

> 如下：
>
> ```jsx
> import React from "react";
>
> export default function A() {
>   function fun(e) {
>     e.preventDefault(); // 阻止默认行为
>     console.log(e);
>   }
>
>   return (
>     <div>
>       <a href="http://www.baidu.com" onClick={fun}>
>         点击
>       </a>
>     </div>
>   );
> }
> ```

## props

函数组件中没有 `this` ，没有类组件的 `state`、`context`、`refs`

但是可通过参数形式接收 `props`属性

`props` 属性用于接收来自组件外部传递的数据

`props` 是只读属性，不可被修改

::: tip 函数组件中 `props` 接收传递数据的步骤：

1. 数据作为 JSX 标签的属性传入组件

2. 子组件通过函数**参数**接收 `props`

   ```jsx
   <子组件 自定义属性=传递的数据/>
   ```

   ```jsx
   import React from "react";
   export default function 子组件(props) {
     console.log(props);
   
     return <div>{props.自定义属性}</div>;
   }
   ```

:::

`prop` 属性可以传递任何数据

但非字符串数据要用 `{}` 包裹

> ```jsx
> <Demo
>   str="hello"
>   num={100}
>   arr={[1, 2, 3]}
>   fun={(a, b) => {
>     return a + b;
>   }}
>   tag={<div>Hello</div>}
> />
> ```
>
> ```jsx
> import React from "react";
>
> export default function Demo(props) {
>   console.log(props.str); // hello
>   console.log(props.num); // 100
>   console.log(props.arr); // [1,2,3]
>
>   const res = props.fun(10, 20);
>   console.log(res); // 30
>
>   return <div>{props.tag}</div>;
> }
> ```

