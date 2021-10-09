# Hooks

React16.8之前时，函数式组件因为没有this，只可以接收props，无法使用组件的state和生命周期函数，所以比起函数组件用的更多的是类组件

但，**React16.8+ 提出了 Hooks**

- State Hook
- Effect Hook
- Ref Hook

使函数式组件也可以使用state状态和生命周期





## State Hook

### React.useState()

函数组件本没有状态state也无法修改状态

通过 React.useState()，使函数组件也拥有状态state也可修改该状态

```react
function Demo(props){
  
  const [状态, 状态处理函数] = React.useSate(状态初始值)
  
  // 状态处理函数的使用
  // 修改后的新状态不依赖原状态
  function 方法(){
    状态处理函数(新状态)
  }
  
  // 状态处理函数使用
  // 修改后的新状态依赖原状态
  function 方法(){
    状态处理函数((旧状态)=> {return 处理 旧状态 后的新状态})
    // 简写
    状态处理函数((旧状态)=> 处理 旧状态 后的新状态)
  }
  
}
```

> State Hook 补充：
>
> 第一步调用useState()创建的状态会被缓存到函数内部,并不是每次函数调用都初始化状态,这是有React做的底层处理，后面可以放心使用

---

#### 例子

- 修改后的新状态不依赖原状态

```react
import React from 'react'
function FunComponent() {

    const [name,setName] = React.useState('andy')

    const changeName = () => { setName('Tom') }

    return (
        <div>
            <h3>{name}</h3>
            <button onClick={changeName}>改名</button>
        </div>
    )
}
```

- 修改后的新状态依赖原状态

```react	
function FunComponent() {

    const [num, setNum] = React.useState(10)

    const addNum = () => {
        setNum(num => num + 1)
    }

    return (
        <div>
            <h3>{num}</h3>
            <button onClick={addNum}> +1 </button>
				</div>
    )
}
```

> 对比类组件的state修改
>
> ```react
> class classComponent extends Component {
>     state = { num: 0, age: 20 }
>     addNum = () => {
>         this.setState({ num: this.state.num + 1 })
>     }
>     addAge = () =>{
>       	this.setState({age: this.state.age + 1})
>     }
>     render() {
>         return (
>             <div>
>                 <h3>{this.state.num}</h3>
>                 <button onClick={this.addNum}>
>                   num+1
>             		</button>
>             
>             		<h3>{this.state.age}</h3>
>             		<button onClick={this.addAge}>
>                   age+1
>             		</button>
>             </div>
>         )
>     }
> }
> ```









## Effect Hook

### React.useEffect()

函数组件中本没有生命周期

使用React.useEffect()使函数组件可使用生命周期来发送Ajax和订阅发布

useEffect Hook可看作3个生命周期的综合：

- **componentDidMount** 
- componentDidUpdate
- **componentWillMount**

可设定检查的状态来决定

是 **componentDidMount** 还是 componentDidUpdate

```react
// 检测所有状态的改变
// 除了组件加载时执行一次，后面只要有状态变化就执行
React.useEffect(() => {
	console.log('执行了');
})

// 谁都不检测，组件加载时也不执行
React.useEffect(() => {
	console.log('执行了');
}, [])

// 只检测指定状态
// 除了组件加载时执行一次，后面只要指定状态改变时就执行
React.useEffect(() => {
	console.log('执行了');
}, [指定状态])
```

至于 **componentWillMount**生命周期

需要让 React.useEffect() return 返回一个函数，

这个函数就相当于componentWillMount

```js
React.useEffect(() => {
	xxx;
  
  return ()=>{
    console.log('相当于componentDidMount生命周期');
  }
})
```

但是综上，虽然可以使函数组件使用生命周期，

但是看起来不是很直观，略显麻烦

至于生命周期还是建议类组件



#### 例子

在函数组件，开启一个记时器，并设定在组件卸载后清除定时器

计时器是以自己为准，若不设定检测的状态，会因为其他状态state的数据有变化就重复调用，导致计时器以指数级别增加，所以不但要设定检查状态，还要设定为谁也不检测，即【】

```react
import React from 'react'
import ReactDom from 'react-dom';

function FunComponent() {
    const [num, setNum] = React.useState(0)

    React.useEffect(() => {
      
        let timer = setInterval(() => {
            setNum(num => num + 1)
        }, 1000);
        return () => {
            clearInterval(timer)
        }
    }, [])

    const unmount = () => {
        ReactDom.unmountComponentAtNode(document.getElementById('root'))
    }

    return (
        <div>
            <h3>{num}</h3>
            <button onClick={unmount}>
              卸载组件
        		</button>
        </div>
    )
}
```

> 对比类组件中，生命周期中的定时器控制状态自增长
>
> ```react
> import React, { Component } from 'react'
> import ReactDom from 'react-dom';
> 
> class classComponent extends Component {
>     state = { num: 0 }
> 
>     componentDidMount() {
>         this.timer = setInterval(() => {
>             this.setState({ num: this.state.num + 1 })
>         }, 1000);
>     }
> 
>     componentWillUnmount(){clearInterval(this.timer)}
> 
>     unmount(){
>         ReactDom.unmountComponentAtNode(document.getElementById('root'))
>     }
> 
>     render() {
>         return (
>             <div>
>                 <h3>{this.state.num}</h3>
>                 <button onClick={this.unmount}>卸载组件</button>
>             </div>
>         )
>     }
> }
> ```







## Ref Hook

### React.useRef()

通过Ref Hook 使函数组件可获取元素节点并非受控组件的方式操作元素上的数据，通过类似React.createRef()

如下：获取 input元素的value输入值

```react
function FunComponent() {

    const myRef = React.useRef()

    const show = () => {
        console.log(myRef.current.value);
    }

    return (
        <div>
            <input type="text" ref={myRef} />
            <button onClick={show}>show</button>
        </div>
    )
}
```

> 类比 类组件中的ref
>
> ```react
> class classComponent extends Component {
> 
>     myRef = React.createRef()
> 
>     show = () => {
>         console.log(this.myRef.current.value);
>     }
> 
>     render() {
>         return (
>             <div>
>                 <input type="text" ref={this.myRef} />
>                 <button onClick={this.show}>show</button>
>             </div>
>         )
>     }
> }
> ```





