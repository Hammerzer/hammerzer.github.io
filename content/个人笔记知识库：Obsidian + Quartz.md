---
title: 个人笔记知识库搭建指南：Obsidian + Quartz
description: 从零开始搭建基于 Obsidian 和 Quartz 的个人知识库，包含安装部署步骤、注意事项和常见坑点
date: 2026-02-08
tags:
  - Obsidian
  - Quartz
  - 知识管理
  - 部署
---

# 个人笔记知识库搭建指南：Obsidian + Quartz

> 本笔记记录了使用 Obsidian + Quartz 搭建个人知识库的完整过程，包括安装部署、配置优化和遇到的各种坑点。

> 该内容参考自 [Quartz 发布 Github Pages 教程](https://ainightcoder.github.io/8.%E8%BE%93%E5%87%BA/quartz/ce37c3a071735ac529b9573eeb4a3a432a491570)

## 一 📖 什么是 Obsidian + Quartz？

[[Obsidian]] 是一款强大的本地知识管理工具，支持双向链接、Markdown 编辑和丰富的插件生态。

[[Quartz]] 是一个基于 Hugo 的静态站点生成器，可以将 Obsidian 笔记转换成美观的网站，支持：
- 快速构建和部署
- 响应式设计
- 全文搜索
- 双向链接图谱
- GitHub Pages 部署

## 二 🚀 安装部署步骤

### 1. 前置要求

确保已安装以下工具：

| 工具 | 用途 | 下载地址 |
|------|------|----------|
| Git | 版本控制 | https://git-scm.com/ |
| Node.js | 运行环境（需要 v18+） | https://nodejs.org/ |
| Obsidian | 笔记编辑器 | https://obsidian.md/ |

### 2. 克隆 Quartz 项目

```bash
git clone https://github.com/jackyzha0/quartz.git
cd quartz
npm install
npx quartz build # 本地构建
```

### 3. 配置 Quartz

编辑 `quartz.config.ts` 文件，自定义你的站点：

```typescript
const config: QuartzConfig = {
  configuration: {
    pageTitle: "你的站点名称",        // 修改这里
    baseUrl: "yourname.github.io",   // 改为你的GitHub Pages域名
    locale: "zh-CN",                 // 设置为中文
    // ... 其他配置
  }
}
```

### 4. 创建 GitHub Actions 工作流

在项目根目录创建 `.github/workflows/deploy.yml` 文件：

```yml
name: Deploy Quartz site to GitHub Pages

on:
  push:
    branches:
      - main
      - master
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-22.04
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: 'npm'

      - name: Install Dependencies
        run: npm ci

      - name: Build Quartz
        run: npx quartz build

      - name: Setup Pages
        uses: actions/configure-pages@v4

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: public

  deploy:
    needs: build
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### 5. 新建空远程仓库并推送

既然要在 Github Page 中部署，那需要一个空的仓库是必备的：

1. 删除 GitHub 旧仓库 + 新建同名空仓库（网页操作，已确认数据不重要）
	1. 删旧仓库：https://github.com/Hammerzer/hammerzer.github.io → Settings → 最底部删除；
2. 新建仓库：
	- 名称：`hammerzer.github.io`
    - 公开（Public）
    - ❌ 不勾选任何初始化选项（README/.gitignore/ 许可证），创建空仓库。
3. 本地处理（重命名分支 + 推送）
	1. 打开 PowerShell，进入 `quartz-v5` 目录：
```
# 1. 进入本地quartz-v5目录
cd D:\Work_Area\quartz-v5

# 2. 核心：把本地v4分支重命名为main（匹配GitHub新仓库默认分支）
git branch -M v4 main

# 3. 验证分支（此时应显示 * main）
git branch

# 4. 关联新建的空仓库（SSH地址，避443端口坑），远程仓库叫origin
git remote remove origin
git remote add origin git@github.com:Hammerzer/hammerzer.github.io.git

# 5. 提交本地内容（初始化quartz-v5）
git add .
git commit -m "init quartz v5"

# 6. 推送到GitHub（空仓库无冲突，一次成功）
git push -u origin main
```


## 三 ⚙️ GitHub 仓库设置

### 1. 启用 GitHub Pages

1. 打开你的 GitHub Pages 仓库页面
2. 点击 "Settings" 标签
3. 在左侧菜单找到 "Pages"
4. 在 "Source" 部分选择 "GitHub Actions"
5. 保存设置

### 2. 配置 Actions 权限

1. 在 Settings 页面，找到 "Actions" → "General"
2. 确保以下设置：
    - Actions permissions: "Allow all actions and reusable workflows"
    - Workflow permissions: "Read and write permissions"
    - 勾选 "Allow GitHub Actions to create and approve pull requests"

## 四 🚀 部署验证

### 1. 检查部署状态

1. 访问仓库的 "Actions" 标签页
2. 查看最新的工作流运行状态
3. 确保显示绿色的 ✅ 成功标志

### 2. 访问网站

- 等待 5-10 分钟让 GitHub 处理部署
- 访问 `https://你的用户名.github.io`
- 确认网站内容正确显示

## 五 📝日常使用流程

配置完成后，你的日常工作流程：

1. **编辑内容**：在 `content/` 目录下编辑 Markdown 文件
2. **本地预览**：运行 `npx quartz build --serve` 预览效果
3. **提交推送**：
    
    ```BASH
git add .
git commit -m "更新内容描述"
git push github-pages main:main
    ```
    
4. **自动部署**：GitHub Actions 自动构建并部署网站

## 六 🔧 Quartz 配置详解与站点美化

> 本节深入解析 Quartz 的核心配置文件，帮助你打造美观且功能强大的中文技术博客。

### 1. 配置文件概述

Quartz 主要有两个核心配置文件：

| 文件 | 作用 | 主要内容 |
|------|------|----------|
| `quartz.config.ts` | 全局配置 | 站点信息、主题颜色、插件设置 |
| `quartz.layout.ts` | 布局配置 | 页面组件、侧边栏、导航结构 |

### 2. quartz.config.ts 详解

#### 2.1 基本站点配置

```typescript
configuration: {
  pageTitle: "Quartz 4",              // 站点标题
  pageTitleSuffix: "",                 // 标题后缀（如：" | 我的博客"）
  enableSPA: true,                     // 启用单页应用（更流畅的页面切换）
  enablePopovers: true,                // 启用悬停预览（鼠标悬停在链接上显示预览）
  analytics: {
    provider: "plausible",             // 分析服务提供商（可选：plausible, google）
  },
  locale: "en-US",                     // 语言设置（中文改为 "zh-CN"）
  baseUrl: "hammerzer.github.io",     // 站点基础 URL
  ignorePatterns: ["private", "templates", ".obsidian"],  // 忽略的文件/文件夹
  defaultDateType: "modified",         // 默认日期类型（created/modified）
}
```


#### 2.2 主题配置（Theme）

**字体配置**

```typescript
typography: {
  header: "Noto Sans SC",      // 思源黑体（中文标题）
  body: "Noto Sans SC",        // 思源黑体（中文正文）
  code: "Fira Code",           // 带连字符的等宽字体
},
```

**颜色配置**

```typescript
colors: {
  lightMode: {
    light: "#faf8f8",          // 最浅背景色
    lightgray: "#e5e5e5",      // 浅灰色（边框、分隔线）
    gray: "#b8b8b8",           // 灰色（次要文本）
    darkgray: "#4e4e4e",       // 深灰色（主要文本）
    dark: "#2b2b2b",           // 最深色（标题、强调）
    secondary: "#284b63",      // 次要主题色（链接、按钮）
    tertiary: "#84a59d",       // 第三主题色
    highlight: "rgba(...)",    // 高亮背景色
    textHighlight: "#fff23688", // 文本高亮（==文本==）
  },
  darkMode: {
    // 深色模式配色
  },
}
```

> **🎨 中文技术博客配色方案（极简蓝风）**
> ```typescript
> colors: {
>   lightMode: {
>     light: "#ffffff",
>     lightgray: "#e0e0e0",
>     gray: "#9e9e9e",
>     darkgray: "#424242",
>     dark: "#212121",
>     secondary: "#1976d2",      // 蓝色主题（专业、科技感）
>     tertiary: "#64b5f6",
>     highlight: "rgba(25, 118, 210, 0.1)",
>     textHighlight: "#ffeb3b88",
>   },
>   darkMode: {
>     light: "#1e1e1e",
>     lightgray: "#2d2d2d",
>     gray: "#757575",
>     darkgray: "#e0e0e0",
>     dark: "#f5f5f5",
>     secondary: "#64b5f6",
>     tertiary: "#1976d2",
>     highlight: "rgba(100, 181, 246, 0.1)",
>     textHighlight: "#ffeb3b88",
>   },
> }
> ```

#### 2.3 插件配置（Plugins）

| 类型           | 作用             | 常用插件                                   |
| ------------ | -------------- | -------------------------------------- |
| Transformers | 处理 Markdown 内容 | FrontMatter, SyntaxHighlighting, Latex |
| Filters      | 控制生成哪些页面       | RemoveDrafts                           |
| Emitters     | 生成不同类型的页面      | ContentPage, FolderPage, TagPage       |

### 3. quartz.layout.ts 详解

#### 3.1 共享页面组件（Shared Components）

```typescript
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),           // <head> 部分
  header: [],                       // 顶部导航（空数组 = 无顶部栏）
  afterBody: [],                    // 内容区域之后
  footer: Component.Footer({        // 页脚
    links: {
      "GitHub": "https://github.com/Hammerzer",
    },
  }),
}
```

#### 3.2 内容页布局（Content Page Layout）

```typescript
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [              // 内容之前
    Component.Breadcrumbs(),  // 面包屑导航
    Component.ArticleTitle(), // 文章标题
    Component.ContentMeta(),  // 元信息（日期、阅读时间）
    Component.TagList(),      // 标签列表
  ],
  left: [                    // 左侧边栏
    Component.PageTitle(),
    Component.Search(),       // 搜索框
    Component.Darkmode(),     // 深色模式切换
    Component.Explorer(),     // 文件目录树
  ],
  right: [                   // 右侧边栏
    Component.Graph(),       // 双向链接图谱
    Component.TableOfContents(),  // 目录
    Component.Backlinks(),   // 反向链接
  ],
}
```

### 4. 常用组件说明

| 组件                  | 位置    | 作用     | 建议场景        |
| ------------------- | ----- | ------ | ----------- |
| `Search()`          | left  | 全文搜索框  | 强烈推荐        |
| `Darkmode()`        | left  | 深色模式切换 | 强烈推荐        |
| `Explorer()`        | left  | 文件目录树  | 推荐用于知识库     |
| `Graph()`           | right | 双向链接图谱 | 可选，大型站点建议关闭 |
| `TableOfContents()` | right | 文章目录   | 强烈推荐        |
| `Backlinks()`       | right | 反向链接列表 | 可选          |

### 5. 配置应用流程

1. **备份原配置**
```bash
cp quartz.config.ts quartz.config.ts.bak
cp quartz.layout.ts quartz.layout.ts.bak
```

2. **修改配置文件**

3. **本地预览效果**
```bash
npx quartz build --serve
```

4. **确认无误后提交**
```bash
git add .
git commit -m "美化站点配置"
git push
```

### 6. 新增头像组件

> 本节记录了为 Quartz 站点添加头像、微信联系方式和自定义搜索框样式的完整修改过程（2026-02-08）。

#### 6.1 修改目标

1. 在左侧站名下方加入头像
2. 加入微信联系方式
3. 修改搜索框的样式

#### 6.2 修改内容

**新增文件**：

| 文件                                      | 说明                     |
| ----------------------------------------- | ---------------------- |
| `quartz/components/UserProfile.tsx`       | 用户资料组件（头像 + 微信）    |
| `quartz/components/CustomStyles.tsx`      | 自定义搜索框样式              |
| `quartz/static/avatar.png`                | 头像图片（需要手动放置）          |
| `static/README.md`                        | 静态资源目录说明（已废弃，仅作参考）  |

**修改文件**：

| 文件                               | 修改内容                                 |
| -------------------------------- | ------------------------------------ |
| `quartz/components/index.ts`       | 导出 UserProfile 和 CustomStyles 组件        |
| `quartz/layout.ts`                 | 添加组件到布局，更新页脚链接                      |

#### 6.3 UserProfile 组件说明

**功能**：
- 显示圆形头像（80x80px）
- 显示微信图标和微信号
- 支持深色模式
- 头像悬停放大效果

**样式特点**：
- 圆角卡片背景
- 主题色边框
- 阴影效果
- 响应式设计

#### 6.4 CustomStyles 组件说明

**功能**：
- 自定义搜索框边框和圆角
- 聚焦时高亮效果
- 深色模式适配
- 响应式设计

#### 6.5 布局修改

**sharedPageComponents**：
- `afterBody` 添加 `CustomStyles()` 组件

**defaultContentPageLayout**：
- `left` 添加 `UserProfile()` 组件（位于 PageTitle 之前）

**defaultListPageLayout**：
- `left` 添加 `UserProfile()` 组件（位于 PageTitle 之前）

#### 6.6 使用方法

1. **添加头像图片**：将头像图片放在 `quartz/static/avatar.png` ⚠️ 注意路径
2. **修改微信 ID**：编辑 `quartz/components/UserProfile.tsx`，将 `YourWeChatID` 替换为实际微信号
3. **重新构建**：
   ```bash
   npx quartz build
   ```
4. **预览效果**：运行 `npx quartz build --serve`
5. **提交更改**：
   ```bash
   git add .
   git commit -m "添加头像和微信联系方式组件"
   git push
   ```

#### 6.7 静态资源路径问题（重要）

> 本小节记录了头像不显示问题的排查过程和解决方案。

##### 6.7.1 问题描述

头像组件添加成功，但页面上没有显示头像图片。

##### 6.7.2 问题原因

**Quartz 的静态资源处理机制**：

- **错误位置**：`项目根目录/static/` → ❌ 不会被 Quartz 处理
- **正确位置**：`quartz/static/` → ✅ 会被复制到 `public/static/`

Quartz 的静态资源发射器（`quartz/plugins/emitters/static.ts`）只会处理 `quartz/static/` 目录下的文件。

##### 6.7.3 解决方案

将头像文件移动到正确的位置：

```bash
# 从错误位置移动到正确位置
cp static/avatar.png quartz/static/avatar.png

# 重新构建
npx quartz build
```

##### 6.7.4 文件结构对比

```
quartz-v5/
├── quartz/
│   └── static/               ← ✅ 正确位置（会被复制）
│       ├── icon.png
│       ├── og-image.png
│       └── avatar.png        ← 头像文件应放在这里
├── static/                   ← ❌ 错误位置（不会被处理）
│   └── avatar.png
└── public/
    └── static/
        └── avatar.png        ← 构建后复制到这里
```

##### 6.7.5 访问路径

在组件中使用的路径：

```tsx
<img src="/static/avatar.png" alt="头像" />
```

访问路径映射：
- 开发环境：`http://localhost:8080/static/avatar.png`
- 生产环境：`https://hammerzer.github.io/static/avatar.png`

##### 6.7.6 验证方法

构建后检查文件是否被正确复制：

```bash
# 检查构建输出目录
ls public/static/avatar.png

# 如果文件存在，说明静态资源正确复制
# 如果不存在，检查源文件是否在 quartz/static/ 目录下
```

#### 6.8 文件清单

```
quartz-v5/
├── quartz/
│   ├── components/
│   │   ├── UserProfile.tsx    # 新增：用户资料组件
│   │   ├── CustomStyles.tsx   # 新增：自定义样式
│   │   └── index.ts           # 修改：导出新组件
│   └── static/
│       ├── icon.png
│       ├── og-image.png
│       └── avatar.png         # 需要添加：头像图片（⚠️ 正确位置）
├── quartz.layout.ts            # 修改：更新布局
└── static/
    └── README.md              # 说明文档（此目录不会被 Quartz 处理）
```

#### 6.9 注意事项

1. **⚠️ 静态资源路径**：头像文件必须放在 `quartz/static/` 目录，而不是项目根目录的 `static/` 目录
2. **头像图片规格**：建议 200x200px，格式为 PNG/JPG/WEBP
3. **微信 ID 修改**：在 UserProfile.tsx 第 39 行修改
4. **样式自定义**：可在 UserProfile.tsx 和 CustomStyles.tsx 的 CSS 部分调整样式
5. **构建错误**：如果出现 TypeScript 错误，可能是 IDE 类型识别问题，实际构建不受影响
6. **验证静态资源**：构建后检查 `public/static/avatar.png` 是否存在

#### 6.10 修改日志

**日期**：2026-02-08

**修改内容**：
- 创建 UserProfile 组件（显示头像和微信联系方式）
- 创建 CustomStyles 组件（自定义搜索框样式）
- 更新布局配置，添加新组件到左侧边栏
- 解决静态资源路径问题（头像不显示）

**遇到的问题**：
1. 头像文件放在了错误的位置（`static/` 而非 `quartz/static/`）
2. 问题排查过程：检查构建输出、分析 Quartz 静态资源处理机制
3. 解决方案：将头像文件移动到 `quartz/static/` 目录

**经验总结**：
- Quartz 的静态资源发射器只处理 `quartz/static/` 目录
- 验证静态资源是否正确复制的方法：检查 `public/static/` 目录
- 组件中使用 `/static/` 路径访问静态资源

#### 6.9 效果预览

**左侧边栏结构**：
```
┌─────────────────┐
│    [头像]       │ ← UserProfile 组件
│  ┌───────────┐  │
│  │  图片    │  │
│  └───────────┘  │
│   💬 WeChat     │
│  YourWeChatID   │
├─────────────────┤
│ 求知小新        │ ← PageTitle 组件
├─────────────────┤
│ [搜索框] 🌙     │ ← Flex (Search + Darkmode)
├─────────────────┤
│ 📁 目录树       │ ← Explorer 组件
└─────────────────┘
```

### 7. 页面布局调整

#### 7.1 优化用户信息展示组件 (UserProfile)

**修改内容**:
- 新增 `pathToRoot` 导入，用于获取当前页面到根路径的相对路径
- 添加 `baseDir` 变量，通过 `pathToRoot` 函数计算根路径
- 为头像和网站标题添加点击跳转首页的链接功能
- 使用内联样式确保链接无下划线和继承颜色



#### 7.2 优化全局链接样式 (CustomStyles)

**修改内容**:
- 优化了全局链接悬停样式，删除了默认的下划线效果
- 新增了 `.user-profile a:hover` 选择器，专门针对 UserProfile 组件中的链接进行样式设置
- 确保 UserProfile 组件中的链接悬停时不显示下划线

#### 7.3 页面布局调整 (quartz.layout.ts)

**修改内容**:
- 在左侧边栏布局中，注释掉了 PageTitle 组件的引用
- 保留了 UserProfile 组件，实现了类似的功能但更美观的展示

#### 7.4 样式变量调整 (variables.scss)

**修改内容**:
- 调整了侧边栏宽度变量 `$sidePanelWidth` 从 320px 增加到 350px，提供更宽敞的左侧边栏空间
- 该调整影响了桌面端和移动端的布局计算

**代码变更**:
```scss
$sidePanelWidth: 350px; //320px;380px;侧边栏宽度
```

#### 7.6 修复头像路径问题

**问题描述**:
- 推送到 GitHub Pages 后，左侧边栏头像不显示
- 头像路径使用硬编码的 `/static/avatar.png`，导致在某些路径下无法正确加载

**问题分析**:
- 在 `UserProfile.tsx` 组件中，头像路径硬编码为 `/static/avatar.png`
- 当页面不在根路径时，这个绝对路径会导致资源找不到
- 需要使用动态计算的根路径来构建正确的静态资源路径

**修复方案**:

**修改文件**: `quartz/components/UserProfile.tsx`

```tsx
// 原代码
<img src="/static/avatar.png" alt="头像" class="avatar" />

// 修复后代码
<img src={`${baseDir}/static/avatar.png`} alt="头像" class="avatar" />
```

**完整修改过程**:

1. 确保已导入 `pathToRoot` 函数：
   ```tsx
   import { pathToRoot } from "../util/path"
   ```

2. 计算根路径：
   ```tsx
   const baseDir = pathToRoot(fileData.slug!)
   ```

3. 使用动态路径加载头像：
   ```tsx
   <img src={`${baseDir}/static/avatar.png`} alt="头像" class="avatar" />
   ```

**注意事项**:

1. 确保头像文件存在于正确位置：`quartz/static/avatar.png`
2. 如果头像文件名或路径变更，需要同步更新组件中的路径
3. 对于使用不同部署方式的用户，可能需要调整 baseUrl 配置

**修改日志**:
- **日期**: 2026-02-09
- **修改内容**: 修复了 UserProfile 组件中头像路径硬编码问题
- **解决方案**: 使用 pathToRoot 函数动态计算根路径，构建正确的资源路径
- **验证结果**: 本地构建和预览测试通过



### 8. 添加阅读进度条

#### 8.1 功能描述

阅读进度条是一个视觉指示器，显示用户当前在页面中的阅读位置。它会在页面顶部显示一个进度条，随着用户向下滚动页面，进度条会逐渐填充。

#### 8.2 实现步骤

##### 8.2.1 创建阅读进度条组件

**新增文件**：`quartz/components/ReadingProgress.tsx`

```tsx
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

const ReadingProgress: QuartzComponent = () => {
  return (
    <div class="reading-progress">
      <div class="progress-bar"></div>
    </div>
  )
}

ReadingProgress.css = `
.reading-progress {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background: var(--lightgray);
  z-index: 9999;
}

.progress-bar {
  position: fixed;
  top: 0;
  left: 0;
  width: 0;
  height: 3px;
  background: var(--secondary);
  transition: width 0.2s ease;
}
`

export default (() => ReadingProgress) satisfies QuartzComponentConstructor
```

##### 8.2.2 创建阅读进度条脚本组件

**新增文件**：`quartz/components/ReadingProgressScript.tsx`

```tsx
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

const ReadingProgressScript: QuartzComponent = () => {
  return (
    <script dangerouslySetInnerHTML={{
      __html: `
        window.addEventListener('scroll', () => {
          const scrollTop = document.documentElement.scrollTop
          const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
          const progress = (scrollTop / scrollHeight) * 100
          document.querySelector('.progress-bar')?.style.setProperty('width', progress + '%')
        })
      `
    }} />
  )
}

export default (() => ReadingProgressScript) satisfies QuartzComponentConstructor
```

##### 8.2.3 更新组件导出文件

**修改文件**：`quartz/components/index.ts`

```typescript
import Content from "./pages/Content"
// ......
import UserProfile from "./UserProfile"
import CustomStyles from "./CustomStyles"
import ReadingProgress from "./ReadingProgress"
import ReadingProgressScript from "./ReadingProgressScript"

export {
  ArticleTitle,
  Content,
  // ......
  UserProfile,
  CustomStyles,
  ReadingProgress,
  ReadingProgressScript,
}
```

##### 8.2.4 更新页面布局文件

**修改文件**：`quartz.layout.ts`

```typescript
// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [
    Component.ReadingProgress(),
  ],
  afterBody: [
    Component.CustomStyles(),
    Component.ReadingProgressScript(),
  ],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/Hammerzer",
    },
  }),
}
```

#### 8.3 功能实现原理

1. **组件结构**：`ReadingProgress` 组件负责渲染进度条的视觉部分，`ReadingProgressScript` 负责监听滚动事件并更新进度条宽度。
2. **滚动监听**：通过 `window.addEventListener('scroll', ...)` 监听页面滚动事件。
3. **进度计算**：
   - `scrollTop`：页面滚动的垂直距离
   - `scrollHeight`：页面总高度
   - `clientHeight`：浏览器窗口高度
   - 进度 = (scrollTop / (scrollHeight - clientHeight)) * 100%
4. **样式设计**：进度条使用固定定位，始终位于页面顶部，使用主题色作为进度条颜色。

#### 8.4 验证方法

1. 重新构建项目：
   ```bash
   npx quartz build
   ```
2. 预览网站：
   ```bash
   npx quartz build --serve
   ```
3. 检查进度条：在浏览器中打开网站，向下滚动页面，观察顶部进度条是否正常显示和更新。

#### 8.5 注意事项

1. 进度条的高度、颜色和动画效果可以通过修改 `ReadingProgress.css` 中的样式进行自定义。
2. 确保 `ReadingProgressScript` 组件正确导入和导出，否则进度条不会更新。
3. 进度条使用了固定定位，可能会影响页面的其他元素布局，如有需要可以调整样式。


### 9. 优化图片展示

#### 9.1 功能描述

图片展示优化包括以下功能：
- 图片懒加载：提高页面加载速度，只在图片进入视口时加载
- 图片样式优化：添加圆角、阴影和悬停效果
- 响应式设计：确保图片在不同设备上都能良好显示
- 加载动画：图片加载时显示模糊占位图

#### 9.2 实现步骤

##### 9.2.1 添加图片样式优化

**修改文件**：`quartz/components/CustomStyles.tsx`

```scss
/* 图片样式优化 */
img {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  margin: 1rem 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

img:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  transform: translateY(-2px);
}

/* 图片懒加载动画 */
img:not(.loaded) {
  filter: blur(2px);
}

img.loaded {
  filter: blur(0);
  transition: filter 0.3s ease;
}
```

##### 9.2.2 创建图片懒加载组件

**新增文件**：`quartz/components/ImageLazyLoad.tsx`

```tsx
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

const ImageLazyLoad: QuartzComponent = () => {
  return (
    <script dangerouslySetInnerHTML={{
      __html: `
        document.addEventListener('DOMContentLoaded', () => {
          const images = document.querySelectorAll('img:not(.avatar)')
          const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                const img = entry.target as HTMLImageElement
                img.src = img.dataset.src || img.src
                img.classList.add('loaded')
                imageObserver.unobserve(img)
              }
            })
          })
          images.forEach(img => {
            img.dataset.src = img.src
            img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBmaWxsPSIjZjZmNmY2Ii8+CjxyZWN0IHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjIpIi8+Cjx0ZXh0IHg9IjMwIiB5PSIzMCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSJ3aGl0ZSI+5aSn6L+OPC90ZXh0Pgo8L3N2Zz4K'
            imageObserver.observe(img)
          })
        })
      `
    }} />
  )
}

export default (() => ImageLazyLoad) satisfies QuartzComponentConstructor
```

