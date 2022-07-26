# Async / Await

![img](https://yashints.dev/static/fb3883e15852de11a094b8a6a3d8aee8/47498/asyncawaitjs.jpg)

[[toc]]

## 简介

ES7 引入的新语法，异步函数调用的终极解决方案

比 链式调用处理异步的 [Promise 链](https://blaxberry.github.io/vuepress-studynotes/notes/front/JavaScript/Async/Promise.html#then-的链式调用) 的结构更清晰：

**异步任务可通过 `async` 和 `await` 关键字以同步形式来处理**

- **async** 关键字：用于声明获取异步处理 Promise 对象的函数
- **await** 关键字：用于调用函数，并可通过返回值获取异步处理的结果

```js
async functoin 函数(){
 	const 结果 =  await Promise对象
}

函数()
```

---

### 执行流程

async 函数执行时遇到 await 就会先暂停执行 ，

等待异步操作完成后 Promise 对象的 resolve 调用，

获取异步结果后然后恢复 async 函数的执行并返回解析值

---

### 对比 Promise 链

ES6 提供的 Promise 解决了以往回调函数处理异步任务时的嵌套地狱，通过 Promise 对象的 `then()` 方法获取异步处理的结果

但还是比较麻烦的，特别是链式调用处理多个异步时链式的场合，前一个 `then()` 需要返回 Promise 对象，下一个 `then()` 才能继续获取异步处理的结果，比较太绕麻烦语义不清

> 如下：Promise 链式调用

```js
function promise实例对象的函数() {
  return new Promise((resolve, reject) => {
    // 封装异步任务
    if (条件) {
      resolve(成功的结果);
    } else {
      reject(失败的结果);
    }
  });
}

promise实例对象的函数()
  .then((date) => {
    // 处理第一次异步任务结果并继续下一次异步任务
    return promise实例对象的函数();
  })
  .then((date) => {
    // 处理第一次异步任务结果并继续下一次异步任务
    return promise实例对象的函数();
  })
  .catch((err) => {
    // 处理所以异步任务结中的报错
  })
  .finally(() => {
    console.log("全部结束了");
  });
```

`async` 和 `await` 关键字是以同步形式处理异步任务

比起 Promise 链式调用的结构更加清晰

> 如下：使用 async 函数与 await 表达式处理多个异步任务

```js
function promise实例对象的函数() {
    return new Promise((resolve, reject) => {
      // 封装异步任务
        if (条件) {
            resolve(成功的结果)
        } else {
            reject(失败的结果)
        }
    })
}

promise实例对象的函数(){
  try {
   // 获取第一次异步任务结果
    const data1 = await promise实例对象的函数()
    // 获取第一次异步任务结果
    const data2 = await promise实例对象的函数()
  }catch(err)=>{
    // 处理所以异步任务结中的报错
  }finally{
     console.log('全部结束了')
  }
}
```

---

### 简单实例

> 如下：点击按钮发生 Ajax 请求

```js
const btn = document.querySelector(".btn");
const url = "https://autumnfish.cn/api/joke";

function requestData(url) {
  return new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState !== 4) return;
      if (xhr.readyState == 4 && xhr.status == 200) {
        resolve(xhr.response);
      } else {
        reject("出错了");
      }
    };
    xhr.open("get", url);
    xhr.send(null);
  });
}

btn.addEventListener("click", async () => {
  try {
    const result = await requestData(url);
    console.log(result);
  } catch (err) {
    console.log(err);
  }
});
```

> 如下：Node.js 异步读取多个文件

```js
const fs = require("fs");
const { promisify } = require("util");
const asyncReadFile = promisify(fs.readFile);

async function getData() {
  try {
    const data1 = await asyncReadFile("./1.json", "utf-8");
    const data2 = await asyncReadFile("./2.json", "utf-8");
    const data3 = await asyncReadFile("./3.json", "utf-8");
    console.log(data1, data2, data3);
  } catch (err) {
    throw err;
  }
}
getData();
```

<br/>

## async 关键字

### 定义函数

async 关键字用于定义 Async 函数，

该函数不再是普通函数，默认返回值不再是的 `undefined`

```js
// 一般函数
async function 函数() {}

// 箭头函数
const 函数 = async () => {};
```

---

### 返回值

Async 函数 return **返回值是个 Promise 对象**

且该返回值 Promise 对象的状态与结果取决于函数 return 的值：

- 没有 return 返回值：

  Promise 对象状态为成功 `fulfilled`，结果默认为 `undefined`

```js
async function func() {}
console.log(func());
/*
Promise {<fulfilled>: undefined}
	[[Prototype]]: Promise
	[[PromiseState]]: "fulfilled"
	[[PromiseResult]]: undefined
*/
```

- 没有 return 返回值，而是通过 **throw** 抛出一个错误：

  Promise 对象状态为失败 `rejected`、结果为抛出的错误数据

```js
async function func() {
  throw "出错了";
}
console.log(func());
/*
Promise {<rejected>: '出错了'}
	[[Prototype]]: Promise
	[[PromiseState]]: "rejected"
	[[PromiseResult]]: "出错了"
*/
```

- return 返回值是非 Promise 对象：

  Promise 对象状态为成功 `fulfilled`、结果为 return 的数据

```js
async function func() {
  return "OK";
}
console.log(func());
/*
Promise {<fulfilled>: 'OK'}
	[[Prototype]]: Promise
	[[PromiseState]]: "fulfilled"
	[[PromiseResult]]: "OK"
*/
```

- return 返回值是个 Promise 对象：

  Promise 对象的状态和结果等同于 return 返回的 Promise 对象

```js
async function func() {
  return new Promise((resolve, reject) => {
    resolve("OKK");
  });
}
console.log(func());
/*
Promise {<pending>}
	[[Prototype]]: Promise
	[[PromiseState]]: "fulfilled"
	[[PromiseResult]]: "OKK"
*/
async function func() {
  return new Promise((resolve, reject) => {
    reject("Errorrr");
  });
}
console.log(func());
/*
Promise {<pending>}
	[[Prototype]]: Promise
	[[PromiseState]]: "rejected"
	[[PromiseResult]]: "Errorrr"
*/
async function func() {
  return Promise.resolve({
    name: "Andy",
    age: 28,
  });
}
console.log(func());
/*
Promise {<pending>}
	[[Prototype]]: Promise
	[[PromiseState]]: "fulfilled"
	[[PromiseResult]]: { age: 28,name: "Andy"}
*/
```

<br/>

## await

**await 必须在使用 async 函数中使用**，

但 await 不是必须的，在 async 函数中可以没有 await

用于获取跟在其后的一个 Promise 对象异步处理成功时的结果

```js
async functoin 函数(){
  const result = await Promise对象
}

函数()
```

await 后通常是跟一个 Promise 对象

且一般情况下都是调用一个返回 Promise 对象的函数

```js
function 异步处理函数(){
  return Promise对象
}

async functoin 函数(){
  // 仅调用
  await 异步处理函数(){
  // 调用并获取返回值
  const result = await 异步处理函数()
}

函数()
```

---

<br/>

### 返回值

一般是通过返回值获取 Promise 对象异步处理成功时的结果

当然 await 也可以跟非 Promise 对象的数据

此时 await 的返回值其后面跟的数据：

- 若 await 关键字后是一个 Promise 对象：

  返回值获取 Promise 对象的成功状态的结果

```js
async functoin 函数(){
  const 异步任务结果返回值 = await Promise对象
}
```

- 若 await 关键字后也可是一个非 Promise 对象：

  返回值就是该数据

```js
async functoin 函数(){
  const 该数据 = await 数据
}
```

<br/>

## 获取错误

若 await 关键字后的 Promise 对象失败了，

需通过 `try...catch...` 捕获处理错误信息

```js
const p = new Promise((resolve, reject) => {
  reject("errorrrr");
});

const func = async () => {
  try {
    const res = await p;
    console.log(res);
  } catch (error) {
    console.log(error);
  } finally {
    console.log("结束");
  }
};

func();
```
