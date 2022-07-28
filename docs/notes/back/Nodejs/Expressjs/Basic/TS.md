# Express.js + TypeScript

![img](https://images.velog.io/images/ash/post/4ce4a700-e8a5-4aeb-8305-903ebfb2b79d/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202020-06-20%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%201.56.19.png)

[[toc]]

## 安装配置

```bash
npm install express typescript
```

```shell
npm install -D @types/express @types/node ts-node tsconfig-paths
```

<br/>

## 创建步骤

1. 构建项目

```bash
npm init -y
```

1. 项目目录

```js
|- index.ts
|- package.json
|- tsconfig.json
```

1. 入口文件

使用 TS 后可以使用 JS 的 `import from` 引入模块

```tsx
import express, { Express } from "express";
import cors from "cors";

const app: Express = express();

app.listen(8080, () => {
  console.log(`Server runnning at http://localhost:8080`);
});
```

<br/>

## 常用第三方模块

::: tip cors

```shell
npm install cors
npm install -D @types/cors
```

```js
import express, { Express } from "express";
import cors from "cors";

const app: Express = express();

// CORS
app.use(cors());

app.listen(8080, () => {
  console.log(`Server runnning at http://localhost:8080`);
});
```

:::
