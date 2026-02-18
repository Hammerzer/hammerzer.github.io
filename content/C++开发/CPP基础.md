---
title: CPP基础
description: C++的入门基本功。
urlname: cpp-base
date: 2024-03-11 16:51:50
tags:
  - CPP
  - 基础知识
categories:
  - C++开发
draft: false
---

> [!note] <span style="background:#FFFF00;">C++基础</span> 
> 
> 
> 1. 初识
> 2. 数据类型
> 3. 运算符
> 4. 程序流程结构
> 5. 数组
> 6. 函数
> 7. 指针
> 8. 结构体
> 9. 案例




# 一 C++初识

## 1.1 C++ 环境配置

> 这里使用 `VScode` 进行代码编写，配置过程参考 [这里](https://zhuanlan.zhihu.com/p/87864677/)
>
> `MinGW` 的安装配置参考 [这里](http://c.biancheng.net/view/8077.html)
>
> C++工作区配置参考 [这里](https://blog.csdn.net/Zhangguohao666/article/details/104963520)
>
> Visual Studio 快捷键参考 [这里](https://learn.microsoft.com/zh-cn/visualstudio/ide/default-keyboard-shortcuts-in-visual-studio?view=vs-2022&utm_source=vshelp)

### 1.1.1 快捷键

| 命令                                          | 快捷键                                    |
| --------------------------------------------- | ----------------------------------------- |
| 生成解决方案，给出目前编译错误                | Ctrl+Shift+B                              |
| 完成单词【联想】                              | **Alt+向右键** [文本编辑器、工作流设计器] |
| 完成单词【补充】                              | **Ctrl+空格键** \| **Ctrl+K**、**W**      |
| 选择当前字词                                  | Ctrl+W                                    |
| 断行                                          | **Enter**  或 **Shift+Enter**             |
| 设置文档格式                                  | **Ctrl+K、Ctrl+D**                        |
| 设置选定内容的格式，整理缩进格式              | **Ctrl+K、Ctrl+F**                        |
| 块注释                                        | **Ctrl+K**、**Ctrl+C** [文本编辑器]       |
| 快速行注释                                    | **Ctrl+Shift+/**                          |
| 取消注释选定内容                              | **Ctrl+K、Ctrl+U**                        |
| 快速调试                                      | **F5**                                    |
| 删除行                                        | **Ctrl+L** 或 Shift+Del                   |
| 匹配替换                                      | Ctrl+H                                    |
| 查找                                          | Ctrl+I                                    |
| 智能提示                                      | Ctrl+J                                    |
| 补全变量的头文件                              | Alt + Enter                               |
| 方法参数提示                                  | Ctrl + Shift +空格                        |
| 智能标记（如：提示using、实现接口、抽象类等） | **Ctrl+.**                                |
| 跳转父类或相关实现                            | `F12` 或 `Ctrl+左键`                      |
| 返回跳转前的类                                | `Ctrl + -` 或 `Ctrl + Shift + *`          |
| 选中行                                        | 左键三次 或 Shift+Home/End                |
| 删除一行                                      | **shfit+Delete**                          |

> 完成单词【联想】的`Alt+右`，可以在`MessageBox`这样的重定义函数的参数处使用来提示函数定义。

<br>

### 1.1.2 编辑器乱码问题

> [!help] 问题
> `VScode` 运行`C++`中文终端乱码问题

**原因**：`VScode` 编辑器的编码和终端的编码不一致。`VScode` 为`utf-8`，而`cmd`的默认编码方式为`gbk`。

**解决办法一**：修改`VScode` 文件编码为`GBK`。

```c++
// 第一个程序
#include<iostream>
using namespace std;

int main() {
	cout << "Hello world" << endl;
    // pause 是cmd命令，可在cmd直接用
	system("pause");
	return 0;
}
```



### 1.1.3 常见的系统命令：

- `cls`、`pause`
- `shutdown /s【一分钟后关机】`、`shutdown /a【取消关机】`、【help：`shutdown /?`】
- `字符串路径`：也可用路径打开文件
- `color 12`：改变控制台背景颜色【`0~9`依次是：黑、蓝、绿、湖蓝、红、紫、黄、白、灰、淡蓝；`A~F`依次是：淡绿、淡浅绿、淡红、淡紫、淡黄、亮白】
- `mode con cols=80 lines=40`：改变控制台背景颜色 【`mode con /?`】

**额外补充：**

- C++ 中的数字输出，可用上引号分隔便于阅读，如：
```
10'67：十进制67
234'243：234243
OB11：二进制11
011：八进制
0x10：十六进制
```
- 整型字面量后可以加后缀。
	- L/l：long型
	- LL/ll：long long型
	- U/u：无符号型
	- ULL/ull：无符号long long型

<br>

## 1.2 变量

**作用**：给一段指定的内存空间起名，方便操作这段内存

**语法**：

- `数据类型 变量名 = 初始值;`    
- `数据类型 变量名 {初始值};`  【新|更严格】

>[!attention] C++在创建变量时，必须给变量一个初始值，否则会报错【应该是在使用前必须初始化】

**初始化方式如下：**

```cpp
age = 18; // 只有一个问题，编译不严格，如int age = 7.5`
age{18};
age{};//默认0
age(18);// c++11的写法，基本被淘汰

age();//错`
```

### 1.2.1 自定义变量名称

- `#define A TypeName`：可以用A来替换TypeName，如`#define 整数 int`
- `typedef TypeName A` ：可以用A来替换TypeName，如`typedef int eInt;`
- `using A = TypeName` ：可以用A来替换TypeName，如`using eInt32 = int;`


## 1.3  常量

**作用**：用于记录程序中不可更改的数据

**C++定义常量两种方式**

1. **#define** 宏常量： `#define 常量名 常量值`【无分号结尾】
   * <span style="background:#FFFF00;">通常在文件上方定义</span>，表示一个常量


1. **const**修饰的变量：`const 数据类型 常量名 = 常量值`【同变量定义，可能有新写法】
   * <span style="background:#FFFF00;">通常在变量定义前加关键字const</span>，修饰该变量为常量，不可修改

```c++
//1、宏常量
#define day 7

int main() {

	cout << "一周里总共有 " << day << " 天" << endl;
	//day = 8;  //报错，宏常量不可以修改

	//2、const修饰变量
	const int month = 12;
	cout << "一年里总共有 " << month << " 个月份" << endl;
	//month = 24; //报错，常量是不可以修改的
	
	system("pause");

	return 0;
}
```


## 1.4 关键字

**作用**：关键字是C++中预先保留的单词（标识符）

> [!note] 在定义变量或者常量时候，不要用关键字

C++关键字如下：

| asm        | do           | if               | return      | typedef  |
| ---------- | ------------ | ---------------- | ----------- | -------- |
| auto       | double       | inline           | short       | typeid   |
| bool       | dynamic_cast | int              | signed      | typename |
| break      | else         | long             | sizeof      | union    |
| case       | enum         | mutable          | static      | unsigned |
| catch      | explicit     | namespace        | static_cast | using    |
| char       | export       | new              | struct      | virtual  |
| class      | extern       | operator         | switch      | void     |
| const      | false        | private          | template    | volatile |
| const_cast | float        | protected        | this        | wchar_t  |
| continue   | for          | public           | throw       | while    |
| default    | friend       | register         | true        |          |
| delete     | goto         | reinterpret_cast | try         |          |

> [!tip] 在给变量或者常量起名称时候，不要用C++得关键字，否则会产生歧义。

<br>

## 1.5 标识符命名规则

**作用**：C++规定给标识符（变量、常量）命名时，有一套自己的规则

* 标识符不能是关键字
* 标识符只能由字母、数字、下划线组成
* <span style="background:#FFFF00;">第一个字符必须为字母或下划线</span>
* 标识符中字母区分大小写

> [!note] 命名规范
> 给标识符命名时，争取做到见名知意的效果，方便自己和他人的阅读



<br>

# 二 数据类型

C++规定在创建一个变量或者常量时，必须要指定出相应的数据类型，否则无法给变量分配内存

![](cpp1-8.png)

![](cpp1-9.png)

## 2.1 整型

**作用**：整型变量表示的是<span style="background:#FFFF00;">整数类型</span>的数据

C++中能够表示整型的类型有以下几种方式，**区别在于所占内存空间不同**：

| **数据类型**       | **占用空间**                                    | 取值范围             |
| -------------- | ------------------------------------------- | ---------------- |
| short 短整型      | 2字节                                         | (-2^15 ~ 2^15-1) |
| int 整型         | 4字节                                         | (-2^31 ~ 2^31-1) |
| long 长整形       | Windows为4字节，<br>Linux为4字节(32位)，<br>8字节(64位) | (-2^31 ~ 2^31-1) |
| long long 长长整形 | 8字节                                         | (-2^63 ~ 2^63-1) |



<br>

## 2.2 sizeof 关键字

**作用**：利用sizeof关键字可以<span style="background:#FFFF00;">统计数据类型所占内存大小</span>

**语法：** `sizeof( 数据类型 / 变量)`

**示例：**`sizeof(int)`

> [!note] 整型变量所占内存大小对比
> short < int <= long <= long long

> [!Question] sizeof 汇编代码中，没有计算大小的过程。因此，sizeof大小的计算在**编译过程**中完成。





## 2.3 实型（浮点型）

**作用**：用于<span style="background:#FFFF00;">表示小数</span>

浮点型变量分为两种：

- 单精度float 【后缀 `F/f`，不带后缀的浮点数视为double，如后缀】
- 双精度double

两者的**区别**在于表示的有效数字范围不同。

| **数据类型** | **占用空间** | **有效数字范围** |
| ------------ | ------------ | ---------------- |
| float        | 4字节        | 7位有效数字      |
| double       | 8字节        | 15～16位有效数字 |
| long double  | 8字节        | 15～16位有效数字 |

> 浮点数也可以表达整数：`2E2 = 200.0`



<br>

## 2.4 字符型

### 2.4.1 字符型变量

**作用**：字符型变量用于显示单个字符

**语法：**`char ch = 'a';`

> [!attention] 在显示字符型变量时，用单引号将字符括起来，**不要用双引号**

> [!attention] 单引号内只能有一个字符，不可以是字符串

- C和C++中字符型变量只占用<span style="background:#FFFF00;">1个字节</span>。
- 字符型变量并不是把字符本身放到内存中存储，而是将对应的ASCII编码放入到存储单元

ASCII 码大致由以下**两部分**组成：

* ASCII 非打印控制字符： ASCII 表上的数字 **0-31** 分配给了控制字符，用于控制像打印机等一些外围设备。
* ASCII 打印字符：数字 **32-126** 分配给了能在键盘上找到的字符，当查看或打印文档时就会出现。

🔺**扩展**：字符数据类型   

|   类型   | 占用内存 | 说明       |
| :------: | -------- | ---------- |
|   char   | 1        | ASCⅡ       |
| wchar_t  | 2        | 宽字节字符 |
| char16_t | 2        | UTF-16字符 |
| char32_t | 4        | UTF-32字符 |

```C++
#include <iostream>

int main()
{
	setlocale(LC_ALL, "chs");
    char charA{ 'A' };
    char charB{ 65 };
    wchar_t wchar1{ L'A' };
    wchar_t wchar2{ L'我' };
    
    char16_t wchar1{ u'A' };
    char32_t wchar1{ U'A' };

    std::cout << charA << ',' << charB << ',';
    std::wcout << wchar1 << ',' << wchar2;
}
```

>  其他字符集：gbk / GB2312 / GB18030 / UNICODE规范【实现：utf-16 | utf-8 | utf-32】
 
 
 <br>
 
#### 2.4.2 字符处理

> 字符处理函数头文件【cctype头文件】

|       函数        | 说明                     |
| :---------------: | ------------------------ |
| int isupper(char) | 判断字符是否为大写字母   |
| int islower(char) | 判断字符是否为小写字母   |
| int isalpha(char) | 判断字符是否为字母       |
| int isdigit(char) | 判断字符是否为数字       |
| int isalnum(char) | 判断字符是否为字母或数字 |
| int isspace(char) | 判断字符是否为空格       |
| int isblank(char) | 判断字符是否为空白       |
| int ispunct(char) | 判断字符是否为标点符号   |
| int isprint(char) | 判断字符是否可打印       |
| int iscntrl(char) | 判断字符是否为控制字符   |
| int isgraph(char) | 判断字符是否为图形字符   |
| int tolower(char) | 转换字符为小写           |
| int toupper(char) | 转换字符为大写           |



<br>

## 2.5 转义字符

**作用**：用于表示一些<span style="background:#FFFF00;">不能显示出来的ASCII字符</span>

> 现阶段我们常用的转义字符有：` \n  \\  \t`

| **转义字符** | **含义**                        | **ASCII**码值（十进制） |
| -------- | ----------------------------- | ---------------- |
| \a       | 警报                            | 007              |
| \b       | 退格(BS) ，将当前位置移到前一列            | 008              |
| \f       | 换页(FF)，将当前位置移到下页开头            | 012              |
| **\n**   | **换行(LF) ，将当前位置移到下一行开头**      | **010**          |
| \r       | 回车(CR) ，将当前位置移到本行开头           | 013              |
| **\t**   | **水平制表(HT)  （跳到下一个TAB位置）**    | **009**          |
| \v       | 垂直制表(VT)                      | 011              |
| **\\\\** | **代表一个反斜线字符`"\"`**            | **092**          |
| \'       | 代表一个单引号（撇号）字符                 | 039              |
| \"       | 代表一个双引号字符                     | 034              |
| \?       | 代表一个问号                        | 063              |
| \0       | 数字0                           | 000              |
| \ddd     | 8进制转义字符，d范围`0~7`              | 3位8进制            |
| \xhh     | 16进制转义字符，h范围`0~9`，`a~f`，`A~F` | 3位16进制           |



<br>

## 2.6 字符串型

### 2.6.1 字符串型变量

**作用**：用于表示一串字符

**两种风格**

- **C风格字符串**： `char 变量名[] = "字符串值"`

```CPP
  char str1[] = "hello world";
```

> [!WARNING] C风格的字符串要用双引号括起来

- **C++风格字符串**：  `string  变量名 = "字符串值"`

```CPP
string str = "hello world";
```

> [!WARNING] C++风格字符串，需要加入头文件<span style="background:#FFFF00;">#include </span> 和 `<string>`

> [!WARNING] `\0 = 数字0`【C语言中的字符串以0结尾】

```c++
#include <iostream>
#include <locale>
using namespace std;

int main()
{
	// 两种字符串数组风格
	char str1[0xff]{ 'H','e','l','l','o','\0'};
	char str2[0xff]{ "Hello" };
	// 两种指针字符串风格
	char* str3 = (char*)"Hello";// 默认为const char[]类型，需要强转为char[]
	const char* str4 = "Hello"; // 同str3
	char* str5 = new char[0xff] {"Hello张三"};

	cout << str1 << " "<< str2<< " "<< str3<< endl;
	cout << str4 << " " << str5 << " "  << endl;

	// 宽字节字符串【假设编译器采用UTF16实现unicode标准】
	wchar_t wstr[0xff]{ L"Hello!张三" };
	for (int i = 0; wstr[i]; i++)
	{
		cout << hex << (short)wstr[i] << endl;
	}
	//wcout << wstr <<'1' << endl;
	// 不能显示中文：需要设置头文件的编码
	setlocale(LC_ALL, "chs");
	wcout << wstr <<'2' << endl;

	system("pause");

	return 0;
}
```



### 2.6.2 字符串处理

```c++
#define _CRT_SECURE_NO_WARNINGS // 须在第一行
#include <iostream>
#include <locale>

using namespace std;

int main()
{
	// C语言风格【char[] | wchar_t[]】
	// 如果输入超过定义在栈区的内存大小，就会引发异常！
	char name[0x10];
	scanf("%s", name);// 注意：此处name是数组名，本身就是指针

	cout <<"名字：" << name  << endl;
	printf("名字是：%s\n", name);

	wchar_t wstr[0x5];
	// 或动态申请内存【堆区的安全同理，依然会有越界问题】
	//wchar_t* wstr = new wchar_t[0x5];// 英文字母占一个字节，中文汉字2字节
	wscanf(L"%s", wstr);
	setlocale(LC_ALL, "chs");
	wprintf(L"名字是%s", wstr);

	system("pause");
	return 0;
}
```

> [!BUG] 上述的越界问题，可使用 `scanf_s / wscanf_s` 解决
>
> `scanf_s("%s", str, maxNum)；`
>
> `wscanf_s(L"%s", str, maxNum)；`
>
> 此时不需要：`#define _CRT_SECURE_NO_WARNINGS`

C++风格：

```c++
#include <iostream>
#include <locale>

using namespace std;

int main()
{
	// C++风格
	int x[0x10];
	cout << x << endl;//输出地址

	char name[0x10];
	cout << name << endl;// cout对char[]会优先当作字符串来处理
	cin >> name;
	cout << name << endl;

	wchar_t wstr[0x5];
	setlocale(LC_ALL, "chs");// 不设置默认为cmd窗口的字符集
	wcin >> wstr;
	wcout << wstr << endl;

	// 字符串长度:char[]
	cout << "字符串长度：" << strlen(name) << endl;
	// 字符串长度:wchar_t[] 【一个中文算两个字节】
	cout << "wchar_t字符串长度：" << wcslen(wstr) << endl;
	system("pause");

	return 0;
}
```

C语言中，关于字符串的复制，提供了`strcpy`、`strncpy`、`strlcpy`，c++中提供了更为安全的`strcpy_s`等，需要随后补充。





### 2.6.3 C++字符串

> [!question] `std::string`
>
> 原生的C风格字符串，存在一系列问题，比如字符串连接等。

```c++
#include <iostream>
#include <string>
using std::string;

int main()
{
	string str("葡萄皮！");
	std::cout << str << std::endl;
	std::cin >> str;
	std::cout << str << std::endl;

	// 其他的初始化方法：【中文支持不佳】
	// string str1{"12345678", 3};// 截取第二个参数长度的字符串
	// string str2{"12345678", int start, int length};// 截取起始的特定长度的字符串
	// string str3(int total, 'a');// 初始化total个a【a可用65代替】
	string str1(3, 'a');//aaa
	std::cout << str + str1 << std::endl;

	// string + int ：需要转string才能拼接
	int age{ 10 };
	str1 = str1 + std::to_string(age);
	std::cout << str1 << std::endl;


	system("pause");

	return 0;
}
```

**string进阶：**

- 字符串相加
- 字符串连接：`.append()`
- 字符串截取：`.substr()`
- 字符串长度：`.length()`
- 字符串比较：重载 `==`、`!=`、`>`、`<`、`>=`、`<=`
- 字符串比较：`.compare()`
- 字符串搜索：`.find()`、`.rfind()`【倒搜索】
- 字符串插入：`.insert()`
- 字符串替换：`.replace()`
- 字符串删除内存：`.erase()`

```c++
#include <iostream>
#include <string>
using namespace std;

#define name "John"
#define age "18"

int main()
{
	string str,strA;
	//str = "123" + "456";   // 错误：两个常量不能直接操作
	str = string{ "123" } + "456";
	cout << str << endl;

	// 常见错误：优先级：+ > +=
	//str += "a" + "b";
	str += "a" + string{ "b" };
	cout << str << endl;

	// 另一种变通方法【作用不大：仅用于已经定义过的常量】
	strA = "123""abc";
	cout << strA << endl;
	strA = name age;
	cout << strA << endl;

	// 字符串和字符可直接相加
	char ch = 'a';
	strA = strA + ch;
	cout << strA << endl;
	//strA += ch + 'o'; // 错误：相当于ASCⅡ码直接相加；
	//等价于 strA += char(ch + 'o');

	// 字符串拼接函数【直接操作原字符串】
	strA.append("456").append("789");
	cout << strA << endl;
	// 切分后再拼接
	strA.append("abc", 1);
	cout << strA << endl;
	strA.append("abcdef", 1,4);
	cout << strA << endl;

	// 截取字符串【substr函数返回新的字符串，不操作原字符串】
	string sub1{ strA.substr(1) };// 从第一位开始截取
	string sub2{ strA.substr(1,3) };//从第一位开始，一直到第三位【闭区间】
	cout << sub1 << endl; 
	cout << sub2 << endl;
	
	// 字符串长度【不包含结尾\0，且不支持中文，中文算两个】
	cout << strA.length() << endl;
    
    //原生的指针和数组字符串，不易比较
    char* str1{ (char*)"123456" };
    char* str2{ (char*)"123456" };

    // 本质是对比指针地址，但由于编译器对内存使用的优化
    // 考虑到初始化的两个常量一样，故两个指针指向同一块内存空间
    if (str1 == str2)
        cout << "相等" << endl;

    // string重载== !=，> 等，可直接比较【中文支持不好】
    string str3{ "1234" };
    string str4{ "12345" };
    if (str3 == str4)
        cout << "equal" << endl;
    else
        cout << "no equal" << endl;

    // compare函数比较：返回int：等则0；大于则正数；小于则负数
    if (str3.compare(str4) != 0)
        cout << "no equal" << endl;
    // compare重载：str.compare(起始位置，参与比较的长度，被比较的字符串)
    if (str4.compare(0, 4, str3) == 0)
        cout << "equal" << endl;
    // compare重载：str.compare(起始位置，参与比较的长度，被比较的字符串, 被比较字符串起始位置，参与长度)
    if (str4.compare(0, 3, str3, 0, 3) == 0)
        cout << "equal" << endl;

    // 字符串搜索功能:返回无符号整数【子串第一次出现的位置】
    cout << "34第一次出现的位置：" << str4.find("34") << endl;
    // find重载：str.find(子串，从第n个位置开始查)
    // find重载：str.find(子串，从第n个位置开始查，纳入搜索的长度)
    // 当find返回std::string::npos时，表示未找到【如果是int型，=-1】
    cout << str4.find("347") << endl;
    
    // str.insert(要插入的位置，str_insert)
    // insert重载：str.insert(要插入的位置，插入字符个数，字符如‘*’)
    // insert重载：str.insert(要插入的位置，str_insert,要插入字符串的起始位置，插入字符串长度)
    // insert重载：str.insert(要插入的位置，str_insert，要插入字符串的长度)
    
    // str.replace(str中的起始位置，str中要替换的长度，替换字符串str1)
    // str.replace(str中的起始位置，str中要替换的长度，替换字符长度，字符)
    // str.replace(str中的起始位置，str中要替换的长度，替换字符串str1, str1的节选长度)
    // str.replace(str中的起始位置，str中要替换的长度，替换字符串str1, str1的起始位置， str1的节选长度)
    
    // str.erase(删除的起始位置，删除长度);
    // str.erase(删除的起始位置);

	system("pause");

	return 0;
}
```


> [!attention]
> - string类的实例，可以用数组的方式访问特定的字符，如`str[1]`
> - 但中文支持不佳



### 2.6.4 指针数组字符串

C++11之前，与C字符串（`char*`）不同的是，C字符串以0结尾，而string有专门记录长度的属性，故实现的过程中没有严格要求以0结尾。

C++11后，要求string以0结尾。

- 通过 `.c_str()` 方法得到一个 `const char*` 的指针，指向str存储字符数据的内存空间(`str[0]`)
- 通过 `.data()` 方法得到一个 `const char*` 的指针，指向str存储字符数据的内存空间【C++17之后，返回一个非常量的指针】

```c++
#include <iostream>
#include <string>
using namespace std;

int main()
{
	string str{ "123456" };
	cout << str[0] << endl; // 输出1

	// 16进制地址/int型地址：发现str地址与str[0]地址不一致【string】
	cout << &str << " " << (int)&str << " " << (int)&str[0] << " " << (int)&str[1] << endl;
	//0000006ADF0FF518 -552602344 -552602336 -552602335

	// 字符串拼接后：当拼接后依然较小，地址不变
	str += "ddd";
	cout << &str << " " << (int)&str << " " << (int)&str[0] << " " << (int)&str[1] << endl;
	//0000006ADF0FF518 -552602344 -552602336 -552602335

	// 字符串拼接后：当拼接后较大，str地址不变，但str[0]首地址变化
	str += "dddddddddddddddddddddddddddddddddddddddddddddddddddddddddd";
	cout << &str << " " << (int)&str << " " << (int)&str[0] << " " << (int)&str[1] << endl;
	//0000006ADF0FF518 -552602344 857627760 857627761

	// 指向str存储字符数据的内存空间
	const char* baseStr = str.c_str();
	cout << (int)baseStr << endl;/ 857627760

	// 强制转换的方式来更改
	//char* baseStr = (char*)str.c_str();
	//baseStr[0] = '5';
	//cout << (int)baseStr << endl;

	system("pause");
	return 0;
}
```



### 2.6.5 字符串转数字

`std::to_string(数字)` 可以将数字转换为字符串，以下将字符串转为数字【C++11】：

- int【std::stoi(str)】
- long【std::stol(str)】
- long long【std::stoll(str)】
- unsigned long【std::stoul(str)】
- unsigned long long【std::stoull (str)】
- float【std::stof(str)】
- double【std::stod(str)】
- long double【std::stold (str)】



### 2.6.6 字符串流 `stringstream`

`std::stringstream` 定义在`<sstream>`中，`std::cout` 组织数据的形式基本比string要方便。

```CPP
// 返回一个string，包含std::stringstream的内容
std::stringstream.str();
```

```c++
#include <iostream>
#include <string>
#include <sstream>
using namespace std;

int main()
{
	stringstream strs;
	// 字符串均流进stringstream
	strs << "你好" << "123" << 456 << std::hex << 2048;
	// 从stringstream中提取字符串
	string str = strs.str();
	cout << str << endl;//你好123456800

	system("pause");
	return 0;
}
```



### 2.6.7 练习1

要求：不使用`strlen`来计算 `char[]` 字符串长度，用户只能输入英文和数字。

```c++
#include <iostream>

using namespace std;

int StrLength(char* A)
{
	if (*A != '\0') {
		return 1 + StrLength(A + 1);
	}
	else {
		return 0;
	}
}

int main()
{
	char str[0xff];
	cout << "输入字符串：";
	cin >> str;
	cout << endl;

	cout << "字符串长度为：" << StrLength(str) << endl;

	system("pause");
	return 0;
}
```



### 2.6.8 练习2

计算字符串长度，其中英混合。

> 英文占一个字节，值在`0~127`；中文两个字节，第一个字节小于0

```c++
#include <iostream>
#include <string>
using namespace std;

int main()
{
	string str;
	cin >> str;

	int length{ 0 };
	for (int i = 0; str[i]; i++) {
		if (str[i] < 0)
			i++;
		length++;
	}
	cout << length << endl;
	
	system("pause");
	return 0;
}
```

> [!attention] C++11之后，string末尾以0结尾。



### 2.6.9 练习3

要求：原生字符串的拼接

```c++
#include <iostream>
using namespace std;

int main()
{
	char str1[0x10] = "123";
    char str2[0x10] = "456";
    
    char str[0x20];
    memcpy(str, str1, strlen(str1));
    memcpy(str + strlen(str1), str2, strlen(str2) + 1);
	
	cout << str << endl;
	system("pause");

	return 0;
}
```



<br>

## 2.7 布尔类型 bool

**作用**：布尔数据类型代表真或假的值。

- bool类型只有两个值：
	- true：真（本质是1）
	- false：假（本质是0）
- **bool类型占<span style="background:#FFFF00;">1个字节</span>大小（只要不为0，就为true）**



<br>

## 2.8 推断类型auto

```c++
// auto
// 定义auto变量：auto 变量名 {初始值}
// 查看变量类型：typeid(变量).name()
```

> [!note] 后续补充



<br>

## 2.9 枚举类型 

```c++
// enum class 类型名称：基本类型 {...}  -----> 可用于替代#define多次定义宏常量
#include <iostream>
#define Normal 0
#define Hign 1
#define Rare 2
#define Epic 3
#define Legend 4
#define Myth 5

int main()
{
	// 定义枚举类型【默认int】
	enum class EquipLV :int {
		normal = 10,// 后面会自增+1
		high,
		rare,
		epic,
		legeng,
		myth = 100
	};
	// 声明枚举类型
	EquipLV weaponA{ EquipLV::high };
	EquipLV weaponB{ EquipLV::myth };

    // 枚举类型的计算需要强制转换
	short diff = (int)weaponA - (int)weaponB;
	std::cout << diff;
}
```



<br>

## 2.10  数据的输入

**作用**：用于从键盘获取数据

**关键字**：cin

```C++
int main(){

	//整型输入
	int a = 0;
	cout << "请输入整型变量：" << endl;
	cin >> a;
	cout << a << endl;

	//浮点型输入
	double d = 0;
	cout << "请输入浮点型变量：" << endl;
	cin >> d;
	cout << d << endl;

	//字符型输入
	char ch = 0;
	cout << "请输入字符型变量：" << endl;
	cin >> ch;
	cout << ch << endl;

	//字符串型输入
	string str;
	cout << "请输入字符串型变量：" << endl;
	cin >> str;
	cout << str << endl;

	//布尔类型输入
	bool flag = true;
	cout << "请输入布尔型变量：" << endl;
	cin >> flag;
	cout << flag << endl;
	
	system("pause");
	return EXIT_SUCCESS;
}
```

<br>

## 2.11 类型转换

```c++
#include <iostream>

int main()
{
	int a{500};
	unsigned b{ 1000 };
	long long a1{500};
	
	std::cout << a-b << std::endl;
    // out:4294966796
    std::cout << int(a-b) << std::endl;
    // out:-500
    std::cout << a1-b << std::endl;
    // out:-500
    a -= b;
	std::cout << a << std::endl; 
    // out:-500
}
// 原因：类型转换顺序表---【隐式转换】
// long double
// double
// float
// unsigned long long
// long long
// unsigned long
// long
// unsigned int
// int
// 故a-b后类型为unsigned int，即-500 = 4294966796
```

> [!ntoe] `sizeof`：返回占用字节数

**显式转换**：C++的方式更稳妥，当保证不会出错时可以用C的方式。

| 语言  | 操作                         | 举例                             |
| --- | -------------------------- | ------------------------------ |
| C++ | `static_cast<目标类型>`(转换的内容) | `int a = static_cast<int>(b);` |
| C   | 类型（转换的内容）                  | `int a = (int)b;`              |

<br>

## 2.12 格式化输出流

![](cpp1-10.png)

```c++
#include <iostream>

int main()
{
	std::cout << 3E20 << ',';
	std::cout << std::fixed;
	std::cout << 3E20;
    // 3e+20,300000000000000000000.000000
}
// 后面的 setW() setfill() left right都很有用
```

`printf`是个函数，`std`是个类。`printf("字符串%s,%d","张三",20);`

| 标志 | 说明                        |
| :--: | :-------------------------- |
|  d   | 十进制整数                  |
|  o   | 八进制整数                  |
|  u   | 无符号十进制整数            |
| x/X  | 十六进制整数                |
|  f   | float小数                   |
|  lf  | double小数                  |
|  s   | 字符串%s                    |
|  0   | 用0补齐，如%05d，00001      |
|  +   | 替数字输出正负符号%+d，如+1 |



```c++
scanf("%d", &a); // 目前c++认为不安全，需要加#define _CRT_SECURE_NO_WARNINGS

scanf_s("%d", &a);

// 无显示输入:头文件 #include <conio.h>  
int _getch() // 多用于游戏获取键位输入

```

<br>

# 三 运算符

**作用**：用于执行代码的运算

| **运算符类型** | **作用**              |
| --------- | ------------------- |
| 算术运算符     | 用于处理四则运算            |
| 赋值运算符     | 用于将表达式的值赋给变量        |
| 比较运算符     | 用于表达式的比较，并返回一个真值或假值 |
| 逻辑运算符     | 用于根据表达式的值返回真值或假值    |

## 3.1 算术运算符

算术运算符：用于处理四则运算。算术运算符包括以下符号：

| **运算符** | **术语** | **示例**      | **结果**    |
| ------- | ------ | ----------- | --------- |
| +       | 正号     | +3          | 3         |
| -       | 负号     | -3          | -3        |
| +       | 加      | 10 + 5      | 15        |
| -       | 减      | 10 - 5      | 5         |
| *       | 乘      | 10 * 5      | 50        |
| /       | 除      | 10 / 5      | 2         |
| %       | 取模(取余) | 10 % 3      | 1         |
| ++      | 前置递增   | a=2; b=++a; | a=3; b=3; |
| ++      | 后置递增   | a=2; b=a++; | a=3; b=2; |
| --      | 前置递减   | a=2; b=--a; | a=1; b=1; |
| --      | 后置递减   | a=2; b=a--; | a=1; b=2; |

> [!attention]
> 1. 在除法运算中，除数不能为0。
> 2. 只有整型变量可以进行取模运算。
> 3. 前置递增先对变量进行++，再计算表达式，后置递增相反。



## 3.2 赋值运算符

**作用**：用于将表达式的值赋给变量。

| **运算符** | **术语** | **示例**     | **结果**    |
| ------- | ------ | ---------- | --------- |
| =       | 赋值     | a=2; b=3;  | a=2; b=3; |
| +=      | 加等于    | a=0; a+=2; | a=2;      |
| -=      | 减等于    | a=5; a-=3; | a=2;      |
| *=      | 乘等于    | a=2; a*=2; | a=4;      |
| /=      | 除等于    | a=4; a/=2; | a=2;      |
| %=      | 模等于    | a=3; a%2;  | a=1;      |



## 3.3 比较运算符

**作用**：用于表达式的比较，并返回一个真值或假值

| **运算符** | **术语** | **示例** | **结果** |
| ------- | ------ | ------ | ------ |
| ==      | 相等于    | 4 == 3 | 0      |
| !=      | 不等于    | 4 != 3 | 1      |
| <       | 小于     | 4 < 3  | 0      |
| \>      | 大于     | 4 > 3  | 1      |
| <=      | 小于等于   | 4 <= 3 | 0      |
| \>=     | 大于等于   | 4 >= 1 | 1      |

> [!attention] C和C++ 语言的比较运算中，<span style="background:#FFFF00;">“真”用数字“1”来表示， “假”用数字“0”来表示。</span>  



## 3.4 逻辑运算符

**作用**：用于根据表达式的值返回真值或假值

| **运算符** | **术语** | **示例** | **结果**                                                 |
| ---------- | -------- | -------- | -------------------------------------------------------- |
| !          | 非       | !a       | 如果a为假，则!a为真；  如果a为真，则!a为假。             |
| &&         | 与       | a && b   | 如果a和b都为真，则结果为真，否则为假。                   |
| \|\|       | 或       | a \|\| b | 如果a和b有一个为真，则结果为真，二者都为假时，结果为假。 |



## 3.5 位运算

| **运算符** | **术语** | **示例** |
| ---------- | -------- | -------- |
| <<         | 左移     | `a << 1` |
| `>>`       | 右移     | `a >> 1` |
| `~`        | 取反     | `~b`     |
| `&`        | 求与     | `a & b`  |
| `^`        | 异或     | `a ^ b`  |

> [!note] 无符号数的左移右移补0，正数补，负数补0
>
> 其他情况详见 **计算机组成原理**

```c++
// 二进制显示
#include <iostream>
#include <bitset>

int main()
{
	int a{ (int)0b11111111111111110000000000000000 };
	std::cout << a << ',';
	std::cout << std::bitset<32>(a);
	// -65536,11111111111111110000000000000000
}
```



## 3.5 运算符优先级

> [!note] 运算符优先级：十八级

- 第一优先级：作用域解析运算符 `::`

- 第二优先级：结合运算符【函数调用、数组下标、取成员、类型转换、后置运算符等】【从左向右】

  如 `()  []  ->  .  typeid  ++ --`【后缀】

- 第三优先级：一元运算符

  如：`!  ~  +  -  ++  --  &  *`  `()【类型转换】`  `sizeof new  new[]  delete  delete[]`

- 第四优先级：类成员指针运算符：`.*  ->*`

- 第五优先级：乘除模：`*  /  %`

- 第六优先级：加减  `+  -`

- 第七优先级：移位运算符： `>>  <<`

- 第八优先级：比较运算符：`<  <=  >  >=`

- 第九优先级：比较运算符：`==  !=`

- 第十十一十二级：`&【AND】^【异或】|【或】`

- 第十三十四级：&&【且】 ||【或】

- 第十五级：三目运算符：`:?`

- 第十六级：赋值运算符

- 第十七级：`引发异常 throw`

- 第十八级：`,【逗号】`

<br>

# 四 程序流程结构

C/C++支持最基本的三种程序运行结构：<span style="background:#FFFF00;">顺序结构、选择结构、循环结构</span>

* 顺序结构：程序按顺序执行，不发生跳转
* 选择结构：依据条件是否满足，有选择的执行相应功能
* 循环结构：依据条件是否满足，循环多次执行某段代码



#### 4.1 选择结构

##### 4.1.1 if语句

**作用：**执行满足条件的语句

if语句的三种形式

- 单行格式if语句：`if(条件){ 条件满足执行的语句 }`
- 多行格式if语句：`if(条件){ 条件满足执行的语句 }else{ 条件不满足执行的语句 };`
- 多条件的if语句：`if(条件1){ 条件1满足执行的语句 }else if(条件2){条件2满足执行的语句}... else{ 都不满足执行的语句}`

```c++
if(条件){
    变量声明;
}
// c++17新语法【相应的在switch中也有体现】
if(变量声明; 条件){
    //...
}else{}
```

<br>

##### 4.1.2 三目运算符

**作用：** 通过三目运算符实现简单的判断

**语法：**`表达式1 ? 表达式2 ：表达式3`

**解释：**

如果表达式1的值为真，执行表达式2，并返回表达式2的结果；

如果表达式1的值为假，执行表达式3，并返回表达式3的结果。

<br>

##### 4.1.3 switch语句

**作用：**执行多条件分支语句

**语法：**

```C++
switch(表达式)
{
	case 结果1：执行语句;break;

	case 结果2：执行语句;break;

	...

	default:执行语句;break;
}

// c++17新语法
switch(变量声明; 表达式)
{
	case 结果1：执行语句; break;
    case 结果2：执行语句; [[fallthrough]];
	default:执行语句;break;
}
```

> 注意1：switch语句中表达式类型只能是**整型或者字符型**
>
> 注意2：case里如果没有break，那么程序会一直向下执行
>
> 注意3：c++17新增：`[[fallthrough]];` 用于替代不使用 `break` 的情况

> 总结：与if语句比，对于多条件判断时，switch的结构清晰，执行效率高，缺点是switch不可以判断区间
>
> 注意：if与switch的效率差异在于汇编不同。从汇编角度，switch将比较操作提前转换为一张字典表，每次执行swtich其实只是查表操作。



#### 4.2 循环结构

> 执行效率：do_while > while > goto > for

##### 4.2.1 while循环语句

**作用：**满足循环条件，执行循环语句

**语法：**` while(循环条件){ 循环语句 }`

**解释：**只要循环条件的结果为真，就执行循环语句



##### 4.2.2 do...while循环语句

**作用：** 满足循环条件，执行循环语句

**语法：** `do{ 循环语句 } while(循环条件);`

**注意：**与while的区别在于<span style="background:#FFFF00;">do...while会先执行一次循环语句</span>，再判断循环条件



##### 4.2.3 for循环语句

**作用：** 满足循环条件，执行循环语句

**语法：**` for(起始表达式;条件表达式;末尾循环体) { 循环语句; }`

**逻辑：**起始表达式 -> 判断条件表达式 -> 执行循环内容 -> 执行末尾循环体 -> 判断……



##### 4.2.4 嵌套循环

**作用：** 在循环体中再嵌套一层循环，解决一些实际问题



#### 4.3 跳转语句

##### 4.3.1 break语句

**作用:** 用于跳出<span style="background:#FFFF00;">选择结构</span>或者<span style="background:#FFFF00;">循环结构</span>

break使用的时机：

* 出现在switch条件语句中，作用是终止case并跳出switch
* 出现在循环语句中，作用是跳出当前的循环语句
* 出现在嵌套循环中，跳出最近的内层循环语句



##### 4.3.2 continue语句

**作用：**在<span style="background:#FFFF00;">循环语句</span>中，跳过本次循环中余下尚未执行的语句，继续执行下一次循环

> 注意：continue并没有使整个循环终止，而break会跳出循环



##### 4.3.3 goto语句

**作用：**可以无条件跳转语句

**语法：** `goto 标记;`

**解释：**如果标记的名称存在，执行到goto语句时，会跳转到标记的位置

**示例：**

```C++
int main() {

	cout << "1" << endl;

	goto FLAG;

	cout << "2" << endl;
	cout << "3" << endl;
	cout << "4" << endl;

	FLAG:

	cout << "5" << endl;
	system("pause");
	return 0;
}
```

> 注意：在程序中不建议使用goto语句，以免造成程序流程混乱



#### 4.4 生命周期

##### 4.4.1 命名空间

```c++
#include <iostream>

// 命名空间定义不放在函数体内
// 可以嵌套定义
// 子级命名空间调用父级命名空间依然需要限定符
namespace name {
	int HP{ 1000 };
	int Mp{ 100 };
	namespace Weapon {
		int lv1 = 1;
		int lv2 = 2;
	}
}

int main()
{
	//using std::cout;// 推荐
	//using std::cin;
	//using namespace::cout;
	// 很方便，但当命名空间多了之后会出现冲突 
	using namespace std;

	name::HP = 500;
	cout << "无需std1," << name::HP <<','<< name::Weapon::lv2;
	int a;
	cin >> a;
}
```



##### 4.4.2 生命周期

- 代码块中，变量的生命周期从声明开始，直到这个代码块结束
- 声明在代码块之前的为全局变量，其生命周期直到程序退出
- 变量名冲突情况，采用就近原则
- 可以使用限定符来访问冲突的全局变量

```c++
#include <iostream>
using namespace std;
int a = 1;

int main()
{
	int a{ 160 };
	{
		int a{ 350 };
		{
			char a = 'a';
			cout << a << endl;
		}
		cout << a << endl;
		cout << ::a << endl; // 访问全局变量
	}
}
```

<br>

### 5、数组

#### 5.1 概述

所谓数组，就是一个集合，里面存放了相同类型的数据元素

**特点1：**数组中的每个<span style="background:#FFFF00;">数据元素都是相同的数据类型</span>

**特点2：**数组是由<span style="background:#FFFF00;">连续的内存</span>位置组成的

> 变量不初始化编译器不让用，但数组不初始化是可以用的
>
> 但建议初始化，使用 `int array[10]{}; // 用0初始化` 



#### 5.2 一维数组

##### 5.2.1 一维数组定义方式

一维数组定义的三种方式：

1. ` 数据类型  数组名[ 数组长度 ]; `
2. `数据类型  数组名[ 数组长度 ] = { 值1，值2 ...};`
3. `数据类型  数组名[ ] = { 值1，值2 ...};`

**示例**

```C++
int main() {

	//定义方式1
	//数据类型 数组名[元素个数];
	int score[10];

	//利用下标赋值
	score[0] = 100;
	score[1] = 99;
	score[2] = 85;

	//利用下标输出
	cout << score[0] << endl;
	cout << score[1] << endl;
	cout << score[2] << endl;


	//第二种定义方式
	//数据类型 数组名[元素个数] =  {值1，值2 ，值3 ...};
	//如果{}内不足10个数据，剩余数据用0补全
	int score2[10] = { 100, 90,80,70,60,50,40,30,20,10 };
	
	//逐个输出
	//cout << score2[0] << endl;
	//cout << score2[1] << endl;

	//利用循环进行输出
	for (int i = 0; i < 10; i++)
	{
		cout << score2[i] << endl;
	}

	//定义方式3
	//数据类型 数组名[] =  {值1，值2 ，值3 ...};
	int score3[] = { 100,90,80,70,60,50,40,30,20,10 };

	for (int i = 0; i < 10; i++)
	{
		cout << score3[i] << endl;
	}

	system("pause");
	return 0;
}
```



##### 5.2.2 一维数组数组名

一维数组名称的**用途**：

1. 可以统计整个数组在内存中的长度
2. 可以获取数组在内存中的首地址

**示例：**

```C++
int main() {

	//数组名用途
	//1、可以获取整个数组占用内存空间大小
	int arr[10] = { 1,2,3,4,5,6,7,8,9,10 };

	cout << "整个数组所占内存空间为： " << sizeof(arr) << endl;
	cout << "每个元素所占内存空间为： " << sizeof(arr[0]) << endl;
	cout << "数组的元素个数为： " << sizeof(arr) / sizeof(arr[0]) << endl;

	//2、可以通过数组名获取到数组首地址
	cout << "数组首地址为： " << (int)arr << endl;
	cout << "数组中第一个元素地址为： " << (int)&arr[0] << endl;
	cout << "数组中第二个元素地址为： " << (int)&arr[1] << endl;

	//arr = 100; 错误，数组名是常量，因此不可以赋值

	system("pause");
	return 0;
}
```



##### 5.2.3 冒泡排序

**作用：** 最常用的排序算法，对数组内元素进行排序

1. 比较相邻的元素。如果第一个比第二个大，就交换他们两个。
2. 对每一对相邻元素做同样的工作，执行完毕后，找到第一个最大值。
3. 重复以上的步骤，每次比较次数-1，直到不需要比较

**示例：** 

```C++
// 将数组 { 4,2,8,0,5,7,1,3,9 } 进行升序排序
int main() {

	int arr[9] = { 4,2,8,0,5,7,1,3,9 };

	for (int i = 0; i < 9 - 1; i++)
	{
		for (int j = 0; j < 9 - 1 - i; j++)
		{
			if (arr[j] > arr[j + 1])
			{
				int temp = arr[j];
				arr[j] = arr[j + 1];
				arr[j + 1] = temp;
			}
		}
	}

	for (int i = 0; i < 9; i++)
	{
		cout << arr[i] << endl;
	}
    
	system("pause");

	return 0;
}
```



#### 5.3 二维数组

二维数组就是在一维数组上，多加一个维度。

##### 5.3.1 二维数组定义方式

二维数组定义的四种方式：

1. ` 数据类型  数组名[ 行数 ][ 列数 ]; `
2. `数据类型  数组名[ 行数 ][ 列数 ] = { {数据1，数据2 } ，{数据3，数据4 } };`
3. `数据类型  数组名[ 行数 ][ 列数 ] = { 数据1，数据2，数据3，数据4};`
4. ` 数据类型  数组名[  ][ 列数 ] = { 数据1，数据2，数据3，数据4};`

> 建议：以上4种定义方式，利用<span style="background:#FFFF00;">第二种更加直观，提高代码的可读性</span>

示例：

```C++
int main() {

	//方式1  
	//数组类型 数组名 [行数][列数]
	int arr[2][3];
	arr[0][0] = 1;
	arr[0][1] = 2;
	arr[0][2] = 3;
	arr[1][0] = 4;
	arr[1][1] = 5;
	arr[1][2] = 6;

	for (int i = 0; i < 2; i++)
	{
		for (int j = 0; j < 3; j++)
		{
			cout << arr[i][j] << " ";
		}
		cout << endl;
	}

	//方式2 
	//数据类型 数组名[行数][列数] = { {数据1，数据2 } ，{数据3，数据4 } };
	int arr2[2][3] =
	{
		{1,2,3},
		{4,5,6}
	};

	//方式3
	//数据类型 数组名[行数][列数] = { 数据1，数据2 ,数据3，数据4  };
	int arr3[2][3] = { 1,2,3,4,5,6 }; 

	//方式4 
	//数据类型 数组名[][列数] = { 数据1，数据2 ,数据3，数据4  };
	int arr4[][3] = { 1,2,3,4,5,6 };
	
	system("pause");

	return 0;
}
```

> 总结：在定义二维数组时，如果初始化了数据，可以省略行数



##### 5.3.2 二维数组数组名

* 查看二维数组所占内存空间
* 获取二维数组首地址

**示例：**

```C++
int main() {

	//二维数组数组名
	int arr[2][3] =
	{
		{1,2,3},
		{4,5,6}
	};

	cout << "二维数组大小： " << sizeof(arr) << endl;
	cout << "二维数组一行大小： " << sizeof(arr[0]) << endl;
	cout << "二维数组元素大小： " << sizeof(arr[0][0]) << endl;

	cout << "二维数组行数： " << sizeof(arr) / sizeof(arr[0]) << endl;
	cout << "二维数组列数： " << sizeof(arr[0]) / sizeof(arr[0][0]) << endl;

	//地址
	cout << "二维数组首地址：" << arr << endl;
	cout << "二维数组第一行地址：" << arr[0] << endl;
	cout << "二维数组第二行地址：" << arr[1] << endl;

	cout << "二维数组第一个元素地址：" << &arr[0][0] << endl;
	cout << "二维数组第二个元素地址：" << &arr[0][1] << endl;

	system("pause");

	return 0;
}
```

> 总结1：二维数组名就是这个数组的首地址

> 总结2：对二维数组名进行sizeof时，可以获取整个二维数组占用的内存空间大小



#### 5.3 数组遍历

值得注意的是：<span style="background:#FFFF00;">二维数组在内存中依然是顺序存放的，故其可以使用指针用一层for循环遍历。</span>

```c++
#include <iostream>
using namespace std;

int main()
{
	int stuID[]{1001,1002,1003,1004,1005,1006};
	for (int i = 0; i < sizeof(stuID)/sizeof(int); i++)
	{
		cout << stuID[i] << endl;
	}
	// for(变量类型 变量名：数组) c++11
	// for(auto 变量名：数组) c++11
	for (int a : stuID) {
		cout << a << endl;
	}
}
```



#### 5.4 std::array

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



#### 5.4 std::vector

> 向量，也可以实现数组的功能。

```c++
// std::vector<数据类型> 变量名;
// std::vector<int> stu;
// std::vector<int> stu{1,2,3};
// std::vector<int> stu(5); // 设置5个元素
// std::vector<int> stu(5, 100); // 设置5个元素,每个元素初值100

// 新方法：
// stu.push_back(1); // 在末尾添加
// stu.assign(10, 100); // 将vector重新初始化为拥有10个值为100的元素
// stu.clear(); // 清空
// stu.empty(); // 是不是空的？

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

### 6、函数

#### 6.1 概述

**作用：**将一段经常使用的代码封装起来，减少重复代码

一个较大的程序，一般分为若干个程序块，每个模块实现特定的功能。

#### 6.2 函数的定义

函数的定义一般主要有5个步骤：

- 返回值类型 
- 函数名
- 参数表列
- 函数体语句 
- `return` 表达式

```C++
//函数定义
int add(int num1, int num2)
{
	int sum = num1 + num2;
	return sum;
}
```



#### 6.3 参数类型

##### 6.3.1 指针参数

```c++
#include <iostream>
using namespace std;


struct Role
{
	int hp;
	int mp;
};
int Exp(Role r)
{
	return r.hp + r.mp;
}
// const 限定为只读：常量指针
int Exp(const Role* r)
{
	return r->hp + r->mp;
}

int add(int* a, int* b)
{
	(*a) *= 100;
	*b *= 10;
	return *a + *b;// 此处不加括号是否存在问题？
}

int main()
{
	//指针参数的应用场景一
	int x = 1, y = 2;
	int z = add(&x, &y);
	cout << "x=" << x << " y=" << y << " z=" << z << endl;

	//指针参数的应用场景二
	Role rl{ 100, 200 };
	int p{ Exp(&rl) };
	cout << "p=" << p << endl;

	system("pause");

	return 0;
}
```



##### 6.3.2 数组参数

```c++
#include <iostream>
using namespace std;

void sort(int* arr, unsigned count)
{
	for (int i = 0; i < count; i++)
	{
		for (int j = 0; j < count-1; j++)
		{
			if (arr[j] > arr[j + 1])
			{
				int tmp = arr[j];
				arr[j] = arr[j + 1];
				arr[j + 1] = tmp;
			}
		}
	}
}

// 阅读性更好，本质是一样的
void sort(int arr[], unsigned count)
{
	for (int i = 0; i < count; i++)
	{
		for (int j = 0; j < count - 1; j++)
		{
			if (arr[j] > arr[j + 1])
			{
				int tmp = arr[j];
				arr[j] = arr[j + 1];
				arr[j + 1] = tmp;
			}
		}
	}
}

// 多维数组
void sort(int a[][2], unsigned count){}

int main()
{
	int a[5]{ 2,3,1,5,4 };
	for (auto x : a) cout << x << endl;
	sort(a, 5);
	for (auto x : a) cout << x << endl;

	system("pause");

	return 0;
}
```



##### 6.3.3 不定量参数

> `main` 函数的完全写法：

```c++
#include <iostream>
using namespace std;

int main(int argcount, char* c_arg[])
{
	// argcount为int 或 unsigned 
	// 第一个参数为可执行文件的路径和文件名，即默认1个
	// 指针数组 c_arg 的最后一个元素为 nullptr
	// 因为本身就是一个字符串，根据空格切分后将地址存放进c_arg
	cout << "参数个数:" << argcount << endl;

	for (int i = 0; i < argcount; i++)
	{
		cout << "参数[" << i + 1 << "]=[" << *c_arg[i] << "]" << endl;
	}
	cout << endl;
	// 或者利用指针数组 c_arg 的最后一个元素为 nullptr
	for (int i = 0; c_arg[i]; i++)
	{
		cout << "参数[" << i + 1 << "]=[" << *c_arg[i] << "]" << endl;
	}

	system("pause");

	return 0;
}
```

另一种不定量参数：【需头文件`<cstdarg>`】

```c++
#include <iostream>
#include <cstdarg>
using namespace std;

// 不定量参数的第一个参数：参数个数
int average(int count, ...)
{
	//va_list arg; // 本质是一个char*,即作用同下
	char* arg;
	va_start(arg, count);// 初始化arg，arg指向参数地址

	int sum{ 0 }, x{};
	for (int i{}; i < count; i++)
	{
		int x = va_arg(arg, int); // 参数一：参数指针 参数二：类型
		sum += x;
		cout << x << endl;;
	}
	sum /= count;

	va_end(arg);//释放

	return sum;
}

int main(int argcount, char* c_arg[])
{
	int x = average(9, 1, 2, 3, 4, 5, 6, 7, 8, 9);
	cout << "平均数：" << x << endl;

	system("pause");

	return 0;
}
```



#### 6.4 值传递

> 函数定义里小括号内称为形参，函数调用时传入的参数称为实参

* 所谓值传递，就是函数调用时实参将数值传入给形参
* 值传递时，<span style="background:#FFFF00;">如果形参发生改变，并不会影响实参</span>

**示例：**

```C++
void swap(int num1, int num2)
{
	int temp = num1;
	num1 = num2;
	num2 = temp;

	//return ; 当函数声明时候，不需要返回值，可以不写return
}

int main() {

	int a = 10;
	int b = 20;

	swap(a, b);

	cout << "mian中的 a = " << a << endl;
	cout << "mian中的 b = " << b << endl;

	system("pause");

	return 0;
}
```

> 总结： 值传递时，形参是修改不了实参的【除非操作地址】



#### 6.5 函数的声明

**作用：** 告诉编译器函数名称及如何调用函数。函数的实际主体可以单独定义。

*  函数的**声明可以多次**，但是函数的**定义只能有一次**
*  **注意**：函数在使用前，必须被声明或者定义

**示例：**

```C++
//声明可以多次，定义只能一次
//声明
int max(int a, int b);
int max(int a, int b);
//定义
int max(int a, int b)
{
	return a > b ? a : b;
}

int main() {

	int a = 100;
	int b = 200;

	cout << max(a, b) << endl;

	system("pause");

	return 0;
}
```



#### 6.6 函数的分文件编写

**作用：**让代码结构更加清晰

函数分文件编写一般有4个步骤：

1. 创建后缀名为.h的头文件  
2. 创建后缀名为.cpp的源文件
3. 在头文件中写函数的声明
4. 在源文件中写函数的定义

**示例：**

```C++
//swap.h文件
#include<iostream>
using namespace std;

//实现两个数字交换的函数声明
void swap(int a, int b);

```

```C++
//swap.cpp文件
//注意！！
#include "swap.h"

void swap(int a, int b)
{
	int temp = a;
	a = b;
	b = temp;

	cout << "a = " << a << endl;
	cout << "b = " << b << endl;
}
```

```C++
//main函数文件
#include "swap.h"
int main() {

	int a = 100;
	int b = 200;
	swap(a, b);

	system("pause");

	return 0;
}

```



#### 6.7 函数返回：指针和引用

注意：字符串赋值，如果需要二次处理，直接使用常量赋值的方法是不行的。需要重新分配内存空间，其中要注意返回值为局部变量的 "坑"！

```c++
#include <iostream>
using namespace std;

// 函数：求字符串长度
int clen(const char* str)
{
	int i{};
	for (i = 0; str[i]; i++);
	return ++i;
}

// 目标：使用该函数给c字符串赋值
char*  Cstr(const char* str)
{
	int len = clen(str);
	cout << "len:" << len << endl;
	
	//char strRt[0x20];
	//memcpy(strRt, str, len);

	// 此时存在的问题：strRt是【局部变量】，函数结束后，strRt的栈空间内存被回收
	//return strRt;

	char* strRt = new char[0x20]; // 堆内存需要delete
	memcpy(strRt, str, len);

	return strRt;
}

int main(int argcount, char* c_arg[])
{
	char* str;
	str = (char*)"你好";//将指针str强行指向常量的内存地址，并没有为str分配内存空间
	// str[0] = 0;// 错误：str指向常量的地址空间，没有修改的权限
	cout << str << endl;

	// 下面给str重新赋值
	str = Cstr("你好");
	cout << str << endl;

	system("pause");

	return 0;
}
```

注意：结构体作为函数的返回值【不常用】，一般返回指针或引用

```c++ 
#include <iostream>
using namespace std;

// 函数：求字符串长度
int clen(const char* str)
{
	int i{};
	for (i = 0; str[i]; i++);
	return ++i;
}

// 目标：使用该函数给c字符串赋值
char* Cstr(const char* str)
{
	int len = clen(str);

	char* strRt = new char[0x20]; // 堆内存需要delete
	memcpy(strRt, str, len);

	return strRt;
}

typedef struct Role
{
	char* Name;
	int HP;
	int maxHP;
	int MP;
	int maxMP;

}*PROLE, ROLE;

// 返回结构体，好理解，但性能太差
ROLE createRole(const char* str, int HP, int MP)
{
	Role rt{ Cstr(str),HP,HP,MP,MP };
	return rt;
}
// 返回指针：注意不要返回局部变量
PROLE PcreateRole(const char* str, int HP, int MP)
{
	PROLE rt = new ROLE{ Cstr(str),HP,HP,MP,MP };
	return rt;
}
// 返回引用【结构体的引用】
ROLE& PPcreateRole(const char* str, int HP, int MP)
{
	PROLE rt = new ROLE{ Cstr(str),HP,HP,MP,MP };
	// rt是指针，返回值是结构体的引用
	return *rt;// 还原指针
}

int main(int argcount, char* c_arg[])
{
	ROLE role = createRole("abc", 10, 20);
	cout << role.Name << ":" << role.HP << "/" << role.MP << endl;

	// 实际上不会这么写，内存开销太大！
	//【create函数创建、返回的结构体，都会每次重新一一赋值给新的变量role】
	// 
	// 避免方式1：返回指针
	PROLE r1 = PcreateRole("abc", 10, 20);
	cout << r1->Name << ":" << r1->HP << "/" << r1->MP << endl;

	// 避免方式2：返回引用
	ROLE& r2 = PPcreateRole("abc", 10, 20);
	cout << r2.Name << ":" << r2.HP << "/" << r2.MP << endl;

	system("pause");

	return 0;
}
```



<br>

### 7、指针

#### 7.1 指针的基本概念

**指针的作用：** 可以通过指针间接访问内存

* 内存编号是从0开始记录的，一般用十六进制数字表示
* 可以利用指针变量保存地址


#### 7.2 指针变量的定义和使用

指针变量定义语法： `数据类型 * 变量名；`

**示例：**

```C++
int main() {

	//1、指针的定义
	int a = 10; //定义整型变量a
	
	//指针定义语法： 数据类型 * 变量名 ;
	int * p;

	//指针变量赋值
	p = &a; //指针指向变量a的地址
	cout << &a << endl; //打印数据a的地址
	cout << p << endl;  //打印指针变量p

	//2、指针的使用
	//通过*操作指针变量指向的内存
	cout << "*p = " << *p << endl;

	system("pause");

	return 0;
}
```

指针变量和普通变量的区别

* 普通变量存放的是数据，指针变量存放的是地址
* 指针变量可以通过" * "操作符，操作指针变量指向的内存空间，这个过程称为**解引用**

> 总结1： 我们可以通过 & 符号 获取变量的地址
>
> 总结2：利用指针可以记录地址
>
> 总结3：对指针变量解引用，可以操作指针指向的内存



#### 7.3 指针所占内存空间

提问：指针也是种数据类型，那么这种数据类型占用多少内存空间？

**示例：**

```C++
int main() {

	int a = 10;

	int * p;
	p = &a; //指针指向数据a的地址

	cout << *p << endl; //* 解引用
	cout << sizeof(p) << endl;
	cout << sizeof(char *) << endl;
	cout << sizeof(float *) << endl;
	cout << sizeof(double *) << endl;

	system("pause");

	return 0;
}
```

> 总结：所有指针类型在32位操作系统下是4个字节
>
> 在64位操作系统下是8个字节



<br>

#### 7.4 空指针和野指针

##### 7.4.1 空指针

**空指针**：指针变量指向内存中**编号为0【NULL】**的空间

**用途：**初始化指针变量

**注意：**空指针指向的内存是不可以访问的

```C++
int main() {
	//指针变量p指向内存地址编号为0的空间
	int * p = NULL;

	//访问空指针报错 
	//内存编号0 ~255为系统占用内存，不允许用户访问
	cout << *p << endl;

	system("pause");
	return 0;
}
```



##### 7.4.2 野指针

**野指针**：指针变量指向非法的内存空间

```C++
int main() {
	//指针变量p指向内存地址编号为0x1100的空间
	int * p = (int *)0x1100;

	//访问野指针报错 
	cout << *p << endl;

	system("pause");
	return 0;
}
```

> 总结：空指针和野指针都不是我们申请的空间，因此不要访问。



##### 7.4.3 指针安全

```c++

```



<br>

#### 7.5 const修饰指针

`const`修饰指针有三种情况

1. `const`修饰指针   --- 常量指针
2. `const`修饰常量   --- 指针常量
3. `const`即修饰指针，又修饰常量

**示例：**


```c++
int main() {

	int a = 10;
	int b = 10;

	//const修饰的是指针，指针指向可以改，指针指向的值不可以更改【记：const修饰int】
	const int * p1 = &a; 
	p1 = &b; //正确
	//*p1 = 100;  报错
	

	//const修饰的是常量，指针指向不可以改，指针指向的值可以更改【记：const修饰指针p2】
	int * const p2 = &a;
	//p2 = &b; //错误
	*p2 = 100; //正确

    //const既修饰指针又修饰常量
	const int * const p3 = &a;
	//p3 = &b; //错误
	//*p3 = 100; //错误

	system("pause");

	return 0;
}
```

**技巧**：看const右侧紧跟着的是指针还是常量, 是指针就是常量指针，是常量就是指针常量

- const修饰一个int类型的指针，即常量指针【既然是常量指针，故是常量，值不可改】
- const直接修饰变量，即指针常量【既然是指针常量，那指针指向不可变】



<br>

#### 7.6 指针的指针

```c++
#include <iostream>
using namespace std;


int main()
{
	int a[]{ 10,11,12,13 };
	int* ptr{ &a[0] };

	//指针的指针
	int** pptr = &ptr; 
	cout << *ptr << ',' << ptr << endl; 
	cout << *pptr << ',' << pptr << endl;
	//10,000000C3F8D7F9A8
	//000000C3F8D7F9A8, 000000C3F8D7F9D8
	// 注意：不存在 &&a[0]

	system("pause");

	return 0;
}
```



<br>

#### 7.7 指针和数组

**作用：**利用指针访问数组中元素

```C++
int main() {

	int arr[] = { 1,2,3,4,5,6,7,8,9,10 };

	int * p = arr;  //指向数组的指针

	cout << "第一个元素： " << arr[0] << endl;
	cout << "指针访问第一个元素： " << *p << endl;

	for (int i = 0; i < 10; i++)
	{
		//利用指针遍历数组
		cout << *p << endl;
		p++;
	}

	system("pause");

	return 0;
}
```

> 小练习：
>
> ```c++
> int a[]{10, 20, 30, 40};
> int *ptr{&a[0]};
> 
> (*ptr)++  // 11
> *ptr++   // ++优先级大于*，故先ptr++，考虑到++，故为(*ptr)再ptr++
> ```
>
> ptr[5] 与 a[5] 原理一致，均是在基地址上进行偏移。

注意：`sizeof(a)` 与 `sizeof(ptr)` 不同，前者是数组的大小，后者仅是指针的大小



<br>

#### 7.8 指针和函数

**作用：**利用指针作函数参数，可以修改实参的值

```C++
//值传递
void swap1(int a ,int b)
{
	int temp = a;
	a = b; 
	b = temp;
}
//地址传递
void swap2(int * p1, int *p2)
{
	int temp = *p1;
	*p1 = *p2;
	*p2 = temp;
}

int main() {

	int a = 10;
	int b = 20;
	swap1(a, b); // 值传递不会改变实参

	swap2(&a, &b); //地址传递会改变实参

	cout << "a = " << a << endl;

	cout << "b = " << b << endl;

	system("pause");

	return 0;
}
```

> 总结：如果不想修改实参，就用值传递，如果想修改实参，就用地址传递



<br>

#### 7.9 指针的类型转换

```c++
#include <iostream>
using namespace std;

int main()
{
	const int a{ 101 }; // a是个常量
	// int* ptr{ &a };
	// 错误原因：
	int* ptr = { (int*)&a };

	cout << *ptr << ',' << ptr << endl;// 101,0000004F1F79F894

	// 修改常量a
	*ptr = 200;
	cout << *ptr << ',' << ptr << endl;// 200, 0000004F1F79F894
	cout << a  << endl; // 101 ????????使用汇编解释
	
	system("pause");

	return 0;
}
```

上汇编代码：

```

```



例子二：

```c++
#include <iostream>
using namespace std;


int main()
{
	int b[2][3]
    {
        {1,2,3},
        {4,5,6}
    };
    //int* ptrb{ b };// 报错：二维数组的指针应该是一个【数组指针：用于处理数组问题】
    int* ptrb{ (int*)b };//强制转换的方法

    int* ptrbArray[3];// 这是【指针数组：3个int类型的指针】
    int(*p)[3] {b};// 这是【数组指针：每个指针负责3个内存空间】

    cout << b[1][2] << ',' << ptrb[5]<<endl;
    cout << b[1][2] << ',' << p[1][2] <<", sizeof(p) = " <<sizeof(p) << endl;
    cout << p << ',' << p+1 << endl; // 相差12

	system("pause");

	return 0;
}
```



<br>

#### 7.10 智能指针

指针最大的问题是安全问题，比如多次释放、野指针、悬挂指针等。而智能指针是指针的二次封装类，为解决上述安全问题。

##### 7.10.1 智能指针的概念及原理

智能指针`RAII`【`Resource Acquisition Is Initialization`】，是一种利用对象的生命周期来管理资源的技术。

如果我们采用传统的`new`/`delete`来申请和释放资源，如果忘记调用`delete`，或者在调用`delete`之前程序抛出异常，都会导致内存泄漏问题。如代码1.1中，`Func`函数中的`new p2`和`Div`都可能抛异常，导致后面的`delete`没有执行从而引发内存泄漏，采用智能指针对资源进行管理，能够杜绝这类问题。

> **代码1.1：**因异常引发的内存泄漏

```cpp
int Div(int a, int b)
{
	if (b == 0)
		throw "除0错误";
	else
		return a / b;
}
 
void Func()
{
	int* p1 = new int[5];
	int* p2 = new int[5];
 
	//这里Div函数会抛异常，main函数会捕获异常，delete[]没有执行，引发内存泄漏
	int ret = Div(5, 0);
 
	delete[] p1;
	delete[] p2;
}
 
int main()
{
	try{
		Func();
	}catch (std::exception& e)	{
		std::cout << e.what() << std::endl;
	}catch (...){
		std::cout << "未知错误" << std::endl;
	}
 	return 0;
}
```

智能指针是一个类，在对象构造时调用智能指针的构造函数获取资源，在对象生命周期内，保证资源不被释放，在对象生命周期结束时，编译器自动调用析构函数来释放资源。

这就相当于，将管理资源的责任移交给了智能指针对象，这样即使程序抛出异常也不存在内存泄漏，因为捕获异常往往跳出函数体，执行流会离开对象的作用域，对象生命周期结束，编译器自动调用析构函数释放了资源。

🔺采用智能指针管理资源，有如下优点：

- 将资源管理的责任转移给智能指针对象，不用显示地释放资源，杜绝了异常安全问题。
- 保证对象管理的资源在其生命周期内有效。

> **代码1.2**中，定义了一种简易的智能指针`SmartPtr`，在其析构函数中会对资源进行释放。因为申请的资源可能是通过`new T`、`new T[n]`、`malloc(...)`这几种方法的任意之一来申请的，每种方式申请的资源需要不同的关键字/函数来释放资源，否则程序可能会崩溃。

因此，需要一个模板参数`Del`，这个模板参数用于接收仿函数，以匹配不同的资源释放方式。【我们默认采用`delete`的方式释放资源，C++标准库中提供的智能指针，如果不显示给定仿函数来定义释放资源的方式，也是默认`delete`释放资源】。

> **代码1.2：**智能指针的简易实现 -- `SmartPtr`

```cpp
template<class T>
struct Delete
{
	void operator()(T* ptr) { delete ptr;}
};
 
template<class T>
struct DeleteArray
{
	void operator()(T* ptr) { delete[] ptr; }
};
 
template<class T>
struct Free
{
	void operator()(T* ptr) { free(ptr); }
};
 
template<class T, class Del = Delete<T>>
class SmartPtr
{
public:
	SmartPtr(T* ptr = nullptr)  //构造函数
		: _ptr(ptr)
	{ }
 
	~SmartPtr()
	{
		Del del;
		del(_ptr);
	}
 
private:
	T* _ptr;  //管理的资源
};
```



<br>

##### 7.10.2 智能指针的拷贝问题

我们要求智能指针具有一般的指针行为。因此，我们也就需要智能指针支持拷贝。但是，智能指针中的成员涉及到执行动态申请资源的指针，按照一般要求，应当进行深拷贝。

但是如果我们进行深拷贝，就会让两个智能指针指向不同的空间，但是我们所希望的是两个指针共同管理一块资源，因此我们就是要浅拷贝（值拷贝）。

但是值拷贝会存在对同一块空间多次释放的问题，对此，C++标准库中的智能指针`auto_ptr`和`shared_ptr`分别采用了管理权转移和引用计数的方法来解决问题，但一般会通过引用计数解决多次释放的问题【】。

智能指针拷贝问题总结：

- 即使涉及到动态申请内存，智能指针的拷贝也不应为深拷贝，应当是浅拷贝。
- 采用管理权转移【`auto_ptr`】或引用计数【`shared_ptr`】来解决同一块空间多次释放的问题。
- 一般都使用引用计数来解决多次释放问题，`auto_ptr`大部分情况下不使用。

![](cpp7-1.PNG)

<br>

##### 7.10.3 `auto_ptr`

`auto_ptr`采用管理权转移的方法进行赋值和拷贝构造。

- 假设原先有一个`auto_ptr`对象`p1`，要通过`p1`构造`p2`，当拷贝构造完成后，用于拷贝构造传参的对象`p1`中管理资源的指针会被更改为`nullptr`，赋值也一样。
- 假设`p2=p1`，`p1`中资源的管理权会转移给`p2`，`p2`原本的资源会被释放。

采用管理权转移的方法进行智能指针拷贝是一种极不负责任的行为，`auto_ptr`已经被很多公司明令禁止使用，一般项目中也极少使用`auto_ptr`。

![](cpp7-2.PNG)

<br>

##### 7.10.4 std::unique_ptr

unique直接将拷贝构造和赋值禁止，也就不存在浅拷贝的多次释放同一块空间的问题。

**语法：**`std::unique_ptr <类型> 变量名{}；`

示例一：

```cpp
#include <iostream>
using namespace std;

int main()
{
	int* a = new int[5];
	unique_ptr<int> intPtr1{ new int(5)};
	unique_ptr<int[]> intPtr2{ new int[5] {5,4,3,2,1} };

	*intPtr1 = 500;

	cout << intPtr1 << " " << *intPtr1<<endl;
	cout << intPtr2 << " " << intPtr2[2] << endl;

	// 何为唯一指针？
	unique_ptr<int> intPtr3{};
	//intPtr3 = intPtr1; // 报错：不允许出现野指针

	// c++14之后：下面 的写法等同于 intPtr1的初始化
	unique_ptr<int[]> intPtr4{ std::make_unique<int[]>(5)};

	// 获取一个普通指针
	int* b = intPtr1.get();

	// 不能复制，但提供转移的功能 std::move(ptr)
	intPtr3 = std::move(intPtr1);

	// 返回智能指针，并将其设置为nullptr，但不会释放占用的空间
	int* p = intPtr1.release();

	// 释放内存，并将其设置为nullptr
	intPtr1.reset();
	intPtr2.reset();
	intPtr3.reset();
	intPtr4.reset();

	system("pause");

	return 0;
}
```



示例二：

```cpp
namespace zhang
{
	template<class T>
	class unique_ptr
	{
	public:
		//构造函数
		unique_ptr(T* ptr = nullptr)
			: _ptr(ptr)
		{ }
 
		//使用delete关键字强行禁止拷贝构造函数和赋值函数的生成
		unique_ptr(const unique_ptr<T>& up) = delete;
		unique_ptr<T>& operator=(const unique_ptr<T>& up) = delete;
 
		T& operator*()
		{
			return *_ptr;
		}
 
		T* operator->()
		{
			return _ptr;
		}
 
		//析构函数
		~unique_ptr()
		{
			delete _ptr;
		}
 
	private:
		T* _ptr;
	};
}
```



<br>

##### 7.10.5 `std::shared_ptr`

该智能指针是C++11标准库中新纳入的智能指针，它通过引用计数的方法，较好的解决了拷贝和赋值的问题，是实际项目中最常用的智能指针。

共享指针可以有多个共享指针指向同一个地址，只有当最后一个共享指针被释放时，才会释放其所占用的内存空间【`std::shared_ptr` 会记录当前地址有多少个智能指针调用】。

**语法：**`std::shared_ptr <类型> 变量名{}；`

```cpp
// 举例
std::shared_ptr<int> ptrA{};

//make_shared不支持数组，故使用 `new int[]`，或者 `boost`
std::shared_ptr<int> ptrB{std::make_shared<int>(5)};
```



**常用接口函数：**

| 接口函数                                              | 功能                                                         |
| ----------------------------------------------------- | ------------------------------------------------------------ |
| `shared_ptr(T* ptr = nullptr, Del del = Delete<T>())` | 构造函数，del为定制删除器，是一个仿函数对象，用于不同情况下的资源释放操作 |
| `shared_ptr(shared_ptr<T>& sp)`                       | 拷贝构造函数                                                 |
| `shared_ptr<T>& operator=(shared_ptr<T>& sp)`         | 赋值运算符重载函数                                           |
| `T& operator*()`                                      | 解引用操作符重载函数                                         |
| `T* operator->()`                                     | 成员访问操作符重载函数                                       |
| `T* get()`                                            | 获取`shared_ptr`内部管理资源的指针                           |
| `long int use_count()`                                | 获取引用计数（当前智能指针管理的资源被多少智能指针共同管理） |
| `bool unique()`                                       | 判断当前智能指针管理的资源是否只有它本身在管理（引用计数是否为1）【C++17已被移除】 |
| `void std::shared_ptr.reset();`                       | 将共享指针设置为nullptr，且若是最后一个拥有该指针的对象，将会释放内存 |

<br>

**`shared_ptr`的拷贝构造和赋值问题**

`shared`内部有一个成员变量`long int* _pcount`，它指向一块存储引用计数的空间。

- 当进行拷贝构造时，引用计数+1，即：`++(*_pcount)`。
- 进行赋值操作`(sp2 = sp1)`时，首先应当检查自赋值。
  - 如果是自赋值，直接返回 `*this` 即可。
  - 如果不是自赋值，那么首先将`sp2`的引用计数`-1`，如果sp2的引用计数`-1`后变为了0，那么就释放`sp2`的资源，然后赋予`sp2`管理`sp1`管理的资源的权限，`sp2`和`sp1`共用一个引用计数，引用计数+1。
- 调用析构函数时，先让引用计数`-1`，如果此时引用计数变为0，就释放资源。

![](cpp7-3.PNG)

```c++
// 模拟实现
namespace zhang
{
	template<class T, class Del = Delete<T>>
	class shared_ptr
	{
	public:
		//构造函数
		shared_ptr(T* ptr = nullptr)
			: _ptr(ptr)
			, _pcount(new long int(1))
		{ }
 
		//拷贝构造函数
		shared_ptr(shared_ptr<T>& sp)
			: _ptr(sp._ptr)
			, _pcount(sp._pcount)
		{
			++(*_pcount);  //引用计数+1
		}
 
		//赋值函数
		shared_ptr<T>& operator=(shared_ptr<T>& sp)
		{
			if (_ptr == sp._ptr)  //自赋值检查
			{
				return *this;
			}
 
			//this的引用计数-1，并判断是否需要释放资源
			if (--(*_pcount) == 0)
			{
				Del del;
				del(_ptr);
				delete _pcount;
			}
 
			_ptr = sp._ptr;
			_pcount = sp._pcount;
			++(*_pcount);
 
			return *this;
		}
 
		//指针获取函数
		T* get()
		{
			return _ptr;
		}
 
		//引用计数获取函数
		long int use_count()
		{
			return *_pcount;
		}
 
		T& operator*()
		{
			return *_ptr;
		}
 
		T* operator->()
		{
			return _ptr;
		}
 
		bool unique()
		{
			return *_pcount == 1;
		}
 
		//析构函数
		~shared_ptr()
		{
			if (--(*_pcount) == 0)
			{
				Del del;
				del(_ptr);
				delete _pcount;
			}
		}
 
	private:
		T* _ptr;   //指向动态申请空间的指针
		long int* _pcount;   //引用计数
	};
}
```



##### 7.10.6 shared_ptr的循环引用问题

在绝大部分情况下，`shared_ptr`能够解决智能指针赋值造成的多次析构问题，也不会引发内存泄漏。

但是，代码`4.1`展现了一种特殊情况，定义一个`Node`节点，其中包含两个`shared_ptr`成员：`_prev`和`_next`。

在主函数中实例化出两个`shared_ptr<Node>`对象`n1`和`n2`，`n1`的`_next`指向`n2`，`n2`的`_prev`指向`n1`，`n1`和`n2`相互指向对方，这样就属于循环引用，会造成n1和n2的资源释放失败，引发内存泄漏问题。

> 代码4.1：循环引用
>

```c++
struct Node
{
	int _val;
	std::shared_ptr<Node> _prev;
	std::shared_ptr<Node> _next;
 
	~Node()
	{
		std::cout << "~Node()" << std::endl;
	}
};
 
int main()
{
	std::shared_ptr<Node> n1(new Node);//n1指向Node1
	std::shared_ptr<Node> n2(new Node);//n2指向Node2
 
	n1->_next = n2;	//Node1的下一个节点为Node2
	n2->_prev = n1;	//Node2的上一个节点为Node1
 
	return 0;
}
```

在代码`4.1`中，循环引用的成因如下：

- 构造对象`n1`和`n2`，引用计数为1，然后`n1->_next = n2`、`n2->_prev = n1`后，引用计数变为2。
- 先后由`n2`和`n1`调用析构函数，引用计数变为1。
- 此时，`n1`和`n2`的资源还都没有释放，`n1`的`_next`依旧指向`n2`，`n2`的`_prev`依旧指向`n1`。
- `n1`释放，就需要`n2`的`_prev`成员释放，`n2`释放，就需要`n1`的`_next`成员释放。
- 【但是，只有对象本身析构，它的成员才会析构，因此n1和n2彼此制约对方的析构，最终n1和n2的资源都无法释放，造成了内存泄漏】。

![](cpp7-4.PNG)

<br>

为了避免循环引用，可以把`Node`节点中的`_next`和`_prev`成员变量的类型改为`weak_ptr<Node>`。

`weak_ptr`是C++标准库中的比较特殊的一个智能指针，它允许使用`shared_ptr`对象来构造`weak_ptr`对象，但是，`weak_ptr`不增加引用计数，不参与资源的申请和释放，从严格意义上讲，`weak_ptr`不算是智能指针。

> 代码4.2：使用weak_ptr避免引用计数

```cpp
struct Node
{
	int _val;
	std::weak_ptr<Node> _prev;
	std::weak_ptr<Node> _next;
 
	~Node()
	{
		std::cout << "~Node()" << std::endl;
	}
};
 
int main()
{
	std::shared_ptr<Node> n1(new Node);
	std::shared_ptr<Node> n2(new Node);
 
	n1->_next = n2;//使用shared_ptr对象来构造weak_ptr对象
	n2->_prev = n1;//此时n1/n2的引用计数为1
 
	return 0;
}
```



<br>

##### 7.10.7 `std::weak_ptr`

`weak_ptr`不参与资源的管理和释放，可以使用`shared_ptr`对象来构造`weak_ptr`对象。

- 但是，不能直接使用指针来构造`weak_ptr`对象
- 在weak_ptr中，也没有`operator*`函数和`operator->`成员函数，不具有一般指针的行为。
- `weak_ptr`在进行拷贝构造和赋值时，不增加引用计数，由于`weak_ptr`不参与资源管理，也不需要显示定义析构函数来释放资源。

因此，`weak_ptr`严格意义上并不是智能指针，`weak_ptr`的出现，就是为了解决`shared_ptr`的循环引用问题。

```cpp
template<class T>
class weak_ptr
{
public:
	//默认构造函数
	weak_ptr()
		: _ptr(nullptr)
	{ }
 
	//拷贝构造函数
	weak_ptr(weak_ptr<T>& wp)
		: _ptr(wp._ptr)
	{ }
 
	//采用shared_ptr构造
	weak_ptr(shared_ptr<T>& sp)
		: _ptr(sp.get())
	{ }
 
	//赋值函数
	weak_ptr<T>& operator=(weak_ptr<T>& wp)
	{
		_ptr = wp._ptr;
	}
 
	//通过shared_ptr对象赋值
	weak_ptr<T>& operator=(shared_ptr<T>& sp)
	{
		_ptr = sp.get();
	}
 
private:
	T* _ptr;
};
```



<br>

##### 7.1.8 总结

- 智能指针是用来对资源进行管理的类，在对象创建时动态申请内存资源，在对象生命周期结束时由编译器自动调用析构函数完成资源的释放，智能指针除了用来管理资源外，还应当具有指针的一般行为（`operator*`函数和`operator->`函数）。
- 使用智能指针，相当于把资源管理的责任转交给智能指针对象。这样能够有效避免因为忘记`delete`或者程序抛出异常而引起的内存泄漏。
- 智能指针应支持浅拷贝，但是浅拷贝存在同一块空间被多次释放的问题，为此，C++标准库中的三种智能指针`auto_ptr`、`unique_ptr`和`shared_ptr`分别采用了不同的方法来解决这一问题。
  - `auto_ptr`支持拷贝的方式是进行管理权转移，这是一种不负责任的处理方式，`auto_ptr`因此被许多公司禁止使用。
  - `unique_ptr`直接强行禁止拷贝构造和赋值。
  - `shared_ptr`通过引用计数的方式来进行浅拷贝，当引用计数为0时析构函数才释放资源，这样既支持了浅拷贝，也保证一块空间仅被析构一次。但是`shared_ptr`存在循环引用这一隐患，会造成内存泄漏。
  - 使用`weak_ptr`可以避免`shared_ptr`的循环引用问题，`weak_ptr`可以通`shared_ptr`对象来构造而不增加引用计数，`weak_ptr`不参与资源的管理，不支持`operator*`和`operator->`。
    



<br>

### 8、结构体

#### 8.1 结构体基本概念

结构体属于用户<span style="background:#FFFF00;">自定义的数据类型</span>，允许用户存储不同的数据类型

> 在汇编中，结构体的定义是不存在对应的汇编代码，该定义是给编译器看的，不会创建在内存中。

#### 8.2 结构体定义和使用

**语法：**`struct 结构体名 { 结构体成员列表 }；`

通过结构体创建变量的方式有三种：

* struct 结构体名 变量名
* struct 结构体名 变量名 = { 成员1值 ， 成员2值...}
* 定义结构体时顺便创建变量

```C++
//结构体定义
struct student
{
	//成员列表
	string name;  //姓名
	int age;      //年龄
	int score;    //分数
}stu3; //结构体变量创建方式3 


int main() {

	//结构体变量创建方式1
	struct student stu1; //struct 关键字可以省略

	stu1.name = "张三";
	stu1.age = 18;
	stu1.score = 100;
	
	cout << "姓名：" << stu1.name << " 年龄：" << stu1.age  << " 分数：" << stu1.score << endl;

	//结构体变量创建方式2
	struct student stu2 = { "李四",19,60 };

	cout << "姓名：" << stu2.name << " 年龄：" << stu2.age  << " 分数：" << stu2.score << endl;


	stu3.name = "王五";
	stu3.age = 18;
	stu3.score = 80;
	

	cout << "姓名：" << stu3.name << " 年龄：" << stu3.age  << " 分数：" << stu3.score << endl;

	system("pause");

	return 0;
}
```

> 总结1：定义结构体时的关键字是struct，不可省略
>
> 总结2：创建结构体变量时，关键字struct可以省略
>
> 总结3：结构体变量利用操作符 ''.''  访问成员



#### 8.3 结构体数组

**作用：**将自定义的结构体放入到数组中方便维护

**语法：**` struct  结构体名 数组名[元素个数] = {  {} , {} , ... {} }`

**示例：**

```C++
//结构体定义
struct student
{
	//成员列表
	string name;  //姓名
	int age;      //年龄
	int score;    //分数
}

int main() {
	
	//结构体数组
	struct student arr[3]=
	{
		{"张三",18,80 },
		{"李四",19,60 },
		{"王五",20,70 }
	};

	for (int i = 0; i < 3; i++)
	{
		cout << "姓名：" << arr[i].name << " 年龄：" << arr[i].age << " 分数：" << arr[i].score << endl;
	}

	system("pause");

	return 0;
}
```



#### 8.4 结构体指针

**作用：**通过指针访问结构体中的成员

* 利用操作符 `-> `可以通过结构体指针访问结构体属性

```C++
//结构体定义
struct student
{
	//成员列表
	string name;  //姓名
	int age;      //年龄
	int score;    //分数
};


int main() {
	
	struct student stu = { "张三",18,100, };
	
	struct student * p = &stu;
	
	p->score = 80; //指针通过 -> 操作符可以访问成员

	cout << "姓名：" << p->name << " 年龄：" << p->age << " 分数：" << p->score << endl;
	
	system("pause");

	return 0;
}
```

> 总结：结构体指针可以通过 -> 操作符 来访问结构体中的成员



#### 8.5 结构体嵌套结构体

**作用：** 结构体中的成员可以是另一个结构体

**例如：**每个老师辅导一个学员，一个老师的结构体中，记录一个学生的结构体

**示例：**

```C++
//学生结构体定义
struct student
{
	//成员列表
	string name;  //姓名
	int age;      //年龄
	int score;    //分数
};

//教师结构体定义
struct teacher
{
    //成员列表
	int id; //职工编号
	string name;  //教师姓名
	int age;   //教师年龄
	struct student stu; //子结构体 学生
};


int main() {

	struct teacher t1;
	t1.id = 10000;
	t1.name = "老王";
	t1.age = 40;

	t1.stu.name = "张三";
	t1.stu.age = 18;
	t1.stu.score = 100;

	cout << "教师 职工编号： " << t1.id << " 姓名： " << t1.name << " 年龄： " << t1.age << endl;
	
	cout << "辅导学员 姓名： " << t1.stu.name << " 年龄：" << t1.stu.age << " 考试分数： " << t1.stu.score << endl;

	system("pause");

	return 0;
}
```

**总结：**在结构体中可以定义另一个结构体作为成员，用来解决实际问题



<br>

#### 8.6 结构体做函数参数 

**作用：**将结构体作为参数向函数中传递

传递方式有两种：

* 值传递
* 地址传递

**示例：**

```C++
//学生结构体定义
struct student
{
	//成员列表
	string name;  //姓名
	int age;      //年龄
	int score;    //分数
};

//值传递
void printStudent(student stu )
{
	stu.age = 28;
	cout << "子函数中 姓名：" << stu.name << " 年龄： " << stu.age  << " 分数：" << stu.score << endl;
}

//地址传递
void printStudent2(student *stu)
{
	stu->age = 28;
	cout << "子函数中 姓名：" << stu->name << " 年龄： " << stu->age  << " 分数：" << stu->score << endl;
}

int main() {

	student stu = { "张三",18,100};
	//值传递
	printStudent(stu);
	cout << "主函数中 姓名：" << stu.name << " 年龄： " << stu.age << " 分数：" << stu.score << endl;

	cout << endl;

	//地址传递
	printStudent2(&stu);
	cout << "主函数中 姓名：" << stu.name << " 年龄： " << stu.age  << " 分数：" << stu.score << endl;

	system("pause");

	return 0;
}
```

> 总结：如果不想修改主函数中的数据，用值传递，反之用地址传递



#### 8.7 结构体中 const使用场景

**作用：**用`const`来防止误操作

```C++
//学生结构体定义
struct student
{
	//成员列表
	string name;  //姓名
	int age;      //年龄
	int score;    //分数
};

//const使用场景
void printStudent(const student *stu) //加const防止函数体中的误操作
{
	//stu->age = 100; //操作失败，因为加了const修饰
	cout << "姓名：" << stu->name << " 年龄：" << stu->age << " 分数：" << stu->score << endl;

}

int main() {

	student stu = { "张三",18,100 };

	printStudent(&stu);

	system("pause");

	return 0;
}
```



#### 8.8 联合体 Union

通过`union`创建联合体，其成员变量共享内存，因此`union`的数据类型大小由其最大的成员变量决定。

如下面的 `USER`，其占用4字节。访问 `sHP` 时，就访问前两个字节；访问 `nHP` 时，就访问前4个字节。

```c++
#include <iostream>
using namespace std;

union USER
{
	short sHP;
	int nHP;
};

// 匿名联合体：只可以用一次，临时用一次
union
{
	short sHP;
	int nHP;
} role;

// 在结构体中嵌套联合体
struct MyStruct
{
	// 临时用一次
	union {
		short sHP;
		int nHP;
	} user;
	int xp;
};


int main()
{
	USER user{0};// [0][0][][] // 可能仅仅初始化了short部分
	cout << "大小：" << sizeof(user) << endl;
	
	user.sHP = 100;// [100][0][?][?]
	cout << "sHP：" << user.sHP << endl;
	cout << "nHP：" << user.nHP << endl;
	cout << "地址：" << &user.sHP << " " << &user.nHP << endl;

	system("pause");

	return 0;
}
```

<br>

#### 8.9 结构体与联合体的内存对齐问题

##### 8.9.1 内存对齐的三条规则及注意事项

1. 数据成员对齐规则：即结构体 `struct `或联合体 `union` 的数据成员的起始地址规定
   - 第一个数据成员存放在`offset`为0的地方
   - 🔺之后的每个数据成员存储的起始位置，要从该成员大小或者成员的子成员(只要该成员有子成员，比如数组、结构体等)大小的整数倍开始【如：int在64位平台下占用 `4Byte`，则要从4的整数倍地址开始存储；相应地，double要从8的整数倍开始存储】
2. 结构体作为成员的对齐规则：如果一个结构体里有某些结构体成员，则结构体成员要从其内部最大元素大小的整数倍地址开始存储。
3. 结构体的总大小规则：即`sizeof` 的结果，必须是其内部最大成员长度【即在前面内存对齐指令中，提到的有效值】的整数倍，不足的要补齐。

值得注意的是：

- 数组在内存中存储时是分开存储的，char类型的数组每个元素是 1Byte，内存对齐时按照单个元素进行对齐
- 联合体类型中的数据共用内存
  - 联合的所有成员共用一段内存空间，存储地址的起始位置都相同。
  - 一般来说，最大成员的内存宽度作为union的内存大小。主要的原因是为了节省内存空间。
  - 默认的访问权限是公有的，但是它同样要遵守内存对齐的原则，特别是第3条规则。
- C++中，空结构体占用 1Byte，空类同样是占用 1Byte的内存空间，类和结构体一样，需要内存对齐。

<br>

##### 8.9.2 举例说明

📋示例一：

```c++
struct Test1 {
    int a;
    double b;
    char c;
};//24
```

| 类型                           | int  | double | char |
| ------------------------------ | ---- | ------ | ---- |
| 地址                           | 0~3  | 8~15   | 16   |
| 累计所占内存（字节）           | 4    | 16     | 17   |
| 按照规则（最大成员长度整数倍） | 4    | 16     | 24   |

- int：占用 4Byte【存储位置0-3】【规则1】
- double：占用 8Byte【存储位置是从该类型长度`8Byte`的整数倍开始存储，即8-15】【规则1】
- char：占用 1Byte，存储位置16【规则1】
- 总共用了17 Byte，但是 sizeof 所得的大小为24【规则3：`sizeof`的大小必须是内部最大成员长度的整数倍，不足的要补齐】

📋示例二：

```cpp
struct Test2 {
    int a;
    double b;
    char c[6];
};//24

struct Test22 {
    int a;
    double b;
    char c[5];
};//24
```

| 类型                           | int  | double | char [6] |
| ------------------------------ | ---- | ------ | -------- |
| 地址                           | 0~3  | 8~15   | 16~21    |
| 累计所占内存（字节）           | 4    | 16     | 21       |
| 按照规则（最大成员长度整数倍） | 4    | 16     | 24       |

- `int`、`double` 同上。
- 数组在内存中存储时是分开存储的，char类型的数组每个元素是 1Byte，按单个元素进行内存对齐，故sizeof大小还是24【规则1 & 规则3】。
- 故`Test22`的sizeof大小也是24。

📋示例三：

```cpp
struct Test {
    int a;
    double b;
    char c;
};24
 
struct Test3 {
    int a;
    Test d;
    double b;
    char c;
};//48
```

| 类型                           | int  | int  | double | char | double | char |
| ------------------------------ | ---- | ---- | ------ | ---- | ------ | ---- |
| 地址                           | 0~3  | 8~11 | 16~23  | 24   | 32~39  | 40   |
| 累计所占内存（字节）           | 4    | 12   | 24     | 25   | 40     | 41   |
| 按照规则（最大成员长度整数倍） |      |      |        |      |        | 48   |

- int：占用 4Byte【存储位置0-3】【规则1】
- Test中最大的元素是double，占用 8Byte，Test中的成员按照 8Byte 的整数倍的地址开始存储【规则2】
  - Test中的 `int`：占用 4Byte【存储位置8-11】
  - Test中的 `double`：占用 8Byte【存储位置16-23】
  - Test中的 `char`：占用 1Byte【存储位置24】
- double：占用 8Byte【存储位置32-39】【规则1】
- char：占用1 Byte【存储位置40】
- 总大小：40是最大元素大小8的整数倍，但是要大于40，按照规则3补齐，sizeof为48【规则1 & 规则2 & 规则3】

📋示例四：

```cpp
struct Test {
    int a;
    double b;
    char c;
};
 
struct Test3 {
    int a;
    Test d;
    char c;
};//40
```

| 类型                           | int  | int  | double | char | char |
| ------------------------------ | ---- | ---- | ------ | ---- | ---- |
| 地址                           | 0~3  | 8~11 | 16~23  | 24   | 32   |
| 累计所占内存（字节）           | 4    | 12   | 24     | 25   | 33   |
| 按照规则（最大成员长度整数倍） |      |      | 24     | 32   | 40   |

- Test3中的最大数据成员大小比成员结构体Test内部最大成员大小要小，即此时最大成员为`double`。
- 此时规则3是按照成员结构体内部的最大成员的整数倍进行补齐的，sizeof的结果是40。
- 注意Test3中char的存储位置。

📋示例五：关于联合体

```cpp
union uTest1{
    char a[20];
    int b;
    float c;
};

union uTest2{
    char a[20];
    int b;
    float c;
    double d;
};
```

- 找到联合体中最大的数据类型，还必须满足是所有成员的整数倍
- uTest1中，sizeof的大小是20，即a[20]的大小，同样20是b和c的倍数
- uTest2中，sizeof的大小是24，即满足容下a[20]，同样24是b、c和d的倍数【规则3】

📋示例六：练习

```cpp
struct s1{
    char ch1;
    char ch2;
    int i;
};//8
 
struct s2{
    char ch1;
    int i;
    char ch2;
};//12
 
struct s3{
    char ch;
    int i;
    char str[10];
};//20
 
struct s4{
    char ch;
    int i;
    struct s{
        char ch1;
        int j;
    }sub;
    float f;
};//20
 
struct s5{
    char ch;
    char i;
    struct s{
        char ch1;
        double j;
    }sub;
    char f;
};//32
 
 
 struct A
{
    union B
    {
        char* pc;
        int z; 
    };
}; //1, struct A is empty struct
 
 struct AA
{
    union
    {
        char* pc;
        int z; 
    }; 
 
};//32-bit: 4, 64-bit: 8
 
 
struct AAA
{
    union 
    {
        char* pc;
        int z; 
    } B;
};//32-bit: 4, 64-bit: 8
```

<br>

##### 8.9.3 关于数组的内存对齐问题 

实际上从内存的角度，**数组是若干个连续的相同大小元素的集合。**也就是说，char[20] 和 连续的20 个char 元素在内存中没有什么分别。所以当结构体中有数组时，可以把它拆解开成连续排列的多个子元素。

如下代码示例：

```cpp
 struct str1{
  double a;
  char no[9];
  int bb;
  double aa;
} s1;
 
struct str2{
  double a;
  char no1;
  char no2;
  char no3;
  char no4;
  char no5;
  char no6;
  char no7;
  char no8;
  char no9;
  int bb;
  double aa;
} s2;
 
// sizeof(s1) = sizeof(s2) = 32
```



<br>

##### 8.9.4 字节对齐的原因

- 平台原因【移植原因】：不是所有的硬件平台都能任意访问地址上的任意数据的，某些硬件平台只能在某些地址处取某些特定类型的数据，否则抛出硬件异常。
- 性能原因，经过内存对齐后，CPU的访问效率会得到很大的提高
  - CPU把内存当成是一块一块的，块的大小可以是2、4、8、16Byte 大小。
  - 因此，CPU在读取内存时是一块一块进行读取的，当读取块的大小是 4Byte 时，一个数据所占的字节偏移offset为3、4、5、6，那么CPU访问数据时便需要访问两次，才能得到完整的数据，经过内存对齐后，便可以通过一次访问CPU获取完整的数据。
    



<br>

### 9、通讯录管理系统案例

#### 9.1 系统需求

通讯录是一个可以记录亲人、好友信息的工具。

本教程主要利用C++来实现一个通讯录管理系统

系统中需要实现的功能如下：

* 添加联系人：向通讯录中添加新人，信息包括（姓名、性别、年龄、联系电话、家庭住址）最多记录1000人
* 显示联系人：显示通讯录中所有联系人信息
* 删除联系人：按照姓名进行删除指定联系人
* 查找联系人：按照姓名查看指定联系人信息
* 修改联系人：按照姓名重新修改指定联系人
* 清空联系人：清空通讯录中所有信息
* 退出通讯录：退出当前使用的通讯录

#### 9.2 菜单功能

**功能描述：** 用户选择功能的界面

菜单界面效果如下图：

![](cpp1-1.png)

**步骤：**

* 封装函数显示该界面  如 `void showMenu()`
* 在main函数中调用封装好的函数

**代码：**

```C++
#include<iostream>
using namespace std;

//菜单界面
void showMenu()
{
	cout << "***************************" << endl;
	cout << "*****  1、添加联系人  *****" << endl;
	cout << "*****  2、显示联系人  *****" << endl;
	cout << "*****  3、删除联系人  *****" << endl;
	cout << "*****  4、查找联系人  *****" << endl;
	cout << "*****  5、修改联系人  *****" << endl;
	cout << "*****  6、清空联系人  *****" << endl;
	cout << "*****  0、退出通讯录  *****" << endl;
	cout << "***************************" << endl;
}

int main() {

	showMenu();

	system("pause");

	return 0;
}
```



#### 9.3 退出功能

**功能描述**：退出通讯录系统

**思路**：根据用户不同的选择，进入不同的功能，可以选择switch分支结构，将整个架构进行搭建

当用户选择0时候，执行退出，选择其他先不做操作，也不会退出程序

```C++
int main() {

	int select = 0;

	while (true)
	{
		showMenu();

		cin >> select;
		
		switch (select)
		{
		case 1:  //添加联系人
			break;
		case 2:  //显示联系人
			break;
		case 3:  //删除联系人
			break;
		case 4:  //查找联系人
			break;
		case 5:  //修改联系人
			break;
		case 6:  //清空联系人
			break;
		case 0:  //退出通讯录
			cout << "欢迎下次使用" << endl;
			system("pause");
			return 0;
			break;
		default:
			break;
		}
	}

	system("pause");

	return 0;
}
```





#### 9.4 添加联系人

**功能描述：**

实现添加联系人功能，联系人上限为1000人，联系人信息包括（姓名、性别、年龄、联系电话、家庭住址）

添加联系人**实现步骤**：

* 设计联系人结构体
* 设计通讯录结构体
* main函数中创建通讯录
* 封装添加联系人函数
* 测试添加联系人功能

```C++
#include <string>  //string头文件
//联系人结构体
struct Person
{
	string m_Name; //姓名
	int m_Sex; //性别：1男 2女
	int m_Age; //年龄
	string m_Phone; //电话
	string m_Addr; //住址
};
```

```C++
#define MAX 1000 //最大人数

//通讯录结构体
struct Addressbooks
{
	struct Person personArray[MAX]; //通讯录中保存的联系人数组
	int m_Size; //通讯录中人员个数
};

// main 函数初始化
	//创建通讯录
	Addressbooks abs;
	//初始化通讯录中人数
	abs.m_Size = 0;
```

**添加联系人思路**：添加联系人前先判断通讯录是否已满，如果满了就不再添加，未满情况将新联系人信息逐个加入到通讯录

```C++
//1、添加联系人信息
void addPerson(Addressbooks *abs)
{
	//判断电话本是否满了
	if (abs->m_Size == MAX)
	{
		cout << "通讯录已满，无法添加" << endl;
		return;
	}
	else
	{
		//姓名
		string name;
		cout << "请输入姓名：" << endl;
		cin >> name;
		abs->personArray[abs->m_Size].m_Name = name;

		cout << "请输入性别：" << endl;
		cout << "1 -- 男" << endl;
		cout << "2 -- 女" << endl;

		//性别
		int sex = 0;
		while (true)
		{
			cin >> sex;
			if (sex == 1 || sex == 2)
			{
				abs->personArray[abs->m_Size].m_Sex = sex;
				break;
			}
			cout << "输入有误，请重新输入";
		}

		//年龄
		cout << "请输入年龄：" << endl;
		int age = 0;
		cin >> age;
		abs->personArray[abs->m_Size].m_Age = age;

		//联系电话
		cout << "请输入联系电话：" << endl;
		string phone = "";
		cin >> phone;
		abs->personArray[abs->m_Size].m_Phone = phone;

		//家庭住址
		cout << "请输入家庭住址：" << endl;
		string address;
		cin >> address;
		abs->personArray[abs->m_Size].m_Addr = address;

		//更新通讯录人数
		abs->m_Size++;

		cout << "添加成功" << endl;
		system("pause");
		system("cls");
	}
}
```



#### 9.5 显示联系人

功能描述：显示通讯录中已有的联系人信息

**显示联系人实现步骤**：

* 封装显示联系人函数
* 测试显示联系人功能

```C++
//2、显示所有联系人信息
void showPerson(Addressbooks * abs)
{
	if (abs->m_Size == 0)
	{
		cout << "当前记录为空" << endl;
	}
	else
	{
		for (int i = 0; i < abs->m_Size; i++)
		{
			cout << "姓名：" << abs->personArray[i].m_Name << "\t";
			cout << "性别：" << (abs->personArray[i].m_Sex == 1 ? "男" : "女") << "\t";
			cout << "年龄：" << abs->personArray[i].m_Age << "\t";
			cout << "电话：" << abs->personArray[i].m_Phone << "\t";
			cout << "住址：" << abs->personArray[i].m_Addr << endl;
		}
	}
	
	system("pause");
	system("cls");

}
```



#### 9.6 删除联系人

功能描述：按照姓名进行删除指定联系人

**实现步骤**：

* 封装检测联系人是否存在
* 封装删除联系人函数
* 测试删除联系人功能

```C++
//判断是否存在查询的人员，存在返回在数组中索引位置，不存在返回-1
int isExist(Addressbooks * abs, string name)
{
	for (int i = 0; i < abs->m_Size; i++)
	{
		if (abs->personArray[i].m_Name == name)
		{
			return i;
		}
	}
	return -1;
}

//3、删除指定联系人信息
void deletePerson(Addressbooks * abs)
{
	cout << "请输入您要删除的联系人" << endl;
	string name;
	cin >> name;

	int ret = isExist(abs, name);
	if (ret != -1)
	{
		for (int i = ret; i < abs->m_Size; i++)
		{
			abs->personArray[i] = abs->personArray[i + 1];
		}
         abs->m_Size--;
		cout << "删除成功" << endl;
	}
	else
	{
		cout << "查无此人" << endl;
	}

	system("pause");
	system("cls");
}
```





#### 9,7 查找联系人

功能描述：按照姓名查看指定联系人信息

```C++
//4、查找指定联系人信息
void findPerson(Addressbooks * abs)
{
	cout << "请输入您要查找的联系人" << endl;
	string name;
	cin >> name;

	int ret = isExist(abs, name);
	if (ret != -1)
	{
		cout << "姓名：" << abs->personArray[ret].m_Name << "\t";
		cout << "性别：" << abs->personArray[ret].m_Sex << "\t";
		cout << "年龄：" << abs->personArray[ret].m_Age << "\t";
		cout << "电话：" << abs->personArray[ret].m_Phone << "\t";
		cout << "住址：" << abs->personArray[ret].m_Addr << endl;
	}
	else
	{
		cout << "查无此人" << endl;
	}

	system("pause");
	system("cls");

}
```



#### 9.8 修改联系人

功能描述：按照姓名重新修改指定联系人

```C++
//5、修改指定联系人信息
void modifyPerson(Addressbooks * abs)
{
	cout << "请输入您要修改的联系人" << endl;
	string name;
	cin >> name;

	int ret = isExist(abs, name);
	if (ret != -1)
	{
		//姓名
		string name;
		cout << "请输入姓名：" << endl;
		cin >> name;
		abs->personArray[ret].m_Name = name;

		cout << "请输入性别：" << endl;
		cout << "1 -- 男" << endl;
		cout << "2 -- 女" << endl;

		//性别
		int sex = 0;
		while (true)
		{
			cin >> sex;
			if (sex == 1 || sex == 2)
			{
				abs->personArray[ret].m_Sex = sex;
				break;
			}
			cout << "输入有误，请重新输入";
		}

		//年龄
		cout << "请输入年龄：" << endl;
		int age = 0;
		cin >> age;
		abs->personArray[ret].m_Age = age;

		//联系电话
		cout << "请输入联系电话：" << endl;
		string phone = "";
		cin >> phone;
		abs->personArray[ret].m_Phone = phone;

		//家庭住址
		cout << "请输入家庭住址：" << endl;
		string address;
		cin >> address;
		abs->personArray[ret].m_Addr = address;

		cout << "修改成功" << endl;
	}
	else
	{
		cout << "查无此人" << endl;
	}

	system("pause");
	system("cls");

}
```



#### 9.9 清空联系人

功能描述：清空通讯录中所有信息

```C++
//6、清空所有联系人
void cleanPerson(Addressbooks * abs)
{
	abs->m_Size = 0;
	cout << "通讯录已清空" << endl;
	system("pause");
	system("cls");
}
```



#### 9.10 完整代码

```c++
// 封装函数显示该界面  如 `void showMenu()`
// 在main函数中调用封装好的函数
#include <iostream>
#include <string>
using namespace std;

struct Person
{
	string m_Name;
	int m_Sex; // 1:男 2：女
	int m_Age;
	string m_Phone;
	string m_Addr;
};

#define MAX 20
// 通讯录结构体
struct AddressBook
{
	struct Person personArray[MAX];
	int m_size; // 通讯录中人员数
};

// 菜单界面
void showMenu() {
	cout << "***************************" << endl;
	cout << "*****  1、添加联系人  *****" << endl;
	cout << "*****  2、显示联系人  *****" << endl;
	cout << "*****  3、删除联系人  *****" << endl;
	cout << "*****  4、查找联系人  *****" << endl;
	cout << "*****  5、修改联系人  *****" << endl;
	cout << "*****  6、清空联系人  *****" << endl;
	cout << "*****  0、退出通讯录  *****" << endl;
	cout << "***************************" << endl;
}

// 1、添加联系人
void addPerson(AddressBook* abs) {
	if (abs->m_size >= MAX)
	{
		cout << "通讯录已满，无法添加！" << endl;
		return;
	}
	else {
		string name;
		cout << "请输入姓名：" << endl;
		cin >> name;
		abs->personArray[abs->m_size].m_Name = name;

		int sex = 0;
		cout << "请输入性别[1--男 | 2--女]：" << endl;
		cin >> sex;
		while (sex != 1 && sex != 2) {
			cout << "请输入合法字段！" << endl;
			cin >> sex;
		}
		abs->personArray[abs->m_size].m_Sex = sex;

		int age = 0;
		cout << "请输入年龄[1~150]：" << endl;
		while (true) {
			cin >> age;
			if (age <= 150 && age >=1)
			{
				abs->personArray[abs->m_size].m_Age = age;
				break;
			}
			else
			{
				cout << "请输入合法字段！" << endl;
			}
		}
		
		string phone;
		cout << "请输入联系电话：" << endl;
		cin >> phone;
		abs->personArray[abs->m_size].m_Phone = phone;

		string addr;
		cout << "请输入地址[1~50]：" << endl;
		while (true) {
			cin >> addr;
			if (addr.length() < 50 && addr.length() > 0)
			{
				abs->personArray[abs->m_size].m_Addr = addr;
				break;
			}
			else
			{
				cout << "请输入合法字段！" << endl;
			}
		}

		// 更新通讯录人数
		abs->m_size++;

		cout << "添加成功！" << endl;
	}
	// 清屏
	system("pause");
	system("cls");
}

// 2、显示所有联系人信息
void showPerson(AddressBook* abs) {
	if (abs->m_size == 0)
	{
		cout << "当前记录为空" << endl;
	}
	else
	{
		for (int i = 0; i < abs->m_size; i++)
		{
			cout << "姓名：" << abs->personArray[i].m_Name << "\t";
			cout << "性别：" << (abs->personArray[i].m_Sex == 1 ? "男" : "女") << "\t";
			cout << "年龄：" << abs->personArray[i].m_Age << "\t";
			cout << "电话：" << abs->personArray[i].m_Phone << "\t";
			cout << "住址：" << abs->personArray[i].m_Addr << endl;
		}
	}

	system("pause");
	system("cls");
}

// 判断是否存在查询的人员，存在返回在数组中索引位置，不存在返回-1
int isExist(AddressBook* abs, string name)
{
	for (int i = 0; i < abs->m_size; i++)
	{
		if (abs->personArray[i].m_Name == name)
		{
			return i;
		}
	}
	return -1;
}

//3、删除指定联系人信息
void deletePerson(AddressBook* abs)
{
	cout << "请输入您要删除的联系人" << endl;
	string name;
	cin >> name;

	int ret = isExist(abs, name);
	if (ret != -1)
	{
		for (int i = ret; i < abs->m_size; i++)
		{
			abs->personArray[i] = abs->personArray[i + 1];
		}
		abs->m_size--;
		cout << "删除成功" << endl;
	}
	else
	{
		cout << "查无此人" << endl;
	}

	system("pause");
	system("cls");
}

// 4、查找联系人
void findPerson(AddressBook* abs)
{
	cout << "请输入您要查找的联系人" << endl;
	string name;
	cin >> name;

	int ret = isExist(abs, name);
	if (ret != -1)
	{
		cout << "姓名：" << abs->personArray[ret].m_Name << "\t";
		cout << "性别：" << abs->personArray[ret].m_Sex << "\t";
		cout << "年龄：" << abs->personArray[ret].m_Age << "\t";
		cout << "电话：" << abs->personArray[ret].m_Phone << "\t";
		cout << "住址：" << abs->personArray[ret].m_Addr << endl;
	}
	else
	{
		cout << "查无此人" << endl;
	}

	system("pause");
	system("cls");

}

// 5、修改联系人
//5、修改指定联系人信息
void modifyPerson(AddressBook* abs)
{
	cout << "请输入您要修改的联系人" << endl;
	string name;
	cin >> name;

	int ret = isExist(abs, name);
	if (ret != -1)
	{
		//姓名
		string name;
		cout << "请输入姓名：" << endl;
		cin >> name;
		abs->personArray[ret].m_Name = name;

		cout << "请输入性别：" << endl;
		cout << "1 -- 男" << endl;
		cout << "2 -- 女" << endl;

		//性别
		int sex = 0;
		while (true)
		{
			cin >> sex;
			if (sex == 1 || sex == 2)
			{
				abs->personArray[ret].m_Sex = sex;
				break;
			}
			cout << "输入有误，请重新输入";
		}

		//年龄
		cout << "请输入年龄：" << endl;
		int age = 0;
		cin >> age;
		abs->personArray[ret].m_Age = age;

		//联系电话
		cout << "请输入联系电话：" << endl;
		string phone = "";
		cin >> phone;
		abs->personArray[ret].m_Phone = phone;

		//家庭住址
		cout << "请输入家庭住址：" << endl;
		string address;
		cin >> address;
		abs->personArray[ret].m_Addr = address;

		cout << "修改成功" << endl;
	}
	else
	{
		cout << "查无此人" << endl;
	}

	system("pause");
	system("cls");

}

// 6、清空联系人
void cleanPerson(AddressBook* abs)
{
	abs->m_size = 0;
	cout << "通讯录已清空" << endl;
	system("pause");
	system("cls");
}

int main() {
	int select = 0;

	// 初始化通讯录
	AddressBook abs;
	abs.m_size = 0;

	while (true) {
		showMenu();
		cin >> select;
		switch (select)
		{
		case 1: // 添加联系人
			addPerson(&abs); // 注意使用地址传递
			break;
		case 2: // 显示联系人
			showPerson(&abs);
			break;
		case 3: // 删除联系人
			deletePerson(&abs);
			break;
		case 4: // 查找联系人
			findPerson(&abs);
			break;
		case 5: // 修改联系人
			modifyPerson(&abs);
			break;
		case 6: // 清空联系人
			cleanPerson(&abs);
			break;
		case 0: // 退出
			cout << "欢迎下次使用！" << endl;
			system("pause");
			return 0;
			break;
			
		default:
			break;
		}
	}
	

	system("pause");

	return 0;
}
```


