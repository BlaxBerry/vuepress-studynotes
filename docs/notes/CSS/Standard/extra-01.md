# CSS 样式书写规范

## UTF-8 编码

样式文件必须写上 `@charset` 规则，并且一定要在样式文件的第一行首个字符位置开始写，编码名用 “UTF-8”。

```css
@charset "UTF-8";
.jdc {
}
```

## 格式化

样式书写一般有两种：

- 紧凑格式 （Compact） 不推荐
- 展开格式（Expanded）

```css
// 推荐展开格式

.jdc {
  display: block;
  width: 50px;
}
```

```css
// 不推荐紧凑格式

.jdc { display: block; width: 50px;}
```

## 大小写

样式选择器，属性名，属性值关键字全部使用 **小写字母**。

```css
.jdc {
  display: block;
}
```
## 缩进、空格、换行

左括号与类名之间一个空格，冒号与属性值之间一个空格。

```css
.jdc {
  width: 100%;
}
```

逗号分隔的取值，逗号之后一个空格。

```css
.jdc {
  box-shadow: 1px 1px 1px #333, 2px 2px 2px #ccc;
}
```

为单个 CSS 选择器或新声明开启新行。

```css
.jdc, .jdc_logo, .jdc_hd {
  color: #ff0;
}

.nav{
  color: #fff;
}
```

颜色值 rgb() rgba() hsl() hsla() rect() 中不需有空格。

```css
.jdc {
  color: rgba(255,255,255);
}
```


## 属性值

### 数值 0

不要为数值 `0` 指明单位。

```css
.jdc {
  margin: 0 10px;
}
```

颜色值 rgb() rgba() hsl() hsla() rect() 取值小数点前的 `0` 可省略。

```css
.jdc {
  color: rgba(255,255,255,.5);
}
```

### 十六进制数值

属性值十六进制数值能用简写的尽量用简写。

```css
// 推荐
.jdc {
  color: #fff;
}

// 不推荐
.jdc {
  color: #ffffff;
}
```

### 单引号

CSS 属性值需要用到引号时，统一使用单引号。

```css
.jdc {
  font-family: 'Hiragino Sans GB';
}
```