---
title: MFC快速入门
date: 2024-08-28 10:20:07
urlname: mfc-start
tags:
  - 操作系统与框架
  - MFC
  - CPP
categories: C++开发
description:
draft: false
---


# 〇 目录

1. MFC初识
2. MFC程序开发流程
3. 简单绘图与文本编程
4. 菜单栏与工具栏
5. MFC总体理解
6. 对话框
7. 常用控件



<br>

# 一 MFC初识

## 1.1 MFC是什么

`Microsoft Foundation Classes`，是微软公司提供的类库，以C++类的形式封装了Windows API，也是一个应用程序框架，用以减少应用程序开发人员的工作量。



## 1.2 学习MFC的意义

- 满足windows应用开发需求【PC端软件】
- 满足外包开发需求
- 就业需要：今日头条、深信服、传统行业【修改编译参数后，可编译为XP至win10】
- 学习方法 
  - 掌握理论【C++多态、Windows消息循环，即`msg loop`】
  - 学会查询文档：[微软文档](https://learn.microsoft.com/zh-cn/)
  - 谷歌浏览器 chrome
  - 参考教材：孙鑫的《深入理解VC++》 参考



<br>

## 1.3  MFC开发环境搭建和就业方向

- visual studio 2019 社区版
- help viewer (MSDN library)

**MFC就业方向**：桌面应用开发、数控行业、公司内部的一些桌面软件、监控行业

> 上位机：最典型的就是打印机。

![img](mfc-1-1.PNG)

**工作负载**：在修改界面中，选择使用C++的桌面开发，然后在安装详细信息处勾选组件

- C++ ALT for v142 生成工具
- C++ MFC for v142 生成工具
- Help Viewer



<br>

## 1.4 MFC的前身：Win32

【完全手写Win32窗口程序】选择空项目，并手写Win32窗口程序：

> 由于WCHAR与CHAR的相关问题，该程序不能直接运行，理解思想即可。

```c++
//MFC  ： 1 C++的多态性 类   2 消息机制  3 面向对象的思想
//窗口：屏幕上的一块矩形区域
//程序员：代码搬运工  说明书使用王者
//参数坑爹
//VA  visual assist

#include <Windows.h>
#include <stdio.h>

 LPCSTR clsName = "clsFeng";
 LPCSTR msgName = "哔哩哔哩";
 LPCSTR msgUrl = "https://www.bilibili.com/";
 // 窗口交互响应处理函数声明
 LRESULT CALLBACK WinSunProc(
	 HWND  hwnd,
	 UINT  uMsg,
	 WPARAM wParam,
	 LPARAM lParam
 );

int WINAPI WinMain(
	HINSTANCE hInstance,
	HINSTANCE prevInstance,
	LPSTR lpCmdLine,
	int nCmdShow
) 
{
	//1 定义和配置窗口对象
	WNDCLASS wndcls;  //alt + G 
	wndcls.cbClsExtra = NULL;
	wndcls.cbWndExtra = NULL;
	wndcls.hbrBackground = (HBRUSH)GetStockObject(WHITE_BRUSH);
	wndcls.hCursor = LoadCursor(NULL, IDC_ARROW);
	wndcls.hIcon = LoadIcon(NULL, IDI_APPLICATION);
	wndcls.hInstance = hInstance;
	// 定义交互响应
	wndcls.lpfnWndProc = WinSunProc; //回调
	// 定义窗口代号
	wndcls.lpszClassName = clsName;
	wndcls.lpszMenuName = NULL;
	wndcls.style = CS_HREDRAW | CS_VREDRAW;
	//2 注册窗口
	RegisterClass(&wndcls);
	//3 创建窗口  句柄：标识？？  创建对象的一个标识： 图标 线程  应用 OVERLAPP

	HWND hwnd;
	hwnd = CreateWindow(clsName, msgName, WS_OVERLAPPEDWINDOW,
		CW_USEDEFAULT, CW_USEDEFAULT, CW_USEDEFAULT, CW_USEDEFAULT, NULL, NULL, hInstance, NULL);
	//4 显示和刷新窗口
	ShowWindow(hwnd, SW_SHOWNORMAL);
	UpdateWindow(hwnd);

	//5 消息循环
	 // 定义消息结构体，开始消息循环
	MSG msg;
	while (GetMessage(&msg, NULL, NULL, NULL)) {
		TranslateMessage(&msg);
		DispatchMessage(&msg);
	}
	return msg.wParam;
}

// 窗口交互响应处理
LRESULT CALLBACK WinSunProc(
	HWND  hwnd,
	UINT  uMsg,
	WPARAM wParam,
	LPARAM lParam
) {
	HDC hdc;
	int ret;
	switch (uMsg)
	{
	case WM_CHAR:
		char szChar[20];
		sprintf_s(szChar, "您刚按下了: %c", wParam);
		MessageBox(hwnd, szChar, "char", NULL);
		break;
	case WM_LBUTTONDOWN:
		MessageBox(hwnd, "检测到鼠标左键被按下", "message", NULL);
		break;
	case WM_PAINT:
		PAINTSTRUCT ps;
		hdc = BeginPaint(hwnd, &ps);
		TextOut(hdc, 0, 0, msgUrl, strlen(msgUrl));
		EndPaint(hwnd, &ps);
		MessageBox(hwnd, "重绘", "message", NULL);
		break;
	case WM_CLOSE:
		ret = MessageBox(hwnd, "是否真的结束？", "message", MB_YESNO);
		if (ret == IDYES)
		{
			DestroyWindow(hwnd);
		}
		break;
	case WM_DESTROY:
		PostQuitMessage(0);
		break;
	default:
		return DefWindowProc(hwnd, uMsg, wParam, lParam);
		break;
	}

	return 0;
}
```

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

下面是自动生成的【Windows桌面应用程序】模板：

```c++
// win32_demo.cpp : 定义应用程序的入口点。
//

#include "framework.h"
#include "win32_demo.h"

#define MAX_LOADSTRING 100

// 全局变量:
HINSTANCE hInst;                                // 当前实例
WCHAR szTitle[MAX_LOADSTRING];                  // 标题栏文本
WCHAR szWindowClass[MAX_LOADSTRING];            // 主窗口类名

// 此代码模块中包含的函数的前向声明:
ATOM                MyRegisterClass(HINSTANCE hInstance);
BOOL                InitInstance(HINSTANCE, int);
LRESULT CALLBACK    WndProc(HWND, UINT, WPARAM, LPARAM);
INT_PTR CALLBACK    About(HWND, UINT, WPARAM, LPARAM);

int APIENTRY wWinMain(_In_ HINSTANCE hInstance,
                     _In_opt_ HINSTANCE hPrevInstance,
                     _In_ LPWSTR    lpCmdLine,
                     _In_ int       nCmdShow)
{
    UNREFERENCED_PARAMETER(hPrevInstance);
    UNREFERENCED_PARAMETER(lpCmdLine);

    // TODO: 在此处放置代码。

    // 初始化全局字符串
    LoadStringW(hInstance, IDS_APP_TITLE, szTitle, MAX_LOADSTRING);
    LoadStringW(hInstance, IDC_WIN32DEMO, szWindowClass, MAX_LOADSTRING);
    MyRegisterClass(hInstance);

    // 执行应用程序初始化:
    if (!InitInstance (hInstance, nCmdShow))
    {
        return FALSE;
    }

    HACCEL hAccelTable = LoadAccelerators(hInstance, MAKEINTRESOURCE(IDC_WIN32DEMO));

    MSG msg;

    // 主消息循环:
    while (GetMessage(&msg, nullptr, 0, 0))
    {
        if (!TranslateAccelerator(msg.hwnd, hAccelTable, &msg))
        {
            TranslateMessage(&msg);
            DispatchMessage(&msg);
        }
    }

    return (int) msg.wParam;
}



//
//  函数: MyRegisterClass()
//
//  目标: 注册窗口类。
//
ATOM MyRegisterClass(HINSTANCE hInstance)
{
    WNDCLASSEXW wcex;

    wcex.cbSize = sizeof(WNDCLASSEX);

    wcex.style          = CS_HREDRAW | CS_VREDRAW;
    wcex.lpfnWndProc    = WndProc;
    wcex.cbClsExtra     = 0;
    wcex.cbWndExtra     = 0;
    wcex.hInstance      = hInstance;
    wcex.hIcon          = LoadIcon(hInstance, MAKEINTRESOURCE(IDI_WIN32DEMO));
    wcex.hCursor        = LoadCursor(nullptr, IDC_ARROW);
    wcex.hbrBackground  = (HBRUSH)(COLOR_WINDOW+1);
    wcex.lpszMenuName   = MAKEINTRESOURCEW(IDC_WIN32DEMO);
    wcex.lpszClassName  = szWindowClass;
    wcex.hIconSm        = LoadIcon(wcex.hInstance, MAKEINTRESOURCE(IDI_SMALL));

    return RegisterClassExW(&wcex);
}

//
//   函数: InitInstance(HINSTANCE, int)
//
//   目标: 保存实例句柄并创建主窗口
//
//   注释:
//
//        在此函数中，我们在全局变量中保存实例句柄并
//        创建和显示主程序窗口。
//
BOOL InitInstance(HINSTANCE hInstance, int nCmdShow)
{
   hInst = hInstance; // 将实例句柄存储在全局变量中

   HWND hWnd = CreateWindowW(szWindowClass, szTitle, WS_OVERLAPPEDWINDOW,
      CW_USEDEFAULT, 0, CW_USEDEFAULT, 0, nullptr, nullptr, hInstance, nullptr);

   if (!hWnd)
   {
      return FALSE;
   }

   ShowWindow(hWnd, nCmdShow);
   UpdateWindow(hWnd);

   return TRUE;
}

//
//  函数: WndProc(HWND, UINT, WPARAM, LPARAM)
//
//  目标: 处理主窗口的消息。
//
//  WM_COMMAND  - 处理应用程序菜单
//  WM_PAINT    - 绘制主窗口
//  WM_DESTROY  - 发送退出消息并返回
//
//
LRESULT CALLBACK WndProc(HWND hWnd, UINT message, WPARAM wParam, LPARAM lParam)
{
    switch (message)
    {
    case WM_COMMAND:
        {
            int wmId = LOWORD(wParam);
            // 分析菜单选择:
            switch (wmId)
            {
            case IDM_ABOUT:
                DialogBox(hInst, MAKEINTRESOURCE(IDD_ABOUTBOX), hWnd, About);
                break;
            case IDM_EXIT:
                DestroyWindow(hWnd);
                break;
            default:
                return DefWindowProc(hWnd, message, wParam, lParam);
            }
        }
        break;
    case WM_PAINT:
        {
            PAINTSTRUCT ps;
            HDC hdc = BeginPaint(hWnd, &ps);
            // TODO: 在此处添加使用 hdc 的任何绘图代码...
            EndPaint(hWnd, &ps);
        }
        break;
    case WM_DESTROY:
        PostQuitMessage(0);
        break;
    default:
        return DefWindowProc(hWnd, message, wParam, lParam);
    }
    return 0;
}

// “关于”框的消息处理程序。
INT_PTR CALLBACK About(HWND hDlg, UINT message, WPARAM wParam, LPARAM lParam)
{
    UNREFERENCED_PARAMETER(lParam);
    switch (message)
    {
    case WM_INITDIALOG:
        return (INT_PTR)TRUE;

    case WM_COMMAND:
        if (LOWORD(wParam) == IDOK || LOWORD(wParam) == IDCANCEL)
        {
            EndDialog(hDlg, LOWORD(wParam));
            return (INT_PTR)TRUE;
        }
        break;
    }
    return (INT_PTR)FALSE;
}
```

![](mfc-1-2.PNG)

<br>

## 1.5 重要概念

### 1.5.1 API与SDK

- `Application Programming Interface` 应用程序编程接口。
- `Software Development Kit` 软件开发工具包，一般会包括API接口文档，示例文档，帮助文档，使用手册，相关工具等。

<br>

### 1.5.2 窗口与句柄/窗口类对象

- 窗口就是屏幕上的一片区域，接收用户的输入，显示程序的输出。可以包含标题栏，菜单栏，工具栏，控件等。
- 句柄【handle】【资源的编号，二级指针，门把手】：窗口句柄、文件句柄、数据库连接句柄。
  - `Void*`的句柄设计，有点之一在于将具体的头文件编译脱钩【如使用了`CFile`类，需要`CFile*`指针指明是CFile类才可以正常编译；但使用`Void*`后，隐藏了类细节，且保证编译通过，编程人员无需关心CFile类的变更迭代】
  - 在具体的API函数中，填写`Void*`的句柄后，编译器根据函数定义中的对应形参要求，将填写的句柄指针自动转为所需类型。

> 句柄设计的优势：编译脱钩、细节屏蔽。

```cpp
//C++窗口类对象
Cwnd Mywnd; 
// 系统真实对象
m_wnd
```

C++窗口类对象与窗口并不是一回事，它们之间惟一的关系是C++窗口类对象内部定义了一个窗口句柄变量，保存了与这个C++窗口类对象相关的那个窗口的句柄。

> 窗口销毁时，与之对应的C++窗口类对象销毁与否，要看其生命周期是否结束。但C++窗口类对象销毁时，与之相关的窗口也将销毁。

<br>

### 1.5.3 消息循环

> Windows消息循环机制是Windows操作系统中GUI编程的核心部分，它是事件驱动编程模型的基础。

每个运行中的Windows应用程序都有与之关联的一个消息队列，当产生消息后【比如点击鼠标就会产生鼠标按下的消息，由操作系统识别消息并分发】，操作系统会将消息放入消息队列，应用程序【通过getMessage函数获取消息，进入消息循环】会循环从消息队列中检索消息并处理。这就是Windows消息循环机制。

> 有了消息队列以后，线程需要不断的去队列中取消息，并分发给各个GDI对象【图形设备接口】。因此，需要一个while循环，该循环称之为消息循环。

在消息循环中，可以对消息做一些简单的过滤和处理，也可以什么都不做，直接将消息分发到对应想窗口消息处理函数中。

一个简单的消息循环包含调用以下三个函数：`GetMessage`，`TranslateMessage`，和`DispatchMessage`。

![](mfc-1-3.PNG)

> 左图为银行业务简单示例，右图为Windows消息循环。

<br>

### 1.5.4 回调函数

> A君去某公司面试完后，人事经理说，" 不要打电话给我，我会打电话给你 "

相对于轮询模式，回调的方式系统开销更小，即每当事件发生，才通知去处理。

<br>

## 1.7 变量命名约定

| 前缀  | 含义                               | 前缀 | 含义                      |
| ----- | ---------------------------------- | ---- | ------------------------- |
| a     | 数组 array                         | b    | 布尔值 bool               |
| by    | 无符号字符(字节)                   | c    | 字符(字节)                |
| cb    | 字节计数，即长度【count byte】     | rgb  | 保存颜色值的长整型        |
| cx,cy | 短整型(计算x,y的长度)              | dw   | 无符号长整型              |
| fn    | 函数                               | h    | 句柄                      |
| i     | 整形(integer)                      | m_   | 类的数据成员member        |
| n     | 短整型或整型                       | np   | 近指针                    |
| p     | 指针(pointer)                      | l    | 长整型(long)              |
| lp    | 长指针，可能是其他线程或栈上的数据 | s    | 字符串string              |
| sz    | 以零结尾的字符串                   | tm   | 正文大小                  |
| w     | 无符号整型                         | x,y  | 无符号整型(表示x,y的坐标) |
| g_    | 全局变量                           |      |                           |

<br>



# 二 MFC程序开发流程

## 2.1 项目创建

1. 新建项目【MFC应用】，根据需要选择MFC应用程序类型【单个文档 | 多个文档 | 基于对话框 | 多个顶层文档】，此处选择对话框。

   - 基于对话框的程序：无菜单栏、工具栏，界面较为简单，可使用此类型对话框【典型的例子就是计算器】。
   - 基于文档/视图的程序：标准的windows应用界面，含菜单栏、工具栏、状态栏等【如Word、WPS】。

2. 使用MFC，选择【在静态库中使用MFC】，可编译生成exe文件，可移植性较高，但编译后的体积大；而选择【在共享DLL中使用MFC】编译体积小

3. 在【用户界面功能】中选择相应功能：粗框架、最大/最小化框、系统菜单【顶层窗口右键出现的菜单】、关于框，填写对话框标题。

4. 高级功能选择默认，提供一些崩溃处理【后四个】。除此以外，勾选Windows套接字；且不需要打印。

5. 资源视图中的`Dialog`文件下，选择 `IDD_MFCAPP_DIALOG` ，出现控件拖放界面。

6. 在控件拖放界面打开类视图，右键单击 `CMFCAppDlg`，选择属性。在属性界面选择筛选项为消息，此时可查看可供使用的消息类型。【此处添加 `OnLButtonDown` 消息处理】

   ```C++
   //MFCAppDlg.cpp中，自动生成刚添加的消息处理函数
   void CMFCAppDlg::OnLButtonDown(UINT nFlags, CPoint point)
   {
   	// TODO: 在此添加消息处理程序代码和/或调用默认值
   	MessageBox(_T("你好！"));
   	CDialogEx::OnLButtonDown(nFlags, point);
   }
   
   //同文件的中的消息匹配【自动生成】：作用同win32中的switch_case
   BEGIN_MESSAGE_MAP(CMFCAppDlg, CDialogEx)
   	ON_WM_SYSCOMMAND()
   	ON_WM_PAINT()
   	ON_WM_QUERYDRAGICON()
   	ON_WM_LBUTTONDOWN()
   END_MESSAGE_MAP()
   ```

   

> 不推荐勾选【解决方案与项目在同一文件夹】。不勾选时，一个解决方案可以有多个项目。



<br>

## 2.2 MFC与win32开发方式的区别

MFC适合Windows下的界面开发，是对`win32`的封装；而不需要界面的应用，最好用win32。

- 定制界面的区别【手写代码 vs 拖放控件】
- 响应键盘、鼠标的区别【窗口处理函数 vs 消息映射机制】
  - Win32中使用的窗口交互响应处理函数，其中使用 `switch_case` 处理消息。
  - MFC中使用消息映射机制

<br>

## 2.3 MFC消息映射机制

📋`2.1`中的第六步，添加的是全局消息处理函数【左键按下消息】。

同样，可以双击控件，添加点击消息处理函数。

```cpp
//消息映射表【自动生成】：作用同win32中的switch_case
BEGIN_MESSAGE_MAP(CMFCAppDlg, CDialogEx)
	ON_WM_SYSCOMMAND()
	ON_WM_PAINT()
	ON_WM_QUERYDRAGICON()
	ON_WM_LBUTTONDOWN()
	ON_BN_CLICKED(IDOK, &CMFCAppDlg::OnBnClickedOk)//!!!
END_MESSAGE_MAP()
    
//MFCAppDlg.cpp中，自动生成刚添加的消息处理函数
void CMFCAppDlg::OnLButtonDown(UINT nFlags, CPoint point)
{
	MessageBox(_T("你好！"));// 提示内容，而标题title，默认为项目名【MFCApp】
	CDialogEx::OnLButtonDown(nFlags, point);
}

void CMFCAppDlg::OnBnClickedOk()
{
	// MessageBox(提示内容,提示框标题title,取消处理函数)
	UINT ret = MessageBox(_T("确认吗？"), _T("退出确认"), MB_OKCANCEL);
	if (ret == IDOK)
	{
		CDialogEx::OnOK();
	}
}
```

- 【`MFCAppDlg.cpp`】自动生成：消息映射表
- 【`MFCAppDlg.cpp`】自动生成：消息响应函数
- 自动在头文件【`MFCAppDlg.h`】中生成：消息响应函数的声明

```cpp
// CMFCAppDlg 对话框
class CMFCAppDlg : public CDialogEx
{
// 构造
public:
	CMFCAppDlg(CWnd* pParent = nullptr);	// 标准构造函数

// 对话框数据
ifdef AFX_DESIGN_TIME
	enum { IDD = IDD_MFCAPP_DIALOG };
endif

	protected:
	virtual void DoDataExchange(CDataExchange* pDX);	// DDX/DDV 支持


// 实现
protected:
	HICON m_hIcon;

	// 生成的消息映射函数
	virtual BOOL OnInitDialog();
	afx_msg void OnSysCommand(UINT nID, LPARAM lParam);
	afx_msg void OnPaint();
	afx_msg HCURSOR OnQueryDragIcon();
	DECLARE_MESSAGE_MAP()
public:
	afx_msg void OnLButtonDown(UINT nFlags, CPoint point);//#############
	afx_msg void OnBnClickedOk();//######################################
};
```

![](mfc-2-1.PNG)

<br>

## 2.4 体会MFC程序的运行过程

> 此小节紧接在第三章创建MFCPaint应用之后。

### 2.4.1 断点逐过程执行Main函数

为了体会MFC应用的运行过程，双击类视图中的 `CMFCPaintApp` ，出现头文件，包含`CMFCPaintApp`的定义。

右键菜单选择该类的代码实现，转到 `MFCPaint.cpp`，在 `BOOL CMFCPaintApp::InitInstance()` 该函数的第一行代码处打上断点，然后逐过程执行代码。

1. 可以看到，首先进入了MFC框架内部的`main`函数【即`appmoudl.cpp`中的`_tWinMain()`】，并返回`AfxWinMain()`

   ```cpp
   extern "C" int WINAPI
   _tWinMain(_In_ HINSTANCE hInstance, _In_opt_ HINSTANCE hPrevInstance,
   	_In_ LPTSTR lpCmdLine, _In_ int nCmdShow)
   #pragma warning(suppress: 4985)
   {
   	// call shared/exported WinMain
   	return AfxWinMain(hInstance, hPrevInstance, lpCmdLine, nCmdShow);
   }
   ```

   

2. 在`AfxWinMain`函数中，会执行应用的初始化函数`InitInstance()`，初始化成功时进入线程的运行状态。在初始化函数中，包含了窗口的初始化、显示、更新。

   ```cpp
   int AFXAPI AfxWinMain(HINSTANCE hInstance, HINSTANCE hPrevInstance,
   	_In_ LPTSTR lpCmdLine, int nCmdShow)
   {
   	ASSERT(hPrevInstance == NULL);
   
   	int nReturnCode = -1;
   	CWinThread* pThread = AfxGetThread();
   	CWinApp* pApp = AfxGetApp();
   
   	// AFX internal initialization
   	if (!AfxWinInit(hInstance, hPrevInstance, lpCmdLine, nCmdShow))
   		goto InitFailure;
   
   	// App global initializations (rare)
   	if (pApp != NULL && !pApp->InitApplication())
   		goto InitFailure;
   
   	// Perform specific initializations
   	if (!pThread->InitInstance())
   	{
   		if (pThread->m_pMainWnd != NULL)
   		{
   			TRACE(traceAppMsg, 0, "Warning: Destroying non-NULL m_pMainWnd\n");
   			pThread->m_pMainWnd->DestroyWindow();
   		}
   		nReturnCode = pThread->ExitInstance();
   		goto InitFailure;
   	}
   	nReturnCode = pThread->Run();//#############线程运行状态###############
   
   InitFailure:
   #ifdef _DEBUG
   	// Check for missing AfxLockTempMap calls
   	if (AfxGetModuleThreadState()->m_nTempMapLock != 0)
   	{
   		TRACE(traceAppMsg, 0, "Warning: Temp map lock count non-zero (%ld).\n",
   			AfxGetModuleThreadState()->m_nTempMapLock);
   	}
   	AfxLockTempMaps();
   	AfxUnlockTempMaps(-1);
   #endif
   
   	AfxWinTerm();
   	return nReturnCode;
   }
   ```

   

3. 线程结束，则AfxWinMain函数结束。

<br>

### 2.4.2 结合绘图过程再谈消息映射机制

MFCPaint要实现的最简单的功能是：在DocView控件中画出直线。

剖析该功能的运行过程：

1. 产生两个事件：鼠标左键按下、拖动、松开，操作系统收到事件后，投递给MFC应用。
2. MFC应用将事件转为相应的消息，并投递给应用中的所有控件。
3. 除了点击消息坐标相符的控件会响应以外，其他控件都不会处理该消息，即最终经过层层投递，DocView控件接收到消息并处理【每次处理一个消息】。

<br>

# 三 简单绘图与文本编程

## 3.1 项目创建与引入

首先创建本节的MFC项目：

- 此处创建新项目`MFCPaint`，项目应用程序类型选择【单个文档】，项目样式默认【Visual Stdio】，视觉样式和颜色选择【Windows Native/Default】，选择在静态库中使用MFC。

- 在文档模板属性中，若填写文件扩展名，则该扩展名的文件都会使用本程序打开。

- 在高级功能中勾选套接字，最近文件列表数修改为16【按需】，无需打印。

- 在生成的类中，文件名推荐为默认即可。

在单文档视图结构中，四个重要的类：

- APP：MFC应用的入口函数，其包含main函数，但被隐藏。
- MainFrame：主框架，包括菜单栏、工具栏、状态栏等。
- View：控制显示，文档视图。
- Doc：文档，为View提供内容。

> 而在多文档结构中，只是在单文档结构的基础上，多了调度的部分，允许主框架中有多了文档和视图。

![img](mfc-3-1.PNG)

> 初学者会在解决方案资源管理器中看多众多cpp和头文件，其实无需头疼，只需关注【类视图】，见上图右，具体的各个类的用途稍后详述，该项目的初始运行截图见下图。

![img](mfc-3-2.PNG)

<br>

🔺这种架构属于MVC，即Model、View、Controller，模型、视图和控制。

- 模型即纯数据
- 视图：目之所见。
- 控制器：控制模型数据显示在视图之上，包括数据的增删改查，否则数据就是固定写死的。

所有带`View`的都是视图，需要在 `MFCPaintView` 中编写代码。

<br>



## 3.2 画线

关键信息：

- 屏幕坐标点和客户坐标点
- 设备上下文【Device Content, DC】
- 事件

起点和终点：

- 如何捕捉这两点？ 【鼠标左键按下：起点， 鼠标左键抬起：终点】
- 点如何表示：CPoint【MFC内置类】
  1. 记录起始点的坐标【鼠标左键按下】
  2. 记录结束点的坐标【鼠标左键起来】

<br>

上面提到，需要在 `MFCPaintView.cpp` 中编写代码。故依次操作：

1. 打开类视图，右键单击 `CMFCPaintView` ，在右键菜单中选择属性，在属性控件中选择【消息】，查看可处理的消息类型。

2. 此处要实现画线功能，故需要关注鼠标左键按下和松开的两个事件【`WM_LBUTTONDOWN` | `WM_LBUTTONUP`】。

3. 在两个事件标记右侧点击箭头，选择Add Message，即可在`MFCPaintView.cpp`中添加消息处理函数。

4. 考虑到两个不同的消息，会产生两个不同的坐标，故需要在`MFCPaintView.h`中定义`protected`的变量来保存两个坐标。

   - 此处使用`m_start`/`m_stop`，并在消息处理函数中记录两个点坐标。
   - 调试：可以在消息处理函数中的赋值处，打上断点，通过调试查看是否记录坐标】

   ![img](mfc-3-3.PNG)

```cpp
//MFCPaintView.cpp中的消息处理函数
// CMFCPaintView 消息处理程序
void CMFCPaintView::OnLButtonDown(UINT nFlags, CPoint point)
{
	// TODO: 在此添加消息处理程序代码和/或调用默认值
	m_start = point;
	CView::OnLButtonDown(nFlags, point);	// 默认的消息处理，继续往下传递
}

void CMFCPaintView::OnLButtonUp(UINT nFlags, CPoint point)
{
	// TODO: 在此添加消息处理程序代码和/或调用默认值
	m_stop = point;
	CView::OnLButtonUp(nFlags, point);
}
```

需要注意的有：

- 此处的`CPoint`类，继承自一个包含横纵坐标的结构体。可以看到，C++中的类和struct是一回事，唯一区别在于权限。
- 此处得到的坐标为用户坐标，即相对于MFC应窗口的坐标。
- 在消息处理函数处理完点击消息，依然需要默认的消息处理函数，即需要继续往下传递消息。最典型的例子就是`Destroy`消息，如果不继续传递，可能某些子控件无法销毁，从而导致内存泄漏或崩溃。

<br>

在画直线之前，需要知道：

📋什么是上下文？

- 以绘制直线为例，上下文包括：画笔的宽度、线型、颜色等，背景、范围坐标、状态【最大化|最小化】等。
- 窗口上下文包括：窗口位置、状态、注册消息、消息响应函数等。

📋什么是设备上下文？

- 此处的设备，特指显示设备，可以超出窗口之外。
- 获取设备上下文：`CDC *cdc = getDC()；`

<br>

下面，我们来画直线：

```cpp
void CMFCPaintView::OnLButtonDown(UINT nFlags, CPoint point)
{
	// TODO: 在此添加消息处理程序代码和/或调用默认值
	m_start = point;
	CView::OnLButtonDown(nFlags, point);	// 默认的消息处理，继续往下传递
}

void CMFCPaintView::OnLButtonUp(UINT nFlags, CPoint point)
{
	// TODO: 在此添加消息处理程序代码和/或调用默认值
	m_stop = point;

	// CDC: The device context
	// 获取设备上下文
	CDC* pDC = GetDC();
	// 移动画笔
	pDC->MoveTo(m_start);
	// 画直线
	pDC->LineTo(m_stop);
	// 释放CDC【CDC是独占式使用的】
	ReleaseDC(pDC);
	// 此时只有在点击->拖动->松开鼠标之后才出现直线，拖动过程中无展示

	CView::OnLButtonUp(nFlags, point);
}
```

此时，只有在点击 -> 拖动 -> 松开鼠标之后才出现直线，拖动过程中无展示。

为了在拖动过程中也展示直线状态，做以下工作：

- 添加`BOOL`的新类成员变量：`m_status`【需要在`CMFCPaintView` 类的构造函数中对`m_status`初始化为`FALSE`】
- 新增消息处理函数：`WM_MOUSEMOVE`【鼠标移动：当`m_status`开启则绘制线条预览，否则什么都不做】
- 上面的消息不是最好的选择，因为其绘画状态线一直在闪动，且会刷新之前的画线。
  - 鼠标移动时，线条闪动原因：每次鼠标移动，都会运行`InvalidateRect(NULL)` 触发重绘，重绘会调用`OnDraw()`。如果在`OnDraw()`中再次绘制预览线，会非常顺滑，即【刷新 `->` `OnDraw()`绘制预览直线】；如果在鼠标移动处理函数中绘制预览线，会闪动，即【刷新 `->` `OnDraw()`空函数 `->` 回调函数返回并绘制预览线】。
- 最好的办法是在 `OnDraw()`中显示预览。【需要在`CMFCPaintView`的构造函数中对`m_start`、`m_stop`、`m_cur`初始化，并在鼠标移动的消息处理中为`m_cur`赋值】
- 如果不想清除上一次画的线，就需要在`OnDraw()`中使用列表来存储。

```CPP
void CMFCPaintView::OnDraw(CDC* pDC)
{
	CMFCPaintDoc* pDoc = GetDocument();
	ASSERT_VALID(pDoc);
	if (!pDoc)
		return;

	// TODO: 在此处为本机数据添加绘制代码
	if (m_status)
	{
		pDC->MoveTo(m_start);
		pDC->LineTo(m_cur);
	}
	else
	{
		pDC->MoveTo(m_start);
		pDC->LineTo(m_stop);
	}
}

void CMFCPaintView::OnLButtonDown(UINT nFlags, CPoint point)
{
	// TODO: 在此添加消息处理程序代码和/或调用默认值
	m_start = point;
	m_status = TRUE;
	CView::OnLButtonDown(nFlags, point);	// 默认的消息处理，继续往下传递
}

void CMFCPaintView::OnLButtonUp(UINT nFlags, CPoint point)
{
	// TODO: 在此添加消息处理程序代码和/或调用默认值
	m_stop = point;

	// CDC: The device context
	// 获取设备上下文
	CDC* pDC = GetDC();
	// 移动画笔
	pDC->MoveTo(m_start);
	// 画直线
	pDC->LineTo(m_stop);
	// 释放CDC【CDC是独占式使用的】
	ReleaseDC(pDC);
	// 此时只有在点击->拖动->松开鼠标之后才出现直线，拖动过程中无展示

	m_status = FALSE;

	CView::OnLButtonUp(nFlags, point);
}

void CMFCPaintView::OnMouseMove(UINT nFlags, CPoint point)
{
	// TODO: 在此添加消息处理程序代码和/或调用默认值
	
	if (m_status)
	{
        m_cur = point;
		InvalidateRect(NULL);//重绘【触发界面刷新清空】触发OnDraw()
		/*CDC* pDC = GetDC();
		pDC->MoveTo(m_start);
		pDC->LineTo(point);
		ReleaseDC(pDC);*/
	}
	// 这种写法也会刷新之前画的线，也存在问题
	// 最好的办法是在 OnDraw()中显示预览
	
	CView::OnMouseMove(nFlags, point);
}
```

![](mfc-3-4.PNG)

<br>

 

## 3.3 画笔

调整上一节的代码，将绘制任务集中在 `OnDraw()` 函数中。

```cpp
void CMFCPaintView::OnLButtonDown(UINT nFlags, CPoint point)
{
	// TODO: 在此添加消息处理程序代码和/或调用默认值
	m_start = point;
	m_status = TRUE;
	CView::OnLButtonDown(nFlags, point);	// 默认的消息处理，继续往下传递
}

void CMFCPaintView::OnLButtonUp(UINT nFlags, CPoint point)
{
	// TODO: 在此添加消息处理程序代码和/或调用默认值
	m_stop = point;
	m_status = FALSE;
    InvalidateRect(NULL);//异步触发重绘，绘制目标直线
	
	CView::OnLButtonUp(nFlags, point);
}

void CMFCPaintView::OnMouseMove(UINT nFlags, CPoint point)
{
	// TODO: 在此添加消息处理程序代码和/或调用默认值
	
	if (m_status)
	{
		m_cur = point;
		InvalidateRect(NULL);//重绘【触发界面刷新清空】
	}

	CView::OnMouseMove(nFlags, point);
}
```

在`OnDraw()`中修改画笔属性并选择：

```CPP
//CPen类定义的构造函数原型
CPen(int nPenStyle, int nWidth, COLORREF crColor);//笔形，线宽，颜色
//PS_SOLID 实线， PS_DASH 虚线， PS_DOT 点线， PS_DOTDASH 点划线
```

> 当线宽大时，会看不出线形的变化，即只能在线宽为1时，才可以清晰看到线形。
>
> 如果想保留线形，还想加宽，可以尝试画多条1像素宽的垂直位移1像素的相同线条。当然这种办法也会出现新的问题，相应解决即可。

```cpp
void CMFCPaintView::OnDraw(CDC* pDC)
{
	CMFCPaintDoc* pDoc = GetDocument();
	ASSERT_VALID(pDoc);
	if (!pDoc)
		return;

	// TODO: 在此处为本机数据添加绘制代码
	CPen pen(PS_DASH, 1, RGB(255, 0, 0));
	CPen* pOldPen = pDC->SelectObject(&pen);	// 上下文选择画笔，返回原画笔，用完即还原
    
    // 验证查看原画笔线形
    LOGPEN logpen;
    pOldPen->GetLogPen(&logpen);
    TRACE("\n%d  Color:%08x  width=%d\r\n", logpen.lopnStyle, logpen.lopnColor, logpen.lopnWidth);
    
	if (m_status)
	{
		pDC->MoveTo(m_start);
		pDC->LineTo(m_cur);
	}
	else
	{
		pDC->MoveTo(m_start);
		pDC->LineTo(m_stop);
	}
	pDC->SelectObject(pOldPen);	//还原画笔，pen作为局部变量也会被析构
}
```

> 注意此处的 `TRACE()` 的调试方法，在【输出】窗口出现调试信息，双击可跳转到对应的`TRACE`语句。

<br>



## 3.4 画刷【填充】

本节画矩形并填充颜色。

```cpp
// CMFCPaintView 绘图
void CMFCPaintView::OnDraw(CDC* pDC)
{
	CMFCPaintDoc* pDoc = GetDocument();
	ASSERT_VALID(pDoc);
	if (!pDoc)
		return;

	// TODO: 在此处为本机数据添加绘制代码
	CPen pen(PS_DASH, 1, RGB(255, 0, 0));
	CPen* pOldPen = pDC->SelectObject(&pen);	// 上下文选择画笔，返回原画笔，用完即还原

	CBrush brush(RGB(0, 255, 255));
	CBrush brush2(RGB(0, 255, 0));
	CBrush* pOldBrush = pDC->SelectObject(&brush);

	if (m_status)
	{
		/*pDC->MoveTo(m_start);
		pDC->LineTo(m_cur);*/
		pDC->FillRect(CRect(m_start, m_cur), &brush);//此处的brush可以为NULL，默认使用上下文画刷
	}
	else
	{
		/*pDC->MoveTo(m_start);
		pDC->LineTo(m_stop);*/
		pDC->FillRect(CRect(m_start, m_stop), &brush2);// 鼠标左键松开后使用brush2
	}
	pDC->SelectObject(pOldPen);	//还原画笔，pen作为局部变量也会被析构
	pDC->SelectObject(pOldBrush);
}
```

![img](mfc-3-5.PNG)

```cpp
// 参考
CBrush brush(RBG(255,0,0));

//CClientDC【上下文的初始化方式】：从this复制一份
// class CClientDC : public CDC
CClientDC dc(this);
dc.FillRect(CRect(起点，终点)， &brush);
```

<br>

## 3.5 文本编程

> MFC的对象基本都有几个阶段：
>
> 1. 构造阶段：初始化成员变量。
> 2. 创建阶段Create：将对象和窗口绑定。
> 3. 可选状态：二选一
>    1. showWindow阶段：如View，用于显示。
>    2. DoModal阶段：如Dialog，须要执行一些操作。
> 4. Destroy销毁阶段：使对象和窗口无效。
> 5. Delete：删除对象 。

文本编程的光标，需要在Create阶段加入View。

> 故在 `MFCPaintView.cpp` 中添加 `Create` 的【**重构**】函数【与消息按钮同一列】。此处错误！

> 准确的说，应该在Create阶段结束，将光标加入。故在 `MFCPaintView.cpp` 中添加 `OnCreate` 的消息处理函数。

📋第一步：创建插入符并且显示

```cpp
/*
BOOL CMFCPaintView::Create(LPCTSTR lpszClassName, LPCTSTR lpszWindowName, DWORD dwStyle, const RECT& rect, CWnd* pParentWnd, UINT nID, CCreateContext* pContext)
{
	// TODO: 在此添加专用代码和/或调用基类
	return CView::Create(lpszClassName, lpszWindowName, dwStyle, rect, pParentWnd, nID, pContext);
}
*/

int CMFCPaintView::OnCreate(LPCREATESTRUCT lpCreateStruct)
{
	if (CView::OnCreate(lpCreateStruct) == -1)
		return -1;

	// TODO:  在此添加您专用的创建代码
	//CreateSolidCaret(3, 20);// 创建固定大小光标，但实际上光标大小与上下文DC有关
	CClientDC dc(this);
	//度量 该函数把程序的当前字体信息，存放到TEXTMETRIC
	TEXTMETRICW tm;
	// GetTextMetrics函数转到定义发现是宏定义，其实不是。可以在CClientDC或CDC的成员函数中找到。
	// BOOL GetTextMetrics(LPTEXTMETRIC lpMetrics) const; 
	// 其参数为 LPTEXTMETRIC，转到定义，其本质是个tagTEXTMETRICW结构体。
	/*typedef struct tagTEXTMETRICW
	{
		LONG        tmHeight;			// 高
		LONG        tmAveCharWidth;		// 平均字符宽度
		LONG        tmMaxCharWidth;		// 最大字符宽度
		LONG        tmWeight;			// 字体磅数
		BYTE        tmItalic;			// 是否是斜体
		BYTE        tmUnderlined;		// 是否下划线
		BYTE        tmStruckOut;		// 是否突出
		BYTE        tmCharSet;			//字符集
	}*/
	dc.GetTextMetrics(&tm);
	//为系统插入一个 插入符
	CreateSolidCaret(tm.tmAveCharWidth / 8,tm.tmHeight);// 宽可以固定为3
	ShowCaret();// 展示光标
	return 0;
}
```

> 此处可能存在失去焦点后，光标丢的是BUG，后期再说。

📋第二步：`onchar`消息处理函数处理：文字键入

> 该消息处理函数会接收到字符键入，需要有成员变量来暂存字符，故在 `MFCPaintView.h` 中定义`protected`的类成员变量：`CString m_strText;`

```cpp
void CMFCPaintView::OnChar(UINT nChar, UINT nRepCnt, UINT nFlags)
{
	// TODO: 在此添加消息处理程序代码和/或调用默认值
	TRACE("%c\r\n",nChar);
	CClientDC dc(this);
	m_strText += (TCHAR)nChar;	// 创建的MFC项目默认为宽字符，允许有UNICODE出现
	dc.TextOut(0,0,m_strText);	// 输出、绘制，【不支持多行显示】，换行回车需要额外处理
	
	CView::OnChar(nChar, nRepCnt, nFlags);
}
```

> 此时存在一些问题：1、有闪动的情况；2、无法处理回车；3、光标始终在最开始的位置。

解决方法：

1. 将绘制函数 `dc.TextOut` 直接追加至 `onDraw` 中，在 `OnChar` 处理函数仅仅刷新界面触发 `onDraw` 即可。
2. 在`onDraw` 中对换行符做特殊处理。
3. 调整光标位置。

```cpp
void CMFCPaintView::OnChar(UINT nChar, UINT nRepCnt, UINT nFlags)
{
	// TODO: 在此添加消息处理程序代码和/或调用默认值
	//TRACE("%c\r\n", nChar);
	CClientDC dc(this);
	m_strText += (TCHAR)nChar;	// 创建的MFC项目默认为宽字符，允许有UNICODE出现
	//dc.TextOut(0,0,m_strText);	// 输出
	InvalidateRect(NULL);
	CView::OnChar(nChar, nRepCnt, nFlags);
}


// CMFCPaintView 绘图
void CMFCPaintView::OnDraw(CDC* pDC)
{
	CMFCPaintDoc* pDoc = GetDocument();
	ASSERT_VALID(pDoc);
	if (!pDoc)
		return;

	// TODO: 在此处为本机数据添加绘制代码
	CPen pen(PS_DASH, 1, RGB(255, 0, 0));
	CPen* pOldPen = pDC->SelectObject(&pen);	// 上下文选择画笔，返回原画笔，用完即还原

	CBrush brush(RGB(0, 255, 255));
	CBrush brush2(RGB(0, 255, 0));
	CBrush* pOldBrush = pDC->SelectObject(&brush);

	if (m_bStatus)
	{
		/*pDC->MoveTo(m_start);
		pDC->LineTo(m_cur);*/
		pDC->FillRect(CRect(m_ptStart, m_ptCur), &brush);//此处的brush可以为NULL，默认使用上下文画刷
	}
	else
	{
		/*pDC->MoveTo(m_start);
		pDC->LineTo(m_stop);*/
		pDC->FillRect(CRect(m_ptStart, m_ptStop), &brush2);// 鼠标左键松开后使用brush2
	}
	pDC->SelectObject(pOldPen);	//还原画笔，pen作为局部变量也会被析构
	pDC->SelectObject(pOldBrush);

	// 【文本编辑】
	// 1固定输出；2只能单行输出
	//pDC->TextOut(0, 0, m_strText);

	//最简单的做法就是：遍历
	CString sub = _T("");// 存储需要输出的无换行的一行字符
	// 关于此处的_T()，因为本项目为宽字符集的编程，而""本质是const char[],为多字符集
	// 故需要用到_T宏，会根据字符集设置添加一个L：#define __T(x)      L ## x
	int y = 0;	//存储行数，实际上为显示的纵坐标
	// 思路：遍历字符串。不是回车则加入sub；如果是，则输出sub，并置空sub，行数/行高增加，跳过该字符。
	for (int i = 0; i < m_strText.GetLength(); i++)
	{
		// 调试发现没有\n，只有\r。【还留着\n是处理复制粘贴到\n的情况】
		if ((m_strText.GetAt(i) == '\n') || (m_strText.GetAt(i) == '\r'))
		{
			pDC->TextOut(0, y, sub);
			CSize sz = pDC->GetTextExtent(sub);// 必须在sub.Empty之前，此时y=20
			sub.Empty();
			//CSize sz = pDC->GetTextExtent(sub);// 此时y=0

			//y += 20;
			y = y + sz.cy + 3;// + 字符高 + 行距
			//TRACE("y=%d\n\r", sz.cy);
			continue;
		}
		sub += m_strText.GetAt(i);
	}
	if (sub.IsEmpty() == FALSE)
	{
		pDC->TextOut(0, y, sub);//最后一次输出
	}

	// 【设置光标位置】: 1功能函数 2思考使用细节
	CSize sz = pDC->GetTextExtent(sub);// 获取sub的扩展信息
	/*
	CPoint pt;
	pt.y = y;
	// 由于字符宽度不一致，如w的宽度是l的几倍。故需要借助pDC来计算
	pt.x = sz.cx;
	SetCaretPos(pt);
	*/
	SetCaretPos(CPoint(sz.cx + 2, y));//简写
	//::SetCaretPos(sz.cx + 2, y);// 直接使用系统API，而非MFC的API
}
```

可参考代码：

```cpp
//1、创建插入符并且显示
//2、onchar  文字消息
	CClientDC dc(this);

	//创建字体
	CFont font;
	font.CreatePointFont(300, _T("华文行楷"),NULL);
	CFont* pOldFont = dc.SelectObject(&font);
	// 该函数把程序的当前字体信息，存放到TEXTMETRIC 123
	TEXTMETRIC tm;
	dc.GetTextMetrics(&tm);
	if (0X08 == nChar) 
	{
		//退格
		COLORREF clr = dc.SetTextColor(dc.GetBkColor()); 
		dc.TextOut(m_ptorigin.x, m_ptorigin.y, m_strline);
		m_strline = m_strline.Left(m_strline.GetLength() - 1);
		dc.SetTextColor(clr);
	}
	else if (0X0D == nChar)
	{
		//回车键
		m_strline.Empty();
		m_ptorigin.y += tm.tmHeight;
	}
	else
	{
		m_strline += __wchar_t(nChar);
	}
	// 1 坐标右移 1.1得到字体的大小 1.2找到原始坐标   
	CSize sz = dc.GetTextExtent(m_strline); 
	CPoint pt;
	pt.x = m_ptorigin.x + sz.cx;
	pt.y = m_ptorigin.y ;
	// 2 插入符右移
	SetCaretPos(pt);
	//3 显示插入的文字
	dc.TextOut(m_ptorigin.x, m_ptorigin.y,m_strline);
	dc.SelectObject(pOldFont);
	CView::OnChar(nChar, nRepCnt, nFlags);
```



需要注意几点：

- 注意此处成员变量的命名规范，MFC和Windows都遵循这样的命名规范。
  - 如 `m_bStatus` ：表示成员变量，类型为BOOL，变量名原始名为 `status`。
- 很多处理加入到 `OnDraw` 处理函数中，便不会受窗口最大化最小化、窗口的变形遮挡等操作的影响，消息一旦发出便会绘制关键信息，保证绘制内容一直都在。
- 关于此处的`_T()`：
  - 因为本项目为宽字符集的编程，而`""`本质是`const char[]`，是多字符集。 故需要用到`_T`宏，其会根据字符集设置添加一个L：`#define __T(x)      L ## x`
  - `_T`宏在宽字符集和多字符集之间切换时非常有用，可以不改变源码。
- 经过调试发现，回车触发的`OnChar` 只捕获到了`\r`，而没有捕获到`\n`。
  - 在`if`中除了`\r`，依然留着`\n`，是为了处理复制粘贴到`\n`的情况。
  - 另一个处理思路：在数据源头上将`\r`转为`\n`。当然怎么选择取决于业务环境和需求。
  - MFC编程的核心其实在于对于消息处理的经验。
  - 编写代码时，下断点、单步调试、设置监视变量等，都是必备技巧。

<br>

## 3.6 小结

MFC 中绝大多数处理的都是默认消息，其处理思路如下：

1. 确认响应什么消息【除了可以简单理解的，还需要注意 `WM_CREATE`、`WM_PAINT` 等】
2. 添加消息响应函数

3. 追加消息响应内容

> 关于`WM_PAINT`，在显示窗口之后，即调用 `showWindow`或`DoModel` 绘制主框架后，就会发出一个绘制消息`WM_PAINT`给窗口中的所有控件和子控件，各自绘制各自的View【菜单栏、工具栏、左边栏、右边栏、下边栏、内容区、状态栏】

难点在于：

1. 难以确认涉及的消息【通过学习和查资料】
2. 每个消息的处理约束难以掌握



<br>

# 四 菜单与工具栏

## 4.1 基本菜单操作

📋新建子菜单和菜单项，并修改相关属性

1. 资源视图 --> `Menu` --> `IDR_MAINFRAME`， 双击打开菜单编辑器。

2. 插入【绘图】顶层菜单，并在右侧属性栏编辑：

   1. Caption描述：`绘图(&P)`，显示为`绘图(P)`【快捷键】。

3. 在绘图下添加菜单项，添加快捷键【Alt + 按键】、对ID命名，修改【属性：弹出菜单Popup】为False，否则无法添加事件处理程序，也无法修改ID

   1. 添加子菜单【画直线】，快捷键为`L`，按命名规范对`ID`进行命名【`ID_DRAW_LINE`】
   2. 添加子菜单【画矩形】，快捷键为`R`，按命名规范对`ID`进行命名【`ID_DRAW_RECT`】
   3. 添加子菜单【画椭圆】，快捷键为`E`，按命名规范对`ID`进行命名【`ID_DRAW_ELLIPSE`】
   4. 添加子菜单【画笔】，快捷键为`P`，按命名规范对`ID`进行命名【`ID_PEN`】

   ![](mfc-4-1.png)

> `ID`命名技巧：程序中会用到多种资源，在为资源确定其ID号时，为了明确区分资源类型，一般都遵循这样一个原则：在“ID”字符串后加上一个标识资源类型的字母。
>
> 例如，`IDM_`，M表示这是`Menu`，即菜单资源。其他诸如光标(Cursor)资源，使用 `IDC_`；图标资源(Icon)，使用 `IDI_`。



<br>

## 4.2 添加事件处理程序

📋为菜单项添加事件处理程序

1. 右键【画直线】菜单项，添加事件处理程序

2. 在对话框中，类列表【相应控件】选择 `CMFCPaintView`，消息类型默认选择 `COMMAND`【菜单栏中绝大多数消息都为`COMMAND`，诸如按钮、选项、列表、复选框、单选框等，该消息需要带上ID才能绑定到指定按钮】。

   1. 选择确定后，会在 `MFCPaintView.cpp` 和 `MFCPaintView.h` 中创建相应的成员函数，即事件处理函数；并在 `MFCPaintView.cpp` 中加入消息Map：`ON_COMMAND`。

      ```CPP
      //MFCPaintView.cpp
      BEGIN_MESSAGE_MAP(CMFCPaintView, CView)
      	ON_WM_CONTEXTMENU()
      	ON_WM_RBUTTONUP()
      	ON_WM_LBUTTONDOWN()
      	ON_WM_LBUTTONUP()
      	ON_WM_MOUSEMOVE()
      	ON_WM_CREATE()
      	ON_WM_CHAR()
      	ON_COMMAND(ID_DRAW_LINE, &CMFCPaintView::OnDrawLine)
      END_MESSAGE_MAP()
      ```

      

   2. 在事件处理函数中，打印日志：

      ```cpp
      TRACE("%s(%d):%s\r\n", __FILE__,__LINE__,__FUNCTION__);
      ```

      

3. 添加【测试菜单】菜单项，为其添加四个类列表的事件处理函数，来测试相应优先级【`CMFCPaintView`、`CMFCPaintDoc`、`CMainFrame`、`CMFCPaintApp`】。

> 双击TRACE调试语句的输出，可以跳转到相应的TRACE代码。

> 响应菜单命令顺序：View > Doc > 框架【CMainFrame】 > App【CMFCPaintApp】

<br>

## 4.3 菜单命令路由及其优先级

> 如果对于同一个菜单项，设置了多个事件处理函数，那么他们具有固定的触发顺序。

菜单路由【C++ 继承】

1. 有view和doc，触发了view，但是没有触发doc；
2. 去掉view类的菜单响应函数，打开doc类的响应函数。
3. 去掉doc类的菜单响应函数，打开框架类的响应函数。
4. 去掉框架类的菜单响应函数，打开app类的响应函数。



**小结：**

- 与显示有关的，肯定先是View响应；
- 第二个肯定是Doc，因为它是View的底层数据
- 响应菜单命令顺序：View > Doc > 框架【CMainFrame】 > 【CMFCPaintApp】

<br>



## 4.4 工具栏基本操作

1. 资源视图 --> `Toolbar` --> `IDR_MAINFRAME`， 双击打开工具栏编辑器。

2. 添加：在两个编辑器中绘制新位图，最好对应添加。

   1. `IDR_MAINFRAME`和`IDR_MAINFRAME_256`需要同步添加，其适用于不同的显示模式，256是色彩模式。
   2. 在两个编辑器中添加按钮，绘制位图即可。
   3. 在属性栏修改对应图标的ID和提示。如果是菜单里面有的，可以填入对应的ID；如果是新的，可以仿照菜单处理。

   ![](mfc-4-2.png)

3. 删除刚添加工具按钮：拖出工具栏范围即可【并非右键删除】

<br>

# 五 MFC总体理解

## 5.1 MFC类视图和MFC所有的类

搜索MFC层次图：[传送门](https://learn.microsoft.com/zh-cn/cpp/mfc/hierarchy-chart?view=msvc-170)

【https://learn.microsoft.com/zh-cn/cpp/mfc/hierarchy-chart?view=msvc-170】

> 继承示例：生物 →动物 →人类 →男人类→小男孩类 

> 父类记录公共特征，子类记录与父类的差异

继承的好处：

- 代码重用：通过继承，子类可以直接使用父类的属性和方法，避免了重复编写相同的代码，提高了代码的复用性和开发效率。
- 扩展性：子类可以在继承基础上添加新的属性和方法，从而扩展父类的功能。这使得代码可以更容易地进行修改和扩展，而无需对已有的代码进行大规模的修改。
- 统一和一致性：通过继承，可以创建具有相似行为和特性的类层次结构。这样可以使代码更加一致和易于理解，提高了代码的可维护性和可读性。
- 多态性：继承是实现多态性的基础。多态性允许不同的对象对相同的消息做出不同的响应。通过继承，可以创建不同的子类对象，并对它们使用相同的父类接口，实现多态的效果。

<br>

`CObject` 基类：提供一些公共服务：

1. 支持序列化`CArchive`。以CPoint为例，序列化就是：

   1. 将结构化数据中的x放入前一部分字节，y放入后一部分字节，连同总长度打成包，变成序列【如协议、网络协议，因为一般网络上只能以字节为单位传输】；
   2. 或者将结构化数据按一定的约定转为文本字符串，也叫序列化；【如Json，用于网络传输】
   3. 甚至直接将结构体内存复制过去，其本质也是连续的内存空间，也可以称为序列化。

2. 支持运行时提供类信息，包括该类的类名、父类等。【用于定位运行时错误的位置】

   ```cpp
   static CRuntimeClass* PASCAL _GetBaseClass();
   static CRuntimeClass* PASCAL GetThisClass();
   ```

   

3. 支持动态创建以及支持对象诊断输出

   1. 如MFC的关于按钮，一开始并不会创建，而是点击按钮后动态创建的对话框；不创建就不会占用内存，不会占用资源。
   2. 支持动态创建，一般都需要基类的存在，否则无法实现多态，也就无法动态创建子类。

   ```cpp
   // Diagnostic Support  诊断支持
   virtual void AssertValid() const;  
   virtual void Dump(CDumpContext& dc) const;
   ```

> 此节的内容属于内功，是MFC框架开发团队的全部顶层设计，也不是一般企业和团队能完成的。

<br>



## 5.2 MFC框架理论

### 5.2.1 关键类

> 最关键的四个类：`CWinApp`、`CFrameWnd`、`CView`、`CDocument`。

🔺`CWinApp`：MFC应用程序抽象类，是所有类的核心，统筹全局。

- 作用非常重要，整个程序的启动、初始化以及其他关键类都依附于 `CWinApp`。
- 也正是因为其太重要，故MFC编程几乎不会用到该类，由MFC框架全权封装。
- 管理`Document`模板。
- 可以用于同时联动其他三个关键类。

```cpp
// MFCPaint.h
class CMFCPaintApp : public CWinAppEx{...}
// afxwinappex.h
class CWinAppEx : public CWinApp{...}
```

🔺 `CFrameWnd`：框架窗口，负责创建应用主窗口，包含标题栏、菜单栏、工具栏【上、左、右】、状态栏等。

- 只负责窗口结构，而非内容。比如菜单栏的文字，其实属于Menu。
- 主要目的是限制窗口内的布局。

```cpp
// MainFrm.h: CMainFrame 类的接口
class CMainFrame : public CFrameWndEx{...}
// afxframewndex.h
class CFrameWndEx : public CFrameWnd{...}
```

 🔺`CView`：负责展示应用数据，View其实是一个没有边框的窗口, 客户区

```cpp
// MFCPaintView.h: CMFCPaintView 类的接口
class CMFCPaintView : public CView{...}
```

 🔺`CDocument：负责存储应用数据。`

- 将数据提供给View显示。
- 数据由`CWinApp`管理。`CWinApp` 有`Document`模板，比如单文档模板、多文档模板、网页文档、富文本、交互式等。

```cpp
// MFCPaintDoc.h: CMFCPaintDoc 类的接口
class CMFCPaintDoc : public CDocument{...}
```

<br>

打开类试图，可以看到可见的程序唯一入口类：`CMFCPaintApp`

```cpp
// MFCPaint.h 中需要注意的初始化函数
virtual BOOL InitInstance();


// MFCPaint.cpp 中的实现：CMFCPaintApp 初始化
BOOL CMFCPaintApp::InitInstance()
{
	// 如果一个运行在 Windows XP 上的应用程序清单指定要
	// 使用 ComCtl32.dll 版本 6 或更高版本来启用可视化方式，
	//则需要 InitCommonControlsEx()。  否则，将无法创建窗口。
	INITCOMMONCONTROLSEX InitCtrls;
	InitCtrls.dwSize = sizeof(InitCtrls);
	// 将它设置为包括所有要在应用程序中使用的
	// 公共控件类。
	InitCtrls.dwICC = ICC_WIN95_CLASSES;
	InitCommonControlsEx(&InitCtrls);

	CWinAppEx::InitInstance();

	if (!AfxSocketInit())
	{
		AfxMessageBox(IDP_SOCKETS_INIT_FAILED);
		return FALSE;
	}

	// 初始化 OLE 库
	if (!AfxOleInit())
	{
		AfxMessageBox(IDP_OLE_INIT_FAILED);
		return FALSE;
	}

	AfxEnableControlContainer();

	EnableTaskbarInteraction(FALSE);

	// 使用 RichEdit 控件需要 AfxInitRichEdit2()
	// AfxInitRichEdit2();

	// 标准初始化
	// 如果未使用这些功能并希望减小
	// 最终可执行文件的大小，则应移除下列
	// 不需要的特定初始化例程
	// 更改用于存储设置的注册表项
	// TODO: 应适当修改该字符串，
	// 例如修改为公司或组织名
	SetRegistryKey(_T("应用程序向导生成的本地应用程序"));
	LoadStdProfileSettings(4);  // 加载标准 INI 文件选项(包括 MRU)


	InitContextMenuManager();

	InitKeyboardManager();

	InitTooltipManager();
	CMFCToolTipInfo ttParams;
	ttParams.m_bVislManagerTheme = TRUE;
	theApp.GetTooltipManager()->SetTooltipParams(AFX_TOOLTIP_TYPE_ALL,
		RUNTIME_CLASS(CMFCToolTipCtrl), &ttParams);

	// 注册应用程序的文档模板。  文档模板
	// 将用作文档、框架窗口和视图之间的连接
	CSingleDocTemplate* pDocTemplate;
	pDocTemplate = new CSingleDocTemplate(
		IDR_MAINFRAME,
		RUNTIME_CLASS(CMFCPaintDoc),
		RUNTIME_CLASS(CMainFrame),       // 主 SDI 框架窗口
		RUNTIME_CLASS(CMFCPaintView));
	if (!pDocTemplate)
		return FALSE;
	AddDocTemplate(pDocTemplate);


	// 分析标准 shell 命令、DDE、打开文件操作的命令行
	CCommandLineInfo cmdInfo;
	ParseCommandLine(cmdInfo);



	// 调度在命令行中指定的命令。  如果
	// 用 /RegServer、/Register、/Unregserver 或 /Unregister 启动应用程序，则返回 FALSE。
	if (!ProcessShellCommand(cmdInfo))
		return FALSE;

	// 唯一的一个窗口已初始化，因此显示它并对其进行更新
	m_pMainWnd->ShowWindow(SW_SHOW);
	m_pMainWnd->UpdateWindow();
	return TRUE;
}
```



> 可以看到，第61行至68行，开始注册应用程序的文档模板，将用作文档、框架窗口和视图之间的连接。

<br>

### 5.2.2 关键类之间的关系

深究 `CWinApp`，其继承自一个线程类。其实，应用程序就是由一个或者多个子线程构成的，其中一个叫做主线程。

```cpp
// MFCPaint.h
class CMFCPaintApp : public CWinAppEx{...}
// afxwinappex.h
class CWinAppEx : public CWinApp{...}
// afxwin.h
class CWinApp : public CWinThread{...}
// 根深的父类依次是：-> CCmdTarget -> CObject
```



🔺`CDocTemplate`、`CDocument`、`CView`、`CFrameWnd`关联关系

- 在 `CWinApp` 类声明中拥有一个对象指针：`CDocManager * m_pDocManager`，存储所有的文档模板。

- `CDocManager`类中【继承自`CObject`】，拥有一个指针链表成员，用来维护一系列的文档模板`DocumentTemplate`。

  ```cpp
  class CDocManager : public CObject{
  //...
  protected:
  	CPtrList m_templateList;
  //...
  }
  ```

  

- 应用程序在 `CMFCPaintApp::InitInstance()` 中以 `AddDocTemplate` 将文档模板【此处为单文档模板 `CSingleDocTemplate`】加入到有`CDocManager`所维护的链表之中。

  ```cpp
  // MFCPaint.cpp 中的实现：CMFCPaintApp 初始化
  BOOL CMFCPaintApp::InitInstance()
  {
  	//...
  	// 注册应用程序的文档模板。  文档模板
  	// 将用作文档、框架窗口和视图之间的连接
  	CSingleDocTemplate* pDocTemplate;
  	pDocTemplate = new CSingleDocTemplate(
  		IDR_MAINFRAME,
  		RUNTIME_CLASS(CMFCPaintDoc),
  		RUNTIME_CLASS(CMainFrame),       // 主 SDI 框架窗口
  		RUNTIME_CLASS(CMFCPaintView));
  	if (!pDocTemplate)
  		return FALSE;
  	AddDocTemplate(pDocTemplate);
      
      //...
  	return TRUE;
  }
  ```

  

- `CDocTemplate`  拥有的成员变量中，分别持有`Document`、`View`、`Frame`的`CRuntimeClass`指针，另有一个成员变量`m_nIDResource`，为资源ID【此处的单文档子类中为`nIDResource`，此处填入的`IDR_MAINFRAME`，来自于资源视图：`Toobar`】，用来表示此`Document`显示时应该采用的UI对象，其实就是菜单。

- 这四份数据在`CMFCPaintApp::InitInstance`函数构造`CDocTemplate`时指定，称为构造函数的参数。

  ```cpp
  class CSingleDocTemplate : public CDocTemplate
  {
  	DECLARE_DYNAMIC(CSingleDocTemplate)
  
  // Constructors
  public:
  	CSingleDocTemplate(UINT nIDResource, 
                         CRuntimeClass* pDocClass,
  					   CRuntimeClass* pFrameClass, 
                         CRuntimeClass* pViewClass);
  	//...
  }
  
  
  
  //// class CDocTemplate creates documents
  class CDocTemplate : public CCmdTarget
  {
  // Constructors
  protected:
  	CDocTemplate(UINT nIDResource, CRuntimeClass* pDocClass,
  		CRuntimeClass* pFrameClass, CRuntimeClass* pViewClass);
  
  //...
  
  protected:
  	UINT m_nIDResource;						// IDR_ for frame/menu/accel as well
  	//...
  	CRuntimeClass* m_pDocClass;				// class for creating new documents
  	CRuntimeClass* m_pFrameClass;			// class for creating new frames
  	CRuntimeClass* m_pViewClass;			// class for creating new views
  	
      CRuntimeClass* m_pOleFrameClass;		// class for creating in-place frame
  	CRuntimeClass* m_pOleViewClass;			// class for creating in-place view
  	CRuntimeClass* m_pPreviewFrameClass;	// class for creating in-place preview frame
  	CRuntimeClass* m_pPreviewViewClass;		// class for creating in-place preview view
  
  	//...
  };
  ```

  

  > `CRuntimeClass`的类，会在运行时保留自己的类名，可以在运行时获得自己的类名，方便调试。
  >
  > 【应用场景】：很多类比有必要在一开始就创建出对象，比如VS2022中的不同视图，有众多可选项，就可以在运行时动态创建，使用同一个基类创建函数 `CreateObject()`，只是参数不同就可以创建出不同视图窗口。
  >
  > 其实，这种设计实现了消息发送和创建过程的解耦。

```cpp
struct CRuntimeClass
{
// Attributes
	LPCSTR m_lpszClassName;	//!!! 记住自己的类名
	int m_nObjectSize;		//！！记住自己的对象大小
	UINT m_wSchema; // schema number of the loaded class
    // 自己的构造函数，抽象函数，必须指向具体实现才能使用
	CObject* (PASCAL* m_pfnCreateObject)(); // NULL => abstract class
    // 基类
#ifdef _AFXDLL
	CRuntimeClass* (PASCAL* m_pfnGetBaseClass)();
#else
	CRuntimeClass* m_pBaseClass;
#endif

// Operations
	CObject* CreateObject();	// 本身的构造函数：自己创建自己
	BOOL IsDerivedFrom(const CRuntimeClass* pBaseClass) const;
	// ...
};
```

  

在`CMFCPaintDoc`类中，其基类`CDocument`有两个成员变量需要注意：

1. 一个成员变量 `CDocTemplate * m_pDocTemplate`，回指其文档模板【DocumentTemplate】；
2. 另外有一个成员变量指针链表`CPtrList m_viewList`，表示它可以同时维护一组`Views`，即<span style="background-color:yellow;">一个文档可以对应多个视图。</span>

```cpp
class CMFCPaintDoc : public CDocument{...}

class CDocument : public CCmdTarget{
    //...
protected:
	//...
	CDocTemplate* m_pDocTemplate;
	CPtrList m_viewList;                // list of views
	//...     
}
```

`CFrameWnd`有一个成员变量`CView * m_pViewActive`，指向当前活动的View，保存目前被激活的视图。

`CView`有一个成员变量`CDocument * m_pDocument`，指向相关的Document，一对一，只能关联一个文档。

  

![docTemp_relation](mfc-5-1.gif)

<br>

> 上面提到的都是几个关键类之间的静态关联，下面MFC启动时的动态关联。

🔺MFC应用启动流程分析：

- 以逐语句的调试方法开启调试，可看到MFC的入口Main函数。
- 跟踪方法：MFC静态库， 调试模式中查看函数栈

![mfc-startup](mfc-5-2.png)

> MFC的框架设计，是非常值得细品设计模式。

<br>

具体流程解析如下：

1. `appmoudul.cpp`中的框架Main函数入口：`_tWinMain()`

   ```cpp
   // appmoudul.cpp
   extern "C" int WINAPI
   _tWinMain(_In_ HINSTANCE hInstance, _In_opt_ HINSTANCE hPrevInstance,
   	_In_ LPTSTR lpCmdLine, _In_ int nCmdShow)
   {
   	// call shared/exported WinMain
   	return AfxWinMain(hInstance, hPrevInstance, lpCmdLine, nCmdShow);
   }
   ```

   

2. 再到系统提供的主函数： `AfxWinMain()`，在其中：

   1. 创建 `pThread`线程
   2. 创建 `pApp`
   3. 初始化创建当前应用程序主线程
   4. 初始化`Application`：`CWinApp::InitApplication()`【初始化`CWinApp`类的一些内部东西，对编程人员来说无意义】
   5. MFC应用程序初始化【pThread指向本项目程序】：`CMFCPaintApp::InitInstance()`
   6. MFC应用线程运行Run，直到结束。

   ```cpp
   // winmain.cpp
   int AFXAPI AfxWinMain(HINSTANCE hInstance, HINSTANCE hPrevInstance,
   	_In_ LPTSTR lpCmdLine, int nCmdShow)
   {
   	ASSERT(hPrevInstance == NULL);
   
   	int nReturnCode = -1;
   	CWinThread* pThread = AfxGetThread();	//【1】
   	CWinApp* pApp = AfxGetApp();			//【2】
   
   	// AFX internal initialization			//【3】
   	if (!AfxWinInit(hInstance, hPrevInstance, lpCmdLine, nCmdShow))
   		goto InitFailure;
   
   	// App global initializations (rare)	//【4】
   	if (pApp != NULL && !pApp->InitApplication())
   		goto InitFailure;
   
   	// Perform specific initializations
   	if (!pThread->InitInstance())			//【5】
   	{
   		if (pThread->m_pMainWnd != NULL)
   		{
   			TRACE(traceAppMsg, 0, "Warning: Destroying non-NULL m_pMainWnd\n");
   			pThread->m_pMainWnd->DestroyWindow();
   		}
   		nReturnCode = pThread->ExitInstance();
   		goto InitFailure;
   	}
   	nReturnCode = pThread->Run();			//【6】
   
   InitFailure:
   #ifdef _DEBUG
   	// Check for missing AfxLockTempMap calls
   	if (AfxGetModuleThreadState()->m_nTempMapLock != 0)
   	{
   		TRACE(traceAppMsg, 0, "Warning: Temp map lock count non-zero (%ld).\n",
   			AfxGetModuleThreadState()->m_nTempMapLock);
   	}
   	AfxLockTempMaps();
   	AfxUnlockTempMaps(-1);
   #endif
   
   	AfxWinTerm();
   	return nReturnCode;
   }
   ```

   

   

在 `CMFCPaintApp::InitInstance()` 中，具体分为一下几步：

1. 调用父类初始化函数：`CWinAppEx::InitInstance()`
2. 套接字初始化
3. 初始化Activity的 OLE 库
4. 初始化Manager的容器
5. 解决win7系统中，Windows底部任务栏互动的重大Bug【Win7下如果有底部任务栏互动的功能，需要设为True】
6. 初始化注册表
7. 加载 `ini` 的配置文件
8. 加载上下文菜单Manager、键盘Manager、工具提示Manager。
9. 添加模板 DocTemplate
10. 如果是命令行启动，需要从此处处理
11. 显示空白窗口
12. 更新窗口：显示View内容
13. 返回系统提供的主函数

```cpp
// MFCPaint.cpp 中的实现：CMFCPaintApp 初始化
BOOL CMFCPaintApp::InitInstance()
{
	// 如果一个运行在 Windows XP 上的应用程序清单指定要
	// 使用 ComCtl32.dll 版本 6 或更高版本来启用可视化方式，
	//则需要 InitCommonControlsEx()。  否则，将无法创建窗口。
	INITCOMMONCONTROLSEX InitCtrls;
	InitCtrls.dwSize = sizeof(InitCtrls);
	// 将它设置为包括所有要在应用程序中使用的
	// 公共控件类。
	InitCtrls.dwICC = ICC_WIN95_CLASSES;
	InitCommonControlsEx(&InitCtrls);

	CWinAppEx::InitInstance();					//【1】

	if (!AfxSocketInit())						//【2】
	{
		AfxMessageBox(IDP_SOCKETS_INIT_FAILED);
		return FALSE;
	}

	// 初始化 OLE 库							 //【3】
	if (!AfxOleInit())
	{
		AfxMessageBox(IDP_OLE_INIT_FAILED);
		return FALSE;
	}

	AfxEnableControlContainer();				//【4】

	EnableTaskbarInteraction(FALSE);			//【5】

	// 使用 RichEdit 控件需要 AfxInitRichEdit2()
	// AfxInitRichEdit2();

	// 标准初始化
	// 如果未使用这些功能并希望减小
	// 最终可执行文件的大小，则应移除下列
	// 不需要的特定初始化例程
	// 更改用于存储设置的注册表项
	// TODO: 应适当修改该字符串，
	// 例如修改为公司或组织名
	SetRegistryKey(_T("应用程序向导生成的本地应用程序"));	//【6】
	LoadStdProfileSettings(4);  // 加载标准 INI 文件选项(包括 MRU)//【7】


	InitContextMenuManager();					//【8】

	InitKeyboardManager();						//【8】

	InitTooltipManager();						//【8】
	CMFCToolTipInfo ttParams;
	ttParams.m_bVislManagerTheme = TRUE;
	theApp.GetTooltipManager()->SetTooltipParams(AFX_TOOLTIP_TYPE_ALL,
		RUNTIME_CLASS(CMFCToolTipCtrl), &ttParams);

	// 注册应用程序的文档模板。  文档模板
	// 将用作文档、框架窗口和视图之间的连接
	CSingleDocTemplate* pDocTemplate;			//【9】
	pDocTemplate = new CSingleDocTemplate(
		IDR_MAINFRAME,
		RUNTIME_CLASS(CMFCPaintDoc),
		RUNTIME_CLASS(CMainFrame),       // 主 SDI 框架窗口
		RUNTIME_CLASS(CMFCPaintView));
	if (!pDocTemplate)
		return FALSE;
	AddDocTemplate(pDocTemplate);


	// 分析标准 shell 命令、DDE、打开文件操作的命令行	//【10】
	CCommandLineInfo cmdInfo;
	ParseCommandLine(cmdInfo);



	// 调度在命令行中指定的命令。  如果
	// 用 /RegServer、/Register、/Unregserver 或 /Unregister 启动应用程序，则返回 FALSE。
	if (!ProcessShellCommand(cmdInfo))
		return FALSE;

	// 唯一的一个窗口已初始化，因此显示它并对其进行更新	
	m_pMainWnd->ShowWindow(SW_SHOW);			//【11】
	m_pMainWnd->UpdateWindow();					//【12】
	return TRUE;								//【13】
}
```



<br>

## 5.3 MFC消息分类

> 打开类视图，右键单击 `CMFCPaintView`，选择属性。在属性界面选择筛选项为消息。
>
> 此时可查看几乎所有的标准消息，当然不包括COMMAND消息。

消息的分类：标准消息、命令消息、通告消息。

- 标准消息：除`WM_COMMAND`之外，所有以`WM_`开头的消息。

  - 从`CWnd`类派生的类都可以接收到这一消息。

- 命令消息：来自菜单或菜单项、加速键或工具栏按钮的消息。这类消息都以`WM_COMMAND`呈现。

  - 在MFC中，通过菜单项的标识（ID）来区分不同的命令消息；
  - 在SDK中，通过消息的`wParam`参数识别。
  - 从CCmdTarget【CWnd的父类】派生的类都可以接收到这一类消息

  ```cpp
  // CMFCPaintView.cpp 中
  
  IMPLEMENT_DYNCREATE(CMFCPaintView, CView)
  
  BEGIN_MESSAGE_MAP(CMFCPaintView, CView)
  	ON_WM_CONTEXTMENU()
  	ON_WM_RBUTTONUP()
  	ON_WM_LBUTTONDOWN()
  	ON_WM_LBUTTONUP()
  	ON_WM_MOUSEMOVE()
  	ON_WM_CREATE()
  	ON_WM_CHAR()
  	ON_COMMAND(ID_DRAW_LINE, &CMFCPaintView::OnDrawLine)//命令消息
  	ON_COMMAND(ID_DRAW_RECT, &CMFCPaintView::OnDrawRect)//命令消息
  END_MESSAGE_MAP()
      
  // 此处的命令消息来自4.2节中的菜单项
  // ON_COMMAND 定义如下：ON_COMMAND(控件id，响应函数)
  #define ON_COMMAND(id, memberFxn) \
  	{ WM_COMMAND, CN_COMMAND, (WORD)id, (WORD)id, AfxSigCmd_v, \
  		static_cast<AFX_PMSG> (memberFxn) },
  ```

  

- 通告消息：由控件产生的消息。例如，保存按钮的单击、列表框的选择等均产生此类消息，为的是向其父窗口【通常是对话框】通知事件的发生。

  - 通告消息更像是需要框架来转发给其他控件，也可以是自己，如禁用本按钮的可用状态。
  - 这类消息也是以WM_COMMAND形式呈现。
  - 从CCmdTarget【CWnd的父类】派生的类都可以接收到这一类消息。

**总结：**

- 凡是从`CWnd`派生的类，既可以接收标准消息，也可以接收命令消息和通告消息。
- 而对于那些从CCmdTarget派生的类，则只能接收命令消息和通告消息，不能接收标准消息。

<br>



# 六 对话框

## 6.1 对话框基本知识

对话框的定位：与用户进行交互的控件，如文件对话框、字体对话框、颜色对话框等，一般用于告示、提醒等。

> Windows应用程序的基本工作流程，是从用户那里得到数据【鼠标点击、键盘输入、文件拖入等】，经过相应的处理之后，再把处理结果输出到屏幕、打印机或者其他输出设备。这就需要用到Windows应用程序的用户接口对话框。

- 对话框就是一个窗口，它不仅可以接收消息，而且还可以被移动和关闭，甚至可以在它的客户区中进行绘图。
- 其相当于一个窗口，在它上面能够拖放各种标准控件和扩展控件。
- 上面的所有控件都是由CWnd类派生来。

 <br>

常见的标准控件：

> MFCApp项目中，打开视图【工具箱】，双击资源视图下的`MFCApp.rc` -> `Dialog` -> `IDD_MFCAPP_DIALOG`，会展示所有可用控件。

| 控件                      | 功能                                                         | 对应的控件类 |
| ------------------------- | ------------------------------------------------------------ | ------------ |
| 静态文本框（Static Text） | 显示文本，一般不能接受输入信息                               | CStatic      |
| 图像控件（Picture）       | 显式位图、图标、方框和图元文件，一般不能接受输入信息         | CStatic      |
| 编辑框（Edit Box）        | 输入并编辑正文，支持单行和多行编辑                           | CEdit        |
| 按钮（Button）            | 响应用户的输入，触发相应的事件                               | CButton      |
| 复选框（Check Box）       | 用作选择标记，可以有选中、未选中和不确定三种状态             | CButton      |
| 单选按钮（Radio Button）  | 用来从两个或多个选项中选中一项                               | CButton      |
| 组框（Group Box）         | 显示正文和方框，主要用来将相关的一些控件(用于共同的目的)组织在一起 | CButton      |
| 列表框（List Box）        | 显示一个列表，用户可以从该列表中选择一项或多项               | CListBox     |
| 组合框（Combo Box）       | 是一个编辑框和一个列表框的组合。分为简易式、下拉式和下拉列表式 | CComboBox    |
| 滚动条（Scroll Bar）      | 主要用来从一个预定义范围值中迅速而有效地选取一个整数值       | CScrollBar   |

> Rich Text 富文本框需要初始化，否则报错。

 <br>

  

## 6.2 对话框的创建和显示

最简单的创建对话框的方式：资源视图下，右键【`MFCApp.rc` -> `Dialog`】，选择插入，会自动插入 `IDD_DIALOG1`。

🔺最常用最推荐的创建方式：资源视图下右键`Dialog`，选择添加资源。在对话框中打开`Dialog`的可选项，进行选择添加。【也可以选择顶层 `Dialog`，直接点新建，即可添加 `IDD_DIALOG1`】

- IDD_DIALOGBAR：对话条
- IDD_FORMVIEW：视图对话框
- IDD_PROPPAGE：不同大小的属性页。

> 一个博主说：我不会告诉你们，他们都是一样的。

- 在属性页，修改对话框ID为`IDD_DLG_XIN`【资源文件的属性有限】

- 点击可视化拖放页面中的Dialog，在属性页中修改相应的属性。以下是需要特别说明的常用属性：

  - Caption：描述文字，标题。
  - ......

- 在Dialog可视化页面右键，选择添加类。类名 `CMyDialog`，基类一般选择 `CDialogEx` 或 `CDialog` 【较简单】，其他的多用于复杂的对话框，默认不勾选自动化支持和Active Accessibility支持。

  - 非正常的创建对话框类的方式就是直接创建相应的头文件和cpp文件，不熟悉MFC的情况下不可尝试。
  - 特别注意：类名 `CMyDialog`，基类需要与 `MFCAppDlg` 类的父类保持一致，否则报错，需将其基类修改正确【此处为 `CDialog`】。

  > `Ex` 意为 `Extent`，扩展。

- 打开 `MFCAppDlg.cpp`，编辑 `CMFCAppDlg::OnBnClickedOk()`：【此处涉及对话框的两种类型：模态/非模态，见`7.2.1`】



<br>

### 6.2.1 模态和非模态对话框

🔺模态【Model】对话框：指当其显示时，程序会暂停执行，直到关闭这个模态对话框后，才能继续执行程序中其它任务。当一个模态对话框打开时，用户只能与该对话框进行交互，而其它用户界面对象接收不到输入信息。

```cpp
//1 在主窗口中创建模态对话框：MFCAppDlg.cpp
CMyDialog dlg;
dlg.DoModal();	//DoMal()会阻塞主窗口程序
```

<br>

🔺非模态【Modeless】对话框：当其显示时，允许执行程序中其它任务，而不用关闭这个对话框，即不阻塞主窗口执行。

```cpp
//2 创建非模态对话框
// 在 MFCAppDlg.h 中声明：CMyDialog dlg;
// 并添加头文件：#include "CMyDialog.h"

//在主窗口中显示非模态对话框即可
dlg.ShowWindow(SW_SHOW);

//此时主窗口正常运行，但点击确定，非模态对话框报错：Debug Assertion Failed【C++ Runtime Library】
//即仅仅是在类声明时定义了变量dlg，但并没有创建真正的窗口
// 故需要在主窗口的初始化函数中，以IDD_DLG_XIN为模板，创建dlg
// 若依然在 CMFCAppDlg::OnBnClickedOk()中，声明dlg变量，且以IDD_DLG_XIN为模板创建dlg
// 此时此非模态窗口只会闪一下消失【消息处理程序结束，dlg被析构】

// CMFCAppDlg 消息处理程序
BOOL CMFCAppDlg::OnInitDialog()
{
	CDialogEx::OnInitDialog();
	// ......
	// TODO: 在此添加额外的初始化代码
	dlg.Create(IDD_DLG_XIN, this);
	return TRUE;  // 除非将焦点设置到控件，否则返回 TRUE
}
```

需要注意的是：

- 与模态对话框的创建不同，非模态对话框的对象应该声明为全局变量，或主窗口类的成员变量【`MFCAppDlg.h`中】。
- `dlg` 变量需要在主窗口初始化函数中创建，并指定创建模板。
- 在MFC中，对资源的操作通常都是通过一个与资源相关的类来完成【对话框资源对应CDialog基类】。

> 非模态对话框用于关于文档、帮助文档等，不会影响主程序的事务；而模态对话框用于设置等会影响主窗口的事务。



 

## 6.3 动态创建按钮

在资源视图下，【`MFCApp.rc` -> `Dialog`】选择 `IDD_DLG_XIN` 进行后续操作。

创建按钮的方法：

1. 直接从右侧工具箱拖拽进对话框【`Delete` 删除】【静态方式添加】
2. 动态添加按钮【动态方式添加】

**按钮的属性：**

- 外观：
	  1. Caption【标题】：，按钮显示文字；可以使用【`按钮内容(&B)`】的方式添加快捷键【Alt + B】。
	  2. Bitmap【位图】：是否有图标位图。
	  3. Client Edge【客户端边缘】：是否有一个凹陷的边框效果，False时为平面图效果。
	  4. Modal Frame【模式框架】：是否有一个突出的边框效果，False时为平面图效果。
	  5. Static Edge【静态边缘】：是否有静态边框，True时为多边框。
	  6. Flat【平面】：是否为平面图。
	  7. Transparent：是否透明。
	  8. Horizontal Align：水平对齐。
	  9. Vertical Align：垂直对齐。
	  10. Icon：是否只显示图标，不显示文本。
	  11. MultiLine【多行】：是否多行文本。
	  12. Notify【通知】：是否主动通知父窗口，此时本按钮获得焦点，如获得焦点后出现蓝色边框。
	  13. Right Align Text【文本右对齐】：是否为右对齐的文本对齐方式。
	  14. Right To Left Reading Order【从右到左阅读顺序】：阅读顺序，只对英文有效果。
- 动态布局：
  - 调整大小类型：当调整对话框大小时，按钮是否随之调整大小，默认无。
  - 移动类型类似。
- 行为：
  - Accept File【接受文件】：是否运行拖入文件。
  - Default Button【默认按钮】：默认被激活，如确认按钮，按回车即可触发消息处理函数。
  - Disabled【已禁用】：是否禁用。
  - HelpID【帮助ID】：是否有对应的帮助文档。
  - Owner Draw【所有者描述】：是否使用手动绘制该按钮。若为False，则采用MFC默认的绘制方式。
  - Visuable【可见】：是否可见，否则为隐藏。
- 杂项：
  - Group【组】：如果使用了Group Box控件，可以设置组。
  - ID：控件ID。
  - Tabstop【制表位】：是否允许Tab键停留。Tab可以切换焦点，False时不参与到切换列表。

![](mfc-6-1.png)

> 点击可预览设计的对话框界面。

双击按钮，为按钮添加消息处理函数。在消息处理函数中，动态添加另一个按钮。

```cpp
// CMyDialog.h中
// CMyDialog 对话框
class CMyDialog : public CDialog
{
// ...
protected:
	CButton m_button;//----需要成员变量------------

protected:
	virtual void DoDataExchange(CDataExchange* pDX);    // DDX/DDV 支持

	DECLARE_MESSAGE_MAP()
public:
	afx_msg void OnBnClickedButton1();	// 静态创建按钮的消息处理函数【声明】
};

// CMyDialog.cpp 中
void CMyDialog::OnBnClickedButton1()
{
	// TODO: 在此添加控件通知处理程序代码
	TRACE("%s(%d):%s\r\n",__FILE__, __LINE__,__FUNCTION__);
	if (m_button.m_hWnd == NULL) {
		// dwStyle可选值：WS为控件通用风格，BS为按钮独有风格【点击查看更多风格】
        //在对话框上动态添加一个按钮
		m_button.Create(_T("动态创建按钮"), BS_DEFPUSHBUTTON | WS_VISIBLE | WS_CHILD, CRect(200, 50, 400, 90), this, 9999);
	}
}
```

对于动态创建按钮，需要注意的是：

- 需要创建类成员变量【不建议使用Public，建议Protected】
- 动态创建按钮的应用场景：根据用户输入改变UI。
- Create函数的参数中，nID不可以重复，否则可能会有未知错误。
- 优势在于：不使用时不会创建，不会占用资源。

```cpp
// CButton类，Create函数原型
class CButton : public CWnd
{
	DECLARE_DYNAMIC(CButton)

// Constructors
public:
	CButton();
	virtual BOOL Create(LPCTSTR lpszCaption, DWORD dwStyle,
				const RECT& rect, CWnd* pParentWnd, UINT nID);
    //...
}
```

 

 <br>

##  6.4 控件的访问 

使用前面的 `MFCApp` 项目，继续在 `IDD_DLG_XIN` 的UI编辑页面添加控件。添加三个编辑框的方式有以下几种：

1. 直接多次拖放；
2. 拖放一次，然后复制粘贴；
3. 按住Ctrl后点击Edit Contrl【编辑框控件】，然后在设计界面多次点击即可【再次点击指针工具取消此状态】。

然后，为三个编辑框更改ID，此处修改为`IDC_EDIT_ONE`，以此类推。

🔺下面的任务是：为三个编辑框设置初始文本。如何访问拖放添加的控件呢？

类试图中选择`CMyDialog`类，在属性页中点击重写，选择重写 `OnInitDialog` 函数。

而编辑框控件编程，有六种实现方式：如下。



### 6.4.1 Get/SetWindowText

`Get/SetWindowText()` 合用，设置和获取编辑框文本。

```cpp
BOOL CMyDialog::OnInitDialog()
{
	CDialog::OnInitDialog();

	// TODO:  在此添加额外的初始化
	CWnd* pEdit01 = GetDlgItem(IDC_EDIT_ONE);
	CWnd* pEdit02 = GetDlgItem(IDC_EDIT_TWO);
	CWnd* pEdit03 = GetDlgItem(IDC_EDIT_THREE);
	// 设置初始文本
	if (pEdit01 !=  NULL)
		pEdit01->SetWindowText(_T("100"));
	if (pEdit02 != NULL)
		pEdit02->SetWindowText(_T("200"));
	if (pEdit03 != NULL)
		pEdit03->SetWindowText(_T("300"));
	// 获取文本
	CString strText;
	pEdit01->GetWindowText(strText);
	return TRUE;  // return TRUE unless you set the focus to a control
	// 异常: OCX 属性页应返回 FALSE
}
```

需要注意的是：

- 初次代码编写时，编辑器会识别不了 `IDD_EDIT_ONE` 等ID，需要一次编译后，才会将ID自动在 `Resource.h` 中生成。
- `SetWindowText` 本身是一个宏，会根据是否为UNICODE，自动切换为`SetWindowTextW`和`SetWindowTextA`。【这种使用宏定义的方式实现跨编码的编程，在Windows中非常常见】

<br>

### 6.4.2 Get/SetDlgItemText

`GetDlgItemText()` 和 `SetDlgItemText()` 合用，设置和获取编辑框文本。

```cpp
BOOL CMyDialog::OnInitDialog()
{
	CDialog::OnInitDialog();

	// TODO:  在此添加额外的初始化
	CWnd* pEdit01 = GetDlgItem(IDC_EDIT_ONE);
	CWnd* pEdit02 = GetDlgItem(IDC_EDIT_TWO);
	CWnd* pEdit03 = GetDlgItem(IDC_EDIT_THREE);
	// 设置初始文本
	CString strText;
	if (pEdit01 != NULL) {
		//pEdit01->SetWindowText(_T("100"));
		SetDlgItemText(IDC_EDIT_ONE, _T("100"));//与上等效
		GetDlgItemText(IDC_EDIT_ONE, strText);
	}
    //...
}
```

 <br>

### 6.4.3 Get/SetDlgItemInt

Get/SetDlgItemInt() 设置整型数据。

```cpp
BOOL CMyDialog::OnInitDialog()
{
	CDialog::OnInitDialog();

	// TODO:  在此添加额外的初始化

	SetDlgItemInt(IDC_EDIT_THREE, 300);
	//是否传输成功的标志；也可以不填，默认0，即不报告是否传输成功
	BOOL isTrans = FALSE;
	UINT ret = GetDlgItemInt(IDC_EDIT_THREE,&isTrans);

	return TRUE;  // return TRUE unless you set the focus to a control
	// 异常: OCX 属性页应返回 FALSE
}
```

<br>

### 6.4.4 控件与数据变量相关联

首先，为控件添加变量：在UI编辑页，右键点击编辑框ONE，选择添加变量。在对话框中选择类别为值，名称为`m_value1`，访问类型public，变量类型为int，添加注释【可选】。点击下一步，设置最大值和最小值，最后点击完成。

上面的操作，等价于以下变化：

- 在 `CMyDialog.h` 中，添加 `public` 的 `int` 型成员变量`m_value1`。

- 在 `CMyDialog.cpp`中，构造函数对成员变量初始化 + 数据转换。

  ```cpp
  CMyDialog::CMyDialog(CWnd* pParent /*=nullptr*/)
  	: CDialog(IDD_DLG_XIN, pParent)
  	, m_value1(0)
  {}
  
  void CMyDialog::DoDataExchange(CDataExchange* pDX)
  {
  	CDialog::DoDataExchange(pDX);
  	DDX_Text(pDX, IDC_EDIT_ONE, m_value1);
  	DDV_MinMaxInt(pDX, m_value1, -9999, 9999);
  }
  ```

同理，继续为其余两个编辑框控件添加变量`m_value2`和`m_value3`，访问类型`public`，变量类型为`int`，为`m_value2`设置最大值和最小值。

双击本UI对话框的确定按钮，为其添加消息处理函数。

```cpp
cBOOL CMyDialog::OnInitDialog()
{
	CDialog::OnInitDialog();

	// TODO:  在此添加额外的初始化
	CWnd* pEdit01 = GetDlgItem(IDC_EDIT_ONE);
	CWnd* pEdit02 = GetDlgItem(IDC_EDIT_TWO);
	
	if (pEdit01 != NULL) {
		SetDlgItemText(IDC_EDIT_ONE, _T("100"));
	}
	if (pEdit02 != NULL) {
		pEdit02->SetWindowText(_T("200"));
	}
	SetDlgItemInt(IDC_EDIT_THREE, 400);
	//是否传输成功的标志；也可以不填，默认0，即不报告是否传输成功
	BOOL isTrans = FALSE;
	UINT ret = GetDlgItemInt(IDC_EDIT_THREE,&isTrans);

	return TRUE;  // return TRUE unless you set the focus to a control
	// 异常: OCX 属性页应返回 FALSE
}


void CMyDialog::OnBnClickedOk()
{
	// TODO: 在此添加控件通知处理程序代码
	/*CDialog::OnOK();*/
	// 此时两个编辑框显示为100、200、400
	UpdateData();		// 更新数据，将控件值填至变量
	m_value3 = m_value1 + m_value2;
	UpdateData(FALSE);	// 更新数据，将变量填至控件值
	//此时,为100\200\300
}
```

<br>

### 6.4.5 控件与控件变量相关联

与上一节类似，为编辑框控件添加控件变量。在对话框中选择类别为控件，名称为`m_edit1/2/3`，访问类型public，变量类型默认为`CEdit`。

上面的操作，等价于以下变化：

- 在 `CMyDialog.h` 中，添加 `public` 的 `CEdit` 型成员变量。

- 在 `CMyDialog.cpp`中，数据转换。

  ```cpp
  void CMyDialog::DoDataExchange(CDataExchange* pDX)
  {
  	CDialog::DoDataExchange(pDX);
  	DDX_Text(pDX, IDC_EDIT_ONE, m_value1);
  	DDV_MinMaxInt(pDX, m_value1, -9999, 9999);
  	DDX_Text(pDX, IDC_EDIT_TWO, m_value2);
  	DDV_MinMaxInt(pDX, m_value2, -9999, 9999);
  	DDX_Text(pDX, IDC_EDIT_THREE, m_value3);
  	DDX_Control(pDX, IDC_EDIT_ONE, m_edit1);
  	DDX_Control(pDX, IDC_EDIT_TWO, m_edit2);
  	DDX_Control(pDX, IDC_EDIT_THREE, m_edit3);
  }
  ```

双击本UI对话框的确定按钮，为其添加消息处理函数。

```cpp
void CMyDialog::OnBnClickedOk()
{
	// TODO: 在此添加控件通知处理程序代码
	/*CDialog::OnOK();*/
	// 此时两个编辑框显示为100、200、400
	CString str1, str2, str3;
	m_edit1.GetWindowText(str1);
	m_edit2.GetWindowText(str2);
	int t = _wtoi(str1) + _wtoi(str2);
	TCHAR buf[32] = _T("");
	//str3 = _itow(t, buf, 10);//十进制,t转为str
	int err_no = _itow_s(t, buf, 10);
	str3 = buf;
	m_edit3.SetWindowText(str3);
	// 此时两个编辑框显示为100、200、300
}
```

<br>

### 6.4.6 SendMessage通用方法

Windows是基于消息的系统，SendMessage是其进程通信的方式之一。本质上，以上的控件访问方式也是对SendMessage的封装。

在 `CMyDialog.cpp` 中，写在Button1的消息处理函数中：

```cpp
void CMyDialog::OnBnClickedButton1()
{
	// TODO: 在此添加控件通知处理程序代码
	TRACE("%s(%d):%s\r\n",__FILE__, __LINE__,__FUNCTION__);
	if (m_button.m_hWnd == NULL) {
		// dwStyle可选值：WS为控件通用风格，BS为按钮独有风格【点击查看更多风格】
		m_button.Create(_T("动态创建按钮"), BS_DEFPUSHBUTTON | WS_VISIBLE | WS_CHILD, CRect(200, 50, 400, 90), this, 9999);
	}

	TCHAR buf[20] = _T("");
	// 系统的全局函数:发消息获取其内容
	::SendMessage(m_edit1.m_hWnd, WM_GETTEXT, 20, (LPARAM)buf);//此时buf=100
	m_edit1.SendMessage(WM_SETTEXT,sizeof(buf),(LPARAM)buf);
	// CMyDialog类的SendMessage,相当于this.SendMessage,该控件发出消息:获取
	SendMessage(WM_GETTEXT, 20, (LPARAM)buf);//此时buf=MyDialog
}
```

注意：

- 此处的 `SendMessage` 函数为Windows系统函数，并非类内函数，故加 `::` 表示全局函数

<br>

## 6.5 对话框伸缩功能的实现

使用前面的 `MFCApp` 项目，继续在 `IDD_DLG_XIN` 的UI编辑页面添加控件。

本节添加两个按钮，Caption标题为方法、缩小，修改ID为 `IDC_BTN_LARGE` 和 `IDC_BTN_SMALL`。然后双击按钮添加消息处理函数。

对于窗口放大缩小，需要在 `CMyDialog.h` 中定义一个范围：

```cpp
// CMyDialog.h
// CMyDialog 对话框
class CMyDialog : public CDialog
{
//......
public:
	//......
	afx_msg void OnBnClickedBtnLarge();
	afx_msg void OnBnClickedBtnSmall();
	CRect m_large;	// 放大范围
	CRect m_small;	// 缩小范围
};
```

> CRect由left、top、right、bottom位置坐标构成一个矩形。
>
> ![](mfc-6-2.png)

然后在 `CMyDialog.cpp` 的 `OnInitDialog()` 中初始化，最后在按钮的消息处理函数中处理。

```cpp
BOOL CMyDialog::OnInitDialog()
{
	CDialog::OnInitDialog();
	// TODO:  在此添加额外的初始化
	// ......
	GetWindowRect(m_large);	// 获取窗口大小
	m_small = m_large;
	m_small.right = m_small.left + m_small.Width() / 2;
	m_small.bottom = m_small.top + m_small.Height() / 2;

	return TRUE;
}


void CMyDialog::OnBnClickedBtnLarge()
{
	// TODO: 在此添加控件通知处理程序代码
	CRect curRect;
	GetWindowRect(curRect);
	SetWindowPos(NULL, curRect.left, curRect.top, m_large.Width(),
		m_large.Height(), SWP_NOMOVE | SWP_NOZORDER);//不移动|不改变窗口顺序
}

void CMyDialog::OnBnClickedBtnSmall()
{
	// TODO: 在此添加控件通知处理程序代码
	CRect curRect;
	GetWindowRect(curRect);
	SetWindowPos(NULL, curRect.left, curRect.top, m_small.Width(),
		m_small.Height(), SWP_NOMOVE | SWP_NOZORDER);//不移动|不改变窗口顺序
}
```

代码重复率太高，下面优化代码，使得一个按钮实现两个功能【对缩小按钮改造】：

```CPP
void CMyDialog::OnBnClickedBtnSmall()
{
	// TODO: 在此添加控件通知处理程序代码
	CRect curRect;
	GetWindowRect(curRect);
	CWnd* pBtn = GetDlgItem(IDC_BTN_SMALL);
	CString title;
	if (pBtn) {
		pBtn->GetWindowText(title);
		if (title == _T("缩小") && !m_small.IsRectEmpty()) {
			pBtn->SetWindowText(_T("放大"));
			SetWindowPos(NULL, curRect.left, curRect.top, m_small.Width(),
				m_small.Height(), SWP_NOMOVE | SWP_NOZORDER);
		}
		else if (title == _T("放大") && !m_large.IsRectEmpty()) {
			pBtn->SetWindowText(_T("缩小"));
			SetWindowPos(NULL, curRect.left, curRect.top, m_large.Width(),
				m_large.Height(), SWP_NOMOVE | SWP_NOZORDER);
		}
	}
}
```

需要注意的点：

- 改变窗口的大小和位置：`Wnd::SetWindowPos()` 从父类继承。

  - 设置全局的置顶显示：

```cpp
SetWindowPos(&wndTopMost, curRect.left, curRect.top, m_large.Width(),
				m_large.Height(), SWP_NOMOVE);
// wndTop：置顶
// wndBottom：移动至最底层【z-order：窗口叠加顺序】
// wndTopMost：总是置顶
// wndNoTopMost
```



- 判断一个矩形是否为空：

  - `IsRectEmpty()`：判断矩形面积是否为空。
  - `IsRectNull()`：判断矩形的四个坐标值是否为0，不关心是否能做为一个矩形。

<br>



 

## 6.6 对话框项目：逃跑按钮

 在上一节 `MFCApp` 的主界面，加入一个按钮，点击后跳转本项目的对话框。

1. 在 `IDD_MFCAPP_DIALOG` 中创建按钮，修改ID为 `IDC_BTN_PROJ`，修改Caption为：逃跑按钮项目，最后双击添加消息处理函数 `OnBnClickedBtnProj()`。

2. 【回顾6.2创建和添加视图和类】新增视图 `IDD_DLG_PROJ`，右键创建类，类名为`CProjectRun`，基类类型为`CDialog`。

3. 本项目为模态对话框，故不需要设置为全局变量来保存窗口。直接在按钮消息处理函数中，打开本项目的对话框即可：

   ```cpp
   void CMFCAppDlg::OnBnClickedBtnProj()
   {
   	// TODO: 在此添加控件通知处理程序代码
   	//创建模态对话框
   	CProjectRun dlgProj;
   	dlgProj.DoModal();
   }
   ```

4. 开始本项目的内容：【基本核心功能】两个按钮，当不捕获到鼠标悬浮事件，则隐藏该按钮，显示另一个按钮。

   - 自定义按钮类，重写Button，但由于与标准类区别不太，故只从 `CButton` 派生即可【单独加一个鼠标移动消息的功能】
   - 定义一个成员，专门用来指向另外一个按钮。

![](mfc-6-3.png)

<br>

具体操作如下：

1. 新建两个按钮，修改UI，修改Caption标题和 ID【`IDC_BTN_LEFT` | `IDC_BTN_RIGHT`】

   - `shift`点选或框选，可选中两个按钮。
   - 再 `Ctrl` 点选可设置为参考控件，从而可以使用右上角的快捷功能：位置对齐、大小相同、高度相同、宽度相同等。

2. 右键为两个按钮添加变量：【只能是控件】，控件名称为`m_btn_left` 和 `m_btn_right`。

3. 设置右侧按钮属性为不可见：Visible。

4. 重载CButton：

   1. 类试图下右键`MFCApp`，选择类向导，左侧点击添加类，下拉菜单选择添加MFC类。
   2. 基类选择`CButton`，类名修改为`CMyButton`，现阶段不需要Activity自动化的内容。
   3. 类试图下选中`CMyButton`，添加 `OnMouseMove` 消息响应函数。
   4. 在`CMyButton.h`中加入一个指针，指向另一个按钮：`CMyButton* m_btn;`

5. 在 `CProjectRun.h` 中引入 `CMyButton` 的头文件，替换成员为 `CMyButton`类型；并在初始化函数中初始化：

   ```cpp
   // CProjectRun.cpp中
   CProjectRun::CProjectRun(CWnd* pParent /*=nullptr*/)
   	: CDialog(IDD_DLG_PROJ, pParent)
   {
   	m_btn_left.m_btn = &m_btn_right;
   	m_btn_right.m_btn = &m_btn_left;
   }
   ```

   

6. 编辑CMybutton下添加的`OnMouseMove` 消息响应函数：

   ```cpp
   void CMyButton::OnMouseMove(UINT nFlags, CPoint point)
   {
   	// TODO: 在此添加消息处理程序代码和/或调用默认值
   	ShowWindow(SW_HIDE);// 隐藏自己
   	if (m_btn != NULL) {
   		m_btn->ShowWindow(SW_SHOW);
   	}
   	CButton::OnMouseMove(nFlags, point);
   }
   ```

   



<br>

🔺着重说明一个错误的实现思路：在 `CProjectRun.cpp` 中添加 `OnMouseMove` 的消息响应函数。

```cpp
void CProjectRun::OnMouseMove(UINT nFlags, CPoint point)
{
    CRect left, right;
    m_btn_left.GetWindowsRect(left);
    if(right.PtInRect(point) == TRUE){	// 如果鼠标坐标在按钮矩形内
        m_btn_left.ShowWindow(SW_HIDE);	// 隐藏左侧按钮
        m_btn_right.ShowWindow(SW_SHOW);// 显示右侧按钮
    }
    Trace("%s(%d)%s:(%d,%d)",__FILE__,__LINE__,__FUNCTION__,point.x, point.y);
    CDialog::OnMouseMove(nFlags, point);
}
```

<span style="background-color:orange;">编译运行发现，鼠标移动会触发消息打印日志，但移动到按钮处停止打印。</span>

<span style="background-color:green;">原因</span>：按钮显示在父窗口之上，鼠标移动的消息会被按钮所捕获，不会传递到父窗口【正在打印日志的窗口】。

<br>



## 6.7 项目：职业调查

MFC对话框定制开发，本项目目标：

1. 第一个对话框实现两个单选：选择语言和企业；
2. 第二个对话框实现复选框：选择多个技能；
3. 第三个对话框下拉菜单选择期望薪资；
4. 第四个对话框给出结果。

![img](mfc-6-6.png)

<br>

### 6.7.1 创建三个属性页

在上一节的项目一样，在 `MFCApp` 的主界面，加入一个按钮，点击后跳转本项目的对话框。

1. 在 `IDD_MFCAPP_DIALOG` 中创建按钮，修改ID为 `IDC_BTN_QUERY`，修改Caption为：职业调查，最后双击添加消息处理函数 `OnBnClickedBtnQuery()`。

2. 在资源视图【`MFCApp.rc` -> `Dialog`】下，新增资源视图，选择`Dialog`下的<span style="background-color:yellow;">属性页</span>`IDD_PROPAGE_SMALL`【`_Large`或`_middle`也行，只是大小的区别】，ID重命名为  `_PROP_01`，Caption为【语言和公司】。

   1. 添加一个GroupBox，修改Caption为【请选择你的语言：】
   2. 添加三个Radio Button，修改Caption为【C++ | JAVA | Python】，修改位置使三个按钮左对齐，垂直均匀分布【右上角处：左对齐工具、垂直工具和纵向工具】，修改相应的ID为`IDC_RADIO_CPP/JAVA/PYTHON`。
   3. 右侧添加一个静态文本Static，修改Caption为【请选择你的公司：】
   4. 下面加入一个List Box，修改ID为`IDC_LIST_COMPANY`。

3. 右键该属性页，选择类向导。类向导对话框中，打开右侧添加类的下拉菜单，选择MFC类，基类选择 `CPropertyPage`，类名命名为`PROP_01`【保证资源识别出的ID与上一步创建的属性页ID一致】。

4. 为该属性页中的控件添加值变量：

   - 为C++ Radio添加变量，类别为值，访问属性public，变量类型BOOL，变量名`m_lang`，变量名注释为【开发语言状态】。

   - 由于为三个Radio添加三个变量的做法，太过低效，故修改 `PROP_01.h` 中的public变量 `m_lang` 为 `m_lang[3]`，并修改 `PROP_01.cpp` 中的两处变量初始化。

     ```cpp
     // PROP_01.cpp 中
     PROP_01::PROP_01()
     	: CPropertyPage(IDD_PROP_01)
     {
     	memset(m_lang, 0, sizeof(m_lang));//此处修改
     }
     
     void PROP_01::DoDataExchange(CDataExchange* pDX)
     {
     	CPropertyPage::DoDataExchange(pDX);
     	DDX_Radio(pDX, IDC_RADIO_CPP, m_lang[0]);//此处修改
     	DDX_Radio(pDX, IDC_RADIO_JAVA, m_lang[1]);//此处修改
     	DDX_Radio(pDX, IDC_RADIO_PYTHON, m_lang[2]);//此处修改
     }
     ```

   

5. 初始化该属性页中的List Box：类视图下选中`PROP_01`，右侧属性页选择重写，重写该属性页的初始化函数 `OnInitDialog`：

   ```cpp
   BOOL PROP_01::OnInitDialog()
   {
   	CPropertyPage::OnInitDialog();
   
   	// TODO:  在此添加额外的初始化
   	// GetDlgItem 返回CWnd指针，而CWnd是CListBox的父类，我们需要更具体子类
   	CListBox* pListBox= (CListBox*)GetDlgItem(IDC_LIST_COMPANY);
   	if (pListBox) {
   		pListBox->AddString(_T("阿里巴巴"));
   		pListBox->AddString(_T("华为"));
   		pListBox->AddString(_T("腾讯"));
   		pListBox->AddString(_T("京东"));
   		pListBox->AddString(_T("百度"));
   	}
   
   	return TRUE;  // return TRUE unless you set the focus to a control
   	// 异常: OCX 属性页应返回 FALSE
   }
   ```

   

![](mfc-6-4.png)

至此，第一个属性页基本添加完毕。下面添加第二个属性页：

1. 在资源视图下添加资源，选择`Dialog`下的<span style="background-color:yellow;">属性页</span>`IDD_PROPAGE_SMALL`，ID重命名为  `_PROP_02`，Caption为【技能选择】。

2. 添加Group Box，，修改Caption为【请选择你的技能：】

3. 添加四个Check Box，进行对齐，修改Caption为【网络编程 | MFC | 操作系统 | 数据结构】

4. 右键选择类向导，添加类选择MFC类，基类选择 `CPropertyPage`，类名命名为`PROP_02`。

5. 为该属性页中的控件添加变量：

   1. 为第一个复选框添加变量，类别为值，访问属性public，变量类型BOOL，变量名`m_skill`，注释为【工作技能】

   2. 由于为四个复选框添加四个变量的做法，太过低效，故修改 `PROP_02.h` 中的public变量 `m_skill` 为 `m_skill[4]`，并修改 `PROP_02.cpp` 中的两处变量初始化。

      ```cpp
      // PROP_02.cpp 中
      PROP_02::PROP_02()
      	: CPropertyPage(IDD_PROP_02)
      {
      	memset(m_skill, 0, sizeof(m_skill));	// 此处修改
      }
      
      void PROP_02::DoDataExchange(CDataExchange* pDX)
      {
      	CPropertyPage::DoDataExchange(pDX);
      	DDX_Check(pDX, IDC_CHECK1, m_skill[0]);// 网络编程
      	DDX_Check(pDX, IDC_CHECK2, m_skill[1]);// MFC
      	DDX_Check(pDX, IDC_CHECK3, m_skill[2]);// 操作系统
      	DDX_Check(pDX, IDC_CHECK4, m_skill[3]);// 数据结构
      }
      ```

      

至此，第二个属性页基本添加完毕。下面添加第三个属性页：

1. 在资源视图下添加资源，选择`Dialog`下的<span style="background-color:yellow;">属性页</span>`IDD_PROPAGE_SMALL`，ID重命名为  `_PROP_03`，Caption为【选择薪资水平】。

2. 添加组合框Combo Box，修改ID为`IDC_COMBO_MONEY`

   - 点击下拉箭头，纵向拉伸组合框大小【下拉菜单出现时，尽可能不因为显示不下而出现滚轮】。

   - 编辑此控件属性【数据Data】，以英文分号间隔，显示为下拉选项。

     ```
     10000元以下;10000~15000元;15000~20000元;20000元以上
     ```

3. 右键选择类向导，添加类选择MFC类，基类选择 `CPropertyPage`，类名命名为`PROP_03`。

4. 为该属性页中的组合框添加变量：类别为值，访问属性public，变量类型BOOL，变量名`m_money`，注释为【薪资范围】。



<br>

### 6.7.2 创建属性表单

本节创建属性表单，整合三个属性页。

1. 类视图，右键 `MFCApp` 选择类向导，添加MFC类。基类选择 `CPropertySheet`，类名`CMyPropSheet`，头文件和cpp文件命名为 `MyPropSheet.h/cpp`。

   - 注意：CMyPropSheet类的构造函数有两个，后续需要分别处理。

2. 在 `MyPropSheet.h` 中加入三个属性页：

   ```cpp
   class CMyPropSheet : public CPropertySheet
   {
   	// ......
   public:
   	PROP_01 m_prop1;
   	PROP_02 m_prop2;
   	PROP_03 m_prop3;
   };
   ```

   

3. 在 `MyPropSheet.cpp` 中的构造函数添加属性页：

   ```cpp
   // 使用【ID、父窗口指针、被选中的属性页】构造
   CMyPropSheet::CMyPropSheet(UINT nIDCaption, CWnd* pParentWnd, UINT iSelectPage)
   	:CPropertySheet(nIDCaption, pParentWnd, iSelectPage)
   {
   	AddPage(&m_prop1);
   	AddPage(&m_prop2);
   	AddPage(&m_prop3);
   }
   // 使用【字符串、父窗口指针、被选中的属性页】构造
   CMyPropSheet::CMyPropSheet(LPCTSTR pszCaption, CWnd* pParentWnd, UINT iSelectPage)
   	:CPropertySheet(pszCaption, pParentWnd, iSelectPage)
   {
   	AddPage(&m_prop1);
   	AddPage(&m_prop2);
   	AddPage(&m_prop3);
   }
   ```

   

4. 回到上一节最开始，在 `MFCAppDlg.cpp` 中编辑消息处理函数 `OnBnClickedBtnQuery()`：

   ```cpp
    void CMFCAppDlg::OnBnClickedBtnQuery()
   {
   	// TODO: 在此添加控件通知处理程序代码
   	CMyPropSheet dlg(_T("职业调查"),this);
   	// 正常的PropertySheet是Tab页的格式，此处使用向导模式：
   	dlg.SetWizardMode();// 开启想到模式
   	dlg.DoModal();
   }
   ```

   

5. 编译运行，点击职业调查后报错如下：

   ![](mfc-6-5.png)

6. `Everything`搜索：`dlgdata.cpp`，使用Notepad++打开，转到269行：Assert断言报错【可能缺少`WS_GROUP`的属性】

   ```cpp
   // 269行
   ASSERT(::GetWindowLong(hWndCtrl, GWL_STYLE) & WS_GROUP);
   ```

   - 查看 `IDD_PROP_01` 中的第一个Radio，其属性中的Group确实是False。
   - 修改第一个Radio的Group属性为True，则三个Radio会合并为一个；同时需要将 `PROP_01.h` 和 `PROP_01.cpp` 中的 `BOOL m_lang[3]` 修改为 `int m_lang`，初始化值为`-1`，即谁也不选。

   ```cpp
   // PROP_01.cpp 中
   PROP_01::PROP_01()
   	: CPropertyPage(IDD_PROP_01)
   	 ,m_lang(-1)
   {
   	//memset(m_lang, 0, sizeof(m_lang));
   }
   
   void PROP_01::DoDataExchange(CDataExchange* pDX)
   {
   	CPropertyPage::DoDataExchange(pDX);
   	DDX_Radio(pDX, IDC_RADIO_CPP, m_lang);
   	//DDX_Radio(pDX, IDC_RADIO_JAVA, m_lang[1]);
   	//DDX_Radio(pDX, IDC_RADIO_PYTHON, m_lang[2]);
   }
   ```

   

7. 解决报错，运行正常，但存在诸多细节需要完善：

   - 无用的底部按钮：帮助。
   - 需要添加或修改的按钮：完成、上一步、下一步。
   - 最后的输出结果等。

<br>

### 6.7.3 向导的创建和使用

> 本节的核心任务就是重写子属性页。

> Wizard：向导。

1. 重写第一个属性页【类试图下点击`PROP_01`，在右侧属性页中选择重写】，重写 `OnSetActive` 函数：

   - 同样，第二个属性页`PROP_02`只需要两个按钮：下一页、返回，隐藏帮助按钮；
   - 第三个属性页`PROP_03`只需要两个按钮：下一页、返回，隐藏帮助按钮。

   ```cpp
   // PROP_01.cpp 中
   BOOL PROP_01::OnSetActive()
   {
   	// TODO: 在此添加专用代码和/或调用基类
   	// 获取该类的父类CWnd，转为CPropertySheet类，然后设置第一页的向导按钮
   	((CPropertySheet*)GetParent())->SetWizardButtons(PSWIZB_NEXT);
   	return CPropertyPage::OnSetActive();
   }
   
   // PROP_02.cpp 中
   BOOL PROP_02::OnSetActive()
   {
   	// TODO: 在此添加专用代码和/或调用基类
   	((CPropertySheet*)GetParent())->SetWizardButtons(PSWIZB_NEXT | PSWIZB_BACK);
   	return CPropertyPage::OnSetActive();
   }
   
   // PROP_03.cpp 中
   BOOL PROP_03::OnSetActive()
   {
   	// TODO: 在此添加专用代码和/或调用基类
   	((CPropertySheet*)GetParent())->SetWizardButtons(PSWIZB_BACK | PSWIZB_FINISH);
   	return CPropertyPage::OnSetActive();
   }
   ```

   

2. 为`PROP_O1`属性页中的List Box添加变量，类别为值，变量名为 `m_company`，public访问，变量类型CString。

3. 点击下一步时，需要对本页的数据进行校验，即为前两个属性页重写 `OnWizardNext()` 函数，为最后一个属性页重写 `OnWizardFinish()` 函数。

   - 注意：获取控件值前，一定要 `UpdateData()`！

   ```cpp
   // PROP_01.cpp 中
   LRESULT PROP_01::OnWizardNext()
   {
   	// TODO: 在此添加专用代码和/或调用基类
   	// 数据校验
   	UpdateData();
   	//TRACE("m_lang:%d\r\n", m_lang);// 0 1 2
   	if (m_lang == -1) {
   		MessageBox(_T("请选择开发语言！"), _T("开发语言未选择"), MB_OK | MB_ICONERROR);
   		return -1;
   	}
   	if (m_company.GetLength() == 0) {
   		MessageBox(_T("请选择企业！"), _T("企业未选择"), MB_OK | MB_ICONERROR);
   		return -1;
   	}
   	return CPropertyPage::OnWizardNext();
   }
   
   // PROP_02.cpp 中
   LRESULT PROP_02::OnWizardNext()
   {
   	// TODO: 在此添加专用代码和/或调用基类
   	UpdateData();
   	bool hasChosen = false;
   
   	for (int i = 0; i < 4; i++) {
   		if (m_skill[i] == TRUE) {
   			hasChosen = true;
   			break;
   		}
   	}
   	if (!hasChosen) {
   		MessageBox(_T("请选择工作技能！"), _T("工作技能未选择"), MB_OK | MB_ICONERROR);
   		return -1;
   	}
   	return CPropertyPage::OnWizardNext();
   }
   
   // PROP_03.cpp 中
   BOOL PROP_03::OnWizardFinish()
   {
   	// TODO: 在此添加专用代码和/或调用基类
   	UpdateData();
   	if (m_money.GetLength() <= 0) {
   		MessageBox(_T("请选择薪资范围！"), _T("薪资范围未选择"), MB_OK | MB_ICONERROR);
   		return -1;
   	}
   	return CPropertyPage::OnWizardFinish();
   }
   ```

   

4. 至此，完成对三个属性页的整合。

<br>

###  6.7.4 属性表单的返回值处理

 在`6.7.1`节中，我们在`MFCAppDialog.cpp` 中创建了本项目按钮的消息处理函数 `OnBnClickedBtnQuery` ，在其中我们创建了一个模态对话框。

如果该对话框最后是由点击【完成按钮】结束的，则需要对返回值做相应处理。

```cpp
void CMFCAppDlg::OnBnClickedBtnQuery()
{
	// TODO: 在此添加控件通知处理程序代码
	CMyPropSheet dlg(_T("职业调查"), this);
	// 正常的PropertySheet是Tab页的格式，此处使用向导模式：
	dlg.SetWizardMode();// 开启想到模式
	//dlg.DoModal();

	// 是否由点击完成结束的对话框
	if (ID_WIZFINISH == dlg.DoModal()) {
		CString strMsg = _T("您的选择是：");
		switch (dlg.m_prop1.m_lang) {
		case 0:
			strMsg += _T("开发语言：C++");
			break;
		case 1:
			strMsg += _T("开发语言：JAVA");
			break;
		case 2:
			strMsg += _T("开发语言：Python");
			break;
		}
		strMsg += _T("您的公司是：" + dlg.m_prop1.m_company);
		strMsg += _T("您的工作技能有：");

		CString strSkill[4] = { _T("网络编程"),_T("MFC"), _T("操作系统"), _T("数据结构") };
		for (int i = 0; i < 4; i++) {
			if (dlg.m_prop2.m_skill[i])
				strMsg += strSkill[i] + _T(",");
		}
		strMsg += _T("您的期望薪资是：" + dlg.m_prop3.m_money);

		MessageBox(strMsg,_T("最终信息"));
	}
}
```

 

### 6.7.5 项目小结

- 由一个按钮触发本对话框项目，即属性表单PropertSheet。
- 属性表单在创建时会不断加入属性页，即PropertyPage。
- 完成属性页向导的操作后，将数据返回给属性表单，再返回给按钮的消息处理函数。

这样的设计保持触发按钮所在类，与属性表单类的独立性，关系清晰，单项依赖。

<br>

🔺需要注意的小技巧：

- 改变控件大小时遇到不能继续变大的情况，可能是因为原对话框的虚线框的大小限制，需要先拉大虚线框范围。
- 在UI编辑页面，点击控件，可以在最下方的状态栏看到控件大小。
- 在UI编辑页面，`Ctrl + D` 显示Tab焦点获取顺序。
- `DoDataExchange`函数的作用：为控件绑定变量和控件。
- `Resource.h` 中定义了资源的ID，及其对应的int值。自增规律是找到最大的数，然后自增。
- 在UI编辑页面，属性工具栏中的最上方，可以切换需要修改属性的控件【此功能用于空间摆放很密集或被遮挡的情况】。
- 在UI编辑页面

<br>

# 七 常用控件

控件交互一般分为两步走：

1. 获得控件：在6.4节中提到过，主要有以下两种。

   - 通过`GetDlgItem(控件ID)`获取对应控件。

     ```cpp
     CListBox* list = (CListBox*)GetDlgItem(IDC_LIST1);
     CComboBox* combox = (CComboBox*)GetDlgItem(IDC_COMBO1);
     ```

     

   - 为控件添加变量：绑定控件和变量。 

     ```cpp
     //注意：使用UpdateData(TRUE|FALSE)同步
     //默认为True，将控件内容同步到变量
     //FALSE，将变量同步回控件
     UpdateData(TRUE|FALSE);
     ```

2.  响应事件，如点击按钮事件。

<br>

## 7.1 标准按钮/复选框/单选框 

本节项目的目标：选择选项，然后点击按钮输出结果。

![img](mfc-7-1.png)

🔺标准开局：在 `MFCApp` 的主界面，加入一个按钮，点击后跳转本项目的对话框。

1. 在 `IDD_MFCAPP_DIALOG` 中创建按钮，修改ID为 `IDC_BTN_BTN`，修改Caption为：单选|复选|标准Button，最后双击添加消息处理函数 `OnBnClickedBtnBtn()`。

2. 新增视图 `IDD_DLG_BTN`，右键创建类，类名为`CExampleBtn`，基类类型为`CDialog`。

3. 打开模态对话框：在按钮消息处理函数中初始化并DoModal。

4. 在 `IDD_DLG_BTN` 中，添加控件：

   1. 添加两个Group Box，Caption命名为：性别、爱好。
   2. 右侧添加一个按钮Button，Caption为结果，ID为`IDC_BTN_RESULT`。
   3. 性别的Group Box中添加两个Radio Button，Caption分别为：男、女，ID为`IDC_RAD_MAN/WOMAN`，进行对齐。
   4. 爱好的Group Box中添加三个Check Box，Caption分别为：足球、篮球、瑜伽，ID为`IDC_CK_FB/BB/YOGA`，进行对齐。
   5. 注意：修改第一个单选按钮的组属性Group为：True。

5. 为控件添加变量：

   1. 只需要为第一个单选按钮添加变量：类型为值，名称为`m_sex`，变量类型int，注释为性别。修改该变量的初始化为`-1`。

   2. 为第一个复选框加添变量：类型为值，名称为`m_fav`，变量类型为BOOL，注释为爱好。

   3. 修改`m_fav`为长度为3的数组，并对初始化做相应修改。

      ```CPP
      // CExampleBtn.cpp: 实现文件
      CExampleBtn::CExampleBtn(CWnd* pParent /*=nullptr*/)
      	: CDialog(IDD_DLG_BTN, pParent)
      	, m_sex(-1)
      	//, m_fav(FALSE)
      {
      	memset(m_fav, 0, sizeof(m_fav));
      }
      
      void CExampleBtn::DoDataExchange(CDataExchange* pDX)
      {
      	CDialog::DoDataExchange(pDX);
      	DDX_Radio(pDX, IDC_RAD_MAN, m_sex);
      	DDX_Check(pDX, IDC_CK_FB, m_fav[0]);
      	DDX_Check(pDX, IDC_CK_BB, m_fav[1]);
      	DDX_Check(pDX, IDC_CK_YOGA, m_fav[2]);
      }
      ```

      

6. 为按钮【结果】双击添加点击事件处理函数：`OnBnClickedBtnResult`。

   ```cpp
   // CExampleBtn.cpp 中
   void CExampleBtn::OnBnClickedBtnResult()
   {
   	UpdateData();
   	if (m_sex == -1) {
   		MessageBox(_T("请选择您的性别！"), _T("性别未选择"), MB_OK | MB_ICONEXCLAMATION);
   		return;
   	}
   	// 常见错误：两个常量字符串不可以相加
   	//CString strMsg = _T("您的性别是：") + ((m_sex == 0) ? _T("男") : _T("女"));
   	CString strMsg = CString(_T("您的性别是：")) + ((m_sex == 0) ? _T("男") : _T("女")) + _T("\n");
   
   	CString strFav = _T("");
   	//方案一：
   #define PLAN1
   #ifdef PLAN1
   	CString favList[3] = { _T("足球"),_T("篮球") ,_T("瑜伽") };
   	for (int i = 0; i < 3; i++) {
   		if (m_fav[i]) {
   			strFav += favList[i] + _T(" ");
   		}
   	}
   #endif // PLAN1
   
   	//方案二：打开解决方案资源管理器，打开 Resource.h,找到 IDC_CK_FB
   	// 可以发现这几个ID都是连续的
   	// #define IDC_CK_FB                       1020
   	// #define IDC_CK_BB                       1021
   	// #define IDC_CK_YOGA                     1022
   #ifdef PLAN2
   	UINT nID = IDC_CK_FB;
   	for (int i = 0; i < 3; i++) {
   		if (m_fav[i]) {
   			CString strName;
   			GetDlgItemText(nID + i, strName);
   			strFav += strName + _T(" ");
   		}
   	}
   #endif // PLAN2
   	
   	if (strFav.GetLength() > 0) {
   		strMsg += _T("您的爱好有：") + strFav;
   	}
   	else {
   		strMsg += _T("您没有任何爱好！");
   	}
   	MessageBox(strMsg, _T("结果展示"));
   }
   ```

   

7. 至此完成本节主要内容。其他内容比如：添加一个测试按钮，ID为 `IDC_BTN_TEST`，设置为禁用状态；添加另一个按钮，名为【启用/禁用测试】，ID为`IDC_BTN_OPEN`，为其添加鼠标点击时的处理函数，使得点击时启用测试按钮。

   ```cpp
   void CExampleBtn::OnBnClickedBtnOpen()
   {
   	CWnd* pCButton = GetDlgItem(IDC_BTN_TEST);
   	if (pCButton->IsWindowEnabled() == FALSE) {
   		pCButton->EnableWindow(TRUE);
   	}
   	else {
   		pCButton->EnableWindow(FALSE);
   	}
   }
   ```



🔺特别注意：

- 不能在Group属性为False的控件上绑定变量，即只能在第一个单选按钮上添加变量。
- 关于禁用Enable等一系列属性，都可以在其父类【如CWnd】中找到相应的方法。



<br>

 

## 7.2 文本编辑框/列表选择框

### 7.2.1 EditControl

> 本节内容关于 `EditControl` 的使用。

 该控件除了一些通用属性【见6.3节】，还拥有一些特殊的属性，比如：

- 行为：
  - 接受文件Accept File：需要实现文件拖拽的消息响应函数。
  - 禁用Disable：不需要用户操作，仅显示文本，不可激活。
  - 多行MultiLine：是否多行显示。
  - 只读ReadOnly：可激活，但编辑行为无效。
  - Visible：隐藏状态下控件几乎不捕获消息。
- 外观：
  - 边框Border：外框实心细线。
  - 水平/垂直滚动条Horizontal/Vertical Scroll。
  - 滚动条位置Left ScrollBar：滚动条出现在左侧还是右侧。
  - 限制大小写LowerCase/UpperCase。
  - 限制只能输入数字Number。


<br>

🔺标准开局：在 `MFCApp` 的主界面，加入一个按钮，点击后跳转本项目的对话框。

1. 在 `IDD_MFCAPP_DIALOG` 中创建按钮，修改ID为 `IDC_BTN_OTHER`，修改Caption为：其他常用控件，最后双击添加消息处理函数 `OnBnClickedBtnOther()`。

2. 新增视图 `IDD_DLG_OTHER`，右键创建类，类名为`CExampleOther`，基类类型为`CDialog`。

3. 打开模态对话框：在按钮消息处理函数中初始化并DoModal。

4. 在 `IDD_DLG_OTHER` 中，添加控件：

   - 添加编辑框EditControl，修改ID为 `IDC_EDIT_TEXT`，添加变量为值类型的`m_strText`。

5. 为`CExampleOther`类重写 `OnInitDialog` 函数：实现编辑框的多行输入。

   - 设置行为中的【想要返回Want Return，即需要关注回车键，而不是默认触发Button OK】为True、多行Multiline为True，外观下的垂直滚动为True

   ```cpp
   BOOL CExampleOther::OnInitDialog()
   {
   	CDialog::OnInitDialog();
   
   	// TODO:  在此添加额外的初始化
   	SetDlgItemText(IDC_EDIT_TEXT, _T("aaaaaaaaa\nbbbbbbb\n"));
   
   	return TRUE;
   }
   ```

   

6. 为编辑框右键添加事件处理程序【类列表中选择该类`CExampleOther`，消息类型可选很多事件处理】：此处演示`EN_CHANGE`，当文本发生改变时修改为大小字母。

   ```cpp
   void CExampleOther::OnEnChangeEditText()
   {
   	// TODO:  如果该控件是 RICHEDIT 控件，它将不
   	// 发送此通知，除非重写 CDialog::OnInitDialog()
   	// 函数并调用 CRichEditCtrl().SetEventMask()，
   	// 同时将 ENM_CHANGE 标志“或”运算到掩码中。
   
   	// TODO:  在此添加控件通知处理程序代码
   	UpdateData();
   	m_strText = m_strText.MakeUpper();
   	UpdateData(FALSE);
   }
   ```

   

7. 一些编辑框的文本操作：

   ```cpp
   // 获得文本框控件 
   CEdit* edit = (CEdit*)GetDlgItem(IDC_EDIT_TEXT);
   // 获取文本
   edit->GetWindowText(text);
   // 设置文本
   edit->SetWindowText(_T(""));
   
   //文本发生改变
   ON_EN_CHANGE(IDC_EDIT_TEXT, &CMFCCommonItemDlg::OnEnChangeEditText)
   ```




<br>

### 7.2.2 ListBox

> 本节内容关于 `ListBox`  的使用。

 该控件除了一些通用属性【见6.3节】，还拥有一些特殊的属性，比如：

- 行为：
  - 只包含字符串Has String：有无其他子项，默认False。
  - 多列MultiColumn：允许多列，需要与Has String配合使用。
  - 无数据No data：不包含数据，空的List Box。
  - 所有者绘制Owner Draw：自定义美化或绘制List Box，需要重写函数。
  - 选择Selection：单选还是多选，或者不允许选择None，或者可扩展Extend，默认单选Single。
  - 排序Sort：自动排序，默认False。因为排序规则实现不统一，故一般不开。
  - 使用Tab键Use Tabstops：在控件内部使用Tab切换。
  - 想要按键输入Want Key Input：如按F跳到F开头的可选项。

🔺标准开局：基于上一节的中的文本编辑对话框，在 `IDD_DLG_OTHER` 的视图中直接添加ListBox控件。

1. 修改控件ID为`IDC_LIST_COMPANY`，选择Selection为Multiple。

2. 右键控件添加变量，类别为控件，变量名为`m_company`，变量类型默认CListBox。

3. 在本UI上添加一个按钮，Caption为ListBox测试，ID为`IDC_BTN_LISTBOX`，并为该按钮添加点击事件处理函数。

   ```cpp
   void CExampleOther::OnBnClickedBtnListbox()
   {
   	// TODO: 在此添加控件通知处理程序代码
   	CString strText;
   	int total = m_company.GetSelCount(); // 获取选中项数量
   	if (total == 0)
   	{
   		MessageBox(_T("未选择任何公司！"));
   		return;
   	}
   	else {
   		strText += _T("你选择了");
   		//strText += _itow(total, NULL, 10);
   		TCHAR buf[32] = _T("");
   		_itow_s(total, buf, 32, 10);//返回值为err num，结果存在buf
   
   		strText += buf;
   		strText += _T("个公司选项\n");
   
   		int* index = new int[total];
   		m_company.GetSelItems(total, index);//获取选中项编号数组
   		CString strTmp;
   		for (int i = 0; i < total; i++)
   		{
   			m_company.GetText(index[i], strTmp);
   			strText += strTmp + _T(" ");
   		}
   		delete[] index;
   		MessageBox(strText);
   
   		// 如果是单选
   		m_company.GetText(m_company.GetCurSel(), strTmp);//GetCurSel返回最后选中的项
   	}
   }
   ```

   

4. 在 `CExampleOther` 类的 `OnInitDialog` 函数中添加一些选项数据：

   ```cpp
   BOOL CExampleOther::OnInitDialog()
   {
   	CDialog::OnInitDialog();
   
   	// TODO:  在此添加额外的初始化
   	SetDlgItemText(IDC_EDIT_TEXT, _T("aaaaaaaaa\nbbbbbbb\n"));
   
   	m_company.AddString(_T("华为"));
   	m_company.AddString(_T("京东"));
   	m_company.AddString(_T("拼多多"));
   	m_company.AddString(_T("比亚迪"));
   
   	return TRUE;
   }
   ```

   

![](mfc-7-2.png)

> 📋如6.4节所述，除了本节中使用变量的形式访问ListBox，还可以使用GetDlgItem直接访问控件，如下所示。

```cpp
// 得到ListBox控件
CListBox* list = (CListBox*)GetDlgItem(IDC_LIST1);
// 添加项
list->AddString(_T("上海"));
list->AddString(_T("深圳"));
list->AddString(_T("北京"));
list->AddString(_T("长沙"));
// 设置当前选择项 
list->SetCurSel(0);

// 获取当前选择项编号
int n = list->GetCurSel();
// 获取当前选择项文本
list->GetText(n, text);
```

<br>

## 7.3 组合框ComboBox

Combobox与ListBox操作基本一致，只是界面显示小有区别。具体来说，区别如下：

- Combobox是下拉列表，默认不展开，只有下拉的时候才能看所有选项。
- Combobox只可以单选，不可以多选。

![下拉列表](mfc-7-3.png)

下面首先介绍一些特殊的属性：

- 行为：
  - Auto：用户在行尾键入字符时，自动将文本滚动到左侧。
  - Data：可以填充数据【如：`A;B;C;`】【旧版本中对 `Type=Simple` 的情况不生效】。
- 外观：
  - OEM Convert：输入的文本会被转为OEM字符集。该字符集一般用不到，对中文支持不友好，故一般False。
  - Type：三个值可选。其中值为【下拉列表Droplist】时，Combo只可选，不可编辑；Dropdown可选可编辑。

🔺标准开局：与ListBox小结一致，直接在 `IDD_DLG_OTHER` 的视图中添加ComboBox控件。

1. 此处添加两个Combobox控件【Type分别为Simple和Dropdown】，修改控件ID为`IDC_COMBO_SIMPLE` 和 `IDC_COMBO_DROPDOWN`。【可为属性Data添加数据：`A;B;C;D;`】

2. 右键控件添加变量，类别为控件，变量名为`m_simple`和`m_droplist`，变量类型默认CComboBox。

3. 在本UI上添加一个按钮，Caption为Combo测试，ID为`IDC_BTN_TEST_DROPLIST`，并为该按钮添加点击事件处理函数。【未知错误：Simple的Combobox打不开下拉菜单】

   ```CPP
   void CExampleOther::OnBnClickedBtnTestDroplist()
   {
   	// combo type = simple
   	int cur = m_simple.GetCurSel();
   	if (cur == -1) {
   		TRACE("%s(%d)：未选中任何列！\n", __FILE__, __LINE__);
   	}
   	else
   	{
   		TRACE("%s(%d)：已选中选中第%d列！\n", __FILE__, __LINE__, cur + 1);
   		CString strTmp;
   		m_simple.GetLBText(cur, strTmp);
   		MessageBox(strTmp);
   	}
   
   	// combo type = droplist
   	cur = m_droplist.GetCurSel();
   	if (cur == -1) {
   		TRACE("%s(%d)：未选中任何列！\n", __FILE__, __LINE__);
   	}
   	else
   	{
   		TRACE("%s(%d)：已选中选中第%d列！\n", __FILE__, __LINE__, cur + 1);
   		CString strTmp;
   		m_droplist.GetLBText(cur, strTmp);
   		MessageBox(strTmp);
   	}
   
   	// combo type = dropdown
   	cur = m_dropdown.GetCurSel();
   	TRACE("%s(%d)：字符数量为%d！\n", __FILE__, __LINE__, m_dropdown.GetWindowTextLength());//获取编辑框中的字符数量
   	if (cur == -1) {
   		if (m_dropdown.GetWindowTextLength() <= 0) {
   			//m_dropdown.GetEditSel();//获取组合框的编辑控件中当前所选内容的起始和结束字符位置。
   			TRACE("%s(%d)：未选中任何列！\n", __FILE__, __LINE__);
   		}
   		else {
   			CString strTmp;
   			m_dropdown.GetWindowText(strTmp);//使用Windows API获取combo编辑框的内容
   			MessageBox(strTmp);
   		}
   	}
   	else
   	{
   		TRACE("%s(%d)：已选中选中第%d列！\n", __FILE__, __LINE__, cur + 1);
   		CString strTmp;
   		m_dropdown.GetLBText(cur, strTmp);//获取选择项的字符串
   		MessageBox(strTmp);
   	}
   }
   ```

   

4. 如果需要在代码中添加选项，与ListBox一致，均为`AddString`函数。

![](mfc-7-4.png)

> 📋如6.4节所述，除了本节中使用变量的形式访问Combobox，还可以使用GetDlgItem直接访问控件，如下所示。

```cpp
// 获取下拉列表控件
CComboBox* list = (CComboBox*)GetDlgItem(IDC_COMBO1);
// 添加选择项
list->AddString(_T("上海"));
list->AddString(_T("深圳"));
list->AddString(_T("北京"));
list->AddString(_T("长沙"));
// 设置当前选择项
list->SetCurSel(3);
// 获取当前选择项
int n = list->GetCurSel();
// 获取当前选择项文本
list->GetLBText(n, text);
```

<br>

## 7.4 Progress

> 注意：Progress进度条需要与定时器联合使用【写在定时器的回调函数中】，也就是说该控件需要代码配合才能生效。

注意Progress的特殊属性【外观】：

- 垂直Vertical：是否为垂直进度条。

- 选取框Marquee：当未知进度的情况下，可以设置该属性为True，且在`OnInitDialog` 函数中做如下的初始化，可以修改为不断滑动的块的形式。

  ```cpp
  m_progress.SetMarquee(TRUE, 10);
  ```

  ![](mfc-7-5.png)

<br>

🔺标准开局：与上一节一致，直接在 `IDD_DLG_OTHER` 的视图中添加Progress Control控件。

1. 修改ID为`IDC_PROGRESS`，添加变量`m_progress`【只能选类别为控件】

2. 在 `CExampleOther` 类的 `OnInitDialog` 函数中初始化该控件的数据：

   - 设置进度条范围：允许`-32768~32767`，但一般从0开始。

   ```cpp
   BOOL CExampleOther::OnInitDialog()
   {
   	CDialog::OnInitDialog();
   
   	// TODO:  在此添加额外的初始化
   	SetDlgItemText(IDC_EDIT_TEXT, _T("aaaaaaaaa\nbbbbbbb\n"));
   
   	m_company.AddString(_T("华为"));
   	m_company.AddString(_T("京东"));
   	m_company.AddString(_T("拼多多"));
   	m_company.AddString(_T("比亚迪"));
   
       // 上面为之前的小节内容
   	m_progress.SetRange(0,10000);//16bit
   	//m_progress.SetRange32(0,10000);//32bit
   	return TRUE;
   }
   ```

   

3. 在本UI上添加一个按钮，Caption为改变进度，ID为`IDC_BTN_PROGRESS`，并为该按钮添加点击事件处理函数。

   ```CPP
   void CExampleOther::OnBnClickedBtnProgress()
   {
   	// 仅简单演示
   	int pos =m_progress.GetPos();
   	m_progress.SetPos(pos + 500);// 差不多点击20次
   }
   ```

   

4. 上一步仅是简单演示，而实际应用中与定时器结合。

   1. 在`CExampleOther.h`头文件新增一个变量表示进度值：`int m_progress_pos;`

   2. 在 `OnInitDialog` 函数中初始化`m_progress_pos`为0。

   3. 新建一个按钮，Caption为【使用定时器演示进度条】，ID为`IDC_BTN_PROGRESS_TIMER`，在该按钮的点击响应函数中开几个定时器：

      ```cpp
      void CExampleOther::OnBnClickedBtnProgressTimer()
      {
      	// 开启一个定时器
      	// 参数：一个事件ID【需要与回调函数中一致】、ms数、回调函数指针【默认进入本对话框的OnTimer处理函数】
      	// 注意：MFC的定时器精度不要小于30ms，MFC的定时器精度很糟糕（MFC消息机制导致的）
      	SetTimer(99, 500, NULL);//该定时器每半秒用m_progress_pos更新一次进度条
      	//SetTimer(77, 1000, NULL);//该定时器每10ms打印日志，验证MFC定时器不能超过30ms
      	SetTimer(88, 100, NULL);//该定时器每100ms触发，修改 m_progress_pos
      }
      ```

      

   4. 类视图点击CExample类，右侧属性工具栏选择添加消息，添加`WM_TIMER`消息，默认将`OnTimer`作为定时器的回调函数。

      ```cpp
      void CExampleOther::OnTimer(UINT_PTR nIDEvent)
      {
      	if (nIDEvent == 99) {
      		// 进度条定时刷新
      		m_progress.SetPos(m_progress_pos);
      	}
      
      	/*
      	// 打印太多会炸，故仅打印30次
      	static int count = 0;
      	if (nIDEvent == 77) {
      		// GetTickCount() 开机之后不断增大的ms值
      		TRACE("%s(%d):%s %d\n", __FILE__, __LINE__, __FUNCTION__, GetTickCount());
      		if (count++ > 3)	KillTimer(77);
      	}
      	*/
      	if (nIDEvent == 88) {
      		TRACE("%s(%d):%s %d\n", __FILE__, __LINE__, __FUNCTION__, GetTickCount());
      		int low, upper;
      		m_progress.GetRange(low, upper);
      		if (m_progress_pos >= upper) {
      			KillTimer(88);
      		}
      		else {
      			m_progress_pos += 100;
      		}
      	}
      
      	CDialog::OnTimer(nIDEvent);
      }
      ```
      
      > 其中，77号定时器每10ms打印日志，验证MFC定时器所设定的间隔`Elapse`不能超过30ms。
      >
      > ① 实验中打印的毫秒值，有相差16ms或15ms等，其来自于1000ms÷15=66.67ms，即屏幕刷新率60HZ左右。
      >
      > ② 当修改77号定时器间隔为100ms时，日志打印间隔基本等于110ms，误差减小。
      >
      > ③ 当修改77号定时器间隔为1000ms时，日志打印间隔等于1000ms，无误差。
      >
      > 实验证明，间隔不要太小，精度不高。

5. 其他例子：

   ```cpp
   // 获取进度条
   CProgressCtrl* prog = (CProgressCtrl*)GetDlgItem(IDC_PROGRESS1);
   // 设置进度条范围
   prog->SetRange(0, 100);
   
   //定义定时器
   SetTimer(TIMER_RPOG, 100, NULL);
   
   //定时器超时响应函数
   void Cdialog2Dlg::OnTimer(UINT_PTR nIDEvent)
    {
      int num, low, high;
      CProgressCtrl* prog;
      switch (nIDEvent)
      {
      case TIMER_RPOG:
        // 得到进度条
        prog = (CProgressCtrl*)GetDlgItem(IDC_PROGRESS1);
        // 获取进度
        num = prog->GetPos();
        // 更新进度
        prog->SetPos(++num);
        // 获取进度条上下限
        prog->GetRange(low, high);
        if (num >= high)
        {
          // 进度条归零
          prog->SetPos(low);
        }
        break;
      default:
        break;
      }
      CDialogEx::OnTimer(nIDEvent);
    }
   ```

   

<br>

> 值得注意的是：如果使用多线程直接修改Progress绑定的变量，可能会发生冲突；但使用多线程修改成员变量时，是不会产生冲突的。故建议使用public成员变量的方式保存进度条的值，留给其他线程访问。



<br>

## 7.5 Picture

`Picture Control` 用于加载`bitmap`图像。

> 该控件的默认ID为`IDC_STATIC`，与静态文本控件 `Static Text` 继承自同一个类CStatic。也就是该父类既可以显示文本，也可以显示图片。

🔺标准开局：与上一节一致，直接在 `IDD_DLG_OTHER` 的视图中添加`Picture Control`控件。

1. 创建Picture Control，选择Type为`icon`【按照需要选择，后续代码中加载icon】，修改ID为`IDC_PIC`。为控件添加变量，变量名为`m_picture`。

2. 修改该对话框【注意是对话框，对应CExample类，而不是控件。否则，需要重载该控件类】的属性【Accept File】为True，并添加 `WM_DROPFILES` 消息处理函数：

   ```cpp
   void CExampleOther::OnDropFiles(HDROP hDropInfo)
   {
   	// 获取拖入文件的数量
   	int count = DragQueryFile(hDropInfo, -1, NULL, 0);
   	// 若支持单个文件，此处可做限制处理。下面实现支持多个文件拖入的较难情况：
   	TCHAR sPath[MAX_PATH];// 宽字节
   	char mbsPath[MAX_PATH * 2];// 多字节
   	for (int i = 0; i < count; i++) {
   		memset(sPath, 0, sizeof(sPath));
   		memset(mbsPath, 0, sizeof(mbsPath));
   		// 获取文件的路径
   		DragQueryFile(hDropInfo, i, sPath, MAX_PATH);
   		// 获取的sPath不能直接使用，需要转为对应的多字节字符序列
   		// wcstombs将宽字符序列转换为对应的多字节字符序列
   		//wcstombs(mbsPath, sPath, MAX_PATH);//std::wcstombs?
   		size_t total;
   		wcstombs_s(&total,mbsPath, sPath, MAX_PATH);
   		// TRACE 只能打印多字节，不能打印宽字节，故需要上面的转换
   		TRACE("%s(%d):%s %s\n", __FILE__, __LINE__, __FUNCTION__, mbsPath);
   		//D:\AboutChase\Art of Programming-2024\MFC\MFCApp\MFCApp\CExampleOther.cpp(246) : atlTraceGeneral - D:\AboutChase\Art of Programming-2024\MFC\MFCApp\MFCApp\CExampleOther.cpp(246):CExampleOther::OnDropFiles D:\AboutChase\Art of Programming-2024\MFC\MFCApp\MFCApp\res\MFCApp.ico
   
   		if (CString(sPath).Find(_T(".ico"))) {
   			// 参数:
   			// 1包含要加载的图像的 DLL 或可执行文件 (.exe) 的模块的句柄
   			// 2要加载的图像。
   			// 3要加载的图像的类型。
   			// 4图标或光标的宽度（以像素为单位）
   			// 5图标或光标的高度（以像素为单位）
   			// 6选项
   			//	LR_LOADFROMFILE(图标、光标或位图文件指定的文件) 加载独立图像
   			//  LR_DEFAULTSIZE 与（0,0）配合使用，显示默认大小
   			HANDLE hIcon = LoadImage(AfxGetInstanceHandle(), sPath, IMAGE_ICON, 0, 0, LR_LOADFROMFILE | LR_DEFAULTSIZE);
   			m_picture.SetIcon((HICON)hIcon);
   		}
   	}
   	CDialog::OnDropFiles(hDropInfo);
   }
   ```

   ![](mfc-7-6.png)

   

<br>

## 7.6 List

`List Control` 区别与 `List Box`，用于加载`bitmap`图像。

该控件的特殊属性：

- 外观
  - 视图View：可选Icon、Small Icon、List、Report【后两个常用】
  - 单选Single Selection：只允许单选【开启时按住Ctrl多选】。
  - 编辑标签Edit Label：是否可以编辑给定的标签项，需要重写相应函数。
  - 始终显示选定内容Always Show Selection：失去焦点时，继续显示灰色底纹【默认False，建议True】。
- 行为
  - 排序Sort：不建议使用。
  - 自动排序：不建议使用



🔺标准开局：与上一节一致，直接在 `IDD_DLG_OTHER` 的视图中添加`List Control`控件。

1. 创建List Control，View选择为`Report`，修改ID为`IDC_LIST_CTRL`。为控件添加变量【只允许控件类型变量】，变量名为`m_list`。

2. 在 `CExampleOther` 类的 `OnInitDialog` 函数中初始化List：

   ```cpp
   BOOL CExampleOther::OnInitDialog()
   {
   	CDialog::OnInitDialog();
   
   	// TODO:  在此添加额外的初始化
   	// ..............
   
   	// List init
   	//int InsertColumn(_In_ int nCol, _In_ const LVCOLUMN* pColumn);
   	//int InsertColumn(_In_ int nCol, _In_z_ LPCTSTR lpszColumnHeading,	_In_ int nFormat = LVCFMT_LEFT, _In_ int nWidth = -1, _In_ int nSubItem = -1);
   	// 第一个重载只有两个参数，没有指定对齐方式和宽度，会导致四个块挤在一起
   	m_list.InsertColumn(0, _T("序号"), LVCFMT_LEFT, 45);
   	m_list.InsertColumn(1, _T("IP"), LVCFMT_LEFT, 110);
   	m_list.InsertColumn(2, _T("ID"), LVCFMT_LEFT, 80);
   	m_list.InsertColumn(3, _T("CHECK"), LVCFMT_LEFT, 150);
   
   	// 设置背景颜色
   	m_list.SetBkColor(RGB(128, 255, 64));
   	// 为List添加扩展风格
   	DWORD extStyle = m_list.GetExtendedStyle();//获取扩展风格
   	extStyle |= LVS_EX_GRIDLINES;// 增加网格线
   	extStyle |= LVS_EX_FULLROWSELECT;// 选中时选中整行
   	m_list.SetExtendedStyle(extStyle);
   	// 为List添加数据:[参数]索引位、值
   	m_list.InsertItem(0, CString("0"));// 设置第0行第一个位置，即序号
   	m_list.SetItemText(0, 1, _T("192.168.100.100"));// IP
   	m_list.SetItemText(0, 2, _T("211798211"));// ID
   	m_list.SetItemText(0, 3, _T("999"));// CHECK
   	// 再添加一条数据
   	m_list.InsertItem(1, CString("1"));// 设置第1行第一个位置，即序号
   	m_list.SetItemText(1, 1, _T("192.168.0.1"));// IP
   	m_list.SetItemText(1, 2, _T("311798333"));// ID
   	m_list.SetItemText(1, 3, _T("888"));// CHECK
   	return TRUE;
   }
   ```

   ![](mfc-7-7.png)

3. 新增一个按钮，ID为 `IDC_BTN_LIST_TEST`，Caption为【List测试】，并为按钮添加点击处理函数，由于获取List中的数据：

   ```cpp
   void CExampleOther::OnBnClickedBtnListTest()
   {
   	// 获取行数
   	int lineCount = m_list.GetItemCount();
   	// 获取列头
   	CHeaderCtrl* pHeader = m_list.GetHeaderCtrl();
   	// 获取列数
   	int columnCount = pHeader->GetItemCount();
   
   	// 获取数据
   	char text[256];
   	size_t total;
   	for (int i = 0; i < lineCount; i++)
   	{
   		for (int j = 0; j < columnCount; j++)
   		{
   			CString tmp = m_list.GetItemText(i, j);
   
   			// TRACE 只能打印多字节，不能打印宽字节，故需要下面的转换
   			memset(text, 0, sizeof(text));
   			wcstombs_s(&total, text, sizeof(text), tmp, tmp.GetLength());
   			TRACE("%s(%d):%s %s\n", __FILE__, __LINE__, __FUNCTION__, text);
   		}
   	}
   	//D:\AboutChase\Art of Programming-2024\MFC\MFCApp\MFCApp\CExampleOther.cpp(329) : atlTraceGeneral - D:\AboutChase\Art of Programming-2024\MFC\MFCApp\MFCApp\CExampleOther.cpp(329):CExampleOther::OnBnClickedBtnListTest 0
   	//.....192.168.100.100
   	//.....211798211
   	//.....999
   	//.....1
   	//.....192.168.0.1
   	//.....311798333
   	//.....888
   }
   ```

   

4. 在第2步中的初始化函数中，做以下修改：

   - 继续追加扩展风格【Checked复选框：`LVS_EX_CHECKBOXES`】，并修改列顺序和数据添加顺序。
   - 另外，也对测试按钮的处理函数做修改，使用 `m_list.GetCheck(i)` 获取复选框状态。
   - 修改List的文本背景颜色：

   ```cpp
   BOOL CExampleOther::OnInitDialog()
   {
   	CDialog::OnInitDialog();
   
   	// ......
       //==============仅修改顺序和宽度==================
   	m_list.InsertColumn(0, _T("CHECK"), LVCFMT_LEFT, 65);
   	m_list.InsertColumn(1, _T("序号"), LVCFMT_LEFT, 45);
   	m_list.InsertColumn(2, _T("IP"), LVCFMT_LEFT, 110);
   	m_list.InsertColumn(3, _T("ID"), LVCFMT_LEFT, 80);
   
   	// 设置背景颜色
   	m_list.SetBkColor(RGB(128, 255, 64));
       // ===============设置文本背景颜色===================
   	m_list.SetTextBkColor(RGB(128, 255, 64));
   	// 为List添加扩展风格
   	DWORD extStyle = m_list.GetExtendedStyle();//获取扩展风格
   	extStyle |= LVS_EX_GRIDLINES;// 增加网格线
   	extStyle |= LVS_EX_FULLROWSELECT;// 选中时选中整行
   	extStyle |= LVS_EX_CHECKBOXES;// checked-------------仅新增一个风格
   	m_list.SetExtendedStyle(extStyle);
   
       // 
   	// 为List添加数据:[参数]索引位、值
   	m_list.InsertItem(0, CString("FALSE"));// 设置第0行第一个位置，即check
   	m_list.SetItemText(0, 1, _T("1"));// 序号
   	m_list.SetItemText(0, 2, _T("192.168.100.100"));// IP
   	m_list.SetItemText(0, 3, _T("211798211"));// ID
   	
   	// 再添加一条数据
   	m_list.InsertItem(1, CString("TRUE"));// 设置第0行第一个位置，即check
   	m_list.SetItemText(1, 1, _T("2"));// 序号
   	m_list.SetItemText(1, 2, _T("192.168.0.1"));// IP
   	m_list.SetItemText(1, 3, _T("311798333"));// ID
   	return TRUE;
   }
   
   void CExampleOther::OnBnClickedBtnListTest()
   {
   	// 获取行数
   	int lineCount = m_list.GetItemCount();
   	// 获取列头
   	CHeaderCtrl* pHeader = m_list.GetHeaderCtrl();
   	// 获取列数
   	int columnCount = pHeader->GetItemCount();
   
   	// 获取数据
   	char text[256];
   	size_t total;
   	for (int i = 0; i < lineCount; i++)
   	{
           // =====================获取复选框状态 ==========================
   		if (m_list.GetCheck(i))
   		{
   			TRACE("%s(%d):%s %s\n", __FILE__, __LINE__, __FUNCTION__, "选中");
   		}
   		else
   		{
   			TRACE("%s(%d):%s %s\n", __FILE__, __LINE__, __FUNCTION__, "未选中");
   		}
   		for (int j = 0; j < columnCount; j++)
   		{
   			CString tmp = m_list.GetItemText(i, j);
   
   			// TRACE 只能打印多字节，不能打印宽字节，故需要下面的转换
   			memset(text, 0, sizeof(text));
   			wcstombs_s(&total, text, sizeof(text), tmp, tmp.GetLength());
   			TRACE("%s(%d):%s %s\n", __FILE__, __LINE__, __FUNCTION__, text);
   		}
   	}
   }
   ```

   ![](mfc-7-8.png)

<br>

## 7.7 Tree

`Tree Control` 为树形控件，该控件的特殊属性如下：

- 外观
  - 视图View：可选Icon、Small Icon、List、Report【后两个常用】
  - 单选Single Selection：只允许单选【开启时按住Ctrl多选】。
  - 编辑标签Edit Label：是否可以编辑给定的标签项，需要重写相应函数。
  - 始终显示选定内容Always Show Selection：失去焦点时，继续显示灰色底纹【默认False，建议True】。
- 行为
  - 排序Sort：不建议使用。
  - 自动排序：不建议使用



🔺标准开局：与上一节一致，直接在 `IDD_DLG_OTHER` 的视图中添加`Tree Control`控件。

1. 创建Tree Control，修改ID为`IDC_TREE`。为控件添加变量【只允许控件类型变量】，变量名为`m_tree`。

2. 在 `CExampleOther` 类的 `OnInitDialog` 函数中初始化Tree：

   ```cpp
   BOOL CExampleOther::OnInitDialog()
   {
   	CDialog::OnInitDialog();
   
   	// ......
   
   	// Tree
   	HTREEITEM hRoot = m_tree.InsertItem(_T("root"));//插入一个根节点，返回根节点
   	HTREEITEM hLeaf1 = m_tree.InsertItem(_T("leaf1"), hRoot);// 指定父节点
   	HTREEITEM hLeaf2 = m_tree.InsertItem(_T("leaf2"), hRoot);
   
   	m_tree.InsertItem(_T("sub"), hLeaf1);
   	m_tree.InsertItem(_T("sub"), hLeaf2);
   
   	return TRUE;
   }
   ```

   > 此时显示的树无修饰，如下图上。

   ![](mfc-7-9.png)

3. 下面考虑修饰树图，做以下工作来导入位图资源。

   1. 将本项目在文件管理器中打开，找到res文件夹，在其中右键创建bmp位图文件，使用画图打开。
   2. 点击文件，打开映像属性【Ctrl + E】，修改图像大小为32x32，画一个五角星，并填充背景；再修改图像大小为64x32，再画一个图标，并填充颜色；再修改图像大小96x32，再画一个图标，并填充颜。至此制作了三个图标，且三个图标合并在一张位图中【🌸如上图下】。
   3. 下面将该位图导入项目：资源视图下右键`MFCApp.rc`，选择添加资源，然后选择位图Bitmap，点击导入，选择刚刚制作的位图，导入即可【▲此处可能出现无法加载的问题，亲测用画图再次打开，另存为再导入】，最后修改该位图资源ID为`IDB_TREE`。

4. 在 `CExampleOther.h` 中引入public的成员变量：`CImageList m_icons;` 【该类能够处理这种将多个图标合并在一张图中的图标形式】。

5. 在 `CExampleOther` 类的 `OnInitDialog` 函数中初始化 `m_icons`，并将图标设置进Tree：

   ```cpp
   BOOL CExampleOther::OnInitDialog()
   {
   	CDialog::OnInitDialog();
   
   	// TODO:  在此添加额外的初始化
   	SetDlgItemText(IDC_EDIT_TEXT, _T("aaaaaaaaa\nbbbbbbb\n"));
       
   	// ......
   
   //#define NO_ICON
   #ifdef NO_ICON
   	// Tree ：无图标版本
   	HTREEITEM hRoot = m_tree.InsertItem(_T("root"));//插入一个根节点，返回根节点
   	HTREEITEM hLeaf1 = m_tree.InsertItem(_T("leaf1"), hRoot);// 指定父节点
   	HTREEITEM hLeaf2 = m_tree.InsertItem(_T("leaf2"), hRoot);
   
   	m_tree.InsertItem(_T("sub"), hLeaf1);
   	m_tree.InsertItem(_T("sub"), hLeaf2);
   #endif // NO_ICON
   
   #ifndef NO_ICON
   	// Tree ：有图标版本
   	// 加载Tree的图标
   	m_icons.Create(IDB_TREE, 32, 3, 0);// 资源、宽度、个数、mask
   	m_tree.SetImageList(&m_icons, TVSIL_NORMAL);// 大图标的格式
   
   	// InsertItem重载版本的参数：文字、未选择时的图标、选中时的图标
   	HTREEITEM hRoot = m_tree.InsertItem(_T("root"), 0, 1);//插入一个根节点，返回根节点
   	HTREEITEM hLeaf1 = m_tree.InsertItem(_T("leaf1"), 2, 1, hRoot);// 指定父节点
   	HTREEITEM hLeaf2 = m_tree.InsertItem(_T("leaf2"), 2, 1, hRoot);
   
   	m_tree.InsertItem(_T("sub1"), 2, 1, hLeaf1);
   	m_tree.InsertItem(_T("sub2"), 2, 1, hLeaf2);
   #endif // !NO_ICON
   
   	return TRUE;
   }
   ```

   ![](mfc-7-10.png)

6. 为树节点添加事件处理程序：双击事件 `NM_DBLCLK`

   1. 右键Tree控件选择添加事件处理程序，类选择`CExampleOther`，消息类型选择`NM_DBLCLK`，点击确定。

   2. 编辑处理函数：双击节点时，打印节点文本。

      ```cpp
      void CExampleOther::OnNMDblclkTree(NMHDR* pNMHDR, LRESULT* pResult)
      {
      	// TODO: 在此添加控件通知处理程序代码
      	UINT count = m_tree.GetSelectedCount();
      	if (count > 0)
      	{
      		HTREEITEM hSelect = m_tree.GetSelectedItem();
      		CString strText = m_tree.GetItemText(hSelect);
      		// 转化为多字节以便Trace
      		char sText[256] = "";
      		memset(sText, 0, sizeof(sText));
      		size_t total;
      		wcstombs_s(&total, sText,sizeof(sText), strText, strText.GetLength());
      		TRACE("%s(%d):%s %s\n", __FILE__, __LINE__, __FUNCTION__, sText);
      	}
      	// 默认
      	*pResult = 0;
      }
      ```

      

7. 至此，简单的控件到此结束。

<br>

## 7.8 小结

需要再次注意的点：

- TRACE不支持宽字节字符集【如`WCHAR`】，只支持多字符集【如`""`、`char[]`】，故需要`wcstombs_s`函数来转换字符集。

