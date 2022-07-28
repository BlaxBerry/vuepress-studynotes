# Array 常用方法

![](https://media.vlpt.us/images/newsilver1028/post/09309171-3e36-4875-8f3d-37259650d033/javascript-img.png)

[[toc]]

## 数组创建

### 字面量

字面量方式更常用

```js
const 数组 = [值, 值, 值];

// 如下：
const arr = [1, "你好", 2, false, 3, null, 4];
```

### new Array()

构造函数的方式创造数组

```js
const 数组 = new Array(元素);
```

::: tip 参数不同：

- **多项数据作为参数时：** <br/>
  这些参数会成为数组的元素

- **单个非数值类型的参数时：**<br/>
  该参数会成为数组的唯一元素

- **有且只有一个数值参数时：**<br/>
  返回该参数个数空位的数组

:::

```js
const a = new Array();
// 一个空数组
// []

const b1 = new Array(你好')
// ['你好']

const b2 = new Array(3);
// 由 3 个空位 ( empty ) 的数组（不是由undefined组成）
// [ empty x 3 ]

const c = new Array(3, 3);
// [3, 3]
```

通过调用构造函数来创建数组，无法确定传入的参数是数组的长度还是具体的每一项，为此 ES6 提供了新的 API [**`Array.of()`**](<#array-of()>)解决

---

### Array.of()

用于将任意非数组转为数组

如果没有参数就会返回一个空数组

ES6 提出的解决 `new Array()` 传入单一数值参数时返回的是空位数组的问题

```js
const 数组 = Array.of(值);
```

> 如下：

```js
const a = Array.of(1);
// [1]

const b = Array.of();
// []

const c = Array.of(1, 2, false);
// [1, '你好', false]

const e = Array.of({
  name: "andy",
  age: 28,
});
// [{…}]
```

<br/>

## 判断类型

数组是个**对象类型**

```js
console.log(typeof [1, 2, 3, 4]); // object
```

### Array.isArray()

```js
console.log(Array.isArray(目标数组));
// true： 是数组
// false： 不是数组
```

### instanceof Array

通过`instanceof`运算符用来检测是否为数组

```js
console.log(目标数组 instanceof Array);
// true： 是数组
// false： 不是数组
```

> 如下：

```js
const arr = [];
arr.length = 3;
console.log(arr); // [empty x 3]
console.log(arr instanceof Array);
// true

console.log([] instanceof Array);
// true
```

## 排序

### sort()

会修改原数组

返回的是修改后的数组

```js
// 排序数组元素
旧数组.sort((a, b) => {
  return a - b; // 升序
  return b - a; // 降序
});

// 按对象属性排序元素
旧数组.sort((a, b) => {
  return a.属性 - b.属性; // 升序
  return b.属性 - a.属性; // 降序
});
```

> 如下：

```js
const arr = [
  { name: "Andy", age: 28 },
  { name: "Lili", age: 19 },
  { name: "Tomy", age: 30 },
  { name: "Jack", age: 25 },
];

// 按age生序排列
const res = arr.sort((a, b) => a.age - b.age);
// [
//     { name: 'Lili', age: 19 },
//     { name: 'Jack', age: 25 },
//     { name: 'Andy', age: 28 },
//     { name: 'Tomy', age: 30 }
// ]

// 按age降序排列
const res = arr.sort((a, b) => b.age - a.age);
// [
//     { name: 'Tomy', age: 30 },
//     { name: 'Andy', age: 28 },
//     { name: 'Jack', age: 25 },
//     { name: 'Lili', age: 19 }
// ]
```

<br/>

## 类型转换

### join()

将数组各个元素添加上连接符后转为字符串

连接符默认是逗号`,`

```js
数组.join("连接符");
```

> 如下：

```js
const arr = [1, 2, 3];

const str1 = arr.join("-");
// "1-2-3"

const str2 = arr.join(" ");
// "1 2 3"
```

### split()

将含有连接符的字符串分割为数组

连接符转为数组的逗号，数组元素为字符串

```js
字符串.split("连接符");
```

> 如下：

```js
const str = "1-2-3";
const arr = str.split("-");
// ['1', '2', '3']

const str = "1-2-3 456";
const arr = str.split("-");
// ['1', '2', '3 456']
```

### Array.from()

浅拷贝一个类似数组或可迭代对象，创建并返回一个新的数组实例

比如：将函数的`arguments`伪数组转为数组：

```js
function fun() {
  const args = Array.from(arguments);
  console.log(args);
}
fun(1, 2, 3, 4);
```

```js
// 将字符串转化为数组
var str = "foo";
console.log(Array.from(str)); //['f','o','o']
// 将Set集合转化为数组
var set = new Set([1, 1, 2, 3, 4]);
console.log(Array.from(set)); //  [1, 2, 3, 4]  数组去重
// 将map 集合转化为数组
var map = new Map([
  ["1", "a"],
  ["2", "b"],
]);
console.log(Array.from(map)); // [['1', 'a'], ['2', 'b']]
console.log(Array.from(map.keys())); // ['1','2']
console.log(Array.from(map.values())); // ['a','b']
// 传入第二个参数
var arr = [1, 2, 3];
console.log(Array.from(arr, (x) => x * 2)); //[2, 4, 6]
// 数组浅复制（拷贝）
var arr1 = [{ name: "name" }, { age: "age" }];
var arr2 = Array.from(arr1);
console.log(arr2); //[{name:"name"},{age:"age"}]
arr1[0].name = "new Nmae";
console.log(arr1); // [{name:"new Nmae"},{age:"age"}]
console.log(arr2); // [{name:"new Nmae"},{age:"age"}]
```

[pink]()

<br/>

## 合并

### concat()

返回一个新数组

```js
const 新数组 = 数组.contact(数组);
```

> 如下：

```js
const a = [1, 2, 3];
const b = [4, 5, 6];

const arr = a.concat(b);
// [ 1, 2, 3, 4, 5, 6 ]
```

更推荐扩展运算符：

```js
const finalArr = [...arr01, ...arr02];
```

<br/>

## 增删

### push()

在数组末尾追加一个或多个元素

会改变原数组

返回的是修改后的新数组的长度

```js
数组.push(新元素);
```

> 如下：

```js
const arr = [1, 2, 3];

arr.push(4);
// [ 1, 2, 3, 4 ]

console.log(a.push(4, 5, 6));
// 6
```

### unshift()

在数组开头追加一个或多个元素

会改变数组

返回的是修改后的新数组的长度

```js
数组.unshift(新元素);
```

> 如下：

```js
const arr = [1, 2, 3];

arr.unshift(0);
// [ 0, 1, 2, 3 ]

arr.unshift(4, 5, 6);
// [ 4, 5, 6, 1, 2, 3 ]

console.log(a.unshift(1, 2, 3));
// 6
```

### pop()

删除数组最后一个元素

会改变原数组

返回的是删除的元素

```js
数组.pop();
```

> 如下：

```js
const arr = [1, 2, 3, 4];

arr.pop();
// [ 1, 2, 3 ]

console.log(a.pop());
// 5
```

### shift()

删除数组开头第一个元素

会改变原数组

返回的是删除的元素

```js
数组.shift();
```

> 如下：

```js
const arr = [1, 2, 3, 4];

arr.shift();
// [ 2, 3, 4 ]

console.log(arr.shift());
// 4
```

### splice()

因为`splice`有替换原数组的功能，所以也可实现：

- 向指定位置追加元素

- 从指定位置删除元素

```js
// 删除
数组.splice(start位置, 删除个数);

// 追加
数组.splice(start位置, 0, 追加内容);
```

> 如下：删除

```js
const arr = [1, 2, 3, 4, 5];

arr.splice(0, 3);
// 删除前3个
// [ 4, 5 ]

arr.splice(1, 1);
// 删除第2个（从1个开始删除1个）
// [ 1, 3, 4, 5 ]

arr.splice(1, 2);
// 从1个开始删除2个
// [ 1, 4, 5 ]

arr.splice(arr.length - 1, 1);
// 删除最后一个
// [ 1, 2, 3, 4 ]
```

> 如下：追加

```js
const arr = [1, 2, 3, 4, 5];

// 在第3个元素后追加
arr.splice(2, 0, "你好");
// [ 1, 2, '你好', 3, 4, 5 ]
arr.splice(2, 0, "你好", "我好");
// [1, 2, '你好', '我好', 3, 4, 5]

// 在数组开头追加
arr.splice(0, 0, "你好");
// [ '你好', 1, 2, 3, 4, 5 ]

// 在数组尾部追加
arr.splice(arr.length, 0, "你好");
// [ 1, 2, 3, 4, 5, '你好' ]
```

<br/>

## 替换

### splice()

因为`splice`会修改原数组，所以可以用来替换数组元素

实质是先从`start`位置删除指定替换个数的元素，然后再将要替换的新内容放到该位置

```js
数组.splice(start位置, 替换个数, 替换内容);
```

> 如下：

```js
const arr = [1, 2, 3, 4, 5];

arr.splice(0, 1, "你好");
// [ '你好', 2, 3, 4, 5 ]

arr.splice(0, 1, "你好", "我好");
// [ '你好', '我好', 2, 3, 4, 5 ]

arr.splice(1, 2, "你好");
// [ 1, '你好', 4, 5 ]

arr.splice(3, arr.length, "你好");
// [ 1, 2, 3, '你好' ]
```

<br/>

## 查找

### find()

从数组中查找第一个符合要求的目标元素

会遍历数组，返回`true`时停止遍历并将当前元素返回

若没有符合条件元素，则返回`undefined`

```js
const 目标元素 = 数组.find((item) => {
  return 查找条件结果为true;
});
```

> 如下：

```js
const arr = [
  { name: "andy", age: 28 },
  { name: "lili", age: 26 },
  { name: "tom", age: 18 },
];

const target = arr.find((item) => item.age < 20);

if (target) {
  console.log(target.name);
} else {
  console.log("没找到");
}
```

### findIndex()

从数组中查找第一个符合要求的目标元素的`index`序号

```js
const 目标元素 = 数组.findIndex((item) => {
  return 查找条件结果为true;
});
```

### includes()

判断数组是否还有指定元素，返回布尔值`true`或`false`

比起旧的  `indexOf`更直观

```js
const has = 数组.includes(目标元素);
```

> 如下：

```js
const arr = [1, 2, 3, 4, 5];

console.log(arr.includes(2)); // true
console.log(arr.includes(999)); // false

if (arr.includes(999)) {
  console.log("包含");
} else {
  console.log("不包含");
}
```

---

但是无法判断引用类型的元素：

> 可通过`find()`来解决该问题

```js
const arr = [
  { name: "andy", age: 28 },
  { name: "lili", age: 26 },
  { name: "tom", age: 18 },
];

const has = arr.includes({ name: "andy", age: 28 });

console.log(has); //false
```

> 无法判断是因为内存地址不同，原理如下：
>
> ```js
> const a = {};
> const b = {};
> console.log(a == b); // fasle
> ```

### indexOf()

> 旧 API

从左侧开始查找

```js
const index = 数组.indexOf(目标元素);
```

返回元素在数组中的`index`序号

若没有则返回`-1`

> 如下：

```js
const arr = [1, 2, 3, 4, 5];

if (arr.indexOf(999) === -1) {
  console.log("不包含");
} else {
  console.log("包含");
}
```

### lastIndexOf()

> 旧 API

从数组末尾开始查找

```js
const index = 数组.lastIndexOf(目标元素);
```

返回元素在数组中的`index`序号

若没有则返回`-1`

<br/>

## 截取

::: tip splice & slice：

- **`splice()`**：<br/>
  截取指定个数<br/>
  会修改原数组<br/>
  因为有修改原数组的特性，还可以实现替换、移除数组元素

- **`slice()`**：<br/>
  是截取指定范围<br/>
  不会修改原数组<br/>

:::

### splice()

从 `start` 开始截取指定个数的元素，后作为新数组返回

**会修改原数组**

```js
const 新数组 = 旧数组.splice(start位置, 个数);
```

> 如下：

```js
const arr = [1, 2, 3, 4, 5];

const res = arr.splice(0, 2);
// 截取出前两个
// [ 1, 2 ]

const res = arr.splice(2, 2);
// 从第2个向后截取出2个
// [ 3, 4]

const res = arr.splice(1, arr.length);
// [ 2, 3, 4, 5 ]
```

### slice()

截取从 `start` 到 `end` 位置的元素，后作为新数组返回

不会修改原数组

```js
const 新数组 = 旧数组.slice(start位置, end位置);
```

> 如下：

```js
const arr = [1, 2, 3, 4, 5];

const res = arr.slice(0, 2);
// 截取出前两个
// [ 1, 2 ]

const res = arr.slice(1, 2);
// 从第1个开始截取到第2个
// [ 2 ]

const res = arr.slice(2, 2);
// 从第2个开始截取到第2个，相当于什么没截取出来
// []

const res = arr.slice(1, arr.length);
// 从第一个开始到最后
// [ 2, 3, 4, 5 ]
```

若不指定`end`位置元素，则默认截取到数组结束位置的元素

```js
const arr = [1, 2, 3, 4, 5];

const res = arr.slice(1);
// [ 2, 3, 4, 5 ]
```

若`start`为负数，表示从倒数第几个开始（包括该元素）

若`end`为负数，表示截取至倒数第几个为止（不包括该元素）

```js
const arr = [1, 2, 3, 4, 5];

// const res = arr.slice(-3, -1)
// [3, 4]

const res = arr.slice(-3);
// [ 3, 4, 5 ]
```

<br/>

## 遍历

### forEach()

对数组进行循环操作

```js
数组.forEach((元素, 元素序号, 当前数组) => {
  // 操作
});
```

> 如下：获取符合条件的元素个数

```js
const arr = [
  { name: "Andy", age: 28 },
  { name: "Lili", age: 19 },
  { name: "Tomy", age: 30 },
  { name: "Jack", age: 25 },
];

let amount = 0;

arr.forEach((item) => {
  if (item.age > 20) {
    amount++;
  }
});

console.log(amount);
```

### every()

遍历数组，检测数组所有元素是否都符合指定条件

返回结果是布尔值`true`或`fasle`

当发现第一个不满足条件的元素时就返回`false`并停止遍历

- 返回`true`：所有元素都满足条件

- 返回`false`：有不满足条件的元素

```js
const 数组.every((元素, 元素序号, 当前数组) => {
  return 查找条件结果为true
})
```

> 如下：

```js
const arr = [
  { name: "Andy", age: 28 },
  { name: "Lili", age: 19 },
  { name: "Tomy", age: 30 },
  { name: "Jack", age: 25 },
];

const flag = arr.every((item) => item.age > 20);

if (flag) {
  console.log("全部成年人");
} else {
  console.log("有未成年");
}
```

### some()

遍历数组，检测数组中是否有满足指定条件的元素

返回结果是布尔值`true`或`fasle`

- 返回`true`：有一个元素满足条件
- 返回`false`：没有满足条件的元素

当发现第一个满足条件的元素时就返回`true`并停止遍历

```js
const 数组.some((元素, 元素序号, 当前数组) => {
  return 查找条件结果为true
})
```

> 如下：

```js
const arr = [
  { name: "Andy", age: 28 },
  { name: "Lili", age: 19 },
  { name: "Tomy", age: 30 },
  { name: "Jack", age: 25 },
];

const flag = arr.some((item) => item.age < 20);

if (flag) {
  console.log("有未成年");
}
```

### map()

遍历数组，给每个元素进行相同处理

返回包含了处理后元素的新数组

```js
const 新数组 = 旧数组.map((元素, 序号, 当前数组) => {
  return 新元素;
});
```

> 如下：

```js
const arr = [
  { name: "Andy", age: 28, area: "USA" },
  { name: "Lili", age: 19, area: "CN" },
  { name: "Tomy", age: 30, area: "JP" },
  { name: "Jack", age: 25, area: "USA" },
];

const res = arr.map((item) => {
  return {
    name: item.name.toUpperCase(),
    age: item.age + "岁",
  };
});

console.log(res);
// [
//     { name: 'ANDY', age: '28岁' },
//     { name: 'LILI', age: '19岁' },
//     { name: 'TOMY', age: '30岁' },
//     { name: 'JACK', age: '25岁' }
// ]
```

<br/>

## 过滤

### filter()

```js
const 新数组 = 数组.filter((item) => {
  return 查找条件结果为true;
});
```

> 如下：

```js
const arr = [
  { name: "Andy", age: 28, area: "USA" },
  { name: "Lili", age: 19, area: "CN" },
  { name: "Tomy", age: 30, area: "JP" },
  { name: "Jack", age: 25, area: "USA" },
];

const res = arr.filter((item) => {
  return item.area === "USA";
});

console.log(res);
// [
//     { name: 'Andy', age: 28, area: 'USA' },
//     { name: 'Jack', age: 25, area: 'USA' }
// ]
```

<br/>

## reduce()

是个功能强大的函数，可以实现**元素累加、统计次数、获取最值、元素去重**

```js
数组.reduce(
  (前一个返回值, 当前元素, [元素序号, 当前数组]) => {
    return 返回值;
  },
  [初始返回值]
);
```

指定初始返回值时，`前一个返回值`为自定义的初始返回值

不指定初始返回值时，`前一个返回值`默认为数组中第一个元素

> 如下：

```js
const arr = [1, 2, 3, 4];

arr.reduce((pre, val, index) => {
  console.log(pre, val, `NO.${index}`);
  return 999;
});
// 1 2 "NO.1"
// 999 3 "NO.2"
// 999 4 "NO.3"

arr.reduce((pre, val) => {
  console.log(pre, val);
  return 999;
}, 0);
// 0 1
// 999 2
// 999 3
// 999 4
```

---

### 累加求和

```js
const sum = 数组.reduce((前一个返回值, 当前元素) => {
  return 前一个返回值 + 当前元素;
});
```

> 如下：

```js
const arr = [1, 2, 3, 4, 5];

const sum = arr.reduce((pre, cur) => pre + cur);

console.log(sum);
// 15
```

---

### 统计次数

```js
const amount = 数组.reduce((前一个返回值, 当前元素) => {
  if (cur === 2) {
    return 前一个返回值 + 1;
  } else {
    return 前一个返回值 + 0;
  }
}, 0);
```

> 如下：

```js
const arr = [2, 1, 2, 3, 2, 4, 2];

const amount = arr.reduce((pre, cur) => {
  return cur === 2 ? pre + 1 : pre;
}, 0);

console.log(amount);
// 4
```

---

### 获取最值

```js
const amount = 数组.reduce((前一个返回值, 当前元素) => {
  return 前一个返回值 > 当前元素 ? 前一个返回值 : 当前元素; // 最大值
  return 前一个返回值 < 当前元素 ? 前一个返回值 : 当前元素; // 最小值
});
```

> 如下：

```js
const arr = [2, 1, 2, 3, 2, 4, 2];

// 最大值
const max = arr.reduce((pre, cur) => {
  return pre > cur ? pre : cur;
});
console.log(max); // 4

// 最小值
const min = arr.reduce((pre, cur) => {
  return pre < cur ? pre : cur;
});
console.log(min); // 1
```

---

### 元素去重

```js
const 新数组 = 旧数组.reduce((前一个返回值, 当前元素) => {
  if (前一个返回值.includes(当前元素) == false) {
    前一个返回值.push(当前元素);
  }
  return 前一个返回值;
}, []);
```

> 如下：

```js
const arr = [2, 1, 2, 3, 2, 4, 2];

const res = arr.reduce((pre, cur) => {
  if (!pre.includes(cur)) {
    pre.push(cur);
  }
  return pre;
}, []);

console.log(res.sort());
// [ 1, 2, 3, 4 ]
```

---

### 筛选数组元素

灵活运用，将初始值定位空数组，将符合判断条件的元素追加进数组

```js
const 新数组 = 数组.reduce((前一个返回值，当前元素) => {
  if(条件) 前一个返回值push(当前元素)
  return 前一个返回值
}, []);
```

> 如下：筛选出所有 `age` 大于 20 的元素

```js
const arr = [
  { name: "Andy", age: 28 },
  { name: "Tom", age: 17 },
  { name: "Jack", age: 26 },
];

const res = arr.reduce((preArr, curItem) => {
  if (curItem.age > 20) preArr.push(curItem);
  return preArr;
}, []);

console.log(res);
// [
//   { name: 'Andy', age: 28 },
//   { name: 'Jack', age: 26 }
// ]
```

<br/>

## 常用

### 过滤对象元素属性

> 如下：

```js
const res = dataSource.filter((item) => {
  let flag = true;
  for (const key in filterValues) {
    if (item[key] !== filterValues[key]) {
      flag = false;
    }
  }
  if (flag) {
    return item;
  }
});

console.log(res);

/*
const filterValues = {
  // name: 'Tom',
  // gender: 'male',
  // age: '30',
  // area: 'US',
}

const dataSource = [
  {
    name: 'Andy',
    gender: 'male',
    age: '28',
    area: 'US',
  },
  {
    name: 'Lili',
    gender: 'female',
    age: '25',
    area: 'UK',
  },
  {
    name: 'Jack',
    gender: 'male',
    age: '22',
    area: 'JP',
  },
  {
    name: 'Tom',
    gender: 'male',
    age: '30',
    area: 'US',
  },
]
*/
```

---

### 数组去重复

::: tip 方法一：new Set()

```js
const arr = [1, 2, 1, 2, 3, 4];

// Set + Array.from
console.log(Array.from(new Set(arr)));

// 或
// Set + 扩展运算符
console.log([...new Set(arr)]);
```

:::

::: tip 方法二：for + includes

```js
const arr = [1, 2, 1, 2, 3, 4];

let newArr = [];

for (let i = 0; i < arr.length; i++) {
  if (!newArr.includes(arr[i])) {
    newArr.push(arr[i]);
  }
}
console.log(newArr);
```

:::

::: tip 方法三：reduce

```js
function unique(arr) {
  return arr.reduce((pre, cur) => {
    return pre.includes(cur) ? pre : [...pre, cur];
  }, []);
}

console.log(unique([9, 9, 6]));
console.log(unique([1, 2, 1, 1, 3, 2]));
```

:::
