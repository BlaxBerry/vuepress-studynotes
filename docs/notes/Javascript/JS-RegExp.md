# JavaScript 的正则

## 简介

**RegExp**（**Reg**ular **Exp**ression）

用于处理字符串

是复杂数据类型

```js
console.log(typeof /abc/)
//#=> object
```

---

### 作用

- 用于验证字符串是否符合规则

- 从字符串中获取一部分符合规则的内容

使用特定的符号组合成一个表达式，来验证字符串或或取内容

---

### 构成

/正则元字符和字符/标识符

写在双斜线中的是 正则表达式，写在双斜线外的是注释





## 创建正则表达式

### /abcd/

字面量形式创建正则表达式

```js
const reg = /abc/
console.log(reg);

//#=> /abc/
```

 不能在里面直接写字符串变量

```js
let str = ‘hello’;
let reg = /str/
console.log(reg); 
//=>
/str/
```

---

### new RegExp('abc')

内置构造函数创建

```js
const reg = new RegExp('abc')
console.log(reg);
//#=> 
/abc/
```

可以在里面直接写字符串变量

```js
let str = 'hello';
let reg = new RegExp(str);
console.log(reg);   
//#->
/hello/
```

可以进行字符串拼接

```js
let str = 'hello';
let reg = new RegExp(str+' world');
console.log(reg); 
//#=>
/hello world/
```

写入**基础元字符**时，为了和转义符\区分，要写 **\\\元字符**

```js
let reg1 = /\w/
console.log(reg1);  
//
/\w/

let reg2 = new RegExp('\\w')
console.log(reg2);
//
/\w/
```



## 正则的匹配与捕获

### 匹配  test( )

验证字符串是否符合正则规则

```js
	/abc/.test('abcd')

//  正则表达式.test(要检测的字符串)
//  返回值是布尔值 true / false
```

什么位置、有几个都不重要，只要包含有就行，**只要找到了第一个**就行

```js
//检测是否包含一个abc片段

console.log(/abc/.test('abc'));   // true

console.log(/abc/.test('abcd'));  // true

console.log(/abc/.test('aabc'));  // true

console.log(/abc/.test('abcabc')); // true

console.log(/abc/.test('aabbcc')); // false

```

---

---

### 捕获  exec( )

从字符串中获取 符合正则规则的**第一个片段**

```js
	/abc/.exec('_abc_')

//  正则表达式.exec(检测的字符串)
```

#### 没有符合片段

字符串中没有符合片段时，返回值时 **null**

```js
const res = /abc/.exec('zxc')
console.log(res);

//#=> 
null
```

---

#### 基础捕获

字符串中有符合片段时，返回值是个**数组**

```js
const res = /abc/.exec('abcdddddeee')
console.log(res);

//#=>
[ 'abc', index: 0, input: 'abcdddddeee', groups: undefined ]
```

[0] 是**捕获的字符串**，

[1] 是个对象，index是指从字符串的第几个字符开始捕获的

[2] 是个对象，input是原始字符串

```js
[ 'abc', 
 index: 0, 
 input: 'abcdddddeee',
 groups: undefined 
]
```

即使字符串有多个符合的片段，**只捕获**字符串中符合的**第一个片段**

```js
const res1 = /abc/.exec('abcddddeee')
console.log(res1);

const res2 = /abc/.exec('abceeeeabc')
console.log(res2);

const res3 = /abc/.exec('eeeabceeabc')
console.log(res3);

//#=>
[ 'abc', index: 0, input: 'abcddddeee', groups: undefined ]
[ 'abc', index: 0, input: 'abceeeeabc', groups: undefined ]
[ 'abc', index: 3, input: 'eeeabceeabc', groups: undefined ]
```

---

#### 单独捕获与不捕获

详见（）和（?:）

()里的正则即作为整体，在捕获时又被单独捕获

(?:)里的正则只作为整体，不被捕获里面的内容

---

#### 有全局标识符g

详见标识符

当前捕获位置从上一次捕获位置后开始

中间可以有其他内容

直到找不到为止，返回null，然后再次开始捕获

---

#### 有粘性全局标识符y

详见标识符

必须字符串开始处就有符合的内容

当前捕获位置紧跟上一次捕获位置

中间不可以有其他内容，不然返回null然后结束捕获，然后再次开始捕获





## 正则的元字符 - 基础元字符

#### \s

表示**一个**空格

```js
	/\s/

// 字符串中需要有一个空格字符
// 只要有一个是就行
```

```js
console.log(/\s/.test('abcde'));

console.log(/\s/.test('ab cde'));

console.log(/ab\sc/.test('ab cde'));

console.log(/ab\s\s\sc/.test('ab   cde'));

//#=>
false
true
true
true
```

---

#### \S

大写S，表示一个**非空格**

```js
	/\S/

// 字符串中需要有一个非空格字符
// 只要有一个不是就行
```

```js
console.log(/\S/.test('  '));

console.log(/\S/.test('abcd'));

//#=>
false
true
```

```js
str = 'a';
if (/\S/.test(str)) {
    console.log('hello');
}
```

---

#### \t

表示一个制表符（tab）

虽然不同系统中的tab缩进的空格数会不同，

但是 \t 仅表示一个tab的缩进，不是多个空格

```js
	/\t/

// 字符串中需要有一个制表符字符
```

---

#### \d

表示一个数字

```js
	/\d/

// 字符串中需要有一个数字
// 只要有一个是就行
```

