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

- **BrowserRouter**：通过 HTML5 `History` 对象提供的 API

- **HashRouter**：使用 URL 的 Hash 值

:::

应用只有被`<Router>` 组件包裹后才能使用路由，且一个 React 应用只使用一次 `<Router>` 组件。`<Router>` 组件必须包裹整个 React 应用（ App 根组件）

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

路径中包含了 `#`，兼容好但是不美观不常用

底层原理是使用了 URL 的哈希值。因为没有使用浏览器`History`对象的 API，路由参数没有被保存，**刷新后会导致路由参数 `state` 丢失**

```jsx
import { HashRouter as Router } from "react-router-dom";
```

### BrowserRouter

> localhost://3000/home

路径干净没有 `#`，常用

底层原理是使用了`HTML5`的`History`的 API，不兼容 IE9 及以下。刷新不会导致路由参数丢失，因为都保存在了`History`对象中

```jsx
import { BrowserRouter as Router } from "react-router-dom";
```

## Route 组件

`<Route>` 组件用于定义是路由出口

通过路由规则匹配到的路由组件会被渲染展示到路由出口的位置

::: tip 设置路由匹配规则：

- `path`属性：指定的访问路径
- `component`属性：指定对应路径的路由组件

```jsx
<Router path="/路径" component={组件} />
```

:::

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

严格匹配不能随便使用，会导致匹配时无法继续向下匹配子级嵌套路由。仅限于默认路由组件、无子路由的路由组件。

通过 `<Route>` 组件的 `exact` 属性实现路由组件精确匹配

```jsx
<Route exact path="/地址" component={组件} />
```

### 嵌套路由

<img src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg-blog.csdnimg.cn%2F20210318182549618.png%3Fx-oss-process%3Dimage%2Fwatermark%2Ctype_ZmFuZ3poZW5naGVpdGk%2Cshadow_10%2Ctext_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2JhaWR1XzI4OTY3MTg5%2Csize_16%2Ccolor_FFFFFF%2Ct_70&refer=http%3A%2F%2Fimg-blog.csdnimg.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1638117878&t=9d483d7fab79462fcdb27e67f1181fad" style="zoom:50%;" />

```jsx
<Route path="/父级路由/子级路由"/ component={组件}>
```

父路由组件不能采用严格模式的精确匹配，否则导致子路由匹配不到路由组件

## 路由组件 与 一般组件

### 路由组件

路由组件是通过`<Route>` 组件的路由规则匹配到的组件

路由组件的 `props` 属性不再是个空对象，多出三个和路由相关的属性

::: tip 路由组件 props 中的对象属性：

