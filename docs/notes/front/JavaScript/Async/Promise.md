# Promise

![img](https://miro.medium.com/max/1400/1*1Qg0RsRkXp0SdHLnVUwUDA.jpeg)

[[toc]]

## 简介

Promise 是 ES6 提出的处理异步编程的一种解决方案

以前 JavaScript 的异步处理都是使用回调函数，在多个回调函数嵌套调用时容易出现 **回调地狱**

Promise 将异步操作从以往的嵌套变为**线性链式调用**，解决了回调地狱

::: tip 回调函数嵌套地狱

代码结构不清晰、容易书写重复代码、且不方便异常的处理

```js
func1(opt1, (...agrs1) => {
  func2(opt2, (...args2) => {
    func3(opt3, (...agrs3) => {
      func4(opt4, (...args4) => {
        // 操作
      });
    });
  });
});
const fs = require("fs");

fs.readFile("./1.json", "utf-8", (err, data1) => {
  if (err) throw err;

  fs.readFile("./2.json", "utf-8", (err, data2) => {
    if (err) throw err;

    fs.readFile("./3.json", "utf-8", (err, data3) => {
      if (err) throw err;
      console.log(data1, data2, data3);
    });
  });
});
```

:::

<br/>

## Promise 工作流程

1. 构造函数创建 Promise 对象
2. 执行器函数内根据异步任务处理成功与否对应执行分别 `resolve()` 或 `reject()`，并将 Promise 实例的状态修改为对应成功或失败状态
3. 实例对象的 `then()`/ `catch()` 方法中获取对应结果并进行对应处理
4. 返回一个新的 Promise 对象

![img](https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg2020.cnblogs.com%2Fblog%2F1569466%2F202006%2F1569466-20200626141453221-1427511031.png&refer=http%3A%2F%2Fimg2020.cnblogs.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1650266164&t=4aff98da6e65e05e7f3302f6b5f33acd)

<br/>

## 基本使用

### 使用步骤

- **第一步**

通过 **`new Promise()`** 构造函数**实例化一个 Promise 对象**

构造函数将要处理的异步任务封装为一个 [executor 执行器函数](#executor-执行器函数) 当作参数接收

- **第二步**

**异步处理成功时调用 [resolve()](#resolve-与-reject)，异步处理失败就调用 [reject()](#resolve-与-reject)**

调用时将对应成功或失败的 [异步操作的结果作为参数传入](#传递异步结果)

- **第三步**

生成的 **Promise 实例对象调用 [then() 方法](#then)**

接收执行器函数中异步任务处理的结果，

并可对应成功与否进一步进行不同的处理操作

```js
const 实例对象 = new Promise((resolve, reject) => {
  if (判断异步是否成功) {
    resolve(value);
  } else {
    reject(reason);
  }
});

实例对象.then(
  (value) => {
    /* 异步成功时的操作，对应 resolve() */
  },
  (reason) => {
    /* 异步失败时的操作，对应 reject() */
  }
);
```

---

### 实例

> 点击按钮获取随机数，根据随机数大小打印不同消息

```js
const btn = document.querySelector(".btn");
function getRandomNumber(n, m) {
  return Math.ceil(Math.random() * (n - m + 1)) + m - 1;
}

btn.addEventListener("click", () => {
  const p = new Promise((resolve, reject) => {
    setTimeout(() => {
      let n = getRandomNumber(1, 10);
      if (n <= 3) {
        resolve(n);
      } else {
        reject(n);
      }
    }, 1000);
  });

  p.then(
    (value) => {
      console.log(value, "中奖了");
    },
    (reason) => {
      console.log(reason, "再接再厉");
    }
  );
});
```

> Promise 简易封装 Node.js fs 模块读取文件
>
> 建议使用 Node.js 有内置模块的 **`util.promisify()`** 方法

```js
const fs = require("fs");

function myReadFileFunc(path) {
  return new Promise((reslove, reject) => {
    fs.readFile(path, "utf8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        reslove(data);
      }
    });
  });
}

myReadFileFunc("./A.json").then(
  (result) => {
    console.log(result);
  },
  (result) => {
    console.log(result.message);
  }
);
```

> Promise 简易封装原生 Ajax 请求

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

btn.addEventListener("click", () => {
  requestData(url).then(
    (data) => {
      console.log(data);
    },
    (reason) => {
      console.log(reason);
    }
  );
});
```

<br/>

## Promise 实例对象属性

```js
Promise {<pending>}
[[Prototype]]: Promise
[[PromiseState]]: 状态
[[PromiseResult]]: 结果
```

---

### 状态 [PromiseState]

是指异步任务执行的状态

一个 Promise 对象同时只能存在一种状态

::: tip Promise 实例对象状态的三种情况：

- **pending**：进行中（默认初始状态）
- **fulfilled**：成功
- **rejected**：失败

:::

随着异步任务执行状态有且只会改变一次

状态变化仅会从 `pending` 变为成功的 `fulfilled` 或 失败的 `rejected`

::: tip 改变 Promise 实例对象状态的 3 种方法：

- 在构造函数的执行器函数中**调用 `resolve()`**

  Promise 对象的状态被改为成功的 `fulfilled`

```js
const p = new Promise((resolve, reject) => {
  resolve();
});
```

- 在构造函数的执行器函数中**调用 `reject()`**

  Promise 对象的状态被改为失败的 `rejected`

```js
const p = new Promise((resolve, reject) => {
  reject();
});
```

- 通过 **`throw` 语句抛出错误**

  Promise 对象的状态被改为失败的 `rejected`

```js
const p = new Promise((resolve, reject) => {
  throw { msg: "出错了" };
});
```

:::

异步任务执行状态有且只会改变一次

> 如下，第一次为成功了状态就直接成为成功，不会再改变

```js
const p = new Promise((resolve, reject) => {
  resolve("OKKK");
  reject("errorrrr");
});
```

> 如下，第一次为失败了状态就直接成为失败，不会再改变

```js
const p = new Promise((resolve, reject) => {
  reject("errorrrr");
  resolve("OKKK");
});
```

---

### 结果 [PromiseResult]

存放异步任务成功或失败的结果

Promise 无论成功失败都有一个结果数据，若不指定则默认 `undefined`

通过创建 Promise 实例对象时中的 `resolve()` 或 `reject()` 指定：

::: tip 传递结果

- **异步处理成功的数据**在调用 **`resolve()`** 时作为的参数传入
- **异步处理失败的数据**在调用 **`reject()`** 时作为的参数传入

成功或失败对应的结果值都可通过 Promise 实例对象的 [then()](#then) 方法获取

:::

<br/>

## executor 执行器函数

`new Promise()` 构造函数实例化 Promise 对象时，

构造函数必须接收一个 executor 执行器函数 做参数，

该 executor 执行器函数的函数体是 Promise 要处理的异步任务

---

### 立即同步执行

执行器函数在构造函数执行时 **立即同步调用** 执行

> 如下：证明了 executor 执行器函数是立即同步执行的

```js
const p = new Promise((resolve, reject) => {
  console.log(11111);
});
console.log(22222);

// 11111
// 22222
```

---

### resolve() 与 reject()

::: tip 执行器函数接受两个函数作参数：

- **resolve**：异步任务处理**成功时**调用
- **reject**：异步任务处理**失败时**调用

:::

```js
const 实例对象 = new Promise((resolve, reject)=>{
  // 判断异步是否成功并分别处理
  if(条件){
    resolve()
  }esle{
    reject()
  }
})
```

`resolve()` 与 `rejec()` 在被调用时会修改 [Promise 对象的状态](#状态-promisestate)

可在判断异步是否成功后并分别调用，也可不判断直接就调用

---

### 传递异步结果

此外，`resolve()` 和 `reject()` 在调用时，可接收对应处理的结果数据/信息作为其参数。

传入的结果在 Promise 实例调用 [then()](#then) 方法时在其对应的函数参数接收

```js
const 实例对象 = new Promise((resolve, reject)=>{
  if(条件){
    resolve(异步处理成功时的结果)
  }esle{
    reject(异步处理失败时的结果)
  }
})
```

<br/>

## then()

Promise 实例对象的方法，**`Promise.prototype.then()`**

接收执行器函数中异步任务处理的结果，并对应成功与否进一步进行不同的处理操作

---

### 参数

`then()` 方法接受两个回调函数做参数

作为参数的**回调函数仅在 Promise 对象[状态改变](#状态-promisestate)时才会被调用**

```js
Promise实例对象.then(onResolved, onRejected);
```

::: tip 两个函数参数：

- **第一个函数参数**：异步处理成功后的操作

  对应执行器的 `resolve()`

  该函数可接收 `resolve()` 调用时传入的值做参数

- **第二个函数参数(可选)**：异步处理失败后的操作

  对应执行器的 `reject()`

  该函数可接收 `reject()` 调用时传入的值做参数

  推荐用 Promise 实例的 [catch()](#catch) 方法替代

:::

```js
const 实例对象 = new Promise((resolve, reject) => {
  if (判断异步是否成功) {
    resolve(value);
  } else {
    reject(reason);
  }
});

实例对象.then(
  (value) => {
    /* 异步成功时的操作，对应 resolve() */
  },
  (reason) => {
    /* 异步失败时的操作，对应 reject() */
  }
);
```

---

### 返回值结果

**`then()` 有返回值，是个 Promise 对象**

返回值 Promise 对象的状态取决于异步任务处理的状态

返回值 Promise 对象的结果默认为 **`undefined`**

可通过 `return` 返回数据来指定返回的 Promise 对象的结果

> 如下：异步处理的结果为成功的场合

```js
const p = new Promise((resolve, reject) => {
  resolve("OK");
});
const result1 = p.then((value) => {});
console.log(result1);
/*
Promise {<pending>}
	[[Prototype]]: Promise
	[[PromiseState]]: "fulfilled"
	[[PromiseResult]]: undefined
*/

const result2 = p.then((value) => {
  return value;
});
console.log(result2);
/*
Promise {<pending>}
	[[Prototype]]: Promise
	[[PromiseState]]: "fulfilled"
	[[PromiseResult]]: "OK"
*/
```

> 如下：异步处理的结果为失败的场合

```js
const p = new Promise((resolve, reject) => {
  reject("error");
});
const result1 = p.catch((reason) => {});
console.log(result1);
/*
Promise {<pending>}
	[[Prototype]]: Promise
	[[PromiseState]]: "fulfilled"
	[[PromiseResult]]: undefined
*/

const result2 = p.catch((reason) => {
  return reason;
});
console.log(result2);
/*
Promise {<pending>}
	[[Prototype]]: Promise
	[[PromiseState]]: "fulfilled"
	[[PromiseResult]]: "error"
*/
```

---

### 返回值状态

返回值 Promise 对象的状态取决于 `return` 返回的数据：

- 若 `return` 返回的数据是 **非 Promise 对象**：

  返回值 Promise 对象的状态为成功的 `fulfilled`

  [详见上文](#返回值结果)

- 若没有 `return`，而是通过 **`throw`** 抛出一个错误：

  返回值 Promise 对象的状态为失败的 `rejected`

```js
const p = new Promise((resolve, reject) => {
  resolve();
});

const result1 = p.then((value) => {
  throw { msg: "出错了" };
});
result1.catch((reason) => console.log(result1));
/*
Promise {<rejected>: {…}}
	[[Prototype]]: Promise
	[[PromiseState]]: "rejected"
	[[PromiseResult]]: { msg: '出错了' }
*/
```

- 若 `return` 返回的数据是 **Promise 对象**：

  返回值 Promise 对象的状态等同于 `return` 的 Promise 对象的状态

```js
const p = new Promise((resolve, reject) => {
  resolve();
});

// return 一个成功的 Promise 对象
const result1 = p.then((value) => {
  return new Promise((resolve, reject) => {
    resolve("OK");
  });
});
console.log(result1);
/*
Promise {<pending>}
	[[Prototype]]: Promise
	[[PromiseState]]: "fulfilled"
	[[PromiseResult]]: "OK"
*/

// return 一个失败的 Promise 对象
const result2 = p.then((value) => {
  return new Promise((resolve, reject) => {
    reject("error");
  });
});
result2.catch((reason) => console.log(result2));
/*
Promise {<rejected>: 'error'}
	[[Prototype]]: Promise
	[[PromiseState]]: "rejected"
	[[PromiseResult]]: "error"
*/
```

---

### then() 的链式调用

因为 `then()` 方法有返回值且是个 Promise 对象，所以可以多个串联

若不 `then()` 方法没有通过 return 指定返回值 Promise 对象的结果的话，

后面的 `then()` 中的 value 会是 `undefined`

```js
const p = new Promise((resolve, reject) => {
  resolve("OK");
});

p.then((value) => {
  console.log("第一次回调", value);
  return value;
})
  .then((value) => {
    console.log("第二次回调", value);
    return value;
  })
  .then((value) => {
    console.log("第三次回调", value);
  });

/*
第一次回调 OK
第二次回调 OK
第三次回调 OK
*/
```

> 如下：
>
> Node.js fs 模块依次读取文件并合并读取的数据

```js
const fs = require("fs");
const asyncReadFile = (path) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, "utf-8", (err, data) => {
      if (err) {
        reject(err.message);
      } else {
        resolve(data);
      }
    });
  });
};
let arr = [];

asyncReadFile("./1.json")
  .then((value) => {
    arr.push(JSON.parse(value));
    return asyncReadFile("./2.json");
  })
  .then((value) => {
    arr.push(JSON.parse(value));
    return asyncReadFile("./3.json");
  })
  .then((value) => {
    arr.push(JSON.parse(value));
  })
  .catch((error) => {
    console.error(error);
  })
  .finally(() => {
    console.log(arr);
    console.log("异步任务结束");
  });
/*
[ { name: 'Andy' }, { name: 'Tom' }, { name: 'Jack' } ]
"异步任务结束"
*/
```

<br/>

## catch()

Promise 实例对象的方法，**`Promise.prototype.catch()`**

用于获取**异步处理失败**的结果并指定对应的操作

可以替代 `then()` 方法的第二个回调函数参数

---

### 参数

```js
Promise实例对象.catch(onRejected);
```

`catch()` 方法接收一个回调函数做参数，

对应执行器函数中 `reject()` 调用的结果

该回调函数可接收执行器中调用时`reject()` 传入的结果值做参数

```js
const 实例对象 = new Promise((resolve, reject) => {
  if (判断条件) {
    resolve(value);
  } else {
    reject(reason);
  }
});

实例对象
  .then((value) => {
    /* 异步成功时的操作，对应 resolve() */
  })
  .catch((reason) => {
    /* 异步失败时的操作，对应 reject() */
  });
```

> 如下：Node.js 的 `util.promisify()`

```js
const util = require("util");
const fs = require("fs");
const asyncReadFile = util.promisify(fs.readFile);

asyncReadFile("./A.json", "utf-8")
  .then((value) => {
    console.log(value);
  })
  .catch((error) => {
    console.error(error);
  });
```

---

### 异常穿透

只需要在链式调用的最后调用 `catch()` 方法就可获取所有异步任务执行过程的异常错误

实例化 Promise 对象的异步处理的错误时， `catch()` 可直接获取该失败结果

```js
const p = new Promise((resolve, reject) => {
  reject("is error");
});

p.then((value) => {
  console.log(111);
})
  .then((value) => {
    console.log(222);
  })
  .then((value) => {
    console.log(333);
  })
  .catch((err) => console.log(err));
// is error
```

若中间连用的的 `then()` 中现错误，

比如通过 **`throw`** 抛出错误时也可被 `catch()` 方法获取

```js
const p = new Promise((resolve, reject) => {
  resolve();
});

p.then((value) => {
  console.log(111);
})
  .then((value) => {
    console.log(222);
    throw { msg: "出错了" };
  })
  .then((value) => {
    console.log(333);
  })
  .then((value) => {
    console.log(444);
  })
  .catch((err) => console.log(err));
/*
111
222
{msg: '出错了'}
*/
```

<br/>

## Promise.all()

Promise 函数对象的方法

可用于简化繁琐的 [then() 的链式调用](#then-的链式调用)

接收一个参数，参数为多个 Promise 对象组成的数组

```js
const promise对象 = Promise.all([promise对象, promise对象]);
```

---

### 返回值

返回值 Promise 对象的状态和结果由参数数组决定：

- 若参数数组中所有 Promise 对象的都为**成功状态**：

  返回值 Promise 对象的状态为成功 `fulfilled`，

  结果是数组中所有 Promise 对象**成功结果组成的数组**

```js
const p1 = new Promise((resolve, reject) => {
  resolve("p1 is OK");
});
const p2 = new Promise((resolve, reject) => {
  resolve("p2 is OK");
});
const p3 = new Promise((resolve, reject) => {
  resolve("p3 is OK");
});

const result = Promise.all([p1, p2, p3]);
console.log(result);
/*
Promise {<pending>}
	[[Prototype]]: Promise
	[[PromiseState]]: "fulfilled"
	[[PromiseResult]]: Array(3)
			0: "p1 is OK"
			1: "p2 is OK"
			2: "p3 is OK"
*/

result.then((value) => console.log(value));
// ['p1 is OK', 'p2 is OK', 'p3 is OK']
```

- 若参数数组中 Promise 对象的状态有一个为失败：

  返回值 Promise 对象的状态为失败 `rejected`，

  结果是数组中第一个状态为**失败的 Promise 对象的结果**

```js
const p1 = new Promise((resolve, reject) => {
  resolve("p1 is OK");
});
const p2 = new Promise((resolve, reject) => {
  reject("p2 is error");
});
const p3 = new Promise((resolve, reject) => {
  reject("p3 is error");
});

const result = Promise.all([p1, p2, p3]);
result.catch((reason) => console.log(result));
/*
Promise {<rejected>: 'p2 is error'}
	[[Prototype]]: Promise
	[[PromiseState]]: "rejected"
	[[PromiseResult]]: "p2 is error"
*/

result.catch((reason) => console.log(reason));
// "p2 is error"
```

---

### 简化多个 then()

可用于简化繁琐的 `then()` 的链式调用，具体需求视情况而定

如 [上述例子](#then-的链式调用)中的依次读取文件并合并读取数据

> 如下：

```js
const fs = require("fs");
const asyncReadFile = (path) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, "utf-8", (err, data) => {
      if (err) {
        reject(err.message);
      } else {
        resolve(data);
      }
    });
  });
};

