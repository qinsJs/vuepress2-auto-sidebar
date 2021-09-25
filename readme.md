# Vuepress 2 侧边栏生成

vuepress2-auto-sidebar

## 1

```sh
npm i vuepress2sidebar
```

## 2

`.vuepress/config.js`

```js
const { default: Sidebar } = require("vuepress2sidebar");

module.exports = {
  // ..

  themeConfig: {
    logo: "/logo/moon.svg",
    sidebar: new Sidebar().run(), // <<<<
  },

  // ..
};
```

## 3

在想要 生成侧边栏的 目录下，新增一个 `chapter.js`

比如：

```
+ .vuepress
+ js
  + 1basic
    - 文章a.md
    - 文章b.md
  + 2object
    - emmm.md
  + 3array
    - emmm.md
  + chapter.js <<<<<<
readme.md
```