- [history](#history)
  - **[push()]()**：编程式导航的 API
  - **[replace()]()**：编程式导航的 API
  - **[go()]()**：编程式导航的 API
  - **[goBack()]()**：编程式导航的 API
  - **[goForward()]()**：编程式导航的 API
- [location](#location)
  - **[pathname]()**：当前路由路径
  - **[search]()**：存放路由组件接收的 `search` 参数
  - **[state]()**：存放路由组件接收的 `state` 参数
- [match](#match)
  - **[params]()**：存放路由组件接收的 `params` 参数
  - **[path]()**：当前路由路径
  - **[url]()**：当前路由路径

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

### withRouter 函数

只有路由组件的 `props` 属性上才有 `history`、`location`、`match` 属性

一般组件如果没有接收到传递的数据或设定默认值的话，`props` 属性是个空对象。若一般组件也想使用路由组件提供的属性（比如编程式导航）需要通过 React 路由内置的 **`witchRouter()`函数**

```js
import { withRouter } from "react-router-dom";
```

`witchRouter()` 用于加工一般组件使其具有路由组件的特有属性。该函数接收的参数是个一般组件，返回值是添加了路由组件上特有的三个属性的这个一般组件

> 如下：单文件组件中暴露的是`witchRouter()` 函数的返回值
>
> ```jsx
> import React, { Component } from "react";
> import { withRouter } from "react-router-dom";
>
> class 一般组件 extends Component {}
>
> export default withRouter(一般组件);
> ```

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

借助路由组件 `props` 属性上的 `history` 提供的 API

`history` 属性是 React 路由提供记录了浏览器记录

::: tip history 属性上的 API：

- **push()**
- **replace()**
- **go()**
- **goBack()**
- **goForward()**

:::

### push()

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

### replace()

功能同 `push()` 用于实现路由跳转

但 `replace()` 是无痕跳转，浏览器不保存从哪割路由跳转来的，无法返回

```jsx
this.props.history.replace("/路径");
```

### go()

根据浏览器记录前进或后退指定数量的页面
::: tip go(n)

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

## Switch 组件

React 路由的匹配是遍历所有`<Route>`组件，即使匹配到了第一个路由组件还会继续匹配其他`<Route>`组件，最后将所有符合路由规则组件渲染。若路由组件特别多的话会有效率问题

可使用 `<Switch>` 组件实现单一匹配，提高效率

```jsx
import { Switch } from "react-router-dom";
```

`<Switch>` 包裹所有的 `<Route>` 之后仅匹配第一个符合路由规则的路由组件

```jsx
<Link to="/路径">文本内容</Link>
<Link to="/路径">文本内容</Link>

<Switch>
  <Route path="/路径" component={组件} />
  <Route path="/路径" component={组件} />
  <Route path="/路径" component={组件} />
</Switch>
```

## 路由参数

::: tip 共有三种给路由组件传参的方式：

- [params]()（最常用）
- [search]()
- [state]()

:::

### params 参数

> /路径/参数/参数

::: tip 步骤：

1. 路由链接传递 restful 风格参数

   ```jsx
   <Link to="/路径/value1/value2">文本</Link>
   ```

   编程式导航也是路径中传递 restful 风格的参数

   ```jsx
   this.history.push("/路径/value1/value2");
   ```

2. 路由入口声明接收参数

   ```jsx
   <Route path="/路径/:key1/:key2" component={组件} />
   ```

3. 路由组件内通过 `this.props.match.params` 接收

   ```jsx
   this.props.match.params;
   ```

   ```js
   {
     key1: value1,
     key2: value2,
   }
   ```

:::

> 如下： /item/001/选项一
>
> ```jsx
> import React, { Component } from "react";
> import { Route, Link } from "react-router-dom";
>
> import RouteComponent from "./pages/RouteComponent";
>
> export default class Demo extends Component {
>   state = {
>     list: [
>       { id: "001", msg: "选项一" },
>       { id: "002", msg: "选项二" },
>       { id: "003", msg: "选项三" },
>     ],
>   };
>   render() {
>     return (
>       <div>
>         {/* 导航菜单 */}
>         <div>
>           {this.state.list.map((item) => (
>             <Link to={`/item/${item.id}/${item.msg}`} key={item.id}>
>               {item.msg}
>             </Link>
>           ))}
>         </div>
>
>         {/* 展示 */}
>         <Route path="/item/:id/:msg" component={RouteComponent} />
>       </div>
>     );
>   }
> }
> ```
>
> ```jsx
> import React, { Component } from "react";
> export default class RouteComponent extends Component {
>   render() {
>     const { id, msg } = this.props.match.params || {};
>     return (
>       <div>
>         <h1>id: {id}</h1>
>         <h1>msg: {msg}</h1>
>       </div>
>     );
>   }
> }
> ```

### search 参数

> /路径?参数=值&参数=值

::: tip 步骤：

1. 路由链接传递多组键值对的参数

   ```jsx
   <Link to="/路径?key1=value1&key2=value2">文本</Link>
   ```

   编程式导航也是路径中传递 urlencoded 形式的参数

   ```jsx
   this.history.push("/路径?key1=value1&key2=value2");
   ```

2. 路由入口无需声明接收参数

3. 路由组件内通过 `this.props.locatoin.search` 接收参数

   ```jsx
   this.props.locatoin.search;
   ```

4. 借助 React 内置的 queryString 格式化 urlencoded 编码字符串的 search 参数

   ```jsx
   import qs from "querystring";
   ```

   ```js
   qs.parse(this.props.location.search.slice(1));
   ```

:::

> 如下：/item?id=001&msg=选项一
>
> ```jsx
> import React, { Component } from "react";
> import { Route, Link } from "react-router-dom";
>
> import RouteComponent from "./pages/RouteComponent";
>
> export default class Demo extends Component {
>   state = {
>     list: [
>       { id: "001", msg: "选项一" },
>       { id: "002", msg: "选项二" },
>       { id: "003", msg: "选项三" },
>     ],
>   };
>   render() {
>     return (
>       <div>
>         {/* 导航菜单 */}
>         <div>
>           {this.state.list.map((item) => (
>             <Link to={`/item?id=${item.id}&msg=${item.msg}`} key={item.id}>
>               {item.msg}
>             </Link>
>           ))}
>         </div>
>
>         {/* 展示 */}
>         <Route path="/item" component={RouteComponent} />
>       </div>
>     );
>   }
> }
> ```
>
> ```jsx
> import React, { Component } from "react";
> import qs from "querystring";
> export default class Item01 extends Component {
>   render() {
>     const search = qs.parse(this.props.location.search.slice(1)) || {};
>
>     return (
>       <div>
>         <h1>id: {search.id}</h1>
>         <h1>msg: {search.msg}</h1>
>       </div>
>     );
>   }
> }
> ```

### state 参数

不暴露在浏览器地址栏中

::: tip 步骤：

1. 路由链接传递对象形式参数

   ```jsx
   <Link
     to={{
       pathname: "/路径",
       state: {
         key1: value1,
         key2: value2,
       },
     }}
   >
     文本
   </Link>
   ```

   编程式导航通过`push()` 第二个参数

   ```jsx
   this.history.push("/路径", {
     key1: value1,
     key2: value2,
   });
   ```

2. 路由入口无需声明接收参数

3. 路由组件内通过 `this.props.locatoin.state` 接收参数

   ```jsx
   this.props.location.state;
   ```

   ```js
   {
     key1: value1,
     key2: value2,
   }
   ```

:::

> 如下：
>
> ```jsx
> import React, { Component } from "react";
> import { Route, Link } from "react-router-dom";
>
> import RouteComponent from "./pages/RouteComponent";
>
> export default class Demo extends Component {
>   state = {
>     list: [
>       { id: "001", msg: "选项一" },
>       { id: "002", msg: "选项二" },
>       { id: "003", msg: "选项三" },
>     ],
>   };
>   render() {
>     return (
>       <div>
>         {/* 导航菜单 */}
>         <div>
>           {this.state.list.map((item) => (
>             <Link
>               key={item.id}
>               to={{
>                 pathname: "/item",
>                 state: {
>                   id: item.id,
>                   msg: item.msg,
>                 },
>               }}
>             >
>               {item.msg}
>             </Link>
>           ))}
>         </div>
>
>         {/* 展示 */}
>         <Route path="/item" component={RouteComponent} />
>       </div>
>     );
>   }
> }
> ```
>
> ```jsx
> import React, { Component } from "react";
> export default class Item01 extends Component {
>   render() {
>     const { id, msg } = this.props.location.state;
>     return (
>       <div>
>         <h1>id: {id}</h1>
>         <h1>msg: {msg}</h1>
>       </div>
>     );
>   }
> }
> ```

## 路由组件懒加载

通过 React 提供的 `lazy` 函数 + `Suspense` 组件实现懒加载（基本上项目都会用到）

若直接通过 `import from` 引入路由组件的话，即使没有渲染对应路由组件，页面加载所有路由组件都被引入。会导致加载速度满，效率不好，不推荐

```js
import 路由组件 from "./pages/xxx.jsx";
import 路由组件 from "./pages/xxx.jsx";
```

应该使用懒加载，匹配到了哪一个路由才加载哪一个路由组件

::: tip 路由组件懒加载步骤：

1. 导入 `lazy` 函数

```jsx
import { lazy } from "react";
```

2. 调用 `lazy` 函数，传入一个引入路由组件的函数<br>
   不再是直接 `import from` 导入路由组件

```jsx
const 路由组件名 = lazy(() => import("路由组件位置"));

// const Home = lazy(() => import('./pages/Home'))
```

3. 导入 `Suspense` 组件

```jsx
import { Suspense } from "react";
```

4. `Suspense` 组件包裹所有的 `lazy` 函数导入的路由入口<br>
   因为懒加载是匹配到谁加谁，需要通过 `fallback` 属性指定一个加载状态的一般组件，当指定的路由组件因为网速等原因没加载出来时显示该加载状态组件<br>
   加载状态组件不能通过`lazy` 函数导入，只能一般导入

```jsx
<Suspense fallback={<Route component={一般导入的loading组件} />}>
  <Route path="/路径" component={通过lazy函数导入的组件} />
  <Route path="/路径" component={通过lazy函数导入的组件} />
</Suspense>
```

:::

> 如下：
>
> ```jsx
> import React, { Component, lazy, Suspense } from "react";
> import {
>   BrowserRouter as Router,
>   Route,
>   Link,
>   Switch,
> } from "react-router-dom";
>
> import Loading from "./components/Loading";
> const Home = lazy(() => import("./pages/Home"));
> const About = lazy(() => import("./pages/About"));
>
> export default class App extends Component {
>   state = {
>     list: [
>       { id: "001", to: "/home", msg: "Home" },
>       { id: "002", to: "/about", msg: "About" },
>     ],
>   };
>   render() {
>     return (
>       <Router>
>         <div className="App">
>           {/* 导航菜单 */}
>           <div>
>             {this.state.list.map((item) => (
>               <Link key={item.id} to={item.to}>
>                 {item.msg}
>               </Link>
>             ))}
>           </div>
>
>           {/* 展示 */}
>           <Suspense fallback={<Route component={Loading} />}>
>             <Switch>
>               <Route exact path="/" component={Home} />
>               <Route path="/home" component={Home} />
>               <Route path="/about" component={About} />
>             </Switch>
>           </Suspense>
>         </div>
>       </Router>
>     );
>   }
> }
> ```

## 重定向

通过 `<Redirect>` 组件进行路由重定向

```jsx
import { Redirect } from "react-router-dom";
```

路由变化时按照 `<Route>` 组件从上到下顺序对路由组件进行匹配，将 `<Redirect>` 组件放在所有 `<Route>` 组件的最后，当所有路由组件都无法匹配到路由路径时，匹配 `<Redirect>` 组件指定的路由组件

> 如下：跳转到默认路由指定的 Home 路由组件
>
> ```jsx
> <Switch>
>   <Route exact path="/" component={Home} />
>   <Route path="/item01" component={Item01} />
>   <Route path="/item02" component={Item02} />
>   <Route path="/item03" component={Item03} />
>   <Redirect to="/" />
> </Switch>
> ```

## 404

```jsx
{
  /* 导航菜单 */
}
<div>
  <Link to="/item01">项目一</Link>
  <Link to="/item02">项目二</Link>
  <Link to="/item03">项目三</Link>
</div>;

{
  /* 路由出口 */
}
<Switch>
  <Route exact path="/" component={Home} />
  <Route path="/item01" component={Item01} />
  <Route path="/item02" component={Item02} />
  <Route path="/item03" component={Item03} />
  <Route path="/404" component={NoMatch} />
  <Redirect to="/404" />
</Switch>;
```

但是这样页面路径也变成了 404

```jsx
```
