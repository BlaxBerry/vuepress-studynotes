# TS 类型

![img](https://cdn-ssl-devio-img.classmethod.jp/wp-content/uploads/2020/09/typescript.png)

[[toc]]

## 基础类型

|     类型      |      含义      |                                                      例子                                                      |
| :-----------: | :------------: | :------------------------------------------------------------------------------------------------------------: |
|  **number**   |      数值      |                         整数、小数、正负数、二・八・十六进制、NaN、Infinity、-Infinity                         |
|  **string**   |     字符串     |                                                     "你好"                                                     |
|  **boolean**  |     布尔值     |                                                  true、false                                                   |
|    **any**    |     任意值     |                                                                                                                |
|  **unknown**  |     任意值     |                                                                                                                |
|   **null**    |      空值      |                                                      null                                                      |
| **undefined** |    值未定义    |                                                   undefined                                                    |
|   **void**    | 无返回值的函数 | [详见下文](https://blaxberry.github.io/vuepress-studynotes/notes/front/TypeScript/Basic/Types/Types.html#函数) |
|   **never**   | 无返回值的函数 | [详见下文](https://blaxberry.github.io/vuepress-studynotes/notes/front/TypeScript/Basic/Types/Types.html#函数) |
|    object     |      对象      |                                             包含键值对的对象、{ }                                              |

::: tip object 类型（不常用）

能赋值的数据仅为包含键值对的对象或空对象 `{}`
但无法精确控制键值对的类型，对象类型的定义多通过**字面量形式**。[详见下文](#对象)

```tsx
let a: object;

a = {};
a = { k: 1, y: 2 };
```

:::

:::danger any 类型（不要用）

**不但影响自己还会祸害别人，开发时坚决不要使用**
any 类型十分不安全，相当于关闭了 TypeScript 对该变量的类型监测，不仅自身可以被赋值任意类型数据，且将自身直接赋值给其他变量时会破坏那个变量的类型限制，影响其逻辑运算等处理的结果。如下：

```tsx
let a: any;
a = 100;
a = "100";
a = true;

const b: string = a; // 居然不报错！（现在的 a 是 boolean 型而非 string 类型）
```

:::

::: tip unknown 类型

- 相当于类型安全的 any 类型
  仅自己可以被赋值任意类型数据，**不能被赋值给 unknown 或 any 以外的类型**

```tsx
let a: unknown;
a = 100;
a = "100";
a = true;

const b: unknown = a;
const c: any = a;
const d: string = a; // 报错
const e: number = a; // 报错
```

- **不能作为函数的返回值类型**

```tsx
const a = (): any => {};
const b = (): unknown => {}; // 报错，声明类型不为 void 或 any 的函数有必须返回值
```

- **不能使用运算符**

```tsx
const func = (x: unknown) => {
  x == 5;
  x !== 10;
  x >= 0; // 报错
  x + 1; // 报错
  x * 2; // 报错
  -x; // 报错
  +x; // 报错
};
```

:::

<br/>

## 字面量类型

基础类型和复杂类型都算是一个范围，只要属于该范围即可

但字面量相当于进一步缩小精确了范围

```tsx
let a: "hello";
a = "hello";
a = "h"; // 报错，不能将类型 "h" 分配给类型 "hello"
a = "world"; // 报错，不能将类型 "world" 分配给类型 "hello"

let b: 1 | 2;
b = 1;
b = 2;
b = 999; // 报错，不能将类型 999 分配给类型 1 | 2
```

<br/>

## 复杂类型

### 数组

|           写法           |           含义           |        例子        |
| :----------------------: | :----------------------: | :----------------: |
| **[元素类型, 元素类型]** |  元素个数固定，类型不同  | `[string, number]` |
|   **Array<元素类型>**    | 元素个数不固定，类型相同 |  `Array<string>`   |
|     **元素类型[ ]**      |           同上           |    `string[ ]`     |

```tsx
/* 个数固定 & 类型不同的数组类型 */
const a: [string, number, boolean] = ["1", 2, true];

/* 个数不固定 & 类型相同的数组类型 */
const b: Array<number> = [1, 2, 3];
const c: number[] = [1, 2, 3];
```

> 如下：数组元素为复杂类型的场合
>
> ```tsx
> type Person = {
>   name: string;
>   age: number;
> };
>
> const people: Array<Person> = [
>   { name: "Andy", age: 28 },
>   { name: "Tom", age: 18 },
> ];
> ```

---

### 对象

::: tip 对象类型的写法：

1. object 类型（不推荐） [详见上文](#基础类型)
2. 字面量
   1. 直接定义在数据后（不常用）[详见下文](#类型定义)
   2. **type 类型别名** [详见下文](#类型别名-type)
   3. **interface 接口** [详见跳转](../Interface/Interface.md)

:::

- **object 类型 vs 字面量写法**

比起 **[object 类型](#基础类型)**，字面量形式写法能精确控制键值对的类型

并且比起直接定义到数据后，**[type](#类型别名-type)** 或 **[interface](../Interface/Interface.md)** 能重复使用且代码清晰

```tsx
const 数据: object = 值;

const 数据: { 属性: 类型 } = 值;

type Type别名 = { 属性: 类型 };

interface 接口 {
  属性: 类型;
}
```

- **可选属性（ ? ）**

```tsx
{
  属性?: 类型
}
```

```tsx
type Type = {
  a: string;
  b?: string;
};

const obj_1: Type = { a: "A", b: "B" };
const obj_2: Type = { a: "A" }; // 不报错
```

- **只读属性（ readonly ）**

定义为只读属性的属性**无法被修改**

```tsx
{
  readonly 属性: 类型
}
```

```tsx
type Type = {
  a: string;
  readonly b: string;
};

const obj: Type = { a: "A", b: "B" };
obj.a = "AAA";
obj.b = "BBB"; // 报错，无法分配到 b ，因为它是只读属性
```

- **函数属性**

对象的属性为函数时

```tsx
{
  函数名(): 返回值类型;
  函数名: () => 返回值类型;
}
```

```tsx
interface MyInterface {
  A(): void;
  B: () => void;
}
const xx: MyInterface = {
  A: () => console.log("A"),
  B: () => console.log("B"),
};

xx.A(); // A
xx.B(); // B
```

- **索引签名**

```tsx
// 键名全部未知
{ [key:键名的类型]: 值的类型}
{ [key:键名的类型]: 值的类型 | 值的类型}

// 含有已知键名
{
  [key: string]: 值的类型 | 值的类型,
  属性: 值的类型
}
```

```tsx
// 固定的键值对
type TypeName1 = {
  name: string;
  age: number;
};
interface InterfaceName1 {
  name: string;
  age: number;
}

// 不固定的键值对
type TypeName2 = {
  [key: string]: string;
};
interface InterfaceName2 {
  [key: string]: string;
}

// 含有固定的键值对
type TypeName3 = {
  [key: string]: string | number;
  num: number;
};
interface InterfaceName3 {
  [key: string]: string | number;
  num: number;
}

const a1: TypeName1 = { name: "x", age: 28 };
const a2: InterfaceName1 = { name: "x", age: 28 };

const b1: TypeName2 = { name: "x", age: "28" };
const b2: InterfaceName2 = { name: "x", age: "28" };

const c1: TypeName3 = { name: "x", age: "28", num: 100 };
const c2: InterfaceName3 = { name: "x", age: "28", num: 100 };
```

---

### 函数

::: tip 三种写法：

1. 字面量（不建议）
2. **type 类型别名** [详见下文](#类型别名-type)
3. **interface 接口** [详见跳转](../Interface/Interface.md)

:::

- **写法一：字面量**（不推荐）

结构不清晰，正经开发里别用

```tsx
const a: () => void = () => console.log("hello");
const b: (text: string) => string = (text) => params;
```

- **写法二：type 类型别名**

```tsx
type FuncTypeA = {
  (): void;
};
const a: FuncTypeA = () => console.log("hello");

type FuncTypeB = {
  (text: string): string;
};
const b: FuncTypeB = (text) => text;
```

- **写法三：interface 接口**

```tsx
interface FuncA {
  (): void;
}
const a: FuncA = () => console.log("hello");

interface FuncB {
  (text: string): string;
}
const b: FuncB = (text) => text;
```

::: tip 函数返回值的类型：

- **void 类型**
  表示没有指定 return 返回值的函数
  返回值为函数默认返回值 `undefined`

```tsx
const func = (): void => console.log("hello");

console.log(func()); // undefined
```

- **never 类型**
  void 类型的函数的返回值为 `undefined`，也算是个值
  而 never 类型的函数是不会返回任何结果
  比如：抛出异常的报错函数

```tsx
const func = (): never => {
  throw new Error("出错了");
};

console.log(func());
// 无任何返回值，控制台（终端）报错，错误信息为 "出错了"
```

- any 类型（不要用）
  [详见上文](#基础类型)

```tsx
const a = (): any => {};
const b = (): unknown => {}; // 报错
```

:::

::: tip 剩余参数类型

```tsx
const 函数名 = (参数: 类型, ...剩余参数: 元素的类型[]): 返回值类型 => {
  return 返回值;
};
```

:::

<br/>

## 联合・交叉

|              |  符号  |          含义          |           写法           |
| :----------: | :----: | :--------------------: | :----------------------: |
| **联合类型** | **｜** | **或**（满足一个即可） | 类型 A ｜类型 B ｜类型 C |
| **交叉类型** | **&**  | **与**（必须全部满足） | 类型 A & 类型 B & 类型 C |

---

### 联合类型

类型定义为 **联合类型** 时，所赋值的类型只要属于其中即可

```tsx
let varA: string | number;
varA = "1";
varA = 1;
varA = true; // 报错，不能将类型 boolean 分配给类型 string|number

let arrayB: Array<string | number>;
arrayB = [1, 2, 3];
arrayB = ["1", 2, "3"];
arrayB = ["1", false, "3"]; // 报错，不能将类型 boolean 分配给类型 string|number
```

---

### 交叉类型

- **`子类型 & 父类型` → 子类型**

```tsx
1 & number; // 1
number & 1; // 1
```

- **不同时满足时返回 never 类型**

```tsx
string & number; // never
"1" & "2"; // never
number & number; // number
```

- **`any・never & 其他类型` → any・never**

```tsx
any & number // any
any & string // any
any & {} // never
any & (() => void) // never

never & number // never
never & string // never
never & {} // never
never & (() => void) // never
```

<br/>

## 类型定义

::: tip 定义类型的写法：

1. 直接定义在数据后（不常用）
2. **type 类型别名** [详见下文](#类型别名-type)
3. **interface 接口** [详见跳转](../Interface/Interface.md)

:::

指定类型时通过 `:` 直接将类型放在数据后面

```tsx
const 变量: 类型 = 值;

function 函数名(参数: 类型): 返回值类型 {
  return 返回值;
}
const 函数名 = (参数: 类型): 返回值类型 => 返回值;
```

**重复使用**或**数据类型复杂**时，建议使用 **[类型别名 type](../Interface/Interface.md)** 单独定义类型。如下：

```tsx
// 使用类型别名定义 Skill 类型
type Skill = {
  front?: string[];
  back?: string[];
};

// 使用接口定义 Person 类型，其中使用 Skill 类型
interface Person {
  name: string;
  age: number;
  skills?: Skill;
}

// 使用类型
const people: Person[] = [
  {
    name: "Andy",
    age: 28,
    skills: {
      front: ["React", "Vue", "Angular"],
      back: ["Node.js", "PHP", "Python", "Ruby"],
    },
  },
  { name: "Tom", age: 18 },
];
```

<br/>

## 类型推论

若变量赋值时没定义类型时，TS 会根据赋予的值自动推论数据类型

```tsx
let a = 10;
a = "你好"; // 报错，不能将类型 string 分配给类型 number
```

若定义变量时未赋值，则 TS 默认推论为 **any 类型**

```tsx
let a;
a = 10;
a = "10";
a = null;
a = false;
```

<br/>

## 类型断言

|        写法        |             说明             |
| :----------------: | :--------------------------: |
| **数据值 as 类型** | **多见于 React 的 JSX、TSX** |
|  **<类型>数据值**  |  **不能用于 React 的 JSX**   |

手动指定一个值的类型来覆盖 TS 的自动类型检测

类型断言不是类型转换，在编译结果中会被删除，不会真的影响到变量的类型

```tsx
let a: unknown;
const b: string = a; // 报错
const c: string = a as string; // 不报错
```

- **将一个联合类型断言为其中一个类型**

```tsx
interface Cat {
  run(): void;
}
interface Fish {
  swim(): void;
}

function doSomething(animal: Cat | Fish) {
  // if (typeof animal.swim === 'function') return true;
  if (typeof (animal as Fish).swim === "function") return true;
  return false;
}
```

- **将一个父类断言为更加具体的子类**

```tsx
class ApiError extends Error {
  code: number = 0;
}
class HttpError extends Error {
  statusCode: number = 200;
}

function isApiError(error: Error) {
  // if (error instanceof ApiError) return true;
  if (typeof (error as ApiError).code === "number") return true;
  return false;
}
```

- **将 any 断言为一个具体的类型**

第三方库未能定义好类型、项目历史遗留问题、别人写的烂代码、TypeScript 无法精确定义类型等情况时，不可避免的需要处理默认类型推论的 any 类型的变量

```tsx
function getCacheData(key: string): any {
  return (window as any).cache[key];
}

interface Cat {
  run(): void;
}
const tom = getCacheData("tom") as Cat;
tom.run();
```

<br/>

## 类型别名 ( type )

用于给一个类型起个自定义名，写法优于[上文所述](#定义类型)在数据后直接定义的写法

可实现类型重复使用与代码结构清晰

作用近似于 [接口 interface](../Interface/Interface.md)，但类型别名能声明**任意类型**

---

### 定义

通过 `=` 赋值，别名**首字母大写**

同名 type **不能重复定义**

```tsx
// 基础类型
type BasicType = 类型;

// 对象类型
type ObjectType = {
  属性名: 类型;
  属性名: 类型;
};

// 函数类型
type FunctionType = (参数: 类型, 参数: 类型) => 返回值类型;
```

---

### 扩展

type 定义的类型内容可以扩展，使用 [交叉类型 &](#交叉类型) 进行扩展合并

```tsx
type A = { 属性A: 类型 };
type B = { 属性B: 类型 };
type AB = A & B; // { 属性A: 类型, 属性B: 类型 }
```

```tsx
type A = { a: string };
type B = { b: number };
type C = { c: boolean };

const ab: A & B = { a: "1", b: 1 };
const abc: A & B & C = { a: "1", b: 1, c: true };
```

type 也可以扩展合并 [接口 interface](../Interface/Interface.md)

```tsx
type A = { 属性A: 类型 }
interface B = {
  属性B: 类型
}
interface C = {
  属性C: 类型
}
type AB = A & B  // { 属性A: 类型, 属性B: 类型 }
type BC = B & C  // { 属性B: 类型, 属性C: 类型 }
```

---

### 条件表达式

```tsx
interface Animal {
  run(): void;
}

interface Dog extends Animal {
  woof(): void;
}

interface Flower {
  grow(): void;
}

type Example1 = Dog extends Animal ? number : string; // number
type Example2 = Flower extends Animal ? number : string; // string
```

<br/>

## 常用关键字

### ❌typeof

用于获取一个值的类型

```tsx
type TypeName = typeof 目标值;
const A = 值;
const B: typeof A;
```

多用于[复杂类型](https://blaxberry.github.io/vuepress-studynotes/notes/front/TypeScript/Basic/Types/Types.html#复杂类型) 的对象和数组

没必要 [基本类型](https://blaxberry.github.io/vuepress-studynotes/notes/front/TypeScript/Basic/Types/Types.html#基本类型)（直接字面量写就行了没必要再用 `typeof`）

```tsx
const var1 = "hello";
const var2 = 1;
const var3 = true;
const var4 = { name: "tom", age: 20 };
const var5 = [1, 2, 3];

type T1 = typeof var1; // 无意义，相当于 type T1 = 'hello'
type T2 = typeof var2; // 无意义，相当于 type T2 = 1
type T3 = typeof var3; // 无意义，相当于 type T3 = true
type T4 = typeof var4; // 相当于 type T4 = { name: string, age: number }
type T5 = typeof var5; // 相当于 type T5 = number[]
const obj1 = {
  name: "tom",
  age: 20,
};

const obj2: typeof obj1 = {
  name: "jerry",
  age: 30,
};
```

---

### ❌keyof

用于获取**一个类型中的所有 key 值组成的联合类型**

```tsx
type Person = {
  name: string;
  age: number;
};
const variable: keyof Person = "age"; // 相当于 const variable: 'name'|'age' = 'age'
```

```tsx
// keyof 与 typeof 连用
const person = {
  name: "tom",
  age: 20,
};
const variable: keyof typeof person = "name"; // 相当于 const variable: 'name'|'age' = 'name'
```

---

### ❌in

用于遍历一个联合类型

```tsx
type Keys = "a" | "b" | "c";

// { a: any, b: any, c: any }
type Obj = {
  [p in Keys]: any;
};
```

---

### ❌extends

用于类型继承

通常用于**泛型约束**和**类型条件表达式**

```tsx
// 将泛型变量 T 约束为只能为 number 或 string 之一
type Func = <T extends number | string>(x: T) => T;
```

```tsx
type Type = T extends U ? X : Y;
```

---

### ❌infer

<br/>

## ❌ 模版字面量类型

```tsx
`${类型}`;
```

```tsx
type Level = '1' | '2' | '3' | '4' | '5'

type Title = { size: `h${Level}` }

const t_1: Title = { size: 'h1' }
const t_2: Title = { size: 'h2' }
```
