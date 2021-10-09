# TypeScript基础

![](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyogJYL3TfhG6A2mv7rjw53m6cTqsfqJ8mpGpdTRpyDQHWwgxefPEsP4n5bf6zTsFTp7k&usqp=CAU)

## 简介

- TypeScript是以JavaScript为基础构建的语言，是JS的一个超集

- TS完全兼容JS，可在任何支持JS的平台执行

- TS不是替换JS，是在原来扩展了JS

  可理解为SCSS与CSS的关系

- TS不能被JS解析器直接执行

  .ts文件无法直接被浏览器执行，需要先编译为JS
  
  

>  TS新增内容
>
> - 增加类型
> - 支持ES6+新特性
>
> - 添加了JS不具备的新特性
> - 可配置兼容，编译为任意版本的JS





## TS环境搭建

1. 下载Node.js
2. npm全局安装 typescript（TS编译器）

```bash
npm i -g typescript
```

```bash
tsc -v
Version 4.3.5
```

3. 创建.ts文件

4. 使用tsc编译.ts文件为.js文件

```bash
cd ts文件所在目录
tsc xxx.ts
```

5. 监视编译

```bash
tsc xxx.ts -w
```







## 基本类型

TS最大特点是 **给变量、函数参数赋予类型**

使JS由 动态类型语言 —> 静态类型语言

后面再赋值时只能是指定类型，不然报错



### JS的数据类型

```js
// JS声明的变量的数据类型不固定
let a;
a = 10;
a = 'hello';
```

```js
// JS的函数参数的数据类型不固定
// 可能在调用函数传参时出现意外
function sum(a, b) {
    return a + b;
}
console.log(sum(10, 20)); // 30
console.log(sum('10', 20)); // 1020
console.log(sum(10)); // NaN
```



### 1. 设定类型

#### 变量

- **类型声明**

  定义时就设置类型

  声明类型后，后面再赋值时只能是指定类型，不然报错

- **TS自动判断类型**

  同时声明赋值时，可不设定类型，TS会自动检测变量类型

```ts
let 变量:类型;

let 变量:类型 = 值;
```

如下：定义变量时，设定变量中的数据类型为number

```ts
// 定义时就设置变量类型
let a:number;
a = 100;
a = 'hello'; // 报错
// type 'string' is not assignable to type 'number'.


// 同时声明赋值
let a = 100；
a = 'hello'; // 报错
// type 'string' is not assignable to type 'number'.
```

---

#### 函数参数

```ts
function(参数:类型, 参数:类型){ 
	....
}
```

如下：定义函数时，设定参数的类型为number

```ts
function sum(a:number, b:number){
    return a + b
}

console.log(sum(10,20));
console.log(sum('10',20)); // 报错
//Argument of type 'string' is not assignable to parameter of type 'number'.
console.log(sum(10)); // 报错
//Expected 2 arguments, but got 1.
```

---

#### 函数返回值

```ts
function():类型{ 
	....
}
```

如下：定义函数时，设定函数返回值的类型为number

```ts
function sum(a:number, b:number):number{
    return a + b
}
let result = sum(10 ,20)

// 若返回值不是number会报错
function sum(a:number, b:number):number{
    return a + 'hello'
}
// 报错
//Argument of type 'string' is not assignable to parameter of type 'number'.
```





### 2. TS类型

|  类型   |             描述             |        例子        |
| :-----: | :--------------------------: | :----------------: |
| number  |             数字             |       10, 20       |
| string  |            字符串            |   '10', 'hello'    |
| boolean |            布尔值            |     rue, false     |
| object  |             对象             |  { name: 'andy' }  |
|  array  |             数组             |     [1, 2, 3]      |
| 字面量  |      值就是该字面量的值      |       其本身       |
|   any   |           任意类型           | **( 不建议使用 )** |
| unknown |        类型安全的any         |                    |
|  void   |      空值 或 undefined       | 空值 或 undefined  |
|  never  |            没有值            |    不能是任何值    |
|  tuple  | TS新增，元组，固定长度的数组 |       [1, 2]       |
|  enum   |         TS新增，枚举         |     enum{A, B}     |







#### 字面量

限定值就是该字面量的值，不常用

```ts
let a: 10;
a = 10;
a = 'hello'; // 报错

let b: 'hello';
b = 'hello'; 
b = 10; // 报错
b = '10'; // 报错
```

比如，可用于**指定内容**，性别限定

```ts
let gender: 'male'|'female';

gender = 'male';
gender = 'female';
gender = 'hello'; // 报错
```

比如，可用于**限定对象包含的属性**

