# 常用内置模块

![](https://cdn-ssl-devio-img.classmethod.jp/wp-content/uploads/2020/04/nodejs-1200x630-1.png)

[[toc]]

## fs 文件系统

fs 模块用于**文件操作**

使用时要先通过 require 导入模块

```js
const fs = require("fs");
```

---

### fs.readFile()

读取指定文的件内容

```js
fs.readFile(文件路径, [编码格式], 回调函数);
```

::: tip 参数

- 文件路径（必须）：[path 模块](#path-路径操作) +[\_\_dirname](#dirname) 处理的字符串形式的路径
- 编码格式（可选）：以什么编码格式读取文件，常用 **`utf8`**
- 回调函数（必须）：通过回调函数参数获取读取结果

:::

```js
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "路径/文件.后缀");

fs.readFile(filePath, "utf8", function(err, data) {});
// 箭头函数形式的回调函数
fs.readFile(path, "utf8", (err, data) => {});
```

::: tip 回调函数参数

- **err**：

  - 错误优先 err 在前
  - 读取失败的**错误对象**，错误信息存于 `err.message`
  - 读取成功时值为 **null**

- **data**：
  - 读取成功时值为读取到的**文件内容**
  - 读取失败时值为 **undefined**

:::

可通过 if 条件判断 err 是否为真来判断文件读取的成功或失败

> 如下：读取 HTML 页面文件

```js
const fs = require("fs");
const path = require("path");

fs.readFile(path.join(__dirname, "./index.html"), "utf8", (err, data) => {
  if (err) {
    console.log(err.message);
    return;
  } else {
    console.log(data);
  }
});
```

---

### fs.writeFile()

向指定文件中写入内容，重复调用时新内容会**覆盖旧内容**

若文件不存在则新建文件并写入内容

> **目录的创建需另外调用 [fs.mkdir()](fs-mkdir)**，不然会报错路径错误

```js
fs.writeFile(文件路径, 写入内容, [编码格式], 回调函数);
```

::: tip 参数

- 文件路径（必须）：[path 模块](#path-路径操作) +[\_\_dirname](#dirname) 处理的字符串形式的路径字符串形式
- 写入内容（必须）：字符串
- 编码格式（可选）：表示以什么编码格式写入内容，常用 **utf8**

- 回调函数（必须）：内容写入完后执行

:::

```js
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "路径/文件.后缀");
const content = "写入内容";

fs.writeFile(filePath, content, "utf8", function(err, data) {});
// 箭头函数形式的回调函数
fs.writeFile(path, content, "utf8", (err, data) => {});
```

::: tip 回调函数参数

- **err**：
  - 错误优先 err 在前
  - 读取失败的**错误对象**，错误信息存于 `err.message`
  - 读取成功时值为 **null**
- **data**：
  - 读取成功时值为读取到的**文件内容**
  - 读取失败时值为 **undefined**

:::

可通过 if 条件判断 err 是否为真来判断文件读取的成功或失败

> 如下：获取文件内容进行整理，然后存入新的文件

```js
// 整理前的内容
andy=99 Tom=80 Jerry=95 Jame=40

// 需要整理成如下，然后存入新文件：
andy : 99
Tom : 80
Jerry : 95
Jame : 40
```

```js
const fs = require("fs");
const path = require("path");

fs.readFile(path.join(__dirname, "./from.txt"), "utf8", function(readErr, data) {
  if (readErr) {
    console.log("读取失败", readErr.message);
    return;
  } else {
    console.log("读取成功", data);
    // 1. 读取并操作数据
    const oldData = data.split(" ");
    const newData = oldData.map((item) => item.replace("=", ":");
    const resData = newData.join("\r\n");
    // 2. 调用 writeFile 函数写入文件
    fs.writeFile(path.join(__dirname, "./to.txt"), resData, function(writeErr) {
    if (writeErr) {
      console.log("写入失败", writeErr.message);
      return;
    } else {
      console.log("写入成功");
    }
  });
  }
});
```

---

### fs.appendFile()

如果文件存在，会在内容后面追加写入内容

若文件不存在，则会创建文件并写入

```js
fs.appendFile(PATH / NAME, content, (err) => {});
```

> 如下，运行一次就给文件内容追加一次

```js
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "./from.txt");
const content = "body{color:red}\n";

fs.appendFile(fielPath, content, (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log("succeed");
});
```

---

### fs.rename()

```js
fs.renameSync(oldPATH/NAME，newPATH/NAME,()=>{}
```

::: tip 重命名

路径不变，文件名改变：

```js
const fs = require("fs");

fs.rename("./dir/01.css", "./dir/02.css", (err) => {
  if (err) {
    console.log("failed");
    console.log(err);
  }
  console.log("succeed");
});
```

:::

::: tip 移动

路径改变，文件名不变：

```js
const fs = require("fs");

fs.rename("./01.css", "./dir/01.css", (err) => {
  if (err) {
    console.log("failed");
    console.log(err);
  }
  console.log("succeed");
});
```

:::

::: tip 移动 + 重命名

路径不变，文件名改变：

```js
const fs = require("fs");

fs.rename("./01.css", "./dir/02.css", (err) => {
  if (err) {
    console.log("failed");
    console.log(err);
  }
  console.log("succeed");
});
```

:::

---

### fs.unlink()

删除文件

```js
fs.unlink(PATH / NAME, (err) => {});
```

```js
const fs = require("fs");

fs.readdir("./01.css", (err) => {
  if (err) {
    console.log("failed");
    console.log(err);
  }
  console.log("succeed");
});
```

---

### fs.stat()

根据回调函数参数判断路径是文件夹还是文件

```js
fs.stat(路径, (er, data) => {});
```

::: tip 回调函数参数：

若路径是文件：err 是个空，data 是文件对象

若路径是个文件夹：err 返回错误对象，data 是 `undefined`

> 如下

```js
const fs = require("fs");

fs.stat("./03", (err, data) => {
  if (err) {
    console.log(err);
    console.log("it`s dir");
    return;
  } else {
    console.log("it`s file");
  }
});
```

---

### fs.readdir()

返回指定路径下的所有文件和文件夹列表

```js
fs.readdir(路径, (err.datd) => {});
```

以**数组的形式**返回读取的列表

> 如下：

```js
const fs = require("fs");

