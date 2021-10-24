# SCSS（Sass）

![](https://www.willstyle.co.jp/w/wp-content/uploads/2017/11/sass-2000x1000.jpg)

传统 CSS 的缺点：

- 无法写嵌套，导致要写很多重复的选择器名，不利于维护

- 没有变量和复用机制，代码冗余

_（目前 CSS 已经可以定义变量）_

使用 SCSS（Sass）可以实现：

- 层级嵌套
- 变量
- 混合复用
- 颜色函数

## 简介

### 预处理器比较

- **SCSS/Sass**

  Sass 出现最早，后来进化到 SCSS

  有 Ruby 社区支持，

  （.scss）

- **Less**

  上手快，比起 Sass 编程功能弱

  （.less）

- **Stylus**

  缩进的方式

  主要给 Node.js 项目，人气偏低

  （.styl）

## 安装

### 依靠编辑器

VSCode 的插件 EasySass(编辑)和 Sass(提示)

---

### Node 环境下安装

全局安装 node-sass 依赖包

```bash
npm i -g node-sass
```

```bash
node-sass -v

node-sass       6.0.1   (Wrapper)       [JavaScript]
libsass         3.5.5   (Sass Compiler) [C/C++]
```

---

通过 Ruby 的 Sass 模块

## 编译

将 .scss 文件编译为 .css 文件

```scss
// SCSS
div.father {
  color: red;
  .son {
    color: blue;
  }
}
```

```css
/*CSS*/
div.father {
  color: red;
}
div.father .son {
  color: blue;
}
```

### 单文件编译

#### 同目录下编译

```bash
node-sass SCSS文件 CSS文件
```

如下：将 a.scss 编译为 a.css 并存在同目录下

```bash
# 编译前
xxx
|- a.scss
```

```bash
node-sass a.scss a.css
```

```bash
# 编译后
xxx
|-a.scss
|-a.scss
```

---

#### 不同目录下编译

```bash
node-sass ?/?/SCSS文件 ?/?/CSS文件
```

如下：

```bash
# 编译前
xxx
|- a
   |- a.scss
|- b
```

- 在 a 目录下，将该目录中的 a.scss 编译为 b.css，并存在 a 目录的同级 b 目录下

```bash
pwd
xxx/a

node-sass a.scss ../b/b.css
```

```bash
# 编译后
xxx
|- a
   |- a.scss
|- b
   |- b.css
```

- 在 b 目录下，将该目录的同级 b 目录中的 a.scss 编译为 b.css，并存在该目录下

```bash
pwd
xxx/b

node-sass ../a/a.scss b.css
```

```bash
# 编译后
xxx
|- a
   |- a.scss
|- b
   |- b.css
```

---

#### 编译并创建文件夹

```bash
node-sass ?/?/SCSS文件 ?/?/CSS文件
```

如下：

将 a 目录下的 a.scss 编译为 b.css，并存入 a 目录的同级 b 目录下

```bash
xxx
|- a
	 |- a.cscc
```

```bash
pwd
xxx

node-sass a/a.scss b/b.css
```

```bash
xxx
|- a
	 |- a.cscc
|- b
	 |- b.css
```

### 多文件编译

即编译整个目录

```bash
node-sass SCSS文件目录 CSS文件目录
```

若 CSS 文件目录不存在会自动生成

如下：

将 a 目录下的 SCSS 文件全部编译为 SCC 文件，并存放在 a 目录的同级 b 目录下

```bash
xxx
|- a
   |- 01.scss
   |- 01.scss
   |- 01.scss
```

```bash
pwd
xxx

node-sass a -o b
```

```bash
xxx
|- a
   |- 01.scss
   |- 01.scss
   |- 01.scss
|- b
   |- 01.css
   |- 01.css
   |- 01.css
```

### 文件监听

会占用着终端监视着 SCSS 文件或 SCSS 文件目录的变化

档文件内容被保存时，就执行文件编译

control -c 断开

```bash
node-sass -w SCSS文件 -o CSS文件目录

node-sass -w SCSS文件目录 -o CSS文件目录
```

# Scss 语法

## 1. 注释

- **/_ xxxxx _/**
- **// xxxx**
- **/_! xxxxxx _/**

```scss
/*会被编译*/

//不会被编译

/*! 
Author: #{$author}
*/
```

多行注释 **/**/\*\* 会被完整编译到 .css 文件中,

单行注释 **//** 则不会

加有叹号的多行注释**/_! _/** 中可以使用变量，可用来添加版权信息

## 2. 变量

用 **\$** 声明变量

```scss
$变量名: 值；;
```

```scss
// SCSS
$color1: red;
$size: 10px;

div {
  width: $size;
  color: $color1;
}
```

```css
/* CSS */
div {
  width: 10px;
  color: red;
}
```

## 3. 作用域

变量支持块极作用域

全局声明的变量可以在任何 **{ }** 中使用

嵌套在 **{ }** 中声明的变量只能在当前作用域内使用

```scss
$color1: red;

div {
  $color2: green;
  color: $color1;
  background-color: $color2;
}

span {
  color: $color1;
  background-color: $color2; // 报错
}
```

## 4. 数据类型

### 分类

Scss 是弱类型语法，

对于字符串和数字的限制不很明确，定义时务必明确

比如：数字可以带单位，字符串可单双引号或不带

- 数字：1，2，3, ..., **10px**
- 字符串：“foo”，'foo'， foo
- 布尔值：true，false
- 颜色：white，#fff，rgb(250,250,250)
- 空值：null
- 数组：1rem,2rem,0,serif
- maps（对象）：（key: value, key: value）

```scss
```

### 判断数据类型

**type-of（\$变量）**

```scss
```

```scss
```

### 字符串（String）

字符串可以带单引号，双引号，或无印号

```scss
// SCSS
$alignItems1: center;
$alignItems2: "center";
$alignItems3: "center";

.a {
  align-items: $alignItems1;
}
.b {
  align-items: $alignItems2;
}
.c {
  align-items: $alignItems3;
}
```

但是编译为 CSS 文件时会保持 SCSS 文件内容原始样式输出

```css
/* CSS */
.a {
  align-items: center;
}

.b {
  align-items: "center";
}

.c {
  align-items: "center";
}
```

### 数字（Number）

数字可正可负可为零可小数，也可带单位或不带

```scss
// SCSS
$size1: 100px;
$size2: 700;
$size3: 1.5rem;
$size4: -100px;

div {
  font-size: $size1;
  font-weight: 100;
  line-height: $size3;
  top: $size4;
}
```

```scss
/* CSS */
div {
  font-size: 100px;
  font-weight: 100;
  line-height: 1.5rem;
  top: -100px;
}
```

### 布尔值（Boolean）

```scss
$a: true;
$b: false;
```

```scss
```

### 空值（Null）

主要用于逻辑判断，不能用于数值运输

```scss
$falg: null;
```

```scss
```

### 数组（List）

```scss
// 一维数组
$padding: 10rem 20rem 30rem;

// 二维
$list1: 1px 2px, 3px 4px;
$list2: (1px 2px) (3px 4px);
```

```scss
```

### Maps

就是 JS 的对象

```scss
$map: (
  key1: value1,
  key2: value2,
  key3: value3,
);
```

```scss
```

### 颜色（Colors）

```scss
$color1: white;

$color2: lighten($color1, 10%);
$color3: darken($color1, 10%);

$color4: saturate($color1, 10%);
$color5: desaturate($color1, 10%);

$color6: (red, green);
```

```scss
$color: rgba(#2343, 0.5);
```

## 5. 运算

### 5.1 数字运算

+-\*/%运算符必须与数值之间有空格

#### + 运算

- **数字类型 + 数字类型**

只要一个值有单位，相加结果必带单位

```scss
// Scss
$add1: 1+2;
$add2: 1+2px;
$add3: 1px+2px;

div {
  width: $add1;
  width: $add2;
  width: $add3;
}
```

```scss
// CSS
div {
  width: 3;
  width: 3px;
  width: 3px;
}
```

- **字符串类型 + 字符串类型**

第一个值带引号，则相加结果才会带引号

```scss
// Scss
$add1: "a"+"b";
$add2: a + b;
$add3: a + "b";
$add4: "a" + b;

div {
  width: $add1;
  width: $add2;
  width: $add3;
  width: $add4;
}
```

```scss
// CSS
div {
  width: "ab";
  width: ab;
  width: ab;
  width: "ab";
}
```

- **数字类型 + 字符串类型**

```scss
// Scss
$add1: "1" + "2";
$add2: 1 + "2";
$add3: "1" + 2;

div {
  width: $add1;
  width: $add2;
  width: $add3;
}
```

```scss
// CSS
div {
  width: "12";
  width: "12";
  width: "12";
}
```

---

#### - 运算

- **数字与数字的 - 运算**

```scss
// scss
$add1: 1 - 2;
$add2: 1- 2px;
$add3: 1px - 2;
$add4: 1px - 2px;

div {
  width: $add1;
  width: $add2;
  width: $add3;
  width: $add4;
}
```

```scss
// css
div {
  width: -1;
  width: -1px;
  width: -1px;
  width: -1px;
}
```

- **数字与字符串的 - 运算**

```scss
$add1: 1 - "2";
$add2: "1"-2;

div {
  width: $add1;
  width: $add2;
}
```

```scss
div {
  width: 1-"2";
  width: "1"-2;
}
```

---

#### \* 运算

只能有一个值带单位，

若两个值都带单位会报错无法编译

```scss
// scss
$add1: 1 * 2;
$add2: 1 * 2px;
$add3: 1px * 2;
$add4: 1px * 2px; // 报错

div {
  width: $add1;
  width: $add2;
  width: $add3;
  width: $add4; // 报错
}
```

```scss
// css
div {
  width: 2;
  width: 2px;
  width: 2px;
}
```

---

#### / 运算

```scss
```

```scss
```

---

#### %运算

```scss
```

```scss
```

### 5.2 关系运算

\> < >= <= 关系运算符的两侧必须是数字

返回值是 布尔值 true false

常用于条件判断

```scss
//scss
$a1: 1 > 0;
$a2: 1 < 0;
$a3: 1 <= 1;

div {
  width: $a1;
  width: $a2;
  width: $a3;
}
```

```scss
//css
div {
  width: false;
  width: true;
  width: true;
}
```

### 5.3 相等运算符

== !=

返回值是 布尔值 true false

```scss
//scss
$a1: 1 == "1";
$a2: 1 != "1";
$a3: 1== 1px;

div {
  width: $a1;
  width: $a2;
  width: $a3;
}
```

```scss
//css
div {
  width: false;
  width: true;
  width: true;
}
```

### 5.4 布尔运算符

**and or not**

```scss
//scss
$a1: 1 > 0 and 1 > 2;
$a2: 1 < 0 or 1 < 2;
$a3: not(1 <= 1);

div {
  width: $a1;
  width: $a2;
  width: $a3;
}
```

```scss
//css
div {
  width: false;
  width: true;
  width: false;
}
```

### 5.5 颜色运算符

- **16 进制颜色值 与 16 进制颜色值**

```scss
// scss
$col: #ff0000 + #0000ff;

div {
  color: $col;
}
```

```scss
// css
div {
  color: #ff00ff;
}
```

- **16 进制颜色值 与 数字**

```scss
// scss
$col1: #ff0000 + 2;
$col2: #010203 * 2;

div {
  color: $col1;
  color: $co2;
}
```

```scss
// css
div {
  color: #ff0202;
  color: #020406;
}
```

- **RGBA 与 HSLA**

两个值必须统一是 rgb 或 hsl

若有 alpha 值，则必须 alpha 值相等的颜色才能进行运算

```scss
//scss
$col1: rgba(255, 0, 0, 0.5) + rgba(255, 0, 100, 0.5);
$col2: rgba(255, 0, 0, 0.5) + rgba(255, 0, 100, 0.9); // 报错

div {
  color: $col1;
}
```

```scss
// css
div {
  color: rgba(255, 0, 100, 0.5);
}
```

### 运算优先级

1. **( )**
2. **\* / %**
3. **+ -**
4. **> < >= <=**

## 6. 嵌套语法 （重要）

```scss
// scss
.a1 {
  width: 300px;
  height: 300px;
  background-color: brown;

  .a2 {
    width: 60%;
    height: 60%;
    background-color: chartreuse;

    .a3 {
      width: 60%;
      height: 60%;
      background-color: blue;
    }
  }
}
```

```scss
// css
.a1 {
  width: 300px;
  height: 300px;
  background-color: brown;
}
.a1 .a2 {
  width: 60%;
  height: 60%;
  background-color: chartreuse;
}
.a1 .a2 .a3 {
  width: 60%;
  height: 60%;
  background-color: blue;
}
```

## 7.补充

### 插值语法

```scss
#{ 变量 }
```

```scss
// scss
$name1: a1;
$name2: a2;
$name3: a3;
$color1: crimson;
$color2: blue;

div.#{$name1} {
  background-color: $color1;

  .#{$name2} {
    background-color: $color2;
  }
}

