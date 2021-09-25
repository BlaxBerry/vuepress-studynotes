# Vue2 + Vuex

<img src="https://ichi.pro/assets/images/max/724/1*kCXAQpCAX2PGtWAjVKEUow.jpeg" />

集中管理组件之间的共享的数据。

储存在VueX中的数据都是响应式的，可以实时保持数据与页面的同步



## 基础使用

安装依赖

```bash
npm i vuex
```

导入

```bash
import Vuex from 'vuex'
Vue.use(Vuex)
```

创建store对象

```js
const store = new Vuex.Store({
  state: { 状态: 值 }
})
```

挂载store对象到Vue实例上

```js
new Vue({
  store, // 挂载后所有组件都可使用 store中的数据了
  render: h => h(App)
}).$mount('#app')
```





## 核心概念

- **State**

- **Mutation**

- **Action**

- **Getter**

```js
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
```



## State

所有共享的数据都要统一存到store的state中

1. 存储共享数据到state

2. 组件访问state中的数据



### 1. 存储数据

因为store对象被挂载到了Vue实例上，store中的数据被作为了全局数据

```js
// 在脚手架的 src/store/index.js 中
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    num: 100,
    name: 'andy',
    age: 28
  }
})
```



### 2. 获取数据

#### 方法一

直接访问 store对象

因为store对象被挂载到了Vue实例上，直接通过this访问获取

```js
this.$store.state.数据名称
```

如下：

```vue
<!-- 组件中 -->
<template>
	<div> {{$store.state.num}} </div>
</template>

<script>
export default {}
</script>

<style></style>
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







## Mutation

Mutation用于变更Store中数据



- VueX中不允许直接修改全局数据

即在组件内不可以直接修改 this.$store中state的数据，

因为store对象别挂载到了vue实例上，store中的state的数据是全局数据，一旦在某个组件中修改了，其他使用了该数据的的地方都会实时被改变，会导致后期维护时难以找到是哪一个组件的哪一个修改了全局数据，所以不推荐不允许

- 虽然通过Mutation函数修改状态会麻烦一些，

  但可以集中监控所有数据的变化



### 定义Mutation函数

在store中添加一个mutations节点，

在其中定义用来修改 state数据的函数，

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







## Action

Action用于处理异步任务

Mutation函数只能写同步代码，异步会导致状态无法实时更新

若要通过异步操作数据，必须通Action的触发Mutation的方式间接变更数据

> 只有Mutation函数可以修改State状态，Action只是调用Mutation



### 定义Action

在store的actions节点中定义Action函数，接受context参数

通过**context.commit**来调用mutations节点中的Mutation函数

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





## Getter

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

<style></style>
```







## axios



action中调用axios，声明周期中dispatch调用action

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
      axios.get('URL').then(({data}) => {
        context.commit('init',data)
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