```js
console.log(/\d/.test('abcdef'));

console.log(/\d/.test('134'));

console.log(/\d/.test('ab123ve'));

//#=>
false
true
true
```

---

#### \D

表示一个**非数字**

```js
	/\D/

// 字符串中需要有一个非数字的字符
// 只要有一个不是就行
```

```js
console.log(/\D/.test('abcdef'));

console.log(/\D/.test('134'));

console.log(/\D/.test('ab123ve'));

console.log(/\D/.test(' '));

//#=>
true
false
true
true
```

---

#### \w

表示一个**数字、字母、下划线**   任选其一

```js
	/\w/

// 字符串中需要有一个数字或字母或下划线,只能是这三种
// 只要有一个是就行
```

```js
console.log(/\w/.test('_'));

console.log(/\w/.test('134'));

console.log(/\w/.test('as489_fw'));

console.log(/\w/.test('ab123ve'));

console.log(/\w/.test(' '));

console.log(/\w/.test('$!@#%^&*(+-/)'));

//#=>
true
true
true
true
false
false
```

---

#### \W

大写W，表示一个除了**数字、字母、下划线 以外**的任意字符

```js
		/\W/

// 字符串中需要一个非数字或字母或下划线的字符，
// 只要有一个不是就行
```

```js
console.log(/\W/.test('aasd'));
console.log(/\W/.test('123'));
console.log(/\W/.test('_'));

console.log(/\W/.test('/*-+'));
console.log(/\W/.test('$%^~!()=&'));
console.log(/\W/.test(' '));

//#=>
false
false
false
true
true
true
```

---

#### .

表示一个**非换行**的任意字符

```js
		/./

// 字符串中需要一个非换行内容，
// 只要有一个不是换行的就行
```

```js
console.log(/./.test('\n'));

console.log(/./.test('aasd'));
console.log(/./.test('aaa\n'));
console.log(/./.test(' \n'));

//#=>
false
true
true
true
```

---

#### \

转义符，和字符串的转义符相同用法

把没有意义的内容转为有意义的内容；

把有意义的内容转为没有意义的内容

比如：

``` js
/s/  // 一个s字符
```

```js
/\s/ //一个空格
```

```js
/./  //一个非空格字符
```

```js
/\./  // 一个点字符
```

```js
/\\/  //一个斜线文本
```



## 正则的元字符 - 边界元字符

#### 字符串开始   ^

表示对**字符串的开始**的要求

```js
		/^asd/
```

比如：

```js
		/^\d/
//要求字符串的开始是以一个数字开头

console.log(/^\d/.test('asdouin1223'));

console.log(/^\d/.test('1234asdouin1223'));

//#=>
false
true
```

```js
		/^asd/
//要求字符串的开始是以一段asd开头

console.log(/^asd/.test('123asdeee'));

console.log(/^asd/.test('asd123asd'));

//#=>
false
true
```

---

#### 字符串结束   $  

表示对**字符串的结尾**的要求

```js
			/asd$/
```

比如：

```js
		/\d$/
//要求字符串的结尾是以一个数字结束

console.log(/\d$/.test('123asdeee'));

console.log(/\d$/.test('1234asdouin1223'));

//#=>
false
true
```

```js
		/asd$/
//要求字符串的结尾是以一段asd结束

console.log(/asd$/.test('123asdeee'));

console.log(/asd$/.test('123asd'));

//#=>
false
true
```

---

#### 边界符连用 

开始符和结束符可以在一起结合使用

**限定了字符串内容为^到$之间的内容**

```js
		/^  $/
```

比如：

```js
		/^asd$/
//限定字符串内容为asd

console.log(/^asd$/.test('asd'));

console.log(/^asd$/.test('asd123asd'));

//#=>
true
false
```

```js
		/^\d\d$/
//限定字符串内容为两个数字

console.log(/^\d\d$/.test('12'));

console.log(/^\d\d$/.test('1212'));

//#=>
true
false
```





## 正则的元字符 - 限定元字符 

限定**普通字符**或**元字符**的**出现次数**

写在普通元字符或者字母符号的后面

**仅限定前面一个字符**的出现次数

比如，在指定身份证号码时，一个一个取些\d太麻烦不显示

---

### *

表示出现的次数是 **0~**

只要当前字符出现零次或零次以上就行

```js
		/\d*/
//表示字符串中没有数字或多个数字
// 数字出现次数是 0~

console.log(/\d*/.test('12'));

console.log(/\d*/.test('1221342345'));

console.log(/\d*/.test(''));

console.log(/\d*/.test('aas'));

//#=>
true
true
true
true
```

```js
 		/a*/
//表示字符串中没有a或多个a
// a 出现次数是 0~

console.log(/a*/.test('asd'));
console.log(/a*/.test('12'));
console.log(/a*/.test(' '));

//#=>
true
true
true
```

---

#### * 和边界符连用

