---
title: Python之路
description: 记录 Python 从入门到进阶的学习历程。
urlname: python-route
date: 2023-07-19 11:21:49
tags:
  - Python
categories:
  - AI
draft: false
---

> [!tip] 关于Python学习，每遇未知点即记录！
> 
> [廖雪峰Python教程](https://www.liaoxuefeng.com/wiki/1016959663602400/1016959735620448)
> 
> [Python 3.14 文档]([https://docs.python.org/zh-cn/3/](https://docs.python.org/zh-cn/3/tutorial/index.html))
> 





# 一 Python常用操作

## 1 Python环境变量相关

如何找到Python的安装路径：

```python
# 在Python 编辑器中
import sys
sys.path
```


## 2 查看python包的代码

**方法一**：

```python
from d2l import torch as d2l
with open(d2l.__file__,'r') as f:
    print(f.read())
```

**方法二：jupyter专用方法**

```python
# 包名/函数名??
# eg:
d2l??
```

**方法三：通用方法（命令行、pycharm、jupyter均可使用）**

```python
from torch.utils.data import Dataset
help(Dataset)
```

<br>

## 3 Pycharm安装第三方库

> 参考[此处](https://cloud.tencent.com/developer/article/2121412)

#### 方法一：利用pycharm自带功能进行安装

即 `file  -> Settings -> Project untitled -> Project Interpreter-> 点击右边加号 -> 搜索期望安装的第三方库` ，然后  点击左下角的`待installing`完毕后便安装成功了，之后可以在搜索库的界面利用加减号管理自己的库

#### 方法二：利用pip进行安装

- 下载最新版本的python之后都会自动为我们下载pip,在python文件夹下的Scripts文件夹里面

- `pip -v` 查看相关信息

- 安装：【cmd窗口输入】 `pip install 包/模块名`，如 `pip install requests`

#### 方法三：自行下载相关whl文件

- 安装wheel：在cmd窗口运行如下语句：`pip install wheel`
- 在此[站点](http://www.lfd.uci.edu/~gohlke/pythonlibs/)中下载自己需要的whl文件并解压到`Python/Lib/site-packages`中
- 在cmd窗口运行  `pip install 带.whl文件的路径`


# 二 Pycharm提速

## 1 Pycharm 快捷键

| 按键           | 作用           | 补充描述                                                 |
| -------------- | -------------- | -------------------------------------------------------- |
| Ctrl + /       | 注释           | 单行注释                                                 |
| Ctrl + Alt + L | 统一格式       | 即将选中的内容进行格式处理，自动修正一些格式不正确的位置 |
| Ctrl + D       | 复制并粘贴该行 |                                                          |
| Ctrl + Y       | 删除行         |                                                          |
|                |                |                                                          |
|                |                |                                                          |


# 三 常见报错

## 1 [无法读取shape属性](https://wenku.csdn.net/answer/bb3efc0cb6f14a2cb50dda1150918b32)

```
AttributeError: 'tuple' object has no attribute 'shape'
```

该错误说明正在尝试对一个元组类型的变量调用shape属性，但是元组类型并没有这个属性。【`tuple`：元组】

- `shape`属性是`numpy`数组对象的属性，如果你想要获得一个`numpy`数组长度，可以使用`shape`属性
- 如果变量不是`numpy`数组，可以使用`Python`内置函数`len()`来获取变量的长度

```python
my_tuple = (1, 2, 3, 4, ,5)
my_list = [1, 2, 3, 4, ,5]
my_str = "hello world"

print(len(my_tuple)) # 输出5
print(len(my_list)) # 输出5
print(len(my_str)) # 输出11
```

<br>

## 2 语法错误：文件读取失败

```
SyntaxError: (unicode error) 'unicodeescape' codec can't decode bytes in position 2-3: truncated \UXXXXXXXX escape
```

引起这个错误的原因就是转义的问题。

**原因分析**：在`windows`系统当中读取文件路径可以使用`\`,但是在`python`字符串中`\`有转义的含义，

如`\t`可代表TAB，`\n`代表换行，所以我们需要采取一些方式使得`\`不被解读为转义字符。目前有3个解决方案

- 在路径前面加`r`，即保持字符原始值的意思。

```python
sys.path.append(r'c:\Users\mshacxiang\VScode_project\web_ddt')
```

- 替换为双反斜杠

```python
sys.path.append('c:\\Users\\mshacxiang\\VScode_project\\web_ddt')
```

- 替换为正斜杠

```python
sys.path.append('c:/Users/mshacxiang/VScode_project/web_ddt')
```

<br>

## 3 浮点转字符串错误

```python
pi = 3.14
print("pi值=" + pi)

#类型不一样引起的问题
TypeError: can only concatenate str (not "float") to str
```

**方法1: 转换类型**

```python
pi = 3.14
print("当前的p=" + str(pi))
```

**方法2：使用字符串格式化**

```python
pi = 3.14
print("当前的p= %.2f" % pi)  # %s 是格式化字浮点数并指定2为数
```

python 字符串格式化符号:

```text
   	  %c	 格式化字符及其ASCII码
      %s	 格式化字符串
      %d	 格式化整数
      %u	 格式化无符号整型
      %o	 格式化无符号八进制数
      %x	 格式化无符号十六进制数
      %X	 格式化无符号十六进制数（大写）
      %f	 格式化浮点数字，可指定小数点后的精度
      %e	 用科学计数法格式化浮点数
      %E	 作用同%e，用科学计数法格式化浮点数
      %g	 %f和%e的简写
      %G	 %F 和 %E 的简写
      %p	 用十六进制数格式化变量的地址
```

<br>

## 4 包安装错误

```cmd
RemoveError: 'requests' is a dependency of conda and cannot be removed from conda's operating enviro

# 在下载 palettable 包过程中，pycharm默认适用conda下载
# palettable：python绘图着色
```

这种错误出现的原因是 ：`requests` 包是用`pip` 安装的，而如果你再用`canda` 安装其他有关包时便会触发此错误，可以使用 `conda list`  查看安装包的信息

**解决办法：**

- 使用`pip uninstall packagename`  卸载有关包，不建议使用这种，会引发其他的错误
- 使用 `pip install packagename`  命令安装有关包
  