fs.readdir(__dirname, (err, data) => {
  if (err) {
    console.log(err);
  }
  console.log(data);
});
```

```js
["dir01", "dir02", "file01.js", "file02.js"];
```

---

### fs.mkdir()

创建目录

> 按先后顺序连续调用创建目录

```js
const fs = require("fs");

fs.mkdir("A", (err) => {
  if (err) {
    console.log(err);
    return;
  }

  fs.mkdir("B", (err) => {
    if (err) {
      console.log(err);
      return;
    }
  });
});
```

> 直接创建含有层级的目录

```js
const fs = require("fs");

fs.mkdir("a/b/c/d/e", { recursive: true }, (err) => {
  if (err) throw err;
});
```

> 如下：判断是否存在 upload 文件夹，没有就添加

```js
const fs = require("fs");

fs.readdir(__dirname, (err, data) => {
  if (err) {
    console.log(err);
    return;
  }

  if (data.indexOf("upload") == -1) {
    fs.mkdir("./upload", (err) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log("created a directoy");
    });
  } else {
    console.log("directory is already here");
  }
});
```

---

### fs.rmdir()

删除空目录

```js
fs.rmdir("dir", (err) => {
  if (err) throw err;
});
```

含有文件的目录无法删除，可通过 `fs-extra`

```shell
npm install fs-extra
```

```js
const fs = require("fs-extra");

fs.remove("含有文件的文件夹", (err) => {
  if (err) throw err;
});
```

---

### 相对路径出现错误

在使用 fs 模块时若使用 **相对路径** 常会出现路径动态拼接错误问题，导致找不到文件

::: danger 相对路径导致动态拼接问题

**Node.js 中的相对路径相对的不是工作目录，而是执行命令行工具时所在的目录**<br/>

即使用**相对路径**的 **`./`** **`../`**，最终被拼接为：<br/>`执行 Node 命令时终端所在目录 + 被操作文件的路径`

( `require()`例外 )

所以尤其在使用 fs 模块时若直接使用相对路径会出现路径动态拼接错误问题，导致找不到文件

为了避免路径错误，一般使用 fs 模块操作文件时一般都要使用**绝对路径**，即从目标文件的盘符开始写。**常用 `path` 模块的 `join()` 拼接 `__dirname`、`__filename`**

:::

<br/>

## path 路径操作

path 模块用于**路径操作**

使用时要先通过 require 导入模块

```js
const path = require("path");
```

---

### \_\_dirname

**`__dirname`** (双下划线) 可获取**当前文件所在目录**的绝对路径（不包括该文件名）

::: tip 为何不直接手写路径

1. 不同系统中的路径层级分隔符 `\` `/` 不同
2. 绝对路径要从盘符开始写，手写太麻烦

:::

```js
// 当前文件所在的目录绝对路径
console.log(__dirname);
// 当前文件的绝对路径
console.log(__dirname + "/当前文件名.后缀");
```

---

### \_\_filename

`__filename`可获得当前**文件的绝对路径**（包括该文件名）

```js
console.log(__filename);
// 相当于：
console.log(__dirname + "/当前文件名.后缀");
```

---

### path.join()

用于拼接字符串的路径，返回一个拼接后的字符串

拼接多个路径时，路径片段用逗号分隔

```js
const path = require("path");

