# LocalStorage

![img](https://miro.medium.com/max/1200/1*4u22wYW7VxZXkTK97ItceA.jpeg)

[[toc]]

## 简介

### 应用场合

- 登录完成后的 `token`存储
- 存储用户部分信息，比如：昵称、头像、简介...
- 存储项目整体的切换状态，比如：主题颜色、icon 风格、语言标识...
- 存储项目通用参数，比如：id、参数 params...
- 状态管理持久化，比如：`vuex`、`redux` 状态的持久化

---

### 时效性

- **[localStorage](https://blaxberry.github.io/vuepress-studynotes/notes/front/JavaScript/WebStorage/LocalStorage.html)**： 属于永久性存储，除非手动清除否则数据一直存在
- **[sessionStorage](https://blaxberry.github.io/vuepress-studynotes/notes/front/JavaScript/WebStorage/SessionStorage.html)**：当前标签页关闭或浏览器关闭时清除

---

### 特点

- 本质上是对浏览器本地存储中的字符串数据进行存储读取
- HTML5 新增，相当于一个 5M 大小的针对于前端页面的数据库
- 拓展了 cookie 的 4K 限制，解决 cookie 存储空间不足的问题，相比于 cookie 可以节约带宽
- 但是不要在 localStorage 本地存储在过多内容，否则会消耗内存空间导致页面变卡
- 仅在 IE8 以上的高版本的浏览器中才支持 localStorage 这个属性
- 不能被爬虫抓取
- 在浏览器的隐私模式下面是不可读取的
- 遵循同源策略，不同协议/域名/端口下的 localStorage 不共用

<br/>

## 基础使用

### setItem()

`localStorage.setItem()` 用于**存入数据**

可存储 `key/value` JSON 格式的键值对数据

此时数据需要通过 **`JSON.stringify()`** 转换成为 JSON 字符串后存储，

否则直接存入的 JSON 格式数据会是 `[object Object]`

```js
// 简单数据
localStorage.setItem("变量名", "数据");
// 复杂数据
localStorage.setItem("变量名", JSON.stringify({ 键: 值 }));
```

> 如下：

```js
// 简单数据
localStorage.setItem("name", "Andy");

// 复杂数据
const data = { name: "Andy", age: 28 };
localStorage.setItem("person", JSON.stringify(data));
```

---

### getItem()

`localStorage.getItem()` 用于**获取数据**

若要获取的数据是 JSON 格式字符串，需要通过 **`JSON.stringify()`** 转换为 `key/value` JSON 格式的键值对数据

```js
// 简单数据
const 数据名 = localStorage.getItem("变量名");
// 复杂数据
const 数据名 = JSON.parse(localStorage.getItem("变量名"));
```

> 如下：

```js
// 简单数据
const data = localStorage.getItem("person");
console.log(data); // '{"name":"Andy","age":28}'

// 复杂数据
const dataHandled = JSON.parse(localStorage.getItem("person"));
console.log(dataHandled); // {name: 'Andy', age: 28}
```

---

### removeItem()

`localStorage.removeItem()` 用于**删除指定数据**

```js
localStorage.removeItem("变量名");
```

> 如下：

```js
localStorage.setItem("Tom", JSON.stringify({ name: "Tom", age: 28 }));
localStorage.setItem("Andy", JSON.stringify({ name: "Andy", age: 28 }));

localStorage.removeItem("Andy");
```

---

### clear()

`localStorage.clear()` 用于**清空所有数据**

```js
localStorage.clear();
```

<br/>

## 使用规范

### 变量命名

缓存变量名不宜太过简单，否则不同项目之间容易互相污染

可以采用 `项目名 + 当前环境 + 项目版本 + 变量名`

```js
"EXAMPLE_ADMIN__DEV__2.0.0__USERINFOMATION";
```

> 具体要取决于项目团队的要求

---

### expire 定时

若需要前端来判断登陆令牌 `token` 等具有时效性数据是否过期时，

可在创建时存入储存时的时间戳 & 时效时长，

在下一次获取缓存值时，判断获取时时间戳是否大于`储存时时间戳 + 时效时长`

不超时就获取，若超时则删除缓存的数据

> 如下：设定缓存时间时效为七天

```js
localStorage.setItem(
  "变量名",
  JSON.stringify({
    value: 数据,
    time: Date.now(),
    expire: 604800,
  })
);

const { time, expire, value } = JSON.parse(localStorage.getItem("变量名"));
if (Date.now() > time + expire) {
  console.log("超时了，数据已被删除");
  localStorage.removeItem("变量名");
} else {
  console.log(value);
}
```

---

### crypto 加密

缓存的数据在产品上线后，用户其实能通过控制台的`Application`看到，

因此很有必要对缓存数据进行加密

比如可使用 `crypto-js` 这个库里的 `encrypt`、`decrypyt` 对数据进行加密、解密

> 具体要取决于项目团队的要求
