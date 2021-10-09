# Vue-Cli + Vue3

Vue2通过render函数传入h函数渲染App组件

所有的东西都是挂载到了Vue实例对象上

```js
// vue2 的 main.js
import Vue from 'vue'
import App from './App.vue'

new Vue({
  render: h => h(App)
}).$mount('#app')
```

---

vue3是通过createApp工厂函数创建vue对象然后渲染App组件

```js
// vue3 的 main.js
import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')
```

> 工厂函数：
>
> - 是个函数
> - 返回一个实例对象







## setup函数

组件中所有的数据、方法都要放入**setup**函数

#### 使用步骤

然后通过**return**返回值以**对象形式**返回

只有return返回了的数据、方法才能在模版中使用

```js
setup(){
  // 定义数据
  // 定义方法
  return {
    数据名,
    方法名
  }
}
```

#### setup返回值

setup函数的返回值除了对象形式，

还可以是个渲染自定义内容的函数（不常用）

但主要还是常用return返回对象形式的数据和方法

```vue
<template>
  <div></div>
</template>

<script>
import { h } from "vue";
export default {
  name: "App",
  setup() {
    return () => h("h1", "Hello");
  },
};
</script>

<style></style>
```

#### setup中的this

setup中的this是**undefined**

```vue
<script>
export default {
  setup() {
    console.log(this);
  },
};
</script>
```

setup中Vue3语法不要与Vue2混写

> setup无法访问Vue2写法定义的data、methods、computed等
>
> 重名数据是setup优先

---

#### setup的参数

有两个参数

分别详见props和context

```vue
<script>
export default {
  setup(props, context) {
    console.log(props, context);
  },
};
</script>
```



### 非响应式数据

```js
setup() {
  let 数据 = 固定值
 	return {
    数据
  }
}
```

模版中直接使用数据名

此时定义的数据是非响应式

#### 实例

```vue
<template>
  <div>
    {{ name }}{{ age }}
    <button @click="say">check</button>
  </div>
</template>

<script>
export default {
  name: "App",
  setup() {
    let name = "andy";
    let age = 28;
    let say = () => {
      console.log(`i'm ${name},i'm ${age}`);
    };
    return {
      name,
      age,
      say,
    };
  },
};
</script>

<style></style>
```



### ref 函数

Vue2中的ref是个属性用来给元素绑定事件

Vue3中的ref是个函数用来在setup中定义**响应式**数据

#### 使用

- 首先需要导入ref 函数

```js
import { ref } from "vue";
```

- **setup中定义数据**：

  调用ref函数，将数据作为参数传入，

- **JS中操作数据**：

  ref函数返回一个**对象**

  通过`数据名.value ` 获取和修改数据

```js
setup() {
  let 数据 = ref(值)
  
  let 方法 = () => {
    数据.value = 新值
  }
  
  return {
    数据名,
    方法名
  }
}
```

- **模版中读取数据**：

  直接写`数据名`，不是写`数据.value`，

  Vue3自动处理了，直接获取即可

```vue
<template>
  <div>{{ 数据名 }}</div>
</template>
```

----

#### 实例

```vue
<template>
  <div>
    {{ name }}{{ age }}
    <button @click="change">change</button>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  name: "App",
  setup() {
    let name = ref("andy");
    let age = ref(28);
    let change = () => {
      name.value = "Tom";
      age.value = 25;
    };
    return {
      name,
      age,
      change,
    };
  },
};
</script>

<style></style>
```



### reactive 函数

ref 函数和reactive函数都是用于创建响应式数据

**ref函数**主要用于简单数据类型（**字符串，数字，布尔型**）

**reactive函数**用于复杂数据类型（**对象、数组**）

#### 使用

- 导入reactive函数

```js
import { reactive } from "vue";
```

- **setup定义数据**

  调用reactive函数，将数据作为参数传入

  reactive函数返回一个**proxy对象**

  ```js
  Proxy {name: "Tom", age: 25} 
  Proxy {0: "睡觉", 1: "喝酒", 2: "烫头"}
  ```

