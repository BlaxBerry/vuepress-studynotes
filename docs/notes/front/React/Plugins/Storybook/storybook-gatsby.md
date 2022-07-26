# Storybook + Gatsby

![img](https://user-images.githubusercontent.com/321738/63501763-88dbf600-c4cc-11e9-96cd-94adadc2fd72.png)

[[toc]]

## 环境

### 安装构建

在 Gatsby 项目中构建 Storybook

```bash
npx sb init --builder webpack5
```

运行此命令会添加必要的 Storybook 依赖项、配置文件和一组样板 storybook 文件

```js
|- .storybook
    |- main.js
		|- review.js
|- src
		|- ...
```

也可按需进一步自定义配置

---

### 版本更新

按需更新，本文使用 Storybook v6

> Storybook 依赖于 webpack 4，盖茨比目前支持 webpack 5

```bash
npx sb upgrade
npm i -D @storybook/builder-webpack5 @storybook/manager-webpack5
/* storybook/main.js */
module.exports = {
  stories: [],
  addons: [],
  core: {
    builder: "webpack5",
  },
};
```

---

### main.js

> 可安装 storybook-addon-gatsby 来简化配置
>
> ```js
> yarn add -D storybook-addon-gatsby
> ```

```js
module.exports = {
  // You will want to change this to wherever your Stories will live
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "storybook-addon-gatsby",
  ],
  core: {
    builder: "webpack5",
  },
  webpackFinal: async (config) => {
    // Transpile Gatsby module because Gatsby includes un-transpiled ES6 code.
    config.module.rules[0].exclude = [/node_modules\/(?!(gatsby)\/)/];
    // Use babel-plugin-remove-graphql-queries to remove static queries from components when rendering in storybook
    config.module.rules[0].use[0].options.plugins.push(
      require.resolve("babel-plugin-remove-graphql-queries")
    );
    return config;
  },
};
```

---

### preview.js

```js
import { action } from "@storybook/addon-actions";

// Gatsby's Link overrides:
// Gatsby Link calls the `enqueue` & `hovering` methods on the global variable ___loader.
// This global object isn't set in storybook context, requiring you to override it to empty functions (no-op),
// so Gatsby Link doesn't throw errors.
global.___loader = {
  enqueue: () => {},
  hovering: () => {},
};
// This global variable prevents the "__BASE_PATH__ is not defined" error inside Storybook.
global.__BASE_PATH__ = "/";

// Navigating through a gatsby app using gatsby-link or any other gatsby component will use the `___navigate` method.
// In Storybook, it makes more sense to log an action than doing an actual navigate. Check out the actions addon docs for more info: https://storybook.js.org/docs/react/essentials/actions

window.___navigate = (pathname) => {
  action("NavigateTo:")(pathname);
};
```

<br/>

## 自定义配置

### SCSS 样式

```js
module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "storybook-addon-gatsby",
  ],
  core: {
    builder: "webpack5",
  },
  framework: "@storybook/react",

  webpackFinal: async (config) => {
    // Gatsby 相关配置
    config.module.rules[0].exclude = [/node_modules\/(?!(gatsby)\/)/];
    config.module.rules[0].use[0].options.plugins.push(
      require.resolve("babel-plugin-remove-graphql-queries")
    );

    // Storybook 中 SCSS 样式不会无效
    config.module.rules.push({
      test: /\.scss$/,
      use: ["style-loader", "css-loader", "sass-loader"],
    });

    return config;
  },
};
```

<br/>

## 使用

Storybook 默认查找所有扩展名为`.stories.jsx` 的文件并将其加载到 Storybook 视图中

可在 `main.js` 中配置文件后缀为 `.js | .jsx | .tsx | .mdx`

[详见上文](https://blaxberry.github.io/vuepress-studynotes/notes/front/Tools/StoryBook/Gatsby.html#mainjs)

---

### 目录

`xxx.stories.tsx` 建议放在同一层目录，方便查询

> 如下：自定义 Button 组件与其 storybook 文件

```js
|-src
  |- components
	   |- share
			  |- Button
					|- customButton.tsx
					|- customButton.stories.tsx
```

---

### .stories.tsx

```tsx
import { Meta, Story } from "@storybook/react";
import { 组件, 组件props属性的类型 } from "./组件";
/* 按需导入数据/icon/TS类型等 */
import 会用到的模块 from "所在位置";

/* storybook 视图测试界面【左侧】侧边栏中按 title 指定的层级展 */
export default {
  title: "侧边栏中的分类/[层级/]显示的组件名",
  component: 组件,
} as Meta;

/* 在 storybook 视图测试界面【右侧】展示的模版 */
const Template: Story<组件props属性的类型> = (args) => (
  <>
    {/* 自定义 JSX 标签 */}
    <组件 {...args} />
  </>
);

/**
 * 在storybook 视图测试界面【左侧】侧边栏中展示的层级与个数
 * 想展示几个就写几个
 */
export const 自定义名A = Template.bind({}); // 默认的样式与内容

export const 自定义名B = Template.bind({});
// 自定义【左侧】侧边栏中展示的组件名
自定义名B.storyName = "自定义组件名";
// 传入自定义属性
自定义名B.args = {
  组件props属性: 值,
  组件props属性: 值,
};
// 【左侧】controls 与 doc 默认值等相关设置
// 可使用 markdown 语法的 `代码` & **加粗**
自定义名B.argTypes = {
  组件props属性名: {
    type: { name: "string", required: true | false },
    description: "Description 栏详情描述",
    table: {
      /* Description 栏*/
      type: { summary: "数据类型 | 数据类型", detail: "点击后展示内容" },
      /* Default 栏*/
      defaultValue: {
        summary: "数据类型 | 数据类型",
        detail: "点击后展开内容",
      },
    },
    /* Control 栏*/
    control: {
      type: "控制台以何种形式输入属性值" /* text | radio | select | color */,
      /* options: ['选择项', '选择项'], */
    },
  },
};
```

若只想展示传入不同 props 属性值的状态（不使用 storybook 控制台 control 也不想展示等相关默认值时），可

```tsx
import { Meta, Story } from "@storybook/react";
import { 组件, 组件props属性的类型 } from "./组件";

export default {
  title: "侧边栏中的分类/[层级/]显示的组件名",
  component: 组件,
} as Meta;

export default {
  title: "Common/Button",
  component: CustomButton,
} as Meta;

const Template: Story<ButtonProps> = (args) => <CustomButton {...args} />;

// storybook 控制台的 controls 中不显示的 props
const hideControlsArgsType = {
  组件props属性: { table: { disable: true } },
  组件props属性: { table: { disable: true } },
};

export const 自定义名 = Template.bind({});
自定义名.args = {
  组件props属性: 值,
  组件props属性: 值,
};
自定义名.argTypes = { ...hideControlsArgsType };
```
