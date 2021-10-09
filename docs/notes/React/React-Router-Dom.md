# React 路由

SPA路由在React中可理解为**：URL路径与组件的对应关系**

即配置路径和组件

### 安装和导入

安装 **React-Router-Dom** 包

```bash
yarn add react-router-dom
#或
npm i react-router-dom
```

导入项目

```react
import {BrowserRouter as Router} from 'react-router-dom';
```





### Router组件

首先需要Router组件用于包裹整个项目

只有被Router包裹的应用才能使用路由

整个项目只会使用Router组件一次

```react
ReactDOM.render(
  <Router>
    	<App/>
 	 </Router>,
  document.getElementById('root')
)
```

Router组件 分为两类：

- **BrowserRouter**	推荐

  使用H5的historyAPI

  `localhost:3000/first`

- **HashRouter**

  使用URL的哈希值实现

  `localhost:3000/#/first`



### Route组件

是路由出口，Route组件写在哪对应组件就展示在哪

在Route组件设置路由匹配规则和对应指定URL地址展示的组件

- **path属性 **指向路由URL

- **component属性** 指向URL对应展示的组件名

路由内部会对URL地址与path指定的URL进行匹配，符合规则才会展示对应组件，详见 路由的两种 [匹配模式]()

```react
ReactDOM.render(
  <Router>
    <App>
      
			<Route path="/first" component={First}></Route>
      <Route path="/second" component={Second}></Route>
      <Route path="/third" component={Third}></Route>
      
    </App>
  </Router>,
  document.getElementById('root')
)
```



​	





## 声明式导航

通过连接实现路由跳转

### 使用步骤

#### 1. 导入核心组件

- Router（BrowserRouter）

- Route
- Link

```react
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
```

---

#### 2. 设定路由入口

通过Link组件设定路由的导航连接

- **to属性 **指定URL地址的pathname

Link组件最终被解析为 a标签，to属性被解析为href属性

```react
<Link to="/first">页面一</Link>
<Link to="/second">页面二</Link>
<Link to="/third">页面三</Link>
```

---

#### 3. 设置匹配规则

在Route组件设置对应指定URL地址展示的的组件

- **pathname 属性** 就是路由规则，对应URL地址的pathname

- **component 属性** 即URL地址对应展示的组件

```react
ReactDOM.render(
  <Router>
    <div>
      <Link to="/first">页面一</Link>
      <Link to="/second">页面二</Link>
      <Link to="/third">页面三</Link>

      <Route path="/first" component={First}></Route>
      <Route path="/second" component={Second}></Route>
      <Route path="/third" component={Third}></Route>
    </div>
  </Router>,
  document.getElementById('root')
)
```



### 全貌

```react
import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

// 组件
import Home from "./views/Home.jsx"
import Management from './views/Management.jsx'

ReactDOM.render(
  <Router>
    <App>
      <Link to="/home">首页</Link>
      <Link to="/management">管理页面</Link>

      <Route path="/home" component={Home} />
      <Route path="/management" component={Management} />
    </App>
  </Router>,
  document.getElementById('root')
)
```



### 执行过程

1. 点击Link组件，修改URL地址

2. React路由监听URL地址栏变化

3. 只要URL改变，React路由就 **遍历所有Route组件** 

4. React路由对使用path属性和URL地址的pathname进行匹配

   路由规则path属性能匹配上URL的pathname时，展示对应组件

   路由规则path属性能匹配不上URL的pathname时，不显示内容







## 编程式导航

由代码实现路由跳转

在组件内通过事件触发路由跳转，

### 使用步骤

1. 要有Route组件对应URL地址

2. 在各个页面组件内

   通过this.props.history实现路由跳转



### props.history

组件自身在没被传入数据或设定默认props数据时，是没有props属性的

但组件若被路由的**Router组件匹配渲染**的话，

路由会给改组件传入一个路由对象

组件内部可通过props获取该路由对象

```js
{
  history:{},
  location:{},
  match:{}, 
}
```

可通过其中的 **history对象** 实习路由的编程时导航

路由对象的hisroty对象中有几个方法：

- **push**
- **go**

组件内通过事件调用这些方法，实现不同方式的路由跳转：



#### push

跳转到**具体的URL地址**

通过当前组件的**this.props.push(URL) **跳转到指定URL地址

然后展现对应的组件到页面

```js
this.props.history.push(URL地址)
```

```js
this.props.history.push('/home')
```

如下：

First页面和Second页面中各有一个button按钮，

点击后分别跳转到对应的URL，然后展现对应的组件内容到页面

```react
class First extends React.Component {
  goSecond = () => {
    // console.log(this.props);
    this.props.history.push('/second')
  }
  render() {
    return (
      <div>
        <button onClick={this.goSecond}>
          页面二
        </button>
      </div>
    )
  }
}

class Second extends React.Component {
  goFirst = () => {
    // console.log(this.props);
    this.props.history.push('/first')
  }
  render() {
    return (
      <div>
        <button onClick={this.goFirst}>
          页面一
        </button>
      </div>
    )
  }
}


ReactDOM.render(
  <Router>
    <div>
      <Route path="/first" component={First} />
      <Route path="/second" component={Second} />
    </div>
  </Router>,
  document.getElementById('root')
)
```

---

#### go

**前进或后退指定数量的页面，**正数前进，负数后退

通过当前组件的**this.props.go(页数) **跳转到指定URL地址

然后展现对应的组件到页面

```js
this.props.history.go(n)
```