console.log(path.join("/路径1", "/路径2", "/路径3"));
/* /路径1/路径2/路径3 */
```

::: danger

**Node.js 中若要使用路径，全部都要用 `path.join()` 和 `__dirname` 进行拼接**

:::

::: tip 结合 \_\_dirname 拼接文件绝对路径

`path.join()` 拼接**相对路径**时，相对路径 `./` 中的 **`.`** 会被自动去掉

```js
const path = require("path");

console.log(__dirname + "/文件.txt");
console.log(__dirname + "./文件.txt");
/* 
/Users/user/StudyPractice/JS/文件.txt
/Users/user/StudyPractice/JS./文件.txt  《=== 
*/

console.log(path.join(__dirname, "/文件.txt"));
console.log(path.join(__dirname, "./文件.txt"));
/* 
/Users/user/StudyPractice/JS/文件.txt
/Users/user/StudyPractice/JS/文件.txt   《====
*/
```

:::

::: tip 路径片段抵消

拼接的片段中每含有 `../` ，前一个路径会被抵消掉

```js
const path = require("path");

console.log(path.join("/a", "/b", "../", "/c"));
/* /a/c */
console.log(path.join("/a", "/b", "../../", "/c"));
/* /c */
console.log(path.join("/a", "/b/c", "../../", "/d"));
/* /a/c */
```

:::

---

### path.basename()

获取路径字符串中的**文件名**

> 实质是获取一字符串段路径中的最后的路径片段（一般来说是文件名）

```js
path.basename("路径", [".文件后缀"]);
```

::: tip 第二个参数 文件后缀名

没有该参数时（默认）：返回值是 `文件名 + 后缀名`<br/>有该参数时：返回值是不包含后缀名的文件名

:::

```js
const path = require("path");

const fullPath = "/Users/user/StudyPractice/JS/文件.html";

console.log(path.basename(fullPath));
// 文件.html
console.log(path.basename(fullPath, ".html"));
// 文件名
```

---

### path.extname()

获取路径字符串中文件的**后缀扩展名**

```js
const path = require("path");

const fullPath = "/Users/user/StudyPractice/JS/文件名.html";
console.log(path.extname(fullPath));
// .html
```

::: tip 结合 path.basename()

```js
const fullPath = "/Users/user/StudyPractice/JS/文件名.html";

const ext = path.extname(fullPath);
console.log(path.basename(fullPath, ext));
// 文件名
```

:::

<br/>

## http 服务器相关

http 模块用来创建 web 服务器

使用时要先通过 require 导入模块

```js
const http = require("http");
```

> Node.js 中可仅通过内置 http 模块手写一个服务器提供 web 服务，而不需要通过 IIS，Apache 等 web 服务器软件

---

### http.createServer()

可将一个普通电脑变为可以向外提供 Web 资源的 Web 服务器

> 但目前已经不会使用原生 Node.js 进行开发了，多用 [Express.js]()、[Nest.js]() 等框架

---

### 简易 web 服务器

1. 导入 http 模块

2. 创建 web 服务器实例

3. 给服务器实例绑定 request 事件监听客户端请求

4. 监听端口启动服务器

   终端中用 `node .` 打开该 JS 文件

```js
const http = require("http");

const server = http.createServer();

server.on("request", (req, res) => {
  console.log("有客户端来访问服务器了");
});

