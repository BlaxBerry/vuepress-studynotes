# 列表 list 常用方法

![img](https://www.python.jp/pages/python_logo2.png)

[[toc]]

## 类型转换

### list()

```python
列表 = list(数据)
```

```python
l1 = list((1, 2, 3))
print(type(l1))  # <class 'list'>
print(l1)  # [1, 2, 3, 4]

l2 = list('123')
print(type(l2))  # <class 'list'>
print(l2)  # ['1', '2', '3']
```

<br/>

## 增加

### append()

在列表**末尾追加一个**元素

无返回值，会修改原来的列表

```python
列表.append(元素)
```

> 如下：

```python
example = [1, 2, 3]
example.append(4)

print(example)  # [1, 2, 3, 4]
```

---

### extend()

在列表**末尾追加一组**元素

无返回值，会修改原来的列表

```python
列表.append(一组数据序列)
```

追加的数据序列可为列表、元组、集合、字典

若为字典则仅将 key 键 依次添加为元素

> 如下：

```python
example = [1, 2, 3]

# 列表的场合
example.extend([4, 5, 6])
print(example)  # [1, 2, 3, 4, 5, 6]

# 元组的场合
example.extend((4, 5, 6))
print(example)  # [1, 2, 3, 4, 5, 6]

# 集合的场合
example.extend({4, 5, 6})
print(example)  # [1, 2, 3, 4, 5, 6]

# 字典的场合
example.extend({'name': 'Andy', 'age': 28})
print(example)  # [1, 2, 3, 'name', 'age']
```

---

### 拼接

```python
新列表 = 列表A + 列表B
```

```python
print([1, 2] + [3, 4])  # [1, 2, 3, 4]
```

---

### insert()

列表中指定序号的位置上将指定对象**插入**

无返回值，会修改原来的列表

```python
列表.insert(序号, 新元素)
```

> 如下：

```python
example = ['A', 'B', 'C']

print(example.insert(1, '999'))  # None

print(example)  # ['A', '999', 'B', 'C']
```

<br/>

## 删除

### pop()

无参数时默认从列表中**删除最后一个**元素（默认参数为 `-1`）

有参数时从列表中删除**指定序号**的元素

若指定序号不存在则报错返回一个 IndexError 异常

会改变列表，返回值是删除的元素

```python
# 删除最后一个元素
列表.pop()

# 删除指定序号元素
列表.pop(序号)

删除的元素 = 列表.pop()
```

> 如下：

```python
example_list = [1, 2, 3, 4, 5]

print(example_list.pop())   # 5
print(example_list.pop(2))   # 3
print(example_list.pop(999))   # 报错 IndexError: pop index out of range

print(example_list)  # [1, 2, 4]
```

---

### remove()

从列表中删第一个**指定元素**

若删除元素不存在则报错返回一个 ValueError 异常

无返回值，会修改原列表

```python
列表.remove(元素值)
```

> 如下：

```python
example_list = ['1', '2', '3', '4', '5']

print(example_list.remove('2'))  # None
print(example_list.remove('3'))  # None
print(example_list.remove('嗨嗨嗨'))  # ValueError: list.remove(x): x not in list

print(example_list)  # [1, 4, 5]
```

> 如下：先判断元素是否存在，若存在则删除

```python
example_list = ['1', '2', '3', '4', '2', '2']
target = '2'

# 仅删除第一个符合的元素
if target in example_list:
    example_list.remove(target)

print(example_list)  # ['1', '3', '4', '2', '2']


# 删除所有符合的元素
for item in example_list:
    if target in example_list:
        example_list.remove(target)

print(example_list)  # ['1', '3', '4']
```

---

### clear()

**清空列表**内所有元素

无返回值，会修改列表本身

```python
列表.clear()
```

```python
list = [1, 2, 3]

print(list.clear())  # None
print(list)  # []
```

::: tip clear() 与 del 关键字：

`clear()` 只是清空列表内容，列表数据还存在与内存

`del` 则是回收了引用列表内存地址的变量，列表数据还存在与内存

[详见 del](../Basic/1.Variable.md#del)

```python
l = [1, 2, 3]

l.clear()
print(l)  # []

del l
print(l)  # NameError: name 'l' is not defined
```

:::

<br/>

## 查找

### index()

查找元素在列表中第一次出现位置的**序号**

没有找到会报错，抛出一个 ValueError 异常

```python
序号 = 列表.index(元素)
```

> 如下：

```python
example = ['A', 'B', 'A', 'A']

print(example.index('A'))  # 0
print(example.index('xxxxxxx'))  # 报错 ValueError: 'xxxxxxx' is not in list
```

> 如下：删除替换指定位置的元素

```python
example_list = ['A', 'B', 'C', 'D']

index = example_list.index('B')
example_list[index] = '999'

print(example_list)  # ['A', '999', 'C', 'D']
```

---

### 成员运算符

[详见运算符 in、not in](../Basic/3.Operators.md#成员运算符)

```python
example_list = [1, 2, 3, 4]

print(3 in example_list)  # True
print(9999 in example_list)  # False
print(9999 not in example_list)  # True
```

<br/>

## 统计

### count

获取某元素在列表中的出现**次数**

不存在则出现次数为 0

```python
列表.count(元素)
```

> 如下：

```python
example_list = [3, 2, 2, 4, 5, 2]

print(example_list.count(2))  # 3
print(example_list.count(9999999))  # 0
```

<br/>

## 截取

### 切片

切片即截取列表（**左闭右开，顾头不顾尾**）

返回一个新列表

第三个参数是从开始序号向右截取的间隔步长，若为负数则从开始序号向左截取

```python
列表[开始序号:结束序号[:间隔步长]]

list[:]  # 浅拷贝（内存地址不同）

list[start:]  # start～结尾
list[start:end]  # start～end
list[:end]  # 开始～end
```

> 如下：

```python
l = ['A', 'B', 'C', 'D', 'E']

print(l[:])  # ['A', 'B', 'C', 'D', 'E'] 拷贝

print(l[:3])  # ['A', 'B', 'C']
print(l[0:3])  # ['A', 'B', 'C']
print(l[1:3])  # ['B', 'C']
print(l[1:-1])  # ['B', 'C', 'D'] 去头尾
print(l[1:])  # ['B', 'C', 'D', 'E'] 去头
print(l[:-1])  # ['A', 'B', 'C', 'D'] 去尾

print(l[-3:])  # ['C', 'D', 'E']
print(l[-3:7])  # ['C', 'D', 'E']

print(l[:-1:2])  # ['A', 'C']
print(l[1::2])  # ['B', 'D']
print(l[::2])  # ['A', 'C', 'E']

print(l[::-1])  # ['E', 'D', 'C', 'B', 'A'] 翻转
print(l[4::-1])  # ['E', 'D', 'C', 'B', 'A']
print(l[4:0:-1])  # ['E', 'D', 'C', 'B']
print(l[0:4:-1])  # [] 取不到范围
```

<br/>

## 排序

### sort()

列表元素升/降序排列

无返回值，会修改原列表

```python
列表.sort(key=None, reverse=False)
```

```python
# 升序排列（默认）
列表.sort()
# 降序排列
列表.sort(reverse=True)

# 指定对象元素中属性排序
列表.sort(key=函数)
def 函数(列表对象元素):
    return 列表对象元素['属性']

# lambda 简写 key 属性
列表.sort(key=lambda 列表元素: 列表元素['属性'])
```

> 如下：升降序排列

```python
example_list = [3, 4, 1,  3, 5, 2]

print(example_list.sort())  # None
print(example_list)  # [1, 2, 3, 4, 5]

print(example_list.sort(reverse=True))  # None
print(example_list)  # [5, 4, 3, 2, 1]
```

> 如下：按对象元素的 age 属性排序

```python
people = [
    {'name': 'Andy', 'age': 28},
    {'name': 'Tom', 'age': 16},
    {'name': 'Jack', 'age': 29}
]

# 方法一：key 值为一般函数
def sort_by_age(item):
    return item['age']

people.sort(key=sort_by_age)


# 方法二：lambda 匿名函数简写 key 属性
people.sort(key=lambda item: item['age'])


for item in people:
    print(item)
# {'name': 'Tom', 'age': 16}
# {'name': 'Andy', 'age': 28}
# {'name': 'Jack', 'age': 29}
```

---

### reverse()

反转列表

```python
列表.reverse()
```

> 如下：

```python
example_list = [3, 4, 1,  3, 5, 2]

example_list.reverse()
print(example_list)
# [2, 5, 3, 1, 4, 3]
```

<br/>

## 拷贝

### copy()

浅拷贝复制列表，返回的列表的内存中地址不同于原始列表（[详见深浅拷贝](../Basic/1.Variable.md#浅拷贝)）

类似于 **[切片的 \[:]](#切片)**

```python
列表 = 列表.copy()
```

> 如下：

```python
a = [1, 2, 3]

b = a.copy()
print(id(b) == id(a))  # False

c = a[:]
print(id(c )== id(a))  # False

d = a
print(id(d) == id(a))  # True
```

> 如下：
>
> `copy()` 是在内存中开辟一个新的空间存储相同值的数据
>
> 仅数据值相同，与原版列表的存放位置不同，互不影响

```python
a = [1, 2, 3]

c = a.copy()
c.append(4)

print(a)  # [1, 2, 3]
print(id(a) == id(c))  # False
```

<br/>

## 常见实例

### 删除所有相同元素

> 方法一：for 循环 + `in` 判断 + `remove()`

```python
example_list = ['1', '2', '2', '3', '4', '2', '2']

for item in example_list:
    if '2' in example_list:
        example_list.remove('2')

print(example_list)  # ['1', '3', '4']
```

> 方法二：for 循环 + 空列表 `append()`

```python
example_list = ['1', '2', '2', '3', '4', '2', '2']

final_list = []

for item in example_list:
    if item != '2':
        final_list.append(item)

example_list = final_list
print(example_list)  # ['1', '3', '4']
```

> 方法三：while 循环 + `remove()`

```python
example_list = ['1', '2', '2', '3', '4', '2', '2']

num = 0

while num < len(example_list):
    if example_list[num] == '2':
        example_list.remove('2')
    else:
        num += 1

print(example_list)  # ['1', '3', '4']
```

> 方法四：for 循环倒着遍历 + `remove()`

```python
example_list = ['1', '2', '2', '3', '4', '2', '2']

for item in example_list[::-1]:  #
    if item == '2':  #
        example_list.remove('2')

print(example_list)  # ['1', '3', '4']
```

> 方法五：for in `range(出现次数)` + `remove()`

```python
example_list = ['1', '2', '2', '3', '4', '2', '2']

for item in range(example_list.count('2')):  #
    example_list.remove('2')

print(example_list)  # ['1', '3', '4']
```

::: danger for 循环中通过 == 判断删除时漏删问题

`for...in...` 循环是借助**元素下标**，循环开始后下标就固定了
列表增删改方法会修改列表本身，借助下标遍历过程中同时删除会导致下标对应元素改变，首次被删除元素的后一位元素自动补位且该元素跳过被删除操作
所以若补位元素等同于被删除的前者，此时还通过 `==` 进行判断就会出现漏删问题

```python
example_list = ['1', '2', '2', '3', '4', '2', '2']

for item in example_list:
    if item == '2':   #
        example_list.remove('2')

print(example_list)  # ['1', '3', '4', '2', '2']
```

:::
