# 一 Claude Code安装使用

## 1 账号管理工具

1. cc-switch：从github下载[cc-switch](https://github.com/farion1231/cc-switch/blob/main/README_ZH.md)，找到⾃⼰电脑对应的版本（Windows下载对应的msi文件）
2. 配置账号，这⾥以GLM⼤模型举例
   1. [智谱AI开放平台](https://www.bigmodel.cn/usercenter/proj-mgmt/apikeys)：注册账号、申请Key、实名认证
   2. 在cc-switch中配置key

<br>

## 2 VSCode插件方式使用

> 事实上，在我配置好 cc-switch 后就已经可以用了。但过程可能不完整可能是某一步操作覆盖某些设置。

1. 先安装插件：`Claude Code for VS Code`，也要安装Git-Bash。

2. 打开`VSCode`的`setting`，扩展 - Claude Code - Environment Variables（在setting.json中修改），并修改其中的API-KEY。