server.listen(3000, () => {
  console.log("服务器运行在http://127.0.0.7:3000");
});
```

::: tip nodemon

Node.js 原生命令 `node .` 启动服务器后若又修改了的内容，必须中断服务器后再重新启动，才能显示更新内容。但这样太麻烦，可通过 npm、yarn 全局下载第三方模块 **nodemn** 来代替 Node.js 原生命令去启动服务器 js 文件

```bash
nodemon 入口文件.js
```

:::

---

### server.on()

**http.createServer().on()** 中给服务器绑定**request 事件处理函数**

只要服务器收到了客户端请求，

就可以通过 request 事件获得客户端相关的数据

::: tip req 请求对象

包含客户端相关的数据和属性

- **req.url**

  是客户端浏览器发送 GET 请求的**url 地址**

  GET 请求的参数可通过 url 内置模块辅助获取

- **req.method**

  客户端请求的方式

```js
server.on("request", (req) => {
  console.log("有客户端来访问服务器了");

  console.log(req.url);
  console.log(req.method);
});
```

- req.on

  监听 POST 请求的参数的传递

  当有数据传递时便会触发 req.on 事件

  当数据传递完成时便会触发 req.end 事件

  POST 请求的参数会很大，放在了请求体中传输，不是一次性传递完成的，

  是分批次的，需要通过变量拼接获取完整 POST 请求参数

  最后可通过 querystring 内置模块将拼接的字符串转为对象形式获取 POST 参数

```js
const querystring = require("querystring");

app.on("request", (req, res) => {
  let postParams = "";

  req.on("data", (params) => {
    postParams += params;
  });

  req.on("end", () => {
    console.log("传输完成");
    console.log(querystring.parse(postParams));
  });
});
```

:::

::: tip res 响应对象

包含服务端相关的数据和属性

- **res.end**

  向客户端响应指定内容，并结束该次请求的处理

```js
server.on("request", (req, res) => {
  console.log("有客户端来访问服务器了");

  res.end("<h1>Hello</h1>");
});
```

- **res.setHeader**

  设置响应头

```js
// 可用于的设置编码格式来解决res.end() 乱码
res.setHeader("Content-Type", "text/html; charset=utf-8");
```

```js
server.on("request", (req, res) => {
  console.log("有客户端来访问服务器了");

  res.setHeader("Content-Type", "text/html; charset=utf-8");

  res.end("<h1>你好</h1>");
});
```

- res.writeHead

  设置响应状态、响应数据类型、编码类型

```js
res.write(500);
```

```js
res.write(200, {
  "Content-type": "text/plain;charset=utf8",
});
```

:::

---

### 简易路由

根据判断客户端请求 URL 地址路径的不同，响应不同的页面内容

> 如下：

```js
const http = require("http");

const server = http.createServer();

server.on("request", (req, res) => {
  console.log("有客户端来访问服务器了");

  // 获取 客户端发送的URL请求地址
  const url = req.url;
  // 设置默认响应内容 404
  let responseContnet = "<h1>404 Not Found</h1>";

  // 判断 客户端发送的URL请求地址
  if (url === "/" || url === "/index.html") {
    responseContnet = "<h1>index 首页</h1>";
  } else if (url === "/about.html") {
    responseContnet = "<h1>About 页面</h1>";
  }

  // 设置 响应头的编码格式
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  // 响应页面内容
  res.end(responseContnet);
});

server.listen(3000, () => {
  console.log("服务器运行在http://127.0.0.7:3000");
});
```

<br/>

## url 解析 URL

url 模块用于解析处理请求 URL 地址

```js
const url = require("url");
```

---

### url.parse

将 URL 请求地址转为对象形式

```js
url.parse(req.url, true).query;
```

```js
let getParams = url.parse(req.url, true).query;

console.log(getParams.name);
console.log(getParams.age);
```

<br/>

## querystring 查询字符串

用来处理查询字符串

### querystring.parse()

通过**`parse()`** 将字符串转为对象格式

```js
const querystring = require("querystring");

app.on("request", (req, res) => {
  let postParams = "";

  req.on("data", (chunk) => {
    postParams += params;
  });

  req.end("data", () => {
    console.log("传输完成");
    console.log(querystring.parse(postParams));
  });
});
```

> 在 Express.js 中

```js
const qs = require("querystring");

app.get("/", (req, res) => {
  res.send(qs.parse("name=andy&age=100"));
});

/*
{
  "name": "andy",
  "age": "100"
}
*/
```

<br/>

## util 模块

### util.promisify() 异步转化

```js
const promisify = require("util").promisify;
```

`util` 模块中的`promisify` 方法可以将 `callback` 回调函数转换为为 `Promise` 形式，防止回调地狱

```js
const fs = require("fs");
const { promisify } = require("util");

const readFile = promisify(fs.readFile);

async function run() {
  let res1 = await readFile("./A.html", "utf8");
  let res1 = await readFile("./B.html", "utf8");
  let res1 = await readFile("./C.html", "utf8");
  console.log(res1);
  console.log(res2);
  console.log(res3);
}

