# Vue2 代码规范

[[toc]]

## 组件结构规范

```vue
<template>
  <div id="my-component">
    <DemoComponent />
  </div>
</template>

<script>
import DemoComponent from '../components/DemoComponent'

export default {
  name: 'MyComponent',
  components: {
    DemoComponent
  },
  mixins: [],
  props: {},
  data () {
    return {}
  },
  computed: {},
  watch: {}
  created () {},
  mounted () {},
  destroyed () {},
  methods: {},
}
</script>

<style lang="scss" scoped>
#my-component {
}
</style>
复制代码
```

### data

组建中的 `ata` 必须是个函数。

```js
export default {
  data() {
    return {
      foo: "bar",
    };
  },
};
```

### prop

`prop` 定义应该尽量详细。

```js
export default {
  props: {
    status: {
      type: String,
      required: true,
      validator: function(value) {
        return (
          ["syncing", "synced", "version-conflict", "error"].indexOf(value) !==
          -1
        );
      },
    },
  },
};
```

### computed

应该把复杂计算属性分割为尽可能多的更简单的属性。

小的、专注的计算属性减少了信息使用时的假设性限制。

```js
// bad
computed: {
  price: function () {
    var basePrice = this.manufactureCost / (1 - this.profitMargin)
    return (
      basePrice -
      basePrice * (this.discountPercent || 0)
    )
  }
}

// good
computed: {
  basePrice: function () {
    return this.manufactureCost / (1 - this.profitMargin)
  },
  discount: function () {
    return this.basePrice * (this.discountPercent || 0)
  },
  finalPrice: function () {
    return this.basePrice - this.discount
  }
}
```

## 指令语法书写规范

### v-if 和 v-for 互斥

**永远不要把 `v-if` 和 `v-for` 同时用在同一个元素上。**

```html
<!-- 不要这样做，会报错 -->
<ul>
  <li v-for="user in users" v-if="shouldShowUsers" :key="user.id">
    {{ user.name }}
  </li>
</ul>
```

#### 解决方法一：

通过一个**计算属性**, 对 `v-for` 要遍历的原数据进行过滤处理。

如下，`v-for` 遍历对原数据 `users` 处理后的计算属性 `activeUsers`

```html
<ul>
  <li v-for="user in activeUsers" :key="user.id">
    {{ user.name }}
  </li>
</ul>
```

```js
computed: {
  activeUsers: function () {
    return this.users.filter((user) => {
      return user.isActive
    })
  }
}
```

#### 解决方法二：

将 `v-if` 移动至遍历生成元素的父容器元素上。

```html
<ul v-if="shouldShowUsers">
  <li v-for="user in users" :key="user.id">
    {{ user.name }}
  </li>
</ul>
```

### 简写

- 用 **`:`** 表示 **`v-bind:`**
- 用 **`@`** 表示 **`v-on:`**
- 用 **`#`** 表示 **`v-slot:`**

```html
<input :value="newTodoText" :placeholder="newTodoInstructions" />

<input @input="onInput" @focus="onFocus" />

<template #header>
  <h1>Here might be a page title</h1>
</template>

<template #footer>
  <p>Here's some contact info</p>
</template>
```

## 模版书写规范

### 属性值双引号

```html
<input type="text" />
<AppSidebar :style="{ width: sidebarWidth + 'px' }"></AppSidebar>
```

### 有多个属性分行

多个 attribute 的元素应该分多行撰写，每个 attribute 一行。

```html
<img src="https://vuejs.org/images/logo.png" alt="Vue Logo" />

<MyComponent foo="a" bar="b" baz="c" />
```

### 简化模版表达式

组件模板应该只包含简单的表达式，复杂的表达式则应该重构为**计算属性** 或 **方法**。

不推荐的写法：

```js
{
  {
    fullName
      .split(" ")
      .map((word) => {
        return word[0].toUpperCase() + word.slice(1);
      })
      .join(" ");
  }
}
```

推荐写法：

```vue
<template>
  <div>{{ normalizedFullName }}</div>
</template>
```

```js
// 复杂表达式已经移入一个计算属性
computed: {
  normalizedFullName: function () {
    return this.fullName.split(' ').map(function (word) {
      return word[0].toUpperCase() + word.slice(1)
    }).join(' ')
  }
}
```

## 方法函数

被 Vue 实例管理的函数要写成 function 一般形式

不被 Vue 实例管理函数（定时器、Ajax）要写成箭头函数，使其 this 指向 Vue 实例
