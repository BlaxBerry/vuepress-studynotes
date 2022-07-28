# vue-i18n

![img](https://gyazo.com/3352e568db7d10b4830e15f899236865/max_size/400)

[[toc]]

## 安装

```bash
npm install vue-i18n
# 或
yarn add vue-i18n
```

<br/>

## 配置

### 目录

```js
|- src
	|- lang
		|- en.ts
		|- ja.ts
		|- zh.ts
	|- plugins
		|- index.ts
```

---

### 翻译文件

```tsx
// en.ts
export default {
  hello: "Hello",
};
```

```jsx
// ja.ts
export default {
  hello: "こんにちは",
};
```

```tsx
// zh.ts
export default {
  hello: "你好",
};
```

---

### 配置文件

```tsx
import type { App } from 'vue'
import { createI18n } from 'vue-i18n'
// User defined lang
import enLocale from '../lang/en'
import zhLocale from '..lang//zh'

const messages = {
  en: {
    ...enLocale
  },
  zh: {
    ...zhLocale
  }
}

const getLocale = () => {
  // 读取cookie存入的当前语言
  const cookieLanguage = sessionStorage.getItem('language')
  // 如果有返回当前语言
  if (cookieLanguage) {
    return cookieLanguage
  }
  // 如果没有，获取系统语言
  const language = navigator.language.toLowerCase()
  // 获取messages 语言 遍历
  const locales = Object.keys(messages)
  for (const locale of locales) {
    // 如果messsage 包里面有系统语言返回
    if (language.indexOf(locale) > -1) {
      return locale
    }
  }
  // 默认语言 简体中文
  return 'zh-cn'
}

const i18n = createI18n({
  locale: getLocale(),
  messages
})

// export default i18n
export default (app: App<Element>): void => {
  app.use(i18n)
}
```

<br/>

## 使用

```vue
<template>
  <div>{{ t("hello") }}</div>
</template>

<script lang="ts" setup>
import { useI18n } from "vue-i18n";
const { t } = useI18n();
</script>
```