```ts
let obj:{name:string, age:number};

obj = {}; // 报错
obj = {name:'andy'}; // 报错
obj = {name:'andy', age:28};
```

比如，可用于**限定函数结构**

```ts
let fn:(a:number, b:number)=>number;

fn = function(a:number, b:number):number{
  return a + b
}
```

比如，可用于限定**元组的元素类型**

```ts
let a:[string, number];

a = ['1', 2];
a = ['1', '2']; // 报错
a = ['1', '2', '3']; // 报错
a = ['1']; // 报错
```







#### any

任何值，相当于TS不在判断该变量/参数/返回值的类型

在TS中不建议使用any类型，尤其不能直接赋值给其他变量

- **显式声明any**

```ts
let a:any;
```

- **隐式any**

声明变量不指定类型时，TS自动设置为any类型

```ts
let a;
```



#### unknown

设定unknown和any相同，但是是个类型安全的any

体现在 **将一个任意类型的变量赋值给一个指定类型的变量**

- any类型变量可以直接赋值给其他变量，不报错

  因为不会报错，容易产生意外问题

- unknown在被赋值给其他变量时

  若类型不一致会报错，比起any更安全

---

- any：

```ts
let a;

let b:string;

a = 100;
b = a; // 不报错

a = 'hello';
b = a; // 不报错

a = true;
b = a; // 不报错
```

- unknown：

```ts
let a:unknown;

let b:string;

a = 'hello';
b = a; // 类型相同，不报错

a = 100;
b = a; // 报错

a = true;
b = a; // 报错
```

**综上，遇到类型不确定的变量时，使用unknown类型**

---

将unknown类型的变量赋值给一个指定类型的变量

是通过先判断类型，然后再赋值，但是写起来麻烦

```ts
let a:unknown;

let b:string;

a = ???;

if(typeof a === 'string'){
  b = a;
}
```



#### void

表示空（undefined）

比如，设定一些没有返回值的函数

```ts
function fn():void{ }
```



#### never

没有返回值，

void的undefined也算是一种返回值

而never是永远不会返回任何结果

比如，设定一些什么都不返回的函数，如报错函数

报错函数一报错程序直接结束，没有任何返回值

```ts
function fn():never{
  throw new Error('报错了')
}
```



#### Object 和 { }

因为JavaScript中万物皆对象，直接设定Object类型没有意义

设定对象类型主要是为了设定对象中的属性，

所以应该**用字面量的形式，限定对象包含的属性**

```ts
变量:{属性名:类型}
```

```ts
let obj:{name:string, age:number，status: 1 | 0};

obj = {}; // 报错
obj = {name:'andy'}; // 报错
obj = {name:'andy', age:28, status:0};
```

---

对于对象中的指定的**可选属性**

在属性后加上 **？**

```ts
变量:{属性名:类型, 属性名?:类型}
```

```ts
let obj:{name:string, age?:number};

obj = {}; // 报错
obj = {name:'andy'};
obj = {name:'andy', age:28};
```

---

对于**多个任意属性**

如下：任意字符串类型属性名，任意类型的属性值

```ts
变量:{[自定义名:属性名类型]:属性值类型};
```

```ts
let a:{name:string, [propName:string]:any}

a = {name:'andy'}
a = {name:'andy',age:28}
```



#### 函数 和 { }

直接设定一个function没有意义

需要的是设定函数的结构，

所以可通过字面量实现，以一个箭头函数的形似设定函数结构

```ts
变量:(参数:参数类型, 参数:参数类型)=>函数返回值类型;
```

```ts
let fn:(a:number, b:number)=>number;

fn = function(a:number, b:number):number{
  return a + b
}
```



#### array 和 [ ]

JS 数组中可以存入任何类型，直接设定一个array没有意义

需要的是设定数组的元素的类型

```ts
变量:数组元素类型[];

//或

变量:Array<数组元素类型>;
```

```ts
let a:string[];

a = ['1','2'];
a = [1, 2]; // 报错


let a:number[];
a = ['1','2']; // 报错
a = [1, 2]; 


let a:Array<string>;

a = ['1','2'];
a = [1, 2]; // 报错
```



#### tuple

元组，TS新增的类型，固定长度的数组

也是可通过字面量的形式控制元组的元素类型

```ts
变量:[类型, 类型]
```

```ts
let a:[string, number];

a = ['1', 2];
a = ['1', '2', '3']; // 报错
a = ['1']; // 报错
```



#### enum

枚举，TS新增的类型，

比如，在多个值直接进行选择的场合

```ts
enum Gender{
  Male = 1,
  Female = 2
}

let a:{name:string, gender:0 | 1}

a = {
  name: 'andy',
  gender: Gender.Male
}

// console.log(a.gender === Gender.Male) true
```





