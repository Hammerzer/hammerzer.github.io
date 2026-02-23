---
title: CPP核心编程
date: 2024-03-12 12:29:39
urlname: cpp核心编程
tags:
  - CPP
  - 基础知识
categories: C++开发
description: C++ 核心编程：C++高手的必备基础知识。
draft: false
---

> [!tip] C++ 核心编程
> 
> - 内存分区模型
> - 引用
> - 函数提高
> - 类和对象
> - 运算符重载
> - 类的继承
> - 类的多态
> - 编译器



# 一 内存分区模型

C++程序在执行时，将内存大方向划分为**4个区域**：

- 代码区：存放函数体的二进制代码，由操作系统进行管理的
- 全局区：存放全局变量和静态变量以及常量
- 栈区：由编译器自动分配释放，存放函数的参数值,局部变量等【速度快、容量小】
- 堆区：由程序员分配和释放。若程序员不释放，程序结束时由操作系统回收【自由存储区】

**内存四区意义**：不同区域存放的数据，赋予不同的生命周期，给我们更大的灵活编程。

## 1.1 程序运行前

​在程序编译后，生成了exe可执行程序，**未执行该程序前**分为两个区域：

1. ​**代码区：**
	- 存放 CPU 执行的机器指令。
	- 代码区是**共享**的，共享的目的是对于频繁被执行的程序，只需要在内存中有一份代码即可。
	- 代码区是**只读**的，使其只读的原因是防止程序意外地修改了它的指令。
2. ​**全局区：**
	- 全局变量和静态变量存放在此。
	- 全局区还包含了常量区, 字符串常量和其他常量也存放在此。
	- ​<span style="background:#FFFF00;">该区域的数据在程序结束后由操作系统释放</span>。

```c++
//全局变量
int g_a = 10;
int g_b = 10;

//全局常量
const int c_g_a = 10;
const int c_g_b = 10;

int main() {

	//局部变量
	int a = 10;
	int b = 10;

	//打印地址
	cout << "局部变量a地址为： " << (int)&a << endl;
	cout << "局部变量b地址为： " << (int)&b << endl;

	cout << "全局变量g_a地址为： " <<  (int)&g_a << endl;
	cout << "全局变量g_b地址为： " <<  (int)&g_b << endl;

	//静态变量
	static int s_a = 10;
	static int s_b = 10;

	cout << "静态变量s_a地址为： " << (int)&s_a << endl;
	cout << "静态变量s_b地址为： " << (int)&s_b << endl;

	cout << "字符串常量地址为： " << (int)&"hello world" << endl;
	cout << "字符串常量地址为： " << (int)&"hello world1" << endl;

	cout << "全局常量c_g_a地址为： " << (int)&c_g_a << endl;
	cout << "全局常量c_g_b地址为： " << (int)&c_g_b << endl;

	const int c_l_a = 10;
	const int c_l_b = 10;
	cout << "局部常量c_l_a地址为： " << (int)&c_l_a << endl;
	cout << "局部常量c_l_b地址为： " << (int)&c_l_b << endl;

	system("pause");

	return 0;
}
```

打印结果：

![](cppcore1-1.png)

> [!note] 总结：
> * C++中在程序运行前分为全局区和代码区
> * 代码区特点是共享和只读
> * 全局区中存放全局变量、静态变量、常量
> * 常量区中存放 const 修饰的全局常量和字符串常量




## 1.2 程序运行后

​**栈区**：由编译器自动分配释放，存放函数的参数值、局部变量等。

> [!attention] 不要返回局部变量的地址，栈区开辟的数据由编译器自动释放。

```c++
int * func()
{
	int a = 10;
	return &a;
}

int main() {

	int *p = func();

	cout << *p << endl;
	cout << *p << endl;

	system("pause");
	return 0;
}
```

​**堆区：** 由程序员分配释放。若程序员不释放，程序结束时由操作系统回收。

> [!NOTE] ​在C++中主要利用 `new` 在堆区开辟内存。

```c++
int* func()
{
    // 把数据开辟到堆区
    // 指针本质上在栈区，但数据放在堆区
	int* a = new int(10);
	return a;
}

int main() {

	int *p = func();
	cout << *p << endl;
	cout << *p << endl;
    
	system("pause");
	return 0;
}
```

> [!NOTE] 总结：
> 
> 1. 堆区数据由程序员管理开辟和释放
> 2. 堆区数据利用new关键字进行开辟内存



## 1.3 new操作符

C++中利用 `new` 操作符在堆区开辟数据【基于C语言的内存分配实现】。

1. 利用new创建的数据，会返回该数据对应的类型的指针；失败则返回0。
2. 堆区开辟的数据，由程序员手动开辟，手动释放，释放利用操作符 `delete`。

```c++
int* func()
{
	int* a = new int(10);
	return a;
}

int main() {

	int *p = func();
    int *pp = new int[3];//分配了3个

	cout << *p << endl;
	cout << *p << endl;
    
	//利用delete释放堆区数据【堆区数据由用户释放】
	delete p;
    delete[] pp;//释放多个[]定义的变量

	//cout << *p << endl; //报错，释放的空间不可访问

	system("pause");
	return 0;
}
```



```c++
//堆区开辟数组
int main() {

	int* arr = new int[10];

	for (int i = 0; i < 10; i++)
	{
		arr[i] = i + 100;
	}

	for (int i = 0; i < 10; i++)
	{
		cout << arr[i] << endl;
	}
	//释放数组 delete 后加 []
	delete[] arr;

	system("pause");

	return 0;
}

```



## 1.4 动态内存分配【C】

### 1.4.1 malloc 函数

C语言中的**内存动态分配 `malloc` 函数**：`void* malloc(size_t size);`

> [!note] size_t 是自定义类型，等价于 unsigned

功能：为用户分配 `size` 字节内存，并返回内存分配的地址（该地址为`void`类型）；分配失败返回0。

下面的代码应该是一种新手常见的错误：

```c++
#include <iostream>
using namespace std;


int main()
{
	unsigned x;
    cin >> x;
    
    //int a[x];// 报错：x必须为常量
    int *p = (int*)malloc(x * sizeof(int)); // 堆区
    
    if(p == 0){
        // 最好写成 p == nullptr【c++】，在面向对象编程有优势
        cout << "内存分配失败" << endl;
    }
    
	system("pause");
	return 0;
}
```

### 1.4.2 calloc 函数

```cpp
void* calloc(x, sizeof(int));
```

其与`malloc`有两点区别：
- 只需提供元素个数，函数内部完成乘法计算
- 自动初始化为0

### 1.4.3 realloc 函数

重新分配函数：如果分配失败返回0。

```cpp
void* realloc(void* _Block, size_t Size);
```

> [!attention] 上面的函数分配的都是连续的内存

<br>
### 1.4.4 free 函数

```cpp
 void free(void* Block);
```

> `free`后的指针变为悬挂指针，需要重置为0来避免出错。

### 1.4.5 memcpy 内存拷贝函数

```cpp
void* memcpy(void* _Dst, const void* _Src, Size_t Size);
```

```c++
int main()
{
	int a[3]{1,2,3,4};
    int *b = new int[5];
    
    memcpy(b, a, 2 * sizeof(int)); // Size为字节数

	system("pause");
	return 0;
}
```

### 1.4.6 memset 内存设置函数

```cpp
void* memset(void* _Dst, int val, Size_t Size);
```

功能：将该区域的每一个子节设置为`val`

> [!attention] 其设置的是每一个字节，如果用0x123h来设置，最高位会被舍弃，结果等价于用0x23h来操作。



## 1.5 动态分配内存的风险

### 1.5.1 悬挂指针

```c++
#include <iostream>
using namespace std;

int main()
{
	// C中
	int* p = (int*)malloc(5 * sizeof(int));
	p[0] = 205;
	
	free(p);
	p[2] = 255; // 悬挂指针还能继续使用就很危险

	//C++
	int* pp = new int[1000];
	pp[0] = 205;
	int* tmp = pp;

	delete[] pp;
    // delete pp; //现阶段不会报错，但加入面向对象后会报错
	// pp[20] = 10; // 报错！
	tmp[1] = 1; // 居然未报错！!!

	system("pause");
	return 0;
}
```

### 1.5.2 内存碎片

- 对于嵌入式开发等对内存要求高的方向，需要注意；
- 除此以外，new和delete，以及足够的虚拟内存也会帮助解决内存碎片的问题。



<br>

# 二 引用

## 2.1 引用的基本使用

给变量起别名【别名与原变量的内存地址一致，用于提高代码效率】

```C++
int main() {

	int a = 10;
	int &b = a;

	cout << "a = " << a << endl; // 10
	cout << "b = " << b << endl; // 10

	b = 100;

	cout << "a = " << a << endl; // 100
	cout << "b = " << b << endl; // 100
    
    int aa[]{1,2,3};
    for(int& x : aa)
    {
        x = x + 1; // 会对原数组操作
    }

	system("pause");
	return 0;
}
```



## 2.2 引用注意事项

* 引用必须初始化
* 引用在初始化后，不可以改变【有时“改变”的时候，被视为赋值操作】

```C++
int main() {

	int a = 10;
	int b = 20;
	//int &c; //错误，引用必须初始化
	int &c = a; //一旦初始化后，就不可以更改
	c = b; //这是赋值操作，不是更改引用

	cout << "a = " << a << endl; // 20
	cout << "b = " << b << endl; // 20
	cout << "c = " << c << endl; // 20

	system("pause");
	return 0;
}
```



## 2.3 引用做函数参数

**作用：** 函数传参时，可以利用引用的技术，让形参修饰实参。

**优点：** 可以简化指针修改实参。

```C++
//1. 值传递
void mySwap01(int a, int b) {
	int temp = a;
	a = b;
	b = temp;
}

//2. 地址传递
void mySwap02(int* a, int* b) {
	int temp = *a;
	*a = *b;
	*b = temp;
}

//3. 引用传递【别名与原名相同】
void mySwap03(int& a, int& b) {
	int temp = a;
	a = b;
	b = temp;
}

int main() {

	int a = 10;
	int b = 20;

	mySwap01(a, b);
	cout << "a:" << a << " b:" << b << endl;// 交换失败

	mySwap02(&a, &b);
	cout << "a:" << a << " b:" << b << endl;// 交换成功

	mySwap03(a, b);
	cout << "a:" << a << " b:" << b << endl;// 交换成功

	system("pause");
	return 0;
}
```

> [!note] 通过引用参数产生的效果同按地址传递是一样的，且引用的语法更清楚简单。



## 2.4 引用做函数返回值

**作用**：引用是可以作为函数的返回值存在的。

> [!attention] 不要返回局部变量引用

**用法**：函数调用作为左值。

> [!attention] 静态变量只被定义一次【涉及内存分配，也只有一次】，程序结束自动释放

**示例：**

```C++
//返回局部变量引用
int& test01() {
	int a = 10; //局部变量【栈区】
	return a;
    // 内存已经被回收--【第一次读结果正确，第二次读错误】
}

//返回静态变量引用
int& test02() {
	static int a = 20; // 静态变量【全局区 | 程序结束由系统释放】
	return a;
}

int main() {

	//不能返回局部变量的引用
	int& ref = test01();
	cout << "ref = " << ref << endl;
	cout << "ref = " << ref << endl;

	//如果函数做左值，那么必须返回引用
	int& ref2 = test02();
	cout << "ref2 = " << ref2 << endl;
	cout << "ref2 = " << ref2 << endl;

	test02() = 1000; // ！！！！！！！！！！
    // 返回a的引用，之后对a进行操作

	cout << "ref2 = " << ref2 << endl;
	cout << "ref2 = " << ref2 << endl;

	system("pause");
	return 0;
}
```



## 2.5 引用的本质

**本质**：引用的本质在c++内部实现是一个指针常量。

讲解示例：

```C++
//发现是引用，转换为 int* const ref = &a;
void func(int& ref){
	ref = 100; // ref是引用，转换为*ref = 100
}
int main(){
	int a = 10;
    
    //自动转换为 int* const ref = &a; 指针常量是指针指向不可改，也说明为什么引用不可更改
	int& ref = a; 
	ref = 20; //内部发现ref是引用，自动帮我们转换为: *ref = 20;
    
	cout << "a:" << a << endl;
	cout << "ref:" << ref << endl;
    
	func(a);
	return 0;
}
```

> [!note] C++推荐用引用技术，因为语法方便，引用本质是指针常量，但是所有的指针操作编译器都帮我们做了



## 2.6 常量引用

在函数形参列表中，可以加 const 修饰形参，**防止形参改变实参**的误操作。

```C++
//引用使用的场景，通常用来修饰形参
void showValue(const int& v) {
	//v += 10;
	cout << v << endl;
}

int main() {

	//int& ref = 10;  引用本身需要一个合法的内存空间，因此这行错误
	//加入const就可以了，编译器优化代码，int temp = 10; const int& ref = temp;
	const int& ref = 10;

	//ref = 100;  //加入const后不可以修改变量
	cout << ref << endl;

	//函数中利用常量引用防止误操作修改实参
	int a = 10;
	showValue(a);

	system("pause");
	return 0;
}
```



## 2.7 右值引用

函数参数：右值引用【优化内存开销】

```c++
#include <iostream>
using namespace std;

void add(int& a)
{
	a += 10;
}
void add1(int&& a) {
	cout << a  << endl;
}

int main()
{
	int x = 1;
	add(x);
	cout << x << endl;

	x = x + 10 + 1;
	add(x);
	cout << x << endl;

	//add(20 + 1);//错误：非常量引用的初始值必须为左值
	// 当实际应用中，20+1是大型结构体时，就很有用了
	//add(x + 20 + 1);// x+20的临时值，被称为【右值】【也可以暂时理解为等号左边的为左值，但也不太准确】
	int a[10];
	*(a + 1) = 100;// a+1也是临时值，故为右值
	int& y = x; // 左值引用
	int&& z = 20 + 200;// 右值引用
	//int&& z = x;//错误
	z = 1000; // z的值还是不变【右值引用无法写入】

	// 右值引用应用
	add1(z+20+200);// 省去了为中间变量分配内存再读写的开销【z+20的tmp】

	system("pause");
	return 0;
}
```

另一个例子：

```c++
#include <iostream>
using namespace std;

struct Role
{
	int hp;
	int mp;
};
Role createM()
{
	Role rt{ 10,20 };
	return rt;
}
void show(Role r)
{
	cout << r.hp << "/" << r.mp << endl;
}

// 右值引用
void showR(Role&& r)
{
	cout << r.hp << "/" << r.mp << endl;
}

// 左值引用【左值引用无法传递这种不明确的内存空间】
void showL(Role& r)
{
	cout << r.hp << "/" << r.mp << endl;
}

int main()
{
	// createM返回结构体，show接到后一一赋值
	show(createM());

	// 使用右值引用来避免重复的变量赋值
	showR(createM());
    
	// 使用左值引用
	showL(createM());// 错误：非常量的引用的初始值必须为左值，而该函数的返回值是个右值，只是个临时变量而已

	system("pause");
	return 0;
}
```



## 2.8 引用的其他注意

### 2.8.1 类型转换

- 引用传参不允许隐式类型转换
- 数组引用及数组引用传参

```c++
#include <iostream>
using namespace std;

void add1(int a)
{
	a += 10;
}
void add2(int& a) {
	a += 10;
}

int main()
{
	int x = 1;
	add1(x);
	cout << x << endl;

	add2(x);
	cout << x << endl;

	float y = 1.1f;
	add1(y);// 无报错
	//add2(y); // 错误：引用传参时，不允许隐式类型转换，因为引用本质是指针

	// 数组引用
	int a[100];
	// 首先b是引用，之后是数组的引用
	int(&b)[100] = a;
	//int(&b)[10] = a;// 长度需要对应

	system("pause");
	return 0;
}
```

<br>

### 2.8.2 指针和引用的异同

相同点：都是地址的概念。指针指向一块内存，它的内容是所指内存的地址【逻辑地址】；而引用则是某块内存的别名，本质在c++内部实现是一个指针常量。

区别：

1. 访问方式不同：指针保存的是所指对象的地址【实体】，引用仅仅是对象的别名【非实体】，**引用不占内存**。指针需要通过解引用间接访问，而引用是直接访问。
2. 非空区别：引用不能为空，指针可以为空。
3. 可修改区别：引用必须在定义时就初始化，并且不能改变所指的对象；而指针可以改变地址，从而改变所指的对象。
4. 合法性区别：引用是类型安全的，而指针不是 【引用比指针多了类型检查】。

<br>



# 三 函数提高

## 3.1 函数默认参数

在C++中，函数的形参列表中的形参是可以有**默认值**的。

```C++
int func(int a, int b = 10, int c = 10) {
	return a + b + c;
}

//1. 如果某个位置参数有默认值，那么从这个位置往后，从左向右，必须都要有默认值
//2. 如果【函数声明 | 函数实现】只能有一处设置默认值
int func2(int a = 10, int b = 10);
int func2(int a, int b) {
	return a + b;
}

int main() {

	cout << "ret = " << func(20, 20) << endl;
	cout << "ret = " << func(100) << endl;

	system("pause");
	return 0;
}
```



## 3.2 函数占位参数

C++中函数的形参列表里可以有占位参数，用来做占位，调用函数时必须填补该位置。

> [!note] 在现阶段函数的占位参数存在意义不大，但是后面的课程中会用到该用法。

```C++
//函数占位参数 ，占位参数也可以有默认参数
void func(int a, int) {
	cout << "this is func" << endl;
}
// 占位参数也可以有默认参数
void func(int a, int = 10) {
	cout << "this is func" << endl;
}

int main() {

	func(10,10); //占位参数必须填补

	system("pause");
	return 0;
}
```







## 3.3 函数的本质

### 3.3.1 汇编底层

查看反汇编：打断点 / 开始调试 / 调试-窗口-反汇编。

1. 建议一：调整为 `Release`【发布模式】，可以减少无用的多余汇编，便于理解
2. 建议二：解决方案的工程右击选择属性，选择【C/C++ | 优化】优化已禁用，便于初级理解汇编

![](cppcore3-1.png)

```c++
#include <iostream>
using namespace std;

int Add(int a, int b)
{
	return a + b;
}

int main()
{
	int c = Add(1, 2);
	cout << c << endl;

	cout << Add << endl;
	

	// 显示Add函数的字节码
	char* str = (char*)Add;
	for (int i = 0; i < 30; i++)
	{
		//printf("%X\n", (unsigned char)str[i]);//16进制
		cout << hex << (int)str[i] << endl;
	}

	//str[1] = 25;// 该内存不允许更改

	system("pause");
	return 0;
}
```

> [!note] 因此，函数名本质是个地址，该地址空间存放代码。



### 3.3.2 从函数的角度理解栈

> [!question] 栈存在的意义
> 变量的本质是对应的内存空间，因此每个变量都需要独立的内存空间。在实际开发过程中，一个函数可能被重复调用，如果每次都重新分配内存空间，那么系统开销会非常大；也不能提前分配固定大小的内存（万一一次也不被调用）。

由此才用了栈的概念，这是一段提前分配好的内存空间，主要用来存放临时变量。这样做，只需要管理好栈的读写，就可以避免频繁的内存分配和内存浪费。

```c++
#include <iostream>
using namespace std;

int Ave(int a, int b)
{
	a = a + 250;
	return a + b;
}

int Add(int a, int b)
{
	int c = 250;
	int d = Ave(a, b);
	c = c + d;
	return c;
}

int main()
{
	cout << Add << endl;

	system("pause");

	int x = Add(250, 50);
	cout << x << endl;

	return 0;
}
```


- 栈是预先分配好的连续的内存空间，其中包含局部变量、函数参数等，通过esp、ebp来控制创建和释放
- 栈平衡如果被破坏，函数可能无法返回正确的位置。【利用此原理，可以控制目标程序进入指定位置，来获取目标操作系统的控制权限，即栈攻击】

**栈溢出攻击** 示例：

```c++
// class16.7.cpp : 此文件包含 "main" 函数。程序执行将在此处开始并结束。
//

#include <iostream>
#include <iomanip>

void Hack()
{
	unsigned long long x = 0;
	for (int i = 0; true; i++)
	{
		if (i % 100000000 == 0)
		{
			system("cls");
			std::cout << "\n■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■\n";
			std::cout << "\n 你的系统已经被我们拿下! hacked by 黑兔档案局:[ID:000001 ]\n";
			std::cout << "\n              加群:868267304 解除\n";
			std::cout << "\n\\>正在传输硬盘数据....已经传输" << x++ << "个文件......\n\n";

			std::cout << std::setfill('>')<< std::setw(x % 60) << "\n";

			std::cout << "\n\\>摄像头已启动!<==============\n\n";

			std::cout << std::setfill('#') << std::setw(x % 60) << "\n";

			std::cout << "\n\\>数据传输完成后将启动自毁程序!CPU将会温度提升到200摄氏度\n";

			std::cout << "\n■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■\n";
		}
	}
}

int GetAge()
{
	int rt;
	std::cout << "请输入学员的年龄:";
	std::cin >> rt;
	return rt;
}

int count()
{
	int i{};
	int total{};
	int age[10]{};
	do
	{
		age[i] = GetAge();
		total += age[i];
		//将AGE[I]保存到数据库中
	} while (age[i++]);
	return total;
}

int main()
{
	std::cout << "======= 驴百万学院 学员总年龄统计计算系统 =====\n";
	std::cout << "\n                API:"<<Hack<<std::endl;
	std::cout << "\n[说明:最多输入10个学员的信息,当输入0时代表输入结束]\n\n";
	std::cout << "\n驴百万学院的学员总年龄为:" << count();
}
```





## 3.4 函数指针

语法：`函数返回类型 （*函数指针变量名）（参数类型 名称，...）`

> 例：`int (*pAdd)(int a, int b)`【只要符合返回值类型和参数类型即可指向】

```c++
#include <iostream>
using namespace std;

//typedef int(*)(int, int) p;// 错误写法
typedef int(*p)(int, int);

using pp = int(*)(int, int);

int Add(int a, int b)
{
	return a + b;
}
float Addf(int a, int b)
{
	return (a + b)/2;
}

int main()
{
	// 声明函数指针
	// int (*pAdd)(int a, int b); // 也可
	int (*pAdd)(int, int) = Add;
	//int (*pAdd)(int, int) { Add };

	int c = pAdd(1, 2);
	cout << c << endl;

	// 强行指向【强制转换】
	int (*pAddf)(int, int) = (int (*)(int, int))Addf;
	cout << pAdd(1, 2) << endl;

	// 存在的问题：强转语句过长
	// 解决一：typedef重定义
	p pAddf1 = (p)Addf;

	// 解决二：using 推荐
	pp pAddf2 = (pp)Addf;

	system("pause");
	return 0;
}
```

结构体作为参数的函数指针：

```c++
#include <iostream>
using namespace std;

struct Role
{
	int hp;
	int mp;
};

// 结构体的本质：多个基本类型的组合，以下的定义都是等价的
typedef int(*pr)(Role);
typedef int(*p)(int, int);
using pp = int(*)(int, int);
using ppr = int(*)(Role);

int Exp(Role r)
{
	return r.hp + r.mp;
}

// 函数指针的用法之一🔺🔺🔺
int test(int a, int b, pp x)
{
	return x(a, b);
}

int main()
{
	// 声明函数指针
	Role r1{ 10,20 };
	cout << Exp(r1) << endl;

	pr ptrExp1 = Exp;
	cout << ptrExp1(r1) << endl;

	p ptrExp1 = (p)Exp;// 二者的参数不同，但本质一致，只需要一次强制转换
	cout << ptrExp1(r1) << endl;

	system("pause");
	return 0;
}
```

> [!attention] 指针函数是函数，其返回值是指针；而函数指针是指针，是指向函数的指针。 



## 3.5 函数重载

### 3.5.1 函数重载概述

**作用：**函数名可以相同，提高复用性

**函数重载满足条件：**

* 同一个作用域下
* 函数名称相同
* 函数参数**类型不同**  或者 **个数不同** 或者 **顺序不同**
* 非纯C环境

**注意:**  

- 函数的返回值不可以作为函数重载的条件【重载不能仅仅是返回值不同】
- 参数是指针或数组，其本质都是指针，属于相同类型

```C++
//函数重载需要函数都在同一个作用域下
void func()
{
	cout << "func 的调用！" << endl;
}
void func(int a)
{
	cout << "func (int a) 的调用！" << endl;
}
void func(double a)
{
	cout << "func (double a)的调用！" << endl;
}
void func(int a ,double b)
{
	cout << "func (int a ,double b) 的调用！" << endl;
}
void func(double a ,int b)
{
	cout << "func (double a ,int b)的调用！" << endl;
}

//函数返回值不可以作为函数重载条件
//int func(double a, int b)
//{
//	cout << "func (double a ,int b)的调用！" << endl;
//}


int main() {

	func();
	func(10);
	func(3.14);
	func(10,3.14);
	func(3.14 , 10);
	
	system("pause");

	return 0;
}
```



### 3.5.2 函数重载注意事项

* 引用作为重载条件
* 函数重载碰到函数默认参数，产生歧义的不可以重载
* 函数重载的函数参数，如果是临时变量【比如经过强制类型转换后的值，这样的值只是临时变量】是无法被引用的【引用的本质是指针，而临时变量是没有固定内存地址的】
* 函数重载的函数参数，一个是`int`，一个是 `const int`，本质都无法印象外部变量，因此属于相同情况

```C++
//函数重载注意事项
//1、引用作为重载条件

void func(int &a)
{
	cout << "func (int &a) 调用 " << endl;
}

/* 不用时，可以编译成功；但使用不可编译
void func(int a)
{
	cout << "func (int a) 调用 " << endl;
}
*/

void func(const int &a)
{
	cout << "func (const int &a) 调用 " << endl;
}


//2、函数重载碰到函数默认参数

void func2(int a, int b = 10)
{
	cout << "func2(int a, int b = 10) 调用" << endl;
}

void func2(int a)
{
	cout << "func2(int a) 调用" << endl;
}

int main() {
	
	int a = 10;
	func(a); //调用无const
	func(10);//调用有const


	//func2(10); //碰到默认参数产生歧义，需要避免

	system("pause");

	return 0;
}
```



## 3.6 函数模板

> [!note] 函数模板，是对函数重载的补充。

函数模板是面向编译器的，对于不确定的类型可以声明未知类型代替，对于确定的可以直接指定。除此以外，就是函数，可以有默认参数、重载等。

### 3.6.1 举例

```c++
#include <iostream>
using namespace std;

int ave(int a, int b)
{
	return (a+b)/2;
}
float ave(float a, float b)
{
	return (a + b) / 2;
}

// 函数模板
template <typename T> 
T ave(T a, T b)
{
	return (a + b) / 2;
}

int main()
{
	short a{ 1 }, b{ 2 };
	cout << ave(a, b)<<endl;

	// 可以显式地为函数模板指定类型
	//cout << ave(2,2.0f) << endl; //	编译器无法推断
	cout << ave<int>(2, 2.0f) << endl;

	system("pause");
	return 0;
}
```



### 3.6.2 函数模板和重载

当函数模板中，使用指针传参时，会出现一系列问题，这些问题需要额外的处理。

> [!attention] 编译器处理的优先级： 函数重载 > 函数模板例外处理 > 函数模板

```c++
#include <iostream>
using namespace std;

// 函数模板
template <typename T>
T bigger(T a, T b)
{
	return a > b ? a : b;
}

// 函数模板例外处理
template <>
int* bigger(int* a, int* b)
{
	return *a > *b ? a : b;// 走此处
}

// 函数重载
float* bigger(float* a, float* b)
{
	return *a > *b ? a : b;
}
 
int main()
{
	int a{ 100 }, b{ 200 };
	int c;

	// 其答案是否正确，依赖于a，b的内存地址大小
	c = *bigger(&a, &b);  // 走函数模板例外处理
	// 需要定义函数模板的例外情况
	cout << c << endl;

	system("pause");
	return 0;
}
```

函数模板的重载：

```c++
#include <iostream>
using namespace std;

template <typename T>
T ave(T a, T b)
{
	return (a + b) / 2;
}

template <typename T>
T ave(T a, T b, T c)
{
	return (a + b + c) / 3;
}

int main()
{
	int a{ 100 }, b{ 200 }, d{ 300 };

	cout << ave(a, b) << endl;
	cout << ave(a, b, d) << endl;

	system("pause");
	return 0;
}
```



### 3.6.3 函数模板参数

① 函数模板参数的默认值【直接指定 | 间接指定】

```c++
#include <iostream>
using namespace std;

template <typename TR, typename T1, typename T2>
TR ave(T1 a, T2 b)
{
	return (a + b) / 2;
}

template <typename TR = int, typename T1, typename T2>
TR aveT1(T1 a, T2 b)
{
	return (a + b) / 2;
}

int main()
{
	// 为TR指定默认参数
	cout << ave<int>(3, 2.22) << endl;
	
	// 为TR间接指定默认参数
	cout << aveT1(3, 2.22) << endl;
	
	system("pause");
	return 0;
}
```

② 非类型的模板参数【指定类型的变量】【可处理不定长数组问题】

```c++
#include <iostream>
using namespace std;

template <int max = 2000, int min, typename T>
bool changeHp(T& hp, T damage)// 需要指定max和min【其不是变量】,可指定默认值
{
	hp -= damage;
	if (hp > max) hp = max;
	return hp < min;
}
template <typename T, int max = 2000, int min = 1000>
bool changeHp2(T& hp, T damage)// 需要指定max和min【其不是变量】,可指定默认值
{
	hp -= damage;
	if (hp > max) hp = max;
	return hp < min;
}

// 处理不定长数组问题
template<typename T, short COUNT>
T ave(T(&ary)[COUNT])
{
	T all{};
	for (int i = 0; i < COUNT; i++)
	{
		all += ary[i];
	}
	return all / COUNT;
}

int main()
{
	int hp = 2500;
	const int x = 2000;
	changeHp<2000, 1000>(hp, 100);
	// changeHp<x, 1000>(hp, 100);
	// changeHp2(hp, 100);
	cout << "hp:" << hp << endl;

	//利用非类型的模板参数处理不定长数组问题
	int a[5]{ 1,2,3,4,5 };
	cout << "ave:" << ave(a)<<endl;
	//decltype((hp)) aa;
	
	system("pause");
	return 0;
}
```



### 3.6.4 函数模板本质

对下面代码得出的反汇编进行分析

```c++
template<typename T>
T ave(T a, T b)
{
	return (a + b) / 2;
}

int main()
{
	ave(100, 200);
	ave(short(100), short(200));
	
	system("pause");
	return 0;
}
```

反汇编：

```asm
    12: 	ave(100, 200);
00007FF77F60255B  mov         edx,0C8h  
00007FF77F602560  mov         ecx,64h  
00007FF77F602565  call        00007FF77F60167C  
    13: 	ave(short(100), short(200));
00007FF77F60256A  mov         dx,0C8h  
00007FF77F60256E  mov         cx,64h  
00007FF77F602572  call        00007FF77F601681  
```

可以看到，同一个函数的调用地址不同，即编译器根据模板生成了两个函数。

总结来说：
1. 每次调用模板函数，编译器都会生成一个函数
2. 但完全相同的模板参数的函数只生成一次【方便的空间代价】

总的来说，函数模板的语法，是跟编译器打交道。



### 3.6.5 练习：万能排序

```c++
#include <iostream>
#include<string>
using namespace std;

template <typename T>
void Swap(T& a, T& b)
{
	T tmp{ a };
	a = b;
	b = tmp;
}
// bigsort=true:
template <typename T>
void sort(T* ary, unsigned count, bool bigsort = true)
{
	for (int i = 1; i < count; i++)
	{
		for (int j = 1; j < count; j++)
		{
			bool bcase = bigsort ? ary[j] > ary[j - 1]:ary[j] < ary[j - 1];
			if (bcase) Swap(ary[j], ary[j - 1]);
		}
	}
}

int main()
{
	int a[6]{ 1,5,2,4,3,6 };
	string str[3]{ "12","456","01" };
	sort(a, 6);
	sort(str, 3);

	for (auto x : a)
		cout << x << " ";
	cout << endl;
	for (auto x : str)
		cout << x << " ";

	system("pause");
	return 0;
}
```



## 3.7 推断函数模板

### 3.7.1 auto

`auto` 可以声明一个变量，让编译器根据变量的值来推断变量类型。例如：

```c++
auto a{123}; // 等价于 int a{123};
```

利用 `auto` 的这一特性，我们可以利用`auto`来创建一个函数：

```c++
auto ave(int a, int b){
    return a + b;
}
// 相当于
int ave(int a, int b){
    return a + b;
}
```

> [!attention] 注意：上面的 `auto` 的例子只是演示，`auto` 的应用场景并非这里

**`auto` 的注意事项**

- `auto` 不能保留 `const` 属性
	- 如： `auto` 变量用 `const` 的变量赋值
- `auto` 变量可由函数返回值赋值
- `auto` 会优先推断为值类型，而非引用类型
	- 如：变量 `a` 及其引用别名 `la`，为 `auto` 变量赋值，推断为变量a的类型

```c++
#include <iostream>
using namespace std;

// 比较两个引用大小，要求返回原值
int& bigger(int& a, int& b)
{
	return a > b ? a : b;
}

// 返回值为auto时，优先推断为值类型，而非引用类型
/*
auto bigger(int& a, int& b)
{
	return a > b ? a : b;
}*/

// 弥补：拖尾函数【指定auto的类型】
auto biggerT(int& a, int& b) -> int&
{
	return a > b ? a : b;
}

int main()
{
	int a{ 100 }, b{ 200 }, d{ 300 };

	// 将大的值直接改为500【此处b大，即直接将b改为500】
	bigger(a, b) = 500;
	cout << b << endl;

	biggerT(a, b) = 600;
	cout << b << endl;
	// 注：显示不了引用而已
	cout << "auto的类型：" << typeid(biggerT(a, b)).name() << endl;


	system("pause");

	return 0;
}
```



### 3.7.2 decltype

`decltype` 关键字可以得出一个表达式的**类型**。

语法：`decltype(表达式)`

```c++
int a{5}, c{6};
unsigned b{2};
int* pc{&c};

// 经历运算后的右值
decltype(a - b) x; // 相当于 unsigned x; 【int - unsigned = unsigned】

// 经历运算后的左值【*pc也算运算，简介运算符】
decltype(*pc) y; // int& y;
decltype(pc[0]) y; // int& y;
decltype(pc[5]) y; // int& y; // 有固定地址，只是没有访问权限

// 经历运算后的右值
decltype(*pc + 1) z; // int z;
// 经历运算后的右值
decltype((a)) z; // int& z;
```

> [!note] `unsigned` 的容量更大，故运算前 `int` 先转换为 `unsigned` 再运算

`decltype` **关键字处理原则**：

- 如果 `decltype` 内的表达式没有经历过任何运算，那么得出的数据类型与表达式的数据类型相同，并且可以保留 `const` 和引用【`auto` 不会保留】
- 若其经历过运算，那么得出的数据类型根据运算结果是否有固定的内存地址【即左值】来决定。
	- 如果为左值，则就是该左值的数据类型；
	- 如果为右值，则为该结果的类型【如上例子中的变量 `x`】。
- 如果 `decltype` 的表达式是一个函数，那么得到的数据类型由函数返回值确定【**编译器不会执行函数**，但 `auto` 是会执行函数的】



### 3.7.3 `auto->decltype` 拖尾

> 对 `auto` 中案例的补充

```c++
#include <iostream>
using namespace std;

// 比较两个引用大小，要求返回原值
int& bigger(int& a, int& b)
{
	return a > b ? a : b;
}

// 弥补：拖尾函数【指定auto的类型】
auto biggerT(int& a, int& b) -> int&
{
	return a > b ? a : b;
}

// 使用decltype推断类型【此时的表达式是有固定地址的左值，则推断类型为int&】
auto biggerTT(int& a, int& b) -> decltype(a > b ? a : b)
{
	return a > b ? a : b;
}

// C++14之后的写法优化
decltype(auto) biggerTTT(int& a, int& b)
{
	return a > b ? a : b;
}

int main()
{
	int a{ 100 }, b{ 200 }, d{ 300 };

	// 将大的值直接改为500【此处b大，即直接将b改为500】
	bigger(a, b) = 500;
	cout << b << endl;

	biggerT(a, b) = 600;
	cout << b << endl;

	biggerTT(a, b) = 700;
	cout << b << endl;

	biggerTTT(a, b) = 800;
	cout << b << endl;

	system("pause");
	return 0;
}
```



### 3.7.4 推断函数模板的返回类型

尝试将以下函数修改为函数模板，对于第二个函数，依靠目前的知识无法完成【参数的类型不同】，下面是解决办法【多申明几个位置类型变量】：

```c++
#include <iostream>
using namespace std;

int ave1(int a, int b)
{
	return (a + b) / 2;
}

// 无法模板化：需要两种类型T1,T2
int ave2(float a, int b)
{
	return (a + b) / 2;
}

double ave3(int a, float b)
{
	return (a + b) / 2;
}

// ave1的模板化
template <typename T>
T ave(T a, T b)
{
	return (a + b) / 2;
}
// ave2的模板化: 多申明几种类型【这样很笨重】
template <typename T1, typename T2>
T2 ave2T1(T1 a, T2 b)
{
	return (a + b) / 2;
}
template <typename T1, typename T2>
T1 ave2T2(T1 a, T2 b)
{
	return (a + b) / 2;
}

// ave3的模板化: 多申明几种类型template <typename T1, typename T2>
template <typename T1, typename T2, typename TR>
TR ave3T1(T1 a, T2 b) // 这样写无法确定TR的类型，故报错【需要显式指定】
{
	return (a + b) / 2;
}

template <typename TR, typename T1, typename T2>
TR ave3T2(T1 a, T2 b) // 这样写无法确定TR的类型，故报错【需要显式指定第一个】
{
	return (a + b) / 2;
}

int main()
{
	cout << ave2T1(3.2, 2) << endl;
	// 可以显式指定类型
	cout << ave2T1<float, int>(3.2, 2) << endl;

	// 必须显式指定类型
	cout << ave3T1<int, float, double>(3, 2.22) << endl;
	// 必须指定第一个类型，后面的可选
	cout << ave3T2< double>(3, 2.22) << endl;
	system("pause");

	return 0;
}
```

下面推断函数模板的返回类型：【以比较两个不同类型值大小的代码为例】

