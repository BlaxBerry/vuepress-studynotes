# clsx 基础使用

[[toc]]

## 简介

clsx 是个用于动态设置 className 类名的第三方模块

是 [classnames](https://www.npmjs.com/package/classnames)模块的更小更快的替代品

<br/>

## 安装

```bash
yarn add clsx

# 1.1.1
```

<br/>

## 使用

`import` 导入后在 `className` 处调用 `clsx()` 方法

```jsx
import clsx from "clsx";
<标签 className={clsx(/* 要结合的类名 */)} />;
```

可以接受任意数量的参数，参数可以是对象、数组、布尔值、字符等形式 [详见下文](https://blaxberry.github.io/vuepress-studynotes/notes/front/React/Plugins/style/clsx.html#例子)

返回值是没有逗号分隔的字符串

```js
console.log(clsx(参数, 参数, 参数)
// "参数 参数 参数"
```

虚值和独立的布尔值不会被返回

```js
console.log(clsx(true, false, "", null, undefined, 0, NaN));
// ""
```

<br/>

## 例子

```jsx
import React from "react";
import clsx from "clsx";

export default function App() {
  return (
    <>
      <div className={clsx("a", "b", "c", "-end")} />
      {/* className="a b c -end" */}

      <div className={clsx(true && "a", false && "b")} />
      {/* className="a" */}

      <div className={clsx(true || "a", false || "b")} />
      {/* className="b" */}

      <div className={clsx(true, false, null, 0, NaN, "")} />
      {/* className="" */}

      <div
        className={clsx({
          a: true,
          b: false,
          c: 1,
          d: 0,
          e: null,
          f: undefined,
          "-hello": true,
        })}
      />
      {/* className="a c -hello" */}

      <div className={clsx("a", { b: true }, "c", { d: false })} />
      {/* className="a b c" */}

      <div
        className={clsx("a", "b", {
          c: true,
          d: false,
        })}
      />
      {/* className="a b c" */}

      <div className={clsx(["a", "b", "c", "-end"])} />
      {/* className="a b c -end" */}

      <div className={clsx(["a"], "b", ["c", "-end"])} />
      {/* className="a b c -end" */}

      <div
        className={clsx(["a"], "b", [
          "c",
          2 && "d",
          {
            c: false,
            "-end": true,
          },
          [["hello"], "world"],
        ])}
      />
      {/* className="a b c d -end hello world" */}
    </>
  );
}
```
