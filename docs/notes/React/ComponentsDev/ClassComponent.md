# React 类组件

![](https://cdn-ssl-devio-img.classmethod.jp/wp-content/uploads/2019/07/react.jpg)

[[toc]]

## 类组件的创建与使用

以 Class 类 的形式定义的 React 组件

React 类组件对 Javascript 基础要求高，特别是：

- [Class 类](../../Javascript/ES6+/Class.md)
- [原型、原型链](../../Javascript/ES5/Prototype.md)

### 创建组件

::: tip React 类组件的要求：

- 类名即组件名，首字母必须大写

- 类组件必须用 **`extends` 继承 `React.Component`**

  > 继承 React 提供`state`、`props`、`setState`、`ref`、`context`、生命周期...

- 类中的 **`constructor构造器函数`可以省略**

  但若有构造器函数，则必须调用 `super()`

- 组件中必须要有 **`render( )`** 方法

  且必须要有返回值**返回一个 JSX 结构**

  若返回值为 `null` 则该组件不渲染任何 UI 内容

:::

```jsx
import React, { Component } from "react";
class Hello extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <div>Hello</div>;
  }
}
```

或省略 `constructor` 构造函数

```jsx
import React, { Component } from "react";
class Hello extends Component {
  render() {
    return <div>Hello</div>;
  }
}
```

### 独立组件文件

每个 `.js` 或 `.jsx` 文件就是一个组件

- 组件必须 **`import from`** 导入 **`React`** 和 **`React.Component`**
- 组件必须要被 **`export default` 导出**供其他组件引用

```jsx
import React, { Component } from "react";
export default class Demo extends Component {
  render() {
    return <div></div>;
  }
}
```

### 使用组件

以 JSX 标签形式将组件渲染到页面

::: tip 类组件的渲染步骤：

1. `ReactDOM.render()` 渲染组件标签到页面容器元素 `root`

2. React 自动创建了组件实例对象，不需要自己手动创建

3. 然后自动通过组件实例对象调用类组件中的 `render()` 方法

   将 `render()` 方法的返回的 `JSX` 虚拟 DOM 转为真实 DOM

4. 最后将真实 DOM 渲染到页面

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
class App extends Reatc.Component {
  render(){
    return (
    	<div></div>
    )
  }
}
ReactDOM.render(){
  <App/>,
	document.getElementById('root')
}
```

:::

### 类组件实例对象

类组件被渲染时 React 会自动进行类的实例化创建该组的实例对象，

创建类组件时通过 `extends` 继承了 `React.Component` 这个父类

组件实例对象继承了 React 的 `props`、`state`、`ref`、`context` 属性

```js
props: {},
refs: {},
state: {},
context: {}
```

- [State - 组件数据](#state)

- [Ref - 非受控组件](#非受控组件)

- [Props - 组件间通信](#props)

- [Context - 组件间通信](#context)

## 事件处理

### 事件绑定与使用

React 中事件名用驼峰命名法

```js
// 触发事件时才调用类实例方法
on + 事件名 = { this.类实例方法 }

// 绑定了事件的元素挂载到页面时就调用类实例方法, 后续不会再被触发
on + 事件名 = { this.类实例() }
```

```jsx
<div onClick={ this.类实例方法 }></div>
<div onMouseEnter={ this.类实例方法 }></div>
```

> 如下：
>
> ```jsx
> import React, { Component } from "react";
> export default class Demo extends Component {
>   fun() {
>     console.log("clicked");
>   }
>
>   render() {
>     return (
>       <div>
>         <button onClick={this.fun}>点击</button>
>       </div>
>     );
>   }
> }
> ```

### 事件对象

通过事件处理程序的方法的参数获取事件对象

React 中的事件对象叫着 **合成事件**，兼容所有浏览器

类组件中的事件对象的使用如下：

```jsx
类实例方法 = (事件对象) => {
	// 使用事件对象
}

render(){
  return (
  	<div>
    	<标签 on事件={ this.类实例方法 }/>
    </div>
  )
}
```

> 如下：
>
> ```jsx
> import React, { Component } from "react";
> export default class B extends Component {
>   fun = (e) => {
>     console.log(e);
>     e.preventDefault(); // 阻止默认行为
>   };
>
>   render() {
>     return (
>       <div>
>         <a href="http://www.baidu.com" onClick={this.fun}>
>           点击
>         </a>
>       </div>
>     );
>   }
> }
> ```

### 定义组件实例方法

类组件中的实例方法被定义到了组件实例对象的 `prototype` 原型对象上

组件实例对象可通过 `this.实例方法` 从自身沿着`__proto__`原型链在类的原型对象上获取到

> 类组件基于 JS 的 Class 类， 类是 ES5 `构造函数` + 原型对象 `prototype` 的语法糖，所以类也有原型对象，类的实例方法被定义到了类的原型对象上，创建的实例对象沿着自己的原型 `__proto__` 从类的原型`prototype` 上查找到共享的实例方法

### 组件实例方法的 this

类组件实例方法的调用者 `this` 的指向为 **`undefined`**

> 一般实例方法是来操作组件的数据的，实例方法中 `this` 指向需要为组件自身
>
> 否则 `undefined`报错，如下：
>
> ::: danger 无法从 undefined 上获取数据
>
> TypeError：Cannot read properties of undefined
>
> :::
>
> ```jsx
> import React, { Component } from "react";
> export default class Demo extends Component {
>   state = {
>     num: 100,
>   };
>
>   fun() {
>     console.log(this); // undefined
>     console.log(this.state.num); // 报错，找不到state
>   }
>
>   render() {
>     return (
>       <div>
>         <button onClick={this.fun}>点击</button>
>       </div>
>     );
>   }
> }
> ```

::: tip 为何调用者不是组件实例对象而是 undefined：

1. React 类组件中的实例方法是作为事件的回调

   是直接调用，不是被组件实例对象调用

2. 因为 JS 的 Class 类默认开启了局部严格模式

   且 React 脚手架中配置的 `babel` 也开启了严格模式

   严格模式下的直接调用的自定义方法中 `this` 为 `undefined`

所以，类组件实例方法的调用者 `this` 的指向为 **`undefined`**

:::

### 修改实例方法的 this 指向

> 实例方法不应该被定义到类的原型对象 `prototype`上，而是应该定义到组件实例对象上，使实例方法不是作为事件的回调函数被直接调用，而是被组件实例对象调用，如此一来实例方法中的调用者，即实例方法中的 `this` 从受严格模式影响的 `undefined` 变为指向类组件实例对象本身

::: tip 修改 this 指向的方法：

- **bind( )**
  - [调用类实例方法时修改](<#调用时bind()修改指向>)
  - **[事先在构造器函数中修改](<#构造函数中bind()修改指向>)（常用）**
- **箭头函数**
  - [调用类实例方法时通过箭头函数调用](#箭头函数调用方法)
  - **[定义类实例方法时用箭头函数定义](#箭头函数定义方法)（常用）**

:::

---

#### 方法一：调用时 bind() 修改指向

> `bind()`：修改函数的 `this` 指向，并返回一个新函数

虚拟 DMO 触发事件回调类实例方法时，

不直接调用类实例方法，而是调用一个新函数，

该函数是被 `bind()` 修改了 `this` 指向的类实例方法

```js
on事件 = { this.类实例方法.bind(this) }
```

> 如下：
>
> ```jsx
> import React, { Component } from "react";
> export default class Demo extends Component {
>   fun() {
>     console.log(this); // B组件
>   }
>
>   render() {
>     return (
>       <div>
>         <button onClick={this.fun.bind(this)}>点击</button>
>       </div>
>     );
>   }
> }
> ```

---

#### 方法二：构造函数中 bind() 修改指向

> `bind()`：修改函数的 `this` 指向，并返回一个新函数

1. 实例方法调用 `bind()`方法，返回一个新函数

2. 通过 `this` 将返回的新函数做为类实例属性定义到类组件实例上

   建议该属性名和修改的类实例方法同名

类组件的 `constructor` 构造函数中 `this` 指向类组件实例对象，这样修改后，类组件实例对象中就可直接通过 `this` 获取实例方法，而不用再通过自身 原型`__proto__` 沿着原型链到类上查找了

```js
constructor(){
  this.方法名 = this.类实例方法.bind(this)
}
```

```js
on事件 = { this.类实例方法 }
```

> 如下：
>
> ```jsx
> import React, { Component } from "react";
> export default class Demo extends Component {
>   constructor(props) {
>     super(props);
>     this.fun = this.fun.bind(this);
>   }
>
>   fun() {
>     console.log(this);
>   }
>
>   render() {
>     return (
>       <div>
>         <button onClick={this.fun}>点击</button>
>       </div>
>     );
>   }
> }
> ```

---

#### 方法三：箭头函数调用方法

利用箭头函数中 `this` 指向所在作用域的这一特性

> 该箭头函数是被在 `render()` 中的虚拟 DOM 调用，`this`指向 `render()` 作用域中的 `this`，`render()` 方法执行的渲染是由当前类组件实例对象调用的，所以该箭头函数中的 `this` 最终指向了该组件的实例对象

虚拟 DMO 触发事件回调类实例方法时，

实例方法不是直接作为事件回调调用，而是通过一个箭头函数去调用

```js
on事件 = { () => this.类实例方法() }
```

> 如下：
>
> ```jsx
> import React, { Component } from "react";
> export default class Demo extends Component {
>   fun() {
>     console.log(this);
>   }
>
>   render() {
>     return (
>       <div>
>         <button onClick={() => this.fun()}>点击</button>
>       </div>
>     );
>   }
> }
> ```

---

#### 方法四：箭头函数定义方法

利用箭头函数的特性，用箭头函数将实例方法定义到类组件的实例对象上

> 该方法是实验性语法，因为脚手架有配置 `babel` 所以可以大胆使用

```js
类实例方法 = () => {
  处理;
};
```

```js
on事件 = { this.类实例方法 }
```

> 如下：
>
> ```jsx
> import React, { Component } from "react";
> export default class Demo extends Component {
>   fun = () => {
>     console.log(this);
>   };
>
>   render() {
>     return (
>       <div>
>         <button onClick={this.fun}>点击</button>
>       </div>
>     );
>   }
> }
> ```

### 事件传参

...

## 类组件中的 this

- 类组件中的 `this` 指向组件实例对象

- 类组件中自定义实例方法： `this` 指向 `undefined`

  原因详见 [类组件实例方法的 this](#组件实例方法的 this)

> 如下：
>
> ```jsx
> import React, { Component } from "react";
> export default class Demo extends Component {
>   fun() {
>     console.log(this);
>   }
>
>   render() {
>     console.log(this); // 组件实例对象
>     this.fun(); // 组件实例对象
>
>     return (
>       <button onClik={this.fun}>查看</button> // undefined
>     );
>   }
> }
> ```

## state

`state` 属性用于存放当前组件状态，即实例对象的私有数据

`state` 属性在组件实例对象上，来自于继承 `React.Component`

数据以多组键值对的对象形式定义在 `state` 属性中

### 定义

定义 `state` 属性 即初始化组件的状态

状态的两种定义方式：

- [构造函数中定义](#构造器函数中定义)
- [直接定义为组件实例对象的实例属性](#直接定义为实例属性)

#### 构造器函数中定义

在类组件的 `constructor`构造器函数中通过 `this.state` 将状态定义为组件实例对象上的实例属性

`constructor` 构造器函数必须接受 `props` 参数并调用 `super()`

```jsx
import React, { Component } from "react";

export default class 组件 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      数据: 值,
      数据: 值,
    };
  }

  render() {
    return <div>{this.state.数据}</div>;
  }
}
```

---

#### 直接定义为实例属性

类组件中的 `constructor` 构造函数可以不写

此时可在类组件中使用 ES6 的属性转化语法简写，

将 `state` 属性定义为组件实例对象上的实例属性

```jsx
import React, { Component } from "react";
export default class 组件 extends Component {
  state = {
    数据: 值,
    数据: 值,
  };

