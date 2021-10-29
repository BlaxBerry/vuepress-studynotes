# create-react-app 

![](https://media.vlpt.us/images/wlsgh46/post/8b34b6bf-0da6-49b9-86bf-badbc3816272/cra.png)

React脚手架create-react-app

可以快速创建一个急于React脚手架的模版项目



[[toc]]



## 创建和启动

1. **全局**安装

```bash
npm install -g create-react-app
```

2. 切换到指定目录下，创建脚手架项目

```bash
create-react-app demo
```

3. 进入项目目录文件夹

```bash
cd demo
```

4. **启动项目**

```bash
yarn start
```

```bash
 yarn start
    Starts the development server.

  yarn build
    Bundles the app into static files for production.

  yarn test
    Starts the test runner.

  yarn eject
    Removes this tool and copies build dependencies, configuration files
    and scripts into the app directory. If you do this, you can’t go back!

We suggest that you begin by typing:

  cd demo-react
  yarn start
```

5. 浏览器打开**http://localhost:3000**

<img src="https://staging-qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F484272%2F52cfad2d-ef8c-b70d-3aa5-ec79b0576737.png?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=1bb6e4bac443e2d9d368f6b114b249a2" style="zoom: 20%;" />

6. 编辑项目的src目录下的App.js文件

7. 打包上线详见  [打包项目]()





## 目录结构

```js
Demo
|-node_modules
|-public
|-src
|-package.json
|-yarn.lock
```

<img src="https://pbs.twimg.com/media/E2N6q1tVEAAFAIG?format=jpg&name=medium" style="zoom:33%;" />

#### index.html

SPA单页面应用

整个项目只有一个HTML文件

%PUBLIC_URL% 代表public文件夹路径

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

#### App.js

因为ReactDOM.render不是追加操作，会顶替之前写到容器root中的内容

所以ReactDOM.render方法只执行一次，

root容器中只放一个组件，即 App.js

其余的自定义组件都放入APP.js组件中，作为其子组件

---

#### index.css

通用样式

也可以放入public目录中（需要修改index.js中的引入路径）

---

#### index.js

入口文件

相当于Vue的**main.js**

```jsx
// 引入核心库
import React from 'react';
import ReactDOM from 'react-dom';
// 引入通用样式
import './index.css';
// 引入主组件
import App from './App';
// 记录页面性能
import reportWebVitals from './reportWebVitals';

// 渲染主组件到页面
ReactDOM.render(
  // 包裹<React.StrictMode>可以检测代码不合理的错误
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
```







### 组件模块化

```js
src
|-components
	|-Hello
			|-Hello.js
			|-Hello.css
|-App.js
|-index.js
```

index.js

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'


ReactDOM.render(
    <App></App>,
    document.getElementById('root')
)
```

App.js

```jsx
import React, { Component } from 'react'

import Hello from './components/Hello/Hello'
import About from './components/About/About'

export default class App extends Component {

    render() {
        return (
            <div>
               <Hello/>
            	 <About/>
          	</div>
        )
    }
}
```

Hello.js

```jsx
import React, { Component } from 'react'

import './Hello.css'

export default class Hello extends Component {

    render() {
        return (
            <div>
                hello
            </div>
        )
    }
}
```



### 组件文件 和 普通JS文件

#### 1. 文件首字母

有的公司通过文件名的大小写区分

```js
src
|-components
	|-Hello
			|-fun.js
			|-Hello.js
			|-Hello.css
	|-About
			|-fun.js
			|-About.js
			|-About.css
|-App.js
|-index.js
```

---

#### 2. 文件后缀名

有的公司会将自定义组件文件的后缀名改为 **.jsx**

```js
src
|-components
	|-Hello
			|-Hello.jxs
			|-Hello.css
	|-About
			|-About.jxs
			|-About.css
|-App.js
|-index.js
```

自定义组件在主组件App.js文件中的引入时的路径和写法不变

```jsx
import React, { Component } from 'react'

import Hello from './components/Hello/Hello'
import About from './components/About/About'

export default class App extends Component {

    render() {
        return (
            <div>
               <Hello/>
            	 <About/>
            </div>
        )
    }
}
```

---

#### 3. 文件名 index.js

有的公司会将所有自定义组件名改为 **index.js**

```js
src
|-components
	|-Hello
			|-index.js
			|-index.css
	|-About
			|-index.js
			|-index.css
|-App.js
|-index.js
```

在主组件App.js中引入时可以简写

```jsx
import React, { Component } from 'react'

import Hello from './components/Hello'
import About from './components/About'

export default class App extends Component {

    render() {
        return (
            <div>
               <Hello/>
            	 <About/>
            </div>
        )
    }
}
```



### CSS样式模块化

因为各个自定义组件最终都被引入到了主组件App.js中

所以会导致在某一个组件中定义的CSS样式className会影响到其余组件中的相同className，后引入的会覆盖前面的样式

若是只写CSS样式，

需要通过模块化，将样式文件改名为 **module.css**

```js
src
|-components
	|-Hello
			|-index.js
			|-index.module.css
	|-About
			|-index.js
			|-index.module.css
|-App.js
|-index.js
```

将样式文件作为模块，在组件文件中引入

再使用样式的节点上通过“该模块的类名”设置类名样式

```jsx
import React, { Component } from 'react'

import hello from './Hello.module.css'

export default class Hello extends Component {

    render() {
        return (
            <div>
               <div className={hello.title}>
                 Hello
            	 </div>
            </div>
        )
    }
}
```

---

如果是**Less**文件的话，

不需要模块化处理，可通过嵌套解决

```less
#a {
  .xxx {}
}

