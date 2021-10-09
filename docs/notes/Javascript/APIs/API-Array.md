# 常用数组方法



## concat()

链接两个或多个数组

返回一个新数组

```js
let a = [1, 2, 3]
let b = [4, 5, 6]

let arr = a.concat(b)
console.log(arr); // [ 1, 2, 3, 4, 5, 6 ]
```

---

解构数组

```js
let a = [1, 2, 3]
let b = [4, 5, 6]

let arr = [...a, ...b]
console.log(arr);  // [ 1, 2, 3, 4, 5, 6 ]
```



## join()

转为字符串（将所有元素是放入一个字符串）

参数为分割符，默认是逗号 **，**

返回一个字符串

```js
let a = [1, 2, 3]

let str = a.join(',')
console.log(str);   // 1,2,3
console.log(typeof str); // String
```



## toString()

转为字符串

```js
let a = [ 1, 2, 3, 4 ]

console.log(a.toString(); // 1,2,3,4

console.log(a.toString() === a.join()); true
```



## push()

在末尾添加（追加）一个或多个元素

后改变数组

```js
let a = [1, 2, 3]

a.push(4)
console.log(a); // [ 1, 2, 3, 4 ]
```

```js
let a = [1, 2, 3]

a.push(4)
console.log(a); // [ 1, 2, 3, 4, 5, 6 ]
```

返回的是修改后的新数组的长度

```js
let a = [1, 2, 3]

console.log(a.push(4, 5, 6)); // 6
```



## pop()

删除最后一个元素

会改变数组

```js
let a = [1, 2, 3, 4]

a.pop()
console.log(a); // [ 1, 2, 3 ]
```

返回的是删除的元素

```js
let a = [1, 2, 3, 4, 5]

console.log(a.pop()); // 5
```



## unshift()

在开头添加一个或多个元素

会改变数组

```js
let a = [1 ,2, 3;

a.unshift(0)
console.log(a); // [ 0, 1, 2, 3 ]
```

```js
let a = [4, 5, 6];

a.unshift(1, 2, 3)
console.log(a); // [ 1, 2, 3, 4, 5, 6 ]
```

返回的是修改后的新数组的长度

```js
let a = [4, 5, 6];

console.log(a.unshift(1, 2, 3)); // 6
```



## shift()

删除第一个元素

会改变数组

```js
let a = [1, 2, 3, 4]

a.shift()
console.log(a); // [ 2, 3, 4 ]
```

返回的是删除的元素

```js
let b = [4, 5, 6];

console.log(b.shift()); // 4
```



## silce()

截取数组

返回一个新数组

```js
arr.slice(start, [end])
```

截取 start到end之间 的元素（包含start，不包含end）

start 和 end都是 index序号

end可省略，默认是截取到最后一个元素

```js
let a = [4, 5, 6, 7]

console.log(a.slice(1, 2)); // [ 5 ]
console.log(a.slice(0, 3)); // [4, 5, 6]
console.log(a.slice(1, a.length - 1)); // [5, 6 ]
```



## splice()

删除 / 替换

会改变数组

```js
arr.splice(index, amount, [target])
```

第一个参数是从哪里开始，index序号

第二个参数是要删除几个，元素的个数

第三个参数是要替换为的元素，可省略

- 省略第三个参数则是**仅删除**

- 第二个参数为0则是**不删除，仅替换**

  在第index处加入新元素，原来元素index序号后移

  等同与`unshift()`

```js
let a =  [4, 5, 6, 7]

a.splice(0, 1)
console.log(a) //  [5, 6, 7]
```

```js
let a =  [4, 5, 6, 7]

a.splice(1, 2)
console.log(a) //  [4, 7]
```

---

```js
let a = [4, 5, 6, 7]

a.splice(0, 1, 9)
console.log(a) // [ 9, 5, 6, 7 ]
```

```js
let a = [4, 5, 6, 7]

a.splice(0, 3, 9)
console.log(a) // [ 9, 7 ]
```

```js
let a = [4, 5, 6, 7]

a.splice(0, 5, 9)
console.log(a) // [ 9 ]
```

---

```js
let a = [4, 5, 6, 7]

a.splice(0, 0, 9)
console.log(a) // [ 9, 4, 5, 6, 7 ]
```

---

返回的是含有被删除的元素的数组

```js
let a = [4, 5, 6, 7]

console.log(a.splice(0, 1)); // [4]
```



## sort()

升序冒泡排列

会修改数组

返回的是修改后的数组

```js
a = [4, 1, 3, 2, 5]

console.log(a.sort()); // [ 1, 2, 3, 4, 5 ]
```

```js
arr.sort((a,b) => a - b ) // 升序
arr.sort((a,b) => a - b ) // 降序
```





## reverse()

反转颠倒数组

会改变数组

返回的是颠倒后的数组

```js
let a = [1, 2, 3, 4, 5]

console.log(a.reverse()); // [ 5, 4, 3, 2, 1 ]
```



## indexOf()

从头到尾地检索数组，查找元素的序号

参数是元素，返回的该元素是在数组中的index序号

```js
let a = [1, 2, undefined, 4, NaN, 2, 2];

console.log(a.indexOf(2)); // 1
console.log(a.indexOf(9)); // -1
console.log(a.indexOf(undefined)); // 2

console.log(a.lastIndexOf(2)); // 6
console.log(a.lastIndexOf(9)); // -1
```

但是不能判断是否含有 NaN

```js
let a = [1, 2, 3, 4, NaN, 2, 2];

console.log(a.indexOf(NaN)); // -1
```



## lastIndexOf()

从尾到头地检索数组，查找元素的序号



## includes()

判断一个数组是否包含一个指定的值，

如果是返回 true，否则false。

比判断indexOf返回的index和-1更直观

