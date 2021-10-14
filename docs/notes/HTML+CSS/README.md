# HTML & CSS 相关目录

::: tip 官方文档
[W3School HTML](https://www.w3schools.com/html/default.asp)

[W3School CSS](https://www.w3schools.com/css/default.asp)
:::

## HTML

[HTML5 基础](./HTML.md)

[Form](./HTML.md)

[LocalStorage](../notes/Javascript/.md)

[SessionStorage](../notes/Javascript/.md)

### Template Engine

[Art-Template]()

[ERB]()

<br>

## CSS

[CSS3 基础](./CSS.md)

### CSS Extension Languages

[CSS 扩展语言——Less](./ExtensionLanguages/#less)

[CSS 扩展语言——Sass/Scss](./ExtensionLanguages/#sass)

### CSS Frameworks

[CSS 框架](./Frameworks/)

<br>

## 注意事项

::: tip <h3>HTML 书写规范</h3>
[HTML 书写规范——模版](./extra-01.md)

[HTML 书写规范——元素标签](./extra-02.md)
:::

::: tip <h3>CSS 浏览器私有前缀</h3>
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

:::

::: tip <h3>CSS 属性顺序</h3>

1.  布局定位属性：
    display / position / float / clear / visibility / overflow
2.  自身属性：
    width / height / margin / padding / border / background
3.  文本属性：
    color / font / text-decoration / text-align / vertical-align / white- space / break-word
4.  其他属性（CSS3）：
    content / cursor / border-radius / box-shadow / text-shadow / background: linear-gradient

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

:::
