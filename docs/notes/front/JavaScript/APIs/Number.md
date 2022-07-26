# Number 常用方法

![img](https://media.vlpt.us/images/newsilver1028/post/09309171-3e36-4875-8f3d-37259650d033/javascript-img.png)

[[toc]]

## 特殊类型

### NaN

不是一个数字（not a number）

但是属于数字 Number 类型

```js
console.log(typeof NaN); // number
```

NaN 不等于任何数据，包括不等于其本身

所以不能通过 `==` 和 `===` 来比较判断

```js
console.log(NaN === NaN); // false
console.log(NaN == NaN); // false

console.log(NaN !== NaN); // true
```

当算术运算返回一个未定义的或无法表示的值时会得到 `NaN`

不能强制转换为数值的非数值被转换为数值的时候也会得到 `NaN`

注意 0 除以 0 的结果是 `NaN`

```js
console.log(0 / 0); // NaN
```

---

### Infinity -Infinity

- `Infinity`：表示一个无穷大的数值，大于任何数
- `-Infinity`：表示一个无穷小的数值，小于任何数

详见 [MDN(opens new window)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Infinity)

---

### 0、 -0、+0

三者基本上相同

仅需注意 `-0` 做分母被其他数除的时候会返回 **无穷小** 小于任何数

```js
console.log(0 == -0); // true
console.log(0 === -0); // true
console.log(-0 === +0); // true
console.log(1 / 0); // Infinity
console.log(9 / 0); // Infinity

console.log(1 / -0); // -Infinity
console.log(9 / 0); // -Infinity

console.log(0 / 9); // 0
console.log(-0 / 9); // -0
```

<br/>

## 判断

### Number.isNaN()

判断参数是否为 `NaN`

```js
const boolean = isNaN(数值);
console.log(isNaN(NaN)); // true

console.log(isNaN(999)); // false
console.log(isNaN(0)); // false
console.log(isNaN("123")); // false
console.log(isNaN("")); // false
```

**`Number.NaN()` 是全局 `isNaN()` 的稳妥版本**

`isNaN()` 在判断时会先将参数转为数值，然后在判断是否为 `NaN`，

所以假如参数为无法被转换为正确数字的数据时会先被转为 `NaN`，

此时 `isNaN()` 结果会为 `true`，这就不对了

```js
console.log(isNaN(undefined)); // true
console.log(isNaN("abc")); // true
console.log(isNaN({})); // true

console.log(Number.isNaN(undefined)); // false
console.log(Number.isNaN("abc")); // false
console.log(Number.isNaN({})); // false
```

---

### Number.isInteger()

判断参数是否为整数

```js
const boolean = isInteger()(数值);
```

详见 [MDN(opens new window)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger)

<br/>

## 格式化

### toFixed()

将指定数值四舍五入后保留小数点后参数的个数

若无参数或参数为 0 则不保留小数点仅四舍五入

```js
const num = 数值.toFixed(小数点后保留位数);
const a = 3.1415;
console.log(a.toFixed()); // 3
console.log(a.toFixed(1)); // 3.1
console.log(a.toFixed(2)); // 3.14

const b = 2.999;
console.log(b.toFixed()); // 3
console.log(b.toFixed(1)); // 3.0
console.log(b.toFixed(2)); // 3.00
```

<br/>

## 转换

### parseInt()

获取整数

参数可为数字或数字字符串，否则返回值为 `NaN`

```js
const num = parseInt(数值);
```

数值转化

获取小数点前的整数

```js
console.log(parseInt(1.0)); // 1
console.log(parseInt(1.9)); // 1
console.log(parseInt(-1.0)); // -1
console.log(parseInt(-1.9)); // -1
```

字符串转化

- 若字符串以数字开头，则仅返回数字部分
- 若字符串以非数字开头，则返回 `NaN`
- 若空字符串则返回 `NaN`

```js
console.log(parseInt("123")); // 123
console.log(parseInt("123abcd")); // 123
console.log(parseInt("123.456abcd")); // 123
console.log(parseInt("abc123")); // NaN
console.log(parseInt("")); // NaN
```

---

### parseFloat()

获取浮点数

参数可为数字或数字字符串，否则返回值为 `NaN`

```js
const num = parseFloat(数值);
```

数值转化

```js
console.log(parseFloat(1.0)); // 1
console.log(parseFloat(1.9)); // 1.9
console.log(parseFloat(-1.0)); // -1
console.log(parseFloat(-1.9)); // -1.9
```

字符串转化

- 若字符串以数字开头，则仅返回数字部分
- 若字符串以非数字开头，则返回 `NaN`
- 若空字符串则返回 `NaN`

```js
console.log(parseFloat("123")); // 123
console.log(parseFloat("123abcd")); // 123
console.log(parseFloat("123.456abcd")); // 123.456
console.log(parseFloat("abc123")); // NaN
console.log(parseFloat("")); // NaN
```

---

### Number()

将参数转换为数值

```js
const num = Number(参数);
console.log(Number(true)); // 1
console.log(Number(false)); // 0
console.log(Number(undefined)); // NaN

console.log(Number("123")); // 123
console.log(Number("123abc")); // NaN
console.log(Number("abc123")); // NaN
```
