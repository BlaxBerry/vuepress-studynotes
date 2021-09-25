# 本地存储 LocalStorage 

localStorage 是**永久存于浏览器的本地储存**

浏览器页面关闭并不会删除localStorage本地存储的内容 ，

需要手动调用删除方法去删除

一般5M大小

---

在浏览器的application中打开 localStorage 查看，如下：

![](https://www.granfairs.com/blog/upload/staff-2017-10-26-local-storage-01-06.png)



## setItem()

**存入**

以 **键值对 **的形式存入

> localStorage.**setItem(key,value)**

其中的 `key` 和 `value` 值都必须是**字符串形式**

数字形式会被隐式转换为字符串形式

```html
<script>
  var str = 'hello';
  localStorage.setItem('str', str);
</script>
```



## getItem()

**获取**

> localStorage.**getItem(key)**

通过存入时设定的`key`值，获取对应的存入的 `value` 值

 `key` 是**字符串形式**

```js
console.log(localStorage.getItem('str'));
```



## removeItem()

**删除指定的键值对**

通过存入时设定的`key`值，删除对应的的键值对

 `key` 是**字符串形式**

>localStorage.**removeItem(key)**

```js
localStorage.setItem('str', 'hello');
localStorage.setItem('num', '123');

localStorage.removeItem('num');
console.log(localStorage.getItem('num'));
// null
```



## clear()

**清空全部本地存储**

> localStorage.**clear()**

```js
localStorage.clear();
console.log(localStorage.getItem('str')); // null
```





## JSON.stringify()

若存入localStorage的 `value值 `不是字符串， 是个 **对象**

存入后的`value值 `  就成了**`[object Object]`** 

即：`key值 :  [object Object]`

验证如下：

```js
let obj = {
  name: "andy",
  age: 28
};
localStorage.setItem('obj', obj);

console.log(localStorage.getItem('obj')); 
// [object Object]
```

---

 **`JSON.stringify()`**可把对象转换为字符串

> **JSON.stringify(对象)**

```js
let obj = {
  name: "andy",
  age: 28
};

console.log(typeof obj);  // object
console.log(typeof(JSON.stringify(obj))); //string
```

---

所以，若存入localStorage的 `value值  `是个**对象** 时，

需要先通过 **`JSON.stringify()`**

**把要存入的对象转为字符串后**，再存入localStorage

```js
let obj = {
  name: "andy",
  age: 28
};
localStorage.setItem('obj', JSON.stringify(obj));
```





## JSON.parse()

通过确实是可以把对象转为字符串存入了local Storage

但是该值已经被转为字符串，直接取出的是个字符串，

不再是原本的对象了，不能使用 `.属性` ，必须还要再转换为对象

验证如下：

```js
let obj = {
  name: "andy",
  age: 28
};
localStorage.setItem('obj', JSON.stringify(obj));

console.log(localStorage.getItem('obj'));
// '{"name":"andy","age":28}'
console.log(typeof (localStorage.getItem('obj'))); //string
```

---

**`JSON.parse() `**可将字符串形式的**键值对**转换为对象

> **JSON.parse(字符串的键值对)**

```js
let obj = '{"name":"andy","age":28}';

console.log(typeof obj);  // string
console.log(typeof(JSON.parse(obj))); //object
```

---

通过**`JSON.parse()`** ，

将存入本地存储是转换为字符串形式的对象，再转换回原本的对象形式

```js
let obj = {
  name: "Andy",
  age: 28
};
localStorage.setItem('obj', JSON.stringify(obj));

console.log(JSON.parse(localStorage.getItem('obj')));
console.log(JSON.parse(localStorage.getItem('obj')).name);
// Andy
console.log(JSON.parse(localStorage.getItem('obj')).age);
// 28
```

