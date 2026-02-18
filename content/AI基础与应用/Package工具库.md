---
title: Package工具库
description: NodeJS工具库与Github工具库。
urlname: nodejs-github-summary
date: 2020-11-27
tags:
  - Node
  - 工具
categories:
  - AI基础与应用
draft:
---

> [!note] 总结遇到的一些关于前端技术栈中的有关 `Node` 的问题



# 一 Npm 基本命令

## 1 npm

`npm`（Node Package Manager）意思是 `node` 的包管理器，它是随着 NodeJs 安装时一起被安装的

## 2 npm简单命令使用

**① npm -v 查看 npm 的版本**

**② 安装包方法 npm install XXX(包名)** 

```bash
// 进入目录，在当前目录下打开 cmd 命令窗口
npm init
// 点击回车之后会让你输入一些关于本项目的一些基本信息（可忽略，一直回车直到初始化完成后即可）
```

初始化完成之后，文件目录下会生成 一个 package.json 文件，说明项目初始化完成

**③ 卸载安装的包** 

```bash
npm uninstall jquery 
// 或者
npm remove jquery
```

 **④  查看包的详细信息**

```bash
npm info jquery
```

 **⑤ 查看包版本号**

```bash
npm view jquery versions // 查看一个包存在的所有版本号 
npm view jquery version  // 查看指定包当前的最新版本
```

 **⑥ 下载指定版本的包**

```bash
npm install jquery@3.4.1
```

 ⑦   查看项目安装了哪些包

```bash
npm list
```

 **⑧ 安装后缀**

```bash
// 表示 在 package.json 文件中（dependencies）记录下载包的版本信息；下载生产依赖包
npm install jquery --save  或 npm i jquery -S

// 下载开发依赖包
npm install jquery --save-dev 或 npm i jquery -D
```

 **⑨ 其他**

```bash
// 查看全局安装包的存放位置
npm root -g 
// 包的修复 ，一般是包的更新
npm audit fix  
// 查看当前安装包的版本
npm ls jquery 
// 更改 npm 的下载镜像为淘宝镜像
npm config set registry https://registry.npm.taobao.org   
```

# 二 npm工具

## 1 视频下载