  render() {
    return <div>{this.state.数据}</div>;
  }
}
```

### 获取

`state`属性被定义了在类组件实例对象上，

所以类组件中可通过 `this.state.数据` 直接获取数据

```jsx
render(){
  return (
  	<div>{ this.state.数据名 }</div>
  )
}
```

> 如下：
>
> ```jsx
> import React, { Component } from "react";
> export default class Demo extends Component {
>   state = {
>     num: 100,
>   };
>
>   render() {
>     return <div>{this.state.num}</div>;
>   }
> }
> ```

### 修改 setState()

React 规定不能直接修改 `state` 中数据，

必须通过组件实例对象调用 React 的内置 API **`setState()`** ，

并传入多组键值对形式的对象来修改组件的 `state` 中数据

```jsx
this.setState({
  state中数据: 新值,
  state中数据: 新值,
});
```

> 如下: 增加
>
> ```jsx
> import React, { Component } from "react";
> export default class Demo extends Component {
>   state = {
>     num: 0,
>   };
>
>   add = () => {
>     this.setState({
>       num: this.state.num + 1,
>     });
>   };
>
>   render() {
>     return (
>       <div>
>         <div>{this.state.num}</div>
>         <button onClick={this.add}>num +1</button>
>       </div>
>     );
>   }
> }
> ```
>
> 再如下：切换
>
> ```jsx
> import React, { Component } from "react";
> export default class Demo extends Component {
>   state = {
>     isHot: true,
>   };
>
>   change = () => {
>     this.setState({
>       isHot: !this.state.isHot,
>     });
>   };
>
>   render() {
>     const { isHot } = this.state;
>     return (
>       <div>
>         <p>
>           <span>{isHot ? "炎热" : "凉爽"}</span>
>         </p>
>         <button onClick={this.change}>切换</button>
>       </div>
>     );
>   }
> }
> ```

::: tip setState() 是数据驱动视图：

1. 先修改 state 中的数据
2. 然后渲染数据到页面，更新 UI

所以`setState()` 的作用是又能更新状态又能更新 UI

:::

`setState()` 不能放在在 `render()` 中，会导致无限递归

> `render()` 在每次组件渲染时候调用
>
> `setState()` 不但修改状态又能渲染数据
>
> ```jsx
> import React, { Component } from "react";
> export default class Demo extends Component {
>   render() {
>     this.setState({}); // 报错
>     return <div></div>;
>   }
> }
> ```
>
> ::: danger 无限递归无限循环
> Error: Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. React limits the number of nested updates to prevent infinite loops.
> :::

`setState()` 也不能直接放在生命周期钩子 `componentDidUpdate ()` 中，

必须通过 `if` 条件判断，否则也会导致无限递归

> `componentDidUpdate()` 在组件完成更新时调用，
>
> `setState()` 修改了状态会导致组件更新
>
> ```jsx
> import React, { Component } from "react";
> export default class Demo extends Component {
>   componentDidUpdate() {
>     this.setState({}); // 报错
>   }
>   render() {
>     return <div></div>;
>   }
> }
> ```
>
> ::: danger 无限递归无限循环
> Error: Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. React limits the number of nested updates to prevent infinite loops.
> :::

## props

`props`属性用于接收来自组件外部传入的数据

### 基本使用

::: tip 类组件中 props 接收传递数据的步骤：

1. **数据作为 JSX 标签的属性传入组件**

   父组件给子组件添加属性，传递的数据作为属性值

2. **子组件中通过 `this.props` 直接从组件实例对象上获取**

   创建类组件时候继承了 `React.Component` 上的 `props` 属性

   接收到的 `props` 是个对象包含父组件传递来的自定义属性

```jsx
<子组件
  自定义属性=传递的数据
  自定义属性=传递的数据
