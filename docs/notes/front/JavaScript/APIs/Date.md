# Date 对象与常用方法

![img](https://media.vlpt.us/images/newsilver1028/post/09309171-3e36-4875-8f3d-37259650d033/javascript-img.png)

[[toc]]

## Date 对象

### new Date()

无参数默认获取当前时间的日期 Date 实例对象

```js
const d = new Date();
```

可携带参数创建指定的时间日期 Date 实例对象

```js
const d = new Date("日期字符串");
const d = new Date(毫秒);
const d = new Date(年, 月, 日, 时, 分, 秒, 毫秒);
```

::: tip 日期字符串作为参数时：

- **yyyy/MM/dd HH:mm:ss** （推荐）
  - 若省略时间，Date 对象的时间为 00:00:00
- **yyyy-MM-dd HH:mm:ss**
  - 若省略时间，Date 对象的时间会在 00:00:00 加上本地时区的时间
  - 若不省略时间，在 IE 中会转换失败

:::

> 如下：获取当前时间和指定时间的 Date 实例

```js
const a = new Date();
// Node环境结果：2022-04-07T16:09:33.688Z
// 浏览器结果：Fri Apr 08 2022 01:09:33 GMT+0900 (日本标准时间)

const b1 = new Date("2022/04/07");
// Node环境结果：2022-04-06T15:00:00.000Z
// 浏览器结果：Thu Apr 07 2022 00:00:00 GMT+0900 (日本标准时间)

const b2 = new Date("2022-04-07");
// Node环境结果：2022-04-07T00:00:00.000Z
// 浏览器结果：Thu Apr 07 2022 09:00:00 GMT+0900 (日本标准时间)

const b3 = new Date("2022-04-07 12:00:00");
// Node环境结果：2022-04-07T03:00:00.000Z
// 浏览器结果：Thu Apr 07 2022 12:00:00 GMT+0900 (日本标准时间)

const c = new Date(1649335386000);
// Node环境结果：2022-04-07T12:43:06.000Z
// 浏览器结果：Thu Apr 07 2022 21:43:06 GMT+0900 (日本标准时间)

const d = new Date(2022, 4, 7, 12, 14, 13, 15);
// Node环境结果：2022-05-07T03:14:13.015Z
// 浏览器结果：Sat May 07 2022 12:14:13 GMT+0900 (日本标准时间)
```

<br/>

## Date 实例常用方法

通过 [new Date()](#new-date) 获取的 Date 实例对象可使用以下方法

---

### getFullYear()

Date 实例对象的方法

从 Date 对象返回一个以四位数字的年份

```js
const year = new Date().getFullYear();
```

```js
const d = new Date("2022-04-07");
const year = d.getFullYear();

console.log(year); // 2022
```

---

### getMonth()

Date 实例对象的方法

从 Date 对象返回月份 ( **0 ~ 11** )

```js
const month = new Date().getMonth();
```

返回值是 **0** (一月) ~ **11** (十二月)之间

所以若要获取指定月份时需要 **+ 1**

```js
const d = new Date("2022-04-07");
const m1 = new Date().getMonth();
const m2 = new Date().getMonth() + 1;

console.log(m1); // 3
console.log(m2); // 4
```

可灵活运用一月是 0 这一特性到遍历等场合

```js
const d = new Date();
const Months = [
  "一月",
  "二月",
  "三月",
  "四月",
  "五月",
  "六月",
  "七月",
  "八月",
  "九月",
  "十月",
  "十一月",
  "十二月",
];
const currentMonth = Months[d.getMonth()];
console.log(currentMonth); // "四月"
```

---

### getDate()

Date 实例对象的方法

从 Date 对象返回一个月中的某一天 ( **1 ~ 31** )

```js
const date = new Date().getDate();
```

```js
const d = new Date("2022-04-07");

const date = d.getDate();
console.log(date); // 7
```

---

### getHours()

Date 实例对象的方法

返回 Date 对象的小时 ( **0 ~ 23** )

```js
const hour = new Date().getHours();
```

```js
const a = new Date("2022-04-07 23:00:00");
console.log(a.getHours()); // 23

const b = new Date("2022-04-07 24:00:00");
console.log(b.getHours()); // 0

const c = new Date("2022-04-07 00:00:00");
console.log(c.getHours()); // 0
```

---

### getMinutes()

Date 实例对象的方法

返回 Date 对象的分钟 ( **0 ~ 59** )

```js
const minutes = new Date().getMinutes();
```

```js
const a = new Date("2022-04-07 10:00:00");
console.log(a.getMinutes()); // 0

const b = new Date("2022-04-07 10:59:00");
console.log(b.getMinutes()); // 59

const c = new Date("2022-04-07 10:01:00");
console.log(c.getMinutes()); // 1
```

---

### getSeconds()

Date 实例对象的方法

返回 Date 对象的秒数 ( **0 ~ 59** )

```js
const seconds = new Date().getSeconds();
```

```js
const a = new Date("2022-04-07 10:00:00");
console.log(a.getSeconds()); // 0

const b = new Date("2022-04-07 10:00:59");
console.log(b.getSeconds()); // 59

const c = new Date("2022-04-07 10:00:02");
console.log(c.getSeconds()); // 2
```

---

### getDay()

Date 实例对象的方法

从 Date 对象返回一周（ **0~6** ）中某一天的数字

星期天为 0，星期一为 1，周六为 6

```js
const d = new Date().getDay();
```

因为星期天是 0，周六是 6，所以某些场合可能需要进行判断

可灵活运用这一特性到遍历等场合

```js
const d = new Date();
const Week = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
const currentDay = Week[d.getDay()];
console.log(currentDay); // "周四"
```

---

### toTimeString()

将 Date 实例转换为一个 时分秒 字符串

```js
new Date().toTimeString();
```

```js
const time = new Date().toTimeString();
console.log(time); // 23:51:40 GMT+0900 (日本标准时间)
```

若想仅获取 **时:分:秒** 格式，可截取字符串

```js
const timeFromDate = (date) => {
  return date.toTimeString().slice(0, 8);
};

timeFromDate(new Date(2021, 11, 2, 12, 30, 0)); // 12:30:00
timeFromDate(new Date()); // 返回当前时间 23:51:40
```

---

### toDateString()

将 Date 实例转换为一个 年月日 字符串

```js
new Date().toDateString();
```

```js
const time = new Date().toDateString();
console.log(time); // Fri Apr 08 2022
```

<br/>

## 时间戳(毫秒数)

时间戳，即当前时间与 **1970/01/01 00:00:00** 之间的总毫秒值

下列方法都可以

---

### +new Date()

```js
const timeStamp = +new Date();
```

不带参数是获取到当前时间为止的总毫秒数

若携带字符串时间参数则是到该指定时间为止的总毫秒数

```js
console.log(+new Date());
// 1649350752355

console.log(+new Date("2022-04-07"));
// 1649289600000
```

---

### Date.now()

Date 对象的方法

```js
const timeStamp = Date.now();
```

处理速度比 `+new Date()` 略慢一点点

作为 Date 对象的方法比起实例的方法 `getTime()` 要快一点点

```js
console.log(Date.now());
// 1649350752355
```

---

### getTime()

Date 实例对象的方法

```js
const timeStamp = new Date().getTime();
```

```js
console.log(new Date().getTime());
// 1649350752355
```

---

### valueOf()

Date 实例对象的方法

```js
const timeStamp = new Date().valueOf();
```

```js
console.log(new Date().valueOf());
// 1649350752355
```

---

### parse()

Date 对象的方法

```js
const timeStamp = Date.parse();
```

```js
console.log(Date.parse(new Date()));
// 1649429745005

console.log(Date.parse("2017/04/07"));
// 1649289600000
```

<br/>

## 常用场景

### 倒计时

实质就是总毫秒数时间戳转成对应时间

```js
// 获取指定时间到当前时间相差的毫秒数
var intervalMsec = new Date("指定时间") - Date.now();

// 总毫秒转换成秒
var intervalSec = intervalMsec / 1000;
// 转成天数
var day = parseInt(intervalSec / 3600 / 24);
// 转成小时
var hour = parseInt((intervalSec - day * 24 * 3600) / 3600);
// 转成分钟
var min = parseInt((intervalSec - day * 24 * 3600 - hour * 3600) / 60);

// 若相差的毫秒小于0 ,表示目的时间小于当前时间，这时的取的值都是负的：-X天-时-分，显示时，只显示天数前面为负的就行。
if (intervalMsec < 0) {
  hour = 0 - hour;
  min = 0 - min;
}

// 拼接字符串并返回
var result = day + "天" + hour + "时" + min + "分";
return result;
```

---

### 检查日期是否有效

```js
const isDateValid = (...val) => !Number.isNaN(new Date(...val).valueOf());

isDateValid("December 17, 1995 03:24:00"); // true
```

---

### 计算两个日期的间隔

```js
const dayDif = (date1, date2) =>
  Math.ceil(Math.abs(date1.getTime() - date2.getTime()) / 86400000);

dayDif(new Date("2021-11-3"), new Date("2022-2-1"));
// 90
```

---

### 比较日期大小

```js
const dt1 = new Date("2015/12/01");
const dt2 = new Date("2015/12/25");

console.log(dt1 > dt2); // false
```

---

### 获取时分秒字符串

使用 `Date` 对象的 `.toTimeString()` 方法转换为时间字符串，之后截取字符串即可

```js
const timeFromDate = (date) => {
  return date.toTimeString().slice(0, 8);
};

console.log(timeFromDate(new Date(2021, 0, 10, 17, 30, 0)));
// 17:30:00
console.log(timeFromDate(new Date()));
// 返回当前时间 23:40:27
```
