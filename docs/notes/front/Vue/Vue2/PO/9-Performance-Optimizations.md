# Vue2 的九种性能优化技巧

## 1. Functional Component

::: tip Functional Component
函数式组件
:::

before:

```vue
<template>
  <div class="cell">
    <div v-if="value" class="on"></div>
    <section v-else class="off"></section>
  </div>
</template>

<script>
export default {
  props: ["value"],
};
</script>
```

after:

```vue
<template functional>
  <div class="cell">
    <div v-if="props.value" class="on"></div>
    <section v-else class="off"></section>
  </div>
</template>
```

| Before                                                                                                                                                                                                                                 |                                                                                                                     After                                                                                                                     |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| ![](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9tbWJpei5xcGljLmNuL21tYml6X3BuZy9nbXZuNWJCYVcwOWFoaWNKSVd5Qm1iYjhMWlB0S2tteHdUbW1QMURYeVNJQ3AxTk1WaDY2Vzg3UjdmYmtCNkpWd0Z4d0lBMWw0ZjVJakpsSXBObG9HTGcvNjQw?x-oss-process=image/format,png) | ![](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9tbWJpei5xcGljLmNuL21tYml6X3BuZy9nbXZuNWJCYVcwOWFoaWNKSVd5Qm1iYjhMWlB0S2tteHdmaWNTbDh1dGlhaWN3MThBN1pqV3poeDBFZG94SnRWMWliMU9BbUg1OGtIMEx6aWM0cGNHVjVocjBndy82NDA?x-oss-process=image/format,png) |

## 2. Child Component Splitting

::: tip Splitting Child Component
拆分子组件
:::

before：

```vue
<template>
  <div :style="{ opacity: number / 300 }">
    <div>{{ heavy() }}</div>
  </div>
</template>

<script>
export default {
  props: ["number"],
  methods: {
    heavy() {
      const n = 100000;
      let result = 0;
      for (let i = 0; i < n; i++) {
        result += Math.sqrt(Math.cos(Math.sin(42)));
      }
      return result;
    },
  },
};
</script>
```

after:

```vue
<template>
  <div :style="{ opacity: number / 300 }">
    <ChildComp />
  </div>
</template>

<script>
export default {
  components: {
    ChildComp: {
      methods: {
        heavy() {
          const n = 100000;
          let result = 0;
          for (let i = 0; i < n; i++) {
            result += Math.sqrt(Math.cos(Math.sin(42)));
          }
          return result;
        },
      },
      render(h) {
        return h("div", this.heavy());
      },
    },
  },
  props: ["number"],
};
</script>
```

| Before                                                                                                                                                                                                                                       |                                                                                                                   After                                                                                                                    |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| ![](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9tbWJpei5xcGljLmNuL21tYml6X3BuZy9nbXZuNWJCYVcwOWFoaWNKSVd5Qm1iYjhMWlB0S2tteHcyaWNrNVhYSmlhWWsyWTVTUWVvczZpYmliTW9CMFFiMElhekxrcWtXbHVLajBwZEpVYk1qQkpPWGpnLzY0MA?x-oss-process=image/format,png) | ![](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9tbWJpei5xcGljLmNuL21tYml6X3BuZy9nbXZuNWJCYVcwOWFoaWNKSVd5Qm1iYjhMWlB0S2tteHc5RFFqdmQzaWJIdVFYMHM3clZaYkI3bTJmNHZneEIycGF4SmliQzVhQVducnMwZ2VtdFJsNEJpYmcvNjQw?x-oss-process=image/format,png) |

## 3. Local Variables

::: tip Local Variables
局部变量
:::

before:

```vue
<template>
  <div :style="{ opacity: start / 300 }">{{ result }}</div>
</template>

<script>
export default {
  props: ["start"],
  computed: {
    base() {
      return 42;
    },
    result() {
      let result = this.start;
      for (let i = 0; i < 1000; i++) {
        result +=
          Math.sqrt(Math.cos(Math.sin(this.base))) +
          this.base * this.base +
          this.base +
          this.base * 2 +
          this.base * 3;
      }
      return result;
    },
  },
};
</script>
```