**/^ *$/**

只能当前字符出现零次或零次以上

```js
		/^a*$/
//只能有 0~ 个数的a出现
// 不能出现其他的

console.log(/^a*$/.test('a'));
console.log(/^a*$/.test('aaaaaa'));

console.log(/^a*$/.test('asd1324'));
console.log(/^a*$/.test(' '));

//#=>
true
true
false
false
```

```js
		/^\d*$/
//表示字符串中仅能出现0~个数的数字
//不能出现数字以外的字符

console.log(/^\d*$/.test('12'));

console.log(/^\d*$/.test('1221342345'));

console.log(/^\d*$/.test(''));

console.log(/^\d*$/.test('aas'));

console.log(/^\d*$/.test('aas13'));

//#=>
true
true
true
false
false
```

---

### +

表示出现的次数是 **1~**

只要当前字符出现一次或一次以上就行

```js
		/\d+/
// 表示字符串中一个数字或多个数字
// 数字出现次数是 1~

console.log(/\d+/.test('1'));

console.log(/\d+/.test('1221342345'));

console.log(/\d+/.test(''));

console.log(/\d+/.test('1aas'));

//#=>
true
true
false
true
```

---

#### + 和边界符连用

**/^ +$/**

只能当前字符出现一次或一次以上

```js
		/^\d+$/
// 表示字符串中仅能有一个数字或多个数字

console.log(/^\d+$/.test('1'));

console.log(/^\d+$/.test('1221342345'));

console.log(/^\d+$/.test(''));

console.log(/^\d+$/.test('aas'));

//#=>
true
true
false
false
```

---

### ?

表示出现的次数是 **0~1**

只要当前字符零次或一次就行

```js
		/a?/
//只要字符串中a字符出现了零次或一次就行

console.log(/a?/.test(''));
console.log(/a?/.test('a'));
console.log(/a?/.test('133'));
console.log(/a?/.test('aaa'));

//#=>
true
true
true
true
```

---

#### ？ 和边界符连用

仅当前字符能出现零次或一次

```js
		/^a?$/
//仅a能出现0次或1次

console.log(/^a?$/.test(''));
console.log(/^a?$/.test('a'));
console.log(/^a?$/.test('133'));
console.log(/^a?$/.test('aaa'));
console.log(/^a?$/.test('aaa134'));

//#=>
true
true
false
false
false
```

---

### {n}

出现指定次数n次

只要当前字符出现连续n次就行

```js
		 /\d{3}/
//只要字符串中有连续出现3次的数字就行

console.log(/\d{3}/.test(''));
console.log(/\d{3}/.test('132'));
console.log(/\d{3}/.test('asd132asd'));
console.log(/\d{3}/.test('a1s2d3'));

//#=>
false
true
true
false
```

---

#### {n}和边界符连用

**/^ {n} $/**

只能当前字符出现n次

```js
		/^\d{3}$/
//字符串中只能有连续出现3次的数字
//不能有其他字符

console.log(/^\d{3}$/.test(''));
console.log(/^\d{3}$/.test('124'));
console.log(/^\d{3}$/.test('13415354'));
console.log(/^\d{3}$/.test('asd123'));

//#=>
false
true
false
false
```

---

### {n,}

出现指定次数**n~ 次**

只要当前字符连续出现n次或n次以上就行

```js
		/\d{2,}/

//只要字符串中有数字连续出现2次或2次以上就行

console.log(/\d{2,}/.test('12'));
console.log(/\d{2,}/.test('12156'));
console.log(/\d{2,}/.test('12asd'));
console.log(/\d{2,}/.test('1a2 a  '));

//#=>
true
true
true
false
```

---

#### {n,}和边界符连用

**/^ {n,}$/**

只能当前字符连续出现n次或以上，不能出现其他字符

```js
	/^\d{2,}$/

//字符串中只能有连续出现2次或2次以上的数字

console.log(/^\d{2,}$/.test('12'));
console.log(/^\d{2,}$/.test('12156'));
console.log(/^\d{2,}$/.test('12asd'));
console.log(/^\d{2,}$/.test('1a2 a  '));

//#=>
true
true
false
false
```

---

### {n,m}

出现指定次数**n~ m次**

只要当前字符连续出现n次到m次就行

```js
		/\d{2,4}/
//只要字符串中有连续出现2~4次的数字就行

console.log(/\d{2,4}/.test('12'));
console.log(/\d{2,4}/.test('1212'));
console.log(/\d{2,4}/.test('1215619681'));
console.log(/\d{2,4}/.test('1212asd'));
console.log(/\d{2,4}/.test('1a2a  '));

//#=>
true
true
true
true
false
```

---

#### {n,m}和边界符连用

字符串中只能有连续出现n~m次的指定字符

```js
		/^\d{2,4}$/
//字符串中只能有连续出现2~4次的数字

console.log(/^\d{2,4}$/.test('12'));
console.log(/^\d{2,4}$/.test('1212'));
console.log(/^\d{2,4}$/.test('1215619681'));
console.log(/^\d{2,4}$/.test('1212asd'));
console.log(/^\d{2,4}$/.test('1a2a  '));

//#=>
true
true
false
false
false
```





## 正则的元字符 - 特殊字符

#### ( )

##### 一个整体

```js
		/(abc){2}/
// 出现2次abc
```

```js
		/abc{2}/
// 出现abcc
```

##### 单独捕获

捕获时会单独捕获出小括号的内容，

再数组中额外显示

```js
	/\d+(\s+)\d+/
```

```js
	/\d+\s+\d+/
```

---

#### ( ?:) 

仅把括号内容作为一个整体，

捕获时**不会单独捕获出**

```js
	/\d+(\s+)\d+/
```

```js
	/\d+(?:\s+)\d+/
```

---

#### |

占位或

表示**一个整体或另一个整体**

分开的是|的左右两边整体

```js
		/^asd|zxc$/
//以asd开头，或以zxc结尾的
//满足任何一个都行
```

```js
const reg = /^asd|zxc$/
console.log(reg.test('asd'))
console.log(reg.test('zxc'))
console.log(reg.test('asdzxc'));
console.log(reg.test('asd123132zxc'));
console.log(reg.test('asd123132'));
console.log(reg.test('123123zxc'));

//#=>
true
true
true
true
true
true
```

```js
		/^(asd)|(zxc)$/
//左边的括号或右边的括号
```

```js
const reg = /(asd)|(zxc)/
console.log(reg.test('asd'))
console.log(reg.test('zxc'))

// #=>
true
true
```

```js
		/^as(d|z)xc$/
//字符串内容是asdxc 或aszxc
```

```js
const reg = /^as(d|z)xc$/
console.log(reg.test('asdxc'))
console.log(reg.test('aszxc'))

// #=>
true
true
```

---

#### []

表示【】里面任何一个字符都可以，**选一**

```js
		/[abc]/
// 只要字符串中包含a或b或c中的任何一个就行
```

```js
const reg = /[abc]/
console.log(reg.test('a123'))
console.log(reg.test('b798'))
console.log(reg.test('c13'))

// #=>
true
true
true
```

一个中括号[]是一个字符，只能从里面选一个

```js
		 /^[abc]$/
// 字符串只能有一个字符，a或b或c中的一个
```

```js
const reg = /^[abc]$/
console.log(reg.test('a123'))
console.log(reg.test('b798'))
console.log(reg.test('c13'))
console.log(reg.test('a'))
console.log(reg.test('b'))
console.log(reg.test('c'))

// #=>
false
false
false
true
true
true
```

---

#### [^ ]

表示非里面的任意一个都可以

```js
		/[^asd]/
// 只要不含有asd这三个中的任何一个就行
```

```js
const reg = /[^asd]/

console.log(reg.test('a'))
console.log(reg.test('s'))
console.log(reg.test('d'))
console.log(reg.test(' '))
console.log(reg.test('112354'))

//#-》
false
false
false
true
true
```

```js
		/^[^asd]$/
// 字符串只能由一个字符，
// 且，只要不是asd三个中的任意一个就行
```

```js
const reg = /^[^asd]$/

console.log(reg.test('a'))
console.log(reg.test('s'))
console.log(reg.test('d'))
console.log(reg.test(' '))
console.log(reg.test('1'))

//#=》
false
false
false
true
true
```

---

#### -

表示至，到

从一个字符到另一个字符，比如0-9，a-z,  A-Z

```js
		/0-255/

//0~2或5或5
```

---

#### 特殊字符和基础元字符

```js
		/[0-9]/
// 只要有0~9中的任意一个就可以
// 相当于 \d
```

```js
		/^[0-9]/
// 只要不是0~9中的任意一个就可以
// 相当于 \D
```

```js
		/^[0-9]$/
// 只能由一个字符
// 只能是0~9中的任何一个
```

```js
		/[0-9a-zA-Z_/
// 只要有0-9，a-z,  A-Z ，和下划线任意一个就行
// 相当于 \w
```

```js
		/[^0-9a-zA-Z_/
// 只要有非0-9，a-z,  A-Z ，和下划线中的任意一个就行
// 相当于 \W
```

```js
		/[ ]/
//一个空格
// 相当于\s
```

```js
		/[^ ]/
//一个非空格字符
// 相当于\S
```

- []和 [^]中的.

```js
		/[.]/
//就是一个点
```

```js
		/[^.]/
//不是一个点
```





## 贪婪捕获和非贪婪捕获

### 贪婪性捕获

**最大捕获**

正则中，给一个符号使用了限定符后，

捕获匹配的字符串内容时，正则**会仅可能的多的捕获符合内容**

(限定次数范围内符合内容的最大长度)

只要符合正则就一直捕获，直到不符合为止的该范围的字符串的内容

这就是正则的**贪婪性**

```js
//使用了限定符限定符合个数时
//再用exec()捕获符合的字符串内容时
//exec()会根据限定符的次数，尽可能多的取捕获
//即，捕获符合的最大长度
console.log(/\d+/.exec('asd13456789a'));

//#=>
[ '13456789', 
 index: 3, 
 input: 'asd13456789a', 
 groups: undefined ]
```

---

---

### 非贪婪性捕获

**最小捕获**

捕获时尽可能取捕获符合的最少内容

这就是正则的**非贪婪性**

使用方法是在限定符的**后面再写上一个？**

捕获的是限定次数范围内的最小长度

(常用于标签捕获)

---

#### * 和 *？

```js
//0~
console.log(/\d*/.exec('13456789a'));

