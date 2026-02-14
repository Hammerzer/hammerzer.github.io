---
title: CSS入门即精通
description:
urlname: Master-CSS-from-the-Beginning
date: 2020-09-17 17:28:32
tags:
  - CSS
  - 布局
  - 动画
  - 命名
  - 响应式设计
categories:
  - 前端开发
draft:
---
# 一 CSS选择器

> [!note] 参考相应的书籍整理，但自从发现[阮一峰老师笔记](http://www.ruanyifeng.com/blog/2009/03/css_selectors.html)，整理的很不错！

## 五大类选择器概述

### 1 基本选择器

| 序号  | 选择器       | 含义                             |
| --- | --------- | ------------------------------ |
| 1.  | *****     | 通用元素选择器，匹配任何元素                 |
| 2.  | **E**     | 标签选择器，匹配所有使用E标签的元素             |
| 3.  | **.info** | class选择器，匹配所有class属性中包含info的元素 |
| 4.  | `#footer` | id选择器，匹配所有id属性等于footer的元素      |

### 2 组合选择器

| 序号  | 选择器   | 含义                                 |
| --- | ----- | ---------------------------------- |
| 5.  | E,F   | 多元素选择器，同时匹配所有E元素或F元素，E和F之间用逗号分隔    |
| 6.  | E F   | 后代元素选择器，匹配所有属于E元素后代的F元素，E和F之间用空格分隔 |
| 7.  | E > F | 子元素选择器，匹配所有E元素的子元素F                |
| 8.  | E + F | 毗邻元素选择器，匹配所有紧随E元素之后的同级元素F          |

### 3 _CSS 2.1_ 属性选择器

| 序号  | 选择器          | 含义                                                                                           |
| --- | ------------ | -------------------------------------------------------------------------------------------- |
| 9.  | E[att]       | 匹配所有具有att属性的E元素，不考虑它的值。（注意：E在此处可以省略，比如"[cheacked]"。以下同。）                                     |
| 10. | E[att=val]   | 匹配所有att属性等于"val"的E元素                                                                         |
| 11. | E[att~=val]  | 匹配所有att属性具有多个空格分隔的值、其中一个值等于"val"的E元素                                                         |
| 12. | E[att\|=val] | 匹配所有att属性具有多个连字号分隔（hyphen-separated）的值、其中一个值以"val"开头的E元素，主要用于lang属性，比如"en"、"en-us"、"en-gb"等等 |

```CSS
p[title] { color:#f00; }  
​  
div[class=error] { color:#f00; }  
​  
td[headers~=col1] { color:#f00; }  
​  
p[lang|=en] { color:#f00; }  
​  
blockquote[class=quote][cite] { color:#f00; }
```

### 4 _CSS 2.1_中的伪类

|序号|选择器|含义|
|---|---|---|
|13.|E:first-child|匹配父元素的第一个子元素|
|14.|E:link|匹配所有未被点击的链接|
|15.|E:visited|匹配所有已被点击的链接|
|16.|E:active|匹配鼠标已经其上按下、还没有释放的E元素|
|17.|E:hover|匹配鼠标悬停其上的E元素|
|18.|E:focus|匹配获得当前焦点的E元素|
|19.|E:lang(c)|匹配lang属性等于c的E元素|

```CSS
p:first-child { font-style:italic; }  
​  
input[type=text]:focus { color:#000; background:#ffe; }  
​  
input[type=text]:focus:hover { background:#fff; }  
​  
q:lang(sv) { quotes: "\201D" "\201D" "\2019" "\2019"; }
```

### 5 _CSS 2.1_中的伪元素

|序号|选择器|含义|
|---|---|---|
|20.|E:first-line|匹配E元素的第一行|
|21.|E:first-letter|匹配E元素的第一个字母|
|22.|E:before|在E元素之前插入生成的内容|
|23.|E:after|在E元素之后插入生成的内容|

### 6 CSS 3的同级元素通用选择器

| 序号  | 选择器   | 含义               |
| --- | ----- | ---------------- |
| 24. | E ~ F | 匹配任何在E元素之后的同级F元素 |

### 7 CSS 3 属性选择器

|序号|选择器|含义|
|---|---|---|
|25.|E[att^="val"]|属性att的值以"val"开头的元素|
|26.|E[att$="val"]|属性att的值以"val"结尾的元素|
|27.|E[att*="val"]|属性att的值包含"val"字符串的元素|

### 8 CSS 3中与用户界面有关的伪类

|序号|选择器|含义|
|---|---|---|
|28.|E:enabled|匹配表单中激活的元素|
|29.|E:disabled|匹配表单中禁用的元素|
|30.|E:checked|匹配表单中被选中的radio（单选框）或checkbox（复选框）元素|
|31.|E::selection|匹配用户当前选中的元素|

### 9 CSS 3中的结构性伪类

|序号|选择器|含义|
|---|---|---|
|32.|E:root|匹配文档的根元素，对于HTML文档，就是HTML元素|
|33.|E:nth-child(n)|匹配其父元素的第n个子元素，第一个编号为1|
|34.|E:nth-last-child(n)|匹配其父元素的倒数第n个子元素，第一个编号为1|
|35.|E:nth-of-type(n)|与:nth-child()作用类似，但是仅匹配使用同种标签的元素|
|36.|E:nth-last-of-type(n)|与:nth-last-child() 作用类似，但是仅匹配使用同种标签的元素|
|37.|E:last-child|匹配父元素的最后一个子元素，等同于:nth-last-child(1)|
|38.|E:first-of-type|匹配父元素下使用同种标签的第一个子元素，等同于:nth-of-type(1)|
|39.|E:last-of-type|匹配父元素下使用同种标签的最后一个子元素，等同于:nth-last-of-type(1)|
|40.|E:only-child|匹配父元素下仅有的一个子元素，等同于:first-child:last-child或 :nth-child(1):nth-last-child(1)|
|41.|E:only-of-type|匹配父元素下使用同种标签的唯一一个子元素，等同于:first-of-type:last-of-type或 :nth-of-type(1):nth-last-of-type(1)|
|42.|E:empty|匹配一个不包含任何子元素的元素，注意，文本节点也被看作子元素|

### 10 CSS 3的反选伪类

|序号|选择器|含义|
|---|---|---|
|43.|E:not(s)|匹配不符合当前选择器的任何元素|

### 11 CSS 3中的 :target 伪类

> 目标伪类：它表示匹配 E 的所有元素，且匹配元素被相关URL指向。
> 
> 该选择器为动态选择器，只有当存在URL指向该匹配元素时，样式效果才有效。

|序号|选择器|含义|
|---|---|---|
|44.|E:target|匹配文档中特定"id"点击后的效果|

## 选择器权重计算

### 1 权重计算规则

1. 内联样式，如: style="..."，权值为1000。
    
2. ID选择器，如：#content，权值为0100。
    
3. 类，伪类、属性选择器，如.content，权值为0010。
    
4. 类型选择器、伪元素选择器，如div p，权值为0001。
    
5. 通配符、子选择器、相邻选择器等。如* > +，权值为0000。
    
6. 继承的样式没有权值
    

### 2 比较规则

1,0,0,0 > 0,99,99,99。也就是说从左往右逐个等级比较，前一等级相等才往后比。

无论是行间、内部和外部样式，都是按照这个规则来进行比较。而不是直观的行间>内部>外部样式；ID>class>元素。之所以有这样的错觉，是因为确实行间为第一等的权重，所以它的权重是最高的。而内部样式可能一般写在了外部样式引用了之后，所以覆盖掉了之前的。

在权重相同的情况下，后面的样式会覆盖掉前面的样式。

通配符、子选择器、相邻选择器等的。虽然权值为0000，但是也比继承的样式优先，0 权值比无权值优先。

### 3 `!important`

`!important` 的作用是提升优先级，换句话说。加了这句的样式的优先级是最高的（比内联样式的优先级还高)。

**在使用 !important 时需要注意：**

1. Never 永远不要在全站范围的 css 上使用 !important
    
2. Only 只在需要覆盖全站或外部 css（例如引用的 ExtJs 或者YUI ）的特定页面中使用 !important
    
3. Never 永远不要在你的插件中使用 !important
    
4. Always 要优化考虑使用样式规则的优先级来解决问题而不是 !important

# 二 CSS命名方案

CSS 作用域是全局的，项目越来越大，人越来越多，命名慢慢成为问题。以下是几种解决命名问题的方案：

- BEM

- Scoped CSS

- CSS modules

## 1 BEM

`BEM`代表块（Block），元素（Element），修饰符（Modifier）。

`BEM`给我们的规定是块和元素之间用 — 连接，元素和修饰符之间用 _ 连接。例如：我们要设置表格某一行的背景颜色为红色，我们可以如下命名：`<div class="table-row_red">命名</div>`



**规范化书写实例**

```HTML
<header>  
    <div class="logo">  
        <img class="logo-img" src="./logo.png" alt="">  
        <span class="logo-words_big">QQ·</span>  
        <span class="logo-word_small">PC版</span>  
    </div>  
    <ul class="nav">  
        <li class="nav-item">QQ官网首页</li>  
        <li class="nav-item">申请QQ</li>  
        <li class="nav-item">当前在线用户:2559393943</li>  
    </ul>  
</header>  
<div class="main">  
    <img class="main-img" src="./img.png" alt="" >  
    <div class="main-words_small">QQ PC版9.0.8</div>  
    <div class="main-words_big">从新出发·趣无止境</div>  
    <button class="mian-button_blue">立即下载</button>  
</div>
```

## 2 Scoped CSS

