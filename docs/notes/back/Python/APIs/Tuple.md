# 元组 tuple 常用方法

![img](https://www.python.jp/pages/python_logo2.png)

[[toc]]

## 类型转换

### tuple()

将其他数据序列转为元组

```python
元组 = tuple(数据)
```

```python
# 将列表转为元组
print(tuple([1, 2, 3, 4]))  # (1, 2, 3, 4)

# 将字符串转为元组
print(tuple('123'))  # (1, 2, 3)
```

<br/>

## 查找

### index()

查找元素在列表中第一次出现位置的**序号**

没有找到会报错，抛出一个 ValueError 异常

```python
索引号 = 元组.index(元素[, start, end])
```

```python
tup = (1, 2, 3, 2, 2)

print(tup.index(2))  # 1
print(tup.index(99999))  # 报错 ValueError: tuple.index(x): x not in tuple
```

---

### 成员运算符

[详见运算符 in、not in](../Basic/3.Operators.md#成员运算符)

```python
example_tuple = (1, 2, 3, 4)

print(3 in example_tuple)  # True
print(9999 in example_tuple)  # False
print(9999 not in example_tuple)  # True
```

<br/>

## 统计

### count()

获取某元素在元组中的出现**次数**

不存在则出现次数为 0

```python
次数 = 元组.count(元素)
```

```python
tup = (1, 2, 2, 3, 2)

print(tup.count(2))  # 3
print(tup.count(9999))  # 0
```

<br/>

## 截取

### 切片

切片即截取列表（**左闭右开，顾头不顾尾**）

返回一个新元组

第三个参数是从开始序号向右截取的间隔步长，若为负数则从开始序号向左截取

```python
元组[开始序号:结束序号[:间隔步长]]

list[:]  # 全部
list[start:]  # start～结尾
list[start:end]  # start～end
list[:end]  # 开始～end
```

```python
t = ('A', 'B', 'C', 'D', 'E')

print(t[:])  # ('A', 'B', 'C', 'D', 'E') 拷贝

print(t[:3])  # ('A', 'B', 'C')
print(t[0:3])  # ('A', 'B', 'C')
print(t[1:3])  # ('B', 'C')
print(t[1:-1])  # ('B', 'C', 'D') 去头尾
print(t[1:])  # ('B', 'C', 'D', 'E') 去头
print(t[:-1])  # ('A', 'B', 'C', 'D') 去尾

print(t[-3:])  # ('C', 'D', 'E')
print(t[-3:7])  # ('C', 'D', 'E')

print(t[:-1:2])  # ('A', 'C')
print(t[1::2])  # ('B', 'D')
print(t[::2])  # ('A', 'C', 'E')

print(t[::-1])  # ('E', 'D', 'C', 'B', 'A') 翻转
print(t[4::-1])  # ('E', 'D', 'C', 'B', 'A')
print(t[4:0:-1])  # ('E', 'D', 'C', 'B')
print(t[0:4:-1])  # () 取不到范围
```