- **JS中操作数据**

  直接通过`数据名 `获取和修改数据

```js
setup() {
  let 对象 = reactive({
    属性: 值
  })
  let 数组 = reactive([元素,元素])
  
  let 方法 = () => {
   对象.属性 = 新值
   数组[序号] = 新元素
  };
  
  return {
   对象,
   数组,
   方法
  };
},
```

- **模版中读取数据**：

  通过`对象.属性` 或 `数组[序号]`获取数据的值

```vue
<template>
  <div> 
    {{ 对象.属性 }}
    {{ 数组[序号] }}
  </div>
</template>
```

---

#### 实例

```vue
<template>
  <div>
    {{ person.name }}{{ person.age }}
    {{ hobby[0] }}
    <button @click="change">change</button>
  </div>
</template>

<script>
import { reactive } from "vue";
export default {
  name: "App",
  setup() {
    let person = reactive({
      name: "andy",
      age: 28,
    });
    let hobby = reactive(["抽烟", "喝酒", "烫头"]);
    let change = () => {
      person.name = "Tom";
      person.age = 25;
      hobby[0] = "睡觉";
    };
    return {
      person,
      hobby,
      change,
    };
  },
};
</script>

<style></style>
```

---

#### 建议

ref函数定义的响应式数据需要通过**.value** 获取操作

reactive函数定义的响应式数据可直接获取操作

所以建议setup定义数据时，以对象形式

操作时也方便，返回时也简单，模版使用时也明确

```js
setup() {
  let person = reactive({
    name: "andy",
    age: 28,
    hobby: ["抽烟", "喝酒", "烫头"]
  });
  
  let change = () => {
    person.name = "Tom";
    person.age = 25;
    person.hobby[0] = "睡觉";
  };
  return {
    person,
    change,
  };
}
```









## props

是个对象，包含了父组件传递来的切被子组件内接受了的数据

若子组件内不通过props接受，无法在setup中通过props获取

(见context.attrs)

```vue
<script>
export default {
  props:['父组件传递的数据']
  setup(props) {
    console.log(props.父组件传递的数);
  },
};
</script>
```

#### 使用

- 父组件

将数据作为属性传递给子组件

- 子组件

  子组件内馅通过props接收

  模版中可直接使用

  JS中通过setup第一个参数`props.属性名`获取传递的数据

```vue
<!-- 父组件 -->
<template>
  <Child :person="person" />
</template>

<script>
import Child from "./Child.vue";
export default {
  components: { Child },
  setup() {
    let person = {
      name: "andy",
      age: 28,
    };
    return {
      person,
    };
  },
};
</script>
```

```vue
<!-- 子组件 -->
<script>
export default {
  props: ["person"],
  setup(props) {
    console.log(props.person);
    // {name: "andy", age: 28}
  },
};
</script>
```





## context

上下文对象

```vue
<script>
export default {
  setup(props, context) {
    // 第二个参数才是context，即使不用props也要写上
    console.log(context);
  },
};
</script>
```

包含：

- **attrs**
- **emit**
- **slots**

```js
{
  attrs: (...)
  emit: (...)
  expose: (...)
  slots: (...)
}
```



### context.attrs

包含组件外传递来的但没有在子组件props属性中接受的数据

相当于Vue2的 `this.$attrs`



### context.emit

分发子组件的自定义事件

用于子组件向父组件传值

相当于Vue2的 `this.$emit()`

#### 步骤

1. 子组件：

   setup定义方法，模版通过事件绑定该方法

   通过setup第二个参数context的emit方法传递参数和自定义方法

```js
setup(props, context) {
  emits:['自定义方法名'],
    
  let 方法 = () => {
    context.emit("数据变量名", 自定义方法名);
  };
  
  return {
    方法,
  };
}
```

