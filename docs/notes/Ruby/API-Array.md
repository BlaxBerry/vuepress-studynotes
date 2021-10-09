## 数组常用API



### Array.new

通过Array类的实例对象创建数组，只能生成相同元素的数组

不指定参数：生成一个空数组

指定参数：生成相同元素的数组

```ruby
Array.new（元素个数, 元素）
```

```ruby
p Array.new		# []
p Array.new(3)	
# [nil, nil, nil]
p Array.new(3,'hello')	
#	["hello", "hello", "hello"]
```



### %w( )

仅用于创建 元素是字符串的数组

元素不能为空白字符串

```ruby
%w(元素 元素 元素 )
```

```ruby
items = %w(1 2 3)
p items		
# ["1", "2", "3"]
```



### [ ]

字面量方式创建数组

```ruby
p []		# []
p [1,2,3]  # [1,2,3]
```



### .length

### .size

```ruby
arr = [1,2,3,4]

p arr.length	# 4
p arr.size		# 4
```

### 



### .to_a

**Hash键值对** 转为数组

```ruby
obj={
    name:'andy',
    age:28
}

p obj.to_a
# [[:name, "andy"], [:age, 28]]
```



### .split( )

**字符串** 转为数组

```ruby
字符串.split()
```

- 不指定参数：以空格为区分
- 指定参数：以指定的参数为区分
- **指定空白字符 ' '：以每一个字符数为区分**

```ruby
p "hello".split('')
# ["h", "e", "l", "l", "o"]

p "hello, ruby".split(',')
# ["hello", "ruby"]

p "hello i am ruby".split()
# ["hello", "i", "am", "ruby"]
```

### 



### .at( ) 

获取单个指定序号的元素

相当于 **arr[index]**

```ruby
数组.at(index) 
```

```ruby
arr = [1,2,3]
p arr.at(0) # 1

p arr[0]	# 1
```



### .values_at( )

获取范围内指定序号的多个元素

```ruby
数组.values_at(index,index,index) 
```

```ruby
arr = [1,2,3,4,5]
p arr.values_at(0,2,4)
# [1, 3, 5]
```



### .first

### .last

```ruby
arr = [1,2,3,4]

p arr.first	 # 1
p arr.last	 # 4
```



### .slice( )

截取元素，返回一个新数组，不修改原数组

相当于 **arr[n,m] / arr[n...m]**

```ruby
新数组 = 数组.slice(index)	

新数组 = 数组.slice(开始序号,结束序号)		# 不包含结束序号的元素
新数组 = 数组.slice(开始序号...结束序号)
```

```ruby
arr = [1,2,3,4,5]

p arr.slice(0)		# 1
p arr.slice(0,3)	 # [1, 2, 3]
p arr.slice(0...3) # [1, 2, 3]

p arr.slice(0,arr.length) # [1,2,3,4,5]
```

```ruby
arr = [1,2,3,4,5]

p arr.slice(0,3)	# [1, 2, 3]

p arr[0,3]		# [1, 2, 3]
p arr[0...3]	# [1, 2, 3]
```



### .slice!( )

.slice( )：返回一个新数组，不修改原数组

.slice!( )：返回一个新数组，修改原数组

```ruby
数组.slice!(index)	
数组.slice!(开始序号,结束序号)		# 不包含结束序号的元素
数组.slice!(开始序号...结束序号)
```

```ruby
arr = [1,2,3,4,5]
b =  arr.slice(0,3)
p b		# [1, 2, 3]
p arr	# [1, 2, 3, 4, 5]

c = arr.slice!(0,3)
p c		# [1, 2, 3]
p arr	# [4, 5]
```



### 

### .insert( )

在指定序号出添加一个元素

```ruby
数组.insert(序号, 元素)
```

```ruby
arr = [1,2,3]

arr.insert(0,10)
p arr		# [10,1,2,3]
```





### .unshift( )

数组前头加入元素

```ruby
数组.unshift(item, item, item)
```

```ruby
a = [1,2,3]
a.unshift(9,10)
p a
#	[9, 10, 1, 2, 3]
```



### .push( )

数组后头加入元素，可加入多个，追加

```ruby
数组.push(item, item, item)
```

```ruby
a = [1,2,3]
a.push(9,10)
p a
# [1, 2, 3, 9, 10]
```



### <<

数组后头加入一个元素，追加

```ruby
数组 << 元素
```

```ruby
a = [1,2,3]
a << 4

p a		# [1, 2, 3, 4]
```



### .append( )

追加多个元素，等同于 **push**

```ruby
.append(item,item)
```

```ruby
arr = [1,2,3]

arr.append(4,5)
p arr		# [1, 2, 3, 4, 5]
```



### .concat( )

连接两个数组

等同于 **arr + arr**

```ruby
数组A.concat(数组B)
```

```ruby
a = [1,2,3]
b = [3,4,5]

a.concat(b)
p a		# [1, 2, 3, 3, 4, 5]
```



### 

### .compact

将数组中的空值 nil 剔除

返回一个新数组，不修改原数组

```ruby
新数组 = 数组.compact
```

```ruby
a = [1,nil,2,nil,3]

b = a.compact
p a		# [1, nil, 2, nil, 3]
p b		# [1, 2, 3]
```



### .compact!

将数组中的空值 nil 剔除

