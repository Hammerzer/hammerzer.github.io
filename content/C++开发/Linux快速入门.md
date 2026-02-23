---
title: Linux快速入门
date: 2024-04-13 13:00:49
urlname: Linux-Quick-Start
tags:
  - 操作系统与框架
  - CPP
  - Linux
categories: C++开发
description: Linux快速入门
draft: false
---

# 〇 目录

- `Ubuntu`问题
- `Linux` 简介
- `Linux` 开发入门
	  1. 开发环境搭建
	  2. 创建Linux控制台项目
	  3. Linux标准库函数
	  4. 网络编程基础
	  5. linux系统编程：进程
	  6. linux系统编程：线程
	  7. I/O复用
- 动态库项目【Linux快速入门2】
<br>

# 一  `Ubuntu`问题

## 1 安装虚拟机

### 1.1 安装步骤

> 安装虚拟机：[参考原文](https://zhuanlan.zhihu.com/p/38797088)  虚拟机下载VM16【公众号：软件科技汇】

- 下载`VMware Workstation Pro 16`

- 虚拟机`ubuntu`镜像，我这里下载的是`Ubuntu 18.04`[下载地址](https://ubuntu.com/download/desktop)
- 在`VMware`中创建虚拟机【详细步骤见[参考原文](https://zhuanlan.zhihu.com/p/38797088) | [简易安装](https://blog.csdn.net/qq_34028816/article/details/141558433)】

> `Ubuntu.vmdk`文件：虚拟机磁盘文件



<br>



### 1.2 关于VMware的一些问题

#### 1.2.1 解决虚拟启动问题【关于BIOS设置】

一般在`Advanced、Security、BIOS Features、Configuration`下面，找到`Intel Virtualization Technology`按回车键选择Enabled，表示开启。

进入`BIOS`之后选择某个选项按`Enter`是进入，按`Esc`是返回，按`F10`或`F4`保存。

> 联想拯救者怎么进入`bios`？
>
> 1、联想拯救者在开机或重启状态下，在开机等待界面，连续按快捷键`F2`（或是`Fn+F2`）即可进入`bios`。
>
> 2、`nova`孔是联想拯救者快捷进入bios的方式之一，而且不仅是联想拯救者系列，联想旗下多个系列的产品都设置有该功能。用户在笔记本侧边找到`nova`孔，用针或牙签刺入，即可调出快捷菜单。选择`bios`进入即可【右侧`USB`孔旁】

<br>

#### 1.2.2 解决虚拟启动问题【关于BIOS设置已完成】

如果打开BOIS中的设置之后，依然报错：

```bahs
此平台不支持虚拟化的 Intel VT-x/EPT。 不使用虚拟化的 Intel VT-x/EPT,是否继续
```

可以参考[此处](https://huaweicloud.csdn.net/63560df1d3efff3090b590d1.html)

<br>

#### 1.2.3 相关组合键

```shell
Ctrl + Alt +Enter 虚拟机全屏
```



<br>

#### 1.2.4 新版本的VM无法完成安装VM-Tool的解决办法

> [参考此处](https://blog.csdn.net/junjun6022/article/details/140083298)

在`VMware Workstation 17 pro`版本(个人版)的虚拟机中安装完`Ubuntu 22.04`版本后，发现VMware Tools安装选项为灰色无法安装。

> 在版本 10.3.10(VMware Tools) 中停止提供适用于 Linux 虚拟机的 VMware Tar 工具的功能，因此 Workstation Player 中包含的 tar 工具 (linux.iso) 是 10.3.10，且不会进行更新。由于此更改， 安装/更新/重新安装 VMware Tools 菜单不可用于以下 Linux 虚拟机。
>

① 解决方案一（不可行）：

关闭客户机后，启动客户机，“安装VMware Tools”选项在启动过程中是可以点击的。此时虚拟机底部会提示登录系统后，在任务栏会发现多出一个磁盘图标，表示VMware Tools挂载成功了。



② 解决方案二：

1. 关闭客户机，打开“虚拟机”->“设置”，在“硬件”->“`CD/DVD(SATA)`”中选择“使用ISO映像文件”。
2. 加载`linux.iso`文件 （`linux.iso`文件在VMware Workstation的安装目录，也可根据VM的提示直接下载）。
3. 设置好后关闭设置，启动客户机，登录系统后，在任务栏会加载VMware Tools的磁盘图标。





<br>

## 2 关于Ubuntu遇到的问题

### 2.1 屏幕显示大小调整

> 屏幕显示大小调整： 设置→`Devices`→`Displays`→`Resolution`

<br>

### 2.2 初始su密码错误

> [原文](https://www.yii666.com/article/605608.html?action=onAll)解决

`Ubuntu`刚安装后，在终端中运行`su`命令要求输入密码，出现密码错误。

原因：`root`没有默认密码，需要手动设定。以安装`ubuntu`时输入的用户名登陆，该用户在`admin`组中，有权限给`root`设定密码

```
sudo passwd [root] 或者 sudo passwd
#Enter后输入原始密码，新密码和确认密码

#退出root
exit  |  Ctrl+D
```

<br>

### 2.3 Ubuntu上修改主机名

> [原文](https://www.python100.com/html/75774.html)

- 方法一：修改文件【需要先获取root权限】

  ```
  $ gedit /etc/hostname
  $ gedit /etc/hosts
  ```

- 方法二：hostname文件的修改可使用命令完成【需要先获取root权限】

  ```
  hostnamectl set-hostname new-hostname
  ```


<br>

### 2.4 Ubuntu安装一直卡黑屏

> [解决原文](https://blog.csdn.net/weixin_42081389/article/details/104072902)

```
 Please remove the installation medium then reboot
 #Ubuntu 18.04 一直卡在黑屏
 #解决：编辑虚拟机设置 → CD/DVD...关闭启动时连接
 #注意：首次安装需打开以上设置
```



### 2.5 修改最佳`apt`下载服务器

> 可参考[此](https://jingyan.baidu.com/article/c1a3101eee72e79f646deb3d.html)

- `Ubuntu18.04`：打开`Software and Update`（左下角All Software），直接`stop`其自动检查，就会出现设置

<br>

### 2.6 错误：无法得到锁

**问题：**新搭建的`Ubuntu`虚拟机，执行apt安装命令是报错`could not get lock /var/lib/dpkg/lock-frontend`

**问题原因：**存在另外一个进程在使用这个目录：`/var/lib/dpkg/lock-frontend`，【比如，正在更新软件`Cache`】。所以先确定是否还有其他人在使用软件管理程序或者在使用`apt`进行软件的安装，如果没有的话，可以直接删除/重命名被锁定的文件。

**解决：**

```
sudo rm /var/lib/dpkg/lock-frontend
sudo rm /var/lib/dpkg/lock
```

<br>

### 2.7 Ubuntu打开终端时自动退出base环境

```
conda config --set auto_activate_base false
```

<br>

### 2.8 解压提取VMware-Tool时报错

```bash
Not enough free space to extract VMwareTools
```

原因：不能在安装的文件夹中解压。

解决办法：将`VMwareTools-10.3.2-9925305.tar.gz`**复制到另一个文件夹中再提取**即可。

> 或者，尝试双击打开 `.gz` 文件，再点击 `Extract` 提取。

<br>

### 2.9 虚拟机内容到Windows

```bash
#路径【共享文件】
/mnt/hgfs/VM-share/...
#对应的windows路径
D:\Software\VMwareUbuntu\VM-share
```

1. 在VMware设置共享文件夹：右键单击对应虚拟机——>选项——>共享文件夹——>启用

2. 虚拟机中找到 `/mnt/hgfs` 目录：`Other Locations` -> `Computer` -> `mnt` -> `hgfs`

   > 如果没有hgfs文件夹，就用下列命令创建
   >
   > ```BASH
   > sudo mkdir -p /mnt/hgfs
   > ```

3. 将 `/mnt/hgfs` 目录的写权限授予所有用户：`sudo chmod a+w /mnt/hgfs`

4. 将 VMware 主机上的共享文件系统挂载到虚拟机中的 `/mnt/hgfs` 目录下：`vmhgfs-fuse .host:/ /mnt/hgfs/`
   

<br>

### 2.10 安装软件包时无法找到源

```
Package gcc is not available, but is referred to by another package.
This may mean that the package is missing, has been obsoleted, or
is only available from another source
```

**解决：**按 2.5 设置最佳源后，在root模式下，执行 `apt update` 解决。

<br>

### 2.11 Ubuntu启动卡住

重启后卡在`Started GNOME Display Manager`不动，记录解决办法。参考[此处](https://blog.csdn.net/weixin_43990097/article/details/137649700)。

Ubuntu突然出现了一个问题：每次开机不到5分钟，随便点击一下浏览器或者其他的地方就会卡住，但是鼠标可以移动，就是无法点击，而且等待一段时间后会出现黑屏然后提示。此问题同理，参考[此处](https://blog.csdn.net/guoyihaoguoyihao/article/details/104494025)。

其实本来就是为了学习而安装，暂未找到解决方案【目前重新安装，且分区自动分配】。



<br>

### 2.12 Ubuntu版本问题

> 注意：`Ubuntu-18.04.1-desktop-amd64.iso` 有问题，替换为 `18.04.6` 可以解决很多问题。

<br>

### 2.13 Ubuntu获取ip

① 使用 `ifconfig` 命令：`ifconfig` 是一个老牌的网络配置工具，它能显示网络接口的详细信息，包括 IP 地址。可以通过以下命令获取：

```bash
ifconfig

# 安装 ifconfig
sudo apt-get install net-tools
```


② 使用 `ip` 命令：`ip` 命令是 `ifconfig` 的现代替代品，提供了更多功能。可以通过以下命令查看 IP 地址：

```bash
ip addr show
```



③ 网络配置：Ubuntu 系统中，`/etc/network/interfaces` 文件用于配置网络接口。可以在此文件中配置静态 IP 地址。

例如，配置 eth0 接口使用静态 IP 地址：

```bash
auto eth0
iface eth0 inet static
address 192.168.1.100
netmask 255.255.255.0
gateway 192.168.1.1
dns-nameservers 8.8.8.8 8.8.4.4
```



<br>

## 3 Ubuntu 分区号Sda的解释

> [参考原文](https://blog.csdn.net/Ftworld21/article/details/15707417?locationNum=8)

**主分区**：一块物理硬盘上可以被独立使用的一部分，一个硬盘最多可以有**4个主分区**

**扩展分区**：为了突破一个物理硬盘只能有4个分区的限制，引入了扩展分区。扩展分区和主分区的地位相当，但是扩展分区本身不能被直接使用，然而可以被继续划分成多个逻辑分区。

**逻辑分区**：逻辑分区可以有任意多个，但是不能独立存在，多个连续的逻辑分区可做为一个扩展分区。一个硬盘只能有一个扩展分区。

**总结**：也就是说，在一个物理硬盘上主分区和扩展分区加在一起**最多仍然只有4个**。但是扩展分区可以继续被划分成逻辑分区，而对多数用户而言，其实主分区和逻辑分区在使用上是没什么区别的。这样就达到了一快硬盘几乎可以有无限个分区的目的。

**`LINUX`下分区实例分析：**

现在电脑上有一个`SCSI`硬盘，这时查看设备`ls /dev`，会发现有一个`sda`，如果是`IDE`硬盘，就是`hda`。

- 分区方案一：4个主分区【这时候能看到：`sda,sda1,sda2,sda3,dsa4`】

- 分区方案二：一个主分区然后一个逻辑分区【这时候能看到：`sda,sda1,sda2,sda5`】

  这里`sda`是物理硬盘，`sda1`是主分区，`sda2`是扩展分区，`sda5`是逻辑分区（正是因为必须保留4个数字给主分区和扩展分区使用，所以逻辑分区的数字必须从5开始）。

- 分区方案三：一个逻辑分区
  这里能看到：sda，sda1，sda5
  见到这些数字不要害怕，这样一解释就很容易理解了。如果有多块物理硬盘就会出现sdb，sdc



<br>

## 4 Ubuntu快捷键

### 4.1 操作系统快捷键和命令

```
Ctrl + Alt + T 快速打开终端
Ctrl + Shift + W 关闭终端
Ctrl + L 快速清除终端屏幕

Alt + Tab 切换程序
Alt + Tab + Shift 逆向切换程序
Alt +F4 关闭窗口

Alt + F2 打开命令窗口，可输入命令启动应用程序，如gedit（文本编辑器）	
Ctrl + Alt + F7 切换到命令行界面
Ctrl + Alt + F2 切换到图形界面

Ctrl + Shift +C/V 终端的复制粘贴
```

<br>

### 4.2 `Vim` 命令和快捷键

- `vim`或命令行下：鼠标左键选中即为复制， 按下中键（鼠标滚轮）即为粘贴

#### 4.2.1 Vim 的三种模式

Vim 有三种主要模式，每种模式下有不同的功能：

1. 普通模式（Normal Mode）:

   - 默认模式，用于导航和操作文本。
   - 按 `Esc` 键从其他模式返回普通模式。

2. 插入模式（Insert Mode）:

   - 用于输入和编辑文本。

   - 从普通模式按 `i`、`a`、`o` 等键进入插入模式。

3. 命令模式（Command Mode）:

   - 用于执行保存、退出等命令。

   - 从普通模式按 `:` 进入命令模式。

#### 4.2.2 Vim 的基本操作

**1 启动和退出 Vim**

启动 Vim:

```bash
vim file.txt
```

- 退出 Vim:

- 普通模式下按 `:q` 退出。
- 如果有未保存的更改，按 `:q!` 强制退出。
- 保存并退出：`:wq` 或 `:x`。

**2 光标移动**

- **字符移动**:

- `h`：左移。
- `j`：下移。
- `k`：上移。
- `l`：右移。

- **单词移动**:

- `w`：移动到下一个单词的开头。
- `b`：移动到上一个单词的开头。

- **行移动**:

- `0`：移动到行首。
- `$`：移动到行尾。
- `gg`：移动到文件开头。
- `G`：移动到文件末尾。
- `:n`：跳转到第 `n` 行（如 `:10` 跳转到第 10 行）。

**3 文本编辑**

- **插入文本**:

- `i`：在光标前插入。
- `a`：在光标后插入。
- `o`：在当前行下方插入新行。
- `O`：在当前行上方插入新行。

- **删除文本**:

- `x`：删除光标处的字符。
- `dd`：删除当前行。
- `dw`：删除从光标到下一个单词开头的文本。

- **复制和粘贴**:

- `yy`：复制当前行。
- `p`：粘贴到光标后。
- `P`：粘贴到光标前。

- **撤销和重做**:

- `u`：撤销上一次操作。
- `Ctrl + r`：重做。

**4 搜索和替换**

- **搜索**:

- `/pattern`：向下搜索 `pattern`。
- `?pattern`：向上搜索 `pattern`。
- 按 `n` 跳转到下一个匹配，`N` 跳转到上一个匹配。

- **替换**:

- `:s/old/new`：替换当前行的第一个匹配。
- `:s/old/new/g`：替换当前行的所有匹配。
- `:%s/old/new/g`：替换整个文件中的所有匹配。

**5 保存和退出**

- `:w`：保存文件。
- `:q`：退出 Vim。
- `:wq` 或 `:x`：保存并退出。
- `:q!`：强制退出，不保存更改。

#### 4.2.3 Vim 的高级功能

**1 多窗口操作**

- **分割窗口**:

- `:sp`：水平分割窗口。
- `:vsp`：垂直分割窗口。

- **切换窗口**:

- `Ctrl + w + h/j/k/l`：切换到左/下/上/右窗口。

- **关闭窗口**:

- `:q`：关闭当前窗口。

**2 宏录制**

- **录制宏**:

- `q` + 字母（如 `a`）：开始录制宏。
- 执行操作。
- `q`：停止录制。

- **执行宏**:

- `@` + 字母（如 `a`）：执行录制的宏。

**3 插件管理**

- 使用插件管理器（如 `vim-plug`）安装和管理插件。

示例：

![img](https://pics4.baidu.com/feed/50da81cb39dbb6fd03aa2d6446669517962b3754.jpeg@f_auto?token=984c08decaf6a3a501d7ec6da0347bbb)

- 安装插件：`:PlugInstall`

#### 4.2.4 Vim 的实际应用场景

**1 编辑配置文件**

- 使用 Vim 编辑系统配置文件（如 `/etc/nginx/nginx.conf`）。

示例：

![img](https://pics2.baidu.com/feed/342ac65c10385343903cd857dc518e71cb8088a2.jpeg@f_auto?token=7f0591f4b506bda1a605757c5f1db56c)

**2 编写代码**

- 使用 Vim 编写代码，结合插件（如 `YouCompleteMe`）实现代码补全。

示例：

```c
vim main.py
```

**3 日志分析**

- 使用 Vim 查看和分析日志文件。

示例：

```c
vim /var/log/syslog
```

**4 批量文本处理**

- 使用 Vim 的搜索替换功能批量修改文本。

示例：

```c
:%s/old/new/g
```

#### 4.2.5 Vim 使用示例

**示例 1: 编辑文件并保存**

打开文件：

```c
vim file.txt
```

1. 进入插入模式并编辑内容：

- 按 `i` 进入插入模式。
- 输入文本。

1. 保存并退出：

- 按 `Esc` 返回普通模式。
- 输入 `:wq` 保存并退出。

**示例 2: 搜索和替换**

打开文件：

```c
vim file.txt
```

1. 搜索 `hello`：

- 按 `/`，输入 `hello`，按 `Enter`。
- 按 `n` 跳转到下一个匹配。

1. 替换 `hello` 为 `world`：

- 输入 `:%s/hello/world/g`，按 `Enter`。

**示例 3: 多窗口操作**

打开文件并水平分割窗口：

```c
vim file.txt:sp file2.txt
```

1. 切换窗口：

- 按 `Ctrl + w + j` 切换到下方窗口。

1. 关闭窗口：

- 输入 `:q` 关闭当前窗口。

<br>

## 5 通用终端命令

> `Ubuntu`为`Linux`内核的，故`Linux`命令均可用于`Ubuntu`

```bash
chase@chaseVM:~S   ----- #用户名@计算机名:绝对路径$

su ----- 获取root权限【exit推出 | Ctrl+D退出】
sudo xxx ----- 以root权限执行

dpkg -s <软件包名> ----- 验证某个软件包是否已经安装【dpkg -s vim】
apt list --installed ----- 列出apt已安装的程序及依赖
apt list --installed | grep program_name ----- 使用grep进行过滤

#### 使用模糊搜索 *匹配任意模糊位，？代表一个模糊位
pwd:打印工作目录

#显示经过筛选后的进程
ps -Al|grep Linux 
kill -9 [进程号] #结束进程

# 查看磁盘使用情况【人类可读的格式显示，如KB、MB、GB等】
df -h
```



<br>

# 二 Linux简介

## 1 系统介绍

- 开源的发行版本
- Linux系统族谱

**知名Linux系统：** Ubuntu、RedHat、CentOS、Debian、Fedora、SuSE、OpenSUSE、Arch Linux、SolusOS 等



**为什么要学习Linux？**

- Linux系统在服务器市场的占有率（2016年）


世界上500个最快的超级计算机90％以上运行Linux发行版或变种，包括最快的前10名超级计算机运行的都是基于Linux内核的操作系统。Linux也广泛应用在嵌入式系统上，如手机（Mobile Phone）、平板电脑（Tablet）、路由器（Router）、电视（TV）和电子游戏机等。在移动设备上广泛使用的Android操作系统就是创建在Linux内核之上。

<br>

**Linux的优点：**

- 开源免费、可自行修改，对其他开源软件兼容性良好
- 多用户访问友好、权限管理方便快捷
- 内存管理优秀，可以长期连续运行，系统占用内存低
- 工具功能库完善，部署安装方便

<br>

**Windows下Linux虚拟机的安装与启动【子系统方法】**【更推荐VM虚拟机的方式】

首先开启开发人员模式【这种方式在windows上比较兼容，运行速度快，占用内存小】，然后启用子系统功能【设置-应用-程序和功能-启用或关闭windows功能】

上面的设置打开之后，打开win10的微软应用商店，再搜索Ubuntu，选择Ubuntu18.04 LTS【Long Time Support】

> LTS表示长期支持版本，不选择20.04是因为该版本太新，一些库可能支持的还不是那么好。另外可能有一些潜在的缺陷，18.04则已经运行两三年了，环境相对更加稳定，支持的库更稳定和丰富

点击18.04后，进入详情页面；点击获取，即可下载安装该虚拟机；安装完成之后，即可在开始菜单中

看到图标，点击图标即可启动Ubuntu子系统

> 出现install wrong已解决[参考](https://blog.csdn.net/qq_17576885/article/details/126707239)
>
> ```bash
> wsl --set-default-version 1：解决不能正常启动
> wsl.exe –update：进行升级
> ```



<br>

## 2 基本命令

### 2.1 ls命令

命令`ls`是`list`的缩写，其作用是列出指定位置的文件和文件夹【如果没有指定，默认是列出当前位置的文件或者文件夹】

可通过字体颜色和背景颜色区分是否未文件夹和权限，如：

- 白色字体为文件
- 蓝色字体为文件夹
- 绿色字体为可执行
- 红色字体一般为压缩包
- 绿色背景为拥有全部权限
- 蓝色背景为拥有部分权限



常用的参数有

#### -a：列出所有的文件或者文件夹

在Linux系统里面，以 `.` 开头的文件或者文件夹，一般会被默认视为隐藏文件。如果想要查看这些隐藏文件或者文件夹，最好使用`-a`参数



#### -l：列出详细信息

默认`ls`只显示名字，并不显示详细信息。`-l`参数除了会显示名称以外，还会显示文件的权限、所属用户、分组、大小、修改日期

- `d`开头：文件夹；`p`开头：管道
- 紧接着的3x3个位置为root用户权限、当前用户权限、普通其他用户权限。rwx分别为读、写、执行
- 结合`-a`使用：`ls -al`
- `l`缩写自：long list format或者long



#### -h：增加可读性

默认文件是按照字节为单位显示大小的。`-h`参数会使得附带K、M、G、T等大小后缀【K表示千字节、M表示兆字节、G表示1024兆、T表示1024G】

- 虽然精准度下降了，但是更容易阅读
- 结合`-a`使用：`ls -ah`
- 缩写自：human readable



#### -R：递归访问

默认是显示当前目录下的文件和文件夹。R参数后，如果当前目录下有其他文件夹，则会将该文件夹下面的文件和文件夹也显示出来

- R缩写自：recursion 递归
- `-r`: 反向排序输出



#### -Q：文件名用双引号包裹

该参数是为了防止某些文件或者文件夹的末尾是空格字符。这样可以通过双引号，看到文件名实际的长度

【Q缩写自：quotation mark】



#### -t：按时间排序

按文件最近的一次修改时间排序【t：time】



 <br>

### 2.2 echo命令

```bash
#显示字符串
echo hello world
echo “hello world”

#显示转义字符
echo '\\' #输出\\
echo "\\" #输出\

#显示变量
echo $PATH

#显示换行/不换行【没有-e，单独\n无效】
echo -e "换行\n" 
echo -e "不换行\c"


#显示原样字符串
echo '$PATH'=$PATH

#显示命令结果【用于将程序直接结果导入文本文件】
echo date

#>将左边命令的输出，输入到右边的文件或者命令【如果右边的文件不存在，则创建一个】
#>>将左边命令的输出，追加到右边的文件【如果右边的文件不存在，则创建一个】
echo "d" > 1.txt
echo "Hello world" >> 1.txt #【默认会换行】
```



  <br>

### 2.3 cd命令

cd 目标路径【change directory】路径可以是绝对路径，也可以是相对路径。除此之外，还有一些特别的符号：

- `.`表示当前目录
- `..`表示上一级目录（也就是父目录）
- `~`表示当前用户的用户目录【在root用户和普通用户条件下，符号~是有不同含义的】【Linux磁盘不分区】
  - 普通用户`~`一般是`/home/`用户名文件夹
  - root用户对应的`~`是`/root`文件夹





 

### 2.4 head命令

> 默认显示文件前十行内容

- `-c n`：显示头部的指定n个字符【char】
- `-n x`：显示头部的指定的x行
- `-v`：显示文件名【配合脚本遍历输出文件内容】
- `-q`：不显示文件名

 

### 2.5 tail命令

一些简单命令：

```bash
#显示当前目录
pwd

#清空窗口
clear
```

`tail`命令默认显示尾部十行，`-c -n -v -q`同head命令，以下是另外的一些：

- `-f`：可以不断的更新尾部内容【在另一个窗口修改文件，会实时显示】



 <br>

### 2.6 ps命令

- 所有进程都是`init`进程的子进程或者孙进程
- 默认显示由自己创建的进程
- ps只显示ps执行瞬间进程的状态

常用参数：

- `-Al`：显示所有进程的详情和进程名称【缩写自All long format】
  - tty：字符交互环境，即串口设备
  - `-Al`关注【PRI进程优先级，越小越好；PPID父进程；UID用户ID，0为root用户】
- `-aux`：显示所有进程和其启动命令【cmd带参数；STAT状态，s为sleep，R为running】
- `-au`：显示所有进程



**数值项说明**

```bash
USER	进程所属用户
UID 	进程所属用户ID
PID 	进程ID
PPID 	父进程ID

C/%CPU 	CPU占用率
%MEM 	内存占用率
VSZ 	虚拟内存占用大小（其中部分可能在交换文件中）
RSS 	实际内存占用大小（RAM占用的大小）
TTY 	对应的控制台设备【由哪一个控制台设备启动】开始此进程的终端
TIME 	进程执行的时间
START	进程开始执行的世界
COMMAND 进程启动执行的命令（带参数）
CMD 	进程启动执行的命令（不带参数）[启动的程序名称]
S/STAT 	状态 S休眠 R运行 D阻塞 Z僵尸进程 T暂停
F       内核分配给进程的系统标记
PRI 	优先级 数值越低，优先级越高，甚至可能为负数


STIME 进程启动时的系统时间
NI：用来参与决定优先级
ADDR：进程的内存地址
SZ：所需交换空间的大致大小
WCHAN：进程休眠的内核函数地址
```



 <br>

### 2.7 cp命令

copy复制的缩写，命令用法如下：

```bash
cp [参数] 源文件/文件夹 目标文件/文件夹 #【默认不能复制文件夹】
```

- `[]`表示可选
- `sudo`命令提权
- `mkdir`创建文件夹



**常用参数：**

- `-a`：带属性复制【此选项通常在复制目录时使用，它保留链接、文件属性，并复制目录下的所有内容。其作用等于`dpR`参数组合】【d复制时保留链接；p为带权限复制；R为递归】
- `-d`：复制时保留链接【这里所说的链接相当于Windows系统中的快捷方式】
- `-f`：强制覆盖【覆盖已经存在的目标文件而不给出提示】【Ubuntu默认是强制覆盖】
- `-i`：覆盖提示【与`-f`选项相反，在覆盖目标文件之前给出提示，要求用户确认是否覆盖，回答`y`时目标文件将被覆盖】
- `-p`：带权限复制【除复制文件的内容外，还把修改时间和访问权限也复制到新文件中】
- `-r`：文件夹复制【若给出的源文件是一个目录文件，此时将复制该目录下所有的子目录和文件】
- `-l`：创建链接【不复制文件，只是生成链接文件【只在部分系统有效，在Ubuntu下没有效果】

 

 <br>

### 2.8 rm命令

命令`remove`的缩写，删除文件或文件夹【需要参数】

**常用参数：**

- `-i`：删除确认：每个被删除的文件都需要确认
- `-f`：强制删除：无需确认就会删除指定的文件
- `-r`：目录删除：删除指定文件夹下的所有文件和子文件夹【`-ir`可组合使用】

​    <br>



### 2.9 chmod命令

#### 2.9.1 基本介绍

`chmod` 命令是 Unix 和 Linux 系统中的一个用于修改文件或目录的访问权限的命令。它可以控制文件或目录的读、写、执行权限，以及文件或目录的所有者、所属组等信息。

**语法：**`chmod [选项] [模式] 文件或目录`

**参数：**

- `u`：表示所有者
- `g`：表示所属组
- `o`：表示其他用户
- `a`：表示所有用户
- `r`：表示读权限
- `w`：表示写权限
- `x`：表示执行权限
- `+`：表示增加权限
- `-`：表示减少权限
- `=`：表示赋予指定权限

Linux/Unix 的文件调用权限分为三级 : 文件所有者【Owner】、用户组【Group】、其它用户【Other Users】，以下几点需注意：

- 只有文件所有者和超级用户root可以修改文件或目录的权限
- 可以使用绝对模式【八进制数字模式】或符号模式指定文件的权限，而使用权限则为所有使用者
- 符号模式与绝对模式的关系如下图

![](linux-2-1.png)



#### 2.9.2 符号模式

- 使用符号模式可以设置多个项目：who【用户类型】、operator【操作符】和 permission【权限】，每个项目的设置可以用逗号隔开
- 命令 chmod 将修改 `who` 【指定是用户类型】对文件的访问权限，用户类型由一个或者多个字母在 `who` 的位置来说明。



用户类型参数：

| who  | 用户类型 | 说明                    |
| ---- | -------- | ----------------------- |
| u    | user     | 文件所有者              |
| g    | group    | 文件所有者所在组        |
| o    | others   | 所有其他用户            |
| a    | all      | 所有用户，和ugo使用一样 |

操作符参数：

| Operator | 说明                       |
| -------- | -------------------------- |
| +        | 为指定的用户类型增加权限   |
| -        | 为指定的用户类型去除权限   |
| =        | 直接重置用户类型的所有权限 |

符号模式参数：

| Permission | 名字         | 说明                                                         |
| ---------- | ------------ | ------------------------------------------------------------ |
| r          | 读           | 设置为可读权限                                               |
| w          | 写           | 设置为可写权限                                               |
| x          | 执行权限     | 设置为可执行权限                                             |
| X          | 特殊执行权限 | 只有当文件为目录文件，或者其他类型的用户有可执行权限时，才将文件权限设置可执行 |
| s          | setuid/gid   | 当文件被执行时，根据who参数指定的用户类型设置文件的setuid或者setgid权限 |
| t          | 粘贴位       | 设置粘贴位【只有超级用户可以设置该位，只有文件所有者u可以使用该位】 |

举例：

```bash
chmod a=rwx file 	#表示所有用户都可读写执行
chmod a+r file		#表示给所有用户加上可读权限
chmod ugo+r file	#与a+r的相同
chmod u+x file		#表示给文件所有者加上执行权限
```



#### 2.9.3 八进制语法

`chmod` 命令可以使用八进制数来指定权限。

文件或目录的权限位是由9个权限位来控制，每三位为一组，它们分别是文件所有者（User）的读、写、执行，用户组（Group）的读、写、执行以及其它用户（Other）的读、写、执行。历史上，文件权限被放在一个比特掩码中，掩码中指定的比特位设为1，用来说明一个类具有相应的优先级。

| num  | 权限           | 对应符号 | 二进制 |
| ---- | -------------- | -------- | ------ |
| 7    | 读 + 写 + 执行 | rwx      | 111    |
| 6    | 读 + 写        | rw-      | 110    |
| 5    | 读 + 执行      | r-x      | 101    |
| 4    | 只读           | r–       | 100    |
| 3    | 写 + 执行      | -wx      | 011    |
| 2    | 只写           | -w-      | 010    |
| 1    | 只执行         | –x       | 001    |
| 0    | 无             | —        | 000    |

举例：

```bash
#语法为：
chmod abc file

#其中a,b,c各为一个数字，分别表示User、Group、及Other的权限，然后rwx分别对应421，若要rwx属性则为4+2+1=7，rw-则为4+2=6等等
chmod 777 file 	#表示User、Group、及Other的权限都设为rwx
chmod 764 file	#表示User、Group、及Other的权限分别为rwx、rw-、r--
```



#### 2.9.4 接四位数字的情况

有时，对于特殊需求提供一位特殊文件权限标识位。同理，正常的`rwx`，现有额外的一位八进制数，其现设为三位二进制a、b、c依序组成。

- a代表`setuid`位：如果该位为1，则表示设置`setuid`
- b代表`setgid`位：如果该位为1，则表示设置`setgid`
- c代表`sticky`位：如果该位为1，则表示设置`sticky`

> 如6755，对应权限为 `-rwsr-sr-x`

`setuid` 意为：设置使文件在执行阶段具有文件所有者的权限。比如`/usr/bin/passwd`，如果一般用户执行该文件，则在执行过程中，该文件可以获得root权限，从而可以更改用户的密码。

`setgid` 意为：该权限只对目录有效。目录被设置该位后，任何用户在此目录下创建的文件都具有和该目录所属的组相同的组。

`sticky bit` 意为：该位可以理解为防删除位【一个文件是否可以被某用户删除，主要取决于该文件所属的组是否对该用户具有写权限】

- 如果没有写权限，则这个目录下的所有文件都不能被删除，同时也不能添加新的文件

- 如果希望用户能够添加文件但同时不能删除文件，则可以对文件使用`sticky bit`位。

- 设置该位后，就算用户对目录具有写权限也不能删除该文件。例如，如果在rwx=777的前提额外想要使文件拥有sticky bit与setgid，即使用如下命令：

  ```bash
  $ chmod 3777 【文件】
  ```



#### 2.9.5 权限修改示例

问题1：使用echo命令输出内容到某个文件时，系统提示我们权限不够，无法执行这个操作。

分析：对文件进行写入操作，如果目标文件的写入权限并不属于当前用户或当前用户所在的用户组，就会出现权限不够的错误。在这种情况下，即使我们是通过sudo命令以超级用户的权限运行echo命令，也无法绕过文件的权限设置。

解决：

1. 修改文件的权限：【chmod命令修改文件的权限】例如，`chmod +w filename`
2. 切换用户：尝试切换为拥有相应权限的用户。例如，可以使用su命令切换用户，或者使用sudo命令以超级用户的权限运行echo命令
3. 使用重定向符号：除了echo命令外，还可以使用重定向符号>来输出内容到文件中。这种方式相对更加灵活，且不会受到文件权限的限制。





 <br>

### 2.10 chown 

chown 命令是 Unix 和 Linux 系统中的一个用于修改文件或目录的所属用户和组的命令。它可以将文件或目录的所有权转移给其他用户或组，只有**文件的所有者**或**超级用户**才能使用这个命令进行修改。

```bash
# chown [选项] [所有者][:[组]] 文件或目录
# change owner
# -R：递归处理，将目录下的所有文件和子目录的所有权都修改为指定的用户和组。
# -f：不显示错误信息。
# -v：显示详细的处理信息。

#将文件的所有权修改为指定用户：
chown username file.txt

#将文件的所有权修改为指定用户和组：
chown username:group file.txt

#将目录下的所有文件和子目录的所有权都修改为指定用户和组：
chown -R username:group directory
```

注意：

- chown 命令默认只修改文件或目录的所有者，如果要修改组，需要使用 `:` 分隔符指定组名。





 <br>

### 2.11 其他命令【🔺】

```bash
#【查看test.cpp内容】
cat test.cpp 

#文件/文件夹改变权限【change权限，r为递归子文件和目录】
#6：110(提权/改组) 7：111（读写执行） 111（当前用户） 111（其他用户）
chmod [-r] 6777（八进制数） 

#vim编辑器
#按 i 键进入插入模式，可以在当前光标位置插入文本
#按 Esc 键回到普通模式，可以使用各种快捷键来操作文本
#在普通【命令模式】：
####U：撤销操作
####Ctrl+R：恢复

#在普通模式下，按 : 键进入【命令行模式】，可以在底部输入并执行各种 Ex 命令
## 输入 :w 命令，可以保存文件，但不退出 Vim
## 输入 :q 命令，可以退出 Vim，但如果文件有修改，会提示你保存或放弃
## 输入 :wq 命令，可以保存文件并退出 Vim
## 输入 :q! 命令，可以放弃文件的修改并退出 Vim

#列出文件夹中的10个文件名
ls | head -n 10

#查找文件
whereis su

#建立文件链接
ln -s test.txt test1.txt #-s:软链接

#查看网络ip
ipconfig

#查看进程间通信相关的信息
ipcs -m	#共享内存
ipcs -s #信号量
ipcs -q #消息队列

#查看函数定义
man select #查看select函数定义

#修改最后修改日期
touch 文件名
```

  <br>

##  3 常见错误【🔺】

### 3.1 镜像源问题

```bash
Unable to fetch some archives, maybe run apt-get update or try with --fix-missing?
```

解决：现无法定位问题，是因为找不到源镜像导致的，只需要将/etc/apt/路径下的source.list文件内容改成对应的源镜像【[参考](https://blog.csdn.net/yuan2019035055/article/details/126981876)】

 <br>

### 3.2 Systemd与service

```bash
System has not been booted with systemd as init system (PID 1). Can't operate.
```

解决：目前的理解是，这是两套相互对应的命令体系【[参考](https://blog.csdn.net/ken2232/article/details/132529761)】

<br>

### 3.3 VS中突发的未知错误

问题描述：`VS2022` 远程编辑调试Linux上的代码，不知道动了哪儿，出现大量标红，且出错无意义。

```bash
错误(活动)	E0020	未定义标识符 "clnt_sock"	ChatApp	
错误(活动)	E0020	未定义标识符 "message"	ChatApp	
错误(活动)	E0077	此声明没有存储类或类型说明符	ChatApp	
......
```

解决：此类错误一般可能是缺失了括号`{`等标识符，导致的编译错误。

<br>

 

 <br>

# 三 Linux开发入门

## 1 开发环境搭建

### 1.1 gcc安装

1. 设置root密码：`sudo passwd root`【需要记住该密码，即用户名为root，密码为此】
2. 进入root账户：`su` 【pwd、exit】
3. 安装编译器：`apt-get install gcc g++`【gcc调用g++来编译c++】【980721/xin------】
4. 查看当前的gcc、g++版本 【`gcc --version`  | `g++ --version`】
5. 验证一下：`g++ -o test main.cpp`【编译cpp文件】
6. 运行：`./test`【可运行文件】

<br>



### 1.2 ssh服务的安装

该服务用户后续的代码编写和远程运行、调试

步骤：

1. 安装服务程序：`sudo apt install openssh-server`【开源免费】

2. 安装客户端程序：`sudo apt install openssh-client`【客户端有一个密钥生成器】

3. 修改配置文件【`su etc/ssh/sshd_config` / `su etc/sshd_config`】【windows子系统方式位置：`C:\Users\Stell\AppData\Local\Packages\CanonicalGroupLimited.Ubuntu18.04LTS_79rhkp1fndgsc\LocalState\rootfs\etc\ssh`】

   ```bash
   LoginGraceTime 2m
   #可能要该
   PermitRootLogin yes
   
   PubkeyAuthentication yes
   
   PasswordAuthentication yes
   
   ChallengeResponseAuthentication no
   
   UsePAM yes
   
   X11Forwarding yes
   
   PrintMotd no
   
   AcceptEnv LANG LC_*
   
   Subsystem    sftp /usr/lib/openssh/sftp-server
   ```

   

4. 子Linux系统启动服务：`C:\Windows\System32\bash.exe -c "sudo service ssh start"`

   - Unbuntu虚拟机启动ssh服务：`sudo service ssh`
   - 在 linux 启动和查看ssh服务，且修改sshd配置后重启一次VM【`service ssh status` | `service ssh start`】
   - VM网络一般使用桥接模式，即本机和虚拟机ip一致；若使用NAT模式，需要使用`ifconfig`查得实际ip
   - 此处：用户名`root`；密码`xin980721`



> 【如何开机自启动服务？】
>
> 建立一个bat文件，将上面这个命令写入其中，然后放入文件夹【开机启动项：`C:\ProgramData\Microsoft\Windows\Start Menu\Programs\StartUp`或者`C:\Users\你的用户名\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Startup`】



 <br>

### 1.3 相关问题

#### 1.3.1 gcc安装时出现的锁问题

```bash
root@chase-virtual-machine:/home/chase# apt-get install gcc g++
E: 无法获得锁 /var/lib/dpkg/lock - open (11: Resource temporarily unavailable)
E: 无法锁定管理目录(/var/lib/dpkg/)，是否有其他进程正占用它？
```

此错误表明系统中有其他进程正在占用软件包管理器的锁（如 `apt`、`dpkg` 或自动更新服务）。常见原因包括：

1. 另一个 `apt` 或 `dpkg` 进程正在运行。
2. 锁文件未正确释放（如进程被强制终止）。
3. 后台自动更新服务（如 `unattended-upgrades`）正在运行。

------

**解决方法**

**1. 检查并终止占用进程**

```bash
# 查看是否有正在运行的 apt/dpkg 进程
ps aux | grep -E 'apt|dpkg'

# 如果发现相关进程（如 apt-get、apt），强制终止它们
sudo kill -9 <进程ID>
```

**2. 删除锁文件**

```bash
# 删除 apt 和 dpkg 的锁文件
sudo rm /var/lib/apt/lists/lock
sudo rm /var/lib/dpkg/lock
```

**3. 清除缓存并重试**

```bash
# 清理软件包缓存
sudo apt-get clean

# 更新软件包列表
sudo apt-get update

# 再次尝试安装
sudo apt-get install gcc g++
```

**4. 检查后台自动更新**

如果问题反复出现，可能是后台自动更新服务导致的。可以临时禁用它：

```
# 停止 unattended-upgrades 服务
sudo systemctl stop unattended-upgrades

# 禁用自动更新（可选）
sudo systemctl disable unattended-upgrades
```





<br>

#### 1.3.2 gcc安装时出现的没有安装候选

```
E：Package 'gcc' has no installation candidate
```

**解决**：升级 apt-get，后再次尝试安装。

```
sudo apt-get update
```

<br>

#### 1.3.2  VS2022连接远程Linux服务器报错：主机名与端口不存在

先说结论：错误原因是混淆了主机名和用户名【真nmd】。但是，之后的排查顺序需要注意积累。

> 详细步骤参考此处：[SSH连接报错解决方案探析，SSH连接常见报错原因分析与高效解决指南](https://blog.huochengrm.cn/gz/11979.html)

**（1）启动 SSH 服务：**

```bash
sudo systemctl start sshd
# 或者在某些系统上
sudo service sshd start
```

**（2）检查 SSH 服务状态：**

```bash
sudo systemctl status sshd
# 或者
sudo service sshd status
```

**（3）查看端口是否开放：**

```bash
sudo netstat tnlp | grep :22
```

如果未开放，则重新启动 SSH 服务。

**（4）测试网络连通性：**

```bash
ping www.baidu.com
```

**（5）开放防火墙端口：**

直接打开端口：

```bash
sudo iptables I INPUT p tcp dport 22 j ACCEPT
```

永久打开端口（CentOS 7）：

```bash
sudo firewallcmd permanent addservice=ssh
sudo firewallcmd reload
```

永久打开端口（CentOS 6）：

```bash
sudo vim /etc/sysconfig/iptables
添加以下行并保存
A RHFirewall1INPUT m state state NEW m tcp p tcp dport 22 j ACCEPT
sudo service iptables restart
```

<br>

## 2 创建Linux控制台项目

1. 启动VS，在项目选择页面点击创建新项目
2. 在创建新项目页面选择【C++、Linux控制台应用】【此处可能没有相应模板，可以使用VS更新来加入Linux开发相关的插件】
3. 输入项目名称和解决方案名称，点击创建【不推荐勾选解决方案在同级目录】
4. 连接Linux系统ssh服务【工具 | 选项 | 跨平台 | 连接管理器 | 添加连接】【用户名`root`；密码为sudo密码`xin980721`；主机名：在VM中查得ip；端口22】
5. 生成解决方案【具体项目右键  | 属性 | 常规 | 远程生成计算机】【如果没有，可能是因为使用了错误的项目模板】，使用windows平台调试Linux程序
   - 修改远程服务器
   - 修改远程根目录
   - 平台工具集为`GCC for Remote Linux`】
6. 相应在Linux服务器中生成out文件【进入方法：`su root` | `cd ~`】

 

**注意：**

- 由于目前绝大多数的Linux系统都是64位的，故项目一般使用x64编译
- 32位仅限于部分嵌入式系统
- 程序是在Linux上运行的，windows上只是编写和调试



 <br>

<hr style="border-top: 1px dashed #8c8b8b;border-bottom: none;">

## 3 Linux标准库函数

### 3.1 字符串函数

> 头文件<ctype.h>

用于①正则表达式规则；②解析字符串

```C++
//测试字符是否为英文字母或数字:
int isalnum(int c);

//测试字符是否为英文字母:
int isalpha(int c);
//测试字符是否为小写英文字母:
int islower(int c);
//测试字符是否为大写英文字母:
int isupper(int c);

//测试字符是否为阿拉伯数字:
int isdigit(int c);
//测试字符是否为16进制数字:
int isxdigit(int c);
 
//测试字符是否为空格字符:
int isblank(int c);
//测试字符是否为空格字符:
int isspace(int c);

//测试字符是否为可打印字符:【屏幕】
int isgraph(int c);
//测试字符是否为可打印字符:【纸】
int isprint(int c);

//测试字符是否为ASCII码的控制字符:
int iscntrl(int c);
 
//测试字符是否为ASCII码字符:0~127【检测中文符号】
int isascii(int c);
 
//测试字符是否为标点符号或特殊符号:
int ispunct(int c);
```



调用 `Linux API` 示例：

```c++
#include <cstdio>
#include <ctype.h>
#include <iostream>

int main()
{
	printf("%s 向你问好!\n", "Linux_consoleApplication");
	//const char* str = "Hello World!\n2024";
	//size_t len = sizeof(str);//8:错误原因是只计算了指针的长度
	const char str[] = "Hello World!\n2024 你好！";
	size_t len = sizeof(str);
	std::cout << "len:" << len << std::endl;
	for (size_t i = 0; i < len; i++)
	{
		std::cout << str[i] << ": ";
		if (isalpha(str[i]))
			std::cout << "A";
		if (isdigit(str[i]))
			std::cout << "0";
		if (isspace(str[i]))
			std::cout << "_";
		if (iscntrl(str[i]))
			std::cout << "#";
		if (ispunct(str[i]))
			std::cout << "?";
		std::cout << std::endl;
	}
	return 0;
}
```



<br>

### 3.2 数据转换函数

> 头文件<stdlib.h>【包含数据转换、随机数、字符集转换】
>
> 注意：先验证，再使用

```C++
//【字符串 to 浮点数】
//将字符串转换成整型数:【与atol的区别存在于以前的低位CPU】
int atoi(const char*);
//将字符串转换成长整型数:
long int atol(const char*);
//将字符串转换成64位整数（C++11）
long long int atoll ( const char * str );

//将字符串转换成浮点型数:
double atof(const char*);


//将字符串转换成整数【base=10为十进制】【endptr指向非法数字的开始处】
long int strtol (const char* str, char** endptr, int base);
//将字符串转换成无符号整数
unsigned long int strtoul (const char* str, char** endptr, int base);
//将字符串转换成长整数（C++11）
long long int strtoll (const char* str, char** endptr, int base);
//将字符串转换成无符号长整数（C++11）
unsigned long long int strtoull (const char* str, char** endptr, int base);

//将字符串转换成浮点数（C++11）
float strtof (const char* str, char** endptr);
//将字符串转换成双精度数
double strtod (const char* str, char** endptr);
//将字符串转换成长双精度数（C++11）
long double strtold (const char* str, char** endptr);

 
//【浮点数 to 字符串】
//将浮点型数转换成字符串:ndigit指的是全部的有效位数；decpt输出小数点位置，即几个；sign输出正负
char* ecvt(double value, int ndigit, int *decpt, int *sign);
//将浮点型数转换为字符串:ndigit指的是小数点之后的有效位数【区别在于ndigit】【位数不足加0】
char *fcvt(double value, int ndigit, int *decpt, int *sign);
//将浮点型数转换为字符串:ndigit指的是最大有效位数；bug输出【位数不足不加0】【无需二次处理】
char *gcvt(double value, int ndigit, char *buf);
```



【字符串 to 浮点数】示例：

```c++
#include <cstdio>
#include <ctype.h>
#include <iostream>

int main()
{
	long a;
	int b;
	std::cout << "long:" << sizeof(a) << " int:" << sizeof(b) << " long long:" << sizeof(long long) << std::endl;
	std::cout << "long double:" << sizeof(long double) << std::endl;
	std::cout << atoi("123456") << std::endl;//cpu 8 16 32 64  以前i=16 l=32  现在i=32 l=64 ll=64
	std::cout << atol("234567") << std::endl;
	std::cout << atoll("1234567890123") << std::endl;//新特征，要先验证，再使用
	std::cout << atof("1.234567") << std::endl;
	std::cout << strtol("-987654321", NULL, 10) << std::endl;
	char* pEnd;
	std::cout << strtoll("-987654321000abc123456", &pEnd, 10) << std::endl;
	std::cout << "pEnd:" << pEnd << std::endl;
	std::cout << strtof("1.2345678", NULL) << std::endl;
	std::cout << strtod("1.234567890123", NULL) << std::endl;
	double d = strtod("1.234567890123", NULL);
	printf("%lf %g\r\n", strtod("1.234567890123", NULL), d);
	std::cout << d << std::endl;
	std::cout << strtold("1.234567890123456789", NULL) << std::endl;
	printf("%Lf\r\n", strtold("1.234567890123456789", NULL));//print只支持double

	return 0;
}
```

【浮点数 to 字符串】示例：

```c++
#include <cstdio>
#include <ctype.h>
#include <iostream>

int main()
{
	int decpt, sign;
	std::cout << ecvt(0.123456789, 10, &decpt, &sign) << std::endl;
	std::cout << "decpt:" << decpt << " sign:" << sign << std::endl;
	std::cout << ecvt(0.0123456789, 10, &decpt, &sign) << std::endl;
	std::cout << "decpt:" << decpt << " sign:" << sign << std::endl;
	std::cout << ecvt(-123.456789, 10, &decpt, &sign) << std::endl;
	std::cout << "decpt:" << decpt << " sign:" << sign << std::endl;
	std::cout << ecvt(100, 4, &decpt, &sign) << std::endl;
	std::cout << "decpt:" << decpt << " sign:" << sign << std::endl;
	std::cout << "=================================================" << std::endl;
	std::cout << fcvt(0.123456789, 10, &decpt, &sign) << std::endl;
	std::cout << "decpt:" << decpt << " sign:" << sign << std::endl;
	std::cout << fcvt(0.0123456789, 10, &decpt, &sign) << std::endl;
	std::cout << "decpt:" << decpt << " sign:" << sign << std::endl;
	std::cout << fcvt(-123.456789, 10, &decpt, &sign) << std::endl;
	std::cout << "decpt:" << decpt << " sign:" << sign << std::endl;
	std::cout << fcvt(100, 3, &decpt, &sign) << std::endl;
	std::cout << "decpt:" << decpt << " sign:" << sign << std::endl;
	std::cout << "+++++++++++++++++++++++++++++++++++++++++++++++++" << std::endl;
	char buffer[128] = "";
	std::cout << gcvt(0.123456789, 10, buffer) << std::endl;
	std::cout << buffer << std::endl;
	std::cout << gcvt(0.0123456789, 10, buffer) << std::endl;
	std::cout << buffer << std::endl;
	std::cout << gcvt(-123.456789, 10, buffer) << std::endl;
	std::cout << buffer << std::endl;
	std::cout << gcvt(100, 10, buffer) << std::endl;
	std::cout << buffer << std::endl;
	return 0;
}
```



<br>

### 3.3 格式化输入输出函数

> 包含在 `cstdio`

#### 3.3.1 常用输入输出函数

```c++
//【输出】************************************
//v:可变参数 | s:输出到缓冲区 | n：带缓冲区大小参数更安全 | f:文件
//格式化输出数据：
int printf(const char *format, ...);
//格式化输出数据：【可变参数】
int vprintf(const char *format, va_list arg);
    
//格式化字符串复制：
int sprintf(char *str, const char *format, ...);
//更安全的格式化字符串复制：明确缓冲区大小size，超过直接丢掉，返回实际长度
int snprintf(char *str, size_t size, const char *format, ...);

//格式化字符串复制：【输出到缓冲区str】
int vsprintf(char *str, const char *format, va_list arg);
//更安全的格式化字符串复制:明确缓冲区大小size，超过直接丢掉，返回实际长度
int vsnprintf (char * str, size_t n, const char * format, va_list arg );



//【输入】************************************
//格式化字符串输入：
int scanf(const char *format, ...);//返回识别到的参数个数
//1 空格是默认的分隔符
//2 部分数据格式是可以自动正确分割的,如%c%d；但是整数和小数之间，需要手动分割（使用空格）
//3 格式字符串里面的空格，可有可无。但是如果使用了其他分隔符，则在输入的时候，必须对应输入分隔符
//4 待输入变量，一定要取地址

//格式化字符串输入：【从缓冲区str输入】
int sscanf(const char *str, const char *format, ...);

//格式化字符串输入：【可变参数】
int vsscanf ( const char * s, const char * format, va_list arg );

 


//【与文件相关】************************************
//格式化输出数据至文件：
int fprintf(FILE *stream, const char *format, ...);
    
//格式化输出数据至文件：
int vfprintf ( FILE * stream, const char * format, va_list arg );

//格式化文件字符串输入：
int fscanf(FILE *stream, const char *format, ...);

//格式化文件字符串输入：
int vfscanf ( FILE * stream, const char * format, va_list arg );
```



示例：

```c++
#include <cstdio>
#include <iostream>
#include <stdlib.h>
#include <stdarg.h>

void lesson17()
{
	printf("hello world\n");
	printf("%d %u %l %lld %f %e %g\n", 1, 2, 3, 4, 0.00001, 0.00001, 0.00001);//lld长整数|e指数小数|g在f/e中选最短
	printf("%s\n", "ok");

	char buffer[128] = "";
	sprintf(buffer, "%s %d %f\n", "yidaoyun", 100, 100.12345);
	std::cout << buffer << std::endl;
	snprintf(buffer, sizeof(buffer), "%s %d %f\n", "yidaoyun", 100, 100.12345);

	FILE* pFile = fopen("test.txt", "w+");
	std::cout << "pFile:"<<pFile << std::endl;
	fprintf(pFile, "%s %d %f\n", "yidaoyun", 100, 100.12345);
	fclose(pFile);
}

//#include <stdarg.h>
void test(const char* format, ...) {
	std::cout << "test:" << std::endl;
	va_list ap;
	va_start(ap, format);//相当于数组链接【改变ap值】//ap:8 48 ...
	vprintf(format, ap);//ap:24 64 ...
	char buffer[4906] = "";

	//因为ap每次被改变，故每次需要用va_start重新为ap定位
	va_start(ap, format);
	vsnprintf(buffer, sizeof(buffer), format, ap);
	va_start(ap, format);
	vsprintf(buffer, format, ap);
}

void lession19()
{
	char c;
	int d;
	float f;
	double db;
	int ret = scanf("%c%d,%f,%lf", &c, &d, &f, &db);//空格可加可不加，但输入时默认使用空格分割
	printf("ret=%d %c %d %f %lf\n", ret, c, d, f, db);
	//%f在printf中可自动转换为double；但scanf中%f与%lf严格区分
}

int main()
{
	lesson17();
	test("%s %d %f\n", "yidaoyun", 100, 100.12345);
	lession19();

	return 0;
}
```



#### 3.3.2 printf函数format详解

| 格式字符 | 意义                                       |
| -------- | ------------------------------------------ |
| d        | 以十进制形式输出带符号整数(正数不输出符号) |
| o        | 以八进制形式输出无符号整数(不输出前缀0)    |
| x  X     | 以十六进制形式输出无符号整数(不输出前缀0x) |
| u        | 以十进制形式输出无符号整数                 |
| f        | 以小数形式输出单、双精度实数               |
| E  e     | 以指数形式输出单、双精度实数               |
| G  g     | 以%f或%e中较短的输出宽度输出单、双精度实数 |
| c        | 输出单个字符                               |
| s        | 输出字符串                                 |
| p        | 输出指针地址                               |
| lu       | 32位无符号整数                             |
| llu      | 64位无符号整数                             |

   

| flags（标识） | 描述                                                         |
| ------------- | ------------------------------------------------------------ |
| -             | 在给定的字段宽度内左对齐，默认是右对齐（参见 width 子说明符）。 |
| +             | 强制在结果之前显示加号或减号（+ 或 -），即正数前面会显示 + 号。默认情况下，只有负数前面会显示一个 - 号。 |
| 空格          | 如果没有写入任何符号，则在该值前面插入一个空格。             |
| #             | 与 o、x 或 X 说明符一起使用时，非零值前面会分别显示 0、0x 或 0X。与 e、E 和 f 一起使用时，会强制输出包含一个小数点，即使后边没有数字时也会显示小数点。默认情况下，如果后边没有数字时候，不会显示显示小数点。与 g 或 G 一起使用时，结果与使用 e 或 E 时相同，但是尾部的零不会被移除。 |
| 0             | 在指定填充 padding 的数字左边放置零（0），而不是空格（参见 width 子说明符）。 |

 

| width（宽度） | 描述                                                         |
| ------------- | ------------------------------------------------------------ |
| (number)      | 要输出的字符的最小数目。如果输出的值短于该数，结果会用空格填充。如果输出的值长于该数，结果不会被截断。 |
| *             | 宽度在 format 字符串中未指定，但是会作为附加整数值参数放置于要被格式化的参数之前。 |

​     

 

| .precision（精度） | 描述                                                         |
| ------------------ | ------------------------------------------------------------ |
| .number            | 对于整数说明符（d、i、o、u、x、X）：precision 指定了要写入的数字的最小位数。如果写入的值短于该数，结果会用前导零来填充。如果写入的值长于该数，结果不会被截断。精度为 0 意味着不写入任何字符。  对于 e、E 和 f 说明符：要在小数点后输出的小数位数。  对于 g 和 G 说明符：要输出的最大有效位数。  对于 s: 要输出的最大字符数。默认情况下，所有字符都会被输出，直到遇到末尾的空字符。  对于 c 类型：没有任何影响。  当未指定任何精度时，默认为 1。如果指定时不带有一个显式值，则假定为 0。 |
| .*                 | 精度在 format 字符串中未指定，但是会作为附加整数值参数放置于要被格式化的参数之前。 |

 

| length（长度） | 描述                                                         |
| -------------- | ------------------------------------------------------------ |
| h              | 参数被解释为短整型或无符号短整型（仅适用于整数说明符：i、d、o、u、x 和 X）。 |
| l（小写L）     | 参数被解释为长整型或无符号长整型，适用于整数说明符（i、d、o、u、x 和 X）及说明符 c（表示一个宽字符）和 s（表示宽字符字符串）。 |
| L              | 参数被解释为长双精度型（仅适用于浮点数说明符：e、E、f、g 和 G）。 |

​     

**附加参数** -- 根据不同的 format 字符串，函数可能需要一系列的附加参数，每个参数包含了一个要被插入的值，替换了 format 参数中指定的每个 % 标签。参数的个数应与 % 标签的个数相同。



<br>

#### 3.3.3 scanf函数format详解

| 参数      | 描述                                                         |
| --------- | ------------------------------------------------------------ |
| *         | 这是一个可选的星号，表示数据是从流 stream 中读取的，但是可以被忽视，即它不存储在对应的参数中。 |
| width     | 这指定了在当前读取操作中读取的最大字符数。                   |
| modifiers | 为对应的附加参数所指向的数据指定一个不同于整型（针对 d、i 和 n）、无符号整型（针对 o、u 和 x）或浮点型（针对 e、f 和 g）的大小： h ：短整型（针对 d、i 和 n），或无符号短整型（针对 o、u 和 x） l ：长整型（针对 d、i 和 n），或无符号长整型（针对 o、u 和 x），或双精度型（针对 e、f 和 g） L ：长双精度型（针对 e、f 和 g） |
| type      | 一个字符，指定了要被读取的数据类型以及数据读取方式。具体参见下一个表格。 |

 

| 类型                   | 合格的输入                                                   | 参数的类型      |
| ---------------------- | ------------------------------------------------------------ | --------------- |
| %a、%A                 | 读入一个浮点值(仅 C99 有效)。                                | float  *        |
| %c                     | 单个字符：读取下一个字符。如果指定了一个不为 1 的宽度 width，函数会读取 width 个字符，并通过参数传递，把它们存储在数组中连续位置。在末尾不会追加空字符。 | char  *         |
| %d                     | 十进制整数：数字前面的 + 或 - 号是可选的。                   | int  *          |
| %e、%E、%f、%F、%g、%G | 浮点数：包含了一个小数点、一个可选的前置符号 + 或 -、一个可选的后置字符 e 或 E，以及一个十进制数字。两个有效的实例 -732.103 和 7.12e4 | float  *        |
| %lf                    | 双精度数输入                                                 | double  *       |
| %i                     | 读入十进制，八进制，十六进制整数 。                          | int  *          |
| %o                     | 八进制整数。                                                 | int  *          |
| %s                     | 字符串。这将读取连续字符，直到遇到一个空格字符（空格字符可以是空白、换行和制表符）。 | char  *         |
| %u                     | 无符号的十进制整数。                                         | unsigned  int * |
| %x、%X                 | 十六进制整数。                                               | int  *          |
| %p                     | 读入一个指针 。                                              |                 |
| %[]                    | 扫描字符集合 。                                              |                 |
| %%                     | 读 % 符号。                                                  |                 |

**附加参数** -- 根据不同的 format 字符串，函数可能需要一系列的附加参数，每个参数包含了一个要被插入的值，替换了 format 参数中指定的每个 % 标签。参数的个数应与 % 标签的个数相同。

 

<br>


### 3.4 权限控制函数

#### 3.4.1 Linux权限说明

![](linux-2-1.png)

- 设置用户权限【S：提权和降权】【对应Owner】
- 设置组权限【s：修改当前的组权限】【对应Group】
- 仅所有者可删除权限【t】【对应Other User】
- 读取权限【r | 4】
- 写入权限【w| 2】
- 执行权限【x | 1】
- 头部标志【`d`：文件夹；`l`：链接文件；`-`：文件】

![](linux-3-1.png)

- 
  文件所有者的权限：红色方框

- 文件所有者所在组的权限：蓝色方框

- 其他组的权限：橙色方框



> 在linux中，`s`指的是“强制位权限”，位于user权限组或group权限组的第三位置。s权限位是一个敏感的权限位，容易造成系统的安全问题。
>
> 如果在user权限组中设置了s位，则当文件被执行时，该文件是以文件所有者uid而不是用户uid执行程序；如果在group权限组中设置了s位，当文件被执行时，该文件是以文件所有者gid而不是用户gid执行程序。

 **注意：**

- root例外，其拥有全部权限
- 对进程也是有效的【`/proc`】，对内存也是有效的【某一个进程下的内存】
- 【Linux下一切**都是文件**，进程、内存、网络......】



####  3.4.2 Linux权限控制函数

 **获取用户识别码**

```c++
//头文件：
<unistd.h>
<sys/types.h>
    
//取得有效的用户识别码：【有效的用户：程序启动时所拥有的用户状态】
uid_t geteuid(void)

//取得真实的用户识别码：【真实的用户：当下程序所拥有的用户状态】【部分程序运行时，权限会被改变】【常用**】
uid_t getuid(void)

//如su提权【下图】
//而启动su的，其实是有效用户
```

![](linux-3-2.png)

其中，上面的函数返回值 `uid_t` 为整数类型

- `0`：root 最高权限【没有`<1000`】；
- `[1000~10000)` ：system、数据库、服务、tty、保留的用户；【Linux、Unbuntu等】
- `≥10000`：其他用户【如`Andriod` 每个应用会分配一个用户 ，但系统应用例外；网络用户】

<br>

 **获取组识别码**

```c++
//取得有效的组识别码：【程序启动时】
gid_t getegid(void)
 
//取得真实的组识别码：【程序运行时】
gid_t getgid(void)
```

  示例：

```c++
#include <iostream>
#include <unistd.h>

void lesson22()
{
	std::cout << getuid() << std::endl;
	std::cout << geteuid() << std::endl;
	std::cout << getgid() << std::endl;
	std::cout << getegid() << std::endl;
	std::cout << "setuid:" << setuid(0) << std::endl;
	std::cout << "setgid:" << setgid(0) << std::endl;
	std::cout << getuid() << std::endl;
	std::cout << geteuid() << std::endl;
	std::cout << getgid() << std::endl;
	std::cout << getegid() << std::endl;

	//若修改远程远程项目根目录为：/home/[用户名]/projects
	//运行该项目的.out文件，uid/euid/gid/egid为1000
}

int main()
{
	lesson22();

	return 0;
}
```



<br>

**设置识别码**【以下的内容需要对应的权限】

| 真实用户高权限【程序运行时】 | 有效用户高权限【程序启动时】 | 可以提权 |
| ---------------------------- | ---------------------------- | -------- |
| 真实用户高权限               | 有效用户低权限               | 可以提权 |
| 真实用户低权限               | 有效用户高权限               | 可以提权 |
| 真实用户低权限               | 有效用户低权限               | 不可提权 |

- 权限不足，无法产生效果【权限不足，操作失败返回`-1`；操作成功返回0】
- 提权需要该文件属于高级别的用户或者用户组，即有效用户有更高的权限，或者以更高权限的用户来执行

```c++
//设置真实的用户识别码：
int setuid(uid_t uid)

//设置有效的用户识别码：
int seteuid(uid_t uid)

//设置真实及有效的用户识别码：
int setreuid(uid_t ruid, uid_t euid)
    
  
//设置有效的组识别码：
int setegid(gid_t egid)

//设置真实的组识别码：
int setgid(gid_t gid)
    
//设置真实及有效的组识别码：
int setregid(gid_t rgid, gid_t egid)
```



<br>

**创建会话**

> 【用于守护进程】在bash中执行的命令【如服务、sleep休眠等】，此类进程会随着bash解释器的关闭而直接终止。此时若使用守护进程，即可维持进程在后台运行。

```c++
// 守护进程的关键调用函数【创建新会话】
pid_t setsid(void)
```

注意：守护进程的ID至少小于1000，故用户和组要有足够的权限。如何获取权限：

- 以高权限用户来启动
- 有能力提权【设置识别码】

**创建新会话**：当前进程只能是子进程才能够调用成功【失败返回`-1`】

```c++
void lession23()
{
	std::cout << setsid() << std::endl;//主进程的时候必然失败
}
```

> `3.6` 进程控制函数详解

 

<br>

### 3.5 I/O函数

`I/O` ： `Input/Output`【输入/输出 | 写入/读取，即与文件有很大的关系】【主要用于设备读写】

#### 3.5.1 open/create函数

```c++
//头文件
<sys/types.h> 	//定义flag宏
<sys/stat.h>	//定义flag宏
<fcntl.h>//open
    
//打开文件：
int open(const char *pathname,int flags**, mode_t mode**)
//mode当非O_CREAT时可省略，故写成下面的形式
int open(const char* path,int flags,...)
```

**参数说明：**

- `flags`：多个标志用`|`符号连接【前三者必须三选一】【后两个可与前三组合使用】
  - **O_RDONLY**：只读打开【默认】
  - **O_WRONLY**：只写打开
  - **O_RDWR**：读，写打开
  - `O_CREAT`：若文件不存在，则创建它，**需要使用mode选项**。来指明新文件的访问权
  - `O_APPEND`：追加写，如果文件已经有内容，这次打开文件所写的数据附加到文件的末尾而不覆盖原来的内容【不能与只读`O_RDONLY`搭配】
- `mode`：多个标志用`|`符号连接
  - `S_IRUSR S_IWUSR S_IXUSR`：所有者的读写执行 User
  - `S_IRGRP S_IWGRP S_IXGRP`：所属组的读写执行 Group
  - `S_IROTH S_IWOTH S_IXOTH`：其他用户的读写执行 Other

```c++
//创建一个不存在的文件：【等价于flag=O_CREAT】【灵活度低】
int creat(const char *pathname, mode_t mode)
```

 <br>

#### 3.5.2 文件操作

文件的最主要的操作：**打开【3.5.1】、读取、写入、关闭**

```c++
//头文件
<unistd.h>

//从打开的文件读取文件数据
ssize_t read(int fd, void *buf, size_t count);

char buffer[4096]="";	///缓冲区
read(fd,buffer,sizeof(buffer));
read(fd,buffer+256,sizeof(buffer));//buf可以加偏移
//允许把多个不同文件的数据，读入到同一个缓冲区
//fd可能是：硬盘文件、网络连接、内存、光驱、命令输入输出tty【只要有数据产生】
//buf是一个无类型指针，字符缓冲区、结构体指针
//	【用于文件解析，ELF文件格式】【网络数据包的解析】等等
```

写入与关闭：

```c++
//从打开的文件写入文件数据
ssize_t write(int fd, const void *buf, size_t count)

//fd可以是网络、串口、文件、内存、其他设备
//buf可以加偏移：可以同一个内存段的不同部分，保存到不同的文件中

//关闭文件
int close(int fd)
//Linux（或者其他操作系统）当中可以同时打开的文件数量，是有限的
//一般来讲是4096个文件（验证方法，待网络编程学习完成之后）
```

  <br>

#### 3.5.3 其他文件操作

- 输出重定向
- 文件重定向
- 文件同步

```c++
//复制文件描述符：【输出重定向】
int dup(int oldfd);

//复制文件描述符到新的文件描述符中去【文件重定向】
int dup2(int oldfd, int newfd);

//文件数据同步【写磁盘太慢，故先写入内存缓冲区】
//【该函数强制将缓存中的数据写入磁盘缓冲区，注意并非磁盘盘片】
int fsync(int fd);	//谨慎使用，会耗费时间，常用于数据库同步


   
```



-  文件读写位置修改
- 临时文件

```c++
//头文件
<sys/types.h>
<unistd.h>

//文件读写位置修改
off_t lseek(int fd, off_t offset, int whence);

//whence：
//***SEEK_SET  参数offset 即为新的读写位置.不能为负数
//***SEEK_CUR  以目前的读写位置往后增加offset个位移量【offet允许负值】
//***SEEK_END  将读写位置指向文件尾后再增加offset个位移量【offet允许负值】


//头文件
<stdlib.h>

//创建临时文件【肯定是有读写权限的】【】
int mkstemp(char *template);
//要求template：前缀任意字母，后缀必须为XXXXXX
//创建的文件是临时的，不保证数据长期有效【close文件之前，本次运行前有效】
```



 **文件锁操作**

- 防止文件被篡改导致冲突
- 防止程序多实例，要用到`LOCK_NB`标志来添加锁定
- 多个程序竞争文件控制权【消息分发、文件处理】

```c++
//头文件
<sys/file.h>
    
//文件锁操作
int flock(int fd, int operation);

//operation：
//***LOCK_SH【建立共享锁定】多个进程（程序）可同时对同一个文件作共享锁定。[应用1]
//***LOCK_EX【建立互斥锁定】一个文件同时只有一个互斥锁定。[应用2]
//***LOCK_UN【解除文件锁定状态】文件被关闭的时候，自动解锁；但可能存在时差
//***LOCK_NB【无法建立锁定时，此操作可不被阻断，马上返回进程】通常与LOCK_SH或LOCK_EX做OR(|)组合。

//【NB：NonBlock，非主设备】LOCK_EX无法上锁时会一直等待直到可以上锁，带NB之后不会等待直接返回
```

> 注意：文件锁只是标志，并不能阻止相应的文件操作【即关注时有用，不关注时无效】
>

 <br>

####  3.5.4 文件控制

> 文件控制`control=cntl`。文件操作：打开、关闭、读取、写入、控制

```c++
//头文件
<fcntl.h>

//文件控制操作 
int fcntl(int fd, int cmd, ... /* arg */ );

int fcntl(int fd, int cmd);
int fcntl(int fd, int cmd, long arg);
int fcntl(int fd, int cmd, struct flock *lock); ==> F_GETLK[获取文件锁] F_SETLK[设置文件锁]
```

`cmd`参数说明：

- `F_DUPFD`：用来查找大于或等于参数arg的最小且仍未使用的文件描述符，并且复制参数fd的文件描述符。执行成功则返回新复制的文件描述符。新描述符与fd共享同一文件表项，但是新描述符有它自己的一套文件描述符标志，其中FD_CLOEXEC文件描述符标志被清除。请参考dup2()。
- `F_GETFD`：取得close-on-exec标志。若此标志的`FD_CLOEXEC`位为0，代表在调用`exec()`【进程控制函数】相关函数时文件将不会关闭。【管道】
- `F_SETFD`：设置close-on-exec 标志。该标志以参数arg 的FD_CLOEXEC位决定。
- `F_GETFL`【FL=Flags】：取得文件描述符状态标志，此标志为open（）的参数flags。

- `F_SETFL`：设置文件描述符状态标志，参数arg为新标志，但只允许`O_APPEND`、`O_NONBLOCK`【非阻塞通信】和`O_ASYNC`【异步通信】位的改变，其他位的改变将不受影响。
- `F_GETLK`【LK=Lock】：取得文件锁定的状态。
- `F_SETLK`：设置文件锁定的状态。此时flcok 结构的l_type 值必须是F_RDLCK、F_WRLCK或F_UNLCK。如果无法建立锁定，则返回-1，错误代码为EACCES 或EAGAIN。
- `F_SETLKW`【wait】`F_SETLK` 作用相同，但是无法建立锁定时，此调用会一直等到锁定动作成功为止。若在等待锁定的过程中被信号中断时，会立即返回`-1`，错误代码为EINTR。



<br>

#### 3.5.5 练习

理解文件锁

```c++
#include <cstdio>
#include <iostream>

#include <unistd.h>		//close

#include <fcntl.h>		//lock
#include <sys/file.h>	//lock

#include <errno.h>//errno
#include <string.h>//strerror

void lesson30()
{
	//int fd = open("/home/xin/test.txt", O_RDWR | O_CREAT, S_IRUSR | S_IWUSR | S_IXUSR | S_IRGRP | S_IXGRP | S_IROTH | S_IXOTH);
	//权限可简写为0755，不加0默认为十进制
	int fd = open("/home/xin/test.txt", O_RDWR | O_CREAT, 0755);//权限是八进制的
	if (fd >= 0) {//文件锁其实是一个建议性的锁 
		//printf("write:%d\n", write(fd, "hello", 5));
		//write(fd, "Hello fileLock!", 15);
		printf("flock:%d\n", flock(fd, LOCK_EX));//互斥锁，并打印返回值[会检查文件锁]
		printf("write:%d\n", write(fd, "hello", 5));//返回值为写入长度【应该写不进去】
		sleep(6);
		flock(fd, LOCK_UN);//解锁
		close(fd);
	}
	else {
		std::cout << strerror(errno) << std::endl;
	}
}

int main()
{
	lesson30();
	return 0;
}
```





<br>

### 3.6 进程控制函数

  <span style="background:#FFFF00;">进程是操作系统调度的一个最小的单位；线程是xxxx </span>

#### 3.6.1 执行文件

- `l`：进程执行的参数`arg`，以可变参数的形式给出的【`arg`参数以`NULL`为最后一个参数，即最后一个参数必须为空指针】
- `p`：进程函数会将当前的`PATH`作为一个参考环境变量【即`file`可以是相对路径】
- `e`：进程函数会需要用户来设置这个环境变量【env】
- `v`：进程函数会用参数**数组**来传递`argv`，数组的最后一个成员必须是`NULL`

```c++
#include <unistd.h>
//exec函数系列：不是真正创建进程，本质是替换进程

int execl(const char *path, const char *arg, ...);
int execlp(const char *file, const char *arg, ...);
int execle(const char *path, const char *arg, ..., char * const envp[]);
int execv(const char *path, char *const argv[]);
int execvp(const char *file, char *const argv[]);
int execve(const char * filename,char * const argv[ ],char * const envp[ ]);//内核级别调用
```



#### 3.6.2 建立新进程

```c++
pid_t fork(void);
//返回值：
//大于0的数，此时就是父进程
//等于0的数，此时就是子进程
//小于0的数，表示调用失败
//进程数量是有限的1~32768/32767/65535

//执行fork后，产生两个有先后顺序分支【或者第三个分支为出错，返回值小于0】
//一个分支继续往后执行【父进程：返回值大于0】
//另一个分支创建出一个新进程并执行【返回值为0】
//即fork函数返回两次
```

 示例：

> 虚拟机中对应执行文件：`chase@chase-virtual-machine:/home/xin/Liunx_consoleApplication/bin/x64/Debug$:./Liunx_consoleApplication.out`

```c++
#include <iostream>
#include <unistd.h>

void lesson32()
{
	pid_t pid = fork();
	std::cout << "pid-:" << pid << std::endl;
	if (pid > 0) {
		//sleep(1);
		std::cout << "hello,here is parent!" << pid << std::endl;
	}
	else {
		sleep(3);
		execl("/bin/ls", "ls", "-l", NULL);//argv的第一个参数，一定要是命令的自身
		//execl直接结果相当于执行bash命令：ls -l
	}
	/*执行结果：
	pid - :5656
	hello, here is parent!5656
	pid - : 0
	*/
}

int main()
{
	lesson32();	
	return 0;
}
```



#### 3.6.3 结束进程

```c++
//以异常方式结束进程：【异常退出：不会触发atexit或者on_exit】
void abort(void);
 
//若测试的条件不成立则终止进程：【断言退出：不会触发atexit或者on_exit】
void assert(int expression);

//正常结束进程：【正常结束可以触发结束前调用函数】【推荐】
void exit(int status);

//结束进程执行：不会触发atexit或者on_exit
void _exit(int status);

//************前调函数************
//设置程序正常结束前调用的函数：
int atexit(void (*func)(void));

//设置程序正常结束前调用的函数：
int on_exit(void (* function)(int,void*),void *arg)
```

 示例：

```c++
#include <iostream>
#include <unistd.h>

#include <assert.h>
void lesson33_exit() {
	printf("%s\n", __FUNCTION__);//宏：当前函数名
}
void lesson33_on_exit(int status, void* p) {
	printf("%s p=%p status=%d\n", __FUNCTION__, p, status);
}

void lesson33()
{
	pid_t pid = fork();
	if (pid > 0) {//父进程
		atexit(lesson33_exit);
		//sleep(1);
		std::cout << "hello,here is parent!" << pid << std::endl;
		//abort();//不会触发atexit或者on_exit //触发异常警告
		exit(0);//正常结束进程
	}
	else {//子进程
		on_exit(lesson33_on_exit, (void*)1);
		sleep(3);
		assert(0);//不会触发atexit或者on_exit
		_exit(-1);//不会触发atexit或者on_exit
		//execl("/bin/ls", "ls", NULL);//argv的第一个参数，一定要是命令的自身
		//assert(0);
		//execl("/bin/ls", "ls", "-l", NULL);//argv的第一个参数，一定要是命令的自身
	}
}

int main()
{
	lesson33();	
	return 0;
}
```



#### 3.6.4 改变进程流程【恢复进程】

> x86架构下的指令寄存器是IP【eax-edx】；ARM架构下的指令寄存器是PC【R0-R16】
>
> 程序执行的中最重要的两个：CPU中的寄存器信息、内存中的堆栈信息

```c++
//头文件:
#include <setjmp.h>
#include <signal.h>
//setjmp-longjmp || sigsetjmp-siglongjmp 配对使用
//后者的区别在于传入的sigjmp_buf,它相比jmp_buf缓存了更多信息

//保存目前堆栈环境：【jmp_buf存储的是寄存器信息】
int setjmp(jmp_buf environment);

//保存目前堆栈环境：【sigjmp_buf缓存上下文，savemask为屏蔽处理】
//上下文：堆栈、当前寄存器、当前的状态（线程，进程）、下一条指令的位置、栈内存地址
//sigjmp_buf属于内核对象
int sigsetjmp(sigjmp_buf env, int savemask);



//跳转到原先setjmp保存的堆栈环境：恢复环境，并将value做为setjmp的返回值
void longjmp(jmp_buf environment, int value);

//改变进程优先顺序：跳转到原先sigsetjmp保存的堆栈环境
void siglongjmp(sigjmp_buf env, int val);
```

示例：

> 当程序执行时，如果发生异常错误【如段错误】，`setjmp`就会返回其他的值，此时需要longjmp来恢复寄存器和堆栈环境。
>
> 在下面的代码中，首先 `setjmp` 保存堆栈环境，返回ret必然等于0。如果执行test001，再执行test002发现出现问题，就使用 `longjmp` 恢复堆栈环境，即恢复到 `setjmp` 执行时【即指令寄存器也被修改为指向`setjmp`的下一条指令，也就说跳转程序执行进度】，并将`setjmp`的返回值ret更改【此时就能执行相应的异常处理程序】
>
> 而`signal`函数【与setjmp-longjmp搭配】，能注册错误信息的处理程序，也可以配合`longjmp`进行异常捕获和处理。【sigaction与sigsetjmp-siglongjmp搭配】
>
> 值得注意的是，这种跳转不能用于普通的程序跳转，因为会恢复寄存器，只有存在内存的内容才会保留；此类函数多用于逆向。

```c++
#include <iostream>

#include <setjmp.h>
#include <signal.h>
jmp_buf jmpbuf;//建议设置为全局，不建议为局部【jmp_bug存储寄存器信息】

void test002() {
	//TODO:...
	longjmp(jmpbuf, 1);
}
void test003()
{
	longjmp(jmpbuf, 2);
}
void test001() {
	//TODO:...
	test002();
}

void signal_deal(int sig)
{
	if (sig == SIGSEGV) {
		longjmp(jmpbuf, SIGSEGV);
	}
}

void lesson34()
{
	signal(SIGSEGV, signal_deal);//异常捕获【#include <signal.h>】
	//即注册一个错误信号的处理函数
	//struct sigaction act, actold;
	//act.sa_restorer//初始化 
	//sigaction(SIGSEGV, &act, &actold);

	int ret = setjmp(jmpbuf);
	if (ret == 0) {//实际上是C语言当中，处理异常的一种机制
		//test001();
		*(int*)(NULL) = 0;//制造非法访问
	}
	else if (ret == 1) {//错误1的处理和恢复
		printf("error 1\n");
	}
	else if (ret == 2) {//错误2的处理和恢复
		printf("error 2\n");
	}
	else if (ret == SIGSEGV) {//错误2的处理和恢复
		printf("error SIGSEGV\n");
	}
}

int main()
{
	lesson34();	
	return 0;
}
```



 获取进程信息：【多用于逆向父子调试】

```c++
//取得进程组识别码：
pid_t getpgid(pid_t pid);

//取得当前进程组识别码：
pid_t getpgrp(void);

//取得进程识别码：【唯一】
pid_t getpid(void);

//取得父进程的进程识别码：
pid_t getppid(void);

//取得程序进程执行优先权：【越小越牛】
int getpriority(int which,int who);//#include <sys/resource.h>
```

 

设置进程信息：【降低权限可以，但提高权限必须要足够的权限】

```c++
//设置进程组识别码：
//组识别码：父进程的所有子进程同属一个组【默认】或涉及守护进程
//组识别码没有大小的意义
int setpgid(pid_t pid,pid_t pgid);

//设置进程组识别码：【无参数，将组id设置为进程id】
int setpgrp(void);

//设置程序进程执行优先权：【失败返回-1】
int setpriority(int which,int who, int prio);

//改变进程优先级：修改优先级需要权限（这个一般只有效用户的权限）
int nice(int inc);//inc为相对值
```



示例：

```c++
#include <iostream>

#include <unistd.h>
#include <sys/resource.h>

void lesson35()
{
	std::cout << "getpgid:" << getpgid(getpid()) << std::endl;
	std::cout << "getpid:" << getpid() << std::endl;
	std::cout << "getpgrp:" << getpgrp() << std::endl;
	std::cout << "getppid:" << getppid() << std::endl;
	std::cout << "getpriority:" << getpriority(PRIO_PROCESS, getpid()) << std::endl;
	sleep(15);//可再打开一个bash，使用ps -Al来观察
}
void lesson36()
{
	std::cout << "*getpgrp:" << getpgrp() << std::endl;
	std::cout << "setpgid:" << setpgid(getpid(), 1) << std::endl;
	std::cout << "*getpgrp:" << getpgrp() << std::endl;
	std::cout << "setpgrp(void):" << setpgrp() << std::endl;
	std::cout << "*getpgrp:" << getpgrp() << std::endl;
	std::cout << "$getpriority:" << getpriority(PRIO_PROCESS, getpid()) << std::endl;
	std::cout << "nice:" << nice(3) << std::endl;//降低优先级
	std::cout << "$getpriority:" << getpriority(PRIO_PROCESS, getpid()) << std::endl;
	std::cout << "setpriority:" << setpriority(PRIO_PROCESS, getpid(), 1) << std::endl;//提高优先级【需要权限不一定成功】
	std::cout << "$getpriority:" << getpriority(PRIO_PROCESS, getpid()) << std::endl;//可在su root用户下执行
}

int main()
{
	lesson35();	
	lesson36();
	return 0;
}
```



#### 3.6.5 Wait等待

- system
- wait / waitpid

```c++
<stdlib.h>
//执行shell命令：
int system(char *command)

//等待子进程中断或结束：
<sys/types.h>
<sys/wait.h>

//等待子进程的状态【一般来讲是和fork配套使用】
int wait(int *status);
//先调用fork创建子进程，然后由父进程调用wait
//子进程销毁，会向父进程报告(发送SIGCHILD)【信号量】
//如果父进程没有接收这个报告，则子进程可能成为【僵尸进程】（会占用进程ID——pid）

    
//由于wait无法区分是wait到哪一个子进程，无法区别wait后处理【不可控】
//等待子进程中断或结束：
pid_t waitpid(pid_t pid,int * status,int options);
//@options:
//WNOHANG 非阻塞【nohang在等待过程中可执行其他操作，不阻塞子进程】
//WUNTRACED 被调试【under traced 用于反调试】
//WCONTINUED 发生了信号导致进程暂停 SIGSTOP SIGPAUSE SIGCONT

//@status:【宏】【第一个表征程序如何结束；第二个为具体原因】
//WIFEXITED(status)
//WEXITSTATUS(status)

//WIFSIGNALED(status)
//WTERMSIG(status)

//WIFSTOPPED(status)
//WSTOPSIG(status)
```

 

 示例：

```c++
#include <iostream>

void lesson37()
{
	int ret = system("ls -l");
	printf("system return:%d\n", ret);
	ret = system("mkdir test");
	printf("system return:%d\n", ret);
	char buffer[256] = "";
	snprintf(buffer, sizeof(buffer), "echo \"%s\">test/test.txt", __FUNCTION__);
	printf("%s\n", buffer);
	ret = system(buffer);
	printf("system return:%d\n", ret);
}

int main()
{
	//实现动态构建命令，类似于批处理
	lesson37();	
	return 0;
}
```



<br>

### 3.7 文件和目录函数

> 3.5节IO函数为Linux的文件模型；而此节为真正的文件和目录

#### 3.7.1 文件指针操作

```c++
//打开文件：
FILE* fopen(const char * path,const char * mode); 
//不能指定权限【与open函数的区别】
//默认权限：rw-rw-r-- 或者 rw-r--r--
//*************mode:
//只读权限【r】 如档案
//只写权限【w】 如日志，只记录
//读写权限【r+ 或 w+】
//创建【+】不存在则自动创建
//追加【a】默认从头开始写，覆盖原文件；a为末尾追加
//二进制【b】
//文本【t】ASCⅡ码类的（默认）【b/t二选一】


//关闭文件：
//【文件用完之后，必须要关闭】【需要判断fp是否为空NULL】
int fclose( FILE *fp );


//打开文件：文件输出输入重定向
FILE *freopen( const char *filename, const char *mode, FILE *stream );
//用fopen后printf，输出到标准输出，即控制台输出；而reopen后printf会自动输出到文件
//应用场景：将debug输出输入到文件，不影响控制台输出


//将文件描述词转为文件指针：统一open函数
FILE * fdopen(int fildes,const char * mode);
//用open函数打开的时候，得到的一个fd【file description】
//dfopen可以把文件描述符fd转换为文件指针FILE*
//应用场景：一般fopen无法用fopen打开，如串口、网络、usb【Linux：一切皆文件！！！】
//使用丰富的IO函数进行操作，然后用fdopen转为FILE*进行读写


//返回文件流所使用的文件描述词：FILE*转fd【无法修改权限，故转为fd使用fcntl修改权限】
int fileno( FILE *stream );
```

 示例：

```c++
#include <iostream>

void lesson38()
{
	FILE* pFile = fopen("./test.txt", "w+");
	if (pFile != NULL) {
		//TODO: 读写和处理
		fclose(pFile);
	}
}

void lesson39()
{
	FILE* pFile = freopen("./test.txt", "w+", stdout);//stdout定义在std中
	if (pFile != NULL) {
		printf("%s(%d):%s\n", __FILE__, __LINE__, __FUNCTION__);//三个宏：当前文件名、当前行号、函数名
		fclose(pFile);
	}
	else {
		printf("%s(%d):%s\n", __FILE__, __LINE__, __FUNCTION__);
	}
}

int main()
{
	//实现动态构建命令，类似于批处理
	//lesson38();
	lesson39();
	return 0;
}
```

 



####  3.7.2 文件内容操作

① 读操作：

```c++
//从文件流读取数据：【柱头、盘片、扇区】
//【与早期操作系统读写有关，可以多次读写扇区，每次读写固定大小】
size_t fread( void *buffer, size_t size, size_t count, FILE *stream );
//目标缓冲区：buffer
//每次读取的字节数量：size
//读取多少次：count
//文件指针：stream
//返回值为读取的字节数【未读满size大小不算一次】


//由文件中读取一个字符：【c=char】【成功返回内容；失败返回-1】
int fgetc(FILE *stream);

//由文件中读取一字符串：【s=string】【n为最大长度】
char *fgets(char *str, int n, FILE *stream);
//要求：文件必须以t模式打开，不能以二进制模式打开b【因为无法判断何时终止，二进制读取可能没有\n】
//实际上是读取一行【以\0或者\n为终止符或者发现了EOF = End Of File】
//换行符会被读入到str所指的内存里面

//值得注意的是：*********文件内部是有一个指针的*********
//该指针会记录上次读/写的位置，读写的位置是分开的，统一记录
//每次读写，都可以改变文件中位置的指针记录**************
```

示例：



```cpp
#include <iostream>
#include <string.h>//Linux应用需要：memset

//char buffer[65536] = "";//<512M  <2G
void lesson40()
{
	FILE* pFile = fopen("./test.txt", "r");
	if (pFile != NULL) {
		printf("%s(%d):%s\n", __FILE__, __LINE__, __FUNCTION__);
		//char buffer[4096] = "";//栈上的数据 不要太大（64k==》32k以内）
		char* buffer = new char[1024 * 1024 * 10];//单次内存分配，不要超过2G  64位系统不要超过8G
		memset(buffer, 0, 1024 * 1024 * 10);
		size_t ret = fread(buffer, 1, 1024, pFile);
		//size_t ret = fread(buffer, 1024, 1, pFile);//ret = 0【//返回值为读取的字节数【未读满size大小不算一次】
		printf("%s(%d):%s read count %d\n", __FILE__, __LINE__, __FUNCTION__, ret);
		printf("%s(%d):%s (%s)\n", __FILE__, __LINE__, __FUNCTION__, buffer);
		
		fclose(pFile);
		//fread(buffer, 2, 1000);//用于特定文件类型的差异化读取，如音频读取
	}
	else {
		printf("%s(%d):%s\n", __FILE__, __LINE__, __FUNCTION__);
	}
}

void lesson41()
{
	FILE* pFile = fopen("./test.txt", "r");//仅读
	if (pFile != NULL) {
		printf("%s(%d):%s %c\n", __FILE__, __LINE__, __FUNCTION__, fgetc(pFile));
		char buffer[1024] = "";//最好动态分配，但是因为1024不大，故也可以为局部变量
		printf("%s(%d):%s [%s]\n", __FILE__, __LINE__, __FUNCTION__, fgets(buffer, sizeof(buffer), pFile));
		printf("%s(%d):%s [%d]\n", __FILE__, __LINE__, __FUNCTION__, fgetc(pFile));
		fclose(pFile);
	}
}
int main(int argc, char* argv[])
{
	//lesson40();
	lesson41();
	return 0;
}
```





<br>

② 写入字符与字符串：

> 读一个字符后，文件内指针移动；当再写一个字符时，从上次读的下一个位置直接覆盖写

```c++
//将一指定字符写入文件流中：
int fputc (int c, File *fp);

//将一指定的字符串写入文件内：
int fputs(const char *str, FILE *stream);

//注意：遇到str中的\0字符时，终止写入
//注意：str必须是标准C语言字符串【以0或者空字符为结尾的字符串】；否则将会一致写下去导致不可知错误
```

 示例：

```c++
#include <iostream>

void lesson42()
{
	FILE* pFile = fopen("./test.txt", "r+");//可读写
	if (pFile != NULL) {
		printf("%s(%d):%s %c\n", __FILE__, __LINE__, __FUNCTION__, fgetc(pFile));
		fputc('/', pFile);
		char buffer[1024] = "";
		//从此时的文件内指针开始读一行
		printf("%s(%d):%s [%s]\n", __FILE__, __LINE__, __FUNCTION__, fgets(buffer, sizeof(buffer), pFile));
		//再读一个字符
		printf("%s(%d):%s [%d]\n", __FILE__, __LINE__, __FUNCTION__, fgetc(pFile));
		fputs(__FUNCTION__, pFile);
		fclose(pFile);
	}
}
int main(int argc, char* argv[])
{
	lesson42();
	return 0;
}
```

<br>

③ 标准写入：

```c++
//将数据写至文件流：
size_t fwrite(const void *ptr, size_t size, size_t nmemb, FILE *stream);
//ptr：待写入内容的地址
//size：写入次数
//nmemb：写入字节数


//更新缓冲区：【时间消耗是不可控的】
//写入Disk硬盘时并非直接写入，而是先写入内存缓冲区，达到一定量时再写入硬盘缓冲区，最后慢慢进行读写。这种策略可以实现高速读写
int fflush(FILE *stream);

```

示例：

```c++
#include <iostream>

struct Test {
	int id;
	char name[64];
	int age;
};

void lesson43()
{
	FILE* pFile = fopen("./test1.txt", "w+");//+意为如果不存在则创建
	if (pFile) {
		struct Test data = {
			1000,"tiger",28
		};
		size_t ret = fwrite(&data, 1, sizeof(Test), pFile);
		printf("%s(%d):%s ret = %d\n", __FILE__, __LINE__, __FUNCTION__, ret);
		fclose(pFile);
	}
	pFile = fopen("./test1.txt", "rb");//以二进制形式读，因为不再是文本，而是二进制数据
	if (pFile) {
		struct Test read;
		size_t ret = fread(&read, 1, sizeof(Test), pFile);
		printf("%s(%d):%s ret = %d\n", __FILE__, __LINE__, __FUNCTION__, ret);
		fclose(pFile);
		printf("%s(%d):%s ret = %d\n", __FILE__, __LINE__, __FUNCTION__, read.id);
		printf("%s(%d):%s ret = [%s]\n", __FILE__, __LINE__, __FUNCTION__, read.name);
		printf("%s(%d):%s ret = %d\n", __FILE__, __LINE__, __FUNCTION__, read.age);
	}
}
int main(int argc, char* argv[])
{
	lesson43();
	return 0;
}
```



<br>

#### 3.7.3 文件内指针操作

获取和设置文件内指针

```c++
//取得文件流的读取位置：
long ftell(FILE *stream);

//移动文件流的读写位置：
int fseek(FILE *stream, long offset, int fromwhere);
//offset:偏移
//fromwhere:位置选项 [SEEK_SET | SEEK_CUR | SEEK_END]
//SEEK_SET 从文件的开头计算位置【offset值不可为负数】
//SEEK_CUR 从文件的当前位置开始计算【offset值可为负数】
//SEEK_END 从文件的尾部开始计算位置【offset值可为负数】
//注意：fseek在跳转的时候，和文件实际的大小不一定一样，可以超过实际大小


//应用于64位文件读取
//取得文件流的读取位置：
int fgetpos(FILE* stream，fpos_t* pos);

//移动文件流的读写位置：
int fsetpos(FILE *stream, const fpos_t *pos);
//通过fgetpos获取fpos_t,再修改pos.__pos值来进行跳转
```

示例：

```c++
#include <iostream>

void lesson44()
{
	FILE* pFile = fopen("./test.txt", "r");
	if (pFile) {
		printf("%s(%d):%s ftell = %d\n", __FILE__, __LINE__, __FUNCTION__, ftell(pFile));
		printf("%s(%d):%s %c\n", __FILE__, __LINE__, __FUNCTION__, fgetc(pFile));
		printf("%s(%d):%s ftell = %d\n", __FILE__, __LINE__, __FUNCTION__, ftell(pFile));

		//fseeko64();
		fseek(pFile, 0, SEEK_SET);//SEEK_CUR, SEEK_END;
		printf("%s(%d):%s %c\n", __FILE__, __LINE__, __FUNCTION__, fgetc(pFile));
		fseek(pFile, -1, SEEK_CUR);
		printf("%s(%d):%s %c\n", __FILE__, __LINE__, __FUNCTION__, fgetc(pFile));
		fseek(pFile, -66, SEEK_END);
		printf("%s(%d):%s %c\n", __FILE__, __LINE__, __FUNCTION__, fgetc(pFile));
		printf("%s(%d):%s ftell = %d\n", __FILE__, __LINE__, __FUNCTION__, ftell(pFile));
		printf("\n\n");

		fpos_t pos;
		fgetpos(pFile, &pos);//应用于64位文件读写
		//fgetpos64()
		pos.__pos -= 1;//记录offset值
		fsetpos(pFile, &pos);
		printf("%s(%d):%s %c\n", __FILE__, __LINE__, __FUNCTION__, fgetc(pFile));
		printf("%s(%d):%s ftell = %d\n", __FILE__, __LINE__, __FUNCTION__, ftell(pFile));
		fclose(pFile);
	}
}
int main(int argc, char* argv[])
{
	lesson44();
	return 0;
}
```



#### 3.7.4 文件流标志

```c++
//检查文件流是否读到了文件尾：
int feof(FILE *stream);
//feof 文件未到尾部返回为0，否则为1
//注意：
//文件读到最后一个字节，并不会触发feof
//必须要再读取内容，才会触发feof


//清除文件流的错误旗标：
void clearerr(FILE *stream);

//获取指定文件的处理错误
int ferror(FILE* stream);
```

示例：

```c++
#include <iostream>
#include <string.h>

void lesson45()
{
	FILE* pFile = fopen("./test.txt", "r");//r为只读；r+为读写
	if (pFile) {
		char buffer[1024] = "";
		//加入要读很多行，就要用到判断文件结尾
		while (!feof(pFile)) {
			printf("%s(%d):%s feof = %d\n", __FILE__, __LINE__, __FUNCTION__, feof(pFile));
			memset(buffer, 0, sizeof(buffer));//<string.h>
			//Linux下的内存清理
			//bzero(buffer, sizeof(buffer));
			printf("%s(%d):%s [%s]\n", __FILE__, __LINE__, __FUNCTION__, fgets(buffer, sizeof(buffer), pFile));
		}
		printf("%s(%d):%s feof = %d\n", __FILE__, __LINE__, __FUNCTION__, feof(pFile));
		printf("\n\n");

		//fopen为r时，写出错ferror返回1
		printf("%s(%d):%s ferror = %d\n", __FILE__, __LINE__, __FUNCTION__, ferror(pFile));
		fputc('a', pFile);
		printf("%s(%d):%s ferror = %d\n", __FILE__, __LINE__, __FUNCTION__, ferror(pFile));
		
		//虽然不可以写，但仍然可以设置文件内的读指针；需要先清理错误标志
		clearerr(pFile);
		fseek(pFile, 200, SEEK_SET);
		printf("%s(%d):%s ferror = %d\n", __FILE__, __LINE__, __FUNCTION__, ferror(pFile));
		printf("%s(%d):%s ftell = %d\n", __FILE__, __LINE__, __FUNCTION__, ftell(pFile));
		printf("%s(%d):%s  %d\n", __FILE__, __LINE__, __FUNCTION__, fgetc(pFile));
		printf("\n\n");

		fputc('a', pFile);
		fseek(pFile, -1, SEEK_CUR);
		printf("%s(%d):%s %c\n", __FILE__, __LINE__, __FUNCTION__, fgetc(pFile));
		fclose(pFile);
	}
}
int main(int argc, char* argv[])
{
	lesson45();
	return 0;
}
```

 

<br>

#### 3.7.5 目录操作

- 创建/删除目录
- 修改文件/目录所有者或权限，以及关于链接文件
- 目录操作函数

```c++
//<sys/types.h> 记录宏常量
//<sys/stat.h>  文件的状态结构体和相关的宏
//<unistd.h>    标准头文件，记录一些函数的定义

//创建文件夹：若成功则返回0，否则返回-1
int mkdir(const char *pathname,mode_t mode);//mode同3.5.1权限mode

//删除*空文件夹：成功返回0，错误返回-1
int rmdir(const char *pathname);

//删除【文件 | 空的文件夹 | 链接】【效果等于rm指令】
int remove(const char *pathname);
```

示例：

```c++
#include <iostream>

#include <sys/types.h>
#include <sys/stat.h>//定义权限宏常量
#include <unistd.h>

void lesson46()
{
	int ret = 0;
	//ret = rmdir(__FUNCTION__);
	//printf("%s(%d):%s ret = %d\n", __FILE__, __LINE__, __FUNCTION__, ret);

	ret = mkdir(__FUNCTION__, S_IRUSR | S_IWUSR | S_IXUSR | S_IRGRP | S_IXGRP | S_IROTH);
	printf("%s(%d):%s ret = %d\n", __FILE__, __LINE__, __FUNCTION__, ret);
	printf("\n\n");

	system("echo \"test\" > lession46/test.txt");
	ret = rmdir(__FUNCTION__);//-1：无法删除文件非空文件夹[sh: 1: cannot create lession46/test.txt: Directory nonexistent]
	printf("%s(%d):%s rmdir ret = %d\n", __FILE__, __LINE__, __FUNCTION__, ret);
	ret = remove("lession46/test.txt");//0:成功
	ret = remove(__FUNCTION__);//删除空文件夹成功
	printf("%s(%d):%s remove ret = %d\n", __FILE__, __LINE__, __FUNCTION__, ret);
	//ret = rmdir(__FUNCTION__);
	//printf("%s(%d):%s rmdir ret = %d\n", __FILE__, __LINE__, __FUNCTION__, ret);
}
int main(int argc, char* argv[])
{
	lesson46();
	return 0;
}
```

<br>

**修改文件/目录所有者或权限**

> 下面两个接口可以用system函数进行替代
>

命令：`chown 用户.组  目标文件或者文件夹`

> 一般而言，用户和组的代码都一样
>
> 比如 root用户它有一个专属的分组，就叫root
>
> 比如system用户，对应分组也叫system
>
> 比如feng这个用户，对应的分组也叫feng
>

```c++
//修改文件或者目录的用户或者组
int chown(const char *path, uid_t owner, gid_t group);
//owner和group一般呢也是一样的

<sys/stat.h>
//修改文件或者目录的权限（需要对应权限）
int chmod(const char *path, mode_t mode); 

//删除链接（也可以删除文件）【remove也可以删除链接】
int unlink(const char *pathname);
//创建链接文件【-s：软连接，相当于快捷方式】
//ln -s 源文件地址 链接文件地址
```

 示例：

```c++
#include <iostream>

#include <sys/stat.h>//定义权限宏常量
#include <unistd.h>

void lesson47()
{
	int ret = 0;
	uid_t uid = getuid();
	gid_t gid = getgid();
	ret = chown("./test", uid, gid);
	printf("%s(%d):%s chown = %d uid = %d gid = %d\n", __FILE__, __LINE__, __FUNCTION__, ret, getuid(), getgid());
	//程序内提权【su】
	//需要 sudo chmod 6755 filename.out【权限修改为：-rwsr-sr-x】
	setuid(0);
	ret = chown("./test", uid, gid);
	printf("%s(%d):%s chown = %d uid = %d gid = %d\n", __FILE__, __LINE__, __FUNCTION__, ret, getuid(), getgid());
	
	ret = chmod("test.txt", 0600 | S_IRGRP | S_IROTH);//相当于0644
	printf("%s(%d):%s chmod = %d\n", __FILE__, __LINE__, __FUNCTION__, ret);

	ret = unlink("test.txt");
	printf("%s(%d):%s unlink = %d\n", __FILE__, __LINE__, __FUNCTION__, ret);
}

int main(int argc, char* argv[])
{
	lesson47();
	return 0;
}
```



 <br>

 **目录操作函数** 

```c++
//<sys/types.h>【包含一些宏】
//<dirent.h>

//打开目录
DIR *opendir(const char *name);

//关闭目录
int closedir(DIR *dirp);

//读取目录
struct dirent * readdir(DIR * dir);
//返回值pCur为dirent结构体，pCur->d_type为文件类型
//对于d_type：
//DT_UNKNOWN：未知【值为0】
//DT_FIFO：管道【值为1】
//DT_CHR：字符设备【值为2】
//DT_DIR：目录【值为4】
//DT_BLK: 块设备【值为6】
//DT_REG：普通文件【值为8】
//DT_LNK：软连接【值为10】
//DT_SOCK：套接字文件【值为12】

struct dirent 
{ 
   long d_ino; /* inode number 索引节点号 */ 
   off_t d_off; /* offset to this dirent 在目录文件中的偏移 */ 
   unsigned short d_reclen; /* length of this d_name 文件名长 */ 
   unsigned char d_type; /* the type of d_name 文件类型 */ 
   char d_name [NAME_MAX+1]; /* file name (null-terminated) 文件名，最长255字符 */ 
} 
```

示例：

```c++
#include <iostream>

#include <sys/types.h>
#include <dirent.h>
#include <string.h>

void dump_files(const char* root)
{
	printf("***************************************************************\n");
	DIR* proot = opendir(root);//打开目录
	if (proot == NULL) {
		printf("%s(%d):%s ~ is not exist!\n", __FILE__, __LINE__, __FUNCTION__);
		return;
	}
	dirent* pCur = NULL;
	do {
		pCur = readdir(proot);
		if (pCur != NULL) {
			if (strcmp(pCur->d_name, ".") == 0 || strcmp(pCur->d_name, "..") == 0)
				continue;
			if (pCur->d_type & DT_DIR) {//如果为目录4
				char buffer[512] = "";
				snprintf(buffer, sizeof(buffer), "%s/%s", root, pCur->d_name);//缓冲形成绝对路径
				printf("%s(%d):%s %s\n", __FILE__, __LINE__, __FUNCTION__, buffer);
				dump_files(buffer);
			}
		}
	} while (pCur != NULL);
	closedir(proot);
	printf("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$\n");
}

void lesson48()
{
	dump_files("/home/feng/projects");
	//DIR* proot = opendir("/home/feng");
	//if (proot == NULL) {
	//	printf("%s(%d):%s ~ is not exist!\n", __FILE__, __LINE__, __FUNCTION__);
	//	return;
	//}
	//dirent* pCur = NULL;
	//do {
	//	pCur = readdir(proot);
	//	if (pCur != NULL) {
	//		if (strcmp(pCur->d_name, ".") == 0 || strcmp(pCur->d_name, "..") == 0)
	//			continue;
	//		if (pCur->d_type & DT_DIR) {
	//			printf("%s(%d):%s %s\n", __FILE__, __LINE__, __FUNCTION__, pCur->d_name);
	//		}
	//	}
	//} while (pCur != NULL);
	//closedir(proot);
}

int main(int argc, char* argv[])
{
	dump_files("/home/chase/Linux_consoleApplication");
	return 0;
}
```







 <br>

<hr style="border-top: 1px dashed #8c8b8b;border-bottom: none;">

## 4 网络编程基础

### 4.1 网络的基本概念

#### 4.1.1 网络的物理结构

数据是如何从一台机器传输到另外一台机器？

![](linux-4-1.png)

中断接口→操作系统→网络数据接收接口就会有数据 

【数据→系统→网卡→路由器→modem】→互联网→【modem→路由器→网卡→系统→接收程序】



**光纤千兆网络**

需要：千兆光纤线、千兆光纤转接口、工作中的转接口、光纤交换机



 <br>

#### 4.1.2 网络中的地址(IP)

> 并不是所有的地址都是可以用的
>

32位网络地址由四个字节构成【4 x 8，共`255 x 255 x 255 x 255` 个】

**注意：**

- 以0开头【第一个字节】的地址，都是不可以用的
- 以0结尾【第四个字节】的地址，表示的是网段，而不是具体的地址
- 224开头到239开头的地址，是**组播**地址，不可用于点对点的传输【组播可以理解为`tcp/udp`上面的广播，可以极大的节约带宽】【问题：容易形成网络风暴】
- 240开头到255开头的地址【实验用，保留，一般不做服务器或者终端地址】
- `127.0.0.1`保留：回环网络的地址【本机网络：往这个地址发任何数据，都会被回发回来】
- `0.0.0.0`保留：一般用于服务器监听的，表示全网段监听
- 内网保留地址或IPv4专用地址【内网是可以访问互联网的，但需要一台服务器或路由器做网关，通过网关来连接互联网】
  - Class A `10.0.0.0 - 10.255.255.255`【默认子网掩码：255.0.0.0】
  - Class B `172.16.0.0 - 172.31.255.255`【默认子网掩码：255.240.0.0】
  - Class C `192.168.0.0 - 192.168.255.255`【默认子网掩码：255.255.0.0】

![](linux-4-2.png)

A类【大型网络地址】、B类【中型网络】、C类【常用】用于不同规模的网络；D类用于组播；E类保留，用于实验、私有网络

**注意**：

- 大型服务器大部分都是有多个地址IP的【用于全网络服务、内外网区别访问】



 

 <br>

#### 4.1.3 网络中的端口

**公认端口**（Well Known Ports）：这类端口也常称之为"常用端口"，如：

- 443：加密https服务
- 22：ssh
- 80：实际上总是HTTP通信所使用
- 23：Telnet服务专用

这类端口的端口号从0到1024，它们紧密绑定于一些特定的服务。通常这些端口的通信明确表明了某种服务的协议，这种端口是不可再重新定义它的作用对象【此类端口通常不会被黑客程序利用】



**注册端口**（Registered Ports）：端口号从1025到49151。

- 3306：Mysql

它们松散地绑定于一些服务，同时这些端口同样用于许多其他目的。另外，这些端口多数没有明确的定义服务对象，不同程序可根据实际需要自定义，如后面要介绍的远程控制软件和木马程序中都会有这些端口的定义。

> 记住这些常见的程序端口在木马程序的防护和查杀上是非常有必要的，常见木马所使用的端口在后面将有详细的列表。



**动态和私有端口**（Dynamic and/or Private Ports）：端口号从49152到65535【不要轻易作为服务器的监听端口，除非确认服务器不会向未知IP发起请求；防火墙等会将此类端口严格管理甚至拒绝】

> 理论上，不应把常用服务分配在此类端口上。
>
> 实际上，有些较为特殊的程序，特别是一些木马程序就非常喜欢用这些端口，因为这些端口常常不被引起注意，容易隐蔽。
>
> 端口并非只有服务器才会使用，客户端也一样会使用端口。



 <br>

#### 4.1.4 什么是协议？

TCP协议包头说明：

> TCP/UDP 位于传输层；协议位于第七层应用层

![](linux-4-3.png)

 HTTP协议的包头样例：

```
GET /search/detail?ct=503316480&z=0&ipn=d
HTTP/1.1
Host: pic.baidu.com
Connection: keep-alive
Cache-Control: max-age=0
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.25 Safari/537.36 Core/1.70.3766.400 QQBrowser/10.6.4163.400
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8
Accept-Encoding: gzip, deflate, br
Accept-Language: zh-CN,zh;q=0.9
```



SSH数据包头结构：

```
struct sshhead
{
	unsigned int tlen;
	unsigned char plen;
	unsigned char msgcode;
	sshead(){tlen=6;}
};
```

 

**协议**就是一种**网络式交互中数据格**和**交互流程**的约定。通过协议，我们可以与远程的设备进行数据交互，请求或者完成对方的服务【**协议就是计算机中特定任务的语言、约定**】



<br>

#### 4.1.5 TCP协议基础

传输控制协议【TCP，Transmission Control Protocol】是一种**面向连接的**、**可靠的**、**基于字节流**的**传输层**通信协议

> **可靠的协议**：UDP协议是不可靠的协议；TCP协议是可靠的，但是牺牲了性能
>
> **基于字节流**：可以发1个字节，也可以发1万个字节，以字节为单位，数据是字节流；而http为文本流

 

交互流程：

 ![](linux-4-4.png)

很多时候，只有**超时处理**才能解决物理连接中断；而默认的超时，可能长达两个小时，这样造成很大的性能损失。

弥补：**心跳包的机制**，即强制询问双方是否在线。如果终止或者异常连续超过若干次【三次】，则判定物理连接错误。【也常用于提升UDP的可靠性】

 

<br>

### 4.2 套接字

#### 4.2.1 什么是套接字

网络编程就是编写程序使**两台连网的计算机相互交换数据**。

两台计算机之间用什么传输数据呢？首先需要物理连接，在此基础上，只需考虑如何编写**数据传输软件**。

但实际上这也不用愁，因为操作系统会提供名为"套接字"【socket】的部件。**套接字是网络数据传输用的软件设备**。【即使对网络数据传输原理不太熟悉，我们也能通过套接字完成数据传输。因此，网络编程又称为套接字编程】

> 那为什么要用"套接字"这个词呢？套接字在英文里面就是“插孔/插座”的意思。
>
> 就如同我们要用电，要用到插孔，同样的，对于我们要用网络，那么就要用到socket。

![](linux-4-5.png)

 

<br>

#### 4.2.2 套接字的创建【socket函数】

套接字有很多种，其中用的最多的是TCP和UDP。【考虑到我们现在能用的上的，我们先要讨论的TCP套接字】

TCP套接字可以比喻成**电话机**。实际上，电话机也是通过固定电话网【telephone network】完成语音数据交换的。打个比方：创建一个套接字就相当于是安装了一部电话机。

```c++
//Linux 下的头文件
#include <sys/socket.h>

//成功时返回文件描述符，失败时返回-1
int socket(int domain, int type, int protocol);
//domain【域】套接字中使用的协议族（Protocol Family）信息
//type套接字数据传输类型信息
//protocol【协议】计算机间通信中使用的协议信息
```

 

**参数一：domain 【Protocol Family】** 

> 头文件 `sys/socket.h` 中声明的协议族，下面节选5个【`PF`与`AF`有一一对应关系】【`Address Family`】
>

|   名称    |         协议族         | 说明                 |
| :-------: | :--------------------: | -------------------- |
|  PF_INET  |    IPv4互联网协议族    | 最常用，应掌握       |
| PF_INET6  |    IPv6互联网协议族    |                      |
| PF_LOCAL  |  本地通信的UNIX协议族  |                      |
| PF_PACKET |   底层套接字的协议族   | Socket直接操作IP协议 |
|  PF_IPX   | IPX Novell互联网协议族 |                      |

 

**参数二：套接字类型：type**

套接字类型指的是套接字的**数据传输方式**，通过socket函数的第二个参数传递，只有这样才能决定创建的套接字的数据传输方式。

> 为什么已通过第一个参数传递了协议族信息，还要决定数据传输方式？
>
> 问题就在于，决定了协议族并不能同时决定数据传输方式。换言之，socket函数第一个参数`PF_INET`协议族中也存在多种数据传输方式。 



<span style="background:#FFFF00;">套接字类型1∶面向连接的套接字【SOCK_STREAM】【TCP】</span>

如果向socket函数的第二个参数传递`SOCK_STREAM`，将创建**面向连接**的套接字【可靠的、按序传递的、基于字节的面向连接的数据传输方式的套接字】

> 什么是面向连接呢？数据的传输方式有三个特点：
>
> - 传输的过程数据不会丢失   
>- 按顺序传输
> - 传输的过程中不存在数据边界
>

> 数据边界是什么？
>
> 举个例子：100个糖果是分批传递的，但接收者凑齐100个后才装袋。再比如：传输数据的计算机通过3次调用write函数传递了100字节的数据，但接收数据的计算机仅通过1次read函数调用就接收了全部100个字节。
>

 收发数据的套接字内部有缓冲（buffer），简言之就是字节数组。通过套接字传输的数据将保存到该数组。因此，收到数据并不意味着马上调用read函数，只要不超过数组容量，则有可能在数据填充满缓冲后通过1次read函数调用读取全部，也有可能分成多次read函数调用进行读取。也就是说，**在面向连接的套接字中，read函数和write函数的调用次数并无太大意义**。所以说面向连接的套接字不存在数据边界。【更直观的举例，发了三次次两字节的数据，接受的不一定是三组两字节的数据，即没有数据边界】

> 🔺经典问题：没有数据边界，会导致粘包问题，即无法区分两个包的边界。
>
> 解决：自定义包的边界标志

<br>

 

<span style="background:#FFFF00;">套接字类型2∶面向消息的套接字【SOCK DGRAM】【UDP】</span>

如果向socket函数的第二个参数传递`SOCK_DGRAM`，则将创建**面向消息的套接字**。面向消息的套接字可以比喻成高速移动的摩托车快递。数据（包裹）的传输方式有四个特点：

- 强调快速传输而非传输顺序 
- 传输的数据可能丢失也可能损毁
- 传输的过程中不存在数据边界
- 限制每次传输的数据大小

面向消息的套接字：不可靠的、不按序传递的、以数据的高速传输为目的的套接字【用于音频/视频】

<br>

 

**参数三：protocol 计算机间通信中使用的协议信息**

大部分情况下可以向第三个参数传递0，当前两个参数确定之后，自动匹配一个最佳参数。

除非遇到以下这种情况∶【对协议研究较深入时】同一协议族中存在多个数据传输方式相同的协议，即数据传输方式相同，但协议不同。此时需要通过第三个参数具体指定协议信息。

 <br>

 

#### 4.2.3 套接字绑定地址和端口【bind函数】

- bind函数及其参数
- 网络字节序与地址变换

```c++
#include<sys/socket.h> //Linux

//成功时返回0，失败时返回-1
int bind(int sockfd, struct sockaddr *myaddr, socklen_t addrlen);
//调用bind函数给套接字分配地址后，就基本完成了接电话的所有准备工作

//参数一：套接字描述符 sockfd
//要分配地址信息（IP地址和端口号）的套接字文件描述符

//参数三：第二个结构体变量的长度【一般直接用sizeof(第二个参数)】
//第二个参数根据第三参数，来确定第二参数的解析方式
```

如果把**套接字**比喻为电话，那么目前只安装了电话机。接着就要给电话机分配号码的方法，即使用bind函数给套接字分配 **IP地址和端口号**。



**参数二：存有地址信息的结构体变量地址值**【myaddr】

<span style="background:#FFFF00;">网络地址：</span>

- 4字节地址族【IPv4：Internet Protocol version 4】

- 16字节地址族【IPv6：Internet Protocol version 6】

![](linux-4-6.png)

只需通过IP地址的第一个字节即可判断网络地址占用的字节数，因为我们根据IP地址的边界区分网络地址：

- A类地址的首字节范围∶0~127 【A类地址的首位以0开始】

- B类地址的首字节范围∶128~191 【B类地址的前2位以10开始】

- C类地址的首字节范围∶192~223 【C类地址的前3位以110开始】


<br>

<span style="background:#FFFF00;">端口 ：</span>

- IP用于区分计算机，端口用于在同一操作系统内为区分不同套接字而设置的，因此无法将1个端口号分配给不同套接字。
- 另外，端口号由`16位`构成，可分配的端口号范围是`0-65535`。但`0-1023`是知名端口，一般分配给特定应用程序。
- 虽然端口号不能重复，但TCP套接字和UDP套接字不会共用端口号，所以允许重复。例如：如果某TCP 套接字使用9190号端口，则其他TCP套接字就无法使用该端口号，但UDP套接字可以使用。

总之，数据传输目标地址同时包含**IP地址和端口号**。只有这样，数据才会被传输到最终的目的应用程序【应用程序套接字】。

```c++
//地址信息的表示：
struct sockaddr_in //in：internet
{
	sa_family;//地址族（Address Family）【基本固定】
    sa_family_t sin_family;// //地址族（Address Family）【基本固定】
    uint16_t sin_port; // 16位TCP/UDP端口号
    struct in_addr sin_addr; //32位IP地址，以【网络字节序】保存【应同时参考结构体in_addr，其声明为uint32t，因此只需当作32位整数型即可】
    char sin_zero[8]; //不使用，无特殊含义【只是为使结构体sockaddr_in的大小与sockaddr结构体保持一致而插入的成员。必需填充为0，否则无法得到想要的结果。】
}

//该结构体中提到的另一个结构体in_addr定义如下，它用来存放32位IP地址：
struct in_addr
{
	In_addr_t s_addr; //32位IPv4地址
};
```

>  成员`sin_family` --- 地址族【Address Family】：
>
> ![](linux-4-7.png)

<br>

 

**网络字节序与地址变换**

- 大端序【Big Endian】：数值的高位字节存放在内存的低地址端，低位字节存放在内存的高地址端【如`0x1A2B3C4D`】

  ```plainText
  内存低地址 --------------------> 内存高地址
  0x1A | 0x2B | 0x3C | 0x4D
  高位字节 <-------------------- 低位字节
  ```

  

- 小端序【Little Endian】：高位字节存放到高位地址。


**字节序转换：**

```c++
//通过函数名掌握其功能
//htons中的h代表主机（host）字节序；n代表网络（network）字节序
unsigned short htons(unsigned short);
unsigned short ntohs(unsigned short);//可以解释为"把short型数据从网络字节序转化为主机字节序"
unsigned long htonl(unsigned long);//long四字节为IP
unsigned long ntohl(unsigned long);//long四字节为IP
```

示例：

> `bind`函数的第二参数是一个结构体指针，设计初衷是C/C++接口编程。由于C不支持函数重载，故只能用这样的形式来兼容C。

```c++
#include <unistd.h>
#include <sys/socket.h>
#include <sys/types.h>
#include <arpa/inet.h>

void lesson57()
{
	int sock = socket(PF_INET, SOCK_STREAM, 0); //<sys/socket.h> <sys/types.h>
	if (sock != -1) {
		struct sockaddr_in addr;
		addr.sin_family = AF_INET;// <sys / socket.h>
		//<arpa/inet.h>::inet_addr:该函数将string转为网络地址，即4字节
		addr.sin_addr.s_addr = inet_addr("192.168.0.1");
		addr.sin_port = htons(9527);//short的主机字节序转为网络字节序
		int ret = bind(sock, (struct sockaddr*)&addr, sizeof(addr));
		if (ret != 0) {
			//报错在此
		}
	}
}

int main(int argc, char* argv[])
{
	lesson57();
	return 0;
}

//struct sockaddr_in addr;
//memset(&addr,0,sizeof(addr);//结构体变量addr的所有成员初始化为0
//INADDRANY
//每次创建服务器端套接字都要输入IP地址会很繁琐，此时可初始化地址信息为INADDRANY。
//addr.sin_addr.s_addr=htonl(INADDRANY);
```

 

 <br>

#### 4.2.4 listen函数

```c++
#include <sys/socket.h>

//成功时返回0，失败时返回-1
int listen(int sock,int backlog);
```

参数说明：

- sock希望进入**等待连接请求状态**的套接字文件描述符，传递的描述符套接字参数成为服务器端套接字【监听套接字】
- `backlog `为**连接请求等待队列**【Queue】的长度。若为5，则队列长度为5，表示最多使5个连接请求进入队列【即一瞬间可以同时处理多少连接请求】【≤1ms】

 ![](linux-4-8.png)

由上图可知，作为`listen`函数的第一个参数【文件描述符套接字】的用途：

客户端连接请求本身也是从网络中接收到的一种数据，而要想接收就需要套接字。此任务就由服务器端套接字完成，它可以比作是接收连接请求的一名门卫或一扇门。

> 客户端如果向服务器端询问：“请问我是否可以发起连接？”
>
> 服务器端套接字就会亲切应答∶"您好！当然可以，但系统正忙，请到等候室排号等待，准备好后会立即受理您的连接。” 同时将连接请求安排到等候室。
>

- 调用`listen`函数即可生成这种门卫【服务器端套接字】
- `listen`函数的第二个参数决定了等候室的大小
- 等候室称为连接请求等待队列。准备好服务器端套接字和连接请求等待队列后，这种可接收连接请求的状态称为**等待连接请求状态**
- `listen`函数的第二个参数值与服务器端的特性有关，像频繁接收请求的Web服务器端至少应为15【另外，连接请求队列的大小始终根据实验结果而定】。



 <br>

#### 4.2.5 accept函数

```c++
#include<sys/socket.h>

//成功时返回创建的套接字文件描述符，失败时返回-1
//默认为阻塞状态，
int accept(int sock, struct sockaddr * addr, socklen_t* addrlen);
```

参数说明：

- `sock`：服务器套接字的文件描述符

- `addr`：保存发起连接请求的客户端地址信息的变量地址值，调用函数后向传递来的地址变量参数填充客户端地址信息【因为存在伪造的可能，故仅供参考】
- `addrlen`：第二个参数结构体的长度，但是存有长度的变量地址。函数调用完成后，该变量即被填客户端地址长度。

![](linux-4-9.png)

> 调用`listen`函数后，若有新的连接请求，则应按序受理。如果在与客户端的数据交换中使用门卫，那谁来守门呢？因此需要另外一个套接字，但没必要亲自创建。此时accept应运而生。
>

`accept` 函数受理**连接请求等待队列**中待处理的客户端连接请求。函数调用成功时，accept函数内部将产生用于**数据I/O的套接字，并返回其文件描述符**。套接字是自动创建的，并自动与发起连接请求的客户端建立连接【上图展示了`accept`函数调用过程】

 

<br>

### 4.3 TCP编程

#### 4.3.1 TCP/IP协议栈

> 为什么要理解协议栈？学习C/C++就是要懂底层的原理，否则永远都是调包侠。
>

根据数据传输方式的不同，基于网络协议【TCP/IP协议】的套接字一般分为TCP套接字和UDP套接字。因为TCP套接字是面向连接的，因此又称基于流【`stream`】的套接字。

>  `TCP`是`Transmission Control Protocol`【传输控制协议】的简写，意为"对数据传输过程的控制"，即可靠的连接。

 ![](linux-4-10.png) 

**第一层次：数据链路层**

如上图所示：链路层是物理链接领域标准化的结果，也是最基本的领域。专门定义LAN、WAN、MAN等网络标准。若两台主机通过网络进行数据交换，则需要上图所示的物理连接，链路层就负责这些标准。

 

**第二层次：IP层**

> 准备好物理连接后就要传输数据。为了在复杂的网络中传输数据，首先需要考虑路径的选择。
>
> 向目标传输数据需要经过哪条路径？解决此问题就是IP层，该层使用的协议就是IP协议，解决数据包“从哪儿来-到哪儿去”的问题。

IP是面向消息的、不可靠的协议。每次传输数据时会帮我们选择路径，但并不一致。如果传输中发生路径错误，则选择其他路径；但如果发生数据丢失或错误，则无法解决。换言之，IP协议是无法应对数据错误的。因此，错误处理又要下放一层。



**第三层次：TCP/UDP层**

IP层解决数据传输中的路径选择问题，只需照此路径传输数据即可。TCP和UDP层以IP层提供的路径信息为基础完成实际的数据传输，故该层又称传输层（Transport）。

IP层只关注1个数据包（数据传输的基本单位）的传输过程。因此，即使传输多个数据包，每个数据包也是由IP层实际传输的，也就是说传输顺序及传输本身是不可靠的。若只利用IP层传输数据，则有可能导致后传输的数据包B比先传输的数据包A提早到达。另外，传输的数据包A、B、C中有可能只收到A和C，甚至收到的C可能已损毁。

若添加TCP协议则按照下图的对话方式进行数据交换。

  ![](linux-4-11.png) 

 

**第四层次：应用层**

为了使程序员从这些细节中解放出来，前面三个层次中的【选择数据传输路径、数据确认过程】都被隐藏到套接字内部，并自动处理。也就是说，前面三个层次都是为了给应用层提供服务。



<br>

#### 4.3.2 TCP服务端

最原始最简单的服务器模型：【收发一次数据】

   ![](linux-4-12.png) 

```c++
#include <stdio.h>
#include <stdlib.h>

#include <unistd.h>
#include <sys/socket.h>
#include <sys/types.h>
#include <arpa/inet.h>
#include <string.h>

void lesson60()
{
	int server, client;
	struct sockaddr_in seraddr, cliaddr;
	socklen_t cliaddrlen;
	const char* message = "hello world!\n";

	//服务端套接字
	server = socket(PF_INET, SOCK_STREAM, 0);//TCP：IPv4协议族中的流式socket|PF协议族
	if (server < 0) {
		std::cout << "create socket failed!" << std::endl;
		return;
	}
	memset(&seraddr, 0, sizeof(seraddr));//清0【Linux下有zero函数清零】
	seraddr.sin_family = AF_INET;//地址族 本质是一致的，只是用在不同场合
	seraddr.sin_addr.s_addr = inet_addr("0.0.0.0");//相当于填 INADDR_ANY：代表监听本机所有IP
	seraddr.sin_port = htons(9527);
	int ret = bind(server, (struct sockaddr*)&seraddr, sizeof(seraddr));
	if (ret == -1) {
		std::cout << "bind failed!" << std::endl;
		close(server);
		return;
	}
	ret = listen(server, 3);//此时的套接字才是服务器端套接字
	if (ret == -1) {
		std::cout << "listen failed!" << std::endl;
		close(server);
		return;
	}

	printf("%s(%d):%s\n", __FILE__, __LINE__, __FUNCTION__);
	//调用accept函数从队头取1个连接请求与客户端建立连接，并返回创建的套接字文件描述符
	//另外，调用accept函数时若等待队列为空，则accept函数不会返回，直到队列中出现新的客户端连接（阻塞）
	client = accept(server, (struct sockaddr*)&cliaddr, &cliaddrlen);
	if (client == -1) {
		std::cout << "accept failed!" << std::endl;
		close(server);
		return;
	}

	//已连接
	printf("%s(%d):%s\n", __FILE__, __LINE__, __FUNCTION__);
	ssize_t len = write(client, message, strlen(message));
	if (len != (ssize_t)strlen(message)) {
		std::cout << "write failed!" << std::endl;
		close(server);
		return;
	}
	printf("%s(%d):%s\n", __FILE__, __LINE__, __FUNCTION__);
	close(client);//可以不执行的
	close(server);//因为服务端关闭的时候，客户端会自动关闭【一般服务端不关闭】
	printf("%s(%d):%s\n", __FILE__, __LINE__, __FUNCTION__);
}

int main(int argc, char* argv[])
{
	lesson60();
	return 0;
}
```

> 会卡在`accept`函数，因为只有`client`请求之后，`aceept`才会返回；否则一直阻塞。

<br>

 

#### 4.3.3 connect函数

```c++
#include<sys/socket.h>

//成功时返回0，失败时返回-1
int connect(int sock,struct sockaddr* servaddr, socklen_t addrlen);
//sock：客户端套接字文件描述符 client
//servaddr：保存目标服务器端地址信息的变量地址值
//addrlen：以字节为单位传递已传递给第二个结构体参数servaddr的地址变量长度
//servaddr使用addrlen进行地址识别
```

思考：**客户端套接字地址信息**在哪儿？

实现服务器端必经过程之一就是给套接字分配IP和端口号。但客户端实现过程中并未出现套接字地址分配，而是创建套接字后立即调用conect函数。难道客户端套接字无需分配IP和端口？【答案当然不是！】

网络数据交换必须分配IP和端口。既然如此，那客户端套接字何时、何地、如何分配地址呢?

- 何时?   调用connect函数时。
- 何地?   操作系统，更准确地说是在内核中。
- 如何?   IP用计算机【主机】的IP、端口随机。

客户端的IP地址和端口在调用`connect`函数时自动分配，无需调用标记的`bind`函数进行分配。这就是与服务端的不同。



<br>

#### 4.3.4 TCP客户端

基于TCP服务端/客户端的函数调用关系：【须在`listen`之后、`close`之前进行`connect`】

![](linux-4-13.png)

客户端代码实现：

```c++
#include <iostream>

#include <unistd.h>
#include <sys/socket.h>
#include <sys/types.h>
#include <arpa/inet.h>
#include <string.h>

void lesson60()
{
	int server, client;
	struct sockaddr_in seraddr, cliaddr;
	socklen_t cliaddrlen;
	const char* message = "hello world!\n";

	//服务端套接字
	server = socket(PF_INET, SOCK_STREAM, 0);//TCP：IPv4协议族中的流式socket|PF协议族
	if (server < 0) {
		std::cout << "create socket failed!" << std::endl;
		return;
	}
	memset(&seraddr, 0, sizeof(seraddr));//清0【Linux下有zero函数清零】
	seraddr.sin_family = AF_INET;//地址族 本质是一致的，只是用在不同场合
	//seraddr.sin_addr.s_addr = inet_addr("127.0.0.1");//相当于填 INADDR_ANY：代表监听本机所有IP
	seraddr.sin_addr.s_addr = inet_addr("0.0.0.0");
	seraddr.sin_port = htons(9527);
	int ret = bind(server, (struct sockaddr*)&seraddr, sizeof(seraddr));
	if (ret == -1) {
		std::cout << "bind failed!" << std::endl;
		close(server);
		return;
	}
	ret = listen(server, 3);//此时的套接字才是服务器端套接字
	if (ret == -1) {
		std::cout << "listen failed!" << std::endl;
		close(server);
		return;
	}

	printf("%s(%d):%s\n", __FILE__, __LINE__, __FUNCTION__);
	//调用accept函数从队头取1个连接请求与客户端建立连接，并返回创建的套接字文件描述符
	//另外，调用accept函数时若等待队列为空，则accept函数不会返回，直到队列中出现新的客户端连接（阻塞）
	client = accept(server, (struct sockaddr*)&cliaddr, &cliaddrlen);
	if (client == -1) {
		std::cout << "accept failed!" << std::endl;
		close(server);
		return;
	}

	//已连接
	printf("%s(%d):%s\n", __FILE__, __LINE__, __FUNCTION__);
	ssize_t len = write(client, message, strlen(message));
	if (len != (ssize_t)strlen(message)) {
		std::cout << "write failed!" << std::endl;
		close(server);
		return;
	}
	printf("%s(%d):%s\n", __FILE__, __LINE__, __FUNCTION__);
	close(client);//可以不执行的
	close(server);//因为服务端关闭的时候，客户端会自动关闭【一般服务端不关闭】
	printf("%s(%d):%s\n", __FILE__, __LINE__, __FUNCTION__);
}

#include <sys/wait.h>
void lesson62()
{
	pid_t pid = fork();
	if (pid == 0) {//pid=0 为子进程
		//开启客户端
		sleep(1);//等待服务端先跑起来

		int client = socket(PF_INET, SOCK_STREAM, 0);
		struct sockaddr_in servaddr;
		memset(&servaddr, 0, sizeof(servaddr));
		servaddr.sin_family = AF_INET;
		servaddr.sin_addr.s_addr = inet_addr("127.0.0.1");
		servaddr.sin_port = htons(9527);
		int ret = connect(client, (struct sockaddr*)&servaddr, sizeof(servaddr));
		if (ret == 0) {
			printf("%s(%d):%s\n", __FILE__, __LINE__, __FUNCTION__);
			char buffer[256] = "";
			read(client, buffer, sizeof(buffer));
			std::cout << buffer;
		}
		else {
			printf("%s(%d):%s %d\n", __FILE__, __LINE__, __FUNCTION__, ret);
		}
		close(client);
		std::cout << "client done!" << std::endl;
	}
	else if (pid > 0) {//pid> 0 为父进程
		lesson60();

		//为避免子进程成为僵尸进程
		int status = 0;
		wait(&status);
	}
	else {
		std::cout << "fork failed!" << pid << std::endl;
	}
}

int main(int argc, char* argv[])
{
	lesson62();
	//lesson60();
	return 0;
}
```

- 如何同时运行服务器和客户端：【进程控制：fork函数】
- 可以使用TCP进行多进程间通信 

 

 

 <br>

### 4.4 实现迭代服务器/客户端

#### 4.4.1 迭代服务器

> 前面的普通服务器的缺点：启动一次服务程序，只能给一个客户端服务
>

迭代服务器比较原始，它的原型可以描述成：

```c++
while(1)
{
    //new_fd = 服务器accept客户端的连接(new_fd = accept(listenfd, XX, XX))
    //逻辑处理
    //在这个new_fd上给客户端发送消息
    //关闭new_fd
}
```

也就是说，这个程序是一个一个处理各个客户端发来的连接的。比如一个客户端发来一个连接，那么只要它还没有完成自己的任务，那么它就一直会占用服务器的进程直到处理完毕后服务器关闭掉这个socket【即可以循环服务多个客户端】

```c++
#include <iostream>

#include <unistd.h>
#include <sys/socket.h>
#include <sys/types.h>
#include <arpa/inet.h>
#include <string.h>

void run_client()
{
	int client = socket(PF_INET, SOCK_STREAM, 0);
	struct sockaddr_in servaddr;
	memset(&servaddr, 0, sizeof(servaddr));
	servaddr.sin_family = AF_INET;
	servaddr.sin_addr.s_addr = inet_addr("127.0.0.1");
	servaddr.sin_port = htons(9527);
	int ret = connect(client, (struct sockaddr*)&servaddr, sizeof(servaddr));
	if (ret == 0) {
		printf("%s(%d):%s\n", __FILE__, __LINE__, __FUNCTION__);
		char buffer[256] = "Hello. here is client\n";
		write(client, buffer, strlen(buffer));
		memset(buffer, 0, sizeof(buffer));
		read(client, buffer, sizeof(buffer));
		std::cout << buffer;//收到回复
	}
	else {
		printf("%s(%d):%s %d\n", __FILE__, __LINE__, __FUNCTION__, ret);
	}
	close(client);
	std::cout << "client done!" << std::endl;
}

void run_serve()
{
	int server, client;
	struct sockaddr_in seraddr, cliaddr;
	socklen_t cliaddrlen;
	const char* message = "hello world!\n";

	//服务端套接字
	server = socket(PF_INET, SOCK_STREAM, 0);
	if (server < 0) {
		std::cout << "create socket failed!" << std::endl;
		return;
	}
	memset(&seraddr, 0, sizeof(seraddr));
	seraddr.sin_family = AF_INET;
	seraddr.sin_addr.s_addr = inet_addr("0.0.0.0");
	seraddr.sin_port = htons(9527);
	int ret = bind(server, (struct sockaddr*)&seraddr, sizeof(seraddr));
	if (ret == -1) {
		std::cout << "bind failed!" << std::endl;
		close(server);
		return;
	}
	ret = listen(server, 3);
	if (ret == -1) {
		std::cout << "listen failed!" << std::endl;
		close(server);
		return;
	}

	printf("%s(%d):%s\n", __FILE__, __LINE__, __FUNCTION__);
	
	//服务器端进行多次accept监听处理
	char buffer[1024];
	while (1)
	{
		client = accept(server, (struct sockaddr*)&cliaddr, &cliaddrlen);
		if (client == -1) {
			std::cout << "accept failed!" << std::endl;
			close(server);
			return;
		}

		//已连接
		printf("%s(%d):%s\n", __FILE__, __LINE__, __FUNCTION__);
		read(client, buffer, sizeof(buffer));
		ssize_t len = write(client, buffer, strlen(buffer));
		if (len != (ssize_t)strlen(buffer)) {
			std::cout << "write failed!" << std::endl;
			close(server);
			return;
		}
		printf("%s(%d):%s\n", __FILE__, __LINE__, __FUNCTION__);
		close(client);
	}
	
	close(server);//因为服务端关闭的时候，客户端会自动关闭【一般服务端不关闭】
	printf("%s(%d):%s\n", __FILE__, __LINE__, __FUNCTION__);
}

#include <sys/wait.h>
void lesson63()
{
	pid_t pid = fork();
	if (pid == 0) {//pid=0 为子进程
		//开启客户端
		sleep(1);//等待服务端先跑起来
		run_client();
		run_client();
		
	}
	else if (pid > 0) {//pid> 0 为父进程
		run_serve();

		//为避免子进程成为僵尸进程
		int status = 0;
		wait(&status);
	}
	else {
		std::cout << "fork failed!" << pid << std::endl;
	}
}

int main(int argc, char* argv[])
{
	lesson63();
	return 0;
}
```

运行结果：

```bash
(base) chase@chase-virtual-machine:~/Linux_consoleApplication/bin/x64/Debug$ ./Linux_consoleApplication.out 
/home/chase/Linux_consoleApplication/main.cpp(63):run_serve
/home/chase/Linux_consoleApplication/main.cpp(19):run_client
/home/chase/Linux_consoleApplication/main.cpp(77):run_serve
/home/chase/Linux_consoleApplication/main.cpp(85):run_serve
Hello. here is client
client done!
/home/chase/Linux_consoleApplication/main.cpp(19):run_client
/home/chase/Linux_consoleApplication/main.cpp(77):run_serve
/home/chase/Linux_consoleApplication/main.cpp(85):run_serve
Hello. here is client
client done!
#需要手动退出
```



<br>

#### 4.4.2 回声服务器实现

回声服务器：将从客户端收到的数据原样返回给客户端，即回声。改进点如下：

- `client` 客户端加入输入输出交互：fgets、fputs

- 服务端 `accept` 仅2次，每次`accept` 进行无限次回声服务

- 子进程调用服务器，父【主】进程调用客户端

  

代码实现：

```c++
#include <iostream>

#include <unistd.h>
#include <sys/socket.h>
#include <sys/types.h>
#include <arpa/inet.h>
#include <string.h>

void run_client()
{
	int client = socket(PF_INET, SOCK_STREAM, 0);
	struct sockaddr_in servaddr;
	memset(&servaddr, 0, sizeof(servaddr));
	servaddr.sin_family = AF_INET;
	servaddr.sin_addr.s_addr = inet_addr("127.0.0.1");
	servaddr.sin_port = htons(9527);
	int ret = connect(client, (struct sockaddr*)&servaddr, sizeof(servaddr));

	char buffer[256] = "";
	while (ret == 0) {
		printf("%s(%d):%s\n", __FILE__, __LINE__, __FUNCTION__);
		memset(buffer, 0, sizeof(buffer));
		//加入交互
		fputs("Input message(Q to Quit):", stdout);//符合Linux思想：一切皆文件
		fgets(buffer, sizeof(buffer), stdin);//从标准输入流中获取，并写入buffer，最大长度为第二参数，以回车结束

		if ((strcmp(buffer, "q\n") == 0) || (strcmp(buffer, "Q\n") == 0))
		{
			//判断条件最好加两层括号，避免优先级问题出现意外
			break;
		}
		write(client, buffer, strlen(buffer));
		memset(buffer, 0, sizeof(buffer));
		read(client, buffer, sizeof(buffer));
		std::cout << "from server:" << buffer;//收到回复
	}
	close(client);
	std::cout << "client done!" << std::endl;
}

void run_serve()
{
	int server, client;
	struct sockaddr_in seraddr, cliaddr;
	socklen_t cliaddrlen;
	//const char* message = "hello world!\n";

	//服务端套接字
	server = socket(PF_INET, SOCK_STREAM, 0);//TCP
	if (server < 0) {
		std::cout << "create socket failed!" << std::endl;
		return;
	}
	memset(&seraddr, 0, sizeof(seraddr));
	seraddr.sin_family = AF_INET;
	seraddr.sin_addr.s_addr = inet_addr("0.0.0.0");
	seraddr.sin_port = htons(9527);

	int ret = bind(server, (struct sockaddr*)&seraddr, sizeof(seraddr));
	if (ret == -1) {
		std::cout << "bind failed!" << std::endl;
		close(server);
		return;
	}
	ret = listen(server, 3);
	if (ret == -1) {
		std::cout << "listen failed!" << std::endl;
		close(server);
		return;
	}

	//服务器端进行多次accept监听处理
	char buffer[1024];
	for (int i = 0; i < 2; i++)//accept 两个客户端
	{
		memset(buffer, 0, sizeof(buffer));
		printf("%s(%d):%s\n", __FILE__, __LINE__, __FUNCTION__);
		client = accept(server, (struct sockaddr*)&cliaddr, &cliaddrlen);
		if (client == -1) {
			std::cout << "accept failed!" << std::endl;
			close(server);
			return;
		}

		//已连接
		printf("%s(%d):%s\n", __FILE__, __LINE__, __FUNCTION__);
		//优化************************************************
		ssize_t len = 0;
		while ((len = read(client, buffer, sizeof(buffer))) > 0)//while条件是不为0怎继续循环
		{
			//直接回声至服务端
			len = write(client, buffer, len);//注意！
			if (len != (ssize_t)strlen(buffer)) {
				std::cout << "write failed! len:(" << len << ") buffer:" << buffer << std::endl;
				close(server);
				return;
			}
			memset(buffer, 0, len);
		}
		//直到客户端不发消息 len<=0
		printf("%s(%d):%s (%s)\n", __FILE__, __LINE__, __FUNCTION__, "read abort!");
		close(client);
	}
	close(server);//因为服务端关闭的时候，客户端会自动关闭【一般服务端不关闭】
	printf("%s(%d):%s\n", __FILE__, __LINE__, __FUNCTION__);
}

#include <sys/wait.h>
void lesson64()
{
	pid_t pid = fork();
	if (pid == 0) {//pid=0 为子进程
		//开启服务器
		run_serve();
	}
	else if (pid > 0) {//pid> 0 为父进程
		for (int i = 1; i < 2; i++)
		{
			run_client();
		}
		int status = 0;
		wait(&status);
	}
	else {
		std::cout << "fork failed!" << pid << std::endl;
	}
}

int main(int argc, char* argv[])
{
	lesson64();
	return 0;
}
```

> 注意：当服务器端出错，如果直接close服务器，那么主进程中的两次client循环自动终止【即第二次connect时服务器已终止】



<br>

#### 4.4.3 回声服务器存在的问题

```c++
write(sock, message,strlen(message));
str_len= read(sock, message,BUF_SIZE-1);
message[str_len]= 0;
printf("Message from server:%s",message);
```

以上代码有个**错误假设**∶"每次调用read、write函数时都会以字符串为单位执行实际的I/O操作。"【Input输入：外部设备到内存；Output输出：内存到外部设备】

> 当然，每次调用write函数都会传递1个字符串，因此这种假设在某种程度上也算合理。但是我们之前讲过：TCP不存在数据边界吗?
>

上述客户端是基于TCP的。因此，多次调用write函数传递的字符串有可能一次性传递到服务器端。此时客户端有可能从服务器端收到多个字符串，这不是我们希望看到的结果。还需考虑服务器端的如下情况∶

- 字符串太长，需要分2个数据包发送！


> 此时，我们的回声服务器端/客户端给出的结果是正确的。但这只是运气好罢了！只是因为收发的数据小，而且运行环境为同一台计算机或相邻的两台计算机，所以没发生错误，可实际上仍存在发生错误的可能。



**完美解决回声服务器存在的问题：**【多次读写缓冲区】

```c++
#include <iostream>

#include <unistd.h>
#include <sys/socket.h>
#include <sys/types.h>
#include <arpa/inet.h>
#include <string.h>

void run_client()
{
	int client = socket(PF_INET, SOCK_STREAM, 0);
	struct sockaddr_in servaddr;
	memset(&servaddr, 0, sizeof(servaddr));
	servaddr.sin_family = AF_INET;
	servaddr.sin_addr.s_addr = inet_addr("127.0.0.1");
	servaddr.sin_port = htons(9527);
	int ret = connect(client, (struct sockaddr*)&servaddr, sizeof(servaddr));

	char buffer[256] = "";
	while (ret == 0) {
		printf("%s(%d):%s\n", __FILE__, __LINE__, __FUNCTION__);
		memset(buffer, 0, sizeof(buffer));
		//加入交互
		fputs("Input message(Q to Quit):", stdout);//符合Linux思想：一切皆文件
		fgets(buffer, sizeof(buffer), stdin);//从标准输入流中获取，并写入buffer，最大长度为第二参数，以回车结束

		if ((strcmp(buffer, "q\n") == 0) || (strcmp(buffer, "Q\n") == 0))
		{
			//判断条件最好加两层括号，避免优先级问题出现意外
			break;
		}

		//优化写*****************************************
		//write(client, buffer, strlen(buffer));
		size_t len = strlen(buffer);//待发送的实际长度
		size_t send_len = 0;//已发送的长度
		while (send_len < len)//存在未发送的内容
		{
			ssize_t ret = write(client, buffer + send_len, strlen(buffer) - send_len);
			if (ret <= 0)
			{
				fputs("write failed!", stdout);
				close(client);
				std::cout << "client done!" << std::endl;
				return;
			}
			//即每次实际发送长度ret，不一定为buffer的全部
			send_len += (size_t)ret;
		}

		memset(buffer, 0, sizeof(buffer));
		//优化读
		//read(client, buffer, sizeof(buffer));
		size_t read_len = 0;
		while (read_len < len)
		{
			//将client套接字读到buffer+read_len的位置，本次共读len - read_len个
			ssize_t ret = read(client, buffer + read_len, len - read_len);
			if (ret <= 0)
			{
				fputs("read failed!", stdout);
				close(client);
				std::cout << "client done!" << std::endl;
				return;
			}
			read_len += ret;
		}
		
		std::cout << "from server:" << buffer;//收到回复
	}
	close(client);
	std::cout << "client done!" << std::endl;
}

void run_serve()
{
	int server, client;
	struct sockaddr_in seraddr, cliaddr;
	socklen_t cliaddrlen;
	//const char* message = "hello world!\n";

	//服务端套接字
	server = socket(PF_INET, SOCK_STREAM, 0);//TCP
	if (server < 0) {
		std::cout << "create socket failed!" << std::endl;
		return;
	}
	memset(&seraddr, 0, sizeof(seraddr));
	seraddr.sin_family = AF_INET;
	seraddr.sin_addr.s_addr = inet_addr("0.0.0.0");
	seraddr.sin_port = htons(9527);

	int ret = bind(server, (struct sockaddr*)&seraddr, sizeof(seraddr));
	if (ret == -1) {
		std::cout << "bind failed!" << std::endl;
		close(server);
		return;
	}
	ret = listen(server, 3);
	if (ret == -1) {
		std::cout << "listen failed!" << std::endl;
		close(server);
		return;
	}

	//服务器端进行多次accept监听处理
	char buffer[1024];
	for (int i = 0; i < 2; i++)//accept 两个客户端
	{
		memset(buffer, 0, sizeof(buffer));
		printf("%s(%d):%s\n", __FILE__, __LINE__, __FUNCTION__);
		client = accept(server, (struct sockaddr*)&cliaddr, &cliaddrlen);
		if (client == -1) {
			std::cout << "accept failed!" << std::endl;
			close(server);
			return;
		}

		//已连接
		printf("%s(%d):%s\n", __FILE__, __LINE__, __FUNCTION__);
		//优化************************************************
		ssize_t len = 0;
		while ((len = read(client, buffer, sizeof(buffer))) > 0)//while条件是不为0怎继续循环
		{
			//直接回声至服务端
			len = write(client, buffer, len);//注意！
			if (len != (ssize_t)strlen(buffer)) {
				std::cout << "write failed! len:(" << len << ") buffer:" << buffer << std::endl;
				close(server);
				return;
			}
			memset(buffer, 0, len);
		}
		//直到客户端不发消息 len<=0
		printf("%s(%d):%s (%s)\n", __FILE__, __LINE__, __FUNCTION__, "read abort!");
		close(client);
	}
	close(server);//因为服务端关闭的时候，客户端会自动关闭【一般服务端不关闭】
	printf("%s(%d):%s\n", __FILE__, __LINE__, __FUNCTION__);
}

#include <sys/wait.h>
void lesson65()
{
	pid_t pid = fork();
	if (pid == 0) {//pid=0 为子进程
		//开启服务器
		run_serve();
	}
	else if (pid > 0) {//pid> 0 为父进程
		for (int i = 1; i < 2; i++)
		{
			run_client();
		}
		int status = 0;
		wait(&status);
	}
	else {
		std::cout << "fork failed!" << pid << std::endl;
	}
}

int main(int argc, char* argv[])
{
	lesson65();
	return 0;
}
```



<br>

#### 4.4.4 回声服务器实战：计算器的网络实现

**需求**【CS架构】：

1. 客户端连接到服务器端后，以1字节整数形式传递待算数字个数【`0~255`】【应该 `≥2`】
2. 客户端向服务器端传递的每个整数型数据占用4字节
3. 传递整数型数据后接着传递运算符【运算符信息占用1字节，`+ | - | *`之一，即该运算只用一种运算符】
4. 服务器端以4字节整数型向客户端传回运算结果
5. 客户端得到运算结果后终止与服务器端的连接

客户端实现：

```c++
#include <iostream>

#include <unistd.h>
#include <sys/socket.h>
#include <sys/types.h>
#include <arpa/inet.h>
#include <string.h>

void run_client66()
{
	int client = socket(PF_INET, SOCK_STREAM, 0);
	struct sockaddr_in servaddr;
	memset(&servaddr, 0, sizeof(servaddr));
	servaddr.sin_family = AF_INET;
	servaddr.sin_addr.s_addr = inet_addr("127.0.0.1");
	servaddr.sin_port = htons(9527);
	int ret = connect(client, (struct sockaddr*)&servaddr, sizeof(servaddr));

	if (ret == 0)
	{
		printf("%s(%d):%s\n", __FILE__, __LINE__, __FUNCTION__);


		int opnd_cnt = 0;//操作数个数
		char buffer[1024];//待发送缓冲区
		memset(buffer, 0, sizeof(buffer));
		//int tmp;


		//获取数字个数【fgets获取字符串/scanf获取字符和数字】
		fputs("Operand count:[>=2]", stdout);
		scanf("%d", &opnd_cnt);
		if (opnd_cnt <= 1 && opnd_cnt < 256)//用1字节传递
		{
			fputs("Operand error, too small!\n", stdout);
			close(client);
			std::cout << "client Done!" << std::endl;
			return;
		}
		buffer[0] = (char)opnd_cnt;//服务器此处要解释为无符号数

		//获取操作数
		for (int i = 0; i < opnd_cnt; i++)
		{
			fputs("Input operand:", stdout);
			/*scanf("%d", &tmp);
			buffer[i + 1] = tmp;*/
			scanf("%d", buffer + 1 + 4 * i);
		}
		fgetc(stdin);//换行符结束

		//获取操作符
		fputs("Input operator:", stdout);
		buffer[1 + opnd_cnt * 4] = (char)fgetc(stdin);
		fgetc(stdin);

		//缓冲分批发送
		size_t len = opnd_cnt * 4 + 2;//待发送的实际长度
		size_t send_len = 0;//已发送的长度
		while (send_len < len)//存在未发送的内容
		{
			ssize_t ret = write(client, buffer + send_len, len - send_len);
			if (ret <= 0)
			{
				fputs("(client)write failed!", stdout);
				close(client);
				std::cout << "client done!" << std::endl;
				return;
			}
			//即每次实际发送长度ret，不一定为buffer的全部
			send_len += (size_t)ret;
		}

		memset(buffer, 0, sizeof(buffer));
		//优化读
		size_t read_len = 0;
		while (read_len < 4)
		{
			ssize_t ret = read(client, buffer + read_len, len - read_len);
			if (ret <= 0)
			{
				fputs("read failed!", stdout);
				close(client);
				std::cout << "client done!" << std::endl;
				return;
			}
			read_len += ret;
		}
		//注意
		std::cout << "from server:" << *(int*)buffer << std::endl;//收到运算结果
	}
	close(client);
	std::cout << "client done!" << std::endl;
}
```

 

服务端：

```c++
int calculator(unsigned count, int oprand[], char op)
{
	int result = oprand[0];
	switch (op) {
	case '+':
		for (unsigned i = 1; i < count; i++)
		{
			result += oprand[i];
		}
		break;
	case '-':
		for (unsigned i = 1; i < count; i++)
		{
			result -= oprand[i];
		}
		break;
	case '*':
		for (unsigned i = 1; i < count; i++)
		{
			result *= oprand[i];
		}
		break;
	default:
		break;
	}
	return result;
}


void server66()
{
	int server, client;
	struct sockaddr_in seraddr, cliaddr;
	socklen_t cliaddrlen;
	//const char* message = "hello world!\n";

	//服务端套接字
	server = socket(PF_INET, SOCK_STREAM, 0);//TCP
	if (server < 0) {
		std::cout << "create socket failed!" << std::endl;
		return;
	}
	memset(&seraddr, 0, sizeof(seraddr));
	seraddr.sin_family = AF_INET;
	seraddr.sin_addr.s_addr = inet_addr("0.0.0.0");
	seraddr.sin_port = htons(9527);

	int ret = bind(server, (struct sockaddr*)&seraddr, sizeof(seraddr));
	if (ret == -1) {
		std::cout << "bind failed!" << std::endl;
		close(server);
		return;
	}
	ret = listen(server, 3);
	if (ret == -1) {
		std::cout << "listen failed!" << std::endl;
		close(server);
		return;
	}

	//服务器端进行多次accept监听处理
	char buffer[1024];
	for (int i = 0; i < 2; i++)//accept 两个客户端
	{
		memset(buffer, 0, sizeof(buffer));
		printf("%s(%d):%s\n", __FILE__, __LINE__, __FUNCTION__);
		client = accept(server, (struct sockaddr*)&cliaddr, &cliaddrlen);
		if (client == -1) {
			std::cout << "accept failed!" << std::endl;
			close(server);
			return;
		}

		//connected
		printf("%s(%d):%s (%s)\n", __FILE__, __LINE__, __FUNCTION__, "connected!");
		ssize_t len = 0;
		len = read(client, buffer, 1);
		int result = 0;
		if (len > 0)
		{
			//如1字节的200[11001000]转为4字节无符号，发现首bit为1，故前面全部添加1
			//即1111...111[11001000],此时&0xFF之后，即只保留了[11001000]200
			for (unsigned i = 0; i < ((unsigned)buffer[0] & 0xFF); i++)
			{
				read(client, buffer + 1 + i * 4, 4);
			}
			read(client, buffer + 1 + ((unsigned)buffer[0] & 0xFF) * 4, 1);
			result = calculator(((unsigned)buffer[0] & 0xFF), (int*)(buffer + 1), buffer[1 + ((unsigned)buffer[0] & 0xFF) * 4]);
			write(client, &result, 4);
			//std::cout <<"result:" << result << std::endl;
		}
		printf("%s(%d):%s\n", __FILE__, __LINE__, __FUNCTION__);
		close(client);
	}
	close(server);//因为服务端关闭的时候，客户端会自动关闭【一般服务端不关闭】
	printf("%s(%d):%s\n", __FILE__, __LINE__, __FUNCTION__);
}

#include <sys/wait.h>
void lesson66()
{
	pid_t pid = fork();
	if (pid == 0) {
		//开启服务器
		server66();
	}
	else if (pid > 0) {
		for (int i = 0; i < 2; i++)
			run_client66();
		int status = 0;
		wait(&status);
	}
	else {
		std::cout << "fork failed!" << pid << std::endl;
	}
}

int main(int argc, char* argv[])
{
	lesson66();
	return 0;
}
```



注意：

- fgets获取字符串
- scanf获取字符和数字
- `fgetc(stdin);`换行符结束输入，消除换行符



<br>

### 4.5 TCP底层原理

#### 4.5.1 TCP套接字的I/O缓冲

我们知道，TCP套接字的数据收发无边界【即并非每次发5字节，就会收5字节；服务器端即使调用1次write函数传输40字节的数据，客户端也有可能通过4次read函数调用每次读取10字节】【在上节的代码中，客户端将参数收集到buffer缓冲区后，只进行了一次写操作；而服务端分多次read读取参数，最后写一次】

但此处也有一些疑问，服务器端一次性传输了40字节，而客户端居然可以缓慢地分批接收。客户端接收10字节后，剩下的30字节在何处等候呢？是不是像飞机为等待着陆而在空中盘旋一样，剩下30字节也在网络中徘徊并等待接收呢?

实际上，write函数调用后**并非立即传输数据**，read函数调用后也**并非马上接收数据**。更准确地说，如下图所示，write函数调用瞬间，数据将移至输出缓冲；read函数调用瞬间，从输人缓冲读取数据。

 ![](linux-4-14.png)

调用`write`函数时，数据将移到输出缓冲，在适当的时候【不管是分别传送还是一次性传送】传向对方的输入缓冲，这时对方将调用read函数从输入缓冲读取数据。这些I/O 缓冲特性可整理如下:

- I/O缓冲在每个TCP套接字中单独存在
- I/O缓冲在创建套接字时自动生成
- 即使关闭套接字也会继续传递输出缓冲中遗留的数据
- 关闭套接字将丢失输入缓冲中的数据。

那么，下面这种情况会引发什么后果?【理解了I/O缓冲后，其流程∶】

> "客户端输入缓冲为50字节，而服务器端传输了100字节。"
>
> 这的确是个问题。输入缓冲只有50字节，却收到了100字节的数据。可以提出如下解决方案∶
>
> 填满输入缓冲前迅速调用read函数读取数据，这样会腾出一部分空间，问题就解决了。其实，根本不会发生这类问题，因为TCP会控制数据流。

TCP中有滑动窗口【`Sliding Window`】协议，用对话方式呈现如下：

- 套接字A∶"你好，最多可以向我传递50字节。"

- 套接字B∶"OK!"

- 套接字A∶"我腾出了20字节的空间，最多可以收70字节。

- 套接字B∶"OK!"


数据收发也是如此，因此TCP中不会因为缓冲溢出而丢失数据；但是会因为缓冲而影响传输效率。

<br>





#### 4.5.2 TCP的内部原理

TCP通信三大步骤：

1. 三次握手建立连接
2. 开始通信，进行数据交换
3. 四次挥手断开连接

 <br>

#### 4.5.3 TCP三次握手

【第一次握手】套接字A∶"你好，套接字B。我这儿有数据要传给你，建立连接吧。"

【第二次握手】套接字B∶"好的，我这边已就绪。"【一般A是客户端，B是服务端】

【第三次握手】套接字A∶"谢谢你受理我的请求。"

 ![](linux-4-15.png)

> 有一种网络攻击，两次握手之后直接结束，而服务器一直等待第三地握手

<span style="background:#FFFF00;">【①】</span>首先，请求连接的主机A向主机B传递如下信息∶

```bash
[SYN] SEQ:1000,  ACK: -
```

该消息中`SEQ`为1000，`ACK`为空，而`SEQ`为1000的含义∶"现传递的数据包序号为1000，如果接收无误，请通知我向您传递1001号数据包。"

> 这是首次请求连接时使用的消息，又称SYN。SYN是 `Synchronization` 的简写，表示收发数据前传输的同步消息。

 

<span style="background:#FFFF00;">【②】</span>接下来主机B向A传递如下消息∶

```
[SYN + ACK] SEQ:2000,   ACK:1001
```

此时`SEQ`为2000，`ACK`为1001，而`SEQ`为2000的含义∶"现传递的数据包序号为2000如果接收无误，请通知我向您传递2001号数据包。"

 而`ACK`1001的含义∶"刚才传输的`SEQ`为1000的数据包接收无误，现在请传递`SEQ`为1001的数据包。"

> 对主机A首次传输的数据包的确认消息（ACK1001）和为主机B传输数据做准备的同步消息（SEQ2000）捆绑发送，因此，此种类型的消息又称 `SYN+ACK`。
>
> 收发数据前向数据包分配序号【`SEQ`】，并向对方通报此序号，这都是为防止数据丢失所做的准备。通过向数据包分配序号并确认，可以在数据丢失时马上查看并重传丢失的数据包。因此，TCP可以**保证可靠的数据传输**。

 

<span style="background:#FFFF00;">【③】</span>最后观察主机A向主机B传输的消息∶

```
[ACK] SEQ:1001,  ACK:2001
```

 TCP连接过程中发送数据包时需分配序号。在之前的序号1000的基础上加1，也就是分配1001。此时该数据包传递如下消息∶"已正确收到传输的`SEQ`为2000的数据包，现在可以传输`SEQ`为2001的数据包。"

这样就传输了添加`ACK` 2001的`ACK`消息。至此，主机A和主机B确认了彼此均就绪。

 <br>

通俗易懂的**另类理解**：

> TCP 三次握手好比在一个夜高风黑的夜晚，你一个人在小区里散步，不远处看见小区里的一位漂亮妹子迎面而来，但是因为路灯有点暗等原因不能100%确认，所以要通过招手的方式来确定对方是否认识自己：
>
> 1. 你首先向妹子招手【SYN】，妹子看到你向自己招手后，向你点了点头挤出了一个微笑【ACK】。你看到妹子微笑后确认了妹子成功辨认出了自己
> 2. 但是妹子有点不好意思，向四周看了一看，有没有可能你是在看别人呢，她也需要确认一下。妹子也向你招了招手【SYN】，你看到妹子向自己招手后知道对方是在寻求自己的确认，于是也点了点头挤出了微笑【ACK】，妹子看到对方的微笑后确认了你就是在向自己打招呼【进入established状态】

 总结一下，这个过程中总共有四个动作：

1. 你招手
2. 妹子点头微笑
3. 妹子招手
4. 你点头微笑

> 这不是四次握手吗？为什么是三次？？
>
> 答案：2+3 动作是两个动作的合并
>

1. 你招手【SYN】
2. 妹子点头微笑并向你招手【SYN+ACK】
3. 你点头微笑【ACK】

 于是确定了你和妹纸之间可以进行拥抱，而我们就来到TCP通信的第二步了！

<br>



#### 4.5.4 TCP数据传输

TCP 数据传输就是两个人隔空交流，有一定的距离，需要对方反复确认听见了自己的话。

![](linux-4-16.png)

> 你喊了一句话【SEQ】，妹子听见了之后要向你回复自己听见了【ACK】
>
> 如果你喊了一句，半天没听到妹子回复，你会很低落，好比谈恋爱的时候，你满腔热情，而妹子忽冷忽热，所以你锲而不舍，一次不行，就两次，两次不行就三次，这就是**TCP重传**。既然会重传，妹子就有可能同一句话听见了两次，这就是**去重**。

重传和去重这两项工作，操作系统的网络内核模块都已经帮我们处理好了！

> 完事之后，妹纸和你要依依不舍地分开了，那么就要分手了
>

也就是来到了TCP通信的第三步了

<br>

 

#### 4.5.5 TCP四次挥手

![](linux-4-17.png)

> 主动发起发要等待两次服务端的应答，此时就很有可能卡在这一步。实际情况中，局域网内的时延为30ms以内，累加之后依然是不可接受的时延。故在开发中，需要将等待任务交给一个新线程去执行【即本线程不做挥手下线任务】

 挥手过程：

1. 套接字A∶"我希望断开连接。"

2. 套接字B∶"哦，是吗?请稍候。"

3. 套接字B∶"我也准备就绪，可以断开连接。"

4. 套接字A∶"好的，谢谢合作。"


翻译为生活场景就是：

1. 我："对不起，我妈叫我回家了，我想分开了。"

2. 妹纸："好的，请稍后，我给我妈打个电话，确定一下能不能回家。"

3. 妹纸："我确定好了，可以回家，分开吧。"

4. 我："好的，分开吧，分手快乐。"


> 关于TCP的各种状态，在高级课程里介绍



<br>

#### 4.5.6 TCP如何保证可靠传输

> 待补充

- 三次握手四次挥手
- 拥塞控制
- 流量管理
- 应答机制，校验位、时序、序列号
- 等等



<br>

### 4.6 UDP编程

#### 4.6.1 UDP基本原理

在四层`TCP/IP`模型中，第二层传输层【Transport】分为`TCP`和`UDP`两种。数据交换过程可以分为：

- 通过`TCP`套接字完成的`TCP` 方式
- 通过`UDP`套接字完成的`UDP` 方式【用户数据报协议，`User Datagram Protocol`】

UDP套接字的特点：

- UDP 是**无连接的**，即发送数据之前不需要建立连接(发送数据结束时也没有连接可释放)，减少了开销和发送数据之前的时延
- UDP 使用**尽最大努力交付**，即不保证可靠交付，主机不需要维持复杂的连接状态表
- UDP 是**面向报文的**，发送方的 UDP 对应用程序交下来的报文，在添加首部后就向下交付 IP 层。UDP 对应用层交下来的报文，既不合并，也不拆分，而是保留这些报文的边界
- UDP 没有拥塞控制，网络出现的拥塞不会使源主机的发送速率降低。这对某些实时应用是很重要的
- UDP 支持一对一、一对多、多对一和多对多的交互通信
- UDP 的首部开销小，只有8个字节，比 TCP 的20个字节的首部要短

> 我们可以通过信件说明UDP的工作原理，这是讲解UDP时使用的传统示例，它与UDP特性完全相符。

**寄信前应先在信封上填好寄信人和收信人的地址，之后贴上邮票放进邮筒即可**。

- 信件的特点使我们无法确认对方是否收到

- 另外，邮寄过程中也可能发生信件丢失的情况


也就是说，信件是一种不可靠的传输方式。与之类似，UDP提供的同样是**不可靠的数据传输服务**。

<br>

**引入问题**：既然如此，TCP应该是更优质的协议吧？

**答**：如果只考虑可靠性，TCP的确比UDP好；但UDP在结构上比TCP更简洁，即性能更快。

- UDP不会发送类似`ACK`的应答消息，也不会像`SEQ`那样给数据包分配序号。因此，UDP的性能有时比TCP高出很多。
- 编程中实现UDP也比TCP简单。
- 另外，UDP的可靠性虽比不上TCP，但也不会像想象中那么频繁地发生数据损毁。因此，在更重视性能而非可靠性的情况下，UDP是一种很好的选择。

既然如此，UDP的作用到底是什么呢?为了提供可靠的数据传输服务，TCP在不可靠的IP层进行流控制，而UDP就缺少这种流控制机制。

> **流控制**是区分UDP和TCP的最重要的标志。但若从TCP中除去流控制，所剩内容也屈指可数。也就是说，TCP的生命在于流控制。

 

<br>

**引入问题**：如何将TCP与UDP的优势结合起来？

如果把`TCP`比喻为**电话**，把 `UDP`比喻为**信件**。

> 但这只是形容协议工作方式，并没有包含**数据交换速率**。请不要误认为【电话的速度比信件快，因此TCP 的数据收发速率也比 UDP快】。
>
> 实际上正好相反。TCP的速度无法超过UDP，但在收发某些类型的数据时有可能接近 UDP。例如，每次交换的数据量越大，TCP的传输速率就越接近 UDP的传输速率。

![](linux-4-18.png)

 从上图可以看出，**IP**的作用就是<span style="background:#FFFF00;">让离开主机B的UDP数据包准确传递到主机A</span>。但把`UDP`包最终交给主机A的某一个UDP套接字的过程则是由UDP完成的。UDP最重要的作用就是<span style="background:#FFFF00;">根据**端口号**将传到主机的数据包交付给最终的UDP套接字。</span>

其实，在实际的应用场景中，UDP也具有一定的可靠性。网络传输特性导致信息丢失频发，可若要传递压缩文件【发送1万个数据包时，只要丢失1个就会产生问题】，则<span style="background:#FFFF00;">必须使用TCP</span>，因为压缩文件只要丢失一部分就很难解压。但通过网络实时传输视频或音频时的情况有所不同。对于多媒体数据而言，丢失一部分也没有太大问题，这只会引起短暂的画面抖动，或出现细微的杂音。但因为需要提供实时服务，速度就成为非常重要的因素，此时需要考虑使用UDP【此时，可以同时使用TCP进行流量监控，比如报告丢包情况以便进行应对】。但UDP并非每次都快于TCP，TCP比UDP慢的原因通常有以下两点：

- 收发数据前后进行的连接设置及清除过程
- 收发数据过程中为保证可靠性而添加的流控制

总之，尤其是收发的数据量小但需要频繁连接时，UDP比TCP更高效。

另外，也可以使用UDP去模拟TCP，但可以一次握手建立连接，简化应答机制。



 <br>

#### 4.6.2 UDP服务端

UDP中的服务器端和客户端没有连接：

- UDP服务器端/客户端不像TCP那样在连接状态下交换数据，因此与TCP不同，无需经过连接过程
- 也就是说，不必调用TCP连接过程中调用的`listen`函数和`accept`函数
- UDP中只有创建套接字的过程和数据交换过程

UDP服务器端和客户端**均只需一个套接字**：

TCP中，套接字之间应该是一对一的关系，即若要向10个客户端提供服务，则除了守门的服务器套接字外，还需要10个服务器端套接字。但在UDP中，不管是服务器端还是客户端都只需要1个套接字。

> 之前解释UDP原理时举了信件的例子，收发信件时使用的**邮筒**可以比喻为UDP套接字。只要附近有1个邮筒，就可以通过它向任意地址寄出信件。同样，只需1个UDP套接字就可以向任意主机传输数据。

 ![](linux-4-19.png)

> 上图展示了1个UDP套接字与两个不同主机交换数据的过程。也就是说，只需1个UDP套接字就能和多台主机通信。【视频会议就是利用UDP的这种特性】
>

需要注意的是，创建好TCP套接字后，传输数据时无需再添加地址信息【这是因为TCP套接字将保持与对方套接字的连接。换言之，TCP套接字知道目标地址信息】。

但UDP套接字不会保持连接状态【UDP套接字只有简单的邮筒功能】，因此每次传输数据都要添加目标地址信息，这相当于寄信前在信件中填写地址。以下为填写地址并传输数据时调用的UDP相关函数：

```c++
#include <sys/socket.h>

//成功时返回传输的字节数，失败时返回-1
ssize_t sendto(int sock,void*buff,size_t nbytes,int flags,struct sockaddr *to, socklen_t addrlen);
//sock:用于传输数据的UDP套接字文件描述符。
//buff:保存待传输数据的缓冲地址值。
//nbytes:待传输的数据长度，以字节为单位。
//flags:可选项参数，若没有则传递0。
//to:存有目标地址信息的sockaddr结构体变量的地址值。
//addrlen:传递给参数to的地址值结构体变量长度。
```

> 上述函数与之前的TCP输出函数最大的区别在于，此函数**需要向它传递目标地址信息**。

接下来介绍**接收UDP数据**的函数：

```c++
#include<sys/socket.h>

//成功时返回接收的字节数，失败时返回-1
ssize_t recvfrom(int sock, void *buff, size_t nbytes, int flags, struct sockaddr* from,  socklen_t* addrlen);
//sock：用于接收数据的UDP套接字文件描述符。
//buff：保存接收数据的缓存地址值
//nbytes：可接收的最大字节数，故无法超过参数buf所指的缓冲大小。
//flags：可选项参数，若没有则传入0。
//from：存有发送端地址信息的sockaddr结构体变量的地址值。
//addrlen：保存参数from的结构体变量长度的变量地址值。
```

UDP数据的发送端并不固定，因此该函数定义为可接收发送端信息的形式，也就是将同时返回UDP数据包中的发送端信息。

> 编写UDP程序时**最核心的部分**就在于上述两个函数，这也说明二者在UDP数据传输中的地位。

> UDP是DDOS攻击的主要方式，一个原因是UDP无法拒收。就算屏蔽该IP，也只能UDP数据包到达接收端后，才能知道发送端IP。另一个原因是UDP包中的发送端地址可以伪造。

 

 

 <br>

#### 4.6.3 UDP回声服务器

服务端总结为以下几步：

1. 声明变量
2. 参数校验
3. 创建UDP套接字
4. 填写地址
5. bind
6. 收/发消息
7. 关闭套接字

```c++
void handle_error(const char* msg)
{
	fputs(msg, stderr);//标准错误流，也可以输出到stdout
	fputc('\n', stderr);
	exit(-1);
}

int lesson73_server(int argc, char* argv[])
{
	//参数声明
	int ser_sock = -1;
	char message[512];//buffer
	struct sockaddr_in servaddr, clientaddr;
	socklen_t clientlen = 0;

	//参数校验
	if (argc != 2)
	{
		//在bash中执行：./LinuxConsole.out 9527
		//argv[1]= 9527
		printf("ussage:%d <port>\n", argv[0]);
		handle_error("Argument Error!");
	}

	//创建套接字
	ser_sock = socket(PF_INET, SOCK_DGRAM, 0);//UDP [tcp为SOCK_STREAM]
	if (ser_sock == -1)
	{
		handle_error("create UDP-Socket Error!");
	}

	//填写地址
	servaddr.sin_family = AF_INET;
	servaddr.sin_addr.s_addr = htonl(INADDR_ANY);//0.0.0.0
	servaddr.sin_port = htons(short(atoi(argv[1])));

	//绑定套接字
	if (bind(ser_sock, (struct sockaddr*)&servaddr, sizeof(servaddr)))
	{
		handle_error("bind failed!");
	}

	//收发10次
	for (int i = 0; i < 10; i++)
	{
		clientlen = sizeof(clientaddr);
		ssize_t len = recvfrom(ser_sock, message, sizeof(message), 0, (struct sockaddr*)&clientaddr, &clientlen);
		sendto(ser_sock, message, len, 0, (struct sockaddr*)&clientaddr, clientlen);
	}
	//关闭socket
	close(ser_sock);//如果不执行，一般需要延迟30s才能再次bind！！！！！
	std::cout << "server close!" << std::endl;
	return 0;
}
```

**注意：**

- 如果不执行 `close(socket)` ，一般需要延迟30s才能再次`bind`。这就是之前实验中为什么总是出现`bind failed`的原因。
- `serv_sock=socket(PF_INET, SOCK_DGRAM, 0);` 创建UDP套接字，向`socket`函数第二个参数传递`SOCK_DGRAM`
- `recvfrom` 利用分配的地址接收数据，不限制数据传输对象。
- `sendto`函数调用同时获取数据传输端的地址，正是利用该地址将接收的数据逆向重传。



 <br>

#### 4.6.4 UDP客户端

```c++
int lesson74_client(int argc, char* argv[])
{
	//变量声明
	int client_socket;
	struct sockaddr_in serv_addr;
	socklen_t serv_len = sizeof(serv_addr);
	char message[512]="";

	//参数校验
	if (argc != 3)
	{
		//在bash中执行：./LinuxConsole.out 9527
		//argv[1]= 9527
		printf("ussage:%d <port>\n", argv[0]);
		handle_error("Argument Error!");
	}
	//创建套接字
	client_socket = socket(PF_INET, SOCK_DGRAM, 0);//UDP,dgram:数据报
	if (client_socket == -1)
	{
		handle_error("client socked create fail!");
	}

	//填写地址
	memset(&serv_addr, 0, sizeof(serv_addr));
	serv_addr.sin_family = AF_INET;
	//serv_addr.sin_addr.s_addr = inet_addr("127.0.0.1");//目标发送地址
	serv_addr.sin_addr.s_addr = inet_addr(argv[1]);
	serv_addr.sin_port = htons((short)atoi(argv[2]));

	while (1)
	{
		printf("Input message[Q/q to Quit]:");
		scanf("%s", message);
		if ((strcmp(message, "q\n") == 0) || (strcmp(message, "Q\n") == 0))
			break;
		sendto(client_socket, message, strlen(message), 0, (struct sockaddr*)&serv_addr, serv_len);
		memset(message, 0, sizeof(message));
		recvfrom(client_socket, message, sizeof(message), 0, (struct sockaddr*)&serv_addr, &serv_len);
		printf("recv:%s\n", message);
	}

	close(client_socket);
	std::cout << "client close!" << std::endl;
	return 0;
}
```

**注意：**

- 为什么fork后，主进程开客户端，子进程开服务端？
  - d
  - 父进程更易于调试

- `bind failed` 的绑定错误？

  > 见4.7

- 客户端退出条件是`q\n`还是`q` ？【如何调试？】

  在实际断点调试中，`message`为`q`，故选择后者。【添加断点，可在代码中查看变量值】

- UDP在`sendto`函数中自动分配发送端接受地址和端口；如果先调用recvfrom，即当作服务器用，就必须bind。



 <br>

#### 4.6.5 UDP的传输特性和调用

上节讲到UDP服务器端/客户端的实现方法。但如果仔细观察UDP客户端会发现，它<span style="background:#FFFF00;">缺少把IP和端口分配给套接字的过程。</span>

- TCP客户端调用`connect`函数自动完成此过程，而UDP中连能承担相同功能的函数调用语句都没有【究竟在何时分配IP和端口号呢?】
- UDP程序中，调用<span style="background:#FFFF00;font-weight:bold;">sendto函数传输数据前应完成对套接字的地址分配工作</span>，因此调用`bind`函数。

> 当然，bind函数在TCP程序中出现过，但bind函数不区分TCP和UDP，也就是说，在UDP程序中同样可以调用。
>

- 另外，如果调用`sendto`函数时发现尚未分配地址信息，则在首次调用`sendto`函数时给相应套接字自动分配IP和端口【IP用主机IP，端口号选尚未使用的任意端口号】【注册端口或动态端口】
- 而且此时分配的地址一直保留到程序结束【关闭套接字之前】为止，因此也可用来与其他UDP套接字进行数据交换。

综上所述，调用`sendto`函数时自动分配IP和端口号，即UDP客户端中通常无需额外的地址分配过程。

>  🔺上例中为什么服务器端UDP需要`bind`，而客户端不需要`bind`？
>
> 答：客户端的`sendto`函数自动填充本地地址IP和Port，同时手动添加了目标地址和端口，同时之后的`recvform`沿用之前的目标地址和端口；而服务端直接`recvfrom`，其中只有服务端套接字，其他的都是与待接受的UDP数据包有关信息，连本地IP和端口都没有，故需要手动`bind`。
>
> 【也就是说，用了`sendto`就不需要`bind`，没用`sendto`之前要使用`recvfrom`就必须`bind`】

 

<br>

### 4.7 套接字的多种可选项

#### 4.7.1 I/O缓冲大小

我们进行套接字编程时往往只关注数据通信，而忽略了套接字具有的不同特性。但是，理解这些特性并根据实际需要进行更改也十分重要。【默认512K的缓冲区】

 ![](linux-4-20.png)

> 用于验证套接字类型的SO_TYPE是典型的只读可选项，这一点可以通过下面这句话解释∶套接字类型只能在创建时决定，以后不能再更改。

从上表可以看出，套接字可选项是分层的。`IPPROTO_IP`层可选项是IP协议相关事项，`IPPROTO_TCP`层可选项是`TCP`协议相关的事项，`SOL_SOCKET`层是套接字相关的通用可选项。

> 确实无需全部背下来或理解，实际能够设置的可选项数量是上表的好几倍，实际开发中逐一掌握即可。

<br>

**`getsockopt` & `setsockopt` 函数【Linux函数，Windows有自己的相应函数】：**

我们几乎可以针对上表中的所有可选项进行读取【Get】和设置【Set】【当然，有些可选项只能进行一种操作】。

```c++
#include<sys/socket.h>

//成功时返回0，失败时返回-1
int getsockopt(int sock, int level,int optname, void *optval, socklen_t *optlen);
//sock ：用于查看选项套接字文件描述符。
//level：要查看的可选项的协议层。
//optname ：要查看的可选项名。
//optval：保存查看结果的缓冲地址值。
//optlen：向第四个参数optval传递的缓冲大小。调用函数后，该变量中保存通过第四个参数返回的可选项信息的字节数。
//【详细使用方法见4.7.4/3】

//成功时返回0，失败时返回-1
int setsockopt(int sock, int level, int optname, const void*optval, socklen_t optlen);
//sock用于更改可选项的套接字文件描述符。
//level要更改的可选项协议层。
//optname 要更改的可选项名。
//optval 保存要更改的选项信息的缓冲地址值。
//optlen 向第四个参数optval传递的可选项信息的字节数。
```

<br>



 

#### 4.7.2 SO_SNDBUF &SO_RCVBUF

我们知道，创建套接字将同时生成I/O缓冲。`SO_RCVBUF`是输入缓冲大小相关可选项，`SO_SNDBUF`是输出缓冲大小相关可选项。用这两个可选项既可以读取当前I/O缓冲大小，也可以进行更改。

通过下列示例读取创建套接字时默认的I/O缓冲大小：

```c++
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/socket.h>

void error_handling(char* message)
{
	fputs(message, stderr);
	fputc('\n', stderr);
	exit(1);

}

int main(int argc, char* argv[])
{
	int sock;
	int snd_buf, rcv_buf, state;
	socklen_t len;

	sock = socket(PF_INET, SOCK_STREAM, 0);
	len = sizeof(snd_buf);
	//获取SO_SNDBUF状态
	state = getsockopt(sock, SOL_SOCKET, SO_SNDBUF, &snd_buf, &len);
	if (state == -1)
	{
		error_handling("getsockopt() error");
	}

	len = sizeof(rcv_buf);
	state = getsockopt(sock, SOL_SOCKET, SO_RCVBUF, &rcv_buf, &len);
	if (state == -1)
	{
		error_handling("getsockopt() error");
	}

	printf("Input buffer size: %d \n", rcv_buf);
	printf("Outupt buffer size: %d \n", snd_buf);

	//修改
	snd_buf = 1024 * 3, rcv_buf = 1024 * 3;
	state = setsockopt(sock, SOL_SOCKET, SO_RCVBUF, (void*)&rcv_buf, sizeof(rcv_buf));
	if (state == -1)
	{
		error_handling("setsockopt() error!");
	}
	state = setsockopt(sock, SOL_SOCKET, SO_SNDBUF, (void*)&snd_buf, sizeof(snd_buf));
	if (state == -1)
	{
		error_handling("setsockopt() error!");
	}
	//查看
	len = sizeof(rcv_buf);
	state = getsockopt(sock, SOL_SOCKET, SO_SNDBUF, &snd_buf, &len);
	if (state == -1)
	{
		error_handling("getsockopt() error");
	}

	len = sizeof(rcv_buf);
	state = getsockopt(sock, SOL_SOCKET, SO_RCVBUF, &rcv_buf, &len);
	if (state == -1)
	{
		error_handling("getsockopt() error");
	}
	printf("Input buffer size: %d \n", rcv_buf);
	printf("Outupt buffer size: %d \n", snd_buf);

	return 0;
}
//控制台输出：
//Input buffer size: 131072
//Outupt buffer size: 16384
//Input buffer size: 6144
//Outupt buffer size: 6144
```

<br>

 

#### 4.7.3 SO_REUSEADDR

发生地址分配错误【`Binding Error`，即`bind`函数返回`-1`】

学习`SO_REUSEADDR`可选项之前，应理解好`Timewait`状态。以下面的程序为例：

- 开启两个终端，一个参数为1，即服务端；两一个参数为2，即客户端
- 建立连接，即connect成功后，由服务端使用 `CTRL+C` 主动断开连接
- 再次运行第一步骤，试图建立连接【显示 `bind failed`】

```c++
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <arpa/inet.h>
#include <sys/socket.h>

#include <string.h>
#include <iostream>

#define TRUE 1
#define FALSE 0

void error_handling(char* message)
{
	fputs(message, stderr);
	fputc('\n', stderr);
	exit(1);
}

int server78()
{
	printf("%s(%d):%s\n", __FILE__, __LINE__, __FUNCTION__);

	int serv_sock, client;
	struct sockaddr_in addr,client_addr;
	socklen_t addrlen = sizeof(addr),clientlen=sizeof(client_addr);
	char buffer[512];

	serv_sock = socket(PF_INET, SOCK_STREAM, 0);//TCP
	if (serv_sock < 0) {
		std::cout << "create socket failed!" << std::endl;
		return 0;
	}

	memset(&addr, 0, addrlen);
	addr.sin_family = AF_INET;
	addr.sin_addr.s_addr = htonl(INADDR_ANY);
	addr.sin_port = htons(9527);
	if (bind(serv_sock, (struct sockaddr*)&addr, addrlen) == -1)
	{
		error_handling("bind failed!");
	}

	listen(serv_sock, 3);
	client = accept(serv_sock,(struct sockaddr*) & client_addr, &clientlen);
	read(client, buffer, sizeof(buffer));
	
	close(client);
	close(serv_sock);
	return 0;
}

void client78()
{
	//【之前的TCP客户端】
	int client = socket(PF_INET, SOCK_STREAM, 0);
	struct sockaddr_in servaddr;
	memset(&servaddr, 0, sizeof(servaddr));
	servaddr.sin_family = AF_INET;
	servaddr.sin_addr.s_addr = inet_addr("127.0.0.1");
	servaddr.sin_port = htons(9527);
	int ret = connect(client, (struct sockaddr*)&servaddr, sizeof(servaddr));

	char buffer[256] = "";
	while (ret == 0) {
		printf("%s(%d):%s\n", __FILE__, __LINE__, __FUNCTION__);
		memset(buffer, 0, sizeof(buffer));
		fputs("Input message(Q to Quit):", stdout);
		fgets(buffer, sizeof(buffer), stdin);

		if ((strcmp(buffer, "q\n") == 0) || (strcmp(buffer, "Q\n") == 0))
		{
			break;
		}

		size_t len = strlen(buffer);//待发送的实际长度
		size_t send_len = 0;//已发送的长度
		while (send_len < len)//存在未发送的内容
		{
			ssize_t ret = write(client, buffer + send_len, strlen(buffer) - send_len);
			if (ret <= 0)
			{
				fputs("write failed!", stdout);
				close(client);
				std::cout << "client done!" << std::endl;
				return;
			}
			send_len += (size_t)ret;
		}

		memset(buffer, 0, sizeof(buffer));
		//优化读
		size_t read_len = 0;
		while (read_len < len)
		{
			ssize_t ret = read(client, buffer + read_len, len - read_len);
			if (ret <= 0)
			{
				fputs("read failed!", stdout);
				close(client);
				std::cout << "client done!" << std::endl;
				return;
			}
			read_len += ret;
		}

		std::cout << "from server:" << buffer;//收到回复
	}
	close(client);
	std::cout << "client done!" << std::endl;
}

void lesson78(char* option)
{
	//模拟启动双进程
	if (strcmp(option, "1") == 0)
	{
		//服务器
		server78();
	}
	else
	{
		//客户端
		client78();
	}
}

int main(int argc, char* argv[])
{
	lesson78(argv[1]);
	return 0;
}
```

> 上面的程序是一个服务器，使用TCP套接字，等待客户端连接。【正常情况下，如果客户端断开连接，则需要经过四次挥手】。但是，如果"在客户端控制台输入`Q`消息，或通过`CTRL+C`终止程序"呢？
>

也就是说，【方式①】让客户端先通知服务器端终止程序：

- 在客户端控制台输入Q消息时调用`close`函数，向服务器端发送`FIN`消息并经过四次挥手过程。
- 当然，输人`CTRL+C` 时也会向服务器传递`FIN`消息【强制终止程序时，由操作系统关闭文件及套接字，此过程相当于调用`close`函数，也会向服务器端传递`FIN`消息】

<span style="background:#F9AD56;">"但看不到什么特殊现象啊?"</span>答案是肯定的，通常都是由客户端先请求断开连接，所以不会发生特别的事情。重新运行服务器端也不成问题，但按照如下方式终止程序时则不同："【方式②】服务器端和客户端已建立连接的状态下，向服务器端控制台输入`CTRL+C`，即强制关闭服务器端。"

> 这主要模拟了服务器端向客户端发送`FIN`消息的情景。<span style="background:#FFFF00;">如果以这种方式终止程序，那服务器端重新运行时将产生问题。如果用同一端口号重新运行服务器端，将输出 `bind error` ，并且无法再次运行。</span>【但在这种情况下，再过大约3分钟即可重新运行服务器端】

<hr>

 <span style="background:#13dddd;">上述两种运行方式唯一的区别就是：谁先传输`FIN`消息，但结果却迥然不同，原因何在?</span>

 ![](linux-4-21.png) 

 假设上图中主机A是服务器端，因为是主机A向B发送`FIN`消息，故可以想象成服务器端在控制台输入`CTRL+C`。但问题是，套接字经过四次挥手过程后并非立即消除，而是要经过一段时间的`Time-wait`状态。当然，只有先断开连接的【先发送`FIN`消息的】主机才经过`Time-wait`状态。因此，有以下结论：

- 若服务器端先断开连接，则无法立即重新运行。
- 套接字处在`Time-wait`过程时，相应端口是正在使用的状态。因此，就像之前验证过的，`bind`函数调用过程中当然会发生错误。
- `Time-wait` 在几秒到理论上限两小时不等，

有些人会误以为 `Time-wait` 过程只存在于服务器端。但实际上，不管是服务器端还是客户端，**套接字都会有 Time-wait 过程**。<span style="background:#FFFF00;">先断开连接的套接字必然会经过`Time-wait` 过程，但无需考虑客户端 Time-wait状态。因为**客户端套接字的端口号是任意指定的**。</span>【与服务器端不同，客户端每次运行程序时都会动态分配端口号，因此无需过多关注`Time-wait`状态】【服务端的端口肯定要固定】

 <hr>

 <span style="background:#13dddd;">到底为什么会有`Time-wait`状态呢?</span>

如上图中，假设主机A向主机B传输`ACK`消息【SEQ5001、ACK7502】后立即消除套接字。但最后这条`ACK`消息在传递途中丢失，未能传给主机B。这时会发生什么？

主机B会认为之前自己发送的`FIN`消息【SEQ 7501、ACK 5001】未能抵达主机A，继而试图重传。但此时主机A已是完全终止的状态，因此主机B永远无法收到从主机A最后传来的`ACK`消息。相反，若主机A的套接字处在`Time-wait`状态，则会向主机B重传最后的`ACK`消息，主机B也可以正常终止。基于这些考虑，先传输`FIN`消息的主机应经过`Time-wait`过程。

`Time-wait`看似重要，但并不一定讨人喜欢。考虑一下系统发生故障从而紧急停止的情况。这时需要尽快重启服务器端以提供服务，但因处于`Time-wait`状态而必须等待几分钟。因此，Time-wait并非只有优点，而且有些情况下可能引发更大问题。下图演示了四次握手时不得不延长`Time-wait`过程的情况：

![](linux-4-22.png)

> 如上图所示，在主机A的四次握手过程中，如果最后的数据丢失，则主机B会认为主机A未能收到自己发送的`FIN`消息，因此重传。这时，收到FIN消息的主机A将重启`Time-wait`计时器。因此，如果网络状况不理想，Time-wait状态将持续。

 <br>

 <span style="background:#13dddd;">解决办法：地址再分配</span>

在套接字的可选项中更改为`SO_REUSEADDR`的状态。适当调整该参数，可将`Time-wait`状态下的套接字端口号重新分配给新的套接字。`SO_REUSEADDR`的默认值为0【`False`】，这就意味着无法分配`Time-wait`状态下的套接字端口号。因此需要将这个值改成1【`True`】【再做一次，就能解决上述问题】

```c++
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <arpa/inet.h>
#include <sys/socket.h>

#include <string.h>
#include <iostream>

#define TRUE 1
#define FALSE 0

void error_handling(char* message)
{
	fputs(message, stderr);
	fputc('\n', stderr);
	exit(1);
}

int server78()
{
	printf("%s(%d):%s\n", __FILE__, __LINE__, __FUNCTION__);

	int serv_sock, client, optval = 0;
	struct sockaddr_in addr, client_addr;
	socklen_t addrlen = sizeof(addr), clientlen = sizeof(client_addr), optvallen;
	char buffer[512];

	serv_sock = socket(PF_INET, SOCK_STREAM, 0);//TCP
	if (serv_sock < 0) {
		std::cout << "create socket failed!" << std::endl;
		return 0;
	}
	//***************************************************************
	//socket之后进行对sockopt的修改
	getsockopt(serv_sock, SOL_SOCKET, SO_REUSEADDR, &optval, &optvallen);
	printf("SO_REUSEADDR = %d\n", optval);
	optval = 1;
	setsockopt(serv_sock, SOL_SOCKET, SO_REUSEADDR, &optval, optvallen);
	getsockopt(serv_sock, SOL_SOCKET, SO_REUSEADDR, &optval, &optvallen);
	printf("SO_REUSEADDR = %d\n", optval);
	//***************************************************************

	memset(&addr, 0, addrlen);
	addr.sin_family = AF_INET;
	addr.sin_addr.s_addr = htonl(INADDR_ANY);
	addr.sin_port = htons(9527);
	addrlen = sizeof(addr);

	if (bind(serv_sock, (struct sockaddr*)&addr, addrlen) == -1)
	{
		error_handling("bind failed!");
	}

	listen(serv_sock, 3);
	client = accept(serv_sock, (struct sockaddr*)&client_addr, &clientlen);
	read(client, buffer, sizeof(buffer));
	printf("recv: %s", buffer);

	close(client);
	close(serv_sock);
	return 0;
}

void client78()
{
	//【之前的TCP客户端】
	int client = socket(PF_INET, SOCK_STREAM, 0);
	struct sockaddr_in servaddr;
	memset(&servaddr, 0, sizeof(servaddr));
	servaddr.sin_family = AF_INET;
	servaddr.sin_addr.s_addr = inet_addr("127.0.0.1");
	servaddr.sin_port = htons(9527);
	int ret = connect(client, (struct sockaddr*)&servaddr, sizeof(servaddr));

	char buffer[256] = "";
	while (ret == 0) {
		printf("%s(%d):%s\n", __FILE__, __LINE__, __FUNCTION__);
		memset(buffer, 0, sizeof(buffer));
		fputs("Input message(Q to Quit):", stdout);
		fgets(buffer, sizeof(buffer), stdin);

		if ((strcmp(buffer, "q\n") == 0) || (strcmp(buffer, "Q\n") == 0))
		{
			break;
		}

		size_t len = strlen(buffer);//待发送的实际长度
		size_t send_len = 0;//已发送的长度
		while (send_len < len)//存在未发送的内容
		{
			ssize_t ret = write(client, buffer + send_len, strlen(buffer) - send_len);
			if (ret <= 0)
			{
				fputs("write failed!", stdout);
				close(client);
				std::cout << "client done!" << std::endl;
				return;
			}
			send_len += (size_t)ret;
		}

		memset(buffer, 0, sizeof(buffer));
		//优化读
		size_t read_len = 0;
		while (read_len < len)
		{
			ssize_t ret = read(client, buffer + read_len, len - read_len);
			if (ret <= 0)
			{
				fputs("read failed!", stdout);
				close(client);
				std::cout << "client done!" << std::endl;
				return;
			}
			read_len += ret;
		}

		std::cout << "from server:" << buffer;//收到回复
	}
	close(client);
	std::cout << "client done!" << std::endl;
}

void lesson78(char* option)
{
	//模拟启动双进程
	if (strcmp(option, "1") == 0)
	{
		//服务器
		server78();
		server78();
	}
	else
	{
		//客户端
		client78();
	}
}

int main(int argc, char* argv[])
{
	lesson78(argv[1]);
	return 0;
}
```



 <br>

 

#### 4.7.4 TCP_NODELAY

什么是**Nagle算法**？使用该算法能够获得哪些数据通信特性?

Nagle算法是以发明人`John Nagle`的名字命名的，它用于自动连接许多的小缓冲器消息。这一过程【称为nagling】通过**减少必须发送包的个数**来增加网络软件系统的效率。

 ![](linux-4-23.png)

> 从上图中可以得到如下结论："只有收到前一数据的ACK消息时，Nagle算法才发送下一数据。"
>
> 注意：输入每一个字母是有间隔的，是输入一个字符发一次，还是一起发？

TCP套接字默认使用Nagle算法交换数据，因此最大限度地进行缓冲，直到收到ACK。上图左侧正是这种情况。为了发送字符串"Nagle"，将其传递到输出缓冲。这时头字符"N"之前没有其他数据（没有需接收的ACK），因此立即传输。之后开始等待字符"N"的ACK消息，等待过程中，剩下的"agle"填入输出缓冲。接下来，收到字符"N"的ACK消息后，将输出缓冲的"agle"装入一个数据包发送。也就是说，共需传递4个数据包以传输1个字符串。

接下来分析未使用Nagle算法时发送字符串"Nagle"的过程。假设字符"N"到"e"依序传到输出缓冲。此时的发送过程与ACK接收与否无关，因此数据到达输出缓冲后将立即被发送出去。从上图右侧可以看到，发送字符串"Nagle"时共需10个数据包。由此可知，不使用Nagle算法将对网络流量产生负面影响。即使只传输1个字节的数据，其头信息都有可能是几十个字节。因此，为了提高网络传输效率，必须使用Nagle算法。

> 在程序中将字符串传给输出缓冲时并不是逐字传递的，故发送字符串"Nagle"的实际情况并非如上图所示。但如果隔一段时间再把构成字符串的字符传到输出缓冲（如果存在此类数据传递）的话，则有可能产生类似上图的情况。上图中就是隔一段时间向输出缓冲传递待发送数据的。

<br>

【 <span style="background:#13dddd;">缺点</span>】但Nagle算法并不是什么时候都适用。**根据传输数据的特性，网络流量未受太大影响时，不使用Nagle算法要比使用它时传输速度快。**

> 最典型的是传输大文件数据。将文件数据传入输出缓冲不会花太多时间，因此，即便不使用Nagle算法，也会在装满输出缓冲时传输数据包。这不仅不会增加数据包的数量，反而会在无需等待ACK的前提下连续传输，因此可以大大提高传输速度。

<span style="background:#FFFF00;">一般情况下，不使用Nagle算法可以提高传输速度。但如果无条件放弃使用Nagle算法，就会增加过多的网络流量，反而会影响传输。因此，未准确判断数据特性时不应禁用Nagle算法。</span>

> 刚才说过的【大文件数据】应禁用Nagle算法。换言之，如果有必要，就应禁用Nagle算法。Nagle算法使用与否在网络流量上差别不大，使用Nagle算法的传输速度更慢，禁用方法非常简单。

另外，使用Nagle算法后，会将小包合并成大包，因此也会产生**粘包问题**。具体表现在：【假如依次3个包，包含json数据，大小依次为60、120、3000，一般前两个包会合并】

- 接受端需要进行协调接受方式，即要明确知道要从一个数据包中拆分为两包进行解析【增加了接收端工作量】
- 合并包会产生时延，导致实时性下降【如果对实时性有要求，需要禁用Nagle】

从下列代码也可看出，只需将套接字可选项`TCP_NODELAY`改为1【真】即可：

```c++
int opt_val=1;
setsockopt(sock, IPPROTO_TCP, TCP_NODELAY, (void*)&opt_val, sizeof(opt_val));

//可以通过TCP_NODELAY的值查看Nagle算法的设置状态。

int opt_val, socklen_t opt_len;
opt_len = sizeof(opt_val);

getsockopt(sock, IPPROTO_TCP, TCP_NODELAY, (void*)&opt_val, &opt_len);
```

- 如果正在使用`Nagle`算法，`optval`变量中会保存0
- 如果已禁用`Nagle`算法，则保存1
- 何时需要禁用，何时需要打开，需要根据实际情况考量


> 至此，`socket`的相关内容就告一段落，主要还是解析了内部的一些参数和原理，在实际工作中也会用到，面试的时候也会被问到，大家好好掌握。
>

 

 <br>

### 4.8 Questions

1. 序列号SEQ是在三次握手期间确定的，而并非第一次握手确定，因为第一次握手不一定能收到。





 <br>

<hr style="border-top: 1px dashed #8c8b8b;border-bottom: none;">

## 5 linux系统编程：进程

> 到目前为止，大家已对套接字编程有了一定的理解，但要想实现真正的服务器端，只凭这些内容还不够。因此，现在开始学习**构建实际网络服务所需内容**。



### 5.1 进程的概念以及应用

利用之前学习到的内容，我们可以构建**按序向第一个客户端到第一百个客户端提供服务**的服务器端。

> 当然，第一个客户端不会抱怨服务器端，但如果每个客户端的平均服务时间为0.5秒，则第100个客户端会对服务器端产生相当大的不满。

 

#### 5.1.1 服务端类型和并发服务器

**两种类型的服务端**

> 如果真正为客户端着想，应提高客户端满意度平均标准。如果有下面这种类型的服务器端，应该感到满意了吧？
>

- "第一个连接请求的受理时间为0秒，第50个连接请求的受理时间为50秒，第100个连接请求的受理时间为100秒！但只要受理，服务只需1秒钟。"【如果排在前面的请求数能用一只手数清，客户端当然会对服务器端感到满意。但只要超过这个数，客户端就会开始抱怨。】
- "所有连接请求的受理时间不超过1秒，但平均服务时间为2~3秒。"【并发服务器】

<br>

 

**并发服务器的实现方法：**

即使有可能延长服务时间，也有必要改进服务器端，使其同时向所有发起请求的客户端提供服务，以提高平均满意度。而且，<span style="background:#FFFF00;">网络程序中数据通信时间比CPU运算时间占比更大。因此，向多个客户端提供服务是一种有效利用CPU的方式。</span>

接下来讨论同时向多个客户端提供服务的并发服务器端。下面列出的是具有代表性的并发服务器端实现模型和方法：

1. 多进程服务器∶通过创建多个进程提供服务
2. 多路复用服务器∶通过捆绑并统一管理I/O对象提供服务【与`I/O`复用有关】
3. 多线程服务器∶通过生成与客户端等量的线程提供服务【与多线程有关】

 <br>



#### 5.1.2 概念

**进程：**<span style="background:#FFFF00;">占用内存空间的正在运行的程序。</span>

- 进程ID为全局可见，线程ID只是进程内可见，除非全局共享该线程
- 内存空间独立，即原则上不允许其他程序访问【除非如调试程序`gdb`】【有点线程不占空间，属于进程的一部分】

> 假如同学们从网上下载了《植物大战僵尸游戏》并安装到硬盘。此时的游戏并非进程，而是程序。因为游戏并未进入运行状态。
>
> 接着开始运行程序。此时游戏被加载到主内存并进入运行状态，这时才可称为进程。如果同时运行多个植物大战僵尸游戏程序，则会生成相应数量的进程，也会占用相应进程数的内存空间。

>  再举个例子。进行文档相关操作，这时应打开文档编辑软件。如果工作的同时还想听音乐，应打开酷狗播放器。另外，为了与朋友聊天，再打开微信软件。此时共创建3个进程。
>
> 从操作系统的角度看， <span style="background:#13dddd;">进程是程序流的基本单位</span>。若创建多个进程，则操作系统将同时运行。

有时，一个程序运行过程中也会产生多个进程。接下来要创建的**多进程服务器**就是其中的代表。编写服务器端前，先了解一下通过程序创建进程的方法【`5.1.3`】。

 <br>

**CPU核的个数与进程数**

拥有2个运算设备的CPU称作双核CPU，拥有4个运算器的CPU 称作4核CPU。也就是说，1个CPU中可能包含多个运算设备【核心】。

核的个数与可同时运行的进程数相同；但若进程数超过核数，进程将<span style="background:#13dddd;">分时</span>使用CPU 资源【但因为CPU 运转速度极快，我们会感到所有进程同时运行。当然，核数越多，这种感觉越明显】。

<br>

**进程ID：**

无论进程是如何创建的，所有进程都会从操作系统分配到ID。

- 此`ID`称为**进程ID**，其值为`＞2`的**整数**【取值范围：`0~32767`或`65535`】
- `ID=1`要分配给操作系统启动后的首个进程【`init`进程 | 用于协助操作系统】，因此用户进程无法得到`ID`值1。
- 进程ID不连续，因为中间可能会产生各种子进程和线程，可能其中的某些已经死亡；当最后一个进程号32767用完之后，会从头开始找空进程号

通过`ps au`指令可以查看当前运行的所有进程。特别需要注意的是，该命令同时可以列出`PID`【进程ID】。通过指定a和u参数列出了所有进程详细信息。



<br>

#### 5.1.3 通过fork 函数创建进程

创建进程的方法很多，此处只介绍用于创建多进程服务器端的`fork`函数【fork函数实际上是通过`clone`函数发挥作用】

```c++
#include <unistd.h>

//成功时返回进程 ID，失败时返回-1
pid_t fork(void);
```

注意：

- fork函数将创建调用的进程副本【也就是说，并非根据完全不同的程序创建进程，而是复制正在运行的、调用fork函数的进程】

- 另外，两个进程都将执行fork函数调用后的语句【准确地说是在fork函数返回后】。但因为通过同一个进程、复制相同的内存空间，之后的程序流**要根据fork函数的返回值加以区分**。即利用fork函数的如下特点区分程序执行流程：
  - 父进程∶fork函数返回子进程`ID>0`。
  - 子进程∶fork函数返回`0`

- 虽然复制了相同的内存空间，如堆、栈等，但之后子进程不可以互相访问父进程的内存空间【但子进程有父进程的副本，故？】

> 此处"父进程"（Parent Process）指原进程，即调用fork函数的主体，而"子进程"（Child Process）是通过父进程调用fork函数复制出的进程。接下来讲解调用fork函数后的程序运行流程，如下图所示。
>

 ![](linux-5-1.png)

 

```c++
#include <stdio.h>
#include <unistd.h>

int gval=10;
 
int main(int argc, char *argv[])
{
    pid_t pid;
    int lval=20;
    gval++, lval+=5;


    //创建子进程。父进程的pid中存有子进程的ID，子进程的pid是0
    pid=fork();         
    if(pid==0) // if Child Process
    	gval+=2, lval+=2;
    else          // if Parent Process
    	gval-=2, lval-=2;

    if(pid==0)
    	printf("Child Proc: [%d, %d] \n", gval, lval); 
    else
    	printf("Parent Proc: [%d, %d] \n", gval, lval);
    return 0;
}
```

>  从运行结果可以看出，调用fork函数后，父子进程拥有完全独立的内存结构。
>

 

 <br>

### 5.2 进程和僵尸进程

文件操作中，关闭文件和打开文件同等重要。同样，进程销毁和进程创建同等重要。如果未认真对待进程销毁，它们将变成僵尸进程困扰大家。

进程完成工作后【执行完main函数中的程序后】应被销毁，但有时这些进程将变成僵尸进程，占用系统中的重要资源【进程号和内存】。这种状态下的进程称作**僵尸进程**【执行结束后等待父进程的下一步指示】，这也是给系统带来负担的原因之一。

 

**产生僵尸进程的原因：**

首先利用如下两个示例，展示调用`fork`函数产生子进程的终止方式：

- 传递参数并调用exit函数。
- main函数中执行retun语句并返回值。

<span style="background:#13dddd;">向`exit`函数传递的参数值和`main`函数的returm语句返回的值都会传递给操作系统。而操作系统不会销毁子进程，直到把这些值传递给产生该子进程的父进程。</span>处在这种状态下的进程就是**僵尸进程**。也就是说，将子进程变成僵尸进程的，正是操作系统。

既然如此，此僵尸进程何时被销毁呢？**当操作系统向创建子进程的父进程，传递子进程的`exit`参数值或`return`语句的返回值后，才会销毁僵尸进程。**【合理性：对某些异常结束的子进程，父进程还可以获取子进程的相关状态，以便于解决相应的问题】【但同时，操作系统不会主动传递这些参数】

如何向父进程传递这些值呢？操作系统不会主动把这些值传递给父进程，只有父进程主动发起请求【函数调用】时，操作系统才会传递该值。换言之，如果父进程未主动要求获得子进程的结束状态值，操作系统将一直保存，并让子进程长时间处于僵尸进程状态【也就是说，父母要负责收回自己生的孩子】。下面我们来创建一个僵尸进程：

```c++
#include <stdio.h>
#include <unistd.h>
#include <sys/wait.h>
#include <stdlib.h>//exit

void lesson82()
{
	pid_t pid = fork();
	if (pid > 0)
	{
		//父进程
		printf("Parent Process ID: %d \n", pid);
		sleep(20);
		//获取子进程状态【即上文提到的：父进程主动获取子进程的状态】
		int status;
		waitpid(pid, &status, 0);
	}
	else {
		printf("Child Process ID: %d \n", pid);
		printf("%s(%d):%s\n", __FILE__, __LINE__, __FUNCTION__);
		exit(-1);//不能return,因为没有返回值void
	}
}

int main(int argc, char* argv[])
{
	//20s内，子进程为僵尸进程
	lesson82();
	return 0;
}
```

 查看进程状态：在父进程sleep期间，子进程变成僵尸进程【倒数第四行的Z】【O表示正在运行；S代表正在休眠；R代表运行态；Z代表僵死态；T代表停止】

```bash
4 S     0   5751   1222  0  80   0 - 26947 -      ?        00:00:00 sshd
4 S     0   5753   1222  0  80   0 - 26980 -      ?        00:00:00 sshd
4 S     0   5754      1  0  80   0 - 19219 -      ?        00:00:00 systemd
5 S     0   5756   5754  0  80   0 - 64799 -      ?        00:00:00 (sd-pam)
4 S     0   5857   5753  0  80   0 -  3267 -      ?        00:00:00 sftp-server
1 I     0   6088      2  0  80   0 -     0 -      ?        00:00:00 kworker/4:1-
1 I     0   6442      2  0  80   0 -     0 -      ?        00:00:00 kworker/u256
0 S  1000   6544   2293  0  80   0 -  1096 hrtime pts/0    00:00:00 Linux_consol
1 Z  1000   6545   6544  0  80   0 -     0 -      pts/0    00:00:00 Li <defunct>
0 S  1000   6557   2284  0  80   0 -  6118 wait   pts/1    00:00:00 bash
1 I     0   6575      2  0  80   0 -     0 -      ?        00:00:00 kworker/2:0-
0 R  1000   6576   6557  0  80   0 -  7667 -      pts/1    00:00:00 ps
```

当父进程休眠结束，主动获取子进程状态`waitpid`，随即OS销毁子进程。

>  实际上，服务器需要不停机运行很长时间，如果出现大量僵尸进程，会占用大量系统资源，导致无法创建新进程而系统奔溃。而且，这种奔溃却很难找出原因。



<br>

### 5.3 信号处理

我们已经知道了进程创建及销毁方法，但还有一个问题没解决。

- 子进程究竟何时终止？
- 调用waitpid函数后要无休止地等待吗？

> 父进程往往与子进程一样繁忙，因此不能只调用`waitpid`函数以等待子进程终止



####  5.3.1 信号处理signal

<span style="background:#33f22d;font-weight:bolder;">解决办法：向操作系统求助</span>

子进程终止的识别主体是操作系统，因此，若操作系统能把如下信息告诉正忙于工作的父进程，将有助于构建高效的程序。

> 【OS】"嘿，父进程！你创建的子进程终止了!"
>

此时父进程将暂时放下工作，处理子进程终止相关事宜。这就是信号处理机制【`Signal Handling`】。

- 此处的**信号**是在特定事件发生时由**操作系统**向进程发送的消息。
- 另外，为了响应该消息，执行与消息相关的自定义操作的过程称为"信号处理"。
- 理论上有31种信号。

 

我们想象一下如下场景：

1. 进程∶"嘿，操作系统!如果我之前创建的子进程终止，就帮我调用`zombie_handler`函数。"

2. 操作系统∶"好的！如果你的子进程终止，我会帮你调用`zombie_handler`函数，你先把该函数要执行的语句编！"


上述场景中进程所讲的相当于"注册信号"过程，即进程的子进程结束时，请求操作系统调用特定函数。该请求通过`signal`函数调用完成【因此，称`signal`为信号注册函数】。

 

```c++
//注意，signal函数返回值是一个函数指针
//为了在产生信号时调用，返回之前注册的函数指针
#include <signal.h>

//参数为int型，返回void型函数指针
void(*signal(int signo, void(*func)(int))(int);
//函数指针类型 signal(int signo, 函数指针类型 func)

//等价于下面的内容：
typedef void(*signal_handler)(int);//函数指针定义
signal_handler signal(int signo,signal_handler func);
     
//第一个参数signo为特殊情况信息，即需要关注的信号量
//第二个参数func为特殊情况下将要调用的函数的地址值（指针）
//发生第一个参数代表的情况时，调用第二个参数所指的函数。
```



调用上述函数时，下面给出可以在signal函数中注册的部分特殊情况和对应的常数：

- `SIGALRM`∶已到通过调用alarm函数注册的时间。
- `SIGINT`：中断，即输入`CTRL+C`【Bash条件下的命令行模式下有效】
- `SIGCHLD`∶子进程终止
- 待补充

举例说明：

```c++
//1、"子进程终止则调用`mychild`函数。"
signal(SIGCHLD, mychild);
//此时mychild函数的参数应为int，返回值类型应为void,对应signal函数的第二个参数
//另外，常数SIGCHLD表示子进程终止的情况，应成为signal函数的第一个参数。

//2、"已到通过alarm函数注册的时间，请调用timeout函数。"
//3、"输入CTRL+C时调用keycontrol函数。"
//代表这2种情况的常数分别为SIGALRM和SIGINT
signal(SIGALRM, timeout);
signal(SIGINT, keycontrol);


// alarm函数，到时间后会激活SIGALRM信号量的timeout函数
#include<unistd.h>
//返回0或以秒为单位的距SIGALRM信号发生所剩时间
unsigned int alarm(unsigned int seconds);
```

以上就是信号注册过程。注册好信号处理后，发生注册信号时【注册的情况发生】，操作系统将调用该信号对应的函数。

下面以`SIGALRM`信号量为例：

- 如果调用`alarm`函数的同时向它传递一个正整型参数，相应时间后【以秒为单位】将产生`SIGALRM`信号。
- 若向该函数传递0，则之前对SIGALRM信号的预约将取消。
- 如果通过该函数预约信号后未指定该信号对应的处理函数，则【通过调用`signal`函数】终止进程，不做任何处理。

```c++
#include <stdio.h>
#include <unistd.h>
#include <signal.h>

// 定义信号处理函数timeout，返回值为void
void timeout(int sig)
{
    if(sig==SIGALRM)
    	puts("Time out!");
    //为了每隔2秒重复产生SIGALRM信号，在信号处理器中调用alarm函数
    alarm(2); 
}

// 定义信号处理函数keycontrol，返回值为void
void keycontrol(int sig)
{
    if(sig==SIGINT)
    	puts("CTRL+C pressed");
}

int main(int argc, char *argv[])
{
    int i;
    //注册SIGALRM、SIGINT信号及相应处理器
    signal(SIGALRM, timeout);
    signal(SIGINT, keycontrol);
    
    //预约2秒后发生SIGALRM信号
    alarm(2);
    for(i=0; i<3; i++)
    {
    	puts("wait...");
    	sleep(100);
    }
    return 0;
}
```

更间接的统一处理写法：

```c++
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <signal.h>
#include <pthread.h>//pthread_self

//统一定义
void signal_func(int sig)
{
    switch (sig)
    {
    case SIGALRM:
        printf("tid:%d pid:%d\n",pthread_self(), getpid());
        alarm(2);//2s后再触发产生SIGALRM信号
    case SIGINT:
        printf(" Ctrl + C press\n");
        exit(0);
    default:
        break;
    }
}

void lesson83()
{
    printf("主线程 ----tid:%d pid:%d\n", pthread_self(), getpid());
    
    //注册SIGALRM、SIGINT信号及相应处理器
    signal(SIGALRM, signal_func);
    signal(SIGINT, signal_func);

    //预约2秒后发生SIGALRM信号
    alarm(2);
    //主进程一直休眠
    while(true)
    {
        printf("主线程 ----tid:%d pid:%d\n", pthread_self(), getpid());
        //sleep(3);
        sleep(100);
    }
}

int main(int argc, char* argv[])
{
	lesson83();
	return 0;
}
```

执行结果如下：

```bash
(base) chase@chase-virtual-machine:~/Linux_consoleApplication/bin/x64/Debug$ ./Linux_consoleApplication.out 
主线程 ----tid:-733236032 pid:11992
主线程 ----tid:-733236032 pid:11992
tid:-733236032 pid:11992
主线程 ----tid:-733236032 pid:11992
tid:-733236032 pid:11992
主线程 ----tid:-733236032 pid:11992
tid:-733236032 pid:11992
主线程 ----tid:-733236032 pid:11992
tid:-733236032 pid:11992
主线程 ----tid:-733236032 pid:11992
^C Ctrl + C press
```

注意：

- 主线程和子线程线程号完全一致
- 两个线程交替打印【也就是说，主线程根本没有休眠100s】
- 小结论：信号量会影响休眠



> 🔺为什么主线程没有休眠100s？
>
> 原因：发生SIGALRM信号时，将唤醒由于调用sleep函数而进入阻塞状态的进程【主线程】。
>
> 调用函数的主体的确是操作系统，但进程处于睡眠状态时无法调用函数。因此，产生信号时，为了调用信号处理器，将唤醒由于调用sleep函数而进入阻塞状态的进程。而且，进程一旦被唤醒，就不会再进入睡眠状态。即使还未到sleep函数中规定的时间也是如此。

 

 <br>

####  5.3.2 Sigaction函数进行信号处理

前面所学的`signal`足以用来编写防止僵尸进程生成的代码。下面介绍更强大的`sigaction`函数，它类似于`signal`函数，而且完全可以代替`signal`函数，也更稳定。

之所以稳定，是因为如下原因∶

- `signal`在`UNIX`系列的不同操作系统中可能存在区别，但`sigaction`完全相同。

- 实际上现在很少使用`signal`函数编写程序，它只是为了保持对旧程序的兼容。




```c++
#include <signal.h>

//成功时返回0，失败时返回-1
int sigaction(int signo, const struct sigaction* act, struct sigaction* oldact);
//signo  传递信号信息
//act    对应于第一个参数的信号处理函数（信号处理器）信息。
//oldact 通过此参数获取之前注册的信号处理函数指针，若不需要则传递0。

//声明并初始化sigaction结构体变量，该结构体定义如下。
struct sigaction
{
    void(*sa_handler)(int); //保存信号处理函数的指针值（地址值）
    
    //以下两个成员用于指定信号相关的选项和特性,一般初始化为0
    sigset_t sa mask;
    int sa_flags;
}
```

 示例：

```c++
#include <stdio.h>
#include <unistd.h>
#include <signal.h>

void timeout(int sig)
{
	if (sig == SIGALRM)
		puts("Time out!");
	alarm(2);
}

int main(int argc, char* argv[])
{
	int i;
	//为了注册信号处理函数，声明sigaction结构体变量并在sa_handler成员中保
	//存函数指针值。
	struct sigaction act;
	act.sa_handler = timeout;
	sigemptyset(&act.sa_mask);
	act.sa_flags = 0;

	//注册SIGALRM信号的处理器。调用alarm函数预约2秒后发生SIGALRM信号。
	sigaction(SIGALRM, &act, 0);
	alarm(2);

	for (i = 0; i < 3; i++)
	{
		puts("wait...");
		sleep(100);
	}
	return 0;
}
```

 

 <br>

#### 5.3.3 示例：利用信号处理技术消灭僵尸进程

子进程终止时将产生`SIGCHLD`信号，知道这一点就很容易完成消灭僵尸进程。接下来利用`sigaction`函数消灭僵尸进程。

 

```c++
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <signal.h>
#include <sys/wait.h>

void read_childproc(int sig)
{
	int status;
	pid_t id = waitpid(-1, &status, WNOHANG);
	if (WIFEXITED(status))
	{
		printf("Removed proc id: %d \n", id);
		printf("Child send: %d \n", WEXITSTATUS(status));
	}
}

int main(int argc, char* argv[])
{
	pid_t pid;

	struct sigaction act;
	act.sa_handler = read_childproc;
	sigemptyset(&act.sa_mask);
	act.sa_flags = 0;

	//注册SIGCHLD信号对应的处理器
	//若子进程终止，则调用read_childproc函数。
	//处理函数中调用了waitpid函数，所以子进程将正常终止，不会成为僵尸进程
	sigaction(SIGCHLD, &act, 0);

	pid = fork();
	if (pid == 0)//子进程
	{
		puts("Hi! I'm child process");
		sleep(10);
		return 12;
	}
	else//父进程
	{
		printf("Child proc id: %d \n", pid);
		pid = fork();
		if (pid == 0)
		{
			puts("Hi! I'm child process");
			sleep(10);
			exit(24);
		}
		else//父进程
		{
			int i;
			printf("Child proc id: %d \n", pid);
			//for循环∶为了等待发生SIGCHLD信号，使父进程共暂停5次，每次间隔5秒 
			//发生信号时，父进程将被唤醒，因此实际暂停时间不到25秒。
			for (i = 0; i < 5; i++)
			{
				puts("wait...");
				sleep(5);
			}
		}
	}
	return 0;
}
```

 

<br>

### 5.4 基于多任务的并发服务器

> 之前写的服务器客户端的代码。举个例子：一个服务端，两个客户端C1/C2，两个客户端同时发送请求，但服务端却是依次受理。【用户量十万才算是小应用，其次是百万、千万、亿级别，假如处理一个连接请求需要1ms，十万级用户量时的最后一个用户需要等待约100s，实际上一般30s作用请求连接都会断开】【瓶颈在于CPU性能】
>
> 而并发服务器接受到连接请求，`fork`一个子进程来处理，而主进程继续`accept`新请求。此时，<span style="background:#33f22d;">同时存在的用户数量</span>成为新的瓶颈【内存】。

服务端：

```c++
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <signal.h>
#include <sys/wait.h>

#include <iostream>
#include <sys/socket.h>
#include <arpa/inet.h>
#include <string.h>

void hand_childProc(int sig)
{
	if (sig == SIGCHLD)
	{
		pid_t pid;
		int status = 0;
		pid = waitpid(-1, &status, WNOHANG);//不要挂起：即此时由操作系统告知父进程：子进程已结束。此时父进程无需挂起等待，直接处理即可
		printf("%s(%d):%s: remove child process:%d\r\n", __FILE__, __LINE__, __FUNCTION__, pid);
	}
	else {
		printf("%s(%d):%s: Other\r\n", __FILE__, __LINE__, __FUNCTION__);
	}
}

void error_handle(char* msg)
{
	fputs(msg, stderr);
	fputc('\n', stderr);
	exit(1);
}

void server85()
{
	//子进程回收
	struct sigaction act;
	act.sa_flags = 0;
	sigemptyset(&act.sa_mask);
	act.sa_handler = hand_childProc;
	sigaction(SIGCHLD, &act, 0);//父进程向操作系统注册一个动作，即子进程结束时产生SIGCHLD信号量，触发操作系统向父进程报告子进程结束并执行操作

	//服务端: socket-creat bind listen accept
	struct sockaddr_in serv_addr, client_addr;
	memset(&serv_addr, 0, sizeof(serv_addr));
	serv_addr.sin_family = AF_INET;
	serv_addr.sin_addr.s_addr = htonl(INADDR_ANY);
	serv_addr.sin_port = htons(9527);

	int serv_socket;
	serv_socket = socket(PF_INET, SOCK_STREAM, 0);
	//bind
	if (bind(serv_socket, (sockaddr*)&serv_addr, sizeof(serv_addr)) == -1)
	{
		error_handle("bind failed!");
	}
	//listen
	if (listen(serv_socket, 5) == -1)
	{
		error_handle("listen failed!");
	}
	//accept 单次
	/*socklen_t clientaddr_len = sizeof(client_addr);
	int client = accept(serv_socket, (sockaddr*)&client_addr, &clientaddr_len);
	if (client >= 0)
	{
		char buffer[2048] = "";
		ssize_t length = 0;
		while ((length = read(client, buffer, sizeof(buffer))) > 0)
		{
			write(client, buffer, length);
			length = 0;
			memset(buffer, 0, sizeof(buffer));
		}
		close(client);
		printf("%s(%d):%s: client is closed\n", __FILE__, __LINE__, __FUNCTION__);
	}*/
	//accept 多次
	int count = 0;//假设服务5次
	while (true)
	{
		socklen_t clientaddr_len = sizeof(client_addr);
		int client = accept(serv_socket, (sockaddr*)&client_addr, &clientaddr_len);
		printf("%s(%d):%s: client is connected!\n", __FILE__, __LINE__, __FUNCTION__);
		if (client >= 0)
		{
			count++;
			pid_t pid = fork();
			if (pid == 0)//子进程：客户端
			{
				//fork出的子进程会将服务器套接字和客户端套接字都复制一份，故需要一些处理
				close(serv_socket);//子进程不需要服务端套接字

				char buffer[2048] = "";
				ssize_t length = 0;
				while ((length = read(client, buffer, sizeof(buffer))) > 0)
				{
					write(client, buffer, length);
					length = 0;
					memset(buffer, 0, sizeof(buffer));
				}
				close(client);
				printf("%s(%d):%s: client is closed\n", __FILE__, __LINE__, __FUNCTION__);
				return;//子进程需要返回
			}
			if (pid < 0)
			{
				//fork失败，资源耗尽
				close(client);
				printf("%s(%d):%s: fork failed!\n", __FILE__, __LINE__, __FUNCTION__);
				break;
			}
			//if(pid>0)//父进程
			close(client);//父进程不需要client
		}
		if (count >= 5) break;//为了演示终止
	}
	close(serv_socket);
	return;
}


void client85()
{
	//【之前的TCP客户端 client78 并再简化】
	int client = socket(PF_INET, SOCK_STREAM, 0);
	struct sockaddr_in servaddr;
	memset(&servaddr, 0, sizeof(servaddr));
	servaddr.sin_family = AF_INET;
	servaddr.sin_addr.s_addr = inet_addr("127.0.0.1");
	servaddr.sin_port = htons(9527);
	int ret = connect(client, (struct sockaddr*)&servaddr, sizeof(servaddr));

	char buffer[256] = "Hello！";
	while (ret == 0) {
		printf("%s(%d):%s\n", __FILE__, __LINE__, __FUNCTION__);

		size_t len = strlen(buffer);//待发送的实际长度
		size_t send_len = 0;//已发送的长度
		while (send_len < len)//存在未发送的内容
		{
			ssize_t ret = write(client, buffer + send_len, strlen(buffer) - send_len);
			if (ret <= 0)
			{
				fputs("write failed!", stdout);
				close(client);
				std::cout << "client done!" << std::endl;
				return;
			}
			send_len += (size_t)ret;
		}

		memset(buffer, 0, sizeof(buffer));
		//优化读
		size_t read_len = 0;
		while (read_len < len)
		{
			ssize_t ret = read(client, buffer + read_len, len - read_len);
			if (ret <= 0)
			{
				fputs("read failed!", stdout);
				close(client);
				std::cout << "client done!" << std::endl;
				return;
			}
			read_len += ret;
		}

		std::cout << "from server:" << buffer;//收到回复
		sleep(2);//模拟延迟
		break;//仅循环一次
	}
	close(client);
	std::cout << "client done!" << std::endl;
}

void lesson85()
{
	pid_t pid = fork();
	if (pid == 0)
	{
		//子进程启动服务器
		server85();
	}
	else if (pid > 0)
	{
		printf("%s(%d):%s: wait for server\n", __FILE__, __LINE__, __FUNCTION__);
		sleep(2);//等待服务器启动
		//启动客户端
		for (int i = 0; i < 5; i++)
		{
			pid = fork();
			if (pid > 0)
			{
				//父进程continue
				continue;
			}
			else {
				//子进程启动客户端
				client85();
				break;//注意!一定要break
				//在子进程中如果不做break，下一步再进行for，然后创建孙进程
			}
		}
	}
}

int main(int argc, char* argv[])
{
	lesson85();
	return 0;
}
```



**注意：**

- <span style="background:#FFFF00;">在for中fork时，子进程break，父进程continue。</span>【在子进程中如果不做break，下一次for循环时，所有子进程将创建孙进程，总的新进程数量将呈现指数级增长】



<br>

### 5.5 进程间通信

`IPC`：`InterProcess Communication`，即进程间通信，<span style="background:#FFFF00;">通过内核提供的缓冲区进行数据交换的机制。【需要开发环境或权限】</span>进程间通信意味着两个不同进程间可以交换数据，为了完成这一点，操作系统中应提供两个进程可以同时访问的内存空间。

 <br>

进程A和B之间的如下例子就是一种进程间通信规则：

> "如果我有1个面包，变量bread的值就变为1。如果吃掉这个面包，bread的值又变回0。因此，可以通过变量bread值判断我的状态。" 也就是说，进程A通过变量bread将自己的状态通知给了进程B，进程B通过变量bread听到了进程A的话。
>

因此，只要有两个进程可以同时访问的内存空间，就可以通过此空间交换数据。但是进程具有完全独立的内存结构，就连通过`fork`函数创建的子进程也不会与父进程共享内存空间。因此，进程间通信只能通过其他特殊方法完成。

 <br>

#### 5.5.1 进程间通信：管道

> 管道其实有很多种，最常用的应该就是`shell`中的"`|`"。
>
> 他其实就是一个管道符，将前面的表达式的输出，引入后面表达式当作输入，比如我们常用的"`ps aux|grep ssh`"可以查看ssh的相关进程。

我们常用在进程间通信管道的有两种：

- 一种是`pipe`管道，又可以叫做亲族管道；
- 与之对应的则是`fifo`管道，又可以叫做公共管道。

![](linux-5-2.png)

从上图可以看到，为了完成进程间通信，需要创建管道。值得注意的是：

- 管道并非属于进程的资源，而是和套接字一样，属于操作系统【也就不是fork函数的复制对象】。所以，<span style="background:#FFFF00;">两个进程通过操作系统提供的内存空间进行通信。</span>
- 单条管道具有单向性，双向管道由两条管道构成。

```c++
#include <unistd.h>

//成功时返回 0，失败时返回-1
int pipe(int filedes[2]);
//Filedes[0] 通过管道接收数据时使用的文件描述符，即管道出口。
//Filedes[1] 通过管道传输数据时使用的文件描述符，即管道入口。
//以长度为2的int数组地址值，作为参数调用上述函数时，数组中存有两个文件描述符，它们将被用作管道的出口和入口。
```

**注意：**

父进程调用该函数时将创建管道，同时获取对应于出入口的文件描述符，此时父进程可以读写同一管道。但父进程的目的是与子进程进行数据交换，因此需要将入口或出口中的1个文件描述符传递给子进程。如何完成传递呢?

答案就是调用`fork`函数。也就是说，<span style="background:#FFFF00;">必须使用父进程创建管道。</span>【出入口文件描述符不能由子进程传递给父进程，故只能由父进程创建`pipe`】

 单管道：

```c++
#include <stdio.h>
#include <unistd.h>

void lesson87()
{
	int fds[2] = { -1,-1 };//0也是标准输入输出的文件描述符
	pipe(fds);
	char str[64] = "send by sub process!\n";
	char buffer[128] = "";

	pid_t pid = fork();
	if (pid == 0)
	{
		//子进程 通过管道传递字符串
		write(fds[1],str,sizeof(str));
	}
	else {
		//父进程从管道接收字符串
		read(fds[0], buffer, sizeof(buffer));
		printf("%s(%d):%s server:%s\n", __FILE__, __LINE__, __FUNCTION__, buffer);
	}
}

int main(int argc, char* argv[])
{
	lesson87();
	return 0;
}
```

<br>

一个管道无法完成双向通信任务，有时候需要创建两个管道，各自负责不同的数据流动即可。其过程如下图所示：

![](linux-5-3.png)

```c++
#include <stdio.h>
#include <unistd.h>

void lesson87()
{
	int s2c[2], c2s[2];
	pipe(s2c);
	pipe(c2s);
	char str1[64] = "Hello, I am sub-process!\n";
	char str2[64] = "Hello, I am main-process!\n";

	pid_t pid = fork();
	if (pid == 0)
	{
		//子进程 通过管道传递字符串
		char buffer[128] = "";
		write(c2s[1],str1, sizeof(str1));
		read(s2c[0], buffer, sizeof(buffer));
		printf("%s(%d):%s from server:%s\n", __FILE__, __LINE__, __FUNCTION__, buffer);
	}
	else {
		//父进程从管道接收字符串
		char buffer[128] = "";
		read(c2s[0], buffer, sizeof(buffer));
		printf("%s(%d):%s from client:%s\n", __FILE__, __LINE__, __FUNCTION__, buffer);
		write(s2c[1], str2, sizeof(str2));

		printf("%s(%d):%s %d\n", __FILE__, __LINE__, __FUNCTION__, getpid());
	}

	printf("%s(%d):%s %d\n", __FILE__, __LINE__, __FUNCTION__, getpid());
}

int main(int argc, char* argv[])
{
	lesson87();
	return 0;
}
//Output:
///home/chase/Linux_consoleApplication/main.cpp(25):lesson87 from client:Hello, I am sub-process!

///home/chase/Linux_consoleApplication/main.cpp(28):lesson87 24565
///home/chase/Linux_consoleApplication/main.cpp(31):lesson87 24565
///home/chase/Linux_consoleApplication/main.cpp(19):lesson87 from server:Hello, I am main-process!

///home/chase/Linux_consoleApplication/main.cpp(31):lesson87 24566【由子进程执行】
```

可以注意到：

- 此例中，父进程执行结束后，子进程才收到消息。
- 即使主进程执行结束，子进程也可以在管道中读取数据。即管道脱离进程而存在，是属于操作系统的。【管发不管收没收到】
- 能读取数据，不能判断进程是否已经结束；因此，可以使用双向管道来模拟应答来查看进程是否结束。【稳定性/确定性】



<br>

#### 5.5.2 进程间通信：FIFO

> 对比`pipe`管道，他已经可以完成在两个进程之间通信的任务，不过它似乎完成的不够好，也可以说是不够彻底。
>
> <span style="background:#FFFF00;">它只能在两个有亲戚关系的进程之间进行通信</span>，这就大大限制了`pipe`管道的应用范围。
>
> 我们在很多时候往往希望能够在两个独立的进程之间进行通信，这样就无法使用pipe管道，所以一种能够满足独立进程通信的管道应运而生，就是`FIFO`管道【先进先出，即先放入管道的消息先出来】。

`FIFO`管道的本质是操作系统中的命名文件。【当然，Linux的理念就是万物皆文件，它在操作系统中以命名文件的形式存在】

我们可以在操作系统中看见`FIFO`管道，在你有权限的情况下，甚至可以读写他们。

```cpp
#include <sys/stat.h>
#使用命令： 
mkfifo myfifo

#使用函数：成功：0；失败：-1
int mkfifo(const char *pathname, mode_t mode); #mode权限，同fopen权限【读、写、读写】
```

内核会针对`FIFO`文件开辟一个缓冲区，操作`FIFO`文件，可以操作缓冲区，实现进程通信。一旦使用`mkfifo`创建了一个`FIFO`，就可以使用opne打开它，常见的文件IO函数都可以用于FIFO。如：`close`、`read`、`write`、`unlink`等 。

举例：

```c++
#include <sys/stat.h>
#include <sys/types.h>
#include <fcntl.h>//open
#include <unistd.h>

#include <stdio.h>

void lesson88()
{
	mkfifo("./a.fifo", 0666);//6为可读可写，666对应文件所有者权限、组权限、其他组权限
	pid_t pid = fork();
	//printf("%d", sizeof("Hello, World!"));//14
	if (pid == 0)//子进程:打开fifo只读
	{
		int fd = open("./a.fifo", O_RDONLY);
		char buffer[128] = "";
		ssize_t len = read(fd, buffer, sizeof(buffer));
		printf("%s(%d):%s buffer: %s\n", __FILE__, __LINE__, __FUNCTION__, buffer);
		printf("%s(%d):%s length: %d\n", __FILE__, __LINE__, __FUNCTION__, len);
		close(fd);
		printf("%s(%d):%s length: %d\n", __FILE__, __LINE__, __FUNCTION__);
	}
	else {
		//父进程:打开fifo 只写
		int fd = open("./a.fifo", O_WRONLY);
		write(fd, "Hello, World!", 14);
		close(fd);
		printf("%s(%d):%s\n", __FILE__, __LINE__, __FUNCTION__);
	}
}

int main(int argc, char* argv[])
{
	lesson88();
	return 0;
}
///home/chase/Linux_consoleApplication/main.cpp(18):lesson88 buffer: Hello, World!
///home/chase/Linux_consoleApplication/main.cpp(28):lesson88
///home/chase/Linux_consoleApplication/main.cpp(19):lesson88 length: 14
///home/chase/Linux_consoleApplication/main.cpp(21):lesson88 length: 0
```

注意：

- 一般情况下，`FIFO`被称为命名管道【有文件、文件名，使用 `ls -l` 命令发现文件类型为`p`】，`pipe`被称为匿名管道
- 多个进程间通信【以5个为例】，只需要5个`FIFO`管道即可。各进程只读对应管道，如要通信则只写对应进程的管道文件
- <span style="background:#FFFF00;">打开`FIFO`文件时，read端会阻塞等待write端打开open；wirte端同理，也会阻塞等待另一端的打开。</span>

缺陷：

- 通信比较慢：速度受限于文件读写
- read端和write端会占用内存，可能会很大
- 由于两端的阻塞等待，如果对方没有连接，则无法抽身离开。



<br>

#### 5.5.3 进程间通信：共享内存

> 在理解共享内存之前，就必须先了解`System V IPC`通信机制。
>
> `System V IPC`机制最初是由`AT&T System V.2`版本的`UNIX`引入的【UNIX为收费版本】。这些机制是专门用于`IPC`（`Inter-Process Communication` 进程间通信）的，它们在同一个版本中被应用，又有着相似的编程接口，所以它们通常被称为`System V IPC`通信机制。
>
> 共享内存是三个`System V IPC`机制中的第二个。

共享内存，<span style="background:#FFFF00;">允许不同进程之间共享同一段逻辑内存。</span>对于这段内存，它们都能访问，或者修改它，没有任何限制。所以它是进程间传递大量数据的一种非常有效的方式。【优势：稳定高效、速度快、可用于大量数据的传递，但不能超出固定限制】

> <span style="background:#33f22d;">“共享内存允许不同进程之间共享同一段逻辑内存”，这里是逻辑内存。也就是说共享内存的进程访问的可以不是同一段物理内存，这个没有明确的规定，但是大多数的系统实现都将进程之间的共享内存安排为同一段物理内存。</span>
>
> 这些都是基于进程的内存空间都是虚拟内存。共享内存要求申请一块物理内存，然后映射到两个通信进程的地址空间，两个进程都可以对该内存进行读写。

共享内存实际上是由`IPC`机制分配的一段特殊的物理内存，它可以被映射到该进程的地址空间中，同时也可以被映射到其他拥有权限的进程的地址空间中。就像是使用了`malloc`分配内存一样，只不过这段内存是可以共享的。

<hr style="border-top: 1px dashed #8c8b8b;border-bottom: none;">

**共享内存的创建、映射、访问和删除**

IPC提供了一套API来控制共享内存，使用共享内存的步骤通常是：

1. 创建或获取一段共享内存；

2. 将上一步创建的共享内存映射到该进程的地址空间；
3. 访问共享内存；

4. 将共享内存从当前的进程地址空间分离；

5. 删除这段共享内存。


具体如下：

（1）使用`shmget()`函数来创建一段共享内存：

```c++
//#include <sys/ipc.h>
#include <sys/shm.h>

//返回值：共享内存的ID
int shmget( key_t key, size_t size, int shmflg );//share memory get
//key：这段共享内存取的名字，系统利用它来区分共享内存，访问同一段共享内存的不同进程需要传入相同的名字
//size：共享内存的大小
//shmflg：是共享内存的标志，包含9个比特标志位，其内容与创建文件时的mode相同
//有一个特殊的标志IPC_CREAT可以和权限标志以或的形式传入【创建时必须传】
//9为标志位分为文件拥有者、组、组外，相对应读写执行rwx
```

> 其中，关于`key`的取值，其本质上是一个整数，取值相同时可进行通信；但万一随意取之后重名，会进行意料之外的通信。
>
> 故一般`key`使用`ftok(".", 1)`取得。`"."`表示当前路径，1是`值key`，ftok返回一个key，与当前路径相关。
>
> 如果一个进程中有多个共享内存，可以使用`值key`不断加1来解决。这种取法可以规避大多数冲突重名情况。

（2）使用函数`shmat()`来映射共享内存：

```c++
//函数返回值是共享内存的首地址指针
void* shmat( int shm_id, const void* shm_addr, int shmflg );//share memory at
//shm_id：是共享内存的ID，shmget()函数的返回值
//shm_addr：指定共享内存连接到当前进程地址空间的位置，通常传入NULL，表示让系统来进行选择
//如果要自己填，就必须保证不会覆盖、可控
//shmflg：一组控制的标志，通常输入0，也有可能输入SHM_RDONLY，表示共享内存段只读
```

（3）使用函数`shmdt()`来分离共享内存：

```c++
//成功返回0，失败时返回-1
int shmdt( void* shm_p );//share memory delete
//shm_p：就是共享内存的首地址指针，也即是shmat()的返回值
```

（4）使用`shmctl()`函数来控制共享内存：

```c++
int shmctl( int shm_id, int command, struct shmid_ds* buf );//share memory control 
//shm_id：是共享内存的标示符，也即是shmget()的返回值,共享内存的ID
//buf：IPC_RMID填NULL
//command：是要采取的动作，它有三个有效值，如下：
//---IPC_STAT---把buf结构中的值设置为共享内存的关联值
//---IPC_SET----如果拥有足够的权限，将共享内存的值设置为buf中的值
//---IPC_RMID---删除共享内存段【🔺】
```



以下使用共享内存实现进程间通信。这个是写进程。

```c++
#include <stdio.h>
#include <unistd.h>//usleep
#include <string.h>

//#include <sys/ipc.h>
#include <sys/shm.h>

//待共享的内存
typedef struct {
	int id;
	char name[128];
	int age;
	bool sex;
	int signal;//信号，为了保证读到
}STUDENT, * pSTU;

void lesson90()
{
	pid_t pid = fork();
	if (pid > 0)//父进程
	{
		//key_t的取值：本质上是一个整数，取值相同时可进行通信
		int shm_id = shmget(ftok(".", 1), sizeof(STUDENT), IPC_CREAT | 0666);

		if (shm_id == -1)//失败
		{
			printf("%s(%d):%s Create share memory failed!\n", __FILE__, __LINE__, __FUNCTION__);
			return;
		}
		//映射
		pSTU pstudent = (pSTU)shmat(shm_id, NULL, 0);
		//访问
		pstudent->id = 66666;
		strcpy(pstudent->name, "ancasdwdaddadadadwdadwad");
		pstudent->age = 18;
		pstudent->sex = true;
		pstudent->signal = 99;
		//同步机制
		while (pstudent->signal == 99)//直到被读到
		{
			usleep(1000000);
			fputs("parent wait:", stdout);
		}
		//分离共享内存
		shmdt(pstudent);
		//控制共享内存
		shmctl(shm_id, IPC_RMID, NULL);
	}
	else {//子进程类似，但需要晚一些，等待父进程写入
		//usleep(3000000);//ns级别的sleep，可以控制非常精确，1000为1ms，此处为1s

		int shm_id = shmget(ftok(".", 1), sizeof(STUDENT), IPC_CREAT | 0666);
		if (shm_id == -1)//失败
		{
			printf("%s(%d):%s Create share memory failed!\n", __FILE__, __LINE__, __FUNCTION__);
			return;
		}
		//映射
		pSTU pstudent = (pSTU)shmat(shm_id, NULL, 0);
		//访问：读【直到能读到】
		//同步机制
		while (pstudent->signal != 99)
		{
			usleep(1000000);
			fputs("wait:", stdout);
		}
		printf("id:%d\nname:%s\nage:%d\nsex:%s\n", pstudent->id, pstudent->name, pstudent->age, pstudent->sex ? "male" : "female");
		pstudent->signal = 0;

		shmdt(pstudent);
		shmctl(shm_id, IPC_RMID, NULL);
	}
}

int main(int argc, char* argv[])
{
	lesson90();
	return 0;
}
```

注意：

- 需要保证读完前，共享内存的进程还不能结束共享，即必须保证**同步**【外加信号机制，否则没写完就读必然不是想要的结果【代码中的`while`等待机制】】
- 内存访问速度能达到10G/s以上，很可能上面的父进程共享结束，子进程都没开始读【读的其实是空内存】。
- 以上存在的需要手动同步的缺陷，可以利用下面的信号量解决



<br>

#### 5.5.4 进程间通信：信号量

<span style="background:#13dddd;">（1）什么是信号量？</span>

为了防止出现因多个程序同时访问一个共享资源而引发的一系列问题，我们需要一种方法，它可以通过生成并使用令牌来授权，在任一时刻只能有一个执行线程访问代码的临界区域。

临界区域是指执行数据更新的代码需要独占式地执行。而信号量就可以提供这样的一种访问机制，让一个临界区同一时间只有一个线程在访问它，也就是说<span style="background:#FFFF00;">信号量是用来调协进程对共享资源的访问的。</span>

信号量是一个特殊的变量，程序对其访问都是原子操作，且只允许对它进行等待【即`P(信号变量)`】和发送【即`V(信号变量)`】信息操作。【通过P和释放V】

> 最简单的信号量是只能取0和1的变量，这也是信号量最常见的一种形式，叫做二进制信号量。而可以取多个正整数的信号量被称为通用信号量。这里主要讨论二进制信号量。

<br>

<span style="background:#13dddd;">（2）信号量的工作原理</span>

信号量只能进行两种操作【等待和发送信号】，即`P(sv)`和`V(sv)`，具体行为如下：

- `P(sv)`：如果`sv`的值大于零，就给它减1；如果它的值为零，就挂起该进程的执行 
- `V(sv)`：如果有其他进程因等待`sv`而被挂起，就让它恢复运行，如果没有进程因等待`sv`而挂起，就给它加1。

> 举个例子：两个进程共享信号量sv，一旦其中一个进程执行了`P(sv)`操作，它将得到信号量，并可以进入临界区，使sv减1。而第二个进程将被阻止进入临界区，因为当它试图执行`P(sv)`时，sv为0，它会被挂起以等待第一个进程离开临界区域并执行`V(sv)`释放信号量，这时第二个进程就可以恢复执行。
>

 <br>

<span style="background:#13dddd;">（3）Linux的信号量机制</span>

A：信号量创建函数`semget`：

```c++
#include <sys/sem.h>
#include <sys/types.h>
#include <sys/ipc.h>

//1.创建一个新信号量或取得一个已有信号量
//返回值：成功返回一个相应信号标识符（非零）sem_id，失败返回-1
int semget(key_t key, int num_sems, int sem_flags); 
//key_t ftok(const char *pathname, int proj_ id);创建key键值
//num_sems：指定需要的信号呈数目，它的值几乎总是1
//sem_fags：一组标志
```

> 第一个参数key【最好自己创建，键值唯一】是整数值【唯一非零】，不相关的进程可以通过它访问一个信号量，它代表程序可能要使用的某个资源。
>
> 程序对所有信号量的访问都是间接的，程序先通过调用semget函数并提供一个键，再由系统生成一个相应的信号标识符   【semget涵数的返回值】，只有semget函数才直接使用信号量键，所有其他的信号量函数使用由semget函数返回的信号量标识符。如果多个程序使用相同的key值，key将负责协调工作。     
>
> 对于第三个参数，想要当信号量不存在时创建一个新的信号量，可以和值`IPC_CREAT`做按位或操作。设置了   `IPC_CREAT`标志后，即使给出的键是一个已有信号量的键，也不会产生错误。而`IPC_CREAT | IPC_EXCL`则可以创建一个新的、唯一的信号量，如果信号量已存在，返回一个错误。

B：PV操作`semop`函数：

```c++
#include <sys/sem.h>
#include <sys/types.h>
#include <sys/ipc.h>

//对semid这个信号量指定的变量进行操作，是选择发送（+1）还是等待（-1）
int semop(int semid, struct sembuf *sops, unsigned nsops);
//return:成功返回一个相应信号标识符（非零）sem_id，失败返回-1

//sem_id：是由semget返回的信号量标识符
//Sops：表示要对信号量进行什么操作
//nsops：是表示操作的信号量个数

//sembuf：结构的定义如下:
struct sembuf{
    short sem_num; //除非使用一组信号量，否则它为0,从0开始，表示要操作的信号量是第几个;
    short sem_op;//信号量在一次操作中需要改变的数据，通常是两个数，一个是-1，即P（等待）操作，对第一个变量选择的信号量进行操作；一个是+1，即V（发送信号）操作。
    short sem_flg; //默认0，通常为SEM_UNDO,使操作系统跟踪信号，并在进程没有释放该信号量而终止时,操作系统释放信号量
}
```

C：信号量控制函数`semctl`：

```c++
#include <sys/sem.h>
#include <sys/types.h>
#include <sys/ipc.h>

//直接控制信号量信息:成功返回0，失败返回-1
int semctl(int semid,  int semnum, int cmd, …);
//semid：信号量的标志码(ID)，也就是semget（）函数的返回值
//semnum：操作信号在信号集中的编号，从0开始；
//cmd：命令，表示要进行的操作,参数cmd中可以使用的命令如下
//---IPC_STAT--读取一个信号量集的数据结构semid_ds，并将其存储在semun中的buf参数中
//---IPC_SET---设置信号量集的数据结构semid_ds中的元素ipc_perm，其值取自semun中的buf参数
//---IPC_RMID--将信号量集从内存中删除【只能由创建者删除】🔺
//---GETALL----用于读取信号量集中的所有信号量的值
//---GETNCNT---返回正在等待资源的进程数目
//---GETPID----返回最后一个执行semop操作的进程的PID
//---GETVAL----返回信号量集中的一个单个的信号量的值
//---GETZCNT---返回这在等待完全空闲的资源的进程数目
//---SETALL----设置信号量集中的所有的信号量的值SETVAL设置信号量集中的一个单独的信号量的值。
//---SETVAL----设置信号量集中的一个单独的信号量的值🔺
```



**使用信号量改进共享内存的通信方式：**

```c++
#include <stdio.h>
#include <unistd.h>//usleep
#include <string.h>

//#include <sys/ipc.h>
#include <sys/shm.h>
#include <sys/sem.h>

//待共享的内存
typedef struct {
	int id;
	char name[128];
	int age;
	bool sex;
}STUDENT, * pSTU;

void lesson90()
{
	pid_t pid = fork();
	if (pid > 0)//父进程
	{
		key_t key = ftok(".", 2);
		int sem_id = semget(key, 2, IPC_CREAT);//标志意为：如果不存在则创建
		semctl(sem_id, 0, SETVAL, 0);//第0个编号，信号量初始值为0【单个资源】
		semctl(sem_id, 1, SETVAL, 0);//第1个编号，信号量初始值为0

		int shm_id = shmget(ftok(".", 1), sizeof(STUDENT), IPC_CREAT | 0666);
		if (shm_id == -1)//失败
		{
			printf("%s(%d):%s Create share memory failed!\n", __FILE__, __LINE__, __FUNCTION__);
			return;
		}
		//映射
		pSTU pstudent = (pSTU)shmat(shm_id, NULL, 0);
		//访问
		pstudent->id = 66666;
		strcpy(pstudent->name, "ancasdwdaddadadadwdadwad");
		pstudent->age = 18;
		pstudent->sex = true;

		//信号量同步机制【注意此处结构体的赋值方式】
		//序号为0的信号量用于通知子进程可以进行读
		sembuf sop = {
			.sem_num = 0,//序号
			.sem_op = 1//+1,即V操作
		};
		semop(sem_id, &sop, 1);//操作一个信号量，V操作

		//序号为1的信号量用于等待子进程读取结束
		sop.sem_op = -1;//-1,即P操作
		sop.sem_num = 1;
		semop(sem_id, &sop, 1);//P操作
		
		//分离共享内存
		shmdt(pstudent);
		//控制共享内存
		shmctl(shm_id, IPC_RMID, NULL);

		//删除信号量,只能由创建者删除
		//sleep(10);//观察信号量 ipcs -s
		semctl(sem_id, 0, IPC_RMID);
		semctl(sem_id, 1, IPC_RMID);
	}
	else {//子进程，等待父进程写入
		//usleep(3000000);//ns级别的sleep，1000为1ms
		key_t key = ftok(".", 2);
		int sem_id = semget(key, 2, IPC_CREAT);//获取父进程信号量

		int shm_id = shmget(ftok(".", 1), sizeof(STUDENT), IPC_CREAT | 0666);
		if (shm_id == -1)//失败
		{
			printf("%s(%d):%s Create share memory failed!\n", __FILE__, __LINE__, __FUNCTION__);
			return;
		}
		//信号量机制：序号为0的信号量用于通知子进程可以进行读
		sembuf sop = {
			.sem_num = 0,//序号
			.sem_op = -1//-1,即P操作等待
		};
		semop(sem_id, &sop, 1);//操作一个信号量，V操作


		//映射
		pSTU pstudent = (pSTU)shmat(shm_id, NULL, 0);
		//访问：读
		printf("id:%d\nname:%s\nage:%d\nsex:%s\n", pstudent->id, pstudent->name, pstudent->age, pstudent->sex ? "male" : "female");

		//信号量机制：序号为1的信号量通知父进程：子进程读取结束
		sop.sem_op = 1;//+1,即V操作
		sop.sem_num = 1;
		semop(sem_id, &sop, 1);//V操作

		shmdt(pstudent);
		shmctl(shm_id, IPC_RMID, NULL);
	}
}

int main(int argc, char* argv[])
{
	//使用信号量优化共享内存
	lesson90();
	return 0;
}
```

注意：

- 相比共享内存，信号量机制不需要地址映射的过程；
- 注意此处结构体的赋值方式【43行】
- 如果不删除信号量，可使用 `ipcs -m` 或 `ipcs -s` 查看进程间通信相关的信息
- 很高效，但依然繁琐复杂，一般除非有大内存共享的需求，否则使用消息队列。



另外一个例子：

```c++
/* Description:这个程序是测试信号量的互斥（进程间互斥），命令ipcs和ipcrm可以帮助我们查看 - s（信号量）、 - q（消息队列）、 - m（共享内存）是否创建成功与删除。使用方法：man ipcs 和 man ipcrm
*/
#include <sys/stat.h>
#include <sys/types.h>
#include <sys/sem.h>
#include <unistd.h>
#include <sys/ipc.h>
#include <fcntl.h>
#include <stdio.h>

int main(int argc, char** argv)
{
	/*创建信号量sem_id，IPC_CREAT:不存在就创建，存在就获取。*/
	key_t key = ftok("/home/nan/test", 1);
	if (-1 == key)
	{
		printf("create key fail.--%d\n", key);
		return -1;
	}
	printf("create key succeed :--%d\n", key);
	int sem_id = semget(key, 1, IPC_CREAT);
	//1：表示sem_id信号集中，创建信号量的个数，1个；
	if(-1 == sem_id)
	{
		printf("create sem_id fail.--%d\n", sem_id);
		return -1;
	}
	printf("create sem_id succeed.--%d\n", sem_id);
	/*设置信号量集中的信号量，第二个参数表示操作第1个信号量*/
	semctl(sem_id, 0, SETVAL, 1);
	printf("sem_num is : %d\n", semctl(sem_id, 0, GETVAL));
	/*设置信号集sem_id中的信号量值，-1（等待），+1（发送）*/
	struct sembuf sops = {
		.sem_num = 0 ,//信号集中的第几个信号量，0表示第一个
        .sem_op = -1 ,//执行等待操作，其他进程等着。
	};
	int ret = semop(sem_id, &sops, 1);
	if (-1 == ret)
	{
		printf("operator sem fail!--%d\n", ret);
		return -1;
	}
	printf("operator semop succeed.--%d\n", ret);
	/*获取到了锁，则可以实现自己想要的操作，其他进程等着*/
	int fd = open("/home/nan/test/text", O_RDWR | O_APPEND | O_CREAT, 0666);
	if (-1 == fd)
	{
		printf("open text fail . --%d\n", fd);
		return -1;
	}
	write(fd, "1", 2);
	sleep(10);
	write(fd, "2", 2);
	close(fd);
	/*操作完成后，+1（发送出去），将锁交给其他进程用*/
	sops.sem_num = 0;
	sops.sem_op = 1;
	semop(sem_id, &sops, 1);
	return 0;
}
```

 

```c++
/*
Description:在执行第一个程序时候，执行下面这个程序，可以看到下面的程序处于等待状态。
* */
#include <sys/stat.h>
#include <sys/types.h>
#include <sys/sem.h>
#include <unistd.h>
#include <sys/ipc.h>
#include <fcntl.h>
#include <stdio.h>

int main(int argc, char** argv)
{
	key_t key = ftok("/home/nan/test", 1);
	if (-1 == key)
	{
		printf("create key fail.--%d\n", key);
		return -1;
	}
	printf("create key succeed :--%d\n", key);
	int sem_id = semget(key, 1, IPC_CREAT);
	if (-1 == sem_id)
	{
		printf("create sem_id fail.--%d\n", sem_id);
		return -1;
	}
	printf("create sem_id succeed.--%d\n", sem_id);
	printf("sem_num is : %d\n", semctl(sem_id, 0, GETVAL));
	struct sembuf sops = {
	​	.sem_num = 0 ,
		​.sem_op = -1 ,
		​ };
	int ret = semop(sem_id, &sops, 1);
	if (-1 == ret)
	{
		printf("operator sem fail!--%d\n", ret);
		return -1;
	}
	printf("operator semop succeed.--%d\n", ret);

	int fd = open("/home/nan/test/text", O_RDWR | O_APPEND | O_CREAT, 0666);
	if (-1 == fd)
	{
		printf("open text fail . --%d\n", fd);
		return -1;

	}
	write(fd, "3", 2);
	close(fd);
	return 0;
}
```

 



<br>

#### 5.5.5 进程间通信：消息队列

消息队列，提供了一种从一个进程向另一个进程发送一个数据块的方法。

- 每个数据块都被认为含有一个类型，接收进程可以独立地接收含有不同类型的数据结构。【如果纯粹发送数据，为什么不开管道呢？】
- 我们可以通过发送消息来避免命名管道的同步和阻塞问题，如read端因write端而阻塞；而消息<span style="background:#FFFF00;">不会阻塞，实时性较强</span>。
- 但是消息队列与命名管道`FIFO`一样，每个数据块都有一个最大长度的限制；大数据传输需求使用共享内存。
- 消息队列其实就是一个链表。

>  数据传输量大使用共享内存；数据量小单纯收发数据用`FIFO`；又不想阻塞用消息队列；不用消息队列，那就用信号量实现，来取消阻塞。
>

**消息队列API：**

创建和访问一个消息队列

```c++
//return：一个以key命名的消息队列的标识符（非零整数），失败时返回-1
int msgget(key_t key, int msgflg);
//key_t:与其他的IPC机制一样，程序必须提供一个键来命名某个特定的消息队列[ftok()]
//msgflg是一个权限标志，表示消息队列的访问权限，它与文件的访问权限一样。
//msgflg可以与IPC_CREAT做或操作，表示当key所命名的消息队列不存在时创建一个消息队列，如果key所命名的消息队列存在时，IPC_CREAT标志会被忽略，而只返回一个标识符
```

 

把消息添加到消息队列中

```c++
//ret:如果调用成功，消息数据的一分副本将被放到消息队列中，并返回0，失败时返回-1.
int msgsend(int msgid, const void *msg_ptr, size_t msg_sz, int msgflg);
//msgid是由msgget函数返回的消息队列标识符
//msg_ptr是一个指向准备发送消息的指针，但是消息的数据结构却有一定的要求:
//---指针msg_ptr所指向的消息结构 一定要是以一个长整型成员变量开始的结构体
//---接收函数将用这个成员来确定消息的类型。所以消息结构要定义成这样：
struct my_message{ 
    long int message_type; /* The data you wish to transfer*/ 
};
//msg_sz是msg_ptr指向的消息的长度，注意是消息的长度，而不是整个结构体的长度
//---也就是说msg_sz是不包括长整型消息类型成员变量的长度。
//msgflg用于控制当前消息队列满或队列消息到达系统范围的限制时将要发生的事情【一般不用，进行其他替代处理】
```



从一个消息队列获取消息

```c++
//return:失败时返回-1
//调用成功时，该函数返回放到接收缓存区中的字节数，消息被复制到由msg_ptr指向的用户分配的缓存区中
//然后删除消息队列中的对应消息
int msgrcv(int msgid, void *msg_ptr, size_t msg_st, long int msgtype, int msgflg);
//msgid, msg_ptr, msg_st的作用也函数msgsnd函数的一样
//msgtype可以实现一种简单的接收优先级。
//---如果msgtype为0，就获取队列中的第一个消息。
//---如果它的值大于零，将获取具有相同消息类型的第一个信息。
//---如果它小于零，就获取类型等于或小于msgtype的绝对值的第一个消息。
//msgflg用于控制当队列中没有相应类型的消息可以接收时将发生的事情。
```



控制消息队列，它与共享内存的`shmctl`函数相似，它的原型为：

```c++
//ret:成功时返回0，失败时返回-1
int msgctl(int msgid, int command, struct msgid_ds *buf);
//command是将要采取的动作，它可以取3个值，
//---IPC_STAT：把msgid_ds结构中的数据设置为消息队列的当前关联值，即用消息队列的当前关联值覆盖msgid_ds的值。
//---IPC_SET：如果进程有足够的权限，就把消息列队的当前关联值设置为msgid_ds结构中给出的值
//---IPC_RMID：删除消息队列。

//buf是指向msgid_ds结构的指针，它指向消息队列模式和访问权限的结构。msgid_ds结构至少包括以下成员：
struct msgid_ds { 
    uid_t shm_perm.uid; 
    uid_t shm_perm.gid; 
    mode_t shm_perm.mode;
};
```



消息队列示例：

```c++
#include <stdio.h>
#include <unistd.h>//usleep
#include <string.h>

#include <sys/msg.h>//msg
#include <cerrno>


//待共享的内存
typedef struct
{
	int type;
	//char data[1024];//buffer
	struct
	{
		int id;
		char name[64];
		int age;
		char message[256];
	}data;
}MSG, * PMSG;

void lesson92()
{
	pid_t pid = fork();
	if (pid > 0)//父进程
	{
		int msg_id = msgget(ftok(".", 3), IPC_CREAT | 0666);
		//printf("%s(%d):%s %d\n", __FILE__, __LINE__, __FUNCTION__,errno);
		//假如errno=38，表示函数未实现
		if (msg_id == -1)
		{
			printf("%s\n", strerror(errno));
			return;
		}
		MSG msg;
		memset(&msg, 0, sizeof(msg));

		//父进程recieve
		msgrcv(msg_id, &msg, sizeof(msg.data), 0, 0);//获取队列中的第一个消息
		printf("%d name:%s age:%d msg:%s\n", msg.data.id, msg.data.name, msg.data.age, msg.data.message);

		getchar();
		msgctl(msg_id, IPC_RMID, 0);
	}
	else
	{//子进程:发送消息
		int msg_id = msgget(ftok(".", 3), IPC_CREAT | 0666);
		MSG msg;
		memset(&msg, 0, sizeof(msg));
		msg.type = 1;
		msg.data.id = 666;
		msg.data.age = 18;
		//msg.data.name = "chase";
		strcpy(msg.data.name, "chase");
		strcpy(msg.data.message, "Hello World!");

		//send
		msgsnd(msg_id, &msg, sizeof(msg.data), 0);
		msgctl(msg_id, IPC_RMID, 0);
	}
}

int main(int argc, char* argv[])
{
	lesson92();
	return 0;
}
```

<br>

#### 5.5.6 socket通信

socket本质上用于不同网络地址下，两台设备的不同进程间的通信。但二者如果IP地址相同，就变成了IPC，即本机不同进程间的通信。



<br>

<hr style="border-top: 1px dashed #8c8b8b;border-bottom: none;">

## 6 linux系统编程：线程

### 6.1 理解线程

线程是在进程中产生的一个执行单元，是<span style="background:#FFFF00;">CPU</span>调度和分配的最小单元。其在同一个进程中与其他线程并行运行，他们可以共享进程内的资源，比如内存、地址空间、打开的文件等等。

- **线程**是CPU调度和分派的基本单位【CPU对开发人员来说，最大的价值就是寄存器】
- CPU不会区分某个线程属于哪一个进程，即CPU眼里只有线程；进程运行对应运行进程的主线程。
- **进程**是分配资源的基本单位，进程是<span style="background:#FFFF00;">操作系统</span>调度的最小单元【由操作系统控制】

> 进程：正在运行的程序（狭义），是处于执行期的程序以及它所管理的资源【如打开的文件、挂起的信号、进程状态、地址空间等等】的总称。
>
> 从操作系统核心角度来说，进程是操作系统调度除CPU时间片外进行的资源分配和保护的基本单位，它有一个独立的虚拟地址空间，用来容纳进程映像【如与进程关联的程序与数据】，并以进程为单位对各种资源实施保护，如受保护地访问处理器、文件、外部设备及其他进程【进程间通信】 

 那到底如何理解进程和线程呢？        

1.  计算机有很多资源组成，比如CPU、内存、磁盘、鼠标、键盘等，就像一个工厂由电力系统、作业车间、仓库、管理办公室和工人组成。
2. 假定工厂的电力有限，一次只能供给一个或少量几个车间使用。也就是说，一部分车间开工的时候，其他车间都必须停工。【背后的含义就是，单个CPU一次只能运行一个任务，多个CPU能够运行少量任务】

3.  线程就好比车间里的工人。一个进程可以包括多个线程，他们协同完成某一个任务。


![](linux-6-1.png)

**为什么使用多线程？**

1. 避免阻塞：单个进程只有一个主线程，当主线程阻塞的时候，整个进程也就阻塞了，无法再去做其它的一些功能了。【比如之前的单进程服务端，使用for循环5次服务5个客户端，主线程每次都会卡在accept，直到该客户端服务结束；而多线程则不会阻塞】
2. 避免CPU空转：应用程序经常会涉及到RPC【远程进程调用】、数据库访问、磁盘IO等操作，这些操作的速度比CPU慢很多，而在等待这些响应时，CPU却不能去处理新的请求，导致这种单线程的应用程序性能很差；而使用线程，如果线程阻塞则挂起，等待唤醒。
3. 提升效率：一个进程要独立拥有4GB的虚拟地址空间，而多个线程可以共享同一地址空间，线程的切换比进程的切换要快得多。下图展示了线程和进程的内存空间关系【涉及上下文切换】：

![](linux-6-2.png)

 

<br>

### 6.2 线程的创建与运行

> Linux下API，pthread库目前已变成跨平台的库，有其Windows版本。

线程创建`pthread_create`：

> 线程具有单独的执行流，因此需要单独定义线程的`main`函数，还需要请求操作系统在单独的执行流中执行该函数，完成该功能的函数如下：
>

```C++
#include<pthread.h>

//return：成功时返回 0，失败时返回其他值-1
int pthread_create(
    pthread_t* restrict thread, 
    const pthread_attr_t * restrict attr,
    void *(* start_routine)(void *),//函数指针，参数是void指针
    void* restrict arg//不能是局部变量【const常量或new-delete在堆区】
);
//thread:保存新创建线程ID的变量地址值。线程与进程相同，也需要用于区分不同线程的ID
//attr:用于传递线程属性的参数，传递NULL时，创建默认属 性的线程
//start_routine:相当于线程main函数的、在单独执行流中执行的函数地址值（函数指针）【必填】
//arg:通过第三个参数传递调用函数时包含传递参数信息的变量地址值
```

 

线程等待`pthread_join`：

- 调用`pthread_join`函数的进程（或线程）将进入等待状态，直到第一个参数为ID的线程终止为止
- 而且可以得到线程的main函数返回值，所以该函数比较有用。

```c++
#include <pthread.h>

//成功时返回[参数中线程的返回值]，失败时返回其他值
//失败的情况：1、等待线程不存在 2、等待线程早已结束
int pthread_join(pthread_t thread, void ** status);
//thread 该参数值ID的线程终止后才会从该函数返回
//status 保存线程的main函数返回值的指针变量地址值
```

 <br>

示例：

```c++
#include <stdio.h>
#include <pthread.h>

void* threadEntry(void* arg)
{
	char* msg = "I am from thread!";//常量字符串
	for (int i = 0; i < 5; i++)
		printf("%s(%d):%s Thread begin:%s\n", __FILE__, __LINE__, __FUNCTION__, arg);
	return (void*)msg;
}

void lesson94()
{
	pthread_t tid;
	const char* pInfo = "Hello World!";//常量字符串,会被编译进可执行程序中的数据段
	int ret = pthread_create(&tid, NULL, threadEntry, (void*)pInfo);//此处避免使用局部变量【栈】【可能在新线程里反复使用】
	if (ret != -1)//创建成功
	{
		void* result = NULL;
		pthread_join(tid, &result);
		printf("%s(%d):%s From Thread:%s\n", __FILE__, __LINE__, __FUNCTION__, result);
	}

}

int main(int argc, char* argv[])
{
	lesson94();
	return 0;
}
```

注意：

- 可能编译出错，解决办法：附加额外库文件【项目属性 | 链接器 | 输入 | 库依赖项：添加 `pthread`】；如果是命令行编译：需要添加`-lpthread`
- 常量会被编译进可执行文件的数据段【exe可执行文件分为：代码段、数据段、头部，其中头部包含一些资源等】



<br>

### 6.3 线程同步：互斥量

 实例：两个线程实现加减法【直接访问全局变量sum，引入互斥操作】

```c++
#include <stdio.h>
#include <pthread.h>

int num = 0;
void* thread_inc(void* arg)
{
	for (int i = 0; i < 100000; i++)
		num++;
	return NULL;
}
void* thread_dec(void* arg)
{
	for (int i = 0; i < 100000; i++)
		num--;
	return NULL;
}

void lesson95()
{
	pthread_t thread_id[50];
	for (int i = 0; i < 50; i++)
	{
		if (i % 2)
		{
			pthread_create(thread_id+i, NULL, thread_inc,NULL);
		}
		else
		{
			pthread_create(thread_id + i, NULL, thread_dec, NULL);
		}
	}
	for (int i = 0; i < 50; i++)
	{
		pthread_join(thread_id[i], NULL);
	}
	printf("%s(%d):%s From Thread:%d\n", __FILE__, __LINE__, __FUNCTION__, num);
	//结果是一个伪随机数
}

int main(int argc, char* argv[])
{
	lesson95();
	return 0;
}
```

共创建了50个线程，其中一半执行`thread_inc`函数中的代码，另一半则执行`thread_des`函数中的代码。全局变量num经过增减过程后应为0。

但运行结果并不是0，而且每次运行的结果均不同。虽然其原因目前还未知，但可以肯定的是，这对于线程的应用是个大问题。从操作系统层面来解释，变量是存在内存里面，运算是在CPU里面的。如图所示：

 ![](linux-6-3.png)

<br>

**线程同步**用于解决线程访问顺序引发的问题。需要同步的情况可以从如下两方面考虑：

1. 同时访问同一内存空间时发生的情况。
2. 需要指定访问同一内存空间的线程执行顺序的情况。

> "控制（Control）线程执行顺序"的相关内容。假设有A、B两个线程，线程A负责向指定内存空间写入【保存】数据，线程B负责取走该数据。这种情况下，线程A首先应该访问约定的内存空间并保存数据。万一线程B先访问并取走数据，将导致错误结果。像这种需要控制执行顺序的情况也需要使用同步技术。
>

 

**互斥量**是"`Mutual Exclusion`"的简写，表示不允许多个线程同时访问。互斥量主要用于解决线程同步访问的问题。为了理解好互斥量，请观察如下对话过程：

- A∶"请问里面有人吗?"

- B∶"是的，有人。"

- A∶"您好!"

- B∶"请稍等!"


对于上述对话发生的场景。现实世界中的临界区就是洗手间。洗手间无法同时容纳多人【比作线程】，因此可以将临界区比喻为洗手间。而且这里发生的所有事情几乎可以全部套用到临界区同步过程，洗手间使用规则如下：

- 为了保护个人隐私，进洗手间时锁上门，出来时再打开；

- 如果有人使用洗手间，其他人需要在外面等待；

- 等待的人数可能很多，这些人需排队进入洗手间。


这就是洗手间的使用规则。同样，线程中为了保护临界区也需要套用上述规则。洗手间中存在，但之前的线程示例中缺少的是什么呢？就是<span style="background:#FFFF00;">锁机制</span>。线程同步中同样需要锁，就像洗手间示例中使用的那样。互斥量就是一把优秀的锁，接下来介绍<span style="background:#FFFF00;">互斥量的创建及销毁函数</span>。

```c++
#include<pthread.h>

//互斥量的创建和销毁
//成功时返回0，失败时返回其他值
int pthread_mutex_init(pthread mutex_t *mutex, const pthread_mutexattr_t* attr);
int pthread_mutex_destroy(pthread_mutex_t* mutex);
//mutex：创建互斥量时传递保存互斥量的变量地址值，销毁时传递需要销毁的互斥量地址值。
//att：r传递即将创建的互斥量属性，没有特别需要指定的属性时传递NULL。

//上锁：成功时返回0，失败时返回其他值
int pthread_mutex_lock(pthread_mutex_t\* mutex);
//解锁：成功时返回0，失败时返回其他值
int pthread_mutex_unlock(pthread mutex_t\* mutex);

//使用方法：*********************************************
pthread_mutex_lock(&mutex);
//临界区的开始
//..... 
// 临界区的结束
pthreadmutex_unlock(&mutex);
```



使用互斥量改造实例：

```c++
#include <stdio.h>
#include <pthread.h>

int num = 0;
pthread_mutex_t mutex;

void* thread_inc(void* arg)
{
	for (int i = 0; i < 100000; i++)
	{
		pthread_mutex_lock(&mutex);//实时性更好,但mutex竞争处于弱势
		num++;
		pthread_mutex_unlock(&mutex);
		if(i%10000)
			printf("%s(%d):%s From Thread:%d****\n", __FILE__, __LINE__, __FUNCTION__, num);
	}
	return NULL;
}
void* thread_dec(void* arg)
{
	pthread_mutex_lock(&mutex);//推荐此种方式，效率更高
	for (int i = 0; i < 100000; i++)
	{
		num--;
		if (i % 10000)
			printf("%s(%d):%s From Thread:%d\n", __FILE__, __LINE__, __FUNCTION__, num);
	}
		
	pthread_mutex_unlock(&mutex);
	return NULL;
}

void lesson95()
{
	//互斥体
	//pthread_mutex_t mutex;
	pthread_mutex_init(&mutex, NULL);//注意：创建和销毁对应出现


	pthread_t thread_id[50];
	for (int i = 0; i < 50; i++)
	{
		if (i % 2)
		{
			pthread_create(thread_id+i, NULL, thread_inc,NULL);
		}
		else
		{
			pthread_create(thread_id + i, NULL, thread_dec, NULL);
		}
	}
	for (int i = 0; i < 50; i++)
	{
		pthread_join(thread_id[i], NULL);
	}
	printf("%s(%d):%s From Thread:%d\n", __FILE__, __LINE__, __FUNCTION__, num);


	pthread_mutex_destroy(&mutex);
}

int main(int argc, char* argv[])
{
	lesson95();
	return 0;
}
```

注意：

- 互斥量和信号量相似，但不相同。
- 简言之，就是利用`lock`和`unlock`函数围住临界区的两端。此时互斥量相当于一把锁，阻止多个线程同时访问。
- 还有一点需要注意，线程退出临界区时，如果忘了调用`pthread_mutex_unlock` 函数，那么其他为了进入临界区而调用`pthread_mutex_lock`函数的线程就无法摆脱阻塞状态【死锁状态】



<br>

### 6.4 线程同步：信号量

信号量与互斥量极为相似，在互斥量的基础上很容易理解信号量。

-  信号量有一个初始Value，互斥量也有，但`Value=1`。信号量的值代表目前的资源数量，有人wait【P操作】，如果value>0，那就减1，否则等待。使用完资源释放`value+1`【V操作】。
- 也就是说，`wait/post`【P/V】不一定成对出现。
- 初始`Value=1`的信号量，可以理解为与互斥量等价，但信号量依然可以使用`wait/post`修改`Value`。

信号量创建及销毁方法如下：

```c++
#include <semaphore.h>

//成功时返回0，失败时返回其他值
int sem_init(sem_t* sem, int pshared, unsigned int value);
//成功时返回0，失败时返回其他值
int sem_destroy(sem_t* sem);
//Sem：创建信号量时传递保存信号量的变量地址值，销毁时传递需要销毁的信号量变量地址值。
//pshared ：传递其他值时，创建可由多个进程共享的信号量;传递0时，创建只允许1个进程内部使用的信号量。
//我们需要完成同一进程内的线程同步，所以传递0。【早期Linux版本未实现进程间共享】【默认0】
//Value：指定新创建的信号量初始值。
```

 接下来介绍：信号量中相当于互斥量`lock`、`unlock`的函数：

```c++
#include<semaphore.h>

//成功时返回0，失败时返回其他值
int sem_post(sem_t* sem);//【post释放，即V操作】
//成功时返回0，失败时返回其他值
int sem_wait(sem_t* sem);//【wait占用，即P操作】【value<=0时阻塞】
//Sem: 传递保存信号量读取值的变量地址值
//传递给sem_post时信号量增1
//传递给sem_wait时信号量减1
```

 调用`sem_init`函数时，操作系统将创建信号量对象，此对象中记录着"信号量值"整数。该值在调用`sem_post`函数时增1，调用`sem_wait`函数时减1。但信号量的值不能小于0，因此，在信号量为0的情况下调用`sem_wait`函数时，调用函数的线程将进入阻塞状态【因为函数未返回】。

当然，此时如果有其他线程调用`sem_post`函数，信号量的值将变为1，而原本阻塞的线程可以将该信号量重新减为0并跳出阻塞状态。实际上就是通过这种特性完成临界区的同步操作，可以通过如下形式同步临界区【假设信号量的初始值为1】。

```c++
sem_wait(&sem);//信号量变为0...
// 临界区的开始
//...... 
//临界区的结束
sem_post(&sem);// 信号量变为1...
```

 上面的代码结构中，调用`sem_wait`函数进入临界区的线程在调用`sem_post`函数前不允许其他线程进入临界区。

信号量的值在0和1之间跳转，因此，具有这种特性的机制称为"**二进制信号量**"。

<br>

**实例程序**：

- 线程A从用户输入得到值后存入全局变量num**，**此时线程B将取走该值并累加。该过程共进行5次，完成后输出总和并退出程序。
- 线程A、线程B按顺序访问变量num，且需要线程同步。

```c++
#include <stdio.h>
#include <pthread.h>
#include <semaphore.h>
#include <string.h>

sem_t sem1;//是否完成输入
sem_t sem2;//是否完成计算
int num = 0;

void* thread_input(void* arg)
{
	//int count = (int)arg;//提示丢失精度
	//int count = reinterpret_cast<int>(arg);//强制类型转换//x64可能不接受
	int count = 0;
	//注意此处arg有&，本质是取该值，而不是该值对应地址处的值
	memcpy(&count, &arg, sizeof(int));//前提：该系统存储为小顶端：即低位在前，高位在后
	//memcpy(&count, 4+(char*)&arg, sizeof(int));//大顶端
	for (int i = 0; i < count; i++)
	{
		printf("Input num:");
		//sem_wait(&sem2);
		scanf("%d", &num);
		sem_post(&sem1);
	}
	return NULL;
}

//子线程输入，主线程读
void lesson96()
{
	int sum = 0;
	int count = 5;

	//创建信号量【初始化在创建线程前】
	sem_init(&sem1, 0, 0);
	sem_init(&sem2, 0, 1);

	pthread_t tid;
	pthread_create(&tid, NULL, thread_input, reinterpret_cast<void*>(count));//传值可以，但不要传局部变量地址

	for (int i = 0; i < 5; i++)
	{
		sem_wait(&sem1);
		sum += num;
		//sem_post(&sem2);
	}
	
	sem_destroy(&sem1);
	sem_destroy(&sem2);

	printf("%s(%d):%s From Thread:%d\n", __FILE__, __LINE__, __FUNCTION__, sum);
}

int main(int argc, char* argv[])
{
	lesson96();
	return 0;
}
```

注意：

- 利用输入进程的特性【慢】，通过取消信号量`sem2`来优化程序

 

<br>

### 6.5 线程的销毁

Linux线程并不是在首次调用的线程main函数返回时自动销毁，所以用如下两种方法之一加以明确，否则由线程创建的内存空间将一直存在。

- 调用`pthread_join`函数。
- 调用`pthread_detach`函数。

之前调用过`pthread_join`函数。调用该函数时，不仅会等待线程终止，还会引导线程销毁。

但该函数的问题是，在线程终止前，调用该函数的线程将进入阻塞状态。因此，通常通过如下`pthread_detach`函数调用引导线程销毁。

```c++
#include <pthread.h>

//成功时返回，失败时返回其他值
int pthread_detach(pthread_t thread);
//thread: 终止的同时需要销毁的线程ID
```

- 调用 `pthread_detach`函数不会引起线程终止或进入阻塞状态，可以通过该函数引导销毁线程创建的内存空间。
- 调用该函数后不能再针对相应线程调用`pthread_join`函数，这需要格外注意。
- 虽然还有方法在创建线程时可以指定销毁时机，但与`pthread_detach`方式相比，结果上没有太大差异

```c++
//此外可以通过线程函数来进行自动销毁,无需外部的操作【即由线程自身引导销毁】
pthread_detach(pthread_self());//pthread_self()只能在线程内调用
//...
pthread_exit(0) ;
```

 修改上一节的实例：

```c++
void* thread_input(void* arg)
{
	pthread_detach(pthread_self());//******************

	int count = 0;
	memcpy(&count, &arg, sizeof(int));
	for (int i = 0; i < count; i++)
	{
		printf("Input num:");
		//sem_wait(&sem2);
		scanf("%d", &num);
		sem_post(&sem1);
	}
	//return NULL;
	pthread_exit(NULL);//*****************************
}
```





<br>

### 6.6 实战案例：多线程并发服务器的实现

网络编程+多线程+线程同步实现的聊天服务器【群聊】+客户端

> 服务器一对多 | 客户端一对一 【CS】
>
> 之前的多进程并发服务器是每次fork一个进程，主进程返回继续accept，这样的开销还是有点大。

```C++
#include <stdio.h>
#include <string.h>
#include <errno.h>//errno

#include <unistd.h>//close
#include <sys/socket.h>
#include <sys/types.h>
#include <arpa/inet.h>//sockaddr_in

#include <pthread.h>
#include <semaphore.h>


int clnt_socks[100] = { 0 };//初始化【】
int clnt_count = 0;//客户端数量
pthread_mutex_t mutex;

void send_msg(const char* msg, ssize_t str_len)
{
	pthread_mutex_lock(&mutex);
	for (int i = 0; i < clnt_count; i++)
	{
		//pthread_mutex_lock(&mutex);
		if (clnt_socks[i] >= 0)//避免有的客户端提前退出
			write(clnt_socks[i], msg, str_len);
		//pthread_mutex_unlock(&mutex);
	}
	pthread_mutex_unlock(&mutex);
}

void* thread_handle_clnt(void* arg)
{
	pthread_detach(pthread_self());

	//子线程处理客户端
	int client_sock = *(int*)arg;
	char message[1024] = "";
	ssize_t str_len = 0;

	while ((str_len = read(client_sock, message, sizeof(message))) > 0)
	{
		//收到客户端消息后，转发到其他用户
		send_msg(message, str_len);
	}

	//转发后关闭该客户端套接字
	pthread_mutex_lock(&mutex);
	//for (int i = 0; i < clnt_count; i++)//TODO:可优化逻辑
	//{
	//	if (clnt_socks[i] == client_sock)
	//	{
	//		//注意，此处close与write需要互斥
	//		//pthread_mutex_lock(&mutex);
	//		clnt_socks[i] = -1;//优先，避免send_msg中写失败
	//		//pthread_mutex_unlock(&mutex);
	//		break;
	//	}
	//}
	*(int*)arg = -1;
	pthread_mutex_unlock(&mutex);

	close(client_sock);
	pthread_exit(NULL);
}

void server98()
{
	int serv_sock, client_sock;
	struct sockaddr_in serv_addr, clnt_addr;
	socklen_t clnt_adr_sz = sizeof(clnt_addr);
	pthread_mutex_init(&mutex, NULL);

	serv_sock = socket(PF_INET, SOCK_STREAM, 0);//TCP
	memset(&serv_addr, 0, sizeof(serv_addr));
	serv_addr.sin_family = AF_INET;
	serv_addr.sin_addr.s_addr = htonl(INADDR_ANY);
	serv_addr.sin_port = htons(9527);

	if (bind(serv_sock, (sockaddr*)&serv_addr, sizeof(serv_addr)) == -1)
	{
		printf("bind error %d %s", errno, strerror(errno));
		return;
	}
	if (listen(serv_sock, 5) == -1)
	{
		printf("listen error %d %s", errno, strerror(errno));
		return;
	}
	//for(::){}//等价
	while (1)
	{
		client_sock = accept(serv_sock, (sockaddr*)&clnt_addr, &clnt_adr_sz);
		if (client_sock == -1)
		{
			printf("accept error %d %s", errno, strerror(errno));
			break;
		}
		//交给线程处理
		pthread_mutex_lock(&mutex);
		clnt_socks[clnt_count++] = client_sock;
		pthread_mutex_unlock(&mutex);
		pthread_t tid;
		pthread_create(&tid, NULL, thread_handle_clnt, clnt_socks + clnt_count - 1);//参数传递客户端socket
	}
	close(serv_sock);
	pthread_mutex_destroy(&mutex);
}



sem_t semid;
char name[64] = "[DEFAULT]";
void* thread_clnt_send_msg(void* arg)
{
	pthread_detach(pthread_self());

	//客户端子线程发送消息
	int client_sock = *(int*)arg;
	char message[256] = "";
	char buffer[1024];
	while (true)
	{
		memset(buffer, 0, sizeof(buffer));
		fgets(message, sizeof(message), stdin);
		if ((strcmp(message, "q\n") == 0) || (strcmp(message, "Q\n") == 0))
			break;
		//更安全的printf:用后面的参数填充第一个参数
		snprintf(buffer, sizeof(buffer), "[%s]: %s", name, message);
		write(client_sock, buffer, strlen(buffer));
	}
	//close(client_sock);//在主进程中close
	sem_post(&semid);
	pthread_exit(NULL);
}

void* thread_clnt_recv_msg(void* arg)
{
	pthread_detach(pthread_self());

	//客户端子线程接受消息
	int client_sock = *(int*)arg;
	char message[256] = "";

	while (true)
	{
		memset(message, 0, sizeof(message));
		ssize_t str_len = read(client_sock, message, sizeof(message));
		if (str_len <= 0)
			break;
		else
			//TODO:敏感词过滤****************
			fputs(message, stdout);
	}
	sem_post(&semid);
	pthread_exit(NULL);
}


void client()
{
	int clnt_sock = socket(PF_INET, SOCK_STREAM, 0);
	struct sockaddr_in serv_addr;
	memset(&serv_addr, 0, sizeof(serv_addr));
	serv_addr.sin_family = AF_INET;
	serv_addr.sin_addr.s_addr = inet_addr("127.0.0.1");
	serv_addr.sin_port = htons(9527);

	fputs("input your name:", stdout);
	scanf("%s", &name);

	if (connect(clnt_sock, (sockaddr*)&serv_addr, sizeof(serv_addr)) == -1)
	{
		printf("connect error %d %s", errno, strerror(errno));
		return;
	}
	//使用线程执行客户端操作
	pthread_t tid_snd, tid_rev;
	//此处的传递的参数为局部变量，要么用全局变量，要么保证其寿命比线程长[信号量]
	sem_init(&semid, 0, -1);

	pthread_create(&tid_snd, NULL, thread_clnt_send_msg, (void*)&clnt_sock);
	pthread_create(&tid_rev, NULL, thread_clnt_recv_msg, (void*)&clnt_sock);
	sem_wait(&semid);//阻塞等待两个线程结束
	close(clnt_sock);
}

void lesson98(const char* arg)
{
	if (strcmp(arg, "s") == 0)
	{
		server98();
	}
	else
	{
		client();
	}

	printf("%s(%d):%s From Thread\n", __FILE__, __LINE__, __FUNCTION__);
}

int main(int argc, char* argv[])
{
	lesson98(argv[1]);
	return 0;
}
```

注意：

- 两处需要互斥量【基本上，线程操作全局变量，都要使用互斥量】
  - `clnt_count`被修改时，需要互斥量
  - `clnt_socks[i]`被修改时，需要互斥量
- 用到的输入输入函数：`fputs`/`snprintf`/`printf` | `fgets`/`fgetc`
- 服务端和客户端执行都需要有参数，服务端为`./Linux_consoleApplication.out s`



<br>

<hr style="border-top: 1px dashed #8c8b8b;border-bottom: none;">

## 7 I/O复用

### 7.1 Select模型以及实战案例

> `Select`和`Epoll`都是IO复用的技术，其中`Select`更简单；但两者都比多进程和多线程复杂

复用的概念：是为了提高物理设备的效率，用**最少的物理要素**传递**最多数据**时使用的技术。

> 如下图所示，左图结构代表多进程多线程的模式，右图则是IO复用。

![](linux-7-1.png)

多进程服务器的缺点：

- 需要大量重复的运算
- 大量的内存空间【创建进程或线程、切换，如果内存不足就无法挂起切换】【不可能支持创建百万级别的线程】

<br>

**复用技术在服务端的应用：一个线程服务所有客户端。**

 ![](linux-7-2.png)

> 最开始的回声服务器，就是单进程单线程服务器，但会阻塞在`accept`；现在改为不再accept，而是等有客户端发起连接请求时，再通知本进程处理客户端请求。之后，本线程不断去轮询已连接的客户端。

 <br>

**理解select函数并实现服务端：**可参考【[Select剖析](https://blog.csdn.net/chen_ever/article/details/137544607)】

`select`函数是IO多路复用的函数，它主要的功能是用来等文件描述符中的事件是否就绪，`select`可以使我们在同时等待多个文件缓冲区 ，减少IO等待的时间，能够提高进程的IO效率。

`select()`函数允许程序监视多个文件描述符，等待所监视的一个或者多个文件描述符变为“准备好”的状态。所谓的”准备好“状态是指：文件描述符不再是阻塞状态，可以用于某类IO操作了，包括可读，可写，发生异常三种。

1. 是否存在套接字接收数据？【服务端存在一个socket接收数据】
2. 无需阻塞传输数据的套接字有哪些？【轮询】
3. 哪些套接字发生了异常？【轮询】

<br>

![](linux-7-3.png)

`Select`模型具体步骤：如上图

1、设置文件描述符：`select`函数监视多个文件描述符【不超过1024个，因为本质是轮询，故监视过多会导致轮询时间太长】【`Epoll`没有数量限制】 【`fd_set`结构体如上图】

```c++
fd_set reads;

//接口函数
FD_ZERO(fd_set *fdset);//将fdset变量的所有位初始化为0
FD_SET(int fd，fd_set* fdset);//在参数dset指向的变量中注册文件描述符fd的信息。
FD_CLR(int fd，fd_set* fdset);//从参数fdset指向的变量中清除文件描述符fd的信息
FD_ISSET(int fd，fd_set* fdset);//若参数fdset指向的变量中包含文件描述符fd的信息，则返回"真"
```

>  注意：
>
> - `fd_set`类型本质是一个位图，位图的位置表示相对应的文件描述符，内容表示该文件描述符是否有效。1代表该位置的文件描述符有效，0则表示该位置的文件描述符无效。
> - 如果将文件描述符`2，3`设置位图当中，则位图表示的是为1100或0011？
> - fd_set的上限是1024个文件描述符。

2、`Select`函数：等待文件描述符中的事件是否就绪，可以使我们在同时等待多个文件缓冲区 ，减少IO等待的时间，能够提高进程的IO效率。

```c++
#include<sys/select.h>
#include <sys/time.h>

//成功时返回大于0的值，失败时返回-1
int select(int maxfd, fd_set* readset, fd_set* writeset, fd_set* exceptset, const struct timeval* timeout); 
//maxtfd/ndfs ：监视对象文件描述符数量
//即等待的文件描述符的最大值+1，例如：应用进程想要去等待文件描述符3,5,8的事件，则
//nfds=max(3,5,8)+1;

//readset：用于检查可读性，即等待读事件的文件描述符集合。如果不关心读事件传NULL
//writeset：等待写事件(缓冲区中是否有空间)的集合，同上
//exceptset:如果内核等待相应的文件描述符发生异常，则将失败的文件描述符设置进exceptfds中。同上
//timeout：一个指向timeval结构的[指针]，用于决定select等待I/O的最长时间。如果为空将一直等待
struct timeval {
    long tv_sec;         /* seconds */
    long tv_usec;        /* microseconds */
};
```

 注意：

- 内核需要从`readfds`和`writefds`知道哪些文件描述符需要等待，应用进程需要从`readfds`和`writefds`中知道哪些文件描述符的事件就绪
- 优势：单线程并发；缺点：并发量有限制，受限于`fd_set`的长度



![](linux-7-4.png)



`Select`实现I/O复用服务端：

```c++
#include <stdio.h>
#include <string.h>
#include <errno.h>//errno

#include <unistd.h>//close
#include <sys/socket.h>
#include <sys/types.h>
#include <arpa/inet.h>//sockaddr_in

#include <sys/select.h>
#include <sys/times.h>


void server101()
{
	int serv_sock, client_sock;
	struct sockaddr_in serv_addr, clnt_addr;
	socklen_t clnt_adr_sz = sizeof(clnt_addr);

	serv_sock = socket(PF_INET, SOCK_STREAM, 0);//TCP
	memset(&serv_addr, 0, sizeof(serv_addr));
	serv_addr.sin_family = AF_INET;
	serv_addr.sin_addr.s_addr = htonl(INADDR_ANY);
	serv_addr.sin_port = htons(9527);

	if (bind(serv_sock, (sockaddr*)&serv_addr, sizeof(serv_addr)) == -1)
	{
		printf("bind error %d %s", errno, strerror(errno));
		close(serv_sock);
		return;
	}
	if (listen(serv_sock, 5) == -1)
	{
		printf("listen error %d %s", errno, strerror(errno));
		close(serv_sock);
		return;
	}
	// select：不采用accept
	fd_set reads, copy_reads;//等待读事件的文件描述符集合
	FD_ZERO(&reads);
	FD_SET(serv_sock, &reads);//让内核去监控serv_sock上的读操作
	timeval timeout = { 2,500000 };//2.5s[秒，微秒]
	int max_sock = serv_sock;

	while (true)
	{
		copy_reads = reads;
		//nfds为最大的文件描述符+1【select相当于主动问，有无连接】
		int fd_num = select(max_sock + 1, &copy_reads, NULL, NULL, &timeout);//最大超时timeout=2.5s
		if (fd_num <= -1)
		{
			printf("select error %d %s", errno, strerror(errno));
			close(serv_sock);
			return;
		}
		if (fd_num == 0)continue;//没有事件发生
		//开始查找事件
		for (int i = 0; i < max_sock + 1; i++)//此处循环也是为什么nfds=最大文件描述符+1的原因
		{
			//若参数fdset指向的变量【reads】中包含文件描述符fd【i】的信息，则返回"真"
			if (FD_ISSET(i, &copy_reads))//如果该文件描述符i发生读操作
			{
				if (i == serv_sock)//服务端，即从未连接过的客户端向客户端发起连接请求
				{
					client_sock = accept(serv_sock, (sockaddr*)&clnt_addr, &clnt_adr_sz);
					FD_SET(client_sock, &reads);//对client_sock也进行监听
					if (client_sock > max_sock)
						max_sock = client_sock;
					printf("client is connected: %d\n",client_sock);
				}
				else//已连接的客户端
				{
					char buffer[256] = "";
					ssize_t strlength = read(i, buffer, sizeof(buffer));
					if (strlength == 0)//客户端结束
					{
						FD_CLR(i, &reads);
						close(i);
						printf("client is deconnected: %d\n", i);
					}
					else//简单的回声服务器
					{
						write(i, buffer, strlength);
					}
					
				}
			}
		}
	}
	close(serv_sock);
}


void client101()
{
	int clnt_sock = socket(PF_INET, SOCK_STREAM, 0);
	struct sockaddr_in serv_addr;
	memset(&serv_addr, 0, sizeof(serv_addr));
	serv_addr.sin_family = AF_INET;
	serv_addr.sin_addr.s_addr = inet_addr("127.0.0.1");
	serv_addr.sin_port = htons(9527);

	if (connect(clnt_sock, (sockaddr*)&serv_addr, sizeof(serv_addr)) == -1)
	{
		printf("connect error %d %s", errno, strerror(errno));
		close(clnt_sock);
		return;
	}

	char message[256] = "";
	while (true)
	{
		printf("Input message:(Q to quit)");
		fgets(message,sizeof(message),stdin);
		if ((strcmp(message, "q\n") == 0) || (strcmp(message, "q\n") == 0))
			break;

		write(clnt_sock, message, strlen(message));
		memset(message, 0, sizeof(message));
		read(clnt_sock, message, sizeof(message));
		printf("From server:%s", message);
	}
	close(clnt_sock);
}

void lesson101(const char* arg)
{
	if (strcmp(arg, "s") == 0)
	{
		server101();
	}
	else
	{
		client101();
	}

	printf("%s(%d):%s OVER!\n", __FILE__, __LINE__, __FUNCTION__);
}

int main(int argc, char* argv[])
{
	lesson101(argv[1]);
	return 0;
}
```



<br>

### 7.2 Epoll模型

Select模型的缺点：

- 调用select函数后，常见的针对所有文件描述符的循环语句【查询是哪一个文件描述符有事件】【可优化为直接报告是哪些文件描述符】
- 每次调用select函数时，都需要向该函数传递监视对象信息
- `fd_set`有1024的限制

> 调用select 函数后，并不是把发生变化的文件描述符单独集中到一起，而是通过观察作为监视对象的`fd_set`变量的变化，找出发生变化的文件描述符，因此无法避免针对所有监视对象的循环语句。
>
> 而且，作为监视对象的`fd_set`变量会发生变化，所以调用select函数前应复制并保存原有信息，并在每次调用select函数时传递新的监视对象信息。

那到底哪些因素是提高性能的更大障碍？是调用select函数后常见的针对所有文件描述符对象的循环语句？还是每次需要传递的监视对象信息?

只看代码的话很容易认为是循环。<span style="background:#FFFF00;">但相比于循环语句，更大的障碍是每次传递监视对象信息。</span>因为传递监视对象信息具有如下含义∶"**每次调用select函数时向操作系统传递监视对象信息。**"

<span style="background:#FFFF00;">应用程序向操作系统传递数据将对程序造成很大负担，而且无法通过优化代码解决，因此将成为性能上的致命弱点。</span>

🔺"那为何需要把监视对象信息传递给操作系统呢?"

有些函数不需要操作系统的帮助就能完成功能，而有些则必须借助于操作系统。假设各位定义了四则运算相关函数，此时无需操作系统的帮助。但select函数与文件描述符有关，更准确地说，是监视套接字变化的函数。而套接字是由操作系统管理的，所以select函数绝对需要借助于操作系统才能完成功能。【<span style="background:#13dddd;">对应了两次内核态与用户态的切换</span>】

🔺select函数的这一缺点可以通过这种方式弥补∶

"向操作系统传递`1`次监视对象，监视范围或内容发生变化由内核只通知发生变化的事项。"【每次返回一个双向链表来表示发生变化的套接字】

这样就无需每次调用select函数时都向操作系统传递监视对象信息，但前提是操作系统支持这种处理方式（每种操作系统支持的程度和方式存在差异）。

> Linux的支持方式是`epoll`，Windows 的支持方式是`IOCP`。

 <br>

<span style="background:#FFFF00;">Epoll的三大函数：</span> `epoll_create`、`epoll_wait`、 `epoll_ctl`

```c++
//epoll_create
#include<sys/epoll.h>

//成功时返回epoll文件描述符，失败时返回-1
int epoll_create(int size);
//size：epoll实例的大小。

//该函数从2.3.2版本的开始加入的，2.6版开始引入内核
//Linux最新的内核稳定版本已经到了5.8.14，长期支持版本到了5.4.70
//从2.6.8内核开始的Linux，【会忽略这个参数，但是必须要大于0】
//这个是Linux内核独有的函数

 
//epoll_ctl
#include<sys/epoll.h>

//成功时返回0，失败时返回-1
int epoll_ctl(int epfd, int op, int fd, struct epoll_event* event);
//epfd 用于注册监视对象的epoll例程的文件描述符。
//fd 需要注册的监视对象文件描述符
//op 用于指定监视对象的添加、删除或更改等操作。
//===EPOLL_CTL_ADD   EPOLL_CTL_MOD   EPOLL_CTL_DEL======
//event 监视对象的事件类型
//===EPOLLIN∶需要读取数据的情况。【默认条件触发】
//===EPOLLOUT∶输出缓冲为空，可以立即发送数据的情况【比如要发100字节数据，send返回50，那就需要再调send去填满缓冲区发送】
//===EPOLLPRI∶收到OOB数据的情况。【优先级】
//===EPOLLRDHUP∶断开连接或半关闭【一端关闭，一端认为还存在连接】的情况，这在边缘触发方式下非常有用。
//===EPOLLERR∶发生错误的情况。
//===EPOLLET∶以边缘触发的方式得到事件通知。
//===EPOLLONESHOT∶发生一次事件后，相应文件描述符不再收到事件通知。因此需要向epoll_ctl函数的第二个参数传递
//===EPOLLCTL_MOD，再次设置事件。

 

//epoll_wait：
#include <sys/epoll.h>

//成功时返回发生事件的文件描述符数，失败时返回-1
int epoll_wait(int epfd, struct epoll_event* events,int maxevents,int timeout);
//epfd 表示事件发生监视范围的epol例程的文件描述符
//events 保存发生事件的文件描述符集合的结构体地址值。
//maxevents 第二个参数中可以保存的最大事件数目。
//Timeout：以1/1000秒为单位的等待时间，传递-1时，一直等待直到发生事件。【ms】
```

>  虽然，select在网络方面用存在很大问题，但由于其timeout的高精度，故常用来做高精度定时器。



<br>

### 7.3 Epoll实战案例

```c++         
#include <stdio.h>
#include <string.h>
#include <errno.h>//errno

#include <unistd.h>//close
#include <sys/socket.h>
#include <sys/types.h>
#include <arpa/inet.h>//sockaddr_in

#include <sys/epoll.h>


void server102()
{
	int serv_sock, client_sock;
	struct sockaddr_in serv_addr, clnt_addr;
	socklen_t clnt_adr_sz = sizeof(clnt_addr);

	serv_sock = socket(PF_INET, SOCK_STREAM, 0);//TCP
	memset(&serv_addr, 0, sizeof(serv_addr));
	serv_addr.sin_family = AF_INET;
	serv_addr.sin_addr.s_addr = htonl(INADDR_ANY);
	serv_addr.sin_port = htons(9527);

	if (bind(serv_sock, (sockaddr*)&serv_addr, sizeof(serv_addr)) == -1)
	{
		printf("bind error %d %s", errno, strerror(errno));
		close(serv_sock);
		return;
	}
	if (listen(serv_sock, 5) == -1)
	{
		printf("listen error %d %s", errno, strerror(errno));
		close(serv_sock);
		return;
	}

	//Epoll
	int epfd, event_cnt;//Epoll文件描述符，事件数量标记
	char buffer[1024] = "";
	if ((epfd = epoll_create(1)) == -1)//必须>0
	{
		printf("Epoll error %d %s", errno, strerror(errno));
		close(serv_sock);
		return;
	}
	epoll_event event;//事件
	epoll_event* all_event = new epoll_event[100]; //创建100个空闲事件

	event.events = EPOLLIN;//条件触发：有数据输入
	event.data.fd = serv_sock;
	epoll_ctl(epfd, EPOLL_CTL_ADD, serv_sock, &event);//开启监听
	while (true)
	{
		event_cnt = epoll_wait(epfd, all_event, 100, 1000);//timeout=-1表示无限等待
		if (event_cnt == -1)
		{
			printf("Epoll error %d %s", errno, strerror(errno));
			break;
		}
		if (event_cnt == 0)continue;
		//>0
		for (int i = 0; i < event_cnt; i++)
		{
			if (all_event[i].data.fd == serv_sock)
			{//必定是有client申请接入
				client_sock = accept(serv_sock, (sockaddr*)&clnt_addr, &clnt_adr_sz);
				event.events = EPOLLIN;
				event.data.fd = client_sock;
				epoll_ctl(epfd, EPOLL_CTL_ADD, client_sock, &event);
				printf("client is connected!%d\n", client_sock);
			}
			else
			{//必定是客户端
				memset(buffer, 0, sizeof(buffer));
				ssize_t str_len = read(all_event[i].data.fd, buffer, sizeof(buffer));
				if (str_len <= 0)
				{
					epoll_ctl(epfd, EPOLL_CTL_DEL, all_event[i].data.fd, NULL);
					close(all_event[i].data.fd);
					printf("client is closed!%d\n", client_sock);
				}
				else
				{
					write(all_event[i].data.fd, buffer, str_len);
				}
			}
		}

	}

	delete[] all_event;
	close(serv_sock);
	close(epfd);
}


void client102()
{
	int clnt_sock = socket(PF_INET, SOCK_STREAM, 0);
	struct sockaddr_in serv_addr;
	memset(&serv_addr, 0, sizeof(serv_addr));
	serv_addr.sin_family = AF_INET;
	serv_addr.sin_addr.s_addr = inet_addr("127.0.0.1");
	serv_addr.sin_port = htons(9527);

	if (connect(clnt_sock, (sockaddr*)&serv_addr, sizeof(serv_addr)) == -1)
	{
		printf("connect error %d %s", errno, strerror(errno));
		close(clnt_sock);
		return;
	}

	char message[256] = "";
	while (true)
	{
		printf("Input message:(Q to quit)");
		fgets(message, sizeof(message), stdin);
		if ((strcmp(message, "q\n") == 0) || (strcmp(message, "q\n") == 0))
			break;

		write(clnt_sock, message, strlen(message));
		memset(message, 0, sizeof(message));
		read(clnt_sock, message, sizeof(message));
		printf("From server:%s", message);
	}
	close(clnt_sock);
}

void lesson102(const char* arg)
{
	if (strcmp(arg, "s") == 0)
	{
		server102();
	}
	else
	{
		client102();
	}

	printf("%s(%d):%s OVER!\n", __FILE__, __LINE__, __FUNCTION__);
}

int main(int argc, char* argv[])
{
	lesson102(argv[1]);
	return 0;
}
```



<br>

### 7.4 边缘触发和条件触发

- 条件触发【`level-triggered`，也被称为水平触发`LT`】: 只要满足条件，就触发一个事件【只要有数据没有被获取，内核就不断通知你】

- 边缘触发【`edge-triggered`，`ET`】：每当状态变化时，触发一个事件

> 举个读`socket`的例子，假定经过长时间的沉默后，现在来了100个字节，这时无论边缘触发和条件触发都会产生一个通知应用程序可读。应用程序读了50个字节，然后重新调用`api`等待IO事件。
>
> 这时，水平触发的API会因为还有50个字节可读，从而立即返回用户一个`read ready notification`。
>
> 而边缘触发的API会因为可读这个状态没有发生变化而陷入长期等待。 

因此，需要注意的是：

- 在使用边缘触发的API时，要注意每次都要读到`socket`返回`EWOULDBLOCK`为止，否则这个socket就算废了；
- 而使用条件触发的API 时，如果应用程序不需要写就不要关注socket可写的事件，否则就会无限次的立即返回一个`write ready notification`。【写事件适合边缘触发，可写是默认状态，不可写才会触发事件】

> `select`属于典型的条件触发

**条件触发案例：**

- 修改缓冲区为5B
- 修改为边缘触发

```c++
#include <stdio.h>
#include <string.h>
#include <errno.h>//errno

#include <unistd.h>//close
#include <sys/socket.h>
#include <sys/types.h>
#include <arpa/inet.h>//sockaddr_in

#include <sys/epoll.h>
#include <fcntl.h>


void server102()
{
	int serv_sock, client_sock;
	struct sockaddr_in serv_addr, clnt_addr;
	socklen_t clnt_adr_sz = sizeof(clnt_addr);

	serv_sock = socket(PF_INET, SOCK_STREAM, 0);//TCP
	memset(&serv_addr, 0, sizeof(serv_addr));
	serv_addr.sin_family = AF_INET;
	serv_addr.sin_addr.s_addr = htonl(INADDR_ANY);
	serv_addr.sin_port = htons(9527);

	if (bind(serv_sock, (sockaddr*)&serv_addr, sizeof(serv_addr)) == -1)
	{
		printf("bind error %d %s", errno, strerror(errno));
		close(serv_sock);
		return;
	}
	if (listen(serv_sock, 5) == -1)
	{
		printf("listen error %d %s", errno, strerror(errno));
		close(serv_sock);
		return;
	}

	//Epoll
	int epfd, event_cnt;//Epoll文件描述符，事件数量标记
	char buffer[5] = "";
	if ((epfd = epoll_create(1)) == -1)//必须>0
	{
		printf("Epoll error %d %s", errno, strerror(errno));
		close(serv_sock);
		return;
	}
	epoll_event event;//事件
	epoll_event* all_event = new epoll_event[100]; //创建100个空闲事件

	event.events = EPOLLIN;//条件触发：有数据输入
	event.data.fd = serv_sock;
	epoll_ctl(epfd, EPOLL_CTL_ADD, serv_sock, &event);//开启监听
	while (true)
	{
		event_cnt = epoll_wait(epfd, all_event, 100, 1000);
		if (event_cnt == -1)
		{
			printf("Epoll error %d %s", errno, strerror(errno));
			break;
		}
		if (event_cnt == 0)continue;
		//>0
		for (int i = 0; i < event_cnt; i++)
		{
			if (all_event[i].data.fd == serv_sock)
			{//必定是有client申请接入
				client_sock = accept(serv_sock, (sockaddr*)&clnt_addr, &clnt_adr_sz);
				event.events = EPOLLIN | EPOLLET;//边缘触发
				event.data.fd = client_sock;

				//修改为非阻塞********************
				int flag = fcntl(client_sock, F_GETFL, 0);//获取文件标志位
				fcntl(client_sock, F_SETFL, flag | O_NONBLOCK);
				//********************************

				epoll_ctl(epfd, EPOLL_CTL_ADD, client_sock, &event);
				printf("client is connected!%d\n", client_sock);
			}
			else
			{
				
				while (true)//一直读，读到出错为止
				{
					memset(buffer, 0, sizeof(buffer));
					ssize_t str_len = read(all_event[i].data.fd, buffer, sizeof(buffer));
					if (str_len < 0)
					{
						if (errno == EAGAIN)
							break;
						printf("Epoll error %d %s", errno, strerror(errno));
						close(all_event[i].data.fd);
						break;
					}
					else if (str_len == 0)//此时客户端关闭
					{
						epoll_ctl(epfd, EPOLL_CTL_DEL, all_event[i].data.fd, NULL);
						close(all_event[i].data.fd);
						printf("client is closed!%d\n", client_sock);
						break;
					}
					else
					{
						printf("%s(%d):%s message \n", __FILE__, __LINE__, __FUNCTION__);//5B读写一次
						write(all_event[i].data.fd, buffer, str_len);
					}
				}
				
			}
		}
	}
	delete[] all_event;
	close(serv_sock);
	close(epfd);
}


void client102()
{
	int clnt_sock = socket(PF_INET, SOCK_STREAM, 0);
	struct sockaddr_in serv_addr;
	memset(&serv_addr, 0, sizeof(serv_addr));
	serv_addr.sin_family = AF_INET;
	serv_addr.sin_addr.s_addr = inet_addr("127.0.0.1");
	serv_addr.sin_port = htons(9527);

	if (connect(clnt_sock, (sockaddr*)&serv_addr, sizeof(serv_addr)) == -1)
	{
		printf("connect error %d %s", errno, strerror(errno));
		close(clnt_sock);
		return;
	}

	char message[256] = "";
	while (true)
	{
		printf("Input message:(Q to quit)");
		fgets(message, sizeof(message), stdin);
		if ((strcmp(message, "q\n") == 0) || (strcmp(message, "q\n") == 0))
			break;

		write(clnt_sock, message, strlen(message));
		memset(message, 0, sizeof(message));
		read(clnt_sock, message, sizeof(message));
		printf("From server:%s", message);
	}
	close(clnt_sock);
}

void lesson102(const char* arg)
{
	if (strcmp(arg, "s") == 0)
	{
		server102();
	}
	else
	{
		client102();
		printf("%s(%d):%s OVER!\n", __FILE__, __LINE__, __FUNCTION__);
	}
}

int main(int argc, char* argv[])
{
	lesson102(argv[1]);
	return 0;
}
```

注意此时的情况：

- 如果客户端发送超过5B，此时服务器只读一次没读完，也没有继续读，就算客户端再次发消息写入，也不会触发服务器的读操作【解决：修改为非阻塞状态；且读到`EAGAIN`】
- 运行结果中需要注意的是，客户端发送消息次数和服务器端`epollwait`函数调用次数。客户端从请求连接到断开连接共发送5次数据，服务器端也相应产生5个事件。

 

<br>

### 7.5 Epoll为什么用红黑树不用哈希表？

> 这问题让我受惊了，我都不知道Epoll使用红黑树实现的。

1、红黑树容易缩容

红黑树容易缩容，在处理完大规模数据后能够很好的缩容。哈希表是不容易缩容的，如果某个时刻，有大量的网络请求通过哈希来记录，触发哈希表扩容，之后这个哈希表很难缩容回去，这也是为什么一些go程序oom的问题，都是go map太大了无法gc。



2、红黑树处理大规模数据效率高

红黑树是一种自平衡二叉查找树，它的查询、插入和删除操作的平均复杂度都是O(log n)。而哈希表的查询、插入和删除操作的平均复杂度是O(1)，在处理一些小规模的数据时，哈希表可能表现得更出色，但在处理大规模的数据时，红黑树更加高效稳定。



3、红黑树能同时支持文件描述符和事件的管理

在epoll中，红黑树能够同时支持文件描述符和事件的管理，可以快速地定位某个事件对应的文件描述符。而哈希表只能支持根据文件描述符快速查找对应的事件，而对于事件对应的文件描述符则无法快速定位，因此不符合epoll的需求。



#### 7.5.2 红黑树简介

红黑树是一种**特定类型的二叉树**，它是在计算机科学中用来组织数据比如数字的块的一种结构。红黑树是一种平衡二叉查找树的变体，它的左右子树高差有可能大于 1，所以红黑树不是严格意义上的平衡二叉树（AVL），但 对之进行平衡的代价较低， 其平均统计性能要强于 AVL 。由于每一棵红黑树都是一颗二叉排序树，因此，在对红黑树进行查找时，可以采用运用于普通二叉排序树上的查找算法，在查找过程中不需要颜色信息。

红黑树是每个结点都带有颜色属性的二叉查找树，颜色或红色或黑色。在二叉查找树强制一般要求以外，对于任何有效的红黑树我们增加了如下的额外要求:

1. 结点是红色或黑色。
2. 根结点是黑色。
3. 所有叶子都是黑色。（叶子是NIL结点）
4. 每个红色结点的两个子结点都是黑色。（从每个叶子到根的所有路径上不能有两个连续的红色结点）
5. 从任一结点到其每个叶子的所有路径都包含相同数目的黑色结点。

这些约束强制了红黑树的关键性质: 从根到叶子的最长的可能路径不多于最短的可能路径的两倍长。结果是这个树大致上是平衡的。因为操作比如插入、删除和查找某个值的最坏情况时间都要求与树的高度成比例，这个在高度上的理论上限允许红黑树在最坏情况下都是高效的，而不同于普通的二叉查找树。是性质4导致路径上不能有两个连续的红色结点确保了这个结果。最短的可能路径都是黑色结点，最长的可能路径有交替的红色和黑色结点。因为根据性质5所有最长的路径都有相同数目的黑色结点，这就表明了没有路径能多于任何其他路径的两倍长。因为红黑树是一种特化的二叉查找树，所以红黑树上的只读操作与普通二叉查找树相同。

在红黑树上只读操作不需要对用于二叉查找树的操作做出修改，因为它也是二叉查找树。但是，在插入和删除之后，红黑属性可能变得违规。恢复红黑属性需要少量（O(log n)）的颜色变更（这在实践中是非常快速的）并且不超过三次树旋转（对于插入是两次）。这允许插入和删除保持为 O(log n)次，但是它导致了非常复杂的操作。



#### 7.5.3 哈希表简介

散列表（Hash table，也叫哈希表），**是根据关键码值（Key value）而直接进行访问的数据结构**。也就是说，它通过把关键码值映射到表中一个位置来访问记录，以加快查找的速度。这个映射函数叫做散列函数，存放记录的数组叫做散列表。

给定表M，存在函数f(key)，对任意给定的关键字值key，代入函数后若能得到包含该关键字的记录在表中的地址，则称表M为哈希（Hash）表，函数f(key)为哈希（Hash）函数。若关键字为**k**，则其值存放在**f(k)**的存储位置上。由此，不需比较便可直接取得所查记录。称这个对应关系**f**为散列函数，按这个思想建立的表为散列表。对不同的关键字可能得到同一散列地址，即**k1≠k2**，而**f(k1)==f(k2)**，这种现象称为**冲突**（英语：Collision）。具有相同函数值的关键字对该散列函数来说称做同义词。综上所述，根据散列函数**f(k)**和处理冲突的方法将一组关键字映射到一个有限的连续的地址集（区间）上，并以关键字在地址集中的“像”作为记录在表中的存储位置，这种表便称为散列表，这一映射过程称为散列造表或散列，所得的存储位置称散列地址。

若对于关键字集合中的任一个关键字，经散列函数映象到地址集合中任何一个地址的概率是相等的，则称此类散列函数为均匀散列函数（Uniform Hash function），这就是使关键字经过散列函数得到一个“随机的地址”，从而减少冲突。

常用方法：

1. **直接寻址法**：取关键字或关键字的某个线性函数值为散列地址。即H(key)=key或H(key) = a·key + b，其中a和b为常数（这种散列函数叫做自身函数）。若其中H(key)中已经有值了，就往下一个找，直到H(key)中没有值了，就放进去。
2. **数字分析法**：分析一组数据，比如一组员工的出生年月日，这时我们发现出生年月日的前几位数字大体相同，这样的话，出现冲突的几率就会很大，但是我们发现年月日的后几位表示月份和具体日期的数字差别很大，如果用后面的数字来构成散列地址，则冲突的几率会明显降低。因此数字分析法就是找出数字的规律，尽可能利用这些数据来构造冲突几率较低的散列地址。
3. **平方取中法**：当无法确定关键字中哪几位分布较均匀时，可以先求出关键字的平方值，然后按需要取平方值的中间几位作为哈希地址。这是因为：平方后中间几位和关键字中每一位都相关，故不同关键字会以较高的概率产生不同的哈希地址。
4. **折叠法**：将关键字分割成位数相同的几部分，最后一部分位数可以不同，然后取这几部分的叠加和（去除进位）作为散列地址。数位叠加可以有移位叠加和间界叠加两种方法。移位叠加是将分割后的每一部分的最低位对齐，然后相加；间界叠加是从一端向另一端沿分割界来回折叠，然后对齐相加。
5. **随机数法**：选择一随机函数，取关键字的随机值作为散列地址，即H(key)=random(key)其中random为随机函数,通常用于关键字长度不等的场合。
6. **除留余数法**：取关键字被某个不大于散列表表长m的数p除后所得的余数为散列地址。即 H(key) = key MOD p，p≤m。不仅可以对关键字直接取模，也可在折叠、平方取中等运算之后取模。对p的选择很重要，一般取素数或m，若p选的不好，容易产生同义词。

***延伸阅读1：红黑树与哈希的区别***

- 红黑树是有序的，哈希是无序的，可以根据是否需要排序来选择用哪个。
- 红黑树占用的内存小（仅需要为其存在的节点分配内存），而哈希事先应该分配足够的内存存储散列表，即便有些哈希槽可能弃用，可以根据内存限制情况选择用哪个。
- 红黑树查找和删除的时间复杂度都是O(log n)，哈希查找和删除的时间复杂度都是O(1)，但哈希并不一定就比红黑树快，因为哈希还有哈希函数耗时，还可能产生哈希冲突。