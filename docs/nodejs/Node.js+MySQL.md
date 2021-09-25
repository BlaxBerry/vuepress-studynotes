## mysql模块 与 MySQL数据库

mysql是npm的一个第三方模块

用于在Node.js项目中链接、操作MySQL数据库

基本步骤：

1. 安装第**三方模块mysql**

2. 通过mysql模块**链接到MySQL数据库**
3. 通过mysql模块**执行SQL语句**

---

### 安装配置与链接测试

1. 安装：

```bash
npm i mysql
```

2. 然后链接数据库需要配置：
   - **host**：数据库IP地址（哪一个电脑上的MySQL数据）
   - **user**：登陆数据库的账号
   - **password：**登陆数据库的密码
   - **database：**指定操作的数据库名

```js
// 1. 导入
const mysql = require('mysql')

// 2. 建立与MySQL数据库的链接
const db = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'admin123',
    database: 'students'
})
```

3. 执行SQL语句查询数据

   通过 **db.query() 执行SQL语句**，通过回调函数拿到执行结果

```js
const sqlStr = 'SQL语句';

db.query(sqlStr, (err, res) => {
    if (err) {
        return console.log('链接MySQL失败', err.message);
    }else {
        console.log(res);
    }
})
```

终端node命令执行该文件

以**数组形式**返回数据表

```js
db.query('SELECT 1', (err, res) => {
    if (err) {
        return console.log('链接MySQL失败', err.message);
    }else {
        console.log(res);
    }
})
// 其中的‘select 1’没有任何实质作用，只是测试用
// 终端node执行该文件返回 [ RowDataPacket { '1': 1 } ]
// 说明链接数据库成功
```



### mysql模块查询数据

```js
const sqlStr = 'SELECT 字段 FROM 表名';

db.query(sqlStr, (err, res) => {
    if (err) {
        return console.log('链接MySQL失败', err.message);
    }else {
        console.log(res);
    }
})
```

---

如下：

假设MySQL数据库在本机

其中有一个students数据库，并有一个 class_A数据表

- JS文件：

```js
const mysql = require('mysql')

const db = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'admin123',
    database: 'students'
})


const sqlStr = 'SELECT * FROM class_A';

db.query(sqlStr, (err, res) => {
    if (err) {
        return console.log('链接MySQL失败', err.message);
    }else {
        console.log(res);
    }
})
```

- 终端node执行该JS文件结果：

  以**数组形式**返回数据表，每一数据行都是一个**对象**

```bash
[
  RowDataPacket {
    id: 1,
    name: 'Andy',
    gender: '1',
    age: '28'
  },
  RowDataPacket {
    id: 2,
    name: 'Lili',
    gender: '2',
    age: '26'
  },
  RowDataPacket {
    id: 3,
    name: 'Jerry',
    gender: '1',
    age: '40'
  }
]
```



### mysql模块插入数据

1. 先声明要执行的SQL语句字符串，
2. 然后通过SQL语句的 **? 占位符** 空出数据的具体值
3. db.query() 调用SQL语句字符串，和**数组形式**的具体填充值
4. 根据 **res.affectedRows === 1** 判断是否数据插入成功

```js
const 要插入数据库的对象 = {
 //  xxx:xxx,
 //  xxx:xxx
 //  ...
}

const sqlStr = 'INSERT INTO 表名(字段,字段) VALUES (?,?)'

db.query(sqlStr, [对象.属性, 对象.属性], (err,res)=>{
  if(err)return console.log(err.message)
  if(res.affectRows === 1){
    console.log('数据插入成功')
  }
})
```

如下：

```js
const people = {
  name: '奥特曼'，
  age: 1000
}

const sqlStr = 'INSERT INTO class_A (name,age) VALUES (?,?)'

db.query(sqlStr, [people.name, people.age], (err,res)=>{
  if(err)return console.log(err.message)
  if(res.affectRows === 1){
    console.log('数据插入成功')
  }
})

// sql模块insert into插入数据的回调函数res是个对象
```

---

#### 简写

若插入的数据对象的**属性**和数据库中的**字段** 是**一一对应**的话

db.query()调用的 SQL语句写作 **INSERT INTO 表名 SET ?**

db.query() 带入SQL语句字符串和目标对象

```js
const 要插入数据库的对象 = {
 //  xxx:xxx,
 //  xxx:xxx
 //  ...
}

const sqlStr = 'INSERT INTO 表名 SET ?'

db.query(sqlStr, 要插入数据库的对象, (err,res)=>{
  if(err)return console.log(err.message)
  if(res.affectRows === 1){
    console.log('数据插入成功')
  }
})
```

如下：

