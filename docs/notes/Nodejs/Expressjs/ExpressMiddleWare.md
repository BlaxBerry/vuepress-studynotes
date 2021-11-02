# Express.js 中间件

![](https://miro.medium.com/max/679/1*4nJJgPOnlJwD6s-7ygqgTg.jpeg)

[[toc]]

## 简介

**中间件（Middleware）** 是指某个中间处理的环节。

当一个请求从客户端到达`Express.js` 服务器后，按照定义先后顺序连续调用多个中间件进处理，所有中间件的都调用完毕后将结果最终交给路由处理函数处理，最后响应信息回客户端

![](https://pbs.twimg.com/media/E3ZmKD4VoAA0Tw8?format=png&name=900x900)

### 定义中间件

中间件本质是个函数，有 3 个参数：`request`对象、`response`对象、`next`函数：

```js
const 中间件 = (req, res, next) => {
  next();
};
```

和一般路由处理函数的区别是多了一个`next`函数做参数，一般路由处理函数也可加上该 `next`函数当作中间件使用

```js
// 一般路由处理函数
app.请求方式(路径, (req, res) => {
  res.send();
});
```

### 共享请求对象、响应对象

多个中间件函数和路由函数之间共享`request`对象 和`response`对象，按照定义先后顺序，上一个中间件的执行结果输出给下一个中间件执行。

所以，中间件中也可通过`request`对象获取客户端的请求信息，也可通过`response`对象返回给客户端响应信息

也可在中间件中为`request`对象 和`response`对象上**挂载自定义属性、方法**供后面的中间件或路由函数使用

### next()

当前中间件处理完毕后必须调用 **`next()`**，不然该中间件执行完后来自客户端的请求会在此停止传递（请求被挂起），不会继续向下执行后面的中间件或路由

```js
const middleWare1 = (req, res, next) => {
  // 处理
  next();
};
const middleWare2 = (req, res, next) => {
  // 处理
  next();
};

app.use(middleWare1);
app.use(middleWare2);

app.get("/", (req, res) => {
  res.send();
});
```

`next()` 若携带参数，`Express.js` 会将当前该请求作为错误，并跳过所有无错误的请求处理和中间件，直接跳至[错误处理中间件](#错误处理中间件)处理

## 分类

::: tip 按照使用位置分为：

- [全局生效中间件](#全局中间件)

- [局部生效中间件](#局部中间件)

:::

::: tip 按照功能作用分为：

- [应用级别中间件](#应用级别中间件)
- [路由器级别中间件](#路由器级别中间件)
- [错误级别中间件](#错误级别中间件)

:::

## 全局中间件

**客户端发起的任何请求到达服务器后都会被触发的中间件**

### 定义与使用

通过 `app.use()`将一个中间件注册为**全局中间件**

```js
const expamle = (req, res, next) => {
  console.log("使用了example 中间件");
  next();
};

app.use(expamle);

app.get("/01", (req, res) => {
  res.send(req.url); // 请求执行前调用了中间件
});
app.get("/02", (req, res) => {
  res.send(req.url); // 请求执行前调用了中间件
});
app.get("/03", (req, res) => {
  res.send(req.url); // 请求执行前调用了中间件
});
```

### 多个全局中间件

```js
const mv1 = (req, res, next) => {
  next();
};
const mv2 = (req, res, next) => {
  next();
};

app.use(mv1);
app.use(mv2);
```

### 运用实例

::: tip 使用场景：

- [登陆拦截](#拦截信息)
- [登陆验证](#登陆验证)
- [404 响应](#404响应处理)
- [应用级别中间件](#应用级别中间件)
- [路由级别中间件](#路由级别中间件)
- [错误处理中间件](#错误处理中间件)

:::

#### 登陆验证

通过截获客户端请求，判断数据修改登录状态

根据状态来决定是否调用中间件的 `next()` 放开请求向下传递

```js
app.use("/login", (req, res, next) => {
  let isLogin = false;
  // 判断请求体
  if (isLogin) {
    next();
  } else {
    res.send("还未登陆");
  }
});
```

---

#### 拦截信息

比如网站维护时、不希望用户访问时

不调用`next()`，使客户端请求的传递在该中间件被拦截终止

```js
app.use((req, res, next) => {
  res.send("网站维护中，无法访问");
});
```

---

#### 404 响应处理

中间件喝路由处理函数是按定义顺序从上到下逐一调用，若客户端请求路径和所有的路由处理函数都没匹配成功时才是该请求的数据不存在，即 404 。所以，404 页面或信息的响应处理的中间件必须定义在所有路由函数之后。

```js
app.请求('/路径', (req, res)=>{/**/})
app.请求('/路径', (req, res)=>{/**/})
...

app.use((req, res, next)=>{
  res.status(404).send('404，数据不存在')
})
```

## 局部中间件

局部中间件的执行结果仅在调用了该中间件的路由函数的回调中被访问使用

### 定义与使用

局部中间件是哪一个路由函数在执行前需要就作为第二个参数调用

```js
app.请求方式(路径, 局部中间件, 回调函数);
```

> 如下：
>
> ```js
> const expamle = (req, res, next) => {
>   console.log("使用了example 中间件");
>   next();
> };
>
> app.get("/01", expamle, (req, res) => {
>   res.send(req.url); // 仅此请求执行前调用了中间件
> });
> app.get("/02", (req, res) => {
>   res.send(req.url); // 不调用中间件
> });
> app.get("/03", (req, res) => {
>   res.send(req.url); // 不调用中间件
> });
> ```

### 多个局部中间件

```js
app.请求方式(路径, 局部中间件1, 局部中间件2, 回调函数);
```

或用数组包裹

```js
app.请求方式(路径, [局部中间件1, 局部中间件2], 回调函数);
```

> 如下：
>
> ```js
> const express = require("express");
> const app = express();
>
> const mv1 = (req, res, next) => {
>   console.log("调用了局部中间件 01");
>   next();
> };
> const mv2 = (req, res, next) => {
>   console.log("调用了局部中间件 02");
>   next();
> };
>
> // 方法一
> app.get("/", mv1, mv2, (re1, res) => {
>   res.send("获得了GET请求");
> });
>
> // 方法二
> app.post("/", [mv1, mv2], (re1, res) => {
>   res.send("获得了POST请求");
> });
> ```

## 自定义中间件

无自定义参数

```js
const example = (req, res, next) => {
  ///
  next();
};

app.use(example);
```

有自定义参数

```js
const example = (params) => {
  return (req, res, next) => {
    ///
    next();
  };
};

app.use(example(params));
```

## 应用级别中间件

不指定请求方式 + 请求路径

```js
app.use((req, res, next) => {
  next();
});
```

指定请求路径

```js
app.use("/路径", (req, res, next) => {
  next();
});
```

指定请求方式 + 请求路径 （路由处理函数）

```js
app.请求方法("/路径", (req, res, next) => {
  next();
});
```

多个中间件处理一个请求路径

```js
app.请求方法(
  "/路径",
  (req, res, next) => {
    next();
  },
  (req, res, next) => {
    res.send();
  }
);
```

## 路由器级别中间件

路由器也是个中间件，需要通过`app.use()`使用。详见 [路由处理 与 路由器]()

```js
// 路由模块 index.js
const express = require("express");
const router = express.Router();

router.请求方式("/路径", (request, response) => {});
router.请求方式("/路径", (request, response) => {});
router.请求方式("/路径", (request, response) => {});

module.export = router;
```

```js
// 服务器入口文件 index.js
const express = require("express");
const app = express();
const router = require("./routes");

// 解析请求体
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

app.listen(3000);
```

## 错误处理中间件

用于统一处理请求处理函数中的错误

错误级别中间件必须有 4 个参数：`error`对象、`request`请求对象、`response`响应对象、`next`函数

```js
const ErrorMiddleWare = (err, req, res, next) => {
  res.status(500).send({
    error: err.messae,
  });
};
app.use();
```

::: tip 使用步骤

1. 在请求处理函数中使用 `try catch`，在错误处理中调用 `next()`并将错误信息作为 `next()`的参数传递

```js
app.请求方式("/路径", (req, res, next) => {
  try {
    // 正常处理
  } catch (error) {
    next(error);
  }
});
```

2. 定义并挂载到入口文件中所有中间件的最后

```js
app.use((err, req, res, next) => {
  res.status(500).send({
    error: err.messae,
  });
});
```

3. 直接接收的错误信息是个空对象，还需要通过 `util`内置模块的`format`方法解析错误信息对象为字符串

```js
const util = require('util')
app.use(err, req, res, next) => {
        res.status(500).send({
            error: util.format(err)
        })
    }
})
```

:::

::: tip 错误处理中间件 与 404 路由处理中间件：

- 错误处理中间件是捕获前面所有中间件抛出的`next(error)`<br>
  在一般中间件中的`next()` 若携带参数，`Express.js` 会将当前该请求作为错误，并跳过所有无错误的请求处理和中间件，直接跳至错误处理中间件

- 404 路由处理中间件是按照从上到下路由匹配，都不匹配则执行最后的全局生效中间件<br>
  详见 [404 路由响应处理]()

:::

## 内置中间件

**`express.static()`**

> `Express.js`开发传统网站时托管静态资源

```js
app.use(express.static(path.join(__dirname, "public")));
```

---

**`express.json()`**

> 解析 `Content-Type` 为 `application/json` 的请求体

```js
app.use(express.json());
```

---

**`express.urlencoded()`**

> 解析 `Content-Type` 为 `application/www-form-urlencoded` 的请求体

```js
app.use(express.urlencoded({ extended: true }));
```

---

`express.raw()`

> 解析 `Content-Type` 为 `application/octet-stream` 的请求体

```js
app.use(express.raw());
```

---

`express.text()`

> 解析 `Content-Type` 为 `text/plain` 的请求体

```js
app.use(express.text());
```

## 第三方中间件

[awesome-nodejs](https://github.com/sindresorhus/awesome-nodejs)

[Express Official MiddleWare](http://expressjs.com/en/resources/middleware.html)

| Middleware module                                                                 | Description                                                                                                                                                                                               | Replaces built-in function (Express 3) |
| --------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| [body-parser](http://expressjs.com/resources/middleware/body-parser.html)         | 解析 HTTP 请求体（现在建议使用内置中间件） See also: [body](https://github.com/raynos/body), [co-body](https://github.com/visionmedia/co-body), and [raw-body](https://github.com/stream-utils/raw-body). | express.bodyParser                     |
| [compression](http://expressjs.com/resources/middleware/compression.html)         | 压缩 HTTP 响应                                                                                                                                                                                            | express.compress                       |
| [connect-rid](http://expressjs.com/resources/middleware/connect-rid.html)         | Generate unique request ID.                                                                                                                                                                               | NA                                     |
| [cookie-parser](http://expressjs.com/resources/middleware/cookie-parser.html)     | 解析 cookie 数据。 See also [cookies](https://github.com/jed/cookies) and [keygrip](https://github.com/jed/keygrip).                                                                                      | express.cookieParser                   |
| [cookie-session](http://expressjs.com/resources/middleware/cookie-session.html)   | Establish cookie-based sessions.                                                                                                                                                                          | express.cookieSession                  |
| [cors](http://expressjs.com/resources/middleware/cors.html)                       | 处理跨域资源请求                                                                                                                                                                                          | NA                                     |
| [csurf](http://expressjs.com/resources/middleware/csurf.html)                     | Protect from CSRF exploits.                                                                                                                                                                               | express.csrf                           |
| [errorhandler](http://expressjs.com/resources/middleware/errorhandler.html)       | Development error-handling/debugging.                                                                                                                                                                     | express.errorHandler                   |
| [method-override](http://expressjs.com/resources/middleware/method-override.html) | Override HTTP methods using header.                                                                                                                                                                       | express.methodOverride                 |
| [morgan](http://expressjs.com/resources/middleware/morgan.html)                   | HTTP 请求日志记录                                                                                                                                                                                         | express.logger                         |
| [multer](http://expressjs.com/resources/middleware/multer.html)                   | Handle multi-part form data.                                                                                                                                                                              | express.bodyParser                     |
| [response-time](http://expressjs.com/resources/middleware/response-time.html)     | Record HTTP response time.                                                                                                                                                                                | express.responseTime                   |
| [serve-favicon](http://expressjs.com/resources/middleware/serve-favicon.html)     | Serve a favicon.                                                                                                                                                                                          | express.favicon                        |
| [serve-index](http://expressjs.com/resources/middleware/serve-index.html)         | Serve directory listing for a given path.                                                                                                                                                                 | express.directory                      |
| [serve-static](http://expressjs.com/resources/middleware/serve-static.html)       | Serve static files.                                                                                                                                                                                       | express.static                         |
| [session](http://expressjs.com/resources/middleware/session.html)                 | Establish server-based sessions (development only).                                                                                                                                                       | express.session                        |
| [timeout](http://expressjs.com/resources/middleware/timeout.html)                 | Set a timeout period for HTTP request processing.                                                                                                                                                         | express.timeout                        |
| [vhost](http://expressjs.com/resources/middleware/vhost.html)                     | Create virtual domains.                                                                                                                                                                                   | express.vhost                          |
