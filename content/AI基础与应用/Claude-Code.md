---
title: Claude Code
description: Claude Code 的安装与使用（含 VS Code 插件与 CC-Switch）
urlname: Claude-Code
date: 2026-01-07 21:23:47
tags:
  - 大模型
  - AI工具
categories:
  - AI基础与应用
draft: false
---

# Claude Code

## 〇 目录

- [一 Claude Code 安装与使用](#一-claude-code-安装与使用)
  - [1 VS Code 插件方式使用](#1-vs-code-插件方式使用)
  - [2 Windows 安装（官方脚本）](#2-windows-安装官方脚本)
  - [3 Claude Code 蓝星安装使用教程（npm 安装）](#3-claude-code-蓝星安装使用教程npm-安装)
  - [4 解决 CC-Switch 无法连接 Doubao-Seed 模型](#4-解决-cc-switch-无法连接-doubao-seed-模型)
- [二 CC-Switch](#二-cc-switch)
  - [1 简介：它解决什么问题](#1-简介它解决什么问题)
  - [2 工作原理：请求如何被“接管”](#2-工作原理请求如何被接管)
  - [3 安装与首次配置（Windows）](#3-安装与首次配置windows)
  - [4 使用方法（常见场景）](#4-使用方法常见场景)
  - [5 注意事项与排障清单](#5-注意事项与排障清单)

<br>

## 一 Claude Code 安装与使用

## 1 VS Code 插件方式使用

> 说明：如果你已经配置好 CC-Switch，并且 VS Code 的 Claude Code 插件能够正确读取到 `ANTHROPIC_BASE_URL` / `ANTHROPIC_AUTH_TOKEN` 等环境变量，那么通常无需再单独登录 Anthropic。

1. 安装扩展：`Claude Code for VS Code`（并确保已安装 Git Bash / Git for Windows）。

2. 打开 VS Code 设置，找到：扩展 → Claude Code → Environment Variables（对应 `settings.json`），写入环境变量。

   - 推荐使用 `ANTHROPIC_BASE_URL` + `ANTHROPIC_AUTH_TOKEN`
   - `ANTHROPIC_API_KEY` 仅在部分兼容实现中出现；优先以 Claude Code 官方变量名为准

   ```json
   {
     "claudeCode.preferredLocation": "panel",
     "claudeCode.environmentVariables": [
       {
         "name": "ANTHROPIC_BASE_URL",
         "value": "https://open.bigmodel.cn/api/pass/v4"
       },
       {
         "name": "ANTHROPIC_AUTH_TOKEN",
         "value": "<你的 Token>"
       }
     ],
     "claudeCode.disableLoginPrompt": true
   }
   ```

3. 在 Claude Code 内输入 `/config`，确认 `Disable Login Prompt` 的值与预期一致。

   - 如果你使用的是 CC-Switch，一般保持 `disableLoginPrompt=true` 更省事
   - 若仍被强制登录，优先检查是否确实走到了你配置的 `ANTHROPIC_BASE_URL`

### 验证是否切换成功

在 Claude Code 里询问“你是谁”（或运行 `/status`）。如果你期望走代理/中转并映射到特定模型（例如 Sonnet / Doubao），建议做一次终极验证：

1. 打开 CC-Switch 的“日志”页面
2. 清空所有日志
3. 在 Claude Code 中发送一条消息
4. 回到 CC-Switch 的日志页面，查看是否有新的日志条目出现
   - ✅ **有日志**：说明请求已经经过 CC-Switch；如果模型不对，检查“模型映射/默认模型”的设置
   - ❌ **无日志**：说明请求没有经过 CC-Switch，需要重新检查环境变量/插件配置（`ANTHROPIC_BASE_URL` 等）


## 2 Windows 安装（官方脚本）

> 参考[此处](https://www.bilibili.com/video/BV1Q1meBiEBR/?spm_id_from=333.337.search-card.all.click&vd_source=ad866fe26d18693e4132a3c33f8fba36)，对应的[文档](https://www.yuque.com/yuqueyonghusemeje/rlcuu5/uw39myflbe6o355w?#)
>
> 更全的一个[视频](https://www.bilibili.com/video/BV1TQCtBeER3/?spm_id_from=333.337.search-card.all.click&vd_source=ad866fe26d18693e4132a3c33f8ffba36)和文档：[【创哥的AI 实验室】超纳米级 Claude Code 安装教程（100%成功安装版）](https://xinyouduzhong.feishu.cn/wiki/IJC0wM51bi4RJekboq4cOBZcnCJ)

### 2.1 设置网络代理环境变量（可选）

如果你使用的是系统代理的 **TUN 模式**，这一段通常可以跳过。

打开 PowerShell，设置网络代理环境变量：

```powershell
$env:https_proxy = "http://127.0.0.1:7897"; $env:http_proxy = "http://127.0.0.1:7897";
```

把 `7897` 换成你自己的代理端口。

> Windows 设置：搜索 proxy → 更改手动代理服务器设置 → 手动设置代理（确保开启） → 端口号 7897

### 2.2 安装 Claude Code

CMD 的安装命令如下（国内网络环境可能拉取失败）：

```cmd
curl -fsSL https://claude.ai/install.cmd -o install.com && install.cmd && del install.cmd
```

更推荐 PowerShell：

```powershell
irm https://claude.ai/install.ps1 | iex
```

安装完成后会提示类似信息：

```powershell
√ Claude Code successfully installed!
  Version: 2.0.67
  Location: C:\Users\Zhang\.local\bin\claude.exe

‼ Setup notes:
  • Native installation exists but C:\Users\Zhang\.local\bin is not in your PATH.
```

按提示把 `C:\Users\<你>\.local\bin` 加入 PATH，随后重启终端。

如果因策略限制无法执行脚本，可在当前 PowerShell 会话临时放开权限：

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass -Force
```

### 2.3 解决地区限制 / 无法连接（可选）

如果运行 `claude` 时出现类似报错：

```text
Unable to connect to Anthropic services
Failed to connect to api.anthropic.com
```

可以先在同一个 PowerShell 会话里设置代理：

```powershell
$env:https_proxy = "http://127.0.0.1:7897"; $env:http_proxy = "http://127.0.0.1:7897";
```

再重新执行 `claude`。

<br>

### 2.4 配置中转站（示例）

> 这一段用于“你有一个 Anthropic-compatible 中转站”的场景。把 token 换成你自己的。

```powershell
$env:ANTHROPIC_BASE_URL = "https://yunwuapi.com"
$env:ANTHROPIC_AUTH_TOKEN = "<你的 Token>"
```

验证是否生效：

```powershell
echo $env:ANTHROPIC_BASE_URL
echo $env:ANTHROPIC_AUTH_TOKEN
```


## 3 Claude Code蓝星的安装使用教程

> [!note] 来自Claude Code蓝星的安装使用教程

### 3.1 安装方式（Windows）

> 核心思路：先装 Node.js（建议 v18 ~ v20），再用 npm 全局安装 Claude Code。

#### Windows

**系统要求**

- Windows 10 / 11
- Node.js：推荐 v18 ~ v20+（不建议安装 v24/v25+ 这类过新版本）

**安装步骤**

1. 安装 Node.js：访问 <https://nodejs.org/> 下载推荐版本并安装。
2. 验证 Node.js：

   ```bash
   node -v
   ```

3. 验证 npm：

   ```bash
   npm -v
   ```

   - 如果提示 `npm not found`：关闭当前终端，重新打开一个新的 CMD/PowerShell 窗口再试。

4. 安装 Claude Code：

   ```bash
   npm install -g @anthropic-ai/claude-code
   ```

5. 验证安装：

   ```bash
   claude --version
   ```

6. 常见报错：

   - 若出现：`Error: Claude Code on Windows requires git-bash`
   - 解决：安装 Git for Windows（自带 git-bash）：<https://git-scm.com/downloads/win>，安装后重启终端，再验证：

     ```bash
     git --version
     ```



### 3.2 API Key 创建与环境变量配置（蓝星直连）

#### 3.2.1 在网站创建 Key

1. 注册并登录账号。
2. 左侧菜单进入：**令牌管理** → **添加令牌**。
3. 在弹窗中配置：
   - 给分组起一个名字（建议英文）
   - 令牌分组：可选（默认上海服务器）
   - 点击 **提交** 完成创建
4. 回到列表：
   - 点击 **👁 小眼睛** 查看 API Key
   - 点击 **📋 复制** 一键复制

#### 3.2.2 配置环境变量

**统一配置项**

- `ANTHROPIC_AUTH_TOKEN`：你的 API Key
- `ANTHROPIC_BASE_URL`：`https://cc.honoursoft.cn`

**Windows（永久配置）**

- 在系统环境变量中添加上述两项。
- 文档提示：部分环境因权限问题，只配“系统变量”不一定生效；更稳妥做法是给 **Administrator 用户变量**也填入同样的键值。
- 配置后务必 **重启编辑器或终端**。
- 注意：不要使用 `setx /m` 等全局命令写环境变量（出错影响不可逆）。





### 3.3 使用技巧

#### 3.3.1 CLI 常用命令

- 进入交互模式（REPL）：

  ```bash
  claude
  ```

- 执行单次任务后退出：

  ```bash
  claude "task"
  ```

- 查询后退出（避免进入交互模式）：

  ```bash
  claude -p "query"
  ```

- 查看版本：

  ```bash
  claude --version
  ```

- 更新工具：

  ```bash
  claude update
  ```

- 自动生成提交信息：

  ```bash
  claude commit
  ```

#### 3.3.2 交互命令（在 Claude Code 内以 / 开头）

- `/login`：切换 Anthropic 账户
- `/logout`：登出
- `/status`：查看账户与系统状态
- `/model`：选择/更改模型

#### 3.3.3 VS Code 图形界面集成（可选）

1. 安装扩展：**Claude Code for VS Code**（注意不要选错带 Chat 字样的相似插件）。
2. 重启 VS Code（否则配置不生效）。
3. 点击右上角 Claude 图标打开对话窗口；若出现登录界面通常意味着配置有误。





## 4 解决CC-Switch无法连接Doubao-Seed模型

### 4.1 问题描述

- 目标：在 **Claude Code for VS Code** 中通过 **cc-switch** 接入火山引擎 Ark 的 Anthropic-compatible 接口，使用 **Doubao-Seed-2.0-Code（按需付费）**。
- 现象：cc-switch 内置“测试”可以跑通，但 VS Code 里的 Claude 插件仍报错：

  ```
  API Error: 400 The parameter output_config.effort ... expected low, medium, high or max, but got xhigh instead.
  ```
  
  

### 4.2 根因分析

1. **VS Code 是从资源管理器右键启动**（GUI 进程），不会继承终端会话里的环境变量；cc-switch 的“写入通用配置/切换服务”并没有让当前 PowerShell/CMD 的 `ANTHROPIC_BASE_URL` 等变量生效，因此插件请求没有经过预期的 cc-switch 环境。
2. Claude 插件请求体里携带了 `output_config.effort=xhigh`（更高强度档位），但 Ark 的 Anthropic-compatible 接口只接受：`low | medium | high | max`，因此返回 400。

### 4.3 解决方案（推荐顺序）

#### 方案 A：从终端启动 VS Code，让插件继承环境变量（推荐）

在 PowerShell 里临时注入变量，再从同一窗口启动 VS Code：

```powershell
$env:ANTHROPIC_BASE_URL = "https://ark.cn-beijing.volces.com/api/compatible"
$env:ANTHROPIC_AUTH_TOKEN = "<你的Token>"
$env:ANTHROPIC_MODEL = "doubao-seed-2.0-code-preview-latest"
code .
```

在 VS Code 集成终端验证：

```powershell
echo $env:ANTHROPIC_BASE_URL
```

确认不为空后，再在 Claude 插件中重试。



#### 方案 B：写入 Windows“用户环境变量”，让右键打开也生效

如果必须继续用“右键用 VS Code 打开”，需要把以下变量写入 **Windows 用户环境变量**（并完全退出 VS Code 后重开）：

```
ANTHROPIC_BASE_URL = https://ark.cn-beijing.volces.com/api/compatible
ANTHROPIC_AUTH_TOKEN = <你的Token>
ANTHROPIC_MODEL = doubao-seed-2.0-code-preview-latest
```



#### 方案 C：强制把 `xhigh` 改为 `max`（不推荐/不生效）

实践中该方案 **依然不可行**：即使在 cc-switch 中配置了 `rewriteRequestBody`，VS Code 的 Claude Code 插件请求也未必会经过 cc-switch 的重写链路（cc-switch 测试按钮能通过，但插件侧仍会发送 `output_config.effort=xhigh` 并触发 400）。

结论：不要依赖该方案作为最终修复；优先采用 **方案 A/B** 让 VS Code 插件直接继承正确的 `ANTHROPIC_BASE_URL/ANTHROPIC_AUTH_TOKEN`（或在插件设置里显式配置），并在插件侧避免产生不兼容的 `xhigh` 档位。





### 4.4 更简化的解决方案（使用 Doubao Seed）

目标：减少“每次都要在 PowerShell 临时注入变量，并从同一窗口启动 VS Code”的前置操作。

#### 4.4.1 方案 A：写入 VS Code 工作区设置（推荐）

**原理**：`Claude Code for VS Code` 支持在 VS Code 设置中提供环境变量（`claudeCode.environmentVariables`）。写入工作区 `.vscode/settings.json` 后，右键打开 VS Code 也能自动生效，并且只影响当前仓库。

**操作步骤**：

1. 在仓库根目录创建/编辑 `.vscode/settings.json`。

2. 写入（将 token 替换为你自己的；模型名按需调整）：

   ```json
   {
     "claudeCode.environmentVariables": [
       { "name": "ANTHROPIC_BASE_URL", "value": "https://ark.cn-beijing.volces.com/api/compatible" },
       { "name": "ANTHROPIC_AUTH_TOKEN", "value": "<YOUR_TOKEN>" },
       { "name": "ANTHROPIC_MODEL", "value": "doubao-seed-2.0-code-preview-latest" }
     ],
     "claudeCode.disableLoginPrompt": true
   }
   ```

3. 完全退出 VS Code 后重新打开（确保插件重载配置）。

4. 在 VS Code 的终端验证：`echo $env:ANTHROPIC_BASE_URL`。

#### 4.4.2 方案 B：写入 Windows 用户环境变量（全局生效）

**原理**：把 `ANTHROPIC_*` 写入 Windows 用户环境变量后，无论从哪里启动 VS Code/Claude Code（包括资源管理器右键打开），进程都能读取到这些变量。

**操作步骤**：

1. Windows 11：设置 → 系统 → 关于 → 高级系统设置 → 环境变量。
2. 在“用户变量”中新增/修改：
   - `ANTHROPIC_BASE_URL` = `https://ark.cn-beijing.volces.com/api/compatible`
   - `ANTHROPIC_AUTH_TOKEN` = `<YOUR_TOKEN>`
   - `ANTHROPIC_MODEL` = `doubao-seed-2.0-code-preview-latest`
3. 保存后完全退出 VS Code，再重新打开。
4. 验证：在 VS Code 终端执行 `echo $env:ANTHROPIC_BASE_URL`。

#### 4.4.3 方案 C：一键启动脚本（省事且不污染全局）

**原理**：把“临时注入 env + 启动 VS Code”的流程封装成脚本。环境变量只对该脚本启动的 VS Code 进程生效，避免写入全局用户环境变量。

**操作步骤**：

1. 新建脚本 `code-doubao.ps1`（放在你常用目录，例如 `C:\Users\wangh\bin\`）：

   ```powershell
   param([string]$Path = ".")
   
   $env:ANTHROPIC_BASE_URL="https://ark.cn-beijing.volces.com/api/compatible"
   $env:ANTHROPIC_AUTH_TOKEN="<YOUR_TOKEN>"
   $env:ANTHROPIC_MODEL="doubao-seed-2.0-code-preview-latest"
   
   code $Path
   ```

2. 在项目目录运行：

   ```powershell
   C:\Users\wangh\bin\code-doubao.ps1 .
   ```

3. 在 VS Code 里验证：`echo $env:ANTHROPIC_BASE_URL`。



## 二 CC-Switch

## 1 简介：它解决什么问题

CC-Switch 是一个 **Claude Code / Anthropic-compatible** 的“账号与中转管理工具”。在国内网络或多账号/多中转站场景下，它主要用来：

- **集中管理多个服务/账号**：不同平台的 token、不同 base_url
- **一键切换当前生效的服务**：避免手动改一堆环境变量
- **可选的请求改写/模型映射**：把 Claude Code 的请求转到兼容的第三方平台（例如火山 Ark、智谱等），并在需要时做字段兼容
- **提供日志**：用来确认“请求到底有没有走到 CC-Switch”

## 2 工作原理：请求如何被“接管”

Claude Code（以及 VS Code 的 Claude Code 插件）本质上会向 Anthropic API 发送请求。它是否经过 CC-Switch，关键取决于运行环境中是否设置了以下变量：

- `ANTHROPIC_BASE_URL`：把请求的目标地址从 `https://api.anthropic.com` 指向 CC-Switch 或你的中转站
- `ANTHROPIC_AUTH_TOKEN`：鉴权 token（不同中转站的值不同）
- （可选）`ANTHROPIC_MODEL`：指定默认模型名（不同平台的模型命名不同）

当 `ANTHROPIC_BASE_URL` 指向 CC-Switch（或 CC-Switch 指向的兼容网关）时，请求链路变为：

```text
Claude Code / VS Code 插件
  -> ANTHROPIC_BASE_URL 指向的服务（CC-Switch/兼容网关）
    ->（可选）请求改写 / 模型映射
      -> 目标平台（Ark / GLM / 其他 Anthropic-compatible 服务）
```

你可以通过 CC-Switch 的“日志”确认链路是否生效：**有日志 = 请求确实经过了 CC-Switch**。

## 3 安装与首次配置（Windows）

1. 从 GitHub 下载 CC-Switch
   - 项目地址：[cc-switch](https://github.com/farion1231/cc-switch/blob/main/README_ZH.md)
   - Windows 通常下载对应的 `.msi` 安装包

2. 新建/导入一个服务配置（以 GLM 为例）
   - 在平台侧创建 API Key（示例链接：[智谱 AI 开放平台](https://www.bigmodel.cn/usercenter/proj-mgmt/apikeys)）
   - 在 CC-Switch 中填入：`base_url`、`token`、默认模型等信息

3. 切换服务并写入环境
   - 在 CC-Switch 中选择目标服务 → 执行“切换/写入通用配置”（名称以软件界面为准）

## 4 使用方法（常见场景）

### 4.1 在终端里使用 Claude Code（最稳）

在同一个终端会话里设置环境变量后启动：

```powershell
$env:ANTHROPIC_BASE_URL = "<你的 base_url>"
$env:ANTHROPIC_AUTH_TOKEN = "<你的 token>"
claude
```

### 4.2 让 VS Code 插件生效

VS Code 从资源管理器右键启动时，**不会继承**你在 PowerShell 里临时设置的环境变量。要让插件稳定生效，常见两种方式：

- 从终端 `code .` 启动 VS Code（继承当前会话环境变量）
- 把变量写入 Windows “用户环境变量”，并完全退出 VS Code 后重开

## 5 注意事项与排障清单

1. **先确认请求有没有经过 CC-Switch**
   - 清空日志 → 发一条消息 → 看日志是否新增

2. **变量名用官方的**
   - 优先：`ANTHROPIC_BASE_URL` / `ANTHROPIC_AUTH_TOKEN`

3. **VS Code 启动方式会影响环境变量**
   - 右键打开 vs `code .` 启动，效果可能完全不同

4. **兼容性问题优先在“请求体字段/模型名”排查**
   - 例如 Ark 只接受 `output_config.effort: low|medium|high|max`，若插件发 `xhigh` 会 400

5. **避免在文档里明文保存 token**
   - 建议用 `[4m<你的 Token>[0m` / `<YOUR_TOKEN>` 这类占位符；真正配置放系统环境变量或密钥管理器
