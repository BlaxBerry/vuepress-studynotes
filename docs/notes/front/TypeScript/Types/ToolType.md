# 工具类型

![img](https://cdn-ssl-devio-img.classmethod.jp/wp-content/uploads/2020/09/typescript.png)

[[toc]]

## 简介

用于减少类型定义时的代码量

<br/>

## Pick

从指定类型中**选中指定属性**，将剩余的属性返回为一个新的类型的内容

与 **[Omit](#omit)** 相反

```tsx
Pick<类型名, "要选中的属性名">
Pick<类型名, "要选中的属性名"|"要选中的属性名">
```

```tsx
type Common = {
  title: string;
  publishAt: Date;
  name: string;
  age: number;
};

type Person = Pick<Common, "name" | "age">;
type Book = Pick<Common, "title" | "publishAt">;

const person: Person = {
  name: "Jack",
  age: 28,
};
const book: Book = {
  title: "《一本好书》",
  publishAt: new Date(),
};
```

<br/>

## Omit

从指定类型中**剔除指定属性**，将剩余的属性返回为一个新的类型的内容

与 **[Pick](#pick)** 相反

```tsx
Omit<类型名, "要剔除的属性名">
Omit<类型名, "要剔除的属性名"|"要剔除的属性名">
```

```tsx
interface Common {
  id: string;
  title?: string;
  publishAt?: Date;
  name?: string;
  age?: number;
}

type Person = Omit<Common, "title" | "publishAt">;
type Book = Omit<Common, "name" | "age">;

const person: Person = {
  id: "",
  name: "Jack",
  age: 28,
};
const book: Book = {
  id: "",
  title: "《一本好书》",
  publishAt: new Date(),
};
```

<br/>
