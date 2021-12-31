# Vue3 + Vue-Cli + TS

![](https://www.ahomtech.com/wp-content/uploads/2019/01/VUE.JS-1024x341.jpg)

[[toc]]

## 脚手架项目启动

```bash
vue create 项目名
cd 项目名
npm run serve
```

## 脚手架目录

```js
|- pubilc
|- src
	|- assets
	|- components
	|- App.vue // 根组件
	|- main.ts // 入口文件
```

### main.ts

```tsx
// 导入createApp函数
import { createApp } from "vue";
// 导入App根组件
import App from "./App.vue";

// 创建应用实例对象，调用mount方法挂载到#app节点
createApp(App).mount("#app");
```

### App.vue

#### defineComponent()

Vue3 + TS 时需要通过 `defineComponent()` 方法创建组件

```vue
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Demo",
  setup() {
    console.log("setup demo");
  },
});
</script>
```

> 如下：默认 App.vue

```vue
<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Vue3 + TS App" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HelloWorld from "./components/HelloWorld.vue";

export default defineComponent({
  name: "App",
  components: {
    HelloWorld,
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
```

## setup

### 使用

`setup`是组合 API 的入口函数，只在组件初始化时调用一次

所有数据创建与操作都在 `setup`函数中，并通过`return`返回

返回值是个对象，组件的模版中可直接使用该对象中属性与方法

`setup`函数不能写为`async` 函数，否则返回值对象而是是个`promise`，会导致组件模版无法获取数据和方法

```js
setup(){
  // 初始化数据
  // 初始化方法

  return {
		自定义数据名: 数据,
    自定义方法名: 方法
  }
}
```

> 如下：

```vue
<template>
  <h2>{{ name }}</h2>
  <h2>{{ age }}</h2>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    // console.log("setup demo");
    return {
      name: "andy",
      age: 28,
    };
  },
});
</script>
```

### 返回值

`setup`函数返回值需要是个对象

> `setup`函数返回值中的属性会与`data`中的属性合并为组件的属性
>
> `setup`函数返回值中的方法会与`methods`中的方法合并为组件的方法
>
> 重名的属性和方法以`setup`函数返回值中的优先
>
> 但 Vue3 一般不要同时混用`setup`函数、`data`、`methods`

### 执行机制 与 this

`setup`函数仅在组件创建时执行一次

在声明周期`beforeCreate`之前执行

因为组件还未被创建所以组件实例`this`为`undefined`

```vue
<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    console.log("setup数据初始化, this: ", this);
  },

  beforeCreate() {
    console.log("beforeCreate");
  },

  created() {
    console.log("created组件创建完毕, this: ", this);
  },

  mounted() {
    console.log("mounted组件渲染完毕, this:", this);
  },
});
</script>
```

```js
// setup数据初始化, this: undefined
// beforeCreate
// created 组件创建完毕, this: Proxy {…}
// mounted 组件渲染完毕, this: Proxy {…}
```

### 参数

组件`setup`函数接收两个参数：

- **props：**

  详见 [props 参数](#props-参数)

- **context：**

  详见 [context 参数](#context-参数)

## ref

### 创建数据

`ref`函数用于创建一个包含响应式数据的`reference`引用对象

一般用于初始化**一个基本类型的数据**（字符串，数字，布尔型）

若通过`ref`创建对象/数组会 Vue3 内部自动转为`reactive`的代理对象

```js
import { ref } from "vue";
```

```js
setup(){
  const ref对象 = ref(初始数据)
  return {
    ref对象
  }
}
```

> 如下：

```vue
<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const age = ref("andy");
    const num = ref(0);
    const isShow = ref(false);

    return {
      name,
      num,
      isShow,
    };
  },
});
</script>
```

### 模版中使用

`ref`创建的数据在`setup`函数中被`return`返回后，

该数据即可在`template`模版中被直接使用，

不需要`value`，Vue3 自动处理了

> 如下：

```vue
<template>
  <h3>{{ num }}</h3>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const num = ref(0);
    return {
      num,
    };
  },
});
</script>
```

### 操作数据

`ref`函数的返回值是个对象

`setup`函数内操作数据时，需通过 **`返回值.value`** 获取初始化的数据

```js
setup(){
  const ref对象 = ref(初始数据)
  const 方法 = () => {
    // console.log(ref对象)
    // console.log(ref对象.value)
  }
  return {
    ref对象
  }
}
```

> 如下：

```vue
<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const num = ref(0);
    const add = () => num.value++;

    return {
      num,
      add,
    };
  },
});
</script>
```

### 获取页面元素

> 如下：
>
> 页面渲染完毕后输入框获取焦点光标

```vue
<template>
  <input ref="inputRef" />
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";

export default defineComponent({
  setup() {
    const inputRef = ref<HTMLElement | null>(null);

    onMounted(() => {
      inputRef.value && inputRef.value.focus();
    });

    return { inputRef };
  },
});
</script>
```

## reactive

### 创建数据

`reactive`函数用于定义**多个数据**的响应式（对象、数组）

若通过`ref`创建对象/数组会 Vue3 内部自动转为`reactive`的代理对象

内部基于 ES6 的`Proxy`实现，通过代理对象操作源数据

初始化数据作为参数被`reactive`函数接收，返回值是个`proxy`代理对象

```js
import { reactive } from "vue";
```

```js
setup(){
  const proxy代理对象 = reactive(初始数据)
  return {
    proxy代理对象
  }
}
```

> 如下：

```vue
<script lang="ts">
import { defineComponent, reactive } from "vue";

export default defineComponent({
  setup() {
    const user = reactive({
      name: "andy",
      age: 28,
    });
    const hobbies = reactive(["抽烟", "喝酒", "烫头"]);

    return {
      user,
      hobbies,
    };
  },
});
</script>
```

### 模版中使用

`reactive`创建的数据在`setup`函数中被`return`返回后，

该数据即可在`template`模版中被直接使用

> 如下：

```vue
<template>
  <h3>{{ user.name }}</h3>
  <h3>{{ user.age }}</h3>
  <h3>
    <span v-for="item in user.hobbies" :key="item">
      {{ item }}
    </span>
  </h3>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";

export default defineComponent({
  setup() {
    const user = reactive({
      name: "andy",
      age: 28,
      hobbies: ["抽烟", "喝酒", "烫头"],
    });
    return {
      user,
    };
  },
});
</script>
```

### 操作数据

`reactive`函数返回值是初始化源数据的`proxy`代理对象

修改`reactive`函数返回值的代理对象会深层次修改源数据内部

源数据改变也会导致代理对象变化

若想数据响应式变化实现页面重新渲染，必须只能操作`reactive`函数返回值

若仅需修改数据不需要页面重新渲染，可以不通过代理对象而是直接操作源数据

> 如下，源数据是对象

```vue
<template>
  <h3>{{ user.name }}</h3>
  <h3>{{ user.age }}</h3>
  <button @click="addAge">age +1</button>
  <button @click="upperName">UpperCase</button>
  <button @click="lowerName">LowerCase</button>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";

export default defineComponent({
  setup() {
    const user = reactive({
      name: "andy",
      age: 28,
    });

    const addAge = () => user.age++;
    const upperName = () => (user.name = user.name.toUpperCase());
    const lowerName = () => (user.name = user.name.toLowerCase());

    return {
      user,
      addAge,
      upperName,
      lowerName,
    };
  },
});
</script>
```

> 如下：源数据是数组

```vue
<template>
  <span v-for="item in hobbies" :key="item">
    {{ item }}
  </span>
  <button @click="change">修改第一个</button>
  <button @click="add">追加一个</button>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";

export default defineComponent({
  setup() {
    const hobbies = reactive(["抽烟", "喝酒", "烫头"]);
    const change = () => (hobbies[0] = "睡觉");
    const add = () => hobbies.push("唱歌");

    return {
      hobbies,
      add,
      change,
    };
  },
});
</script>
```

### 不能解构

`reactive`定义的对象是响应式不能解构

解构会消除响应式数据的响应性，解构出来对象的属性会变为非响应式数据，数据变化页面不会随之变化需

如要解构需要用到 [toRef](#toRef)、 [toRef](#toRef)

> 如下：
>
> 将 reactive 定义的对象 person 解构后返回，
>
> 解构获取的 age 成了固定的 28，数据变化页面不会随之变化

```vue
<template>
  <h3>Name: {{ name }}</h3>
  <h3>Age: {{ age }}</h3>
  <button @click="age++">age +1</button>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";

export default defineComponent({
  setup() {
    const person = reactive({
      name: "andy",
      age: 28,
    });

    return {
      ...person,
    };
  },
});
</script>
```

## props 参数

`setup`函数的`props`参数用来接收父组件传递的数据

在子组件中获取父组件传递的并且被子组件接收的属性

子组件的模版中可直接使用`props`中的属性

### 使用

父组件传递的数据必须在子组件内**先通过`props`配置项接收**，

父组件传递来几个数据子组件内就要接收几个，

否则`setup`函数中无法通过`props`获取传递的数据

> 如下：

```vue
<!-- 子组件 -->
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Child",
  props: ["msg", "num"],

  setup(props) {
    console.log(props);
  },
});
</script>
```

```vue
<!-- 父组件 -->
<template>
  <Child :msg="'hello'" :num="20" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Child from "./components/Child.vue";

export default defineComponent({
  name: "Father",
  components: { Child },
});
</script>
```

```js
// props 参数
{
  msg: "hello",
  num: 20,
}
```

### 不能解构

`props`是个 Proxy 代理对象，是响应式数据，

解构会消除响应式数据的响应性

如要解构需要用到 [toRef](#toRef)、[toRefs](#toRefs)

## context 参数

`setup`函数的`context`参数是个普通对象，用来描述上下文

`setup`函数的第二个参数才是`context`，即使不用`props`也要写上

```vue
<!-- 子组件 -->
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup(props, context) {
    console.log(context);

    // Attribute (非响应式对象，等同于 $attrs)
    console.log(context.attrs);

    // 插槽 (非响应式对象，等同于 $slots)
    console.log(context.slots);

    // 触发事件 (方法，等同于 $emit)
    console.log(context.emit);

    // 暴露公共 property (函数)
    console.log(context.expose);
  },
});
</script>
```

```js
// context 参数
{
  attrs: Proxy
	emit: (event, ...args) => instance.emit(event, ...args)
	expose: exposed => {…}
	slots: Proxy
}
```

### 可以解构

`context`只是个普通 JS 对象不是响应式的，可以安全解构

```js
export default {
  setup(props, { attrs, slots, emit, expose }) {
    ...
  }
}
```

### context.attrs

包含组件外传递来的但没有在子组件 props 属性中接受的数据

> 相当于 Vue2 的 `this.$attrs`

`attrs`是有状态的对象，会随组件本身的更新而更新，

不能进行解构，应以 `attrs.x` 方式引用

### context.emit

分发子组件的自定义事件，用于子组件向父组件传值

> 相当于 Vue2 的 `this.$emit()`

#### 使用步骤

1. 子组件内通过`context.emit`将自定义事件和传递数据给父组件
2. 子组件内将传递的自定义事件写入`emits`配置项

```vue
<!-- 子组件 -->
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  emits: ["自定义方法名"],
  setup(props, { emit }) {
    const 方法 = () => {
      emit("自定义事件", 数据);
    };

    return { 方法 };
  },
});
</script>
```

3. 父组件从子组件上接收自定义事件并绑定到父组件内方法

   子组件传递的数据作为参数被绑定的父组件方法接收

```vue
<!-- 父组件 -->
<template>
  <子组件 @自定义事件="方法" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  setup() {
    const 方法 = (子组件传递的数据) => {
      // console.log(子组件传递的数据);
    };
    return { 方法 };
  },
});
</script>
```

> 如下：
>
> 子组件内通过自定义事件传递数据给父组件
>
> 父组件接收自定义事件并绑定到父组件内的方法
>
> 子组件内点击按钮触发自定义事件调用父组件内方法

```vue
<!-- 子组件 -->
<template>
  <button @click="func">+ 10</button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  emits: ["childChangeData"],
  setup(props, context) {
    const params = ref(10);
    const func = () => {
      context.emit("childChangeData", params.value);
    };
    return {
      func,
    };
  },
});
</script>
```

```vue
<!-- 父组件 -->
<template>
  <h3>{{ num }}</h3>
  <Demo @childChangeData="fatherChangeNum" />
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Demo from "./components/demo.vue";

export default defineComponent({
  name: "App",
  components: { Demo },

  setup() {
    const num = ref(100);
    const fatherChangeNum = (childData: number) => {
      num.value += childData;
    };
    return {
      num,
      fatherChangeNum,
    };
  },
});
</script>
```

### context.slots

用于接收插槽内容

> 相当于 Vue2 的 `this.$slots`

`slots` 是有状态的对象，会随组件本身的更新而更新，

不能进行解构，应以 `slots.x` 的方式引用

```vue
<!-- 父组件 -->
<template>
  <Child>
    <template v-slot:hello>
      <div>Hello</div>
    </template>
  </Child>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Child from "./components/Son.vue";

export default defineComponent({
  name: "Father",
  components: { Child },
});
</script>
```

```vue
<!-- 子组件 -->
<template>
  <slot name="hello"></slot>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Child",
  props: ["msg", "num"],

  setup(props, context) {
    console.log(context.slots);
  },
});
</script>
```

## provide & inject

用于跨组件数据传递

![](https://v3.cn.vuejs.org/images/components_provide.png)

父组件通过一个 `provide` 来提供数据

子组件通过一个 `inject` 来接收数据

> 如下：
>
> 父组件内选择颜色按钮，孙子组件展示颜色，不通过子组件

```vue
<!-- 父组件 -->
<template>
  <button @click="color = 'red'">Red</button>
  <button @click="color = 'green'">Green</button>
  <button @click="color = 'blue'">Blue</button>
  <Son />
</template>

<script lang="ts">
import { defineComponent, provide, ref } from "vue";
import Son from "./components/Son.vue";
export default defineComponent({
  name: "Father",
  components: { Son },
  setup() {
    const color = ref("red");

    provide("color", color);

    return { color };
  },
});
</script>
```

```vue
<!-- 子组件 -->
<template>
  <GrandSon />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import GrandSon from "./GrandSon.vue";
export default defineComponent({
  name: "Son",
  components: { GrandSon },
});
</script>
```

```vue
<!-- 孙子组件 -->
<template>
  <h3 :style="{ color: color }">{{ color }}</h3>
</template>

<script lang="ts">
import { defineComponent, inject } from "vue";
export default defineComponent({
  name: "Grandson",
  setup() {
    const color = inject("color");
    return { color };
  },
});
</script>
```

## computed

模板中不能放入太多的逻辑，计算属性专门用来对响应式数据的复杂逻辑进行计算

在 Vue3 中作为组合 API `computed`函数需要先引入后在`setup`中使用

```js
import { computed } from "vue";
```

### 执行机制

`computed`函数在组件初始化时先执行一次，

之后每次依赖属性变化时再执行一次

### get

get 是指 **只读的计算属性**，

即仅对依赖数据进行计算后获取新数据，新数据变化无法反向影响依赖项旧属性

`computed`函数接收**一个回调函数**做参数时，表示 **get**

回调函数中`return`的返回值即对旧数据处理后的新数据

```js
setup(){
  let 计算属性 = computed(() => {
    return 依赖的旧数据处理后的新数据
  })
  return {
    计算属性
  }
}
```

> 如下：
>
> 旧数据`firstName` `lastName`变化时计算属性`fullName`也随之变化

```vue
<template>
  <fieldset>
    <legend>姓名输入</legend>
    姓: <input v-model="firstName" /><br />
    名: <input v-model="lastName" /><br />
  </fieldset>
  <fieldset>
    <legend>计算属性</legend>
    全名: <input v-model="fullName" /><br />
    大写: <input v-model="upperName" /><br />
    小写: <input v-model="lowerName" /><br />
  </fieldset>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";

export default defineComponent({
  setup() {
    const firstName = ref("Michael");
    const lastName = ref("Jackson");

    const fullName = computed(() => {
      return firstName.value + "·" + lastName.value;
    });
    const upperName = computed(() => {
      return fullName.value.toUpperCase();
    });
    const lowerName = computed(() => {
      return fullName.value.toLowerCase();
    });

    return {
      firstName,
      lastName,
      fullName,
      upperName,
      lowerName,
    };
  },
});
</script>
```

### set

set 是指 **可读写的计算属性**，

计算属性的依赖项旧属性变化时计算属性随之变化，并且，

计算属性计算变化时，可将新值进行操作后修改其依赖的旧数据

`computed`函数接收**一个对象**做参数时，可以使用 **set**

该对象包含`get`和`set`两个函数：

- 通过`get`函数计算

  `get`函数中需要`return`返回对旧数据处理后的新数据

- 通过`set`函数修改

  `set`函数参数`value`接收修改后的新计算属性

  基于计算属性的新值`value`对其依赖的旧数据进行操作修改

```js
setup(){
  let 计算属性 = computed({
    get(){
      return 对依赖旧数据处理后的新数据
    },
    set(value){
     	// 基于计算属性的新值 value 操作其他数据
    }
  })

  return {
    计算属性
  }
}
```

> 如下：
>
> 计算属性`fullName`变化时其依赖的旧数据`firstName` `lastName`也随之变化

```vue
<template>
  <fieldset>
    <legend>姓名</legend>
    姓: <input v-model="firstName" /><br />
    名: <input v-model="lastName" /><br />
  </fieldset>
  <fieldset>
    <legend>计算属性</legend>
    全名: <input v-model="fullName" /><br />
  </fieldset>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
export default defineComponent({
  setup() {
    let firstName = ref("Michael");
    let lastName = ref("Jackson");

    const fullName = computed({
      get() {
        return firstName.value + "·" + lastName.value;
      },
      set(newValue: string) {
        firstName.value = newValue.split("·")[0];
        lastName.value = newValue.split("·")[1];
      },
    });

    return {
      firstName,
      lastName,
      fullName,
    };
  },
});
</script>
```

## watchEffect

可参考[监视属性 watch](#watch)

### 使用

在 Vue3 中作为组合 API`watchEffect`函数需要先引入后在`setup`中使用

```js
import { watch } from "vue";
```

```js
setup(){
  watchEffect(() => {
    /// 对某属性的操作
  })
}
```

> 如下：
>
> watchEffect 来实现 computed 的功能，
>
> 监听 firstName 和 lastName 属性，任意变化时 fullName 属性随之变化

```vue
<template>
  <fieldset>
    <legend>姓名</legend>
    姓: <input v-model="firstName" /><br />
    名: <input v-model="lastName" /><br />
  </fieldset>
  <fieldset>
    <legend>全名</legend>
    <input v-model="fullName" />
  </fieldset>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from "vue";
export default defineComponent({
  setup() {
    const firstName = ref("Michael");
    const lastName = ref("Jackson");
    const fullName = ref("");

    watchEffect(() => {
      fullName.value = firstName.value + "·" + lastName.value;
    });

    return {
      firstName,
      lastName,
      fullName,
    };
  },
});
</script>
```

### 比较 watch

`watchEffect`函数会立即执行作为参数传入的函数，

同时响应式追踪其依赖，其依赖变更时重新运行该函数

即：**默认立即监视**、在`setup`之后`beforeCreate`之前**默认先执行一次**

> 不用声明要监视哪一个属性，回调函数中用了哪个属性会自动监视用的属性
>
> 默认开启了`immediate: true`的监视配置

## watch

监视属性用于对某属性进行监视，属性变化时执行特殊操作

在 Vue3 中作为组合 API`watch`函数需要先引入后在`setup`中使用

```js
import { watch } from "vue";
```

```js
setup(){

  watch(
		监视的数据,
  	(变化后的该数据, 变化前的该数据) => { 执行操作 },
  	配置项
	)
}
```

### immediate

`immediate`配置项用于执行**立刻监视**

默认被`watch`监视的属性变化时不会立即进行监视

```js
setup(){
  watch(
    数据,
    (变化后的该数据, 变化前的该数据) => { },
    {
      immediate: true,
    }
  )
}
```

```vue
<template>
  <div>
    <h2>{{ sum }}</h2>
    <button @click="sum++">+</button>
  </div>
</template>

<script>
import { ref, watch } from "vue";
export default {
  setup() {
    let sum = ref(0);
    watch(
      sum,
      (newVal, oldVal) => {
        console.log("New:", newVal, "Former:", oldVal);
        // New: 0 Former: undefined
      },
      { immediate: true }
    );
    return {
      sum,
    };
  },
};
</script>
```

### deep

`deep`配置项用于执行**深度监视**

监视简单属性不需要，当监视复杂属性（对象）时可能会需要

```js
setup(){
  watch(
    数据,
    (变化后的该数据, 变化前的该数据) => { },
    {
      deep: true,
    }
  )
}
```

- ref 定义的响应式数据

  因为是简单数据，不需要开启深度监视

- reactive 定义的响应式数据

  - 若是监视该数据的全部属性：

    默认强制开启深度监视，deep 配置无效

  - 若是监视该数据的某个对象属性的属性：

    需要开启深度监视该对象属性的属性

### ref 创建的数据

`ref`定义的数据是简单数据，不需要开启深度监视

#### 监视一个 ref 创建的数据

```js
setup(){
  watch(
    要监视的数据,
    (变化后的该数据, 变化前的该数据) => { }
  )
}
```

如下：

```vue
<template>
  <h2>{{ sum }}</h2>
  <button @click="sum++">+1</button>
</template>

<script>
import { ref, watch } from "vue";
export default {
  setup() {
    let sum = ref(0);

    watch(sum, (newVal, oldVal) => {
      console.log("New:", newVal, "Former:", oldVal);
    });

    return {
      sum,
    };
  },
};
</script>
```

---

#### 分别监视多个 ref 创建的数据

```js
setup(){
  watch( 数据1, (变化后的该数据, 变化前的该数据) => { })
  watch( 数据2, (变化后的该数据, 变化前的该数据) => { })
  watch( 数据3, (变化后的该数据, 变化前的该数据) => { })
}
```

---

#### 同时监视多个 ref 创建的数据

```js
setup(){
  watch(
    [数据1,数据2,数据3],
    (变化后的该数据, 变化前的该数据) => { }
  )
}
```

### reactive 创建的对象

#### 监视对象的全部属性

```js
setup(){
  watch(
    要监视的对象,
    (newVal, oldVal) => {}
  )
}
```

监视`reactive`定义的对象的全部属性据时

- 默认**强制开启深度监视**

  `deep`配置了也无效

- **无法获取正确的`oldValue`**，

  `oldValue`的值和`newValue`相同

> 如下：

```vue
<template>
  <div>
    <h2>{{ person }}</h2>
    <button @click="person.name += '!'">name+!</button>
    <button @click="person.age++">age+1</button>
  </div>
</template>

<script>
import { reactive, watch } from "vue";
export default {
  setup() {
    let person = reactive({
      name: "andy",
      age: 20,
    });
    watch(person, (newVal, oldVal) => {
      console.log("New:", newVal, "Former:", oldVal);
    });
    return {
      person,
    };
  },
};
</script>
```

```js
NewVal: Proxy {name: "andy!", age: 20}
OldVal: Proxy {name: "andy!", age: 20}
```

#### 监视对象的一个属性

若监视`reactive`定义的对象的某个属性，

需要通过**函数形式**

```js
setup(){
  watch(
    () => 要监视的对象.属性,
    (newVal, oldVal) => {}
  )
}
```

> 如下：

```vue
<template>
  <div>
    <h2>{{ person.name }}</h2>
    <button @click="person.name += '!'">name+!</button>
  </div>
</template>

<script>
import { reactive, watch } from "vue";
export default {
  setup() {
    let person = reactive({
      name: "andy",
    });
    watch(
      () => person.name,
      (newVal, oldVal) => {
        console.log("New:", newVal, "Former:", oldVal);
      }
    );
    return {
      person,
    };
  },
};
</script>
```

#### 监视对象的某些属性

```js
setup(){
  watch(
    [
      () => 要监视的对象.属性,
      () => 要监视的对象.属性,
      () => 要监视的对象.属性
    ],
    (newVal, oldVal) => {}
  )
}
```

#### 监视对象的对象属性中的全部属性

若监视`reactive`定义的对象的某个对象属性

需要开启深度监视`deep`

```js
setup(){
  let person = reactive({
  	name: 'Andy',
    job: {
      name: '前端',
      sallary: '20k'
    }
  })
}
```

```js
setup(){
  watch(
    () => 要监视的对象.对象属性,
    (变化后的该数据, 变化前的该数据) => { },
    {
      deep: true, // 深度监视
    }
  )
}
```

### 监视非响应式数据

```js
watch(
  [() => 数据, () => 数据],
  () => {
    // 操作
  },
  {
    // immediate: true,
    // deep: true
  }
);
```

## 生命周期

Vue3 中生命周期作为了组合式 API 钩子函数

也保留了 Vue2 的配置项形式写法

**一般配置项写法和组合 API 写法不会同时出现**

> 若真要同时出现则先后顺序是：
>
> 组合式 API 的钩子函数早于配置项形式

### 组合式 API 钩子函数

直接导入 `onXxx` 函数来注册生命周期钩子在`setup`中使用

但组合式 API 钩子函数中没有`beforeCreate`、`created`，这两个相当于`setup`函数

|  生命周期钩子   |     生命周期      |
| :-------------: | :---------------: |
|      setup      | 早于 beforeCreate |
|  onBeforeMount  |    beforeMount    |
|  **onMounted**  |      mounted      |
| onBeforeUpdate  |   beforeUpdate    |
|  **onUpdated**  |      updated      |
| onBeforeUnmount |   beforeUnmount   |
|   onUnmounted   |     unmounted     |

> 如下：

```vue
<template>
  <h3>{{ num }}</h3>
  <button @click="num++">+1</button>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
} from "vue";

export default defineComponent({
  setup() {
    const num = ref(0);
    console.log("setup");

    onBeforeMount(() => {
      console.log("onBeforeMounted");
    });

    onMounted(() => {
      console.log("onMounted");
    });

    onBeforeUpdate(() => {
      console.log("onBeforeUpdate");
    });

    onUpdated(() => {
      console.log("beforeUpdate");
    });

    onBeforeUnmount(() => {
      console.log("onBeforeUnmounted");
    });

    onBeforeUnmount(() => {
      console.log("onBeforeUnmounted");
    });

    onUnmounted(() => {
      console.log("onUnmounted");
    });

    return { num };
  },
});
</script>
```

### 配置项写法

和 Vue2 不同在于`beforeUnmount`、`unmounted`

Vue3 的`setup`执行比`beforeCreate`要早

|     Vue3      |     Vue2      |
| :-----------: | :-----------: |
| beforeCreate  |     相同      |
|    created    |     相同      |
|  beforeMount  |     相同      |
|    mounted    |     相同      |
| beforeUpdate  |     相同      |
|    updated    |     相同      |
| beforeUnmount | beforedestory |
|   unmounted   |   destoried   |

> 如下：

```vue
<template>
  <h3>{{ num }}</h3>
  <button @click="num++">+1</button>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
export default defineComponent({
  setup() {
    const num = ref(0);
    console.log("setup");

    return { num };
  },

  created() {
    console.log("组件创建完毕");
  },

  updated() {
    console.log("更新完毕");
  },

  mounted() {
    console.log("渲染完毕");
  },
});
</script>
```

## 自定义 Hooks

Vue3 中自定义 Hook 函数用于**复用代码，清晰 setup 的逻辑**

> 类似 Vue2 的 Mixin

实质是个单独通过组合式 API 封装的可供其他组件使用的函数

可单独写入文件，Hook 函数文件一般命名为**`useXxx`**

### 使用

Hook 函数内可以包含数据、方法、生命周期等

并通过`return`返回数据供使用该 Hooks 的组件的`setup`接收

```tsx
// 定义Hook
import { 组合式API } from "vue";

const use自定义钩子名 = () => {
  const 数据 = reactive(初始化数据);
  const 数据 = ref(初始化数据);

  const 自定义方法 = () => {
    /* 操作 */
  };

  on生命周期钩子(() => {
    /* 操作 */
  });

  return { 数据 };
};

export default use自定义钩子名;
```

```vue
<!-- 组件中使用Hooks-->
<script lang="ts">
import { defineComponent } from "vue";
// 导入Hooks
import use自定义钩子名 from "./hooks/use自定义钩子名.ts";

export default defineComponent({
  setup() {
    // 获取Hooks的返回值
    const { 数据 } = use自定义钩子名();

    return { 数据 };
  },
});
</script>
```

### 实例 1

获取鼠标点击坐标

> 如下：
>
> 通过自定义 Hooks 拆分组件`setup`中可复用部分，清晰组件`setup`结构

```tsx
// src/Hooks/useMousePoint.ts
import { reactive, onMounted, onBeforeUnmount } from "vue";

const useMousePoint = () => {
  const point = reactive({
    x: 0,
    y: 0,
  });

  const getMousePoint = (e: any) => {
    point.x = e.pageX;
    point.y = e.pageY;
    // console.log(point);
  };

  onMounted(() => {
    window.addEventListener("click", getMousePoint);
  });
  onBeforeUnmount(() => {
    window.removeEventListener("click", getMousePoint);
  });

  return { point };
};

export default useMousePoint;
```

```vue
<!-- 组件中使用Hooks-->
<template>
  <h2>鼠标坐标</h2>
  <h3>X: {{ point.x }}</h3>
  <h3>Y: {{ point.y }}</h3>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useMousePoint from "./hooks/useMousePosition";

export default defineComponent({
  setup() {
    const { point } = useMousePoint();

    return { point };
  },
});
</script>
```

> 如下：
>
> 不通过 Hooks 的话，一旦组件自身逻辑过多会导致组件`setup`结构不清晰

```vue
<template>
  <h2>鼠标坐标： X:{{ point.x }} Y:{{ point.y }}</h2>
</template>

<script lang="ts">
import { defineComponent, reactive, onBeforeUnmount, onMounted } from "vue";

export default {
  setup() {
    const point = reactive({
      x: 0,
      y: 0,
    });
    const getMousePoint = (e: any) => {
      point.x = e.pageX;
      point.y = e.pageY;
      // console.log(point);
    };
    onMounted(() => {
      window.addEventListener("click", getMousePoint);
    });
    onBeforeUnmount(() => {
      window.removeEventListener("click", getMousePoint);
    });

    return { point };
  },
};
</script>
```

### 实例 2

封装 Ajax 请求

根据组件调用 Hook 时传入的不同地址请求数据

```tsx
// Hooks函数
import { ref } from "vue";
import axios from "axios";

const useSendRequest = (url: string) => {
  const loading = ref(true);
  const data = ref(null);
  const errorMessage = ref("");

  axios
    .get(url)
    .then((res) => {
      loading.value = false;
      data.value = res.data;
    })
    .catch((err) => {
      loading.value = false;
      errorMessage.value = err.message || "未知错误";
    });

  return {
    loading,
    data,
    errorMessage,
  };
};

export default useSendRequest;
```

```vue
<!--组件内使用Hook -->
<template>
  <h3 v-if="loading">Loading...</h3>
  <h3 v-else-if="errorMessage">{{ errorMessage }}</h3>
  <h3 v-else>{{ data }}</h3>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useSendRequest from "./hooks/useSendRequest";

export default defineComponent({
  setup() {
    const { loading, data, errorMessage } = useSendRequest("地址");

    return {
      loading,
      data,
      errorMessage,
    };
  },
});
</script>
```

## toRefs

`toRefs`用于将一个响应对象转为一个属性都是`ref`对象的普通对象

### 处理对象解构问题

ES6 解构会消除响应式数据的响应性

解构出来对象的属性会变为非响应式数据，数据变化页面不会随之变化

可通过`toRefs`将对象变为一个属性都是`ref`对象的普通对象，然后就可以解构了

### 实例 1

> 将 reactive 定义的对象解构后返回，
>
> 解构获取的 age 成了固定的 28，不再是响应式数据，数据变化页面不会随之变化

```vue
<template>
  <h3>Name: {{ name }}</h3>
  <h3>Age: {{ age }}</h3>
  <button @click="age++">age +1</button>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
export default defineComponent({
  setup() {
    const person = reactive({
      name: "andy",
      age: 28,
    });
    return { ...person };
  },
});
</script>
```

> 解决方法：
>
> 通过`toRefs`将对象变为一个所有属性都是`ref`对象的普通对象 personAsRefs
>
> 然后解构 personAsRefs 返回

```vue
<template>
  <h3>Name: {{ name }}</h3>
  <h3>Age: {{ age }}</h3>
  <button @click="age++">age +1</button>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";

export default defineComponent({
  setup() {
    const person = reactive({
      name: "andy",
      age: 28,
    });
    const personAsRefs = toRefs(person);

    return { ...personAsRefs };
  },
});
</script>
```

### 实例 2

```tsx
// Hook
import { reactive, toRefs } from "vue";

const useHooksExample = () => {
  const person = reactive({
    name: "andy",
    age: 28,
  });

  return { ...toRefs(person) };
};
export default useHooksExample;
```

```vue
<template>
  <h3>Name: {{ name }}</h3>
  <h3>Age: {{ age }}</h3>
  <button @click="age++">age +1</button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useHooksExample from "./Hooks/useHooksExample.ts";

export default defineComponent({
  setup() {
    const { name, age } = useHooksExample();

    return { name, age };
  },
});
</script>
```

## 新组件

### Fragment（片段）

Vue2 要求在`<template>`模版中必须要有一个根标签

Vue3 中可以没有根标签，Vue 内部会用一个`<Fragment>`虚拟标签包裹

减少了标签层级，减少了内存占用

```vue
<template>
  <h3>Hello</h3>
  <h3>Hello</h3>
</template>
```

### Teleport（瞬移）

将某些标签移动到其父组件外的某位置

```vue
<Teleport to="位置">
   <!-- 标签 -->
</Teleport>
```

> 如下：
>
> 将 button 元素放置于 App 组件外，指定放于 body 上

```vue
<template>
  当前组件是App
  <Teleport to="body">
    <button>Back to Top</button>
  </Teleport>
</template>
```

### Suspense（悬念）

在等待异步渲染时渲染的内容
