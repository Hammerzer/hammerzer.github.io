---
title: JavaScript 入门即精通
description: 关于JavaScript的知识框架
urlname: master-JavaScript
date: 2020-09-22
tags: [JS]
categories: 前端开发
draft:
---
> [!tip] 最新的JavaScript开发指南：[Mmdn](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide)
# 一 JavaScript 基础问题
## 1 JS 白屏

### 白屏原因

1. 在弱网络下(2G网路或者GPRS网络) ，网络延迟、JS加载延迟 ，会阻塞页面。
2. 客户端存在bug，缓存模块错乱，不缓存js等后来挂起的文件，以及乱缓存index.html。

### 白屏优化实践

> 待补充

## 2 JS `FOUC` 原理

**浏览器样式闪烁**

如果使用import方法对css进行导入，会导致某些页面在Windows 下的`Internet Explorer`出现一些奇怪的现象：**以无样式显示页面内容的瞬间闪烁**

这种现象称之为**文档样式短暂失效**(Flash of Unstyled Content)，简称为FOUC。

**原因大致为：**

1. 使用import方法导入样式表。
2. 将样式表放在页面底部
3. 有几个样式表，放在html结构的不同位置。

> 其实原理很清楚：
>
> 当样式表晚于结构性html 加载，当加载到此样式表时，页面将停止之前的渲染。此样
>
> 式表被下载和解析后，将重新渲染页面，也就出现了短暂的花屏现象。

**解决方法**：使用link标签将样式表放在文档head中

## 3 async   await   defer

### 3.1 async

带`async`关键字的函数，是声明异步函数，返回值是promise对象，如果`async`关键字函数返回的不是promise，会自动用Promise.resolve()包装。

```js
async function test() {
    return 'test'
}
test();
```

返回值为 `Promise {<resolved>: "test"}`。

### 3.2 await

`await`等待右侧表达式的结果，这个结果是promise对象或者其他值。

- 如果它等到的不是一个 promise 对象，那 `await` 表达式的运算结果就是它等到的东西。
- 如果它等到的是一个 promise 对象，await 就忙起来了，它会阻塞后面的代码，等着 promise 对象 resolve，然后得到 resolve 的值，作为 `await` 表达式的运算结果。

```js
function test() {
    return new Promise(resolve => {
        setTimeout(() => resolve("test"), 2000);
    });
}

const result = await test();
console.log(result);
console.log('end')
```

由于`test()`造成的阻塞，`console.log('end')`会等到两秒后执行

所以为了避免造成阻塞，await 必须用在 async 函数中，async 函数调用不会造成阻塞。

```js
function test() {
    return new Promise(resolve => {
        setTimeout(() => resolve("test"), 2000);
    });
}

async function test2() {
    const result = await test();
    console.log(result);
}
test2();
console.log('end');
```

先执行console.log('end')，两秒后执行console.log('test')

如果await用在普通函数中，会报错，如下：

![](js-concept-await.png)

### 3.3 async/await的执行顺序

遇到await会阻塞后面的代码，先执行async外面的同步代码，同步代码执行完，再回到async内部，继续执行await后面的代码。以下面的代码分析：

```js
async function test1() {
    console.log('start test1');
    console.log(await test2());
    console.log('end test1');
}
async function test2() {
    console.log('test2');
    return await 'return test2 value'
}
test1();
console.log('start async');
setTimeout(() => {
	console.log('setTimeout');
}, 0);
new Promise((resolve, reject) => {
    console.log('promise1');
    resolve();
    }).then(() => {
   	 	console.log('promise2');
});
console.log('end async');
```

执行的结果

![](js-concept-await-demo.png)

- 首先执行宏任务，执行`test1`函数，执行`console.log('start test1')`
- 遇到`await`，先执行右边`test2中的console.log('test2')`，中断了后面的代码，执行`test1`外面的同步代码
- 执行`console.log('start async')`
- 遇到`setTimeout`，推到到下个宏任务队列中
- 执行Promise里面的同步代码`console.log('promise1')`
- 运行到`promise().then`，发现是promise对象，推到微任务队列中
- 执行`console.log('end async')`
- `test1`外面的同步代码执行结束后，回到`test1`中，`console.log(await test2())`执行完成后**<u>返回Promise</u>** {`<resolved>`: "return test2 value"}，是promise对象，推到微任务队列中
- 此时第一个宏任务结束，执行所有的微任务，因为微任务队列先进先出，所以先执行`console.log('promise2')`，后执行`console.log('return test2 value')`
- 执行test2完成后，后面的代码不再阻塞，执行`console.log('end test1')`
- 执行下个宏任务，即执行`console.log('setTimeout')`



**补充下有关宏任务和微任务的知识**

宏任务和微任务都是队列，宏任务有`script`、`setTimeout`、`setInterval`等，微任务有`Promise.then catch finally`、`process.nextTick`等，宏任务和微任务的关系如下：

![](js-await-task.jpg)

### 3.4 async/await的优缺点

**1. 优点**

相对于`promise`，`async/await`处理 then 的调用链，代码要清晰很多，几乎和同步代码一样

**2. 缺点**

滥用 await 可能会导致性能问题，因为 await 会阻塞代码

### 3.5 处理reject

**1. try/catch**

```js
async function fn() {
    try {
        await new Promise((resolve, reject) => {
            setTimeout(() => {
            	reject('err3');
            }, 1000);
    	})
	} catch (err){
    	alert(err)
    }
}
fn()
```

**2. catch**

```js
async function fn() {
    await new Promise((resolve, re	ject) => {
        setTimeout(() => {
            reject('err');
        }, 1000);
    })
}
fn().catch(alert)
```



### 3.6 脚本加载标志 `async`  `defer`

1. 没有 `defer` 或 `async`，浏览器会立即加载并执行指定的脚本，“立即”指的是在渲染该 script 标签之下的文档元素之前，也就是说不等待后续载入的文档元素，读到就加载并执行。
```html
   <span style="color:red;">
	   <script src="script.js"></script>
   </span>
```

2. 有 `async`，加载和渲染后续文档元素的过程将和 `script.js` 的加载与执行并行进行（异步）
```html
   <span style="color:red;">
	   <script async src="script.js"></script>
   </span>
```

3. 有 `defer`，加载后续文档元素的过程将和 `script.js` 的加载并行进行（异步），但是 `script.js` 的执行要在所有元素解析完成之后，`DOMContentLoaded` 事件触发之前完成
```html
   <span style="color:red;">
	   <script defer src="myscript.js"></script>
   </span>
```

然后从实用角度来说呢，首先把所有脚本都丢到 `</body>` 之前是最佳实践，因为对于旧浏览器来说这是唯一的优化选择，此法可保证非脚本的其他一切元素能够以最快的速度得到加载和解析。

![](js-defer-1.jpg)

蓝色线代表网络读取，红色线代表执行时间，这俩都是针对脚本的；绿色线代表 HTML 解析。

**此图告诉我们以下几个要点：**

1. *defer* 和 *async* 在网络读取（下载）这块儿是一样的，都是异步的（相较于 HTML 解析）
2. 差别在于脚本下载完之后何时执行，显然 *defer* 是最接近我们对于应用脚本加载和执行的要求的
3. 关于 *defer*，此图未尽之处在于它是按照加载顺序执行脚本的，这一点要善加利用
4. *async* 则是一个乱序执行的主，反正对它来说脚本的加载和执行是紧紧挨着的，所以不管你声明的顺序如何，只要它加载完了就会立刻执行
5. 仔细想想，*async* 对于应用脚本的用处不大，因为它完全不考虑依赖（哪怕是最低级的顺序执行），不过它对于那些可以不依赖任何脚本或不被任何脚本依赖的脚本来说却是非常合适的，最典型的例子：Google Analytics

> 一图胜千言

![](js-defer-2.jpg)

## 4 原型链

