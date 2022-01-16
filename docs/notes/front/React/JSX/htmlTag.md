# React 过滤富文本编辑器数据

React 中若要将 **带标签 ，带排版样式** 的数据作为`HTML`标签显示，

需要通过标签的`dangerouslySetInnerHTML`属性

```jsx
<div
  dangerouslySetInnerHTML={{
    __html: 数据,
  }}
></div>
```

若后台返回的数据是加密过的

```js
content: "%3Cp%3E%3Cbr%2F%3E%3C%2Fp%3E%3Cp%20style%3D%22line";
```

则前端需要解码

```js
decodeURIComponent();
```
