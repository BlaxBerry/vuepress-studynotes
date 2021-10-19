#  React 基础

<img src="https://cdn-ssl-devio-img.classmethod.jp/wp-content/uploads/2019/07/react.jpg" style="zoom:50%;" />

[[toc]]



## 前提技术

React对Javascript基础要求高

- this指向

- class类

- ES6语法

- 原型、原型链

- 数组常用API

- 模块化

- npm包管理



## 优点

### 原生 JS 和 jQuery的缺点

- 命令式编程，逐步执行命令，书写代码量多

- 是通过**DOM-API**直接操作页面真实DOM

  频繁操作DOM会导致浏览器大量**重绘重排**，效率低下

- 数据更新后渲染页面是**全部替换**，

  即使只有一处修改低也是全部替换

- 没有组件化编码方案，代码复用率低

---

---

### React 优点

- 组件化开发

- 声明式编码

  仅仅需要获取请求操作数据，React自动操作DOM

---

- 可在**React Native**中进行移动端开发

  只通过React语法，而不是Javva、swift等

---

- 不直接操作页面DOM，而是使用**虚拟DOM**

- 通过**diffing算法**比较虚拟DOM和真实DOM

  仅渲染有差异的内容，并不是全部重新渲染

  尽量减少与DOM的交互，提高效率

- 只专注于将虚拟DOM数据渲染到HTML视图

---

---

### React高效的原因

- **虚拟DOM**

不总是直接操作页面中的真实的DOM

- **DOM Diffing算法**

比较虚拟DOM和真实DOM的差距，仅渲染差距给页面

最小化页面的重绘





## CDN引入 

学习期间使用引入文件到HTML的方法

需要的依赖包：

- react-development.js
- react-dom-developmeny.js
- babel.js
- prop-types.js

```jsx
<body>
  <!-- 创建容器 -->  
    <div id="root"></div>
  
   
  <!-- 1. 引入react核心库 -->
    <script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
    
  <!-- 2. 引入react-dom，操作DOM -->
    <script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
    
  <!-- 3. 引入babel 将JSX转为JS-->
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    
  <!-- 代码 type使用babel编译解析JSX -->
    <script type="text/babel">
        const VDOM= <h1>Hello React</h1>; 
        ReactDOM.render(VDOM,document.getElementById('root'))
    </script>

</body>
```





## 虚拟DOM

- 本质是个Object类型对象

- 只是在React中使用，不需要和真实DOM上那么多的属性

- 最终会被React转换为真实DOM，并渲染到页面上





## 为什么使用 JSX 语法

### 为什么不建议使用原生JS

在React中需要先创建虚拟DOM，然后再渲染

创建虚拟DOM时若使用原生JS，会导致代码量太多，太复杂

所以实际开发不会用

#### 原生JS创建虚拟DOM

需要通过`React.createElement()`创建虚拟DOM

```jsx
React.createElement(component, props, ...children)
```

繁琐，代码量太多

```jsx
<body>
  <!-- 创建容器 -->  
    <div id="root"></div>
  
  <!-- 1. 引入react核心库 -->
    <script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
  <!-- 2. 引入react-dom，操作DOM -->
    <script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
   
    <script type="text/javascript">
        const VDOM= React.createElement(
          'h1',
          {id:'title'},
          'Hello React'}
        );
        ReactDOM.render(VDOM,document.getElementById('root'))
    </script>

</body>
```

```js
const VDOM = React.createElement(
    'h1', 
    {
      id: 'title'
    },
    son);

ReactDOM.render(
    VDOM,
    document.getElementById('root')
)
```



#### 原生JS创建嵌套虚拟DOM

需要在子节点再创建虚拟DOM，繁琐

代码量太多

```js
const son = React.createElement(
    'span', 
    {},
    'Hello React 02');

const VDOM = React.createElement(
    'h1', 
    {
      id: 'title'
    },
    son);

ReactDOM.render(
    VDOM,
    document.getElementById('root')
)
```



### 使用JSX创建嵌套虚拟DOM

可以理解为原生JS的语法糖

```jsx
<body>
    <!-- 创建容器 -->
    <div id="root"></div>

    <!-- 1. 引入react核心库 -->
    <script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
    <!-- 2. 引入react-dom，操作DOM -->
    <script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
    <!-- 3. 引入babel 将JSX转为JS-->
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>

    <!-- 代码 type使用babel编译解析JSX -->
    <script type="text/babel">
    
        const VDOM= (
        	<div id="father">
            <div id="son">hello</div>
        	</div>
        ); 
        
        ReactDOM.render(VDOM,document.getElementById('root'))
    </script>

</body>
```









# JSX语法

JSX（JavaScript XML），即 JS + XML