> [!note] 2026-1-13更新
> 一个网站也可以好像，此处[VideoFk](https://www.sbkko.com/gj-156.html)

> [原文](https://www.zhihu.com/question/23805794) ---- `you-get` 神器

You-get是GitHub上的一个项目，也可以说是一个命令行程序，帮助大家下载大多主流网站上的视频、图片及音频。

1、下载python

2、打开终端

3、下载 `you-get`

```python
pip3 install you-get
```

接着输入下方内容，点击enter键，升级you-get工具。

```python
pip3 install --upgrade you-get
```

然后会有提示让你输入下方内容，正式升级you-get工具。

```python
python -m pip install --upgrade pip
```

4、测试下载

```python
you-get URL
```

5、按清晰度下载

可以先预览下载的画质选择，可以看到有超清、高清、标清和渣清

```python
you-get -i URL
```

按需下载

```python
you-get --format=mp4hd URL
```


## 2 npm镜像管理工具

`nrm`【npm registry manager】是npm的镜像源管理工具，它可以快速在让你在本地源之间切换。

```bash
# nrm安装
npm install -g nrm

# 查看当前可使用的镜像源
nrm ls

# 切换镜像源  使用 taobao 镜像源
nrm use taobao
```



## 3 前端开发

### 3.1 唯一ID

```bash
# 较大
npm i uuid
# 较小
npm i nanoid

# 引入
import {nanoid} from 'nanoid'
```


### 3.2 React Props限制

```bash
npm i prop-types

# 引入
import PropTypes from 'prop-types'
```


### 3.3 React ajax请求库

- jQuery
- axios


### 3.4 React 消息订阅-发布机制

```bash
# 工具库：PubSubJs
npm i pubsub-js --save

# 使用
import PubSub from 'pubsub-js'

PubSub.subscribe('search',(msg,data)=>{
  console.log(msg,data);
})

PubSub.publish('search',{name:'tom',age:18})
```



### 3.5 React Web 路由库

```bash
# 默认安装6版本
npm i react-router-dom
```


### 3.6 React key-value 处理库

```bash
# React 脚手架自带
npm install querystring

import qs from 'querystring'

# 它有两个方法，一个是 `parse` 一个是 `stringify` 
# urlencoded 编码：'key=value&key1=value1'
const { search } = this.props.location
const { id, title } = qs.parse(search.slice(1))
```

## 4 Numpy

`NumPy`是Python进行科学计算的基础软件包，它是Python进行数据分析的一个主要的工具，且提供了多种数据结构、算法以及大部分涉及Python数组计算所需的接口。NumPy通常与`Scipy(Scientific Python)`和`Matplotlib`(绘图库)一起使用，这种组合使用能够能够替代`MATLAB`，是一个强大的计算环境。


> [!tip] 参考资料
 [NumPy官方中文指南](https://www.numpy.org.cn/user/)
> 🔺[Numpy参考手册](https://www.numpy.org.cn/reference/)
> [Numpy中文文档](https://numpy123.com/)
> [W3C Numpy文档](https://www.w3cschool.cn/doc_numpy_1_13/dict.html)
> [防脱发指南](https://www.numpy.org.cn/alopecia/)
> [numpy常用API整理汇总](https://blog.csdn.net/qq1198768105/article/details/126304306)	



## 5 Pytorch


> [!note] 关于Python学习，每遇未知即记录！
>
> [Pytorch官网](http://pytorch.p2hp.com/)
>
> [Pytorch中文教程 | 社区翻译](https://pytorch.apachecn.org/)
>
> [Pytorch官网英文文档](https://pytorch.org/docs/stable/index.html)
>
> [Pytorch中文文档](https://pytorch-cn.readthedocs.io/zh/latest/)
>
> [Browse State-of-the-Art ：数据集下载](https://paperswithcode.com/sota)


> [!tip] [参考文档](https://pytorch-cn.readthedocs.io/zh/latest/) 

`Pytorch`常用的包：

1. `torch`：张量的有关运算。如创建、索引、链接、转置、加减乘除、切片等
2. `torch.Storage`：跟绝大部分基于连续存储的数据结构有关
3. `torch.nn`：包含搭建神经网络层的模块和一系列loss函数。如全连接、卷积、BN批处理、dropout、crossentryloss、mseloss等；`torch.nn.function`：常用的激活函数relu、leaky_relu、sigmoid等
4. `torch.optim`：各种参数优化方法，例如SGW、AdaGrad、Adam、RMSProp等
5. `torch.autogard`：提供tensor所有操作的自动求导方法
6. `torch.utils.data`：用于加载数据。
7. `torchvision`：是pytorch中专门用来处理图像的库。包中常用的模块有
   - `torchvision.datasets`：用来进行数据加载的
   - `Torchvision.models`：为我们提供已经训练好的模型，让我们加载之后可以直接使用。包括AlexNet、VGG、ResNet等网络模型
   - `Torchvision.transforms`：为我们提供了一般的图像转换操作类
   - `Torchvision.utils`：将给定的tensor保存成image文件
8. `from PIL import Image`：pytorch中处理图像使用的这几种格式
   - PIL：使用python自带图像处理库读取出来的图片格式。
   - Numpy：使用python-onpenCV库读取出来的图片格式
   - Tensor：pytorch中训练是所采用的向量格式（也可以说是图片）。
     而 from PIL import Image是在进行PIL与tensor的转换，也就是图片格式的转换
9. `matplotlib`：这是pytorch的一个绘图库，是python中常用的可视化工具之一，可以方便创建2D图标和一些基本的3D图表。基本的方法有 ：
   - `plt.figure()`:调用figure创建一个绘图对象
   - `Plt.plot`：调用plot函数在当前的绘图对象中绘图
   - `Plt.xlable()/plt.ylable`：设置x/y轴的文字
   - `Plt.title()`：设置图标的标题
   - `Plt.xlim()/plt.ylim()`：设置变量的范围，[格式为x/y的起点，终点]
   - `Plt.axis()`：同时设置两个变量的范围，格式为[x的起点，x的终点，y的起点，y的终点]
   - `Plt.legend()`：显示label中标记的图示
   - `Plt.show()`：以上参数设置完成后，必须使用该方法显示出创建的所有绘图对象



# 三 Github工具集合

## 1 Github连接问题


<iframe src="https://player.bilibili.com/player.html?isOutside=true&aid=113435689878240&bvid=BV1reD5YCE7e&cid=26642092003&p=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true" style="width: 100%; height: 400px;"></iframe>

**不能正确显示B站外链问题原因：**

1. 原iframe标签使用了相对协议`src="//player.bilibili.com/..."`，在GitHub Pages的HTTPS环境下可能导致混合内容问题
2. iframe标签缺少宽度和高度属性，可能导致布局问题

**解决方案：**

1. 将iframe的src属性从相对协议改为绝对HTTPS协议：`https://player.bilibili.com/...`
2. 添加了style属性，设置宽度为100%，高度为400px，确保视频播放器能正常显示和响应式布局
3. 保留了其他必要属性如allowfullscreen、frameborder等

## 2 OCR工具

> [!note] [Umi-OCR 文字识别工具](https://github.com/hiroi-sora/Umi-OCR)