##### 9.2.3 更新组件导出文件

**修改文件**：`quartz/components/index.ts`

```typescript
import Content from "./pages/Content"
import TagContent from "./pages/TagContent"
import FolderContent from "./pages/FolderContent"
import NotFound from "./pages/404"
import ArticleTitle from "./ArticleTitle"
import Darkmode from "./Darkmode"
import ReaderMode from "./ReaderMode"
import Head from "./Head"
import PageTitle from "./PageTitle"
import ContentMeta from "./ContentMeta"
import Spacer from "./Spacer"
import TableOfContents from "./TableOfContents"
import Explorer from "./Explorer"
import TagList from "./TagList"
import Graph from "./Graph"
import Backlinks from "./Backlinks"
import Search from "./Search"
import Footer from "./Footer"
import DesktopOnly from "./DesktopOnly"
import MobileOnly from "./MobileOnly"
import RecentNotes from "./RecentNotes"
import Breadcrumbs from "./Breadcrumbs"
import Comments from "./Comments"
import Flex from "./Flex"
import ConditionalRender from "./ConditionalRender"
import UserProfile from "./UserProfile"
import CustomStyles from "./CustomStyles"
import ReadingProgress from "./ReadingProgress"
import ReadingProgressScript from "./ReadingProgressScript"
import ImageLazyLoad from "./ImageLazyLoad"

export {
  ArticleTitle,
  Content,
  TagContent,
  FolderContent,
  Darkmode,
  ReaderMode,
  Head,
  PageTitle,
  ContentMeta,
  Spacer,
  TableOfContents,
  Explorer,
  TagList,
  Graph,
  Backlinks,
  Search,
  Footer,
  DesktopOnly,
  MobileOnly,
  RecentNotes,
  NotFound,
  Breadcrumbs,
  Comments,
  Flex,
  ConditionalRender,
  UserProfile,
  CustomStyles,
  ReadingProgress,
  ReadingProgressScript,
  ImageLazyLoad,
}
```

