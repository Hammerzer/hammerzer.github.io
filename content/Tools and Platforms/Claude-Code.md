---
title: Claude-Code
description: Claude-Code的安装部署
urlname: Claude-Code
date: 2026-01-07 21:23:47
tags:
  - 大模型
  - AI工具
categories:
  - Tools and Platforms
draft: false
---


# 〇 目录

- Claude Code安装使用

<br>

# 一 Claude Code安装使用

## 1 账号管理工具

1. cc-switch：从github下载[cc-switch](https://github.com/farion1231/cc-switch/blob/main/README_ZH.md)，找到⾃⼰电脑对应的版本（Windows下载对应的msi文件）
2. 配置账号，这⾥以GLM⼤模型举例
   3. [智谱AI开放平台](https://www.bigmodel.cn/usercenter/proj-mgmt/apikeys)：注册账号、申请Key、实名认证
   4. 在cc-switch中配置key

## 2 VSCode插件方式使用

> 事实上，在我配置好 cc-switch 后就已经可以用了。但过程可能不完整可能是某一步操作覆盖某些设置。

1. 先安装插件：`Claude Code for VS Code`，也要安装Git-Bash。

2. 打开`VSCode`的`setting`，扩展 - Claude Code - Environment Variables（在setting.json中修改），并修改其中的API-KEY。

   ```json
   {
       "claudeCode.preferredLocation": "panel",
       "claudeCode.environmentVariables": [
           {
               "name":"ANTHROPIC_BASE_URL",
               "value": "https://open.bigmodel.cn/api/pass/v4"
           },
           {
               "name":"ANTHROPIC_API_KEY",
               "value": "65b99b64ee034b7fb2b1c8c9aa269c25.VSKhnEBVFwnDJgNO"
           }
       ],
       "claudeCode.disableLoginPrompt": true
   }
   ```

   

3. 在Claude Code命令输出`/config`，在设置选项中关闭`Disable Login Prompt`

> 2026-2-8：仅尝试此操作时，无法跳过或链接，必须登录。安装CC-Switch时自动解决。


## 3 Windows安装

> 参考[此处](https://www.bilibili.com/video/BV1Q1meBiEBR/?spm_id_from=333.337.search-card.all.click&vd_source=ad866fe26d18693e4132a3c33f8fba36)，对应的[文档](https://www.yuque.com/yuqueyonghusemeje/rlcuu5/uw39myflbe6o355w?#)
>
> 更全的一个[视频](https://www.bilibili.com/video/BV1TQCtBeER3/?spm_id_from=333.337.search-card.all.click&vd_source=ad866fe26d18693e4132a3c33f8fba36)和文档：[【创哥的AI 实验室】超纳米级ClaudeCode安装教程（100%成功安装版）](https://xinyouduzhong.feishu.cn/wiki/IJC0wM51bi4RJekboq4cOBZcnCJ)

### 3.1 设置网络代理环境变量（如果用的是TUN模式，这一步可以忽略）

打开powershell，先设置网络代理环境变量

```PowerShell
$env:https_proxy="http://127.0.0.1:7897"; $env:http_proxy="http://127.0.0.1:7897";
```

注意要把上面的`7897`换成你自己用的🪄上网工具所用的端口号。

> 设置搜索 proxy -> 选择更改手动代理服务器设置 -> 手动设置代理（确保使用代理服务器开启） -> 端口号 7897


### 3.2 安装Claude

cmd的安装命令如下，但是由于地域限制，请求后的回应不成功报错。

```cmd
curl -fsSL https://claude.ai/install.cmd -o install.com && install.cmd && del install.cmd
```

推荐使用 Powershell：【参考[此处](https://www.bilibili.com/video/BV1Q1meBiEBR/?spm_id_from=333.337.search-card.all.click&vd_source=ad866fe26d18693e4132a3c33f8fba36)】

```Powershell
irm https://claude.ai/install.ps1 | iex
```

Powershell安装后：

```powershell
(base) PS C:\Users\Zhang> irm https://claude.ai/install.ps1 | iex
Setting up Claude Code...

√ Claude Code successfully installed!

  Version: 2.0.67

  Location: C:\Users\Zhang\.local\bin\claude.exe


  Next: Run claude --help to get started

‼ Setup notes:
  • installMethod is native, but claude command not found at C:\Users\Zhang\.local\bin\claude.exe
  • Native installation exists but C:\Users\Zhang\.local\bin is not in your PATH. Add it by opening: System Properties →
   Environment Variables → Edit User PATH → New → Add the path above. Then restart your terminal.


✅ Installation complete!
```

如果网络问题无法安装，可以选择下载 ps1 文件，然后在 PowerShell 中执行该文件，执行前可能需要提权：

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass --Force
```


### 3.3 解决成功安装后的地区限制问题

安装后连接不到原服务器：

```powershell
Welcome to Claude Code v2.1.1
…………………………………………………………………………………………………………………………………………………………

     *                                       █████▓▓░
                                 *         ███▓░     ░░
            ░░░░░░                        ███▓░
    ░░░   ░░░░░░░░░░                      ███▓░
   ░░░░░░░░░░░░░░░░░░░    *                ██▓░░      ▓
                                             ░▓▓███▓▓░
 *                                 ░░░░
                                 ░░░░░░░░
                               ░░░░░░░░░░░░░░░░
       █████████                                        *
      ██▄█████▄██                        *
       █████████      *
…………………█ █   █ █………………………………………………………………………………………………………………

 Unable to connect to Anthropic services

 Failed to connect to api.anthropic.com: ERR_BAD_REQUEST

 Please check your internet connection and network settings.

 Note: Claude Code might not be available in your country. Check supported countries at
 https://anthropic.com/supported-countries
```

先运行一遍代理修改：

```PowerShell
$env:https_proxy="http://127.0.0.1:7897"; $env:http_proxy="http://127.0.0.1:7897";
```

再执行claude命令即可！





<br>

### 3.1 获取API-Key

如果没有apikey，可以上这个网站注册充值获取相应模型的apikey：[传送门](https://yunwuapi.com)



### 3.2 windows powershell 设置中转站

```powershell
$env:ANTHROPIC_BASE_URL = "https://yunwuapi.com"
$env:ANTHROPIC_AUTH_TOKEN = "sk-a6cp3rQxXhGVZCvjY9bHuj8ca1NLeUgEnausXXD9lAyNXIQW"
```

这个auth_token换成你自己的，如果是cmd窗口就把$env: 换成set

然后，查看是否生效

```powershell
echo $env:ANTHROPIC_BASE_URL 
echo $env:ANTHROPIC_AUTH_TOKEN
```



### 3.3 linux，mac设置中转站

```powershell
export ANTHROPIC_BASE_URL = "https://yunwuapi.com"
export ANTHROPIC_AUTH_TOKEN = "sk-a6cp3rQxXhGVZCvjY9bHuj8ca1NLeUgEnausXXD9lAyNXIQW"
```




### 3.4 解决成功安装后的地区限制问题

```powershell
Welcome to Claude Code v2.1.1
…………………………………………………………………………………………………………………………………………………………

     *                                       █████▓▓░
                                 *         ███▓░     ░░
            ░░░░░░                        ███▓░
    ░░░   ░░░░░░░░░░                      ███▓░
   ░░░░░░░░░░░░░░░░░░░    *                ██▓░░      ▓
                                             ░▓▓███▓▓░
 *                                 ░░░░
                                 ░░░░░░░░
                               ░░░░░░░░░░░░░░░░
       █████████                                        *
      ██▄█████▄██                        *
       █████████      *
…………………█ █   █ █………………………………………………………………………………………………………………

 Unable to connect to Anthropic services

 Failed to connect to api.anthropic.com: ERR_BAD_REQUEST

 Please check your internet connection and network settings.

 Note: Claude Code might not be available in your country. Check supported countries at
 https://anthropic.com/supported-countries
```


## 4 Windows安装2：实测可行
