---
title: CPP模板与STL
date: 2024-03-13 10:22:00
urlname: cpp-template-and-stl
tags:
  - CPP基础
  - STL
  - CPP
categories: C++开发
description:
draft: false
---

# 一 `C++` 模板

## 1 模板的概念

模板就是建立**通用的模具**，大大**提高代码复用性**

模板的特点：
* 模板不可以直接使用，它只是一个框架
* 模板的通用并不是万能的

<br>

## 2 函数模板

* C++另一种编程思想称为 <span style="background:#FFFF00;">泛型编程</span> ，主要利用的技术就是模板
* C++提供两种模板机制：**函数模板**和**类模板** 



### 2.1 函数模板语法

函数模板作用：建立一个通用函数，其函数返回值类型和形参类型可以不具体制定，用一个**虚拟的类型**来代表。

```C++
template<typename T>
函数声明或定义
```

**解释：**

- template  ---  声明创建模板
- typename  --- 表面其后面的符号是一种数据类型，可以用class代替
- T    ---   通用的数据类型，名称可以替换，通常为大写字母

<span style="background:#FFFF00;">作用：告诉编译器，后面代码中紧跟着的`T`不要报错，`T`是一个通用数据类型</span>

```C++
//交换整型函数
void swapInt(int& a, int& b) {
	int temp = a;
	a = b;
	b = temp;
}

//交换浮点型函数
void swapDouble(double& a, double& b) {
	double temp = a;
	a = b;
	b = temp;
}

//利用模板提供通用的交换函数
template<typename T>
void mySwap(T& a, T& b)
{
	T temp = a;
	a = b;
	b = temp;
}

void test01()
{
	int a = 10;
	int b = 20;
	
	//swapInt(a, b);

	//利用模板实现交换
	//1、自动类型推导
	mySwap(a, b);

	//2、显示指定类型
	mySwap<int>(a, b);

	cout << "a = " << a << endl;
	cout << "b = " << b << endl;

}

int main() {

	test01();

	system("pause");
	return 0;
}
```

总结：

* 函数模板利用关键字 `template`
* 使用函数模板有两种方式：自动类型推导、显示指定类型
* 模板的目的是为了提高复用性，将类型参数化



<br>

### 2.2 函数模板注意事项

**注意事项：**

* 自动类型推导，<span style="background:#FFFF00;">必须推导出一致的数据类型T</span>，才可以使用
* 模板<span style="background:#FFFF00;">必须要确定出T的数据类型</span>，才可以使用

> `template<typename T>`
>
> `template<class T>`
>
> 区别不大

**示例：**

```C++
//利用模板提供通用的交换函数
template<class T>
void mySwap(T& a, T& b)
{
	T temp = a;
	a = b;
	b = temp;
}


// 1、自动类型推导，必须推导出一致的数据类型T,才可以使用
void test01()
{
	int a = 10;
	int b = 20;
	char c = 'c';

	mySwap(a, b); // 正确，可以推导出一致的T
	//mySwap(a, c); // 错误，推导不出一致的T类型
}


// 2、模板必须要确定出T的数据类型，才可以使用
template<class T>
void func()
{
	cout << "func 调用" << endl;
}

void test02()
{
	//func(); //错误，模板不能独立使用，必须确定出T的类型
	func<int>(); //利用显示指定类型的方式，给T一个类型，才可以使用该模板
}

int main() {

	test01();
	test02();

	system("pause");
	return 0;
}
```

总结：使用模板时必须确定出通用数据类型T，并且能够推导出一致的类型



<br>

### 2.3 函数模板案例

案例描述：

* 利用函数模板封装一个排序的函数，可以对**不同数据类型数组**进行排序
* 排序规则从大到小，排序算法为选择排序
* 分别利用char数组和int数组进行测试



示例：

```C++
//交换的函数模板
template<typename T>
void mySwap(T &a, T&b)
{
	T temp = a;
	a = b;
	b = temp;
}


template<class T> // 也可以替换成typename
//利用选择排序，进行对数组从大到小的排序
void mySort(T arr[], int len)
{
	for (int i = 0; i < len; i++)
	{
		int max = i; //最大数的下标
		for (int j = i + 1; j < len; j++)
		{
			if (arr[max] < arr[j])
			{
				max = j;
			}
		}
		if (max != i) //如果最大数的下标不是i，交换两者
		{
			mySwap(arr[max], arr[i]);
		}
	}
}
template<typename T>
void printArray(T arr[], int len) {

	for (int i = 0; i < len; i++) {
		cout << arr[i] << " ";
	}
	cout << endl;
}
void test01()
{
	//测试char数组
	char charArr[] = "bdcfeagh";
	int num = sizeof(charArr) / sizeof(char);
	mySort(charArr, num);
	printArray(charArr, num);
}

void test02()
{
	//测试int数组
	int intArr[] = { 7, 5, 8, 1, 3, 9, 2, 4, 6 };
	int num = sizeof(intArr) / sizeof(int);
	mySort(intArr, num);
	printArray(intArr, num);
}

int main() {

	test01();
	test02();

	system("pause");
	return 0;
}
```

总结：模板可以提高代码复用，需要熟练掌握



<br>

### 2.4 普通函数与函数模板的区别

**普通函数与函数模板区别：**

* 普通函数调用时可以发生自动类型转换（隐式类型转换）
* 函数模板调用时，如果利用自动类型推导，不会发生隐式类型转换
* 如果利用显示指定类型的方式，可以发生隐式类型转换



**示例：**

```C++
//普通函数
int myAdd01(int a, int b)
{
	return a + b;
}

//函数模板
template<class T>
T myAdd02(T a, T b)  
{
	return a + b;
}

//使用函数模板时，如果用自动类型推导，不会发生自动类型转换,即隐式类型转换
void test01()
{
	int a = 10;
	int b = 20;
	char c = 'c';
	
	cout << myAdd01(a, c) << endl; //正确，将char类型的'c'隐式转换为int类型  'c' 对应 ASCII码 99

	//myAdd02(a, c); // 报错，使用自动类型推导时，不会发生隐式类型转换

	myAdd02<int>(a, c); //正确，如果用显示指定类型，可以发生隐式类型转换
}

int main() {

	test01();

	system("pause");

	return 0;
}
```

总结：建议使用显示指定类型的方式，调用函数模板，因为可以自己确定通用类型T



<br>

### 2.5 普通函数与函数模板的调用规则

> 同名函数可发生**函数重载**

调用规则如下：

1. 如果函数模板和普通函数都可以实现，<span style="background:#FFFF00;">优先调用普通函数</span>
2. 可以<span style="background:#FFFF00;">通过空模板参数列表来强制调用函数模板</span>
3. <span style="background:#FFFF00;">函数模板也可以发生重载</span>
4. <span style="background:#FFFF00;">如果函数模板可以产生更好的匹配，优先调用函数模板</span>



**示例：**

```C++
//普通函数与函数模板调用规则
void myPrint(int a, int b)
{
	cout << "调用的普通函数" << endl;
}

template<typename T>
void myPrint(T a, T b) 
{ 
	cout << "调用的模板" << endl;
}

template<typename T>
void myPrint(T a, T b, T c) 
{ 
	cout << "调用重载的模板" << endl; 
}

void test01()
{
	//1、如果函数模板和普通函数都可以实现，优先调用普通函数
	// 注意 如果告诉编译器  普通函数是有的，但只是声明没有实现，或者不在当前文件内实现，就会报错找不到
	int a = 10;
	int b = 20;
	myPrint(a, b); //调用普通函数

	//2、可以通过空模板参数列表来强制调用函数模板
	myPrint<>(a, b); //调用函数模板

	//3、函数模板也可以发生重载
	int c = 30;
	myPrint(a, b, c); //调用重载的函数模板

	//4、 如果函数模板可以产生更好的匹配,优先调用函数模板
	char c1 = 'a';
	char c2 = 'b';
	myPrint(c1, c2); //调用函数模板
}

int main() {

	test01();

	system("pause");

	return 0;
}
```

总结：<span style="background:#FFFF00;">既然提供了函数模板，最好就不要提供普通函数</span>，否则容易出现二义性



<br>

### 2.6 模板的局限性

**局限性：**模板的通用性并不是万能的

**例如：**

```C++
template<class T>
void f(T a, T b)
{ 
    a = b;
}
```

在上述代码中提供的赋值操作，如果传入的a和b是一个数组，就无法实现了



再例如：

```C++
template<class T>
void f(T a, T b)
{ 
    if(a > b) { ... }
}
```

在上述代码中，如果T的数据类型传入的是像`Person`这样的自定义数据类型，也无法正常运行。

因此，C++为了解决这种问题，提供模板的重载，可以为这些**特定的类型**提供**具体化的模板**



**示例：**

```C++
#include<iostream>
using namespace std;

#include <string>

class Person
{
public:
	Person(string name, int age)
	{
		this->m_Name = name;
		this->m_Age = age;
	}
	string m_Name;
	int m_Age;
};

//普通函数模板
template<class T>
bool myCompare(T& a, T& b)
{
	if (a == b)
	{
		return true;
	}
	else
	{
		return false;
	}
}


//具体化，显示具体化的原型和定意思以template<>开头，并通过名称来指出类型
//具体化优先于常规模板
template<> bool myCompare(Person &p1, Person &p2)
{
	if ( p1.m_Name  == p2.m_Name && p1.m_Age == p2.m_Age)
	{
		return true;
	}
	else
	{
		return false;
	}
}

void test01()
{
	int a = 10;
	int b = 20;
	//内置数据类型可以直接使用通用的函数模板
	bool ret = myCompare(a, b);
	if (ret)
	{
		cout << "a == b " << endl;
	}
	else
	{
		cout << "a != b " << endl;
	}
}

void test02()
{
	Person p1("Tom", 10);
	Person p2("Tom", 10);
	//自定义数据类型，不会调用普通的函数模板
	//可以创建具体化的Person数据类型的模板，用于特殊处理这个类型
	bool ret = myCompare(p1, p2);
	if (ret)
	{
		cout << "p1 == p2 " << endl;
	}
	else
	{
		cout << "p1 != p2 " << endl;
	}
}

int main() {

	test01();
	test02();

	system("pause");
	return 0;
}
```

总结：

* 利用具体化的模板，可以解决自定义类型的通用化
* 学习模板并不是为了写模板，而是在`STL`能够运用系统提供的模板



<br>

## 3 类模板

### 3.1 类模板语法

类模板作用：

建立一个通用类，类中的成员、数据类型可以不具体制定，用一个**虚拟的类型**来代表。



**语法：** 

```c++
template<typename T>
类
```

**解释：**

template  ---  声明创建模板

typename  --- 表面其后面的符号是一种数据类型，可以用class代替

T    ---   通用的数据类型，名称可以替换，通常为大写字母



**示例：**

```C++
#include <string>
//类模板
template<class NameType, class AgeType> 
class Person
{
public:
	Person(NameType name, AgeType age)
	{
		this->mName = name;
		this->mAge = age;
	}
	void showPerson()
	{
		cout << "name: " << this->mName << " age: " << this->mAge << endl;
	}
public:
	NameType mName;
	AgeType mAge;
};

void test01()
{
	// 指定NameType 为string类型，AgeType 为 int类型
	Person<string, int>P1("孙悟空", 999);
	P1.showPerson();
}

int main() {

	test01();

	system("pause");

	return 0;
}
```

总结：类模板和函数模板语法相似，在声明模板template后面加类，此类称为类模板



### 3.2 类模板与函数模板区别

类模板与函数模板区别主要有两点：

1. 类模板没有自动类型推导的使用方式
2. 类模板<span style="background:#FFFF00;">在模板参数列表中可以有默认参数</span>




**示例：**

```C++
#include <string>
//类模板
template<class NameType, class AgeType = int> 
class Person
{
public:
	Person(NameType name, AgeType age)
	{
		this->mName = name;
		this->mAge = age;
	}
	void showPerson()
	{
		cout << "name: " << this->mName << " age: " << this->mAge << endl;
	}
public:
	NameType mName;
	AgeType mAge;
};

//1、类模板没有自动类型推导的使用方式
void test01()
{
	// Person p("孙悟空", 1000); // 错误 类模板使用时候，不可以用自动类型推导
	Person <string ,int>p("孙悟空", 1000); //必须使用显示指定类型的方式，使用类模板
	p.showPerson();
}

//2、类模板在模板参数列表中可以有默认参数
void test02()
{
	Person <string> p("猪八戒", 999); //类模板中的模板参数列表 可以指定默认参数
	p.showPerson();
}

int main() {

	test01();

	test02();

	system("pause");

	return 0;
}
```

总结：

* 类模板使用只能用显示指定类型方式
* 类模板中的模板参数列表可以有默认参数



### 3.3 类模板中成员函数创建时机

类模板中成员函数和普通类中成员函数创建时机是有区别的：

* 普通类中的成员函数一开始就可以创建
* 类模板中的成员函数<span style="background:#FFFF00;">在调用时才创建</span>



```C++
class Person1
{
public:
	void showPerson1()
	{
		cout << "Person1 show" << endl;
	}
};

class Person2
{
public:
	void showPerson2()
	{
		cout << "Person2 show" << endl;
	}
};

template<class T>
class MyClass
{
public:
	T obj;

	//类模板中的成员函数，并不是一开始就创建的，而是在模板调用时再生成

	void fun1() { obj.showPerson1(); }
	void fun2() { obj.showPerson2(); }

};

void test01()
{
	MyClass<Person1> m;
	
	m.fun1();

	//m.fun2();//编译会出错，说明函数调用才会去创建成员函数
}

int main() {

	test01();

	system("pause");

	return 0;
}
```

总结：类模板中的成员函数并不是一开始就创建的，在调用时才去创建



### 3.4 类模板对象做函数参数

类模板实例化出的对象，向函数传参的方式



一共有三种传入方式：

1. 指定传入的类型   --- 直接显示对象的数据类型
2. 参数模板化           --- 将对象中的参数变为模板进行传递
3. 整个类模板化       --- 将这个对象类型 模板化进行传递



**示例：**

> `typeid(T).name()`：显示类型名

```C++
#include <string>
//类模板
template<class NameType, class AgeType = int> 
class Person
{
public:
	Person(NameType name, AgeType age)
	{
		this->mName = name;
		this->mAge = age;
	}
	void showPerson()
	{
		cout << "name: " << this->mName << " age: " << this->mAge << endl;
	}
public:
	NameType mName;
	AgeType mAge;
};

//1、指定传入的类型
void printPerson1(Person<string, int> &p) 
{
	p.showPerson();
}
void test01()
{
	Person <string, int >p("孙悟空", 100);
	printPerson1(p);
}

//2、参数模板化【函数模板】
template <class T1, class T2>
void printPerson2(Person<T1, T2>&p)
{
	p.showPerson();
	cout << "T1的类型为： " << typeid(T1).name() << endl;
	cout << "T2的类型为： " << typeid(T2).name() << endl;
}
void test02()
{
	Person <string, int >p("猪八戒", 90);
	printPerson2(p);
}

//3、整个类模板化
template<class T>
void printPerson3(T & p)
{
	cout << "T的类型为： " << typeid(T).name() << endl;
	p.showPerson();

}
void test03()
{
	Person <string, int >p("唐僧", 30);
	printPerson3(p);
}

int main() {

	test01();
	test02();
	test03();

	system("pause");

	return 0;
}
```

总结：

* 通过类模板创建的对象，可以有三种方式向函数中进行传参
* 使用比较广泛是第一种：<span style="background:#FFFF00;">指定传入的类型</span>



### 3.5 类模板与继承

当类模板碰到继承时，需要注意一下几点：

* 当子类继承的父类是一个类模板时，子类在声明的时候，要指定出父类中T的类型
* 如果不指定，编译器无法给子类分配内存
* 如果想灵活指定出父类中T的类型，子类也需变为类模板




**示例：**

```C++
template<class T>
class Base
{
	T m;
};

//class Son:public Base  //错误，c++编译需要给子类分配内存，必须知道父类中T的类型才可以向下继承
class Son :public Base<int> //必须指定一个类型
{
};
void test01()
{
	Son c;
}

//类模板继承类模板 ,可以用T2指定父类中的T类型
template<class T1, class T2>
class Son2 :public Base<T2>
{
public:
	Son2()
	{
		cout << typeid(T1).name() << endl;
		cout << typeid(T2).name() << endl;
	}
};

void test02()
{
	Son2<int, char> child1;
}


int main() {

	test01();

	test02();

	system("pause");

	return 0;
}
```

总结：如果父类是类模板，子类需要指定出父类中T的数据类型



### 3.6 类模板成员函数类外实现

学习目标：能够掌握类模板中的成员函数类外实现

```C++
#include <string>

//类模板中成员函数类外实现
template<class T1, class T2>
class Person {
public:
	//成员函数类内声明
	Person(T1 name, T2 age);
	void showPerson();

public:
	T1 m_Name;
	T2 m_Age;
};

//构造函数 类外实现
template<class T1, class T2>
Person<T1, T2>::Person(T1 name, T2 age) {
	this->m_Name = name;
	this->m_Age = age;
}

//成员函数 类外实现
template<class T1, class T2>
void Person<T1, T2>::showPerson() {
	cout << "姓名: " << this->m_Name << " 年龄:" << this->m_Age << endl;
}

void test01()
{
	Person<string, int> p("Tom", 20);
	p.showPerson();
}

int main() {

	test01();

	system("pause");

	return 0;
}
```

总结：类模板中成员函数类外实现时，需要<span style="background:#FFFF00;">加上模板参数列表</span>



### 3.7 类模板分文件编写

> 掌握类模板成员函数分文件编写产生的问题以及解决方式

问题：

* 类模板中成员函数创建时机是在调用阶段，导致分文件编写时链接不到


解决：

* 解决方式1：直接包含`.cpp`源文件
* 解决方式2：将声明和实现写到同一个文件中，并更改后缀名为.hpp，hpp是约定的名称，并不是强制




**示例：**

`person.hpp`中代码：

> `#pragma once` ：防止头文件重复包含

```C++
#pragma once
#include <iostream>
using namespace std;
#include <string>

template<class T1, class T2>
class Person {
public:
	Person(T1 name, T2 age);
	void showPerson();
public:
	T1 m_Name;
	T2 m_Age;
};

//构造函数 类外实现
template<class T1, class T2>
Person<T1, T2>::Person(T1 name, T2 age) {
	this->m_Name = name;
	this->m_Age = age;
}

//成员函数 类外实现
template<class T1, class T2>
void Person<T1, T2>::showPerson() {
	cout << "姓名: " << this->m_Name << " 年龄:" << this->m_Age << endl;
}
```



类模板分文件编写`.cpp`中代码

```C++
#include<iostream>
using namespace std;

//#include "person.h"
// 如果包含 "person.h"，编译器不会生成类模板成员函数，故链接出错

#include "person.cpp" //解决方式1，包含cpp源文件
//  如果包含 "person.cpp"，编译器先处理类模板成员函数的实现，又解析到cpp文件中包含的 "person.h"，故可解决
// 但此方法一般不用，一般不直接包含源码

//解决方式2，将声明和实现写到一起，文件后缀名改为.hpp
// hpp为约定俗成的，说明是类模板
#include "person.hpp"

void test01()
{
	Person<string, int> p("Tom", 10);
	p.showPerson();
}

int main() {

	test01();

	system("pause");

	return 0;
}
```

总结：主流的解决方式是第二种，将类模板成员函数写到一起，并将后缀名改为.hpp



### 3.8 类模板与友元

> 掌握类模板配合友元函数的类内和类外实现

全局函数类内实现 - 直接在类内声明友元即可

全局函数类外实现 - 需要提前让编译器知道全局函数的存在



**示例：**

> 注意：在类内，而非`public`下的函数，也是全局函数

```C++
#include <string>

//2、全局函数配合友元  类外实现 - 先做函数模板声明，下方在做函数模板定义，在做友元
template<class T1, class T2> class Person;

//如果声明了函数模板，可以将实现写到后面，否则需要将实现体写到类的前面让编译器提前看到
//template<class T1, class T2> void printPerson2(Person<T1, T2> & p); 

template<class T1, class T2>
void printPerson2(Person<T1, T2> & p)
{
	cout << "类外实现 ---- 姓名： " << p.m_Name << " 年龄：" << p.m_Age << endl;
}

template<class T1, class T2>
class Person
{
	//1、全局函数配合友元   类内实现
	friend void printPerson(Person<T1, T2> & p)
	{
		cout << "姓名： " << p.m_Name << " 年龄：" << p.m_Age << endl;
	}


	//全局函数配合友元  类外实现------这是一个模板函数的声明！！
    //-->加空参数列表
    // 如果是全局函数的类外实现，需要让编译器提前知道这个函数的存在！
    // 即要么代码在前，要么提前再声明
	friend void printPerson2<>(Person<T1, T2> & p);

public:

	Person(T1 name, T2 age)
	{
		this->m_Name = name;
		this->m_Age = age;
	}


private:
	T1 m_Name;
	T2 m_Age;

};

//1、全局函数在类内实现
void test01()
{
	Person <string, int >p("Tom", 20);
	printPerson(p);
}


//2、全局函数在类外实现
void test02()
{
	Person <string, int >p("Jerry", 30);
	printPerson2(p);
}

int main() {

	//test01();

	test02();

	system("pause");

	return 0;
}
```

总结：建议全局函数做<span style="background:#FFFF00;">类内实现，用法简单，而且编译器可以直接识别</span>



### 3.9 类模板案例

案例描述:  实现一个通用的数组类，要求如下：

* 可以对**内置数据类型以及自定义数据类型**的数据进行存储
* 将数组中的数据**存储到堆区**
* **构造函数**中可以传入数组的容量
* 提供对应的**拷贝构造函数**以及`operator=`防止浅拷贝问题
* 提供**尾插法和尾删法**对数组中的数据进行增加和删除
* 可以**通过下标的方式访问**数组中的元素
* 可以**获取**数组中当前元素个数和数组的容量



**示例：**

`myArray.hpp` 中代码

```C++
#pragma once
#include <iostream>
using namespace std;

template<class T>
class MyArray
{
public:
    
	//构造函数
	MyArray(int capacity)
	{
		this->m_Capacity = capacity;
		this->m_Size = 0;
		pAddress = new T[this->m_Capacity];
	}

	//拷贝构造
	MyArray(const MyArray & arr)
	{
		this->m_Capacity = arr.m_Capacity;
		this->m_Size = arr.m_Size;
		this->pAddress = new T[this->m_Capacity];
		for (int i = 0; i < this->m_Size; i++)
		{
			//如果T为对象，而且还包含指针，必须需要重载 = 操作符，因为这个等号不是 构造 而是赋值，
			// 普通类型可以直接= 但是指针类型需要深拷贝
			this->pAddress[i] = arr.pAddress[i];
		}
	}

	//重载= 操作符  防止浅拷贝问题
	MyArray& operator=(const MyArray& myarray) {

		if (this->pAddress != NULL) {
			delete[] this->pAddress;
            this->pAddress = NULL;
			this->m_Capacity = 0;
			this->m_Size = 0;
		}

		this->m_Capacity = myarray.m_Capacity;
		this->m_Size = myarray.m_Size;
		this->pAddress = new T[this->m_Capacity];
		for (int i = 0; i < this->m_Size; i++) {
			this->pAddress[i] = myarray[i];
		}
		return *this;
	}

	//重载[] 操作符  arr[0] 
    // T:返回值
    // T&：使得返回值可作为左值参加运算
	T& operator [](int index)
	{
		return this->pAddress[index]; //不考虑越界，用户自己去处理
	}

	//尾插法
	void Push_back(const T & val)
	{
		if (this->m_Capacity == this->m_Size)
		{
			return;
		}
		this->pAddress[this->m_Size] = val;
		this->m_Size++;
	}

	//尾删法
	void Pop_back()
	{
		if (this->m_Size == 0)
		{
			return;
		}
		this->m_Size--;
	}

	//获取数组容量
	int getCapacity()
	{
		return this->m_Capacity;
	}

	//获取数组大小
	int	getSize()
	{
		return this->m_Size;
	}


	//析构
	~MyArray()
	{
		if (this->pAddress != NULL)
		{
            // 删除的是数组！！！！
			delete[] this->pAddress;
			this->pAddress = NULL;
			this->m_Capacity = 0;
			this->m_Size = 0;
		}
	}

private:
	T * pAddress;  //指向一个堆空间，这个空间存储真正的数据
	int m_Capacity; //容量
	int m_Size;   // 大小
};
```



类模板案例—数组类封装.cpp中

```C++
#include "myArray.hpp"
#include <string>

void printIntArray(MyArray<int>& arr) {
	for (int i = 0; i < arr.getSize(); i++) {
		cout << arr[i] << " ";
	}
	cout << endl;
}

//测试内置数据类型
void test01()
{
	MyArray<int> array1(10);
	for (int i = 0; i < 10; i++)
	{
		array1.Push_back(i);
	}
	cout << "array1打印输出：" << endl;
	printIntArray(array1);
	cout << "array1的大小：" << array1.getSize() << endl;
	cout << "array1的容量：" << array1.getCapacity() << endl;

	cout << "--------------------------" << endl;

	MyArray<int> array2(array1);
	array2.Pop_back();
	cout << "array2打印输出：" << endl;
	printIntArray(array2);
	cout << "array2的大小：" << array2.getSize() << endl;
	cout << "array2的容量：" << array2.getCapacity() << endl;
}

//测试自定义数据类型
class Person {
public:
	Person() {} 
		Person(string name, int age) {
		this->m_Name = name;
		this->m_Age = age;
	}
public:
	string m_Name;
	int m_Age;
};

void printPersonArray(MyArray<Person>& personArr)
{
	for (int i = 0; i < personArr.getSize(); i++) {
		cout << "姓名：" << personArr[i].m_Name << " 年龄： " << personArr[i].m_Age << endl;
	}

}

void test02()
{
	//创建数组
	MyArray<Person> pArray(10);
	Person p1("孙悟空", 30);
	Person p2("韩信", 20);
	Person p3("妲己", 18);
	Person p4("王昭君", 15);
	Person p5("赵云", 24);

	//插入数据
	pArray.Push_back(p1);
	pArray.Push_back(p2);
	pArray.Push_back(p3);
	pArray.Push_back(p4);
	pArray.Push_back(p5);

	printPersonArray(pArray);

	cout << "pArray的大小：" << pArray.getSize() << endl;
	cout << "pArray的容量：" << pArray.getCapacity() << endl;

}

int main() {
	//test01();
	test02();
	system("pause");
	return 0;
}
```

总结：

能够利用所学知识点实现通用的数组



<br>

# 二 STL初识

## 1 STL的诞生

* 长久以来，软件界一直希望建立一种可重复利用的东西

* C++的**面向对象**和**泛型编程**思想，目的就是**复用性的提升**

* 大多情况下，数据结构和算法都未能有一套标准，导致被迫从事大量重复工作

* 为了建立数据结构和算法的一套标准，诞生了**STL**

  

<br>


## 2 STL基本概念

* STL【Standard Template Library，标准模板库】
* STL 从广义上分为：容器(container)、算法(algorithm)、迭代器(iterator)
* 容器和算法之间通过迭代器进行无缝连接。
* STL 几乎所有的代码都采用了模板类或者模板函数



<br>

## 3 STL六大组件

STL大体分为六大组件，分别为：

1. 容器：各种数据结构，如vector、list、deque、set、map等，用来存放数据。
2. 算法：各种常用的算法，如sort、find、copy、for_each等
3. 迭代器：扮演了容器与算法之间的胶合剂。
4. 仿函数：行为类似函数，可作为算法的某种策略【重载小括号】
5. 适配器：一种用来修饰容器或者仿函数或迭代器接口的东西。
6. 空间配置器：负责空间的配置与管理。



<br>

## 4 STL中容器、算法、迭代器

> 容器：置物之所也

STL容器就是将运用最广泛的一些数据结构实现出来。常用的数据结构：数组、链表、树、栈、队列、集合、映射表等。这些容器分为**序列式容器**和**关联式容器**两种：

- ​	**序列式容器**：强调值的排序，序列式容器中的每个元素均有<span style="background:#FFFF00;">固定的位置</span>
- ​	**关联式容器**：二叉树结构，各元素之间<span style="background:#FFFF00;">没有严格的物理上的顺序关系</span>

> 算法：问题之解法也

有限的步骤，解决逻辑或数学上的问题，这一门学科叫做算法(Algorithms)。算法分为：**质变算法**和**非质变算法**。

- 质变算法：是指运算过程中会更改区间内的元素的内容。例如拷贝，替换，删除等等

- 非质变算法：是指运算过程中不会更改区间内的元素内容，例如查找、计数、遍历、寻找极值等等

> 迭代器在5.2中详解。



<br>

## 5 容器算法迭代器

### 5.1 vector存放多种数据类型并遍历

STL中最常用的容器为Vector，可以理解为数组。下面向这个容器中插入数据、并遍历这个容器。

- 容器：     `vector`

- 算法：     `for_each`

- 迭代器： `vector<int>::iterator`


**示例：**

```C++
#include <vector>
#include <algorithm>

void MyPrint(int val)
{
	cout << val << endl;
}

void test01() {

	//创建vector容器对象，并且通过模板参数指定容器中存放的数据的类型
	vector<int> v;
	//向容器中放数据
	v.push_back(10);
	v.push_back(20);

	//每一个容器都有自己的迭代器，迭代器是用来遍历容器中的元素
	//v.begin()返回迭代器，这个迭代器指向容器中第一个数据
	//v.end()返回迭代器，这个迭代器指向容器元素的【最后一个元素的下一个位置】
	//vector<int>::iterator 拿到vector<int>这种容器的迭代器类型

	vector<int>::iterator pBegin = v.begin();
	vector<int>::iterator pEnd = v.end();

	//第一种遍历方式：
	while (pBegin != pEnd) {
		cout << *pBegin << endl;
		pBegin++;
	}

	
	//第二种遍历方式：
	for (vector<int>::iterator it = v.begin(); it != v.end(); it++) {
		cout << *it << endl;
	}
	cout << endl;

	//第三种遍历方式：
	//使用STL提供标准遍历算法  头文件 algorithm
	for_each(v.begin(), v.end(), MyPrint);
}

int main() {
	test01();
	system("pause");
	return 0;
}
```