#app .#{$name1} {
  color: $color1;
}
#app .#{$name2} {
  color: $color1;
}
#app .#{$name3} {
  color: $color1;
}
```

```scss
// css
div.a1 {
  background-color: crimson;
}
div.a1 .a2 {
  background-color: blue;
}

#app .a1 {
  color: crimson;
}

#app .a2 {
  color: crimson;
}

#app .a3 {
  color: crimson;
}
```

### 伪类选择器、伪元素选择器

在嵌套语法中的伪类选择器、伪元素选择器前面必须有**&**

若不加&，后面的选择器会被当作子选择器了

```scss
// scss
div {
  &:hover {
    color: white;
  }
  &::after {
    content: "｜";
  }
}
```

```scss
// css
div:hover {
  color: white;
}

div::after {
  content: "｜";
}
```

### !default

SCSS 中后定义的内容会覆盖之前的，如下：

同名变量最后的值是 blue

```scss
// scss
$color1: red;
$color1: blue;

div {
  color: $color1;
}
```

```scss
// css
div {
  color: blue;
}
```

若 !default 之前的值已经被被定义，则采用之前的值

但若值没有被定义过或者是个 null，则采用当前的值

```scss
// scss
$color1: red;
$color1: blue !default;

$width: 100px;
$width: null !default;

