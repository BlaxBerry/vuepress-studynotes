# TS 类

![img](https://cdn-ssl-devio-img.classmethod.jp/wp-content/uploads/2020/09/typescript.png)

[[toc]]

## 简介

TS 是 JS 的扩展，所以 Class 类的语法与 JS 几乎一致，[详见跳转](../../JavaScript/OOP/Class.md)

不同的是 TS 提供了类型的修饰符来限制保护类中属性与方法

::: tip 类型修饰符

- **public**（公有）：默认，任意位置都可访问
- **private** （私有）：仅在当前类的内部可访问
- **protected**（保护）：仅在当前类、其子类内部可访问

:::

<br/>

## 属性

### 类属性

同 JavaScript

定义在实例对象上的属性

必须通过实例对象才能在类外部使用

```tsx
class MyClass {
  a: string = "hello";
  b: number = 100;
}

const instance = new MyClass();
console.log(instance.a);
console.log(instance.b);
```

---

### 静态属性 ( static )

同 JavaScript

`static` 标记的属性不需要创建实例对象就可在类外部使用

```tsx
class MyClass {
  static a: string = "hello";
  static b: number = 100;
}

console.log(MyClass.a); // hello
console.log(MyClass.b); // 100
```

---

### 私有属性 ( private )

`private` 标记的属性只能在类内部被访问使用

```tsx
class MyClass {
  private myName: string = "";
  private myAge: number = 10;
}
```

父类中的私有属性不会被子类继承

```tsx
class Father {
  private a: number = 100;
}

class Child extends Father {
  constructor() {
    super();
    console.log(this.a); // 报错，属性 a 为私有属性，只能在类 Father 中访问
  }
}

new Child();
```

---

### 共有属性 ( public )

属性的默认类型

---

### 保护属性 ( protected )

`protected` 标记的属性与私有属性 `private` 几乎相同，

但不同的是在类继承时父类中的保护属性可以在子类中访问使用

```tsx
class Father {
  protected a: number = 100;
}

class Child extends Father {
  constructor() {
    super();
    console.log(this.a); // 100
  }
}
```

---

### 只读 ( readonly )

```tsx
class MyClass {
  a: string = "hello";
  readonly b: number = 100;
}

const instance = new MyClass();

console.log(instance.a); // hello
instance.a += " world";
console.log(instance.a); // hello world

console.log(instance.b); // 100
instance.b += 1; // 报错，无法分配到 b ，因为它是只读属性
```

也可与其他修饰符连用，但 `readonly` 必须放在其余修饰符的后面

```tsx
class MyClass {
  static readonly a: number = 200;
  private readonly b: number = 300;
  public readonly c: number = 400;
}
```

<br/>

## 方法

### 构造函数

同 JavaScript

```tsx
class MyClass {
  a: string;
  b: number;

  constructor(a: string, b: number) {
    this.a = a;
    this.b = b;
  }
}
const instance = new MyClass("hello", 100); // hello 100 true
console.log(instance.b); // 100
```

也可在 `constructor()` 的形参处接收同时定义属性类型

```tsx
class MyClass {
  constructor(
    private a: string,
    public b: number,
    protected c: boolean = true
  ) {
    console.log(a, b, c);
  }
}
const instance = new MyClass("hello", 100); // hello 100 true
console.log(instance.b); // 100
```

---

### 实例方法

同 JavaScript

定义在实例对象上的方法

必须通过实例对象才能在类外部使用

```tsx
class MyClass {
  func() {
    console.log("hello");
  }
}

const instance = new MyClass();
instance.func(); // hello
```

---

### 静态方法 ( static )

同 JavaScript

`static` 标记的方法不需要创建实例对象就可在类外部使用

```tsx
class MyClass {
  static func() {
    console.log("hello");
  }
}

MyClass.func(); // hello
```

---

### 私有方法 ( private )

`private` 标记的方法只能在类内部被访问使用

```tsx
class MyClass {
  constructor() {
    this.func();
  }
  private func() {
    console.log("hello");
  }
}

new MyClass(); // hello
```

父类中的私有方法不会被子类继承

```tsx
class Father {
  private func() {
    console.log("hello");
  }
}

class Child extends Father {
  constructor() {
    super();
    this.func(); // 属性 func 为私有属性，只能在类 Father 中访问
  }
}

new Child();
```

---

### 共有方法 ( public )

方法的默认类型

---

### 保护方法 ( protected )

`protected` 标记的方法与私有属性 `private` 几乎相同，

但不同的是在类继承时父类中的保护属性可以在子类中访问使用

```tsx
class Father {
  protected func() {
    console.log("hello");
  }
}

class Child extends Father {
  constructor() {
    super();
    this.func();
  }
}

new Child(); // hello
```

<br/>

## 继承

同 JavaScript

子类通过 **`extends`** 继承父类中除 [私有属性](https://blaxberry.github.io/vuepress-studynotes/notes/front/TypeScript/Basic/Class/Class.html#私有属性-private) 与 [私有方法](https://blaxberry.github.io/vuepress-studynotes/notes/front/TypeScript/Basic/Class/Class.html#私有方法-private) 外的所有内容

并且在子类的构造函数的最开始必须要使用 `super()`

```tsx
class Father {
  private a: number = 100;
  public b: number = 200;
  protected c: number = 300;
  static e: number = 400;

  private f_a() {
    console.log("A");
  }
  public f_b() {
    console.log("B");
  }
  protected f_c() {
    console.log("C");
  }
  static f_e() {
    console.log("E");
  }
}

class Child extends Father {
  constructor() {
    super();
    // console.log(this.a);  //  报错，属性 a 为私有属性，只能在类 Father 中访问
    console.log(this.b); // 200
    console.log(this.c); // 300
    console.log(Child.e); // 400

    // this.f_a()  //  报错，属性 f_a 为私有属性，只能在类 Father 中访问。
    this.f_b(); // B
    this.f_c(); // C
    Child.f_e(); // E
  }
}

const instance = new Child();
```

<br/>

## 抽象类

抽象类是一个**不能创建实例对象，仅能被其它类继承**的父类（基类）

类似于 [接口 interface](../Interface/Interface.md)，但不同的是抽象类中的属性和方法可以有实质的值与函数体

通过关键字 `abstract` 创建

```tsx
abstract class Father {}

class A extends Father {
  constructor() {
    super();
  }
}
class B extends Father {
  constructor() {
    super();
  }
}
```

---

### 抽象方法 ( abstract )

抽象类中可以定义抽象方法，抽象方法没有函数体（函数体由子类重写）

**抽象方法的作用相似接口**，继承抽象类的子类中必须定义和重写抽象方法

```tsx
abstract class 抽象类 {
  abstract 抽象方法名(): 返回值类型;
}
class 子类 {
  constructor() {
    super();
  }
  抽象方法名(): 返回值类型 {
    // 函数体
    // return 返回值
  }
}
```

```tsx
abstract class Father {
  a: number = 100;

  abstract f_a(): void;
  abstract f_b(): number;
}

class Child_A extends Father {
  constructor() {
    super();
  }
  f_a(): void {
    console.log("A");
  }
  f_b(): number {
    return this.a;
  }
}

class Child_B extends Father {
  constructor() {
    super();
  }
  f_a(): void {
    console.log("A");
  }
  f_b(): number {
    return this.a;
  }
}
```

<br/>

## 接口

### 类实现接口 ( implements )

不同类之间可以有一些共有的特性，可以共同的特性提取成 [接口 interface](../Interface/Interface.md)

类通过 **关键字 `implements`** 继承一个或多个接口，多个接口用逗号隔开

```tsx
interface 接口 {
  属性: 类型;
}

class 类 implements 接口 {
  接口中的属性: 类型;
}
```

```tsx
interface Str {
  str: string;
}
interface Num {
  num: number;
}

class MyClass implements Str, Num {
  str: string = "";
  num: number = 100;
}
```

类可同时继承类和实现接口

```tsx
interface 接口 {
  属性: 类型;
}

class 父类 {}

class 子类 extends 父类 implements 接口 {
  接口中的属性: 类型;
}
```

---

### 接口继承类 ( extends )

类也可以被接口继承

```tsx
interface 接口 extends 类 {
  属性: 类型;
}
```

```tsx
class Point {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

interface Point3d extends Point {
  z: number;
}

const points: Point3d = { x: 1, y: 2, z: 3 };
```