/>
```

```jsx
import React, { Component } from "react";
export default class 子组件 extends Component {
  render() {
    console.log(this.props);

    return <div>{this.props.自定义属性}</div>;
  }
}
```

:::

### 传递标签属性 prop

数据作为 JSX 标签的 `prop` 属性传入组件

可以传递任何数据：字符串、数字、数组、对象、函数、JSX

但非字符串数据要用 `{}` 包裹

> 如下：
>
> ```jsx
> <Demo
>   str="hello"
>   num={100}
>   arr={[1, 2, 3]}
>   fun={(a, b) => {
>     return a + b;
>   }}
>   tag={<div>Hello</div>}
> />
> ```
>
> ```jsx
> import React, { Component } from "react";
>
> export default class Demo extends Component {
>   render() {
>     console.log(this.props);
>
>     console.log(this.props.str); // hello
>     console.log(this.props.num); // 100
>     console.log(this.props.arr); // [1,2,3]
>
>     const res = this.props.fun(10, 20);
>     console.log(res); // 30
>
>     return <div>{this.props.tag}</div>;
>   }
> }
> ```

React 允许通过 `...对象` 的形式传递多个 `prop` 属性给子组件

该方法仅用于批量传递 `prop` 属性

> 此处的 `{ }` 不是对象，而是允许在其中使用 JS 的分隔符

```jsx
state = {
  对象: {
    属性: 值,
    属性: 值,
    属性: 值
  }
}
render(){
  return (
  	<div {...对象}></div>
  )
}
```

### 构造器函数 与 props

若类组件中有 `constructor` 构造函数，

`props` 必须作为构造函数的参数被接收，

且构造函数中必须先调用 `super()` 并传递 `props`，否则无法获取 `props`（undefined）

```jsx
import React, { Component } from "react";
export default class 子组件 extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }

  render() {
    console.log(this.props);
    return <div>{this.props.自定义属性}</div>;
  }
}
```

组件中可不写 `constructor` 构造函数，

组件中可直接通过 **`this.props`** 便从组件实例对象上获取 `props`属性

```jsx
import React, { Component } from "react";
export default class 子组件 extends Component {
  render() {
    console.log(this.props);

    return <div>{this.props.自定义属性}</div>;
  }
}
```

### props 赋值 state

`props` 是只读属性，不可被修改，若直接修改 `props` 上的数据会报错

但可曲线救国，在 `constructor` 构造器函数中将接收的 `props` 中数据作为实例属性赋值给类组件自身的实例对象上，然后组件内操作该实例属性即可

> 如下：
>
> ```jsx
> <Demo num={100} />
> ```
>
> ```jsx
> import React, { Component } from "react";
> export default class Demo extends Component {
>   state = {
>     num: this.props.num,
>   };
>
>   changeProps = () => {
>     this.props.num += 1; // 报错，props为只读属性不能被修改
>   };
>   changeState = () => {
>     this.setState({
>       num: this.state.num + 1, // 曲线救国
>     });
>   };
>
>   render() {
>     return (
>       <div>
>         <p>{this.props.num}</p>
>         <button onClick={this.changeProps}>修改 props 中数据</button>
>
>         <p>{this.state.num}</p>
>         <button onClick={this.changeState}>修改 state 中数据</button>
>       </div>
>     );
>   }
> }
> ```

### children 属性

> 可理解为 React 的**插槽**

`props.children` 用于获取组件的子节点

当组件以双标签形式被父组件调用时，且双标签中写了内容的话，

该组件内部可通过 `this.props.children` 获取写入双标签中的内容

```jsx
<子组件>{/* JSX 内容 */}</子组件>
```

```jsx
class 子组件 extends React.Component {
  render() {
    return <div>{this.props.children}</div>;
  }
}
```

只有当组件标签由子节点时 `props` 才会有 `children` 属性

子节点可以是任何值：JSX 结构、组件、数据、函数

> 如下：
>
> ```jsx
> import React, { Component } from "react";
> export default class Father extends Component {
>   render() {
>     return (
>       <div>
>         <Child>Hello</Child>
>         <Child>100</Child>
>         <Child>[1,2,3]</Child>
>         <Child>
>           <div>
>             <h1>xxxxxxx</h1>
>           </div>
>         </Child>
>       </div>
>     );
>   }
> }
> ```
>
> ```jsx
> import React, { Component } from "react";
> export default class Child extends Component {
>   render() {
>     console.log(this.props);
>     return <div>{this.props.children}</div>;
>   }
> }
> ```

### props 校验

创建组件时指定 `props` 要接受的数据的类型，防止接受的数据类型格式错误

需要通过第三方包 **prop-types** 对 `props`接收的数据进行校验

若接收的数据格式不符合校验规则便会报错，并详细说明出处

::: tip prop-type 使用步骤如下：

1. 安装

   ```bash
   yarn add prop-types
   # 或
   npm install prop-types
   ```

2. 导入

   ```js
   import PropTypes from "prop-types";
   ```

3. 设置校验规则

   ```js
   组件名.propTypes = {
     props接收的数据: PropTypes.数据类型,
     props接收的数据: PropTypes.数据类型,
   };
   ```

   ```js
   // 常见类型：
   array;
   bool;
   func;
   number;
   object;
   string;

   // 规定数据必选
   组件名.propTypes = {
     数据名: PropTypes.数据类型.isRequired,
   };

   // 规定一个数据的结构
   组件名.propTypes = {
     数据名: PropTypes.shape({
       属性: PropTypes.数据类型,
     }),
   };
   ```

   :::

> 如下：
>
> ```jsx
> import React, { Component } from "react";
> export default class Father extends Component {
>   render() {
>     return <Child name="Jack" age="20" score={98} />;
>   }
> }
> ```
>
> ```jsx
> import React, { Component } from "react";
> import PropTypes from "prop-types";
>
> export default class Child extends Component {
>   render() {
>     console.log(this.props);
>     return <div></div>;
>   }
> }
> Child.propTypes = {
>   name: PropTypes.string,
>   age: PropTypes.number,
>   score: PropTypes.string,
> };
> ```
>
> 如下，会报错，并提示问题出处是哪一个数据
>
> ::: danger
> Warning: Failed prop type: Invalid prop `age` of type `string` supplied to `Child`, expected `number`.<br>
> index.js:1 Warning: Failed prop type: Invalid prop `score` of type `number` supplied to `Child`, expected `string`.
> :::

### props 默认值

给组件设定没有数据传入时，依然能获取的默认值

比如分页组件，默认的每页显示条数

```js
组件名.defaultProps = {
  属性: 值,
};
```

> 如下：
>
> ```jsx
> class Demo extends React.Component {
>   render() {
>     return (
>       <div>
>         {this.props.name} {/* andy */}
>         {this.props.age} {/* 28 */}
>       </div>
>     );
>   }
> }
> Demo.defaultProps = {
>   name: "andy",
>   age: "28",
> };
>
> ReactDOM.render(
>   <div>
>     <Demo />
>   </div>,
>   document.getElementById("root")
> );
> ```

默认值只在没有数据传入组件时才生效

若有数据传入则优先以传入的数据为准

> 如下：
>
> ```jsx
> class Demo extends React.Component {
>   render() {
>     return (
>       <div>
>         {this.props.name} {/* tommy */}
>         {this.props.age} {/* 16 */}
>       </div>
>     );
>   }
> }
> Demo.defaultProps = {
>   name: "andy",
>   age: "28",
> };
>
> ReactDOM.render(
>   <div>
>     <Demo name="tommy" age={16} />
>   </div>,
>   document.getElementById("root")
> );
> ```

## context

`context` 属性用于跨组件数据传递

尤其是用于多层嵌套的**深层组件**之间的数据传递，如下图：

但实际上开发中不怎么用，主要还是 [Redux]()

<img src="https://ichi.pro/assets/images/max/724/1*EjDSOqhNOqIJ9wOqqFwKJQ.png" style="zoom:50%;" />

::: tip context 使用步骤：

1. 创建 **`Context` 容器**

   在父组件和子组件所在的公共区域创建

2. 通过 `Context` 容器对象上的 **`Provider`** 组件包裹后代组件

   并通过 **`value`** 传递数据

3. 声明接收 `context`（谁使用谁声明）

   通过 **`contextType`** 接收定义在公共区域内的 `Context` 容器

   若不声明接收，`this.context` 默认是个空对象 `{}`

4. 子组件内通过 `this.context` 获取数据

:::

> 如下：
>
> ```jsx
> const MyContext = React.createContext();
>
> class Father extends React.Component {
>   state = {
>     name: "Andy",
>     age: 20,
>   };
>   render() {
>     return (
>       <MyContext.Provider
>         value={{
>           name: this.state.name,
>           age: this.state.age,
>         }}
>       >
>         <Child1 />
>       </myContext.Provider>
>     );
>   }
> }
>
> class Child1 extends React.Component {
>   render() {
>     console.log(this.context); // 空对象 { }
>     return <Child2 />;
>   }
> }
>
> class Child2 extends React.Component {
>   static contextType = MyContext;
>   render() {
>     console.log(this.context); //{name: 'Andy', age: 20}
>     return (
>       <div>
>         {this.context.name} {/* Andy */}
>         {this.context.age} {/* 20 */}
>       </div>
>     );
>   }
> }
> ```

## ref

React 中可通过 `ref` 属性标记真实 DOM 节点或组件实例对象

> 类似原生 HTML 的 `id` 属性

::: tip 3 种 ref 方式：

- `React.createRef()` 方法创建（推荐）
- 字符串形式的 `ref`（被弃用，将被移除）
- 回调函数形式的 `ref` （React16.3 版本前推荐）

:::

### createRef() 定义

在 `constructor`构造函数中通过 `React.createRef()` 创建 `ref` ，

并将创建的 `ref` 作为实例属性定义到组件实例对象上

组件中可通过 `ref` 上的 `current`获取标记的 DOM 节点

```jsx
import React, { Component } from "react";
export default class Demo extends Component {
  constructor(props) {
    super(props);
    this.自定义ref名 = React.createRef();
  }
  render() {
    return (
      <div>
        <元素标签 ref={this.自定义ref名} />
        <组件 ref={this.自定义ref名} />
      </div>
    );
  }
}
```

> 如下：
>
> ```jsx
> import React, { Component } from "react";
> export default class Demo extends Component {
>   constructor(props) {
>     super(props);
>     this.myRef01 = React.createRef();
>     this.myRef02 = React.createRef();
>   }
>   show = () => {
>     console.log(this);
>     console.log(this.myRef01);
>     console.log(this.myRef02);
>     console.log(this.myRef01.current);
>     console.log(this.myRef02.current);
>   };
>
>   render() {
>     return (
>       <div>
>         <input ref={this.myRef01} />
>         <Child ref={this.myRef02} />
>         <button onClick={this.show}>显示ref</button>
>       </div>
>     );
>   }
> }
> ```

### 回调函数形式定义

React16.3 之前版本中 `ref` 定义多使用回调函数形式

回调函数参数为真实 DOM 节点

#### 内联回调函数

```jsx
<元素标签 ref={currentNode => this.自定义ref名 = currentNode }/>
<子组件 ref={currentNode => this.自定义ref名 = currentNodet }/>
```

#### 造器函数中定义回调函数

在 `constructor` 构造器函数中定义创建 `ref` 的回调函数，

元素标签通过 `ref` 属性绑定回调

```jsx
constructor(props){
  super(props)
  this.设置ref的回调函数 = (currentNode) => {
    this.自定义ref名 = currentNode
  }
  this.设置ref的回调函数 = (currentNode) => {
    this.自定义ref名 = currentNode
  }
}
render(){
  return (
  	<div>
    	<元素标签 ref={this.设置ref的回调函数}/>
      <组件 ref={this.设置ref的回调函数}/>
    </div>
  )
}
```

### 字符串形式定义

该方式被弃用将被移除，使用时会报错

> ::: danger 建议使用 `createRef()`
> A string ref, has been found within a strict mode tree. String refs are a source of potential bugs and should be avoided. We recommend using useRef() or createRef() instead.
> :::
>
> 通过字符串形式在元素标签或子组件上定义 `ref` 属性
>
> 定义的所有 `ref` 都被存入了父组件实例的 `refs` 属性中
>
> 组件中可通过 `this.refs` 获取
>
> ```jsx
> <div ref="自定义标记名"></div>
> <ChildComponent ref="自定义标记名" />
> ```
>
> ```jsx
> this.refs.自定义标记名;
> ```

## 表单处理

::: tip React 的表单处理有两种方式：

- **受控组件**：表单受到 React 控制

  绑定组件的状态 与 表单元素输入值

- **非受控组件**：通过 DOM 方式，不受到 React 控制

  直接从 DOM 元素上获取输入值

:::

### 受控组件

绑定组件的状态与表单元素输入值，通过 React 来控制表单

::: tip 受控组件处理表单的步骤：

1. 组件的状态 `state` 数据做为表单元素的 `value` 或 `checked` 值

2. 表单元素绑定 `onChange` 事件监控输入值或选中状态的变化

   表单元素变化时调用组件的 `setState()`方法和事件对象

   实时修改组件状态 `state` 中数据，数据也会实时响应到表单

:::

::: tip 受控组件种类：

- [文本框](#文本框)、[文本域](#文本域)、[下拉框](#下拉框)、[单选框](#单选框)

- [单一复选框](#单一复选框)
- [一组复选框](#一组复选框)

:::

#### 文本框

```jsx
<input
  value={this.state.组件状态数据}
  onChange={(e) =>
    this.setState({
      组件状态数据: e.target.value,
    })
  }