```c++
#include <iostream>
using namespace std;

template <typename T1, typename T2>
T1 bigger(T1 a, T2 b) // 函数返回值类型存在问题
{
	return a > b ? a : b;
}

// auto推断返回类型【c++14以后】
template <typename T1, typename T2>
auto biggerAuto(T1 a, T2 b)
{
	return a > b ? a : b;
}
// auto推断返回类型【c++14以前】
template <typename T1, typename T2>
auto biggerAuto1(T1 a, T2 b) -> decltype(a > b ? a : b)
{
	return a > b ? a : b;
}
// auto推断返回类型【c++14以后,biggerAuto1的简写，默认是对return后表达式的推断】
template <typename T1, typename T2>
decltype(auto) biggerAuto2(T1 a, T2 b)
{
	return a > b ? a : b;
}

template <typename T1, typename T2>
decltype(auto) biggerAuto3(T1& a, T2& b)
{
	return a > b ? a : b;
}

int main()
{
	// int | char
	char a = 98;
	int b = 10000;
	float c = 10;
	cout << bigger(a, 1000) << endl; // bigger被实例化为char类型，因此返回值1000转为char类型会导致高位丢失
	cout << bigger(1000, a) << endl; // 输出1000

	// auto推断类型
	cout << biggerAuto(a, 1000) << endl;// 推断为int
	cout << biggerAuto3(c, b) << endl;// 推断为float【int与float比较结果必为float】
	// 但上面的返回类型本应该是引用，为什么不是引用？
	// 原因：存在类型转换，就无法将引用作为返回值类型【此处必然是float的引用，但如果较大值为int，就无法传出】
	//float& lx = b;//报错

	system("pause");
	return 0;
}
```



## 3.8 C语言和C++联合编程

### 3.8.1 static inline

利用 `static` 可以声明一个静态变量。

```c++
static int a;
```

> [!attention] `static` 的注意事项：
> 1. `static` 的变量，如果没有指定初始化，会自动初始化为0；
> 2. 且无论有无指定初始化值，都只会初始化一次！
> 3. 另外，此类变量位于全局区，生命周期很长，不会随函数运行结束而被释放。

使用 `inline` 来申明一个内联函数（老C++语法，基本已淘汰）

内联函数将会建议编译器把此函数处理成内联代码以提高性能。但是，该建议是否被采纳，**由编译器决定**，现阶段的编译器都很智能，没必要去显式要求。

```c++
#include <iostream>
using namespace std;

inline int add(int a, int b)
{
	return a + b;
}

int main()
{
	int c = add(1, 2); // 有可能被有优化为 c = 1 + 2
	
	system("pause");
	return 0;
}
```



### 3.8.2 从编译器角度理解定义和声明

- 声明不涉及内存分配，但定义涉及内存分配
- `extern` 关键字来声明变量，针对全局变量的声明（在函数内的变量声明没意义，故报错）
- 全局变量在全局区有固定的地址，函数变量没有固定的地址

```c++
#include <iostream>
using namespace std;

// 函数ave的声明【也建议写变量名，便于理解】
int ave(int, int);
// 声明可以多次，但定义只能有一次【函数声明默认有前缀 extern】
int ave(int a, int b);

int all2, all{12};// 均是变量的定义，都涉及内存分配
extern int ALL; // extern关键字：变量的声明【声明可以多次】

int main()
{
	int c = ave(1, 3);
	
	system("pause");
	return 0;
}

// 函数ave的定义
int ave(int a, int b)
{
	return (a + b) / 2;
}
int ALL = 20;
```

![](cppcore3-2.png)



### 3.8.3 头文件和源文件

在本文件中调用其他文件中的函数，需要提前在本文件中声明即可。

但随着声明越来越多，引入头文件，头文件中就是所谓的声明集合，最后 `include` 在本文件中即可。

值得注意的是，头文件中可以写函数定义，但从编译器角度解释是不合适，从代码编写规范角度也不合适。
1. 在编译器角度，编译器先将所有 `cpp` 源文件编译为目标文件【obj文件】【可能是按首字母顺序】，然后用`obj`文件组合为目标程序。
2. 而对于头文件，除非源文件调用，否则不会主动去编译；而且，源文件调用头文件的本质，就是将头文件的内容复制到源文件中而已。
3. 此时，如果没有发生函数重载，在同一个工程中，就不能出现同名函数【联系头文件的复制本质，可知不同文件中也不能有同名函数】。如果在头文件中定义了函数【声明可以多次，但定义只能一次】，就会出现重定义的错误。

**解决**：声明可以多次，但定义只能一次。

**例外情况：** 静态函数【`static void fun(){}`】，此类函数仅在使用该函数的文件内有效；内联函数；静态变量【`static int a;`】

> [!attention] 注意：头文件中可以用 `extern` 声明全局变量。

```c++
#include <iostream> // 现有库，已经被安装在了系统中
#include "emath.h"
using namespace std;

// 声明即可调用同级文件中的函数
//int ave(int, int);
//int ave(int, int);

int main()
{
	int c = ave(1, 3);
	cout << c << endl;

	system("pause");
	return 0;
}

// "emath.h"
#pragma once  // 对某个特定源文件来说，emath.h 仅被调用1次【部分编译器不支持】

int ave(int, int);
int ave(int, int);
```

可以替代 `#pragma once` 的写法

```C++
// "emath.h"

#ifndef _HEMATH_ // 如果没有定义宏变量 _HEMATH_，就执行下面的

#define _HEMATH_
int ave(int, int);
int ave(int, int);

#endif //!_HEMATH_
```

该预编译指令的现实场景用法：

```c++
// 若没有VIP的宏定义，根本不会被编译【可用于编译为两个版本的文件】
void showWelcome()
{
#ifdef _VIP
    std::cout << "你好！" << std::endl;
#endif //_VIP
}
```

总之，`#pragma once` 依赖文件，`#ifdef` 依赖宏定义名，且功能更强大


### 3.8.4 `#pragma once`

`#pragma once`是 C/C++ 的**预处理指令**，核心作用是：**保证当前头文件在整个编译过程中只被包含（`#include`）一次**，本质是解决 “头文件重复包含” 导致的重复定义错误。

#### 3.8.4.1 为什么需要它？

当多个头文件互相包含（如 A.h 包含 B.h，B.h 又包含 A.h），或同一个头文件被多次`#include`时，会导致：

- 重复定义变量 / 函数 / 类（编译报错`multiple definition of ...`）；
- 编译效率降低（重复解析相同代码）。

`#pragma once`就是为了避免这类问题，是传统 “头文件保护宏” 的简化替代方案。

#### 3.8.4.2 与传统 “头文件保护宏” 的对比

传统方案（也叫 “包含守卫”）是用`#ifndef`/`#define`/`#endif`实现，对比来看：

| 特性     | `#pragma once`                        | 传统宏保护（`#ifndef`）       |
| ------ | ------------------------------------- | ---------------------- |
| 写法     | 一行搞定，简洁                               | 需写 3 行，易写错（如宏名重复）      |
| 原理     | 基于文件路径，编译器识别文件                        | 基于宏定义，预处理阶段判断          |
| 跨平台兼容性 | 几乎所有现代编译器支持（MSVC/GCC/Clang），但非 C++ 标准 | 符合 C++ 标准，完全跨平台        |
| 缺点     | 若同一文件被多路径引用（如软链接），可能失效                | 宏名可能冲突（如`TEST_H`被重复定义） |

传统宏保护示例（对比参考）：

```
// test.h
#ifndef TEST_H  // 宏名（通常是文件名大写+下划线）
#define TEST_H

// 头文件内容...

#endif // TEST_H
```

#### 3.8.4.3 关键使用细节

1. 放置位置：必须写在头文件的**最开头**（甚至在`#include`之前），否则可能失效；
2. 适用范围：仅对**当前文件**生效，不能跨文件生效；
3. 编译器支持：
    - 支持的编译器：MSVC（VS）、GCC 3.4+、Clang 2.0+、MinGW 等；
    - 极少数老旧编译器不支持，此时需用传统宏保护；
    
4. **混用方案（推荐）**：为了兼顾兼容性，很多项目会同时用两种方式：

```cpp
    // test.h
    #pragma once
    #ifndef TEST_H
    #define TEST_H
    
    // 头文件内容...
    
    #endif // TEST_H
```

#### 3.8.4.4 作用原理

- `#pragma once`：编译器在预处理阶段，会记录该头文件的路径，当再次遇到`#include`这个文件时，直接跳过解析；
- 传统宏保护：预处理阶段判断宏是否已定义，未定义则解析并定义宏，已定义则跳过。

#### 总结

1. `#pragma once`是简化版头文件保护指令，核心作用是避免头文件重复包含；
2. 写法简洁（一行搞定），现代编译器均支持，非 C++ 标准但实用性强；
3. 追求极致兼容性可混用`#pragma once`和传统宏保护；
4. 核心注意点：必须放在头文件最开头，仅对当前文件生效。



### 3.8.5 extern
#### 3.8.5.1 `extern`的核心含义

`extern`是 C++ 的**存储类说明符**（Storage Class Specifier），核心语义是：**声明一个变量 / 函数是 “外部定义的”** —— 即变量 / 函数的实际定义在其他文件（或当前文件的后续位置），当前仅做 “声明”，告诉编译器 “这个实体存在，去其他地方找它的定义”。

简单来说：`extern`负责**声明**，不负责**定义**（除非结合初始化）。

#### 3.8.5.2 `extern`的两大核心用法

> [!note] 用法一：**跨文件共享全局变量 / 函数**（最常用）

C++ 中，全局变量 / 函数的默认作用域是 “整个程序”，但如果在 A 文件定义、B 文件使用，需要用`extern`声明 “这个实体在其他文件”。

**示例**：跨文件使用变量

假设有两个文件：`common.cpp`（定义变量）和`main.cpp`（使用变量）。

```cpp
// common.cpp（定义全局变量：分配内存+初始化）
int g_num = 100; // 定义：有内存分配，有初始化
```

```cpp
// main.cpp（声明并使用变量：无内存分配，仅告诉编译器变量存在）
#include <iostream>
using namespace std;

// extern声明：g_num的定义在其他文件（common.cpp）
extern int g_num; 

int main() {
    cout << g_num << endl; // 输出100，编译器会找到common.cpp中的定义
    return 0;
}
```

**示例**：跨文件使用函数

函数的声明默认带`extern`属性（可省略），因此跨文件用函数时，`extern`可写可不写：

```cpp
// common.cpp（定义函数）
void show() {
    cout << "Hello extern" << endl;
}
```

```cpp
// main.cpp（声明函数，extern可省略）
#include <iostream>
using namespace std;

// 写法1：显式extern（清晰）
extern void show(); 
// 写法2：省略extern（等价，函数声明默认extern）
// void show();

int main() {
    show(); // 输出Hello extern
    return 0;
}
```

> [!note] 用法二：`extern "C"`：兼容 C 语言编译规则（进阶）

C++ 编译器会对函数名做 “名字修饰（Name Mangling）”（比如`void show()`会被编译成`_Z4showv`），而 C 编译器不会。如果 C++ 代码要调用 C 语言编写的函数，需要用`extern "C"`告诉编译器 “按 C 的规则处理这个函数”。

**示例**：C++ 调用 C 函数

```cpp
// 假设已有C语言编写的函数（编译为C格式）：
// c_fun.c
// #include <stdio.h>
// void c_show() { printf("C function\n"); }

// C++文件（main.cpp）
#include <iostream>
using namespace std;

// 用extern "C"声明：按C规则解析c_show
extern "C" {
    void c_show(); 
}

int main() {
    c_show(); // 正确调用C语言函数，避免名字修饰导致的链接错误
    return 0;
}
```

- 常用场景：C++ 项目调用 C 语言库（如 Linux 系统调用、第三方 C 库）；
- 注意：`extern "C"`只能包裹函数 / 函数声明，不能包裹变量。

#### 3.8.5.3 关键细节：声明 vs 定义

`extern`的核心是 “区分声明和定义”，这是理解它的关键：

|操作|含义|是否分配内存|示例|
|---|---|---|---|
|定义|创建变量 / 函数，分配内存（函数体 / 变量空间）|是|`int g_num = 100;` / `void show() { ... }`|
|声明（extern）|告诉编译器 “实体存在，去其他地方找”|否|`extern int g_num;` / `extern void show();`|

⚠️ 易错点：`extern`声明时如果加了初始化，就变成了 “定义”：

```cpp
extern int g_num = 200; // 这里不是声明，是定义！等价于int g_num = 200;
```

#### 3.8.5.4 常见使用场景与注意事项

典型场景：

1. 大型项目中，将全局变量 / 公共函数集中定义在一个`.cpp`文件，其他文件用`extern`声明使用；
2. C++ 和 C 代码混合开发时，用`extern "C"`兼容函数调用；
3. 声明 “后续定义的变量”（比如在函数前声明全局变量，变量定义在函数后）。

**注意事项**：

- `extern`仅作用于**全局变量 / 函数**，局部变量（函数内）不能用`extern`；
    
    ```cpp
    int main() {
        extern int a; // 合法：声明全局a
        extern int b = 10; // 合法，但实际是定义全局b（不推荐）
        int c;
        extern int c; // 非法：局部变量不能用extern
        return 0;
    }
    ```
    
- 跨文件使用时，确保定义文件被编译链接（比如编译时要把`common.cpp`和`main.cpp`一起编译：`g++ main.cpp common.cpp -o test`）；
- `extern "C"`块内可以放多个函数声明，简化写法：
    
    ```cpp
    extern "C" {
        void fun1();
        void fun2();
        int fun3(int);
    }
    ```
    

#### 3.8.5.5 总结

1. `extern`核心作用是**声明外部定义的变量 / 函数**，区分 “声明” 和 “定义”，解决跨文件共享问题；
2. `extern "C"`是 C++ 对 C 的兼容语法，避免函数名修饰导致的链接错误；
3. 关键区分：`extern int a;`是声明（无内存），`int a = 10;`是定义（有内存），`extern int a = 10;`是定义（特殊情况）；
4. 仅适用于全局实体，局部变量不能用`extern`。


#### 3.8.5.6 额外补充

在开发中，会面临C与C++混用的情况，它们对函数的处理是不同的。

对于上节提到的函数重定义的报错，C++中的报错提示为：

```shell
# C++支持函数重载，故函数名为下：
"int _cdecl ave(void)"(?ave@@YAHXZ)已经在class1.obj中定义
# C不支持函数重载
_ave已经在e.obj中定义
```

故同时存在C++文件和C文件时，由于编译后名字不同，故不会发生函数重定义的错误。

混用正确调用的例子：【三种写法】

- `extern "C" int ave();`
- `extern "C" {...}` 大括号中是所有C风格的函数
- 在cpp源文件中，`extern "C" {#include "e.h";}` 

```c++
// e.h
#pragma once
//int ave();
//extern "C" int ave();
// 或合起来写
extern "C"
{
    int ave();
}

// e.c：C风格
int ave()
{
    return 1;
}

// control.cpp
#include <iostream>
//#include "e.h"
extern "C" {
	#include "e.h";
}

int main()
{
    //std::cout<< ave()<< std::endl; 
    // 报错：无法解析该函数符号"int _cdecl ave(void)"(?ave@@YAHXZ)
    
    std::cout<< ave()<< std::endl; // 为e.h添加extern "c"
    
}
```

很遗憾，C无法使用C++风格的函数【比如，C下编译器只会找名为`_ave`的函数】，此类型情况的**解决办法**是，在定义时，用上面 `extern “C”`的写法将C++风格的函数声明为C风格的函数。

反过来，C风格的写法下，无法识别 `extern "C"`。该问题的解决办法是：使用宏来判别风格类型。

> C++风格下，默认定义了一个宏，名为`__cplusplus`

```c++
#ifdef __cplusplus
extern "C"
{
#endif
    #include "emath.h";
    #include "pmath.h";
#ifdef __cplusplus
}
#endif
```

上面的写法，可以保证一个源文件能同时在C或C++风格下运行。

> 注意：C++风格的函数被声明为C风格的函数时，就在也不支持函数重载了。

特别注意一个错误：【LNK4042：C和C++源文件混用的问题】

```c++
// math.h
#pragma once

int ave(int, int);
extern "C" int add(int, int);

// math.c
int add()
{
    return a + b;
}

// math.cpp
int ave(int a, int b)
{
    return (a + b) / 2;
}

// control.cpp
#include <iostream>
#include "math.h"

int main()
{
    std::cout<< ave(1, 5)<< std::endl; 
    std::cout<< add(1, 5)<< std::endl;
}
// 编译错误：
//LNK2019:无法解析外部符号"int _cdecl ave(int,int)"(?ave@@YAHXZ)...
```

该错误的原理要联系到编译的过程：编译器先将各个源文件编译为obj目标文件，再链接为目标程序。而在上面的代码中，`math.cpp` 和 `math.c` 都会被编译为`math.obj`，故找不到某一个函数。



### 3.8.6 封装自己的SDK：hongxin

生成`.lib`文件【静态库】【属性 | 常规 | 配置类型 | 静态库】

```C++
// hongxin.h
// lib库文件都应该有说明文件
#pragma once
int ave(int a, int b);

namespace hongxin
{
	const char* GetVersion();
}

//hongxin.cpp
#include "hongxin.h"

int ave(int a, int b)
{
    return (a + b) / 2;
}

namespace hongxin
{
    char
}
```

生成静态库sdk：【右键工程 | 生成】，在工程目录中lib文件就是库文件【名字可更改】，可以配合头文件【说明文档】，在加一个示例程序就可以发布给别人用。当然，更多的是直接做成安装包【SDK】。

如果不安装，在新项目中使用lib文件，需要配置【属性 | VC++目录 | 包含目录】，将目录跟在后面即可。使用时，使用 `#include <newname.h>`；此时，还没将库文件放入，同样配置【... | 库目录】

但编译器不会主动链接库文件，需要手动完成【两种方法】

- `#pragma comment(lib, "hongxin.lib")`
- 【属性 | 链接器 | 输入 | 附加依赖项】加入hongxin.lib【会去库目录找文件】

```c++
//newproject.cpp
#include <iostream>
#include <hongxin.h>

#pragma comment(lib, "hongxin.lib")

int main()
{
    std::cout << hongxin::GetVersion();
	std::cout << ave(1, 7);
}
```



### 3.8.7 自定义创建项目模板

【顶层任务栏：项目 | 导出模板 | 项目模板 | 可配置名称、图标 | 自动导入+完成】

生成一个zip文件，当下次创建新项目时，在所有语言下，就会出现自定义的模板。

> 发布的zip文件的再使用：直接copy到【我的文档 | Visual Studio xxxx | Templates | ProjectTemplates】



### 3.8.8 函数调用约定

1. `__cdecl`  
2. `__stdcall`
3. `__fastcall` 
4. `__thiscall`【类访问】 
5. `__nakedcall`【驱动】

函数调用约定时函数调用与被调用者之间的一种协定，主要包括两个内容：如果传递参数？如何恢复栈平衡？

```c++
// 先push b，再push a
int __cdecl ave(int a, int b)
{
	return a + b;
}
int main()
{
    ave(1, 2);
}
```

函数名被编译器修改为`__cdecl`+xxx，其参数入栈顺序从右到左；而堆栈平衡：谁调用谁平衡

正因为`__cdecl`这种堆栈平衡方式，能够支持不定量参数；

另一种暂时没遇到过的函数调用约定是：`__stdcall`。其参数入栈顺序从右到左；但此类函数的堆栈平衡恢复由原函数本身负责。从汇编角度，由`ret 8`完成

> Windows 编程中`WINAPI CALLBACK` 都是`__stdcall` 的宏，生成的函数名会加下划线，后面跟@和参数尺寸

第三种函数调用约定是：`__fastcall`。其第一个参数通过ecx传递，第二个参数通过edx传递，剩余参数入栈顺序从右到左；此类函数的堆栈平衡恢复由原函数本身负责。【执行速度快，优先通过寄存器传参】【三参数时，汇编由 `ret 4` 返回】【x64默认为`__fastcall`】


### 3.8.9 静态修饰对比

#### 3.8.9.1 `static`的核心本质

`static`的核心作用是**改变实体的 “存储期”（生命周期）和 “链接属性”（作用域可见性）**：

- 存储期：决定实体在内存中存在的时间（局部 static 变量从程序启动到结束，而非栈上临时）；
- 链接属性：决定实体是否能被其他文件访问（static 修饰的全局 / 函数仅当前文件可见）。

#### 3.8.9.2 `static`的四大核心用法

**① 用法一**：修饰**全局变量 / 函数**：限制作用域为 “当前文件”（内部链接）

默认情况下，全局变量 / 函数的链接属性是 “外部链接”（可被其他文件通过`extern`访问），`static`会将其改为 “内部链接”—— 仅当前`.cpp`文件可见，其他文件无法访问。

**示例**：static 修饰全局变量

```cpp
// file1.cpp
static int g_num = 100; // static全局变量：仅file1.cpp可见
static void show() {    // static函数：仅file1.cpp可见
    cout << g_num << endl;
}

// file2.cpp
#include <iostream>
using namespace std;

extern int g_num; // 报错：无法访问file1.cpp的static全局变量
extern void show(); // 报错：无法访问file1.cpp的static函数

int main() {
    g_num = 200; // 编译失败
    show();      // 编译失败
    return 0;
}
```

> [!tip] 核心特点：
> 
> - 解决 “全局命名冲突”：多个文件可以定义同名的 static 全局变量 / 函数，互不干扰；
> - 存储期：仍为 “静态存储期”（程序启动分配内存，结束释放），仅链接属性改变；
> - 实用场景：封装文件内的私有逻辑，避免全局作用域污染。

**② 用法二**：修饰**局部变量（函数内）**：延长生命周期为 “程序全程”

`static`修饰函数内的局部变量时，**存储位置从栈区移到静态数据区**，生命周期变为 “程序启动到结束”，但作用域仍局限在函数内。

**示例**：static 局部变量

```cpp
#include <iostream>
using namespace std;

void count() {
    static int cnt = 0; // 仅初始化1次（程序启动时），后续调用不再初始化
    cnt++;
    cout << cnt << " ";
}

int main() {
    count(); // 输出1
    count(); // 输出2
    count(); // 输出3
    return 0;
}
```

> [!tip] 核心特点：
> 
> - 初始化规则：仅在**第一次调用函数时初始化**，后续调用跳过初始化；
> - 作用域：仍局限在函数内（外部无法访问）；
> - 存储位置：静态数据区（而非栈区），不会随函数调用结束销毁；
> - 实用场景：函数内的计数器、单例模式的局部静态实例。

**③ 用法三**：修饰**类的静态成员变量**：属于 “类” 而非 “对象”

`static`修饰类成员变量时，该变量不再属于某个具体对象，而是属于整个类 —— 所有对象共享同一个静态成员变量，不占用对象的内存空间。

**示例**：类的静态成员变量

```cpp
#include <iostream>
using namespace std;

class Student {
public:
    static int total; // 静态成员变量：统计学生总数
    string name;

    Student(string n) : name(n) {
        total++; // 每个对象创建时，总数+1
    }
};

// 关键：静态成员变量必须在类外初始化（全局作用域）
int Student::total = 0; // 初始化，不加static

int main() {
    Student s1("张三");
    Student s2("李四");
    // 访问方式1：通过对象访问
    cout << s1.total << endl; // 输出2
    // 访问方式2：通过类名访问（推荐）
    cout << Student::total << endl; // 输出2
    return 0;
}
```

> [!tip] 核心特点：
> 
> - 存储位置：静态数据区（所有对象共享），不计入对象的 sizeof 大小；
> - 初始化规则：必须在**类外单独初始化**（不能在构造函数内初始化），且不能加`static`；
> - 访问权限：受`public/private/protected`限制（private 静态变量仅类内可访问）；
> - 实用场景：类的全局计数器、共享配置（如类的版本号）。

**④ 用法四**：修饰**类的静态成员函数**：属于 “类”，无 this 指针

`static`修饰类成员函数时，该函数属于整个类，而非某个对象 —— 没有隐含的`this`指针，只能访问类的静态成员（变量 / 函数），不能访问非静态成员。

**示例**：类的静态成员函数

```cpp
#include <iostream>
using namespace std;

class Math {
public:
    static int add(int a, int b) { // 静态成员函数
        return a + b;
    }

    static int PI; // 静态成员变量
    int num; // 非静态成员变量

    static void showPI() {
        cout << PI << endl; // 合法：访问静态成员
        // cout << num << endl; // 报错：静态函数不能访问非静态成员（无this指针）
    }
};

int Math::PI = 3.14159; // 初始化静态变量

int main() {
    // 访问方式1：通过类名调用（推荐）
    cout << Math::add(10, 20) << endl; // 输出30
    // 访问方式2：通过对象调用（不推荐，语义不清晰）
    Math m;
    cout << m.add(5, 5) << endl; // 输出10

    Math::showPI(); // 输出3.14159
    return 0;
}
```

> [!tip] 核心特点：
> 
> - 无`this`指针：这是静态成员函数的核心特性，因此无法访问非静态成员；
> - 调用方式：可直接通过`类名::函数名`调用，无需创建对象；
> - 访问权限：同样受`public/private`限制（private 静态函数仅类内可调用）；
> - 实用场景：类的工具函数（如数学计算、工厂方法）、访问静态成员变量。

> [!note] 不同用法的对比：

|修饰对象|存储期|链接属性 / 作用域|关键特性|
|---|---|---|---|
|全局变量 / 函数|程序全程（静态存储）|仅当前文件可见（内部链接）|避免命名冲突，封装文件内逻辑|
|局部变量（函数内）|程序全程（静态存储）|仅函数内可见|仅初始化 1 次，函数调用间保留值|
|类静态成员变量|程序全程（静态存储）|类作用域（受访问权限限制）|所有对象共享，类外初始化|
|类静态成员函数|程序全程（代码段）|类作用域（受访问权限限制）|无 this 指针，仅访问静态成员|

#### 3.8.9.3 常见易错点

1. **类静态成员变量忘记类外初始化**：编译报错 “undefined reference to xxx”，必须在类外写`类型 类名::变量名 = 初始值`；
2. **静态成员函数访问非静态成员**：报错 “invalid use of member ‘xxx’ in static member function”，因为无 this 指针；
3. **局部 static 变量的线程安全**：C++11 前，多线程首次调用含局部 static 的函数可能竞态；C++11 后，局部 static 初始化是线程安全的；
4. **static 全局变量 vs 局部 static 变量**：前者作用域是文件，后者是函数，存储期均为程序全程。

#### 3.8.9.4 实用场景总结

1. **文件内封装**：用 static 修饰全局变量 / 函数，避免跨文件命名冲突；
2. **函数内状态保持**：局部 static 变量实现计数器、单例模式（局部静态实例）；
3. **类的共享数据**：静态成员变量统计对象数量、存储类级别的配置；
4. **类的工具函数**：静态成员函数实现无需对象的通用逻辑（如 Math::add）。

#### 总结

1. `static`的核心是改变**存储期**和**链接属性**，不同修饰对象的核心差异在 “作用域” 和 “归属”；
2. 修饰全局 / 函数：限制作用域为当前文件；修饰局部变量：延长生命周期；修饰类成员：归属类而非对象；
3. 类的静态成员是高频考点：静态变量必须类外初始化，静态函数无 this 指针，仅访问静态成员。


# 四 类和对象

> [!note] 类和对象才是C++相对于C独有的内涵。

OOP【Object Oriented Programmming】即面向对象编程，是一种编程思想，通过把我们编程中遇到的事物抽象程对象来编程；与OOP相对的还有：面向对象设计OOD、面向对象分析OOA【OOP应当遵循OOD】

C++面向对象的三大特性为：封装、继承、多态。

C++认为万事万物都皆为对象，对象上有其属性和行为。

## 4.1 封装

### 4.1.1  封装的意义

封装是C++面向对象三大特性之一

1. 将属性和行为作为一个整体，表现生活中的事物
2. 将属性和行为加以权限控制


**示例1：** 设计一个圆类，求圆的周长

```C++
//圆周率
const double PI = 3.14;

//1、封装的意义
//将属性和行为作为一个整体，用来表现生活中的事物

//封装一个圆类，求圆的周长
//class代表设计一个类，后面跟着的是类名
class Circle
{
public:  //访问权限  公共的权限

	//属性
	int m_r;//半径

	//行为
	//获取到圆的周长
	double calculateZC()
	{
		//2 * pi  * r
		//获取圆的周长
		return  2 * PI * m_r;
	}
};

int main() {

	//通过圆类，创建圆的对象
	// c1就是一个具体的圆
	Circle c1;
	c1.m_r = 10; //给圆对象的半径 进行赋值操作

	//2 * pi * 10 = = 62.8
	cout << "圆的周长为： " << c1.calculateZC() << endl;

	system("pause");
	return 0;
}
```



**示例2：** 设计一个学生类，属性有姓名和学号，可以给姓名和学号赋值，可以显示学生的姓名和学号

```C++
//学生类
class Student {
public:
	void setName(string name) {
		m_name = name;
	}
	void setID(int id) {
		m_id = id;
	}

	void showStudent() {
		cout << "name:" << m_name << " ID:" << m_id << endl;
	}
public:
	string m_name;
	int m_id;
};

int main() {

	Student stu;
	stu.setName("德玛西亚");
	stu.setID(250);
	stu.showStudent();

	system("pause");
	return 0;
}
```



**封装意义二：** 类在设计时，可以把属性和行为放在不同的权限下，加以控制。

访问权限有三种：

1. 公共权限：public           
2. 保护权限：protected【与继承相关】
3. 私有权限：private【默认】

```C++
//三种权限
//公共权限  public     类内可以访问  类外可以访问
//保护权限  protected  类内可以访问  类外不可以访问
//私有权限  private    类内可以访问  类外不可以访问

class Person
{
	//姓名  公共权限
public:
	string m_Name;

	//汽车  保护权限
protected:
	string m_Car;

	//银行卡密码  私有权限
private:
	int m_Password;

public:
	void func()
	{
		m_Name = "张三";
		m_Car = "拖拉机";
		m_Password = 123456;
	}
};

int main() {

	Person p;
	p.m_Name = "李四";
	//p.m_Car = "奔驰";  //保护权限类外访问不到
	//p.m_Password = 123; //私有权限类外访问不到

	system("pause");
	return 0;
}
```



### 4.1.2 struct和class区别

在C++中 struct和class唯一的区别就在于 **默认的访问权限不同**。

* struct 默认权限为公共
* class   默认权限为**私有**

```C++
class C1
{
	int  m_A; //默认是私有权限
};

struct C2
{
	int m_A;  //默认是公共权限
};

int main() {

	C1 c1;
	c1.m_A = 10; //错误，访问权限是私有

	C2 c2;
	c2.m_A = 10; //正确，访问权限是公共

	system("pause");
	return 0;
}
```



### 4.1.3 成员属性设置为私有

**优点1：** 将所有成员属性设置为私有，可以自己控制读写权限。

**优点2：** 对于写权限，我们可以检测数据的有效性。

```C++
class Person {
public:

	//姓名设置可读可写
	void setName(string name) {
		m_Name = name;
	}
	string getName()
	{
		return m_Name;
	}

	//获取年龄 
	int getAge() {
		return m_Age;
	}
	//设置年龄
	void setAge(int age) {
		if (age < 0 || age > 150) {
			cout << "你个老妖精!" << endl;
			return;
		}
		m_Age = age;
	}

	//情人设置为只写
	void setLover(string lover) {
		m_Lover = lover;
	}

private:
	string m_Name; //可读可写  姓名
	int m_Age; //只读  年龄
	string m_Lover; //只写  情人
};

int main() {

	Person p;
	//姓名设置
	p.setName("张三");
	cout << "姓名： " << p.getName() << endl;

	//年龄设置
	p.setAge(50);
	cout << "年龄： " << p.getAge() << endl;

	//情人设置
	p.setLover("苍井");
	//cout << "情人： " << p.m_Lover << endl;  //只写属性，不可以读取

	system("pause");
	return 0;
}
```



### 4.1.4 成员函数

- 占用空间
- `inline` 内联函数

类的占用空间大小：类变量大小【类成员函数为所有类对象公用，不占对象的存储空间 | `sizeof`】

空类的大小：1字节【使用该空类实例化后，编译器为区分实例对象，默认加入1字节用于区分】

```c++
#include <iostream>

class Role
{
private:
	int hpRecover;
	void Init();
public:
	int hp;
	int damage;
	void Act(Role& r);
};

void Role::Act(Role& r)
{
	r.hp -= damage;
}
void Role::Init()
{
	hpRecover = 3;
}

class P{};

int main()
{
	Role user;
	P p1, p2;
	std::cout << sizeof(user) << " " << sizeof(p1) << std::endl;

	system("pause");
	return 0;
}
```

> 一般工程化时，一个类可能很多人在用，所以一般在单独文件中创建类【源文件|添加类】，生成一个头文件【类声明】，一个cpp源文件【成员函数定义】

**inline内联函数**：类似于`getHp()`等直接返回值的函数，推荐用inline写法【推荐直接写在头文件中】

```c++
class Role
{
private:
	int hpRecover;
	void Init();
    int hp;
public:
	int damage;
	inline int getHp()
    {
        return hp;
    }
};
```

> 如果此类函数在声明类时未使用inline修饰，在定义时也可以加上inline，以定义为准【重写原则】



### 4.1.5 const 关键字

- 常函数
- 常对象
- const类型转换

**常函数：** 成员函数后加`const`后我们称为这个函数为常函数。

* 常函数内**不可以修改成员属性**【引用也不可返回，因为引用的本质是指针，返回引用后可能会存在修改风险】
	1. 解决办法1：直接返回值不返回引用；
	2. 解决办法2：再用const修饰函数返回值，要求不允许更改
* 成员属性声明时**加关键字`mutable`后**，在常函数中依然**可以修改**
* 常函数内的 `this` 指针也变成了`const`指针

> [!note] mutable：可变的
> 【使用场景：如需要在常函数中记录被调用次数，即需要某变量++】

**常对象：** 声明对象前加 `const` 称该对象为常对象。

* 常对象的成员变量的值不能被改变。
* 常对象**只能调用常函数**【意味着不能调用函数去改变成员变量值，没有任何方式改变对象的成员值】

> 也有人建议：凡是不涉及修改成员变量值的成员函数，都可以后加const修饰，以便于常对象调用；
>
> 另外，也可以利用函数重载，提供非const版本和const版本【仅是否const，就可以构成重载】

**示例：**

```C++
class Person {
public:
	Person() {
		m_A = 0;
		m_B = 0;
	}

	//this指针的本质是一个指针常量，指针的指向不可修改
	//如果想让指针指向的值也不可以修改，需要声明常函数
    //const Person* const this; 等同于下函数的声明const
	void ShowPerson() const {
		//const Type* const pointer;
		//this = NULL; //不能修改指针的指向 Person* const this;
		//this->mA = 100; //但是this指针指向的对象的数据是可以修改的

		//const修饰成员函数，表示指针指向的内存空间的数据不能修改，除了mutable修饰的变量
		this->m_B = 100;
	}

	void MyFunc() const {
		//mA = 10000;
	}

public:
	int m_A;
	mutable int m_B; //可修改 可变的
};

int main() 
{
	const Person person; //常量对象  
	cout << person.m_A << endl;
	//person.mA = 100; //常对象不能修改成员变量的值,但是可以访问
	person.m_B = 100; //但是常对象可以修改mutable修饰成员变量

	//常对象访问成员函数
	person.MyFunc(); //常对象不能调用const的函数
    
	system("pause");
	return 0;
}
```



**const 类型转化**：`const_cast` 可以将一个const变量的常量属性去掉，只有在极少数的情况下需要用此功能【一种C方式，一种C++方式，有区别】

```c++
#include <iostream>
using namespace std;

class Role
{
private:
	int hp;
public:
	int lv;
	int damage;
	void Act(Role& r)
	{
		r.hp -= damage;
	}
	inline int GetHp() const
	{
		//this->hp = 2;// 不可以修改
		return hp;
	}
	int GetLv() const //const版本不能返回引用，有修改风险【两个解决办法】
	{
		return lv;
	}
	//const int& GetLv() const{}【解决方法2】
	int& GetLv()
	{
		return lv;
	}
	void setHp(int hp)
	{
		this->hp = hp;
	}
	
};

// 场景：编码时要求不是常量，故需要转换
void test(Role* p)
{
	p->setHp(50);
}

int main()
{
	const Role user{};
	Role monster;
	const Role* puser{ &user };// 用一个常对象，给常量指针赋值
	// puser->damage = 2;// 错误：因为puser是一个常量指针，其指向的值不能修改
	puser->GetHp(); // 常对象只能调用常函数
	cout << monster.GetHp()<<endl;

	monster.GetLv() = 200;// 【仅演示，实际不这样写】非const函数可以返回引用，但const函数不可以
	cout << monster.GetLv() << endl;//200

	// 类型转换
	//test(&user);// 需要转换
	test((Role*)(&user));//强制类型转换【C】
	test(const_cast<Role*>(&user));//【C++】

	system("pause");
	return 0;
}
```



<br>

## 4.2 对象的初始化和清理

*  生活中我们买的电子产品都基本会有出厂设置，在某一天我们不用时候也会删除一些自己信息数据保证安全
*  C++中的面向对象来源于生活，每个对象也都会有初始设置以及 对象销毁前的清理数据的设置。



### 4.2.1 构造函数和析构函数

对象的**初始化和清理**也是两个非常重要的安全问题。
- 一个对象或者变量没有初始状态，对其使用后果是未知；
- 同样地，使用完一个对象或变量，没有及时清理，也会造成一定的安全问题。

C++利用了**构造函数**和**析构函数**解决上述问题，这两个特殊的成员函数将会被编译器自动调用，完成对象初始化和清理工作。

对象的初始化和清理工作是编译器强制要我们做的事情，因此如果**我们不提供构造和析构，编译器会提供，编译器提供的构造函数和析构函数是空实现。**

* 构造函数：主要作用在于创建对象时为对象的成员属性赋值，构造函数由编译器自动调用，无须手动调用。
* 析构函数：主要作用在于对象**销毁前**系统自动调用，执行一些清理工作。


**构造函数**具有以下核心特性：
- **与类同名**：构造函数的名称必须与类名完全相同
- **无返回值**：不声明返回类型（包括void）
- **自动调用**：在对象创建时自动执行，无需手动调用
- **可重载**：一个类可以有多个构造函数，参数列表不同
- **默认构造函数**：如果类中没有定义任何构造函数，编译器会自动生成一个默认构造函数（无参构造函数）

**析构函数语法：** `~类名(){}`

1. 析构函数，没有返回值也不写`void`
2. 函数名称与类名相同。在名称前加上符号  `~`
3. 析构函数**不可以有参数**，因此不可以发生重载
4. 程序在对象销毁前会自动调用析构，无须手动调用，而且只会调用一次

```C++
class Person
{
public:
	//构造函数
	Person()
	{
		cout << "Person的构造函数调用" << endl;
	}
	//析构函数
	~Person()
	{
		cout << "Person的析构函数调用" << endl;
	}
    // 也可以使用default关键字定义析构函数
    //~Person()=default;

};

int main() {	
	Person p;
    int a{1};
    while(a)
    {
        std::cin >> a;// 输入0时，p被销毁
    }
    std::cout << "\nending" << std::endl;
	system("pause");
	return 0;
}
```



### 4.2.2 引入构造函数

