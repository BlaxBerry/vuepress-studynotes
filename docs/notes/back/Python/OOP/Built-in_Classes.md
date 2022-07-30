# 常用内置类

![img](https://www.python.jp/pages/python_logo2.png)

[[toc]]

## 筛选

### filter()

利用 filter 类创建实例对象

```python
filter实例对象 = filter(lambda 元素: 返回值为布尔值的表达式判断, 一组数据)
```

```python
ls = [1, 2, 3, 4, 5]

# 获取偶数的元素
filter_obj = filter(lambda x: x % 2 == 0, ls)

print(filter_obj)  # <filter object at 0x103281fa0>

for item in filter_obj:
    print(item, end=' ')

# 2 4
```

> 如下：筛选字典元素列表中某一属性符合的元素

```python
ls = [
    {'name': 'Andy', 'age': 28},
    {'name': 'Jack', 'age': 17},
    {'name': 'Tom', 'age': 30}
]

filter_obj = filter(lambda x: x['age'] > 20, ls)

for item in filter_obj:
    print(item)

# {'name': 'Andy', 'age': 28}
# {'name': 'Tom', 'age': 30}
```

<br/>

## 加工

### map()

利用 map 类创建实例对象

```python
map实例对象 = map(lambda item: 作为加工后结果的表达式, 一组对象)
```

```python
ls = ['aa', 'bb', 'cc']

map_obj = map(lambda item: item.upper(), ls)
print(map_obj)  # <map object at 0x101acdfa0>

for item in map_obj:
    print(item, end=" ")

# AA BB CC
```

> 如下：对字典元素列表中元素进行遍历加工

```python
ls = [
    {'name': 'Andy', 'age': 28},
    {'name': 'Jack', 'age': 17},
    {'name': 'Tom', 'age': 30}
]

map_obj = map(lambda item: {'id': ls.index(item), **item}, ls)

for item in map_obj:
    print(item)

# {'id': 0, 'name': 'Andy', 'age': 28}
# {'id': 1, 'name': 'Jack', 'age': 17}
# {'id': 2, 'name': 'Tom', 'age': 30}
```
