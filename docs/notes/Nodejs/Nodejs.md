# Node.js

<img src="https://www.fusionia.jp/wp-content/uploads/2018/06/node-js-736399_960_720.png" style="zoom:50%;" />

Node.js是个基于Chrome V8 引擎的JavaSCript运行环境





## Node.js简介

作为是一个JS的运行环境，是一个底层的东西

虽然Node.js仅提供了基础功能+内置API，

但基于Node.js的各种工具、框架很重要，比如：

- **Express框架**：快速构建Web应用
- **Electron框架**：构建跨平台桌面应用
- **restift框架**：快速构建API接口项目
- **读写操作数据库**
- 创建各种命令行工具

---

**建议流程：**

1. JS基础语法

2. 内置API模块

3. 第三方模块（express，mysql）





## 环境安装

可通过官方网站指定版本下载

也可通过npm安装NVM版本管理器下载

---

### 版本区分

**LTS版本**：长期稳定版，适合企业级项目

**Current版本**：新特性测试尝鲜版，可能存在隐藏Bug漏洞

---

### 版本号查看

```bash
node -v
```







## JavaScript运行环境

JS可以运行在浏览器（前端开发），

还可以运行在基于JS解析引擎的Node.js上（后端开发）

---

---

### 1. 浏览器运行环境

浏览器是JS的**前端运行环境**

浏览器都内置JS解析引擎，其中Chrome浏览器的V8引擎效率最高

- JS解析引擎

- 运行环境提供的内置API

  （DOM、BOM、Canvas、XMLHttpRequest、JS内置对象...）

---

---

### 2. Node.js运行环境

Node.js是JS的**后端运行环境**

**Node.js中无法调用浏览器提供的DOM，BOM，Ajax等API函数**

- V8引擎 

- 运行环境提供的内置API

  （fs、path、http、querystring、JS内置对象...）

---

在JavaScript文件目录下打开终端

```bash
cd JS文件存放目录
node JS文件名
```

如下：

```js
// JS 文件
console.log('Hello Node.js');
var a = 10;
var b = 20
var c = a + b;
console.log(c);
```

```bash
# 终端
node test.js

Hello Node.js
30
```







## 全局对象global

Node.js这个JS运行环境中没有DOM和BOM，

在浏览器JS运行环境中的全局对象是window

在Node.js运行环境中的全局对象是global

Node.js中的global中的方法可以省略global

- **console.log()**
- **setTimeout()**
- **clearTimout()**
- **setInterval()**
- **claerInterval()**

```js
global.console.log('i am Global.console.log()')

global.setTimeout(function() {
    console.log('timer');
},2000)
```







## fs  内置文件系统模块

fs模块是Node.js提供的内置模块

可用于**文件操作**

- **fs.readFile()**

  读取指定文件内容

- **fs.writeFile()**

  向指定文件写入内容

---

在JS文件中向使用fs模块，要先通过require导入模块

```js
const fs = require('fs')
```



### fs.readFile()

```js
fs.readFile('文件路径', ['编码格式'], 回调函数)
```

- 文件路径（必须）

  字符串形式

- 编码格式（可选）

  表示以什么编码格式读取文件，

  常用 **utf8**

- 回调函数（必须）

  文件读取完后，通过回调函数的参数拿到读取结果

  **err**：读取失败的错误对象，错误原因存放在**err.massage**

  **data**：读取成功的文件内容

  错误优先，err在data前面

---

#### 返回结果

```js
// JS文件
const fs = require('fs')

fs.readFile('./01.txt', 'utf8', function(err,data){
    console.log(err);

    console.log('--------');

    console.log(data);
})
```

```js
// txt 文件
Hello
1.apple
2.banana
```

- 读取成功时：

err存的是**null**，

data存的是目标文件的内容

```bash
# 终端显示
null

--------

Hello
1.apple
2.banana
```

- 读取失败时：

err中的存是错误对象，错误原因存放在**err.massage**

data中存的是**undefined**