### 3. 联合类型

通过  **和 &** 与 **或|** ，联合设定多个类型

```ts
// 或
变量: 类型 | 类型 | 类型;
```

```ts
let a:number | string | array;

a = 10;
a = 'hello';
a = [1, 2]
a = true; // 报错
```

**&** 可用于连接两个对象

```ts
let obj:{name:string} & {age:number};

obj = {name:'andy'}; // 报错
obj = {name:'andy',age:28};
```

 

### 4. 类型断言

```ts
变量 as 类型

<类型>变量
```

unknown类型在被赋值给其他变量时，若类型不一致会报错

可通过类型断言，强制断定变量的类型

如下，强制断定 变量a为string

```ts
let a:unknown;

let b:string;

b = a as string;
// 或
b = <string>a;
```



### 5. 类型别名

设定的类型如果在多个地方使用，可通过类型别名

```ts
type 自定义类型别名 = 类型声明
```

```ts
let a: 1|2|3|4|5;
let b: 1|2|3|4|5;
let c: 1|2|3|4|5;

type myType = 1|2|3|4|5;
let a:myType;
let b:myType;
let c:myType;
```









## TS编译

TS不能被JS解析器直接执行

即，.ts文件无法直接被浏览器执行，需要先编译为.js

### ts自动监视编译

#### 一个.ts文件

通过npm下载的typescript（TS编译器）编译.ts文件

```bash
tsc xxx.ts -w
```

---

#### 多个.ts文件

`tsc xxx.ts -w`一次只能监视一个文件，效率低

若有多个.ts文件需要编译，要通过配置tsc编译选项

1. 新建 **tsconfig.json** 文件

2. 通过`tsc -w` 一次性监视编译目录下所有.ts文件

```bash
tsc -w
```



### 配置 tsconfig.json

```bash
tsc --init
```

用于配置tsc编译器的编译选项

一般JSON文件不能些注释，但是这个文件可以写注释

```JSON
{
    "compilerOptions": {
        "module": "commonjs",
        "target": "es6",
        "sourceMap": false,
    },
    "exclude": [
        "node_modules"
    ]
}
```

如下：常见的子选项

#### include

设置被编译的.ts文件所在目录

默认值是 ["\*\*/\*"]，编译所有目录下所有.ts文件

如下设置为src和tests目录下的所有目录下的所有.ts文件

```JSON
"include":["./scr/**/*","./tests/**/*"]
```

#### exclude

定义编译排除外的目录

可选，一般不需要设置

默认值是 ["node_modules", “bower_components”, "jspm_packages"]

#### extends

定义继承的配置文件

如下，继承项目目录下configs目录下common文件的配置

```JSON
"extends":"./configs/common"
```

#### files

定义需要被编辑的.ts文件列表

可选，一般不需要，只有被编辑的很少时才会用到

```json
"files":[
  "01.ts",
  "02.ts"
]
```

#### compilerOptions (重要)

最重要的编译器选项，包含众多子选项

- **target**

  用了指定.ts文件被编译成的JS版本，默认被编译为ES3

  如下，设置编译为ES6

  ```json
  "compilerOptions": {
     "target": "ES6",
  },
  // Argument for '--target' option must be: 'es3', 'es5', 'es6', 'es2015', 'es2016', 'es2017', 'es2018', 'es2019', 'es2020', 'es2021', 'esnext'.
  ```

- **module**

  设定模块化规则

  因为ES6之前JS没有模块化概念，ES6新增模块后导致JS存在各种模块化解决方案

  ```json
  "compilerOptions": {
     "module": "ES6",
  },
  // Argument for '--module' option must be: 'none', 'commonjs', 'amd', 'system', 'umd', 'es6', 'es2015', 'es2020', 'esnext'.
  ```

- **outDir**

  设定编译后的.js文件的所在目录

  默认是和.ts文件同一目录

  如下，设定将编译后的.js文件存放入项目目录下的dist目录

  ```json
  "compilerOptions": {
     "outDir": "./dist",
  },
  ```

- **outFile**

  可用于设定将编译后的所有.js文件合并为一个文件

  该子选项不常用，因为多用webpack打包工具合并文件

  且outFile仅支持amd或system模块化规则

  ```json
  "compilerOptions": {
    "module": 'sysytem',
    "outFile": "./dist",
  },
  // Only 'amd' and 'system' modules are supported alongside --outFile.
  ```

- **allowJS**

  设置是否对.js文件进行编译

  默认tsc编译器不编译.js文件

  一般不变，除非编译时其中导入的一些模块是用 JS写的才开启该子选项

  ```json
  "compilerOptions": {
    "allowJS": false,
  },
  ```

