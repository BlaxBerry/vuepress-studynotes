---
sidebarDepth: 2
---

# React.js 相关目录

::: tip 官方文档
[React](https://react.docschina.org/)

[React-Router](https://reactrouter.com/)

[Redux](https://www.redux.org.cn/)
:::

## 基础

[JSX](./JSX.md)

## 组件化开发

[Create-React-App](./Create-React-App.md)

[React 组件化开发](./React-Component.md)

[Hooks 钩子函数](./Hooks.md)

## 路由

[React-Router-Dom](./React-Router-Dom.md)

## 状态管理

[Redux 基础](./Redux.md)

<br>

## 注意事项

::: tip <h3>Sass 导入</h3>

> <span style="color:red">Cannot find module 'sass'</span>

React 提前配置了 loader，但是没有配置 Sass 模块，需要手动下载 Sass

1. 下载

```bash
npm i sass
# or
yarn add sass
```

2. 重起脚手架

---

:::

::: tip <h3>Proxy 反向代理</h3>
后端提供的接口会有跨越问题，需要配置反向代理

React 中有 **http-proxy-middleware** 模块处理代理

1. 下载

```bash
yarn add http-proxy-middleware
```

2. 配置 **`src/setupProxy.js`** 文件

> 如下，将http://kumanxuan1.f3322.net:8001/index/index指向为/api

```js
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://kumanxuan1.f3322.net:8001/index/index",
      changeOrigin: true,
    })
  );
};
```

3. ajax 请求访问 /api

```jsx
import React, { useEffect } from "react";
import axios from "axios";

export default function Test() {
  useEffect(() => {
    axios.get("/api").then((res) => {
      console.log(res.data);
    });
  }, []);

  return <div></div>;
}
```

4. 因为修改了配置文件，要重启脚手架

:::