```bash
[Error: ENOENT: no such file or directory, open './011111111.txt'] {
  errno: -2,
  code: 'ENOENT',
  syscall: 'open',
  path: './011111111.txt'
}

--------

undefined
```

---

#### 判断文件读取成功或失败

因为，

文件读取成功时，回调函数的参数err存的是**null**，

文件读取失败时，回调函数的参数errerr中的存是错误对象

所以可以通过判断err是否为**true**（不是null，是个包含错误信息的对象），

来判断文件读取的成功或失败

```js
const fs = require('fs')

fs.readFile('./0111111.txt', 'utf8', function (err, data) {
    if (err) {
        console.log('文件读取失败');
        console.log(err.message);
    } else {
        console.log('文件读取成功');
        console.log(data);
    }
})
```

```bash
# 读取失败时
文件读取失败
ENOENT: no such file or directory, open './0111111.txt'
```

---

#### 读取HTML页面文件

结合后面的path模块，可读取HTML页面文件中的所有结构内容

```js
const fs = require('fs')
const path = require('path')

fs.readFile(path.join(__dirname, './index.html'), 'utf8', function (err, data) {
    if (err) {
        console.log(err.message);
    } else {
        console.log(data);
    }
})
```



### fs.writeFile()

**只能用来创建文件不能创建目录**，不然会报错路径错误

重复调用fs.writeFile()时，**新内容会覆盖旧内容**

```js
fs.writeFile('文件路径', 写入内容, ['编码格式'], 回调函数)
```

- 文件路径（必须）

  字符串形式

- 写入内容（必须）

- 编码格式（可选）

  表示以什么编码格式写入内容，

  常用 **utf8**

- 回调函数（必须）

  内容写入完后执行

  **err**：写入失败的错误对象，错误原因存放在**err.massage**

---

#### 返回结果

```js
const fs = require('fs')

const content = 'Hello'
fs.writeFile('./02/txt',content,'utf8',function(err){
    console.log(err);
})
```

- 文件写入成功时：

err是**null**

```js
null
```

- 文件写入失败时：

err是错误对象，错误原因存放在**err.massage**

```js
[Error: ENOENT: no such file or directory, open './02/txt'] {
  errno: -2,
  code: 'ENOENT',
  syscall: 'open',
  path: './02/txt'
}
```

---

#### 判断文件写入成功或失败

因为，

文件写入成功时，err是**null**，

文件写入失败时，err是个错误对象

所以可以通过判断err是否为**true**（不是null，是个包含错误信息的对象），

来判断文件读取的成功或失败

```js
const fs = require('fs')

const content = 'Hello'
fs.writeFile('./02/txt',content,'utf8',function(err){
    if(err){
        console.log('文件写入失败');
        console.log(err.message);
      	return
    }else{
        console.log('文件写入成功');
    }
})
```

```bash
# 读取失败时
文件写入失败
ENOENT: no such file or directory, open './02/txt'
```



### 练习实例

获取文件内容进行整理，然后存入新的文件

```js
// 整理前的内容
andy=99 Tom=80 Jerry=95 Jame=40

// 需要整理成如下，然后存入新文件：
andy : 99 
Tom : 80 
Jerry : 95 
Jame : 40
```

1. 先fs.readFile()读取
2. 然后处理，字符串——>数组，替换字符后——>字符串
3. 最后fs.writrFile()写入新文件

```js
const fs = require('fs')

fs.readFile('./01.txt', 'utf8', function (err, data) {
    if (err) {
        console.log('读取失败', err.message);
      	return
    } else {
        console.log('读取成功', data);
        // 1. 转为数组
        const oldData = data.split(' ');
        // 2. 替换 = 为 ：， 并存入新数组
        const newData = oldData.map(item => {
            return item.replace('=', ':')
        })
        // 3. 新数组转为字符串，并换行
        const resData = newData.join('\r\n');
        // 4. 调用函数写入文件
        fun(resData)
    }
})

function fun(content) {
    fs.writeFile('./学生成绩.txt', content, function (err) {
        if (err) {
            console.log('写入失败', err.message)
         	  return
        } else {
            console.log('写入成功');
        }
    })
}
```



