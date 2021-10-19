# Vue2 + Vue-Cli 脚手架

![](https://reffect.co.jp/wp-content/uploads/2019/06/vue_tue_cli.png)

## 环境配置

> 检查版本
>
> ```bash
> vue --version
> @vue/cli 4.5.12
> ```

1. **全局安装**

   ```bash
   npm i -g @vue/cli
   ```

2. **切换到指定目录后创建项目**

   ```bash
   cd xxx
   vue create xxx
   # 或
   vue create .
   ```

3. **设置配置**

   选择默认配置或自行配置

   > Enter 确认选择，Ctrl+C 退出

   ```bash
   Vue CLI v4.5.12
   ? Please pick a preset: (Use arrow keys)
   ❯ Default ([Vue 2] babel, eslint)
   ❯ Default (Vue 3 Preview) ([Vue 3] babel, eslint)
   ❯ Manually select features
   ```

4. **切换到项目后，启动项目**

   ```bash
   cd xxx
   npm run serve
   ```

5. **浏览器访问`http://localhost:8080/`会显示默认界面**

6. **自定义项目内容**

## 脚手架目录

```js
XXX |
-node_modules |
-public |
-index.html |
-favicon.ico |
-src |
-assets | // 项目静态资源
-components | // 组件
-A.vue |
-B.vue |
-api |
-plugins |
-router |
-store |
-styles |
-utils |
-views |
-App.vue | // 根组件
-main.js | //
  -babel.config.js |
  -package.json |
  (-package - lock.json) |
  -vue.config.js;
```

::: warning

脚手架默认配置规定:

`public目录`、`src`目录、`main.js文件`，
以及 /public 目录下的`favicon.ico`、`index.html`
这五个不能修改名称，不然会无法运行。

:::

### App.vue

Vue-Cli 脚手架中，

Vue 实例管理 **`App.vue`** 组件， **`App.vue`** 管理其余所有的组件。

```js
|- components
	|- A.vue
	|- B.vue
|- App.vue
```

### index.html

```html
<!DOCTYPE html>
<html lang="">
  <head>
    <meta charset="utf-8" />
    <!-- 针对IE8及以下版本 -->
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <!-- 针对移动端，开启理想视口 -->
    <meta name="viewport" content="width=device-width,initial-scale=1.0" />
    <!-- Favicon图标 -->
    <link rel="icon" href="<%= BASE_URL %>favicon.ico" />
    <!-- 网页标题 -->
    <title><%= htmlWebpackPlugin.options.title %></title>
  </head>
  <body>
    <!-- 仅在浏览器不支持JS时显示该标签 -->
    <noscript>
      <strong
        >We're sorry but <%= htmlWebpackPlugin.options.title %> doesn't work
        properly without JavaScript enabled. Please enable it to
        continue.</strong
      >
    </noscript>
    <!-- 容器 -->
    <div id="app"></div>

    <!-- built files will be auto injected -->
  </body>
</html>
```

::: tip

- **`<%= BASE_URL %>`** ：

  解决资源引用的路径问题，指向`/public`目录下

- **`<%= htmlWebpackPlugin.options.title %>`**：

  指向`package.json`文件的`name`

:::

### mian.js

项目入口文件，在此导入插件和配置

```js
// 引入Vue
import Vue from "vue";
// 引入App.vue根组件
import App from "./App.vue";
// 关闭浏览器生产提示
Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
```

---

#### render 函数

Vue 调用 render 函数，传递 h 函数渲染创建模版容器

作用可参考 React 的 render 函数

```js
new Vue({
  render: (h) => h(App),
}).$mount("#app");
```

---

#### Vue.use()

使用[插件](#Vue插件)

Vue.use() 实际是定义到了在了 Vue 实例的原型链上

```js
import Vue from "vue";
import App from "./App.vue";
Vue.config.productionTip = false;

import router from "./router";
import store from "./store";
import Vant from "vant";
import "vant/lib/index.css";
Vue.use(Vant);

new Vue({
  render: (h) => h(App),
  router,
  store,
}).$mount("#app");
```

### vue.config.js

脚手架项目相关的配置文件，是一个可选的配置文件

写入的内容会覆盖原来的默认配置

比如：出入口文件、资源路径、语法检查等

**配置修改后需要重启脚手架才会生效**

```js
module.exports = {
  // 配置项
};
```

配置项详见 [官方文档脚手架配置项](https://cli.vuejs.org/zh/config/#vue-config-js)



## 打包构建

```bash
npm run build
```
配置项详见 [官方文档脚手架配置项](https://cli.vuejs.org/zh/config/#vue-config-js)

最终打包出的目录是 `dist`目录,

生成的 `dist/index.html` 需要在服务器下打开

::: tip 

- 将`dist中的文件` 做为静态资源放入服务器的 `static`目录
- 可使用 VSCode的 **Live Server插件**
- 或通过 **命令行工具 server** 开启服务器，然后打开 `localhost:5000`
  ```bash
  cd dist
  srever .
  ```

::: 


## 脚手架配置项

### 代理

前端通过 Ajax 给后端发请求回收同源策略限制，从而出现 Ajax 跨越问题：

::: danger 前端 Ajax 请求跨越报错：

Access to XMLHttpRequest at 'https://xxxxx' from origin 'http://localhost:8080' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.

:::

但是服务器与服务器之间请求不会受限制。所以可在和前端同域名下开一个**代理服务器**，作为请求和响应的中介。
即开启代理服务器后，前端发送请求时是发送到代理服务器（同域名）

::: tip 开启反响代理的方法：

- <a>nginx</a> 开启反向代理服务器

- Vue-Cli 脚手架配置<a>devServer.proxy</a>

:::

#### 配置方法一

1. 配置 `vue.config.js`

```js
module.exports = {
  devServer: {
    proxy: "http://目标地址域名径",
  },
};
```

2. 修改前端的请求发送地址为代理服务器域名（和前端同域名）

```js
axios
  .get("http://localhost:8080/xxxxx")
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err.message);
  });
```

3. 因为修改了配置，要重启脚手架才会生效


> 该方法的特点：
> - **配置简单**<br>
>   直接发给前端开发服务器(localhost:8080)即可
> - **不能配置多个代理**
> - **不能控制请求是否走代理, 会优先匹配前端现有资源**<br>
>   若请求的资源自身服务器中有则不会走代理，没有才会走代理发送请求
---

#### 配置方法二

想控制代理或配置多个代理，可用一个 `请求路径的配置项`来配置

```js
module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://目标地址域名',
        pathRewrite: { '^/api': '' },
        ws: true,
        changeOrigin: true
      },
      '/自定义前缀': {
        target: 'http://目标地址域名',
        pathRewrite: { '^/自定义前缀': '' },
        ws: true,
        changeOrigin: true
      }
    }
  }
}
```
> - `/api`：请求前缀 <br>
>   前缀可以自定义名
>   若想走代理在请求前加上盖前缀，不想走代理（请求自身服务器资源）则不加
> - `pathRewrite: { '^/api': '' }` <br>
>   防止代理发发送过去的请求中还带有请求前缀
> - `changeOrigin: true` （默认）<br>
>   请求头host为目标地址的域名
> - `changeOrigin: false`<br>
>   请求头host为前端的域名

2. 发送请求时，在需要走代理请求的的域名后加上代理请求前缀
```js
"http://前端开发服务器域名/代理请求前缀/xxxxx"
```
```js
axios
  .get("http://localhost:8080/api/xxxxx")
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err.message);
  });
```

3. 也要重启脚手架



### 出入口

### 公共路径



### 默认配置

了解即可别乱搞

脚手架基于 webpack，但是把 webpack 相关配置隐藏了

若想看到 webpack 配置相关内容，通过下列指令

将所有配置内容写入一个 `output.js` 文件

```bash
vue inspect  > output.js
```

配置项详见 [vue.config.js](#vue.config.js)





## Vue 插件

### 自定义插件

```js
src | -plugins | -example.js;
```

```js
export default {
    install(Vue, 参数....){
        console.log(111);
        // 定义全局过滤器
        // 定义自定义指令
        // 定义混入
        // 给Vue原型添加一个方法
        // ...
    }
}
```

### 导入插件

无论第三方插件还是自定义插件，都在 `main.js` 中通过 `Vue.use()` 导入

且`Vue.use()` 导入插件必须是在创建 Vue 实例之前

```js
import Vue from "vue";
import App from "./App.vue";
import router from "./router";

Vue.config.productionTip = false;

// Vuetify
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
Vue.use(Vuetify);
export default new Vuetify({});

// Material Design icons
import "@mdi/font/css/materialdesignicons.css";

// Vue Typer
import VueTyperPlugin from "vue-typer";
Vue.use(VueTyperPlugin);

// vue Smooth Scroll
import vueSmoothScroll from "vue-smooth-scroll";
Vue.use(vueSmoothScroll);

// Vue Carousel
import VueCarousel from "vue-carousel";
Vue.use(VueCarousel);

// vue lazyload
import VueLazyload from "vue-lazyload";
import loadingPic from "./assets/loading/loading-mobile.png";
Vue.use(VueLazyload, {
  preLoad: 1.3,
  loading: loadingPic,
  attempt: 1,
});

new Vue({
  router,
  vuetify: new Vuetify(),
  render: (h) => h(App),
}).$mount("#app");
```
