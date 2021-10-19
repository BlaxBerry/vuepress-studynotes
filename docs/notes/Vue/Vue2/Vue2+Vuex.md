# Vuex

<img src="https://ichi.pro/assets/images/max/724/1*kCXAQpCAX2PGtWAjVKEUow.jpeg"  />

集中管理组件之间的共享的数据。也是组件间通信的一种方式。

储存在VueX中的数据都是响应式的，可以实时保持数据与页面的同步

::: tip 何时使用：

- 多个不同组件依赖同一状态时

- 不同组件的行为需要变更同一状态时

::: 



## 核心概念

- **State**

- **Mutations**
  
- **Actions**
  
- **Getters**

![](https://vuex.vuejs.org/vuex.png)

- 数据交给Vuex的`State对象`管理
- 组件通过`dispatch`方法调用Vuex的`Actions对象`中的动作`action`<br>
  然后`action`通过`commit`方法调用Vuex的`Mutations对象`中的`mutation`
- 组件也可直接通过`commit`方法调用Vuex的`Mutations对象`中的`mutation`
- `mutation`操纵Vuex的`State对象`中的数据
- Vuex自动渲染页面




## 安装导入

1. **安装依赖**

脚手架搭建项目时通过配置项自动配置，或手动下载配置

```bash
npm i vuex
```

2. **作为Vue插件引入**

```bash
import Vuex from 'vuex'
Vue.use(Vuex)
```

3. **创建store对象**

Vuex通过**store**管理`State对象`、`Action对象`、`Mutations对象`

```js
const states = {}
const mutations = {}
const actions = {}

const store = new Vuex.Store({
  state,
  mutations,
  actions,
})
```
因为Vuex管理的数据是被多个组件通用，`store`需要挂在到全局Vue实例上

```js
new Vue({
  store, 
  render: h => h(App)
}).$mount('#app')
```

因为一个项目里可能会有很多数据被Vuex管理操作<br>
1. 要以单独文件的形式将store写入脚手架下的 `src/store/index.js`，并暴露store
2. 然后将暴露出的store引入Vue脚手架的`main.js`
```js
// src/store/index.js
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
```
```js
// main.js
import Vue from 'vue'
import App from './App.vue'
Vue.config.productionTip = false

import store from './store'

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
```


## State

所有共享的数据都要统一存到store的State对象中


### 1. 存储数据

因为store对象被挂载到了Vue实例上，store中的数据被作为了全局数据

```js
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: { 状态: 值 }
})
```
> 如下：
>```js
>// 在脚手架的 src/store/index.js 中
>import Vue from 'vue'
>import Vuex from 'vuex'
>
>Vue.use(Vuex)
>
>export default new Vuex.Store({
>  state: {
>    num: 100,
>    name: 'andy',
>    age: 28
>  }
>})
>```



### 2. 获取数据

#### 方法一

直接访问store对象，并获取其state中的数据

因为store对象被挂载到了Vue实例上，直接通过`this.store`获取，模版中可通过`$store`获取

```js
this.$store.state.数据名称
```

```vue
<!-- 组件中 -->
<template>
	<div> {{$store.state.num}} </div>
</template>

<script>
export default {}
</script>

```

---

#### 方法二

通过vuex的mapState函数按需获取数据

导入mapState函数后，将数据映射为该组件的computed计算属性

```js
import { mapState } from 'vuex'
```

```js
computed: {
  ...mapState(['数据'])
}
```

如下：

```vue
<!-- 组件中 -->
<template>
  <div>	{{num}} </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['num'])
  }
}
</script>

<style></style>
```







## Mutations

Mutation函数用于变更Store中数据

VueX中不允许直接修改全局数据，在组件内不可以直接修改`this.$store.state`中的数据

必须通过`store`中`mutaions`节点中的`Mutation函数`，这样可以集中监控所有数据的变化

>因为store对象别挂载到了vue实例上，store中的state的数据是全局数据，一旦在某个组件中修改了，其他使用了该数据的的地方都会实时被改变，会导致后期维护时难以找到是哪一个组件的哪一个地方修改了全局数据，所以不推荐不允许



### 定义Mutation函数

在store中添加一个`mutations`节点，

在其中定义用来修改 state数据的`Mutaion`函数，

函数接受state作为形参，在该函数修改 state中的数据

```js
export default new Vuex.Store({
  state: {
    数据: 值,
  },
  mutations: {
    函数名(state) {
      // 操作 state.数据
    }
  }
})
```

```js
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        num: 100,
    },
    mutations: {
        add(state) {
            state.num ++
        }
    }
})
```

---

#### 设定接受参数

在store中定义用来修改状态的Mutaion函数时，设定第二个参数

第一个参数永远是存放状态的state

第二个参数是要组件调用该Mutaion函数时传递的修改参数

```js
export default new Vuex.Store({
  state: {
    数据: 值,
  },
  mutations: {
    函数名(state, params) {
      // 操作 state.数据
    }
  }
})
```

```js
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        num: 100,
    },
    mutations: {
        add(state, params) {
            state.num += params
        }
    }
})
```



### 调用Mutaion函数

#### 方法一

组件中通过 **this.$store.commit( )** 调用mutaioins中指定函数

```js
methods:{
    事件函数名(){
      this.$store.commit('Mutation函数')
    }
  }
```

如下：

```js
export default new Vuex.Store({
    state: {
        num: 100,
    },
    mutations: {
        add(state) {
            state.num ++
        }
    }
})
```

```vue
<template>
    <div>
      <h2> {{ $store.state.num }} </h2>
      <button @click="click">+</button>
  </div>
</template>

<script>
export default {
    methods:{
        click(){
           this.$store.commit('add')
        }
    }
}
</script>

<style></style>
```

----

#### 方法二

通过**mapMutations函数**将Mutaion函数映射为组件method方法

导入mapMutations 函数

```js
import { mapMutations } form 'vuex'
```

将导入的Mutaion函数映射为组建的method方法

即放到了组件实例对象上

```js
methods:{
  ...mapMutations(['Mutation函数','Mutation函数'])
}
```

如下：

```vue
<template>
  <div>
    <h2>{{ num }}</h2>
    <button @click="add">-</button>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  computed: {
    ...mapState(["num"]),
  },
  methods:{
    ...mapMutations(['add']),
    /*click(){
        this.add()
    }*/
  }
};
</script>

<style></style>
```



### 调用并传参数

#### 方法一

组件中通过 **this.$store.commit( )** 调用Mutaioin函数时，

传递第二个参数作为修改参数

```js
methods:{
    事件函数名(参数){
      this.$store.commit('Mutation函数',参数)
    }
  }
```

如下：

```js
export default new Vuex.Store({
    state: {
        num: 100,
    },
    mutations: {
        add(state, params) {
            state.num += params
        }
    }
})
```

```vue
<template>
  <div>
    <h2>{{ $store.state.num }}</h2>
    <button @click="click(99)">+</button>
  </div>
</template>

<script>
export default {
  methods: {
    click(n) {
      this.$store.commit("add", n);
    },
  },
};
</script>

<style></style>
```

---

#### 方法二

```js
methods:{
  ...mapMutations(['Mutation函数']),
  事件(参数){
    this.Mutation函数(参数n)
  }
}
```

如下：

```js
export default new Vuex.Store({
    state: {
        num: 100,
    },
    mutations: {
        add(state, params) {
            state.num += params
        }
    }
})
```

```vue
<template>
  <div>
    <h2>{{ num }}</h2>
    <button @click="add(99)">-</button>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  computed: {
    ...mapState(["num"]),
  },
  methods:{
    ...mapMutations(['add']),
    /*click(n){
        // console.log(this.add);
        this.add(n)
    }*/
  }
};
</script>

<style></style>
```







## Actions

`Mutation函数`只能写同步代码，异步会导致状态无法实时更新

若要通过异步任务来操作数据，必须通`Action函数`来触发`Mutation函数`的方式来变更数据

> 只有Mutation函数可以修改State状态，Action函数只是调用Mutation函数



### 定义Action

在store的`actions`节点中定义`Action`函数，

函数接受参数`context`，通过**context.commit**来调用`mutations`节点中的`Mutation函数`

```js
export default new Vuex.Store({
  state: {
    数据: 值,
  },
  mutations: {
    函数名(state) {
      // 同步操作 state.数据
    }
  },
  actions: {
    函数名(context){
      // 异步操作调用 mutations中的 Mutaion函数
      context.commit('Mutation函数')
    }
  }
})
```

```js
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        num: 100,
    },
    mutations: {
        add(state) {
            state.num ++
        }
    },
    actions: {
        addAsync(context) {
            setTimeout(() => {
                context.commit('add')
            }, 1000)
        }
    }
})
```

#### 设定接受参数

定义Action函数，除了接受context外，再接收第二个参数

第二个参数是组件调用Action函数时的传参

```js
export default new Vuex.Store({
  state: {
    数据: 值,
  },
  mutations: {
    函数名(state,参数) {
      // 同步操作 state.数据
    }
  },
  actions: {
    函数名(context,参数){
      // 异步操作调用 mutations中的 Mutaion函数
      context.commit('Mutation函数',参数)
    }
  }
})
```

```js
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        num: 100,
    },
    mutations: {
        add(state,params) {
            state.num += params
        }
    },
    actions: {
        addAsync(context,params) {
            setTimeout(() => {
                context.commit('add',params)
            }, 1000)
        }
    }
})
```



### 触发Action

#### 方法一

通过store的 **dispatch() 函数** 调用触发Action

```js
methods:{
  事件(){
    this.$store.dispatch('Action函数名')
  }
}
```

如下：

```js
export default new Vuex.Store({
    state: {
        num: 100,
    },
    mutations: {
        add(state) {
            state.num ++
        }
    },
    actions: {
        addAsync(context) {
            setTimeout(() => {
                context.commit('add')
            }, 1000)
        }
    }
})
```

```vue
<template>
  <div>
    <h2>{{ $store.state.num }}</h2>
    <button @click="click">+</button>
  </div>
</template>

<script>
export default {
  methods: {
    click() {
      this.$store.dispatch('addAsync')
    },
  },
};
</script>

<style></style>
```

---

#### 方法二

通过**mapActions函数**将Action函数映射为组件method方法

导入mapActions 函数

```js
import { mapActions } form 'vuex'
```

将导入的Action函数映射为组件的method方法

即放到了组件实例对象上，组件可直接通过this获取，或在摸板中直接使用

```js
methods:{
  ...mapMutations(['Action函数','Action函数'])
}
```

如下：

```js
export default new Vuex.Store({
    state: {
        num: 100,
    },
    mutations: {
        add(state) {
            state.num ++
        }
    },
    actions: {
        addAsync(context) {
            setTimeout(() => {
                context.commit('add')
            }, 1000)
        }
    }
})
```

```vue
<template>
  <div>
    <h2>{{ num }}</h2>
    <button @click="addAsync">-</button>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  computed: {
    ...mapState(["num"]),
  },
  methods:{
    ...mapActions(['addAsync']),
  }
};
</script>

<style></style>
```



### 传递参数

#### 方法一

通过store的 **dispatch() 函数** 调用触发Action时，传入第二个参数

```js
methods:{
  事件(参数){
    this.$store.dispatch('Action函数名',参数)
  }
}
```

如下：

```js
export default new Vuex.Store({
    state: {
        num: 100,
    },
    mutations: {
        add(state,params) {
            state.num += params
        }
    },
    actions: {
        addAsync(context,params) {
            setTimeout(() => {
                context.commit('add',params)
            }, 1000)
        }
    }
})
```

```vue
<template>
  <div>
    <h2>{{ $store.state.num }}</h2>
    <button @click="click(99)">+</button>
  </div>
</template>

<script>
export default {
  methods: {
    click(n) {
      this.$store.dispatch('addAsync',n)
    },
  },
};
</script>

<style></style>
```

---

#### 方法二

调用 **dispatch() 函数** 来触发Action时，传递第二个参数

```js
methods:{
  事件(参数){
    this.$store.dispatch('Action函数名', 参数)
  }
}
```

如下：

```js
export default new Vuex.Store({
    state: {
        num: 100,
    },
    mutations: {
        add(state,params) {
            state.num += params
        }
    },
    actions: {
        addAsync(context,params) {
            setTimeout(() => {
                context.commit('add',params)
            }, 1000)
        }
    }
})
```

```vue	
<template>
  <div>
    <h2>{{ num }}</h2>
    <button @click="addSync(99)">-</button>
  </div>
</template>

<script>
import { mapState,mapActions } from "vuex";
export default {
  computed: {
    ...mapState(["num"]),
  },
  methods:{
    ...mapActions(['addAsync']),
    click(){
        this.addAsync()
    }
  }
};
</script>

<style></style>
```

### Ajax请求

`Action`中发起Ajax请求( Axios )，然后通过`commit函数`调用`Mutation`修改`State`中状态数据

```js
export default new vue.Store({
  state:{
    list:[]
  },
  mutations:{
    init(state, data){
      state.list = data
    }
  },
  actions:{
    getList(context){
      axios.get('URL').then(() => {
        context.commit('init', data)
      })
    }
  }
})
```

```vue
<template>
  <div>
    {{ list }}
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed:{
    ...mapState(['list'])
  },
  created(){
    this.$store.dispatch('getList')
  }
};
</script>

<style></style>
```





## Getters

用于对state中的数据进行加工处理后形成新的数据（包装）

不会修改原数据，是生成一个新数据

State数据变化后，Getter生成的新数据也响应式变化



### 定义Getter

```js
export default new Vuex.Store({
    state: {
        num: 100,
    },
    getters: {
      函数名: state => {
        return // 处理 state.数据 生成的新数据
      }
    }
})
```

```js
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        name: 'andy',
        age: 28
    },
    getters:{
        getName:state=>{
            return state.name + " Tommy"
        }
    }
})
```



### 获取Getter

#### 方法一

```js
this.$store.getters.函数名
```

如下：

```js
export default new Vuex.Store({
    state: {
        name: 'andy',
    },
    getters:{
        getName:state=>{
            return state.name + " Tommy"
        }
    }
})
```

```vue
<template>
  <div>
    {{ $store.getters.getName }}
  </div>
</template>

<script>
export default {};
</script>

<style></style>
```

---

#### 方法二

通过 **mapGetters函数** 将Getter函数映射为组件的一个计算属性

```js
import { mapGetters } from 'vuex'
```

```js
computed: {
  ...mapGetters(['Getter函数名'])
}
```

如下：

```js
export default new Vuex.Store({
    state: {
        name: 'andy',
    },
    getters:{
        getName:state=>{
            return state.name + " Tommy"
        }
    }
})
```

```vue
<template>
  <div>
    {{ getName }}
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["getName"]),
  }
};
</script>
```




## Module

Vuex的模块化开发

为了防止store对象变得臃肿，Vuex将store分割成**模块（module）**

每个模块拥有自己的`state`、`mutations`、`actions`、`getters`

### 定义Module模块
实际开发时可将模块写入单独文件中，然后引入store
```js
const moduleA = {
  namespaced: true, // 开启命名空间
  state: {},
  mutaions: {},
  actions: {},
  getters: {}
}
const moduleB = {
  namespaced: true, // 开启命名空间
  state: {},
  mutaions: {},
  actions: {},
  getters: {}
}

import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    moduleA,
    moduleB,
  }
})
```

### 获取Module的数据

#### 通过this.$store的场合

```js
this.$store.state.模块名.该模块中的state

this.$store.getters['模块名/该模块中的getter']

this.$store.commit('模块名/该模块的mutation', 参数)

this.$store.dispatch('模块名/该模块的ation', 参数)
```
---
#### map函数的场合

```js
computed: {
  ...mapState('模块名', ['该模块中的state','该模块中的state']),
  ...mapGetters('模块名', ['该模块中的getter','该模块中的getter'])
},
methods: {
  ...mapMutations('模块名', {
    组件方法名: '该模块的mutation',
    组件方法名: '该模块的mutation'
  }),
  ...mapActions('模块名', {
    组件方法名: '该模块的action',
    组件方法名: '该模块的action'
  })
}
```