##### 9.2.4 更新页面布局文件

**修改文件**：`quartz.layout.ts`

```typescript
// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [
    Component.ReadingProgress(),
  ],
  afterBody: [
    Component.CustomStyles(),
    Component.ReadingProgressScript(),
    Component.ImageLazyLoad(),
  ],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/Hammerzer",
    },
  }),
}
```

#### 9.3 功能实现原理

1. **图片懒加载**：使用 Intersection Observer API 监听图片是否进入视口，只有当图片进入视口时才会加载实际图片。
2. **头像特殊处理**：左上角头像（带有 `.avatar` 类）不会被懒加载，会直接显示，提升用户体验。
3. **占位图**：图片加载前显示一个模糊的 SVG 占位图，提高用户体验。这就是为什么你会看到模糊图片的原因。
4. **加载动画**：图片加载完成后添加 `loaded` 类，触发模糊到清晰的过渡效果。
5. **响应式设计**：图片使用 `max-width: 100%` 确保在不同设备上都能良好显示。
6. **视觉效果**：添加了圆角、阴影和悬停效果，提升图片的视觉吸引力。
7. **居中显示**：图片设置为块级元素并使用 `margin: 1rem auto` 实现内容区居中显示。

#### 9.4 验证方法

1. 重新构建项目：
   ```bash
   npx quartz build
   ```
