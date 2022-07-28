# TS 泛型

![img](https://cdn-ssl-devio-img.classmethod.jp/wp-content/uploads/2020/09/typescript.png)

[[toc]]

## 简介

泛型（范围广泛・泛指的类型）也是个类型，指不在确定类型时指定的类型

泛型可视为**占位符**，常用 **\<T>、\<K>、\<V>、\<E>** 等表示

```tsx
<自定义泛型名>

<自定义泛型名, 自定义泛型名>
```

::: tip 常用泛型名

**\<T>** ：（Type）类型<br/>
**\<T>** ：（Key）对象键值对的键<br/>
**\<V>** ：（Value）对象键值对的值<br/>
**\<E>** ：（Element）元素类型

:::

> 如下：以函数为例
>
> ```tsx
> // 定义时无法确定参数与返回值的类型
> function func(params) {
>   return params;
> }
> func(100);
> func("hello");
> func(true);
> ```
>
> ```tsx
> // 使用泛型 <T> 之后，类型取决于每次函数调用时指定的类型
> function fn<T>(params: T): T {
>   return params;
> }
> fn<number>(1);
> fn<string>("xxx");
> ```

<br/>

## 使用

泛型指定的的类型是动态的，在定义时不确定在调用传值时指定后才能确定

---

### 泛型函数

```tsx
// 普通函数
function 函数<泛型>(参数: 泛型): 泛型 {
  return 返回值;
}
// 箭头函数
const 函数 = <泛型>(参数: 泛型): 泛型 => 参数;
```

```tsx
函数<类型A>(实参);
函数<类型B>(实参);
function func<T>(params: T): T {
  return params;
}
func<number>(1);
func<string>("xxx");

const func = <T>(params: T): T => params;
func<number>(1);
func<string>("xxx");
```

---

### 泛型类

```tsx
class 类<泛型> {
  类属性: 泛型;
  constructor(参数: 泛型) {
    this.类属性 = 参数;
  }
}
const 实例对象 = new 类<类型A>(实参);
const 实例对象 = new 类<类型B>(实参);
```

> 如下：

```tsx
class MyClass<T> {
  params: T;
  constructor(params: T) {
    this.params = params;
  }
}
new MyClass<string>("hello");
new MyClass<number>(100);
new MyClass<boolean>(true);
```

> 如下：

```tsx
type PersonType = {
  name: string;
  age: number;
};

class Group<G> {
  constructor(private group: Array<G>) {
    this.group = group;
  }
  choose(index: number): G {
    return this.group[index];
  }
}

const group = new Group<PersonType>([
  { name: "Jack", age: 28 },
  { name: "Tom", age: 17 },
]);
const p_1 = group.choose(1);
console.log(p_1.name); // Tom
```

---

### 泛型接口

```tsx
interface 接口名<泛型A, 泛型B> {
  属性: 类型;
  属性: 泛型A;
  属性: 泛型B;
}

const 变量: 接口名<类型, 类型> = 数据;
```

```tsx
interface Person<T, K, P> {
  name: T;
  age: K;
  skills: Array<P>;
}

type Skillstype = {
  name: string;
  level: number;
};

const jack: Person<string, number, Skillstype> = {
  name: "Jack",
  age: 28,
  skills: [
    { name: "React", level: 1 },
    { name: "Vue", level: 2 },
  ],
};
```

---

### 泛型类型

```tsx
type 类型别名<泛型A, 泛型B> = {
  属性: 类型;
  属性: 泛型A;
  属性: 泛型B;
};

const 变量: 类型别名<类型A, 类型B> = 数据;
```

```tsx
type Type<T, U> = {
  name?: T;
  age?: U;
};

const a: Type<string, number> = { name: "Jack" };
const b: Type<string, number> = { age: 27 };
```

```tsx
type IsString<T> = T extends string ? true : false;

type I0 = IsString<number>; // false
type I1 = IsString<"abc">; // true
type I2 = IsString<any>; // boolean
type I3 = IsString<never>; // never
```

<br/>

## 范围约束 ( extends )

泛型相当于范围很广泛的动态类型，定义时无法确定该类型内容，若直接用可能会出现范围错误

尤其是复杂类型时，会因为无法确认其中是否含有某属性方法而会报错，所以有时需要**约束泛型的范围**

使用 **[extends](../Types/Types.md#extends)** 让泛型继承某个类型，来精确限制规定其包含的属性方法等

```tsx
<泛型 extends 要继承的类型>
```

> 如下：函数
>
> ```tsx
> // 定义泛型时不指定范围，会报错泛型中没有使用的属性
> function func<T>(params: T) {
>   return params.length; // 报错，类型 T 上没有 length 属性
> }
> func<string>("xxx");
> func<Array<number>>([1, 2, 3]);
> ```
>
> ```tsx
> // 解决：泛型继承一个都有 length 属性的联合类型
> function func<T extends string | Array<number>>(params: T) {
>   return params.length;
> }
> func<string>("xxx");
> func<Array<number>>([1, 2, 3]);
> ```
>
> ```tsx
> // 解决：泛型继承一个有 length 属性的自定义类型
> type MyType = { length: number };
>
> function func<T extends MyType>(params: T) {
>   return params.length;
> }
> func<string>("xxx");
> func<Array<number>>([1, 2, 3]);
> ```

> 如下：类
>
> ```tsx
> interface PersonInterface {
>   name: string;
>   age: number;
> }
>
> // 定义泛型时不指定范围，会报错泛型中没有使用的属性
> class Person<T> {
>   constructor(private person: T) {
>     this.person = person;
>   }
>   getName() {
>     return this.person.name; // 报错，类型 T 上没有 length 属性
>   }
> }
> const jack = new Person<PersonInterface>({ name: "Jack", age: 28 });
> ```
>
> ```tsx
> interface PersonInterface {
>   name: string;
>   age: number;
> }
>
> //  解决：泛型继承一个有 name 属性的自定义类型
> class Person<T extends PersonInterface> {
>   constructor(private person: T) {
>     this.person = person;
>   }
>   getName() {
>     return this.person.name;
>   }
> }
> const jack = new Person<PersonInterface>({ name: "Jack", age: 28 });
> ```
