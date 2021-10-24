# 脚手架中的 Less

## Vue-Cli 脚手架

### 脚手架配置

Vue-Cli 生成项目时勾选 CSS Pre-processors 并选择 Less

### 手动配置

若生成项目时没配置，需要安装 `less` 和 `less-loader`

但直接安装`less-loader`会报错，因为 Vue-Cli4 采用的是`webpack4`，而直接安装的`less-loader`的最新版本是面向`webpack5+`，所以需要给`less-loader`降级，建议版本 7

```npm
npm i less-loader@7.0.0
```

因为修改了配置文件，需要重起脚手架

### 使用

**1. 组件中使用**

```vue
<style lang="less" scoped></style>

<!-- 删除scoped 全局范围内生效 -->
<style lang="less"></style>
```

**2. 组件中/Scss 文件中导入**

```scss
@import "../src/static/common.less";
```

**3. main.js 中导入**

```js
import "./static/common.less";
```

## React 脚手架