/>
```

> 如下：
>
> ```jsx
> import React, { Component } from "react";
> export default class Demo extends Component {
>   state = {
>     val: "",
>   };
>
>   render() {
>     return (
>       <input
>         type="text"
>         value={this.state.val}
>         onChange={(e) =>
>           this.setState({
>             val: e.target.value,
>           })
>         }
>       />
>     );
>   }
> }
> ```

---

#### 文本域

```jsx
<textarea
  value={this.state.组件状态数据}
  onChange={(e) =>
    this.setState({
      组件状态数据: e.target.value,
    })
  }
/>
```

---

#### 下拉框

```jsx
<select
  value={this.state.组件状态数据}
  onChange={(e) =>
    this.setState({
      组件状态数据: e.target.value,
    })
  }
>
  <option value="输入内容">内容</option>
  <option value="输入内容">内容</option>
  <option value="输入内容">内容</option>
</select>
```

> 如下：
>
> ```jsx
> import React, { Component } from "react";
> export default class Demo extends Component {
>   state = {
>     selectVal: "",
>   };
>
>   render() {
>     return (
>       <select
>         value={this.state.selectVal}
>         onChange={(e) =>
>           this.setState({
>             selectVal: e.target.value,
>           })
>         }
>       >
>         <option value="">--请选择--</option>
>         <option value="andy">Andy</option>
>         <option value="tom">Tom</option>
>         <option value="lili">Lili</option>
>       </select>
>     );
>   }
> }
> ```

---

#### 单选框

```jsx
<input
  type="radio"
  name="区别用名"
  value={this.state.组件状态数据}
  onChange={(e) =>
    this.setState({
      组件状态数据: e.target.value,
    })
  }
