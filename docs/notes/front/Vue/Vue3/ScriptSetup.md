# script-setup 语法糖

![img](https://www.ahomtech.com/wp-content/uploads/2019/01/VUE.JS-1024x341.jpg)

[[toc]]

## 简介

Vue3.2 新增的单文件组件中的一个新的脚本类型`<script setup>`

[官方说明](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0040-script-setup.md)

是 `setup()` 函数的语法糖，可以解决单文件组件中组合式 API 的冗长性

```vue
<script lang="ts" setup>
/* 逻辑 */
</script>
```

同`setup()` 函数一样，

标签内可直接编写组合式 API 代码，仅代码在组件加载时调用一次

但是不需要`return` 返回声明的数据

```vue
<script setup>
// imported components are also directly usable in template
import Foo from "./Foo.vue";
import { ref } from "vue";

// write Composition API code just like in a normal setup()
// but no need to manually return everything
const count = ref(0);
const inc = () => {
  count.value++;
};
</script>

<template>
  <Foo :count="count" @click="inc" />
</template>
```

## 基础使用

### 开启语法糖

- VSCode 中关闭 vetur 插件，**使用 Volar 插件**
- `tsconfig.json` 中配置

```json
{
  "compilerOptions": {
    "target": "esnext",
    "useDefineForClassFields": true,
    "module": "esnext",
    "moduleResolution": "node", ///////
    "strict": true, ////////
    "jsx": "preserve",
    "sourceMap": true,
    "resolveJsonModule": true,
    "esModuleInterop": true,
    "lib": ["esnext", "dom"]
  },
  "include": ["src/**/*.ts", "src/**/*.d.ts", "src/**/*.tsx", "src/**/*.vue"]
}
```

---

### 组件 name

`script-setup` 无法指定当前组件的名字

使用的时候以文件名为主

---

### import 导入

导入的组件可直接在`<template>`模版中使用

```vue
<script setup>
import Foo from "./Foo.vue";
</script>

<template>
  <Foo />
</template>
```

---

### computed

```vue
<template>
  <div>{{ 计算属性 }}</div>
</template>

<script lang="ts" setup>
import { computed } from "vue";

const 计算属性 = computed(() => {
  return 处理后的数据;
});
</script>
```

> 如下：

```vue
<template>
  <div v-for="item in hobbies" :key="item">{{ item }}</div>
  <hr />
  <div v-for="item in hobbiesComputed" :key="item">{{ item }}</div>
</template>

<script lang="ts" setup>
import { computed, reactive } from "vue";

const hobbies = reactive(["vue.js", "react.js"]);

const hobbiesComputed = computed(() => {
  return hobbies.map((item) => "前端" + item);
});
</script>
```

---

### slots 和 attrs

```vue
<script setup>
import { useContext } from "vue";

const { slots, attrs } = useContext();
</script>
```

<br/>

## defineProps ()

::: tip 子组件获取父组件传值 props

- 在`<template>`模版中可直接使用 props 中数据
- 在`<script>`中通过`props.数据`使用 props 中数据

:::

---

### 基础使用

```vue
<!-- 子组件 -->
<template>
  <div>{{ 数据 }}</div>
  <div>{{ props.数据 }}</div>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";

const props = defineProps({
  数据: {
    type: 类型,
    default: 默认值,
  },
});
console.log(props.数据);
</script>
```

```vue
<!-- 父组件 -->
<template>
  <子组件 :数据="值"/>
</template>

<script lang="ts" setup>
import 子组件 from "./子组件";
</script>
```

> 如下：

```vue
<!-- 子组件 -->
<template>
  <div>{{ name }}</div>
  <div>{{ $props.name }}</div>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";

const props = defineProps({
  name: {
    type: String,
    default: "默认姓名",
  },
  age: {
    type: Number,
    default: 0,
  },
});

console.log(props.name, props.age);
</script>
```

```vue
<!-- 父组件 -->
<template>
  <Child :name="'Andy'" :age="28" />
</template>

<script lang="ts" setup>
import Child from "./components/Child.vue";
</script>
```

---

### 常用属性

- type

  ：类型检查，用来设定数据的类型

  - String：字符串
  - Number 数字
  - Boolean 布尔
  - Array 数组
  - Object 对象
  - Date 日期
  - Function 函数
  - Symbol 独一无二的值(es6)

- default

  ：默认值

  - 基础数据类型：直接赋值
  - 复杂数据类型：通过工厂函数 `() => 值`

- **required**：是否为必须，默认 false

- **validator**：验证数据内容

> 如下：

```js
import { defineProps, PropType } from "vue";

defineProps({
  EXA: {
    type: String,
    default: "你好",
  },
  EXB: {
    type: Number,
    default: 999,
  },
  EXC: {
    type: Boolean,
    default: true,
  },
  EXD: {
    type: Array,
    default: () => [],
  },
  EXE: {
    type: Object,
    default: () => {
      msg: "hello";
    },
  },
  EXF: {
    type: String,
    default: "你好",
    validator: function(v) {
      return t.includes("好");
    },
  },
});
```

---

### PropType()

用来解决 props 传值为 Array 数组时

子组件内使用 v-for 会报错 item 为 `unknown` 的问题

```tsx
import { defineProps, PropType } from "vue";

type 自定义数组类型 = {
  属性: 类型;
};

const props = defineProps({
  props数据: {
    type: Array as PropType<自定义数组类型[]>,
    default: () => [],
  },
});
```

> 如下：

```vue
<template>
  <ul>
    <li v-for="item in wordsList" :key="item.id">
      <router-link to="/word">
        {{ item.name }}
      </router-link>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { defineProps, PropType } from "vue";

type examplesItem = {
  a: string;
  b: string;
};
type WordsList = {
  name: string;
  id: string;
  examples: Array<WordsListItem> | [];
};

const props = defineProps({
  wordsList: {
    type: Array as PropType<WordsList[]>,
    default: () => [],
  },
});
</script>
```

<br/>

## defineEmit ()

子组件向父组件事件传递

```vue
<!-- 子组件 -->
<template>
  <button @click="ziupdata">按钮</button>
</template>

<script setup>
import { defineEmits } from "vue";

const emits = defineEmits(["自定义函数名"]);
const ziupdata = () => {
  emits("自定义函数名", 值);
};
</script>
```

```vue
<!-- 父组件 -->
<template>
  <子组件 @子组件自定义函数名="父组件自定义函数名"/>
</template>

<script setup>
import 子组件 from "./子组件";

const 父组件自定义函数名 = (data) => {
  console.log(data); // 子组件传递的值
};
</script>
```

> 如下：

```vue
<!-- 子组件 -->
<template>
  <button @click="clickName">change Name</button>
  <button @click="clickAge">change Age</button>
</template>

<script lang="ts" setup>
import { defineEmits } from "vue";

const emits = defineEmits(["onChangeName", "onChangeAge"]);

const clickName = () => {
  emits("onChangeName", "Tom");
};
const clickAge = () => {
  emits("onChangeAge", 30);
};
</script>
```

```vue
<!-- 父组件 -->
<template>
  <div>{{ person.name }} {{ person.age }}</div>
  <Child @onChangeName="onChangeName" @onChangeAge="onChangeAge" />
</template>

<script lang="ts" setup>
import { reactive } from "vue";
import Child from "./components/Child.vue";

const person = reactive({
  name: "默认",
  age: 20,
});

const onChangeName = (value: string) => {
  // console.log(value);
  person.name = value;
};
const onChangeAge = (value: number) => {
  // console.log(value);
  person.age = value;
};
</script>
```

<br/>

## defineExpose ()

组件对外暴露出自己的数据和方法

```vue
<!-- 子组件 -->
<script lang="ts" setup>
import { defineExpose, reactive } from "vue";

const ChildData = reactive({
  name: "Andy",
  age: 28,
});

defineExpose({
  ChildData,
});
</script>
```

```vue
<!-- 父组件 -->
<template>
  <Child ref="childRef" />
</template>

<script lang="ts" setup>
import { onMounted, onUpdated, ref } from "vue";
import Child from "./components/Child.vue";

const childRef = ref();

console.log(childRef.value?.ChildData); // undefined

onMounted(() => {
  console.log(childRef.value.ChildData);
});
onUpdated(() => {
  console.log(childRef.value.ChildData);
});
</script>
```