//#=>
[ '13456789', 
 index: 0, 
 input: '13456789a', 
 groups: undefined ]
```

```js
//0
console.log(/\d*?/.exec('13456789a'));

//#=>
[ '', 
 index: 0, 
 input: '13456789a', 
 groups: undefined ]
```

---

#### + 和 +?

```js
//1~
console.log(/\d+/.exec('asd13456789a')); 

//#=>
[ '13456789', 
 index: 3, 
 input: 'asd13456789a', 
 groups: undefined ]

//把符合的全给捕获出来了
```

```js
//1
console.log(/\d+?/.exec('asd13456789a'));

//#=>
[ '1', 
 index: 3, 
 input: 'asd13456789a', 
 groups: undefined ]

//仅捕获了第一个符合的
```

---

#### ?  和 ??

```js
//0~1
console.log(/\d?/.exec('13456789a'));

//#=>
[ '1', 
 index: 0, 
 input: '13456789a', 
 groups: undefined ]
```

```js
//0
console.log(/\d??/.exec('13456789a'));

//#=>
[ '', 
 index: 0, 
 input: '13456789a', 
 groups: undefined ]
```

---

#### {n,}和 {n,}?

```js
//n~
```

```js
//n
```

---

#### {n,m}和{n,m}?

```js
//n~m
```

```js
//n
```





## 基础练习

### 捕获一段html结构

- 贪婪匹配最大长度

```js
/<.+>/
```

```js
const str = '<div><span>hello</span></div>';
const reg = /<.+>/;

