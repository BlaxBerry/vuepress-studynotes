# 常用字符串方法



## toUpperCase()

将字符全改为大写

```js
let str = 'hello, i am andy'

console.log(str.toUpperCase());
// HELLO, I AM ANDY
```

```js
let str = 'hello, i am andy'

console.log(str[0].toUpperCase()); // H
```

## toLowerCase()

将字符全改为小写

```js
```





## indexOf()

查找字符在字符串中第一次出现的位置

查找不到返回-1

```js
let str = 'hello, i am andy'

console.log(str.indexOf('andy')); // 12
console.log(str.indexOf('7890')); // -1
```

```js
str.indexOf('字符', start)
```

```js
// 计算字符o出现的所有位置和出现总次数
let str = 'sdesofrerwevoauboubqevoow'

let indexs = []
let count = 0
let index = str.indexOf('o')
while (index !== -1) {
    indexs.push(index)
    index = str.indexOf('o', index + 1)
    count++
}
console.log(indexs); // [ 4, 12, 16, 22, 23 ]
console.log(count); // 5
```



## lastIndexOf()

从后向前搜索字符串，查找字符在字符串中第一次出现的位置

查找不到返回-1

```js
let str = 'hello, i am andy, hello'

console.log(str.indexOf('hello'));  // 0
console.log(str.lastIndexOf('hello'));  // 18

console.log(str.indexOf('7890')); // -1
```

```js
str.lastIndexOf('字符', start)
```



## includes()

判断字符串是否包含指定的子字符串。

如果找到匹配的字符串则返回 true，否则返回 false。

比indexOf的index/-1更直观

```js
str.includes('字符串', [start])
```





## search()

查找字符在字符串中第一次出现的位置

查找不到返回-1

可以传入正则表达式



## concat()

拼接字符串

```js
str1.concat(str2)

str1.concat('字符','字符',str2)
```

```js
let a = 'hello,'
let b = 'andy'

let c= a.concat(b)
console.log(c); // hello,andy

let d = a.concat('_',b)
console.log(d); // hello,_andy
```





## trim()

去除字符串两边的空白

```js
let str = ' hello '
console.log(str);

let str1 = str.trim()
```

## trimStart()

去除字符串开始处空白

## trimEnd()

去除字符串结束处空白

```js
let str = ' hello '

let str2 = str.trimEnd()
console.log(str2);

let str3 = str.trimStart()
console.log(str3);
```







## slice()

截取字符串

```js
str.slice(start, [end])
```

- start：开始的index（包含index）

- end：结束的index（不包含index）

  end默认省略，省略时截取到最后一个字符

```js
let str = 'hello, i am andy'

let res = str.slice(0, str.length - 1)
console.log(res);
// hello, i am and
```

```js
let str = 'hello, i am andy'

let res = str.slice(1)
console.log(res);
// ello, i am andy
```

start，end可为负数

为从字符串的尾部开始算起的位置

slice(-2) ：倒数第二个字符开始到第一个字符





## substring()

截取字符

类似slice()，但是不能传入负数

```js
str.substring(start, [end])
```

- start：开始的index（包含index）

- end：结束的index（不包含index）

  end默认省略，省略时截取到最后一个字符

```js
let str = 'hello, i am andy'

console.log(str.substring(1));
// ello, i am andy
console.log(str.substring(1,3));
// el

```



## substr()

从起始索引号提取字符串中指定数目的字符。

类似slice和substring，可看作substring的简写

但是substr第二个参数指定截取字符串的长度

```js
str.substr(statr, [length])
```

- start：开始的index（包含index）

- length：要截取的长度

  end默认省略，省略时截取到最后一个字符

```js
let str = 'hello, i am andy'

console.log(str.substr(1));
// ello, i am andy
console.log(str.substr(1,4));
// ello
```





## toString()

强制转为字符串类型





## split





## chartAt()

获取指定位置的字符

```js
str.charAt(index)
```

```js
let str = 'hello,andy'
console.log(str.charAt(0)); // h
console.log(str.charAt(1)); // e
```



## chartCodeAt()

获取指定位置的字符的unicode编码







## replace()

将字符串中第一个符合的字符替换

返回一个新字符串

```js
str.replace('要替换的字符','替换为')
```

```js
let str = 'hello, andy. goodbye, andy'

let newStr = str.replace('andy','tom')
console.log(newStr);
// hello, tom. goodbye, andy
```

可匹配正则表达式

```js
```







## startsWidth

判断字符串是否是以指定的子字符串开头（区分大小写）

返回true / false



## endsWith

判断字符串是否是以指定的子字符串结尾（区分大小写）

返回true / false





## 字符出现次数・位置

### while + indexOf()

```js
// 计算字符o出现的所有位置和出现总次数
let str = 'sdesofrerwevoauboubqevoow'

let indexs = []
let count = 0
let index = str.indexOf('o')
while (index !== -1) {
    indexs.push(index)
    index = str.indexOf('o', index + 1)
    count++
}
console.log(indexs); // [ 4, 12, 16, 22, 23 ]
console.log(count); // 5
```



## 出现次数最多的字符

### 对象+charAt()

```js
let str = 'sdesofrerwevoauboubqevoow'

let obj = {}
for (let i = 0; i < str.length; i++) {
    let chars = str.charAt(i)
    if (obj[chars]) {
        obj[chars]++
    } else {
        obj[chars] = 1
    }
}
console.log(obj);
/*
{
  s: 2,
  d: 1,
  e: 4,
  o: 5,
  f: 1,
  r: 2,
  w: 2,
  v: 2,
  a: 1,
  u: 2,
  b: 2,
  q: 1
}
*/
let max = 0
let char = ''
for (key in obj) {
    if (obj[key] > max) {
        max = obj[key]
        char = key
    }
}
console.log(char,max); // o 5
```