- **check**

  检查JS代码是否符合TS语法规范

  默认不检查

  比如变量类型的设定，默认编译后即使不符合TS语法还是可以编译为JS

  如下，设定为开启检查

  ```json
  "compilerOptions": {
    "check": true,
  },
  ```

- **removeComments**

  设置是否移除注释

  默认是不移除注释，带着注释一起编译为.js文件

  如下，设置为编译为.js文件并移除.ts文件中的注释

  ```json
  "compilerOptions": {
     "removeComments":true
  },
  ```

- **noEmit**

  不生成编译后的.js文件

  默认是false，生成编译后的.js文件

  基本用不到，顶多用于只是检查语法，但基本用不到

  ```json
  "compilerOptions": {
     "noEmit":false
  },
  ```

- **noEmitOnError**

  编译出现错误时不生成编译后的.js文件

  默认是false，即使TS语法报错还是会生成编译后的.js文件

  如下，设置TS语法出现错误时不编译生成.js文件

  ```json
  "compilerOptions": {
     "noEmitOnError":true
  },
  ```

- **lib**

  设定项目中的库

  一般情况不设置，采用其默认值

  ```json
  "compilerOptions": {
     "lib": ["dom","es6"......],
  },
  // Argument for '--lib' option must be: 'es5', 'es6', 'es2015', 'es7', 'es2016', 'es2017', 'es2018', 'es2019', 'es2020', 'es2021', 'esnext', 'dom', 'dom.iterable', 'webworker', 'webworker.importscripts', 'webworker.iterable', 'scripthost', 'es2015.core', 'es2015.collection', 'es2015.generator', 'es2015.iterable', 'es2015.promise', 'es2015.proxy', 'es2015.reflect', 'es2015.symbol', 'es2015.symbol.wellknown', 'es2016.array.include', 'es2017.object', 'es2017.sharedmemory', 'es2017.string', 'es2017.intl', 'es2017.typedarrays', 'es2018.asyncgenerator', 'es2018.asynciterable', 'es2018.intl', 'es2018.promise', 'es2018.regexp', 'es2019.array', 'es2019.object', 'es2019.string', 'es2019.symbol', 'es2020.bigint', 'es2020.promise', 'es2020.sharedmemory', 'es2020.string', 'es2020.symbol.wellknown', 'es2020.intl', 'es2021.promise', 'es2021.string', 'es2021.weakref', 'esnext.array', 'esnext.symbol', 'esnext.asynciterable', 'esnext.intl', 'esnext.bigint', 'esnext.string', 'esnext.promise', 'esnext.weakref'.
  ```

- **strict**

  严格检查的总开关

  统一控制 **alwaysStrict**，**noImplicitAny**，**noImplicitThis**，**strictNullChecks **

  默认是false，建议开发时设为true，即打开所有的严格检查子选项

  ```json
  "compilerOptions": {
     "strict":true,
     // "alwaysStrict":true,
     // "noImplicitAny":true,
     // "noImplicitThis":true,
     // "strictNullChecks":true
  },

- **alwaysStrict**

  严格检查，设置将编译后的.js文件中使用严格模式

  默认是false，不使用严格模式

  如下，设置编译后的.js文件中开启严格模式

  ```json
  "compilerOptions": {
     "alwaysStrict":true
  },
  ```

  设置了"module"子选项后会默认开启严格模式，就不用设置了

- **noImplicitAny**

  严格检查，设置TS中的变量若不指定类型则默认设为any类型（隐式any）

  默认false

  如下，将TS中变量类型都设置为隐式any

  ```json
  "compilerOptions": {
     "noImplicitAny":true
  },
  ```

- **noImplicitThis**

  严格检查，不允许未指定类型的this

  默认false

  如下，禁止TS中出现隐式any类型的this

  ```json
  "compilerOptions": {
     "noImplicitThis":true
  },
  ```

- **strictNullChecks**

  严格检查空值Null

  默认false，不检查Null，

  即Null会被带入代码中执行会产生错误，比如

  ```js
  let el = document.getElementById('.box')
  el.addEventListener('click',()=>{ alert('hello') })
  // 若页面中的不存在 .box 元素，则el为null, 无法绑定点击事件
  // 但tsc默认不严格检查Null，会导致Null绑定事件也不提醒，容易出错
  ```

  如下，开启严格检查空值Null

  ```json
  "compilerOptions": {
     "strictNullChecks":true
  },
  ```

  ```js
  // 开启严格检查空值Null后，若变量可能为Null时，会报错
  // 需要进行操作前先判断是否为空值Null
  let el = document.getElementById('.box')
  el?.addEventListener('click',()=>{ alert('hello') })
  ```

  



### webpack打包编译

实际开发中都会用到打包工具Webpack

一般是在打包工具中进行TypeScript编译配置

#### 1.  npm初始化项目

生成package.json

```bash
npm init -y
```

#### 2.  安装Webpack

- webpack
- webpack-cli （命令行工具）
- typescript （TS编译器）
- ts-loader (TS加载器)

```bash
npm i -D webpack webpack-cli typescript ts-loader
```

#### 3.  编写webpack配置文件

在项目目录下创建**webpack.config.js**

```json
const path = require('path');

