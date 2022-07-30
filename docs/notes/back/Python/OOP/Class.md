# Python 类

![img](https://www.python.jp/pages/python_logo2.png)

[[toc]]

## 简介

类可视为一个通用模版

多个对象的共同特征和动作可封装到一个类（Class）中

---

### 定义

类通过 `class` 关键字定义

```python
class 类名:
    # 属性
    # 方法
```

类名是**大驼峰命名法**（单词首字母大写没有下划线）

```python
class ExampleClassName:
    pass
```

Python2 中定义类需要指定[继承](#继承) object 父类

Python3 中所有类默认继承 Object 基类中的内置属性与方法，可写省略写

```python
# python 3.x
class 类名:
    pass


# python 2.x
class 类名(object):
    pass
```

---

### 类实例对象

通过调用类名 `类名()` 可创建类的实例对象

创建的对象的内存地址不同，互不影响

```python
class 类名:
    pass


实例对象A = 类名()
实例对象B = 类名()

print(id(实例对象A) == id(实例对象B))  # False
```

**直接通过 `print()` 打印实例对象获得的是其类名和十六进制表示的内存地址**

```python
class Person:
    pass


andy = Person()
print(andy)  # <__main__.Person object at 0x10f1821f0>

tom = Person()
print(tom)  # <__main__.Person object at 0x10f182190>
```

可通过 [魔术方法（内置方法）](./Class_Methods.md#魔术方法)的 **[\_\_str\_\_()](./Class_Methods.md#str)** 的返回值来自定义字符串形式的 `print(实例对象)` 的打印结果

```python
class Person:

    def __init__(self, name, age):
        self.name = name
        self.age = age

    def __str__(self):
        return f"{self.name} {self.age}"


andy = Person('Andy', 28)
print(andy)  # Andy 28

tom= Person('Tom', 16)
print(tom)  # Tom 16
```

<br/>

## 类中方法

### 方法分类

[详见类中方法](./Class_Methods.md)

::: tip

实例方法<br/>内置方法（魔术方法）<br/>私有方法<br/>类方法<br/>静态方法

:::

```python
class 类名:

    # 普通方法（实例方法）
    def 实例方法(self, 参数):
        pass

    # 内置方法
    def __内置方法__(self):
        pass

    # 私有方法
    def __私有方法(self):
        pass

    # 类方法
    @classmethod
    def 类方法(cls):
        pass

    # 静态方法
    @staticmethod
    def 静态方法():
        pass
```

---

### self

在类的内部除类方法和静态方法外，其余方法定义时必须包含第一个参数 **`self`**

> 如下：

```python
class 类名:

    # 普通方法（实例方法）
    def 实例方法(self, 参数):
        pass

    # 内置方法
    def __内置方法__(self):
        pass

    # 私有方法
    def __私有方法(self):
        pass


实例对象 = 类名(参数)
实例对象.实例方法(参数)
```

`self` 指向调用该方法的当前类实例对象

可通过 `self` 获取调用实例对象上的属性与方法

> 方法接收的其余参数放到 `self` 后面，如下：

```python
class Person:

    def __init__(self, name, weight):
        self.name = name
        self.weight = weight

    def eat(self, weight_increased):
        self.weight += weight_increased

    def exercise(self, weight_decreased):
        self.weight -= weight_decreased

    def __str__(self):
        return f"{self.name} {self.weight}"


andy = Person('Andy', 70)
print(andy)  # Andy 70

andy.eat(2)
andy.eat(2)
print(andy)  # Andy 74

andy.exercise(3)
print(andy)  # Andy 71
```

---

### cls

[类方法](./Class_methods.md#类方法)定义时必须要有默认参数 **`cls`**，指向当前类本身

类方法中可通过 `cls` 参数获取和调用类自身的属性和其他类方法

因为类方法中没有 `self` **无法获取哈调用实例对象的属性和方法**，否则报错抛出 AttributeError 异常

```python
class 类:

    类属性 = 值

    @classmethod
    def a(cls):
        pass

    @classmethod
    def func(cls):
        print(cls.类属性)
        cls.a()
```

---

### @classmethod

[类方法](./Class_methods.md#类方法)定义时需在方法上一行通过 [装饰器](../Basic/5.Function.md#装饰器) **`@classmethod`** 来标识

```python
class 类:

    @classmethod
    def 类方法(cls):
        pass
```

---

### @staticmethod

[静态方法](./Class_methods.html#静态方法)定义时需在方法上一行通过 [装饰器](../Basic/5.Function.md#装饰器) **`@staticmethod`** 标识

```python
class 类:

    @staticmethod
    def 类方法():
        pass
```

<br/>

## 类中属性

### 属性分类

[详见类中属性](./Class_attributes.md)

::: tip

实例属性<br/>类属性<br/>私有属性<br/>

:::

```python
class 类名:

    类属性 = 初始值

    def __init__(self, 参数):
      	# 私有属性
        self.__私有属性 = 初始值
        self.__私有属性 = 参数
        # 实例对象属性
        self.实例属性 = 初始值
        self.实例属性 = 参数
```

---

### 属性查找机制

Python 类中属性遵循向上查找机制

::: tip 属性查找机制

即查找顺序是优先从实例对象自身的内存空间中获取实例属性，若实例对象自身没有再从类中获取同名的[类属性](./Class_attributes.md#类属性)

:::

---

### 属性私有化

通过定义[私有属性](./Class_attributes.md#私有属性)，可将属性隐藏使其不被外界随意获取修改

类外部只能通过实例方法定义的 **[getter](./Class_attributes.md#getter) 访问** 和 **[Setter](./Class_attributes.md#setter) 修改**

也可使用 **装饰器 [@property](#property)** 实现在类外部直接获取和赋值修改私有属性

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

---

### @property

可将私有属性作为通过 [装饰器](../Basic/5.Function.md#装饰器) **`@property`** 标识后的方法的返回值，该方法作为属性不需调用可直接获取返回值，功能类似 [getter](./Class_attributes.md#getter)

使用 [装饰器](../Basic/5.Function.md#装饰器) **`@property被标识的私有属性.setter`** 实现在类外部直接赋值修改私有属性，功能类似 [setter](./Class_attributes.md#setter)

```python
class 类:

    @property
    def 属性名(self):
        return self.私有属性名

    @属性名.setter
    def 属性名(self, 参数):
        self.私有属性名 = 参数


实例对象 = 类()
print(实例对象.属性名)  # 私有属性值

实例对象.属性名 = 新值
print(实例对象.属性名)  # 私有属性值
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

print(demo.__num)  # 报错 AttributeError: 'Person' object has no attribute '__num'

print(demo.num)  # 10

demo.num = 20
print(demo.num)  # 20
```

<br/>

## 继承

用于实现代码的复用

子类会继承父类中的所有属性和方法

::: tip 术语：

子类 == 派生类<br/>父类 == 基类<br/>继承 == 派生

:::

Python2 中定义类需要指定[继承](#继承) object 父类

Python3 中所有类默认继承 Object 基类中的内置属性与方法，可写省略写

```python
# Python 3.x
class Demo:
    pass

# Python 2.x
class Demo(object):
    pass


demo = Demo()
print(dir(demo))
# ['__class__', '__delattr__', '__dict__', '__dir__', '__doc__', '__eq__', '__format__', '__ge__', '__getattribute__', '__gt__', '__hash__', '__init__', '__init_subclass__', '__le__', '__lt__', '__module__', '__ne__', '__new__', '__reduce__', '__reduce_ex__', '__repr__', '__setattr__', '__sizeof__', '__str__', '__subclasshook__', '__weakref__']
```

---

### 单继承

常见，子类会继承父类中的所有属性和方法

```python
class 父类:
    pass


class 子类(父类):
    pass
```

> 如下：

```python
class Father:

    public_num = 100

    def say(self):
        print("hello～")


class Son(Father):
    pass


demo = Son()

print(demo.public_num)  # 100
demo.say()  # hello～
```

> 如下：

```python
class Animal:

    def eat(self, food):
        print(f'eat {food}')


class Person(Animal):

    def say_hello(self):
        print("hello～")


class American(Person):
    pass


andy = American()
andy.say_hello()  # hello～
andy.eat('hanmbuger')  # eat hanmbuger
```

---

### 多继承

逗号分隔要继承的多个父类

```python
class 子类(父类A, 父类B, 父类C):
    pass
```

父类的继承的先后顺序会影响在子类中同名方法向上查找的顺序

```python
class Animal:

    def eat(self, food):
        print(f'eat {food}')


class Person:

    def say_hello(self):
        print("hello～")


class American(Animal, Person):
    pass


andy = American()
andy.say_hello()  # hello～
andy.eat('hanmbuger')  # eat hanmbuger
```

::: tip MRO（了解即可）

Python 的类中方法搜索顺序<br/>先从当前类查找，若有就执行，若没有就向上执行<br/>父类的继承的先后顺序会影响在子类中调用同名方法的顺序

```python
class A:
    def say(self):
        print('A')


class B:
    def say(self):
        print('B')


class D(A, B):
    pass


demo = D()
print(D.__mro__)
# (<class '__main__.D'>, <class '__main__.A'>, <class '__main__.B'>, <class 'object'>)
```

:::

---

### 方法重写

**同名覆盖，自身优先**

子类和父类中尽量不要有重名方法以免子类的重新覆盖

```python
class Father:

    def introduce(self):
        print("it's father")


class Son(Father):

    def introduce(self):
        print("it's son")

    def say(self):
        self.introduce()


demo = Son()

demo.say()  # it's son
```

若想在子类中使用父类的方法需要使用 `super()` 调用父类的方法

详见下文 [super()](#super)

```python
class Father:

    def introduce(self):
        print("it's father")


class Son(Father):

    def introduce(self):
        print("it's son")

    def say(self):
        super().introduce()


demo = Son()

demo.say()  # it's father
```

---

### 子类的初始化

实例化子类后会自动调用父类 `__init__` 方法

```python
class Father:

    def __init__(self):
        print('father init')


class Son(Father):
    pass


demo = Son()
# father init
```

若子类写了 `__init__()` 方法，因为同名会重写覆盖父类的 `__init__()`

```python
class Father:

    def __init__(self):
        print('father init')


class Son(Father):

    def __init__(self):
        print('son init')


demo = Son()
# son init
```

若不想让子类中的 `__init__` 方法重新覆盖父类

需在子类的 `__init__` 方法中开始就用 `super()` 调用父类的 `__init__` 方法

详见下文 [super()](#super)

```python
class Father:

    def __init__(self):
        print('father init')


class Son(Father):

    def __init__(self):
        super().__init__()
        print('son init')


demo = Son()
# father init
# son init
```

```python
class Person:

    def __init__(self, lang):
        self.lang = lang

    def say(self):
        print(f"speak {self.lang}")


class American(Animal, Person):

    def __init__(self):
        self.lang = 'English'
        super().__init__(self.lang)


andy = American()
andy.say()  # speak English
```

---

### super()

`super()` 用于调用父类中的某一个方法

> 原理是 `super()` 会把子类的对象转换为父类的对象

::: tip Python 3 的 super() 写法：

```python
class 子类(父类):

   def __init__(self):
      super().__init__(参数)

   def 实例方法(self):
    	super().父类中方法(参数)
```

:::

::: tip Python 2 的 super() 写法：

```python
class 子类(父类):

   def __init__(self):
      super(父类名, self).__init__(参数)

   def 实例方法(self):
    	super(父类名, self).父类中方法(参数)
```

:::

<br/>

## 多态

调用相同的父类方法，但传入不同对象参数执行生成不同结果

```python
class Animal:

    def __init__(self, name):
        self.name = name

    def laugh(self):
        print(f'{self.name} is laughing')


class Dog(Animal):
    pass


class Cat(Animal):
    pass


class Person:

    def __init__(self, name):
        self.name = name

    def play_with_pet(self, pet):
        print(f'{self.name} is playing with {pet.name}')
        pet.laugh()


andy = Person('Andy')
dog = Dog('doggy')
cat = Cat('catty')

andy.play_with_pet(dog)
# Andy is playing with doggy
# doggy is laughing

andy.play_with_pet(cat)
# Andy is playing with catty
# catty is laughing
```

<br/>

## 单例设计模式

单例设计模式（Singleton Pattern）主要目的是确保**某一个类只有唯一一个实例存在**

> 比如：音乐播放对象一次只能放一首歌，只有一个回收站

[内置方法](./Class_Methods.md#魔术方法)的`__new__()` 实例化对象分配内存空间时，只要**永远返回一个固定的引用地址**，就可实现无论调用执行多少次类名都只会创建内存地址相同的实例对象，即保证只有一个唯一的实例

```python
class MusicPlayer:

    instance = None

    def __new__(cls):
        if cls.instance is None:
            cls.instance = super().__new__(cls)
        return cls.instance


a = MusicPlayer()
print(id(a))  # 4431674912

b = MusicPlayer()
print(id(b))  # 4431674912

print(id(a) == id(b))  # True
```
