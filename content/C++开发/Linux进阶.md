---
title: Linux进阶
date: 2024-05-29 10:00:40
urlname: Linux-next
tags:
  - 操作系统与框架
  - CPP
  - Linux
categories: C++开发
description: Linux快速入门
draft: false
---

## 〇 目录

- Makefile入门




<br>

四 动态库项目

什么是动态库？

动态库的作用？

Windows下动态库项目的创建

Linux下动态库的项目的创建

动态库的直接加载

动态库的手动加载与卸载

动态更换动态库的实例

静态库项目

什么是静态库？

静态库的作用？

Windows下静态库项目的创建

Linux下静态库项目的创建

Windows下静态库的导入

Linux下静态库的导入

Windows下静态库开发示例

Linux下静态库开发示例



 <br>

## 四 Makefile入门

`Makefile`定义了一系列的规则来指定：哪些文件需要先编译，哪些文件需要后编译，哪些文件需要重新编译，甚至于进行更复杂的功能操作。因此，`makefile`就像一个Shell脚本一样，其中也可以执行操作系统的命令。

<span style="background:#FFFF00;">`Make`工具最主要也是最基本的功能</span>就是：通过`makefile`文件来描述源程序之间的相互关系并自动维护编译工作。

而`makefile`文件需要按照某种语法进行编写，文件中需要说明如何编译各个源文件并连接生成可执行文件，并要求定义源文件之间的依赖关系。

- `makefile` 文件是许多编译器【包括 Windows下的编译器，只是在集成开发环境中，用户通过友好的界面修改 `makefile` 文件而已】维护编译信息的常用方法。【`.mk`文件 | `nMake`】
- 在 UNIX 系统中，习惯使用 `Makefile` 作为 `makefile` 文件。如果要使用其他文件作为 `makefile`，则可利用类似下面的 `make` 命令选项指定 `makefile` 文件。【`make -f a.mk`】

一个文件，指示程序如何编译和链接程序。`makefile`文件的默认名称是名副其实的`Makefile`，但可以指定一个命令行选项的名称。

`make`程序有助于您在开发大型程序跟踪整个程序，其中部分已经改变，只有那些编译自上次编译的程序，它已经改变了部分。

<br>

**关于编译阶段：** 

> 编译一个小的C程序至少需要一个单一的文件`.h`文件【如适用】。虽然命令执行此任务只需`CC file.c`中，有3个步骤，以取得最终的可执行程序，如下所示：
>

1. 编译阶段：所有的C语言代码`.c/.cpp`文件中被转换成一个低级语言汇编语言【`.o/.s`文件】。

2. 汇编阶段：将前阶段的汇编语言代码，转换成目标代码的代码片段，该计算机直接理解。目标代码文件`.o` 结束。【一般会合并前两个阶段，如果要保留汇编文件则需要指定】
3. 链接阶段：编译程序涉及到链接的对象代码的代码库，其中包含一定的**内置**的功能，如`printf`的最后阶段。这个阶段产生一个可执行程序，默认情况下，这是名为`a.out`。

 <br>

### 4.1 为什么需要Makefile？

> Makefile 是给make使用的一个脚本文件，主要用途用来控制编译阶段的细节。

对于本次教程中的讨论，假定有以下的源文件。

- main.cpp
- hello.cpp
- factorial.cpp
- functions.h

`main.cpp` 文件的内容

```c++
#include <iostream.h> //新版本gcc为#include <iostream>
#include "functions.h"
int main(){
	print_hello();
    cout << endl;
    cout << "The factorial of 5 is " << factorial(5) << endl;
    return 0;
}
```

 `hello.cpp` 文件的内容

```cpp
#include <iostream.h>
#include "functions.h"
void print_hello(){
    cout << "Hello World!";
}
```

 `factorial.cpp` 文件的内容

```cpp
#include "functions.h"
int factorial(int n){
    if(n!=1){
        return(n * factorial(n-1));
    }
    else return 1;
}
```

`functions.h` 内容

```cpp
void print_hello();
int factorial(int n);
```

 琐碎的方法来编译的文件，并获得一个可执行文件，通过运行以下命令：

```shell
CC main.cpp hello.cpp factorial.cpp -o hello
```

> CC必须大写，是一个宏，指向g++。

- 这上面的命令将生成二进制的`Hello`。在我们的例子中，我们只有四个文件，我们知道的函数调用序列，因此它可能是可行的。
- 但对于大的项目，源代码文件有成千上万，就很难保持二进制版本。
- 真正项目中可能包含静态库和动态库，一个命令行解决不了【批处理也有长度限制，维护很难】。

`make`命令允许您管理大型程序或程序组。

- 若仅修改了源码，可能动态库和静态库并未修改，故其无需编译动态库和静态库，只需要编译好源文件，再直接链接。
- 当开始编写较大的程序，重新编译较大的程序，需要更长的时间，比重新编译的短节目。

在随后的章节中，我们将看到项目是如何准备一个`makefile`。

<br>

### 4.2 Makefile 宏

`make`程序允许您使用宏，这是类似的变量【增加脚本可读性】。 = 一对一个Makefile中定义的宏。例如：

```shell
MACROS= -me		#宏定义
PSROFF= groff -Tps
DITROFF= groff -Tdvi
CFLAGS= -O -systype bsd43
LIBS := "-lncurses -lm -lsdl"	#:=等价于=，常见于Andriod的makefile
LIBS += -lstdc++	#在原先的宏上添加
MYFACE = ":*)"
PROJ_HOME = /home/fengpan/projects

#调用宏 $
$(MACROS)
$(MYFACE) :*)
```

> 注意：后面定义的宏，会替换前面定义的同名宏。
>



#### 4.2.1 特殊的宏

目标规则集发出任何命令之前，有一些特殊的预定义宏。

- `$@` 表示目标文件。
- `$?` 表示<span style="background:#FFFF00;">比目标还要新</span>的依赖文件列表【说白了，会依次将这几个cpp文件名填进去；但填进去的文件是更新过的、有变化的，没有更新变化的源文件，不会参与编译】。

因此，举例来说，我们可以使用一个规则

