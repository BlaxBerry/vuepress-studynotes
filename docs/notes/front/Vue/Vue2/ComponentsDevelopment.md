# Vue2 + Vue-Cli 组件化开发

![](https://jp.vuejs.org/images/components.png)

[[toc]]

## 单文件组件

### 组件配置

详见 [Vue 组件命名规范](https://blaxberry.github.io/vuepress-studynotes/notes/Vue/extra-02.html#vue-%E7%BB%84%E4%BB%B6%E5%91%BD%E5%90%8D%E8%A7%84%E8%8C%83) 与 [官方风格指南](https://cn.vuejs.org/v2/style-guide/)

可通过 **`name 配置项`** 指定组件在**Vue 开发者工具**中显示的名字，name 尽量要与文件名一致

```vue
<template>
  <div>
    <!-- 模版 -->
  </div>
</template>

<script>
export default {
  name: "A",
  props: [],
  components: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {},
};
</script>

<style>
/* 样式 */
</style>
```

### 引入 与 使用组件

先`import`将子组件导入，再通过`components`配置项配置

```vue
<template>
  <div>
    <A />
    <B/ >
  </div>
</template>

<script>
import ComponentA from "./components/A.vue";
import ComponentB from "./components/B.vue";
export default {
  components: {
    A: ComponentA,
    B: ComponentB,
  },
};
</script>
```

ES6 的对象简写`components`配置项

```vue
<template>
  <div>
    <A />
    <B/ >
  </div>
</template>

<script>
import A from "./components/A.vue";
import B from "./components/B.vue";
export default {
  components: {
    A,
    B,
  },
};
</script>
```

模版中的组件可用 `双标签` 或 `自闭合标签`

但自闭合只能用于 Vue-Cli 脚手架中，脚手架建议使用自闭合标签

```vue
<template>
  <ComponentA></ComponentA>
  <!-- 或 -->
  <ComponentA />
</template>
```

### 样式覆盖 与 局部样式 scoped

CSS 样式有先后顺序，后面的覆盖前面的

子组件中的样式会覆盖前面导入的组件和父组件的样式

> 如下：后来者居上，
>
> 最后引入的 B 组件的样式覆盖了父组件和其余子组件
>
> ```vue
> <!-- 父组件 -->
> <template>
>   <div>
>     <A />
>     <B />
>     <h1>Father</h1>
>   </div>
> </template>
>
> <script>
> import A from "./components/A.vue";
> import B from "./components/B.vue";
>
> export default {
>   components: { A, B },
> };
> </script>
>
> <style>
> h1 {
>   background-color: red;
> }
> </style>
> ```
>
> ```vue
> <!-- 子组件 A -->
> <template>
>   <h1>A</h1>
> </template>
>
> <script>
> export default {};
> </script>
>
> <style>
> h1 {
>   background-color: yellow;
> }
> </style>
> ```
>
> ```vue
> <!-- 子组件 B -->
> <template>
>   <h1>B</h1>
> </template>
>
> <script>
> export default {};
> </script>
>
> <style>
> h1 {
>   background-color: blue;
> }
> </style>
> ```

解决方法是在 style 标签加上`scoped`，使其成为局部样式，仅在当前组件内生效，防止样式冲突

```vue
<style scoped>
/* 自己的局部样式 */
</style>
```

但是 App.vue 组件不适合，因为 App.vue 管理所有组件，一般是用来定义全局样式

## 组件间通信

### 父—>子：props

父组件通过 `v-bind` 传递 `prop`给子组件

子组件通过 `props`接收父组件数据，并存到子组件的实例对象上

```vue
<子组件 :属性=“数据”/>
```

---

#### 简单接收 prop

子组件通过`props配置项`，以数组形式接收所有 prop

```js
props: ["属性", "属性"];
```

```vue
<script>
export default {
  props: ["name", "age"],
};
</script>
```

---

#### 限制接收类型

不是必须，除非有特殊需求，否则一般使用简单接收

若是传入数据类型和组件内需要的类型不一致，会报错

```js
props:{
	属性: 数据类型,
	属性: 数据类型
}
```

```vue
<script>
export default {
  props: {
    name: String,
    age: Number,
  },
};
</script>
```

---

#### 详细配置

不是必须，除非有特殊需求，否则一般使用简单接收

限制数据类型、必要性、默认值(取决于必要性)

对象形式设置 props 接收的各个 prop 值

```js
props: {
	属性: {
		type: 数据类型,
		required: true/false,
		default: 数据
	}
}
```

```vue
<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      default: 20,
    },
  },
};
</script>
```

---

#### 修改 prop

**子组件获取的 prop 数据只读，不能被直接操作**，否则会报错

若真的需要操作，可**将 prop 数据赋值给本组件的 data 数据，修改该复制到 data 中的数据**

> 但不能出现 data 数据和 props 数据同名场合
>
> 父组件传递的 props 优先级高过子组件自身的 data

```vue
<!-- 父组件 -->
<template>
  <div>
    <A :data="data" />
  </div>
</template>

<script>
import A from "./components/A.vue";
export default {
  components: { A },
  data() {
    return {
      data: {
        number: 10,
        msg: "hello",
      },
    };
  },
};
</script>
```

```vue
<!-- 子组件 -->
<template>
  <div>
    <h3>msg: {{ data.msg }}</h3>
    <h3>number: {{ num }}</h3>
    <button @click="add">+1</button>
  </div>
</template>

<script>
export default {
  props: ["data"],
  data() {
    return {
      num: this.data.number,
    };
  },
  methods: {
    add() {
      this.num++;
    },
  },
};
</script>
```

### 子—>父：事件回调

**通过父组件给子组件传递函数类型 prop 实现**

1. 父组件通过 prop 传递一个函数给子组件

```vue
<Component :子组件接收的自定义名="父组件中函数" />
```

2. 子组件通过 props 接收并调用，并将自身数据作为参数传入

```js
props: ['子组件接收的自定义名'],
methods: {
  子组件方法(){
    this.子组件接收的自定义名(子组件数据)
  }
}
```

3. 父组件调用该函数，接收的参数就是子组件传来的数据

   > 可参考 React

```js
methods: {
  父组件方法(data){
    console.log(data)
    // data就是来自子组件数据
  }
}
```

> 如下：
>
> 父组件通过函数类型 prop，将自身的 getData 函数作为子组件中的 sendData 传入，子组件调用并传入数据 msg，父组件再调用就可收到子组件数据 msg 了
>
> ```vue
> <!-- 父组件 -->
> <template>
>   <div>
>     <h1>{{ msg }}</h1>
>     <A :sendData="getData" />
>   </div>
> </template>
>
> <script>
> import A from "./components/A.vue";
> export default {
>   components: { A },
>
>   data: () => ({
>     msg: "",
>   }),
>
>   methods: {
>     getData(data) {
>       this.msg = data;
>     },
>   },
> };
> </script>
> ```
>
> ```vue
> <!-- 子组件 -->
> <template>
>   <button @click="send">
>     send data to father
>   </button>
> </template>
>
> <script>
> export default {
>   props: ["sendData"],
>
>   data: () => ({
>     msg: "Component A",
>   }),
>
>   methods: {
>     send() {
>       this.sendData(this.msg);
>     },
>   },
> };
> </script>
> ```

### 子—>父：自定义事件 \$emit

优点是比起 prop 传数据 props 接收的回调方式更简洁

1. 父组件中给子组件通过 **`v-on`** 绑定一个自定义事件

```vue
<Component v-on:自定义事件名="父组件方法;" />
<!-- OR 简写 -->
<Component @自定义事件名="父组件方法;" />
```

2. 子组件内通过 **`this.$emit`** 触发绑定到子组件实例上的指定自定义事件，并传入自身数据

```js
this.$emit("自定义事件名", 子组件数据);
```

3. 父组件的方法接收参数，参数就是子组件传递的数据

```js
methods: {
  父组件方法(data){
    console.log(data)
    // data就是来自子组件数据
  }
}
```

> 如下：
>
> 父组件给子组件绑定自定义事件 onSendData，将自身的 getData 函数传入，子组件通过\$emit 获取调用绑定到自身实例上的自定义事件并传入数据 msg，父组件再调用就可收到子组件数据 msg 了
>
> ```vue
> <!-- 父组件 -->
> <template>
>   <div>
>     <h1>{{ msg }}</h1>
>     <B @onSendData="getData" />
>   </div>
> </template>
>
> <script>
> import B from "./components/B.vue";
> export default {
>   components: { B },
>   data: () => ({
>     msg: "",
>   }),
>
>   methods: {
>     getData(data) {
>       console.log(data);
>       this.msg = data;
>     },
>   },
> };
> </script>
> ```
>
> ```vue
> <!-- 子组件 -->
> <template>
>   <button @click="send">
>     绑定自定义事件并传数据
>   </button>
>   <button @click="unbind">
>     解绑自定义事件
>   </button>
> </template>
>
> <script>
> export default {
>   data: () => ({
>     msg: "Component B",
>   }),
>
>   methods: {
>     send() {
>       this.$emit("onSendData", this.msg);
>     },
>     unbind() {
>       // 解绑自定义事件 onSendData
>       this.$off("onSendData");
>     },
>   },
> };
> </script>
> ```

### 子—>父：ref + \$on

优点是灵活

1. 父组件通过 ref 属性标记子组件，

```vue
<Component ref="自定义标记名" />
```

2. 父组件通过 `$refs` 获取子组件的实例对象

   然后便可直接获取其实例对象上的数据、方法

```js
this.$refs.自定义标记名.子组件数据;
this.$refs.自定义标记名.子组件方法;

this.$refs.自定义标记名.子组件方法(父组件数据);
```

> 如下：
>
> 父组件通过 ref 获取子组件 B 的组件实例对象，然后直接获取其实例对象上的数据 msg
>
> ```vue
> <!-- 父组件 -->
> <template>
>   <div>
>     <h1>{{ msg }}</h1>
>     <B ref="component_b" />
>   </div>
> </template>
>
> <script>
> import B from "./components/B.vue";
> export default {
>   components: { B },
>   data: () => ({
>     msg: "",
>   }),
>
>   mounted() {
>     console.log(this.$refs.component_b.msg);
>   },
> };
> </script>
> ```
>
> ```vue
> <!-- 子组件 -->
> <template>
>   <div>Component B</div>
> </template>
>
> <script>
> export default {
>   data: () => ({
>     msg: "Component B",
>   }),
> };
> </script>
> ```

### 消息订阅与发布 pubsub

实现任意组件间通信

步骤为：

- 需要传出数据的组件**发布消息（publish）**
- 需要获取数据的组件**订阅消息（subscribe）**
- 不需要的时候可**取消订阅（unsubscribe）**

1. 安装 pubsub-js

```bash
npm i pubsub-js
```

2. 需要消息订阅发布的组件导入

```js
import pubsub from "pubsub-js";
```

3. 组件发布消息

```js
pubsub.publish("自定义消息名称", 要传出的数据);
```

4. 组件定义消息

只要订阅了消息，一旦有同名消息被发布，订阅了该消息的组件就会接收到数据

参数有两个，

```js
pubsub.subscribe("自定义消息名称", (name, val) => {
  console.log(name); // name是消息名称
  console.log(val); // val才是传递的数据
});
```

5. 取消订阅

类似定时器，需要一个变量接收订阅的 ID，可将该变量放于组件实例对象上

然后在 beforeDestory 钩子中取消订阅这个变量

```js
this.pubID = pubsub.subscribe("自定义消息名称", (name, val) => {
  ///
});
```

```js
beforeDestory(){
  pubsub.unsubcribe(this.pubID)
}
```

### 状态管理 Vuex

专为 Vue.js 应用程序开发的**状态管理模式**。

详见 [Vue2 + Vuex 基础](./Vue2+Vuex.md)

![](https://vuex.vuejs.org/vuex.png)

## 插槽 slot

插槽就是在父组件中可以向子组件的指定位置插入 HTML 结构

### 基本使用

在组件中用`<slot></slot>` 先占个位，当组件渲染的时候， `<slot></slot>` 将会被替换为传入的结构内容，插槽内可以包含任何模板代码

```vue
<!-- 子组件 -->
<template>
  <div>
    <slot></slot>
  </div>
</template>
```

```vue
<!-- 父组件 -->
<template>
  <div>
    <B>
      <h1>Hello h1</h1>
    </B>
    <B>
      <h2>Hello h2</h2>
    </B>
    <B>
      <h3>Hello h3</h3>
    </B>
  </div>
</template>
```

### 默认插槽

没有传入具体结构时，会显示默认的结构

```vue
<!-- 父组件 -->
<template>
  <div>
    <B />
  </div>
</template>
```

```vue
<!-- 子组件 -->
<template>
  <div>
    <slot>
      <!-- 默认内容 -->
    </slot>
  </div>
</template>
```

### 具名插槽

> 具有名字的插槽

组件中需要多个插槽时，各个插槽需要名字区分

```vue
<!-- 子组件 -->
<template>
  <div>
    <!-- 其余HTML结构 -->
    <slot name="自定义插槽名1"></slot>
    <!-- 其余HTML结构 -->
    <slot name="自定义插槽名2"></slot>
    <!-- 其余HTML结构 -->
    <slot name="自定义插槽名3"></slot>
    <!-- 其余HTML结构 -->
  </div>
</template>
```

#### Vue2.6.0 版本以前

> 通过**`slot标签属性`**指定具名插槽

```vue
<!-- 父组件 -->
<组件>
  <div slot="对应插槽名">
    <!-- 填充内容 -->
  </div>
</组件>
```

> 如下：
>
> ```vue
> <!-- 子组件 -->
> <template>
>   <div>
>     <slot name="a"></slot>
>     <slot name="b"></slot>
>     <slot name="c"></slot>
>   </div>
> </template>
> ```
>
> ```vue
> <!-- 父组件 -->
> <template>
>   <div>
>     <B>
>       <h1 slot="a">hello h1</h1>
>       <h2 slot="b">Hello h2</h2>
>       <h3 slot="c">Hello h3</h3>
>     </B>
>   </div>
> </template>
> ```

---

#### Vue2.6.0 版本以后

> 通过带有 **`v-slot` 指令**的 **`<template></template>`标签** 来对应具名插槽

```vue
<!-- 父组件 -->
<组件>
	<template v-slot:对应插槽名>
  	<!-- 填充内容 -->
  </template>
</组件>

<!-- 简写v-slot指令-->

<组件>
	<template #对应插槽名>
  	<!-- 填充内容 -->
  </template>
</组件>
```

> 如下：
>
> ```vue
> <!-- 子组件 -->
> <template>
>   <div>
>     <slot name="a"></slot>
>     <slot name="b"></slot>
>     <slot name="c"></slot>
>   </div>
> </template>
> ```
>
> ```vue
> <!-- 父组件 -->
> <template>
>   <div>
>     <B>
>       <template #a>
>         <h1>hello h1</h1>
>       </template>
>       <template #b>
>         <h2>hello h2</h2>
>       </template>
>       <template #c>
>         <h3>hello h3</h3>
>       </template>
>     </B>
>   </div>
> </template>
> ```

### 作用域插槽

若插槽中渲染的数据不在父组件而是在子组件中时，需要用到作用域插槽，如下情况：

```vue
<!-- 父组件 -->
<template>
	<组件>
  	<!-- 填充内容 -->
  </组件>
</template>
```

```vue
<!-- 子组件 -->
<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  data: () => ({
    数据,
  }),
};
</script>
```

#### Vue2.6.0 版本以前

> 父组件通过`<template></template>标签`和**`scope标签属性`**指定具名插槽

```vue
<!-- 父组件 -->
<template>
	<组件>
  	<template scope="自定义属性">
  		<!-- 填充内容可直接使用接收到的自定义属性 -->
  	</div>
  </组件>
</template>
```

```vue
<!-- 子组件 -->
<template>
  <div>
    <slot :自定义属性="“子组件数据”"></slot>
  </div>
</template>
```

---

#### Vue2.6.0 版本以后

> 通过`<template></template>标签`和**`slot-scope标签属性`**指定具名插槽

```vue
<!-- 父组件 -->
<template>
	<组件>
  	<template slot-scope="自定义属性">
  		<!-- 填充内容可直接使用接收到的自定义属性 -->
  	</template>
  </组件>
</template>
```

```vue
<!-- 子组件 -->
<template>
  <div>
    <slot :自定义属性="“子组件数据”"></slot>
  </div>
</template>
```

## 混合/混入 Mixin

多个组件共享统一配置，比如 method、data、生命周期等

将配置单独放入一个 JS 文件分别暴露，需要的组件引入

```js
export const mixin01 = {
  data() {
    return {
      num: 10,
    };
  },

  methods: {
    add() {
      this.num++;
    },
  },
};

export const mixin02 = {
  mounted() {
    console.log("hello");
  },
};
```

```vue
<template>
  <div>
    <h3>{{ num }}</h3>
    <button @click="add">+1</button>
  </div>
</template>

<script>
import { mixin01, mixin02 } from "@/mixin/mixin";

export default {
  name: "A",
  mixins: [mixin01, mixin02],
};
</script>
```

---

### 优先等级

mixin 不是替换，是混入整合。

混入的 mixin 的内容优先级低于组件自身的配置内容

- 组件自身没有的话：采用 mixin 的

- 组件自身有的话：

  data 和 method 等是用组件自己的配置

  生命周期都执行，先用组件自身的再用 mixin 的

---

### 全局局部

局部混合是哪个组件需要，哪个组件引入 mixin

全局是将 mixin 文件直接导入项目的 `main.js`

**全局混入会影响所有的组件的实例对象 (包括第三方组件)，慎用**

```js
import { mixin01, mixin02 } from "./mixin.js";

Vue.mixin(aaa);
Vue.mixin(bbb);
```

## Vue devtools

是 Vue 组件调试工具

> Vue3 目前要用 `Vue.js devtools6.0.0 beta`

用来识别页面中的 Vue 组件、路由、vuex 信息

可以更清楚的看到 Vue 组件的层级关系

并可以直接对 Vue 组件的数据进行调试

![](https://raw.githubusercontent.com/vuejs/vue-devtools/dev/media/screenshot-shadow.png)

- 按照[devtools github](https://github.com/vuejs/vue-devtools)克隆仓库、安装、构建

  1. 打开 chrome 扩展页面
  2. 选中开发者模式
  3. 加载已解压的扩展
  4. 选中`vue-devtools/packages/shell-chrome/`

- Google 商店安装扩展工具
