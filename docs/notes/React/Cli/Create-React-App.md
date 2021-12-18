# Create-React-App

![](https://media.vlpt.us/images/wlsgh46/post/8b34b6bf-0da6-49b9-86bf-badbc3816272/cra.png)

脚手架`Create-React-App`用于创建一个`React`单页面应用

[[toc]]

## 安装创建项目

**全局安装（不推荐）**

```bash
npm install -g create-react-app
```

```bash
create-react-app 项目名
cd 项目名
```

---

**临时安装 （推荐）**

```bash
npx create-react-app 项目名
cd 项目名
```

`npx` 安装完成后会删掉，不会出现在全局中

下次再执行，还是会重新临时安装

> npx 是 npm v5.2.0 之后引入命令
>
> npx 是临时安装依赖包，不全局安装，不用担心长期的污染

---

**启动项目**

```bash
yarn start
```

浏览器在`localhost:3000`开启项目

<img src="https://staging-qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F484272%2F52cfad2d-ef8c-b70d-3aa5-ec79b0576737.png?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=1bb6e4bac443e2d9d368f6b114b249a2" style="zoom: 20%;" />

---

**暴露脚手架配置**

脚手架为了防止失误修改默认隐藏`webpack`相关配置文件

```bash
yarn eject
```

`yarn eject`会暴露出 react 脚手架的所有配置文件

---

**打包项目**

```bash
yarn build
```

在项目目录下会生成一个`bulid`文件夹

将`build`文件夹部署到服务器即可

执行了`yarn build`命令后终端会提示：

```bash
The build folder is ready to be deployed.
You may serve it with a static server:

yarn global add serve
serve -s build
```

## 脚手架目录

```js
|-node_modules
|-public
	|- inex.html // 主页面
	|- manifest.json // 应用加壳的配置文件
	|- robots.txt // 爬虫协议文件
	|- favicon.icon
	|- logo192.png
	|- logo512.png
|-src //源码文件夹
	|- assets
	|- components
	|- styles
	|- pages
	|- index.js // 入口文件
	|- App.js // App根组件
	|- App.test.js // APP测试用
	|- reportWebVital.js // 页面性能分析（需web-vitals库支持）
    |- setupTest.js // 组件单元测试（需jest-dom库支持）
|-package.json
|-yarn.lock
```

---

**index.html 文件**

SPA 单页面应用，整个项目只有一个 HTML 文件

`%PUBLIC_URL%` 代表`public`文件夹路径

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <!-- favicon图标 -->
    <!--%PUBLIC_URL%：代表public文件夹路径-->
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />

    <!-- 开启理想视口，移动端适配配置 -->
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <!-- 安卓手机的浏览器页签+地址栏的颜色 -->
    <meta name="theme-color" content="#000000" />

    <!-- 描述网站信息 -->
    <meta
      name="description"
      content="Web site created using create-react-app"
    />

    <!-- 苹果手机 网页添加到主屏后的图标 -->
    <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />

    <!-- 应用加壳时的配置文件 -->
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />

    <title>React App</title>
  </head>

  <body>
    <!-- 若浏览器不支持JS脚本的运行，则显示内容 -->
    <noscript>
      You need to enable JavaScript to run this app.
    </noscript>

    <!-- 组件渲染的容器 -->
    <div id="root"></div>
  </body>
</html>
```

---

**App.js 文件**

`ReactDOM.render`不是追加操作，是顶替之前写到容器`root`中的内容,所以`ReactDOM.render`方法只执行一次，

`root`容器中只放一个组件，即 `App.js` 文件中的`App`根组件

其余的自定义组件都放入`APP.js`组件中作为其子组件

---

**index.js 文件**

入口文件，相当于`Vue`的`main.js`文件

```jsx
// 引入核心库
import React from "react";
import ReactDOM from "react-dom";
// 引入通用样式
import "./index.css";
// 引入主组件
import App from "./App";
// 记录页面性能
import reportWebVitals from "./reportWebVitals";

// 渲染主组件到页面
ReactDOM.render(
  // 包裹<React.StrictMode>可以检测代码不合理的错误
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
```

## VSCode 插件

可用于快速生成组件文件

![](https://miro.medium.com/max/1838/1*XgMBj0lGzZs7O6okKg5sFA.png)

常用命令：

- **rfc**：快速生成函数组件

> react function component

- **rcc** ：快速生成类组件

> react classn component

## 本地服务器 serve

可通过第三方包`serve`在本地模拟一个服务器环境

来运行检查打包好的`React`项目的`build`文件夹

**全局安装**

```bash
yarn global add serve
```

模拟服务器开启项目录下的`build`文件夹下的文件

```bash
serve build
```

开启服务器运行在 `localhost:5000`

## 项目打包

因为项目打包后`index.html`中的资源引入路径默认`/`

所以当项目的`build`目录放到服务器上后会出现资源不存在查不到问题，需要修改打包的资源导入路径

在项目的`package.json`文件中增加一个节点`“homepage”`

> 该方法在 `react-scripts 0.9.0`或更高版本才支持

```json
"homepage":"./"
```

```json
"homepage":"."
```

如下，设置为`"homepage":"./"`后的打包后文件路径：

```html
<link rel="icon" href="./favicon.ico" />
<link rel="apple-touch-icon" href="./logo192.png" />
<link rel="manifest" href="./manifest.json" />

<link href="./static/css/2.85545ee2.chunk.css" rel="stylesheet" />
<link href="./static/css/main.1d355aef.chunk.css" rel="stylesheet" />

<script src="./static/js/2.7f8c7d39.chunk.js"></script>
<script src="./static/js/main.9109c5fa.chunk.js"></script>
```

## CSS 样式模块化

样式模块化，即将`CSS`样式文件作为模块引入组件文件

将`CSS`样式文件作为样式模块文件改名为 `xxx.module.css`

类名可从样式模块中解构获取

> 因为各个子组件最终都被引入根组件`App`，又因为`CSS`类名层叠性，后引入的会覆盖前面的样式，会导致某个组件中的`CSS`类名会影响其他组件中的相同类名，所以若只写`CSS`样式需要通过模块化

```js
// 目录
src |
  -pages |
  -Hello |
  -index.js |
  -index.module.css |
  -About |
  -index.js |
  -index.module.css |
  -App.js |
  -index.js;
```

```css
/* xxx.module.css文件 */
.nav {
  /* */
}
.footer {
  /* */
}
```

```jsx
// 组件
import React from "react";
import { nav, footer } from "./Hello.module.css";

const Demo = () => (
  <>
    <div className={nav}></div>
    <div className={footer}></div>
  </>
);

export default Demo;
```

但 `Less`、`Sass`文件不需要样式模块化处理，因为可通过嵌套解决样式问题

```less
.nav {
  .xxx {
  }
}

.footer {
  .xxx {
  }
}
```

## 导入 Sass

脚手架提前配置了`sass-loader`但没有配置`Sass`模块

::: danger

Cannot find module 'sass'

:::

需要手动下载`Sass`

1. 下载

```bash
npm i node-sass
# or
yarn add node-sass
```

2. 重起脚手架

## 配置代理解决跨域

后端提供的接口会有跨越问题，上线需要配置反向代理 proxy

::: tip 共有三种方法：

1. [package.json 文件中配置](#package.json-配置文件)
2. [http-proxy-middleware 中间件](#http-proxy-middleware-中间件)
3. [webpack 配置文件](#webpack-配置文件)

:::

### package.json 配置文件

在`package.json`文件中设置字节`proxy`

只能代理一个服务器

```json
"proxy":"htps://xxxx.com"
```

### http-proxy-middleware 中间件

React 中有 **http-proxy-middleware** 模块处理代理

代理多个服务器

1. 下载安装中间件

```bash
yarn add http-proxy-middleware
```

2. 并在`src`下新建文件`setupProxy.js`进行配置

> verion < 1.0 版本

```js
const proxy = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(
    proxy("/api", {
      target: "https://xxx.com", // 后台服务地址以及端口号
      changeOrigin: true, //是否跨域
    })
  );
  app.use(
    proxy("/v2", {
      target: "https://xxx2.com",
      changeOrigin: true,
    })
  );
};

//组件使用： /api/xx ... | /v2/...
```

> verion > 1.0

```js
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://xxx:3000", // 后台服务地址以及端口号
      changeOrigin: true, //是否跨域
    })
  );

  app.use(
    "/api2",
    createProxyMiddleware({
      target: "http://xxx.com",
      changeOrigin: true,
      pathRewrite: {
        //路径替换
        "^/api2": "/api", // axios 访问/api2 == target + /api
      },
    })
  );
};
```

3. ajax 请求访问 `/api`

```jsx
import React, { useEffect } from "react";
import axios from "axios";

export default function Test() {
  useEffect(() => {
    axios.get("/api/xxxxx").then((res) => {
      console.log(res.data);
    });
  }, []);

  return <div></div>;
}
```

4. 因为修改了配置文件，要重启脚手架

### webpack 配置文件

`yarn eject` 暴露`webpack` 配置文件

然后修改`config`目录下的`webpackDevServer.js`配置文件

```js
// config/webpackDevServer.js

proxy: {
  '/api2': {
    target: 'http://xxx.com', // 后台服务地址以及端口号
    ws: true, // websoket 服务
    changeOrigin: true, //是否跨域
    pathRewrite: { '^/api2': '/api' }
  }
}
```