> [vue-loader的传送门](https://vue-loader.vuejs.org/zh/guide/scoped-css.html)

目标：当前组件样式不会影响其它组件

给组件的 dom 节点添加惟一属性，并转换 style 标签中的 css 匹配该属性，使得 css 作用域有限

**实例**

```HTML
<style scoped>  
    .example {  
        color: red;  
    }  
</style>  
​  
<template>  
    <div class="example">hi</div>  
</template>
```

转换结果：

```HTML
<style>  
    .example[data-v-f3f3eg9] {  
        color: red;  
    }  
</style>  
​  
<template>  
    <div class="example" data-v-f3f3eg9>hi</div>  
</template>
```

## 3 CSS modules

> [VUE-loader传送门- CSS Moudules](https://vue-loader.vuejs.org/zh/guide/css-modules.html#%E7%94%A8%E6%B3%95)

将 `css` 的选择器转换成惟一的字符串，运用到 DOM。是在用算法命名，记录了人的命名到算法命名的 `map` 表

### 实例

```HTML
<style module>  
.red {  
    color: red;  
}  
</style>  
​  
<template>  
  <p :class="$style.red">  
    This should be red  
  </p>  
</template> 
```

转换结果：

```HTML
<style module>  
._1yZGjg0pYkMbaHPr4wT6P__1 {  
  color: red;  
}  
</style>  
<template>  
  <p class="_1yZGjg0pYkMbaHPr4wT6P__1">  
    This should be red  
  </p>  
</template>
```

## 总结

1. `BEM` 让命名有规律、有含义，block 可视为模块，有一定作用域含义
    
2. `scoped css` 限定 css 作用域，无关命名。无法适配多套主题
    
3. `css modules` 使用算法命名，没有了命名冲突，也限定了 css 作用域。无法适配多套主题


# 三 CSS布局

- 弹性布局`Flex`

-  `Grid` 网格布局

-  浮动布局

-  圣杯布局

-  双飞翼布局

-  水平居中对齐

## 1 CSS3 弹性盒布局方式

弹性盒子是CSS3的一种新布局模式。

CSS3 弹性盒（ `Flexible Box` 或 `flexbox`），是一种当页面需要适应不同的屏幕大小以及设备类型时确保元素拥有恰当的行为的布局方式。

引入弹性盒布局模型的目的是提供一种更加有效的方式来对一个容器中的子元素进行排列、对齐和分配空白空间。

**浏览器支持**

> 表格中的数字表示支持该属性的第一个浏览器的版本号。
> 
> 紧跟在数字后面的 `-webkit-` 或 `-moz-` 为指定浏览器的前缀。

**注意：**

- 弹性盒子由弹性容器(`Flex container`)和弹性子元素(`Flex item`)组成。
    
- 弹性容器通过设置 `display` 属性的值为 `flex` 或 `inline-flex`将其定义为弹性容器。
    
- 弹性容器内包含了一个或多个弹性子元素。
    
- 弹性容器外及弹性子元素内是正常渲染的。弹性盒子只定义了弹性子元素如何在弹性容器内布局。
    

### 1.1 `Flex` 容器属性（设置在容器上）

`flex-direction` 指定弹性容器中子元素排列方式

`flex-wrap` 设置弹性盒子的子元素超出父容器时是否换行

`flex-flow` flex-direction 和 flex-wrap 的简写

`align-items` 设置弹性盒子元素在侧轴（纵轴）方向上的对齐方式

`align-content` 修改 flex-wrap 属性的行为，类似 align-items, 但不是设置子元素对齐，而是设置行对齐

`justify-content` 设置弹性盒子元素在主轴（横轴）方向上的对齐方式

#### 1.1.1 flex-direction 属性

决定项目的方向。

**注意**：如果元素不是弹性盒对象的元素，则 `flex-direction` 属性不起作用。
![](flex1.png)
**属性值**

|值|描述|
|---|---|
|row|默认值。主轴为水平方向，起点在左端|
|row-reverse|主轴为水平方向，起点在右端|
|column|主轴为垂直方向，起点在上沿|
|column-reverse|主轴为垂直方向，起点在下沿|

#### 1.1.2 flex-wrap 属性

`flex-wrap` 属性规定flex容器是单行或者多行，同时横轴的方向决定了新行堆叠的方向。

|值|描述|
|---|---|
|nowrap|默认值。规定元素不拆行或不拆列。|
|wrap|规定元素在必要的时候拆行或拆列。|
|wrap-reverse|规定元素在必要的时候拆行或拆列，但是以相反的顺序。|
![](flex2.png)
#### 1.1.3 flex-flow 属性

`flex-flow`属性是`flex-direction`属性和`flex-wrap`属性的简写形式，默认值为`row nowrap`。

#### 1.1.4 align-items属性

`align-items` 属性定义flex子项在flex容器的当前行的侧轴（纵轴）方向上的对齐方式。

|值|描述|
|---|---|
|stretch|默认值。项目被拉伸以适应容器。如果项目未设置高度或设为auto，将占满整个容器的高度。|
|center|项目位于容器的中心。|
|flex-start|项目位于容器的开头。|
|flex-end|项目位于容器的结尾。|
|baseline|项目位于容器的基线上。|
![](flex3.png)
#### 1.1.5 justify-content属性

`justify-content` 用于设置或检索弹性盒子元素在主轴（横轴）方向上的对齐方式。

|值|描述|
|---|---|
|flex-start|默认值。项目位于容器的开头。|
|flex-end|项目位于容器的结尾。|
|center|项目位于容器的中心。|
|space-between|两端对齐，项目之间的间隔都相等|
|space-around|项目位于各行之前、之间、之后都留有空白的容器内。|

> space-around：每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍。


![](flex4.png)
### 1.2 `Flex` 弹性子元素属性

| 属性          | 描述                                                                      |
| ----------- | ----------------------------------------------------------------------- |
| order       | 设置弹性盒子的子元素排列顺序。                                                         |
| flex-grow   | 设置或检索弹性盒子元素的扩展比率。                                                       |
| flex-shrink | 指定了 flex 元素的收缩规则。flex 元素仅在默认宽度之和大于容器的时候才会发生收缩，其收缩的大小是依据 flex-shrink 的值。 |
| flex-basis  | 用于设置或检索弹性盒伸缩基准值。                                                        |
| flex        | 设置弹性盒子的子元素如何分配空间。                                                       |
| align-self  | 在弹性子元素上使用。覆盖容器的 align-items 属性。                                         |

#### 1.2.1 order属性

`<integer>`：用整数值来定义排列顺序，数值小的排在前面。可以为负值，默认为0。
![](flex5.png)
#### 1.2.2 flex-grow属性

`<integer>`：一个数字，规定项目将相对于其他灵活的项目进行扩展的量。默认值是 0。

> `flex-grow`属性定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大。
> 
> 如果所有项目的`flex-grow`属性都为1，则它们将等分剩余空间（如果有的话）。　　
> 
> 如果一个项目的`flex-grow`属性为2，其他项目都为1，则前者占据的剩余空间将比其他项多一倍。

![](flex6.png)

#### 1.2.3 flex-shrink属性

`<integer>`：一个数字，规定项目将相对于其他灵活的项目进行收缩的量。默认值是 1。

> `flex-shrink`属性定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。
> 
> 如果所有项目的`flex-shrink`属性都为1，当空间不足时，都将等比例缩小。
> 
> 如果一个项目的`flex-shrink`属性为0，其他项目都为1，则空间不足时，前者不缩小。
> 
> 负值对该属性无效。

```css
flex-shrink: <number>; /* default 1 */
```
![](flex7.png)
#### 1.2.4 flex-basis属性

`flex-basis`属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。

```css
.flex-container .flex-item { flex-basis: <integer> | auto; }
```

`<integer>`：一个长度单位或者一个百分比，规定元素的初始长度。 `auto`：默认值。长度等于元素的长度。如果该项目未指定长度，则长度将根据内容决定。

> 浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为auto，即项目的本来大小。
> 
> 它可以设为跟width或height属性一样的值（比如350px），则项目将占据固定空间。

#### 1.2.5 flex属性

flex 属性用于设置或检索弹性盒模型对象的子元素如何分配空间。

flex 属性是 `flex-grow`、`flex-shrink` 和 `flex-basis` 属性的简写属性，默认值为`0 1 auto`。后两个属性可选。

> 该属性有两个快捷值：auto (1 1 auto) 和 none (0 0 auto)。
> 
> 建议优先使用这个属性，而不是单独写三个分离的属性，因为浏览器会推算相关值。

**特殊值**： `flex: 1;` 等价于 `flex: 1 1` 但不等于 `flex: auto;`

其含义为为**均分**，详细解释见[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex)和[知乎解答文档](https://zhuanlan.zhihu.com/p/136223806)
![](flex9.png)

#### 1.2.6 align-self属性

`align-self` 属性允许单个项目有与其他项目不一样的对齐方式，可覆盖`align-items`属性。

> 默认值为auto，表示继承父元素的align-items属性，如果没有父元素，则等同于stretch。

```css
.flex-container .flex-item {  
    align-self: auto | stretch | center | flex-start | flex-end | baseline | initial | inherit;  
}
```

|值|描述|
|---|---|
|auto|默认值。元素继承了它的父容器的 align-items 属性。如果没有父容器则为 "stretch"。|
|stretch|元素被拉伸以适应容器。|
|center|元素位于容器的中心。|
|flex-start|元素位于容器的开头。|
|flex-end|元素位于容器的结尾。|
|baseline|元素位于容器的基线上。|
|initial|设置该属性为它的默认值。|
|inherit|从父元素继承该属性。|

![](flex8.png)

## 2 `Grid` 网格布局

> 转载[阮一峰CSS Grid 网格布局教程](http://www.ruanyifeng.com/blog/2019/03/grid-layout-tutorial.html)，写的很不错，牛啊！
> 
> 这篇文章也可做为参考 [传送门](https://www.cnblogs.com/jcxfighting/p/10711210.html)

网格布局（Grid）是最强大的 CSS 布局方案。

它将网页划分成一个个网格，可以任意组合不同的网格，做出各种各样的布局。以前，只能通过复杂的 CSS 框架达到的效果，现在浏览器内置了。
![](grid0.png)
上图这样的布局，就是 Grid 布局的拿手好戏。

Grid 布局与 [Flex 布局](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)有一定的相似性，都可以指定容器内部多个项目的位置。但是，它们也存在重大区别。

Flex 布局是轴线布局，只能指定"项目"针对轴线的位置，可以看作是**一维布局**。Grid 布局则是将容器划分成"行"和"列"，产生单元格，然后指定"项目所在"的单元格，可以看作是**二维布局**。Grid 布局远比 Flex 布局强大。

## 3 浮动布局

> 这是一篇有逻辑的学习记录

div是块级元素，在页面中独占一行，自上而下排列，也就是传说中的流

> 无论多么复杂的布局，其基本出发点均是：**“如何在一行显示多个div元素”。** 显然标准流已经无法满足需求，这就要用到浮动。

**浮动可以理解为让某个div元素脱离标准流，漂浮在标准流之上，和标准流不是一个层次。**

**浮动之后的位置**：假如元素A和元素B均浮动，则A和B在同一行；若仅B浮动，则B的顶端对齐A的底端。

**浮动之后的顺序**：**靠近页面边缘的一端是前，远离页面边缘的一端是后。**
![](float-1.png)
**清除浮动**：**清除浮动可以理解为打破横向排列**（元素浮动之前，也就是在标准流中，是竖向排列的，而浮动之后可以理解为横向排列）对于CSS的清除浮动(clear)，一定要牢记：**这个规则只能影响使用清除的元素本身，不能影响其他元素。**

```
语法：       
    clear : none | left | right | both      
取值：  
    none  :  默认值。允许两边都可以有浮动对象      
    left  :  不允许左边有浮动对象      
    right :  不允许右边有浮动对象      
    both  :  不允许有浮动对象
```

最后补充一点，正如下面**圣杯布局的`float`实现方式**一样，当同一行元素由于行宽不足而主动排列在下一行的时候，可以通过设置**负外边距`Margin`**，使其回到上一行，在**利用`position`对位置进行微调**。

## 4 圣杯布局

所谓的`圣杯布局`就是左右两边大小固定不变，中间宽度自适应。我们可以用`浮动`、`定位`以及`flex`这三种方式来实现

一般这种布局方式适用于各种移动端顶部搜索部分，这是最常见的，如京东手机版主页面顶部搜索：
![](shengbei.png)
> 可以看到左边有个菜单按钮，中间是搜索框，右边是登录两个文字，左右大小是固定的，而中间部分则是随着手机屏幕尺寸的大小而自适应

### 第一种方法 `flex`实现

> 需要理解`flex`的用法
> 
> `*` `vh` 为相对于视口的高度。视口被均分为100单位的vh

```html
<div class='container'>  
    <header>头部</header>  
        <section>  
        <div class='left'>左</div>  
        <div class='center'>中</div>  
        <div class='right'>右</div>  
    </section>  
    <footer>底部</footer>  
</div>
```

```html
<style>  
    .container{  
        display: flex;  
        height: 100vh;  
        flex-direction: column;  
    }  
    header{  
        background: #000;  
    }  
    section{  
        flex:1;  
        background: pink;  
        display: flex;  
    }  
    footer{  
        background: #000;  
    }  
    .left{  
        background: red;  
        flex:0 0 100px;  
    }  
    .center{  
        flex:1;  
        background: blue;  
    }  
    .right{  
        flex:0 0 100px;  
        background: red;  
    }  
</style>
```

### 第二种 `position`实现

> **思路**：给容器设置左右内`padding`，让中间部分占满所有剩余空间，左右设置`absolute`使其左右分布

```html
<div class="main">  
    <div class="center">z中间</div>  
    <div class="left">左</div>  
    <div class="right">右</div>  
</div>
```

```html
.main div{  
    box-sizing: border-box;  
}  
.main{  
    width: calc(100% - 400px);  
    background: red;  
    position: relative;  
    padding-left: 200px;  
    padding-right: 200px;  
}  
.center{  
    width: 100%;  
    background: pink  
}  
.left{  
    background: yellow ;  
    width: 200px;  
    position: absolute;  
    left: 0;  
    top: 0;  
}  
.right{  
    background: blue ;  
    width: 200px;  
    position: absolute;  
    top: 0;  
    right:0  
}
```
![](shengbei-position.png)

### 第三种方法 `float`实现

**经典实现方式：** 应遵循以下要点：

- 两侧宽度固定，中间宽度自适应
    
- 中间部分在DOM结构上优先，以便先行渲染
    
- 允许三列中的任意一列成为最高列
    
- 只需要使用一个额外的`<div>`标签
    

有一个跟完美解释 `圣杯布局` 的文章：[传送门](https://www.cnblogs.com/niujifei/p/11269093.html)

#### HTML结构

```html
<body>  
    <div class="header">#header</div>  
    <div class="container">  
      <div class="center ">#center</div>  
      <div class="left">#left</div>  
      <div class="right">#right</div>  
    </div>  
    <div class="footer">#footer</div>  
</body>
```

#### CSS结构

**1. 假设左侧的固定宽度为200px，右侧的固定宽度为150px，则首先在`container`上设置：**

```css
.container {  
    padding-left: 200px;   
    padding-right: 150px;  
}
```

为左右两列预留出相应的空间，得到如下示意图：
![](shengbei-float-1.png)

**2. 随后分别为三列设置宽度与浮动，同时对`footer`设置清除浮动：**

```css
.container div{  
    float: left;  
}  
.center{  
    width: 100%;  
    background-color: #85D989;  
}  
.left{  
    width: 200px;  
    background-color: pink;  
}  
.right{  
    width: 150px;  
    background-color: blueviolet;  
}  
.footer{  
    clear: both;  
    background-color: darkslategray;  
}
```

效果如下：
![](shengbei-float-2.png)

> 注意：根据浮动的特性，由于`center`的宽度为100%，即占据了第一行的所有空间，所以`left`和`right`被“挤”到了第二行

##### **此处上下为核心关键**

**3. 接下来的工作是将`left`放置到之前预留出的位置上，这里使用 `负外边距` ：**

```css
.left{  
    width: 200px;  
    background-color: pink;  
    margin-left: -100%;  
}
```

效果如下：
![](shengbei-float-3.png)

**4. 随后还需要使用定位(position)方法：**

```css
.left{  
    width: 200px;  
    background-color: pink;  
    margin-left: -100%;  
    position: relative;  
    right: 200px;  
}
```

这里使用`position: relative`和`right: 200px`将`left`的位置在原有位置基础上左移200px，以完成`left`的放置：
![](shengbei-float-4.png)

**5. 最终效果**
![](shengbei-float-5.png)
至此，布局效果完成。不过还需要考虑最后一步，那就是**页面的最小宽度**：要想保证该布局效果正常显示，由于两侧都具有固定的宽度，所以需要给定页面一个最小的宽度，

但这并不只是简单的200+150=350px。回想之前`left`使用了`position: relative`，所以就意味着在`center`开始的区域，还存在着一个`left`的宽度。所以页面的最小宽度应该设置为200+150+200=550px：

#### 完整代码结构

```html
<!DOCTYPE html>  
<html lang="en">  
<head>  
    <meta charset="UTF-8">  
​  
    <title>Document</title>  
    <style type="text/css">  
    *{  
        margin: 0;  
        padding: 0;  
        color: #FFF9E9;  
        font-size: 45px;  
    }  
    div{  
        text-align: center;  
    }  
      
    .container {  
       padding-left: 200px;   
       padding-right: 150px;  
    }  
    .container div{  
        float: left;  
    }  
    .center{  
        width: 100%;  
        background-color: #85D989;  
    }  
    .left{  
        width: 200px;  
        background-color: pink;  
        margin-left: -100%;  
        position: relative;  
        right: 200px;  
    }  
    .right{  
        width: 150px;  
        background-color: blueviolet;  
        margin-left: -150px;  
        position: relative;  
        left: 150px;  
    }  
    .footer{  
        clear: both;  
        background-color: darkslategray;  
    }  
    .header{  
        background-color: darkslategray;  
    }  
</style>  
</head>  
<body>  
    <div class="header">#header</div>  
    <div class="container">  
      <div class="center ">#center</div>  
      <div class="left">#left</div>  
      <div class="right">#right</div>  
    </div>  
    <div class="footer">#footer</div>  
​  
</body>  
</html>
```

## 5 双飞翼布局

> [!note] 参考自[圣杯布局和双飞翼布局的理解与思考](https://www.jianshu.com/p/81ef7e7094e8)，博主写的很有逻辑

### DOM结构

```html
<body>  
  <div id="header"></div>  
  <div id="container" class="column">  
    <div id="center"></div>  
  </div>  
  <div id="left" class="column"></div>  
  <div id="right" class="column"></div>  
  <div id="footer"></div>  
<body>
```

双飞翼布局的DOM结构与圣杯布局的区别是用`container`仅包裹住`center`，另外将`.column`类从`center`移至`container`上。

### CSS代码

按照与圣杯布局相同的思路，首先设置各列的宽度与浮动，并且为左右两列预留出空间，以及为`footer`设置浮动清除：

```css
#container {  
  width: 100%;  
}  
.column {  
  float: left;  
}  
#center {  
  margin-left: 200px;  
  margin-right: 150px;  
}  
#left {  
  width: 200px;   
}  
#right {  
  width: 150px;   
}  
#footer {  
  clear: both;  
}
```
![](shuangfeiyi-1.png)
以上代码将`container`,`left`,`right`设置为`float: left`，而在`container`内部，`center`由于没有设置浮动，所以其宽度默认为`container`的100%宽度，通过对其设置`margin-left`和`margin-right`为左右两列预留出了空间。

将`left`、`right`放置到预留位置

```css
#left {  
  width: 200px;   
  margin-left: -100%;  
}  
#right {  
  width: 150px;   
  margin-left: -150px;  
}
```

最后计算最小页面宽度：由于双飞翼布局没有用到`position:relative`进行定位，所以最小页面宽度应该为200+150=350px。但是当页面宽度缩小到350px附近时，会挤占中间栏的宽度，使得其内容被右侧栏覆盖

因此在设置最小页面宽度时，应该适当增加一些宽度以供中间栏使用（假设为150px），则有：

```css
body {  
  min-width: 500px;  
}
```

布局整体代码为：

```css
body {  
  min-width: 500px;  
}  
​  
#container {  
  width: 100%;  
}  
​  
.column {  
  float: left;  
}  
          
#center {  
  margin-left: 200px;  
  margin-right: 150px;  
}  
          
#left {  
  width: 200px;   
  margin-left: -100%;  
}  
          
#right {  
  width: 150px;   
  margin-left: -150px;  
}  
          
#footer {  
  clear: both;  
}
```

### 总结与思考

通过对圣杯布局和双飞翼布局的介绍可以看出，圣杯布局在DOM结构上显得更加直观和自然，且在日常开发过程中，更容易形成这样的DOM结构（通常`<aside>`和`<article>`/`<section>`一起被嵌套在`<main>`中）；而双飞翼布局在实现上由于不需要使用定位，所以更加简洁，且允许的页面最小宽度通常比圣杯布局更小。

其实通过思考不难发现，两者在代码实现上都额外引入了一个`<div>`标签，其目的都是为了既能保证中间栏产生浮动（浮动后还**必须**显式设置宽度），又能限制自身宽度为两侧栏留出空间。

## 6 水平居中

> [!note] 以下是水平居中的五种基础实现方式

### 6.1 `text-align`

text-align 是入门最常用的属性，根据字面意思是文本对齐用的。

只需在父级标签上设置即可，虽然内部的子元素不管是块级元素 or 非块级元素都可以使用，但需注意块级元素会占用整行的宽度，文本是在这个宽度中作水平居中。

### 6.2 定宽 `margin auto`

这也是常见的水平居中方式，通过设置子元素的 margin 属性来控制距离父元素的距离。

**需要注意**：子元素如果是块级元素，就最好设置宽度，不然就会占满于父元素，在通过 `text-align` 文本居中对齐就没有意义了。对于非块级元素必须要设置宽度。

### 6.3 flex 方式

通过设置浮动布局来实现居中，这是相对上两种方法某种程度上最简单的实现，因为在其基础上可以做更多布局的扩展，不用担心破坏布局。

```css
justify-content: center;
```

### 6.4 position + 浮动(不建议)

> 现在这两种是比较有趣的定位方式，实际场景不建议使用，我是不愿意别人这样写，脑袋还要转个弯，来理解这样布局的计算方式

如果元素是块级元素，通过 float 浮动属性，将它的宽度“抹去”。然后通过对于上级元素的相对定位通过错位修正的方式来居中。

让父元素的左侧从中间开始定位，子元素再根据自己的实际宽度往左偏移一半达到水平居中的目的。

```html
<div class="wrapper">  
    <!-- 通过浮动让元素失去宽度 -->  
    <div style="position: relative;left: 50%;float: left;">  
        <!-- 相对父级元素，反方向修正 -->  
        <div class="item" style="position:relative; left:-50%; float: left;">  
            居中  
        </div>  
    </div>  
</div>
```

### 6.5 position + transform (不建议)

思路同上，不同的是这次设置子元素为绝对定位，并距离左侧偏离一半，最后通过 **transform** 根据元素的实际宽度往左再偏移一半，达到居中效果。

```html
<div class="wrapper">  
    <div style="position: relative;">  
        <!-- 相对父级元素，反方向修正 -->  
        <div class="item" style="position:absolute; left:50%;   
                                 transform: translateX(-50%);">  
            居中  
        </div>  
    </div>  
</div>
```


# 四 CSS 动画

> [!note] 下面汇总并总结了有关与CSS动画的知识！
> 
> `CSS Transform`/`CSS Transition`/`CSS Animation`/`CSS Gradient`


## 1 CSS Transform

`Transform`字面上就是`变形，改变`的意思。在CSS3中`transform`主要包括以下几种：**旋转rotate**、**扭曲skew**、**缩放scale**和**移动translate**以及**矩阵变形matrix**。

**语法：**

`transform ： none | [ rotate | scale | skew | translate |matrix]`

`none`:表示不进么变换；后者表示一个或多个变换函数，**以空格分开**

### 1.1 旋转`rotate`

**rotate()** ：通过指定的角度参数对原元素指定一个2D 旋转，需先有`transform-origin`属性的定义。`transform-origin`定义的是旋转的基点，其中`angle`是指旋转角度，如果设置的值为正数表示顺时针旋转，如果设置的值为负数，则表示逆时针旋转。

如：`transform:rotate(30deg)`

![](rotate.png)

### 1.2 移动`translate`

移动`translate`我们分为三种情况：

- `translate(x,y)`水平方向和垂直方向同时移动（也就是X轴和Y轴同时移动）
    
- `translateX(x)`仅水平方向移动（X轴移动）
    
- `translateY(Y)`仅垂直方向移动（Y轴移动）
    

> 也可以根据`transform-origin`改变基点位置


![](translate.png)

### 1.3 缩放`scale`

缩放`scale`具有三种情况：

- `scale(x,y)`使元素水平方向和垂直方向同时缩放（也就是X轴和Y轴同时缩放）
    
- `scaleX(x)`元素仅水平方向缩放（X轴缩放）
    
- `scaleY(y)`元素仅垂直方向缩放（Y轴缩放）
    

> 但它们具有相同的缩放中心点和基数，其中心点就是元素的中心位置，`缩放基数为1`，如果`其值大于1`元素就放大，反之其值小于1，元素缩小。

`scale([, ])`：提供执行[sx,sy]缩放矢量的两个参数指定一个`2D缩放`。如果第二个参数未提供，则取与第一个参数一样的值。`scale(X,Y)`是用于对元素进行缩放，可以通过`transform-origin`对元素的基点进行设置，同样基点在元素中心位置；基中X表示水平方向缩放的倍数，Y表示垂直方向的缩放倍数，而Y是一个可选参数，如果没有设置Y值，则表示X，Y两个方向的缩放倍数是一样的。并以X为准。如：

```
transform:scale(2,1.5)
```


![](scale.png)

### 1.4 扭曲skew

扭曲`skew`具有三种情况：

- `skew(x,y)`使元素在水平和垂直方向同时扭曲（X轴和Y轴同时按一定的角度值进行扭曲变形）
    
- `skewX(x)`仅使元素在水平方向扭曲变形（X轴扭曲变形）
    
- `skewY(y)`仅使元素在垂直方向扭曲变形（Y轴扭曲变形）
    

`skew( [, ])` ：X轴Y轴上的斜切变换。第一个参数对应X轴，第二个参数对应Y轴。如果第二个参数未提供，则值为0，也就是Y轴方向上无斜切。

skew是用来对元素进行扭曲变行，第一个参数是水平方向扭曲角度，第二个参数是垂直方向扭曲角度。其中第二个参数是可选参数，如果没有设置第二个参数，那么Y轴为0deg。同样是以元素中心为基点，我们也可以通过`transform-origin`来改变元素的基点位置。如：

```
transform:skew(30deg,10deg);
```

![](skew.png)

**skewX()** ： 按给定的角度沿X轴指定一个斜切变换。如：

```
transform:skewX(30deg)
```

![](skewX.png)
### 1.5 矩阵`matrix`

`matrix(, , , , , )`

以一个含六值的(a,b,c,d,e,f)`变换矩阵`的形式指定一个`2D变换`，相当于直接应用一个`[a b c d e f]变换矩阵`。就是基于水平方向（X轴）和垂直方向（Y轴）重新定位元素,此属性值使用涉及到数学中的矩阵。

### 1.6 改变元素基点`transform-origin`

**其主要作用**就是让我们在进行`transform`动作之前可以改变元素的基点位置。

因为我们元素默认基点就是其中心位置，换句话说我们没有使用transform-origin改变元素基点位置的情况下，transform进行的rotate,translate,scale,skew,matrix等操作都是以元素自己中心位置进行变化的。但有时候我们需要在不同的位置对元素进行这些操作，那么我们就可以使用transform-origin来对元素进行基点位置改变，使元素基点不在是中心位置，以达到你需要的基点位置。下面我们主要来看看其使用规则：

`transform-origin(X,Y):` 用来设置元素的运动的基点（参照点）。默认点是元素的中心点。其中X和Y的值可以是`百分值`,`em`,`px`，其中X也可以是字符参数值`left,center,right`；Y和X一样除了百分值外还可以设置字符值`top,center,bottom`

1. `top left | left top` 等价于 `0 0 | 0% 0%`
    
2. `top | top center | center top` 等价于 `50% 0`
    
3. `right top | top right` 等价于 `100% 0`
    
4. `left | left center | center left` 等价于 `0 50% | 0% 50%`
    
5. `center | center center` 等价于 `50% 50%（默认值）`
    
6. `right | right center | center right` 等价于 `100% 50%`
    
7. `bottom left | left bottom` 等价于 `0 100% | 0% 100%`
    
8. `bottom | bottom center | center bottom` 等价于 `50% 100%`
    
9. `bottom right | right bottom` 等价于 `100% 100%`
    

其中 `left,center right`是水平方向取值，对应的百分值为`left=0%;center=50%;right=100%`，而`top center bottom`是垂直方向的取值，其中`top=0%;center=50%;bottom=100%;`如果只取一个值，表示垂直方向值不变

这里还要提醒大家一点的是，transform-origin并不是transform中的属性值，他具有自己的语法，跟其他的css3属性一样，我们需要在不同的浏览内核中加上相应的前缀，下面列出各种浏览器内核下的语法规则：

```
//Mozilla内核浏览器：  
firefox3.5+-moz-transform-origin: x y;  
//Webkit内核浏览器：Safari and Chrome-webkit-transform-origin: x y;  
//Opera-o-transform-origin: x y ;  
//IE9-ms-transform-origin: x y;  
//W3C标准transform-origin: x y ;
```

## 2 CSS Transition

> [!NOTE] 参考自[深入理解CSS过渡transition](https://www.cnblogs.com/xiaohuochai/p/5347930.html)（博主写的太赞了！）
> 
> 可参考[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transition)

### 2.1 定义

过渡`transition`是一个复合属性，包括`transition-property`、`transition-duration`、`transition-timing-function`、`transition-delay`这四个子属性。通过这四个子属性的配合来完成一个完整的过渡效果

```CSS
transition-property: 过渡属性(默认值为all)  
transition-duration: 过渡持续时间(默认值为0s)  
transiton-timing-function: 过渡函数(默认值为ease函数)  
transition-delay: 过渡延迟时间(默认值为0s)
```

> [!NOTE] IE9-不支持该属性，`safari3.1-6`、`IOS3.2-6.1`、`android2.1-4.3`，需要添加`-webkit-`前缀；而其余高版本浏览器支持标准写法

### 2.2 复合属性

过渡`transition`的这四个子属性只有`<transition-duration>`是必需值且不能为0。其中，`<transition-duration>`和`<transition-delay>`都是时间。当两个时间同时出现时，第一个是`<transition-duration>`，第二个是`<transition-delay>`；当只有一个时间时，它是`<transition-duration>`，而`<transition-delay>`为默认值0

> [!note]  `transition`的这四个子属性之间不能用逗号隔开，只能用空格隔开。因为逗号隔开的代表不同的属性(transition属性支持多值，多值部分(稍后介绍)；而空格隔开的代表不同属性的四个关于过渡的子属性。

### 2.3 过渡属性 `transition-property`

> **值:** `none` | `all` | `<transition-property>`[,`<transition-property>`]*
> 
> **初始值:** `all`
> 
> **应用于:** 所有元素
> 
> **继承性:** 无

```
none: 没有指定任何样式  
all: 默认值，表示指定元素所有支持transition-property属性的样式  
<transition-property>: 可过渡的样式，可用逗号分开写多个样式
```

**可过渡的样式**

不是所有的CSS样式值都可以过渡，只有具有中间值的属性才具备过渡效果

```
Vstart = 开始值; Vend = 结束值; Vres = 中间值; p = 过渡函数的输出值  
Vres = (1 - p) * Vstart + p * Vend  
当Vres具有有效值时，则该CSS样式可过渡
```

> 颜色: `color` `background-color` `border-color` `outline-color`
> 
> 位置: `backround-position` `left` `right` `top` `bottom`
> 
> 长度: [1]`max-height` `min-height` `max-width` `min-width` `height` `width` [2]`border-width` `margin` `padding` `outline-width` `outline-offset` [3]`font-size` `line-height` `text-indent` `vertical-align` [4]`border-spacing` `letter-spacing` `word-spacing`
> 
> 数字: `opacity` `visibility` `z-index` `font-weight` `zoom`
> 
> 组合: `text-shadow` `transform` `box-shadow` `clip`
> 
> 其他: `gradient`

### 2.4 过渡持续时间 `transition-duration`

> **值:** `<time>`[,`<time>`]*
> 
> **初始值:** 0s
> 
> **应用于:** 所有元素
> 
> **继承性:** 无
> 
> [注意] 该属性不能为负值,单位是秒s或毫秒ms
> 
> [注意]若该属性为0s则为默认值，若为0则为无效值。所以必须带单位
> 
> [注意]该值为单值时，即所有过渡属性都对应同样时间；该值为多值时，过渡属性按照顺序对应持续时间

### 2.5 过渡延迟时间 `transition-delay`

该属性定义元素属性延迟多少时间后开始过渡效果，该属性的单位是秒s或毫秒ms

> **值:** `<time>`[,`<time>`]*
> 
> **初始值:** 0s
> 
> **应用于:** 所有元素
> 
> **继承性:** 无
> 
> [注意]该属性若为负值，无延迟效果，但过渡元素的起始值将从0变成设定值(设定值=延迟时间+持续时间)。若该设定值小于等于0，则无过渡效果；若该设定值大于0，则过渡元素从该设定值开始完成剩余的过渡效果
> 
> [注意]若该属性为0s则为默认值，若为0则为无效值。所以必须带单位
> 
> [注意]该值为单值时，即所有过渡属性都对应同样时间；该值为多值时，过渡属性按照顺序对应持续时间

### 2.6 过渡时间函数 `transition-timing-function`

`过渡时间函数`用于定义元素过渡属性随时间变化的过渡速度变化效果

> **值:** `<timing-function>`[,`<timing-function>`]*
> 
> **初始值:** ease
> 
> **应用于:** 所有元素
> 
> **继承性:** 无

**取值**

`过渡时间函数`共三种取值:分别是`关键字`、`steps函数`和`bezier函数`

**①steps函数**

　　steps步进函数将过渡时间划分成大小相等的时间时隔来运行

　　steps步进函数为

```
steps(<integer>[,start | end]?)  
<integer>:用来指定间隔个数(该值只能是正整数)  
第二个参数: 该参数可选，默认是end，表示开始值保持一次；若参数为start，表示开始不保持
```

**②贝塞尔曲线**

贝塞尔曲线通过p0-p3四个控制点来控制，其中p0表示(0,0)，p3表示(1,1)。而`<transition-timing-function>`就是通过确定`p1(x1,y1)`和`p2(x2,y2)`的值来确定的。可以使用[工具网站](http://cubic-bezier.com/)来定制。

**③关键字**

`关键字`其实是`bezier函数`或`steps函数`的特殊值

```
ease: 开始和结束慢，中间快。相当于cubic-bezier(0.25,0.1,0.25,1)  
linear: 匀速。相当于cubic-bezier(0,0,1,1)  
ease-in: 开始慢。相当于cubic-bezier(0.42,0,1,1)  
ease-out: 结束慢。相当于cubic-bezier(0,0,0.58,1)  
ease-in-out: 和ease类似，但比ease幅度大。相当于cubic-bezier(0.42,0,0.58,1)  
step-start: 直接位于结束处。相当于steps(1,start)  
step-end: 位于开始处经过时间间隔后结束。相当于steps(1,end)
```

![](function.png)

### 2.7 触发方式

一般地，过渡`transition`的触发有三种方式，分别是`伪类触发`、`媒体查询触发`和`javascript触发`。其中常用伪类触发包括`:hover、:focus、:active`等

**@media触发** 符合媒体查询条件时触发

```css
/* 把浏览器的宽度拖动到小于1000px时触发 */  
@media (max-width: 1000px){  
    .test{  
        width: 500px;  
    }  
}
```

**点击事件** 用户点击元素时触发

```JavaScript
test.onclick = function(){  
    test.style.width = '300px';  
    setTimeout(function(){  
        test.style.width = '100px';  
    },3000);  
}
```

### 2.8 API

> [!note] 关于过渡transition的事件只有一个，是`transitionend`事件，它发生在过渡事件完成后。

> [!note] safari3.1-6、ISO3.2-6.1、android2.1-4.3需要使用`webkitTransitionEnd`事件
> 

### 2.9 transition的使用注意

> [!note] 参考自 [阮一峰网络日志](http://www.ruanyifeng.com/blog/2014/02/css_transition_and_animation.html)

（1）目前，各大浏览器（包括IE 10）都已经支持无前缀的transition，所以transition已经可以很安全地不加浏览器前缀。

（2）不是所有的CSS属性都支持transition，完整的列表查看[这里](http://oli.jp/2010/css-animatable-properties/)，以及具体的[效果](http://leaverou.github.io/animatable/)。

（3）transition需要明确知道，开始状态和结束状态的具体数值，才能计算出中间状态。比如，height从0px变化到100px，transition可以算出中间状态。但是，transition没法算出0px到auto的中间状态，也就是说，如果开始或结束的设置是height: auto，那么就不会产生动画效果。类似的情况还有，display: none到block，background: url(foo.jpg)到url(bar.jpg)等等。

### 2.10 transition的局限

transition的优点在于简单易用，但是它有几个很大的局限。

（1）transition需要事件触发，所以没法在网页加载时自动发生。

（2）transition是一次性的，不能重复发生，除非一再触发。

（3）transition只能定义开始状态和结束状态，不能定义中间状态，也就是说只有两个状态。

（4）一条transition规则，只能定义一个属性的变化，不能涉及多个属性。

CSS Animation就是为了解决这些问题而提出的。

## 3 CSS Animation

> [!note] 参考自[MDN 文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Animations/Using_CSS_animations)、[CSDN大佬博文](https://blog.csdn.net/u013243347/article/details/79976352)
> 
   SVG动画实践：[动画实践](http://www.yangoogle.com/#/)
> 

> [!note] CSS3动效网站:
> 一个很全的CSS3的动效库，可以尝试看看源码进行学习。
>  [CreateJS](https://createjs.com/demos/easeljs/alphamaskreveal) 里面的特效做得也很不错，有很多酷炫的样例。
>   [国外css3网页](https://fournier-pere-fils.com/story) 布局很优雅的网站 
>   [USAToday](http://usatoday.geex-arts.com/) 也是一个很酷炫的国外网站 
>   [peekabeat](https://peekabeat.com/#!/) 很清爽的界面 
>   [dances](http://www.ensemblecorrespondances.com/) 貌似是交响乐的网站主页（打不开） 
>   [reative](https://www.couleecreative.com/) 很有时代感的网站(第一感觉有点突兀吓人) 
>   [animation](http://cssanimate.com/) 在线animation编辑器

动画可以通过设置多个节点来精确控制一个或一组动画，常用来实现复杂的动画效果。

创建动画序列，需要使用[`animation`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/animation)属性或其子属性，该属性允许配置动画时间、时长以及其他动画细节，但该属性不能配置动画的实际表现，动画的实际表现是由 [`@keyframes`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@keyframes)规则实现，具体情况参见[使用keyframes定义动画序列](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Animations/Using_CSS_animations#%E4%BD%BF%E7%94%A8keyframes%E5%AE%9A%E4%B9%89%E5%8A%A8%E7%94%BB%E5%BA%8F%E5%88%97)小节部分。

> **实例**
> 
> `animation`：`动画名称` `动画时间` `运动曲线` `何时开始` `播放次数` `是否反方向`;


```
 animation: rotate 5s linear 0s infinite alternate;
```

### 3.1 Animation 属性

> [!warning] 由于animate为复合属性，简写时极易导致不对应而产生无效属性值的问题
> 也有可能因为没有将元素设置为  `block` 或者  `inline-block` 而导致

**简写属性形式**：

```css
animation:

[animation-name] // 动画的名称

[animation-duration] // 持续时间

[animation-timing-function] // 关于时间的函数(properties/t)

[animation-delay] // 延迟时间

[animation-iteration-count] // 播放次数

[animation-direction] // 播放顺序

[animation-fill-mode] // 播放前或停止后设置相应样式

[animation-play-state]; // 控制动画运行或暂停
```

#### 3.1.1 时间函数（animation-timing-function）

`animation-timing-function`属性定义了动画的播放速度曲线。 可选配置参数为: `ease` (默认值)、 `ease-in`、 `ease-out`、 `ease-in-out`、 `linear`、 `cubic-bezier(number, number, number, number)`

![](time-function.gif)

#### 3.1.2 动画延迟（animation-delay）

`animation-delay`属性定义动画是从何时开始播放，即动画应用在元素上的到动画开始的这段时间的长度。 

- 默认值0s，表示动画在该元素上后立即开始执行。
- 该值以秒(s)或者毫秒(ms)为单位。

#### 3.1.3 动画迭代次数（animation-iteration-count）

`animation-iteration-count`该属性就是定义我们的动画播放的次数。次数可以是1次或者无限循环（默认值为1）

> single-animation-iteration-count = **infinite** | number

#### 3.1.4 动画方向（animation-direction）

`animation-direction`属性表示CSS动画是否反向播放。 可选配置参数为:

> single-animation-direction = normal | reverse | alternate | alternate-reverse

- animation-direction: normal 正序播放
    
- animation-direction: reverse 倒序播放
    
- animation-direction: alternate 交替播放
    
- animation-direction: alternate-reverse 反向交替播放
    
- animation-direction: normal, reverse
    
- animation-direction: alternate, reverse, normal
    

#### 3.1.5 动画填充模式（animation-fill-mode）

`animation-fill-mode`是指给定动画播放前后应用元素的样式。

> single-animation-fill-mode = **none** | **forwards** | **backwards** | **both**

- animation-fill-mode: none 动画执行前后不改变任何样式
    
- animation-fill-mode: forwards 保持目标动画最后一帧的样式
    
- animation-fill-mode: backwards 保持目标动画第一帧的样式
    
- animation-fill-mode: both 动画将会执行 forwards 和 backwards 执行的动作。
    

#### 3.1.6 动画播放状态（animation-play-state）

`animation-play-state:` 定义动画是否运行或者暂停。可以查询它来确定动画是否运行。默认值为**running**

> 有时，动画播放过程中，会突然停止。这时，默认行为是跳回到动画的开始状态。
> 
> 如果鼠标移走，色块立刻回到动画开始状态。如果想让动画保持突然终止时的状态，就要使用animation-play-state属性。

> single-animation-timing-function = **running** | **paused**

- running 动画正常播放
    
- paused 动画暂停播放
    
![](description.png)

#### 浏览器前缀

目前，IE 10和Firefox（>= 16）支持没有前缀的animation，而chrome不支持，所以必须使用webkit前缀。

也就是说，实际运用中，代码必须写成下面的样子。

```css
div:hover {  
  -webkit-animation: 1s rainbow;  
  animation: 1s rainbow;    
}  
​  
@-webkit-keyframes rainbow {  
  0% { background: #c00; }  
  50% { background: orange; }  
  100% { background: yellowgreen; }  
}  
​  
@keyframes rainbow {  
  0% { background: #c00; }  
  50% { background: orange; }  
  100% { background: yellowgreen; }  
}
```
### 3.2 keyframes的写法

`keyframes`关键字用来定义动画的各个状态，它的写法相当自由。

0%可以用from代表，100%可以用to代表。

```css
@keyframes rainbow {  
  from { background: #c00 }  
  50% { background: orange }  
  to { background: yellowgreen }  
}
```

如果省略某个状态，浏览器会自动推算中间状态，所以下面都是合法的写法。

```css
@keyframes rainbow {  
  50% { background: orange }  
  to { background: yellowgreen }  
}  
  
@keyframes rainbow {  
  to { background: yellowgreen }  
}
```

甚至，可以把多个状态写在一行。

```css
@keyframes pound {  
  from，to { transform: none; }  
  50% { transform: scale(1.2); }  
}
```

另外一点需要注意的是，浏览器从一个状态向另一个状态过渡，是平滑过渡。steps函数可以实现分步过渡。

```css
div:hover {  
  animation: 1s rainbow infinite steps(10);  
}
```

> [!note] 附一个[MDN的例子](https://developer.mozilla.org/zh-CN/docs/Web/CSS/animation)：赛隆人之眼(赛隆人是一个虚构的生化人种族,出自科幻电视系列剧星际大争霸系列)

> [!note] 然后引出 **渐变色** 的概念，[MDN 使用CSS渐变](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Using_CSS_gradients) 的传送门

## 4 CSS 渐变

**CSS 渐变**`<image>` 类型的一种特殊类型 `<gradient>`表示，由两种或多种颜色之间的渐进过渡组成。您可以选择三种类型的渐变：线性 (由 [`linear-gradient`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/linear-gradient) 函数创建)，径向(由 [`radial-gradient()`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/radial-gradient) 函数创建) 和圆锥 (由 [`conic-gradient`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/conic-gradient) 函数创建)。您还可以使用 [`repeating-linear-gradient`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/repeating-linear-gradient) 和 [`repeating-radial-gradient`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/repeating-radial-gradient) 函数创建重复渐变。

渐变可以在任何使用 `<image>` 的地方使用，例如在背景中。 由于渐变是动态生成的，因此它们可以消除对传统用于实现类似效果的栅格图像文件的需求。 此外，由于渐变是由浏览器生成的，因此在放大时它们看起来比栅格图像更好，并且可以动态调整大小。

### 4.1 使用线性渐变

线性渐变创建了一条沿直线前进的颜色带。

#### 基础线性渐变

要创建最基本的渐变类型，您只需指定两种颜色即可。 这些被称为色标。 至少指定两个色标，也可以指定任意数量。

```css
.simple-linear {  
  background: linear-gradient(blue, pink);  
}
```

#### 改变渐变方向

默认情况下，线性渐变的方向是从上到下， 你可以指定一个值来改变渐变的方向。

```css
.horizontal-gradient {  
  background: linear-gradient(to right, blue, pink);  
}
```

#### 对角线渐变

你甚至可以设置渐变方向为从一个对角到另一个对角。

```css
.diagonal-gradient {  
  background: linear-gradient(to bottom right, blue, pink);  
}
```

#### 设置渐变角度

如果你想要更精确地控制渐变的方向，你可以给渐变设置一个具体的角度。

```css
.angled-gradient {  
  background: linear-gradient(70deg, blue, pink);  
}
```

### 4.2 声明颜色和创建效果

所有的CSS渐变类型都是一个位置依赖的颜色范围。CSS渐变产生的颜色可以随位置不断变化，从而产生平滑的颜色过渡。也可以创建纯色带和两种颜色之间的硬过渡。以下内容适用于所有渐变函数：

#### 使用多种颜色

无需局限于使用两种颜色，你想使用多少种颜色都可以！ 默认情况下，所设置颜色会均匀分布在渐变路径中。

```css
.auto-spaced-linear-gradient {  
  background: linear-gradient(red, yellow, blue, orange);  
}
```

#### 颜色终止位置

你不需要让你设置的颜色在默认位置终止。 你可以通过给每个颜色设置0，1%或者2%或者其他的绝对数值来调整它们的位置。如果你将位置设置为百分数， `0%` 表示起始点, 而100%表示终点，但是如果需要的话你也可以设置这个范围之外的其他值来达到你想要的效果。如果有些位置你没有明确设置，那么它将会被自动计算，第一种颜色会在0%处停止，而最后一种颜色是100%，至于其他颜色则是在它邻近的两种颜色的中间停止。

```css
.multicolor-linear {   
   background: linear-gradient(to left, lime 28px, red 77%, cyan);  
}
```

#### 创建实线

要在两种颜色之间创建一条硬线，即创建一个条纹而不是逐渐过渡，可以将相邻的颜色停止设置为相同的位置。在此示例中，两种颜色在50%标记处共享一个颜色停止点，即渐变的一半：

```css
.striped {   
   background: linear-gradient(to bottom left, cyan 50%, palegoldenrod 50%);   
}
```

#### 渐变提示

默认情况下，渐变会平滑地从一种颜色过渡到另一种颜色。你可以通过设置一个值来将渐变的中心点移动到指定位置。 在如下示例中, 我们将渐变的中心点由50%设为10%。

```css
.color-hint {  
  background: linear-gradient(blue, 10%, pink);  
}  
.simple-linear {  
  background: linear-gradient(blue, pink);  
}
```

更多内容如**在图片上的叠加鉴别**、**增加不透明度** 以及其他的**渐变函数** 见[MDN](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Using_CSS_gradients)

# 五 CSS 动画及图形解决方案

> [!note] CSS动画库 （转载自知乎博主[十个推荐的CSS动画库](https://zhuanlan.zhihu.com/p/101563245)）
> 
> 一些CSS牛逼样式图形

<!--more-->

## 1 十个值得推荐的CSS动画库

### 1.1 [Animista](https://animista.net/play/basic/slide-bck)(生成器)

> emmm,简直不要太爽！可视化自动生成！

### 1.2 [Animation.css](https://animate.style/)（调用库）

当然，我也必须提及`Animate CSS`，也许这是一个众所周知的动画库。

**1.使用**

Install with npm:

```bash
$ npm install animate.css --save
```

or add it directly to your webpage using a CDN:

```html
<head>  
  <link  
    rel="stylesheet"  
    href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"  
  />  
</head>
```

然后在你需要添加动画的元素上添加`animated`类名，然后就是添加动画的名称。**比如**

```html
<div class="animated slideInLeft"></div>
```

如果你希望动画是持久的，你可以添加`infinite`类，这样动画将不停地重复自身。

- **通过 JavaScript**
    

```JavaScript
document.querySelector('.my-element').classList.add('animated', 'slideInLeft')
```

- **通过 Jquery**
    

```JavaScript
$(".my-element").addClass("animated slideInLeft")
```

**2.额外的特性**

`Animate CSS`为你提供了一些基本的类去操作动画的延时和速度。

- 延时：你可以通过使用`delay`类来延迟你的动画。
    



```html
<div class="animated slideInLeft delay-{1-5}"><div>
```

- 速度：你可以通过添加下表中的类来控制动画的速度。
    



|Class name|Speed time|
|---|---|
|slow|2s|
|slower|3s|
|fast|800ms|
|faster|500ms|

```html
<div class="animated slideInLeft slow|slower|fast|faster"><div>
```


**3. 在vue中使用animate.css**

命令行中执行：`npm install animate.css --save`

第二步：`main.js`中引入及使用：`import animated from 'animate.css'`

`Vue.use(animated)`

vue模板中：

```html
<div class="ty">  
<!-- 直接使用animated中的动画class名，注意：必须使用animated这个class名，否则动画会无效 -->  
<div class="box animated bounceInDown"></div>  
</div>
```

### 1.3 [Vivify](http://vivify.mkcreative.cz/)（调用库）

它的使用一样，有自己更多的类，但是也扩展了些。添加`vivify`类到元素中，而不是`animated`。比如：

<div class="vivify slideInLeft"></div>

- **使用 Javascript**
    

```JavaScript
document.querySelector('.my-element').classList.add('vivify', 'slideInLeft')
```

- **使用 Jquery**
    

```JavaScript
$(".my-element").addClass("vivify slideInLeft")

```
就像`Animate CSS`一样，`Vivify`也为你提供了一些类来控制动画的持续时间和延迟时间。

延迟和持续时间的类在下面的间隔中可用：

```html
<div class="delay|duration-{100|150|200|250...1000|1250|1500|1750...10750}"></div>
```

> 注意：值的单位是毫秒（ms）。1000ms = 1s

### 1.4 [Magic Animations CSS3](https://www.minimamente.com/project/magic/)（调用库）

> 官网暂无相应（可能我不会用）

这个动画库有些不错并且流畅的动画，我特别喜欢`3D`动画。

没什么好说的，自己去尝试下，玩下动画。

你可以添加`magictime {animation_name}`到你的元素中，如下：

```html
<div class="magictime fadeIn"></div>
```

- **使用 Javascript**
    

```JavaScript
document.querySelector('.my-element').classList.add('magictime', 'fadeIn')
```

- **使用 Jquery**
    

```JavaScript
$(".my-element").addClass("magictime fadeIn")
```

### 1.5 [cssanimation.io](http://cssanimation.io/index.html)（调用库）

> 此时，我打不开它。。。

`cssanimation.io`是一大堆不同动画的集合，总共大约有200个，真是太神奇了。

如果在这里都找不到你想要的动画，那你在哪都找不到了。

它的使用方式类似`animista`。比如，你可以直接选择动画，然后直接从网站中获取，或者下载整个库。

**使用**

为你的元素添加`cssanimation {animation_name}`。

```html
<div class="cssanimation fadeIn"></div>
```
- **使用 Javascript**
    

```JavaScript
document.querySelector('.my-element').classList.add('cssanimation','fadeIn')
```

- **使用 Jquery**
    

```JavaScript
$(".my-element").addClass("cssanimation fadeIn")
```

你也可以添加`infinite`类，以便动画不断重复。

```html
<div class="cssanimation fadeIn infinite"></div>
```

此外，`cssanimations.io`为你提供了动画字母的功能。为了实现这个，你需要在`head`标签中引入`letteranimation.js`文件，然后在你的文本元素中添加`le{animation_name}`。

```html
<div class="cssanimation leSnake"></div>
```

想要字母动画有序进行，添加`sequence`类；想要字母动画无序进行，添加`random`类。

```html
<div class="cssanimation leSnake {sequence|random}"></div>
```

### 1.6 [Angrytools](https://angrytools.com/css/animation/)（生成器）

如果使用生成器（`Angrytools`不错），`Angrytools`实际上是一个集合，其中还包括`CSS`动画生成器。

这个网站也为你提供了定制动画的功能，比如持续时间和延迟时间。

最重要的是，你可以在时间线上添加`keyframes（关键帧）`，并且你可以直接在那里写代码。而且，你也可以编辑现有的一个效果。

### 1.7 [Hover.css](http://ianlunn.github.io/Hover/)（调用库）

`Hover.css`是众多`CSS`动画的集合，与上面的动画不同，**每次将元素悬停时**都会触发。

> 一组CSS3驱动的悬停效果，可以应用到链接，按钮，logos，svg，图片特性和其他。

它有一些惊人的动效。而且它还有用于动画图标的类，比如超棒的字体。

**使用**

使用很简单：将类名添加到你的元素中，比如：

```html
<button class="hvr-fade">Hover me!</button>
```

### 1.8 [WickedCSS](http://kristofferandreasen.github.io/wickedCSS/#) （调用库）

`WickedCSS`是一个小型的`CSS`动画库，没有太多的动画体，但是它至少有很棒的动画。它们中大多数是我们熟悉的基本动画，但是它们真是很简洁。

使用方法很简单，只要为你的元素添加动画名就行了。

```html
<div class="bounceIn"></div>
```

- **使用 Javascript**
    

```JavaScript
document.querySelector('.my-element').classList.add('bounceIn')
```

- **使用 Jquery**
    

```JavaScript
$(".my-element").addClass("bounceIn")
```

### 1.9 [Three Dots](https://nzbin.github.io/three-dots/)（调用库）

> `Three Dots`是`CSS`加载动画的集合，仅由三个简单元素制作而成的三个点创建。

**使用**

创建一个`div`元素，然后添加动画名。

```html
<div class="dot-elastic"></div>
```

### 1.10 [CSSHake](https://elrumordelaluz.github.io/csshake/)（调用库）

最后，来点摇晃的抖动。

如其名，`CSShake`包含了不同类型的抖动动画的`CSS`动画库。

- **使用**：添加`shake {animation_name}`到你的元素中。
    



```html
<div class="shake shake-hard"></div>
```

- **使用 Javascript**
    

```JavaScript
document.querySelector('.my-element').classList.add('shake','shake-hard')
```

- **使用 Jquery**
    

```JavaScript
$(".my-element").addClass("shake shake-hard")
```

## 2 神奇的CSS多边形绘制

> [!note] 转载自 [手记](https://www.imooc.com/article/27838)

CSS3之前，我们能做的只有矩形，四四方方，条条框框

CSS3出来后，我们有了更广阔的施展空间，通过

- `border-radius`
    
- `border`
    
- `transform`
    
- 伪元素配合
    
- gradient 渐变
    

我们能够作出非常多的几何图形。

### 传统方式绘制

除去最常见的矩形，圆形（`border-radius`），下面稍微列举一些其他几何图形：

```html
<div class="container">  
    <!-- 三角形 -->  
    <div class="traingle"></div>  
    <!-- 切角 -->  
    <div class="notching"></div>  
    <!-- 梯形 -->  
    <div class="trapezoid"></div>  
    <!-- 五边形 -->  
    <div class="pentagon"></div>  
    <!-- 六边形 -->  
    <div class="hexagon"></div>  
    <!-- 八边形 -->  
    <div class="octagon"></div>  
    <!-- star -->  
    <div class="star"></div>  
    <!-- 六角星 -->  
    <div class="sixstar"></div>  
    <!-- 八角星 -->  
    <div class="eightstar"></div>  
    <!-- 十二角星 -->  
    <div class="twelvestar"></div>  
    <!-- 椭圆 -->  
    <div class="ellipse"></div>  
</div>
```

#### 1. 三角形

通常会使用透明的border模拟出一个三角形：

```css
.traingle {  
	width: 0;  
	height: 0;  
	border-left: 50px solid transparent;  
	border-right: 50px solid transparent;  
	border-bottom: 100px solid yellowgreen;  
}
```
![](shape1.png)

#### 2. 切角

《CSS Secret》里面的方法，采用多重线性渐变实现切角。

```css
.notching {  
    width: 40px;  
    height: 40px;  
    padding: 40px;  
    background: linear-gradient(135deg, transparent 15px, yellowgreen 0) top left,  
        linear-gradient(-135deg, transparent 15px, yellowgreen 0) top right,  
        linear-gradient(-45deg, transparent 15px, yellowgreen 0) bottom right,  
        linear-gradient(45deg, transparent 15px, yellowgreen 0) bottom left;  
    background-size: 50% 50%;  
    background-repeat: no-repeat;  
}
```

![](shape2.png)
#### 3. 梯形

利用伪元素加旋转透视实现梯形：

![](shape3.png)

#### 4. 五边形

梯形加上三角形，很容易就组合成一个五边形，这里需要借助一个伪元素实现：

```css
.pentagon {  
    position: relative;  
    width: 60px;  
    margin-bottom: 100px!important;  
    border-bottom: 60px solid yellowgreen;  
    border-left: 40px solid transparent;  
    border-right: 40px solid transparent;   
}  
​  
.pentagon::before {  
    content:"";  
    position: absolute;  
    border-top: 60px solid yellowgreen;  
    border-left: 70px solid transparent;  
    border-right: 70px solid transparent;  
    top: 60px;  
    left: -40px;  
}
```

![](shape4.png)
#### 5. 六边形

看看上面的梯形，如果两个反方向且底边同样大小的梯形，叠加在一起，是不是就能得到一个六边形

```css
.hexagon {  
    position: relative;  
    width: 60px;  
    margin-bottom: 120px!important;  
    border-bottom: 60px solid yellowgreen;  
    border-left: 40px solid transparent;  
    border-right: 40px solid transparent;  
}  
.hexagon::before {  
    content: "";  
    position: absolute;  
    width: 60px;  
    height: 0px;  
    top: 60px;  
    left: -40px;  
    border-top: 60px solid yellowgreen;  
    border-left: 40px solid transparent;  
    border-right: 40px solid transparent;  
}
```

![](shape5.png)
#### 6. 八边形

六边形都解决了，八边形也不在话下，一个矩形加上两个梯形，可以合成一个八边形。

```css
.octagon {  
    position: relative;  
    width: 40px;  
    height: 100px;  
    background: yellowgreen;  
}  
.octagon::before {  
    content: "";  
    height: 60px;  
    position: absolute;  
    top: 0;  
    left: 40px;  
    border-left: 30px solid yellowgreen;  
    border-top: 20px solid transparent;  
    border-bottom: 20px solid transparent;  
}  
.octagon::after {  
    content: "";  
    height: 60px;  
    position: absolute;  
    top: 0;  
    left: -30px;  
    border-right: 30px solid yellowgreen;  
    border-top: 20px solid transparent;  
    border-bottom: 20px solid transparent;  
}
```

![](shape6.png)
#### 7. 五角星

好的，探索完多边形，我们继续探索X角星-------这里使用 3 个三角形叠加旋转在一起实现。

```css
.star {  
   margin: 50px 0;  
   position: relative;  
   width: 0;  
   border-right: 100px solid transparent;  
   border-bottom: 70px  solid yellowgreen;  
   border-left: 100px solid transparent;  
   transform: rotate(35deg) scale(.6);  
}  
.star:before {  
    content: '';  
    position: absolute;  
    border-bottom: 80px solid yellowgreen;  
    border-left: 30px solid transparent;  
    border-right: 30px solid transparent;  
    top: -45px;  
    left: -65px;  
    transform: rotate(-35deg);  
}  
.star:after {  
    content: '';  
    position: absolute;  
    color: yellowgreen;  
    top: 3px;  
    left: -105px;  
    border-right: 100px solid transparent;  
    border-bottom: 70px solid yellowgreen;  
    border-left: 100px solid transparent;  
    transform: rotate(-70deg);  
}
```

![](shape7.png)

#### 8. 六角星

六角星呢？想象一下，一个向上的三角形 ▲，叠加上一个向下的三角形 ▼，就可以得到一个六边形：

```css
.sixstar {  
  position: relative;  
  width: 0;  
  border-left: 50px solid transparent;  
  border-right: 50px solid transparent;  
  border-bottom: 100px solid yellowgreen;  
}  
.sixstar:after {  
  content: "";  
  position: absolute;  
  border-left: 50px solid transparen;  
  border-right: 50px solid transparent;  
  border-top: 100px solid yellowgreen;  
  top: 30px;  
  left: -50px;  
}
```

![](shape8.png)

#### 9. 八角星

八角星呢？八个角那么多呢。其实使用两个矩形进行旋转拼接就可以了。

```css
.eightstar {  
    position: relative;  
    width: 100px;  
    height: 100px;  
    margin-bottom: 100px!important;  
    background-color: yellowgreen;  
    transform: rotate(30deg);  
}  
​  
.eightstar::before {  
    content: "";  
    position: absolute;  
    top: 0;  
    left: 0;  
    width: 100px;  
    height: 100px;  
    transform: rotate(45deg);  
    background-color: yellowgreen;  
}
```

![](shape9.png)
#### 10. 十二角星

好。最后多角星再来一个十二级角星。在八角星的基础上，再增加一个矩形，就能得到十二角啦。也就是要过第一个伪元素。

```css
.twelvestar {  
    position: relative;  
    width: 100px;  
    height: 100px;  
    margin-bottom: 100px!important;  
    background-color: yellowgreen;  
    transform: rotate(30deg);  
}  
​  
.twelvestar::before {  
    content: "";  
    position: absolute;  
    top: 0;  
    left: 0;  
    width: 100px;  
    height: 100px;  
    transform: rotate(30deg);  
    background-color: yellowgreen;  
}  
​  
.twelvestar::after {  
    content: "";  
    position: absolute;  
    top: 0;  
    left: 0;  
    width: 100px;  
    height: 100px;  
    transform: rotate(60deg);  
    background-color: yellowgreen;  
}
```

![](shape10.png)
#### 11. 椭圆

最后，再来使用传统的方法画一个椭圆，过去 CSS3 画椭圆，基本上只能借助 border 实现。

这里使用 border 画一个蛋的形状：

```css
.ellipse {  
    width: 120px;  
    height: 160px;  
    background-color: yellowgreen;  
    border-radius: 50%` 50% 50% 50% / 60% 60% 40% 40%;  
}
```

![](shape11.png)
#### 12. 爱心

```css
#heart {   
position: relative;   
width: 100px;   
height: 90px;   
}   
#heart:before,   
#heart:after {   
position: absolute;   
content: "";   
left: 50px;   
top: 0;   
width: 50px;   
height: 80px;   
background: red;   
-moz-border-radius: 50px 50px 0 0;   
border-radius: 50px 50px 0 0;   
-webkit-transform: rotate(-45deg);   
-moz-transform: rotate(-45deg);   
-ms-transform: rotate(-45deg);   
-o-transform: rotate(-45deg);   
transform: rotate(-45deg);   
-webkit-transform-origin: 0 100%;   
-moz-transform-origin: 0 100%;   
-ms-transform-origin: 0 100%;   
-o-transform-origin: 0 100%;   
transform-origin: 0 100%;   
}   
#heart:after {   
left: 0;   
-webkit-transform: rotate(45deg);   
-moz-transform: rotate(45deg);   
-ms-transform: rotate(45deg);   
-o-transform: rotate(45deg);   
transform: rotate(45deg);   
-webkit-transform-origin: 100% 100%;   
-moz-transform-origin: 100% 100%;   
-ms-transform-origin: 100% 100%;   
-o-transform-origin: 100% 100%;   
transform-origin :100% 100%;   
}
```

![](shape13.png)
#### 13. 无穷大

```css
#infinity {   
position: relative;   
width: 212px;   
height: 100px;   
}   
#infinity:before,   
#infinity:after {   
content: "";   
position: absolute;   
top: 0;   
left: 0;   
width: 60px;   
height: 60px;   
border: 20px solid red;   
-moz-border-radius: 50px 50px 0 50px;   
border-radius: 50px 50px 0 50px;   
-webkit-transform: rotate(-45deg);   
-moz-transform: rotate(-45deg);   
-ms-transform: rotate(-45deg);   
-o-transform: rotate(-45deg);   
transform: rotate(-45deg);   
}   
#infinity:after {   
left: auto;   
right: 0;   
-moz-border-radius: 50px 50px 50px 0;   
border-radius: 50px 50px 50px 0;   
-webkit-transform: rotate(45deg);   
-moz-transform: rotate(45deg);   
-ms-transform: rotate(45deg);   
-o-transform: rotate(45deg);   
transform: rotate(45deg);   
} 
```

![](shape14.png)

#### 14. 食逗人（Pac-Man）

```css
#pacman {   
width: 0px;   
height: 0px;   
border-right: 60px solid transparent;   
border-top: 60px solid red;   
border-left: 60px solid red;   
border-bottom: 60px solid red;   
border-top-left-radius: 60px;   
border-top-right-radius: 60px;   
border-bottom-left-radius: 60px;   
border-bottom-right-radius: 60px;   
} 
```

![](shape15.png)
#### 15. 提示对话框

```css
#talkbubble {   
width: 120px;   
height: 80px;   
background: red;   
position: relative;   
-moz-border-radius: 10px;   
-webkit-border-radius: 10px;   
border-radius: 10px;   
}   
#talkbubble:before {   
content:"";   
position: absolute;   
right: 100%;   
top: 26px;   
width: 0;   
height: 0;   
border-top: 13px solid transparent;   
border-right: 26px solid red;   
border-bottom: 13px solid transparent;   
} 
```

![](shape16.png)
#### 16. 阴阳八卦

```css
#yin-yang {   
width: 96px;   
height: 48px;   
background: #eee;   
border-color: red;   
border-style: solid;   
border-width: 2px 2px 50px 2px;   
border-radius: 100%;   
position: relative;   
}   
#yin-yang:before {   
content: "";   
position: absolute;   
top: 50%;   
left: 0;   
background: #eee;   
border: 18px solid red;   
border-radius: 100%;   
width: 12px;   
height: 12px;   
}   
#yin-yang:after {   
content: "";   
position: absolute;   
top: 50%;   
left: 50%;   
background: red;   
border: 18px solid #eee;   
border-radius:100%;   
width: 12px;   
height: 12px;   
} 
```

![](shape17.png)
### CSS3新绘制方式

上面所讲述的是使用传统 CSS3 的方式绘制几何图形，前人栽树后人乘凉，之前的大牛们在 CSS 绘制几何图形上已经做了非常深入的研究，更多的 CSS 图形你可以戳这里：The Shapes of CSS 。接下来我们将要了解一些更高级的绘制几何图形的方法。

- clip-path
    
- shape-outside
    

#### 1. clip-path

CSS 新属性 `clip-path`，意味裁剪路径的意思，让我们可以很便捷的生成各种几何图形。

clip-path 通过定义特殊的路径，实现我们想要的图形。而这个路径，正是 SVG 中的 path 。

看看它的 API：

![](ref1.png)
看上去很多，其实很好理解，如果接触过 SVG 的 path，其实就是照搬 SVG 的 path 的一些定义。换言之，如果没有接触过 SVG，看完本文后再去学习 SVG 路径 ，也会十分容易上手。

根据不同的语法，我们可以生成不同的图形。

例如 `clip-path: circle(50px at 50px 50px)` 表示在元素的 （50px, 50px）处，裁剪生成一个半径为 50px 的圆。

而整个 `clip-path` 属性，最为重要的当属 `polygon`，可以利用 `polygon` 生成任意多边形。clip-path 示例

下面分别列举使用 clip-path 生成一个圆形和一个十边形。

![](shape12.png)

`clip-path: polygon(50% 0%, 80% 10%, 100% 35%, 100% 70%, 80% 90%, 50% 100%, 20% 90%, 0% 70%, 0% 35%, 20% 10%)` 中，依次列出了 10 个坐标点。我们的图形就是依次连接这 10 个坐标点形成一个裁切图形。

当然，这里采用的是百分比，也可以使用具体的数值。

#### 2. clip-path 动画

clip-path 另外一个强大之处在于可以进行 CSS transtion 与 CSS animation，也就是过渡和动画。

效果见[这儿](https://codepen.io/Chokcoco/pen/LLNWyZ?editors=1100)

```css
.polygon-animate {  
    position: absolute;  
    width: 200px;  
    height: 200px;  
    top: 50%;  
    left: 50%;  
    transform: translate(-50%, -50%);  
    background-color: crimson;  
    transition: .3s;  
    clip-path: polygon(  
        50% 0%,  
        0% 100%,  
        100% 100%,  
        100% 100%,  
        100% 100%,  
        100% 100%,  
        100% 100%,  
        100% 100%,  
        100% 100%  
    );  
    animation: polygon-ani 5s linear infinite;  
}  
@keyframes polygon-ani {  
    10% {  
        background-color: darkorange;  
        clip-path: polygon(  
            50% 0%,  
            100% 50%,  
            50% 100%,  
            0% 50%,  
            0% 50%,  
            0% 50%,  
            0% 50%,  
            0% 50%,  
            0% 50%  
        );  
    }  
    14% {  
        clip-path: polygon(  
            50% 0%,  
            100% 50%,  
            50% 100%,  
            0% 50%,  
            0% 50%,  
            0% 50%,  
            0% 50%,  
            0% 50%,  
            0% 50%  
        );  
    }  
    24% {  
        background-color: lemonchiffon;  
        clip-path: polygon(  
            100% 38%,  
            82% 100%,  
            82% 100%,  
            18% 100%,  
            0% 38%,  
            0% 38%,  
            0% 38%,  
            0% 38%,  
            50% 0%  
        );  
    }  
    28% {  
        clip-path: polygon(  
            100% 38%,  
            82% 100%,  
            82% 100%,  
            18% 100%,  
            0% 38%,  
            0% 38%,  
            0% 38%,  
            0% 38%,  
            50% 0%  
        );  
    }  
    38% {  
        background-color: darkturquoise;  
        clip-path: polygon(  
            50% 0%,  
            100% 25%,  
            100% 75%,  
            100% 75%,  
            50% 100%,  
            0% 75%,  
            0% 75%,  
            0% 25%,  
            0% 25%  
        );  
    }  
    42% {  
        clip-path: polygon(  
            50% 0%,  
            100% 25%,  
            100% 75%,  
            100% 75%,  
            50% 100%,  
            0% 75%,  
            0% 75%,  
            0% 25%,  
            0% 25%  
        );  
    }  
    52% {  
        background-color: darkcyan;  
        clip-path: polygon(  
            50% 0%,  
            90% 20%,  
            100% 60%,  
            75% 100%,  
            25% 100%,  
            25% 100%,  
            0% 60%,  
            10% 20%,  
            50% 0%  
        );  
    }  
    56% {  
        clip-path: polygon(  
            50% 0%,  
            90% 20%,  
            100% 60%,  
            75% 100%,  
            25% 100%,  
            25% 100%,  
            0% 60%,  
            10% 20%,  
            50% 0%  
        );  
    }  
    66% {  
        background-color: deepskyblue;  
        clip-path: polygon(  
            30% 0%,  
            70% 0%,  
            70% 0%,  
            100% 30%,  
            100% 70%,  
            70% 100%,  
            30% 100%,  
            0% 70%,  
            0% 30%  
        );  
    }  
    70% {  
        clip-path: polygon(  
            30% 0%,  
            70% 0%,  
            70% 0%,  
            100% 30%,  
            100% 70%,  
            70% 100%,  
            30% 100%,  
            0% 70%,  
            0% 30%  
        );  
    }  
    80% {  
        background-color: indigo;  
        clip-path: polygon(  
            83% 12%,  
            100% 43%,  
            94% 78%,  
            68% 100%,  
            32% 100%,  
            6% 78%,  
            0% 43%,  
            17% 12%,  
            50% 0%  
        );  
    }  
    84% {  
        clip-path: polygon(  
            83% 12%,  
            100% 43%,  
            94% 78%,  
            68% 100%,  
            32% 100%,  
            6% 78%,  
            0% 43%,  
            17% 12%,  
            50% 0%  
        );  
    }  
    94% {  
        background-color: crimson;  
        clip-path: polygon(  
            50% 0%,  
            0% 100%,  
            100% 100%,  
            100% 100%,  
            100% 100%,  
            100% 100%,  
            100% 100%,  
            100% 100%,  
            100% 100%  
        );  
    }  
}
```

**图形变换动画**

除此之外，我们还可以尝试，将一个完整的图形，分割成多个小图形，这也是 `clip-path` 的魅力所在，纯 CSS 的图形变换：

[多边形切换传送门](https://codepen.io/Chokcoco/pen/yXOjZm)

[N边形切换传送门](https://codepen.io/Chokcoco/pen/XgJRzO)

[VueN边形切换](https://codepen.io/Chokcoco/pen/NgqGOo)

#### 3. shape-outside

最后再来看看 `shape-outside`，另外一个有趣的有能力生成几何图形的属性。

`shape-outside` 是啥？它也有制造各种几何图形的能力，但是它只能和浮动 `float` 一起使用。

虽然使用上有所限制，但是它赋予了我们一种更为自由的图文混排的能力。

[MDN文档传送门](https://developer.mozilla.org/zh-CN/docs/Web/CSS/shape-outside)


# 六 CSS响应式设计

## 1 媒体查询 `Media Queryies`

**Media Queries**直译过来就是“`媒体查询`”，在我们平时的Web页面中`head`部分常看到这样的一段代码：

```HTML
<link href="css/reset.css" rel="stylesheet" type="text/css" media="screen" /> 
<link href="css/style.css" rel="stylesheet" type="text/css" media="all" /> 
<link href="css/print.css" rel="stylesheet" type="text/css" media="print" />
```

而这个“media”就是用来指定特定的媒体类型，在HTML4和CSS2中允许你使用“[media](https://link.jianshu.com?t=http://www.w3.org/TR/CSS2/media.html)”来指定特定的媒体类型，如屏幕（screen）和打印（print）的样式表，当然还有其他的，比如说“TV”,“handheld”等，其中“all”表示的是支持所有媒体介质。有关于更多的Media类型，可以点击[这里](http://www.w3.org/TR/CSS2/media.html)。

**举个例子**

```xml
<link rel="stylesheet" media="screen and (max-width: 600px)" href="small.css" />
```

> 上面的media语句表示的是：当页面宽度小于或等于600px,调用small.css样式表来渲染你的Web页面。

1. **screen**：这个不用说大家都知道，指的是一种媒体类型；
2. **and**：被称为关键词，与其相似的还有not,only，稍后会介绍；
3. **（max-width:600px）**：这个就是媒体特性，说得通俗一点就是媒体条件。

**上述的代码换成css的写法如下:**

```java
@media screen and (max-width: 600px) { 选择器 { 属性：属性值； } }
```

**常用的Media Query**如下表所示：

> color
> color-index
> aspect-ratio
> device-aspect-ratio
> device-height
> device-width
> grid
> height
> monochrome
> orientation : landscape | portrait
> resolution
> scan
> width

![](media_query-1.png)

### Media Queries的具体使用方式

#### 1. 最大宽度Max Width

```bash
<link rel="stylesheet" 
media="screen and (max-width:600px)" 
href="small.css" type="text/css" />
```

上面表示的是：当屏幕小于或等于`600px`时，将采用`small.css`样式来渲染Web页面。

#### 2. 最小宽度Min Width

```bash
<link rel="stylesheet" 
media="screen and (min-width:600px)" 
href="large.css" type="text/css" />
```

上面表示的是：当屏幕大于或等于600px时，将采用large.css样式来渲染Web页面。

#### 3. 多个Media Queries使用

```bash
<link rel="stylesheet" 
media="screen and (min-width:600px) and (max-width:900px)" 
href="style.css" type="text/css" />
```

上面的表示的是当屏幕在600px-900px之间时采用style.css样式来渲染web页面。

#### 4. 两种加载方式

```xml
<!-- CSS media query on a link element -->
<link rel="stylesheet" media="(max-width: 800px)" href="example.css" />

<!-- CSS media query within a stylesheet -->
<style>
@media (max-width: 600px) {
  .facet_sidebar {
    display: none;
  }
}
</style>
```

**注意：所有的media query css都会加载，只有符合条的会被解析**

#### 5. 标准语法

```ruby
media_query_list: <media_query> [, <media_query> ]*
media_query: [[only | not]? <media_type> [ and <expression> ]*]
  | <expression> [ and <expression> ]*
expression: ( <media_feature> [: <value>]? )
media_type: all | aural | braille | handheld | print |
  projection | screen | tty | tv | embossed
media_feature: width | min-width | max-width
  | height | min-height | max-height
  | device-width | min-device-width | max-device-width
  | device-height | min-device-height | max-device-height
  | aspect-ratio | min-aspect-ratio | max-aspect-ratio
  | device-aspect-ratio | min-device-aspect-ratio | max-device-aspect-ratio
  | color | min-color | max-color
  | color-index | min-color-index | max-color-index
  | monochrome | min-monochrome | max-monochrome
  | resolution | min-resolution | max-resolution
  | scan | grid
```

#### 6. 逻辑操作符

- and 同编程语言里的and
- not 同编程语言里的not

**逗号** ：    当逗号两边的条件有一个为真都为真， 同编程语言里的or

### Example

#### 1. 提供一组目前的适配移动端屏幕的Media Queries

> 根据不同的手机屏幕,设置基于html元素的字体大小,利用rem的方式实现移动端屏幕的适配
>
> (注:这套适配方案是按照640的屏幕,获得的实际大小除以40,如获得的字体大小为40px,那么转换为rem就是1rem)

```css
@media only screen and (max-width: 321px) {
    html {
        font-size: 20px;
    }
}
@media only screen and (min-width: 321px) and (max-width: 360px) {
    html {
        font-size: 22.5px;
    }
}
@media only screen and (min-width: 361px) and (max-width: 375px) {
    html {
        font-size: 23.4px;
    }
}
@media only screen and (min-width: 376px) and (max-width: 414px) {
    html {
        font-size: 25.8px;
    }
}

@media only screen and (min-width: 415px) and (max-width: 479px) {
    html {
        font-size: 27px;
    }
}
@media only screen and (min-width: 480px) {
    html {
        font-size: 30px;
    }
}
@media only screen and (min-width: 768px) {
    html {
        font-size: 32px;
    }
}
```

## 2 响应式设计中的 `em/rem`

`rem`是指：**根元素**（root element，html）的字体大小，

`em`是指：**父元素**的字体大小。

> **注:**    可以引入 CSS 预处理工具（Sass、LESS 、Stylus等）自动计算 rem 值。


# 七 CSS散装知识点

> -  盒子模型 `box-size`
>
> -  CSS `BFC`
>
> -  使用外部字体`@Font-Face`
>
> -  禁用输入法`（chrome、opera、Safari尚未支持）`
>
> -  高度塌陷问题
>
> -  `margin-top`失效问题
>
> -  `css overflow` 隐藏滚动条
>
> -  `base64` 格式
>
> -  CSS 文本换行总结


## 1 盒子模型

**定义：**`box-sizing`  允许您以特定的方式定义匹配某个区域的特定元素 (W3C上的原话 )

**语法**：box-sizing: content-box | border-box

`content-box:` 宽度和高度分别应用到元素的内容框；在宽度和高度之外绘制元素的内边距和边框。

`border-box:` 为元素设定的宽度和高度决定了元素的边框盒。

就是说，为元素指定的任何内边距和边框都将在已设定的宽度和高度内进行绘制。

通过从已设定的宽度和高度分别减去边框和内边距才能得到内容的宽度和高度。

![](css-box-sizing.png)

**浏览器兼容性：**

`Internet Explorer`、`Opera` 以及 `Chrome` 支持 box-sizing 属性。

`Firefox` 支持替代的 -moz-box-sizing 属性。

**个人理解：**

content-box:

> padding值和border值不计算到内容（content）的宽度之内
>
> 即：一个盒子模型的总宽度=margin+padding+border+width;

border-box:

> content的值包含了padding值和border值
>
> 即：一个盒子的总宽度=margin+width.

## 2 CSS  BFC

> [!note] [原文传送门](https://www.jianshu.com/p/828023418450)

`block formatting context ` 块级格式化上下文

`BFC`  是一个独立的渲染区域，只有block-level box参与，它规定了内部的block-level box如何布局，并且与这个区域外部毫不相干。

`BFC`  就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素，反之也如此，包括浮动和外边距合并等等，有了这个特性我们布局的时候就不会出现意外情况了。

### 哪些元素会产生BFC

`display`属性为`block`、`list-item`、`table`的元素，会产生`BFC`  。（最常用的就是块级元素）

### 什么情况下会触发BFC

1. 设置了float属性，并且不为none
2. position属性为absolute或fixed
3. display为`inline-block`、`table-cell`、`table-caption`、`flex`、`inline-flex`
4. overflow 除了 visible 以外的值`（hidden，auto，scroll）`

### BFC元素所具有的特性

1. 在bfc中，盒子从顶端开始垂直地一个接一个的排列；
2. 盒子垂直方向的距离由margin决定，**属于同一个BFC的盒子的margin会重叠；**
3.  在bfc中，每一个盒子的左边缘会触碰到父容器的左边缘内部，也就是说在没有margin和padding时，父border的内边和子border的外边重叠；
4.  bfc的区域不会与浮动盒子产生交集，而是紧贴浮动边缘；
5. **如果父盒子没有设置高度，但子盒子中有浮动元素，那么在计算bfc的高度时， 会计算上浮动盒子的高度。**

#### 特性解读

##### 第二条解读

在常规文档流中，两个兄弟盒子之间的垂直距离是由他们的外边距所决定的，但不是他们的两个外边距之和，而是以较大的为准。

![](css-bfc-6.png)

```html
<div class="container">
    <div class="box"></div>
    <div class="box"></div>
</div> 
```

```css
.container {
    overflow: hidden;
    width: 100px;
    height: 100px;
    background-color: red;
}
.box1 {
    height: 20px;
    margin: 10px 0;
    background-color: green;
}
.box2 {
    height: 20px;
    margin: 20px 0;
    background-color: green;
}
```
 这里我门可以看到，第一个子盒子有上边距（不会发生margin穿透的问题）；两个子盒子的垂直距离为20px而不是30px，因为垂直外边距会折叠，间距以较大的为准。

 那么有没有方法让垂直外边距不折叠呢？答案是：有。特性的第5条就说了：bfc就是页面上的一个独立容器，容器里面的子元素不会影响外面元素，同样外面的元素不会影响到BFC内的元素。所以就让box1或box2再处于另一个BFC中就行了。

![](css-bfc-7.png)

```html
<div class="container">
    <div class="wrapper">
    	<div class="box1"></div>
    </div>
    <div class="box2"></div>
</div>
```

```css
.wrapper {
	overflow: hidden;
}
```

### BFC的主要用途

#### ① 清除元素内部浮动   

只要把父元素设置为 `BFC` 就可以清除子元素的浮动，最常见的就是给父元素添加`overflow：hidden`属性。

> [!note] 其实我有一段时间，不是很明白“清除子元素浮动”这句话。人家设置的好好的浮动，你干嘛给人家清除呢，那不就是不生效了么？
> 
> 其实清除浮动的意思不是清除你设置的元素的浮动属性，而是清除设置了浮动属性之后给别的元素带来的影响。举个栗子：

```HTML
<div class="father">
     <div class="son1"></div>
     <div class="son2"></div>
</div>
```

```css
.father {
    width: 150px;
    border: 1px solid red;
}

.son1, .son2 {
    width: 50px;
    height: 50px;
    background-color: pink;
}

.son2 {
    background-color: purple;
}
```

正常情况下的样子是上下块撑开父元素的高度

![](css-bfc-1.png)

当给两个子元素设置了float属性之后，子元素不再占据父元素的空间，此时父元素的高度就为0

![](css-bfc-2.png)

当设置父元素 `BFC` 后，此时就清除了子元素浮动带来的影响，什么影响呢，就是不撑开父元素的高度的影响，那么父元素的高度就是子元素的高度

> 为父元素添加  `overflow: hidden;`

![](css-bfc-3.png)

#### ② 解决外边距合并问题

我们知道，两个盒子在一起时，当有相邻的外边距时，会取外边距较大的那一个，也就是外边距会合并，但这种情况只发生在同属一个bfc的两个盒子中间，换言之，要想解决外边距合并问题，只要把两个盒子放在不同的`BFC`中即可。

#### ③ 制作右侧盒子自适应宽度的问题

**左侧盒子宽度固定，右侧宽度不固定**：当在父元素中只设定一个盒子浮动，另一个不浮动时，会造成第二个盒子在第一个盒子的下方，被覆盖掉一部分（但文字不会被覆盖）。

```css
.father2 {
    width: 200px;
    border: 1px solid red;
}

.s1 {
    width: 50px;
    height: 50px;
    background-color: pink;
    float: left;
}

.s2 {
    background-color: purple;
    height: 100px;
}
```

![](css-bfc-4.png)

给第2个元素设定  `BFC`

```css
.s2 {
    background-color: purple;
    height: 100px;
    overflow: auto;
    word-break: break-all;
}
```

![](css-bfc-5.png)

当增加第一个块的宽度时，第二个块的宽度会自动缩小，实现宽度自适应。

## 3 使用外部字体

先说自己遇到的问题：有个vue项目需要用给定的字体包，一直不能正确显示

刚开始的时候，字体包 是放在`public`下，并在`src`中的 `css文件`中使用绝对路径引用，像这样

```css
@font-face{
    font-family: 'MHei-PRC-Heavy';
    src: url("/public/fonts/MHeiPRC-Heavy.ttf") format('truetype');
}
```

![](font-face-1.png)

但一直报错

![](font-face-2.png)

后来的**解决办法**是 把`fonts文件`移到`asset`中，然后在引用时候使用`相对路径`

```css
@font-face{
    font-family: 'MHei-PRC-Heavy';
    src: url("../assets/fonts/MHeiPRC-Heavy.ttf") format('truetype');
}
```

另外，在`@font-face`中使用`font-weight`不生效（未解决）

下面是关于`@font-face`的内容  [MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@font-face)

### 语法

> 参考自 [font-face 详解](https://www.jianshu.com/p/2fb8ef458400)

```css
@font-face {
  [ font-family: <family-name>; ] ||
  [ src: <src>; ] ||
  [ unicode-range: <unicode-range>; ] ||
  [ font-variant: <font-variant>; ] ||
  [ font-feature-settings: <font-feature-settings>; ] ||
  [ font-variation-settings: <font-variation-settings>; ] ||
  [ font-stretch: <font-stretch>; ] ||
  [ font-weight: <font-weight>; ] ||
  [ font-style: <font-style>; ]
}where <family-name> = <string> | <custom-ident>+
```

```css
@font-face {
    font-family: <webFontName>;
    src: <source> [<format>][,<source> [<format>]]*;
    [font-weight: <weight>];
    [font-style: <style>];
}
```

- `webFontName`: 引入的自定义字体名称，将会为指定的元素添加 `font-family: webFontName`

- `source`: 字体路径

- `format`: 字体格式，用于帮助浏览器识别

  ```
  truetype  opentype  truetype-aat   embedded-opentype   svg …
  ```

- `weight`: 字体是否粗体

- `style`: 字体样式

### 格式

1. `truetype - ttf`
   - Windows 和 Mac 最常见字体
   - RAW 格式，不为任何网站优化
   - IE9+、Firefox3.5+、Chrome4+、Safari3+、Opera10+、iOS Mobile Safari4.2+
2. `opentype - otf`
   - 原始字体格式，内置在 truetype 基础之上
   - 提供更多功能
   - Firefox3.5+、Chrome4.0+、Safari3.1+、Opera10.0+、iOS Mobile Safari4.2+
3. `web-open-font-format - woff`
   - Web 字体最佳格式
   - 是一个开放的 truetype、opentype 压缩版本
   - 支持元数据包的分离
   - IE9+、Firefox3.5+、Chrome6+、Safari3.6+、Opera11.1+
4. `embedded-opentype - eot`
   - IE 专用字体
   - 可以从 truetype 创建此格式
   - IE4+
5. `svg - svg`
   - 基于 svg 渲染
   - Chrome4+、Safari3.1+、Opera10.0+、iOS Mobile Safari3.2+

### 使用

- 获取自定义字体的原始文件，可前往 [DaFont](https://www.dafont.com) 下载
- 在 [Font Squirrel](https://www.fontsquirrel.com/fontface/generator) 将字体转换为兼容各浏览器的 Web 字体
- 按上述兼容性语法指定 @font-face 中的字体
- 在指定元素中调用该自定义字体

### 使用注意

#### 1. 字体文件名简写

```css
@font-face {
　　font-family: 'YT';   /*声明一个名为yt的字体变量*/
　　src: url('YourWebFontName.eot')，local('YourFontName.eot');
}
// 然后在任何需要使用YT字体的地方就可以直接使用以下：
h1{font-family:YT;}
```

**提示：**

- `src`属性定义字体的下载地址，`local`表示本机地址，`url`表示网址（比如使用服务器上下载的字体）
- 如果在`src`上定义了多种字体，他们也是候选关系，如上段代码
- 如果修改了src中定义的字体或者顺序，一定要关闭浏览器再打开才能看到修改后的效果，刷新是看不到的
- 在`@font-face`规则中,font-family的作用是声明字体变量，与普通选择器中的font-family是不一样的。

#### 2. 使用服务端字体

在`@font-face`规则中，如果src属性定义的字体是一个`url路径`，则网页加载时会自动从服务器下载字体文件，再显示出来。

```css
@font-face {
    font-family: 'FZCYS';
    src: local('FZYaSongA-B-GB');
    src: url('YourWebFontName.eot');
}
```

#### 3. `@font-face`浏览器兼容

由于每种浏览器对@font-face的兼容性不同，不同的浏览器对字体的支持格式不同，这就意味着在`@font-face`中我们至少需要.woff,.eot两种格式字体，甚至还需要.svg等字体达到更多种浏览版本的支持。

- `.TTF`或`.OTF`，适用于Firefox 3.5、Safari、Opera；
- `.EOT`  适用于Internet Explorer 4.0+；
- `.SVG`  适用于Chrome、IPhone， 获取要使用字体的三种文件格式，确保能在主流浏览器中都能正常显示该字体。

使用CSS3的`@font-face`属性可以实现在网页中嵌入任意字体，但是IE只支持微软自有的EOT格式字体，而其他浏览器都不支持这一字体格式，其它浏览器可以设置TTF(TrueType)和OTF(OpenType)两种字体作为自定义字体

下面要解决的是如何获取到某种字体的这三种格式文件。一般地，我们在手头上（或在设计资源站点已经找到）有该字体的某种格式文件，最常见的是.TTF 文件，我们需要通过这种文件格式转换为其余两种文件格式。字体文件格式的转换可以通过网站[FontsQuirrel](https://www.fontsquirrel.com/tools/webfont-generator)或 onlinefontconverter提供的在线字体转换服务获取。获取到三种格式的字体文件后，

下一步要在样式表中声明该字体，并在需要的地方使用该字体。

```css
@font-face {
font-family: 'YourWebFontName';
src: url('YourWebFontName.eot'); /* IE9 Compat Modes */
src: url('YourWebFontName.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
     url('YourWebFontName.woff') format('woff'), /* Modern Browsers */
     url('YourWebFontName.ttf')  format('truetype'), /* Safari, Android, iOS */
     url('YourWebFontName.svg#YourWebFontName') format('svg'); /* Legacy iOS */
}
```

## 4 禁用输入法

### 1. CSS3   `ime-mode`

> IE浏览器从IE5开始就支持该属性，FireFox浏览器从FireFox3.0开始也支持该ime-mode属性。不过chrome、opera、Safari浏览器还没有开始支持该属性。

| 名称:     | ime-mode                                                    |
| :-------- | ----------------------------------------------------------- |
| 值:       | auto \| normal \| active \| inactive \| disabled \| inherit |
| 初始值:   | auto                                                        |
| 应用元素: | text fields（文本字段）                                     |
| 继承性:   | no                                                          |

- auto : 默认值，不影响当前输入法编辑器的状态 
- normal : 输入法编辑器的状态应该是normal，这个值可以用于用户样式表来覆盖页面的设置。IE浏览器不支持该属性 
- active : 输入法编辑器的状态初始时是激活的；输入将一直使用该输入法直到用户切换输入法。该属性在Linux操作系统下不支持 
- inactive : 输入法编辑器的状态初始时是非激活状态；除非用户激活输入法 
- disabled : 禁用输入法编辑器；该输入法编辑器也许不会被用户激活 

### 2. 替代方法

由于第一种方法不被广泛支持，因此另一种方法就是  **使用`readonly`禁止掉文本框弹出输入法**

```html
<input class="selectCarBtn" readonly="readonly" type="text" placeholder="输入车牌号">
```

## 5 高度塌陷

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>高度塌陷问题</title>
		 <style>
            .div-outer {
                border: solid 2px #223344;
            }
            .div1 {
                width: 200px;
                height: 100px;
                border: solid 2px #667788;
            }
            .div2 {
                width: 200px;
                height: 100px;
                border: solid 2px #667788;
            }
            .div3 {
                width: 200px;
                height: 100px;
                border: solid 2px #667788;
            }
        </style>
	</head>
	<body>
		<div class="div-outer">
            <div class="div1">div1</div>
            <div class="div2">div2</div>
            <div class="div3">div3</div>
        </div>
	</body>
</html>
```

页面效果如下：

![](css-gdtx-0.jpg)

在div-outer内部的三个div默认每个div会占一行，所以三个div会成列显示。

<hr>

现在对div1设置`float: left`，页面如图所示

```css
/*操作一*/
.div1{ float: left; }
```

![](css-gdtx-2.png)

可以看到div2和div3重合了

<hr>

对div1设置float: left属性，div1脱离文档流，但是仍占据位置，div2和div3重合是因为div2位置不变，div3也在div2的位置。但是发现这样理解是不对的，正确的理解是**div2被div1挤到了现在div3的位置**。

因为如果对div1设置`float: right`，页面如图所示

```css
/*操作二*/
.div1{ float: right; }
```

![](css-gdtx-1.png)

所以如果对div1设置float: left时，div2会被div1挤到现在div3的位置。

### 对css高度塌陷问题的理解

如果对div1，div2，div3都设置float: left，但是父元素div-outer没有设置宽度和高度，页面如图所示

![](css-gdtx-3.png)

如果没有设置父元素高度，父元素的高度默认是auto，会随子元素的高度而改变，如果对div1，div2，div3都设置float: left，那么此时父元素高度为0，这就是**浮动塌陷**。

**解决办法一：添加一个新的div**

设置该div为 `clear：both;`  的空div

**解决办法二：设置父元素属性**

对父元素设置属性overflow: hidden或overflow: auto，

设置overflow: hidden的意思是，overflow规定当内容溢出元素框时发生的事情

![](css-gdtx-4.png)

因为父元素没有指定高度，默认是auto，所以需要计算父元素包含的内容的高度，这样子元素浮动的高度就被计算进去，解决了浮动塌陷。

**解决办法三：设置父元素display:table**

**解决办法四：内墙法**

## 6 `margin-top`失效问题

### 现象：

当两个空的块级元素嵌套时，如果内部的块设置有margin-top属性，而且父元素没有下边解决方法所述的特征，那么内部块的margin-top属性会绑架父元素（即将margin-top传递凌驾给了父元素）。

> 就好比一个小兵，看到上级有漏洞，就假传圣旨，利用漏洞扩张自己的权利。只要设置父元素的border（栅栏）或者padding（隔离墙），就能管住这个调皮的下属。

```html
<div id="parrent">
    <div id="box1"></div>
</div>

<style>
#parrent{
	width:500px;
	height:300px;
	background:teal;
}
#box1{ 
	width:100px; 
	height:100px;
	background:aqua; 
	margin:20px;
}
</style>
```

![](css-margin-1.png)

**这个现象并不是bug，而是有理论依据的**：

> 《on having layout》

`hasLayout` 会影响一个盒子和其子孙的边距重叠。**根据规范，一个盒子如果没有上补白和上边框，那么它的上边距应该和其文档流中的第一个孩子元素的上边距重叠。**

但值得一提的是，只有在`Fire Fox`和`Chrome`下才会出现这种margin-top绑架父节点的情况，在IE6 IE7中均显示正常，但这恰恰说明了他们是不符合规范的，而FF合Chrome则是严格遵守规范的。

### 解决方法：

1. 设置父元素或者自身的display:inline-block;
2. **设置父元素的border**:1px aqua solid;(>0)
3. **设置父元素的padding**:1px;(>0)
4. 给父元素设置overflow:hidden;
5. 给父元素或者自身设置position:absolute;
6. 设置父元素非空，填充一定的内容。

## 7 `css overflow` 隐藏滚动条

```css
#fuchuang-3{
  width: 1080px;
  height: 1920px;
  transform-origin: left top;
  margin: 0;
  overflow: auto;
  ......
}
#fuchuang-3::-webkit-scrollbar{
  display: none;
}
```

## 8 `base64`格式

> [大佬文章传送门](https://www.cnblogs.com/Renyi-Fan/p/9588306.html)
>
> 图片转`base64`格式工具  **FeHelper**

### 8.1 Base64编码表

| 码值 | 字符 | 码值 | 字符 | 码值 | 字符 | 码值 | 字符 |
| ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- |
| 0    | A    | 16   | Q    | 32   | g    | 48   | w    |
| 1    | B    | 17   | R    | 33   | h    | 49   | x    |
| 2    | C    | 18   | S    | 34   | i    | 50   | y    |
| 3    | D    | 19   | T    | 35   | j    | 51   | z    |
| 4    | E    | 20   | U    | 36   | k    | 52   | 0    |
| 5    | F    | 21   | V    | 37   | l    | 53   | 1    |
| 6    | G    | 22   | W    | 38   | m    | 54   | 2    |
| 7    | H    | 23   | X    | 39   | n    | 55   | 3    |
| 8    | I    | 24   | Y    | 40   | o    | 56   | 4    |
| 9    | J    | 25   | Z    | 41   | p    | 57   | 5    |
| 10   | K    | 26   | a    | 42   | q    | 58   | 6    |
| 11   | L    | 27   | b    | 43   | r    | 59   | 7    |
| 12   | M    | 28   | c    | 44   | s    | 60   | 8    |
| 13   | N    | 29   | d    | 45   | t    | 61   | 9    |
| 14   | O    | 30   | e    | 46   | u    | 62   | +    |
| 15   | P    | 31   | f    | 47   | v    | 63   | /    |

**编码说明**

​		Base64编码要求把3个8位字节（`3*8=24`）转化为4个6位的字节（`4*6=24`），之后在6位的前面补两个0，形成8位一个字节的形式。 如果剩下的字符不足3个字节，则用0填充，输出字符使用'='，因此编码后输出的文本末尾可能会出现1或2个'='。

　　为了保证所输出的编码位可读字符，Base64制定了一个编码表，以便进行统一转换。编码表的大小为`2^6=64`，这也是Base64名称的由来。

### 8.2 base64 做图片src属性的地址

使用`base64`格式图片，这种方法可以在页面文件中嵌入图片，嵌入方法同引入外部图片

```html
<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4CAMAAAAOus 
bgAAAAeFBMVEUAwAD///+U5ZTc9twOww7G8MYwzDCH4==" alt=""/>
```

src或 url() 中有一大串编码。它把一些 8-bit 数据翻译成标准 ASCII 字符，网上有很多免费的base64 编码和解码的工具， 后面跟的一串代码就相当于链接地址。

### 8.3 Data URL scheme 支持的类型有哪些？

```
data:,文本数据 
data:text/plain,文本数据 
data:text/html,HTML代码 
data:text/html;base64,base64编码的HTML代码 
data:text/css,CSS代码 
data:text/css;base64,base64编码的CSS代码 
data:text/JavaScript,Javascript代码 
data:text/javascript;base64,base64编码的Javascript代码 
data:image/gif;base64,base64编码的gif图片数据 
data:image/png;base64,base64编码的png图片数据 
data:image/jpeg;base64,base64编码的jpeg图片数据 
data:image/x-icon;base64,base64编码的icon图片数据
```

### 8.4 将图片转化为base64格式的方法？

a、利用canvas 将图片转化为base64 编码格式

```js
dataURL = canvas.toDataURL("image/jpeg");
```

b、利用 html5 的 FileReader 将图片转化base64格式 FileReader 是H5提供的一个处理文件的API，

```js
var reader=new FileReader();  
reader.readAsBinaryString(file);  
```



## 9 CSS 文本换行总结

### 9.1 文本超出隐藏

实现这个效果需要用到css的 `text-overflow` 属性，其表示文本溢出时发生的事情。

它有三个属性值，分别是clip(修剪文本)、ellipsis(省略号代替)、*string*(指定字符串代替)。

```html
<div class="context">sdsdsdsadsadsadas</div>

<style>
.context{
	width:50px; //div的宽度必须是固定的
	overflow:hidden;
	text-overflow:ellipsis;
	white-space: nowrap;//文本不进行换行，默认下宽度不够就会换行。
}
</style>
```

 **接下来重点说一说多行文本溢出显示省略号，实现方法如下：**

```css
display: -webkit-box;
-webkit-box-orient: vertical;
-webkit-line-clamp: 3;
overflow: hidden;
```

效果如图：

```
aaaaaaaaaaaaaa
aaaaaaaaaaaaaa
aaaaaaaaaaa...
```

**适用范围：**

因使用了WebKit的CSS扩展属性，该方法适用于WebKit浏览器及移动端；

> 注意：
>
> - `-webkit-line-clamp`用来限制在一个块元素显示的文本的行数。 为了实现该效果，它需要组合其他的WebKit属性。常见结合属性：
> - `display: -webkit-box;` 必须结合的属性 ，将对象作为弹性伸缩盒子模型显示 。
> - `-webkit-box-orient` 必须结合的属性 ，设置或检索伸缩盒对象的子元素的排列方式 。

### 9.2 文本换行（简要概括）

#### ①文字不换行（ `white-space` ）

```css
white-space: nowrap;
```

- normal：连续的空白符会被合并，换行符会被当作空白符处理。填充line盒子时，必要的话会换行。
- nowrap：和normal一样，连续的空白符会被合并。但文本内的换行无效。
- pre：连续的空白符会被保留。在遇到换行符或者`<br>`元素时才会换行。
- pre-wrap：连续的空白符会被保留。在遇到换行符或者`<br>`元素，或者需要为了填充line盒子时才会换行。
- pre-line：连续的空白符会被合并。在遇到换行符或者`<br>`元素，或者需要为了填充line盒子时会换行。

| 值       | 描述                                                         |
| -------- | ------------------------------------------------------------ |
| normal   | 默认。空白会被浏览器忽略。                                   |
| pre      | 空白会被浏览器保留。其行为方式类似 HTML 中的 `<pre>` 标签。  |
| nowrap   | 文本不会换行，文本会在在同一行上继续，直到遇到 `<br>` 标签为止。 |
| pre-wrap | 保留空白符序列，但是正常地进行换行。                         |
| pre-line | 合并空白符序列，但是保留换行符。                             |
| inherit  | 规定应该从父元素继承 white-space 属性的值。                  |

#### ②允许长单词换行 （ `word-wrap`  ||  `overflow-wrap` ）

```css
word-wrap: break-word;
```

| 值         | 描述                                         |
| ---------- | -------------------------------------------- |
| normal     | 只在允许的断字点换行（浏览器保持默认处理）。 |
| break-word | 在长单词或 URL 地址内部进行换行。            |

####  ③换行不截断单词（ `word-break` ）

> 先介绍一个缩写CJK：中日韩统一表意文字

```css
word-break: break-all;
```

| 值        | 描述                                                         |
| --------- | ------------------------------------------------------------ |
| normal    | 使用浏览器默认的换行规则。                                   |
| break-all | 允许在单词内换行  \|\|对于非CJK文本，可在任意字符间断行      |
| keep-all  | 只能在半角空格或连字符处换行。\|\|  CJK文本不断行，非CJK文本表现同normal一样 |

####  ④换行时使用连字符连接单词（ `hyphens` --- 实验中）

此属性告诉浏览器在换行时使用连字符连接单词

属性值：none | manual | auto

####  ⑤单行文字超出显示省略号

```css
overflow: hidden;
text-overflow: ellipsis;
white-space: nowrap;
```

#### ⑥多行文字超出显示省略号

```css
overflow: hidden;
text-overflow: ellipsis;
display: -webkit-box;
-webkit-line-clamp: 3;
-webkit-box-orient: vertical;
```



## 10 CSS `z-index` 不生效

`z-index` 属性是用来调整元素及子元素在 z 轴上的顺序

z-index 的**默认值为 auto**，可以设置正整数，也可以设置为负整数。

注意：**只有定位的元素（即`position`属性值不是`static`的元素）的`z-index才会起作用。`**

**z-index不生效的情况**：

- 在用 `z-index` 的时候，该元素没有定位（非static）
- 在有定位的情况下，该元素的 `z-index` 没有生效，是因为该元素的子元素后来居上，盖住了该元素，解决方式：将盖住该元素的子元素的 `z-index` 设置为负数，而该元素不设 `z-index` 属性
