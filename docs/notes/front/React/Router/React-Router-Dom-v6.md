# React-Router-Dom v6

![img](https://miro.medium.com/max/1200/0*UYhGu9hAFrerGDNy.jpg)

[[toc]]

## 简介

```bash
npm i react-router-dom
# 6.2.2
```

::: tip v6 版本新特点：

- 推荐使用函数式组件
- 内置组件变化，详见下文 [内置组件](https://blaxberry.github.io/vuepress-studynotes/notes/front/React/Router/React-Router-Dom-v6.html#内置组件)
- 注册路由的语法变化，详见 [ 组件](https://blaxberry.github.io/vuepress-studynotes/notes/front/React/Router/React-Router-Dom-v6.html#Route)
- 新增 Hooks，详见下文 [内置 Hooks](https://blaxberry.github.io/vuepress-studynotes/notes/front/React/Router/React-Router-Dom-v6.html#内置-hooks)

:::

<br/>

## 内置组件

### BrowserRouter

用来包裹 `<App/>` 应用根组件

使用方法同 v5 一样

```js
import { BrowserRouter } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
```

---

### HashRouter

用来包裹 `<App/>` 应用根组件

使用方法同 v5 一样

官方强烈不建议使用，除非奇葩项目要求

---

### Link

用于声明式路由导航的路由链接

使用方法同 v5 一样

```js
import { Link } from "react-router-dom";
<Link to="路径">文本内容</Link>;
```

默认路由跳转模式是 PUSH 保留历史记录

可通过添加 **`replace` 属性**实现 REPLACE 路由无痕跳转

```jsx
<Link to="路径" replace>
  文本内容
</Link>
```

---

### NavLink

用于声明式路由导航的路由链接，带有高亮效果

使用方法同 v5 一样

```js
import { NavLink } from "react-router-dom";
<NavLink to="路径">文本内容</NavLink>;
```

**`className` 属性**用于指定路由链接选中时的样式类名

该属性接收一个函数，在 `<NavLink />` 组件渲染时就调用该函数

函数接收一个对象参数`{isActive: Boolean值}` 可解构判断是否被选中

```jsx
<NavLink to="地址" className={({ isActive }) => (isActive ? "样式类名" : "")}>
  文本内容
</NavLink>
```

`end` 属性用于设置匹配子路由时路由链接不再高亮显示

---

### Routes

用于包裹所有 `<Route/>` 路由出口组件

实现地址与组件单一匹配，一旦路由规则匹配成功就不再继续

**替代 v5 的 `<Switch/>` 组件**

```js
import { Routes } from "react-router-dom";
<Routes>
  <Route path="/" element={<要渲染的组件 />} />
  <Route path="路径" element={<要渲染的组件 />} />
  <Route path="路径/:id" element={<要渲染的组件 />} />
  <Route path="*" element={<要渲染的组件 />} />
</Routes>;
```

---

### Route

用于定义是路由出口，渲染路由规则匹配成功的组件内容

**必须被 `<Routes/>` 组件包裹**

使用方法同 v5 一样

```js
import { Routes, Route } from "react-router-dom";
<Route path="/路径" element={<要渲染的组件 />} />;
```

`<Route/>` 也可以进行嵌套子路由 `<Route/>`，但子路由组件需要通过 `<Outlet/>` 组件展示

但是嵌套路由还是建议使用 [路由表](https://blaxberry.github.io/vuepress-studynotes/notes/front/React/Router/React-Router-Dom-v6.html#路由表)

---

### Naviagte

可用于路由的**重定向**

**代替 v5 的 `<Redirect/>`**

```jsx
import { Navigate } from "react-router-dom";
<Navigate to="/路径"/>}
```

只要 `<Navigate/>` 组件被渲染就会导致路由跳转至指定地址

可指定明确地址并渲染 `<Navigate/>` 来实现直接切换路由

```jsx
import React, { useState } from "react";
import { Navigate } from "react-router-dom";

export default function A() {
  const [num, setNum] = useState(10);
  return (
    <>
      <button onClick={() => setNum(20)}>改变</button>
      {num !== 10 && <Navigate to="/B" />}
    </>
  );
}
```

默认路由跳转模式是 PUSH 保留历史记录

可通过添加 **`replace`** 属性实现 REPLACE 路由无痕跳转

```jsx
<Navigate replace to="/路径" />
```

可通过

```jsx
<Routes>
  <Route path="/" element={<要渲染的组件 />} />
  <Route path="/路径" element={<要渲染的组件 />} />
  <Route path="/路径" element={<要渲染的组件 />} />
  <Route path="*" element={<Navigate replace to="/路径" />} />
</Routes>
```

---

### Outlet

用于渲染子级路由组件，否则子级路由组件内容不会显示

详见 [嵌套路由](https://blaxberry.github.io/vuepress-studynotes/notes/front/React/Router/React-Router-Dom-v6.html#嵌套路由)

<br/>

## 嵌套路由

嵌套路由需要配合 [](https://blaxberry.github.io/vuepress-studynotes/notes/front/React/Router/React-Router-Dom-v6.html#Outlet) 组件使用

`<Outlet/>` 用于渲染展示子级路由组件

---

### 嵌套路由组件

通过 [``](https://blaxberry.github.io/vuepress-studynotes/notes/front/React/Router/React-Router-Dom-v6.html#Routes) 组件包裹多个 [``](https://blaxberry.github.io/vuepress-studynotes/notes/front/React/Router/React-Router-Dom-v6.html#Route) 组件

子路由路径直接写即可

```jsx
<Link to="子路由地址">跳转到子路由地址</Link>

<Routes>
  <Route path='父级路由地址' element={<路由组件/>} >
    <Route path='子级路由地址' element={<路由组件 />} />
    <Route path='子级路由地址' element={<路由组件 />} />
  </Route>
</Routes>
```

> 如下：

```jsx
import React from "react";
import { Link, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Message from "./pages/Message";
import Item1 from "./components/Message1";
import Item2 from "./components/Message2";

export default function App() {
  return (
    <>
      <Link to="home">Home</Link>
      <Link to="message">Message</Link>

      <br />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="message" element={<Message />}>
          <Route path="item1" element={<Item1 />} />
          <Route path="item2" element={<Item2 />} />
        </Route>
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </>
  );
}
// 子路由组件
import React from "react";
import { Link, Outlet } from "react-router-dom";

export default function Message() {
  return (
    <>
      <Link to="item1">item1</Link>
      <Link to="item2">item2</Link>

      <Outlet />
    </>
  );
}
```

---

### 路由表

可通过内置 Hooks 的 [`useRoutes()`](https://blaxberry.github.io/vuepress-studynotes/notes/front/React/Router/React-Router-Dom-v6.html#useRoutes) 生成可以统一管理的路由匹配规则

UI 视图只需要渲染 `useRoutes()` 调用结果的变量即可

可用来代替 [嵌套路由组件](https://blaxberry.github.io/vuepress-studynotes/notes/front/React/Router/React-Router-Dom-v6.html#嵌套路由组件) 的做法

```jsx
const element = useRoutes([
  { path: "路径", element: <组件 /> },
  { path: "路径", element: <组件 /> },
  {
    path: "/一级路径",
    element: <组件 />,
    children: [
      { path: "二级路径", element: <组件 /> },
      { path: "二级路径", element: <组件 /> },
    ],
  },
]);
```

> 如下：

```jsx
import React from "react";
import { Link, Routes, Route, Navigate, useRoutes } from "react-router-dom";
import Home from "./pages/Home";
import Message from "./pages/Message";
import Item1 from "./components/Message1";
import Item2 from "./components/Message2";

export default function App() {
  const element = useRoutes([
    { path: "/", element: <Home /> },
    {
      path: "message",
      element: <Message />,
      children: [
        { path: "item1", element: <Item1 /> },
        { path: "item2", element: <Item2 /> },
      ],
    },
    { path: "*", element: <Navigate replace to="/" /> },
  ]);
  return (
    <>
      <Link to="home">Home</Link> &nbsp;
      <Link to="message">Message</Link>
      <br />
      {element}
    </>
  );
}
// 子路由组件
import React from "react";
import { Link, Outlet } from "react-router-dom";

export default function Message() {
  return (
    <>
      <Link to="item1">item1</Link>
      <Link to="item2">item2</Link>

      <Outlet />
    </>
  );
}
```

---

### 默认子路由组件

子路由组件 `<Route/>` 上用 **`index`** 属性替代 `path` 属性

用于指定跳转到父级路由时默认展示的子级路由组件，

否则在切换到父级路由地址时期望展示的子级路由组件的位置为空白

```jsx
<Routes>
  <Route path="父级路由地址" element={<路由组件 />}>
    <Route index element={<Item1 />} />
    <Route path="子级路由地址" element={<路由组件 />} />
    <Route path="子级路由地址" element={<路由组件 />} />
  </Route>
</Routes>
```

> 如下：

```jsx
import React from "react";
import { Link, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Message from "./pages/Message";
import Item1 from "./components/Message1";
import Item2 from "./components/Message2";

export default function App() {
  return (
    <>
      <Link to="home">Home</Link>
      <Link to="message">Message</Link>

      <br />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="message" element={<Message />}>
          <Route index element={<Item1 />} />
          <Route path="item1" element={<Item1 />} />
          <Route path="item2" element={<Item2 />} />
        </Route>
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </>
  );
}
```

<br/>

## 路由路径

### pathname

通过 **`useLocatin()`** 获取当前路由组件的路由地址<br/>[详见下文](https://blaxberry.github.io/vuepress-studynotes/notes/front/React/Router/React-Router-Dom-v6.html#uselocation)

```jsx
const { pathname } = useLocation();
```

> 如下：

```jsx
import React from "react";
import { useLocation } from "react-router-dom";

export default function Message() {
  const { pathname } = useLocation();
  console.log(pathname); // /message

  return <>Message页面</>;
}
```

---

### 子路由路径

v6 版的子路由路径直接写即可

v5 版的子路由路径必须通过 `useRouteMatch()` 获取 `url`、`path` 后拼接字符串

```jsx
<Link to="子路由地址">跳转到子路由地址</Link>

<Routes>
  <Route path='父级路由地址' element={<路由组件/>} >
    <Route path='子级路由地址' element={<路由组件 />} />
    <Route path='子级路由地址' element={<路由组件 />} />
  </Route>
</Routes>
```

---

### 路径占位符

React Router v6 使用了简化的路径格

::: tip 仅支持 2 种占位符：

- **:id**：动态样式参数
- **\***：通配符

:::

```http
/message
/message/item1
/message/:id
/message/:id/details
/*
/message/*
```

---

`*` 作为路由组件 `path`属性取值为时，

可以匹配任何（非空）路径，同时该匹配拥有最低的优先级

可以用于设置 404 页面。

<br/>

## 路由参数 params

`params` 参数传递时通过路由地址占位

仅参数的数值会直接显示在路由地址上

```http
/message/003/前端学习/笔记一
/products/acc-01
```

---

### 声明式导航传参

`<Link/>` 的 `to` 属性指定的对应路由地址上通过占位拼接参数数据

路由匹配规则的 `<Route/>` 组件的 `path` 属性的地址上指定要接受的参数名与个数

或 [路由表](https://blaxberry.github.io/vuepress-studynotes/notes/front/React/Router/React-Router-Dom-v6.html#路由表) 中对应的路由地址的 `path` 属性的的地址上指定要接受的参数名与个数

```jsx
<Link to={`地址/${参数名对应数据}/${参数名对应数据}`}>文本内容</Link>

<Routes>
  <Route path='地址/:参数名/:参数名' element={<路由组件 />} />
</Routes>
```

> 如下：

```jsx
// 传递参数的组件
import React from "react";
import { Link, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Message from "./pages/Message";

export default function App() {
  const paramsID = 200;
  const paramsTitle = "文章一";

  return (
    <>
      <Link to="/"> Home </Link>
      <Link to={`message/${paramsID}/${paramsTitle}`}>Message</Link>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="message/:id/:title" element={<Message />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </>
  );
}
```

---

### 编程式导航传参

通过内置 Hooks 的 **`useNavigate()`** 方法实现编程式路由导航

`params`参数拼接到跳转目标的路由地址中即可

[详见下文](https://blaxberry.github.io/vuepress-studynotes/notes/front/React/Router/React-Router-Dom-v6.html#usenavigate)

```jsx
navigate("地址/值/值");
```

---

### 参数接收

路由组件内接收 `params` 参数通过内置 Hooks 的 **`useParams()`**

[详见下文](https://blaxberry.github.io/vuepress-studynotes/notes/front/React/Router/React-Router-Dom-v6.html#useparams)

```jsx
// 接受参数的路由组件
import React from "react";
import { useParams } from "react-router-dom";

export default function Message() {
  const params = useParams();
  console.log(params); // {id: 200, title: '文章一'}

  return <> Message 页面</>;
}
```

<br/>

## 路由参数 search

`search` 参数传递时需要拼接在路径后

参数名和参数值都会展示在路由地址上

```http
/message?id=003&title=前端学习&name=笔记一
/products/id=acc-01
```

---

### 声明式导航传参

`<Link/>` 的 `to` 属性的路由地址后通过 `?` 拼接键值对形式的参数名和参数值

多个键值对用 `&` 隔开

```jsx
<Link to={`地址?参数名=${数值}&参数=${数值}`}>文本内容</Link>

<Routes>
  <Route path='地址' element={<路由组件 />} />
</Routes>
```

> 如下：

```jsx
import React from "react";
import { Link, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Message from "./pages/Message";

export default function App() {
  const paramsID = 200;
  const paramsTitle = "文章一";

  return (
    <>
      <Link to="/"> Home </Link>
      <Link to={`message?id=${paramsID}&title=${paramsTitle}`}>Message</Link>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="message" element={<Message />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </>
  );
}
```

---

### 编程式导航传参

通过内置 Hooks 的 **`useNavigate()`** 方法实现编程式路由导航

`search`参数拼接到跳转目标的路由地址中即可

[详见下文](https://blaxberry.github.io/vuepress-studynotes/notes/front/React/Router/React-Router-Dom-v6.html#usenavigate)

```jsx
navigate("地址?参数=值&参数=值");
```

---

### 参数接收

路由组件内接收 `search` 参数通过内置 Hooks 的 **`useSearchParams()`**

[详见下文](https://blaxberry.github.io/vuepress-studynotes/notes/front/React/Router/React-Router-Dom-v6.html#usesearchparams)

```jsx
import React from "react";
import { useSearchParams } from "react-router-dom";

export default function Message() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchID] = React.useState(searchParams.get("id"));
  const [searchTitle] = React.useState(searchParams.get("title"));

  console.log(searchID, searchTitle);
  console.log(searchID, searchTitle);

  return <>Message 页面</>;
}
```

<br/>

## 路由参数 state

通过 `search` 参数传递的参数名和参数值不会展示在路由地址上

---

### 声明式导航传参

`<Link/>` 的 `state` 属性以对象形式传递多组键值对形式的参数名和参数值

```jsx
<Link
  to='路由地址'
  state={{
    参数名: 值,
    参数名: 值,
  }}
>
 文本内容
</Link>

<Routes>
  <Route path='路由地址' element={<路由组件 />} />
</Routes>
```

> 如下：

```jsx
import React from "react";
import { Link, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Message from "./pages/Message";

export default function App() {
  const paramsID = 200;
  const paramsTitle = "文章一";

  return (
    <>
      <Link to="/"> Home </Link>
      <Link
        to="message"
        state={{
          id: paramsID,
          title: paramsTitle,
        }}
      >
        Message
      </Link>

      <br />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="message" element={<Message />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </>
  );
}
```

---

### 编程式导航传参

通过内置 Hooks 的 **`useNavigate()`** 方法的返回值函数实现编程式路由导航

并通过函数的第二个参数配置项中的 `state` 属性传递对象形式的 `state` 参数

[详见下文](https://blaxberry.github.io/vuepress-studynotes/notes/front/React/Router/React-Router-Dom-v6.html#usenavigate)

```jsx
const navigate = useNavigate();

const 路由跳转函数 = () => {
  navigate("跳转路由地址", {
    state: {
      参数: 值,
      参数: 值,
    },
  });
};
```

> 如下：

```jsx
import React from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Message from "./pages/Message";

export default function App() {
  const navigate = useNavigate();

  const goMessage = () => {
    navigate("/message", {
      replace: false,
      state: {
        id: 200,
        title: "文章一",
      },
    });
  };

  return (
    <>
      <button onClick={goMessage}>跳转 Message 页面</button>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="message" element={<Message />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </>
  );
}
```

---

### 参数接收

路由组件内接收 `state` 参数通过内置 Hooks 的 **`useLocatino()`**

[详见下文](https://blaxberry.github.io/vuepress-studynotes/notes/front/React/Router/React-Router-Dom-v6.html#uselocatin)

```jsx
import React from "react";
import { useLocation } from "react-router-dom";

export default function Message() {
  const { state } = useLocation();
  console.log(state);

  return <>Message页面</>;
}
```

<br/>

## 内置 Hooks

### useRoutes()

用于生成 **路由表**

根据统一管理的路由表生成对应的路由匹配规则

可以代替多个 `<Routes/>` 组件包裹多个 `<Route/>` 组件的写法

```js
import { useRoutes } from "react-router-dom";
const element = useRoutes([
  { path: "路径", element: <组件 /> },
  { path: "路径", element: <组件 /> },
  {
    path: "/一级路径",
    element: <组件 />,
    children: [
      { path: "二级路径", element: <组件 /> },
      { path: "二级路径", element: <组件 /> },
    ],
  },
]);
```

> 如下：使用 `useRoutes()`

```jsx
import React from "react";
import { Navigate, useRoutes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import NotFound from "./pages/404";

export default function App() {
  const elements = useRoutes([
    { path: "home", element: <Home /> },
    { path: "about", element: <About /> },
    { path: "/", element: <Navigate to="home" /> },
    { path: "*", element: <NotFound /> },
  ]);

  return <>{elements}</>;
}
```

> 如下：不使用 `useRoutes()`

```jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import A from "./components/A";
import B from "./components/B";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/A" element={<A />} />
        <Route path="/B" element={<B />} />
        <Route path="/" element={<Navigate to="/A" />} />
      </Routes>
    </>
  );
}
```

---

### useNavigate()

用于编程式路由导航

并且无论路由组件函数一般组件都可直接调用该方法

> 代替了 v5 的 `useHistory()` 和 `withRouter`

::: tip 返回值函数的两个参数：

- 第一个参数：字符串，跳转的目标路由地址
- 第二个参数：对象配置项

:::

```jsx
import { useNavigate } from "react-router-dom";
const navigate = useNavigate();

const 路由跳转函数 = () => {
  navigate("跳转路由地址", {
    replace: false | true, // 无痕跳转
    state: {
      参数: 值,
      参数: 值,
    },
  });
};

const 前进 = () => {
  navigate(1);
};

const 当前页面刷新 = () => {
  navigate(0);
};

const 后退 = () => {
  navigate(-1);
};
```

---

### useParams()

用来在路由组件内接收传递来的 `params` 参数

`params` 参数的传递 [详见上文](https://blaxberry.github.io/vuepress-studynotes/notes/front/React/Router/React-Router-Dom-v6.html#路由参数-params)

```jsx
import { useParams } from "react-router-dom";
const params = useParams();

console.log(params);
/*
{
  参数名: 数据,
  参数名: 数据
}
*/
```

> 如下：

```jsx
// 接受参数的路由组件
import React from "react";
import { useParams } from "react-router-dom";

export default function Message() {
  const params = useParams();
  console.log(params); // {id: 200, title: '文章一'}

  return <> Message 页面</>;
}
```

---

### useMatch()

不常用，更推荐使用 [useParams()](https://blaxberry.github.io/vuepress-studynotes/notes/front/React/Router/React-Router-Dom-v6.html#useparams)

```jsx
import { useMatch } from "react-router-dom";
const { params } = useMatch("路由组件匹配的完整路由地址");
```

> 如下：

```jsx
import React from "react";
import { useMatch } from "react-router-dom";

export default function Message() {
  const { params } = useMatch("message/:id/:title");
  console.log(params); // {id: '200', title: '文章一'}

  return <>Message 页面</>;
}
import React from "react";
import { Link, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Message from "./pages/Message";

export default function App() {
  const paramsID = 200;
  const paramsTitle = "文章一";

  return (
    <>
      <Link to="/"> Home </Link>
      <Link to={`message/${paramsID}/${paramsTitle}`}>Message</Link>

      <br />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="message/:id/:title" element={<Message />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </>
  );
}
```

---

### useSearchParams()

用来在路由组件内接收传递来的 `search` 参数

`search` 参数的传递 [详见上文](https://blaxberry.github.io/vuepress-studynotes/notes/front/React/Router/React-Router-Dom-v6.html#路由参数-search)

```jsx
import { useSearchParams } from "react-router-dom";
const [searchParams, setSearchParams] = useSearchParams();

const 参数 = searchParams.get("参数名");

const 修改参数值的方法 = () => {
  setSearchParams("参数=值&参数=值");
};
```

::: tip 返回一个包含两个值的数组：

- searchParams 对象：调用 `get` 方法获取指定的 `search` 参数
- setSearchParams 函数：用于修改 `search` 参数，不常用

:::

> 如下：

```jsx
import React from "react";
import { useSearchParams } from "react-router-dom";

export default function Message() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchID] = React.useState(searchParams.get("id"));
  const [searchTitle] = React.useState(searchParams.get("title"));

  console.log(searchID);
  console.log(searchTitle);

  const changeSearchID = () => {
    setSearchParams("id=9999999");
    // 修改后路径变为： /message?id=9999999
  };

  return (
    <>
      <div>ID: {searchID}</div>
      <div>Title: {searchTitle}</div>
      <button onClick={changeSearchID}>修改</button>
    </>
  );
}
```

---

### useLocation()

用于获取当前路由组件的路径 URL 相关数据

可解构获取 **[当前路由地址](https://blaxberry.github.io/vuepress-studynotes/notes/front/React/Router/React-Router-Dom-v6.html#pathname)**、**[search 参数](https://blaxberry.github.io/vuepress-studynotes/notes/front/React/Router/React-Router-Dom-v6.html#路由参数-search)**、**[state 参数](https://blaxberry.github.io/vuepress-studynotes/notes/front/React/Router/React-Router-Dom-v6.html#路由参数-state)** 等

```jsx
import { useLocation } from "react-router-dom";
const location = useLocation();

/*
    {
        hash: "",
        key: "",
        pathname: "/路径",
        search: "?search参数=值&search参数=值",
        state: { 
        	state参数: 值,
        	state参数: 值
        },
    }
    */
```

> 如下：

```jsx
import React from "react";
import { useLocation } from "react-router-dom";

export default function Message() {
  const location = useLocation();
  console.log(location);

  /*
    {
        hash: "",
        key: "xsy8e3x2",
        pathname: "/message",
        search: "?id=9999999",
        state: {
        	title: 文章一
        },
    }
    */

  return <>Message页面</>;
}
```

---

### useInRouterContext()

判断当前组件是否在路由的上下文环境中

根据返回值判断是组件否被 `<BrowserRouter/>` 或 `<HashRouter/>` 包裹管理

一般项目中不常用，多用于第三方库开发者判断是否处于路由环境

```jsx
import React from "react";
import { useInRouterContext } from "react-router-dom";

export default function App() {
  const isInRouterContext = useInRouterContext();
  return <>{isInRouterContext ? "被路由组件管理中" : "没有被路由组件管理"}</>;
}
```

---

### useNavigationType()

用于获取当前的路由地址是通过什么方式跳转来的

::: tip 返回值为导航类型：

- **POP**：路由组件被浏览器直接打开（刷新页面）
- **PUSH**：有历史记录的跳转
- **REPLACE**：无痕跳转

:::

```jsx
// 路由组件
import React from "react";
import { useNavigationType } from "react-router-dom";

export default function A() {
  const navigationType = useNavigationType();
  return (
    <div>
      {navigationType === "POP" && <span>POP页面刷新</span>}
      {navigationType === "PUSH" && <span>PUSH跳转</span>}
      {navigationType === "REPLACE" && <span>REPLACE跳转</span>}
    </div>
  );
}
import React from "react";
import { useRoutes, Link } from "react-router-dom";
import A from "./components/A";

export default function App() {
  const elements = useRoutes([
    { path: "/", element: <A /> },
    { path: "/A", element: <A /> },
  ]);
  return (
    <>
      <Link to="/A">PUSH 跳转</Link>&nbsp;
      <Link to="/A" replace>
        REPLACE 跳转
      </Link>
      {elements}
    </>
  );
}
```

---

### useOutlet()

不太常用

用于获取当前路由组件中渲染的子路由组件

调用返回值是对应的路由组件对象

若嵌套路由没有挂载，则返回值为 `null`

```jsx
const res = useOutlet();
```

---

### useResolvePath()

用于解析某指定 URL 值中的 path、search、hash 值

```jsx
const res = useResolvePath("路径");
```
