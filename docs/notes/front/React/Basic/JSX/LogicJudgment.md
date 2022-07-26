# JSX 中的逻辑判断

![img](https://res.cloudinary.com/practicaldev/image/fetch/s--jaFWlQCW--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/i/bqc1gncxdhau0zfuxqmp.png)

[[toc]]

## 切换

对于逻辑判断后的 `<JSX/>` 是重新挂载还是更新，

取决于：切换的是整个标签还是仅切换属性 attrabut

### 重新挂载

重新挂载是指，切换的是不同 `<JSX/>`

```jsx
{
  condition ? <Tag1 /> : <Tag2 />;
}
```

---

### 更新属性

仅更新属性数据是指，切换的是相同 `<JSX/>` 但各自属性不同，

```jsx
{
  condition ? <Tag props1 /> : <Tag props2 />;
}
// 相当于
<Tag condition ? props1 : props1} />;
```

> 如下：组件实例被保留，仅更新传递的 `props` 属性

```jsx
{
  condition ? <Component num={1} /> : <Component num={2} />;
}
// 相当于
<Component num={condition ? 1 : 2} />;
```

<br/>

## 三元表达式

三元表达式仅限于判断一个条件并切换渲染两个结果

还能解决 `&&` 判断 number 时出现 [0 被渲染](https://blaxberry.github.io/vuepress-studynotes/notes/front/React/Basic/JSX/JSX_Conditions.html#列表长度-0-被渲染) 的问题

但三元表达式判断 JSX 时会出现以下要注意的问题

### 嵌套地狱

三元表达式在判断条件分支过多时会产生嵌套地狱

> 如下：

```jsx
{
  loading ? <Loading /> : content.length ? <Content /> : <Empty />;
}
```

- 可使用逻辑运算符

  通过 **`&&`、`||`** 形成单独分支代码，但判断条件会变复杂

```jsx
{
  loading && <Loading />;
}

{
  !loading && content.length > 0 && <Content />;
}

{
  !loading && !(content.length > 0) && <Empty />;
}
```

- 也可通过调用封装的 **`if / else`** 渲染函数

  函数内判断条件后返回对应 `<JSX />`

```jsx
const renderFunc = () => {
  if (loading) return <Loading />;
  if (content.length) {
    return <Content />;
  } else {
    return <Empty />;
  }
};
```

---

### 受控组件数据残留

一般组件通过三元表达式来切换是无所谓的,

但若切换的是同名**受控组件**，会出现数据残留问题

> 如下：文本框内若输入数据，切换后数据还会残留

```jsx
{
  mode === "number" ? (
    <input placeholder="phone" />
  ) : (
    <input placeholder="name" />
  );
}
```

- 可以改用 **逻辑运算符** 形成单独分支来判断切换

  形成分别独立的代码不会互相影响

```jsx
{
  mode === "number" && <input placeholder="phone" />;
}
{
  mode !== "number" && <input placeholder="name" />;
}
```

- 也可**设置不同的唯一 `key`**

  React 渲染时是通过 key 区分虚拟 DOM 的

```jsx
{
  mode === "number" ? (
    <input placeholder="phone" key="phone" />
  ) : (
    <input placeholder="name" key="name" />
  );
}
```

<br/>

## 逻辑运算符

### 单独作用域

逻辑运算符 `&&` 判断是否渲染 `<JSX />` 时会形成单独的分支代码

独立分支之间互不影响

```jsx
{
  condition1 && <Component1 />;
}
{
  condition2 && <Component2 />;
}
```

::: tip 可以解决三元表达式的以下问题：

- JSX 结构不清晰的 [三元表达式嵌套地狱](https://blaxberry.github.io/vuepress-studynotes/notes/front/React/Basic/JSX/JSX_Conditions.html#嵌套地狱)
- 判断条件改变后 [受控组件的数据残留](https://blaxberry.github.io/vuepress-studynotes/notes/front/React/Basic/JSX/JSX_Conditions.html#受控组件数据残留)

:::

---

### 列表长度 0 被渲染

不能直接将列表数据的长度 `length` 作为判断条件，

否则空列表的场合会直接将 `0` 给渲染出来

> 如下：

```jsx
// 错误的例子
{
  data.length && <JSX />;
}
```

> 鉴于 JavaScript 逻辑运算符的工作方式，
>
> 若 `&&` 左边为真或假值（比如 `0` ）则该值会被立刻返回
>
> 于是 `React` 直接用这个值渲染 `DOM` ，而不会渲染后面的组件
>
> 若是个布尔值（比如 `false` ）则不会直接返回

- 可将列表数据的长度转为布尔值后再判断

```jsx
{
  data.length > 0 && <Conent />;
}

{
  !!data.length && <Conent />;
}

{
  Boolean(data.length) && <Conent />;
}
```

- 也可使用三元表达式来直接判断

```jsx
{
  data.length ? <Content /> : null;
}
```

---

### 判断优先级

`&&` 与 `||` 同时作为渲染的判断条件时要注意逻辑判断符号的优先级

> 属于 JavaScript 基础，不再叙述

```jsx
{
  (conditionA || conditionB) && <JSX />;
}
```
