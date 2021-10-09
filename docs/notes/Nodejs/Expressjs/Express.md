# Express基础

<img src="https://res.cloudinary.com/practicaldev/image/fetch/s--tzFy8l83--/c_imagga_scale,f_auto,fl_progressive,h_900,q_auto,w_1600/https://dev-to-uploads.s3.amazonaws.com/i/1stt4h63pbbb79pjzuf6.png" style="zoom:50%;" />

## 简介

Express是一个基于Node.js 的快速简易的**Web开发框架**

基于Node.js内置的http模块封装，更方便强大

可用于创建：

- **Web网站服务器**

- **API接口服务器**





## 安装

本笔记使用的是4.17.1版本

```bash
npm i express@4.17.1
```



## 基础使用

### 创建基础Web服务器

```js
// 1. 导入 express
const express = require('express')

// 2. 创建web 服务器
const app = express()

// 3. 监听端口，启动服务器
app.listen(3000,()=>{
    console.log('Server Running at localhost:3000');
})
```



### 监听GET请求

通过**get()** 方法，监听客户端发送来的GET请求

```js
app.get('请求的URL地址', (req, res)=>{
  // req: 请求对象
  // res：响应对象
})
```



### 监听POST请求

通过**post()** 方法，监听客户端发送来的POST请求

```js
app.post('请求的URL地址', (req, res)=>{
  // req: 请求对象
  // res：响应对象
})
```







### req请求对象

包含与请求相关的数据和属性

---

#### req.query

Express增加的属性，

不再需要和原本Nod.js一样还要引用url模块来处理请求URL了

可获取请求URL中**查询字符串**的形式 **GET请求参数**

即，key=value&key=value形式的GET参数

```js
const express = require('express')
const app = express()


app.get('/get',(req,res)=>{
    res.send(req.query)
})


app.listen(3000,()=>{
    console.log('Server Running at localhost:3000');
})
```

以JSON对象形式返回GET请求参数

req.query的值默认是个空对象

```js
// 客户端浏览器发送的请求参数
localhost:3000/get

// 服务端响应回的内容
{}
```

```json
// 客户端浏览器发送的请求参数
localhost:3000/get?name=tom&age=18

// 服务端响应回的内容
{
    "name": "tom",
    "age": "18"
}
```

---

#### req.params

可获取URL中通过 **:** 匹配到的**动态参数**

```
http://xxx/xxx/:自定义名
```

如下：

- 匹配一个动态参数：

```js
const express = require('express')
const app = express()

app.get('/user/:id', (req, res)=>{
  res.send(req.params)
})


app.listen(80, () => {
    console.log('server running at localhost:80');
})
```

```js
// 客户端请求的URL地址和动态参数
localhost:3000/user/2000

// 服务器响应回的内容
{
    "id": "2000"
}
```

- 匹配多个动态参数：

```js
const express = require('express')
const app = express()

app.get('/user/:id/:name', (req, res)=>{
  res.send(req.params)
})


app.listen(80, () => {
    console.log('server running at localhost:80');
})
```

```js
// 客户端请求的URL地址和动态参数
localhost:3000/user/2000/name

// 服务器响应回的内容
{
    "id": "2000",
    "name": "andy"
}
```

---

#### req.body

可获取存放在请求体中的 **POST请求参数**

若不配置解析请求体 req.body 的中间件解析的话，

req.body默认返回一个 **undefined**

