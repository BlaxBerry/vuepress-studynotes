# os.path 模块

![img](https://www.python.jp/pages/python_logo2.png)

[[toc]]

## 简介

`path` 模块包含于 `os` 模块，用于路径相关的操作

```python
import os
import os.path
```

---

### 绝对路径

从顶级盘符开始的完整路径

```bash
/Users/xxx/StudyPractice/Python/01.py
```

---

### 相对路径

相对于当前文件的路径

```bash
./01.py  # 同级文件
01.py  # 同级文件
dir/01/py  # 同级目录下的文件

../  # 当前路径的上级路径
../../  # 当前路径的上级的上级
../dir/02.py  # 非同级目录下文件
```

---

### \_\_file\_\_

内置属性

可获取当前文件所在的完整路径

```python
print(__file__)
# /Users/xxx/StudyNote/Python/01.py
```

<br/>

## 获取

### dirname()

获取作为参数的**文件所在目录的绝对路径**

```python
os.path.dirname(指定文件所在路径)

# 当前文件所在目录的绝对路径
os.path.dirname(__file__)
```

```python
import os.path

# 参数为 __file__（当前文件绝对路径）
print(os.path.dirname(__file__))  # /Users/xxx/StudyNote/Python
print(__file__)  # /Users/xxx/StudyNote/Python/01.py

# 参数为指定绝对路径
print(os.path.abspath("/father/son/01.py"))
# /father/son/

# 参数为指定相对路径
# 返回该路径中文件所在目录的位置
print(os.path.dirname("./01.py"))  # .
print(os.path.dirname("../01.py"))  # ..
print(os.path.dirname("../dir/01.py"))  # ../dir
```

::: tip

**[os.getcwd()](./os.md#getcwd)**：获取当前所在工作目录的绝对路径
**os.path.dirname**：获取**参数**所在目录的绝对路径

:::

```python
import os

print(os.getcwd())
# 等同
print(os.path.dirname(__file__))
```

---

### abspath()

获取作为参数的**文件的绝对路径**

```python
os.path.abspath(指定文件所在路径)
os.path.abspath(__file__)
```

```python
import os.path

# 参数为 __file__（当前文件绝对路径）
print(os.path.abspath(__file__))  # /Users/xxx/StudyNote/Python/01.py
print(__file__)  # xxx/StudyNote/Python/01.py

# 参数为指定绝对路径
print(os.path.abspath("/father/son/01.py"))
# /father/son/01.py

# 参数指定相对路径
# 返回【相对于当前文件的相对路径】与【当前文件的绝对路径】的结合
print(os.path.abspath("./01.py"))
# /Users/xxx/StudyNote/Python/01.py
print(os.path.abspath("../01.py"))
# /Users/xxx/StudyNote/01.py
print(os.path.abspath("../dir/01.py"))
# /Users/xxx/StudyNote/dir/01.py
```

```python
|- xxx
	|- StudyNote
		|- Python
			|- 01.py
```

---

### basename()

获取路径中的文件完整名

```python
文件名.后缀名 = os.path.basename(指定路径)
```

```python
import os.path

print(os.path.basename("/StudyPractice/Python/02.py"))  # 02.py
print(os.path.basename(__file__))  # 02.py
```

> 如下：获取指定路径中的文件名（不含后缀名）

```python
import os.path

def get_filename(filepath: str):

    file_fullname = os.path.basename(filepath)
    return file_fullname[:file_fullname.rfind('.')]


print(get_filename('/father/son/01.jpg'))  # 01
```

<br/>

## 切割合并

不同系统中的路径分隔符不同

当前系统使用的路径分隔符可通过 `os` 模块中 [os.sep](https://blaxberry.github.io/vuepress-studynotes/notes/back/Python/Modules/FilesDirectories/os.html#sep) 获取

::: tip 路径分隔符

windows 系统： `\` 或 `\\`
mac、linux 系统： `/`

:::

---

### split()

将作为参数的路径**以元组形式分割，返回 `(其所在目录, 完整文件名)`**

```python
('参数中文件的所在目录', '文件名.后缀') = os.path.split(文件路径)
```

```python
import os.path

# 参数为 __file__（当前文件绝对路径）
print(os.path.split(__file__))
# ('/Users/xxx/StudyNote/Python', '01.py')

# 参数为指定绝对路径
print(os.path.split('/father/son/01.py'))
# ('/father/son', '01.py')

# 参数为指定相对路径
print(os.path.split('./01.py'))
# ('.', '01.py')
print(os.path.split('../01.py'))
# ('..', '01.py')
print(os.path.split('../dir/01.py'))
# ('../dir', '01.py')
```

> 如下：获取指定路径中的文件名（不含后缀名）

```python
import os.path

def get_filename(filepath: str):

    # 推荐方法：os.path.basename()
    # file_fullname = os.path.basename(filepath)
    # return file_fullname[:file_fullname.rfind('.')]

    # 方法二：字符串查找 + 切片
    # file_fullname = filepath[filepath.rfind(os.sep)+1:]
    # return file_fullname[:file_fullname.rfind('.')]

    # 方法三：split 分割路径 + 切片
    ls = os.path.split(filepath)
    return ls[1][:ls[1].rfind('.')]


print(get_filename('/father/son/01.jpg'))
```

---

### splitext()

将作为参数的路径**以元组形式分割，返回 `([其所在目录+]文件名, 文件名后缀名)`**

```python
('参数中文件的所在目录与文件名', '.后缀') = os.path.split(文件路径)
('文件名', '.后缀') = os.path.split(文件名)
```

```python
import os.path

# 参数为包含路径的文件名
print(os.path.splitext(__file__))
# ('/Users/xxx/StudyNote/Python/01', '.py')

# 参数为文件名
portion_list = os.path.splitext('file_name.txt')
print(portion_list)  # ('file_name', '.txt')
print(portion_list[0])  # file_name
print(portion_list[1])  # .txt
```

> 如下：判断文件类型

```python
import os.path

def get_filename(filepath: str):

    ext = os.path.splitext(filepath)[1]
    if ext in ['.jpg', '.png', '.gif']:
        return '图像'
    elif ext in ['.mp3']:
        return '音频'
    elif ext in ['.mp4', '.awa']:
        return '视频'
    elif ext in ['.txt', '.doc', '.md']:
        return '文档'
    else:
        return '未知'


print(get_filename('/father/son/01.doc'))
print(get_filename('.01.doc'))
print(get_filename('./01.doc'))
print(get_filename('../01.doc'))
print(get_filename(__file__))
```

---

### join()

用于拼接路径

```python
'路径a/路径b/路径c' = os.path.join(路径a, 路径b, 路径c)
```

```python
import os.path

print(os.path.join('a', 'b', 'file.txt'))
# a/b/file.txt
```

<br/>

## 判断

### exists()

判断作为参数的指定路径中目录或文件是否存在

```python
布尔值 = os.path.exists(路径)
```

```python
import os.path

# 判断当前目录下是否存在 dir 目录
has_dir = os.path.exists('./dir')
print(has_dir)

# # 判断当前目录下是否存在 01.py 文件
has_file = os.path.exists('./01.py')
print(has_file)
```

---

### isabs()

判断是否是绝对路径

```python
布尔值 = os.path.isabs('路径')
```

```python
import os.path

print(os.path.isabs(r'/Users/xxx/StudyPractice/Python/01.py'))
# True
print(os.path.isabs('.01.py'))
# False
```

---

### isdir()

判断是否是目录

```python
布尔值 = os.path.isdir(路径)
```

```python
import os.path

print(os.path.isdir('01.py'))
```

---

### isfile()

判断是否是文件

```python
布尔值 = os.path.isfile(路径)
```

```python
import os.path

print(os.path.isfile('01.py'))
```

<br/>

## 大小

### getsize()

获取参数文件的大小（字节个数）

```py
os.path.getsize(文件路径)
```

```python
import os.path

print(os.path.getsize(__file__))  # 49
```
