# Sass 基础

![img](https://www.willstyle.co.jp/w/wp-content/uploads/2017/11/sass-2000x1000.jpg)

[[toc]]

## 简介

Sass ( Syntactically Awesome Style Sheets ) 是由 Ruby 语言编写的 CSS 预处理语言，扩展了 CSS3 ，提供嵌套规则、继承、Mixins 等特性

Sass 提供了两种语法：**Sass**语法、**SCSS**语法

Sass 最后需要被编译成 CSS 才能被 HTML 识别

[Sass 在线编译](https://www.sassmeister.com/)

---

::: tip Sass 语法

Sass 语法类似 Ruby、Python，

**对空格敏感，使用缩进语句，语句用换行分隔**

**文件后缀名分别是 `.sass`**

```scss
$variable-name: #c6538c

.custom-classname
  color: red
  front-size: 20px
```

:::

::: tip SCSS 语法

SCSS ( Sassy CSS ) 是 Sass 3 引入新的语法

SCSS 语法与 CSS 相同（ CSS-like ）**更适合纯前端开发**

**使用花括号嵌套语句，用换行分隔每行语句**

**文件后缀名 `.scss`**

```scss
$variable-name: #c6538c;

.custom-classname {
  color: red;
  front-size: 20px;
}
```

:::

下文皆使用 **SCSS**

<br/>

## 选择器

SCSS 是 CSS 的扩充，CSS 中的选择器都能使用

### 嵌套语法

Sass 增加选择器嵌套的写法

使结构更加清晰

```scss
// scss
父选择器 {
  大儿子选择器 {
    大孙子选择器 {
      属性: 值;
    }
  }
  二儿子选择器 {
    二孙子选择器 {
      属性: 值;
    }
  }
}
/* 编译后的 CSS */
父选择器 大子选择器 大孙子选择器 {
  属性: 值;
}
父选择器 二子选择器 二孙子选择器 {
  属性: 值;
}
```

---

### 父选择器

Sass 了可使用 `&` 来代替父选择器，减少了重复的代码

> 如下：

```scss
// SCSS
.father {
  &abc {
    color: blue;
  }
  &-child-1 {
    color: red;
  }

  &::after {
    content: "AFTER";
    display: inline-block;
  }

  &:hover {
    background: red;
  }

  // CSS 的亲儿子选择器写法
  & .child {
    color: yellow;
  }
}
/* 编译后的 CSS */
.fatherabc {
  color: blue;
}

.father-child-1 {
  color: red;
}

.father::after {
  content: "AFTER";
  display: inline-block;
}

.father:hover {
  background: red;
}

.father .child {
  color: yellow;
}
```

<br/>

## 注释

::: tip 两种注释：

单行注释：Sass 被编译后不会出现到 CSS 中

多行注释：会被编译到 CSS 中

:::

Sass 支持**单行注释**

```scss
// 注释1
// 注释2
```

Sass 也支持 CSS 的**多行注释**

```scss
/* 注释 */

/*
	注释1
	注释2
*/
```

多行注释中可使用插值语法

> 如下：

```scss
$color: red;

/* 默认颜色: #{$color} */
```

> 编译后的 CSS 文件 :

```css
@charset "UTF-8";
/* 默认颜色: red */
```

<br/>

## 变量

### 定义

用 `$` 定义变量，通过 `$变量名` 获取对应变量的值

```scss
$变量名: 值;

选择器 {
  属性: $变量名;
}
$default-color: red;
$default-size: 3rem;

div {
  color: $default-color;
  font-size: $default-size;
}
```

---

### !default

同名变量后定义的值会覆盖前者

> 如下：

```scss
$color: red;
$color: blue;

/* #{$color} */
/* 编译为 CSS 后 */

/* blue */
```

可在变量值后添加 `!default`

若有优先则使用初始值，若无初始值则使用该值

```scss
$color: red;
$color: blue !default;

/* #{$color} */
/* 编译为 CSS 后 */

/* red */
```

---

### !important

Sass 支持 CSS 中优先级提升的 `!important`

---

### 插值语法

```scss
#{变量名}
#{运算}
```

> 如下：利用 `@each` 遍历 map 生成 class 类名

```scss
$map-1: (
  "red": red,
  "blue": blue,
);

@each $key, $value in $map-1 {
  /* #{$key $value} */
  .color-#{$key} {
    color: $value;
  }
}
/* 编译成 CSS 后 */

/* red red */
.color-red {
  color: red;
}

/* blue blue */
.color-blue {
  color: blue;
}
```

> 如下：利用插值计算

```scss
// SCSS
$base-color: #036;

@for $i from 1 through 3 {
  ul:nth-child(3n + #{$i}) {
    background-color: lighten($base-color, $i * 5%);
  }
}
/* CSS */
ul:nth-child(3n + 1) {
  background-color: #004080;
}

ul:nth-child(3n + 2) {
  background-color: #004d99;
}

ul:nth-child(3n + 3) {
  background-color: #0059b3;
}
```

<br/>

## 作用域

以 Sass 的 SCSS 语法为例，大括号内部人士被视作块级作用域

全局作用域内定义的变量、函数、混合等会影响块级作用域，反之则不会

```scss
$color: red;

.a {
  background-color: $color;
}

.b {
  $color: yellow;
  background-color: $color;
}
/* 编译后的 CSS */
.a {
  background-color: red;
}

.b {
  background-color: yellow;
}
```

---

### !global

变量值后添加 `!global` 可将局部定义的变量提升为全局变量

```scss
选择器 {
  $变量: 值 !global;
}

选择器 {
  属性: $变量;
}
```

> 如下：不使用 `!global` 会报错找不到变量：

```scss
.a {
  $color: red;
}

.b {
  color: $color; // 报错，Error: Undefined variable: "$color".
}
```

> 如下：使用 !global 被视作全局变量：

```scss
.a {
  $color: red !global;
}

.b {
  color: $color;
}
/* 编译后的 CSS */
.b {
  color: red;
}
```

---

### ❌ !local

---

<br/>

## 数据类型

数据类型判断使用 Sass 内置 [工具函数](https://blaxberry.github.io/vuepress-studynotes/notes/front/CSS/Sass/Sass.html#工具函数) `type-of()`

```scss
type-of($变量名)
```

> 如下：

```scss
$a: rgb(255, 0, 0);
$b: 1px;
$c: center;
$d: false;
$e: null;
$f: 10px 10px auto auto;
$g: (
  "red": red,
  "blue": blue,
);

/* #{type-of($map-1)} */

/* #{
    type-of($a)
    type-of($b)
    type-of($c)
    type-of($d)
    type-of($e)
    type-of($f)
    type-of($g)
}*/
```

> 编辑后的 CSS ：

```css
/* color number string bool null list map */
```

---

### 字符串 string

Sass 的字符串类型支持 **有引号字符串** 与 **无引号字符串**

虽然单双引号都可识别但 stylelint 一般转为双引号

```scss
$string-1: center;
$string-2: "center";
$string-3: "center";
```

通过 [插值语法](https://blaxberry.github.io/vuepress-studynotes/notes/front/CSS/Sass/Sass.html#插值语法) 将字符串值作为属性名时，自动转为无引号字符串

> 如下：将 `"text-align` 作为属性名

```scss
$name: "text-align";

div {
  #{$name}: center;
}
/* 编译为 CSS 后 */
div {
  text-align: center;
}
```

---

### 数字 number

Sass 支持 **纯数字** 和 **带单位的数字**，且数字**可正可负可整可浮点**

```scss
$number-1: 1;
$number-2: 1px;
$number-3: 1rem;
$number-4: 1vh;
$number-5: 1vw;
$number-6: 0.5;
$number-7: -1;
```

带单位的数字在运算时单位和数字被视作一个整体

> 如下：带单位和不带单位的数字进行算术运算

```scss
div {
  width: 10px + 10px;
  height: 10px + 10;
  padding: 10 + 10px;
}
/* 编译为 CSS 后 */

div {
  width: 20px;
  height: 20px;
  padding: 20px;
}
```

---

### 布尔 bool

只有在自身值为 `null` 和 `false` 时才会返回 `false`

```scss
$var-1: true;
$var-2: false;
```

---

### 列表 list

列表的元素用 **逗号** 或 **空格** 间隔

```scss
$list-1: 1px 2px 3px 4px;
$list-2: (1px 2px) (3px 4px);
$list-3: 1px, 2px, 3px, 4px;

/* #{$list-1} */
/* #{$list-2} */
/* #{$list-3} */

div {
  padding: $list-1;
  margin: $list-2;
}
/* 1px 2px 3px 4px */
/* 1px 2px 3px 4px */
/* 1px, 2px, 3px, 4px */
div {
  padding: 1px 2px 3px 4px;
  margin: 1px 2px 3px 4px;
}
```

---

### 映射对象 map

> 如下：利用 `@each` 遍历 map 数据并生成 class 类名

```scss
$map-1: (
  "red": red,
  "blue": blue,
);

@each $key, $value in $map-1 {
  /* #{$key $value} */
  .color-#{$key} {
    color: $value;
  }
}
```

> 编译成 CSS 后：

```css
/* red red */
.color-red {
  color: red;
}

/* blue blue */
.color-blue {
  color: blue;
}
```

---

### 空值 null

```scss
$var: null;
```

不能与任何类型的数据进行算数运算

---

### 颜色 color

Sass 支持所有颜色类型、十六进制、RGB、RGBA、HSL、HSLA

```scss
$color-1: red;
$color-2: #ff0000;
$color-3: rgb(255, 0, 0);
$color-4: rgba(0, 0, 0, 0.5);
```

Sass 还提供了内置 [工具函数](https://blaxberry.github.io/vuepress-studynotes/notes/front/CSS/Sass/Sass.html#工具函数) 来方便使用颜色

```scss
// 亮度
lighten($color, 百分比%);
darken($color, 百分比%);

// 透明度（
// 比 CSS 的 rgba() 能更好灵活控制基本色
rgba($color, 百分比%);

// 色彩度
saturate($color, 百分比%);
desaturate($color, 百分比%);

// 反色
invert($color);

// 中间色
mix($color-1, $color-2, [百分比%]);
```

<br/>

## 运算符

### 算数运算符

同其余语言的算数运算

| 符号 |
| :--: |
|  +   |
|  -   |
|  \*  |
|  /   |
|  %   |

字符串与数字的算数运算：

字符串与数字相加：字符串拼接，拼接字符串与数字

字符串与数字相减：字符串拼接，拼接字符串与减号与数字

---

### 关系运算符

同其余语言的关系运算

返回值为布尔类型，多用于 [条件判断](https://blaxberry.github.io/vuepress-studynotes/notes/front/CSS/Sass/Sass.html#条件判断)

| 符号 |
| :--: |
|  >   |
|  <   |
|  >=  |
|  <=  |

---

### 相等运算符

同其余语言的关系运算

返回值为布尔类型，多用于 [条件判断](https://blaxberry.github.io/vuepress-studynotes/notes/front/CSS/Sass/Sass.html#条件判断)

| 符号 |
| :--: |
|  ==  |
|  !=  |

```scss
$var-a: 1 == 1px; // true
$var-b: center == "center"; // true
```

---

### 逻辑运算符

同其余语言的关系运算

返回值为布尔类型，多用于 [条件判断](https://blaxberry.github.io/vuepress-studynotes/notes/front/CSS/Sass/Sass.html#条件判断)

| 符号 | 含义 |
| :--: | :--: |
| and  |  与  |
|  or  |  或  |
| not  |  非  |

```scss
$var: 1>0 and 5<10; // true
```

---

### 优先级

1. `()`
2. `*`、`/`、`%`
3. `+`、`-`
4. `>`、`<`、`>=`、`<=`
5. `not`、`and`、`or`

<br/>

## 函数

### 定义

```scss
// 固定参数
@function 函数名($参数, $参数) {
  @return 返回值;
}

函数名(值, 值);
// 参数默认值
@function 函数名($参数, $参数: 默认值) {
  @return 返回值;
}

函数名(值, $参数: 值);
// 剩余参数
@function 函数名($numbers...) {
  $sum: 0;
  @each $number in $numbers {
    $sum: $sum + $number;
  }
  @return $sum;
}

函数名(值, 值);
```

---

### ❌ 工具函数

::: tip 常用工具函数：

- 获取变量数据类型
  - **type-of()**
- 获取数据元素个数
  - **length()**
- 计算
  - **calc()**
- 获取引入的静态资源
  - **url()**
- 获取处理后颜色
  - **invert()**：返色
  - **rgba()**：透明度
  - **lighten()**：亮度提升
  - **darken()**：亮度下降
  - **saturate()**：彩色度提升
  - **desaturate()**：彩色度下降
  - **mix()**： 获取中间色

:::

<br/>

## 继承 (@extend)

仅限简单**样式的重复使用**

复杂的内容还是建议使用 [混合@mixin](https://blaxberry.github.io/vuepress-studynotes/notes/front/CSS/Sass/Sass.html#混合-mixin) 或 [自定义函数](https://blaxberry.github.io/vuepress-studynotes/notes/front/CSS/Sass/Sass.html#自定义函数)

> 如下：多重继承

```scss
.a {
  color: red;
}

.b {
  @extend .a;
}

.c {
  @extend .b;
}
/* 编译后的CSS */
.a,
.b,
.c {
  color: red;
}
```

> 如下：`div` 继承 `.common` 类名块级作用域下的内容

```scss
.common {
  $size: 10px;
  $color: red;

  .child {
    font-size: $size;
    color: $color;
  }
}

div {
  @extend .common;
}
/* 编译后的CSS */
.common .child,
div .child {
  font-size: 10px;
  color: red;
}
```

::: warning

```scss
.common {
  $size: 10px;
  $color: red;
}

div {
  @extend .common;
  color: $color; // 报错，Error: Undefined variable: "$color".
}
```

:::

::: tip !optional

当 `@extend` 相关内容出现错误时编译器会编译出错误的 CSS 代码

可使用 `!optional` 使 `@extend` 内容出现错误时不去编译错误部分内容

:::

<br/>

## 混合 (@mixin)

功能比 [继承@extend](https://blaxberry.github.io/vuepress-studynotes/notes/front/CSS/Sass/Sass.html#继承-extend) 强大，更推荐

### 基本使用

```scss
// SCSS
@mixin 自定义混合名 {
  属性: 数值;
}

选择器 {
  @include 自定义混合名;
}
/* CSS */
选择器 {
  属性: 数值;
}
```

---

### 混合选择器

```scss
// SCSS
@mixin 自定义混合名 {
  选择器 {
    属性: 数值;
  }
}

@include 自定义混合名;
/* CSS */
选择器 {
  属性: 数值;
}
```

---

### 传递参数

```scss
@mixin 自定义混合名($参数, $参数) {
  属性: 数值;
}

选择器 {
  @include 自定义混合名(参数值, 参数值);
}
```

> 如下：
>
> mixin 结合 [@if](https://blaxberry.github.io/vuepress-studynotes/notes/front/CSS/Sass/Sass.html#@if)、[@else](https://blaxberry.github.io/vuepress-studynotes/notes/front/CSS/Sass/Sass.html#@else)、[@error](https://blaxberry.github.io/vuepress-studynotes/notes/front/CSS/Sass/Sass.html#@error)

```scss
@mixin triangle($size, $color, $direction) {
  height: 0;
  width: 0;

  border-color: transparent;
  border-style: solid;
  border-width: math.div($size, 2);

  @if $direction == up {
    border-bottom-color: $color;
  } @else if $direction == right {
    border-left-color: $color;
  } @else if $direction == down {
    border-top-color: $color;
  } @else if $direction == left {
    border-right-color: $color;
  } @else {
    @error "Unknown direction #{$direction}.";
  }
}

.next {
  @include triangle(5px, black, right);
}
```

<br/>

## 条件判断

### if()

**三元表达式**

```scss
if(条件, 条件为真时的值, 条件为假时的值)
```

> 如下：

```scss
/*#{
    if(true, 'AAA', 'BBB')
    if(false, 'AAA', 'BBB')
}*/
/*AAA BBB*/
```

---

### @if

```scss
@if 条件 {
  // 样式
}
div {
  @if 1 + 1 == 2 {
    .child {
      color: red;
    }
  }
}
```

---

### @else

```scss
@if 条件A {
  // 样式
} @else if 条件B {
  // 样式
} @else if 条件B {
  // 样式
} @else {
  // 样式
}
```

<br/>

## 循环遍历

### @for

有两种写法

```scss
// 写法一：遍历包含结束值
@for $计时器变量 from 开始值 through 结束值 {
  /* ... */
}

// 写法二：遍历不包含结束值
@for $计时器变量 from 开始值 to 结束值 {
  /* ... */
}
```

> 如下：遍历包含结束值

```scss
@for $i from 1 through 3 {
  .item-#{$i} {
    width: 1rem * $i;
  }
}
/* 编译后的 CSS */
.item-1 {
  width: 1rem;
}
.item-2 {
  width: 2rem;
}
.item-3 {
  width: 3rem;
}
```

> 如下：遍历不包含结束值

```scss
@for $i from 1 to 3 {
  .item-#{$i} {
    width: 1rem * $i;
  }
}
/* 编译后的 CSS */
.item-1 {
  width: 1rem;
}
.item-2 {
  width: 2rem;
}
```

---

### @while

```scss
$计时器变量: 初始值;

@while 判断$计时器变量值 {
  /* ... */
  $计时器变量: 新值;
}
```

> 如下：遍历两次

```scss
$i: 1;

@while $i < 3 {
  .item-#{$i} {
    width: 1rem * $i;
  }
  $i: $i + 1;
}
/* 编译后的 CSS */
.item-1 {
  width: 1rem;
}
.item-2 {
  width: 2rem;
}
```

---

### @eah

```scss
@each $元素变量, $元素变量 in $列表数据 {
  选择器 {
    属性: 值;
  }

  选择器 {
    属性: $元素变量;
  }

  选择器#{$元素变量} {
    属性: $元素变量;
  }
}
```

> 如下：

```scss
// SCSS
$sizes: 40px, 50px, 80px;

@each $size in $sizes {
  .icon-#{$size} {
    font-size: $size;
    height: $size;
    width: $size;
  }
}
/* CSS */
.icon-40px {
  font-size: 40px;
  height: 40px;
  width: 40px;
}

.icon-50px {
  font-size: 50px;
  height: 50px;
  width: 50px;
}

.icon-80px {
  font-size: 80px;
  height: 80px;
  width: 80px;
}
```

数组类型数据时

```scss
// SCSS
$icons: "eye" "\f112"12px, "start" "\f12e"16px, "stop" "\f12f"10px;

@each $name, $glyph, $size in $icons {
  .icon-#{$name}:before {
    display: inline-block;
    font-family: "Icon Font";
    content: $glyph;
    font-size: $size;
  }
}
/* CSS */
@charset "UTF-8";
.icon-eye:before {
  display: inline-block;
  font-family: "Icon Font";
  content: "";
  font-size: 12px;
}

.icon-start:before {
  display: inline-block;
  font-family: "Icon Font";
  content: "";
  font-size: 16px;
}

.icon-stop:before {
  display: inline-block;
  font-family: "Icon Font";
  content: "";
  font-size: 10px;
}
```

---

### ❌@map

```scss
// SCSS
$icons: (
  "eye": "\f112",
  "start": "\f12e",
  "stop": "\f12f",
);

@each $name, $glyph in $icons {
  .icon-#{$name}:before {
    display: inline-block;
    font-family: "Icon Font";
    content: $glyph;
  }
}
/* CSS */
@charset "UTF-8";
.icon-eye:before {
  display: inline-block;
  font-family: "Icon Font";
  content: "";
}

.icon-start:before {
  display: inline-block;
  font-family: "Icon Font";
  content: "";
}

.icon-stop:before {
  display: inline-block;
  font-family: "Icon Font";
  content: "";
}
```

<br/>

## 指令规则

### 导入 (@import)

用于导入当前文件的依赖项内容

```scss
@import "SCSS文件名" @import "SCSS文件名", "SCSS文件名";
```

> 如下：在 index 中导入 依赖的 a 与 b 文件的内容

```js
|- a.scss
|- b.scss
|- index.scss
// index.scss
@import "./a", "./b";
```

### 调试 (@debug)

```scss
$color: red;

div {
  @debug $color;
}
```

---

### 警告 (@warn)

自定义警告

> 如下：

```scss
div {
  @warn '自定义警告';
}
```

---

### 报错 (@err)

自定义报错

> 如下

```scss
div {
  @error '自定义错误';
}
```

> 如下：

```scss
@if 条件A {
  // 样式
} @else if 条件B {
  // 样式
} @else if 条件B {
  // 样式
} @else {
  @error "Unknown #{$}.";
}
```
