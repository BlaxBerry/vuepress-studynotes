# Vue2 + Vue-Router

![](https://reffect.co.jp/wp-content/uploads/2019/09/vue_router.png)

Vue-Router，是用来实现 **SPA**（单页面应用）的路由管理器，监控URL路径并匹配渲染对应的路由组件

> SPA单页面应用（**S**ingle **P**age Web **A**pplication）只有一个页面，通过切换URL地址来控制页面组件的切换，不产生浏览器页面跳转，只是改变URL路径，数据通过Ajax请求获取


[[toc]]



## 路由器、路由、路由组件

### 路由 与 路由器

::: tip 路由 与 路由器：

- **Router：路由管理器** <br>
  控制管理多个路由

- **Route：路由** <br>
  一组`key-value`对应关系，`key`为URL路径<br>
  - **前端路由**：`value`是对应路径的**路由组件**
  - **后端路由**：`value`是对应请求路径的**处理函数**

:::


### 路由组件

::: tip 一般组件 与 路由组件：

- **一般组件**：存放在`src/components`

- **路由组件**：通过前端路由匹配渲染的组件<br>
  存放在`src/views` 或 `src/pages`

:::

---

#### 路由组件的挂载销毁

路由组件的切换是组件挂载、组件销毁的切换，

可通过生命周期验证：

```js
beforeDestory(){
  console.log('该路由组件将要被销毁')
},
mounted(){
  console.log('该路由组加载完毕了')
}
```

- 若不想在路由更换时组件销毁导致输入页面的数据被清空<br>
  需要借助 **`<keep-alive>`** 标签，详见 [路由组件数据缓存](#缓存路由组件)

- 若想获取路由组件的激活状态，可借助两个新的生命周期函数<br>
  详见 [路由新增的两个生命周期](#路由新增生命周期)

---

#### $route、$router 属性

挂载完毕的路由组件上，新增两个属性`$route`、`$router`

::: tip $route 与 $router

- **`$route`**：配置给该路由的路由规则（配置信息）<br>
  详见 [声明式路由导航](#声明式导航)

- **`$router`**：路由器<br>
  详见 [编程式路由导航](#编程式导航) 与 [路由传参](#路由传参)

:::



## Vue-Router安装配置

### 配置路由器

**1. 安装路由器**

Vue脚手架开启项目时通过配置项自动配置路由器，

或手动安装配置Vue-Router

```bash
npm i vue-router
```

**2. 配置路由器的路由**

在脚手架下的 `/src/router/index.js` 文件内配置路由器对象

```js
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

// 导入组件
import Home from '../views/Home.vue'
import About from '../views/About.vue'

// 创建路由器
export default new VueRouter({
  // 配置路由
  routes: [
    {
      path: '/home',
      component: Home
    },
     {
      path: '/about',
      component: About
    }
  ]
})
```

**3. 暴露并导入**

将路由器暴露出，并导入`mian.js`  文件

```js
// main.js
import Vue from 'vue'
import App from './App.vue'

import router from './router/index.js'

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
```



### 路由器模式

默认开启Hash模式

可通过路由器 `router`的 `mode配置项` 修改路由模式

```js
const router = new VueRouter({
  mode: 'history',
  routes:[
    { /* 路由配置 */ },
    { /* 路由配置 */ }
  ]
})
```
::: tip 路由器模式的两种模式：

- **Hash模式**

Hash模式的路由地址会带有 `#`

> - 虽然Hash模式带有`#` 不美观但是兼容性好，不过项目上线不常用
> - Hash值不包含在请求中，即`#`即其后的URL路径不会做为HTTP请求的一部分随着域名端口号发给服务器，仅前端使用
> - 带有 `#` 的地址通过第三方手机app分享时，若app校验严格时地址会被视作非法

---

- **History模式**

History模式的路由地址不带有 `#`

> - History模式的兼容性略差，但是美观，项目上线常用
> - History模式会有静态资源**404问题**，嵌套路由的路径也会被做为HTTP请求的一部分发给服务器，从而导致资源找不到404问题，需要后端配合对路径和资源进行匹配来解决，比如：在**Node.js** 中通过中间件 **[connect-history-api-fallback](https://github.com/bripkens/connect-history-api-fallback)** 解决History模式404问题、或通过Nginx

::: 


### 路由组件懒加载

```js
{
  name: 'XXX'
  path: '/xxx',
  component: () => import('../XXX.vue')
}
```




## 路由导航

即前端路由，不发生网络请求，不产生页面跳转

是根据路由（URL路径）的不同渲染指定的路由组件

::: tip Vue-Router的两种路由的切换方式：

- **[声明式路由导航（路由链接）](#声明式导航)**

  通过`<router-link>`标签实现路由切换

- **[编程式路由导航](#编程式导航)**

  通过 JS 代码实现路由切换

:::






### 声明式导航

通过点击链接，实现路由的切换

Vue-Router提供了`<router-link>`标签，最终会被解析为`<a>` 标签

```vue
<router-link></router-link>
```

::: tip 常用标属性

- [to属性](#to属性)
- [active-class属性](#active-class属性)
- [replace属性](#replace属性)

:::
---

#### to属性

`<router-link>`标签的 ` to属性 ` 指定要切换的路由

最终会被解析为`<a>` 标签的`href`属性

- **字符串写法**

适合不带参数或参数少的场合

```vue
<router-link to="/路径"></router>
<router-link to="/路径/路径"></router>
<!-- 携带参数 -->
<router-link to="/路径?参数=值"></router>
<router-link to="/路径?参数=值&参数=值"></router>
```

> 如下：
>
> ```vue
> <router-link to="/home">Home页面</router>
> <router-link to="/list?id=1">表一</router>
> <router-link to="/list?id=2&type=student">表二</router>
> ```

---

- **对象写法**

适合有参数且参数过多的场合

可通过 `path` 或 `name` 跳转

传递**params参数**时，只能通过`name`跳转，详见 [路由params传参](#params)

```vue
<!-- 通过name路由名称跳转并传递query参数 -->
<router-link :to="{
  name: '路由名称',
  query: {
    参数: 值,
    参数: 值
  }              
}">
</router-link>

<!-- 通过path路由路径跳转并传递query参数 -->
<router-link :to="{
  path: '/路径/路径',
  query: {
    参数: 值,
    参数: 值
  }              
}">
</router-link>

<!-- 只能通过name路由名称跳转并传递params参数 -->
<router-link to="{
  name: '/路径/路径',
  parmas: {
    参数: 值,
    参数: 值
  }              
}">
</router-link>
```

> 如下：传递query参数。参考 [声明式导航query传参](#query)
>
> ```http
> /about/list?id=002&type=student
> ```
>
> ```vue
> <router-link :to="{
>   path: '/about/list',
>   query: {
>     id: 002,
>     type: student
>   }
> }">
> </router-link>
> ```
>
> 如下：传递params参数。参考 [声明式导航params传参](#params)
>
> ```http
> /about/info/202/andy
> ```
>
> ```vue
> <router-link :to="{
>   name: 'Info',
>   params: {
>     id: 002,
>     name: andy
>   }
> }">
> </router-link>
> ```

---

#### active-class属性

`<router-link>`标签的`active-class属性 `指定链接激活时的样式类名

```vue
<router-link to="/路径" active-class="激活时的样式类名">
  Home页面
</router>
```

> 如下：
>
> ```vue
> <router-link to="/home" active-class="active">
>   Home页面
> </router>
> ```

---

#### replace属性

开启无痕浏览

该链接跳转的路由不被浏览器历史记录保存，无法后退访问

```vue
<router-link replace to="/路径"></router-link>
```

> 原理：
>
> 浏览器路由跳转默认是push压栈，会有历史记录可后退访问记录
>
> 而replace是替换，不是push压栈，所以无痕浏览



### 编程式导航

声明式路由导航的`<router-link>`标签最终会被解析为`<a>` 标签

编程式路由导航不通过`<router-link>`标签跳转路由。

**编程式路由导航通过路由器`$router` 实现**

用于：通过`<button>`访问路由，获取延时自动跳转路由等

::: tip 常用方法

- [push()](#push)
- [replace()](#replace)
- [go()](#go)
- [back()](#back)
- [forward()](#forward)

:::

---

#### push

保存记录跳转路由

```js
this.$route.push({
  path: '/路径',
  query: {
    参数: 值,
    参数: 值
  }
})

this.$route.push({
  name: '路由名称',
  query: {
    参数: 值,
    参数: 值
  }
})

this.$route.push({
  name: '路由名称',
  params: {
    参数: 值,
    参数: 值
  }
})
```

---

#### replace

无痕跳转路由



---

#### go

根据浏览器保存的记录，

- 前进指定个数的路由地址
- 后退指定个数的路由地址

- 刷新当前路由

```js
this.$router.go(3)
this.$router.go(-3)
this.$router.go(0)
```

---

#### back

根据浏览器保存的记录，后退一个路由地址

```js
this.$router.back()
```

---

#### forward

根据浏览器保存的记录，前进一个路由地址

```js
this.$router.forward()
```





## 路由视图

即展示对应路由地址的组件渲染的地方

Vue-Router通过`<router-view>`标签展示组件

```vue
<router-view></router-view>
```

通过路由规则匹配到的组件，会被渲染展示到填充位上

浏览器地址栏跳转为指定地址时，对应的组件显示

> 如下：
>
> ```vue
> <template>
> 	<div class="home">
>   	<!-- 左侧  导航 -->
> 		<div class="left-nav">
>     	<ul>
>       	<li>发现音乐</li>
>       	<li>推荐歌单</li>
>       	<li>最新音乐</li>
>       	<li>最新MV</li>
>     	</ul>
>   	</div>
>   	<!-- 右侧  路由容器 -->
>     <div class="right-main">
>       
>     	<router-view></router-view>
>       
>   	</div>
> 	</div>
> </template>
> ```





## 路由配置项

```js
{
  name: 'Info',
  path: '/info',
  component: Info,
  meta: {
    isAuth: ture,
    needNav: false
  },
  children: [
    {
      name: 'xxx',
      path: '/info/xxx',
      component: () => import('./xxx.vue'),
    }
  ]
},
```

- **name：路由名称**

  可用于 [路由跳转 ](#to属性)时通过路由名称就可跳转

- **path：路由路径**

- **component：组件**

- **meta：路由元信息**

  可存放关于该路由组件的数据信息，比如：

  - 是否显示导航栏
  - 是否进行[路由守卫拦截](#前置路由守卫)
  - [指定页面标题](#后置路由守卫)

- **children：子路由**



### 嵌套路由

即多级路由，包含多个子路由的路由

配置路由时将子路由放入路由的 `childern`属性

> 如下：
>
> 一级与二级路由的访问路径
>
> ```http
> /home
> /about
> /about/item01
> /about/item02
> /about/item03
> ```
>
> 二级路由的模版
>
> ```vue
> <template>
> 	<div>
>     <h1>About页面</h1>
>     <ul>
>       <li>
>         <router-link to=“/about/item01”>
>         	项目一
>   			</router-link>
>   		</li>
>       <li>
>         <router-link to=“/about/item02”>
>         	项目二
>   			</router-link>
>   		</li>      
>   	</ul>
>   </div>
> </template>
> ```
>
> 二级路由配置
>
> ```js
> export default new VueRouter({
>   routes: [
>     {
>       path: '/home',
>       component: Home
>     },
>     {
>       path: '/about',
>       component: About,
>       children: [
>         {
>           path: '/about/item01',
>       		component: AboutItem01
>         },
>         {
>           path: '/about/item02',
>       		component: AboutItem02
>         }
>       ]
>     }
>   ]
> })
> ```







## 路由参数

::: tip 有两种传递方式：

- 查询字符串形式 [query](#query)
- restful风格的 [params](#params)

::: 


### query

```http
/路径/路径?参数=值&参数=值
```

```http
/list?id=100&type=student
```

---

#### 接收

直接通过挂载到路由组件对象实例上的`this.$route.query`获取

模版中通过`$route.query`获取

```js
this.$route.query.参数名

{{ $route.query.参数名 }}
```

但是获取的都是字符串

```js
/list?id=101&name=andy

{ 
  "id": "101", 
  "name": "andy" 
}
```

---

#### 传递 — 声明式导航

- **字符串写法**

详见 [声明式导航 to属性](#to属性)

```vue
<router-link to="/路径?参数=值"></router-link>
<router-link to="/路径/路径?参数=值&参数=值"></router-link>
```

> 如下：
>
> ```vue
> <router-link to="/list?id=202&type=students"></router-link>
> ```

- **对象写法**

详见 [声明式导航 to属性](#to属性)

```vue
<router-link :to="{
  path: '/路径/路径',
  query: {
    参数: 值,
    参数: 值          
  }             
}">
</router-link>

<router-link :to="{
  name: '路由名称',
  query: {
    参数: 值,
    参数: 值          
  }             
}">
</router-link>
```

> 如下：
>
> ```vue
> <router-link :to="{
>   path: '/info/syudents',
>   query: {
>     id: 202,
>     name: andy          
>   }             
> }">
> </router-link>
> ```



### params

```http
/路径/参数
/路径/路径/参数/参数
```

```http
/list/students
/about/list/a202/andy
```

---

#### 配置

传递的参数的个数、名称必须路由配置项中的参数一致才能匹配

```js
{
  name: 路由名称,
  path: '/路径/:参数',
  component: 路由组件,
}
```

> 如下：
>
> ```js
> import Vue from 'vue'
> import VueRouter from 'vue-router'
> Vue.use(VueRouter)
> import About from '../views/About.vue'
> 
> export default new VueRouter({
>   routes: [
>     {
>       name: 'About'
>       path: '/about',
>       component: About,
>       children: [
>       	{
>      	 		name: 'List'
>       		path: '/about/list/:class/:name',
>       		component: () => import('../views/About/List.vue'),
>     		}
>       ]
>     },
>   ]
> })
> ```

---

#### 传递 — 声明式导航

- **字符串写法**

详见 [声明式导航 to属性](#to属性)

```vue
<router-link to="/路径/参数"></router-link>
<router-link to="/路径/路径/参数/参数"></router-link>
```

- **对象写法**

params传参若是通过声明式导航的对象写法时，只能通过`name`

详见 [声明式导航 to属性](#to属性)

> 如下：
>
> ```vue
> <router-link to="/list/students"></router-link>
> <router-link to="/about/info/202/andy"></router-link>
> 
> <!-- 对象写法 -->
> <router-link :to="{
>  	name: 'Info',
>   params: {
>     id: 002,
>     name: andy
> 	}                 
> }">
> </router-link>
> ```

---

#### 接收

直接通过挂载到路由组件对象实例上的`this.$route.params`获取

模版中通过`$route.params`获取

```js
this.$route.params.参数

{{ $route.params.参数 }}
```



### props 接收参数

用于接收路由参数，将路由参数作为`props属性`放于组件实例对象

> 若路由参数个数特别多的话，逐个获取的话太烦琐
>
> 如下：
>
> ```js
> this.$router.query.id
> this.$router.query.name
> this.$router.query.title
> ...
> this.$router.params.id
> this.$router.params.name
> this.$router.params.title
> ...
> ```

所以，可通过给路由配置`props配置项`，将该路由组件接收的参数以`prop属性`的形式放于该组件的实例对象上，组件通过`props属性`接收后便可模版中便可简单获取

```vue
<template>
	<div>{{ id }}{{ name }}{{ title }}</div>
</template>

<script>
export default {
  props: ['id', 'name', 'title']
}
</script>
```

---
::: tip props配置项 分别处理不同的路由参数：

- `props`值为 **true** 时，处理 **query** 参数

- `props`值为 **函数** 时，处理 **params** 参数

::: 


#### props值为true

```js
{
  name: '组件名',
  path: '/路径/:参数/:参数',
  props: true
}
```

若props是true，

则该路由组件接收的所有**params参数**，会以`props`的形式放于该组件的实例对象上

---

#### props值为函数

```js
{
  name: '组件名',
  path: '/路径',
  props($route){
    return { 
    	参数: $route.query.参数,
      参数: $route.query.参数
    }
  }
}
```

若props是函数，

则该路由组件接收的所有**query参数**，会以props的形式放于该组件的实例对象上

函数将获取的query参数作为一个对象返回

> 可用解构赋值的连续写法简写
>
> 但语义不清晰不是特别建议
>
> ```js
> props({query:{id,name}}) {
> 	return {id,name}
> }
> ```







## 缓存路由组件

路由组件的切换是组件挂载、组件销毁的切换，

会导致路由切换后，路由组件的真实DOM中保存的数据丢失

比如，表单内容会被清空



### keep-alive 缓存路由组件

可通过 **`<keep-alive></keep-alive>标签`** 包裹该路由组件的路由视图标签

使不展示的路由组件保持挂载，不被销毁

---

#### 缓存所有路由组件

```vue
<template>
	<div>
   	<div>
      <router-link></router-link>
      <router-link></router-link>
  	</div>
    
    <keep-alive>
  		<router-view></router-view>
  	</keep-alive>
  </div>
</template>
```

---

#### 缓存指定路由组件

```vue
<template>
	<div>
   	<div>
      <router-link></router-link>
      <router-link></router-link>
  	</div>
    
    <keep-alive include=“路由组件名”>
  		<router-view></router-view>
  	</keep-alive>
  </div>
</template>
```

---

#### 缓存多个路由组件

```vue
<template>
	<div>
   	<div>
      <router-link></router-link>
      <router-link></router-link>
  	</div>
    
    <keep-alive :include=“[路由组件名,路由组件名]”>
  		<router-view></router-view>
  	</keep-alive>
  </div>
</template>
```



### 路由新增生命周期

若使用`<keep-alived>` 标签缓存路由组件，

会使不展示的路由组件保持挂载，不被销毁

因为不被销毁会导致比如：清除定时器、解绑事件等 无处使用

所以Vue-Router新增两个生命周期函数来**捕获路由组件的激活状态**

- activated
- deactivated

```js
export default {
  
  activated(){},
  
  deactivated(){},
  
}
```
::: tip activated 与 deactivated

- **activated**

  路由组件被激活时调用，类似`mounted`


- **deactivated**

  路由组件失活时调用，类似`destoryed`

:::





## 路由守卫（重要）

对路由进行权限控制



### 全局守卫

每次切换路由路径，对应的路由组件会被展示

```js
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const router = new VueRouter({
  routers:[
 		{ /* 路由配置 */ },
    { /* 路由配置 */ },
  ]
})
  
// 前置路由守卫
router.beforeEach((to,from,next)=>{ })
// 后置路由守卫
router.afterEach((to,from)=>{ })
```

---

#### 前置路由守卫

在路由切换前调用

可用于登陆token验证、路由切换前跳滚动页面...

```js
router.beforeEach((to, from, next)=>{
	// 判断
  
  next()
})
```
::: tip 参数：

- **from**：跳转去哪个路由

- **to**：从哪个路由跳转来

- **next**：调用后放行，否则不进行路由跳转

:::


> 如下：
>
> 在跳转到 `/user `或  `/cart`路径前判断localStorage中是否存有 用户登陆的 `token`
>
> ```js
> router.beforeEach((to, from, next)=> {
>   if(to.path==='/user'||to.path==='/cart'){
>     if(localstorage.getItem('token')==='xxx'){
>     	next()
>   	}else{
>       alert('尚未登陆')
>     }
>   }
> })
> ```
>
> 若路由数量过多，可通过路由配置项`meta`元数据判断
>
> ```js
> router.beforeEach((to, from, next)=> {
>   if(to.meta.needGuard){
>     if(localstorage.getItem('token')==='xxx'){
>     	next()
>   	}else{
>       alert('尚未登陆')
>     }
>   }
> })
> ```

---

#### 后置路由守卫

在路由切换后调用，

可通过路由配置项`meta`元数据追加浏览器的页面标题


```js
router.afterEach((to, from)=>{
	// 处理
})
```
::: tip 参数：

- **from**：跳转去哪个路由

- **to**：从哪个路由跳转来

  不需要放行，没有next参数

:::



> 如下：
>
> 判断路由配置项的元信息`meta`中的title<br>
> 若存在则路由跳转后将浏览器页面标题改为title，否则使用xxx
>
> ```js
> router.afterEach((to, from)=> {
>   document.title = to.meta.tite || 'xxx'
> })
> ```



### 独享守卫

某一个路由独享的路由守卫

独享路由守卫只有只能在路由路径切换前进行守卫

写法和全局路由守卫的 [前置路由守卫](#前置路由守卫) 一致

```js
{
  name: 'XXX',
  path: '/xxx',
  component: () => import('.XXX.vue'),,
  beforeEnter: (to,from,next) => {
    // 判断
    next()
  },
}
```



### 组件内守卫

可用于单独给组件指定路由权限，不太常用

可以在路由组件内直接定义以下路由导航守卫


```js
export default {
  
  beforeRouteEnter(to, from, next) {
    console.log("will enter");
    console.log(this); // undefined
    next();
  },
  
  beforeRouteLeave(to, from, next) {
    console.log("will leave");
    console.log(this); // 该组件的实例对象
  },
}
```
::: tip 参数：两种组件路由导航守卫：

- **beforeRouteEnter：进入守卫**<br>
  通过路由导航切换路由地址，在 **进入该路由地址前** 调用<br>
  无法获取 this

- **beforeRouteLeave：离开守卫**<br>
  通过路由导航切换路由地址，在 **离开该路由地址前** 调用<br>
  可获取 this，this 指向该组件的实例对象

:::




## 其余补充

### 防止重复点击相同路由

```js
// src/router/index.js
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

// 防止重复点击相同路由
const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(to) {
    return VueRouterPush.call(this, to).catch(err => err)
}
```

---

### 过渡动画切换路由

给` <router-view>`标签包裹上Vue的过渡动画标签`<transition>`

```vue
<transition>
  <router-view></router-view>
</transition>
```

详见 [Vue组件过渡动画](https://cn.vuejs.org/v2/guide/transitions.html)

---

### 路由切换前页面滚回顶部

利用全局路由守卫的前置守卫

```js
// 每次跳转回到页面顶部
router.beforeEach((to, from, next) => {
  // chrome
  document.body.scrollTop = 0
  // firefox
  document.documentElement.scrollTop = 0
  // safari
  window.pageYOffset = 0
  
  next()
})
```







