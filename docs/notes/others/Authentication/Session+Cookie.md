# Sessoin + Cookie 身份验证

![](https://coders-shelf.com/wp-content/uploads/2020/01/session-cookie.png)

[[toc]]

## 简介

`session`和`cookie`都是用于存储数据

> `cookie`存储在客户端浏览器
>
> `session`存储在服务器端

## 验证原理

::: tip Session + Cookie 验证步骤：

1. 客户端登录，给服务器发送用户名+密码
2. 服务器验证登陆
3. 将用户信息存储到当前请求的`session`对象，并生成唯一`sessin id`
4. 服务器将`sessin id`存入 `cookie`
5. 此后每次用户登陆都将 `cookie`发送给服务器验证
6. 服务器接收 `cookie`解析`session id`，匹配之前存储到`session`的数据，验证用户身份

:::

<img src="https://pbs.twimg.com/media/E3v8t-CVIAAxXWJ?format=jpg&name=medium" style="zoom:50%;" />

## 缺点

适用于**服务器端渲染**的开发模式

扩展性不好，跨域时麻烦

`Session`认证机制需要配合 Cookie 才能实现，由于`Cookie`默认不支持跨域，若是多个服务器之间的跨域服务（一个账号登陆后可使用同一公司两个不同业务服务），就需要实现服务器之间`session数据`共享问题

## 跨域身份验证

1. 将`session`数据写入数据库服务器每次收到请求都去数据库获取`session`数据。

   但该方法结构清晰但缺点是工程量大，且万一数据库被黑了就完了。

2. 服务器不再保存`session`数据，将数据保存在客户端，每次用户请求都发送到服务器。

   比如 [JWT 身份验证](./JWT.md)

## Session

`Session` 实质是个对象，存储在服务器内存中

里面可以存储多条数据，每个数据都有一个唯一标识 **`session id`**

## Cookie

### 含义

`Cookie`是浏览器在电脑硬盘中开辟的一块空间，主要用于存储数据

`Cookie`是存储在浏览器中的，且浏览器提供读写`Cookie`的 API

- 不超过 4KB 的字符串，且以`Name`和`Value`的健值对形式存储

- `cookie`中的数据是以 **域名的形式** 进行区分，且域名独立

  不同域名下的`Cookie`各自独立不能互相访问，比如 baidu 域名下的 Cookie 不能访问 twitter 域名的 Cookie

- `cookie`中的数据**有时效性会过期**，过期的数据会被浏览器自动删除

- `cookie`中的数据会随着客户端浏览器请求**自动发送**到服务器，进行身份验证

  第一次访问服务器时，服务器响应过后才会产生`cookie`

<img src="https://pbs.twimg.com/media/E3v5JEnUcAE0Sh2?format=jpg&name=medium" style="zoom:50%;" />

### 查看

可通过 浏览器开发者工具的 application 面板中的 cookies 检查

如下，淘宝网服务器在客户端浏览器中储存的 cookie

<img src="https://pbs.twimg.com/media/E57DJPOVEAc7zaH?format=jpg&name=small"  />

### 缺点

`Cookie`不具有安全性，容易被伪造。

不建议服务器通过`Cookie`将重要的隐私内容发送给浏览器

所以需要通过`Session` + `Cookie` 的形式来提高身份认证的安全性
