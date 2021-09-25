# Ruby基础

<img src="https://kitsune.blog/wp-content/uploads/ruby-logo.png" style="zoom:50%;" />



## 变量

### 变量类型

- **局部变量** 

  > ローカル変数 	

- **全局变量**

  > グローバル変数

- **实例变量**

  > インスタンス変数

- **类变量**

  > クラス変数

```ruby
a = ""		# 局部变量
$a = ""		# 全局变量

class Example
  @@a = ""  # 类变量
  def initialize(params)
    @a = params		# 实例变量
  end
end
example = Example.new('')
```



### 变量作用域

>  **変数スコープ**  は**参照できる範囲**を意味する

---

#### 局部变量

> ローカル変数：どこで定義したかによって、スコープが変わる

```ruby
a = 100
def fn
    a = 200
    puts a
end

fn
# 200
```

函数内部直接使用函数外部定义的局部变量，报错

```ruby
a = 100
def fn
    puts a
end

fn
# undefined local variable or method `a' for main:Object (NameError)
```

---

#### 全局变量

> グローバル変数：どこからでも参照できる

```ruby
$a = 100

def fn
    a = 200
    puts $a
end

fn
# 100
```



### 赋值与使用

先使用后定义，报错

```ruby
puts name 
name = "Ruby"

# undefined local variable or method `a' for main:Object (NameError)
```

---

#### 并行赋值

```ruby
a,b,c = 10,20,30
p a,b,c
# 10
# 20
# 30
```

交换两个变量的值

```ruby
a, b = b, c
```

#### 多重代入

```ruby
a, *b = 10,20,30

p a  # 10
p b  # [20,30]
```





### 式展開

> 式展開は、文字列の中に変数や計算式の結果などを出力できる機能

在字符串中调用变量时，

- 除了local变量需要通过 **#{变量}** 解析

- global变量可直接通过 **#变量** 解析

- 类中的也可直接通过 **#@实例变量、#@@类变量** 解析 (详见类)

```ruby
$tom = 'tom'
andy = "andy"

puts "hello #{andy}"
puts "hello #$tom"

# hello andy
# hello tom
```

`#{}`の中に、計算式の結果も出力でき

```ruby
puts "sum is #{(10+20)/3}"
# sum is 10
```







## 常量

命名建议使用大写字母和下划线_ 

不可再次赋值

```ruby
A = 'hello andy'
A = 'hello tom'
puts A
# 結果
warning: already initialized constant A
warning: previous definition of A was here
hello tom
```









## 数据类型

> Rubyの世界では、すべてのデータがオブジェクト

|    类型    |  含义  |               例子                |
| :--------: | :----: | :-------------------------------: |
|   Number   |  数值  |              1.0   1              |
|   String   | 字符串 |         "hello"   'hello'         |
|   Range    |  范围  |           1..5   1...5            |
| TrueClass  |   真   |               true                |
| FalseClass |   假   |               false               |
|  NilClass  |   空   |                nil                |
|   Array    |  数组  |              [1,2,3]              |
|    Hash    |  哈希  | {:name="andy"}   {"name"=>"andy"} |
|   Symbol   |        |            :name. :age            |
|    Time    |  时间  |     2021-07-26 05:00:45 +0900     |


### 判断类型

> オブジェクトのクラスを確認

通过 **数据.class** 判断数据的类型

```ruby
数据.class
```

```ruby
puts 1.class        # Integer
puts (1.0).class    # Float

puts "hello".class  # String

puts nil.class			# NilClass

puts true.class			# TrueClass
puts false.class		# FalseClass

puts [1,2].class		# Array

puts :key.class			# Symbol

puts /a-z/.class		# Regexp
```



### 数值 Number

|   类型    | 含义 |
| :-------: | :--: |
| Integer类 | 整数 |
|  Float类  | 浮点 |

---

#### 加减乘除运算