```js
const people = {
  name: '奥特曼',
  gender:'1'
  age: '1000',
  
}

const sqlStr = 'INSERT INTO SET ?'

db.query(sqlStr, [people.name, people.age], (err,res)=>{
  if(err)return console.log(err.message)
  if(res.affectRows === 1){
    console.log('数据插入成功')
  }
})

// sql模块insert into插入数据的回调函数res是个对象
```



### mysql模块更新数据

1. 先声明要执行的SQL语句字符串，

2. 然后通过SQL语句的 **? 占位符** 空出数据的具体值

3. db.query() 调用SQL语句字符串，和**数组形式**的具体填充值

   按顺序填充上？占位符

4. 根据 **res.affectedRows === 1** 判断是否数据更新成功

```js
const 要修改的数据对象 = {
 //  xxx:xxx,
 //  xxx:xxx
 //  ...
}
const sqlStr = 'UPDATE 表名 SET 字段=?,字段=? WHERE 字段=?'

db.query(sqlStr, [对象.属性,对象.属性], (err, res) => {
    if (err) return console.log('更新失败', err.message);
    if (res.affectedRows === 1) {
        console.log('更新成功');
    }
})
```

如下：

```js
const people = {
    id: 8,
    name: '雷欧奥特曼',
    age: '55555'
}
const sqlStr = 'UPDATE class_A SET name=?,age=? WHERE id=?'

db.query(sqlStr, [people.name, people.age, people.id], (err, res) => {
    if (err) return console.log('更新失败', err.message);
    if (res.affectedRows === 1) {
        console.log('更新成功');
    }
})
```

---

#### 简写

若插入的数据对象的**属性**和数据库中的**字段** 是**一一对应**的话

db.query()调用的 SQL语句写作 **UPDATE 表名 SET ? WHERE 字段=？**

db.query() 带入SQL语句字符串和目标对象

因为WHERE用于指定，所以除了带入对象还要额外带入WHERE条件的占位符具体值

```js
const 要修改的数据对象 = {
 //  xxx:xxx,
 //  xxx:xxx
 //  ...
}
const sqlStr = 'UPDATE 表名 SET ? WHERE 字段=?'

db.query(sqlStr, [目标对象, 对象.属性], (err, res) => {
    if (err) return console.log('更新失败', err.message);
    if (res.affectedRows === 1) {
        console.log('更新成功');
    }
})
```

```js
const people = {
    id: 9,
    name: '艾斯奥特曼',
    age: '55555'
}

const sqlStr = 'UPDATE class_A SET ? WHERE id=?'

db.query(sqlStr, [people, people.id], (err, res) => {
    if (err) return console.log('更新失败', err.message);
    if (res.affectedRows === 1) {
        console.log('更新成功');
    }
})
```



### mysql模块删除数据

建议使用唯一标识 **id** 来指定删除的数据

1. 先声明要执行的SQL语句字符串，

2. 然后通过SQL语句的 **? 占位符** 空出数据的具体值

3. db.query() 调用SQL语句字符串，和**数组形式**的具体填充值

   只有一个占位符时，数组可省略

4. 根据 **res.affectedRows === 1** 判断是否数据插入成功

```js
const sqlStr = 'DELETE FROM 表名 WHERE id=?'

db.query(sqlStr, ID数字, (err, res) => {
    if (err) return console.log('删除失败', err.message);
    if (res.affectedRows === 1) {
        console.log('删除成功');
    }
})
```

如下：

```js
const sqlStr = 'DELETE FROM class_A WHERE id=?'

db.query(sqlStr, 8, (err, res) => {
    if (err) return console.log('删除失败', err.message);
    if (res.affectedRows === 1) {
        console.log('删除成功');
    }
})
```

---

#### 标记删除（重要）

因为DELETE会直接从数据表中删除数据，不安全，无法恢复

应该使用标记删除的方式模拟删除，而不是直接删除

在数据表中设定一个**表示状态的字段**status，标记该行数据是否被删除，

即，标记删除的实质是：**执行UPDATE语句修改status字段的值**

> status字段的数据格式：
>
> tinyint(1)：布尔值
>
> ​	0：正常
>
> ​	1：禁用

```js
db.query('UPDATE 表名 SET status=1 WHERE id=?', [1,ID数], (err, res) => {
    if (err) return console.log('删除失败', err.message);
    if (res.affectedRows === 1) {
        console.log('标记删除成功');
    }
})
```

如下:

```js
db.query('UPDATE class_A SET status=1 WHERE id=?', [1,6], (err, res) => {
    if (err) return console.log('删除失败', err.message);
    if (res.affectedRows === 1) {
        console.log('标记删除成功');
    }
})
```

