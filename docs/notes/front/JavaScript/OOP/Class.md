# Class 类

![](https://res.cloudinary.com/practicaldev/image/fetch/s--9N43FRnT--/c_imagga_scale,f_auto,fl_progressive,h_500,q_auto,w_1000/https://res.cloudinary.com/drquzbncy/image/upload/v1592428177/DEV.TO/jsclass_gyb5kf.jpg)

[[toc]]

## 简介

ES6 提供了 Class 类 这个概念，在面向对象编程中来创建对象模型

可作为 ES5 里 [构造函数](./Prototype.md) 的语法糖

> ES 5 构造器函数创建对象模型
>
> ```js
> function Person(name, age) {
>   this.name = name;
>   this.age = age;
> }
>
> Person.prototype.sayHello = function() {
>   console.log(`hello, I'm ${this.name}`);
> };
>
> let Jack = new Person("Jack", 28);
> console.log(Jack);
> Jack.sayHello();
>
> let Andy = new Person("Andy", 26);
> console.log(Andy);
> Andy.sayHello();
> ```
>
> ES 6 的 Calss 类创建对象模型
>
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

## 创建与使用

1. 通过关键字 `class` 创建类

2. 通过关键字 `new` 创建类的实例对象

```js
class 类名 {}
const 实例对象1 = new 类名();
const 实例对象2 = new 类名();
```

## 内容成员

::: tip 类中成员分为：

- [静态成员](#静态成员)：**类属性、类方法**

  - 通过关键字 `static` 创建

  - 无法被类实例对象获取，只能存在于类本身

- [实例成员](#实例成员)：**实例属性、实例方法**

  - 直接在类中定义

  - 需要创建实例对象后通过实例对象获取

:::

> 如下：
>
> ```js
> class Person {
>   // 静态属性
>   static sex = "male";
>   // 静态方法
>   static sayHello() {
>     console.log("hello");
>   }
>   // 实例属性
>   area = "US";
>   // 实例方法
>   sayArea() {
>     console.log("from US");
>   }
> }
> const Jack = new Person();
>
> console.log(Jack.sex); // undefined
> Jack.sayHello(); // 报错，找不到该方法
>
> console.log(Jack.area); // US
> Jack.sayArea(); // from US
> ```

### 静态成员

::: tip 类的静态成员：

- [静态属性 / 类属性](#静态属性)
- [静态方法 / 类方法](#静态方法)

:::

类的静态成员通过 `static` 创建

无法被`new` 创建的类实例对象获取，只能存在于类本身

> 如下：
>
> ```js
> class Person {
>   static area = "US";
>   static sayHello() {
>     console.log("hello");
>   }
> }
> const Jack = new Person();
> console.log(Jack.area); // undefined
> console.log(Jack.sayHello); // undefined
>
> console.log(Person.area);
> console.log(Person.sayHello);
> ```

---

#### 静态属性

不需要创建实例对象就可以使用的属性

```js
class 类 {
  static 属性 = 值;
}
```

```js
// 或
类.属性 = 值;
```

---

#### 静态方法

不需要创建实例对象就可以使用的方法

```js
class 类 {
  static 方法() {}
}
```

```js
// 或
类.方法 = function() {};
```

### 实例成员

::: tip 类的实例成员：

- [实例属性](#实例属性)
- [实例方法](#实例方法)

:::

类的实例成员直接在类中定义，

需要创建实例对象后通过实例对象获取

> 如下：
>
> ```js
> class Person {
>   area = "US";
>   sayHello() {
>     console.log("hello");
>   }
> }
> const Jack = new Person();
> console.log(Jack.area);
> console.log(Jack.sayHello);
>
> console.log(Person.area); // undefined
> console.log(Person.sayHello); // undefined
> ```

---

#### 实例属性

```js
class 类 {
  属性 = 值;
}
```

不过，实例属性一般不使用固定值，

而是根据 [创建实例对象时传入不同参数 ]()来决定

然后通过 [类的构造器函数 ](#构造器函数)接受参数，并赋值给类的实例属性

```js
class 类 {
  constructor(参数) {
    this.实例属性 = 参数;
  }
}
const 实例对象1 = new 类(参数);
const 实例对象2 = new 类(参数);
```

---

#### 实例方法

```js
class 类 {
  方法() {}
}
```

::: tip 实例方法中的 this

实例方法中的 this 指向方法的调用者<br>
在面向对象编程中操作 DOM 时会需要 **修改 this 的指向**

:::

## 构造器函数

当使用 `new` 创建类实例对象时，类会自动调用 `construcor构造器函数`

::: tip construcor 构造器函数

1. `new` 创建实例对象，传入参数

2. `constructor` 构造器函数接受传入的参数，

3. 然后将接受的参数通过 `this` 赋值给类实例属性

```js
class 类 {
  constructor(参数) {
    this.实例属性 = 参数;
  }
}
const 实例对象1 = new 类(参数);
const 实例对象2 = new 类(参数);
```

:::

> 如下：
>
> ```js
> class Person {
>   constructor(name, age) {
>     this.username = name;
>     this.age = age;
>   }
> }
> const andy = new Person("andy", 28);
> const tom = new Person("tom", 10);
>
> console.log(andy.username, andy.age);
> // andy 28
> console.log(tom.username, tom.age);
> // tom 10
> ```

## 类中的 this

### this 指向

::: tip 类中 this 的指向

- **constructor 构造器函数中**：<br>
  this 指向实例对象本身

- **实例方法函数中**：<br>
  this 指向该函数方法的调用者<br>
  会出现需要修改 this 指向并不为类本身
  > 比如：操作 DOM 、组件化开发时
  >
  > ```js
  > class Person {
  >   constructor() {
  >     this.msg = "hello";
  >     this.btn = document.getElementById("btn");
  >     this.btn.addEventListener("click", this.fun);
  >   }
  >   fun() {
  >     console.log(this); // DOM元素
  >     console.log(this.msg); // undefined
  >   }
  > }
  > const Jack = new Person();
  > ```

:::

### 修改实例方法中 this 指向

可通过 **`bind()`** 或 **箭头函数** 修改 this 指向，

详见 [React 类组件中修改类实例方法的 this 指向](../../React/Component-Class.md)

#### bind()

> 如下：
>
> ```js
> class Person {
>   constructor() {
>     this.msg = "hello";
>     this.btn = document.getElementById("btn");
>     this.btn.onclick = this.fun.bind(this);
>   }
>   fun() {
>     console.log(this); // 实例对象
>     console.log(this.msg);
>   }
> }
>
> const Jack = new Person();
> ```
>
> 再比如，React 组件化开发中
>
> ```jsx
> import React, { Component } from "react";
>
> export default class Demo extends Component {
>   constructor() {
>     state = {
>       msg: "hello",
>     };
>     this.showMsg = this.showMsg.bind(this);
>   }
>
>   showMsg() {
>     console.log(this.msg);
>   }
>
>   render() {
>     return <button onClick={this.showMsg}>显示信息</button>;
>   }
> }
> ```

---

#### 箭头函数

> 如下：
>
> ```js
> class Person {
>   constructor() {
>     this.msg = "hello";
>     this.btn = document.getElementById("btn");
>     this.btn.onclick = () => this.fun();
>   }
>   fun() {
>     console.log(this); // 实例对象
>     console.log(this.msg);
>   }
> }
> const Jack = new Person();
> ```
>
> 或，直接用箭头函数定义实例方法函数：
>
> ```js
> class Person {
>   constructor() {
>     this.msg = "hello";
>     this.btn = document.getElementById("btn");
>     this.btn.onclick = this.fun;
>   }
>   fun = () => {
>     console.log(this); // 实例对象
>     console.log(this.msg);
>   };
> }
>
> const Jack = new Person();
> ```

## 类的继承

继承是指：

一个通用的类（**父类**）中的属性和方法可以被其他类（**子类**）中使用

### extends 关键字

子类通过使用关键字 `extends` 继承父类

子类会继承父类中的所有属性和方法

```js
class Father {}

