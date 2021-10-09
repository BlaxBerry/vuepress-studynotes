# package 和 npm

<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Npm-logo.svg/1200px-Npm-logo.svg.png" style="zoom: 33%;" />



## 简介

npm（node package manager）是指，

Node中的第三方模块（包）管理工具

有两种形式：

- JS文件的形式（body-parser）

  提供具体功能的API方法函数接口

- 命令行工具的形式（nodemon）

  负责项目开发







## 安装

### 安装指定的包

```bash
npm install xxxx 
```

简写：

```bash
npm i xxxx
```

下载的包的名称和版本号会自动记录到package.json的dependencies中

---

### 安装多个包

空格隔开多个包名

```bash
npm install jquery art-template
```

简写：

```bash
npm i jquery art-template
```

---

### 安装指定版本

npm install xxxx 总是安装**最新版本**

若想安装指定版本的包，需要在包名后加 **@版本号**

```bash
npm install xxxx@x.x.x

npm i moment@2.22.2
```

---

### 初次安装包

项目初次安装包后，会在项目目录下新建

- **node_modules的目录**

  存放所有已经安装到项目中的包

  项目中导入第三方模块时，就从这个目录中查找并加载

- **package-lock.json的配置文件**

  记录每一个包的下载信息（名字、版本号、下载地址）

不要手动修改这两个，npm会自动维护

---

### 一次性安装所有包

多人协作开发时，项目成员拿到项目源代码后，

应首先下载packegr.json文件中的dependencies节点中记录的该项目所有依赖的包

```bash
npm install
```

简写：

```bash
npm i
```

---

### 安装仅开发阶段所需的包

```bash
npm install xxx --save-dev
```

简写：

```bash
npm i xxx -D
```

---

### 安装全局包

安装时带有 **-g** 参数时，会把 包安装为全局包

```bash
npm install xxx -g
```

一般是命令行工具性质的包，

比如 nodemon、i5ting_toc

```bash
npm i nodemon -g
```

Windows中全局包会被安装到

C:\User\用户目录\AppData\Roaming npm\node_modules 下











## 卸载

### 卸载指定的包

```bash
npm uninstall xxx
```

```bash
npm uninstall moment
```

卸载的包的名称和版本号会自动从package.json的dependencies中删除

---

### 卸载全局包

携带 **-g** 参数

```bash
npm uninstall xxx -g
```







## node_modules文件夹

**node_modules**目录下存放所有已经安装到项目中的包，

在通过**npm install **初次安装包后，后在项目目录下生成该目录

---

该目录体积过大，多人协作开发时，

上传时应剔除该文件，只需上传项目源代码即可

即，将该目录添加到 **.gitognore文件**中

项目成员只是下载项目源代码，

然后通过**npm install** 下载package.json文件中记录的所有依赖的包





## package.json 管理配置文件

在项目根目录中，必须提供一个**package.json** 包管理配置文件

是项目的描述文件，用于记录于项目有关的配置信息

- 项目的名称、版本、描述

- 项目中用到的包
- 分类**开发时**用到的包、**部署上线时**用到的包

---

### 项目初始化配置

创建了项目文件夹后，应当首先通过` npm init -y`

生成**package.json**包管理配置文件

```bash
npm init -y
```

创建的项目只能是英文名，不能出现中文和空格

不然初始化package.json文件是会报错

---

### 信息内容

生成的package.json文件内容如下：