#b {
  .xxx {}
}
```







## VSCode插件

快速生成组件文件

![](https://miro.medium.com/max/1838/1*XgMBj0lGzZs7O6okKg5sFA.png)

**rfc + 回车**  （react function component）

快速生成React的函数组件

**rcc + 回车** （react classn component）

快速生成React的类组件

```jsx
import React, { Component } from 'react'

export default class 组件文件名 extends Component {
    render() {
        return (
            <div>
                
            </div>
        )
    }
}
```





### Scss配置

```bash
npm i sass-loader@10.1.1 node-sass@5.0.0
```









## 暴露脚手架配置

暴露webpack相关的所有配置文件

**webpack.config.js**	

react脚手架为了防止失误修改webpack的配置文件

默认将所有webpack相关的配置文件全部隐藏

```bash
yarn eject
```

会暴露出react脚手架的所有配置文件

```js
XXX
|-config
|-scripts
```





## 打包项目

```bash
yarn build
```

会生成一个bulid文件夹

```
项目
｜-build
```

将build文件夹部署到服务器即可



### 第三方包 serve

若想在本地模拟一个服务器检查打包好的React

需要借助一个第三方包 serve

来将一个指定文件夹在服务器环境下运行打开



执行了 yarn build 命令后，终端也会提示：

```bash
The build folder is ready to be deployed.
You may serve it with a static server:

  yarn global add serve
  serve -s build
```

全局安装 serve

然后在项目目录下模拟服务器开启项目录下的build目录

然后开启`  http://localhost:5000    `打开该服务器





## 脚手架配置

### Sass 导入

::: danger

Cannot find module 'sass'

:::

React 提前配置了 loader，但是没有配置 Sass 模块，需要手动下载 Sass

1. 下载

```bash
npm i sass
# or
yarn add sass
```

2. 重起脚手架


### Proxy 反向代理

后端提供的接口会有跨越问题，需要配置反向代理

React 中有 **http-proxy-middleware** 模块处理代理

1. 下载

```bash
yarn add http-proxy-middleware
```

2. 配置 **`src/setupProxy.js`** 文件


```js
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://目标请求地址域名",
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
    axios.get("/api/xxxxx").then((res) => {
      console.log(res.data);
    });
  }, []);

  return <div></div>;
}
```

4. 因为修改了配置文件，要重启脚手架