修改原数组

```ruby
数组.compact！
```

```ruby
a = [1,nil,2,nil,3]
b = a.compact!

p a		# [1, 2, 3]
p b		# [1, 2, 3]
```



### .uniq

删除数组中的额重复元素，

返回一个新数组，不会修改原数组

```ruby
新数组 = 数组.uniq
```

```ruby
arr = [1,2,3,3,4,3,3]

b = arr.uniq

p b			# [1,2,3,4]
p arr		# [1,2,3,3,4,3,3]
```



### .uniq!

.uniq：返回一个新数组，不会修改原数组

.uniq!：会修改原数组

```ruby
数组.uniq!
```

```ruby
arr = [1,2,3,3,4,3,3]

arr.uniq!

p arr		# [1,2,3,4]
```

### 



### .delete( )

从数组中删除一个元素

```ruby
数组.delete(item)
```

```ruby
a = [1,2,3]

a.delete(2)
p a
# [1, 3]
```



### .delete_at( )

从数组中删除一个指定序号所对应的元素

```ruby
数组.delete_at(index)
```

```ruby
a = [1,2,3]

a.delete_at(1)
p a
# [1, 3]
```



### .shift

删除数组最开头的一个元素

返回的是删除的元素

```ruby
数组.shift
```

```ruby
arr = [1,2,3]
arr.shift

p arr		# [2,3]

item = arr.shift
p item	# 1
```



### .pop

删除数组最末尾的一个元素

返回的是删除的元素

```ruby
数组.pop
```

```ruby
arr = [1,2,3]
arr.pop

p arr		# [1,2]

item = arr.pop
p item	# 3
```

### 



### .delete_if

将数组中符合条件的元素删除

会修改原数组，等同于**reject!( )**

```ruby
数组.delete_if{ |item|
  xxxx
}
```

```ruby
arr = [1,2,3,4,5]
arr.delete_if{ |item|
    item >= 3
}
p arr		# [1,2]
```



### .reject

将数组中符合条件的元素删除

返回一个新数组，不修改原数组

```ruby
新数组 = 数组.reject{ |item|
  xxxx
}
```

```ruby
arr = [1,2,3,4,5]

b = arr.reject{ |item|
    item >= 3
}

p b			# [1,2]
p arr		# [1,2,3,4,5]
```



### .reject!

.reject {|item| xxx }：返回一个新数组，不修改原数组

.reject! {|item| xxx }：会修改原数组

```ruby
数组.reject!{ |item|
  xxxx
}
```

```ruby
arr = [1,2,3,4,5]

arr.reject!{ |item|
    item >= 3
}

p arr		# [1,2]
```

### 



### .map

操作数组的元素，等同于 **.collect**

返回一个新数组，不修改原数组

```ruby
新数组 = 数组.map{ |item|
  xxxx
}
```

```ruby
arr = [1,2,3,4]

b = arr.map{ |item|
    item * 10
}

p b		# [10, 20, 30, 40]
p arr	# [1,2,3,4]
```



### .map!

.map：返回一个新数组，不修改原数组

.map!：修改原数组

```ruby
数组.map!{ |item|
  xxxx
}
```

```ruby
arr = [1,2,3,4]

arr.map!{ |item|
    item * 10
}

p arr		# [10, 20, 30, 40]
```



### .collect

等同于 **.map**

```ruby
新数组 = 数组.collect{ |item|
  xxxx
}
```

```ruby
arr = [1,2,3,4]

b = arr.collect{ |item|
    item * 10
}

p b		# [10, 20, 30, 40]
p arr	# [1,2,3,4]
```



### .collect!

.collect：返回一个新数组，不修改原数组

.collect!：修改原数组

```ruby
数组.collect!{ |item|
  xxxx
}
```

```ruby
arr = [1,2,3,4]

arr.collect!{ |item|
    item * 10
}

p arr		# [10, 20, 30, 40]
```



### 

### .fill( )

修改数组中所有元素为同一值

```ruby
数组.fill(item)

```

```ruby

```

```ruby

```

```ruby

```

### 

### .flatten

数组扁平化，将多元数组转为一元数组

返回一个新数组，不修改原数组

```ruby
新数组 = 数组.flatten!
```

```ruby
arr = [
    [1,2,3],
    [4,5,6]
]

b = arr.flatten

p b		 # [1, 2, 3, 4, 5, 6]
p arr	 # [[1, 2, 3], [4, 5, 6]]
```



### .flatten!

.flatten：返回一个新数组，不修改原数组

.flatten!：修改原数组

```ruby
数组.flatten!
```

```ruby
arr = [
    [1,2,3],
    [4,5,6]
]

arr.flatten!

p arr		# [1, 2, 3, 4, 5, 6]
```

### 



### .reverse

反转数组，点到元素顺序

返回一个新数组，不修改原数组

```ruby
新数组 = 数组.reverse
```

```ruby
arr = [1,2,3,4]

b = arr.reverse

p b			# [4, 3, 2, 1]
p arr		# [1,2,3,4]
```



### .reverse！

.reverse：返回一个新数组，不修改原数组

.reverse!：修改原数组

```ruby
数组.reverse
```

```ruby
arr = [1,2,3,4]

arr.reverse!

p arr		# [4, 3, 2, 1]
```





### .sort

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