# String 常用方法

![img](https://media.vlpt.us/images/newsilver1028/post/09309171-3e36-4875-8f3d-37259650d033/javascript-img.png)

[[toc]]

## 拼接

### concat()

拼接，被拼接的字符不改变

```js
const 新字符串 = 字符串.concat(字符串, 字符串);
```

> 如下：

```js
const a = "Hello,";
const b = "Word,";
const c = "hahaha";

const final = a.concat(b, c);
console.log(final); // Hello,Word,hahaha
```

<br/>

## 截取

### slice()

参数可为负数，负数时为倒着算的位置

第二个参数可省略，省略默认取到结尾

截取范围不包括结束序号

```js
新字符串 = 字符串.slice(开始序号, 结束序号);
```

> 如下：

```js
const str = "你好我是你爸";

console.log(str.slice(0)); // 你好我是你爸
console.log(str.slice(1)); // 好我是你爸
console.log(str.slice(-1)); // 好我是你爸
console.log(str.slice(-3)); // 是你爸

console.log(str.slice(1, 2)); // 好
console.log(str.slice(-3, -1)); // 是你
```

---

### substring()

参数是非负整数

第二个参数可省略，省略默认取到结尾

截取范围不包括结束序号

```js
const 新字符串 = 字符串.substring(开始序号, 结束序号);
```

> 如下：

```js
const str = "你好我是你爸";

console.log(str.substring(1, 3)); // 好我
console.log(str.substring(1)); // 好我是你爸
console.log(str.substring(0)); // 你好我是你爸
```

---

### substr()

> 已被弃用

```js
新字符串 = 字符串.substr(开始序号, 长度);
```

> 如下：

```js
const str = "你好，张三";

console.log(str.substr(0, 1)); // "你"
console.log(str.substr(-1, 1)); // "三"
```

<br/>

## 替换

### replace()

替换字符

常与 [正则表达式](https://blaxberry.github.io/vuepress-studynotes/notes/front/JavaScript/APIs/String.html) 搭配替换字符串

```js
新字符串 = 字符串.replace(/正则表达式/, 替换字符);
```

> 如下：

```js
const str = "傻逼打野，你个大傻逼";

const strHandled = str.replace(/傻逼/g, "**");
console.log(strHandled); // **打野，你个大**
```

<br/>

## 重复

### repeat()

将字符串重复指定次数

```js
const 新字符 = 字符.repeat(次数);
```

> 如下：

```js
const str = "哈";

const final = str.repeat(3);
console.log(final); // "哈哈哈"
```

<br/>

## 格式化

### trimEnd()

去掉字符串头部的空格

---

### trimeStart()

去掉字符串尾部的空格

---

### trim()

去掉字符串的首尾空格

`trimEnd()` 和 `trimeStart()` 的复合使用

```js
const 新字符串 = 字符串.trim();
```

> 如下：

```js
const str = " 你好 ";

const strWithoutBlank = str.trim();

console.log(str);
console.log(strWithoutBlank);
```

<br/>

## 大小写

### toUpperCase()

将字符全改为大写

```js
const 新字符串 = 字符串.toUpperCase();
```

> 如下：

```js
const str = "abcdefg";

const final = str.toUpperCase();
console.log(final); // ABCDEFG
```

---

### toLowerCase()

将字符全改为小写

```js
const 新字符串 = 字符串.toLowerCase();
```

> 如下：

```js
const str = "ABCDEFG";

const final = str.toLowerCase();
console.log(final); // abcdefg
```

---

### toLocaleUpperCase()

转大写，针对少数国家民族语言，普适性强

---

### toLocaleLowerCase()

转小写，针对少数国家民族语言，普适性强

<br/>

## 查询

### includes()

判断字符串是否包含指定的字符

返回 `true` 或 `false`

> 比旧的 `indexOf`更直观

```js
字符串.includes("字符");
```

> 如下：

```js
const str = "你好我好";

if (str.includes("好")) {
  console.log("包含");
} else {
  console.log("不包含");
}
```

---

### startsWith()

开头是否含有指定字符

```js
const str = "前端技术JavaScript";

console.log(str.startsWith("前端")); // true
```

---

### endsWith()

结尾是否包含有指定字符

```js
const str = "前端技术JavaScript";

console.log(str.endsWith("JavaScript")); // true
```

---

### indexOf()

> 旧的 API

查询某字符是在字符串中的第几个字符

返回值从 `1` 开始，若不存在则返回`-1`

```js
const index = 字符串.indexOf("字符");
```

---

### lastIndexOf()

> 旧的 API

查询某字符的位置，从后向前查询

---

### chartAt()

返回字符串中指定下标对应的字符

序号从`0`开始

```js
const 字符 = 字符串.charAt(字符下标);
```

> 如下：

```js
const str = "前端技术JavaScript";

console.log(str.charAt(0)); // 前
console.log(str.charAt(1)); // 端
console.log(str.charAt(str.length - 1)); // t
```

<br/>

## 转换

### toString()

强制转换为字符串

```js
字符串 = 非字符串数据.toString();
```

> 如下：

```js
const bool = true;
const num = 99;
const arr = [1, 2, 3];

console.log(bool.toString()); // "true"
console.log(num.toString()); // "99"
console.log(arr.toString()); // "1,2,3"
```

---

### split()

切割字符串，以分隔符为间隔将字符串转为数组

参数为分割字符，默认为逗号 `,`

若字符不存在，则将原油字符串整个作为数组的元素

```js
数组 = 字符串.split("分割字符");
```

> 如下：

```js
const str = "你,我,他,她,它";

const arr1 = str.split(",");
console.log(arr1); // [ '你', '我', '他', '她', '它' ]

const arr2 = str.split("+");
console.log(arr2); // [ '你,我,他,她,它' ]
```

---

### join()

将数组转为字符串

参数是间隔字符，默认是逗号`,`

会连接数组元素与间隔符

```js
const 字符串 = 数组.join("间隔符");
```

> 如下：

```js
const arr = ["你", "我", "他", "她", "它"];

const str1 = arr.join();
console.log(str); // "你,我,他,她,它"

const str2 = arr.join("");
console.log(str); // "你我他她它"

const str2 = arr.join("+");
console.log(str); // "你+我+他+她+它"
```

---

### charCodeAt()

将字符转为 Unicode 值

```js
Unicode值 = 字符.charCodeAt();
```

> 如下：

```js
const charCode = "a".charCodeAt();

console.log(charCode); // 97
```

---

### string.fromCharCode()

（静态方法）将 Unicode 值转字符

```js
const str1 = String.fromCharCode(97)
console.log(str1);  // a

const str2 = String.fromCharCode(72, 69, 76, 76, 79);
console.log(str2;  // HELLO
```

<br/>

## ❌ 正则表达式

### replace()

### match()

### search()

<br/>

## 常用实例

### 字符串首字母大写

该方法用于将英文字符串的首字母大写处理：

```js
const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

capitalize("hello world"); // Hello world
```

---

### 翻转字符串

该方法用于将一个字符串进行翻转操作，返回翻转后的字符串：

```js
const reverse = (str) =>
  str
    .split("")
    .reverse()
    .join("");

reverse("hello world"); // 'dlrow olleh'
```

---

### 随机字符串

该方法用于生成一个随机的字符串：

```js
const randomString = () =>
  Math.random()
    .toString(36)
    .slice(2);

randomString();
```

---

### 截断字符串

该方法可以从指定长度处截断字符串:

```js
const truncateString = (string, length) =>
  string.length < length ? string : `${string.slice(0, length - 3)}...`;

truncateString("Hi, I should be truncated because I am too loooong!", 36); // 'Hi, I should be truncated because...'
```

---

### 去除字符串中的 HTML

该方法用于去除字符串中的 HTML 元素：

```js
const stripHtml = (html) =>
  new DOMParser().parseFromString(html, "text/html").body.textContent || "";
```

---

### 字符出现次数・位置

`while + indexOf()`

```js
// 计算字符o出现的所有位置和出现总次数
let str = "sdesofrerwevoauboubqevoow";

let indexs = [];
let count = 0;
let index = str.indexOf("o");
while (index !== -1) {
  indexs.push(index);
  index = str.indexOf("o", index + 1);
  count++;
}
console.log(indexs); // [ 4, 12, 16, 22, 23 ]
console.log(count); // 5
```

---

### 出现次数最多的字符

`对象 + charAt()`

```js
let str = "sdesofrerwevoauboubqevoow";

let obj = {};
for (let i = 0; i < str.length; i++) {
  let chars = str.charAt(i);
  if (obj[chars]) {
    obj[chars]++;
  } else {
    obj[chars] = 1;
  }
}
console.log(obj);
/*
{
  s: 2,
  d: 1,
  e: 4,
  o: 5,
  f: 1,
  r: 2,
  w: 2,
  v: 2,
  a: 1,
  u: 2,
  b: 2,
  q: 1
}
*/
let max = 0;
let char = "";
for (key in obj) {
  if (obj[key] > max) {
    max = obj[key];
    char = key;
  }
}
console.log(char, max); // o 5
```
