# Express.js 请求处理 与 路由器

![](https://ourcodeworld.com/public-media/articles/articleocw-57e57b89889ad.png)

[[toc]]

## 请求方式

::: tip

- GET（读取）
- POST（新建）
- DELETE（删除）
- PATCH（部分更新）
- PUT（全部更新）
- ALL（所有的方法）
  :::

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

## 请求路径

```js
app.get("/", (req, res) => {});

app.get("/abc", (req, res) => {});

app.get("/abd.text", (req, res) => {});

// abcd、abbcd、adddcd
app.get("/ab+cd", (req, res) => {});

// abcd、abd
app.get("/ab?cd", (req, res) => {});

// abcd、ab132cd、abxxxxcd
app.get("/ab*cd", (req, res) => {});
```

## 请求处理

::: tip Express.js 处理请求与响应的数据的方式：

- 一般路由处理函数
- 一般监控请求地址的应用级别中间件
- 路由级别中间件（路由器）统一管理

:::

### 一般路由函数

```js
app.请求方式("/路径", (request, response) => {});
```

### 应用级别中间件

```js
app.请求方式("/路径", (request, response, next) => {});
```

### 回调函数参数

::: tip 回调函数参数：

- [request](#request)：请求对象，用于获取请求信息
- [response](#response)：响应对象，用于发送响应信息
- `next`：作为中间件使用，详见 [Express.js 中间件](../Expressjs/ExpressMiddleWare.md)

:::

#### request

请求对象`request` 用于获取请求信息

::: tip

- **req.url**：客户端发送来的整个 URL
- **req.path**：请求的路由
- **req.method**：请求方式
- **req.headers**：客户端发送的请求头信息
- **req.body**：客户端发送的请求体
- **req.params**：restful 风格的请求参数
- **req.query**：查询字符串风格的请求参数

:::

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
> // 不解析请求体的话，req.body 是个 undefined
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

响应对象`response` 用于发送响应信息

::: tip

- **res.end()**：结束响应，可不返回数据

- **res.send()**：结束响应，返回任意数据做为参数

---

- **res.statusCode**：设定状态码
- **res.status()**：设定状态码

---

- **res.setHaeder(name, value)**：设置响应头
- **res.cookie(name, value)**：返回 cookie

:::

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

## 解析请求参数

### GET 请求

`GET`请求的参数通过路径传递

::: tip 两种路径风格：

- **urlencoded 风格**
- **restful 风格**

:::

#### urlencoded 风格

> /?name=andy&age=28

`Express.js` 路由回调函数中通过 `req.query` 获取客户端传递的 `urlencoded` 风格的参数

```http
/路径?key1=value1&key2=value2
```

```js
app.get("/路径", (req, res) => {
  console.log(req.query);
});
```

> 如下：
>
> ```http
> /?name=andy&age=28
> ```
>
> ```js
> app.get("/", (req, res) => {
>   console.log(req.query); // { name: 'andy', age: '28' }
>   console.log(req.query.name); // andy
>   console.log(req.query.age); // 28
> });
> ```

#### restful 风格

> /andy/28

`Express.js` 路由回调函数中通过 `req.parmas` 获取客户端传递的 `restful` 风格的参数

```http
/路径/value1/value2
```

```js
app.get("/路径/:key1/:key2", (req, res) => {
  console.log(req.params);
});
```

> 如下：
>
> ```http
> /andy/28
> ```
>
> ```js
> app.get("/:name/:age", (req, res) => {
>   console.log(req.parmas); // { name: 'andy', age: '28' }
>   console.log(req.parmas.name); // andy
>   console.log(req.parmas.age); // 28
> });
> ```

### POST 请求

`POST` 请求的参数通过请求体发送

::: tip 请求体数据两种格式：

- JSON 格式：（application/json）

- urlencoded 格式：（application/x-www-form-urlencoded）

:::

`Express.js`若想接收请求体中数据，需要先解析请求体数据

::: tip 解析请求体：

- 方法一：通过 body-parser 第三方模块（过时了）

- 方法二：通过 express.js 内置模块（推荐）

:::

#### body-parser 模块

```bash
npm i body-parser
```

> 建议 JSON 和 urlencoded 的两种解析方式都配上

```js
const bodyParser = require("body-parser");
app.use(bodyParser.json()); // 解析JSON格式请求体
app.use(bodyParser.urlencoded({ extended: true })); // 解析urlencoded格式请求体
```

#### Express.js 内置模块

内置模块不需下载，导入`Express.js`后直接使用

> 建议 JSON 和 urlencoded 的两种解析方式都配上

```js
app.use(express.json()); // 解析JSON格式请求体
app.use(express.urlencoded({ extended: true })); // 解析urlencoded格式请求体
```

## 路由器级别中间件（路由器）

### 为何使用路由器

通过路由处理函数或应用级别中间件处理的话，只能逐一书写，不合理：

```js
app.请求方式("/路径", (request, response) => {});
app.请求方式("/路径", (request, response) => {});
app.请求方式("/路径", (request, response) => {});
app.请求方式("/路径", (request, response) => {});
app.请求方式("/路径", (request, response) => {});
app.请求方式("/路径", (request, response) => {});
```

应该将这些路由处理函数全部封装到单独模块并挂载到一个 **`Router`路由实例** 上。该路由实例作为路由器，相当于一个迷你`express`实例。

```js
const express = require("express");
const router = express.Router();

router.请求方式("/路径", (request, response) => {});
router.请求方式("/路径", (request, response) => {});
router.请求方式("/路径", (request, response) => {});
router.请求方式("/路径", (request, response) => {});

module.export = router;
```

然后将路由对象导入服务器的入口文件`index.js`，按照前后执行顺序将路由器导入合适的位置。因为路由器也是个中间件，需要通过`app.use()`使用。

```js
const express = require("express");
const app = express();
const router = require("./routes");

// 解析请求体
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

app.listen(3000);
```

### 路径前缀

路由器时统一管理路由处理函数，可在挂载路由器时添加路由前缀。

在入口文件中使用挂载路由器级别中间件时，可传入路径前缀作为第一个参数，路由器实例作为第二个参数

```js
app.use("/前缀路径", router);
```

加了路径前缀之后，发送请求访问时必须在请求路径前加上设置的前缀。

> 如下：不加路由路径限制前缀：
>
> ```js
> const express = require("express");
> const app = express();
> const router = require("./routes");
>
> app.use(router);
> ```
>
> ```js
> router.请求方式("/路径", (request, response) => {});
> ```
>
> ```http
> /路径
> ```

> 如下：加上路由路径限制前缀：
>
> ```js
> const express = require("express");
> const app = express();
> const router = require("./routes");
>
> app.use("/前缀路径", router);
> ```
>
> ```js
> router.请求方式("/路径", (request, response) => {});
> ```
>
> ```http
> /前缀路径/路径
> ```

### 管理子路由器

路由器上还可以挂载子路由器

路由器是个中间件并且相当于一个迷你`express`实例。所以父路由通过`use()`方法使用子路由。

```js
父路由器.use([路径前缀], 子路由器);
```

> 如下：
>
> ```js
> // 父路由器
> const express = require("express");
> const router = express.Router();
>
> // user
> router.use(require("./user/index.js"));
> // list
> router.use(require("./list/index.js"));
>
> module.exports = router;
> ```
>
> ```js
> // 子路由器
> const express = require("express");
> const router = express.Router();
>
> // api/user/login
> router.get("/login", (req, res, next) => {
>   try {
>     res.status(200).send({
>       msg: "hello",
>     });
>   } catch (error) {
>     next(error);
>   }
> });
>
> module.exports = router;
> ```

## 404 处理

在所有路由处理之后配置 404 处理全局生效中间件

```js
app.use((req, res, next) => {
  res.status(404).send("404, Not Found");
});
```

因为 `Express.js`对客户端的请求是按照从上到下的顺序执行，所以若所有的路由处理和请求地址都不匹配则执行最后的全局生效中间件（参考 [Express.js 中间件]()）

## 重定向

```js
res.redirect("完整路由地址");
```

> 如下：SSR 服务器渲染的例子，若请求不是来自登陆页面，且`session`中没有身份信息，则重定向到登陆页面
>
> ```js
> app.use('/user', (req, res, next) => {
>     if (req.url != '/login' && !req.session.username) {
>         return res.redirect('/login')
>     }
>     next();
> })
>
> Routes....
> ```

## 响应状态码

::: tip

200：请求数据成功

201：新建/修改数据成功

204：删除数据成功

400：请求错误，服务器没有进行操作

401：请求无权限禁止访问

403：有权限但禁止访问

404：数据不存在

406：请求数据格式不对

500：服务器错误

:::