console.log(reg.exec(str));

//#=》
[
  '<div><span>hello</span></div>',
  index: 0,
  input: '<div><span>hello</span></div>',
  groups: undefined
]
```

- 非贪婪匹配

```js
/<.+?>/
```

```js
const str = '<div><span>hello</span></div>';
const reg = /<.+?>/;

console.log(reg.exec(str));

//#=》
[
  '<div>',
  index: 0,
  input: '<div><span>hello</span></div>',
  groups: undefined
]
```

---

---

### 有无边界符

```js
const reg = /\d{2,4}/

console.log(reg.test(''));
console.log(reg.test('1'));
console.log(reg.test('12'));
console.log(reg.test('123'));
console.log(reg.test('1234'));
console.log(reg.test('12345'));
console.log(reg.test('123456'));

//#=>
false
false
true
true
true
true
true

//没有边界符不是限定，只要有符合的内容了，就行
```

---

---

### 限定符练习

- **/^abcd{2}$/**

```js
const reg = /^abcd{2}$/;
console.log(reg.test('abcdabcd'))
console.log(reg.test('abcdd'))

//#=>
false
true

//限定符仅限定紧挨在前面的一个字符或一个整体的次数
```

- **/^(abcd){2}$/**

```js
const reg = /^(abcd){2}$/
console.log(reg.test('abcdabcd'))
console.log(reg.test('abcdd'))

//#=>
true
false
```

- **/^a{2}b{2}c{2}d{2}$/**

```js
const reg = /^a{2}b{2}c{2}d{2}$/
console.log(reg.test('abcdabcd'))
console.log(reg.test('aabbccdd'))

//#=>
false
true
```

---

---

### 特殊字符练习

- **/^(abc|def)$/**

```js
//abc或def
```

- **/^(abc|def){2}$/**

```js
//abc或def出现2次
abcabc
defdef
abcdef
defabc
//()是一个整体
// |是左边整体或右边整体
```

---

### 综合练习

- 只能数字、字母、下划线组成，6~12位，不能以下划线开头

```js
		/^[0-9a-zA-Z]\w{5,11}$/
//开头先确定一位字符，然后6~12范围减去一位
```

---

### 验证数字范围

正则一般不用来验证数字，太复杂。

这里只是用来巩固掌握

- 验证数字0~255

```js
//y要分别考虑位数
//一位数，
//两位数，
// 1开头的三位数
// 2开头的0~4的三位数
// 2开头的5的三位数
```

```js
//一位数 
//0~9
		/\d/
```

```js
//两位数
//10~99
		/\d{2}/
```

```js
// 1开头的三位数
//100~199
		/1\d{2}/
```

```js
// 2开头的0~4的三位数
//200~249
		/2[0-4]\d/
```

```js
// 2开头的5的三位数
// 250~255
		/25[0-5]/
```

```js
//然后用 | 把上述或连接起来，如下：

/^(\d|\d{2}|1\d{2}|2{0-4}\d|25[0-5])$/
```

简写如下：

```js
/^1?\d{1,2}|2[0-4]\d|25{0-5}$/
```





## 正则的预查

### 正向预查

正序

#### 正向肯定预查 （?=）

在捕获一个内容时，该内容的**后面**必须**跟有**选择的某项

```js
		/捕获内容(?=内容后跟的选择)/
```

如下：

```js
ES2015  ES2016  ES2017
//只要求捕获ES2015和ES2016的ES
//即只捕获 2015结尾和2016结尾的ES
//（捕获的内容是ES，ES后必须跟有2015|2016）
```

```js
		/ES(?=2015|2016)/
//只要ES后跟的是2015或2016，就捕获这个字符串中的ES

const reg = /ES(?=2015|2016)/
console.log(reg.exec('ES2000'))
console.log(reg.exec('ES2015'))
console.log(reg.exec('ES2016'))

//#=》
null
[ 'ES', index: 0, input: 'ES2015', groups: undefined ]
[ 'ES', index: 0, input: 'ES2016', groups: undefined ]
//捕获ES2015和ES2016的ES
```

---

#### 正向否定预查（?!）

在捕获一个内容时，该内容的**后面**必须**不能跟有**选择的某项

```js
		 /捕获内容(?!内容后跟的选择)/
```

与（?=）相反，正向肯定预查是要求捕获内容后跟有某项

（?!）正向否定预查是要求捕获内容后不能跟有

如下：

```js
ES2015  ES2016  ES2017
//只要求捕获ES2015和ES2016的ES
//即只捕获 2015结尾和2016结尾的字符串的ES,即结尾不是2017的ES
//（捕获的内容是ES，ES后必须跟有2015|2016）
```

```js
		/ES(?!2017)/
//只要ES后跟的不是2017，就捕获这个字符串中的ES

const reg = /ES(?!2017)/
console.log(reg.exec('ES2017'))
console.log(reg.exec('ES2015'))
console.log(reg.exec('ES2016'))

//#=>
null
[ 'ES', index: 0, input: 'ES2015', groups: undefined ]
[ 'ES', index: 0, input: 'ES2016', groups: undefined ]
//捕获ES2015和ES2016的ES
```

---

---

### 负向预查

倒序

#### 负向肯定预查  （?<=）

在捕获一个内容时，该内容的**前面**必须**跟有**选择的某项

```js
		/(?<=内容前跟的选择项)要捕获的内容/