```json
{
  "name": "项目名称",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

- name：项目名称

- version：项目版本号

- description：项目描述

- main：项目的主入口文件（主模块）

- scripts：命令别名

  给过长的命令起别名，命令行中可通过该别名执行该命令

- keywords：项目查找的关键字

- author：项目作者

- license：项目遵循的协议，默认开放源代码ISC

---

### dependencies节点（项目依赖）

新创建的package.json文件默认没有dependencies节点

通过npm install 下载了包后，

npm会自动将包的名称和版本号记录到dependencies节点

若下载的包在开发和项目上线后都需要用到（**项目依赖**）

则应记录到dependencies节点

其中记录**npm install**下载的包和版本号

如下：下载了jQuery、art-template、moment

```json
{
  "name": "项目名",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "art-template": "^4.13.2",
    "jquery": "^3.6.0",
    "moment": "^2.29.1"
  }
}
```

多人协作开发时，项目成员拿到项目源代码后，

应首先通过**npm install** 下载dependencies节点中记录的项目所有依赖的包

---

### devDependencies节点（开发依赖）

若下载的包仅仅只在开发阶段使用到，项目部署上线之后并不会用到

则可以记录到package.json文件的devDependencies节点中

若下载的包在开发和项目上线后都需要用到（**开发依赖**）

则应记录到dependencies节点

devDependencies节点中记录**npm install -D**下载的包和版本号

```json
{
  "name": "项目名",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "art-template": "^4.13.2",
    "jquery": "^3.6.0"
  },
  "devDependencies": {
    "webpack": "^5.38.1"
  }
}
```

---

### scripts选项

当项目中的命令特别长时，

可以给命令起一个别名，以后运行时直接通过 **run** 运行该别名即可

```bash
npm run 命令别名
```

```json
{
  "name": "项目名",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
    "open": "nodemon index.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "art-template": "^4.13.2",
    "jquery": "^3.6.0",
    "moment": "^2.29.1"
  }
}
```

```bash
npm run open
```





## pack-lock.json文件

详细记录模块与模块之间的依赖关系

- 锁定包的版本

  可以防止下载到不同版本的包

- 加快下载速度

如下：

```json
{
  "name": "node",
  "version": "1.0.0",
  "lockfileVersion": 2,
  "requires": true,
  "packages": {
    "": {
      "version": "1.0.0",
      "license": "ISC",
      "dependencies": {
        "express": "^4.17.1",
        "express-session": "^1.17.2"
      }
    },
   },
  "dependencies": {
    "accepts": {
      "version": "1.3.7",
      "resolved": "https://registry.npmjs.org/accepts/-/accepts-1.3.7.tgz",
      "integrity": "sha512-Il80Qs2WjYlJIBNzNkK6KYqlVMTbZLXgHx2oT0pU/fjRHyEp+PEfEPY0R3WCwAGVOtauxh1hOxNgIf5bv7dQpA==",
      "requires": {
        "mime-types": "~2.1.24",
        "negotiator": "0.6.2"
      }
    }
  }
```







## 包的规范

### 包的分类

npm下载的包答题分为两类：

- **项目包**

  被下载到项目的node_modules目录下

  项目包分为两大类：

  - **核心依赖包**

    开发阶段和项目上线后都依赖的包

    被记录到package.json文件的dependencies节点中

    ```bash
    npm i xxx
    ```

  - **开发依赖包**

    仅在开发阶段使用到的包

    被记录到package.json文件的devDependencies节点中

    ```bash
    npm i xxx -D
    ```

- **全局包**

  一般是命令行工具性质的包

  被下载到全局的node_modules目录下

---

### 版本号

包的版本号是以 点分十进制 形式定义，

共分三位数字：

```bash
大版本 . 功能版本 . Bug修复版本

2 . 22 . 2
```

版本号提升规则：

前面的版本号增长了，后面的版本号就归零

```bash
2.22.2
2.23.0
3.0.0
```

---

### 包结构规范

一个规范的包，结构必须有以下3点要求：

- 包是必须以单独的目录存在

- 包的顶级目录下必须有package.json文件

- package.json文件中必须有

  - name属性：包的名字

  - version属性：版本号

  - **main属性**：包的入口文件

    包被导入时被加载的是该文件

包的package.json：

```json
{
  // 包的饿名称
  "name": "package",
  // 版本
  "version": "1.0.0",
  // 描述
  "description": "",
  // 入口文件
  "main": "index.js",
  // 搜索关键字
  "keywords": ["","",""],
  // 许可协议
  "license": "ISC"
}
```

---





## 常用工具包

- **nodemon**

  原本Node.js项目在调试时若修改了代码，必须停掉手动重启，

  通过nodemon会监听项目文件变化，若修由保存操作，则会**自动重启**

  代换node命令执行JS文件

  通过 ctrl + C 停止

  需全局安装

  

- **i5ting_toc**

  可将MarkDown文档转为HTML页面

  需全局安装
  
  

- **formidable**

  需全局安装