详见下文 \- [Express内置中间件](#解析POST请求参数格式的内置中间件)

- **JSON格式**的POST请求参数

```js
const express = require('express')
const app = express()

// 解析JSON格式POST请求参数的中间件
app.use(express.json())

app.post('/post',(req,res)=>{
    res.send(req.body)
})


app.listen(80, () => {
    console.log('server running at localhost:80');
})
```

```json
// 解析结果
{
    "name": "andy",
    "age": 28
}
```

- **x-www-form-urlencoded**健值对格式的POST请求参数

```js
const express = require('express')
const app = express()

// 解析x-www-form-urlencoded健值对格式POST请求参数的中间件
app.use(express.urlencoded({ 
  extended: false
}))

app.post('/post',(req,res)=>{
    res.send(req.body)
})


app.listen(80, () => {
    console.log('server running at localhost:80');
})
```

```js
//解析结果
{
    "name": "andy",
    "age": 28
}
```



#### req.app.locals

课通过在 req.app.locals 对象下挂载一个全局可用的属性

```js
req.app.locals.自定义属性 = '自定义内容'
```

可用来做路由标记，让前端可以区分相关联的页面：

```js
app.get('/articles'(req, res) => {
    // 添加标识，当前是aritcles页面
    req.app.locals.nowPage = 'articles'
    
    res.render('articles.art')
})
```

比如，在art-template中根据页面路由的不同增加或去除class类名：

```html
<div class="col-sm-3 text-center text-white bg-dark pt-5 px-0">
  <nav class="nav flex-column">
    <a
      href="/admin/users"
      class="{{ nowPage == 'users' ? 'bg-primary' : '' }}"
      >Users List</a
    >
    <a
      href="/admin/articles"
      class="{{ nowPage == 'articles' ? 'bg-primary' : '' }}"
      >Articles List</a
    >
  </nav>
</div>
```







### res响应对象

包含与响应相关的数据和属性

---

#### res.status()

设置响应状态码

```js
app.get('/no',(req,res)=>{
    res.status(404)
      .send('页面不存在')
})
```



---

#### res.send()方法

通过res.send()将处理好的内容发送给客户端

res.send()响应的参数可以是： **字符串文本 **或 **JSON对象**

```js
const express = require('express')
const app = express()

// 响应GET请求
app.get('/user',(req,res)=>{
    res.send({
        name:'andy',
        age:20,
    })
})

// 响应POST请求
app.post('/user',(req,res)=>{
    res.send('POST请求发送成功')
})


app.listen(3000,()=>{
    console.log('Server Running at localhost:3000');
})
```

比底层Node.js的res.end( )更强大：

- 自动检测响应内容的数据类型和编码
- 自动设置HTTP状态码



## 托管静态资源

### express.static()

可通过express.static() 快速创建一个 **静态资源服务器**

将静态资源文件图片、CSS文件、JS文件对外开放

使用户可以通过URL访问被托管的静态资源目录下的资源

**被托管的静态资源文件目录不会出现在访问的URL地址中**

```js
app.use(express.static('静态资源文件夹的绝对路径'))
```

如下：

将项目中的 **public文件夹 作为静态资源文件夹**对外托管

将该目录下的所有图片、CSS文件、JS文件等对外开放

```js
// 项目目录
项目
|- public
		|- images
				|- 01.jpg
		|- css
				|- style.css
		|- js
				|- login.js
```

```js
// 静态资源服务器
const express = require('express')
const path = require('path')
const app = express()

app.use(express.static(path.join(__diname, 'public')))

app.listen(3000,()=>{
    console.log('Server Running at localhost:3000');
})
```

用户访问时，URL地址的层级中并不包含被托管的public目录

不然会路径错误找不到文件

```bash
# 用户可通过如下URL访问被托管的public目录下静态资源

http://localhost:3000/images/o1.jpg
http://localhost:3000/css/style.css
http://localhost:3000/js/login.js
```

---

### 托管多个静态资源目录

若要托管多个静态资源目录，

就多次调用**express.static()**

```js
app.use(express.static('public'));
app.use(express.static('files'));
app.use(express.static('static'))
```

访问静态文件时，会**根据添加的顺序查找文件**

会访问到添加托管的顺序在前面的同名资源

```js
|- files
		|- index.html
|- public
		|- index.html
|- static
		|- index.html
```

---

### 静态资源路径添加前缀

若希望在静态资源的访问路径前挂载上路径前缀（路径层级）

```js
app.use('/前缀', express.static('静态资源目录'))
```

用户是通过URL访问被托管的静态资源目录下的资源的

原本被托管的静态资源文件目录**不会出现在访问的URL地址中**

若添加了静态资源的路径的前缀，

则用户再想访问静态资源时必须在**其URL地址前加上前缀**

比如，添加的前缀是 **'/public'**：

```js
// 静态资源服务器
const express = require('express')
const app = express()

app.use('/public', express.static('public'))

app.listen(3000,()=>{
    console.log('Server Running at localhost:3000');
})
```

则加上前缀后的URL访问地址改变如下：

URL层级中多了 /public

```js
// 添加路径前缀前
http://localhost:3000/images/o1.jpg
http://localhost:3000/css/style.css
http://localhost:3000/js/login.js

// 添加路径前缀后
http://localhost:3000/public/images/o1.jpg
http://localhost:3000/public/css/style.css
http://localhost:3000/public/js/login.js
```





## Express路由

### 概念

Express中的路由是指

**客户端的请求URL** 和 **服务器的处理函数** 之间的映射关系



### 路由匹配过程

一个请求到达服务器后，

会按照服务端路由**定义的先后顺序** 将请求与路由进行匹配，

匹配成功后就不会在去匹配定义顺序在后面的路由了

只有**请求类型和请求URL同时匹配成功**了，

Express才会调用相对应的处理函数



### 基础路由

Express中路由分为3部分：

- 请求类型

- 请求的URL地址
- 处理函数

在Express中，最简单的实现路由方式，

是将路由挂载到app上：

```js
app.请求方式('请求URL地址', 处理函数)
```

如下：

```js
const express = require('express')
const app = express()

app.get('/home', (req, res)=>{
    res.send('访问了首页')
})
app.get('/about', (req, res)=>{
    res.send('访问了about页面')
})
app.post('/home', (req, res)=>{
    res.send('访问了首页')
})


app.listen(3000,()=>{
    console.log('Server Running at localhost:3000');
})
```

但是因为日后代码量会增多，

很少会直接将路由挂在到app上，而是采取模块化路由，

在单独的文件中管理路由API，入口文件只负责调用路由模块



### 模块化路由

为了方便对路由的模块化管理，

不建议直接将路由挂在到app，

而是应该 **将路由都抽离为单独的模块（单独的JS文件）**

---

#### 创建与导入步骤

**1. 单独文件中创建路由模块**

将路由都写在一个单独的JS文件中，方便管理维护

1. 调用express.Router() 创建路由对象

2. 将挂载到路由对象router上
3. 使用moudule.exports对外暴露路由

如下：

```js
// 1. 导入express
const express = require('express')
// 2.创建路由对象
const router = express.Router();

// 3. 挂载路由到路由对象上
router.get('/user/list', (req,res)=>{
    res.send('获得用户列表')
})
// 3. 挂载路由到路由对象上
router.post('/user/add', (req,res)=>{
    res.send('添加用户')
})

// 4. 对外暴露出路由对象
module.exports = router
```

**2. 入口文件中导入注册路由模块**

创建的单独的路由模块文件需要被导入服务器入口文件

1. require() 导入路由模块
2. app.use() 注册路由模块

```js
const express = require('express')
const app = express();

// 1. 导入路由模块（JS文件）
const router = require('./Router.js')
// 2. 注册路由模块
app.use(router)


app.listen(3000,()=>{
    console.log('Server Running at localhost:3000');
})
```

---

#### 多个路由模块

如下，分别创建了两个路由模块，然后分别在入口文件中导入挂载调用

```js
// 路由模块user
const express = require('express')
const user = express.Router();

user.get('/user/list', (req,res)=>{
    res.send('获得用户列表')
})
user.post('/user/add', (req,res)=>{
    res.send('添加用户')
})

module.exports = user
```

```js
// 路由模块products
const express = require('express')
const product = express.Router();

product.get('/product/list', (req,res)=>{
    res.send('获得商品列表')
})
product.post('/product/add', (req,res)=>{
    res.send('添加商品')
})

module.exports = product
```

```js
// main.js
const express = require('express')
const app = express()

// 导入路由模块user
const user = require('./routes/user.js')
// 导入路由模块products
const product = require('./routes/products.js')

// 	调用路由
app.use(user)
app.use(product)
```





### 路由模块添加前缀

类似于托管静态资源访问路径挂载前缀

```js
app.use('/public', express.static('public'))
```

若添加了路由前缀，

则用户再想访问URL地址时必须在**其URL地址前加上前缀**

如下，给路由URL地址加上 **/api** 前缀：

```js
// 服务器入口文件
const express = require('express')
const app = express();


const router = require('./Router.js')

app.use('/api', router)


app.listen(3000,()=>{
    console.log('Server Running at localhost:3000');
})
```

```js
// 路由模块
const express = require('express')
const router = express.Router();

router.get('/user/list', (req,res)=>{
    res.send('获得用户列表')
})
router.post('/user/add', (req,res)=>{
    res.send('添加用户')
})

module.exports = router
```

则加上前缀后的URL访问地址改变如下：

URL层级中多了 /api

```js
// 添加路径前缀前
http://localhost:3000/user/list
http://localhost:3000/user/add

// 添加路径前缀后
http://localhost:3000/api/user/list
http://localhost:3000/api/user/add
```



### 路由参数

出来在请求URL结尾通过查询字符串传递参数，

还可以通过路由参数传递

---

#### 传递与接收

- **服务端设置路由地址和接收参数**

在路由请求地址后通过  **: 参数** 设置路由参数

相当一个占位符

接收路由参数时通过req.parmas接收

```js
app.get('/search/:id', (req, res)=>{
  res.send('OK')
  console.log(req.parmas)
})
```

- **客户端传递参数**

不再用 ？在URL分割，而是直接接在URL后

访问请求地址时必须写上完整的地址+ 参数

```js
localhost:3000/find/123
localhost:3000/find/food
```

---

#### 多个路由参数

```js
app.get('/search/:category/:type/:id', (req, res)=>{
  res.send('OK')
  console.log(req.parmas)
})
```

```js
localhost:3000/find/123
localhost:3000/find/food
```



### 路由重定向

```js
res.redirect('完整路由地址')
```

```js
admin.post('/login', async (req, res) => {
    // get client form vale
    const { email, password } = req.body

    // server side form value validation
    if (email.trim().length == 0 || password.trim().length == 0) {
        return res.status(400).render('admin/error', {
            status: 400,
            msg: 'Email Address or Password is WRONG,  will back to login page in 2s'
        });
    }

    // according to email to check unique user info
    let user = await User.findOne({ email })
    // if there is that unique one, user is  an obj,or a {}
    if (user) {
        // bcrypt compare password
        const isEqual = await bcrypt.compare(password, user.password)
        if (isEqual) {
            // 储存登陆用户的信息到session中
            req.session.username = user.username
						// 重定向
            res.redirect('/admin/users');
            // art-template 公用变量（用户名显示在右上角）
            req.app.locals.userInfo = user;
        } else {
            // wrong password
            res.status(400).render('admin/error', {
                status: 400,
                msg: 'Email Address or Password is WRONG,  will back to login page in 2s'
            });
        }
    } else {
        // no such email
        res.status(400).render('admin/error', {
            status: 400,
            msg: 'Cannot find such user,  will back to login page in 2s'
        });
    }

})
```



### 路由拦截/登陆拦截

路由拦截，是指在访问路由地址前先进行某种判断，符合后才能访问

是个通过app.use( ) 使用的中间件，必须写在所有路由的前面

条件符合的话才能执行访问其余路由，通过next() 开放请求的向下传递

```js
app.use('路由',(req, res, next)=>{
  if(){
     // 重定向
     res.redirect('路由')
  }else {
    next()
  }
})
```

如下：登陆验证的路由拦截：

- 判断地址是否是 /admin/login 页面进行的跳转 
- 且服务器的session对象中是否存有用户信息（即用户是否登陆过）

若直接从地址栏请求访问 /admin/xxxxxx 路由地址时，且用户未login登陆过服务器，则直接重定向会login页面

```js
app.use('/admin', (req, res, next) => {
    if (req.url != '/login' && !req.session.username) {
      // 重定向到 /admin/login
        res.redirect('/admin/login')
    } else {
      // 继续执行其余路由
        next();
    }
})

Routes....
```









## Express中间件

### 基础概念

中间件（Middleware）,中间处理的环节

中间件必须有输入输出，

可以存在多个中间件连续调用，

上一级中间件的输出作为下一级中间件的输入

---

#### Express中间件调用流程

当一个客户端请求到达Express的服务器后，

1. 可以**连续调用多个中间件**，对这次请求进行**预处理**

2. 客户端发来的请求会按照中间件定义先后顺序进行调用，

   上一级中间件的输出作为下一级中间件的输入

3. **所有中间件的都调用完毕**后再将处理完毕的结果交给路由处理

<img src="https://pbs.twimg.com/media/E3ZmKD4VoAA0Tw8?format=png&name=900x900" style="zoom:50%;" />

详见下文 \- [定义多个全局中间件](##定义多个全局中间件)

---

#### Express中间件本质与一般路由函数

本质是个**function函数**

但是一般的路由处理函数只有req、res两个对象参数，

中间件函数的形参列表中还必须有一个 **next函数做参数**，

并且当前中间件处理完毕后必须调用**next()**，

![](https://pbs.twimg.com/media/E3ZnO9nUUAAW5Ft?format=jpg&name=medium)

因此，可根据函数的参数区分 **一般路由函数** 与 **中间件函数**：

```js
// 一般路由函数
app.get('/', (req, res)=>{
  xxxxxxx
})
```

```js
// 中间件函数
app.get('/', (req, res, next)=>{
  xxxxxxxx
  next();
})
```

---

#### 共享 req 和 res参数

**多个中间件函数和路由函数之间共享 req对象 和 res对象**

基于中间件的执行流程是上一个处理完后结果给下一个，

且多个中间件和路由共享req和res参数，

因此，

可在上游中间件中**为 req和res 挂载自定义属性或方法**，

**下游中间件或路由中使用** 上游中间件中挂载的自定义属性或方法

详见下文 \- [全局中间件](##全局中间件的作用)

---

#### next函数作用

中间件函数的形参列表中还必须有一个 **next函数做参数**，

next函数是**实现多个中间件连续调用**的关键

当前中间件处理完毕后必须调用**next()**，表示流转关系的转交

即，将处理结果交给下一个中间件处理 或 最终交给路由处理

<img src="https://pbs.twimg.com/media/E3ZmKD4VoAA0Tw8?format=png&name=900x900" style="zoom:50%;" />



### 中间件注意点

- **必须在定义路由函数前定义中间件**（错误级别中间件例外）

  因为请求到服务器后是从上到下匹配

- 客户端发送来的请求**可以连续调用多个中间件进行处理**

- 连续调用多个中间件时，多个中间件和路由**共享req、res对象参数**

- 中间件函数处理完后必须调用**next()** ，表示处理结束并传递处理结果

  不然请求在该中间件处就终止了，**无法继续匹配下去**





### 全局生效中间件

**客户端发起的任何请求到达服务器后都会被触发的中间件**，叫做全局生效中间件

---

#### app.use() 

可通过 app.use() 将一个中间件注册为全局生效中间件

```js
app.use(中间件名)
```

如下：

定义并注册一个全局生效中间件

```js
// 1. 定义一个中间件
const middleWare = function(req, res, next){
    console.log('基础中间件');
    // 流转关系转交下一个中间件路由
    next()
}
// 2. 注册为全局生效中间件
app.use(middleWare)
```

简写：

```js
app.use(function(req, res, next){
    console.log('基础中间件');
    // 流转关系转交下一个中间件路由
    next()
})
```

---

#### 定义多个全局中间件

可**使用app.use()连续定义**多个全局中间件

客户端发来的请求会按照中间件定义先后顺序进行调用中间件

如下：

只要有请求发来服务器，就会按照顺序打印NO1,NO2,

若是GET请求访问了根目录，就会按照顺序打印NO1,NO2,NO3

```js
const express = require('express')
const app = express()


app.use((req,res,next)=>{
    console.log('NO1, 中间件第 1 次调用');
    next()
})
app.use((req,res,next)=>{
    console.log('NO2, 中间件第 2 次调用');
    next()
})
app.get('/', (req,res)=>{
    console.log('NO3, GET请求访问路由地址');
  
    res.send('GET请求访问了首页')
})
app.post('/', (req,res)=>{
    console.log('NO3, POST请求访问路由地址');
  
    res.send('POST请求访问了首页')
})

app.listen(80,()=>{
    console.log('server running at localhost:80');
})
```

---

#### 作用1 处理重复内容

若每一个路由函数中，

都有必须执行的处理逻辑，或有着相同重复的处理逻辑，

可以该部分写入一个全局中间件

如下：

获取用户访问路由地址的时间

- 若不通过中间件，需要在每个路由函数中都重复相同代码：

```js
const express = require('express')
const app = express()

app.get('/', (req,res)=>{
    const time = new Date();
    res.send(time)
})
app.post('/', (req,res)=>{
    const time = new Date();
    res.send(time)
})

app.listen(80,()=>{
    console.log('server running at localhost:80');
})
```

- 使用了中间件：

因为**中间件的调用流程**，**中间件之间和路由共享req，res**的机制

给上游中间件的**req/res挂载自定义属性或方法**，供下游中间件火路由使用

```js
const express = require('express')
const app = express()

app.use((req,res,next)=>{
    const time = new Date()
		// 给req挂载自定义属性，使下一个中间件或路由可以使用
    req.startTime = time
    next()
})

app.get('/', (req,res)=>{
  // 使用上游中间件中挂载到req上的自定义属性
    res.send(req.startTime)
})
app.post('/', (req,res)=>{
  // 使用上游中间件中挂载到req上的自定义属性
    res.send(req.startTime)
})


app.listen(80,()=>{
    console.log('server running at localhost:80');
})
```

---

#### 作用2 登陆验证

app.use( )可在参数中设置URL请求地址，接收处理所有请求

```js
app.use('/请求地址', (req, res, next)=>{
  xxxx
  next()
})
```

可用于，必须要确认登陆后才能访问的地址请求的场合，

可通过中间件拦截所有请求，进行**登陆状态验证**

```js
app.use('/login', (req, res, next)=>{
  let isLogin = false
  if(isLogin){
    next()
  }else{
    res.send('还未登陆')
  }
})

app.get('/login', (req, res)=>{
  res.send('欢迎登陆')
})
```

---

#### 作用3 网站维护公告

比如网站维护时，不希望用户访问

可通过中间件拦截终止所有请求，不调用next( )

```js
app.use((req, res, next)=>{
  res.send('网站维护中，无法访问')
})

app.get('/...', (req, res)=>{
  xxx
})
app.get('/...', (req, res)=>{
  xxx
})
```

---

#### 作用4 定义404页面

中间件时从上到下逐一匹配，

若请求地址和所有的路由都没匹配成功，即该请求不存在

所以，404页面响应处理的中间件必须定义在所有路由之后

```js
app.get('/...', (req, res)=>{
  xxx
})
app.get('/...', (req, res)=>{
  xxx
})
...

app.use((req, res, next)=>{
  res.status(404)
  	 .send('当前访问页面不存在')
})
```







### 局部生效中间件

局部生效中间件是指，

**不用 app.use() 定义的中间件**

#### 定义局部中间件

```js
const 局部中间件 = function(req, res, next){
  xxxxx
  next()
}
```

---

#### 路由使用局部中间件

路由函数若想接收某个局部中间件的处理结果，

只需要在路由函数的**第2个参数位置**导入该局部中间件即可

局部中间件的结果仅在调用了该中间件的路由中被访问使用，

没有导入该中间件的路由函数中无法访问实用局部中间件

```js
// 接受局部中间件处理结果的路由
app.请求方式('/路由地址', 局部中间件, (req, res)=>{
  xxxxxxxx
})

// 没接受局部中间件处理结果的路由
app.请求方式('/路由地址', (req, res)=>{
  xxxxxxxx
})
```

如下：

```js
const express = require('express')
const app = express()

const mv = (req, res, next) => {
    console.log('调用了局部中间件');
    next();
}

app.get('/', mv, (req, res) => {
    console.log('GET请求访问路由地址');
    res.send('GET请求访问了首页')
})
app.post('/', (req, res) => {
    console.log('POST请求访问路由地址');
    res.send('POST请求访问了首页')
})


app.listen(80, () => {
    console.log('server running at localhost:80');
})
```

---

#### 定义多个局部中间件

按顺序function定义即可

```js
const mv1 = (req, res, next) => {
    console.log('调用了局部中间件 - 1');
    next();
}
const mv2 = (req, res, next) => {
    console.log('调用了局部中间件 - 2');
    next();
}
```

---

#### 路由使用多个局部中间件

在路由中有**两种等价的方式**使用多个局部中间件

- 方法一：

  多个局部中间件逗号隔开

```js
app.请求方式('/路由地址', 局部中间件1, 局部中间件2, (req, res)=>{
  xxxxxxxx
})
```

- 方法二：

  多个局部中间件放入数组

```js
app.请求方式('/路由地址', [局部中间件1, 局部中间件2], (req, res)=>{
  xxxxxxxx
})
```

如下：

```js
const express = require('express')
const app = express()

const mv1 = (req, res, next) => {
    console.log('调用了局部中间件 - 1');
    next();
}
const mv2 = (req, res, next) => {
    console.log('调用了局部中间件 - 2');
    next();
}

// 采用方法一的路由
app.get('/', mv1, mv2, (re1,res)=>{
    console.log('获得了GET请求');
    res.send('获得了GET请求')
})
// 采用方法二的路由
app.post('/', [mv1, mv2], (re1,res)=>{
    console.log('获得了POST请求');
    res.send('获得了POST请求')
})

```





### 中间件分类

Express将中间件分为五大类：

- **应用级别**中间件
- **路由级别**中间件
- **错误级别**中间件
- **Express内置**中间件
- **第三方**中间件

---

#### 应用级别中间件

应用级别中间件是指，

绑定到Express实例app上的中间件，通过：

- **app.use()**
- **app.get()**
- **app.post()**

**app.use() **绑定的是全局中间件

**app.get() **与**app.post()** 绑定的是局部中间件

```js
app.use((req,res,next)=>{
  xxxxx
  next()
})

app.get('路由地址', 局部中间件名, (req,res)=>{
  xxxxx
})
```

---

#### 路由级别中间件

路由级别中间件是指，

绑定到 express.Router() 路由实例上的中间件

和应用级别中间件没有区别，只是挂载的对象不同，

应用级别中间件是绑定到了app实例上

路由级别中间件是绑定到了router实例上

```js
const express = require('express')
const router = express.Router()

router.use((req,res,next)=>{
  xxxxx
  next()
})
```

---

#### 错误级别中间件

程序一旦出错就无法运行了（比如读取不到文件）

可通过错误处理中间件，

**捕获整个项目中发生的异常错误，统一处理，防止项目异常崩溃**

若没有该中间件，会导致出现错误服后务器会崩溃掉

> 一般路由函数有2个参数（调用局部中间件时会增多）
>
> 普通中间件函数有3个参数

- 错误级别中间件函数**有4个参数**

  参数顺序分别是 **err、req、res、next**

```js
app.use((err, req, res, next)=>{
  xxxxx
  res.status(500)
  	 .send('发现了错误' + err.message)
  
   console.log('发现了错误' + err.message);
})
```

- 错误级别中间件**必须注册在所有路由之后**，否则不会生效

  （其余中间件都是注册在路由之前）

如下：

通过 throw new Error() 模拟一个错误

请求发送到服务器后会产生错误会被错误级别中间件捕获，

阻止了因为错误导致服务器的崩溃

```js
// 模拟错误
app.get('/error', (req, res) => {
    throw new Error('服务器出现错误')
})

// 定义错误级别中间件
app.use((err, req, res, next) => {
    console.log('发现了错误' + err.message);
    res.send('发现了错误' + err.message)
})


app.listen(80, () => {
    console.log('server running at localhost:80');
})
```

再比如：

异步的错误不能直接被错误处理中间件获取，

需要通过给next（）传递参数，直接触发错误处理中间件

```js
app.get('/index', (req, res, next)=>{
  fs.readFile('./index.txt', 'utf8', (err, res)=>{
    if(err){
      next(err)
    }else{
      res.send(res)
    }
  })
})

app.use((err, req, res, next)=>{
  xxxxx
  res.status(500)
  	 .send('发现了错误' + err.message)
})
```

---

#### Express内置中间件

Express4.16.0版本后，内置了3个常用中间件：

都是全局生效中间件，需要通过 **app.use()** 使用

- **express.static()**

  用于快速托管项目的静态资源

- **express.json()**

  **解析JSON格式的请求体数据**

  有兼容性，仅4.16.0+版本可用

- **express.urlencoded()**

  **解析URL-endoded格式的请求体数据**

  有兼容性，仅4.16.0+版本可用

---

#### 第三方中间件

按需下载使用

- **cors**

  解决跨域问题

- **body-parser**

  **解析JSON格式的请求体数据**

  Express4.16.0版本之前使用

body-parser使用：

安装：

```bash
npm i body-parser
```

解析**x-www-form-urlencoded**健值对格式的POST请求参数

```js
const bodyparser = require('body-parser')

app.use(bodyparser.urlencoded({
    extended: false
}))

app.post('/post', (req, res) => {
    res.send(req.body)
    console.log(req.body);
})


app.listen(80, () => {
    console.log('server running at localhost:80');
})
```





### 解析请求体数据格式的中间件

对于POST请求参数，若不配置解析请求体 req.body 的中间件的话，

默认req.body 返回 **undefined**

---

#### express.json()

解析**JSON**格式的POST请求参数

```js
app.use(express.json())
```

```js
const express = require('express')
const app = express()


app.use(express.json())

app.post('/post/json',(req,res)=>{
    res.send(req.body)
})


app.listen(80, () => {
    console.log('server running at localhost:80');
})
```

---

#### express.urlencoded()

解析**x-www-form-urlencoded**健值对格式的POST请求参数

```js
app.use(express.urlencoded({ 
  extended: false
}))
```

```js
const express = require('express')
const app = express()


app.use(express.json())

app.post('/post/json',(req,res)=>{
    res.send(req.body)
})


app.listen(80, () => {
    console.log('server running at localhost:80');
})
```

---

#### body-parser

Express4.16.0版本之前使用

内置中间件express.urlencoded()就是基于body-parser封装的





### 自定义中间件

模拟一下 body-parser的功能

```js
const express = require('express')
const qs = require('querystring')

const app = express()

// 解析 x-www-form-urlencoded健值对格式的POST请求参数
app.use((req, res, next) => {
    let str = ''
    req.on('data', (chunk) => {
        str += chunk
    })

    req.on('end', () => {
        // console.log(qs.parse(str));
        req.body = qs.parse(str)
        next()
    })  
})


app.post('/data', (req, res) => { 
    res.send(req.body)
})

app.listen(80, () => {
    console.log('server running at localhost:80');
})
```

封装并导出自定义的中间件：

```js
const qs = require('querystring')

module.exports = function bodyParser(req, res, next) {
    let str = ''
    req.on('data', (chunk) => {
        str += chunk
    })

    req.on('end', () => {
        req.body = qs.parse(str)
        next()
    })

}
```

导入使用自定义中间件：

```js
const bd = require('自定义中间件文件位置')

app.use(bd)

app.post('/', (req, res)=>{
    res.send(req.body)
})
```





### 捕获错误

同步的错误可以被错误级别中间件捕获

异步可以通过给next( )传递错误内容杂技节交给错误级别中间件处理

异步还可通过Promise对象的API catch()获取

```js
app.get('/', async (req, res, next)=>{
  try {
    await User.find({_id: 'xxx0xxx'})
  }catch(ex) {
    next(ex)
  }
})
```







## 请求参数

### 传递

#### GET请求参数

- 查询字符串

```js
localhost:3000/find?name=andy&id=28
```

- 路由参数

```js
localhost:3000/find/andy/28
```

#### POST请求参数

- 请求体

---

### 接收

#### GET请求参数

- 查询字符串

```js
app.get('/index', (req, res)=>{
  res.send(req.query)
})
```

- 路由参数

```js
app.get('/index/:name/:id', (req, res)=>{
  res.send(req.parmas)
})
```

#### POST请求参数

- body-parser使用：

```bash
npm i body-parser
```

解析**x-www-form-urlencoded**健值对格式的POST请求参数

```js
const bodyparser = require('body-parser')
app.use(bodyparser.urlencoded({
    extended: false
}))

app.post('/index', (req, res) => {
    res.send(req.body)
})
```

- **express.json()**

```js
//JSON格式的POST请求参数
app.use(express.json())
```

```js
const express = require('express')
const app = express()

app.use(express.json())

app.post('/post',(req,res)=>{
    res.send(req.body)
})
```

- **express.urlencoded()**

```js
// **x-www-form-urlencoded**健值对格式的POST请求参数
app.use(express.urlencoded({ 
  extended: false
}))
```

```js
const express = require('express')
const app = express()

app.use(express.urlencoded({ 
  extended: false
}))

app.post('/post',(req,res)=>{
    res.send(req.body)
})
```







## Express写接口

1. 创建路由模块

2. 导入路由模块

3. 在导入路由模块前，配置解析表单数据的中间件

   app.use(express.json())

   或 app.use(express.urlencoded({extended:false}))

- **路由模块**

```js
const express = require('express')
const router = express.Router()

// GET
router.get('/get', (req, res) => {
    const query = req.query;
    res.send({
        // 0: succeed  1:failed
        status: 0,
        msg: 'GET Request Succeed!!!',
        data: query
    })
})

// POST
router.post('/post', (req,res)=>{
    const body = req.body
    res.send({
        // 0: succeed  1:failed
        status: 0,
        msg: 'POST Request Succeed!!!',
        data: body
    })
})

module.exports = router
```

- **入口文件**

```js
const express = require('express')
const app = express()

// urlencoded
app.use(express.urlencoded({
    extended: false
}))


// router
const router = require('./router')
app.use('/api', router)



const port = 3000
app.listen(port, () => {
    console.log('Server running at loaclhost:3000');
})
```

上文的API接口存在一个问题，不支持跨域请求





## 通过Express写接口

### CORS（跨域资源共享）

详见笔记 [同源｜跨域｜JSONP｜CORS ](https://github.com/BlaxBerry/StudyNotes/blob/master/%E7%BD%91%E7%BB%9C%E9%80%9A%E4%BF%A1/%E5%90%8C%E6%BA%90%EF%BD%9C%E8%B7%A8%E5%9F%9F%EF%BD%9CJSONP.md)

---

#### 第三方中间件cors

可以通过一个是Express的第三方中间件，**cors** 来用于解决跨域问题

1. npm安装

```bash
npm i cors
```

2. **必须在所有路由之前使用cros中间件**

```js
const cors = require('cors')
app.use(cors())
```

---

#### 通过cors中间件配置CORS

- 入口文件

```js
const express = require('express')
const app = express()

// urlencoded
app.use(express.urlencoded({
    extended: false
}))


// CORS 
const cors = require('cors')
app.use(cors())

// router
const router = require('./router')
app.use('/api', router)



const port = 3000
app.listen(port, () => {
    console.log('Server running at loaclhost:3000');
})
```

- 路由模块

```js
const express = require('express')
const router = express.Router()

// GET 接口
router.get('/get', (req, res) => {
    const query = req.query;
    res.send({
        // 0: succeed  1:failed
        status: 0,
        msg: 'GET Request Succeed!!!',
        data: query
    })
})

// POST 接口
router.post('/post', (req,res)=>{
    const body = req.body
    res.send({
        // 0: succeed  1:failed
        status: 0,
        msg: 'POST Request Succeed!!!',
        data: body
    })
})

module.exports = router
```

- Ajax请求

```js
window.addEventListener('load', function () {
    $(function () {


        $('#get').on('click', function () {
            const data = {
                name: 'Andy',
                age: 28
            }
            
            sendAjax('GET', 'http://127.0.0.1:3000/api/get',data)
            
        })

        $('#post').on('click', function () {
            const data = {
                name: 'Tom',
                age: 20
            }
            sendAjax('POST', 'http://127.0.0.1:3000/api/post',data)
           
        })

      
        function sendAjax(method, url, data) {
            $.ajax({
                type: method,
                url: url,
                data: data,
                success: function (res) {
                    console.log(res);
                }
            })
        }


    })
})
```



### JSONP接口

详见笔记 [同源｜跨域｜JSONP｜CORS ](https://github.com/BlaxBerry/StudyNotes/blob/master/%E7%BD%91%E7%BB%9C%E9%80%9A%E4%BF%A1/%E5%90%8C%E6%BA%90%EF%BD%9C%E8%B7%A8%E5%9F%9F%EF%BD%9CJSONP.md)

---

若已经配置了CORS跨域资源共享，

为了防止冲突导致JSONP接口被处理为开启了CORS的接口

**必须将JSONP接口配置在 声明CORS中间件之前**

```js
// JSONP 接口
app.get('api/jsonp', (req,res)=>{
  xxxx
})

// 开启CORS
app.use(cors())

// 开启了CORS的接口
app.get('api/get', (req,res)=>{
  xxxxxx
})
```

#### 实现

- 服务端：

```js
const express = require('express')
const app = express()

// JSONP请求的处理
app.get('/api/jsonp', (req, res) => {
    const fun = req.query.callback
    const data = {
        name: 'JSONP',
        desc: 'by callback function'
    }
    // callback函数调用data
    const str = `${fun}(${JSON.stringify(data)})`

    res.send(str)
})


app.listen(3000, () => {
    console.log('Server running at loaclhost:3000');
})
```

- 客户端发送JSONP跨域请求

```js
// JSONP跨域请求
$('#jsonp').on('click', function () {
  
  $.ajax({
    type:'GET',
    url: 'http://127.0.0.1:3000/api/jsonp',
    dataType: 'jsonp',
    success: function (res) {
      console.log(res)
    }
  })
  
})
```





## 模版引擎 express-art-template

### 基础设置

以art-template为例子

还需要下载转为express封装的 express-art-templat

```bash
npm i art-template express-art-template
```

```js
const express = require('express')
const path = require('path')
const app = express()


// 1.设置存放模版的目录
app.set('views', path.join(__dirname, 'views'))

// 2.设置模版的默认后缀
app.set('view engine', 'art')

// 3.设置使用哪个模版引擎去渲染后缀为art模版
app.engine('art', require('express-art-template'))


// 4. 处理请求
app.get('/home', (req, res)=>{
  // 渲染模版
  res.render('home', {
    msg: '要渲染的数据'
  })
})


app.listen(3000, () => {
    console.log('Running at localhost:3000');
})
```

```js
xxx
|- public
|- routes
|- views
		|- home.art
|- index.js
```

```html
<!--home.art-->
<h1>
  {{msg}}
</h1>
```



### app.locals对象

不同模版中的若在相同数据的场合

若在渲染模版时，在所有模版中都去查询相同的部分，会造成代码重复冗余

可以通过将相同数据写在app.locals对象下的自定义属性只，

只调用一次数据，就可以在所以模版中使用

```js
const express = require('express')
const path = require('path')
const app = express()

// 模版引擎配置
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'art')
app.engine('art', require('express-art-template'))

// 相同数据
app.locals.users = [
  {
  	name:'andy',
  	age:28
	},
  {
  	name:'tom',
  	age:28
	}  
]

// 处理请求
app.get('/home', (req, res)=>{
  // 渲染模版
  res.render('home')
})


app.listen(3000, () => {
    console.log('Running at localhost:3000');
})
```

```html
<!--home.art-->
<ul>
  {{each users}}
  	<li>
  			{{$valu.name}}
        {{$valu.age}}
  	</li>
  {{/each}}
</ul>
```



### 模版中的外链资源路径

```html
<link rel="stylesheet" href="./common.css" />
```

模版中的外链资源路径是相对路径，

是相对于浏览器请求URL地址的

需要改为绝对路径，避免出错

模版中通过  **/** 表示绝对路径

```html
<link rel="stylesheet" href="/静态资源目录下路径" />

<link rel="stylesheet" href="./admin/common.css" />
```







## 密码加密 bcrypt

将明文密码HASH加密，并插入随机字符串增加破译难度

- windows环境安装

```bash
# 1. 安装python

# 2. node-gyp
npm i -g node-gyp

# 3. if Windows System
npm i -g windows-build-tools
```

### 导入、加密

```js
// 导入
const bcrypt = require('bcrypt')

// 生成随机字符串（Salt盐）
let salt = await bcrypt.genSalt(10)

// 使用随机字符串加密密码
let pass = await bcrypt.hash('明文密码', salt)
```

### 密码比对

```js
let isEqual = await bcrypt.compare('明文密码'，'加密后密码')

if(isEqual){
  '比对成功密码一致'
}else {
  '比对失败密码不一致'
}
```







## 身份认证

相见笔记 [身份认证](https://github.com/BlaxBerry/StudyNotes/blob/master/%E7%BD%91%E7%BB%9C%E9%80%9A%E4%BF%A1/%E8%BA%AB%E4%BB%BD%E8%AE%A4%E8%AF%81.md)

- **服务器端渲染**的开发模式

  推荐 **Session认证机制**

- **前后端分离**的开发模式

  推荐 **JWT认证机制**

  

### Session认证

通过express-session中间件在项目中使用Session认证

#### 1. 安装

```bash
npm i express-session
```



#### 2. 导入+ 配置中间件

 通过secret设置密钥，虽然客户端能查看Cookie但是没有密钥看到的是一堆加密字符串

```js
// 导入
const session = require('express-session')

// 使用中间件
app.use(session({
  // 设置密钥，任意字符串
  secret:'secret key'
  resave: false,
  saveUninitialized: true
}))
```



#### 3. 向Session对象中存数据

在express-session中间件配置成功后，

可通过 **req.session** 访问使用session对象，

并通过 **req.session.自定义属性** 来储存 **用户信息和登陆状态**

```js
app.post('/post', (req, res)=>{
  // 储存用户信息
  req.session.userInfo = req.body
  // 储存用户登陆状态
  req.session.islogin = true
  
  res.send({
    status: 200,
    msg: '登陆成功',
    data: {
      username: req.session.userInfo.username,
      email: req.session.userInfo.email
    }
  })
})
```

再比如：链接了MongoDB的场合

```js
router.post('/login', async (req, res) => {
    // 获取请求参数
    const { email, password } = req.body;
  	// 判断登陆邮箱是否存在于数据库中
    let user = await User.findOne({ email })
    if (user) {
        // bcrypt匹配加密后的密码
        const isEqual = await bcrypt.compare(password, user.password)
        if (isEqual) {
          
            // 储存登陆用户的信息到session中
            req.session.username = user.username
          
            res.send('登陆成功')
        } else {
            res.status(400).render('admin/error', {msg: '密码错误'});
        }
    } else {
        res.status(400).render('admin/error', {msg: '该邮箱不存在'});
    }
})
```



#### 4. 检查Cookie

后面返回给浏览器的Cookie为加密字符串

<img src="https://pbs.twimg.com/media/E57DJOcVoAAnTJL?format=jpg&name=medium" style="zoom:50%;" />



#### 5. 清空Session

比如用户退出登陆时，需要清空Session

通过**req.sessino.destroy()**实现清空服务器保存的sessin信息

清空的只是请求退出的当前用户的Session，不会清除其他人的

如下：

清除关于该用户的session和cookie，并且重定向回 login页面

```js
app.post('/logout', (req, res) => {
    // clear session
    req.session.destroy(() => {
        // clear cookie (express-session默认名)
        res.clearCookie('connect.sid');
        // 重定向
        res.redirect('/admin/login')
    })
}
```









### JWT认证

安装

```bash
npm i jsonwebtoken express-jwt
```

- jsonwebtoken：用于生成JWT字符串

- express-jwt：用于将JWT字符串解析还原为JSON对象







