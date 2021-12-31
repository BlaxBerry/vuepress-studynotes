# Vue2 基础

![](https://www.ahomtech.com/wp-content/uploads/2019/01/VUE.JS-1024x341.jpg)

[[toc]]

## Why Vue.js

- 渐进式框架，Vue 核心库 + 按需引入各式各样的插件库

- 声明式编码，无需直接操作 DOM

- 组件化模式，提高代码复用率

- 虚拟 DOM + Diff 算法，复用 DOM 节点

## 环境搭建

### 安装

- CDN 引入开发版 Vue
- Vue-Cli 脚手架安装（常用）

### 消除 Vue 版本提示

`<script></script>`标签引入或者 Vue-Cli 脚手架都会提示：

::: warning 现在是开发版的 Vue，上线时要用生产版 Vue
You are running Vue in development mode.
Make sure to turn on production mode when deploying for production.See more tips at https://vuejs.org/guide/deployment.html
:::

可以通过添加如下配置消除提示

```js
Vue.config.productionTip = false;
```

CDN 引入的场合（了解即可，一般是脚手架开发）

```html
<script type="text/javascript">
  Vue.config.productionTip = false;
</script>
```

脚手架的**main.js**中：

```js
import Vue from "vue";
import App from "./App.vue";
import store from "./store";

Vue.config.productionTip = false;

new Vue({
  store,
  render: (h) => h(App),
}).$mount("#app");
```

## MVVM

Vue 没有完全遵循 MVM 模型，是参考

::: tip MVVM（M<small>odel</small> - V<small>iew</small> - V<small>iew</small>M<small>odel</small>）

- <b>Model：</b>模型（data 数据）

- <b>View：</b>视图（template 模版）

- <b>ViewModel：</b>视图模型（Vue 实例对象）
  :::

---

template 模版中使用的 data 数据实质上是来自于 Vue 实例

---

Vue 实例进行 DOM 监听(DOM Listrners) 数据绑定(Data Bindings)

Vue.use() 实际是定义到了在了 Vue 实例的原型链上

### Vue 实例

Vue 实例的原型链上除了定义在模型 data 中的数据，

还有$chidlren、$parent、\$route 等

```vue
<template>
  <div></div>
</template>

<script>
export default {
  name: "App",
  created() {
    console.log(this);
  },
};
</script>
```

```json
{
  $attrs: {},
  $children: [],
  $parents: [],
  $el: {},
  $refs: {},
  $store: {}
  $route,
  $router,
  ...
}
```

### data 数据

模型 data 中的数据都被定义在了 Vue 实例上，作为 Vue 实例的属性

在 Vue 实例管理的函数中可通过`this.data中数据名`直接获取，详见[methods](###methods属性)

data 模型有两种写法：

- 对象形式

  ```html
  <script>
    new Vue({
      el: "#App",
      data: {
        msg: "hello",
      },
    });
  </script>
  ```

- 函数形式

  ```html
  <script>
    new Vue({
      el: "#App",
      data() {
        return {
          msg: "hello",
        };
      },
    });
  </script>
  ```

  1. 组件开发时，组件中的 data 必须写成函数式，否则报错

     > `data` property in component must be a function

  2. 若使用了**箭头函数**，

     会导致 data 的调用者 this 不再是 Vue 实例对象

     在脚手架中一般没问题且更简洁

     ```js
     data: () => ({
       msg: "hello",
     });
     ```

     但某些插件会因为调用者不是 Vue 实例而导致报错

### 模版

在脚手架中即 `template标签` 中的内容

template 模版中可直接获取 Vue 实例上所有属性与属性方法

```vue
<template>
  <div>{{ $route }}</div>
</template>

<script>
export default {
  name: "App",
};
</script>
```

**Vue2**要求`template标签`必须有一个根标签，否则报错

```js
error  The template root requires exactly one element
```

## 模版语法与指令

- 插值语法：

  - **{{** &nbsp; **}}**

- 指令语法 :
  - **v-bind:属性=""**
  - **v-text=""**
  - **v-html=""**

### {{}}

绑定数据到模版的标签体内容

```vue
<标签>{{ data中数据 }}</标签>
```

只能写入 JavaScript 表达式（有返回值）

```vue
<div>
  {{ name.toUpperCase() }}
  {{ 1 + 1 }}
  {{ flag ?  100 : 200 }}
</div>
```

**Vue 风格要求简洁，复杂逻辑的表达式要用 [计算属性](##computed计算属性)**

```vue
<div>
  {{ arr.split('').reverse().join('') }}
</div>
```

### v-bind：

单项绑定数据到模版的**标签属性**

```vue
<div v-bind:标签属性="data中数据"></div>
<!--可简写：-->
<div :标签属性="data中数据"></div>
```

如下：

```vue
<a v-bind:href="data中数据"></a>
<div v-bind:attr="data中数据"></div>
<img v-bind:src="data中数据" />
<!--可简写：-->
<a :href="data中数据"></a>
<div :attr="data中数据.toUperCase()"></div>
<img :src="data中数据" />
```

### v-text

将 data 数据解析为字符串的文本内容，然后插入标签

仅放入文本内容，不能像插值语法 `{{}}` 一样进行处理操作

```vue
<div v-text="data数据" />
```

### v-html

将 data 数据解析为对应 HTML 结构，然后插入标签

但是不要随意使用，在网站上动态渲染 HTML 有安全性问题，容易导致**XSS 攻击**，永远不要做用户提交内容上使用`v-html`

```vue
<div v-html="“data数据”" />
```

### v-cloak

```vue
<div v-cloak>{{ 数据 }}</div>
```

不会显示，直到编译结束

解决网速过慢导致的没有解析的数据被渲染到页面

### v-once

```vue
<div v-once>{{ 数据 }}</div>
```

`v-once`所在的节点在初次动态渲染后变倍事做静态内容。

即只渲染元素和组件**一次**。

后续的数据更新不会引`v-once`所在的节点的更新渲染

### v-pre

```vue
<div v-pre>静态数据</div>
```

使 Vue 跳过对含有`v-pre`所在的节点的编译，加快编译速度

可用于跳过没有 `v-`指令语法和插值`{{}}` 语法的节点。

## 数据绑定

- **单项数据绑定：v-bind：**

  模版中修改数据并不会修改 data 中的数据

- **双向数据绑定：v-model：**

  修改表单数据后 data 数据也改变

  仅用于输入类**表单元素**的双向数据绑定

### v-bind：

> 如下：改变<input/\>表单输入内容，但<p\></p\>内容不变

```vue
<template>
  <div id="app">
    <input type="text" :value="val" />
    <p>{{ val }}</p>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      val: "hello",
    };
  },
};
</script>
```

### v-model：

双向绑定数据到模版

仅用于有输入值 value 的 form 表单类元素

```vue
<input v-model:value="data中数据" />
<!--可简写：-->
<input v-model="data中数据" />
```

```vue
<template>
  <div id="app">
    <input type="text" :value="val" />
    <p>{{ val }}</p>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      val: "hello",
    };
  },
};
</script>
```

> VSCode 中，**vetur 的插件**会对 v-model:value="" 的写法报错：
>
> **v-model’ directives require no argument**
>
> 是因为 ESLint 对 vetur 进行了检查，关闭 ESLlint 对该插件检查即可

### v-model 修饰符

- **.number**

  输入的数字字符串 value 转为数字

- **.trim**

  去除输入的 value 首位空格

- **.lazy**

  表单失去焦点后再获取 value

```vue
<input v-model.number="数据"/ > <input v-model.trim="数据"/ > <input
v-model.lazy="数据"/ >
```

### v-model 收集表单数据

- **文本框**

`v-model`默认是获取输入框的 value 值

```vue
<input type="text" />
```

- **单选框**

`v-model` 获取的是 value 值

```vue
<input type="radio" />
```

- **多选框**

若动态绑定一绑定数组：`v-model`获取多个选项的 value 值组成的数组

若动态绑定一个布尔值：`v-model` 获取的是 checked 属性

```vue
<input type="checkbox" /> <input type="checkbox" />
```

- **下拉框**

```vue
<select v-model="数据">
  <option value="">请选择</option>
  <option value="北京">北京</option>
  <option value="上海">上海</option>
</select>
```

> 如下：
>
> ```vue
> <template>
>   <form @submit.prevent="handle">
>     账号: <input type="text" v-model.trim="form.name" /> 密码:
>     <input type="password" v-model.trim="form.password" /> 年龄:
>     <input type="text" v-model.number="form.age" />
>
>     性别: 男<input type="radio" name="sex" v-model="form.sex" value="male" />
>     女<input type="radio" name="sex" v-model="form.sex" value="female" />
>
>     爱好: 抽烟<input type="checkbox" v-model="form.hobby" value="抽烟" />
>     喝酒<input type="checkbox" v-model="form.hobby" value="喝酒" />
>
>     地区:
>     <select v-model="form.area">
>       <option value="">请选择</option>
>       <option value="北京">北京</option>
>       <option value="上海">上海</option>
>     </select>
>
>     其他:
>     <textarea v-model="form.info"></textarea><br />
>
>     <input type="checkbox" checked v-model="form.check" />确认
>
>     <button>提交</button>
>   </form>
> </template>
>
> <script>
> export default {
>   data: () => ({
>     form: {
>       name: "",
>       password: "",
>       age: "",
>       sex: "male",
>       hobby: [],
>       area: "",
>       info: "",
>       check: "",
>     },
>   }),
>   methods: {
>     handle() {
>       console.log(this.form);
>     },
>   },
> };
> </script>
> ```

## 事件处理

### methods 属性

method 属性中的方法都定义在了 Vue 实例上，

方法实际是由 Vue 实例对象（脚手架场合是组件实例对象）调用，

method 中的方法**不能是箭头函数**，否则调用者 this 就不是 Vue 实例对象了

```js
methods: {
  click:()=>{
      console.log(this); // CDN场合是window，脚手架场合是undefined
      console.log(this.person); // 找不到报错
    },
},
```

---

#### 获取 data 中数据

data 中的数据都被定义在了 Vue 实例上，作为 Vue 实例的属性

可通过`this.data中数据名`直接获取

```vue
<template>
  <button @click="click">Clik</button>
</template>

<script>
export default {
  data() {
    return {
      person: {
        name: "andy",
        age: 28,
      },
    };
  },
  methods: {
    click() {
      console.log(this.person);
    },
  },
};
</script>
```

---

#### 获取对象

method 属性中的方法都定义在了 Vue 实例上，作为 Vue 实例的属性

可通过`this.方法名`直接获取

```vue
<template>
  <button @click="click">Clik</button>
</template>

<script>
export default {
  methods: {
    click() {
      this.show();
    },
    show() {
      console.log("hello");
    },
  },
};
</script>
```

### 事件绑定 v-on: / @

```vue
<div v-on:事件名="method中的函数;"></div>
<!-- 简写 -->
<div @事件名="method中的函数;"></div>

<!-- 传参 -->
<div @事件名="method中的函数(参数)"></div>
```

```vue
<script>
export default {
  methods: {
    方法(参数) {},
  },
};
</script>
```

### 事件对象 event

事件对象不用声明，方法内可直接通过参数获取

```vue
<div v-on:click="方法函数;"></div>
```

```vue
<script>
export default {
  methods: {
    方法(event) {
      console.log(event.target);
    },
  },
};
</script>
```

> 如下，阻止默认行为，阻止连接标签跳转

```vue
<template>
  <div>
    <a href="https://www.baidu.com/" @click="click">
      Badidu
    </a>
  </div>
</template>

<script>
export default {
  methods: {
    click(event) {
      event.preventDefault();
    },
  },
};
</script>
```

### **\$event**

若方法**同时需要参数和事件对象 event**

可使用占位符 **\$event**获取事件对象

```vue
<div v-on:click="方法(参数, $event)"></div>
<!-- $event的顺序无所谓 -->
<div v-on:click="方法($event, 参数)"></div>
```

```vue
<template>
  <button @click="click($event, 1, 2, 3)">
    Clik
  </button>
</template>

<script>
export default {
  methods: {
    click(event, a, b, c) {
      console.log(event); // 事件对象
      console.log(a, b, c); // 1,2,3
    },
  },
};
</script>
```

### 事件修饰符

```vue
<div @事件.事件修饰符="事件名;"></div>
```

| 常用事件修饰符 |      含义      |
| :------------: | :------------: |
|  **prevent**   |  阻止默认事件  |
|    **stop**    |  阻止事件冒泡  |
|    **once**    | 事件只触发一次 |

> 如下，阻止标签默认行为

```vue
<template>
  <a href="https://www.baidu.com/" @click.prevent="click">
    Badidu
  </a>
</template>
```

修饰符也可连用

```vue
<div @事件.事件修饰符.事件修饰符="事件名;"></div>
```

```vue
<div @click.stop.prevent="事件名;"></div>
```

### 按键修饰符

对于判断按键以前是通过事件对象的 keyCode

Vue 提供了按键修饰符，即常用按键的别名

用来简化对键盘事件按键的判断

> keydown
>
> keyup（常用）

| 常用按键修饰符 | 代表按键 |
| :------------: | :------: |
|     enter      |   回车   |
|     delete     |   删除   |
|     space      |   空格   |
|      esc       |   退出   |
|      tab       |   换行   |
|       up       |  箭头上  |
|      down      |  箭头下  |
|      left      |  箭头左  |
|     right      |  箭头右  |

- 未提供的按键仍需要通过事件对象的 keyCode 判断

- 特殊键不适合 keyup 应用 keydown 事件：

  - Tab 键：用于切换对象的
  - 系统修饰键：ctrl、shift、alt、meta

- 系统修饰键与其他键同时按的场合

  ```vue
  @key.系统修饰键.其他键 = “事件”
  ```

  > 如下，ctrl + y 触发事件

  ```vue
  <input type="text" @keyup.ctrl.y="handle" />
  ```

- 其余详见官方文档 [系统修饰键](https://cn.vuejs.org/v2/guide/events.html#系统修饰键)

> 如下，通过事件对象的 keyCode 判断按键

```vue
<template>
  <input type="text" @keyup="handle" />
</template>

<script>
export default {
  methods: {
    handle(event) {
      if (event.keyCode === 13) {
        // Enter
        console.log("hello");
      }
    },
  },
};
</script>
```

> 如下，通过按键修饰符判断按键

```vue
<template>
  <input type="text" @keyup.enter="handle" />
</template>

<script>
export default {
  methods: {
    handle() {
      console.log("hello");
    },
  },
};
</script>
```

## computed 计算属性

### 为何使用计算属性

在模板中不要放入太多的逻辑，虽然不报错但是这样违背了 [Vue 的风格](https://cn.vuejs.org/v2/style-guide/#%E6%A8%A1%E6%9D%BF%E4%B8%AD%E7%AE%80%E5%8D%95%E7%9A%84%E8%A1%A8%E8%BE%BE%E5%BC%8F%E5%BC%BA%E7%83%88%E6%8E%A8%E8%8D%90)

Vue 开发风格要求对于任何复杂逻辑都应当使用计算属性，如下：

```vue
<div>
  {{ arr.split('').reverse().join('') }}
</div>
```

### 注意点

data 属性中存放普通数据，computed 属性中存放逻辑计算后的属性

**计算属性是将已有的数据计算处理后获取，若想修改必须通过[计算属性的 set](####set)来修改其所依赖的数据，从而实现最终修改计算属性**（一般是 data 中的数据）

Vue 自动执行了[计算属性的 get](####get)，将 get**处理结果的返回值**作为属性存到了 Vue 实例对象上，计算属性直接从 Vue 实例上读取即可，`计算属性.get`这种写法是错误的会报错

### 完整写法

computed 要写成对象形式，包含**get 函数**和**set 函数**

因为是 Vue 实例对象调用 get 和 set，所以不能用箭头函数因为会改变 this

- 通过 get 获取逻辑处理的结果

- 通过 set 修改计算属性的结果

```js
export default {
  data() {
    return {
      一般属性: 值,
    };
  },
  computed: {
    计算属性: {
      get() {
        // console.log(this); // Vue实例对象
        // 对 this.一般属性 的最终逻辑处理
        return 处理结果;
      },
      set(val) {
        // console.log(val); // 新值
        // 将val处理后赋值给计算属性所以依赖的data属性，来实现该修改计算属性
      },
    },
  },
};
```

---

#### get

- 只有**模版第一次读取计算属性**和**所依赖的 data 属性变化时**才会调用 get

- get 将逻辑处理后的返回值作为**缓存**，后续模版再读取该计算属性时 Vue 不会再调用 get，而是直接从缓存获取

- get 中的 this 指向 Vue 实例对象

---

#### set

- 计算属性的 set 不是必须的，可以不写

- 仅在**该计算属性被修改时**才调用 set

- set 中的 this 指向 Vue 实例对象

- set 有一个参数，是修改后的新值

- **计算属性是将已有的数据进行计算处理后获取的，其值取决于已有的数据**（一般是 data 中的数据）只有修改了其所依赖的数据了才会修改该计算属性

  所以 set 的参数常用于重新赋值给计算属性依赖的 data 属性中的数据

> 如下，表单双向绑定计算属性，获取每次新输入的值并进行处理，最后赋值给计算属性 fullName 所依赖的 data 中的数据，从而修改改计算属性
>
> ```vue
> <template>
>   <div>
>     姓: <input type="text" v-model="firstName" /><br />
>     名: <input type="text" v-model="lastName" /><br />
>     全: <input v-model="fullName" />
>   </div>
> </template>
>
> <script>
> export default {
>   name: "App",
>   data: () => ({
>     firstName: "Blax",
>     lastName: "Berry",
>   }),
>   computed: {
>     fullName: {
>       get() {
>         return this.firstName + "・" + this.lastName;
>       },
>       set(val) {
>         const arr = val.split("・");
>         this.firstName = arr[0];
>         this.lastName = arr[1];
>         console.log(this.fullName);
>       },
>     },
>   },
> };
> </script>
> ```

### 省略写法

一般情况，计算属性都是用于计算处理数据，并将的结果渲染到页面

set 不是必须，若仅是获取处理结果可简写为一个函数形式

Vue 自动执行了该函数，并将**处理结果的返回值**作为属性存到了 Vue 实例对象上

直接从 Vue 实例上读取即可

```js
export default {
  data() {
    return {
      一般属性: 值,
    };
  },
  computed: {
    计算属性: function() {
      return 逻辑计算后的结果;
    },
  },
};
```

### 例子

> 下例建议比较[watch 监听属性](##watch监听属性)查看

```vue
<template>
  <div>
    姓: <input v-model="firstName" /><br />
    名: <input v-model="lastName" /><br />
    全: <span>{{ fullName }}</span>
  </div>
</template>

<script>
export default {
  name: "App",
  data: () => ({
    firstName: "Blax",
    lastName: "Berry",
  }),
  computed: {
    fullName: function() {
      return this.firstName.substr(0, 1) + "・" + this.lastName.substr(0, 1);
    },
  },
};
</script>
```

> 上述例子，若不用 computed 的话，可通过下面两种不推荐的方式：
>
> - 插值语法 {{ }} 中直接操作表达式（模版不清晰不推荐）
>
> ```vue
> <template>
>   <div>
>     姓: <input v-model="firstName" /><br />
>     名: <input v-model="lastName" /><br />
>     全: <span>{{ firstName.substr(0, 1) }}・{{ lastName.substr(0, 1) }}</span>
>   </div>
> </template>
> ```
>
> - 调用 methods 方法直接获取 return 返回值（没走缓存，会多次调用，效率低不推荐）
>
> ```vue
> <template>
>   <div>
>     姓: <input v-model="firstName" /><br />
>     名: <input v-model="lastName" /><br />
>     <span>{{ getFullName() }}</span>
>   </div>
> </template>
>
> <script>
> export default {
>   name: "App",
>   data: () => ({
>     firstName: "Blax",
>     lastName: "Berry",
>   }),
>   methods: {
>     getFullName() {
>       return this.firstName.substr(0, 1) + "・" + this.lastName.substr(0, 1);
>     },
>   },
> };
> </script>
> ```

### 常见用途

计算属性非常强大，不需要像 watch 一样去监视数据，而是将数据作为计算的参与者，数据变化理所当然最终计算的结果也会变化。

计算属性还常用于：

- [列表过滤](###过滤列表数据)
- [列表排序](###排序列表数据Ï)

## watch 监听属性

用于监视某一个数据的变化，在数据变化时执行**异步**，或开销较大的操作。

### 标准写法

watch 属性是个配置对象

```js
export default {
  data: () => ({
    目标属性: 值,
  }),

  watch: {
    目标属性: {
      handler(newVal, oldVal) {
        // newVal：目标属性变化前的值
        // oldVal：目标属性变化后的值（可省略）
      },
    },
  },
};
```

- 当要监视的数据发生变化时，Vue 实例就调用 handler 函数。

- handle 中的 this 指向 Vue 实例对象。不能使用箭头函数。

- handler 有两个参数 `newVal` 和 `OldVal`，分别获取监视的属性变化前后的值，第二个参数`OldVal`可省略

### 监听多层级数据

#### 监听对象中某一个属性的变化

若想监听 data 属性中对象数据中的某一属性的变化，直接监听`对象.属性`即可。

```js
watch:{
  '对象.属性':{
    handler(val){ }
  }
}
```

```vue
<template>
  <div>
    <h3>{{ person.score }}</h3>
    <button @click="person.score++">切换</button>
  </div>
</template>

<script>
export default {
  data: () => ({
    person: {
      name: "andy",
    },
  }),

  watch: {
    "person.score": {
      handler(val) {
        console.log(val);
      },
    },
  },
};
</script>
```

---

#### 监听对象内部所有属性的变化

监听属性 watch 默认不监视多级结构数据内部的属性的变化

若想监听整个对象并该对象中任意一个属性变化时都可调用 handler，

则需要**深度监听**

> 因为修改对象的属性不会修改其在内存中的值，
>
> 监听器默认监视 data 中的对象数据的地址，地址不变则不算改变，
>
> 所以**仅对象中的属性改变并不会触发监听对整个对象的 handler。**
>
> **但若是直接替换对象，则 watch 可以监听到变化。**

### 深度监视 deep

为了效率默认不开启深度监视，需要手动开启。

deep 配置项用于开启**深度监视**，听可监听到对象、数组的内部值的变化。

开启 **`deep:true`** 之后，监听的整个对象中任意一个属性变化都会调用监听该对象的 handler。

深度监听虽然可以监听到对象的变化，但无法监听到具体对象里面哪个属性的变化

```vue
<template>
  <div>
    <h3>{{ obj.a }}</h3>
    <button @click="obj.a++">切换</button>

    <h3>{{ obj.b }}</h3>
    <button @click="obj.b++">切换</button>
  </div>
</template>

<script>
export default {
  data: () => ({
    obj: {
      a: 0,
      b: 10,
    },
  }),

  watch: {
    obj: {
      deep: true,
      handler(val) {
        console.log(val);
      },
    },
  },
};
</script>
```

### 立即监视 immdeiate

immdeiate 配置项用于开启立即监视。

若配置了 **`immediate:true`** 则在初始化时就调用 handler 监听目标数据。

此时 `oldVal` 为 **undefined**，因为数据一开始没有变化不存在变化前的状态。

```js
watch: {
  目标属性: {
    immediate: true, // 初始化时调用handler
    handler(newVal,oldVal){
    	// 处理
    }
  }
}
```

### 省略写法

当 watch 配置项中只有 handler 时，可使用简写形式。

若需要 immediate、deep 等其他配置项，则不能使用简写形式

```js
watch: {
  目标属性: function(val){ }
}
```

### watch 与 computed

- computed 计算属性能做的 watch 监听属性都可以做

- 但是[异步操作](####watch可处理异步)，,watch 可以，computed 不行

  > 计算属性是一个 return 的返回结果，里面无法使用异步。
  >
  > 监听属性是需要手动处理变化的值，是可以进行异步操作。

---

#### watch 会被滥用

**数据需要随着其它多个数据的变动而变动** 的场合，

建议用 computed 计算属性，

因为 watch 需要监听多个数据容易被滥用导致效率低下，

> 如下：FullName 案例
>
> - computed 计算属性：
>
>   计算属性的结果取决于其所依赖的已存在的数据
>
>   相见上文[computed 计算属性](##computed计算属性)
>
> ```vue
> <template>
>   <div>
>     姓: <input v-model="firstName" /><br />
>     名: <input v-model="lastName" /><br />
>     <span>{{ fullName }}</span>
>   </div>
> </template>
>
> <script>
> export default {
>   data: () => ({
>     firstName: "Blax",
>     lastName: "Berry",
>   }),
>   computed: {
>     fullName: function() {
>       return this.firstName + "・" + this.lastName;
>     },
>   },
> };
> </script>
> ```
>
> - watch 监听属性：
>
>   需要监听每一个依赖的 data 数据的变化，导致多次书写
>
> ```vue
> <template>
>   <div>
>     姓: <input v-model="firstName" /><br />
>     名: <input v-model="lastName" /><br />
>     <span>{{ fullName }}</span>
>   </div>
> </template>
>
> <script>
> export default {
>   data: () => ({
>     firstName: "Blax",
>     lastName: "Berry",
>     fullName: "Blax・Berry",
>   }),
>   watch: {
>     firstName: function(val) {
>       this.fullName = val + "・" + this.lastName;
>     },
>     lastName: function(val) {
>       this.fullName = this.lastName + "・" + val;
>     },
>   },
> };
> </script>
> ```

---

#### watch 可处理异步

**当某个数据变化时执行异步任务的场合**，应当使用 watch 监听器

计算属性只是一个 return 的返回结果，里面无法使用异步。

```vue
<template>
  <div>
    <input type="text" v-model="val" />
    <p>{{ msg }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      val: "",
      msg: "",
    };
  },
  watch: {
    val() {
      this.msg = "connecting...";
      setTimeout(() => {
        this.msg = "find result!";
      }, 1000);
    },
  },
};
</script>
```

> 定时器要用箭头函数
>
> 定时器默认是浏览器调用，若不用箭头函数会导致 this 是 Vue 实例，从而无法通过 `this.属性`获取 Vue 实例上的数据

## 样式绑定

Vue 中的样式，无论类名 class 还是行内样式 style，

不变的样式直接写，会变化的样式动态绑定

### calss

#### 绑定静态样式

和 DOM 一样 class 类名写入 `class属性`

```vue
<div class="类名"></div>
```

> 如下：
>
> ```vue
> <template>
>   <div>
>     <p class="success">hello</p>
>     <p class="danger">hello</p>
>     <p class="primary">hello</p>
>   </div>
> </template>
>
> <script>
> import "./styles/index.css";
> export default {};
> </script>
>
> <style scoped>
> p {
>   padding: 1rem;
>   color: white;
> }
> </style>
> ```
>
> ```css
> .success {
>   background-color: green;
> }
> .danger {
>   background-color: red;
> }
> .primary {
>   background-color: blue;
> }
> ```

---

#### 绑定动态样式

静态样式直接类名写入 class，动态样式要通过 `v-bind:class`

```vue
<div v-bind:class="data中数据"></div>
<!-- 简写 -->
<div :class="data中数据"></div>
```

> 如下：点击切换指定 class 样式或指定的随机样式
>
> ```vue
> <template>
>   <div>
>     <p :class="color">hello</p>
>
>     <button @click="change('success')">success</button>
>     <button @click="change('danger')">danger</button>
>     <button @click="change('primary')">primary</button>
>     <button @click="changeRandom">random Color</button>
>   </div>
> </template>
>
> <script>
> import "./styles/index.css";
> export default {
>   data: () => ({
>     color: "success",
>   }),
>   methods: {
>     change(val) {
>       this.color = val;
>     },
>     changeRandom() {
>       const arr = ["success", "danger", "primary"];
>       let index = Math.floor(Math.random() * arr.length);
>       this.color = arr[index];
>     },
>   },
> };
> </script>
> ```
>
> ```css
> .success {
>   background-color: green;
> }
> .danger {
>   background-color: red;
> }
> .primary {
>   background-color: blue;
> }
> ```

---

#### 样式数组

```vue
<div :class="数组形式的数据"></div>
```

> 如下：
>
> ```vue
> <template>
>   <div>
>     <p :class="classArr">hello</p>
>   </div>
> </template>
>
> <script>
> import "./styles/index.css";
> export default {
>   data: () => ({
>     classArr: ["padding", "font", "bgkcolor"],
>   }),
> };
> </script>
> ```
>
> ```css
> .padding {
>   padding: 1rem;
> }
> .font {
>   color: white;
> }
> .bgkcolor {
>   background-color: teal;
> }
> ```

---

#### 样式对象

根据布尔值决定是否绑定该 class 类名

```vue
<div :class="{ class类名: 布尔值 }"></div>
```

> 如下：
>
> ```vue
> <template>
>   <div>
>     <p :class="{ success: isActive, normal: true }">
>       hello
>     </p>
>     <button @click="isActive = !isActive">
>       切换
>     </button>
>   </div>
> </template>
>
> <script>
> export default {
>   data: () => ({
>     isActive: true,
>   }),
> };
> </script>
>
> <style scoped>
> .normal {
>   padding: 1rem;
> }
> .success {
>   background-color: red;
> }
> </style>
> ```

但是直接在模版中写对象后导致结构混乱

一般是将 `:class=“对象”` 对象放入 data

> 如下：
>
> ```vue
> <template>
>   <p :class="obj">hello</p>
> </template>
>
> <script>
> export default {
>   data: () => ({
>     obj: {
>       success: true,
>       padding: true,
>     },
>   }),
> };
> </script>
>
> <style scoped>
> .normal {
>   padding: 1rem;
> }
> .success {
>   background-color: red;
> }
> </style>
> ```

### style

#### 绑定静态样式

```vue
<div style="驼峰样式属性: 值;"></div>
```

> 如下：
>
> ```vue
> <template>
>   <p style="padding: 1rem; backgroundColor: red;">
>     hello
>   </p>
> </template>
>
> <script>
> export default {};
> </script>
> ```

---

#### 绑定动态样式

以对象形象

```vue
<div :style="{ 驼峰样式属性: 值 }"></div>
```

> 如下：
>
> ```vue
> <template>
>   <div>
>     <p
>       :style="{
>         padding: paddingSize + 'rem',
>         backgroundColor: backgroundColor,
>       }"
>     >
>       hello
>     </p>
>   </div>
> </template>
>
> <script>
> export default {
>   data: () => ({
>     paddingSize: 1,
>     backgroundColor: "green",
>   }),
> };
> </script>
> ```

但是直接在模版中写对象后导致结构混乱

一般是将 `:style=“对象”` 的对象放入 data

> 如下：
>
> ```vue
> <template>
>   <div>
>     <p :style="obj">hello</p>
>   </div>
> </template>
>
> <script>
> export default {
>   data: () => ({
>     obj: {
>       padding: "1rem",
>       backgroundColor: "green",
>     },
>   }),
> };
> </script>
> ```

---

#### 样式数组

不常用

```vue
<div :style="[对象数据, 对象数据]"></div>
```

> 如下：
>
> ```vue
> <template>
>   <div>
>     <p :style="[styleObj1, styleObj2]">hello</p>
>   </div>
> </template>
>
> <script>
> export default {
>   data: () => ({
>     styleObj1: {
>       padding: "1rem",
>       backgroundColor: "green",
>     },
>     styleObj2: {
>       color: "white",
>       fontWeight: 700,
>     },
>   }),
> };
> </script>
> ```

## 条件渲染

### v-show

添加 `v-show=“false”` 的元素不在页面显示，但是节点还存在

底层是给元素添加 **`display: none;`** 行内样式 style

### v-if

添加 `v-if=“false”` 的元素直接删除 DOM 节点

### v-show 与 v-if

> **若非常频繁地切换**，建议使用 **`v-show`**
>
> `v-if` 不停的添加删除 DOM 节点，有过高的切换开销
>
> ---
>
> **若运行时条件很少改变**，建议使用 **`v-if`**
>
> `v-show` 初始会都渲染到页面，有更高的初始渲染开销

### v-else-if

必须紧跟 `v-if` ，否则不会被识别。

### v-else

必须紧跟 `v-if` ，否则不会被识别。

```vue
<template>
  <div>
    <h1 v-if="count == 1">No1</h1>
    <h1 v-if="count == 2">No2</h1>
    <h1 v-else>No3</h1>
    <button @click="count++">+1</button>
  </div>
</template>

<script>
export default {
  data: () => ({
    count: 1,
  }),

  watch: {
    count(val) {
      if (val > 3) this.count = 1;
    },
  },
};
</script>
```

### 条件渲染多个同级元素

```vue
<div v-if="isShow">1</div>
<div v-if="isShow">2</div>
<div v-sif="isShow">3</div>
<div v-if="isShow">4</div>
```

若需要条件渲染多个同级元素，为了节省代码

可使用 **`template`** 标签包裹同级元素们，

该 **`template`** 标签不会被渲染到页面，不会破坏页面结构

**只能与 `v-if` 配合使用**，不能用于 `v-show`

```vue
<template v-if="isShow">
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
</template>
```

## 列表渲染

### v-for

```vue
<ul>
  <li v-for="形参 in 列表数据" :key="唯一标识"></li>
</ul>
```

- key 是遍历生成的每一个节点的唯一标识

### 遍历数组

```vue
<template>
  <ul>
    <li v-for="item in list" :key="item.id">
      {{ item.name }} - {{ item.age }}
    </li>
  </ul>
</template>

<script>
export default {
  data: () => ({
    list: [
      { id: 1, name: "andy", age: 28 },
      { id: 2, name: "tom", age: 25 },
      { id: 3, name: "jack", age: 20 },
    ],
  }),
};
</script>
```

---

#### 二个参数

```vue
<ul>
  <li 
      v-for="(第一个参数, 第二个参数) in 数组" 
      :key="唯一标识">
  </li>
</ul>
```

- 第一个参数：数组的每一个元素
- 第二个参数：每一个元素的序号 index

### 遍历对象

#### 三个参数

```vue
<ul>
  <li 
      v-for="(第一个参数, 第二个参数, 第三个参数) in 对象" 
      :key="唯一标识">
  </li>
</ul>
```

- 第一个参数：对象的每一个属性值 val
- 第二个参数：对象的每一个属性 key
- 第二个参数：每一个属性序号 index

### 遍历字符串

不常用，了解即可

```vue
<ul>
  <li 
      v-for="(第一个参数, 第二个参数) in 字符串" 
      :key="index">
  </li>
</ul>
```

- 第一个参数：字符串的每一个字符
- 第二个参数：每一个字符的序号 index

### 遍历指定次数

不常用，多用于测试

```vue
<ul>
  <li 
      v-for="(item,index) in 指定次数象" 
      :key="index">
  </li>
</ul>
```

### key 原理

给遍历出的节点做一个唯一标识，多用 `id`

1. Vue 内部在遍历时根据 `key` 来生成 `Vnode(虚拟DOM)` ，然后渲染到页面

2. 如果出现数据更新，Vue 会再根据数据生成新的虚拟 DOM，

3. 然后将新生成的虚拟 DOM 和初始虚拟 DOM 进行比较，

4. 仅将不一致的地方渲染到页面

::: danger 注意
不建议使用 `index` 作为唯一标识 key

但是仅渲染列表，不考虑数据更新改变顺序的话，可以用 index
:::

::: tip 为什么不建议使用 index :

**1. 渲染效率低**

假设后期给列表追加新数据时，整个列表的 index 会全部变化，导致 Vue 在渲染时回全部重新渲染，明明只需要渲染新追加插队的数据，但是全部渲染了，会使得效率低下。

**2.真实 DOM 数据错乱**

新数据的顺序是插队时，特别是渲染出的节点包含有真实 DOM 时，

因为**Diff 算法比较的是内存中的虚拟 DOM**不是页面上的真实 DOM，

所以残存在页面真实 DOM 中的数据不会随着数据更新而渲染到新的位置上，于是出现真实 DOM 数据残留导致顺序错乱
:::

### 过滤列表数据

1. 获取输入关键词

2. 通过**计算属性**过滤列表，返回过滤结果

```vue
<template>
  <div>
    <input v-model="keyword" />
    <ul>
      <li v-for="item in resList" :key="item.id">
        {{ item.name }} {{ item.gender }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data: () => ({
    keyword: "",
    list: [
      { id: 1, name: "王老二", gender: "male" },
      { id: 2, name: "张老三", gender: "female" },
      { id: 3, name: "王老五", gender: "male" },
      { id: 4, name: "李老二", gender: "female" },
    ],
  }),
  computed: {
    resList() {
      return this.list.filter((item) => {
        return item.name.includes(this.keyword);
      });
    },
  },
};
</script>
```

> 为什么不建议用 watch:
>
> 避免数据越过滤越越少的错误
>
> 需要额外新增一个 date 列表，并通过 `immediate:true` 监视
>
> ```vue
> <template>
>   <div>
>     <input v-model="keyword" />
>     <ul>
>       <li v-for="item in resList" :key="item.id">
>         {{ item.name }} {{ item.gender }}
>       </li>
>     </ul>
>   </div>
> </template>
>
> <script>
> export default {
>   data: () => ({
>     keyword: "",
>     list: [
>       { id: 1, name: "王老二", gender: "male" },
>       { id: 2, name: "张老三", gender: "female" },
>       { id: 3, name: "王老五", gender: "male" },
>       { id: 4, name: "李老二", gender: "female" },
>     ],
>     resList: [],
>   }),
>   watch: {
>     keyword: {
>       immediate: true,
>       handler(val) {
>         this.resList = this.list.filter((item) => {
>           return item.name.includes(val);
>         });
>       },
>     },
>   },
> };
> </script>
> ```
>
> 综上，麻烦，
>
> 建议用计算属性 computed，方便代码少
>
> 计算属性只需返回计算的结果，输入值参与计算不需要监视变化

### 排序列表数据

列表排序和[列表过滤](###过滤列表数据)是紧密结合的

1. 需要一个数据存储排序的标准

2. 通过**计算属性**判断排序标准，返回排序结果

```vue
<template>
  <div>
    <input v-model="keyword" />
    <button @click="order = '原始顺序'">原始</button>
    <button @click="order = '升序'">升序</button>
    <button @click="order = '降序'">降序</button>
    <ul>
      <li v-for="item in resList" :key="item.id">
        {{ item.name }} {{ item.age }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data: () => ({
    keyword: "",
    list: [
      { id: 1, name: "王老二", age: 22 },
      { id: 2, name: "张老三", age: 20 },
      { id: 3, name: "王老五", age: 28 },
      { id: 4, name: "李老二", age: 26 },
    ],
    order: "原始顺序",
  }),
  computed: {
    resList() {
      let arr = this.list.filter((item) => {
        return item.name.includes(this.keyword);
      });

      if (this.order !== "原始顺序") {
        arr.sort((a, b) => {
          return this.order === "升序" ? a.age - b.age : b.age - a.age;
        });
      }

      return arr;
    },
  },
};
</script>
```

## filter 过滤器

用来特定格式化数据，对数据进行简单加工。比如时间、价格

不是必须要用，过于复杂的格式化建议 computed 处理

### 定义局部过滤器

通过 filters 配置项在 Vue 实例中定义

过滤器实际上是个函数。

```js
filters: {
  过滤器名(val){
     // val 是位于管道符前面进行处理的数据
    return 处理后的数据
  }
}
```

### 定义全局过滤器

```js
Vue.filters("过滤器名", function(val) {
  return 处理后的数据;
});
```

### 使用单个过滤器

在模版中通过 **管道符 `|`** 使用过滤器

```js
{{ 数据 ｜ 过滤器 }}
```

Vue 自动调用函数并将管道符前的数据作为参数传递

```vue
<template>
  <div>{{ price | priceFormater }}</div>
</template>

<script>
export default {
  data() {
    return {
      price: 100,
    };
  },
  filters: {
    formater1(val) {
      return val.toFixed(2) + " $";
    },
  },
};
</script>
```

### 串联多个过滤器

过滤器可以多个共用，按照前后顺序对数据进行过滤。

```vue
<template>
  <div>{{ price | formater1 | formater2 }}</div>
</template>

<script>
export default {
  data() {
    return {
      price: 100,
    };
  },
  filters: {
    formater1(val) {
      return val.toFixed(2);
    },
    formater2(val) {
      return val + " $";
    },
  },
};
</script>
```

## ref 属性

在 Vue 中直接操作 DOM 不符合前端框架数据驱动的思想

所以 Vue 提供了 ref 属性来**获取元素或组件的信息**（可视作 id 的代替者）

::: warning 操作 DOM，通过 ID 获取 DOM 节点信息（不推荐）

```vue
<template>
  <div>
    <div id="target">Hello</div>
    <button @click="getDOM">获取目标DOM</button>
  </div>
</template>

<script>
export default {
  methods: {
    getDOM() {
      console.log(document.getElementById("target"));
    },
  },
};
</script>
```

:::

### 标识目标

```vue
<div ref="自定义名"></div>

<组件 ref="自定义名"></组件>
```

::: tip ref 属性可标识一般元素标签或子组件：

- 绑定元素标签：获取的是**DOM 元素节点**

- 绑定组件：获取的是**组件实例对象**

:::

### 获取信息

标识的元素或组件的信息被存到了**父组件的实例对象**上

通过父组件的 `$refs` 对象获取表示的信息

```js
this.$refs.自定义名;
```

### 实例

因为可通过`ref` + `$refs`获取子组件的实例对象，

因此可直接调用子组件上的方法或获取数据

```vue
<template>
  <div>
    <div ref="td1">No1</div>
    <div ref="td2">No2</div>
    <Component ref="vc" />

    <button @click="getDOM">获取目标DOM</button>
    <button @click="childSay">调用子组件方法</button>
  </div>
</template>

<script>
import Component from "./components/Component.vue";
export default {
  components: { Component },

  methods: {
    getDOM() {
      console.log(this.$refs.td1);
      console.log(this.$refs.td2);
    },
    say() {
      this.$refs.vc.sayHello();
    },
  },
};
</script>
```

```vue
<template>
  <div>Child Component</div>
</template>

<script>
export default {
  methods: {
    sayHello() {
      console.log("hello");
    },
  },
};
</script>
```

## 生命周期（生命周期钩子）

[生命周期钩子 官方文档](https://cn.vuejs.org/v2/api/#%E9%80%89%E9%A1%B9-%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E9%92%A9%E5%AD%90)

![](https://v3.cn.vuejs.org/images/lifecycle.svg)

### created

Vue 在组件实创建完成后立即同步调用

- 发送 Ajax 网络的请求

### mounted

Vue 完成对模版的解析，并将真实 DOM 挂载到了页面时调用

- 开启定时器
- 发送 Ajax 网络的请求
- 订阅消息
- **访问页面 DOM 结构**
- 绑定自定义事件

### updated

Vue 在数据更改导致的虚拟 DOM 重新渲染和更新完毕后调用

### destoryed

Vue 在组件实例销毁后调用。

该钩子被调用后对应 Vue 实例的所有指令都被解绑，所有的事件监听器被移除，所有的子实例也都被销毁。

- 回收一些全局的变量、方法
- 关闭定时器 `clearInterval`
- 取消订阅消息
- 解绑自定义事件

## 数据代理

## 数据劫持

#### Object.defineProperty

添加属性和值到对象

```js
let 对象 = {
  属性: 属性值,
};
```

除了直接字面量定义外，还可使用更高级的 Object.defineProperty

1. 将数作为对象的属性据绑定对象的原型链上

```js
Object.defineProperty(目标对象, "属性名", {
  value: 属性值,
});
```

2. 比起直接定义到对象的方法，

   该绑定的属性不能被遍历，不能被修改，不能被删除

   还可定义更高级的配置项

- 若想能被遍历需要添加 enumerable 属性

```js
Object.defineProperty(目标对象, "属性名", {
  value: 属性值,
  enumerable: true,
});
```

- 若想能被修改需要添加 writable 属性

```js
Object.defineProperty(目标对象, "属性名", {
  value: 属性值,
  writable: true,
});
```

- 若想能被修改需要添加 configurable 属性

```js
Object.defineProperty(目标对象, "属性名", {
  value: 属性值,
  configurable: true,
});
```

-

```js
let num = 10;
let obj = {
  num: num,
};
// obj中的num在被定义时就固定了
// 不会因为后期num变量的修改而自动修改
// 若想自动获取最新值需要借助 Object.defineProperty 的getter函数
// 若想自动修改需要借助 Object.defineProperty 的setter函数
```

每次对象的属性被访问时，

自动调用 get 函数（getter）return 返回值，实现自动自动获取最新值

自动调用 set 函数（setter）重新赋值属性的值到对象上，实现自动修改

```js
Object.defineProperty(目标对象, '属性名', {

  get(){
    return 属性值
  }，

  set(value){
  	外部数据 = value
}


})
```
