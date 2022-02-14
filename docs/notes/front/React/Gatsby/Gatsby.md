# Gatsby 基础

![](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F386550%2F64d999d5-5c8d-3edf-6157-4447fc86da3f.png?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=1aa4fff5e9cc88a6f3b90fed52d716ad)

[[toc]]

## 简介

Gatsby 是一个基于 React 的开源框架，用于创建网站和应用程序。

比如：网站、博客，电商、主页等

## 脚手架使用

### 安装

```bash
npm i -g gatsby-cli

gatsby --version
# Gatsby CLI version: 4.1.2
```

### 创建

```bash
gatsby new 项目名
```

### 运行

> 默认开启在`localhost:8000`

```bash
gatsby develop
# yarn run develop
```

### 打包

```bash
gatsby build
# yarn run build
```

### 检查

> 启动静态网页服务器供测试打包生成的静态网页

```bash
gatsby serve
# yarn run serve
```

## 目录结构

Gatsby 提供了几个特定的文件和文件夹

但由于 Gatsby 站点也是 React 应用程序，除了 Gatsby 特定的文件和文件夹外，也遵循 React 应用程序文件夹结构，比如自定义`components`、`assets`等目录

```js
|- .cache
|- plugins
|- public // 上线后可访问到的静态文件
|- src
    |- api
    |- pages
    |- templates
    |- html.js
|- static
|- gatsby-config.js
|- gatsby-node.js
|- gatsby-ssr.js
|- gatsby-browser.js
```

---

### .cache

`.cache`是 gatsby 编译运行的缓存文件夹

`.gitignore`忽略此文件夹，无需上传和改动

---

### plugins

`plugins`目录用于存放没有在 npm 上发布的本地插件

---

### src

`src`目录是代码目录

```js
|- src
    |- components
    |- utils
    |- lib
    |- assets
    |- styles
    ...
```

::: tip src 目录：

- **pages**