<br>

**示例：**在vector中存放自定义数据类型，并打印输出

```c++
#include <vector>
#include <string>

//自定义数据类型
class Person {
public:
	Person(string name, int age) {
		mName = name;
		mAge = age;
	}
public:
	string mName;
	int mAge;
};
//存放对象
void test01() {

	vector<Person> v;

	//创建数据
	Person p1("aaa", 10);
	Person p2("bbb", 20);
	Person p3("ccc", 30);

	v.push_back(p1);
	v.push_back(p2);
	v.push_back(p3);

	for (vector<Person>::iterator it = v.begin(); it != v.end(); it++) {
		cout << "Name:" << (*it).mName << " Age:" << (*it).mAge << endl;
	}
}

//放对象指针
void test02() {

	vector<Person*> v;

	//创建数据
	Person p1("aaa", 10);
	Person p2("bbb", 20);
	Person p3("ccc", 30);

	v.push_back(&p1);
	v.push_back(&p2);
	v.push_back(&p3);

	for (vector<Person*>::iterator it = v.begin(); it != v.end(); it++) {
		Person * p = (*it);
		cout << "Name:" << p->mName << " Age:" << (*it)->mAge << endl;
	}
}

int main() {
	test01();  
	test02();
	system("pause");
	return 0;
}
```

<br>

**示例：**Vector容器中嵌套容器，我们将所有数据进行遍历输出【如：二维数组】


```C++
#include <vector>

//容器嵌套容器
void test01() {
	vector< vector<int> >  v;

	vector<int> v1;
	vector<int> v2;
	vector<int> v3;

	for (int i = 0; i < 4; i++) {
		v1.push_back(i + 1);
		v2.push_back(i + 2);
		v3.push_back(i + 3);
	}

	//将容器元素插入到vector v中
	v.push_back(v1);
	v.push_back(v2);
	v.push_back(v3);

	for (vector<vector<int>>::iterator it = v.begin(); it != v.end(); it++) {
		for (vector<int>::iterator vit = (*it).begin(); vit != (*it).end(); vit++) {
			cout << *vit << " ";
		}
		cout << endl;
	}
}

int main() {
	test01();
	system("pause");
	return 0;
}
```

<br>

### 5.2 迭代器初识

