# mongoose模块

使用Node.js操作MongoDB数据库，需要依赖第三方包mongoose



## 安装

```bash
npm i mongoose
```





## 数据库连接

1. 启动MongoDB

```bash
brew services start mongodb-community
```

2. 链接数据库

```js
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/my_db_01', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => { console.log('mongodb链接成功') })
    .catch((err) => { console.log('mongodb链接失败', err) })
```









| 解释   |     SQL     |    MongoDB     | 解释                       |
| ------ | :---------: | :------------: | -------------------------- |
| 数据库 |  database   |  **database**  | **数据库**                 |
| 数据表 |    table    | **collection** | **集合**（JS数组）         |
| 数据行 |     row     |  **document**  | **文档**（JS对象）         |
| 字段   |   column    |   **field**    | **字段**（JS对象属性）     |
| 主键   | primary key |  primary key   | 主键，自动将id字段设为主键 |





## 创建集合

MongoDB中不需要手动创建数据库

在链接数据库时，若数据库不存在，MongoDB会自动创建数据库

1. **创建集合规则**

   通过mongoose.Schema创建构造函数实例

   传入属性的数据类型

   MongoDB会自动创建 _id字段

2. **使用规则创建集合**，

   使用创建的规则并通过model() 方法创建集合

   集合首字母名称大写，存入数据库中集合的名称实为小写且加上了s

```js
// 1. 创建集合规则
const studentSchema = new mongoose.Schema({
    name: String,
    age: Number,
    isStatus: Boolean
})
// 2. 创建集合
const Student = mongoose.model('Student', studentSchema)
```

但是，仅有集合还没插入数据，

没有数据MongoDB无法自动创建数据库





## 创建并插入文档

### 方法1  创建文档实例

创建文档实例对象，然后存入

1. **创建文档实例对象**，添加对象形式数据

   添加的数据的属性和规则创建的一一对应

2. **将数据存入数据库**

   通过集合实例对象的save方法

```js
// 3. 创建文档
const student = new Student({
    name: 'Andy',
    age: 28,
    isStatus: true
})
// 4. 存入数据库
student.save()
```

综上：

```js
// 导入
const mongoose = require('mongoose')
// 链接数据库
mongoose.connect('mongodb://localhost/my_db_01', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => { console.log('mongodb链接成功') })
    .catch((err) => { console.log('mongodb链接失败', err) })


// 1. 创建规则
const studentSchema = new mongoose.Schema({
    name: String,
    age: Number,
    isStatus: Boolean
})
// 2. 创建集合
const Student = mongoose.model('Student', studentSchema)

// 3. 创建文档
const student = new Student({
    name: 'Andy',
    age: 28,
    isStatus: true
})
// 4. 存入数据库
student.save()
```



### 方法2  集合的create() 

1. 通过集合实例对象的 create()方法 插入文档对象
   - 第一个参数：对象形式的要插入的文档

2. 然后通过 create()方法的**回调函数获取插入文档的执行结果**
   - 第二个参数：回调函数

```js
Student.create({
    name: 'Tom',
    age: 20,
    isStatus: true
}, (err, res) => {
  // 错误对象
    console.log(err);
  // 插入集合的当前文档
    console.log(res);
})
```

如下：

```js
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/my_db_01', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => { console.log('mongodb链接成功') })
    .catch((err) => { console.log('mongodb链接失败', err) })


// 1.
const studentSchema = new mongoose.Schema({
    name: String,
    age: Number,
    isStatus: Boolean
})
// 2.
const Student = mongoose.model('Student', studentSchema)

// 3.
Student.create({
    name: 'Tom',
    age: 20,
    isStatus: true
}, (err, res) => {
    console.log(err);
    console.log(res);
})
```

---

### create() 的Promise形式

因为是异步回调函数，create() 方法可以使用Promise的形式

- 第一个参数：还是对象形式的要插入的文档

通过then() 获取插入执行的结果

通过catch() 获取错误对象

```js
Student.create({
    name: 'Tom',
    age: 20,
    isStatus: true
})
  .then(result=>{
  	// 插入集合的当前文档
  	console.log(result)
	})
  .catch(err=>{
  	// 错误对象
  	console.log(err)
	})
```

如下：

```js
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/my_db_01', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => { console.log('mongodb链接成功') })
    .catch((err) => { console.log('mongodb链接失败', err) })


// 1.
const studentSchema = new mongoose.Schema({
    name: String,
    age: Number,
    isStatus: Boolean
  	skills: [String]
})
// 2.
const Student = mongoose.model('Student', studentSchema)

// 3.
// Promise形式
Student.create({
    name: 'Jerry',
    age: 20,
    isStatus: true
})
    .then(result => {
        console.log(result);
    })
    .catch(err => {
        console.log(err);
    })
```







