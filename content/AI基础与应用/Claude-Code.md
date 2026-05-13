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



# 〇 目录

- [一 Claude Code 安装与使用](#一-claude-code-安装与使用)
  - [1 VS Code 插件方式使用](#1-vs-code-插件方式使用)
  - [2 Windows 安装（官方脚本）](#2-windows-安装官方脚本)
  - [3 Claude Code 蓝星安装使用教程（npm 安装）](#3-claude-code-蓝星安装使用教程npm-安装)
  - [4 解决 CC-Switch 无法连接 Doubao-Seed 模型](#4-解决-cc-switch-无法连接-doubao-seed-模型)
- [二 CC-Switch](#二-cc-switch)
  - [1 简介：它解决什么问题](#1-简介它解决什么问题)
  - [2 工作原理：请求如何被”接管”](#2-工作原理请求如何被接管)
  - [3 安装与首次配置（Windows）](#3-安装与首次配置windows)
  - [4 使用方法（常见场景）](#4-使用方法常见场景)
  - [5 注意事项与排障清单](#5-注意事项与排障清单)
- [三 Skills](#三-skills)
  - [1 简介：Skills 是什么](#1-简介skills-是什么)
  - [2 工作原理](#2-工作原理)
  - [3 安装与配置](#3-安装与配置)
  - [4 使用方法](#4-使用方法)
  - [5 自定义与创建自己的 Skill](#5-自定义与创建自己的-skill)
  - [6 常用技能推荐](#6-常用技能推荐)
  - [7 注意事项与安全建议](#7-注意事项与安全建议)
  - [8 总结](#8-总结)

<br>

# 一 Claude Code 安装与使用

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

### 1.1 验证是否切换成功

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

#### 3.1.1 Windows

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

#### 4.3.1 方案 A：从终端启动 VS Code，让插件继承环境变量（推荐）

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



#### 4.3.2 方案 B：写入 Windows“用户环境变量”，让右键打开也生效

如果必须继续用“右键用 VS Code 打开”，需要把以下变量写入 **Windows 用户环境变量**（并完全退出 VS Code 后重开）：

```
ANTHROPIC_BASE_URL = https://ark.cn-beijing.volces.com/api/compatible
ANTHROPIC_AUTH_TOKEN = <你的Token>
ANTHROPIC_MODEL = doubao-seed-2.0-code-preview-latest
```



#### 4.3.3 方案 C：强制把 `xhigh` 改为 `max`（不推荐/不生效）

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



# 二 CC-Switch

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


# 三 Skills 

> 原视频参考（引用）：https://www.bilibili.com/video/BV1BFouBYERu/?spm_id_from=333.1007.top_right_bar_window_custom_collection.content.click&vd_source=ad866fe26d18693e4132a3c33f8fba36

这一章主要讲 Claude Code 的 Skill：它是什么、怎么装别人的、怎么自己写，以及怎么控制“自动触发/手动触发”。

## 1 简介：Skills 是什么

Skill 可以理解成 **“可复用的 Claude Code 能力包”**：把一套稳定的提示词（目标、约束、输出格式）和（可选的）工具调用习惯封装起来，最后以一个 `/skill-name` 的形式对外提供。

它解决的不是“让模型变聪明”，而是三件很实际的事：

- **减少重复解释**：同类任务不用每次重新讲一遍规则。
- **输出更一致**：尤其是团队协作场景（PR 描述、Commit message、代码审查口径）。
- **降低误操作**：把能做什么、不能做什么写在 Skill 里，比临场口头约束更稳。

如果你经常让 Claude 做这些事：写单测模板、扫一遍改动的风险点、把一段操作流程标准化成步骤清单……都很适合做成 Skill。

## 2 Skill 和 Plugin 的区别

很多人会把 Skill 和 Plugin 混在一起，简单记：

- **Skill 更偏“怎么说/怎么做”**：核心是提示词、规则、流程化输出。
- **Plugin 更偏“能连什么/能调用什么”**：更像集成外部能力（工具、服务、权限、鉴权）。

更直白一点：

- Skill 通常很轻，**复制文件就能跑**，迁移成本低。
- Plugin 通常更重，**需要安装/配置/更新**，像是装Skills的容器，有时还要处理版本兼容。

管理上也有差别：Skill 常见就是本地文件级别的启用/禁用；Plugin 往往需要用插件命令（例如 `/plugin ...`）去安装、升级或卸载。

## 3 安装他人的 Skill

安装 Skills 的目标目录，分为：

- 项目级Skills：项目中的 `.claude` 文件夹下，安装skills文件夹下。适合项目强相关的技能。
- 用户级Skills：`user/.claude/skills`，应用于项目无关的通用技能。

> 关于`npx`安装后，自动下载到 `C:\Users\wangh\.agents` 的问题：
>
> 最简单的解决方案就是直接复制到 `.claude`  的相应目录下，但是这样不能够自动化执行复杂任务。



装别人的 Skill，常见就三类：

- **命令安装（最省事）**：适合第一次装、想要交互式选择/安全扫描的。
- **手动复制（最可控）**：适合你想完全确认内容、或只想装某一个 Skill。
- **插件安装（偏生态/可更新）**：适合对方明确以 plugin 形态发布、你也希望它按插件方式管理。

### 3.1 命令安装

第一次装的时候，基本就是一条命令起步（Windows PowerShell）：

```powershell
npx skills add https://github.com/vercel-labs/skills --skill find-skills
```

典型交互过程会长这样：

1. **提示安装 skills 包**（第一次运行常见）：

   ```text
   Need to install the following packages:
   skills@1.5.6
   Ok to proceed? (y)
   ```

   输入 `y` 继续。

2. **选择要安装的 skill**：

   - 它会扫描仓库，列出能装的 skills
   - 你这里选的是 `find-skills`

3. **选择安装到哪些 agent**（它会列一堆：Amp/Cursor/Cline…）：

   - 不想纠结就选 **Universal (.agents/skills)**
   - 这意味着“通用安装”，多数支持 skills 的工具都会看到它

4. **选择安装范围（scope）**：

   - `Global`：安装到 `~\.agents\skills\...`（全局生效）
   - `Local/Project`（如果工具支持）：只对当前项目生效（更干净）

5. **确认安装摘要与风险扫描**：

   - 会给你一个 Summary（装到哪里、会覆盖哪些）
   - 还会给一个 Risk Assessments（例如 Snyk/Socket 的结果）

6. **Proceed with installation?** → 选 `Yes`

安装完成后，你通常能在输出里看到类似路径：

```text
✓ find-skills (copied)
→ ~\.agents\skills\find-skills
```

验证是否装成功（建议两步）：

- 打开 Claude Code，输入 `/skills` 看列表里有没有出现
- 直接跑一次 `/find-skills`（或对应 skill 的命令名），看它是否能正常返回

### 3.2 手动复制（最稳、最容易排障）

如果你不想走命令安装，手动复制也行：

1. 从 GitHub 下载/克隆 skill 仓库。
2. 找到对应 skill 的文件夹（一般一个 skill 一个目录）。
3. 复制到你的 skills 目录（不同工具位置不同，但多数会落在：`~/.agents/skills/` 或项目内的 `.agents/skills/`）。
4. 回到 Claude Code，输入 `/skills` 确认已加载。

### 3.3 插件安装

如果对方是按 plugin 形态发布的，或者你希望它跟插件生态一起升级/卸载，就走插件命令：

```text
/plugin install <plugin-name-or-url>
```

一般来源分两种：

- **官方市场**：质量更稳、踩坑少。
- **第三方市场**：量大但参差，建议先看 README/源码，再装。

> 注意：Skill 和 Plugin 是两套体系，不是所有 Skill 都能直接 `/plugin install`。



### 3.4 命令安装的默认目录问题解决

Claude Code（你的环境）**只会从** `C:\Users\wangh\.claude\skills` 扫描 skills；而 `npx skills add` 实际把 skills 放在 `C:\Users\wangh\.agents\skills`。所以关键不是“能不能访问 `.agents`”，而是**扫描入口目录固定了**。

在这种情况下，最直接、最稳的办法是让这两个路径变成同一个目录（用 Windows 的目录联接 / junction）。你在 CMD 里按下面做即可。

#### 方案（推荐）：把 `.claude\skills` 联接到 `.agents\skills`

让 Claude 扫描的目录实际指向 skills CLI 安装的目录。

**0) 先看两边是否已存在内容（CMD）**

```bat
dir C:\Users\wangh\.claude\skills
dir C:\Users\wangh\.agents\skills
```

**1) 如果 `.claude\skills` 里有你要保留的东西，先搬到 `.agents\skills`**

```bat
mkdir C:\Users\wangh\.agents\skills
robocopy C:\Users\wangh\.claude\skills C:\Users\wangh\.agents\skills /E /MOVE
```

**2) 删除旧的 `.claude\skills` 目录（必须为空才能建 junction）**

```bat
rmdir /S /Q C:\Users\wangh\.claude\skills
```

**3) 创建 junction（CMD）**

```bat
mklink /J C:\Users\wangh\.claude\skills C:\Users\wangh\.agents\skills
```

**4) 验证**

```bat
dir C:\Users\wangh\.claude\skills
```

你应当能在输出里看到它是 `<JUNCTION>`，并且内容就是 `.agents\skills` 的内容。

------

#### 反向联接也可以（看你更想“以谁为准”）

如果你更希望“真实文件都落在 `.claude` 下”，也可以反过来：

- 让 `C:\Users\wangh\.agents\skills` junction 到 `C:\Users\wangh\.claude\skills`

命令就是把第 3 步改成：

```bat
mklink /J C:\Users\wangh\.agents\skills C:\Users\wangh\.claude\skills
```

但这只有在 `skills` CLI **不介意**把内容写到 junction 目标时才行（一般没问题）。
 你刚才说“安装目录固定在 `.agents\skills`”，所以我倾向于**第一种（让 `.claude\skills` 指向 `.agents\skills`）**，成功率最高。

------

#### 全局安装一些通用 skill

这套联接建立后，你继续用：

```bat
npx skills add <repo> -g --skill xxx
```

skills 会照常装进 `C:\Users\wangh\.agents\skills`，而 Claude Code 通过 `C:\Users\wangh\.claude\skills` 看到同一份内容。





## 4 手动创建自己的 Skill

自己写 Skill，核心就是两件事：

1. **把“你脑子里的要求”写成稳定的规则**（输入是什么、输出长什么样、禁止做什么）。
2. **把它封装成 Claude Code 能识别的文件结构**。

### 4.1 skills 的文件结构

不同作者的组织方式会不一样，但你只要抓住一个原则：**一个 skill = 一个目录**，目录里放“入口提示词 +（可选）配置/资源”。

下面给一个“最小可用”的结构示例，你照着建也能跑（名字随便取）：

```text
find-skills/
  README.md              # 可选：写清楚用途/用法/边界
  prompt.md              # 核心：入口提示词（你希望 Claude 怎么做）
  config.json            # 可选：触发/权限相关配置（看你使用的 skill 框架是否支持）
  examples/
    input.md             # 可选：你常给的输入长什么样
    output.md            # 可选：你希望的输出长什么样
```

你用 `npx skills add ...` 这类命令安装后，往往会看到它被复制到全局目录，例如：

```text
~/.agents/skills/find-skills
```

在 Windows 上对应大概率是：

```text
C:\Users\<你>\.agents\skills\find-skills
```

如果你想做“项目级别隔离”（只在某个仓库里生效），常见放置方式是把 skill 放到项目的：

```text
<repo>/.agents/skills/
```

最后说清楚 `prompt.md` 应该写啥：你只要把这 4 个信息写全，skill 就已经很能用了：

- 目标：一句话说明它要解决什么
- 输入：你会提供什么材料（代码、日志、diff、需求）
- 输出：你希望的格式（列表/表格/分段）
- 禁止项：比如不许改文件、不许联网、不许跑命令

### 4.2 用提示词引导写 Skill

写 Skill 的提示词不要写成“聊天”，而是写成一份 **固定流程 + 固定输出** 的说明书。最实用的写法就是：目标 → 输入 → 输出 → 规则/禁止项。

下面给你两个能直接照抄改的例子，一个是“只读型”（安全，适合默认自动触发），一个是“有副作用型”（建议只手动触发）。

#### 例子 A：只读型 Skill（代码变更快速审查）

用途：你给它一段 diff 或者改动描述，它输出一个固定格式的审查结果（风险点/建议/测试清单）。

```markdown
# 角色
你是一个严格的代码审查员，只根据我提供的改动材料判断，不要猜测仓库里其他文件。

# 输入
我会提供：
- git diff（优先）或
- 文件片段 + 我自己的改动说明

# 任务目标
输出一份“可直接粘到 PR 评论区”的审查结果。

# 输出格式（必须严格按这个顺序）
1) Summary：用 1-2 句话概括改动意图
2) Risks：列出可能的风险点（按严重程度从高到低）
3) Suggestions：给出可操作的修改建议（用 bullet）
4) Test Plan：给出我应该怎么测（用 checklist）

# 规则
- 不要运行命令，不要改文件
- 只基于输入内容判断；缺信息就明确写“需要补充：xxx”
- 发现安全问题（注入、越权、泄露、路径遍历等）要单独标出来
```

使用方式（示例）：

1. 你手动复制一段 diff 给 Claude Code
2. 调用该 skill：`/review-diff`（skill 名以你实际创建为准）

#### 例子 B：有副作用型 Skill（生成 commit message）

用途：它会根据你贴的变更说明生成 commit message；如果你还想让它“自动执行 git commit”，就属于强副作用，建议拆成两步（先生成，再由你确认执行）。

```markdown
# 任务
根据我提供的变更点，生成一条符合团队规范的 git commit message。

# 输入
我会给你：
- 改动点列表（必填）
- 可选：约定的 commit 前缀（feat/fix/chore/docs/refactor/test）

# 输出
只输出 commit message，使用下面模板：

<type>: <一句话说明>

- <关键点1>
- <关键点2>

# 规则
- 不要包含文件路径细节（除非我要求）
- 不要夸张措辞，不要写“优化/重构”这种空话，必须落到具体变化
- 不要运行任何 git 命令；除非我明确说“现在可以提交”
```

使用方式（建议流程）：

1. 你先在终端跑 `git diff`，把“核心改动点”用 3-5 条 bullet 总结贴给 Claude
2. 调用 skill 生成 message
3. 你确认后，再自己执行 `git commit -m "..."`



> 小技巧：你写 skill 时，如果发现它输出经常跑偏，通常是“输出格式不够硬”。把输出部分写成“必须严格按这个顺序/这个字段输出”，稳定性会明显好很多。
>

### 4.3 用内置引导创建（/skill-create）

如果你不想手写结构，可以用 Claude Code 的引导式技能（例如 `/skill-create` 这类内置能力）按问题一步步填出来。它更像“脚手架”，适合第一次上手。

## 5 控制 Skill 的触发行为

Skill 触发分两种：自动触发和手动触发。

### 5.1 自动触发：原理是什么

自动触发不是“规则引擎”，更像是：Claude 在对话里看到上下文后，判断“现在用哪个 Skill 更合适”。

所以如果你希望它触发稳定，Skill 里要把 **适用边界**写清楚：

- 适用场景（例如：只在 PR review、只在写测试、只在改配置时）
- 不适用场景（例如：不要在用户只是闲聊/问概念时触发）

### 5.2 手动触发：适合有副作用的 Skill

只要这个 Skill 可能产生副作用（改文件、跑命令、发请求、删除内容），我建议默认做成 **只能手动触发**：你输入 `/xxx` 才执行。

常见控制手段包括：

- `user-invocable`：只允许用户显式调用。
- `disable-model-invocation`：禁止模型自己触发。

**例子**

还是用一个“整理 import”的 skill 举例：`fix-imports`。

- **user-invocable**：把它标成“用户手动命令”。效果是：你不输入 `/fix-imports`，它就不会跑。
- **disable-model-invocation**：就算模型觉得“现在很适合整理 import”，也不允许它自动触发；但你手动 `/fix-imports` 仍然可以用。

下面是两段配置的“写法示意”（字段名以你使用的 skill 框架为准，但意思就是这个意思）：

**写法 A：只允许用户手动调用（user-invocable）**

```yaml
# config.yaml（示意）
name: fix-imports
user-invocable: true
```

**写法 B：禁用模型自动触发（disable-model-invocation）**

```yaml
# config.yaml（示意）
name: fix-imports
disable-model-invocation: true
```

你可以把它当成两层开关：

- 想让它出现在命令列表里、只给人用：开 `user-invocable`
- 想彻底避免“模型自作主张调用”：开 `disable-model-invocation`

**例子：手动触发也别直接改——加二次确认口令**

仅仅“手动触发”有时还不够（比如手滑点错命令）。更稳的做法是：skill 内部再加一道确认口令。

```markdown
# 执行前置条件
只有当用户输入：确认执行 fix-imports
才允许进入修改阶段。

# 规则
- 只改用户指定文件
- 不要顺手做额外重构
```

这样即使你运行了 `/fix-imports`，它也会先停在“等待确认”，不会直接动文件。

## 6 Skill 的查看和管理

两个最常用的入口：

- 在对话框里输入 `/`：会弹出可用命令列表（包括 skills）。
- 输入 `/skills`：查看当前能用的 Skill，以及它们的来源/状态。

如果你装了一堆 Skill，建议定期清一下：留下你真正常用的，其他先关掉，不然列表会越来越长。

## 7 Skill 的停用和删除

- Skill：一般可以 **停用**（先别删，确认不再用再删），或者直接删除对应文件。
- Plugin：通常要走插件命令来卸载（例如 `/plugin ...`），因为它可能还带依赖、配置、版本信息。

经验上：

- 只是试用 → 先停用。
- 已确认不再需要 → 再删除/卸载。

## 8 找优质 Skill 的三种渠道

我个人会按“可信度”从高到低这样找：

1. **Claude Code 内置 /plugin**（官方/规范化渠道，省心）
2. **社区脚本/集合**：比如 `agentskill.sh` 这种汇总脚本（装之前先看内容）
3. **第三方 Skill 市场/导航**：例如 https://sofindai.com/categories

不管从哪来，建议你保持一个习惯：

- **先看 Skill 到底会不会动你的代码/环境**（有没有工具调用、有无副作用）。
- 能手动触发就别让它自动触发；能只读就别给它写权限。



## 9 优质Skill推荐

find-skills：去 `skills.sh` 自动寻找技能。

skill-creator：简而言之，Skills蒸馏方案

superpowers：极其严谨的项目级代码生产方案，代码撰写、测试、代码漏洞检测、需求涵盖性检测

GStack：内置23个专家（CEO、视觉设计师、后端、性能、安全、发布等），跑通才值钱，深度缺陷识别。

```
/office-hour # 灵魂拷问
/plan-ceo-review # CEO高度审视计划
/review # 资深工程师复核
/qa # 浏览器模拟点击验证
/ship # 自动化发布
```

解决人类开发者与Agent的沟通对不起的问题。解决理解偏差、执行时效、架构隐患。

```
/grill-me # 拷问模型，对话式打磨需求，提炼提示词
/triage # Issue分诊
/improve # 架构问题思考
```

 frontend-design：Anthropic官方出品的前端UI设计，解决千篇一律的AI生成风格，通过产品特效设计风格、色调、布局、交互，提供灵感创意。

ui-ux-pro-max-skill：设计总监，提出设计的条条框框，更专业，提供设计底线和建议，内置160多个行业规则。

baoyu-skills：解决AI创作。生产到发布一体化，是一个多个skills的工具箱，信息图Skill



<br>

# 四 Claude 终极使用技巧

ClaudeCode 是一款由 Anthropic 推出的 AI 驱动开发工具，支持终端交互、多模态处理、任务规划、自定义扩展等能力，能大幅提升开发效率。本教程基于 ClaudeCode 核心功能与真实使用场景，从环境搭建到高级定制，全方位讲解其使用方法。

## 第一部分：环境搭建与基础交互

### 1.1 安装 ClaudeCode

ClaudeCode 支持终端一键安装，步骤如下：

1. 访问 Claude 官方网站，复制专属安装命令（核心格式如下，以官网最新命令为准）；

2. 打开本地终端，执行安装命令：

   ```
   curl -fssL https://claude.ai/install.sh | bash
   ```

   

3. 等待安装完成后，终端输入 `claude` 即可启动工具。

### 1.2 第一个实战案例：制作 HTML 版 Todo 应用

启动 ClaudeCode 后，可直接通过自然语言指令生成代码，示例如下：

> 指令：给我做一个待办软件 todo，使用纯 HTML 实现，包含添加、删除、标记完成功能

ClaudeCode 会直接返回完整的 HTML 代码，无需额外配置，复制即可运行。

### 1.3 三种核心交互模式（默认 / 自动 / 规划）

ClaudeCode 提供三种交互模式，可通过 `shift+tab` 快速切换：

| 模式名称 |                触发方式                |                 核心特点                 |            适用场景            |
| :------: | :------------------------------------: | :--------------------------------------: | :----------------------------: |
| 默认模式 |             启动后默认进入             |  执行敏感操作前会询问用户确认，操作稳妥  |     新手入门、简单代码生成     |
| 自动模式 | `accept edits on` 指令 /shift+tab 切换 |   自动执行指令，无需逐次确认，效率更高   | 熟手日常开发、无敏感操作的任务 |
| 规划模式 |  `plan mode on` 指令 /shift+tab 切换   | 仅专注任务构思与方案规划，不直接修改文件 |  复杂项目重构、多步骤任务设计  |

**小技巧**：输入 `?for shortcuts` 可查看所有模式切换与操作快捷键。

## 第二部分：复杂任务处理与终端控制

### 2.1 执行终端命令（Bash）

ClaudeCode 内置终端命令执行能力，输入 `!` 即可进入 Bash 模式，直接执行各类终端指令，示例：

```
!npm install react typescript vite
!mkdir todo-react-ts
!cd todo-react-ts && vite init
```

### 2.2 规划模式实战：重构 Todo 应用

以「将 HTML 版 Todo 重构为 React+TypeScript+Vite 项目」为例，规划模式使用步骤：

1. 切换至规划模式：`plan mode on`；

2. 按下 `ctrl+g`  进入文本编辑提示词界面，输入重构需求（换行 shift+enter）：

   

   > 将当前的待办应用重构为 React+Typescript+vite 项目，保留所有现有功能，且 UI 风格保持一致

   

3. 规划完成后，Claude 会询问执行方式（直接执行 / 确认后执行 / 修改规划）；

4. 按需切换为自动 / 默认模式执行规划，过程中会单独询问文件写入、终端命令执行等权限，确认后自动完成重构。

### 2.3 跳过所有权限检测（慎用）

若需批量执行指令、无需逐次确认权限，可在启动 ClaudeCode 时添加以下参数：

```
claude --dangerously-skip-permissions
```

启动后自动进入 `bypass permissions on` 模式，所有操作无需权限确认。

> ⚠️ 风险提示：该模式会跳过所有安全校验，仅建议在本地测试环境、无敏感操作时使用。

### 2.4 后台任务管理（BackgroundTasks）

执行如 `!npm run dev` 等阻塞式命令时，ClaudeCode 会被占用，此时可通过以下方式管理后台任务：

1. 按下 `ctrl+b` 将当前命令切换至后台运行；
2. 输入 `/task` 查看所有后台任务列表；
3. 选中对应任务，输入 `k` 可关闭该后台服务（会弹出确认提示）。

## 第三部分：多模态与上下文管理

### 3.1 版本回滚（Rewind）

ClaudeCode 支持回滚自身写入的文件，操作方式二选一：

- 输入指令：`/rewind`；
- 按下两次 `ESC`，进入回滚页面，选择历史回滚点确认回滚。

> 注意事项：
>
> 1. 仅能回滚 ClaudeCode 直接写入的文件，无法回滚终端命令执行结果（如 `npm install` 安装的依赖）；
> 2. 终端操作建议通过 Git 回滚，不要依赖 ClaudeCode 的回滚功能。

### 3.2 图片处理：基于设计图生成代码

若对页面设计不满意，可直接将 Figma/PS 导出的 PNG 图片传给 ClaudeCode，自动识别设计并生成代码：

- 方式 1：将图片拖拽至 ClaudeCode 终端；
- 方式 2：复制图片（ctrl+c）后粘贴（ctrl+v）至终端。

> 补充：图片识别本质是视觉解析，精度有限，如需精准还原设计，建议使用官方 MCP 工具（见 3.3）。

### 3.3 安装 MCP Server（以 Figma 为例）

MCP（Model Context Protocol）是官方提供的精准工具集成协议，以 Figma 为例，安装步骤：

1. 退出当前 ClaudeCode 会话，在终端执行：

   ```
   claude mcp add --transport http figma https://mcp.figma.com/mcp
   ```

   

2. 重新启动 ClaudeCode，输入 `/mcp` 管理 MCP 服务器，选择 `figma` 完成配置；

3. 若需恢复之前的会话，输入 `/resume` 即可。

### 3.4 恢复历史会话（Resume）

两种方式恢复之前的开发会话，无需重新输入指令：

- 启动 ClaudeCode 时：`claude -c`（`-c` 是 `continue` 的缩写）；
- 启动后输入指令：`/resume`。

### 3.5 使用 MCP 工具还原 Figma 设计稿

1. 输入 `/mcp` 打开 MCP 工具列表，选中 `figma` 并完成鉴权（按提示绑定 Figma 账号）；
2. 输入 `view tools` 可查看 Figma MCP 提供的所有工具（如设计稿解析、参数提取等），按 `ESC` 退出工具列表；
3. 复制 Figma 设计稿的分享链接，粘贴至 ClaudeCode 终端，工具会自动调用并提取设计稿的尺寸、配色、布局等参数，生成精准的前端代码。

### 3.6 上下文压缩与清除

ClaudeCode 会缓存会话上下文，可通过以下指令管理：

- 压缩上下文：

  ```
  /compact
  ```

  （可指定保留重点，如 ）；

  ```
  /compact 重点保留用户需求
  ```

  

  - 按下 `ctrl+o` 可查看压缩后的上下文，再次按 `ctrl+o` 返回；

  

- 清除上下文（新建任务）：`/clear`（清除当前会话所有缓存，适合启动全新项目）。

### 3.7 项目记忆文件（CLAUDE.md）

解决「/clear 后丢失项目核心信息」的问题，实现项目级永久记忆：

1. 输入 `/init` 生成项目根目录的 `CLAUDE.md` 文件（类似全局 System 提示词）；
2. 手动编辑 `CLAUDE.md`，写入项目需求、技术栈、规范等核心信息；
3. 输入 `/memory` 可快速打开该文件，选择「Project memory（项目级别）」或「User memory（全局级别）」；
4. 即使执行 `/clear`，`CLAUDE.md` 中的内容仍会保留，ClaudeCode 会持续参考。

## 第四部分：高级功能扩展与定制

### 4.1 Hook（钩子）：自定义工具执行逻辑

Hook 允许在工具执行「前 / 后 / 失败后」触发自定义逻辑（如自动格式化代码），操作步骤：

1. 输入 

   ```
   /hooks
   ```

    打开钩子管理界面，显示可选钩子类型：

   ```
   Hooks
   0 hooks
     1 PreTooluse - Before tool execution（工具执行前）
     2 PostTooluse - After tool execution（工具执行后）
     3 PostTooluse Failure - After tool execution fails（工具执行失败后）
     4 Notification - When notifications are sent（发送通知时）
     5 UserPromptSubmit - When the user submits a prompt（用户提交指令时）
   ```

   

2. 示例：实现代码编写后自动格式化

   - 选择 `2 PostTooluse`；

   - 点击 `add new matcher`，匹配动作（如 `write|Edit`，表示写入 / 编辑文件后触发）；

   - 点击 `add new hook`，输入格式化指令：

     

     ```
     jq -r 'tool_input.file_path' | xargs prettier --write
     ```

     

   - 选择钩子生效范围（用户级别 / 项目级别 / 本地项目级别，本地级别会被 Git 忽略）。

   

### 4.2 AgentSkill：快捷任务模板

AgentSkill 是简化版任务模板，无需复杂配置，直接创建对应文件即可生效，示例：

> 创建 `daily-report.md` 文件，写入「每日开发报告生成规则」，ClaudeCode 会自动识别并作为 Skill 调用。

### 4.3 SubAgent：独立上下文子代理

SubAgent 是拥有独立上下文的子代理，适合处理「与主上下文关联小、影响大」的任务，创建步骤：

1. 输入 `/agent` 打开代理管理界面；

2. 选择 `create new agent`，，设置：

   - 生效范围（用户 / 项目 / 本地）；
   - 创建方式（Claude 自动生成 / 手动配置）；
   - 可用工具（All tools/Readonly tools 等）；
   - 代理标识（颜色、名称）；
   - 功能描述（如「专门处理 UI 组件生成的子代理」）；

   

3. 创建完成后，可像调用 Skill 一样触发 SubAgent，由大模型自动调度。

### 4.4 Skill 与 SubAgent 的核心区别

|   特性   |                            Skill                             |                           SubAgent                           |
| :------: | :----------------------------------------------------------: | :----------------------------------------------------------: |
|  上下文  |                  完全继承并共享主代理上下文                  |                 独立上下文，不共享主代理缓存                 |
| 适用场景 | 与主上下文关联大、对上下文影响小的任务（如代码注释、简单重构） | 与主上下文关联小、对上下文影响大的任务（如独立组件开发、第三方工具集成） |
| 结果处理 |                       直接融入主上下文                       |               执行完成后将最终结果提交给主代理               |

### 4.5 Plugin（插件）：一键安装功能合集

Plugin 是 Skills、Hooks、SubAgent 的打包合集，支持一键安装，操作步骤：

1. 输入 `/plugin`， 进入插件管理器，显示三个标签：

   - `discover`：发现官方 / 社区插件；
   - `installed`：已安装插件管理；
   - `Marketplaces`：插件市场；

   

2. 选中目标插件，选择生效范围（用户 / 项目 / 本地），点击安装即可一键部署所有集成功能。

## 注意事项

1. 权限相关：`--dangerously-skip-permissions` 仅建议测试环境使用，生产环境需保留权限确认；
2. 回滚限制：终端命令（如 `npm install`）的结果无法通过 ClaudeCode 回滚，需依赖 Git；
3. MCP 工具：不同平台（如 Figma）的 MCP 需单独鉴权，确保账号权限充足；
4. 项目记忆：`CLAUDE.md` 建议纳入 Git 版本管理，避免核心信息丢失。
