# 第三方模块 Gulp

![](https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fdevdojo.com%2Fmedia%2Fimages%2FMarch2016%2Fgulpjs.png&refer=http%3A%2F%2Fdevdojo.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1626634340&t=dce5ba6a9e032f2144b1f098a0b74389)

Gulp 是基于 node 的前端自动构建工具

将往常手写的机械化的操作，编写为可通过命令自动执行的命令行任务

Gulp 可用于：

- 项目上线时的，HTML、CSS、JS 文件的压缩合并重命名
- ES6 语法转换
- Less 语法转换
- 抽取公共文件
- 修改文件时浏览器自动刷新

**使用方法可查看 npm**

## 使用

### 1. 下载安装

```bash
npm i gulp
```

Gulp3 和 Gulp4 差距很大

### 2. 新建 gulpfile.js 文件

在项目中新建 gulpfile.js 文件

```js
xxxx | -node_modules | -package.json | (-package - lcok.json) | -gulpfile.js;
```

### 3. 重构项目目录

项目中新建 src 目录和 dist 目录

**src 目录**：存放源代码

**dist 目录**：存放构建后文件

```js
xxxx |
  -node_modules |
  -dist |
  -src |
  -css |
  -index.css |
  -js |
  -index.js |
  -images |
  -index.html |
  -package.json |
  (-package - lcok.json) |
  -gulpfile.js;
```

### 4. 编写任务

在创建的 gulpfile.js 文件中编写任务

- gulp.task()：建立 Gulp 任务

- gulp.src()：获取要处理的文件

- gulp.dest()：输出文件

- gulp.watch()：监控文件的变化

```js
// 导入gulp模块
const gulp = require("gulp");

// 建立任务first
gulp
  .task("first", () => {
    // 从src获取
    gulp.src("./src/css/index.css");
    // 处理后输出到dist
  })
  .pipe(gulp.dest("./dist/css"));
```

---

#### gulp.task()

建立 Gulp 任务

```js
gulp.task("任务名称001", () => {
  console.log("did the first gulp task001");
});

gulp.task("任务名称002", () => {
  console.log("did the first gulp task002");
});
```

如果报错：

```bash
 Did you forget to signal async completion?
```

解决方法：

使用 async await

```js
const gulp = require("gulp");

gulp.task("first", async () => {
  // await console.log('did the first gulp task');

  await gulp.src("./src/css/index.css").pipe(gulp.dest("./dist/css"));
});
```

---

#### gulp.src()

获取要处理的文件

```js
gulp.src("要处理的文件地址");
```

---

#### gulp.dest()

输出文件

会根据自动路径自动创建文件夹

```js
gulp.dest("处理后的输出地址");
```

---

#### gulp.watch()

监控文件的变化

### 5. 执行 gulp 任务

在命令行中执行 gulp 任务

需要先下载 Gulp 提供的命令行工具

#### gulp-cli 命令行工具

```bash
npm i gulp-cli -g
```

```bash
gulp gulpfile.js中创建的任务名

gulp first
```

---

#### 拷贝文件夹

用于复制 images 等文件夹

```js
const gulp = require("gulp");

gulp.task("copy", async () => {
  await gulp.src("./src/images/*").pipe(gulp.dest("./dist/images"));
});
```

```bash
gulp copy
```

## gulp 插件

Gulp 是轻量级模块，仅提供了上述方法

其余是通过插件形式解决

使用详见 npm 官网

- **gulp-htmlmin：**HTML 文件压缩
- **gulp-csso：**CSS 文件压缩
- **gulp-babel：**JSES6 语法转义 ES5
- **gulp-less：**Less 语法转换 CSS
- **gulp-uglify：**压缩混淆 JS
- **gulp-file-include：**公共文件包含
- **browsersync：**浏览器实时同步

```bash
npm 插件名
```

```js
const gulp插件名 = reuqire("gulp插件名");
```

### 压缩 HTML 文件

**gulp-htmlmin 插件：**HTML 文件压缩为一行

如下：

```
npm i gulp-htmlmin
```

将项目目录下 src 中的所有 HTML 文件，

压缩后存到项目目录下的 dist 目录下中

```js
const gulp = require("gulp");
const htmlmin = require("gulp-htmlmin");

gulp.task("htmlmin", async () => {
  await gulp
    .src("./src/*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("./dist"));
});
```

```bash
gulp htmlmin
```

其中`'*.html'`是选中所有 HTML 文件

### 压缩 CSS 文件

**gulp-csso：**CSS 文件压缩为一行

如下：

```bash
npm i gulp-csso
```

将项目目录下 src 中 css 目录下的所有 css 文件，

压缩后存到项目目录下的 dist 目录下的 css 目录中

```js
const gulp = require("gulp");
const csso = require("gulp-csso");

gulp.task("cssmin", async () => {
  await gulp
    .src("./src/css/*.css")
    .pipe(csso())
    .pipe(gulp.dest("./dist/css"));
});
```

```bash
gulp cssmin
```

其中`'*.css'`是选中所有 css 文件