> 足し算（**+**）引き算（**-**）掛け算（*****）割り算（**/**）

---

#### 指数运算

>  べき乗（******）
>
> 演算子の左辺を右辺の値で累乗します。

```ruby
puts 3**2
# 9 
```

---

#### 赋值运算符

> 代入演算子 += -= *= /=

```ruby
x += 5
x -= 5
x *= 5
x /= 5  
```





### 字符串 String

```ruby
a = 'hello'
b = "hello"

c = "
    hello
    Ruby
"
puts c
=begin

    hello
    Ruby

=end
```

---

#### 字符串拼接

```ruby
p '1'+'1'  # '11'
```

---

#### 无隐式转换

Ruby没有隐式转换 

> 暗黙的に変換

```ruby
p "1" + 1  	# 报错
p 1.to_s + "1"　# "11"

p 3 * "1"  # 报错
p "1" * 3  # "111"
```

---

#### 转义字符 \

文字列リテラル

- \n：换行
- \s：空格

---

#### 单双引号

シングルクオートとダブルクオートの違い

两者都可用于字符串类型

但只有双引号可识别 **式展開や改行文字**

```ruby
puts "#{10 + 20}"  # 30
puts '#{10 + 20}'  # #{10 + 20}
```

```ruby
puts "Hello \n World"
=begin
Hello 
World
=end

puts 'Hello \n World'
# Hello \n World
```

---

#### 多行字符串

对于特别多 的多行的字符串

> ヒアキュメント /  行指向文字列リテラル

- **变量中：**

```ruby
<<自定义
	xxxxx
自定义
```

```ruby
html = <<HTML
    <div id="father">
        <div id="son"></div>
    </div>
HTML

puts html
=begin
    <div id="father">
        <div id="son"></div>
    </div>
=end
```

- **函数中：**

```ruby
def Name
  <<~自定义
		xxxxx
	自定义
end
```

```Ruby
def html
    <<~HTML
      <div id="father">
          <div id="son"></div>
      </div>
    HTML
end 

puts html
=begin
      <div id="father">
          <div id="son"></div>
      </div>
=end
```





### nil

表示空值

> nilオブジェクトは**何も存在しない**ことを表す

> Rubyの`false`と`nil`のみが偽

```ruby
p nil.to_s	 # ""
```

----

#### 判断nil

```ruby
puts nil.nil? # true
puts 1.nil?   # false
puts "".nil?  # false

def fn
end
puts fn.nil? # true 

```

```ruby

```

```ruby

```



### symbol

シンボルは任意の文字列と一対一に対応するオブジェクト

```ruby
`:' 識別子
`:' 変数名
`:' 演算子
```

---

#### 验证唯一性

**.objet_id** 验证

```ruby
puts "hello".object_id
puts "hello".object_id
# 70349442295420
# 70349442295280

hello = "hello"
puts :hello.object_id
puts :hello.object_id
# 1055388
# 1055388

# 当然同一个变量的id是相同的
puts hello.object_id
puts hello.object_id
# 70278201976100
# 70278201976100
```

**.equal?()** 验证

```ruby
puts :hello.equal?(:hello)
puts "hello".equal?("hello")

# true
# false
```

---

#### 用处

`名前'を指し示す時など、文字列そのものが必要なわけではない時に用います。

- ハッシュのキー { :key => "value" }
- アクセサの引数で渡すインスタンス変数名 attr_reader :name
- メソッド引数で渡すメソッド名 __send__ :to_s
- C の enum 的な使用 (値そのものは無視してよい場合)



### 时间 Time

```ruby
p Time.now

t = Time.new
y = t.year
m = t.month
d = t.day

w = t.wday

min = t.min
sec = t.sec

total_sec= t.to_i	# 总毫秒（1970/1/1/0）


p (time.now).class	# Time
p t.class		# Time
p y.class   # Integer
```

#### 日期格式化

```ruby
time = Time.new
 
p time.to_s
# "2015-09-17 15:26:42 +0800"
puts time.strftime("%Y-%m-%d %H:%M:%S")
# 2015-09-17 15:26:42
```

```ruby

```







## 数组 Array

 **配列**

```ruby
[1，2，3，4]
```

### 获取元素

> Arrayオブジェクトの要素を参照する時，**インデックス** / **添字**

通过数组的序号**index**获取指定元素

---

#### 获取单个指定元素

```ruby
数组[index]

数组[-index] # 倒着取

数组.at(index)
```

```ruby
arr = [1,2,3]
p arr[0]	# 1
p arr[1]	# 2
p arr[2]	# 3

p arr[-1] # 3

p arr.at(0) # 1
```

---

#### 获取范围内的元素

```ruby
数组[开始序号, 结束序号]
数组[开始序号..结束序号]
数组[开始序号...结束序号]

数组.slice(开始序号, 结束序号)
```

```ruby
arr = [1,2,3,4,5]

p arr[1..3]		# [2, 3, 4]
p arr[1,3]		# [2, 3, 4]

p arr.slice(1，3)  # [2, 3, 4]
```



### 修改元素

#### 修改单个指定元素

```ruby
数组[index] = 新的值
```

```ruby
arr = [1,2,3,4,5]

arr[0]=9
arr[arr.length-1]=100
p arr 
# [9, 2, 3, 4, 100]
```

---

#### 修改范围内元素

```ruby
数组[开始序号,结束序号] = [值，值，值，值]
```

```ruby
arr = [1,2,3,4,5]

arr[0,2] = [100,99,90]
p arr 
# [100, 99, 98, 3, 4, 5]
```



### 插入元素

#### 范围插入元素

```ruby
数组[插入位置后一个序号,0] =  [值，值，值，值]
```

```ruby
arr = [1,1,1,1]

arr[1,0] = [100,90,80]
p arr
# [1, 100, 90, 80, 1, 1, 1]
```



### 数组合并

#### arr ｜ arr

> 和集合

按照前后顺序合并两个数组中不重复的元素，

重复元素只会保留一个

```ruby
a = [1,2,3]
b = [3,3,5]

p a | b
# [1, 2, 3, 5]
```

---

#### arr + arr

> 配列の結合

按照前后顺序直接拼接两个数组的元素，

重复元素也合并进去

```ruby
a = [1,2,3]
b = [3,3,5]

p a + b
# [1, 2, 3, 3, 3, 5]
```



### 共同元素

#### arr & arr

> 共通集合

获取数组形式的两个数组的重复的元素，只会保留一个

```ruby
a = [1,2,3]
b = [3,4,5]

p b & a
# [3]
```

---

#### arr - arr

> 集合の差

从一个数组中将包含在另一个数组中的元素全部除去

```ruby
数组A - 数组B
# 从 A 中将包含在 B 中的元素全部除去
```

```ruby
a = [1,2,3]
b = [3,4,5,6]

p a - b		# [1, 2]
p b - a		# [4, 5, 6]
```





**要素の追加**

加一个

```ruby
Arrayオブジェクト << "要素"
```

加多个

```ruby
Arrayオブジェクト.push(要素,要素)
```

**要素の削除**

```ruby
Arrayオブジェクト.delete_at(index)
```

```ruby

```







## 范围 Range

> 演算子式/範囲式

### ..

包含指定的最高值的范围

```ruby
最小值..最大值
```

```ruby
p (1..5).to_a
# [1, 2, 3, 4, 5]

p ('a'..'d').to_a
# ["a", "b", "c", "d"]
```

### ...

不包含指定的最高值的范围

```ruby
最小值...最大值
```

```ruby
p (1...5).to_a
# [1, 2, 3, 4]

p ('a'...'d').to_a
# ["a", "b", "c"]
```





## 哈希 Hash

Hash 就是键值对

### 定义键值对

```ruby
# 旧
{'key' => value}

# 新（symbol）
{key: value}
```

- 字符串的key键

> キーに文字列を使用

```ruby
string_hash = {
  "name" => "andy",
  "age" => 28,
  "address" => "CN"
}

puts string_hash
# {"name"=>"andy", "age"=>28, "address"=>"CN"} 
```

- Symbol的key键

> キーにシンボルを使用

```ruby
symbol_hash = {
 	name: "andy", 
  age: 28, 
  address: "CN"
}

puts symbol_hash
# {:name=>"andy", :age=28, :address=>"CN"}
```

- 也可将字符串 和 Symbol 混合在一个Hash中

> 文字列のキーとシンボルのキーを混在させることができ

```ruby
hash = {
 	name: "andy", 
  "age" => 28, 
  address: "CN"
}

p hash
# {:name=>"andy", "age"=>28, :address=>"CN"}
```



### 获取值

> Hashオブジェクトの要素を参照する時

```ruby
哈希['key']
哈希[:key]
```

```ruby
hash = {
  name: "andy", 
  "nickname" => "AD"
  age: 28, 
  address: "CN"
}

p hash['nickname']	# "AD"
p hash[:name]			# "andy"
```



> **要素の追加**

```ruby
ハッシュ名[キー] = 追加したい値
```



### 展开Hash

可通过在哈希前加上 ******，在一个哈希内将其他哈希的键值对展开

可用于追加键值对

```ruby
{
  **哈希
}
```

```ruby
b = {
    address: 'CN'
}

a = {
    name: 'andy',
    age:28,
    **b
}

p a 
# {:name=>"andy", :age=>28, :address=>"CN"}
```







## 方法函数

### 定义与调用

```ruby
def 函数名
  函数体
end

函数名
```

先调用后定义，报错

```ruby
fn
def fn 
    puts 'helo'
end

# undefined local variable or method `fn' for main:Object (NameError)
```



### 返回值

每个方法默认都会返回一个值。

Ruby默认返回的值是最后一个语句的值

```ruby
def fn
    a = 100
    b = 200
    c = 300
end

p fn   # 300
```

---

#### return语句

用于从 Ruby 方法中返回一个或多个值。

```ruby
def fn
    a = 100
    b = 200
    c = 300
   	return a,b,c
end

p fn 	# [100, 200, 300]
```

- return后有指定的返回值，返回该指定值

- 若return后未给出指定返回值，返回 **nil** 

```ruby
def fn01
  	return 99
    a = 100
end
p fn01 	# 99


def fn02
  	return 
end
p fn02 	# nil
```



### 函数参数

```ruby
def 函数名(a,b)
  函数体
end

函数名(a,b)
```

如调用函数是传参数的个数不对，会报错ArgumentError

```ruby
def fn(a,b)
  xxxx
end
fn()

#  wrong number of arguments (given 0, expected 2) (ArgumentError)
```

---

#### 参数默认值

```ruby
def 函数名(a=默认值,b=默认值)
  函数体
end

函数名
函数名(a,b)
```

---

#### 可变参数

可変長引数

```ruby
def 函数名(*参数)
  函数体
end

函数名(a)
函数名(a,b)
```

```ruby
def fn(a,*params)
    p a
    p params
    p params.class # Array
end
fn(1) 			# 1  []
fn(1,2)			# 1  [2]
fn(1,2,3) 	# 1  [2,3]
```

```ruby

```

### 变量作用域

```ruby
a = 100
def fn
    a = 200
    puts a
end
fn

# 200
```

函数内部直接使用函数外部定义的local变量，报错

```ruby
a = 100
def fn
    puts a
end
fn

# undefined local variable or method `a' for main:Object (NameError)
```



## Ruby语法

**制御構文**

### 判断

**条件分岐**

#### if 语句

```ruby
if 条件 
  xxx
end
```

一般省略 then，但若一行内书写 if 式，则必须以 then 隔开

```ruby
if 条件 then xxx end
```

#### if 修饰符

```ruby
xxx if 条件
```

#### if...else 语句

```ruby
if 条件1
  xxx
else
  xxx
end
```

#### if...elsif...else 语句

```ruby
if 条件1
  xxx
elsif 条件2
  xxx
else
  xxx
end
```

#### unless 语句

if 语句的相反，条件不成立则执行

```ruby
unless 条件
  xxx
end
```

#### unless 修饰符

```ruby
xxx unless 条件
```

#### case 语句

匹配判断

```ruby
case 比較したいオブジェクト
when 値1, 値2
   xxx
when 値3, 値4
   xxx
else
   xxx
end
```

一般省略 then，但若一行内书写 if 式，则必须以 then 隔开

```ruby
case 比較したいオブジェクト
when 値1 then xxx
when 値2 then xxx
end
```

---

### 循环

#### until 语句

直到满足条件前，一直循环执行

```ruby
until 条件
  xxx
end
```

一般省略do，但若一行内书写 if 式，则必须以 do 隔开

```ruby
until 条件 do xxx end
```

#### until 修饰符

```ruby
xxx until 条件

begin
  xxx
end until 条件
```

#### while 语句

满足条件就会一直循环执行（容易出现死循环）

```ruby
while 条件
  xxx
end
```

一般省略do，但若一行内书写 if 式，则必须以 do 隔开

```ruby
while 条件 do xxx end
```

#### while 修饰符

```ruby
xxx while 条件
  
begin
  xxx
end while 条件
```

#### for 语句

```ruby
for 计时器变量 in 范围 
  xxx
end
```

```ruby
for num in 0...5
  puts num
end
=begin
0,
1,
2,
3,
4
=end

for item in [1,2,3,4]
  puts item
end
=begin
1,
2,
3,
4
=end
```

```ruby
sum = 0
for n in [1, 2, 3, 4, 5, 6, 7]
  sum += n
end
puts sum  # 28
```

#### each 循环

ブロックの中の処理をレシーバの要素の分だけ繰り返す

```ruby
?.each do |变量|
  xxx
end


?.each { |item|
  xxx
}
```

```ruby
sum = 0
[1, 2, 3, 4, 5, 6, 7].each do |n|
  sum += n
end
puts sum  # 28
```

#### times 循环

循环整数次数

```ruby
整数.times do
  xxx
end
```

写成一行的话，常用 {}

```ruby
整数.times { xxx }
```

#### step 循环

```ruby
开始值.step(结束值, 间隔数) do |变量|
  xxx
end
```

```ruby
# 从 1 开始到 10，每间隔 3 个数循环一次
1.step(10,3) do |item|
    p item
end

=begin
1
4
7
10
=end
```

#### upto循环

 从 ？升序循环到 ？

```ruby
开始值.upto(结束值) do |item|
  xxxx
end
```

```ruby
# 从 1 循环到 5
1.upto(5) do |item|
    p item
end

=begin
1
2
3
4
5
=end
```

#### downto循环

从 ？ 降序循环到 ？

```ruby
开始值.upto(结束值) do |item|
  xxxx
end
```

```ruby
# 从 5 循环到 1
5.downto(1) do |item|
    p item
end

=begin
5
4
3
2
1
=end
```

---

#### break

终止循环该次迭代

繰り返し処理を抜ける装飾子

```ruby
for i in 0..5
    if i >= 3 
       break
    end
    puts i
end
=begin
0,
1,
2
=end
```

#### next

跳到循环的下一个迭代

次の繰り返し処理にジャンプ

```ruby
for i in 0..5
    if i == 3 && i == 4
       next
    end
    puts i
end
=begin
0,
1,
2
5
=end
```

#### redo

重新开始该次迭代

現在行っている繰り返し処理を再度繰り返す

```ruby
for i in 0..5
   if i < 2 
      puts i
      redo
   end
end
=begin
0,
0,
0,
...
死循环
=end
```







## 类 class

```ruby
class クラス名
end
インスタンス01 = クラス名.new
インスタンス02 = クラス名.new
```

```ruby
class Person
    def initialize(name='ruby')
        @name = name   
    end
    def say
        p "hello,i am #@name"
    end
end

ruby = Person.new
ruby.say
# "hello,i am ruby"

andy = Person.new('andy')
andy.say
#	"hello,i am andy"

tom = Person.new('tom')
tom.say
#	"hello,i am tom"
```

```ruby

```



### 变量

#### 类变量

类变量在变量名之前放@@

类变量被指定了值后，无论生成多少个实例对象，类变量都一致

```ruby
class Example
  @@a = 10
  @@b = 20
end
```

```ruby
class Example
    @@username = "andy"
    @@userage = 28

    def fn
        return @@username,@@userage
    end
end

example01 = Example.new
p example01.fn
# ["andy", 28]
example02 = Example.new
p example02.fn
# ["andy", 28]
```

---

#### 实例变量

实例变量在变量名之前放@，由创建实例对象时决定

通过new 方法创建实例对象时传入的参数，在 initialize方法中将参数传给实例变量

```ruby
class Example
  def initialize(a,b)
    @a = a
    @b = b
  end 
end
```

Ruby的实例变量无法直接在外部获取和修改

需要通过getter和setter

```ruby
class Example
   def initialize(a,b)
    @a = a
    @b = b
   end  
   def fn
    return @a,@b
   end
end

example01 = Example.new('andy',28)
p example01.fn
# ["andy", 28]
example02 = Example.new('tom',15)
p example02.fn
# ["tom", 15]
```

---

#### 访问器 getter

类中的变量不能直接在外部被访问获取

可通过定义访问器(getter)方法，在类的外部读取类中变量

类中的函数可通过 **#** 直接调用实例变量、类变量、global变量

```ruby
def 访问器
  #@实例变量
	#@@类变量
	#$global变量
end
```

```ruby
class Example
    @@a = "a"
    @@b = "b"
    def initialize(a,b)
      @a = a
      @b = b
    end
    def get 
        puts "#@a,#@b"
        puts "#@@a,#@@b"
    end
end
p = Example.new(1,2)
p.get

# 10, 20
# a, b
```

#### 设置器 setter 

类中的变量不能直接在外部被修改

可通过定义设置器(setter)方法，在类的外部将参数传入类中变量

```ruby
def 设置器= （参数）
  @实例变量 = 参数
end
```

```ruby
class Example
    def initialize(a,b)
      @a = a
      @b = b
    end
  
    def setA=(a) 
      @a = a
    end
    def setB=(b) 
      @b = b
    end  
  
    def get 
      return @a,@b
    end
end
p = Example.new(1,2)
p p.get 	# [1,2]
p.setA=(3)
p.setB=(4)
p p.get 	# [3,4]
```

---

#### 读写限制

アクセスメゾット　

getter和setter很常用，但是写起来麻烦

所以Ruby又定义了三种属性声明方法来控制类中属性的可读写

|     アクセスメゾット      |           含义            |
| :-----------------------: | :-----------------------: |
| **attr_accessor :变量名** | reader+writer，属性可读写 |
|  **attr_reader :变量名**  |        属性仅可读         |
|  **attr_writer :变量名**  |       属性仅可修改        |

```ruby
class Example
    attr_accessor :name,:age

    def initialize(name,age)
        @name,@age = name,age
    end
end

andy = Example.new('andy',28)
p andy.name  # 'andy'
p andy.age	 # 28

andy.name,andy.age = 'AD',10
p andy.name  # 'AD'
p andy.age	 # 10
```



### 方法

#### initialize 方法

initializeメソッド（初期化メソッド）

是类的构造函数

```ruby
class Example
  def initialize(params1,params2)
    @a = params1
    @b = params2
  end
end
```

```ruby

```

---

#### 实例方法

与其他方法的定义一样，但它们只能通过类实例来使用

```ruby
class 类
  def 函数名
    xxx
  end
end

实例对象 = 类.new
实例对象.函数名
```

```ruby
class Example
  def fn
    p "hello"
  end
end

a = Example.new
a.fn  # hello
```

- **调用实例方法**

```ruby
class Example
    def initialize()
        say
    end

    def fn
       say
    end

    def say
       p "hello"
    end
end


e = Example.new
e.fn
```

---

#### 类方法

> クラスメゾッド

即静态方法，

只能被类本身调用，不能被实例调用

```ruby
class 类
  def self.函数名
    xxx
  end
end

类.函数名
类::函数名
```

```ruby
class Example
    def self.fn
      p "hello"
    end
end
  
Example.fn  # hello
Example::fn # hello

p = Example.new
p.fn  # 报错
# undefined method `fn' for #<Example:0x00007ff36304c758> (NoMethodError)
```

- **大量定义类方法时：**

```ruby
class 类名
  class << self
    def a
    end
    def b
    end
  end
end
```

- **实例方法调用类方法：**

```ruby
 类名.静态方法
```

```ruby
class Example
    def initialize()
        Example.say
    end

    def fn
       Example.say
    end

    def self.say
       p "hello"
    end
end


e = Example.new
e.fn
```

---

#### 外部调用限制

> 呼び出し制限

Ruby定义了三种权限来控制类中方法的在类外部的调用： 

| 呼び出し制限  |                      含义                      |
| :-----------: | :--------------------------------------------: |
|  **public**   | 方法作为实例方法，仅可被实例对象调用。**默认** |
|  **private**  |     方法作为类的静态方法，仅类自身可以使用     |
| **protected** |                   不可被调用                   |

- **单个方法：**

```ruby
public :methodName
private :methodName 
protected :methodName
```

```ruby
class Example
    def a
        puts "aaa"
    end
    public :a

    def b
        puts "bbb"
    end
    private :b

    def c
        puts "ccc"
    end
    protected :c
end

p = Example.new
p.a   # aaa
p.b		# 报错
# private method `b' called for #<Example:0x00007ffe35918580> (NoMethodError)
p.c		# 报错
# protected method `c' called for #<Example:0x00007fc14d920250> (NoMethodError)
```

- **多个方法：**

```ruby
class Example
  public  # 后面定义的方法全都是public
  def xx
  end
  
	private  # 后面定义的方法全都是private
  def xx
  end
  
	protected  # 后面定义的方法全都是protected
  def xx
  end
end
```

```ruby
class Example
    public
    def a
        puts "aaa"
    end
    
    private
    def b
        puts "bbb"
    end
    
    protected
    def c
        puts "ccc"
    end
end

p = Example.new
p.a   # aaa
p.b		# 报错
# private method `b' called for #<Example:0x00007ffe35918580> (NoMethodError)
p.c		# 报错
# protected method `c' called for #<Example:0x00007fc14d920250> (NoMethodError)
```

用处：实例：

```ruby
class Example
    attr_accessor :a,:b		 # 允许在类外访问a,b
    protected :a=, :b=     # 不允许在类外调用修改a,b的setter方法

    def initialize(a,b)
        @a,@b = a,b
    end
end

p = Example.new(10,20)
puts p.a	# 10
puts p.b 	# 20

p.a = 90  # 报错
# protected method `a=' called for #<Example:0x00007fa28f898620 @a=10, @b=20> (NoMethodError)
p.b = 90  # 报错
# protected method `b=' called for #<Example:0x00007fa28f898620 @a=10, @b=20> (NoMethodError)
```





### 常量

#### 常量调用

在类的外部访问常量，必须使用 **类名::常量名**

```ruby
class Example
    VERSION = '0.0.1'

    def self.showV
        return VERSION
    end

    def getV
        return VERSION
    end
end

p Example::VERSION		# "0.0.1"
p Example.showV 			# "0.0.1"

example = Example.new
p example.getV				# "0.0.1"
```



### self

```ruby
class Example
    def self.fn01
        self
    end

    def fn02
        self
    end
end

p Example.fn01

e = Example.new		# Example
p e.fn02		# 实例对象
```



### 继承

```ruby
class 父类
end

class 子类 < 父类
end
```

继承父类的所有

```ruby
class Father
    def fn
      p "a"
    end
    def self.fun
      p "static"
    end
end

class Son < Father
end

son = Son.new
son.fn   # "a"

Son.fun  # "static"
```

---

#### 确认继承的父类

通过 **superclass**方法，継承元を確認

```ruby
子类.superclass
```

```ruby
class Father
end

class Son < Father
end

p Son.superclass
# Father
```

---

#### 方法重载

オーバーライド

继承了父类的子类中的同名方法，会重写继承过来的方法，但不会修改父类

```ruby
class Father
    def fn
      p 'a'
    end
end

class Son < Father
    def fn
      p 'b'
    end
end

son = Son.new
son.fn	 # "b"
```

```ruby

```

---

#### super

`super`は、親のクラスの同名のメソッド内容をそのまま実行する

```ruby

```





## 模块 module

```ruby
module モジュール名
end
```

是一种把 方法、常量组合在一起的方式

```ruby
module 模块
  
  常量 = 值
  
  def self.静态方法
  end
  
  def 方法
  end
  
end
```

类似class，但是模块不能继承，不能有实例对象



### 模块的静态方法

模块中的方法通过 **模块名.方法名** 的形式获取

其中 的方法也叫做模块的参数

```ruby
模块名.方法名
```

```ruby
module Basic
    VERSION = '0.0.1'

    def self.showV
        return VERSION
    end

    def getV
        return VERSION
    end

    def add(a,b)
        return a+b
    end
end

p Basic::VERSION	# '0.0.1'

p Basic.showV			# '0.0.1'
p Basic::showV		# '0.0.1'

p Basic.getV 			# 报错
# undefined method `getV' for Basic:Module (NoMethodError)
p Basic.add(10,20)  # 报错
# undefined method `getV' for Basic:Module (NoMethodError)
```



### 设定为静态方法

不是模块的静态方法，无法通过 **模块.方法** 的形式直接获取

```ruby
module Basic
    VERSION = '0.0.1'

    def getV
        return VERSION
    end
end

p Basic.getV  # 报错
# undefined method `getV' for Basic:Module (NoMethodError)
```

需要先将其设定为模块的静态方法后，才能通过 **模块.方法** 的形式直接获取

```ruby
module_function :方法名
```

```ruby
module Basic
    VERSION = '0.0.1'

    def getV
        return VERSION
    end
    def add(a,b)
        return a+b
    end
  
  	module_function :getV, :add
end

p Basic.getV  			# '0.0.1'
p Basic.add(10,20)	# 30
```



### include

把模块导入class类的做法叫做 **Mix-in**

class类可通过 **include** 调用模块，并使用其方法和常量，

无法使用模块的静态方法

```ruby
class 类
  include 模块
end
```

```ruby
module Basic
    VERSION = '0.0.1'

    def self.showV
        return VERSION
    end
    def getV
        return VERSION
    end
    def add(a,b)
        return a+b
    end
end

class Example include Basic
end

p Example::VERSION	# '0.0.1'
p Example::showV  # 报错
# undefined method `showV' for Example:Class (NoMethodError)
p Example.showV	  # 报错 
# undefined method `showV' for Example:Class (NoMethodError)

e = Example.new
p e.getV				# '0.0.1' 
p e.add(10,20)	# 30
```

```ruby

```

```ruby

```







## 错误 与 例外处理

### 错误处理

#### begin

#### end

```ruby
begin
  # 可能会出错的处理逻辑
  xxx
rescue => 错误信息变量
  # 发生错误时
  xxxx
end
```

#### rescue/else/ensure

```ruby
begin
    # 可能会出错的处理逻辑
    xxx
  
rescue => e
    # 发生错误时
    xxxx
    puts e # 错误信息
  
else
    # 正常处理时
    xxxx
  
ensure
    # 最后的收尾工作，
  	# 无论是否出错，都会执行
    xxxx
end
```

begin相当与JS的try

rescue相当于JS的catch

```js
try{}
catch(e){}
```









## 库（library）

和其他语言一样，有 库/包 的存在（イブラリ / パッケージ）

ruby的库分为三类：

1. **核心库**（core）
2. **标准库**（Standard Library） 
3.  **第三方库**（third-party）

> ライブラリには三種類に分類され：
>
> - **組み込みライブラリ**
> - **標準添付ライブラリ**
> - **外部ライブラリ（gem）**

- 核心库提供了ruby最基本的类和模块。
- 标准库主要是和网络相关的库。
- 标准库和第三方库都需要require 才可以使用

```ruby
require "date"
p Date.today
```



### 库的导入

标准库和第三方库都需要require 才可以使用

```ruby
require "date"
p Date.today
```

---

#### require

- 导入 library
- 导入自定义 .rb 文件

```ruby
require 库名
require '文件名'
```

require是以当前目录为基准，调用导入文件/库

```ruby
reuqire './test'
```

---

#### require_relative

- 导入 library
- 导入自定义 .rb 文件

```ruby
require_relative 库名
require_relative 'test.rb'
```

require_relative是以当前文件为基准，**相对路径**

```rbuy
xxx
|- 02
		|- 02.rb
|- 01
		|- 01.rb
```

```ruby
# 在01.rb 导入 02.rb

require_relative '../02/02.rb'

require '../02/02.rb' 
# cannot load such file -- ../02/02.rb (LoadError)
```

---

#### load

- reuqire只会读取第一次

- load会多次读取

但是load导入时必须带有文件的后缀名

```ruby
load './text/rb'
```

```ruby

```



### 第三方库（gem）

>  第三方库（サードパーティのライブラリ）

第三方库主要是 **gem** 。存放于 [RubyGems.org](https://rubygems.org/) 

**RubyGems** 是管理 gem 安装卸载的工具

但是已经用的很少了，主要用 **bundler** 这个工具了

---

#### 下载

```bash
gem install rails
```



```bash
gem install rails --version 5.0
#或
gem install rails -v 5.0
```

---

#### 卸载

```bash
gem uninstall rails
```

```bash
gem uninstall rails -v 5.0
```

---

#### 列出下载的gem

所有

```
gem list -l
```

指定搜索关键字

```bash
gem list 包含的关键字
```

```bash
gem list rail

*** LOCAL GEMS ***

autoprefixer-rails (10.2.5.1)
jquery-rails (4.4.0)
rails (6.1.4)
rails-dom-testing (2.0.3)
rails-html-sanitizer (1.3.0)
railties (6.1.4)
sass-rails (6.0.0)
sassc-rails (2.1.2)
sprockets-rails (3.2.2)
```







## 正则表达式

正規表現オブジェクト

```ruby

```

```ruby

```

```ruby

```

```ruby

```

```ruby

```

```ruby

```