run();
```

<br/>

## 实例

### 拆分 HTML 文件

将一个完整的 HTML 文件拆分

1. 将 HTML 文件、CSS 文件、JS 文件分别存放到已存的 static 目录下

2. 并通过外链方式将拆分出的 CSS 文件、JS 文件引入拆分出的 HTML 文件

> 处理前的完整的 HTML 文件

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      #title {
        font-size: 20px;
        color: red;
      }
    </style>
  </head>
  <body>
    <div id="title">
      content
    </div>
    <script>
      const h = document.getElementById("title");
      h.innerHTML = "Hello";
    </script>
  </body>
</html>
```

> 处理前后的目录结构

```js
// 处理前
|- static
	|- 空
|- index.html
|- main.js
```

```js
// 处理后
|- static
	|- index.css
	|- index.js
	|- index.html
|- index.html
|- main.js
```

> 处理代码

```js
const fs = require('fs')
const path = require('path')

// 1. 使用正则表达式
const regStyle = /<style>[\s\S]*</style>/
const regScript = /<script>[\s\S]*</script>/

// 2.1 Style 标签内容拆分获取与写入
const resolveStyle = (htmlStr)=>{
  const contentStr = regStyle.exec(htmlStr)
  const finalContent = contentStr
  	.replace('<style>', '')
  	.replace('</style>', '')
  fs.write(path.join(__dirname,'./static/index.css', (err,data)=>{
     if(err){
    return console.log('Style 标签内容写入失败',err.message)
  		}
    console.log('Style 标签内容写入完成')
  }))
}

// 2.2 Script 标签内容拆分获取与写入
const resolveScript = (htmlStr)=>{
  const contentStr = regScript.exec(htmlStr)
  const finalContent = contentStr
  	.replace('<script>', '')
  	.replace('</script>', '')
  fs.write(path.join(__dirname, './static/index.js', (err, data) => {
    if(err){
       return console.log('Script 标签内容写入失败',err.message)
  	}
    console.log('Script 标签内容写入完成')
  }))
}

// 2.3 HTML 标签内容拆分获取与写入
const resolveHTML = (htmlStr)=>{
  const finalContent = htmlStr
  	.replace(regStyle, '<link rel="stylesheet" href="./index.css"/>')
  	.replace(regScript, '<style src="./index.js"/>')
  fs.write(path.join(__dirname,'./static/index.html', (err, data) => {
    if(err){
       return console.log('HTML 标签内容写入失败',err.message)
  	}
    console.log('HTML 标签内容写入完成')
  }))
}


// 3. 读取完整的 HTML 文件并进行拆分写入处理
fs.readFile(path.join(__dirname, './index.html','utf8', (err, data) => {
  if(err){
    return console.log('html读取失败',err.message)
  }
  resolveStyle(data)
  resolveScript(data)
  resolveHTML(data)
  console.log("处理完成")
}))

```

---

### 静态资源访问

::: tip 静态资源

服务器不需要处理，直接响应给客户端的资源就是静态资源<br/>比如： `.html` 文件、`.css` 文件、`.js` 文件、images 图片...

:::

::: tip 动态资源

相同的请求地址但是**请求参数不同**<br/>服务器响应给这种请的资源就是动态资源

```js
http://www.abc.com/list?id=001
http://www.abc.com/user?name=马勒戈壁&age=69
```

:::

> 如下：服务器静态资源存放于 public 目录

```js
|- public
  |- images
    |- 01.jpg
  |- css
    |-index.css
  |- js
    |- index.js
  |-index.html
|- app.js
```

1. 通过 url 内置模块，获取不带请求参数的请求 url 路径

2. 通过 path 内置模块，拼接文件所在目录的绝对路径 + 请求路径

3. 通过 fs 内置模块，读取的内容响应给客户端

4. 通过 mime 第三方模块，动态设定响应报文的数据类型

```js
const http = require("http");
const url = require("url");
const path = require("path");
const fs = require("fs");
const mime = require("mime");

const app = http.createServer();

app.on("request", (req, res) => {
  // 1.
  // let pathname = url.parse(req.url).pathname
  let pathname = "/" ? "/index.html" : url.parse(req.url).pathname;
  // 2.
  let realPath = path.join(__dirname, "public" + pathname);
  // 3.
  fs.readFile(realPath, "utf8", (err, data) => {
    if (err) {
      res.writeHead(404, { "Content-type": "text/html;charset=utf8" });
      return console.log("404 Not Found");
    }
    // 4.
    let type = mime(realPath);
    res.writeHead(404, { "Content-type": type });
    res.end(data);
  });
});

app.listen(3000, () => {
  console.log("server running at http://localhost:3000");
});
```
