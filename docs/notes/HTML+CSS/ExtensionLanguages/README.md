# CSS Extension Languages 相关目录

::: tip 官方文档
[Sass](https://www.sass.hk/)

[Less](https://less.bootcss.com/)
:::

## Less
[Less基础](./Less.md)

[Vue-Cli + Less]()

[Create-React-App + Less]()


## Sass
### 基础
[Sass/Scss基础](./Scss.md)

### Vue-Cli + Sass
vue-cli 生成项目时勾选 CSS Pre-processors (CSS预处理器)

**1. 组件中使用**
```vue
<style lang="scss" scoped>
</style>

<!-- 删除scoped 全局范围内生效 -->
<style lang="scss">
</style>
```
**2. 组件中/Scss文件中使用**
```scss
@import '../src/static/common.scss';
```

**3. main.js中使用**
```js
import "./static/common.scss";
```

---

### Create-React-App + Sass
```bash
npm install sass-loader node-sass
```
::: danger npm报错
Module build failed: TypeError: this.getResolve is not a function
:::
sass-loader的版本过高导致的编译错误
```bash
npm uninstall sass-loader（卸载当前版本）
npm install sass@5.1.1 sass-loader@10.0.1
```