after:

```vue
<template>
  <div :style="{ opacity: start / 300 }">{{ result }}</div>
</template>

<script>
export default {
  props: ["start"],
  computed: {
    base() {
      return 42;
    },
    result({ base, start }) {
      let result = start;
      for (let i = 0; i < 1000; i++) {
        result +=
          Math.sqrt(Math.cos(Math.sin(base))) +
          base * base +
          base +
          base * 2 +
          base * 3;
      }
      return result;
    },
  },
};
</script>
```

| Before                                                                                                                                                                                                                                 |                                                                                                                   After                                                                                                                   |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| ![](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9tbWJpei5xcGljLmNuL21tYml6X3BuZy9nbXZuNWJCYVcwOWFoaWNKSVd5Qm1iYjhMWlB0S2tteHdKcjJBek1UZEc5U05UM2N2UG1TWTRVa2duY2N1azNsR1o1S1o2UEQ4MEVodTFvTmhwQUdjUkEvNjQw?x-oss-process=image/format,png) | ![](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9tbWJpei5xcGljLmNuL21tYml6X3BuZy9nbXZuNWJCYVcwOWFoaWNKSVd5Qm1iYjhMWlB0S2tteHdTN2NhUFZIUFNMU21RTGpRZGx6aWFET0QxUnZraFlrbWtONFl2VEpHRlVpY1ZtUEc1RVR4TXFWQS82NDA?x-oss-process=image/format,png) |

## 4. Reuse DOM with v-show

::: tip Reuse DOM with v-show
通过 `v-show` 复用 DOM
:::
before:

```vue
<template functional>
  <div class="cell">
    <div v-if="props.value" class="on">
      <Heavy :n="10000" />
    </div>
    <section v-else class="off">
      <Heavy :n="10000" />
    </section>
  </div>
</template>
```

after:

```vue
<template functional>
  <div class="cell">
    <div v-show="props.value" class="on">
      <Heavy :n="10000" />
    </div>
    <section v-show="!props.value" class="off">
      <Heavy :n="10000" />
    </section>
  </div>
</template>
```

| Before                                                                                                                                                                                                                                    |                                                                                                                  After                                                                                                                   |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| ![](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9tbWJpei5xcGljLmNuL21tYml6X3BuZy9nbXZuNWJCYVcwOWFoaWNKSVd5Qm1iYjhMWlB0S2tteHcybW04TmVpY1hVdjRrWFdUanRvZWVhQjdaeFFTOVkyQng4Y2RkczdZTW9qRUJHT2ljM0RINVk2Zy82NDA?x-oss-process=image/format,png) | ![](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9tbWJpei5xcGljLmNuL21tYml6X3BuZy9nbXZuNWJCYVcwOWFoaWNKSVd5Qm1iYjhMWlB0S2tteHdHMmxMcElJZTdvNkJsWm1jaWFFbEhIYmwzc3V6M1dxUUdmdkJmSFJObVRxS0dRTDBZbFcwdmt3LzY0MA?x-oss-process=image/format,png) |

`v-if`不断删除和创建函数新的 DOM，`v-show`仅仅是在更新现有 DOM 的显隐值，

所以`v-show`的开销要比`v-if`小的多，当其内部 DOM 结构越复杂，性能的差异就会越大。

使用`v-show`的时候，所有分支内部的组件都会渲染，对应的生命周期钩子函数都会执行，

而使用`v-if`的时候，没有命中的分支内部的组件是不会渲染的，对应的生命周期钩子函数都不会执行。

## 5. KeepAlive

::: tip KeepAlive
使用 KeepAlive 组件缓存 DOM
:::
before:

```vue
<template>
  <div id="app">
    <router-view />
  </div>
</template>
```

after:

```vue
<template>
  <div id="app">
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>
```

