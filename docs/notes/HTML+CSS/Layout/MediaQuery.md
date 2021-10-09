# Media Query

![](https://miro.medium.com/max/10482/1*FkoAK9fWw80lTTY-KQ8TOA.png)

**媒体查询**是CSS3 新语法，

可以针对不同媒体类型定义不同样式

重置浏览器大小的过程中，页面也会根据浏览器宽高重新渲染页面

苹果、安卓、平板等设备常用媒体查询





## 声明媒体查询

```css
@media mediatype and|not|only (media feature){
  css-code;
}
```

**@media** 声明

**mediatype** 媒体查询类型

**and not only** 连接关键字

**(media feature)** 媒体特性



### mediatype 

根据不同终端设备划分不同的媒体查询类型

|     值     |             解释             |
| :--------: | :--------------------------: |
|    all     |           所有设备           |
|   print    |      打印机和打印机浏览      |
| **screen** | **电脑屏幕、平板、智能手机** |



### 连接关键字

把媒体类型和媒体特性连接到一起

| 关键字 |             解释             |
| :----: | :--------------------------: |
|  and   |     且，连接多个媒体特性     |
|  not   | 非，排除某个媒体类型，可省略 |
|  only  | 仅，特定某个媒体类型，可省略 |

比如：连接多个特性

```css
@media screen and (min-width: 100px) and (max-width: 500px)
  /*在屏幕上 且 宽带大于等于100px 且 宽带小于等于500px*/
```



### 媒体特性

每种媒体都有各自不同的特性

要加括号

|    关键字     |                    解释                     |
| :-----------: | :-----------------------------------------: |
|     width     |           **页面可见区域的宽度**            |
| **min-width** | **页面最小可见区域的宽度** , **>=大于等于** |
| **max-width** | **页面最大可见区域的宽度**, **<=小于等于**  |

如下，

屏幕上且  **最大宽度是800px**时，即**宽度不大于（小于等于）800px时**，

body背景色变为是red;

屏幕上且  **最大宽度是500px**时，即**宽度不大于（小于等于）500px时**，

body背景色变为是yellow

```css
@media screen and (max-width: 800px){
  body {background-color：red;}
};
@media screen and (max-width: 500px){
  body {background-color：yellow;}
}
```

再如下：

最好是从小到大，要注意**css层叠性**，后面的覆盖前面的

```css
  @media screen and (min-width: 320px) {
            html {
                background-color: crimson;
            }
        }
        
   @media screen and (min-width: 700px) {
            html {
                background-color: purple;
            }
        }
        
   @media screen and (min-width: 1000px) {
            html {
                background-color: teal;
            }
        }
```

屏幕大于等于320px时，背景红色

屏幕大于等于700px时，背景紫色

屏幕大于等于1000px时，背景蓝色



## 引入资源

[三星官网的响应式页面](https://www.samsungeshop.com.cn/)

当css样式复杂时，可针对不同媒体引入使用不同的css样式

**直接在link引入时就判断**

如下：

如果 屏幕大于等于 640 一行显示3个 ，如果屏幕小于 640 一行显示1个 ：

```html
<link rel="stylesheet" href="./02.css" media="screen and (max-width: 640px)">
<link rel="stylesheet" href="./01.css" media="screen and (min-width: 640px)">


<body>
    <div>1</div>
    <div>2</div>
    <div>3</div>
</body>

```

```css
/*01.css*/
div {
    float: left;
    width: 33.33%;
    height: 100px;
}
```

```css
/*02.css*/
div {
    width: 100%;
    height: 100px;
}
```



## 媒体查询 + rem 

```html
<style>
        @media screen and (min-width: 320px) {
            html {
                font-size: 20px;
              }
        }
        
        @media screen and (min-width: 700px) {
            html {
                font-size: 50px;
              }
        }
        
        @media screen and (min-width: 1000px) {
            html {
                font-size: 100px;
              }
        }
        
        p {
            height: 1rem;
            font-size: .5rem;
            line-height: 1rem;
            text-align: center;
            background-color: crimson;
        }
    </style>
</head>

<body>
    <p>hello</p>
</body>
```





