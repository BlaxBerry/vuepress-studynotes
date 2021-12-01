# React Hooks

![](https://www.wangbase.com/blogimg/asset/201908/bg2019083104.jpg)

[[toc]]

## 钩子函数简介

组件化开发有函数组件、类组件两种方式，其中函数组件是无状态组件（没有 `state`属性、`refs`属性、生命周期钩子函数），所以 `React 16.8.0` 版本之前组件的标准写法是类组件。

但是类组件的缺很明显，复杂、逻辑分散。组件不应该是个复杂的容器，而是个可根据需要进行组合的数据流的管道，即组件尽量写成纯函数。

为此 `React 16.8.0` 新增了 **Hooks 钩子函数**（用钩子把组件需要的外部功能和副作用代码钩进来），摆脱只能依赖类组件，使函数组件中也可以使用 `state`属性、生命周期等其他特性。

Hooks 钩子一律使用`use`前缀命名，使用 xxx 功能就命名为 useXxx。

::: tip

- **useState()**：状态钩子（State Hook）
- **useEffect()**：副作用钩子（Effect Hook）：
- **useRef()**：Ref Hook
- **useContext()**：共享状态钩子
- **useReducer()**：action 钩子

:::

## useState()

用于为函数组件引入状态 `state`属性，使其可进行状态的读写修改操作

```jsx
const [状态名, set状态名] = React.useState(初始值);
```

::: tip useState() 函数返回值为包含两个元素的数组：

- 第一个元素：创建的状态

- 第二个元素：修改状态的方法函数

:::

> 如下：
>
> ```jsx
> import React from "react";
> export default function Home() {
>   const [num, setNum] = React.useState(0);
>   const add = () => setNum(1);
>
>   const [name, setName] = React.useState("Jack");
>   const changeName = () => setName("Andy");
>
>   return (
>     <div>
>       <h1>{name}</h1>
>       <h1>{num}</h1>
>       <button onClick={add}>变成 1</button>
>       <button onClick={changeName}>变成 Andy</button>
>     </div>
>   );
> }
> ```

修改后的新值会作为缓存保存，该函数组件和类组件的 `render()` 一样修改一次就调用渲染一次

### setXxx() 参数写法一

```jsx
setXxx(新值);

// setNum(1)
// setNum(num + 1)
```

> 如下：
>
> ```jsx
> import React, { useState } from "react";
> export default function Demo() {
>   const [num, setNum] = React.useState(0);
>
>   const add = () => setNum(num + 1);
>
>   return (
>     <div>
>       <h2>{num}</h2>
>       <button onClick={add}>num+1</button>
>     </div>
>   );
> }
> ```

### setXxx() 参数写法二

```jsx
set状态名((状态名) => 操作状态);

// setNum(num => num + 1)
// setAge(age => age.toString())
```

> 如下：
>
> ```jsx
> import React, { useState } from "react";
> export default function Demo() {
>   const [name, setName] = useState("Jack");
>
>   const change = () => {
>     setName((name) => {
>       return name === "Jack" ? "Andy" : "Jack";
>     });
>   };
>
>   return (
>     <div>
>       <h2>{name}</h2>
>       <button onClick={change}>change Name</button>
>     </div>
>   );
> }
> ```

## useEffect()

用于在模拟生命周期钩子函数

::: tip 【一钩三用】

- **[componentDidMount()](#无监测项)**
- **[componentDieUpdate()](#非空数组监测项)**
- **[componentWillUnmount()](#第一个参数返回值)**

:::

```js
useEffect(处理函数, 监测依赖项);
```

::: tip useEffect() 接受两个参数

- **参数一**：匿名函数，模拟生命周期<br>
  返回值是一个函数，组件卸载时执行

- **参数二**：数组，监测依赖项，默认省略

:::

```jsx
useEffect(() => {
  // 根据检测的状态模拟生命周期

  return () => {
    /* 收尾工作 */
  };
}, [状态]);
```

根据检测依赖项和参数返回值，`useEffect()` 功能相当于类组件中的三个生命周期钩子的集合

`useEffect()` 在函数组件第一次渲染时会执行，此后`useEffect()` 函数否被调用取决于第二个参数（依赖项）

::: tip 依赖项分类：

- **无依赖项**：只要组件数据变化就调用
- **有依赖项（非空数组）**：仅当依赖项数据变化才调用
- **有依赖项（空数组）**：不调用

:::

### 无监测项

默认，省略监测依赖项时检测所有状态，每次组件渲染就会执行`useEffect()`

**相当于类组件中的生命周期钩子 `componentDidMount`**

```jsx
useEffect(() => {});
```

> 如下：
>
> ```jsx
> import React, { useState } from "react";
> export default function Home() {
>   const [num, setNum] = useState(0);
>   const add = () => setNum(num + 1);
>
>   React.useEffect(() => {
>     console.log("useEffect");
>   });
>
>   return (
>     <div>
>       <h1>{num}</h1>
>       <button onClick={add}>num+1</button>
>     </div>
>   );
> }
> ```

### 非空数组监测项

若有监测依赖项，仅当监测依赖项状态，状态更新变化，才调用`useEffect()`

**相当于类组件中的生命周期钩子 `componentDidUpdated`**

```jsx
useEffect(() => {}, [监测的状态]);
```

> 如下：仅当监测的状态`num`更新时才会执行`useEffect()`
>
> ```jsx
> import React, { useState, useEffect } from "react";
> export default function Home() {
>   const [num, setNum] = useState(0);
>   const add = () => setNum(num + 1);
>
>   const [name, setName] = useState("Jack");
>   const changeName = () => setName("Andy");
>
>   useEffect(() => {
>     console.log("useEffect");
>   }, [num]);
>
>   return (
>     <div>
>       <h1>{name}</h1>
>       <h1>{num}</h1>
>       <button onClick={add}>num+1</button>
>       <button onClick={changeName}>change Name</button>
>     </div>
>   );
> }
> ```

### 空数组监测项

监测依赖项为空数组时，不检测任何状态，除了组件第一次渲染之后不再执行 `useEffect()`

```jsx
useEffect(() => {}, []);
```

> 如下：除了组件第一次渲染时调用，无论状态`num`、`name`哪一个更新都不执行`useEffect()`
>
> ```jsx
> import React, { useState, useEffect } from "react";
> export default function Home() {
>   const [num, setNum] = useState(0);
>   const add = () => setNum(1);
>
>   const [name, setName] = React.useState("Jack");
>   const changeName = () => setName("Andy");
>
>   useEffect(() => {
>     console.log("useEffect");
>   }, []);
>
>   return (
>     <div>
>       <h1>{name}</h1>
>       <h1>{num}</h1>
>       <button onClick={add}>变成 1</button>
>       <button onClick={changeName}>变成 Andy</button>
>     </div>
>   );
> }
> ```

### 第一个参数返回值

`useEffect()` 函数的返回值是个函数，在组件卸载前调用

**相当于类组件中的生命周期钩子`componentWillUnmount`**

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
> import React, { useState, useEffect } from "react";
> import ReactDOM from "react-dom";
> export default function Demo() {
>   const [num, setNum] = useState(0);
>
>   useEffect(() => {
>     let timer = setInterval(() => {
>       setNum((num) => num + 1);
>     }, 1000);
>     return () => clearInterval(timer);
>   }, []);
>
>   const unmount = () =>
>     ReactDOM.unmountComponentAtNode(document.getElementById("root"));
>
>   return (
>     <div>
>       <h1>{num}</h1>
>       <button onClick={unmount}>卸载组件</button>
>     </div>
>   );
> }
> ```

## useContext()

用于后代组件接收父辈组件通过`Context`的传值

### 使用步骤

**1. 公共位置创建并导出`Context`容器**

通过`createContext`创建`Context`容器

```js
import { createContext } from "react";
export const 自定义Context容器 = createContext();
```

**2. 父辈组件通过容器`Provider`组件传入数据**

通过`Provider`组件的标签属性`value`传入数据

```jsx
<父组件>
  <自定义Context容器.Provider value={数据}>
    <后代组件 />
  </自定义Context容器.Provider>
</父组件>
```

**3. 后代组件通过钩子接收父辈组件的`Context`容器传的数据**

导入父辈组件传出的`Context`容器

通过`useContext`钩子调用`Context`容器获取传递的数据

```jsx
import { useContext } from "react";
import 先祖组件中自定义Context容器 from "先祖组件路径";
const 数据 = useContext(Context容器);
```

### 实例

组件关系：

```jsx
<Demo>
  <A>
    <B>
      <C />
    </B>
  </A>
</Demo>
```

// 祖先组件 Demo

```jsx
import React, { createContext, useState } from "react";
import A from "./components/A";

export const userContext = createContext();

export default function Demo() {
  const [user, setUser] = useState({
    name: "Jack",
    age: 28,
  });

  return (
    <userContext.Provider value={user}>
      <A />
    </userContext.Provider>
  );
}
```

后辈组件 C：

```jsx
import React, { useContext } from "react";
import { userContext } from "../App";

export default function C() {
  const user = useContext(userContext);
  return (
    <div>
      Name: {user.name}
      Age: {user.age}
    </div>
  );
}
```

## useReducer()

可结合`useReducer()` + `useEffect` 代替 `Redux` ，共享操作组件间状态

类似`Redux`实现原理，也通过`Reducer`函数 + `Action`动作对象实行状态数据的操作

参考 [Redux]()

### 使用步骤

**1. 公共位置创建并导出`reducer`处理函数**

函数接收两个参数：初始状态、`action`动作对象

函数内部通过判断`action`动作对象的`type`属性值返回不同的状态

```js
export const reducer函数 = (状态, action) {
  switch action.type
    case "type的类型": return 处理后的状态
    case "type的类型": return 处理后的状态
    default: return 状态初始值
}
```

**2. 使用`useReducer()`钩子**

传入`reducer`处理函数和状态初始值

```js
const [状态, dispatch] = useReducer(Reducer函数, 状态初始值);
```

**3. 传递`action`动作对象**

通过`action` 动作对象操作数据

动作对象必须包含`type`属性描述动作行为

若有数据要传递则通过`payload`属性传递

```jsx
dispatch({
  type: "动作行为描述",
  payload: 自定义数据,
});
```

### 实例

```jsx
import React, { useReducer } from "react";

const ReducerFunc = (state, action) => {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    default:
      return state;
  }
};

export default function Demo() {
  const [num, dispatch] = useReducer(ReducerFunc, 0);

  const add = () => dispatch({ type: "INCREMENT" });
  const sub = () => dispatch({ type: "DECREMENT" });
  return (
    <div>
      <h1>{num}</h1>
      <button onClick={add}>+1</button>
      <button onClick={sub}>-1</button>
    </div>
  );
}
```

## 代替 Redux

通过`useEffect()` + `useReducer()` 代替`Redux`

如下:

```js
// reducer函数
export const getDataReducer = (state, action) => {
  switch (action.type) {
    case "REQUEST_SUCCESS":
      return {
        isLoading: false,
        list: action.payload.list,
      };
    case "REQUEST_ERROE":
      return {
        isLoading: false,
        list: action.payload.list,
        error: action.payload.error,
      };
    default:
      return state;
  }
};
```

```jsx
import React, { useEffect, useReducer } from "react";
import loading from "../assets/images/loading.gif";
import axios from "axios";
// 获取 reducer函数
import { getDataReducer } from "../utils/01";
// 设定状态初始值
const initState = {
  isLoading: true,
  list: [],
};

export default function Demo() {
  const [data, dispatch] = useReducer(getDataReducer, initState);

  useEffect(() => {
    axios
      .get("http://localhost:8080/list")
      .then((res) => {
        dispatch({
          type: "REQUEST_SUCCESS",
          payload: { list: res.data.list },
        });
      })
      .catch((err) => {
        dispatch({
          type: "REQUEST_SUCCESS",
          payload: { error: err.massage },
        });
      });
  }, []);

  return (
    <div>
      {data.list.map((item) => (
        <p key={item.id}>
          {item.name} - {item.age}
        </p>
      ))}
      {data.isLoading ? <img src={loading} /> : null}
      {data.list.length ? null : <p>加载中...</p>}
    </div>
  );
}
```

## useMemo()

...

## useCallback()

...

## useRef()

用于在函数组件中获取 DOM 标签节点

### 步骤

**1. 定义 Ref 容器**

```jsx
import { useRef } from "react";
const 自定义Ref容器 = useRef();
```

**2. 标签挂载 Ref 容器**

```jsx
<标签 ref={自定义Ref容器} />
```

**3. 获取方式与类组件的 `refs`属性一样**

```js
// 获取标签DOM本身
自定义Ref容器.current;

// 获取标签value值
自定义Ref容器.current.value;
```

### 实例

> 如下：
>
> ```jsx
> import React, { useRef } from "react";
> export default function Home() {
>   const myRef = useRef();
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

```js
function useWindowSize() {
  const [size, setSize] = useState({
    width: document.documentElement.clientWidth,
    hight: document.documentElement.clientHeight,
  });

  const onResize = useCallback(() => {
    setSize({
      width: document.documentElement.clientWidth,
      hight: document.documentElement.clientHeight,
    });
  }, []);

  useEffect(() => {
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return size;
}
```

```jsx
import React from "react";
import { useWindowSize } from "customHooks";

export default function App() {
  const size = useWindow();
  return (
    <div>
      Width:{size.width}
      height:{size.hight}
    </div>
  );
}
```