module.exports = {
    optimization: {
        // 关闭代码压缩，可选
        minimize:false
    },

    // 入口文件
    entry: "./src/index.ts",

    // 出口文件
    output: {
        // 打包文件所在目录
        path: path.join(__dirname, 'dist'),
        // 打包文件名
        filename: "bundle.js",
        environment:{
            // 关闭webpack的箭头函数，可选
            arrowFunction: false
        }
    },

    // webpack打包时用到的模块
    module: {
        // 指定加载规则
        rules: [
            {
                // 指定规则生效文件,所有.ts结尾的文件
                test: /\.ts$/,
                // 用什么处理生效的文件
                use: 'ts-loader',
                // 处理时排除的文件
                exclude: /node-modules/
            }
        ]
    },
  
  // 设置引用模块
  // webpack默认不知道那些文件可以作为模块被引用
  resolve:{
    // 设定.ts和.js结尾的文件可以作为模块被引用
    extensions: ['.ts','.js']   
  }
  
}
```

#### 4. 设置webpack打包命令

在package.json中的script脚本中设置build打包命令

```json
{
  "name": "ts",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "ts-loader": "^9.2.3",
    "typescript": "^4.3.5",
    "webpack": "^5.44.0",
    "webpack-cli": "^4.7.2"
  }
}
```

#### 5.  编写ts配置文件

在项目目录下创建**tsconfig.json**

```json
{
    "compilerOptioins": {
        "module": "commonjs",
        "target":"es6",
        "strict":true
    }
}
```

#### 6. 执行打包命令

```bash
npm run build
```

---

## webpack补充

### html-webpack-plugin插件

通过webpack的插件**html-webpack-plugin**，

- 自动生成html文件
- 可导入模版，将webpack打包生成的js文件自动添加到模版

- 最终HTML文件放入出口文件的目录

```bash
npm i -D html-webpack-plugin
```

自动生成html文件，并导入webpack的出口文件

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Webpack App</title>
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <script defer="defer" src="bundle.js"></script>
  </head>
  <body></body>
</html>
```

配置

```json
const path = require('path');

// html-webpack-plugin
const htmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {

    // 入口文件
    entry: "./src/index.ts",

    // 出口文件
    output: {
        // 打包文件所在目录
        path: path.join(__dirname, 'dist'),
        // 打包文件名
        filename: "bundle.js",
    },

    // 配置webpack打包时用到的模块
    module: {
        // 指定加载规则
        rules: [
            {
                // 指定规则生效文件,所有.ts结尾的文件
                test: /\.ts$/,
                // 用什么处理生效的文件
                use: 'ts-loader',
                // 处理时排除的文件
                exclude: /node-modules/
            }
        ]
    },

    // 配置webpack插件
    plugins:[
        new htmlWebpackPlugin({
          // 自定义HTML文件的title名
          title:'自定义title名',
          // 导入模版, 将webpack打包生成的js文件自动添加到模版
          template:"./src/index.html"
        })
    ]
}
```



### webpack-dev-server 插件

webpack开发服务器，通过该插件

可以将项目放入一个内置服务器，使项目在该服务器中运行

- **安装该插件**

```bash
npm i -D webpack-dev-server 
```

- package.json中**添加启动服务器命令**

如下，scripts脚本中设定start命令，开启服务器并自动打开默认浏览器

```json
{
  "name": "ts",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack",
    "start": "webpack serve --open"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "html-webpack-plugin": "^5.3.2",
    "ts-loader": "^9.2.3",
    "typescript": "^4.3.5",
    "webpack": "^5.44.0",
    "webpack-cli": "^4.7.2",
    "webpack-dev-server": "^3.11.2"
  }
}
```

- **运行webpack开发服务器**

开发服务器会自动监视项目，项目文件改变后会自动刷新

```bash
npm run statr
```





### clean-webpack-plugin插件

webpack清除插件，

每次webpack编译打包构建前先清理目录，清除旧的文件

- 安装

```bash
npm i -D clean-webpack-plugin
```

- **webpack.config.js**文件中配置插件

