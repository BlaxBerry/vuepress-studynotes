# Vue 代码风格——命名规范

## 项目文件命名规范

::: tip
静态文件下划线，编译文件短横线
:::

### 常见命名法

市面上常用的命名规范：

- `camelCase`（小驼峰式命名法 —— 首字母小写）
- `PascalCase`（大驼峰式命名法 —— 首字母大写）
- `kebab-case`（短横线连接式）
- `snake_case`（下划线连接式）
  > 在 JavaScript 中更自然的是 camelCase。而在 HTML 中则是 kebab-case。

### 项目名

小写加短横线分隔。例如 `my-project-app`。

### 目录名

参照项目命名规则，有复数结构时，要采用复数命名法。

```js
my-project-name/
|- BuildScript    // 流水线部署文件目录
|- docs           // 项目的细化文档目录（可选）
|- nginx          // 部署在容器上前端项目 nginx 代理文件目录
|- node_modules   // 下载的依赖包
|- public         // 静态页面目录
    |- index.html // 项目入口
|- src            // 源码目录
    |- api        // http 请求目录
    |- assets     // 静态资源目录，这里的资源会被wabpack构建
        |- icon   // icon 存放目录
        |- img    // 图片存放目录
        |- js     // 公共 js 文件目录
        |- scss   // 公共样式 scss 存放目录
            |- frame.scss   // 入口文件
            |- global.scss  // 公共样式
            |- reset.scss   // 重置样式
    |- components     // 组件
    |- plugins        // 插件
    |- router         // 路由
    |- routes         // 详细的路由拆分目录（可选）
        |- index.js
    |- store          // 全局状态管理
    |- utils          // 工具存放目录
        |- request.js // 公共请求工具
    |- views          // 页面存放目录
    |- App.vue        // 根组件
    |- main.js        // 入口文件
    |- tests          // 测试用例
    |- .browserslistrc// 浏览器兼容配置文件
    |- .editorconfig  // 编辑器配置文件
    |- .eslintignore  // eslint 忽略规则
    |- .eslintrc.js   // eslint 规则
    |- .gitignore     // git 忽略规则
    |- babel.config.js // babel 规则
    |- Dockerfile // Docker 部署文件
    |- jest.config.js
    |- package-lock.json
    |- package.json // 依赖
    |- README.md // 项目 README
    |- vue.config.js // webpack 配置
```

### 图像文件名

小写, 多个单词命名以下划线分隔。

```bash
banner_sina.gif
menu_aboutus.gif
menutitle_news.gif
logo_police.gif
logo_national.gif
pic_people.jpg
pic_TV.jpg
```

### HTML 文件

小写, 多个单词命名以下划线分隔。

```bash
|- error_report.html
|- success_report.html
```

### CSS 文件

小写, 多个单词命名以下划线分隔。

```bash
|- normalize.less
|- base.less
|- date-picker.scss
|- input-number.scss
```

### JavaScript 文件

小写, 多个单词命名以下划线分隔。

```bash
|- index.js
|- plugin.js
|- util.js
|- date-util.js
|- account-model.js
|- collapse-transition.js
```

## Vue 组件命名规范

应该始终是单词大写开头，且多个单词。这样做可以避免跟现有的以及未来的 `HTML` 元素相冲突，因为所有的 `HTML` 元素名称都是单个单词的。

尽量用完整单词的组件名，不常用的缩写尤其应该避免。并应该始终是 `PascalCase` 风格。

`App根组件` 以及 **Vue 内置组件**除外。

### 单文件组件

```bash
components
|- MyComponent.vue
```

### 单例组件

只拥有单个活跃实例的组件。这些组件永远不接受任何 prop。

以 **`The`** 前缀命名，以示其唯一性。

比如，头部和侧边栏组件。

```bash
|- TheHeading.vue
|- TheSidebar.vue
```

### 基础组件

不包含业务，独立、具体功能的基础组件。

应该全部以 **`Base`** 前缀开头 。

比如，按钮和表格组件。

```bash
|- BaseButton.vue
|- BaseTable.vue
|- BaseIcon.vue
```

### 业务组件

拥有自身 data、prop 的相关处理的组件。

比如：某个页面内有一个卡片列表，而样式和逻辑跟业务紧密相关的卡片就是业务组件。