```makefile
hello: main.cpp hello.cpp factorial.cpp			#目标hello，编译生成hello需要的条件
	   $(CC) $(CFLAGS) $? $(LDFLAGS) -o $@		#规则【CC即Linux下的gcc】
												
alternatively:									#上面的命令等价于下

hello: main.cpp hello.cpp factorial.cpp			#长度无限制
       $(CC) $(CFLAGS) $@.cpp $(LDFLAGS) -o $@
```

> 在这个例子中`$@`代表 `hello`， `$?` 或``$@.cpp`将拾取所有更改的源文件。
>

有两个比较特殊的隐含规则中使用的宏。它们是

- `$<` 表示第一个依赖文件
- `$*` 这个变量表示**目标模式**中`%`及其之前的部分。

> 对于`$*`，如果目标是“`dir/a.foo.b`”，并且目标的模式是“`a.%.b`”，那么，`$*`的值就是“`dir/a.foo`”。这个变量对于构造有关联的文件名是比较有用。
>
> 如果目标中没有模式的定义，那么`$*`也就不能被推导出。但是，如果目标文件的后缀是make所识别的，那么，`$*`就是除了后缀的那一部分。
>
> 例如：如果目标是“`foo.c`”，因为“`.c`”是make所能识别的后缀名，所以，`$*`的值就是“foo”。
>
> 这个特性是GNU make的，很有可能不兼容于其它版本的make，所以，你应该尽量避免使用`$*`，除非是在隐含规则或是静态模式中。如果目标中的后缀是make所不能识别的，那么`$*`就是空值。

常见的隐含规则的构造 `.o`（对象）文件，`.cpp`（源文件）：

```makefile
.o:.cpp							#生成.o文件，.o文件依赖对应的.cpp文件
	   $(CC) $(CFLAGS) -c $<	#$<代表第一个，即main.cpp

alternatively
	
.o:.cpp							#.o能够被make识别，$*会匹配main
	   $(CC) $(CFLAGS) -c $*.cpp
```



#### 4.2.2 传统宏

有很多默认的宏【输入“`make -p`”打印出来的默认值】。大多数使用它们的规则是很明显的：这些预定义变量。

在隐含规则中使用的宏分为两大类：那些程序名【如`CC`】和那些含有参数的程序【如`CFLAGS`】。

下面是一些比较常见的变量用作内置规则：`makefile`文件的程序名称的表

| AR       | Archive-maintaining program;  default `ar'.                  |
| -------- | ------------------------------------------------------------ |
| AS       | Program for compiling assembly  files; default `as'.         |
| CC       | Program for compiling C programs;  default `cc'.             |
| CO       | Program for checking out files  from RCS; default `co'.      |
| CXX      | Program for compiling C++ programs;  default `g++'.          |
| CPP      | Program for running the C  preprocessor, with results to standard output; default `$(CC) -E'. |
| FC       | Program for compiling or  preprocessing Fortran and Ratfor programs; default `f77'. |
| GET      | Program for extracting a file from  SCCS; default `get'.     |
| LEX      | Program to use to turn Lex  grammars into source code; default `lex'. |
| YACC     | Program to use to turn Yacc  grammars into source code; default `yacc'. |
| LINT     | Program to use to run lint on  source code; default `lint'.  |
| M2C      | Program to use to compile Modula-2  source code; default `m2c'. |
| PC       | Program for compiling Pascal  programs; default `pc'.        |
| MAKEINFO | Program to convert a Texinfo  source file into an Info file; default `makeinfo'. |
| TEX      | Program to make TeX dvi files from  TeX source; default `tex'. |
| TEXI2DVI | Program to make TeX dvi files from  Texinfo source; default `texi2dvi'. |
| WEAVE    | Program to translate Web into TeX;  default `weave'.         |
| CWEAVE   | Program to translate C Web into  TeX; default `cweave'.      |
| TANGLE   | Program to translate Web into  Pascal; default `tangle'.     |
| CTANGLE  | Program to translate C Web into C;  default `ctangle'.       |
| RM       | Command to remove a file; default  `rm -f'.                  |

这里是一个变量，其值是上述程序的额外的参数表。所有这些的默认值是空字符串，除非另有说明。

| ARFLAGS   | Flags to give the  archive-maintaining program; default `rv'. |
| --------- | ------------------------------------------------------------ |
| ASFLAGS   | Extra flags to give to the  assembler (when explicitly invoked on a `.s' or `.S' file). |
| CFLAGS    | Extra flags to give to the C  compiler.                      |
| CXXFLAGS  | Extra flags to give to the C  compiler.                      |
| COFLAGS   | Extra flags to give to the RCS co program.                   |
| CPPFLAGS  | Extra flags to give to the C  preprocessor and programs that use it (the C and Fortran compilers). |
| FFLAGS    | Extra flags to give to the Fortran  compiler.                |
| GFLAGS    | Extra flags to give to the SCCS  get program.                |
| LDFLAGS   | Extra flags to give to compilers  when they are supposed to invoke the linker, `ld'. |
| LFLAGS    | Extra flags to give to Lex.                                  |
| YFLAGS    | Extra flags to give to Yacc.                                 |
| PFLAGS    | Extra flags to give to the Pascal  compiler.                 |
| RFLAGS    | Extra flags to give to the Fortran  compiler for Ratfor programs. |
| LINTFLAGS | Extra flags to give to lint.                                 |

> 注：您可以取消`-R`或 `--no-builtin-variables`选项隐含规则使用的所有变量。
>

如，也可以在命令行中定义的宏

```makefile
make CPP=/home/fengpan/projects
```

 

<br>

### 4.3 Makefile 定义依赖性

这是很常见的，最终的二进制文件将依赖于各种源代码和源代码的头文件。依存关系是重要的，因为他们告诉对任何目标的源。

```makefile
hello: main.o factorial.o hello.o					#目标：依赖项
	   $(CC) main.o factorial.o hello.o -o hello	#处理规则：如何处理
	   #相当于 $(CC) $? -o $@
```

在这里，我们告诉`hello`依赖`main.o`、`factorial.o`和`hello.o`，所以每当有任何变化，这些目标文件将采取行动重新编译。

同时我们会告诉如何准备 `.o`文件，所以我们必须定义这些依赖也如下：

```makefile
main.o: main.cpp functions.h	#h文件不会参加编译，但如果不加，就不再main.o的依赖项
	    $(CC) -c main.cpp		#当.h文件更新，mian.o不会更新