```

```js
2015ES  2016ES  2017ES
//只要求捕获2015ES和2016ES的ES
//即只捕获 2015开头和2016开头的ES
//（捕获的内容是ES，ES前面必须跟有2015|2016）
```

```js
		/(?<=2015|2016)ES/
//只要ES前面是2015或2016，就捕获ES

const reg = /(?<=2015|2016)ES/;
console.log(reg.exec('2017ES'))
console.log(reg.exec('2015ES'))
console.log(reg.exec('2016ES'))

//#=》
null
[ 'ES', index: 4, input: '2015ES', groups: undefined ]
[ 'ES', index: 4, input: '2016ES', groups: undefined ]
```

---

#### 负向否定预查 （?<!）

在捕获一个内容时，该内容的**前面**必须**不能跟有**选择的某项

```js
		/(?<!内容前面跟着的的选择)捕获内容/
```

```js
2015ES  2016ES  2017ES
//只要求捕获2015ES和2016ES的ES
//即只捕获 2015开头和2016开头的ES，前面不是2017的ES
//（捕获的内容是ES，ES前面必须跟有2015|2016）
```

```js
		/(?<!2017)ES/	
// 只要ES前不是2017就行就捕获该ES

const reg = /(?<!2017)ES/;
console.log(reg.exec('2017ES'))
console.log(reg.exec('2015ES'))
console.log(reg.exec('2016ES'))

//#=》
null
[ 'ES', index: 4, input: '2015ES', groups: undefined ]
[ 'ES', index: 4, input: '2016ES', groups: undefined ]
```





## 重复出现

```js
		/\num/
```

表示重复出现一个和第num个**可被捕获的小括号**内容相同的内容

num是一个正整数数字，第几个**被捕获的小括号**

\1  \2  \3  ...

```js
	/(abc|def)\d+\1/
//重复出现一个和第1个括号内容相同的内容

const reg = /(abc|def)\d+\1/
console.log(reg.test('abc123abc'));
console.log(reg.test('def123def'));
console.log(reg.test('abc123def'));
console.log(reg.test('def123abc'));

//#=》
true
true
false
false
//出现一份该和该小括号内容一模一样的内容
		/(abc|def)\d+(abc|def)/
//前面选择了abc后面重复的也只能是abc
```

```js
		/([abcd])\d+([abcd])\d+\2/

const reg = /([abcd])\d+([abcd])\d+\2/
console.log(reg.test('a1d2d'));
console.log(reg.test('a1d2a'));
// #=>
true
false

//   a1d2d true
//   a1d2a false
```

```js
		/([abcd])\d+([abcd])\d+\2\1/
//   a1d2da true
//   a1d2aa false
```

---

#### 和 (?:) 连用

重复\num 是重复第num个**能被捕获的小括号**的内容

(?:) 的作用是仅作为一个整体，不能捕获里面的内容

```js
		/(?:[abcd])\d+([abcd])\d+\1/
//第一个不能捕获，所以 \1 重复的内容是第二个的

const reg = /(?:[abcd])\d+([abcd])\d+\1/
console.log(reg.test('a1d2d'));
console.log(reg.test('a1d2a'));

//#=》
true
false
```



## 练习

### 邮箱匹配

```js
名字： 6~8位，不能以下划线_开头，只能由数字字母下划线组成

只能是 gmail, qqmial, 163mail

后缀只能是 .com 或 .cn
```

**BlaxBerry123@gmail.com**

```js
	/^[0-9a-zA-Z]\w{5,7}@(gmail|qq|163)\.(com|cn)$/
```

```js
const reg = /^[0-9a-zA-Z]\w{5,7}@(gmail|qq|163)\.(com|cn)$/

console.log(reg.test('abc123@gmail.com')); 
console.log(reg.test('abc123@qq.cn'));

console.log(reg.test('aaaa@gamil.com'));
console.log(reg.test('_aaaa@gamil.com'));
console.log(reg.test('aaaa@hotmail.com'));

//#=>
true
true
false
false
false
```

---

### 手机号码匹配

- 不写分隔符：

**09066666666**

```js
		/(090|080|070)\d{8}/
```

---

- 写分隔符：

**090-6666-6666**

```js
		/^(090|080|070)\-\d{4}\-\d{4}$/
```

```js
const reg = /^(090|080|070)\-\d{4}\-\d{4}$/

console.log(reg.test('090-6666-6666')); //true
console.log(reg.test('080-1111-1212')); //true
console.log(reg.test('040-0000-7899')); //false
```

或简写：

```js
		/^0[7-9]0(\-\d{4}){2}$/
```

---

- 分隔符可写可不写：

```js
		/^(090|080|070)\-?\d{4}\-?\d{4}$/
```

或简写：

```js
		/^0[7-9]0(\-?\d{4}){2}$/
```

```js
const reg = /^(090|080|070)\-?\d{4}\-?\d{4}$/

console.log(reg.test('090-6666-6666'));  //true
console.log(reg.test('09066666666'));    //true
```

---

---

加上国籍区号：

区号一般不需要捕获，使用（?:）括起区号

**(+81)090-6666-6666**

```js
		/^(?:\+81)?0[7-9]0(\-\d{4}){2}$/
```

```js
const reg = /^(?:\+81)?0[7-9]0(\-\d{4}){2}$/

