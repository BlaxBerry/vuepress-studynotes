# JavaScript 函数

![img](https://media.vlpt.us/images/newsilver1028/post/09309171-3e36-4875-8f3d-37259650d033/javascript-img.png)

[[toc]]

## 声明与调用

### 具名函数

即一般函数

**存在函数声明提升**，即函数调用可在函数声明前

```js
函数名();

function 函数名() {}

函数名();
```

> 如下：

```js
func();
// hello

function func() {
  console.log("hello");
  return 999;
}

func();
// hello

console.log(func());
// hello
// 999
```

---

### 匿名函数

即函数表达式

同具名函数（一般函数）基本类似

**不存在函数声明提升**，即匿名函数的调用必须在声明之后

```js
const 变量名 = function() {
  /* 处理逻辑 */
  /* return 返回值 */
};

变量名();
```

```js
const func = function() {
  console.log("hello");
  return 999;
};

console.log(func());
```

---

### 立即执行函数

如其名不需调用直接就被执行

> 就是直接调用了个匿函数的感觉

```js
(function() {
  console.log("hello");
})();
```

```js
(() => {
  console.log("hello");
})();
```

---

### :x:回调函数

```js
```

回调函数嵌套层数过多会成为 **回调地狱**

详见 [Promise](../Async/Promise.md)

---

### 构造函数

面向对象编程

详见 [构造函数 与 原型]()

---

### 箭头函数

ES6 新增函数的简写方式

**不存在函数声明提升**，即箭头函数的调用必须在声明之后

```js
const 函数名 = (参数) => {
  /* 处理逻辑 */
  /* return 返回值 */
};

函数名(参数);
```

函数体只有一条时可简写：

```js
const 函数名 = () => 处理逻辑;
```

函数只有 `return` 返回值时可简写：

```js
const 函数名 = () => 返回值;
```

<br/>

## 返回值

函数返回值不是必须，若不指定默认为 `undefined`

若函数需要对外返回处理的结果时，需要通过 `return`

```js
function 函数名() {
  /* 处理逻辑 */
  /* return 返回值 */
}
const 返回值 = 函数名();
```

```js
function func() {
  console.log("hello");
}
console.log(func());
// hello
// undefined
```

::: tip return 返回什么函数的返回值就是什么

```js
function a() {
  return null;
}
console.log(a());
// null

function b() {
  return 999;
}
console.log(b());
// 999
```

:::

::: tip return 后面的代码不会被处理

```js
function func() {
  return "finished";
  console.log(999);
}
console.log(func());
// 'finished'
```

:::

<br/>

## 参数

参数在调用函数时传入，使函数可以接收处理不同数据

### 基本使用

函数接收的参数值默认值为 `undefined`，调用时传入的是什么函数内部就接收到什么

::: tip 参数具体分为形参、实参：

**实参**：指调用函数时传入的不同数据<br/>**形参**：指函数接收到的传入的不同数据

```js
function 函数名(参数) {
  /* 处理逻辑 */
}

// 调用函数
动词函数名(参数A);
动词函数名(参数B);
```

:::

```js
function func(params) {
  console.log(params);
}

func(999); // 999
func([1, 2, 3]); // [1,2,3]
func(null); // null

func(); // undefined
```

---

### 多个参数

多个参数用逗号隔开

函数调用时传入的数据对应函数定义时接收的形参的先后顺序

若函数调用时形参对应位置没有数据传入，则函数内部该参数默认接收了一个 `undefined`

```js
function func(a, b) {
  console.log(a, b);
}

func(1, 2);
// 1 2
func(1);
// 1 undefined
func();
// undefined undefined
```

---

### 参数初始值

函数接收的参数值默认值为 `undefined`，函数调用时传入的是什么函数内部就接收到什么

但可以在函数定义时直接指定形参的初始值

```js
function 函数名(参数=初始值，参数=初始值){
  /* 处理逻辑 */
}
```

若函数调用时形参对应位置没有数据传入，则函数内部优先使用初始值，若有数据传入则使用传入的数据

```js
function func(a = 3, b = 4) {
  console.log(a, b);
}

func(1);
// 1 4
func(1, 2);
// 1 2
func();
// 3 4
```

---

### arguments

`arguments` 对象是个 **伪数组**，包含了传给函数的所有实参

```js
function 函数(参数) {
  console.log(arguments);
}
```

```js
function func(a, b = 999) {
  console.log(arguments);
}

func(1);
// [Arguments] { '0': 1 }
func(1, 2);
// [Arguments] { '0': 1, '1': 2 }
func();
// [Arguments] {}
func(1, 2, 3, 4, 5);
// [Arguments] { '0': 1, '1': 2, '2': 3, '3': 4, '4': 5 }
```

`arguments` 对象是个**伪数组**，不能直接使用 Array 的方法，否则报错

```js
function xxx() {
  console.log(arguments instanceof Array);
}
xxx(); // false
```

```js
function func(a, b, c) {
  for (let i = 0; i < arguments.length; i++) {
    console.log(arguments[i]);
  }
}
func(1, 2, 3);
// 1
// 2
// 3
```

---

### 剩余参数

剩余参数是个数组，如其名包含所有没有对应形参的实参

因为函数定义时多个参数用逗号隔开，所以可利用 ES6 的扩展运算符定义在形参处

可灵活运用，当没有指定形参时即获取所有传入的实参

```js
function 函数(指定形参, 指定形参, ...剩余参数) {
  console.log(剩余参数);
}

function 函数(...剩余参数) {
  console.log(剩余参数);
}
```

以数组形式接收所有的传入参数，若没有传入的参数则返回空数组

```js
function func(...rest) {
  console.log(rest);
}

func(1); // [ 1 ]
func(1, 2); // [ 1,2 ]
func(); // []
```

若要声明指定形参时，剩余参数必须放到最后

```js
function func(a, b = 999, ...rest) {
  console.log(a, b, rest);
}

func(1);
// 1 999 []
func(1, 2);
// 1 2 []
func();
// undefined 999 []
func(1, 2, 3, 4, 5);
// 1 2 [ 3, 4, 5 ]
```

<br/>

## 参数的修改

函数内部对参数直接赋值和修改时是否会影响外部调用时传入的实参，取决于传入的参数的类型

详见[堆栈与数据引用]()

---

### 不可变类型数据

参数为不可变的基本类型数据时

函数内部通过赋值语句修改数据时，外部实参不会被影响

```js
function func(params) {
  params = 456;
  console.log(params); // 456
}

const num = 123;
func(num);

console.log(num); // 123
```

---

### 可变类型数据

参数为复杂类型数据时

函数内部通过对象实例方法修改数据内容时，外部实参也会被影响

```js
function func(params) {
  params.push(1);
  console.log(params); // [ 1, 2, 3, 1 ]
}

const arr = [1, 2, 3];
func(arr);

console.log(arr); // [ 1, 2, 3, 1 ]
```

<br/>

## this 指向

函数的 `this` 一般是谁调用就指向谁，默认指向最外层的全局对象

::: tip 最外层全局对象：

浏览器环境： **`Window` 对象**<br/>Node.js 环境： **`Local` 对象**

:::

> 浏览器环境下的 `this` 指向例子：

```js
function a() {
  console.log(this);
}
a(); // Window

const b = function() {
  console.log(this);
};
b(); // Window

(() => {
  console.log(this);
})();
// Window

setTimeout(() => {
  console.log(this);
}, 1000);
// Window
```

::: tip 也可修改函数调用时的 this 指向：

- **apply()**:
- **call()**:
- **bind()**：

:::

---

### ❌call()

会调用执行函数

```js
函数名.call();
```

---

### ❌bind()

---

### ❌apply()

<br/>

## ❌ 闭包

<br/>

## 递归

递归是指一个函数在其内部自己调用自己

因为是自己调用自己，递归只是针对不同的参数进行不同处理

**必须设置有一个结束条件**，以防止调用出现死循环导致栈溢出

> 循环打印

```js
function func(params) {
  if (params > 5) return;

  console.log(params);

  func(params + 1);
}

func(1);
// 1
// 2
// 3
// 4
// 5
```

---

### 实例 - 累加

> 如下：1 + 2 + .... + num 的累加

```js
function func(num) {
  if (num === 1) return 1;

  let next = func(num - 1);

  return num + next;
}

const result = func(100); // 5050
console.log(result);
```

> 升级版指定起始结束值

```js
function getSum(min, max) {
  function func(num) {
    if (num === min) return min;
    let next = func(num - 1);
    return num + next;
  }
  return func(max);
}

const result = getSum(1, 100); // 5050
console.log(result);
```

---

### 实例 - 斐波那契数列

:: tip 斐波那契数列特点：

1, 1, 2, 3, 5, 8, 13, 21, ... a, b, c, d, e, .....

a + b = c b + c = d d + e = f ....

::

> 打印指定位置的数字

```js
function getFibo(index) {
  if (index === 1 || index === 2) return 1;

  return getFibo(index - 2) + getFibo(index - 1);
}

console.log(getFibo(1)); // 1
console.log(getFibo(2)); // 1
console.log(getFibo(3)); // 2
console.log(getFibo(4)); // 3
console.log(getFibo(5)); // 5
```

> 以数组形式打印

```js
function getFibo(index) {
  if (index === 1 || index === 2) return 1;
  return getFibo(index - 2) + getFibo(index - 1);
}

function showList(endIndex) {
  let list = [];
  for (let i = 1; i <= endIndex; i++) {
    list.push(getFibo(i));
  }
  return list;
}

console.log(showList(8));
// [ 1, 1,  2,  3, 5, 8, 13, 21 ]
```