> 可参考知乎文章：[此处](https://zhuanlan.zhihu.com/p/679934785)
>
> 迭代器时容器和算法之间粘合剂。

迭代器是一种特殊的对象，它能够遍历并指向容器中的元素。在C++中，迭代器的设计模拟了指针的行为【Pointers in C++】，使得程序员能够通过它们访问和操作数据。

例如，标准模板库（STL）中的 `std::vector` 容器有一个 `begin()` 方法，该方法返回一个指向容器第一个元素的迭代器。这是一个简单的例子：

```cpp
#include <vector>
#include <iostream>

int main() {
    std::vector<int> numbers = {1, 2, 3, 4, 5};
    auto it = numbers.begin();
    std::cout << *it << std::endl;  // 输出：1
}
```

在这里，`it` 是一个迭代器，通过解引用操作 `*it` 我们可以访问它所指向的元素的值。

迭代器类型通常依赖于其所属的容器。每种容器，如 `std::vector`, `std::list`, `std::set` 等都有其特定的迭代器类型 (Specific iterator types associated with them)。

> C++标准库提供了各种容器，每个容器都有与之关联的迭代器。这些迭代器都在 `<iterator>` 头文件中定义，可以在 [cppreference.com](https://en.cppreference.com/w/) 的 `std::iterator` 页面找到详细信息。

- 提供一种方法，使之能够依序寻访某个容器所含的各个元素，而又无需暴露该容器的内部表示方式。

- 每个容器都有自己专属的迭代器

- 迭代器使用非常类似于指针，初学阶段我们可以先理解迭代器为指针


迭代器种类：

| 种类           | 功能                                                     | 支持运算                                |
| -------------- | -------------------------------------------------------- | --------------------------------------- |
| 输入迭代器     | 对数据的只读访问                                         | 只读，支持++、==、！=                   |
| 输出迭代器     | 对数据的只写访问                                         | 只写，支持++                            |
| 前向迭代器     | 读写操作，并能向前推进迭代器                             | 读写，支持++、==、！=                   |
| 双向迭代器     | 读写操作，并能向前和向后操作                             | 读写，支持++、--，                      |
| 随机访问迭代器 | 读写操作，可以以跳跃的方式访问任意数据，功能最强的迭代器 | 读写，支持++、--、[n]、-n、<、<=、>、>= |

> 通过查看GCC实现的 [STL源代码](https://github.com/gcc-mirror/gcc/tree/master/libstdc++-v3/include/std) ，你可以更深入地了解这些迭代器的实现细节和工作原理。

常用的容器中迭代器种类为<span style="background:#FFFF00;">双向迭代器和随机访问迭代器</span>

<br>

### 5.3 标准容器的迭代器 

> 在 C++ 的世界里，迭代器扮演着桥梁的角色，它们连接了算法和容器，为我们提供了一种优雅、高效的方式来操作数据。在这一章节中，我们将深入探讨标准容器中的迭代器，并尝试揭示其背后的设计哲学和精妙之处。

值得注意的是，STL中实现的不同容器的迭代器可能存在其他可调用函数，如map容器的迭代器里有个`first` 和 `second`函数，分别指向键值和数值。

#### 5.3.1 `begin()` 和 `end()` 的使用

每一个标准容器，如 `vector`, `list`, `map` 等，都提供了 `begin()` 和 `end()` 方法来获取迭代器。`begin()` 返回指向容器第一个元素的迭代器，而 `end()` 返回指向容器最后一个元素之后的位置。这两个方法是我们在使用范围基于的 for 循环或者其他算法时的基石。

例如：

```cpp
#include <vector>
#include <iostream>

int main() {
    std::vector<int> vec = {1, 2, 3, 4, 5};
    for(auto it = vec.begin(); it != vec.end(); ++it) {
        std::cout << *it << " ";
    }
    return 0;
}
```

在这个示例中，`begin()` 和 `end()` 返回的是 `iterator` 类型（迭代器类型），允许我们修改元素的值。

> 正如《Effective STL》中所说：“理解迭代器和算法之间的关系是理解 STL 的关键。”（Understand the relationship between containers, iterators, and algorithms, and you're well on your way to mastering STL.）

<br>

#### 5.3.2 `cbegin()` 和 `cend()` 的引入和作用

为了提供更多的灵活性和安全性，C++ 标准库还提供了 `cbegin()` 和 `cend()` 方法。这两个方法无论容器是否为常量，总是返回 `const_iterator` 类型。

在GCC编译器的源码中，我们可以在 `libstdc++` 的实现中找到这些方法的定义。例如，在 `bits/stl_vector.h` 文件中，`cbegin()` 和 `cend()` 的实现确保了它们返回 `const_iterator` 类型。

这里是一个使用 `cbegin()` 和 `cend()` 的例子：

```cpp
#include <vector>
#include <iostream>

int main() {
    const std::vector<int> vec = {1, 2, 3, 4, 5};
    for(auto it = vec.cbegin(); it != vec.cend(); ++it) {
        std::cout << *it << " ";
    }
    return 0;
}
```

在这个示例中，`cbegin()` 和 `cend()` 返回 `const_iterator` 类型，因此元素的值不能被修改。

<br>

#### 5.3.3 常量和非常量容器中迭代器的表现

- 对于常量容器，`begin()` 和 `end()` 也会返回 `const_iterator` 类型。这是因为在常量容器上，我们不能修改其元素的值，这与 `cbegin()` 和 `cend()` 的行为一致。
- 然而，在非常量容器上，使用 `const auto&` 在范围基于的 for 循环中不会改变 `begin()` 和 `end()` 的返回类型。它们仍然返回 `iterator` 类型，但是元素的引用是常量。

以下是一个示例：

```cpp
#include <vector>
#include <iostream>

int main() {
    std::vector<int> vec = {1, 2, 3, 4, 5};
    for(const auto& elem : vec) {
        std::cout << elem << " ";
    }
    return 0;
}
```

在这里，即使我们使用 `const auto&`，`begin()` 和 `end()` 仍返回 `iterator` 类型，因为 `vec` 不是一个常量容器。

<br>

### 5.4 自定义容器和迭代器

在深入探索 C++ 迭代器的世界时，我们不仅需要了解标准库中的容器和迭代器，还需要探讨如何在自定义容器 (Custom Containers and Iterators)中实现和使用它们。

#### 5.4.1 实现自定义容器的 begin() 和 end()

要实现自定义容器，首先需要定义 `begin()` 和 `end()` 方法。这两个方法分别返回容器的开始和结束迭代器。

示例代码：

```cpp
template <typename T>
class MyContainer {
public:
    // 返回开始迭代器
    iterator begin() { return data_; }

    // 返回常量开始迭代器
    const_iterator begin() const { return data_; }

    // 返回结束迭代器
    iterator end() { return data_ + size_; }

    // 返回常量结束迭代器
    const_iterator end() const { return data_ + size_; }

private:
    T* data_;
    size_t size_;
};
```

在这个示例中，我们定义了一个简单的自定义容器。对于非常量容器，`begin()` 和 `end()` 返回 `iterator` 类型；对于常量容器，它们返回 `const_iterator` 类型。

<br>

#### 5.4.2 cbegin() 和 cend() 在自定义容器中的实现

在自定义容器中实现 `cbegin()` 和 `cend()` 同样是一个好的实践。

示例代码:

```cpp
template <typename T>
class MyContainer {
public:
    // ... 其他代码

    // 返回常量开始迭代器
    const_iterator cbegin() const { return data_; }

    // 返回常量结束迭代器
    const_iterator cend() const { return data_ + size_; }
};
```

在这个示例中，`cbegin()` 和 `cend()` 始终返回 `const_iterator` 类型，确保容器的元素不会被修改。

<br>

#### 5.4.3 与标准容器的比较

与标准容器相比，自定义容器允许更灵活的设计和实现。但也需要确保遵循一些基本原则，以保持代码的清晰和可维护。在 GCC 的源码中，我们可以清晰地看到 `std::vector` 的实现，每个方法和操作都经过精心设计，以实现最优的性能和安全性。

自定义容器与标准容器的对比：

| 特点   | 自定义容器   | 标准容器 |
| ------ | ------------ | -------- |
| 灵活性 | 高           | 低       |
| 安全性 | 取决于实现   | 高       |
| 性能   | 取决于实现   | 优化良好 |
| 兼容性 | 可能存在问题 | 良好     |

在创建自定义容器时，我们需要考虑这些方面，确保容器的可用性和效率。在实践中，通常建议优先使用标准容器，因为它们经过广泛测试和优化。但在需要特定功能或性能优化时，自定义容器成为了一个可行的选择。









c++ 里面的[map容器](https://so.csdn.net/so/search?q=map容器&spm=1001.2101.3001.7020)的迭代器里面 有个first 和 second，分别指向键值和数值
it.first就是在迭代器中获取map键值，it.second同理

<br>

# 三 `STL`常用容器

> 根据[此文章](https://zhuanlan.zhihu.com/p/691878178)扩展此章节。
>

Sequence containers【序列容器】

- array
- vector
- deque
- forward_list
- list

Container adaptors【容器适配器】

- stack
- queue
- priority_queue

Associative containers【关联容器】

- set
- multiset
- map
- multimap

Unordered associative containers【无序关联容器】

- unordered_set
- unordered_multiset
- unordered_map
- unordered_multimap

其他：

- String

<br>

## 1 `std::array`

> *Container properties: Sequence | Contiguous storage | Fixed-size aggregate*
>
> 容器属性：顺序容器（支持随机访问），连续内存空间，固定大小
>
> *类模板头：template < class T, size_t N > class array;*

`array` 即**数组**。其需要注意的点如下：

- 基本特点：大小固定，所有的元素严格按照内存地址线性排列，array 并不维护元素之外的任何多余数据【甚至也不会维护一个`size`这样的变量】。这保证了`array`在存储性能上和C++语法中的数组符号`[]`无异。
- 尽管其它大部分标准容器都可以通过 `std::allocator` 来动态的分配和回收内存空间，但 `Array` 并不支持这样做。

array 与其他容器相比，需要注意两个点：

- Array 和其它标准容器一个很重要的**不同**是：对两个 `array` 执行 `swap` 操作意味着真的会对相应 range 内的元素一一置换，因此其时间花销正比于置换规模。但同时，对两个 array 执行 swap 操作不会改变两个容器各自的迭代器的依附属性，这是由 array 的 swap 操作不交换内存地址决定的。
- Array 的另一个特性是：不同于其它容器，array 可以被当作 `std::tuple` 使用，因为 array 的头文件重载了`get()`以及`tuple_size()`和`tuple_element()`函数【注意这些函数非 array 的成员函数，而是外部函数】。

最后需要注意，虽然 array 和 C++语法中的`[]`符号无限接近，但两者是两个不同存在，array 毕竟是标准模板库的一员，是一个class，因此支持`begin(), end(), front(), back(), at(), empty(), data(), fill(), swap(), ...` 等等标准接口，而`[]`是真正的最朴素的数组。

> 安全性更高，如自动检测数组越界

```c++
#include <iostream>
#include <array>
using namespace std;

int main()
{
	array<int,6> stuID{1001,1002,1003,1004,1005,1006};
	array<int, 6> stuID1{ 1001,1002,1003,1004,1005,1006 };
	for (int a : stuID) {
		cout << a << endl;
	}
	// 该容器提供常见属性：.size() .fill(100) .at(1)等
	cout << "数组大小：" << stuID.size() << endl;
	cout << "是否相等：" << (stuID == stuID1) << endl;
}
```



<br>

## 2 [Vector容器](https://learn.microsoft.com/zh-cn/cpp/standard-library/vector?view=msvc-170)

### 2.1 `vector` 基本概念

功能：vector【向量】的数据结构和数组非常相似，也称为单端数组。

<span style="background:#FFFF00;font-weight: bold;">vector与普通数组区别：</span>

- 数组是静态空间；
- 而`vector`可以动态扩展。

<br>

<span style="background:#FFFF00;">关于动态扩展：</span>

* 并不是在原空间之后续接新空间，而是找更大的内存空间，然后将原数据拷贝新空间，释放原空间
* `vector`容器的迭代器是支持**随机访问的迭代器**

![](cppSTL-2-1.jpg)

<br>

### 2.2 `vector`构造函数和初始化

功能描述：创建vector容器，以下为vector的几种初始化及赋值方式：

（1）不带参数的构造函数初始化

```cpp
//初始化一个size为0的vector
vector<int> abc;
```

（2）带参数的构造函数初始化

```cpp
//初始化size,但每个元素值为默认值
vector<int> abc(10);    //初始化了10个默认值为0的元素
//初始化size,并且设置初始值
vector<int> cde(10，1);    //初始化了10个值为1的元素
```

（3）通过数组地址初始化

```cpp
int a[5] = {1,2,3,4,5};
//通过数组a的地址初始化，注意地址是从0到5（左闭右开区间）
vector<int> b(a, a+5);
```

（4）通过同类型的vector初始化【拷贝构造】

```cpp
vector<int> a(5,1);

//通过a初始化【重载等号操作符】：vector& operator=(const vector &vec);
vector<int> b(a);
vector<int> c(a.begin(), a.end());
```

（5）通过insert初始化

```cpp
//insert初始化方式将同类型的迭代器对应的始末区间（左闭右开区间）内的值插入到vector中
vector<int> a(6,6);
vecot<int> b;
//将a[0]~a[2]插入到b中，b.size()由0变为3
b.insert(b.begin(), a.begin(), a.begin() + 3);
```

insert也可通过数组地址区间实现插入

```cpp
int a[6] = {6,6,6,6,6,6};
vector<int> b;
//将a的所有元素插入到b中，同样是左闭右开区间
b.insert(b.begin(), a, a+6);
```

此外，insert还可以插入m个值为n的元素

```cpp
//在b开始位置处插入6个6
b.insert(b.begin(), 6, 6);
```

（6）通过copy函数赋值

```cpp
vector<int> a(5,1);
int a1[5] = {2,2,2,2,2};
vector<int> b(10);

/*将a中元素全部拷贝到b开始的位置中,注意拷贝的区间为a.begin() ~ a.end()的左闭右开的区间*/
copy(a.begin(), a.end(), b.begin());

//拷贝区间也可以是数组地址构成的区间
copy(a1, a1+5, b.begin() + 5);
```

（7）简写：使用数组直接初始化。

```cpp
//🔺直接赋值
vector<int> a{1,2,3,4};
vector<int> a = {1,2,3,4};
```

（8）通过assign函数赋值

```cpp
// 将 [beg, end) 区间中的数据拷贝赋值给本身
assign(beg, end);

// 将n个elem拷贝赋值给本身
assign(n, elem);
```



示例：


```C++
#include <vector>

void printVector(vector<int>& v) {
	for (vector<int>::iterator it = v.begin(); it != v.end(); it++) {
		cout << *it << " ";
	}
	cout << endl;
}

void test01()
{
	vector<int> v1; //无参构造
	for (int i = 0; i < 10; i++)
	{
		v1.push_back(i);
	}
	printVector(v1);

	vector<int> v2(v1.begin(), v1.end());
	printVector(v2);

	vector<int> v3(10, 100);
	printVector(v3);
	
	vector<int> v4(v3);
	printVector(v4);
}

int main() {
	test01();
	system("pause");
	return 0;
}
```

<br>

### 2.3 `vector` 数据存取

对`vector`中的数据的存取操作，涉及`Vector`的访问与遍历。

```cpp
// 🔺函数原型：（均为公开成员函数）
// 【返回索引idx所指的数据】
at(int idx);  

// 【返回索引idx所指的数据】
operator[];  

// 【返回容器中第一个数据元素】
front();  

// 【返回容器中最后一个数据元素】
back(); 

// 【返回指向内存中数组第一个元素的指针】
data(); 
```



示例：

```C++
#include <vector>

void test01()
{
	vector<int>v1;
	for (int i = 0; i < 10; i++)
	{
		v1.push_back(i);
	}

	for (int i = 0; i < v1.size(); i++)
	{
		cout << v1[i] << " ";
	}
	cout << endl;

	for (int i = 0; i < v1.size(); i++)
	{
		cout << v1.at(i) << " ";
	}
	cout << endl;

	cout << "v1的第一个元素为： " << v1.front() << endl;
	cout << "v1的最后一个元素为： " << v1.back() << endl;
}

int main() {
	test01();
	system("pause");
	return 0;
}
```

<br>

#### 2.3.1 三种访问方式

（1）使用下标运算符`[]`访问和修改： 返回对指定位置的元素的引用 pos。不执行边界检查。表明我们可以像使用数组一样使用 `vector`。

（2）使用迭代器访问， 迭代器类型如下：

```c++
// 返回一个迭代器（iterator），指向vector地第一个元素
const_iterator begin() const noexcept;  
// 返回一个迭代器，指向vector的最后一个元素的后一个位置
const_iterator end() const noexcept;	
// 返回一个迭代器，即先reverse再使用迭代器，自然是指向最后一个元素了
const_iterator rbegin() const noexcept;
// 返回一个迭代器， 指向第一个元素的前一个位置
const_iterator rend() const noexcept;
    
// 为保证元素不被修改，C++新增【常量迭代器】，该迭代器指向的值不可修改
const_iterator cbegin() const noexcept;  
const_iterator cend() const noexcept;
const_iterator crbegin() const noexcept;
const_iterator crend() const noexcept;
```


（3）使用 `at() `函数访问：

- `at` 通过边界检查访问指定的元素，返回对指定位置的元素的引用 pos，并进行边界检查。
- 如果 pos 不在容器范围内，则会引发类型为 `std::out_of_range` 的异常。

```c++
reference       at( size_type pos );
const_reference at( size_type pos ) const;
```

 （4）`data()` 访问 ：用于直接访问基础数组。

```c++
constexpr T* data() noexcept;                      (since C++20)
constexpr const T* data() const noexcept;          (since C++20)
```

- 返回值：指向基础元素存储的指针。对于非空容器，返回的指针等于第一个元素的地址。
- 如果 size() 为 0，则 data() 可能会或可能不会返回空指针。

<br>

#### 2.3.2 三种遍历方式

（1）下标遍历：顺序遍历，下标递增。

```c++
for(int i = 0; i < v.size(); i++){
	cout << v[i] <<' ';
}
```


（2）迭代器遍历：顺序遍历，使用正向迭代器。

```cpp
vector<string> v6 = { "hi","my","name","is","lee" };
for (vector<string>::iterator iter = v6.begin(); iter != v6.end(); iter++)
{
	cout << *iter << endl;
	//下面两种方法都都可以检查迭代器是否为空
	cout << (*iter).empty() << endl;
	cout << iter->empty() << endl; 
}

//逆序遍历，使用反向迭代器
for (vector<string>::reverse_iterator iter = v6.rbegin(); iter != v6.rend(); iter++)
{
	cout << *iter << endl;
}
```



（3）元素遍历【`for each`】：复制拷贝原`vector`的值，修改对象，原`vector`不改变

```cpp
#include <vector>
#include <iostream>
using namespace std;

int main()
{
	vector<int> v;
	for(auto c : v)
	{
		// v 中无数据，故无打印输出
		cout << c << ' ';
	}

	vector<int> demo(10);
	for(int i = 0; i < 10; ++i)
	{
		demo[i] = i + 10;
	}

	int i = 0;
	for(auto c : demo)
	{
		c = i;// 虽然没报错，但是c=i是不成立的，c是拷贝复制了demo中的元素
		i++;
		cout << c << " ";
	}
	// 输出：0 1 2 3 4 5 6 7 8 9
	//不能修改原demo的值
	cout << endl;

	demo.erase(demo.begin() + 1, demo.begin() + 3);
	for(auto c : demo)
	{
		cout << c << " ";
	}
	// 输出：10 13 14 15 16 17 18 19
	cout << endl;
}
```



<br>

### 2.4  查改

#### 2.4.1 vector容量和大小

以下为`vector`容器的容量和大小的操作。函数原型如下【均为公开成员函数】：

```cpp
// ①判断容器是否为空,即是否 begin () == end ()。
empty();

// ②容器的容量，返回当前存储空间能够容纳的元素数
size_type capacity() const noexcept;

// ③返回容器中元素的个数
size_type size() const noexcept

// ④返回可容纳的最大元素数
size_type max_size() const noexcept;

// ⑤重新指定容器的长度为num
//若容器变长，则以默认值填充新位置
//如果容器变短，则末尾超出容器长度的元素被删除
resize(int num);

// 重新指定容器的长度为num
//若容器变长，则以elem值填充新位置；
//如果容器变短，则末尾超出容器长度的元素被删除。
resize(int num, elem);

// ⑥通过释放未使用的内存减少内存的使用【c++11】
void shrink_to_fit();    //(since C++11)
```




**示例：**


```C++
#include <vector>

void printVector(vector<int>& v) {

	for (vector<int>::iterator it = v.begin(); it != v.end(); it++) {
		cout << *it << " ";
	}
	cout << endl;
}

void test01()
{
	vector<int> v1;
	for (int i = 0; i < 10; i++)
	{
		v1.push_back(i);
	}
	printVector(v1);
	if (v1.empty())
	{
		cout << "v1为空" << endl;
	}
	else
	{
		cout << "v1不为空" << endl;
		cout << "v1的容量 = " << v1.capacity() << endl;
		cout << "v1的大小 = " << v1.size() << endl;
	}

	//resize 重新指定大小 ，若指定的更大，默认用0填充新位置，可以利用重载版本替换默认填充
	v1.resize(15,10);
	printVector(v1);

	//resize 重新指定大小 ，若指定的更小，超出部分元素被删除
	v1.resize(5);
	printVector(v1);
}

int main() {
	test01();
	system("pause");
	return 0;
}

```

<br>

#### 2.4.2 vector 预留空间

为了减少vector在动态扩展容量时的扩展次数，可以使用此函数提前预留空间。

```cpp
reserve(int len); // 容器预留len个元素长度，预留位置不初始化，元素不可访问。
//void reserve(size_type new_cap );
```

示例：

```C++
#include <vector>

void test01()
{
	vector<int> v;

	//预留空间
	v.reserve(100000);

	int num = 0;
	int* p = NULL;
    // 指向首地址，如果存不下了肯定要进行内存扩展，首地址肯定会变化
	for (int i = 0; i < 100000; i++) {
		v.push_back(i);
		if (p != &v[0]) {
			p = &v[0];
			num++;
		}
	}
	cout << "num:" << num << endl;
}

int main() {
	test01(); 
	system("pause");
	return 0;
}
```

> 总结：如果数据量较大，可以一开始利用`reserve`预留空间

<br>

#### 2.4.3 查改：首尾元素的值

返回对容器中第一个/最后一个元素的**引用**，空容器调用 `back` 会导致[未定义的行为](https://en.cppreference.com/w/cpp/language/ub)。

```cpp
v.front();		//返回首个元素
v.front()++;	//对首个元素操作
v.back();		//返回最后一个元素
v.back() = 10;	//对最后一个元素操作
```



<br>

### 2.5 `Vector` 的插入与删除

#### 2.5.1 基础插入与删除

对`vector`容器进行插入、删除操作。函数原型如下：

```cpp
// 尾部插入和删除
//尾部插入元素ele
push_back(ele);

//删除最后一个元素
pop_back();

// insert 指定插入【注意： v.insert()复杂度很高，迫不得已不使用】
// ① 迭代器指向位置pos插入元素ele
iterator insert(const_iterator pos, ele);

// ② 迭代器指向位置pos插入count个元素ele
iterator insert(const_iterator pos, int count, ele);

// ③ 截取其他容器的区间插入，[first,last)为其他容器的迭代器
iterator insert(const_iterator pos, first, last);
    
// ④ 插入花括号集合
iterator insert(const_iterator pos,initlist);

// erase擦除：【v.erase() 复杂度很高，迫不得已不使用】
//删除迭代器指向的元素
erase(const_iterator pos);

//删除迭代器从start到end之间的元素
erase(const_iterator start, const_iterator end);

//删除容器中所有元素
clear();
```

**示例：**

```C++
#include <vector>
#include <array>

void printVector(vector<int>& v) {

	for (vector<int>::iterator it = v.begin(); it != v.end(); it++) {
		cout << *it << " ";
	}
    // 或
    //for (int i = 0; i < demo.size(); i++) {
    //    cout << demo[i] << " ";
    //}
	cout << endl;
}

//插入和删除
void test01()
{
	vector<int> v1;
	//尾插
	v1.push_back(10);
	v1.push_back(20);
	v1.push_back(30);
	v1.push_back(40);
	v1.push_back(50);
	printVector(v1);
    
	//尾删
	v1.pop_back();
	printVector(v1);
    
	//插入
	v1.insert(v1.begin(), 100);
	printVector(v1);

	v1.insert(v1.begin(), 2, 1000);
	printVector(v1);
    
    v1.insert(v1.begin(), 2, 1000);
	printVector(v1);
    
    v1.insert(v1.begin(), 2, 1000);
	printVector(v1);
    
	std::array<int,3> test{ 7,8,9 };
	v1.insert(v1.end(), test.begin(), test.end());
    printVector(v1);
    
	v1.insert(v1.end(), { 10,11 });
    printVector(v1);
 
	//删除
	v1.erase(v1.begin());
	printVector(v1);

	//清空
	v1.erase(v1.begin(), v1.end());
	v1.clear();
	printVector(v1);
}

int main() {
	test01();
	system("pause");
	return 0;
}
```



<br>

#### 2.5.2 原位构造：插入

为了在容器操作时尽可能的**减少构造函数的调用和内存的拷贝**，`C++11` 引入了 `emplace_back()` 的方法，该方法可以改善往容器内推入对象元素时的效率。相比`push_back`，可以节省一次拷贝构造函数的调用从而提高插入效率。

`C++11` 新标准引入了三个新成员：`emplace_front`、`emplace` 和 `emplace_back`，这些操作是直接构造而不是拷贝元素。这些操作分别对应 `push_front`、`insert` 和 `push_back`，允许将元素放置在容器头部、一个指定位置之前或容器尾部。

当调用 push 或 insert 成员函数时，我们将元素类型的对象传递给它们，这些对象被拷贝到容器中。而当我们调用一个 emplace 成员函数时，则是将参数传递给元素类型的构造函数。emplace 成员使用这些参数在容器管理的内存空间中直接构造元素。



① `emplace()` 函数：将新元素直接插入容器的 `pos` 之前。元素是通过 `std::allocator_traits::construct` 构造的，通常使用 placement-new 在容器提供的位置就地构造元素。参数 `args...` 作为 `std::forward < Args > ( args ) ...` 转发给构造函数。如果新的 size() 大于 capacity()，则所有迭代器和引用均无效。否则，只有插入点之前的迭代器和引用保持有效。

```cpp
template< class... Args > 
iterator emplace( const_iterator pos, Args&&... args );   // (since C++11)
```



② `emplace_back()`函数：`push_back()` 向容器尾部添加元素时，首先会创建这个元素，然后再将这个元素拷贝或者移动到容器中（如果是拷贝的话，事后会自行销毁先前创建的这个元素）；而 `emplace_back()` 在实现时，则是直接在容器尾部创建这个元素，省去了拷贝或移动元素的过程。

```cpp
template< class... Args >
reference emplace_back( Args&&... args );           // (since C++17)
```

不论处理基础数据，下面是处理对象的示例：

```cpp
#include <vector>
#include <string>
#include <iostream>
 
struct President
{
    std::string name;
    std::string country;
    int year;
 
    President(std::string p_name, std::string p_country, int p_year)
        : name(std::move(p_name)), country(std::move(p_country)), year(p_year)
    {
        std::cout << "I am being constructed.\n";
    }
    President(President&& other)
        : name(std::move(other.name)), country(std::move(other.country)), year(other.year)
    {
        std::cout << "I am being moved.\n";
    }
    President& operator=(const President& other) = default;
};
 
int main()
{
    std::vector<President> elections;
    std::cout << "emplace_back:\n";
    elections.emplace_back("Nelson Mandela", "South Africa", 1994);
 
    std::vector<President> reElections;
    std::cout << "\npush_back:\n";
    reElections.push_back(President("Franklin Delano Roosevelt", "the USA", 1936));
 
    std::cout << "\nContents:\n";
    for (President const& president: elections) {
        std::cout << president.name << " was elected president of "
                  << president.country << " in " << president.year << ".\n";
    }
    for (President const& president: reElections) {
        std::cout << president.name << " was re-elected president of "
                  << president.country << " in " << president.year << ".\n";
    }
}
 
//输出：
//emplace_back:
//I am being constructed.
 
//push_back:
//I am being constructed.
//I am being moved.
 
//Contents:
//Nelson Mandela was elected president of South Africa in 1994.
//Franklin Delano Roosevelt was re-elected president of the USA in 1936.
```



<br>

#### 2.5.3 C++20新增的库函数【删除】

`std::erase` 和 `std::erase_if` 都是在 C++20 标准中引入到标准库的。它们的出现主要是为了简化容器中元素的删除操作，避免了以往需要结合 `std::remove`（或 `std::remove_if`）与 `erase` 成员函数来实现元素删除的繁琐过程。

```cpp
template< class T, class Alloc, class U >
constexpr typename std::vector<T,Alloc>::size_type
    erase(std::vector<T,Alloc>& c, const U& value);      (1) (since C++20)
 
template< class T, class Alloc, class Pred >
constexpr typename std::vector<T,Alloc>::size_type
    erase_if(std::vector<T,Alloc>& c, Pred pred);        (2) (since C++20)
```

(1) 从容器中删除所有等于 value 的元素。相当于：

```cpp
// 把不等于 value 的元素移到容器前部，返回一个指向新的逻辑末尾的迭代器
auto it = std::remove(c.begin(), c.end(), value);
auto r = std::distance(it, c.end());// 计算两个迭代器之间的距离，也就是它们之间元素的数量
c.erase(it, c.end());
return r;
```

(2) 从容器中擦除所有满足谓词的元素。相当于:

```cpp
auto it = std::remove_if(c.begin(), c.end(), pred);
auto r = std::distance(it, c.end());
c.erase(it, c.end());
return r;
```

```cpp
#include <iostream>
#include <numeric>
#include <vector>
 
void print_container(const std::vector<char>& c)
{
    for (auto x : c) {
        std::cout << x << ' ';
    }
    std::cout << '\n';
}
 
int main()
{
    std::vector<char> cnt(10);
    std::iota(cnt.begin(), cnt.end(), '0');
 
    std::cout << "Init:\n";
    print_container(cnt);
 
    std::erase(cnt, '3');
    std::cout << "Erase \'3\':\n";
    print_container(cnt);
 
    auto erased = std::erase_if(cnt, [](char x) { return (x - '0') % 2 == 0; });
    std::cout << "Erase all even numbers:\n";
    print_container(cnt);
    std::cout << "In all " << erased << " even numbers were erased.\n";
}
 
//输出：
//Init:
//0 1 2 3 4 5 6 7 8 9 
//Erase '3':
//0 1 2 4 5 6 7 8 9 
//Erase all even numbers:
//1 3 7 9
//In all 5 even numbers were erased.
```



<br>

### 2.6 vector互换容器

实现两个容器内元素进行互换，可以达到实用的**收缩内存效果**。

> 对应大容量的`vector`，`resize`大小之后，容量依然很大，故巧用 `swap` 来收缩内存。

函数原型：

```cpp
swap(vec);  // 将vec与本身的元素
```

示例：

```C++
#include <vector>

void printVector(vector<int>& v) {

	for (vector<int>::iterator it = v.begin(); it != v.end(); it++) {
		cout << *it << " ";
	}
	cout << endl;
}

void test01()
{
	vector<int>v1;
	for (int i = 0; i < 10; i++)
	{
		v1.push_back(i);
	}
	printVector(v1);

	vector<int>v2;
	for (int i = 10; i > 0; i--)
	{
		v2.push_back(i);
	}
	printVector(v2);

	//互换容器
	cout << "互换后" << endl;
	v1.swap(v2);
	printVector(v1);
	printVector(v2);
}

void test02()
{
	vector<int> v;
	for (int i = 0; i < 100000; i++) {
		v.push_back(i);
	}

	cout << "v的容量为：" << v.capacity() << endl;
	cout << "v的大小为：" << v.size() << endl;

	v.resize(3);

	cout << "v的容量为：" << v.capacity() << endl;
	cout << "v的大小为：" << v.size() << endl;

	//收缩内存
    // 匿名对象：vector<int>(v)  【使用拷贝构造函数】
	vector<int>(v).swap(v); //匿名对象

	cout << "v的容量为：" << v.capacity() << endl;
	cout << "v的大小为：" << v.size() << endl;
}

int main() {

	test01();
	test02();

	system("pause");
	return 0;
}
```

<br>



# 2.7 vector二维数组

创建二维数组

```c++
vector<vector<int>> table(r, vector<int>(c))；
int row = table.size();          //获取行数
int column = table[0].size();    //获取列数
```

初始化

```c++
//方法一：定义时，直接初始化
//下面定义的是行数r，列为c的二维数组
vector<vector<int>> ans(r, vector<int>(c));
//下面定义的是行数r，列为c的二维数组，初始值为0
vector< vector<int> > a(r, vector<int>(c, 0)); 

//方法二：用resize来提前构建
//下面定义的是行数r，列数为c的二维数组，初始值为0【因为resize默认为0】
vector<vector<int>> new_mat(r);//注意这个r是不可缺少的，规定其有多少行
for(int i=0 ;i<r; i++) //二维vector的初始化时有要求的
{
   new_mat[i].resize(c);
}

//方法三：每行不一定几个数，就是想对每行的列进行操作
vector<vector<int>> mat(r);//每行的定义
mat[i].push_back(1);//这就是该第i-1行的插入一个元素，值为1

vector<vector<int>> v3(4);
v3.push_back(vector<int>{1, 2});
v3.push_back(vector<int>{2, 3});
v3.push_back(vector<int>{3, 4});
v3.push_back(vector<int>{1, 3});
```

<br>

### 2.8 两个关键字

(1)  `constexpr` 是 C++11 中新增的关键字，其语义是 "常量表达式"，也就是在编译期可求值的表达式。最基础的常量表达式就是字面值或全局变量/函数的地址或 sizeof 等关键字返回的结果，而其它常量表达式都是由基础表达式通过各种确定的运算得到的。 `constexpr` 值可用于 `enum`、`switch`、数组长度等场合。

`constexpr` 所修饰的变量一定是编译期可求值的，所修饰的函数在其所有参数都是 `constexpr` 时，一定会返回 constexpr。

```cpp
constexpr int Inc(int i) {
    return i + 1;
}

constexpr int a = Inc(1);         // ok
constexpr int b = Inc(cin.get()); // error!
constexpr int c = a * 2 + 1;      // ok
```

`constexpr` 的好处：

- 是一种很强的约束，更好地保证程序的正确语义不被破坏。
- 编译器可以在编译期对 constexpr 的代码进行非常大的优化，比如将用到的 constexpr 表达式都直接替换成最终结果等。
- 相比宏来说，没有额外的开销，但更安全可靠。

 

(2)  `noexcept` 关键字告诉编译器，函数中不会发生异常，这有利于编译器对程序做更多的优化。如果在运行时，`noexecpt` 函数向外抛出了异常（如果函数内部捕捉了异常并完成处理，这种情况不算抛出异常），程序会直接终止，调用 `std::terminate()` 函数，该函数内部会调用 `std::abort()` 终止程序。




<br>



## 3 `String`容器

### 3.1 `string` 基本概念

**本质：**`string`是C++风格的字符串，而string本质上是一个类

> 严格来说，string对象不属于容器类型，但是string支持很多与容器类型类似的操作。

**`string` 和 `char *` 区别：**

* `char *` 是一个指针
* `string`是一个类，类内部封装了`char*`，管理这个字符串，是一个`char*`型的容器。



**特点：**string 类内部封装了很多成员方法

- 例如：查找find，拷贝copy，删除delete 替换replace，插入insert
- string管理char*所分配的内存，不用担心复制越界和取值越界等，由类内部进行负责



### 3.2 `string` 构造函数

构造函数原型：

```cpp
//创建一个空的字符串 例如: string str;
string();   

//使用字符串s初始化
string(const char* s);

//使用一个string对象初始化另一个string对象
string(const string& str);  

//使用n个字符c初始化 
string(int n, char c);         
```

示例：

```C++
#include <string>
//string构造
void test01()
{
	string s1; //创建空字符串，调用无参构造函数
	cout << "str1 = " << s1 << endl;

	const char* str = "hello world";
	string s2(str); //把c_string转换成了string

	cout << "str2 = " << s2 << endl;

	string s3(s2); //调用拷贝构造函数
	cout << "str3 = " << s3 << endl;

	string s4(10, 'a');
	cout << "str3 = " << s3 << endl;
}

int main() {

	test01();
	system("pause");
	return 0;
}
```

总结：string的多种构造方式没有可比性，灵活使用即可

<br>

### 3.3 `string` 赋值操作

给`string`字符串进行赋值，赋值函数原型如下：

```cpp
//char*类型字符串赋值给当前的字符串
string& operator=(const char* s);  
string& assign(const char *s);  

//把字符串s赋给当前的字符串
string& operator=(const string &s);  
string& assign(const string &s);   

//字符赋值给当前的字符串
string& operator=(char c);           

//把字符串s的前n个字符赋给当前的字符串
string& assign(const char *s, int n);    

//用n个字符c赋给当前字符串
string& assign(int n, char c);
```

示例：

```C++
//赋值
void test01()
{
	string str1;
	str1 = "hello world";
	cout << "str1 = " << str1 << endl;

	string str2;
	str2 = str1;
	cout << "str2 = " << str2 << endl;

	string str3;
	str3 = 'a';
	cout << "str3 = " << str3 << endl;

	string str4;
	str4.assign("hello c++");
	cout << "str4 = " << str4 << endl;

	string str5;
	str5.assign("hello c++",5);
	cout << "str5 = " << str5 << endl;

	string str6;
	str6.assign(str5);
	cout << "str6 = " << str6 << endl;

	string str7;
	str7.assign(5, 'x');
	cout << "str7 = " << str7 << endl;
}

int main() {
	test01();
	system("pause");
	return 0;
}
```

> 总结：string的赋值方式很多，`operator=`  这种方式是比较实用的

<br>

### 3.4 `string` 字符串拼接

功能描述：实现在字符串末尾拼接字符串。

函数原型：

```cpp
//重载+=操作符
string& operator+=(const char c);
string& operator+=(const char* str);  
string& append(const char *s);  		//把字符串s连接到当前字符串结尾

string& operator+=(const string& str); 
string& append(const string &s); 

//把字符串s的前n个字符连接到当前字符串结尾
string& append(const char *s, int n);
 
//字符串s中从pos开始的n个字符连接到字符串结尾
string& append(const string &s, int pos, int n);
```

示例：


```C++
//字符串拼接
void test01()
{
	string str1 = "我";
	str1 += "爱玩游戏";
	cout << "str1 = " << str1 << endl;
	
	str1 += ':';
	cout << "str1 = " << str1 << endl;

	string str2 = "LOL DNF";
	str1 += str2;
	cout << "str1 = " << str1 << endl;

	string str3 = "I";
	str3.append(" love ");
	str3.append("game abcde", 4);
	//str3.append(str2);
	str3.append(str2, 4, 3); // 从下标4位置开始 ，截取3个字符，拼接到字符串末尾
	cout << "str3 = " << str3 << endl;
}
int main() {
	test01();
	system("pause");
	return 0;
}
```

> 总结：字符串拼接的重载版本很多，初学阶段记住几种即可

<br>

### 3.5 `string` 查找和替换

功能描述：

* 查找：查找指定字符串是否存在
* 替换：在指定的位置替换字符串

函数原型：

```cpp
//查找str第一次出现位置,从pos开始查找
int find(const string& str, int pos = 0) const;         
//查找s第一次出现位置,从pos开始查找
int find(const char* s, int pos = 0) const; 
//从pos位置查找s的前n个字符第一次位置
int find(const char* s, int pos, int n) const;  
//查找字符c第一次出现位置
int find(const char c, int pos = 0) const;     

//查找str最后一次位置,从pos开始查找
int rfind(const string& str, int pos = npos) const;     
//查找s最后一次出现位置,从pos开始查找
int rfind(const char* s, int pos = npos) const;  
//从pos查找s的前n个字符最后一次位置
int rfind(const char* s, int pos, int n) const; 
//查找字符c最后一次出现位置
int rfind(const char c, int pos = 0) const;

//替换从pos开始n个字符为字符串str
string& replace(int pos, int n, const string& str);        
//替换从pos开始的n个字符为字符串s
string& replace(int pos, int n,const char* s);  
```


示例：

```C++
//查找和替换
void test01()
{
	//查找
	string str1 = "abcdefgde";
	int pos = str1.find("de");

	if (pos == -1)
	{
		cout << "未找到" << endl;
	}
	else
	{
		cout << "pos = " << pos << endl;
	}
	pos = str1.rfind("de");
	cout << "pos = " << pos << endl;
}

void test02()
{
	//替换
	string str1 = "abcdefgde";
	str1.replace(1, 3, "1111");

	cout << "str1 = " << str1 << endl;
}

int main() {

	//test01();
	//test02();
	system("pause");
	return 0;
}
```

总结：

* `find`查找是从左往后，`rfind`从右往左
* `find`找到字符串后返回查找的第一个字符位置，找不到返回-1
* `replace`在替换时，要指定从哪个位置起，多少个字符，替换成什么样的字符串

<br>




### 3.6 `string` 字符串比较

功能描述：字符串之间的比较

比较方式：字符串比较是按字符的ASCII码进行对比，等于返回0，大于返回1，小于返回-1。

函数原型：

```cpp
//与字符串s比较
int compare(const string &s) const;
int compare(const char *s) const;     
```

示例：

```C++
//字符串比较
void test01()
{

	string s1 = "hello";
	string s2 = "aello";

	int ret = s1.compare(s2);

	if (ret == 0) {
		cout << "s1 等于 s2" << endl;
	}
	else if (ret > 0)
	{
		cout << "s1 大于 s2" << endl;
	}
	else
	{
		cout << "s1 小于 s2" << endl;
	}

}

int main() {

	test01();

	system("pause");

	return 0;
}
```

> 总结：字符串对比主要是用于比较两个字符串是否相等，判断谁大谁小的意义并不是很大

<br>

### 3.7 `string` 字符存取

`string`中单个字符 **存/取** 方式有两种：

```cpp
//通过[]方式取字符
char& operator[](int n);      
//通过at方法获取字符
char& at(int n);      
```

示例：

```C++
void test01()
{
	string str = "hello world";
	for (int i = 0; i < str.size(); i++)
	{
		cout << str[i] << " ";
	}
	cout << endl;

	for (int i = 0; i < str.size(); i++)
	{
		cout << str.at(i) << " ";
	}
	cout << endl;

	//字符修改
	str[0] = 'x';
	str.at(1) = 'x';
	cout << str << endl;	
}

int main() {
	test01();
	system("pause");
	return 0;
}
```

> 总结：string字符串中单个字符存取有两种方式，利用 [ ] 或 at

<br>

### 3.8 `string` 插入和删除

对`string`字符串进行插入和删除字符操作，函数原型如下：

```cpp
//插入字符串
string& insert(int pos, const char* s);  
string& insert(int pos, const string& str);  

//在指定位置插入n个字符c
string& insert(int pos, int n, char c);  

//删除从Pos开始的n个字符
string& erase(int pos, int n = npos);  

// 追加字符
void push_back(constr char ch);
```

示例：

```C++
//字符串插入和删除
void test01()
{
	string str = "hello";
	str.insert(1, "111");
	cout << str << endl;

	str.erase(1, 3);  //从1号位置开始3个字符
	cout << str << endl;
}

int main() {
	test01();
    system("pause");
	return 0;
}
```

> 总结：插入和删除的起始下标都是从0开始

<br>

### 3.9 `string` 子串

功能描述：从字符串中获取想要的子串

```cpp
//返回由pos开始的n个字符组成的字符串
string substr(int pos = 0, int n = npos) const;   
```


示例：

```C++
//子串
void test01()
{
	string str = "abcdefg";
	string subStr = str.substr(1, 3);
	cout << "subStr = " << subStr << endl;

	string email = "hello@sina.com";
	int pos = email.find("@");
	string username = email.substr(0, pos);
	cout << "username: " << username << endl;
}

int main() {
	test01();
	system("pause");
	return 0;
}
```

> 总结：灵活的运用求子串功能，可以在实际开发中获取有效的信息

<br>

### 3.10 `string` 的长度

1. 使用 `length()` 方法：`std::string` 类的 `length()` 成员函数专门用于返回字符串的长度（字符个数）。

```cpp
#include <iostream>
#include <string>

int main() {
    std::string str = "Hello, World!";
    int len = str.length();  // 获取长度
    int len2 = str.size();  // 返回 13
    std::cout << "长度: " << len << std::endl;  // 输出：13
    return 0;
}
```



2. 使用 `size()` 方法：`size()` 是 `std::string` 类的另一个成员函数，功能与 `length()` 完全一致，返回字符串的字符数量。

> 注：`length()` 和 `size()` 在 C++ 标准中是等价的，两者可以互换使用，通常 `size()` 更符合 STL 容器的命名习惯。



3. 使用 C 语言兼容的 `strlen()` 函数：如果需要兼容 C 语言，可以通过 `c_str()` 方法获取字符串的 C 风格指针（`const char*`），再用 `<cstring>` 头文件中的 `strlen()` 函数计算长度：

```cpp
#include <iostream>
#include <string>
#include <cstring>  // 包含 strlen()

int main() {
    std::string str = "Test";
    int len = strlen(str.c_str());  // c_str() 转换为 const char*
    std::cout << "长度: " << len << std::endl;  // 输出：4
    return 0;
}
```

> 注意：`strlen()` 只能用于以 `\0` 结尾的 C 风格字符串，且不包含 `\0` 本身。

<br>



### 3.11 其他

#### 3.10.1 string.c_str()

C++ string类型与C语言字符数组的转换 `std::string.c_str()`函数	

```c++
//c_str()函数返回一个指向正规C字符串的指针, 内容与本string串相同
const char *c_str();//搜索
//这是为了与c语言兼容，在c语言中没有string类型，故必须通过string类对象的成员函数c_str()把string 对象转换成c中的字符串样式。
```

注意：一定要使用`strcpy()`函数等来操作方法`c_str()`返回的指针

```c++
//比如：最好不要这样: 
char* c; 
string s="1234"; 
c = s.c_str(); //c最后指向的内容是垃圾，因为s对象被析构，其内容被处理

//应该这样用： c_str()返回的是一个临时指针，不能对其进行操作
char c[20]; 
string s="1234"; 
strcpy(c, s.c_str()); 

//再举个例子:c_str() 以 char* 形式传回 string 内含字符串
//如果一个函数要求char*参数，可以使用c_str()方法： 
string s = "Hello World!";
printf("%s", s.c_str()); //输出 "Hello World!"
```

<br>

#### 3.10.2 字符串复制strcpy

C++中的`strcpy()`函数将字符串从源复制到目标。其原型如下：

```c++
//函数返回目标的指针dest
char* strcpy（char* dest，const char* src）;
//它将src指向的字符串复制到dest指向的存储位置。空终止符也会被复制。

//在以下情况下，行为是不确定的：为dest指针分配的内存不够大
//示例
#include <cstring>
#include <iostream>
 
using namespace std;
 
int main()
{
    char src[] = "Hello AnxJing.AI!!!";
 
    /* Large enough to store content of src */
    char dest[20];
 
    strcpy(dest,src);
    cout << dest;
    return 0;
}
```


C++中的`strncpy()`函数将指定字节的字符从源字符复制到目标。其原型为：

```c++
//它将最多计数字符从指向的字符串复制到src指向的存储位置dest
//返回值：函数返回目标目标块的指针dest
char* strncpy(char* dest，const char* src，size_t count);
//count：要复制的最大字符数。
//如果计数小于长度src，将第一个字符复制到dest并且它不是以null终止的。
//如果count大于长度src，将src中的所有字符复制到dest并添加其他终止空字符，直到总共写入了计数字符为止。
//如果字符串重叠，则行为未定义
#include <cstring>
#include <iostream>
using namespace std;
 
int main()
{
    char src[] = "It's Monday and it's raining";
    char dest[40];
 
    /* count less than length of src */
    strncpy(dest,src,10);
    cout << dest << endl;//It's Monday
 
    /* count more than length of src */
    strncpy(dest,src,strlen(src)+10);
    cout << dest << endl;//It's Monday and it's raining
    return 0;
}
```

<br>

#### 3.10.3 字符串拼接strcat

`strcat`函数用于将源字符串连接到目标字符串的末尾。它的原型如下：

```c++
#include <cstring>

char* strcat(char* destination, const char* source);
//destination：目标字符串，连接后的结果将保存在此字符串中。
//source：源字符串，要连接到目标字符串末尾的内容。
```

strcat函数会将源字符串的内容逐个复制到目标字符串的末尾，直到遇到源字符串的结束符`\0`。连接后的目标字符串末尾会自动添加结束符。

<br>

#### 3.10.4 查找子串strstr

strstr() 函数用于在一个字符串中查找另一个子字符串的首次出现位置。其语法如下：

```c++
//返回值:如果找到子字符串，strstr() 函数返回包含子字符串第一个字符的字符串指针，否则返回NULL。
char *strstr(const char *str, const char *substr);
//- str：要搜索的字符串。
//- substr：要查找的子字符串。
```

**用法说明**

strstr() 函数使用 KMP 算法（Knuth-Morris-Pratt 算法）进行字符串匹配。它先对子字符串进行预处理，然后扫描字符串，从而提高了搜索效率。

**示例用法**

```c++
#include <iOStream>
#include <cstring>

using namespace std;

int main() {
  char str[] = "Hello, world!";
  char substr[] = ",";

  char *result = strstr(str, substr);

  if (result)
    cout << result << endl;//,world!
}
```

**注意事项**

- 位于库文件`cstring`，而非`string`中。
- strstr() 函数区分大小写。
- 如果子字符串为空，strstr() 函数将返回原始字符串的指针。
- 如果子字符串比字符串长，strstr() 函数将返回 NULL。

<br>



#### 3.10.5 `string`与`cstring`、`string.h`的区别：

- `<string.h>`是C版本的头文件，包含比如`strcpy`、`strcat`之类的字符串处理函数。

- `<string>`是C++标准定义的头文件，它定义了一个`string`的字符串类，里面包含了string类的各种操作，如`s.size()`, `s.erase()`, `s.insert()`等。但`<string>`又包含了老的C版本的字符串操作如`strcpy`、`strcat`等。【这就相当于，在`<string>`的文件中除了定义自己的`string`类之外，还加了一个`#include<string.h>`包含了C版本的字符串操作。
- `<cstring>`在C++标准化【1998年】过程中，为了兼容以前，标准化组织将所有这些文件都进行了新的定义，加入到了标准库中，加入后的文件名就新增了一个"c"前缀并且去掉了.h的后缀名，所以`string.h`头文件成了`cstring`头文件。【但是其实现却是相同的或是兼容以前的，这就是`<cstring>`的来源，不要觉得又多了一个东西。相当于标准库组织给它盖了个章，说“你也是我的标准程序库的一份子了”】。



<br>

<br>



## 4 deque容器

### 4.1 deque容器基本概念与原理

#### 4.1.1 `deque`初识

`vector`是单向开口的连续线性空间，`deque`是一种**双向开口**的连续线性空间。

- 双向开口就是说`deque`支持从头尾两端进行元素的插入和删除操作，相比于`vector`的扩容空间的方式，`deque`实际上更加贴切的实现了动态空间的概念。
- `deque`没有容量的概念，因为其存储空间是以分段连续空间组合而成，随时可以增加一段新的空间并连接起来。
- 由于要维护这种“整体连续”的假象，并提供随机存取的接口，避开重新配置、复制、释放的轮回，代价是复杂的迭代器结构。也就是说如果非必要的话，我们尽量使用`vector`。

`vector`和`list`在随机访问和插入删除的方面各有优劣，为均衡二者的特性，STL设计了一种容器叫做双端队列 `deque`。

双端队列`deque`（`double-ended queue`）是一种序列容器，允许在容器的两端高效地插入和删除元素，同时也支持随机访问。

> 双端表示可以在头尾两端进行插入和删除，且时间复杂度为`O(1)`。

![](cppSTL-2-2.jpg)

<br>

#### 4.1.2 `deque`内部工作原理

分块存储（分缓冲区存储）：`deque` 容器存储数据的空间是由一段一段等长的连续空间构成，各段空间之间并不一定是连续的，可以位于在内存的不同区域。

- `deque`内部有个**中控器**，其中的**中控指针数组**保存指向每个小连续空间`buffer`的地址，缓冲区中存放真实数据。
- 中控器维护的是每个缓冲区的地址，使得使用`deque`时像一片连续的内存空间。
- `deque`容器的迭代器也是支持随机访问的。

![](cppSTL-2-3.jpg)

从中控数组的中部开始使用，头插使用前面的`buffer`，尾插使用后面的`buffer`。头插就向前开辟，尾插就向后开辟。

- 头部操作无需挪动数据，头插头删效率高。
- 扩容只开辟buffer，空间浪费少。
- 中控数组扩容只拷贝指针，扩容代价低。
- 先计算所在buffer再计算buffer内位置，可以支持随机访问。

采用一块所谓的`map`作为主控，这里的`map`实际上是一块大小连续的空间，其中每一个元素我们称之为节点`node`，都指向了另一段连续线性空间（缓冲区，`deque`的真正存储空间主体）。

通过建立 `map` 数组，`deque` 容器申请的这些分段的连续空间就能实现“整体连续”的效果。换句话说，当`deque` 容器需要在头部或尾部增加存储空间时，它会申请一段新的连续空间，同时在 `map` 数组的开头或结尾添加指向该空间的指针，由此该空间就串接到了 `deque` 容器的头部或尾部。

> 如果单个buffer大小不固定，则需要迭代器支持随机访问，效率变低。

<br>

### 4.2 `deque`构造函数

* `deque<T>` deqT;                      //默认构造形式
* `deque(beg, end);`                  //构造函数将[beg, end)区间中的元素拷贝给本身。
* `deque(n, elem);`                    //构造函数将n个elem拷贝给本身。
* `deque(const deque &deq);`   //拷贝构造函数



> 形参为const时，函数体内的迭代器也必须时const，否则报错

**示例：**

```C++
#include <deque>
// 形参为const时，函数体内的迭代器也必须时const，否则报错
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
void printDeque(const deque<int>& d) 
{
	for (deque<int>::const_iterator it = d.begin(); it != d.end(); it++) {
		cout << *it << " ";

	}
	cout << endl;
}
//deque构造
void test01() {

	deque<int> d1; //无参构造函数
	for (int i = 0; i < 10; i++)
	{
		d1.push_back(i);
	}
	printDeque(d1);
	deque<int> d2(d1.begin(),d1.end());
	printDeque(d2);

	deque<int>d3(10,100);
	printDeque(d3);

	deque<int>d4 = d3;
	printDeque(d4);
}
void test02(){
    std::deque<int> dq1;                    // 空deque
    std::deque<int> dq2(3);                 // 3个默认值元素0 0 0 
    std::deque<int> dq3(3, 10);             // 10 10 10
    std::deque<int> dq4{ 1, 2, 3, 4, 5 };   // 初始化列表
    std::deque<int> dq4={ 1, 2, 3, 4, 5 };  // 同上
    std::deque<int> dq5(dq4);               // 拷贝构造1 2 3 4 5
    std::deque<int> dq6(std::move(dq2));     // 移动构造 dq2移动给dq6,dq2为空
    
    std::vector<int>arr = { 10,20,30 };
    std::deque<int>dq7(arr.begin(),arr.end());//迭代器初始化
}

int main() {
	test01();
    test02();
	system("pause");
	return 0;
}
```



<br>

### 4.3 `deque`赋值操作

```cpp
//重载等号操作符
deque& operator=(const deque &deq);          

//将[beg, end)区间中的数据拷贝赋值给本身。
assign(beg, end);    

// 将n个elem拷贝赋值给本身。
assign(n, elem);                                             
```

示例：

```C++
#include <deque>

void printDeque(const deque<int>& d) 
{
	for (deque<int>::const_iterator it = d.begin(); it != d.end(); it++) {
		cout << *it << " ";

	}
	cout << endl;
}
//赋值操作
void test01()
{
	deque<int> d1;
	for (int i = 0; i < 10; i++)
	{
		d1.push_back(i);
	}
	printDeque(d1);

	deque<int>d2;
	d2 = d1;
	printDeque(d2);

	deque<int>d3;
	d3.assign(d1.begin(), d1.end());
	printDeque(d3);

	deque<int>d4;
	d4.assign(10, 100);
	printDeque(d4);

}

int main() {
	test01();
	system("pause");
	return 0;
}
```



<br>

### 4.4 `deque` 大小操作

```cpp
//判断容器是否为空
deque.empty();                       

//返回容器中元素的个数
deque.size();                         

//重新指定容器的长度为num,若容器变长，则以默认值填充新位置
//如果容器变短，则末尾超出容器长度的元素被删除。
deque.resize(num);                              
//重新指定容器的长度为num,若容器变长，则以elem值填充新位置。
//如果容器变短，则末尾超出容器长度的元素被删除。
deque.resize(num, elem);    

//释放未使用的内存    
shrink_to_fit();	                                            
```

> 注意：`deque`没有容量的概念！

示例：

```C++
#include <deque>

void printDeque(const deque<int>& d) 
{
	for (deque<int>::const_iterator it = d.begin(); it != d.end(); it++) {
		cout << *it << " ";

	}
	cout << endl;
}

//大小操作
void test01()
{
	deque<int> d1;
	for (int i = 0; i < 10; i++)
	{
		d1.push_back(i);
	}
	printDeque(d1);

	//判断容器是否为空
	if (d1.empty()) {
		cout << "d1为空!" << endl;
	}
	else {
		cout << "d1不为空!" << endl;
		//统计大小
		cout << "d1的大小为：" << d1.size() << endl;
	}

	//重新指定大小
	d1.resize(15, 1);
	printDeque(d1);

	d1.resize(5);
	printDeque(d1);
}

int main() {
	test01();
	system("pause");
	return 0;
}
```

<br>

### 4.5 `deque` 插入和删除

```cpp
//两端插入操作：-------------------------------------
//尾插：在容器尾部添加一个数据，o(1)
push_back(elem);
emplace_back();//尾部原位构造
//头插：在容器头部插入一个数据，o(1)
push_front(elem);        
emplace_front();//头部原位构造

//尾删：删除容器最后一个数据，o(1)
pop_back();                   
//头删：删除容器第一个数据，o(1)
pop_front();   

//指定位置操作：-------------------------------------
//在pos位置插入一个elem元素的拷贝，返回新数据的位置。
insert(pos,elem);         
//在pos位置插入n个elem数据，无返回值。
insert(pos,n,elem);     
//在pos位置插入[beg,end)区间的数据，无返回值。
insert(pos,beg,end);    

//删除操作：----------------------------------------
//清空容器的所有数据
clear();                           
//删除[beg,end)区间的数据，返回下一个数据的位置。
erase(beg,end);             
//删除pos位置的数据，返回下一个数据的位置。
erase(pos);                    
```


示例：

```C++
#include <deque>

void printDeque(const deque<int>& d) 
{
	for (deque<int>::const_iterator it = d.begin(); it != d.end(); it++) {
		cout << *it << " ";

	}
	cout << endl;
}
//两端操作
void test01()
{
	deque<int> d;
	//尾插
	d.push_back(10);
	d.push_back(20);
	//头插
	d.push_front(100);
	d.push_front(200);

	printDeque(d);

	//尾删
	d.pop_back();
	//头删
	d.pop_front();
	printDeque(d);
}

//插入
void test02()
{
	deque<int> d;
	d.push_back(10);
	d.push_back(20);
	d.push_front(100);
	d.push_front(200);
	printDeque(d);

	d.insert(d.begin(), 1000);
	printDeque(d);

	d.insert(d.begin(), 2,10000);
	printDeque(d);

	deque<int>d2;
	d2.push_back(1);
	d2.push_back(2);
	d2.push_back(3);

	d.insert(d.begin(), d2.begin(), d2.end());
	printDeque(d);
}

//删除
void test03()
{
	deque<int> d;
	d.push_back(10);
	d.push_back(20);
	d.push_front(100);
	d.push_front(200);
	printDeque(d);

	d.erase(d.begin());
	printDeque(d);

	d.erase(d.begin(), d.end());
	d.clear();
	printDeque(d);
}

int main() {
	//test01();
	//test02();
    test03();
	system("pause");
	return 0;
}

```

<br>

### 4.6 `deque` 数据存取

> 与`vector`基本一致。
>

```cpp
//返回索引idx所指的数据
at(int idx);      
//返回索引idx所指的数据
operator[];       
//返回容器中第一个数据元素
front();             
//返回容器中最后一个数据元素
back();              
```

示例：

```C++
#include <deque>

void printDeque(const deque<int>& d) 
{
	for (deque<int>::const_iterator it = d.begin(); it != d.end(); it++) {
		cout << *it << " ";
	}
	cout << endl;
}

//数据存取
void test01()
{
	deque<int> d;
	d.push_back(10);
	d.push_back(20);
	d.push_front(100);
	d.push_front(200);

	for (int i = 0; i < d.size(); i++) {
		cout << d[i] << " ";
	}
	cout << endl;

	for (int i = 0; i < d.size(); i++) {
		cout << d.at(i) << " ";
	}
	cout << endl;

	cout << "front:" << d.front() << endl;
	cout << "back:" << d.back() << endl;
}

int main() {
	test01();
	system("pause");
	return 0;
}
```

<br>

### 4.7  `deque` 排序

```cpp
//对beg和end区间内元素进行排序
sort(iterator beg, iterator end)  
```

示例：

```C++
#include <deque>
#include <algorithm>

void printDeque(const deque<int>& d) 
{
	for (deque<int>::const_iterator it = d.begin(); it != d.end(); it++) {
		cout << *it << " ";
	}
	cout << endl;
}

void test01()
{
	deque<int> d;
	d.push_back(10);
	d.push_back(20);
	d.push_front(100);
	d.push_front(200);

	printDeque(d);
	sort(d.begin(), d.end());
	printDeque(d);
}

int main() {
	test01();
	system("pause");
	return 0;
}
```

> 对于支持随机访问的迭代器的容器，都可以利用sort算法直接对其排序



<br>

### 4.8 案例-评委打分

案例描述：有5名选手：选手ABCDE，10个评委分别对每一名选手打分，去除最高分，去除评委中最低分，取平均分。

实现步骤：

1. 创建五名选手，放到vector中
2. 遍历vector容器，取出来每一个选手，执行for循环，可以把10个评分打分存到deque容器中
3. sort算法对deque容器中分数排序，去除最高和最低分
4. deque容器遍历一遍，累加总分
5. 获取平均分



**示例代码：**

> 注意：<span style="background:#FFFF00;">对于容器的自定义函数，仅在具体的函数实现时，传入参数为 引用</span>

```C++
#include <iostream>
using namespace std;
#include <vector>
#include <string>
#include <deque>
#include <algorithm>
#include <ctime>

//选手类
class Person
{
public:
	Person(string name, int score)
	{
		this->m_Name = name;
		this->m_Score = score;
	}

	string m_Name; //姓名
	int m_Score;  //平均分
};

void createPerson(vector<Person>&v)
{
	string nameSeed = "ABCDE";
	for (int i = 0; i < 5; i++)
	{
		string name = "选手";
		name += nameSeed[i];

		int score = 0;

		Person p(name, score);

		//将创建的person对象 放入到容器中
		v.push_back(p);
	}
}

//打分
void setScore(vector<Person>&v)
{
	for (vector<Person>::iterator it = v.begin(); it != v.end(); it++)
	{
		//将评委的分数 放入到deque容器中
		deque<int>d;
		for (int i = 0; i < 10; i++)
		{
			int score = rand() % 41 + 60;  // 60 ~ 100
			d.push_back(score);
		}

		//cout << "选手： " << it->m_Name << " 打分： " << endl;
		//for (deque<int>::iterator dit = d.begin(); dit != d.end(); dit++)
		//{
		//	cout << *dit << " ";
		//}
		//cout << endl;

		//排序
		sort(d.begin(), d.end());

		//去除最高和最低分
		d.pop_back();
		d.pop_front();

		//取平均分
		int sum = 0;
		for (deque<int>::iterator dit = d.begin(); dit != d.end(); dit++)
		{
			sum += *dit; //累加每个评委的分数
		}

		int avg = sum / d.size();

		//将平均分 赋值给选手身上
		it->m_Score = avg;
	}

}

void showScore(vector<Person>&v)
{
	for (vector<Person>::iterator it = v.begin(); it != v.end(); it++)
	{
		cout << "姓名： " << it->m_Name << " 平均分： " << it->m_Score << endl;
	}
}

int main() {

	//随机数种子
	srand((unsigned int)time(NULL));

	//1、创建5名选手
	vector<Person>v;  //存放选手容器
	createPerson(v);

	//测试
	//for (vector<Person>::iterator it = v.begin(); it != v.end(); it++)
	//{
	//	cout << "姓名： " << (*it).m_Name << " 分数： " << (*it).m_Score << endl;
	//}

	//2、给5名选手打分
	setScore(v);

	//3、显示最后得分
	showScore(v);

	system("pause");

	return 0;
}
```

<br>

## 5 `stack`容器

### 5.1 stack 基本概念

`stack` 是一种容器适配器（`container adapter` ），专门用在具有 LIFO（ 后进先出 ）操作的上下文环境中，其删除只能从容器的一端进行元素的插入与提取操作。

![](cppSTL-2-4.jpg)

- 容器适配器，是将特定类封装作为其底层的容器，并提供一组特定的成员函数来访问其元素。
- 元素从特定容器的尾部（即栈顶）被压入和弹出，这被称为堆栈的顶。
- 标准容器 `vector`、`deque`、`list` 均符合这些需求，默认情况下，如果没有为 `stack` 指定特定的底层容器，默认情况下使用 `deque` 。
- 栈中只有顶端的元素才可以被外界使用，因此栈不允许有遍历行为。



<br>

### 5.2 `stack` 常用接口

构造函数：

```cpp
//stack采用模板类实现， stack对象的默认构造形式
stack<T> stk;  

//拷贝构造函数
stack(const stack &stk);            
```

赋值操作：

```cpp
//重载等号操作符
stack& operator=(const stack &stk);           
```

数据存取：

```cpp
//向栈顶添加元素
push(elem);      
//从栈顶移除第一个元素
pop();                

//返回栈顶元素
top();                 
```

大小操作：

```cpp
//判断堆栈是否为空
empty();

//返回栈的大小
size();               
```

示例：

```C++
#include <stack>

//栈容器常用接口
void test01()
{
	//创建栈容器 栈容器必须符合先进后出
	stack<int> s;

	//向栈中添加元素，叫做 压栈 入栈
	s.push(10);
	s.push(20);
	s.push(30);

	while (!s.empty()) {
		//输出栈顶元素
		cout << "栈顶元素为： " << s.top() << endl;
		//弹出栈顶元素
		s.pop();
	}
	cout << "栈的大小为：" << s.size() << endl;
}

int main() {
	test01();
	system("pause");
	return 0;
}
```

<br>

### 5.3 stack 的模拟实现

从栈的接口中可以看出，栈实际是一种特殊的 `vector`，因此使用 `vector` 完全可以模拟实现 `stack` 。

```cpp
#pragma once
 
//#include <vector>
#include <deque>
 
namespace xyl
{
    // T: 堆栈中存储的数据的类型
    // Container: 适配堆栈的容器类型，默认为deque
    template<class T, class Container = deque<T>>
    class stack
    {
    // stack 是一个Container适配(封装转换)出来的 把Contariner的尾部认为是栈顶
    public:
        stack()
        {}
 
        bool empty() const // 判空
        {
            return _con.empty();
        }
 
        size_t size() const // 获取有效元素的个数
        {
            return _con.size();
        }
 
        T& top()
		{
			return _con.back();
		}
 
        const T& top() const // 返回栈顶元素的引用
        {
            return _con.back();
        }
 
        void push(const T& x) // 压栈，尾插
        {
            _con.push_back(x);
        }
 
        void pop() // 出栈，尾删
        {
            _con.pop_back();
        }
 
        // C++11
		void swap(stack<T, Container>& st) // 交换两个容器的内容
		{
			// 注意：底层调用的是非成员函数 std::swap 来交换底层容器
			std::swap(_con, st._con);
		}
 
private:
    //vector<T> _con;
    Container _con; // 适配的容器
    };
 
    void test()
	{
		//stack<int, std::vector<int>> st; // 用vector适配
		//stack<int, std::list<int>> st;   // 用list适配
		stack<int> st; // 默认用deque适配
		st.push(1);
		st.push(2);
		st.push(3);
 
		// 遍历堆栈中的元素
		while (!st.empty())
		{
			cout << st.top() << " ";
			st.pop();
		}
		cout << endl;
	}
}
```

> 不需要写构造函数，因为在默认构造函数的初始化列表阶段，自定义类型成员 _con 会自动调用它的默认构造函数。
>



## 6 `queue` 容器

### 6.1 queue 基本概念

单向队列`queue`：是一种**先进先出**（First In First Out，FIFO）的数据结构，有两个出口。其逻辑结构是队列，物理结构可以是数组或链表，主要用于多线程之间的数据共享。

```cpp
 #include<queue>

template <class T, class _Container = deque<T>>
class queue{}
//第一个模板参数T：元素的数据类型。
//第二个模板参数_Container：底层容器的类型，缺省是std::deque，可以用std::list，还可以用自定义的类模板。
```

![](cppSTL-2-5.jpg)

**queue容器不支持迭代器（不允许遍历）：**

- 队列是一种遵循先进先出（FIFO）原则的数据结构，其主要操作为：
  1. 在队尾进行入队（push）操作以添加元素；
  2. 在队首进行出队（pop）操作以移除元素；
  3. 获取队首元素（front）；
  4. 判断队列是否为空（empty）等操作。
- 这些操作都是围绕着队列的两端进行的，重点在于按照元素进入队列的先后顺序来处理元素，而不是对队列中的所有元素进行遍历等操作，这与迭代器通常用于遍历容器中所有元素的使用场景不太相符。

- 在 C++ 标准库中，`std::queue`是一个容器适配器，它本身并不直接管理内存存储数据，而是通过适配其他底层容器（如`std::deque`、`std::list`等）来实现队列的功能。这意味着它利用了底层容器的存储和操作特性，同时为用户提供了统一的队列操作接口。

<br>

### 6.2 `queue` 常用接口

构造函数与赋值：

```cpp
//queue采用模板类实现，queue对象的默认构造形式，默认使用deque实现
queue<T> que;  
//拷贝构造函数
queue(const queue &que); 
//移动构造函数（C++11标准）
queue(queue<T>&& q);  
    
//重载运算符赋值操作
queue& operator=(const queue &que);   
```

数据存取：

```cpp
//元素入队
void push(const T& value);  。
//元素入队，用于原位构造元素。C++11
void emplace(…);

// 出队，删除队头的元素
void pop();   

// 返回队头元素
T &front(); 
// 返回队头元素，只读
const T &front();

// 返回队尾元素
T &back();  
// 返回队尾元素，只读
const T &back(); 
```

大小操作等其他操作：

```cpp
// 返回队列中元素的个数
size_t size() const;  
// 判断队列是否为空
bool empty() const;  

// 交换
void swap(queue<T> &q);  
// 重载==操作符
bool operator == (const queue<T> & q) const; 
// 重载!=操作符
4）bool operator != (const queue<T> & q) const; 
```

示例：

```C++
#include <queue>
#include <string>
class Person
{
public:
	Person(string name, int age)
	{
		this->m_Name = name;
		this->m_Age = age;
	}

	string m_Name;
	int m_Age;
};

void test01() {

	//创建队列
	queue<Person> q;

	//准备数据
	Person p1("唐僧", 30);
	Person p2("孙悟空", 1000);
	Person p3("猪八戒", 900);
	Person p4("沙僧", 800);

	//向队列中添加元素  入队操作
	q.push(p1);
	q.push(p2);
	q.push(p3);
	q.push(p4);

	//队列不提供迭代器，更不支持随机访问	
	while (!q.empty()) {
		//输出队头元素
		cout << "队头元素-- 姓名： " << q.front().m_Name 
              << " 年龄： "<< q.front().m_Age << endl;
        
		cout << "队尾元素-- 姓名： " << q.back().m_Name  
              << " 年龄： " << q.back().m_Age << endl;
        
		cout << endl;
		//弹出队头元素
		q.pop();
	}
	cout << "队列大小为：" << q.size() << endl;
}

int main() {
	test01();
	system("pause");
	return 0;
}
```



<br>

### 6.3 `queue` 模拟实现

```cpp
#pragma once
 
//#include <list>
#include <deque>
 
namespace xyl
{
    // T: 队列中存储的数据的类型
	// Container: 适配队列的容器类型，默认为deque
    template<class T, class Container = deque<T>>
    class queue
    {
    public:
        queue()
        {}
 
        bool empty() // 判空
		{
			return _con.empty();
		}
 
		size_t size() const // 获取有效元素的个数
		{
			return _con.size();
		}
 
		T& front()
		{
			return _con.front();
		}
 
        T& back()
		{
			return _con.back();
		}
 
		const T& front() const // 返回队头元素的引用
		{
			return _con.front();
		}
 
		const T& back() const // 返回队尾元素的引用
		{
			return _con.back();
		}
 
		void push(const T& val) // 入队，尾插
		{
			_con.push_back(val);
		}
 
		void pop() // 出队，头删
		{
			_con.pop_front();
		}
 
	private:
		Container _con; // 适配的容器
	};
 
	void test()
	{
		//queue<int, std::list<int>> q; // 用list适配
		queue<int> q; // 默认用deque适配
		q.push(1);
		q.push(2);
		q.push(3);
 
        // 遍历队列中的元素
		while (!q.empty())
		{
			cout << q.front() << " ";
			q.pop();
		}
		cout << endl;
	}
}
```

<br>

### 6.4 优先队列`priority_queue`

#### 6.4.1 优先队列初识

优先级队列相当于一个有权值的单向队列`queue`，在这个队列中，所有元素是按照优先级排列的。

- 它也是容器适配器，底层容器可以用`deque`和`list`。
- 不支持迭代器。
- `priority_queue`（优先队列）相对于queue（普通队列）主要多了基于优先级的排序功能，各种操作与queue容器相同。
- 根据严格的弱排序标准，它的第一个元素是他所包含的元素中最大的。本质上是一个堆，默认是大堆；如果要实现一个最小堆，可以自定义比较函数或使用 `greater`。

`priority_queue`的默认底层容器通常基于**二叉堆**来实现，以实现元素的自动排序。

- **核心优势**是能高效获取和删除优先级最高的元素（时间复杂度`O(log n)`）。
- **适用于**需要动态处理优先级任务的场景，使用时需注意默认是最大堆，如需小堆需显式指定比较器。

与`queue`的对比：

| 特性         | `queue`          | `priority_queue`           |
| ------------ | ---------------- | -------------------------- |
| 数据结构     | 队列（FIFO）     | 堆（按优先级排序）         |
| 元素取出顺序 | 先进先出         | 优先级最高的先出           |
| 访问方式     | 可访问队头和队尾 | **只能访问优先级最高元素** |
| 底层默认容器 | `deque`          | `vector`，堆使用其实现     |

示例代码：

```cpp
#include <iostream>
#include <queue>
#include <deque>
 
using  namespace std;
 
int main()
{
	priority_queue<char> q;
 
	q.push('A');    // 效率不高。
	q.emplace('P'); // 效率更高。
	q.push('Z');
	q.push('H');
 
	cout << "队列的大小为： " << q.size() << endl;
 
	while (q.empty() != false)
	{
		cout << q.top() << endl;
		q.pop();
		cout << "队列的大小为： " << q.size() << endl;
	}
	if (q.empty())
	{
		cout << "队列为空！" << endl;
	}
}
```

<br>

#### 6.4.2 优先队列常用接口

```cpp
empty();//判空
size();//查看大小
top();//查看堆顶元素🔺
push();//向堆中插入元素
pop();//删除堆顶元素
```

示例：

```cpp
#include <vector>
#include <queue>
#include <functional> // greater算法的头文件
 
void TestPriorityQueue()
{
    // 默认情况下，创建的是大堆，其底层按照小于符号(<)比较
    vector<int> v{3, 2, 7, 6, 0, 4, 1, 9, 8, 5};
    priority_queue<int> q1;
    for (auto& e : v)
    {
        q1.push(e);
    }
    cout << q1.top() << endl;
 
    // 如果要创建小堆，将第三个模板参数换成greater比较方式即可
    priority_queue<int, vector<int>, greater<int>> q2(v.begin(), v.end());
    cout << q2.top() << endl;
}
```

> 如果在 `priority_queue` 中放自定义类型的数据，用户需要在自定义类型中提供 `>` 或者`<` 的重载，或者通过用户提供的针对比较自定义类型对象大小的仿函数类，控制比较方式。

```cpp
class Date
{
public:
    Date(int year = 2023, int month = 1, int day = 1)
        : _year(year)
        , _month(month)
        , _day(day)
    {}
 
    bool operator<(const Date& d) const // < 运算符重载
    {
        return (_year < d._year)
        || (_year == d._year && _month < d._month)
        || (_year == d._year && _month == d._month && _day < d._day);
    }
 
    bool operator>(const Date& d) const // > 运算符重载
    {
        return (_year > d._year)
        || (_year == d._year && _month > d._month)
        || (_year == d._year && _month == d._month && _day > d._day);
    }
 
    friend ostream& operator<<(ostream& _cout, const Date& d) // << 运算符重载
    {
        _cout << d._year << "-" << d._month << "-" << d._day;
        return _cout;
    }
 
    friend struct DateLess; // 仿函数类声明为友元
 
private:
    int _year;
    int _month;
    int _day;
};
 
void test_priority_queue1()
{
    // 大堆，需要用户在自定义类型中提供<的重载
    priority_queue<Date> q1;
    q1.push(Date(2023, 9, 29));
    q1.push(Date(2023, 9, 28));
    q1.push(Date(2023, 9, 30));
    cout << q1.top() << endl; // 输出堆顶元素（最大日期）
 
    // 小堆，需要用户在自定义类型中提供>的重载
    priority_queue<Date, vector<Date>, greater<Date>> q2;
    q2.push(Date(2023, 9, 29));
    q2.push(Date(2023, 9, 28));
    q2.push(Date(2023, 9, 30));
    cout << q2.top() << endl; // 输出堆顶元素（最小日期）
}
 
// 定义按小于(<)比较自定义类型对象大小的仿函数类
struct DateLess
{
	bool operator()(const Date& d1, const Date& d2)
	{
		return (d1._year < d2._year) ||
			(d1._year == d2._year && d1._month < d2._month) ||
			(d1._year == d2._year && d1._month == d2._month && d1._day < d2._day);
	}
};
 
void test_priority_queue2()
{
    // 大堆，第3个模板参数传针对比较自定义类型对象大小的仿函数类DateLess
    priority_queue<Date, vector<Date>, DateLess> q1;
	q1.push(Date(2023, 9, 29));
	q1.push(Date(2023, 9, 28));
	q1.push(Date(2023, 9, 30));
	cout << q1.top() << endl; // 输出堆顶元素（最大日期）
}
```

<br>

#### 6.4.3 [优先队列的底层实现](https://cloud.tencent.com/developer/article/2458603)

内容补充：堆，实际上就是一个完全二叉树（可使用数组存储，依靠完全二叉树的访问性质实现随机访问，即左子节点的索引为父节点索引的两倍）。

> 假如一个二叉树有k层，并且这个树的前k-1层都是满树，第k层的叶子结点全部集中紧挨着在左边。

堆分为两类：1. 大根堆，2. 小根堆

- 大根堆的左右子树都是大根堆，小根堆的左右子树都是小根堆
- 堆中的结点总是不大于或不小于其父结点

堆的构建与维护可以使用以下函数维护：

1. `std::make_heap`：建堆
2. `std::push_heap`：插入元素
3. `std::pop_heap`：删除元素

具体的实现方式其实很容易理解：

- 堆的插入：把值插入到尾端，然后使用堆的向上调整算法，将堆的结构还原。
- 堆的删除（堆顶元素的删除）：先交换堆顶和堆尾元素，再删除交换前的堆顶元素，然后使用向下调整算法，将堆的结构还原。

▲优先队列的模拟实现如下：

```cpp
#pragma once
 
#include <iostream>
using namespace std;
 
#include <vector>
#include<functional>
// priority_queue--->堆
 
namespace xyl
{
    // Compare进行比较的仿函数 less->大堆
	template<class T>
	struct less
	{
		bool operator()(const T& left, const T& right)
		{
			return left < right;
		}
	};
 
    // Compare进行比较的仿函数 greater->小堆
	template<class T>
	struct greater
	{
		bool operator()(const T& left, const T& right)
		{
			return left > right;
		}
	};
 
    // T: 优先级队列中存储的数据的类型
	// Container: 适配优先级队列的容器类型，默认为vector
	// Compare: 仿函数类型，默认是Less(<)，建大堆(也可以用库中的greater和less类模板)
	template<class T, class Container = vector<T>, class Compare = std::less<T>>
	class priority_queue
	{
	public:
		// 创造空的优先级队列
		priority_queue()
		{}
 
        // 用迭代器区间[first,last)构造初始化
		template <class InputIterator>
		priority_queue(InputIterator first, InputIterator last)
		{
			while (first != last)
			{
				_con.push_back(*first); // 插入数据
				++first;
			}
			// 建堆，从倒数第一个非叶子节点开始向下调整
			int child = _con.size() - 1;
            int parent = (child - 1) / 2;
            for (int i = parent; i >= 0; i--)
			{
				adjust_down(i);
			}
		}
 
        // O(logN)
        // 向上调整，建大堆(小堆)
		void adjust_up(size_t child)
		{
			Compare com; // 仿函数对象
			size_t parent = (child - 1) / 2; // 计算出父亲下标
			while (child > 0)
			{
				//if (_con[child] > _con[parent])
				//if (_con[parent] < _con[child])
                
                // 如果父亲小于(大于)孩子，需要把孩子往上调
				if (com(_con[parent], _con[child]))
				{
					std::swap(_con[child], _con[parent]); // 交换孩子与父亲
					child = parent;
					parent = (child - 1) / 2;
				}
				else // 如果父亲大于(小于)孩子，说明已经是大(小)堆，不需要调整了
				{
					break;
				}
			}
		}
 
        // 向堆中插入一个元素
		void push(const T& x)
		{
			_con.push_back(x); // 尾插
			adjust_up(_con.size() - 1); // 从最后一个元素开始，向上调整
		}
 
        // O(logN)
        // 向下调整，建大堆(小堆)
		// 前提条件：左右子树都是大(小)堆
		void adjust_down(size_t parent)
		{
			Compare com; // 仿函数对象
			size_t child = parent * 2 + 1; // 计算出左孩子下标，默认左孩子最大
			while (child < _con.size()) // 孩子下标超过数组范围时结束
			{
                // 1、选出左右孩子最小的那个，先判断右孩子是否存在
                // 左孩子小于(大于)右孩子
				if (child + 1 < _con.size() && com(_con[child], _con[child + 1]))
				{
					child++; // 右孩子最大
				}
 
                // 2、最大的孩子与父亲比较
                // 父亲小于(大于)最大的孩子，需要把父亲往下调
				if (com(_con[parent], _con[child]))
				{
					std::swap(_con[child], _con[parent]); // 交换父亲与孩子
					parent = child;
					child = parent * 2 + 1;
				}
				else // 父亲大于(小于)最大的孩子，说明已经是大(小)堆，不需要调整了
				{
					break;
				}
			}
		}
 
        // 删除堆顶元素
		void pop()
		{
			std::swap(_con[0], _con[_con.size() - 1]); // 堆顶元素交换到尾部
			_con.pop_back(); // 尾删
			adjust_down(0); // 从堆顶开始，向下调整
		}
 
        // 返回堆顶元素，堆顶元素不允许修改，因为堆顶元素修改会破坏堆的特性
		const T& top()
		{
			return _con[0];
		}
 
        // 判空
		bool empty()  const
		{
			return _con.empty();
		}
 
        // 返回有效元素个数
		size_t size() const
		{
			return _con.size();
		}
 
	private:
		Container _con; // 成员变量，基础容器
	};
}
 
 
void test_queue_priority()
{
	xyl::priority_queue<int> q1;
	q1.push(5);
	q1.push(1);
	q1.push(4);
	q1.push(2);
	q1.push(3);
	q1.push(6);
	cout << q1.top() << endl;
 
	q1.pop();
	q1.pop();
	cout << q1.top() << endl;
 
	vector<int> v{5, 1, 4, 2, 3, 6};
	xyl::priority_queue<int, vector<int>, xyl::greater<int>> q2(v.begin(), v.end());
	cout << q2.top() << endl;
 
	q2.pop();
	q2.pop();
	cout << q2.top() << endl;
}
```

<br>

## 7 List容器

在 C++ STL 的序列容器中，`vector`因连续内存的**高效随机访问**成为 “常客”，但当遇到 “**频繁中间增删**” 场景时，它的性能短板会暴露无遗。而`list`—— 这个基于**双向链表**的容器，正是为解决这一痛点而生。

[C++数据结构之链表：核心组件、迭代器实现、异常安全实现、线程安全实现、性能优化、缓存优化](https://www.cnblogs.com/Daniel2025/articles/-/linked-list)

### 7.1 List 引入

` list`的底层是**带头结点的双向循环链表**，每个元素以 “**独立节点**” 形式存在，节点间**通过指针关联**，**内存中不连续存储**。

![](cppSTL-2-6.jpg)

> 双向：可以**正序**遍历也可以**逆序**遍历
>
> 循环：找尾结点的时间复杂度为`O(1)`
>
> 带头节点：①代码实现简单； ②存放`end()`迭代器，end是最后一个元素的下一个位置；

> 在 C++ 标准中，`std::list` 的底层实现被规范为**双向链表**，但并未强制要求是 “循环” 结构。具体是否采用循环形式，由编译器厂商决定，不同实现可能存在差异。
>
> 大多数主流编译器（如 GCC、Clang、MSVC）对 `std::list` 的实现采用**双向循环链表**。这种设计的优势在于：首尾节点可以通过指针直接相连（尾节点的 `next` 指向头节点，头节点的 `prev` 指向尾节点），使得插入、删除（尤其是在首尾位置）和遍历操作更加高效，无需额外判断边界条件。
>
> 例如，在双向循环链表中，`begin()` 可以直接指向首节点，`end()` 指向一个哨兵节点（或尾节点的下一个位置，通常是头节点），这样无论在头部还是尾部插入元素，都能通过统一的指针操作完成，避免了对空链表的特殊处理。
>
> 但需注意，标准仅规定 `std::list` 需支持双向迭代器和高效的首尾插入 / 删除，并未限定必须是循环结构。因此，从逻辑上可将 `std::list` 视为双向链表，而具体实现细节（是否循环）不影响其对外的接口和使用方式。

<br>

**（1）节点结构：`list` 的最小单元**

 一个`list`节点包含三个部分：**数据域**（存储元素值）、**前驱指针**（`prev`，指向前一个节点）、**后继指针**（`next`，指向后一个节点）。

模拟实现的节点结构代码：

```cpp
template <class T>
struct ListNode {
    T data;          // 存储元素的值
    ListNode* prev;  // 指向“前一个节点”的指针
    ListNode* next;  // 指向“后一个节点”的指针
 
    // 节点构造函数：初始化数据，前后指针默认空
    ListNode(const T& val) : data(val), prev(nullptr), next(nullptr) {}
};
```

<BR>

**（2）list 的整体结构：节点如何串联？**

`list`容器通过一个 “**头节点**”（`_head`，不存储实际数据）和 “**元素个数**”（`_size`）管理整个链表。

>  若为**双向循环链表**（如 GCC 的 STL 实现），尾节点的`next`会指向`_head`，`_head`的`prev`会指向尾节点，形成**闭环**，好处是 “定位尾节点无需遍历，直接`_head->prev`即可”。

<br>

**（3）与`vector`的区别**

- `vector` 是 动态数组（可随机访问，但插入/删除中间元素慢）
- `list` 是 双向链表（不能随机访问，但插入/删除快）

`list`的存在，不是为了 “替代 vector”，而是为了弥补 **vector 在 “中间增删” 场景下的低效** —— 这是 vector 的 “致命短板”。

- `vector` 的痛点：中间增删要 “搬家”
  -   `vector`的内存是连续的，当在中间插入 / 删除元素时，需要移动后续所有元素。
- `list` 的解决方案：增删只需 “改指针”
  - `list`的节点是独立的，插入 / 删除元素时，无需移动其他节点，只需修改相邻节点的`prev`和`next`指针，时间复杂度`O(1)`。

<br>

**（4）`list` 的特点**

- 优势：
  - 采用动态存储分配，不会造成内存浪费和溢出，无需扩容：
    - `list`的节点随用随申请，用完释放，不会像`vector`那样 “容量> 大小” 导致内存浪费；
  - 内存碎片化可控：虽然节点零散，但对于 “频繁增删” 场景，总内存开销通常低于`vector`的扩容冗余。
- 缺陷：虽然链表灵活，但是空间(指针域) 和 时间（遍历）额外耗费较大。

> **场景例子**：实现 “实时日志系统”—— 需要频繁在日志中间插入紧急记录、删除过期记录。用`list`处理 10 万条日志的中间增删，耗时仅为`vector`的 1/500（数据量越大，差距越明显）。

其他特性：

1. List有一个重要的性质，插入操作和删除操作都不会造成原有list迭代器的失效，这在`vector`是不成立的。
   - 对于`vector`，如果插入时原数组已满，需要重新分配空间，导致原迭代器失效
2. 由于链表的存储方式并不是连续的内存空间，因此链表`list`中的迭代器只支持前移和后移，属于**双向迭代器**。

<br>

**（5）总结**

1. list是可以在常数范围内在任意位置进行插入和删除的序列式容器，并且该容器可以前后双向迭代。
2. list的底层是双向循环链表结构，双向链表中每个元素存储在互不相关的独立节点中，在节点中通过指针指向其前一个元素和后一个元素。
3. `list`与`forward_list`非常相似：最主要的不同在于`forward_list`是单链表，只能向前迭代，以让其更简单高效。
4. 与其他的序列式容器相比(array，vector，deque)，list通常在任意位置进行插入、移除元素的执行效率更好。
5. 与其他序列式容器相比，list和`forward_list`最大的缺陷是不支持任意位置的随机访问，比如：要访问list的第6个元素，必须从已知的位置(比如头部或者尾部)迭代到该位置，在这段位置上迭代需要线性的时间开销；list还需要一些额外的空间，以保存每个节点的相关联信息(对于存储类型较小元素的大list来说这可能是一个重要的因素)

<br>

### 7.2  `List` 构造函数

```cpp
//函数原型：
//list采用采用模板类实现,对象的默认构造形式：
list<T> lst;    

//构造函数将[beg, end)区间中的元素拷贝给本身。
list(beg,end);  

//构造函数将n个elem拷贝给本身。
list(n,elem);     

//拷贝构造函数。
list(const list &lst);     
//赋值运算符重载
list& operator= (const list& x);
```

示例：

```C++
#include <list>

void printList(const list<int>& L) {

	for (list<int>::const_iterator it = L.begin(); it != L.end(); it++) {
		cout << *it << " ";
	}
	cout << endl;
}

void test01()
{
	list<int>L1;
	L1.push_back(10);
	L1.push_back(20);
	L1.push_back(30);
	L1.push_back(40);

	printList(L1);

	list<int>L2(L1.begin(),L1.end());
	printList(L2);

	list<int>L3(L2);
	printList(L3);

	list<int>L4(10, 1000);
	printList(L4);
}

int main() {
	test01();
	system("pause");
	return 0;
}
```

<br>

### 7.3 `List` 元素访问与迭代器

对`list`容器中数据进行存取。

> 注意：list没有提供 `operator[](size_t index)`方法，因为`list`是带头节点的双向循环链表，不支持随机访问。
>

```cpp
//函数原型：
//返回第一个元素。
reference front(); | const_reference front() const;
//返回最后一个元素。
reference back(); | const_reference back() const;
```

`List`的迭代器获取：

```cpp
//注意 ：以下这两组接口，每个都提供`const`和非`const`接口
//原因是`const`对象无法调用非`const`成员函数，因此需要提供`const`接口供`const`对象使用。
//begin && end
iterator begin(); | const_iterator begin() const;
iterator end(); | const_iterator end() const;
//begin:返回链表的第一个元素的位置
//end：返回链表的最后一个元素的下一个位置（这里就是头节点的位置）

//rbegin && rend
reverse_iterator rbegin(); | const_reverse_iterator rbegin() const;
reverse_iterator rend(); | const_reverse_iterator rend() const;
//rbegin：返回end的位置
//rend：返回begin的位置

//C++11 
// 注意：以下这两组接口的返回值指向的元素不可被修改！
//cbegin && cend 
const_iterator cbegin() const noexcept;//const迭代器
const_iterator cend() const noexcept;//const迭代器
//cbegin：返回链表的最后一个元素的位置
//cend：返回链表最后一个元素的下一个位置，也就是头节点的位置

crbegin && crend
const_reverse_iterator crbegin() const noexcept;//const反向迭代器
const_reverse_iterator crend() const noexcept;//const反向迭代器
//crbegin：返回cend的位置
//crend：返回crbegin的位置
```

**示例：**

```C++
#include <list>

//数据存取
void test01()
{
	list<int>L1;
	L1.push_back(10);
	L1.push_back(20);
	L1.push_back(30);
	L1.push_back(40);

	//cout << L1.at(0) << endl;//错误 不支持at访问数据
	//cout << L1[0] << endl; //错误  不支持[]方式访问数据
	cout << "第一个元素为： " << L1.front() << endl;
	cout << "最后一个元素为： " << L1.back() << endl;

	//list容器的迭代器是双向迭代器，不支持随机访问
	list<int>::iterator it = L1.begin();
	//it = it + 1;//错误，不可以跳跃访问，即使是+1
}
void TestIterators1()
{
	int array[] = { 1, 2, 3, 4, 5, 6, 7, 8, 9, 0 };
	list<int> l1(array, array + sizeof(array) / sizeof(array[0]));
	const list<int>l2(array, array + sizeof(array) / sizeof(array[0]));
    
	//测试begin&&end
	cout << "Before:" << endl;
	for (auto iter = l1.begin(); iter != l1.end(); ++iter)
	{
		cout << *iter << " ";
	}
	cout << endl;

	auto it1 = l1.begin();
	*it1 = 100;
	auto it2 = l2.begin();
	// *it2 = 100;//错误写法，l2被const修饰，因此只能调用const成员方法，因此也就无法通过迭代器修改元素的值
	++it2;

	cout << "After:" << endl;
	for (auto iter = l1.begin(); iter != l1.end(); ++iter)
	{
		cout << *iter << " ";
	}
	cout << endl;
	//测试rbegin && rend
	cout << "rbegin && rend:" << endl;
	for (auto iter = l1.rbegin(); iter != l1.rend(); ++iter)
	{
		cout << *iter << " ";
	}
	cout << endl;
}
void TestIterators2()
{
	int array[] = { 1, 2, 3, 4, 5, 6, 7, 8, 9, 0 };
	list<int> l1(array, array + sizeof(array) / sizeof(array[0]));
	const list<int>l2(array, array + sizeof(array) / sizeof(array[0]));
	//测试cbegin&&cend
	cout << "Before:" << endl;
	for (auto iter = l1.cbegin(); iter != l1.cend(); ++iter)
	{
		cout << *iter << " ";
	}//1 2 3 4 5 6 7 8 9 0
	cout << endl;

	auto it1 = l1.cbegin();
	// *it1 = 100;//错误写法，cbegin返回值指向的元素不可被修改

	//测试crbegin && crend
	cout << "rbegin && rend:" << endl;
	for (auto iter = l1.crbegin(); iter != l1.crend(); ++iter)
	{
		cout << *iter << " ";
	}//0 9 8 7 6 5 4 3 2 1
	cout << endl;
}

int main() {
	test01();
    TestIterators1();
    TestIterators2();
	system("pause");
	return 0;
}
```

<BR>

### 7.4 `List` 容量操作

```cpp
//empty：判空，空–true
bool empty() const;
//size–求链表有效元素个数
size_type size() const;

//list没有capacity和reserve方法

//将链表的有效元素调整为n个，记链表原来的有效元素个数为oldsize
//n > oldsize，多出来的结点使用val来填充
//n < oldsize,将链表的有效元素个数缩小至n
//n == oldsize 不做任何操作
void resize (size_type n, value_type val = value_type());
resize(num);                  
resize(num, elem);
```

示例：

```C++
#include <list>

void printList(const list<int>& L) {

	for (list<int>::const_iterator it = L.begin(); it != L.end(); it++) {
		cout << *it << " ";
	}
	cout << endl;
}

//大小操作
void test01()
{
	list<int>L1;
	L1.push_back(10);
	L1.push_back(20);
	L1.push_back(30);
	L1.push_back(40);

	if (L1.empty())
	{
		cout << "L1为空" << endl;
	}
	else
	{
		cout << "L1不为空" << endl;
		cout << "L1的大小为： " << L1.size() << endl;
	}

	//重新指定大小
	L1.resize(10);
	printList(L1);

	L1.resize(2);
	printList(L1);
}
void TestAssign()
{
	int array[] = { 1, 2, 4, 5, 5, 6, 56, 78, 65, 90 };
	list<int> l(array, array + sizeof(array) / sizeof(array[0]));

	int temp[] = { 100, 200, 300 };
	l.assign(temp, temp + sizeof(temp) / sizeof(temp[0]));

	l.assign(10, -100);
}

int main() {
	test01();
	system("pause");
	return 0;
}
```

<br>

### 7.5 `List` 赋值和交换

```cpp
//将[beg, end)区间中的数据拷贝赋值给本身。
template <class InputIterator>
void assign (InputIterator first, InputIterator last);

//使用n个值为val的元素重新构建新的容器
void assign (size_type n, const value_type& val); 

//将lst与本身的元素互换。
swap(lst);                         
```

示例：

```C++
#include <list>

void printList(const list<int>& L) {

	for (list<int>::const_iterator it = L.begin(); it != L.end(); it++) {
		cout << *it << " ";
	}
	cout << endl;
}

//赋值和交换
void test01()
{
	list<int>L1;
	L1.push_back(10);
	L1.push_back(20);
	L1.push_back(30);
	L1.push_back(40);
	printList(L1);

	//赋值
	list<int>L2;
	L2 = L1;
	printList(L2);

	list<int>L3;
	L3.assign(L2.begin(), L2.end());
	printList(L3);

	list<int>L4;
	L4.assign(10, 100);
	printList(L4);

}

//交换
void test02()
{

	list<int>L1;
	L1.push_back(10);
	L1.push_back(20);
	L1.push_back(30);
	L1.push_back(40);

	list<int>L2;
	L2.assign(10, 100);

	cout << "交换前： " << endl;
	printList(L1);
	printList(L2);

	cout << endl;

	L1.swap(L2);

	cout << "交换后： " << endl;
	printList(L1);
	printList(L2);

}

int main() {
	//test01();
	test02();
	system("pause");
	return 0;
}
```

<br>



### 7.6 list 插入和删除

函数原型：

```cpp
//头插 && 头删========================
//头插一个值为val的元素，时间复杂度O(1)
void push_front(const value_type& val);
//头删一个节点，O(1)
void pop_front();

//尾插 && 尾删========================
//尾插一个值为val的元素，O(1)
void push_back(const value_type& val);
//尾删，O(1)
void pop_back();

//任意位置插入=========================
//在pos位置插val元素的拷贝，返回新数据的位置。
iterator insert(iterator position, const value_type& val);
//在pos位置插入n个val数据，无返回值。
void insert(iterator position, size_type n, const value_type& val);
//在pos位置插入[first,last)区间的数据，无返回值。
template <class InputIterator>
void insert(iterator position, InputIterator first, InputIterator last);

//任意位置删除=========================
//删除position位置的元素
iterator erase(iterator position);
//删除区间[first,last)之间的元素
iterator erase(iterator first, iterator last);

//清空链表
void clear();
//交换两个链表
void swap (list& x);
//删除容器中所有与elem值匹配的元素。
remove(elem);
```

示例：

```C++
#include <list>

void printList(const list<int>& L) {

	for (list<int>::const_iterator it = L.begin(); it != L.end(); it++) {
		cout << *it << " ";
	}
	cout << endl;
}

//插入和删除
void test01()
{
	list<int> L;
	//尾插
	L.push_back(10);
	L.push_back(20);
	L.push_back(30);
	//头插
	L.push_front(100);
	L.push_front(200);
	L.push_front(300);

	printList(L);

	//尾删
	L.pop_back();
	printList(L);

	//头删
	L.pop_front();
	printList(L);

	//插入
	list<int>::iterator it = L.begin();
	L.insert(++it, 1000);
	printList(L);

	//删除
	it = L.begin();
	L.erase(++it);
	printList(L);

	//移除
	L.push_back(10000);
	L.push_back(10000);
	L.push_back(10000);
	printList(L);
	L.remove(10000);
	printList(L);
    
    //清空
	L.clear();
	printList(L);
}

int main() {

	test01();

	system("pause");

	return 0;
}
```

<br>

### 7.7 list 反转和排序

将容器中的元素反转，以及将容器中的数据进行排序

```cpp
//反转链表
reverse();
//链表排序
sort();  
```

示例：

```C++
void printList(const list<int>& L) {

	for (list<int>::const_iterator it = L.begin(); it != L.end(); it++) {
		cout << *it << " ";
	}
	cout << endl;
}

bool myCompare(int val1 , int val2)
{
	return val1 > val2;
}

//反转和排序
void test01()
{
	list<int> L;
	L.push_back(90);
	L.push_back(30);
	L.push_back(20);
	L.push_back(70);
	printList(L);

	//反转容器的元素
	L.reverse();
	printList(L);

	//排序
	L.sort(); //默认的排序规则 从小到大
	printList(L);

	L.sort(myCompare); //指定规则，从大到小
	printList(L);
}

int main() {
	test01();
	system("pause");
	return 0;
}
```

<br>

**🔺自定义排序规则：排序案例**

1. 案例描述：将Person自定义数据类型进行排序，Person中属性有姓名、年龄、身高

2. 排序规则：按照年龄进行升序，如果年龄相同按照身高进行降序


```C++
#include <list>
#include <string>
class Person {
public:
	Person(string name, int age , int height) {
		m_Name = name;
		m_Age = age;
		m_Height = height;
	}

public:
	string m_Name;  //姓名
	int m_Age;      //年龄
	int m_Height;   //身高
};


bool ComparePerson(Person& p1, Person& p2) {

	if (p1.m_Age == p2.m_Age) {
		return p1.m_Height  > p2.m_Height;
	}
	else
	{
		return  p1.m_Age < p2.m_Age;
	}

}

void test01() {

	list<Person> L;

	Person p1("刘备", 35 , 175);
	Person p2("曹操", 45 , 180);
	Person p3("孙权", 40 , 170);
	Person p4("赵云", 25 , 190);
	Person p5("张飞", 35 , 160);
	Person p6("关羽", 35 , 200);

	L.push_back(p1);
	L.push_back(p2);
	L.push_back(p3);
	L.push_back(p4);
	L.push_back(p5);
	L.push_back(p6);

	for (list<Person>::iterator it = L.begin(); it != L.end(); it++) {
		cout << "姓名： " << it->m_Name << " 年龄： " << it->m_Age 
              << " 身高： " << it->m_Height << endl;
	}

	cout << "---------------------------------" << endl;
	L.sort(ComparePerson); //排序

	for (list<Person>::iterator it = L.begin(); it != L.end(); it++) {
		cout << "姓名： " << it->m_Name << " 年龄： " << it->m_Age 
              << " 身高： " << it->m_Height << endl;
	}
}

int main() {
	test01();
	system("pause");
	return 0;
}
```

<br>

### 7.8 `forward_list` 单链表

⚠️C++11 引入的 `std::forward_list`。首先，请确保包含了头文件：

```cpp
#include <forward_list>
```

`std::forward_list` 是一个单向链表。它的设计目标是成为最轻量、内存效率最高的顺序容器。

为了实现这一目标，它在功能上做出了一些牺牲，比如不支持反向遍历，也没有 `size()` 方法。可以将其看作是 `std::list` 的一个更节省空间、但功能更受限的版本。


#### 7.8.1 构造函数

用于创建和初始化一个 `forward_list`，其构造函数与其它顺序容器类似。

```cpp
//创建一个空的 forward_list。
forward_list();
//创建包含 count 个 value 元素的 
forward_list(size_type count, const T& value);forward_list。
//创建包含 count 个值初始化元素的 forward_list。
forward_list(size_type count); 
// 使用迭代器范围 [first, last) 构造。
forward_list(InputIt first, InputIt last);
//拷贝构造函数
 forward_list(const forward_list& other); 
//移动构造函数
forward_list(forward_list&& other); 
//使用初始化列表构造。
forward_list(std::initializer_list<T> init); 

// 例如：
std::forward_list<int> flist = {10, 20, 30};
```



#### 7.8.2 迭代器 

用于遍历 `forward_list` 中的元素，这是它与 `list` 区别最显著的地方之一。

```CPP
//功能：返回指向 forward_list 第一个元素的迭代器。
begin();
cbegin();

//功能：返回指向 forward_list 尾端（最后一个元素的下一个位置）的迭代器。
end();
cend();

//功能：返回一个特殊的“首前”迭代器，它指向第一个元素之前的位置。
//这个迭代器对于在链表头部进行插入或删除操作至关重要。
before_begin();
cbefore_begin();
```


重要提示：

- forward_list 的迭代器是前向迭代器 (Forward Iterator)。你只能对其进行 ++ 操作，不能进行 -- 操作。

- 它没有反向迭代器，即没有 `rbegin()` 或 `rend()` 方法。

```CPP
std::forward_list<int> flist = {10, 20, 30};
for(auto it = flist.begin(); it != flist.end(); ++it) {
    std::cout << *it << " "; // 输出: 10 20 30
}
```



#### 7.8.3 大小

管理 forward_list 的大小。

```CPP
//功能：检查 forward_list 是否为空。
empty();

//功能：返回理论上能容纳的最大元素数量。
max_size();
```


重要提示：

`forward_list` 没有 `size()` 方法！

- 这是一个 deliberate 的设计选择，旨在保持每个节点最小的内存开销（不需要维护一个大小计数器）。
- 如果需要获取其大小，必须手动遍历，这是一个 O(n) 操作。



#### 7.8.4 修改器

`forward_list` 的修改器函数都带有 `_after` 后缀，反映了其单向链接的特性。

```CPP
//功能：在链表头部添加一个元素。O(1)。
push_front(const T& value);
emplace_front(...);
//功能：移除链表的第一个元素。O(1)。
pop_front();

//功能：在迭代器 pos 指向的位置之后插入元素。这是它的核心插入方法。
insert_after(const_iterator pos, ...);
//功能：在迭代器 pos 指向的位置之后就地构造一个元素。
emplace_after(const_iterator pos, ...);

//功能：移除迭代器 pos 指向位置之后的一个或多个元素。
erase_after(const_iterator pos);
erase_after(const_iterator first, const_iterator last);
```

重要提示：由于无法轻易获取前一个节点，所有在链表中间的操作都需要一个指向目标位置前一个元素的迭代器。`before_begin()` 正是用于在头部进行此类操作。



#### 7.8.5 特有的链表操作

与 `std::list` 类似，它也提供了一些高效的成员函数。

```CPP
//功能：拼接。
//将 other 中的节点移动到当前 forward_list 的 pos 位置之后。同样是高效的 O(1) 或 O(n)指针移动操作。
splice_after(const_iterator pos, forward_list& other, ...);

//功能同 list。
merge(forward_list& other); 
sort();//功能同 list。
unique();//功能同 list。
reverse();//功能同 list。
remove(const T& value); //功能同 list。
remove_if(UnaryPredicate p);//功能同 list。
```



#### 7.8.6 何时使用 std::forward_list？

`forward_list` 是一个高度特化的工具，适用于以下场景：

1. 对内存占用有极致要求。forward_list 的每个节点没有指向前一个节点的指针，因此比 std::list 更节省内存。

2. 当你处理海量数据，并且 std::list 的额外指针开销变得不可忽视时。

3. 你的算法只需要从头到尾的单向遍历和在头部或迭代器之后位置的插入/删除。


在绝大多数情况下，`std::vector` 或 `std::list` 是更实用、更方便的选择。只有在性能分析表明 `std::list` 的内存开销成为瓶颈时，才应考虑使用 `std::forward_list`。



<br>

## 8 `set` / `multiset` 容器

在 C++ STL（Standard Template Library，标准模板库）中，与`set`相关的容器主要包括`set`和`multiset` ，它们都属于关联式容器，基于**红黑树**实现，能高效地进行元素的插入、删除和查找操作。

### 8.1 `set` 容器

定义与头文件：

* `set`是一个包含唯一元素的关联式容器，其元素在插入时会自动进行排序（默认按升序，基于元素类型的`<`运算符）。
* 使用`set`需要包含`<set>`头文件，其模板参数为要存储的元素类型，例如`set<int>`表示存储整数的`set`容器，`set<string>`表示存储字符串的`set`容器。

```cpp
#include <set>
std::set<int> intSet;
```

<br>

🔺特性：

- **元素唯一性**：`set`不允许存储重复元素，当插入重复元素时，插入操作会被忽略，容器大小不变。
- **自动排序**：内部使用红黑树作为底层数据结构，保证了元素的有序性，插入和查找操作的平均时间复杂度为\(`O(log n)`)，n为容器中元素的个数。
- **迭代器**：`set`提供双向迭代器，支持正向遍历和反向遍历。由于元素是有序的，使用迭代器遍历时会按升序输出元素

> `set`与`multiset`的区别：后者允许容器中有重复的元素。

<br>

### 8.2 `set` 容器常用方法

#### 8.2.1 构造和赋值

创建`set`容器以及赋值，其构造函数与赋值函数如下：

```cpp
// 默认构造函数
set<T> st;     
// 拷贝构造函数
set(const set &st);  

// 重载等号操作符
set& operator=(const set &st);  
// 迭代器范围构造函数：通过一个已有的迭代器范围（如另一个容器的子范围）来构造set对象
std::set<int> iteratorRangeSet(vec.begin(), vec.end());
// 初始化列表构造函数：通过初始化列表来创建set对象，并初始化元素。
std::set<int> initListSet = {1, 2, 3, 4, 5};
```

示例：

```C++
#include <iostream>
#include <set>
#include <string>

void printSet(set<int> & s)
{
	for (set<int>::iterator it = s.begin(); it != s.end(); it++)
	{
		cout << *it << " ";
	}
	cout << endl;
}

//构造和赋值
void test01()
{
	set<int> s1;

	s1.insert(10);
	s1.insert(30);
	s1.insert(20);
	s1.insert(40);
	printSet(s1);

	//拷贝构造
	set<int>s2(s1);
	printSet(s2);

	//赋值
	set<int>s3;
	s3 = s2;
	printSet(s3);
}

// 自定义比较函数，用于按字符串长度排序
struct CompareByLength {
    bool operator()(const std::string& lhs, const std::string& rhs) const {
        return lhs.length() < rhs.length();
    }
};
 
void test02() {
    std::set<std::string, CompareByLength> customSortSet = {"apple", "banana", "cherry", "date"}; // 使用自定义比较函数创建set对象
 
    // 遍历并输出set中的元素
    for (const std::string& str : customSortSet) {
        std::cout << str << " ";
    }
    std::cout << std::endl;
}

int main() {
	test01();
    test02();
	system("pause");
	return 0;
}
```

<br>

#### 8.2.2 插入和删除

set容器进行插入数据和删除数据

```cpp
// 在容器中插入元素
// 插入单个元素，返回一个 std::pair 对象，其中：
// 第一个元素（pair.first）是 set<int>::iterator 类型的迭代器，指向插入的元素（如果插入成功），或者指向 set 中已存在的相同元素（如果插入失败）。
// 第二个元素（pair.second）是 bool 类型，表示插入是否成功。
// true：元素不存在于 set 中，插入成功。
// false：元素已存在于 set 中，插入失败。
pair<iterator, bool> insert(const value_type& value);//函数原型
insert(elem); 

//emplace方法：直接在容器中构造元素，避免临时对象的创建和复制，性能更优。
std::set<Person> mySet;
mySet.emplace("Alice", 30);

//-------------------------------------------------------------------
// 清除所有元素
clear();    
// 删除pos迭代器所指的元素，返回下一个元素的迭代器
erase(pos);   
// 删除区间[beg,end)的所有元素 ，返回下一个元素的迭代器
erase(beg, end); 
//删除容器中值为elem的元素
erase(elem);  
```

示例：

```C++
#include <set>

void printSet(set<int> & s)
{
	for (set<int>::iterator it = s.begin(); it != s.end(); it++)
	{
		cout << *it << " ";
	}
	cout << endl;
}

class Person {
public:
    std::string name;
    int age;
 
    Person(std::string name, int age){
        this->name = name;
        this->age = age;
    }
 
    // 需要定义 < 运算符，以便 set 可以对 Person 进行排序
    bool operator<(const Person& other) const {
        if (name != other.name) {
            return name < other.name;
        }
        return age < other.age;
    }
};

//插入和删除
void test01()
{
	set<int> s1;
	//插入
	s1.insert(10);
	s1.insert(30);
	s1.insert(20);
	s1.insert(40);
	printSet(s1);

	//删除
	s1.erase(s1.begin());
	printSet(s1);

	s1.erase(30);
	printSet(s1);

	//清空
	//s1.erase(s1.begin(), s1.end());
	s1.clear();
	printSet(s1);
    
    //案例：emplace插入---------------------------------------------
    std::set<Person> mySet;
    // 使用 emplace 插入单个元素
    mySet.emplace("Alice", 30);
    mySet.emplace("Bob", 25);
 
    // 尝试插入已存在的元素（根据我们的定义，name 和 age 都相同才算相同元素）
    auto result = mySet.emplace("Alice", 30);
    if (result.second) {
        std::cout << "Inserted Alice, 30 successfully." << std::endl;
    } else {
        std::cout << "Alice, 30 already exists in the set." << std::endl;
    }
 
    // 打印 set 中的元素
    std::cout << "Elements in the set: ";
    for (const auto& person : mySet) {
        std::cout << person.name << ", " << person.age << " ";
    }
    std::cout << std::endl;
}

int main() {
	test01();
	system("pause");
	return 0;
}
```

<br>

#### 8.2.3 查找和统计

对set容器进行查找数据以及统计数据：

```cpp
// 查找key是否存在,若存在，返回该键的元素的迭代器；若不存在，返回set.end();
find(key);   
// 统计key的元素个数（对于set容器，一般返回1或0）
count(key);    

//lower_bound方法：分别返回指向大于或等于给定元素的第一个元素的迭代器。
//upper_bound方法：指向大于给定元素的第一个元素的迭代器。
lower_bound(int val);
upper_bound(int val);
```

示例：

```C++
#include <set>

void test01()
{
	// 创建一个set容器并插入一些元素
	std::set<int> mySet = { 1, 2, 3, 4, 5 };

	// 使用find方法查找元素
	int valueToFind = 3;
	auto it = mySet.find(valueToFind);
	if(it != mySet.end())
	{
		std::cout << "Found " << valueToFind << " at position: " << *it << std::endl;
	}
	else
	{
		std::cout << valueToFind << " not found in the set." << std::endl;
	}

	// 使用count方法计算元素数量
	std::cout << "Count of " << valueToFind << ": " << mySet.count(valueToFind) << std::endl;

	// 使用lower_bound和upper_bound方法
	int lowerBoundValue = 3;
	int upperBoundValue = 4;
	auto lowerIt = mySet.lower_bound(lowerBoundValue);
	auto upperIt = mySet.upper_bound(upperBoundValue);
	// -1代表未找到
	std::cout << "Lower bound of " << lowerBoundValue << ": "
		<< (lowerIt != mySet.end() ? *lowerIt : -1) << std::endl;
	std::cout << "Upper bound of " << upperBoundValue << ": "
		<< (upperIt != mySet.end() ? *upperIt : -1) << std::endl;
}

int main()
{
	test01();
	system("pause");
	return 0;
}
```

<br>

#### 8.2.4 访问元素

set容器提供了通过迭代器和成员函数来访问元素的方法。

由于set容器中的元素是唯一的且有序的，因此不能直接通过下标来访问元素。但可以通过迭代器来遍历set容器中的元素。在C++11 及更高版本中，也可以使用范围 `for` 循环来遍历 `std::set` 容器中的元素。

```cpp
#include <iostream>
#include <set>
 
int main() {
    // 创建一个 std::set 容器，并插入一些整数元素
    std::set<int> mySet = {1, 3, 5, 7, 9, 2, 4, 6, 8, 0};
 
    // 使用迭代器来遍历 std::set 容器中的元素
    for (std::set<int>::iterator it = mySet.begin(); it != mySet.end(); ++it) {
        std::cout << *it << " ";
    }
    std::cout << std::endl;
 
    // 也可以使用范围 for 循环来遍历 std::set 容器中的元素（C++11 及更高版本）
    for (int elem : mySet) {
        std::cout << elem << " ";
    }
    std::cout << std::endl;
 
    return 0;
}
```



<br>

#### 8.2.5 容量操作与交换

set容器提供了一些容量相关的操作来管理和查询容器的大小。

```cpp
//返回容器中元素的数目
size();   
//返回set容器能够容纳元素的最大值（虽然set容器没有容量的概念，但这个方法可以返回一个理论上的最大值）
max_size();
//empty方法：判断容器是否为空。
empty();   

//交换操作:交换两个集合容器
swap(st);     
```

示例：

```C++
#include <iostream>
#include <set>

void test01()
{
	// 创建一个空的 std::set 容器
	std::set<int> mySet;

	// 使用 empty 方法判断容器是否为空
	if(mySet.empty())
	{
		std::cout << "The set is empty." << std::endl;
	}
	else
	{
		std::cout << "The set is not empty." << std::endl;
	}

	// 向 set 容器中添加一些元素
	mySet.insert(1);
	mySet.insert(2);
	mySet.insert(3);
	// 使用 size 方法返回容器当前元素的数量
	std::cout << "The set has " << mySet.size() << " elements." << std::endl;

	// 使用 max_size 方法返回 set 容器能够容纳元素的最大值
	// 注意：这个值通常非常大，表示理论上可以容纳的元素数量，而不是实际容量限制
	std::cout << "The maximum number of elements the set can hold is " << mySet.max_size() << "." << std::endl;
}

//交换
int test02()
{
    // 创建两个 std::set 容器，并插入一些元素
    std::set<int> set1 = { 1, 2, 3, 4, 5 };
    std::set<int> set2 = { 6, 7, 8, 9, 10 };

    // 打印交换前的容器内容
    std::cout << "Before swap:" << std::endl;
    std::cout << "set1: ";
    for(int elem : set1)
    {
        std::cout << elem << " ";
    }
    std::cout << std::endl;

    std::cout << "set2: ";
    for(int elem : set2)
    {
        std::cout << elem << " ";
    }
    std::cout << std::endl;

    // 使用 swap 方法交换两个容器的内容
    set1.swap(set2);

    // 打印交换后的容器内容
    std::cout << "After swap:" << std::endl;
    std::cout << "set1: ";
    for(int elem : set1)
    {
        std::cout << elem << " ";
    }
    std::cout << std::endl;

    std::cout << "set2: ";
    for(int elem : set2)
    {
        std::cout << elem << " ";
    }
    std::cout << std::endl;
}

int main() {
	//test01();
	test02();
	system("pause");
	return 0;
}
```

<br>

### 8.3 `set`应用场景

**`set`的应用场景**：

1. **去重操作**：set容器自动去重的特性使其成为处理去重问题的理想选择。

2. **快速查找**：set的查找操作时间复杂度为O(log n)，适用于需要快速查找的场景。

3. 集合运算：set支持并集、交集和差集等集合运算，适用于需要进行集合操作的场景。

4. 有序存储：set中的元素自动按顺序排列，适合需要有序存储的场景。

   

**`multiset`的应用场景**：

1. **统计元素出现次数**：在需要统计元素出现的次数，并且保留元素的有序性时，`multiset`非常适用，例如统计文本中每个单词出现的次数并按字典序输出。
2. **存储具有相同属性的多个对象**：当需要存储多个相同类型且具有相同属性的对象，并且希望它们保持有序时，可以使用`multiset`，如存储多个学生的成绩并按成绩排序。

<br>

### 8.4 `multiset`

`multiset`也是关联式容器，同样基于红黑树实现。

- `set` 和 `multiset` 的区别：

  * `set`插入数据的同时会返回插入结果，表示插入是否成功。因此，`set`存储无重复的数据。

  * `multiset`不会检测数据，因此可以插入重复数据。

- 使用`multiset`同样需要包含`<set>`头文件，其模板参数为要存储的元素类型，例如`multiset<int>`。

🔺特性：

- **元素可重复性**：`multiset`允许插入重复元素，因此在插入元素时，只要符合元素类型的要求，都会成功插入。
- **自动排序**：和`set`一样，`multiset`中的元素会自动排序，基于元素类型的`<`运算符进行升序排列。
- **迭代器**：提供双向迭代器，支持正向遍历和反向遍历，遍历时会按升序输出元素。

> 注意： `ret.second`的用法

**示例：**

```C++
#include <set>

//set和multiset区别
void test01()
{
	set<int> s;
	pair<set<int>::iterator, bool>  ret = s.insert(10);
	if (ret.second) {
		cout << "第一次插入成功!" << endl;
	}
	else {
		cout << "第一次插入失败!" << endl;
	}

	ret = s.insert(10);
	if (ret.second) {
		cout << "第二次插入成功!" << endl;
	}
	else {
		cout << "第二次插入失败!" << endl;
	}
    
	//multiset
	multiset<int> ms;
	ms.insert(10);
	ms.insert(10);

	for (multiset<int>::iterator it = ms.begin(); it != ms.end(); it++) {
		cout << *it << " ";
	}
	cout << endl;
}

int main() {
	test01();
	system("pause");
	return 0;
}
```

<br>

### 8.5 pair对组创建

成对出现的数据，利用对组可以返回两个数据。

**两种创建方式：**

* `pair<type, type> p ( value1, value2 );`
* `pair<type, type> p = make_pair( value1, value2 );`

```C++
#include <string>

//对组创建
void test01()
{
	pair<string, int> p(string("Tom"), 20);
	cout << "姓名： " <<  p.first << " 年龄： " << p.second << endl;

	pair<string, int> p2 = make_pair("Jerry", 10);
	cout << "姓名： " << p2.first << " 年龄： " << p2.second << endl;
}

int main() {

	test01();

	system("pause");

	return 0;
}
```

<br>

### 8.6 set容器排序

`set`容器默认排序规则为从小到大，可以利用仿函数修改排序规则。

> 仿函数，即重载小括号



**示例一**   set存放内置数据类型

```C++
#include <set>

class MyCompare 
{
public:
	bool operator()(int v1, int v2) {
		return v1 > v2;
	}
};
void test01() 
{    
	set<int> s1;
	s1.insert(10);
	s1.insert(40);
	s1.insert(20);
	s1.insert(30);
	s1.insert(50);

	//默认从小到大
	for (set<int>::iterator it = s1.begin(); it != s1.end(); it++) {
		cout << *it << " ";
	}
	cout << endl;

	//指定排序规则
	set<int,MyCompare> s2;
	s2.insert(10);
	s2.insert(40);
	s2.insert(20);
	s2.insert(30);
	s2.insert(50);

	for (set<int, MyCompare>::iterator it = s2.begin(); it != s2.end(); it++) {
		cout << *it << " ";
	}
	cout << endl;
}

int main() {
	test01();
	system("pause");
	return 0;
}
```



**示例二** set存放自定义数据类型

```C++
#include <set>
#include <string>

class Person
{
public:
	Person(string name, int age)
	{
		this->m_Name = name;
		this->m_Age = age;
	}

	string m_Name;
	int m_Age;

};
class comparePerson
{
public:
	bool operator()(const Person& p1, const Person &p2)
	{
		//按照年龄进行排序  降序
		return p1.m_Age > p2.m_Age;
	}
};

void test01()
{
	set<Person, comparePerson> s;

	Person p1("刘备", 23);
	Person p2("关羽", 27);
	Person p3("张飞", 25);
	Person p4("赵云", 21);

	s.insert(p1);
	s.insert(p2);
	s.insert(p3);
	s.insert(p4);

	for (set<Person, comparePerson>::iterator it = s.begin(); it != s.end(); it++)
	{
		cout << "姓名： " << it->m_Name << " 年龄： " << it->m_Age << endl;
	}
}
int main() {

	test01();
	system("pause");
	return 0;
}
```

<br>

### 8.7 `unordered_set`

**定义与头文件**：无序且元素唯一的容器，包含`<unordered_set>`头文件，例如`unordered_set<string>` 。

```cpp
#include <unordered_set>
std::unordered_set<string> myUnorderedSet;
```

🔺**特性**

- 元素唯一性：不允许重复元素。
- **无序性**：内部使用哈希表存储，元素没有顺序，遍历时元素顺序不确定。
- **单向迭代器**：提供单向迭代器。

**常用操作**：插入`insert()` 、查找`find()` 、删除`erase()` 、获取大小`size()` 、判断是否为空`empty()` 等。

**底层实现**：哈希表，插入、删除和查找的平均时间复杂度为\(O(1)\) ，但在最坏情况下（哈希冲突严重时）时间复杂度会退化为\(O(n)\) 。

**应用场景**：更注重元素的快速插入和查找，不关心元素顺序的场景，如判断一个 ID 是否在用户集合中。

<br>

### 8.8 `unordered_multiset`

**定义与头文件**：无序且允许元素重复的容器，包含`<unordered_set>`头文件，如`unordered_multiset<int>` 。

```cpp
#include <unordered_set>
std::unordered_multiset<int> myUnorderedMultiset;
```

🔺**特性**

- **元素可重复性**：允许插入重复元素。
- **无序性**：基于哈希表，元素无顺序。
- **单向迭代器**：提供单向迭代器。

**常用操作**：除基本操作外，可通过`count()`获取指定元素个数。

**底层实现**：哈希表，平均时间复杂度与`unordered_set`类似。

**应用场景**：适用于统计元素出现次数且不要求元素有序的场景，如统计网页中每个单词出现的次数。

<br>



## 9 `map `容器

`std::map` 是 C++ 标准模板库中的关联容器，它存储键值对并保持键的唯一性和有序性。

> `map` 容器、 `multimap` 容器、 `unordered_map` 容器

### 9.1 `map` 基本概念与特性

- **键值对存储**：每个元素是 `std::pair<const Key, T>`
- **键唯一性**：同一键只能出现一次
- **自动排序**：默认按键升序排列，可自定义比较器
- **底层实现**：通常基于红黑树（一种平衡二叉树），保证 O (log n) 操作复杂度
- **不可修改键**：键用于维护结构，不能直接修改

> `map`和`multimap`区别：`multimap`允许容器中有重复`key`值元素。

```cpp
#include <map>
#include <string>
 
// 基本声明
std::map<int, std::string> studentMap;
 
// 使用初始化列表
std::map<std::string, int> priceMap {
    {"apple", 1},
    {"banana", 0},
    {"orange", 2}
};
```

<br>


### 9.2  `map` 构造和赋值

功能描述：对map容器进行构造和赋值操作。

```cpp
map<T1, T2> mp;  		//map默认构造函数
map(const map &mp);     //拷贝构造函数

//重载等号操作符
map& operator=(const map &mp);  
```

示例：

```C++
#include <map>

void printMap(map<int,int>&m)
{
	for (map<int, int>::iterator it = m.begin(); it != m.end(); it++)
	{
		cout << "key = " << it->first << " value = " << it->second << endl;
	}
	cout << endl;
}

void test01()
{
	map<int,int>m; //默认构造
	m.insert(pair<int, int>(1, 10));
	m.insert(pair<int, int>(2, 20));
	m.insert(pair<int, int>(3, 30));
	printMap(m);

	map<int, int>m2(m); //拷贝构造
	printMap(m2);

	map<int, int>m3;
	m3 = m2; //赋值
	printMap(m3);
}

int main() {
	test01();
	system("pause");
	return 0;
}
```

> 总结：map中所有元素都是成对出现，插入数据时候要使用对组

<br>

### 9.3 `map`容量与交换

统计`map`容器大小、交换`map`容器。函数原型如下：

```cpp
//返回容器中元素的数目
size(); 

// 返回映射可能包含的最大元素数量。
max_size();

//判断容器是否为空
empty(); 

//交换两个集合容器
swap(map& other);      
```

**示例：**

```C++
#include <map>

void printMap(map<int,int>&m)
{
	for (map<int, int>::iterator it = m.begin(); it != m.end(); it++)
	{
		cout << "key = " << it->first << " value = " << it->second << endl;
	}
	cout << endl;
}

void test01()
{
	map<int, int>m;
	m.insert(pair<int, int>(1, 10));
	m.insert(pair<int, int>(2, 20));
	m.insert(pair<int, int>(3, 30));

	if (m.empty())
	{
		cout << "m为空" << endl;
	}
	else
	{
		cout << "m不为空" << endl;
		cout << "m的大小为： " << m.size() << endl;
	}
}

//交换
void test02()
{
	map<int, int>m;
	m.insert(pair<int, int>(1, 10));
	m.insert(pair<int, int>(2, 20));
	m.insert(pair<int, int>(3, 30));

	map<int, int>m2;
	m2.insert(pair<int, int>(4, 100));
	m2.insert(pair<int, int>(5, 200));
	m2.insert(pair<int, int>(6, 300));

	cout << "交换前" << endl;
	printMap(m);
	printMap(m2);

	cout << "交换后" << endl;
	m.swap(m2);
	printMap(m);
	printMap(m2);
}

int main() {
	test01();
	test02();
	system("pause");
	return 0;
}
```



<br>

### 9.4 `map` 插入和删除

`map`容器进行插入数据和删除数据，函数原型：

```cpp
//插入元素
insert(const value_type& value);
auto ret = studentMap.insert({101, "Alice"});
//插入元素(C++11更高效的方式)
emplace(const value_type& value);
studentMap.emplace(103, "Charlie");
//第三种插入方式：使用operator[] (如果键不存在会自动创建)
studentMap[102] = "Bob"; // 插入或修改

//删除pos迭代器所指的元素，返回下一个元素的迭代器
erase(iterator position);
//删除区间[beg,end)的所有元素 ，返回下一个元素的迭代器
erase(iterator beg, iterator end);
//通过键删除元素
erase(const Key& key);
    
//清除所有元素  
clear();         
```

**示例：**

```C++
#include <map>

void printMap(map<int,int>&m)
{
	for (map<int, int>::iterator it = m.begin(); it != m.end(); it++)
	{
		cout << "key = " << it->first << " value = " << it->second << endl;
	}
	cout << endl;
}

void test01()
{
	//插入
	map<int, int> m;
	//第一种插入方式
	m.insert(pair<int, int>(1, 10));
	//第二种插入方式
	m.insert(make_pair(2, 20));
	//第三种插入方式
	m.insert(map<int, int>::value_type(3, 30));
	//第四种插入方式
	m[4] = 40; 
	printMap(m);

	//删除
	m.erase(m.begin());
	printMap(m);

	m.erase(3);
	printMap(m);

	//清空
	m.erase(m.begin(),m.end());
	m.clear();
	printMap(m);
}

int main() {
	test01();
	system("pause");
	return 0;
}
```



<br>

### 9.5 `map` 访问元素与查找、统计

```cpp
// 使用operator[] (键不存在时会创建)（建议用于查询）（当查询不存在的键值对时，会自动创建并赋默认值0）
std::string name = studentMap[101];

// 使用at (键不存在时抛出out_of_range异常)
try {
    std::string name = studentMap.at(101);
} catch (const std::out_of_range& e) {
    std::cerr << "Key not found: " << e.what() << std::endl;
}

// 使用find (安全访问方式)
// 查找key是否存在。若存在，返回该键的元素的迭代器；若不存在，返回set.end()
auto it = studentMap.find(104);
if (it != studentMap.end()) {
    std::cout << "Found: " << it->second << std::endl;
} else {
    std::cout << "Key 104 not found" << std::endl;
}

// 统计key的元素个数，统计count对于map来说，结果为0或者1。
studentMap.count(key);
```

**示例：**

```C++
#include <map>

//查找和统计
void test01()
{
	map<int, int>m; 
	m.insert(pair<int, int>(1, 10));
	m.insert(pair<int, int>(2, 20));
	m.insert(pair<int, int>(3, 30));

	//查找
	map<int, int>::iterator pos = m.find(3);

	if (pos != m.end()){
		cout << "找到了元素 key = " << (*pos).first << " value = " << (*pos).second << endl;
	}
	else{
		cout << "未找到元素" << endl;
	}

	//统计
	int num = m.count(3);
	cout << "num = " << num << endl;
}

int main() {
	test01();
	system("pause");
	return 0;
}
```



<br>

### 9.6 `map`迭代器技巧

在C++中，可以使用迭代器遍历`std::map`容器。以下是一些技巧：

1、使用auto关键字自动推导迭代器类型：

```cpp
std::map<int, std::string> myMap;
// 使用auto关键字自动推导迭代器类型
for (auto it = myMap.begin(); it != myMap.end(); ++it) {
    // 迭代器操作
}
```

2、使用范围for循环(C++11)：

```cpp
std::map<int, std::string> myMap;
// 使用范围for循环
for (const auto& pair : myMap) {
    // pair为键值对，first为键，second为值
}
```

3、使用迭代器的成员函数：

```cpp
std::map<int, std::string> myMap;
// 使用迭代器的成员函数
for (auto it = myMap.begin(); it != myMap.end(); ++it) {
    std::cout << "Key: " << it->first << ", Value: " << it->second << std::endl;
}
```

4、使用find函数查找特定键值对【注意`first`和`second`函数，分别指向键值和数值】：

```cpp
std::map<int, std::string> myMap;
int keyToFind = 1;
auto it = myMap.find(keyToFind);
if (it != myMap.end()) {
    // 找到了特定键值对
    std::cout << "Key: " << it->first << ", Value: " << it->second << std::endl;
} else {
    // 未找到特定键值对
    std::cout << "Key not found" << std::endl;
}
```

5、使用结构化绑定 (C++17)

```cpp
for (const auto& [id, name] : studentMap) {
    std::cout << "ID: " << id << ", Name: " << name << std::endl;
}
```

<br>

### 9.6 `map` 高级特性与易错点

#### 9.6.1 自定义比较函数

利用仿函数，可以改变排序规则。

```cpp
// 自定义键比较函数
struct CaseInsensitiveCompare {
    bool operator()(const std::string& a, const std::string& b) const {
        return std::lexicographical_compare(
            a.begin(), a.end(),
            b.begin(), b.end(),
            [](char c1, char c2) {
                return tolower(c1) < tolower(c2);
            });
    }
};
 
std::map<std::string, int, CaseInsensitiveCompare> wordCountMap;
 
// 使用函数指针
bool compareStrings(const std::string& a, const std::string& b) {
    return a.length() < b.length();
}
 
std::map<std::string, int, decltype(&compareStrings)> lengthMap(&compareStrings);
```

另外一个例子：

> 对于自定义数据类型，map必须要指定排序规则，同set容器。

```cpp
#include <map>

class MyCompare {
public:
	bool operator()(int v1, int v2) {
		return v1 > v2;
	}
};

void test01() 
{
	//默认从小到大排序
	//利用仿函数实现从大到小排序
	map<int, int, MyCompare> m;

	m.insert(make_pair(1, 10));
	m.insert(make_pair(2, 20));
	m.insert(make_pair(3, 30));
	m.insert(make_pair(4, 40));
	m.insert(make_pair(5, 50));

	for (map<int, int, MyCompare>::iterator it = m.begin(); it != m.end(); it++) {
		cout << "key:" << it->first << " value:" << it->second << endl;
	}
}
int main() {
	test01();
	system("pause");
	return 0;
}
```

<br>

#### 9.6.2 特殊查找操作

```cpp
std::map<int, std::string> m {
    {10, "ten"},
    {20, "twenty"},
    {30, "thirty"},
    {40, "forty"}
};
 
// lower_bound - 第一个不小于key的元素
auto lb = m.lower_bound(25); // 指向30
 
// upper_bound - 第一个大于key的元素
auto ub = m.upper_bound(25); // 指向30
 
// equal_range - 返回匹配的范围
auto range = m.equal_range(20);
// range.first指向20，range.second指向30
```

<br>

#### 9.6.3 性能优化技巧

```cpp
// 1. 使用emplace_hint提高插入效率
auto hint = m.begin(); // 可以是任何合理的迭代器位置
m.emplace_hint(hint, 15, "fifteen");
 
// 2. 避免不必要的拷贝
std::map<int, std::string> bigMap;
// 不好：会创建临时string
bigMap[1] = "very long string...";
// 更好：使用try_emplace (C++17)
bigMap.try_emplace(1, "very long string...");
 
// 3. 节点操作 (C++17)
std::map<int, std::string> source, target;
auto node = source.extract(10); // 从source移除但不销毁
if (!node.empty()) {
    target.insert(std::move(node)); // 转移到target
}
```

<br>

#### 9.6.4 `map` 的常见易错点

1、`operator[]` 的陷阱

```cpp
std::map<std::string, int> wordCount;
 
// 以下操作会插入键"unknown"并值初始化为0
int count = wordCount["unknown"]; 
 
// 正确做法：先检查是否存在
auto it = wordCount.find("unknown");
if (it != wordCount.end()) {
    count = it->second;
}
```

2、迭代器失效问题

```cpp
std::map<int, int> m {{1, 10}, {2, 20}};
 
// 安全：删除当前迭代器指向的元素
for (auto it = m.begin(); it != m.end(); ) {
    if (it->second == 10) {
        it = m.erase(it); // C++11后erase返回下一个有效迭代器
    } else {
        ++it;
    }
}
 
// 危险：在遍历时插入元素可能导致树重新平衡，使迭代器失效
```

3、自定义比较函数的严格要求

```cpp
// 错误的比较函数：不满足严格弱序
struct BadCompare {
    bool operator()(int a, int b) const {
        return a <= b; // 错误！应该使用 <
    }
};
 
// 使用这种比较函数会导致未定义行为
std::map<int, int, BadCompare> badMap;
```

<br>

#### 9.6.5 `map` 最佳实践总结

1. **选择正确的容器**：
   - 需要有序遍历 → `map`
   - 只需快速查找 → `unordered_map`
   - 允许重复键 → `multimap`
2. **安全访问**：
   - 优先使用 `find` + 检查 `end()`
   - 慎用 `operator[]`（可能意外插入）
   - 使用 `at()` 进行带边界检查的访问
3. **性能考虑**：
   - 批量插入时使用 `emplace_hint`
   - C++17+ 使用节点操作避免拷贝
   - 自定义比较函数要满足严格弱序
4. **现代C++特性**：
   - 使用 `try_emplace` 避免不必要的临时对象
   - 使用结构化绑定简化遍历代码
   - C++20 使用 `contains` 替代 `find` + `end` 检查
5. **线程安全**：
   - `map` 本身不是线程安全的
   - 多线程环境需要外部同步
   - 考虑使用 `shared_mutex` 实现读写锁



<br>

### 9.8 `unordered_map`

`unordered_map`是`C++11`正式加入的对`hash_map`的官方实现。

从名字可以看出这个结构是无序的，底层设计思想和`STL`的`hash_map`一样。

- 元素在内部不以任何特定顺序排序，而是放进桶中。
- 元素放进哪个桶完全依赖于其键的哈希。这允许对单独元素的快速访问，因为一旦计算哈希，则它准确指代元素所放进的桶
- `unordered_map`搜索、插入和元素移除拥有平均常数时间复杂度。

> 相关方法参考：[此处](https://c.biancheng.net/view/7231.html)。
>
> 模拟实现参考：[此处](https://blog.csdn.net/2301_77239666/article/details/141788444)。

<br>

### 9.9 红黑树

#### 9.9.1 平衡二叉查找树

平衡二叉查找树（`Balanced Binary Search Tree`） 是一类通过特定规则维持树结构相对平衡的二叉查找树，旨在解决普通二叉查找树（BST）在动态操作（插入、删除）中可能退化成链表的极端情况，从而保证最坏情况下的时间复杂度为 `O(log n)`。

常见平衡二叉查找树类型：

| 类型     | 核心规则                                                     | 适用场景                         |
| -------- | ------------------------------------------------------------ | -------------------------------- |
| AVL树    | 严格平衡：任意节点的左右子树高度差≤1                         | 读操作多，写操作少的场景         |
| 红黑树   | 宽松平衡：通过颜色和黑高约束路径长度，最长路径≤2倍最短路径   | 写操作频繁（如数据库、内存管理） |
| Splay树  | 局部性原理：最近访问的节点通过旋转移动到根，无需全局平衡     | 缓存、热点数据访问               |
| Treap    | 结合BST和堆：节点同时有键值和随机优先级，通过优先级维护近似平衡 | 简单实现的概率平衡结构           |
| B树/B+树 | 多路平衡树：每个节点可包含多个键，减少磁盘I/O（常用于数据库和文件系统） | 大规模数据存储                   |

平衡代价与性能权衡 ：

| 类型    | 插入/删除代价        | 查找代价        | 平衡严格性 | 适用场景               |
| ------- | -------------------- | --------------- | ---------- | ---------------------- |
| AVL树   | 高（频繁旋转）       | 最优（O(log n)) | 严格       | 静态数据、频繁查询     |
| 红黑树  | 较低（颜色调整为主） | 接近AVL树       | 宽松       | 动态数据、频繁更新     |
| Splay树 | 均摊O(log n)         | 均摊O(log n)    | 无全局规则 | 局部性强的数据访问     |
| Treap   | 概率平衡（O(log n)） | O(log n)        | 概率性     | 简单实现、中等规模数据 |

为什么需要多种平衡树？

- 不同平衡树在平衡严格性、维护成本、适用场景上各有优劣：

- AVL树：适合读多写少的场景（如字典、静态索引）。

- 红黑树：工程实践中广泛使用（如C++ STL的std::map），平衡维护成本较低。

- B树/B+树：专为磁盘或数据库设计，减少I/O次数。

- Splay树：利用数据访问的局部性，无需显式平衡操作。


> 注意：红黑树和`AVL`树是理论结合实践的经典设计，而B树家族则在大规模数据存储中占据核心地位。

<br>

#### 9.9.2 红黑树基础

红黑树（`Red-Black Tree`）的核心理念源于对平衡二叉查找树的探索，其历史可追溯至20世纪70年代计算机科学的快速发展期。以下是其关键发展节点：

> 1972年：德国计算机科学家鲁道夫·拜尔（Rudolf Bayer）提出对称二叉B树（Symmetric Binary B-Tree），这是红黑树的前身，旨在将B树的特性（多路平衡）引入二叉结构。
>
> 1978年：美国计算机科学家罗伯特·塞奇威克（Robert Sedgewick）和莱昂尼达斯·J·吉巴斯（Leonidas J. Guibas）在论文《A Dichromatic Framework for Balanced Trees》中首次明确使用红黑颜色标记来简化对称二叉B树的平衡规则，并将其命名为“红黑树”。
>
> 1980年代后：红黑树因其高效的动态操作性能，逐渐成为工程实践中的主流平衡树，被纳入多种编程语言标准库和操作系统核心模块。

红黑树虽然是复杂的，但它的最坏情况运行时间也是非常良好的，并且在实践中是高效的： 它可以在O(log n)时间内做查找，插入和删除（这里的`n` 是树中元素的数目）。

**红黑树的五大性质：**

红黑树通过以下规则确保平衡性：

1. 颜色属性：每个节点非红即黑。

   - 规则：每个节点必须是红色或黑色。
   - 作用：颜色标记用于编码平衡规则，简化旋转和调整逻辑。

2. 根节点为黑：根节点必须为黑色。

   - 规则：树的根节点必须为黑色。
   - 意义：避免根节点为红色时可能违反“红色不相邻”规则，确保树顶层的稳定性。

3. 叶子节点为黑：所有叶子节点（NIL节点，即空指针）视为黑色。

   - 规则：所有叶子节点（即NIL节点，空指针或空节点）视为黑色。
   - 注意：这里的“叶子节点”指实际数据节点的空子节点，而非存储数据的末端节点。
   - 作用：统一路径终点的颜色，简化黑高计算。这样可以确保每个路径上的黑色节点数量相等，即使是经过了空节点的路径。

4. 红色不相邻：红色节点的子节点必须为黑色（禁止连续红色节点）。

   - 规则：红色节点的父节点和子节点必须为黑色（即不能有连续的红色节点）。
   - 意义：限制最长路径的长度，防止路径过长。
   - 最长路径示例：红黑交替（如黑→红→黑→红→黑）。
   - 最短路径：全黑节点。

5. 黑高一致：从任意节点到其所有叶子节点的路径中，黑色节点的数量相同（称为黑高）。

   - 规则：从任意节点到其所有叶子节点（NIL）的路径中，经过的黑色节点数量必须相同（称为黑高）。
   - 从A到叶子：路径A→B→NIL的黑色节点数为2（A和NIL）；路径A→C→NIL的黑色节点数也为2（A、C、NIL中的C和NIL算作黑色）。
   - 关键作用：黑高一致性确保树的高度最多为最短路径的2倍，维持平衡。

   ```
       黑节点A（黑高=2）
      /     \
     红B    黑C（黑高=1）
    /  \    /  \
   NIL NIL NIL NIL（黑高=1）
   ```

   

> 我们需要注意的是空节点（NIL节点）被认为是黑色的，从任意节点出发，到达其每个叶子节点的路径上的黑色节点数量必须相同。
>

![](cpp-2-7.png)

<br>

#### 9.9.3 红黑树的效率

红黑树通过**自平衡机制**确保插入、删除、查找等操作的时间复杂度稳定在 `O(log n)`，其效率优势体现在以下方面：

时间复杂度保障：

| **操作**      | **时间复杂度** | **原因**                                                    |
| ------------- | -------------- | ----------------------------------------------------------- |
| 插入          | O(log n)       | 通过颜色调整和至多2次旋转修复平衡，树高度被限制为O(log n)。 |
| 删除          | O(log n)       | 删除后可能需3次旋转和颜色调整，但整体路径长度仍为对数级。   |
| 查找          | O(log n)       | 树高度近似平衡，避免退化为链表。                            |
| 遍历/范围查询 | O(n)           | 中序遍历有序数据，与普通二叉搜索树一致。                    |



**红黑树和AVL树的比较**

插入与删除操作：

| **操作**     | **红黑树**                                    | **AVL 树**                                         |
| ------------ | --------------------------------------------- | -------------------------------------------------- |
| **插入**     | 最多需要 **2 次旋转** + 颜色调整              | 可能触发多次旋转（单旋或双旋），最多 O(1) 次旋转   |
| **删除**     | 最多需要 **3 次旋转** + 颜色调整              | 可能从删除点回溯到根节点调整，最多 O(log n) 次旋转 |
| **维护成本** | 调整以颜色标记为主，旋转次数少                | 严格维护平衡因子，旋转频率高                       |
| **动态性能** | 更适合频繁插入/删除的场景（如数据库事务日志） | 频繁更新时性能下降明显                             |

内存与实现复杂度：

| **维度**       | **红黑树**                                     | **AVL 树**                                                   |
| -------------- | ---------------------------------------------- | ------------------------------------------------------------ |
| **额外存储**   | 每个节点仅需 **1 bit** 存储颜色（红/黑）       | 每个节点需存储 **平衡因子（2~3 bit）** 或 **子树高度（4~8 bit）** |
| **实现复杂度** | 中等（需处理颜色调整和多种修复情况）           | 较高（需处理更多旋转类型和高度更新）                         |
| **代码维护**   | 规则明确，修复逻辑模块化（如插入分 3 种 Case） | 需要处理复杂的平衡因子更新和旋转组合                         |

经典性能数据对比：

- 插入 100 万随机数据：
  - 红黑树：耗时 ≈ 120 ms（旋转约 50 万次）

  - AVL 树：耗时 ≈ 180 ms（旋转约 80 万次）

- 插入 100 万有序数据：

  - 红黑树：耗时 ≈ 150 ms（旋转次数稳定）

  - AVL 树：耗时 ≈ 220 ms（频繁触发双旋）

- 查找 100 万次随机键：

  - 红黑树：耗时 ≈ 90 ms

  - AVL 树：耗时 ≈ 70 ms

**选择建议：**

- 选择 **红黑树**：若需在动态数据操作中平衡效率与成本（90% 的工程场景）。
- 选择 **AVL 树**：若数据稳定且追求极致查找性能（如科学计算、静态索引）。

<br>

#### 9.9.4 对旋转的基本理解 

旋转（`Rotation`）是平衡二叉查找树（如红黑树、AVL树）中用于调整树结构的核心操作，目的是在不破坏二叉查找树性质的前提下，通过局部子树的重构来恢复平衡。以下是旋转的核心要点：

旋转的作用:

1. 降低树高：通过改变节点父子关系，减少树的高度差。
2. 恢复平衡：解决因插入或删除导致的树结构失衡问题。

3. 保持有序性：旋转后，二叉查找树的键值顺序（左小右大）依然成立。


**左旋**（Left Rotation）：当某个节点的右子树高度较高时，通过左旋提升右子节点为父节点。以下关键注释说明：

1. 节点角色定义

   1. `subR`：原父节点的右子节点，旋转后将成为新父节点
   2. `subRL`：`subR`的左子节点，需要重新挂接到原父节点右侧
   3. `parentParent`：原父节点的父节点，用于将`subR`接入原树结构
   4. `parent`：原父节点，旋转后`subR`的左子节点
2. 连接关系调整

   1. 将subRL从subR剥离并挂接到parent右侧

   2. 将parent降级为subR的左子节点

   3. 更新所有涉及的父指针（核心难点）

3. 根节点特殊处理

   1. 当旋转节点是根节点时，需要更新整棵树的根指针

   2. 非根节点时，通过parentParent将subR接入原树

```
// 左旋前结构：
//      parent
//     /      \
//    A       subR
//           /    \
//        subRL    C
 
// 左旋后结构：
//        subR
//       /    \
//   parent    C
//    /   \
//   A  subRL
```



<br>

#### 9.9.5 红黑树的插入操作

> 参考[此处](https://blog.csdn.net/weixin_74268082/article/details/146089917)，以及可参考的红黑树源码。



<br>

### 9.10 案例-员工分组

案例描述：

* 公司今天招聘了10个员工（ABCDEFGHIJ），10名员工进入公司之后，需要指派员工在那个部门工作
* 员工信息有: 姓名  工资组成；部门分为：策划、美术、研发
* 随机给10名员工分配部门和工资
* 通过multimap进行信息的插入  key(部门编号) value(员工)
* 分部门显示员工信息

实现步骤：

1. 创建10名员工，放到vector中
2. 遍历vector容器，取出每个员工，进行随机分组
3. 分组后，将员工部门编号作为key，具体员工作为value，放入到multimap容器中
4. 分部门显示员工信息

```C++
#include<iostream>
using namespace std;
#include <vector>
#include <string>
#include <map>
#include <ctime>

/*
- 公司今天招聘了10个员工（ABCDEFGHIJ），10名员工进入公司之后，需要指派员工在那个部门工作
- 员工信息有: 姓名  工资组成；部门分为：策划、美术、研发
- 随机给10名员工分配部门和工资
- 通过multimap进行信息的插入  key(部门编号) value(员工)
- 分部门显示员工信息
*/

# define CEHUA  0
# define MEISHU 1
# define YANFA  2

class Worker
{
public:
	string m_Name;
	int m_Salary;
};

void createWorker(vector<Worker>&v)
{
	string nameSeed = "ABCDEFGHIJ";
	for (int i = 0; i < 10; i++)
	{
		Worker worker;
		worker.m_Name = "员工";
		worker.m_Name += nameSeed[i];

		worker.m_Salary = rand() % 10000 + 10000; // 10000 ~ 19999
		//将员工放入到容器中
		v.push_back(worker);
	}
}

//员工分组
void setGroup(vector<Worker>&v,multimap<int,Worker>&m)
{
	for (vector<Worker>::iterator it = v.begin(); it != v.end(); it++)
	{
		//产生随机部门编号
		int deptId = rand() % 3; // 0 1 2 

		//将员工插入到分组中
		//key部门编号，value具体员工
		m.insert(make_pair(deptId, *it));
	}
}

void showWorkerByGourp(multimap<int,Worker>&m)
{
	// 0  A  B  C   1  D  E   2  F G ...
	cout << "策划部门：" << endl;

	multimap<int,Worker>::iterator pos = m.find(CEHUA);
	int count = m.count(CEHUA); // 统计具体人数
	int index = 0;
	for (; pos != m.end() && index < count; pos++ , index++)
	{
		cout << "姓名： " << pos->second.m_Name << " 工资： " << pos->second.m_Salary << endl;
	}

	cout << "----------------------" << endl;
	cout << "美术部门： " << endl;
	pos = m.find(MEISHU);
	count = m.count(MEISHU); // 统计具体人数
	index = 0;
	for (; pos != m.end() && index < count; pos++, index++)
	{
		cout << "姓名： " << pos->second.m_Name << " 工资： " << pos->second.m_Salary << endl;
	}

	cout << "----------------------" << endl;
	cout << "研发部门： " << endl;
	pos = m.find(YANFA);
	count = m.count(YANFA); // 统计具体人数
	index = 0;
	for (; pos != m.end() && index < count; pos++, index++)
	{
		cout << "姓名： " << pos->second.m_Name << " 工资： " << pos->second.m_Salary << endl;
	}

}

int main() {

	srand((unsigned int)time(NULL));

	//1、创建员工
	vector<Worker>vWorker;
	createWorker(vWorker);

	//2、员工分组
	multimap<int, Worker>mWorker;
	setGroup(vWorker, mWorker);


	//3、分组显示员工
	showWorkerByGourp(mWorker);

	////测试
	//for (vector<Worker>::iterator it = vWorker.begin(); it != vWorker.end(); it++)
	//{
	//	cout << "姓名： " << it->m_Name << " 工资： " << it->m_Salary << endl;
	//}

	system("pause");

	return 0;
}
```





<br>

# 四 `STL`函数对象【仿函数】

## 1 函数对象

### 1.1 函数对象概念

* 重载**函数调用操作符**的类，其对象常称为**函数对象**
* **函数对象**使用重载的`()`时，行为类似函数调用，也叫**仿函数**

**本质：** 函数对象(仿函数)是一个**类**，不是一个函数

<br>

### 1.2  函数对象使用

**特点：**

* 函数对象在使用时，可以像普通函数那样调用, 可以有参数，可以有返回值
* 函数对象超出普通函数的概念，**函数对象可以有自己的状态**
* **函数对象可以作为参数传递**



**示例:**

```C++
#include <string>

//1、函数对象在使用时，可以像普通函数那样调用, 可以有参数，可以有返回值
class MyAdd
{
public :
	int operator()(int v1,int v2)
	{
		return v1 + v2;
	}
};

void test01()
{
	MyAdd myAdd;
	cout << myAdd(10, 10) << endl;
}

//2、函数对象可以有自己的状态
class MyPrint
{
public:
	MyPrint()
	{
		count = 0;
	}
	void operator()(string test)
	{
		cout << test << endl;
		count++; //统计使用次数
	}

	int count; //内部自己的状态
};
void test02()
{
	MyPrint myPrint;
	myPrint("hello world");
	myPrint("hello world");
	myPrint("hello world");
	cout << "myPrint调用次数为： " << myPrint.count << endl;
}

//3、函数对象可以作为参数传递
void doPrint(MyPrint &mp , string test)
{
	mp(test);
}

void test03()
{
	MyPrint myPrint;
	doPrint(myPrint, "Hello C++");
}

int main() {

	//test01();
	//test02();
	test03();

	system("pause");
	return 0;
}
```

总结：

* 仿函数写法非常灵活，可以作为参数进行传递。
* 作为参数传递时，<u>用法类似指向函数的指针</u>



<br>

## 2 谓词

### 2.1 谓词概念

* 返回`bool`类型的仿函数称为**谓词**
* 如果`operator()`接受一个参数，那么叫做一元谓词
* 如果`operator()`接受两个参数，那么叫做二元谓词

<br>

### 2.2 一元谓词

**示例：**

```C++
#include <vector>
#include <algorithm>

//1.一元谓词
struct GreaterFive{
	bool operator()(int val) {
		return val > 5;
	}
};
//2.一元谓词的正常写法
class GreaterFive
{
public:
    bool operator()(int val){
        return val > 5;
    }
}

void test01() {

	vector<int> v;
	for (int i = 0; i < 10; i++)
	{
		v.push_back(i);
	}

    //查找容器中 有没有大于5的数字【find_if()】
	vector<int>::iterator it = find_if(v.begin(), v.end(), GreaterFive());
	if (it == v.end()) {
		cout << "没找到!" << endl;
	}
	else {
		cout << "找到:" << *it << endl;
	}

}

int main() {

	test01();
	system("pause");
	return 0;
}
```

总结：参数只有一个的谓词，称为一元谓词



### 2.3 二元谓词

```C++
#include <vector>
#include <algorithm>

//二元谓词
class MyCompare
{
public:
	bool operator()(int num1, int num2)
	{
		return num1 > num2;
	}
};

void test01()
{
	vector<int> v;
	v.push_back(10);
	v.push_back(40);
	v.push_back(20);
	v.push_back(30);
	v.push_back(50);

	//默认从小到大
	sort(v.begin(), v.end());
	for (vector<int>::iterator it = v.begin(); it != v.end(); it++)
	{
		cout << *it << " ";
	}
	cout << endl;
	cout << "----------------------------" << endl;

	//使用函数对象改变算法策略，排序从大到小
	sort(v.begin(), v.end(), MyCompare());
	for (vector<int>::iterator it = v.begin(); it != v.end(); it++)
	{
		cout << *it << " ";
	}
	cout << endl;
}

int main() {

	test01();
	system("pause");
	return 0;
}
```

总结：参数只有两个的谓词，称为二元谓词

> `MyCompare()` ：仿函数的匿名对象



<br>

## 3 内建函数对象

### 3.1 内建函数对象意义

**概念：** STL内建了一些函数对象

**分类:**

* 算术仿函数

* 关系仿函数

* 逻辑仿函数

**用法：**

* 这些仿函数所产生的对象，用法和一般函数完全相同
* 使用内建函数对象，需要引入头文件 `#include <functional>`



<br>

### 3.2 算术仿函数

**功能描述：**

* 实现四则运算
* 其中negate是一元运算，其他都是二元运算



**仿函数原型：**

```c++
template<class T> T plus<T>             //加法仿函数
template<class T> T minus<T>            //减法仿函数
template<class T> T multiplies<T>    	//乘法仿函数
template<class T> T divides<T>          //除法仿函数
template<class T> T modulus<T>          //取模仿函数
template<class T> T negate<T>`          //取反仿函数
```



**示例：**

```C++
#include <functional>
//negate
void test01()
{
	negate<int> n;
	cout << n(50) << endl;
}

//plus
void test02()
{
	plus<int> p;
	cout << p(10, 20) << endl;
}

int main() {

	test01();
	test02();

	system("pause");
	return 0;
}
```



<br>

### 3.3 关系仿函数

**功能描述：**实现关系对比

**仿函数原型：**

```c++
template<class T> bool equal_to<T>              //等于
template<class T> bool not_equal_to<T>          //不等于
template<class T> bool greater<T>               //大于
template<class T> bool greater_equal<T>         //大于等于
template<class T> bool less<T>                  //小于
template<class T> bool less_equal<T>            //小于等于
```



**示例：**

```C++
#include <functional>
#include <vector>
#include <algorithm>

class MyCompare
{
public:
	bool operator()(int v1,int v2)
	{
		return v1 > v2;
	}
};
void test01()
{
	vector<int> v;

	v.push_back(10);
	v.push_back(30);
	v.push_back(50);
	v.push_back(40);
	v.push_back(20);

	for (vector<int>::iterator it = v.begin(); it != v.end(); it++) {
		cout << *it << " ";
	}
	cout << endl;

	//自己实现仿函数
	//sort(v.begin(), v.end(), MyCompare());
	//STL内建仿函数  大于仿函数
	sort(v.begin(), v.end(), greater<int>());

	for (vector<int>::iterator it = v.begin(); it != v.end(); it++) {
		cout << *it << " ";
	}
	cout << endl;
}

int main() {

	test01();

	system("pause");

	return 0;
}
```

总结：关系仿函数中最常用的就是`greater<>`大于



<br>

### 3.4 逻辑仿函数

**功能描述：**实现逻辑运算

**函数原型：**

```c++
template<class T> bool logical_and<T>              //逻辑与
template<class T> bool logical_or<T>               //逻辑或
template<class T> bool logical_not<T>              //逻辑非
```



**示例：**

```C++
#include <vector>
#include <functional>
#include <algorithm>
void test01()
{
	vector<bool> v;
	v.push_back(true);
	v.push_back(false);
	v.push_back(true);
	v.push_back(false);

	for (vector<bool>::iterator it = v.begin();it!= v.end();it++)
	{
		cout << *it << " ";
	}
	cout << endl;

	//逻辑非  将v容器搬运到v2中，并执行逻辑非运算
	vector<bool> v2;
	v2.resize(v.size());
	transform(v.begin(), v.end(),  v2.begin(), logical_not<bool>());
	for (vector<bool>::iterator it = v2.begin(); it != v2.end(); it++)
	{
		cout << *it << " ";
	}
	cout << endl;
}

int main() {

	test01();

	system("pause");

	return 0;
}
```

总结：逻辑仿函数实际应用较少，了解即可

> `transform()` 使用前，必须 `resize`  大小空间





# 五 `STL`常用算法

算法主要是由头文件`<algorithm>` `<functional>` `<numeric>`组成。

* `<algorithm>`是所有STL头文件中最大的一个，范围涉及到比较、交换、查找、遍历操作、复制、修改等。
* `<numeric>`体积很小，只包括几个在序列上面进行简单数学运算的模板函数。
* `<functional>`定义了一些模板类，用以声明函数对象。



## 1 常用遍历算法

* 遍历容器：`for_each`
* 搬运容器到另一个容器中：`transform`  



### 1.1 `for_each`

函数原型：

```cpp
//遍历算法
for_each(iterator beg, iterator end, _func);  
// 遍历算法 遍历容器元素
// beg 开始迭代器
// end 结束迭代器
// _func 函数或者函数对象
```

示例：

```C++
#include <algorithm>
#include <vector>

//普通函数
void print01(int val) 
{
	cout << val << " ";
}
//函数对象
class print02 
{
 public:
	void operator()(int val) 
	{
		cout << val << " ";
	}
};

//for_each算法基本用法
void test01() {

	vector<int> v;
	for (int i = 0; i < 10; i++) 
	{
		v.push_back(i);
	}

	//遍历算法
	for_each(v.begin(), v.end(), print01);
	cout << endl;

	for_each(v.begin(), v.end(), print02());
	cout << endl;
}

int main() {
	test01();
	system("pause");
	return 0;
}
```

<br>



### 1.2 `transform`

函数原型：

```cpp
// 搬运容器到另一个容器中
transform(iterator beg1, iterator end1, iterator beg2, _func);
//beg1 源容器开始迭代器
//end1 源容器结束迭代器
//beg2 目标容器开始迭代器
//_func 函数或者函数对象
```

示例：

```C++
#include<vector>
#include<algorithm>

//常用遍历算法  搬运 transform
class TransForm
{
public:
	int operator()(int val)
	{
		return val;
	}
};

class MyPrint
{
public:
	void operator()(int val)
	{
		cout << val << " ";
	}
};

void test01()
{
	vector<int>v;
	for (int i = 0; i < 10; i++)
	{
		v.push_back(i);
	}

	vector<int>vTarget; //目标容器
	vTarget.resize(v.size()); // 目标容器需要提前开辟空间

	transform(v.begin(), v.end(), vTarget.begin(), TransForm());
	for_each(vTarget.begin(), vTarget.end(), MyPrint());
}

int main() {
	test01();
	system("pause");
	return 0;
}
```

> 总结： 搬运的目标容器必须要提前开辟空间，否则无法正常搬运
>



<br>

## 2 常用查找算法

- 查找元素：`find`   
- 按条件查找元素：`find_if` 
- 查找相邻重复元素：`adjacent_find`  
- 二分查找法：`binary_search`   
- 统计元素个数：`count`       
- 按条件统计元素个数：`count_if`    

<br>


### 2.1 `find`

函数原型：

```cpp
// 查找指定元素，找到返回指定元素的迭代器，找不到返回结束迭代器`end()`。
find(iterator beg, iterator end, value);  
// 按值查找元素，找到返回指定位置迭代器，找不到返回结束迭代器位置
// beg 开始迭代器
// end 结束迭代器
// value 查找的元素
```

示例：

```C++
#include <algorithm>
#include <vector>
#include <string>
void test01() {

	vector<int> v;
	for (int i = 0; i < 10; i++) {
		v.push_back(i + 1);
	}
	//查找容器中是否有 5 这个元素
	vector<int>::iterator it = find(v.begin(), v.end(), 5);
	if (it == v.end()) 
	{
		cout << "没有找到!" << endl;
	}
	else 
	{
		cout << "找到:" << *it << endl;
	}
}

class Person {
public:
	Person(string name, int age) 
	{
		this->m_Name = name;
		this->m_Age = age;
	}
	//重载==
	bool operator==(const Person& p) 
	{
		if (this->m_Name == p.m_Name && this->m_Age == p.m_Age) 
		{
			return true;
		}
		return false;
	}

public:
	string m_Name;
	int m_Age;
};

void test02() {

	vector<Person> v;

	//创建数据
	Person p1("aaa", 10);
	Person p2("bbb", 20);
	Person p3("ccc", 30);
	Person p4("ddd", 40);

	v.push_back(p1);
	v.push_back(p2);
	v.push_back(p3);
	v.push_back(p4);

	vector<Person>::iterator it = find(v.begin(), v.end(), p2);
	if (it == v.end()) 
	{
		cout << "没有找到!" << endl;
	}
	else 
	{
		cout << "找到姓名:" << it->m_Name << " 年龄: " << it->m_Age << endl;
	}
}
```

> 利用`find`可以在容器中找指定的元素，返回值是**迭代器**
>

> 对于自定义类型，需要重载==。

<br>

### 2.2 `find_if`

函数原型：

```cpp
// 按条件查找元素
find_if(iterator beg, iterator end, _Pred);  
// 按值查找元素，找到返回指定位置迭代器，找不到返回结束迭代器位置
// beg 开始迭代器
// end 结束迭代器
// _Pred 函数或者谓词（返回bool类型的仿函数）
```

示例：

```C++
#include <algorithm>
#include <vector>
#include <string>

//内置数据类型
class GreaterFive
{
public:
	bool operator()(int val)
	{
		return val > 5;
	}
};

void test01() {

	vector<int> v;
	for (int i = 0; i < 10; i++) {
		v.push_back(i + 1);
	}

	vector<int>::iterator it = find_if(v.begin(), v.end(), GreaterFive());
	if (it == v.end()) {
		cout << "没有找到!" << endl;
	}
	else {
		cout << "找到大于5的数字:" << *it << endl;
	}
}

//自定义数据类型
class Person {
public:
	Person(string name, int age)
	{
		this->m_Name = name;
		this->m_Age = age;
	}
public:
	string m_Name;
	int m_Age;
};

class Greater20
{
public:
	bool operator()(Person &p)
	{
		return p.m_Age > 20;
	}
};

void test02() {

	vector<Person> v;

	//创建数据
	Person p1("aaa", 10);
	Person p2("bbb", 20);
	Person p3("ccc", 30);
	Person p4("ddd", 40);

	v.push_back(p1);
	v.push_back(p2);
	v.push_back(p3);
	v.push_back(p4);

	vector<Person>::iterator it = find_if(v.begin(), v.end(), Greater20());
	if (it == v.end())
	{
		cout << "没有找到!" << endl;
	}
	else
	{
		cout << "找到姓名:" << it->m_Name << " 年龄: " << it->m_Age << endl;
	}
}

int main() {
	//test01();
	test02();
	system("pause");
	return 0;
}
```

> `find_if`按条件查找使查找更加灵活，提供的仿函数可以改变不同的策略

<br>

### 2.3 `adjacent_find`

函数原型：

```cpp
// 功能描述：查找相邻重复元素
adjacent_find(iterator beg, iterator end);  
// 查找相邻重复元素，返回**相邻元素的第一个位置的迭代器**
// beg 开始迭代器
// end 结束迭代器
```

示例：

```C++
#include <algorithm>
#include <vector>

void test01()
{
	vector<int> v;
	v.push_back(1);
	v.push_back(2);
	v.push_back(5);
	v.push_back(2);
	v.push_back(4);
	v.push_back(4);
	v.push_back(3);

	//查找相邻重复元素
	vector<int>::iterator it = adjacent_find(v.begin(), v.end());
	if (it == v.end()) {
		cout << "找不到!" << endl;
	}
	else {
		cout << "找到相邻重复元素为:" << *it << endl;
	}
}
```

> 面试题中如果出现查找相邻重复元素，记得用STL中的`adjacent_find`算法
>



<br>

### 2.4 `binary_search`

函数原型：

```cpp
// 功能描述：查找指定元素是否存在
bool binary_search(iterator beg, iterator end, value);  
// 查找指定的元素，查到 返回true  否则false
// beg 开始迭代器
// end 结束迭代器
// value 查找的元素
```

> 注意: 在**无序序列中不可用**。

示例：

```C++
#include <algorithm>
#include <vector>

void test01()
{
	vector<int>v;
	for (int i = 0; i < 10; i++)
	{
		v.push_back(i);
	}
	//二分查找
	bool ret = binary_search(v.begin(), v.end(),2);
	if (ret)
	{
		cout << "找到了" << endl;
	}
	else
	{
		cout << "未找到" << endl;
	}
}

int main() {
	test01();
	system("pause");
	return 0;
}
```



<br>

### 2.5 `count`

函数原型：

```c++
// 统计元素出现次数
count(iterator beg, iterator end, value);
// beg 开始迭代器
// end 结束迭代器
// value 统计的元素
```

示例：

```C++
#include <algorithm>
#include <vector>

//内置数据类型
void test01()
{
	vector<int> v;
	v.push_back(1);
	v.push_back(2);
	v.push_back(4);
	v.push_back(5);
	v.push_back(3);
	v.push_back(4);
	v.push_back(4);

	int num = count(v.begin(), v.end(), 4);

	cout << "4的个数为： " << num << endl;
}

//自定义数据类型
class Person
{
public:
	Person(string name, int age)
	{
		this->m_Name = name;
		this->m_Age = age;
	}
	bool operator==(const Person & p)
	{
		if (this->m_Age == p.m_Age)
		{
			return true;
		}
		else
		{
			return false;
		}
	}
	string m_Name;
	int m_Age;
};

void test02()
{
	vector<Person> v;

	Person p1("刘备", 35);
	Person p2("关羽", 35);
	Person p3("张飞", 35);
	Person p4("赵云", 30);
	Person p5("曹操", 25);

	v.push_back(p1);
	v.push_back(p2);
	v.push_back(p3);
	v.push_back(p4);
	v.push_back(p5);
    
    Person p("诸葛亮",35);

	int num = count(v.begin(), v.end(), p);
	cout << "num = " << num << endl;
}
int main() {
	//test01();
	test02();
	system("pause");
	return 0;
}
```

> 总结： 统计自定义数据类型时候，需要配合重载 `operator==`
>

<br>

### 2.6 `count_if`

函数原型：

```cpp
// 功能描述：按条件统计元素出现次数
count_if(iterator beg, iterator end, _Pred);  
// beg 开始迭代器
// end 结束迭代器
// _Pred 谓词
```

示例：

```C++
#include <algorithm>
#include <vector>

class Greater4
{
public:
	bool operator()(int val)
	{
		return val >= 4;
	}
};

//内置数据类型
void test01()
{
	vector<int> v;
	v.push_back(1);
	v.push_back(2);
	v.push_back(4);
	v.push_back(5);
	v.push_back(3);
	v.push_back(4);
	v.push_back(4);

	int num = count_if(v.begin(), v.end(), Greater4());

	cout << "大于4的个数为： " << num << endl;
}

//自定义数据类型
class Person
{
public:
	Person(string name, int age)
	{
		this->m_Name = name;
		this->m_Age = age;
	}

	string m_Name;
	int m_Age;
};

class AgeLess35
{
public:
	bool operator()(const Person &p)
	{
		return p.m_Age < 35;
	}
};
void test02()
{
	vector<Person> v;

	Person p1("刘备", 35);
	Person p2("关羽", 35);
	Person p3("张飞", 35);
	Person p4("赵云", 30);
	Person p5("曹操", 25);

	v.push_back(p1);
	v.push_back(p2);
	v.push_back(p3);
	v.push_back(p4);
	v.push_back(p5);

	int num = count_if(v.begin(), v.end(), AgeLess35());
	cout << "小于35岁的个数：" << num << endl;
}

int main() {
	//test01();
	test02();
	system("pause");
	return 0;
}
```

> 按值统计用`count`，按条件统计用`count_if`
>



<br>

### 2.7 其他查找算法

#### 2.7.1 `max_element()` 和 `min_element()`

- `max_element()`用于从范围`[first, last)`中获取**最大值**的元素。
- `min_element()`用于从范围`[first, last)`中获取**最小值**的元素。

`max_element()`包含在 `algorithm` 库中，语法如下（C++17起）：（`min_element()`同步）

```cpp
#include<algorithm>
template< class ExecutionPolicy, class ForwardIt, class Compare >
template< class ForwardIt, class Compare >
constexpr ForwardIt max_element(ForwardIt first, ForwardIt last, Compare comp );
//参数：
//first, last:定义要检验范围的向前迭代器 .
//comp:比较函数对象

//返回值：
//指向范围 [first, last) 中最大元素的迭代器。若范围中有多个元素等价于最大元素，则返回指向首个这种元素的迭代器。若范围为空则返回 last 。
```

示例：

```cpp
#include<algorithm>

struct node {
   int x, y;
};
bool cmp1(node a, node b) {
   return a.x > b.x;
}
int main() {
   vector<int> v(3);
   int arr[4];
   vector<node> v1(3);
   cout << *max_element(v.begin(), v.end());
   cout << *min_element(arr, arr + 4);
   cout << (*max_element(v1.begin(), v1.end(), cmp1)).y;
   return 0;
}

// 例子2
#include <algorithm>
#include <iostream>
#include <vector>
#include <cmath>
 
static bool abs_compare(int a, int b)
{
    return (std::abs(a) < std::abs(b)); //绝对值大小比较
}
 
int main()
{
    std::vector<int> v{ 3, 1, -14, 1, 5, 9 }; 
    std::vector<int>::iterator result;
 
    result = std::max_element(v.begin(), v.end());
    std::cout << "max element at: " << std::distance(v.begin(), result) << '\n';
 
    result = std::max_element(v.begin(), v.end(), abs_compare);
    std::cout << "max element (absolute) at: " << std::distance(v.begin(), result) << '\n';
}
//输出：
//max element at: 5
//max element (absolute) at: 2
```

<br>

## 3 常用排序算法

- `sort`：对容器内元素进行排序
- `random_shuffle`：洗牌   指定范围内的元素随机调整次序
- `merge ` ：容器元素合并，并存储到另一容器中
- `reverse`：反转指定范围的元素



### 3.1 sort

#### 3.1.1 基本内容

功能描述：对容器内元素进行排序。

函数原型：

```c++
// 按值查找元素，找到返回指定位置迭代器，找不到返回结束迭代器位置
sort(iterator beg, iterator end, _Pred);
//  beg    开始迭代器
//  end    结束迭代器
// _Pred   谓词[可选]：排序规则
```

示例：

```c++
#include <algorithm>
#include <vector>

void myPrint(int val)
{
	cout << val << " ";
}

void test01() {
	vector<int> v;
	v.push_back(10);
	v.push_back(30);
	v.push_back(50);
	v.push_back(20);
	v.push_back(40);

	//sort默认从小到大排序
	sort(v.begin(), v.end());
	for_each(v.begin(), v.end(), myPrint);
	cout << endl;

	//从大到小排序
	sort(v.begin(), v.end(), greater<int>());
	for_each(v.begin(), v.end(), myPrint);
	cout << endl;
}

int main() {
	test01();
	system("pause");
	return 0;
}
```



<br>

#### 3.1.2 补充：匿名函数

> 有时自定义的排序函数比较简单，可以使用匿名函数的形式，这样会使代码更加简洁。

🔺语法

在 C++ 中，匿名函数通常被称为 “lambda 表达式”。基本的 lambda 表达式语法如下：

```c++
[capture](parameters) -> return_type { function_body }
//capture：捕获列表，定义了哪些外部变量能在 lambda 表达式中使用，以及是通过值还是引用使用它们。
//parameters：参数列表，类似于普通函数的参数列表。
//return_type：返回类型，如果函数体只包含一个 return 语句，编译器可以自动推导返回类型，此时可以省略。
//function_body：函数体，包含了 lambda 表达式需要执行的代码。
```

注意：

- 当`parameters`为空的时候，`()`可以被省去，当`body`只有`return`或返回为`void`，那么，`->return-type` 可以被省去。

- `capture`：

  ```c++
  []        // 未定义变量.试图在Lambda内使用任何外部变量都是错误的.
  [x, &y]   // x 按值捕获, y 按引用捕获.
  [&]       // 用到的任何外部变量都隐式按引用捕获
  [=]       // 用到的任何外部变量都隐式按值捕获
  [&, x]    // x显式地按值捕获. 其它变量按引用捕获
  [=, &z]   // z按引用捕获. 其它变量按值捕获
  ```


**案例1**：简单的 `lambda` 表达式

```c++
auto sum = [](int a, int b) { return a + b; };
cout << sum(1, 2);  // 输出：3
```

例中，lambda 表达式定义了一个接受两个 int 参数的函数，并返回它们的和。这个 lambda 表达式被赋值给了 sum 变量，然后我们调用 sum(1, 2) 来计算 1 + 2 的结果。

**案例2**：展示了如何在 lambda 表达式中捕获外部变量：

```c++
int factor = 2;
auto multiply = [factor](int a) { return a * factor; };
cout << multiply(3);  // 输出：6
```

例中，lambda 表达式捕获了外部变量 factor，并在函数体中使用它。请注意，因为 factor 是通过值捕获的，所以如果后面修改了 factor 的值，不会影响 multiply 的行为。

<br>

#### 3.1.3 `sort `与 `stable_sort`

`sort`是对容器或普通数组中 `[first, last)` 范围内的元素进行排序，默认进行升序排序。

```cpp
stable_sort (first, last);
```

`stable_sort` 与`sort`函数功能相似，不同之处在于，对于 `[first, last)` 范围内值相同的元素，该函数**不会改变它们的相对位置**，即**稳定排序**。

- `stable_sort()` 函数是基于归并排序实现的。
- `sort()` 函数是基于快速排序实现的。

```cpp
#include <iostream>     // std::cout
#include <algorithm>    // std::stable_sort
#include <vector>       // std::vector
//以普通函数的方式实现自定义排序规则
bool mycomp(int i, int j) {
    return (i < j);
}
//以函数对象的方式实现自定义排序规则
class mycomp2 {
public:
    bool operator() (int i, int j) {
        return (i < j);
    }
};

int main() {
    std::vector<int> myvector{ 32, 71, 12, 45, 26, 80, 53, 33 };
    //调用第一种语法格式，对 32、71、12、45 进行排序
    std::stable_sort(myvector.begin(), myvector.begin() + 4); //(12 32 45 71) 26 80 53 33
    //调用第二种语法格式，利用STL标准库提供的其它比较规则（比如 greater<T>）进行排序
    std::stable_sort(myvector.begin(), myvector.begin() + 4, std::greater<int>()); //(71 45 32 12) 26 80 53 33

    //调用第二种语法格式，通过自定义比较规则进行排序,这里也可以换成 mycomp2()
    std::stable_sort(myvector.begin(), myvector.end(), mycomp);//12 26 32 33 45 53 71 80
    //输出 myvector 容器中的元素
    for (std::vector<int>::iterator it = myvector.begin(); it != myvector.end(); ++it) {
        std::cout << *it << ' ';
    }
    return 0;
}

```

<br>



### 3.2 `random_shuffle`

函数原型：

```c++
// 功能描述：洗牌，指定范围内的元素随机调整次序。
random_shuffle(iterator beg, iterator end);
// beg 开始迭代器
// end 结束迭代器
```

示例：

```c++
#include <algorithm>
#include <vector>
#include <ctime>

class myPrint
{
public:
	void operator()(int val)
	{
		cout << val << " ";
	}
};

void test01()
{
	srand((unsigned int)time(NULL));
	vector<int> v;
	for(int i = 0 ; i < 10;i++)
	{
		v.push_back(i);
	}
	for_each(v.begin(), v.end(), myPrint());
	cout << endl;

	//打乱顺序
	random_shuffle(v.begin(), v.end());
	for_each(v.begin(), v.end(), myPrint());
	cout << endl;
}

int main() {
	test01();
	system("pause");
	return 0;
}
```

> `random_shuffle`洗牌算法比较实用，使用时记得加随机数种子

<br>

### 3.3 `merge`

函数原型：

```c++
// 容器元素合并，并存储到另一容器中
merge(iterator beg1, iterator end1, iterator beg2, iterator end2, iterator dest);
// 注意: 两个容器必须是**有序的**

// beg1   容器1开始迭代器
// end1   容器1结束迭代器
// beg2   容器2开始迭代器
// end2   容器2结束迭代器
// dest   目标容器开始迭代器
```

示例**：**

```c++
#include <algorithm>
#include <vector>

class myPrint
{
public:
	void operator()(int val)
	{
		cout << val << " ";
	}
};

void test01()
{
	vector<int> v1;
	vector<int> v2;
	for (int i = 0; i < 10 ; i++) 
    {
		v1.push_back(i);
		v2.push_back(i + 1);
	}

	vector<int> vtarget;
	//!!!!!目标容器需要提前开辟空间
	vtarget.resize(v1.size() + v2.size());
	//合并  需要两个有序序列
	merge(v1.begin(), v1.end(), v2.begin(), v2.end(), vtarget.begin());
	for_each(vtarget.begin(), vtarget.end(), myPrint());
	cout << endl;
}

int main() {

	test01();

	system("pause");

	return 0;
}
```

> `merge`合并的两个容器必须的有序序列。



<br>

### 3.4 `reverse`

函数原型：

```c++
// 功能描述：将容器内元素进行反转
reverse(iterator beg, iterator end);
// beg 开始迭代器
// end 结束迭代器
```

示例：

```c++
#include <algorithm>
#include <vector>

class myPrint
{
public:
	void operator()(int val)
	{
		cout << val << " ";
	}
};

void test01()
{
	vector<int> v;
	v.push_back(10);
	v.push_back(30);
	v.push_back(50);
	v.push_back(20);
	v.push_back(40);

	cout << "反转前： " << endl;
	for_each(v.begin(), v.end(), myPrint());
	cout << endl;

	cout << "反转后： " << endl;

	reverse(v.begin(), v.end());
	for_each(v.begin(), v.end(), myPrint());
	cout << endl;
}

int main() {
	test01();
	system("pause");
	return 0;
}
```

<br>

## 4 常用拷贝和替换算法

- `copy` 【容器内指定范围的元素拷贝到另一容器中】
- `replace`【将容器内指定范围的旧元素修改为新元素】
- `replace_if ` 【容器内指定范围满足条件的元素替换为新元素】
- `swap` 【互换两个容器的元素】




### 4.1 `copy`

函数原型：

```c++
// 功能描述：容器内指定范围的元素拷贝到另一容器中
copy(iterator beg, iterator end, iterator dest);
// beg  开始迭代器
// end  结束迭代器
// dest 目标起始迭代器
```

示例：

```c++
#include <algorithm>
#include <vector>

class myPrint
{
public:
	void operator()(int val)
	{
		cout << val << " ";
	}
};

void test01()
{
	vector<int> v1;
	for (int i = 0; i < 10; i++) {
		v1.push_back(i + 1);
	}
	vector<int> v2;
	v2.resize(v1.size());
	copy(v1.begin(), v1.end(), v2.begin());

	for_each(v2.begin(), v2.end(), myPrint());
	cout << endl;
}

int main() {
	test01();
	system("pause");
	return 0;
}
```

> 利用copy算法在拷贝时，目标容器记得**提前开辟空间**。
>



<br>

### 4.2 `replace`



函数原型：

```cpp
// 功能描述：将容器内指定范围的旧元素修改为新元素
replace(iterator beg, iterator end, oldvalue, newvalue);  
// beg 开始迭代器
// end 结束迭代器
// oldvalue 旧元素
// newvalue 新元素
```

示例：

```c++
#include <algorithm>
#include <vector>

class myPrint
{
public:
	void operator()(int val)
	{
		cout << val << " ";
	}
};

void test01()
{
	vector<int> v;
	v.push_back(20);
	v.push_back(30);
	v.push_back(20);
	v.push_back(40);
	v.push_back(50);
	v.push_back(10);
	v.push_back(20);

	cout << "替换前：" << endl;
	for_each(v.begin(), v.end(), myPrint());
	cout << endl;

	//将容器中的20 替换成 2000
	cout << "替换后：" << endl;
	replace(v.begin(), v.end(), 20,2000);
	for_each(v.begin(), v.end(), myPrint());
	cout << endl;
}

int main() {
	test01();
	system("pause");
	return 0;
}
```



<br>

### 4.3 `replace_if`





函数原型：

```cpp
// 功能描述:  将区间内满足条件的元素，替换成指定元素
replace_if(iterator beg, iterator end, _pred, newvalue);  
// beg 开始迭代器
// end 结束迭代器
// _pred 谓词
// newvalue 替换的新元素
```

示例：

```c++
#include <algorithm>
#include <vector>

class myPrint
{
public:
	void operator()(int val)
	{
		cout << val << " ";
	}
};

class ReplaceGreater30
{
public:
	bool operator()(int val)
	{
		return val >= 30;
	}
};

void test01()
{
	vector<int> v;
	v.push_back(20);
	v.push_back(30);
	v.push_back(20);
	v.push_back(40);
	v.push_back(50);
	v.push_back(10);
	v.push_back(20);

	cout << "替换前：" << endl;
	for_each(v.begin(), v.end(), myPrint());
	cout << endl;

	//将容器中大于等于的30 替换成 3000
	cout << "替换后：" << endl;
	replace_if(v.begin(), v.end(), ReplaceGreater30(), 3000);
	for_each(v.begin(), v.end(), myPrint());
	cout << endl;
}

int main() {
	test01();
	system("pause");
	return 0;
}
```

<br>

### 4.4 `swap`

函数原型：

```cpp
// 功能描述：互换两个容器的元素
swap(container c1, container c2);  
// c1容器1
// c2容器2
```

示例：

```c++
#include <algorithm>
#include <vector>

class myPrint
{
public:
	void operator()(int val)
	{
		cout << val << " ";
	}
};

void test01()
{
	vector<int> v1;
	vector<int> v2;
	for (int i = 0; i < 10; i++) {
		v1.push_back(i);
		v2.push_back(i+100);
	}

	cout << "交换前： " << endl;
	for_each(v1.begin(), v1.end(), myPrint());
	cout << endl;
	for_each(v2.begin(), v2.end(), myPrint());
	cout << endl;

	cout << "交换后： " << endl;
	swap(v1, v2);
	for_each(v1.begin(), v1.end(), myPrint());
	cout << endl;
	for_each(v2.begin(), v2.end(), myPrint());
	cout << endl;
}

int main() {
	test01();
	system("pause");
	return 0;
}
```

> swap交换容器时，注意交换的容器要**同种类型**。
>



<br>

## 5 常用算术生成算法

算术生成算法属于小型算法，使用时包含的头文件为 `#include <numeric>`。

- `accumulate`   【计算容器元素累计总和】
- `fill`                【向容器中添加元素】

<br>

### 5.1 `accumulate`

函数原型：

```c++
// 功能描述：计算区间内 容器元素累计总和
accumulate(iterator beg, iterator end, value);
//beg 开始迭代器
// end 结束迭代器
// value 起始值
```

示例：

```c++
#include <numeric>
#include <vector>
void test01()
{
	vector<int> v;
	for (int i = 0; i <= 100; i++) {
		v.push_back(i);
	}
	int total = accumulate(v.begin(), v.end(), 0);
	cout << "total = " << total << endl;
}

int main() {

	test01();
	system("pause");
	return 0;
}
```

<br>

### 5.2 `fill`

函数原型**：**

```c++
// 功能描述：向容器中填充指定的元素
fill(iterator beg, iterator end, value);
// beg 开始迭代器
// end 结束迭代器
// value 填充的值
```

示例：

```c++
#include <numeric>
#include <vector>
#include <algorithm>

class myPrint
{
public:
	void operator()(int val)
	{
		cout << val << " ";
	}
};

void test01()
{

	vector<int> v;
	v.resize(10);
	//填充
	fill(v.begin(), v.end(), 100);

	for_each(v.begin(), v.end(), myPrint());
	cout << endl;
}

int main() {
	test01();
	system("pause");
	return 0;
}
```



<br>

## 6 常用集合算法

- `set_intersection`           【求两个容器的交集】

- `set_union`                          【求两个容器的并集】

- `set_difference `             【求两个容器的差集】

  

<br>

### 6.1 `set_intersection`

函数原型：

```c++
// 功能描述：求两个容器的交集
set_intersection(iterator beg1, iterator end1, iterator beg2, iterator end2, iterator dest);
//注意:两个集合必须是有序序列

// beg1 容器1开始迭代器
// end1 容器1结束迭代器
// beg2 容器2开始迭代器
// end2 容器2结束迭代器
// dest 目标容器开始迭代器
```

示例：

```C++
#include <vector>
#include <algorithm>

class myPrint
{
public:
	void operator()(int val)
	{
		cout << val << " ";
	}
};

void test01()
{
	vector<int> v1;
	vector<int> v2;
	for (int i = 0; i < 10; i++)
    {
		v1.push_back(i);
		v2.push_back(i+5);
	}

	vector<int> vTarget;
	//取两个里面较小的值给目标容器开辟空间
	vTarget.resize(min(v1.size(), v2.size()));

	//返回目标容器的最后一个元素的迭代器地址
	vector<int>::iterator itEnd = 
        set_intersection(v1.begin(), v1.end(), v2.begin(), v2.end(), vTarget.begin());

    // !!!结束迭代器位置如果不用返回值，会出现输出错误情况
    // 因为交集的长度不一定有那么多
	for_each(vTarget.begin(), itEnd, myPrint());
	cout << endl;
}

int main() {
	test01();
	system("pause");
	return 0;
}
```

* 求交集的两个集合必须的有序序列
* 目标容器开辟空间需要从两个容器中取小值
* `set_intersection`返回值既是交集中最后一个元素的位置



<br>

### 6.2 `set_union`

函数原型：

```c++
// 功能描述：两个集合的并集
set_union(iterator beg1, iterator end1, iterator beg2, iterator end2, iterator dest);
// 注意:两个集合必须是有序序列

// beg1 容器1开始迭代器
// end1 容器1结束迭代器
// beg2 容器2开始迭代器
// end2 容器2结束迭代器
// dest 目标容器开始迭代器
```

示例：

```C++
#include <vector>
#include <algorithm>

class myPrint
{
public:
	void operator()(int val)
	{
		cout << val << " ";
	}
};

void test01()
{
	vector<int> v1;
	vector<int> v2;
	for (int i = 0; i < 10; i++) {
		v1.push_back(i);
		v2.push_back(i+5);
	}

	vector<int> vTarget;
	//取两个容器的和给目标容器开辟空间
	vTarget.resize(v1.size() + v2.size());

	//返回目标容器的最后一个元素的迭代器地址
	vector<int>::iterator itEnd = 
        set_union(v1.begin(), v1.end(), v2.begin(), v2.end(), vTarget.begin());

	for_each(vTarget.begin(), itEnd, myPrint());
	cout << endl;
}

int main() {
	test01();
	system("pause");
	return 0;
}
```

- 求并集的两个集合必须的有序序列
- 目标容器开辟空间需要**两个容器相加**
- `set_union`返回值既是并集中最后一个元素的位置



<br>


### 6.3  `set_difference`

函数原型：

```c++
// 功能描述：求两个集合的差集
set_difference(iterator beg1, iterator end1, iterator beg2, iterator end2, iterator dest);
// 注意:两个集合必须是有序序列

// beg1 容器1开始迭代器
// end1 容器1结束迭代器
// beg2 容器2开始迭代器
// end2 容器2结束迭代器
// dest 目标容器开始迭代器
```

示例：

```C++
#include <vector>
#include <algorithm>

class myPrint
{
public:
	void operator()(int val)
	{
		cout << val << " ";
	}
};

void test01()
{
	vector<int> v1;
	vector<int> v2;
	for (int i = 0; i < 10; i++) {
		v1.push_back(i);
		v2.push_back(i+5);
	}

	vector<int> vTarget;
	//取两个里面较大的值给目标容器开辟空间
	vTarget.resize( max(v1.size() , v2.size()));

	//返回目标容器的最后一个元素的迭代器地址
	cout << "v1与v2的差集为： " << endl;
	vector<int>::iterator itEnd = 
        set_difference(v1.begin(), v1.end(), v2.begin(), v2.end(), vTarget.begin());
	for_each(vTarget.begin(), itEnd, myPrint());
	cout << endl;


	cout << "v2与v1的差集为： " << endl;
	itEnd = set_difference(v2.begin(), v2.end(), v1.begin(), v1.end(), vTarget.begin());
	for_each(vTarget.begin(), itEnd, myPrint());
	cout << endl;
}

int main() {
	test01();
	system("pause");
	return 0;
}
```

- 求差集的两个集合必须的有序序列
- 目标容器开辟空间需要从**两个容器取较大值**
- `set_difference`返回值既是差集中最后一个元素的位置



<br>

# 五 STL其他内容

## 1 `std::unique_lock<std::mutex>` 的作用

`std::unique_lock` 是 C++ 标准库中用于管理互斥锁（`std::mutex`）的类模板，它提供了更灵活的锁管理机制，相比 `std::lock_guard` 功能更强大。其主要特点包括：

- **自动加锁**：在构造 `std::unique_lock` 对象时，如果传入了一个 `std::mutex` 对象，它会自动对该互斥锁进行加锁操作。
- **自动解锁**：`std::unique_lock` 对象在其生命周期结束时（例如，离开其作用域，也就是出了大括号），会自动调用 `std::mutex` 的 `unlock` 方法来释放锁。

```cpp
template<class F>
void ThreadPool::enqueue(F&& f)
{
    {
        std::unique_lock<std::mutex> lock(queue_mutex);
        tasks.emplace(std::forward<F>(f));
    }
    condition.notify_one();
}
```

- **加锁**：当执行到 `std::unique_lock<std::mutex> lock(queue_mutex);` 时，`lock` 对象被创建，同时它会自动调用 `queue_mutex.lock()` 对 `queue_mutex` 互斥锁进行加锁操作，这样后续对任务队列 `tasks` 的操作（如 `tasks.emplace(std::forward<F>(f));`）就是线程安全的。
- **解锁**：当执行到 `}` 时，`lock` 对象的生命周期结束，它会自动调用 `queue_mutex.unlock()` 释放锁。这是因为 `std::unique_lock` 的析构函数会在对象销毁时自动完成解锁操作。
- **唤醒线程**：在锁被释放后，执行 `condition.notify_one();` 语句，唤醒一个正在等待 `condition` 条件变量的线程。

**优势**：这种自动加锁和解锁的机制带来了很多好处：

- **避免死锁**：由于锁的释放是自动的，即使在代码中出现异常，`std::unique_lock` 的析构函数也会被调用，从而确保锁被正确释放，避免了死锁的发生。
- **代码简洁**：开发者无需手动编写加锁和解锁的代码，减少了代码量，提高了代码的可读性和可维护性。



// 创建全局互斥锁
std::mutex



std::strstr

<br>

## 2 `std::function`

`std::function` 是 C++11 引入的一个非常有用的模板类，它能够封装任何可以调用的目标（例如普通函数、函数指针、Lambda 表达式、成员函数或其他可调用对象），并使得它们可以像函数一样进行调用。它提供了一种灵活、统一的方式来处理各种类型的函数对象。

### 2.1 基本概念

`std::function` 是一个可以存储任何符合指定签名的可调用对象的类型擦除封装器。它允许你通过统一的接口来调用不同类型的可调用对象，而无需关心其具体类型。

```cpp
#include <functional>
std::function<返回类型(参数类型...)> 函数对象名;
```

### 2.2 功能和用法

（1）普通函数指针：`std::function` 可以存储和调用普通的函数指针。

```cpp
#include <iostream>
#include <functional>

void print_sum(int a, int b) {
    std::cout << "Sum: " << a + b << std::endl;
}

int main() {
    std::function<void(int, int)> func = print_sum;
    func(3, 5);  // 输出: Sum: 8
    return 0;
}
```

（2）`Lambda` 表达式：`std::function` 也可以封装 `lambda` 表达式，`lambda` 表达式提供了一个非常灵活的方式来创建临时函数对象。

```cpp
#include <iostream>
#include <functional>

int main() {
    std::function<int(int, int)> add = [](int a, int b) { return a + b; };
    std::cout << add(3, 4) << std::endl;  // 输出: 7
    return 0;
}
```


（3）函数对象：`std::function` 可以存储自定义的函数对象（即实现了 `operator()` 的类）。

```cpp
#include <iostream>
#include <functional>

struct Multiplier {
    int operator()(int a, int b) const {
        return a * b;
    }
};

int main() {
    std::function<int(int, int)> multiply = Multiplier();
    std::cout << multiply(3, 4) << std::endl;  // 输出: 12
    return 0;
}
```

（4）成员函数指针：`std::function` 还支持封装成员函数，但需要注意它的使用方式。成员函数需要一个对象实例才能调用，所以你需要提供一个对象或者绑定到对象。

```cpp
#include <iostream>
#include <functional>

class Printer {
public:
    void print_message(const std::string& message) {
        std::cout << message << std::endl;
    }
};

int main() {
    Printer printer;
    std::function<void(const std::string&)> print_func = 
        std::bind(&Printer::print_message, &printer, std::placeholders::_1);
    
    print_func("Hello, World!");  // 输出: Hello, World!
    return 0;
}
```


（5）参数和返回值：`std::function` 是类型安全的，可以根据你给定的签名来确定可调用对象的类型，它会检查传入的参数和返回值类型是否匹配。

### 2.3 主要操作

（1）`std::function` 的赋值和调用：

- 你可以将函数指针、lambda 或者函数对象赋给 std::function 变量。
- 使用 () 运算符调用存储的函数。

```cpp
std::function<void()> func = some_function;
func();  // 调用 some_function
```

（2）`std::function` 的重置：你可以使用 `std::function::reset()` 重置 `std::function` 对象，使其不再指向任何可调用对象。

```cpp
std::function<void()> func = some_function;
func();  // 调用 some_function
func.reset();  // 重置，不再指向任何函数
```

（3）`std::function` 的空检查

```cpp
//可以使用 std::function::operator bool() 来检查 std::function 是否为空。
std::function<void()> func;
if (func) {
    func();  // 如果 func 非空则调用
} else {
    std::cout << "No function to call." << std::endl;
}
```



### 2.4 性能注意事项与使用场景

std::function 是类型擦除的，意味着它会对不同的可调用对象进行动态分配和类型擦除，所以它的性能可能比直接使用普通函数指针或 lambda 表达式要差一些。尤其是在频繁调用时，可能会造成一定的性能开销。

适用场景：

- 回调函数：std::function 非常适合用于需要回调的场景，例如事件处理、异步编程等。

- 函数式编程：通过将函数作为参数传递，std::function 可以让代码更具灵活性和可扩展性。

- 事件驱动编程：可以用来处理事件驱动的框架，像 GUI 编程中按钮点击事件等。

- 结合`std::unordered_map`

  ```cpp
  std::unordered_map<std::string, std::function<void(par)>> mapping;
  ```

示例：使用 std::function 实现简单的回调

```cpp
#include <iostream>
#include <functional>

void my_function(int a) {
    std::cout << "Callback called with: " << a << std::endl;
}

void invoke_callback(std::function<void(int)> callback) {
    // 触发回调
    callback(42);
}

int main() {
    std::function<void(int)> callback = my_function;
    invoke_callback(callback);  // 输出: Callback called with: 42
    return 0;
}
```

> `std::function` 是一个非常强大的工具，可以将不同类型的可调用对象统一封装并调用。它在需要高度灵活性的场景中非常有用，尤其是涉及回调和事件驱动的编程模式时。尽管它的性能可能略逊色于普通函数指针和直接的 Lambda 表达式，但它提供的高度抽象和灵活性使得它在许多高级用法中非常值得使用。

<br>

### 2.5 底层实现与分析

> 原标题名：[快手C++一面：std::function的底层原理分析，如何与回调函数结合使用？](https://zhuanlan.zhihu.com/p/1949503572623472298)

`std::function`是 C++11 引入的一个强大工具，定义在`<functional>`头文件中，它是一个通用的函数包装器，就像一个 “魔法盒子”，可以存储、调用和复制各种可调用对象 ，包括普通函数、函数指针、Lambda 表达式、函数对象（仿函数）以及成员函数指针等。

- 比如在一个图形界面库中，当用户点击按钮时，需要执行不同的操作。有的按钮点击后要保存文件，有的要打开新窗口。这时候就可以用`std::function`把这些不同的操作（函数）封装起来，统一作为按钮点击的回调函数。这样，图形界面库的开发者不需要关心具体的操作内容，只需要知道调用`std::function`封装的函数就行，大大提高了代码的灵活性和可维护性 。
- 再比如在多线程编程中，我们可以把线程要执行的任务用`std::function`封装起来，然后传递给线程对象。这样，不同的线程就可以执行不同类型的任务，而不需要为每个任务都单独创建一个线程类。

#### 2.5.1 底层实现核心机制之一：类型擦除机制

std::function能够实现对各种不同类型可调用对象的统一处理，背后的关键技术就是类型擦除（Type Erasure） 。简单来说，类型擦除就是在编译期将不同类型的可调用对象的具体类型信息 “抹去”，只保留其可调用的接口，从而在运行期能够以统一的方式来处理这些对象。

为了实现类型擦除，std::function内部定义了一个抽象基类，我们不妨称之为CallableBase。这个基类中包含了一些虚函数，用于定义可调用对象的基本操作，比如调用操作call和复制操作clone等。对于每一种具体类型的可调用对象，又会定义一个继承自CallableBase的具体实现类，比如`CallableWrapper<T>` ，其中T就是具体可调用对象的类型。在`CallableWrapper<T>`中，会实现基类中的虚函数，将对具体可调用对象的操作封装起来 。

当我们用std::function来存储一个可调用对象时，比如一个普通函数、Lambda 表达式或者函数对象，std::function内部实际上是创建了一个对应`CallableWrapper<T>`类型的对象，并将这个对象的指针存储起来。这样，在编译时，std::function只需要知道CallableBase这个统一的接口，而不需要关心具体可调用对象的类型。在运行时，通过虚函数的动态绑定机制，就可以正确地调用到具体可调用对象的执行逻辑 。

例如，假设有一个普通函数printHello：

```cpp
void printHello() {
    std::cout << "Hello!" << std::endl;
}
```

当我们使用`std::function<void()> func = printHello;`时，`std::function`内部会创建一个`CallableWrapper<decltype(printHello)>`类型的对象，将printHello函数封装起来，并存储这个对象的指针。当调用func()时，实际上是通过虚函数调用到CallableWrapper<decltype(printHello)>中的call函数，进而执行printHello函数的逻辑 。

这种类型擦除机制使得std::function具有很高的灵活性，能够在编译时接受任意类型的可调用对象，而在运行时保持类型安全。不过，它也带来了一定的运行时开销，主要是因为虚函数调用和可能的堆内存分配（当可调用对象较大时）。

#### 2.5.2 底层实现核心机制之二：[小对象优化（SOO）](https://zhuanlan.zhihu.com/p/1949503572623472298)

#### 2.5.3 [std::function 内部结构探秘](https://zhuanlan.zhihu.com/p/1949503572623472298)



