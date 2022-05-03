(window.webpackJsonp=window.webpackJsonp||[]).push([[91],{471:function(s,v,o){"use strict";o.r(v);var _=o(28),e=Object(_.a)({},(function(){var s=this,v=s.$createElement,o=s._self._c||v;return o("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[o("h1",{attrs:{id:"sessoin-cookie-身份验证"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#sessoin-cookie-身份验证"}},[s._v("#")]),s._v(" Sessoin + Cookie 身份验证")]),s._v(" "),o("p",[o("img",{attrs:{src:"https://coders-shelf.com/wp-content/uploads/2020/01/session-cookie.png",alt:""}})]),s._v(" "),o("p"),o("div",{staticClass:"table-of-contents"},[o("ul",[o("li",[o("a",{attrs:{href:"#简介"}},[s._v("简介")])]),o("li",[o("a",{attrs:{href:"#验证原理"}},[s._v("验证原理")])]),o("li",[o("a",{attrs:{href:"#缺点"}},[s._v("缺点")])]),o("li",[o("a",{attrs:{href:"#跨域身份验证"}},[s._v("跨域身份验证")])]),o("li",[o("a",{attrs:{href:"#session"}},[s._v("Session")])]),o("li",[o("a",{attrs:{href:"#cookie"}},[s._v("Cookie")]),o("ul",[o("li",[o("a",{attrs:{href:"#含义"}},[s._v("含义")])]),o("li",[o("a",{attrs:{href:"#查看"}},[s._v("查看")])]),o("li",[o("a",{attrs:{href:"#缺点"}},[s._v("缺点")])])])])])]),o("p"),s._v(" "),o("h2",{attrs:{id:"简介"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#简介"}},[s._v("#")]),s._v(" 简介")]),s._v(" "),o("p",[o("code",[s._v("session")]),s._v("和"),o("code",[s._v("cookie")]),s._v("都是用于存储数据")]),s._v(" "),o("blockquote",[o("p",[o("code",[s._v("cookie")]),s._v("存储在客户端浏览器")]),s._v(" "),o("p",[o("code",[s._v("session")]),s._v("存储在服务器端")])]),s._v(" "),o("h2",{attrs:{id:"验证原理"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#验证原理"}},[s._v("#")]),s._v(" 验证原理")]),s._v(" "),o("div",{staticClass:"custom-block tip"},[o("p",{staticClass:"custom-block-title"},[s._v("Session + Cookie 验证步骤：")]),s._v(" "),o("ol",[o("li",[s._v("客户端登录，给服务器发送用户名+密码")]),s._v(" "),o("li",[s._v("服务器验证登陆")]),s._v(" "),o("li",[s._v("将用户信息存储到当前请求的"),o("code",[s._v("session")]),s._v("对象，并生成唯一"),o("code",[s._v("sessin id")])]),s._v(" "),o("li",[s._v("服务器将"),o("code",[s._v("sessin id")]),s._v("存入 "),o("code",[s._v("cookie")])]),s._v(" "),o("li",[s._v("此后每次用户登陆都将 "),o("code",[s._v("cookie")]),s._v("发送给服务器验证")]),s._v(" "),o("li",[s._v("服务器接收 "),o("code",[s._v("cookie")]),s._v("解析"),o("code",[s._v("session id")]),s._v("，匹配之前存储到"),o("code",[s._v("session")]),s._v("的数据，验证用户身份")])])]),s._v(" "),o("img",{staticStyle:{zoom:"50%"},attrs:{src:"https://pbs.twimg.com/media/E3v8t-CVIAAxXWJ?format=jpg&name=medium"}}),s._v(" "),o("h2",{attrs:{id:"缺点"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#缺点"}},[s._v("#")]),s._v(" 缺点")]),s._v(" "),o("p",[s._v("适用于"),o("strong",[s._v("服务器端渲染")]),s._v("的开发模式")]),s._v(" "),o("p",[s._v("扩展性不好，跨域时麻烦")]),s._v(" "),o("p",[o("code",[s._v("Session")]),s._v("认证机制需要配合 Cookie 才能实现，由于"),o("code",[s._v("Cookie")]),s._v("默认不支持跨域，若是多个服务器之间的跨域服务（一个账号登陆后可使用同一公司两个不同业务服务），就需要实现服务器之间"),o("code",[s._v("session数据")]),s._v("共享问题")]),s._v(" "),o("h2",{attrs:{id:"跨域身份验证"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#跨域身份验证"}},[s._v("#")]),s._v(" 跨域身份验证")]),s._v(" "),o("ol",[o("li",[o("p",[s._v("将"),o("code",[s._v("session")]),s._v("数据写入数据库服务器每次收到请求都去数据库获取"),o("code",[s._v("session")]),s._v("数据。")]),s._v(" "),o("p",[s._v("但该方法结构清晰但缺点是工程量大，且万一数据库被黑了就完了。")])]),s._v(" "),o("li",[o("p",[s._v("服务器不再保存"),o("code",[s._v("session")]),s._v("数据，将数据保存在客户端，每次用户请求都发送到服务器。")]),s._v(" "),o("p",[s._v("比如 "),o("a",{attrs:{href:""}},[s._v("JWT 身份验证")])])])]),s._v(" "),o("h2",{attrs:{id:"session"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#session"}},[s._v("#")]),s._v(" Session")]),s._v(" "),o("p",[o("code",[s._v("Session")]),s._v(" 实质是个对象，存储在服务器内存中")]),s._v(" "),o("p",[s._v("里面可以存储多条数据，每个数据都有一个唯一标识 "),o("strong",[o("code",[s._v("session id")])])]),s._v(" "),o("h2",{attrs:{id:"cookie"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#cookie"}},[s._v("#")]),s._v(" Cookie")]),s._v(" "),o("h3",{attrs:{id:"含义"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#含义"}},[s._v("#")]),s._v(" 含义")]),s._v(" "),o("p",[o("code",[s._v("Cookie")]),s._v("是浏览器在电脑硬盘中开辟的一块空间，主要用于存储数据")]),s._v(" "),o("p",[o("code",[s._v("Cookie")]),s._v("是存储在浏览器中的，且浏览器提供读写"),o("code",[s._v("Cookie")]),s._v("的 API")]),s._v(" "),o("ul",[o("li",[o("p",[s._v("不超过 4KB 的字符串，且以"),o("code",[s._v("Name")]),s._v("和"),o("code",[s._v("Value")]),s._v("的健值对形式存储")])]),s._v(" "),o("li",[o("p",[o("code",[s._v("cookie")]),s._v("中的数据是以 "),o("strong",[s._v("域名的形式")]),s._v(" 进行区分，且域名独立")]),s._v(" "),o("p",[s._v("不同域名下的"),o("code",[s._v("Cookie")]),s._v("各自独立不能互相访问，比如 baidu 域名下的 Cookie 不能访问 twitter 域名的 Cookie")])]),s._v(" "),o("li",[o("p",[o("code",[s._v("cookie")]),s._v("中的数据"),o("strong",[s._v("有时效性会过期")]),s._v("，过期的数据会被浏览器自动删除")])]),s._v(" "),o("li",[o("p",[o("code",[s._v("cookie")]),s._v("中的数据会随着客户端浏览器请求"),o("strong",[s._v("自动发送")]),s._v("到服务器，进行身份验证")]),s._v(" "),o("p",[s._v("第一次访问服务器时，服务器响应过后才会产生"),o("code",[s._v("cookie")])])])]),s._v(" "),o("img",{staticStyle:{zoom:"50%"},attrs:{src:"https://pbs.twimg.com/media/E3v5JEnUcAE0Sh2?format=jpg&name=medium"}}),s._v(" "),o("h3",{attrs:{id:"查看"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#查看"}},[s._v("#")]),s._v(" 查看")]),s._v(" "),o("p",[s._v("可通过 浏览器开发者工具的 application 面板中的 cookies 检查")]),s._v(" "),o("p",[s._v("如下，淘宝网服务器在客户端浏览器中储存的 cookie")]),s._v(" "),o("img",{attrs:{src:"https://pbs.twimg.com/media/E57DJPOVEAc7zaH?format=jpg&name=small"}}),s._v(" "),o("h3",{attrs:{id:"缺点-2"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#缺点-2"}},[s._v("#")]),s._v(" 缺点")]),s._v(" "),o("p",[o("code",[s._v("Cookie")]),s._v("不具有安全性，容易被伪造。")]),s._v(" "),o("p",[s._v("不建议服务器通过"),o("code",[s._v("Cookie")]),s._v("将重要的隐私内容发送给浏览器")]),s._v(" "),o("p",[s._v("所以需要通过"),o("code",[s._v("Session")]),s._v(" + "),o("code",[s._v("Cookie")]),s._v(" 的形式来提高身份认证的安全性")])])}),[],!1,null,null,null);v.default=e.exports}}]);