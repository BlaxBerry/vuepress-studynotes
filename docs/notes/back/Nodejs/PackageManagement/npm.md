# npm 基础

<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Npm-logo.svg/1200px-Npm-logo.svg.png" style="zoom: 33%;" />

[[toc]]

## 简介

npm (**N**ode **P**ackage **M**anager) 是 Node.js 的第三方模块（包）的安装与管理工具

::: tip node.js 自带 npm

下载 Nodejs 后不必重复下载，后面仅需更新 npm 版本

:::

Node 中的第三方模块（包）管理工具大多有两种形式：

- JS 文件的形式：

  - 提供具体功能的 API 方法函数接口等
  - 比如：`body-parser`、`date-fns`、`cors`

- 命令行工具的形式：
  - 比如：`nodemon`、`typescript`

<br/>

## 初始化

初始化是生成 **`package.json`** 文件，来动态记录该项目所用到所有包的下载卸载信息

在项目目录下终端输入下方命令后，使用默认的信息

```shell
npm init -y
```

或按需输入项目名、版本等信息

```shell
npm init
```

::: warning

创建的项目只能是英文名，不能出现中文和空格<br/>不然初始化 `package.json` 文件是会报错

:::

> 输入的信息会体现在到 **`package.json`**

```json
{
  "name": "Node.js",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "express": "^4.18.1",
    "express-graphql": "^0.12.0",
    "graphql": "^16.5.0"
  }
}
```

::: tip

使用开发框架（ Vue、React、Vite）时框架搭建项目时自动初始化，不必单独执行该步骤。<br/>但若使用 Node.js 构建服务器等时还是需要执行初始化操作的

:::

## 模块的安装卸载

::: tip 项目初次安装包后，会在项目目录下新建

- **node_modules 的目录**

  存放所有已经安装到项目中的包<br/>项目中导入第三方模块时，就从这个目录中查找并加载

- **package-lock.json 的配置文件**

  记录每一个包的下载信息（名字、版本号、下载地址）

> 不要手动修改这两个，npm 会自动维护

:::

