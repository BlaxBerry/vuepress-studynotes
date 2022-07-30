# 字符串 str 常用方法

![img](https://www.python.jp/pages/python_logo2.png)

[[toc]]

## 类型转换

### str()

```python
字符串 = str(数据)
```

```python
print('123' + 'hello')
# 报错 TypeError: unsupported operand type(s) for +: 'int' and 'str'

print(str(123) + 'hello')  # 123hello
```

---

### split()

按间隔符将字符串分割为字符串列表

若间隔符不存在，则默认将空白字符(`\r\n\t`)分割

```python
列表 = 字符串.split()

列表 = 字符串.split("分割字符")

列表 = 字符串.split("分割字符", 最多分割次数)
```

> 如下：

```python
str1 = "1 2 3 4"

print(str1.split())
# ['1', '2', '3', '4']

print(str1.split(" "))
# ['1', '2', '3', '4']

print(str1.split("+++"))
# ['1 2 3 4']

print(str1.split(" ", 2))
# ['1', '2', '3 4']
```

---

### join()

将序列(列表、元组、字典)的元素连接上间隔符合并为一个字符串

```python
字符串 = "分隔符".join(列表)
```

> 如下：

```python
str1 = "咏鹅\n骆宾王\n鹅鹅鹅\n曲项向天歌\n白毛浮绿水\n红掌拨清波"

print("".join(str1.split()))
# "咏鹅骆宾王鹅鹅鹅曲项向天歌白毛浮绿水红掌拨清波"
```

<br/>

## 查找

### find()

返回目标字符/子字符串在字符串中第一次出现位置的索引序号

若不存在否则返回 **`-1`**

```python
序号 = 字符串.find(查找字符)

序号 = 字符串.find(查找字符, beg=开始序号, end=结束序号)
```

::: tip 参数

`start`、`end` 用来指定查找范围，可以省略

- beg：开始索引，默认是 `0`
- end：结束索引，默认是 `len(字符串)`

:::

```python
s = "你好，我是Andy，我今年28，我是学生"

print(s.find("，"))  # 2
print(s.find("9999xxxxx"))  # -1
```

---

### rfind()

从右侧查找目标字符/字符串第一次出现位置的索引序号

若不存在否则返回 -1

```python
序号 = 字符串.rfind(查找字符)
```

> 如下：对比 `rfind()` 与 `find()`

```python
s = "你好，我是Andy，我今年28，我是学生"

print(s.rfind("，"))  # 15
print(s.find("，"))  # 2

print(s.rfind("9999xxxxx"))  # -1
```

> 如下：截取 url 静态资源后缀

```python
url = 'https://blaxberry.github.io/vuepress-studynotes/images/001.jpg'

start = url.rfind('.')
print(url[start:])  # .jpg
```

---

### index()

用法与`find()`方法一样

返回指定字符或子字符串在字符串中的索引序号

```bash
序号 = 字符串.index(查找字符)

序号 = 字符串.index(查找字符, beg=开始序号, end=结束序号)
```

找不到指定字符时报错，返回一个 ValueError 异常

```shell
ValueError: substring not found
```

> 如下：

```python
s = "你好，我是Andy"

print(s.index("Andy"))  # 5
print(s.index("xxx9999"))
# 报错 ValueError: substring not found
```

---

### count()

获取字符或子字符串在字符串中出现的次数

若不存在则返回 `0`

```python
次数 = 字符串.count(字符)

次数 = 字符串.count(字符, start=开始序号, end=结束序号)
```

::: tip 参数

`start`、`end` 用来指定查找范围，可以省略

- start：开始序号，默认为 `0`
- end：结束序号，默认为 `len(字符串)`

:::

```python
str1 = 'banana pie banana'

print(str1.count('a'))  # 6
print(a.count('你好'))  # 0
```

---

### for + in

```python
string = "傻逼打野，你是个大傻逼"

lis = ["傻逼", "弱智"]

for word in lis:
    if word in string:
        print('注意文明，否则禁言')
```

<br/>

## 截取

### 切片

切片即截取字符串（**左闭右开，顾头不顾尾**）

第三个参数是从开始序号向右截取的间隔步长，若为负数则从开始序号向左截取

```python
字符串[开始序号:结束序号[:间隔步长]]

str[:]  # 全部
str[start:]  # start～结尾
str[start:end]  # start～end
str[:end]  # 开始～end
```

> 如下：

```python
s = 'ABCDEFG'

print(s[:])  # ABCDEFG
print(s[:3])  # ABC
print(s[0:3])  # ABC
print(s[1:3])  # BC
print(s[1:-1])  # BCDEF 去头尾
print(s[1:])  # BCDEFG 去头
print(s[:-1])  # ABCDEF 去尾

print(s[-3:])  # EFG
print(s[-3:7])  # EFG

print(s[:-1:2])  # ACE
print(s[1::2])  # BDF
print(s[::2])  # ACEG

print(s[::-1])  # GFEDCBA 翻转
print(s[4::-1])  # EDCBA
print(s[4:0:-1])  # EDCB
print(s[0:4:-1])  # 取不到范围
```

> 如下：截取 url

```python
url = 'https://blaxberry.github.io/vuepress-studynotes/notes/back/python/python3.html#01-string'

start = url.find('#') + 1
print(url[start:])  # 01-string
```

> 如下：截取后缀

```python
url = 'https://blaxberry.github.io/vuepress-studynotes/images/001.jpg'

start = url.rfind('.')
print(url[start:])  # .jpg
```

<br/>

## 替换

### replace()

将字符串中的指定字符 **全部替换**

返回值是处理后的新字符串

```python
新字符串 = 字符串.replace('字符', '替换字符')

新字符串 = 字符串.replace('字符', '替换字符', 仅替换前几个)
```

```python
string = "傻逼打野，你是个大傻逼"

# 默认全部替换
str_handled = string.replace("傻逼", "**")
print(str_handled)  # "**打野，你是个大**"

# 替换指定个数
str_handled = string.replace("傻逼", "**", 1)
print(str_handled)  # "**打野，你是个大傻逼"
```

> 如下：循环替换列表

```python
string = "智障! 傻逼打野，你是个大傻逼，你就是个智障，我CNM"

badwords = ["傻逼", "智障", "CNM"]

for word in badwords:
    string = string.replace(word, "**")

print(string)  # "**! **打野，你是个大**，你就是个**，我**"
```

<br/>

## 格式化去空白

### strip()

去字符串左右两端空格

是 `lstrip()` + `rstrip()` 的复合写法

```python
str1 = " aaaa "

print(str1)  # " aaaa "
print(str1.strip())  # "aaaa"
```

<br/>

## 格式化文本对齐

### center()

将字符串填充至指定长度并使内容居中展示

返回的是一个新字符串

若指定长度小于原字符串长度，则返回原字符串

第二个参数是充填字符，默认使用英文半角空格字符，可省略

```python
新字符串 = 字符串.center(长度)

新字符串 = 字符串.center(长度, "充填字符")
```

> 如下：

```python
str1 = "你好"

print(str1.center(6))  # "  你好  "
print(str1.center(6, "+"))  # "++你好++"
example = ["咏鹅", "骆宾王", "鹅鹅鹅", "曲项向天歌", "白毛浮绿水", "红掌拨清波"]

for item in example:
    print(f"|{item.center(5,'〇')}|")

"""
|〇〇咏鹅〇|
|〇骆宾王〇|
|〇鹅鹅鹅〇|
|曲项向天歌|
|白毛浮绿水|
|红掌拨清波|
"""
```

---

### ljust()

将字符串填充至指定长度并使内容左对齐展示

> 其实就是默认的展示方式

第二个参数是充填字符，默认使用**一个英文半角空格**字符，可省略

返回的是一个新字符串

```python
新字符串 = 字符串.ljust(长度)

新字符串 = 字符串.ljust(长度, "充填字符")
```

> 如下：

```python
example = ["咏鹅", "骆宾王", "鹅鹅鹅", "曲项向天歌", "白毛浮绿水", "红掌拨清波"]

for item in example:
    print(f"|{item.ljust(5,'〇')}|")

"""
|咏鹅〇〇〇|
|骆宾王〇〇|
|鹅鹅鹅〇〇|
|曲项向天歌|
|白毛浮绿水|
|红掌拨清波|
"""
```

---

### rjust()

将字符串填充至指定长度并使内容**右对齐**展示

第二个参数是充填字符，默认使用**一个英文半角空格**字符，可省略

返回的是一个新字符串

```python
新字符串 = 字符串.rjust(长度)

新字符串 = 字符串.rjust(长度, "充填字符")
```

> 如下：

```python
example = ["咏鹅", "骆宾王", "鹅鹅鹅", "曲项向天歌", "白毛浮绿水", "红掌拨清波"]

for item in example:
    print(f"|{item.rjust(5,'〇')}|")

"""
|〇〇〇咏鹅|
|〇〇骆宾王|
|〇〇鹅鹅鹅|
|曲项向天歌|
|白毛浮绿水|
|红掌拨清波|
"""
```

<br/>

## 格式化大小写

### title()

将**每个单词的首字母**都转化为大写

其余字母都转为小写

返回值是处理后的字符串

```python
新字符串 = 字符串.title()
```

```python
s = "hEllo, mY namE iS Andy"

t = s.title()
print(t)
# "Hello, My Name Is Andy"
```

**非字母后的第一个字母都转为大写**

> 如下：

```python
s = "b2b2b2 and 3g3g3g"

t = s.title()
print(t)
# "B2B2B2 And 3G3G3G"
```

---

### capitalize()

将**字符串的第一个字母**变成大写，其他字母变小写

```python
新字符串 = 字符串.title()
```

> 如下：

```python
a = 'hello, My name is Andy'

print(a.capitalize())
# "Hello, my name is andy"
```

**若首字符是非字母，则字符串字母全转换成小写**

> 如下：

```python
a = '123hello, Andy'

print(a.capitalize())
# "123hello, andy"
```

---

### upper()

将字符串中所有字母转为大写

```python
新字符串 = 字符串.upper()
```

---

### lower()

将字符串中所有字母转为小写

```python
新字符串 = 字符串.lower()
```

---

### swapcase()

反转字符串中所有字母的大小写

```python
新字符串 = 字符串.swapcase()
```

> 如下：

```python
str1 = "Hello, World....."
print(str1.swapcase())  # “hELLO, wORLD.....”
```

<br/>

## 判断格式内容

### isspace()

判断字符串是否只包含**空格或空白字符**

返回值为布尔型 `True` 或 `False`

```python
布尔 = 字符串.isspace()
```

> 如下：

```python
str1 = " "
print(str1.isspace())  # True

str2 = "hello hello"
print(str2.isspace())  # False

str3 = ""
print(str3.isspace())  # False

str4 = "\n \t \r"
print(str4.isspace())  # True
```

---

### isalpha()

判断字符串是否由 **纯字母字符** 构成

返回值为布尔型 `True` 或 `False`

```python
布尔 = 字符串.isalpha()
```

> 如下：

```python
str1 = "hello"
print(str1.isalpha())  # True

str5 = "你好"
print(str5.isalpha())  # True

str6 = "こんにちは"
print(str6.isalpha())  # True

str2 = "123"
print(str2.isalpha())  # False

str3 = "hello123"
print(str3.isalpha()) # False

str4 = " "
print(str4.isalpha())  # False
```

---

### isalnum()

判断字符串是否仅由至少一个 **字母或数字** 组成

返回值为布尔型 `True` 或 `False`

```python
布尔 = 字符串.isalmun()
```

> 如下：

```python
str1 = "1"
print(str1.isalnum())  # True

str2 = "hello123"
print(str2.isalnum())  # True

str3 = "hello"
print(str3.isalnum())  # True

str4 = "   "
print(str4.isalnum())  # False

str5 = ""
print(str5.isalnum())  # False

str6 = "s *#¥%&"
print(str6.isalnum())  # False
```

---

### isdecimal()

判断字符串是否由**纯整数数字**构成，仅限十进制阿拉伯数字

返回值为布尔型 `True` 或 `False`

```python
布尔 = 字符串.isdecimal()
```

> 如下：

```python
str1 = "123"
print(str1.isdecimal())  # True

str2 = "/u00b2"
print(str2.isdecimal())  # False

str3 = "五百"
print(str3.isdecimal())  # False

str4 = "hello"
print(str4.isdecimal())  # False

str5 = "hello123"
print(str5.isdecimal())  # False
```

---

### isdigit()

比 `isdecimal()`方法更强大，但实际开发中用的少

判断字符串是否由 **纯数字** 组成（阿拉伯数字、unicode 编码数字）

返回值为布尔型 `True` 或 `False`

```python
布尔 = 字符串.isdigit()
```

> 如下：

```python
str1 = "123"
print(str1.isdigit())  # True

str2 = "/u00b2"
print(str2.isdigit())  # True

str3 = "五百"
print(str3.isdigit())  # False

str4 = "hello"
print(str4.isdigit())  # False
```

---

### isnumeric()

比 `isdecimal()`、`isdigit()` 方法更强大，但实际开发中用的少

判断字符串是否由 **纯数字** 组成（阿拉伯数字、unicode 编码、中文数字）

返回值为布尔型 `True` 或 `False`

```python
布尔 = 字符串.isnumeric()
```

> 如下：

```python
str1 = "123"
print(str1.isnumeric())  # True

str2 = "/u00b2"
print(str2.isnumeric())  # True

str3 = "五百"
print(str3.isnumeric())  # True

str4 = "hello"
print(str4.isnumeric())  # False
```

---

### istitle()

判断字符串中**每个单词首字母**是否为大写

返回值为布尔型 `True` 或 `False`

```python
布尔 = 字符串.istitle()
```

> 如下：

```python
str1 = "Hello, World"
print(str1.istitle())  # True

str2 = "hello, world"
print(str2.istitle())  # False
```

---

### islower()

判断字符串是否由 **纯小写字母** 构成

返回值为布尔型 `True` 或 `False`

```python
布尔 = 字符串.islower()
```

> 如下：

```python
str1 = "hello, world......"
print(str1.islower())  # True

str2 = "Hello, World"
print(str2.islower())  # False

str3 = "Hello, World123"
print(str3.isupper())  # False

str4 = "你好"
print(str4.isupper())  # False
```

---

### isupper()

判断字符串是由 **纯大写字母** 构成

返回值为布尔型 `True` 或 `False`

```python
布尔 = 字符串.isupper()
```

> 如下：

```python
str1 = "HELLO, WORLD....."
print(str1.isupper())  # True

str2 = "Hello, World"
print(str2.isupper())  # False

str3 = "Hello, World123"
print(str3.isupper())  # False

str4 = "你好"
print(str4.isupper())  # False
```

### startswith()

判断字符串是否以指定字符开始

返回值为布尔型 `True` 或 `False`

```python
布尔 = 字符串.startswith('字符')
```

> 如下：

```python
a = " hello"
print(a.startswith(' '))  # True

b = "hello world"
print(b.startswith('hello'))  # True
```

---

### endswith()

判断字符串是否以指定字符结束

返回值为布尔型 `True` 或 `False`

```python
布尔 = 字符串.endswith('字符')
```

> 如下：判断后缀名

```python
update_filename_1 = "xxxx.jpg"
update_filename_2 = "xxxx.mp3"

print(update_filename_1.endswith(".jpg"))  # True
print(update_filename_2.endswith(".jpg"))  # False
```

<br/>

## 格式化插入数据

### format()

> 比较旧，更推荐使用 [f-string]() 格式化字符串

```python
"{}".format(参数)

"{}{}".format(参数, 参数)

"{下标}{下标}".format(参数, 参数)

"{参数变量名}{参数变量名}".format(参数变量名=值, 参数变量名=值)
```

`format()` 的多个参数被视做元组，会按序填充字符串中 `{}` 的占位

`{}` 占位的填充数据可通过元组指定下标号获取，也可通过指定参数变量名获取

> 如下：按顺序填充

```python
print("我叫{}，今年{}岁，职业是{}".format('Andy', 28, '工程师'))
# 我叫Andy，今年28岁，职业是工程师

print("我叫{}".format('Andy', 28, '工程师'))
# 我叫Andy

print("我叫{}，今年{}岁，职业是{}".format('Andy'))
# 报错 IndexError: Replacement index 1 out of range for positional args tuple
```

> 如下：指定填充的元组下标号

```python
print("他叫{0}今年{1}岁，我叫{2}今年也{1}岁".format('Andy', 28, 'Tom'))
# 他叫Andy今年28岁，我叫Tom今年也28岁
```

> 如下：指定参数变量名获取

```python
print("我叫{name}，今年{age}岁，职业是{job}".format(name='Andy', age=28, job='工程师'))
# 我叫Andy，今年28岁，职业是工程师
```

<br/>

## eval()

将字符串的内容当作有效的表达式，并返回运算结果

可数学计算

```python
print(eval("1+1"))  # 2
print(eval("1   + 1"))  # 2
```

可重复字符

```python
print(eval("'☆' * 5"))
# ☆☆☆☆☆
```

可转换数据类型

```python
print(type(eval("[1,2,3]")))  # <class 'list'>
print(type("[1,2,3]"))  # <class 'str'>

print(type(eval("{'name': 'Andy'}")))  # <class 'dict'>
print(type("{'name': 'Andy'}]"))  # <class 'str'>
```

::: danger

千万不要直接转换 `input()` 的内容<br/>否则直接输入个终端命令就 TMD 直接被执行了

```python
str = "__import__('os').system('某终端命令')"
eval(input(str))
```

:::

<br/>

## 实例

### 字符串首字符转为大写

```python
s = "hello, I'm Andy"

final = s[0].upper() + s[1:]
print(final)
# Hello, I'm Andy
```

---

### 修改文件名

> 如下：
>
> 文件名长度不低于 6 位且后缀为 .jpg 时才算成功
>
> 若文件名长度不够则生成 6 位随机数替换

```python
import random

file = 'xxx.jpg'


if file.endswith('.jpg'):

    end = file.rfind('.')
    file_name = file[:end]

    if len(file_name) < 6:
        random_number = random.randint(100000, 999999)
        final_name = str(random_number) + file[end:]
    else:
        print('上传成功')
else:
    print('文件格式错误')
```

---

### 生成随机简易验证码

```python
import random

name = ''

strlist = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'

# 生成 6 位随机字符数字
for i in range(6):
    index = random.randint(8, len(strlist)-1)
    name += strlist[index]
```
