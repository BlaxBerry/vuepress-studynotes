# Gatsby 配置文件

## gatsby-browser.js

`gatsby-browser.js` 通过特定 API 响应浏览器中的 Gatsby 特定事件

并将页面组件包装在其他全局组件中

## gatsby-config.js

[Gatsby-Image-plugin 详细文档](https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-plugin-image/#gatsbyimage)

## gatsby-node.js

### createPage()

以编程方式创建页面

```js
exports.createPages = ({ actions }) => {
  const { createPage } = actions;
  // ...
};
```

> 如下：

```js
// gatsby-node.js
exports.createPages = ({ actions }) => {
  const { createPage } = actions;

  const dogData = [
    {
      name: "Fido",
      breed: "Sheltie",
    },
    {
      name: "Sparky",
      breed: "Corgi",
    },
  ];
  dogData.forEach((dog) => {
    createPage({
      path: `/${dog.name}`,
      component: require.resolve(`./src/templates/dog-template.js`),
      context: { dog },
    });
  });
};
```

```js
// src/templates/dog-template.js
import React from "react";
export default function DogTemplate({ pageContext: { dog } }) {
  return (
    <section>
      {dog.name} - {dog.breed}
    </section>
  );
}
```

## gatsby-ssr.js
