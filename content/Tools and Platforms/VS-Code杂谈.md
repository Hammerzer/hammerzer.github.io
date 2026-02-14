---
title: VS-Code杂谈
description: 关于VS Code使用上的一些技巧积累。
urlname: About-vscode
date: 2020-09-08
tags:
  - 开发工具
  - VSCode
categories: Tool and Platforms
draft:
---

# 一 值得推荐的`Vscode`插件

> [!note] `2020/10/29` 终于找到了比较全的文章
> 
> [戳这儿](https://github.com/varHarrie/varharrie.github.io/issues/10)

> [!tip] 推荐一个**上班摸鱼又炒鱿鱼**小插件：`小霸王`  —— 绝对的炒鱿鱼小技巧

**目前在用的有如下：**

- `GitLens — Git supercharged` ： 一个可以同步展示代码的修改时间、修改人和修改原因
- `Auto Close Tag` ：自动闭合标签
- `Auto Import` ：自动补充 `import` 引用
- `Chinese (Simplified) Language Pack for Visual Studio Code` ： 汉化
- `Debugger for Chrome` ：用于使用 `chrome` 调试
- `liver Server` ：H5预览本地服务器
- `VueHelper` ：`Vue` 代码自动补全
- `Bracket Pair Colorizer` ： 多颜色大括号颜色区分



<br>

# 二 VSCode快捷键

> [VSCode快捷键大全](https://blog.csdn.net/sunyctf/article/details/130432727)

## 必会部分

### 通用 | general

- Ctrl + P	快速打开 Quick Open
- Ctrl + Shift + N	新窗口/实例 New window/instance
- Ctrl + Shift + W	关闭窗口/实例 Close window/instance



### 基础编辑 | Basic editing

- Ctrl+X	剪切行（空选定） Cut line (empty selection)
- Ctrl+C	复制行（空选定）Copy line (empty selection)
- Alt+ ↑ / ↓	向上/向下移动行 Move line up/down
- Shift+Alt + ↓ / ↑	**向上/向下复制行 Copy line up/down**
- Ctrl+Shift+K	**删除行 Delete line**
- Ctrl+Enter	**在下面插入行** Insert line below
- Ctrl+Shift+Enter	**在上面插入行** Insert line above
- Ctrl+Shift+\	跳到匹配的括号 Jump to matching bracket
- Ctrl+] / [	缩进/缩进行 Indent/outdent line
- Ctrl+Home	转到文件开头 Go to beginning of file
- Ctrl+End	转到文件末尾 Go to end of file
- Ctrl+↑ / ↓	向上/向下滚动行 Scroll line up/down
- Alt+PgUp / PgDown	向上/向下滚动页面 Scroll page up/down
- Ctrl+Shift+[	折叠（折叠）区域 Fold (collapse) region
- Ctrl+Shift+]	展开（未折叠）区域 Unfold (uncollapse) region
- Ctrl+K Ctrl+[	折叠（未折叠）所有子区域 Fold (collapse) all subregions
- Ctrl+K Ctrl+]	展开（未折叠）所有子区域 Unfold (uncollapse) all subregions
- Ctrl+K Ctrl+0	折叠（折叠）所有区域 Fold (collapse) all regions
- Ctrl+K Ctrl+J	展开（未折叠）所有区域 Unfold (uncollapse) all regions
- Ctrl+K Ctrl+C	添加行注释 Add line comment
- Ctrl+K Ctrl+U	删除行注释 Remove line comment
- Ctrl+/	切换行注释 Toggle line comment
- Shift+Alt+A	切换块注释 Toggle block comment
- Alt+Z  切换换行 Toggle word wrap



### 搜索和替换 | Search and replace

- Ctrl + F	查找 Find
- Ctrl + H	替换 Replace
- F3 / Shift + F3	查找下一个/上一个 Find next/previous
- Alt + Enter	选择查找匹配的所有出现 Select all occurences of Find match
- Ctrl + D	将选择添加到下一个查找匹配 Add selection to next Find match
- Ctrl + K Ctrl + D	将最后一个选择移至下一个查找匹配项 Move last selection to next Find match
- Alt + C / R / W	切换区分大小写/正则表达式/整个词 Toggle case-sensitive / regex / whole word



### 多光标和选择 | Multi-cursor and selection

- Alt +单击	插入光标 Insert cursor
- Ctrl + Alt +↑/↓	在上/下插入光标 Insert cursor above / below
- Ctrl + U	撤消上一个光标操作 Undo last cursor operation
- Shift + Alt + I	在选定的每一行的末尾插入光标 Insert cursor at end of each line selected
- Ctrl + I	选择当前行 Select current line
- Ctrl + Shift + L	选择当前选择的所有出现 Select all occurrences of current selection
- Ctrl + F2	选择当前字的所有出现 Select all occurrences of current word
- Shift + Alt + →	展开选择 Expand selection
- Shift + Alt + ←	缩小选择 Shrink selection
- Shift + Alt + （拖动鼠标）	列（框）选择 Column (box) selection
- Ctrl + Shift + Alt +（箭头键）	列（框）选择 Column (box) selection
- Ctrl + Shift + Alt + PgUp / PgDown	列（框）选择页上/下 Column (box) selection page up/down





### 丰富的语言编辑 | Rich languages editing

- Ctrl + 空格	触发建议 Trigger suggestion
- Ctrl + Shift + Space	触发器参数提示 Trigger parameter hints
- Tab	Emmet 展开缩写 Emmet expand abbreviation
- Shift + Alt + F	**格式化文档** Format document
- Ctrl + K Ctrl + F	格式选定区域 Format selection
- Ctrl + .	快速解决 Quick Fix
  

<br>

# 三 使用`Vscode`中遇到的问题

## 1 解决`eslint`空格报错等问题

> 参考[该博主](https://www.cnblogs.com/fqh123/p/9967771.html)

`eslint`检查代码风格是好的，不过 有些`换行报错` 、`空格报错`，还有在代码中有 console也是报错，这有些烦人---->

为了把这些烦人的报错给禁止掉

我们可以在`package.json`文件中 找到（或者在`.eslintrc.js`中找到`rules`）

```
"eslintConfig": {
　　"root": true,
　　"env": {
　　　　"node": true
　　},
　　"extends": [
　　　　"plugin:vue/essential",
　　　　"eslint:recommended"
　　],
　　"rules": {
　　　　"no-console":"off",//在这禁止掉console报错检查
　　　　"no-irregular-whitespace":"off"//这禁止掉 空格报错检查
　　},
　　"parserOptions": {
　　　　"parser": "babel-eslint"
　　}
},

//在rules规则中 禁止掉这些规则
```

下面罗列一些，一些规则的含义：

> “off” or 0 - 关闭(禁用)规则 
> “warn” or 1 - 将规则视为一个警告（并不会导致检查不通过） 
> “error” or 2 - 将规则视为一个错误 (退出码为1，检查不通过) 

## 2 代码行数统计

选择**编辑** -> **在文件中查找（正则）**        `^b*[^:b#/]+.*$`     