2. 父组件：

   接受子组件的自定义方法并绑定到父组件自身的方法

   方法的参数就是子组件传递的数据

```vue
<template>
	<子组件 @自定义方法名="父组件方法">send</button>
</template>
```

```js
setup() {
  let 方法 = (data) => {
    console.log(data);
  }
  return{
    方法名
  }
}
```

---

#### 实例

```vue
<!-- 子组件 -->
<template>
	<button @click="fun">send</button>
</template>

<script>
export default {
  emits:['person'],
  setup(props, context) {
    let person = {
      name: "andy",
      age: 28,
    };
    let fun = () => {
      context.emit("person", person);
    };
    return {
      fun,
    };
  },
};
</script>
```

```vue
<!-- 父组件 -->
<template>
  <Child @person="getPerson" />
</template>

<script>
import Child from "./Child.vue";
export default {
  components: { Child },
  setup() {
    let getPerson = (data) => {
      console.log(data);
    };
    return{
      getPerson
    }
  },
};
</script>
```

---

#### 使用

父组件使用子组件传递来的数据

赋值给父组件的数据

```vue
<!-- 子组件 -->
<template>
	<button @click="fun">send</button>
</template>

<script>
export default {
  emits:['person'],
  setup(props, context) {
    // 第二个参数才是context，即使不用props也要写上
    let person = {
      name: "andy",
      age: 28,
    };
    let fun = () => {
      context.emit("person", person);
    };
    return {
      fun,
    };
  },
};
</script>
```

```vue
<template>
  <div>
    <Child @person="getPerson" />
    {{ person }}
  </div>
</template>

<script>
import Child from "./A1.vue";
import { reactive } from "vue";
export default {
  components: { Child },
  setup() {
    let person = reactive({
      name: "",
      age: "",
    });
    let getPerson = (data) => {
      person.name = data.name;
      person.age = data.age;
      // console.log(person);
    };

    return {
      person,
      getPerson,
    };
  },
};
</script>
```



### context.slots

接收插槽内容

相当于Vue2的 `this.$slots`





## 计算函数 computed

先导入

```js
import { computed } from 'vue'
```



初始化时执行一次，

每当依赖的属性变化时，再执行一次

必须要写返回值



### 只读取

return返回值

```js
setup(){
  let 自定义计算属性名 = computed(()=>{
    return 对旧数据处理后得的新数据
  })
  return {
    自定义计算属性名
  }
}
```

模版中直接使用自定义计算属性名

```vue
<template>
	<div>{{ 自定义计算属性名 }}</div>
</template>
```

---

#### 实例

```vue
<template>
  <div>
    FirstName:
    <input type="text" v-model="person.firstname" />
    LastName: 
    <input type="text" v-model="person.lastname" />
    <h3>{{ person.fullname }}</h3>
  </div>
</template>

<script>
import { reactive, computed } from "@vue/reactivity";
export default {
  setup() {
    let person = reactive({
      firstname: "Michael",
      lastname: "Jackson",
    });
    person.fullname = computed(() => {
      return person.firstname + "・" + person.lastname;
    });
    return {
      person,
    };
  },
};
</script>
```



### 可读写修改

操作自定义计算属性后响应式改变计算属性用到的属性

通过get获取，通过set修改

get中直接return 对旧数据处理后得的新数据

set中通过 value参数获取计算属性的返回值，基于value操作其余数据

```js
setup(){
  let 自定义计算属性名 = computed({
    get(){
      return 对旧数据处理后得的新数据
    },
    set(value){
      // value 就是计算属性的返回值
     	基于计算属性的值操作其他数据
    }
  })
  return {
    自定义计算属性名
  }
}
```

---

#### 实例

