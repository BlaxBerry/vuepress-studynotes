# 构造函数

![](https://blog.alexdevero.com/wp-content/uploads/2021/04/05-04-21-getting-started-with-javascript-constructor-functions-blog.jpg)

[[toc]]

## 构造函数简介

面向对象 OOP 语言中都有类的概念，JavaScript ES6 之前没有类这一概念，

ES5 是通过 **构造函数** 和 **[原型对象](#原型对象)** 来创建泛指的对象模版，并通过实例化构造函数来创建对象

### 创建和实例化

::: tip 构造函数：

- 构造函数首字母要大写
- 构造函数不需要 `return` 就可返回结果，返回一个对象
- 通过 `new` 创建实例对象并传递参数

:::

```js
function 构造函数(参数) {
  this.实例属性 = 值;
}
构造函数.prototype.实例方法 = function() {};

const 实例对象01 = new 构造函数(参数);
const 实例对象02 = new 构造函数(参数);
```

> 如下：
>
> ```js
> function Person(name) {
>   this.name = name;
> }
> Person.prototype.say = function() {
>   console.log("hello");
> };
>
> const Jack = new Person("Jack");
> const Andy = new Person("ANdy");
>
> console.log(typeof Jack); // object
> ```

### 构造函数成员

::: tip 构造函数内部成员

- **[静态成员](#静态成员)：**

  直接给构造函数添加的静态属性、静态方法

  静态成员只能通过构造函数来访问

- **[实例成员](#实例成员)：**

  构造函数内通过 `this` 创建的实例属性

  实例方法要追加到构造函数的 **原型对象 `prototype`** 上

  实例成员只能通过实例化对象来访问

:::

---

#### 静态成员

直接给构造函数添加的属性、方法

静态成员只能通过构造函数来访问

```js
function 构造函数() {}
构造函数.静态属性 = 值;
构造函数.静态方法 = function() {};

console.log(构造函数.静态方法);
构造函数.静态方法();
```

---

#### 实例成员

构造函数内通过 `this` 创建的属性和定义在构造函数原型上的方法

> 实例方法应该定义到构造函数的 **原型 prototype** 上，
>
> 而不是通过 `this` 创建到构造函数内部
>
> 因为会造成 [内存浪费问题](#内存浪费问题)

实例成员只能通过 `new` 创建的实例对象来访问

```js
function 构造函数() {
  this.实例属性 = 值;
  // this.实例方法 = function(){}; // 不应该
}
构造函数.prototype.实例方法 = function() {};

const 实例对象 = new 构造函数();

console.log(实例对象.实例属性);
实例对象.实例方法();
```

> 如下：
>
> ```js
> function Person(name) {
>   this.name = name;
> }
> Person.prototype.say = function() {
>   console.log(`i am ${this.name}`);
> };
> Person.prototype.sing = function(song) {
>   console.log(`i am sing ${song}`);
> };
>
> const Jack = new Person("Jack");
> const Andy = new Person("ANdy");
>
> console.log(Jack.name);
> console.log(Andy.name);
>
> Jack.say();
> Andy.say();
>
> Jack.sing("好运来");
> Andy.sing("好运来");
> ```

### 内存浪费问题

若实例方法**直接定义在构造函数内，会导致内存浪费问题**

即每创建一个对象就要开辟一个内存空间存放实例方法

> 验证：比较的是地址，存放地址不同
>
> ```js
> function Person() {
>   this.say = function() {
>     console.log("hello");
>   };
> }
> const Jack = new Person();
> const Andy = new Person();
>
> console.log(Jack.say == Andy.say); // false
> ```

明明处理代码相同但是还要另外开辟空间存放，不科学

所以，实例方法不应该通过 `this` 创建到构造函数内部，而是定义到构造函数的 **原型 prototype** 上实现实例对象共享实例方法

> 验证：比较的是地址，存放地址相同
>
> ```js
> function Person() {}
> Person.prototype.say = function() {
>   console.log("hello");
> };
> const Jack = new Person();
> const Andy = new Person();
>
> console.log(Jack.say == Andy.say); // true
> ```

## 原型对象、原型

### 原型对象 prototype

JS 的每一个构造函数都有一个对象属性 `prototype` （原型对象）

`prototype` 这个对象上的方法会被构造函数所拥有，且被构造函数创建的实例对象共享

构造函数的实例方法应该定义到构造函数的 `prototype` 这个对象属性上，使得实例方法可以被构造函数创建的实例对象共享，如此一来不必单独开辟内存空间从而解决了上文的 [内存浪费问题](#内存浪费问题)

```js
function 构造函数() {}
构造函数.prototype.实例方法 = function() {};

const 实例对象01 = new 构造函数();
const 实例对象02 = new 构造函数();
```

::: warning 不应该：

```js
function Person(name) {
  this.name = name;

  this.say = function() {
    console.log(`i am ${this.name}`);
  };
  this.sing = function(song) {
    console.log(`i am sing ${song}`);
  };
}

const Jack = new Person("Jack");
const Andy = new Person("ANdy");

Jack.say();
Andy.say();

Jack.sing("好运来");
Andy.sing("好运来");
```

:::

::: tip 应该：

```js
function Person(name) {
  this.name = name;
}
Person.prototype.say = function() {
  console.log(`i am ${this.name}`);
};
Person.prototype.sing = function(song) {
  console.log(`i am sing ${song}`);
};

const Jack = new Person("Jack");
const Andy = new Person("ANdy");

Jack.say();
Andy.say();

Jack.sing("好运来");
Andy.sing("好运来");
```

:::

### 对象的原型 \_\_proto\_\_

JS 的每一个对象都有一个对象属性 `__proto__` （原型）

对象上的原型 `__proto__` 等价于 构造函数的`prototype`原型对象

> `__proto__` 这个对象指向了创建当前实例对象的构造函数的`prototype`原型对象，
>
> 实例对象可以通过原型 `__proto__` 访问到构造函数的`prototype`原型对象
>
> 所以各个实例对象可以共享定义到构造函数`prototype`原型对象上的实例方法

```js
function 构造函数() {}
构造函数.prototype.实例方法 = function() {};

const 实例对象 = new 构造函数();

console.log(实例对象.__proto__ === 构造函数.prototype); // true
console.log(实例对象.__proto__.constructor === 构造函数); // true
```

> 如下：
>
> ```js
> function Person() {
>   this.msg = "人";
> }
> Person.prototype.say = function() {
>   console.log("hello");
> };
>
> const Jack = new Person();
>
> console.log(typeof Jack.__proto__); // object
>
> console.log(Jack.__proto__ === Person.prototype); // true
> console.log(Jack.__proto__.constructor === Person); // true
> ```

原型 `__proto__` 只是 JS 提供给对象的查找机制，实际开发中不能直接使用

> 当实例对象使用实例方法时，JS 会先检查对象上是否有该方法，
>
> 若没有就从 `__proto__` 上查找
>
> 详见 [原型链](#原型链)

### 构造函数 constructor

对象原型`___proto__` 和 构造函数原型对象`prototype` 都有一个 `constructor` 属性

`constructor` 属性指向构造函数本身，用来记录对象原型和原型对象来于哪一个构造函数

```js
function Person() {}
console.log(Person.prototype.constructor === Person); // true

const Jack = new Person();
console.log(Jack.__proto__.constructor === Person); // true
```

`constructor` 属性也可用于手动设定对象原型和原型对象指向的构造函数，特别是修改了原型对象 `prototype` 并了赋值一个对象的场合，需要手动将 `constructor` 属性 指回原来的构造函数

> 如下：
>
> 当对象覆盖了构造函数的 `prototype` 时，会导致原来里面的 `constructor` 属性没了，又因为对象原型`___proto__` 指向构造函数的 `prototype` ，所以对象原型和原型对象的 `constructor` 属性便都不再指向原来的构造函数了
>
> ```js
> function Person() {}
>
> Person.prototype = {
>   sayHello() {
>     console.log("hello");
>   },
> };
>
> const Jack = new Person();
>
> console.log(Person.prototype.constructor === Person); // false
> console.log(Jack.__proto__.constructor === Person); // false
> ```
>
> 此时需要手动指定 `constructor` 属性 **指回原来的构造函数**：
>
> ```js
> function Person() {}
>
> Person.prototype = {
>   constructor: Person,
>   sayHello() {
>     console.log("hello");
>   },
> };
>
> const Jack = new Person();
>
> console.log(Person.prototype.constructor === Person); // true
> console.log(Jack.__proto__.constructor === Person); // true
> ```

### 原型链

因为每一个对象都有一个原型 `__proto__` 属性，每一个原型又指向其构造函数的原型对象 `prototype` ，因此可以从一个对象沿着 `__proto__` 属性向上一直到 `null`，如此一层一层向上的原型被称为 **原型链**

<img src="https://djcodes.files.wordpress.com/2015/11/protodiagram1.png" style="zoom:50%;" />

::: tip 原型链：

1. 构造函数创建的实例对象有一个 `__proto__` 属性

   该 `__proto__` 属性指向构造函数的原型对象 `prototype`

2. 构造函数的原型对象 `prototype` 也有一个 `__proto__` 属性

   该 `__proto__` 属性指向 `Object构造函数` 的原型对象 `prototype`

3. `Object构造函数` 也有一个 `__proto__` 属性

   该 `__proto__` 属性指向 `null`

```js
function Person() {}

const Jack = new Person();

// 1.
console.log(Jack.__proto__ == Person.prototype);

// 2.
console.log(Jack.__proto__.__proto__ === Object.prototype);

// 3.
console.log(Jack.__proto__.__proto__.__proto__ === Object.prototype.__proto__);
```

:::

::: tip JavaScript 的成员查找规则（原型链）

JS 中当访问一个对象的属性/方法时：

1. 先检查对象上是否有该成员

2. 若有优先使用对象自身的成员

3. 若没有，就从当前对象的原型 `__proto__` 上查找<br>
   （指向 `prototype` 原型对象）

4. 若还没有，就从 `prototype` 原型对象的原型 `__proto__` 上查找

   ....

   一直查找到 `Object` 的 `prototype` 原型对象为止 （null）

   若还没有，则返回 `undefined`

:::

### this 指向

- 构造函数中的 `this` ：指向实例对象

  ```js
  function Person(name) {
    this.name = name;
    this.fun = function() {
      console.log(this);
    };
  }

  const Jack = new Person("Jack");
  Jack.fun();
  ```

- 构造函数原型对象 `prototype` 中的 `this` ：指向调用者

  但因为一般都是实例对象调用，所以最终也指向实例对象

  ```js
  function Person(name) {
    this.name = name;
  }
  Person.prototype.fun = function() {
    console.log(this);
  };

  const Jack = new Person("Jack");
  Jack.fun();
  ```

### prototype 扩展内置对象方法

原型对象可应用于扩展 JavaScript 内置对象上的方法

> 比如：给 JS 的内置对象 Array 上追加一个方法 sum
>
> ```js
> console.log(Array.prototype);
>
> Array.prototype.sum = function() {
>   let sum = 0;
>   for (let i = 0; i < this.length; i++) {
>     sum += this[i];
>   }
>   return sum;
> };
>
> let arr = new Array(1, 2, 3);
> console.log(arr.sum());
> ```
>
> 但是注意，千万不能用赋值一个对象的的方法覆盖内置对象的 prototype，否则会丢失内置对象的默认方法

## 继承

ES6 之前通过 **[构造函数](#构造函数简介) + [原型对象](#原型对象)** 来实现继承（组合继承）

### call()

修改函数内 this 的指向，并调用该函数

```js
函数.call(this的指向, 参数, 参数);
```

### 子继承父属性

利用 `call()` 调用父构造函数，并修改 this 指向为子构造函数

```js
function 父构造函数(参数) {
  this.父实例属性 = 参数;
}

function 子构造函数(参数, 参数) {
  父构造函数.call(this, 参数);
  this.子实例属性 = 参数;
}

const 子实例对象 = new 子构造函数(参数, 参数);
```

### 子继承父方法

实例方法是被定义到了构造函数的原型对象 `prototype` 上

所以需要创建父构造函数的实例对象并赋值给子构造函数的原型对象

参考[原型链](#原型链)

```js
子构造函数.prototype = new 父构造函数();
子构造函数.prototype.constructor = 子构造函数;
```

```js
function 父构造函数() {}
父构造函数.prototype.实例方法 = function() {};

function 子构造函数() {
  父构造函数.call(this);
}
子构造函数.prototype = new 父构造函数();
子构造函数.prototype.constructor = 子构造函数;

子构造函数.prototype.实例方法 = function() {};

const 子实例对象 = new 子构造函数();
```

> 如下：
>
> ```js
> function Father(name, age) {
>   this.name = name;
>   this.age = age;
> }
> Father.prototype.say = function() {
>   console.log("hello");
> };
>
> function Child(name, age, sex, country) {
>   Father.call(this, name, age);
>   this.sex = sex;
>   this.country = country;
> }
> Child.prototype = new Father();
> Child.prototype.constructor = Child;
>
> Child.prototype.sayName = function() {
>   console.log(`i am ${this.name}`);
> };
>
> const Jack = new Child("Jack", 28, "male", "US");
> console.log(Jack);
>
> Jack.sayName();
> Jack.say();
> ```

::: danger

但不能将父构造函数的原型对象直接赋值给子构造函数的原型对象

```js
子构造函数.prototype = 父构造函数.prototype;
```

不然修改子构造函数的原型对象时父构造函数的原型对象也会被修改

:::

## ES6 Class 类

ES5 提供了[Class 类](./ES6+/Class.md) 这个概念，可作为 ES5 构造函数的语法糖

使 JS 的对象原型写法更清晰更像面向对象编程的语法

> ```js
> class Person {
>   constructor(name, age) {
>     this.name = name;
>     this.age = age;
>   }
>   sayHello() {
>     console.log(`hello, I'm ${this.name}`);
>   }
> }
>
> const Jack = new Person("Jack", 28);
> console.log(Jack);
> Jack.sayHello();
>
> const Andy = new Person("Andy", 26);
> console.log(Andy);
> Andy.sayHello();
> ```