console.log(reg.test('090-6666-6666')); 	//true
console.log(reg.test('080-1111-1212'));		//true
console.log(reg.test('+81090-6666-6666'));  //true
console.log(reg.test('+81080-6666-6666'));  //true
```

**(+81)90-6666-6666**

```js
		/^(?:\+81)?[7-9]0(\-\d{4}){2}$/
```

```js
const reg = /^(?:\+81)?[7-9]0(\-\d{4}){2}$/

console.log(reg.test('90-6666-6666')); 		//true
console.log(reg.test('+8190-6666-6666'));   //true
```

---

- 区号后空格

**(+81) 90-6666-6666**

```js
const reg = /^(?:\+81)? ?[7-9]0(\-\d{4}){2}$/
console.log(reg.test('90-6666-6666'));		//true
console.log(reg.test('+8190-6666-6666'));   //true
console.log(reg.test('+81 90-6666-6666'));  //true
```





## 正则的标识符

标识符写在正则表达式的外面，用来修饰整个正则表达式

- 内置构造函数创建正则时，标识符为止：

```js
		/a-z/ig
```

```js
		new RegExp('正则'，'标识符')
		
const reg = new RegExp('\d{3}','g');
```



### i 

前面的正则**忽略大小写**

```js
		/^[abcd]$/i
```

```js
const reg = /^[abcd]$/i
console.log(reg.test('a')); //true
console.log(reg.test('A')); //true
```

---

---

### g

全局匹配和捕获，

当前的匹配或捕获是从上一次的匹配或捕获的位置处开始

#### 正则不加标识符 **g** 时

捕获的是第一个符合的内容

```js
const reg = /abc/
console.log(reg.test('000abc000abc'));
console.log(reg.exec('000abc000abc'));

//#=》
true
[ 'abc', 
 index: 3, 
 input: '000abc000abc', 
 groups: undefined ]
```

---

#### 带有标识符 **g** 时

前面正则的内容变为**全局捕获**

每次捕获都从上一次捕获的位置后面开始，直到找不到返回null

即把字符串全都匹配捕获了一遍

```js
const reg = /abc/g
str = '000abc000abc000abc000abc'
console.log(reg.exec(str));
console.log(reg.exec(str));
console.log(reg.exec(str));
console.log(reg.exec(str));
console.log(reg.exec(str));
console.log(reg.exec(str));

//#=》
[
  'abc',
  index: 3,
  input: '000abc000abc000abc000abc',
  groups: undefined
]
[
  'abc',
  index: 9,
  input: '000abc000abc000abc000abc',
  groups: undefined
]
[
  'abc',
  index: 15,
  input: '000abc000abc000abc000abc',
  groups: undefined
]
[
  'abc',
  index: 21,
  input: '000abc000abc000abc000abc',
  groups: undefined
]
null
[
  'abc',
  index: 3,
  input: '000abc000abc000abc000abc',
  groups: undefined
]
```

---

---

### y

粘性全局，紧挨一起进行匹配或捕获

匹配或捕获时，必须从**字符串的序号0处**就能找到符合内容，不然会返回null

```js
const reg = /abc/y
str = '000abc000abc000abc000abc'
console.log(reg.exec(str));
console.log(reg.exec(str));
console.log(reg.exec(str));
console.log(reg.exec(str));
console.log(reg.exec(str));

null
null
null
null
null
```

---

当前捕获的是从紧跟着上一次的位置的后面开始，中间不能出现任何其他内容，不然返回null，然后结束“遍历字符串”

```js
const reg = /abc/y
str = 'abc000abc000abc000abc000'
console.log(reg.exec(str));
console.log(reg.exec(str));
console.log(reg.exec(str));
console.log(reg.exec(str));
console.log(reg.exec(str));

[
  'abc',
  index: 0,
  input: 'abc000abc000abc000abc000',
  groups: undefined
]
null
[
  'abc',
  index: 0,
  input: 'abc000abc000abc000abc000',
  groups: undefined
]
null
[
  'abc',
  index: 0,
  input: 'abc000abc000abc000abc000',
  groups: undefined
]
```









## 练习

### 捕获字符串中所有指定内容

捕获字符串中的所有3位数

```js
		'asdv123dsv123hn456bfd789';

仅捕获出str中的所有三位数数字
```

使用while循环全局捕获

捕获的内容放入一个数组

```js
let str = 'asdv123dsv123hn456bfd789';

        //准备正则
        let reg = /\d{3}/g;

        //准备数组，存放结果
        let arr = [];

        //先捕获一次
        let tmp = reg.exec(str);

        //因为捕获的结果 ，要么捕获成功返回一个数组，要么没捕获到返回null
        //只要tmp时真，不是null，就吧返回数组中的[0]元素存入数组
        //存入后，再重新捕获，并赋值tmp，继续判断循环
        while (tmp) {
            arr.push(tmp[0])

            tmp = reg.exec(str)
        };

        console.log(arr);

//#=》
["123", "123", "456", "789"]
```

*或者通过字符串的match方法匹配全局正则

---

### 替换字符串的全部内容

替换字符串中的所有制定自负（正则匹配的字符）

```js
'asdv123dsv123hn456bfd789';

//把字符串的所有数字换为***
```

```js
		str.replace(/正则/g,'替换为的内容')

//返回一个新字符串
```

```js
let str = 'asdv123dsv123hn456bfd789';
let reg = /\d{3}/g;
let strNew = str.replace(reg,'***');
console.log(strNew);
//#=>
asdv***dsv***hn***bfd***
```





## 字符串和正则

字符串的方法与正则连用，正则作为字符串方法的参数

### str.search( )

```js
	str.search(/正则/)

