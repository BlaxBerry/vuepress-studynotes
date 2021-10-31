# React Hooks

![](https://www.wangbase.com/blogimg/asset/201908/bg2019083104.jpg)

[[toc]]

## 钩子函数简介

`React 16.8.0` 版本之前组件的标准写法是类组件。但是类组件的缺很明显，复杂、逻辑分散。组件不应该是个复杂的容器，而是个可根据需要进行组合的数据流的管道，即组件尽量写成纯函数。但原本的函数组件是无状态组件，没有 `state`属性、`refs`属性、生命周期钩子函数。

为此 `React 16.8.0` 新增了 **Hooks 钩子函数**，“用钩子把组件需要的外部功能和副作用代码钩进来”，使函数组件中可以使用 `state`属性和其他 React 的特性。Hooks 钩子一律使用`use`前缀命名，使用 xxx 功能就命名为 usexxx。

::: tip

- 状态钩子（State Hook）：**useState()**
- 生命周期钩子（Effect Hook）：**useEffect()**
- Ref Hook：**useRef()**

- 共享状态钩子：**useContext()**
- action 钩子：**usereducer()**

:::

## useState()

用于为函数组件引入状态 `state`属性，使其可进行状态的读写修改操作

```jsx
const [状态名, set状态名] = useState(初始值);
```

::: tip useState() 函数返回值为包含两个元素的数组：

- 第一个元素：创建的状态

- 第二个元素：修改状态的方法函数

:::

> 如下：
>
> ```jsx
> import React from "react";
> export default function Demo() {
>   const [num, setNum] = React.useState(0);
>
>   function add() {
>     return setNum(num + 1);
>   }
>
>   return (
>     <div>
>       <h2>{num}</h2>
>       <button onClick={add}>num+1</button>
>     </div>
>   );
> }
> ```

### 缓存初始状态

初始化的状态值会作为缓存

和类组件的 `render() 一样，修改一次，该函数组件就调用一次`

> React 底层做了处理，`useState()` 在修改状态时会保存修改值，不会因为没医德调研导致状态给重新赋值会初始值

### setXxx() 写法一

```jsx
setXxx(新值);

// setNum(1)
// setNum(num + 1)
```

> 如下：
>
> ```jsx
> import React from "react";
> export default function Demo() {
>   const [num, setNum] = React.useState(0);
>
>   const add = () => {
>     setNum(num + 1);
>   };
>
>   return (
>     <div>
>       <h2>{num}</h2>
>       <button onClick={add}>num+1</button>
>     </div>
>   );
> }
> ```

### setXxx() 写法二

```jsx
setXxx((状态) => 新值);

// setNum(num => num + 1)
```

> 如下：
>
> ```jsx
> import React from "react";
> export default function Demo() {
>   const [num, setNum] = React.useState(0);
>
>   const add = () => {
>     setNum((num) => num + 1);
>   };
>
>   return (
>     <div>
>       <h2>{num}</h2>
>       <button onClick={add}>num+1</button>
>     </div>
>   );
> }
> ```

## useEffect()

用于在函数组件中模拟生命周期钩子函数

> 【一钩三用】`useEffect()` 相当于类组件中的三个生命周期钩子的集合：
>
> componentDidMount()
>
> componentDieUpdate()
>
> componentWillUnmount()

::: tip useEffect() 接受两个参数，并返回一个函数

- 第一个参数：函数，模拟生命周期
- 第二个参数：数组，给出检测的依赖项，默认省略
- 返回值：函数，组件卸载时执行

:::

```jsx
useEffect(() => {
  // 根据检测的状态模拟生命周期

  return () => {
    // 收尾工作
  };
}, [状态]);
```

### 调用次数

`useEffect()` 在函数组件第一次渲染时会执行，此后`useEffect()` 函数否被调用取决于第二个参数（依赖项）

::: tip 依赖项分类：

- 省略依赖项：只要组件数据变化就调用
- 数组有元素：仅当依赖项数据变化才调用
- 空数组：不被调用

:::

#### 有依赖项

若有依赖项，仅当依赖项更新变化才调用`useEffect()`

相当于类组件的 `componentDidUpdated`

```jsx
useEffect(() => {}, [组件状态]);
```

```jsx
import React from "react";
export default function Home() {
  const [num, setNum] = React.useState(0);
  const add = () => setNum(num + 1);

  const [name, setName] = React.useState("Jack");
  const changeName = () => setName("Andy");

  React.useEffect(() => {
    console.log("useEffect");
  }, []);

  return (
    <div>
      <h1>{name}</h1>
      <h1>{num}</h1>
      <button onClick={add}>num+1</button>
      <button onClick={changeName}>change Name</button>
    </div>
  );
}
```

#### 省略依赖项

省略依赖项时，检测所有，每次组件渲染就会执行`useEffect()`

相当于类组件的 `componentDidMount`

```jsx
useEffect(() => {});
```

```jsx
import React from "react";
export default function Home() {
  const [num, setNum] = React.useState(0);

  const add = () => {
    setNum(num + 1);
  };

  React.useEffect(() => {
    console.log("useEffect");
  });

  return (
    <div>
      <h1>{num}</h1>
      <button onClick={add}>num+1</button>
    </div>
  );
}
```

#### 空数组

依赖项为空数组时，谁也不检测，除了组件第一次渲染之后不再执行 `useEffect()`

```jsx
useEffect(() => {}, []);
```

```jsx
import React from "react";
export default function Home() {
  const [num, setNum] = React.useState(0);

  const add = () => {
    setNum(num + 1);
  };

  React.useEffect(() => {
    console.log("useEffect");
  }, []);

  return (
    <div>
      <h1>{num}</h1>
      <button onClick={add}>num+1</button>
    </div>
  );
}
```

### 返回值

`useEffect()` 函数的返回值是个函数，在组件卸载前调用

该函数相当于类组件中的生命周期钩子`componentWillUnmount`

```jsx
useEffect(() => {
  // 副作用操作（生命周期）

  return () => {
    // 收尾工作
  };
}, [状态]);
```

> 如下：在 `useEffect()` 依赖项不检测任何数据，开启计时器，并在返回值中关闭定时器
>
> ```jsx
> import React from "react";
> import ReactDOM from "react-dom";
> export default function Demo() {
>   const [num, setNum] = React.useState(0);
>
>   React.useEffect(() => {
>     let timer = setInterval(() => {
>       setNum((num) => num + 1);
>     }, 1000);
>     return () => {
>       clearInterval(timer);
>     };
>   }, []);
>
>   const unmount = () => {
>     ReactDOM.unmountComponentAtNode(document.getElementById("root"));
>   };
>
>   return (
>     <div>
>       <h1>{num}</h1>
>       <button onClick={unmount}>卸载组件</button>
>     </div>
>   );
> }
> ```

## useRef()

用于在函数组件中获取 DOM 标签节点

::: tip 步骤：

1. 定义 Ref 容器

```jsx
const 自定义Ref容器 = React.useRef();
```

2. 标签挂载 Ref 容器

```jsx
<标签 ref={自定义Ref容器}></标签>
```

3. 获取方式与类组件的 `refs`属性一样

```js
// 获取标签DOM本身
自定义Ref容器.current;

// 获取标签value值
自定义Ref容器.current.value;
```

:::

> 如下：
>
> ```jsx
> import React from "react";
> export default function Home() {
>   const myRef = React.useRef();
>
>   const show = () => {
>     console.log(myRef.current.value);
>   };
>
>   return (
>     <div>
>       <input type="text" ref={myRef} />
>       <button onClick={show}>展示输入值</button>
>     </div>
>   );
> }
> ```

## 自定义 Hook

...