## 查询文档

### find() 查询文档

通过集合的 find() 方法，

- 返一组文档（数组形式）

- 若文档不存在，返回一个空数组 **[ ]**

---

#### 查找所有文档

```js
Students.find().then(result=>{
    console.log(result);
})
```

```js
// 导入
const mongoose = require('mongoose')
// 链接数据库
mongoose.connect('mongodb://localhost/my_db_01', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => { console.log('mongodb链接成功') })
    .catch((err) => { console.log('mongodb链接失败', err) })

// 创建集合规则
const studentSchema = new mongoose.Schema({
    name: String,
    age: Number,
    isStatus: Boolean,
  	skills: [String]
})
// 使用规则创建集合
const Student = mongoose.model('Student', studentSchema)

// 查找
Student.find().then(result=>{
    console.log(result);
})
```



### findOne() 查询文档

返回一个文档（对象形式）

默认集合中第一个符合条件的文档

若不存在则返回**null**

---

#### 查询第一个文档

```js
Students.findOne().then(result=>{
    console.log(result);
})
```

---

#### 查询第一个符合条件的文档

```js
Students.find({
  age: 20
}).then(result=>{
    console.log(result);
})
```



### 查询条件

#### 无条件

即，查找指定集合下的所有文档

不给find() 方法传入对象形式的查询条件

```js
Students.find().then(result=>{
    console.log(result);
})
```

---

#### 固定值

即，查找指定集合下的，字段为指定的固定值的所有文档

find() 方法传入对象形式的查询条件

```js
Students.find({
  age: 20
})
  .then(result=>{
    console.log(result);
})
```

---

#### 范围值

即，查找指定集合下的，字段为指定的范围值的所有文档

通过 $gt 和 $lt ，以对象形式指定查询条件字段值的范围

- **$gt：**大于，great than
- **$lt：**小于，less than

```js
Students.find({
  age: {
    $gt: 20, 
    $lt: 40
  }
})
  .then(result=>{
    console.log(result);
})
```

如下：

```js
// 导入
const mongoose = require('mongoose')
// 链接数据库
mongoose.connect('mongodb://localhost/my_db_01', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => { console.log('mongodb链接成功') })
    .catch((err) => { console.log('mongodb链接失败', err) })

// 创建集合规则
const studentSchema = new mongoose.Schema({
    name: String,
    age: Number,
    isStatus: Boolean
})
// 使用规则创建集合
const Student = mongoose.model('Student', studentSchema)

// 查找
Student.find({
    age: {
        $gt: 25,
        $lt: 30
    }
}).then(result => {
    console.log(result);
})
```

---

#### 包含

即，查找指定集合下的，字段内容包含有某些指定值的所有文档

通过 $in，以数组形式指定查询条件字段值应包含哪些值

可用于查询关键字

```js
Students.find({
  skills: {
    $in: ['JS', 'PHP']
  }
})
  .then(result=>{
    console.log(result);
})
```

---

#### 指定字段

即，查找指定集合下的，文档的某些指定字段

通过在find()后链式调用select()，以空格字符串的形式传入指定字段

```js
Students.find()
	.select('name age')
  .then(result=>{
    console.log(result);
})
```

返回值除了指定的字段，还默认携带 _id字段

```js
[
  { _id: 60ce283a08d2840efd1ef7dd, name: 'Andy' },
  { _id: 60ceccca20e099119ba24134, name: 'Tom' },
  { _id: 60ced03079bf8411bc9f56a7, name: 'Jerry' }
]
```

---

#### 不指定某字段

若不想查询某字段，需要在其前加上 **-**

比如：不想查询默认显示的  _id字段

```js
Students.find()
	.select('name age -_id')
  .then(result=>{
    console.log(result);
})
```

```js
[ 
  { name: 'Andy' }, 
  { name: 'Tom' }, 
  { name: 'Jerry' } 
]
```

---

#### 升序排序

将查询出来的数据，指定字段进行升序排序

通过在find()后链式调用sort()，并将排序依据的字段用字符串形式传入

```js
Student.find()
    .sort('age')
    .then(result => {
        console.log(result);
    })
```

---

#### 降序排序

在将排序依据的字段用字符串形式传入时，在前名加上 **-**

```js
Student.find()
    .sort('-age')
    .then(result => {
        console.log(result);
    })
```

---

#### 略过

通过 skip() 略过指定数量的文档

和 limit()配合，可用于分页

如下：略过前两个文档

```js
Student.find()
    .skip(2)
    .then(result => {
        console.log(result);
    })
```

---

#### 限制数量

通过 limit() 限制查询的文档数量

