# Pinia

![img](https://pinia.vuejs.org/social.png)

[[toc]]

## 简介

Pina 可视作 Vuex 的 v5

Vuex 主要用于 Vue2，并且对 TS 不友好

Vue3 中目前使用的 Vuex 是 v4 版本，但仍有很多问题

<br/>

## 特点

- 同时支持 Vue3、Vue2
- 状态管理只关注 state、getters、actions

> 抛弃了 Vuex 的 Mutations，Actions 同时支持同步异步

- 更符合 Vue3 的 composition API

> 不需要嵌套模块

- **支持 TypeScript**
- 支持 Vue DevTool 开发工具
- 支持插件扩展
- 支持服务端渲染

<br/>

## 安装

```bash
npm i pinia
# 或
yarn add pinia
```

> 目前 pinia@2.0.11

<br/>

## 核心概念

Pina 与 Vuex 几乎一样，但是更简介

- store：保存管理全局状态
- state：储存全局组件，类似组件的`data`
- getters：根据`state`派生数据，类型组件的计算属性`computed`，有缓存特性
- actions：修改状态，类似组件的`methods`，同时支持同步异步修改

> 抛弃了修改同步修改状态的 Mutations

<br/>

## 使用

### createPinia()

通过 `createPinia()`方法创建 Pinia 实例

在项目入口文件`main.ts`中挂载到 Vue 根实例

> 如下：vite + TS 项目

```tsx
import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";

const app = createApp(App);

// 创建 pinia 实例
const pinia = createPinia();

// 挂载到 Vue 根实例
app.use(pinia);
app.mount("#app");
```

---

### 定义 store

详见 [defineStore()](#defineStore)

> 如下：vite + TS 项目

```js
|-src
	|- store
		|- myStore.ts
```

```js
import { defineStore } from "pinia";

export const useMyStore = defineStore("myStore", {
  state: () => {
    return {
      userName: "Andy",
      userAge: 28,
    };
  },
  actions: {
    incrementName() {
      this.userAge++;
    },
  },
});
```

---

### 组件中使用 state

详见 [State](#state)

> 如下：vite + TS 项目

```vue
<template>
  <div>{{ myStore.userName }}</div>
  <div>{{ myStore.userAge }}</div>
</template>

<script lang="ts" setup>
import { useMyStore } from "./store/myStore";
const myStore = useMyStore();
console.log(myStore);
console.log(myStore.userName, myStore.userAge);
</script>
```

<br/>

## Store

是个用于保存管理全局状态的容器

一般创建在 `/src/store`目录下

```js
|- src
	|- store
		|- xxx.ts
		|- xxx.ts
```

---

### defineStore()

通过 `defineStore()` 方法生成并配置 store 容器

该方法返回值是个函数，将其导出供组件中调用获取容器实例

将来 pinia 可能会将所有容器统一挂载到根容器

```tsx
import { defineStore } from "pinia";

export const use容器名 = defineStore("容器唯一ID", 配置项);
```

---

### 对象形式

用对象的形式定义 store 中的配置项

```tsx
import { defineStore } from "pinia";

export const use容器名 = defineStore("自定义容器名", {
  state: () => {
    return {
      状态: 值,
    };
  },

  getters: {},

  actions: {
    函数名() {
      // this.状态名
    },
  },
});
```

> 如下：

```tsx
import { defineStore } from "pinia";

export const useMyStore = defineStore("myStore", {
  state: () => {
    return {
      userName: "Andy",
      userAg: 28,
    };
  },

  getters: {},

  actions: {
    incrementName() {
      this.userAge++;
    },
  },
});
```

---

### 函数形式

也可用类似组件 `setup` 函数的形式定义 store 中的配置项

```tsx
import { defineStore } from "pinia";
import { ref } from "vue";

export const useMyStore = defineStore("myStore", () => {
  const userName = ref("Andy");
  const userAge = ref(28);

  function increment(this: any) {
    userAg.value++;
  }

  return {
    userName,
    userAge,
    increment,
  };
});
```

<br/>

## State

### 定义 state

**必须是函数**，为了避免服务端渲染时交叉请求导致的状态污染

**必须是箭头函数**，为了更好的 TS 类型推导

```tsx
state: () => {
    return {
        userName: 'Andy',
        age: 28
    }
},
```

---

### 获取 state

`defineStore()` 方法返回值是个函数，

组件中调用返回值函数获取对应的 store 容器实例

```vue
<script lang="ts" setup>
import { use容器名 } from "./store/容器文件";
const 容器名 = use容器名();

console.log(容器名.state中的状态名);
</script>
```

> 如下：

```vue
<template>
  <div>{{ myStore.userName }}</div>
  <div>{{ myStore.userAge }}</div>
</template>

<script lang="ts" setup>
import { useMyStore } from "./store/myStore";
const myStore = useMyStore();
console.log(myStore);
console.log(myStore.userName, myStore.userAge);
</script>
```

---

### storeToRefs()

`storeToRef()`用于将解构的状态数据转为响应式

```js
import { storeToRefs } from "pinia";
import { use容器 } from "./store/容器文件";

const 容器 = use容器();
const { 状态, 状态 } = storeToRefs(容器);
```

::: danger 直接解构获取的 state 中的状态不是响应式

因为 pinia 将 state 中的状态都做了 reactive 处理，

reactive 复杂响应式数据解构后获取的是死数据，需要 ref 响应式处理

详见 [Vue 3 reactive](../Vue3/Vue3+Vue-Cli+TS.md#不能解构)

> 如下：button 修改时解构获取的 `userName`、`userAge`不会改变

```vue
<template>
  <div>{{ myStore.userName }}</div>
  <div>{{ myStore.userAge }}</div>
  <hr />
  <div>{{ userName }}</div>
  <div>{{ userAge }}</div>
  <hr />
  <button @click="myStore.userName = 'tom'">changeto Tom</button>
  <button @click="myStore.userAge++">age +1</button>
</template>

<script lang="ts" setup>
import { useMyStore } from "./store/myStore";
const myStore = useMyStore();
const { userName, userAge } = useMyStore();
</script>
```

:::

> 如下：通过`storeToRef()`将解构的状态数据转为响应式

```vue
<template>
  <div>{{ userName }}</div>
  <div>{{ userAge }}</div>
  <hr />
  <button @click="myStore.userName = 'tom'">changeto Tom</button>
  <button @click="myStore.userAge++">age +1</button>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useMyStore } from "./store/myStore";

const myStore = useMyStore();
const { userName, userAge } = storeToRefs(myStore);
</script>
```

---

### 修改 state

可直接修改 state 中状态数据

```js
import { use容器 } from "./store/容器文件";
const 容器 = use容器();

容器.状态 = 新值;
```

> 如下：

```vue
<template>
  <div>{{ myStore.userName }}</div>
  <div>{{ myStore.userAge }}</div>
  <button @click="myStore.userName = 'tom'">changeto Tom</button>
  <button @click="myStore.userAge++">age +1</button>
</template>

<script lang="ts" setup>
import { useMyStore } from "./store/myStore";
const myStore = useMyStore();
</script>
```

---

### $patch()

也可通过 `容器.$patch()` 实现多个状态批量更新

> 一次性修改完后再渲染视图，可性能优化

- **对象写法**

```js
import { use容器 } from "./store/容器文件";
const 容器 = use容器();

const 事件 = () => {
  容器.$patch({
    状态: 新值,
    状态: 新值,
  });
};
```

> 如下：同时修改 `userName`、`userAge`

```vue
<template>
  <div>{{ myStore.userName }}</div>
  <div>{{ myStore.userAge }}</div>
  <hr />
  <button @click="handleChangeState">change</button>
</template>

<script lang="ts" setup>
import { useMyStore } from "./store/myStore";
const myStore = useMyStore();
const handleChangeState = () => {
  myStore.$patch({
    userName: "Tom",
    userAge: myStore.userAge + 1,
  });
};
</script>
```

- **函数写法**

```js
import { use容器 } from "./store/容器文件";
const 容器 = use容器();

const 事件 = () => {
  容器.$patch((state) => {
    状态 = 新值;
    状态 = 新值;
  });
};
```

> 如下：

```vue
<template>
  <div>{{ myStore.userName }}</div>
  <div>{{ myStore.userAge }}</div>
  <div>
    <span v-for="hobby in myStore.userHobbies" :key="hobby">
      {{ hobby }} &nbsp;
    </span>
  </div>
  <hr />
  <button @click="handleChangeState">change</button>
</template>

<script lang="ts" setup>
import { useMyStore } from "./store/myStore";

const myStore = useMyStore();

const handleChangeState = () => {
  myStore.$patch((state) => {
    state.userName = "Tom";
    state.userAge++;
    state.userHobbies.push("angular");
  });
};
</script>
```

<br/>

## Getters

相当于计算属性，用于返回处理后的状态

### 定义 getter

getter 是个函数，其返回值是对 state 中现有状态的处理结果

该函数参数为可选，只能指定 state ，Pinia 会自动推导出返回值的数据类型

若不指定参数则必须指定返回值数据类型，

函数可以用箭头函数定义，但是仅限指定参数时，否则`this`无法使用

```tsx
getters: {
  getter名(state) {
    // state.状态名
    return 对state状态的处理结果
  },
  getter名(): 返回值数据类型 {
    // this.状态名
    return 对state状态的处理结果
  },
}
```

> 如下：

```tsx
state: () => ({
    numbers: [ 1, 2, 3, 4, 5 ],
  }),

getters: {
  even: (state) => (state.numbers.filter(item => item % 2 == 0))
  // 或
  even(): Array<number> {
    return this.numbers.filter(item => item % 2 == 0)
	}
},
```

---

### 获取 getter

在组件中可直接通过容器获取

```js
import { use容器 } from "./store/容器文件";
const 容器 = use容器();

console.log(容器.getter);
```

> 如下：返回计算处理后的 state 中的状态

```tsx
import { defineStore } from "pinia";
export const useMyStore = defineStore("myStore", {
  state: () => ({
    userSKills: [
      {
        type: "FRONT",
        name: "Vue.js",
      },
      {
        type: "SERVER",
        name: "Python",
      },
      {
        type: "FRONT",
        name: "React.js",
      },
    ],
  }),

  getters: {
    frontSkills(state) {
      return state.userSKills.filter((item) => {
        return item.type === "FRONT";
      });
    },
  },
});
```

```vue
<template>
  <span v-for="skill in myStore.frontSkills" :key="skill.name">
    {{ skill.name }} &nbsp;
  </span>
</template>

<script lang="ts" setup>
import { useMyStore } from "./store/myStore";

const myStore = useMyStore();
</script>
```

<br/>

## Actions

用于修改 state 中的状态，支持同步异步修改

类似组件的`methods`

### 定义 action

action 函数定义在 store 的 actions 节点中

函数内可通过`this`直接获取 state 中的状态数据

> 不同用箭头函数，否则内部无法使用 `this`

```js
actions: {
  方法名(){
    // this.state中状态
  },
  方法名(参数: 类型){
    // this.state中状态
  },
}
```

---

### this.$patch()

若在一个 action 函数中同时修改多个状态

建议使用`this.$patch()` 实现批量更新

> 一次性修改完后再渲染视图，可性能优化

```tsx
import { defineStore } from "pinia";

export const useMyStore = defineStore("myStore", {
  state: () => {
    return {
      userName: "Andy",
      userAge: 28,
    };
  },
  actions: {
    changeStateAll() {
      this.$patch((state) => {
        state.userName = "Tom";
        state.userAge++;
      });
    },
  },
});
```

---

### 获取 action

组件中可直接获取使用 store 中的 actions 里定义的函数

```js
import { use容器 } from "./store/容器文件";
const 容器 = use容器();

容器.action中函数名;
```

> 如下：

```tsx
import { defineStore } from "pinia";

export const useMyStore = defineStore("myStore", {
  state: () => {
    return {
      userName: "Andy",
      userAge: 28,
    };
  },
  actions: {
    changeName() {
      this.userName = "Tom";
    },
    incrementAge() {
      this.userAge++;
    },
  },
});
```

```vue
<template>
  <div>{{ myStore.userName }}</div>
  <div>{{ myStore.userAge }}</div>
  <hr />
  <button @click="myStore.changeName">change name</button>
  <button @click="myStore.incrementAge">age +1</button>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useMyStore } from "./store/myStore";

const myStore = useMyStore();
</script>
```

---

### 参数

```js
import { use容器 } from "./store/容器文件";
const 容器 = use容器();

容器.action中函数名(参数);
```

> 如下：将受控组件的输入值追加到 state 的状态中

```tsx
import { defineStore } from "pinia";

export const useMyStore = defineStore("myStore", {
  state: () => {
    return {
      userAge: 28,
      userHobbies: ["vue", "react"],
    };
  },
  actions: {
    incrementAge(num: number) {
      this.userAge += num;
    },
    addHobby(params: string) {
      this.userHobbies.push(params);
    },
  },
});
```

```vue
<template>
  <div>{{ myStore.userAge }}</div>
  <button @click="myStore.incrementAge(10)">age +10</button>
  <hr />
  <span v-for="hobby in myStore.userHobbies" :key="hobby">
    {{ hobby }} &nbsp;
  </span>
  <input v-model="inputValue" />
  <button @click="handlePushHobby">追加</button>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useMyStore } from "./store/myStore";

const myStore = useMyStore();

const inputValue = ref("");
const handlePushHobby = () => {
  if (inputValue.value.trim()) {
    myStore.addHobby(inputValue.value);
    console.log(myStore.userHobbies);
  }
};
</script>
```

---

### 异步修改 state

```tsx
import { defineStore } from "pinia";
import { API接口函数 } from "项目中api接口文件";

export const useMyStore = defineStore("myStore", {
  state: () => ({
    all: [] as 数据类型,
  }),

  actions: {
    async 获取数据的函数() {
      const result = await API接口函数();
      this.all = result;
    },
  },
});
```

```vue
<template>
  <span v-for="item in myStore.all" :key="item">
    {{ item }}
  </span>
</template>

<script lang="ts" setup>
import { use容器 } from "./store/容器文件";
const 容器 = use容器();

// 组件加载后请求API获取数据
容器.action中获取数据的函数();
</script>
```

<br/>

## 修改状态的方式

组件中直接修改

```js
容器.状态 = 新值;
```

组件中通过 [`$patch()`](https://blaxberry.github.io/vuepress-studynotes/notes/front/Vue/States/Pinia.html#$patch) 批量修改

```js
容器.$patch({
  容器.状态: 新值
})

容器.$patch(state => {
  state.状态 = 新值
})
```

store 的 Actions 中定义的方法修改
