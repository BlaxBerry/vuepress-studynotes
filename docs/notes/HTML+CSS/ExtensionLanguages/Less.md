# Less语法

![](https://www.ryadel.com/wp-content/uploads/2018/06/less-logo-css-tutorial-guide-735x300.jpg)

## Less简介

Less（leaner Style Sheets）是css的一门扩展语言

也称为css预处理器

**常见css预处理器：Less、Sass、Stylus**

在css的基础上引入了 变量、函数、运算、Mixmin混入等

可用更少的代码做更多的事

[Less文档](https://less.bootcss.com/)





## css的弊端

### css代码冗余不便维护

代码重复的情况多，修改维护不便

如下图，重复的代码

```css
div {
  XXXX;
  background: red;
}
p {
  XXXX;
  background: red;
}
span {
  XXXX;
  background: red;
}
.box {
  XXXX;
  background: red;
}
.........
```

### css没有计算能力

尤其体现在rem和媒体查询时

如下，img原图100*100，若使用rem单位响应式布局，

必须要计算

```css
html {
  font-size: 50px;
}
img {
  /*width: 82px;
  height: 82px;*/
  /*只能用计算器 82/50=1.64*/
  width: 1.64rem;
  height:1.64rem;
}

```





## .less文件

在`.less文件`文件中书写Less语句



## 注释

不同于css的`/**/`，Less使用双斜杠`//`注释

```less
// 我是less的注释
```



## 变量

放入颜色、数值等，**方便统一修改维护**

```less
@变量名：值；
```

变量名必须用 **@为前缀**

不能包含特殊字符

不能以数字开头

**大小写敏感**

如下：

```less
@backgroundColor: crimson;
@boxHeight: 100px;
@font14: 14px;

div {
  height: @boxHeight;
  background-color: @backgroundColor;
}
div p {
  height: @boxHeight;
  color: @backgroundColor;
  font-size: @font14;
}
.box {
  height: @boxHeight;
  background-color: @backgroundColor;
}
.son {
  background-color: @backgroundColor;
  font-size: @font14;
}
```



## Less编译为CSS

html页面不识别Less，需要把less文件编译转换为css文件

可以用VSCode的插件**easyless**

![](https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=4142202966,2456002797&fm=11&gp=0.jpg)

安装该插件后，

**每次.less文件保存，会在同级目录生成一个同名.css文件**

然后html页面引入该.css文件即可

每次在.less修改后，只要保存，修改会一起保存到.css文件



## 元素嵌套

### 子元素

css的嵌套

```css
.father .son .grandson {
  color: red
}
```

less中的内层选择器直接放到外层选择器中

如下：

```css
.father {
  .son{
    .grandson{
      color:red;
    }
  }
}
```

---

再比如：

```less
.father {
 font-size: 100px;
  .son{
    font-size: 50px;
    .grandson{
      font-size: 20px;
      color:red;
    }
  }
}
```

编译为css如下：

```css
.father {
  font-size: 100px;
}
.father .son {
  font-size: 50px;
}
.father .son .grandson {
  font-size: 20px;
  color: red;
}

```



### 伪类 :hover

写在当前元素中，并在前面加上&

```less
选择器 {
	&:hover{}
}
```

如下：

```less
.father {
  .son{
    &:hover{
      color: red;
    }
  }
}
```

编译为css如下：

```css
.father .son:hover {
  color: red;
}
```



### 伪元素

写在当前元素中，并在前面加上&

```less
选择器 {
	&::before{};
  &::after{}
}
```

如下：

```less
.father {
  .son{
    &::after{
      content: '';      
    }
  }
}
```

```css
.father .son::after {
  content: '';
}
```



### 伪元素伪类

```less
.father {
  .son{

    &::after{
      content: '';

      &:hover{
        color:red;
      }

    }
  }
}
```

```css
.father .son::after {
  content: '';
}
.father .son::after:hover {
  color: red;
}
```









## 运算

Less中的变量都可以参与运算

Less中提供了` + - * /`算数运算

```less
@border: 5px + 5;

.father {
  .son{
    width: 100px - 10;
  	height: 100px * 2;
    border: @border solid crimson;
  }
}
```

编译为css如下：

```css
.father .son {
  width: 90px;
  height: 200px;
  border: 10px solid crimson;
}
```

---

再比如，

在响应式布局中，rem布局中

```less
html {
  font-size: 50px;
}
img {
  width: (82 / 50rem);
  height: (82 / 50rem);
}
```

解析为css如下：

```css
html {
  font-size: 50px;
}
img {
  width: 1.64rem;
  height: 1.64rem;
}
```

---

**注意**，**Less除法必须用括号扩起来**，不然不会进行计算

---

**运算符必须用空格隔开**

```less
width: (@width + 10) * 2
```

---

Less运算**结果的的单位以第一个数为准**

```less
img {
  width: (82px / 50rem);
}
```

解析为css如下：

```css
img {
  width: 1.64px;
}
```





## 导入

### @import 

把一个样式文件导入另一个样式文件中

```less
@import "要导入的less文件名"
```

如下，在`02.less`中导入公共样式的`common.less`文件：

```less
// common.less
* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}
```

```less
// 02.less

@import "common.less";

a {
    text-decoration: none;
}
```