### 相对路径导致动态拼接问题

**因为Node.js中的相对路径，相对的不是工作目录，**( require( )例外 )

**相对的是指向命令行工具时所在的目录**

于是，

若 fs模块的方法中路径写的是**相对路径**的 **./** 或 **../** 

则最终被拼接成的路径是

执行Node.js命令的当前所在目录路径 + 被操作文件的路径

最终，出现路径动态拼接错误问题，导致找不到文件

所以，

为了避免路径错误，使用fs模块操作文件时一般要使用**绝对路径**

即从目标文件的盘符开始写



### __dirname

因为绝对路径是从目标文件的盘符开始写，太麻烦

且不同系统window 和 linux中的的层级 \ /不同，

所以不应该自己手写文件存放路径，而是采用

Node.js 的 **__dirname** (双下划线) 获取文件所在目录然后拼接文件名

**以后路径path属性都要用__dirname拼接绝对路径**

```js
console.log(__dirname)

__dirname + '/文件名'
```

如下：

```js
const fs = require('fs')

fs.readFile(__dirname + '/01.txt', 'utf8', function (err, data) {
    if (err) {
        console.log('文件读取失败');
        console.log(err.message);
    } else {
        console.log('文件读取成功');
        console.log(data);
    }
})
```

```js
const fs = require('fs')

const content = 'Hello'
fs.writeFile(__dirname + '/02.txt', content, 'utf8', function (err) {
    if (err) {
        console.log('文件写入失败');
        console.log(err.message);
    } else {
        console.log('文件写入成功');
    }
})
```







## path 内置路径模块

path模块是Node.js提供的内置模块

可用于**路径操作**

- **path.join()**

  将多个路径片段 拼接为一个字符串路径，

  代替不正规的 +号拼接字符串的方法

- **path.basename()**

  获取路径字符串中的文件名

- **path.extname()**

  获取路径字符串中文件的扩展名

---

在JS文件中向使用path模块，要先通过require导入模块

```js
const path = require('path')
```



### path.join()

用于拼接字符串的路径

**Node.js的所有的路径拼接全部都要用path.join()**，

而不是用 +拼接字符串

路径片段用逗号分隔，返回值是拼接后的路径字符串

```js
const path = require('path')

console.log(path.join('/路径1','/路径2','/路径3'));
/*
	/路径1/路径2/路径3
*/
```

---

#### ../ 抵消路径

**../**  抵消掉前面的一层路径片段

```js
const path = require('path')

console.log(path.join('/路径1','/路径2','../','/路径3'));
/*
	/路径1/路径3
*/


console.log(path.join('/路径1','/路径2','../../','/路径3'));
/*
	/路径3
*/


console.log(path.join('/路径1','/路径2/路径3','../../','/路径4'));
/*
	/路径1/路径3
*/
```

---

#### 拼接文件绝对路径

结合 **__dirname** 拼接文件绝对路径

且，path.join() 在拼接相对路径时会自动去掉相对路径前面的  **.**

```js
const path = require('path')

console.log(path.join(__dirname, '/文件.txt'));
console.log(path.join(__dirname, './文件.txt'));

/* 
/Users/chen/StudyPractice/JS/path/文件.txt
/Users/chen/StudyPractice/JS/path/文件.txt
*/
```

如下：

```js
const fs = require('fs')
const path = require('path')

fs.readFile(path.join(__dirname,'文件.txt'), 'utf8', function (err, data) {
    if (err) {
        console.log('文件读取失败');
        console.log(err.message);
    } else {
        console.log('文件读取成功');
        console.log(data);
    }
})
```



### path.basename()

可以获取一字符串段路径中的最后一部分

常用来获取绝对路径中的**文件名**

```js
path.basename('路径', ['.文件后缀'])
```

- 文件后缀

  没有该参数时（默认），返回值是文件名+后缀名

  有该参数时，返回值会仅文件名不包含后缀名

```js
const path = require('path')