```vue
<template>
  <div>
    FirstName:
    <input type="text" v-model="person.firstname" />
    LastName:
    <input type="text" v-model="person.lastname" />
   	<br/>
    FullName: 
    <input type="text" v-model="person.fullname" />
  </div>
</template>

<script>
import { reactive, computed } from "@vue/reactivity";
export default {
  setup() {
    let person = reactive({
      firstname: "Michael",
      lastname: "Jackson",
    });
    person.fullname = computed({
      get() {
        return person.firstname + "・" + person.lastname;
      },
      set(value) {
        // console.log(value);
        const arr = value.split("・");
        person.firstname = arr[0];
        person.lastname = arr[1];
      },
    });
    return {
      person,
    };
  },
};
</script>
```







## 监视函数 watch

对变化的属性进行监视

```js
import { watch } from 'vue'
```



### 监视ref定义的响应式数据

ref定义的数据是简单数据，不需要开启深度监视

#### 一个ref定义的简单数据

```js
setup(){
  watch( 
    要监视的数据, (变化后的该数据, 变化前的该数据) => { }
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
    let sum = ref(0)
    
    watch(sum, (newVal, oldVal) => {
      console.log("New:", newVal, "Former:", oldVal);
    })
    
    return {
      sum,
    };
  },
};
</script>
```

---

#### 多个ref定义的简单数据

Vue2中的watch是个配置项，不能重复使用

Vue3中的watch是组合式API可以多次调用

```js
setup(){
  watch( 数据1, (变化后的该数据, 变化前的该数据) => { })
  watch( 数据2, (变化后的该数据, 变化前的该数据) => { })
  watch( 数据3, (变化后的该数据, 变化前的该数据) => { })
}
```

---

#### 同时监视多个ref定义的简单数据

```js
setup(){
  watch(
    [数据1,数据2,数据3],
    (变化后的该数据, 变化前的该数据) => { }
  )
}
```



### 监视reactive定义的对象

#### 对象的全部属性

```js
setup(){
  watch(
    要监视的对象, (newVal, oldVal) => {}
  )
}
```

监视reactive定义的对象的全部属性据时

- **强制开启深度监视**，deep配置无效

- **无法获取正确的oldValue**，

  oldValue的值和newValue相同

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
    watch(
      person, (newVal, oldVal) => {
        console.log("New:", newVal, "Former:", oldVal);
      },
    );
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



#### 对象的一个属性

若监视reactive定义的对象的某个属性，

需要通过**函数形式**

```js
setup(){
  watch(
    () => 要监视的对象.属性,
    (newVal, oldVal) => {}
  )
}
```

如下：

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



#### 对象的某些属性

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



#### 对象的对象属性中的全部属性

若监视reactive定义的对象的某个对象属性

