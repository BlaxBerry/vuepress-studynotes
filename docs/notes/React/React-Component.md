# React 组件化开发

![](https://cdn-ssl-devio-img.classmethod.jp/wp-content/uploads/2019/07/react.jpg)


[[toc]]

## 组件创建

::: tip 创建件的两种方式

- **函数创建：函数组件**
- **类创建：类组件**<br>
  相当于创建JS的[Class类]('../Javascript/ES6+/Class.md)

:::





### 函数组件

为了区分函数组件的和其他函数

- 函数名的**首字母大写**

- 必须要有 JSX结构作为函数**返回值**

  若没有定义返回值，会报错

  若不需要返回值，也要写上null，不会渲染任何内容

```jsx
const HelloComponent = () => (
  	<div>Hello Component</div>
  )
}

const NullComponent = () => null
```

使用组件时，组件名作为标签名

组件名必须大写，不然组件调用时会被当作HTML一般标签渲染（当然会报错）

可以双标签，可以单标签

```jsx
ReactDOM.render(
  <div>

    <HelloComponent></HelloComponent>
    
    <HelloComponent/>

  </div>,
  document.getElementById('root')
)
```



### 类组件

通过ES6的class创建的组件

为了区分类组件的和其他类

- 类组件名的**首字母大写**

- 必须要**继承 React.Component父类**，

  从而使用其提供的方法和属性（props，state，ref，context）

- constructor构造器函数不是必须

- 组件中必须要有 **render( ) 方法**

  render( ) 方法必须要有**return返回值**，返回 JSX结构

同函数组件一样，若不想返回JSX结构就返回一个null（正经人不会这么做）

```jsx
import React from 'react';

class Hello extends React.Component {
  render() {
    return (
      <div>Hello</div>
    )
  }
}
```

类实例的创建被React内部执行

使用组件时，类组件名作为标签名调用即可

组件名必须大写，不然组件调用时会被当作HTML一般标签渲染（当然会报错）

可以双标签，可以单标签

```jsx
ReactDOM.render(
  <div>

    <Hello />

  </div >,
  document.getElementById('root')
)
```



### 抽离独立组件文件

每个组件应该被抽离到单独的JS文件中

- 每个文件中必须 **import导入React和React.Component**

- 每个组件必须要被 **export default导出**，以供其他使用

```jsx
import React, { Component } from 'react'

export default class Hello extends Component {
    render() {
        return (
            <div>
                HelloComponent 
            </div>
        )
    }
}
```

使用时，import导入组件的文件后使用该组件

```jsx
import React from 'react';
import ReactDOM from 'react-dom';


import Hello from './components/Hello.jsx'

ReactDOM.render(
  <div>

    <Hello/>

  </div>,
  document.getElementById('root')
)
```





## 子组件

> 创建的组件相当于JS的类，组件内调用其他组件作为子组件的行为就是 JS的 创建类的实例对象，详见 [ JavaScript Class类]()

子组件以标签形式被调用子组件标签闭合

### children属性

只有当组件内有子组件时，

该组件的props属性才会有childern属性

否则props.children是个空对象 { }

关于props属性 详见 [props]()

```jsx
class App extends React.Component {
  render() {
    console.log(this.props);	// {}
    return (
      <div></div>
    )
  }
}

ReactDOM.render(
  <App></App>,
  document.getElementById('root')
)
```

有children属性

```jsx
class App extends React.Component {
  render() {
    console.log(this.props);	
    return (
      <div></div>
    )
  }
}

ReactDOM.render(
  <App>
    <div>Hello</div>
  </App>,
  document.getElementById('root')
)
```











## 事件处理

### 事件绑定

通过on+事件名，并且驼峰命名法

```js
on事件名称 = { 处理函数 }
```

#### 类组件

```jsx
on事件名称 = { this.类组件的方法 }
```

```jsx
import React, { Component } from 'react'

export default class Hello extends Component {

    click() {
        console.log('Clicked');
    }

    mouse() {
        console.log('Went througt');
    }



    render() {
        return (
            <button
                onClick={ this.click }
                onMouseLeave={ this.mouse }
            >点击</button>
        )
    }
}
```

---

#### 函数组件

```jsx
on事件名称 = { 函数组件的方法 }
```

```jsx
const Hello = () => {
  function click() {
    console.log('Clicked');
  }
  function mouse() {
    console.log('Went through');
  }
  return (
    <button
      onClick={click}
      onMouseLeave={mouse}
    >点击</button>
  )
}


ReactDOM.render(
  <div>
    	<Hello/>
  </div >,
  document.getElementById('root')
)
```



### 事件的触发

```js
on事件名称 = { 方法 }
// 触发了相应事件后才调用

on事件名称 = { 方法() }
// 在刚绑定到了虚拟DOM 上时就调用，后面不会被触发
```



### 事件对象 event

在事件内部可直接通过事件的参数获取事件对象event

不用通过虚拟DOM节点调用事件时传入，事件定义时就可获取

```jsx
import React, { Component } from 'react'

export default class Hello extends Component {

    click(e) {
        console.log('Clicked', e);
    }

    render() {
        return (
            <button onClick={this.click}>
            	点击
          	</button>
        )
    }
}
```

React的已经封装好，事件对象兼容任意浏览器

---

#### 阻止事件默认行为

如下：阻止a连接的跳转行为

```jsx
import React, { Component } from 'react'

export default class Hello extends Component {

    click(e) {
        // console.log('Clicked', e);
        e.preventDefault();
        console.log('阻止了默认行为');
    }

    render() {
        return (
            <a href="https://www.baidu.com/"
                onClick={this.click}
            >点击</a>
        )
    }
}
```





### this指向

以类组件为例子

类组件的特点是有状态 state数据的存在，[详见状态组件 无状态组件]()

类组件的方法也多用来操作**类本身自己的数据**



虚拟DOM调用类中方法函数时会出现this指向的各种问题，主要围绕：

- 方法中 **this是否指向类本身**
- 方法能否直接使用 `this.state` 来获取类本身的状态 state
- 方法能否直接使用 `this.方法` 来操作类本身



但虚拟DOM直接调用类中方法函数时，

类方法中 this指向 **undefined**（babel严格模式导致不指向window），并不是指向类自己本身，如下：

```jsx
import React, { Component } from 'react'

export default class Hello extends Component {

    state = { num: 0 }

    fn() {
        console.log(this);		// undefined
    }

    render() {
        return (
            <div>
                <button onClick={this.fn}>点击</button>
            </div>
        )
    }
}
```

因为函数的this执行该函数的调用者，

虚拟DOM直接调用类中方法时，该方法并不是当前被类组件所调用 ，

从而导致在方法中无法获取当前类本身的状态数据和操作类本身的数据，

所以需要在调用方法时**修改 this的指向**：

---

#### 1. 箭头函数调用类实例方法

可利用箭头函数特点，调用修改方法的this

不是让DMO直接调用方法，而是让DMO**通过一个箭头函数去调用类的实例方法**

> 箭头函数本身不绑定this，箭头函数的this指向所在作用域的this，
>
> 该箭头函数是在 render() 中，所以this指向render() 作用域中的this，
>
> render() 方法是由当前类组件调用执行渲染的，
>
> 所以**箭头函数中的this最终指向了当前类组件**，
>
> 虚拟DMO通过该箭头函数来调用类中方法时，**成了由当前这个类组件调用方法**，
>
> 所以此时方法中的this是指向当前类，即可以对当前类进行操作

```jsx
import React, { Component } from 'react'
export default class Hello extends Component {

    fn() {
        console.log(this);
    }

    render() {
        return (
            <div>
                <button onClick={ this.fn }>   {/* undefined */}
                  普通调用
            		</button>

                <button onClick={() => this.fn()}>   {/* 当前类组件 */}
                  通过箭头函数调用
            		</button>
            </div>
        )
    }
}
```

---

#### 2.  bind( )

可利用ES5的bind方法，直接修改函数的this指向

**Function.prototype.bind()**

可在每次虚拟DMO调用方法时修改指向

```jsx
export default class Hello extends Component {

    fn() {
        console.log(this);
    }

    render() {
        return (
            <div>
                <button onClick={this.fn.bind( this )}>
                  普通调用
            		</button>
            </div>
        )
    }
}
```

或，预先在类组件的constructor构造器中定义该方法的指向

```jsx
export default class Hello extends Component {

    constructor(){
        super()
        this.fn = this.fn.bind(this)
    }

    fn() {
        console.log(this);
    }

  
    render() {
        return (
            <div>
                <button onClick={ this.fn }>
                  普通调用
            		</button>
            </div>
        )
    }
}
```

---

#### 3.  箭头函数定义类的实例方法

上述两种方法是在虚拟DMO调用类组件方法时修改调用者的this指向

也可在定义类组件方法时，**直接以箭头函数的形式定义该类组件的方法函数**

因为这个方法自身就是个箭头函数，该方法的this永远指向所在的当前类组件

虚拟DOM调用该方法时不会因为调用者的this从而导致该方法中this的指向

**也是推荐的做法**

```jsx
export default class Hello extends Component {

    fn = () => {
        console.log(this);
    }


    render() {
        return (
            <div>
                <button onClick={ this.fn }>
                  普通调用
            		</button>
            </div>
        )
    }
}
```







### 事件参数











## 状态组件 无状态组件

组件除了根据定义方式区分，

还可根据是否有  **状态 state**  分为：

- 有状态组件（类组件）

- 无状态组件（函数组件）

函数组件没有自己的数据，只负责展示静态JSX结构

类组件有自己的数据，通过操作数据变化动态更新UI，实现页面动态变化

一般是将这两种组件相互结合来实现应用的复杂功能和展示









## state

**状态 state** 即数据，是组件（类组件）内部的私有数据，

是组件自身的数据，只能在该组件内部自己使用

Raect是数据驱动页面的渲染，即由state/props驱动

一个组件可有多个数据，state的 **值是对象**



### 定义状态

state定义在类组件的 **constructor构造函数中**

#### 构造函数中

```jsx
constructor() {
  super();
  
  this.state = {
    num: 100
  }

}
```

如下：

```jsx
import React, { Component } from 'react'

export default class Hello extends Component {

    constructor() {
        super();

        this.state = {
            num: 100
        }
    }

    render() {
        return (
            <div></div>
        )
    }
}
```

---

#### ES6属性简写

也可以使用ES6的属性转化语法，简写：

```jsx
import React, { Component } from 'react'

export default class Hello extends Component {

    state = {
        num: 100
    }

    render() {
        return (
            <div></div>
        )
    }
}
```



### 使用

在类组件中通过 **this.state** 获取该组件的状态state对象

setState() 自动实现了state状态的修改，然后自动渲染页面更新UI（数据驱动视图）

```jsx
import React, { Component } from 'react'

export default class Hello extends Component {

    state = {
        num: 100
    }

    render() {
        return (
            <div>{this.state.num}</div>
        )
    }
}
```



### 修改状态

修改该组件state中的数据的值不能直接被修改，必须通过 **this.setState( ) 方法** 

以对象的键值对形式写入要修改的数据和修改后的值

```jsx
this.setState({
  state中的数据: 修改后的值
})
```

```jsx
import React, { Component } from 'react'

export default class Hello extends Component {

    state = {
        num: 0
    }

    render() {
        return (
            <div>
                <div>数值：{this.state.num}</div>

                <button onClick={() => {
                    this.setState({ 
                      num: this.state.num + 1 
                    })
                }}> +1 </button>
            </div>
        )
    }
}
```

**注意：**

JSX 结构主要是展示视图，逻辑处理最好单独放入类方法

注意，若通过调用类组件中的方法来修改类中状态state的数据时，则调用方法时必须 **修改 this的指向**，不然在方法中调用this.setState( ) 时，会因为this为 undefined 而报错

详见 [修改 this指向 的3种方法]()

```jsx
import React, { Component } from 'react'

export default class Hello extends Component {

    state = {
        num: 0
    }

    add() {
        this.setState({
            num: this.state.num + 1
        })
    }

    render() {
        return (
            <div>
                <div>数值：{this.state.num}</div>
                <button onClick={ this.add.bind(this) }>
                  +1 
            		</button>
            </div>
        )
    }
}
```

---

#### 异步回调

**setState状态更新是异步**的

若想this.setState修改后立刻获取状态，获取的还是旧状态，

无法获取最新状态是因为，直接获取式同步任务，修改是个异步任务

如下，发现并没有改变，但是实际上页面中的数据已经被修改并渲染

```js
state= { num: 0 }
change=()=>{
  
  this.setState({num:100});
  console.log(this.state.num)  // 0
} 

```

所以想要立刻获取修改后数据，可通过一个回调函数

该回调函数在状态更新完毕切页面渲染完毕后才会被调用

```jsx
this.setState({state中数据: 修改后的值}, [callback] )
```

```js
state= { num: 0 }
change=()=>{
  
  this.setState({num:100}, ()=>{
			console.log(this.state.num)  // 100
	})
  
  console.log(this.state.num) // 0
                
});
```

---

#### 函数式setState 对象式setState

修改状态state的setState除了传入一个对象，还可以函数的形式修改状态。函数式的优点在于函数的参数就是该组件的state和props

```js
change=()=>{
  this.setState((state, [props]) => {
    return { 数据: state.数据 + 1 }
  })
});
```

对象形式的setState是函数式的语法糖

在更新后的新状态不依赖原状态时，写起来更简便

但更新后的新状态依赖原状态时，需要重新this获取原状态

```js
this.setState({ 
  num: this.state.num + 1,
  age: 1000000
})
```

函数型式的setState因为函数参数就是state

更新后的新状态依赖原状态时，直接获取即可

并且接受的数据props同样也是一个可选参数

```js
 this.setState((state, props) => ({
   num: state.num + 1,
   age: props.age
}))
```









## 表单处理

React中有两种表单处理的方式：

- 受控组件
- 非受控组件



### 受控组件

受控组件是指：

- 表单**输入值value/check的来源 **受React组件控制

  将组件状态state与表单输入值value绑定

- 表单**输入值value/check的变化** 受React组件控制

  由组件的setState方法控制管理表单输入值value的变化

  

1. 组件的状态state中定义一个数据，用来存放表单的输入值value/check

2. 然后组件状态state的该数据赋值给表单的value值

3. 给表单绑定onchange事件组件方法

4. 当表达输入值value/check变化时，通过 setState() 修改状态state中的数据



#### 文本框

通过this.state.属性、onChange事件、this.setState() 来控制表单value属性

```jsx
<input type="text" value=""/>
```

```jsx
export default class Hello extends Component {

    state = {
        inputVal: ''
    }

    fn = (e) => {
        this.setState({
            inputVal: e.target.value
        })
    }

    render() {
        return (
            <div>
                <input type="text"
                    value={ this.state.inputVal }
                    onChange={ this.fn }/>

                <p>{this.state.inputVal}</p>
            
            </div>
        )
    }
}
```

---

#### 富文本框

和文本框一样，

通过this.state.属性、onChange事件、this.setState() 来控制表单value属性

```html
<textarea value=""></textarea>
```

```jsx
export default class Hello extends Component {

    state = {
        content: ''
    }

    fn = (e) => {
        this.setState({
            content: e.target.value
        })
    }

    render() {
        return (
            <div>
                <textarea
                    value={this.state.content}
                    onChange={this.fn}
                ></textarea>
            </div>
        )
    }
}
```

---

#### 下拉选框

也和文本框一样，

通过this.state.属性、onChange事件、this.setState() 来控制表单value属性

```html
<select value="">
  <option value=""></option>
</select>
```

```jsx
export default class Hello extends Component {

    state = {
        selectVal: 'lili'		// 默认选中 lili
    }

    fn = (e) => {
        this.setState({
            selectVal: e.target.value
        })
    }

    render() {
        return (
            <div>
                <select 
                  value={ this.state.selectVal } 
                  onChange={ this.fn }>
                    <option value="andy">Andy</option>
                    <option value="tom">Tom</option>
                    <option value="lili">Lili</option>
                </select>
            </div>
        )
    }
}
```

---

#### 复选框

通过this.state.属性、onChange事件、this.setState() 来控制表单check属性

```jsx
export default class Hello extends Component {

    state = {
        isChecked: false
    }

    fn = (e) => {
        this.setState({
            isChecked: e.target.checked
        })
    }

    render() {
        return (
            <div>
                <input type="checkbox" name="sex" 
                  checked={this.state.isChecked} 
                  onChange={this.fn} />
            </div>
        )
    }
}
```

---

#### 多表单统一处理

- 根据事件对象的表单属性区分表单类型，

  复选框的输入属性名为checked，其余文本框的输入属性名为value

- 建议为了方便区分：

  将组件状态state中的数据名分别和表单name属性的值统一

  将组件状态state中的数据分名别和表单value/checked属性的值统一

```jsx
export default class Hello extends Component {

    state = {
        text:'',
        textarea:'',
        select:'',
        checkbox: false
    }

    fn = (e) => {
        const value = e.target.type === 'checkbox'
            ? e.target.checked
            : e.target.value;
        this.setState({
            [e.target.name]: value
        });
    }

    render() {
        return (
            <div>
                <input type="text" 
                  	name="text"
                    value={this.state.text}
                    onChange={this.fn} /><span>{this.state.inputVal}</span>
                <hr />

                <textarea 
                  	name="textarea"
                    value={this.state.textarea}
                    onChange={this.fn}
                ></textarea>
                <hr />

                <select 
                  	name="select"
                    value={this.state.select}
                    onChange={this.fn}>
                    <option value="andy">Andy</option>
                    <option value="tom">Tom</option>
                    <option value="lili">Lili</option>
                </select>

                <hr />
                <input type="checkbox" 
                  	name="checkbox"
                    checked={this.state.checkbox}
                    onChange={this.fn} />
            </div>
        )
    }
}
```





### 非受控组件

使用 **ref** 从DOM节点上获取表单的输入值

不太常用

这是通过操作DMO的方式获取数据，React更推荐的还是受控组件的方式

```jsx
export default class Hello extends Component {
    constructor(){
        super()
				// 创建ref对象
        this.val = React.createRef()
    }

    fn=()=>{
      	// 获得DMO节点input
        console.log(this.val.current);
      
      	// 获取获得DMO节点input的value属性的值
        console.log(this.val.current.value); 
    }

    render() {
        return (
            <div>
                <input type="text" 
                  ref={this.val} />
                <button onClick={this.fn}>获取value</button>
            </div>
        )
    }
}
```







## props

用于接受**父组件传递来**的数据

### 传入子组件

以**标签属性的形式**，从父组件将任意类型数据传入子组件

- 字符串
- 数值
- 数组
- 对象
- 函数
- JSX结构

除了字符串类型的数据可直接传入以外，其余数据表达式需要使用 **{ }** 

```jsx
<Father>
		<Son 
    	name = "andy"
      age = {29}
      arr = { [1, 2, 3] }
      obj = { { a: 1, b: 2 } }
      fun = { () => { console.log('hello'); } }
   	/>	
</Father>
```



### 子组件接受

在子组件内props属性的数据以对象形式被接受

props属性在子组件内是只读属性，不能被修改

---

#### 函数组件 接受props

在函数组件中直接通过 **props** 获取父组件传入的数据

作为函数组件的参数

```jsx
function Son(props) {
  
  console.log(props);		//{name="andy",age:29}
  
  return (
    <div>
      <div>{props.name}</div>
      <div>{props.age}</div>
    </div>
  )
}


ReactDOM.render(
  <div>
			<Son 
      	name="andy" 
      	age={29}
    	/>

  </div >,
  document.getElementById('root')
)
```

---

#### 类组件 接受props

在类组件中通过 **this.props **获取父组件传入的数据

```jsx
class Son extends React.Component {
  
  render() {
    console.log(this.props);	//{name="andy",age:29}
    
    return (
      <div>
        <div>{this.props.name}</div>
        <div>{this.props.age}</div>
      </div>
    )
  }
}

ReactDOM.render(
  <div>
			<Son
      	name="andy"
      	age={29}
    	/>
  </div >,
  document.getElementById('root')
)
```

若类组件中有 constructor构造函数，

必须将props作为参数传递给 **super()方法**（用于继承父类的数据）

否则无法在该类组件中使用props属性，props会成为undefined

```jsx
class Son extends React.Component {
  constructor(props){
    super(props)
    console.log(this.props);	//{name="andy",age:29}
  }
  
  render() { 
    return (
      <div>
        <div>{this.props.name}</div>
        <div>{this.props.age}</div>
      </div>
    )
  }
}

ReactDOM.render(
  <div>
			<Son
      	name="andy"
      	age={29}
    	/>
  </div >,
  document.getElementById('root')
)
```



### props 默认值

给组件设定没有数据传入时，依然能获取的默认值

比如分页组件，默认的每页显示条数

```jsx
组件名.defaultProps = {
  属性: 值
}
```

如下：

即使没有给Demo组件传入数值，依然能获取数据

```jsx
class Demo extends React.Component {
  render() {
    return (
      <div>
        {this.props.name}
        {this.props.age}
      </div>
    )
  }
}
Demo.defaultProps = {
  name: 'andy',
  age: '28'
}

ReactDOM.render(
  <div>
    	<Demo />
  </div>,
  document.getElementById('root')
)
```

注意，**默认值只在没有数据传入组件时才生效**

若有数据传入了组件，则有先一传入的数据为准

如下：

设置的默认值是 andy 28,但传入的是 tommy 16	

优先以传入的为准，最后渲染到页面的是tommy 16	

```jsx
class Demo extends React.Component {
  render() {
    return (
      <div>
        {this.props.name}
        {this.props.age}
      </div>
    )
  }
}
Demo.defaultProps = {
  name: 'andy',
  age: '28'
}

ReactDOM.render(
  <div>
    	<Demo 
        name="tommy" 
        age={16}
      />
  </div>,
  document.getElementById('root')
)
```





### props 数据校验

对于当前组件来讲，无法保证外部会传入一个什么格式类型样的数据

**如果传入组件的数据的类型不符合组件的处理要求，就会报错**

如下：子组件需要对接收的数据进行遍历渲染，

原本需要数据类型是个数组，但是传入了一个数值，于是报错

```jsx
class Demo extends React.Component {
  render() {
    return (
      <ul>
        {
          this.props.list.map((item, index) => (
            <li key={index}>{item}</li>
          ))
        }
      </ul>
    )
  }
}

ReactDOM.render(
  <div>
    <Demo list={ 999 } />
  </div>,
  document.getElementById('root')
)
```

但，当前组件只会报错告知无法进行处理

而无法获知错误的具体原因

```js
// this.props.list.map is not a function
```

所以，需要进行props传入数据的校验

来得知在传入的数据格式不符合当前组件内的处理逻辑的需求时，

到底是哪里出了错误

---

#### prop-types（建议必做）

[详见官方文档的 Typechecking with Prop-Types]()

通过第三方包**prop-types** 对props传入数据的进行校验，

传入的数据格式不符合当前组件内的处理逻辑的需求时，

会提示哪一个数据那种格式出错，方便修改

1. 安装

```bash
yarn add prop-types
# 或
npm install prop-types
```

2. 导入

```js
import PropTypes from "prop-types"
```

3. 添加校验规则

   给指定组件的指定数据们添加校验规则

```jsx
组件名.propTypes = {
  数据名: PropTypes.数据类型
}

// 常见类型：
array
bool
func
number
object
string

// 规定数据必选
组件名.propTypes = {
  数据名: PropTypes.数据类型.isRequired
}

// 规定一个数据的结构
组件名.propTypes = {
  数据名: PropTypes.shape({
    属性: PropTypes.数据类型
  })
}
```

4. 传入数据到组件时，该组件的根据规则自动校验

   若数据格式会报错，会报错并详细说明哪个数据哪个格式出错

   如下：

```jsx
import PropTypes from "prop-types"

class Demo extends React.Component {
  render() {
    return (
      <ul>
        {
          this.props.list.map((item, index) => (
            <li key={index}>{item}</li>
          ))
        }
      </ul>
    )
  }
}
Demo.propTypes = {
  list: PropTypes.array
}

ReactDOM.render(
  <div>
    <Demo list={999} />
  </div>,
  document.getElementById('root')
)
```

提示传入组件的 list 数据本应该是个数值，但传入的是个数值类型

```js
//  Warning: Failed prop type: Invalid prop `list` of type `number` supplied to `Demo`, expected `array`.
```







## context

context也是组件实例上的一个属性，

类组件中可通过this.context获取，默认是个空对象 { }

类似 props的跨组件数据传递，但context用于**深层组件**之间的数据传递

不仅是最近一级父子组件尤其是**父组件与后代组**的深层树型嵌套

不然props逐层传递会太过繁琐（正经人不这么用）

### 类组件中使用

1. 创建 **Context 容器**

   在父组件和子组件所在的**公共区域**创建

   ```js
   const XxxContext = React.createContext()
   ```

2. 通过 Context 容器对象上的 **Provider** 包裹后代组件，

   并通过 **value** 传递数据

   ```jsx
   <XxxContext.Provider value={ 数据 }>
   		<后代组件/>
   </XxxContext.Provider>
   ```

3. **声明接收context**

   谁声明谁使用需要使用数据的后代组件中，

   通过**contextType**接收公共区域内定义的 context容器

   之后就可以在该声明接收的子组件内通过this.context获取数据了

   若不声明接收，this.context默认是个 { }

   ```jsx
   class 子组件 extends React.Component{
     static contextType = xxxContext
   	
   	render(){
       console.log(this.context)
       return(
         <div></div>
       )
     }
   }
   ```

---

如下：传递一个对象

```jsx
const MyContext = React.createContext()

class Demo extends React.Component {
  state = {
    num: 100,
    age: 'andy'
  }
  render() {
    return (
      <MyContext.Provider
        value={{
          num: this.state.num,
          age: this.state.age
        }}>
        <Child1 />
      </myContext.Provider >
    )
  }
}

class Child1 extends React.Component {
  render() {
    console.log(this.context); 	//{}
    return (
      <Child2 />
    )
  }
}

class Child2 extends React.Component {
  static contextType = MyContext
  render() {
    console.log(this.context); 	//{num: 100, age: 'andy'}
    return (
      <div>
        {this.context.num}
        {this.context.age}
      </div>
    )
  }
} 
```



### 函数组件中使用

若想接受数据的后代组件是个**函数组件**时，

函数组件无无法像类组件一样，直接获取this.context，也无法通过 contextType 声明接收数据。

此时需要通过Context容器上的 Consumer

1. 公共区域内创建Context容器 ，并获取 **Provider** 和 **Consumer**

   ```js
   const XxxContext = React.createContext()
   ```

2. 通过 Context容器上的 **Provider** 包裹后代组件，

   并通过 **value** 传递数据

   ```jsx
   <XxxContext.Provider value={ 数据 }>
   		<后代组件/>
   </XxxContext.Provider>
   ```

3. 函数子组件内通过 Context容器上的 **Consumer** 获取数据

   调用一个**回调函数**

   函数的参数就是Provider组件的value值，即传递的数据

   ```jsx
   return (
   	<XxxContext.Consumer>
   		{
         value => {
           return (
             <div>{ value.数据 }</div>
           )
         }
       }
   	</XxxContext.Consumer>
   )
   ```

---

如下：

```jsx
const { Provider, Consumer } = React.createContext()

class Father extends React.Component {
	state = {
    num: 100,
    age: 'andy'
  }

  render() {
    return (
      <MyContext.Provider
        value={{
          num: this.state.num,
          age: this.state.age
        }}>
        <Child1 />
      </myContext.Provider >
    )
  }
}

const Child1 = props => {
  return (
    <div>
      <Child22 />
    </div>
  )
}

const Child2 = props => {
  return (
    <div>
      <Consumer>
        { data => ( 
          	<div>{data.num}</div> 
          	<div>{data.age}</div> 
        ) }
      </Consumer>
    </div>
  )
}
```

---

但实际上开发中不怎么用context属性

主要是使用，比如 **react-redux**









## 组件通信

> 组件之间的关系共两种：
>
> - 嵌套组件（父子组件）
>   - 亲父子
>   - 祖孙（跨级组件）
> - 非嵌套组件（兄弟组件）
>
> ---
>
> 组件之间通讯理念目前是4种：
>
> - **props**
>   - childern.props （详见 [props]()）
>   - render.props（详见 [render props]()）
>
> - **消息订阅-发布**
>   - pub-sub.js
>
> - **集中管理**
>   - Redux（详见 [Redux]()）
> - **context**
>   - Provider — Consumer （详见 [context]()）

---

结合组件关系，组件之间通讯方式可使用：

- 亲父子组件之间：

  - props
  - 事件 + 回调函数

- 祖孙组件之间：

  - 消息订阅-发布

  - 集中管理（Redux）
  - context（用的少，多用其封装的插件）

- 兄弟组件之间：

  - 消息订阅-发布

  - 集中管理（Redux）



### 父子组件之间

#### 父 —> 子

- props

  [详见props]()

  1. 父组件的状态state中的数据
  2. 将数据以标签属性方式传入父组件内的子组件
  3. 子组件内通过 **props属性** 获取对象形式的数据

- context

  [详见context]()

  若组件层级特别深，可使用**context**

---

#### 子 —> 父

通过**回调函数**的形式，只要子组件调用就会传递

1. 父组件内定义一个函数

2. 父组件将该函数传入子组件，仅传入不调用

3. 子组件内通过 this.props 调用父组件传递进来的该函数

   **常常通过事件触发该回调函数**

4. 子组件内将自身状态state中的数据以参数形式传入该函数

5. 父组件传入的函数内接受参数来获取子组件传入的数据，

   再通过 this.setState 将数据存入父组件的状态中，

   完成传递

如下：

子组件通过onClick事件触发父组件传入的getData函数，

并将数据自身状态state的name作为参数传入该函数

父组件内接收到并通过setState存入自身的状态，完成子传父

```jsx
class Son extends React.Component {
  state = {
    name: 'andy'
  }

  send = () => {
    this.props.getData(this.state.name)
  }
  
  render() {
    return (
      <div>
        <button onClick={this.send}>发送</button>
      </div>
    )
  }
}


class Father extends React.Component {
	state = {
    name: ''
  }

  getData = (data) => {
   	// console.log("show data in Father",data);
    this.setState({
      name: data
    })
  }
  
  render() {
    return (
      <div>	
        <Son getData={this.getData} />
      
        <p>来自子组件的数据：{this.state.name}</p>
      </div>
    )
  }
}
```



### 兄弟组件之间

#### 状态提升

实际上还是通过props，借助公共父组件

1. 将兄弟组件的共享的状态传递到最近的公共父组件中，

2. 公共父组件管理这个共享状态，并提供操作该状态的方法

3. 子组件通过props接受状态和操作方法

```jsx
class Father extends React.Component {
  state = {
    num: 100
  }
  add = () => {
    this.setState({
      num: this.state.num + 1
    })
  }
  render() {
    return (
      <div>
        <Child01 add={this.add} />
        <Child02 num={this.state.num} />
      </div>
    )
  }
}


const Child01 = (props) => {
  return (
    <button onClick={props.add}> +1 </button>
  )

}

const Child02 = (props) => {
  return (
    <h3>计算结果：{props.num}</h3>
  )
}
```

---

#### 消息订阅-发布

是一种理念，用

---

#### 集中管理

Redux













## 生命周期

**只有类组件才有生命周期**

组件生命周期是指：组件从被创建到被挂载到页面再到被卸载的流程

可以更好了解组件的运行方式，也可以更好的分析错误原因

### 流程

- 创建时（挂载阶段）

  - 组件被创造（页面加载时）

- 更新时

  - 初始化时

  - 每次使用setState更新组件状态时
  - 强制更新时

- 卸载时

  - 组件从页面中消失时



### 钩子函数

每个生命周期都是有特定的方法调用完成特定的任务

这些不同阶段调用的方法函数，就是钩子函数

方便了在不同阶段进行特定的处理

(和手动定义的前后位置无关，React默认的执行顺序)

#### 创建时

1. **constructor()** ——>
2. **render()** ——>
3. **componentDidMount()**

```jsx
class Demo extends React.Component {
  constructor(){
    super()
    console.log("constructor");
  }

  render() {
    console.log('render');
    return (
      <div></div>
    )
  }

  componentDidMount(){
    console.log('componentDieMount');
  }
}
```

```js
/*
	constructor
  render
	componentDieMount
*/
```

- **constructor构造器函数**：

  初始化创建组件时被自动调用

  - 用于初始化组件状态state
  - 为组件内事件绑定this的指向 [详见this指向]()

- **render：**

  每次组件渲染时都会自动触发

  - 仅用来渲染页面UI

- **componentDidMount**

  组件挂载完毕时（DMO渲染结束时）自动调用

  - 用于发送Ajax请求
  - 进行DOM操作，仅在此时可获取页面DMO元素





#### 更新时

1. **render** ——>
2. **componentDidMount**
3. **render** \* N

```jsx
class Demo extends React.Component {

  state = { num: 0 }
  update = () => {
    this.setState({
      num: this.state.num + 1
    })
  }

  render() {
    console.log('render');
    return (
      <button onClick={this.update}>更新</button>
    )
  }

  componentDidMount() {
    console.log('componentDieMount');
  }
}
```

```js
/*
	render
	componentDieMount
	render （只要触发更新状态就调用）
*/
```

- **render：**

  出了组件刚创建时，只要数据更新也会调用

  每次组件渲染时都会自动触发

- **componentDidMount**

  组件挂载完毕时（DMO渲染结束时）自动调用

  - 用于发送Ajax请求

  - 进行DOM操作，仅在此时可获取页面DMO元素

    

#### 卸载时

**componentWillUnmount**

- 执行清理工作，比如清理定时器











两个组件的相似功能

将两个组件的共同内容抽离到一个公共函数

## render-props

1. 抽离公共状态
2. 抽离公共UI

```jsx
<组件
  	render={ (公共状态) => (
  		使用了公共状态的公共JSX结构
  	)}
/>
```









## 高阶组件

https://www.bilibili.com/video/BV1gh411U7JD?p=70&spm_id_from=pageDriver

HOC









##  Fragment

因为 JSX 语法的要求，render返回值的 JSX结构 都必须包裹在一个容器之中，但这样以来会导致页面渲染出过多没有任何意义的标签，导致层级过深。所以，可以导入**Fragment（碎片）**代替包裹的容器，页面渲染解析时，会丢掉这个 Fragment，减少过多没意义的层级

( Fragment在遍历时也可加上唯一标识 key属性 )

```jsx
import React, { Fragment } from 'react';

class Demo extends Component {
    render() {
        return (
            <Fragment >
               <div>Hello</div>
            </Fragment >
        )
    }
}

function Demo2(){
  return (
    	<Fragment >
      		<div>Hello</div>
       </Fragment >
  )
}
```

