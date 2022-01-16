# React-Redux

![](https://www.ruanyifeng.com/blogimg/asset/2016/bg2016092101.jpg)

<!-- [[toc]]

## 简介

`React-Redux`是个 Redux 官方出的库

用于更加方便地在`React`中使用`Redux`集中管理状态

<br/>

## UI 组件 & 容器组件

::: tip React-Redux 将所有组件分成两大类：

- **UI 组件**（presentational component）

  所有的 UI 都要包裹在一个容器中<br/>
  只负责 UI 的呈现和事件监听，不能使用任何`Redux`的 API<br/>
  没有`State`状态，数据由参数`Props`提供

- **容器组件**（container component）

  使用任何`Redux`的 API<br/>
  只负责集中状态数据操作管理<br/>

:::

<br/>

## 使用步骤

### 安装

```bash
yarn add react-redux

yarn add redux
```

### 目录

```js
|-src
    |- store
        |- Reducers
            |- /*accountReducer.js*/
            |- /*userReducer.js*/
            |- index.js
        |- index.js
|- components
|- App.js
|- index.js
```

### 创建 Reducer

根据 **`action`** 传递的 **`type`**、**`payload`** 对初始状态 **`initState`** 进行不同处理，然后`return`返回处理结果

::: tip action 传递的内容

- **action.type**：动作类型
- **action.payload**：传递的数据
  :::

> 如下：
>
> 创建并导出一个`accountReducer`

```js
const reducer = (initState = 0, action) => {
  const { type, payload } = action;

  switch (type) {
    case "INCREASE":
      return initState + payload;
    case "DECREASE":
      return initState - payload;
    default:
      return initState;
  }
};

export default reducer;
```

### 创建 Reducers

> 如下：
>
> 根据导入一个`accountReducer`创建并导出 `reducers`

```js
import { combineReducers } from "redux";
import accountReducer from "./accountReducer";

const reducers = combineReducers({
  account: accountReducer,
});

export default reducers;
```

### 创建 Store

```js
import { createStore } from "redux";
import reducers from "./redcers/index";

const store = createStore(reducers, {
  /*default state*/
});

export default store;
```

### 包裹 UI 根组件

> 如下：项目入口文件`index.js`

```jsx
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { Provider } from "react-redux";
import store from "./store";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);
```

<br/>

## Provider

使整个 App 组件都能获取 store 中的数据

> 如下：项目入口文件`index.js`

```jsx
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { Provider } from "react-redux";
import store from "./store";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);
```

<br/>

## useSelector()

```jsx
import React from "react";
import { useSelector } from "react-redux";

export default function A() {
  const account = useSelector((state) => state.account);
  console.log(account);

  return (
    <div>
      <h1>{account}</h1>
    </div>
  );
}
```

<br/>

## useDispatch()

<br/>

## TS

```bash
yarn add react-redux

yarn add @types/react-redux
``` -->

## 简介

`React-Redux`是专供 React 框架使用的 Redux 库

Redux 这个库不仅支持 React，只是和 React 一起更搭配。但是在 React 中使用 Redux 的话，哪个组件中使用了状态或操作了状态，就要在哪个导入`store`然后注册监听并取消监听，若组件过多会太过麻烦

所以，可通过`React-Redux`这个库来统一管理 `store`，使组件更方便地从`store`获取状态和分发动作对象更新状态

## 安装

`React-Redux`还是依赖 Redux 的`store`，所以也要下载 Redux

```bash
yarn add redux
yarn add react-redux
```

## Redux 准备

### actions

由`actionCreator`函数创建动作对象`action`

该对象包含描述动作类型的`type`属性、携带参数数据的`playload`属性

在组件中通过`dispatch`方法将动作对象分发给`store`

```js
|- store
    |- actionCreators
        |- /**/
        |- index.js
```

```js
export const 自定义名 = (params) => ({
  type: "动作描述",
  payload: params,
});
```

```jsx
const dispatch = useDispatch();

const 组件方法 = () => {
  const action = 动作对象创建函数({
    传递数据: 值,
  });
  dispatch(action);
};
```

### reducers

Reducer 函数是根据动作对象的动作类型描述`action.type`来更新状态

函数返回值就是状态的结果，若没有操作则返回状态的默认值

有多个状态时通过`Redux`的`combineReducers()`方法合并多个 Reducer 函数

```js
|- store
    |- reducers
        |- /* reducer-01.js */
        |- /* reducer-02.js */
        |- index.js
```

```js
// store/reducers/自定义Reducer函数.js

const 自定义Reducer函数名 = (state = initValue, action) => {
  const { type, payload } = action;
  switch (type) {
    case "动作描述":
      return /* 操作state后的结果 */;
    case "动作描述":
      return /* 操作state后的结果 */;
    default:
      return initValue; /* 没有操作时返回状态默认值 */
  }
};
export default 自定义Reducer函数名;
```

```js
// store/reducers/index.js

import { combineReducers } from "redux";
import 自定义Reducer函数 from "./自定义Reducer函数";
import 自定义Reducer函数 from "./自定义Reducer函数";

const reducers = combineReducers({
  自定义状态名: 自定义Reducer函数,
  自定义状态名: 自定义Reducer函数,
});

export default reducers;
```

> 如下：

```js
|- store
    |- reducers
        |- accountReducer.js
        |- index.js
```

```js
const initValue = 0;
const reducer = (state = initValue, action) => {
  const { type, payload } = action;
  switch (type) {
    case "INCREASE":
      return (state += payload.num);
    case "DECREASE":
      return (state -= payload.num);
    default:
      return initValue;
  }
};
export default reducer;
```

```js
import { combineReducers } from "redux";
import accountReducer from "./accountReducer";

const reducers = combineReducers({
  account: accountReducer,
});

export default reducers;
```

### store

```js
|- store
    |- actionCreators
        |- /**/
        |- index.js
    |- reducers
        |- /**/
        |- index.js
    |- index.js
```

```jsx
// src/store/index.js

import { createStore } from "redux";
import reducers from "../reducers/index";

export default createStore(reducers);
```

## Provider

**`<Provider />`组件**用于包裹整个根组件`App`组件，并接收`store`

内部原理通过`context`传递数据，使所有组件都可获取`store`

```jsx
// 入口文件 index.js
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { Provider } from "react-redux";
import store from "./store/index";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
```

## connect ()

> 已不使用，现阶段多用 Hooks 的方式
>
> `useSelector`、`useDispatch`、`useStore`

**`connect`方法** 用来把组件和`store`连接起来

`connect`方法的返回值是加强后的组件

```jsx
import { connect } from "react-redux";

const 组件 = (props) => {
  // console.log(props)
  return <></>;
};

// 将store中的state返回，作为组件props
const mapStateToProps = (state, ownProps) => ({
  state: state, // 就是store中的状态对象
  ownProps: ownProps, // 是组件自身props
});

// 定义dispatch函数来分发动作对象，dispatch函数作为组件props
const mapDispatchToProps = (dispatch, ownProps) => ({
  // dispatch 就是store.dispatch()
  // ownProps 是组件自身props
  自定义属性: () => {
    dispatch(动作对象);
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(组件);
```

### mapStateToProps

`mapStateToProps`函数作为`connect`方法的第一个参数

接收两个参数：store 中的状态对象、组件自身 props(可省略)

返回一个对象

将`store`中的数据作为返回值对象的一个属性挂载为组件`props`

> 如下：

```jsx
import React from "react";
import { connect } from "react-redux";

const MyComponent = (props) => {
  const { account } = props.state;

  return <h2>{account}</h2>;
};

const mapStateToProps = (state, ownProps) => ({
  state,
  ownProps,
});

export default connect(mapStateToProps)(MyComponent);
```

### mapDispatchToProps

`mapStateToProps`函数作为`connect`方法的第二个参数

接收两个参数：用于分发动作对象的 dispatch 函数、组件自身 props(可省略)

返回一个对象

对象中定义`dispatch`函数来分发动作对象

定义的`dispatch`函数会作为组件`props`挂载

> 如下：

```jsx
import React from "react";
import { connect } from "react-redux";

const MyComponent = (props) => {
  const increase = () => {
    props.increase();
  };
  const decrease = () => {
    props.decrease();
  };

  return (
    <div>
      <button onClick={increase}>+10</button>
      <button onClick={decrease}>-10</button>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  increase: () => {
    dispatch({
      type: "INCREASE",
      payload: { num: 10 },
    });
  },
  decrease: () => {
    dispatch({
      type: "DECREASE",
      payload: { num: 10 },
    });
  },
});

export default connect(null, mapDispatchToProps)(MyComponent);
```

## useSelector

```jsx
import React from "react";
import { useSelector } from "react-redux";

const 组件 = () => {
  const { reducers中定义状态名 } = useSelector((state) => state);
  // 或
  const 状态名 = useSelector((state) => state.状态名);

  return <></>;
};

export default 组件;
```

> 如下：

```jsx
import React from "react";
import { useSelector } from "react-redux";

export default function A() {
  const { account } = useSelector((state) => state);
  return <h2>{account}</h2>;
}
```

```js
// store/reducers/accountReducer.js
const initValue = 0;
const reducer = (state = initValue, action) => {
  const { type, payload } = action;
  switch (type) {
    case "INCREASE":
      return (state += payload.num);
    case "DECREASE":
      return (state -= payload.num);
    default:
      return initValue;
  }
};
export default reducer;
```

```js
// store/reducers/index.js
import { combineReducers } from "redux";
import accountReducer from "./accountReducer";

const reducers = combineReducers({
  account: accountReducer,
});

export default reducers;
```

### 重新渲染

`selector`的值改变会造成 re-render

如果需要进一步的性能优化，可以在`React.memo()`中包装函数组件：

```jsx
import { memo } from 'react'

const CounterComponent = ({ name }) => {
  const { counter } = useSelector(state => state)

  return (
    <div>
      {name}: {counter}
    </div>
  )
}

export const memo(CounterComponent)
```

## useDispatch

这个 Hook 返回 store 中对`dispatch`函数的引用

```jsx
import React from "react";
import { useDispatch } from "react-redux";

export default function B() {
  const dispatch = useDispatch();

  const increase = () => {
    dispatch({
      type: "INCREASE",
      payload: { num: 10 },
    });
  };

  const decrease = () => {
    dispatch({
      type: "DECREASE",
      payload: { num: 10 },
    });
  };

  return (
    <div>
      <button onClick={increase}>+10</button>
      <button onClick={decrease}>-10</button>
    </div>
  );
}
```

## useStore

这个 Hook 返回 `<Provider>`组件的`store`对象的引用

这个钩子应该不长被使用，`useSelector`应该作为首选

```jsx
import React from "react";
import { useStore } from "react-redux";

export const CounterComponent = ({ value }) => {
  const store = useStore();

  // 仅仅是个例子! 不要在你的应用中这样做.
  // 如果store中的state改变，这个将不会自动更新
  return <div>{store.getState()}</div>;
};
```