需要开启深度监视

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
    () => 要监视的对象.对象属性
    (变化后的该数据, 变化前的该数据) => { },
    {
      deep: true, // 深度监视
    }
  )
}
```





### watch的配置

#### immediate

```js
setup(){
  watch( 
    数据,
    (变化后的该数据, 变化前的该数据) => { },
    {
      immediate: true, // 立刻监视
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

---

#### deep

```js
setup(){
  watch( 
    数据,
    (变化后的该数据, 变化前的该数据) => { },
    {
      deep: true, // 深度监视
    }
  )
}
```

- ref 定义的响应式数据

  因为是简单数据，不需要开启深度监视

- reactive 定义的响应式数据

  - 若是监视该数据的全部属性：

    默认强制开启深度监视，deep配置无效

  - 若是监视该数据的某个对象属性的属性：

    需要开启深度监视该对象属性的属性







## watchEffect函数

导入

```js
import { watchEffect } from 'vue'
```



### 与watch的区别

- **watch监视函数**

既要声明要监视变化的属性，也要指明监视的回调函数

监视配置需要额外配置

```js
watch(
  要监视的属性,
  (newVal, oldVal)=>{},
	{// 监视配置}
)
```

- **watchEffect函数**

不用声明要监视哪一个属性，回调函数中用了哪个属性 **watchEffect会自动监视** 用的属性

默认开启了immediate:true 监视配置

```js
watchEffect(()=>{
  // 直接写用到的属性的逻辑
})
```

如下：

```vue
<template>
  <div>
    <h2>{{ sum }}</h2>
    <button @click="sum += 1">sum+1</button>
    <hr />
    <h2>{{ person.name }} {{ person.age }}</h2>
    <button @click="person.name += '!'">name+!</button>
    <button @click="person.age++">age+1</button>
  </div>
</template>

<script>
import { ref, reactive, watchEffect } from "vue";
export default {
  setup() {
    let sum = ref(100);
    let person = reactive({
      name: "andy",
      age: 20,
    });
    
    watchEffect(() => {
      // console.log("watchEffect立即执行");
      console.log(sum.value);
      console.log(person.name);
      console.log(person.age);
    });
    return {
      sum,
      person,
    };
  },
};
</script>
```







## 生命周期

### Vue2 与 Vue3 区别

|       Vue2        |       Vue3        |
| :---------------: | :---------------: |
|   beforeCreate    |   beforeCreate    |
|      created      |      created      |
|    beforeMount    |    beforeMount    |
|      mounted      |      mounted      |
|   beforeUpdate    |   beforeUpdate    |
|      updated      |      updated      |
| **beforeDestory** | **beforeUnmount** |
|   **destoryed**   |   **unmounted**   |



### 1. 配置项形式

和Vue2一样，Vue3中可以配置项的形式书写生命周期

以配置项形式的声明周期时，setup执行比beforeCreate要早

```vue
<template>
  <div>
    <Demo v-if="isShowDemo" />
    <button @click="isShowDemo = !isShowDemo">
      显示/隐藏
  	</button>
  </div>
</template>

<script>
import Demo from "./components/Demo.vue";
import { ref } from "vue";
export default {
  name:'App'
  components: { Demo },

  setup() {
    let isShowDemo = ref(true);
    return {
      isShowDemo,
    };
  },

  beforeUpdate() {
    console.log("beforeUpdate");
  },
  updated() {
    console.log("update");
  },
};
</script>
```

```vue
<template>
  <div>Hello,I'm Demo Component</div>
</template>

<script>
export default {
  name:'Demo'

  beforeCreate() {
    console.log("beforeCreate");
  },
  created() {
    console.log("created");
  },
  beforeMount() {
    console.log("beforeMount");
  },
  mounted() {
    console.log("mounted");
  },
  beforeUnmount() {
    console.log("beforeUnmount");
  },
  unmounted() {
    console.log("unmounted");
  },
};
</script>
```



### 2. 组合API形式

Vue3也提供了Composition API形式的声明周期函数，

此时生命周期函数要写入setup函数中，

但没有beforeCreate与created的组合式API，这两个等于setup函数

|   生命周期    |  组合式API形式  |
| :-----------: | :-------------: |
| beforeCreate  |     setup()     |
|    created    |     setup()     |
|  beforeMount  |  onBeforeMount  |
|    mounted    |    onMounted    |
| beforeUpdate  | onBeforeUpdate  |
|    updated    |    onUpdated    |
| beforeUnmount | onBeforeUnmount |
|   unmounted   |   onUnmounted   |

如下：

```vue
<template>
  <div>Hello</div>
</template>

<script>
import {
  onBeforeMount,
  onBeforeUnmount,
  onMounted,
  onUnmounted,
} from "@vue/runtime-core";
export default {
  setup() {
    console.log("setup");

    onBeforeMount(() => {
      console.log("onbeforeMounted");
    });
    onMounted(() => {
      console.log("onmounted");
    });
    onBeforeUnmount(() => {
      console.log("onbeforeUnmounted");
    });
    onUnmounted(() => {
      console.log("onunmounted");
    });
  },
};
</script>
```



### 配置项与组合API的优先顺序

**一般配置项写法和组合API写法不会同时出现**

若真要同时出现，则先后顺序是：

组合式API的声明周期钩子早于配置项形式的生命周期函数

```js
setup
beforeCreate
created
onBeforeMounted
beforeMount
oMounted
mounted
```

```vue
<template>
  <div>Hello</div>
</template>

<script>
import {
  onBeforeMount,
  onBeforeUnmount,
  onMounted,
  onUnmounted,
} from "@vue/runtime-core";
export default {
  setup() {
    console.log("setup");

    onBeforeMount(() => {
      console.log("onBeforeMounted");
    });
    onMounted(() => {
      console.log("oMounted");
    });
    onBeforeUnmount(() => {
      console.log("onBeforeUnmounted");
    });
    onUnmounted(() => {
      console.log("onUnmounted");
    });
  },
  beforeCreate() {
    console.log("beforeCreate");
  },
  created() {
    console.log("created");
  },
  beforeMount() {
    console.log("beforeMount");
  },
  mounted() {
    console.log("mounted");
  },
  beforeUpdate() {
    console.log("beforeUpdate");
  },
  updated() {
    console.log("update");
  },
  beforeUnmount() {
    console.log("beforeUnmount");
  },
  unmounted() {
    console.log("unmounted");
  },
};
</script>
```





## Hook函数

**复用代码，清晰setup的逻辑**，类似Vue2的mixin

Hook函数就是个自定义的封装函数，

用来将setup中的组合式API进行封装来实现组件中复用

### 实例

如下：获取鼠标点击的xy坐标，并在组件卸载时移除事件监听

```vue
<template>
  <h2>鼠标坐标： 
      X:{{ point.x }} 
      Y:{{ point.y }}
  </h2>
</template>

<script>
import { onBeforeUnmount, onMounted, reactive } from "@vue/runtime-core";
export default {
  setup() {
    let point = reactive({
      x: 0,
      y: 0,
    });

    function getMousePoint(e) {
      console.log(e.pageX, e.pageY);
      point.x = e.pageX;
      point.y = e.pageY;
    }

    onMounted(() => {
      window.addEventListener("click", getMousePoint);
    });
    onBeforeUnmount(() => {
      window.removeEventListener("click", getMousePoint);
    });

    return {
      point,
    };
  },
};
</script>
```



### Hook函数使用

若其他组件也使用该逻辑，

则需要单独以函数形式写出该逻辑的：数据、方法、生命周期

并return返回数据供组件接收

需要的组件导入该函数接收返回值然后供组件使用

- **目录结构**

  Hook函数文件一般以use开头

```js
src
|- components
|- hooks
		|- useMousePoint.js
```

- **Hook函数**

```js
import { 
  onBeforeUnmount, 
  onMounted, 
  reactive } from "@vue/runtime-core";

export default function useMousePonit() {
    // 数据
    let point = reactive({
        x: 0,
        y: 0,
    });

    // 方法
    function getMousePoint(e) {
        console.log(e.pageX, e.pageY);
        point.x = e.pageX;
        point.y = e.pageY;
    }

    // 生命周期
    onMounted(() => {
        window.addEventListener("click", getMousePoint);
    });
    onBeforeUnmount(() => {
        window.removeEventListener("click", getMousePoint);
    });

  	// 返回数据供组件接收
    return point
}
```

- **组件**

```vue
<template>
  <div>
    <h2>鼠标坐标： X:{{ point.x }} Y:{{ point.y }}</h2>
  </div>
</template>

<script>
// 导入自定义 Hook 函数
import useMousePoint from "../hooks/useMousrPonit";
export default {
  setup() {
    // 接收 Hooks 函数的返回值并赋值到属性
    const point = useMousePoint();
    // 返回属性供组件使用
    return {
      point,
    };
  },
};
</script>
```









>## 总结Composition API
>
>组合式API，即一堆需要单独引入的函数
>
>比如：ref、reactive、computed、watch....







## toRef













## 模版 + 组件

模版可以没有根标签

```vue
<template>
  <div></div>
  <div></div>
</template>
```



### Fragment



### Teleport