factorial.o: factorial.cpp functions.h
	    $(CC) -c factorial.cpp
hello.o: hello.cpp functions.h
	    $(CC) -c hello.cpp
```

直接在该目录下输入make命令即开始编译，出错：`std:cout`没有引用，即没有来链接库。修改为：

```makefile
LDFLAGS = -lstdc++

hello: main.o factorial.o hello.o
	   $(CC) $? $(LDFLAGS) -o $@
main.o: main.cpp functions.h
	    $(CC) -c main.cpp
factorial.o: factorial.cpp functions.h
	    $(CC) -c factorial.cpp
hello.o: hello.cpp functions.h
	    $(CC) -c hello.cpp
```

<br>


### 4.4 Makefile 定义规则

一个Makefile目标规则的一般语法

```makefile
target [target...] : [dependent ....]	#[]:可有可无
       [ command ...]
```

> 方括号中的项是可选的，省略号是指一个或多个。注意标签，每个命令前需要。
>

下面给出一个简单的例子，定义了一个规则使你的目标从 `hello` 其他三个文件。

```makefile
hello: main.o factorial.o hello.o
	   $(CC) $? -o $@	#相当于$(CC) main.o factorial.o hello.o -o hello.o
```

> 注：在这个例子中，你必须放弃规则，使所有对象从源文件的文件
>

语义是相当简单的。当"`make target`"发现目标规则适用，如有眷属的新目标，使执行的命令一次一个（后宏替换）。如果有任何依赖进行，即先发生（让您拥有一个递归）。

如果有任何命令返回一个失败状态，MAKE将终止。这就是为什么看到规则，如：

```makefile
# 命令bash：make clean
clean:
	-rm *.o *~ core paper #rm *.o hello	#-可加可不加
```

 

Make忽略一个破折号开头的命令行返回的状态。例如。如果没有核心文件，谁在乎呢？ 

Make 会 `echo` 宏字符串替换的命令后，告诉发生了什么事，因为它发生。有时可能想要把它们关掉。例如：

```makefile
install: hello
	@echo You must be root to install	#@表示echo命令静默执行
```

大家所期望的`Makefile`的 某些目标。应该总是先浏览，但它的合理预期的目标（或只是做）、安装、清理。

```makefile
all: hello install clean #注释
```



- `make all` - 编译一切，让你可以在本地测试，之前安装的东西。【命令，一般对all的定义放在makefile最前面】
- `make install` - 应安装在正确的地方的东西。但看出来的东西都安装在正确的地方为系统。【命令】
- `make clean` - 应该清理的东西。摆脱的可执行文件，任何临时文件，目标文件等。【命令】

 

<br>

### 4.5 Makefile的隐含规则

该命令应该在所有情况下，我们建立一个可执行x的的源代码`x.cpp`的作为一个隐含的规则，这可以说：

```makefile
.cpp:		#默认规则
	$(CC) $(CFLAGS) $@.cpp $(LDFLAGS) -o $@
```

这种隐含的规则说，如何make c,  x.c 运行x.c 调用输出x。规则是隐式的，因为没有特定的目标提到。它可用于在所有的情况下。

另一种常见的隐含规则的构造 `.o`【对象文件】和 `.cpp` 【源文件】：

```makefile
.o:.cpp	#所有的.o文件都依赖于对应的.cpp文件
	$(CC) $(CFLAGS) -c $<
alternatively

.o:.cpp
	$(CC) $(CFLAGS) -c $*.cpp	#$*代表%之前的部分，即对于main.o对应%.cpp，即对应main
								#$*.cpp <=> main.cpp
```

> 🔺`$^` 表明所有的依赖项

实例：

```makefile
LDFLAGS = -lstdc++

hello: main.o factorial.o hello.o
	$(CC) $^ $(LDFLAGS) -o $@

.o:.cpp functions.h
	$(CC) -c $<

clean:
	-rm *.o hello

install:hello
	@echo "You need build hello!"
	 echo "no @ used"

all:hello install
```



<br>

### 4.6 Makefile 自定义后缀规则

就其本身而言，`make`已经知道，为了创建一个 .o文件，就必须使用 cc-c 相应的c文件。 建成`MAKE`这些规则，可以利用这一点来缩短`Makefile`。如果仅仅只是表示 `.h` 文件的 `Makefile`依赖线，依赖于目前的目标是，MAKE会知道，相应的文件已规定。你甚至不需要编译器包括命令。

这减少了我们的Makefile更多，如下所示：

```makefile
OBJECTS = main.o hello.o factorial.o
hello: $(OBJECTS)
	cc $(OBJECTS) -o hello
hello.o: functions.h
main.o: functions.h
factorial.o: functions.h 
```

 

`Make` 使用一个特殊的目标，故名 `.SUFFIXES`允许你定义自己的后缀。】例如，依赖线：

```makefile
.SUFFIXES: .foo .bar
```

> 告诉`make` ，将使用这些特殊的后缀，以使自己的规则。【用于扩展编译，原用于编译源码】
>

 

如何让 `make` 已经知道如何从 .c 文件生成 .o文件。类似的可以定义规则以下列方式：

```makefile
.foo:.bar
	tr '[A-Z][a-z]' '[N-Z][A-M][n-z][a-m]' < $< > $@
.c:.o
	$(CC) $(CFLAGS) -c $<
```

> 第一条规则允许你创建一个 `.bar` 文件从 `.foo`文件【不要担心它做什么，它基本上打乱文件】
>
> 第二条规则由`.c`文件创建一个 `.o` 文件中使用的默认规则。

> `*` 是一个通配符，用来表示任意的词，可以极大的简化makefile

```makefile
LDFLAGS = -lstdc++

all:hello install

hello:*.cpp *.h
	$(CC) $^ $(LDFLAGS) -o $@

clean:
	-rm *.o hello 

install:hello
	@echo "You need build hello!"
	echo "no @ used"