```c++
#include <iostream>
using namespace std;

class T
{
public:
	int hp;
	int mp;
};
class TT
{
public:
	int hp;
	int GetMP() const { return mp; }
	void SetMP(int _mp) { mp = _mp; }
private:
	int mp;
};

int main()
{
	T t1{ 100,200 };// 可以使用{}构造，但一旦有私有变量，就不可用

	//TT t2{ 100,200 };//错误
	//TT t2{ 100 };//错误
	// 先给t2赋值
	TT t2{};
	t2.hp = 100;
	t2.SetMP(200);
	TT t3{ t2 };// 相当于 = 赋值，即t3=t2;

	system("pause");
	return 0;
}
```



### 4.2.3 构造函数的分类及调用

**两种分类方式：**

- 按参数分为： 有参构造和无参构造
- 按类型分为： 普通构造和拷贝构造

**三种调用方式：**

- 括号法
- 显示法
- 隐式转换法

```C++
//1、构造函数分类
// 按照参数分类分为 有参和无参构造   无参又称为默认构造函数
// 按照类型分类分为 普通构造和拷贝构造

class Person {
public:
	//无参（默认）构造函数
	Person() {
		cout << "无参构造函数!" << endl;
	}
	//有参构造函数
	Person(int a) {
		age = a;
		cout << "有参构造函数!" << endl;
	}
	//拷贝构造函数---------！！！不允许修改原件
    //为什么必须是引用？如果不是引用，相当于又定义了个临时类实例Person tmp(p);即陷入死循环
	Person(const Person& p) { // 【const + 引用】
		age = p.age;
		cout << "拷贝构造函数!" << endl;
	}
	//析构函数
	~Person() {
		cout << "析构函数!" << endl;
	}
public:
	int age;
};

//2、构造函数的调用
//调用无参构造函数
void test01() {
	Person p; //调用无参构造函数
}

//调用有参的构造函数
void test02() {

	//2.1  括号法，常用
	Person p1(10);
	//【注意1】：调用无参构造函数不能加括号，如果加了编译器认为这是一个函数声明
	//Person p2();---------------错误【被认为是函数声明】

	//2.2 显式法
	Person p2 = Person(10); 
	Person p3 = Person(p2);
	//Person(10)单独写就是匿名对象  当前行结束之后，马上析构

	//2.3 隐式转换法
	Person p4 = 10; // Person p4 = Person(10); 
	Person p5 = p4; // Person p5 = Person(p4); 

	//【注意2】：不能利用 拷贝构造函数 初始化匿名对象 编译器认为是对象声明
    // Person(p3) === Person p3; 
	//Person p5(p4);
}

int main() {

	test01();
	//test02();

	system("pause");
	return 0;
}
```



### 4.2.4 构造函数调用规则

> 调用规则 | `default` 关键字 | `explicit` 关键字

默认情况下，**c++编译器至少给一个类添加3个函数**

1．默认构造函数(无参，函数体为空)

2．默认析构函数(无参，函数体为空)

3．默认拷贝构造函数（对属性进行值拷贝）



#### 4.2.4.1 调用规则和 `default` 关键字

* 如果用户定义**有参构造函数**，c++**不再提供默认无参构造**，**但是会提供默认拷贝构造**
* 如果用户定义**拷贝构造函数**，c++**不会再提供其他构造函数**

只要定义过构造函数，默认构造函数就不会被定义。

但有时候我们希望依然自动提供一个默认构造函数，要么自己显示补充，要么需要关键字 `default`。

```c++
class Person {
public:
	//手动补充默认构造函数
	/*Person() {
		cout << "无参构造函数!" << endl;
	}*/
    //或者
    Person() = default;
	//有参构造函数
	Person(int a) {
		age = a;
		cout << "有参构造函数!" << endl;
	}
public:
	int age;
};
```

该两种写法中，`default` 的执行效率更高，但手动补充的方式功能可以更丰富

需要注意的一点：默认构造函数与带默认参数的构造函数可能发生重复，编译器无法区分，如

```c++
class Person {
public:
    // 发生错误，无法重载！
	Person() = default;
    // 建议保留，删除默认构造
	Person(int a = 100) {
		age = a;
		cout << "有参构造函数!" << endl;
	}
public:
	int age;
};
```

调用规则演示：

```C++
class Person {
public:
	//无参（默认）构造函数
	Person() {
		cout << "无参构造函数!" << endl;
	}
	//有参构造函数
	Person(int a) {
		age = a;
		cout << "有参构造函数!" << endl;
	}
	//拷贝构造函数
	Person(const Person& p) {
		age = p.age;
		cout << "拷贝构造函数!" << endl;
	}
	//析构函数
	~Person() {
		cout << "析构函数!" << endl;
	}
public:
	int age;
};

void test01()
{
	Person p1(18);
	//如果不写拷贝构造，编译器会自动添加拷贝构造，并且做浅拷贝操作
	Person p2(p1);

	cout << "p2的年龄为： " << p2.age << endl;
}

void test02()
{
	//如果用户提供有参构造，编译器不会提供默认构造，会提供拷贝构造
	Person p1; //此时如果用户自己没有提供默认构造，会出错
	Person p2(10); //用户提供的有参
	Person p3(p2); //此时如果用户没有提供拷贝构造，编译器会提供

	//如果用户提供拷贝构造，编译器不会提供其他构造函数
	Person p4; //此时如果用户自己没有提供默认构造，会出错
	Person p5(10); //此时如果用户自己没有提供有参，会出错
	Person p6(p5); //用户自己提供拷贝构造
}

int main() {

	test01();

	system("pause");
	return 0;
}
```


#### 4.2.4.2 `explict` 关键字

`explict` 关键字修饰构造函数： 禁止类型转换。

```c++
#include <iostream>
using namespace std;

class Person {
public:
	Person() = default;
	Person(int a) {
		age = a;
	}
	bool isBig(Person p)
	{
		return p.age > age;
	}
public:
	int age;
};

int main() {

	Person p1(100), p2(200);
	// 此处的【50】发生了默认的类型转换，且调用带参构造函数
	cout << p1.isBig(p2) << " " << p1.isBig(50) << endl;//1 0
	// 等价于 p1.isBig(Person(50))
	// 可以使用explicit修饰构造函数来禁用类型转换

	system("pause");
	return 0;
}
```



### 4.2.5 深入理解构造函数

构造函数是C++类中用于初始化对象的特殊成员函数，具有与类同名、无返回值、可重载等特性。它在对象创建时自动调用，负责完成对象的初始化工作。

#### 4.2.5.1 初始化列表初始化

使用**初始化列表**是构造函数中初始化成员变量的推荐方式，相比在构造函数体中赋值，具有显著优势：

**优势：**
- **效率更高**：避免了先默认初始化再赋值的开销
	  1. 常规赋值方式：先分配内存 → 成员变量默认初始化 → 构造函数体中赋值
	  2. 初始化列表方式：直接在内存分配后使用指定值初始化成员变量
- **必须使用的场景**：
	  1. 成员变量是`const`类型（必须在初始化时赋值）
	  2. 成员变量是引用类型（必须在初始化时绑定对象）
	  3. 成员变量是没有默认构造函数的类类型（需要传递参数）
	  4. 涉及类的继承关系（基类构造需要参数）

> [!attention] 注意事项：
> 初始化顺序严格按照**类定义中成员变量的声明顺序**，而非初始化列表中的顺序。如果初始化列表的顺序与声明顺序不符，可能导致未定义行为。

```c++
class Role {
public:
    Role() = default;

    // 初始化列表初始化
    Role(int _hp, int _lv) : hp{_hp}, lv{_lv} {
        cout << "hp: " << hp << ", lv: " << lv << endl;
    }

private:
    int hp;    // 先声明
    int lv;    // 后声明
};

// 错误示例：初始化顺序问题
class BadExample {
public:
    BadExample(int value) : b{value}, a{b} {  // 初始化列表顺序
        cout << "a: " << a << ", b: " << b << endl;
    }
private:
    int a;    // 实际初始化顺序：a先于b
    int b;
};
```

初始化列表示例：

```C++
class Person {
public:

	////传统方式初始化
	//Person(int a, int b, int c) {
	//	m_A = a;
	//	m_B = b;
	//	m_C = c;
	//}

	//初始化列表方式初始化
	Person(int a, int b, int c) :m_A(a), m_B(b), m_C(c) {}
	void PrintPerson() {
		cout << "mA:" << m_A << endl;
		cout << "mB:" << m_B << endl;
		cout << "mC:" << m_C << endl;
	}
private:
	int m_A;
	int m_B;
	int m_C;
};

int main() {

	Person p(1, 2, 3);
	p.PrintPerson();


	system("pause");
	return 0;
}
```
#### 4.2.5.2 委托构造

C++11引入了**委托构造**，允许一个构造函数调用同一个类的另一个构造函数，避免代码重复。

**核心规则：**
- 委托构造函数不能同时使用初始化列表初始化其他成员
- 一个构造函数只能委托给一个其他构造函数
- 委托构造函数会先执行被委托的构造函数，然后执行自身的代码

```c++
class Role {
public:
    Role() = default;

    Role(int _lv) {  // 基础构造函数
        lv = _lv;
        hp = _lv * 10;  // 根据等级计算血量
        cout << "Role(int _lv)调用" << endl;
    }

    Role(int _hp, int _lv) : Role(_lv) {  // 委托构造
        hp = _hp;  // 重写血量
        cout << "Role(int _hp, int _lv)调用" << endl;
    }

private:
    int hp;
    int lv;
};

int main() {
    Role r(150, 10);  // 输出：Role(int _lv)调用 → Role(int _hp, int _lv)调用
    return 0;
}
```

#### 4.2.5.3 默认构造函数详解

默认构造函数是无参数的构造函数，具有以下特点：

**编译器生成的默认构造函数：**
- 如果类中没有定义任何构造函数，编译器会自动生成
- 对基本类型成员不初始化（值未定义）
- 对类类型成员会调用其默认构造函数

**显式声明默认构造函数：**
C++11允许使用`= default`显式声明默认构造函数，提高代码可读性：

```c++
class MyClass {
public:
    MyClass() = default;  // 显式默认构造函数

    MyClass(int x) {  // 带参构造函数
        // ...
    }
};
```

**禁止默认构造函数：**
如果不希望类有默认构造函数，可以使用`= delete`禁止：

```c++
class NoDefault {
public:
    NoDefault() = delete;  // 禁止默认构造函数
    NoDefault(int x) { /* ... */ }
};
```

#### 4.2.5.4 构造函数的初始化顺序

构造函数的初始化顺序遵循以下规则：
1. 基类构造函数（如果有继承）
2. 成员变量构造函数（按类中声明顺序）
3. 自身构造函数体

```c++
class Base {
public:
    Base() { cout << "Base构造" << endl; }
};

class Member {
public:
    Member() { cout << "Member构造" << endl; }
};

class Derived : public Base {
public:
    Derived() { cout << "Derived构造" << endl; }
private:
    Member m;
};

int main() {
    Derived d;  // 输出顺序：Base构造 → Member构造 → Derived构造
    return 0;
}
```



### 4.2.6 拷贝构造函数

拷贝构造函数（Copy Constructor）是一种特殊的构造函数，用于通过已存在的对象创建新对象。它在对象拷贝时自动调用，是C++中重要的内存管理机制。

```c++
class 类名 {
public:
    类名(const 类名& 对象名);  // 标准拷贝构造函数
};
```

**核心特点：**
- 参数必须是**常引用（const &）** 类型，避免无限递归调用
- 无返回值
- 与类同名

**编译器生成的默认拷贝构造函数：**
- 如果类中未显式定义拷贝构造函数，编译器会自动生成
- 默认实现为**浅拷贝**（简单的成员变量赋值）
- 对于包含指针、动态内存分配的类，默认拷贝构造函数可能导致内存泄漏

```c++
class Role {
public:
	Role() = default;
	Role(int _hp, int _lv) :Role(_lv)// 委托构造
	{
		cout << hp << " " << lv << endl;
	}
	Role(Role& role) :hp{ role.hp } // 严格意义上要加const，如果不是引用会导致死循环
	{
		//hp = role.hp;// 此处为同类中访问成员变量，故可访问私有变量；若为不同类，不可访问私有
	}
private:
	int hp;
	int lv;
};

int main()
{
	Role user(100, 200);
	Role user1(user);//调用拷贝构造
	Role user2 = user1;//调用拷贝构造【等价于Role user2{user1};】

	user2 = user1;// 不会调用拷贝构造,而是重载运算符
	system("pause");

	return 0;
}
```



**拷贝构造函数调用时机**：C++中拷贝构造函数【也称副本构造函数】调用时机通常有三种情况

* 使用一个已经创建完毕的对象来初始化一个新对象
* 值传递的方式给函数参数传值
* 以值方式返回局部对象

```C++
class Person {
public:
	Person() {
		cout << "无参构造函数!" << endl;
		mAge = 0;
	}
	Person(int age) {
		cout << "有参构造函数!" << endl;
		mAge = age;
	}
	Person(const Person& p) {
		cout << "拷贝构造函数!" << endl;
		mAge = p.mAge;
	}
	//析构函数在释放内存之前调用
	~Person() {  
		cout << "析构函数!" << endl;
	}
public:
	int mAge;
};

//1. 使用一个已经创建完毕的对象来初始化一个新对象
void test01() {

	Person man(100); //p对象已经创建完毕
	Person newman(man); //调用拷贝构造函数
	Person newman2 = man; //拷贝构造

	//Person newman3;
	//newman3 = man; //不是调用拷贝构造函数，赋值操作
}

//2. 值传递的方式给函数参数传值
//相当于Person p1 = p;
void doWork(Person p1) {}
void test02() {
	Person p; //无参构造函数
	doWork(p);
}

//3. 以值方式返回局部对象
Person doWork2()
{
	Person p1;
	cout << (int *)&p1 << endl;
	return p1;
}

void test03()
{
	Person p = doWork2();
	cout << (int *)&p << endl;
}

int main() {

	//test01();
	//test02();
	test03();

	system("pause");
	return 0;
}
```





### 4.2.7 深拷贝与浅拷贝

> 深浅拷贝是 C++ 面试的经典问题，也是使用类时的常见陷阱，特别涉及动态内存管理时。

#### 4.2.7.1 浅拷贝（Shallow Copy）

浅拷贝是**简单的成员变量赋值拷贝**，编译器生成的默认拷贝构造函数和赋值运算符都是浅拷贝实现。

**特点：**
- 成员变量直接赋值
- 对于指针成员，只拷贝指针地址，不拷贝指针指向的内容
- 内存效率高，但存在内存安全隐患

**浅拷贝的问题示例：**
```c++
class Person {
public:
    Person(int age, int height) {
        m_age = age;
        m_height = new int(height);  // 在堆区分配内存
        cout << "Person构造函数: " << (int*)m_height << endl;
    }

    ~Person() {
        cout << "Person析构函数: " << (int*)m_height << endl;
        if (m_height != nullptr) {
            delete m_height;  // 释放堆区内存
            m_height = nullptr;
        }
    }

private:
    int m_age;
    int* m_height;  // 指针成员
};

int main() {
    Person p1(18, 180);
    Person p2 = p1;  // 浅拷贝，直接复制指针地址

    cout << "p1的身高地址: " << (int*)p1.m_height << endl;
    cout << "p2的身高地址: " << (int*)p2.m_height << endl;

    return 0;
}
```

**运行结果：**
```
Person构造函数: 0x100200010
p1的身高地址: 0x100200010
p2的身高地址: 0x100200010  // 地址相同，浅拷贝问题
Person析构函数: 0x100200010  // p2析构，释放内存
Person析构函数: 0x100200010  // p1析构，再次释放同一地址！
```

**问题分析：**
- 两个对象的 `m_height` 成员指向同一个堆内存地址
- 程序结束时会调用两次 `delete`，导致**重复释放内存（double free）**
- 可能导致程序崩溃或未定义行为

#### 4.2.7.2 深拷贝（Deep Copy）

深拷贝是**在堆区重新申请内存空间，拷贝指针指向的内容**，需要自定义实现拷贝构造函数和赋值运算符。

**深拷贝的实现：**
```c++
class Person {
public:
    Person(int age, int height) {
        m_age = age;
        m_height = new int(height);
        cout << "Person构造函数: " << (int*)m_height << endl;
    }

    // 自定义拷贝构造函数 - 深拷贝实现
    Person(const Person& p) {
        cout << "Person拷贝构造函数" << endl;
        m_age = p.m_age;
        m_height = new int(*p.m_height);  // 重新分配内存并拷贝内容
    }

    // 自定义赋值运算符 - 深拷贝实现
    Person& operator=(const Person& p) {
        if (this == &p) {  // 检查自赋值
            return *this;
        }

        cout << "Person赋值运算符" << endl;

        // 释放原有内存
        if (m_height != nullptr) {
            delete m_height;
            m_height = nullptr;
        }

        // 深拷贝
        m_age = p.m_age;
        m_height = new int(*p.m_height);

        return *this;
    }

    ~Person() {
        cout << "Person析构函数: " << (int*)m_height << endl;
        if (m_height != nullptr) {
            delete m_height;
            m_height = nullptr;
        }
    }

private:
    int m_age;
    int* m_height;
};

int main() {
    Person p1(18, 180);
    Person p2 = p1;  // 调用深拷贝构造函数

    cout << "p1的身高地址: " << (int*)p1.m_height << endl;
    cout << "p2的身高地址: " << (int*)p2.m_height << endl;

    Person p3(20, 175);
    p3 = p1;  // 调用深拷贝赋值运算符

    cout << "p3的身高地址: " << (int*)p3.m_height << endl;

    return 0;
}
```

**运行结果：**
```
Person构造函数: 0x100200010
Person拷贝构造函数
p1的身高地址: 0x100200010
p2的身高地址: 0x100200020  // 地址不同，深拷贝成功
Person构造函数: 0x100200030
Person赋值运算符
Person析构函数: 0x100200040  // 新分配的地址
p3的身高地址: 0x100200040
Person析构函数: 0x100200040  // 正常释放
Person析构函数: 0x100200020
Person析构函数: 0x100200010
```

#### 4.2.7.3 何时需要深拷贝

以下情况必须使用深拷贝：
1. 类包含指针成员
2. 类包含动态分配的内存（new/delete）
3. 类包含其他资源句柄（文件句柄、网络连接等）
4. 需要独立管理对象状态时

#### 4.2.7.4 深浅拷贝对比

| 特性   | 浅拷贝      | 深拷贝            |
| ---- | -------- | -------------- |
| 内存复制 | 仅复制成员变量值 | 复制成员变量值+指针指向内容 |
| 内存效率 | 高        | 低              |
| 实现方式 | 编译器自动生成  | 需要手动实现         |
| 指针处理 | 复制指针地址   | 重新分配内存并复制内容    |
| 安全性  | 存在重复释放风险 | 安全，各自管理内存      |

#### 4.2.7.5 避免浅拷贝问题的策略

1. **自定义拷贝构造函数和赋值运算符**，实现深拷贝
2. **使用智能指针**（如 `std::unique_ptr`、`std::shared_ptr`），自动管理内存
3. **使用 RAII（资源获取即初始化）原则**
4. **禁止拷贝**：如果类管理不可拷贝的资源，使用 `= delete` 禁止拷贝操作

**智能指针解决方案：**
```c++
class Person {
public:
    Person(int age, int height)
        : m_age(age), m_height(std::make_unique<int>(height)) {
        cout << "Person构造函数: " << (int*)m_height.get() << endl;
    }

    // 智能指针会自动处理拷贝和内存管理
    void printHeight() {
        cout << "身高: " << *m_height << endl;
    }

private:
    int m_age;
    std::unique_ptr<int> m_height;  // 智能指针成员
};

int main() {
    Person p1(18, 180);
    // Person p2 = p1;  // 编译错误，unique_ptr不支持拷贝
    Person p3(20, 175);

    return 0;
}
```

**总结：**
- 浅拷贝简单高效，但对包含指针成员的类有内存安全隐患
- 深拷贝安全但效率较低，需要手动实现
- 对于现代 C++ 开发，推荐使用智能指针替代裸指针，避免手动内存管理的复杂性

```C++
class Person {
public:
	//无参（默认）构造函数
	Person() {
		cout << "无参构造函数!" << endl;
	}
	//有参构造函数
	Person(int age ,int height) {
		
		cout << "有参构造函数!" << endl;

		m_age = age;
		m_height = new int(height);
		
	}
	//拷贝构造函数  
	Person(const Person& p) {
		cout << "拷贝构造函数!" << endl;
		//如果不利用深拷贝在堆区创建新内存，会导致浅拷贝带来的重复释放堆区问题
        // m_height = p.m_height; // 编译器默认
		m_age = p.m_age;
		m_height = new int(*p.m_height);
        // *p.m_height : 具体数值【解引用】
		
	}

	//析构函数：会将堆区开辟的数据做释放！！
	~Person() {
		cout << "析构函数!" << endl;
		if (m_height != NULL)
		{
			delete m_height;
		}
	}
public:
	int m_age;
	int* m_height; // 为了把身高数据，开辟到堆区
    // 注意：构造函数中
};

void test01()
{
	Person p1(18, 180);

	Person p2(p1); // 报错：浅拷贝错误
    // 【会把p1数据地址复制过去，若p1释放则原堆区释放数据，但p2会重复释放】

	cout << "p1的年龄： " << p1.m_age << " 身高： " << *p1.m_height << endl;
	cout << "p2的年龄： " << p2.m_age << " 身高： " << *p2.m_height << endl;
}

int main() {

	test01();

	system("pause");
	return 0;
}
```

> [!tip] 如果属性有在堆区开辟的，一定要自己提供**拷贝构造函数**，防止浅拷贝带来的问题




### 4.2.8 练习：hstring

实现功能：

- 构造函数：`hstring str("你好！");`
- 副本构造函数：`hstring strA(str);`

```c++
#include <iostream>
using namespace std;

class hstring {
private:
	char* hstr;
	unsigned short length;
	// 求字符串长度
	unsigned short getLength(const char* str)
	{
		unsigned short len{ 0 };
		//while(str[len++])
		while (str[len])
		{
			len++;
		}
		cout << "len:" << len << endl;
		return len;
	}
public:
	hstring()// 默认构造
	{
		length = 1;//注意：空字符串长度为1
		hstr = new char[1] {0};
	}
	char* show() const
	{
		return hstr;
	}
	//带参构造函数
	hstring(const char* str)
	{
		//hstr = str;// 很明显的错误
		//hstr = (char*)str;//无报错，但编译错误：析构函数无法释放未分配的内存
		length = getLength(str);
		cout << "this length" << length<<endl;
		hstr = new char[length];
		memcpy(hstr, str, length);
	}
	// 默认拷贝构造：直接赋值hstr和length，其中hstr的直接复制导致析构函数无法释放未分配的内存
	//副本构造函数
	hstring(const hstring& str)
	{
		length = str.length;
		hstr = new char[length];
		memcpy(hstr, str.hstr, length);
	}
	// 使用委托构造,功能同上
	/*hstring(const hstring& str):hstring(show())
	{
		
	}*/
	//动态改变内容
	void setStr(const char* str)
	{
		delete[] hstr;
		length = getLength(str);
		hstr = new char[length];
		memcpy(hstr, str, length);
	}
	// 析构函数：释放堆区空间
	~hstring()
	{
		delete[] hstr;
	}
};

int main()
{
	hstring str1;
	cout << str1.show() << endl;

	hstring str2("你好！地球人！");//14字节
	cout << strlen(str2.show()) << endl;// 18
	cout << str2.show() << endl;// 除了14字节的7个字符，还有乱码

	hstring str3(str2);
	cout << str3.show() << endl;

	str3.setStr("你好！");
	cout << str3.show() << endl;

	system("pause");

	return 0;
}
```

存在bug，显示如下【为什么申请了14个字节，但实际给了30个？】

```cmd
dd14
this length14
30
你好！地球人！葺葺葺鸊钧?
你好！地球人！葺葺葺鐶?
dd6
你好！葺葺葺葺葺
请按任意键继续. . .
```

**🔺分析解决**：初始化问题【须多申请一个位置存放结束位置，并将其全部初始化为0】

```c++
hstr = new char[length+1];
memset(hstr, 0, length+1);
memcpy(hstr, str, length);
```



<br>

## 4.3 类与对象的本质

### 4.3.1 C++对象模型

在C++中，类内的成员变量和成员函数分开存储，**只有非静态成员变量才属于类的对象上**。

```c++
class Person1 {};

void test01() {
    // 空对象占用内存空间为：1
	// C++ 编译器会给每一个空对象分配一个字节的空间，是为了区分空对象占用内存的位置
    Person1 p;
    cout  << "size of p is " <<  sizeof(p) << endl;
}


class Person2 {
    int m_A; // 非静态成员变量 属于类的对象上
};
void test02() {
    // 占用空间为4【内存对齐】
    Person2 p;
    cout  << "size of p is " <<  sizeof(p) << endl;
}


class Person3 {
    int m_A; // 非静态成员变量 属于类的对象上
    static int m_B;
};
void test03() {
    // 占用空间为4【内存对齐】  ---- 不包含静态变量
    Person3 p;
    cout  << "size of p is " <<  sizeof(p) << endl;
}
```



```C++
class Person {
public:
	Person() {
		mA = 0;
	}
	//非静态成员变量占对象空间
	int mA;
	//静态成员变量不占对象空间
	static int mB; 
	//函数也不占对象空间，所有函数共享一个函数实例
	void func() {
		cout << "mA:" << this->mA << endl;
	}
	//静态成员函数也不占对象空间
	static void sfunc() {
	}
};

int main() {

	cout << sizeof(Person) << endl;

	system("pause");
	return 0;
}
```



### 4.3.2 this 指针概念

> [!note] 通过上一节我们知道，在C++中成员变量和成员函数是分开存储的。

每一个非静态成员函数只会诞生一份函数实例，也就是说多个同类型的对象会共用一块代码。

> [!question] 那么问题是：这一块代码是如何区分那个对象调用自己的呢？
> C++通过提供特殊的对象指针（this指针）来解决上述问题。

注意：this指针指向被调用的成员函数所属的对象。

1. this指针是隐含每一个非静态成员函数内的一种指针
2. this指针不需要定义，直接使用即可


this指针的**用途**：

*  当形参和成员变量同名时，可用this指针来区分【解决命名冲突】
*  在类的非静态成员函数中**返回对象本身**，可使用 `return *this`

```C++
class Person
{
public:

	Person(int age)
	{
		//1、当形参和成员变量同名时，可用this指针来区分
		this->age = age;
	}

    // 🔺返回引用，不会重新创建对象；值返回会通过拷贝函数创建新对象
	Person& PersonAddPerson(Person p)
	{
		this->age += p.age;
		//返回对象本身
		return *this;
	}

	int age;
};

void test01()
{
	Person p1(10);
	cout << "p1.age = " << p1.age << endl;

	Person p2(10);
    // 返回引用---实现链式编程
	p2.PersonAddPerson(p1).PersonAddPerson(p1).PersonAddPerson(p1);
	cout << "p2.age = " << p2.age << endl;
}

int main() {

	test01();
    
    // 此处*this的用法：本质同下三行
    int a = 20;
    int* p = &a;
    int& c = *p;

	system("pause");
	return 0;
}
```



### 4.3.3 空指针访问成员函数

C++中空指针也是可以调用成员函数的，但是也要**注意有没有用到`this`指针**

> 如果用到this指针，需要加以判断保证代码的健壮性

**示例：**

```C++
//空指针访问成员函数
class Person {
public:
	void ShowClassName() {
		cout << "我是Person类!" << endl;
	}
	void ShowPerson() {
        // 保证代码健壮性
		if (this == NULL) {
			return;
		}
		cout << mAge << endl;
        // 默认为 cout << this->mAge << endl;
	}

public:
	int mAge;
};

void test01()
{
	Person * p = NULL;
	p->ShowClassName(); //空指针，可以调用成员函数
	p->ShowPerson();  //但是如果成员函数中用到了this指针，就不可以了
}

int main() {

	test01();

	system("pause");
	return 0;
}
```



### 4.3.4 静态成员

静态成员就是在成员变量和成员函数前加上关键字`static`，称为静态成员。

静态变量只被定义一次【涉及内存分配，也只有一次】，程序结束自动释放。

> [!note] 涉及 `static` 的地方，目前是：
> 【1 程序分区模型】【2.4 引用做函数返回值】【3.8 C语言和C++联合编程 static inline】【6 编译器 OOD】

静态成员分为：

*  静态成员变量
   *  所有对象共享同一份数据【静态成员变量不占类大小】
   *  在编译阶段分配内存【即类未实例化时就可访问，非静态成员变量在实例化时分配内存】
   *  **类内声明，类外初始化**【否则链接错误】
*  静态成员函数
   *  所有对象共享同一个函数【即类未实例化时就可访问】
   *  静态成员函数**只能访问静态成员变量**【可能非静态成员变量还没有分配内存空间】
   *  类的静态成员函数不能是const【即不能是常函数】【常函数即不改变成员属性，而且静态成员函数本身就不能访问非静态的成员变量，故没有意义】
   *  类的静态成员函数不能使用this指针【可能使用this指针改变非静态成员变量】



**示例1 ：** 静态成员变量

```C++
class Person
{
	
public:

	static int m_A; //静态成员变量
    // c++17新语法：静态成员变量初始化【{}默认0】【记得在析构函数中count--】
    inline static int count{};// 在构造函数中count++,可用于统计实例个数
    //静态成员常量【counter值无法更改】
    //inline const static int counter{};// 有了const可以省略inline
    const static int count{};//仅可定义基本类型的变量

	//静态成员变量特点：
	//1 在编译阶段分配内存
	//2 类内声明，类外初始化[存在例外]
	//3 所有对象共享同一份数据

private:
	static int m_B; //静态成员变量也是有访问权限的
};
int Person::m_A = 10;
int Person::m_B = 10;

int main() {
    // Person类的大小：sizeof(Person)不包括静态成员变量

	//静态成员变量两种访问方式
	//1、通过对象
	Person p1;
	p1.m_A = 100;
	cout << "p1.m_A = " << p1.m_A << endl;

	Person p2;
	p2.m_A = 200;
	cout << "p1.m_A = " << p1.m_A << endl; //共享同一份数据
	cout << "p2.m_A = " << p2.m_A << endl;

	//2、通过类名
	cout << "m_A = " << Person::m_A << endl;
	//cout << "m_B = " << Person::m_B << endl; //私有权限访问不到

	system("pause");
	return 0;
}
```



**示例2：** 静态成员函数

```C++
class Person
{

public:

	//静态成员函数特点：
	//1 程序共享一个函数
	//2 静态成员函数只能访问静态成员变量
    //  【因为非静态变量只能通过对象访问】
	
	static void func()
	{
		cout << "func调用" << endl;
		m_A = 100;
		//m_B = 100; //错误，不可以访问非静态成员变量
	}

	static int m_A; //静态成员变量
	int m_B; // 
private:

	//静态成员函数也是有访问权限的
	static void func2()
	{
		cout << "func2调用" << endl;
	}
};
int Person::m_A = 10;


void test01()
{
	//静态成员变量两种访问方式

	//1、通过对象
	Person p1;
	p1.func();

	//2、通过类名
	Person::func();
	//Person::func2(); //私有权限访问不到
}

int main() {

	test01();

	system("pause");
	return 0;
}
```



### 4.3.5 malloc与new的本质区别

1. 对于普通的数据类型来说malloc和new没什么区别；但是对于类来说，malloc仅仅是分配内存，new除了分配内存以外还会调用构造函数！
2. 对于普通的数据类型来说free和delete没有什么区别；但是对于类来说，free仅仅是释放内存空间，而delete不仅释放内存空间，还会调用类的析构函数
3. 对于普通的数据类型来说delete和delete[]没有什么区别；但是对于类来说，delete仅仅是释放内存空间，且调用第一个元素的析构函数，而delete[]不仅释放内存空间，还会调用每一个元素的析构函数
4. 另外，new一个指针会进行类型检查，而malloc出来的指针是无类型的，不进行类型检查

```c++
#include<iostream>

class T
{
	int m_count{};
	inline static int count{};// c++17的inline
public:
	T()
	{
		std::cout << "第" << ++count << "个T被构造" << std::endl;
		m_count = count;
	}
	int test = 2;
	~T()
	{
		std::cout << "第" << m_count-- << "个T被析构" << std::endl;
	}
};

int main()
{
	T* t1 = (T*)malloc(10 * sizeof(T));
	std::cout << t1[2].test << std::endl;//-842150451
	T* t2 = new T[20];// 涉及了构造函数或析构函数

	//对于普通的数据类型来说malloc和new没什么区别
	int* pint = (int*)malloc(10 * sizeof(int));
	pint[2] = 25;
	std::cout << pint[2] << std::endl;//25

	free(t1);
	free(pint);
	//free(t2);//直接报错：释放类的空间而没有调用类的析构函数
	//delete t2;// 调用析构函数后报错：t2是个指针数组【即只销毁了第一个对象】
	delete[] t2;// 注意：从第100个开始销毁

	system("pause");
	return 0;
}
```



### 4.3.6 从底层理解类

- 类的函数调用约定this call【x86 32位】
- 为什么静态成员函数没有this指针？【使用`__cdecl`函数调用约定】
- 为什么静态成员函数不能访问类的非静态成员变量？【根本就没有传递this指针】
- 类真的一定有构造函数吗？

 x86 32位操作系统下，观察汇编代码【Release模式下，禁用代码优化；代码生成|禁用安全检查】

```c++
#include<iostream>

class T
{
	int hp;
public:
	int Add(int a, int b)
	{
		return hp + a + b;
        // 相当于：return this.hp + a + b;
	}
};

int main()
{
	T t1;
	t1.Add(10, 20);
}
```

非静态的类函数调用为`__thiscall`，其不同于普通函数和类静态函数的调用约定【上一次讨论函数调用约定：`3.8.7 函数调用约定`】

![](cppcore-1.png)

`_thiscall` 是C++中类的成员函数访问时定义的函数调用约定

