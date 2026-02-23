---
title: CPP入门级项目
date: 2025-03-28 12:09:07
urlname: cpp-project-first
tags:
  - Qt
  - Linux
  - 操作系统与框架
  - MFC
categories: C++开发
description: C++的入门项目
draft: false
---



# 〇 目录

- 入门级项目：群聊室 ChatApp【实现消息广播和文件多线程传输】
- 远控项目
<br>
# 一、ChatApp项目



## 3 解决的难题

### 3.1 Linux编译时缺失pthread头文件

🔺方法 1：通过项目属性配置（适用于非CMake项目）

1. 打开项目属性
   - 右键点击项目 -> 属性
   - 或菜单栏：项目 -> <项目名> 属性
2. 修改编译选项
   - 导航到：配置属性 -> C/C++ -> 命令行
   - 在 其他选项 中添加：`-pthread`
3. 修改链接器选项
   - 导航到：配置属性 -> 链接器 -> 命令行
   - 在 其他选项 中添加：`-pthread`
4. 保存并重新生成
   - 点击 应用 -> 确定
   - 菜单栏：生成 -> 重新生成解决方案

------

🔺方法 2：通过 CMakeLists.txt 配置（适用于CMake项目）

如果项目使用 CMake，直接修改 `CMakeLists.txt`：

```cmake
# 在 add_executable 之后添加以下内容
find_package(Threads REQUIRED)
target_link_libraries(你的可执行目标名 PRIVATE Threads::Threads)

# 示例：
add_executable(MyApp main.cpp)
find_package(Threads REQUIRED)
target_link_libraries(MyApp PRIVATE Threads::Threads)  # 自动处理 -pthread
```



<br>

### 3.2 添加多线程时的Lambda函数问题

在 C++ 的多线程编程中，`lambda` 捕获的栈内存指针（如 `buffer`）会随着主线程的继续执行而失效。当工作线程访问这些指针时，会导致 **悬垂指针** 和 **类型不匹配** 问题。以下是具体原因：

1. **生命周期问题**
   - `buffer` 是栈分配的临时数组，主线程继续运行后会被覆盖
   - `flagPtr` 是 `buffer` 的指针，随 `buffer` 失效变为无效指针
2. **类型严格性**
   - 系统调用（如 `write`）需要 `void*`，但 `buffer` 是 `char*`（需显式转换）
   - 线程间传递数据时需处理 `const` 正确性



**解决方案：** 通过 **数据深拷贝** 和 **显式类型管理** 解决该问题。以下是分步骤修改方案：

#### 3.2.1 数据拷贝到堆内存

修改文件上传处理分支，将必要数据拷贝到独立内存块：

```cpp
else if (strncmp(prefix_file, buffer, strlen(prefix_file)) == 0) {
    // ... [原文件名处理逻辑]

    // 深拷贝关键数据
    size_t data_len = str_len - len_pf - len_fn;
    char* heap_buffer = new char[data_len];
    memcpy(heap_buffer, buffer + len_pf + len_fn, data_len);

    // 捕获拷贝后的数据（值捕获）
    pool.enqueue([client_copy, fileName, heap_buffer, data_len, &fileManage]() {
        // 使用堆内存数据
        std::ofstream file(fileName, std::ios::binary);
        file.write(heap_buffer, data_len);
        delete[] heap_buffer; // 必须释放内存
        
        // ... [后续处理]
    });
}
```

#### 3.2.2 显式类型转换

在需要 `void*` 的地方使用 `reinterpret_cast`：

```cpp
// 修改文件下载发送逻辑
send(client_copy, reinterpret_cast<void*>(buffer), bytesRead, 0);
```

#### 3.2.3 处理 flagPtr 问题

将指针偏移转换为数值存储：

```cpp
// 在捕获前计算偏移量
size_t flag_offset = flagPtr - buffer;

pool.enqueue([client_copy, flag_offset, buffer_len = str_len]() {
    // 根据偏移重建指针（需确保 buffer 已拷贝到堆）
    char* flag_in_thread = heap_buffer + flag_offset;
```

<br>





<br>

# 二 远控项目笔记

> MFC项目
>
> 相关技术：网络编程【仅网络套接字，如网线和Wifi连接，而不考虑USB、串口通信、卫星通信、CAN总线通信】

## 0 准备工作

### 0.1 关于Git