```js
const path = require('path');

// html-webpack-plugin
const htmlWebpackPlugin = require('html-webpack-plugin')
// clean-webpack-plugin
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {

    // 入口文件
    entry: "./src/index.ts",

    // 出口文件
    output: {
        // 打包文件所在目录
        path: path.join(__dirname, 'dist'),
        // 打包文件名
        filename: "bundle.js",
    },

    // 配置webpack打包时用到的模块
    module: {
        // 指定加载规则
        rules: [
            {
                // 指定规则生效文件,所有.ts结尾的文件
                test: /\.ts$/,
                // 用什么处理生效的文件
                use: 'ts-loader',
                // 处理时排除的文件
                exclude: /node-modules/
            }
        ]
    },

    // 配置webpack插件
    plugins:[
      	// clean-webpack-plugin
				new CleanWebpackPlugin(),
      
      	//html-webpack-plugin
        new htmlWebpackPlugin({
          // 自定义HTML文件的title名
          title:'自定义title名',
          // 导入模版, 将webpack打包生成的js文件自动添加到模版
          template:"./src/index.html"
        })
    ]
}
```



### babel

解决兼容性

- 安装
  - @babel/core 
  - @balel/preset-env
  - babel-loader
  - core-js

```bash
npm i -D @babel/core @babel/preset-env babel-loader core-js
```

- 配置

```js
const path = require('path');

// html-webpack-plugin
const htmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    // 入口文件
    entry: "./src/index.ts",

    // 出口文件
    output: {
        // 打包文件所在目录
        path: path.join(__dirname, 'dist'),
        // 打包文件名
        filename: "bundle.js",
    },

    // 配置webpack打包时用到的模块
    module: {
        // 指定加载规则
        rules: [
            {
                // 指定规则生效文件,所有.ts结尾的文件
                test: /\.ts$/,
                // 用什么处理生效的文件
                use: [
                    {
                        // 设置加载器
                        loader: 'babel-loader',
                        // 设置babel
                        options: {
                            // 设置预定义环境
                            preset: [
                                // 环境插件
                                "@babel/preset-env",
                                // 配置信息
                                {
                                    // 兼容的浏览器
                                    targets: {
                                        "chrome": "88"
                                    },
                                    // 指定corejs的版本
                                    "corejs": "3",
                                    // 使用corejs的方式,按需加载
                                    "useBulitIns": "usage",

                                }
                            ]
                        }
                    }
                    // ts加载器
                    , 'ts-loader'
                ],
                // 处理时排除的文件
                exclude: /node-modules/
            }
        ]
    },

    // 配置webpack插件
    plugins: [
        new htmlWebpackPlugin({
            // 自定义HTML文件的title名
            // title:'自定义title名',
            // 导入模版
            template: "./src/index.html"
        })
    ]
}
```







## 类

类对象中主要包含属性和方法

- 属性：
  - 静态属性（类属性）
  - 实例属性
- 方法：
  - 静态方法（类方法）
  - 实例方法
  - 构造函数（构造器）



### 静态属性（类属性）

直接定义在类上的属性，通过 **`类名.属性名`** 获取或修改

可读写

```ts
class Person {
    static username: string = 'Andy';
    static userage: number = 20;
}

console.log(Person.rname); // Person
console.log(Person.username); // Andy

Person.username = 'James';
console.log(Person.username); // James
```

---

#### readonly只读属性

在属性前加上**readonly** ，该属性只能被读取不能在外被修改

不常用

```ts
class Person {
   static readonly username: string = 'Andy';
   static readonly userage:number = 28;
}

console.log(Person.username); // Andy
Person.username = 'Jamae'; // 报错
```



### 实例属性

创建在类的实例对对象上，要创建实例对象后通过 **`实例名.属性名`** 获取使用

可读写

```ts
class Person {
    username: string = "Andy";
    userage: number = 28;
}

const andy = new Person();
console.log(andy); // Person {username: "Andy", userage: 28}
console.log(andy.username); // Andy
console.log(andy.userage); // 28

andy.username = "James";
console.log(andy.username); // James
```

---

#### readonly只读属性

在属性前加上**readonly** ，该属性只能被读取不能在外被修改

不常用

```ts
class Person {
    readonly username: string = "Andy";
    readonly userage: number = 28;
}

const andy = new Person();
console.log(andy.username); // Andy
andy.username = "James"; // 报错
```



### 静态方法（类方法）

直接定义在类上的方法

直接通过 **`类名.方法名`** 获取使用

```ts
class Person {
   static say(){
       console.log('hello');     
   }
}

Person.say()
```



### 实例方法

创建在类的实例对对象上，

要创建实例对象后通过 **`实例名.方法名`** 获取使用

