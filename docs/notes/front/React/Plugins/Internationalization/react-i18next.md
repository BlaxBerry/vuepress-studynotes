# react-i18next

![img](https://ichi.pro/assets/images/max/724/1*vS_SH5XDDjtDTtbWj_eKlw.png)

[[toc]]

## 安装

```bash
yarn add react-i18next i18next
```

若要检测当前浏览器的语言则需要下载

```bash
yarn add i18next-browser-languagedetector
```

若要从服务器获取配置资源

```bash
yarn add i18next-http-backend
```

<br/>

## 配置

通过配置 json 文件、 js 文件实现多语言切换

```js
|- src
	|- locals
		|- [language].json
		|- [language].json
```

### json 文件

```js
|- src
	|- locales
			|- en.json
			|- ja.json
			|- zh.json
```

> 如下：

```json
// en.json
{
  "hello": "Hello",
  "change": {
    "to-ZH": "Change to Chinese",
    "to-EN": "Change to English",
    "to-JA": "Change to Japanese"
  }
}
// ja.json
{
  "hello": "こんにちは",
  "change": {
    "to-ZH": "中国語 に変更する",
    "to-EN": "英語 に変更する",
    "to-JA": "日本語 に変更する"
  }
}
// zh.json
{
  "hello": "你好",
  "change": {
    "to-ZH": "切换为 中文",
    "to-EN": "切换为 英文",
    "to-JA": "切换为 日语"
  }
}
```

---

### 配置文件

配置 i18 文件，然后将其导入项目入口文件后，即可在各个组件中[使用](https://blaxberry.github.io/vuepress-studynotes/notes/front/React/Plugins/i18n/react-i18next.html#使用)

> 如下：i18n 配置文件

```js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import browserLanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";
import zh from "../locales/zh.json";
import en from "../locales/en.json";
import ja from "../locales/ja.json";

i18n
  // 监测当前浏览器语言
  // .use(browserLanguageDetector)
  // 从服务器获取配置资源
  // .use(Backend)
  .use(initReactI18next)
  .init({
    // 引入资源文件
    resources: {
      en: {
        translation: en,
      },
      zh: {
        translation: zh,
      },
      ja: {
        translation: ja,
      },
    },
    // 选择默认语言, 与i18next-browser-languagedetector冲突
    fallbackLng: "zh",
    debug: false,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
```

<br/>

## 使用

```js
import { useTranslation, Trans, Translation } from "react-i18next";
```

::: tip 共有三种使用方式：

- [useTranslation 钩子函数](https://blaxberry.github.io/vuepress-studynotes/notes/front/React/Plugins/i18n/react-i18next.html#usetranslation)（常用）
- [Trans 组件](https://blaxberry.github.io/vuepress-studynotes/notes/front/React/Plugins/i18n/react-i18next.html#trans-组件)（常用）
- [Translation 组件](https://blaxberry.github.io/vuepress-studynotes/notes/front/React/Plugins/i18n/react-i18next.html#translation-组件)

:::

### useTranslation()

```js
import { useTranslation } from "react-i18next";
const { t, i18n } = useTranslation();
```

::: tip 解构内容：

- **`t()`**：返回值为当前语言下的翻译内容
- `i18n`
  - **`i18n.language`**：获取当前语言
  - **`i18n.changeLanguage()`**：用来切换语言

:::

> 如下：

```jsx
import React from "react";
import { useTranslation } from "react-i18next";
import "./config/i18";

const Index = () => {
  const { t, i18n } = useTranslation();

  const changeLang = (lang) => {
    i18n.changeLanguage(lang);
  };
  return (
    <>
      <h2>{t("hello")}</h2>
      <h3>{i18n.language}</h3>
      <button onClick={() => changeLang("zh")}>{t("change.to-ZH")}</button>
      <button onClick={() => changeLang("en")}>{t("change.to-EN")}</button>
      <button onClick={() => changeLang("ja")}>{t("change.to-JA")}</button>
    </>
  );
};

export default Index;
```

---

### Trans 组件

只显示翻译内容时可直接使用`<Trans>组件`

```js
import { Trans } from "react-i18next";
```

> 如下：

```jsx
import React from "react";
import { Trans } from "react-i18next";

const DEFAULT_PERSON = {
  name: "Andy",
  age: 28,
};

const Index = () => {
  return (
    <>
      <h2>
        <Trans>hello</Trans>
      </h2>
      <ul>
        <li>
          <Trans>name</Trans>
          {DEFAULT_PERSON.name}
        </li>
        <li>
          <Trans>age</Trans>
          {DEFAULT_PERSON.age}
        </li>
      </ul>
    </>
  );
};

export default Index;
```

---

### Translation 组件

> 都特么 2022 年了用 [useTranslation() 钩子函数](https://blaxberry.github.io/vuepress-studynotes/notes/front/React/Plugins/i18n/react-i18next.html#usetranslation) 得了

```js
import { Translation } from "react-i18next";
<Translation>{(t, { i18n, lng }) => <></>}</Translation>;
```

::: tip 解构内容：

- **`t()`**： 返回值为当前语言下的翻译内容
- **`lng`**：获取当前语言
- **`i18n`**
  - **`i18n.changeLanguage()`**：用来切换语言

:::

> 如下：

```jsx
import React from "react";
import { Translation } from "react-i18next";

const Index = () => {
  return (
    <>
      <Translation>
        {(t, { i18n, lng }) => (
          <>
            <h2>{t("hello")}</h2>
            <h3>{lng}</h3>
            <button onClick={() => i18n.changeLanguage("zh")}>
              {t("change.to-ZH")}
            </button>
            <button onClick={() => i18n.changeLanguage("en")}>
              {t("change.to-EN")}
            </button>
            <button onClick={() => i18n.changeLanguage("ja")}>
              {t("change.to-JA")}
            </button>
          </>
        )}
      </Translation>
    </>
  );
};

export default Index;
```

<br/>

## 插件

### Gatsby.js

[gatsby-plugin-react-i18next](https://blaxberry.github.io/vuepress-studynotes/notes/front/React/Plugins/i18n/react-i18next.html)
