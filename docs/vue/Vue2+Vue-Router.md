# Vue路由 Vue-Router 

![](https://media.vlpt.us/images/sian/post/88cbe852-0168-470f-83b9-daf4f0ed8bb9/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202020-10-21%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%2010.20.49%20(1).png)

Vue-Router 是官方的路由管理器

用来实现 **SPA**（**S**ingle **P**age **A**pplication）单页面应用

通过地址用来控制组件的切换

- 支持HTML5的**History历史模式 / Hash模式**

- 支持**嵌套路由**
- 支持**路由参数**
- 支持**编程式路由**
- 支持**命名路由**





## CDN引入时的使用步骤

CDM引入Vue后引入Vue-Router

添加路由链接

添加路由填充位

定义路由组件

创建路由实例，配置路由规则

挂载路由到Vue实例

---

### 配置路由规则

每个路由规则都是一个配置对象，

其中至少包含**path** 和 **component** 属性

**path**：当前路由规则匹配的 Hash地址

**component**：当前路由规则地址要展示的组件

```js
// 创建路由实例
const router = new VueRouter({
  // 路由规则数组
	routes:[
    {
      path: '/home',
      component: Home
    },
    {
      path: '/about',
      component: About
    },
  ]
})
```

---

### 挂载路由到Vue实例

```js
const app = new Vue({
  el:'#app',
  router
})
```





## 脚手架中的使用

### 安装

在vue项目根目录下打开终端，输入：

```bash
npm install vue-router
```

---

### 导入，挂载

在vue项目根目录下的**`main.js`**中导入

安装脚手架时同时安装Vue-router的话会自动导入

```js
import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

// 导入 router
import VueRouter from "vue-router"
// use
Vue.use(VueRouter)
// 创建路由
let router = new VueRouter()


new Vue({
    render: h => h(App),
    // 路由挂载到Vue实例
    router
}).$mount('#app')
```

---

### 配置路由规则

通过 **`routes`属性**，配置 **地址** 和 路由管理的**组件**的关系（跳转）

然后，在vue项目根目录下的**`main.js`**中

1. 导入要通过路由管理的组件

2. routes属性中配置关系

3. **path**设置路由地址

4. **component**设置路由要展示的组件
5. children设置子路由

```js
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)


// 防止重复点击相同路由
const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(to) {
    return VueRouterPush.call(this, to).catch(err => err)
}


export default new VueRouter({
    routes: [
      {
        path: '/home',
        component: () =>import ("../views/Home/Home.vue")
      },
      {
        path: '/category',
        component: () =>import ("../views/Category/Category.vue")
      }
    ]
})
```





## 路由重定向

当用户访问某一地址时，强制地址跳转到另一地址，并展示匹配组件

比如，打开页面时默认展示 **Home**组件

即，将访问的地址从 **"/"** 重定向为 **"/home"**

```js
localhost:3000/
localhost:3000/home
```

通过 路由规则的 **redirect** 属性

- CDN引入时的重定向

```js
const router = new VueRouter({
	routes:[
    // 重定向
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      component: Home
    },
    {
      path: '/about',
      component: About
    },
  ]
})
```

- 脚手架中的重定向

```js
export default new VueRouter({
    routes: [
      // 重定向
      {
        path: '/',
        redirect: '/home'
      }, 
      {
        path: '/home',
        component: () =>import ("../views/Home/Home.vue")
      },
      {
        path: '/category',
        component: () =>import ("../views/Category/Category.vue")
      }
    ]
})
```



## 嵌套路由

点击父路由显示的组件中还有子组件

子组件的也需要通过路由显示匹配内容

此时父路由和子路由就是嵌套路由关系

<img src="https://pbs.twimg.com/media/E2tfhYDVIAAgc0J?format=jpg&name=medium" style="zoom:33%;" />

父级路由组件模版：

```vue
<div>
  <router-link to="/user">User</router-link>
  <router-link to="/register">register</router-link>
</div>
<div>
  <!-- 父级路由填充位 -->
  <router-view></router-view>
</div>
```

子级路由组件模版：

```vue
<div id="register">
  
  <div>
    <router-link to="/register/tab1">Tab1</router-link>
    <router-link to="/register/tab2">Tab2</router-link>
	</div>
  
	<div>
    <!-- 子级路由填充位 -->
  	<router-view></router-view>
	</div>
  
</div>
```

路由规则：

通过**children**属性配置子级路由

```js
export default new VueRouter({
    routes: [
      {
        path: '/user',
        component: () =>import ("../views/User.vue")
      },
      {
        path: '/register',
        component: () =>import ("../views/Register.vue"),
        // 给/register父级路由添加子路由规则
        children: [
        	{
        		path: '/register/tab1',
        		component: () =>import ("../views/tab1.vue"),
      		},
        	{
        		path: '/register/tab1',
        		component: () =>import ("../views/tab1.vue"),
      		}                             
        ]
      }
    ]
})
```





## 动态匹配路由

```vue
<router-link to="/user/1">user-1</router-link>
<router-link to="/user/2">user-2</router-link>
<router-link to="/user/3">user-3</router-link>
```

```js
{ path: '/user/1', component: User }
{ path: '/user/2', component: User }
{ path: '/user/3', component: User }
```

如上，相同

可以共用一个路由规则

动态变化的部分形成路由参数

```js
routes: [
  { path: '/user/:id', component: User }
]
```

该参数可以通过以下方法获取

```vue
<template>
	<div>{{$route.params.id}}</div>
</template>

<script>
	export default {  
    XXX
    
    	this.$route.params.id
    
    XXX
  }
</script>
```





## 路由填充位（占位符）

**<router-view\>** 标签

通过路由规则匹配到的组件，会被渲染展示到填充位上

等浏览器地址栏跳转为指定地址时，对应的组件显示

```vue
<router-view></router-view>
```

```vue
<div class="home">

  <!-- 左侧  导航 -->
	<div class="left-nav">
    <ul>
      <li>发现音乐</li>
      <li>推荐歌单</li>
      <li>最新音乐</li>
      <li>最新MV</li>
    </ul>
  </div>
  
  <!-- 右侧  路由容器 -->
  <div class="right-main">
    
    <router-view></router-view>
  
  </div>

</div>
```





## 声明式导航（路由链接 ）

点击链接实现导航

**<router-link\>** 标签，**to**属性指定跳转的路由地址

通过地址切换，实现SPA显示的组件的切换

```vue
<router-link to="/xxx">xxx</router-link>
```

```vue
<router-link to="/home">Home</router-link>
<router-link to="/about">About</router-link>
```

**`<router-link>`** 标签会被页面解析为一个`<a\>`标签，to属性会被渲染为href属性

to属性的默认值会被渲染为#开头的Hash地址

可通过class类名 router-link-active控制样式

```vue
<template>
    <div class="home">

         <!-- 左侧  导航 -->
        <div class="left-nav">
            <ul>
                <li>
                    <router-link to="/discovery">发现音乐</router-link>
                </li>
                <li>
                    <router-link to="recommendation">推荐歌单</router-link>
                </li>
                <li>
                    <router-link to="new">最新音乐</router-link>
                </li>
                <li>
                    <router-link to="mv">最新MV</router-link>
                </li>
            </ul>
        </div>


        <!-- 右侧  路由容器 -->
        <div class="right-main">
          
            <!-- 路由出口 -->
            <router-view></router-view>
        </div>


    </div>
</template>

<style>
/* 点击高亮 */
a.router-link-active {
    color: red;
    background-color: #ccc;
}
</style>
```





## 编程式导航

通过调用JS形式的API实现导航

两种方式：

- **this.$router.push()**
- **this.$router.go()**



### this.$router.push()

```js
this.$router.push(Hash路由地址)
```

```js
const Home = {
	template: '<div><button @click="jump">前往User页面</button></div>',
  methods:{
    jump:function(){
      this.$roter.push('/user')
    }
  }
}
```

- this.$router.push( **字符串形式的路径** )  常用

  ```js
  this.$router.push('/search')
  ```

- this.$router.push( **对象形式的路径** )

  ```js
  this.$router.push({
    path: "/search"
  })
  ```

- this.$router.push( **路由name** )

  ```js
  this.$router.push({
    name: "Search"
  })
  ```

- this.$router.push( **携带params参数** )

  ```js
  this.$router.push({
    name: 'Search',
    params: {
      id: 123
    }
  })
  ```

- this.$router.push( **携带查询参数** )

  ```js
  this.$router.push({
    path: '/search',
    query: {
      username: 'andy'
    }
  })
  // /search?username=andy
  ```

---

### this.$router.go()

主要用来实现前进后退

- **this.$router.go(1)** ：前进

- **this.$router.go(0)**：刷新
- **this.$router.go(-1)**：后退







## 路由传参

跳转路由并传输数据

从组件A跳转路由到组件B时，将通过路由URL地址传输参数给目标组件

通过在路由地址 **URL** 后拼接上 **? key=value**，

```js
this.$router.push('URL?key1=value1&key2=value2')

this.$router.push('/list?musicName=baby')
```

在需要获取该数据的组件中，

通过 **this.$roue.query** 获取传输的键值对，反问其 **key** 键即可获得传输的参数数据

```js
this.$route.query

this.$route.query.musicName
```





## meta

```js
export default new VueRouter({
    routes: [
      {
            path: '/',
            redirect: '/home'
      }, 
      {
            // 首页
            path: '/home',
            component: () => import ("../views/Home/Home.vue"),
            meta: {
                title: "IT 图书商城",
                showFooterGuide: true
            }
      }, 
      {
            // 搜索页
            path: '/category',
            component: () => import ("../views/Category/Category.vue"),
            meta: {
                title: "图书分类",
                showFooterGuide: true
            }
      }
     ]
}
```





## 命名路由

配置路由规则时，可以给路由加上**name**属性起一个名称

```js
{
  name: 'Home',
  path: '/home',
  component: () =>import ("../views/Home/Home.vue")
},
{
  name: 'Category'
  path: '/category',
  component: () =>import ("../views/Category/Category.vue")
}
```

可通过路由的name实现路由跳转，并携带参数

```vue
<router-link :to="{name: 'Home', params: {id: 123}}">Home</router-link>
```

```js
thsi.$router.push({name:'Home', params: {id: 123}})
```





## 路由守卫（路由拦截）

```js
Vue.use(VueRouter);

const routes = [
  {
    path:'/XXX',
    name:'',
    meta:{},
    component:()=>import('../views/XXX.vue')
  },{},{}()
];

const router = new VueRouter({
  mode:"history",
  base:process.env.BASE_URL,
  routes
});

router.beforeEach((to,from,next)=>{
    console.log(to);  // 跳转到哪个路由
    console.log(from); // 从哪个路由跳转过来
    next(); // 放行
})

exports default router
```

`next()`不调用就无法跳转路由