//如果有指定字符存在，返回序号，若没有返回-1
```

```js
let str = 'asdvvs123hnehb';
str.search('123')

str.search(/\d{3}/)
```

---

### str.replace( )

```js
	str.replace(/正则/)
// 替换字符串中第一处符合正则的的字符片段
// 返回一个新字符串

	str.replace(/正则/g)
// 替换字符串中所有符合正则的地方
// 返回一个新字符串
```

```js
let str = 'asdv123dsv123hn456bfd789';
let reg = /\d{3}/g;
let strNew = str.replace(reg,'***');
console.log(strNew);
//#=>
asdv***dsv***hn***bfd***
```

---

### str.match( )

和正则的exec方法一样

```js
		str.match(/正则/)
//返回一个数组
//捕获第一个符合的字符
```

```js
str = "adsf789AEg123Y428"
let reg = /\d{3}/
let arr = str.match(reg);
console.log(arr);

//#=》
[ '789', 
 index: 4, 
 input: 'adsf789AEg123Y428', 
 groups: undefined ]
```

#### 和全局匹配的字符串连用

```js
		str.match(/正则/g)
//返回一个数组，
//包含所有满足的内容
```

```js
str = "adsf789AEg123Y428"
let reg = /\d{3}/g
let arr = str.match(reg);
console.log(arr);

//#=》
[ '789', '123', '428' ]
```

*参照正则的全局捕获





## 正则和中文

```js
		[\u4e00-\u9fa5]
```

```js
const reg = /[\u4e00-\u9fa5]/
```

---

### Hiragana

Unicode code points regex: [\x3041-\x3096]

```js
		[\x3041-\x3096]
```

---

### Katakana (Full Width)

Unicode code points regex: [\x30A0-\x30FF]

```js
		 [\x30A0-\x30FF]
```

---

### Kanji

Unicode code points regex: [\x3400-\x4DB5\x4E00-\x9FCB\xF900-\xFA6A]

```js
		 [\x3400-\x4DB5\x4E00-\x9FCB\xF900-\xFA6A]
   
```





## 表单验证

随着用户输入，随时进行验证。

会和 **字体图标** 还有 **提示文本**一起

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>正则表单验证</title>
    <style>
        * {
            margin: 0;
            padding: 0;
        }
        
        form {
            width: 300px;
            padding: 20px;
            border: 3px solid gray;
            margin: 100px auto;
            border-radius: 10px;
        }
        
        form label {
            position: relative;
            display: block;
            padding: 10px;
            padding-bottom: 30px;
            background-color: grey;
        }
        
        form label span {
            position: absolute;
            left: 10px;
            bottom: 5px;
            font-size: 12px;
            color: white;
            width: 100%;
            text-align: center;
            display: none;
        }
        
        @font-face {
            font-family: 'iconfont';
            src: url('//at.alicdn.com/t/font_2383639_md0ltsigiq.eot');
            src: url('//at.alicdn.com/t/font_2383639_md0ltsigiq.eot?#iefix') format('embedded-opentype'), url('//at.alicdn.com/t/font_2383639_md0ltsigiq.woff2') format('woff2'), url('//at.alicdn.com/t/font_2383639_md0ltsigiq.woff') format('woff'), url('//at.alicdn.com/t/font_2383639_md0ltsigiq.ttf') format('truetype'), url('//at.alicdn.com/t/font_2383639_md0ltsigiq.svg#iconfont') format('svg');
        }
        
        form label i {
            position: absolute;
            left: 240px;
            width: 30px;
            height: 30px;
            font-style: normal;
            font-family: 'iconfont';
        }
        
        form>label>i.icon-error {
            color: red;
        }
        
        form>label>i.icon-succeed {
            color: green;
        }
    </style>

</head>

<body>
    <form>
        <label>
            name: <input type="text">
            <i></i>
            <span>only a~z A-Z 0~9 or underline</span>
        </label>
    </form>

    <script>
        const reg = /^[0-9a-zA-Z]\w{5,11}$/;

        const inp = document.querySelector('input');
        const i = document.querySelector('i');
        const span = document.querySelector('span');

        inp.addEventListener('input', function() {

            if (reg.test(this.value)) {
                i.classList.add('icon-succeed');
                i.classList.remove('icon-error');
                i.innerHTML = '&#xe660;'
                span.style.display = 'none'
            } else {
                i.classList.add('icon-error');
                i.classList.remove('icon-succeed');
                i.innerHTML = '&#xe636;';
                span.style.display = 'block';
            }
        })
    </script>
</body>

</html>
```

添加等待机制，如下：

```js
    <script>
        const reg = /^[0-9a-zA-Z]\w{5,11}$/;

        const inp = document.querySelector('input');
        const i = document.querySelector('i');
        const span = document.querySelector('span');

        let timer = 0;
        inp.addEventListener('input', function() {
            clearTimeout(timer);
            timer = setTimeout(() => {
                if (reg.test(this.value)) {
                    i.classList.add('icon-succeed');
                    i.classList.remove('icon-error');
                    i.innerHTML = '&#xe660;'
                    span.style.display = 'none'
                } else {
                    i.classList.add('icon-error');
                    i.classList.remove('icon-succeed');
                    i.innerHTML = '&#xe636;';
                    span.style.display = 'block';
                }
            }, 300)
        })
    </script>
```