```ts
class Person {
   say(){
       console.log('hello');     
   }
}

const andy = new Person()
andy.say()
```



### 构造函数

若直接给类定义固定值的实例属性，会导致所有的实例对象的该属性都一致

这样定义类就没有意义了，如下：

```ts
class Person {
    username: string = "Andy";
    userage: number = 28;
}

const andy = new Person()
const tom = new Person()
console.log(andy.username); // Andy
console.log(tom.username); // Andy
```

通过类创建的实例对象的该属性应该是不同的，

所以，类的实例属性，应该是在创建实例对象时分别指定不同值

即，通过构造函数。构造函数在实例对象被创建时自动调用

**创建实例对象时调用构造函数，传入各自的属性值，并赋值给类的实例属性**



### this

类和构造函数中的this，指向类当前创建的这个实例对象

可通过this给当前实例对象添加实例属性，如下：

```ts
class Person {
    username: string;
    userage: number;

    constructor(username:string, userage:number){
        this.username = username;
        this.userage = userage;
        console.log(1,this); //     
    }
  
  	say(){
      	console.log(2,this); // 
      	console.log(`Hello,i'm ${this.username}`);
    }
}

const p1 = new Person("andy", 28);
// 1, Person {username: "andy", userage: 28}
// 2, Person {username: "andy", userage: 28}
// Hello, i'm andy

const p2 = new Person("tom", 15);
// 1, Person {username: "tom", userage: 15}
// 2, Person {username: "tom", userage: 15}
// Hello, i'm tom
```



### 类的继承

子类继承父类的所有内容

```ts
class A {}
class B extends B {}
```

#### 继承共同部分

如下，除了方法不同，其余相同

```ts
class Dog {
    name: string;
    constructor(name:string){
        this.name = name;
    }
    sayDog(){
        console.log('汪汪汪');
    }
}
class Cat {
    name: string;
    constructor(name:string){
        this.name = name;
    }
    sayCat(){
        console.log('喵喵喵');
    }
}
```

为了减少代码，可以将相同部分写入一个通用的类

```ts
class Common {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
}

class Dog extends Common{
    sayDog() {
        console.log('汪汪汪');
    }
}

class Cat extends Common{
    sayCat() {
        console.log('喵喵喵');
    }
}

const dog = new Dog("小狗");
const cat = new Dog("小猫");
console.log(dog); // Dog{name:"小狗"}
console.log(cat); // Dog{name:"小猫"}
```



#### 方法重写

继承了父类的子类中，若有和父类同名的方法，优先子类

不是替换父类的方法，而是覆盖

```ts
class Common {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
    say() {
        console.log('hello');
    }
}

class Dog extends Common{
    say() {
        console.log('汪汪汪');
    }
}

class Cat extends Common{
    say() {
        console.log('喵喵喵');
    }
}

const dog = new Dog("小狗");
const cat = new Dog("小猫");
dog.say();  // 汪汪汪
cat.say();  // 喵喵喵
```



#### super

在子类中用super关键字代指父类的实例。

继承了父类的子类，**若在子类中需要用到构造器函数时**，

比如，想在创建实例对象时传入独自的新的实例属性时

不能直接在子类中写构造函数，会因为构造器同名导致方法重写覆盖了父类的构造器，应该在子类的构造器中先调用父类的构造器后，再执行自己的

即，**子类若有构造器要先通过super() 调用父类的构造函数**

在super() 调用父类构造函数时，若父类构造器有参数，也要传参数进去

如下：

```ts
class A {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
    say() {
        console.log('AAAA');
    }
}

class B extends Common {
    age: number;
    constructor(name: string, age: number) {
       	// 先调用父类
        super(name);
      	// 再做自己的
        this.age = age;
    }
    say() {
      	// 覆盖了父类同名方法
        console.log('BBBB');
    }
    sayAAAA() {
        //在子类的方法中调用父类的方法
        super.say()
    }

}

const b = new B('andy',28)
console.log(b); // B {name:'andy', age:28}
b.say(); // BBBB
b.sayAAAA(); //AAAA
```





#### 抽象类

父类作为一个超类，不好掌控，是不被希望直接用了创建实例对象的，

所以需要通过 **abstract **来禁止类能创建实例对象，

**将其作为一个抽象类，仅仅用来被其他类继承**

```ts
abstract class 类 {
  
}
```

```ts
abstract class A {}

class B extends A {}