应该以 **`Custom`** 前缀命名。

```bash
|- CustomCard.vue
```

### 紧密耦合的组件

和父组件紧密耦合的子组件应该以`父组件名`作为前缀命名。

```bash
|- TodoList.vue
|- TodoListItem.vue
|- TodoListItemButton.vue
```

### 模板中的组件

在单文件组件、字符串模板中组件名应该总是 `PascalCase`。
在 DOM 模板中总是 `kebab-case` 的。

在单文件组件、字符串模板和 JSX 中没有内容的组件应该是自闭合的。在 DOM 模板里永远不要这样做。

```html
<!-- 在单文件组件和字符串模板中 -->
<MyComponent />

<!-- 在 DOM 模板中 -->
<my-component></my-component>
```

## 代码参数命名规范

### name

规范同 Vue 组件名

```js
export default {
  name: "ToDoList",
  // ...
};
```

### prop

声明 prop 的时候,应该始终使用 `camelCase`。

在模板和 JSX 中应该始终使用 `kebab-case`。

```vue
<template>
  <WelcomeMessage greeting-text="hi" />
  <WelcomeMessage :greeting-text="text" />
</template>
```

```js
export default {
  name: "MyComponent",
  // ...
  props: {
    greetingText: {
      type: String,
      required: true,
      validator: function(value) {
        return ["syncing", "synced"].indexOf(value) !== -1;
      },
    },
  },
};
```

### router

Vue Router Path 命名采用 `kebab-case` 格式。

若使用 Snake（`/user_info`）或 camelCase（`/userInfo`）会被当成一个单词，搜索引擎无法区分语义。

```js
// good
{
  path: '/user-info', // 能解析成 user info
  name: 'UserInfo',
  component: UserInfo,
},

// bad
{
  path: '/user_info', // 被解析成了一个单词 user_info
  name: 'UserInfo',
  component: UserInfo,
},
```

### 变量

`camelCase` 格式，`类型 + 对象描述` 或 `类型 + 属性` 的方式。

```js
let tableTitle = "LoginTable";
let mySchool = "我的学校";
```

### 常量

全部大写下划线分割, 下划线用以分割单词。

```js
const MAX_COUNT = 10;
const URL = "http://test.host.com";
```

### 方法

`camelCase` 格式，使用 `动词` 或 `动词 + 名词` 的形式。

请求数据方法以 `data` 结尾

```js
// 1. 普通方法
jumpPage、openCarInfoDialog

// 2. 请求数据方法
getListData、postFormData

// 3. 单个动词的情况
init、refresh
```

| 动词 |     含义     |
| ---- | :----------: |
| can  | 判断是否执行 |
| has  | 判断是否含有 |
| is   |  判断是否为  |
| get  |     获取     |
| set  |   设置修改   |

...

### emit 自定义事件

自定义事件应始终使用 `kebab-case` 命名。

且为了和 `Vue原生事件` 区分, emit 自定义事件在使用 kebab-case 的情况下，命名还需遵守为 `on + 动词` 的形式。

```js
// 子组件
export default {
  methods: {
    handleTriggerItem01() {
      this.$emit("on-search");
    },
    handleTriggerItem02() {
      this.$emit("on-clear");
    },
    handleTriggerItem03() {
      this.$emit("on-clickoutside");
    },
  },
};
```

```html
<!-- 父组件 -->
<div
  @on-search="handleSearch"
  @on-clear="handleClear"
  @on-clickoutside="handleClickOutside"
></div>
```

::: warning 为何不用驼峰 camelCase 格式
**因为 HTML 对大小写不敏感**，`v-on` 事件监听器在 DOM 模板中会被**自动转换为全小写**。
所以 `v-on:myEvent` 将会变成 `v-on:myevent`，从而导致自定义事件名不匹配不被监听到。
:::

### methods 事件方法

`camelCase` 格式，且 `handle + 名称（可选）+ 动词` 的形式。

```vue
<template>
  <div
    @click.native.stop="handleItemClick()"
    @mouseenter.native.stop="handleItemHover()"
  ></div>
</template>

<script>
export default {
  methods: {
    handleItemClick() {
      //...
    },
    handleItemHover() {
      //...
    },
  },
};
</script>
```
