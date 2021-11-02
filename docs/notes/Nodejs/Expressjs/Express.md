# Express.js 基础使用

![](https://ourcodeworld.com/public-media/articles/articleocw-57e57b89889ad.png)

[[toc]]

## 简介

`Express.js`是一个基于`Node.js` 的快速简易的 Web 开发框架。

`Express.js`基于`Node.js`内置的`http`模块封装，更方便强大。并支持 14 个以上的模版引擎。很多框架是基于`Express.js`：LoopBack、Sails、Nest.js...

::: tip Express.js 可用于创建：

- **Web 网站服务器**

- **API 接口服务器**

- 服务端渲染的中间层

- 开发工具（webpack-dev-server、JSON Server...）

:::

## 安装与配置

### 安装

```bash
npm i express
```

### 开启服务器

```js
|- index.js
|- package.json
```

```js
const express = require("express");
const app = express();

const port = 3000;

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
```

```bash
node index.js
```

### 目录

```js
|- config
	|- config.default.js // 配置文件
|- controller // 处理用户请求的
|- model // 操作数据
|- middleware // 各种中间件
|- router // 配置路由
|- utils // 工具模块
|- index.js // 入口文件
```

## 请求处理

### 路由函数

`Express.js` 通过路由函数的回调函数来处理请求与响应的数据

```js
const express = require("express");
const app = express();

app.请求方式(请求路径, 回调函数);
```

> 如下：
>
> ```js
> const express = require("express");
> const app = express();
>
> // 响应 根路由的GET请求
> app.get("/", (req, res) => {
>   res.send("got GET request at /");
> });
>
> // 响应 根路由的POST请求
> app.post("/", (req, res) => {
>   res.send("got POST request at /");
> });
>
> // 响应 /delete 路由的DELETE请求
> app.delete("/delete", (req, res) => {
>   res.send("got DELETE request at /delete");
> });
>
> // 响应 /new 路由的PUT请求
> app.put("/new", (req, res) => {
>   res.send("got PUT request at /new");
> });
>
> app.listen(3000, () => {
>   console.log("server running at http://localhost:3000");
> });
> ```

### 路由函数参数

```js
app.请求方式("/路径", (request, response, [next]) => {});
```

::: tip 路由处理函数的回调函数参数：

- [request](#request)：请求对象，用于获取请求信息
- [response](#response)：响应对象，用于发送响应信息
- `next`：作为中间件使用，详见 [Express.js 中间件](../Expressjs/ExpressMiddleWare.md)

:::

#### request

- req.url：客户端发送来的整个 URL

- req.path：请求的路由
- req.method：请求方式
- req.headers：客户端发送的请求头信息
- req.body：客户端发送的请求体
- req.params：restful 风格的请求参数
- req.query：查询字符串风格的请求参数

> 如下：浏览器发送 GET 请求，传递查询字符串风格参数：
>
> ```http
> http://localhost:3000/?name=andy&age=28
> ```
>
> ```js
> const express = require("express");
> const app = express();
>
> app.get("/", (req, res) => {
>   console.log(req.url);
>   console.log(req.path);
>   console.log(req.method);
>   console.log(req.query);
>   console.log(req.params);
>   console.log(req.body);
> });
> ```
>
> ```js
> /?name=andy&age=28
> /
> GET
> { name: 'andy', age: '28' }
> {}
> undefined
> ```

> 如下：浏览器发送 GET 请求，传递 restful 风格参数：
>
> ```http
> http://localhost:3000/andy/28
> ```
>
> ```js
> const express = require("express");
> const app = express();
>
> app.get("/:name/:age", (req, res) => {
>   console.log(req.url);
>   console.log(req.path);
>   console.log(req.method);
>   console.log(req.query);
>   console.log(req.params);
>   console.log(req.body);
> });
> ```
>
> ```js
> /andy/28
> /andy/28
> GET
> {}
> { name: 'andy', age: '28' }
> undefined
> ```

> 如下：浏览器发送 POST 请求
>
> ```js
> const express = require("express");
> const app = express();
>
> // 不安装 body-parser的话，req.body 是个undefined
> const bodyParser = require("body-parser");
> app.use(bodyParser.json());
> app.use(bodyParser.urlencoded({ extended: true }));
>
> app.post("/", (req, res) => {
>   console.log(req.url);
>   console.log(req.path);
>   console.log(req.method);
>   console.log(req.query);
>   console.log(req.params);
>   console.log(req.body);
> });
> ```
>
> ```js
> /
> /
> POST
> {}
> {}
> { name: 'Andy', age: '28' }
> ```

#### response

必须要通过`res.end()` 或 `res.send()` 结束响应

- res.end()：结束响应，可不返回数据

- res.send()：结束响应，返回任意数据做为参数

---

- res.statusCode：设定状态码
- res.status()：设定状态码

---

- res.setHaeder(name, value)：设置响应头
- res.cookie(name, value)：返回 cookie

```js
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.statusCode = 404;
  res.end();
});
```

```js
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.status(200).send({
    name: "andy",
    age: 28,
  });
});
```

## 操作数据

### 获取数据

> 如下：通过 `fs` 模块读取`JSON`文件，最后将数据格式化后响应回客户端
>
> ```js
> const express = require("express");
> const fs = require("fs");
> const app = express();
>
> app.get("/", (req, res) => {
>   fs.readFile("./db.json", "utf-8", (err, file) => {
>     if (err) {
>       return res.status(500).send({
>         errro: err,
>       });
>     }
>     const data = JSON.parse(file);
>     res.status(200).send(data.list);
>   });
> });
>
> app.listen(3000, () => {
>   console.log("server running at http://localhost:3000");
> });
> ```
>
> ```json
> {
>   "list": [
>     {
>       "name": "Jack",
>       "age": 28
>     },
>     {
>       "name": "Andy",
>       "age": 26
>     },
>     {
>       "name": "Tom",
>       "age": 19
>     }
>   ]
> }
> ```

### 查找数据

> 如下：通过 `fs` 模块读取`JSON`文件，通过`find()` 查找请求参数与数据，最后将匹配的数据格式化后响应回客户端
>
> ```js
> app.get("/:name", (req, res) => {
>   fs.readFile("./db.json", "utf-8", (err, file) => {
>     if (err) {
>       return res.status(500).send({
>         errro: err,
>       });
>     }
>     const data = JSON.parse(file);
>     const name = req.params.name;
>     const person = data.list.find((item) => item.name === name);
>     if (!person) {
>       return res.status(404).end();
>     }
>     res.status(200).send(person);
>   });
> });
> ```
>
> ```json
> {
>   "list": [
>     {
>       "name": "Jack",
>       "age": 28
>     },
>     {
>       "name": "Andy",
>       "age": 26
>     },
>     {
>       "name": "Tom",
>       "age": 19
>     }
>   ]
> }
> ```

### 添加数据

::: tip 步骤：

1. 获取并解析客户端请求体
2. 数据验证
3. 获取所有数据
4. 追加数据
5. 存储新数据
6. 响应信息

:::

> 如下：
>
> ```json
> {
>   "list": [
>     {
>       "id": "001",
>       "name": "Jack",
>       "age": 28
>     },
>     {
>       "id": "002",
>       "name": "Andy",
>       "age": 26
>     },
>     {
>       "id": "003",
>       "name": "Tom",
>       "age": 19
>     }
>   ]
> }
> ```
>
> ```js
> const express = require("express");
> const app = express();
> const fs = require("fs");
> const UUID = require("uuid");
>
> app.use(express.json());
> app.use(express.urlencoded({ extended: true }));
>
> app.post("/add", (req, res) => {
>   // 1.
>   const person = req.body;
>   // 2.
>   if (!person.name || !person.age) {
>     return res.status(400).send({
>       error: "必须要有名称和年龄",
>     });
>   }
>   // 3.
>   fs.readFile("./db.json", "utf-8", (err, data) => {
>     if (err) {
>       return res.status(500).send({
>         errro: err,
>       });
>     }
>     const data = JSON.parse(data);
>     // 4.
>     data.list.push({
>       id: UUID.v1(),
>       name: person.name,
>       age: person.age * 1,
>     });
>     // 5.
>     const newData = JSON.stringify(data);
>     fs.writeFile("./db.json", newData, (err) => {
>       if (err) {
>         return res.status(500).send(err);
>       }
>     });
>     // 6.
>     res.status(200).send("添加成功");
>   });
> });
> ```
>
> 但因为回调地狱，建议用封装 `promise` 风格模块后`async await` + `try catch` 导入使用
>
> ```js
> const fs = require("fs");
> const { promisify } = require("util");
> const readFile = promisify(fs.readFile);
> const writeFile = promisify(fs.writeFile);
>
> const path = require("path");
> const DBPath = path.join(__dirname, "./db.json");
>
> exports.getDB = async () => {
>   const data = await readFile(DBPath, "utf-8");
>   return JSON.parse(data);
> };
>
> exports.saveDB = async (data) => {
>   const newData = JSON.stringify(data);
>   await writeFile(DBPath, newData);
> };
> ```
>
> ```js
> const express = require("express");
> const app = express();
> const UUID = require("uuid");
> const { getDB, saveDB } = require("./handleDB");
>
> app.use(express.json());
> app.use(express.urlencoded({ extended: true }));
>
> app.post("/add", async (req, res) => {
>   try {
>     // 1.
>     const person = req.body;
>     // 2.
>     if (!person.name || !person.age) {
>       return res.status(400).send({
>         error: "必须要有名称和年龄",
>       });
>     }
>     // 3.
>     const data = await getDB();
>     // 4.
>     data.list.push({
>       id: UUID.v1(),
>       name: person.name,
>       age: person.age * 1,
>     });
>     // 5.
>     await saveDB(data);
>     // 6.
>     res.status(200).send("添加成功");
>   } catch (error) {
>     res.status(500).send({
>       error: error.message,
>     });
>   }
> });
> ```

### 修改数据

::: tip 步骤：

1. 获取请求参数
2. 获取全部数据
3. 查找判断
4. 合并
5. 储存新数据
6. 响应消息

:::

> 如下：
>
> ```json
> {
>   "list": [
>     {
>       "id": "001",
>       "name": "Jack",
>       "age": 28
>     },
>     {
>       "id": "002",
>       "name": "Andy",
>       "age": 26
>     },
>     {
>       "id": "003",
>       "name": "Tom",
>       "age": 19
>     }
>   ]
> }
> ```
>
> ```js
> const express = require("express");
> const app = express();
> const fs = require("fs");
>
> app.use(express.json());
> app.use(express.urlencoded({ extended: true }));
>
> app.patch("/change/:id", (req, res) => {
>   // 1.
>   const { id } = req.params;
>   const person = req.body;
>   // 2.
>   fs.readFile("./db.json", "utf-8", (err, file) => {
>     if (err) {
>       return res.status(500).send({
>         errro: err,
>       });
>     }
>     const data = JSON.parse(file);
>
>     // 3.
>     const target = data.list.find((item) => item.id === id);
>     if (!target) {
>       return res.status(404).end();
>     }
>     Object.assign(target, person);
>
>     // 4.
>     const newData = JSON.stringify(data);
>     fs.writeFile("./db.json", newData, (err) => {
>       if (err) {
>         return res.status(500).send(err);
>       }
>     });
>     res.status(201).send({
>       msg: "修改成功",
>       res: person,
>     });
>   });
> });
>
> app.listen(3000, () => {
>   console.log("server running at http://localhost:3000");
> });
> ```
>
> 但因为回调地狱，建议用封装 `promise` 风格模块后`async await` + `try catch` 导入使用
>
> ```js
> const fs = require("fs");
> const { promisify } = require("util");
> const readFile = promisify(fs.readFile);
> const writeFile = promisify(fs.writeFile);
>
> const path = require("path");
> const DBPath = path.join(__dirname, "./db.json");
>
> exports.getDB = async () => {
>   const data = await readFile(DBPath, "utf-8");
>   return JSON.parse(data);
> };
>
> exports.saveDB = async (data) => {
>   const newData = JSON.stringify(data);
>   await writeFile(DBPath, newData);
> };
> ```
>
> ```js
> const express = require("express");
> const app = express();
> const { getDB, saveDB } = require("./handleDB");
>
> app.use(express.json());
> app.use(express.urlencoded({ extended: true }));
>
> app.patch("/change/:id", async (req, res) => {
>   try {
>     // 1.
>     const { id } = req.params;
>     const person = req.body;
>     // 2.
>     const data = await getDB();
>     // 3.
>     const target = data.list.find((item) => item.id === id);
>     if (!target) {
>       return res.status(404).end();
>     }
>     // 4.
>     Object.assign(target, person);
>     // 5.
>     await saveDB(data);
>     // 6.
>     res.status(201).send({
>       msg: "修改成功",
>       res: person,
>     });
>   } catch (error) {
>     return res.status(500).send({
>       errro: error.message,
>     });
>   }
> });
>
> app.listen(3000, () => {
>   console.log("server running at http://localhost:3000");
> });
> ```

### 删除数据

::: tip 步骤：

1. 获取请求参数
2. 获取所有数据
3. 判断是否存在
4. 删除
5. 存储新数据
6. 响应消息

:::

> 如下：
>
> ```json
> {
>   "list": [
>     {
>       "id": "001",
>       "name": "Jack",
>       "age": 28
>     },
>     {
>       "id": "002",
>       "name": "Andy",
>       "age": 26
>     },
>     {
>       "id": "003",
>       "name": "Tom",
>       "age": 19
>     }
>   ]
> }
> ```
>
> ```js
> const express = require("express");
> const app = express();
> const fs = require("fs");
>
> app.use(express.json());
> app.use(express.urlencoded({ extended: true }));
>
> app.delete("/remove/:id", (req, res) => {
>   // 1.
>   const { id } = req.params;
>   // 2.
>   fs.readFile("./db.json", "utf-8", (err, file) => {
>     if (err) {
>       return res.status(500).send({
>         errro: err,
>       });
>     }
>     const data = JSON.parse(file);
>     // 3.
>     const index = data.list.findIndex((item) => item.id === id);
>     if (index === -1) {
>       return res.status(404).end();
>     }
>     // 4.
>     data.list.splice(index, 1);
>     // 5.
>     const newData = JSON.stringify(data);
>     fs.writeFile("./db.json", newData, (err) => {
>       if (err) {
>         return res.status(500).send(err);
>       }
>     });
>     // 6.
>     res.status(204).send("删除成功");
>   });
> });
>
> app.listen(3000, () => {
>   console.log("server running at http://localhost:3000");
> });
> ```
>
> 但因为回调地狱，建议用封装 `promise` 风格模块后`async await` + `try catch` 导入使用
>
> ```js
> const fs = require("fs");
> const { promisify } = require("util");
> const readFile = promisify(fs.readFile);
> const writeFile = promisify(fs.writeFile);
>
> const path = require("path");
> const DBPath = path.join(__dirname, "./db.json");
>
> exports.getDB = async () => {
>   const data = await readFile(DBPath, "utf-8");
>   return JSON.parse(data);
> };
>
> exports.saveDB = async (data) => {
>   const newData = JSON.stringify(data);
>   await writeFile(DBPath, newData);
> };
> ```
>
> ```js
> const express = require("express");
> const app = express();
> const { getDB, saveDB } = require("./handleDB");
>
> app.use(express.json());
> app.use(express.urlencoded({ extended: true }));
>
> app.delete("/remove/:id", async (req, res) => {
>   try {
>     // 1.
>     const { id } = req.params;
>     // 2.
>     const data = await getDB();
>     // 3.
>     const index = data.list.findIndex((item) => item.id === id);
>     if (index === -1) {
>       return res.status(404).end();
>     }
>     // 4.
>     data.list.splice(index, 1);
>     // 5.
>     await saveDB(data);
>     // 6.
>     res.status(204).send("删除成功");
>   } catch (error) {
>     return res.status(500).send({
>       errro: error.message,
>     });
>   }
> });
>
> app.listen(3000, () => {
>   console.log("server running at http://localhost:3000");
> });
> ```

## 自定义模块

```js
const { promisify } = require("util");
```

`util`模块中的`promisify`方法可以将`callback`回调函数转换为为 `Promise` 形式，防止回调地狱

> 如下：
>
> `readFile`代码重复，可以进行封装
>
> ```js
> const express = require("express");
> const fs = require("fs");
> const app = express();
>
> app.get("/", (req, res) => {
>   fs.readFile("./db.json", "utf-8", (err, data) => {
>     if (err) {
>       return res.status(500).send({
>         errro: err,
>       });
>     }
>     const db = JSON.parse(data);
>     res.status(200).send(db.list);
>   });
> });
>
> app.get("/:name", (req, res) => {
>   fs.readFile("./db.json", "utf-8", (err, data) => {
>     if (err) {
>       return res.status(500).send({
>         errro: err,
>       });
>     }
>     const db = JSON.parse(data);
>     const name = req.params.name;
>     const person = db.list.find((item) => item.name === name);
>     if (!person) {
>       return res.status(404).end();
>     }
>     res.status(200).send(person);
>   });
> });
>
> app.listen(3000, () => {
>   console.log("server running at http://localhost:3000");
> });
> ```
>
> 可借助`promisify`将`readFile`封装为 `Promise` 形式防止回调地狱
>
> ```js
> const fs = require("fs");
> const { promisify } = require("util");
> const readFile = promisify(fs.readFile);
>
> const path = require("path");
> const DBPath = path.join(__dirname, "./db.json");
>
> const getDB = async () => {
>   const data = await readFile(DBPath, "utf-8");
>   return JSON.parse(data);
> };
> module.exports = getDB;
> ```
>
> 导入后，通过`async await` 获取数据
>
> 文件读取时的错误可不在封装的模块内逐一处理，而是在外面直接通过`try catch` 处理
>
> ```js
> const express = require("express");
> const app = express();
>
> const getDB = require("./getDB");
>
> app.get("/", async (req, res) => {
>   try {
>     const db = await getDB();
>     res.status(200).send(db.list);
>   } catch (err) {
>     res.status(500).send({
>       errro: err.message,
>     });
>   }
> });
>
> app.get("/:name", async (req, res) => {
>   try {
>     const db = await getDB();
>     const name = req.params.name;
>     const person = db.list.find((item) => item.name === name);
>     if (!person) {
>       return res.status(404).end();
>     }
>     res.status(200).send(person);
>   } catch (err) {
>     res.status(500).send({
>       errro: err.message,
>     });
>   }
> });
>
> app.listen(3000, () => {
>   console.log("server running at http://localhost:3000");
> });
> ```
