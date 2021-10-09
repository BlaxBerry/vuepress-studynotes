# Redux

统一管理组件的状态

<img src="https://pbs.twimg.com/media/E2ysTjGUYAglrhI?format=jpg&name=medium" style="zoom:50%;" />

1. 组件通过**store.dispatch()** 传递action给store

   可以在组件中手写action对象

   或调用action creators函数生成action对象（常用）

2. store传递旧状态+action 给指reducers

3. reducer根据action处理旧状态，并返回新状态

4. 组件通过**store.getState()** 获取返回的状态





## Redux核心概念

- Components
- Action Creator**s**

- Store

- Reducer**s**





### State 状态

> - 将需要被统一管理的状态，从组件自身的state中取出
> - 状态在reducer函数中被初始化和修改
>
> - 组件内的事件中调用**store.dispatch()** 传递action动作描述给store
>
> - 组件通过**store.getState()** 获取初始化状态或处理后的状态





### Actions 动作对象

> - 通过action creator函数创建并返回action对象给组件
>
> - 组件内通过调用**store.dispatch()** 传递action动作描述给store
> - reducer函数接收 旧状态+action 给指reducers

---

action是个对象，**仅用于对动作的描述**，告知reducer函数要进行何种操作

reducer函数判断并根据type属性内容，对状态执行相对应处理

---

#### action构成

- 必须包含有type属性。用于描述。常写为字符串常量

- 除了type以外可任意定义其他属性来携带数据

```js
{
  type: "描述",
  data:数据
}
```

```js
{
  type: "ADD_NUM",
  data:{
    num: 1
  }
}
```

---

#### action creator

> 可以在组件中手写一个action对象，然后通过store.dispatch() 传给store
>
> ```js
> add = () => {
>   const action = {
>     type: "ADD_NUM",
>     data:{
>       num: 1
>     }
>   };
>   store.dispatch(action)
> }
> ```
>

但开发中多通过自定义的**action creators函数**生成action动作对象

函数返回值是action动作对象，并分别暴露出所有的action creator函数，

组件中导入需要的action creator函数，事件中调用函数获取返回值action，

然后通过s**tore.dispatch()** 把action传给store

```js
function addNum_Action(){
  return {
    type: "ADD_NUM",
    data:{
      num: 1
    }
  }
}
```

```js
add = () => {
  const action = addNum_Action()
  store.dispatch(action)
}
```





### Reducers 状态处理函数

> - 组件内通过调用**store.dispatch()** 传递action动作描述给store
> - store立刻将action动作对象 + 旧状态 传给reducer函数处理
> - 处理完后将状态返回store

---

reducer是个函数，一个组件对应一个reducer

用来对Redux管理的状态初进行始化和修改

- 修改旧状态
- 初始化状态

Reducer第一次触发是store出发，用于初始化状态

后面只要组件发送action就会触发，根据发送来的action的type描述处理状态

然后**return**返回 处理后的新状态 和 状态默认值 给store

---

#### 参数

默认接收store传来的两个参数

- perState旧的状态（默认undefined）
- action对象描述对象

```js
function xxx_reducer(state, action) {
  console.log(state) // undefined
  console.log(action)  // dispatch传入的action对象
}
```

---

#### reducer内容

reducer函数中还要进行对状态值的初始化

因为reducer函数接收的旧状态默认**undefined**

所以需要定义状态的初始值，并在swtich中return返回

```js
const init = { 初始化状态 }

function xxx_reducer(state=init, action) {
  // console.log(state) // 定义的初始化状态
  
    switch (action){
    case "action描述":
       处理state
       return 处理后的数据;
    case "action描述":
       处理state
       return 处理后的数据;
    case "action描述":
       处理state
       return 处理后的数据;
    default:
      return state      
  }      
}
```





### Store对象

Store负责连接  组件—action—reducer

#### 使用

导入Redux的 createStore方法，

调用方法并传入某一个Reducer创建Store对象

