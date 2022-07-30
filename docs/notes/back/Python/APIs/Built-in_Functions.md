# Python 常用内置方法

![img](https://www.python.jp/pages/python_logo2.png)

[[toc]]

## 查看

### dir()

查看对象内所有属性和方法

```python
demo_list = []

print(dir(demo_list))
"""
['__add__', '__class__', '__class_getitem__', '__contains__', '__delattr__', '__delitem__', '__dir__', '__doc__', '__eq__', '__format__', '__ge__', '__getattribute__', '__getitem__', '__gt__', '__hash__', '__iadd__', '__imul__', '__init__', '__init_subclass__', '__iter__', '__le__', '__len__', '__lt__', '__mul__', '__ne__', '__new__', '__reduce__', '__reduce_ex__', '__repr__', '__reversed__', '__rmul__', '__setattr__', '__setitem__', '__sizeof__', '__str__', '__subclasshook__', 'append', 'clear', 'copy', 'count', 'extend', 'index', 'insert', 'pop', 'remove', 'reverse', 'sort']
"""


def demo_func():
    pass


print(dir(demo_func))
"""
['__annotations__', '__call__', '__class__', '__closure__', '__code__', '__defaults__', '__delattr__', '__dict__', '__dir__', '__doc__', '__eq__', '__format__', '__ge__', '__get__', '__getattribute__', '__globals__', '__gt__', '__hash__', '__init__', '__init_subclass__', '__kwdefaults__', '__le__', '__lt__', '__module__', '__name__', '__ne__', '__new__', '__qualname__', '__reduce__', '__reduce_ex__', '__repr__', '__setattr__', '__sizeof__', '__str__', '__subclasshook__']
"""
```

---

### id()

查看数据在内存中所在的地址

详见[数据引用与内存地址](../Basic/1.Variable.html#数据引用)

<br/>

## 输入输出

### print()

打印参数到控制台

多个参数时用逗号隔开，逗号不会被打印出来

```python
print(参数)
print(参数, 参数)
print(参数, end='/n')
```

```python
print('hello, ', 'I am ', 28, 'years old')
# 'hello,  I am  28 years old'
```

默认最后一个参数 `end='/n'`，即默认输出完后另起一行

```python
for item in range(1, 4):
    print(item)
# 1
# 2
# 3


for item in range(1, 4):
    print(item, end=' ')
# 1 2 3
```

---

### input()

获取控制台输入内容

获取的是字符串类型，要按需转换类型

```python
amount = int(input('请输入数量: '))
price = float(input('请输入单价: '))

print(f'共 {amount} 个，总计: {price * amountl}')
```

是个**阻塞型函数**，若不输入内容则后续代码不会执行

```python
a = input('请输入：')

print('哈哈哈')
```

<br/>

## 类型

### type()

判断数据类型

```python
类 = type(数据)
```

详见[数据类型](../Basic/2.ValueType.md#类型判断)

---

### isinstance()

判断是否是某个类的子类

```python
布尔值 = isinstance(数据, 类型)

布尔值 = isinstance(子类, 父类)
```

详见[数据类型](../Basic/2.ValueType.md#类型判断)

<br/>

## 长度

### len()

获取有长度的对象的长度

```python
print(len('hello'))  # 5
print(len([1, 2, 3]))  # 3
print(len((1, 2, 3)))  # 3
print(len({'name': 'Andy', 'age': 28}))  # 2
print(len({1, 2, 3}))  # 3
```

<br/>

## 计算

### max()

获取一组数据中的最大值

```python
最大值 = max(一组数)

# 按匿名函数返回值表达式值获取最大值
最大值 = max(一组数据, key=lambda 元素: 元素表达式)
```

```python
# 列表
print(max([1, 2, 3]))  # 3
# 元组
print(max((1, 2, 3)))  # 3
# 集合
print(max({1, 2, 3}))  # 3
```

> 如下：获取字典元素列表中某一属性的最值

```python
ls = [
    {'name': 'Andy', 'age': 28},
    {'name': 'Jack', 'age': 17},
    {'name': 'Tom', 'age': 30}
]

# age 最大的元素
target = max(ls, key=lambda x: x['age'])
print(target)  # {'name': 'Tom', 'age': 30}
```

---

### min()

获取一组数据中的最小值

```python
最小值 = min(一组数据)

# 按匿名函数返回值表达式值获取最小值
最小值 = min(一组数据, key=lambda 元素: 元素表达式)
```

```python
# 列表
print(min([1, 2, 3]))  # 1
# 元组
print(min((1, 2, 3)))  # 1
# 集合
print(min({1, 2, 3}))  # 1
```

> 如下：获取字典元素列表中某一属性的最值

```python
ls = [
    {'name': 'Andy', 'age': 28},
    {'name': 'Jack', 'age': 17},
    {'name': 'Tom', 'age': 30}
]

# age 最小的元素
target = min(ls, key=lambda x: x['age'])
print(target)  # {'name': 'Jack', 'age': 17}
```

---

### sum()

一组数据求和

```python
# 列表
print(sum([1, 2, 3]))  # 6
# 元组
print(sum((1, 2, 3)))  # 6
# 集合
print(sum({1, 2, 3}))  # 6
```

---

### abs()

绝对值

```python
print(abs(0))  # 0
print(abs(1))  # 1
print(abs(-1))  # 1
```

<br/>

## 排序

### sorted()

排序一组可迭代序列

```python
# 默认升序
列表 = sorted(一组数据, reverse=False)
# 降序
列表 = sorted(一组数据, reverse=True)

# 按匿名函数返回值表达式值进行排列
列表 = sorted(一组数据, key=lambda 元素: 元素表达式)
```

```python
# 元组
t = (2, 3, 1, 4, 5)
print(sorted(t))  # [1, 2, 3, 4, 5]
print(sorted(t, reverse=True))  # [5, 4, 3, 2, 1]

# 集合
st = {2, 3, 1, 4, 5}
print(sorted(st))  # [1, 2, 3, 4, 5]
print(sorted(st, reverse=True))  # [5, 4, 3, 2, 1]
```

> 如下：按照字典元素列表中某一属性升降序排列

```python
ls = [
    {'name': 'Andy', 'age': 28},
    {'name': 'Jack', 'age': 17},
    {'name': 'Tom', 'age': 30}
]

# 按 age 升序排列
l_up = sorted(ls, key=lambda x: x['age'])

for item in l_up:
    print(item)

# {'name': 'Jack', 'age': 17}
# {'name': 'Andy', 'age': 28}
# {'name': 'Tom', 'age': 30}


# 按 age 降序排列
l_down = sorted(ls, key=lambda x: x['age'], reverse=True)

for item in l_down:
    print(item)

# {'name': 'Tom', 'age': 30}
# {'name': 'Andy', 'age': 28}
# {'name': 'Jack', 'age': 17}
```

<br/>

## 转换

### chr()

获取 ASCII 码对应的字符

```python
print(chr(97))  # a
print(chr(65))  # A
```

---

### ord()

获取字符对应的 ASCII 码

```python
print(ord('A'))  # 65
print(ord('a'))  # 97
```