| Before                                                                                                                                                                                                                                 |                                                                                                                  After                                                                                                                   |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| ![](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9tbWJpei5xcGljLmNuL21tYml6X3BuZy9nbXZuNWJCYVcwOWFoaWNKSVd5Qm1iYjhMWlB0S2tteHdwRVljTlY5SUUzT0xRdTdRZTRYeGNLZlVEZVZQc3A5UWdBdkh1WHFCT0I5ZW9jQVI3bDVxWUEvNjQw?x-oss-process=image/format,png) | ![](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9tbWJpei5xcGljLmNuL21tYml6X3BuZy9nbXZuNWJCYVcwOWFoaWNKSVd5Qm1iYjhMWlB0S2tteHdaT1E1MGoyRlM5YkRCbXFpYTZoSWJ5dUg4M3YwVDFnUDFJRWZUblVTeVYyQXg5S3lKWjJZeE13LzY0MA?x-oss-process=image/format,png) |

在非优化场景下，我们每次点击按钮切换路由视图，都会重新渲染一次组件，渲染组件就会经过组件初始化，render、patch 等过程，如果组件比较复杂，或者嵌套较深，那么整个渲染耗时就会很长。

使用 KeepAlive 后，被 KeepAlive 包裹的组件在经过第一次渲染后，的 vnode 以及 DOM 都会被缓存起来，然后再下一次再次渲染该组件的时候，直接从缓存中拿到对应的 vnode 和 DOM，然后渲染，并不需要再走一次组件初始化，render 和 patch 等一系列流程，减少了 script 的执行时间，性能更好。

但是使用 KeepAlive 组件并非没有成本，因为它会占用更多的内存去做缓存，这是一种典型的空间换时间优化思想的应用。

## 6. Deferred Features

::: tip Deferred Features
使用 Deferred 组件延时分批渲染组件
:::
before:

```vue
<template>
  <div class="deferred-off">
    <VueIcon icon="fitness_center" class="gigantic" />

    <h2>I'm an heavy page</h2>

    <Heavy v-for="n in 8" :key="n" />

    <Heavy class="super-heavy" :n="9999999" />
  </div>
</template>
```

after:

```vue
<template>
  <div class="deferred-on">
    <VueIcon icon="fitness_center" class="gigantic" />

    <h2>I'm an heavy page</h2>

    <template v-if="defer(2)">
      <Heavy v-for="n in 8" :key="n" />
    </template>

    <Heavy v-if="defer(3)" class="super-heavy" :n="9999999" />
  </div>
</template>

<script>
import Defer from "@/mixins/Defer";

export default {
  mixins: [Defer()],
};
</script>
```

| Before                                                                                                                                                                                                                                 |                                                                                                                  After                                                                                                                   |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| ![](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9tbWJpei5xcGljLmNuL21tYml6X3BuZy9nbXZuNWJCYVcwOWFoaWNKSVd5Qm1iYjhMWlB0S2tteHdic1JTZ2x5R2hQTEF6c01qdVByVDBUY3V2bENmOUZjeHJHSHVJZlc2RXl0RVdjNlFWTGNDT1EvNjQw?x-oss-process=image/format,png) | ![](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9tbWJpei5xcGljLmNuL21tYml6X3BuZy9nbXZuNWJCYVcwOWFoaWNKSVd5Qm1iYjhMWlB0S2tteHdORkppYjNJbVpQZ1VnUk9Td1dBV3RGOGU3WGhBVVZSZWNGeG9wWFl0cTdnQWtJSXNuY0EyY0xRLzY0MA?x-oss-process=image/format,png) |

优化前后的差距主要是后者使用了 Defer 这个 mixin。Defer 的主要思想就是把一个组件的一次渲染拆成多次，它内部维护了 displayPriority 变量，然后在通过 requestAnimationFrame 在每一帧渲染的时候自增，最多加到 count。然后使用 Defer mixin 的组件内部就可以通过`v-if="defer(xxx)"`的方式来控制在 displayPriority 增加到 xxx 的时候渲染某些区块了。

当有渲染耗时的组件，使用 Deferred 做渐进式渲染是不错的注意，它能避免一次 render 由于 JS 执行时间过长导致渲染卡住的现象。

