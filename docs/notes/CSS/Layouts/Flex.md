# Flex布局

Flex就是**Flexible Box Layout 弹性布局**/伸缩布局

操作方便，布局简单，

**移动端应用广泛**PC端兼容较差，IE11以下不支持



![](https://images2015.cnblogs.com/blog/1009174/201609/1009174-20160906150913207-224809711.png)

![](https://images2015.cnblogs.com/blog/1009174/201609/1009174-20160906150929707-1282752675.png)





# 原理

**给父盒子添加flex属性，来控制 子盒子的位置 和 排列方式**

## dispaly: flex;

```html
    <style>
        div {
            display: flex;
        }
    </style>

    <div>
        <span>1</span>
        <span>2</span>
        <span>3</span>
    </div>
```

flex属性给父级元素指定，

添加了flex属性的元素叫容器，**flex container**

添加了flex属性的元素的子元素叫项目， **flex item**



任何一个容器块级行级元素都可以指定为flex布局

以前，行级元素<span></span>的高宽时根据自身内容决定，直接修改没用的

如果给<span></span>的父级添加flex属性，则<span></span>直接转为块级元素





## 主轴和侧轴

flex布局中，主要分为主轴和侧轴两个方向，也称为行和列

**主轴** ： 默认是x轴，也就是水平行

**侧轴** ： 默认是y轴，也就是垂直列

![](https://segmentfault.com/img/bVbG2zL)

侧轴跟着主轴，先确定主轴，剩下的就是侧轴了

**主轴由flex-direction决定**





![](https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=652982918,2180743849&fm=26&gp=0.jpg)





# flex布局 父级属性

flex属性给父级元素指定

## flex-direction

**设置主轴的方向** 

```css
.container {
    flex-direction: row | row-reverse | column | column-reverse;
}
```

![](https://segmentfault.com/img/bVbG2zM)

![](https://www.ameamelog.com/wp/wp-content/uploads/2019/09/flexbox-flex-direction_main.png)



### flex-direction: row;

默认，可以省略不写

把主轴设置为 水平方向的x轴，

主轴方向从左往右

![](https://pic2.zhimg.com/80/v2-ae8828b8b022dc6f1b28d5b4f7082e91_1440w.jpg)

```html
    <style>
        div {
            display: flex;
            flex-direction:row;
        }
    </style>
</head>

<body>
    <div>
        <span>1</span>
        <span>2</span>
        <span>3</span>
    </div>
</body>
```



### flex-direction: row-reverse;

了解即可

把主轴设置为水平方向的x轴，

主轴方向从右往左

![](https://pic3.zhimg.com/80/v2-215c8626ac95e97834eddb552cfa148a_1440w.jpg)

```html
   <style>
        div {
            display: flex;
            flex-direction:row-reverse;
        }
    </style>
</head>

<body>
    <div>
        <span>1</span>
        <span>2</span>
        <span>3</span>
    </div>
</body>
```



### flex-direction: column;

把主轴设为垂直方向的y轴

主轴方向从上往下

![](https://pic1.zhimg.com/80/v2-33efe75d166a47588e0174d0830eb020_1440w.jpg)

```html
   <style>
        div {
            display: flex;
            flex-direction:column;
        }
    </style>
</head>

<body>
    <div>
        <span>1</span>
        <span>2</span>
        <span>3</span>
    </div>
</body>
```



### flex-direction: column-reverse；

了解即可

把主轴设为垂直方向的y轴

主轴方向从下往上

![](https://pic2.zhimg.com/80/v2-344757e0fb7eee11e75b127b8485e679_1440w.jpg)

```html
   <style>
        div {
            display: flex;
            flex-direction:column-reverse;
        }
    </style>
</head>

<body>
    <div>
        <span>1</span>
        <span>2</span>
        <span>3</span>
    </div>
</body>
```

---

---



## justify-content

设置**主轴上**的项目（子元素）的排列方式

```css
.container {
    justify-content: flex-start | flex-end | center | space-between | space-around;
}
```

![](https://segmentfault.com/img/bVbG2zP)

要先设定好主轴, 

如下是X轴为主轴：

![](https://user.oc-static.com/upload/2018/06/14/15289918266602_2.png)

如下是Y轴为主轴：

![](https://ichi.pro/assets/images/max/724/1*6NUIFlnX9SAanhWeOwt3Bg.gif)



### justify-content: flex-start;

默认，可省略不写

设定父盒子的主轴上的项目**沿主轴开始方向排列**，从头到尾

如下，以主轴为x轴为例：

![](https://pic1.zhimg.com/80/v2-1bafab80044a7ab2a6198d5937172eb0_1440w.jpg)

```css
        div {
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
        }
```



### justify-content:flex-end;

设定父盒子的主轴上的项目**沿主轴结束方向排列**，从尾到头，

和row-reverse、column-reverse不同的是，不颠倒项目顺序，

如下，以主轴为x轴为例：

![](https://pic3.zhimg.com/80/v2-8b163809a4c944486a127a7c22eee7b2_1440w.jpg)

```css
        div {
            display: flex;
            flex-direction: row;
            justify-content: flex-end;
        }
```



### justify-content:center

设定父盒子的主轴上的项目**局中紧挨排列**，

如下，以主轴为x轴为例：下图项目是有外边距的

![](https://pic4.zhimg.com/80/v2-dea82c75d35f532d35a52d1f9c1c762b_1440w.jpg)

```css
        div {
            display: flex;
            flex-direction: row;
            justify-content: center;
        }
```



### justify-content:space-around;

把主轴上的空间平均分配给每一个项目

如下，以主轴为x轴为例：

![](https://pic1.zhimg.com/80/v2-42a358111a221ff52768bdd55238eb0c_1440w.jpg)

```css
        div {
            display: flex;
            flex-direction: row;
            justify-content: space-around;
        }
```



### justify-content:space-between;

**重要**

主轴上的项目**两端贴边，中间的项目平均分配剩余空间**

类似圣杯布局的感觉

如下，以主轴为x轴为例：

![](https://pic1.zhimg.com/80/v2-ea4061e0f64dd8d7a1fcb5b0ad6f96a8_1440w.jpg)

```css
        div {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
        }
```

和justify-content: space-around的区分：

![](https://media.geeksforgeeks.org/wp-content/uploads/20191028151900/1081.png)

---

---





## align-items （单行）

设置**侧轴上**子元素的排列方式

```css
.container {
    align-items: flex-start | flex-end | center | baseline | stretch;
}
```

![](https://img-blog.csdnimg.cn/20201221010257467.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0JyYWluX0Rlc3Ryb3llcg==,size_16,color_FFFFFF,t_70)

先确定好主轴

如下：主轴是x轴时：

![](http://w3.unpocodetodo.info/css3/images/flex-align-items.gif)

如下：主轴是y轴时；

![](https://coliss.com/wp-content/uploads-201904/flexbox/17-align-items-column.png)



justify-content设定的是项目在主轴上的排列

align-items设定的是项目在侧轴上的排列

可理解为**一行排列的子项目**在侧轴上的位置

![](https://segmentfault.com/img/bVbG2zL)



### align-items：flex-start

沿侧轴开始位置对齐，**上对齐**

如下，主轴为x轴时：

![](https://pic3.zhimg.com/80/v2-26d9e85039beedd78e412459bd436e8a_1440w.jpg)

```css
        div {
            display: flex;
            flex-direction: row;
          	justify-content: space-between;
          	align-items: flex-start;
        }
```



### align-items: flex-end;

项目沿侧轴结束位置对齐，**下对齐**

如下，主轴为x轴时：

![](https://pic4.zhimg.com/80/v2-8b65ee47605a48ad2947b9ef4e4b01b3_1440w.jpg)

```css
        div {
            display: flex;
            flex-direction: row;
          	justify-content: space-between;
          	align-items: flex-start;
        }
```



### align-items: center;

项目沿着侧轴中间对齐，**居中**

如下，主轴为x轴时：

![](https://pic3.zhimg.com/80/v2-7bb9d8385273d8ad469605480f40f8f2_1440w.jpg)

```css
        div {
            display: flex;
            flex-direction: row;
          	justify-content: space-between;
          	align-items: center;
        }
```



### align-items: stretch；

了解即可，**拉伸**

如下，主轴为x轴时：

即如果**项目未设置高度或者设为 auto**，将占满整个容器的高度。

如果是y轴则是宽度

![](https://pic2.zhimg.com/80/v2-0cced8789b0d73edf0844aaa3a08926d_1440w.jpg)

```css
        div {
            display: flex;
            flex-direction: row;
          	justify-content: space-between;
          	align-items: stretch;
        }
```



### align-items: baseline;

了解即可

如下，主轴为x轴时：

![](https://5b0988e595225.cdn.sohucs.com/q_70,c_zoom,w_640/images/20180315/2198754544454cb59d00da36f3db6602.webp)

```css
        div {
            display: flex;
            flex-direction: row;
          	justify-content: space-between;
          	align-items: baseline;
        }
        /*
        子盒子没有设定height时，会拉伸铺满父盒子
        */
```



### 项目水平居中垂直居中

就是项目在主轴上居中，并且在侧轴上也居中

`justify-content: center`;

`align-items:center;`

如下，主轴是x轴：

```css
        div {
            display: flex;
            flex-direction: row;
          	justify-content: center;
          	align-items: center;
        }
```

如下，主轴是y轴：

```css
        div {
            display: flex;
            flex-direction: column;
          	justify-content: center;
          	align-items: center;
        }
```

---

---





## flex-wrap

**重要**

设定容器内项目(子元素)是否换行

```css
.container {
    flex-wrap: nowrap | wrap;
}
```

![](https://img-blog.csdnimg.cn/20201221001320896.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0JyYWluX0Rlc3Ryb3llcg==,size_16,color_FFFFFF,t_70)

![](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.amazonaws.com%2F0%2F67884%2F8b29926b-b9c8-3861-6dbf-f96600c339c7.png?ixlib=rb-1.2.2&auto=format&gif-q=60&q=75&s=1647d5f9d48bcaf8c1640e89d8fc5c61)

---

### flex-wrap:nowrap;

以前的传统布局中，一行内如果放不下元素就会自动换行显示

flex布局**默认不换行**，

会自动调整项目大小（子元素）使所有项目排在主轴线上，即**会压缩子元素使其一行显示**

如下，以主轴为x轴为例：

![](https://pic4.zhimg.com/80/v2-a590927ad6d83de8840d52a0cf2f0df3_1440w.jpg)

```css
        div {
            display: flex;
            flex-direction: row;
            flex-wrap:nowrap;
        }
```

---

### flex-wrap:wrap;

**重要**

如下，以主轴为x轴为例：

![](https://pic2.zhimg.com/80/v2-426949b061e8179aab00cacda8168651_1440w.jpg)

```css
        div {
            display: flex;
            flex-direction: row;
            flex-wrap:wrap;
        }
```

---

### 换行后align-items效果

**是将侧轴上的空间按换行后的行数，平均分给每行**

然后每一行在自己的行空间内上对齐、下对齐、居中等

![](https://web-designer.cman.jp/css_image/align-items.gif)

---

---





## align-content（多行/换行）

**侧轴上**子元素的排列方式，**只适用**多行的flex容器

即，flex容器中的子项目必须是 **换行** 后是多行的情况

![](https://img-blog.csdnimg.cn/20210127123844975.JPG?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTUxMzczMw==,size_16,color_FFFFFF,t_70#pic_center)

![align-content](http://w3.unpocodetodo.info/css3/images/flex-align-content.gif)

---

### align-content 和align-items区别

- align-items仅适合子项目是单行排列的情况，

  **控制每一行（轴线）在侧轴上的其所在空间内的位置**

  每一行（轴线）中间可能存有间隔空隙的

  只有上对齐、下对齐、居中、拉伸

- align-content仅适合子项目换行后的多行显示的情况，

  是把这些行（轴线）都看作**一个整体**，控制该整体在侧轴上的对齐

  行与行之间没有空隙

  有整体上对齐，整体下对齐、整体居中、每行平分、两侧对齐

---

---

### 多行的居中 align-items:center

`align-items:center;`是将侧轴上的空间按行数平均分给每行

然后每行各自按自己所在的行空间内居中对齐

![](https://img-blog.csdnimg.cn/20190304191403732.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2NjMTg4Njg4NzY4Mzc=,size_16,color_FFFFFF,t_70)

---

### 多行的居中 align-content:center

`align-content: center`是将子项的**所有行作为一个整体**

然后这个**整体**在flex容器的**侧轴上居中对齐**

![](https://img-blog.csdnimg.cn/20190304213024271.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2NjMTg4Njg4NzY4Mzc=,size_16,color_FFFFFF,t_70)





### 容器没有高度时的多行居中

flex容器不设高度时，容器大小由项目撑开

---

#### align—content：center；

`align-content`是把所有行作为整体，控制整体在侧轴的位置

因为**没有设定容器高度，相当于容器是由该多行的整体撑开**

所以此时的居中不会有效果

![](https://img-blog.csdnimg.cn/20190304211019849.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2NjMTg4Njg4NzY4Mzc=,size_16,color_FFFFFF,t_70)

#### align—items：center；

`align-items`是设定每一行在自己的行空间上居中

因为没有设定flex容器高度，容器高度取决于**最大的子项目的高度**

所以**每一行的空间上会有空余空间**，居中效果可以看出

![](https://img-blog.csdnimg.cn/20190304211354688.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2NjMTg4Njg4NzY4Mzc=,size_16,color_FFFFFF,t_70)

---







## flex-flow

同时设置flex-direction和flex-wrap

即 **`flex-direction` 和 `flex-wrap`的复合写法**

如下，主轴为x轴时：

```css
         div {
            display: flex;
            flex-direction: row;
            flex-wrap:wrap;
        }
```

```css
        div {
            display: flex;
            flex-flow: row wrap;     /*合写*/
        }
```

---

如下，主轴为y轴时：

```css
         div {
            display: flex;
            flex-direction: column;
            flex-wrap:wrap;
        }
```

```css
        div {
            display: flex;
            flex-flow: column wrap;   /*合写*/
        }
```

---









# flex布局 子级属性

设置在子元素身上的属性，

谁需要就给谁设

## flex属性

**重要**

设定子项目所占的**份数**

设定子项目去**分配剩余空间**

```css
.container item { flex: number; }
```

### flex: 1; 

`flex: 1;  `占满一行

指定子元素一个人占1份，即一个人占满全部剩余空间

```css
.container item:nth-child(1) {
  		flex: 1;
}
```

flex容器中所有子元素都占1份，即平分剩余空间

```css
.container item {
  		flex: 1;
}
```

---

`flex：2`，把占剩余空间中的两份

如下，第一个项目占一行的3分之2，第二个项目占3分之1

```css
.container item:nth-child(1) {
  		flex: 2;
}
.container item:nth-child(2) {
  		flex: 1;
}
```



### flex: 100 %; 

可以使用百分比，百分比是基于flex容器

如下，每一个项目占flex容器的20%

```css
.container item {
  flex：20%;
}
```

---

可以用来**实现换行**

确定一行放几个项目，全部占满是100%，

设定每个项目的百分比，如下：

```html
<div class="container">
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
  <div>5</div>
  <div>6</div>
  <div>7</div>
</div>
```

```css
.container {
  display: flex;
  flex-wrap： wrap；
}
.container item {
  flex：20%;
}
```

如上，设定的是`flex：20%`，且所以一行放 5 个，然后换行，

即，上述一行由 5 个项目平均分一行内容，多余的项目换行，

换行的项目依然占满所在的行



### 圣杯布局

![](https://upload-images.jianshu.io/upload_images/9397803-ab11463cd3c26105.png?imageMogr2/auto-orient/strip|imageView2/2/w/981/format/webp)

**两侧宽度固定，中间宽度自适应的三栏布局**

```html
<div class="container">
  <div></div>
  <div></div>
  <div></div>
</div>
```

```css
   .container {
            display: flex;
            flex-direction: row;
     				height: __px;
          	width: __px;

    }
   .container div:nth-child(1){
  		     	height: __px;
          	width: __px;			
		}
   .container div:nth-child(3){
  					height: __px;
          	width: __px;
		}   
	 .container div:nth-child(2){
  					flex: 1;
		}
```



### 左右平分，上下平分

```html
  <div class="container">
        <div class="left"></div>

        <div class="right">
            <div class="top">top</div>
            <div class="bottom">bottom</div>
        </div>
  </div>
```

```css
      .container {
            display: flex;
            justify-content: space-between;
            flex-flow: row wrap;
        }
        
      .container .left,
      .container .right {
            flex: 1;
        }
        
      .container .right {
            display: flex;
            flex-flow: column;
        }
        
      .right .top,
      .right .bottom {
            flex: 1;
        }
```



## align-self

单独控制某个子项目在侧轴的排列方式

![](http://majadc.com/nijanawia-content/uploads/2016/02/flex-align-self.png)

align-items是控制所有的子元素在侧轴上位置

若想单独控制某一个子元素在侧轴上的位置，需要align-self

默认是继承给flex容器设定的align-items

```css
.container item:nth-child(1) {
  		align-self: flex-start;
}
.container item:nth-child(2) {
  		align-self: flex-end;
}
.container item:nth-child(3) {
  		align-self: center;
}
.container item:nth-child(4) {
  		align-self: baseline;
}
.container item:nth-child(5) {
  		align-self: stretch;
}
```



## order

设置子项目的排列顺序，前后顺序

**数值越小，排列越靠前(主轴起始位置)，默认值为 0**

![](https://pic3.zhimg.com/80/v2-d606874ac9c496b3a0e46573c85e4376_1440w.jpg)

```css
.container item:nth-child(5) {
  		order: -2;
}
.container item:nth-child(1) {
  		order: 5;
}
```



