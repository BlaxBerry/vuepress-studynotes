# yarn 基础

![](https://miro.medium.com/max/9350/1*BCPTI5sT2C9JH76__X2WUg.png)

[[toc]]

## 简介

yarn 是 facebook 开发的包的管理工具，功能与 npm 几乎一样

> yarn 最初下载速度与锁版本等功能略优于 npm，但 npm 版本提升后二者区别不明显

二者尽量别一起使用可能会出问题

<br/>

## 安装

yarn 也是一个 JavaScript 软件包，需要先使用 npm 进行安装

```bash
npm install -g yarn
```

<br/>

## 常用命令对比

|         命令         |          yarn           |         npm          |
| :------------------: | :---------------------: | :------------------: |
|        初始化        |        yarn init        |       npm init       |
|   下载生产环境依赖   |    **yarn add xxx**     |   npm install xxx    |
|   下载开发环境依赖   |   **yarn add xxx -D**   |  npm install xxx -D  |
|       全局安装       |   yarn global add xxx   |  npm install xxx -g  |
| 下载所有生产环境依赖 |        **yarn**         |     npm install      |
| 下载所有开发环境依赖 |       yarn add -D       |    npm install -D    |
|   删除生产环境依赖   |   **yarn remove xxx**   |  npm uninstall xxx   |
|   删除开发环境依赖   | **yarn remove xxx -D**  | npm uninstall xxx -D |
|     执行脚本命令     | **yarn run scriptName** |  npm run scriptName  |
