# Express.js 基础使用

![](https://ourcodeworld.com/public-media/articles/articleocw-57e57b89889ad.png)

[[toc]]

## 简介

Express.js 是一个基于 Node.js 的快速简易的 **Web 开发框架**

> 原生 Node.js 开发服务端有些麻烦

Express.js 基于 Node.js 内置 `http` 模块封装，更方便强大。

很多框架是基于 Express.js，比如：Sails、Nest.js...

::: tip Express.js 可用于创建：

- **API 接口服务器**

- **服务端渲染**的中间层

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

## 托管静态文件

### express.static()

原生 Node.js 需要封装读取静态资源，麻烦

用 express.static() 可以轻松托管静态文件，如图片、css 文件、js 文件等

参数是静态文件所在目录

```js
express.static("public");
```

然后就可以通过 URL 地址访问**该目录下的文件**了

```bash
域名：端口/文件名
```

> 如下：入口 js 文件

```js
const express = require("express");
const app = express();

const server = app.use(express.static("public"));

server.listen(3000, () => {
  console.log("running at localhost:3000");
});
```

> 项目目录：

```bash
|——node_modules
|——public
		|——images
				｜——01.jpg
				｜——02.jpg
				...
		|——css
				｜——home.css
				｜——about.css
				｜——list.css
				...
		|——js
				｜——home.js
				｜——about.js
				｜——list.js
        ...
		|——home.html
		|——about.html
		|——list.html
|——package.json
|——package-lock.json
|——index.js
```

终端执行入口 js 文件后，

浏览器输入的请求地址，就可访问到对应的文件

```bash
#访问public目录下的文件
localhost:3000/home.html
localhost:3000/about.html
localhost:3000/list.html
#访问public目录下的目录
http://127.0.0.1:3000/images/01.jpg
http://127.0.0.1:3000/js/sayHello.js
```

---

### 指定多个目录

> 如下：指定了三个要托管的目录：

```js
const express = require("express");
const app = express();

app.use(express.static("dir01"));
app.use(express.static("dir02"));
app.use(express.static("dir03"));

app.listen(3000, () => {
  console.log("running at localhost:3000");
});
```

---

### 添加虚拟目录

给静态文件添加一个虚拟的上级目录

虚拟的目录也可以被托管

```js
app.use(虚拟目录, express.static(托管目录));
```

访问时需要添加上虚拟目录的路径

> 如下：

```js
const express = require("express");
const app = express();

app.use("/static", express.static("public"));

app.listen(3000, () => {
  console.log("running at localhost:3000");
});
```

```bash
localhost:3000/home.html   #报错找不到请求地址

localhost:3000/static/home.html  #找到了
```

## 客户端渲染（CSR）

`Express.js`根据客户端请求地址进行数据的增删改查操作

服务器向客户端返回的是`JSON`对象形式的数据

对数据进行处理渲染页面是在客户端完成的

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

## 服务端渲染（SSR）

`Express.js`根据客户端请求地址进行数据的增删改查操作

向客户端返回的是`HTML`页面模版字符串

客户端浏览器解析字符串为`HTML`页面

### 静态渲染

静态渲染不常用，多用数据动态渲染模版的方式

`Express.js`读取服务器目录中的静态`HTML`文件后响应给客户端

> 如下：客户端发送`/`地址请求时，服务器读取`views`目录下的`index.html`并响应
>
> ```js
> |- views
> 	|- index.html
> |- index.js
> ```
>
> ```js
> const express = require("express");
> const app = express();
> const fs = require("fs");
>
> app.get("/", (req, res) => {
>   fs.readFile("./views/index.html", "utf-8", (err, data) => {
>     if (err) {
>       return res.status(404).send("404, not Found.");
>     }
>     res.end(data);
>   });
> });
>
> app.listen(3000, () => {
>   console.log("server running at http://localhost:3000");
> });
> ```

### 动态渲染

`Express.js`将数据 + 模版结合动态生成`HTML`页面后响应给浏览器

#### 模版引擎

`Node.js`中常用的引擎：EJS、handlebar、Pug、art-template...

#### 自定义占位符

服务端可以在`HTML`文件内容中使用占位符。（正经人不会用）

在服务器中将数据拼接字符串动态生成的 HTML 模版结构，然后替换 HTML 文件中的占位符，最后根据请求响应给客户端

> 如下：
>
> ```js
> const express = require("express");
> const app = express();
> const fs = require("fs");
>
> const list = [
>   { name: "jack", age: 29 },
>   { name: "andy", age: 28 },
> ];
>
> app.get("/", (req, res) => {
>   fs.readFile("./views/index.html", "utf-8", (err, data) => {
>     if (err) {
>       return res.status(404).send("404, not Found.");
>     }
>
>     // 动态拼接字符串生成HTML结构
>     let template = ``;
>     list.forEach((item) => {
>       template += `<li>${item.name}-${item.age}</li>`;
>     });
>     // 替换原HTML中的占位符
>     const newData = data.replace("{占位符}", template);
>
>     res.end(newData);
>   });
> });
>
> app.listen(3000, () => {
>   console.log("server running at http://localhost:3000");
> });
> ```
>
> ```html
> <!DOCTYPE html>
> <html lang="en">
>   <head>
>     <meta charset="UTF-8" />
>     <meta http-equiv="X-UA-Compatible" content="IE=edge" />
>     <meta name="viewport" content="width=device-width, initial-scale=1.0" />
>     <title>Home</title>
>   </head>
>   <body>
>     <div>Header</div>
>
>     {占位符}
>
>     <div>Footer</div>
>   </body>
> </html>
> ```