const a = new A(); // 报错
// Cannot create an instance of an abstract class.
```



#### 抽象方法

抽象方法定义在抽象类中。

继承抽象类的子类中必须使用到抽象方法，不然会报错。

只定义方法，方法的具体结构有各个子类决定，

告诉子类有这个方法的存在

```ts
abstract class 类 {
  abstract 方法():void;
}
```





### 接口

和给变量定义对象类型类似

接口用了**定义一个类的结构**，限制一个类中应该包含哪些属性和方法

```ts
interface myClass {
  name: string;
  age: number;
  sayName():void;
  sayAge():void;
}
```

重复定义接口时，不会替换，而是合并

```ts
interface myClass {
  name: string;
  age: number;
}
interface myClass {
  gender: number;
}
```

---

```js
interface myClass {
    name: string;
    age: number;
    sayName(): void;
    sayAge(): void;
}
class A implements myClass {
    name: string;
    age: number;

    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    sayName() {
        console.log(this.name);

    };
    sayAge() {
        console.log(this.age);
    };
}

const a = new A('andy', 28);
a.sayName();
a.sayAge();
```



### 属性封装

上述的类的实例属性可以再外被任意修改，导致数据不安全

```ts
class Person {
    name: string;
    age: number;

    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
}

const p = new Person('andy', 28)

p.name = 'tom';
p.age = 15;
console.log(p);
```

解决方法：

1. 实例属性前添加**修饰符**限定属性暴露范围
2. 并通过**属性存取器getter和sette**r获取货修改属性



#### 属性修饰符

用于限定属性的暴露范围（在哪些地方可被访问）

- **pubilc**：

  公共属性，默认，可在任意地方被访问，

  包括类外部和继承子类

- **private**：

  私有属性，无法被外部访问，

  只能在类内部被访问，

- **protected**：

  受保护属性，只能在当前类和继承的子类中访问

```ts
class Person {
    private name: string;
    private age: number;

    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
}

const p = new Person('andy', 28)

console.log(p.name);  // 报错
p.name = 'tom';  // 报错
// Property 'name' is private and only accessible within class 'Person'.
console.log(p.age);  // 报错
p.age = 15;  // 报错
// Property 'age' is private and only accessible within class 'Person'.
```



#### 外部获得私有属性

类中属性添加类**private**修饰符后变为私有属性，**无法被外部访问**

若想在类外部获取私有属性的值，可在类中定义方法用return返回私有属性

```ts
class Person {
    private name: string;
    private age: number;

    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    getName(){
        return this.name
    }
}

const p = new Person('andy', 28)
console.log(p.name);  // 报错

console.log(p.getName()); // andy
```

---

#### getter

通过存取器 getter的格式，不用再设置函数和调用函数了

```ts
// 类内部设置getter暴露属性
get 属性名(){
  return this.属性名
}

// 类外部获取属性
实例对象.属性名
```

```ts
class Person {
    private name: string;
    private age: number;

    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    get name(){
        return this.name
    }
}

const p = new Person('andy', 28)
console.log(p.name); // andy
```



#### 外部修改私有属性

类中属性添加类**private**修饰符后变为私有属性，**无法被外部访问**

若想在类外部修改私有属性的值，可在类中定义方法将参数赋值私有属性

```ts
class Person {
    private name: string;
    private age: number;

    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    changeName(value:string){
        this.name = value;
    }
    getvalue(){
        return this.name;
    }
}

const p = new Person('andy', 28)

p.changeName('tom')
console.log(p.getvalue());  // tom
```

通过该方法设置参数的类型，可以控制属性的修改

比起直接修改类中属性，增加类可控性和安全性

如下，限制age属性的范围

```ts
class Person {
    private name: string;
    private age: number;

    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    changeAge(value:number){
      if(value>=0){
        this.name = value;
      } 
    }
    getAge(){
        return this.age;
    }
}

const p = new Person('andy', 28)

p.changeAge(99);
console.log(p.getAge());  // 99
p.changeAge(-1);
console.log(p.getAge());  // 报错
```

---

#### setter

通过存取器 setter的格式，不用再设置函数和调用函数了

```ts
// 类内部设置setter暴露属性
set 属性名(value:类型){
  return this.属性名 = value
}

// 类外部获取属性
实例对象.属性名 = value;
```

```ts
class Person {
    private name: string;
    private age: number;

    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    set age(value:number){
       if(value>=0){
         this.age = value;
       }
    }
  	get age(){
      	return this.age
    }
}

const p = new Person('andy', 28)
p.age = 10;
console.log(p.age); // 10

p.age = -10;
console.log(p.age); // 报错
```









## 泛型

在定义函数、类的时候，若类型不明确，也不要定义为any

不然会关闭TS的类型判断，也就失去了TS的意义

此时可使用泛型

```ts
function fn<T>(a: T):T{
  return a;
}

fn<string>(a:'hello')
```

