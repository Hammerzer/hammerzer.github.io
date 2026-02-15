---
title: MySQL快速上手
description: MySQL 入门实操笔记，梳理基础语法、核心操作与常用命令，快速掌握数据库使用。
urlname: mysql-start
date: 2024-10-15T14:18:00
tags:
  - 数据库
  - 开发部署
categories:
  - Tools and Platforms
draft: false
---


# 一 MySQL开发环境配置

使用复杂一点的方式，即Windows下的动态库引用方式。

1. VS2022新建一个控制台项目，项目名为`ProjMysql`，不勾选...在同一目录中，创建项目。

2. 右键 `ProjMysql.cpp` 选项卡，选择打开所在文件，从Mysql的安装目录下收集所需的依赖文件。

   3. 将Mysql的安装目录下【`C:\Program Files\MySQL\MySQL Server 8.0`】的 `include` 文件夹复制到cpp所在的文件夹。
   4. 将安装目录中lib文件夹下的 `libmysql.dll` 和 `libmysql.lib` 复制到cpp所在文件夹。

5. 右键项目【不是解决方案】，选择属性，在对话框中修改相应【配置属性】中配置。

   6. 选择【VC++】，在【包含目录】后追加：`include`【相对目录】
   7. 选择【链接器】下的输入，在【附加依赖项】后追加：`libmysql.lib`

   > C++中的`include`引用，尖括号`<>`是优先系统库文件寻找，`""`是优先寻找项目文件中的路径。
   >
   > 如使用属性对话框中，配置属性 -> C/C++ -> 常规 -> 附加包含目录，即使用双引号导入。

8. 编译以下代码：

   ```cpp
   #include <iostream>
   // 下面的这种导入方式仅限windows下VS使用，相当于修改配置属性
   //#pragma commen(lib,"libmysql.lib")
   #include <mysql.h>
   
   int main()
   {
       MYSQL* mysql = new MYSQL();//MYSQL其实是个结构体
       /*在栈上创建MYSQL对象是不明智。
       * 毕竟每一个MYSQL对象的操作都非常耗时，需要开一个线程执行
       * 而且，如果占内存被释放，又没有正常close，服务器会一直为客户端保留资源，造成服务器的大量资源浪费
       */ 
       //MYSQL mysql;
       
       // 此处的mysql_init，成功返回mysql的本身指针，失败返回NULL
       MYSQL* pDB = mysql_init(mysql);
       if (pDB == NULL)
       {
           std::cout << "mysql_init failed！\n";
           return -1;
       }
       mysql_real_connect(pDB, "localhost", "root", "Heart+0721", "mysql", 3306, NULL, 0);
       mysql_close(pDB);
       delete mysql;
       return 0;
   }
   ```

   

9. 上面的代码编译可能会报错找不到相关的dll文件【解决：将相应的dll文件拷贝到exe同级目录，或Path目录下】

   10. 此时，从外部下载的dll可能会导致程序直接终止；
   11. MySql Server的安装目录下，bin文件夹中就有所需dll。

   

<br>

注意：

1. 关于使用到的两个`dll`和`lib`文件有以下需要补充的点。

   - `libmysql.dll`【5000KB】 和 `libmysql.lib`【27KB】 配套使用，即动态库模式。
   - 前者必须与可执行程序在一起，也可以拷贝到Path路径下，且只能在64位程序中使用；后者是供编译器使用的，指明哪些函数和结构需要去动态库dll中寻找。
   - 而`mysqlclient.lib`【6000KB】单独使用，为静态库模式，使用较多、较容易。

2. 关于编码问题：

   - 需要确保数据库、控制台和代码三方都是统一的编码【第14节中有统一方法】。
   - 【第17节触发器】插入的中文建议为偶数个，因为UTF-8中大多数中文字符为3个字节，可能会导致莫名奇妙的问题。
   - 【第17节触发器】SQL字符串换行建议加`\n \`，多行使用最后的反斜杠来扩展。

3. 关于事务：

   - 在事务过程中，内部可查询到修改，但数据库是查不到修改的，直到事务提交。

4. 关于备份与恢复：

   - 【第18节备份与恢复】Windows下需要填写文件的绝对路径。

   - 文件名建议为表名，因为恢复时文件名与表名一一对应，否则需要修改操作。

   - 如果绝对路径中有同名文件，sql执行会报错，避免文件覆盖而导致的数据丢失。

   - 数据恢复时，需要修改数据库连接函数中的选项为 `CLIENT_LOCAL_FILES`，如果依然失败，尝试使用mysql工具恢复【新版Mysql中，禁用脚本恢复数据库，因为诸多病毒会利用此漏洞】：

     ```c++
     // 仅本地运行you'xi
     if (ret != 0)
     {
     	std::cout << "mysql error:" << mysql_error(pDB) << std::endl;
     	//mysqlimport -u root -pFengPan12#$56 --local hello "C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/hello.txt" --fields-terminated-by=","  --lines-terminated-by="\r\n"
     	std::string cmd = "mysqlimport -u root -pFengPan12#$56 --local hello ";
     	cmd += "\"C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/hello.txt\" ";
     	cmd += "--fields-terminated-by=\",\"  --lines-terminated-by=\"\\r\\n\"";
     	system(cmd.c_str());
     }
     ```

     

   - ......

     

5. ...



<br>

# 二 MySQL相关命令

### 1 MySQL更新

[MySQL 8.0.26版安装说明](https://zhuanlan.zhihu.com/p/509968027)

更新MySQL版本的步骤。

1.备份数据库

```bash
$ mysqldump -u root -p dbname >backup_dbname.sql
```

备份是非常重要的，因为在更新过程中出现错误会破坏原有的数据，如果有备份文件就可以恢复到原有的状态。

2.升级

```bash
$ yum update mysql-server
```

可以使用yum update命令更新MySQL服务器，其中的mysql-server是MySQL的软件包名。使用这个命令会下载最新版本的MySQL并进行安装。

3.更新数据库

```bash
$ mysql_upgrade -u root -p
```

在MySQL服务器更新后，会有一些特殊的操作需要执行，mysql_upgrade命令可以用来执行这些操作。在执行前请确保MySQL服务器已经被停止，并且没有其他人正在访问MySQL数据库。

4.启动MySQL服务

```bash
$ systemctl start mysqld
```

更新完成后，需要启动MySQL服务，并确认数据库已经可以正常访问。



# 三 问题的解决

### 1 node连接mysql数据库：报错

> 参考[此处](https://www.yii666.com/blog/238366.html)

```text
Client does not support authentication protocol requested by server; consider upgrading MySQL client
```

**原因在于**：MySQL8.0换了加密插件，而数据库管理客户端还是原来旧版本的加密方式，主要在于安装MySQL8.0过程中的Authentication Method这一配置过程，有了不同的加密方式，所以如果选择强加密（默认应该是这种），就会出现上诉报错问题，那么只要修改一下加密方式为保留旧版本的加密方式就ok了。

`windows`用户使用终端进入数据库后输入：

```
# 查询 用户名 和 host 及加密规则
SELECT user, host, plugin from mysql.user;

alter user 'root'@'localhost' identified with mysql_native_password by '密码'; // 重新设置密码 root为用户名 localhost为host

flush privileges // 刷新权限配置
```

即可解决！