```



<br>

### 4.7 Makefile 指令

> 有好几种指令以不同的形式，程序可能不支持所有指令。因此，请检查make是否支持指令，我们这里解释。 `GNU make`支持以下指令【`cmake`是被所有的make共同支持】

#### 4.7.1 条件指令

条件的指令

- `ifeq`【指令开始的条件，指定的条件】它包含两个参数，用逗号分隔，并用括号括起。两个参数进行变量替换，然后对它们进行比较。该行的makefile继IFEQ的服从如果两个参数的匹配，否则会被忽略。
- `ifneq`【指令开始的条件，指定的条件】它包含两个参数，用逗号分隔，并用括号括起。两个参数进行变量替换，然后对它们进行比较。`makefile ifneq` 遵守如果两个参数不匹配，否则会被忽略。
- `ifdef`【指令开始的条件，指定的条件】它包含单参数。如果给定的参数为真，则条件为真。
- `ifndef`【指令开始的条件，指定的条件】它包含单参数。如果给定的是假的，那么条件为真。
- `else`指令会导致以下行如果前面的条件未能被遵守。在上面的例子中，这意味着第二个选择连接命令时使用的第一种选择是不使用。它是可选的，在有条件有一个else。
- `endif` 指令结束条件，每一个条件必须与`endif`结束。



**条件式指令的语法**

一个简单的条件，没有其他的语法如下:

```makefile
conditional-directive
	text-if-true
[else
	text-if-false]#可忽略
endif
```

文本如果真，可以是任何行文字，被视为makefile文件的一部分。如果条件是假的，没有文字来代替。

一个复杂的语法条件如下：

```makefile
conditional-directive
	text-if-true
else
	text-if-false
endif
```

如果条件为真时，文本，如果真正的使用，否则，如果假文本来代替。的文本，如果错误的数量可以是任意的文本行。

有条件的指令的语法是相同的，无论是简单或复杂的条件。有四种不同的测试不同条件下的指令。这里是一个表：

```makefile
ifeq (arg1, arg2)
ifeq 'arg1' 'arg2'
ifeq "arg1" "arg2"
ifeq "arg1" 'arg2'
ifeq 'arg1' "arg2" 
```

上述条件相反的指令如下

```makefile
ifneq (arg1, arg2)
ifneq 'arg1' 'arg2'
ifneq "arg1" "arg2"
ifneq "arg1" 'arg2'
ifneq 'arg1' "arg2" 
```



**条件式指令示例**

```makefile
libs_for_gcc = -lgnu
normal_libs =

foo: $(objects)
ifeq ($(CC),gcc)
	$(CC) -o foo $(objects) $(libs_for_gcc)
else
	$(CC) -o foo $(objects) $(normal_libs)	#用于跨平台代码编译
endif
```

 

 <br>

#### 4.7.2 include 指令

`include`指令告诉make：暂停读取当前makefile文件和读取一个或多个其它的makefile，然后再继续。该指令是一行在makefile中，看起来像这样：

```makefile
include filenames...
```

文件名可以包含`shell`文件名模式。允许额外的空格开头的行被忽略，但不允许一个标签。例如，如果有三个`.mk`文件【a.mk | b.mk | c.mk】, 和一个 `$(bar)` 扩展到bash中，然后下面的表达式。

```makefile
include foo *.mk $(bar)	

is equivalent to

include foo a.mk b.mk c.mk bash
```

> 当文件名出现空格，就用双引号包含。

当MAKE处理包括指令，它包含的makefile暂停读取，并从各列出文件中依次读取。当这个过程完成，使include读取指令出现在其中的makefile恢复。

 <br>

#### 4.7.3 override 指令

如果一个变量已经设置的命令参数，在makefile中被忽略的普通任务。如果要设置makefile的变量，即使它被设置的命令参数，可以使用一个override指令，这是一行看起来像这样：

```makefile
override variable = value
or
override variable := value
```

- = 直接赋值
- := 忽略掉之前的赋值

- += 追加

- ?= 如果前面没有定义，则定义生效



 <br>

### 4.8 Makefile 文件重新编译

`make` 程序是一个智能的实用程序，其根据在源文件中的变化而有相应的执行。

如果有四个文件`main.cpp`、`hello.cpp`、`factorial.cpp`和`functions.h`。这里所有reamining文件是依赖`functions.h`，`main.cpp`的是依赖于`hello.cpp` 和 `factorical.cpp`。因此，如果改变`functions.h`，则将重新编译所有源文件来生成新的对象文件。

但是，如果改变`main.cpp`，因为这是不依赖任何其他的过滤，那么在这种情况下，只有`main.cpp`文件将被重新编译，而`hello.cpp` 和 `factorical.cpp`将无法重新编译。

虽然编译一个文件时，MAKE检查目标文件和比较时间表，如果源文件有比目标文件更新的时间戳，则将生成新的对象文件，假设源文件已被改变。



**避免重新编译**

一个项目可能包括成千上万的文件，有时候可能已经改变了一个源文件，但不想重新编译所有依赖于它的文件【比如，假设添加宏到一个头文件或声明，或者仅仅是添加了注释，但很多其他文件依赖该源文件】。假设在头文件中的任何变化需要重新编译所有相关文件，但要知道，他们并不需要重新编译。

如果预期改变头文件的问题之前，可以使用`-t`标志位。这个标志不是告诉make命令运行的规则，而是来标记目标【本质是touch目标，即通过改变特定文件的最后修改日期】。遵循以下步骤：

1. 使用命令make来重新编译真的需要重新编译源文件。
2. 在头文件中进行更改。
3. 使用命令`-t`来记录所有的目标文件为最新。下一次运行make，在头文件中的变化不会引起任何重新编译。

如果已经改变了头文件的时候，有一些文件就需要重新编译，做到这一点已经太晚了。相反，可以使用`-o 文件`的标志，这标志着一个指定的文件作为”old“。遵循以下步骤：

1. 重新编译源文件，需要编制独立的特定头文件的原因，`make -o headerfile`。如果涉及几个头文件，使用一个单独的`-o`选项加每个头文件。
2. `touch`所有目标文件使用`make -t`

<br>

### 4.9 Makefile 其他功能

#### 4.9.1 make 递归使用

递归使用的手段使用，make在makefile作为命令。这种技术是非常有用的，当你想要的makefile各种子系统组成一个更大的系统。例如，假设你有一个子目录，子目录都有其自己的makefile，并且您希望所在目录的makefile中运行make子目录。可以做到这一点如以下：

```makefile
subsystem:
	cd subdir && $(MAKE)	#进入子目录，然后make；make后要记得返回父目录