和skip()配合，可用于分页

如下：查询10个的文档

```js
Student.find()
    .limit(10)
    .then(result => {
        console.log(result);
    })
```





### 链式编程多个筛选条件

如下：

- age在 20～30
- skills包含 Javascript, PHP
- 查询前10个符合条件的人的name和score
- 并按照score从大到小降序排列

```js
Student
  .find({
  	age: {
    	$gt: 20,
    	$lt: 30
  	}
  	skills: {
    	$in: ['JavaScript', 'PHP']
  	}
	})
    .select('name score -_id')
    .sort('-score')
		.limit(10)
    .then(result => {
        console.log(result);
    })
```

#### 





## 删除文档

### 删除单个

通过 集合.findOneAndDelete() 删除单个文档

查找匹配条件，并且删除符合条件的第一个文档

then()返回的是删除的文档

```js
Student.findOneAndDelete({
   _id: '60ced03079bf8411bc9f56a7'
})
.then(result=>{
    console.log(result);
})
```

如下：

```js
// 导入
const mongoose = require('mongoose')
// 链接数据库
mongoose.connect('mongodb://localhost/my_db_01', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => { console.log('mongodb链接成功') })
    .catch((err) => { console.log('mongodb链接失败', err) })

// 创建集合规则
const studentSchema = new mongoose.Schema({
    name: String,
    age: Number,
    isStatus: Boolean
})
// 创建集合
const Student = mongoose.model('Student', studentSchema)

// 删除
Student.findOneAndDelete({
   _id: '60ced03079bf8411bc9f56a7'
})
.then(result=>{
    console.log(result);
})
```

---

### 删除多个

通过 集合.deleteMany({}) 删除多个文档

返回的是个对象

```js
{ 
  n: 删除的文档数, 
  ok: 1
}
```

若传入的是个空对象，则删除集合中所有的文档

```js
Student.deleteMany({})
.then(result=>{
    console.log(result);
})
```





## 更新文档

### 更新一个

通过updateOne()，将查询条件选中的第一个文档的某个字段更新

返回值是个对象

```js
{
  n: 文档总数, 
  nModified: 修改的文档数, 
  ok: 1 
}
```

如下，将name为James的第一个文档的age改为9999

```js
Student.updateOne(
    { name: 'Andy' },
    { age: '9999' }
)
    .then(result => {
        console.log(result);
    })
```

```js
// 导入
const mongoose = require('mongoose')
// 链接数据库
mongoose.connect('mongodb://localhost/my_db_01', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => { console.log('mongodb链接成功') })
    .catch((err) => { console.log('mongodb链接失败', err) })

// 创建集合规则
const studentSchema = new mongoose.Schema({
    name: String,
    age: Number,
    isStatus: Boolean
})
// 创建集合
const Student = mongoose.model('Student', studentSchema)

// 更新
Student.updateOne(
    { name: 'Andy' },
    { age: '9999' }
)
    .then(result => {
        console.log(result);
    })
```



### 更新多个

通过updateOne()，将多个文档的某个字段更新

返回值是个对象

```js
{
  n: 文档总数, 
  nModified: 修改的文档数, 
  ok: 1 
}
```

如下，将所有文档的age改为999

```js
Student.updateMany(
    {},
    { age: '9999' }
)
    .then(result => {
        console.log(result);
    })
```

```js
// 导入
const mongoose = require('mongoose')
// 链接数据库
mongoose.connect('mongodb://localhost/my_db_01', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => { console.log('mongodb链接成功') })
    .catch((err) => { console.log('mongodb链接失败', err) })

// 创建集合规则
const studentSchema = new mongoose.Schema({
    name: String,
    age: Number,
    isStatus: Boolean
})
// 创建集合
const Student = mongoose.model('Student', studentSchema)

// 更新
Student.updateMany(
    {},
    { age: '9999' }
)
    .then(result => {
        console.log(result);
    })
```





## mongoose验证规则

创建集合规则时，可设置字段的验证规则

若插入文档时验证不合格，不插入数据库

```js
const studentSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 20
    },
  	age: {
  		type: Number，
  		min: 18,
      max: 30
		},
  	time: {
      type: Date,
      default: Date.now
    }
})
```



### required

---

#### required：true

创建集合规则中的字段默认是在创建文档时可有可没有

```js
const studentSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    }
})
```

---

#### 自定义报错信息

```js
const studentSchema = new mongoose.Schema({
    name: {
      type: String,
      required:  [ true, 'name字段是必须的' ]
    }
})
```



### minlength maxlength

字符串最小长度 最大长度

如下；规定title字段的长度为 2～10