const f1 = asyncReadFile("./1.json");
const f2 = asyncReadFile("./2.json");
const f3 = asyncReadFile("./3.json");

let arr = [];

Promise.all([f1, f2, f3])
  .then((value) => {
    value.forEach((item) => {
      arr.push(JSON.parse(item));
    });
  })
  .finally(() => {
    console.log(arr);
    console.log("异步任务结束");
  });
/*
[ { name: 'Andy' }, { name: 'Tom' }, { name: 'Jack' } ]
"异步任务结束"
*/
```

<br/>

## Promise.race()

Promise 函数对象的方法

用法与 `Promise.all()` 方法基本一致

接收的参数为多个 Promise 对象组成的数组，返回值是个 Promise 对象

```js
const promise对象 = Promise.race([promise对象, promise对象]);
```

但是与 `Promise.all()` 的不同在于：

若参数数组中所有 Promise 对象的状态都为成功时，

返回值 Promise 对象的结果由参数数组中第一个成功完成异步任务，即状态为成功的 Promise 对象决定

```js
const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("p2 is OK");
  }, 1000);
});
const p2 = new Promise((resolve, reject) => {
  resolve("p2 is OK");
});
const p3 = new Promise((resolve, reject) => {
  resolve("p3 is OK");
});

const result = Promise.race([p1, p2, p3]);
console.log(result);
/*
Promise {<pending>}
	[[Prototype]]: Promise
	[[PromiseState]]: "fulfilled"
	[[PromiseResult]]: "p2 is OK"
*/

