# Hooks 钩子函数

![](https://www.wangbase.com/blogimg/asset/201908/bg2019083104.jpg)

[[toc]]

## 简介

组件化开发有函数组件、类组件两种方式。`React 16.8.0` 版本之前组件的标准写法是类组件。但是类组件的缺很明显：复杂、逻辑分散。

按照 React 的开发思想，组件不应该是个复杂的容器，而是个可根据需要进行组合的数据流的管道，即组件尽量写成纯函数。但是`React 16.8.0` 版本之前的函数组件是无状态组件，没有 `state`属性、`refs`属性、生命周期钩子函数等，没有太大用处。

为了摆脱只能依赖类组件， `React 16.8.0` 新增了 **Hooks 钩子函数**（用钩子把组件需要的外部功能和副作用代码钩进来）使函数组件中也可以使用 `state`属性、`refs`属性、生命周期钩子函数等其他 React 特性。

**Hooks 钩子函数** 一律使用`use`前缀命名，使用 `xxx` 功能就命名为 `useXxx`。

::: tip 常用钩子函数

- 状态钩子：useState()
- 副作用钩子：useEffect()
- 父子传值：useContext()
- 状态共享：useReducer()
- useRef()
- 缓存一个数值：：useMemo()
- 缓存一个函数：useCallback()

:::

## useState()

**`useState()`** 用于声明状态并提供可修改状态的方法函数

先导入`useState()`方法并将要声明的状态的初始值作为参数导入，然后从返回值中解构数组获取状态变量和修改状态的方法

```jsx
const [状态名, set状态名] = React.useState(状态初始值);
```

如下：

```jsx
import React from "react";
import { useState } from "react";

export default function Demo() {
  const [num, setNum] = useState(0);

  return (
    <>
      <h2>{num}</h2>
      <button onClick={() => setNum(num + 1)}>+1</button>
    </>
  );
}
```

### 组件渲染次数

`useState()`创建的状态每更新修改一次都会导致当前该函数组件调用渲染一次

> 类似类组件的`render`

修改后的新状态值会作为缓存保存，不会因为重新渲染导致状态又变回初始值

```jsx
import React from "react";
import { useState } from "react";

export default function Demo() {
  const [num, setNum] = useState(0);

  console.log("函数组件渲染了"); // 渲染 n+1 次

  return (
    <>
      <h2>{num}</h2>
      <button onClick={() => setNum(num + 1)}>+1</button>
    </>
  );
}
```

### 使用状态变量

在`JXS`或`JS`中直接使用解构获取的状态变量即可

如下：声明并使用多个状态

```jsx
import React from "react";
import { useState } from "react";

const defaultSkills = [
  { name: "Vue", level: "中级" },
  { name: "React", level: "初级" },
];

export default function Demo() {
  const [name, setName] = useState("Andy");
  const [age, setAge] = useState(28);
  const [skills, setSkills] = useState(defaultSkills);

  return (
    <>
      <h3>{name}</h3>
      <h3>{age}</h3>
      {skills.map((item, index) => (
        <h3 key={index}>
          {item.name} - {item.level}
        </h3>
      ))}
    </>
  );
}
```

### 使用修改状态方法

状态每修改一次当前该函数组件就被调用渲染一次

修改后的新值会作为缓存保存，不会因为重新渲染导致状态又变回初始值

#### 参数写法一

```jsx
set状态名(新状态);

// setNum(1)
// setNum(num+1)
// setName('andy')
```

如下：

```jsx
import React, { useState } from "react";
export default function Demo() {
  const [num, setNum] = React.useState(0);

  const add = () => setNum(num + 1);

  return (
    <div>
      <h2>{num}</h2>
      <button onClick={add}>num+1</button>
    </div>
  );
}
```

---

#### 参数写法二

```jsx
set状态名((状态名) => 操作状态);

// setNum(num => num + 1)
// setAge(age => age.toString())
```

如下：

```jsx
import React, { useState } from "react";
export default function Demo() {
  const [name, setName] = useState("Jack");

  const change = () => {
    setName((name) => {
      return name === "Jack" ? "Andy" : "Jack";
    });
  };

  return (
    <div>
      <h2>{name}</h2>
      <button onClick={change}>change Name</button>
    </div>
  );
}
```

## useEffect()

**`useEffect()`** 用于模拟生命周期

```jsx
useEffect(() => {
  // 监测所有时，此处相当于 ComponentDidMount
  // 有监测项时，此处相当于 ComponentDidUpdate
  return () => {
    // 此处相当于 componentWillUnmount
  };
}, [监测项, 监测项]);
```

::: tip useEffect() 接受两个参数

- **参数一**：匿名函数

  根据监测依赖项模拟生命周期，返回值也是一个函数（在组件卸载时执行）

- **参数二**：数组（默认省略）

  监测依赖项

:::

::: tip 一钩三用

`useEffect()` 功能根据检测依赖项和参数返回值，

相当于类组件中的三个生命周期钩子的集合:

- **[componentDidMount()]()**
- **[componentDieUpdate()]()**
- **[componentWillUnmount()]()**

:::

### 调用次数与检测项

`useEffect()`会在组件初次渲染后先调用一次，之后的调用次数取决于是否有检测项，和检测项状态的变化

```jsx
import React from "react";
import { useEffect } from "react";

export default function Demo() {
  useEffect(() => {
    console.log("副作用Hook调用了"); //  第2个先打印
  });

  console.log("函数组件渲染了"); // 第1个先打印

  return <></>;
}
```

#### 监测所有（默认）

`useEffect()`省略监测项数组时，监测所有状态的变化

在组件初次渲染后先执行一次，之后只要有状态变化就会重新渲染组件然后会再次执行`useEffect()`

> 相当于`ComponentDidMount`

```jsx
import React from "react";
import { useState, useEffect } from "react";

export default function Demo() {
  const [num, setNum] = useState(0);

  useEffect(() => {
    console.log("调用了副作用Hook"); // 调用 n+1 次
  });

  return (
    <>
      <h2>{num}</h2>
      <button onClick={() => setNum(num + 1)}>+1</button>
    </>
  );
}
```

---

#### 无监测项

`useEffect()`省略监测项数组时，不检查任何状态的变化

仅在组件初次渲染后执行一次`useEffect()`

```jsx
import React from "react";
import { useState, useEffect } from "react";

export default function Demo() {
  const [num, setNum] = useState(0);

  useEffect(() => {
    console.log("调用了副作用Hook"); // 调用 1 次
  }, []);

  return (
    <>
      <h2>{num}</h2>
      <button onClick={() => setNum(num + 1)}>+1</button>
    </>
  );
}
```

---

#### 有检测项

`useEffect()`的第二个参数为非空数组时，仅监测该数组中的监测项状态变化

在组件初次渲染后先执行一次，之后仅在指定监测项状态变化时才会再次执行`useEffect()`

非监测项状态变化时，仅回导致组件渲染并不会执行`useEffect()`

> 此处相当于`ComponentDidUpdate`

```jsx
import React from "react";
import { useState, useEffect } from "react";

export default function Demo() {
  const [num, setNum] = useState(0);
  const [age, setAge] = useState(28);
  const [score, setScore] = useState(60);

  useEffect(() => {
    console.log("调用了副作用Hook"); // 仅 num, age 变化时才调用
  }, [num, age]);

  return (
    <>
      <button onClick={() => setNum(num + 1)}>num +1</button>
      <button onClick={() => setAge(age + 1)}>age +1</button>
      <button onClick={() => setScore(score + 1)}>score +1</button>
    </>
  );
}
```

### 参数返回值

`useEffect()`的第一个参数的返回值函数在组件被销毁卸载时执行（用于比如路由切换等时防止内存溢出）

```jsx
useEffect(() => {
  // 副作用操作（生命周期）

  return () => {
    // 组件卸载时的收尾工作
  };
}, [状态, 状态]);
```

```jsx
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

export default function App() {
  const [num, setNum] = useState(0);

  useEffect(() => {
    let timer = setInterval(() => setNum((num) => num + 1), 1000);
    return () => clearInterval(timer);
  }, [num]);

  const unmount = () =>
    ReactDOM.unmountComponentAtNode(document.getElementById("root"));

  return (
    <div>
      <h1>{num}</h1>
      <button onClick={unmount}>卸载组件</button>
    </div>
  );
}
```

### 异步执行

```jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        "https://hn.algolia.com/api/v1/search?query=redux"
      );
      setData(result.data.hits);
    };

    fetchData();
  }, []);

  return (
    <ul>
      {data.map((item) => (
        <li key={item.objectID}>
          <a href={item.url}>{item.title}</a>
        </li>
      ))}
    </ul>
  );
}
```

### 多个副作用

如果有多个且不相关的副效应时

应该调用多个`useEffect()`，而不应该合并写在一起

```jsx
import React, { useState, useEffect } from "react";

export default function App() {
  const [A, setA] = useState(0);
  const [B, setB] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => setA(A + 1), 1000);
    return () => clearTimeout(timeout);
  }, [A]);

  useEffect(() => {
    const timeout = setTimeout(() => setB(B + 2), 1000);

    return () => clearTimeout(timeout);
  }, [B]);

  return (
    <>
      <h3>A: {A}</h3>
      <h3>B: {B}</h3>
    </>
  );
}
```

## useContext()

用于深层父子组件间传值，子组件可不通过组件的`prop`参数就能接收来自祖先组件的数据

### 使用步骤

**1. 公共位置创建并导出`Context`容器**

通过`createContext()`创建并导出`Context`容器

```js
import { createContext } from "react";

export const 自定义Context容器 = createContext();
```

**2. 父辈组件传入数据**

父辈组件通过`Context`容器的`Provider`组件的标签属性`value`传入数据

```jsx
<父组件>
  <自定义Context容器.Provider value={数据}>
    <后代组件 />
  </自定义Context容器.Provider>
</父组件>
```

**3. 后代组件接收并使用父辈组件的`Context`容器**

后代组件导入`useContext()`钩子和父辈组件传出的`Context`容器

然后通过`useContext()`钩子调用`Context`容器获取传递的数据

```jsx
import { useContext } from "react";
import 自定义Context容器 from "先祖组件路径";
```

```jsx
export default function 后代组件() {
  const 数据 = useContext(自定义Context容器);

  return <div>{数据}</div>;
}
```

### 实例

组件关系：

```jsx
<A>
  <B>
    <C />
  </B>
</A>
```

组件内容：

```jsx
// 爷爷组件 A
import React from "react";
import { useState, createContext } from "react";
import B from "./B";

export const NumberContext = createContext();

export default function A() {
  const [num, setNum] = useState(0);

  return (
    <div>
      <NumberContext.Provider value={num}>
        <B />
      </NumberContext.Provider>

      <button onClick={() => setNum(num + 1)}>+1</button>
    </div>
  );
}
```

```jsx
// 爸爸组件 B
import React from "react";
import C from "./C";

export default function B() {
  return (
    <div>
      <C />
    </div>
  );
}
```

```jsx
// 儿子组件 C
import React from "react";
import { useContext } from "react";
import { NumberContext } from "./A";

export default function C() {
  const num = useContext(NumberContext);

  return <div>{num}</div>;
}
```

## useReducer()

类似[`Redux`](../../Redux/Redux.md)实现原理，也通过`Reducer`函数 + `Action`动作对象实行状态数据的操作

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

### 代替 Redux

代替 `Redux` ，共享操作组件间状态

如下:

```jsx
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
      throw new Error();
  }
};

import React, { useEffect, useReducer } from "react";
import loading from "../assets/images/loading.gif";
import axios from "axios";
// 获取 reducer函数
import { getDataReducer } from "../utils/getDataReducer";
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

## useRef()

**`useRef()`** 用于在函数组件中获取 DOM 标签节点

### 步骤

1. 定义 Ref 容器

```jsx
const 自定义Ref容器 = React.useRef();
```

2. 标签挂载 Ref 容器

```jsx
<标签 ref={自定义Ref容器}></标签>
```

3. 获取方式与类组件的 refs 属性一样

```jsx
// 获取标签 DOM 本身
自定义Ref容器.current;

// 获取标签 value 值
自定义Ref容器.current.value;
```

### 实例

如下：

```jsx
import React from "react";
export default function Home() {
  const myRef = React.useRef();

  const show = () => {
    console.log(myRef.current.value);
  };

  return (
    <div>
      <input type="text" ref={myRef} />
      <button onClick={show}>展示输入值</button>
    </div>
  );
}
```

## useMemo()

**`useMemo()`** 用于系统优化，缓存一个数据

可用于解决`useEffect()`处理数据时导致的每次状态更新都重复执行组件渲染这一高消耗性能问题

当一些值的计算量很大时可通过`useMemo()`来做一个缓存，仅依赖项变化时才会重新计算

### 基础使用

```jsx
const 数据 = useMemo(() => {
  // 计算某个数值
}, [监测项]);
```

::: tip useMemo() 接受两个参数

- **参数一**：匿名函数

  用于计算高消耗的数值，在组件渲染时执行

  不能在这个函数内部执行与计算无关的操作

- **参数二**：数组

  监测依赖项，仅依赖项变化时才会重新计算

:::

### 调用次数

只有依赖项变化时才会调用执行

若没有依赖项，每次组件渲染时都会调用`useMemo()`计算新值

如下：模拟一个切换列表的操作，仅`num`更新时`newData`才会被重新计算获取新值

```jsx
import React from 'react'
import { useState, useMemo } from 'react'

const defaultArray = [
  { title: 'Vue', id: 'FGVHBJN' },
  { title: 'Vue', id: 'FGVHBJN' }
]

export default function App() {
  const [num, setNum] = useState(null)

  const newData = useMemo(() => {
    return defaultArray.map(item => ({
      name: item.title,
      key: item.id,
      time: num
    }))
  }, [num])

  console.log(newData);

  return (
    <div className=“nav”>
      <button onClick={() => setNum(1)}>选项一</button>
      <button onClick={() => setNum(2)}>选项二</button>
      <button onClick={() => setNum(3)}>选项三</button>
    </div>
  )
}
```

### 实例

如下：GraphQL

```jsx
import React from "react";
import { useMemo } from "react";
import { useProductsQuery } from "graphql-hooks";

export default function Demo() {
  const [queryVariables, setQueryVariables] = useState({ status: null });
  const { data, refetch } = useProductsQuery({ variables: queryVariables });

  const dataSource = useMemo(() => {
    return (
      data?.products?.edges?.map((item) => {
        return {
          key: item.id,
          title: item.name,
          time: datetime(item.time),
          options: item.options.map((option, index) => {
            const division_string = options.length === index + 1 ? "" : "・";
            return option.name.jaJp + division_string;
          }),
        };
      }) || []
    );
  }, [data]);

  useEffect(() => {
    refetch(queryVariables);
  }, [queryVariables, refetch]);

  return (
    <div>
      {dataSource.map((item) => (
        <p key={item.key}>
          {item.title} - {item.time}
        </p>
      ))}
    </div>
  );
}
```

## useCallback()

**`useMemo()`** 用于系统优化，缓存一个函数

> 使用方法类似`useMemo()`

每次组件渲染都会导致组件内声明的方法函数被重新创建

比如，只要父组件更新了就会导致子组件更新，但很多场合子组件没有必要被重新渲染

此时就可使用`useCallback()`在子组件中定义方法

> 可用于调用节流、防抖函数

### 基础使用

```jsx
const 方法 = useCallback(() => {
  // 函数体逻辑处理
}, [依赖项]);
```

> https://zhuanlan.zhihu.com/p/56975681

如下：仅在子组件初次渲染时才声明`add`方法

```jsx
import React, { useState, useCallback } from "react";

const Child = () => {
  const [num, setNum] = useState(0);
  const add = useCallback(() => {
    setNum(num + 1)
  }, [])

  return (
    <h2>{num}</h2>
    <button onClick={add}>+1</button>
  )
};

const Father = () => {
  const [status, setStatus] = useState(true);
  return (
    <h1>{status}</h1>
    <button onClick={add}>change to {!status}</button>
    <Child/>
  )
}
export default Father;
```

## 自定义 Hook

一律使用 `use` 前缀命名，使用 `xxx` 功能就命名为 `useXxx`。

### 实例一：获取页面尺寸

```jsx
// 定义并表露出自定义Hook
export function useWindowSize() {
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
// 组件中使用自定义Hook
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

### 实例二