```js
const studentSchema = new mongoose.Schema({
    title: {
      type: String,
      minlength: 2,
      maxlength: 20
    }                                     
})
```

---

#### 自定义错误信息

如下：自定义报错信息

```js
const studentSchema = new mongoose.Schema({
    title: {
      type: String,
      minlength: [ 2, '长度不能小于2'],
      maxlength: [ 20, '长度不能大于20']
    }                                     
})
```



### trim

#### trim: true

去除字符串两边的空格

```js
const studentSchema = new mongoose.Schema({
    title: {
      type: String,
      trim: true
    }                                     
})
```



### min max

数字的最小值 最大值

如下：age字段的范围 18～30

```js
const studentSchema = new mongoose.Schema({
  	age: {
  		type: Number，
  		min: 18,
      max: 30
		}                                      
})
```



### default

默认值

```js
const studentSchema = new mongoose.Schema({
  	time: {
      type: Date,
      default: Date.now
    }
})
```



### enum

限定只能传入指定的值，数组形式

如下：category字段在创建文档时只能传入JavaScript和PHP两个值

```js
const studentSchema = new mongoose.Schema({
  	category: {
      type: String,
      enum:['JavaScript','PHP']
    }
})
```

---

#### 自定义错误信息

```js
const studentSchema = new mongoose.Schema({
  	category: {
      type: String,
      enum: {
        values: ['JavaScript','PHP'],
        message: '自定义报错信息'
      }
    }
})
```





### validate 自定义验证器

如下：规定name字段长度必须大于4，否则报错

```js
const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        validate: {
            validator: v => {
                return v && v.length > 4
            },
            message: '自定义报错提示信息'
        }
    }
})
```



### 获取所所有报错信息

通过Promise形式向数据库中集合插入文档时

- then() 方法的参数获取的是执行成功的结果

- catch() 方法的参数获取的是报错对象

若是插入文档时因字段规则验证不通过导致的报错，

可能会存在多个字段不符合验证规则的场合，

所以想获取返回的报错信息，需要便遍历错误对象

```js
Students.create({
  xxx:'xxx',
  xxx:'xxx',
  xxx:'xxx',
})
  .then(result=>{
  	console.log(result)
	})
	.catch(error=>{
  	const err = error.errors
    
    for(var attr in err){
      console.log(err[attr]['message'])
    }
	})
```





## 集合关联（重要）

不同集合之间是有关联的，比如：

| 文章集合 | 用户信息集合 |
| :------: | :----------: |
|   _id    |     _id      |
|  title   |     name     |
|  author  |     age      |

信息量特别多时，没有必要将所有信息写入一个集合

一般时通过 _id字段对不同集合进行关联



### _id 关联集合

1. 使用 _id 字段对不同集合进行关联

   将用户集合的_id 字段的值，作为文章集合的author字段的值

```js
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/mydb_01', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => { console.log('mongodb链接成功') })
    .catch((err) => { console.log('mongodb链接失败', err) })


//  1. 创建 User 用户集合
const User = mongoose.model('User', new mongoose.Schema({
    name: String,
    age: Number
}))

// 2. 创建 Composition 文章集合
const Composition = mongoose.model('Composition', new mongoose.Schema({
    title: String,
    // 通过 _id字段关联集合
    author: {
        type: mongoose.Schema.Types.ObjectId,// _id字段的数据类型
        ref: 'User'  // 要关联的集合
    }
}))

// 3. User集合 创建插入文档
User.create({
    name: 'Andy',
    age: 28
})
    .then((res) => {
        console.log(res);
    })
    .catch(err => {
        console.log(err);
    })

// 4. Composition集合 创建插入文档
Composition.create({
    title: 'No1',
    author: '60cf0a3f274c6b1792dc90e8'
})
    .then((res) => {
        console.log(res);
    })
    .catch(err => {
        console.log(err);
    })


// 查询
Composition
    .find()
    // .populate('author')
    .then((res) => {
        console.log(res);
    })
    .catch(err => {
        console.log(err);
    })

```

但是，这样查询的结果并没有讲两个集合关联起来

```js
[
  {
    _id: 60cf0b24cf58d017a123548b,
    title: 'No1',
    author: 60cf0a3f274c6b1792dc90e8,
    __v: 0
  }
]
```



###  populate() 查询关联

所以查询时需要通过 populate()

```js
集合.find()
	.populate('关联的字段')
	.then(result=>{
     console.log(err);  
	})
```

```js
[
  {
    _id: 60cf0b24cf58d017a123548b,
    title: 'No1',
    author: { 
    		_id: 60cf0a3f274c6b1792dc90e8, 
    		name: 'Andy', 
    		age: 28, 
    		__v: 0 
  	},
    __v: 0
  }
]
```

