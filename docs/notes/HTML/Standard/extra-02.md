# HTML 书写规范——元素标签

::: tip HTML 元素共有以下 5 种：

- **空元素：**  
   area、base、br、col、command、embed、hr、img、input、keygen、link、meta、param、source、track、wbr

- **原始文本元素：**
  script、style

- **RCDATA 元素：**
  textarea、title

- **外来元素：**
  来自 MathML 命名空间和 SVG 命名空间的元素

- **常规元素：**
  其他 HTML 允许的元素都称为常规元素
  :::

## 标签闭合

所有具有开始标签和结束标签的元素都要写上起止标签。

空元素标签都不加 “/” 字符。

```html
<div>
  <h1>我是h1标题</h1>
  <p>我是一段文字，我有始有终，浏览器能正确解析</p>
</div>

<br data-tomark-pass />
```

## 嵌套

每个块状元素独立一行，内联元素可选。

```html
<div>
  <h1></h1>
  <p></p>
</div>
<p>
  <span></span>
  <span></span>
</p>
```

## 标题

段落元素与标题元素只能嵌套内联元素。

```html
<!-- good -->
<h1><span></span></h1>
<p><span></span><span></span></p>

<!-- bad -->
<h1><div></div></h1>
<p><div></div><div></div></p>
```
