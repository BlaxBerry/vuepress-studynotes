# React-Router-Dom

![](https://ichi.pro/assets/images/max/724/1*TVd_sNhpc7JDPBHAsAOQZg.jpeg)

**React-Router-Dom** 是官方路由插件库 React-Router 中专门用于实现 SPA 应用的路由的

> SPA 应用中的前端路由是一组**URL 路径**和**组件**的对应关系

[[toc]]

## 基本使用

::: tip 声明式导航步骤

1. 安装 **react-router-dom**

   ```bash
   yarn add react-router-dom
   # 或
   npm i react-router-dom
   ```

2. 导入路由核心组件 **Router、Route、Link**

   ```js
   import { BrowserRouter as Router, Route, Link } from "react-router-dom";
   ```

3. **Router** 组件包裹整个应用

   ```jsx
   const App = () => (
     <Router>
       <div className="App"></div>
     </Router>
   );
   ```

4. **Link** 组件创建路由链接作为作为路由入口（导航菜单）

   ```jsx
   <Link to="/路径">内容</Link>
   ```

5. **Route** 组件配置路由规则与路由出口（匹配路径的组件）

   ```jsx
   <Route path="/路径" component={组件} />
   ```

:::

> 如下： App.js 文件
>
> ```jsx
> import React, { Component } from "react";
> import { BrowserRouter as Router, Route, Link } from "react-router-dom";
> // page components
> import Item01 from "./pages/Item01";
> import Item02 from "./pages/Item02";
> import Item03 from "./pages/Item03";
>
> export default class App extends Component {
>   render() {
>     return (
>       <Router>
>         <div className="App">
>           {/* 导航菜单 */}
>           <div>
>             <Link to="/item01">项目一</Link>
>             <Link to="/item02">项目二</Link>
>             <Link to="/item03">项目三</Link>
>           </div>
>
>           {/* 展示 */}
>           <Route path="/item01" component={Item01} />
>           <Route path="/item02" component={Item02} />
>           <Route path="/item03" component={Item03} />
>         </div>
>       </Router>
>     );
>   }
> }
> ```

## Router 组件

::: tip 路由组件分为两类：

- **BrowserRouter**：通过 H5 的 History API

- **HashRouter**：使用 URL 的 Hash 值

:::

应用只有被`<Router>` 组件包裹后才能使用路由，且一个 React 应用只使用一次 `Router` 组件。`<Router>` 组件必须包裹整个 React 应用（ App 根组件）

```jsx
// 脚手架 index.js
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./App";

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);
```

### HashRouter

> localhost://3000/#/home

```jsx
import { HashRouter as Router } from "react-router-dom";
```

### BrowserRouter

常用

> localhost://3000/home

```jsx
import { BrowserRouter as Router } from "react-router-dom";
```

## Route 组件

`<Route>` 组件是路由出口

通过路由规则匹配到的组件会被渲染展示到路由出口

::: tip 设置路由匹配规则：

- `path`属性：指定的访问路径
- `component`属性：指定对应路径的路由组件

:::

```jsx
<Router path="/路径" component={组件} />
```

### 路由组件

路由组件是通过`<Route>` 组件的路由规则匹配到的组件

> 一个路由组件常常是一个页面，路由组件都应单独放入 `src` 下的 `pages` 目录中

路由组件的 `props` 属性不再是个空对象，多出三个和路由相关的属性

> 一般组件如果没有接收到传递的数据或设定默认值的话，`props`属性是个空对象

::: tip 路由组件 props 中的对象属性：

- [history](#history)
- [location](#location)
- [match](#match)

:::

```jsx
import React, { Component } from "react";
export default class Item01 extends Component {
  render() {
    console.log(this.props);
    return <div></div>;
  }
}
```

```js
{
  history: {},
  loaction: {},
  match: {},
}
```

### 路由懒加载

若直接通过 `import from` 引入路由组件的话，

即使没有渲染对应路由组件，页面加载所有路由组件都被引入

会导致加载速度满，效率不好，不推荐

```js
import 路由组件 from "./pages/xxx.jsx";
import 路由组件 from "./pages/xxx.jsx";
```

应该使用懒加载

### 默认路由

进入应用时就自动匹配，而不是通过路由导航匹配

```jsx
<Router path="/" component={组件} />
```

### 模糊匹配

React 路由默认是模糊匹配

只要`<Route>` 标签的 `path`属性指定路径作为 `<link>` 标签的 `to` 属性指定的路径的开始，就匹配该`<Route>` 标签指定的路由组件

```jsx
<Link to="/item"></Link>
<Link to="/item/a"></Link>
<Link to="/item/b"></Link>
<Link to="/item/b/01"></Link>

<Route path="/item" component={Item} />
```

::: warning 模糊匹配会导致以下问题：

1. **不论访问第几层的子组，父路由都会被匹配上**<br>
2. **默认路由的组件永远会被匹配上**<br>
   `<Route>` 标签的 `path` 属性为 `/` 时，所有路由地址都会匹配上

   ```jsx
   <Link to="/"></Link>
   <Link to="/item"></Link>
   <Link to="/item/01"></Link>

   <Route path="/" component={Home} />
   ```

:::

### 精确匹配

如[上文](#模糊匹配)， React 模糊匹配存有默认路由的组件永远会被匹配的问题。需要精确匹配路由地址与路由组件，仅在路由组件的`path`属性值与`<Link>` 的 `to` 属性值路由地址完全一致时才被渲染。

通过 `Route` 组件的 `exact` 属性实现路由组件精确匹配

特别是需要给默认路由的 `<Route>` 标签上添加 `exact` 属性

```jsx
<Route exact path="/地址" component={组件} />
```

## 声明式导航

### Link 组件

`<Link>` 用于创建路由链接作为路由入口，最终会被解析为`<a>` 标签

通过 `to` 属性指定要渲染的组件

```jsx
<Link to="/路径">文本内容</Link>
```

### NavLink 组件

若路由链接需要有高亮效果、点击后给标签动态追加样式类名的话，需要使用 `<NavLink>` 组件

```jsx
import { NavLink } from "react-router-dom";
```

通过 `activeClassName` 属性指定样式类名

```jsx
<NavLink to="/路径" activeClassName="类名">
  文本内容
</NavLink>
```

## 编程式导航

### history

`history` 属性是 React 路由提供记录了浏览器记录

::: tip history 属性上的 API：

- **push()**
- **go()**
- **goBack()**
- **goForward()**
- **replace()**

:::

#### push()

跳转到某个路径的页面

```js
this.props.history.push("/路径");
```

> 如下：
>
> ```jsx
> import React, { Component } from "react";
> export default class Item01 extends Component {
>   goLogin = () => {
>     this.props.history.push("/item02");
>   };
>   render() {
>     return (
>       <div>
>         <h1>01</h1>
>         <button onClick={this.goLogin}>login</button>
>       </div>
>     );
>   }
> }
> ```

---

#### go()

根据浏览器记录前进或后退指定数量的页面
::: tip

- **go(正数)**：前进
- **go(负数)**：后退
- **go(0)**：刷新当前页面

```js
// 前进 n 个页面
this.props.history.go(n);
// 后退 n 个页面
this.props.history.go(-n);
// 刷新
this.props.history.go(0);
```

:::

### location

::: tip

- **[pathname]()**
- **[search]()**
- **[state]()**
  :::

### match

::: tip

- **[params]()**
- **[path]()**
- **[url]()**
  :::

## Switch 组件

React 路由的匹配是遍历所有`<Route>`组件，即使匹配到了第一个路由组件还会继续匹配其他`<Route>`组件，最后将所有符合路由规则组件渲染。若路由组件特别多的话会有效率问题

可使用 `<Switch>` 组件实现单一匹配，提高效率，仅匹配第一个符合路由规则的路由组件

```jsx
import { Switch } from "react-router-dom";
```

```jsx
<Link to="/路径">文本内容</Link>
<Link to="/路径">文本内容</Link>

<Switch>
  <Route path="/路径" component={组件} />
  <Route path="/路径" component={组件} />
  <Route path="/路径" component={组件} />
</Switch>
```

## 重定向

## 嵌套路由

## withRouter
