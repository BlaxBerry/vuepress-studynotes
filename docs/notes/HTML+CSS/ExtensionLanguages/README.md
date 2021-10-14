# CSS Extension Languages 相关目录

::: tip 官方文档
[Sass](https://www.sass.hk/)

[Less](https://less.bootcss.com/)
:::

## Less

[Less 基础](./Less.md)

[Vue-Cli + Less]()

[Create-React-App + Less]()

## Sass

[Sass/Scss 基础](./Scss.md)

::: tip <h3>Vue-Cli</h3>
vue-cli 生成项目时勾选 CSS Pre-processors (CSS 预处理器)

**1. 组件中使用**

```vue
<style lang="scss" scoped></style>

<!-- 删除scoped 全局范围内生效 -->
<style lang="scss"></style>
```

**2. 组件中/Scss 文件中使用**

```scss
@import "../src/static/common.scss";
```

**3. main.js 中使用**

```js
import "./static/common.scss";
```

:::

::: tip <h3>Create-React-App</h3>
> <span style="color:red">Cannot find module 'sass'</span>

React 提前配置了 loader，但是没有配置 Sass 模块，需要手动下载 Sass
1. 下载
```bash
npm i sass
# or
yarn add sass
```
2. 因为修改了配置文件，需要重起脚手架


<br>

> <span style="color:red">Module build failed: TypeError: this.getResolve is not a function</span>

sass 和 sass-loader 的版本过高导致的编译错误，降低版本即可

```bash
npm uninstall sass-loader（卸载当前版本）
npm install sass@5.1.1 sass-loader@10.0.1
```

:::