2. 预览网站：
   ```bash
   npx quartz build --serve
   ```
3. 检查图片加载：在浏览器中打开网站，观察图片是否懒加载，是否有加载动画。

#### 9.5 注意事项

1. 图片懒加载需要浏览器支持 Intersection Observer API，现代浏览器都支持。
2. 如果需要支持旧浏览器，可以添加 polyfill。
3. 图片的加载速度还受到图片大小和网络条件的影响，可以考虑使用图片压缩和 CDN 加速。

## 七 ⚠️ 注意事项与高级配置

### 1. Node.js 版本

> [!WARNING] 重要坑点
> Quartz 需要 **Node.js v18 或更高版本**。如果使用旧版本，可能会遇到构建失败或依赖安装错误。

检查版本：
```bash
node --version  # 应该显示 v18.x.x 或更高
```

### 2. 内容目录结构

```
content/
├── index.md           # 首页
├── 笔记分类/
│   ├── 笔记1.md
│   └── 笔记2.md
└── .obsidian/         # Obsidian 配置（会被忽略）
```

### 3. YAML Front Matter 格式

每篇笔记必须包含正确的 front matter：

```yaml
---
title: 笔记标题
description: 简短描述
date: 2026-02-08
tags: [标签1, 标签2]
---
```

### 4. 双向链接语法