1. 此处使用了一个款名为小乌龟Git的可视化工具来进行版本控制【[链接](https://tortoisegit.org/download/)】。
2. 设置 Visual Studio 2019 的 git 插件在 vs2019 中，找到工具→选项→源代码管理，设置进行版本控制的Git工具。
3. 在远程仓库创建项目，下载到本地。

### 0.2 项目创建

1. 在本地的VS2022中创建项目【Windows桌面向导】，项目名为`ReomoteCtrl`，其项目路径为本地`git`仓库的路径，不勾选【解决方案与项目放在同一目录】，后选择控制台应用程序和MFC标头【此时创建的是一个服务端项目】

2. 在同一个解决方案中添加新项目【MFC应用，名为`RemoteClient`】，应用类型为基于对话框，选用在静态库中适用MFC【诸多静态库被包含在项目中，便以迁移运行】；用户界面功能选择中，选择最小化框、最大化框、系统、关于，并填写对话框标题为 **远程控制客户端**；高级功能中无需打印预览；生成的类基于`Dlg`。

   > 小插曲： 使用`Visual Studio Installer` 添加扩展，**「使用 C++ 的桌面开发」**，右侧会自动勾选关联的 **MFC 和 ATL 支持**（如 `MFC for v143 Build Tools (x86 & x64)`）

### 0.3 需求分析

被控端作为Server，控制端作为客户端

1. 文件需求：
	   - 观察文件
	   - 打开文件
	   - 下载文件
	   - 删除文件
2. 观察需求：
	   - 远程监控
3. 操控需求：
	   - 鼠标操作
	   - 锁机/解锁



### 0.4 技术分析

1. 服务器
	   - 网络编程【需要验证可靠性，故使用TCP】
	   - 文件处理
	   - 鼠标处理
	   - 图像处理
2. 客户端
	   - 网络编程
	   - MFC编程
	   - 图像处理



### 0.5 开发计划

1. 进度可控性【从难的开始做，先做服务器】
2. 方便对接【先做服务器，便于客户端调试】
3. 可行性评估，提早暴露风险

服务器的开发计划：

1. socket【bind、listen、accept、read、write、close】【Windows下的socket开发稍有不同，如需要套接字环境初始化】

   1. 封装`CServerSocket`类，相应文件名为 `ServerSocket.h` 与 `ServerSocket.cpp`

      > 这是Win标准库中的常用写法；内联是类实现放置在头文件中，故不需要。
      >
      > 如果在头文件中使用 `extern` 写一个供外部使用的全局变量，其初始化过程在main函数之前！因此，那是的环境是单进程，不需要锁机制，不会有冲突。

2. 详见项目文档《远程控制》



<br>

## 1 服务器开发中的问题

### 1.1 语法相关问题

#### 1.1.1 类静态变量与单例模式

**问题1：**使用类向导创建类时，【内联】的含义是只创建 `.h` 头文件。

> 本项目中相应的类中有静态变量，内联后不容易声明，故不适用内联。
>
> 下面代码中的 `server` 可在引入 `ServerSocket.h` 后直接使用。

```cpp
// ServerSocket.h 中
class CServerSocket
{
public:
private:
	CServerSocket()	{}
	~CServerSocket() {}
};
// 示例：定义一个可以在外部使用的全局变量
// 如果在头文件中使用 `extern` 写一个供外部使用的全局变量，其初始化过程在main函数之前！
extern CServerSocket server; // 外部有一个符号 server 可用

// ServerSocket.cpp 中
#include "pch.h"
#include "ServerSocket.h"
CServerSocket server;
```

- **`pch.h`**：与预编译头机制绑定，用于优化编译速度，是项目中所有源文件的 “必包含” 头文件（在启用预编译头的项目中）。
  - 下方列出的文件仅编译一次，提高了将来生成的生成性能。
- **`framework.h`**：用于统一项目框架配置【此处为MFC】，存放全局定义，提升代码复用性和可维护性，多见于复杂项目。

<br>

**问题2：** 如何实现单例模式？

> 单例模式下，全局只存在一个类实例，是在语法层面上保证的。【规范层面 < 语法层面 < 硬件层面，如Linux随机数服务器】

1. 单例的类中，构造函数和析构函数都必须由类内掌控，故类的构造函数（包括默认构造、赋值构造、自定义构造）和析构函数均为私有函数。
   - 此时，由于构造函数私有化，外部不能够创建该类的实例；
2. 在单例类中引入静态函数，使用静态函数访问类静态变量。
   - 此时，外部可以直接通过类名来调用类静态函数。
   - 注意：类静态函数只能访问类内静态变量。
   
   ```cpp
   static CServerSocket* getInstance()
   {
   	if(m_instance == NULL)
   	{//静态函数没有this指针，所以无法直接访问成员变量
   		m_instance = new CServerSocket();// TODO: delete
   	}
   	return m_instance;
   }
   ```
   
   

<br>

**问题3：**解决静态成员变量`m_instance`报错！

创建单例模式时，静态成员变量 `m_instance` 报错如下。

这种情况是由于**将静态成员变量的定义写在了头文件中，需要对应cpp文件中手动置空**。这样的 `m_instance` 才完全成员一个全局变量。

```cpp
// 错误	LNK2001	无法解析的外部符号 "private: static class CServerSocket * CServerSocket::m_instance" (?m_instance@CServerSocket@@0PEAV1@EA)	
// CServerSocket.cpp 中
CServerSocket* CServerSocket::m_instance = NULL;
```

> 类内的非静态成员变量在构造函数中初始化，而其静态成员变量 <span style="background:#bFFF00;">需要显式初始化 </span>。
>

> 静态成员初始化，运行在main函数之前。

<br>

**问题4：**析构函数未调用的错误！

原因：在问题2中，`m_instance` 静态变量所指的对象是 `new` 出来的。因此，其必须由对应的 `delete` 来释放内存。

解决方法：在 `CServerSocket` 类内定义新类 `CHelper`，在构造函数中初始化 `m_instance`，在析构函数中释放自定义内存。

> `CHelper` 的实例是构造函数构造出来的，析构时自动调用默认析构函数，此时

```cpp
// CServerSocket 类内
class CServerSocket{
    // ...
    class CHelper{
    public:
        CHelper()
        {
            CServerSocket::getInstance(); // static
        }
        ~CHelper()
        {
            CServerSocket::releaseInstance(); // static
        }
    };
    
    static CHelper m_helper;
}

// CServerSocket.cpp 中显示声明，调用 CHelper 的构造函数
CServerSocket::CHelper CServerSocket::m_helper;
```

<br>

#### 1.1.2 `fopen` 与 `fopen_s`

`fopen` 和 `fopen_s` 都是 C/C++ 中用于打开文件的函数，但它们在安全性、参数设计和适用场景上有显著区别。

```c
// fopen（标准 C 函数）
FILE* fopen(const char* filename, const char* mode);
// filename：文件名（路径）
// mode：打开模式（如 "r" 只读、"w" 写入、"a" 追加等）
// 返回值：成功返回 FILE* 指针，失败返回 NULL

// fopen_s（C11 引入的安全版本，微软扩展优先支持）
errno_t fopen_s(FILE** pFile, const char* filename, const char* mode);
// pFile：输出参数，用于存储打开的文件指针（成功时）
// filename：文件名（路径）
// mode：打开模式。
// 返回值：成功返回 0（errno_t 类型），失败返回非零错误码（如 EINVAL 表示参数无效）
```

**核心区别**

| 特性           | `fopen`                                                      | `fopen_s`                                                    |
| -------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| **安全性**     | 较低：若失败返回 `NULL`，若未检查直接使用可能导致空指针 dereference 崩溃。 | 较高：通过输出参数返回文件指针，失败时会清空 `pFile` 避免野指针，且返回错误码明确原因。 |
| **错误处理**   | 失败仅返回 `NULL`，需通过 `errno` 手动查询错误原因（如 `perror`）。 | 失败返回具体错误码（如 `EINVAL` 无效参数、`ENOENT` 文件不存在），无需依赖 `errno`。 |
| **标准兼容性** | C/C++ 标准函数，跨平台（Windows、Linux、macOS 均支持）。     | 属于 C11 标准的 “边界检查接口”（可选实现），但实际中主要被微软 Visual Studio 等编译器支持，跨平台性较差（如 GCC、Clang 通常不支持）。 |
| **参数传递**   | 返回 `FILE*` 指针，需手动判断是否为 `NULL`。                 | 通过 `FILE**` 输出参数传递指针，返回值直接表示成功与否。     |

> `fopen`可能会出现如下的错误情况：文件打开成功，但不可以正常读。如两个文件被两方打开，前者正常打开，后者独占性打开，导致前者无法正常读取。

优先使用 `fopen` 的场景：

- 跨平台开发：需在 Linux、macOS 等非 Windows 平台编译运行的项目（`fopen_s` 并非所有编译器都支持）。

- 遵循 C/C++ 标准：代码需要严格符合 ISO 标准，避免依赖编译器扩展。

- 简单场景：小型程序，可通过显式检查返回值（`if (file == NULL)`）确保安全。

  ```c
  #include <stdio.h>
  #include <errno.h>
  
  int main() {
      FILE* file = fopen("test.txt", "r");
      if (file == NULL) {  // 必须检查返回值
          perror("打开文件失败");  // 通过 perror 打印 errno 对应的错误信息
          return 1;
      }
      // 使用文件...
      fclose(file);
      return 0;
  }
  ```

优先使用 `fopen_s` 的场景：

- Windows 平台开发：尤其是使用 Visual Studio 且开启 “安全开发生命周期（SDL）” 的项目（默认可能禁用 `fopen` 并提示使用 `fopen_s`）。

- 安全性要求高：需要更严格的错误处理，避免因未检查 `NULL` 指针导致的崩溃（如大型项目、系统级程序）。

  ```c
  #include <stdio.h>
  
  int main() {
      FILE* file;
      errno_t err = fopen_s(&file, "test.txt", "r");
      if (err != 0) {  // 直接通过返回值判断
          printf("打开文件失败，错误码：%d\n", err);
          return 1;
      }
      // 使用文件...
      fclose(file);
      return 0;
  }
  ```

**注意事项**

- **Visual Studio 中的警告**：<span style="background:#FFFF00;">在 VS 中使用 `fopen` 可能会触发 `C4996` 警告（提示函数 “不安全”），可通过定义宏 `_CRT_SECURE_NO_WARNINGS` 禁用该警告（不推荐），或改用 `fopen_s`。</span>

  ```cpp
  #pragma warning(disable:4966)  // fopen sprintf strcpy strstr
  ```

  **错误码含义**：`fopen_s` 的非零返回值对应标准错误码（如 `ENOENT` 表示文件不存在），可通过 `strerror(err)` 转换为字符串描述。

- 跨平台兼容方案：若需同时支持两者，可使用条件编译：

  ```c
  #ifdef _MSC_VER  // 仅在 Visual Studio 下使用 fopen_s
      errno_t err = fopen_s(&file, "test.txt", "r");
      if (err != 0) { /* 错误处理 */ }
  #else  // 其他编译器使用 fopen
      FILE* file = fopen("test.txt", "r");
      if (file == NULL) { /* 错误处理 */ }
  #endif
  ```

- 跨平台的另一个方案：<span style="background:#FFFF00;">VS中的项目属性 → C/c++ → 预处理器，在预处理器中添加宏。</span>

  ```cpp
  _CRT_SECURE_NO_WARNINGS;
  ```

  

<br>

#### 1.1.3 头文件中出现函数重名问题与报错

**场景：**头文件`head.h`中定义一个函数，同时实现了它。现`a.cpp`与`b.cpp`同时引用了该头文件，编译生成的函数符号一致，从而导致编译报错出现重名函数。

**解决：**在头文件中定义，在`cpp`文件中实现。

此时，`a.cpp`与`b.cpp`引用该头文件，拿到的都是该函数的定义，而函数实现只有一份。

**注意：**

- 没有实现就不会编译。
- 在C中，头文件会在引用文件中就地展开。如果仅是定义，则不会展开。

<br>

<br>

### 1.2 功能性问题

#### 1.2.0 VS中的小问题

**问题1：**VS2022中的部分警告信息处理方法，同`1.1.2`【远控项目笔记】

<br>

#### 1.2.1 取消程序运行前的CMD窗口弹出

取消程序运行前的CMD窗口弹出：服务端解决方案【右键选择属性】→链接器→所有选项【如以下修改】

- 入口点：`mainCRTStartup`
- 子系统：窗口（`SUBSYSTEM`/`WINDOWS`）

重新生成后不再弹出cmd窗口，运行时可在后台管理器中看到相应的进程（隶属于`Visual Studio`，当其关闭时，`RemoteCtrl.exe` 结束运行）

```cpp
// 上面的属性设置等价与下面的第二种设置方式
#pragma comment( linker, "/subsystem:windows /entry:WinMainCRTStartup" )
#pragma comment( linker, "/subsystem:windows /entry:mainCRTStartup" )
#pragma comment( linker, "/subsystem:console /entry:mainCRTStartup" )
#pragma comment( linker, "/subsystem:console /entry:WinMainCRTStartup" )
```

> 代码配置项与属性设置，这两种方法二者选其一即可。
>

对Windows系统开说，有一个入口函数 `WinMain`，但其实在调用 `WinMain` 之前，先一步调用的是入口函数 `WinMainCRTStartup`（VC系统中，即 `Microsoft Visual C++`）；

而如果连接器设置为第二个，`mainCRTStartup`则会去调用`main`函数。

- 第一种设置针对窗口应用程序的启动，即子系统为窗口系统、入口为窗口入口；
- 第二种针对子系统为窗口系统、入口为命令行；
- 第三种针对控制台程序+命令行入口，即纯后台程序；
- 第四种针对控制台程序+窗口入口，即可以在控制台再次开启窗口。



<br>

#### 1.2.2 编译指令 `#pragma pack`

`#pragma pack(push)` 和 `#pragma pack(1)` 是 C/C++ 中用于控制结构体 / 类成员内存对齐方式的编译指令，常用于需要精确控制内存布局的场景（如网络通信、文件格式解析、硬件交互等）。

1. **`#pragma pack(push)`**
   - 作用：将当前的内存对齐方式（即 “对齐值”）压入编译器的栈中保存，相当于 “存档” 当前的对齐设置。
   - 后续可以通过 `#pragma pack(pop)` 恢复到这个保存的对齐方式，实现局部范围的对齐设置修改。
2. **`#pragma pack(1)`**
   - 作用：将当前的内存对齐值设置为 **1 字节**，即结构体 / 类的成员按 “1 字节对齐” 方式排列，**不进行任何填充（padding）**。
   - 默认情况下，编译器会根据成员类型和平台位数自动设置对齐值（如 4 字节或 8 字节），可能在成员之间插入空白字节以优化访问效率，但会导致结构体总大小变大。

用法示例：

```cpp
#include <iostream>
using namespace std;

// 默认对齐方式（假设为4字节对齐）
struct DefaultStruct {
    char a;   // 占1字节
    int b;    // 按4字节对齐，前面会填充3字节空白
};

// 局部设置1字节对齐
#pragma pack(push)    // 保存当前对齐方式
#pragma pack(1)
struct PackedStruct {
    char a;   // 占1字节
    int b;    // 按1字节对齐，紧跟在a后面，无填充
};
#pragma pack(pop)     // 恢复之前的对齐方式

int main() {
    cout << "默认对齐的结构体大小：" << sizeof(DefaultStruct) << endl;  // 输出 8（1+3填充+4）
    cout << "1字节对齐的结构体大小：" << sizeof(PackedStruct) << endl;   // 输出 5（1+4，无填充）
    return 0;
}
```

适用场景：

- **网络协议解析**：网络传输的数据通常按紧凑格式排列，需要结构体与传输的字节流严格对应，避免因对齐填充导致解析错误。
- **文件格式处理**：读写二进制文件时，结构体需与文件中的字节布局完全一致，1 字节对齐可确保无冗余填充。
- **硬件寄存器映射**：操作硬件设备时，结构体成员需精确对应硬件寄存器的地址偏移，不能有额外填充。

注意事项：

- `#pragma pack` 是编译器相关的指令（Visual Studio、GCC 等均支持，但细节可能有差异），并非 C++ 标准，跨平台时需谨慎。
- 1 字节对齐可能降低内存访问效率（尤其对需要对齐的类型，如 `int`、`double`），因此通常只在必要时局部使用，用完后通过 `#pragma pack(pop)` 恢复默认设置。
- 若需设置其他对齐值（如 2 字节、4 字节），可将 `#pragma pack(1)` 中的 `1` 改为对应数值（如 `#pragma pack(2)`）。

<br>

#### 1.2.3 集成MFC下的添加窗口

本项目其实集成了MFC框架，故可以直接创建对话框等一些可视化控件。

步骤如下：

1. 右键解决方案中 `RemoteCtrl`，选择添加，添加资源。
2. 选择`Dialog`，点击新建。
3. 对 `Dialog` 做一下修改：
   1. 风格 `Style`（外观）：Overlapped
   2. 系统菜单 `System Menu`（外观）：False（取消关闭按钮×）
   3. 外框 Border（外观）：None
   4. 删除确定、取消两个按钮。
   5. 修改ID为：`IDD_DIALOG_INFO`
4. 添加一个静态文本 `Static Text`
   1. 修改描述文字：”请联系管理员进行解锁。“
   2. 可通过Dialog的属性，修改文本字体（二号粗体华文中宋）。
5. 必须有一个类来管理这个资源`Dialog`，故添加类（双击或右键添加类）：
   1. 基类为 `CDialog`，类名为`CLockDialog`
   2. 头文件名和`.cpp`名去掉首字符`C`【`C`开头表示`class`类，`S`开头表示`Struct`，具体文件不用`C`开头】

<br>



<br>

<br>



<br>

<br>



<br>

<br>



<br>



### 1.3 项目性的思考与报错解决方案

#### 1.3.1 数据包设计及经验

> TCP的包数据一般1300字节。

**问题一：**收到一串数据，如何确定是几个包的数据【即数据包的边界问题】？

1. 一般来说，首先预留1~2字节的包头
   - 一般为FFFE/FEFE，数据中包含以上二进制的概率是最低的。
   - 如果在数据包中出现预定包头，即可开始尝试解包。
   - 可能解包失败，原因可能为：①缓冲区中数据残留；②公网下的莫名嗅探数据包；③其他应用的端口误发
2. 其次预留2~4字节指定包的大小，包含从控制命令开始，到和校验结束【2字节的情况下，包最大为64K】；
3. 接下来一般先预留1~2字节用作传输端命令；
4. 之后为真正的数据块；
5. 最后，更高级的设计会保留2字节用于校验【和校验、异或校验、CRC16/32】。
   - 和校验：包头和长度以外的数据全部相加，可能按短整型/长整型加，（可能会溢出）保留对应字节即可


> 包设计之后，开始开发一些功能，此时可以新建分支，来屏蔽一些暂时无法测试的子功能。

<br>

#### 1.3.2 报错：目标句柄无法接收到消息

在“锁定屏幕”命令中，创建一个线程来处理锁定功能，并在其中开启消息循环，直到特定按键才结束消息循环（`while`）。

同样地，在解锁命令中，我们直接给该线程发消息（模拟所需特定按键消息）。但窗口无法接收到消息，原因分析如下：

```cpp
int UnlockMachine()
{
	//dlg.SendMessage(WM_KEYDOWN, 0x41, 0x01E0001);//模拟解锁按键,但此方法不可以
	//::SendMessage(dlg.m_hWnd, WM_KEYDOWN, 0x41, 0x01E0001);//通过全局函数向句柄发消息,但实际未接收到
	PostThreadMessage(threadid, WM_KEYDOWN, 0x41, 0);//向指定线程发消息
	CPacket pack(8, NULL, 0);
	CServerSocket::getInstance()->Send(pack);
	return 0;
```

原因：`LockMachine`中创建线程进行锁定，该线程中自定义消息循环，该线程只能接收到与该线程有关的消息!!!

<br>

#### 1.3.3 报错：任务栏无法恢复

在代码场景中，若先执行 `dlg.DestroyWindow()` 再恢复任务栏（65行），**核心问题并非 “任务栏无法被恢复”，而是 “恢复任务栏的代码可能因线程执行流程被打断、MFC 窗口生命周期异常，导致根本没机会执行”**，或执行后因视觉遮挡 / 系统消息延迟产生 “未恢复” 的错觉。

```cpp
#include "LockInfoDialog.h"
// 由于是命令行项目,无父窗口,故为直接弹出的非模态窗口
CLockInfoDialog dlg;// 显示在最顶层,不能最小化
// 注意：dlg在程序结束时自动析构，但dlg还在被线程使用。因此，程序应该等待线程结束，即dlg失效
unsigned threadid = 0;

unsigned __stdcall threadLockDlg(void* arg)
{//_beginthreadex指定的定义方式,__stdcall为静态函数调用的方式
	TRACE("%s(%d):%d\r\n", __FUNCTION__, __LINE__, GetCurrentThreadId());
	dlg.Create(IDD_DIALOG_INFO, NULL);
	dlg.ShowWindow(SW_SHOW);//非模态
	//遮蔽后台窗口
	CRect rect;
	rect.left = 0;
	rect.top = 0;
	rect.right = GetSystemMetrics(SM_CXFULLSCREEN);//w1 屏幕宽
	rect.bottom = GetSystemMetrics(SM_CYFULLSCREEN);//屏幕高 C_Y FULL SCREEN 
	rect.bottom = LONG(rect.bottom * 1.10); //可能扣除了任务栏的高度, 可适当加一定长度
	TRACE("right = %d bottom = %d\r\n", rect.right, rect.bottom);
	dlg.MoveWindow(rect);//将对话框的大小移动到全屏的状态
	//文本
	CWnd* pText = dlg.GetDlgItem(IDC_STATIC);
	if(pText)
	{
		CRect rtText;
		pText->GetWindowRect(rtText);
		int nWidth = rtText.Width();//w0
		int x = (rect.right - nWidth) / 2;
		int nHeight = rtText.Height();
		int y = (rect.bottom - nHeight) / 2;
		pText->MoveWindow(x, y, rtText.Width(), rtText.Height());
	}
	//窗口置顶
	dlg.SetWindowPos(&dlg.wndTopMost, 0, 0, 0, 0, SWP_NOSIZE | SWP_NOMOVE);
	//限制鼠标功能:仅在对话框范围内不显示鼠标
	ShowCursor(false);
	//隐藏任务栏
	::ShowWindow(::FindWindow(_T("Shell_TrayWnd"), NULL), SW_HIDE);
	//限制鼠标活动范围(因为仅在对话框范围内不显示鼠标)
	dlg.GetWindowRect(rect);
	rect.left = 0;
	rect.top = 0;
	rect.right = 1;
	rect.bottom = 1;
	ClipCursor(rect);
	//以下为自定义的消息循环,若无则不显示对话框[整个MFC都是依赖于消息循环的]
	MSG msg;
	while(GetMessage(&msg, NULL, 0, 0))
	{
		TranslateMessage(&msg);
		DispatchMessage(&msg);
		if(msg.message == WM_KEYDOWN)
		{
			TRACE("msg:%08X wparam:%08x lparam:%08X\r\n", msg.message, msg.wParam, msg.lParam);
			if(msg.wParam == 0x41)
			{//按下a键 退出  ESC（1B)
				break;
			}
		}
	}
	ClipCursor(NULL);
	//恢复鼠标
	ShowCursor(true);
	//恢复任务栏!!!!!!!!!!!!!!!!!!!!!!==============================
	::ShowWindow(::FindWindow(_T("Shell_TrayWnd"), NULL), SW_SHOW);
	dlg.DestroyWindow();//恢复任务栏之后，再销毁dlg窗口????????????????
	_endthreadex(0);//_endthread同步修改
	return 0;
}
```

回顾原代码的**正常执行流程**（关键逻辑链）：

1. 子线程（`threadLockDlg`）创建全屏置顶对话框 `dlg`，隐藏任务栏；
2. 进入自定义消息循环（`while(GetMessage(...))`），仅当按下 `A` 键时 `break` 退出循环；
3. **循环退出后**，才执行清理操作：`ClipCursor(NULL)` → 恢复鼠标 → 恢复任务栏 → 销毁对话框 → `_endthreadex(0)`。

可见：**“恢复任务栏” 和 “销毁对话框” 均属于 “消息循环退出后的清理逻辑”**，且原代码通过顺序设计确保两者都能被执行。若调换顺序，本质是破坏了 “清理逻辑的执行依赖”—— 可能导致 “恢复任务栏” 的代码被跳过。

**若先销毁对话框，导致 “任务栏不恢复” 的 3 个具体原因：**

🔺**原因 1：**恢复任务栏的代码因线程提前终止而 “未执行”

这是最直接、最常见的原因。MFC 非模态对话框的 `DestroyWindow()` 并非单纯销毁窗口，还会触发一系列**窗口生命周期事件**，可能间接导致线程执行流程异常中断：

- `dlg.DestroyWindow()` 会销毁对话框对应的 Windows 窗口句柄（`dlg.m_hWnd`），但 MFC 对话框对象（`dlg`）本身需等待析构（若为栈对象，需等线程函数结束；若为堆对象，需手动 `delete`）。
- 若在 “消息循环未退出” 时提前调用 `dlg.DestroyWindow()`，MFC 内部会处理 `WM_DESTROY`、`WM_NCDESTROY` 等消息，可能触发窗口资源释放逻辑。此时若线程因 MFC 内部状态异常（如 `m_hWnd` 无效后仍尝试处理消息）而**提前崩溃或调用 `_endthreadex` 终止**，则后续的 “恢复任务栏” 代码（在 `DestroyWindow` 之后）根本没机会执行。

```cpp
// 错误顺序：先销毁对话框，再恢复任务栏
dlg.DestroyWindow(); // 销毁窗口后，MFC对象状态异常
_endthreadex(0);     // 若线程此时意外终止（如MFC内部触发）
::ShowWindow(...)    // 这行代码永远不会执行！
```

<br>

**原因 2：**MFC 窗口句柄无效导致后续 API 调用 “隐性失败”

即使线程未提前终止，`dlg.DestroyWindow()` 后仍可能引发后续代码的隐性问题：

- `dlg` 是 MFC 对话框对象，`DestroyWindow()` 后其 `m_hWnd` 会被置为 `NULL`（MFC 内部逻辑）。若后续代码中存在依赖 `dlg.m_hWnd` 的操作（如原代码中 `dlg.GetWindowRect(rect)`），会因句柄无效返回 `FALSE`，但代码未判断返回值，可能导致后续逻辑（如 `ClipCursor`）异常。
- 虽然 “恢复任务栏” 的代码（`FindWindow` + `ShowWindow`）不直接依赖 `dlg`，但 MFC 线程在窗口句柄无效后，其消息队列可能处于不稳定状态 ——`FindWindow` 虽能正常获取任务栏句柄（`Shell_TrayWnd` 是系统固定窗口类名，除非 `explorer.exe` 崩溃，否则不会找不到），但 `::ShowWindow(hTrayWnd, SW_SHOW)` 是**异步 API**，需要系统消息队列处理 `WM_SHOWWINDOW` 消息才能生效。若 MFC 线程消息队列因 `dlg` 销毁而异常，`ShowWindow` 的消息可能无法被系统正常处理，导致任务栏 “看似未恢复”（实际已发送指令，但系统未执行）。

<br>

## 2 客户端开发

### 2.1 网络模块+调试+简单布局

基于服务器开发的分支创建新分支client，并设置`RemoteClient`为启动项。

> 客户端开发思路，一般有两种：
>
> - （追进度）先布局，后核心功能。
> - 本项目采用：先核心功能，后布局。

新建客户端套接字处理类`CClientSocket`，相应的文件为`ClientSocket.h/cpp`。

相对于服务器（被控端）的套接字，有以下异同：

1. 套接字初始化需要服务器IP地址：`bool InitSocket()`，以及相应的连接`connect`流程更改；
2. 发送消息`Send`只需要`m_sock`即可（客户端不需要`m_client`，只需要一个`socket`即可）
3. 新增一个`no_warnning`（属性/C++/ 预处理器：预处理器定义处添加）

> 本项目中，服务端与客户端的连接属于**短连接**，数据交互数据很小。

然后进行服务端与客户端的连接测试：

- 新建一个按钮，修改文本和ID，添加点击事件。
- 右键解决方案，选择设置启动项。选择多个启动项目，设置Client为启动，Ctrl为启动。
- 点击启动，则可以同时启动两个项目。
  - 出现错误：第二次点击连接测试按钮出现连接失败【原因：此时客户端Socket仅在构造函数中初始化了一次，后续关闭连接后没有重新初始化客户端Socket】
  - 注意内存泄漏：未释放的堆内存。【尽量不要用野指针，可以用考虑用 `vector<char>` 来替代】

> 开发过程中，一般通过日志进行确定问题位置，通过断点精确确定问题原因。

> <span style="background:#FFFF00;">MFC调试过程中，`TRACE` 的日志调试有时更有用！</span>

<br>

更新客户端界面布局：

- `IP Control` + Static Text（目标IP地址）

  - ID：IDC_IPADDR_SERV

  - 右键添加变量：类别为值；名称为`m_nPort`，类型为`String`

  - 在 `OnInitDialog` 中初始化`m_nPort`

    ```CPP
    UpdateData();
    m_serv_addr = 0x7F000001;//127.0.0.1 127=7F DWORD 4B
    m_nPort = _T("9527");
    UpdateData(FALSE);
    ```

- `Edit Control` + Static Text（端口）

  - 属性`Number`：True
  - ID：IDC_EDIT_PORT
  - 右键添加变量：类别为值；名称为`m_serv_addr`；类型为`DWORD`

> MFC中，使用`updateDate(BOOL)`函数更新变量值。其中，BOOL为True时，取控件的值为变量赋值；反之，使用变量值为控件赋值。

> 此时出现内存泄漏Bug。通过对比正确值与当前调试值，我们发现是大端小端的编码问题，使用`htonl`将主机字节序转为网络字节序。
>
> ```cpp
> serv_adr.sin_addr.s_addr = inet_addr("127.0.0.1"); // 0x0100007f 正确值
> // serv_adr.sin_addr.s_addr = nIP;//0x7f000001  错误值
> TRACE("addr %08X nIP %08X\r\n", inet_addr("127.0.0.1"), nIP);
> // 修改后
> serv_adr.sin_addr.s_addr = htonl(nIP);  
> ```

> MFC中`UpdateData()`函数：当参数为 `FALSE` 时，表示将成员变量的值更新到对话框的控件中，此时不会进行数据验证，函数通常返回 `TRUE`；默认参数为`TRUE`。

<br>

### 2.2 文件控制

#### 2.2.1 基本实现流程

1. 添加两个`Static Text`，“对方的目录”和“文件”

2. 添加两个按钮，对应上面的文字说明。
   1. “查看文件目录”，`IDC_BTN_FILEINFO`
   
3. 添加 `Group Box`，属性取消Caption

4. 在 `Group Box` 中添加`Tree Control`作为文件树，`IDC_TREE_DIR`
   - 添加变量 `m_Tree`
   - 【美观】属性Always Show Selectic（始终显示所选内容）：True
   - 【美观】属性Has Button（具有按钮）：True
   - 【美观】属性Has Line（具有行）：True
   - 【美观】属性Horizontal Scroll（水平滚动）：True
   - 【跟踪点击】属性Track Select（跟踪选择）：True
   - 【拖放远程文件无意义】属性Disable Drag Drop（禁用拖放）：True
   - 属性（单个展开，仅展开选中项）：True
   - 属性（工具提示）：False
   - 添加事件（右键选择【添加事件处理程序】）
     - 双击事件`NM_DBLCLK`，类列表为`CRemoteClientDlg`，双击向被控端发送目录请求并更新文件目录
     - 单击事件`NM_CLICK`，类列表为`CRemoteClientDlg`，单击向被控端发送目录请求并更新文件目录
   
5. 在 `Group Box` 中添加`List Control`用于显示文件，View属性选择小图标，`IDC_LIST_FILE`
   - 添加变量 `m_List`
   - 【美观】属性Always Show Selectic（始终显示所选内容）：True
   - 【美观】属性View：List
   - 添加事件：
     - 右键单击事件`NM_RCLICK`，类列表为`CRemoteClientDlg`，右键单击文件显示相应的右键菜单（见下一控件6）
   
6. 添加右键菜单资源
   1. 在资源视图中，右键`RemoteClient.rc`选择添加资源，选择Menu，点击添加。
   2. 在可视化资源编辑中，加入文件操作【下载文件、删除文件、打开文件】，并更改属性ID依次为：`ID_DOWNLOAD_FILE`、`ID_DELETE_FILE`、`ID_RUN_FILE`
   3. 更改Menu的属性ID为`IDR_MENU_RCLICK`（资源视图->Menu->选择刚创建的菜单->修改属性）
   4. 添加事件处理
      1. 右键子菜单项（如下载文件），选择添加事件处理程序
      2. 类列表为`CRemoteClientDlg`，消息类型为`COMMAND`
   5. 将文件下载功能，升级为大文件下载功能（多线程）
      - 非多线程的文件下载是阻塞的，当下载大文件时，程序处于运行下载过程，类似于程序卡死状态。
      - 为了解决假卡死状态，加入多线程的文件下载功能。
      - 待升级
   
7. 多线程文件下载
   1. 单线程变多线程
   
   2. 下载过程可视化：
   
      1. 资源视图-`RemoteClient.rc`/`Dialog`-添加资源-直接新增`Dialog`，ID为`IDD_DLG_STATUS`
      2. 删除两个按钮，右键属性做修改
      3. 【关闭对话框右上角的关闭按钮X】属性System Menu：`False`
      4. 【修改描述文字】属性Caption：正在处理...
      5. 对话框中新增一个Edit Control，ID为`IDC_EDIT_INFO`
      6. 【允许编辑框多行】属性MultiLine：`True`
      7. 属性Client Edge：`True`
      8. 属性Read Only： `True`
      9. 在该对话框上添加一个类，类名为`CStatusDlg`，基类为`CDialog`，相应的文件名去掉前缀`C`即可
      10. 在Edit上添加控制变量，类别为控件，名称为`m_info`
      11. 在`RemoteClientDlg.h`中引入该类，声明一个`protected`的变量`m_dlgStatus`
      12. 在`RemoteClientDlg.cpp`中的`OnInitDialog`函数中初始化非模态对话框：`Create`/`ShowWindow`
   
      ![](PROJ2-2-2.png)
   
   3. 此时测试时，发现下载出现一个bug，点击中断对话框中的【**重试**】，使用调试方法【调用堆栈】找到出错位置。
   
      1. 查看调用堆栈，<span style="background:#F7B7C5;">我们发现当调用`SendCommandPacket`函数中的`UpdateData`时，发生错误中断；而在`UpdateData`中，程序进行了一个`AssertValid`的校验，判断是否属于同线程，最终断言失败导致出错。</span>
   
      2. `UpdateData`出错的原因在于：<span style="background:#F7B7C5;">在更新控件数据的时候，要保证控件所在线程与更新控件数据的线程为同一线程，否则会出现操作冲突。具体而言，此时更新控件数据的线程是新创建的线程，并非控件所在线程。</span>
   
      3. <span style="background:#FFFF00;">此bug源于`Windows`系统中所有的窗口都是从某一个线程中派生出来的。</span>【所有`CWnd`都是由`CThreadCmd`派生出来的】
   
      4. 这会导致要使用窗口中的数据时，必须要求是在该线程内使用，而不允许跨线程使用。
   
      5. <span style="background:#8CD790;">解决办法：线程间消息！</span>
   
      6. 在`RemoteClient.h`中自定义消息ID，添加 `pubic` 函数`OnSendPacket`，并将该函数加入`cpp`文件中的消息映射表中。
   
         ```cpp
         //RemoteClientDlg.h 中
         // 头部位置   自定义消息ID
         #define WM_SEND_PACKET (WM_USER + 1)  //发送数据包的消息 ①
         
         // ......
         class CRemoteClientDlg : public CDialogEx
         {
         public:
             afx_msg LRESULT OnSendPacket(WPARAM wParam, LPARAM lParam);//定义自定义消息响应函数 ② 
         }
         ```
   
         ```cpp
         //RemoteClientDlg.cpp 中
         // 消息映射表
         BEGIN_MESSAGE_MAP(CRemoteClientDlg, CDialogEx)
             //......
         	ON_MESSAGE(WM_SEND_PACKET, &CRemoteClientDlg::OnSendPacket) //注册消息③
         END_MESSAGE_MAP()
         
         void CRemoteClientDlg::threadDownFile()
         {
             //......
         	//int ret = SendCommandPacket(4, false, (BYTE*)(LPCSTR)strFile, strFile.GetLength());//strFile只有LPCSTR的转换重载，没有BYTE的重载
         	int ret = SendMessage(WM_SEND_PACKET, 4 << 1 | 0, (LPARAM)(LPCSTR)strFile);//SendMessage(消息，WPARAM, LPARAM) 4 << 1 | 0的定义解释见OnSendPacket
             //......
         }
         
         // OnSendPacket的实现
         LRESULT CRemoteClientDlg::OnSendPacket(WPARAM wParam, LPARAM lParam)
         {//实现消息响应函数④
         	int ret = 0;
         	int cmd = wParam >> 1;
         	switch (cmd) {
         	case 4: {
         		CString strFile = (LPCSTR)lParam;
         		ret = SendCommandPacket(cmd, wParam & 1, (BYTE*)(LPCSTR)strFile, strFile.GetLength());
         	}
         		  break;
         	case 5: {//鼠标操作
         		ret = SendCommandPacket(cmd, wParam & 1, (BYTE*)lParam, sizeof(MOUSEEV));
         	}
         		  break;
         	case 6:
         	case 7:
         	case 8: {
         		ret = SendCommandPacket(cmd, wParam & 1);
         	}
         		  break;
         	default:
         		ret = -1;
         	}
         
         	return ret;
         }
         ```
   
         > C++ 的关于`WPARAM`、`LPARAM`、`LPCSTR`的说明见2.x.2。
   
         > 对于服务端的解锁/锁屏功能，当时`SendMessage`无法解决，只能通过`postThreadMessage`来定向发送。
         >
         > 区别在于，客户端`SendMessage`所在的类是`CWnd`的子函数（MFC编程），此时消息循环是可以确定谁发谁接收。而服务端尝试使用全局函数`SendMessage`来发送消息（Windows API），无法确定接收方。
   
         > 注意此处使用自定义消息的语法，简单总结于2.x.4。
   
      7. ...
   
   4. ...
   
      
   
      

<br>

### 2.3 远程桌面显示

#### 2.3.1 设计与思考

被控端（server） ------- -控制端（Client），被控端截屏并发送至客户端，然后客户端接收并显示。

1. 截屏（完成）
2. 发送与接收（部分未完成）
3. 显示（未完成）

> 下面先实现显示的功能。

> 代码开荒阶段，为保证开发进度，一般从难到易；中期状态在已知可完成的情况下，可以从易到难。

🔺需要注意的坑点：

1. 图片信息不是静态的，而是动态的，是由多张图片构成；而且，图片的终点未知（与用户是否操作有关）。
2. 图片数据不断更新，可能出现`CWnd`与其他线程不兼容，出现`UpdateData`出错的情况。

🔺核心的实现流程分析（分析与软件设计的软实力）：

1. 接收数据：另开线程
   1. 拿到`Packet`解包，恢复为图片；
   2. 缓存图片
2. 更新（`CWnd`线程）：**定时器主动取更新的数据，若有则显示，若没有则等下一次定时器触发。**
3. 显示（`CWnd`线程）：定时器内部的功能函数即可。
   1. 设备上下文`Device Context`（`DC`，`CDC`类实现）：文字、图像、绘制、背景
   2. 此处仅使用`DC`修改`Picture Control`即可，无需`WatchDialog`的DC（可以修改标题等任意该对话框元素）。
   3. 获取`Picture Control`的DC需要在该控件上添加变量。

![](PROJ2-2-3.png)

> 机器性能差导致从图像缓存取数据取慢了，从而导致的丢帧现象为正常现象。允许丢帧也是为保证监控的 **实时性**！

> 服务器发送频率越大，占用带宽越大。一张截图200k，压缩后100k，1s发10张就是1M，必须要针对带宽设计发送频率。

#### 2.3.2 实现

1. 在客户端，新增数据接收线程
   1. 在`RemoteClientDlg.h`中，声明一个`private`的静态线程函数`threadEntryForWatchData`和一个线程启动函数`threadWatchData`。
   2. 在`RemoteClientDlg.h`中，新增`private`的图片缓存`CImage m_image`，同时增加是否缓存有效的标志`bool m_isFull`，并在`OnInitDialog`中初始化。`true`表示有缓存数据。
   3. 在`RemoteClientDlg.cpp`中实现两个成员函数。
2. 客户端界面修改：
   1. 新增按钮，名为远程监控，ID为`IDC_BTN_START_WATCH`
   2. 双击添加按钮相应函数
   3. 新增对话框`CWatchDialog`用于监控画面显示：
      1. 资源视图-`RemoteClient.rc`/`Dialog`-添加资源-直接插入`Dialog`，ID为`IDD_DLG_WATCH`，Caption为”远程监视“
      2. 删除默认按钮。
      3. 新增`Picture Control`，ID为`IDC_WATCH`，该控件与`Static Text`同父类。
      4. 在该对话框上添加类`CWatchDialog`
3. 添加定时器：
   - 类试图-选中`RemoteClientDlg`类-右侧属性-消息-添加`WM_TIME`；
   - 类试图-选中`CWatchDialog`类-右侧属性-消息-添加`WM_TIME`
4. 在`CWatchDialog`中初始化定时器：类试图-选中`CWatchDialog`类-右侧属性-重写-添加`OnInitDialog`
5. 为了将图片更新至`Picture Control`，为该控件添加变量`m_picture`以获取`DC`，使用`m_picture.GetDC()`获取

<br>

#### 2.3.3 思考

1. 搞清楚需求，搞清楚需求实现步骤，再逐步实现！
2. 接下来才是实现过程中的调试和bug修改。不要慌！
   - 比如在本节中，中间出现至少3个坑：图片数据大而缓存太小；非同线程中的`updateData`不可用又使用自定义消息解决；自定义消息处理中`DealComand`之后又重复`DealComand`；显示卡顿又增加发送时延。
   - Bug修改和调试要从底向上排查。

<br>

### 2.4 鼠标控制的设计与实现

#### 2.4.1 设计与实现

![](PROJ2-2-4.png)

> 需要传输鼠标消息诸如：左右键、单击双击、移动。

拆分实现细节：

1. 在`WatchDlg`中实现鼠标消息的传递。
2. 坐标转换：获取的全局坐标，需要的是客户端坐标，最后还要转为一个远程控制机器（服务端）的屏幕坐标。
3. 鼠标消息转化为包数据：
   1. 抓取客户端鼠标消息：Windows鼠标消息；
   2. 封装鼠标消息：坐标/左右还是移动/单双击；
   3. 转化为包。

<br>

#### 2.4.2 实现

1. 在`CWatchDlg`类中添加消息：选中类，右侧属性-消息。
   1. 左键单机：`WM_LBUTTONDBCLK`
   2. 左键双击：`WM_LBUTTONDOWN`
   3. 左键弹起：`WM_LBUTTONUP`
   4. 右键单机：`WM_RBUTTONDBCLK`
   5. 右键双击：`WM_RBUTTONDOWN`
   6. 右键弹起：`WM_RBUTTONUP`
   7. 鼠标移动：`WM_MOUSEMOVE`
2. 在`CWatchDlg`的设计界面添加事件处理程序，类为`CWatchDialog`，消息类型为`STN_CLICKED`

> 同时，发现设计上的一个隐患：客户端网络通信与对话框有耦合关系，即必须在`CRemoteClientDlg`中初始化网络通信

```cpp
void CWatchDialog::OnMouseMove(UINT nFlags, CPoint point)
{
	if((m_nObjWidth != -1) && (m_nObjHeight != -1))
	{
		//坐标转换
		CPoint remote = UserPoint2RemoteScreenPoint(point);
		//封装
		MOUSEEV event;
		event.ptXY = remote;
		event.nButton = 8;//没有按键
		event.nAction = 0;//移动
		CRemoteClientDlg* pParent = (CRemoteClientDlg*)GetParent();//TODO:存在一个设计隐患 网络通信和对话框有耦合
		pParent->SendMessage(WM_SEND_PACKET, 5 << 1 | 1, (WPARAM) & event);
	}
	CDialogEx::OnMouseMove(nFlags, point);
}
```

<br>

#### 2.4.2 虚拟机调试环境

> 一个开源虚拟机：`Oracle VirtualBox`，设备-拖放/共享粘贴板可以实现双向文件传输。

> 项目文件夹下的Debug文件中，有对应的`exe`与`pdb`文件。

![](PROJ2-2-5.png)

配置好虚拟机调试环境后，回到VS：

1. 设置解决方案-设置启动项：选择单个项目；
2. 修改客户端的目标服务器地址（原`127.0.0.1`）：`ipconfg`获取虚拟机IP
   1. `client`的`SendCommandPacket`函数中初始化`Socket`，其ip在`OnInitDialog`中初始化。
3. 为了更明显的显示鼠标位置，设置虚拟机的鼠标显示长轨迹，正常的属性设置即可。

<br>

#### 2.4.3 其他Bug修改

1. 之前在`RemoteCtrl.cpp`中的`SendScreen()`写死的监控画面的宽高，修改为动态获取屏幕宽高。
2. 点击远程监控-结束-再次点击，发生错误终止。
   1. 添加私有成员：`m_isClosed`，监控是否关闭，若关闭则不再指向 `threadWatchData()` 中的程序。
3. 在监控窗口，按回车结束监控，不应该有这样的需求。两种方式：
   1. 重载`OK`消息：类视图-选中`CWatchDialog`，重写`OnOK()`
   2. 窗口属性：`wantReturn`，可能没有（）。

<br>

### 2.5 客户端的锁机与解锁

1. 在监控对话框加入锁机和解锁按钮。

   1. 按钮1：caption为锁机，ID为`IDC_BTN_LOCK`
   2. 按钮2：caption为解锁，ID为`IDC_BTN_UNLOCK`

2. 追加点击事件，发送响应命令。

   

<br>

### 2.x 项目性的思考与报错解决方案

#### 2.x.1 `Recv≤0`与缓冲区清空问题

在客户端开发的过程中，一直出现一个BUG：客户端点击【查看文件目录】后，发送获取服务端的盘符分区信息的请求，随后客户端收到服务端分区信息并显示（此时，无错误）。

**错误描述：**当点击具体的盘符分区（发送该目录下的文件目录请求），但收到的目录信息不完整，且每次点击收到的目录信息均不相同。

![](PROJ2-2-1.png)

分析错误发生原因，一般依次从几个方面来进行：

1. 从软件设计层面，要么是发送端的问题，要么是接收端的问题，要么是显示的问题，应排查定位问题所在。
   1. 使用`TRACE`打印发送了多少文件、接收的多少文件，发现接收的数量<发送的数量。
2. 调试层面【耗时】：对消息的发送、接收、显示与回传，进行全流程的调试。

经过`TRACE` 、`Dump`和断点调试，发现服务端的回复包（目录信息）正确无误，最终锁定在客户端在接收目录信息包的过程中。

```cpp
class CClientSocket
{
public:
#define BUFFER_SIZE 4096
	int DealCommand()//可能同时接收多个来自服务器的消息，因此将局部buffer改为成员变量
	{
		if(m_sock == -1)return -1;
		char* buffer = m_buffer.data();
		static size_t index = 0;//!!!index的值需要保留，故修改该为static变量
		while(true)
		{
			// 假如接收到100B，其中50B的包数据；假如接收到100B，其中150B的包数据；
			size_t len = recv(m_sock, buffer + index, BUFFER_SIZE - index, 0);//len=100 | 50
			//if(len <= 0)
			//??注意：此处存在大BUG，len<=0表示recv结束，不会有新的包进来了，但缓冲曲包未必都接解析完
			// 本次解析一个包后，返回该包的cmd；下次虽然没有接收新的包，但缓冲区还有数据待解析，只有当index<=0时，缓冲区才清空
			//！！！！！！！！！！！！！！！！！！
			if((len <= 0) && (index <= 0))//修改BUG后
			{
				//delete[] buffer;
				return -1;
			}
			TRACE("recv %d\r\n", len);
			index += len;//index=100 | 150
			len = index;//len=100 | 150

			m_packet = CPacket((BYTE*)buffer, len);//len=50
			if(len > 0)
			{
				// 此时len为CPacket类构造后的nSize，即其中的i，指向下一组待解析数据
				//memmove(buffer, buffer + len, BUFFER_SIZE - len);
				memmove(buffer, buffer + len, index - len);
				index -= len;//index=50
				return m_packet.sCmd;
			}
			// len=0时解析失败，还有后续包等待recv
		}
		return -1;
	}
}
```

从此处我们可知，**`recv`返回值小于0代表没有后续的包，但缓冲区未必为空，包解析还得继续！**

- `index`修改为`static`变量
- 单一的返回条件`len <= 0`修改为`(len <= 0) && (index <= 0)`

<br>

> 关于 `static` 修饰函数内的**静态局部变量**，下面做一些特性补充：

1. **存储位置**：普通局部变量存储在栈区，函数调用结束后，栈上的内存会被自动释放；而静态局部变量存储在**静态存储区**，其生命周期贯穿整个程序的运行期间，即使函数调用结束，静态局部变量的值依然会被保留。
2. **初始化时机**：静态局部变量在**程序第一次执行到该变量的声明处时进行初始化**，后续再次进入函数，不会再对其进行初始化操作。
3. **作用域**：虽然静态局部变量的生命周期是整个程序运行期，但它的作用域仍然局限于定义它的函数内部，其他函数无法直接访问该变量。

```cpp
#include <vector>
#include <iostream>
using namespace std;

int func()
{
	static int count = 0;  // 声明静态局部变量count并初始化为0
	return ++count;
}

int main()
{
	int ret = func();
	printf("%s[%d]: %d\r\n", __FUNCTION__, __LINE__, ret);
	ret = func();
	printf("%s[%d]: %d\r\n", __FUNCTION__, __LINE__, ret);
	ret = func();
	printf("%s[%d]: %d\r\n", __FUNCTION__, __LINE__, ret);
	ret = func();
	printf("%s[%d]: %d\r\n", __FUNCTION__, __LINE__, ret);
}
// main[14]: 1
// main[16]: 2
// main[18]: 3
// main[20]: 4
```

<br>



#### 2.x.2 MFC开发中常见的宏定义类型

🔺`WPARAM`与`LPARAM`

在 C++ 的 Windows 编程（尤其是 MFC 编程）中，`WPARAM`和`LPARAM`是用于消息处理函数的两个重要参数，用于传递与消息相关的附加信息。它们在消息机制中扮演着关键角色。

**`WPARAM`**：本质上是一个`unsigned int` 类型的别名（在不同的 Windows 版本中，它可能被定义为`unsigned int` 或者`unsigned long` ，但通常是 32 位或 64 位无符号整数 ），主要用于传递消息的特定信息，例如按键消息中的虚拟键码等。

**`LPARAM`**：通常是一个`LONG` 类型（在 32 位系统中为 32 位有符号整数，在 64 位系统中为 64 位有符号整数），用于传递消息的更多详细信息，比如鼠标消息中的坐标信息等。

<br>

🔺`LPCSTR` 

`LPCSTR` 是 Windows 系统中定义的一个字符串指针类型

```cpp
typedef _Null_terminated_ CONST CHAR *LPCSTR, *PCSTR;
```

- `CHAR`：表示 ANSI 字符类型（单字节字符，通常对应 `char`），用于存储 ASCII 或多字节编码的字符（如 GB2312 中文）。
- `CONST`：说明该指针指向的字符是常量，不能通过此指针修改字符串内容（只读）。
- `_Null_terminated_`：是微软的注解，表明这是一个**以空字符（'\0'）结尾的字符串**（C 风格字符串）。
- 整体来看，`LPCSTR` 等价于 `const char*`，表示 “指向常量 ANSI 字符串的指针”。

<br>



#### 2.x.3 待解决的BUG

- 下载文件时，点击左侧文件目录中的文件夹名，再选择需要下载的文件，文件正常下载；但是若点击文件夹旁的`+`号来展开，则读取不到文件夹路径。



<br>

#### 2.x.4 MFC中自定义消息以及发送和接收

> 2.2.1中有解决实践。

1. 自定义消息编号：从WM_USER开始（在头文件中）

   ```cpp
   #define WM_SEND_PACKET (WM_USER + 1)
   ```

2. 定义自定义消息响应函数：（在头文件中）

   ```cpp
   afx_msg LRESULT OnSendPacket(WPARAM wParam, LPARAM lParam);
   ```

3. 注册消息：在消息映射表中注册消息（在cpp文件中）

   ```cpp
   // 消息映射表
   BEGIN_MESSAGE_MAP(CRemoteClientDlg, CDialogEx)
       //......
   	ON_MESSAGE(WM_SEND_PACKET, &CRemoteClientDlg::OnSendPacket) //注册消息③
   END_MESSAGE_MAP()
   ```

4. 实现响应函数（在cpp文件中）

<br>

## 3 UML与MVC

### 3.1 `StarUML`

> 破解方法及[博文__](https://blog.csdn.net/m0_74146638/article/details/148709643)
>
> 最新破解方法
>
> 通过网盘分享的文件：`app.rar`，提取网盘文件后解压，找到下载路径中对应的文件后替换即可！

> [StartUML入门级使用教程——画Use Case用例图](https://blog.csdn.net/m0_74146638/article/details/148739234?spm=1001.2014.3001.5502)
>
> [StartUML入门级使用教程——画Class类图](https://blog.csdn.net/m0_74146638/article/details/148741387?spm=1001.2014.3001.5501)
>
> [StartUML入门级使用教程——画Sequence顺序图(时序图、序列图)](https://blog.csdn.net/m0_74146638/article/details/148759439?spm=1001.2014.3)

- [设置图像填充/线条颜色](https://blog.csdn.net/Bronze5/article/details/116759892)（需要重新拖入）
- 在 `StarUML` 软件的菜单栏中，依次找到 `View` ⇒ `Show Grid (Ctrl + G)` ，点它一下（当然用快捷键也可以），把前面的勾去掉。于是，绘图区域就不显示网格了。

<br>

### 3.2 服务端

#### 3.2.1 服务端UML

**类图**

1. 添加包Package（模块）
   1. 跨系统则添加子系统。
   2. 添加两个模块：`RemoteCtrl`、`RemoteClient`
2. 在`RemoteCtrl`中添加一个`global`类，然后加入`RemoteCtrl`中的函数
   1. 添加一个类图：Add Diagram -  Class Diagram，类图名为`远程被控服务器程序`
   2. 将`global`类拖入主界面
   3. 在`global`类中加入方法`Operation`：`main`，追加`:int`表示返回值类型
   4. 加入所有的方法与属性
3. 在`RemoteCtrl`中添加一个Package，名为`std`，在包中加入类`string`，这样用到的`std::string`就可以直接引用该类型。
4. 相应地，在`RemoteCtrl`中添加：
   1. 一个`CServerSocket`类、`CPacket`类，然后加入类中的函数与属性；
   2. 结构体也加入，其属于`class`，如`MouseEvent`等。
   3. 私有属性和方法前缀为`-`。
   4. `CDialog`类，作为基础基类。
   5. `CLockInfoDialog`类，仅添加构造函数和虚析构（勾选`isAbstract`）。
5. 标明关系：
   1. 组合关系`Composition`（不可分割）：`CServerSocket`与`CPacket`、`CServerSocket`与`CHelper`。
   2. 关联关系`Association`：`CServerSocket`与`file_info`、`CServerSocket`与`MouseEvent`。
   3. 派生关系`Generalization`：`CLockInfoDialog`类派生自`CDialog`类，前者指向后者！

![](PROJ2-3-1-RemoteCtrl.png)

<br>

**时序图**

1. 在`RemoteCtrl`中创建时序图`Sequence Diagram`：控制服务器程序启动

   1. 拖入`global`类，使用`Self-Message`增加消息（单击后向下拉长），并选择消息类型为`main`函数；

   2. 接下来画图说明main函数中的执行逻辑。

   3. 在`RemoteCtrl`中添加一个Class，名为`WindowsAPI`，在类中加入方法`GetModuleHandle`，这样可以直接使用且不用可以强调。

   4. 拖入`WindowsAPI`类，使用`Message`消息，从`main`周期指向`LifeLine2：WindowsAPI`

   5. 使用`Message`消息，从`main`周期指向`LifeLine2：WindowsAPI`，消息名为`AfxWinInit()`（双击使用`+`模式，自动在`WindowsAPI`类中加入该类方法）

      1. 同理，加入`GetCommandLine()`，在`AfxWinInit()`之前。

   6. 实际上，`AfxWinInit()`执行是有条件，现加入一个`Combined Fragment`，选择属性`consider`，条件名为代码中if条件：`GetModuleHandle()!= nullptr`

      1. `Combined Fragment`中一个属性`InteractionOperator`，其值解释如下：`seq`为顺序的、`alt`为轮换的、`opt`为可选的、`par`为部分的、`loop`为循环、`assert`为断言、`consider`为条件

   7. 观察原代码，需要嵌套一个内部条件：嵌套一个consider条件

      ```cpp
      AfxWinInit(hModule, nullptr, ::GetCommandLine(), 0)==true
      ```

   8. 接下来，调用`CServerSocket`中的`getInstance`：使用`message`消息指向`CServerSocket`

   9. 调用`CServerSocket`中的`InitSocket`，根据其返回值（`InitSocket() == false`，加入`consider`判断），判断是否结束程序`exit()`。

   10. 观察源代码，接下来是一个while，则添加`Combined Fragment`，属性选择`loop`，条件名为`getInstance() != NULL`

   11. 按源代码逻辑，依次加入。

   ![](PROJ2-3-2.png)

2. 在`RemoteCtrl`中已创建的`Collaboration1`中，创建子时序图`Sequence Diagram`：命令执行时序图，用于描述`ExcuteCommand()`

   1. 拖入`global`类，自调用`ExcuteCommand()`函数，并拉长调用周期；
   2. 使用属性为`opt`的`Combined Fragment`来描述`switch`，框名为：命令号；
   3. 对于`opt`的框来说，双击框名，出现分割符号，点击插入，用来表示多种`switch`情况，并对每个块命名，如`cmd==1`
   4. 以`cmd==1`的块为例，基于`ExcuteCommand()`函数的调用周期，加入子调用函数`MakeDriverInfo()`。
      1. 为了展示该函数的逻辑，拉长函数调用周期，拖入与该函数有关的两个类：`CPacket`、`CServerSocket`、`WindowsAPI`
      2. 加入交互消息。

   ![](PROJ2-3-3.png)

3. ...

<br>

#### 3.2.2 服务端重构

项目不成熟阶段，无需纠结软件设计。但是，**高内聚、低耦合**的目的是为了能够后期功能补充和维护。

也就是说，**不要迷信设计，也不要忽视设计！**

- `global`中的全局方法和全局变量太多了，除了`CWinAPP`，其他的都无需暴露；Dump只是个工具函数；其他基本都属相关的命令处理函数/模块。
- `file_info`和`MouseEvent`与业务相关，与通信模块`CServerSocket`太过耦合。

<br>

新建工具类`CXTool`，目的在于：

- 项目大了后，幽灵全局、静态变量的存在会是极其致命的存在。
- 避免命名重名。

具体操作如下：

1. 在`RemoteCtrl`项目中，添加`CHXTool`类。
   1. 如果确认只有静态函数，就可勾选“内联”，这样不会出现`cpp`文件，仅有头文件。
   2. 静态成员函数：`Dump()`
2. 在`RemoteCtrl`项目中，添加`CCommand`类，用于重构`global`众多与命令相关的函数。
   1. 成员函数为`ExcuteCommand()`，将其中的`switch`抽象为`map`映射表。
3. 在`RemoteCtrl`项目中，添加`CPacket`类（新建项即可），用于重构`CServerSocket`中的包相关的定义和操作；同时将`MouseEvent`与`file_info`做同步迁移即可。
4. 解耦命令处理与网络模块
   1. 由于main函数中，以网络逻辑主导，进入命令处理后，又要调用网络函数收发包，代码逻辑结构形似肉夹馍，极其臃肿！
   2. 现计划切除内部逻辑与网络的关系，即将收发包的网络过程抽象出来！
   3. 此处针对`main`中的流程，设计回调函数来优化代码逻辑结构。
   4. 更新`CServerSocket.h`：
      1. 加入全局函数指针类型定义`SOCKET_CALLBACK`；
      2. 在`CServerSocket`类中加入几个成员参数。
      3. 优化模块结构，去除顶层main函数中对业务依赖：更新`InitSocket()`函数，新增`Run()`函数、更新`main`函数。
      4. 优化模块结构，去除业务处理函数中对网络依赖，将网络发包行为委托给网络模块执行：
         1. 将`Send()`函数移到网络模块处理。
         2. 业务函数中，如果需要通过网络获取数据，如删除文件，需要通过网络获取删除文件的文件名和路径，也同样需要将这一部分移动到网络模块。具体方法是采用入参方式传入。
      5. `CServerSocket`类中的`GetPacket`、`GetFilePath`、`GetMouseEvent`函数在重构过程中已不再需要。



<br>

同步修改`UML`设计：

1. 新增`CHXTool`类，将`Dump`函数复制入`CHXTool`类，并删除`global`中的对应函数。
2. 新增`CCommand`类，将global中的相关函数移入。
   1. `global`依赖于`CCommand`。
   2. `CCommand`与`CHXTool`存在关联关系。

![](PROJ2-3-4.png)

同步修改`UML`时序图设计：

1. `CCommand`的创建使用`Create Message`

![](PROJ2-3-5.png)



### 3.3 客户端

#### 3.3.1 客户端UML

创建客户端类图：控制客户端程序

> 可借助vs的类视图快速添加。

1. 加入`CClientSocket`和`CHelper`
   1. 二者关系为组合关系（强于聚合关系`Aggregation`，聚合关系为可有可无），在前者中必须用到了后者。
2. 加入`CRemoteClientApp`，以及其父类`CWinApp`
   1. 派生关系的表示：子类指向父类。
3. 其他间UML图。

![](PROJ2-3-6.png)

> 时序图如下

![](PROJ2-3-7.png)

<br>

#### 3.3.2 MVC设计模式

**高内聚低耦合**

由第一套设计发现，应用层与网络层存在大量的强耦合，导致互相依赖无法分离，与C++面向对象设计思想不符。

> 什么叫耦合？就好像刚出生的婴儿离不开他的妈妈，而隔壁家的老王可以随时无视你的存在。

依赖程度的大小则称为强耦度。

回顾初步开发的程序，在客户端中，功能函数写在了主程序中，每一个步骤都离不开主程序。而主程序又不是专门干通信的，还需要对接到用户，与用户交互，显示等。

如果我们把相应的功能归为一个类，让该类去完成相应的动作，自己干自己的事情，就能更好地达到高内聚低耦合。

 

**可扩展性**

一个良好的程序必定俱备良好的可扩展性，强耦合不利于扩展。

> 就好比如电脑的显卡，只要想换就能把显卡拆下换成别的；而笔记本的集成显卡却做不到，因为他被绑定到了主板功能整合一起了。

客户端上的`dlg`上完成的功能函数，如果当需要改变用户界面时，这个时候就要完整地把功能迁移到另一个`dlg`上，这样的话一些成员也要随之移动，如果是一些普通类型还好说，如果一些成员涉及到原本`dlg`的父类中的功能函数又或者其需要调用相关连的成员，这个时候，迁移到别的`dlg`或类中则成为了巨大的麻烦。




**MVC架构**：采用原因：离开视图没有数据!!

由客户端时序图可以看到，`CwatchDlg`不能直接通过向客户端发送数据，而是要通过调用主界面`CremoteClientDlg`的去发送`（CremoteClientDlg::SendCommandPacket()`）数据，原因就是`IP`数据、端口数据全在主界面`CremoteClientDlg`中，`CwatchDlg`必须得到这些数据才能发送消息，因此`CwatchDlg`依赖于`CremoteClientDlg`。

 

MVC开始是存在于桌面程序中的，M是指业务模型，V是指[用户界面](https://baike.baidu.com/item/用户界面)，C则是控制器。使用MVC的目的是将M和V的实现代码分离，从而使同一个程序可以使用不同的表现形式。

- V（view）视图层，即用户界面，眼睛看得键摸得着的。
- C（Controller）控制层，即主要老大，负责监管各个部门进度、状态，数据处理
- M（Module）模型层，也称为数据层，由控制层调用，不会随着视图层消失而消失

> 只要是设涉及界面开发的，基本使用MVC。

> M与V走关系，离死就不远了

> MVC增强了M/V的可移植性，而`Controller`反而是不可移植的。

<br>

#### 3.3.3 客户端重构

> 如果有经验，从类图入手设计`CClientController`

1. 添加非内联的类`CClientController`（文件名无前缀C）
   1. 创建单例、初始化、Invoke线程等
2. 修改`RemoteClient.cpp`
   1. 引入`CClientController.h`，并替代核心的调用`RemoteDlg`的代码（两行），即使用`Controller`来开启`Dlg`窗口。
3. 按UML设计，编写`CClientController`
   1. ...
   2. 重载`SendMessage`（特性：接收方接收消息，执行操作后返回）：想要获取消息的执行结果。解决：使用事件（Windows）、互斥/信号量
4. 更新`ClientSocket.h`
   1. 加入私有成员变量`m_nIP`、`m_nPort`，并补充配套的初始化、更新函数。
   2. 更新`CPacket`的`Data()`函数，并同步更新`send()`，具体为：删除原`send()`、新增`sendPacket()`
5. 将`ClientSocket.h`引入`CClientController.h`
6. 在`RemoteClientDlg`中，新增对`IP/Port`改变的事件处理
   1. 右键控件添加事件处理程序，默认选择`IPN_FieldChanged`，类选择为：`CRemoteClientDlg`
   2. 当发生改变时，才更新`ClientSocket.h`中的私有变量：`m_nIP`、`m_nPort`
   3. 该对话框初始化时，也添加更新与默认值。
7. 将文件下载线程移动到`CClientController`
   1. 新增成员函数`DownFile()`

8. 重构调试阶段，我们发现一个bug（打开监控，鼠标移动就挂）
   - 客户端监控与鼠标信息发送，出现冲突，这两个独立之后，socket依然使用同一个buffer，这属于多线程问题。
   - **问题抽象**：多个并行请求，请求调用`init`初始化网络，然后`send`，但不会一次性全部发送完；此时由于并发第二个请求进来，也会`init`（会关闭前一个请求的`socket`，再`init`）、`send`，此时，缓冲区内就会有多个不同请求的包混在一起。
   - **解决思路**：`init`在线程中做，在一个循环中不断在队列中拿到达的数据，并派发给不同处理线程。
   - 该问题原因之一就是之前的CS连接都是短连接，也就是一次消息交流后就断开连接。而多线程必然会出现同时有两个连接和消息的到达。因此，此处的修改之一就是使用**长连接**。
   - 借用`SendMessage`的消息循环和`hEvent`来做一个消息中转站，告知谁该`dealCommand`。
   - 在`CPacket`中新增一个成员：`hEvent`，并同步更新构造函数等。
   - 在`ClientSocket`中新增`m_mapAck`、



> 对于客户端，如果Controller需要创建一个线程来自己建立消息循环，如`void CClientController::threadFunc()`，另一种做法是创建一个非常小的`Dlg`（1个像素，但继承有完整的消息循环）

> ex后缀与无ex后缀的函数的区别：如`_beginthreadex()`可以拿到新开启的线程的ID

#### 3.3.4 调试问题

1. 对于调试的异常，首先看调用堆栈，找出从哪儿开始报错。
2. 对于异常【写入访问权限冲突，0X5B8】：一般来说，在Windows中，至少前64K的内存（0X10000）都是受保护，不可能被访问到。
   - 基于此，反推这个指针值是怎么来的。
3. 对于显式的内存泄漏报错：
   1. 在当前项目中找所有的new
4. 注意：全局变量、类静态变量的初始化是先于main函数的，其析构是在main函数之后的。
   1. 利用这一点，可以设计单例。也就是说，main函数之前，不存在多线程，不存在冲突。
5. 出现bug：监控画面只出现第一帧，之后不变化。
   1. 定位、debug发现是缓存处理的问题，并未取到新的数据，而是不断用旧的数据更新。

6. 出现bug：监控一段时间后卡死。
   1. `m_lstSend`访问冲突，`GetCurrentThreadId`：获取当前线程ID。
   2. 使用mutex来保证线程安全。

7. 另外一个线程同步bug：在`SendPacket`中，每当socket失效就会开启一个线程，这样会不断创建很多新线程。
   1. 修改线程创建的条件。

8. 出现bug：`index>0`但`recv=0`。
   1. 增大缓冲区为40960000。

9. 远程监控中，鼠标错位的问题。
   1. 原因：客户端捕捉鼠标位置的区域，其实是对话框内部，由于`WatchDlg`对话框的上方还有一块区域（两个按钮：锁机、解锁），而并非图像的中的位置
   2. 解决：抹除非图像区域差值。
      1. 原始坐标为相对于客户端对话框的坐标点。
      2. 将原始坐标点，转换为全局屏幕坐标。
      3. 将全局屏幕坐标，转化为相对于`m_picture`控件的坐标。

10. 还是会出现解析失败（size=0）bug：
    1. 关键修改`m_mapAutoClosed.erase(head.hEvent);`，将其置于互斥体中，线程安全的删除
    2. 但依然还有在文件夹、文件下载出现各种问题
    3. 解决：修正事件机制为**消息机制**。相比于数据同步，消息回调的方式其实就是一种同步机制；而且，网络处理能力受限于`setEvent`等事件同步。
    4. 这样做，首先将发包与接包的线程编程单线程，不存在线程冲突；通过消息机制，进一步解耦。


**为什么修改为消息机制？**

- 我们将通信模块从项目中独立出来，额外的也将View独立，每个`Dlg`都会使用通信模块与服务器通信，这个过程存在大量的资源竞争，非常难以同步。

![](PROJ2-3-8.png)

修正事件机制为**消息机制**：

1. 在`ClientSocket`中新增`threadFunc2()`、`SendPack()`、消息定义、成员变量`m_mapFunc`等。

2. 改动`ClientSocket::SendPacket()`、`ClientController::SendCommandPacket()`

3. 在`CWatchDlg`中添加消息定义、消息响应函数

   1. 头文件中新增消息定义、消息响应函数；

   2. `cpp`文件中新增响应函数实现、在`Message_map`中实现加入。

      ```CPP
      ON_MESSAGE(WM_SEND_PACK_ACK, &CWatchDialog::OnSendPackAck)
      ```

      

   3. 取消`OnTimer()`

4. 在`RemoteDlg`中添加消息定义、消息响应函数（同样的操作）

> 🔺Windows最大的特点就是消息机制，一定要利用起来！

<br>

#### 3.3.5 调试问题2

> 修改通信机制后，继续调试。

1. 为什么第一次连接测试会失败？
   - 原因：`m_hThread = (HANDLE)_beginthreadex(NULL, 0, &CClientSocket::threadEntry, this, 0, &m_nThreadID);`执行后，线程处于将执行但未执行的状态，资源、线程空间、线程ID都已就绪，但没有分配CPU时间片。
   - 解决（低级调试）：`SendPacket()`中执行`PostThreadMessage`失败时再执行一次。
   - 解决方案：在`ClientSocket`中新增一个`m_eventInvoke`启动事件，并在构造函数中初始化，并且开启通信线程`threadEntry()`
2. 控制屏幕监控频率：在`ClientController`中，修改`threadWatchScreen`，使用`GetTickCount64`实现休眠控制。
3. 出现性能问题：鼠标移动过慢，可能出现未正常应答的情况。
4. 关闭监控时，出现鼠标相关的内存泄漏。
   1. 原因：鼠标操作信息传递有延时，当关闭`WatchDlg`时，未接收的消息变为野消息。
   2. 野消息以5、6（鼠标、监控画面）为主。
5. 点击盘符，不显示盘符下的文件夹：
   1. 原因：不容易复现，该情况出现在`Tree Control`，如果不展开或者不点击，则默认不自动展开。
   2. 解决：添加`expand`的方法。
6. 下载功能不可用：出现解包错误。
   1. 原因：当接收小包时，根本用不到`memmove`，只有当大文件传输时才会触发bug，错误在于移动的参数填写错误。

> 一定要习惯断点调试、使用`TRACE`打印`log`。

> 代码规范：代码即文档。



<br>

## 4 开机启动

服务端存在的问题：

- 权限问题：不能主动以管理员权限运行
- 不能开机自动启动

### 4.1 权限问题

#### 4.1.1 开机启动时弹出权限授权弹窗

`RemoteCtrl`项目右键属性-链接器-清单文件：

1. 【UAC执行级别】

   - 默认值为`asInvoker(/level=‘asInvoker’)`

   - 修改为：`requireAdministrator`

2. 【UAC是否绕过UI保护】

   - 默认值为：否，即不弹出对话框通知。
   - 如果没有管理员权限且绕过，会报错。必须要使用对话框拿到权限。

修改后重新编译后，图标出现“盾牌”标志，双击后弹出“用户账户控制”对话框。

<br>

#### 4.1.2 代码中获取管理员权限

**权限`Token`在Windows中是一个`Handle`，即`Void*`指针。Handle分为两部分，一部分是内核部分，另一部分是应用部分。**

【关于`Handle`】操作系统内部有一个数据结构，如果直接暴露给应用直接使用，可能会存在以下问题：

1. 更新不同步：内核代码更新后，头文件会更改，继而需要大量的头文件修改，也就是说无法使用新的操作系统
2. 数据篡改，影响安全：Windows是闭源操作系统，无需向外暴露。

为了让应用使用操作系统中的数据结构，Windows操作系统提出**句柄**的概念。

- `Void*`屏蔽了系统更新带来的头文件修改差异；
- `Void*`<span style="background:#F7B7C5;">屏蔽了内核中数据结构的细节！此操作极大地保护了内核代码。</span>
  - 很多SDK都使用这样的思想，比如Android中类似于上下文、环境变量。



注意一些Windows API：

1. OpenProcessToken
2. GetCurrentProcess
3. GetTokenInformation
4. CloseHandle
5. FormatMessage
6. OutputDebugString
7. LocalFree
8. MessageBox



<br>

### 4.2 开机启动

打开注册表reg编辑器：Local_Machine > SOFTWARE > Microsoft > Windows > CurrentVersion > Run

- 此处的Run注册表，记录开机启动的程序清单。
- 观察可知，已有的项中，数据（文件目录）均为指向系统目录：system32，也就是说我们也要将编译好的程序复制到system32中。
- 此处我们使用`mklink`命令（需要管理员权限），在system32中创建一个软链接。【这样无需复制动态库文件到system32】

```shell
C:\Windows\system32>mklink RemoteCtrl.exe 源文件（源文件的文件目录）
```

执行命令后，生成一个SYMLINK的一个东西。

相比于创建快捷方式，有以下不同：

- 快捷方式是一个后缀为`.lnk`的文件，文件内容为其他值，记录源文件目录，文件大小不为0；
- 而软链接等效于原始EXE文件，大小为0，更类似于Linux中的`ld`文件

<br>

下面在项目中设置自动启动，即操作注册表：

```cpp
//RemoteCtrl.cpp
//业务和通用
bool ChooseAutoInvoke(const CString& strPath) {}
```

需要注意的是：

1. Windows平台使用代码执行系统命令：`system("命令字符串");`

   - 字符串形如：`“cmd /K mklink filename1_path filename2_path ”`，`/K`表示执行后不关闭窗口。
   - 或者：`“mklink filename1_path filename2_path ”`

2. 打开注册表写入：`KEY_WOW64_64KEY` 保证写入

   ```cpp
   ret = RegOpenKeyEx(HKEY_LOCAL_MACHINE, strSubKey, 0, KEY_ALL_ACCESS | KEY_WOW64_64KEY, &hKey)
   ```

   

3. 出现写入文件的位置不确定时，可以使用`everything`查找。

> 上面的方法在真实执行的时候，存在问题：①需要动态库；②没有以管理员身份启动机器，不会自动启动。

<br>

对于开机启动功能，下面使用在以下环境下的方案：

1. 权限【UAC执行级别】恢复至默认值为`asInvoker(/level=‘asInvoker’)`
2. 属性-高级-高级属性-MFC使用：在静态库中使用MFC

<br>

### 4.3 另一种开机启动方式：开机启动项

Windows中有一个开机启动文件夹，系统启动后自动启动该文件夹中的所有程序。

开启步骤：

1. 搜索：运行
2. 输入：`shell:startup`，打开开机启动文件夹。

<br>

<br>

<br>

<br>

# 三 易播：加密播放器项目

<br>

<br>

<br>

<br>

<br>

<br>

<br>

<br>

<br>

<br>

<br>

<br>
