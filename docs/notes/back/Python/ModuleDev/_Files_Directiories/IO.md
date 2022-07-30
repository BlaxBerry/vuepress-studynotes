# 文件读写操作

![img](https://www.python.jp/pages/python_logo2.png)

[[toc]]

## 基本步骤

::: tip 文件操作步骤：

1. 打开文件，**创建文件对象**
2. 读写操作
3. **关闭**文件

:::

Python 中通过内置函数 [open()](#open) 来实现文件的输入输出操作

```python
# 1. 打开
file = open(文件名·路径)

# 2. 操作
# ...

# 3. 关闭
file.close
```

<br/>

## open()

内置方法 `open()` 用于打开文件，返回一个文件流

该方法创建并返回打开文件的对象，通过文件对象的方法来实现文本 [输入输出操作](#输入输出方法)

```python
file = open('文件名·地址'[, mode='打开模式', encoding='字符串编写格式'])
```

```python
file_1 = open('README')
file_2 = open(r'C:\pythone\01.py')
file_3 = open('./01.py')

file_4 = open('./image.jpg', mode='rb')
```

若要打开的文件不存在则报错，抛出一个 FileNotFoundError 异常

```python
open('./$%^*@#%.json')
# FileNotFoundError: [Errno 2] No such file or directory: './$%^*@#%.json'
```

------

### 打开模式

| 访问模式 |                含义                 |
| :------: | :---------------------------------: |
|   只读   |                  r                  |
|   只写   |                w、 a                |
|   读写   | r+、w+、a+ （指针移动频繁效率不好） |
|    ?t    |     rt、wt、at （仅限文本文件）     |
|    ?b    |     rb、wb、ab （文件类型通用）     |

文件打开模式默在调用 `open()` 时指定，默认为只读模式 `r`

```python
file = open('文件名·路径'[, mode='打开模式'])

# file读取或写入操作

file.close()
```

对文本进行的操作需与打开模式一致，即只读模式打开的文件只能进行读取操作，只写模式打开的文件只能进行写入操作，否则会报错抛出一个 io 异常

可读写模式不常用不建议使用，因为会频繁移动指针会影响文件读写效率

::: warning文件指针：

文件指针是从哪个位置开始读写操作文本的标记<br/>读取模式 `r`、`r+` 时，文件指针在文本开头<br/>覆盖模式 `w` 在执行后文件指针会移到文本开头<br/>追加模式 `a`、`a+` 时，文件指针移到文本结尾<br/>可读写模式 `r+`、`w+`、`a+` 会频繁移动指针影响文件读写效率，所以不建议

:::

::: tip r 只读模式

默认文件打开模式为只读模式 `r`<br/>默认可读取文件类型是文本，即 `rt`<br/>只读模式打开的文件无法被写入内容

```python
a = open('01.json')
b = open('01.json', 'r')
c = open('01.json', 'rt')
d = open('01.json', 'rb')

a.write('haha')
# 报错 io.UnsupportedOperation: not writable

a.close()
b.close()
c.close()
d.close()
```

:::

::: tip w 覆盖模式：

默认可写入的文件类型是文本，即 `wt`<br/>覆盖模式时，若文件不存在则新建否则为覆盖

```python
file = open('./example.txt', 'w')
file.write('haha')
file.close()
```

:::

::: tip a 追加模式：

方法执行后文件指针移动到文本末尾<br/>追加模式时，若文件不存在则新建否则为追加

```python
file = open('./example.txt', 'a')
file.write('haha')
file.close()
```

:::

------

### 编码格式

文本文件中的字符通过字符编码实现二进制表示

Python 2X：默认使用 ASCII 编码

Python 3X：默认使用 UTF-8 编码

::: tip ASCII 编码

共有 256 个，仅包含英文字母、数字、常用转义字符<br/>使用一个字节表示一个 ASCII 字符，<br/>一个字节包含 8 个 `0` 或者 `1` 的排列组合，

:::

::: tip UTF-8 编码

UTF-8 是 UNICODE 编码的一种编码格式<br/>几乎包含世界上所有地区的文字<br/>使用 1 ～ 6 个字节表示一个 UTF-8 字符（汉字使用 3 个字节）

:::

<br/>

## 输入输出方法

### close()

用于操作完毕后关闭文件

由文件对象调用

**文件操作完成后必须关闭文件，否则会造成系统资源消耗**

```python
# 1. 打开
file = open('README')

# 2. 读写操作
# ...

# 3. 关闭
file.close
```

------

### read()

一次性读取返回文件的所有内容

由文件对象调用

一次性读取大文件会严重占用内存，更建议 [readline()](#readline)

```python
file = open('./example.txt')
content = file.read()
print(content)
file.close()
```

调用 `read()` 之后文件指针会移动到文本内容的末尾

所以执行过一次后便无法再读取文件内容了

```python
file = open('./example.txt')

a = file.read()
print(len(a))  # 文本内容长度

b = file.read()
print(len(b))  # 0

file.close()
```

> 如下：复制小文件：

```python
file_from = open('example.txt')
file_target = open('example_copy.txt', 'w')

text = file_from.read()
file_target.write(text)

file_from.close()
file_target.close()
```

------

### readline()

一次读取一行文件内容，常用于读取大文件

由文件对象调用

返回读取的每一行的文本，结尾默认带一个转义字符 `\n`

若读取不到则返回 `None`

调用 `readline()` 后文件指针会移动到下一行

```python
file = open('./customers.txt')

while True:
    text = file.readline()

    if not text:
        break

    print(text, end="")

file.close()
```

> 如下：复制大文件：

```python
file_from = open('example.txt')
file_target = open('example_copy.txt', 'w')

while True:
    text = file_from.readline()

    if not text:
      break

    file_target.write(text)


file_from.close()
file_target.close()
```

------

### readlines()

一次读取多行文件内容

由文件对象调用

返回一个列表，若读取不到则返回空列表

```python
file = open('./01.jpg')

for line in file.readlines():
    print(line)

file.close()
```

------

### write()

用于一次性将内容写入文件

由文件对象调用

```python
文件对象.write('内容')
```

只能写入字符串，否则报错抛出 TypeError 异常

```python
# TypeError: write() argument must be str
```

------

### writelines()

用于内容的单行写入

由文件对象调用

```python
文件对象.writeline('内容')
```

只能写入字符串，否则报错抛出 TypeError 异常

```python
# TypeError: write() argument must be str
file = open('./01.txt', mode='w')

for line in range(4):
    file.writelines('hello\n')

file.close()
```

<br/>

## with 语句

`with` 语句结合 `open()` 实现**上下文自动管理**

在 `with` 作用域内书写文件操作，只要跳出作用块就会自动正常关闭文件释放资源

省略了在每一个 `open()` 打开的文件流操作完后都要手写的 `close()`

```python
with open('文件名·地址') as file:
    # 输入输出操作


# 相当于简写了：
file = open('文件名·地址')
# 输入输出操作
file.close()
```

```python
with open('文件名·地址') as file_1:
    with open('文件名·地址') as file_2:
        # 输入输出操作


# 相当于简写了：
file_1 = open('文件名·地址')
file_2 = open('文件名·地址')
# 输入输出操作
file_1.close()
file_2.close()
```

> 如下：文件复制
>
> 将文件 `01.json` 内容复制到 `02.json`

```python
with open('./01.json', 'rb') as file_1:
    constent_1 = file_1.read()

    with open('02.json', 'wb') as file_2:
        file_2.write(constent_1)
```

<br/>

## 实例

### 复制目录下所有文件

```python
|- dir_a  # copy from
	|- 01.txt
	|- 02.txt
|- dir_b  # copy to
|- handle.py
```

```python
import os


def copy(src_from: str, src_to: str):
    """
    将 dir_from 目录下所有文本文件复制（覆盖）到 dir_to 目录下
    若 dir_to 目录不存在则新建目录后复制

    :params: dir_from 读取目录的地址
    :params: dir_to 目标目录地址
    """

    if not os.path.exists(src_to):
        os.mkdir(src_to)

    if os.path.isdir(src_from) and os.path.exists(src_from):
        file_list = os.listdir(src_from)

        for filename in file_list:
            file_path_from = os.path.join(src_from, filename)
            file_path_to = os.path.join(src_to, filename)

            with open(file_path_from) as file_read_from:
                file_content = file_read_from.read()

                with open(file_path_to, 'w') as file_write_to:
                    file_write_to.write(file_content)

        print('目录复制成功')


# 将当前目录下的 dir_a 目录下的文件复制到当前目录下的 dir_b 目录下
copy(src_from='./dir_a', src_to='.')

# 将当前目录下的 dir_a 目录下的文件复制到当前目录下
copy(src_from='./dir_a', src_to='./dir_b')
```

::: warning

仅限复制目录中所有文件，若目录中包含子目录则 `for filename in file_list:` 处会报错抛出 IsADirectoryError 异常，此时需要利用[递归](../Basic/5.Function.md#递归)

:::

------

### 递归复制目录内容

遍历目录内容列表元素，若是文件则直接读取复制，若为目录则[递归](../Basic/5.Function.md#递归)函数执行遍历内容列表，从而实现复制指定目录下所有内容

```python
|- dir_a  # copy from
	|- dir_child
  	 |- a.txt
		 |- b.txt
	|- 01.txt
	|- 02.txt
|- dir_b  # copy to
|- handle.py
```

```python
import os


def copy(src_from: str, src_to: str):
    """
    :params: dir_from 读取目录的地址
    :params: dir_to 目标目录地址
    """

    if not os.path.exists(src_to):
        os.mkdir(src_to)

    if os.path.isdir(src_from) and os.path.exists(src_from):
        content_list = os.listdir(src_from)

        for item in content_list:
            item_path_from = os.path.join(src_from, item)
            item_path_to = os.path.join(src_to, item)

            # 若目录内容列表元素为目录则递归
            if os.path.isdir(item_path_from):
                copy(src_from=item_path_from, src_to=item_path_to)
            else:
                with open(item_path_from) as file_read_from:
                    file_content = file_read_from.read()
                    with open(item_path_to, 'w') as file_write_to:
                        file_write_to.write(file_content)


copy(src_from='./dir_a', src_to='.')
copy(src_from='./dir_a', src_to='./dir_b')
```