const fullPath = '/Users/chen/StudyPractice/JS/path/文件.html';

console.log(path.basename(fullPath, '.html'))
// 文件.html

console.log(path.basename(fullPath, '.html'))
// 文件名
```



### path.extname()

可以获取一字符串段路径中的扩展名部分

常用来获取绝对路径中的文件的**后缀名**

```js
const path = require('path');

const fullPath = '/Users/chen/StudyPractice/JS/path/文件.html';

console.log(path.extname(fullPath));
// .html
```

结合**path.basename()**

```js
const fullPath = '/Users/chen/StudyPractice/JS/path/文件.html';

const ext = path.extname(fullPath)

console.log(path.basename(fullPath, ext));
// 文件
```





### 练习实例

拆分一个完整 HTML文件，

拆分为HTML文件、CSS文件、JS文件，并存放到指定目录下

并通过外链方式将拆分出的CSS文件、JS文件引入拆分出的HTML文件

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        * {
            padding: 0;
            margin: 0;
            box-sizing: border-box;
        }
        #title {
            font-size: 20px;
            color: red;
        }
    </style>
</head>
<body>
    <div id="title"></div>

    <script>
        const h = document.getElementById('title');
        h.innerHTML = 'Hello';
    </script>
</body>
</html>
```

1. 通过**正则表达式**

   匹配获得完整HTML页面文件中的 **<style\>标签** 和 **<script\>标签**

2. 通过fs模块读取完整的页面文件
3. html页面文件内容中替换去掉正则匹配的内容 <style\>标签 和 <script\>标签
4. 通过fs模块将正则匹配的内容替换掉首尾标签后分别写入HTML文件、CSS文件