React定义的一种类似XML的JS扩展

本质是`React.createElement()`方法的语法糖

定义虚拟DOM时有以下注意点：

- **在括号内直接定义**

建议用小括号包起 JSX结构

```jsx
const VDOM = (
  <div id="father">
    <div id="son">Hello React</div>
  </div>
)
```

- **虚拟DOM只能有一个根标签**

不能有多个同级

```jsx
const VDOM = (
  <div>
    <div></div>
    <div></div>
	</div>
); 
ReactDOM.render(VDOM, document.getElementById("root"));
```

- **标签必须闭合**

JSX中的虚拟DOM标签必须是闭合的，

如果是创建单标签，可以选择自闭合

若标签无子节点，也可自闭合

```jsx
const VDOM = (
  <div>
    <div></div>
    <div></div>
    <input/>
    
    <span/>
	</div>
); 
ReactDOM.render(VDOM, document.getElementById("root"));
```

- **JSX标签首字母大小写**

JSX并不是创建HTML标签，而是将虚拟DOM转换为HTML标签

- 若JSX标签的首字母是**小写**：

  - 转换为HTML标签的同名标签然后渲染页面

  - 若不存在该标签则报错

- 若JSX标签的首字母是**大写**：

  - 则被当作React组件然后渲染页面

  - 若不存在该组件则报错

```jsx
const VDOM = (
  <div>
    
    <div></div>
    
    <DIVComponent></DIVDIVComponent>
    
  </div>
)
```





## JSX - 嵌入

JSX语法不能直接使用JS语法，必须放入花括号 **{ }**

### JavaScript表达式

```jsx
const attrFather = "fatHER"
const attrSon = "sOn"
const content = 'Hello React'

const VDOM = (
  <div id={attrFather.toLowerCase()}>
    <div id={attrSon.toLowerCase()}> 
      {content}
    </div>
  </div>
)
```

可以嵌入JSX的 { } 的：

必须 **JS表达式** ，有一个结果返回值

但对象Object{} 例外，会报错，仅可用于style样式

```js
a
a + b
fun(a)
function fun(){}
a ？b : c
```

JSX本身也是个JS的表达式，也可以直接放入{ }

```jsx
const h1 = (
  <h1>I am h1</h1>
)

ReactDOM.render(
  <div>
    { h1 }
  </div>,
  document.getElementById('root')
)
```

- 不可以嵌入JSX的 { } 的：

  **JS语句**

```
if(){}
for(){}
switch(){case:XXX}
```



### JSX注释

因为JSX标签中混人 **JS表达式** 时必须使用花括号 **{}**

注释是JS的东西，所以必须也写入花括号 **{}**

```jsx
const VDOM =
	<div>
    {/*<div>我是注释</div>*/}
  </div>	
```



### 动态遍历数组

JSX创建虚拟DOM时，如果插入的JS表达式是个数组

React会自动把所有元素遍历出

```jsx
const data = ["Reacr", "Vue", "angular"]; 

ReactDOM.render(
  <div> {data} </div>,
document.getElementById('root')
```

```html
<div>
  "Reacr""Vue""angular"
</div>
```











## JSX - 条件渲染

根据特定条件判断是否渲染出指定的JSX结构，

比如，加载loading图标的现实与否

可使用：

- if...else

- 三元运算符
- 逻辑与运算符

如下：if...else：

```jsx
const loadingFun = (isLoading)=>{
  if(isLoading){
    return <img src="/loading.gif" alt="loading"/>
  }
  return <div>加载完成</div>
}


ReactDOM.render(
  <div>
    	
    	{loadingFun(true)}   {/* 加载中 */}
    
      {loadingFun(false)}   {/* 加载完成 */}
    
  </div>,
  document.getElementById('root')
)
```

如下：三元运算符：

```jsx
const loadingFun = (isLoading)=>{
  return ( 
    isLoading ? <img src="/loading.gif"/> : <div>加载完成</div> ;
)}


ReactDOM.render(
  <div>
    	
    	{loadingFun(true)}   {/* 加载中 */}
    
      {loadingFun(false)}   {/* 加载完成 */}
    
  </div>,
  document.getElementById('root')
)
```

如下：逻辑与运算符

但不能像上面那两个可以选择渲染哪一个JSX，

逻辑与运算符只能实现渲染JSX结构或不渲染

```jsx
const loadingFun = (isLoading)=>{
  return isLoading && <img src="/loading.gif"/>
}


ReactDOM.render(
  <div>
    	
    	{loadingFun(true)}   {/* 加载中 */}
    
      {loadingFun(false)}   {/* 加载完成 */}
    
  </div>,
  document.getElementById('root')
)
```

#### 实例：