## 7. Time Slicing

::: tip Time Slicing
时间片切割技术
:::
before:

```js
fetchItems ({ commit }, { items }) {
  commit('clearItems')
  commit('addItems', items)
}
```

after:

```js
fetchItems ({ commit }, { items, splitCount }) {
  commit('clearItems')
  const queue = new JobQueue()
  splitArray(items, splitCount).forEach(
    chunk => queue.addJob(done => {
      // 分时间片提交数据
      requestAnimationFrame(() => {
        commit('addItems', chunk)
        done()
      })
    })
  )
  await queue.start()
}
```

| Before                                                                                                                                                                                                                                        |                                                                                                                 After                                                                                                                  |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| ![](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9tbWJpei5xcGljLmNuL21tYml6X3BuZy9nbXZuNWJCYVcwOWFoaWNKSVd5Qm1iYjhMWlB0S2tteHdYTnBEajhLYlFsaWJpYnF2SWlhZDV4ckRKa2xWaWFFc2liQXRrOXdLNlJhbzNJWEtwUUhVNXVjN1pGUS82NDA?x-oss-process=image/format,png) | ![](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9tbWJpei5xcGljLmNuL21tYml6X3BuZy9nbXZuNWJCYVcwOWFoaWNKSVd5Qm1iYjhMWlB0S2tteHdXeXc5Wks5WFo1MVBmZTRhbmVCTE9yY1c5Qm5sa0hmRU5BYkYwbE8zU1d4a2NvbEdHVnZLOXcvNjQw?x-oss-process=image/format,png) |

虽然优化前总的 script 执行时间要比优化后的还要少一些，但是从实际的观感上看，优化前点击提交按钮，页面会卡死 1.2 秒左右，在优化后，页面不会完全卡死，但仍然会有渲染卡顿的感觉。在优化前页面会卡死的原因是因为一次性提交的数据过多，内部 JS 执行时间过长，阻塞了 UI 线程，导致页面卡死。

使用 `Time slicing 技术` 可以避免页面卡死，通常我们在这种耗时任务处理的时候会加一个 loading 效果，在这个示例中，我们可以开启 `loading animation`，然后提交数据。

对比发现，优化前由于一次性提交数据过多，JS 一直长时间运行，阻塞 UI 线程，这个 loading 动画是不会展示的。
而优化后，由于我们拆成多个时间片去提交数据，单次 JS 运行时间变短了，这样 loading 动画就有机会展示了。

::: warning
这里要注意的一点，虽然我们拆时间片使用了 `requestAnimationFrame API`，但是使用 `requestAnimationFrame` 本身是不能保证满帧运行的，`requestAnimationFrame` 保证的是在浏览器每一次重绘后会执行对应传入的回调函数，想要保证满帧，只能让 JS 在一个 Tick 内的运行时间不超过 17ms。
:::

## 8. Non-reactive data

::: tip Non-reactive data
使用 Non-reactive data
:::
before:

```js
const data = items.map((item) => ({
  id: uid++,
  data: item,
  vote: 0,
}));
```

after:

```js
const data = items.map((item) => optimizeItem(item));

function optimizeItem(item) {
  const itemData = {
    id: uid++,
    vote: 0,
  };
  Object.defineProperty(itemData, "data", {
    // Mark as non-reactive
    configurable: false,
    value: item,
  });
  return itemData;
}
```

| Before                                                                                                                                                                                                                                    |                                                                                                                   After                                                                                                                    |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| ![](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9tbWJpei5xcGljLmNuL21tYml6X3BuZy9nbXZuNWJCYVcwOWFoaWNKSVd5Qm1iYjhMWlB0S2tteHdCRVV3ZVpUeDhrZWpjRnlybzlnQWJrVGZtaWFoN09GTE9QUjVqdTRpYzF6amFKd01WYjg3cDZ3Zy82NDA?x-oss-process=image/format,png) | ![](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9tbWJpei5xcGljLmNuL21tYml6X3BuZy9nbXZuNWJCYVcwOWFoaWNKSVd5Qm1iYjhMWlB0S2tteHdqd3p4NzhXQW1td0Jha2J0c29tTDZneWhUZE1taWEzb2tXUFI2bGljalZweVBpY2JNOXpkUFB2Q3cvNjQw?x-oss-process=image/format,png) |

