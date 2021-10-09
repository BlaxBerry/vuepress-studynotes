## 字符串常用API 



### .length

### .size

字符长度

```ruby
p ''.length			# 0
p 'hello'.length # 5
```





```ruby
obj={
    name:'andy',
    age:28
}

p obj.to_a
# [[:name, "andy"], [:age, 28]]
```

### 





### .to_s

强制转为字符串

```ruby
数据.to_s
```

```ruby
n = 100
p n.to_s
# "100"

arr = [1,2,3]
p arr.to_s
# "[1, 2, 3]"

hash = {name: "andy"}
p hash.to_s
# "{:name=>\"andy\"}"
```





### 

### .empty?

判断字符串是否是空

返回 true / false

```ruby
字符串.empty?
```

空格也算内容不算是空

```ruby
p ''.empty?		# true
p ' '.empty?	# false
p 'a'.empty?	# false
```



### .include?( )

判断字符串中过是否包含某字符

返回 true / false

```ruby
字符串.include?('字符串')
```

```ruby
p "helloruby".include?('ruby')	# true
```

```ruby

```

### 

### .slice( )

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

```ruby

```

```ruby

```

### 

### .split( )





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



### .chop

删除字符串的最后一个字符

返回一个新字符串，不修改原字符串

```ruby
新字符串 = 字符串.chop
```

```ruby
str = "ruby"

s = str.chop
p s
# "rub"
p str
# "ruby"
```



### .chop!

.chop：返回一个新字符串，不修改原字符串

.chop!：修改原字符串

```ruby
字符串.chop
```

```ruby
str = "ruby"

str.chop!
p str
# "rub"
```



### .chomp

 移除字符串末尾的换行字符 \n

返回一个新字符串，不修改原字符串

若字符串末尾没有\n，则不进行任何操作

```ruby
新字符串 = 字符串.chomp!
```

```ruby
str = "ruby\n"

s = str.chomp
p s
# "ruby\n"
p str
# "ruby"
```



### .chomp!

.chomp：返回一个新字符串，不修改原字符串

.chomp!：修改原字符串

```ruby
字符串.chomp!
```

```ruby
str = "ruby\n"

str.chomp!
p str
# "ruby"
```



### 

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

### 



### .upcase

所有字母转为大写

返回一个新字符串，不修改原字符串

```ruby
新字符串 = 字符串.upcase
```

```ruby
str = "ruby"

s = str.upcase

p s		# "RUBY"
p str # "ruby"
```



### .upcase!

.upcase：返回一个新字符串，不修改原字符串

.upcase!：修改原字符串

```ruby
字符串.upcase!
```

```ruby
str = "ruby"

str.upcase!

p str	# "RUBY"
```



### .downcase

所有字母转为小写

返回一个新字符串，不修改原字符串

```ruby
新字符串 = 字符串.downcase
```

```ruby
str = "RUBY"

s = str.downcase

p s		# "ruby"
p str # "RUBY"
```



### .downcase!

.downcase：返回一个新字符串，不修改原字符串

.doencase!：修改原字符串

```ruby
字符串.downcase!
```

```ruby
str = "RUBY"

str.downcase!

p str	 # "ruby"
```



### .capitalize

首字母大写，其余字母小写

返回一个新字符串，不修改原字符串

```ruby
新字符串 = 字符串.capitalize
```

```ruby
str = "RUBY"

s= str.capitalize

p s		# "Ruby"
p str # "RUBY"
```



### .capitalize!

.capitalize：返回一个新字符串，不修改原字符串

.capitalize!：修改原字符串

```ruby
字符串.capitalize!
```

```ruby
str = "RUBY"

str.capitalize!

p str	# "Ruby"
```



### .swapcase

大小写字反转

返回一个新字符串，不修改原字符串

```ruby

```

```ruby

```



### .swapcase!

：返回一个新字符串，不修改原字符串

：修改原字符串

```ruby

```

```ruby

```



### 

### .tr( )

只能替换等长的字符串

```ruby
字符串.tr(字符串, 新字符串)
```

```ruby

```



### .tr!( )

```ruby

```

```ruby

```



### .replace( )

```ruby

```

```ruby

```

