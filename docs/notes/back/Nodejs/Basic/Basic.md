# Node.js 基础

![img](https://cdn-ssl-devio-img.classmethod.jp/wp-content/uploads/2020/04/nodejs-1200x630-1.png)

[[toc]]

## 简介

Node.js 是个基于 Chrome V8 引擎的 **JavaSCript 运行环境**

Node.js 仅提供了基础功能 + 内置 API

但基于 Node.js 的有大量的开发各种工具、框架

::: tip Nodejs 可以实现

- 静态资源服务器
- 路由处理
- 动态网站
- 模版引擎
- Web 服务器
- 命令行工具
- 网络爬虫
- 桌面应用开发（Electron）
- app
- 嵌入式
- 游戏

:::

<br/>

## 安装

- 从官方网站直接下载指定版本

- 通过**版本管理器**下载：
  - [**NVM**](./NVM.md)
  - [**asdf**]()

::: tip 版本区分：

- **LTS 版本**：长期稳定版，适合企业级项目
- **Current 版本**：新特性测试尝鲜版，可能存在隐藏 Bug 漏洞

:::

版本号查看

```shell
node -v
```

<br/>

## JS 运行环境

::: tip 浏览器（前端运行环境）

- 内置 JS 解析引擎
- JS 文件 只能通过 HTML 文件的 script 标签导入
- JS 执行结果在控制台查看
- 提供的内置 API 包含：DOM、BOM、Canvas、XMLHttpRequest...
- 顶级全局对象是 **window**

:::

::: tip Node.js（后端运行环境）

- 基于 V8 引擎解析 JavaScript
- JS 文件可在 Node.js 环境中直接执行
- JS 执行通过终端查看
- **无法调用浏览器环境提供的 API**
- 提供的内置 API 包含： fs、path、http、querystring...
- 顶级全局对象是 **global**

:::

---

### node 交互模式

终端中直接输入`node`，就可在命令行工具中直接运行 JS 命令

> 仅用于快速验证某一个简单结论

```bash
~ % node
Welcome to Node.js v14.16.0.
Type ".help" for more information.
> var a = 10
undefined
> var b = '10'
undefined
> a == b
true
> a === b
false
> a + 1
11
> b + 1
'101'
> .exit
~ %
```

---

### 运行 JS 文件

JavaScript 文件可在 Node.js 环境中直接执行

打印的结果和报错消息等在终端查看

```js
|- JS文件存放目录
	|- JS文件名.js
```

```bash
cd JS文件存放目录
node JS文件名
```

> 如下：JS 文件内容

```js
console.log("Hello Node.js");
var a = 10;
var b = 20;
console.log(a + b);
```

> 如下：终端打印内容

```bash
ls
# text.js

node test.js
# Hello Node.js
# 30
```

<br/>

## 全局对象 global

全局对象是 JavaScript 中在程序任何地方都可以访问一个特殊对象

- 在 Node.js 运行环境中的全局对象是 `global`

- 在浏览器 JavaScript 中全局对象是`window`。

Node.js 这个 JS 运行环境中**无法调用浏览器环境提供的 API**

```js
console.log(window);
//报错 ReferenceError: window is not defined
```

---

### 全局变量

Node.js 中声明的全局变量变量，**不会挂载到 `globa` 对象下**

```js
let a = 10;
console.log(global.a); //undefined
```

> 而在浏览器的 JavaScript 中，声明的全局变量则会挂载到 window 对象下，成为 window 对象的属性
>
> ```html
> <body>
>   <script>
>     var a = 10;
>     console.log(window.a);
>     console.log(a === window.a);
>   </script>
> </body>
> // 10 true
> ```

可以将全局变量添加到 `global` 上作为其属性，使该变量可在任何地方直接使用

> 但是一般是用模块化的方式，[详见下文](#commonjs-模块化规范)

```js
global.a = 20;
console.log(a); //20
```

---

### 全局方法

::: tip

- **console.log()**
- **setTimeout()**
- **clearTimout()**
- **setInterval()**
- **claerInterval()**

:::

> 交互式验证

```shell
node
> global
<ref *1> Object [global] {
  global: [Circular *1],
  clearInterval: [Function: clearInterval],
  clearTimeout: [Function: clearTimeout],
  setInterval: [Function: setInterval],
  setTimeout: [Function: setTimeout] {
    [Symbol(nodejs.util.promisify.custom)]: [Function (anonymous)]
  },
  queueMicrotask: [Function: queueMicrotask],
  clearImmediate: [Function: clearImmediate],
  setImmediate: [Function: setImmediate] {
    [Symbol(nodejs.util.promisify.custom)]: [Function (anonymous)]
  }
}
```

调用全局方法时可通过 `golbal` 调用，或同浏览器环境的 `window` 一样可以省略

```js
global.console.log("xxxx");

global.setTimeout(function() {
  console.log("timer");
}, 2000);
```

```js
console.log("xxxx");

setTimeout(function() {
  console.log("timer");
}, 2000);
```

<br/>

## this 指向

交互模式中的 `this` 指向 **全局对象 global**

```bash
~% node
> this === global
true
```

模块中的`this` 指向 **当前模块导出的 `exports` 对象**

若当前文件没有导出的内容时，是个空对象 `{}`

```js
console.log(this); // {}
console.log(this === global); // false

console.log(this === exports); // true
console.log(this === module.exports); // true
```

```js
let a = 10;
exports.a = a;

console.log(this); // { a: 10 }
console.log(this === exports); // true
console.log(this === module.exports); //true
```

<br/>

## CommonJS 模块化规范

### 模块化

模块化是指，将一个内容繁杂的大文件拆分为多个独立且相互有依赖的小文件，每个小文件就是一个模块，模块之间可作为依赖导入。每一个 JavaScript 就是一个模块，模块可以是函数、类型、变量等

> React 中 CSS 和 image 也可作为模块导入 .jsx

::: tip 模块化优点

- 提高了代码的维护性、**复用性**
- 实现了模块的**按需加载**

:::

::: tip Node.js 中模块分为 3 类：

- **内置模块**:（ fs、path、http 等）
- **自定义模块**:（自己写的每个 JS 文件）
- **第三方模块**:（也叫**包**，通过 npm、yarn 需要下载引入）

:::

**Node.js 遵循 CommonJS 的模块化规范** 处理模块之间的依赖关系

::: tip CommonJS 规范

- 每个文件就是一个模块，有自己的作用域。
- 每个模块有自己的作用域，其中变量、函数、类等都是私有的

- 模块可通过 [require](#require) 导入其他模块导出的内容
- 模块可通过 [module](#module) 导出内容供其他模块导入使用

:::

---

### module

每个模块（ JS 文件）中都有一个 **`module` 对象**，存储了和当前模块相关的信息

其 **[exports](#module-exports)** 可向外暴露共享该模块内成员

```js
console.log(module);
```

```shell
Module {
  id: '.',
  path: '该文件所在目录的绝对路径',
  exports: {},
  parent: null,
  filename: '该文件的绝对路径',
  loaded: false,
  children: [],
  paths: [
    '/Users/user/该文件所在目录/node_modules',
    '/Users/user/node_modules',
    '/Users/node_modules',
    '/node_modules'
  ]
}
```

---

### module.exports

在自定义模块（ JS 文件）中，将模块内成员挂载到 **`module.exports` 对象** 来实现向外暴露共享该模块内的变量、方法等

`module.exports` 默认值是个空对象 **`{}`**

```js
console.log(module.exports);
// {}

module.exports.自定义名 = 成员名;
module.exports.自定义名 = 成员名;

console.log(module.exports);
// { 自定义名: 成员, 自定义名: 成员 }
```

> 如下： `a.js` 导出，`b.js` 导入

```js
// a.js
let a = 10 + 20;

let b = 0;
setTimeout(() => {
  b = 10 + 10;
}, 1000);

let c = function() {
  console.log("hello");
};

module.exports.a = a;
module.exports.b = b;
module.exports.c = c;

console.log(module.exports);
// { a: 30, b: 0, c: [Function: c] }
```

```js
// b.js
const xx = require("./a");
console.log(xx);

// { a: 30, b: 0, c: [Function: c] }
```

---

### exports

因为`module.exports` 写起来麻烦，Node.js 提供了 `exports` 对象

`exports` 默认值是个空对象 **`{}`**

```js
console.log(exports);
// {}

exports.自定义名 = 成员名;
exports.自定义名 = 成员名;

console.log(exports);
// { 自定义名: 成员, 自定义名: 成员 }
```

`exports` 对象和 `module.exports` 对象指向的内容相同（引用地址相同）

**最终模块对外暴露的内容永远以 `module.exports` 对象指向的为准**

```js
console.log(module.exports === exports);
// true
```

> 如下： exports 与 module.exports 写法类似但简化了

```js
let a = 10 + 20;

let b = 0;
setTimeout(() => {
  b = 10 + 10;
}, 1000);

let c = function() {
  console.log("hello");
};

exports.a = a;
exports.b = b;
exports.c = c;

console.log(exports);
// { a: 30, b: 0, c: [Function: c] }
```

::: tip module.exports 与 exports

- 默认值都是是个空对象
- **二者指向同一个引用地址**，
- 最终模块对外暴露的内容永远以 `module.exports` 为准
- 挂载到 `exprots`.上的模块成员可以反映到 `module.exports` 对象，但直接直接让 `exports` 等于一个新对象并不会修改 `module.exports` 指向的对象的内容

:::

---

### require()

Node.js 通过 **`require()`** 加载其他模块（一个 js 文件）

**内置模块和第三方模块直接写名字，自定义模块要写文件路径**

如果没有发现指定模块，会报错

```js
require("内置模块");
require("第三方模块");

require("路径/自定义模块名"); // 模块同名目录下有 index.js 时
require("路径/自定义模块名.js"); // 直接导入该模块时
```

**`require()`** 会读取并执行该模块中的内容，会返回该模块导出的 [module.exports](#module-exports) 属性对象，可自定义变量接收

```js
const 自定义名 = require("路径/模块名.js");
const 自定义名 = require("路径/模块名");
const 自定义名 = require("模块名");
```

::: tip 模块加载机制

1. **优先内置模块**

   - Node.js 的内置模块的加载优先级最高
   - 自定义模块与内置模块同名时最终导入的是内置模块

2. **优先缓存加载**

   - 模块在第一次被加载后会被缓存
   - 后续即使多次导入相同模块也不会多次重复执行模块内的代码

   ```js
   const xxx = require("xxx");
   const xxx = require("xxx");
   const xxx = require("xxx");
   ```

3. **查找机制**

   - **完整路径 + 文件名 + 后缀名：**<br/>直接引入模块

   ```js
   require("../../模块名.js");
   ```

   - **有路径，无后缀名**<br/>**1.** 先从指定路径下查找该文件，若有则直接引入<br/>**2. **若没有该文件，则导入**同名目录下的 `index.js`**<br/>**3.** 若同名目录下没有 `index.js`，则导入该目录下的 `package.json` 中指定的**入口文件**<br/> **4.** 若同名目录下没有指定入口文件或没找到，则**报错**

   ```js
   require("../../模块名");
   ```

   - **仅文件名**<br/>**1.** **优先从内置模块中查找**，若有则导入<br/>**2.** 若不存在同名内置模块，则从 `node_modules` 目录中查找同名文件并导入其中的 `index.js`<br/>**3.** 若 `node_modules` 目录中没有同名文件夹或其中没有 `index.js`，则查找在该目录下的 `package.json` 中指定的**入口文件**<br/>**4.** 若同名目录下没有指定入口文件或没找到，则**报错**

   ```js
   require("模块名");
   ```

:::

<br/>

## Node.js 异步

Node.js 中的 API 有两种：同步 API、异步 API

其中异步 API（ fs 模块等 ) 的返回值需要通过回调函数来获取

---

### 异步嵌套（回调地狱）

多个异步调用的结果的依赖关系需要嵌套，

若导致嵌套层数过多会出现 **回调地狱**，会导致维护困难

> 比如，fs 模块依次读取 A 文件、B 文件、C 文件、D 文件

```js
const fs = require("fs");

fs.readFile("./A.html", (err, res) => {
  console.log(res);

  fs.readFile("./B.html", (err, res) => {
    console.log(res);

    fs.readFile("./C.html", (err, res) => {
      console.log(res);

      fs.readFile("./D.html", (err, res) => {
        console.log(res);
      });
    });
  });
});
```

---

### Promise 解决法

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

   因为是异步 API，嵌套会有回调地狱，

   可使用 promise

2. 将异步函数外包裹一个 promise 实例对象，

   并将 promise 实例对象放入一个函数

   每个函数 return 返回的是创建的 promise 实例对象

3. 异步执行成功时，通过 promise 实例对象的 resolve 参数传出结果

   异步执行失败时，通过 promise 实例对象的 reject 参数传出结果

4. 调用函数（第一个 Promise 实例对象）

   通过 then()方法获取异步执行的结果，

   并 return 返回下一个函数的调用（Promise 实例对象）

   链式编程依次调用函数

```js
const fs = require("fs");

function p1() {
  return new Promise((reslove, reject) => {
    fs.readFile("./A.js", "utf8", (err, data) => {
      if (err) {
        reject(err.message);
      } else {
        reslove(data);
      }
    });
  });
}

function p2() {
  return new Promise((reslove, reject) => {
    fs.readFile("./B.js", "utf8", (err, data) => {
      if (err) {
        reject(err.message);
      } else {
        reslove(data);
      }
    });
  });
}

function p3() {
  return new Promise((reslove, reject) => {
    fs.readFile("./C.js", "utf8", (err, data) => {
      if (err) {
        reject(err.message);
      } else {
        reslove(data);
      }
    });
  });
}

p1()
  .then((res1) => {
    console.log(res1);
    return p2();
  })
  .then((res2) => {
    console.log(res2);
    return p3();
  })
  .then((res3) => {
    console.log(res3);
  });
```

---

### async/await 异步函数解决法

上文的 Promise 还是很繁琐，甚至理解难度提高了

> - 需要手动给每个异步 API 包裹上 Promise 对象
>
> - 还要手动调用 resolve 和 reject 传递出异步执行结果
>
> - 外部的链式比较臃肿

所以推荐将异步嵌套写成了同步的形式

```js
async function p1() {
  return "p1";
}

async function p1() {
  return "p2";
}

async function p1() {
  return "p2";
}

async function run() {
  let res1 = await p1();
  let res2 = await p2();
  let res3 = await p3();
  console.log(res1);
  console.log(res2);
  console.log(res3);
}
```

---

### util 内置模块

`util` 模块中的`promisify` 方法可以将 `callback` 回调函数转换为为 `Promise` 形式，防止回调地狱

包装 Node.js 的 API，使返回值为 Promise 对象支持异步函数的语法

```js
const promisify = require("util").promisify;
```

```js
const promisify = require("util").promisify;
const fs = require("fs");
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