```js
arr.includes(要查找的元素, [start])
```

```js
let arr = [1, 2, 3]

console.log(arr.includes(2)); // true
console.log(arr.includes(0)); // false
```





## every()

检测数组所有元素是否都符合指定条件

如果有一个元素不满足，则返回 false ，剩余的元素不会再进行检测。

如果所有元素都满足条件，则返回 true。

```js
let arr = [1, 2, 3]

let res = arr.every(item => {
    return item % 2 == 0
})
console.log(res); // false
```





## some()

检测数组中是否有满足指定条件的元素

如果有一个元素满足条件，返回true , 剩余的元素不会再执行检测。

如果没有满足条件的元素，则返回false。

```js
let arr =[1,2,3,4]

let res = arr.some(item=> item%2==0 )
console.log(res) // true
```









## forEach()

遍历数组

相当于for，给每一个元素执行相同操作

```js
arr.forEach((item, index, self) => {
  
})
```

```js
let a = [1, 2, 3]
let res = []
a.forEach(item => {
    res.push(item.toString())
})

console.log(a); // [1, 2, 3]
console.log(res); // [ '1', '2', '3' ]
```



## map()

给每个元素执行相同回调函数

将执行的返回值存入一个新数组

返回一个新数组，

新数组每个元素是旧数的元素执行回调函数后的结果，

所以必须要 **return** 返回该结果，不然返回结果是undefined

```js
let a = [ 1, 2, 3 ]

let res = a.map(item => {
    item.toString()
})
console.log(res);  
// [ undefined, undefined, undefined ]



res = a.map(item => {
    return item.toString()
})
console.log(res); // [ '1', '2', '3' ]
```

可理解为省略了 forEach遍历后再追加到新数组



## filter()

判断并筛选 **所有**符合元素

让数组每一个元素都执行相同的回调函数

并将所有执行结果为 true的元素存入一个新数组

返回一个新数组

必须用return返回执行的结果，不然是空数组

```js
let a = [1, 2, 3, 4, 5, 6]
let res = a.filter(item => {
    return item % 2 == 0
})
console.log(res); // [ 2, 4, 6 ]


let res = a.filter(item => {
    item % 2 == 0
})
console.log(res); // [ ]
```



## reduce()

累加

```js
array.reduce(function(prev, now, [index, self]))
```

```js
var arr = [10,20,30,40,50];

var sum = arr.reduce(function(prev, now){
  return prev + now;
})
console.log(sum);  //  150
```

```js
// 四舍五入后计算数组元素的总和
var numbers = [15.5, 2.3, 1.1, 4.7];
 
function getSum(prev, now) {
    return prev + Math.round(now);
}
```





---

---

## isArray()

判断一个对象是否为数组。

判断一个对象是否为数组。

```js
Array.isArray(obj)
```



## find()

筛选查找 **第一个**符合元素

> filter 是筛选出所有符合条件的元素

```js
let arr =[1,2,3,4,5,6,7,8]

let target = arr.find(item=>{
    return item%2==0
})
console.log(target) // 2
```

```js
// 或用箭头函数省略 return
let target = arr.find(item=> item%2==0 )
console.log(target) // 2
```



## findIndex()

筛选查找 **第一个**符合元素的序号

```js
let arr = [-1, 0, 1, 2, 3, 4, 5]

let item = arr.findIndex(item => {
    return item % 2 == 0
})
console.log(item); // 1
```





## fineIndex()



## fill()

替换数组元素

```js
array.fill(value, [start, end])
```

- value：修改为什么
- start：从哪一个index开始（不包含index）
- end：到哪一个index结束（不包含index）

```js
var fruits = ["Banana", "Orange", "Apple", "Mango"];
fruits.fill("Runoob");
// Runoob,Runoob,Runoob,Runoob
```

```js
var fruits = ["Banana", "Orange", "Apple", "Mango"];
fruits.fill("Runoob", 2, fruits.length-1);
// Banana,Orange,Runoob,Mango
```





## from()

将伪数组转换为真数组

```js
function fun() {
    console.log(arguments);
}
fun()  // [Arguments] {}
fun(1, 2, 3) // [Arguments] { '0': 1, '1': 2, '2': 3 }
```

```js
function fun() {

    // ES5 
    // let arr = [].slice.call(arguments)

    // ES6
    let arr = Array.from(arguments)
    console.log(arr);
}
fun() // []
fun(1, 2, 3) // [1,2,3]
```

### 用途：转换伪数组

```js
let lis = document.querySelectAll('li')
console.log(Array.isArray(lis)) // false

console.log(typeof Array.from(lis)) // Array
```



## of()

将一组值转换为数组

```js
console.log(Array.of(1,-1,'1','A'));
// [ 1, -1, '1', 'A' ]
```



## copyWithin()



















# 数组去重复

## 1. set

```js
let arr = [1, 1, 2, 3, 4, 4]
console.log(arr); // [1, 1, 2, 3, 4, 4]


let set = new Set(arr)
let newArr = [...set]
console.log(newArr); // [1, 2, 3, 4]

// 或
// let newArr = Array.from(new Set(arr))
```

## 2. forEach() + indexOf()

```js
let arr = [1, 1, 2, 3, 4, 4]
console.log(arr); // [1, 1, 2, 3, 4, 4]


let newArr = []
arr.forEach(item => {
    if (newArr.indexOf(item) === -1) {
        newArr.push(item)
    }
})
console.log(newArr); // [1, 2, 3, 4]
```







# 转为数组

### 1. Array.from()

```js
let lis = document.querySelectAll('li')
console.log(typeof Array.from(lis)) // Array
```

## 2. [...伪数组]

```js
let lis = document.querySelectAll('li')
console.log(typeof [...lis]) // Array
```

