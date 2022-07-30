# Python 模块

![img](https://www.python.jp/pages/python_logo2.png)

[[toc]]

## 简介

每一个独立的 `.py` 文件就是一个模块

模块即可对外提供工具的工具包（全局变量、函数方法、类...）

文件名就是模块名，文件名使用小写字母和下划线

**自定义文件名不要与系统模块同名，否则作为模块导入时会覆盖系统模块**

---

### \_\_file\_\_

可通过模块的内置属性 `__file__` 获取模块完整路径

```python
import random

print(random.__file__)
# /Users/用户/.asdf/installs/python/3.9.8/lib/python3.9/random.py
```

------

### 测试模式

当文件被当作模块导入时，该文件中 **所有没有缩进的代码（能被直接执行的代码）** 都会被自动执行

> 如下：`b.py` 只要被作为模块导入就会自动执行打印

```python
|- a.py
|- b.py
```

```python
""" 文件 b.py """

print('嘻嘻嘻嘻....')
print('哈哈哈哈....')
```

```python
""" 文件 a.py """
import b

# 嘻嘻嘻嘻....
# 哈哈哈哈....
```

但这种自动执行有时是不被期望发生的

此时可在模块文件末尾通过 **内置属性 [  \_\_name__](#name)** 判断是否执行某些代码

>如下：其他模块导入 `b.py` 后，`b.py` 中的条件语句会被直接执行，此时会判断 `__name__` 是什么

```python
"""文件 b.py"""

if __name__ == '__main__':
    """下列代码在文件作为模块导入时不会自动执行"""
    print('xxxxx')
```

------

### \_\_name\_\_

::: tip 内置属性 __name__返回值：

- 在当前模块内直接访问 **自身的 `__name__`** ： **`__main__`**
- 访问 **导入的其他模块的 `__name__`** ：**该模块的文件名**

:::

```python
import b

print(__name__)  # __main__
print(b.__name__)  # b
```

多用于在模块文件末尾判断当前文件作为模块被导入时是否执行某些代码

```python
# 会被执行的代码
# 会被执行的代码


if __name__ == '__main__':
    """下列代码在文件作为模块导入时不会自动执行"""
    # 不会执行的代码
    # 不会执行的代码
```

<br/>

## 导入使用

::: tip 模块搜索顺序

导入模块后 Python 会先搜索当前目录，

若有则直接导入，若没有则继续向上搜索系统目录

:::

------

### import

使用 `import...` 导入模块中全部内容（全局变量、函数、类）

导入模块中的工具需通过 **`模块名.工具名`** 获取调用

```python
import 模块名
```

```python
模块名.变量
模块名.函数()
实例 = 模块名.类()
```

> 如下：导入并使用 `example_module_b.py` 和 `example_module_b.py` 文件中的变量、方法、类

```python
import example_module_b
import example_module_c

# 打印模块 b 定义的全局变量
print(example_module_b.num)

# 调用模块 b 定义的方法
example_module_b.func('hello')

# 使用模块 b 定义的类创建实例对象
andy = example_module_c.Person('andy')
andy.say()
```

```python
"""文件 example_module_b.py"""
num = 100


def func(params):
    print(params)
```

```python
"""文件 example_module_c.py"""
class Person:

    def __init__(self, name):
        self.name = name

    def say(self):
        print(f"I'm {self.name}")
```

------

### from import

使用 `from...import...` 导入模块中的部分指定内容

导入后的模块中全局变量、函数、类可直接使用

```python
from 模块名 import 工具名
```

> 如下：从 module_b 模块中导入并使用部分工具

```python
from module_b import num, func, Person

print(num)

func()

andy = Person('andy')
andy.say()
```

::: tip 知道即可

通过 `from ... import *` 可导入模块中的全部内容<br/>导入后模块中的工具可直接使用<br/>**开发中尽量不要用，因为出现同名工具时很难排查**

```python
import 模块名 import *
```

```python
from module_b import *

print(num)

func()

andy = Person('andy')
andy.say()
```

:::

------

### as 别名

`as` 可给导入的模块或工具指定自定义别名

别名使用大驼峰命名法（首字母大写、无下划线）

```python
# 全部导入
import 模块名 as 自定义别名

# 局部导入
from 模块名 import 工具 as 自定义名
```

> 如下：分别给模块 b 和从模块 c 导入的工具指定别名

```python
import module_b as ModuleB
from module_c import num as Module_num, func as module_func


print(ModuleB.num)  # 200
print(Module_num)  # 300

ModuleB.func()  # 模块 b
module_func()  # 模块 c
```

```python
"""文件 module_b.py"""

num = 200

def func():
    print('模块 b')
```

```python
"""文件 module_c.py"""

num = 300

def func():
    print('模块 c')
```

