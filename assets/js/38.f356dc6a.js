(window.webpackJsonp=window.webpackJsonp||[]).push([[38],{419:function(t,n,e){"use strict";e.r(n);var a=e(28),s=Object(a.a)({},(function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[e("h1",{attrs:{id:"hooks"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#hooks"}},[t._v("#")]),t._v(" Hooks")]),t._v(" "),e("p",[t._v("React16.8之前时，函数式组件因为没有this，只可以接收props，无法使用组件的state和生命周期函数，所以比起函数组件用的更多的是类组件")]),t._v(" "),e("p",[t._v("但，"),e("strong",[t._v("React16.8+ 提出了 Hooks")])]),t._v(" "),e("ul",[e("li",[t._v("State Hook")]),t._v(" "),e("li",[t._v("Effect Hook")]),t._v(" "),e("li",[t._v("Ref Hook")])]),t._v(" "),e("p",[t._v("使函数式组件也可以使用state状态和生命周期")]),t._v(" "),e("h2",{attrs:{id:"state-hook"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#state-hook"}},[t._v("#")]),t._v(" State Hook")]),t._v(" "),e("h3",{attrs:{id:"react-usestate"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#react-usestate"}},[t._v("#")]),t._v(" React.useState()")]),t._v(" "),e("p",[t._v("函数组件本没有状态state也无法修改状态")]),t._v(" "),e("p",[t._v("通过 React.useState()，使函数组件也拥有状态state也可修改该状态")]),t._v(" "),e("div",{staticClass:"language-react extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("function Demo(props){\n  \n  const [状态, 状态处理函数] = React.useSate(状态初始值)\n  \n  // 状态处理函数的使用\n  // 修改后的新状态不依赖原状态\n  function 方法(){\n    状态处理函数(新状态)\n  }\n  \n  // 状态处理函数使用\n  // 修改后的新状态依赖原状态\n  function 方法(){\n    状态处理函数((旧状态)=> {return 处理 旧状态 后的新状态})\n    // 简写\n    状态处理函数((旧状态)=> 处理 旧状态 后的新状态)\n  }\n  \n}\n")])])]),e("blockquote",[e("p",[t._v("State Hook 补充：")]),t._v(" "),e("p",[t._v("第一步调用useState()创建的状态会被缓存到函数内部,并不是每次函数调用都初始化状态,这是有React做的底层处理，后面可以放心使用")])]),t._v(" "),e("hr"),t._v(" "),e("h4",{attrs:{id:"例子"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#例子"}},[t._v("#")]),t._v(" 例子")]),t._v(" "),e("ul",[e("li",[t._v("修改后的新状态不依赖原状态")])]),t._v(" "),e("div",{staticClass:"language-react extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("import React from 'react'\nfunction FunComponent() {\n\n    const [name,setName] = React.useState('andy')\n\n    const changeName = () => { setName('Tom') }\n\n    return (\n        <div>\n            <h3>{name}</h3>\n            <button onClick={changeName}>改名</button>\n        </div>\n    )\n}\n")])])]),e("ul",[e("li",[t._v("修改后的新状态依赖原状态")])]),t._v(" "),e("div",{staticClass:"language-react extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("function FunComponent() {\n\n    const [num, setNum] = React.useState(10)\n\n    const addNum = () => {\n        setNum(num => num + 1)\n    }\n\n    return (\n        <div>\n            <h3>{num}</h3>\n            <button onClick={addNum}> +1 </button>\n\t\t\t\t</div>\n    )\n}\n")])])]),e("blockquote",[e("p",[t._v("对比类组件的state修改")]),t._v(" "),e("div",{staticClass:"language-react extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("class classComponent extends Component {\n    state = { num: 0, age: 20 }\n    addNum = () => {\n        this.setState({ num: this.state.num + 1 })\n    }\n    addAge = () =>{\n      \tthis.setState({age: this.state.age + 1})\n    }\n    render() {\n        return (\n            <div>\n                <h3>{this.state.num}</h3>\n                <button onClick={this.addNum}>\n                  num+1\n            \t\t</button>\n            \n            \t\t<h3>{this.state.age}</h3>\n            \t\t<button onClick={this.addAge}>\n                  age+1\n            \t\t</button>\n            </div>\n        )\n    }\n}\n")])])])]),t._v(" "),e("h2",{attrs:{id:"effect-hook"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#effect-hook"}},[t._v("#")]),t._v(" Effect Hook")]),t._v(" "),e("h3",{attrs:{id:"react-useeffect"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#react-useeffect"}},[t._v("#")]),t._v(" React.useEffect()")]),t._v(" "),e("p",[t._v("函数组件中本没有生命周期")]),t._v(" "),e("p",[t._v("使用React.useEffect()使函数组件可使用生命周期来发送Ajax和订阅发布")]),t._v(" "),e("p",[t._v("useEffect Hook可看作3个生命周期的综合：")]),t._v(" "),e("ul",[e("li",[e("strong",[t._v("componentDidMount")])]),t._v(" "),e("li",[t._v("componentDidUpdate")]),t._v(" "),e("li",[e("strong",[t._v("componentWillMount")])])]),t._v(" "),e("p",[t._v("可设定检查的状态来决定")]),t._v(" "),e("p",[t._v("是 "),e("strong",[t._v("componentDidMount")]),t._v(" 还是 componentDidUpdate")]),t._v(" "),e("div",{staticClass:"language-react extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("// 检测所有状态的改变\n// 除了组件加载时执行一次，后面只要有状态变化就执行\nReact.useEffect(() => {\n\tconsole.log('执行了');\n})\n\n// 谁都不检测，组件加载时也不执行\nReact.useEffect(() => {\n\tconsole.log('执行了');\n}, [])\n\n// 只检测指定状态\n// 除了组件加载时执行一次，后面只要指定状态改变时就执行\nReact.useEffect(() => {\n\tconsole.log('执行了');\n}, [指定状态])\n")])])]),e("p",[t._v("至于 "),e("strong",[t._v("componentWillMount")]),t._v("生命周期")]),t._v(" "),e("p",[t._v("需要让 React.useEffect() return 返回一个函数，")]),t._v(" "),e("p",[t._v("这个函数就相当于componentWillMount")]),t._v(" "),e("div",{staticClass:"language-js extra-class"},[e("pre",{pre:!0,attrs:{class:"language-js"}},[e("code",[t._v("React"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("useEffect")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\txxx"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  \n  "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    console"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'相当于componentDidMount生命周期'")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),e("p",[t._v("但是综上，虽然可以使函数组件使用生命周期，")]),t._v(" "),e("p",[t._v("但是看起来不是很直观，略显麻烦")]),t._v(" "),e("p",[t._v("至于生命周期还是建议类组件")]),t._v(" "),e("h4",{attrs:{id:"例子-2"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#例子-2"}},[t._v("#")]),t._v(" 例子")]),t._v(" "),e("p",[t._v("在函数组件，开启一个记时器，并设定在组件卸载后清除定时器")]),t._v(" "),e("p",[t._v("计时器是以自己为准，若不设定检测的状态，会因为其他状态state的数据有变化就重复调用，导致计时器以指数级别增加，所以不但要设定检查状态，还要设定为谁也不检测，即【】")]),t._v(" "),e("div",{staticClass:"language-react extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("import React from 'react'\nimport ReactDom from 'react-dom';\n\nfunction FunComponent() {\n    const [num, setNum] = React.useState(0)\n\n    React.useEffect(() => {\n      \n        let timer = setInterval(() => {\n            setNum(num => num + 1)\n        }, 1000);\n        return () => {\n            clearInterval(timer)\n        }\n    }, [])\n\n    const unmount = () => {\n        ReactDom.unmountComponentAtNode(document.getElementById('root'))\n    }\n\n    return (\n        <div>\n            <h3>{num}</h3>\n            <button onClick={unmount}>\n              卸载组件\n        \t\t</button>\n        </div>\n    )\n}\n")])])]),e("blockquote",[e("p",[t._v("对比类组件中，生命周期中的定时器控制状态自增长")]),t._v(" "),e("div",{staticClass:"language-react extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("import React, { Component } from 'react'\nimport ReactDom from 'react-dom';\n\nclass classComponent extends Component {\n    state = { num: 0 }\n\n    componentDidMount() {\n        this.timer = setInterval(() => {\n            this.setState({ num: this.state.num + 1 })\n        }, 1000);\n    }\n\n    componentWillUnmount(){clearInterval(this.timer)}\n\n    unmount(){\n        ReactDom.unmountComponentAtNode(document.getElementById('root'))\n    }\n\n    render() {\n        return (\n            <div>\n                <h3>{this.state.num}</h3>\n                <button onClick={this.unmount}>卸载组件</button>\n            </div>\n        )\n    }\n}\n")])])])]),t._v(" "),e("h2",{attrs:{id:"ref-hook"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#ref-hook"}},[t._v("#")]),t._v(" Ref Hook")]),t._v(" "),e("h3",{attrs:{id:"react-useref"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#react-useref"}},[t._v("#")]),t._v(" React.useRef()")]),t._v(" "),e("p",[t._v("通过Ref Hook 使函数组件可获取元素节点并非受控组件的方式操作元素上的数据，通过类似React.createRef()")]),t._v(" "),e("p",[t._v("如下：获取 input元素的value输入值")]),t._v(" "),e("div",{staticClass:"language-react extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v('function FunComponent() {\n\n    const myRef = React.useRef()\n\n    const show = () => {\n        console.log(myRef.current.value);\n    }\n\n    return (\n        <div>\n            <input type="text" ref={myRef} />\n            <button onClick={show}>show</button>\n        </div>\n    )\n}\n')])])]),e("blockquote",[e("p",[t._v("类比 类组件中的ref")]),t._v(" "),e("div",{staticClass:"language-react extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v('class classComponent extends Component {\n\n    myRef = React.createRef()\n\n    show = () => {\n        console.log(this.myRef.current.value);\n    }\n\n    render() {\n        return (\n            <div>\n                <input type="text" ref={this.myRef} />\n                <button onClick={this.show}>show</button>\n            </div>\n        )\n    }\n}\n')])])])])])}),[],!1,null,null,null);n.default=s.exports}}]);