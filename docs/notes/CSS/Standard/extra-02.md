# CSS 属性顺序、浏览器私有前缀

## 浏览器私有前缀

CSS3 浏览器私有前缀在前，标准前缀在后。

```css
.jdc {
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  -o-border-radius: 10px;
  -ms-border-radius: 10px;
  border-radius: 10px;
}
```

## CSS 属性顺序

::: tip 书写顺序：

1.  布局定位属性：

    display / position / float / clear / visibility / overflow

2.  自身属性：

    width / height / margin / padding / border / background

3.  文本属性：

    color / font / text-decoration / text-align / vertical-align / white- space / break-word

4.  其他属性（CSS3）：

    content / cursor / border-radius / box-shadow / text-shadow / background: linear-gradient

:::

```css
.jdc {
  display: block;
  position: relative;
  float: left;
  width: 100px;
  height: 100px;
  margin: 0 10px;
  padding: 20px 0;
  font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
  color: #333;
  background: rgba(0, 0, 0, 0.5);
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  -o-border-radius: 10px;
  -ms-border-radius: 10px;
  border-radius: 10px;
}
```
