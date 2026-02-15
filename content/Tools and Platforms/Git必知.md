---
title: Git必知
description: Git的必知必会。
urlname: git-must
date: 2020-09-08
tags:
  - Git
categories:
  - Tools and Platforms
draft:
---


> [!tip] 量大管饱
> [廖雪峰的Git教程](https://www.liaoxuefeng.com/wiki/896043488029600)
> [Git使用教程（简书）](https://www.jianshu.com/p/e57a4a2cf077)
> [Git 互动练习教程](https://learngitbranching.js.org/?locale=zh_CN)
> 两个来自CSDN的  [Git教程(完整)](https://blog.csdn.net/weixin_42152081/article/details/80558282) 和 [Git傻瓜教程](https://blog.csdn.net/u011535541/article/details/83379151)
> 来自`Gitee`的[官方教程](https://gitee.com/help/articles/4110#article-header1)很厉害

# 一 Git 常用方法

## 1 使用git将本地项目上传至git仓库

> **介绍**:  一般来说开发过程中都是先在git创建远程仓库，然后fetch到本地仓库，再进行commit push等操作，但是有时候也需要将本地已经开发的项目上传至一个空的远程仓库中，期间也是遇到不少问题，特此总结一下

### 初始化本地仓库

```
git init
```

将文件提交至本地仓库

```cmd
# 可能需要先 git add .
git commit -m "注释"
```

### 关联线上仓库

```
git remote add origin <线上仓库url>

// 线上仓库url 为如下链接
// https://github.com/wenhaofan/xxx.git
```

### 提交代码

```bash
// git pull 
git push
```

**常见错误及解决方案**

```cmd
# 可能报错：第一次push未指定branch
fatal: The current branch master has no upstream branch.
To push the current branch and set the remote as upstream, use

    git push --set-upstream origin master
```

现在已经创建好了本地仓库，并关联上了远程仓库，如果我们直接使用 `git push -u origin master` 将本地内容推送至线上那么可能会出现出现以下错误。但是，**如果远程仓库不为空**，可能还会出现下面的错误！

#### git push

```text
failed to push some refs to 'https://github.com/xxx/xxx.git'
hint: Updates were rejected because the remote contains work that you dogit
hint: not have locally. This is usually caused by another repository pushing
hint: to the same ref. You may want to first integrate the remote changes
hint: (e.g., 'git pull ...') before pushing again.
hint: See the 'Note about fast-forwards' in 'git push --help' for details.
```

以上错误很明显的提示先执行 git pull 再push,需要先执行以下指令将远程仓库中master分支中的文件拉取到本地

```
git pull origin master
```

如果没有抛异常 那么就可以愉快的再次执行 git push 了，如果抛了异常，那么可以接着往下看

#### git pull

```
 * branch            master     -> FETCH_HEAD
fatal: refusing to merge unrelated histories
```

>  出现这个问题是因为本地库和远程库没有进行关联远， 然后本地推送到远程库， 远端因为这个本地库跟自己没有关联， 所以告知无法合并，该情况有两种解决方法

**第一种：**	

​    先从远端库拉下来代码，然后将本地代码放入本地库中， 然后再执行push提交上去 

**第二种**：

使用以下命令,把两段不相干的 分支进行强行合并

```
git pull origin master --allow-unrelated-histories
```

**然后再进行提交**

```
git push gitlab master:init
```

## 2 git拉取远程分支并创建本地分支

**查看远程分支**

```
 git branch -r
```

**拉取远程分支并创建本地分支**

```
 git checkout -b 本地分支名  origin/远程分支名
```

使用该方式会在本地新建分支x，并自动切换到该本地分支x。
 采用此种方法建立的本地分支会和远程分支建立映射关系。

**如果不想建立映射关系，可以：**

```
 git fetch origin 远程分支名x:本地分支名x
```

 使用该方式会在本地新建分支x，但是不会自动切换到该本地分支x，需要手动checkout。

 使用该方式会在本地新建分支x，但是不会自动切换到该本地分支x，需要手动checkout。

本地分支和远程分支建立映射关系的作用见：[此文章](https://blog.csdn.net/tterminator/article/details/78108550) 

```
git checkout -b my-test  //在当前分支下创建my-test的本地分支分支
git push origin my-test  //将my-test分支推送到远程
git branch --set-upstream-to=origin/my-test //将本地分支my-test关联到远程分支my-test上
git branch -a //查看远程分支
```

## 3 git基于某个分支创建分支并提交

**拷贝源代码**

```
git clone git@git地址 
```

**根据已有分支创建新的分支**

```
git checkout -b yourbranchname origin/oldbranchname
```

**推送到git**

```git
git push origin yourbranchname 
```

**合并**

```console
$ git checkout master
Switched to branch 'master'
$ git merge iss53
```

> 详见 [Git - 分支的创建与合并](https://git-scm.com/book/zh/v2/Git-%E5%88%86%E6%94%AF-%E5%88%86%E6%94%AF%E7%9A%84%E6%96%B0%E5%BB%BA%E4%B8%8E%E5%90%88%E5%B9%B6)

## 4 git 删除分支

在本地建立文件夹，将该分支clone下来

```
git clone -b   该分支名    地址
```

查看分支，并创建分支

```
git branch -a   (查看远端分支)
git checkout -b 别的分支
```

删除本地分支，删除远程分支

```
git branch -D 要删除的分支
git push origin --delete 要删除的分支
```

### ERROR

```
PS E:\Reference\h5-template-me> git branch -D 'life-and-mart'
error: Cannot delete branch 'life-and-mart' checked out at 'E:/Reference/h5-template-me'
```

> 解决参考[这篇文章](https://blog.csdn.net/benben_2015/article/details/79782202)

**错误原因**：很有可能是你正处于该分支上，然后尝试删除该分支是不被允许的。和Windows系统下删除打开的文件道理一样。

**解决办法：是只要切换分支到其他任意分支上，然后进行删除即可。**

## 5 撤销`git commit -m ''`

### 方法一

写完代码后，我们一般这样

```jsx
git add . //添加所有文件
git commit -m "本功能全部完成"
```

执行完commit后，想撤回commit，怎么办？

```git
git reset --soft HEAD^
```

这样就成功的撤销了你的commit

**注意，仅仅是撤回commit操作，您写的代码仍然保留**

### 方法二

**如果commit注释写错了，只是想改一下注释，只需要：**

```
git commit --amend
```

此时会进入默认`vim编辑器`，修改注释完毕后保存就好了

> **vim 编辑器技巧：**
>
> 刚进去时发现怎么也输入都没反应，是因为此时vim编辑器处于不可编辑状态，输入字母 `c` 可以进入编辑状态，这个时候就可以修改注释信息啦 ~
>
> 修改完之后按`esc`键退出编辑状态，再按大写`ZZ`就可以保存退出vim编辑器。vim操作符中说的 `qw` 可以保存并退出 根本没用
>
> **进入编辑模式：**
>
> - 小写`i`：在光标所在行位置停止不动开始写入内容
> - 大写`I`：在光标所在行行首开始写入内容
> - 小写`a`：在光标所在行当前字符后开始写入内容
> - 大写`A`：在光标所在行行尾开始写入内容
> - 小写`o`：在光标所在行下一行开始写入内容
> - 大写`O`：在光标所在行上一行开始写入内容
>
> **退出编辑模式：**
>
> - `:w`：保存文本
> - `:q`：退出编辑模式
> - `:w!`：强制保存，在root用户下即使文本只读也可以强制保存
> - `:q!`：强制退出，所有改动不生效
> - `:wq`：保存并退出

### 解释

`HEAD^ `的意思是上一个版本，也可以写成`HEAD~1`

如果你进行了2次commit，想都撤回，可以使`用HEAD~2`

### `git reset`参数：

#### `--mixed` 

意思是：不删除工作空间改动代码，撤销`commit`，并且撤销`git add .` 操作。效果同下：

```jsx
git reset --mixed HEAD^
git reset HEAD^ 
```

#### `--soft`  

不删除工作空间改动代码，撤销`commit`，不撤销`git add .` 

#### `--hard`

删除工作空间改动代码，撤销`commit`，撤销`git add .` 

注意完成这个操作后，就恢复到了上一次的commit状态

## 6 Git 修改远程仓库地址

方法有三种：

**1.修改命令**

```bash
git remote origin set-url [url]
```

**2.先删后加**

```bash
git remote rm origin
git remote add origin [url]
```

**3.直接修改config文件**

## 7 Git 添加标签

> 项目的版本管理中,每当一个release版本发布时,需要做一个记录,以便以后需要的时候重新打包这个版本,这时候就用到tag这个功能

**打标签**

```css
git tag -a 1.0.2_RC2 -m “Release version 1.0.2″
```

**详解：**

```css
git tag 是命令
-a 0.1.3是增加 名为0.1.3的标签
-m 后面跟着的是标签的注释
```

打标签的操作发生在我们commit修改到本地仓库之后。

### 相关操作

**提交**

```css
git add .
git commit -m “fixed some bugs”
git tag -a 0.1.3 -m “Release version 0.1.3″
```

**分享提交标签到远程服务器上**

```bash
git push origin master
git push origin --tags
```

`–tags` 参数表示提交所有tag至服务器端，普通的 `git push origin master` 操作不会推送标签到服务器端。

**切换到已有Tag**

```cpp
git tag --list  // 查看已有tag列表
git checkout [tag/branch/commit]  // 切换到指定tag/branch/commit都是此命令
```

**删除标签的命令**

```css
git tag -d 1.0.2_RC2
```

**删除远端服务器的标签**

```ruby
git push origin :refs/tags/1.0.2_RC2
```

## 8 Git 回退到某个版本

### 回退文件版本

#### 情况一：明确回退几个版本

```bash
// 在Git中，用HEAD表示当前版本，所以回退到上一个版本就只需要使用命令：
$git reset --hard HEAD^

// 如果是上上一个版本的话，只需要使用命令： 
$git reset --hard HEAD^^

// 要是需要回退到20个版本之前的话，就可以使用命令：
$git reset --hard HEAD~20
```

#### 情况二：未知回退版本

查看版本记录号

```bash
$git log  a.jsp
```

执行回退

```bash
$ git reset --hard  [commit记录号]
```

#### 情况三：回退之后，又需返回到最近更新的版本

```bash
// 查询近期执行命令，获取ID简称
$ git reflog
// 回退
$ git reset --hard [580361e]
```

## 9 分支的合并

> 参考 [Git 分支 - 分支的新建与合并](https://git-scm.com/book/zh/v2/Git-%E5%88%86%E6%94%AF-%E5%88%86%E6%94%AF%E7%9A%84%E6%96%B0%E5%BB%BA%E4%B8%8E%E5%90%88%E5%B9%B6)

**Figure 21. 基于 `master` 分支的紧急问题分支 `hotfix branch`**

你可以运行你的测试，确保你的修改是正确的，然后将 `hotfix` 分支合并回你的 `master` 分支来部署到线上。 你可以使用 `git merge` 命令来达到上述目的：

```console
$ git checkout master
$ git merge hotfix
Updating f42c576..3a0874c
Fast-forward
 index.html | 2 ++
 1 file changed, 2 insertions(+)
```

在合并的时候，你应该注意到了“快进（fast-forward）”这个词。 由于你想要合并的分支 `hotfix` 所指向的提交 `C4` 是你所在的提交 `C2` 的直接后继， 因此 Git 会直接将指针向前移动。换句话说，当你试图合并两个分支时， 如果顺着一个分支走下去能够到达另一个分支，那么 Git 在合并两者的时候， 只会简单的将指针向前推进（指针右移），因为这种情况下的合并操作没有需要解决的分歧——这就叫做 “快进（fast-forward）”。

## 10 Git私有仓库提交汇总

### ① First Type：本地初始化

```
第一步：git init 初始化项目文件夹 
第二步：git add . 键所有文件添加到暂存区 
第三步：git commit -m "first commit"   提交到本地仓库 
第四步：git remote add origin XXX（XXX就是你github或者码云等远程仓库的地址，git branch这个命令可以看到你所在的分支，删除某个仓库地址使用git remote rm origin） 
第五步：git pull 拉取远程分支信息，首次拉取合并信息 
第六步：git push -u -f origin master 提交到远程仓库，这个命令中的 -f 是强制推送，因为远程仓库只有初始化的文件，所以强制推送上去就行了，不加-f 会报当前分支没有远程分支，强制推送可以覆盖master，这样就完成了第一次提交的步骤)
```

### ② Second Type：#首次提交

```
#克隆版本库到本地
git clone http://192.168.3.107:9002/develop/zhong.git
cd zhong
#创建忽略文件（忽略文件自行编辑）
touch .gitignore手动编辑忽略文件（我的忽略列表）
targettarget/**.iml.idea.idea/*logs/*
#把工作时的所有变化提交到暂存区
git add .
#提交代码（后面为注释）
git commit -m '提交代码的注释'
#将代码成功提交到远程库
git push -u origin master

#如果仅仅提交某个文件
git add README.md
git commit -m "add README"
git push -u origin master
```

### ③ Third Type：#代码变动提交

```
#当代码有变动的时候提交 
#（其实是相当于先执行了 git add .   然后再执行了 git commit -m '  '）
git commit -am '注释' 
git push

#新文件提交
git add .
git commit -m '注释'
git push

git add -A 提交所有变化
git add -u 提交被修改(modified)和被删除(deleted)文件，不包括新文件(new)
git add . 提交新文件(new)和被修改(modified)文件，不包括被删除(deleted)文件
```

### ④ Forth Type： #修改远程仓库地址

```
先删后加
git remote rm origin
git remote add origin git地址
修改远程地址后
必须执行一次指定将本地仓库推送到远程仓库，不能直接git push
执行以下命令
git commit -am '注释'
git push -u origin master
```

### ⑤ Fifth Type

```
从其它目录拷贝的代码，先执行清理缓存
git rm -rf --cached 目录
```

<br>

## 11 git clone 默认位置

> [原文](https://blog.csdn.net/SteveZhou212/article/details/124953284)

一般来说，无初始设置 `git clone`会保存在默认的路径

- 同`git`软件安装目录下
- 也可能保存在系统盘的user文件夹
- 同执行`git clone`命令的目录下

1、第一次进入`Git Bash`中，输入该指令：

```
git init
#即可查看clone仓库保存的目标文件夹的大概范围
```

2、如何查看git clone目标仓库的本地路径

在`git bash中`进入你的仓库（cd 后接入你的仓库名）：

```
cd hello-world
git init
```

3、如何指定`git clone`保存路径

先进入对应的文件夹，再`git clone`

> 注意：在`git bash`中我们输入"\“符号时尤其需要注意，直接在路径表示中使用”\“会导致出现该文件夹不存在的错误提示。因此我们必须在路径中使用”\“或”/"符号（除非有额外的设置）

另外，在window系统下，打开进入到想git clone的文件夹内，然后鼠标右键点击"`Git Bash Here`"，也可在git bash 中打开对应的文件夹





<br>

## 12  `.gitignore` 配置

### 12.1 简绍

我们做的每个Git项目中都需要一个“.gitignore”文件，这个文件的作用就是告诉Git哪些文件不需要添加到版本管理中。比如我们项目中的npm包(node_modules)，它在我们项目中是很重要的，但是它占的内存也是很大的，所以一般我们用Git管理的时候是不需要添加npm包的。

### 12.2 常用的规则

```swift
/mtk/ 过滤整个文件夹
*.zip 过滤所有.zip文件
/mtk/do.c 过滤某个具体文件
```

以上规则意思是：被过滤掉的文件就不会出现在你的GitHub库中了，当然本地库中还有，只是push的时候不会上传。
除了以上规则，它还可以指定要将哪些文件添加到版本管理中。

```swift
!src/   不过滤该文件夹
!*.zip   不过滤所有.zip文件
!/mtk/do.c 不过滤该文件
```

#### 1、配置语法：

```bash
 以斜杠`/`开头表示目录；
 以星号`*`通配多个字符；
 以问号`?`通配单个字符
 以方括号`[]`包含单个字符的匹配列表；
 以叹号`!`表示不忽略(跟踪)匹配到的文件或目录；
```

此外，git 对于 .ignore 配置文件是按行从上到下进行规则匹配的，意味着如果前面的规则匹配的范围更大，则后面的规则将不会生效；

#### 2、示例说明

 **a、规则：fd1/***

 说明：忽略目录 fd1 下的全部内容；注意，不管是根目录下的 /fd1/ 目录，还是某个子目录 /child/fd1/ 目录，都会被忽略；

 **b、规则：/fd1/***

 说明：忽略根目录下的 /fd1/ 目录的全部内容；

 **c、规则：**

```
/*
 !.gitignore
 !/fw/bin/
 !/fw/sf/
 说明：忽略全部内容，但是不忽略 .gitignore 文件、根目录下的 /fw/bin/ 和 /fw/sf/ 目录；
```

#### 3、创建.gitignore文件

**1) 常规的windows操作**

- 根目录下创建gitignore.txt；
- 编辑gitignore.txt，写下你的规则，例如加上node_modules/；
- 打开命令行窗口，切换到根目录（可以直接在文件夹上面的地址栏输入cmd回车）；
- 执行命令ren gitignore.txt .gitignore。

**2) 用Git Bash**

- 根目录下右键选择“Git Bash Here”进入bash命令窗口；
- 输入`vim .gitignore`或`touch .gitignore`命令，打开文件（没有文件会自动创建）；
- 按i键切换到编辑状态，输入规则，例如node_modules/，然后按Esc键退出编辑，输入`:wq`保存退出。

如图：

```cpp
# dependencies  npm包文件
/node_modules

# production  打包文件
/build

# misc 
.DS_Store

npm-debug.log*
```

.DS_Store：这个文件是Mac OS X用来存储文件夹的一些诸如自定义图标，ICON位置尺寸，窗口位置，显示列表种类以及一些像窗体自定义背景样式，颜色这样的元信息。默认情况下，Mac OS X下的每个文件夹下应该都会生成一个，包括网络介质存储盘和U盘这样的外部设备。

npm-debug.log：项目主目录下总是会出现这个文件，而且不止一个，原因是npm i 的时候，如果报错，就会增加一个此文件来显示报错信息，npm install的时候则不会出现。

### 12.3 常见问题

**Git忽略规则(.gitignore配置）不生效原因和解决**

如果你不慎在创建 `.gitignore` 文件之前就push了项目，那么即使你在 `.gitignore` 文件中写入新的过滤规则，这些规则也不会起作用，Git仍然会对所有文件进行版本管理。

 简单来说，出现这种问题的原因就是Git已经开始管理这些文件了，所以你无法再通过过滤规则过滤它们。

此时，需要在本地删除相应的文件，然后再 `push` 进行修改

