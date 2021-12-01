# JSX 语法

![](https://miro.medium.com/max/650/1*rJB4Tcz_ZZnliNxYmdfGqw.jpeg)

[[toc]]

## JSX 简介

**JSX**（**J**ava**S**cript **X**ML）可理解为原生 JS 的语法扩展

React 使用 JSX 替代常规的 JavaScript，使其可以在 JS 中书写 XML/HTML 来描述用户界面。

是`createElement`创建组件方式的 **语法糖**

::: tip CDN 引入（正经开发不会用）

JSX 需要在引入 babel.js 进行编译后才可被浏览器识别

```html
<body>
  <!-- 创建容器 -->
  <div id="root"></div>

  <!-- 1. 引入react核心库 -->
  <script
    crossorigin
    src="https://unpkg.com/react@16/umd/react.development.js"
  ></script>
  <!-- 2. 引入react-dom，操作DOM -->
  <script
    crossorigin
    src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"
  ></script>
  <!-- 3. 引入babel 将JSX转为JS-->
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>

  <!-- 代码 type使用babel编译解析JSX -->
  <script type="text/babel">
    const VDOM = <h1>Hello React</h1>;
    ReactDOM.render(VDOM, document.getElementById("root"));
  </script>
</body>
```

:::

---

::: tip React 脚手架

JSX 结构可直接在 **.js 文件** 或 **.jsx 文件**的中书写

因为 React 脚手架已内置了 babel 编译

```js
|- components
	|- Nav.jsx
	|- Bar.jsx
|- App.js
```

:::

## 为何使用 JSX

### JS 的问题

React 中需要先创建虚拟 DOM，然后再渲染为页面上真实 DOM。

若使用原生 JS 创建虚拟 DOM，需要通过 `React.createElement()`

```js
import React from "react";
import ReactDOM from "react-dom";

ReactDOM.render(
  React.createElement(component, props, childrens),
  document.getElementById("root")
);
```

> - 书写繁琐不优雅
> - 结构不直观语义不清晰
> - 开发中不会用到 React.createElement()
>
> 如下：
>
> ```js
> React.createElement(
>   "div",
>   { className: "list" },
>   "Hello React",
>   React.createElement("h1", null, "h1 content"),
>   React.createElement(
>     "ul",
>     null,
>     React.createElement("li", null, "item content"),
>     React.createElement("li", null, "item content")
>   )
> );
> ```

### JSX 的优势

使用 JSX 书写 HTML 结构的话：

```jsx
import React from "react";
import ReactDOM from "react-dom";

const VDOM = (
  <div>
    <div></div>
    <div></div>
  </div>
);

ReactDOM.render(VDOM, document.getElementById("root"));
```

> - 声明式语法，直观简洁
> - 结构与 HTML 相同
> - 所以实际开发中常使用
>
> 如下：
>
> ```jsx
> <div className="list">
>   Hello React
>   <h1>h1 content</h1>
>   <ul>
>     <li>item content</span>
>     <li>item content</span>
>   </p>
> </div>
> ```

## JSX 语法规则

### 1. 小括号包裹 JSX

```jsx
const VDOM = <div>hello</div>;
```

### 2. 一个根标签

```jsx
const VDOM = (
  <div>
    <div></div>
    <div></div>
  </div>
);
```

### 3. JSX 标签要闭合

若标签无子节点，也可自闭合

```jsx
const VDOM = (
  <div>
    <div />
    <input />
  </div>
);
```

### 4. JSX 标签名

::: tip JSX 标签首字母大小写的不同：

- 若 JSX 标签的首字母是**小写**：<br>
  渲染为同名 **HTML 标签**

- 若 JSX 标签的首字母是**大写**：<br>
  渲染同名 **React 组件**

:::

```jsx
const VDOM = (
  <div>
    <div></div>
    <Component></Component>
  </div>
);
```

### 5. 标签属性驼峰命名

### 6. 特殊属性

> - class——> ClassName
> - for——> htmlFor

## 样式处理

### style 行内样式

- Obj 对象不能直接嵌入 JSX 结构 ，仅能用于 style 行内样式
- 属性名使用驼峰命名

```jsx
<div style={{ 属性: "值", 属性: "值" }}></div>
```

> 如下：
>
> ```jsx
> <div style={{
>  	backgroundColor: 'red',
>   lineHeight: '1rem',
>   fontSize: '12px'
>   padding: '1rem 2rem',
>   margin: '1rem'
> }}>
> </div>
> ```

### className 类名

标签中写入 CSS 的 class 类名时使用 **className**

::: danger 报错
Warning: Invalid DOM property `class`. Did you mean `className`?
:::

因为 class 是 ES6 中的 Class 类的关键字，为了避免使用关键字

```jsx
<div className="类名"></div>
```

> 样式可以通过 css 文件的方式引入
>
> 如下：
>
> ```jsx
> import "./styles/index.css";
>
> ReactDOM.render(
>   <div>
>     <h1 className="title red-text">Hello</h1>
>   </div>,
>   document.getElementById("root")
> );
> ```

## 嵌入内容

::: tip JSX 中可以嵌入：

- JavaScript 表达式
- JavaScript 注释
- 嵌套其他 JSX 结构

:::

::: tip JSX 中不可以嵌入：

- 对象 obj 仅适用于 style 样式
- JavaScript 语句

:::

### JS 表达式

JSX 语法不能直接使用 JS 语法，必须放入花括号 **{ }**

```jsx
{
  JS表达式;
}
```

> 如下：
>
> ```jsx
> import src from "./o1.jpg";
> const name = "andy";
>
> const VDOM = (
>   <div>
>     <div>my name is {name}</div>
>     <div id={name.slice(0, 1)}></div>
>     <div>{name.toUpperCase()}</div>
>     <img src={src} />
>   </div>
> );
> ```

### 嵌入注释

注释属于 JS，也要放入 **`{ }`**

```jsx
{
  /* 注释 */
}
```

> 如下：
>
> ```jsx
> const VDOM = (
>   <div>
>     {/* 注释 */}
>     <h1>Hello React</h1>
>     {/* 注释 */}
>   </div>
> );
> ```

### 嵌入 JSX

JSX 结构本身就是 JS 的语法糖，也要放入 **`{ }`**

```jsx
{
  JSX结构;
}
```

> 如下：
>
> ```jsx
> const child01 = <div>Child01</div>;
> const child02 = <div>Child01</div>;
>
> const Father = (
>   <div>
>     {child01}
>     {child02}
>   </div>
> );
> ```

### 动态遍历数组

JSX 结构中若插入一个数组，React 会自动遍历数组元素渲染到页面

```jsx
const data = ["Reacr", "Vue", "angular"];

ReactDOM.render(<div> {data} </div>, document.getElementById("root"));
```

## 条件渲染

根据特定条件判断是否渲染出指定的 JSX 结构

### 判断方式

::: tip JSX 中可使用的条件渲染判断方式：

- **`if else` 语句**

  ```jsx
  if (isLoading) {
    return <img src="/loading.gif" alt="loading" />;
  }
  return <div>加载完成</div>;
  ```

- **三元运算符**

  ```jsx
  return (
    isLoading
    	? (<img src="/loading.gif"/>)
    	: (<div>加载完成</div>) ;
  )
  ```

- **逻辑与运算符**

  仅用于判断是否显示，而不能选择渲染哪一个 JSX 结构

  ```jsx
  return isLoading && <img src="/loading.gif" />;
  ```

:::

### 实例

> 比如：
>
> 判断加载 loading 图标是否显示
>
> ```jsx
> import src from "./loading.svg";
>
> const loading = (isLoading) => {
>   return isLoading ? <img src={src} alt="" /> : <div>加载完成</div>;
> };
>
> export default function Demo() {
>   return (
>     <div>
>       {loading(false)} {/*加载完成*/}
>       {loading(true)} {/*加载中*/}
>     </div>
>   );
> }
> ```

> 比如：
>
> 结合[列表渲染](#列表渲染)，当数据不为空时渲染列表
>
> ```jsx
> import React, { Component } from "react";
>
> export default class Demo extends Component {
>   state = {
>     list: [
>       { id: 1, name: "adny", contnet: "hello,iam andy" },
>       { id: 2, name: "tom", contnet: "hello,iam tom" },
>       { id: 3, name: "lili", contnet: "hello,iam lili" },
>     ],
>   };
>
>   showList = () => {
>     return this.state.list.length === 0 ? (
>       <h3>没有评论...</h3>
>     ) : (
>       <ul>
>         {this.state.list.map((item) => (
>           <li key={item.id}>
>             <h3>{item.name}</h3>
>             <p>{item.contnet}</p>
>           </li>
>         ))}
>       </ul>
>     );
>   };
>
>   render() {
>     return (
>       <div>
>         <h1>列表</h1>
>         {this.showList()}
>       </div>
>     );
>   }
> }
> ```

## 列表渲染

JSX 中渲染一组数据到页面需要通过数组的 **map()** 方法

### map()

::: tip 为何使用 map() ?

借助 [React 会动态遍历 JSX 中的数组](#动态遍历数组) 这一特性，

通过数组的 `map()` 方法将数组元素数据嵌入 JSX 结构中映射为 HTML，

然后由 React 将包含了嵌入了数据的 JSX 结构的这个新数组 遍历生成到页面

:::

> 如下：
>
> ```jsx
> const list = [
>   { name: "andy", age: 28 },
>   { name: "lili", age: 14 },
>   { name: "tom", age: 20 },
> ];
>
> ReactDOM.render(
>   <ul>
>     {list.map((item) => (
>       <li>
>         {item.name} - {item.age}
>       </li>
>     ))}
>   </ul>,
>   document.getElementById("root")
> );
> ```
>
> 但是！该例子会报错！
> ::: danger 每一个子节点需要唯一标识 key
>
> Warning: Each child in a list should have a unique "key" prop.
>
> :::

### 唯一标识 key

渲染列表时，每一个虚拟子节点都要有个唯一的标识 **key 属性**

key 必须要是唯一标识，比如 id，但最好不要用可变的 index

::: tip 为何 key 不能用 index

- 添加数据、修改数据顺序等 **破坏顺序的操作**时：<br>

  - 使原本序号顺序变化而导致全部重新渲染，效率低下
  - 若页面真实 DOM 中包含 **输入类 DOM**（表单）<br>
    会因为虚拟 DOM 顺序错乱导致真实 DOM 数据残留

- 若仅是简单展示数据，不存在数据顺序操作和数据添加的话，<br>
  也可使用 index 作为 key 属性

:::

### 实例

> 在脚手架的组件化开发中：
>
> ```jsx
> import React, { Component } from "react";
> export default class Demo extends Component {
>   state = {
>     list: [
>       { id: 1, name: "adny", contnet: "hello,iam andy" },
>       { id: 2, name: "tom", contnet: "hello,iam tom" },
>       { id: 3, name: "lili", contnet: "hello,iam lili" },
>     ],
>   };
>
>   render() {
>     return (
>       <div>
>         {this.state.list.map((item) => (
>           <li key={item.id}>
>             <h3>{item.name}</h3>
>             <p>{item.contnet}</p>
>           </li>
>         ))}
>       </div>
>     );
>   }
> }
> ```

## JSX 转换机制

::: tip JSX 在 React 内部的转化步骤：

> JSX —> React.createElement() —> React 对象

1. 脚手架通过内置的 **@babel/preset-react** 插件

   将 JSX 语法编译为原生 JS 的 `createElement()` 方法创建组件 UI

   ```jsx
   const element = (
     <h1 className="title">
      Hello JSX
     </h1>
   );
   ```

   ```js
   const element = React.createElement(
     "h1",
     { className: "title" },
     "Hello JSX"
   );
   ```

2. `createElement()` 方法 内部转化 JS 对象形式的 React 元素
   ```js
   const element = {
     type: "h1",
     props: {
       className: "title",
       children: "Hello JSX",
     },
   };
   ```

:::
