# os 模块

![img](https://www.python.jp/pages/python_logo2.png)

[[toc]]

## 简介

`os` 模块用于文件和目录操作管理

```python
import os
```

常与 [os.path 路径管理模块](./os.path.md)、[文件读写操作](./IO.md) 等一起使用

<br/>

## 重命名

### rename()

重命名文件或重命名目录

```python
os.rename('旧文件路径', '新文件名路径')
os.rename('旧目录路径', '新目录名路径')
```

```python
import os

os.rename('./02.txt', '02.json')
os.rename('./dir', 'haha')
```

<br/>

## 获取

### getcwd()

获取**当前所在工作目录**的绝对路径

```python
os.getcwd()
```

```python
import os

print(os.getcwd())
```

等同于 `os.path` 模块的 [os.path.dirname(**file**)](./os.path.md#dirname)

```python
import os

print(os.getcwd())
# 等同
print(os.path.dirname(__file__))
```

---

### listdir()

将作为参数的**指定路径下的所有文件名与子目录名以列表形式**返回

当前目录为空则返回一个空列表，且子目录中内容不返回

```python
[文件全名, 文件全名, 子目录名] = os.listdir(目录地址)
```

```python
import os

print(os.listdir('.'))
print(os.listdir(os.getcwd()))
# ['a.py', 'b.py', 'c.py', 'dir']

os.listdir(os.getcwd('.dir')  # []
```

```text
|- current_dir
	|- dir
	   ｜- 01.py
	|- a.py
	|- b.py
	|- c.py
```

---

### sep

获取当前系统使用的路径分隔符

```python
import os.path

# mac
print(os.sep)  # \
```

::: tip 不同系统中的路径分隔符不同

windows 系统： `\` 或 `\\`
mac、linux 系统： `/`

:::

```python
import os


def get_filename(src: str):

    return src[src.rfind(os.sep)+1:]


print(get_filename(__file__))
```

<br/>

## 切换

### chdir()

改变当前工作目录为指定目录

> 可理解为终端命令的 `cd dirname`

```python
os.chdir('工作目录路径')
```

```python
import os

print (os.getcwd())
# /Users/xxx/StudyNote/Python

os.chdir('./dir')
print (os.getcwd())
# /Users/xxx/StudyNote/Python/dir
```

> 如下：**修改指定目录下文件后缀名**
>
> 在相对路径下的目标目录中，利用相对路径修改其中文件名（地址）时，需要切换当前工作目录到目标目录下，否则修改后文件完整路径就 TM 成了相对路径 `../../新名`

```python
import os
import os.path

def change_extension(target_dir: str, ext_from: str, ext_to: str):

    all_files = os.listdir(target_dir)
    os.chdir(target_dir)  # 切换所处的工作目录到 dir

    for filename in all_files:
        portion = os.path.splitext(filename)

        if portion[1] == ext_from:
            newname = portion[0] + ext_to
            os.rename(filename, newname)
            # filename 是 dir 目录相对路径下的文件名


change_extension('./dir', ext_from='.txt', ext_to='.json')
```

> 若不切换当前工作目录到目标目录下，则新名字（地址）需要拼接完整绝对路径

```python
import os
import os.path

def change_extension(target_dir: str, ext_from: str, ext_to: str):

    file_list = os.listdir(target_dir)

    for filename in file_list:
        filepath = os.path.join(target_dir, filename)
        portion = os.path.splitext(filepath)

        if portion[1] == ext_from:
            newname = portion[0] + ext_to
            os.rename(filepath, newname)
            # filepath 绝对路径下的文件名全名


change_extension('./dir', ext_from='.txt', ext_to='.json')
```

<br/>

## 增加

### mkdir()

在作为参数的指定路径下创建目录

```python
os.mkdir(指定路径)
```

```python
import os

# 当前目录下创建 dir 目录
os.mkdir('dir')

os.mkdir('/father/son/dir')
```

文件已经存在时无法重复创建

> 可利用 `os.path` 模块中的 [os.path.exists()](https://blaxberry.github.io/vuepress-studynotes/notes/back/Python/Modules/FilesDirectories/os.path.html#exists) 先判断是否存在后再创建

> 如下：当前目录下若不存在 dir 目录则创建

```python
import os

has_dir = os.path.exists('./dir')

if not has_dir:
    os.mkdir('./dir')
```

<br/>

## 删除

::: danger 文件目录的删除操作

危险操作，一定要注意注意再注意

:::

---

### rmdir()

删除作为参数的指定路径中的**空目录**

```python
os.rmdir('目录路径')
```

```python
import os

# 当前目录下删除 dir 目录
os.rmdir('dir')('dir')

os.rmdir('/father/son/dir')
```

若目录不为空则报错抛出 OSError 异常

```python
# OSError: Directory not empty
```

> 可利用 `os.path` 模块中的 [os.path.exists()](https://blaxberry.github.io/vuepress-studynotes/notes/back/Python/Modules/FilesDirectories/os.path.html#exists) 先判断目录是否存在，再利用 [listdir()](https://blaxberry.github.io/vuepress-studynotes/notes/back/Python/Modules/FilesDirectories/os.html#listdir) 判断目录下是否为空后，若都满足后再删除

> 如下：当前目录下若存在 dir 目录且目录下没有内容则删除

```python
import os

has_dir = os.path.exists('./dir')
has_content_list = os.listdir('./dir')

if has_dir:
    if not has_content_list:
        os.rmdir('./dir')
```

> 升级版：清空当前目录下 dir 目录中内容文件并将该目录删除

```python
import os

has_dir = os.path.exists('./dir')
has_content_list = os.listdir('./dir')

if has_dir:
    if not has_content_list:
        os.rmdir('./dir')
    else:
        for filename in has_content_list:
            filepath = os.path.join('./dir', filename)
            os.remove(filepath)
        os.rmdir('./dir')
```

---

### remove()

删除作为参数的指定路径中的文件

```python
os.remove(文件路径)
```

```python
import os

os.remove('./02.json')
```

若文件不存在则报错抛出 FileNotFoundError 异常

> 可利用 `os.path` 模块中的 [os.path.exists()](./os.path.md#exists) 先判断文件是否存在后再删除

```python
import os

has_file = os.path.exists('./02.py')

if has_file:
    os.remove('./02.py')
```

> 如下：删除当前目录下 dir 目录中的所有文件与该目录

```python
import os

has_content_list = os.listdir('./dir')

if not has_content_list:
    os.rmdir('./dir')
else:
    for filename in has_content_list:
        filepath = os.path.join('./dir', filename)
        os.remove(filepath)
    os.rmdir('./dir')
```

```text
|- dir
	  |- xx.py
	  |- xx.py
|- current.py
```