#【or, equivalently】
subsystem:
	$(MAKE) -C subdir	#编译期间切换目录
```

 可以编写递归复制这个例子只是通过make命令，但有很多事情，了解他们是如何和为什么工作的，以及如何子涉及到顶层make。

<br>

#### 4.9.2 通信变量到子make

顶层make变量的值可以通过环境被传递到子make，通过显式请求。这些变数定义子作为默认值，但不会覆盖子的makefile使用makefile中所指定的，除非使用`-e`开关

向下传递或导出一个变量，变量和其值的环境中运行每个命令添加。子make反过来，make使用环境变量值来初始化它的表格

> 特殊变量`SHELL`和`MAKEFLAGS`总是导出【除非取消导出 | unexport】。MAKEFILES导出，如果把它设置到任何东西。
>

如果想导出特定变量的一个子make，使用导出指令：

```makefile
export variable ...
```

如果想阻止一个变量被导出的，使用撤消导出的指令：

```makefile
unexport variable ...
```

<br>

#### 4.9.3 MAKEFILES 变量

`MAKEFILES`，是环境预定义的宏。其由环境变量的定义，默认为空。

该变量用于make额外的makefile 名称列表（由空格分隔）之前被读取别人认为其值。这很像include指令：不同的目录中查找这些文件。

> MAKEFILES的主要用途是MAKE递归调用之间的通信。但没有必要，最好不用定义和使用该变量

```makefile
LDFLAGS = -lstdc++

all:hello install
	@echo "MAKEFILES=$(MAKEFILES)"	#打印MAKEFILES值

hello:*.cpp *.h
	$(CC) $^ $(LDFLAGS) -o $@

clean:
	-rm *.o hello 

install:hello
	@echo "You need build hello!"
	echo "no @ used"
```

<br>



#### 4.9.4 头文件包含在不同的目录

如果已经把你的头文件在不同的目录，在不同的目录中运行make，那么需要告诉头文件的路径。

在makefile中使用`-I`选项。假设该`functions.h`文件可在`/home/yidaoyun/header`头和其他文件`/home/yidaoyun/src/`

```makefile
INCLUDES = -I "/home/yidaoyun/header"
CC = gcc
LIBS = -lm
CFLAGS = -g -Wall
OBJ = main.o factorial.o hello.o

hello: ${OBJ}
	${CC} ${CFLAGS} ${INCLUDES} -o $@ ${OBJS} ${LIBS}
.o:.cpp
	${CC} ${CFLAGS} ${INCLUDES} -c $< 
```

 

<br>

#### 4.9.5 追加更多的文本变量

通常它用于为已定义的变量的值，添加更多的文字。像这样：

```makefile
objects += another.o
```

这需要值的变量对象，并添加文字`another.o`（前面由一个单一的空间）。因此：

```makefile
objects = main.o hello.o factorial.o
objects += another.o
#设置文件main.o hello.o factorial.o another.o的对象
```

使用`+=`是类似于：

```makefile
objects = main.o hello.o factorial.o
objects := $(objects) another.o
```

 

<br>

#### 4.9.6 Makefile中的续行

在Makefile中，如果不喜欢太长的行，可以使用反斜杠`\`，如下所示：

```makefile
OBJ = main.o factorial.o \
	hello.o
#is equivalent to
OBJ = main.o factorial.o hello.o
```

>  `\`后不能有任何除换行以外的任何字符。
>

<br>

#### 4.9.7 从命令提示符下运行的Makefile

如果已经准备好新的Makefile，使用make -f参数执行自定义而非默认的makefile文件。

```makefile
make -f your-makefile-name
```

**makefile 示例：**这是一个例子编译`hello`程序。此程序包含三个文件`main.cpp`、`factorial.cpp`、`hello.cpp`。

```makefile
# Define required macros here
SHELL = /bin/sh
OBJS = main.o factorial.o hello.o
CFLAG = -Wall -g	#编译参数：开启所有警告 开调试信息
CC = gcc			#默认编译器
INCLUDES =			#没有头文件的路径	或INCLUDES= -I .
LIBS = -lstdc++		#标准输入输出

hello:${OBJ}
	${CC} ${CFLAGS} -o $@ $^ ${LIBS}	#hello 所有依赖 所有库
clean:
	-rm -f *.o hello
.o:.cpp
	${CC} ${CFLAGS} ${INCLUDES} -c $< 
```

现在可以建立hello 程序使用“make”hello项目。如果发出命令“make clean”，则它会删除所有的对象可在当前目录中的生成文件。



<br>

## 五 CMake入门

 

 



<br>

## 六 迷你客户端服务端项目

实现一下聊天系统：结合`Windows`/`Linux`/`Qt`/`MFC` 使用。

 **需求概述**

- 客户端要求使用`Qt`或者`MFC` 界面实现功能（建议用`QT`写）
- 服务端搭建在`Linux`环境中，使用**select**模型或者**epoll**模型来实现群聊服务器

 **服务器端功能需求**

- 服务器能够选择端口号并且启动服务器端的 TCP 服务，等待客户端的 Socket 连接。
- 服务器能够接受多个客户端的请求，并且能够识别不同的客户端。为每个客户端建立唯一的身份表示。
- 连接成功后，服务器能接收客户端发过来的文本信息并显示并且转发给客户端。
- 服务器端能够显示本机的地址和状态。

**客户端功能需求**

-  用户可以通过指定主机地址和端口号连接指定的服务器。用户在连接过程中选择 TCP 协议进行连接。

-  实现消息收发，用户能够通过界面发送消息，并且能通过界面显示服务端发送过来的信息。
- 实现文件传输功能，可以传文件到群里，其他人可以选择是否下载，点击下载就会将文件下载到本地

 

🔺第一版服务端代码如下：

```c++
#include <cstdio>
#include <stdio.h>
#include <stdlib.h>

