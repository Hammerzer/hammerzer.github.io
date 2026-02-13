---
title: Hexo博客框架入坑指南
urlname: A-Guide-to-the-Hexo-Blog-Framework
date: 2020-08-18 
tags:
  - Hexo
  - 博客搭建
categories:
  - 工具与平台
description: 详细介绍如何使用 Hexo + GitHub Pages 搭建个人博客网站，包括环境准备、本地配置、部署到 GitHub Pages 的完整步骤。
---


>[!note] 介绍 `Hexo`+`Github Page`的步骤和遇到的问题，并在此列出参考的文章，衷心感谢。

- [Hexo博客搭建记录（一）：本地搭建以及部署到Github](https://blog.csdn.net/jiunian_2761/article/details/97388534)
- [博客搭建记录（二）：基本主题设置以及美化](https://blog.csdn.net/jiunian_2761/article/details/97388745Hexo)
- [Hexo+Next主题优化](https://zhuanlan.zhihu.com/p/30836436)
- [Hexo官方文档](https://hexo.io/zh-cn/)

# 一 环境准备

在开始搭建博客之前，需要确保已安装以下工具：
- Node.js
- Npm
- Git

# 二 配置本地Hexo

## 1 配置hexo全局控制命令

在命令行工具（如 CMD 或 Git Bash）中输入以下命令：
```bash
npm install -g hexo-cli 
```


## 2 初始化博客目录

1. 选择一个目录存放博客文件（例如：`/e/blog`）
2. 进入该目录，右键点击选择 `Git Bash Here`
3. 在命令窗口中输入以下命令初始化博客：
```bash
hexo init
```
Git Bash 会自动下载相关文件并初始化博客结构。

## 3 本地预览博客

在 Git Bash 窗口中，依次执行以下命令：

```bash
hexo clean      # 清理缓存  
hexo g          # 生成静态文件  
hexo s          # 启动本地服务器
```

Hexo 会默认运行在本机的 4000 端口上，在浏览器中输入 `http://localhost:4000` 即可查看默认主题的页面。

# 三 部署到 GitHub Pages

## 1 在 Github 创建仓库

打开 [Github官网](https://github.com/) 登陆你的Github账号，点击页面右上角的 `+` `New repository`新建一个`repository`仓库

> 为避免麻烦，这里仓库名必须按照`yourusername.github.io`规范填写，填写完仓库名后，我们点击`Create repository`按钮，然后等待其创建完成。复制该项目的HTTP链接`https://github.com/yourusername/yourusername.github.io.git`

> `yourusername`指的就是你的github用户名。

## 2 Hexo 配置

打开 `Git Bash` 切换到博客的根目录，输入：

```bash
npm install hexo-depolyer-git --save    
```

然后输入：

```bash
vim _config.yml
```

进入站点配置文件编辑模式，我们向下翻到底部，可以看到 `depoly` 字段

在英文输入模式下，按键盘上的 `i`键进入编辑模式，将`depoly`字段编辑如下：

```
deploy:  
  type: git  
  repo:   
        github: https://github.com/yourusername/yourusername.github.io.git  
  branch: master
```

注意这里`:`后面一定要加空格，不然会出错。

然后我们按`Esc` 键，输入`:wq` 保存退出

## 3 完成部署

在命令行输入并执行：

```shell
hexo clean  
hexo g  
hexo d //将本地文件推送到远程
```

> 在第一次推送时，需要输入github 的`userName`和`password`

# 四 使用Next主题
## 1 更改主题

[Hexo主题库](https://hexo.io/themes/)可以找到更多主题，以下以Next为例

> 在Hexo目录下有两份重要的配置文件，其名称都是`_config.yml` 。其中，一份位于站点根目录下，主要包含`Hexo`的自身配置，另一份位于主题目录下，主要用于配置主题相关的选项。 在接下来的描述中，我将前者称为 **站点配置文件**，后者称为 **主题配置文件** 。

### 1.1 安装Next

安装Next主题的方式很简单，利用Git bash 在博客主目录下执行：

```bash
git clone https://github.com/theme-next/hexo-theme-next themes/next
```

然后我们打开站点配置文件，将theme属性从默认值landscape改为next

```yml
theme: next
```

> 记住，所有的配置属性`:` 后面都要加一个空格,这样我们设定的值才会生效。

### 1.2 选择不同的Next主题样式

Next提供了四种主题风格scheme,可以在主题配置文件中配置：

```yml
# ---------------------------------------------------------------  
# Scheme Settings  
# ---------------------------------------------------------------  
# Schemes  
#scheme: Muse  
#scheme: Mist  
#scheme: Pisces  
scheme: Gemini #个人选择 `Gemini`
```

## 2 更改站点属性

### 2.1 更改网站名、语言、作者

打开站点配置文件，找到`site`字段，具体修改如下：

```yml
# 设置网站属性信息  
# Site:  
title: 小白的博客 #网站标题（博客站点名字）。  
subtitle: 小小白 #网站副标题，显示在标题下方  
description: 我是小白 #个人描述，类似签名，用于搜索引擎对站点的描述，建议在里面加上你的站点的关键词  
keywords:   
author: 小白 #博客文章作者  
language: zh-CN  #设置博客站点语言为中文  
timezone:  #设置时区，默认当前电脑时区 一般设置为 Asia/Shanghai
```

### 2.2 更改blog favicon

博客网站的图标可以在[easyicon](https://www.easyicon.net/)、[bitbug](http://www.bitbug.net/)、[iconfont](https://www.iconfont.cn/plus/user/detail?uid=41718)等网站选择和制作，然后选择或者创建相应大小的图标文件，放置在blog/themes/next/sources/images目录下，并在主题配置文件中进行如下配置，只需要设置small和medium两个就可以：

```yml
favicon:    
    small: /images/16x16.png    
    medium: /images/32x32.png    
    apple_touch_icon: /images/128x128.png    
    safari_pinned_tab: /images/logo2.svg
```

## 3. 菜单栏

### 3.1 显示更多栏目

在主题配置文件中修改如下：

```yml
menu:  
  home: / || home # 首页  
  about: /about/ || user # 关于  
  tags: /tags/ || tags # 标签  
  categories: /categories/ || th # 分类  
  archives: /archives/ || archive  # 归档  
  # schedule: /schedule/ || calendar # 日历  
  # sitemap: /sitemap.xml || sitemap # 站点地图  
  # commonweal: /404/ || heartbeat # 腾讯公益404
```

### 3.2 图标和内容量

```yml
menu_settings:  
  icons: true # 是否显示各个页面的图标  
  badges: true # 是否显示分类/标签/归档页的内容量
```

### 3.3 添加分类、标签、关于菜单项

首先打开主题下的配置文件`_config.yml`，然后搜索menu找到如下配置项，将about、tags、categories前的#号去掉，就开启了关于、标签和分类标签，当然还有其他菜单项也可以开启

```yml
menu:  
  home: / || home  
  about: /about/ || user  
  tags: /tags/ || tags  
  categories: /categories/ || th  
  archives: /archives/ || archive  
  #schedule: /schedule/ || calendar
```

需运行如下命令新建相关页面

```BASH
hexo new page "about"  
hexo new page "tags"  
hexo new page "categories"
```

打开各页面对应的`index.md`文件，编辑如下内容

```yml
title: about  # 在页面中显示的title  
date: 2019-06-25 19:16:17  
type: "about"  # 为固定内容，其他对应  "tags"  "categories"
```

然后在发布的博文开头添加`tag`s和`categories`,如：

```yml
title: The Starting Point of Blogs  
urlname: The Starting Point of Blogs  
date: 2020-08-18 13:56:39  
tags: [hexo部署,next使用]   #new  
categories: Tool&Platform   #new
```

### 3.4 本地搜索

在你站点的根目录下

```BASH
$ npm install hexo-generator-searchdb --save
```

打开 `Hexo` 站点的 `_config.yml`,添加配置

```yml
search:  
  path: search.xml  
  field: post  
  format: html  
  limit: 10000
```

打开 `themes/next/_config.yml` ,搜索关键字 `local_search` ,设置为 `true`：

```yml
# Local search  
# Dependencies: https://github.com/flashlab/hexo-generator-search  
local_search:  
  enable: true  
  # if auto, trigger search by changing input  
  # if manual, trigger search by pressing enter key or search button  
  trigger: auto  
  # show top n results per article, show all results by setting to -1  
  top_n_per_article: 1
```

## 4. 侧边栏

以下设置都是在 **主题配置** 文件中

### 4.1 显示可跳转 日志 / 分类 / 标签页 的链接

```yml
# Posts / Categories / Tags in sidebar.  
site_state: true
```

### 4.2 社交信息设置

```yml
social:  
  GitHub: https://github.com/yourname || github  
  #E-Mail: mailto:yourname@gmail.com || envelope  
  Weibo: https://weibo.com/yourname || weibo  
  #Google: https://plus.google.com/yourname || google  
  #Twitter: https://twitter.com/yourname || twitter  
  #FB Page: https://www.facebook.com/yourname || facebook  
  #VK Group: https://vk.com/yourname || vk  
  #StackOverflow: https://stackoverflow.com/yourname || stack-overflow  
  #YouTube: https://youtube.com/yourname || youtube  
  #Instagram: https://instagram.com/yourname || instagram  
  #Skype: skype:yourname?call|chat || skype
```

Next 默认给出了一些模板，我们只要将其中的链接改为自己的链接就可以了，当然你也可以自己定义，格式为：

>名字: 链接 || 图标名，图标必须是[FontAwesome](http://fontawesome.dashgame.com/)网站中能找到的图标名。

例如我添加我的博客地址：

> qianfanguojin: https://qianfanguojin.github.io/ || codepen 

### 4.3 圆形头像设置

```yml
avatar:  
  # In theme directory (source/images): /images/avatar.gif  
  # In site directory (source/uploads): /uploads/avatar.gif  
  # You can also use other linking images.  
  url: /images/avatar.jpg #头像文件目录  
  # If true, the avatar would be dispalyed in circle.  
  rounded: true #设置鼠标放在头像上面是否旋转  
  # If true, the avatar would be rotated with the cursor.  
  rotated: true #头像是否设为圆形
```

将自己喜欢的头像头像按照需求自己更换自己喜欢的就可以了，不过这里要注意一下头像可能会变成椭圆，如果头像是椭圆的，是因为图片不是一个正方形的图片，找到一个宽高像素一样的的图片即可。

##### 设置头像边框为圆形框

打开位于 `themes/next/source/css/_common/components/sidebar/sidebar-author.syl` 文件，修改如下:

```yml
.site-author-image {  
  display: block;  
  margin: 0 auto;  
  padding: $site-author-image-padding;  
  max-width: $site-author-image-width;  
  height: $site-author-image-height;  
  border: $site-author-image-border-width solid $site-author-image-border-color;  
 // 修改头像边框  
  border-radius: 50%;  
  -webkit-border-radius: 50%;  
  -moz-border-radius: 50%;  
}
```

### 4.4 设置侧边栏社交图标

打开 `themes/next/_config.yml` 文件,搜索关键字 `social_icons` ，添加社交站点名称（注意大小写）图标，[Font Awesome](https://link.zhihu.com/?target=http%3A//fontawesome.dashgame.com/)图标

### 4.5 RSS

在你 `Hexo` 站点目录下：

```bash
$ npm install hexo-generator-feed --save
```

打开 `Hexo` 站点下的 `_config.yml` ,添加如下配置：

```yml
# feed  
# Dependencies: https://github.com/hexojs/hexo-generator-feed  
feed:  
  type: atom  
  path: atom.xml  
  limit: 20  
  hub:  
  content:
```

### 4.6 友情链接

打开 `themes/next/_config.yml` 文件,搜索关键字 `Blog rolls`：

```bash
# Blog rolls  
links_title: 友情链接 #标题  
links_layout: block #布局，一行一个连接  
#links_layout: inline  
links: #连接  
  baidu: http://example.com/  
  google: http://example.com/
```

### 4.7 配置解读

```yml
toc:  
  enable: true #自动生成目录  
  # Automatically add list number to toc.  
  number: true #自动产生目录编号  
  # If true, all words will placed on next lines if header width longer then sidebar width.  
  wrap: false #标题过长是否换行  
  # If true, all level of TOC in a post will be displayed, rather than the activated part of it.  
  expand_all: false # 是否显示所有等级的目录项。  
  # Maximum heading depth of generated toc. You can set it in one post through `toc_max_depth` in Front-matter.  
  max_depth: 6 #最大标题嵌套个数  
​  
sidebar:  
  # Sidebar Position.#侧边栏的位置  
  position: left  
  #position: right  
​  
  # Manual define the sidebar width. If commented, will be default for:  
  # Muse | Mist: 320  
  # Pisces | Gemini: 240  
  #width: 300  
​  
  # Sidebar Display (only for Muse | Mist), available values:  
  #  - post    expand on posts automatically. Default.  
  #  - always  expand for all pages automatically.  
  #  - hide    expand only when click on the sidebar toggle icon.  
  #  - remove  totally remove sidebar including sidebar toggle.  
  display: post  
​  
  # Sidebar offset from top menubar in pixels (only for Pisces | Gemini).  
  offset: 12 # 侧边栏相对主菜单的像素距离  
  # Enable sidebar on narrow view (only for Muse | Mist).  
  onmobile: false #在手机上侧边栏是否显示  
​  
# 返回顶部  
back2top:  
  enable: true   
  # Back to top in sidebar.  
  sidebar: false  #侧边栏显示返回顶部信息,默认显示在页面右下方  
  # Scroll percent label in b2t button.  
  scrollpercent: #显示百分比
```

## 5. 页面设置

### 5.1 鼠标点击红心

目前网上大多数文章都是在`themes/next/source/js/src` 下新建文件，但笔者写这篇文章时最新版Next已经没有`src`文件夹了 ，于是，我们可以在`themes/next/source/js/`下新建`clicklove.js`内容如下：

```javascript
!function(e,t,a){function n(){c(".heart{width: 10px;height: 10px;position: fixed;background: #f00;transform: rotate(45deg);-webkit-transform: rotate(45deg);-moz-transform: rotate(45deg);}.heart:after,.heart:before{content: '';width: inherit;height: inherit;background: inherit;border-radius: 50%;-webkit-border-radius: 50%;-moz-border-radius: 50%;position: fixed;}.heart:after{top: -5px;}.heart:before{left: -5px;}"),o(),r()}function r(){for(var e=0;e<d.length;e++)d[e].alpha<=0?(t.body.removeChild(d[e].el),d.splice(e,1)):(d[e].y--,d[e].scale+=.004,d[e].alpha-=.013,d[e].el.style.cssText="left:"+d[e].x+"px;top:"+d[e].y+"px;opacity:"+d[e].alpha+";transform:scale("+d[e].scale+","+d[e].scale+") rotate(45deg);background:"+d[e].color+";z-index:99999");requestAnimationFrame(r)}function o(){var t="function"==typeof e.onclick&&e.onclick;e.onclick=function(e){t&&t(),i(e)}}function i(e){var a=t.createElement("div");a.className="heart",d.push({el:a,x:e.clientX-5,y:e.clientY-5,scale:1,alpha:1,color:s()}),t.body.appendChild(a)}function c(e){var a=t.createElement("style");a.type="text/css";try{a.appendChild(t.createTextNode(e))}catch(t){a.styleSheet.cssText=e}t.getElementsByTagName("head")[0].appendChild(a)}function s(){return"rgb("+~~(255*Math.random())+","+~~(255*Math.random())+","+~~(255*Math.random())+")"}var d=[];e.requestAnimationFrame=function(){return e.requestAnimationFrame||e.webkitRequestAnimationFrame||e.mozRequestAnimationFrame||e.oRequestAnimationFrame||e.msRequestAnimationFrame||function(e){setTimeout(e,1e3/60)}}(),n()}(window,document);

```
然后在修改`themes/next/layout/_layout.swig` 文件末尾添加

```swig
<!-- 页面点击小红心 -->  
{% if theme.clicklove %}  
      <script type="text/javascript" src="/js/clicklove.js"></script>  
{% endif %}
```

注意

> 很多人配置正确但不显示的原因主要出在这里，也就是`src` 后面的文件链接错误，hexo中使用的是相对路径，也就是说,只要你不指定为绝对路径,设置的链接都将是`root+url`的形式，一般来说，大多数用户默认的`root` 都为`/` ，但是有些情况，例如设置了Git Page ,要修改`root`的路径，`root`路径我们可以在 **站点配置文件** 中找到：

```yml
# URL  
\## If your site is put in a subdirectory, set url as 'http://yoursite.com/child' and root as '/child/'  
url: http://yoursite.com  
root: /  
permalink: :year/:month/:day/:title/  
permalink_defaults:  
pretty_urls:  
 trailing_index: true # Set to false to remove trailing 'index.html' from permalinks  
 trailing_html: true # Set to false to remove trailing '.html' from permalinks
```
![](problem1.jpg)
上图就是在我设置了Git Page后 `root`路径的值，在这种情况下，我们在修改`themes/next/layout/_layout.swig` 文件时，`src` 的路径都应该加上`root` 的路径值，因此，在这种情况下代码应修改为：

```swig
<!-- 页面点击小红心 -->  
{% if theme.clicklove %}  
      <script type="text/javascript" src="/fa/js/clicklove.js"></script>  
{% endif %}
```

确定无误后最后在主题配置文件末尾添加：

```yml
# 显示页面红心  
clicklove: true
```

> 另外还有一个效果，跟那个红心是差不多的（只能选一个），首先在`themes/next/source/js/src`里面建一个叫`fireworks.js`的文件，代码如下：

```javascript
"use strict";function updateCoords(e){pointerX=(e.clientX||e.touches[0].clientX)-canvasEl.getBoundingClientRect().left,pointerY=e.clientY||e.touches[0].clientY-canvasEl.getBoundingClientRect().top}function setParticuleDirection(e){var t=anime.random(0,360)*Math.PI/180,a=anime.random(50,180),n=[-1,1][anime.random(0,1)]*a;return{x:e.x+n*Math.cos(t),y:e.y+n*Math.sin(t)}}function createParticule(e,t){var a={};return a.x=e,a.y=t,a.color=colors[anime.random(0,colors.length-1)],a.radius=anime.random(16,32),a.endPos=setParticuleDirection(a),a.draw=function(){ctx.beginPath(),ctx.arc(a.x,a.y,a.radius,0,2*Math.PI,!0),ctx.fillStyle=a.color,ctx.fill()},a}function createCircle(e,t){var a={};return a.x=e,a.y=t,a.color="#F00",a.radius=0.1,a.alpha=0.5,a.lineWidth=6,a.draw=function(){ctx.globalAlpha=a.alpha,ctx.beginPath(),ctx.arc(a.x,a.y,a.radius,0,2*Math.PI,!0),ctx.lineWidth=a.lineWidth,ctx.strokeStyle=a.color,ctx.stroke(),ctx.globalAlpha=1},a}function renderParticule(e){for(var t=0;t<e.animatables.length;t++){e.animatables[t].target.draw()}}function animateParticules(e,t){for(var a=createCircle(e,t),n=[],i=0;i<numberOfParticules;i++){n.push(createParticule(e,t))}anime.timeline().add({targets:n,x:function(e){return e.endPos.x},y:function(e){return e.endPos.y},radius:0.1,duration:anime.random(1200,1800),easing:"easeOutExpo",update:renderParticule}).add({targets:a,radius:anime.random(80,160),lineWidth:0,alpha:{value:0,easing:"linear",duration:anime.random(600,800)},duration:anime.random(1200,1800),easing:"easeOutExpo",update:renderParticule,offset:0})}function debounce(e,t){var a;return function(){var n=this,i=arguments;clearTimeout(a),a=setTimeout(function(){e.apply(n,i)},t)}}var canvasEl=document.querySelector(".fireworks");if(canvasEl){var ctx=canvasEl.getContext("2d"),numberOfParticules=30,pointerX=0,pointerY=0,tap="mousedown",colors=["#FF1461","#18FF92","#5A87FF","#FBF38C"],setCanvasSize=debounce(function(){canvasEl.width=2*window.innerWidth,canvasEl.height=2*window.innerHeight,canvasEl.style.width=window.innerWidth+"px",canvasEl.style.height=window.innerHeight+"px",canvasEl.getContext("2d").scale(2,2)},500),render=anime({duration:1/0,update:function(){ctx.clearRect(0,0,canvasEl.width,canvasEl.height)}});document.addEventListener(tap,function(e){"sidebar"!==e.target.id&&"toggle-sidebar"!==e.target.id&&"A"!==e.target.nodeName&&"IMG"!==e.target.nodeName&&(render.play(),updateCoords(e),animateParticules(pointerX,pointerY))},!1),setCanvasSize(),window.addEventListener("resize",setCanvasSize,!1)}"use strict";function updateCoords(e){pointerX=(e.clientX||e.touches[0].clientX)-canvasEl.getBoundingClientRect().left,pointerY=e.clientY||e.touches[0].clientY-canvasEl.getBoundingClientRect().top}function setParticuleDirection(e){var t=anime.random(0,360)*Math.PI/180,a=anime.random(50,180),n=[-1,1][anime.random(0,1)]*a;return{x:e.x+n*Math.cos(t),y:e.y+n*Math.sin(t)}}function createParticule(e,t){var a={};return a.x=e,a.y=t,a.color=colors[anime.random(0,colors.length-1)],a.radius=anime.random(16,32),a.endPos=setParticuleDirection(a),a.draw=function(){ctx.beginPath(),ctx.arc(a.x,a.y,a.radius,0,2*Math.PI,!0),ctx.fillStyle=a.color,ctx.fill()},a}function createCircle(e,t){var a={};return a.x=e,a.y=t,a.color="#F00",a.radius=0.1,a.alpha=0.5,a.lineWidth=6,a.draw=function(){ctx.globalAlpha=a.alpha,ctx.beginPath(),ctx.arc(a.x,a.y,a.radius,0,2*Math.PI,!0),ctx.lineWidth=a.lineWidth,ctx.strokeStyle=a.color,ctx.stroke(),ctx.globalAlpha=1},a}function renderParticule(e){for(var t=0;t<e.animatables.length;t++){e.animatables[t].target.draw()}}function animateParticules(e,t){for(var a=createCircle(e,t),n=[],i=0;i<numberOfParticules;i++){n.push(createParticule(e,t))}anime.timeline().add({targets:n,x:function(e){return e.endPos.x},y:function(e){return e.endPos.y},radius:0.1,duration:anime.random(1200,1800),easing:"easeOutExpo",update:renderParticule}).add({targets:a,radius:anime.random(80,160),lineWidth:0,alpha:{value:0,easing:"linear",duration:anime.random(600,800)},duration:anime.random(1200,1800),easing:"easeOutExpo",update:renderParticule,offset:0})}function debounce(e,t){var a;return function(){var n=this,i=arguments;clearTimeout(a),a=setTimeout(function(){e.apply(n,i)},t)}}var canvasEl=document.querySelector(".fireworks");if(canvasEl){var ctx=canvasEl.getContext("2d"),numberOfParticules=30,pointerX=0,pointerY=0,tap="mousedown",colors=["#FF1461","#18FF92","#5A87FF","#FBF38C"],setCanvasSize=debounce(function(){canvasEl.width=2*window.innerWidth,canvasEl.height=2*window.innerHeight,canvasEl.style.width=window.innerWidth+"px",canvasEl.style.height=window.innerHeight+"px",canvasEl.getContext("2d").scale(2,2)},500),render=anime({duration:1/0,update:function(){ctx.clearRect(0,0,canvasEl.width,canvasEl.height)}});document.addEventListener(tap,function(e){"sidebar"!==e.target.id&&"toggle-sidebar"!==e.target.id&&"A"!==e.target.nodeName&&"IMG"!==e.target.nodeName&&(render.play(),updateCoords(e),animateParticules(pointerX,pointerY))},!1),setCanvasSize(),window.addEventListener("resize",setCanvasSize,!1)};
```

打开`themes/next/layout/_layout.swig`,在`</body>`上面写下如下代码：

```swig
{% if theme.fireworks %}   <canvas class="fireworks" style="position: fixed;left: 0;top: 0;z-index: 1; pointer-events: none;" ></canvas>    <script type="text/javascript" src="//cdn.bootcss.com/animejs/2.2.0/anime.min.js"></script>    <script type="text/javascript" src="/js/src/fireworks.js"></script> {% endif %}
```

打开主题配置文件，在里面最后写下：

```yml
# Fireworks  
fireworks: true
```

### 5.2 添加动态背景

```yml
# 设置动态背景  
# Canvas-nest  
# Dependencies: https://github.com/theme-next/theme-next-canvas-nest  
canvas_nest:  
  enable: true  
  onmobile: true # display on mobile or not  
  color: "0,0,255" # RGB values, use `,` to separate  
  opacity: 0.5 # the opacity of line: 0~1  
  zIndex: -1 # z-index property of the background  
  count: 170 # the number of lines  
​  
# JavaScript 3D library.  
# Dependencies: https://github.com/theme-next/theme-next-three  
three:  
  enable: false  
  delay: false # Set true to further delay loading  
  three_waves: true  
  canvas_lines: false  
  canvas_sphere: false  
​  
# Canvas-ribbon  
# Dependencies: https://github.com/theme-next/theme-next-canvas-ribbon  
canvas_ribbon:  
  enable: false  
  size: 300 # The width of the ribbon  
  alpha: 0.6 # The transparency of the ribbon  
  zIndex: -1 # The display level of the ribbon
```

新版Next已经支持了上面三种动态背景方式，大家想用哪种就将该项的`enable` 设为 `true`,具体效果大家自己尝试，一般用的是第一种。

当然，指明要用那种，但是Next没有自带该动画的包，我们要自己下载，链接就在注释中`# Dependencies` 项后面 ，例如我下载第一种：

```bash
git clone https://github.com/theme-next/theme-next-canvas-nest themes/next/source/lib/canvas-nest
```

链接后的是指定下载后放到的文件夹名，大家要注意是放在`lib` 下且文件夹名字应该和上面的设置项名字一样。

```yml
##### 个人使用了`canvas-ribbon`的背景，且优先使用cdn引入

canvas_ribbon:  
 enable: true  
 size: 300 # The width of the ribbon  
 alpha: 0.4 # The transparency of the ribbon  
 zIndex: -1 # The display level of the ribbon
```

```yml
 \# Internal version: 1.0.0  
 canvas_ribbon: //cdn.jsdelivr.net/gh/theme-next/theme-next-canvas- ribbon@1/canvas-ribbon.js  
 \# canvas_ribbon:
```

### 5.3 博客底部基本布局

```yml
# 博客底部布局  
footer:  
  # Specify the date when the site was setup. If not defined, current year will be used.  
  #since: 2015 #设置建站时间，不设置则默认为当前年份  
​  
  # Icon between year and copyright info.  
  icon:  
    # Icon name in Font Awesome. See: https://fontawesome.com/v4.7.0/icons/  
    # `heart` is recommended with animation in red (#ff0000).  
    name: heart  # 作者图标，默认为author，自定义的图标需来自fontawesome中  
    # If you want to animate the icon, set it to true.  
    animated: true  # 图标是否闪动  
    # Change the color of icon, using Hex Code.  
    color: "#808080" # 图标颜色  
​  
  # If not defined, `author` from Hexo `_config.yml` will be used.  
  copyright: 小白 #设置底部显示的名字，默认为站点配置文件的author名字  
​  
  powered:  
    # Hexo link (Powered by Hexo).  
    enable: false # 是否显示 Powered By Hexo  
    # Version info of Hexo after Hexo link (vX.X.X).  
    version: false # 是否显示 Hexo 版本  
​  
  theme:  
    # Theme & scheme info link (Theme - NexT.scheme).  
    enable: false # 是否显示主题信息  
    # Version info of NexT after scheme info (vX.X.X).  
    version: false # 是否显示主题版本  
​  
  # Beian ICP information for Chinese users. See: http://www.beian.miit.gov.cn  
  beian:  
    enable: false # 是否显示网站备案信息  
    icp:
```

### 5.4 底部显示busuanzi博客访客/访问次数统计

修改主题配置文件内容：

```yml
# 不蒜子统计功能  
busuanzi_count:  
  enable: true # 是否开启busuanzi统计功能  
  total_visitors: true # 是否统计总访客数  
  total_visitors_icon: user # 访客数图标  
  total_views: true # 是否显示同级总访问次数  
  total_views_icon: eye # 总访问次数的图标  
  post_views: true # 是否显示单个文章查看次数  
  post_views_icon: eye # 文章被查看次数的图标
```

### 5.5 右上角显示Github标识

修改主题配置文件：

```yml
# `Follow me on GitHub` banner in the top-right corner.  
# Github 跳转图标  
github_banner:  
  enable: true # 功能开关  
  permalink: https://github.com/yourname # Github主页地址  
  title: Follow me on GitHub # 鼠标悬停显示的文字
```
### 5.6 接入网易云播放器

首先在网易云音乐网页端搜索你想播放的音乐（有版权保护的不行）

在网易云客户端点击生成外链播放器，得到外链的html代码：

后我们将代码粘贴到一个合适的位置，建议在侧边栏，对应的文件是`themes/next/layout/_macro/sidebar.swig` ，不同的位置效果呈现的效果不同，例如我的：

```html
<div class="site-overview-wrap sidebar-panel{% if not display_toc or toc(page.content).length <= 1 %} sidebar-panel-active{% endif %}">         <div class="site-overview">              
    {{ partial('_partials/sidebar/site-overview.swig', {}, {cache: theme.cache.enable}) }}                        
    {% for inject_item in theme.injects.sidebar %}               
    {{ partial(inject_item.layout, inject_item.locals, inject_item.options) }}           {% endfor %}           
</div>        
<!--网易云链接-->          
</div>
```

### 5.7 浏览页面的时候显示当前浏览进度

打开 `themes/next/_config.yml` ,搜索关键字 `scrollpercent` ,把 `false` 改为 `true`。

```yml
# Scroll percent label in b2t button  
  scrollpercent: true
```

如果想把 `top`按钮放在侧边栏,打开 `themes/next/_config.yml` ,搜索关键字 `b2t` ,把 `false` 改为 `true`。

```yml
# Back to top in sidebar  
  b2t: true  
​  
  # Scroll percent label in b2t button  
  scrollpercent: true
```

在顶部显示阅读进度

```yml
# Reading progress bar  
reading_progress:  
  enable: true  
  # Available values: top | bottom  
  position: top  
  color: "#37c6c0"  
  height: 3px
```

### 5.8 添加顶部加载条

打开 `themes/next/_config.yml` ，搜索关键字 `pace` ,设置为 `true` ,可以更换加载样式：

```
Dependencies: https://github.com/theme-next/theme-next-pace
```

```yml
# Progress bar in the top during page loading.  
pace: true  
# Themes list:  
#pace-theme-big-counter  
#pace-theme-bounce  
#pace-theme-barber-shop  
#pace-theme-center-atom  
#pace-theme-center-circle  
#pace-theme-center-radar  
#pace-theme-center-simple  
#pace-theme-corner-indicator  
#pace-theme-fill-left  
#pace-theme-flash  
#pace-theme-loading-bar  
#pace-theme-mac-osx  
#pace-theme-minimal  
# For example  
# pace_theme: pace-theme-center-simple  
pace_theme: pace-theme-flash #替换更换样式
```

#### 5.9 自定义鼠标样式

打开 `themes/next/source/css/_custom/custom.styl` ,在里面写下如下代码：

```swig
// 鼠标样式  
  * {  
      cursor: url("http://om8u46rmb.bkt.clouddn.com/sword2.ico"),auto!important  
  }  
  :active {  
      cursor: url("http://om8u46rmb.bkt.clouddn.com/sword1.ico"),auto!important  
  }
```

其中 url 里面必须是 ico 图片，ico 图片可以上传到网上（我是使用七牛云图床），然后获取外链，复制到 url 里就行了

## 6 文章内容相关

### 6.1 文章摘要显示（显示阅读全文按钮）

自动形成摘要模式：  打开主题配置文件，修改内容如下：
```yml
    auto_excerpt:  
      enable: true    
      length: 150 # 截取的内容长度  
        
    # Read more button  
    # If true, the read more button would be displayed in excerpt section.  
    read_more_btn: true # 是否显示阅读全文按钮  
```   

### 6.2 代码块设置

使用参照如下：

```yml
# 代码块设置  
codeblock:  
  # Code Highlight theme  
  # Available values: normal | night | night eighties | night blue | night bright  
  # See: https://github.com/chriskempson/tomorrow-theme  
  # 代码块主题, 可选的值为 normal; night; night eighties; night blue; night bright  
  highlight_theme: night  
  # Add copy_button on codeblock  
  # 显示复制按钮  
  copy_button:  
    enable: true  
    # Show text copy result.  
    show_result: true  
    # Available values: default | flat | mac  
    style:  # 按钮显示格式
```

代码块样式的具体内容可以查看[官方文档](http://theme-next.iissnan.com/theme-settings.html#syntax-highlight-scheme)

### 6.3 添加打赏

```yml
# Reward (Donate)  
# 打赏设置  
reward_settings:  
  # If true, reward would be displayed in every article by default.  
  # You can show or hide reward in a specific article throuth `reward: true | false` in Front-matter.  
  enable: true # 功能开关  
  animation: true # 动画  
  #comment: Donate comment here.  
​  
reward:  
  #wechatpay: /images/wechatpay.png # 微信捐赠二维码图片  
  #alipay: /images/alipay.png # 支付宝捐赠二维码图片  
  #bitcoin: /images/bitcoin.png # 比特币
```

### 6.4 添加版权信息

```yml
# Creative Commons 4.0 International License.  
# See: https://creativecommons.org/share-your-work/licensing-types-examples  
# Available values of license: by | by-nc | by-nc-nd | by-nc-sa | by-nd | by-sa | zero  
# You can set a language value if you prefer a translated version of CC license, e.g. deed.zh  
# CC licenses are available in 39 languages, you can find the specific and correct abbreviation you need on https://creativecommons.org  
creative_commons:  
  license: by-nc-sa # 许可协议  
  sidebar: true # 侧边栏显示  
  post: true # 文章底部显示  
  language:
```

注意

> 版权信息中的本文链接 由主题配置中的 `url` 控制

### 6.5 自定义文章底部版权声明

效果：

作者：Dragonstyle  
链接：http://www.dragonstyle.win/2017/09/06/Android-Studio个人设置/  
來源：简书  
版权声明： 本博客所有文章除特别声明外，均采用 CC BY-NC-SA 4.0 许可协议。转载请注明出处！

在目录 `themes/next/layout/_macro/` 下添加 `my-copyright.swig` ,内容如下:

{% if page.copyright %}  
<div class="my_post_copyright">  
  <script src="//cdn.bootcss.com/clipboard.js/1.5.10/clipboard.min.js"></script>  
    
  <!-- JS库 sweetalert 可修改路径 -->  
  <script type="text/javascript" src="http://jslibs.wuxubj.cn/sweetalert_mini/jquery-1.7.1.min.js"></script>  
  <script src="http://jslibs.wuxubj.cn/sweetalert_mini/sweetalert.min.js"></script>  
  <link rel="stylesheet" type="text/css" href="http://jslibs.wuxubj.cn/sweetalert_mini/sweetalert.mini.css">  
​  
  <p><span>本文标题:</span>{{ page.title }}</a></p>  
  <p><span>文章作者:</span>{{ theme.author }}</a></p>  
  <p><span>发布时间:</span>{{ page.date.format("YYYY年MM月DD日 - HH:mm:ss") }}</p>  
  <p><span>最后更新:</span>{{ page.updated.format("YYYY年MM月DD日 - HH:mm:ss") }}</p>  
  <p><span>原始链接:</span><a href="{{ url_for(page.path) }}" title="{{ page.title }}">{{ page.permalink }}</a>  
    <span class="copy-path"  title="点击复制文章链接"><i class="fa fa-clipboard" data-clipboard-text="{{ page.permalink }}"  aria-label="复制成功！"></i></span>  
  </p>  
  <p><span>许可协议:</span><i class="fa fa-creative-commons"></i> <a rel="license" href="https://creativecommons.org/licenses/by-nc-nd/4.0/" target="_blank" title="Attribution-NonCommercial-NoDerivatives 4.0 International (CC BY-NC-ND 4.0)">署名-非商业性使用-禁止演绎 4.0 国际</a> 转载请保留原文链接及作者。</p>    
</div>  
<script>   
    var clipboard = new Clipboard('.fa-clipboard');  
    clipboard.on('success', $(function(){  
      $(".fa-clipboard").click(function(){  
        swal({     
          title: "",     
          text: '复制成功',     
          html: false,  
          timer: 500,     
          showConfirmButton: false  
        });  
      });  
    }));    
</script>  
{% endif %}

在目录 `themes/next/source/css/_common/components/post/` 下添加 `my-post-copyright.styl`,内容如下:

.my_post_copyright {  
  width: 85%;  
  max-width: 45em;  
  margin: 2.8em auto 0;  
  padding: 0.5em 1.0em;  
  border: 1px solid #d3d3d3;  
  font-size: 0.93rem;  
  line-height: 1.6em;  
  word-break: break-all;  
  background: rgba(255,255,255,0.4);  
}  
.my_post_copyright p{margin:0;}  
.my_post_copyright span {  
  display: inline-block;  
  width: 5.2em;  
  color: #333333; // title color  
  font-weight: bold;  
}  
.my_post_copyright .raw {  
  margin-left: 1em;  
  width: 5em;  
}  
.my_post_copyright a {  
  color: #808080;  
  border-bottom:0;  
}  
.my_post_copyright a:hover {  
  color: #0593d3; // link color  
  text-decoration: underline;  
}  
.my_post_copyright:hover .fa-clipboard {  
  color: #000;  
}  
.my_post_copyright .post-url:hover {  
  font-weight: normal;  
}  
.my_post_copyright .copy-path {  
  margin-left: 1em;  
  width: 1em;  
  +mobile(){display:none;}  
}  
.my_post_copyright .copy-path:hover {  
  color: #808080;  
  cursor: pointer;  
}

修改 `themes/next/layout/_macro/post.swig` ,在代码如下：

{% if theme.wechat_subscriber.enabled and not is_index %}  
      <div>  
        {% include 'wechat-subscriber.swig' %}  
      </div>  
 {% endif %}

之前添加增加如下代码：

<div>  
      {% if not is_index %}  
        {% include 'my-copyright.swig' %}  
      {% endif %}  
</div>

修改 `themes/next/source/css/_common/components/post/post.styl` 文件，在最后一行增加代码：

@import "my-post-copyright"

设置新建文章自动开启

`copyright`,即新建文章自动显示自定义的版权声明,设置 `your site/scaffolds/post.md`文件

---  
title: {{ title }}  
date: {{ date }}  
tags:  
type: "categories"  
categories:  
copyright: true #新增,开启  
---

### 6.6 添加图片

1. **设置站点配置`_config.yml`**:将`post_asset_folder: false`改为`post_asset_folder: true`
    
2. **安装插件**：在hexo根目录打开Git Bash,执行
    
     npm install hexo-asset-image --save
    
3. **运行`hexo n "XXXXXX"`**,生成XXXXX.md博文时就会在`/source/_posts`目录下生成XXXXXX的文件夹，将你想在XXXXX博文中插入的照片放置到这个同名文件夹中即可，图片的命名随意。
    
4. **添加图片**:在想添加的位置写入`![](图片名字.图片格式)`,例如`![](1.png)`
    

**一个意外情况就是**：Hexo生成的Html文件中，图片的地址时错误的，如下

<img src="/.io//1-1.png">

个人是找到了依赖中的`hexo-asset-image`的主文件`index.js`进行修改，我的方法比较粗暴：直接将58行给路径的赋值修改了

$(this).attr('src', './' + src);

也有博主做了其他类型的修改，如

'use strict';  
var cheerio = require('cheerio');  
​  
// http://stackoverflow.com/questions/14480345/how-to-get-the-nth-occurrence-in-a-string  
function getPosition(str, m, i) {  
  return str.split(m, i).join(m).length;  
}  
​  
var version = String(hexo.version).split('.');  
hexo.extend.filter.register('after_post_render', function(data){  
  var config = hexo.config;  
  if(config.post_asset_folder){  
        var link = data.permalink;  
    if(version.length > 0 && Number(version[0]) == 3)  
       var beginPos = getPosition(link, '/', 1) + 1;  
    else  
       var beginPos = getPosition(link, '/', 3) + 1;  
    // In hexo 3.1.1, the permalink of "about" page is like ".../about/index.html".  
    var endPos = link.lastIndexOf('/') + 1;  
    link = link.substring(beginPos, endPos);  
​  
    var toprocess = ['excerpt', 'more', 'content'];  
    for(var i = 0; i < toprocess.length; i++){  
      var key = toprocess[i];  
   
      var $ = cheerio.load(data[key], {  
        ignoreWhitespace: false,  
        xmlMode: false,  
        lowerCaseTags: false,  
        decodeEntities: false  
      });  
​  
      $('img').each(function(){  
        if ($(this).attr('src')){  
            // For windows style path, we replace '\' to '/'.  
            var src = $(this).attr('src').replace('\\', '/');  
            if(!/http[s]*.*|\/\/.*/.test(src) &&  
               !/^\s*\//.test(src)) {  
              // For "about" page, the first part of "src" can't be removed.  
              // In addition, to support multi-level local directory.  
              var linkArray = link.split('/').filter(function(elem){  
                return elem != '';  
              });  
              var srcArray = src.split('/').filter(function(elem){  
                return elem != '' && elem != '.';  
              });  
              if(srcArray.length > 1)  
                srcArray.shift();  
              src = srcArray.join('/');  
              $(this).attr('src', config.root + link + src);  
              console.info&&console.info("update link as:-->"+config.root + link + src);  
            }  
        }else{  
            console.info&&console.info("no src attr, skipped...");  
            console.info&&console.info($(this));  
        }  
      });  
      data[key] = $.html();  
    }  
  }  
});

### 6.7 添加文章结束提示语

> 提示：原文章中此处出现问题
![](problem2.png)
**核心代码**：

```html
<div>  
    {% if not is_index %}  
        <div style="text-align:center;color: #ccc;font-size:14px;display:flex;justify-content:center;">  
    <span style="display:inline-block;">------ 今天只会更爱哈尼 &nbsp;</span>  
    <span style="color:#f17c67;margin:0 5px;display:inline-block;animation: iconAnimate 1.33s ease-in-out infinite;"><i class="fa fa-heart" aria-hidden="true"></i></span>  
    <span style="display:inline-block;">&nbsp;&nbsp;The End of This Article------</span>  
        </div>  
    {% endif %}  
</div>
```

- 如果你想简单一点实现，直接复制这段代码，然后将其插入到 `themes/next/layout/_macro/post.swig` 文件的如下位置：
![](problem2-1.png)

当然，我们大多时候对功能都需要一个灵活性，也就是可以开关。为了实现这样的效果，我们先在`themes/next/layout/_macro/` 新建 `passage-end-tag.swig` 文件，将上面的 **核心代码** 添加进去。
然后我们修改`themes/next/layout/_macro/post.swig` 文件 ，将上面简单实现的代码替换成：

```swig
<!-- 文章结束表示语-->  
    <div>  
      {% if not is_index %}  
        {% include 'passage-end-tag.swig' %}  
      {% endif %}  
    </div>
```

然后，我们在主题配置文件末尾添加：

```yml
# 文章结束提示语  
passage_end_tag:   
 enable: true
```

我们就可以在这里将其设为`true` 或 `false` 来控制其显示。

> 个人在配置的时候，使用`<i class="fa fa-heart-o" aria-hidden="true">`一直不被解析，没找到原因，换了一个图标就显示了

> 另外一个问题，如果出现乱码的情况 **解决办法**：首先是把乱码部分对应的文件用写字板打开，转换其编码格式为`UTF-8`

> 最后一个应该注意的是，结束语是居中显示，需要注意左右两面内容的实际长度一致，否则很丑

### 6.8 添加博客字数和阅读时间统计功能

首先在站点根目录下配置依赖：

```bash
npm install hexo-symbols-count-time --save
```

然后再站点配置文件中加入以下内容：

```yml
symbols_count_time:  
  symbols: true #是否统计字数  
  time: true #是否统计阅读时长  
  total_symbols: true #是否统计总字数  
  total_time: true #是否统计总阅读时长
```

最后在主题配置文件中修改为以下内容：

```yml
# 字数及访问时间统计  
symbols_count_time:  
  separated_meta: true  #分隔线  
  item_text_post: true  #文章中的显示是否显示文本  
  item_text_total: true       #网页底部的显示是否显示文本  
  awl: 2 #平均每个字符的长度  
  wpm: 275 # 设定每分钟可阅读的字符数
```

### 6.9 修改 tag 图标

默认的 `tag` 样式为 `#` 不带图标，我们可以改成使用图标

新版Next 已经帮我们集成了这个功能，我们只要在主题配置文件中修改：

```yml
# Use icon instead of the symbol # to indicate the tag at the bottom of the post   
# 使用标签图标   
tag_icon: true
```

### 6.10 设置博客摘要显示

首先我们需要开启摘要功能，修改主题配置文件：参考该[方法](https://jiangding1990.github.io/2017/04/25/Hexo%E4%BD%BF%E7%94%A8NexT%E4%B8%BB%E9%A2%98%E8%AE%BE%E7%BD%AE%E4%B8%BB%E9%A1%B5%E6%98%BE%E7%A4%BA%E6%96%87%E7%AB%A0%E6%91%98%E8%A6%81%E6%96%B9%E6%B3%95/)

##### solution 1 在文章中使用进行手动截断(**推荐**)

```markdown
<!--more-->
```

##### solution 2 在文章中的`front-matter`中添加`description`，并提供文章摘要

这种方式只会在首页列表中显示文章的摘要内容，进入文章详情后不会再显示。使用这种方法也可以实现首页文章部分显示的效果

方法如下图所示：
![](problem3.png)
##### solution 3 自动生成摘要

想要自动生成文章摘要，需在`主题配置`文件中添加以下代码：

```yml
auto_excerpt:  
  enable: true  
  length: 150
```

其中的`length`值为摘要所截取的字符长度。

### 6.11 设置文章英文链接

hexo生成的默认文章链接格式为`： :year/:month/:day/:title/`，这种默认的配置缺点很明显，当文件名是中文的时候url链接里就有中文出现。

可以通过添加`urlname`字段实现文章的链接为英文，在md文件的Front-matter区域新增`urlname`属性，值为文章的英文title，参考如下：

```
---  
title: 基于Hexo+Next的主题优化总结  
urlname: summary-of-theme-optimization-based-on-hexo&next  
date: 2019-07-12 20:01:26  
categories:  
  - 工具  
tags:   
  - Hexo  
---
```


再将博客配置文件下的`permalink`值改为：

```yml
permalink: :year/:month/:day/:urlname/
```

### 6.12 Markdown首行缩进

在段落开头，输入以下字符，然后紧跟着输入文本即可。

```
&#160; &#160; &#160; &#160;
```

### 6.13 Markdown转义字符

md中用到的主要可能有语法意义的非空白符号有：
```
\ ` * _ { } [ ] ( ) # + - . ! 
```
在正常段落中要原样输出以上符号，一般需要加反斜杠\在前（连续两个反斜杠输出一个反斜杠。

### 6.14 修改文章间分割线

打开 `themes/next/source/css/_common/components/post/post-eof.styl` ,修改：

```css
.posts-expand {  
  .post-eof {  
    display: block;  
  //  margin: $post-eof-margin-top auto $post-eof-margin-bottom;    
    width: 0%; //分割线长度  
    height: 0px; // 分割线高度  
    background: $grey-light;  
    text-align: center;  
  }  
}
```

### 6.15 博文置顶

打开 `Hexo` 站点下 `node_modules/hexo-generator-index/lib/generator.js` 文件。代码全部替换为：(next 5.1以后主题已自带此功能)

```JavaScript
'use strict';  
var pagination = require('hexo-pagination');  
module.exports = function(locals){  
  var config = this.config;  
  var posts = locals.posts;  
    posts.data = posts.data.sort(function(a, b) {  
        if(a.top && b.top) { // 两篇文章top都有定义  
            if(a.top == b.top) return b.date - a.date; // 若top值一样则按照文章日期降序排  
            else return b.top - a.top; // 否则按照top值降序排  
        }  
        else if(a.top && !b.top) { // 以下是只有一篇文章top有定义，那么将有top的排在前面（这里用异或操作居然不行233）  
            return -1;  
        }  
        else if(!a.top && b.top) {  
            return 1;  
        }  
        else return b.date - a.date; // 都没定义按照文章日期降序排  
    });  
  var paginationDir = config.pagination_dir || 'page';  
  return pagination('', posts, {  
    perPage: config.index_generator.per_page,  
    layout: ['index', 'archive'],  
    format: paginationDir + '/%d/',  
    data: {  
      __index: true  
    }  
  });  
};
```

打开文章添加top字段,设置数值，数值越大文章越靠前：
```
---  
layout: layout  
title: 标签1  
date: 2017-08-18 15:41:18  
tags: 标签1  
top: 100  
---
```

### 6.16 文章顶部显示更新时间

打开主题配置文件 `_config.yml` ,搜索关键字 `updated_at` 设置为 `true` ：

```yml
# Post meta display settings  
post_meta:  
  item_text: true  
  created_at: true  
  updated_at: ture  
  categories: true
```

编辑文章,增加关键字`updated`（next可以根据文章改变时间自动更改）
```
---
layout: layout
title: 关于
date: 2017-08-18 15:41:18
updated: 2017-09-05 20:18:54 #手动添加更新时间
```