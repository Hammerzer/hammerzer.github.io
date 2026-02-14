---
title: Hexo博客框架Supplement
description: 记录Hexo的坑点和解决方案。
date: 2020-08-20
tags:
  - 博客搭建
  - Hexo
urlname: Hexo-Next-Supplement
categories: Tools and Platforms
---
>[!note] 本篇对 [[Hexo博客框架入坑指南]] 进行一些补充。

# 一、推送处理

## 1. 静态资源压缩

> 存在问题未解决

在站点目录下：

```bash
$ npm install gulp -g
```

安装gulp插件：

```bash
npm install gulp-minify-css --save  
npm install gulp-uglify --save  
npm install gulp-htmlmin --save  
npm install gulp-htmlclean --save  
npm install gulp-imagemin --save
```

在 `Hexo` 站点下添加 `gulpfile.js`文件，文件内容如下：

```javascript
var gulp = require('gulp');  
var minifycss = require('gulp-minify-css');  
var uglify = require('gulp-uglify');  
var htmlmin = require('gulp-htmlmin');  
var htmlclean = require('gulp-htmlclean');  
var imagemin = require('gulp-imagemin');  
// 压缩css文件  
gulp.task('minify-css', function() {  
  return gulp.src('./public/**/*.css')  
  .pipe(minifycss())  
  .pipe(gulp.dest('./public'));  
});  
// 压缩html文件  
gulp.task('minify-html', function() {  
  return gulp.src('./public/**/*.html')  
  .pipe(htmlclean())  
  .pipe(htmlmin({  
    removeComments: true,  
    minifyJS: true,  
    minifyCSS: true,  
    minifyURLs: true,  
  }))  
  .pipe(gulp.dest('./public'))  
});  
// 压缩js文件  
gulp.task('minify-js', function() {  
    return gulp.src(['./public/**/.js','!./public/js/**/*min.js'])  
        .pipe(uglify())  
        .pipe(gulp.dest('./public'));  
});  
// 压缩 public/demo 目录内图片  
gulp.task('minify-images', function() {  
    gulp.src('./public/demo/**/*.*')  
        .pipe(imagemin({  
           optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）  
           progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片  
           interlaced: false, //类型：Boolean 默认：false 隔行扫描gif进行渲染  
           multipass: false, //类型：Boolean 默认：false 多次优化svg直到完全优化  
        }))  
        .pipe(gulp.dest('./public/uploads'));  
});  
// 默认任务  
gulp.task('default', [  
  'minify-html','minify-css','minify-js','minify-images'  
]);
```

只需要每次在执行 `generate` 命令后执行 `gulp` 就可以实现对静态资源的压缩，压缩完成后执行 `deploy` 命令同步到服务器：

```bash
hexo g  
gulp  
hexo d
```

> `Tip` 可以把上面的三条命令编写进 package.json 的script，就可一键三连啦！

## 2. 本地站点推送到GitHub上

在站点更目录下：

```bash
$ npm install hexo-deployer-git --save
```

在 `Hexo` 站点的 `_config.yml` 中配置 `deploy`：

```yml
# Deployment  
## Docs: https://hexo.io/docs/deployment.html  
deploy:  
  type: git  
  repo: <repository url> #your github.io.git  
  branch: master  
$ hexo clean  
$ hexo d --g
```

- `hexo g` ：生成本地 public 静态文件
- `hexo d` ：部署到 Github 上
- 也可以缩写成：`hexo g --d` 

### Create a new post

```BASH
$ hexo new "My New Post"
```

