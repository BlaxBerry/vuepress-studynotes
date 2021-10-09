# em・rem

em 和 rem 都是单位
![](https://www.pc-koubou.jp/magazine/wp-content/uploads/2019/10/css_rem_image04.png)

## em

是以当前元素的 **父元素** 的字体大小为基准

如下： 结果是子元素高宽为 100px：

```css
.father {
  font-size: 10px;
}
.son {
  height: 10em;
  width: 10em;
}
```

## rem

以 **<html\>元素** 的字体大小为基准

如下，盒子的高宽为 100px：

```css
html {
  font-size: 10px;
}
div {
  height: 10rem;
  width: 10rem;
}
```
