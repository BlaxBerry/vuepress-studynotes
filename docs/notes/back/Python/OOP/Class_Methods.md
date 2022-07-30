# Python 类中的方法

![img](https://www.python.jp/pages/python_logo2.png)

[[toc]]

## 实例方法

实例方法（普通方法）在类中直接定义

必须接收默认的参数 `self`，指向实例对象本身

方法要接收其他参数时，需放到 `self` 后面

```python
class 类名:

  def 方法(self):
    pass

  def 方法(self, 参数, 参数):
    pass
```

---

### self

参数 `self` 指向实例对象本身

可通过 `self` 参数获取・调用其他实例属性和实例方法

```python
class Person:

    def say(self):
        print('hello')

    def func(self):
        print(self.name)
        self.say()


andy = Person()
andy.name = 'Andy'
andy.func()
# Andy
# hello

tom = Person()
tom.name = 'Tom'
tom.func()
# Tom
# hello
```

---

### 调用

实例方法只能由**实例对象调用**

```python
class Person:

    def say_hello(self):
        print('hello～')

    def say(self, word):
        print(word)


andy = Person()

andy.say_hello()  # hello～
andy.say('hello word')  # hello word
```

<br/>

## 类方法

针对类自身的方法，不依赖实例对象

定义时需在方法上一行通过[装饰器](../Basic/5.Function.md#装饰器) **`@classmethod`** 标识

类方法必须要有默认参数 **`cls`** 指向当前类本身

```python
class 类:

    @classmethod
    def 类方法(cls):
        pass
```

```python
class Example:

    @classmethod
    def func(cls):
        print(cls)


Example.func()  # <class '__main__.Example'>

instance = Example()
instance.func()  # <class '__main__.Example'>
```

---

### cls

参数 `cls` 指向当前类自身

类方法中可通过 `cls` 参数获取・调用类自身的属性和其他类方法

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

### 调用

类方法可被类自己调用，

也可通过 `self` 被实例对象调用（[属向上查询机制](./Class.md#属性查找机制)）

```python
class Person:

    @classmethod
    def a(cls):
        print('aaaaa')

    def func(self):
        Person.a()  # 类自己调用
        self.a()  # 实例对象调用


# 类自己调用
Person.a()  # aaaaa

andy = Person()

# 实例对象调用
andy.a()
# aaaaa
andy.func()
# aaaaa
# aaaaa
```

> 类方法可用于比如用于展示历史最高分、总数统计等不依赖实例对象，
>
> 或在实例对象创建前需要处理的功能
>
> 如下：统计类被调用创建实例对象的次数

```python
class PersonCreator:
    total = 0

    @classmethod
    def get_total_times(cls):
        print(cls.total)

    def __init__(self, name):
        self.name = name
        PersonCreator.total += 1


andy = PersonCreator('Andy')
tom = PersonCreator('Tom')
jack = PersonCreator('Jack')

PersonCreator.get_total_times()  # 3
```

<br/>

## 魔术方法

魔术方法（内置方法）不需调用，在类/对象的特定阶段自动执行

魔术方法名是 **`__xxx__`**

---

### \_\_init\_\_

初始化实例对象时自动执行，用于实例对象初始化，相当于构造函数

至少接收一个默认参数 `self`，指向实例对象本身

无返回值

```python
class 类:
    def __init__(self):
        # 初始化实例对象时的处理
        print('实例对象被初始化了')


实例对象 = 类()
```

**多用于类实例对象属性的统一初始化**，初始值为接收创建实例对象时传入的参数

```python
class 类:
    def __init__(self, 参数):
        self.实例属性 = 参数


实例对象 = 类(参数)
```

```python
class Person:

    def __init__(self, name):
        print('实例对象被初始化了')
        self.name = name

    def say(self, params):
        print(f'{self.name} said \'{params}\'')


andy = Person('Andy')
andy.say('hello')
# 实例被创建了
# Andy said 'hello'

tom = Person('Tom')
tom.say('byebye')
# 实例被创建了
# Tom said 'byebye'
```

---

### \_\_new\_\_

在实例化对象时自动执行，用于实例化对象并分配内存空间

> 先触发 `__new__` 后触发 `__init__`

至少接收一个参数 `cls` 指向当前类

若要手写返回值为固定的 `super().__new__(cls)`

没事别乱动该方法，可用于[单例模式](./Class.md#单例设计模式)

```python
class Demo:

  	def __new__(cls, *more):
        print('new')
        return super().__new__(cls)

    def __init__(self, name):
        self.name = name
        print('init')


a = Demo('a')
# new
# init
```

---

### \_\_del\_\_

对象从内存中被销毁时执行，析构

必须接收参数 `self`

```python
class Person:

    def __del__(self):
        print('对象从内存中删除了')


andy = Person()

del andy
# 对象从内存中删除了
```

---

### \_\_call\_\_

当对象当作函数调用时触发，`对象()`

必须有参数 `self`，返回值时情况而定

```python
class Person:

  	def __init__(self, name):
      	self.name = name

    def __call__(self, *args, **kwds):
        print('call')
        print(self.name)
        # return 返回值


andy = Person('Andy')

andy()
# call
# Andy
```

---

### \_\_str\_\_

用于自定义实例的文本显示内容

参数必须接收 `self` ，返回值必须是个字符串

需 `return` 返回自定义字符串作为通过 `print()` 打印实例对象的自定义结果

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

若直接通过 `print()` 打印实例对象获取的是其类和内存地址

```python
class Person:

    def __init__(self, name, age):
        self.name = name
        self.age = age


andy = Person('Andy', 28)
print(andy)  # <__main__.Person object at 0x1039f1fd0>
```

---

### \_\_getattribute\_\_

定义属性被访问时的行为

---

### \_\_getattr\_\_

定义试图访问一个不存在的属性时的行为

---

### \_\_setattr\_\_

定义对属性进行赋值和修改操作时的行为

<br/>

## 静态方法

定义时需在方法上一行通过 [装饰器](../Basic/5.Function.md#装饰器) **`@staticmethod`** 标识

静态方法参数不接收参数，没有 `self` 或 `cls`

```python
class 类:

    @staticmethod
    def 类方法():
        pass
```

静态方法通过类名直接调用，也可利用 `self` 通过实例对象调用

但是不能通过实例对象调用

```python
class Demo:

    @staticmethod
    def say_hello():
        print('hello~')

    def __init__(self):
        Demo.say_hello()
        self.say_hello()


Demo.say_hello()  # hello~

demo = Demo()
# hello~
# hello~
```

因为没有参数，静态方法内无法通过 `self` 访问和调用实例对象属性和方法

但可通过类名直接获取调用类自身的类属性和类方法

```python
class Demo:

    a = 10

    @classmethod
    def fn(cls):
        print('aaaaaa')

    @staticmethod
    def func():
        print(Demo.a)
        Demo.fn()


Demo.func()
# 10
# aaaaaa

demo = Demo()
demo.func()
# 10
# aaaaaa
```

<br/>

## 私有方法

类私有方法名开头有两个下划线

```python
class 类名:

    def __私有方法(self):
      pass
```

**只能在类内部被调用**，若在类外部被调用则会报错

私有方法可利用 `self` 通过实例对象直接调用，也可通过类名调用但要把 `self` 作为参数传递

```python
class Demo:

    def __private_method(self):
        print('hello')

    def call_private_method(self):
        self.__private_method()
        Demo.__private_method(self)


Demo.__private_method()
# 报错 AttributeError: 'Demo' object has no attribute '__private_method'

demo = Demo()
demo.__private_method()
# 报错 AttributeError: 'Demo' object has no attribute '__private_method'
demo.call_private_method()
# hello
# hello
```

::: danger 外部调用（知道即可，不要使用）

通过 `_类名__私有方法` 可在类外部直接调用类的私有方法<br/>开发中不要用，知道即可

```python
class Demo:

    def __private_method(self):
        print('hello')


demo = Demo()
demo._Demo__private_method()  # hello
```

:::
