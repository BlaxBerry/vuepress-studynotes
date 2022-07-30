# Python package 包

![img](https://www.python.jp/pages/python_logo2.png)

[[toc]]

## 简介

包（Package）是个包含多个 [模块](./module.md) 文件的特殊目录

**包中必须包含有一个 `__init__.py` 文件**

```js
|-包
  |- __init__.py
  |- 模块文件.py
  |- 模块文件.py
	|- 子包
	  |- __init__.py
    |- 模块文件.py
    |- 模块文件.py
```

导入包名会一次性导入包中所有模块

```python
import 包名
```

```python
包名.模块名.方法()
包名.模块名.全局变量
```

---

### \_\_init\_\_.py

`__init__.py` 文件用于声明要对外提供的模块文件

在包被导入时该文件会被自动执行

在该文件内通过导入包目录下的模块，使得使用该包的文件一次性导入包中所有模块

```python
from .目录.模块名 import *
from .模块名 import *
```

> 如下：

```python
|- demo_package
  |- a
     |- __init__.py
	   |- module_a.py
     |- module_b.py
  |- b
  	 |- __init__.py
  	 |- module_a.py
     |- module_b.py
```

```python
"""目录 a 下的__init__.py 文件"""
from .module_a import *
from .module_b import *
from .b.module_a import *
from .b.module_b import *
```

<br/>

## 自定义包

### 实例

包名和模块名都使用小写字母加下划线

> 如下：创建并使用自定义包 my_package

```python
|- my_package
	|- __init__.py
	|- create_person.py
  |- say_hello.py
```

```python
"""__init__.py 文件"""
from .create_person import *
from .say_hello import *
```

```python
"""create_person.py 模块文件"""


def create_person(name, age):

    return Person(name, age)


class Person:

    def __init__(self, name, age):
        self.name = name
        self.age = age

    def say(self):
        print(f"{self.name} is {self.age} years old.")
```

```python
"""say_hello.py 模块文件"""


def say_hello():

    print('hello～')
```

```bash
"""导入并使用 my_package 包的文件"""
import my_package

andy = my_package.create_person('Andy', 28)
andy.say()
# Andy is 28

my_package.say_hello()
# hello～
```

---

### 压缩包

发布包的步骤：

**1. 创建 `setup.py` 文件**

```python
from distutils.core import setup

setup(
    name="my_package",
    version="1.0.0",
    description="我自己做着玩的",
    long_description="包含一个问候say_hello函数和创建人函数",
    author="独孤求败",
    author_email="emmm.xxx.com",
    url="www.xxx.com",
    py_modules=[
        "say_hello",
        "create_person",
        ".son_package.son_say_hello"
    ]
)
```

> 包目录如下：

```bash
|- my_package
	|- son_package
		|- __init__.py
		|- son_say_hello.py
	|- say_hello.py
	|- create_person.py
	|- __init__.py
	|- setup.py
```

**2. 构建模块**

将写的包创建到 `build/lib` 目录中

```bash
python3 setup.py build
```

> 生成的 build 目录如下：

```bash
|- build
	|- lib
		|- son_package
			|- son_say_hello.py
		|- say_hello.py
		|- create_person.py
```

**3. 生成压缩包**

将上一步构建的内容生成压缩包并放入 `dist` 目录下

```python
python3 setup.py sdist
```

> 生成的 dist 目录如下：

```bash
|- dist
	|- my_package-1.0.0.tar.gz
```