详见[全局安装](#全局安装)、[全局卸载](#全局卸载)

详见[项目内安装](#安装到项目内)、[项目内卸载](#卸载项目内模块)

<br/>

## 全局安装

即将依赖模块包安装到自己的电脑内，可以用在多个项目中

一般是命令行工具性质的包，比如：vue-cli、gatsby，还有其他命令行工具如 nodemon 等

```shell
npm install -g 模块名

npm install -g 模块名 模块名 模块名
```

> 也可简写：

```shell
npm i -g 模块名

npm i -g 模块名 模块名 模块名
```

全局安装的模块被下载到全局的 `node_modules` 目录下

在版本管理工具管理多版本 Node.js 时，全局安装的模块不是公用的仅限当前的版本，切换 Node.js 版本后若要使用该依赖模块则需要重新安装全局

::: tip NVM

全局安装的包的位置在指定版本的 node 的 `lib` 中的`node_modules` ：

`~/.nvm/versions/node/v14.16.0/lib/node_modules`

:::

<br/>

## 全局卸载

<br/>

## 安装到项目内

对应[全局安装]()，仅将依赖模块包作为当前项目的依赖安装，在别的项目中无法使用

---

### 依赖分类

详见下文

::: tip 生产环境依赖 开发环境依赖

- 生产环境依赖（项目上线）：

  - 项目上线后需要依赖的包

- 开发环境依赖（开发中）：
  - 项目开发时需要，单上线时不需要的包

:::

---

### 安装到开发环境

下载的依赖模块会记录入到 `package.json` 文件的 **`dependencies` 属性**中

```shell
npm install 模块名
npm install 模块名 模块名 模块名

# 或
npm install 模块名 -save
# 或
npm install 模块名 -S
```

> 简写

```shell
npm i 模块名

npm i 模块名 模块名 模块名
```

---

### 安装到生产环境

并且下载的依赖模块会记录到 `package.json` 文件的 **`devDependencies` 属性**中

```shell
npm install 模块名 -D
npm install 模块名 模块名 模块名 -D

# 或
npm install 模块名 -save-dev
```

> 简写

```shell
npm i 模块名 -D

npm i 模块名 模块名 模块名 -D
```

---

### 安装所有的依赖

在别人的项目中进行**开发**时，第一步需要下载全部依赖的包

```shell
npm install
```

> 或简写

```shell
npm i
```

该命令会下载 `packsge.json` 中 **`dependencies`(生产环境)** 和 **`devDependencies`(开发环境)** 中记录的所有依赖包，并将下载的依赖存入项目目录下创建的 `node_modules` 文件夹

---

### 安装开发环境依赖

在直接使用别人的项目（**项目上线**）而不是开发时，仅需要下载开发环境的依赖包

```shell
npm install -D
```

该命令会下载 `packsge.json` 中 **`dependencies`(生产环境)** 中记录的所有依赖包，并将下载的依赖存入项目目录下创建的 `node_modules` 文件夹

---

### 指定的版本

`npm install` 总是默认安装 **最新版本**

若想安装指定版本的包，需要在包名后加 **@版本号**

```bash
npm install XXX@version --save
npm install XXX@version --save-dev
```

---

### 最新的版本 ( 更新 )

```bash
npm install XXX@lastest --save
npm install XXX@lastest --save-dev
```

<br/>

## 卸载项目内模块

### 从开发环境卸载

```shell
npm uninstall 模块名
```

从 `node_modules` 中删除下载的依赖模块并更新 `package.json文件` 的 **`dependencies`** 属性

---

### 从生产环境卸载

```shell
npm uninstall 模块名 -D
```

从 `node_modules` 中删除下载的依赖模块并更新 `package.json文件` 的 **`devDependencies`** 属性

<br/>

## node_modules

`node_modules` 目录下存放所有已经安装到项目中的包

在通过 `npm install` 初次安装包后，后在项目目录下生成该目录

::: tip

该目录体积过大，多人协作开发时，`node_modules` 文件夹不需要一起提交，将该目录添加到 **.gitognore 文件**中即可<br/>因为生产环境和开发环境中项目需要的依赖模块包都记录到 `package.json`。别人要使用时直接根据 `package.json` 的记录 `npm install` 下载依赖即可

:::

---

### 依赖列表

查看当前目录下安装的包的列表

但没有太多意义，因为依赖包的列表会很多

```bash
npm list
```

> 若没有依赖的话如下显示 Empty

```shell
npm list

项目名@版本 /路径/当前项目
└── (empty)
```

<br/>

## package.json

项目初始化时会自动创建

在项目根目录中必须要有一个`package.json`

是项目的描述文件，用于记录于项目有关的配置信息

- 项目的名称、版本、描述

- 项目中用到的包
- 分类**开发时**用到的包、**部署上线时**用到的包

---

### 配置项

::: tip package.json Options

name： 项目文件目录名

version： 项目版本

main：入口文件

keywords： 关键字，搜索用

dependencies：生产环境的依赖包

devDependencies：开发环境的依赖包

:::

---

### 执行入口文件

在当前项目目录下执行项目的入口文件

> 默认是 `index.js`，可在 `package.json` 中修改

```bash
node .
```

::: tip nodemon

也可使用命令行工具 `nodemon` 启动，会实时监控项目的更改变化并重新启动

```shell
npm i -g nodemon
```

```shell
nodemon index.js
```

:::

---

### 自定义脚本命令

当项目中的命令特别长时，可以在 `package.json` 文件中 `scripts` 中给命令起一个别名，以后运行时直接通过运行该别名即可

```shell
npm run 自定义命令名
```

> 如下：

```shell
# 启动 vuepress 项目
npm run docs:dev
# 打包 vuepress 项目
npm run docs:build
```

```json
{
  "name": "vuepress-studynotes",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "docs:dev": "vuepress dev docs",
    "docs:build": "vuepress build docs"
  }
}
```

---

### dependencies

记录项目中核心依赖包，即开发和生产环境中都使用的依赖模块

新创建的 `package.json` 文件默认没有 `dependencies` 节点

通过 `npm install` 下载了生产环境的依赖包后，依赖包的名称和版本号会被记录到 `dependencies` 节点

> 如下：作为核心依赖包下载了 jQuery、art-template、moment

```json
{
  "name": "项目名",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "art-template": "^4.13.2",
    "jquery": "^3.6.0",
    "moment": "^2.29.1"
  }
}
```

---

### devDependencies

记录项目中仅开发环境中使用的依赖模块

通过 `npm install -D` 下载的开发环境的依赖包后，依赖包的名称和版本号会被记录到 `devDependencies` 节点

> 如下：

```json
{
  "devDependencies": {
    "@types/node": "^18.0.5",
    "@types/react": "^18.0.15",
    "@types/react-dom": "^18.0.6",
    "@types/react-highlight-words": "^0.16.4",
    "@typescript-eslint/eslint-plugin": "^5.30.6",
    "@typescript-eslint/parser": "^5.30.6",
    "@vitejs/plugin-react": "^2.0.0",
    "eslint": "^8.19.0",
    "eslint-plugin-react": "^7.30.1",
    "eslint-plugin-react-hooks": "^4.6.0",
    "prettier": "^2.7.1",
    "sass": "^1.53.0",
    "stylelint": "^14.9.1",
    "stylelint-config-prettier": "^9.0.3",
    "stylelint-config-sass-guidelines": "^9.0.1",
    "stylelint-config-standard": "^26.0.0",
    "stylelint-prettier": "^2.0.0",
    "typescript": "^4.6.4",
    "vite": "^3.0.0"
  }
}
```

---

### 依赖的版本号

::: tip 版本号

包的版本号是以 点分十进制 形式定义，共分三位数字：

```bash
大版本 . 功能版本 . Bug修复版本
# 2 . 22 . 2
```

版本号提升规则：前面的版本号增长了，后面的版本号就归零

:::

::: tip

^ : 第一位版本号不变，后面两位取最新

~ : 前面两位不变，后面一个取最新

\*：全部取最新

:::

> 如下 devDependencies 中记录的依赖项目

```json
{
  ...
  "devDependencies": {
    "@vuepress/plugin-active-header-links": "^1.8.2",
    "@vuepress/plugin-back-to-top": "^1.8.2",
    "@vuepress/plugin-google-analytics": "^1.8.2",
    "@vuepress/plugin-nprogress": "^1.8.2",
    "vuepress": "^1.8.2"
  }
}
```

:::

<br/>

## package-lock.json

详细记录模块与模块之间的依赖关系

- 锁定包的版本

  可以防止下载到不同版本的包

- 加快下载速度

::: danger

没事别乱动

:::