#include <sys/socket.h>// socket
#include <arpa/inet.h>// sockaddr_in
#include <cstring>// memset
#include <unistd.h>// close
#include <errno.h>//errno
#include <sys/epoll.h>//epoll

#include <string>
#include <ctime>
#include <fstream>
#include <iostream>

class User
{
private:
	int userID;
	char userName[21];
	int clnt_socket;

public:
	User(int id, const char* name, int clnt)
	{
		userID = id;
		clnt_socket = clnt;

		memset(userName, 0, sizeof(userName));
	}
	int getClntSocket()
	{
		return clnt_socket;
	}
	int getUid()
	{
		return userID;
	}
	const char* getUserName()
	{
		return userName;
	}
	void setUserName(const char* name)
	{
		strncpy(userName, name, 20);
	}
};


class FileList
{
private:
	// 指向字符指针的指针，用于存储字符串指针数组
	char** m_fileNameList;
	int m_size;
	int m_curCount;

public:
	explicit FileList(int size)
	{
		m_size = size;
		m_curCount = 0;
		m_fileNameList = new char* [size];
		for(int i = 0; i < size; i++)
		{
			m_fileNameList[i] = nullptr;
		}
	}
	~FileList()
	{
		for(int i = 0; i < m_size; i++)
		{
			if(m_fileNameList[i] != nullptr)
			{
				delete m_fileNameList[i];
			}
			else
			{
				break;
			}
			delete m_fileNameList;
		}
	}
	bool isFull() const
	{
		return m_size == m_curCount;
	}
	bool isRepeat(const char* fileName) const
	{

		for(int i = 0; i < m_curCount; i++)
		{
			//if(m_fileNameList[i] == nullptr)
			//	break;
			//printf("cmp:%s === %s\n", fileName, m_fileNameList[i]);
			if(strcmp(m_fileNameList[i], fileName) == 0)
			{
				return true;
			}
		}
		return false;
	}
	int getCount() const
	{
		return m_curCount;
	}
	const char* getFileName(int index) const
	{
		return m_fileNameList[index];
	}
	void insertFileName(char* fileName)
	{

		for(int i = 0; i < m_size; i++)
		{
			if(m_fileNameList[i] == nullptr)
			{
				m_fileNameList[i] = new char[25];
				strcpy(m_fileNameList[i], fileName);
				break;
			}
		}
		m_curCount += 1;
	}
	void deleteFileName(const char* fileName)
	{
		int index{ 0 };
		while(index < m_size)
		{
			if(strcmp(fileName, m_fileNameList[index]) == 0)
			{
				delete m_fileNameList[index];
				m_fileNameList[index] = nullptr;
				break;
			}
			index += 1;
		}
		m_curCount -= 1;
		while(index < m_size - 1)
		{
			if(m_fileNameList[index + 1] == nullptr)
			{
				break;
			}
			else
			{
				m_fileNameList[index] = m_fileNameList[index + 1];
			}
			index += 1;
		}
		m_fileNameList[m_size - 1] = nullptr;
	}
};


void init_server();
void client();
void generateResFileList(char*, const FileList&, size_t);

int main(int argc, char* argv[])
{
	if(strcmp(argv[1], "s") == 0)
	{
		init_server();
	}
	else
	{
		client();
	}

	printf("%s(%d):%s OVER!\n", __FILE__, __LINE__, __FUNCTION__);
	return 0;
}