(1）寄存器`ecx`用来存放类的指针
(2)   参数由右到左入栈
(3)   堆栈由被调用者负责恢复

类中的**非静态成员函数**都可以使用this指针，this指针本质上来讲就是把对象的指针通过寄存器ecx传入成员函数的。因此，类中成员函数访问其成员变量时，都是通过指针+偏移的形式来访间的，不管是否明确使用this指针。【注意：约定使用 `exc`，不是铁律，可以调整，这属于**4.3.7 自定义类的函数调用** 】

对于类的**静态成员函数**，本质上是采用的`_cdecl`约定

(1）参数由右到左入栈
(1）由调用者恢复堆栈平衡

因为类的静态成员函数本质上就是一个普通的函数，所以根本没有传递对象的指针。因此：

- 类的静态成员函数也就不能访问其成员变量；
- 而类的静态成员变量本质上相当于一个全局变量，有着固定的内存地址，与类对象并无关系。所以类的静态成员，可以在类没有实例的情况下，通过【`类::静态成员`】这样的形式来访问

```c++
#include<iostream>

class T
{
	int hp;
public:
	int Add(int a, int b)
	{
		return hp + a + b;
	}
	static int GetNum(int a, int b)
	{
		return a + b;
	}
};

int main()
{
	T t1;
	//t1.Add(10, 20);
	t1.GetNum(1, 15);
}
```

对于类的**静态成员变量**，可以在上图中看到，静态成员函数调用静态成员变量时，直接使用全局变量的写法。

```c++
#include<iostream>

class T
{
	int hp;
	inline static int count{ 0 };//c++17新语法
public:
	int Add(int a, int b)
	{
		return hp + a + b;
	}
	static int GetNum(int a, int b)
	{
		count++;
		return a + b;
	}
};

int main()
{
	T t1;
	//t1.Add(10, 20);
	t1.GetNum(1, 15);
}
```

另外，**类真的一定有构造函数吗？**

我们在学习类时，每个类都有一个默认构造函数，如果没有显式指定，编译器会为我们添加一个空的默认构造函数 `T(){}`。

但是我们在逆向后会发现，类T大部分的时候是没有默认构造函数的。这是因为C/C++标准委员会要求每一个类都有默认构造函数，而一个空的构造函数实际上没有任何意义，所以某些情况下编译器会删除掉没有意义的构造函数，这是编译器优化的功劳。原则上来讲，每一个类都有默认构造函数。

当然，如果在类定义的时候，给类成员变量赋初值，这时候的默认构造函数就有了意义，编译器会添加默认构造函数。

```c++
class T
{
	int hp {200};
};
```



### 4.3.7 自定义类的函数调用

由上一节中引出，在类成员函数的调用约定 `thiscall` 中，默认使用exc传递this指针。

但也可以自定义调用约定，以下进行介绍：

```c++
#include<iostream>

class Role
{
public:
	int hp;
	void BeAct(int damage)
	{
		hp = hp - damage;
		std::cout << "BeAct" << std::endl;
	}
	void _stdcall BeAct1(int damage1, int damage2)
	{
		hp = hp - damage1;
		std::cout << "BeAct1" << std::endl;
	}
	void _cdecl BeAct2(int damage1, int damage2)
	{
		hp = hp - damage1;
		std::cout << "BeAct1" << std::endl;
	}
};

int main()
{
	Role p;
	p.BeAct(20);// 默认将p的地址传入ecx作为this指针
	p.BeAct1(1, 2);// 使用stdcall的调用约定
	p.BeAct2(1, 2);// 使用cdecl的调用约定
}
```

反汇编如下：

```pascal
    22: 	p.BeAct(20);// 默认将p的地址传入ecx作为this指针
008F1084  push        14h  
008F1086  lea         ecx,[p]  //ecx作为this
008F1089  call        Role::BeAct (08F1000h)  
    23: 	p.BeAct1(1, 2);
008F108E  push        2  
008F1090  push        1  
008F1092  lea         eax,[p]  // 将p作为参数传递，使用eax
008F1095  push        eax  
008F1096  call        Role::BeAct1 (08F1040h)  
    29: 	p.BeAct2(1, 2);// 使用cdecl的调用约定
005A10DB  push        2  
005A10DD  push        1  
005A10DF  lea         ecx,[p]  // 将p作为参数传递，使用栈
005A10E2  push        ecx  
005A10E3  call        Role::BeAct2 (05A1080h)  
005A10E8  add         esp,0Ch  
    30: }
```



<br>


## 4.4 友元

在程序里，有些私有属性也想让类外特殊的一些函数或者类进行访问，就需要用到友元的技术。

友元的目的就是：让一个函数或者类访问另一个类中私有成员。

友元的三种实现：
* 全局函数做友元
* 类做友元
* 成员函数做友元

> [!note] 注意：
> 1. 友元会破坏类的封装性，所以只会在特定场景下使用；友元类关系不是平等的。
> 2. 友元不具有传递性

### 4.4.1 全局函数做友元

可以访问友元类中私有的成员变量和成员函数

```C++
class Building
{
	//告诉编译器 goodGay全局函数 是 Building类的好朋友，可以访问类中的私有内容
    // 声明
	friend void goodGay(Building * building);

public:

	Building()
	{
		this->m_SittingRoom = "客厅";
		this->m_BedRoom = "卧室";
	}


public:
	string m_SittingRoom; //客厅

private:
	string m_BedRoom; //卧室
};

void goodGay(Building * building)
{
	cout << "好基友正在访问： " << building->m_SittingRoom << endl;
	cout << "好基友正在访问： " << building->m_BedRoom << endl;
}

int main(){

	Building b;
	goodGay(&b);

	system("pause");
	return 0;
}
```



### 4.4.2 类做友元

```C++
class Building; // 先声明【🔺注意：类的编译也是顺序进行】
class goodGay
{
public:

	goodGay();
	void visit();

private:
	Building *building;
};


class Building
{
	//告诉编译器 goodGay类是Building类的好朋友，可以访问到Building类中私有内容
    // !!! 友元声明
	friend class goodGay;

public:
	Building();

public:
	string m_SittingRoom; //客厅
private:
	string m_BedRoom;//卧室
};

Building::Building()
{
	this->m_SittingRoom = "客厅";
	this->m_BedRoom = "卧室";
}

goodGay::goodGay()
{
	building = new Building;
}

void goodGay::visit()
{
	cout << "好基友正在访问" << building->m_SittingRoom << endl;
	cout << "好基友正在访问" << building->m_BedRoom << endl;
}

int main(){

	goodGay gg;
	gg.visit();

	system("pause");
	return 0;
}
```



### 4.4.3 成员函数做友元

```C++
class Building;
class goodGay
{
public:

	goodGay();
	void visit(); //只让visit函数作为Building的好朋友，可以发访问Building中私有内容
	void visit2(); 

private:
	Building *building;
};

class Building
{
	//告诉编译器  goodGay类中的visit成员函数 是Building好朋友，可以访问私有内容
	friend void goodGay::visit();

public:
	Building();

public:
	string m_SittingRoom; //客厅
private:
	string m_BedRoom;//卧室
};

Building::Building()
{
	this->m_SittingRoom = "客厅";
	this->m_BedRoom = "卧室";
}

goodGay::goodGay()
{
	building = new Building;
}

void goodGay::visit()
{
	cout << "好基友正在访问" << building->m_SittingRoom << endl;
	cout << "好基友正在访问" << building->m_BedRoom << endl;
}

void goodGay::visit2()
{
	cout << "好基友正在访问" << building->m_SittingRoom << endl;
	//cout << "好基友正在访问" << building->m_BedRoom << endl;
}

int main(){
    
	goodGay  gg;
	gg.visit();

	system("pause");
	return 0;
}
```



<br>

## 4.5 嵌套类

### 4.5.1 类对象作为类成员

C++类中的成员可以是另一个类的对象，我们称该成员为对象成员。

```C++
class A {}
class B
{
    A a；
}
```

B类中有对象A作为成员，A为对象成员。那么，当创建B对象时，A与B的构造和析构的顺序是谁先谁后？

```C++
class Phone
{
public:
	Phone(string name)
	{
		m_PhoneName = name;
		cout << "Phone构造" << endl;
	}

	~Phone()
	{
		cout << "Phone析构" << endl;
	}

	string m_PhoneName;

};


class Person
{
public:

	//初始化列表可以告诉编译器调用哪一个构造函数
	Person(string name, string pName) :m_Name(name), m_Phone(pName)
	{
		cout << "Person构造" << endl;
	}

	~Person()
	{
		cout << "Person析构" << endl;
	}

	void playGame()
	{
		cout << m_Name << " 使用" << m_Phone.m_PhoneName << " 牌手机! " << endl;
	}

	string m_Name;
	Phone m_Phone;

};

int main() {

	//当类中成员是其他类对象时，我们称该成员为 对象成员
	//构造的顺序是 ：先调用对象成员的构造，再调用本类构造！！！
	//析构顺序与构造相反
	Person p("张三" , "苹果X");
	p.playGame();

	system("pause");

	return 0;
}
```

另一个例子：

```c++
#include<iostream>

enum class WeaponLV
{
	normal=0,
	high,
	rare,
	myth
};

// 如果这个类只有在 Role中才用到，可以将Weapon定义在Role中，被称为嵌套类
/*
class Weapon
{
	short lv;
	WeaponLV wlv;
};
*/

class Role//外层类
{
public:
	static void test()
	{
		//外层类的公有静态函数可被直接访问
	}
	// 与写在外面相比，区别在于：作用域不同，Weapon的作用域仅在Role中有效
public:
	class Weapon//嵌套类【随着嵌套类内容的增多，会越来越臃肿，故只声明】
	{
		Weapon* ReturnW();
	public:
		short lv;
		WeaponLV wlv;
		Weapon();
		static void wtest(){}
	};
	int hp;
	Weapon leftHands;// 将嵌套类定义在下面，会报错：不允许使用不完整的类型【未来可能会修复】
	//解决：将嵌套类定义在外层类内【不装杯】

	void common_test(){}
	Role()
	{
		// 外层类只能访问嵌套类的公有静态函数
		Weapon::wtest();
	}
private: 
	int mp;
};

// 外层类外定义嵌套类
/*
class Role::Weapon
{
	Weapon* ReturnW();
public:
	short lv;
	WeaponLV wlv;
	Weapon();
};
*/

// 类外定义构造函数
Role::Weapon::Weapon()
{
	test();//可直接访问外层类的【公有静态函数|静态 成员变量】
	//common_test();// 不可直接访问普通函数【需要实例】
	std::cout << "waepon!" << std::endl;

	// 类似友元【可通过实例直接访问外层类的私有成员变量】
	Role role;
	role.mp++;
}
// 类外定义函数【可能出错】
Role::Weapon* Role::Weapon::ReturnW()
{
	return this;
}

int main()
{
	Role r1;
	//Weapon w1;//不在作用域内
	Role::Weapon w1;// 要求嵌套类是public,private封装的嵌套类无法访问

	system("pause");

	return 0;
}
```



- 嵌套类受到封装的限制，只有当嵌套类是共有public时，才可以通过实例直接访问。
- 嵌套类可直接访问外层类的【公有静态函数|公有静态成员变量】，而不能访问普通成员
- 外层类只能访问嵌套类的公有静态函数。
- 类似友元【嵌套类可通过实例直接访问外层类的私有成员变量；相反，外层类无法通过实例直接访问嵌套类的私有成员变量】
- 枚举类型也可放入类中，但收到封装性质的影响【只有是共有public时，才可以通过实例直接访问】



### 4.5.2 局部类

定义在函数内的类称为局部类【非必要不用】

- 局部类的定义必须写在类内
- 局部类中不允许使用静态成员变量
- 局部类可以访问全局变量

```c++
#include<iostream>

int a;
int main()
{
	class T
	{
		int hp;
		int x;
		//static int aa;//不允许使用静态成员变量
		void GetHP()
		{
			a++;//访问全局变量
			x++;//不可访问局部类的变量【有争议】
		}
		static int GetCount(){}// 允许使用静态成员函数【有争议】
	};

	system("pause");
	return 0;
}
```



### 4.5.2 嵌套类的模块化问题

分文件编写嵌套类时，很可能遇到此问题。

```c++
#include<iostream>

class Role
{
public:
	class Skill;
};

class Role::Skill
{
public:
	int hp;
	int mp;
};

int main()
{
	Role::Skill sk;

	system("pause");
	return 0;
}
```

拆为多文件形式：

```c++
//"Role.h"
#include "Skill.h"
class Role
{
public:
	class Skill;
};

//"Skill.h"
#include "Role.h"
class Role::Skill
{
public:
	int hp;
	int mp;
};

//"main"
#include "Role.h"
#include "Skill.h"
```

错误原因在于：`"Skill.h"`中的`Role`需要`"Role.h"`中的定义，包含后`Role`的定义却在下方，是顺序问题【即变成如下的形式：故出错】

```c++
//"Skill.h"
#include "Role.h"
class Role::Skill
{
public:
	int hp;
	int mp;
};

class Role
{
public:
	class Skill;
};
```

**解决**：删除`"Role.h"`中的 `#include "Skill.h"`



<br>

# 五 运算符重载

运算符重载概念：对已有的运算符重新进行定义，赋予其另一种功能，以适应不同的数据类型。

## 5.1 运算符重载

### 5.1.1 运算符重载的概念

- 概念
- 类成员函数实现
- 非成员函数实现运算符重载

```c++
//语法：返回类型 operator运算符(){}
// 如
bool operator<(const Role& role){}
```

示例：

```c++
#include<iostream>

class Person
{
	unsigned short Age;
	unsigned short Height;
	friend bool operator<(Person& pa, Person& pb);
public:
	Person(unsigned short _Age, unsigned short _h) :Age{ _Age }, Height{ _h } {}
	unsigned short getAge(){ return Age; }
	unsigned short getHeight() { return Height; }
	bool higher(Person& p)
	{
		return Height > p.getHeight();
	}
	// 类成员函数使用运算符重载【只能有一个参数】
	bool operator>(Person& p);
};

// 不使用运算符重载
bool smaller(Person& pa, Person& pb)
{
	//return pa.Age < pb.Age;//无法使用类内私有成员
	return pa.getAge() < pb.getAge();
}

// 非类成员函数使用运算符重载【无法使用类内私有成员】但可以使用友元访问私有成员
bool operator<(Person& pa, Person& pb)
{
	//return pa.Age < pb.Age;//【友元会破坏类的封装，不推荐】
	return pa.getAge() < pb.getAge();
}
bool operator<(Person& pa, unsigned short age)
{
	return pa.getAge() < age;
}

//类成员函数使用运算符重载
bool Person::operator>(Person& p)
{
	return Height > p.Height;
}

int main()
{
	Person man(20, 180);
	Person woman(50, 150);
	if (smaller(man, woman)) std::cout << "富婆！" << std::endl;

	//运算符重载后的两种调用方法【编译器实现】
	if (operator<(man, woman)) std::cout << "富婆！" << std::endl;
	if (man < woman) std::cout << "富婆！" << std::endl;

	//类成员函数
	if (man > woman) std::cout << "更高！" << std::endl;

	system("pause");
	return 0;
}
```



### 5.1.2 运算符重载的原则和时机

> - 运算符重载的意义
> - 原则和限制
> - 正确姿势【时机】

**运算符重载的意义：**

（1）让类也支持原生的运算，比如`+-*／`

（2）提升对程序的控制权，比如重载new、delete、new[]、delete[]

运算符重载的**主要目的**是：为了让目标代码更方便使用和维护，而不是提升开发效率，重载运算符未必能提升开发效率。

**运算符重载的限制:**

1. 不能自创运算符，比如 `===`、`=<>=`，只能重载现有运算符
2. 以下运算符不能重载
	  - 对象访问运算符`.`，例如`user.hp`
	  - 作用域解析运算符`::`，例如`std::cout`
	  - 求大小的运算符`sizeof`， 例如`sizeof(int)`
	  - 条件运算符`?:`，例如`b=a>c?100:200`
3. 不能修改运算符本身的优先级、相关性
4. 在C++17后，也不能修改运算符的操作数的计算顺序【比如，a&&b，是先算a还是先算b】；在C++17前，编译器可以自由选择如何计算（未定义行为）
5. 除了`delete`/`delete[]`和`new`/`new[]`外，不能对原生数据类型【如`int`等】的其他运算符进行重载，比如把`char`类型的`+操作`定义为`-操作`【即不能把1+1定义为1-1】
6. 除了new 和 delete 以外，其他运算符的arity【运算符关联的操作数的个数或者是关联的参数】一律不能修改

**运算符重载的原则：**

- 不要改变运算符本身的意义，比如把加法重载为减法
- 不建议重载逻辑运算符`&&`、`||`【涉及短路测试】、取址运算符`&`【破坏指针特性】、逗号运算符

> [!note] 注意：重载后的逻辑运算符将不会进行短路测试
>
> 在C++17标准前，编译器可以自由决定先计算左操作数还是右操作数
>
> 在C++17后，计算的顺序规定为先计算左再计算右


### 5.1.3 运算符重载的通用语法

二元运算符的重载

```c++
// 利用全局函数    
返回类型 operator运算符(类型左操作数，类型右操作数)
// 利用类的成员函数
返回类型 operator运算符(类型右操作数)
```

一元运算符的重载

```c++
// 利用全局函数返回  
返回类型 operator运算符(类型 操作数)
// 利用类的成员函数
返回类型 operator运算符()
```

**运算符重载的时机和一般约定**

有的运算符只能重载为类的成员函数，有些运算符只能重载为全局函数，有些运算符既可以重载为类的成员函数又可以重载为全局函数。

1. 如果一个运算符既可以重载为成员函数又可以重载为全局函数，我们一般推荐重载为**类的成员函数**。
	- 因为类的成员函数可以是虚函数，单全局函数不能是虚函数；
	- 且如果这个运算符不修改对象，应该将这个成员函数限定为`const`。
2. 运算符重载的参数一般可以传递值或者引用。
	- 大部分情况下，能够传递引用就不要传递值；
	- 对于不会修改的值最好是限定为const；
	- 某些时候要善用使用右值引用&&作为参数。
3. 运算符重载的返回值一般来说可以是任何类型，但是尽量要符合运算符的原意。
	- 比如把`>`运算符返回指针类型、把`+`返回bool类型，不符合常理。



### 5.1.4 赋值运算符重载

c++编译器至少给一个类添加4个函数：

1. 默认构造函数(无参，函数体为空)
2. 默认析构函数(无参，函数体为空)
3. 默认拷贝构造函数，对属性进行值拷贝
4. 赋值运算符 `operator=`, 对属性进行值拷贝

> [!attention] 注意：如果类中有属性指向堆区，做赋值操作时也会出现**深浅拷贝问题**。

```C++
class Person
{
public:

	Person(int age)
	{
		//将年龄数据开辟到堆区
		m_Age = new int(age);
	}

	//重载赋值运算符 
	Person& operator=(Person &p)
	{
		if (m_Age != NULL)
		{
			delete m_Age;
			m_Age = NULL;
		}
		//编译器提供的代码是浅拷贝
		//m_Age = p.m_Age;

		//提供深拷贝 解决浅拷贝的问题
		m_Age = new int(*p.m_Age);

		//返回自身
		return *this;
	}


	~Person()
	{
		if (m_Age != NULL)
		{
			delete m_Age;
			m_Age = NULL;
		}
	}

	//年龄的指针
	int *m_Age;

};


void test01()
{
	Person p1(18);
	Person p2(20);
	Person p3(30);

	p3 = p2 = p1; //赋值操作
	cout << "p1的年龄为：" << *p1.m_Age << endl;//18
	cout << "p2的年龄为：" << *p2.m_Age << endl;//18
	cout << "p3的年龄为：" << *p3.m_Age << endl;//18
}

int main() {

	test01();

	//int a = 10;
	//int b = 20;
	//int c = 30;

	//c = b = a;
	//cout << "a = " << a << endl;
	//cout << "b = " << b << endl;
	//cout << "c = " << c << endl;

	system("pause");
	return 0;
}
```

**示例2：**

```c++
#include <iostream>

class Role
{
public:
	int hp;
	int mp;

	// 编译器自动提供的赋值运算符重载
	/*
	Role& operator=(const Role& role)
	{
		hp = role.hp;
		mp = role.mp;
		return *this;
	}
	*/
	
	// 也可以显式地删除，禁用编译器提供的副本构造函数
	//Role& operator=(const Role& role) = delete;
};

int main()
{
	Role x, y;
	x.hp = 10;
	y = x;
	std::cout << y.hp << std::endl;

	system("pause");
	return 0;
}
```

**注意：**

- 赋值运算符=的重载，只能作为类成员函数进行重载
- 返回值是引用&的目的，是为了解决 `z = x = y` 的问题，即y为x赋值后返回引用，再为z赋值
	-  `z = x = y` 的本质是 `z.operator=(x.operator=(y))`
	- 使用引用返回而不使用值传递，可以减少开销

### 示例3：hstring

```c++
#include <iostream>
using namespace std;

class hstring
{
private:
	char* hstr;
	unsigned short length;//不包含\0
	unsigned short mem_len;//内存长度【设置默认长度0x32】
	// 求字符串长度
	unsigned short getLength(const char* str)
	{
		unsigned short len{ 0 };
		//while(str[len++])
		while (str[len])
		{
			len++;
		}
		return len;
	}
	// 复制字符串
	void CopyStr(char* dest, const char* source);
public:
	hstring();// 默认构造
	hstring(const char* str);//带参构造函数
	hstring(unsigned short len);//带缓冲区长度构造函数
	hstring(const hstring& str); //副本构造函数|委托构造
	void setStr(const char* str);//动态改变内容
	hstring& operator=(const hstring& str);//重载=
	//hstring& operator=(const char* str);//重载=：参数是字符串
	// 【写了就调用上面这个；不写此函数时，会调用带参构造函数，生成一个临时右值hstring实例，再调用第一个=重载函数】
	hstring& operator=(const int& value);
	hstring& operator=(const long long& value);
	//hstring& operator=(const float& value);//现有知识无法完成
	hstring& operator<<(const hstring& str);//实现链式编程的字符串加法
	bool ResetMemory(unsigned short);//重置缓冲区大小
	unsigned short GetMemoryLength();//获取占用内存大小
	unsigned short GetLength();//获取字符串长度


	char* show() const
	{
		return hstr;
	}
	// 析构函数：释放堆区空间
	~hstring()
	{
		delete[] hstr;
	}
};

//全局函数重载>><<
ostream& operator<<(ostream& out, const hstring& str)
{
	out << str.show();
	return out;
}
istream& operator>>(istream& cin, hstring& str)
{
	char* buffer = new char[0x1ff];
	cin >> buffer;
	str = buffer;
	return cin;
}

int main()
{
	hstring str1;
	cout << str1.show() << endl;

	//190字节 需重新分配内存
	hstring str2("你好！地球人！啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊");
	cout << strlen(str2.show()) << endl;// 18
	cout << str2.show() << endl;// 除了14字节的7个字符，还有乱码

	hstring str3(str2);//等价于hstring str4 = str3;//调用副本构造函数
	cout << str3.show() << endl;

	str3.setStr("你好！");
	cout << str3.show() << endl;

	str3 = str2;// 当实例被创建之后，才是调用赋值运算符重载【注意：易混淆】【注意str3=str3;的易错】
	cout << str3.show() << endl;

	// 是否再需要重载一次赋值运算符？不必
	str3 = "我爱西加加！我爱西加加！我爱西加加！我爱西加加！我爱西加加！我爱西加加！";// 当实例被创建之后，才是调用赋值运算符重载
	cout << str3.show() << endl;

	str3 = -4423;
	cout << str3.show() << endl;
	str3 = (long long)9442323111112221;
	cout << str3.show() << endl;

	//重载<<
	str3 << hstring("我") << hstring("来");
	cout << str3 << endl;
	//重载<<
	cin >> str3;
	cout << str3 << endl;
	system("pause");

	return 0;
}


void hstring::CopyStr(char* dest, const char* source)
{
	length = getLength(source);
	if (length + 1 > mem_len)
	{
		mem_len = length + 1;
		//dest = new char[mem_len];//曾写的bug代码
		delete[] hstr;
		hstr = new char[mem_len];
		memset(hstr, 0, mem_len);
		memcpy(hstr, source, length);
	}
	else
	{
		memset(dest, 0, mem_len);
		memcpy(dest, source, length);
	}
}

hstring::hstring()// 默认构造
{
	length = 0;//空字符串长度
	mem_len = 0x32;//50字节
	hstr = new char[mem_len] {0};
}
//带参构造函数
hstring::hstring(const char* str) :hstring()
{
	CopyStr(hstr, str);
}
//带缓冲区长度构造函数
hstring::hstring(unsigned short len)
{
	length = 0;//空字符串长度
	mem_len = len;//50字节
	hstr = new char[mem_len] {0};
}
//副本构造函数
hstring::hstring(const hstring& str) :hstring() //委托构造
{
	CopyStr(hstr, str.hstr);
}
//动态改变内容
void hstring::setStr(const char* str)
{
	CopyStr(hstr, str);
}
// 重载赋值运算符
hstring& hstring::operator=(const hstring& str)
{
	CopyStr(hstr, str.hstr);
	return *this;
}
// 重载赋值运算符:int
hstring& hstring::operator=(const int& value)
{
	memset(hstr, 0, mem_len);
	length = 0;

	int v_abs;
	char remainder, tmp;
	// 绝对值
	if (value > 0)
		v_abs = value;
	else
		v_abs = -value;
	// 转换为字符数组
	while (v_abs)
	{
		remainder = (v_abs % 10) + '0';
		if (length + 1 < mem_len)
		{
			hstr[length++] = remainder;
		}
		else
		{
			char* newhstr = new char[mem_len + 0x32];
			memset(newhstr, 0, mem_len + 0x32);
			memcpy(newhstr, hstr, mem_len);
			mem_len += 0x32;
			delete[] hstr;
			hstr = newhstr;

			hstr[length++] = remainder;
		}
		v_abs /= 10;
	}
	// 反转
	if (value < 0)
	{
		hstr[length++] = '-';
	}
	for (int i = 0; i < length / 2; i++)
	{
		tmp = hstr[i];
		//hstr[i] = hstr[length - i]; //逻辑错误
		hstr[i] = hstr[length - 1 - i];
		hstr[length - 1 - i] = tmp;
	}
	return *this;
}
// 重载赋值运算符:long long
hstring& hstring::operator=(const long long& value)
{
	memset(hstr, 0, mem_len);
	length = 0;

	long long v_abs;
	char remainder, tmp;
	// 绝对值
	if (value > 0)
		v_abs = value;
	else
		v_abs = -value;
	// 转换为字符数组
	while (v_abs)
	{
		remainder = (v_abs % 10) + '0';
		if (length + 1 < mem_len)
		{
			hstr[length++] = remainder;
		}
		else
		{
			char* newhstr = new char[mem_len + 0x32];
			memset(newhstr, 0, mem_len + 0x32);
			memcpy(newhstr, hstr, mem_len);
			mem_len += 0x32;
			delete[] hstr;
			hstr = newhstr;

			hstr[length++] = remainder;
		}
		v_abs /= 10;
	}
	// 反转
	if (value < 0)
	{
		hstr[length++] = '-';
	}
	for (int i = 0; i < length / 2; i++)
	{
		tmp = hstr[i];
		hstr[i] = hstr[length - 1 - i];
		hstr[length - 1 - i] = tmp;
	}
	return *this;
}
//实现链式编程的字符串加法
hstring& hstring::operator<<(const hstring& str)
{
	unsigned short newlen = getLength(str.hstr);//不带末尾0
	if (newlen + length + 1 > mem_len)
	{

		char* newhstr = new char[newlen + length + 1];
		memset(newhstr, 0, newlen + length + 1);
		memcpy(newhstr, hstr, length);
		delete[] hstr;
		hstr = newhstr;
	}
	memcpy(hstr + length, str.hstr, newlen);
	mem_len = newlen + length + 1;
	length += newlen;
	return *this;
}
//重置缓冲区大小
bool hstring::ResetMemory(unsigned short len)
{
	if (len < mem_len)
		return false;
	char* newhstr = new char[len];
	memset(newhstr, 0, len);
	memcpy(newhstr, hstr, length);
	mem_len = len;
}
//获取占用内存大小
unsigned short hstring::GetMemoryLength()
{
	return mem_len;
}
//获取字符串长度
unsigned short hstring::GetLength()
{
	return length;
}
```

> 作业1中的bug修改：使用单步调试解决





### 5.1.5 左移右移运算符重载

- 作用：可以输出自定义数据类型
- 左移右移运算符可以重载为【类成员函数 | 全局函数】【二元运算符】

  ```shell
  #类方法
  返回类型 operator>>(类型 操作数)
  #全局函数【需要友元】
  返回类型 operator>>(类型 左操作数，类型 操作数右)
  ```

- hstring重载`<<`的例子在上一节中

重载 `cout<<` 输出特定对象

```C++
class Person {
    // 使用友元是因为：一般都会将类变量私有化
	friend ostream& operator<<(ostream& out, Person& p);

public:

	Person(int a, int b)
	{
		this->m_A = a;
		this->m_B = b;
	}

	//成员函数 实现不了  p << cout 不是我们想要的效果
	//void operator<<(Person& p){
	//}

private:
	int m_A;
	int m_B;
};

//全局函数实现左移重载
//ostream对象只能有一个：所以只能引用
ostream& operator<<(ostream& out, Person& p) {
	out << "a:" << p.m_A << " b:" << p.m_B;
	return out;
}

int main() {

	Person p1(10, 20);
	cout << p1 << "hello world" << endl; //链式编程

	system("pause");
	return 0;
}
```

> 总结1：重载左移运算符配合友元可以实现输出自定义数据类型
>
> 总结2：若要使用链式编程，如`endl` 换行，需要让运算符重载函数返回输出流的引用



### 5.1.6 下标运算符重载

- 重载`[]`
- 实现只读`[]`重载

注意：

- 下标运算符只能重载为类的方法：`返回类型 operator[](类型 操作数)`
- 示例：访问 `hstring` `str` 的特定位置的字符，如 `str[2]`【见 5.1.3 示例3】

```C++
#include <iostream>
using namespace std;

class hstring
{
public:
	inline static char nochar = -1;//使用c++17语法【解决越界标志】【也可以直接用#define实现】
private:
	char* hstr;
	unsigned short length;//不包含\0
	unsigned short mem_len;//内存长度【设置默认长度0x32】
	
	unsigned short getLength(const char* str);// 求字符串长度
	void CopyStr(char* dest, const char* source);// 复制字符串
public:
	hstring();// 默认构造
	hstring(const char* str);//带参构造函数
	const char& operator[](const unsigned short index) const;//重载下标运算符【如果不返回引用，即返回右值，则不能被修改】

	// 析构函数：释放堆区空间
	~hstring()
	{
		delete[] hstr;
	}
};

int main()
{
	hstring str3("1234");
	//重载[]
	//str3[1] = '1';//1【不支持中文】【不建议支持该功能，不安全 ：可以限定返回值为const】
	cout << str3[1] << endl;//11
	if (str3[10] == hstring::nochar)
		cout << "越界！" << endl;

	system("pause");

	return 0;
}


// 求字符串长度
unsigned short hstring::getLength(const char* str)
{
    unsigned short len{ 0 };
    //while(str[len++])
    while (str[len])
    {
        len++;
    }
    return len;
}
void hstring::CopyStr(char* dest, const char* source)
{
	length = getLength(source);
	if (length + 1 > mem_len)
	{
		mem_len = length + 1;
		//dest = new char[mem_len];//曾写的bug代码
		delete[] hstr;
		hstr = new char[mem_len];
		memset(hstr, 0, mem_len);
		memcpy(hstr, source, length);
	}
	else
	{
		memset(dest, 0, mem_len);
		memcpy(dest, source, length);
	}
}
hstring::hstring()// 默认构造
{
	length = 0;//空字符串长度
	mem_len = 0x32;//50字节
	hstr = new char[mem_len] {0};
}
//带参构造函数
hstring::hstring(const char* str) :hstring()
{
	CopyStr(hstr, str);
}
//重载下标运算符
const char& hstring::operator[](const unsigned short index) const
{
	if (index < length - 1)
		return hstr[index];
	return -1;//【一般使用#define来使代码易于阅读】
}
```





### 5.1.7 函数调用运算符重载

* 函数调用运算符 `()`  也可以重载【`{}`不可用重载】
* 只能重载为类成员函数
* 由于重载后使用的方式非常像函数的调用，因此称为**仿函数**【仿函数没有固定写法，非常灵活】
	* 重载称为`functor`函数对象
	* 不限制参数个数
	* 可以拥有默认实参

**示例1：**

```C++
class MyPrint
{
public:
	void operator()(string text)
	{
		cout << text << endl;
	}

};
void test01()
{
	//重载的（）操作符 也称为仿函数
	MyPrint myFunc;
	myFunc("hello world");
}


class MyAdd
{
public:
	int operator()(int v1, int v2)
	{
		return v1 + v2;
	}
};

void test02()
{
	MyAdd add;
	int ret = add(10, 10);
	cout << "ret = " << ret << endl;

	//匿名对象调用  
	cout << "MyAdd()(100,100) = " << MyAdd()(100, 100) << endl;
}

int main() {

	test01();
	test02();

	system("pause");
	return 0;
}
```

**示例2：hstring截取字符串**

```c++
#include <iostream>
using namespace std;

class hstring
{
private:
	char* hstr;
	unsigned short length;//不包含\0
	unsigned short mem_len;//内存长度【设置默认长度0x32】

	unsigned short getLength(const char* str);// 求字符串长度
	void CopyStr(char* dest, const char* source);// 复制字符串

public:
	hstring();// 默认构造
	hstring(const char* str);//带参构造函数
	hstring operator()(const unsigned short start, const unsigned end) const;//重载函数调用运算符()【闭区间】

	char* show()const { return hstr; }
	// 析构函数：释放堆区空间
	~hstring()
	{
		delete[] hstr;
	}
};

//全局函数重载>>
ostream& operator<<(ostream& out, const hstring& str)
{
	out << str.show();
	return out;
}
//全局函数重载>>【右值作为参数】
ostream& operator<<(ostream& out, const hstring&& str)
{
	out << str.show();
	return out;
}


int main()
{
	hstring str("123456789");
	cout << str(2, 3).show() << endl;
	cout << str(2, 3) << endl;// 此处可能出错【原因：重载的<<运算符需要的参数是一个hstring&引用，而此处是一个hstring】
    //解决办法1：【不建议，因为引用节约内存】修改<<运算符重载的参数类型
    //解决办法2：【因为函数调用重载后，返回的是一个没有固定内存地址的hstirng，故不能作为引用传入】修改为右值传入
	
    system("pause");
	return 0;
}


// 求字符串长度
unsigned short hstring::getLength(const char* str)
{
	unsigned short len{ 0 };
	//while(str[len++])
	while (str[len])
	{
		len++;
	}
	return len;
}
//复制字符串
void hstring::CopyStr(char* dest, const char* source)
{
	length = getLength(source);
	if (length + 1 > mem_len)
	{
		mem_len = length + 1;
		//dest = new char[mem_len];//曾写的bug代码
		delete[] hstr;
		hstr = new char[mem_len];
		memset(hstr, 0, mem_len);
		memcpy(hstr, source, length);
	}
	else
	{
		memset(dest, 0, mem_len);
		memcpy(dest, source, length);
	}
}
hstring::hstring()// 默认构造
{
	length = 0;//空字符串长度
	mem_len = 0x32;//50字节
	hstr = new char[mem_len] {0};
}
//带参构造函数
hstring::hstring(const char* str) :hstring()
{
	CopyStr(hstr, str);
}
//重载函数调用运算符()【闭区间】
hstring hstring::operator()(const unsigned short start, const unsigned end) const
{
	if (start<0 || start>length - 1 || end<0 || start>end) {
		// end>length默认只返回最大长度
		cout << "参数不合法";
		return hstring("");
	}
	unsigned short newlen;
	if (end > length - 1)
		newlen = length - start;
	else
		newlen = end - start + 1;
	char* newhstr = new char[newlen + 1];
	memset(newhstr, 0, newlen + 1);
	memcpy(newhstr, hstr + start, newlen);
	return hstring(newhstr);
}
```





### 5.1.8 加号运算符重载

作用：实现两个自定义数据类型相加的运算【同样都是二元算数运算符，适用于 `+-*/`】

- 可以重载为类成员函数，也可以重载为全局函数

```C++
class Person {
public:
	Person() {};
	Person(int a, int b)
	{
		this->m_A = a;
		this->m_B = b;
	}
	//成员函数实现 + 号运算符重载
	Person operator+(const Person& p) {
		Person temp;
		temp.m_A = this->m_A + p.m_A;
		temp.m_B = this->m_B + p.m_B;
		return temp;
	}


public:
	int m_A;
	int m_B;
};

//全局函数实现 + 号运算符重载
// 调用方法：Person p3 = operator+(p1, p2) 
// 或 Person p3 = p1+p2
//Person operator+(const Person& p1, const Person& p2) {
//	Person temp(0, 0);
//	temp.m_A = p1.m_A + p2.m_A;
//	temp.m_B = p1.m_B + p2.m_B;
//	return temp;
//}

//运算符重载 可以发生函数重载 【复用函数名】
Person operator+(const Person& p2, int val)  
{
	Person temp;
	temp.m_A = p2.m_A + val;
	temp.m_B = p2.m_B + val;
	return temp;
}

void test() {

	Person p1(10, 10);
	Person p2(20, 20);

	//成员函数方式
	Person p3 = p2 + p1;  //相当于 p2.operaor+(p1)
	cout << "mA:" << p3.m_A << " mB:" << p3.m_B << endl;

	Person p4 = p3 + 10; //相当于 operator+(p3,10)
	cout << "mA:" << p4.m_A << " mB:" << p4.m_B << endl;
}

int main() {

	test();

	system("pause");
	return 0;
}
```



### 5.1.9 关系运算符重载

**作用：** 重载关系运算符，可以让两个自定义类型对象进行对比操作

```C++
class Person
{
public:
	Person(string name, int age)
	{
		this->m_Name = name;
		this->m_Age = age;
	};

	bool operator==(Person & p)
	{
		if (this->m_Name == p.m_Name && this->m_Age == p.m_Age)
		{
			return true;
		}
		else
		{
			return false;
		}
	}

	bool operator!=(Person & p)
	{
		if (this->m_Name == p.m_Name && this->m_Age == p.m_Age)
		{
			return false;
		}
		else
		{
			return true;
		}
	}

	string m_Name;
	int m_Age;
};

void test01()
{
	//int a = 0;
	//int b = 0;

	Person a("孙悟空", 18);
	Person b("孙悟空", 18);

	if (a == b)
	{
		cout << "a和b相等" << endl;
	}
	else
	{
		cout << "a和b不相等" << endl;
	}

	if (a != b)
	{
		cout << "a和b不相等" << endl;
	}
	else
	{
		cout << "a和b相等" << endl;
	}
}


int main() {

	test01();
	system("pause");
	return 0;
}
```



<br>

## 5.2 运算符重载进阶

### 5.2.1 重载类型转换运算符（一）

- 实现类型转换运算符重载
- 解决类型转换运算符的多义性问题
- 类型转换与bool表达式的问题

注意：
- 类型转换运算符只能重载为类的成员函数
- 类型转换运算符，不能显式指定返回类型，但须有返回值【其返回值由类型转换的类型决定，即不能指定返回值】
- 语法：`operator 类型() const;`

> 代码见 `hstring`





### 5.2.2 重载类型转换运算符（二）

解决隐式类型转换带来的**多义性问题**：在类型转换重载函数前加 `explicit` 关键字可以限制该函数禁止适用隐式转换【C++11】

```c++
#include <iostream>
using namespace std;

class T
{
public:
	T(int val) {}
	explicit operator int() { return 1; }
	int operator+(T x) { return 2; }
public:
	int value;
};


int main()
{
	T t1{ 100 }, t2{ 200 };
	//int x = t1 + 100;//错误：有多个运算符 "+" 与这些操作数匹配
	//此处有两种可能：①t1隐式转为int，得到101 ②100被构造为临时T实例，调用+重载得到2 【即存在歧义】
	int x = t1 + 100;
	cout << x << endl;// 2

	x = int(t1)+100;
	cout << x << endl; // 101

	system("pause");
	return 0;
}
```



### 5.2.3 重载`bool`类型还是`void*`？

基础示例 —— 自定义智能指针类时，希望像原生指针一样用`if(p)`判断是否为空，这需要重载**类型转换运算符**：

```c++
// 简化的智能指针类 
template<class T> 
class SmartPtr { 
private: 
	T* _ptr; 
public: 
	SmartPtr(T* ptr = nullptr) : _ptr(ptr) {} 

	// 方案1：重载bool类型转换 
	operator bool() const { 
		return _ptr != nullptr; 
	} 
	
	// 方案2：重载void*类型转换 
	// operator void*() const { 
		// return _ptr; // 非空返回指针地址，空返回nullptr 
	// } 
}; 
// 期望的使用方式：像原生指针一样判断 
int main() { 
	SmartPtr<int> p1(new int(10)); 
	SmartPtr<int> p2(nullptr); 
	if (p1) 
		cout << "p1非空" << endl; // 期望输出 
	if (!p2) 
		cout << "p2为空" << endl; // 期望输出 
	return 0; 
}
```

⚠️两种重载都能实现 “空 / 非空判断”，但`bool`重载存在致命的**隐式转换风险**，这也是为什么 C++ 实践中优先选`void*`的核心原因。

`bool`是**算术类型**，重载`operator bool()`后，类对象会被隐式转换为`bool`，进而参与各种算术 / 比较运算，导致不符合预期的结果。

**示例：bool 重载的 “滥用” 场景**

```cpp
// 延续上面的SmartPtr类（重载operator bool()）
int main() {
    SmartPtr<int> p(new int(10));
    
    // 1. 算术运算（完全不符合预期，但编译通过）
    int a = p + 10; // bool(true)被提升为int(1)，结果为11
    cout << a << endl; // 输出11
    
    // 2. 比较运算（无意义，但编译通过）
    if (p == 1) cout << "意外的比较" << endl; // bool(true)==1 → true，输出
    
    // 3. 位运算（无意义，但编译通过）
    SmartPtr<int> p2(new int(20));
    if (p & p2) cout << "意外的位运算" << endl; // true&true → true，输出
    
    return 0;
}
```

**核心原因**：C++ 的隐式类型转换规则中，`bool`可以被提升为`int`（`true→1`，`false→0`），因此重载`operator bool()`的类对象会被无差别参与所有支持`bool/int`的运算，破坏了类的封装性，也违背了 “仅用于空 / 非空判断” 的初衷。

**为了解决`bool`重载的问题**，C++11 引入了**explicit 关键字**修饰类型转换运算符，限制隐式转换：

```cpp
// C++11+：explicit修饰bool转换
explicit operator bool() const {
    return _ptr != nullptr;
}
```

此时上面的`p + 10`、`p == 1`会编译报错，但仍有两个小问题：

- 兼容性：C++11 之前不支持`explicit`修饰类型转换；
- 语义瑕疵：`bool`本质是 “逻辑值”，而指针的 “空 / 非空” 是 “地址属性”，用`void*`更贴合指针的语义。

### 练习：hstirng

```c++
#include <iostream>
using namespace std;

class hstring
{
public:
	inline static char nochar = -1;//使用c++17语法【解决越界标志】【也可以直接用#define实现】
private:
	char* hstr;
	unsigned short length;//不包含\0
	unsigned short mem_len;//内存长度【设置默认长度0x32】

	unsigned short getLength(const char* str);// 求字符串长度
	void CopyStr(char* dest, const char* source);// 复制字符串
public:
	hstring();// 默认构造
	hstring(const char* str);//带参构造函数
	hstring(unsigned short len);//带缓冲区长度构造函数
	hstring(const hstring& str); //副本构造函数|委托构造
	void setStr(const char* str);//动态改变内容
	hstring& operator=(const hstring& str);//重载=
	//hstring& operator=(const char* str);//重载=：参数是字符串
	// 【写了就调用上面这个；不写此函数时，会调用带参构造函数，生成一个临时右值hstring实例，再调用第一个=重载函数】
	hstring& operator=(const int& value);
	hstring& operator=(const long long& value);
	//hstring& operator=(const float& value);//现有知识无法完成

	hstring& operator<<(const hstring& str);//实现链式编程的字符串加法
	hstring& operator+(const hstring& str);//实现链式编程的字符串加法
	hstring& operator+(const char* str);//实现链式编程的字符串加法
	hstring& operator+(const int value);//实现链式编程的字符串加法【参数为int】

	bool ResetMemory(unsigned short);//重置缓冲区大小
	unsigned short GetMemoryLength();//获取占用内存大小
	unsigned short GetLength();//获取字符串长度

	const char& operator[](const unsigned short index) const;//重载下标运算符【如果不返回引用，即返回右值，则不能被修改】
	hstring operator()(const unsigned short start, const unsigned end) const;//重载函数调用运算符()【闭区间】
	operator int()const;//重载类型转换运算符
	operator void* ();//重载void*用于判断是否为空【判断指针是否为空，推荐重载void*】
	operator bool ();//重载bool用于判断是否为空【不支持nullptr，但可用重载实现】

	char* show() const
	{
		return hstr;
	}
	// 析构函数：释放堆区空间
	~hstring()
	{
		delete[] hstr;
	}
};

//全局函数重载>><<
ostream& operator<<(ostream& out, const hstring& str)
{
	out << str.show();
	return out;
}
istream& operator>>(istream& cin, hstring& str)
{
	char* buffer = new char[0x1ff];
	cin >> buffer;
	str = buffer;
	return cin;
}

int main()
{
	hstring str1;
	cout << str1.show() << endl;

	//190字节 需重新分配内存
	hstring str2("你好！地球人！啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊");
	cout << strlen(str2.show()) << endl;// 18
	cout << str2.show() << endl;// 除了14字节的7个字符，还有乱码

	hstring str3(str2);//等价于hstring str4 = str3;//调用副本构造函数
	cout << str3.show() << endl;

	str3.setStr("你好！");
	cout << str3.show() << endl;

	str3 = str2;// 当实例被创建之后，才是调用赋值运算符重载【注意：易混淆】【注意str3=str3;的易错】
	cout << str3.show() << endl;

	// 是否再需要重载一次赋值运算符？不必
	str3 = "我爱西加加！我爱西加加！我爱西加加！我爱西加加！我爱西加加！我爱西加加！";// 当实例被创建之后，才是调用赋值运算符重载
	cout << str3.show() << endl;

	str3 = -4423;
	cout << str3.show() << endl;
	str3 = (long long)9442323111112221;
	cout << str3.show() << endl;

	//重载<<
	str3 << hstring("我") << hstring("来") + "了";
	cout << str3 << endl;
	//重载<<
	cin >> str3;
	cout << str3 << endl;

	//重载[]
	cout << str3[1] << endl;//11
	if (str3[10] == hstring::nochar)
		cout << "越界！" << endl;

	//重载()
	hstring str4("123456789");
	cout << str4(2, 3).show() << endl;
	cout << str4(2, 3) << endl;

	//重载类型转换运算符int()
	hstring str5("1234");
	int x = int(str5);
	str5 = "-12345";
	int y = int(str5);
	str5 = "sss";
	int z = int(str5);
	cout << x << ',' << y << ',' << z << endl;

	//重载+
	hstring str6;
	cout << str6 + 123 << endl;
	str6 = str6 + 123;// 出错：此处为自己给自己赋值的情况，结果造成字符串内存丢失【调用=重载出错:判断是否为本地址】
	cout << str6<< endl;
	//cout << str6.GetLength()<< "," <<str6.GetMemoryLength()<< endl;
	str6 = str6 + (-123);
	cout << str6 << endl;
	

	//判断是否为空字符串【即指针是否为空：重载void*】
	hstring str7("s");
	if (str7)
		cout << "空字符串！" << endl;
	else
		cout << "非空字符串！" << endl;

	system("pause");

	return 0;
}

unsigned short hstring::getLength(const char* str)
{
	unsigned short len{ 0 };
	//while(str[len++])
	while (str[len])
	{
		len++;
	}
	return len;
}
void hstring::CopyStr(char* dest, const char* source)
{
	length = getLength(source);
	if (length + 1 > mem_len)
	{
		mem_len = length + 1;
		//dest = new char[mem_len];//曾写的bug代码
		delete[] hstr;
		hstr = new char[mem_len];
		memset(hstr, 0, mem_len);
		memcpy(hstr, source, length);
	}
	else
	{
		memset(dest, 0, mem_len);
		memcpy(dest, source, length);
	}
}

hstring::hstring()// 默认构造
{
	length = 0;//空字符串长度
	mem_len = 0x32;//50字节
	hstr = new char[mem_len] {0};
}
//带参构造函数
hstring::hstring(const char* str) :hstring()
{
	CopyStr(hstr, str);
}
//带缓冲区长度构造函数
hstring::hstring(unsigned short len)
{
	length = 0;//空字符串长度
	mem_len = len;//50字节
	hstr = new char[mem_len] {0};
}
//副本构造函数
hstring::hstring(const hstring& str) :hstring() //委托构造
{
	CopyStr(hstr, str.hstr);
}
//动态改变内容
void hstring::setStr(const char* str)
{
	CopyStr(hstr, str);
}
// 重载赋值运算符
hstring& hstring::operator=(const hstring& str)
{
	if(&str != this)
		CopyStr(hstr, str.hstr);
	return *this;
}
// 重载赋值运算符:参数为int
hstring& hstring::operator=(const int& value)
{
	memset(hstr, 0, mem_len);
	length = 0;

	int v_abs;
	char remainder, tmp;
	// 绝对值
	if (value > 0)
		v_abs = value;
	else
		v_abs = -value;
	// 转换为字符数组
	while (v_abs)
	{
		remainder = (v_abs % 10) + '0';
		if (length + 1 < mem_len)
		{
			hstr[length++] = remainder;
		}
		else
		{
			char* newhstr = new char[mem_len + 0x32];
			memset(newhstr, 0, mem_len + 0x32);
			memcpy(newhstr, hstr, mem_len);
			mem_len += 0x32;
			delete[] hstr;
			hstr = newhstr;

			hstr[length++] = remainder;
		}
		v_abs /= 10;
	}
	// 反转
	if (value < 0)
	{
		hstr[length++] = '-';
	}
	for (int i = 0; i < length / 2; i++)
	{
		tmp = hstr[i];
		//hstr[i] = hstr[length - i]; //逻辑错误
		hstr[i] = hstr[length - 1 - i];
		hstr[length - 1 - i] = tmp;
	}
	return *this;
}
// 重载赋值运算符:long long
hstring& hstring::operator=(const long long& value)
{
	memset(hstr, 0, mem_len);
	length = 0;

	long long v_abs;
	char remainder, tmp;
	// 绝对值
	if (value > 0)
		v_abs = value;
	else
		v_abs = -value;
	// 转换为字符数组
	while (v_abs)
	{
		remainder = (v_abs % 10) + '0';
		if (length + 1 < mem_len)
		{
			hstr[length++] = remainder;
		}
		else
		{
			char* newhstr = new char[mem_len + 0x32];
			memset(newhstr, 0, mem_len + 0x32);
			memcpy(newhstr, hstr, mem_len);
			mem_len += 0x32;
			delete[] hstr;
			hstr = newhstr;

			hstr[length++] = remainder;
		}
		v_abs /= 10;
	}
	// 反转
	if (value < 0)
	{
		hstr[length++] = '-';
	}
	for (int i = 0; i < length / 2; i++)
	{
		tmp = hstr[i];
		hstr[i] = hstr[length - 1 - i];
		hstr[length - 1 - i] = tmp;
	}
	return *this;
}
//实现链式编程的字符串加法
hstring& hstring::operator<<(const hstring& str)
{
	unsigned short newlen = getLength(str.hstr);//不带末尾0
	if (newlen + length + 1 > mem_len)
	{

		char* newhstr = new char[newlen + length + 1];
		memset(newhstr, 0, newlen + length + 1);
		memcpy(newhstr, hstr, length);
		delete[] hstr;
		hstr = newhstr;
	}
	memcpy(hstr + length, str.hstr, newlen);
	mem_len = newlen + length + 1;
	length += newlen;
	return *this;
}
//实现链式编程的字符串加法
hstring& hstring::operator+(const hstring& str)
{
	*this << str;
	return *this;
}
//实现链式编程的字符串加法
hstring& hstring::operator+(const char* str)
{
	*this << hstring(str);
	return *this;
}
//实现链式编程的字符串加法【参数为int】
hstring& hstring::operator+(const int value)
{
	char buffer[0x20]{ 0 };//缓冲区 -2147483648到2147483647
	unsigned short max_index{ 0x1f };
	unsigned short index{ max_index };
	unsigned short len{ 0 };
	unsigned short tmp_memsize{ 0 };

	bool isPositive = value >= 0;
	int value_abs = value * (isPositive * 2 - 1);//绝对值

	while (value_abs)
	{
		buffer[index--] = value_abs % 10 +48;
		value_abs /= 10;
	}
	if (!isPositive) 
		buffer[index--] = '-';
	len = max_index - index;
	tmp_memsize = length + len + 1;

	if (length + len + 1 > mem_len)
	{
		char* old_hstr = hstr;
		hstr = new char[tmp_memsize];
		memset(hstr, 0, tmp_memsize);
		memcpy(hstr, old_hstr, length);
		delete[] old_hstr;
	}
	memcpy(hstr + length, buffer+index+1, len);
	
	length += len;
	mem_len = tmp_memsize;
	cout << hstr << ',' << length << "," << mem_len << endl;
	return *this;
}

//重置缓冲区大小
bool hstring::ResetMemory(unsigned short len)
{
	if (len < mem_len)
		return false;
	char* newhstr = new char[len];
	memset(newhstr, 0, len);
	memcpy(newhstr, hstr, length);
	mem_len = len;
}
//获取占用内存大小
unsigned short hstring::GetMemoryLength()
{
	return mem_len;
}
//获取字符串长度
unsigned short hstring::GetLength()
{
	return length;
}
//重载下标运算符
const char& hstring::operator[](const unsigned short index) const
{
	if (index < length - 1)
		return hstr[index];
	return -1;//【一般使用#define来使代码易于阅读】
}
//重载函数调用运算符()【闭区间】
hstring hstring::operator()(const unsigned short start, const unsigned end) const
{
	if (start<0 || start>length - 1 || end<0 || start>end) {
		// end>length默认只返回最大长度
		cout << "参数不合法";
		return hstring("");
	}
	unsigned short newlen;
	if (end > length - 1)
		newlen = length - start;
	else
		newlen = end - start + 1;
	char* newhstr = new char[newlen + 1];
	memset(newhstr, 0, newlen + 1);
	memcpy(newhstr, hstr + start, newlen);
	return hstring(newhstr);
}
//重载类型转换运算符
hstring::operator int()const
{
	// 需要安全检查
	//从后往前
	/*
	int value{ 0 }, multiple{ 1 };
	for (int i = length - 1; i > 0; i--)
	{
		if (i != length - 1)
			multiple *= 10;
		value = value + (hstr[i] - '0') * multiple;
	}
	if (hstr[0] == '-')
		return  -value;
	if (hstr[0] <= '9' && hstr[0]>='0')
		return  value + (hstr[0] - '0') * 10 * multiple;
	*/
	//从前往后是另一种思路
	int value{ 0 };
	int i = hstr[0] == '-';//true=1，从1开始
	while (hstr[i] <= '9' && hstr[i] >= '0')
	{
		value = value * 10 + (hstr[i++] - '0');
	}
	value = value * ((hstr[0] != '-') * 2 - 1);
	return value;
}

hstring::operator void* ()
{
	return hstr;//仅演示，实际不能直接去暴露，不安全
}

hstring::operator bool()
{
	return hstr != nullptr;//std::nullptr_t
}
```



### 5.2.3 项目练习：防止游戏数据被修改

```c++
#include <iostream>
using namespace std;

int dimonds = 2500;
 
int main()
{
	while (1)
	{
		cout << "当前钻石余额为：" << dimonds << endl;
		system("pause");
		dimonds -= 10;
	}
	return 0;
}
```

可使用 `cheat engin` 进行数据搜索、内存修改、汇编修改，极不安全。

本节的目标：设计一种加密的整型数据类型 `hint`，要求实现int的大部分功能，且防御CE。

> 思路1：将int的四个连续字节打散存放
>
> 思路2：对数值加密存储

以下是**小作业** `class hint`

```c++
#include <iostream>

class hint
{
	friend std::ostream& operator<<(std::ostream& out, const hint&);
private:
	char* mem[4];
private:
	int show() const;
public:
	hint(int value = 0);
	hint(const hint&);//副本构造
	~hint();

	hint& operator=(const hint&);
	hint& operator=(const int&);
	hint& operator-(const hint&);
	hint& operator-(const int&);
	hint& operator+(const hint&);
	hint& operator+(const int&);
	operator int() const;// 重载之后，可以不用重载+-等
	hint& operator++();//前置++【在本身上操作，返回本身即可，无需值传递】
	const hint operator++(int);//后置++【需要返回一个旧值的新副本】
	//此处加const后，operator int()也应该加const
};


std::ostream& operator<<(std::ostream& out, const hint&);//重载cout<<输出
std::istream& operator>>(std::istream& in, hint&);//重载cin>>输出
hint& operator--(hint& val);//全局重载前置--
hint operator--(hint& val,int);//全局重载后置--

int main()
{
	hint dimonds = 1000;
	hint hp = dimonds;//副本构造函数函数
	std::cout << hp << std::endl;//全局重载cout<<输出
	dimonds = 3000;//重载=
	hp = dimonds;//重载=
	std::cout << hp << std::endl;

	std::cin >> hp;
	hint mp = dimonds - hp + 100;//重载+-
	std::cout << hp << "," << mp << std::endl;

	std::cout << ++hp+1  << std::endl;
	hp = 5 + hp++;//此处需要 opeartor int()加const
	std::cout << hp << std::endl;
	//hp++++;//使用const限制++次数

	//int x = dimonds;

	system("pause");
	return 0;
}


// 复原
int hint::show()const
{
	int value;
	char* write = (char*)&value;
	write[0] = mem[2][0];
	write[1] = mem[1][0];
	write[2] = mem[3][0];
	write[3] = mem[0][0];

	return value;
}

//此处适用思路1：四字节打散存放
hint::hint(int value)
{
	// 这样的连续IO极耗时，故更好的选择是根据程序中使用的hint次数，预分配好mem空间
	mem[0] = new char;
	mem[1] = new char;
	mem[2] = new char;
	mem[3] = new char;

	char* read = (char*)&value;//取value的64位地址8字节,赋值给char指针read，该指针指向一个字节空间
	// 打乱存储，恢复时逆向恢复
	mem[0][0] = read[3];//mem[0]是指针，mem[0][0]是左值变量
	//mem[0][0] = read[3]^0x12;//低字节易被搜索，可以异或一个值
	mem[1][0] = read[1];
	mem[2][0] = read[0];
	mem[3][0] = read[2];
}

hint::hint(const hint& hobj)
{
	mem[0] = new char;
	mem[1] = new char;
	mem[2] = new char;
	mem[3] = new char;

	mem[0][0] = hobj.mem[0][0];
	mem[1][0] = hobj.mem[1][0];
	mem[2][0] = hobj.mem[2][0];
	mem[3][0] = hobj.mem[3][0];
}
hint::~hint()
{
	delete mem[0];
	delete mem[1];
	delete mem[2];
	delete mem[3];
}

hint& hint::operator=(const hint& hobj)
{
	mem[0][0] = hobj.mem[0][0];
	mem[1][0] = hobj.mem[1][0];
	mem[2][0] = hobj.mem[2][0];
	mem[3][0] = hobj.mem[3][0];
	return *this;
}

hint& hint::operator=(const int& value)
{

	char* read = (char*)&value;

	mem[0][0] = read[3];
	mem[1][0] = read[1];
	mem[2][0] = read[0];
	mem[3][0] = read[2];
	return *this;
}

hint& hint::operator-(const hint& hobj)
{
	int value = this->show() - hobj.show();

	char* read = (char*)&value;
	mem[0][0] = read[3];
	mem[1][0] = read[1];
	mem[2][0] = read[0];
	mem[3][0] = read[2];
	return *this;
}

hint& hint::operator-(const int& value)
{
	int val = this->show() - value;

	char* read = (char*)&val;
	mem[0][0] = read[3];
	mem[1][0] = read[1];
	mem[2][0] = read[0];
	mem[3][0] = read[2];
	return *this;
}

hint& hint::operator+(const hint& hobj)
{
	int value = this->show() + hobj.show();

	char* read = (char*)&value;
	mem[0][0] = read[3];
	mem[1][0] = read[1];
	mem[2][0] = read[0];
	mem[3][0] = read[2];
	return *this;
}

hint& hint::operator+(const int& value)
{
	int val = this->show() + value;

	char* read = (char*)&val;
	mem[0][0] = read[3];
	mem[1][0] = read[1];
	mem[2][0] = read[0];
	mem[3][0] = read[2];
	return *this;
}

hint::operator int() const 
{
	return this->show();
}

hint& hint::operator++()
{
	return *this + 1;
}

const hint hint::operator++(int)
{
	//a=b++ + c;等价于a=b+c;b=b+1
	hint temp = *this;//调用构造函数hint(hint&),这是默认的副本构造函数，如果没有写会出错
	*this = *this + 1;
	return temp; //注意：此处也会调用 副本构造函数hint(hint&)
}

std::ostream& operator<<(std::ostream& out, const hint& hobj)
{
	std::cout << hobj.show();
	return out;
}
std::istream& operator>>(std::istream& in, hint& hobj)
{
	int value;
	in >> value;
	hobj = value;
	return in;
}
hint& operator--(hint& val)
{
	// 没有this指针
	val = val - 1;
	return val;
}

hint operator--(hint& val, int)
{
	hint temp = val;//调用构造函数hint(hint&),这是默认的副本构造函数，如果没有写会出错
	val = val - 1;
	return temp;
}

```





### 5.2.4 递增运算符重载

作用： 通过重载递增运算符，实现自己的整型数据【可以重载为类方法或全局函数】

> 使用const限制后置递增的次数为1，见`hint`

```C++
class MyInteger {

	friend ostream& operator<<(ostream& out, MyInteger myint);

public:
	MyInteger() {
		m_Num = 0;
	}
	//前置++
	MyInteger& operator++() {
		//先++
		m_Num++;
		//再返回
		return *this;
	}

	//后置++[int代表占位参数，用于区分前置后置]
	MyInteger operator++(int) {
		//先返回【值：局部变量：只能返回值】
		MyInteger temp = *this; //记录当前本身的值，然后让本身的值加1，但是返回的是以前的值，达到先返回后++；
		m_Num++;
		return temp;
	}

private:
	int m_Num;
};


ostream& operator<<(ostream& out, MyInteger myint) {
	out << myint.m_Num;
	return out;
}


//前置++ 先++ 再返回
void test01() {
	MyInteger myInt;
	cout << ++myInt << endl;
	cout << myInt << endl;
}

//后置++ 先返回 再++
void test02() {

	MyInteger myInt;
	cout << myInt++ << endl;
	cout << myInt << endl;
}

int main() {

	test01();
	//test02();

	system("pause");

	return 0;
}
```

第二个例子【hint】见上一节



> 总结1： 前置递增返回引用，是为了可 **重复递增**【返回引用是保证一直对一个数据进行递增】
>
> 总结2：后置递增返回值



### 5.2.5 重载内存分配释放运算符

new 的工作原理：`Role* user = new Role();`

1. 通过new分配内存空间【支持重载】
2. 调用构造函数
3. 返回指针

delete 的工作原理：`delete user;`

1. 调用析构函数
2. 通过delete释放内存【支持重载】

对 new **重载的六种形式**：

```c++
//可重载的形式
void* operator new(size_t size);
void* operator new[](size_t size);
void* operator new(size_t size, const std::nothrow_t&) noexcept;
void* operator new[](size_t size, const std::nothrow_t&) noexcept;
//禁止重载的两种形式
void* operator new(size_t size, void* p) noexcept;// 见下例中，可以指定分配的地址
void* operator new[](size_t size, void* p) noexcept;
```

另外，该运算符**可重载为全局或类函数**【重载为全局函数不推荐，极容易产生不可恢复的错误】

**基本用途：**

- 重载内存分配释放运算符，主要用于解决游戏中内存优化的问题【俗称“卡顿"】。
- 为了方便和提高灵活性，可以重载带有额外参数的 new 和 delete 版本【须成套定义 】
- 对于 delete 来说，如果同时定义了带内存大小的和不带内存大小的函数，那么默认之后调用不带内存大小参数的 delete 函数



> 下面以子弹为例

```c++
#include <iostream>

class blut
{
public:
	float x;//三位坐标
	float y;
	float h;
	float damage;

	bool bUse = true;//子弹是否被使用【在new内存分配后，调用构造函数bUse才被置True】
public:
	void* operator new(size_t size);
	void operator delete(void* adr) noexcept;
	void operator delete(void* adr, size_t size) noexcept;//size为编译器自动填充

	void* operator new(size_t size, const char* txt);
	void operator delete(void* adr, const char* txt) noexcept;//手动调用不了，是由异常调用

	void* operator new(size_t size, const std::nothrow_t&) noexcept = delete;
	void operator delete(void*, const std::nothrow_t&)noexcept = delete;

	~blut();//先调用析构函数，在通过delete释放内存
};

//内存池：假设最多只会出现100个子弹
char* mem_temp = new char[0x1000];
char* mem = new char[1000 * sizeof(blut)] {};//初始化为0，bUser默认为false

int main()
{
	//游戏中子弹的数量不确定
	//blut* b = new blut();
	//delete b;

	////将内存分配到mem，即指定分配的地址【这样的内存不用自己释放】
	//blut* b1 = new(mem_temp) blut[10];
	//std::cout << (void*)mem_temp << std::endl;
	//std::cout << b1 << std::endl;
	//delete[] b1;
	// 但上面的写法，①频繁地进行内存分配，导致频繁的IO操作【卡顿】
	// ②会产生大量的内存碎片【导致闪退和内存奔溃】


	//解决思路：提前分配内存空间【new默认在堆上进行内存分配】
	//作业：实现多个子弹的有序释放【最多同时1000个子弹】
	blut* shot1 = new("申请发射子弹！") blut;
	blut* shot2 = new("申请发射子弹！") blut;
	delete shot1;//调用delete
	blut* shot3 = new("申请发射子弹！") blut;
	blut* shot4 = new("申请发射子弹！") blut;

	std::cout << shot1 << std::endl;//00B75B4C
	std::cout << shot2 << std::endl;//00B75B60
	std::cout << shot3 << std::endl;//00B75B74
	std::cout << shot4 << std::endl;//00B75B88:相差20个字节，即blut的大小

	system("pause");
	return 0;
}

void* blut::operator new(size_t size)
{
	//return new blut;//死循环，导致栈溢出stack overflow
	//std::cout << size << std::endl;//size大小由 【new blut;】 自动计算
	//return ::operator new(size);//全局的new
	std::cout << "申请内存" << std::endl;
	return mem;//分配在已有空间上
}

void blut::operator delete(void* adr) noexcept
{
	//自动为static静态函数，无this，无法访问bUser
	//如何找到shot1子弹的存放位置
	//方法1：用adr地址，逐个对比找
	//方法2：使用析构函数去做【有意思！】
	std::cout << "释放内存" << std::endl;
}

void* blut::operator new(size_t size, const char* txt)
{
	std::cout << txt << std::endl;
	blut* bat = (blut*)mem;
	for (int i = 0; i < 1000; i++)
	{
		if (!bat[i].bUse)//可使用
		{
			bat[i].bUse = true;
			return &bat[i];
		}	
	}
}

void blut::operator delete(void* adr, const char* txt) noexcept
{
	// 用于异常调用，无法手动调用
	std::cout << "带参释放内存" << std::endl;
}

blut::~blut()
{
	bUse = false;
	//std::cout << bUse << std::endl;
}
```



**注意：**

- 一旦重载，基本上所有形式都要重载【另一种解决办法：使用delete关键字手动删除默认的内存分配运算符函数】
- 重载的内存分配函数，自动转为 static 静态函数，因此访问不了类的成员变量【本质上，new之前连内存空间都没有，也更没有this指针】【同理，重载 delete 的操作在调用析构函数之后，访问类成员变量也没有意义】



## 5.3 阶段项目：hstring

创建一个字符串操作类，实现对字符串的增删改查【所有功能的new都是要有条件的】

要求：

- 存储数据的时候使用缓冲区，使用缓冲区的目的是为了尽量减少频繁的NEW/DEL内存带来的资源损耗【**缓冲区必须要有**，new之前要加判断】
- 重载`+` 增加数据，增加数据要实现的形态： “123456789” + “abc” 得到 “123456789abc” 【最多new一次，new之前判断是否超过缓冲区，超过了才new】
- 重载`-`删除数据,增加数据要实现的形态：”123456789” - “456” 得到 “123789” 【函数中不使用new】
- 改数据 ：要求 “123456789” 34修改为 abc 得到 12abc56789 【最多new一次】
- 查 ：如`123456` 查 `34` 得到 位置 `2` 【不使用new】
- 重载 `=` 实现 int 转 hstring 字符串 【最多new一次】
- 不能使用库函数【memcpy、remove、memset可使用】

```c++
#include <iostream>

class hstring
{
private:
	char* hstr;
	unsigned short length;//真实长度|不带末尾\0
	unsigned short mem_size = 0x50;
private:
	unsigned short getStringLength(const char*);
	void CopyMem(char* dist, const char* source);
public:
	hstring();
	hstring(const char*);
	hstring(const hstring&);
	~hstring();

	hstring& operator+(const char*);
	hstring& operator-(const char*);
	hstring& operator=(const int);

	char* show();
	int find(const char*);// 查：找不到返回-1
	hstring& modify(const char* source, const char* replace);
};

int main()
{
	hstring str1("123456789");//默认构造
	str1 = str1 + "abc"; //重载+(const char*)
	hstring str2 = str1 + "abc";//重写副本构造函数
	std::cout << str2.show() << std::endl;//show函数
	std::cout << str2.find("345") << std::endl;//show函数
	str2.modify("345", "bbbbbb");//modify函数
	std::cout << str2.show() << std::endl;
	str2 = str2 - "789";//重载-
	std::cout << str2.show() << std::endl;
	str2 = -123456;//重载=
	std::cout << str2.show() << std::endl;
	system("pause");
	return 0;
}




unsigned short hstring::getStringLength(const char* str)
{
	unsigned short len = 0;
	while (str[len++]);
	return len - 1;
}
void hstring::CopyMem(char* dist, const char* source)
{
	unsigned short sourceLen = getStringLength(source);
	// 超出缓冲区大小，重新申请缓冲区
	if (sourceLen + 1 > mem_size)
	{
		delete[] hstr;
		mem_size = sourceLen + 1;
		hstr = new char[mem_size];
		memset(hstr, 0, mem_size);
		memcpy(hstr, source, sourceLen);
	}
	else
	{
		memset(dist, 0, mem_size);
		memcpy(dist, source, sourceLen);
	}
	length = sourceLen;
}

char* hstring::show() {
	return hstr;
}

hstring::hstring()
{
	hstr = new char[mem_size];
	length = 0;
	memset(hstr, 0, mem_size);
}
hstring::hstring(const char* str) :hstring()
{
	CopyMem(hstr, str);
}
hstring::hstring(const hstring& hobj) :hstring()
{
	CopyMem(hstr, hobj.hstr);
}

hstring::~hstring()
{
	delete[] hstr;
}


hstring& hstring::operator+(const char* str)
{
	unsigned short strlength = getStringLength(str);
	if (length + 1 + strlength > mem_size)
	{
		mem_size = length + 1 + strlength;
		char* temp_hstr = new char[mem_size];
		memset(temp_hstr, 0, mem_size);
		memcpy(temp_hstr, hstr, length);
		delete[] hstr;
		hstr = temp_hstr;
	}
	memcpy(hstr + length, str, strlength);
	length += strlength;
	return *this;
}
hstring& hstring::operator-(const char* str)
{
	int position = this->find(str);
	unsigned short strLength;
	if (position != -1)
	{
		strLength = getStringLength(str);
		memcpy(hstr + position, hstr + position + strLength, length - position - strLength);
		memset(hstr+length-strLength, 0, 1);
		length -= strLength;
	}
	return *this;
}
hstring& hstring::operator=(const int value)
{
	//int最多11位，无需重新分配内存
	memset(hstr, 0, mem_size);
	bool isNegative = value >= 0 ? false : true;
	int val_abs = isNegative ? -value : value;
	int len = 0;
	while (val_abs)
	{
		hstr[len++] = val_abs % 10 + '0';
		val_abs /= 10;
	}
	length = len;
	if (isNegative)
	{
		hstr[len] = '-';
		length++;
	}
	//反转
	//std::cout << hstr <<","<<length << std::endl;
	char temp;
	for (int i = 0; i < length / 2; i++) {
		temp = hstr[i];
		hstr[i] = hstr[length-1-i];
		hstr[length - 1 - i] = temp;
	}

	return *this;
}

int hstring::find(const char* str)
{
	unsigned short strlen = getStringLength(str);
	//std::cout << strlen << std::endl;
	if (length < strlen)
		return -1;
	int str_pos{ 0 }, temp_i;
	for (int i = 0; i < length - strlen + 1; i++)
	{
		temp_i = i;
		str_pos = 0;
		//最简单的字符串匹配算法
		for (str_pos; str_pos < strlen; str_pos++)
		{
			if (hstr[temp_i++] != str[str_pos])
				break;
			if (str_pos == strlen - 1)
				return i;
		}
	}
	std::cout << "NotFound!" << std::endl;
	return -1;
}

hstring& hstring::modify(const char* source, const char* replace)
{
	int position = this->find(source);
	unsigned short sourceLen, replaceLen;
	if (position != -1)
	{
		sourceLen = getStringLength(source);
		replaceLen = getStringLength(replace);
		char* temp_hstr;
		if (length + replaceLen - sourceLen > mem_size)
		{
			mem_size = length + replaceLen - sourceLen + 1;
		}
		temp_hstr = new char[mem_size];
		memset(temp_hstr, 0, mem_size);
		memcpy(temp_hstr, hstr, position);
		memcpy(temp_hstr + position, replace, replaceLen);
		memcpy(temp_hstr + position + replaceLen, hstr + position + sourceLen, length - position - sourceLen);
		delete[] hstr;
		hstr = temp_hstr;
		length = length + replaceLen - sourceLen;
	}
	return *this;
}

```

<br>

# 六 类的继承

**继承是面向对象三大特性之一**：有些类与类之间存在特殊的关系。

我们发现，定义这些类时，下级别的成员除了拥有上一级的共性，还有自己的特性。这个时候我们就可以考虑利用继承的技术，减少重复代码。

派生类中的成员，包含两大部分：一类是从基类继承过来的，一类是自己增加的成员。

从基类继承过过来的表现其共性，而新增的成员体现了其个性。



**注意：**

- 子类不能继承父类的构造函数、析构函数、重载赋值运算符【虽不能继承，但内容依然在子类中】
- `class object final{};` `final`关键字阻止类被继承【`final` 可作为变量名】



## 6.1 继承的基本语法

```c++
class A : public B;
//A 类称为子类 或 派生类
//B 类称为父类 或 基类
```

普通实现：

```C++
//Java页面
class Java 
{
public:
	void header()
	{
		cout << "首页、公开课、登录、注册...（公共头部）" << endl;
	}
	void footer()
	{
		cout << "帮助中心、交流合作、站内地图...(公共底部)" << endl;
	}
	void left()
	{
		cout << "Java,Python,C++...(公共分类列表)" << endl;
	}
	void content()
	{
		cout << "JAVA学科视频" << endl;
	}
};
//Python页面
class Python
{
public:
	void header()
	{
		cout << "首页、公开课、登录、注册...（公共头部）" << endl;
	}
	void footer()
	{
		cout << "帮助中心、交流合作、站内地图...(公共底部)" << endl;
	}
	void left()
	{
		cout << "Java,Python,C++...(公共分类列表)" << endl;
	}
	void content()
	{
		cout << "Python学科视频" << endl;
	}
};
//C++页面
class CPP 
{
public:
	void header()
	{
		cout << "首页、公开课、登录、注册...（公共头部）" << endl;
	}
	void footer()
	{
		cout << "帮助中心、交流合作、站内地图...(公共底部)" << endl;
	}
	void left()
	{
		cout << "Java,Python,C++...(公共分类列表)" << endl;
	}
	void content()
	{
		cout << "C++学科视频" << endl;
	}
};

void test01()
{
	//Java页面
	cout << "Java下载视频页面如下： " << endl;
	Java ja;
	ja.header();
	ja.footer();
	ja.left();
	ja.content();
	cout << "--------------------" << endl;

	//Python页面
	cout << "Python下载视频页面如下： " << endl;
	Python py;
	py.header();
	py.footer();
	py.left();
	py.content();
	cout << "--------------------" << endl;

	//C++页面
	cout << "C++下载视频页面如下： " << endl;
	CPP cp;
	cp.header();
	cp.footer();
	cp.left();
	cp.content();

}

int main() {

	test01();
	system("pause");
	return 0;
}
```



继承实现：

```C++
//公共页面
class BasePage
{
public:
	void header()
	{
		cout << "首页、公开课、登录、注册...（公共头部）" << endl;
	}

	void footer()
	{
		cout << "帮助中心、交流合作、站内地图...(公共底部)" << endl;
	}
	void left()
	{
		cout << "Java,Python,C++...(公共分类列表)" << endl;
	}

};

//Java页面
class Java : public BasePage
{
public:
	void content()
	{
		cout << "JAVA学科视频" << endl;
	}
};
//Python页面
class Python : public BasePage
{
public:
	void content()
	{
		cout << "Python学科视频" << endl;
	}
};
//C++页面
class CPP : public BasePage
{
public:
	void content()
	{
		cout << "C++学科视频" << endl;
	}
};

void test01()
{
	//Java页面
	cout << "Java下载视频页面如下： " << endl;
	Java ja;
	ja.header();
	ja.footer();
	ja.left();
	ja.content();
	cout << "--------------------" << endl;

	//Python页面
	cout << "Python下载视频页面如下： " << endl;
	Python py;
	py.header();
	py.footer();
	py.left();
	py.content();
	cout << "--------------------" << endl;

	//C++页面
	cout << "C++下载视频页面如下： " << endl;
	CPP cp;
	cp.header();
	cp.footer();
	cp.left();
	cp.content();


}

int main() {

	test01();
	system("pause");
	return 0;
}
```





## 6.2 继承方式

继承的语法：`class 子类 : 继承方式  父类`

**继承方式一共有三种：**

* 公共继承【原封不动地从父类类拿过来】
* 保护继承【仅限继承类内访问，本质作用是将基类的 public 成员变为 protected 成员】
* 私有继承【默认】

![](cppcore6-1.png)

**注意：**

- 可使用 `using 基类名称::基类中的成员名` 来修改继承来的成员的属性。
	- 值得注意的是，基类中的私有成员无法修改，因为无法访问，故仅可修改 public 和 potected 的成员。
	- 破坏封装，建议少用。
- 继承访问属性的好处：①更好的封装父类成员；②可以在子类作为基础进行派生类的时候提供继承控制。
- 尽量变量为 private，并提供 getter 和 setter。



**示例**

```C++
#include <iostream>

class Base
{
public:
	int m_A;
protected:
	int m_B;
private:
	int m_C;
};

//公共继承
class Son1 :public Base
{
public:
	void func()
	{
		m_A; //可访问 public权限
		m_B; //可访问 protected权限
		//m_C; //不可访问
	}
};

//保护继承
class Son2 :protected Base
{
public:
	void func()
	{
		m_A; //可访问 protected权限
		m_B; //可访问 protected权限
		//m_C; //不可访问
	}
};

//私有继承
class Son3 :private Base
{
public:
	void func()
	{
		m_A; //可访问 private权限
		m_B; //可访问 private权限
		//m_C; //不可访问
	}
};

class GrandSon3 :public Son3
{
public:
	void func()
	{
		//Son3是私有继承，所以继承Son3的属性在GrandSon3中都无法访问到
		//m_A;
		//m_B;
		//m_C;
	}
};

int main()
{
	Son1 s1;
	s1.m_A; //类外只能访问到公共权限

	Son2 s2;
	//s.m_A; //不可访问

	Son3 s3;
	//s3.m_A; //不可访问

	system("pause");
	return;
}
```





## 6.3 继承中的对象模型

**问题：** 从父类继承过来的成员，哪些属于子类对象？

**示例：**

```C++
class Base
{
public:
	int m_A;
protected:
	int m_B;
private:
	int m_C; // 私有成员只是被隐藏了，但是还是会继承下去
};

//公共继承
class Son :public Base
{
public:
	int m_D;
};

void test01()
{
    // 4？12？16？？？
	cout << "sizeof Son = " << sizeof(Son) << endl;
    // 16
}

int main() {

	test01();

	system("pause");
	return 0;
}
```



**利用工具查看：**

![](cppcore6-2.png)

打开工具窗口后，定位到当前CPP文件的盘符

然后输入： `cl /d1 reportSingleClassLayout`查看的类名   所属文件名

效果如下图：

![](cppcore6-3.png)



> 结论： 父类中私有成员也是被子类继承下去了，**只是由编译器给隐藏后访问不到**。



## 6.4 继承中构造和析构函数

### 6.4.1 派生类的构造和析构顺序

子类继承父类后，当创建子类对象，也会调用父类的构造函数。

因此，父类和子类的**构造和析构顺序**是谁先谁后？

```C++
class Base 
{
public:
	Base()
	{
		cout << "Base构造函数!" << endl;
	}
	~Base()
	{
		cout << "Base析构函数!" << endl;
	}
};

class Son : public Base
{
public:
	Son()
	{
		cout << "Son构造函数!" << endl;
	}
	~Son()
	{
		cout << "Son析构函数!" << endl;
	}

};

int main() {

	//继承中 先调用父类构造函数，再调用子类构造函数，析构顺序与构造相反
	Son s;
    // 构造：先父亲后儿子

	system("pause");
	return 0;
}
```

> [!note] 总结
> 继承中先调用父类构造函数，再调用子类构造函数【即从基类开始构造】，析构顺序与构造相反

```c++
#include <iostream>

class object
{
public:
	int x;
	int y;
	object()
	{
		std::cout << "object was created\n";
	}
	object(const object& obj)
	{
		std::cout << "object was created by copy\n";
	}
};

class mapobject :public object
{
public:
	int mapId;
	mapobject()
	{
		std::cout << "mapobject was created\n";
	}
	mapobject(const mapobject& obj)
	{
		std::cout << "mapobject was created by copy\n";
	}
	mapobject(int id) :mapId{ id }
	{
		std::cout << "mapobject was created by int\n";
	}
};

class actobject :public mapobject
{
public:
	using mapobject::mapobject;// 无论是public或private都是可以访问的，且继承了所有除父类默认构造函数以外的所有构造函数
	int damage;
	actobject() :mapobject{ 100 }, damage{ 20 }//可指定父类的构造函数
	{
		std::cout << "actobject was created\n";
	}
	actobject(const actobject& obj):mapobject{obj}//此处隐含类型转换，也算是继承的优点之一
	{
		std::cout << "actobject was created by copy\n";
	}
};

int main()
{
	actobject obj;
	std::cout << std::endl;

	actobject obj2 = obj;//只调用派生类的副本构造函数
	std::cout << std::endl;
	//且除非指定，只会调用父类的默认构造函数
	//可使用【参数列表的写法】指定父类的构造函数

	// 强制继承构造函数
	actobject obj3{ 100 };

	system("pause");
	return 0;
}
```



### 6.4.2 强制继承构造函数

语法：`using 父类::构造函数名`

```c++
class actobject :public mapobject
{
public:
    using mapobject::mapobject;
	int damage;
};
```

详细示例见上，值得注意的是：

- 无论`using`的写法，写在 `public` 或 `private` 里，都是可以访问的
- 继承了所有除父类默认构造函数以外的所有构造函数





## 6.5 继承中的同名成员问题

### 6.5.1 继承同名成员处理方式

问题：当子类与父类出现同名的成员，如何通过子类对象，访问到**子类或父类中同名的数据**呢？

* 访问子类同名成员：**直接访问即可**
* 访问父类同名成员 ：**需要加作用域**

```C++
class Base {
public:
	Base()
	{
		m_A = 100;
	}

	void func()
	{
		cout << "Base - func()调用" << endl;
	}

	void func(int a)
	{
		cout << "Base - func(int a)调用" << endl;
	}

public:
	int m_A;
};


class Son : public Base {
public:
	Son()
	{
		m_A = 200;
	}

	//当子类与父类拥有同名的成员函数，子类会隐藏父类中所有版本的同名成员函数
	//如果想访问父类中被隐藏的同名成员函数，需要加父类的作用域
	void func()
	{
		cout << "Son - func()调用" << endl;
	}
public:
	int m_A;
};

void test01()
{
	Son s;

	cout << "Son下的m_A = " << s.m_A << endl;
	cout << "Base下的m_A = " << s.Base::m_A << endl;

	s.func();
	s.Base::func();
	s.Base::func(10);
	// 如果有更多层的继承，可以s.Base::Base2::func(19);等价于s.Base::func(10);
}
int main() {

	test01();

	system("pause");
	return EXIT_SUCCESS;
}
```

总结：

1. 子类对象可以直接访问到子类中同名成员
2. 子类对象加作用域可以访问到父类同名成员
3. 当子类与父类拥有同名的成员函数，子类会隐藏父类中同名成员函数，加作用域可以访问到父类中同名函数
4. 构成重载的成员函数在继承时，可能会被覆盖，即只继承一个同名函数。【可使用`using`语法引入所有自定义函数】



### 6.5.2 继承同名静态成员处理方式

问题：继承中同名的静态成员在子类对象上如何进行访问？

**静态成员和非静态成员出现同名，处理方式一致**

- 访问子类同名成员   直接访问即可
- 访问父类同名成员   需要加作用域

```C++
class Base {
public:
	static void func()
	{
		cout << "Base - static void func()" << endl;
	}
	static void func(int a)
	{
		cout << "Base - static void func(int a)" << endl;
	}

	static int m_A;
};

int Base::m_A = 100;

class Son : public Base {
public:
	static void func()
	{
		cout << "Son - static void func()" << endl;
	}
	static int m_A;
};

int Son::m_A = 200;

//同名成员属性
void test01()
{
	//通过对象访问
	cout << "通过对象访问： " << endl;
	Son s;
	cout << "Son  下 m_A = " << s.m_A << endl;
	cout << "Base 下 m_A = " << s.Base::m_A << endl;

	//通过类名访问
	cout << "通过类名访问： " << endl;
	cout << "Son  下 m_A = " << Son::m_A << endl;
	cout << "Base 下 m_A = " << Son::Base::m_A << endl;
}

//同名成员函数
void test02()
{
	//通过对象访问
	cout << "通过对象访问： " << endl;
	Son s;
	s.func();
	s.Base::func();

	cout << "通过类名访问： " << endl;
	Son::func();
	Son::Base::func();
	//出现同名，子类会隐藏掉父类中所有同名成员函数，需要加作作用域访问
	Son::Base::func(100);
}
int main() {

	//test01();
	test02();

	system("pause");
	return 0;
}
```

> 总结：同名静态成员处理方式和非静态处理方式一样，只不过有两种访问的方式（通过对象和通过类名）





## 6.7 多继承问题

### 6.7.1 多继承

C++允许**一个类继承多个类**，但C++实际开发中不建议用多继承。

```cpp
class 子类 ：继承方式 父类1 ， 继承方式 父类2...
```

```C++
class Base1 {
public:
	Base1()
	{
		m_A = 100;
	}
public:
	int m_A;
};

class Base2 {
public:
	Base2()
	{
		m_A = 200;  //开始是m_B 不会出问题，但是改为mA就会出现不明确
	}
public:
	int m_A;
};

//语法：class 子类：继承方式 父类1 ，继承方式 父类2 
class Son : public Base2, public Base1 
{
public:
	Son()
	{
		m_C = 300;
		m_D = 400;
	}
public:
	int m_C;
	int m_D;
};

int main() {
	//多继承容易产生成员同名的情况
	//通过使用类名作用域可以区分调用哪一个基类的成员
	Son s;
    // 16
	cout << "sizeof Son = " << sizeof(s) << endl;
	cout << s.Base1::m_A << endl;
	cout << s.Base2::m_A << endl;
	system("pause");

	return 0;
}
```

> [!note] 多继承中如果父类中出现了同名情况【如果参数列表不同，那依然是同名情况】，子类使用时候要加作用域

```c++
#include <iostream>

class Wolf
{
public:
	void bite()
	{
		std::cout << "Wolf bite!\n";
	}
	void eat()
	{
		std::cout << "Wolf eat!\n";
	}
};

class Man
{
public:
	void eat()
	{
		std::cout << "Man eat!\n";
	}
};

class Wolfman :public Wolf, public Man
{
public:
	using Wolf::eat;//使用using指定
	void Change()//变身
	{
		isWolf = !isWolf;
		std::cout << "变身!\n";
	}
private:
	bool isWolf = false;
};


int main()
{
	Wolfman Jack;
	Jack.bite();
	Jack.Man::eat();
	Jack.eat();//使用using指定

	system("pause");
	return 0;
}
```





### 6.7.2 菱形继承

菱形继承：多继承导致的**重复继承问题**。

**菱形继承概念：** 两个派生类继承同一个基类，又有某个类同时继承自两个派生类。这种继承被称为菱形继承，或者钻石继承。

典型的菱形继承案例：

![](cppcore6-4.jpg)

**菱形继承问题：**

1.     羊继承了动物的数据，驼同样继承了动物的数据，当草泥马使用数据时，就会产生二义性。
2.     草泥马继承自动物的数据继承了两份，其实我们应该清楚，这份数据我们只需要一份就可以。

示例： 利用**虚继承**解决

```C++
#include <iostream>
using namespace std;
class Animal
{
public:
	int m_Age;
};

//继承前加virtual关键字后，变为虚继承
//此时公共的父类Animal称为虚基类
class Sheep : virtual public Animal {};
class Tuo : virtual public Animal {};
// 此时，以上两个类保留一个指向Animal基类的vbptr[虚基类指针]
// 其指向vbtable[虚基类表]：记录偏移量
class SheepTuo : public Sheep, public Tuo {};

void test01()
{
	SheepTuo st;
	// 需要加作用域，否则不明确
	st.Sheep::m_Age = 100;
	st.Tuo::m_Age = 200;
	// 但数据只需要一份

	cout << "st.Sheep::m_Age = " << st.Sheep::m_Age << endl; //st.Sheep::m_Age = 200
	cout << "st.Tuo::m_Age = " << st.Tuo::m_Age << endl;//st.Tuo::m_Age = 200
	cout << "st.m_Age = " << st.m_Age << endl;//st.m_Age = 200
}


int main()
{
	test01();
	system("pause");
	return 0;
}
```

![](cppcore6-5.png)

**示例2：**

```c++
#include <iostream>

class Animal
{
public:
	int x;
	int y;
};

class Wolf:public virtual Animal
{
public:
	void bite()
	{
		std::cout << "Wolf bite!\n";
	}
	void eat()
	{
		std::cout << "Wolf eat!\n";
	}
};

class Man:public virtual Animal
{
public:
	void eat()
	{
		std::cout << "Man eat!\n";
	}
};

class Wolfman :public Wolf, public Man
{
public:
	using Wolf::eat;//使用using指定
	void Change()//变身
	{
		isWolf = !isWolf;
		std::cout << "变身!\n";
	}
private:
	bool isWolf = false;
};


int main()
{
	Wolfman Jack;
	Jack.bite();
	//Jack.x = 250;//重复继承的问题【】
	Jack.Wolf::x = 250;
	std::cout << Jack.Man::x << std::endl;//-858993460//继承自人，人继承自动物
	
	// 可以使用虚基类来指出：基类在内存中只有一份
	// 加入virtual后，Jack.Man::x = 250
	system("pause");
	return 0;
}
```

**总结：**

* 菱形继承带来的主要问题是子类继承两份相同的数据，导致资源浪费以及毫无意义
* 利用虚继承可以解决菱形继承问题





## 6.8 继承的本质

查看继承的内存

```c++
#include <iostream>

class Object
{
	int data_1 = 1;
	int data_2 = 1;
public:
	int data_3 = 2;
	int data_4 = 2;
	Object()
	{
		std::cout << "Object was created!\n";
	}
	~Object()
	{
		std::cout << "Object -!\n";
	}
};

class MoveObject :public virtual Object
{
	int mdata_1 = 3;
	int mdata_2 = 3;
public:
	int mdata_3 = 4;
	int mdata_4 = 4;
	MoveObject()
	{
		std::cout << "MoveObject was created!\n";
	}
	~MoveObject()
	{
		std::cout << "MoveObject -!\n";
	}
};

class ThingObject :public  virtual Object
{
	int mdata_1 = 33;
	int mdata_2 = 33;
public:
	int mdata_3 = 44;
	int mdata_4 = 44;
	ThingObject()
	{
		std::cout << "ThingObject was created!\n";
	}
	~ThingObject()
	{
		std::cout << "ThingObject -!\n";
	}
};
class NPC :public MoveObject,public ThingObject
{
	int ndata_1 = 5;
	int ndata_2 = 5;
public:
	int ndata_3 = 6;
	int ndata_4 = 6;
	NPC()
	{
		std::cout << "NPC was created!\n";
	}
	~NPC()
	{
		std::cout << "NPC -!\n";
	}
};

int main()
{
	Object obj;
	//读内存
	int* nRead = (int*)&obj;
	std::cout << "obj内存地址：" << nRead << std::endl;
	for (int i = 0; i < sizeof(obj) / sizeof(int); i++)
	{
		std::cout << "内存地址：" << &nRead[i] << "，值：" << nRead[i] << std::endl;
	}
	std::cout << std::endl;


	MoveObject mobj;
	nRead = (int*)&mobj;
	std::cout << "obj内存地址：" << nRead << std::endl;
	for (int i = 0; i < sizeof(mobj) / sizeof(int); i++)
	{
		std::cout << "内存地址：" << &nRead[i] << "，值：" << nRead[i] << std::endl;
	}
	std::cout << std::endl;

	//多重继承
	NPC npc;
	//npc.data_3 = 2;//重名不明确问题
	nRead = (int*)&npc;
	std::cout << "obj内存地址：" << nRead << std::endl;
	for (int i = 0; i < sizeof(npc) / sizeof(int); i++)
	{
		std::cout << "内存地址：" << &nRead[i] << "，值：" << nRead[i] << std::endl;
	}
	std::cout << std::endl;

	//使用虚基类之后
	//内存分布情况为：先一个标志，然后存放MoveObject;再一个标志，然后存放ThingObject
	//然后存放NPC,最后存放Object【出现一次】
	//此处的标志：是一个指针
	
	system("pause");
	return 0;
}
```





<br>

# 七 多态

## 7.1 多态的基本概念

> [!note] 多态是C++面向对象三大特性之一

多态分为两类

* <span style="background:#FFFF00;">静态多态：函数重载【包含运算符重载】和函数模板，属于静态多态，复用函数名【静态多态的函数地址早绑定  -  编译阶段确定函数地址】</span>
* <span style="background:#FFFF00;">动态多态：派生类和虚函数实现运行时多态【动态多态的函数地址晚绑定  -  运行阶段确定函数地址】</span>

而动态多态中的派生类的多态，称为**对象多态**。分为：

- 向上转型：父类 => 子类【隐含父类或根在下方 】【意为：用子类表达父类，一般正确。如：人是动物】
- 向下转型：子类 => 父类【意为：用父类表达子类，不一定成立。如：动物是人】【用的好是大神，用不好是沙雕】

下面通过案例进行讲解多态：

```C++
class Animal
{
public:
	//Speak函数就是虚函数
	//函数前面加上virtual关键字，变成虚函数，那么编译器在编译的时候就不能确定函数调用了。
	virtual void speak()
	{
		cout << "动物在说话" << endl;
	}
};

class Cat :public Animal
{
public:
	void speak()
	{
		cout << "小猫在说话" << endl;
	}
};

class Dog :public Animal
{
public:

	void speak()
	{
		cout << "小狗在说话" << endl;
	}
};
//我们希望传入什么对象，那么就调用什么对象的函数
//如果函数地址在编译阶段就能确定，那么静态联编
//如果函数地址在运行阶段才能确定，就是动态联编

void DoSpeak(Animal & animal)
{
	animal.speak();
}
//
//多态满足条件： 
//1、有继承关系
//2、子类重写父类中的虚函数
//多态使用：
//父类指针或引用指向子类对象

int main() {

	Cat cat;
	DoSpeak(cat);


	Dog dog;
	DoSpeak(dog);

	system("pause");
	return 0;
}
```

> [!note] 多态满足条件： 
> 1. 有继承关系
> 2. 子类重写父类中的虚函数

> [!note] 多态使用：父类指针或引用指向子类对象

案例二：

```c++
#include <iostream>

class Animal
{
public:
	int age;
	void virtual beAct(Animal* ani)
	{
		std::cout << "Animal was acted\n";
	}
};

class Human :public Animal
{
public:
	int money;
	void beAct(Animal* ani)
	{
		std::cout << "Human was acted\n";
	}
};

int main()
{
	Human laowang;
	laowang.age = 20;
	laowang.money = 3000;
	Animal a1 = laowang;//不推荐这样写，会发生内存截断【内存切片问题】警告|C26437|请勿使用切片(es.63)。
	//原则上直接丢掉也没有什么问题，但是对于虚函数直接丢掉，会丢失重要数据
	std::cout << a1.age << std::endl;

	//向下转型【子类=>父类|用父类表达子类】
	//Human zhangsan = a1;//编译不通过，但如有相应的构造函数，即可通过编译

	// 正确的不发生内存截断的写法:指针和引用
	Animal* a2 = &laowang;//【对象多态推荐写法】
	//Human* man1 = &a2;//编译错误，man1指针会访问到不属于man1的内存
	Human* man1 = (Human*) & a2;//强转后的目的不是操作内存，主要目的是用父类调用子类函数


	int id;
	Animal* ptr;
	std::cin >> id;
	if (id)
		ptr = &a1;
	else
		ptr = &laowang;
	ptr->beAct(ptr);//动态多态：编译时不知道调用哪一个
	// 如果基类Animal的beAct函数没有virtual关键字，无论id为0或1，都是执行基类beAct函数

	system("pause");
	return 0;
}
```



> [!note] 多态满足条件： 
> 1. 有继承关系
> 2. 子类重写父类中的虚函数（函数返回值类型、函数名、参数列表完全一致称为重写）

> [!note] 多态使用：父类指针或引用指向子类对象





## 7.2 虚函数

### 7.2.1 虚函数初识

虚函数：在类中使用 `virtual` 修饰了的成员函数

虚函数的**使用条件**：

1. 🔺`virtual` 只能写在类的内部声明或定义，不能把 `virtual` 写在类的外部定义中
2. 🔺🔺调用**类的对象**是无法使用虚函数的，必须使用**基类指针**来实现虚函数的调用
	- 比如下例中的Move函数，如果传入参数为对象实例而非对象指针，则报错；
	- 当然，可以改为引用，引用本质也是指针
	- 本质上，此时传入的临时对象是个基类临时对象，即导致了内存切片】
3. 🔺虚函数在派生类和基类中必须具有相同的**返回值**及**参数列表**
	- 例外：协变，即参数列表依然相同，但基类返回一个基类指针，派生类重写时返回一个派生类指针或基类指针
4. 🔺虚函数不能是函数模板

`override` & `final` **关键字**：

1. override：作为类成员函数后缀，确保该函数是重写父类虚函数而来
	- 编译器会报错提醒虚函数重写错误，否则不会报错仅作为普通成员函数存在，建议一定加！
2. final：确保类不会被派生
	- 虽然final可以作为变量名使用，但没必要
	- 可与override同时使用


```c++
#include <iostream>

class MoveObject
{
public:
	int x;
	int y;
	void virtual Move()
	{
		x++;
		y++;
	}
};

class NPCObject : public MoveObject
{
public:
	void Move() override
	{
		x++;
		y++;
		std::cout << "我是NPC" << std::endl;
	}
};
class MonsterObject : public MoveObject
{
public:
	void Move()override
	{
		x++;
		y++;
		std::cout << "我是怪物" << std::endl;
	}
};

/* 不适用多态
void Move(MonsterObject* obj)
{
	obj->Move();
}
void Move(NPCObject* obj)
{
	obj->Move();
}*/

//使用对象多态【此处参数必须为指针或引用】
void Move(MoveObject* obj)
{
	obj->Move();
}

int main()
{
	MonsterObject snake;
	NPCObject zhangsan;
    //不使用虚函数时，为静态绑定，默认调用基类Move函数
    snake.Move();//静态绑定，输出：我是怪物
    //动态绑定
	Move(&snake);
	Move(&zhangsan);

	system("pause");
	return 0;
}
```


虚函数重写后的**成员保护规则：**

1. 如果基类虚函数为私有private，那么派生类可以重写该虚函数，但**无法通过对象 / 指针直接调用**（无论派生类重写时的访问权限）
	- C++ 中，虚函数的重写只看 “函数签名（返回值 + 函数名 + 参数）”，不看访问权限
2. “建议使用私有虚函数” 的核心是**用非虚的公有接口包裹私有虚函数** （NVI 模式），而非单纯把虚函数设为私有，这才是保护封装的关键。
	- - **控制调用流程**：基类可以在虚函数调用前后加统一逻辑（如日志、权限校验），派生类只负责实现具体逻辑；
	- **保护封装**：派生类无法绕过基类的接口直接调用虚函数，避免破坏基类的设计逻辑；
	- **灵活扩展**：派生类只需重写私有虚函数实现自定义逻辑，无需修改接口，符合 “开闭原则”。
3. 不是所有虚函数都要写在最基类中。

```cpp
#include <iostream>
using namespace std;

// 基类：私有虚函数
class Base {
private:
    // 私有虚函数
    virtual void show() {
        cout << "Base::show (private)" << endl;
    }

public:
    // 公有接口：间接调用私有虚函数（关键）
    void callShow() {
        show(); // 基类内部可调用私有虚函数
    }
};

// 派生类：重写基类的私有虚函数
class Derived : public Base {
public:
    // 重写基类的private虚函数（语法合法！）
    void show() override {
        cout << "Derived::show (public)" << endl;
    }
};

int main() {
    Base* ptr = new Derived();
    ptr->callShow(); // 输出：Derived::show (public)
    delete ptr;
    return 0;
}
```

**关键现象**：

1. 派生类`Derived`成功重写了基类`Base`的私有虚函数`show()`；
2. 通过基类的公有接口`callShow()`，最终调用的是派生类的重写版本（多态生效）；
3. 但无法直接调用`ptr->show()`（编译报错，因为基类中`show()`是 private），也无法通过`Derived`对象直接调用`d.show()`（虽然派生类中`show()`是 public，但基类中是 private，编译仍报错）。

### 7.2.2 多态案例：计算器

案例描述：分别利用普通写法和多态技术，设计实现两个操作数进行运算的计算器类

多态的优点：

* 代码组织结构清晰
* 可读性强
* 利于前期和后期的扩展以及维护

**示例：**

```C++
//普通实现
class Calculator {
public:
	int getResult(string oper)
	{
		if (oper == "+") {
			return m_Num1 + m_Num2;
		}
		else if (oper == "-") {
			return m_Num1 - m_Num2;
		}
		else if (oper == "*") {
			return m_Num1 * m_Num2;
		}
		//如果要提供新的运算，需要修改源码
	}
public:
	int m_Num1;
	int m_Num2;
};

void test01()
{
	//普通实现测试
	Calculator c;
	c.m_Num1 = 10;
	c.m_Num2 = 10;
	cout << c.m_Num1 << " + " << c.m_Num2 << " = " << c.getResult("+") << endl;

	cout << c.m_Num1 << " - " << c.m_Num2 << " = " << c.getResult("-") << endl;

	cout << c.m_Num1 << " * " << c.m_Num2 << " = " << c.getResult("*") << endl;
}

//多态实现
//抽象计算器类
//多态优点：代码组织结构清晰，可读性强，利于前期和后期的扩展以及维护
class AbstractCalculator
{
public :

	virtual int getResult()
	{
		return 0;
	}

	int m_Num1;
	int m_Num2;
};

//加法计算器
class AddCalculator :public AbstractCalculator
{
public:
	int getResult()
	{
		return m_Num1 + m_Num2;
	}
};

//减法计算器
class SubCalculator :public AbstractCalculator
{
public:
	int getResult()
	{
		return m_Num1 - m_Num2;
	}
};

//乘法计算器
class MulCalculator :public AbstractCalculator
{
public:
	int getResult()
	{
		return m_Num1 * m_Num2;
	}
};


void test02()
{
	//创建加法计算器
	AbstractCalculator *abc = new AddCalculator;
	abc->m_Num1 = 10;
	abc->m_Num2 = 10;
	cout << abc->m_Num1 << " + " << abc->m_Num2 << " = " << abc->getResult() << endl;
	delete abc;  //用完了记得销毁

	//创建减法计算器
	abc = new SubCalculator;
	abc->m_Num1 = 10;
	abc->m_Num2 = 10;
	cout << abc->m_Num1 << " - " << abc->m_Num2 << " = " << abc->getResult() << endl;
	delete abc;  

	//创建乘法计算器
	abc = new MulCalculator;
	abc->m_Num1 = 10;
	abc->m_Num2 = 10;
	cout << abc->m_Num1 << " * " << abc->m_Num2 << " = " << abc->getResult() << endl;
	delete abc;
}

int main() {

	//test01();
	test02();

	system("pause");
	return 0;
}
```

> 总结：C++开发提倡利用多态设计程序架构，因为多态优点很多





### 7.2.3 虚函数详解

> [!note] Content
>  - 在构造和析构函数中调用虚函数
> - 调用虚函数的基类版本
> 
> 
> 
> - 默认实参在虚函数中的错误
> - 释放含有虚函数的派生对象【`7.5`节再次补充】

  ```c++
  MonsterObject::Move();//基类名::基类函数
  ```


#### 7.2.3.1 构造和析构函数中调用虚函数

【高频问题】

```c++
#include <iostream>

class MoveObject
{
public:
	int x;
	int y;
	MoveObject()
	{
		std::cout << "MoveObject construct:" <<this<< std::endl;
		Move();//此时正在构造基类，因此此处只能调用基类Move【故为静态绑定】
	}
	void virtual Move()
	{
		std::cout << "MoveObject Moving" << std::endl;
	}
	// 普通函数
	void test()
	{
		Move();//相当于 this->Move();
	}
	~MoveObject()
	{
		std::cout << "MoveObject deconstruct:" << std::endl;
		Move();//MoveObject Moving【子类重写已经被析构】【静态绑定】
	}
};

class MonsterObject : public MoveObject
{
public:
	MonsterObject()
	{
		std::cout << "MonsterObject construct:" << this << std::endl;
		test();//MonsterObject Moving		MonsterObject::test();//MonsterObject Moving
	}
	void Move()override
	{
		std::cout << "MonsterObject Moving" << std::endl;
	}
	~MonsterObject()
	{
		std::cout << "MonsterObject deconstruct:"  << std::endl;
		Move();//MonsterObject Moving
	}
};

int main()
{
	MonsterObject snake;
	snake.Move();//MonsterObject Moving
	snake.test();//MonsterObject Moving!!!
	/*
	有以下结论：
	1、snake构造时，此处的两个this指针是相同的
	2、在基类构造函数中调用虚函数，调用的只能是基类函数【涉及安全问题】
	3、在构造完基类后，调用虚函数，调用的是重写后的虚函数
	4、在析构中同理
	*/
	system("pause");
	return 0;
}
```

##### 构造函数中调用虚函数的底层逻辑

C++ 中对象的构造遵循「先基类、后派生类」的顺序：

- 当构造`MonsterObject`对象时，首先执行`MoveObject`的构造函数，此时**派生类的成员变量尚未初始化，虚函数表（vtable）仍指向基类版本**；
- 编译器为了避免访问未初始化的派生类成员，会强制对构造函数中的虚函数调用做「静态绑定」（编译期确定调用基类版本），而非动态绑定（运行期根据对象类型选择）；
- 基类构造完成后，派生类构造函数执行时，虚函数表才会切换为派生类版本，此时调用虚函数（如`test()`中的`Move()`）会触发动态绑定，执行重写后的派生类函数。

##### 析构函数中调用虚函数的底层逻辑

对象析构遵循「先派生类、后基类」的顺序：

- 当析构`MonsterObject`对象时，首先执行`MonsterObject`的析构函数，此时派生类成员仍有效，调用`Move()`会执行派生类版本；
- 进入`MoveObject`的析构函数时，派生类部分已被析构（成员变量失效、虚函数表切回基类版本），此时调用`Move()`会触发静态绑定，仅执行基类版本；
- 若此时强行调用派生类虚函数，可能访问已释放的内存，导致程序崩溃或未定义行为。

##### 关键执行流程与输出解读

运行`main`函数后，完整输出如下（带核心注释）：

```
MoveObject construct: 0000008F5D5DF894  // 基类构造开始，this指向snake对象
MoveObject Moving                       // 基类构造中调用Move()，静态绑定基类版本
MonsterObject construct: 0000008F5D5DF894 // 派生类构造开始，this与基类一致
MonsterObject Moving                    // 派生类构造中调用test()，触发动态绑定
MonsterObject Moving                    // snake.Move()：直接调用派生类重写版本
MonsterObject Moving                    // snake.test()：test()中this->Move()动态绑定
请按任意键继续...
MonsterObject deconstruct:              // 派生类析构开始
MonsterObject Moving                    // 派生类析构中调用Move()，自身未完全析构，执行派生类版本
MoveObject deconstruct:                 // 基类析构开始
MoveObject Moving                       // 基类析构中调用Move()，静态绑定基类版本
```


- ✅ `this`指针一致性：基类 / 派生类构造函数中的`this`指向同一个对象（内存地址相同），区别仅在于「对象的初始化阶段」；
- ✅ 静态绑定的本质：构造 / 析构阶段，编译器临时禁用虚函数的动态绑定特性，强制使用当前类的虚函数版本；
- ✅ 普通成员函数的动态绑定：非构造 / 析构函数中（如`test()`），虚函数始终遵循动态绑定，调用派生类重写版本。

##### 工程避坑建议

- ❌ 禁止在构造 / 析构函数中调用虚函数：这是 C++ 编码的核心规范，避免因静态绑定导致逻辑不符合预期，或访问未初始化 / 已释放的成员；
- ✅ 替代方案：若需在对象创建后执行自定义逻辑，可设计「初始化函数」（如`Init()`），在构造完成后手动调用：
    
```cpp
// 推荐写法
class MoveObject {
public:
	MoveObject() { /* 仅初始化成员，不调用虚函数 */ }
	// 初始化接口，构造后手动调用
	void Init() { Move(); } // 此时已完成所有构造，动态绑定生效
	virtual void Move() { ... }
};

int main() {
	MonsterObject snake;
	snake.Init(); // 正确调用MonsterObject::Move()
}
```

- ✅ 析构函数仅做资源释放：析构函数应专注于释放当前类的资源，避免调用虚函数或复杂业务逻辑，防止析构顺序导致的未定义行为。

##### 面试高频考点

> [!question] 问：为什么构造 / 析构函数中调用虚函数不触发动态绑定？

答：核心是「对象初始化 / 析构的安全性」—— 构造基类时派生类未初始化，析构基类时派生类已销毁，动态绑定可能访问无效内存，因此编译器强制静态绑定。

> [!question] 问：派生类构造函数中调用基类的普通成员函数（如`test()`），其中的虚函数会调用哪个版本？

答：派生类构造阶段已完成基类构造，虚函数表已切换为派生类版本，因此会调用派生类重写的虚函数（如示例中`test()`调用`MonsterObject::Move()`）。

##### 核心总结

1. 构造 / 析构函数中调用虚函数会触发**静态绑定**，仅执行当前类（构造 / 析构所属类）的虚函数版本，而非派生类重写版本；
2. 构造顺序决定基类构造时派生类未就绪，析构顺序决定基类析构时派生类已失效，这是 C++ 的安全设计；
3. 工程中应避免在构造 / 析构中调用虚函数，优先使用「构造后手动调用初始化函数」的方式实现自定义逻辑；
4. 普通成员函数中的虚函数始终遵循动态绑定，不受构造 / 析构阶段的影响。


#### 7.2.3.2 默认实参在虚函数中的错误

```c++
#include <iostream>

class MoveObject
{
public:
	int x;
	int y;
	void virtual Move()
	{
		std::cout << "MoveObject Moving" << std::endl;
	}
	void virtual AutoMove(int step = 2)
	{
		std::cout << "Auto  Move " << step << std::endl;
	}
};

class MonsterObject : public MoveObject
{
public:
	void Move()override
	{
		std::cout << "MonsterObject Moving" << std::endl;
	}
	void  AutoMove(int step = 3)override
	{
		std::cout << "~~~auto  Move " << step << std::endl;
	}
};

int main()
{
	MonsterObject snake;
	MoveObject* p = &snake;
	p->AutoMove();//必然调用重写后的函数，但默认值为基类虚函数默认值
	//【原因：默认参数是编译时赋值的，重写无法改变默认参数】
	
	system("pause");
	return 0;
}
```

运行上述代码，输出结果为：

```
~~~auto  Move 2
```

- 函数体执行的是`MonsterObject::AutoMove()`（派生类重写版本）；
- 但默认参数`step`的值是`2`（基类`AutoMove`的默认值），而非派生类定义的`3`。

##### 底层逻辑：默认参数 vs 虚函数重写的本质差异

C++ 中「默认参数」和「虚函数重写」遵循完全不同的绑定规则：

| 特性         | 绑定时机  | 决定因素                 | 核心原理               |
| ---------- | ----- | -------------------- | ------------------ |
| 虚函数重写（函数体） | 运行时绑定 | 指针 / 引用指向的**实际对象类型** | 依赖虚函数表（vtable）动态查找 |
| 默认参数（形参值）  | 编译时绑定 | 指针 / 引用的**声明类型**     | 编译期直接替换为常量值        |

##### 关键拆解：`p->AutoMove()`的执行过程

1. **编译阶段**：编译器识别`p`的声明类型是`MoveObject*`，因此将`AutoMove()`的默认参数替换为基类定义的`2`，生成的代码等价于`p->AutoMove(2)`；
2. **运行阶段**：程序通过虚函数表发现`p`指向的实际对象是`MonsterObject`，因此调用`MonsterObject::AutoMove(int)`函数体；
3. **最终执行**：派生类函数体接收的`step`参数是编译期确定的`2`，因此输出`~~~auto Move 2`。

##### 扩展场景验证

场景 1：派生类指针调用（声明类型 = 实际类型）

```cpp
int main() {
    MonsterObject snake;
    MonsterObject* p = &snake;
    p->AutoMove(); // 输出：~~~auto  Move 3
    return 0;
}
```

**原因**：编译期`p`的声明类型是`MonsterObject*`，默认参数直接替换为派生类的`3`，运行期调用派生类函数体。

场景 2：显式传参覆盖默认值

```cpp
int main() {
    MonsterObject snake;
    MoveObject* p = &snake;
    p->AutoMove(5); // 输出：~~~auto  Move 5
    return 0;
}
```

**原因**：显式传参时，编译期不会使用默认参数，运行期函数体接收的是传入的`5`，默认参数规则失效。

##### 核心问题与工程避坑

- ❌ 误区：“重写虚函数时，默认参数会被派生类覆盖”；
    ✅ 正解：默认参数属于编译期特性，虚函数重写仅影响运行期的函数体调用，无法修改编译期确定的默认参数；
- ❌ 误区：“派生类声明默认参数是多余的，可省略”；
    ✅ 正解：派生类声明默认参数仅对 “派生类指针 / 对象调用” 生效，对 “基类指针指向派生类对象” 无效，省略会导致代码语义模糊。

以下为工程建议：

（1）严格禁止：虚函数使用默认参数。

默认参数与虚函数的绑定规则冲突，极易引发逻辑错误，是 C++ 编码的核心避坑点。如需实现 “默认步长” 逻辑，推荐替代方案：

```cpp
// 推荐写法：用函数重载替代默认参数
class MoveObject {
public:
    virtual void AutoMove(int step) { // 无默认参数的虚函数
        std::cout << "Auto  Move " << step << std::endl;
    }
    // 非虚重载函数，提供默认值
    void AutoMove() { AutoMove(2); } 
};

class MonsterObject : public MoveObject {
public:
    void AutoMove(int step) override { // 仅重写带参虚函数
        std::cout << "~~~auto  Move " << step << std::endl;
    }
    // 派生类重载函数，自定义默认值
    void AutoMove() { AutoMove(3); }
};

int main() {
    MonsterObject snake;
    MoveObject* p = &snake;
    p->AutoMove(); // 调用基类AutoMove() → 传入2 → 运行期调用派生类AutoMove(2)
    snake.AutoMove(); // 调用派生类AutoMove() → 传入3 → 执行派生类AutoMove(3)
    return 0;
}
```

（2）妥协方案：基类与派生类默认参数保持一致。若必须使用默认参数，需确保基类和所有派生类的默认参数值完全相同，避免语义不一致。

##### 面试高频考点

> [!question] 问：为什么虚函数的默认参数由声明类型决定，而非实际对象类型？

答：默认参数是编译期特性，编译器无法预知运行期指针指向的实际对象类型，因此只能根据声明类型确定默认值；而虚函数体是运行期通过虚函数表动态查找，两者绑定阶段不同导致规则冲突。


> [!question] 问：如何避免虚函数默认参数的陷阱？

答：核心是 “分离默认值逻辑与虚函数”—— 用非虚的重载函数提供默认值，虚函数仅负责核心逻辑实现，从根源避免绑定规则冲突。

##### 核心总结

1. 虚函数的默认参数遵循**编译期绑定**（由指针 / 引用的声明类型决定），函数体重写遵循**运行期绑定**（由实际对象类型决定），两者规则冲突会导致默认参数 “不符合预期”；
2. 基类指针指向派生类对象时，调用带默认参数的虚函数，会执行派生类函数体，但使用基类的默认参数值；
3. 工程中**禁止虚函数使用默认参数**，优先用 “非虚重载函数 + 带参虚函数” 的组合实现默认值逻辑；
4. 若必须使用默认参数，需保证基类与所有派生类的默认参数值一致，避免语义歧义。

#### 7.2.3.3 释放含有虚函数的派生对象

```c++
#include <iostream>

class MoveObject
{
public:
	int x;
	int y;
 	//~MoveObject()
	//{
		//std::cout << "~~~MoveObject deconstruct" << std::endl;
	//}
	virtual ~MoveObject()
	{
		std::cout << "~~~MoveObject deconstruct" << std::endl;
	}
};

class MonsterObject : public MoveObject
{
public:
	~MonsterObject()
	{
		std::cout << "~~~MonsterObject deconstruct" << std::endl;
	}
};

int main()
{
	MoveObject* p = new MonsterObject();
	delete p; //事实上只析构了一次：~~~MoveObject deconstruct

	//delete p; 等价于下面代码：
	MoveObject* q = new MonsterObject();
	q->~MoveObject();//q是基类指针，析构函数是非虚函数，那必然调用基类析构

	//这样很明显导致内存泄露，故使用虚析构函数【加virtual后】
	MoveObject* r = new MonsterObject();
	delete r;

	system("pause");
	return 0;
}
```

C++ 中通过基类指针 / 引用释放派生类对象时，析构函数的调用规则与普通虚函数一致：

| 基类析构函数特性 | 绑定时机    | 调用逻辑                                                    | 风险         |
| -------- | ------- | ------------------------------------------------------- | ---------- |
| 非虚析构函数   | 编译期静态绑定 | 编译器根据指针**声明类型**（`MoveObject*`）调用基类析构，派生类析构被跳过           | 派生类资源泄露    |
| 虚析构函数    | 运行期动态绑定 | 程序根据指针**指向的实际对象类型**（`MonsterObject`），先调用派生类析构，再自动调用基类析构 | 无泄露，符合析构顺序 |

##### 关键拆解：`delete p`的执行过程

- **非虚析构场景**：
    1. 编译期：编译器识别`p`是`MoveObject*`，将`delete p`解析为 “调用`MoveObject::~MoveObject()` + 释放内存”；
    2. 运行期：仅执行基类析构，派生类的成员（如堆内存、自定义资源）未被释放，导致泄露。
    
- **虚析构场景**：
    1. 编译期：编译器不直接确定析构函数版本，仅标记 “需通过虚函数表查找”；
    2. 运行期：通过虚函数表找到实际对象（`MonsterObject`）的析构函数，执行`MonsterObject::~MonsterObject()`；
    3. 派生类析构执行完毕后，自动调用基类析构`MoveObject::~MoveObject()`；
    4. 最后释放对象占用的堆内存，完成完整析构。
    

##### 核心问题与工程避坑

只要类满足以下任一条件，**必须将析构函数声明为虚函数**：

1. 类作为基类被继承；
2. 存在通过基类指针 / 引用释放派生类对象的场景；
3. 类中有其他虚函数（说明该类设计为 “多态基类”）。


**错误 1**：基类析构非虚，派生类有堆资源

```cpp
class MonsterObject : public MoveObject {
public:
    int* data = new int[100]; // 派生类堆内存
    ~MonsterObject() {
        delete[] data; // 非虚析构时，此代码不会执行，内存泄露
        std::cout << "~~~MonsterObject deconstruct" << std::endl;
    }
};
```

**错误 2**：认为 “派生类无资源就不用虚析构”

即使派生类暂无资源，也建议为基类添加虚析构 —— 后续派生类若新增资源，无需修改基类代码，避免遗漏导致泄露。

##### 虚析构的实现规范

**规范 1**【纯虚析构（抽象基类）】：若基类是抽象类（有纯虚函数），需为纯虚析构提供实现（否则链接报错）：

```cpp
class MoveObject {
public:
    virtual ~MoveObject() = 0; // 纯虚析构
};
// 必须提供实现（类外定义）
MoveObject::~MoveObject() {
    std::cout << "~~~MoveObject deconstruct" << std::endl;
}
```

**规范 2**【普通基类的虚析构】：非抽象基类直接声明虚析构即可，无需额外实现（除非需要自定义资源释放）

```cpp
class MoveObject {
public:
    virtual ~MoveObject() {
        // 基类资源释放逻辑
    }
};
```

**规范 3** 【无需虚析构的场景】：若类**明确不被继承**（如用`final`修饰），或仅作为栈对象使用（无基类指针指向派生类对象），可省略虚析构，减少虚函数表的内存开销：
```cpp
class MoveObject final { // final禁止继承
public:
    ~MoveObject() { ... } // 无需virtual
};
```

##### 面试高频考点

> [!question] 问：为什么基类析构函数要加`virtual`？

答：通过基类指针释放派生类对象时，非虚析构会导致派生类析构函数被跳过，引发资源泄露；虚析构通过动态绑定，确保先析构派生类、后析构基类。

> [!question] 问：纯虚析构需要实现吗？

答：需要。纯虚析构仅将类标记为抽象类，析构函数本身仍需执行（派生类析构后会调用基类析构），无实现会导致链接错误。

 > [!question] 问：所有类都需要虚析构吗？
 
答：不需要。仅当类作为多态基类（被继承且通过基类指针释放派生类对象）时才需要，非继承类加虚析构会增加不必要的内存开销。



## 7.3 对象多态详解

多态是面向对象编程的核心特性之一，指同一个接口在不同上下文中表现出不同行为的能力。C++ 中的多态主要通过**虚函数**实现，分为**编译时多态**（函数重载、运算符重载）和**运行时多态**（继承与虚函数）。

### 7.3.0 多态的基本概念与实现原理

#### 7.3.0.1 虚函数与虚函数表

虚函数是在基类中用 `virtual` 关键字声明的成员函数，其核心机制是**虚函数表（vtable）** 和 **虚指针（vptr）**：

```c++
class Base {
public:
    virtual void show() { cout << "Base::show()" << endl; }
    virtual void display() { cout << "Base::display()" << endl; }
};

class Derived : public Base {
public:
    void show() override { cout << "Derived::show()" << endl; }
};

int main() {
    Base* base_ptr = new Derived();
    base_ptr->show();       // 调用 Derived::show()，体现多态
    base_ptr->display();    // 调用 Base::display()

    return 0;
}
```

**内存布局分析：**
- 每个包含虚函数的类都有一个**虚函数表（vtable）**，存储该类所有虚函数的地址
- 每个对象都会有一个**虚指针（vptr）**，指向所属类的虚函数表
- 当调用虚函数时，程序通过虚指针找到虚函数表，再根据函数位置调用对应版本

#### 7.3.0.2 多态的条件
实现运行时多态需满足三个条件：
1. **继承关系**：存在基类和派生类
2. **函数重写（Override）**：派生类重新实现基类中的虚函数，函数签名完全一致
3. **向上转型**：使用基类指针或引用指向派生类对象

#### 7.3.0.3 虚函数的限制
- 构造函数不能是虚函数（对象创建时虚指针未初始化）
- 静态成员函数不能是虚函数（静态函数无 this 指针）
- 内联函数可以是虚函数（但调用时会忽略 inline 属性）

### 7.3.1 对象多态类型转换

### 7.3.1 对象多态类型转换

在继承体系中，对象类型转换分为**向上转型**和**向下转型**，是实现多态的基础。

#### 7.3.1.1 向上转型（Upcasting）

**定义**：将**派生类指针或引用**转换为**基类指针或引用**（安全操作）

**特点**：
- 编译器自动允许（隐式转换）
- 不需要任何类型转换操作符
- 是多态的基础操作

**示例**：
```c++
class Base {
public:
    virtual void show() { cout << "Base::show()" << endl; }
};

class Derived : public Base {
public:
    void show() override { cout << "Derived::show()" << endl; }
};

int main() {
    Derived d;
    Base* base_ptr = &d;  // 隐式向上转型
    Base& base_ref = d;   // 隐式向上转型

    base_ptr->show();  // 调用 Derived::show()，体现多态
    base_ref.show();   // 调用 Derived::show()

    return 0;
}
```

#### 7.3.1.2 向下转型（Downcasting）

**定义**：将**基类指针或引用**转换为**派生类指针或引用**（潜在危险操作）

**特点**：
- 编译器默认禁止（需要显式类型转换）
- 可能导致未定义行为（如果基类指针实际指向的不是目标派生类对象）
- 需要使用 `static_cast` 或 `dynamic_cast` 进行转换

**向下转型的三种方法**：
1. **C 风格强制转换**：`(Derived*)base_ptr`（最危险，无类型检查）
2. **`static_cast`**：编译时检查类型关系（不检查实际对象类型）
3. **`dynamic_cast`**：运行时检查类型关系（安全，需有虚函数）

示例对比：
```c++
int main() {
    Base* base_ptr1 = new Derived();  // 指向 Derived 对象
    Base* base_ptr2 = new Base();     // 指向 Base 对象

    // 1. C 风格强制转换 - 危险
    Derived* d1 = (Derived*)base_ptr1;  // 成功
    d1->show();  // Derived::show()

    Derived* d2 = (Derived*)base_ptr2;  // 编译通过但运行危险
    d2->show();  // 未定义行为

    // 2. static_cast - 编译时检查
    Derived* d3 = static_cast<Derived*>(base_ptr1);  // 成功
    Derived* d4 = static_cast<Derived*>(base_ptr2);  // 编译通过但运行危险

    // 3. dynamic_cast - 运行时检查（安全）
    Derived* d5 = dynamic_cast<Derived*>(base_ptr1);  // 成功，返回非空指针
    if (d5 != nullptr) d5->show();

    Derived* d6 = dynamic_cast<Derived*>(base_ptr2);  // 失败，返回 nullptr
    if (d6 == nullptr) cout << "转换失败" << endl;

    delete base_ptr1;
    delete base_ptr2;

    return 0;
}
```

#### 7.3.1.3 多重继承下的类型转换

**钻石继承问题**：
```c++
class Base {
public:
    virtual void show() {}
};

class Derived1 : public Base {};
class Derived2 : public Base {};
class Final : public Derived1, public Derived2 {};

int main() {
    Final f;
    Base* b = &f;  // 错误：基类不明确

    // 必须指定通过哪个中间基类转换
    Base* b1 = static_cast<Derived1*>(&f);
    Base* b2 = static_cast<Derived2*>(&f);

    cout << "b1: " << b1 << endl;
    cout << "b2: " << b2 << endl;
    return 0;
}
```

**解决方法**：虚继承（Virtual Inheritance）
```c++
class Base {
public:
    virtual void show() {}
};

class Derived1 : virtual public Base {};  // 虚继承
class Derived2 : virtual public Base {};  // 虚继承
class Final : public Derived1, public Derived2 {};

int main() {
    Final f;
    Base* b = &f;  // 现在可以正常转换
    cout << "Base指针: " << b << endl;

    return 0;
}
```

**注意**：
- 多重继承的类型转换容易导致二义性
- 尽量避免复杂的多重继承结构
- 虚继承会增加内存开销和运行时复杂度

```c++
#include <iostream>

class MoveObject
{
public:
	int x;
    vi
};
class MonsterObject : public MoveObject
{
};
class NPCObject : public MoveObject
{
};
class Wolf:public MonsterObject{};
class Man:MonsterObject{};
class WolfMan:public Wolf,public Man{};
class WolfMan2 :public Wolf, public MoveObject {};

int main()
{
	MonsterObject monster;
	MoveObject* _move = &monster;//隐式类型转换 向上转型【基类->派生类】
	//MonsterObject* _pmonster = _move;//【不被允许】隐式类型转换 向下转型【派生类->基类】
	MonsterObject* _pmonster = (MonsterObject*)_move;//强制类型转换【默认认为程序员认可的行为】
	MonsterObject* _ppmonster = static_cast<MonsterObject*>(_move);//c++自带类型转换
	/*
	1、上面是三种类型转换方式
	2、对象多态的【隐式类型转换和static_cast】：只能转public继承【可以用强制转换】
	3、对象多态的类型转换：不允许虚基类进行类型转换【向下转型】【原因待补充】
	*/


	WolfMan wm;
	void* ptr = &wm;//发生一次类型转换 WolfMan* -> void*【指针的两个信息：类型和地址，此时类型信息丢失】
    //注意：c++17后的void* ptr;给其他变量赋值时，需要加强制转换【否则报错】因为面临类型丢失的问题

	Wolf* pwlf = &wm;//向下转型 WolfMan* -> Wolf*
	Man* pman = &wm;//向下转型  WolfMan* -> Man*
	std::cout << ptr << "," << pwlf << "," << pman << std::endl;//0019FADF,0019FADF,0019FAE0
	// 即 ptr = pwlf != pman 故本质是运算，而不是简单的等于赋值

	Wolf* pwlf2 = (Wolf*)ptr;//void* -> Wolf*【此时只有地址信息，故转换后的地址相同】
	Man* pman2 = (Man*)ptr;//void* -> Man*
	std::cout << ptr << "," << pwlf2 << "," << pman2 << std::endl;//相等
	


	//对于此时的多重继承
	//_move = &wm;//错误：基类不明确
	//_move = (MoveObject*) &wm;//错误：基类不明确 强制类型转换也依然不允许
	//_move = static_cast<MoveObject*>(&wm); //错误：基类不明确
	//原因：此处并非虚继承，内存中存在多个MoveObject内容
	//可能存在特例：如 WolfMan2直接继承了基类，但是转换后指向的是Wolf中的MoveObject
	WolfMan2 wm2;
	//wm2.x = 250;//不明确
	wm2.::Wolf::MonsterObject::MoveObject:: x = 250;
	wm2.::MoveObject::x = 350;
	_move = static_cast<MoveObject*>(&wm2);
	std::cout << _move->x << std::endl;//350

	system("pause");
	return 0;
}
```



### 7.3.2 动态类型转换 `dynamic_cast`

`dynamic_cast` 是 C++ 中最安全的类型转换操作符，通过**运行时类型识别（RTTI）** 机制检查对象的实际类型。

#### 7.3.2.1 核心特性

**关键条件**：
- 只能用于包含**虚函数**的类（支持方法多态）
- 主要用于指针和引用的转换
- 转换失败时返回 `nullptr`（指针）或抛出 `std::bad_cast` 异常（引用）

**语法格式**：
```c++
// 指针转换
目标类型* 指针变量 = dynamic_cast<目标类型*>(源指针);

// 引用转换
try {
    目标类型& 引用变量 = dynamic_cast<目标类型&>(源引用);
} catch (std::bad_cast& e) {
    std::cout << "转换失败: " << e.what() << std::endl;
}
```

#### 7.3.2.2 动态转换的应用场景

**场景 1：向下转换（Downcast）**
```c++
class Shape {
public:
    virtual void draw() = 0;  // 纯虚函数
    virtual ~Shape() {}
};

class Circle : public Shape {
public:
    void draw() override { cout << "绘制圆形" << endl; }
    void setRadius(double r) { radius = r; }
private:
    double radius;
};

class Rectangle : public Shape {
public:
    void draw() override { cout << "绘制矩形" << endl; }
    void setSize(double w, double h) { width = w; height = h; }
private:
    double width, height;
};

void processShape(Shape* shape) {
    shape->draw();

    // 安全的向下转换
    Circle* circle = dynamic_cast<Circle*>(shape);
    if (circle != nullptr) {
        cout << "是圆形，设置半径为 5" << endl;
        circle->setRadius(5);
    }

    Rectangle* rect = dynamic_cast<Rectangle*>(shape);
    if (rect != nullptr) {
        cout << "是矩形，设置尺寸为 10x8" << endl;
        rect->setSize(10, 8);
    }
}

int main() {
    Shape* shapes[] = { new Circle(), new Rectangle(), new Circle() };

    for (int i = 0; i < 3; ++i) {
        processShape(shapes[i]);
        cout << "---" << endl;
    }

    for (int i = 0; i < 3; ++i) {
        delete shapes[i];
    }

    return 0;
}
```

**场景 2：跨类转换（Crosscast）**
```c++
class Base1 {
public:
    virtual void func1() {}
};

class Base2 {
public:
    virtual void func2() {}
};

class Derived : public Base1, public Base2 {
public:
    void func1() override { cout << "Derived::func1()" << endl; }
    void func2() override { cout << "Derived::func2()" << endl; }
};

int main() {
    Derived d;
    Base1* b1 = &d;

    // 跨类转换：Base1* -> Base2*（通过 Derived）
    Base2* b2 = dynamic_cast<Base2*>(b1);
    if (b2 != nullptr) {
        b2->func2();  // 调用 Derived::func2()
    }

    return 0;
}
```

#### 7.3.2.3 与其他转换操作符的对比

| 操作符                | 运行时检查 | 编译时检查 | 虚函数要求 | 安全性 | 适用场景    |
| ------------------ | ----- | ----- | ----- | --- | ------- |
| `dynamic_cast`     | ✔️    | ✔️    | ✔️    | 最高  | 多态类型转换  |
| `static_cast`      | ❌     | ✔️    | ❌     | 中等  | 相关类型转换  |
| `reinterpret_cast` | ❌     | ❌     | ❌     | 最低  | 指针/整数转换 |
| C 风格转换             | ❌     | ❌     | ❌     | 最危险 | 不推荐使用   |

#### 7.3.2.4 注意事项

**1. 关于 `this` 指针转换**
```c++
class Base {
public:
    virtual void process() {
        // 不推荐：基类依赖派生类
        Derived* derived = dynamic_cast<Derived*>(this);
        if (derived != nullptr) {
            derived->specificMethod();
        }
    }
};

class Derived : public Base {
public:
    void specificMethod() {
        cout << "Derived 特定方法" << endl;
    }
};
```
**问题**：基类直接依赖派生类，违反了面向对象的设计原则。

**2. 引用转换的异常处理**
```c++
int main() {
    Base b;
    try {
        Derived& d = dynamic_cast<Derived&>(b);
    } catch (std::bad_cast& e) {
        cout << "转换失败: " << e.what() << endl;
    }

    return 0;
}
// 输出：转换失败: Bad dynamic_cast
```

**3. RTTI 开销**
- 启用 RTTI 会增加程序的内存消耗和运行时间
- 可以通过编译器选项禁用 RTTI（如 GCC 的 `-fno-rtti`）
- 禁用后 `dynamic_cast` 和 `typeid` 将无法正常工作



```c++
#include <iostream>

class MoveObject
{
public:
	int x;
	virtual void test() {}
	virtual void move()
	{
		std::cout << "move:MoveObjectMove" << std::endl;
	}
	//
	virtual void not_use_this_to_devert()
	{
		//if(dynamic_cast<MonsterObject*>((this)))
		//不推荐上面的写法，写法正确，但基类太过依赖派生类，不是什么好事
	}
};
class MonsterObject : public MoveObject
{
public:
	void monsterMove()
	{
		std::cout << "monsterMove" << std::endl;
	}
	void move()
	{
		std::cout << "move:monsterMove" << std::endl;
	}
};
class NPCObject : public MoveObject
{
public:
	void npcMove()
	{
		std::cout << "npcMove" << std::endl;
	}
	void move()
	{
		std::cout << "move:npcMove" << std::endl;
	}
};
class Wolf :public MonsterObject {};
class Man :MonsterObject {};
class WolfMan :public Wolf, public Man {};
class WolfMan2 :public Wolf, public MoveObject {};
class BOSS {};
class WolfMan3 : public Wolf, public BOSS {};

int main()
{
	MonsterObject monster;
	MoveObject* _move = &monster;//隐式类型转换 向上转型【基类->派生类】
	MonsterObject& lMove = monster;//对于指针的类型转换同样使用引用，但

	_move = new MoveObject();
	MonsterObject* _pmonster1 = static_cast<MonsterObject*>(_move);//向下转型【可以转但有风险，内存结构不一致】
	MonsterObject* _pmonster2 = dynamic_cast<MonsterObject*>(_move);//会报错【必须报告多态类型，即必须要有虚函数】
	//显示：转换失败
	if (_pmonster2 == nullptr)
		std::cout << "转换失败" << std::endl;
	else
		std::cout << "转换成功" << std::endl;


	//第二个例子
	auto _pmonster3 = dynamic_cast<MonsterObject*>(_move);
	auto _pnpc = dynamic_cast<NPCObject*>(_move);
	if (_pmonster3 != nullptr) _pmonster3->monsterMove();
	if (_pnpc != nullptr) _pnpc->npcMove();
	//应该使用虚函数来优化代码
	_move->move();

	//第三个例子
	//NPCObject& lNPC = dynamic_cast<NPCObject&>(monster);//报错未经处理的异常：std::bad_cast
	//原因：指针有空指针，引用没有空引用

	//第四个例子：跨类型转换【例子中，WolfMan3中继承的BOSS类】
	//MoveObject -> BOSS?
	WolfMan3 wm3;
	MoveObject* _pmove = &wm3;
	auto p1 = dynamic_cast<WolfMan3*>(_pmove);
	std::cout << p1 << std::endl;
	auto p2 = dynamic_cast<BOSS*>(_pmove);//即将MoveObject -> BOSS【跨类转换】
	std::cout << p2 << std::endl;//本质是因为WolfMan3这块内存包含MoveObject和 BOSS
	
	system("pause");
	return 0;
}
```



### 7.3.3 使用 `typeid` 调试多态

`typeid` 是 C++ 的**运行时类型识别（RTTI）** 操作符，用于获取对象的实际类型信息。

#### 7.3.3.1 基本用法

```c++
#include <typeinfo>  // 必须包含的头文件

typeid(表达式或类型).name();  // 获取类型名称
typeid(表达式或类型).hash_code();  // 获取类型哈希值
```

**简单示例**：
```c++
#include <iostream>
#include <typeinfo>
using namespace std;

class Base {
public:
    virtual void show() {}
};

class Derived : public Base {
public:
    void show() override {}
};

int main() {
    Base* base_ptr = new Derived();
    Base& base_ref = *base_ptr;

    // 获取类型信息
    cout << "typeid(*base_ptr): " << typeid(*base_ptr).name() << endl;  // Derived
    cout << "typeid(base_ref): " << typeid(base_ref).name() << endl;    // Derived
    cout << "typeid(Base): " << typeid(Base).name() << endl;            // Base
    cout << "typeid(Derived): " << typeid(Derived).name() << endl;      // Derived

    // 比较类型
    if (typeid(*base_ptr) == typeid(Derived)) {
        cout << "base_ptr 指向 Derived 类型" << endl;
    }

    delete base_ptr;
    return 0;
}
```

#### 7.3.3.2 `typeid` 的使用条件

**条件 1：基类必须包含虚函数**
```c++
class Base {
public:
    void show() {}  // 非虚函数
};

class Derived : public Base {
public:
    void show() override {}
};

int main() {
    Base* base_ptr = new Derived();
    cout << typeid(*base_ptr).name() << endl;  // Base（不是 Derived！）

    delete base_ptr;
    return 0;
}
```

**原因**：没有虚函数时，`typeid` 会使用编译时类型信息，而不是运行时类型信息。

**条件 2：指针解引用**
```c++
int main() {
    Base* base_ptr = new Derived();
    cout << typeid(base_ptr).name() << endl;    // Base*（指针类型）
    cout << typeid(*base_ptr).name() << endl;   // Derived（对象类型）

    delete base_ptr;
    return 0;
}
```

#### 7.3.3.3 `typeid` 的高级应用

**场景 1：调试多态类型**
```c++
void process(Base* obj) {
    cout << "实际类型: " << typeid(*obj).name() << endl;

    if (typeid(*obj) == typeid(Circle)) {
        cout << "处理圆形" << endl;
    } else if (typeid(*obj) == typeid(Rectangle)) {
        cout << "处理矩形" << endl;
    } else {
        cout << "处理未知形状" << endl;
    }
}
```

**场景 2：与 `dynamic_cast` 配合使用**
```c++
void safeProcess(Base* obj) {
    if (typeid(*obj) == typeid(Derived)) {
        Derived* derived = dynamic_cast<Derived*>(obj);
        derived->specificMethod();
    }
}
```

#### 7.3.3.4 `typeid` 的注意事项

**1. 类型名称的可读性问题**
- 不同编译器对类型名称的编码不同（如 GCC 和 MSVC 输出不同）
- GCC 输出的名称可能是 mangled（重整）的符号名

**2. 开销与性能**
- RTTI 会增加程序的内存消耗（每个类的 type_info 对象）
- `typeid` 操作有运行时开销，但通常很小

**3. 空指针的问题**
```c++
int main() {
    Base* base_ptr = nullptr;
    try {
        cout << typeid(*base_ptr).name() << endl;
    } catch (std::bad_typeid& e) {
        cout << "错误: " << e.what() << endl;
    }

    return 0;
}
```

#### 7.3.3.5 与 `decltype` 的区别

| 操作符     | 类型信息来源 | 运行时支持 | 使用场景               |
|------------|--------------|------------|------------------------|
| `typeid`   | 运行时对象   | ✔️          | 获取对象的实际类型     |
| `decltype` | 编译时表达式 | ❌          | 推导表达式的静态类型   |

**示例对比**：
```c++
int main() {
    Base* base_ptr = new Derived();

    decltype(base_ptr) ptr_type;  // Base* 类型
    decltype(*base_ptr) ref_type; // Base& 类型（静态类型）

    cout << "typeid(*base_ptr): " << typeid(*base_ptr).name() << endl;  // Derived
    cout << "decltype(*base_ptr): " << typeid(ref_type).name() << endl;  // Base

    delete base_ptr;
    return 0;
}
```

#### 7.3.3.6 RTTI 的优缺点

**优点**：
- 提供运行时类型信息，简化多态类型的处理
- 使代码更加灵活和模块化
- 是实现动态语言特性的基础

**缺点**：
- 增加程序的内存消耗
- 影响程序性能（虽然很小）
- 可能导致过度使用（应优先使用虚函数）

**最佳实践**：
- 优先使用**虚函数**（多态的正统方式）
- 仅在必要时使用 RTTI（如类型检查）
- 避免过度依赖类型信息进行条件判断

### 7.3.4 多态的实现机制详解（面试必考）

#### 7.3.4.1 虚函数表（vtable）和虚指针（vptr）

**内存布局示意图**：
```
Base 对象内存布局：
┌─────────────┐
│    vptr     │  → 指向 Base 类的 vtable
├─────────────┤
│  成员变量   │
└─────────────┘

Base 类的 vtable：
┌────────────────────────┐
│ &Base::show()          │
├────────────────────────┤
│ &Base::display()       │
└────────────────────────┘

Derived 对象内存布局：
┌─────────────┐
│    vptr     │  → 指向 Derived 类的 vtable
├─────────────┤
│  成员变量   │
└─────────────┘

Derived 类的 vtable：
┌────────────────────────┐
│ &Derived::show()       │  // 重写的虚函数
├────────────────────────┤
│ &Base::display()       │  // 继承的虚函数
└────────────────────────┘
```

#### 7.3.4.2 虚函数调用过程

**调用 `base_ptr->show()` 时的执行步骤**：
1. 从 `base_ptr` 中获取对象的地址
2. 找到对象内存的 `vptr`（通常在对象头部）
3. 访问 `vptr` 指向的虚函数表（vtable）
4. 根据函数索引找到对应的函数地址（`Derived::show()`）
5. 调用该函数

**性能开销**：
- 虚函数调用比普通函数调用慢 10-20%（主要是多态查找开销）
- 现代编译器会对虚函数调用进行优化（如 Devirtualization）

#### 7.3.4.3 虚析构函数的重要性

**问题示例**：
```c++
class Base {
public:
    Base() { cout << "Base 构造" << endl; }
    ~Base() { cout << "Base 析构" << endl; }  // 非虚析构
};

class Derived : public Base {
public:
    Derived() { cout << "Derived 构造" << endl; }
    ~Derived() { cout << "Derived 析构" << endl; }
};

int main() {
    Base* ptr = new Derived();
    delete ptr;  // 只调用 Base 析构！Derived 析构未调用 → 内存泄漏

    return 0;
}
```

**解决方法**：使用虚析构函数
```c++
class Base {
public:
    virtual ~Base() { cout << "Base 析构" << endl; }
};

// 输出：
// Base 构造
// Derived 构造
// Derived 析构  // 现在会调用
// Base 析构
```

**结论**：**任何包含虚函数的类都应该有虚析构函数**。

### 7.3.5 面试中常见的多态问题

#### 7.3.5.1 什么是多态？C++ 如何实现多态？
**答**：多态是同一接口在不同上下文中表现出不同行为的能力。C++ 通过**虚函数**实现运行时多态，通过**函数重载**实现编译时多态。运行时多态的实现机制是**虚函数表（vtable）**和**虚指针（vptr）**。

#### 7.3.5.2 `static_cast` 和 `dynamic_cast` 的区别？
**答**：
- `static_cast` 是编译时检查，不检查对象的实际类型，适用于相关类型转换
- `dynamic_cast` 是运行时检查，检查对象的实际类型，只适用于包含虚函数的类
- `dynamic_cast` 比 `static_cast` 更安全，但有运行时开销

#### 7.3.5.3 为什么构造函数不能是虚函数？
**答**：
1. 对象创建时虚指针尚未初始化
2. 虚函数调用需要通过虚指针找到虚函数表
3. 构造函数负责初始化虚指针

#### 7.3.5.4 什么是虚函数表和虚指针？
**答**：
- 虚函数表（vtable）：每个包含虚函数的类都有一个虚函数表，存储该类所有虚函数的地址
- 虚指针（vptr）：每个对象都有一个虚指针，指向所属类的虚函数表
- 虚函数调用时通过虚指针找到虚函数表，再根据索引找到函数地址

#### 7.3.5.5 什么是切片问题（Slicing Problem）？
**答**：当派生类对象赋值给基类对象时，派生类特有的成员会被"切片"掉，导致对象只保留基类部分。

```c++
Derived d;
Base b = d;  // 切片：只复制 Base 部分
cout << typeid(b).name() << endl;  // Base（不是 Derived）
```

**避免方法**：使用指针或引用存储对象。

```C++
#include <iostream>

class MoveObject
{
public:
	virtual void test(){}
};
class MonsterObject : public MoveObject
{
};

int main()
{
	int a1;
	std::cout << typeid(a1).name()<<std::endl;//int
	long long a2;
	std::cout << typeid(a2).name() << std::endl;//__int64
	//故仅作调试，不稳定

	MoveObject* _move = new MoveObject();
	_move = new MonsterObject();
	//_move是MoveObject还是MonsterObject？
	std::cout << typeid(_move).name() << std::endl;//class MoveObject *
	std::cout << typeid(*_move).name() << std::endl;//class MoveObject
	//上面的输出说明，此时typeid不支持多态
	//想要typeid支持多态，需要在 基类 加入虚函数
	std::cout << typeid(_move).name() << std::endl;//class MoveObject *
	std::cout << typeid(*_move).name() << std::endl;//class MonsterObject 
	// 因此，typeid可用的两个条件：①基类有虚函数 ②指针解引用


	//引用的例子
	MonsterObject wolf;
	MoveObject& lMove = wolf;
	std::cout << typeid(lMove).name() << std::endl;//class MonsterObject


	//用于判断
	if(typeid(lMove)== typeid(MonsterObject))
		std::cout << "Right!" << std::endl;

	system("pause");
	return 0;
}
```



## 7.4 纯虚函数和抽象类

> 纯虚函数 | 抽象类 | 接口类

在多态中，通常父类中虚函数的实现是毫无意义的，主要都是调用子类重写的内容。因此可以将虚函数改为**纯虚函数**。纯虚函数语法：

```c++
//virtual 返回值类型 函数名 （参数列表）= 0;
virtual void move() = 0;
```

当类中有了纯虚函数，这个类也称为<span style="background:#FFFF00;">抽象类</span>。



**抽象类特点**：

 * 抽象类无法实例化对象，但可以使用**抽象类指针和引用**作为返回类型和参数类型
 * 【建议】抽象类的构造函数因为不能实际使用，故一般推荐将抽象类的构造函数定义为 `protected`
 * 子类必须重写抽象类中的纯虚函数，否则也属于抽象类

**接口类**：类中只定义了一堆纯虚函数。

```C++
class Base
{
public:
	//纯虚函数
	//类中只要有一个纯虚函数就称为抽象类
	//抽象类无法实例化对象
	//子类必须重写父类中的纯虚函数，否则也属于抽象类
	virtual void func() = 0;
};

class Son :public Base
{
public:
	virtual void func() 
	{
		cout << "func调用" << endl;
	};
};

void test01()
{
	Base * base = NULL;
	//base = new Base; // 错误，抽象类无法实例化对象
	base = new Son;
	base->func();
	delete base;//记得销毁
}

int main() {

	test01();
	system("pause");
	return 0;
}
```



### 7.4.1 多态案例二：制作饮品

**案例描述：**

制作饮品的大致流程为：煮水 -  冲泡 - 倒入杯中 - 加入辅料

利用多态技术实现本案例，提供抽象制作饮品基类，提供子类制作咖啡和茶叶

**示例：**

```C++
//抽象制作饮品
class AbstractDrinking {
public:
	//烧水
	virtual void Boil() = 0;
	//冲泡
	virtual void Brew() = 0;
	//倒入杯中
	virtual void PourInCup() = 0;
	//加入辅料
	virtual void PutSomething() = 0;
	//规定流程
	void MakeDrink() {
		Boil();
		Brew();
		PourInCup();
		PutSomething();
	}
};

//制作咖啡
class Coffee : public AbstractDrinking {
public:
	//烧水
	virtual void Boil() {
		cout << "煮农夫山泉!" << endl;
	}
	//冲泡
	virtual void Brew() {
		cout << "冲泡咖啡!" << endl;
	}
	//倒入杯中
	virtual void PourInCup() {
		cout << "将咖啡倒入杯中!" << endl;
	}
	//加入辅料
	virtual void PutSomething() {
		cout << "加入牛奶!" << endl;
	}
};

//制作茶水
class Tea : public AbstractDrinking {
public:
	//烧水
	virtual void Boil() {
		cout << "煮自来水!" << endl;
	}
	//冲泡
	virtual void Brew() {
		cout << "冲泡茶叶!" << endl;
	}
	//倒入杯中
	virtual void PourInCup() {
		cout << "将茶水倒入杯中!" << endl;
	}
	//加入辅料
	virtual void PutSomething() {
		cout << "加入枸杞!" << endl;
	}
};

//业务函数
void DoWork(AbstractDrinking* drink) {
	drink->MakeDrink();
	delete drink;
}

void test01() {
	DoWork(new Coffee);
	cout << "--------------" << endl;
	DoWork(new Tea);
}


int main() {

	test01();

	system("pause");
	return 0;
}
```



## 7.5 虚析构和纯虚析构

多态使用时，如果子类中有属性开辟到堆区，那么父类指针在释放时无法调用到子类的析构代码。

**解决方式：** 将父类中的析构函数改为**虚析构**或者**纯虚析构**。


虚析构和纯虚析构**共性**：
* 可以解决父类指针释放子类对象
* 都需要有具体的函数实现

虚析构和纯虚析构**区别**：如果是纯虚析构，该类属于抽象类，无法实例化对象。

```c++
//虚析构语法：
virtual ~类名(){};

//纯虚析构语法：
virtual ~类名() = 0;

//类外定义
类名::~类名(){}
```

**示例：**

```C++
class Animal {
public:
	Animal()
	{
		cout << "Animal 构造函数调用！" << endl;
	}
	virtual void Speak() = 0;

	//析构函数加上virtual关键字，变成虚析构函数
	//virtual ~Animal()
	//{
	//	cout << "Animal虚析构函数调用！" << endl;
	//}
	virtual ~Animal() = 0;
};

Animal::~Animal()
{
	cout << "Animal 纯虚析构函数调用！" << endl;
}

//和包含普通纯虚函数的类一样，包含了纯虚析构函数的类也是一个抽象类。不能够被实例化。
class Cat : public Animal {
public:
	Cat(string name)
	{
		cout << "Cat构造函数调用！" << endl;
		m_Name = new string(name);
	}
	virtual void Speak()
	{
		cout << *m_Name <<  "小猫在说话!" << endl;
	}
	~Cat()
	{
		cout << "Cat析构函数调用!" << endl;
		if (this->m_Name != NULL) {
			delete m_Name;
			m_Name = NULL;
		}
	}

public:
	string *m_Name;
};

void test01()
{
	Animal *animal = new Cat("Tom");
	animal->Speak();

	//通过父类指针去释放，会导致子类对象可能清理不干净，造成内存泄漏
	//怎么解决？给基类增加一个虚析构函数
	//虚析构函数就是用来解决通过父类指针释放子类对象
	delete animal;
}

int main() {

	test01();

	system("pause");
	return 0;
}
```



**总结：**

​	1. 虚析构或纯虚析构就是用来解决通过父类指针释放子类对象
​	2. 如果子类中没有堆区数据，可以不写为虚析构或纯虚析构
​	3. 拥有纯虚析构函数的类也属于抽象类



<br>

## 7.6 虚函数的实现机制

![](cppcore7-1.png)

```c++
#include <iostream>
#include <Windows.h>

class AIM
{
public:
	//【unknown| x86】
	int HP;
	virtual void Eat()
	{
		std::cout << "AIM" << std::endl;
	}
	virtual void Die()
	{
		std::cout << "AIM die" << std::endl;
	}
};
class WOLF :public AIM
{
public:
	virtual void Eat()
	{
		std::cout << "WOLF" << std::endl;
	}
	virtual void Die()
	{
		std::cout << "Wolf die" << std::endl;
	}
	void Sound()
	{
		std::cout << "aoaoaoaoao~~~" << std::endl;
	}
};

void Hack()
{
	std::cout << "Hack!" << std::endl;
}


int main()
{
	AIM* wolf = new WOLF();
	wolf->Die();//Wolf die
	wolf->Eat();//WOLF
	//如何实现？
	std::cout << sizeof(AIM) << std::endl;//8，为什么4字节->8字节
	std::cout << wolf << "," << &wolf->HP << std::endl;//00FE45D8,00FE45DC【即在HP前加了点脏东西】
	//头部加了4字节的什么脏东西？【x86】

	WOLF aWolf;
	aWolf.Sound();//此处为this_call函数调用【普通的成员函数调用】
	// 从汇编见下个Block
	// 从汇编可知，4字节是指针，同理在x64下为8字节
	// 在具体来看，该指针指向一个表，即虚函数表【当然，每一个多态类都有自己的虚函数表】

	unsigned* vtable = (unsigned*)wolf;
	std::cout <<std::hex<<  "vTable:" << vtable << std::endl;
	std::cout << std::hex << "vTable[0]:" << vtable[0] << std::endl;

	unsigned* func = (unsigned*)vtable[0];
	std::cout << std::hex << "eat:" << func[0] << std::endl;//f510dc
	std::cout << std::hex << "die:" << func[1] << std::endl;//f5115e
	// 调用地址同汇编中的eax内容
	
	//尝试修改虚函数表
	//func[0] = (unsigned)Hack;//func[0]属性为只读，写入权限异常，需要调用windows API
	//使用windows API修改权限
	DWORD old;
	VirtualProtect(func, 8, PAGE_EXECUTE_READWRITE, &old);
	func[0] = (unsigned)Hack;
	wolf->Eat();//Hack!

	AIM* _aim = new WOLF();
	_aim->Eat();//Hack!

	//只有通过指针访问函数才会调用虚函数表
	aWolf.Eat();//WOLF【不涉及指针，即编译时可确定地址】

	system("pause");
	return 0;
}
```

汇编截取：【以`Sound`和`Die`为例】

```asm
# 类普通成员函数 WOLF::Sound
00A667EB  lea         ecx,[aWolf]  
00A667EE  call        WOLF::Sound (0A61523h)  

# 类多态成员函数 WOLF::Die
    38: 	wolf->Die();//Wolf die
00A6674B  mov         eax,dword ptr [wolf]  #将头部加了的4字节的脏东西取出放入eax
00A6674E  mov         edx,dword ptr [eax]   #这个脏东西是个地址，即指针[放入edx]
00A66750  mov         esi,esp  
00A66752  mov         ecx,dword ptr [wolf]  
00A66755  mov         eax,dword ptr [edx+4] #将指针所指空间+4的位置放入eax
00A66758  call        eax  					#调用函数【必然是Die的函数地址】
00A6675A  cmp         esi,esp  
00A6675C  call        __RTC_CheckEsp (0A61302h)  

# 类多态成员函数 WOLF::Eat
    39: 	wolf->Eat();//WOLF
00816761  mov         eax,dword ptr [wolf]  
00816764  mov         edx,dword ptr [eax]  
00816766  mov         esi,esp  
00816768  mov         ecx,dword ptr [wolf]  
0081676B  mov         eax,dword ptr [edx]  #将指针所指空间的位置放入eax
0081676D  call        eax  				   #调用函数【必然是Eat的函数地址】
0081676F  cmp         esi,esp  
00816771  call        __RTC_CheckEsp (0811302h)  
```



**虚函数的性质总结**

- 每一个多态类都有自己的虚函数表；对于某个类的多个实例，内存中只存一张虚函数表即可【也就是说，这N个实例对象内存的头部，都有一个相同的指针，即指向虚函数表的指针】【由于对该指针加密的成本过高，故为破解提供可能，如修改了虚函数表的内容】
- 通过修改虚函数表的数据可以实现劫持
- 只有通过指针访问函数才会调用虚函数表【不涉及指针，即与多态无关，即编译时可确定地址】





<br>

## 7.7 多态的补充

### 7.7.1 类的成员函数的函数指针

回顾函数指针，只要形态一致，该指针就可以指向不同的函数【详解见 `3.4`节】

而对于类的成员函数，如何使用函数指针？【实际用的不是很多】【函数多态】

```c++
#include <iostream>

//需要提前声明！！！
class WOLF;
// 对于类成员函数的指针【最大的区别在于存在this指针】
typedef void (WOLF::* ptrfunc_part)();

class WOLF
{
public:
	ptrfunc_part ptr_wolf;
	WOLF()
	{
		ptr_wolf = &WOLF::groupUP1;
		//this->*ptr_wolf();//报错：明显调用的表达式前的括号必须具有(指针)函数类型 
		(this->*ptr_wolf)();
	}
	void groupUP1()
	{
		std::cout << "狼成长到一阶段！\n";
	}
	void groupUP2()
	{
		std::cout << "狼成长到二阶段！\n";
	}
	void groupUP3()
	{
		std::cout << "狼成长到三阶段！\n";
	}
	static void count()
	{
		std::cout << "静态成员函数！\n";
	}
};

// 对于普通函数的指针
typedef void (*ptrfunc)();
void printd() {}
// 同理对静态类成员函数
typedef void (*ptrStatic)();

int main()
{
	void (*ptr1)() = printd;
	//typedef后
	ptrfunc ptr2 = printd;

	//类成员函数的指针
	ptrfunc_part ptr3=&WOLF::groupUP2;
	WOLF* pwolf = new WOLF();
	(pwolf->*ptr3)();//狼成长到一阶段！

	//类成员函数的指针：也可能定义在类内部
	//对于静态类成员函数【由于其没有this指针，故写法同普通函数】
	ptrStatic _count = WOLF::count;
	_count();

	system("pause");
	return 0;
}
```





### 7.7.2 多态案例：电脑组装

**案例描述：**

电脑主要组成部件为 CPU（用于计算）、显卡（用于显示）、内存条（用于存储）

- 将每个零件封装出抽象基类，并且提供不同的厂商生产不同的零件，例如Intel厂商和Lenovo厂商
- 创建电脑类提供让电脑工作的函数，并且调用每个零件工作的接口
- 测试时组装三台不同的电脑进行工作




**示例：**

```C++
#include<iostream>
using namespace std;

//抽象CPU类
class CPU
{
public:
	//抽象的计算函数
	virtual void calculate() = 0;
};

//抽象显卡类
class VideoCard
{
public:
	//抽象的显示函数
	virtual void display() = 0;
};

//抽象内存条类
class Memory
{
public:
	//抽象的存储函数
	virtual void storage() = 0;
};

//电脑类
class Computer
{
public:
	Computer(CPU * cpu, VideoCard * vc, Memory * mem)
	{
		m_cpu = cpu;
		m_vc = vc;
		m_mem = mem;
	}

	//提供工作的函数
	void work()
	{
		//让零件工作起来，调用接口
		m_cpu->calculate();

		m_vc->display();

		m_mem->storage();
	}

	//提供析构函数 释放3个电脑零件
	~Computer()
	{

		//释放CPU零件
		if (m_cpu != NULL)
		{
			delete m_cpu;
			m_cpu = NULL;
		}

		//释放显卡零件
		if (m_vc != NULL)
		{
			delete m_vc;
			m_vc = NULL;
		}

		//释放内存条零件
		if (m_mem != NULL)
		{
			delete m_mem;
			m_mem = NULL;
		}
	}

private:

	CPU * m_cpu; //CPU的零件指针
	VideoCard * m_vc; //显卡零件指针
	Memory * m_mem; //内存条零件指针
};

//具体厂商
//Intel厂商
class IntelCPU :public CPU
{
public:
	virtual void calculate()
	{
		cout << "Intel的CPU开始计算了！" << endl;
	}
};

class IntelVideoCard :public VideoCard
{
public:
	virtual void display()
	{
		cout << "Intel的显卡开始显示了！" << endl;
	}
};

class IntelMemory :public Memory
{
public:
	virtual void storage()
	{
		cout << "Intel的内存条开始存储了！" << endl;
	}
};

//Lenovo厂商
class LenovoCPU :public CPU
{
public:
	virtual void calculate()
	{
		cout << "Lenovo的CPU开始计算了！" << endl;
	}
};

class LenovoVideoCard :public VideoCard
{
public:
	virtual void display()
	{
		cout << "Lenovo的显卡开始显示了！" << endl;
	}
};

class LenovoMemory :public Memory
{
public:
	virtual void storage()
	{
		cout << "Lenovo的内存条开始存储了！" << endl;
	}
};


void test01()
{
	//第一台电脑零件
	CPU * intelCpu = new IntelCPU;
	VideoCard * intelCard = new IntelVideoCard;
	Memory * intelMem = new IntelMemory;

	cout << "第一台电脑开始工作：" << endl;
	//创建第一台电脑
	Computer * computer1 = new Computer(intelCpu, intelCard, intelMem);
	computer1->work();
	delete computer1;

	cout << "-----------------------" << endl;
	cout << "第二台电脑开始工作：" << endl;
	//第二台电脑组装
	Computer * computer2 = new Computer(new LenovoCPU, new LenovoVideoCard, new LenovoMemory);;
	computer2->work();
	delete computer2;

	cout << "-----------------------" << endl;
	cout << "第三台电脑开始工作：" << endl;
	//第三台电脑组装
	Computer * computer3 = new Computer(new LenovoCPU, new IntelVideoCard, new LenovoMemory);;
	computer3->work();
	delete computer3;

}
```





# 八 文件操作

程序运行时产生的数据都属于临时数据，程序一旦运行结束都会被释放。该过程中的数据可以通过**文件可以将数据持久化**。

> [!note] C++中对文件操作需要包含头文件 `< fstream >`

文件类型分为两种：

1. 文本文件：文件以文本的**ASCII码**形式存储在计算机中。
2. 二进制文件：文件以文本的**二进制**形式存储在计算机中，用户一般不能直接读懂它们。

操作文件的三大类:
1. ofstream：写操作
2. ifstream： 读操作
3. fstream ： 读写操作



## 8.1 文本文件

### 8.1.1 写文件

   写文件步骤如下：

```cpp
// 1. 包含头文件   
#include <fstream>

// 2. 创建流对象  
ofstream ofs;

// 3. 打开文件
ofs.open("文件路径",打开方式);

// 4. 写数据
ofs << "写入的数据";

// 5. 关闭文件
ofs.close();
```

   

文件打开方式：

| 打开方式        | 解释            |
| ----------- | ------------- |
| ios::in     | 为读文件而打开文件     |
| ios::out    | 为写文件而打开文件     |
| ios::ate    | 初始位置：文件尾      |
| ios::app    | 追加方式写文件       |
| ios::trunc  | 如果文件存在先删除，再创建 |
| ios::binary | 二进制方式         |

> [!NOTE] 注意： 文件打开方式可以配合使用，利用 `|` 操作符

**例如：** 用二进制方式写文件 `ios::binary |  ios:: out`

**示例：**

```C++
#include <fstream>

void test01()
{
	ofstream ofs;
	ofs.open("test.txt", ios::out);

	ofs << "姓名：张三" << endl;
	ofs << "性别：男" << endl;
	ofs << "年龄：18" << endl;

	ofs.close();
}

int main() {
	test01();
	system("pause");
	return 0;
}
```


> [!NOTE] 总结：
> 
> * 文件操作必须包含头文件 `fstream`
> * 读文件可以利用 `ofstream`  ，或者`fstream`类
> * 打开文件时候需要指定操作文件的路径，以及打开方式
> * 利用`<<`可以向文件中写数据
> * 操作完毕，要关闭文件





### 8.1.2 读文件

读文件与写文件步骤相似，但是读取方式相对于比较多



读文件步骤如下：

1. 包含头文件   

   \#include <fstream\>

2. 创建流对象  

   ifstream ifs;

3. 打开文件并判断文件是否打开成功

   ifs.open("文件路径",打开方式);

4. 读数据

   四种方式读取

5. 关闭文件

   ifs.close();



**示例：**

```C++
#include <fstream>
#include <string>
void test01()
{
	ifstream ifs;
	ifs.open("test.txt", ios::in);

	if (!ifs.is_open())
	{
		cout << "文件打开失败" << endl;
		return;
	}

	//第一种方式
	//char buf[1024] = { 0 };
	//while (ifs >> buf)
	//{
	//	cout << buf << endl;
	//}

	//第二种
	//char buf[1024] = { 0 };
	//while (ifs.getline(buf,sizeof(buf)))
	//{
	//	cout << buf << endl;
	//}

	//第三种
	//string buf;
	//while (getline(ifs, buf))
	//{
	//	cout << buf << endl;
	//}

	char c;
	while ((c = ifs.get()) != EOF)// End of file
	{
		cout << c;
	}

	ifs.close();


}

int main() {

	test01();

	system("pause");

	return 0;
}
```

总结：

- 读文件可以利用 ifstream  ，或者fstream类
- 利用is_open函数可以判断文件是否打开成功
- close 关闭文件 





## 8.2 二进制文件

以二进制的方式对文件进行读写操作，打开方式要指定为 `ios::binary`。

### 8.2.1 写文件

二进制方式写文件主要利用流对象调用成员函数`write`。

```cpp
// 字符指针buffer指向内存中一段存储空间。len是读写的字节数
ostream& write(const char * buffer,int len);
```

示例：

```C++
#include <fstream>
#include <string>

class Person
{
public:
	char m_Name[64];
	int m_Age;
};

//二进制文件  写文件
void test01()
{
	//1、包含头文件

	//2、创建输出流对象【2|3为两种写法，这样可省略第三步】
	ofstream ofs("person.txt", ios::out | ios::binary);
	
	//3、打开文件
	//ofs.open("person.txt", ios::out | ios::binary);

	Person p = {"张三"  , 18};

	//4、写文件
	ofs.write((const char *)&p, sizeof(p));

	//5、关闭文件
	ofs.close();
}

int main() {

	test01();

	system("pause");
	return 0;
}
```

总结：
* 文件输出流对象 可以通过write函数，以二进制方式写数据
* 写文件时，最好不要用 `string`，建议使用字符数组





### 8.2.2 读文件

二进制方式读文件主要利用流对象调用成员函数read。

```cpp
// 字符指针buffer指向内存中一段存储空间。len是读写的字节数
istream& read(char *buffer,int len);
```

示例：

```C++
#include <fstream>
#include <string>

class Person
{
public:
	char m_Name[64];
	int m_Age;
};

void test01()
{
	ifstream ifs("person.txt", ios::in | ios::binary);
	if (!ifs.is_open())
	{
		cout << "文件打开失败" << endl;
	}

	Person p;
	ifs.read((char *)&p, sizeof(p));

	cout << "姓名： " << p.m_Name << " 年龄： " << p.m_Age << endl;
}

int main() {

	test01();

	system("pause");
	return 0;
}
```


> 文件输入流对象可以通过read函数，以二进制方式读数据。





<br>

# 九 编译器

### 9.1 One Definiton Rule

ODR，单一性原则，解决头文件嵌套问题【思想和概念，一系列规则构成】。

- 转换单元
- 未定义行为

**转换单元**：我们写好的每个源文件(.cpp,.c)，将其所包含的头文件(`#include<xx.h>`)合并后,称为一个转换单元

编译器单独的将每一个转换单元生成为对应的对象文件(.obi)，对象文件包含了转换单元的机器码和转换单元的引用信息(不在转换单元中定义的对象)；最后链接器将各个转换单元的对象文件链接起来，生成我们的目标程序。

比如在对象文件A中包含了定义在其他转换单元的引用，那么就去其他转换单元的对象文件中寻找这个引用的定义来建立链接，如果在所有的对象文件中都找不到这个定义，那么就会生成一个链接错误

> 常识补充：
>
> 链接阶段错误：LNKXXXX
>
> 转换单元错误：Cxxxx【编译阶段】

**未定义行为：**C++标准未作规定的行为，称为未定义行为。其表现在执行结果不确定，在不同编译器下会有不同的效果。【如 `c = 2*a++ + ++a*6`】

**ODR** 是一系列规则，程序中定义的每一个对象都有自己的规则。基本上，任何变量、函数、类、枚举、模板、<u>概念</u>（C++20）在每个转换单元中只允许有一个定义；非inline的函数或变量（C++17），在整个程序中，有且只有一个定义。

> const、static 的情况会例外，其只会在自己的转换单元才有效。

**名称的链接属性：**程序中的变量、函数、结构等都有自己的名字，这些名字具有不同的链接属性，链接器就是根据链接属性把各个对象文件链接起来。链接属性分三种：

- 内部链接属性：该名称仅仅在本转换单元中有效
- 外部链接属性：该名称在其他的转换单元中也有效
- 无链接属性：该名称仅仅能够用于该名称的作用域内访问

```c++
#include <iostream>
using namespace std;

static int a = 6; // 内部链接属性：仅仅在本转换单元中有效
static void test()// 内部链接属性【当然，去掉static，其具有外部链接属性】
{
	cout << "test" << endl;
}
const int b = 1;// 内部链接属性

extern int c = 4;// 外部链接属性：在其他的转换单元中也有效
//inline int d = 10; //【c++17】不同于static，inline修饰变量的正确用法应该写在头文件里
// inline待补充

int main()
{
	int a = 2;

	system("pause");
	return 0;
}
```

上面代码中，使用 `static` 强行将具有外部来链接属性的 `test()` 赋予内部链接属性，但这种做法不被推荐，目前仅被支持。而推荐使用**未命名的命名空间**【6.3 namespace 详解】来实现。

<br>

### 9.2  `#define`

五种用法：

```c++
#include <iostream>
using namespace std;

// ①定义常量：简单方便，无脑替换===================================
#define A B  // 将标识符A定义为B的别名【A的命名要求满足变量命名规则】
#define 整数 int
#define 整数b int b
#define float int//错误示范，不要写

// c++ 定义常量：const定义常量：类型检查严格
const int SCREEN_WIDTH{ 1980 };

// ②仅标识：该标识在编译时会被删除【本质相同，替换为空】==========
#define Here
#define UNICODE
#define _Test_ // 表示为测试变量
// 方便阅读【常见于windows API】
#define _in_
int add(_in_ int a, int& b)
{
	return a + b;
}

// ③复杂表达式：类似于函数，但不同于函数，仅是宏替换==============
#define SUM(X,Y) X+Y
#define RELEASE(x) delete[] x;x=nullptr; // 减轻代码量【像内联函数】
#define BIGGER(X,Y) (X>Y?X:Y) // 不加括号在cout中处理不了

// ④输出字符串化:加#号【将X作字符串处理】======================
#define SHOW(X) std::cout << #X<<std::endl;

// ⑤输出字符串化:加##号【字符串连接】
#define SHOWLINK(X,Y) std::cout << X##Y<<std::endl;
#define SHOWFUN(X,Y) void X##Y(){std::cout << #X<<std::endl;}
SHOWFUN(test,25) // 相当宏定义了一个函数

// ⑥定义标志：如防止头文件嵌套================================
#define X
#ifndef X
#endif

int main()
{
	整数 a = 2;
	整数b{ 3 };
	int _Test_ c;

	// 停止使用宏
#undef _Test_
	//int _Test_ d;//编译错误

	// 复杂表达式宏 例1
	cout << SUM(1, 2) << endl;
	// 复杂表达式宏 例2
	int* arr = new int[50];
	RELEASE(arr);
	cout << arr << endl;

	// ④字符串化
	SHOW(123SSS_____SSS21);
	SHOWLINK(12, 55);

	test25();

	system("pause");

	return 0;
}
```

> C语言中经常通过 `#define` 定义常量。但在C++中有时候并不安全，而经常用 `const int a{2};`





## 9.3 namespace

为了避免命名冲突，将相关的函数、变量、结构体附加到一个特定的命名空间里，用于命名归类。

```c++
#include <iostream>
//using namespace std;// 会将其中的所有命名引入
namespace t
{
	int value;//命名空间定义
}

int p{ 0 };//具有外部链接属性
const int q{ 0 };//具有内部链接属性

// 命名空间扩充
namespace t
{
	int h[20];//命名空间定义
}

int main()
{
	//value = 25;// 无法访问
	t::value = 25;
	int cout{ 0 };// 若不写std
	int p{ 250 };//不具有链接属性

	// 250 0
	std::cout << p << ",全局命名空间中的p=" << ::p << std::endl;

	system("pause");

	return 0;
}

// other.cpp
extern int p;//=0
void show()
{
    std::cout << ::p;
}
```

**全局命名空间：**所有具有链接属性的对象，只要没有定义命名空间，就默认定义在全局命名空间中，全局命名空间中。成员的访问不用显示的指定，当局部名称覆盖了全局名称时才需要显式的指定全局命名空间；

**命名空间扩展：**多次定义并补充某名命名空间的命名定义。

**命名空间声明：**可以在头文件进行命名空间的声明，源文件也可以。

```c++
// 头文件或源文件中
namespace htd
{
	extern int valuetmp;//命名空间声明
    void test();//命名空间内函数的声明
}

// 源文件中
void htd::test()
{
    int x;
}
int htd::valuetmp{2};

// 命名空间嵌套
namespace top
{
	void test1();
    namespace hack
    {
        void hack();
    }
}
```

**命名空间嵌套：**如上

**未命名的命名空间：**为避免具有外部链接属性的命名冲突，以前使用 `static` 等来限制某函数仅在本文件中生效【目前不被推荐】。

```c++
// 源文件中
// 未命名的命名空间：test()函数仅在本转换单元有效【本文件】
namespace 
{
    void test()
    {
        std::cout << "hack!";
    }
}

// 命名空间别名
namespace htd
{
	void hack()
	{
		std::cout << "hack!";
	}
}
namespace newname = htd;
```

**命名空间的别名：**见上



## 9.4  预处理指令逻辑

`#ifdef、#ifndef、#else、#endif`；`#if、#elif、#else、#endif`。用于避免头文件嵌套、控制字符集、控制版本函数等。【`#if` 可以嵌套】

```c++
#include <iostream>
#include "emath.h"

#ifdef UNICODE //【配置属性|高级|字符集|调整字符集】
wchar_t a;
#else
char a;
#endif //UNICODE

#define VERSION 100
#define SWITCH 1

#if VERSION==100
void sendms() {}

#elif VERSION==101
void sendms() {}

#elif VERSION==(102+1)&&SWITCH
void sendms() {}

#else
void sendms() {}
#endif

int main()
{
	system("pause");

	return 0;
}
```



## 9.5  预定义宏

> 编译器提前定义的宏，不同编译器不同

**标准预定义标识符：**

- `__func__`【ISO C99 | ISO C++11】：返回函数名【用途：调试时需要记录异常由哪一个函数产生】

**标准预定义宏：**

- `__DATE__`【ISO C99 | ISO C++17】：源文件的编译日期
- `__TIME__`【ISO C99 | ISO C++17】：当前转换单元的转换时间
- `__FILE__`【ISO C99 | ISO C++17】：源文件的名称
- `__LINE__`  【ISO C99 | ISO C++17】：当前的行号
- `__cplusplus` 【ISO C99 | ISO C++17】：当翻译单元为C++时，cplusplus定义为一个整数文本，否则为未定义

**MSVC预定义宏【仅常用 | 且为微软VS】：**

- `_CHAR_UNSIGNED`：如果char类型为无符号，该宏定义为1否则为未定义
- `__COUNTER__`：从0开始，每次使用都会递增1
- `_DEBUG`：如果设置了/IDd/mDd /mTd该宏定义为1否则为未定义
- `__FUNCTION__`：函数名称不含修饰名
- `__FUNCDNAME__`：函数名称包含修饰名【如 `?add@@YAHHH@Z`】
- `__FUNCSIG__`：包含了函数签名的函数名【如 `int __cdecl add(int,int)`】
- `_WIN32`：当编译为32位ARM、64位ARM、X68或X64定义为1，否则为未定义【区分32/64】
- `_WIN64`：当编译为64位ARM或x64定义为1，否则未定义
- `__TIMESTAMP__`：最后一次源代码修改的时间和日期

```c++
#include <iostream>

int add(int a, int b)
{
	std::cout << __func__ << std::endl;//add
	std::cout << __FUNCTION__ << std::endl;//add
	std::cout << __FUNCDNAME__ << std::endl;//?add@@YAHHH@Z【包含类型，用于函数重载】
	std::cout << __FUNCSIG__ << std::endl;//int __cdecl add(int,int)
	return a + b;
}

int main()
{
	std::cout << __func__ << std::endl;//main
	add(1, 2);

	std::cout << __FILE__ << std::endl;//E:\About Chase\Art of Programming-2024\CPP\ConsoleApplication1\ConsoleApplication1\ConsoleApplication1.cpp
	std::cout << __TIME__ << std::endl;//16:53:28
	std::cout << __DATE__ << std::endl;//Mar 12 2024
	std::cout << __cplusplus << std::endl;//199711

	//MSVC
#ifdef _CHAR_UNSIGNED
	std::cout << "char unsigned" << std::endl;
#endif
	__COUNTER__;//0
	std::cout << __COUNTER__ << std::endl;//1
	std::cout << __COUNTER__ << std::endl;//2

#ifdef _DEBUG//常用
	std::cout << "DEBUG MODE" << std::endl;//由此决定【配置|C/C++|代码生成|运行库】
#endif // _DEBUG

#ifdef _WIN64
	std::cout << "WIN64" << std::endl;
#endif	

#ifdef _WIN32
	std::cout << "WIN32" << std::endl;
#endif	

	std::cout << __TIMESTAMP__ << std::endl;//Tue Mar 12 17:15:18 2024

	system("pause");
	return 0;
}
```



## 9.6  调试

编写好程序以后，可能会存在一些bug和错误。对于语法上的错误，编译器能够直接给出提示；而

对于逻辑上的错误，编译器不能够直接发现。

调试就是一个找错误和改错误的过程。为了方便调试，在编码风格上有几点小建议给大家：

- 模块化
- 使用能够体现出具体意义的函数名和变量名
- 使用正确的缩进和代码块
- 良好的注释习惯

> 断点、逐语句、逐过程【跳过函数的逐句执行】、跳出【进入函数后直接跳出】
>
> 其他调试器：OllyDbg【OD，逆向调试器】、x96Dbg、WinDbg【较老，双机调试】

使用预处理指令调试：

```c++
#ifdef _DEBUG//常用
	std::cout << "DEBUG MODE" << std::endl;
#endif // _DEBUG

#define SWITCH
#ifdef SWITCH//常用
	std::cout << "DEBUG MODE" << std::endl;
#endif // _DEBUG
```



## 9.7  assert

```c++
// assert(bool表达式)
// 若表达式=flase：调用std::abort()函数，弹出对话框
// assert宏 需要头文件cassert
#include <iostream>
//#define NDEBUG// 定义宏，使 assert无效【须在cassert.h之前】
#include <cassert>

int main()
{
	std::cout << "输入整数：\n";
	int a;
	std::cin >> a;
	// 在编译时，需要测试是否等于0【默认只能在Debug模式下可用】
	assert(a);
	std::cout << 1000 / a;

	system("pause");
	return 0;
}
```

`static_assert` 用于**编译时**检查条件：`static_assert(bool表达式，”错误信息“);`

- 不需要头文件
- bool表达式只能是常量，因为如果是变量，在编译阶段根本无法知道值为多少

```c++
#include <iostream>

int main()
{
	const int x = 0;
	//static_assert(a, "wrong!");// 语法错误，只能是常量
	//static_assert(0, "wrong!");// 正确例子
	//static_assert(x, "wrong!");// 正确例子

	// 真实场景：要求在release模式下，只能用32位编译
	static_assert(sizeof(int*) == 4, "wrong!");

	system("pause");
	return 0;
}
```





<br>

# 十  跨语言编程

## 10.1 C++调用汇编

### 10.1.1 C++中使用汇编代码的时机和意义

汇编语言本身等同于机器码。因此，汇编语言更容易编写出速度更快的代码，或者某些时候我们需要利用汇编代码完成某个操作，比如使用特殊的处理器MMX、SSE、AVX等，这些时候可以利用C++调用汇编代码。

但是大部分时候，我们并不需要用汇编代码来代替C++代码，现代编译器的优化技术已经非常成熟，我很少见到有人能写出比编译器编译的更好的汇编代码，除非你对指令集的所有细节已经非常了解；其次来讲，汇编代码的开发效率也远远小于C++。因此我们只是在某些特殊的场景使用汇编代码完成C/C++完成的不够好的功能。

不建议在C++中大量使用汇编代码的原因：

- 降低代码的可移植性

- 降低代码的可维护性和阅读性

实际上，我们也很少为了提升代码运行速度使用汇编代码。因为可以使用算法以及其他手段来提升我们的代码运算速度



### 10.1.2 Microsoft C++ x86内联汇编

C++中使用汇编代码分为两张情况：

- 内联汇编【直接在代码中使用汇编代码】
- 调用编译好的汇编模块【更适用于大范围使用的情况】



**内联汇编器**

内联汇编器集成在编译器中，因此我们可以使用内联汇编器在C/C+代码中直接嵌入汇编代码【取决于编译器的支持】，而不需要单独去编译链接汇编代码。

另外，`AMD` 和 `x64` 架构不支持内联汇编，因此我们的探讨基于 x86 架构上使用 Visual c/C++内联汇编功能

**内联汇编器优缺点**

- 内联汇编不需要单独的编译链接，所以比单独的汇编程序更加的方便
- 内联汇编代码可以使用代码中的C变量和函数，因此比较容易与C代码集成，完成C/C++不大容易完成的功能

比如：① 利用fs寄存器读取进程信息；② 读取CPU序列号

但是内联汇编不适合大范围使用，如果大范围使用可以考虑专门写汇编代码模块，利用MASM编译，链接使用；其次来讲，内联汇编代码得到的是最终的汇编代码，因此可移植性不是很好

**语法：**

我们可以使用`_asm`关键字调用内联汇编，为了同以前的版本兼容，`_asm`等同于`__asm` 【除非指定了编译器选项/Za】

```asm
# _asm 汇编代码
#例如 
_asm mov eax,eax
_asm
{
	mov eax,eax
	mov eax,eax
}
_asm mov eax,eax __asm mov eax,eax _asm mov eax,eax
#_asm的大括号不会影响变量的使用范围
```

示例：

```c++
#include <iostream>

int main()
{
	// 可以使用分号【;】或【//】或【/**/】为汇编添加注释
	int a = 250;
	__asm mov eax, a; //eax=a
	__asm add eax, 1; eax = eax + 1
	__asm mov a, eax

	std::cout << a << std::endl;

	__asm
	{
		mov eax, a
		add eax, 1
		mov a, eax
	}
	std::cout << a << std::endl;

	//asm("mov eax, a")//C++标准语法，但一般不支持
	system("pause");
	return 0;
}
```

<br>



### 10.1.3 `__asm`中汇编编程规范

- 指令集
- `__asm` 与 `MASM`
- `__asm` 与段引用：`__asm`中必须通过寄存器来引用段，不能通过段名称来访问
- LENGTH  SIZE  TYPE
- `__asm` 调试【断点调试即可】



**指令集**

`_asm` 支持`Pentium4`和`AMD Athlon`所有操作码，支持`MMX`指令集

另外，可以利用`_emit`创建目标处理器支持的其他指令【即直接嵌入机器码】

```c++
__asm _emit Ox4A
```

> 如果通过`_emit`生成修改寄存器的值，编译器无法确定哪些寄存器受到影响，这个时候编译器容易做出错误判断，程序可能产生不可预测的行为



`__asm` **与** `MASM`【微软提供的编译器，专用于写汇编】

- `__asm`支持`MASM`的所有表达式，但是`__asm`不能使用`MASM`指令定义数据对象，比如`DB DW DD DQ DT DF DUP`

- `MASM`定义的结构和记录也不可以使用
- `__asm`不接受`STRUC RECORD WIDTH MASK`指令
- `__asm`支持`EVEN ALIGN`



**LENGTH  SIZE  TYPE**

`LENGTH SIZE TYPE` 在`__asm`中可以使用，但是受到了限制。因为限制使用MASM指令，但是依然可以使用他们获取C++的类型信息

- LENGTH：获取数组元素的个数
- SIZE：获取数组的大小
- TYPE：获取数组元素的大小

```c++ 
#include <iostream>

int main()
{
	int a[120];
	int count, size_, type_;
	// 注意：size_\type为汇编中的关键字，故不能使用type作为变量，否则报错C2400 "第一操作数"中的内联汇编语法错误;找到","
	_asm
	{
		mov count, LENGTH a
		mov size_, SIZE a
		mov type_, TYPE a
	}
	std::cout << count << std::endl;//元素个数120
	std::cout << size_ << std::endl;//数组大小480
	std::cout << type_ << std::endl;//元素大小4

	system("pause");
	return 0;
}
```





### 10.1.4 `__asm`中C/C++编程规范

- `__asm` 中可使用的C/C++内容
  - 符号、标签、变量、函数名称
  - 常量【符号常量、enum成员】
  - 宏、预处理指令
  - 注释【三种注释】
  - 类型名称【类名】
  - typedef
- `__asm` 中使用运算符
  - `__asm`不能使用C/C++的专有运算符，比如`<< >>`
  - 但是C/C++ MASM共享的运算符，被解释为汇编语言运算符。比如，`[]`在C/C++中被解释为数组下标，但是在`__asm`中被解释为MASM索引运算符
- `__asm` 中使用C/C++数据：如果C/C++类或者成员用有唯一的名称，`__asm`可以直接使用该名称来引用他；如果名称不算唯一，则需要加变量名称
- `__asm` 编写函数



可使用内容示例：

```c++
#include <iostream>

void test()
{
	std::cout << "Test" << std::endl;
}
int add(int a, int b)
{
	//return a + b;
	//编译器会在头尾添加默认的汇编代码来保证堆栈安全
	_asm
	{
		mov eax, a
		add eax, b
	}
}
class Role
{
public:
	int aRole;
};
int main()
{
	int a{ 250 };
	const int ca = 5;//常量
	int arr[6]{ 1,2,3,4,5,6 };
	Role r;

	_asm
	{
		mov eax, a//变量
		add eax, 1//可用16进制符号0x或h
		mov a, eax
		call test//函数
		mov arr[8], 0//此处的[]，意为MASM索引运算符，即8=2*4为字节数

		lea eax, r
		mov[eax].aRole, 100//mov [eax]r.aRole, 100


		jmp jmpA//标签
	}
	a++;
jmpA:
	std::cout << a << std::endl;//251
	std::cout << arr[2] << std::endl;//3//0
	std::cout << r.aRole << std::endl;//100
	std::cout << add(99,1)<< std::endl;//100

	system("pause");
	return 0;
}
```



### 10.1.5 `__asm`中的优化和寄存器问题

- 在内联汇编器中可以直接使用寄存器，但不推荐将寄存器作为变量【比如：`__asm`{} | C++代码 | `__asm`{}，在这种情况中不能保证寄存器未被使用】
- 函数调用约定`__fastcall` 会使用ecx/edx【`__fastcall`不建议包含`__asm`代码】
- esp/ebp不建议私自改动

涉及优化的问题：

- `__asm`中的代码不会被编译器优化



### 10.1.6 __declspec(naked)

`10.1.4`节中使用`__asm`编写函数时发现，编译器会在`__asm`头尾加入一些默认汇编代码【编译器为了保障栈平衡】，可以使用`__declspec(naked)`【declare specification】来阻止编译器添加汇编代码。

使用`__declspec(naked)`声明的函数，编译器不会对该函数添加任何代码，并且该函数只能用汇编编写代码内容

```c++
#include <iostream>

__declspec(naked) int add(int a, int b)
{
	/*_asm
	{	//不能编译，缺少函数头尾
		mov eax, a
		add eax, b
	}*/
	_asm
	{
		push ebp
		mov ebp,esp

		mov eax, a
		add eax, b

		pop ebp
		ret
	}
}

int main()
{
	std::cout << add(1, 2) << std::endl;//3//0

	system("pause");
	return 0;
}
```

注意：

- C++主流程序员不会有
- `__declspec(naked)`不能用于数据定义、不能用于X64【不支持内联汇编】
- 函数指针【本质是地址】不具备`__declspec(naked)`属性
- 仅仅与函数定义有关，不用写在函数声明中

<br>



## 10.2 汇编补充知识

### 10.2.1 常用指令

lea指令

- `return`一般使用 `eax` 传递来返回
- 栈中，esp为栈顶，栈顶以下为已使用的内存空间，上方可用【即小地址可用，不同架构可能不同】
- 栈中，ebp为栈底

push指令，如 push 32

1. esp = esp - 4
2. [esp] = 32



pop指令，如 pop ebp

1. xxx = [esp]
2. esp = esp + 4



call 指令，如 call cd1020

1. esp = esp - 4
2. [esp] = 【call 指令的下一条指令的地址】
3. CPU跳转cd1020



ret 指令相当于pop出栈操作，能够拿到进入函数前的地址

<br>

### 10.2.2 从函数角度理解栈

以下面的代码为例：

```c++
#include <iostream>
using namespace std;

int Ave(int a, int b)
{
	a = a + 250;
	return a + b;
}

int Add(int a, int b)
{
	int c = 250;
	int d = Ave(a, b);
	c = c + d;
	return c;
}

int main()
{
	cout << Add << endl;

	system("pause");

	int x = Add(250, 50);
	cout << x << endl;

	return 0;
}
```

对应汇编为：

```shell
     4: int Ave(int a, int b)
     5: {
00007FF6A5D01005 4C 24 08             and         al,8  
     6: 	a = a + 250;
00007FF6A5D01008 8B 44 24 08          mov         eax,dword ptr [a]  
00007FF6A5D0100C 05 FA 00 00 00       add         eax,0FAh  
00007FF6A5D01011 89 44 24 08          mov         dword ptr [a],eax  
     7: 	return a + b;
00007FF6A5D01015 8B 44 24 10          mov         eax,dword ptr [b]  
00007FF6A5D01019 8B 4C 24 08          mov         ecx,dword ptr [a]  
00007FF6A5D0101D 03 C8                add         ecx,eax  
00007FF6A5D0101F 8B C1                mov         eax,ecx  
     8: }
00007FF6A5D01021 C3                   ret  



     9: 
    10: int Add(int a, int b)
    11: {
00007FF6A5D01030 89 54 24 10          mov         dword ptr [rsp+10h],edx  
00007FF6A5D01034 89 4C 24 08          mov         dword ptr [rsp+8],ecx  
00007FF6A5D01038 48 83 EC 38          sub         rsp,38h  
    12: 	int c = 250;
00007FF6A5D0103C C7 44 24 20 FA 00 00 00 mov         dword ptr [c],0FAh  
    13: 	int d = Ave(a, b);
00007FF6A5D01044 8B 54 24 48          mov         edx,dword ptr [b]  
00007FF6A5D01048 8B 4C 24 40          mov         ecx,dword ptr [a]  
00007FF6A5D0104C E8 AF FF FF FF       call        Ave (07FF6A5D01000h)  
00007FF6A5D01051 89 44 24 24          mov         dword ptr [d],eax  
    14: 	c = c + d;
00007FF6A5D01055 8B 44 24 24          mov         eax,dword ptr [d]  
00007FF6A5D01059 8B 4C 24 20          mov         ecx,dword ptr [c]  
00007FF6A5D0105D 03 C8                add         ecx,eax  
00007FF6A5D0105F 8B C1                mov         eax,ecx  
00007FF6A5D01061 89 44 24 20          mov         dword ptr [c],eax  
    15: 	return c;
00007FF6A5D01065 8B 44 24 20          mov         eax,dword ptr [c]  
    16: }
00007FF6A5D01069 48 83 C4 38          add         rsp,38h  
00007FF6A5D0106D C3                   ret  
    
    
      
    18: int main()
    19: {
00007FF6A5D01070 48 83 EC 38          sub         rsp,38h  
    20: 	cout << Add << endl;
00007FF6A5D01074 48 8D 15 B5 FF FF FF lea         rdx,[Add (07FF6A5D01030h)]  
00007FF6A5D0107B 48 8B 0D 2E 10 00 00 mov         rcx,qword ptr [__imp_std::cout (07FF6A5D020B0h)]  
00007FF6A5D01082 FF 15 20 10 00 00    call        qword ptr [__imp_std::basic_ostream<char,std::char_traits<char> >::operator<< (07FF6A5D020A8h)]  
00007FF6A5D01088 48 8D 15 51 00 00 00 lea         rdx,[std::endl<char,std::char_traits<char> > (07FF6A5D010E0h)]  
00007FF6A5D0108F 48 8B C8             mov         rcx,rax  
00007FF6A5D01092 FF 15 00 10 00 00    call        qword ptr [__imp_std::basic_ostream<char,std::char_traits<char> >::operator<< (07FF6A5D02098h)]  
    21: 
    22: 	system("pause");
00007FF6A5D01098 48 8D 0D F1 11 00 00 lea         rcx,[__xmm@ffffffffffffffffffffffffffffffff+10h (07FF6A5D02290h)]  
00007FF6A5D0109F FF 15 93 10 00 00    call        qword ptr [__imp_system (07FF6A5D02138h)]  
    23: 
    24: 	int x = Add(250, 50);
00007FF6A5D010A5 BA 32 00 00 00       mov         edx,32h  
00007FF6A5D010AA B9 FA 00 00 00       mov         ecx,0FAh  
00007FF6A5D010AF E8 7C FF FF FF       call        Add (07FF6A5D01030h)  
00007FF6A5D010B4 89 44 24 20          mov         dword ptr [x],eax  
    25: 	cout << x << endl;
00007FF6A5D010B8 8B 54 24 20          mov         edx,dword ptr [x]  
00007FF6A5D010BC 48 8B 0D ED 0F 00 00 mov         rcx,qword ptr [__imp_std::cout (07FF6A5D020B0h)]  
00007FF6A5D010C3 FF 15 D7 0F 00 00    call        qword ptr [__imp_std::basic_ostream<char,std::char_traits<char> >::operator<< (07FF6A5D020A0h)]  
00007FF6A5D010C9 48 8D 15 10 00 00 00 lea         rdx,[std::endl<char,std::char_traits<char> > (07FF6A5D010E0h)]  
00007FF6A5D010D0 48 8B C8             mov         rcx,rax  
00007FF6A5D010D3 FF 15 BF 0F 00 00    call        qword ptr [__imp_std::basic_ostream<char,std::char_traits<char> >::operator<< (07FF6A5D02098h)]  
    26: 
    27: 	return 0;
00007FF6A5D010D9 33 C0                xor         eax,eax  
    28: }
00007FF6A5D010DB 48 83 C4 38          add         rsp,38h  
00007FF6A5D010DF C3                   ret
```



<br>

## 10.3 练习：获取CPU信息

> Intel CPU

![](cppcore10-1.png)

```c++
#include <iostream>
#include <bitset>

void GetCPUInfo(char* cpuMaker, int& Extern)
{
	int readEbx, readEcx, readEdx, readEax;
	__asm
	{
		mov eax, 0//Intel约定:CPU制造商
		cpuid
		mov readEbx, ebx
		mov readEcx, ecx
		mov readEdx, edx

		mov eax, 1//Intel约定:扩展信息
		cpuid
		mov readEax, eax
	}
	int* writeInt = (int*)cpuMaker;
	writeInt[0] = readEbx;
	writeInt[1] = readEdx;
	writeInt[2] = readEcx;
	Extern = readEax;
}

int main()
{
	char Maker[0xff]{};
	int ExternInfo;
	GetCPUInfo(Maker, ExternInfo);
	std::cout << "CPU制造商：" << Maker << std::endl;// CPU制造商：GenuineIntel
	std::cout << "CPU扩展信息：" << ExternInfo << std::endl;
	std::cout << std::bitset<32>(ExternInfo) << std::endl;//00000000000010010000011011101010

	system("pause");
	return 0;
}
```