div {
  color: $color1;
  width: $width;
}
```

```scss
// css
div {
  color: red;
  width: 100px;
}
```

### !global

因为 SCSS 存在变量作用域，

在块级作用域中定义的变量无法被作用域外使用

```scss
// scss
.a1 {
  $color2: green;
  background-color: $color2;
}

.a2 {
  background-color: $color2; // 报错
}
```

可以通过 !global 将前面的变量提升为全局变量，

在其他作用域中也也可被使用

```scss
// scss
.a1 {
  $color2: green !global;
  background-color: $color2;
}

.a2 {
  background-color: $color2;
}
```

```scss
// css
.a1 {
  background-color: green;
}

.a2 {
  background-color: green;
}
```

## @ 指令

### @import

通过 @import 导入其他的 SCSS/SASS 文件

最终会被编译为一个 CSS 文件

导入的必须是.sass/.scss 文件，不能是.css 文件

```scss
@import "01.scss";
@import "01";
```

可同时引入多个

```scss
@import "01.scss", "01";
```

### @mdeia

媒体查询，和 css 一样，但是可以使用嵌套了

### @extend

继承

```scss
选择器1 {xxxxxxx}
选择器2 {@extend 选择器1;}
```

```scss
// scss
.a1 {
  color: blue;
  width: 100px;
  height: 100px;
  background-color: brown;
}
.a2 {
  @extend .a1;
  font-size: 20px;
}
.a3 {
  @extend .a2;
}
```

```scss
// css
.a1,
.a2,
.a3 {
  color: blue;
  width: 100px;
  height: 100px;
  background-color: brown;
}

