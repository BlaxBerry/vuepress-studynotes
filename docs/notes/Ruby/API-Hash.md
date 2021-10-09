## 常用哈希API



### Hash.new

```ruby
h = Hash.new
p h
# {}

h['name'] = 'andy'
p h
# {"name"=>"andy"}

h[:name] = 'Andy'
p h
# {"name"=>"andy", :name=>"Andy"}
```



### { }

```ruby

```

```ruby

```

### 



### .to_h

数组转为Hash

```ruby
arr = [[:name, "andy"], [:age, 28]]
p arr.to_h

# {name:'andy',age:28}
```



### 

### .keys

获取Hash的所以key键

```ruby
hash = {
    name: 'andy',
    "nickname" => "AD",
    age: 28
}

p hash.keys	 # [:name, "nickname", :age]
```



### .values

获取Hash的所以value值

```ruby
hash = {
    name: 'andy',
    "nickname" => "AD",
    age: 28
}

p hash.values	 # ["andy", "AD", 28]
```



### 

### .key?( )

判断Hash是否含有某一个key键

返回值是 true / false 

```ruby
哈希.key?(键)
```

```ruby
hash = {
    name: 'andy',
    "nickname" => "AD",
    age: 28
}

p hash.key?(:name)	# true
p hash.key?("nickname")		# true
```



### .has_key?( )

等同于 **.include?() / .key?()**

```ruby
哈希.has_key?(键)
```

```ruby
hash = {
    name: 'andy',
    "nickname" => "AD",
    age: 28
}

p hash.has_key?(:name)	# true
p hash.has_key?("nickname")		# true
```



### .include?( )

等同于 **.key?**

```ruby
哈希.include?(键)
```

```ruby
hash = {
    name: 'andy',
    "nickname" => "AD",
    age: 28
}

p hash.include?(:name)	# true
p hash.include?("nickname")		# true
```



### .member?( )

等同于 **.key?**

```ruby
哈希.member?(键)
```

```ruby
hash = {
    name: 'andy',
    "nickname" => "AD",
    age: 28
}

p hash.member?(:name)	# true
p hash.member?("nickname")		# true
```

### 

### .value?( )

判断Hash是否含有某一个value值

返回值是 true / false 

```ruby
哈希.value?(值)
```

```ruby
hash = {
    name: 'andy',
    "nickname" => "AD",
    age: 28
}

p hash.value?('andy')	# true
p hash.value?(28)		# true
```



### .has_value?( )

等同于 **.has_value?**

```ruby
哈希.has_value?(值)
```

```ruby
hash = {
    name: 'andy',
    "nickname" => "AD",
    age: 28
}

p hash.has_value?('andy')	# true
p hash.has_svalue?(28)		# true
```

### 

### .clear

清空Hash中所有键值对

```ruby
哈希.clear
```

```ruby
hash = {
    name: 'andy',
    "nickname" => "AD",
    age: 28
}

hash.clear

p hash # {}
```



### .delete( )

删除一个指定key键的键值对

```ruby
哈希.delete(key)
```

```ruby
hash = {
    name: 'andy',
    "nickname" => "AD",
    age: 28
}

hash.delete(:name)
p hash	# {"nickname"=>"AD", :age=>28}
```



### .delete_if

删除Hash中满足条件的键值对

```ruby
哈希.delete_if{ |key,value|
  xxx
}
```

```ruby
hash = {
    name: 'andy',
    "nickname" => "AD",
    age: 28
}

hash.delete_if{ |key,val|
    key == :name || key == "nickname"
}

p hash	# {:age=>28}
```



### .reject

等同于 **.delete_if**

返回一个新Hash，不修改原Hash

```ruby
新哈希 = 哈希.reject { |key,value|
  xxxx
}
```

```ruby
hash = {
    name: 'andy',
    "nickname" => "AD",
    age: 28
}

n = hash.reject{ |key,val|
    key == :name || key == "nickname"
}

p n			# {:age=>28}
p hash	# {:name=>"andy", "nickname"=>"AD", :age=>28}
```



### .reject！

.reject：返回一个新Hash，不修改原Hash

.reject!：修改原Hash

```ruby
哈希.reject!{ |key,value|
  xxx
}
```

```ruby
hash = {
    name: 'andy',
    "nickname" => "AD",
    age: 28
}

hash.reject!{ |key,val|
    key == :name || key == "nickname"
}

p hash	# {:age=>28}
```



### 

### .fetch

```ruby

```

```ruby

```

```ruby

```

```ruby

```

