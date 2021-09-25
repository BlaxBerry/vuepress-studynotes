# Class类

创建和实例对象

```js
class 类 {
}

const 实例对象01 = new 类()
const 实例对象02 = new 类()
```





## 实例属性

## 类属性



## 构造函数 constructor

类的构造器函数不是必须的，若不手动定义会自动生成

只有对实例进行初始化操作（添加指定属性）时才需要

通过new生成实例对象时会自动调用，由实例对象调用

```js
class Person {
    constructor(){
    }
}
new Person()
```

### 参数的传递与接收

constructor构造函数用于接收传递来的参数

并参数返回给生成的各个实例对象

```js
class Person {
    constructor(name,age){
      this.username = name;
      this.age = age
    }
}
var andy = new Person('andy',28);
var tom = new Person('tom',10);

console.log(andy.username,andy.age);
// andy 28
console.log(tom.username,tom.age);
// tom 10
```

### this

构造器函数中的 **this** 指向实例对象





## 实例方法

```js
class Person{
    fn(){
        console.log('hello');
    }
}
var a = new Person()
a.fn()  // hello
```

### 调用其他方法

通过 **this.方法名**获取其他实例方法

```js
class Person{
    fn(){
        console.log('hello');
    }
    fn02(){
        this.fn()
    }
}
var a = new Person()
a.fn02()  // hello
```

-  **this.方法名**：不直接执行
-  **this.方法名( )**：直接执行函数





## this

### this指向

- 构造函数中的 **this**：指向实例对象
- 一般函数中的 **this**：指向该函数方法的调用者

```html
<button id="btn" name="button">click</button>

<script>
  class Handle {
    constructor(name) {
      console.log(this); // 实例对象
      
      this.name = name;
      this.btn = document.getElementById("btn");
      
      this.btn.onclick = this.normalFn; 
      this.btn.onclick = this.arrowFn;
    }
    
    normalFn() {
      console.log(this); // HTML元素btn
      console.log(this.name); // btn的name属性，button
    }

    arrowFn = () => {
      console.log(this); // 实例对象
    };
  
  
    call_01() {
      console.log(this); // 实例对象
      console.log(this.name); // andy
    }
  	call_02 = ( )=> {
      console.log(this); // 实例对象
      console.log(this.name); // andy
    }
  }

  new Handle("andy");
</script>
```

因为一般函数中的 **this**指向该函数方法的调用者

涉及到类中调用类中方法时，

可通过bind(this)强制指定调用该方法的调用者

或使用箭头函数



### bind(this)

```js
class Handle {
    constructor(name) {
      this.name = name;
      this.btn = document.getElementById("btn");
      this.btn.onclick = this.click.bind(this);
    }
    click() {
      console.log(this);  // 实例对象
      console.log(this.name);   //andy
    }
}

new Handle("andy");
```





## 继承

```js
class Father{
}

class Son extends Father{
}
```

子类继承父类中的所有属性和方法

```js
class Father{
    say(){
        console.log('from Father');
    }
}

class Son extends Father{
}

var son = new Son()
son.say()  // from Father
```

### 继承方法的重写

子类中若有和父类同名的方法，则调用时优先使用子类的方法。但不会修改父类的方法

```js
class Father{
    fn(){
        console.log(11111);
    }
}

class Son extends Father{
    fn(){
        console.log(22222);
    }
}

var son = new Son()
son.fn()  // 222222
```

### super

通过super关键字，使子类可访问调用父类的方法

- **调用父类普通函数**

```js
class Father{
    say(){
        console.log('from Father');
    }
}

class Son extends Father{
    fn(){
        super.say()
    }
}

var son = new Son()
son.fn() // from Father
```

- **调用父类的构造函数**

因为子类中的同名方法会重写覆盖父类，所以当子类中有构造函数constructor时，需要super()调用父类的构造函数，不然会因为重写导致无法继承使用父类中的方法

super()调用父类的构造函数时，通过传参将子类接收的实例对象的参数传入父类

 且super() ，必须放在子类构造函数中所有内容最前面

```js
class Father {
    constructor(name, age) {
        this.username = name;
        this.age = age
    }
    fn() {
        console.log(this.username, this.age);
    }
}

class Son extends Father {
    constructor(name, age) {
        super(name, age)
    }
}

var son = new Son('andy',28)
son.fn()  // andy 28
```



### 子类自己的属性

若子类除了继承父类构造函数内容，还有自己特有的内容

即必须先通过 **super()** 调用父类构造器，然去传递子类接受的参数给子类和父类共同的内容

```js
class Person {
  constructor(name,age){
    this.name = name;
    this.age = age
  }
  say(){
    console.log(this.name,this.age)
  }
}

class Student {
  constructor(name,age,grade){
    super(name,age)
    this.grade = grade;
  }
}

const a = new Student('tom',18,"高一")
```







## 





类中的方法默认开启了严格模式

（直接调用的函数中的this从指向window变为指向undefined）

所以最终this指向undefined









## 直接给类定义属性

```js
class Person {
    gender = "male"
    say = ()=>{
        console.log('hello');
    }
}
const p = new Person()

console.log(p) // {gender: "male", say: ƒ}
console.log(Person); 
console.log(p.gender,p.say) // male ()=>{console.log('hello')}
p.say() // hello
console.log(Person.gender,Person.say); // undefined undefined
```