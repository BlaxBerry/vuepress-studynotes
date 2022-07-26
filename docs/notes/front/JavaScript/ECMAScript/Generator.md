# Generator 函数

![img](https://miro.medium.com/max/1024/1*JzWPazF1iLJL3L4BEhwx9g.jpeg)

[[toc]]

## 简介

Generator 函数是 ES6 新增的状态生成器函数

::: tip Generator 函数特点

- 定义时 function 关键字与函数名之间**有个 `\*`**
- **调用后不会立即执行函数体**
  而是返回一个 Generator 对象（ Iterator 遍历器对象）
- 调用 Generator 对象的 **`next()` 方法执行函数体**
  调用一次执行一次返回内部定义的下一个状态
- 调用 `next()` 方法执行函数体时**碰到 `yield` 就暂停执行**

:::

```js
function* Generator函数() {
  yield "a";
  yield "b";
  return "d END";
}

Generator函数(); // 创建 Generator对象
console.log(Generator函数()); // 返回该 Generator对象

console.log(generator.next()); // { value: 'a', done: false }
console.log(generator.next()); // { value: 'b', done: false }
console.log(generator.next()); // { value: undefined, done: true }
```

::: tip 一般函数对比 Generator 函数：

- 通过 function 关键字定义（或箭头函数形式）
- **一旦调用就会被执行，一直执行到 `return` 结束**
- 函数调用返回值就是函数内 `return` 的值
  若不指定返回值则默认为 `undefined`

:::

```js
function 普通函数1() {
  return "xxx";
}
console.log(普通函数1()); // 'xxx'
console.log(普通函数1()); // 'xxx'

function 普通函数2() {}
console.log(普通函数2()); // undefined
```

<br/>

## 定义

Generator 函数定义时 function 关键字与函数名之间有个 `*`

函数体使用 `yield` 表达式来定义内部不同的状态

---

### yield

`yield` 表达式仅能出现在 Generator 状态生成器函数中

```js
function* Generator函数名() {
  yield 状态1;
  yield 状态2;
  yield 状态3;
  // return 返回值;
}
```

`field` 表达式的返回值也可作为下一个 yield 表达式的值

但该返回值必须接收自[调用 next() 时传入的参数](https://blaxberry.github.io/vuepress-studynotes/notes/front/JavaScript/Async/Generator.html#next-参数)，否则默认为 `undefined`

```js
function* Generator函数名() {
  yield 状态1;
  const x = yield 状态2;
  yield x;
}
```

> 如下：

```js
function* xxx() {
  const a = yield 1;
  console.log(a);
  yield a;
}

const a = xxx();
a.next();
a.next(); // undefined

const b = xxx();
b.next();
b.next(2); // 2
```

---

### return

若 Generator 函数内没有 return 返回值：

所有 `yield` 状态都执行完后若再调用用 `next()`

**`{ value: undefined，done: true }`**

```js
{value: 状态1, done: false}
{value: 状态2, done: false}
{value: undefined, done: true}
...
```

若 Generator 函数内有 return 返回值：

所有 `yield` 状态都执行完后若再调用用 `next()`

**`{ value: return 返回值，done: true }`**

此后再用调用 `next()` 执行的结果为：

**`{ value: undefined，done: true }`**

```js
{value: 状态1, done: false}
{value: 状态2, done: false}
{value: return 返回值, done: true}
{value: undefined, done: true}
...
```

<br/>

## 执行

不同于一般函数，Generator 函数被调用后不会立即执行函数体，而是返回一个 Generator 生成器对象

通过调用生成器对象的 [next()](https://blaxberry.github.io/vuepress-studynotes/notes/front/JavaScript/Async/Generator.html#next) 方法来分阶段执行函数体

每次调用 `next()` Generator 函数内部的指针会从上一次停下的地方开始继续执行函数体，直到遇到下一个 `yield` 语句后停止执行

```js
function* Generator函数() {
  console.log(1);
  yield;
  console.log(2);
  yield;
  console.log(3);
  return;
}

const 生成器对象 = Generator函数();

console.log(生成器对象.next());
console.log(生成器对象.next());
console.log(生成器对象.next());
console.log(生成器对象.next());
```

---

### next()

`next()` 方法用于分阶段执行 Generato 函数，返回一个包含当前状态数据和执行状态的对象

```js
{ value: 当前状态数据, done: 是否执行结束}
```

每次调用 next() 的返回值：

- 若还有未执行的状态:
  执行状态为还未结束 `false`
  返回此当前阶段 `yield` 定义的状态
- 若所有状态都执行过了:
  执行状态为结束 `true`
  返回状态数据为 `undefined`

```js
function* Generator函数名() {
  yield "a";
  yield "b";
  yield "c";
}

const generator = Generator函数名();
console.log(generator.next()); // { value: 'a', done: false }
console.log(generator.next()); // { value: 'b', done: false }
console.log(generator.next()); // { value: 'c', done: false }
console.log(generator.next()); // { value: undefined, done: true }
console.log(generator.next()); // { value: undefined, done: true }
function* Generator函数名() {
  yield "a";
  yield "b";
  yield "c";
  return "d END";
}

const generator = Generator函数名();
console.log(generator.next()); // { value: 'a', done: false }
console.log(generator.next()); // { value: 'b', done: false }
console.log(generator.next()); // { value: 'c', done: false }
console.log(generator.next()); // { value: 'd END', done: true }
console.log(generator.next()); // { value: undefined, done: true }
console.log(generator.next()); // { value: undefined, done: true }
```

---

### next(参数)

调用 Generator 对象的 `next()` 方法时可以携带参数

传入的参数会替换覆盖上一个 **`yield` 表达式的返回值**

> 如下：

```js
function* xxx() {
  const a = yield 1;
  yield a;
}

const a = xxx();
console.log(a.next()); // { value: 1, done: false }
console.log(a.next()); // { value: undefined, done: false }

const b = xxx();
console.log(b.next()); // { value: 1, done: false }
console.log(b.next(8)); // { value: 8, done: false }
```

---

### 迭代器相互独立

调用 Generator 函数生成的 Generator 对象（迭代器）相互独立互不影响

> 如下：调用 `b.next()` 不会影响 `a.next()` 的返回值

```js
function* xxx() {
  let num = 1;
  yield (num += 1);
  yield (num += 1);
}

const a = xxx();
const b = xxx();

console.log(a.next()); // { value: 2, done: false }
console.log(a.next()); // { value: 3, done: false }
console.log(b.next()); // { value: 2, done: false }
console.log(a.next()); // { value: undefined, done: true }
```

<br/>

## 遍历

调用 Generator 生成器函数生成的对象可以被 ES6 的 `for...of` 遍历

函数体内 `return` 返回值不会被遍历

> 因为此时的执行已经结束了`{value: return值, done: true }`

---

### for...of...

```js
function* xxx() {
  yield 1;
  yield 2;
  yield 3;
  return 4;
}

for (let item of xxx()) {
  console.log(item);
}
// 1
// 2
// 3
```

---

### yield\*

在一个生成器函数中执行另一个生成器函数

```js
function* a() {
  yield 状态;
  yield 状态;

  yield* b();
  // 等同于
  // for (let item of b()) {
  //   yield item;
  // }
}

function* b() {
  yield 状态;
  yield 状态;
}
```

> 如下:

```js
function* a() {
  yield 1;
  yield 2;
  yield* b();
}

function* b() {
  yield "a";
  yield "b";
}

const _a = a();
console.log(_a.next()); // { value: 1, done: false }
console.log(_a.next()); // { value: 2, done: false }
console.log(_a.next()); // { value: 'a', done: false }
console.log(_a.next()); // { value: 'b', done: false }
console.log(_a.next()); // { value: undefined, done: true }
```

<br/>

## Generator 与 Promise

也可在生成器内部封装异步任务，作为除 [Promise](https://blaxberry.github.io/vuepress-studynotes/notes/front/JavaScript/Async/Promise.html) 外的另一种异步解决方案

```js
function* xxx() {
  const x = yield new Promise((resolve) => {
    setTimeout(resolve, 1000, "name");
  });

  const y = yield new Promise((resolve) => {
    setTimeout(resolve, 1000, "age");
  });
}

const obj = xxx();

obj.next().value.then((res) => {
  console.log(res); // 一秒后打印 name

  obj.next().value.then((res) => {
    console.log(res); // 一秒后打印 age
  });
});
```

<br/>

## 应用场景

最典型的就是 React 中的 [Redux-Saga](https://blaxberry.github.io/vuepress-studynotes/notes/front/React/States/Redux/React-Saga.html) 和阿里的 [Dva](https://blaxberry.github.io/vuepress-studynotes/notes/front/JavaScript/Async/Generator.html)