/>
```

> 如下：
>
> ```jsx
> import React, { Component } from "react";
> export default class Demo extends Component {
>   state = {
>     gender: "",
>   };
>
>   render() {
>     return (
>       <div>
>         male:
>         <input
>           type="radio"
>           name="gender"
>           value="male"
>           onChange={(e) =>
>             this.setState({
>               gender: e.target.value,
>             })
>           }
>         />
>         femal:
>         <input
>           type="radio"
>           name="gender"
>           value="female"
>           onChange={(e) =>
>             this.setState({
>               gender: e.target.value,
>             })
>           }
>         />
>       </div>
>     );
>   }
> }
> ```

---

#### 单一复选框

```jsx
<input
  type="checkbox"
  checked={this.state.组件状态数据}
  onChange={(e) =>
    this.setState({
      组件状态数据: e.target.chekced,
    })
  }
/>
```

> 如下：
>
> ```jsx
> import React, { Component } from "react";
> export default class Demo extends Component {
>   state = {
>     isChecked: false,
>   };
>
>   render() {
>     return (
>       <input
>         type="checkbox"
>         checked={this.state.isChecked}
>         onChange={(e) =>
>           this.setState({
>             isChecked: e.target.checked,
>           })
>         }
>       />
>     );
>   }
> }
> ```

---

#### 一组复选框

```jsx
<input type="checkbox" value="对应内容" onChange={this.组件实例方法} />
```

```jsx
state = {
  复选框值数组: [],
};
组件实例方法 = (e) => {
  // 获取点击的复选框value
  let value = e.target.value;
  // 获取状态中的复选框value的数组
  let arr = [...this.state.复选框值数组];
  // 数组中是否含有复选框value
  let hasValue = arr.indexOf(value);
  // 若没有则追加入数组，若含有则删除
  hasValue === -1 ? arr.push(value) : arr.splice(hasValue, 1);
  // 修改状态状态中的数组
  this.setState({
    复选框值数组: arr,
  });
};
```

> 如下：
>
> ```jsx
> import React, { Component } from "react";
> export default class Demo extends Component {
>   state = {
>     hobbys: [],
>   };
>
>   fn = (e) => {
>     let value = e.target.value;
>
>     let arr = [...this.state.hobbys];
>
>     let index = arr.indexOf(value);
>
>     index === -1 ? arr.push(value) : arr.splice(index, 1);
>
>     this.setState({
>       hobbys: arr,
>     });
>   };
>
>   render() {
>     return (
>       <div>
>         抽烟:
>         <input type="checkbox" value="抽烟" onChange={this.fn} />
>         喝酒:
>         <input type="checkbox" value="喝酒" onChange={this.fn} />
>         烫头:
>         <input type="checkbox" value="烫头" onChange={this.fn} />
>       </div>
>     );
>   }
> }
> ```

### 非受控组件

借助 `ref` 属性从 DOM 节点上获取表单元素的输入值

`ref` 属性可获取 **一般 DOM 元素** 或 **组件实例对象**

::: tip 非受控组件处理表单的步骤：

1. **创建 ref 对象**

   在构造器函数中通过 `React.createRef()` 创建 `Ref` 对象

   ```jsx
   constructor(props){
     super(props)

     this.inputRef = React.createRef()
   }
   ```

2. **Ref 对象关联表单元素**

   通过 `ref` 属性将 `Ref` 对象添加到 DMO 元素或组件

   ```jsx
   <input ref={this.inputRef}/>
   <ChildComponent ref={this.formRef}
   ```

3. **通过 Ref 对象获取表单元素**

   ```jsx
   // 获得表单元素
   this.inputRef.current;

   // 获得表单元素的输入值value
   this.inputRef.current.value;

   // 获得表单元素的选中状态
   this.inputRef.current.checked;
   ```

   :::

> 如下：
>
> ```jsx
> import React, { Component } from "react";
> export default class Demo extends Component {
>   constructor(props) {
>     super(props);
>     this.inputRef = React.createRef();
>   }
>
>   fn = () => {
>     console.log(this.inputRef.current.value);
>   };
>
>   render() {
>     return (
>       <div>
>         <input type="text" ref={this.inputRef} />
>         <button onClick={this.fn}>查看</button>
>       </div>
>     );
>   }
> }
> ```

## 组件通信

### 父—>子

::: tip 利用 props 属性

1. 父组件将自身 `state` 中数据作为标签属性传递
2. 子组件通过 `props` 接收数据

详见 [props 属性](#props)

:::

```jsx
class 父组件 extends React.Component {
  state = {
    数据: 值,
  };
  render() {
    return (
      <div>
        <子组件 自定义属性={this.state.数据} />
      </div>
    );
  }
}
```

```jsx
class 子组件 extends React.Component {
  render() {
    return <div>{this.props.自定义属性}</div>;
  }
}
```

### 子—>父

::: tip 利用 props 属性 + 回调函数

1. **父组件给子组件传递一个回调函数**<br>
   父组件中获取该函数的参数

2. **子组件通过 `props` 接收该函数**<br>
   调用该函数并将自身 `state` 数据作为函数参数传入<br>
   子组件调用后父组件便可获取作为参数的子组件数据

:::

```jsx
class 父组件 extends React.Component {

