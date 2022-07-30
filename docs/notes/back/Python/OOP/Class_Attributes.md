# Python 类中属性

![img](https://www.python.jp/pages/python_logo2.png)

[[toc]]

## 实例属性

一般通过 [类内置方法](./Class_Methods.md#内置方法) 的 `__init__()` 初始化方法函数中定义

```python
class 类:

  def __init__(self, 参数):
      self.属性 = 初始值
      self.属性 = 参数


实例对象 = 类(参数)
```

::: danger 外部追加（知道即可，不要用）

可在类外部动态给类实例对象追加属性并赋值，若类中存有同名类属性则为修改属性值<br/>但更推荐使用构造函数 **[\_\_init\_\_()](./Class_methods.md#init)** 对实例对象统一初始化

- 外部追加的方法需要给所有实例对象逐一添加属性，太麻烦
- 外部追加的方法存在数据安全隐患，类内部无法确定实例对象上是否存在该属性

```python
class Person:
    def say_name(self):
        print(self.name)

# 实例对象 andy 上追加了 name 属性，而实例对象 tom 没有
# 所以调用方法打印该属性时直接报错不存在

andy = Person()
andy.name = "Andy"
andy.say_name()  # Andy

tom = Person()
tom.say_name()  # 报错 AttributeError: 'Person' object has no attribute 'name'
```

:::

---

### 获取

实例对象属性在类外部可从实例对象上直接获取

在类内部可通过 `self` 获取

```python
class Person:

    def __init__(self, name, age):
        self.kind = 'humanbeing'
        self.name = name
        self.age = age

    def say_name(self):
        print(self.kind, self.name, self.age)


andy = Person('Andy', 28)
print(andy.kind, andy.name, andy.age)  # humanbeing Andy 28
andy.say_name()  # humanbeing Andy 28

tom = Person('Tom', 16)
tom.say_name()  # humanbeing Tom 16
```

---

### 修改

实例对象属性可通过 `self` 获取后重新赋值

```python
class Person:

    def __init__(self, name, age):
        self.name = name
        self.age = age

    def say_name(self):
        print(self.name, self.age)

    def change_name(self, **kwargs):
        """重新赋值"""
        self.age = kwargs['age']


andy = Person('Andy', 28)
andy.say_name()  # Andy 28

andy.change_name(**{'age': 30})
andy.say_name()  # Andy 30

andy.age = 40
andy.say_name()  # Andy 40
```

---

### 属性查找机制

属性查找机制从下到上

::: tip 属性查找机制

即查找顺序是优先从实例对象自身的内存空间中获取实例属性，若实例对象自身没有再从类中获取同名的[类属性](#类属性)

:::

```python
class Person:
    a = 10

    def __init__(self, params=a):
        self.a = params


# 自身若存在则优先获取自身的
andy = Person(20)
print(andy.a)  # 20

# 若自身不存在则从作为模版的类上获取
tom = Person()
print(tom.a)  # 10

# 若自身和类中都没有则报错
print(andy.xxxxx)
# 报错 AttributeError: 'Person' object has no attribute 'xxxxx'
```

<br/>

## 类属性

仅用来记录与作为模版的当前类相关的数据

在类内部直接定义即可

```python
class 类名:
    类属性 = 值
```

---

### 获取

类属性无论类的内外都可通过类名从类上直接获取

在类方法中可通过 `cls` 获取

```python
class Person:

    xxx = 'xxx'

    def func(self):
        print(Person.xxx)

    @classmethod
    def func(cls):
        print(cls.xxx)


print(Person.xxx)  # xxx

andy = Person()
andy.func()  # xxx

Person.func()  # xxx
andy.fun()  # xxx
```

::: danger 通过实例获取类属性（尽量不要用）

根据[属性向上查找机制](#属性查找机制)，类属性可利用 `self` 通过实例对象获取

> 若实例内存空间上有该同名属性则优先获取实例自身的
> 若没有则从类上获取同名类属性

但是不建议使用，**建议通过 `类名.类属性` 的方式获取类属性**<br/>因为存在数据安全隐患，假若实例对象上存有同名但不同值的属性则获取的就不是正确的类属性的值了

```python
class Person:

    a = 10

    def func(self):
        print(self.a)


andy = Person()
andy.func()  # 10
print(andy.a)  # 10

# 假若修改了实例自身内存空间中 a 属性值的引用，通过 self 获取的该属性的值也变了
andy.a = 20
print(andy.a)  # 20
andy.func()  # 20

# 可实际上类自身的类属性 a 的值没有变
print(Person.a)  # 10
```

:::

---

### 修改

类属性可通过类名从类上直接获取后重新赋值来进行修改

```python
class Demo:

    times = 0

    def add(self):
        Demo.times += 1


a = Demo()
a.add()
a.add()
print(a.times)  # 2

b = Demo()
print(b.times)  # 2

print(Demo.times)  # 2
```

::: danger 通过实例修改类属性（千万不要用）

根据[属性向上查找机制](#属性查找机制)，类属性可利用 `self` 通过实例对象获取

> 若实例内存空间上有该同名属性则优先获取实例自身的
> 若没有则从类上获取同名类属性

若利用 `self` 通过实例对象修改类属性值，仅是修改了当前实例对象身上的同名属性，并不会影响类自身的类属性和其他的实例对象

```python
class Demo:

    times = 0

    def add(self):
        self.times += 1


a = Demo()
a.add()
a.times += 1
print(a.times)  # 2

b = Demo()
b.times += 1
print(b.times)  # 1

print(Demo.times)  # 0
```

:::

<br/>

## 私有属性

私有变量开头有两个下划线

可直接在类中定义类的私有属性，也可在 `__init__()` 中定义对象的私有属性

```python
class 类名:

    __私有属性 = 值
```

```python
class 类名:

    __私有属性 = 值

    def __init__(self):
      self.__私有属性 = 值
```

---

### 获取修改

**只能在类内部被访问修改**，若在类外部直接被访问和修改则会报错

类外部只能通过实例方法定义的 [getter](#getter) 访问和 [setter](#setter) 修改

或使用装饰器 `@property` 实现在类外部直接获取和赋值修改私有属性

```python
class Person:

    def __init__(self, name):
        self.__num = 10
        self.__name = name

    def getter(self):
        """getter"""
        print(self.__num)

    def setter(self, params):
        """setter"""
        self.__num = params

    @property
    def num(self):
        return self.__num

    @num.setter
    def num(self, params):
        self.__num = params


andy = Person('Andy')
# print(andy.__name)  # AttributeError: 'Person' object has no attribute '__name'
andy.getter()  # 10
print(andy.num)  # 10

andy.setter(20)
andy.getter()  # 20

andy.num = 30
print(andy.num)  # 30


tom = Person('Tom')
tom.getter()  # 10
```

::: danger 外部访问（知道即可，不要使用）

通过 `_类名__私有属性` 可在类外部直接访问类的私有属性
开发中不要用，知道即可

```python
class Demo:
    __private_num = 100


demo = Demo()
print(demo._Demo__private_num)  # 100
```

:::

---

### getter

实例方法定义，用于在类外部获取私有属性

```python
class 类:

    def getter(self):
        return self.私有属性


实例对象 = 类()

print(实例对象.getter())
```

```python
class Person:

    def __init__(self, name):
        self.__num = 10
        self.__name = name

    def getter(self):
        print(self.__num, self.__name)


andy = Person('Andy')
andy.getter()  # 10 Andy
```

也可使用装饰器 **[@property](#property)** 可将私有属性作为通过标识后的方法的返回值

---

### setter

实例方法定义，用于在类外部修改私有属性

```python
class 类:

    def setter(self, 参数):
        if 判断条件:
            self.私有属性 = 参数
        else:
            # 相关处理
```

```python
class Person:

    def __init__(self, name):
        self.__num = 10
        self.__name = name

    def getter(self):
        print(self.__num)

    def setter(self, params):
        if params > 0:
            self.__num = params
        else:
            print('参数不合法')


andy = Person('Andy')

andy.setter(0)  # 参数不合法
andy.setter(20)  # 参数不合法
andy.getter()  # 20
```

也可使用装饰器 **[@property 标识的私有属性.setter](#propertysetter)** 实现在类外部直接赋值修改私有属性

---

### @property

可将私有属性作为使用 [装饰器](../Basic/5.Function.md#装饰器) **`@property`** 标记的方法的返回值

标记的该方法被视作属性不需调用可直接在类外部获取其返回值

功能类似于[getter](#getter)

```python
class 类:

    @property
    def 属性名(self):
        return self.私有属性名


实例对象 = 类()
print(实例对象.属性名)  # 私有属性值
```

```python
class Demo:

    def __init__(self):
        self.__num = 10

    @property
    def num(self):
        return self.__num


demo = Demo()

print(demo.num)  # 10

print(demo.__num)  # 报错 AttributeError: 'Person' object has no attribute '__num'
```

---

### @property.setter

可使用被 [装饰器](../Basic/5.Function.md#装饰器) **`@property标识的私有属性.setter`** 标记的方法来实现在类外部直接修改私有属性

功能类似 [setter](#setter)

```python
class 类:

    @property
    def 属性名(self):
        return self.私有属性名

    @属性名.setter
    def 属性名(self, 参数):
        self.私有属性名 = 参数


实例对象 = 类()

实例对象.属性名 = 新值
```

```python
class Demo:

    def __init__(self):
        self.__num = 10

    @property
    def num(self):
        return self.__num

    @num.setter
    def num(self, params):
        self.__num = params


demo = Demo()

print(demo.num)  # 10

demo.num = 20
print(demo.num)  # 20
```
