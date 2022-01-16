# Redux 基础

![](https://upload.wikimedia.org/wikipedia/commons/3/30/Redux_Logo.png)

[[toc]]

## 简介说明

![](https://qiita-user-contents.imgix.net/https%3A%2F%2Fcss-tricks.com%2Fwp-content%2Fuploads%2F2016%2F03%2Fredux-article-3-03.svg?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=3759e30c2034337af7e0bdfe089f038b)

`Redux`适合多交互多数据源的场合，所有状态保存在一个对象里

若项目的 UI 层非常简单且没有很多互动的话，用了`Redux`反而增加复杂性

## 核心概念

::: tip Redux 3 大核心概念：

- [Store 状态对象](#store)

- [Action 动作对象](#action)

- [Reducer 状态函数](#reducer)

:::

## 执行原理

![](https://res.cloudinary.com/practicaldev/image/fetch/s--EirMc8cO--/c_imagga_scale,f_auto,fl_progressive,h_500,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/pyhm0w8sbuo75op77md2.jpg)

::: tip Redux 执行原理：

1. 由`store`对象统一管理需要被托管的状态
2. 组件通过固定 API 从`store`获取状态
3. 组件通过固定 API 发送`action`动作对象给`store`实现修改状态
4. `store`将动作对象转交给`reducer`函数来操作状态
5. 组件通过固定 API 监测`store`中状态的变化并更新渲染 UI

:::
因为状态并不是直接由`store`操作，实际操作状态的是`reducer`函数，所以`Redux`的执行流程也可理解为：

![](https://blog.codecentric.de/files/2017/12/Bildschirmfoto-2017-12-01-um-08.56.48.png)

## 安装

```bash
npm install redux
# 或
yarn add redux
```

## 目录

```js
|- src
    |- store
        |- actionCreators
            |- /**/
            |- index.js
        |- reducers
            |- /**/
            |- index.js
        |- index.js
    |- components
    |- pages
```

## store

一个应用只能有一个`store`

`store`对象内存放各个组件内需要被统一管理的状态

通过`Redux`提供的`createStore()`方法创建

> 如下：

```js
// src/store/index.js
import { createStore } from "redux";
import reducers from "../reducers/index";

export default createStore(reducers);
```

::: tip store 给组件提供了 3 个方法来获取和操作状态：

- [store.getState()](#store.getState)
- [store.dispatch(action)](#store.dispatch)
- [store.subscribe](#store.subscribe)

:::

### store.getState

组件中通过`store.getState()`实时获取`store`中状态数据

详见[获取 Store 中状态](#获取-store-中状态)

---

### store.dispatch

组件中通过`store.dispatch()`将`action`动作对象传入`reducer`函数

详见[更新 Store 中状态](#更新-store-中状态)

---

### store.subscribe

组件中通过`store.subscribe()`监测`store`中状态数据的变化

详见[监测 Store 中状态变化](#监测-store-中状态变化) 并 [更新页面 UI](#更新页面-UI)

## action

动作对象`action`是个 JS 对象，仅用来描述动作类型，告知`reducer`函数要对`store`中状态进行何种操作，但不具体执行动作

组件内调用该动作对象生成器函数获取`action`对象后传递给`store`

### 构成

通过`type`属性指定一个字符串来表示动作

> `type`为必须属性，值为字符串常量

通过`payload`属性携带参与动作的数据

> 可定义任意其他属性携带数据

```js
{
    type: "DOWHAT",
    playload: {
        // 自定义数据: 值
    }
}
```

### actionCreators

动作对象一般由动作对象创建函数`actionCreator`函数创建返回

```js
function 自定义名(params) {
  return {
    type: "DOWHAT",
    ...params,
  };
}
```

> 如下：

```js
const INCREASE = "INCREASE_ACCOUNT_MONEY";
const DECREASE = "DECREASE_ACCOUNT_MONEY";

export const createIncreaseAccountAction = (params) => ({
  type: INCREASE,
  payload: params,
});
export const createDecreaseAccountAction = (params) => ({
  type: DECREASE,
  payload: params,
});
```

### dispatch()

动作对象通过`store.dispatch()`传递到`store`，然后被 Redux 内部转给`reducer`函数

`reducer`函数内根据接收的`action`动作对象的`type`属性值对状态进行操作

```js
组件方法 = () => {
  const action = 动作对象生成器函数();
  store.dispatch(action);
};
```

> 如下：

```js
import store from "../../store";
import {
  createIncreaseAccountAction,
  createDecreaseAccountAction,
} from "../../store/actionCreators";

export default function MyComponent() {
  const increase = () => {
    const action = createIncreaseAccountAction({ num: 10 });
    store.dispatch(action);
  };
  const decrease = () => {
    const action = createDecreaseAccountAction({ num: 10 });
    store.dispatch(action);
  };

  return (
    <>
      <button onClick={increase}>+10</button>
      <button onClick={decrease}>-10</button>
    </>
  );
}
```

## reducer

是个用来**初始化状态数据**和接收`action`后**更新状态数据**的函数

函数返回值就是被`store`统一管理的状态的值

接收两个参数：状态的初始值、动作对象

由`store`对象调用，默认初始化初始化时调用一次，然后`return`返回指定默认值作为状态数据的初始值。

此后每次组件通过`dispatch()`传递`action`时被调用，函数内通过`switch case`语句判断接收的动作对象中`type`属性后对状态进行修改操作,然后通过`return`处理后的状态的结果返回给`store`

### 构成

```js
export const 自定义名 = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "描述 1":
      return /* state的新结果 */;
    case "描述 1":
      return /* state的新结果 */;
    default:
      return initState;
  }
};
```

> 如下：

```js
export default function reducer(state = 0, action) {
  switch (action.type) {
    case "INCREMENT_NUM":
      return state + action.data.num;
    case "DECREMENT_NUM":
      return state - action.data.num;
    case "CHANGE_NAME":
      return "Andy";
    default:
      return state;
  }
}
```

### combineReducers()

通过`combineReducers()` 方法将众多 `reducers`集合为一个`rootReducer`函数

该合并函数接收一个对象，对象属性是`store`管理的状态，状态值是`reducers`函数的返回值

创建`store`时接收`rootReducer`作为参数

```js
|- store
  |- reducers
    |- / * reducer01.js * /
    |- / * reducer02.js * /
    |- index.js
  |- index.js
```

```js
// store/reducers/index.js
import { combineReducers } from "redux";

const reducers = combineReducers({
  自定义状态名: reducer函数,
  自定义状态名: reducer函数,
});
export default reducers;
```

```js
// src/store/index.js
import { createStore } from "redux";
import reducers from "../reducers/index";

export default createStore(reducers);
```

> 如下：

```js
import { combineReducers } from "redux";
import nameChanger from "./nameChanger.js";
import numberHandler from "./numberHandler.js";

const reducers = combineReducers({
  number: numberHandler,
  name: nameChanger,
});

export default reducers;
```

```js
const INIT_NUMBER = 0
const INIT_NAME = 'Jack'

export default function numberHandler(state = INIT_NUMBER , action) {
  const { type, playload } = action;
  switch (type) {
    case "INCREMENT_NUM": return state + payload.num;
    case "DECREMENT_NUM": return state - payload..num;
    default: return state;
  }
}

export default function nameChanger(state = INIT_NAME, action) {
  const { type, playload } = action;
  switch (type) {
    case "CHANGE_NAME": return  "Jack" ? "Andy" : "Jack";
    default: return state;
  }
}
```

## 基本用法

### 创建 reducer

#### 单一 reducer

```js
function Reducer(state = 初始值, action) {
  switch (action.type) {
    case type属性值:
      return state 操作 action.自定义属性;
    default:
      return state;
  }
}
```

> 如下：
>
> ```js
> export default function reducer(state = 0, action) {
>   switch (action.type) {
>     case "INCREMENT_NUM":
>       return state + action.data.num;
>     case "DECREMENT_NUM":
>       return state - action.data.num;
>     case "CHANGE_NAME":
>       return "Andy";
>     default:
>       return state;
>   }
> }
> ```

#### 多个 reducer

为了防止`reducer`函数过于庞大，建议拆分来写

通过`combineReducers()` 方法将`reducers`集合为一个`rootReducer`函数

```js
const rootReducer = combineReducers({
  自定义属性名: 拆分的reducer函数,
  自定义属性名: 拆分的reducer函数,
});
export default rootReducer;
```

详见[合并多个 reducers](#combinereducers)

组件中获取状态时要

> 如下：
>
> ```js
> import { createStore } from "redux";
> import rootReducer from "../reducers/index";
> export default createStore(rootReducer);
> ```
>
> ```js
> import numberHandler from "./numberHandler";
> import nameChanger from "./nameChanger";
> import { combineReducers } from "redux";
>
> export default combineReducers({
>   num: numberHandler,
>   name: nameChanger,
> });
> ```
>
> ```js
> export default function numberHandler(state = 0, action) {
>   switch (action.type) {
>     case "INCREMENT_NUM":
>       return state + action.data.num;
>     case "DECREMENT_NUM":
>       return state - action.data.num;
>     default:
>       return state;
>   }
> }
> ```
>
> ```js
> export default function nameChanger(state = "Jack", action) {
>   switch (action.type) {
>     case "CHANGE_NAME":
>       return state === "Jack" ? "Andy" : "Jack";
>     default:
>       return state;
>   }
> }
> ```
>
> ```jsx
> import React from "react";
> import store from "../redux/store/index";
> // console.log(store.getState());
> // {number: 0, name: 'Jack'}
>
> export default function A() {
>   const { number, name } = store.getState();
>   return (
>     <div>
>       <h1>{number}</h1>
>       <h1>{name}</h1>
>     </div>
>   );
> }
> ```

### 创建 store 容器

`store`对象通过`Redux`提供的`createStore()`方法创建

实际开发常将`store`放入单独文件

```js
import { createStore } from "redux";
import reducer from "../reducer/index";

export default createStore(reducer);
```

组件文件内导入`store`在组件内使用`store`提供的方法

```jsx
import store from "文件路径";
const 组件 = () => {};
```

### 获取 Store 中状态

一个`store`对象只有一个`state`状态

组件内通过`store.getState()`方法获取状态数据

```js
const state = store.getState();
```

### 更新 Store 中状态

组件内通过`store.dispatch()`方法传递`action`动作对象更新状态

```js
store.dispatch({
  type: "动作类型描述",
});
```

一般是通过自定义`Action Creator`函数创建并返回`action`对象，然后组件内调用该动作对象生成器函数获取`action`对象后传递给`store`

```js
const 动作对象生成器函数 = () => ({
  type: "具体动作描述",
});
```

```js
组件方法 = () => {
  const action = 动作对象生成器函数();
  store.dispatch(action);
};
```

> 如下：组件传递两个不同`action`动作对象
>
> ```js
> export function AddNum() {
>   return {
>     type: "INCREMENT",
>     data: {
>       num: 1,
>     },
>   };
> }
>
> export function subNum() {
>   return {
>     type: "DECREMENT",
>     data: {
>       num: 2,
>     },
>   };
> }
> ```
>
> ```jsx
> import React from "react";
> import store from "../redux/store/index";
> import { AddNum, subNum } from "../redux/actions/index";
>
> export default function B() {
>   const add = () => {
>     store.dispatch(AddNum());
>   };
>   const subtract = () => {
>     store.dispatch(subNum());
>   };
>   return (
>     <div>
>       <button onClick={add}>+1</button>
>       <button onClick={subtract}>-2</button>
>     </div>
>   );
> }
> ```
>
> ```js
> const initialState = 0;
> function Reducer(state = initialState, action) {
>   switch (action.type) {
>     case "INCREMENT":
>       return state + action.data.num;
>
>     case "DECREMENT":
>       return state - action.data.num;
>
>     default:
>       return state;
>   }
> }
>
> export default Reducer;
> ```

### 监测 Store 中状态变化

组件内通过`store.subscribe()`方法监测状态变化

只要`store`对象中的状态数据发生变化该方法就被调用

```js
componentDidMount(){
  store.subscribe(()=>{
    console.log('状态更新了')
    console.log(store.getState().data)
  })
}
```

### 更新页面 UI

`Redux`只是管理操作状态数据，并不能实现页面更新渲染，即使实现了`store`中状态的更新，组件也实时获取了新的状态数据，但是页面不会得到及时渲染

虽然组件内可通过`store.subscribe()`方法监测`store`中状态的更新变化，但还是需要通过`React`自身的 API 才能实现组件重新渲染和页面 UI 更新

#### 方法一

**组件内监听状态变，重新渲染当前组件**

在使用了`store`中状态的组件内，在生命周期钩子中调用`store.subscribe()`方法监测`store`中状态的更新变化，状态变化时通过`this.setState()`方法重新渲染当前组件，将状态更新到页面，实现页面 UI 更新

> React 中除了`render()`方法外`setState()`方法也能实现组件重新渲染，通过传入一个空对象实现页面重新渲染（不更新组件自身状态仅重新渲染组件）

```js
componentDidMount(){
  store.subscribe(()=>{
    this.setState({})
  })
}
```

---

#### 方法二

**监听状态变化，重新渲染整个`App`根组件**

在`App.jsx`根组件中调用`store.subscribe()`方法监测`store`中状态的更新变化，状态变化时调用`ReactDOM.render()`重新渲染整个`App`根组件

```jsx
const render = () =>
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById("root")
  );

store.subscribe(render);
render();
```