  函数 = (参数) => { // 获取参数 }

	render(){
    return (
    	<div>
      	<子组件 自定义属性={this.函数}/>
      </div>
    )
  }
}
```

```jsx
class 子组件 extends React.Component {
  state = { 数据: 值 };

  方法 = () => {
    this.props.父组件传递的函数(this.state.数据);
  };

  render() {
    return <div on事件={this.方法}></div>;
  }
}
```

> 如下：
>
> ```jsx
> import React, { Component } from "react";
>
> export default class Father extends Component {
>   getDataFromChild = (params) => {
>     console.log("get data from Child");
>     this.setState({
>       msg: params,
>     });
>   };
>   render() {
>     const { msg } = this.state;
>     return (
>       <div>
>         <p>{msg ? msg : "无数据"}</p>
>
>         <Child fun={this.getDataFromChild} />
>       </div>
>     );
>   }
> }
> ```
>
> ```jsx
> import React, { Component } from "react";
> export default class Child extends Component {
>   state = {
>     msg: "hello",
>   };
>
>   sendDataToFather = () => {
>     this.props.fun(this.state.msg);
>   };
>
>   render() {
>     return (
>       <div>
>         <button onClick={this.sendDataToFather}>send data to father</button>
>       </div>
>     );
>   }
> }
> ```

### 兄弟<—>兄弟

通过**状态提升**，由公共组件管理兄弟间共享的数据

实际上还是通过 `props` 属性，有些麻烦

### 深层父子组件

多层嵌套的**深层组件**之间可通过 `context` 属性进行数据传递

但实际上开发中不怎么用，多用 [Redux]()

### Redux

详见 [Redux]()

## 生命周期与生命周期钩子

### 创建阶段

组件创建、挂载的阶段

::: tip 生命周期钩子函数的执行流程：

**`constructor()`** —> **`render()`** —> **`componentDidMount()`**

1. **constructor()**

   仅用于初始化组件状态和给事件绑定实例方法

   仅在 React 初始化创建组件实例对象时调用一次

   组件中可以省略不写

2. **render()**

   用于渲染页面 UI

   渲染组件 JSX 结构到页面时调用

   不能在 `render()` 中用`setState()`更新状态，会导致递归无限循环

3. **componentDidMount()**

   用于发送 Ajax 请求、操作 DOM

   组件挂载完毕 DOM 渲染完成后调用

:::

```jsx
import React, { Component } from "react";
export default class Demo extends Component {
  constructor(props) {
    super(props);
    console.log("constructor()");
  }