对比这两张图我们可以看到优化后执行 script 的时间要明显少于优化前的，因此性能体验更好。

之所以有这种差异，是因为内部提交的数据的时候，会默认把新提交的数据也定义成响应式，如果数据的子属性是对象形式，还会递归让子属性也变成响应式，因此当提交数据很多的时候，这个过程就变成了一个耗时过程。

而优化后我们把新提交的数据中的对象属性 data 手动变成了 configurable 为 false，这样内部在 walk 时通过 `Object.keys(obj)` 获取对象属性数组会忽略 data，也就不会为 data 这个属性 defineReactive，由于 data 指向的是一个对象，这样也就会减少递归响应式的逻辑，相当于减少了这部分的性能损耗。数据量越大，这种优化的效果就会更明显。

## 9. Virtual Scrolling

::: tip Virtual Scrolling
虚拟滚动
:::
before:

```html
<div class="items no-v">
  <FetchItemViewFunctional
    v-for="item of items"
    :key="item.id"
    :item="item"
    @vote="voteItem(item)"
  />
</div>
```

after:

```html
<recycle-scroller class="items" :items="items" :item-size="24">
  <template v-slot="{ item }">
    <FetchItemView :item="item" @vote="voteItem(item)" />
  </template>
</recycle-scroller>
```

| Before                                                                                                                                                                                                                                    |                                                                                                                  After                                                                                                                   |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| ![](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9tbWJpei5xcGljLmNuL21tYml6X3BuZy9nbXZuNWJCYVcwOWFoaWNKSVd5Qm1iYjhMWlB0S2tteHcxamhRU1pzQnZ0UWNjMWhJWjU1VjlsRVlsbVU3eU9ZdUhnR3JIYm5UaHpucWlhV1VpYk5jU0hwdy82NDA?x-oss-process=image/format,png) | ![](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9tbWJpei5xcGljLmNuL21tYml6X3BuZy9nbXZuNWJCYVcwOWFoaWNKSVd5Qm1iYjhMWlB0S2tteHdRaWFYUTFaUDZJcTF0a0pmUTNoZkdyWnZOa3JscjVPeFZxWnQ2WFp0MjhzVTlWdzhxRVJQeVV3LzY0MA?x-oss-process=image/format,png) |

在非优化的情况下，10000 条数据在滚动情况下 fps 只有个位数，在非滚动情况下也就十几，原因是非优化场景下渲染的 DOM 太多，渲染本身的压力很大。优化后，即使 10000 条数据，在滚动情况下的 fps 也能有 30 多，在非滚动情况下可以达到 60 满帧。

因为虚拟滚动的实现方式：是只渲染视口内的 DOM。这样总共渲染的 DOM 数量就很少了，自然性能就会好很多。它的基本原理就是监听滚动事件，动态更新需要显示的 DOM 元素，计算出它们在视图中的位移。

虚拟滚动组件也并非没有成本，因为它需要在滚动的过程中实时去计算，所以会有一定的 script 执行的成本。因此如果列表的数据量不是很大的情况，我们使用普通的滚动就足够了。

> [1] vue-9-perf-secrets slidse：https://slides.com/akryum/vueconfus-2019
>
> [2] vue-9-perf-secrets video：https://www.vuemastery.com/conferences/vueconf-us-2019/9-performance-secrets-revealed/
>
> [3] vue-9-perf-secrets code：https://github.com/Akryum/vue-9-perf-secrets
>
> [4] vue-9-perf-secrets online demo：https://vue-9-perf-secrets.netlify.app/
>
> [5] vue-9-perf-secrets github issue：https://github.com/Akryum/vue-9-perf-secrets/issues/1
>
> [6] vue-virtual-scroller code：https://github.com/Akryum/vue-virtual-scroller