class Son extends Father {}
```

### 子类继承父类构造器函数

子类继承了父类后会继承父类的构造器函数，也继承了其中对实例属性的定义的逻辑，所以子类不写构造器函数定义实例属性也可以使用通过父类定义的实例属性

> 如下：子类没有定义实例属性的逻辑，但是因为继承了父类，便可使用父类中的逻辑
>
> ```js
> class Father {
>   constructor(name, age) {
>     this.name = name;
>     this.age = age;
>   }
> }
>
> class Child extends Father {
>   say() {
>     console.log(`hello, i'm ${this.name}`);
>   }
> }
>
> const Jack = new Child("Jack", 28);
> Jack.say(); // hello, i'm Jack
> ```

### 子类重写父类同名方法

若子类中有和父类同名的方法，会重写

不是修改父类的方法，是该方法在被调用时会优先使用子类的

> 如下：
>
> ```js
> class Father {
>   fn() {
>     console.log(11111);
>   }
> }
>
> class Son extends Father {
>   fn() {
>     console.log(22222);
>   }
> }
>
> var son = new Son();
> son.fn(); // 222222
> ```

### super 关键字

用来调用父类中的方法

```js
class 子类 extends 父类 {
  子类方法() {
    super.父类方法();
  }
}
```

> 如下：
>
> ```js
> class Father {
>   say() {
>     console.log("from Father");
>   }
> }
>
> class Son extends Father {
>   fn() {
>     super.say();
>   }
> }
>
> var son = new Son();
> son.fn(); // from Father
> ```

### super() 调用父类构造器

若子类除了继承父类构造函数定义的实例属性外，自己也定义实例属性，则必须使用 `super()` 调用父类构造器函数：

::: tip

1. 子类在创建实例对象时要接受父类构造器会用到的的参数，

2. 在子类的构造器函数中先通过 **`super()`** 调用父类构造器，<br>
   且 `super()` **必须放在子类的构造器函数中最前面**

3. 将父类中会用到的数据作为`super()` 的参数传入父类的构造器函数

4. 最后再进行子类自己的定义实例属性的逻辑

:::

> 如下：
>
> ```js
> class Father {
>   constructor(name, age) {
>     this.name = name;
>     this.age = age;
>   }
>   say() {
>     console.log(`i am ${this.name}`);
>   }
> }
>
> class Child extends Father {
>   constructor(name, age, sex, country) {
>     // 父类中用到了 name、age
>     super(name, age);
>     this.sex = sex;
>     this.country = country;
>   }
>
>   sayCountry() {
>     console.log(`i am from ${this.country}`);
>   }
> }
>
> const Jack = new Child("Jack", 28, "male", "US");
> console.log(Jack);
> Jack.say();
> Jack.sayCountry();
> ```

::: tip 为何子类写了构造器时必须要写 super()：

因为子类同名方法重写的特征，子类中若写了 `constructor` 构造函数会因为**方法重写导致无法继承**父类中的构造函数<br>
所以必须要需要通过 **`super()` 来调用父类的构造器函数**

:::
