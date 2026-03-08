---
title: Python入门到飙车
description: 记录 Python 从入门到进阶的学习历程，包括环境配置、常用工具和技巧。
urlname: python-route
date: 2023-07-19 11:21:49
tags:
  - Python
categories:
  - AI基础与应用
draft: false
---

> [!tip] 学习资源推荐
> - [廖雪峰Python教程](https://www.liaoxuefeng.com/wiki/1016959663602400/1016959735620448)
> - [Python 3.14 官方文档](https://docs.python.org/zh-cn/3/tutorial/index.html)


# 一、Python 环境配置

## 1.1 Anaconda 与 Miniconda

### 1.1.1 推荐使用 Miniconda
推荐使用轻量级的 **Miniconda** 替代完整版 Anaconda，它只包含 Python 和 conda 包管理器，占用更少的磁盘空间。

### 1.1.2 国内镜像源配置

> [!note] 参考此处即可：[Miniconda的安装及配置教程](https://blog.csdn.net/AlgoZZi/article/details/145074821)
> 包含镜像源、常用命令

## 1.2 conda 常用命令

### 1.2.1 环境管理
```bash
# 查看 conda 版本
conda --version

# 创建新环境（默认与当前 Python 版本一致）
conda create --name envname

# 创建指定 Python 版本的环境
conda create --name python36 python=3.6

# 激活环境
conda activate envname

# 退出当前环境
conda deactivate

# 列出所有环境
conda info -e
conda env list

# 删除环境
conda remove --name envname --all
conda env remove -n envname

# 克隆环境
conda create --name clone_env --clone envname
```

### 1.2.2 包管理
```bash
# 查看当前环境已安装的包
conda list

# 查看指定环境的包
conda list -n envname

# 模糊查找包
conda search py

# 精确查找包
conda search --full-name python

# 在当前环境安装包
conda install scrapy

# 在指定环境安装包
conda install -n python36 scrapy

# 更新包
conda update scrapy

# 更新当前环境所有包
conda update --all

# 删除包
conda remove scrapy
```

### 1.2.3 环境分享与复制
```bash
# 导出环境配置到文件
conda list --explicit > spec-file.txt

# 使用配置文件创建新环境
conda create --name newenv --file spec-file.txt

# 导出 YAML 格式的环境配置（推荐）
conda env export > environment.yml

# 使用 YAML 文件创建环境
conda env create -f environment.yml
```


## 1.3 Jupyter Notebook 使用

### 1.3.1 安装
```bash
# 使用 pip 安装
pip install jupyter

# 使用清华镜像源安装
pip install jupyter -i https://pypi.tuna.tsinghua.edu.cn/simple
```

### 1.3.2 基本使用
```bash
# 在当前目录启动 Jupyter Notebook
jupyter notebook

# 在指定文件夹运行
jupyter notebook --notebook-dir="E:\Your\Path"
```

### 1.3.3 魔法函数与快捷键
- `%matplotlib inline`: 使 matplotlib 图表嵌入显示
- `%run script.py`: 运行 Python 脚本
- `%timeit`: 测试代码执行时间

### 1.3.4 在 Jupyter 中切换 conda 环境

#### 方法一：使用 nb_conda_kernels（推荐）
```bash
# 在 base 环境中安装 nb_conda_kernels
conda activate base
conda install nb_conda_kernels

# 在目标环境中安装 ipykernel
conda activate my-conda-env
conda install ipykernel

# 启动 Jupyter
jupyter notebook
```

#### 方法二：为 conda 环境创建特殊内核
```bash
conda activate my-conda-env
conda install ipykernel
ipython kernel install --user --name=my-conda-env-kernel

# 启动 Jupyter
jupyter notebook
```


## 1.4 conda 与 pip 的区别

| 特性 | pip | conda |
|------|-----|-------|
| **支持语言** | 仅 Python | 跨语言（Python、C/C++、R 等） |
| **包源** | PyPI（更新及时、包数量多） | Anaconda.org（包数量较少） |
| **包格式** | wheel 或源代码（可能需要编译） | 二进制文件（下载即可使用） |
| **环境隔离** | 需要借助 virtualenv/venv | 内置支持环境隔离 |
| **依赖处理** | 递归安装依赖，不保证完整性 | 检查所有包的依赖关系 |

**最佳实践**：
1. 使用 conda 创建和管理环境
2. 优先使用 conda 安装包
3. conda 无法安装的包再使用 pip




## 1.5 常见问题与解决方案

### 1.5.1 conda activate 命令无法使用
**错误信息**：
```
CommandNotFoundError: Your shell has not been properly configured to use 'conda activate'.
```

**解决方法**：
- 使用 Anaconda 提供的 `Anaconda Prompt` 终端
- 或先执行 `activate` 命令进入 base 环境

### 1.5.2 新建环境后环境文件未安装到指定目录

**问题**：虽然执行了下面的安装路径命令，但是新环境的文件未安装到指定位置：

```bash
(base) PS C:\Users\wangh> conda config --add envs_dirs D:\Software\MiniConda\envs
```

先回答核心问题：python313 环境装在哪了？从命令输出里能直接找到答案：

```
environment location: C:\Users\wangh\.conda\envs\python313
```

所以这个环境的包文件实际安装在 `C:\Users\wangh\.conda\envs\python313` 路径下，而非你期望的 `D:\Software\MiniConda\envs`。

**原因**：
1. Conda 的 `envs_dirs` 是列表形式，有优先级排序
2. 第一个目录不可写时会自动降级到下一个目录

#### 解决方法

**步骤 1**：确认 D 盘目录权限（关键）

右键 `D:\Software\MiniConda\envs` → 属性 → 安全 → 确认当前用户有「完全控制 / 写入」权限（如果没有，点击「编辑」添加）。

**步骤 2**：重置 / 调整 envs_dirs 优先级（二选一）

修改全局配置，确保 D 盘目录优先且可写

1. 先清空旧的 envs_dirs 配置：    
    ```bash
    conda config --remove-key envs_dirs
    ```
    
2. 重新添加，且确保目录可写：

    ```bash
    conda config --add envs_dirs D:\Software\MiniConda\envs
    # 可选：删除默认的 C 盘目录（避免优先级干扰）
    conda config --remove envs_dirs C:\Users\wangh\.conda\envs
    ```
    
3. 验证配置：执行 `conda config --show envs_dirs`，确认输出只有 `D:\Software\MiniConda\envs`。
4. 重新创建环境：    
    ```bash
    conda create -n python313 python=3.13 -y
    ```
    

**步骤 3**：（可选）迁移已创建的 python313 环境到 D 盘

```bash
# 1. 先停用当前环境
conda deactivate
# 2. 克隆现有环境到 D 盘
conda create --prefix D:\Software\MiniConda\envs\python313 --clone python313 -y
# 3. 删除 C 盘旧环境
conda remove -n python313 --all -y
```


### 1.5.3 conda版本过高导致conda环境无法识别

导入conda环境时出错：

```
lateinit property envs_dirs has not been initialized
```

这是一个已知的**兼容性问题**——尤其在 PyCharm 较新版本（如 2024.2+）搭配 **Conda 25.x** 版本时容易出现。

**解决办法：降级 Conda 版本**

考虑将 Conda 降级到一个更稳定的版本（如 24.x 系列）

```bash
(base) PS C:\Users\wangh> conda install conda=24.11.3 
Retrieving notices: done 
Channels: - defaults 
Platform: win-64 
Collecting package metadata (repodata.json): done 
Solving environment: failed 

LibMambaUnsatisfiableError: Encountered problems while solving: 
- package conda-24.11.3-py310haa95532_0 requires python >=3.10,<3.11.0a0, but none of the providers can be installed 

Could not solve for environment specs 
The following packages are incompatible 
├─ conda =24.11.3 * is installable with the potential options 
│ ├─ conda 24.11.3 would require 
│ │ └─ python >=3.10,<3.11.0a0 *, which can be installed; 
│ ├─ conda 24.11.3 would require 
│ │ └─ python >=3.11,<3.12.0a0 *, which can be installed; 
│ ├─ conda 24.11.3 would require 
│ │ └─ python >=3.12,<3.13.0a0 *, which can be installed; 
│ └─ conda 24.11.3 would require 
│ └─ python >=3.9,<3.10.0a0 *, which can be installed; 
└─ pin on python =3.13 * is not installable because it requires 
└─ python =3.13 *, which conflicts with any installable versions previously reported. 

Pins seem to be involved in the conflict. Currently pinned specs: 
- python=3.13
```

可能出现上面的python环境冲突，需要先让 base 环境的 Python 版本符合要求（例如 3.12）。**注意：这会改变 base 环境的 Python 版本，可能影响其他依赖 base 的工具，请谨慎操作。**

```bash
conda install python=3.12
```

降级完成后，重新打开 PyCharm，再次尝试配置 Conda 解释器。

# 二、Python 开发工具

## 2.1 PyCharm 使用

### 2.1.1 安装第三方库

#### 方法一：PyCharm 自带功能
`File -> Settings -> Project -> Project Interpreter -> 点击加号 -> 搜索库名 -> 安装`

#### 方法二：使用 pip 命令
```bash
pip install package_name
```

#### 方法三：下载 whl 文件安装
1. 安装 wheel 工具：`pip install wheel`
2. 在 [UCI 镜像站](http://www.lfd.uci.edu/~gohlke/pythonlibs/) 下载 whl 文件
3. 安装：`pip install path/to/package.whl`

### 2.1.2 常用快捷键
| 快捷键 | 功能 |
|--------|------|
| Ctrl + / | 单行注释 |
| Ctrl + Alt + L | 自动格式化代码 |
| Ctrl + D | 复制并粘贴该行 |
| Ctrl + Y | 删除行 |


## 2.2 Python 代码阅读方法

### 2.2.1 查看包源代码
```python
from d2l import torch as d2l
with open(d2l.__file__, 'r') as f:
    print(f.read())
```

### 2.2.2 在 Jupyter 中查看源码
```python
# 使用 ?? 查看函数/类的源代码
d2l??
```

### 2.2.3 查看帮助文档
```python
from torch.utils.data import Dataset
help(Dataset)
```


# 三、Python 基础与常用操作

## 3.1 环境变量与路径

### 3.1.1 查找 Python 安装路径
```python
import sys
print(sys.path)
```

### 3.1.2 文件路径问题
Windows 系统中文件路径的表示方法：
```python
# 方法一：使用原始字符串
path = r'C:\Users\username\Documents\file.txt'

# 方法二：使用双反斜杠
path = 'C:\\Users\\username\\Documents\\file.txt'

# 方法三：使用正斜杠（推荐）
path = 'C:/Users/username/Documents/file.txt'
```


## 3.2 常见错误与解决方法

### 3.2.1 [无法读取shape属性](https://wenku.csdn.net/answer/bb3efc0cb6f14a2cb50dda1150918b32)
**错误信息**：
```
AttributeError: 'tuple' object has no attribute 'shape'
```

**原因**：尝试对一个元组类型的变量调用 numpy 数组的 shape 属性，但是元组类型并没有这个属性。

**解决方法**：
```python
# 检查变量类型
my_tuple = (1, 2, 3)
print(type(my_tuple))  # <class 'tuple'>

# 使用 len() 代替 shape
print(len(my_tuple))  # 3

# 或者转换为 numpy 数组
import numpy as np
arr = np.array(my_tuple)
print(arr.shape)  # (3,)
```


### 3.2.3 浮点转字符串错误

```python
pi = 3.14
print("pi值=" + pi)
# 输出：TypeError: can only concatenate str (not "float") to str
```

**原因**：尝试将字符串和数值类型直接拼接。

**解决方法**：
```python
pi = 3.14

# 方法一：类型转换
print("当前的pi=" + str(pi))

# 方法二：字符串格式化
print("当前的pi= %.2f" % pi)

# 方法三：f-string（Python 3.6+）
print(f"当前的pi= {pi:.2f}")
```