改目录下的文件/文件夹会被 Gatsby 自动成为路由，详见[路由 & 页面](#路由-页面)

- **templates**

包含用于以编程方式创建页面的模板

- **html.js**

对于 default 的自定义配置`.cache/default_html.js`

- **api**

其中的 JS 和 TS 文件会根据`src/api`文件名自动成为函数

:::

---

### pubilc

`public`是编译生成的最终文件夹，部署发布网站用，无需改动

该目录下的静态资源在上线后是可以直接从浏览器地址栏访问到的

---

### static

`static`目录下的文件不会被 webpack 处理，

会在`yarn run develop`编译时被原封不动地复制到公用`public`根目录

> 比如 ：
>
> `static/logo.png`会拷贝到 `public/logo.png`

```js
|- public
    |- logo.png
|- src
|- static
    |- logo.png
```

<br/>

## 配置文件

### gatsby-browser.js

`gatsby-browser.js`

Gatsby 在 `gatsby-browser.js`文件中提供了一些 API，可供 开发者 监控浏览器的特定事件 和 写一些全局组件

详见 [Gatsby 配置文件](./Gatsby-ConfigsFiles#l#gatsby-browser-js)

### gatsby-config.js

`gatsby-config.js`为 Gatsby 网站配置选项文件

可以在此处指定包括网站标题、描述、插件等的元数据

详见 [Gatsby 配置文件](./Gatsby-ConfigsFiles#l#gatsby-config-js)

### gatsby-ssr.js

`gatsby-ssr.js`

提供了一些 服务器端渲染 API，用于编译完成之前修改这些 HTML 的内容

详见 [Gatsby 配置文件](./Gatsby-ConfigsFiles#l#gatsby-ssr-js)

### gatsby-node.js

`gatsby-node.js`是实现 Gatsby 的 Node.js API 以自定义和扩展影响构建过程的默认设置文件

使用 createPage 以编程方式创建页面

详见 [Gatsby 配置文件](./Gatsby-ConfigsFiles#l#gatsby-node-js)

<br/>

## 路由 & 页面

`gatsby`默认将`pages`目录下的文件名和文件夹名匹配为路由名

页面文件名和文件夹名采用小写

### 单一路由

`pages`目录下一个文件匹配一个路由

路由名匹配文件名

```http
域名/文件名
```

> 如下：
>
> `pages/index.jsx` 指向 `/`
>
> `pages/a.jsx` 指向 `/a`
>
> `pages/b.jsx` 指向 `/b`

```js
|-src
    |- pages
        |- index.jsx
        |- a.jsx
        |- b.jsx
```

---

### 嵌套路由

嵌套路由是在`pages`目录下创建子目录，该子目录名与其下的子文件名匹配路由

```http
域名/pages下子目录名/文件名
```

> 如下：
>
> `pages/index.jsx` 指向 `/`
>
> `pages/a/01.jsx` 指向 `/a/01`
>
> `pages/b/01.jsx` 指向 `/b/01`

```js
|-src
    |- index.jsx
    |- pages
        |- a
            |- 01.jsx
            |- 02.jsx
        |- b
            |- 01.jsx
            |- 02.jsx
```

也可以在默认首页`index.jsx`进行[编程式导航](#navigate)跳转页面到指定路由地址

使网站的首页转为指定路由地址对应的`pages/目录/文件.jsx`

> 如下：
>
> 默认首页地址由`/`改为`/admin/`
>
> 渲染的文件由默认`pages/index.tsx`改为`pages/admin/index.tsx`

```tsx
// Gatsby项目/src/pages/index.tsx
import { navigate } from "gatsby";
import { useMount } from "ahooks";

const IndexPage = (): JSX.Element => {
  useMount(() => {
    navigate("/admin");
  });

  return <></>;
};

export default IndexPage;
```

---

### index.jsx

> 如下：
>
> 默认页面组件内容

```jsx
import React from "react";

const IndexPage = () => {
  return <div>Hello World</div>;
};

export default IndexPage;
```

也可通过[编程式导航](#navigate)跳转页面到指定路由地址

```jsx
import { navigate } from "gatsby";
import { useMount } from "ahooks";

const IndexPage = () => {
  useMount(() => {
    navigate("/admin");
  });

  return <></>;
};

export default IndexPage;
```

---

### 404 页面

当`gatsby`无法匹配路由地址与`pages`目录的同名文件时，会查询`pages`目录下的`404.js`文件

> 在开发环境下，不会直接跳转到 404 页面，会提醒开发者该页面不匹配路由
>
> 在真实环境下是直接跳转 404 页面的

![](https://www.gatsbyjs.com/static/ea5e1e0405ce033127573ac8a5dd3508/5df5d/gatsby-default-404.png)

---

### [id].jsx

用于设置**动态路由**

`[id].jsx` 路由组件匹配的路由地址名取决于路由跳转时传递的 `params` 参数的值

```jsx
navigate("/" + 参数);
// 或
<Link to={"/" + 参数}>文本</Link>;
```

`/参数值`

```js
|- pages
  |- index.jsx
  |- [id].jsx
```

`/song/参数值`

```js
|- pages
  |- index.jsx
  |- song
    |- [id].jsx
```

> 如下：
>
> `/song/5457097`

```tsx
// 跳转来自
import React from "react";
import { navigate } from "gatsby";

const Card = () => {
  const go = (id: number) => {
    // console.log(id); // 5457097
    navigate(`/song/${id}`);
  };
  return (
    <>
      <Card onClick={() => go(item.id)}>
        <img src={xxxx} alt={"xxxx"} />
        <p>xxxxxx</p>
      </Card>
    </>
  );
};
export default Card;
```

```tsx
// 跳转目标
import React from "react";
import { PageProps } from "gatsby";

const IndexPage = (props: PageProps) => {
  const { id } = props.params;
  // console.log(id); // 5457097

  return (
    <>
      <div>{id}</div>
    </>
  );
};

export default IndexPage;
```

---

### props & PageProps

Gatsby 中是用了`@reach/router`，pages 目录中的每一个组件都是页面组件

Gatsby 封装提供了类型`PageProps`供 TS 中页面组件(路由组件)的`props`继承

> 可从`PageProps`中解构出的内容如下：

```ts
type PageProps = {
  /** The path for this current page */
  path: string
  /** The URI for the current page */
  uri: string
  /** An extended version of window.document */
  location: WindowLocation<LocationState>
  /** A way to handle programmatically controlling navigation */
  navigate: NavigateFn
  /** can't get passed children as this is the root user-land component */
  children: undefined
  /** URL parameters when the page has a `matchPath` */
  params: Record<string, string>
  pageResources: {
    component: React.Component
    json: {
      data: DataType
      pageContext: PageContextType
    }
    page: {
      componentChunkName: string
      path: string
      webpackCompilationHash: string
      matchPath?: string
    }
  }
  data: DataType
  pageContext: PageContextType
  serverData: ServerDataType
```

> 如下：

```tsx
import React from "react";
import { PageProps } from "gatsby";

const IndexPage = (props: PageProps) => {
  console.log(props);

  return <></>;
};

export default IndexPage;
```

---

### location

因为 pages 目录中的每一个组件都是页面组件

所以可以直接从组件 `props` 中解构获取 `location`

```js
{
  hash: "";
  host: "localhost:8000";
  hostname: "localhost";
  href: "http://localhost:8000/song/games";
  key: "1642835738249";
  origin: "http://localhost:8000";
  pathname: "/song/games";
  port: "8000";
  protocol: "http:";
  search: "";
  state:{
    key: "1642835738249",
    //传递参数: 值
  }
}
```

> 如下：
>
> 获取当前路由地址`pathname`

```jsx
// JSX
import React from "react";

const IndexPage = (props) => {
  const { location } = props;
  const { pathname } = location;

  return <></>;
};

export default IndexPage;
```

```tsx
// TSX
import React from "react";
import { PageProps } from "gatsby";

const IndexPage = (props: PageProps) => {
  const { location } = props;
  const { pathname } = location;

  return <></>;
};

export default IndexPage;
```

---

### useLoaction()

利用`useLocation()`获取当前路由信息

从 Gatsby 自带的`@reach/router`中解构获取

```js
import { useLocation } from "@reach/router";
```

```js
const location = useLocation();
const { pathname } = location;
```

> 如下：
>
> 获取当前路由地址`pathname`

```jsx
import React from "react";
import { useEffect } from "react";
import { useLocation } from "@reach/router";

const IndexPage = () => {
  const location = useLocation();
  const { pathname } = loaction;

  return <></>;
};

export default IndexPage;
```

<br/>

## 路由切换 & 页面跳转

::: tip 路由切换方式：

- **声明式导航**: `<Link/>`标签
- **编程式导航**: `navigate()`方法

:::

### Link 标签

Gastby 提供了 **`<Link>`标签** 用于声明式路由跳转

> 不会发送新的页面网络请求，仅在浏览器中处理

```jsx
import { Link } from "gatsby";
```

通过 `to`属性置顶跳转路径

通过 `state` 属性传递数据

可添加 `replace` 属性使浏览器忽略的历史访问记录，实现禁止后退

被选中的 Link 标签 可通过`activeClassName` 和 `activeStyle`增加样式

可通过 `getProps` 给子级导航标签设置样式

```jsx
<Link
  to="/路由地址"
  state={{
    data: {
      属性: 值,
    },
  }}
  replace
  activeClassName="类名"
  activeStyle={{
    样式属性: "值",
  }}
>
  文本内容
</Link>
```

> 如下：

```tsx
import * as React from "react";
import { Link } from "gatsby";

const IndexPage = () => (
  <>
    <header>
      <Link to="/">home page</Link>
      <Link to="/aboout">about page</Link>
      <Link to="/projects/item">item page</Link>
      <Link
        to="/song/games"
        state={{
          name: "你好",
          age: 28,
        }}
      >
        携带参数
      </Link>
    </header>
  </>
);

export default IndexPage;
```

```tsx
// /song/games
import React from "react";
import { PageProps } from "gatsby";

const IndexPage = (props: PageProps) => {
  console.log(props.location.state);
  // {name: '你好', age: 28, key: '1642834068731'}

  return <div></div>;
};

export default IndexPage;
```

---

### navigate()

::: tip 获取方式：

- 从 Gatsby 中导入后**直接使用**（推荐）

- `props.navigate()`

> TS 中组件`props`继承`PageProps`后解构获取，详见 [props & PageProps](#props-pageprops)

:::

```jsx
import { navigate } from "gatsby";
```

```jsx
navigate("跳转地址", {
  state: {
    属性: 值,
  },
  replace: true / false,
});
```

```jsx
navigate(0);
navigate(-1);
```

> 如下：

```tsx
import React from "react";
import { navigate } from "gatsby";

export default function IndexPage() {
  const go = () => {
    navigate("/song/games", {
      state: {
        name: "你好",
        age: 28,
      },
      replace: false,
    });
  };
  return (
    <>
      <button onClick={() => go()}>跳转</button>
    </>
  );
}
```

```tsx
import React from "react";
import { PageProps } from "gatsby";

const IndexPage = (props: PageProps) => {
  console.log(props.location.state);
  // {name: '你好', age: 28, key: '1642834068731'}

  return <div></div>;
};

export default IndexPage;
```

> 如下：
>
> 通过判断`GraphQL`的返回值进行登陆验证实现路由拦截
>
> 不符合条件时通过`navigate()`跳转至登陆信息页面
>
> 符合条件时在当前页面（`useLocation()`）

```jsx
import * as React from "react";
import { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { navigate } from "gatsby";
import { useLocation } from "@reach/router";
import Loading from "../Components/common/Loading";
import { GET_DATA } from "../apolloClient/doucments/queries";

const IndexPage = () => {
  const { pathname } = useLocation();
  const { data, loading, error } = useQuery(GET_DATA);

  useEffect(() => {
    if (!loading) {
      if (!data) {
        navigate("/input-customer-info");
      } else {
        navigate(pathname);
        // data的结果返回需要时间，可通过跳转实现返回当前页面
      }

      if (error) {
        console.log("error when login", error);
      }
    }
  }, [data, loading, error]);

  return loading ? <Loading /> : <>{data}</>;
};
```

<br/>

## 静态资源

### 静态资源导入

项目中有两种静态资源导入方式:

- `import` 导入

- 从上线后的静态资源目录中导入（备用方案）

::: tip import 导入文件

组件文件中通过`import`将静态资源作为一个模块导入后使用

```js
import 自定义模块名 from "开发时的相对路径";
```

> 如下：
>
> 从`src/assets`目录下导入 logo

```jsx
import React from "react";
import logo from "../../../assets/logo.png";

const Component = () => {
  return <img src={logo} alt="Logo" />;
};

export default Component;
```

:::

::: tip 导入上线后真实路径

导入的是[上线后静态资源所在路径](#上线后路径)，即直接导入 `public/目录名/文件名.后缀名`

```jsx
src={"上线后的绝对路径"}
```

> 如下：
>
> 直接从上线后的真实路径导入 logo

```jsx
import React from "react";

const Component = () => {
  return <img src={"/images/logo.png"} alt="Logo" />;
};

export default Component;
```

```js
|- public
  |- images
    |-logp.png
```

:::

---

### 上线后路径

若静态资源被存放与`static`目录下，编译时被复制到`public`根目录

`pubilc`目录下的静态资源在上线后是可以直接从浏览器地址栏访问到的

所以，`gastby`中直接引入静态资源应该是按照上线后的路径

> 如下：
>
> 浏览器地址栏访问图片时需要访问`域名/images/pic01.png`

```js
|- pubilc
  |- images
    |- pic01.png
```

```jsx
import * as React from "react";

const IndexPage = () => (
  <div>
    <img src="/images/pic01.png" alt="xxx" />
  </div>
);

export default IndexPage;
```

---

### 加载字体文件

- **自定义下载的字体**

  > 比如：xxx.woff、xxx.otf....

- **Web Font 字体** （注意版权） <br/>

  > 比如：Google Fonts, Typekit, Fonts.com, and Fontdeck<br/>

- **开源字体**

  > 根据其 readme 中使用方法，并注意版权说明

::: tip 加载自定义字体

1. 拷贝字体格式文件到项目

2. 创建 css/scss 样式文件设定`font-face` 并导入样式文件

```css
@font-face {
  font-family: "自定义字体名";
  src: url("字体格式文件地址");
}
```

> 如下：

```scss
// src/assets/style/index.scss
@font-face {
  font-family: "xxx";
  src: url("../fonts/xxx.woff");
}

body {
  font-family: "xxx", 系统默认安全字体;
  font-weight: normal;
  word-wrap: break-word;
  font-kerning: normal;
}
```

```js
|- assets
  |- fonts
    |- xxx.woff
  |- styles
    |- index.scss
```

:::

::: tip 加载 web font

1. 安装插件：`gatsby-plugin-web-font-loader`

```bash
yarn add gatsby-plugin-web-font-loader
```

2. 配置插件，项目启动自动下载字体

```js
// gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: "gatsby-plugin-web-font-loader",
      options: {
        google: {
          families: ["字体名", "字体名"],
        },
      },
    },
  ],
};
```

3. 样式文件中直接使用

```scss
body {
  font-family: "字体名", "字体名", 系统默认安全字体;
  font-weight: normal;
  word-wrap: break-word;
  font-kerning: normal;
}
```

:::

---

### StaticImage 组件

Gatsby 中可通过 **`<StaticImage/>`组件** 来加载本地、网络图片

由插件`gatsby-plugin-image`提供

```bash
yarn add gatsby-plugin-image gatsby-plugin-sharp gatsby-source-filesystem
```

```js
// gatsby-config.js
module.exports = {
  siteMetadata: {
    title: "Gatsby Site",
  },
  plugins: ["gatsby-plugin-image", "gatsby-plugin-sharp"],
};
```

`<StaticImage/>`组件功能类似`<img/>`，但会对图像做预处理

会根据显示器不同而选择适合的分辨率进行图片渲染，无需下载原图加快显示速度也节约网络流量

并提供了`imgStyle`属性，可代替`style`。可用来解决`borderRadius`在 **safari 浏览器** 失效问题

```jsx
<StaticImage src="路径" alt="描述" imgStyle={{ 样式属性: "值" }} />
```

> 如下：

```jsx
<StaticImage
  src="../images/logo.jpg"
  alt="logo"
  imgStyle={{
    border: "solid 1px #000",
    borderRadius: 10,
  }}
/>
```
