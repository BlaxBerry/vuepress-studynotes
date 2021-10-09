# VueX + Vue3

VueX多用于：

- 用户登陆状态、头像、地理位置
- 购物车物品

Vuex 固然好用但不要滥用，如果有些状态严格属于单个组件，最好还是作为组件的局部状态





## 准备配置

1. 安装

```bash
npm install vuex@next --save   
```

2. 创建 Store

```js
src
|- store
		|- index.js
```

```js
import { createStore } from 'vuex'

export default createStore({
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

3. 导入 mian.js

```js
import { createApp } from 'vue'
import App from './App.vue'

import store from './store'

createApp(App)
  .use(store)
  .mount('#app')
```





## 获取状态 state

### 方法一（不推荐）

组件摸板中直接通过 **`$store.state.状态名`** 获取vuex中的状态

如下：

```js
import { createStore } from 'vuex'
export default createStore({
    state: {
        num: 100
    }
})
```

```vue
<template>
	{{ $store.state.num }}
</template>
```



### 方法二

1. 在setup函数中，通过vueX的**组合式API `useStore()`** 访问store，

2. 通过 `store.state` 来获取状态对象

3. 通过 **`computed`** 引用以保留状态中数据的响应性

   （否则虽然修改了数据，模版中不会实时响应数据的变化）

```vue
<template>
 	{{ num }}
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";

export default {
  setup() {
    
    const store = useStore();
    let num = computed(() => store.state.num);

    return {
      num
    };
  },
};
</script>
```







## 修改状态 mutation

### 直接修改

1. 在setup函数中，通过vueX的**组合式API `useStore()`** 访问store

2. 通过 `store.commit` 方法触发状态变更的mutation中定义的方法

```js
import { createStore } from 'vuex'
export default createStore({
    state: {
        num: 100
    },
    mutations: {
        sub(state){
            state.num--
        },
        add(state){
            state.num++
        }
    }
})
```

```vue
<template>
  {{ num }}
  <button @click="add" v-text="'+1'"/>
  <button @click="sub" v-text="'-1'"/>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";

export default {
  setup() {
    const store = useStore();
    let num = computed(() => store.state.num);

    function add() {
        store.commit('add')
    }
    function sub() {
        store.commit('sub')
    }

    return {
      num,
      add,
      sub,
    };
  },
};
</script>
```



### 传参

在通过 `store.commit` 方法触发状态变更时，

将要传递的参数作为store.commit的第二个参数

可以用对象的方式传递多个参数

```js
store.commit("mutaions的方法名", 参数);
```

如下：

```js
import { createStore } from 'vuex'
export default createStore({
  state: {
    num: 100
  },
  mutations: {
    increase(state, params) {
      state.num += params.num
    },
    decrease(state, params) {
      state.num -= params.num
    }
  }
})
```

```vue
<template>
  <div>B</div>

  <h1>{{ num }}</h1>
  <button @click="add" v-text="' +1 '" />
  <button @click="sub" v-text="' -1 '" />
</template>

<script>
import { computed } from "@vue/reactivity";
import { useStore } from "vuex";
  
export default {
  setup() {
    let store = useStore();
    let num = computed(() => {
      return store.state.num;
    });
    // 要传递的参数
    let params = {
        num:10
    };

    function add() {
      store.commit("increase", params);
    }
    function sub() {
      store.commit("decrease", params);
    }

    return {
      num,
      add,
      sub,
    };
  },
};
</script>
```





## Getter

可理解为VueX中的计算属性

若需要获取经过处理后的定义在state中数据时：

- 可以在组件的计算属性中，先获取state数据然后再修改

  但是多个组件中复用，代码重复，且不利于日后修改

```js
computed: {
  weekDate () {
    return moment(this.$store.state.date).format('dddd'); 
  }
}
```

- 但若在多个组件中复用的话，最好通过getters

  直接在store中修改，需要的组件直接通过getter获取处理后的数据

  

### 方法一

1. 在setup函数中，通过vueX的**组合式API `useStore()`** 访问store，

2. 通过 `store.getters` 来获取修改后的状态对象

3. 通过 **`computed`** 引用以保留状态中数据的响应性

   （否则虽然修改了数据，模版中不会实时响应数据的变化）

```js
import { createStore } from 'vuex'

export default createStore({
    state: {
        num: 100
    },
  	getters: {
        numPlus: (state) => {
            return state.num += 10
        },
        numStr: (state) => {
            return state.num.toString()
        }
    }
})
```

```vue
<template>
	<h1>{{ numStr+1 }}</h1>  
  <h1>{{ numPlus+1 }}</h1>
</template>

<script>
import { computed } from "@vue/reactivity";
import { useStore } from "vuex";
  
export default {
  setup() {
    const store = useStore();

    let numStr = computed(() => {
      return store.getters.numStr;
    });
    let numPlus = computed(() => {
      return store.getters.numPlus;
    });

    return { numStr, numPlus };
  },
};
</script>
```



### 方法二

将 store 中的 getter **映射为该组件的计算属性**

```js
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters('getter名')
  }
}
```

```js
...mapGetters({
  自定义名: 'getter名'
})
```