使用 `[[笔记名]]` 创建双向链接：

```markdown
参考 [[编程基础]] 了解更多信息。
```

### 5. 图片处理

将图片放在 `content/` 目录下的子文件夹中：

```markdown
![图片描述](./images/screenshot.png)
```

### 6. 自定义域名

如果你有自己的域名：

1. 在仓库根目录创建 `CNAME` 文件，内容为你的域名
2. 在域名 DNS 设置中添加 CNAME 记录指向 `你的用户名.github.io`
3. 在 GitHub Pages 设置中配置自定义域名

### 7. 多仓库管理（未验证）

如果你想保持源码和发布分离：
```bash
# 保持原仓库用于开发
git push origin main
 
# 同时推送到 GitHub Pages 仓库用于发布
git push github-pages main:main
```


## 八 🐛 常见坑点与解决方案

### 1. 构建时出现 TypeScript 错误

**现象**：
```
error TS2307: Cannot find module
```

**解决方案**：
```bash
rm -rf node_modules package-lock.json
npm install
```

### 2. GitHub Pages 部署后样式丢失

**现象**：本地正常，但 GitHub Pages 上样式丢失。

**解决方案**：在仓库根目录添加 `.nojekyll` 文件：

```bash
touch .nojekyll
git add .nojekyll
git commit -m "添加 .nojekyll 禁用 Jekyll 构建"
git push
```