[拆分完整HTML页面为.html , .css , .js文件](https://github.com/BlaxBerry/Demo_Node.js/tree/master/splitPage)







## http 内置模块

http模块是Node.js提供的内置模块

用来创建web服务器

Node.js中不需要通过IIS，Apache等web服务器软件，

通过内置http模块的代码手写一个服务器软件，提供web服务

- **http.createServer()**

  可将一个普通电脑变为可以向外提供Web资源的Web服务器

---

在JS文件中向使用http模块，要先通过require导入模块

```js
const http = require('http')
```



### 创建web服务器

1. 导入http模块

2. 创建web服务器实例

3. 给服务器实例绑定request事件监听客户端请求

4. 监听端口启动服务器

   终端中用node打开该JS文件

```js
const http = require('http')

const server = http.createServer()

server.on('request', (req, res) => {
    console.log('有客户端来访问服务器了');
})

server.listen(3000, () => {
    console.log('服务器运行在http://127.0.0.7:3000');
})
```



### server.on()

**server.on()** 中给服务器绑定的**request事件处理函数**

只要服务器收到了客户端请求，

就可以通过request事件获得客户端相关的数据

---

#### req请求对象

包含客户端相关的数据和属性

- **req.url** 

  是客户端浏览器发送GET请求的**url地址** 

  GET请求的参数可通过url内置模块辅助获取

- **req.method**

  客户端请求的方式

```js
server.on('request', (req)=>{
  console.log('有客户端来访问服务器了');
  
  console.log(req.url);
  console.log(req.method);
})
```

- req.on

  监听POST请求的参数的传递

  当有数据传递时便会触发req.on事件

  当数据传递完成时便会触发req.end事件

  POST请求的参数会很大，放在了请求体中传输，不是一次性传递完成的，

  是分批次的，需要通过变量拼接获取完整POST请求参数

  最后可通过querystring内置模块将拼接的字符串转为对象形式获取POST参数


```js
const querystring = require('querystring')

app.on('request', (req, res)=>{
  
  let postParams = ''

	req.on('data', (params)=>{
  	postParams += params
	})

	req.on('end', ()=>{
  	console.log('传输完成')
  	console.log(querystring.parse(postParams))
	})
  
})
```

---

#### res响应对象

包含服务端相关的数据和属性

- **res.end**

  向客户端响应指定内容，并结束该次请求的处理

```js
server.on('request', (req, res)=>{
  console.log('有客户端来访问服务器了');
  
  res.end('<h1>Hello</h1>')
})
```

- **res.setHeader**

  设置响应头

```js
// 可用于的设置编码格式来解决res.end() 乱码
res.setHeader('Content-Type','text/html; charset=utf-8')
```

```js
server.on('request', (req, res)=>{
  console.log('有客户端来访问服务器了');
  
  res.setHeader('Content-Type','text/html; charset=utf-8')
  
  res.end('<h1>你好</h1>')
})
```

- res.writeHead

  设置响应状态、响应数据类型、编码类型

```js
res.write(500)
```

```js
res.write(200, {
  'Content-type':'text/plain;charset=utf8'
})
```





### 简单路由

根据判断客户端请求URL地址路径的不同，响应不同的页面内容

如下：

```js
const http = require('http')

const server = http.createServer()

server.on('request', (req, res) => {

    console.log('有客户端来访问服务器了');


    // 获取 客户端发送的URL请求地址
    const url = req.url
    // 设置默认响应内容 404
    let responseContnet = '<h1>404 Not Found</h1>'

    // 判断 客户端发送的URL请求地址
    if (url === '/' || url === '/index.html') {
        responseContnet = '<h1>index 首页</h1>'
    } else if (url === '/about.html') {
        responseContnet = '<h1>About 页面</h1>'
    }

    // 设置 响应头的编码格式
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    // 响应页面内容
    res.end(responseContnet)
})

server.listen(3000, () => {
    console.log('服务器运行在http://127.0.0.7:3000');
})
```



### 静态资源访问

- 静态资源

  服务器不需要处理，直接响应给客户端的资源就是静态资源

  比如 .html文件、.css文件、.js文件、images图片...

- 动态资源

  相同的请求地址但是请求参数不同 

  服务器响应给 这种请的资源就是动态资源

```js
http://www.abc.com/list?id=001

http://www.abc.com/list?id=002
```

---

如下：

服务器静态资源存放于public目录

```js
xxxx
|- public
		|- images
				|- 01.jpg
		|- css
				|- index.css
		|- js
				|- index.js
		|- index.html
|- app.js
```

1. 通过url内置模块，获取不带请求参数的请求url路径

2. 通过path内置模块，拼接文件所在目录的绝对路径 + 请求路径

3. 通过fs内置模块，读取的内容响应给客户端

4. 通过mime第三方模块，动态设定响应报文的数据类型

```js
const http = require('http')
const url = require('url')
const path = require('path')
const fs = require('fs')
const mime = require('mime')

const app = http.createServer()

app.on('request', (req, res)=>{
  // 1. 
  // let pathname = url.parse(req.url).pathname
  let pathname = '/' ? '/index.html' :  url.parse(req.url).pathname
  // 2. 
 	let realPath = path.join( __dirname, 'public' + pathname)
  // 3.
  fs.readFile(realPath, 'utf8', (err,data)=>{
    if(err != null){ 
      res.writeHead(404, {
        'Content-type':'text/html;charset=utf8'
      })
      console.log('404 Not Found')
      return  
    }
    // 4. 
    let type = mime(realPath)
    res.writeHead(404, {
        'Content-type': type
      })
   	res.end(data)
  })
})

app.listen(3000, ()=>{
  console.log('server running at http://localhost:3000')
})
```





## url 内置模块

处理请求URL地址

```js
const url = require('url')
```

- url.parse

  将URL请求地址转为对象形式

```js
url.parse(req.url, true).query
```

```js
let getParams = url.parse(req.url, true).query

console.log(getParams.name)
console.log(getParams.age)
```







## querystring 内置模块

Node.js的内置模块，

专门用来处理查询字符串

通过**parse()** 将字符串转为对象格式

```js
// 在Express.js中
const qs = require('querystring')

app.get('/', (req, res) => {
    res.send(qs.parse('name=andy&age=100'))
})
```

```json
{
    "name": "andy",
    "age": "100"
}
```

---

```js
const querystring = require('querystring')

app.on('request', (req, res)=>{
  
  let postParams = ''

	req.on('data', (chunk)=>{
  	postParams += params
	})

	req.end('data', ()=>{
  	console.log('传输完成')
  	console.log(querystring.parse(postParams))
	})
  
})
```





## 模块化

### 模块化概念

将一个大文件拆分为多个独立且相互有依赖的小文件（模块）

每一个JavaScript就是一个模块

- 提高了代码的维护性、复用性
- 可实现模块的按需加载



### Node.js中模块的分类

- 内置模块（内置的fs、path、http等）

- 自定义模块（用户自己写的每个JS文件）
- 第三方模块（也叫**包**，需要下载引入）



### 模块的加载机制

#### 1. 完整路径 + 文件后缀

直接引入模块

```js
require('./targetModule.js')
```

---

#### 2. 有路径，但无后缀

```js
require('./targetModule')
```

1. 先指定的目录下查找，是否有同名文件的JS文件

   若找到了，则执行导入模块

2. 若找不到，则找到并打开同名文件夹，

   从中查找index.js文件

   若找到了，则执行

3. 若没有index.js，

   则在同名文件夹下package.json中mian指定的主入口文件

   若找到，则执行

4. 若package.json中mian没指定主入口文件，或没找到，

   则报错

```bash
Cannot find module 'xxxxx'
```

---

#### 3. 无路径，无后缀

```js
require('targetModule')
```

1. Node.js会假设是系统内置模块

2. 若不存在该内置模块，

   则去 node_modules目录中查找同名文件

   若找到了同名文件，则执行

3. 若没找到同名文件，

   会在node_modules目录中查找同名文件

   若找了同名文件夹，则查找其中的index.js

   若有index.js，则执行

4. 若无index.js，

   则查找该同名文件夹的package.json的main的入口文件

   若找到则执行

5. 若package.json中mian没指定主入口文件，或没找到，

   则报错

```bash
Cannot find module 'xxxxx'
```

---

#### 优先内置模块

Node.js的**内置模块的加载优先级最高**

假若同时加载重名的模块，最终导入的是内置模块

---

#### 优先缓存加载

模块都是优先缓存中加载

模块在第一次被 require()加载后会被缓存，

即使多次调用require() 导入相同模块也不会导致模块内代码重复被多次执行，

```js
const xxx = require('xxx')
const xxx = require('xxx')
const xxx = require('xxx')
```







## CommonJS规范

Node.js 遵循CommonJS的模块化规范解决模块与模块之间的依赖关系：

- 每个模块内部的module变量代表当前模块

- module变量是个对象，

  其**exports属性（module.exports）是对导出模块内容**

- **require() 用于加载模块**，

  加载的是该模块的导出的module.exports属性的内容



### CommonJS - 加载模块

通过 **require() **加载执行其他模块

内置模块和第三方模块直接写名字，

自定义模块要写文件路径

```js
// 内置模块
const fs = require('fs') 

// 自定义模块
const calculate = require('./calcaulat.js')

// 第三方模块
const xxx = require('xxx')
```

---

**require() ** 是被导入模块的**module对象中的exports属性**的内容，

因为module.exports默认是个空对象 **{ }** ，

所以require()默认导入一个空对象 **{ }** 

```js
// 导出成员的模块
let a = 10 + 20

let b = 0
setTimeout(() => {
    b = 10 + 10
}, 1000)

let c = function () {
    console.log("hello");
}

module.exports.a = a
module.exports.b = b
module.exports.c = c
```

```js
// 导入自定义模块的JS文件
const m1 = require('./01')
console.log(m1);
// { a: 30, b: 0, c: [Function: c] }
m1.c()
// Hello
```



### 模块作用域

在自定义模块中定义的变量、方法

只能在当前模块内被访问、使用

即使模块被导入也无法直接访问使用其中的变量方法

模块作用域的限制有利于防止全局变量污染



### CommonJS - 暴露模块成员

因为有模块作用域的限制，

模块只被导入使用其中的变量、方法无法被访问使用，还需要在模块中将其对外暴露（共享）

---

#### module对象

每个 JS文件中都有一个**module对象**，存储了和当前模块相关的信息

其中的 **exports 属性** 可以向外暴露共享模块内成员，默认是个空对象 **{ }**

```js
console.log(module);


Module {
  id: '.',
  path: '/Users/chen/StudyPractice/JS/req',
  exports: {},
  parent: null,
  filename: '/Users/chen/StudyPractice/JS/req/02.js',
  loaded: false,
  children: [],
  paths: [
    '/Users/chen/StudyPractice/JS/req/node_modules',
    '/Users/chen/StudyPractice/JS/node_modules',
    '/Users/chen/StudyPractice/node_modules',
    '/Users/chen/node_modules',
    '/Users/node_modules',
    '/node_modules'
  ]
```

---

#### module.exports对象

在自定义模块中，

可以将模块内的变量、方法挂载到**module.exports对象** ，

将模块内部的私有成员向外暴露分享出去供其他模块使用

module.exports默认是个空对象 **{ }**

```js
console.log(module.exports);
// {}
```

```js
let a = 10 + 20

let b = 0
setTimeout(() => {
    b = 10 + 10
}, 1000)

let c = function () {
    console.log("hello");
}


module.exports.a = a
module.exports.b = b
module.exports.c = c
```

---

#### exports对象

但因为module.exports写起了麻烦，Node提供了exports对象

```js
let a = 10 + 20

let b = 0
setTimeout(() => {
    b = 10 + 10
}, 1000)

let c = function () {
    console.log("hello");
}


exports.a = a
exports.b = b
exports.c = c
```

exports对象和module.exports对象指向的内容相同（地址引用）

```js
console.log(module.exports === exports);
// true
```

若exports对象和module.exports对象指向的对象不同时，

最终模块对外暴露的内容永远以 module.exports对象指向的为准

---

#### 区别module.exports, exports

![](https://pbs.twimg.com/media/E3V1z7gVoBYDogY?format=jpg&name=medium)

- module.exports默认是个空对象

- exports默认也是个空对象

- **二者指向同一个引用地址**

- 若二者指向的是不同对象时，

  以module.exports为准，exports指向失效

- 通过exprots.属性的方式挂在模块成员，

  可以反映到module.exports指向的对象的内容

- 直接让 exports等于一个新对象，

  并不会修改module.exports指向的对象的内容

  最终模块对外暴露的内容永远以 module.exports对象指向的为准

  **ES6对象的健值同名时的简写**只能用于module.exports

所以，上4图

1. exprots指向对象 { username='zs'} 后，

   又使module.exports指向一个新对象

   最终以module.exports对象指向为准

2. module.exports指向一个对象 { username='zs'} 后，

   又使exports指向一个新对象

   最终以module.exports对象指向为准

3. exprots指向对象 { username='zs'} 后，

   在此基础上，又追加module.exports的一个属性gender='男'

   最终以追加了属性module.exports对象指向为准

4. exprots指向对象后，

   又使module.exports指向exprots

   在此基础上，又追加module.exports的一个属性age='22'

   最终以追加了属性module.exports对象指向为准

****

为了防止混乱，导出模块是不要混用







## 第三方模块

也叫做包（package）

是基于内置模块封装出的，效率更高

一般由多个文件构成，放到了一个文件夹中

有两种形式：

- JS文件的形式（body-parser）

  提供具体功能的API方法函数接口

- 命令行工具的形式（nodemon）

  负责项目开发

通过第三方模块的存储和分发仓库npm获取

详见npm笔记





## Node.js的异步

Node.js中的API有两种，一种是同步API，一种是异步API

异步API的返回值需要通过回调函数来获取，

若多个异步调用的结果存在依赖关系，就需要嵌套，

会导致嵌套层数过多，就是**回调地狱**



### 异步嵌套（回调地狱）

比如，fs模块依次读取A文件、B文件、C文件、D文件

多个异步调用嵌套层数过多，会导致维护困难

```js
const fs = require('fs')

fs.readFile('./A.html', (err, res)=>{
  console.log(res)
    
	fs.readFile('./B.html', (err, res)=>{
  	console.log(res)
    
    fs.readFile('./C.html', (err, res)=>{
      console.log(res)
      
      fs.readFile('./D.html', (err, res)=>{
        console.log(res)
      })
    })
  })
})
```

### Promise解决回调地狱

```js
function 第一个(){
  return new Promise((res,rej)=>{
    // 成功时
    res()
    // 失败时
    rej()
  })
}
function 第二个(){
  return new Promise((res,rej)=>{
    // 成功时
    res()
    // 失败时
    rej()
  })
}

第一个()
	.then(res=>{
  		// console.log(res)
  		retuen 第二个()
		})
  .then(res=>{
  		// console.log(res)
		})
```

1. 原本是需要嵌套调用三次 fs.readFile()

   因为是异步API，嵌套会有回调地狱，

   可使用promise

2. 将异步函数外包裹一个promise实例对象，

   并将promise实例对象放入一个函数

   每个函数return 返回的是创建的promise实例对象

3. 异步执行成功时，通过promise实例对象的resolve参数传出结果

   异步执行失败时，通过promise实例对象的reject参数传出结果

4. 调用函数（第一个Promise实例对象）

   通过then()方法获取异步执行的结果，

   并return返回下一个函数的调用（Promise实例对象）

   链式编程依次调用函数

```js
const fs = require('fs')

function p1() {

    return new Promise((reslove, reject) => {
        fs.readFile('./A.js', 'utf8', (err, data) => {
            if (err) {
                reject(err.message)
            } else {
                reslove(data)
            }
        })
    })

}

function p2() {
    return new Promise((reslove, reject) => {

        fs.readFile('./B.js', 'utf8', (err, data) => {
            if (err) {
                reject(err.message)
            } else {
                reslove(data)
            }
        })
    })
}

function p3() {
    return new Promise((reslove, reject) => {

        fs.readFile('./C.js', 'utf8', (err, data) => {
            if (err) {
                reject(err.message)
            } else {
                reslove(data)
            }
        })
    })
}


p1()
    .then(res1 => {
        console.log(res1);
        return p2()
    })
    .then(res2 => {
        console.log(res2);
        return p3()
    })
    .then(res3=> {
        console.log(res3);
    })
```



### async异步函数解决回调地狱

> Promise还是比较繁琐
>
> - 需要手动给每个异步API包裹上Promise对象
>
> - 还要手动调用resolve和reject传递出异步执行结果
>
> - 外部的链式比较臃肿

将异步嵌套写成了同步的形式

```js
async function p1(){
  return 'p1'
}

async function p1(){
  return 'p2'
}

async function p1(){
  return 'p2'
}

async function run(){
  let res1 = await p1()
  let res2 = await p2()
  let res3 = await p3()
  console.log(res1)
  console.log(res2)
  console.log(res3)
}
```

#### util内置模块

包装Node.js的API，使返回值为Promise对象

然后才能支持异步函数的语法

```js
const promisify =  require('util').promisify
```

```js
const promisify =  require('util').promisify
const fs = require('fs')
const readFile = promisify(fs.readFile)

async function run (){
  let res1 = await readFile('./A.html', 'utf8')
  let res1 = await readFile('./B.html', 'utf8')
  let res1 = await readFile('./C.html', 'utf8')
  console.log(res1)
  console.log(res2)
  console.log(res3)
}

run();
```

