# 脚手架中的 Sass

## Vue-Cli 脚手架

### 脚手架配置

vue-cli 生成项目时勾选 CSS Pre-processors (CSS 预处理器)

### 使用

**1. 组件中使用**

```vue
<style lang="scss" scoped></style>

<!-- 删除scoped 全局范围内生效 -->
<style lang="scss"></style>
```

**2. 组件中/Scss 文件中导入**

```scss
@import "../src/static/common.scss";
```

**3. main.js 中导入**

```js
import "./static/common.scss";
```

## React 脚手架

React 提前配置了 `sass-loader`，但是没有配置 `Sass` 模块

需要手动下载，否则报错提示找不到：

::: danger 报错：
Cannot find module 'sass'
:::

**1. 下载**

```bash
npm i sass
# or
yarn add sass
```

**2. 重起脚手架**

因为修改了配置文件，重起脚手架配置方可生效

**3. 版本过高导致报错**

`sass` 和 `sass-loader` 的版本过高导致的编译错误

::: danger 报错：

Module build failed: TypeError: this.getResolve is not a function

:::

降低版本即可:

```bash
npm uninstall sass-loader（卸载当前版本）
npm install sass@5.1.1 sass-loader@10.0.1
```
