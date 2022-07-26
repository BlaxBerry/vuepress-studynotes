# ahooks 中的常用 Hooks

![](https://pic1.zhimg.com/80/v2-e0bb0c87db507b2810194bacef8ca58c_1440w.jpg)

[[toc]]

## 简介

ahooks 是一个基于原生 React Hooks 的 Hooks 库。

比起仅使用原生 Hooks，极大降低了代码复杂度并提升了开发效率。

> 可以理解为专业团队封装的自定义 Hook
>
> 由蚂蚁 umi 团队、淘系 ice 团队、阿里体育团队开发，前身是蚂蚁开源的 [@umijs/hooks]()。

## 安装导入

```bash
npm i ahooks
# 或
yarn add ahooks
```

```js
import { useRequest, useSetState } from "ahooks";
```

<br/>

## useSetState

管理 object 对象类型状态的 Hooks

> 与类组件的 `this.setState()` 基本一致

以对象形式声明复杂状态，可以避免原生钩子`useState`多次声明导致状态拆分过细的繁琐问题

```tsx
// 原生钩子 useState 定义状态
const [a, setA] = useState();
const [b, setB] = useState();
const [c, setC] = useState();
const [d, setD] = useState();
...
```

```js
// useSetState() 声明对象形式状态
const [state, setState] = useSetState({
  a,
  b,
  c,
  d,
});
```

并且，在修改复杂类型类型状态时，

通过该钩子定义的状态在`setState()`修改时是采用**合并**的方式，仅修改不同的保留不变的

解决了原生钩子`useState`修改状态时是覆盖方式导致的必须携带上所有的状态的问题

```js
// 原生钩子 useState 修改状态
setUserInfo((allOldState) => ({
  ...allOldState,
  theOneChanged,
}));
```

```js
// useSetState() 自动合并新老状态
setUserInfo({
  theOneChanged,
});
```

<br/>

## useBoolean

更加优雅简洁去 **管理 Boolean 状态** 的 Hook

```jsx
import { useBoolean } from "ahooks";
```

```jsx
const [state, { toggle, setTrue, setFalse, set }] = useBoolean(默认值);
```

::: tip API

- **state**：状态，可不写默认为`false`

- **toggle()**：切换状态

- **settrue**：将状态切换为 `true`

- **setFalse**：将状态切换为 `false`

- **set(Boolean 值参数)**：手动设置状态值

:::

可以替代原生`useEffect`逐一监视 Boolean 状态的变化后修改状态的繁琐操作

> 如下：

```jsx
import React from "react";
import { useBoolean } from "ahooks";

export default function App() {
  const [state, { toggle, setTrue, setFalse, set }] = useBoolean(false);

  const change = (e) => {
    set(e.target.checked);
  };

  return (
    <>
      <h3>{state.toString()}</h3>
      <input type="checkbox" onChange={change} checked={state} />
      <hr />
      <button onClick={toggle}>切换</button>
      <button onClick={setFalse}>设为 false</button>
      <button onClick={setTrue}>设为 true</button>
    </>
  );
}
```

<br/>

## useRequest

**`useRequest`** 是一个异步数据请求管理的 Hooks, 常用于**网络请求**

默认执行数据请求，也可通过设置参数[手动触发请求](#手动触发请求)和[阻止默认请求](#阻止默认请求)

::: tip API

```tsx
const {
  loading: boolean,
  data?: TData,
  error?: Error,
  params: TParams || [],
  run: (...params: TParams) => void,
  runAsync: (...params: TParams) => Promise<TData>,
  refresh: () => void,
  refreshAsync: () => Promise<TData>,
  mutate: (data?: TData | ((oldData?: TData) => (TData | undefined))) => void,
  cancel: () => void,
} = useRequest<TData, TParams>(
  service: (...args: TParams) => Promise<TData>,
  {
    manual?: boolean,
    defaultParams?: TParams,
    onBefore?: (params: TParams) => void,
    onSuccess?: (data: TData, params: TParams) => void,
    onError?: (e: Error, params: TParams) => void,
    onFinally?: (params: TParams, data?: TData, e?: Error) => void,
  }
);
```

| 生命周期配置项（函数） | 触发时机     |
| ---------------------- | ------------ |
| **onBefore**           | 请求之前触发 |
| **onSuccess**          | 请求成功触发 |
| **onError**            | 请求失败触发 |
| **onFinally**          | 请求完成触发 |

:::

### 基础使用

```jsx
const { data, error, loading } = useRequest(() => 请求函数);
```

> 如下：

```tsx
import React from "react";
import { useState, useEffect } from "react";
import { useRequest } from "ahooks";
import axios from "axios";

const getAllHero = (name) => {
  return axios.get(`https://autumnfish.cn/api/lol/search?q=提莫`);
};

export default function App() {
  const { data, error, loading } = useRequest(getAllHero);

  if (error) {
    return <div>请求失败</div>;
  }
  if (loading) {
    return <div>loading...</div>;
  }

  return <div>数据: {data?.data.name}</div>;
}
```

---

### 手动触发请求

通过解构获取的 `run()` 或者 `runAsync()` 来触发执行请求

```jsx
const { run, runAsync } = useRequest(() => 请求函数);
```

- **run()** : 同步函数

  会自动捕获异常，通过解构获取错误信息 error, 异常处理可通过参数 `onError()`

```js
run(参数);
```

```js
const { data, error, loading, run } = useRequest(() => 请求函数, {
  onSuccess: (res, params) => {
    console.log(res.data); // 请求结果
    consol.log(params); // run(参数)调用请求函数时的参数数组
  },
  onError: (err) => {
    console.log(err);
  },
});
```

- **runAsync()** : Promise 异步函数

  需要自己异步捕获异常 `error`

```js
runAsync()
  .then((res) => {
    console.log(res); // 请求结果
  })
  .catch((error) => {
    console.log(error);
  });
```

> 如下：

```jsx
import React from "react";
import { useState } from "react";
import { useRequest } from "ahooks";
import axios from "axios";

const searchHero = (name) =>
  axios.get(`https://autumnfish.cn/api/lol/search?q=${name}`);

export default function App() {
  const [name, setName] = useState("");
  const fun = () => searchHero(name);

  const { data, error, loading, run } = useRequest(fun);

  const changeName = (e) => {
    setName(e.target.value);
  };

  return (
    <>
      <h3>{name}</h3>
      <input value={name} onChange={changeName} />
      <button onClick={() => run()}>{loading ? "加载中..." : "请求"}</button>
      <hr />

      {error && <div>请求失败</div>}
      {loading && <div>loading...</div>}
      {data && <> 数据: {data?.data?.data[0].title} </>}
    </>
  );
}
```

---

### 阻止默认请求

设置了 `manual = true` 则 `useRequest` 不会默认执行数据请求

需要通过解构获取的 `run()` 或者 `runAsync()` 来触发执行请求

```jsx
const { run } = useRequest(() => 请求函数, {
  manual: true,
});
```

```jsx
const { runAsync } = useRequest(() => 请求函数, {
  manual: true,
});
```

---

### 刷新请求

通过解构获取的 `refresh()` 和 `refreshAsync()` 实现刷新。

即使用上一次的参数，重新发起请求。

复杂参数的场景中可以使用 `refresh()` 来代替 `run(参数)`

`refresh` 和 `refreshAsync` 的区别和 `run` 和 `runAsync` 是一致的

```js
const { run, refresh } = useRequest(() => 请求函数);
```

---

### 取消请求

组件卸载时会默认取消正在进行的请求，

当上一次请求没结束时又发起了新的请求，会默认取消上一次请求

也可通过解构获取的 `cancel()` 手动取消当前正在进行的请求

```js
const { cancel } = useRequest(() => 请求函数);
```

---

### Loading Delay

通过设置 `loadingDelay: 毫秒` 延时状态的变更

即延迟 `loading` 变成 `true` 的时间，防止状态变更时的闪烁

```js
const { loading, data } = useRequest(getUsername, {
  loadingDelay: 300,
});

return <div>{loading ? "Loading..." : data}</div>;
```

### 防抖

### 节流

### 轮询

### 错误重试

<br/>

## useMount

只在**组件初始化**时执行的 Hook

```js
import { useMount } from "ahooks";
```

```js
useMount(() => {
  // 操作
});
```

> 如下：
>
> `Gatsby` 中页面组件加载时默认跳转路由

```tsx
// Gatsby项目/src/pages/index.tsx
import { navigate } from "gatsby";
import { useMount } from "ahooks";

const IndexPage = (): JSX.Element => {
  useMount(() => {
    navigate("/admin");
  });

  return <></>;
};

export default IndexPage;
```

<br/>

## useUnmountedRef

用于判断当前组件是否已经卸载，返回值为**布尔值**

```js
const unmountRef: { current: boolean } = useUnmountedRef();
```

<br/>

## useUnmount

仅组件卸载时执行的 Hook

```js
import { useUnmount } from "ahooks";
```

```js
useUnmount(() => {
  // 操作
});
```

<br/>

## useUpdateEffect

`useUpdateEffect` 用法等同于原生钩子 `useEffect`

但是会忽略首次执行，**只在依赖更新时执行**

```jsx
useUpdateEffect(() => {
  // 操作
  return () => {
    // 收尾
  };
}, [依赖项]);
```

> 如下：
>
> `useEffect`：会在开始就打印出`num`的默认值 0
>
> `useUpdateEffect`：不会打印出默认值，仅当`num`变化时才打印

```jsx
import React, { useEffect } from "react";
import { useState } from "react";
import { useUpdateEffect } from "ahooks";

export default function App() {
  const [num, setNum] = useState(0);

  useEffect(() => {
    console.log(num);
  }, [num]);

  useUpdateEffect(() => {
    console.log(num);
  }, [num]);

  return (
    <>
      <h3>{num}</h3>
      <button onClick={() => setNum(num + 1)}>+1</button>
    </>
  );
}
```

<br/>
