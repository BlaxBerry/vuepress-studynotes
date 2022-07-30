# 字典 dict 常用方法

![img](https://www.python.jp/pages/python_logo2.png)

[[toc]]

## 类型转换

### dict()

```python
print(dict([('x', 5), ('y', -5)]))
# {'x': 5, 'y': -5}
```

<br/>

## 获取

### get()

返回值为 key 键对应的 value 值

若 key 键不存在则返回 `None`

```python
value = 字典.get(key)

# 设置 key 键不存在时的默认值
value = 字典.get(key, 默认值)
```

```python
d = {'name': 'Andy', 'age': 28, 'area': 'USA'}

print(d.get('name'))  # Andy
print(d.get('xxxxxx'))  # None

print(d.get('skills', ['JS', 'Python']))  # ['JS', 'Python']
```

::: tip dict.get(key) 与 dict[key]

不同在于 key 键不存在时：

`dict.get()` 不报错返回 `None`，且可设置默认值

`dict[key]` 报错抛出 KeyError 异常

```python
d = {'name': 'Andy', 'age': 28, 'area': 'USA'}

print(d.get('xxxxxx'))  # None
print(d['xxxxxx'])  # 报错 KeyError: 'xxxxxx'
```

:::

---

### values()

返回一组由所有 value 值组成的序列

```python
字典.values()
```

```python
dic = {'name': 'Andy', 'age': 28}

print(dic.values())  # dict_values(['Andy', 28])
print(type(dic.values()))  # <class 'dict_values'>

print(list(dic.values()))  # ['Andy', 28]
print(type(list(dic.values())))  # <class 'list'>
```

> 如下：返回的序列可直接被 for...in... 遍历

```python
dic = {'name': 'Andy', 'age': 28}

for value in dic.values():
    print(value)

# Andy
# 28
```

---

### keys()

返回一组由所有 key 键组成的序列

```python
字典.keys()
```

```python
dic = {'name': 'Andy', 'age': 28}

print(dic.keys())  # dict_keys(['name', 'age'])
print(type(dic.keys()))  # <class 'dict_keys'>

print(list(dic.keys()))  # ['name', 'age']
print(type(list(dic.keys())))  # <class 'list'>
```

> 如下：返回的序列可直接被 for...in... 遍历

```python
dic = {'name': 'Andy', 'age': 28}

for key in dic.keys():
    print(key)

# name
# age
```

---

### items()

返回一组以元组形式组成的键值对的序列

```python
字典.items()
```

```python
dic = {'name': 'Andy', 'age': 28}

print(dic.items())  # dict_items([('name', 'Andy'), ('age', 28)])
print(type(dic.items()))  # <class 'dict_items'>

print(list(dic.items()))  # [[('name', 'Andy'), ('age', 28)]
print(type(list(dic.items())))  # <class 'list'>
```

> 如下：返回的序列可直接被 for...in... 遍历

```python
dic = {'name': 'Andy', 'age': 28}

for tup in dic.items():
    print(tup)

# ('name', 'Andy')
#('age', 28)
```

> 如下：利用元组拆包分别获取键值（常用）

```python
dic = {'name': 'Andy', 'age': 28}

for k, v in dic.items():
    print(k, v)

# name Andy
# age 28
```

<br/>

## 删除

### pop()

删除指定 key 键与其对应 value 值

返回值是删除的 key 键对应的 value 值

会修改原本字典

```python
字典.pop('键名')
```

```python
d = {'name': 'Andy', 'age': 28}

print(d.pop('name'))  # Andy

print(d)  # {'age': 28}
```

---

### popitem()

删除倒数最后一组键值对

**返回值为一个元组**，被删除键值对的键与值分别为其元素

若没有可删除的键值对会报错，抛出一个 KeyError 异常

```python
(key, value) = dict.popitem()
```

```python
d = {'name': 'Andy', 'age': 28}

print(d.popitem())  # ('age', 28)
print(d)  # {'age': 28}

print(d.popitem())  # ('name', 'Andy')
print(d)  # {}

print(d.popitem())  # 报错 KeyError: 'popitem(): dictionary is empty'
```

---

### clear()

清空字典内容

无返回值

```python
字典.clear()
```

```python
d = {'name': 'Andy', 'age': 28}

print(d.clear())  # None

print(d)  # {}
```

<br/>

## 添加 / 修改

### update()

修改一组或多组指定 key 键对应的键值对（合并）

若修改的 key 键不存在于字典中则视为追加

无返回值，会修改原本字典

```python
字典.update({key: value[, key: value]})
```

```python
d = {}

print(d.update({'name': 'Andy'}))  # None
print(d)  # {'name': 'Andy'}

print(d.update({'name': 'Jack'}))  # None
print(d)  # {'name': 'Jack'}

print(d.update({'age': 28}))  # None
print(d)  # {'name': 'Jack', 'age': 28}
```

<br/>

## 常见实例

### 列表添加属性非重复的字典元素

```python
ls = [
    # {'name': 'Andy', 'age': 28},
    # {'name': 'Tom', 'age': 16}
]

while True:
    name_input = input('请输入姓名：')

    for item in ls:
        if name_input == item.get('name'):
            print("姓名已存在")
            break
    else:
        age_input = input('请输入年龄：')

        ls.append({
            'name': name_input,
            'age': age_input
        })
        print('输入成功')
        break

print(ls)
```
