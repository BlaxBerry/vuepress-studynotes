# RegExp 正则表达式

![img](https://media.vlpt.us/images/newsilver1028/post/09309171-3e36-4875-8f3d-37259650d033/javascript-img.png)

[[toc]]

## 简介

正则表达式（Regular Expression）是个复杂类型的**对象**

用于对字符串模式进行**匹配、检索、替换**

```js
console.log(typeof /abc/); // object
```

::: tip 正则表达式构成：

```js
/匹配规则/[修饰符];
```

- 匹配规则（pattern）[详见下文](#匹配模式)
- 修饰符（modifiers）[详见下文](#修饰符)

:::

<br/>

## 创建

正则表达式有两种创建方法

### 字面量

直接在 `//` 内写匹配规则，该方法常用

```js
const 正则表达式 = /匹配规则/;
const 正则表达式 = /匹配规则/修符饰;
```

```js
/abc/;
/abc/i;
```

---

### 内置构造函数

也可使用 JS 内置构造函数 `new RegExp()`

```js
const 正则表达式 = new RegExp(匹配规则);
const 正则表达式 = new RegExp(匹配规则, 修饰符);
```

```js
new RegExp("abc");
new RegExp("abc", "i");
```

写入 [元字符](#元字符) 时要多写一个 **`\`** 来和**转义字符** 区分

```js
console.log(new RegExp("\\w")); /*  /\w/  */
console.log(new RegExp("w")); /*  /w/  */
console.log(new RegExp("w")); /*  /w/  */
console.log(new RegExp("abc\\W")); /*  /abc\W/  */
```

<br/>

## 匹配规则

```js
/匹配规则/;
```

---

### 指定的字符

```js
/指定的字符/;
```

> 如下：只要字符串含有 `abc` 三个连续的字符就算匹配

```js
/abc/.test("abc"); // true
/abc/.test("xxxabc"); // true
/abc/.test("abcxxx"); // true
/abc/.test("xxxabcxxx"); // true
/abc/.test("a"); // false
/abc/.test("b"); // false
/abc/.test("xxx"); // false
```

---

### 元字符

| 元字符 | 正则表达式 |                                                                               |
| :----: | :--------: | :---------------------------------------------------------------------------- |
| **\s** |    /\s/    | 必须有一个**空格**字符                                                        |
| **\S** |    /\S/    | 必须有一个**非空格**的字符                                                    |
| **\d** |    /\d/    | 必须有一个**数字**字符                                                        |
| **\D** |    /\D/    | 必须有一个**非数字**的字符                                                    |
| **\w** |    /\w/    | 必须有一个**数字 or 字母 or 下划线**字符                                      |
| **\W** |    /\W/    | 必须有一个数字 or 字母 or 下划线以外的字符 ( **空格、特殊符号、汉字假名**等 ) |
| **.**  |    /./     | 必须有一个**任意**字符                                                        |

---

### 边界符

边界符用于更精确的限定符合的字符

|    边界符     |  正则表达式   |                                                               |
| :-----------: | :-----------: | :------------------------------------------------------------ |
|     **^**     |  /^匹配规则/  | 必须以匹配规则字符**开头**，后面无所谓                        |
|    **\$**     | /匹配规则\$/  | 必须以匹配规则字符**结尾**，前面无所谓                        |
| **^ \$** 连用 | /^匹配规则\$/ | 必须以匹配规则字符**开头和结尾** ( **必须只能是匹配的字符** ) |

> 如下：限定开头的字符

```js
// 必须以 123 开头，后面无所谓
console.log(/^123/.test("123xxxx")); // true
console.log(/^123/.test("123")); // true
console.log(/^123/.test("xxxx")); // false

// 必须以一个数字开头，后面无所谓
console.log(/^\d/.test("1")); // true
console.log(/^\d/.test("123")); // true
console.log(/^\d/.test("1xxxx")); // true
```

> 如下：限定结尾的字符

```js
// 必须以 123 结尾，前面无所谓
console.log(/123$/.test("xxxx123")); // true
console.log(/123$/.test("123")); // true
console.log(/123$/.test("xxxx")); // false

// 必须以一个数字结尾，前面无所谓
console.log(/\d$/.test("xxxx1")); // true
console.log(/\d$/.test("1")); // true
console.log(/\d$/.test("12")); // true
```

> 如下：限定全部字符

```js
// 必须是仅限 123
console.log(/^123$/.test("123")); // true
console.log(/^123$/.test("1")); // false

// 必须是仅限一个数字
console.log(/^\d$/.test("1")); // true
console.log(/^\d$/.test("2")); // true
console.log(/^\d$/.test("12")); // false
```

---

### 数量限定

|  数量符   |   正则表达式    |                                                    |
| :-------: | :-------------: | -------------------------------------------------- |
|  **\***   |  /匹配规则\*/   | 匹配规则字符**可有可无** 若出现，**次数为 0 ～**   |
|   **+**   |   /匹配规则+/   | 匹配规则字符出必须出现 若出现，**次数为 1 ～**     |
|   **?**   |   /匹配规则?/   | 匹配规则字符**可有可无** 若出现，**次数为 0 或 1** |
|  **{n}**  |  /匹配规则{n}/  | 匹配规则字符必须出现 **必须仅出现 n 次**           |
| **{n,}**  | /匹配规则{n,}/  | 匹配规则字符必须出现 **出现次数为 n ～ **          |
| **{n,m}** | /匹配规则{n,m}/ | 匹配规则字符必须出现 **出现次数为 n ～ m**         |

数量符限定的是**挨得最近的一个字符或字符段**

若想数量限定一段字符需要借助 [特殊字符](https://blaxberry.github.io/vuepress-studynotes/notes/front/JavaScript/APIs/RegExp.html#特殊字符) 的**小括号**

```js
// 一个字符 3 必须出现 2～3 次
/^123{2,4}$/.test("1233"); // true
/^123{2,4}$/.test("123333"); // true
/^123{2,4}$/.test("123123"); // false

// 字符段 123 必须出现 2～3 次
/^(123){2,4}$/.test("123123"); // true
```

---

### ❌ 特殊字符

| 特殊字符 |     |     |
| :------: | --- | --- |
|  **()**  |     |     |
|          |     |     |
|          |     |     |

> 括号

```js
/^123{2,4}$/.test("1233"); // true
/^(123){2,4}$/.test("123123"); // true
```

---

### 转义符

可将边界符、特殊字符等没有实意的字符转为有意义的字符

```js
/./; // 一个任意字符
/\./; // 一个点 . 字符
```

```js
/\\/; // 一个斜线 \ 文本
```

```js
/\*/; // 一个星号 * 字符

/指定字符*/; // 一个以上的指定字符
/指定字符\*/; // 指定字符与一个星号 * 字符

console.log(/2\*/.test("2*")); // true
console.log(/2\*/.test("2")); // false
console.log(/2*/.test("")); // true
console.log(/2*/.test("2222")); // true
```

<br/>

## 修饰符

修饰符不是必须

```js
/正则规则/修符饰;
```

| 修饰符 |         含义         |
| :----: | :------------------: |
| **g**  | 全局匹配 or 全局捕获 |
| **i**  |      忽略大小写      |

> 如下：

```js
const reg = /^[abcd]$/i;
console.log(reg.test("a")); // true
console.log(reg.test("A")); // true
```

<br/>

## 捕获

### ❌ 贪婪捕获

---

### ❌ 非贪婪捕获

<br/>

## RegExp 对象方法

### test()

验证字符串**是否匹配**正则表达式匹配规则

返回值为布尔值

```js
const 布尔值 = 正则表达式.test(字符串);
```

> 如下：

```js
/abc/.test("abc"); // true
/abc/.test("xxxabc"); // true
/abc/.test("abcxxx"); // true
/abc/.test("xxxabcxxx"); // true
/abc/.test("a"); // false
/abc/.test("b"); // false
/abc/.test("xxx"); // false
```

---

### ❌exec()

---

### toString()

强制转为字符串

<br/>

## String 对象方法

字符串对象中与正则相关的方法

### ❌match()

---

### ❌replace()

---

### ❌search()
