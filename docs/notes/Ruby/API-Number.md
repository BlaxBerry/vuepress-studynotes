## 常用 API - Number

### .to_i

变为整数形，integer

```ruby
p 2.0.to_i	# 2
```

### .to_f

变为浮点形，float

```ruby
p 2.to_f	# 2.0
```

### .ceil

向上取整，取大的

```ruby
p 2.9.ceil		# 3
p -2.9.ceil		# -2

p 2.5.ceil		# 3
p -2.5.ceil		# -2

p 2.2.ceil		# 3
p -2.2.ceil		# -2
```

### .floor

向下取整，，取小的

```ruby
p 2.2.floor		# 2
p -2.2.floor	# -3

p 2.5.floor		# 2
p -2.5.floor	# -3

p 2.9.floor		# 2
p -2.9.floor	# -3
```

### .round

四舍五入

```ruby
p 2.9.round		# 3
p -2.9.round	# -3

p 2.2.round		# 2
p -2.2.round	# -2

p 2.5.round		# 3
p -2.5.round	# -3
```

### .rand / .rand()

随机数

不指定参数：0 ～ 1 之间的小数

指定参数：0 ～该参数之间的任意正整数

```ruby
p rand

p rand(10)

p rand(5)
```

```ruby

```