```js
// 引入createStore方法，
import { createStore } from 'redux'

// 引入自定义的reducer
import reducer from '../reducer/index'

// 创建并暴露store对象
export default createStore(reducer)
```

---

- **store.getState()**
- **store.dispatch(action)**
- **store.subscribe()**

---

#### getState()

组件中通过 **store.getState()**获取被Redux管理的状态

为了可以及时加载修改后的状态到页面，

还必须借助subscribe() 和 this.setState()   详见 [subscribe()]()

```jsx
render() {
  return (
    <div>
      <p>{ store.getState().data }</p>
    </div>
  )
}
```

---

#### dispatch()

组件中通过**store.dispatch(action) **将状态修改描述action对象传入Store

一般开发中多调用action creator函数，将其返回值action对象传入

```jsx
fn = () => {
  const action = {
    type: "描述",
    data: xxxxx
  }
  store.dispatch(action)
}
```

---

#### subscribe()

组件中通过**store.subscribe()** 监听Redux中状态的修改

里面是个回调函数，只要Redux中管理的状态被修改就会自动调用该函数

放在声明周期函数中

- 用来监听状态变化就获取最新的状态

```js
componentDidMount(){
  store.subscribe(()=>{
    console.log(store.getState().data)
  })
}
```

- **用来监听状态变化就重新加载页面**

Redux只是个管理公共状态的，不是React自家的产品

所以先用Redux监听状态变化，有变化就通知React去重新加载该组件

加载页面是要靠React来实现即调用 this.setState()，

因为只是通过该方法重加载页面，所以传入一个空对象即可

```js
componentDidMount(){
  store.subscribe(()=>{
    this.setState({})
  })
}
```

也可一劳永逸，直接在App组件中使用，重新渲染整个App组件

借助diff，监听Redux状态只要发生改就重新渲染用到了该状态的组件

```react
store.subscribe(()=>{
  ReactDOM.render(<App/>, doucment.getElementDyId('root'))
})
```









## Redux使用

### 安装

```bash
yarn add redux
```



### 目录

```bash
xxx
|- action
		|- index.js
|- reducer
		|- index.js
|- store		
		|- index.js
```



### 例子

#### action / index.js

```js
export function sayHello(data) {
    return {
        type: "say_hello",
        data: data
    }
}
```



#### reducer / index.js

```js
const init = { data: "Default" }

export default function reducer(state = init, action) {

    switch (action.type) {
        case "say_hello":
            return Object.assign({}, state, action);

        default:
            return state
    };
}
```



#### store / index.js

```js
import { createStore } from 'redux'

import reducer from '../reducer/index'

export default createStore(reducer)
```



#### 组件中

```jsx
import store from '../store/index'
import { sayHello_Action } from '../action/index'

class Demo extends Component {

    fn = () => {
        const action = sayHello_Action('hello')
        // console.log(action);
        store.dispatch(action)
    }

    componentDidMount() {
        store.subscribe(() => {
            // console.log(store.getState());
            this.setState({})
        })
    }

    render() {
        return (
            <div>
                <p>{ store.getState().data }</p>
                <button onClick={this.fn}>发送</button>
            </div>
        )
    }
}
```







## 异步Action

组件传递的action必须是个JS对象

但是通过一个第三方中间件可将action改为函数形式

函数形式的action被称为异步action

- 对象形式的Action：同步action

- 函数形式的Action：异步action（必须借助**redux-thunk**）

```js
function actionCreator(data){
  return ()=>{
    setTimeout(()=>{
      store.dispatch({
        type: '描述',
        data
      })
    },1000)
  }
}
```

异步action并不是必须的

1. 可在组件中通过定时器，异步发送action

```js
incremenAsync = () => {
  const { value } = this.selectVal;
  setTimeout(() => {
    store.dispatch(actionCreator(Number(value)))
  }, 1000)
}
```

2. 通过redux-thunk实现在action creator中异步发送action

```js
import { creatStore, applyMiddleware } from 'redux';

import peducer from '../prducer/index.js'

import thunk from 'redux-thunk';

export default creatStore(peducer, applyMiddleware(thunk))
```