> 膜拜这位简书大佬   [彻底理解js的原型链](https://www.jianshu.com/p/116ea3be6ef5)
>
> 写的太牛博以至于我只能转载  
>
> --  本文主要参考了[MDN文档](https://link.jianshu.com/?t=https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Inheritance_and_the_prototype_chain)和[知乎讨论](https://link.jianshu.com/?t=https://www.zhihu.com/question/34183746)。

### 由浅入深的理解原型链

在js中，大部分东西都是对象，数组是对象，函数也是对象，对象更加是对象。**不管我们给数组和函数定义什么内容，它们总是有一些相同的方法和属性**。比如说hasOwnProperty()，toString()等：

![](chrome.png)

**这说明一个对象所拥有的属性不仅仅是它本身拥有的属性，它还会从其他对象中继承一些属性。当js在一个对象中找不到需要的属性时，它会到这个对象的父对象上去找，以此类推，这就构成了对象的原型链**。理解js的原型链对使用js的对象非常有帮助。

> Chrome强大的控制台可以显示出每一个对象所有的属性！包括prototype、__proto__、constructor等

让我们通过一个例子由浅到深地理解原型链：

```js
function Foo(_name) {
  this.name = _name;
}
Foo.prototype.show = function() {
  console.log('I am ', this.name);
};
var f1 = new Foo('obj1');
var f2 = new Foo('obj2');

f1.show();  //  I am obj1
f2.show();  //  I am obj2
```

这是我们经常使用的创建对象的方式，将共同的方法放到Foo.prototype中，所有实例都共有这个方法了。

这是怎么实现的呢？我们看下面这张图的第一行：

![](prototype.jpg)

#### 原型

**先只用看第一行**

我们定义的show函数在Foo.prototype中，当我们执行`f1.show()`时，js发现f1本身没有show这个属性，所以它就到f1的原型（也就是`__proto__`指向的对象）去找，找到了就可以调用。

> 注：每个对象都有一个方法`hasOwnProperty()`来检查对象本身是否有某个属性，如果有则返回true；如果这个属性在它的原型链上或原型链上都没有，则返回false；

图片第一行告诉了我们4点：

1. **所有函数都有一个prototype指针**，指向原型对象，如图中的Foo的prototype指针。prototype指针的意义是，当我们使用这个构造函数new出新对象的时候，**新对象的原型是谁**。
2. **构造函数的prototype所指向的原型对象**有一个constructor指针，指回构造函数。如图中Foo.prototype的constructor指针指向Foo。constructor指针有助于我们找到一个对象的构造函数是谁。
3. __proto__**每个对象都有**，js在new一个对象的时候，会将它的__proto__指向**构造函数的prototype指向的那个对象**。在上图中，f1、f2这些实例对象的__proto__都指向了Foo.prototype。
4. 如果一个对象的__proto__指向了另一个对象，那么前者就继承了后者的所有属性。

> 请注意`__proto__`与prototype的区别！`__proto__`才是真正连接原型链的东西，而prototype只是构造函数的一个指针属性而已。

#### Js原生对象的继承关系

**理解了这个小例子我们就可以往图片的下面看了，它展示了js原生对象的继承关系是怎么样的。**

我们先看看Foo的原型吧！Foo是一个函数，它的构造函数是js内部的function Function()，Function的prototype指向了一个对象Function.prototype，因此Foo的`__proto__`就指向了`Function.prototype`，如图。

> 所有的函数都以function Function()为构造函数，因此，所有函数**（包括function Function()和function Object()）**的`__proto__`都指向Function.prototype这个对象，这个对象中定义了所有函数都共有的方法，比如call()、apply()等。

我们继续深入下去，Function.prototype这个对象，它就是一个普通的对象，它的构造函数是js内置的function Object()，function Object()的prototype指向Object.prototype，因此Function.prototype.`__proto__`就指向Object.prototype，这个对象中定义了所有对象共有的属性，比如我们之前说的hasOwnProperty()和toString()等。

> 同理，Foo.prototype和其他自定义的对象也是`__proto__`指向Object.prototype对象，就不需要说明了。

Object.prototype就是原型链的终点了，它的`__proto__`是null，js查找属性时，如果到这里还没有找到，那就是`undefined`了。

到这里就不难理解为什么我们说在js中，函数也是对象了，它就是继承自对象的！



### 由原型链到继承和对象声明

> 转载自[JS中原型链的理解](https://www.cnblogs.com/xfcao/p/10029731.html)

`new`操作符具体干了什么呢?其实很简单，就干了三件事情。

```
var obj  = {};
obj.__proto__ = Base.prototype;
Base.call(obj);
```

- 第一行，我们创建了一个空对象obj
- 第二行，我们将这个空对象的__proto__成员指向了Base函数对象prototype成员对象
- 第三行，我们将Base函数对象的this指针替换成obj，然后再调用Base函数，于是我们就给obj对象赋值了一个id成员变量，这个成员变量的值是”base”，关于call函数的用法。

在谈原型链之前，我们首先要了解自定义函数与 Function 之间是什么关系，而构造函数、原型和实例之间又存在什么千丝万缕的关系呢？

其实，所有的函数都是 `Function` 的实例。

在构造函数上都有一个原型属性 `prototype`，该属性也是一个对象；那么在原型对象上有一个 `constructor` 属性，该属性指向的就是构造函数；而实例对象上有一个 `_proto_` 属性，<span style="color:red;font-weight:bold;">该属性也指向原型对象，并且该属性不是标准属性，不可以用在编程中，该属性用于浏览器内部使用</span>。

#### 1.  构造函数、原型和实例之间的关系

 **`_proto_`**

- 在函数里有一个属性prototype
- 由该函数创建的对象默认会连接到该属性上

**prototype 与 `_proto_` 的关系**

- `_proto_`是站在对象角度来说的
- prototype 是站在构造函数角度来说的

#####   ①+Object

![](prototype-1.png)

#####  ②+Function+Object+Array

![](prototype-2.png)

接下来再来讨论什么是原型链。其实，就是有限的实例对象和原型之间组成有限链，就是用来实现共享属性和继承的。下面，我们看代码：

```js
var obj = new Object();
// 对象是有原型对象的
// 原型对象也有原型对象
// obj._proto_._proto_._proto_
// 原型对象也有原型对象，对象的原型对象一直往上找，会找到一个null
// 原型链示例
var arr = [];
// arr -> Array.prototype -> Object.prototype -> null
var o = new Object();
// o -> Object.prototype -> null;
```

```js
function Foo1(){
   this.name1 = '1';
}
function Foo2(){
   this.name2 = '2';
}
Foo2.prototype = new Foo1();
function Foo3(){
   this.name = '3';
}
Foo3.prototype = new Foo2();
var foo3 = new Foo3();
console.dir(foo3);
```

![](prototype-3.png)

![](prototype-4.png)

#### 2. 继承

##### 2.1 原型继承

```js
function Animal(name){
	this.name = name;
}
function Tiger(color){
	this.color = color;
}
//   var tiger = new Tiger('yellow');
//   console.log(tiger.color);
//   console.log(tiger.name);  //undefined
//   Tiger.prototype = new Animal('老虎');   //一种方式
Object.prototype.name = '大老虎';   //第二种方式
var tiger = new Tiger('yellow');
console.log(tiger.color);
console.log(tiger.name);
```

**值得注意的是，这里存在两个主要的问题：**

 ①它不方便给父级类型传递参数；

 ②父级类型当中的引用类型被所有的实例共享

##### 2.2 ES5 提供了Object.create() 方法来实现继承

这种方法是ES5的新特性，其实就是**复制继承**。

```js
————做兼容
//shim垫片
function create(obj){
	if(Object.create){
		return Object.create(obj);
	}else{
		function Foo(){}
		Foo.prototype = obj;
		return new Foo();
	}
}
```

##### 2.3 拷贝继承

初始化 `obj` 时，生成相应的 `__proto__`；通过此函数获取继承属性

```js
var obj = {};
obj.extend = function(obj){
	for(var k in obj){
		this[k] = obj[k];
	}
}
```

##### 2.4 借用构造函数继承

被借用的构造函数中原型上的成员没有被借过来

```js
function Animal(name){
    this.name = name;
}
function Mouse(nickname){
    console.log(this);
    Animal.call(this,'老鼠');
    this.nickname = nickname;
}
var m = new Mouse('杰瑞');
console.log(m.name);
console.log(m.nickname);
```

**存在的问题：**可以解决原型继承当中传参问题，但是父类型当中的原型对象上的成员（属性和方法）不能被继承到

##### 2.5 组合继承

——prototype对象是有动态性的

```js
function Person(name){
   this.name = name;
}
Person.prototype.showName = function(){
   console.log(this.name);
}
function Student(name,age){
   Person.call(this,name);
   this.age = age;
}
Student.prototype = new Person();
Student.prototype.contructor = Student;
Student.prototype.showAge = function(){
    console.log(this.age);
}
var stu = new Student('张三',12);
stu.showName();
stu.showAge();
```

【原型继承+借用构造函数继承】它的特点就是属性每个实例一份，方法共享



**【小结】**套用一句很粗暴的话，所谓原型链就是找妈的一种行为方式，就可以理解为人是人他妈生的，妖是妖他妈生的。原型链的核心其实就只有一个：属性共享和独立的控制，当你的对象实例需要独立的属性，所有做法的本质都是在对象实例里面创建属性。若不考虑太多，你大可以在Person里面直接定义你所需要独立的属性来覆盖掉原型的属性。总之，使用原型继承的时候，要对于原型中的属性要特别注意，因为他们都是牵一发而动全身的存在。现在最常用的方法是**组合模式**。

#### 3. 总结

##### 3.1 原型链

  **1）构造函数、原型和实例的关系**

​    ①构造函数都有一个属性prototype，这个属性是一个对象（Object的实例）

​    ②原型对象prototype里面有一个constructor属性，该属性指向原型对象所属的构造函数

​    ③实例对象都有一个_proto_属性，该属性也指向构造函数的原型对象，它是一个非标准属性，不可以用于编程，它是用于浏览器自己使用的

  **2）prototype与_proto_的关系**

​    ①prototype是构造函数的属性

​    ②`_proto_`是实例对象的属性

​          ——这两者都指向同一个对象

  <u>【总结】</u>

​	  i）函数也是对象，对象不一定是函数；

​      ii）对象的本质：无序的键值对集合；键值对当中的值可以是任意数据类型的值

​      iii）对象就是一个容器，这个容器当中放的是（属性和方法）

  **3）属性搜索**

  　　① 在访问对象的某个成员的时候会先在对象中找是否存在

  　　② 如果当前对象中没有就在构造函数的原型对象中找

  　　③ 如果原型对象中没有找到就到原型对象的原型上找

  　　④ 知道`Object`的原型对象的原型是null为止

##### 3.2 Function

**——所有函数都是Function的实例**

  ①本地对象：独立于宿主环境（浏览器）的对象

```
——  包括Object、Array、Date、RegExp、Function、Error、Number、String、Boolean
```

  ②内置对象——包括Math、Global（window，在js中就是全局变量），使用的时候不需要new

  ③宿主对象——包括`自定义对象`、`DOM`、`BOM`

#### 4. 回顾 `new` 操作符的使用过程

> 参考[JS中new一个对象的过程](https://www.cnblogs.com/kevin2chen/p/6418327.html)

使用new关键字调用函数（**new** ClassA**(…)**）的具体步骤：

**4.1 创建空对象；**

```js
var obj = {};
```

**4.2 设置新对象的constructor属性为构造函数的名称，设置新对象的`__proto__`属性指向构造函数的prototype对象；**

```js
obj.__proto__ = ClassA.prototype;
```

**4.3 使用新对象调用函数，函数中的this被指向新实例对象：**

```
ClassA.call(obj);　　//{}.构造函数(); 
```

**4.4 将初始化完毕的新对象地址，保存到等号左边的变量中**

注意：若构造函数中返回this或返回值是基本类型（number、string、boolean、null、undefined）的值，则返回新实例对象；若返回值是引用类型的值，则实际返回值为这个引用类型。

```
var foo = "bar";
function test () {
　　this.foo = "foo";
}
new test(); 					//test中的this指新对象，并未改变全局的foo属性
console.log(this.foo);      	// "bar"
console.log(new test().foo);  	// "foo";
```

**优先级问题：**

[优先级由高到低](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Operator_Precedence)：小括号(xxx) ---> 属性访问.  ---> new foo() ----> foo()

```
function getName(){
    console.log(1)
}
function Foo() {
    this.getName = function () {
        console.log(2); 
    };
    return this;
}
Foo.getName = function () {
    console.log(3);
};
//先从.属性访问符号开始往前面找一个最近的对象，同时注意new Foo()优先于Foo();
var a=new Foo.getName();//3;===new (Foo.getName)();返回Foo.getName类型的实例
var b=new Foo().getName();//2;===(new Foo()).getName()；返回undefined
var c=new new Foo().getName();//2;===new (new Foo().getName)();返回Foo.getName类型的实例
new Date().getTime();//===((new Date()).getTime)()
(new Date).getTime();
new Date.getTime();//Uncaught TypeError: Date(...).getTime is not a function；===new (Date.getTime)()
```

### 原型链相关实践应用

> 两道很不错的，而且讲的很完美的试题。
>
> 转载自  [陌上寒](https://www.jianshu.com/p/ae7afb5ba420)

#### 五条原型原则

1. 所有的引用类型（数组，对象，函数）都具有对象特性，即可自由扩展属性（除了null以外）
2. 所有的引用类型（数组，对象，函数），都有一个*proto*属性，属性值是一个普通的对象    （隐式原型）
3. 所有的函数，都有一个prototype属性，属性值也是一个普通的对象
4. 所有的引用类型（数组，对象，函数），*proto*属性值指向他构造函数的prototype属性值
5. 当试图得到一个对象的某个属性时，如果这个对象本身没有这个属性，那么会去它的*proto*(即它的构造函数的prototype)中寻找

#### 第一题

```javascript
function A() {}
function B(a) {
    this.a = a;
}
function C(a) {
    if (a) {
        this.a = a;
    }
}
A.prototype.a = 1;
B.prototype.a = 1;
C.prototype.a = 1;

console.log(new A().a);
console.log(new B().a);
console.log(new C(2).a);
```

我们一起拆解一下

```javascript
//新建一个构造函数A
function A() {}
//新建一个构造函数B，并添加一个自有属性a，属性a的值取决于传入的参数
function B(a) {
    this.a = a;
}
//新建一个构造函数C，如果有参数，则添加自有属性a，属性a的值为传入的参数值，
//如果没有传入参数，则构造函数C没有自有属性
function C(a) {
    if (a) {
        this.a = a;
    }
}
//在A的原型对象上添加一个属性a，属性a的值是1，(两个同理)
A.prototype.a = 1;
B.prototype.a = 1;
C.prototype.a = 1;
```

**求A的实例下属性a的值即new A().a**

构造函数`function A(){}`,是没有自有属性的，没有怎么办？顺着原型链查找，我们找到构造函数A的原型对象`A.prototype`，
 因为`A.prototype.a = 1`;
 所以`console.log(new A().a);`输出1
 还可以这么拆解

```javascript
var foo =  new A()
console.log(foo.a)
```

同样的构造函数A下面找不到属性`a`，那就得顺着原型链查找，即`foo._proto_`我们知道
 五条原型原则的第四条

> 4     所有的引用类型（数组，对象，函数），*proto*属性值值向他构造函数的prototype属性值

所以我们得出
 `foo._proto_===A.prototype`
 因为已知条件`A.prototype.a = 1;`
 最后在原型链上找到了属性a
 看图

![](prototype-5.png)

```js
console.log(new A().a)		//1
```


 如果这个理解了，那么下面的两个自然也就引刃而解

**求B的实例下属性a的值即new B().a**

我们知道B实例下是有属性a的，a的值等于传入的参数，因为创建B实例的时候没有传入参数所以最后输出==>`undefined`

 **注意**
 这里有个地方要说明一下
 由于构造函数B存在属性a，但是由于没有传入参数，导致属性a的值是`undefined`，
 后来又一次执行了   `B.prototype.a = 1;`，在B的原型上添加了属性a，并赋值为1，当查找属性或方法是，先查找自身，自身没有，再去原型链上的，如果在自身找到了，就会停止，
 这个例子中，我们找到了a但是a的值是undefined，**undefined也是值**，找到了就停止，尽管原型链上还有值，js也不会继续查找下去
 所以这个例子很经典，贴个图，感受一下

![](prototype-6.png)

```js
console.log(new B().a);		//undefined
```

**求C的实例下属性a的值即new C(2).a**

如果👆两题都懂了，这个就是小case
 实例化一个构造函数C并传入参数2，因为有参数，所以，构造函数C存在自有属性a，并且属性a的值为2
 `C.prototype.a = 1;`
 在C的原型对象上添加一个属性a，并且赋值1
 然后就出现这样的情况，自有属性和原型属性都存在，这时候取值当然就是从自有属性中取啦
 来个图感受一下

![](prototype-7.png)

所以

```js
console.log(new C(2).a);	//2
```

#### 第二题

在第二题开始之前我们很有必要先复习一下昨天的一个知识点？为什么说很有必要呢？因为这是一把🔑，它是解开这道题目的关键 **instanceof**

> instanceof用于判断一个变量是否某个对象的实例

```javascript
var F = function() {};
Object.prototype.a = function() {
  console.log("a()");
};
Function.prototype.b = function() {
  console.log("b()");
};
var f = new F();
F.a();//a()
F.b();//b()
f.a();//a()
f.b();//Uncaught TypeError: f.b is not a function
```

F是个构造函数，而f是构造函数F的一个实例。
到`instanceof`发力的时候了

```javascript
console.log(F instanceof Object);
console.log(F instanceof Function);
```

所以我们得出结论
F是`Object` 和 `Function`两个的实例，执行代码

```javascript
console.log(F.prototype);
```

看输出

![](prototype-8.png)

**即F既能访问到a，也能访问到b。**
所以F.a() 输出 a()     F.b() 输出 b()
继续

```javascript
console.log(f instanceof Object);//true
console.log(f instanceof F);//true
console.log(f instanceof Function);//false
```

`f` 并不是`Function`的实例，因为它本来就不是构造函数，所以就不能调用Function原型链上的相关属性和方法了，只能访问`Object`原型链。
 所以f.a() 输出  a()， 而f.b()就报错了。

 接下来，我们具体分析下，它们是如何按路径查找的：

- f.a()的查找路径: f自身: 没有 ---> `f._proto_(Object.prototype)`: 输出a()
- f.b()的查找路径: f自身: 没有 ---> `f._proto_(Object.prototype)`: 没有 ---> `f._proto_._proto_` (`Object.prototype._proto_`): 因为找不到，所以报错
- F.a()的查找路径: F自身: 没有 ---> `F._proto_(Function.prototype)`: 没有 ---> `F._proto_._proto_(Object.prototype)`: 输出 a()
- F.b()的查找路径: F自身: 没有 ---> `F._proto_(Function.prototype)`: b()



## 5 函数`this`指针

> 转载  [深入理解JS函数中this指针的指向](https://www.cnblogs.com/zjjDaily/p/9482958.html)


**核心**： 

**函数在执行时，会在函数体内部自动生成一个`this`指针。<span style="color:red;">谁直接调用产生这个this指针的函数，this就指向谁。</span>**

怎么理解指向呢，我认为指向就是等于。例如直接在js中输入下面的等式：

```js
console.log(this===window);//true
```

 情况不同，this指向的对象也不同。例如：

### 1. 函数声明的情况

```js
var bj=10;
function add(){
    var bj=20;
    console.log(this);//window
    console.log(this.bj);//10
    console.log(bj);//20
    console.log(this.bj+bj);//30
}
add();
window.add();
```

（1） 执行了add（）之后，此时的this指向的是window对象，为什么呢？因为这时候add是全局函数，是通过window**直接调用**的。所以下面我专门写了个window.add()就是为了说明，全局函数的this都是指向的window。

（2） 就像alert（）自带的警告弹窗一样,window.alert（）执行之后也是一样的效果。所以只要是  window点  这种调用方式都可以省略掉，因此警告弹窗可以直接使用alert（）。

### 2. 函数表达式

```js
var bj=10;
var zjj=function(){
    var bj=30;
    console.log(this);//window
    console.log(this.bj);//10
    console.log(bj);//30
    console.log(this.bj+bj);//40
}
console.log(typeof zjj);//function
zjj();
window.zjj();
```

（1） 执行了zjj（）之后，函数中的this也是指向window对象。原因和第一个是一样的，都是通过window这个对象**直接调用**。

### 3. 函数作为对象的属性去调用

#### 例一

```js
var bj=10;
var obj={
    name:"八戒",
    age:"500",
    say:function(){
        var bj=40;
        console.log(this);//就是obj这个对象
        console.log(this.bj);//undefined
        console.log(this.name);//八戒
    }
}
obj.say();
window.obj.say();    
```

（1） 当obj.say（）被执行的时候，此时的this指向的是 obj 这个对象，为什么呢？因为say函数是通过obj这个对象**直接调用**的。

（2） 那有人可能会问了，obj对象实际上也是通过window对象调用的，为什么this不指向window呢？我认为是因为say这个函数是通过 **obj** 对象**直接调用**的，而没有通过 window 对象**直接调用**，因此this不会指向window。看下面的例子就明白了。

#### 例二

```js
var bj=10;
var obj={
    name:"八戒",
    age:500,
    say:function(){
        console.log(this);//是obj这个对象
        console.log(this.bj);//undefined
        console.log(this.name)//八戒
    },
    action:{
        name:"悟空",
        age:1000,
        say:function(){
            console.log(this);//是action这个对象
            console.log(this.bj);//undefined
            console.log(this.name)//悟空
        }
    }
}
obj.say();
obj.action.say();
window.obj.action.say();
```

（1） obj.say()执行之后，此时这个函数里的this指向的是obj对象，原因是因为say函数是通过obj**直接调用**的。

（2） obj.action.say()执行之后，此时这个函数里的this指向的是action对象，原因是因为say函数是通过action对象**直接调用**的。并没有通过obj**直接调用**。也没有通过 window **直接调用**，所以此时action对象中say函数里的的this指向并不会是obj或者window。

#### 例三

```js
var bj=10;
var obj={
    name:"八戒",
    age:500,
    say:function(){
        console.log(this);//就是obj这个对象
        console.log(this.bj);//undefined
        console.log(this.name)//八戒
        function wk(){
            console.log(this);//window
            console.log(this.bj);//10
            console.log(this.name);//这里显示的是为空
        }
        wk();        
    },
}
obj.say();
```

（1） 这种情况下，say函数里的this指针还是指向的obj，原因是因为say函数是通过obj**直接调用**。

（2） <span style="color:red;">但是这时候wk函数中的this就是指向的是window了。为什么呢？因为 wk（）函数在 say（）函数中，是属于普通函数调用，但是并没有通过say或者obj**直接调用**，只是自执行，这个时候，wk就是一个全局函数，因此该函数的this指向的就是window。</span>

（3） 那为什么this.name是显示的为空呢？因为 window 对象中本身就有一个 name 值，并不是某处添加的，如果把name换成age，得到的就是undefined了。

（4） <span style="color:#F74A70">那怎样让wk（）函数中的this指向obj呢。**一种方式**就是在say函数中把say（）函数的this用变量保存起来，即 `var that=this;` 然后wk（）函数使用that就能达到指向obj的目的了。**另外的方式是通过apply或者call来改变。**</span>

（5）<span style="color:#EDC547;"> 那wk（）在这里能不能写成`window.wk()`呢？这样是不行的，会报错，`window.wk is not a function`。为什么不行呢，this不是指向window吗，为什么widow对象里灭有wk（）这个函数。。这个嘛，我也不知道，先留个坑，后面再来填</span>

#### 例四

```js
var bj=10;
var obj={
    name:"八戒",
    age:"500",
    say:function(){
        var bj=40;
        console.log(this);//window
        console.log(this.bj);//10
        console.log(this.name);//这里没有输出内容
    }
}
var elseObj=obj.say;
elseObj();
```

 （1） 执行了`elseObj（）`函数之后，为什么say函数中的this却指向了window呢？首先要理解这句话：**谁直接调用产生这个this指针的函数，this就指向谁**。**当`obj.say`赋值给`elseObj`的时候，elseObj只是一个函数，而并没有执行，因此this指针的指向并不明确**，这个时候执行到 `var elseObj=obj.say`的 时候，整程序相当于：

```js
var bj=10;
var elseObj=function(){
    var bj=40;
    console.log(this);
    console.log(this.bj);
    console.log(this.name);
}
elseObj();
```

 　 这就和 **第2种 函数表达式**的情况一样了。所以，当执行elseObj（）的时候，this就指向window，this.obj为10，因为这时候elseObj（）是通过 window **直接调用**的

（2） this.name为空是因为 window 对象中本身就有一个 name 值，并不是某处添加的，如果把name换成其它的比如age，得到的就是undefined了，因为全局并没有age属性。

#### 例五

```js
var bj=10;
var obj={
    name:"八戒",
    age:500,
    say:function(){
        return function(){
            console.log(this);//window
            console.log(this.bj);//10
            console.log(this.age);//undefined
        }
    }
}
obj.say()();
//    var elseObj=obj.say();
//    elseObj();
```

（1） obj.say（）（）为什么会有两个括号？因为obj.say（）执行之后返回的是一个函数，并没有执行，再加一个括号就是执行返回的那个匿名函数。

（2） 如果不习惯也可以使用上面注释的那种方式，是一样的效果。

（3） 执行了函数之后，为什么返回的函数中this是指向window的呢？那是因为执行obj.say（）的时候，只是一个函数，相当于就是注释里的第一行代码，这时候返回的函数并未被执行。当再加一个括号的时候，就是执行了返回的那个函数，这个时候返回的函数就相当于是一个全局函数，是通过window**直接调用**，因此this就是指向的是window。

### 4. 工厂模式中this的指向

> 工厂模式可以理解为在内部完成一个新对象的构建；而构造函数模式可以理解为工厂外派员工在外去完成一个新对象的构建。

#### 例一

```js
var bj=10;
function fun(a,b){　　 
    console.log(this);//window对象
    var bj=20;
    var sun=new Object();
    sun.one=a;
    sun.two=b;
    sun.say=function(){
        console.log(this);//是sun对象，{one: 2, two: 3, say: ƒ()}
        console.log(this.bj);//undefined
        console.log(this.one);//2
    }
    return sun;
}
var wk=fun(2,3);
wk.say();
```

 （1） 话说为什么叫工厂模式，我搞不太清楚，不过这个不重要，重要的是通过这个模式，在每次调用函数的时候，虽然每次都返回的是sun这个对象，但是每个对象都是不相似的，即使内容一样，比如 : (引用类型，其地址不同)

```js
var sf=fun(2,3); console.log(sf===wk);     //false 
```

（2） 那为什么say（）函数执行之后，this是指向返回的那个对象呢？这个很明显嘛，say（）是通过wk这个对象**直接调用**的，而wk是fun函数返回sun对象。所以这里的this就指向的是返回的对象。所以`this.bj = undefined`，因为返回的对象中没有bj属性。

（3） 我认为这种模式最重要的还是 `renturn sun`这个返回语句，这个是必不可少的。

（4） fun(a,b)这个函数中的this指向的是window，原因是执行 `var wk=fun(2,3);` 的时候，fun函数已经被执行了，并且**直接调用**它的就是window，所以这时的this是指向的window。

#### 例二

```js
var bj=10;
function fun(a,b){　　 
    console.log(this);//window对象
    var bj=20;
    var sun=new Object();
    sun.one=a;
    sun.two=b;
    sun.say=function(){
        console.log(this);//是sun对象，{one: 2, two: 3, say: ƒ()}
        return function(){
            console.log(this);//是window对象
        }
    }
    return sun;
}
var wk=fun(2,3);
var ss=wk.say();
ss();
```

 （1） 为什么say函数中return 的函数中this是指向的window对象呢？首先，执行到 `var wk=fun(2,3);` 的时候**，wk是一个对象。**继续执行下一句代码，ss这时候是一个函数，就是通过say函数返回之后赋值的。这时候返回的函数还未执行，this指向并不明确。当执行到最后一句代码，ss（）函数执行了。这时候，**ss函数就是一个全局函数**，是通过window**直接调用**的。所以这时的this指向的是window。

（2） 如果say中返回的是一个对象，对象中又有个函数，像下面一样：

```js
sun.say=function(){
    console.log(this);//是sun对象，{one: 2, two: 3, say: ƒ()}
    return {
        wk:"1",
        say:function(){
            console.log(this);
        }
    }
}
```

这时候执行到ss.say()的时候，this指向的就是ss这个对象，即通过say函数返回的那个对象。**原因还是一样，say函数是通过ss直接调用的，而ss对象是wk.say()返回的对象。**

### 5. 构造函数中this的指向

```js
var bj=10;
function Add(){
    var bj=20;
    this.bj=30;
    this.say=function(){
        console.log(this);//Add {bj: 30, say: ƒ()}
        console.log(this.bj);//30
    }
    console.log(this) ;//Add {bj: 30, say: ƒ()}
}
var obj=new Add();
console.log(typeof obj);//object
obj.say();
```

 （1） 要明白构造函数的this指向，我们需要明白**调用构造函数经历的步骤**：`摘至JS高程 6.2.2节`

　　a.  创建一个新对象。

　　b.  将构造函数的作用域赋给新对象（因此this就指向了这个新对象）。

　　c.  执行构造函数中的代码（为这个新对象添加属性）。

　　d.  返回新对象。

　　<span style="color:#1f6fb5;font-weight:bold;font-style:italic;">这个对new一个对象的解释，是最易懂的说法</span>

（2） **构造函数与工厂模式相比**：

　　a.  没有显式的创建对象。

　　b.  没有return语句。

　　c.  直接将属性和方法赋值给 this 对象。

（3） 首先，**obj.say()执行之后，say函数中this的指向是obj对象**，这个很明显，不再赘述。在不用new操作符的时候，Add()函数里的this指向的就是window；但是使用了new操作符之后，Add()函数中 `console.log(this)` 这个this为什么是obj对象，而不是window呢？

​	这个原因我认为在js权威指南4.6节对象创建表达式和8.2.3构造函数使用中，有所说明。**使用new操作符的时候，js先创建一个新的空对象，然后，js传入指定的参数并将这个新对象当做this的值来调用一个指定的函数。这个函数可以使用this来初始化这个新创建对象的属性。所以当使用new操作符之后，函数中的this指向的是新创建的对象。所以构造函数中的this就是指向new出来的那个对象。**

（5） 如果构造函数中有return语句，那么此时 `var obj=new Add();` obj就是return出来的内容，但是Add函数中的this还是指向的创建的新对象Add；

### 6. 原型对象中this的指向

```js
var bj=10;
function Add(){　　
	console.log(this);//Add{}};
	Add.prototype.bj=10;
	Add.prototype.say=function(){
    	console.log(this);//Add{}
    	return function(){
        	console.log(this);//window
   	 	}
	}
}
var obj=new Add;//没传参数可以省略括号
obj.say()();
```

 （1） obj.say()()执行的时候，this指向的是window，**这个还是因为obj.say()执行时返回的是一个函数**，然后再加一个括号，就执行返回的这个函数，此时这个函数属于全局函数，所以，this会指向window

（2） Add()这个构造函数中的this指向的是Add{}，原因和上面构造函数中this的指向一样。

（3） `Add.prototype.say=function(){ console.log(this) }` 这里面的this 也是指向的是Add{}，至于原因，我认为是因为say（）这个函数是通过obj直接调用的，所以this指向的是obj，所以是Add{}。

 

### 总结：

1. 要想判断函数中this的指向，只要知道谁直接调用产生this指针的函数，this就指向谁了。

2. 只是要注意使用了new 操作符之后，构造函数内部的this指向的是新对象，通俗点讲就是new出来的新实例。



### 补充和挖坑

再来一个例子说明一下，通俗的理解一下this指针的指向：**谁直接调用产生 this 指针的函数，这函数里的 this 指针就指向谁。**

```js
var factory = function(){
  this.a = 'first-A';  
  this.b = 'first-B';
  this.c = {
    a:'second-A',
    b:function(){
        console.log(this.a)
        return this.a
    }
  }    
}
new factory().c.b(); // second-A
```

（1） 这个代码首先考的是运算符的优先级   [MDN运算符优先级 ](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Operator_Precedence) 

（2） `new的优先级`和 `点运算符等级`一样，从左至右执行，所以先执行 `new factory()` 然后再执行 `点运算符`。

（3） 执行了 new 操作之后，然后发现函数调用的优先级和成员访问运算符的优先级一样，然后遵循从左到右的执行方式。因此就先执行 成员访问运算符 .c

（4） 这时 .c 就是一个对象，然后再取 b 属性，是个函数。这个时候 this 指针已经产生， 而产生这个this指针的是b函数，而且是通过 c 调用的。**因此此时 this 的指向就是 c 对象。所以最后打印出`second-A`**

（5） 如果想要 c 里面的 b函数中 this指向的是 factory 实例。**要么使用 bind.apply,call等方法来强行改变**； **要么就把 b 函数写成 es6箭头函数的方式**。这样 b 函数就没有this指针，而 b 函数里面的this，就是上一级的 this。

 

然后再来说一下  **回调函数  |  立即执行函数（IIFE）  | 点击事件**  的 this 的指向

在这之前我们要知道：函数传参是按值传递，如果是**基本数据类型**，则是直接复制数据的值传过去；如果是**引用类型**，比如对象，函数这种，传递的就是该数据 **在堆中存放的地址**。 

那么，<span style="color:red;">回调函数就是传的 **函数在堆中的地址**，也就是说，**回调函数中 this 的指向，决定于执行回调函数 时的执行上下文环境。**</span>

**首先是 setTimeout，setInterval 这种类型的回调函数。**

### 7. setTimeout的回调

**例一**

```js
setTimeout(function(){
   console.log(this) 
})
```

（1） 这是最最常用的常见的定时器用法，**回调函数里的this指向的是window。**

（2） 由`setTimeout()`调用的代码运行在与所在函数完全分离的执行环境上。这会导致，这些代码中包含的 `this` 关键字在非严格模式会指向 `window` (或全局)对象，严格模式下为 `undefined`，这和所期望的`this`的值是不一样的。**在严格模式下，setTimeout( )的回调函数里面的this仍然默认指向window对象， 并不是undefined**。 这几句话是 MDN上，[setTimeout中 关于 this 的问题](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/setTimeout) 里对 this 指向的解释。

（3） 我的理解是：由于setTimeout属于宏任务，它的回调在延时之后才进入到主线程执行，而函数执行的时候才明确 this 的指向。执行的时候，由于没有设置内部this的指向。相当于是普通函数调用。所以会默认指向window

**例二**

```js
var obj = {
    age:10,
    getage:function(){
        console.log(this.age)
    }
}

setTimeout(obj.getage,1000)   // undefined

setTimeout(function(){
    obj.getage()  // 10
},1000)
```

（1） 第一个setTimeout，执行obj.getage 之后，**相当于setTimeout的回调是一个匿名函数，执行的时候，函数内部未设置this的指向。相当于是普通函数调用**。所以this默认指向`window`，所以结果是`undefined`。

（2） 第二个setTimeout，传给setTimeout的也是一个匿名回调函数，执行匿名函数，执行到 obj.getage() 的时候，getage函数里的this，指向的就是obj了，所以能打印出10。**还是遵循 谁调用产生 this指针的函数，this就指向谁的规则**

### 8. 对于 数组的遍历方法 中的`this`

**foreach，map，filter，some**，每次 `callback` 函数被调用的时候，`this` 都会指向 最后一个参数 `thisArg` 的这个对象。如果省略了 `thisArg` 参数,或者赋值为` null` 或 `undefined`，则 this 指向全局对象 。在严格模式下则是undefined（未传值的时候）。如果用箭头函数的写法，就要看当前上一层的 this 指向的是哪里了

reduce 累加器的参数中并没有 thisArg 对象可以传，但是在回调函数中，this指向的是window。如果用箭头函数的写法，就要看当前上一层的 this 指向的是哪里了

### 9. 点击、移入移出等类似事件的回调函数 的 `this` 指向

```js
<button type="button" id="btn">点我啊</button>

function getDom(){
    console.dir(this)
}
    
// 第一种调用方法
document.getElementById('btn').addEventListener('click',function(){
    getDom(); 
})

// 第二种调用方法
document.getElementById('btn').onclick = getDom()

// 第三种调用方法
document.getElementById('btn').addEventListener('click',getDom)

// 第四种调用方法
<button type="button" id="btn" onclick="console.log(this)">点我啊</button>
```

> console.log()会在浏览器控制台打印出信息
>
> console.dir()可以显示一个对象的所有属性和方法

（1） 第一种调用方法，this指向的是window。**虽然在`function(){}` 回调函数里的 this 指向的是button这个DOM对象，但是getDom是在这里面调用的，和普通函数调用没什么区别**。所以也指向window

（2） 第二种都不用点击，直接触发，this指向window。因为直接当做普通函数调用了。

（3） 第三种方法**，this指向 button这个DOM对象**。回调函数传入的是函数执行的地址，执行的时候相当于是在window环境下执行，所以getDom的this指向的是window

（4） 第四种方式，this指向 button 这个DOM对象。

![](this-1.png)

 **当函数被用作事件处理函数时，它的`this`指向触发事件的元素（一些浏览器在使用非`addEventListener`的函数动态添加监听函数时不遵守这个约定）。 --- MDN**

 

**对于 立即执行函数 IIFE 中 this的指向，指向的是window**

```
(function(){
 console.log(this) // window
})()
```

到这里，我还是没搞懂下面这种情况：

```
var obj={
  age:10,
  say:function(){
     function get(){
        console.log(this)   // window
    }
    get();
  }  
}
obj.say();
```

get函数里的this指向的是window，因为get函数 独立调用，并没有为内部 this 明确指向。所以会指向 window 。如果是严格模式，则指向undefined。

### 遗留问题解答一

（1）既然 this 指向的是window，为什么get函数在window上不能访问？

（2）这种在函数内部定义并执行的方式，和立即执行函数有没有区别？

（3）词法分析的时候，这个函数是被怎样处理的？

------

以前没搞懂为什么上面内部申明的 get（）方法不能在window上访问，其实很简单。

get函数是在say函数里面 创建的，也就是说，不管怎么调用，get函数的作用域都只能是在say函数里面。而get方法是自执行，并没有其它任何对象直接调用，所以this是指向window，但是作用域是say函数里面，却不是window。感觉和立即执行函数没区别。

不要理解成 this 指向window，产生这个this的函数就一定在window作用域上挂载。this指向 和 函数作用域 并不是相互的

由于js是采用的静态作用域（也叫词法作用域），这就意味着函数的执行依赖于函数定义的时候所产生（而不是函数调用的时候产生的）的变量作用域。

所以，函数的作用域是基于函数创建（可以理解为函数定义的时候）的地方，也就是函数在哪里创建，不管是否返回这个函数，或者返回带括号（已执行）的函数，都不用在意，只要知道是在哪里定义即创建的就知道函数的作用域是什么内容了。

在全局作用域中“定义”一个函数的时候，只会创建包含全局作用域的作用域链。只有“执行”该函数的时候，才会复制创建时的作用域，并将当前函数的局部作用域放在作用域链的顶端。

去取变量值的时候，首先看本函数里有没有该值，如果没有再到函数定义的外部去找

------

### 遗留问题解答二

如果使用了严格模式，this的指向则是它进入执行环境时的值。不一定是undefined。 

```js
"use strict"; 
function f2(){
    console.log(this) // {a: 1}
    return this;
}

f2.bind({a:1})() === undefined; // false
```

 如果未指定this，则是undefined

```js
"use strict"; 
function f2(){
    console.log(this) // undefined
    return this;
}

f2() === undefined; // true
```



## 6 变量提升

### JS代码的运行规则

在`JavaScript`代码运行之前其实是有一个编译阶段的。编译之后才是从上到下，一行一行解释执行。`变量提升`就发生在编译阶段，*它把变量和函数的声明提升至作用域的顶端*。（编译阶段的工作之一就是将变量与其作用域进行关联）。
所以对于代码`var a =2;`来说，编译器看到的是两行代码`var a; a = 2;`第一个语句是声明语句，在编译阶段处理。第二个语句是赋值语句，在运行阶段处理。

### 变量提升

ES6之前我们一般使用var来声明变量，**提升**简单来说就是把我们所写的类似于`var a = 123;`这样的变量声明，提升到它所在作用域的顶端去执行，到我们代码所在的位置来赋值。

```js
function test () {
    console.log(a);  //undefined
    var a = 123; 
};
test();
```

上述代码a的结果是`undefined`，它的实际执行顺序如下：

```js
function test () {
    var a;
    console.log(a);
    a = 123;
}
test();
```

再看一个：

```js
a = 1;
var a;
console.log(a); //1
```

第一眼看到的时候会认为`undefined`, 但是记住声明会提升到作用域顶端

**下面来看一道经典面试题：**

```js
console.log(v1);
var v1 = 100;
function foo() {
    console.log(v1);
    var v1 = 200;
    console.log(v1);
}
foo();
console.log(v1);
```

输出的结果：

> //undefined
> //undefined
> //200
> //100

#### 总结

**变量提升**需要注意两点：

1. 提升的部分只是变量声明，赋值语句和可执行的代码逻辑还保持在原地不动
2. 提升只是将变量声明提升到变量所在的变量范围的顶端，并不是提升到全局范围，说明如下：

```JS
foo();
function foo(){
    console.log(a); //会输出undefined
    var a = "2";
}
//变量提升之后的效果
function foo(){
    var a;
    console.log(a);
    a = "2";
}
foo();
```

### 函数提升

`Javascript`中不仅仅是变量声明有提升的现象，函数的声明也是一样

具名函数的声明有两种方式：  **函数声明式**   **函数字面量式**

```JS
//函数声明式
function bar () {}
//函数字面量式 
var foo = function () {}
```

**函数字面量式**的声明和**变量提升**的结果是一样的，函数只是一个具体的值；

但是函数声明式的提升现象和变量提升略有不同

#### 函数声明式

```js
console.log(bar);
function bar () {
  console.log(1);
}
//打印结果：ƒ bar () {
//  console.log(1);
//}
```

执行顺序相当于：

```js
function bar () {
  console.log(1);
}
console.log(bar);
```

**函数提升是整个代码块提升到它所在的作用域的最开始执行**

#### 函数字面量式

**函数声明会提升，但是函数表达式不会提升。** 看如下代码：

<span style="color:red;">注意：变量提升和变量赋值 是两回事！</span>

```js
foo();
var foo = function bar(){    //这是一个函数表达式，不再是函数声明。
    console.log("bar");
}
```

处理方式如下：

```js
var foo;    
foo();    //TypeError，因为还没有赋值
bar();    //bar不可以在全局范围内引用
foo = function bar(){
    console.log("bar");
}   
```

#### 函数优先规则

思考下面的问题:

```js
foo(); //1
var foo;
function foo () {
    console.log(1);
}
foo = function () {
    console.log(2);
}
```

这就是**函数优先规则**

<span style="color:red;">变量声明和函数声明都会得到变量提升，但函数声明会最先得到提升，然后是变量声明。</span>

处理方式如下：

```js
function foo(){
    console.log(1);
} 
foo();
foo = function(){
    console.log(2);
}
```

**注意**：`var foo;`由于是重复声明变量，所以被编译优化去掉。

#### 补充情况

**1、对于函数声明来说，如果定义了相同的函数变量声明，后定义的声明会覆盖掉先前的声明，看如下代码：**

```js
foo();    //输出3
function foo(){
    console.log(1);
}
var foo = function(){
    console.log(2);
}  
function foo(){
    console.log(3);
} 
```

**2、JavaScript中是没有块级作用域的概念**

```Js
foo();    //输出结果为2
var a = true;
if(a){
    function foo(){
        console.log(1);
    }
}else{
    function foo(){
        console.log(2);
    }
}   
```

## 7 作用域

### 什么是作用域

作用域是<span style="color:red;">在运行时代码中的某些特定部分中变量，函数和对象的可访问性</span>。换句话说，*作用域决定了代码区块中变量和其他资源的可见性。*

```js
function outFun2() {
    var inVariable = "内层变量2";
}
outFun2();//要先执行这个函数，否则根本不知道里面是啥
console.log(inVariable);// inVariable is not defined
```

从上面的例子可以体会到作用域的概念，变量 `inVariable` 在全局作用域没有声明，所以在全局作用域下取值会报错。我们可以这样理解：作用域就是一个独立的地盘，让变量不会外泄、暴露出去。**也就是说作用域最大的用处就是隔离变量，不同作用域下同名变量不会有冲突。**

ES6 之前 JavaScript 没有块级作用域,只有全局作用域和函数作用域。ES6 的到来，为我们提供了**块级作用域**，可通过新增命令 `let` 和 `const` 来体现。

### 全局作用域

在代码中任何地方都能访问到的对象拥有**全局作用域**，一般来说以下几种情形拥有全局作用域：

> 在代码中任何地方都能访问到的对象拥有全局作用域一般来说以下几种情形拥有全局作用域：

**1、最外层函数**和**在最外层函数外面定义的变量**拥有全局作用域

```js
var outVariable = "我是最外层变量"; //最外层变量
function outFun() { //最外层函数
    var inVariable = "内层变量";
    function innerFun() { //内层函数
        console.log(inVariable);
    }
    innerFun();
}
console.log(outVariable); //我是最外层变量
outFun(); //内层变量
console.log(inVariable); //inVariable is not defined
innerFun(); //innerFun is not defined
```

**2、所有未定义直接赋值的变量**，自动声明为拥有全局作用域

```js
function outFun2() {
    variable = "未定义直接赋值的变量";
    var inVariable2 = "内层变量2";
}
outFun2();//要先执行这个函数，否则根本不知道里面是啥
console.log(variable); //未定义直接赋值的变量
console.log(inVariable2); //inVariable2 is not defined
```

**3、所有 window 对象的属性拥有全局作用域**

一般情况下，window 对象的内置属性都拥有全局作用域，例如 window.name、window.location、window.top 等等。

全局作用域有个弊端：如果我们写了很多行 JS 代码，变量定义都没有用函数包括，那么它们就全部都在全局作用域中。这样就会污染全局命名空间, 容易引起命名冲突。

```js
// 张三写的代码中
var data = {a: 100}

// 李四写的代码中
var data = {x: true}
```

这就是为何 jQuery、Zepto 等库的源码，所有的代码都会放在(function(){…})()中。因为放在里面的所有变量，都不会被外泄和暴露，不会污染到外面，不会对其他的库或者 JS 脚本造成影响。这是**函数作用域**的一个体现。

### 函数作用域

> 函数作用域，是指声明在函数内部的变量，和全局作用域相反，局部作用域一般只在固定的代码片段内可访问到，最常见的例如函数内部。

```js
function doSomething(){
    var blogName="浮游天地";
    function innerSay(){
        alert(blogName);
    }
    innerSay();
}
alert(blogName); //脚本错误
innerSay(); //脚本错误
```

作用域是分层的，内层作用域可以访问外层作用域的变量，反之则不行。

**值得注意的是**：块语句（大括号“｛｝”中间的语句），如 if 和 switch 条件语句或 for 和 while 循环语句，不像函数，它们不会创建一个新的作用域。在块语句中定义的变量将保留在它们已经存在的作用域中。

```js
if (true) {
    // 'if' 条件语句块不会创建一个新的作用域
    var name = 'Hammad'; // name 依然在全局作用域中
}
console.log(name); // logs 'Hammad'
```

初学者经常需要花点时间才能习惯变量提升，而如果不理解这种特有行为，就可能导致bug 。正因为如此，ES6 引入了块级作用域，让变量的生命周期更加可控。

**函数作用域有两种方式**

```js
//函数声明
function foo(){
    var a = 3;
    console.log(a);
}
```

```js
//函数表达式
(function foo(){
    var a = 2;
    console.log(a);
})
```

**两者的区别在于**它们的**名称标识符会被绑定到何处**，第一段代码中会被绑定到所在作用域中，第二段代码<u>被绑定在函数表达式自身的函数中而不是所在作用域中</u>。

### 块级作用域

ES6之前，在javascript中**没有块作用域**,也就是说在`{...}`中声明的变量会泄露到外面作用域

另外，ES5利用**函数闭包**，也可以*模仿块级作用域*

> 块级作用域可通过ES6新增命令 let 和 const 声明，所声明的变量在指定块的作用域外无法被访问。
>
> let 声明的语法与 var 的语法一致。基本上可以用 let 来代替 var 进行变量声明，但会将变量的作用域限制在当前代码块中。

**块级作用域在如下情况被创建：**

- 在一个函数内部
- 在一个代码块（由一对花括号包裹）内部

**块级作用域有以下几个特点：**

**1、声明变量不会提升到代码块顶部**：let/const 声明并不会被提升到当前代码块的顶部，因此你需要手动将 let/const 声明放置到顶部，以便让变量在整个代码块内部可用。

```js
function getValue(condition) {
    if (condition) {
        let value = "blue";
        return value;
    } else {
        // value 在此处不可用
        return null;
    }
        // value 在此处不可用
}
```

**2、禁止重复声明**

如果一个标识符已经在代码块内部被定义，那么在此代码块内使用同一个标识符进行 let 声明就会导致抛出错误。

```js
var count = 30;
let count = 40; // Identifier 'count' has already been declared
```

在本例中， count 变量被声明了两次：一次使用 var ，另一次使用 let 。因为 let 不能在同一作用域内重复声明一个已有标识符，此处的 let 声明就会抛出错误。但如果在嵌套的作用域内使用 let 声明一个同名的新变量，则不会抛出错误。

```js
var count = 30;
// 不会抛出错误
if (condition) {
    let count = 40;
    // 其他代码
}
```

**3、循环中的绑定块作用域的妙用**

开发者可能最希望实现 for 循环的块级作用域了，因为可以把声明的计数器变量限制在循环内，例如：

```html
<button>测试1</button>
<button>测试2</button>
<button>测试3</button>
<script type="text/javascript">
   var btns = document.getElementsByTagName('button')
    for (var i = 0; i < btns.length; i++) {
      btns[i].onclick = function () {
        console.log('第' + (i + 1) + '个')
      }
    }
</script>
```

我们要实现这样的一个需求: 点击某个按钮, 提示"点击的是第 n 个按钮"，结果点击任意一个按钮，后台都是弹出“第四个”，这是因为 i 是全局变量，执行到点击事件时，此时 i 的值为 3，最简单的方法是`用 let 声明 i`

```js
 for (let i = 0; i < btns.length; i++) {
    btns[i].onclick = function () {
      console.log('第' + (i + 1) + '个')
    }
  }
```

**三个简单案例**

```js
var scope='global';
function fn(){
  alert(scope);
  var scope='local';
  alert(scope);
}
fn();   
alert(scope);
  
//结果是undefined , local , global
```

```js
var scope='global';
function fn(){
  alert(scope);
  scope='local';
  alert(scope);
}
fn();
alert(scope);
  
//结果是global , local , local
```

```js
var scope='global';
function fn(scope){
  alert(scope);
  scope='local';
  alert(scope);
}
fn();
alert(scope);

//结果是undefined , local , global
```

### 作用域链

作用域链本质上就是**根据名称查找变量(标识符名称)的一套规则**。

规则非常简单，在自己的变量对象里找不到变量，就上父级的变量对象查找，当抵达最外层的全局上下文中，无论找到还是没找到，查找过程都会停止。**查找会在找到第一个匹配的变量时停止，被称为遮蔽效应**

**作用域**其实是由**执行上下文中的变量对象**和**作用域链**共同构成的。

### 相关试题

**1、说明：因为`fn:function()`中的活动对象只有全局的a**

```js
var a = 10;
var o = {
    a:11,
    b:{
        fn:function(){
            console.log(a);
        }
    }
}
o.b.fn(); //10
```

**2、说明：foo()中先查找自己的活动对象是否有a, 发现有，直接输出自己活动对象的a=1**

```js
function foo() {
	console.log(value);
}        
function bar() {
    var value = 2;
    foo();
}
var value = 1;
bar();//1 
```
**3、这种情况与上面有点不同, value=2只有赋值没有定义，所以会被提升到最上面**

```js
//var value = 2   
function foo() {
    console.log(value);
}
function bar() {
    value = 2;
    foo();
}
var value = 1;
bar();//2
```

**4、函数体内函数声明会被提升**

```js
function a(b){
	console.log(b);  //函数b
    function b(){
        console.log(b); //函数b
    }
	b();
}
a(1);
```

等效于：

```js
function a(b){
    function b(){
        console.log(b); //函数b
    }
    console.log(b);  //函数b
    b();
}
a(1);
```

## 8 闭包

### 1、什么是闭包？

闭包是指有权访问另外一个函数作用域中的变量的函数。可以理解为**能够读取另一个函数作用域的变量的函数**

```js
function outer() {
    var a = '变量1'
    var inner = function () {
        console.info(a)
    }
	return inner // inner 就是一个闭包函数，因为他能够访问到outer函数的作用域
}
```

很多人会搞不懂匿名函数与闭包的关系，实际上，**闭包是站在作用域的角度上来定义的**。

因为inner访问到outer作用域的变量，所以inner就是一个闭包函数。虽然定义很简单，但是有很多坑点，比如this指向、变量的作用域，稍微不注意可能就造成内存泄露。我们先把问题抛一边，思考一个问题：为什么闭包函数能够访问其他函数的作用域 ?

### 2、从堆栈的角度看待JS函数

基本变量的值一般都是存在栈内存中，而对象类型的变量的值存储在堆内存中，栈内存存储对应空间地址。基本的数据类型: Number 、Boolean、Undefined、String、Null。

```js
var a = 1 //a是一个基本类型
var b = {m: 20 } //b是一个对象
```

对应内存存储：

![](js-bibao-1.png)

当我们执行 `b={m:30}`时，堆内存就有新的对象`{m：30}`，栈内存的b指向新的空间地址( `指向{m：30}` )，而堆内存中原来的{m：20}就会被程序引擎垃圾回收掉，节约内存空间。我们知道js函数也是对象，它也是在堆与栈内存中存储的，我们来看一下转化：

```js
var a = 1;
function fn(){
    var b = 2;
    function fn1(){
        console.log(b);
    }
    fn1();
}
fn();
```

![](js-bibao-2.png)

栈是一种先进后出的数据结构：

1. 在执行fn前，此时我们在全局执行环境(浏览器就是window作用域)，全局作用域里有个变量a；
2. 进入fn，此时栈内存就会push一个fn的执行环境，这个环境里有变量b和函数对象fn1，这里可以访问自身执行环境和全局执行环境所定义的变量
3. 进入fn1，此时栈内存就会push 一个fn1的执行环境，这里面没有定义其他变量，但是我们可以访问到fn和全局执行环境里面的变量，因为程序在访问变量时，是向底层栈一个个找，如果找到全局执行环境里都没有对应变量，则程序抛出undefined的错误。
4. 随着fn1()执行完毕，fn1的执行环境被杯销毁，接着执行完fn()，fn的执行环境也会被销毁，只剩全局的执行环境下，现在没有b变量，和fn1函数对象了，只有a 和 fn(函数声明作用域是window下)


在函数内访问某个变量是根据函数作用域链来判断变量是否存在的，而函数作用域链是程序根据函数所在的执行环境栈来初始化的，所以上面的例子，我们在fn1里面打印变量b，根据fn1的作用域链的找到对应fn执行环境下的变量b。所以当程序在调用某个函数时，做了以下的工作：准备执行环境，初始函数作用域链和arguments参数对象

我们现在看回最初的例子outer与inner

```js
function outer() {
     var  a = '变量1'
     var  inner = function () {
            console.info(a)
     }
    return inner    // inner 就是一个闭包函数，因为他能够访问到outer函数的作用域
}
var  inner = outer()   // 获得inner闭包函数
inner()   //"变量1"
```

当程序执行完`var inner = outer()`，其实outer的执行环境并没有被销毁，因为他里面的变量a仍然被inner的函数作用域链所引用，当程序执行完inner(), 这时候，inner和outer的执行环境才会被销毁调

《JavaScript高级编程》书中建议：**由于闭包会携带包含它的函数的作用域，因为会比其他函数占用更多内容，过度使用闭包，会导致内存占用过多。**

###  3、闭包坑点

**坑点1： 引用的变量可能发生变化**

```js
function outer() {
      var result = [];
      for (var i = 0； i<10; i++){
        result.[i] = function () {
            console.info(i)
        }
     }
     return result
}
```

JS经典问题：打印结果不是`1,2,3,4,...,10`

因为每个闭包函数访问变量i是outer执行环境下的`变量i`，随着循环的结束，i已经变成10了，所以执行每个闭包函数，结果打印`10， 10， ..., 10`

<span style="color:red;">解决方法：</span>

```js
function outer() {
      var result = [];
      for （var i = 0； i<10; i++）{
        result.[i] = function (num) {
             return function() {
                   console.info(num);    
				// 此时访问的num，是上层函数执行环境的num
                // 数组有10个函数对象，每个对象的执行环境下的number都不一样
             }
        }(i)
     }
     return result
}
```

**坑点2： this指向问题**

```js
var object = {
     name: ''object"，
     getName： function() {
        return function() {
             console.info(this.name)
        }
    }
}
object.getName()()    // underfined

// 因为里面的闭包函数是在window作用域下执行的，也就是说，this指向windows
```

**坑点3：内存泄露问题**

```js
function  showId() {
    var el = document.getElementById("app")
    el.onclick = function(){
      alert(el.id)   // 这样会导致闭包引用外层的el，当执行完showId后，el无法释放
    }
}

// 改成下面
function  showId() {
    var el = document.getElementById("app")
    var id  = el.id
    el.onclick = function(){
      alert(id)   // 这样会导致闭包引用外层的el，当执行完showId后，el无法释放
    }
    el = null    // 主动释放el
}
```

### 4、闭包技巧

**技巧1： 用闭包解决递归调用问题**

```js
function  factorial(num) {
   if(num<= 1) {
       return 1;
   } else {
      return num * factorial(num-1)
   }
}
var anotherFactorial = factorial
factorial = null
anotherFactorial(4)   
// 报错 ，因为最好是return num* arguments.callee（num-1）
// arguments.callee指向当前执行函数，但是在严格模式下不能使用该属性也会报错，所以借助闭包来实现


// 使用闭包实现递归
function newFactorial = （function f(num){
    if(num<1) {return 1}
    else {
       return num* f(num-1)
    }
}） 
//这样就没有问题了，实际上起作用的是闭包函数f，而不是外面的函数newFactorial
```

**技巧2：用闭包模仿块级作用域**

es6没出来之前，用var定义变量存在变量提升问题；es6以后当然大多用es6的`let 和const` 定义

```js
for(var i=0; i<10; i++){
    console.info(i)
}
alert(i)  // 变量提升，弹出10

//为了避免i的提升可以这样做
(function () {
    for(var i=0; i<10; i++){
         console.info(i)
    }
})()
alert(i)   // underfined   因为i随着闭包函数的退出，执行环境销毁，变量回收
```

### 5、使用闭包的注意点

- 由于闭包会使得函数中的变量都被保存在内存中，内存消耗很大，所以不能滥用闭包，否则会造成网页的性能问题，在IE中可能导致内存泄露。解决方法是，在退出函数之前，将不使用的局部变量全部删除。
- 闭包会在父函数外部，改变父函数内部变量的值。所以，如果你把父函数当作对象（object）使用，把闭包当作它的公用方法（Public Method），把内部变量当作它的私有属性（private value），这时一定要小心，不要随便改变父函数内部变量的值。

### 6、补充

**闭包的创建：­­­**

闭包就是可以创建一个独立的环境，每个闭包里面的环境都是独立的，互不干扰。

闭包会发生内存泄漏，<span style="color:red;">每次外部函数执行的时候，外部函数的引用地址不同，都会重新创建一个新的地址。</span>但凡是当前活动对象中有被内部子集引用的数据，那么这个时候，这个数据不删除，保留一根指针给内部活动对象。

**在闭包的应用场景中，记住一句话：**

<span style="color:red;">**闭包找到的是同一地址中父级函数中对应变量最终的值**</span>

#### 参考案例

**例一**

```js
function funA(){
  var a = 10;  // funA的活动对象之中;
  return function(){   //匿名函数的活动对象;
        alert(a);
  }
}
var b = funA();
b();  //10
```

**例二**

```js
function outerFn(){
  var i = 0; 
  function innerFn(){
      i++;
      console.log(i);
  }
  return innerFn;
}
var inner = outerFn();  
//每次外部函数执行的时候,都会开辟一块内存空间,外部函数的地址不同，都会重新创建一个新的地址
inner();
inner();
inner();
var inner2 = outerFn();
inner2();
inner2();
inner2();   //1 2 3 1 2 3
```

**例三**

```js
(function() { 
  var m = 0; 
  function getM() { return m; } 
  function seta(val) { m = val; } 
  window.g = getM; 
  window.f = seta; 
})(); 
f(100);
console.info(g());   //100  闭包找到的是同一地址中父级函数中对应变量最终的值
```

**例四**

```js
function f() { 
  var count = 0; 
  return  function() { 
      count++; 
      console.info(count); 
  } 
} 
var t1 = f();
t1();     //1 
t1();     //2 
t1();     //3 
```

**例五**

```js
var add = function(x) { 
  var sum = 1; 
  var tmp = function(x) { 
      sum = sum + x; 
      return tmp;    
  } 
  tmp.toString = function() { 
      return sum; 
  }
  return tmp; 
} 
alert(add(1)(2)(3).toString());     //6
// add()的第一次参数无效
```

**例六**

```js
var lis = document.getElementsByTagName("li");
for(var i=0;i<lis.length;i++){
  (function(i){
      lis[i].onclick = function(){
           console.log(i);
      };
  })(i);       //事件处理函数中闭包的写法
}  
```

**例七**

```js
var  fn=(function(){
   var  i=10;
   function  fn(){
      console.log(++i);
   }
   return   fn;
})() 
fn();   //11
fn();   //12
```

**例八**

```js
function fun(n,o) {
    console.log(o);
    return {
         fun:function(m) {
               return fun(m,n);
         }
    };
}
var a = fun(0);  //undefined
a.fun(1);  //0  
a.fun(2);  //0  
a.fun(3);  //0  
var b = fun(0).fun(1).fun(2).fun(3);   //undefined  0  1  2
var c = fun(0).fun(1);  
c.fun(2);  
c.fun(3);  //undefined  0  1  1
```

**例九**

```js
// 经典对比
function fn(){
   var arr = [];
   for(var i = 0;i < 5;i ++){
	 arr[i] = function(){
		 return i;
	 }
   }
   return arr;
}
var list = fn();
for(var i = 0,len = list.length;i < len ; i ++){
   console.log(list[i]());
}  //5 5 5 5 5

// 解决办法
function fn(){
  var arr = [];
  for(var i = 0;i < 5;i ++){
	arr[i] = (function(i){
		return function (){
			return i;
		};
	})(i);
  }
  return arr;
}
var list = fn();
for(var i = 0,len = list.length;i < len ; i ++){
  console.log(list[i]());
}  //0 1 2 3 4
```

## 9 立即执行函数表达式

### 1、函数声明和函数表达式

#### 1.1 函数声明（函数语句）

- 使用 function 关键字声明一个函数，再指定一个函数名，叫函数声明。
- 【注意】JavaScript引擎规定，如果function关键字出现在**行首**，一律解释成函数声明语句

```js
// 函数声明
function test() {
	// body
}
//  调用函数
test();
```

#### 1.2 函数表达式    `function expression`

1. 使用 function 关键字声明一个函数，函数名称可被省略，此种情况下的函数是 **匿名函数**（anonymous）。 函数名称只是函数体中的一个本地变量。
2. **将匿名函数赋予一个变量**，叫函数表达式，这是最常见的函数表达式语法形式。

#### 1.3 匿名函数

```js
var myFunction = function() {
	// statement
}
// 也可以为其命名
var myFunction = function nameFunction() {
	// statement
}
```

1. 命名函数表达式的**好处**是当我们遇到错误时，堆栈跟踪会显示函数名，**容易寻找错误**。
2. 可以看到，上面的两个例子都不以function开头。**不以function开头的函数语句就是函数表达式定义**。

#### 1.4 IIFE

但有时需要在定义函数之后，立即调用该函数（**函数只使用一次**）。这种函数就叫做**立即执行函数**，全称为**立即调用函数表达式**IIFE(Imdiately Invoked Function Expression)

### 2、立即调用函数表达式

**立即调用函数表达式**（IIFE）是一个**在定义时就会立即执行的 JavaScript 函数。**

（1）这是一个被称为 **自执行匿名函数 的设计模式**，主要包含两部分。第一部分是包围在 **圆括号运算符()** 里的一个**匿名函数**。

（2）第二部分再一次使用 **()** 创建了一个**立即执行函数表达式**，JavaScript 引擎到此将直接执行函数。

#### 写法

（1）【最常用的两种办法】

```js
// 推荐使用
(function () { /* code */ }());
// 也可以
(function () { /* code */ })();
```

（2）【其他写法】

在Javascript里圆括号内不能包含语句，**当解释器对代码进行解释的时候遇到圆括号就认为这里面是表达式，然后遇到function关键字就认为这是一个函数表达式，而不是函数声明**。而更加奇妙的是只要是能将后面语句预先解释为表达式都可以，不一定是分分组操作符，于是立即执行函数表达式有了五花八门的写法，如下：

```js
(function () { counter1(); }());
(function () { counter1(); })();

var i = function(){ counter1(); }();
true && function () { counter1(); }();
0, function(){ counter1() }();

!function () { counter1(); }();
~function () { counter1(); }();
-function () { counter1(); }();
+function () { counter1(); }();
```

#### 作用

1、IIFE 中的匿名函数拥有 **独立的词法作用域**。这不仅避免了外界访问此 IIFE 中的变量，而且又不会污染全局作用域。（另一种说法 【构造一个函数作用域，防止污染全局变量】）

```js
(function() {
	var name = "Barry";
})();

// 外部不能访问变量 name
name  // undefined
```

2、 JavaScript **没用私有作用域的概念**，如果是在多人开发的项目，你在全局或局部作用域中声明的变量，可能会被其他人不小心用同名的变量给 **覆盖**，根据JavaScript 函数作用域链的特性，使用这种技术可以模仿一个私有作用域，**匿名函数**作为一个“容器”，“容器”内部可以访问外部的变量，而外部环境不能访问“容器”内部的变量，所以 `( function(){…} )()` **内部定义的变量不会和外部的变量发生冲突**，俗称“匿名包裹器”或“命名空间”。

3、【注意】将 IIFE 分配给一个变量，不是存储 IIFE 本身，而是**存储 IIFE 执行后返回的结果**。

```js
var result = (function() {
	var name = "Barry";
	return name;
})();

// IIFE 执行后返回的结果
result; // "Barry"
```

#### 实例

假设有一个需求，每次调用函数，都返回加1的一个数字(数字初始值为0)

**一般情况下，我们会使用全局变量来保存该数字状态**

```js
var a = 0;
function add() {
	return ++a;
}
console.log(add()); // 1
console.log(add()); // 2
```

**自定义属性**

但上面的方法中，变量a实际上只和add函数相关，却声明为全局变量，不太合适

因此，<span style="color:red;">将变量a更改为函数的自定义属性更为恰当</span>

```js
function add() {
	return ++add.count;
}
add.count = 0;
console.log(add()); // 1
console.log(add()); // 2
```

**IIFE**

其实这样做，还是有问题。有些代码可能会无意中将add.count重置

<span style="color:red;">使用IIFE把计数器变量保存为私有变量更安全，同时也可以减少对全局空间的污染</span>

```js
var add =  (function() {
	var counter = 0;
	return function(){
		return ++counter;
	}
})();
console.log(add()); // 1
console.log(add()); // 2
```

<hr>

## 10 异步任务队列  `task queues`

> 本文转载自 [异步任务队列](https://segmentfault.com/a/1190000019123388)
>
> 本文是对于异步系列第一篇里提到的`evenloop`模型中，所提到的任务队列(task queues)的展开分析
>
> *以下代码均使用chrome浏览器运行 关于浏览器表现的差异在最后做补充*

### 一个典型例子

```js
console.log('script start')
// 第一个异步任务
setTimeout(()=>{
    console.log('setTimeout')
},0)

// 第二个异步任务
Promise.resolve().then(()=>{
    console.log('promise1')
}).then(()=>{ 
  console.log('promise2');
})
console.log('script end')
// 实际输出结果： 
// script start
// script end
// promise1
// promise2
// setTimeout
```

根据之前说过的`evenloop`模型，首先输出`script start`和`script end`没有什么问题;
但是接下来却发现：
**先执行了`Promise`指定的`callback`而不是`setTimeout`的`callback`。**-- Why？

### 两种任务队列

**(`microtask queue`&`macrotask queue`)**

在之前讨论evenloop模型时，粗略提到了任务队列有2种类型:`microtask queue`和`macrotask queue`，他们的区别在于:

- `macrotask`的执行：是在evenloop的每次循环过程，先取出macrotask queue中可执行的第一个（*注意不一定是第一个，因为我们说过例如setTimeout可以指定任务被执行的最少延迟时间，当前macrotask queue的首位保存的任务可能还没有到执行时间，所以queue只是代表`callback`插入的顺序，不代表执行时也要按照这个顺序*）。
- `microtask`的执行：在evenloop的每次循环过程之后,**如果当前的执行栈(call stack)为空，那么执行`microtask queue`中所有可执行的任务**

（某些文献内容中 直接把`macrotask`称为`task`,或者某些中文文章中把它们翻译成"微任务"和"宏任务"，含义都是相似的：macrotask或者task代表相对单独占据evenloop过程一次循环的任务，而microtask有可能在一次循环中执行多个）

现在回头来解析前面的例子：

1. 第一次执行主函数，输出`script start`
2. 遇到`setTimeout`，将对应的callback插入`macrotask queue`
3. 遇到`promise`，将对应的callback插入`microtask queue`
4. 输出`script end`，主函数运行结束，执行栈清空，此时开始检查`microtask queue`，发现里面有可运行的任务，因此按顺序输出`promise1`和`promise2`
5. `microtask queue`执行完，开始新一轮循环，从`macrotask queue`取出`setTimeout`任务并执行，输出`setTimeout`
6. 结束，呈现上面的输出结果。

常见异步操作对应的回调函数任务类型如下：

- macrotask: `setTimeout`, `setInterval`, `setImmediate`, `requestAnimationFrame`, `I/O`, `UI rendering`
- microtask: `process.nextTick`, `Promises`, `Object.observe`, `MutationObserver`

大概可以这样区分：和html交互密切相关的异步操作，一般是`macrotasks`；由`emcascript`的相关接口返回的异步操作，一般是`microtasks`

### 如何判断执行顺序

接下来看一个更复杂的例子，帮助理解不同异步任务的执行顺序

```html
<style>
    .outer {
        padding: 30px;
        background-color: aqua;

    }
    .inner {
        height: 100px;
        background-color: brown;
    }
</style>

<body>
    <div class="outer">outer
         <div class="inner">inner</div> 
    </div>
</body>
<script>
    var outer = document.querySelector('.outer');
    var inner = document.querySelector('.inner');

    // Let's listen for attribute changes on the
    // outer element
    new MutationObserver(function () {
        console.log('mutate');
    }).observe(outer, {
        attributes: true
    });

    // Here's a click listener…
    function onClick() {
        console.log('click');

        setTimeout(function () {
            console.log('timeout');
        }, 0);

        Promise.resolve().then(function () {
            console.log('promise');
        });

        outer.setAttribute('data-random', Math.random());
    }

    // …which we'll attach to both elements
    inner.addEventListener('click', onClick);
    outer.addEventListener('click', onClick);
</script>
```

运行以上代码，可以在浏览器看到两个嵌套的div（如图）:

![](js-async-1.png)

**点击inner部分**，打开chrome的调试器，可以看到console打出的结果是:

```
click
promise
mutate
click
promise
mutate
timeout
timeout
```

接下来分析运行过程 (*建议打开chrome单步调试，进行观察分析*)：

1. 点击`inner`,触发对应的`onClick`事件，此时inner对应的`onClick`函数进入执行栈；
2. 运行`console.log('click')`,**输出`(1)click`**；
3. 运行`setTimeout`,`macrotask queue`添加对应的`console`函数
4. 运行`Promise`，此时`microtask queue`添加对应的`console`函数
5. 运行`outer.setAttribute`,触发`MutationObserver`,`microtask queue`添加对应的`console`函数（前面注明了MutationObserver创建的回调任务类型是microtask）
6. 当前函数执行完毕，由于**执行栈清空**，此时开始调度`microtask queue`，因此**依次输出`(2)promise`和`(3)mutate`**，此时**当前执行栈`call stack`和`microtask queue`均为空，但是`macrotask queue`里依然存储着两个东西--inner的Click触发的任务，以及先前setTimeout的回调函数。**
7. inner的`onclick`函数虽然执行完毕，但是由于`事件冒泡`，紧接着要触发`outer`的`onClick`的执行函数，因此`setTimeout`的回调暂时还无法执行。
8. `outer`的`onClick`函数执行过程，重复前面的2-5步骤，因此**输出`(4)click` `(5)promise` `(6)mutate`**
9. 此时**执行栈`call stack`和`microtask queue`均为空，`macrotask queue`存储着两个setTimeout的回调函数。**，根据evenloop模型，开始分别执行这两个task，于是输出了两个`(7)和(8)timeout`
10. 结束。

<br>

在充分理解上面例子的基础上，我们把**点击inner部分的这个操作，改成直接在js代码的末尾加上`innner.click()`**，请问结果是否一致呢？

先说最终结果:

```
click
click
promise
mutate
promise
timeout
timeout
```

由于是直接执行`inner.click()`,这次进入`inner`绑定的`onclick`函数时，与前面是有所不同的:

**通过chrome调试器可以看到，此时的call stack有两层--除了onClick函数之外，还有一层匿名函数，这层函数其实就是最外层的script，相当于window.onload绑定的处理函数。**

接下来分析本次的输出顺序：

1. 重复前面例子中，步骤`2-5`，输出一个`(1)click`
2. `inner`的`onClick`函数执行完毕，**但是这次执行栈并未清空，因为当前匿名函数还在执行栈里，因此无法开始调度`microtask queue`！！！（前面说过，microtask queue的调度必须在当前执行栈为空的情况下）**，因此，这时候会**先进入冒泡事件触发的`onClick`**
3. 类似的，输出`(2)clcik`之后，`promise`的回调函数进入`microtask queue`
4. 运行`outer.setAttribute`,触发`MutationObserver`,但是**此时`microtask queue`无法再次添加对应的回调函数了，因为已经有一个存在的监听函数在`pengding`**
5. 两个`onclick`执行完毕，执行栈清空，接下来开始调度`microtask queue`,输出`(3)promise` `(4)mutate``(5)promise`
6. 此时**当前执行栈`call stack`和`microtask queue`均为空，`macrotask queue`存储着两个setTimeout的回调函数。**根据evenloop模型，开始分别执行这两个task，于是输出了两个`(6)和(7)timeout`
7. 结束

这两个例子的对比，着重说明了一点:
--**`microtask queue`存储的任务，必须要在当前函数执行栈为空时才会开始调度。**



## 11 事件冒泡

### 相关概念

**1、事件捕获** 
捕获型事件(event capturing)：事件从最不精确的对象(document 对象)开始触发，然后到最精确(也可以在窗口级别捕获事件，不过必须由开发人员特别指定) 

**2、事件冒泡** 
冒泡型事件：事件按照从最特定的事件目标到最不特定的事件目标(document对象)的顺序触发。 

**3、捕获和冒泡过程图** 

![](js-bubble-1.png)

事件捕获和事件冒泡属于两个相反的过程

> 里可以有一个我感觉十分恰当的比喻，当你把一个可以漂浮在水面上的物品，使劲向水里砸下去，它会首先有一个下降的过程，这个过程就可以理解为从最顶层向事件发生的最具体元素（目标点）的捕获过程；之后由于浮力大于物体自身的重力，物体会在到达最低点（ 最具体元素）之后漂浮到水面上，这个过程相对于事件捕获是一个回溯的过程，即事件冒泡。 

**以click点击事件为例**。假如我们有一个多层结构标签。如下图，是4个div嵌套。每个div都有点击的监听事件，分别输出1234。当我们点击最里面的div时，点击事件开始传递，传递的**全过程是1-2-3-4-4-3-2-1**。

前半部分，事件从最外面的父div依次传递到最里面的后代div，**1-2-3-4这部分我们叫捕获过程**。

之后事件又从最里层的后代div逐层传出，**4-3-2-1这部分我们叫冒泡过程**。

如果我把捕获监听器和冒泡监听器都加上，如下图这样。

![](js-bubble-2.png)

### 添加两种监听的方法

在不使用任何框架的情况下，我们在js中通过`addEventListener`方法给Dom添加事件监听。

这个方法有三个参数可以传递addEventListener(event,fn,useCapture)。event是事件类型click，focus，blur等；fn是事件触发时将执行的函数方法（function）；第三个参数可以不传，默认是false**，这个参数控制是否捕获触发**。所以我们只传两个参数时，这个事件是冒泡传递触发的，**当第三个参数存在且为true时，事件是捕获传递触发的。**

使用框架时可使用对应的框架提供的方法。如上面我使用了Vue框架，通过事件装饰来区分捕获与冒泡。

### 阻止事件冒泡

> 完整代码

```html
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<script type="text/javascript" src="js/jquery-1.11.0.js"></script>
<title>Insert title here</title>
<style type="text/css">
.box1 {
	border: green 40px solid;
	width: 300px;
	height: 300px;
	margin: auto;
}
 
.box2 {
	border: yellow 40px solid;
	width: 220px;
	height: 220px;
	margin: auto;
}
 
span {
	position: relative;
	left: 50px;
	top: 50px;
	background-color: rgba(128, 128, 128, 0.22);
}
</style>
 
<script type="text/javascript">
	window.onload = function() {
		document.getElementById("body").addEventListener("click",eventHandler);
	}
	function eventHandler(event) {
		console.log("时间："+new Date(event.timeStamp)+" 产生事件的节点：" + event.target.id +"  当前节点："+event.currentTarget.id);
	}
</script>
 
</head>
<body id="body">
	<div id="box1" class="box1">
		<div id="box2" class="box2">
			<span id="span">This is a span.</span>
		</div>
	</div>
</body>
</html>
```

#### 方法一

我们来考虑一个形象一点的情况：水中的一个气泡正在从底部往上冒，而你现在在水中，不想让这个气泡往上冒，怎么办呢？——把它扎破！没了气泡，自然不会往上冒了。类似地，对某一个节点而言，如果不想它现在处理的事件继续往上冒泡的话，我们可以终止冒泡：

在相应的处理函数内，加入 `event.stopPropagation()`  ,终止事件的广播分发，这样事件停留在本节点，不会再往外传播了

```html
<script type="text/javascript">
	window.onload = function() {
		document.getElementById("box1").addEventListener("click",function(event){
			alert("您好，我是最外层div。");
			event.stopPropagation();
		});
		document.getElementById("box2").addEventListener("click",function(event){
			alert("您好，我是第二层div。");
			event.stopPropagation();
		});
		document.getElementById("span").addEventListener("click",function(event){
			alert("您好，我是span。");
			event.stopPropagation();
		});
	}
</script>
```

####  方法二

事件包含最初触发事件的节点引用 和 当前处理事件节点的引用，那如果节点只处理自己触发的事件即可,不是自己产生的事件不处理。`event.target` 引用了产生此event对象的dom 节点，而`event.currrentTarget` 则引用了当前处理节点，我们可以通过这 两个target 是否相等。

​      比如span 点击事件，产生一个event 事件对象，`event.target` 指向了span元素，span处理此事件时，`event.currentTarget` 指向的也是span元素，这时判断两者相等，则执行相应的处理函数。而事件传递给 div2 的时候，`event.currentTarget`变成 div2，这时候判断二者不相等，即事件不是div2 本身产生的，就不作响应处理逻辑。

```html
<script type="text/javascript">
	window.onload = function() {
		document.getElementById("box1").addEventListener("click",function(event){
			if(event.target == event.currentTarget)
			{
			    alert("您好，我是最外层div。");
			}
		});
        document.getElementById("box2").addEventListener("click",function(event){
			if(event.target == event.currentTarget)
			{
				alert("您好，我是第二层div。");
			}
		});
		document.getElementById("span").addEventListener("click",function(event){
            if(event.target == event.currentTarget)
            {
                alert("您好，我是span。");
        	}
        });
	}
</script>
```

#### 比较

​     从事件传递上看：**方法一在于取消事件冒泡，即当某些节点取消冒泡后，事件不会再传递；方法二在于不阻止冒泡，过滤需要处理的事件，事件处理后还会继续传递；**

**优缺点：**

​     **方法一缺点：为了实现点击特定的元素显示对应的信息，方法一要求每个元素的子元素也必须终止事件的冒泡传递**，即跟别的元素功能上强关联，这样的方法会很脆弱。比如，如果span 元素的处理函数没有执行冒泡终止，则事件会传到div2 上，这样会造成div2 的提示信息；

​    **方法二缺点**：方法二为每一个元素都增加了事件监听处理函数，事件的处理逻辑都很相似，即都有判断 `if(event.target == event.currentTarget)`，这样存在了很大的代码冗余，现在是三个元素还好，当有10几个，上百个又该怎么办呢？还有就是为每一个元素都有处理函数，在一定程度上增加逻辑和代码的复杂度。

<br>

​    我们再来分析一下方法二：<span style="color:red;font-weight:bold;">方法二的原理是 元素收到事件后，判断事件是否符合要求，然后做相应的处理，然后事件继续冒泡往上传递；</span>

既然事件是冒泡传递的，那可不可以让某个父节点统一处理事件，通过判断事件的发生地（即事件产生的节点），然后做出相应的处理呢？答案是可以的，下面通过给body 元素添加事件监听，然后通过判断event.target 然后对不同的target产生不同的行为。

​    将方法二的代码重构一下：*结果会是点击不同的元素，只弹出相符合的提示，不会有多余的提示。*

```html
<script type="text/javascript">
	window.onload = function() {
		document.getElementById("body").addEventListener("click",eventPerformed);
	}
	function eventPerformed(event) {
		var target = event.target;
		switch (target.id) {
		case "span": 
			alert("您好，我是span。");
			break;
		case "div1":
			alert("您好，我是第二层div。");
			break;
		case "div2":
			 alert("您好，我是最外层div。");
			break;
		}
	}
</script>
```

通过以上方式，<span style="color:red;font-weight:bold;">我们把本来每个元素都要有的处理函数，都交给了其祖父节点body 元素来完成了，也就是说，span,div2,div1 将自己的响应逻辑委托给body，让它来完成相应逻辑，自己不实现相应逻辑，这个模式，就是所谓的事件委托。</span>

​     下面是一个示意图：

![](js-bubble-3.png)





<span style="color:red;"></span>
# 二 JS常见疑问
## 1 JS全局点击事件

在书写提示弹窗的时候，有可能去利用事件冒泡去捕获弹窗外的点击，然后去关闭该弹窗

> 写在全局的点击事件

![](js-ques-1.png)

> 弹窗部分代码

![](js-ques-2.png)

但是，写在全局的点击事件会造成很多麻烦，为后期迭代维护造成障碍。

**只需要将点击捕获事件放置到提示弹窗的遮罩层上即可**

另外，针对于写在全局的点击事件，也可以用阻止<u>事件冒泡的方式</u>去**补窟窿**

### 两种方法

#### ①原生方法阻止事件穿透

```js
<div @click="testout($event)>
	<div @click="testin($event)"></div>
</div>
.......

testin(event) {
    ......
    event.stopPropagation();
},

```

#### ②`.stop`修饰符

下面的例子中，将会先弹出“noclick”,再弹出“dodo”

```vue
<div id="app">
    <div v-on:click="dodo">
        <button v-on:click="doThis">阻止单击事件继续传播</button>
    </div>
</div>

<script>
    var app = new Vue({
        el: "#app",
        data: {
            name: "Vue.js"
        },
        methods: {
            doThis: function () {
                alert("noclick");
            },
            dodo: function () {
                alert("dodo");
            }
        }
    });
</script>
```

修改为

```html
<div id="app">
    <div v-on:click="dodo">
   		 <button v-on:click.stop="doThis">阻止单击事件继续传播</button>
    </div>
</div>
```

只弹出“noclick”

## 2 在JS中引入外部JS

在js文件中引入（调用）另一个js文件的三种方法

**方法一，在调用文件的顶部加入下例代码**

```js
function addScript(url){
	document.write("<script language=javascript src="+url+"></script>");
}
```

注：有时你引用的文件还可能需要引用其他的js,我们需要将需要的那个js文件也以同样的方法引用进来。

**方法二，在js中写如下代码：**

```js
function addScript(url){
	var script = document.createElement('script');
	script.setAttribute('type','text/javascript');
	script.setAttribute('src',url);
	document.getElementsByTagName('head')[0].appendChild(script);
}
```

利用document.createElement(”script”)生成了一个script的标签，设置其 type属性为text/javascript。

**方法三，利用es6中export和import实现模块化**

一个js文件代表一个js模块 。ES6引入外部模块分两种情况：

**1.导入外部的变量或函数等；**

```js
import {firstName, lastName} from './test';
```

**2.导入外部的模块，并立即执行**

```js
import './test'
//执行test.js，但不导入任何变量
```

## 3 JS中的call、apply、bind方法

> 转载自 [博客园](https://www.cnblogs.com/moqiutao/p/7371988.html)

bind 是返回对应函数，便于稍后调用；apply 、call 则是立即调用 。

### apply与call

在 javascript 中，**call 和 apply 都是为了改变某个函数运行时的上下文（context）而存在的**，换句话说，就是为了改变函数体内部 this 的指向。

JavaScript 的一大特点是，函数存在「定义时上下文」和「运行时上下文」以及「上下文是可以改变的」这样的概念。

```js
function fruits() {}
 
fruits.prototype = {
    color: "red",
    say: function() {
        console.log("My color is " + this.color);
    }
}
 
var apple = new fruits;
apple.say();    //My color is red
```

但是如果我们有一个对象banana= {color : "yellow"} ,我们不想对它重新定义 say 方法，那么我们可以通过 call 或 apply 用 apple 的 say 方法：

```js
banana = {
    color: "yellow"
}
apple.say.call(banana);     //My color is yellow
apple.say.apply(banana);    //My color is yellow
```

所以，可以看出 call 和 apply 是为了动态改变 this 而出现的，当一个 object 没有某个方法（本栗子中banana没有say方法），但是其他的有（js本栗子中apple有say方法），我们可以借助call或apply用其它对象的方法来操作。

### apply与call 区别

对于 apply、call 二者而言，**作用完全一样，只是接受参数的方式不太一样**。例如，有一个函数定义如下：

```js
var func = function(arg1, arg2) {};
```

就可以通过如下方式来调用：

```js
func.call(this, arg1, arg2);
func.apply(this, [arg1, arg2])
```

其中 this 是你想指定的上下文，他可以是任何一个 JavaScript 对象(JavaScript 中一切皆对象)，call 需要把参数按顺序传递进去，而 apply 则是把参数放在数组里。　　

### apply与call 实例

#### 数组之间追加

```js
var array1 = [12 , "foo" , {name:"Joe"} , -2458]; 
var array2 = ["Doe" , 555 , 100]; 

// apply：认为此处的第二参数就是 push 的参数列表
Array.prototype.push.apply(array1, array2); 
// array1 值为  [12 , "foo" , {name:"Joe"} , -2458 , "Doe" , 555 , 100]

// call：认为此处第二个参数就是 push 的第一个参数
Array.prototype.push.call(array1, array2);
// array1 值为  [12, "foo", {…}, -2458, Array(3)]
```

#### 获取数组中的最大值和最小值

```js
var  numbers = [5, 458 , 120 , -215 ]; 
var maxInNumbers = Math.max.apply(Math, numbers),   //458
    maxInNumbers = Math.max.call(Math,5, 458 , 120 , -215); //458
```

number 本身没有 max 方法，但是 Math 有，我们就可以借助 call 或者 apply 使用其方法。

#### 验证是否是数组（前提是toString()方法没有被重写过）

```js
functionisArray(obj){ 
    return Object.prototype.toString.call(obj) === '[object Array]' ;
}
```

#### 类（伪）数组使用数组方法

```js
var domNodes = Array.prototype.slice.call(document.getElementsByTagName("*"));
```

Javascript中存在一种名为伪数组的对象结构。比较特别的是 `arguments 对象`，还有像调用 `getElementsByTagName` , `document.childNodes` 之类的，它们返回`NodeList对象`都属于伪数组。不能应用 Array下的 push , pop 等方法。

但是我们能通过 Array.prototype.slice.call 转换为真正的数组的带有 length 属性的对象，这样 domNodes 就可以应用 Array 下的所有方法了。

#### 面试题

定义一个 log 方法，让它可以代理 console.log 方法，常见的解决方法是：

```js
function log(msg)　{
  console.log(msg);
}
log(1);    //1
log(1,2);    //1
```

上面方法可以解决最基本的需求，但是当传入参数的个数是不确定的时候，上面的方法就失效了，这个时候就可以考虑使用 apply 或者 call，注意这里**`传入多少个参数是不确定的`**，所以使用apply是最好的，方法如下：

```
function log(){
  console.log.apply(console, arguments);
};
log(1);    //1
log(1,2);    //1 2
```

 **接下来的要求是给每一个 log 消息添加一个"(app)"的前辍，比如：**

```
log("hello world"); //(app)hello world
```

该怎么做比较优雅呢？**这个时候需要想到arguments参数是个伪数组，通过 `Array.prototype.slice.call` 转化为标准数组，再使用数组方法unshift**，像这样：

```js
function log(){
  var args = Array.prototype.slice.call(arguments);
  args.unshift('(app)');
 
  console.log.apply(console, args);
};
```

### bind

在讨论bind()方法之前我们先来看一道题目：

```js
var altwrite = document.write;
altwrite("hello");
```

结果：`Uncaught TypeError: Illegal invocation`
altwrite()函数改变this的指向global或window对象，导致执行时提示非法调用异常，正确的方案就是使用bind()方法：

```js
altwrite.bind(document)("hello")
```

当然也可以使用call()方法：

```js
altwrite.call(document, "hello")
```

#### 绑定函数

`bind()`最简单的用法是**创建一个函数，使这个函数不论怎么调用都有同样的this值**。常见的错误就像上面的例子一样，将方法从对象中拿出来，然后调用，并且希望this指向原来的对象。如果不做特殊处理，一般会丢失原来的对象。使用bind()方法能够很漂亮的解决这个问题：

```js
this.num = 9; 
var mymodule = {
  num: 81,
  getNum: function() { 
    console.log(this.num);
  }
};

mymodule.getNum(); // 81

var getNum = mymodule.getNum;
getNum(); // 9, 因为在这个例子中，"this"指向全局对象

var boundGetNum = getNum.bind(mymodule);
boundGetNum(); // 81
```

bind() 方法与 apply 和 call 很相似，也是可以改变函数体内 this 的指向。

<u>MDN的解释是</u>：**bind()方法会创建一个新函数，称为绑定函数，当调用这个绑定函数时，绑定函数会以创建它时传入 bind()方法的第一个参数作为 this，传入 bind() 方法的第二个以及以后的参数加上绑定函数运行时本身的参数按照顺序作为原函数的参数来调用原函数。**

直接来看看具体如何使用，在常见的单体模式中，通常我们会使用 `_this` , `that` , `self` 等保存 this ，这样我们可以在改变了上下文之后继续引用到它。 像这样：

```JS
var foo = {
    bar : 1,
    eventBind: function(){
        var _this = this;
        $('.someClass').on('click',function(event) {
            /* Act on the event */
            console.log(_this.bar);     //1
        });
    }
}
```

由于 `Javascript` 特有的机制，上下文环境在 `eventBind:function(){ }` 过渡到 `$('.someClass').on('click',function(event) { })` 发生了改变，上述使用变量保存 this 这些方式都是有用的，也没有什么问题。

当然使用 bind() 可以更加优雅的解决这个问题：

```JS
var foo = {
    bar : 1,
    eventBind: function(){
        $('.someClass').on('click',function(event) {
            /* Act on the event */
            console.log(this.bar);      //1
        }.bind(this));
    }
}
```

在上述代码里，bind() 创建了一个函数，当这个click事件绑定在被调用的时候，它的 this 关键词会被设置成被传入的值（这里指调用bind()时传入的参数）。

因此，这里我们传入想要的上下文 this(其实就是 foo )，到 bind() 函数中。然后，当回调函数被执行的时候， this 便指向 foo 对象。再来一个简单的栗子：

```js
var bar = function(){
	console.log(this.x);
}
var foo = {
	x:3
}
bar(); // undefined
var func = bar.bind(foo);
func(); // 3
```

这里我们创建了一个新的函数 func，当使用 bind() 创建一个绑定函数之后，它被执行的时候，它的 this 会被设置成 foo ， 而不是像我们调用 bar() 时的全局作用域。

#### 偏函数（Partial Functions）

`bind()`的另一个最简单的用法是<span style="color:red;">使一个函数拥有预设的初始参数</span>。**只要将这些参数（如果有的话）作为`bind()`的参数写在`this`后面。当绑定函数被调用时，这些参数会被<span style="color:#2948ff;">插入到目标函数的参数列表的开始位置</span>，传递给绑定函数的参数会跟在它们后面。**

```js
function list() {
  return Array.prototype.slice.call(arguments);
}

var list1 = list(1, 2, 3); // [1, 2, 3]

// 预定义参数37
var leadingThirtysevenList = list.bind(undefined, 37);

var list2 = leadingThirtysevenList(); // [37]
var list3 = leadingThirtysevenList(1, 2, 3); // [37, 1, 2, 3]
```

#### 和setTimeout一起使用

```js
function Bloomer() {
  this.petalCount = Math.ceil(Math.random() * 12) + 1;
}

// 1秒后调用declare函数
Bloomer.prototype.bloom = function() {
  window.setTimeout(this.declare.bind(this), 100);
};

Bloomer.prototype.declare = function() {
  console.log('我有 ' + this.petalCount + ' 朵花瓣!');
};

var bloo = new Bloomer();
bloo.bloom(); //我有 5 朵花瓣!
```

注意：对于事件处理函数和setInterval方法也可以使用上面的方法

#### 绑定函数作为构造函数

绑定函数也适用于使用new操作符来构造目标函数的实例。当使用绑定函数来构造实例，注意：this会被忽略，但是传入的参数仍然可用。

```js
function Point(x, y) {
  this.x = x;
  this.y = y;
}

Point.prototype.toString = function() { 
  console.log(this.x + ',' + this.y);
};

var p = new Point(1, 2);
p.toString(); // '1,2'


var emptyObj = {};
var YAxisPoint = Point.bind(emptyObj, 0/*x*/);
// 实现中的例子不支持,
// 原生bind支持:
var YAxisPoint = Point.bind(null, 0/*x*/);

var axisPoint = new YAxisPoint(5);
axisPoint.toString(); // '0,5'

axisPoint instanceof Point; // true
axisPoint instanceof YAxisPoint; // true
new Point(17, 42) instanceof YAxisPoint; // true
```

#### 捷径

bind()也可以为需要特定this值的函数创造捷径。

例如要将一个类数组对象转换为真正的数组，可能的例子如下：

```js
var slice = Array.prototype.slice;

// ...

slice.call(arguments);
```

如果使用`bind()`的话，情况变得更简单：

```js
var unboundSlice = Array.prototype.slice;
var slice = Function.prototype.call.bind(unboundSlice);

// ...

slice(arguments);
```

#### 实现

上面的几个小节可以看出bind()有很多的使用场景，但是bind()函数是在 ECMA-262 第五版才被加入；它可能无法在所有浏览器上运行。这就需要我们自己实现bind()函数了。

首先我们可以通过给目标函数指定作用域来简单实现bind()方法：

```js
Function.prototype.bind = function(context){
  self = this;  //保存this，即调用bind方法的目标函数
  return function(){
      return self.apply(context,arguments);
  };
};
```

考虑到函数柯里化的情况，我们可以构建一个更加健壮的bind()：

```js
Function.prototype.bind = function(context){
  var args = Array.prototype.slice.call(arguments, 1),
  self = this;
  return function(){
      var innerArgs = Array.prototype.slice.call(arguments);
      var finalArgs = args.concat(innerArgs);
      return self.apply(context,finalArgs);
  };
};
```

这次的`bind()`方法可以绑定对象，也支持在绑定的时候传参。

继续，Javascript的函数还可以作为构造函数，那么绑定后的函数用这种方式调用时，情况就比较微妙了，需要涉及到原型链的传递：

```js
Function.prototype.bind = function(context){
  var args = Array.prototype.slice(arguments, 1),
  F = function(){},
  self = this,
  bound = function(){
      var innerArgs = Array.prototype.slice.call(arguments);
      var finalArgs = args.concat(innerArgs);
      return self.apply((this instanceof F ? this : context), finalArgs);
  };

  F.prototype = self.prototype;
  bound.prototype = new F();
  return bound;
};
```

这是《JavaScript Web Application》一书中对bind()的实现：通过设置一个中转构造函数F，使绑定后的函数与调用bind()的函数处于同一原型链上，用new操作符调用绑定后的函数，返回的对象也能正常使用instanceof，因此这是最严谨的bind()实现。

对于为了在浏览器中能支持bind()函数，只需要对上述函数稍微修改即可：

```js
if (!Function.prototype.bind) {
  Function.prototype.bind = function(oThis) {
    if (typeof this !== 'function') {
      // closest thing possible to the ECMAScript 5
      // internal IsCallable function
      throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
    }

    var aArgs   = Array.prototype.slice.call(arguments, 1),
        fToBind = this,
        fNOP    = function() {},
        fBound  = function() {
          // this instanceof fBound === true时,说明返回的fBound被当做new的构造函数调用
          return fToBind.apply(this instanceof fBound
                 ? this
                 : oThis,
                 // 获取调用时(fBound)的传参.bind 返回的函数入参往往是这么传递的
                 aArgs.concat(Array.prototype.slice.call(arguments)));
        };

    // 维护原型关系
    if (this.prototype) {
      // Function.prototype doesn't have a prototype property
      fNOP.prototype = this.prototype; 
    }
    // 下行的代码使fBound.prototype是fNOP的实例,因此
    // 返回的fBound若作为new的构造函数,new生成的新对象作为this传入fBound,新对象的__proto__就是fNOP的实例
    fBound.prototype = new fNOP();

    return fBound;
  };
}
```

**有个有趣的问题，如果连续 bind() 两次，亦或者是连续 bind() 三次那么输出的值是什么呢？像这样：**

```js
var bar = function(){
    console.log(this.x);
}
var foo = {
    x:3
}
var sed = {
    x:4
}
var func = bar.bind(foo).bind(sed);
func(); //?
 
var fiv = {
    x:5
}
var func = bar.bind(foo).bind(sed).bind(fiv);
func(); //?
```

答案是，两次都仍将输出 3 ，而非期待中的 4 和 5 。原因是，在Javascript中，多次 bind() 是无效的。更深层次的原因， bind() 的实现，相当于使用函数在内部包了一个 call / apply ，第二次 bind() 相当于再包住第一次 bind() ,故第二次以后的 bind 是无法生效的。

### apply、call、bind比较

那么 apply、call、bind 三者相比较，之间又有什么异同呢？何时使用 apply、call，何时使用 bind 呢。简单的一个栗子：

```js
var obj = {
    x: 81,
};
 
var foo = {
    getX: function() {
        return this.x;
    }
}
 
console.log(foo.getX.bind(obj)());  //81
console.log(foo.getX.call(obj));    //81
console.log(foo.getX.apply(obj));   //81
```

三个输出的都是81，但是注意看使用 bind() 方法的，他后面多了对括号。

也就是说，区别是：**当你希望改变上下文环境之后并非立即执行，而是回调执行的时候，使用 bind() 方法。而 apply/call 则会立即执行函数**。

再总结一下：

- apply 、 call 、bind 三者都是用来改变函数的this对象的指向的；
- apply 、 call 、bind 三者第一个参数都是this要指向的对象，也就是想指定的上下文；
- apply 、 call 、bind 三者都可以利用后续参数传参；
- bind 是返回对应函数，便于稍后调用；apply 、call 则是立即调用 。



## 4 日期操作汇总

### 日期相关本地函数

#### 1、生成标准日期格式下的自定义日期格式字符串

```js
function formatDateTime(value) {
  const date = new Date(value);
  const y = date.getFullYear();
  let MM = date.getMonth() + 1;
  MM = MM < 10 ? (`0${MM}`) : MM;
  let d = date.getDate();
  d = d < 10 ? (`0${d}`) : d;
  let h = date.getHours();
  h = h < 10 ? (`0${h}`) : h;
  let m = date.getMinutes();
  m = m < 10 ? (`0${m}`) : m;
  let s = date.getSeconds();
  s = s < 10 ? (`0${s}`) : s;
  return `${y}-${MM}-${d}   ${h}:${m}:${s}`;
}
```

### 常用日期数据内置方法

```jsx
new Date();		// 返回标准时间，如：Sat Nov 21 2020 13:04:56 GMT+0800 (中国标准时间)

// 下面的三种方法均为获取当前时间戳
+new Date();
Date.now();		//获取当前时间戳
new Date().getTime() ;  // 获取时间戳方法

Date.parse(that.fendDate);      //YYYY-MM-DD转为毫秒级时间戳

// 获取整点时间戳
new Date(new Date(new Date(new Date().toLocaleDateString()).getTime()))
toLocaleString() 	// 根据本地时间格式，把 Date 对象转换为字符串。 
toLocaleTimeString() 	// 根据本地时间格式，把 Date 对象的时间部分转换为字符串。
toLocaleDateString() 	// 根据本地时间格式，把 Date 对象的日期部分转换为字符串，如"2020/11/21"
```

#### 查询扩展

```jsx
getDate() 从 Date 对象返回一个月中的某一天 (1 ~ 31)。 
getDay() 从 Date 对象返回一周中的某一天 (0 ~ 6)。 
getMonth() 从 Date 对象返回月份 (0 ~ 11)。 
getFullYear() 从 Date 对象以四位数字返回年份。 
getYear() 请使用 getFullYear() 方法代替。 
getHours() 返回 Date 对象的小时 (0 ~ 23)。 
getMinutes() 返回 Date 对象的分钟 (0 ~ 59)。 
getSeconds() 返回 Date 对象的秒数 (0 ~ 59)。 
getMilliseconds() 返回 Date 对象的毫秒(0 ~ 999)。 

getTime() 返回 1970 年 1 月 1 日至今的毫秒数。 

getTimezoneOffset() 返回本地时间与格林威治标准时间 (GMT) 的分钟差。 

getUTCDate() 根据世界时从 Date 对象返回月中的一天 (1 ~ 31)。 

getUTCDay() 根据世界时从 Date 对象返回周中的一天 (0 ~ 6)。 

getUTCMonth() 根据世界时从 Date 对象返回月份 (0 ~ 11)。 

getUTCFullYear() 根据世界时从 Date 对象返回四位数的年份。 

getUTCHours() 根据世界时返回 Date 对象的小时 (0 ~ 23)。 

getUTCMinutes() 根据世界时返回 Date 对象的分钟 (0 ~ 59)。 

getUTCSeconds() 根据世界时返回 Date 对象的秒钟 (0 ~ 59)。 

getUTCMilliseconds() 根据世界时返回 Date 对象的毫秒(0 ~ 999)。 

parse() 返回1970年1月1日午夜到指定日期（字符串）的毫秒数。 

// setter
setDate() 设置 Date 对象中月的某一天 (1 ~ 31)。 
setMonth() 设置 Date 对象中月份 (0 ~ 11)。 
setFullYear() 设置 Date 对象中的年份（四位数字）。 
setYear() 请使用 setFullYear() 方法代替。 
setHours() 设置 Date 对象中的小时 (0 ~ 23)。 
setMinutes() 设置 Date 对象中的分钟 (0 ~ 59)。 
setSeconds() 设置 Date 对象中的秒钟 (0 ~ 59)。 
setMilliseconds() 设置 Date 对象中的毫秒 (0 ~ 999)。 

setTime() 以毫秒设置 Date 对象。 

setUTCDate() 根据世界时设置 Date 对象中月份的一天 (1 ~ 31)。 

setUTCMonth() 根据世界时设置 Date 对象中的月份 (0 ~ 11)。 

setUTCFullYear() 根据世界时设置 Date 对象中的年份（四位数字）。 

setUTCHours() 根据世界时设置 Date 对象中的小时 (0 ~ 23)。 

setUTCMinutes() 根据世界时设置 Date 对象中的分钟 (0 ~ 59)。 

setUTCSeconds() 根据世界时设置 Date 对象中的秒钟 (0 ~ 59)。 

setUTCMilliseconds() 根据世界时设置 Date 对象中的毫秒 (0 ~ 999)。 

toSource() 返回该对象的源代码。 

toString() 把 Date 对象转换为字符串。 

toTimeString() 把 Date 对象的时间部分转换为字符串。 

toDateString() 把 Date 对象的日期部分转换为字符串。 

toGMTString() 请使用 toUTCString() 方法代替。 

toUTCString() 根据世界时，把 Date 对象转换为字符串。 

toLocaleString() 根据本地时间格式，把 Date 对象转换为字符串。 
toLocaleTimeString() 根据本地时间格式，把 Date 对象的时间部分转换为字符串。
toLocaleDateString() 根据本地时间格式，把 Date 对象的日期部分转换为字符串。 

UTC() 根据世界时返回 1997 年 1 月 1 日 到指定日期的毫秒数。valueOf() 返回 Date 对象的原始值。=
```

### 常用日期需求

#### 1、获取时间戳

首先，应该获取 `Date` 类型的数据

```js
var date = new Date('2020-1-1');
// 形式必须是 yyyy-MM-dd HH:mm:ss 的形式
```

`Date` 类型转化为时间戳有三种方法：

```js
// 方法一  会精确到毫秒，毫秒用000替代
var time1 = date.getTime();  
// 方法二  会精确到毫秒，毫秒用000替代
var time2 = date.valueOf();
// 方法三  精确到秒
var time3 = Date.parse(date);
```

> 注意：获取到的时间戳除以1000就可获得Unix时间戳，就可传值给后台得到。







## 5 奇葩操作

### 1、点击按钮复制内容

```js
// html
<el-button type="primary" round size="mini" @click="copyUrl">复制url</el-button>  

//js
copyUrl() {
    const input = document.createElement('input')
    document.body.appendChild(input)
    input.setAttribute('value',"这里可以写变量或者要复制的字符串内容")
    input.select()
    if (document.execCommand('copy')) {
        document.execCommand('copy')
    }
    document.body.removeChild(input)；
}
```


## 6 XMLHttpRequest

> [From MSN](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest)
>
> [From 简书：XMLHttpRequest—必知必会](https://www.jianshu.com/p/918c63045bc3/)

### 常见问题

#### 1、以 `Form` 表单形式传递参数

注意修改**请求头**  `application/x-www-form-urlencoded`

```js
req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
```



# 三 ES3~ES5
## 1 数据类型

- ES6的数据类型有8种。

- 在ES5的时候，我们认知的数据类型确实是 6种：**Number、String、Boolean、undefined、object、Null**。

ES6 中新增了一种 `Symbol` 。**这种类型的对象永不相等，即始创建的时候传入相同的值，可以解决属性名冲突的问题，做为标记。**

_Chrome67版本_ 中还出现了一种 `bigInt`。 Javascript 中的**任意精度整数，可以安全存储和操作大整数。即始超出 Number 能够表示的安全整数范围。**

### JS 的数据类型有几种？

8种。Number、String、Boolean、Null、undefined、object、symbol、bigInt

### Object 中包含了哪几种类型？

其中包含了Data、function、Array等，这三种是常规用的。

### JS的基本类型和引用类型有哪些呢？

基本类型（单类型）：除Object。 String、Number、boolean、null、undefined。

引用类型：object。里面包含的 function、Array、Date。

### null 和 undefined 有什么区别？

`Null` 只有一个值，是 null。不存在的对象。

`Undefined` 只有一个值，是undefined。没有初始化；undefined 是从 null 中派生出来的。

_简单理解就是_：undefined 是没有定义的，null 是定义了但是为空。

### null 不存在的原因是什么？如何解决？

不存在的原因是：

1､方法不存在

2､对象不存在

3､字符串变量不存在

4､接口类型对象没初始化

解决方法：

做判断处理的时候，放在设定值的最前面

== 和 === 有什么区别，什么场景下使用？

### 双等号（相同）

（1）如果两个值类型相同，再进行三个等号(===)的比较

（2）如果两个值类型不同，也有可能相等，需根据以下规则进行类型转换在比较：

　　　　1）如果一个是null，一个是undefined，那么相等

　　　　2）如果一个是字符串，一个是数值，把字符串转换成数值之后再进行比较

### 三等号===（严格相同）

（1）如果类型不同，就一定不相等

（2）如果两个都是数值，并且是同一个值，那么相等；如果其中至少一个是NaN，那么不相等。（判断一个值是否是NaN，只能使用isNaN( ) 来判断）

（3）如果两个都是字符串，每个位置的字符都一样，那么相等，否则不相等。

（4）如果两个值都是true，或是false，那么相等

（5）如果两个值都引用同一个对象或是函数，那么相等，否则不相等

（6）如果两个值都是null，或是undefined，那么相等

_简单理解就是_ 当进行双等号比较时候： 先检查两个操作数数据类型，如果相同， 则进行`===`比较， 如果不同， 则愿意为你进行一次类型转换， 转换成相同类型后再进行比较， 而`===`比较时， 如果类型不同，直接就是false

### 对象可以比较吗？

对象是可以比较，遍历比较key 和 value就行， `Object.is(value1, value2)`

### 如何判断数据类型？

1､`typeof` 操作符（通用：上面有内容有讲到）

2､`toString ( )` 将其他类型转成 string 的方法

支持：number、boolean、string、object

不支持：null 、undefined

3､`toLocaleString ( )` 把数组转成本地字符串

> let arr = ['1','2','3','4'];  
  arr.toLocaleString()  
<- "1,2,3,4"

4､检测数组类型的方法

① `instanceof` 操作符

②对象的 `constructor` 属性

③ `Array.isArray( )` 检验值是否为数组

## 2 内置对象

在JS里，一切皆为或者皆可以被用作对象。可通过new一个对象或者直接以字面量形式创建变量（如`var i="aaa"`)，所有变量都有对象的性质。

**注意**：通过字面量创建的对象在调用属性和方法时会被对象包装器暂时包装成一个对象，具有对象的性质。

var str="我不是一个真的对象";  
alert(str.length);   //str被暂时包装成一个String对象，可调用该对象的属性和方法

不过这并不意味着它就是一个对象了，`typeof(str)的值为仍String`。

而通过new的对象，如

```js
var str=new String("aaa")；  
typeof("str")==Object;//true
```

> [!note] 关于所有内置对象（其实除了Math及全局对象，其余的为构造函数）。参考 [Mmdn](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects)！


### 另一角度对内置对象的解读

> [!note] 原文链接 [JS所有内置对象属性和方法汇总](https://segmentfault.com/a/1190000011467723)



## 3 定时器

### setTimeout 和 setTnterval

`setTimeout`和`setInterval`的语法相同。它们都有两个参数，一个是将要执行的**代码字符串**或者**函数**，还有一个是**以毫秒为单位的时间间隔**，当过了那个时间段之后就将执行那段代码。**它返回一个整数，表示定时器timer的编号，可以用来取消该定时器。**

虽然表面上看来setTimeout只能应用在on-off方式的动作上，不过可以通过创建一个函数循环重复调用setTimeout，以实现重复的操作：

```js
showTime();  
​  
function showTime() {  
  var today = new Date();  
  alert("The time is: " + today.toString());  
  setTimeout("showTime()", 5000);  
}
```

一旦调用了这个函数，那么就会每隔5秒钟就显示一次时间。如果使用setInterval，则相应的代码如下所示：
```js
setInterval("showTime()", 5000);  
​  
function showTime(){  
  var today = new Date();  
  alert("The time is: " + today.toString());  
}
```

### setTimeout的妙用：防止循环超时

JS是单线程的，一个代码块里面的代码，只能按顺序从上到下执行，所以如果中间有一块代码，执行起来非常耗时，就会导致下面的代码无法执行，出现浏览器假死的状态。

JS的耗时操作，常见的有两种 **1.向服务器发起请求 2.对数组的循环操作** （当然，还有一种，就是把1和2合在一起，叫做 在循环操作里面向服务器发出请求，哈哈哈，实际项目里面经常有人这么干）

解决这两种耗时操作的思路都是一样的——**异步编程**。JS的异步编程，并不是多线程，因为正如上面所说的，JS是单线程的。JS的异步，直观上的理解，就是**延时和回调**。

- 对于第一种耗时情况，我们采用的是**ajax异步请求**，待耗时的请求返回结果时，进行回调操作。
    
- 对于第二种耗时情况，则可以使用本文即将介绍的方法，setTimeout延时调用，**进行数组分块处理**。
    

那么，真正的问题来了：假设我们要处理一个大小为100的数组，对于数组中每个元素，都需要执行大量的处理，每个元素大约需要1s的处理时间；并且**我们认为，程序后面的代码，不会依赖于我们对这个数组的处理结果。**

于是就有了下面这段代码，以两种方式来处理这个数组**一种是常规方式，一种是setTimeout的数组分块处理**

同样地也可以用`promise`处理

```js
var processTime = 0;  
//常规操作  
tcCircle();  
//注释上面的代码 放开下面注释 以执行setTimeout数组分块操作  
//tcCircleUseSetTimeout();  
//time consuming circle  
function tcCircle(){  
  var arr = new Array(100);  
  for(var i=0;i<arr.length;i++){  
    process(arr[i]);  
  }  
  //页面标题栏一直转圈 且下面的语句迟迟无法执行  
  console.log("important process");  
  console.log("finish!");  
}  
function tcCircleUseSetTimeout(){  
  var arr = new Array(100);  
  setTimeout(function(){  
    var ele = arr.shift();  
    process(ele);  
    if(arr.length>0){  
      setTimeout(arguments.callee,100);  
    }  
  },100);  
  console.log("important process");  
  console.log("finish!");  
}  
function process(ele){  
  console.log("process"+(++processTime));  
  //模拟长时间的处理过程  
  sleep(1000);  
}  
function sleep(sleepTime){  
  var start=new Date().getTime();  
  while(true){  
    if(new Date().getTime()-start>sleepTime){  
      break;    
    }  
  }  
}
```

### 再谈理解JS运行机制

`JavasScript`引擎是基于事件驱动和单线程执行的，JS引擎一直等待着任务队列中任务的到来，然后加以处理，浏览器无论什么时候都只有一个JS线程在运行程序，即主线程。

> 通俗的说：JS在同一时间内只能做一件事，这也常被称为 “阻塞式执行”。

那么单线程的`JavasScript`是怎么实现“非阻塞执行”呢？

异步容易实现非阻塞，所以在JavaScript中对于耗时的操作或者时间不确定的操作，使用异步就成了必然的选择。 诸如事件点击触发回调函数、ajax通信、计时器这种异步处理是如何实现的呢？

答：**任务队列**

> 任务队列：一个先进先出的队列，它里面存放着各种事件和任务。

所有任务可以分成两种，一种是**同步任务（synchronous）**，**另一种是异步任务**（asynchronous）。

**同步任务**：在主线程上排队执行的任务，只有前一个任务执行完毕，才能执行后一个任务。

- 输出，如：console.log()
    
- 变量的声明
    
- 同步函数：如果在函数返回的时候，调用者就能够拿到预期的返回值或者看到预期的效果，那么这个函数就是同步的。
    

**异步任务**

- setTimeout和setInterval
    
- DOM事件
    
- Promise
    
- process.nextTick
    
- fs.readFile
    
- http.get
    
- 异步函数：如果在函数返回的时候，调用者还不能够得到预期结果，而是需要在将来通过一定的手段得到，那么这个函数就是异步的。
    

除此之外，任务队列又分为**macro-task（宏任务）与micro-task（微任务）**，在ES5标准中，它们被分别称为task与job。

**宏任务**

1. I/O
    
2. setTimeout
    
3. setInterval
    
4. setImmdiate
    
5. requestAnimationFrame
    

**微任务**

1. process.nextTick
    
2. Promise
    
3. Promise.then
    
4. MutationObserver
    

**宏任务和微任务的执行顺序**

一次事件循环中，先执行宏任务队列里的一个任务，再去执行同步任务，然后把微任务队列里的所有任务执行完毕，再开启下一个`event loop`去宏任务队列取下一个宏任务执行。

> 注：在当前的微任务没有执行完成时，是不会执行下一个宏任务的。

**seTimeout运行机制**

setTimeout 和 setInterval的运行机制是将指定的代码移出本次执行，等到下一轮 Event Loop 时，再检查是否到了指定时间。如果到了，就执行对应的代码；如果不到，就等到再下一轮 Event Loop 时重新判断。

这意味着，setTimeout指定的代码，必须等到本次执行的所有同步代码都执行完，才会执行。

**异步队列执行的时间**

```js
for (var i = 0; i < 4; i++) {  
     setTimeout(function () {  
        console.log(i);  
     }, 1000);  
}  
// 隔1s后一起输出：4 4 4 4
```

执行到异步任务的时候，会直接放到异步队列中吗？答案是不一定的。

因为浏览器有个定时器（timer）模块，定时器到了执行时间才会把异步任务放到异步队列。 `for循环体`执行的过程中并没有把setTimeout放到异步队列中，只是交给定时器模块了。4个循环体执行速度非常快（不到1毫秒）。定时器到了设置的时间才会把setTimeout语句放到异步队列中。

> 即使setTimeout设置的执行时间为0毫秒，也按4毫秒算。

这就解释了上题为什么会连续输出四个4的原因。

> HTML5 标准规定了setTimeout()的第二个参数的最小值，即最短间隔，不得低于4毫秒。如果低于这个值，就会自动增加。在此之前，老版本的浏览器都将最短间隔设为10毫秒。

利用闭包实现 `setTimeout` 间歇调用

```js
for (let i = 0; i < 4; i++) {  
     (function (j) {  
        setTimeout(function () {  
            console.log(j);  
        }, 1000 * i)  
     })(i);  
}  
// 会隔1s输出一个值，分别是：0 1 2 3
```

- 此方法巧妙利用IIFE声明即执行的函数表达式来解决闭包造成的问题。
    
- 将var改为let，使用了ES6语法。
    

这里也可以用setInterval()方法来实现间歇调用。

利用JS中基本类型的参数传递是按值传递的特征实现

实现原理：传过去的i值被复制

```js
var output = function (i) {  
     setTimeout(function () {  
        console.log(i);  
    }, 1000 * i)  
}  
for (let i = 0; i < 4; i++) {  
    output(i);  
}  
// 隔1s输出一个值，分别是：0 1 2 3
```

基于Promise的解决方案

优点：提高了代码的可读性。

**注意**：如果没有处理Promise的reject，会导致错误被丢进黑洞。

```js
const tasks = [];  
   
const output = (i) => new Promise((resolve) => {  
 setTimeout(() => {  
 console.log(i);  
 resolve();  
 }, 1000 * i);  
   
});  
   
//生成全部的异步操作  
for (var i = 0; i < 5; i++) {  
 tasks.push(output(i));  
}  
//同步操作完成后，输出最后的i  
Promise.all(tasks).then(() => {  
 setTimeout(() => {  
 console.log(i);  
 }, 1000)  
})  
​  
//执行后：会隔1s输出一个值，分别是：0 1 2 3 4 5

使用ES7中的async await特性的解决方案（推荐）

const sleep = (timeountMS) => new Promise((resolve) => {  
     setTimeout(resolve, timeountMS);  
});  
   
(async () => { //声明即执行的async  
     for (var i = 0; i < 5; i++) {  
         await sleep(1000);  
         console.log(i);  
     }  
     await sleep(1000);  
     console.log(i);  
})();  
// 执行后，会隔1s输出一个值，分别是：0 1 2 3 4 5
```



# 四 ES6新特性及前沿

> [!tip] 核心内容来自于 [阮一峰的ECMAScript](https://es6.ruanyifeng.com/#README)
> 下面的是一点补充：Web Worker


## 1 Web Worker

> [!note] 可参考 [Web Worker 使用教程](http://www.ruanyifeng.com/blog/2018/07/web-worker.html)

JavaScript 语言采用的是单线程模型，也就是说，所有任务只能在一个线程上完成，一次只能做一件事。前面的任务没做完，后面的任务只能等着。随着电脑计算能力的增强，尤其是多核 CPU 的出现，单线程带来很大的不便，无法充分发挥计算机的计算能力。

Web Worker 的作用，就是为 JavaScript 创造多线程环境，允许主线程创建 Worker 线程，将一些任务分配给后者运行。在主线程运行的同时，Worker 线程在后台运行，两者互不干扰。等到 Worker 线程完成计算任务，再把结果返回给主线程。这样的好处是，一些计算密集型或高延迟的任务，被 Worker 线程负担了，主线程（通常负责 UI 交互）就会很流畅，不会被阻塞或拖慢。

Worker 线程一旦新建成功，就会始终运行，不会被主线程上的活动（比如用户点击按钮、提交表单）打断。这样有利于随时响应主线程的通信。但是，这也造成了 Worker 比较耗费资源，不应该过度使用，而且一旦使用完毕，就应该关闭。


# 五 DOM 与 BOM

## 1 JS中的DOM操作

DOM（Document Object Model） 是 W3C（World Wide Web Consortium）标准。同时也定义了访问诸如 XML 和 HTML 文档的标准。

DOM是一个使程序和脚本有能力动态地访问和更新文档的内容、结构以及样式的平台和语言中立的接口。

> [!tip] 原文传送门：[Js的DOM操作](https://www.cnblogs.com/zxt-17862802783/p/7498790.html)


## 2 BOM及BOM操作

```
网页可见区域宽： document.body.clientWidth
网页可见区域高： document.body.clientHeight
网页可见区域宽： document.body.offsetWidth (包括边线的宽)
网页可见区域高： document.body.offsetHeight (包括边线的高)
网页正文全文宽： document.body.scrollWidth
网页正文全文高： document.body.scrollHeight
网页被卷去的高： document.body.scrollTop
网页被卷去的左： document.body.scrollLeft
网页正文部分上： window.screenTop
网页正文部分左： window.screenLeft
屏幕分辨率的高： window.screen.height
屏幕分辨率的宽： window.screen.width
屏幕可用工作区高度： window.screen.availHeight
屏幕可用工作区宽度： window.screen.availWidth
```


# 六 JS 内置函数

> [!tip] 相关资料
>
> [ECMAScript 6 入门](https://es6.ruanyifeng.com/)
>
> [廖雪峰的JavaScript教程](https://www.liaoxuefeng.com/wiki/1022910821149312)
>
> [MSD—>Nice！@](https://developer.mozilla.org/zh-CN/)

