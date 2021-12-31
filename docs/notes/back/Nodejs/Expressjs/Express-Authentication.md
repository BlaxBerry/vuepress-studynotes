# Express.js 身份验证

## JWT 验证

### jsonwebtoken

#### 1. 安装导入

```bash
npm install jsonwebtoken
```

```js
const jwt = require("jsonwebtoken");
```

#### 2. 生成签发 token

```js
const secret = "自定义字符串";
const token = jwt.sign({ 自定义: "用户信息" }, secret);
```

```js
// 因为生成会有耗时，推荐异步生成
const token = jwt.sign({ 自定义: "用户信息" }, secret, (err, token) => {
  if (err) {
    return console.log("token 生成失败");
  }
  console.log(token);
});
```

可通过`Node.js`的内置模块`util`的`promisfy`将`sign()`方法的回调函数转为`promise`形式

> ```js
> const jwt = require("jsonwebtoken");
> const { promisify } = require("util");
>
> // create token
> exports.sign = promisify(jwt.sign);
> ```
>
> ```js
> const JWT = require("xxxx");
> const secret = "自定义字符串";
>
> app.post("/register", async (req, res) => {
>   // create token
>   const token = await JWT.sign({ id: req.body.id }, secret);
>   // 响应
>   res.status(201).send({
>     msg: "创建成功",
>     token,
>   });
> });
> ```

#### 3. 验证 token

```js
const res = jwt.verify(token, 生成token时的唯一性密钥);
```

```js
// 因为验证会有耗时，推荐异步判断
jwt.verify(token字符串, 生成token时的唯一性密钥, (err, res) => {
  if (err) {
    return console.log("token 验证失败");
  }
  console.log(res);
});
```

可通过`Node.js`的内置模块`util`的`promisfy`将`sign()`方法的回调函数转为`promise`形式

```js
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

// validate token
exports.verify = promisify(jwt.verify);
```

```js
const JWT = require("xxxx");
const secret = "自定义字符串";

app.post("/profile", async (req, res) => {
  // 从请求头接收token
  let token = req.headers.authorization;
  token = token ? token.split("Bearer ")[1] : null;

  if (!token) {
    return res.status(401).send({
      status: 401,
      msg: "authorization is required.",
    });
  }
  // 获取token中携带信息
  const decodedToken = await verify(token, secret);

  // 从数据库中获取数据并验证

  // 响应
  res.status(201).send({
    msg: "认证成功",
  });
});
```

## Session 验证

### express-session

#### 1. 安装导入

```bash
npm i express-session
```

通过 secret 设置密钥，虽然客户端能查看`Cookie`但是没有密钥看到的是一堆加密字符串

```js
// 导入
const session = require("express-session");

// 使用中间件
app.use(
  session({
    secret: "secret key", // 设置密钥，任意字符串
    resave: false,
    saveUninitialized: true,
  })
);
```

#### 2. 向 Session 对象中存数据

在 **express-session** 中间件配置成功后，

可通过`req.session`访问使用`session`对象，

并通过`req.session.自定义属性`来储存用户信息和登陆状态

```js
app.post("/post", (req, res) => {
  // 储存用户信息
  req.session.userInfo = req.body;
  // 储存用户登陆状态
  req.session.islogin = true;

  res.send({
    status: 200,
    msg: "登陆成功",
    data: {
      username: req.session.userInfo.username,
      email: req.session.userInfo.email,
    },
  });
});
```

> 再比如：链接了 MongoDB 的场合
>
> ```js
> router.post("/login", async (req, res) => {
>   // 获取请求参数
>   const { email, password } = req.body;
>   // 判断登陆邮箱是否存在于数据库中
>   let user = await User.findOne({ email });
>   if (user) {
>     // bcrypt匹配加密后的密码
>     const isEqual = await bcrypt.compare(password, user.password);
>     if (isEqual) {
>       // 储存登陆用户的信息到session中
>       req.session.username = user.username;
>
>       res.send("登陆成功");
>     } else {
>       res.status(400).render("admin/error", { msg: "密码错误" });
>     }
>   } else {
>     res.status(400).render("admin/error", { msg: "该邮箱不存在" });
>   }
> });
> ```

#### 3. 检查 Cookie

后面返回给浏览器的`Cookie`为加密字符串

<img src="https://pbs.twimg.com/media/E57DJOcVoAAnTJL?format=jpg&name=medium" style="zoom:50%;" />

#### 4. 清空 Session

比如用户退出登陆时，需要清空`Session`

通过`req.sessino.destroy()`实现清空服务器保存的`sessin`信息

清空的只是请求退出的当前用户的`Session`，不会清除其他人的

> 如下：清除关于该用户的`session`和`cookie`，并且重定向回`login页面`
>
> ```js
> app.post('/logout', (req, res) => {
>     // clear session
>     req.session.destroy(() => {
>         // clear cookie (express-session默认名)
>         res.clearCookie('connect.sid');
>         // 重定向
>         res.redirect('/admin/login')
>     })
> }
> ```