```jsx
export default class List extends Component {

    state = {
        list: [
            { id: 1, name: 'adny', contnet: 'hello,iam andy' },
            { id: 2, name: 'tom', contnet: 'hello,iam tom' },
            { id: 3, name: 'lili', contnet: 'hello,iam lili' }
        ]
    }

    renderList = () => {
        return (
            this.state.list.length === 0
                ? ( <h3>没有评论...</h3> )
                : (
                    <ul>
                        {
                            this.state.list.map(item => (
                                <li key={item.id}>
                                    <h3>{item.name}</h3>
                                    <p>{item.contnet}</p>
                                </li>
                            ))
                        }
                    </ul>
                )
        )
    }

    render() {
        return (
            <div>
                { this.renderList() }
            </div>
        )
    }
}
```









## JSX - 列表渲染

渲染一组数据到页面（循环遍历）

需要通过数组的 **map()**

```jsx
const list = [
  { name: 'andy', age: 28 },
  { name: 'lili', age: 14 },
  { name: 'tom', age: 20 }
]


ReactDOM.render(
  <div>
    <ul>
      { 
        list.map( item => (
        	<li>{item.name} - {item.age}</li>
      	))
      }
    </ul>
  </div>,
  document.getElementById('root')
)
```

但是会报错，提示需要一个key属性来表示每一个子元素的唯一

```js
// Warning: Each child in a list should have a unique "key" prop.
```

React的Diffing算法靠这个**唯一的key属性**比较虚拟DOM

Vue中的v-for就是借鉴这一点

```jsx
const list = [
  { name: 'andy', age: 28 },
  { name: 'lili', age: 14 },
  { name: 'tom', age: 20 }
]


ReactDOM.render(
  <div>
    <ul>
      {
        list.map((item, index) => (
          <li key={index}>{item.name} - {item.age}</li>
      	))
      }
    </ul>
  </div>,
  document.getElementById('root')
)
```



### 为何使用map( )

JSX中{} 放入一个数组的话会自动遍历元素

map有一个return返回值返回一个新数组

可以利用这一特性**遍历**生成元素

可理解为简化版的 forEach() 拼接字符串（但是正经人不会用这个）

```jsx
const data = ["Reacr", "Vue", "angular"]; 

ReactDOM.render(
  <div> {data} </div>,
document.getElementById('root')
```

```html
<div>
  "Reacr""Vue""angular"
</div>
```









## Diffing算法

different

通过**diffing算法**比较虚拟DOM和真实DOM

仅渲染有差异的内容，并不是全部重新渲染

尽量减少与DOM的交互，提高效率

---

### key的作用

React遍历时的key是虚拟DOM的标识

只在Rae餐厅内部使用，不会显示在渲染后的页面中

state状态中的数据变化时，React会根据 新的数据生成新的虚拟DOM

然后React会将新的虚拟DOM和旧的虚拟DOM进行diff比较

- 旧虚拟DOM中找到了与新虚拟DOM相同的key

  - 若虚拟DOM内容没变，则还是使用旧的虚拟DOM
  - 若虚拟DOM内容改变，则使用新虚拟DOM替换页面中旧的真实DOM

- 旧虚拟DOM未找到与新虚拟DOM相同的key

  根据数据创建新的真实DOM，并渲染到页面

---

### index作为key会引发的问题

key必须要是唯一标识，比如id，最好不要用index

- 若是对数组进行：**逆序添加、顺序删除 **等 **破坏顺序的操作**

  使原本序号顺序变化而导致全部重新渲染，效率低下

- 若结构中包含 **输入类DOM**（表单）

  会因为虚拟DOM残留的信息错乱

  导致产生错误的DOM更新

若仅是简单展示数据，不存在数据顺序操作

index也会可以作为key属性的





## JSX - 样式处理

### 行内样式 style

不常用

```jsx
<div style={ 样式 }></div>
```

采用对象键值对形式添加样式

```jsx
<div style = {{
    key: value, 
    key: value
}}></div>
```

并需要驼峰命名法

```jsx
ReactDOM.render(
	<div style={{
      color: 'orangered',
      fontSize: '20px',
      backgroundColor: 'orange'}}>
    hello
  </div>,
  document.getElementById('root')
)
```



### 外联类名 className

更推荐使用className给JSX添加样式

标签中写入 CSS的class类名时使用 **className**

因为class是ES6中的类的关键字，为了避免使用关键字

样式可以通过引入 css文件的方式

```jsx
<div className=类名}></div>
```

并需要驼峰命名法

```jsx
import "./style/01.css";

ReactDOM.render(
  <div>
    <h1 className="red-text text-center">Hello</h1>
  </div>,
  document.getElementById('root')
)
```