### Less 转化为 CSS 文件

**gulp-less 插件：**Less 语法转换 CSS

如下：

```bash
npm i gulp-less
```

将项目目录下 src 中的 css 目录下的所有 less 文件转为 css 文件，

并存到项目目录下的 dist 目录下的 css 中

```js
const gulp = require("gulp");
const less = require("gulp-less");

gulp.task("less", async () => {
  await gulp
    .src("./src/css/*.less")

    .pipe(less())

    .pipe(gulp.dest("./dist/css"));
});
```

```bash
gulp less
```

其中`'*.less'`是选中所有 Less 文件

### Less 转义并压缩 CSS 文件

```js
const gulp = require("gulp");
const less = require("gulp-less");
const csso = require("gulp-csso");

gulp.task("cssmin", async () => {
  await gulp
    .src(["./src/css/*.css", "./src/css/*.less"])
    .pipe(less())
    .pipe(csso())
    .pipe(gulp.dest("./dist/css"));
});
```

```bash
gulp cssmin
```

### ES6 转换

```bash
# Babel 7
$ npm install --save-dev gulp-babel @babel/core @babel/preset-env

# Babel 6
$ npm install --save-dev gulp-babel@7 babel-core babel-preset-env
```

```js
const gulp = require("gulp");
const babel = require("gulp-babel");

gulp.task("jsmin", () =>
  gulp
    .src("src/js/*.js")
    .pipe(
      babel({
        presets: ["@babel/env"],
      })
    )
    .pipe(gulp.dest("dist/js"))
);
```

```bash
gulp jsmin
```

其中`'*.js'`是选中所有 JS 文件

### 并压缩 JS 文件

```bash
npm install --save-dev gulp-uglify
```

```js
var gulp = require("gulp");
var uglify = require("gulp-uglify");
var pipeline = require("readable-stream").pipeline;

gulp.task("compress", function() {
  return pipeline(gulp.src("lib/*.js"), uglify(), gulp.dest("dist"));
});
```

```bash
gulp compress
```

## build 构建任务

```js
gulp.task("build", ["task001", "task002", "task003"]);
```

如下：

```js
const gulp = require("gulp");
const htmlmin = require("gulp-htmlmin");
const less = require("gulp-less");
const csso = require("gulp-csso");
const babel = require("gulp-babel");
var uglify = require("gulp-uglify");

// 压缩所有html
gulp.task("htmlmin", () => {
  gulp
    .src("./src/*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("./dist"));
});

// 转义less并压缩所有css
gulp.task("cssmin", () => {
  gulp
    .src(["./src/css/*.css", "./src/css/*.less"])
    .pipe(less())
    .pipe(csso())
    .pipe(gulp.dest("./dist/css"));
});

// 转义ES6并压缩所有
gulp.task("jsmin", () =>
  gulp
    .src("src/js/*.js")
    .pipe(
      babel({
        presets: ["@babel/env"],
      })
    )
    .pipe(uglify())
    .pipe(gulp.dest("dist/js"))
);

// 拷贝文件夹
gulp.task("copy", () => {
  gulp.src("./src/images/*").pipe(gulp.dest("dist/images"));
});

// 构建
gulp.task("build", ["htmlmin", "cssmin", "jsmin", "copy"]);
```

```bash
gulp build
```

## gulp3 与 gulp4 版本

Gulp3，

如果有一个任务 A，B 和 C 的列表，

你想在一个序列中运行（确保 A 在 B 开始之前完成，而 B 在 C 开始之前完成），

代码如下：

```js
gulp.task("a", function() {
  // Do something.
});
gulp.task("b", ["a"], function() {
  // Do some stuff.
});
gulp.task("c", ["b"], function() {
  // Do some more stuff.
});
```

---

在 Gulp 4 中，

你不能再这样做了。

你会得到以下错误：

```bash
assert.js:85
  throw new assert.AssertionError({
  ^
AssertionError: Task function must be specified
    at Gulp.set [as _setTask] (/home/hope/web/node_modules/undertaker/lib/set-task.js:10:3)
    at Gulp.task (/home/hope/web/node_modules/undertaker/lib/task.js:13:8)
    at Object.<anonymous> (/home/hope/web/gulpfile.js:31:6)
    at Module._compile (module.js:570:32)
    at Object.Module._extensions..js (module.js:579:10)
    at Module.load (module.js:487:32)
    at tryModuleLoad (module.js:446:12)
    at Function.Module._load (module.js:438:3)
    at Module.require (module.js:497:17)
    at require (internal/module.js:20:19)
```

需要使用 gulp.series 和 gulp.parallel，

因为 gulp 任务现在只有两个参数。

```js
gulp.series：按照顺序执行
gulp.paralle：可以并行计算
```

```js
gulp.task(
  "my-tasks",
  gulp.series("a", "b", "c", function() {
    // Do something after a, b, and c are finished.
  })
);

gulp.task(
  "build",
  gulp.parallel("styles", "scripts", "images", function() {
    // Build the website.
  })
);
```