void init_server()
{
	int serv_sock, client_sock;
	struct sockaddr_in serv_addr, clnt_addr;
	socklen_t clnt_adr_sz = sizeof(clnt_addr);

	// 初始化TCP socket，绑定端口，监听连接
	serv_sock = socket(PF_INET, SOCK_STREAM, 0);
	if(serv_sock < 0)
	{
		printf("Create socket failed!");
		return;
	}

	memset(&serv_addr, 0, sizeof(serv_addr));
	serv_addr.sin_family = AF_INET;
	serv_addr.sin_port = htons(8080);
	serv_addr.sin_addr.s_addr = htonl(INADDR_ANY);
	serv_addr.sin_port = htons(9527);
	if(bind(serv_sock, (sockaddr*)&serv_addr, sizeof(serv_addr)) == -1)
	{
		printf("Bind error %d %s", errno, strerror(errno));
		close(serv_sock);
		return;
	}

	if(listen(serv_sock, 5) == -1)
	{
		printf("Listen error %d %s", errno, strerror(errno));
		close(serv_sock);
		return;
	}

	// 业务相关
	// 已连接的客户端
	User* userList[100] = { nullptr };
	// 已上传的文件名
	FileList fileManage = FileList(3);

	//Epoll
	int epfd, event_cnt;//Epoll文件描述符，事件数量标记
	char buffer[1024] = "";
	if((epfd = epoll_create(1)) == -1)
	{
		printf("Epoll error %d %s", errno, strerror(errno));
		close(serv_sock);
		return;
	}

	epoll_event event;//Epoll事件
	epoll_event* all_event = new epoll_event[100];//创建100个epoll空闲事件
	event.events = EPOLLIN;
	event.data.fd = serv_sock;
	// 开启监听：新增对服务端socket的监听
	epoll_ctl(epfd, EPOLL_CTL_ADD, serv_sock, &event);

	while(true)
	{
		//event_cnt = epoll_wait(epfd, all_event, 100, 1000);//timeout=-1表示无限等待
		event_cnt = epoll_wait(epfd, all_event, 100, 1000 * 1);//timeout=-1表示无限等待
		if(event_cnt == -1)
		{
			printf("Epoll error %d %s", errno, strerror(errno));
			break;
		}
		if(event_cnt == 0)continue;
		for(int i = 0; i < event_cnt; i++)
		{
			// 对服务器端的请求
			if(all_event[i].data.fd == serv_sock)
			{
				client_sock = accept(serv_sock, (sockaddr*)&clnt_addr, &clnt_adr_sz);
				event.events = EPOLLIN;
				event.data.fd = client_sock;
				epoll_ctl(epfd, EPOLL_CTL_ADD, client_sock, &event);

				printf("client is connected!%d\n", client_sock);
				// 为客户端分配四位数字ID，写入并保存
				// 设置随机数种子，使用当前时间作为种子
				std::srand(static_cast<unsigned int>(std::time(nullptr)));
				int randomNumber = 0;
				bool noRepeat = false;
				// 确保uid不重复
				while(!noRepeat)
				{
					// 生成 1000 到 9999 之间的随机数
					randomNumber = 1000 + std::rand() % 9000;
					for(int j = 0; j < 100; j++)
					{
						if(userList[j] == nullptr)
						{
							noRepeat = true;
							break;
						}
						else if(userList[j]->getUid() == randomNumber)
						{
							break;
						}
					}
				}
				User* newUser = new User(randomNumber, "###", client_sock);
				for(int j = 0; j < 100; j++)
				{
					if(userList[j] == nullptr)
					{
						userList[j] = newUser;
						// 转为字符数组发送给客户端
						memset(buffer, 0, sizeof(buffer));
						memcpy(buffer, "*@#USERID=", 10);
						std::string numStr = std::to_string(randomNumber);
						std::strncpy(buffer + 10, numStr.c_str(), 4);
						//printf("ssssss:%s\n", buffer);
						write(client_sock, buffer, sizeof(buffer));

						break;
					}
					else if(j == 99)
					{
						printf("拒绝服务，超过服务上限！\n", client_sock);
						epoll_ctl(epfd, EPOLL_CTL_DEL, all_event[i].data.fd, NULL);
						close(all_event[i].data.fd);
						printf("client is closed!%d\n", client_sock);
					}
				}

			}
			else
			{
				//必定是客户端
				int client = all_event[i].data.fd;
				memset(buffer, 0, sizeof(buffer));
				ssize_t str_len = read(client, buffer, sizeof(buffer));

				if(str_len <= 0)
				{
					epoll_ctl(epfd, EPOLL_CTL_DEL, client, NULL);
					close(all_event[i].data.fd);
					printf("client is closed!%d\n", client);

					// 删除在线用户
					for(int i = 0; i < 100; i++)
					{
						if(userList[i] && userList[i]->getClntSocket() == client)
						{
							delete userList[i];
							userList[i] = nullptr;
						}
					}
				}
				else
				{
					// 回声服务器
					//write(all_event[i].data.fd, buffer, str_len);

					char prefix_name[13] = "*@#USERNAME=";
					char prefix_file[13] = "#FILENAME=";
					char prefix_updateFileList[12] = "#FILELIST?=";
					char prefix_downFile[12] = "#REQ-FILE=";
					char prefix_deleteFile[12] = "#REQ-DFILE=";
					// 【消息类型】用户名更新
					if(strncmp(prefix_name, buffer, strlen(prefix_name)) == 0)
					{
						for(int j = 0; j < 100; j++)
						{
							if(userList[j]->getClntSocket() == client)
							{
								userList[j]->setUserName(buffer + 12);
								break;
							}
						}
					}
					else if(strncmp(prefix_file, buffer, strlen(prefix_file)) == 0)
					{
						// 格式："#FILENAME=" + 文件名 + "@*#"
						// 用户上传文件
						char fileName[25] = "";

						// 使用 strstr 函数查找目标字符串
						char* flagPtr = std::strstr(buffer, "@*#");
						ssize_t len_pf{ (ssize_t)strlen(prefix_file) }, len_fn;
						memcpy(fileName, buffer + len_pf, flagPtr - buffer - len_pf);
						// +3为约定，@*#为分割文件名与文件内容
						len_fn = (ssize_t)strlen(fileName) + 3;
						printf("fileName-1:%s，%d\n", fileName, fileManage.isRepeat(fileName));

						// 确保文件名不重复
						char* nameBuff = new char[25];
						strcpy(nameBuff, fileName);
						int num = 1;
						while(fileManage.isRepeat(nameBuff))
						{
							std::string str = std::to_string(num);
							str = "(" + str + ")";
							strcpy(nameBuff + strlen(fileName), str.c_str());
							num += 1;
						}
						strcpy(fileName, nameBuff);
						printf("fileName:%s\n", fileName);

						// 写入文件
						if(!fileManage.isFull())
						{
							std::ofstream file(fileName, std::ios::binary);
							if(!file.is_open())
							{
								std::cerr << "Failed to open file for writing" << std::endl;
								// 拒绝接受
								memset(buffer, 0, sizeof(buffer));
								const char* str = "#WARN=2";
								strncpy(buffer, str, strlen(str));
								write(client, buffer, strlen(buffer));
								return;
							}
							//printf("开始4：%s\n", buffer + len_pf + len_fn);
							// 文件结束标志
							char suffix[6] = "@END@";
							flagPtr = std::strstr(buffer, suffix);

							if(flagPtr == nullptr)
							{
								file.write(buffer + len_pf + len_fn, str_len - len_pf - len_fn);
							}
							else
							{
								file.write(buffer + len_pf + len_fn, str_len - len_pf - len_fn - strlen(suffix));
							}

							if(!file.good())
							{
								std::cerr << "Failed to write to file" << std::endl;
								file.close();
								return;
							}
							//memset(buffer, 0, sizeof(buffer));
							// 套接字的 read 函数默认工作在阻塞模式下。
							// 当调用 read 函数时，若套接字的接收缓冲区中没有数据，read 函数会暂停当前线程的执行，进入阻塞状态，一直等到有新的数据到达或者发生错误，或者连接被关闭。
							/*while((str_len = read(client, buffer, sizeof(buffer))) > 0)
							{
								file.write(buffer, str_len);
								if(!file.good())
								{
									std::cerr << "Failed to write to file" << std::endl;
									break;
								}
							}*/

							while(flagPtr == nullptr)
							{
								// 还有后续文件数据
								str_len = read(client, buffer, sizeof(buffer));
								file.write(buffer, str_len);
								if(!file.good())
								{
									std::cerr << "Failed to write to file" << std::endl;
									return;
								}
								flagPtr = std::strstr(buffer, suffix);
							}
							file.close();
							// 保存文件名
							fileManage.insertFileName(fileName);
							// 报告上传成功
							memset(buffer, 0, sizeof(buffer));
							const char* str = "#INFO=1";
							strncpy(buffer, str, strlen(str));
							write(client, buffer, sizeof(buffer));

							// 广播更新客户端文件列表
							generateResFileList(buffer, fileManage, sizeof(buffer));
							for(int j = 0; j < 100; j++)
							{
								if(userList[j] != nullptr)
								{
									write(userList[j]->getClntSocket(), buffer, sizeof(buffer));
								}
								else
								{
									break;
								}
							}
						}
						else
						{
							// 本次文件数量太多，无法容纳
							memset(buffer, 0, sizeof(buffer));
							const char* str = "#WARN=1";
							strncpy(buffer, str, strlen(str));
							write(client, buffer, strlen(buffer));
						}
					}
					else if(strncmp(prefix_updateFileList, buffer, strlen(prefix_updateFileList)) == 0)
					{
						// 客户端请求文件名列表
						// 传输格式（以#FILELIST=为开头）：文件列表，以#@#分割
						generateResFileList(buffer, fileManage, sizeof(buffer));
						write(client, buffer, sizeof(buffer));
					}
					else if(strncmp(prefix_downFile, buffer, strlen(prefix_downFile)) == 0)
					{
						// 客户端下载文件
						// 请求格式："#REQ-FILE="+FILENAME
						char fileName[21] = "";
						strcpy(fileName, buffer + 10);
						printf("fileName:%s\n", fileName);

						// 判断文件是否存在
						if(fileManage.isRepeat(fileName))
						{
							// 读取并传输给客户端
							char prefix[30] = "#RES-FILE=";
							const char spilt_str[4] = "#@#";
							strcpy(prefix + strlen(prefix), fileName);
							strcpy(prefix + strlen(prefix), spilt_str);
							memset(buffer, 0, sizeof(buffer));
							strcpy(buffer, prefix);

							FILE* file = fopen(fileName, "rb");
							if(file == nullptr)
							{
								std::cerr << "无法打开文件: " << fileName << std::endl;
								return;
							}

							size_t bytesRead;
							while((bytesRead = fread(buffer + strlen(buffer), 1, sizeof(buffer), file)) > 0)
							{
								if(write(client, buffer, strlen(buffer)) == 0)
								{
									break;
								}
							}
							fclose(file);
						}
						else
						{
							std::cerr << "Failed to find this file!" << std::endl;
						}
					}
					else if(strncmp(prefix_deleteFile, buffer, strlen(prefix_deleteFile)) == 0)
					{
						// 客户端删除共享文件
						// 请求格式："#REQ-DFILE="+FILENAME
						char fileName[21] = "";
						strcpy(fileName, buffer + 11);
						printf("DELETE fileName:%s\n", fileName);

						// 判断文件是否存在
						printf("curCount=%d,%d\n", fileManage.getCount(), fileManage.isRepeat(fileName));
						/*for(int i = 0; i < fileManage.getCount(); i++)
						{
							printf("%s\n", fileManage.getFileName(i));
						}*/

						if(fileManage.isRepeat(fileName))
						{
							// 删除文件
							if(std::remove(fileName) == 0)
							{
								std::cout << "文件删除成功: " << fileName << std::endl;

								fileManage.deleteFileName(fileName);
								printf("数量：%d\n", fileManage.getCount());
							}
							// 广播文件列表的变化
							generateResFileList(buffer, fileManage, sizeof(buffer));
							write(client, buffer, strlen(buffer));
						}
						else
						{
							std::cerr << "Failed to find this file!" << std::endl;
						}
					}
					else
					{
						// 广播
						for(int j = 0; j < 100; j++)
						{
							if(userList[j] != nullptr)
							{
								//printf("%s,%d\n", buffer, str_len);
								int otherUser = userList[j]->getClntSocket();
								if(otherUser != client)
								{
									write(otherUser, buffer, str_len);
								}
							}
							else
							{
								break;
							}
						}
					}
				}
			}
		}//for-end
	}//while-end
	delete[] all_event;
	close(serv_sock);
	close(epfd);
}

