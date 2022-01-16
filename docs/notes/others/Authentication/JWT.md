# JWT ( JSON Web Token)

![](https://www.freecodecamp.org/news/content/images/size/w2000/2019/11/jwt.png)

[[toc]]

## 简介

**JWT（JSON Web Token）**是主流的**跨域认证解决方案**

`JWT`的验证方式扩展性好，可支持跨域。

有效使用`JWT`可减少服务器查询数据库的次数

> - `Session`身份认证机制:<br>
>   将用户信息数据保存在服务器<br>
>   适用于客户端网络请求非跨域，比如**服务器端渲染**的开发模式
>
> - `JWT`身份认认证机制：<br>
>   将信息数据保存在客户端<br>
>   适用于客户端网络请求涉及跨域，比如**前后端分离**的开发模式

## 原理

::: tip JWT 验证步骤：

1. 客户端登陆请求，发送账号+密码
2. 服务器验证后用户信息数据
3. 服务器给用户信息数据`JSON`对象加上签名转为`token`字符串
4. 服务端将生成的`token`响应回客户端
5. 客户端将`token`保存到`localStorage`
6. 此后客户端每次向服务器发送请求时，都在请求头的`Authorization`字段携带`token`
7. 服务端将`token`字符串还原为用户信息数据`JSON`对象，进行验证，成功后返回响应数据

::: 

<img src="https://pbs.twimg.com/media/E3w6jKuVUAki6Id?format=jpg&name=medium" style="zoom:50%;" />

## 组成

`JWT`是个字符串，用点号`.`隔开分为三部分：`Header.Payload.Signature`

其中`Payload`部分是用户信息加密后形成的字符串

`Header`和`Signature`部分是安全性相关内容，防止`Payload`被破解

<img src="https://research.securitum.com/wp-content/uploads/sites/2/2019/10/jwt_ng1_en.png" style="zoom: 25%;" />

---

### 头部（Header）

`Header`是描述`JWT`的元数据

最后通过`Base64URL`算法转字符串

- alg：签名的算法，默认 HS256
- typ：该 token 的类型，JWT 的 token 统一为 JWT

---

### 负载（Playload）

`Playload`存放实际要传递的数据

最后通过`Base64URL`算法转字符串

- iss：签发人
- exp：过期时间
- sub：主题
- aud：受众
- nbf：生效时间
- iat：签发时间
- jti：编号

除了上面 6 个官方字段，还可以自定义私有字段

`JWT`默认不加密，不建议在此存放私密信息，一般仅存放用户名、用户 ID、邮箱

---

### 签名（Signature）

`Signature`是对头部和负载部分的签名，防止数据被篡改。

签名不能实现数据加密，因为`JWT`默认信息透明不保密，需要指定一个秘钥（secret），仅服务器知道不告诉客户端。然后通过`JWT`头部`Header`中的签名算法生成签名，最后将`Header`、`Playload`、`Signature`三部分合成一个点号`.`隔开的`token`字符串

## 使用

`JWT`官方推荐了对应各个环境的`JWT`库：

[suggested JWT libraries](https://jwt.io/libraries)：

> 比如：Node.js 下使用的 **jsonwebtoken**
>
> 详见 [Express.js + JWT 身份验证]()

## 缺点

`JWT`一旦签发除`token`无法废，数据被保存在客户端而不是在服务器。

为了防止泄露盗用，需要在生成`token`时设置较短的有效期

`JWT`信息透明，默认不加密，不能将私密信息写入`token`

为了减少盗用，不建议使用`HTTP`明码传输，应该用`HTTPS`协议传输
