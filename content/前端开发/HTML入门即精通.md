---
title: HTML入门即精通
description: HTML的知识框架
urlname: Mastering-HTML-from-the-beginning
date: 2020-08-28
tags: [HTML]
categories: 前端开发
draft:
---

# CONTENT OUTLINE

> [!note] 总结了关于`HTML`的基本问题
>
> -  HTML 基础
>
>-  HTML 渲染
>
> -  HTML 标签
>
> -  HTML Meta
>
> -  HTML 离线缓存


# 一 HTML 基础
## 1 HTML新特性

> [!tip] 参考自[该文章](https://www.cnblogs.com/gaosirs/p/10756524.html)


## 2 浏览器标准模式和怪异模式

> [!tip] 转自[简书](https://www.jianshu.com/p/dcab7cde8c04)

### 标准模式和怪异模式的来由

在HTML与CSS的标准化未完成之前，各个浏览器对于HTML和CSS的解析有各自不同的实现，而有很多旧的网页都是按照这些非标准的实现去设计的。在HTML与CSS标准确定之后，浏览器一方面要按照标准去实现对HTML与CSS的支持，另一方面又要保证对非标准的旧网页设计的后向兼容性。因此，现代的浏览器一般都有两种渲染模式：**标准模式**和**怪异模式**。

1. 在**标准模式**下，浏览器按照HTML与CSS标准对文档进行解析和渲染；
2. 而在**怪异模式**下，浏览器则按照旧有的非标准的实现方式对文档进行解析和渲染。

这样的话，对于旧有的网页，浏览器启动怪异模式，就能够使得旧网页正常显示；对于新的网页，则可以启动标准模式，使得新网页能够使用HTML与CSS的标准特性。

### 浏览器如何确定使用哪种渲染模式

知道了这两种渲染模式的来由，那剩下的问题就是浏览器如何能够确定应该使用哪种模式了。其实归根结底就是，浏览器如何能将旧网页与新网页区分开来。

 平常编写网页的时候，一般都会见到HTML文档的头部会有文档类型声明：`DOCTYPE`。当浏览器遇到正确的文档声明时，浏览器就会启动标准模式，按照制定的文档类型标准解析和渲染文档。而对于旧有的网页，由于网页编写的当时标准还没有确定，所以一般是不会有文档类型声明的。所以，对于没有文档类型声明或者文档类型声明不正确的文档，浏览器就会认为它是一个旧的HTML文档，就会使用怪异模式解析和渲染该文档。关于`DOCTYPE`的更详细说明，请戳这里 [DOCTYPE声明作用及用法详解](https://www.jb51.net/web/34217.html)。

### 标准模式与怪异模式的两个常见区别

- 盒模型的处理差异：标准CSS盒模型的宽度和高度等于内容区的高度和宽度，不包含内边距和边框，而IE6之前的浏览器实现的盒模型的宽高计算方式是包含内边距和边框的。因此，对于IE，怪异模式和标准模式下的盒模型宽高计算方式是不一样的；

- 行内元素的垂直对齐：很多早期的浏览器对齐图片至包含它们的盒子的下边框，虽然CSS的规范要求它们被对齐至盒内文本的基线。标准模式下，基于Gecko的浏览器将会对齐至基线，而在quirks模式下它们会对齐至底部。最直接的例子就是图片的显示。在标准模式下，图片并不是与父元素的下边框对齐的，如果仔细观察，你会发现图片与父元素下边框之间存在一点小空隙。那是因为标准模式下，图片是基线对齐的。而怪异模式下，则不存在这个问题。具体请看这篇文章 [CSS深入理解vertical-align和line-height的基友关系](https://www.zhangxinxu.com/wordpress/2015/08/css-deep-understand-vertical-align-and-line-height/?shrink=1)。

## 3 HTML与XHTML的区别

- `HTML`(文本标记语言)是英文HyperText Markup Language的简称，用于创建网页的标准标记语言，html并不是编程语言，HTML 运行在浏览器上由浏览器来解析翻译给网站访客，它是建设网站的基础。Html5代表了下一代html的发展，html5功能已经很强大。

- `XHTML`(可扩展标识语言)是The Extensible Markup Language的简写，XHTML 1.0在2000年1月26日成为W3C的推荐标准。XHTML1.0是源自W3C的最新的HTML标准，是Web的语言，是M站软件幵发必不可少的Web构件之一，每一个Web开发者都需要对它熟练掌握。

**功能区别：**

- HTML对于各大浏览器兼容性较差（pc端浏览器、手机端浏览器、PAD），对于网页页面编写技巧要求比较高，现在web前端开发的静态网页，一般都是html4.0，HTML5就另当别论了。
- XHTML可以很好处理各大浏览器的兼容(pc端浏览器、手机端浏览器、PAD)，看起来与HTML有些相象但是和HTML有不少的区别，XHTML的语法较为严谨，习惯松散结构的HTML编写者刚开始接触XHTML有些不习惯。XHTML结合了部分XML的强大功能及大多数HTML的简单特性。

**书写习惯区别**

- HTML标签不区分大小写XHTML所有标签都必须小写。
- XHTML标签必须成双成对。
- html对标签顺序要求不严格，XHTML标签顺序必须正确

## 4 使用data-*

- data-* 属性用于存储页面或应用程序的私有自定义数据。
- data-* 属性赋予我们在所有 HTML 元素上嵌入自定义 data 属性的能力。
- 存储的（自定义）数据能够被页面的 JavaScript 中利用，以创建更好的用户体验（不进行 Ajax 调用或服务器端数据库查询）。

data-* 属性包括两部分：

```html
  <element data-*="somevalue">
```

- 属性名不应该包含任何大写字母，并且在前缀 "data-" 之后必须有至少一个字符
- 属性值可以是任意字符串

> [!note] 用户代理会完全忽略前缀为 "data-" 的自定义属性。

**Example**：

```html
<!DOCTYPE html>
<html>
<head>
<script>
function showDetails(animal) {
var animalType = animal.getAttribute("data-animal-type");
alert(animal.innerHTML + "是一种" + animalType + "。");
}
</script>
</head>
<body>

<h1>物种</h1>

<p>点击某个物种来查看其类别：</p>

<ul>
<li onclick="showDetails(this)" id="owl" data-animal-type="鸟类">喜鹊</li>
<li onclick="showDetails(this)" id="salmon" data-animal-type="鱼类">金枪鱼</li> 
<li onclick="showDetails(this)" id="tarantula" data-animal-type="蜘蛛">蝇虎</li> 
</ul>

</body>
</html>
```

**优势**

- 自定义属性，可以被js很好的操作
- H5的新属性
- 通过js的element.dataset.*或jQuery的data('*')拿到，*可以为url等字符
- 框架的数据绑定，例如`data-ng-if="cs==1"`

**使用**

 data-toggle 这种以 **data-** 开头的格式放在元素上表示元素携带的数据，如：

```html
<img id="img" src="small.jpg" data-bigimg="big.jpg"/>
```

JQuery的 **data()** 方法可以直接操作，如：

```js
//获取：
var bigImage = $("#img").data("bigimg";//注意，这里不用加 data-
//设置：
$("#img").data("bigimg","newBig.jpg";//注意，这里也不用加 data-
```

用这种 `$("[data-bigimg]")` 的方式可以选择所有具有 `data-bigimg` 这个属性的元素。

也可以直接通过`$("#img").attr("data-bigimg");` 来获取和设置



## 5 HTML模板引擎

> 模板引擎（这里特指用于Web开发的模板引擎）是为了使用户界面与业务数据（内容）分离而产生的，它可以生成特定格式的文档，用于网站的模板引擎就会生成一个标准的[HTML](https://baike.baidu.com/item/HTML/97049)文档。



# 二 HTML 渲染

> [!note] 下面总结了关于页面渲染的相关内容
>
> -  `HTML`渲染或者说 `JavaScript`页面渲染原理
>
> -  渲染优化方案

## 1 HTML渲染过程

### 1.1 HTML解析过程

1. **构建DOM树**：将HTML构建成一个DOM树，也就是构建节点，把所有的节点都构建出来

2. **构建CSSOM树**：解析css去构建CSSOM树

3. **根据DOM树和CSSOM树构建render树**：DOM树和CSSOM树已经构建完毕，浏览器会根据这两个来构造render树，浏览器就知道了有哪些节点、各个节点的CSS定义以及他们的从属关系

4. **布局**：有了render树就开始布局Layout，开始计算各个节点的位置和样式

5. **绘制**：遍历render树，在页面上绘制每个节点

6. **重排reflow**：当render树绘制完成之后，比如JavaScript改变样式或添加节点，这时候render树就需要重新计算

7. **重绘repaint**：既然重排了，最后当然得重新绘制页面。

### 1.2 浏览器渲染页面详解

> [!success] 找了一篇已经很全的文章，所以不继续造轮子了，接下来分享一下[这篇文章](https://segmentfault.com/a/1190000010298038)

由一道面试题引发的思考：

> [!question] 从用户输入浏览器输入url到页面最后呈现 有哪些过程？
> *一道很常规的题目，考的是基本网络原理，和浏览器加载css，js过程。*

**答案大致如下：**

1. 用户输入URL地址

2. 浏览器解析URL解析出主机名

3. 浏览器将主机名转换成服务器ip地址（浏览器先查找本地DNS缓存列表 没有的话 再向浏览器默认的DNS服务器发送查询请求 同时缓存）

4. 浏览器将端口号从URL中解析出来

5. 浏览器建立一条与目标Web服务器的TCP连接（三次握手）

6. 浏览器向服务器发送一条HTTP请求报文

7. 服务器向浏览器返回一条HTTP响应报文

8. 关闭连接 浏览器解析文档

9. 如果文档中有资源 重复6 7 8 动作 直至资源全部加载完毕

**通过研究，了解一些基本常识的原理：**

1. 为什么要将js放到页脚部分
2. 引入样式的几种方式的权重
3. css属性书写顺序建议
4. 何种类型的DOM操作是耗费性能的

#### 1.2.1 浏览器渲染主要流程

不同的浏览器内核不同，所以渲染过程不太一样。

`WebKit 主流程`

![](html-pic1.png)

`Mozilla` 的 `Gecko` 呈现引擎主流程

![](html-pic2.png)

由上面两张图可以看出，虽然主流浏览器渲染过程叫法有区别，但是主要流程还是相同的。

`Gecko` 将视觉格式化元素组成的树称为“框架树”。每个元素都是一个框架。
WebKit 使用的术语是“呈现树”，它由“呈现对象”组成。

对于元素的放置，`WebKit` 使用的术语是“布局”，而 `Gecko` 称之为“重排”。

对于连接 DOM 节点和可视化信息从而创	建呈现树的过程，`WebKit` 使用的术语是“附加”。

**所以可以分析出基本过程：**

1. HTML解析出DOM Tree
2. CSS解析出Style Rules
3. 将二者关联生成Render Tree
4. Layout 根据Render Tree计算每个节点的信息
5. Painting 根据计算好的信息绘制整个页面

#### 1.2.2 HTML 解析

`HTML Parser`的任务是将HTML标记解析成`DOM Tree`
这个解析可以参考React解析DOM的过程，但是这里面有很多别的规则和操作，比如容错机制，识别`</br>`和`<br>`等等。
感兴趣的可以参考 [《How Browser Work》](https://www.html5rocks.com/en/tutorials/internals/howbrowserswork/)，[中文翻译](https://www.html5rocks.com/zh/tutorials/internals/howbrowserswork/)
举个例子：一段HTML

```html
<html>
<head>
    <title>Web page parsing</title>
</head>
<body>
    <div>
        <h1>Web page parsing</h1>
        <p>This is an example Web page.</p>
    </div>
</body>
</html>
```

经过解析之后的DOM Tree差不多就是

![](html-pic3.png)

将文本的HTML文档，提炼出关键信息，嵌套层级的树形结构，便于计算拓展。这就是HTML Parser的作用。

#### 1.2.3 CSS解析

`CSS Parser`将CSS解析成`Style Rules`，`Style Rules`也叫`CSSOM（CSS Object Model）`。
`StyleRules`也是一个树形结构，根据CSS文件整理出来的类似`DOM Tree`的树形结构：

![](html-pic4.png)

与`HTML Parser`相似，`CSS Parser`作用就是将很多个CSS文件中的样式合并解析出具有树形结构Style Rules。

#### 1.2.4 脚本处理

浏览器解析文档，当遇到`<script>`标签的时候，会立即解析脚本，停止解析文档（因为JS可能会改动DOM和CSS，所以继续解析会造成浪费）。

如果脚本是外部的，会等待脚本下载完毕，再继续解析文档。现在可以在script标签上增加属性 `defer`或者`async`。

脚本解析会将脚本中改变DOM和CSS的地方分别解析出来，追加到`DOM Tree`和`Style Rules`上。

#### 1.2.5 呈现树（Render Tree）

`Render Tree`的构建其实就是`DOM Tree`和`CSSOM` **Attach**的过程。

呈现树是和 DOM 元素相对应的，但并非一一对应。Render Tree实际上就是一个计算好样式，与HTML对应的（包括哪些显示，那些不显示）的Tree。

> 在 WebKit 中，解析样式和创建呈现树的过程称为“附加”。每个 DOM 节点都有一个`“attach”`方法。附加是同步进行的，将节点插入 DOM 树需要调用新的节点`“attach”`方法。

![](html-pic5.png)

#### 1.2.6 样式计算

样式计算是个很复杂的问题。DOM中的一个元素可以对应样式表中的多个元素。样式表包括了所有样式：浏览器默认样式表，自定义样式表，inline样式元素，**HTML可视化属性如：width=100。后者将转化以匹配CSS样式。**

> WebKit 节点会引用样式对象 (RenderStyle)。这些对象在某些情况下可以由不同节点共享。这些节点是同级关系，并且：
>
> 1. 这些元素必须处于相同的鼠标状态（例如，不允许其中一个是“:hover”状态，而另一个不是）
> 2. 任何元素都没有 ID
> 3. 标记名称应匹配
> 4. 类属性应匹配
> 5. 映射属性的集合必须是完全相同的
> 6. 链接状态必须匹配
> 7. 焦点状态必须匹配
> 8. 任何元素都不应受属性选择器的影响，这里所说的“影响”是指在选择器中的任何位置有任何使用了属性选择器的选择器匹配
> 9. 元素中不能有任何 inline 样式属性
> 10. 不能使用任何同级选择器。WebCore 在遇到任何同级选择器时，只会引发一个全局开关，并停用整个文档的样式共享（如果存在）。这包括 + 选择器以及 :first-child 和 :last-child 等选择器。

为了简化样式计算，Firefox 还采用了另外两种树：规则树和样式上下文树。WebKit 也有样式对象，但它们不是保存在类似样式上下文树这样的树结构中，只是由 DOM 节点指向此类对象的相关样式。

![](html-pic6.png)

样式上下文包含端值。要计算出这些值，应按照正确顺序应用所有的匹配规则，并将其从逻辑值转化为具体的值。

例如，**如果逻辑值是屏幕大小的百分比，则需要换算成绝对的单位**。规则树的点子真的很巧妙，它使得节点之间可以共享这些值，以避免重复计算，还可以节约空间。
所有匹配的规则都存储在树中。路径中的底层节点拥有较高的优先级。规则树包含了所有已知规则匹配的路径。规则的存储是延迟进行的。规则树不会在开始的时候就为所有的节点进行计算，而是只有当某个节点样式需要进行计算时，才会向规则树添加计算的路径。

**举个例子：一段HTML代码**

```html
<html>
  <body>
    <div class="err" id="div1">
      <p>
        this is a <span class="big"> big error </span>
        this is also a
        <span class="big"> very  big  error</span> error
      </p>
    </div>
    <div class="err" id="div2">another error</div>
  </body>
</html>
```

对应CSS规则如下：

```
1. div {margin:5px;color:black}
2. .err {color:red}
3. .big {margin-top:3px}
4. div span {margin-bottom:4px}
5. #div1 {color:blue}
6. #div2 {color:green}
```

则CSS形成的规则树如下图所示（节点的标记方式为“节点名 : 指向的规则序号”）

![](html-pic7.png)

> 下面的内容有点绕，但是很有逻辑

假设我们解析 HTML 时遇到了第二个 `<div>` 标记，我们需要为此节点创建样式上下文，并填充其样式结构。
经过规则匹配，我们发现该 `<div>`的匹配规则是第 1、2 和 6 条。这意味着规则树中已有一条路径可供我们的元素使用，我们只需要再为其添加一个节点以匹配第 6 条规则（规则树中的 F 节点）。
我们将创建样式上下文并将其放入上下文树中。新的样式上下文将指向规则树中的 F 节点。

现在我们需要填充样式结构。首先要填充的是 margin 结构。由于最后的规则节点 (F) 并没有添加到 margin 结构，我们需要上溯规则树，直至找到在先前节点插入中计算过的缓存结构，然后使用该结构。我们会在指定 margin 规则的最上层节点（即 B 节点）上找到该结构。

我们已经有了 color 结构的定义，因此不能使用缓存的结构。由于 color 有一个属性，我们无需上溯规则树以填充其他属性。我们将计算端值（将字符串转化为 `RGB` 等）并在此节点上缓存经过计算的结构。

第二个` <span> `元素处理起来更加简单。我们将匹配规则，最终发现它和之前的 span 一样指向规则 G。由于我们找到了指向同一节点的同级，就可以共享整个样式上下文了，只需指向之前 span 的上下文即可。

对于包含了继承自父代的规则的结构，缓存是在上下文树中进行的（事实上 color 属性是继承的，但是 Firefox 将其视为 reset 属性，并缓存到规则树上）
所以生成的上下文树如下：

![](html-pic8.png)

#### 1.2.7 以正确的层叠顺序应用规则

样式对象具有与每个可视化属性一一对应的属性（均为 CSS 属性但更为通用）。如果某个属性未由任何匹配规则所定义，那么部分属性就可由父代元素样式对象继承。其他属性具有默认值。
如果定义不止一个，就会出现问题，需要通过层叠顺序来解决。

一些例子：

```
 *             {}  /* a=0 b=0 c=0 d=0 -> specificity = 0,0,0,0 */
 li            {}  /* a=0 b=0 c=0 d=1 -> specificity = 0,0,0,1 */
 li:first-line {}  /* a=0 b=0 c=0 d=2 -> specificity = 0,0,0,2 */
 ul li         {}  /* a=0 b=0 c=0 d=2 -> specificity = 0,0,0,2 */
 ul ol+li      {}  /* a=0 b=0 c=0 d=3 -> specificity = 0,0,0,3 */
 h1 + *[rel=up]{}  /* a=0 b=0 c=1 d=1 -> specificity = 0,0,1,1 */
 ul ol li.red  {}  /* a=0 b=0 c=1 d=3 -> specificity = 0,0,1,3 */
 li.red.level  {}  /* a=0 b=0 c=2 d=1 -> specificity = 0,0,2,1 */
 #x34y         {}  /* a=0 b=1 c=0 d=0 -> specificity = 0,1,0,0 */
 style=""          /* a=1 b=0 c=0 d=0 -> specificity = 1,0,0,0 */
```

利用上面的方法，基本可以快速确定不同选择器的优先级。

#### 1.2.8 布局Layout

创建渲染树后，下一步就是`布局（Layout）`,或者叫`回流（reflow,relayout）`，这个过程就是通过渲染树中渲染对象的信息，计算出每一个渲染对象的位置和尺寸，将其安置在浏览器窗口的正确位置，而有些时候我们会在文档布局完成后对DOM进行修改，这时候可能需要重新进行布局，也可称其为`回流`，本质上还是一个布局的过程，每一个渲染对象都有一个布局或者回流方法，实现其布局或回流。

**对渲染树的布局可以分为全局和局部的**

- 全局即对整个渲染树进行重新布局，如<u>当我们改变了窗口尺寸或方向</u>或者是<u>修改了根元素的尺寸或者字体大小</u>等；
- 而局部布局可以是对渲染树的某部分或某一个渲染对象进行重新布局。

大多数web应用对DOM的操作都是比较频繁，这意味着经常需要对DOM进行布局和回流，而如果仅仅是一些小改变，就触发整个渲染树的回流，这显然是不好的，为了避免这种情况，浏览器使用了`脏位系统`，只有一个渲染对象改变了或者某渲染对象及其子渲染对象脏位值为”dirty”时，说明需要回流。

> 表示需要布局的脏位值有两种：
>
> - “dirty”–自身改变，需要回流
> - “children are dirty”–子节点改变，需要回流

布局是一个从上到下，从外到内进行的递归过程，从根渲染对象，即对应着HTML文档根元素，然后下一级渲染对象，如对应着元素，如此层层递归，依次计算每一个渲染对象的几何信息（位置和尺寸）。

**每一个渲染对象的布局流程基本如：**

1. 计算渲染对象的宽度（width）；

2. 遍历此渲染对象的所有子级，依次：
	1. 设置子级渲染对象的坐标
	2. 判断是否需要触发子渲染对象的布局或回流方法，计算子渲染对象的高度（height）

3. 设置此渲染对象的高度：根据子渲染对象的累积高，margin和padding的高度设置其高度；

4. 设置此渲染对象脏位值为false。

#### 2.9 绘制（Painting）

在绘制阶段，系统会遍历呈现树，并调用呈现器的`“paint”`方法，将呈现器的内容显示在屏幕上。绘制工作是使用用户界面基础组件完成的。

CSS2 规范定义了绘制流程的顺序。绘制的顺序其实就是元素进入堆栈样式上下文的顺序。这些堆栈会从后往前绘制，因此这样的顺序会影响绘制。块呈现器的堆栈顺序如下：

1. 背景颜色
2. 背景图片
3. 边框
4. 子代
5. 轮廓

这里还要说两个概念，一个是`Reflow`，另一个是`Repaint`。这两个不是一回事。

**Repaint** ——屏幕的一部分要重画，比如某个CSS的背景色变了。但是元素的几何尺寸没有变。

**Reflow** 元件的几何尺寸变了，我们需要重新验证并计算Render Tree。是Render Tree的一部分或全部发生了变化。这就是Reflow，或是Layout。（HTML使用的是flow based layout，也就是流式布局，所以，如果某元件的几何尺寸发生了变化，需要重新布局，也就叫reflow）reflow 会从`<html>`这个root frame开始递归往下，依次计算所有的结点几何尺寸和位置，在reflow过程中，可能会增加一些frame，比如一个文本字符串必需被包装起来。

> Reflow的成本比Repaint的成本高得多的多。DOM Tree里的每个结点都会有reflow方法，一个结点的reflow很有可能导致子结点，甚至父点以及同级结点的reflow。在一些高性能的电脑上也许还没什么，但是如果reflow发生在手机上，那么这个过程是非常痛苦和耗电的。

 所以，下面这些动作有很大可能会是成本比较高的。

- 当你增加、删除、修改DOM结点时，会导致Reflow或Repaint
- 当你移动DOM的位置，或是搞个动画的时候。
- 当你修改CSS样式的时候。
- 当你Resize窗口的时候（移动端没有这个问题），或是滚动的时候。
- 当你修改网页的默认字体时。
- 注：display:none会触发reflow，而visibility:hidden只会触发repaint，因为没有发现位置变化。

基本上来说，reflow有如下的几个原因：

- Initial。网页初始化的时候。
- Incremental。一些Javascript在操作DOM Tree时。
- Resize。其些元件的尺寸变了。
- StyleChange。如果CSS的属性发生变化了。
- Dirty。几个Incremental的reflow发生在同一个frame的子树上。

看几个例子：

```js
$('body').css('color', 'red'); // repaint
$('body').css('margin', '2px'); // reflow, repaint

var bstyle = document.body.style; // cache

bstyle.padding = "20px"; // reflow, repaint
bstyle.border = "10px solid red"; //  再一次的 reflow 和 repaint

bstyle.color = "blue"; // repaint
bstyle.backgroundColor = "#fad"; // repaint

bstyle.fontSize = "2em"; // reflow, repaint

// new DOM element - reflow, repaint
document.body.appendChild(document.createTextNode('dude!'));
```

当然，我们的浏览器是聪明的，它不会像上面那样，你每改一次样式，它就reflow或repaint一次。一般来说，浏览器会把这样的操作积攒一批，然后做一次reflow，这又叫异步reflow或增量异步reflow。

但是有些情况浏览器是不会这么做的，比如：resize窗口，改变了页面默认的字体，等。对于这些操作，浏览器会马上进行reflow。

但是有些时候，我们的脚本会阻止浏览器这么干，比如：如果我们请求下面的一些DOM值：

```
offsetTop, offsetLeft, offsetWidth, offsetHeight
scrollTop/Left/Width/Height
clientTop/Left/Width/Height
IE中的 getComputedStyle(), 或 currentStyle
```

因为，如果我们的程序需要这些值，那么浏览器需要返回最新的值，而这样一样会flush出去一些样式的改变，从而造成频繁的reflow/repaint。

#### 2.10 Chrome调试工具查看页面渲染顺序

页面的渲染详细过程可以通过chrome开发者工具中的timeline查看

![](html-pic9.png)

1. 发起请求；
2. 解析HTML；
3. 解析样式；
4. 执行JavaScript；
5. 布局；
6. 绘制

## 2 页面渲染优化

浏览器对上文介绍的关键渲染路径进行了很多优化，针对每一次变化产生尽量少的操作，还有优化判断重新绘制或布局的方式等等。

在改变文档根元素的字体颜色等视觉性信息时，会触发整个文档的重绘，而改变某元素的字体颜色则只触发特定元素的重绘；改变元素的位置信息会同时触发此元素（可能还包括其兄弟元素或子级元素）的布局和重绘。某些重大改变，如更改文档根元素的字体尺寸，则会触发整个文档的重新布局和重绘，据此及上文所述，推荐以下优化和实践：

1. HTML文档结构层次尽量少，最好不深于六层；
2. 脚本尽量后放，放最后即可；
3. 少量首屏样式内联放在标签内；
4. 样式结构层次尽量简单；
5. 在脚本中尽量减少DOM操作，尽量缓存访问DOM的样式信息，避免过度触发`回流`；
6. 减少通过JavaScript代码修改元素样式，尽量使用修改class名方式操作样式或动画；
7. 动画尽量使用在绝对定位或固定定位的元素上；
8. 隐藏在屏幕外，或在页面滚动时，尽量停止动画；
9. 尽量缓存DOM查找，查找器尽量简洁；
10. 涉及多域名的网站，可以开启域名预解析

**补充**

HTML整个解析过程看起来很简单，但是我们要知道解析过程中css、Js和DOM的加载顺序。我们都知道HTML是自上往下解析的，在解析过程中：

1、如果遇到link和style，那就就会去下载这些外部的css资源，但是css跟DOM的构建是并行的，就是说不会阻塞DOM树的构建。

2、如果遇到script，那么页面就会把控制权交给JavaScript，直到脚本加载完毕或者是执行完毕。

3、页面的渲染是依靠render树，也就是说如果css没有加载完成，页面也不会渲染显示。

4、JavaScript执行过程中有可能需要改变样式，所以css加载也会阻塞JavaScript的加载。

5、JavaScript执行过程中如果操作DOM，但是DOM树又是在JavaScript之后才能构建，就会报错，找不到节点。

这就是HTML的渲染过程，因为DOM和css并行构建，我们会把css用外部引入，可以更快的构建DOM，因为JavaScript会阻塞DOM和css构建，且操作DOM一定要在DOM构建完成，我们选择把script放在最下面。如果我们过多的在render渲染完成后改变render，那么重排和重绘就会一直被动重发执行，这也会造成渲染速度变慢。

## 3 总结

浏览器渲染问题每一步都涉及到很多底层知识，每一步都有对应的算法。
文章中间很多语句都是直接复制的原文，自己的语言概况还是不及原文精彩。

- [《How Browser Work》](https://www.html5rocks.com/en/tutorials/internals/howbrowserswork/)

- [浏览器的工作原理：新式网络浏览器幕后揭秘](https://www.html5rocks.com/zh/tutorials/internals/howbrowserswork/)

- [浏览器渲染原理](http://imweb.io/topic/56841c864c44bcc56092e3fa)

- [浏览器 渲染,绘制流程及性能优化](https://zhuanlan.zhihu.com/p/25279069)

- [优化CSS重排重绘与浏览器性能](http://caibaojian.com/css-reflow-repaint.html)

- [浅析前端页面渲染机制](http://web.jobbole.com/90961/)

# 三 HTML 标签

> [!note] [Mmdn 站点](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements)


## 1 HTML 语义化

> [!note] [菜鸟教程](https://www.runoob.com/html/html5-semantic-elements.html)



# 四 HTML Meta

`<meta>` 标签是 HTML 语言头部的一个辅助性标签，我们可以定义页面编码语言、搜索引擎优化、自动刷新并指向新的页面、控制页面缓冲、响应式视窗等


> [!tip]  可参考[HTML meta 标签](https://blog.csdn.net/zhangank/article/details/94014629)

# 五 HTML 离线缓存

> [!note] 参考原文 [传送门](https://www.cnblogs.com/PeterSpeaking/p/5912221.html)

**HTML5**提供了很多新的功能以及相应的接口，离线存储就是其中的一个，离线存储可以将站点的一些文件存储在本地，在没有网络的时候还是可以访问到以缓存的对应的站点页面，其中这些文件可以包括html，js，css，img等等文件，但其实即使在有网络的时候，浏览器也会优先使用已离线存储的文件，返回一个200（from cache）头。这跟HTTP的缓存使用策略是不同的。

它是浏览器自己的一种机制，随着移动互联网时代的到来，网络可靠性降低，如果我们已经将需要的文件缓存下下来，一旦网络无法访问，也能继续访问。

而且做好相应资源的缓存可以带来更好的用户体验，当用户使用自己的流量上网时，本地缓存不仅可以提高用户访问速度，而且大大节约用户的使用流量。