### 3. 修改配置后不生效

**现象**：修改 `quartz.config.ts` 后构建，网站没有变化。

**解决方案**：
```bash
npx quartz build --serve
```
使用 `--serve` 参数会启用热重载，修改配置后自动重新构建。

### 4. 中文字体显示问题

**现象**：中文内容字体显示不佳。

**解决方案**：在 `quartz.config.ts` 中配置中文字体：

```typescript
typography: {
  header: "Noto Sans SC",     // 中文字体
  body: "Noto Sans SC",
  code: "IBM Plex Mono",
}
```

### 5. 搜索功能不工作

**现象**：网站搜索框无结果。

**解决方案**：确保 `quartz.config.ts` 中启用了搜索插件：

```typescript
plugins: {
  transformers: [
    // ... 其他插件
  ],
  emitters: [
    Plugin.ContentPage(),
    // ... 其他插件
  ],
}
```

### 6. Github Pages 部署后出现样式丢失

```html
This XML file does not appear to have any style information associated with it. The document tree is shown below.  
<rss version="2.0">
<channel>
<title>Quartz 4</title> ... ...
```

一个可能的原因是：**缺少首页文件**。Quartz 必须在 `content` 文件夹根目录有 `index.md` 文件（首页入口），否则构建后的 `public` 目录不会生成根目录的 `index.html`，无论是本地预览还是部署到 GitHub Pages 都会报 404；



## 九 📝 笔记写作规范

基于本站点的配置，建议遵循以下规范：

### 1. Front Matter 模板

```yaml
---
title: 笔记标题
description: 100字以内的简短描述
date: 2026-02-08
tags: [标签1, 标签2]
draft: false  # 草稿设为 true
---
```

### 2. 内容结构

```markdown
# 标题

> 简介/摘要

## 第一节

内容...

## 第二节

内容...

## 相关笔记

[[相关笔记1]] | [[相关笔记2]]
```

### 3. 标题层级规范

| 层级 | 格式 | 示例 |
|------|------|------|
| 一级 | `# 标题` | `# 个人笔记知识库搭建指南` |
| 二级 | `## 一、标题` | `## 一、什么是 Obsidian + Quartz？` |
| 三级 | `### 1. 标题` | `### 1. 前置要求` |
| 四级 | `#### 1.1 标题` | `#### 1.1 安装 Git` |

## 十 🎯 下一步

- [[Obsidian使用技巧]]
- [[Quartz主题定制]]
- [[GitHub Actions自动部署]]
