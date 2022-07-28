# TS 接口 ( interface )

![img](https://cdn-ssl-devio-img.classmethod.jp/wp-content/uploads/2020/09/typescript.png)

[[toc]]

## 简介

作用近似于 [类型别名 type](https://blaxberry.github.io/vuepress-studynotes/notes/front/TypeScript/Basic/Types/Types.html#类型别名-type)

但是接口只能定义复杂类型的**对象类型**，并且接口扩展性比类型别名 type 强大

---

### 定义

直接在 `{ }` 里声明，接口名名**首字母大写**

```tsx
interface 对象类型接口名 {
  属性: 类型;
  属性?: 类型;
  readonly 属性: 类型;
  函数属性(): 返回值类型;
  函数属性: () => 返回值类型;
  (参数: 类型, 参数: 类型): 返回值类型;
}
```

```tsx
// 对象类型接口
interface Person {
  name: string;
  age: number;
  gender: "male" | "female";
}

// 属性为一个有参数和返回值的函数时
interface A {
  (a: number, b: number): number;
}
// 属性为一个无参数无返回值的函数时
interface B {
  (): void;
}
const func1: A = (a, b) => a + b;
const func2: B = () => console.log("hello");
```

---

### 声明合并

同名接口的内容会自动合并，使接口能更好地按需进行扩展

这也是接口区别与类型别名的一大特征之一

```tsx
interface Person {
  name: string;
  age: number;
}
interface Person {
  gender: string;
}

const jack: Person = {
  name: "Jack",
  age: 18,
  gender: "male",
};
```

<br/>

## 继承

### ❌extends

接口定义的类型内容可以扩展，通过 extends 进行扩展继承

```tsx
interface A {
  // 内容
}
interface B extends A {
  // 内容
}
```

```tsx
interface A {
  // 内容
}
interface B {
  // 内容
}
interface C extends A, B {
  // 内容
}
```

```tsx
type X = 类型内容;
interface A extends X {
  // 内容
}
```

---

### ❌implements

Class 类继承接口

---

### ❌omit