.a2,
.a3 {
  font-size: 20px;
}
```

#### 选择器占位符

**%**，仅充当一个通用标签，不会被编译到 css 中

```scss
//scss
%a1 {
  color: blue;
  width: 100px;
  height: 100px;
  background-color: brown;
}
.a2 {
  @extend %a1;
}
.a3 {
  @extend %a1;
}
```

```scss
// css
.a2,
.a3 {
  color: blue;
  width: 100px;
  height: 100px;
  background-color: brown;
}
```

## 控制指令

### if( )

```scss
if(判断, 判断为true时的值, 判断为false时的值)
```

```scss
// scss
.a1 {
  color: if(1+1==2, green, red);
}
.a2 {
  color: if(1 + 1!=2, green, red);
}
```

```scss
// css
.a1 {
  color: green;
}
.a2 {
  color: red;
}
```

### @if、@else if、@else

```scss
@if 判断 {
  xxx: xxx;
} @else if {
  xxx: xxx;
} @else {
  xxx: xxx;
}
```

```scss
.a1 {
  @if 1+1==2 {
    color: green;
  }
}
.a2 {
  @if 1 + 1!=2 {
    color: red;
  } @else {
    color: yellow;
  }
}
```

```scss
.a1 {
  color: green;
}

.a2 {
  color: yellow;
}
```

### @for

```scss
// 从a～b，包含b
@for 变量 from a through b{
  xxxxxxxxx
}
// 从a～b，不包含b
@for 变量 from a to b {
  xxxxxxxxx
}
```

- @for xxx from a through b { }

```scss
/// scss
@for $num from 1 through 3 {
  .item-#{$num} {
    width: 2rem * $num;
  }
}
```

```scss
// css
.item-1 {
  width: 2rem;
}

.item-2 {
  width: 4rem;
}

.item-3 {
  width: 6rem;
}
```

- @for xxx from a to b { }

```scss
// scss
@for $num from 1 to 3 {
  .item-#{$num} {
    width: 2rem * $num;
  }
}
```

```scss
// css
.item-1 {
  width: 2rem;
}

.item-2 {
  width: 4rem;
}
```

### @while

```scss
@while 判断 {
  xxxx
}
```

```scss
// scss
$num: 5;
@while $num>0 {
  .item-#{$num} {
    width: 2rem * $num;
    $num: $num - 1;
  }
}
```

```scss
// css
.item-5 {
  width: 10rem;
}

.item-4 {
  width: 8rem;
}

.item-3 {
  width: 6rem;
}

.item-2 {
  width: 4rem;
}

.item-1 {
  width: 2rem;
}
```

[scss gihub note](https://github.com/ggdream/scss/blob/master/3%E3%80%81SassScript.md)

### @each

```scss
```

```scss
```

```scss
```

```scss
```

```scss
```

```scss
```
