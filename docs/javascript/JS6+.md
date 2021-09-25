# ECMA Script 6

主要是简化的一些繁琐的写法和新增了一些语句

![](https://blog-imgs-102.fc2.com/t/r/i/tridentwebdesign/es2015-001.jpg)



## var的弊端

var关键字声明变量的弊端有以下：

- var声明的变量有预解析，可以先使用后定义，不严谨，**逻辑混乱**

```js
var a = 10;
console.log(a);  //10

//变量提升
console.log(b);  //undefined
var b = 10;
```

---

- var可以重复声明一个变量，第二次开始就是重新赋值修改变量，而不是定义，**逻辑错误**

```js
var a = 10;

var a = 100;

console.log(a);  // 100
```

---

- var在for循环条件中，会造成**临时变量污染**

```js
for (var i = 0; i < 3; i++) {
    console.log(i);
}
console.log('结果是：' + i);  
//=》
0
1
2
结果是：3

//for中的变量在循环结束后没有消除回收，并作为全局变量保留了下来，
```

---

- var声明的变量没有块级作用域，只有全局作用域和局部作用域（函数作用域）,块级作用域内的变量在外边也能被使用，会造成**变量污染**

```js
var a = 10; 
{
    var a = 200;
}

console.log(a);  // 200
```





## let关键字的优点

**常用**

- let声明的变量必须先定义，后才能使用，不然报错

没有变量提升

---

- let声明过的变量不能被再次定义，不然会报错

变量不能被重复定义，但是可以被赋值修改

---

- for循环中的临时变量在循环结束后就被回收，不能在循环外被使用，不然会报错。不会出现泄露

---

- 块级作用域内定义的变量只能在块级作用域内被使用，不然会报错





## const定义常量

常量中存放的是不能被修改的数据

比如服务端的server，和文件的路径....

const定义的常量的引用类型不能被修改，不然会报错

```js
const num = 10;
num = 20;

//报错
TypeError: Assignment to constant variable.
```

---

一般const定义的常量名用大写。

---

一般**引入某个某块的某个对象**时，使用const。

比如Node.js中引入模块：

```js
const http = require('http')

const MathFunctionPackage = require(./js/MathFunctionPackage.js)
```

---

**对象型的常量**的**属性**可以修改

```js
const OBJ = {
    name: 'Andy',
    age: 18
}
console.log(OBJ);   // { name: 'Andy', age: 18 }

OBJ.name = 'James';
OBJ.age = 28;
console.log(OBJ);   //{  name: 'James', age: 28 }
```

---

**数组型的常量**的**元素**可以修改

```js
const arr = [1, 2, 3];
console.log(arr);    // [1, 2, 3]

arr[0] = 6;
arr[1] = 7;
arr[2] = 8;
console.log(arr);   // [ 6, 7, 8 ]
```





## 解构（解构赋值）— 对象

解构可以用来获取对象的元素

是用来简化代码书写的

### ES5获取对象属性的方法

比如，想要获得对象的属性，

以前是分别单独声明变量，然后分别调用属性，再分别存入，

```js
var obj = {
    name: 'Andy',
    age: 18,
    sex: 'male'
}
var name = obj.name;
var age = obj.age;
var sex = obj.sex;
var score = obj.score;  //undefined

console.log(name, age, sex);
```

或使用键值对

```js
var obj = {
    name: 'Andy',
    age: 18,
    sex: 'male'
}
var name = obj['name'] 
var age = obj['age'];
var sex = obj['sex'];
var score = obj['score'];  //undefined

console.log(name, age, sex);
```

以上两种都是ES5的做法，都比较麻烦



### 对象的解构赋值

使用解构赋值，解构对象的属性，更方便

```js
let {属性名，属性名} = 对象
```

可理解为，把对象中的属性拿出，给了一个同名的变量

---

如下：**完全解构**一个对象

```js
let obj = {
    name: 'Andy',
    age: 18,
    sex: 'male'
}
let { name, age, sex } = obj;

console.log(name, age, sex);
```

---

也可**部分解构**，用谁就解构获取谁。如下：

```js
let obj = {
    name: 'Andy',
    age: 18,
    sex: 'male'
}

let { name } = obj;
console.log(name);
```

---

顺序颠倒不影响

但是不能解构出对象中没有的属性

**若对象里没有同名属性**的话，会返回undefined，还和ES5一样，

```js
let obj = {
    name: 'Andy',
    age: 18,
    sex: 'male'
}

let { score, country } = obj;
console.log(score, country);
// undefined undefined
```

---

解构获得的属性**修改后，不会影响对象**原本属性

```js
let obj = {
    name: 'Andy',
    age: 18,
    sex: 'male'
}
let { name, age, sex } = obj;
name = 'james';
console.log(name);
console.log(obj);
//->
james
{ name: 'Andy', age: 18, sex: 'male' }

//并没有影响到对象原本的属性
```



### 自定义变量名结构对象属性

解构对象是结构对象的属性，可理解为把对象中的属性拿出，赋值给了一个同名的变量，

但如果在对象外，对象的属性名被使用过了，会因为**变量名冲突**报错。如下：

```js
let name = 'James';
let obj = {
    name: 'Andy',
    age: 18
}
let {name}=obj;

//报错
SyntaxError: Identifier 'name' has already been declared
//因为name变量已经被let定义过了，不能重复定义

```

为了防止变量名冲突，可使用**自定义变量**接受对象的属性

```js
let {属性名:自定义变量名} = 对象
```

如下：

```js
let name = 'James';
let obj = {
    name: 'Andy',
    age: 18
}
let { name: myName } = obj;

console.log(myName);  // Andy
```

相当于ES5的:

```js
var myName = obj.name;
```



### 解构赋默认值

```js
let obj = {}
let { name, age } = obj;

console.log(name, age);
// undefined undefined
```

```js
let obj = {}
let { name = 'andy', age = 11 } = obj;

console.log(name, age);
//	andy 11
```





## 解构（解构赋值） — 数组

解构数组不是解构的主要目的，是顺带的

### ES5获取数组元素的方法

以前是分别单独声明变量，然后分别获取数组元素，再分别存入，如下：

```js
var arr = [
    [1, 2, 3],
    ['A', 'B', 'C'],
    { name: 'andy', age: 18 }
];

var a = arr[0];
var b = arr[1];
var c = arr[2];
console.log(a,b,c)
```

也是写起来麻烦



### 数组的解构赋值

使用解构赋值，解构数组的元素，更方便

```js
let [变量，变量] = 数组
```

可理解为，把数组的元素取出，**按顺序**赋值给变量。

---

因为数组没有对象的键值对，

所以是**按元素的顺序一一**对应

如下，全部取出：

```js
let arr = [
    [1, 2, 3],
    ['A', 'B', 'C'],
    { name: 'andy', age: 18 }
];

let [a, b, c] = arr;

console.log(a);
console.log(b);
console.log(c);
```

如下，只取出一个，此时是第一个元素：

```js
let arr = [
    [1, 2, 3],
    ['A', 'B', 'C'],
    { name: 'andy', age: 18 }
];

let [a] = arr;
console.log(a); //[1,2,3]
```

---

修改解构获取的数组元素，**不会影响到数组本身**

```js
let arr = [
    [1, 2, 3],
    ['A', 'B', 'C'],
    { name: 'andy', age: 18 }
];
let [, , a] = arr;
console.log(a);

a = [6, 6, 6]
console.log(a);
console.log(arr);

//-》
{ name: 'andy', age: 18 }
[ 6, 6, 6 ]
[ [ 1, 2, 3 ], [ 'A', 'B', 'C' ], { name: 'andy', age: 18 } ]
//获取的变量时被修改了，但是
//数组本身没有被修改
```



### 指定解构获取的元素

因为解构数组是**按顺序**解构元素。所以只写一个变量时永远是获取数组的第一个元素。

但可以用逗号空开，来指定要获取的元素的序号

（虽然写起来不如直接写序号简单）

```js
//解构赋值数组的第1个元素
let [变量] = 数组；

//解构赋值数组的第2个元素
let [,变量] = 数组；

//解构赋值数组的第3个元素
let [,,变量] = 数组；

...
```

如下，只获得数组的第2个元素：

```js
let arr = [
    [1, 2, 3],
    ['A', 'B', 'C'],
    { name: 'andy', age: 18 }
];

let [, , a] = arr;

console.log(a);
//{ name: 'andy', age: 18 }
```

目前仅有这种方式，若一个数组中有100个元素，还不如直接用索引号



### 解构数组中的对象

若数组中有对象作为元素,

还是按顺序结构数组元素

```js
let [{属性，属性}]
```

如下：

```js
let arr = [
    { name: 'andy', age: 18 },
    { name: 'james', age: 28 }
];

let [
  { name: andyName, age: andyAge }, 
  { name: jamesName, age: jamesAge }
] = arr;

console.log(andyName, andyAge);  // andy 18
console.log(jamesName, jamesAge); // james 28
```



### ES5获取多维数组的元素

ES5获取多维数组元素的方法如下：

```js
var 数组[i][i][i]
```

```js
var arr = [
    [1, 2, 3],
    [6, 7, 8]
];
console.log(arr[2][0]);  // 6
```

若多维数组中有对象作为元素

```js
var 数组[i][i][i].属性
或
var 数组[i][i][i]['属性']
```

```js
var arr = [
    { name: 'andy', age: 18 },
    { name: 'james', age: 28 }
];
console.log(arr[0].name);    //andy
console.log(arr[1]['name']); //james
```



### ES6解构多维数组

只要是数组，解构时元素就要**按顺序**一一对应元素

```js
let arr = [
    [1, 2, 3],
    [6, 7, 8]
];
let [a, b] = arr;
console.log(a);  //[1,2,3]
```

```js
let arr = [
    [1, 2, 3],
    [6, 7, 8]
];
let [
    [a1, a2, a3],
    [b1, b2, b3]
] = arr;
console.log(a1, a2, a3); // 1 2 3
console.log(b1, b2, b3); // 6 7 8
```

```js
let arr = [1, [2, 3], 4, 5, [6, 7, 8]];

let [a,[ b, c], d, e, [f, g, h]] = arr;

console.log(a, b, c, d, e, f, g, h);
// 1 2 3 4 5 6 7 8
```





## 解构（解构赋值）— 字符串

解构也能用于获取字符串的字符，了解即可

### ES5获取字符串的字符

和获取数组的元素一样，使用序号下标

```js
var str = 'hello Node'
console.log(str);
console.log(str[0]);  // h
console.log(str[5]);  // 空格
```



### 字符串也能被解构

和解构数组一样，字符和顺序一一对应。如下：

```js
let str = 'hello';

let [a, b, c, d, e] = str;
console.log(a, b, c, d, e);
//h e l l o
```





## 字符串 — 模版字符串

作用和字符串的单双引号一样

```js
let str = ``
console.log(typeof str); // string
```

---

### ES5拼接字符串

```js
		'' + 变量 + ''
```

比如用在DOM中：

```js
var div = document.querySelector('div');
var inner = 'Hello~'

div.innerHTML = '<sapn>' + inner + '</sapn>';
```

拼接字符串比较占用内存

---

### 可以解析锁进和换行

---

### 可以解析变量和表达式

简化了拼接字符串

拼接时直接在模版字符串中放入包裹在`${}`中的变量

```js
		`${变量}`
```

如下：

```js
let name = 'andy';
let age = 18;

console.log(`my name is ${name}`);
//my name is andy

console.log(`i was ${age -1} last year`)
//i was 17 last year
```

再比如用在DOM中：

```js
var div = document.querySelector('div');
var inner = 'Hello~'

div.innerHTML = `<sapn>${inner}</span>`;
```





## 对象简化写法

### 对象属性简写

就是简写定义对象时的属性的定义。

在创建对象时，属性的值可以直接写成实现定义好的变量

```js
let name = 'Andy';
let age = 18;
let sex = 'male';

let obj = {
    myname: name,
    myage: age,
    mysex: sex
}
```

如果 对象的属性名和作为值的变量名相同时，如下场合：

```js
let name = 'Andy';
let age = 18;
let sex = 'male';

let obj = {
    name: name,
    age: age,
    sex: sex
}
```

---

可以使用ES6 新增的对象属性的简写方法

直接写变量，省略写属性名，如下：

```js
let name = 'Andy';
let age = 18;
let sex = 'male';

let obj = {
    name,
    age,
    sex
}
console.log(obj);
//{ name: 'Andy', age: 18, sex: 'male' }
```

也就是下面的写法：**常用**

```js
let name = 'Andy';
let age = 18;
let sex = 'male';
let obj = { name,age,sex }
```



### 对象方法简写

以前在对象中定义方法，要写`function`

```js
let obj = {
  name:"Andy",
  say:function(){
    console.log(`${name} say hello`)
  }
}
obj.say()
```

ES6对象定义的简化写法，可以省略写`function`

```js
let obj = {
  name:"Andy",
  say(){
    console.log(`${name} say hello`)
  }
}
obj.say()
```





## babel翻译器

ES6的简化写起来很方便，但是低版本的浏览器不支持。

可以使用babel翻译器，把ES6语法翻译成ES5

babel可以实现

ES6语法——> ES5语法

![](https://capitalp.jp/wp-content/uploads/2018/09/d5ec986cfb9c29030c488a4b70414518.png)

[babeljs.io](https://babeljs.io/)





## 解构（解构赋值）— 函数参数

就是函数使用对象属性的简化写法，方便维护增删改查

### ES5函数使用对象属性

分别取出对象的属性值，赋值贴变量，调用函数时传入变量

```js
var obj = {
    name: 'Andy',
    age: 18,
    sex: 'male'
}
var name = obj.name;
var age = obj.age;
var sex = obj.sex;

function fn() {
    console.log(name, age, sex);
}
fn(name, age, sex)

//Andy 18 male
```

写起来麻烦得很

---

或者把对象整体传入函数，**在函数内部获取属性**后，再使用

```js
var obj = {
    name: 'Andy',
    age: 18,
    sex: 'male'
}
function fn() {
    console.log(obj.name, obj.age, obj.sex);
}
fn(obj)

//Andy 18 male
```

但是维护和修改时麻烦，需要在函数中逐条查找



### 解构函数参数使用对象属性

可在调用函数时直接传入对象，在形参处解构对象属性，

**实参传入整个对象，形参接受解构的对象属性**

```js
function fn (在此解构对象){
  	 函数体	
}
fn（对象）
```

可理为解构出来属性的就是参数

---

如下：

```js
let obj = {
    name: 'Andy',
    age: 18,
    sex: 'male'
}

function fn({ name, age, sex }) {
    console.log(name, age, sex);
}
fn(obj)
//Andy 18 male
```

或使用**箭头函数**：

```js
let obj = {
    name: 'Andy',
    age: 18,
    sex: 'male'
}

let fn = ({ name, age, sex }) => {
    console.log(name, age, sex);
}
fn(obj)
// Andy 18 male
```

---

使用那个属性，就在形参解构哪个属性，

传入对象，**用谁就解构谁**

```js
let obj = {
    name: 'Andy',
    age: 18,
    sex: 'male'
}

let fn = ({ name }) => {
    console.log(name);
}
fn(obj)
// Andy
```

---

传入了对象，若没有解构对象的属性，就在函数内使用，

会**报错**，找不到属性。如下

```js
let obj = {
    name: 'Andy',
    age: 18,
    sex: 'male'
}

let fn = ({ name, age }) => {
    console.log(name, age, sex);
}
fn(obj)
//报错
ReferenceError: sex is not defined
```

---

当然若不传入对象，会报错

```js
let fn = ({ name }) => {}
fn()
//报错
Cannot destructure property 'name' of 'undefined' as it is undefined.
```

或

```js
let fn = ({}) => { }
fn()
//报错
TypeError: Cannot destructure 'undefined' as it is undefined.
```

传入一个空对象，会因为结构不到指定属性，返回**undefined**

```js
let fn = ({ name, age }) => {
    console.log(name, age);
}
fn({});
//undefined undefined
```



### 解构赋默认值

了解即可

```js
let obj = {}
let fn = ({ name = 'andy', age = 11 } = obj) => {
    console.log(name, age);
}

fn()
//andy 11
fn({})
//andy 11
fn({ name: 'james', age: 20 })
//james 20
```





## 函数参数的默认值

调用函数时，若有参数传入，函数内使用传入的参数

若没有参数传入，函数使用参数的默认值

参数默认值写在了形参处，如下：

```js
function fn(a, b = 100) {
    console.log(a, b);
    console.log(a + b);
}

fn()
//undefined 100
//NaN
fn(10)
//10 100
//110
fn(10, 20)
//10 20
//30
```





## 剩余参数 — 函数

### ES5获取函数的所有传参

若想获得调用函数时传入的所有参数，

在ES5 中可使用函数的的`arguments`

arguments返回的是个伪数组，包含所有传入的参数，

若没有传参数，返回一个空对象。

如下：

```js
function fn() {
    console.log(arguments);
}
fn()
//[Arguments] {}
fn(1, 2, 3)
//[Arguments] { '0': 1, '1': 2, '2': 3 }
```



### 剩余参数获取所有传参

**剩余参数**就是收集剩下的实参，**以数组方式返回**

如果函数调用时没传入参数，则返回一个空数组

因为函数的参数需要用逗号分隔，`(参数，参数，参数)`

所以单配**扩展运算符**，把获取的**所有参数用逗号分隔展开**

---

 扩展运算符和剩余参数 写在声明函数时的形参处。如下：

```js
function fn (...rest){  }
//或
let fn = (...rest)=>{ }
```

---

分别查看函数形参处的  `剩余参数`  和  `...剩余参数`

​	**剩余参数rest** 是一个**数组**，包含了所有的传入参数，

如果函数调用时没传入参数，则返回一个空数组

​	**...rest** 是用扩展运算符展开剩余参数这个数组

如下：

```js
let fn = (...args) => {
    console.log(args);
    console.log(...args);
}
fn()
//[]
//
fn(1, 2, 3)
//[1, 2, 3]
// 1 2 3
```

---

- **函数没有形参时**，剩余参数获得的是传入的全部实参

如下：

```js
let fn = (...args) => {
    console.log(args);
}
fn()  // []
fn(1, 2, 3)  // [ 1, 2, 3 ]
```

- 若不使用剩余参数，**函数只会取到形参的个数**的实参

无论调用函数时传入了多少实参，只有第一个实参被获得

如下：只有一个形参，则只取到了一个实参：

```js
let fn = (arg) => {
    console.log(arg);
}
fn()   // undefined
fn(1, 2)  // 1
fn(1, 2, 3, 4)  // 1
```

剩余参数 可以获取超过指定的形参个数的参数，

**除了形参个数的，剩余的所有实参**，放入一个数组。

如下，除了第一个实参外的剩余所有实参：

```js
let fn = (a, ...args) => {
  	console.log(a);
    console.log(args);
    console.log(...args);
}
fn()
//undefined
// []
//
fn(1, 2, 3)
// 1
// [2, 3]
// 2 3
```

- **函数参数有默认值**时：

```js
let fn = (a = 10, ...args) => {
    console.log(a);
    console.log(args);
    console.log(...args);
}
fn()
// 10
// []
//
fn(1, 2, 3)
// 1
// [2, 3]
// 2 3 
```





## 扩展运算符 — 数组

扩展运算符用来**拆数组**，把数组的**元素用逗号分隔后展开**

```js
let arr = [1, 2, 3, 4, 5]

console.log(...arr);
// 1 2 3 4 5
```

---

可以实现**合并简单数组**，如下：

```js
let a = [1, 2, 3]
let b = [4, 5, 6]

let c = [...a, ...b]
console.log(c);
//[1, 2, 3, 4, 5, 6]
```

---

JS的`console.log()方法`的参数也是`  ，`隔开的，

扩展运算符展开的数组元素被当作了多个要输出的参数，

所以输出结果没有逗号

```js
let arr = [1, 2, 3]

console.log(arr);
// [1, 2, 3]
console.log(...arr);
// 1 2 3
```

---

利用扩展运算符是把数组元素用逗号分隔展开的作用，

可在`...数组`作为调用函数方法时传入的逗号分隔的参数，

如下：

```js
//打印数组的所有元素
let arr = [10, 20, 30]

let fn = (...rest) => {
    console.log(...rest);
}

fn(...arr)
```

再比如，

```js
//用扩展运算符封装求和函数
let getSum = (...item) => {
    let sum = 0;
    item.forEach(item => {
        sum += item
    })
    return sum;
};
let a = [1, 2, 3]
let b = [10, 20, 30]
console.log(getSum(...a)); // 6
console.log(getSum(...b)); // 60

//当然不如直接传入整个数组，然后forEach遍历
//此处只是作为检查扩展运算符
```

再比如，`push()方法`的参数，实现**数组追加**

```js
let arr = [1, 2, 3, 4, 5]

let new_arr = [];
new_arr.push(...arr);

console.log(new_arr);
//1, 2, 3, 4, 5
```





## 扩展运算符 — 对象

把对象拆解成键值对的形式

```js
let obj = {
    name: 'andy',
    age: 28,
    sex: 'male'
}
console.log({...obj });
//{ name: 'andy', age: 28, sex: 'male' }
```

```js
let obj = {
    name: 'andy',
    age: 28,
    sex: 'male'
}

console.log(...obj);
//报错
// TypeError: Found non-callable @@iterator
```

---

用于合并对象，合并成一个新对象

- 如果**没有同名属性**，就是单纯合并

```js
let obj_1 = {
    name: 'andy',
    age: 28,
}
let obj_2 = {
    english_score: 80,
    math_score: 40
}

console.log({...obj_1, ...obj_2 });
//#=》
{
  name: 'andy',
  age: 28,
  sex: 'male',
  english_score: 80,
  math_score: 40
}
```

- 如果**有同名属性**，就是后面的覆盖前面的，然后再合并

```js
let obj_1 = {
    name: 'andy',
    age: 28,
}
let obj_2 = {
    name: 'james',
    age: 18,
    english_score: 80,
    math_score: 40
}

console.log({...obj_1, ...obj_2 });
//#=>
{ name: 'james', 
  age: 18, 
  english_score: 80, 
  math_score: 40 
}
```





## 箭头函数 

是ES6的新增的命名函数的简写方法

### ES5的函数命名

```js
function 函数名(){ }
```



### 箭头函数

就是化简省略写 **`function`** 了，替换为用 **`=>`**

```js
let 函数名 = ()=>{ }
```

```js
let fn = (a,b)=>{
  return  a + b
}
```

调用时还和以前的函数一样

```js
let fun = () => {
    console.log('hello');
}
fun();
//hello
```

参数的传参也和之前一样

```js
let fun = (name) => {
    console.log(`hello --- ${name}`);
}

fun();
//hello --- undefined
fun('Node');
//hello --- Node
```

```js
let fun = (a, b, c, d, e) => {
    console.log(a, b, c, d, e);
}
fun(100, 'hello', [], {})
//100 hello [] {} undefined
```

箭头函数的参数有默认值时，也和之前一样

```js
let fun = (name = 'Node') => {
    console.log(`hello ${name}`);
}

fun();
//hello Node
fun('JavaScript');
//hello JavaScript
```



### 箭头函数的省略写法

- **参数只有一个时，可省略 ( )**

```js
let fn = x => {函数体};
```

如下：

```js
let fn = x => {
    console.log(x);
}
fn(100); //100
```

---

- **函数体只有一个语句时，可以省略 { }**

```js
let fn = x => 函数体语句;
```

如下：

```js
let fn = x => console.log(x);

fn(100); //100
```

- **函数体只有一个语句时，并且有返回值，若省略了 { }，则 必须return**

即箭头函数会返回该唯一语句的执行结果。如下：

```js
let fn = x => x;

console.log(fn(100)); //100
```

```js
let fn = x => x + 1;

console.log(fn(100)); // 101
```

---



注意一点，**函数的返回值**

如果不用`return`来返回函数执行结果，

那**函数默认返回`undefined`**，如下：

```js
let fn = x => console.log(x);;
let res = fn(10);  //函数只有输出语句但没有返回值，啥都没有
console.log(res);

//#=>
1      //上面let声明res时调用了一次该函数的输出语句
undefined
```

`console.log()`只是输出语句，没有返回值，函数执行结果没有

但使用了`return`返回函数执行结果的话，如下：

```js
let fn = x => {
  return x         //函数有执行的结果，用return返回出来
}
let res = fn(10);  //res中存放的是return返回出来的值
console.log(res);
//#=>
10
```

```js
//箭头函数的省略写法
let fn = x => x;
let res = fn(10);
console.log(res);  
//#=>
10
```

---

匿名箭头函数

了解即可

```js
()=>{}
//相当于
fucntion(){}
```



### ES5的函数内部this指向

**重要**

`function函数`中的this指向函数的调用者，

全局作用域下调用的话，只想的是`Windows对象`

```js
function fn() {
    console.log(this);
}
fn() // Window
```

再如下：

```js
function Fn(name, age) {
    this.name = name;
    this.age = age;
    this.say = function() {
        setTimeout(function() {
            console.log(this.name);
        }, 1000);
    }
}
var fn = new Fn('andy', 18);
fn.say();

//undefined
```

验证如下：

共有3层作用域：

构造函数——方法say——say函数中的定时器

三层作用域的this执行都不同

`构造函数的this`指向`实例化的对象`；

`构造函数方法的this`指向`函数的调用者`(此处也是该实例对象)；

`定时器中的this`指向`window`：

```js
function Fn(name, age) {
            this.name = name;
            this.age = 18;
            console.log(this); //fn(say不调用不执行)

            this.say = function() {
                console.log(this);  //fn(包含say)
              
                setTimeout(function() {
                    console.log(this);   //window
                }, 1000);
            }
        };

var fn = new Fn('andy', 18);
fn.say();

//#->
// Fn {name: "andy", age: 18 }
// Fn {name: "andy", age: 18, say: ƒ}
// window
```

解决方法

若想叫定时器的this指向实例化对象，可借助变量保存this指向

`var that = this` 如下：

```js
function Fn(name, age) {
            this.name = name;
            this.age = 18;

            this.say = function() {
                var that = this;
              
                setTimeout(function() {
                    console.log(that);   //fn
                  
                  	console.log(that.name)
                }, 1000);
            }
        };

var fn = new Fn('andy', 18);
fn.say();

//#->
// andy
```



### 箭头函数的this指向

箭头函数没有`prototype`(原型)，所以箭头函数本身没有this。

```js
let a = () => {};
console.log(a.prototype); // undefined
```

箭头函数没有自己的作用域，里面的**this指向其外层作用域**

还是用这个例子：

```js
function Fn(name, age) {
    this.name = name;
    this.age = age;

    this.say = function() {
        setTimeout(() => {
            console.log(this.name);
        }, 1000)
    }
}
var fn = new Fn('andy', 18);
fn.say();

//#->
// andy
```

验证如下：

```js
function Fn(name, age) {
    this.name = name;
    this.age = age;
    console.log(this);    //fn(say不调用不执行)

    this.say = function() {
        console.log(this);    //fn

        setTimeout(() => {
            console.log(this); //fn
        }, 1000)
    }
}
var fn = new Fn('andy', 18);
fn.say();

//#=》
//Fn { name: 'andy', age: 18 }
//Fn { name: 'andy', age: 18, say: [Function (anonymous)] }
//Fn { name: 'andy', age: 18, say: [Function (anonymous)] }
```

---

#### 对象中的箭头函数的this指向

字面量创建的对象，其内部不适合写箭头函数

```js
let obj = {
    name: 'andy',
    age: 18,
  
    say: function() {
     		console.log(this);   //this指向对象本身
        console.log(this.name);  //对象的name属性
    },
  
    say_arrow: () => {
      	console.log(this);   //指向上一层作用域
        console.log(this.name);  //但是对象里没作用域
    }
}

obj.say()  
// 这个对象
// andy
obj.say_arrow()  
// {}
// undefined
```

---

#### DOM中的箭头函数this指向

```html
<div></div>
    
<script>
		let div = document.querySelector('div');
    div.addEventListener('click', function() {
            console.log(this);
    })
</script>

// <div></div>
```



```html
<div></div>

<script>
  	let div = document.querySelector('div');
    div.addEventListener('click', () => {
            console.log(this);
    })
</script>

//  window
```





## 面向对象

面向对象就是创建一个公共的**类**，

然后通过**实例化**这个类，得到**实例化对象**



### ES5中的构造函数

```js
function Student(name) {
    this.name = name;

    this.say = function() {
        console.log(this.name);
    }
}

var andy = new Student('andy');
andy.say()  // andy
```

---

#### 实例方法 实例属性

只有实例化对象可调用的属性和方法

用`prototyp`在构造函数外面定义(追加) 实例方法和属性

```js
function Fn(){};

构造函数名.prototype.变量名 = 值;

构造函数名.prototype.方法名 = function(){ }；
```

```js
实例对象.实例方法名();
```

如下：

```js
function Student(name) {
    this.name = name;
    this.say = function() {
        console.log(this.name);
    }
}

Student.prototype.id = 100;
Student.prototype.say_hello = function() {
    console.log('hello');
}

var andy = new Student('andy');
console.log(andy.id);  // andy
andy.say_hello()  //hello
```

---

#### 静态方法 静态属性

构造函数自身的，不用实例化就能调用的

给构造函数定义静态方法和属性时，要在构造函数外面定义

```js
function Fn(){};

构造函数名.变量名 = 值;

构造函数名.方法名 = function(){ }
```

```js
构造函数名.静态方法();
```

如下：

```js
function Student(name) {
    this.name = name;
    this.say = function() {
        console.log(this.name);
    }
}

Student.id = 100;
Student.say_hello = function() {
    console.log('hello');
}
console.log(Student.id);
Student.say_hello()
```



### ES6中的class

ES6中使用class定义类

```js
class Student {
    constructor(name, age) {
        this.name = name;    // 实例属性
        this.age = age;			 // 实例属性
    }
    say() {
        console.log('hello');
    }
}
let andy = new Student('andy', 28)
andy.say()
```

---

构造器函数`constructor`在定义类的时候就执行了

验证如下

```js
class Student {
    constructor() {
        console.log(111);
    }
}

// 111
```

所以`constructor`里可以定义初始属性，实例化属性，

或行一些默认操作，比如加载

---

#### 实例方法 实例属性

只有实例化对象可调用的属性和方法

实例属性用`this.实例属性名	`在constructor构造函数中定义

实例方法在类中直接定义

```js
class Fn{
  constructor(){
    this.实例化属性 = 值；
  }
  
  实例化方法名(){}
}
```

---

#### 静态方法 

不用通过实例对象，类自身就可以调用的方法

类定义静态方法时，要在类的里面定义

```js
class Fn{
  constructor(){}
  
  static 方法名(){}
}
```

```js
类名.静态方法名();
```

如下：

```js
class Student {
    constructor() {}
  
    static say_hello() {
        console.log('hello');
    }
}

Student.say_hello()
// hello
```

---

#### 静态属性

不用通过实例对象，类自身就可以调用的属性

使用static.静态属性名在类中定义

```js
class Fn{
  constructor(){}
  
  static 属性名
}
```

如下：

```js
class Student {
    constructor() {}
  
    static id = 100;
}
console.log(Student.id);
// 100
```

或在类的外面定义

```js
class Fn{}
Fn.静态属性名
```

如下：

```js
class Student {
    constructor() {}
}
Student.id = 100;

console.log(Student.id);
//100
```



### 类的的继承

简写了代码的重复，提高代码的复用

类使用` extends`继承另一个类

```js
class 父类{ };

class 子类 extends 父类{ }
```

如下，`class Cat`里的内容和`class Animal`有重复，但又含有自己独有的内容，则此时可让`class Cat`继承`Class Animal`，然后在写自己独有的内容

```js
class Animal {
    constructor(name) {
        this.name = name;
    }
    say() {
        console.log(`my name is ${this.name}`);
    }
    static show() {
        console.log('i anm an animal');
    }
};

class Cat {
    constructor(name) {
        this.name = name;
    }
    say() {
        console.log(`my name is ${this.name}`);
    }
    static show() {
        console.log('i can eat');
    }
    clolr() {
        console.log('my color is white');
    }
}
```

父类的实例属性、实例方法、静态属性、静态方法都被子类继承

如下：

```js
class Animal {
    constructor(name) {
        this.name = name;
    }
    say() {
        console.log(`my name is ${this.name}`);
    }
    static show() {
        console.log('i am an animal');
    }
};

class Cat extends Animal {
    color() {
        console.log('my color is white');
    }
}

Cat.show()
// i am an animal
let tom = new Cat('tom');
tom.say();
// my name is tom
tom.color();
// my color is white
```

子类的`Cat`可以使用父类`Animal`里的**所有内容**

---

#### 子类定义同名实例方法

如果子类中有和父类中方法同名的方法，则子类方法会 **重写** 父类方法，

对象调用的是子类中过的方法

**子类自己没有就用父类的，自己有就优先用子类自己的**

如下：

```js
//Cat中也有一个say实例方法

class Animal {
    constructor(name) {
        this.name = name;
    }
    say() {
        console.log(`i am an animal`);
    }
};

class Cat extends Animal {
    say() {
        console.log(`i am a cat`);
    }
}

let tom = new Cat('tom');
tom.say()；
// i am a cat
```



#### 子类定义同名实例属性

**重点**

若**子类中没有`constructr构造函数`**定义实例属性，

则使用父类的实例属性。但是很少有该情况。如下：

```js
class Animal {
    constructor(name) {
        this.name = name;
    }
    say() {
        console.log(this.name);
    }
};

class Cat extends Animal {}

let tom = new Cat('tom');
tom.say()
//tom
```

---

若**子类中有`constructor构造函数`**，

子类的`constructor`会**重写** 继承来的父类的`constructor`，

导致子类的实例对象在调用父类方法时，方法中this指向出错。

如下：要调用的方法中this指向的是父类，

子类构造函数重写父类后this成了指向子类

```js
class Animal {
    constructor(name) {
        this.name = name;
    }
    say() {
        console.log(this.name); 
    }
};

class Cat extends Animal {
    constructor() {
        this.name = name;
    }
}

let tom = new Cat('tom');
tom.say()

//报错
ReferenceError: Must call super constructor in derived class before 
// 提示需要super关键字
  
//本来子类是继承父类的构造函数的实例属性，但是重写覆盖后导致父类的方法找不到这个父类定义的属性了
```

---

所以，为了不重写覆盖，

**只要子类中有`constructor`构造函数，**

**就要用`super() `方法调用父类的`constructor构造函数`**，

若父类的方法中需要参数，

则需要通过`super()`把子类接收的参数 传递给父类的`constror构造函数`

如下：

```js
class Animal {
    constructor(name) {   //接收到子类super()传来的参数
        this.name = name;  //实例化参数
    }
    say() {
        console.log(this.name);  //使用参数
    }
};
class Cat extends Animal {
    constructor(name) {    //接收到实例化对象时传入的参数
        super(name);    //传递给父类构造函数
    }
}

let tom = new Cat('tom');  //调用使用了参数的父类方法

// 'tom'——> 子类constructor的形参——> super()参数——> 
//  ——> 父类constructor的形参 ——> 父类的this.name
```

---

若子类接受多个参数，

要调用的父类方法中没有全部用到这些参数，

可只用`super()`传递父类方法需要的，**用谁就传谁**

如下：

```js
class Animal {
    constructor(name) {
        this.name = name;    
    }
    say() {
        console.log(this.name);  //只需要this.name
    }
};

class Cat extends Animal {
    constructor(name, color) {
        super(name);          //只把name传给了父类
        this.color = color;   //定义的this.color自己用
    }
    getColor() {
        console.log(this.color);
    }
}

let tom = new Cat('tom', 'white');
tom.say()
// tom
tom.getColor()
// white
```

---

若子类中有同名方法，又有自己的构造函数时，

调用同名方法会优先调用自己的方法，重写父类方法

但若子类中有`constructror构造函数`的话，不用`super()`也会报错

如下：

```js
class Animal {
    constructor(name) {
        this.name = name;
    }
    say() {
        console.log(`i am an animal`);
    }
};

class Cat extends Animal {
    constructor(name) {
        this.name = name;
    }
    say() {
        console.log(`i am a cat`);  //重写了继承来的方法
    }
}

let tom = new Cat('tom');
tom.say()
//报错
ReferenceError: Must call super constructor in derived class before 
// 提示需要super关键字
```

可理解为：**按照执行顺序**

只要有继承，调用时会使用继承自父类中的方法和属性，所以，

一旦子类中有`constructror构造函数`就会重写父类的构造函数，导致父类的实例属性的this指向问题，就报错，

必须用`super`调用父类的构造函数，

然后，若发现子类有重写，再会优先调用子类的方法

```js
class Animal {
    constructor(name) {
        this.name = name;
    }
    say() {
        console.log(`i am an animal`);
    }
};

class Cat extends Animal {
    constructor(name) {
        super(name);
    }
    say() {
        console.log(`i am a cat`);
    }
}

let tom = new Cat('tom');
tom.say()
// i am a cat
```





## 模块

开发时因为代码过多，为了方便维护和提高复写（调用），

常采用模块化开发，就是把函数分组后分别放到不同文件中，

然后相互调用





## 数据类型 Set

ES6提供的一个新的数据结构

表示一个无重复值的有序列表

类似数组，但是没有重复的成员，每个成员的值都是唯一的



### 创建 

#### set()

```js
new Set()

new Set(数组)
```

```js
let set = new Set()

console.log(set) // Set(0){ }
console.log(set.size); // 0
console.log(typeof set); // Object
```

通过传入数组方式创建

```js
let set = new Set([1,2,3])

console.log(set); // Set(3) { 1, 2, 3 }
console.log(set.size); // 3
```

重复的成员会被自动过滤掉

```js
let set = new Set([1,2,2,3,4,4])

console.log(set); // Set(4) { 1, 2, 3, 4 }
console.log(set.size); // 4
```

> #### new WeakSet()
>
> ```js
> let weakSet = new WeakSet()
> ```
>
> - 只能传入对象类型的元素
> - 不能迭代
> - 没有forEach()方法
> - 没有size属性





### 集合长度 size

```js
let a = new Set()
console.log(a.size); // 0

let b = new Set([1,2,3])
console.log(b.size); // 3

let c = new Set([1,2,2,3,4,4])
console.log(c.size); // 4
```



### 添加 add

```js
let set = new Set()
console.log(set); // Set(0) {}

set.add(1)
console.log(set); // Set(1) { 1 }
```

重复的成员会被自动过滤掉

```js
let set = new Set()

set.add(1)
set.add(1)
set.add('1')
console.log(set); // Set(2) { 1, '1' }
```

```js
let set = new Set()

set.add({name:'andy'})
console.log(set); // Set(1) { { name: 'andy' } }
```



### 删除 delete

```js
let set = new Set([1,2,3])

console.log(set); // Set(3) { 1, 2, 3 }
set.delete(1)
set.delete(2)
console.log(set); // Set(1) { 3 }
```



### 校验 has

判断是否包含元素

```js
let set = new Set([1,2,3])

console.log(set.has(1)); // true
console.log(set.has('1')); // false
```





### 遍历 forEach( )

```js
let set = new Set(['a', -1, 2, 'c'])

set.forEach((key, value) => {
    console.log(key, value);
    console.log(key==value); // true
})
/*
a a
-1 -1
2 2
c c
*/
```



### 遍历 for in( )

```js
let set = new Set(['a', -1, 2, 'c'])

for(let key of set){
    console.log(key);
}
/*
a
-1
2
c
*/
```





### 转为数组 

#### [...set]

```js
let set = new Set([1,2,2,3,3])

console.log(set); // Set(3) { 1, 2, 3 }
console.log([...set]); // [ 1, 2, 3 ]
```

####  Array.form()

```js
let set = new Set(['a', -1, 2, 'c'])
console.log(set); // Set(4) { 'a', -1, 2, 'c' }

let arr = Array.from(set)
console.log(arr); // [ 'a', -1, 2, 'c' ]
```



### 用途：数组去重复

```js
let arr = [1,1,2,3,4,4]
console.log(arr); // [ 1, 1, 2, 3, 4, 4 ]

let set = new Set(arr)
console.log([...set]); // [ 1, 2, 3, 4 ]
```







## 数据类型 Map

ES6的新数据类型

是键值对的有序列表，键和值是任意数据类型

类似Set，但是存储的是键值对的序列

```js
let map = new Map()
console.log(map); // Map(0) {}
```



### 添加 set

```js
let map = new Map()

map.set('name', 'andy')
console.log(map); // Map(1) { 'name' => 'andy' }
console.log(map.size); // 1
```

重复的成员会被自动过滤掉

```js
let map = new Map()

map.set('name', 'andy')
map.set('name', 'andy')

console.log(map);
// Map(1) { 'name' => 'andy' }
```



### 删除 delete

```js
let map = new Map()


map.set('name', 'andy')
map.set('age', 28)
map.set('gender', '1')
console.log(map); 
// Map(3) { 'name' => 'andy', 'age' => 28, 'gender' => '1' }

map.delete('age')
console.log(map); 
// Map(2) { 'name' => 'andy', 'gender' => '1' }
```



### 获取 get

```js
let map = new Map()

map.set('name', 'andy')
map.set('age', 28)
map.set('gender', '1')

console.log(map.get('name')); // andy
```



### 校验 has

```js
let map = new Map()

map.set('name', 'andy')
map.set('age', 28)
map.set('gender', '1')

console.log(map.has('name')); // true
console.log(map.has('job')); // false
```



### 遍历 forEach

```js
let map = new Map()

map.set('name', 'andy')
map.set('age', 28)
map.set('gender', '1')

map.forEach((key,value)=>{
    console.log(key,value);
})
/*
andy name
28 age
1 gender
*/
```



## 迭代器







# Object.assign()

合并对象，返回一个对象

```js
let obj = Object.assign(对象1，对象2，对象3，...)
```

```js
console.log(Object.assign({ name: 'andy' },{ age: 18 } ));
//{ name: 'andy', age: 18 }
```

---

正确理解为，把后面的对象追加到**第一个对象**中,

**第一个对象也被改变了**，如下：

```js
let obj_1 = {
    name: 'andy',
    age: 28,
    sex: 'male'
}
let obj_2 = {
    name: 'james',
    age: 18,
    english_score: 80,
    math_score: 40
}

let new_obj = Object.assign(obj_1, obj_2)
console.log(new_obj);
/*
{
  name: 'james',
  age: 18,
  sex: 'male',
  english_score: 80,
  math_score: 40
}
*/
console.log(obj_1);
/*{
  name: 'james',
  age: 18,
  sex: 'male',
  english_score: 80,
  math_score: 40
}*/
console.log(obj_2);
/*
{ name: 'james', 
	age: 18, 
	english_score: 80, 
	math_score: 40 
	}*/
```



若对象有**同名属性**，**后面的覆盖前面的**后，再合并

如下：

```js
let obj_1 = {
    name: 'andy',
    age: 28,
}
let obj_2 = {
    name: 'james',
    age: 18,
    english_score: 80,
    math_score: 40
}

let obj = Object.assign(obj_1, obj_2)
console.log(obj);
//#=>
{ name: 'james', 
  age: 18, 
  english_score: 80, 
  math_score: 40 
}
```