result.then((value) => console.log(value));
// "p2 is OK"
```

<br/>

## Promise.resolve()

Promise 函数对象的方法，

**用于快速得到一个成功的 Promise 对象**

接收一个参数，返回一个结果值等同于传入参数的 Promise 对象

```js
const Promise对象 = Promise.resolve(参数);
```

- 若参数为**非 Promise 对象**：

  返回的是状态为 `fulfilled` ，结果为传入参数的 Promise 对象

```js
const p1 = Promise.resolve({
  name: "Andy",
  age: 28,
});
console.log(p1);

/*
Promise {<fulfilled>: {...}}
[[Prototype]]: Promise
[[PromiseState]]: "fulfilled"
[[PromiseResult]]: { name: 'Andy',age: 28}
*/
```

- 但若参数为 **Promise 对象**：

  返回的 Promise 对象的结果与状态等同于作为参数传入的 Promise 对象的结果与状态

  若作为参数传入的 Promise 对象的状态是失败的，则 `resolve()`返回的 Promise 对象的状态也为失败的 `rejected`

```js
const p1 = Promise.resolve(
  new Promise((resolve, reject) => {
    resolve("OK");
  })
);
console.log(p1);
/*
Promise {<fulfilled>: 'OK'}
	[[Prototype]]: Promise
	[[PromiseState]]: "fulfilled"
	[[PromiseResult]]: "OK"
*/

