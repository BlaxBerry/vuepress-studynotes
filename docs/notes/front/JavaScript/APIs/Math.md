# Math 常用方法

![img](https://media.vlpt.us/images/newsilver1028/post/09309171-3e36-4875-8f3d-37259650d033/javascript-img.png)

[[toc]]

## Math.max()

获取一组数值中的最大值

```js
const 最大值 = Math.max(数值, 数值, 数值);
```

```jsx
const arr = [1, 2, 3, 4];

const max = Math.max(...arr);
console.log(max); // 4
```

---

## Math.min()

获取一组数值中的最小值

```js
const 最小值 = Math.min(数值, 数值, 数值);
```

```js
const arr = [1, 2, 3, 4];

const min = Math.min(...arr);
console.log(min); // 1
```

---

## Math.ceil()

对数进行向上取整

函数返回的是**大于等于**参数且与之最接近的整数，若参数为负数则相反

> 注意参数在 `-1` ～ `0` 之间时返回值为 `-0`

```js
const num = Math.ceil(数值);
```

```js
console.log(Math.ceil(1.1)); // 2
console.log(Math.ceil(1.6)); // 2
console.log(Math.ceil(1.5)); // 2
console.log(Math.ceil(0.5)); // 1

console.log(Math.ceil(-1.1)); // -1
console.log(Math.ceil(-1.6)); // -1
console.log(Math.ceil(-1.5)); // -1
console.log(Math.ceil(-0.5)); // -0
```

---

## Math.floor()

对数进行向下取整

函数返回的是**小于等于**参数且与之最接近的整数，若参数为负数则相反

```js
const num = Math.floor(数值);
```

```js
console.log(Math.floor(1.1)); // 1
console.log(Math.floor(1.6)); // 1
console.log(Math.floor(1.5)); // 1
console.log(Math.floor(0.5)); // 0

console.log(Math.floor(-1.1)); // -2
console.log(Math.floor(-1.6)); // -2
console.log(Math.floor(-1.5)); // -2
console.log(Math.floor(-0.5)); // -1
```

---

## Math.round()

返回值是四舍五入后后的参数

若参数为负数则相反

> 注意参数在 `-1` ～ `0` 之间时返回值为 `-0`

```js
const num = Math.round(数值);
```

```js
console.log(Math.round(1.1)); // 1
console.log(Math.round(1.6)); // 2
console.log(Math.round(1.5)); // 2
console.log(Math.round(0.5)); // 1

console.log(Math.round(-1.1)); // -1
console.log(Math.round(-1.6)); // -2
console.log(Math.round(-1.5)); // -1
console.log(Math.round(-0.5)); // -0
```

---

## Math.random()

返回一个介于 0（包含） ~ 1（不包含） 之间的随机数

```js
const num = Math.random();

// 0.001362678665124406
// 0.43361720322083586
// ...
```

::: tip 获取 0 ～指定数字 之间的的随机整数：

```js
// 不包含结束数字
function getRandomInteger(max) {
  return parseInt(Math.random() * max);
}

// 包含结束数字
function getRandomInteger(max) {
  return parseInt(Math.random() * max + 1);
}
```

:::

::: tip 返回 定数字～指定数字 之间的随机整数：

```js
// min（包含）～ max（不包含）
function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// min（包含）～ max（包含）
function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
```

:::

::: tip 随机生成字符串：

> 原理是随机生成的 `0.123312`、`0.982931`之类的数在调用 `toString(36)` 方法后会被转换成 36 进制的包含了字母 `a~z` 和 数字`0~9` 的随机数
>
> 很多开源库都使用此方式为 DOM 元素创建随机 ID

```js
console.log(Math.random().toString(36));
// 0.mhr5uuvaqxg
// 0.xeybp8ogtsg

console.log(
  Math.random()
    .toString(36)
    .slice(2, 10)
);
// sab0enrv
// o1sy86tj
```

:::