void client()
{
	int clnt_sock = socket(PF_INET, SOCK_STREAM, 0);

	struct sockaddr_in serv_addr;
	memset(&serv_addr, 0, sizeof(serv_addr));
	serv_addr.sin_family = AF_INET;
	serv_addr.sin_addr.s_addr = inet_addr("127.0.0.1");
	serv_addr.sin_port = htons(9527);

	if(connect(clnt_sock, (sockaddr*)&serv_addr, sizeof(serv_addr)) == -1)
	{
		printf("Connect error %d %s", errno, strerror(errno));
		close(clnt_sock);
		return;
	}

	char message[256] = "";
	while(true)
	{
		printf("Input message:(Q to quit)");
		fgets(message, sizeof(message), stdin);
		if((strcmp(message, "q\n") == 0) || (strcmp(message, "Q\n") == 0))
			break;

		write(clnt_sock, message, strlen(message));

		memset(message, 0, sizeof(message));
		read(clnt_sock, message, sizeof(message));
		printf("From server:%s", message);
	}
	close(clnt_sock);
}

void generateResFileList(char* buffer, const FileList& fileManage, size_t size)
{
	// 客户端请求文件名列表
	// 传输格式（以#FILELIST=为开头）：文件列表，以#@#分割
	const char* part1 = "#FILELIST=";
	const char* part2 = "#@#";
	size_t pos = 0;
	size_t curCount = (size_t)(fileManage.getCount());
	memset(buffer, 0, size);
	strcpy(buffer, part1);
	pos += strlen(part1);

	for(size_t i = 0; i < curCount; i++)
	{
		const char* file_str = fileManage.getFileName(int(i));
		strcpy(buffer + pos, file_str);
		pos += strlen(file_str);
		if(i < curCount - 1)
		{
			strcpy(buffer + pos, part2);
			pos += strlen(part2);
		}
	}
}
```

值得注意的点如下：

- 向客户端Socket写入时，如果只写入 `strlen(buffer)` 大小，会出现莫名的问题，很形象但不知道真的是否称为”粘包问题“。
- 应熟练使用库函数，如内存操作 memset、memcpy等，字符串操作如strcpy、strcmp，string内置库函数等。
- 进一步修改的思路在于：在传输大文件时能否同时发送消息，即多线程。