const p2 = Promise.resolve(
  new Promise((resolve, reject) => {
    reject("error");
  })
);
p2.catch((reason) => {
  console.log(p2);
});
/*
Promise {<rejected>: 'error'}
	[[Prototype]]: Promise
	[[PromiseState]]: "rejected"
	[[PromiseResult]]: "error"
*/
```

<br/>

## Promise.reject()

Promise 函数对象的方法，

**用于快速得到一个失败的 Promise 对象**

接收一个参数，返回一个结果值等同于传入参数的 Promise 对象

```js
const Promise对象 = Promise.reject(参数);
```

且无论传入的参数是什么，`reject()` 返回的都是一个状态为失败的 Promise 对象，即 `rejected`

```js
const p1 = Promise.reject(999);
p1.catch((reason) => console.log(p1));
/*
Promise {<rejected>: 999}
[[Prototype]]: Promise
[[PromiseState]]: "rejected"
[[PromiseResult]]: 999
*/

const p2 = Promise.reject(
  new Promise((resolve, reject) => {
    resolve("OK");
  })
);
p2.catch((reason) => console.log(p2));
/*
Promise {<rejected>: Promise}
	[[Prototype]]: Promise
	[[PromiseState]]: "rejected"
	[[PromiseResult]]: Promise
		[[Prototype]]: Promise
		[[PromiseState]]: "fulfilled"
		[[PromiseResult]]: "OK"
*/
```

<br/>

## 链式调用

### Promise 链

详见上文 [then() 的链式调用](#then-的链式调用)

```js
Promise对象.then((value) => {
  /**/
})
  .then((value) => {
    /**/
  })
  .then((value) => {
    /**/
  })
  .catch((reason) => {
    /**/
  })
  .finally(() => {
    /**/
  });
```

---

### 中断 Promise 链

只能通过返回一个**状态为 pending 的 Promise 对象** 才能中断链式调用

因为作为 `then()` 的参数的回调函数仅在 Promise 对象状态改变时才会被调用，当 `then()` 返回的是个默认没改变状态的 Promise 对象时，参数回调函数也就不会被调用了，即实现了 Promise 链的中断

```js
const p = new Promise((resolve, reject) => {
  resolve();
});

p.then((value) => {
  console.log(111);
})
  .then((value) => {
    console.log(222);
    return new Promise(() => {});
  })
  .then((value) => {
    console.log(333);
  })
  .then((value) => {
    console.log(444);
  })
  .catch((err) => console.log(err));

/*
111
222
*/
```