```js
this.props.history.go(2)	// 根据访问记录前进两页
this.props.history.go(-1)	// 根据访问记录后退一页
```

---

#### back

---

#### forward

---

#### replace







## 默认路由

默认路由是指，打开应用首页时自动定位到URL地址并展示对应组件

应用首页URL是 **/** ，即设置默认路由就是：

**Route组件匹配路由规则为 / 并展示对应的组件**

```react
 <Route path="/" component={ 默认展示的组件} />
```

如下：

页面没有展示内容

```react
class Home extends React.Component {
  render() {
    return (
      <div>Home</div>
    )
  }
}

ReactDOM.render(
  <Router>
    <App>
      <Route path="/home" component={Home} />
    </App>
  </Router>,
  document.getElementById('root')
)
```

匹配路由规则为 **/** 之后，首页显示Home组件内容

```react
class Home extends React.Component {
  render() {
    return (
      <div>Home</div>
    )
  }
}

ReactDOM.render(
  <Router>
    <App>
      <Route path="/" component={Home} />
    </App>
  </Router>,
  document.getElementById('root')
)
```







## 匹配模式

### 模糊匹配

React的路由是模糊匹配的。模糊匹配是指路由匹配URL和组件时，

**只要URL地址的pathname是以Route的path属性值开头就匹配上**

会出现以下问题：

---

#### 1.  默认路由永远被匹配

因为默认路由的URL的pathname是  /，

Route组件匹配规则path属性设置的值都是以 / 开头，

所以会导致除了对应URL的组件外，默认路由的组件也永远被匹配到

**默认路由对应的组件在URL地址pathname为 / 开头时就显示**

从而出现路由切换后默认路由的组件还显示的问题

```js
/first

<Route path="/first" component={First} />
<Route path="/" component={Default} />
```

如下：路由跳转后Login页面展示Home组件还保留在页面

并按照Route组件的定义顺序展现

```react
class Home extends React.Component {
  render() {
    return (
      <div>Home页面</div>
    )
  }
}
class Login extends React.Component {
  render() {
    return (
      <div>Login页面</div>
    )
  }
}

ReactDOM.render(
  <Router>
    <div>
      <Link to="login">登陆页面</Link>

      <Route path="/" component={Home} />
      
      <Route path="/login" component={Login} />
      
    </div>
  </Router>,
  document.getElementById('root')
)
```

---

#### 2. 子路由永远被匹配

因为只要URL地址的pathname是以Route的path属性值开头就匹配上

所以当URL地址包含了Route设置的path属性值，就展示该组件

即，**以这个path属性值开头的所有URL地址都可以匹配上对应组件**

```js
/first
/first/a
/first/b
/first/a/b

<Route path="/first" component={Login} />
```

如下：即使Link组件的URL连接为无数层的子路由

依然可以匹配上父路由 /first 对应的组件

```react
class Login extends React.Component {
  render() {
    return (
      <div>Login页面</div>
    )
  }
}

ReactDOM.render(
  <Router>
    <div>
      <Link to="/login/a/b/c/d">登陆页面</Link>

      <Route path="/login" component={Login} />

    </div>
  </Router>,
  document.getElementById('root')
)
```



### 精确匹配

可通过**exact属性 **由进行 **精确匹配**

**只有URL地址的pathname与Route的path属性值完全一致时才匹配**

为了解决React模糊匹配导致的默认路由匹配问题，详见上文 [模糊匹配]()

可以**对默认路由进行精确匹配**，仅在Route组件的匹配规则path属性值与URL地址完全一致时，才展示默认路由对应组件

```react
/

<Route exact path="/" component={First} />
```

如下：

通过exact属性，使默认路由对应的组件仅在URL地址为 / 使显示

```react
class Home extends React.Component {
  render() {
    return (
      <div>Home页面</div>
    )
  }
}
class Login extends React.Component {
  render() {
    return (
      <div>Login页面</div>
    )
  }
}

ReactDOM.render(
  <Router>
    <div>
      <Link to="/">首页</Link>
      <Link to="/login">登陆页</Link>

      <Route exact path="/" component={Home} />
      <Route path="/login" component={Login} />

    </div>
  </Router>,
  document.getElementById('root')
)
```





## 路由参数





## 路由懒加载 lazyload

若是直接import 引入的话，

页面加载时，所有路由组件都被引入页面中了

```react
import Component01 from './Component01'
import Component02 from './Component02'
```

若想出现懒加载，点击那个路由才加载哪个路由组件到页面

若网速不够等情况导致没有加载出来时，会加载出loading组件

如下： 

```react
import { lazy, Suspense } from 'react';


const Component01 = lazy(()=> impor'./Component01');
const Component02 = lazy(()=> impor'./Component02');


<Suspense fallback={ <加载中页面组件/>}>
 		<Route path="/01" component={ Component01}/ >
  	<Route path="/01" component={ Component01}/ >
</Suspense>
```

1. 导入lazy, Suspense 组件
2. lazy懒加载导入路由组件
3. suspense包裹Route路由匹配组件，并导入loading等待时组件（loading组件不能lazy导入，只能普通导入）







## 路由组件 一般组件

由Router匹配的组件叫路由组件，其余都是一般组件

路由组件上自带props属性，里面包含history、location、match

### witchRouter()

一般组件调用时不传入数据的话props属性是个空对象

可使用withRouter方法将一般组件转换为路由组件

```react
import { withRouter } from 'react-router';

function demo(props){
  console.log(props)  
  return (
  	<div>Hello</div>
  )
}

export default withRouter(demo)
```