More info: [Writing](https://hexo.io/docs/writing.html)

### Run server

```BASH
$ hexo server
```

More info: [Server](https://hexo.io/docs/server.html)

> ctrl+c ：终止服务

### Generate static files

```BASH
$ hexo generate
```

More info: [Generating](https://hexo.io/docs/generating.html)

### Deploy to remote sites

```BASH
$ hexo deploy
```

More info：[Hexo-API](https://hexo.io/zh-cn/docs/commands.html)

# 二、站点功能

## 1. 文章加密访问

打开 `themes/next/layout/_partials/head.swig`文件,在 `{% if theme.pace %}` 标签下的 `{% endif %}` 之前插入代码：

```JavaScript
<script>  
    (function(){  
        if('{{ page.password }}'){  
            if (prompt('请输入文章密码') !== '{{ page.password }}'){  
                alert('密码错误');  
                history.back();  
            }  
        }  
    })();  
</script>
```

在文章上应用：

```
---  
title: 2017观看影视  
date: 2017-09-25 16:10:03  
type:  
top:  
comments:  
categories: [影音, 影视]  
tags: [影音, 电影, 电视剧, 动画]  
password: 123456  
---
```

## 2. 添加热度

- 进入[LeanCloud官网](https://links.jianshu.com/go?to=https%3A%2F%2Fleancloud.cn%2F)，进行账号注册。登录后，进入控制台，创建应用，应用名为`Hexo`
    
- 创建应用后，点击存储，创建**Class**，**Class**命名为**Counter**，并限制写入
    
- 查看**AppID**和**AppKey**
    
- 打开`Blog/themes/next/layout/_macro/post.swig`，`command+F`搜索`leancloud-visitors-count`，在图片位置加入`<span>℃</span>`
    ![](pic1.png)
- 编辑主题配置文件，`command+f`搜索`leancloud_visitors`，将其值设为：`ture`，将**AppID**和**AppKey**粘贴到相应位置：
    

```YML
# Show number of visitors to each article.  
# You can visit https://leancloud.cn get AppID and AppKey.  
leancloud_visitors:  
  enable: ture  
  app_id: app_id  
  app_key: app_key
```

## 3. 添加免登陆评论系统

> 参考自该[博文](https://blog.csdn.net/jiunian_2761/article/details/97388997)

### 3.1 为什么选择Valine

在笔者进行评论系统选择时，我觉得我的需求就是方便，简洁，最重要一点是要支持`Markdown` ，对比之下，最终选定了这款Valine，当然，如果你不喜欢这样简洁的，可以参考 [Hexo（NexT 主题）评论系统哪个好？](https://www.zhihu.com/question/267598518)

### 3.2 第一步，注册LeanClound,获取APP ID 和 APP Key

- Valine 是基于 [LeanCloud](https://leancloud.cn/) 作为数据存储的，所以需要注册一个账号
    
- 注册完成后，我们找到`创建``应用`
    ![](pic2.png)
- 在这里填写你的应用名称,名称可以自己定义，然后下面选择`开发版` 点击`创建`
    
- 然后点击应用进入设置，在设置页，我们首先点击存储，查看是否有`Comment`和 `Counter`，没有则创建，权限设为无限制。
    ![](pic3.png)

![](pic4.png)
- 然后点击设置 > 安全中心 ,将除了数据存储的服务全部关闭
    
- 最后点击应用 Key 取得我们 `AppKey` 和 `App id`
    

### 3.3. 在Hexo Next主题中配置

- 首先打开 [https://www.jsdelivr.com/package/npm/valine](https://www.jsdelivr.com/package/npm/valine) 获取最新的 valine.min.js 的cdn地址
    
- 然后我们修改主题配置文件，配置CDN：
    
```YML
    # valine    
    # See: https://github.com/xCss/Valine    
    # Example:    
    # valine: //cdn.jsdelivr.net/npm/valine@1/dist/Valine.min.js    
    # valine: //cdnjs.cloudflare.com/ajax/libs/valine/1.3.4/Valine.min.js  valine: https://cdn.jsdelivr.net/npm/valine@1.3.9/dist/Valine.min.js
```
    
- 再打开配置Valine功能：
    
```YML
    # Valine   
    # You can get your appid and appkey from https://leancloud.cn   
    # More info available at https://valine.js.org   
    valine: # 功能开关    
        enable: true # When enable is set to be true, leancloud_visitors is recommended to be closed for the re-initialization problem within different leancloud adk version    
        appid:  # Your leancloud application appid #LeanClound获得的appid    
        appkey:  # Your leancloud application appkey #LeanClound获得的appkey   
        notify: false # Mail notifier. See: https://github.com/xCss/Valine/wiki # 邮件提醒    
        verify: false # Verification code     
        placeholder: 欢迎畅所欲言 # Comment box placeholder    
        avatar: mm # Gravatar style #默认头像设置    
        guest_info: nick,mail,link # Custom comment header    
        pageSize: 10 # Pagination size    
        language: zh-cn # Language, available values: en, zh-cn # 语言，设为zh-cn  # 是否开启当前文章阅读量统计    
        visitor: false # leancloud-counter-security is not supported for now. When visitor is set to be true, appid and appkey are recommended to be the same as leancloud_visitors' for counter compatibility. Article reading statistic https://valine.js.org/visitor.html    
        comment_count: true # If false, comment count will only be displayed in post page, not in home page 
```
    

### 3.4 指定文章（页面）评论功能是否开启

在 Hexo 博客中，评论的功能是在所有页面都默认开启的，但是有的时候我们在页面上不需要显示评论功能，例如分类，标记页面我们并不需要评论功能。

我们可以在 Front-matter 中通过`comments`属性设置true或false控制该页面或者是文章的评论功能是否打开，如我设置标签页面的评论功能关闭：

```
title: 标签  
date: 2019-07-18 15:16:50  
type: "tags"  
comments: false
```

### 3.5 自定义头像

> [valine官方文档](https://valine.js.org/avatar.html)

> Valine 目前使用的是[Gravatar](http://cn.gravatar.com/) 作为评论列表头像。
> 
> 请自行登录或注册[Gravatar](http://cn.gravatar.com/)，然后修改自己的头像。
> 
> 评论的时候，留下在[Gravatar](http://cn.gravatar.com/)注册时所使用的邮箱即可。

默认值为:
![](pic5.png)

## 4. 给博客添加网站地图`sitemap`

> 未实现

> 搜索引擎每天让蜘蛛在网站爬行来抓取页面，网站地图的作用就是给主动给蜘蛛喂数据

网站地图位于网站根目录下，有`sitemap.html`和`sitemap.xml`两种格式。百度搜索引擎及多数搜索引擎使用html格式，谷歌使用xml格式。两步完成网站地图自动生成功能。

**安装网站地图生成插件**

```BASH
npm install hexo-generator-sitemap --save
```

```BASH
npm install hexo-generator-baidu-sitemap --save
```

重新启动hexo，系统会在`public`根目录下生成`sitemap.xml`文件。

> 具体收录参考[此处](https://www.cnblogs.com/brady-wang/p/8493346.html)

# 三、常见问题

## 1 hexo开发环境迁移

> 参考自 [该博主](https://www.cnblogs.com/study-everyday/p/8902136.html)
> 
> 注意Next下配置文件夹！！

### 1.1 环境准备

安装 Git 客户端，参考[此处](https://zhuanlan.zhihu.com/p/443527549)

安装 node JS，参考[此处](https://blog.csdn.net/Coin_Collecter/article/details/136484312)

### 1.2 在 github 官网添加新电脑产生的密钥

### 1.3 源文件拷贝

将你原来电脑上个人博客目录下必要文件拷到你的新电脑上（比如F:/Blog目录下），注意无需拷全部，只拷如下几个目录：

```
_config.yml  
package.json   
scaffolds/   
source/   
themes/
```

### 1.4 安装 hexo

在 cmd 下输入下面指令安装 hexo：

```bash
npm install hexo-cli -g
```

### 1.5 进入 F:/Blog 目录（你拷贝到新电脑的目录），输入下面指令安装相关模块

```bash
npm install  
npm install hexo-deployer-git --save  // 文章部署到 git 的模块  
（下面为选择安装）  
npm install hexo-generator-feed --save  // 建立 RSS 订阅  
npm install hexo-generator-sitemap --save // 建立站点地图
```

### 1.6 测试

这时候使用 `hexo s` 基本可以看到你新添加的文章了。

### 1.7 部署发布文章

hexo clean   // 清除缓存 网页正常情况下可以忽略此条命令  
hexo g       // 生成静态网页  
hexo d       // 开始部署

### 1.8 Github 添加 SSH Keys

> 推荐该博主 [GitHub添加SSH key](https://www.himmy.cn/2019/07/06/github%E6%B7%BB%E5%8A%A0ssh-key/)

#### 1.8.1 打开Git Bash命令行窗口

#### 1.8.2 检查是否已有SSH

如果没有，会返回如下信息，继续第三步创建SSH

```bash
$ cd ~/.ssh  
bash: cd: /c/Users/Him/.ssh: No such file or directory
```

如果本地已经有创建SSH，会返回如下信息，表示本地已经有创建过SSH了，跳过第三步，直接看第四步

```bash
$ cd ~/.ssh  
$ ls  
id_rsa  id_rsa.pub  known_hosts
```

#### 1.8.3 创建SSH key

最后一个参数替换成你自己的GitHub注册邮箱

```bash
$ ssh-keygen -t rsa -C "your_email@example.com"  
Generating public/private rsa key pair.
```

接下来会提示你输入生成的key存放的路径，不设置直接回车的话会默认创建在C:/Users/你的用户账号/.ssh文件夹下

```bash
Enter file in which to save the key (/c/Users/Him/.ssh/id_rsa):  
Created directory '/c/Users/userpath/.ssh'.
```

再接下来会提示你输入密码，这个密码是用来每次提交的时候输入确认，可以不设置，直接回车两次

```bash
Enter passphrase (empty for no passphrase):  
Enter same passphrase again:
```

最后成功后会看到类似如下的输出，表示成功生成SSH key了，可以到C:/Users/你的用户账号/.ssh文件夹下看下

```bash
Your identification has been saved in /c/Users/Him/.ssh/id_rsa.  
Your public key has been saved in /c/Users/Him/.ssh/id_rsa.pub.  
The key fingerprint is:  
SHA256:RwvBINgH8CEt2KniltmykeyDsOseUYcwMzehFeyT86s 1225723686@qq.com  
The key's randomart image is:  
+---[RSA 2048]----+  
| o+%OO+o.        |  
|..=+%*+ ..       |  
| ..+o+o.. .      |  
|o.  o=.  o .     |  
|o oolalala S o      |  
| +.+.. . .       |  
|. .o    .        |  
|  . .  .         |  
|   . E.          |  
+----[SHA256]-----+
```

#### 1.8.4 添加SSH key到GitHub

首先复制`.ssh`文件夹下`id_rsa.pub`文件的内容，可以直接用文本编辑器打开复制，也可以用如下命令行复制

```bash
$ clip < ~/.ssh/id_rsa.pub
```

然后进入[https://github.com/settings/keys](https://github.com/settings/keys)设置，如果没有登录要先登录

或者登录后依次点击右上角Settings，然后再点击SSH and GPG keys

输入`title` 和 `key`

最后点击Add SSH key按钮保存

#### 1.8.5 测试SSH连接

输入如下命令

```bash
$ ssh -T git@github.com
```

会得到如下输出，询问是否确认连接，输入yes回车确认

```bash
The authenticity of host 'github.com (13.229.188.59)' can't be established.  
RSA key fingerprint is SHA256:nThbg6kXUpJWGl7mykeyCspRomTxdCARLviKw6E5SY8.  
Are you sure you want to continue connecting (yes/no)? yes

```
最后连接成功会看到如下输出

```bash
Warning: Permanently added 'github.com,13.229.188.59' (RSA) to the list of known hosts.  
Hi ghxiaoxiao! You've successfully authenticated, but GitHub does not provide shell access.
```

迁移完毕over

## 2 gitee双线部署提高访问速度

### 2.1 注册账号

### 2.2 创建仓库

创建一个与你的Gitee控件地址同名的空项目

> 比如我的Gitee空间地址为[https://gitee.com/Hammerzer](https://gitee.com/Hammerzer)，那么创建的项目名为Hammerzer。
> 
> 可能需要强制修改仓库名

最终博客部署后的访问地址为[https://hammerzer.gitee.io](https://hammerzer.gitee.io/)

> **注意**：如果创建仓库名称与空间地址不同，则需要访问 如[https://hammerzer.gitee.io/hammer](https://hammerzer.gitee.io/hammer)，同时也会导致`gitee page`无法显示css、js

### 2.3 修改配置

复制上一步创建的项目的地址，也就是仓库的`SSH地址`，类似于`git@gitee.com:hhhh/hhhh.git`

然后在Hexo配置文件_config.yml中找到deploy配置项，添加如下配置

> 可多线部署，如下书写（单线部署可不写 `github`/`gitee`/`coding`）
> 
> 记得冒号后有空格

```bash
deploy:  
  type: git  
  repo:   
  	gitee: git@gitee.hhhcom:/hhh.git  
  	github:   
  	coding:  
  branch: master
```

### 2.4 添加SSH

在Gitee添加自己电脑的ssh key，这样每次更新代码到Gitee就不用再输入密码了

获取电脑的SSH可以参考 [常见问题-1-1.8](#mark-one)

然后在Gitee的设置页面找到安全设置-->SSH公钥，用上一步获取的SSH创建一个新的公钥

> 此处插播一条 little tip
> 
> 上面的实现 `markdown` 自身链接跳转，下面给出所用代码：
> 
> `<a name="title"> </a>`
> 
> `<a href="#title"></a>`

### 2.5 部署hexo

### 2.6 开启Gitee Pages服务

- 在项目主页找到服务，点击后可以看到Gitee Pages
    
- 点击跳转Gitee Pages服务页面，点击启动按钮开启服务
    
- gitee pages会提示访问地址，然后就可以在浏览器输入[https://hammerzer.gitee.io](https://hammerzer.gitee.io/)访问
    

## 3 hexo双线部署在Gitee上出现的问题

### 3.1 在移动端出现点击事件失去默认行为

> 移动端区别于web端，有可能会默认阻止a标签默认行为，且在Web浏览器中调试时不会报错。
> 
> 因此，只要换一种导航方式，即可。代码如下

var href=document.getElementsByTagName('a');  
​  
for(var i=0;i<href.length;i++){  
    href[i].ontouchend=function(){  
        window.location.href=this.getAttribute("href");  
    }  
};

### 3.2 解决 gitee page 无法自动更新

> 参考简书[该博文](https://www.jianshu.com/p/6460df84a099)

> gitee page 只有付费版才能自动更新，免费版只能手动点击 “设置” 中的更新按钮

**自动化解决方案**：使用 puppeteer 操作浏览器进行更新按钮点击

```JavaScript
// 此处安装版本为 1.8.0  
const puppeteer = require('puppeteer');   
​  
async function giteeUpdate() {  
    const browser = await puppeteer.launch({  
        // 此处可以使用 false 有头模式进行调试, 调试完注释即可  
          headless: false,  
    });  
    const page = await browser.newPage();  
    await page.goto('https://gitee.com/login');  
    // 1. 选中账号控件  
    let accountElements = await page.$x('//*[@id="user_login"]') // 此处使用 xpath 寻找控件，下同  
    // 2. 填入账号  
    await accountElements[0].type('你的 gitee 账户')  
    // 3. 选中密码控件  
    let pwdElements = await page.$x('//*[@id="user_password"]')  
    // 4. 填入密码  
    await pwdElements[0].type('你的 gitee 密码')  
    // 5. 点击登录  
    let loginButtons = await page.$x('//*[@id="new_user"]/div[2]/div/div/div[4]/input')  
    await loginButtons[0].click()  
    // 6. 等待登录成功  
    await page.waitFor(1000)  
    await page.goto('你的 gitee page 更新按钮页面'); // 比如： https://gitee.com/yang0033/hexo-blog/pages  
    // 7.1. 监听步骤 7 中触发的确认弹框，并点击确认  
    await page.on('dialog', async dialog => {  
        console.log('确认更新')  
        dialog.accept();  
    })  
    // 7. 点击更新按钮，并弹出确认弹窗  
    let updateButtons = await page.$x('//*[@id="pages-branch"]/div[7]')  
    await updateButtons[0].click()  
    // 8. 轮询并确认是否更新完毕  
    while (true) {  
        await page.waitFor(2000)  
        try {  
            // 8.1 获取更新状态标签  
            deploying = await page.$x('//*[@id="pages_deploying"]')  
            if (deploying.length > 0) {  
                console.log('更新中...')  
            } else {  
                console.log('更新完毕')  
                break;  
            }  
        } catch (error) {  
            break;  
        }  
    }  
    await page.waitFor(500);  
    // 10.更新完毕，关闭浏览器  
    browser.close();  
}  
​  
giteeUpdate();
```

> 尝试未成功，待更新

### 3.3 出现跨域请求失败503

这种情况如果出现，修改网址为https，即可解决

## 4 继静态压缩glup无果之后的替代

> 参考该博主 [Hexo瞎折腾系列](https://blog.csdn.net/lewky_liu/article/details/82432003)

### 4.1 静态压缩的目的和手段

那么怎么提高hexo这个静态博客的页面加载速度呢？可以从以下的几个方面去入手：

- 将js文件尽可能放置到body的闭合标签之前，因为在加载或者引入js文件时是阻塞式的，如果我们在页面的最开始就引入这些js文件，而这些文件又比较大，会造成页面在渲染时长时间处于白屏状态。
    
- 尽量避免去引用访问速度非常低下的cdn或者图片，可以改用访问速度更快的cdn，或者将难以迅速加载的图片保存到自己的站点目录下，以免在加载图片时耗费了大量的时间，最后还加载不出来。
    
- 对页面的静态资源进行压缩，包括css、js和html等文件。我们自己添加的css和js文件为了可读性，往往会有很多换行和空格，这些对于浏览器来说并没什么卵用，甚至还会降低渲染页面的速度。至于html文件，由于Markdown转成html的bug，会导致页面存在大量的空白，如果你查看下页面的源代码，就会发现这些大量的空白符，十分难看。这也会造成页面渲染的性能问题。
    

### 4.2 hexo的压缩静态资源插件

网上有很多相关的博文，常规的做法是使用`gulp`来进行压缩，`gulp`是`Node.js`下的自动构建工具，通过一列的task执行步骤进行自动流程化处理。

使用这种方法会比较麻烦，每次压缩时还需要输入额外的命令，比较繁琐，个人不是很喜欢，有兴趣的可以去自己了解下[相关的东西](https://segmentfault.com/a/1190000009544924#articleHeader8)。这篇教程里很多详细的说明，里边有说到gulp的使用，绝对的精品文章。

这里我选择的是由rozbo大佬开发的`hexo-neat`压缩插件，配置简单，无需额外命令，你只要使用原本的调试三连或者部署三连就可以自动帮你完成静态资源的压缩！

### 4.3 如何使用hexo-neat

> **在站点根目录下安装**hexo-neat

```bash
npm install hexo-neat --save1
```

### 4.4 为站点配置文件添加相关配置

下边是我自己站点的相关配置，直接添加到站点配置文件`_config.yml`的末尾就可以。可以安装自己的需求去自定义配置，不过有些注意事项，可以参考我后文的踩坑记录。

```yml
# hexo-neat  
# 博文压缩  
neat_enable: true  
# 压缩html  
neat_html:  
  enable: true  
  exclude:  
# 压缩css    
neat_css:  
  enable: true  
  exclude:  
    - '**/*.min.css'  
# 压缩js  
neat_js:  
  enable: true  
  mangle: true  
  output:  
  compress:  
  exclude:  
    - '**/*.min.js'  
    - '**/jquery.fancybox.pack.js'  
    - '**/index.js'  
```

### 4.5 hexo-neat插件踩坑记录

由于在使用hexo-neat插件时，可以在命令窗口中看到各个文件的压缩率，于是我就开始捣鼓跳过哪些文件可以让效率更高。在鼓捣了一段时间之后，记录下使用该插件的一些注意事项，避免日后重蹈覆辙，也希望能对各位看官有所帮助。

#### 4.5.1 跳过压缩文件的正确配置方式

如果按照官方插件的文档说明来配置`exclude`，你会发现完全不起作用。这是因为配置的文件路径不对，压缩时找不到你配置的文件，自然也就无法跳过了。你需要给这些文件指定正确的路径，万能的配置方式如下：

neat_css:  
  enable: true  
  exclude:  
    - '**/*.min.css'1234

#### 4.5.2 压缩html时不要跳过`.md`文件

`.md`文件就是我们写文章时的markdown文件，如果跳过压缩`.md`文件，而你又刚好在文章中使用到了NexT自带的tab标签，那么当hexo在生成静态页面时就会发生解析错误。这会导致使用到了tab标签的页面生成失败而无法访问。

当初为了找到这个原因花了我两个晚上的时间，简直是夜不能寐。

#### 4.5.3 压缩html时不要跳过`.swig`文件

`.swig`文件是模板引擎文件，简单的说hexo可以通过这些文件来生成对应的页面。如果跳过这些文件，那么你将会发现，你的所有页面完全没有起到压缩的效果，页面源代码里依然存在着一大堆空白。

## 5 使用自定义的CSS样式

> 参考 博主 [该文章](https://segmentfault.com/a/1190000003846777)

想自定义About页面，需要使用自定义的css样式因为markdown支持html标签，使用自定义的CSS样式还是不错的。

下面总结一下具体的使用过程：

### 5.1 添加样式支持

为规范化开发，这里需要添加子集的样式文件。 首先，在样式文件的`source`文件夹下找到`css`文件夹，打开`main.styl`文件，在最后添加：

    //My Layer  
    //--------------------------------------------------  
    @import "_my/mycss";

### 5.2 新建自定义样式

找到样式文件夹`css` 新建`_my`文件夹，在其中新建`mycss.styl`文件，之后就可以按照stylus的格式自定义样式了。

### 5.3 解决 gitee page 更新后css仍然不变

强制刷新浏览器 `Shift+F5`，这么傻的错误我居然还犯

## 6 插入思维导图

> 参考 [简书](https://www.jianshu.com/p/1c4657f33899)

### 6.1 在hexo根目录下安装

```bash
npm install hexo-simple-mindmap
```

### 6.2 在`Markdown`中使用思维导图

```
{% pullquote mindmap mindmap-md %}  
- Front End  
    - 任何方向  
        - 编程语言  
            - Java  
        - SQL  
        - Linux  
        - Git  
    - 技术  
        - Java Web  
        - 数据库  
        - Docker  
        - svn  
        - 消息队列(MQ)  
        - mycat  
        - 大数据  
            - Hadoop  
            - HBase  
    - 内功  
        - 计算机基础  
            - 计算机网络  
            - 计算机操作系统  
            - 编译原理  
            - 计算机组成原理  
        - 数据结构与算法  
        - 设计模式  
        - 性能优化  
        - 架构设计  
        - 软件工程  
    - 其他  
        - 英语  
        - 博客  
{% endpullquote %}
```

### 6.3 存在的问题

搜集资料发现应该就这么操作就可以正确插入思维导图，然而我却遇到了很多问题。

#### 6.3.1 思维导图节点未被渲染

更新`gitee pages`服务之后，出现思维导图限制框，但思维导图的节点没有被渲染，仍然是以无序列表形式展现

`console`报错未找到 `‘$’`，这么说应该是这个插件直接使用了`JQuery`但未引用

**解决办法一**：直接把`jquery`下载到本地，放在`theme/source/js`下

然后再Markdown中引入

```javascript
<script src="/js/jquery.min.js"></script>
```

**解决办法二**：使用cdn，使用时应注意应该使用 `https`传输，否则像`chrome`会默认阻止连接 `jquery cdn`

例如我是把下面的代码在 `themes/next/layout/_partials/head/head.swig`中全局引入

```javascript
<script src="https://libs.baidu.com/jquery/2.0.0/jquery.min.js"></script>
```

## 7 插入流程图

安装hexo-filter-flowchart：
```bash
npm install --save hexo-filter-flowchart
```

具体的流程图`Markdown`语法，见[另一篇](https://hammerzer.gitee.io/2020/08/26/markdown/)

## 8 插入时序图

> [参考源](https://www.dazhuanlan.com/2019/12/24/5e0209fc19074/)

#### 安装

[hexo-filter-sequence](https://github.com/bubkoo/hexo-filter-sequence) 插件:

```bash
npm install --save hexo-filter-sequence
```

#### 配置

站点配置文件 `_config.yml` 中增加如下配置:

```yml
sequence:  
  webfont: https:  
  raphael: https://cdn.bootcss.com/raphael/2.2.7/raphael.min.js  
  underscore: https://cdn.bootcss.com/underscore.js/1.8.3/underscore-min.js  
  sequence: https://cdn.bootcss.com/js-sequence-diagrams/1.0.6/sequence-diagram-min.js  
  css: # optional, the url for css, such as hand drawn theme   
  options:   
    theme: simple  
    css_class:
```

#### 修改源码

源码修改后才能正常使用，进入插件目录作如下修改：

```javascript
// index.js  
var assign = require('deep-assign');  
var renderer = require('./lib/renderer');  
​  
hexo.config.sequence = assign({  
  webfont: 'https://cdn.bootcss.com/webfont/1.6.28/webfontloader.js',  
  raphael: 'https://cdn.bootcss.com/raphael/2.2.7/raphael.min.js',  
  underscore: 'https://cdn.bootcss.com/underscore.js/1.8.3/underscore-min.js',  
  sequence: 'https://cdn.bootcss.com/js-sequence-diagrams/1.0.6/sequence-diagram-min.js',  
  css: '',  
  options: {  
    theme: 'simple'  
  }  
}, hexo.config.sequence);  
​  
hexo.extend.filter.register('before_post_render', renderer.render, 9);  
​

// lib/renderer.js, 25 行  
if (sequences.length) {  
      var config = this.config.sequence;  
      // resources  
      data.content += '<script src="' + config.webfont + '"></script>';  
      data.content += '<script src="' + config.raphael + '"></script>';  
      data.content += '<script src="' + config.underscore + '"></script>';  
      data.content += '<script src="' + config.sequence + '"></script>';  
      ......  
}
```
## 9 插入mermiad 甘特图

> [Hexo引入Mermaid流程图和MathJax数学公式](https://blog.csdn.net/qq_36347375/article/details/90478335)
> 
> 参考上面的文章，这是我见过的少有的没有坑的文章，点个👍

#### 安装

在`blog`根目录_安装mermaid插件_

```bash
npm install hexo-filter-mermaid-diagrams --save  *# 安装mermaid插件*
```

#### 修改配置

- 修改主题theme中的`_config.yml` 内的 `mermaid` 模块为 `true`
    
- 其实可以deploy一下看看可行否，不行再继续（我在这一步就可以正确显示）：在根目录下的`_config.yml`中添加
    

```yml
# mermaid chart  
​  
mermaid: ## mermaid url https://github.com/knsv/mermaid  
  enable: true  # default true  
  version: "7.1.2" # default v7.1.2  
  options:  # find more api options from https://github.com/knsv/mermaid/blob/master/src/mermaidAPI.js  
    #startOnload: true  // default true
```

- 其实可以`deploy`一下看看可行否，不行再继续：编辑`blog/themes/next/layout/_partials/footer.swig`，在最后添加如下内容
    

```swig
{% if theme.mermaid.enable %}  
​  
  <script src='https://unpkg.com/mermaid@{{ theme.mermaid.version }}/dist/mermaid.min.js'></script>  
  <script>  
    if (window.mermaid) {  
      mermaid.initialize({{ JSON.stringify(theme.mermaid.options) }});  
    }  
  </script>  
​  
{% endif %}
```

> [多样的Mermaid流程图参考](http://www.guide2it.com/post/2019-03-10-1-make-flowcharts-with-mermaid-in-markdown/)

## 10 工程文件迁移的突发情况

```
WARN No layout: index.html
```

上面的报错一度让我自闭，甚至要放弃Hexo，这关键时刻找到巴哥所在才平复我好久好久不能自己的心情。

报错原因竟然是迁移时，没有下载`Next`主题文件，需要在文件主目录执行

```bash
git clone https://github.com/theme-next/hexo-theme-next themes/next
```

至于后面的配置文件，现在一定要记录下来，不想再受折磨了！！！

`2022/1/6`终于修复完成，但是修复文件无法上传`git`仓库

`2025/1/19`更新：该 `next` 文件夹并没有上传到 Git 仓库，且上面的仓库内容会导致不能显示原有的模板【解决办法：保留并拷贝此 next 文件夹】。

## 11 对Hexo文件结构的理解相关

### 11.1 引入静态文件

Hexo 中静态文件放在皮肤文件夹中，即

```
your_project/themes/<theme_name>/source
```

在这个文件夹中会有 `js, css, img` 等文件夹，没有的话可以自己创建，将自定义的 js 放到其中，在 `markdown` 文章中直接引用即可

```javascript
<script type="text/javascript" src="/js/test.js"></script>
```

### 11.2 引入`cdn`

观察`layout`文件中的`index.swing`可见是组件式的写法

```swig
{% extends '_layout.swig' %}  
{% import '_macro/sidebar.swig' as sidebar_template with context %}  
​  
{% block title %}{{ title }}{%- if theme.index_with_subtitle and subtitle %} - {{ subtitle }}{%- endif %}{% endblock %}  
​  
{% block class %}index posts-expand{% endblock %}  
​  
{% block content %}  
​  
  {%- for post in page.posts.toArray() %}  
    {{ partial('_macro/post.swig', {post: post, is_index: true}) }}  
  {%- endfor %}  
​  
  {% include '_partials/pagination.swig' %}  
​  
{% endblock %}  
​  
{% block sidebar %}  
  {{ sidebar_template.render(false) }}  
{% endblock %}
```

我就将cdn写进了`layout.swing`中，或者如`jquery`可以在`next`的配置文件中写入：找到`vendors`写入cdn

但实际操作情况中，后者仍然出现找不大相应文件的错误

**解决【2023.7.12】**

写入`themes\next\layout\_layout.swig`
![](pic8.png)
## 12 解决 `Mixed Content` 问题

在将写好的静态页面部署显示时，因为`gitHub`是`https`的，而在静态网页中有引用`http`的包，报错如下：
![](pic6.png)
**解决办法一**：在`header`中

```
<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">
```

**解决办法二**：一般引用的`cs`包或`js`包都是可以直接改写成`https`的 ，所以可以把`http`都改写成`https`

## 13 解决关于 `The-Second-Birthday` 引入`js`的问题

> 注意：不能直接js文件放入该`Markdown` 对应的图片文件夹中，否则会在首页及归档页出现【未命名的展示】

目前的解决办法：

- 将js/css放入 `themes/next/source/lib` 文件夹下
    
- 在`md文件`中直接插入 `<link><script>` 标签，如：
    

```javascript
<link type="text/css" rel="stylesheet" href="https://hammerzer.github.io/lib/default.css">  
<script type="text/javascript" src="https://hammerzer.github.io/lib/heart_tree.js"></script>
```

## 14、解决新建post后的匹配失败问题

原文的`post`头如下：

```
title: 入门深度学习  
date: 2023-07-09 09:59:39  
urlname:Introduction-to-deep-learning  
tags:Deep Learning  
categories:Artificial Intelligence
```

**解决**：对`categories`的内容加`[]`后解决【可能存在疑问】



## 15 解决对于 `Font Awesome` 的支持

在本项目中，采用的策略是：将`Font Awesome`的`css`文件下载，进行本地存储

对于调用方式，在`head.swig`使用相应语法进行调用

【2023.7.12更新：将`Awesome`升级到`Ver6`】

> Swig语法的入门：原文[传送门](https://blog.csdn.net/weixin_42363997/article/details/83143407)
> 
> 值得注意：注释方法为 `{#注释#}`
> 
> `fa`前缀在`5.x`版本中已弃用。新的默认设置是实心的`fas`样式和品牌的`fab`样式。
> 
> Font Awesome 图标参考[传送门](https://fa5.dashgame.com/#/)

【2023.7.18更新：暂时不适用`ver6`】

> 原因：文件过大，每次上传耗时长
> 
> `fontawesome-free-6.4.0-web`包位置：`E:\About Chase\Art of Programming-0\hammerzer-blog-source`

此时，新图标的获取方式：[传送门](https://fa5.dashgame.com/#/%E5%9B%BE%E6%A0%87)

> 使用方式：如
```javascript
<i class="fas fa-brain" style="margin-right:10px;"></i>
```
> <i class="fas fa-brain" style="margin-right:10px;"></i>

## 16 解决新建文章后无法编码的问题

```bash
reason: 'can not read a block mapping entry; a multiline key may not be an implicit key',  
    mark: Mark {  
      name: null,  
      buffer: 'title: CPP-BASE-1\n' +  
        'date: 2024-03-15 16:51:50\n' +  
        'urlname:cpp-base-1\n' +  
        'tags: [CPP基础]\n' +  
        'categories: CPP\n' +  
        '\x00',  
      position: 67,  
      line: 3,  
      column: 4  
    }  
  }  
} Process failed: %s _posts/CPP-BASE-1.md
```

出现问题原因是头部缺少空格，解决方案很简单，只需在 `title:` `date：` `tags：`后面加上一个空格，然后进行信息输入即可

## 17 解决Warning：缺少属性

```BASH
Accessing non-existent property "" of module exports inside circular dependency
```

警告的原因的`Node.js`的版本问题，由于没有发生致命错误，本项目未解决此警告。

**解决办法**：将`Node.js`降级到`12`，目前`18.16`

## 18 解决一个迁移后的Git问题

本问题中对迁移的场景：在更换硬盘前，`git push` 本地工程文件，并拷贝复制文件夹至新系统中，再次提交时出现提交错误【拒绝提交】：

```POWERSHELL
PS D:\AboutChase\Art of Programming-0\hammerzer-blog> git push  
To https://gitee.com/Hammerzer/hammerzer-blog.git  
 ! [rejected]        master -> master (fetch first)  
error: failed to push some refs to 'https://gitee.com/Hammerzer/hammerzer-blog.git'         
hint: Updates were rejected because the remote contains work that you do not  
hint: have locally. This is usually caused by another repository pushing to  
hint: the same ref. If you want to integrate the remote changes, use  
hint: 'git pull' before pushing again.  
hint: See the 'Note about fast-forwards' in 'git push --help' for details.
```

在不同的机器上做了提交，远程分支上存在本地分支不存在的提交，可以先`fetch`在`merge`，也就是`pull`，把远程分支上的提交合并到本地分支之后再`push`。

如果确定远程分支上的提交都不需要了，可以直接`git push origin master -f`强制让本地分支覆盖远程分支。

## 19 解决一个迁移后的Node问题

重装Node后，npm没有权限导致的报错：

```POWERSHELL
PS D:\AboutChase\Art of Programming-0\hammerzer-blog> npm i  
npm error code EPERM  
npm error syscall mkdir  
npm error path C:\Program Files\nodejs\node_cache\_cacache  
npm error errno EPERM  
npm error FetchError: Invalid response body while trying to fetch https://registry.npmmirror.com/gulp: EPERM: operation not permitted, mkdir 'C:\Program Files\nodejs\node_cache\_cacache'  
npm error     at C:\Program Files\nodejs\node_modules\npm\node_modules\minipass-fetch\lib\body.js:170:15  
npm error     at async Response.json (C:\Program Files\nodejs\node_modules\npm\node_modules\minipass-fetch\lib\body.js:75:17)  
npm error     at async RegistryFetcher.packument (C:\Program Files\nodejs\node_modules\npm\node_modules\pacote\lib\registry.js:98:25)  
npm error     at async RegistryFetcher.manifest (C:\Program Files\nodejs\node_modules\npm\node_modules\pacote\lib\registry.js:128:23)  
npm error     at async #fetchManifest (C:\Program Files\nodejs\node_modules\npm\node_modules\@npmcli\arborist\lib\arborist\build-ideal-tree.js:1199:20)  
npm error     at async #nodeFromEdge (C:\Program Files\nodejs\node_modules\npm\node_modules\@npmcli\arborist\lib\arborist\build-ideal-tree.js:1037:19)  
npm error     at async #buildDepStep (C:\Program Files\nodejs\node_modules\npm\node_modules\@npmcli\arborist\lib\arborist\build-ideal-tree.js:901:11)  
npm error     at async Arborist.buildIdealTree (C:\Program Files\nodejs\node_modules\npm\node_modules\@npmcli\arborist\lib\arborist\build-ideal-tree.js:181:7)  
npm error     at async Promise.all (index 1)  
npm error     at async Arborist.reify (C:\Program Files\nodejs\node_modules\npm\node_modules\@npmcli\arborist\lib\arborist\reify.js:131:5) {    
npm error   code: 'EPERM',  
npm error   errno: 'EPERM',  
npm error   syscall: 'mkdir',  
npm error   path: 'C:\\Program Files\\nodejs\\node_cache\\_cacache',  
npm error   type: 'system',  
npm error   requiredBy: '.'  
npm error }  
npm error  
npm error The operation was rejected by your operating system.  
npm error It's possible that the file was already in use (by a text editor or antivirus),  
npm error or that you lack permissions to access it.  
npm error  
npm error If you believe this might be a permissions issue, please double-check the  
npm error permissions of the file and its containing directories, or try running  
npm error the command again as root/Administrator.  
npm notice  
npm notice New patch version of npm available! 10.8.2 -> 10.8.3  
npm notice Changelog: https://github.com/npm/cli/releases/tag/v10.8.3  
npm notice To update run: npm install -g npm@10.8.3  
npm notice  
npm error Log files were not written due to an error writing to the directory: C:\Program Files\nodejs\node_cache\_logs  
npm error You can rerun the command with `--loglevel=verbose` to see the logs in your terminal
```
解决方法有两个:

1. 以管理员权限运行CMD，再执行`npm install`
    
2. 既然是权限问题，修改没有访问权限的文件夹权限即可【尤其是`node_cache`】。
    

## 20 解决一个迁移后的图片路径问题

Hexo生成的静态网页中，图片地址为：

```
update link as:-->/.io//pic2.png
```

> 莫名其妙地多了个`.io` ，真Fuck You!

解决思路来自这篇文章：[Hexo 图片路径问题](https://blog.csdn.net/m0_51390969/article/details/139906818)【总结就是直接生成图片`url`的那一段脚本代码】

在`node_modules`中的 `hexo-asset-image` 模块中，直接修改 `index.js`：

```JAVASCRIPT
'use strict';  
var cheerio = require('cheerio');  
​  
// http://stackoverflow.com/questions/14480345/how-to-get-the-nth-occurrence-in-a-string  
function getPosition(str, m, i) {  
  return str.split(m, i).join(m).length;  
}  
​  
//可以看到这是在渲染post后追加的一个过滤器  
hexo.extend.filter.register('after_post_render', function(data){  
  var config = hexo.config;  
  if(config.post_asset_folder){  
    var link = data.permalink;  
    var beginPos = getPosition(link, '/', 3) + 1;  
    var appendLink = '';  
    // In hexo 3.1.1, the permalink of "about" page is like ".../about/index.html".  
    // if not with index.html endpos = link.lastIndexOf('.') + 1 support hexo-abbrlink  
    if(/.*\/index\.html$/.test(link)) {  
      // when permalink is end with index.html, for example 2019/02/20/xxtitle/index.html  
      // image in xxtitle/ will go to xxtitle/index/  
      appendLink = 'index/';  
      var endPos = link.lastIndexOf('/');  
    }  
    else {  
      var endPos = link.lastIndexOf('.');  
    }  
    link = link.substring(beginPos, endPos) + '/' + appendLink;  
    // console.info("!!!!!!!!!!"+link +"1!!!!");//link = .io//  
      
    var toprocess = ['excerpt', 'more', 'content'];  
    for(var i = 0; i < toprocess.length; i++){  
      var key = toprocess[i];  
​  
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
          if(!(/http[s]*.*|\/\/.*/.test(src)  
            || /^\s+\//.test(src)  
            || /^\s*\/uploads|images\//.test(src))) {  
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
​  
            // $(this).attr('src', config.root + link + src);//config.root = /  
            // console.info&&console.info("update link as:-->"+config.root + link + src);  
            //！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！  
            //直接修改为想要的url格式：此处想要 ./2-3.png  
            $(this).attr('src', "." + config.root + src);  
            console.info&&console.info("update link as:-->"+ "." + config.root + src);  
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
```

## 21 解决迁移后VSCode的Hexo命令不可用

参考[此博文](https://blog.csdn.net/weixin_39278265/article/details/103438787)，总之很奇怪。

```BASH
hexo : 无法将“hexo”项识别为 cmdlet、函数、脚本文件或可运行程序的名称。
```

总结来说，就是把 `C:\Program Files\nodejs\node_global` 直接放进path环境变量中，别使用 `NODE_PATH` 在引入到path。当然也有可能我的格式写错了。

## 22 解决代码块缩进大的问题

问题描述：`hexo`的`butterfly`、`next`主题下，代码块缩进特别大。

对比发现，当缩进为一个`tab`时才会出现问题。当缩进为4个空格时，则表现正常。

> 可能原因：缩进使用了tab，在HTML下，默认等于8个空格，建议修改为空格缩进，或者修改tab-size属性
> 
> 把vscode的缩进改成空格就好了。但逐个调整显然不可能！

**解决办法**：`hexo根目录/_config.yml`第50行(若没改过的话)，`tab_replace`改为四个空格，如下：

```YML
highlight:  
  line_number: true  
  auto_detect: false  
  tab_replace: '    '   
  wrap: true  
  hljs: false
```

## 23 解决项目迁移后出现的Github失联报错

```BASH
fatal: unable to access 'https://github.com/Hammerzer/hammerzer.github.io.git/': Recv failure: Connection was reset  
FATAL {  
  err: Error: Spawn failed  
      at ChildProcess.<anonymous> (C:\WorkArea\BLOG\hammerzer-blog\node_modules\hexo-deployer-git\node_modules\hexo-util\lib\spawn.js:51:21)  
      at ChildProcess.emit (node:events:519:28)  
      at cp.emit (C:\WorkArea\BLOG\hammerzer-blog\node_modules\cross-spawn\lib\enoent.js:34:29)  
      at ChildProcess._handle.onexit (node:internal/child_process:294:12) {  
    code: 128  
  }  
} Something's wrong. Maybe you can find the solution here: %s https://hexo.io/docs/troubleshooting.html
```

> 中间可能为此新设备设置了Gthub的ssh

**解决办法**：修改host文件，即将以下内容添加到 `hosts` 文件【目录为：`C:\Windows\System32\drivers\etc`】最后一行。

```
140.82.112.3 github.com  
199.232.5.194 github.global.ssl.fastly.net  
54.231.114.219 github-cloud.s3.amazonaws.com
```