  componentDidMount() {
    console.log("componentDidMount");
  }

  render() {
    console.log("render()");
    return <div></div>;
  }
}
```

### 更新阶段

组件被更新的阶段

::: tip 组件会被更新的 3 中情况：

1. **new props**：组件接收到新 `props` 属性时
2. **setState()**：通过 `this.setState()` 修改状态渲染 UI 时
3. **forceUpdate()**：通过 `this.forceUpdate` 强制更新组件时

:::

每次组件被更新 `render()` —>`componentDidUpdate()` 就被执行一次

::: tip 生命周期钩子函数的执行流程：

**`render()`** —> **`componentDidUpdate()`**

1. **render()**

   用于渲染 UI

   组件初始化后挂载到页面时调用第一次

   之后每次组件更新渲染都会调用 (1+n 次)

2. **componentDidUpdate()**

   用于发送 Ajax 请求、操作 DOM

   组件完成渲染时调用

   若调用 `setState` 更新状态必须放用 `if` 条件判断，否则也会导致递归无限循环

:::

```jsx
import React, { Component } from "react";
export default class Demo extends Component {
  componentDidUpdate() {
    console.log("componentDidUpdate");
  }
  render() {
    console.log("render()");
    return <button onClick={() => this.setState({})}>修改状态</button>;
  }
}
```

```js
render()
render()
componentDidUpdate
render()
componentDidUpdate
render()
componentDidUpdate
...
```

`componentDidUpdate()` 中不能直接调用 `setState` 更新状态

否则也会导致递归无限循环

::: danger 导致递归无限循环
Error: Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. React limits the number of nested updates to prevent infinite loops.
:::

必须用 `if` 条件判断 旧的 `props`中数据是否等于当前 `props` 中数据

比如发送 Ajax 请求获取数据也要放入 `if` 条件判断

```jsx
import React, { Component } from "react";
export default class Demo extends Component {
  componentDidUpdate(preProps) {
    if (preProps.数据 !== this.props.数据) {
      this.setState({});
    }
  }
  render() {
    return <div></div>;
  }
}
```

### 卸载阶段

组件从页面消失的阶段

::: tip 卸载阶段的钩子函数：
**`componentWillUnmount`**

执行清理工作，比如清理定时器

对于不是利用 React 本身实现的功能，比如 DOM、BOM 事件等最好在组件卸载时也进行解绑

:::

> 如下：清理定时器，防止内存泄露
>
> ```jsx
> import React, { Component } from "react";
> export default class Child extends Component {
>   componentDidMount() {
>     let num = 1;
>     this.timer = setInterval(() => {
>       num++;
>       console.log(num);
>     }, 1000);
>   }
>   componentWillUnmount() {
>     clearInterval(this.timer);
>   }
>   render() {
>     return <div></div>;
>   }
> }
> ```
>
> ```jsx
> import React, { Component } from "react";
> import Child from "./components/Child";
>
> export default class Father extends Component {
>   state = { isShow: true };
>
>   toggle = () => {
>     this.setState({
>       isShow: !this.state.isShow,
>     });
>   };
>
>   render() {
>     return (
>       <div>
>         {this.state.isShow ? <Child /> : "无..."}
>
>         <button onClick={this.toggle}>挂载/卸载</button>
>       </div>
>     );
>   }
> }
> ```

## 组件复用的模式

::: tip 可通过两种模式复用组件：

- render props 模式

  > 也可直接利用传递子节点，通过 `props.children`

- 高阶组件（HOC）模式

:::

### render props 模式

通过利用函数在组件外获取 组件的状态、方法 的做法

::: tip 使用：

使用组件时，将一个函数作为属性传递进去。函数的参数是组件的状态，该函数在组件内部被调用时便可暴露组件状态。函数的内容是要渲染的 JSX 结构，组件内不设定 UI 结构，渲染内容取决于组件调用时传入的函数

```jsx
<组件
  render={(要复用的组件状态) => {
    return <div>{/* 使用了公共状态的公共 JSX 结构 */}</div>;
  }}
/>
```

:::

> 如下：
>
> ```jsx
> import React, { Component } from "react";
> import pic from "src目录下地址";
> export default class Father extends Component {
>   render() {
>     return (
>       <div>
>         {/* 复用 */}
>         <Common
>           render={(state) => {
>             return (
>               <div>
>                 x:<p>{state.x}</p>
>                 y:<p>{state.y}</p>
>               </div>
>             );
>           }}
>         />
>
>         {/* 复用 */}
>         <Common
>           render={(state) => {
>             return (
>               <img
>                 src={pic}
>                 style={{
>                   position: "absolute",
>                   top: state.y,
>                   left: state.x,
>                 }}
>               />
>             );
>           }}
>         />
>       </div>
>     );
>   }
> }
> ```
>
> ```jsx
> import React, { Component } from "react";
> export default class Common extends Component {
>   state = {
>     x: 0,
>     y: 0,
>   };
>
>   move = (e) => {
>     this.setState({
>       x: e.clientX,
>       y: e.clientY,
>     });
>   };
>
>   componentDidMount() {
>     window.addEventListener("mousemove", this.move);
>   }
>   componentWillUnmount() {
>     window.removeEventListener("mousemove", this.move);
>   }
>   render() {
>     return this.props.render(this.state);
>   }
> }
> ```

也通过 `props.children`，详见 [组件 props 属性 的 children 属性]()

比起 render props 模式以 `prop`属性的方式传入函数的做法更直观

将函数作为组件的子节点传入，组件内通过的`props.children`获取函数并传入状态、方法

通过 props.children 实现组件复用：

```jsx
<组件>
  {(复用的组件状态) => {
    return <div>{/* 使用了公共状态的公共 JSX 结构 */}</div>;
  }}
</组件>
```

> 如下：
>
> ```jsx
> import React, { Component } from "react";
> import pic from "../assets/logo.jpeg";
>
> export default class Father extends Component {
>   render() {
>     return (
>       <div>
>         {/* 复用 */}
>         <Common>
>           {(state) => {
>             return (
>               <div>
>                 x:<p>{state.x}</p>
>                 y:<p>{state.y}</p>
>               </div>
>             );
>           }}
>         </Common>
>
>         {/* 复用 */}
>         <Common>
>           {(state) => {
>             return (
>               <img
>                 src={pic}
>                 style={{
>                   position: "absolute",
>                   top: state.y,
>                   left: state.x,
>                 }}
>               />
>             );
>           }}
>         </Common>
>       </div>
>     );
>   }
> }
> ```
>
> ```jsx
> import React, { Component } from "react";
> export default class Common extends Component {
>   state = {
>     x: 0,
>     y: 0,
>   };
>
>   move = (e) => {
>     this.setState({
>       x: e.clientX,
>       y: e.clientY,
>     });
>   };
>
>   componentDidMount() {
>     window.addEventListener("mousemove", this.move);
>   }
>   componentWillUnmount() {
>     window.removeEventListener("mousemove", this.move);
>   }
>   render() {
>     return this.props.children(this.state);
>   }
> }
> ```

### 高阶组件 (HOC) 模式

高阶组件（High-Order-Component）实际是个函数，

通过包裹包装其他组件的方式，来传递自身的状态最终实现复用高级组件

> 可理解为通过高级组件函数创建一个【通用外壳】组件
>
> 用该【通用外壳】来包装别的组件生成增强的组件
>
> 然后使用包装后的组件，实现组件的复用

::: tip 高阶组件的使用步骤：

1. 创建

   1. 创建一个的函数，命名以 `with` 开头

   2. 将需要被包装的组件作为参数传入该高阶组件函数

   3. 在函数内创建并返回一个类组件

   4. 该类组件中提供了要复用的状态 `state` 和状态处理代码

      并将状态 `state` 通过 `prop` 属性传递给参数接收的要被包装的组件

   5. 给高阶组件设定 `display` 属性

      被高级组件包装后的组件名由传入组件名决定

2. 使用

   1. 创建要被包装的组件

   2. 调用高级组件，传入要被包装的组件

      生成被高级组件包装后的增强组件

   3. 最后将该包装增强后的组件导入需要的组件

      实现对组件的复用

```jsx
// 创建高阶组件
function with自定义函数名(要被包装的组件) {
  class 组件 extends React.Component {
    state = {
      /* 状态 */
    };
    实例方法函数 = () => {
      /* 状态处理 */
    };

    render() {
      return <要被包装的组件 {...this.state} {...this.props} />;
    }
  }

  组件.displayName = "with自定义函数名" + getDisplayName(要被包装的组件);

  return 组件;
}

// 设置 高阶组件的 displayName
function getDisplayName(ComponentWarpped) {
  return ComponentWarpped.displayeName || ComponentWarpped.name;
}

// 创建要被包装的组件
const 要被包装的组件 = (props) => <div>{/* 内容 */}</div>;

// 获取被高级组件包装增强后的组件
const 被包装后的组件 = 高级组件(要被包装的组件);

// 使用
class 使用被包装后组件的组件 extends React.Component {
  render() {
    return (
      <div>
        {/* 其余内容 */}
        <被包装后的组件 />
        {/* 其余内容 */}
      </div>
    );
  }
}
```

:::

> 如下：
>
> ```jsx
> function withMouse(ComponentWarpped) {
>     class Mouse extends React.Component {
>         state = {
>             x: 0,
>             y: 0
>         }
>         handle = e => {
>             this.setState({
>                 x: e.clientX,
>                 y: e.clientY,
>             })
>         }
>         componentDidMount() {
>             window.addEventListener('mousemove', this.handle)
>         }
>         componentWillUnmount() {
>             window.removeEventListener('mousemove', this.handle)
>         }
>         render() {
>             return (
>                 <ComponentWarpped
>                   {...this.state}
>                   {...this.props}
>                 />
>             )
>         }
>     }
> 		Mouse.displayName = `WithMouse ${getDisplayName(ComponentWarpped)}`
>
> 		return Mouse
> }
> // 设置 高阶组件的 displayName
> function getDisplayName(ComponentWarpped){
>   return ComponentWarpped.displayeName || ComponentWarpped.name
> }
>
>
> const MousePosition = props => (
> 	<div>
>   	x: <p>{this.props.x}</p>
>     y: <p>{this.props.y}</p>
>   </div>
> )
> const PicMovement = props => (
> 	<img
>     src={pic}
>     style={{
>       postion: 'absolute'
>       top: props.y
>       left: props.x
>     }}
>   />
> )
>
> const EnhancedMousePosition = withMouse(MousePosition)
> const EnhancedPicMovement = withMouse(PicMovement)
>
> class Demo01 extends React.Component {
>   render(){
>     return (
>     	<div>
>         { /* 复用例 */}
>         <EnhancedMousePosition />
>         { /* 复用例 */}
>         <EnhancedPicMovement />
>       </div>
>     )
> 	}
> }
> ```

## React Developer Tools

基于 Chrome 浏览器的 React 的组件调试工具

![](https://www.xpresservers.com/wp-content/uploads/2020/08/1598762041_133_How-To-Debug-React-Components-Using-React-Developer-Tools.png)

基于 React 开发的网页会有提示：

![](https://reactjs.org/static/d0f767f80866431ccdec18f200ca58f1/0a47e/devtools-prod.png)

若网页项目未打包上线，还处于开发状态时：

详见 [React 脚手架打包]()

![](https://reactjs.org/static/e434ce2f7e64f63e597edf03f4465694/0a47e/devtools-dev.png)
