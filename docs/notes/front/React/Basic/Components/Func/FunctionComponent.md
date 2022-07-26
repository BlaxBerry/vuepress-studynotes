# React 函数组件

![img](https://cdn-ssl-devio-img.classmethod.jp/wp-content/uploads/2019/07/react.jpg)

[[toc]]

## 组件定义

React 函数式组件就是指通过 JS 函数形式定义的组件

::: tip React 函数创建组件的要求：

- 项目中的每个 `.jsx` 文件就可作为一个组件

- 每个文件中必须 **`import from`** 导入 **`React`**

- 每个组件必须要被 **`export default` 导出**，以供其他组件引用

- 函数名即组件名，必须**首字母大写**

- 函数必须有返回值，**返回 JSX 结构** 作为组件要渲染的内容

  若返回值为 `null` ，则该组件不渲染任何内容

:::

```jsx
import React from "react";

export default function 组件名() {
  return <div>函数组件</div>;
}
```

> 箭头函数的方式更常用

```jsx
import React from "react";

const 组件名 = () => {
  return <div>函数组件</div>;
};

export default 组件名;
```

<br/>

## 函数组件 this

不同于类组件，函数组件中 this 指向 `undefined`

> 为什么函数式组件的 this 不指向 window？
>
> 因为这是经过 Babel 翻译的结果
>
> Babel 是严格模式 `use strict` 下进行的，不允许函数里的 this 指向 window

<br/>

## 状态

函数式组件在 `React 16.8.0` 版本之前被称为无状态组件，很鸡肋。但随着 `React 16.8.0` 新增了 [Hooks 钩子函数](https://blaxberry.github.io/vuepress-studynotes/notes/front/React/Basic/Components/Hooks/Hooks.html) 后，函数式组件渐渐取代繁琐笨重的类组件，成为组件的标准写法

::: tip 主要创建定义状态数据的方式：

- 通过 [props](https://blaxberry.github.io/vuepress-studynotes/notes/front/React/Basic/Components/Func/FunctionalComponent.html#props) 接收来自父组件的传值
- 通过 [useState()](https://blaxberry.github.io/vuepress-studynotes/notes/front/React/Basic/Components/Hooks/Hooks.html#usestate) 定义响应数据
- 通过框架提供的数据请求 Hooks 获取 data

:::

<br/>

## 事件

### 事件绑定

React 中事件名用 **`on + 驼峰命名`**

React 事件绑定的必须是**函数的处理逻辑函数体**，而不是返回值

```jsx
// 触发事件时才调用函数
<div onXxxx={方法} />
<div onXxxx={() => { /*函数体*/ }} />

// 绑定事件的元素挂载到页面时就调用函数,后续不会再被触发
<div onXxxx={方法()} />
```

> 如下：

```jsx
<div onClick={ 方法函数 }/>
<div onMouseEnter={ 方法函数 }/>
```

> 如下：

```jsx
import React from "react";

export default function Demo() {
  const func = () => {
    console.log("clicked");
  };

  return (
    <>
      <button onClick={func}>点击</button>
      <button onClick={() => console.log("clicked")}>点击</button>
      <br />
      <button onClick={func()}>点击</button>
    </>
  );
}
```

---

### 事件参数

::: tip 方法一：箭头函数方式（常用）

```jsx
<标签 on事件={(参数) => 方法(参数)} />
```

```jsx
const 方法 = (参数) => {
  /* 函数体 */
};
```

:::

```jsx
import React from "react";

export default function Demo() {
  const func = (params) => {
    console.log(params);
  };

  return (
    <>
      <button onClick={() => func("hello")}>点击</button>
    </>
  );
}
```

::: tip 方法二：函数柯里化

因为 React 事件绑定的必须是函数的处理逻辑函数体，而不是返回值

```jsx
<标签 on事件={方法(参数)} />
```

```jsx
const 方法 = (参数) => {
  return () => {
    /* 函数体 */
  };
};
```

:::

```jsx
import React from "react";

export default function Demo() {
  const func = (params) => {
    return () => {
      console.log(params);
    };
  };

  return (
    <>
      <button onClick={func("hello")}>点击</button>
    </>
  );
}
```

---

### 事件对象

React 中的事件对象不需要单独声明，默认作为事件处理方法的参数

React 的事件对象兼容所有浏览器

::: tip 方法一：箭头函数（常用）

```jsx
const 方法 = (事件对象) => {
  /* 函数体 */
};
```

```jsx
<标签 on事件={方法} />
```

:::

```jsx
import React from "react";

export default function A() {
  function fun(e) {
    e.preventDefault(); // 阻止默认行为
    console.log(e);
  }

  return (
    <div>
      <a href="http://www.baidu.com" onClick={fun}>
        点击
      </a>
    </div>
  );
}
```

::: tip 方法二：函数柯里化：

因为 React 事件绑定的必须是函数的处理逻辑函数体，而不是返回值

```jsx
const 方法 = () => {
  return (事件对象) => {
    /* 函数体 */
  };
};
```

```jsx
<标签 on事件={方法()} />
```

:::

```jsx
import React from "react";

export default function Demo() {
  const func = () => {
    return (e) => {
      e.preventDefault(); // 阻止默认行为
      console.log(e.target);
    };
  };

  return (
    <>
      <a href="http://www.baidu.com" onClick={func()}>
        点击
      </a>
    </>
  );
}
```

<br/>

## props

`props` 属性作为函数组件的参数

用于存储父子组件通信的数据

---

### 基础使用

::: tip 父组件传递时：

将要传递给子组件的数据和方法作为子组件标签的属性传入<br/>[详见下文](https://blaxberry.github.io/vuepress-studynotes/notes/front/React/Basic/Components/Func/FunctionalComponent.html#props-传递)

:::

```jsx
import React from "react";
import 子组件 from "component/child";

export default function 父组件() {
  return <子组件 自定义状态名={状态数据} 自定义方法名={方法} />;
}
```

::: tip 子组件接收时：

直接从参数 props 上获取父组件传递的状态和方法<br/>[详见下文](https://blaxberry.github.io/vuepress-studynotes/notes/front/React/Basic/Components/Func/FunctionalComponent.html#props-接收)

:::

```jsx
import React from "react";

export default function 子组件(props) {
  // console.log(props);
  return (
    <>
      <div>{props.自定义属性}</div>
      <Div on事件={props.方法} />
    </>
  );
}
```

---

### props 传递

可以向子组件传递任何数据

固定的字符串数据可直接传递，其余数据要用 `{}` 包裹，

```jsx
// 父组件传递参数
<Child
  str="hello"
  num={100}
  arr={[1, 2, 3]}
  fun={(a, b) => {
    return a + b;
  }}
  tag={<div>Hello</div>}
/>;
// 子组件接受参数
import React from "react";

export default function Child(props) {
  console.log(props.str); // hello
  console.log(props.num); // 100
  console.log(props.arr); // [1,2,3]
  console.log(props.fun(10, 20)); // 30

  return (
    <>
      <div>{props.tag}</div>
      <button onClick={props.func(10, 20)} />
    </>
  );
}
```

---

### props 接收

子组件可直接从参数上获取父组件传递的状态和方法

接收的参数 `props` 是个对象

若没有传递则获取的是 `undefined`

::: tip 方法一：

通过 `props.状态`、`props.方法` 方式

:::

```jsx
// 子组件
import React from "react";

export default function Child(props) {
  const name = "Andy";

  return (
    <>
      <h3>{props.age}</h3>
      <h3>{props.text}</h3>
      <button onClick={() => props.say(name)}>Say</button>
    </>
  );
}
// 父组件
import React, { useState } from "react";
import Child from "./components/Child";

export default function App() {
  const [text, setText] = useState("");

  const say = (name) => {
    setText(`hello, I'm ${name}`);
  };
  return <Child age={28} text={text} say={say} />;
}
```

::: tip 方法二：

在参数位置对解构 props，组件中直接使用解构后状态方法

:::

> 如下：TS 中

```tsx
import React from "react";

interface ChildProps {
  age: number;
  text: string;
  say: void;
}

export default function Child({ age, text, say }: ChildProps): JSX.Element {
  const name = "Andy";

  return (
    <>
      <h3>{age}</h3>
      <h3>{text}</h3>
      <button onClick={() => say(name)}>Say</button>
    </>
  );
}
```

---

### props 与 useState()

props 中获取的数据回随着父组件中的更新而更新改变

若在子组件中通过 `useState()` 将 props 中状态作为初始值后，父组件更新状态不再影响该状态

> 因为组件初始化瞬间将 props 中状态定格下来了
>
> 可视作手动结束 props 数据的响应式
>
> 实际项目中视情况需要可灵活使用该方法

> 如下：子组件 `childNum` 不受父组件的 +1 更新影响，仅受子组件自身 `setChildNum` 影响

```jsx
// 子组件
import React from "react";
import { useState } from "react";

export default function Child(props) {
  const fatherNum = props.num;
  const [childNum, setChildNum] = useState(fatherNum);

  return (
    <>
      <div>num from Father: {fatherNum}</div>
      <div>num defined by child: {childNum}</div>
      <button onClick={() => setChildNum((n) => n + 1)}>childNum +1</button>
    </>
  );
}
// 父组件
import React, { useState } from "react";
import Child from "./components/Child";

export default function Father() {
  const [num, setNum] = useState(1);

  return (
    <>
      <Child num={num} />
      <button onClick={() => setNum((num) => num + 1)}>+1</button>
    </>
  );
}
```

---

### props.children

`props.children` 用于获取子组件的子节点

即子组件被父组件以双标签形式调用时，双标签之间的内容

> 可理解为插槽

子节点可以是任何值：JSX 结构、组件、数据、函数

> 但是常用的还是传入 JSX 结构

```jsx
// 父组件
<子组件>
  <JSX 标签 />
  <JSX 标签 />
</子组件>

<子组件><其余组件 /></子组件>

<子组件>{函数()}</子组件>
<子组件>{数据}</子组件>
```

> 如下：

```jsx
// 子组件
import React from "react";

export default function Child(props) {
  return <div>{props.children}</div>;
}
// 父组件
import React from "react";
import Child from "./components/Child";

export default function App() {
  const renderLayoutAAA = () => {
    return <div>AAA</div>;
  };

  const renderLayoutBBB = () => {
    return <div>BBB</div>;
  };

  return (
    <>
      <Child>{renderLayoutAAA()}</Child>
      <Child>{renderLayoutBBB()}</Child>
    </>
  );
}
```
