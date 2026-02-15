---
title: Vue入门必修课
description: 记录往期在Vue框架上的学习积累。
urlname: start-point-of-vue
date: 2020-11-10
tags:
  - Vue
  - 前端框架
  - Web开发
categories:
  - 前端开发
draft:
---
# CONTENT OUTLINE

1. `Vue-Router` 的两种模式
2. Vue 路由Router进阶
3. Vue-Swiper 坑点
4. Vue Socket
5. Vue 响应式原理
6. Vue.config.js 注解
7. 带你用vue撸后台系列
8. Vue 踩过的坑点


# 一 `Vue-Router` 的两种模式

> [!note] 转载 原文[传送门](https://www.jianshu.com/p/e92e706f3455)
>
> vue-router [官方文档](https://router.vuejs.org/zh/guide/essentials/history-mode.html)

为了构建 **SPA（单页面应用）**，需要引入前端路由系统，这就是 Vue-Router 存在的意义。

前端路由的核心，就在于 —— **改变视图的同时不会向后端发出请求**。

## 1 Hash 模式（默认）

**hash模式—— 即地址栏 URL 中的 # 符号**

<span style="color:red;">hash模式的原理是 onhashchange 事件，可以通过 window 对象来监听该事件。</span>

这里的 hash 就是指 url 尾巴后的 # 号以及后面的字符。

这里的 `#` 和 `css` 里的 `#` 是一个意思。`hash` 也 称作 锚点，本身是用来做页面定位的，她可以使对应 `id` 的元素显示在可视区域内。

比如这个 URL：`http://www.abc.com/#/hello`，`hash` 的值为 `#/hello`。**它的特点在于：`hash` 虽然出现在 URL 中，但不会被包括在 HTTP 请求中，对后端完全没有影响，因此改变 hash 不会重新加载页面。**

> 由于 hash 值变化不会导致浏览器向服务器发出请求，而且 hash 改变会触发 `hashchange` 事件，浏览器的进后退也能对其进行控制，所以人们在 html5 的 history 出现前，基本都是使用 hash 来实现前端路由的。

#### 使用到的api

```csharp
window.location.hash = 'qq'  // 设置 url 的 hash，会在当前url后加上 '#qq'

var hash = window.location.hash // '#qq' 

window.addEventListener('hashchange', function(){ 
	// 监听hash变化，点击浏览器的前进后退会触发
})
```

## 2 History 模式

**利用了 HTML5 History Interface 中新增的 pushState() 和 replaceState() 方法。**

> [!question] 已经有 hash 模式了，而且 hash 能兼容到IE8， history 只能兼容到 IE10，为什么还要搞个 history 呢？
>

首先，hash 本来是拿来做页面定位的，如果拿来做路由的话，原来的锚点功能就不能用了。

其次，hash 的传参是基于 url 的，如果要传递复杂的数据，会有体积的限制，而 history 模式不仅可以在url里放参数，还可以将数据存放在一个特定的对象中。

### 2.1 相关api

**window.history.pushState(state, title, url)**

- state：需要保存的数据，这个数据在触发`popstate`事件时，可以在event.state里获取

- title：标题，基本没用，一般传 null

- url：设定新的历史记录的 url。新的 url 与当前 url 的 origin 必须是一样的，否则会抛出错误。url可以是绝对路径，也可以是相对路径。

> 例如

```csharp
 当前url是 https://www.baidu.com/a/

执行history.pushState(null, null, './qq/')，则变成 https://www.baidu.com/a/qq/
执行history.pushState(null, null, '/qq/')，则变成 https://www.baidu.com/qq/
```

**window.history.replaceState(state, title, url)**

与 `pushState` 基本相同，但它是修改当前历史记录，而 `pushState` 是创建新的历史记录

```csharp
window.addEventListener("popstate", function(){
  // 监听浏览器前进后退事件，pushState 与 replaceState 方法不会触发       
 });
```

```JavaScript
window.history.back()            // 后退

window.history.forward()      // 前进

window.history.go(1)              // 前进一步，-2为后退两步，

window.history.length           // 可以查看当前历史堆栈中页面的数量
```

### 2.2 使用说明

`history` 模式改变 url 的方式会导致浏览器向服务器发送请求，这不是我们想看到的

**我们需要在服务器端做处理：如果匹配不到任何静态资源，则应该始终返回同一个 html 页面**

**hash 模式下**，仅 hash 符号之前的内容会被包含在请求中，如 `http://www.abc.com`，因此对于后端来说，即使没有做到对路由的全覆盖，也不会返回 404 错误

**history 模式下**，前端的 URL 必须和实际向后端发起请求的 URL 一致，如 `http://www.abc.com/book/id`。如果后端缺少对 /book/id 的路由处理，将返回 404 错误。

> vue-router官网里如此描述：**“不过这种模式要玩好，还需要后台配置支持……所以呢，你要在服务端增加一个覆盖所有情况的候选资源：如果 URL 匹配不到任何静态资源，则应该返回同一个 index.html 页面，这个页面就是你 app 依赖的页面。”**

可以说，`hash 模式`和 `history 模式`都属于浏览器自身的特性，Vue-Router 只是利用了这两个特性（通过调用浏览器提供的接口）来实现前端路由。

### 2.3 使用场景

- 一般场景下，`hash` 和 `history` 都可以，除非你更在意颜值，`#` 符号夹杂在 `URL` 里看起来确实有些不太美观

- 对于一般的 **Vue + Vue-Router + Webpack + XXX** 形式的 Web 开发场景，用 `history` 模式即可，只需在后端（`Apache` 或 `Nginx`）进行简单的路由配置，同时搭配前端路由的 `404 页面`支持。

# 二 Vue 路由Router进阶


> [!note] 总结接触到的有关于 `Vue-Router` 的知识点，基于最基本的使用之上的进阶内容。
>
> [官方文档传送](https://router.vuejs.org/zh/installation.html)
>

## 1 在新窗口打开页面

**方法一：**`<router-link>`标签实现新窗口打开

```vue
<router-link target="_blank" :to="{path:'/home',query:{id:'1'}}">
	新页面打开home页
</router-link>
```

**方法二**：编程式导航：

```js
print_schedule() {
    let id = this.id;
    const { href } = this.$router.resolve({
        name: `print_schedule`,
        params: {
            id: id
        }
    });
    window.open(href, "_blank");
}
```

## 2 [导航守卫](https://router.vuejs.org/zh/guide/advanced/navigation-guards.html)

正如其名，`vue-router` 提供的导航守卫主要用来通过跳转或取消的方式守卫导航。有多种机会植入路由导航过程中：全局的, 单个路由独享的，或者组件级的。

记住**参数或查询的改变并不会触发进入/离开的导航守卫**。你可以通过[观察 `$route` 对象](https://router.vuejs.org/zh/guide/essentials/dynamic-matching.html#响应路由参数的变化)来应对这些变化，或使用 `beforeRouteUpdate` 的组件内守卫。

### 2.1 全局前置守卫

你可以使用 `router.beforeEach` 注册一个全局前置守卫：

```js
const router = new VueRouter({ ... })

router.beforeEach((to, from, next) => {
  // ...
})
```

当一个导航触发时，全局前置守卫按照创建顺序调用。守卫是异步解析执行，此时导航在所有守卫 resolve 完之前一直处于 **等待中**。

每个守卫方法接收三个参数：

- **`to: Route`**: 即将要进入的目标 [路由对象](https://router.vuejs.org/zh/api/#路由对象)
- **`from: Route`**: 当前导航正要离开的路由
- **`next: Function`**: 一定要调用该方法来 **resolve** 这个钩子。执行效果依赖 `next` 方法的调用参数。
  - **`next()`**: 进行管道中的下一个钩子。如果全部钩子执行完了，则导航的状态就是 **confirmed** (确认的)。
  - **`next(false)`**: 中断当前的导航。如果浏览器的 URL 改变了 (可能是用户手动或者浏览器后退按钮)，那么 URL 地址会重置到 `from` 路由对应的地址。
  - **`next('/')` 或者 `next({ path: '/' })`**: 跳转到一个不同的地址。当前的导航被中断，然后进行一个新的导航。你可以向 `next` 传递任意位置对象，且允许设置诸如 `replace: true`、`name: 'home'` 之类的选项以及任何用在 [`router-link` 的 `to` prop](https://router.vuejs.org/zh/api/#to) 或 [`router.push`](https://router.vuejs.org/zh/api/#router-push) 中的选项。
  - **`next(error)`**: (2.4.0+) 如果传入 `next` 的参数是一个 `Error` 实例，则导航会被终止且该错误会被传递给 [`router.onError()`](https://router.vuejs.org/zh/api/#router-onerror) 注册过的回调。

确保 `next` 函数在任何给定的导航守卫中都被严格调用一次。它可以出现多于一次，但是只能在所有的逻辑路径都不重叠的情况下，否则钩子永远都不会被解析或报错。

这里有一个在用户未能验证身份时重定向到 `/login` 的示例：

```js
// BAD
router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && !isAuthenticated) next({ name: 'Login' })
  // 如果用户未能验证身份，则 `next` 会被调用两次
  next()
})
// GOOD
router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && !isAuthenticated) next({ name: 'Login' })
  else next()
})
```

#### 添加守卫之后的报错

![](bug-router.png)

> 原因：`vue-router` 路由版本更新产生的问题,导致路由跳转失败抛出该错误，但并不影响程序功能

**解决方案一：**

使用编程式导航跳转时，每次使用，后面都跟上.catch方法，捕获错误信息

```js
this.$router.push('/location').catch(err => ())
```

**解决方案二：**

全局解决：替换路由的 `Push` 和 `replace` 方法，放在 `src/router/index.js` 中：

```js
import Router from 'vue-router'

const originalPush = Router.prototype.push
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}
```

# 三 Vue-Swiper 坑点

> [!note] 在`vue`中使用`vue-awesome-swiper`的时候，踩坑无数，快爬不起来要哭了
>
> 算是小问题却搞一下午，心态都崩了呀！

## 1 关于Swiper

> [!tip] [Swiper官网](https://www.swiper.com.cn/)

> [!example] 
> **Swiper常用于移动端网站的内容触摸滑动**
>
> **Swiper**是纯javascript打造的滑动特效插件，面向手机、平板电脑等移动终端。
>
> **Swiper**能实现触屏焦点图、触屏Tab切换、触屏多图切换等常用效果。
>
> **Swiper**开源、免费、稳定、使用简单、功能强大，是架构移动终端网站的重要选择！

## 2 Vue-awesome-swiper

> [!note] [github传送门/走好](https://github.com/surmon-china/vue-awesome-swiper)

### Install

```bash
npm install swiper vue-awesome-swiper --save
# or
yarn add swiper vue-awesome-swiper
```

### Global Registration

```bash
import Vue from 'vue'
import VueAwesomeSwiper from 'vue-awesome-swiper'

// import style
import 'swiper/css/swiper.css'
// If you use Swiper 6.0.0 or higher
import 'swiper/swiper-bundle.css'

Vue.use(VueAwesomeSwiper, /* { default options with global component } */)
```

### Local Registration

```js
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
// If you use Swiper 6.0.0 or higher
import 'swiper/swiper-bundle.css'

export default {
  components: {
    Swiper,
    SwiperSlide
  },
  directives: {
    swiper: directive
  }
}
```

### CDN

```js
<link rel="stylesheet" href="path/to/swiper.css"/>
<script type="text/javascript" src="path/to/swiper.js"></script>
<script type="text/javascript" src="path/to/vue.min.js"></script>
<script type="text/javascript" src="path/to/dist/vue-awesome-swiper.js"></script>
<script type="text/javascript">
  Vue.use(window.VueAwesomeSwiper)
</script>
```

------

### Difference with usage

**Directive and the only difference in the use of the Component:**

- `component` find Swiper instance by [`ref attribute`](https://vuejs.org/v2/guide/components-edge-cases.html#Accessing-Child-Component-Instances-amp-Child-Elements).
- `directive` find Swiper instance by [`directive arg`](https://vuejs.org/v2/guide/custom-directive.html#Dynamic-Directive-Arguments).

Other configurations, events are the same.

The effect of the two ways and the difference in the applicable environment [is here](https://github.com/surmon-china/surmon-china.github.io/blob/source/projects/vue-awesome-swiper/nuxt/).

### Component

```js
<template>
  <swiper ref="mySwiper" :options="swiperOptions">
    <swiper-slide>Slide 1</swiper-slide>
    <swiper-slide>Slide 2</swiper-slide>
    <swiper-slide>Slide 3</swiper-slide>
    <swiper-slide>Slide 4</swiper-slide>
    <swiper-slide>Slide 5</swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
  export default {
    name: 'carrousel',
    data() {
      return {
        swiperOptions: {
          pagination: {
            el: '.swiper-pagination'
          },
          // Some Swiper option/callback...
        }
      }
    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.$swiper
      }
    },
    mounted() {
      console.log('Current Swiper instance object', this.swiper)
      this.swiper.slideTo(3, 1000, false)
    }
  }
</script>
```

### Directive

```js
<template>
  <div v-swiper:mySwiper="swiperOption">
    <div class="swiper-wrapper">
      <div class="swiper-slide" :key="banner" v-for="banner in banners">
        <img :src="banner">
      </div>
    </div>
    <div class="swiper-pagination"></div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        banners: [ '/1.jpg', '/2.jpg', '/3.jpg' ],
        swiperOption: {
          pagination: {
            el: '.swiper-pagination'
          },
          // ...
        }
      }
    },
    mounted() {
      console.log('Current Swiper instance object', this.mySwiper)
      this.mySwiper.slideTo(3, 1000, false)
    }
  }
</script>
```

------

### Swiper component API

```js
<!-- All events/props support camelCase or kebab-case. -->
<swiper
  :options="swiperOptionsObject"
  :auto-update="true"
  :auto-destroy="true"
  :delete-instance-on-destroy="true"
  :cleanup-styles-on-destroy="true"
  @ready="handleSwiperReadied"
  @click-slide="handleClickSlide"
/>

<!-- vue-awesome-swiper converts all Swiper events into component/directive events, e.g.: -->
<swiper
  @slide-change-transition-start="onSwiperSlideChangeTransitionStart"
  @slideChangeTransitionStart="onSwiperSlideChangeTransitionStart"
  @slideChangeTransitionEnd="..."
  @transitionStart="..."
  ...
/>
interface IProps {
  // Auto update swiper when vue component `updated`
  autoUpdate?: boolean // default: true
  // Auto destroy swiper when vue component 'beforeDestroy'
  autoDestroy?: boolean // default: true

  // swiper.destroy's params
  // swiper.destroy(deleteInstanceOnDestroy, cleanupStylesOnDestroy)
  deleteInstanceOnDestroy?: boolean // default: true
  cleanupStylesOnDestroy?: boolean // default: true
}

// `@ready` event will emit when the Swiper instance mounted
function handleSwiperReadied(swiper: Swiper) {
  console.log('Swiper was munted!', swiper)
}

// `@click-slide` event has special treatment for Swiper's loop mode, which is still available in loop mode
function handleClickSlide(index: number, reallyIndex: number | null) {
  console.log('Click slide!', index, reallyIndex)
}
```

### Swiper directive API

Based on the exact same as the component API.

In the `directive` mode, the Swiper instance will be mounted in the parent's component context use the default name`$swiper`. In order to implement multiple swipers in a context, the `directive` has an additional name called `instanceName` API, through this API, you can easily control the name of each swiper mount context.

```js
<div v-swiper="swiperOptionsObject" />
<div v-swiper:secondSwiper="swiperOptionsObject" />
<div v-swiper:[dynamicSwiperName]="swiperOptionsObject" />
<div v-swiper="swiperOptionsObject" instance-name="fourthSwiper" />
export dafault {
  data() {
    return {
      dynamicSwiperName: 'thirdSwiper'
    }
  },
  mounted() {
    console.log('Swiper instances:', this.$swiper, this.secondSwiper, this.thirdSwiper, this.fourthSwiper)
  }
}
```

### Swiper API

Swiper's API and configuration can be used.

- [EN Swiper events](https://swiperjs.com/api/#events)
- [EN Swiper documentation](https://swiperjs.com/api/)
- [ZH Swiper documentation](https://www.swiper.com.cn/api/index.html)

## 3 巨坑盘点（让我想报复`SOCIAL`）

### 3.1 Swiper滚动失效

对于这个问题，我的理解是：`swiper`使用版本为 `swiper@6.2.0`，应该是`vue-awesome-swiper`和高版本`swiper`兼容性很差很差

**解决方案：**

① 卸载已安装的`swiper`：`npm uninstall swiper  --save`

② 安装低版本`swiper`，版本号可以去[npmjs](https://www.npmjs.com/package/swiper/v/6.2.0)搜

③注意到`swiper6`的样式文件不同，需要按需引入，引入方式同上面的官方引入

### 3.2 Swiper 失效

> [!BUG] vue-awesome-swiper使用自动轮播和循环轮播不生效（loop和autoplay）

**方法一：**

在项目中使用vue-awesome-swiper，如果loop和autoplay总是出现各种问题，第一次加载的时候，轮播是不动的，需要重新加载一下swiper才会轮播。

解决方案:

```js
//轮播设置
swiperOption: {
　　direction: 'vertical',
　　observer:true,//修改swiper自己或子元素时，自动初始化swiper 
　　observeParents:true,//修改swiper的父元素时，自动初始化swiper 
　　loop:true,
　　autoplay: {
　　　　delay: 2000,
　　disableOnInteraction: false
　　}
}
```

需要添加上两个属性，这样达到一个初始化swiper的目的。

```
observer:true,//修改swiper自己或子元素时，自动初始化swiper 
observeParents:true,//修改swiper的父元素时，自动初始化swiper 
```

**方法二**：

如果说轮播数据来自于异步请求，再循环展示，有可能出现轮播失效的问题。

**原因是**循环还没有完的时候swiper组件运行冲突出错导致的，在swiper组件上对数据价格v-if就可以解决。代码如下： 

![](bg202009055.png)

![](bg202009056.png)

### 3.3 swiper手动滑动之后自动轮播失效的解决方法

```js
<script> 
var mySwiper = new Swiper('.swiper-container',{
  autoplay: {
    disableOnInteraction: false,
    delay:2000,
  },
})
</script>
```

用户操作swiper之后，是否禁止autoplay。默认为true：停止。

如果设置为false，用户操作swiper之后自动切换不会停止，每次都会重新启动autoplay。

操作包括触碰，拖动，点击pagination等。

**若不生效**，问题应该依然和`swiper版本`有关。

### 3.4 swiper4 在页面切换时的 callbacks 回调

预期效果：当页面滚动动画结束执行回调函数

```js
var swiper = new Swiper('.swiper-container', {
  on:{
    slideChangeTransitionEnd: function () {
        console.log(this.realIndex);
　　　　if (this.realIndex == 0){
        $('.country-name').text("加拿大")
      } else if (this.realIndex == 1){
        $('.country-name').text("澳大利亚")
      } 
    }
  },
});
```

> [!tip] [swiper 官网传送，不谢](https://www.swiper.com.cn/api/event/92.html)

Event 事件中包含相应的回调，如：

```js
slideChangeTransitionStart(swiper)	// swiper从当前slide开始过渡到另一个slide时执行。
slideChangeTransitionEnd(swiper)	// 回调函数，swiper从一个slide过渡到另一个slide结束时执行
```

# 四 Vue Socket

> [!note] 最近接手了一个小项目，数据通信选型使用`Socket`实现，因此，恶补`WebScoket`的概念和`vue-socket-io`的使用

## 1 `WebSocket` 基础

> [!tip] 这一部分还是廖雪峰老师讲的好，附上[传送门](http://www.ruanyifeng.com/blog/2017/05/websocket.html)
>
> 当然，我个人还是要记录一下，可能是`CTRL-C/V`，但权当再加深印象


###  1.1 HTTP 协议和 WebSocket 的区别？它能带来什么好处？

答案很简单，因为 HTTP 协议有一个缺陷：通信只能由客户端发起。

这种单向请求的特点，注定了如果服务器有连续的状态变化，客户端要获知就非常麻烦。我们只能使用["轮询"](https://www.pubnub.com/blog/2014-12-01-http-long-polling/)：每隔一段时候，就发出一个询问，了解服务器有没有新的信息。最典型的场景就是聊天室。

轮询的效率低，非常浪费资源（因为必须不停连接，或者 HTTP 连接始终打开）。因此，工程师们一直在思考，有没有更好的方法。WebSocket 就是这样发明的。

WebSocket 协议在2008年诞生，2011年成为国际标准。所有浏览器都已经支持了。

**它的最大特点就是**，服务器可以主动向客户端推送信息，客户端也可以主动向服务器发送信息，是真正的双向平等对话，属于[服务器推送技术](https://en.wikipedia.org/wiki/Push_technology)的一种。

![](bg202009051.png)

**其他特点包括：**

（1）建立在 TCP 协议之上，服务器端的实现比较容易。

（2）与 HTTP 协议有着良好的兼容性。默认端口也是80和443，并且握手阶段采用 HTTP 协议，因此握手时不容易屏蔽，能通过各种 HTTP 代理服务器。

（3）数据格式比较轻量，性能开销小，通信高效。

（4）可以发送文本，也可以发送二进制数据。

（5）没有同源限制，客户端可以与任意服务器通信。

（6）协议标识符是`ws`（如果加密，则为`wss`），服务器网址就是 URL。

```markup
ws://example.com:80/some/path
```

![](bg202009052.jpg)

### 1.2 客户端的简单示例

WebSocket 的用法相当简单。

下面是一个网页脚本的例子（点击[这里](http://jsbin.com/muqamiqimu/edit?js,console)看运行结果），基本上一眼就能明白。

```javascript
var ws = new WebSocket("wss://echo.websocket.org");

ws.onopen = function(evt) { 
  console.log("Connection open ..."); 
  ws.send("Hello WebSockets!");
};

ws.onmessage = function(evt) {
  console.log( "Received Message: " + evt.data);
  ws.close();
};

ws.onclose = function(evt) {
  console.log("Connection closed.");
};      
```

### 1.3 客户端的 API

WebSocket 客户端的 API 如下。

#### 1.3.1 WebSocket 构造函数

WebSocket 对象作为一个构造函数，用于新建 WebSocket 实例。

```javascript
var ws = new WebSocket('ws://localhost:8080');
```

执行上面语句之后，客户端就会与服务器进行连接。

实例对象的所有属性和方法清单，参见[这里](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket)。

#### 1.3.2 webSocket.readyState

`readyState`属性返回实例对象的当前状态，共有四种。

> - CONNECTING：值为0，表示正在连接。
> - OPEN：值为1，表示连接成功，可以通信了。
> - CLOSING：值为2，表示连接正在关闭。
> - CLOSED：值为3，表示连接已经关闭，或者打开连接失败。

下面是一个示例。

```javascript
switch (ws.readyState) {
  case WebSocket.CONNECTING:
    // do something
    break;
  case WebSocket.OPEN:
    // do something
    break;
  case WebSocket.CLOSING:
    // do something
    break;
  case WebSocket.CLOSED:
    // do something
    break;
  default:
    // this never happens
    break;
}
```

#### 1.3.3 webSocket.onopen

实例对象的`onopen`属性，用于指定连接成功后的回调函数。

```javascript
ws.onopen = function () {
  ws.send('Hello Server!');
}
```

如果要指定多个回调函数，可以使用`addEventListener`方法。

```javascript
ws.addEventListener('open', function (event) {
  ws.send('Hello Server!');
});
```

#### 1.3.4 webSocket.onclose

实例对象的`onclose`属性，用于指定连接关闭后的回调函数。

```javascript
ws.onclose = function(event) {
  var code = event.code;
  var reason = event.reason;
  var wasClean = event.wasClean;
  // handle close event
};

ws.addEventListener("close", function(event) {
  var code = event.code;
  var reason = event.reason;
  var wasClean = event.wasClean;
  // handle close event
});
```

#### 1.3.5 webSocket.onmessage

实例对象的`onmessage`属性，用于指定收到服务器数据后的回调函数。

```javascript
ws.onmessage = function(event) {
  var data = event.data;
  // 处理数据
};

ws.addEventListener("message", function(event) {
  var data = event.data;
  // 处理数据
});
```

注意，服务器数据可能是文本，也可能是二进制数据（`blob`对象或`Arraybuffer`对象）。

```javascript
ws.onmessage = function(event){
  if(typeof event.data === String) {
    console.log("Received data string");
  }

  if(event.data instanceof ArrayBuffer){
    var buffer = event.data;
    console.log("Received arraybuffer");
  }
}
```

除了动态判断收到的数据类型，也可以使用`binaryType`属性，显式指定收到的二进制数据类型。

```javascript
// 收到的是 blob 数据
ws.binaryType = "blob";
ws.onmessage = function(e) {
  console.log(e.data.size);
};

// 收到的是 ArrayBuffer 数据
ws.binaryType = "arraybuffer";
ws.onmessage = function(e) {
  console.log(e.data.byteLength);
};
```

#### 1.3.6 webSocket.send()

实例对象的`send()`方法用于向服务器发送数据。

发送文本的例子。

```javascript
ws.send('your message');
```

发送 Blob 对象的例子。

```javascript
var file = document
  .querySelector('input[type="file"]')
  .files[0];
ws.send(file);
```

发送 ArrayBuffer 对象的例子。

```javascript
// Sending canvas ImageData as ArrayBuffer
var img = canvas_context.getImageData(0, 0, 400, 320);
var binary = new Uint8Array(img.data.length);
for (var i = 0; i < img.data.length; i++) {
  binary[i] = img.data[i];
}
ws.send(binary.buffer);
```

#### 1.3.7 webSocket.bufferedAmount

实例对象的`bufferedAmount`属性，表示还有多少字节的二进制数据没有发送出去。它可以用来判断发送是否结束。

```javascript
var data = new ArrayBuffer(10000000);
socket.send(data);

if (socket.bufferedAmount === 0) {
  // 发送完毕
} else {
  // 发送还没结束
}
```

#### 1.3.8 webSocket.onerror

实例对象的`onerror`属性，用于指定报错时的回调函数。

```javascript
socket.onerror = function(event) {
  // handle error event
};

socket.addEventListener("error", function(event) {
  // handle error event
});
```

### 1.4 服务端的实现

WebSocket 服务器的实现，可以查看维基百科的[列表](https://en.wikipedia.org/wiki/Comparison_of_WebSocket_implementations)。

> [!example] 常用的 Node 实现有以下三种。
> 
> - [µWebSockets](https://github.com/uWebSockets/uWebSockets)
> - [Socket.IO](http://socket.io/)
> - [WebSocket-Node](https://github.com/theturtle32/WebSocket-Node)



## 2 WebSocket实现之`Socket.io`

> [!tip] [Socket.io官网](https://socket.io/)

官网里的demo很多，看官网就好



## 3 `Vue-Socket-io` 实现及使用

> [!tip]
> 推荐参考文档 [vue-socket.io](https://www.npmjs.com/package//vue-socket.io#using-socketio-client-instance)
>
> 参考自简书 [候鸟与暖风](https://www.jianshu.com/p/d509e8695850)
>
> 推荐和我一样的[踩坑博文](https://www.cnblogs.com/dreamsqin/p/12018866.html)

### 3.1 下载`vue-socket-io`依赖

```bash
 npm install vue-socket.io --save
```

### 3.2 引入到vue-cli项目中

引入的方式有两种情形，一种固定地址，一种动态地址

####  a. 第一种情景

webSocket连接的地址是固定的。

```js
//在main.js中直接这样写
import VueSocketIO from 'vue-socket.io'

Vue.use(new VueSocketIO({
  debug: true,
  connection: 'ws://192.168.21.109:9099?storeId=1', 
  vuex: {       // 不需要用到vuex这个可以不加
	store,
	actionPrefix: 'SOCKET_',
	mutationPrefix: 'SOCKET_'
  }
}))
```

原博主还提到：连接方式很多直接在main.js中如下这样写：

```js
import VueSocketio from 'vue-socket.io'; 
Vue.use(VueSocketio, 'http://socketserver.com:1923');      
 //*******这种方法我试了，我这边不行\**\*//**
```

####  b. 第二种情形

webSocket连接的地址的是动态的，是后台通过接口传给我们的。

![](bg202009053.png)

这里要提示的一点就是，当连接的地址是动态的，代码的执行顺序就很重要了，即new VueSocket在main.js中的位置。

### 3.3 在mounted中执行connect

#### a. 当socket地址是静态的写法

```js
mounted(){
 this.$socket.emit('connect', 1)
}
```

#### b. 当socket地址是动态的

因为此时的socket连接地址是动态的，就会存在请求响应然后渲染的时间，这个时候就会出现socket还没渲染成功就执行了App.vue，这时候connect连接事件就不会触发，所以采用定时器的方法来执行connect

```js
 mounted() {
  var timerOne = window.setInterval(() => {
   if (this.$socket) {
    	this.$socket.emit('connect', 1)
    	window.clearInterval(timerOne)
   		return;
   }
  }, 500)
 },
```

### 3.4 推送消息给后台，连接socket

```js
<script>
    export default {
        data() {
            id: '',
        },
        mounted() {
        	//触发socket连接
            this.$socket.emit('login', loginId);       
        },

        sockets: {
            connect() {
                this.id = this.$socket.id;
				//监听connect事件
                this.$socket.emit('login', loginId);      
            };
			//监听message事件，方法是后台定义和提供的
            message(data) {                                 
                console.log(data);
            }

        },
          methods: {
          	 //添加按钮事件向服务端发送数据
            clickButton: function(val){                      
                this.$socket.emit('emit_method', val);
           }
    }
</script>
```

![](bg202009054.png)

### 3.5 socket连接成功

因为我们在 `new VueSocketIO`中开启了`debug: true`，就会在控制台中出现那些蓝色`debug信息`，来帮助我们调试socket

> [!note] 如果蓝色的字中，没有包含我们在socket中定义的事件（connect、users、reconnect......），那就可能是我们在main,js中创建的new VueSocketIO渲染时间有问题,这个时候，connect事件也不会执行

### 3.6 后台定义的事件

> 如图上所示user、transferMessage这些名词，都是后台自定义的，每个项目中可能都会有所不同，我们接受消息的事件就是靠后台来告诉我们的

**vue-socket.io中自带的几个事件** 

> connect:查看socket是否渲染成功 
>
> disconnect:检测socket断开连接 
>
> reconnect:重新连接socket事件

# 五 Vue 响应式原理


> [!bug] 今天接手了一个Bug，大概描述一下：
> 
> 存在一个列表和一个分页器，用的是Element-UI。
>
> 使用中，每次修改每页显示数据总数、换页等操作都会使用ajax异步请求新的数据。
>
> 问题：每次操作后，列表的渲染数据均是上一次操作的正确预期效果


主要代码如下：

```js
<!-- 分页器 -->
<div class="pager">
	<el-pagination
		v-int-pager
		@size-change="onPagerSizeChange"
		@current-change="onPagerCurrentChange"
		:current-page="pager.currentPage"
		:page-sizes="pager.chose"
		:page-size="pager.size"
		layout="total, sizes, prev, pager, next, jumper"
		:total="pager.total">
	</el-pagination>
</div>
 <!-- /分页器 -->
```

```js
 <!-- 列表渲染数据 -->
<el-table 
    :data="tableData" 
	:border="true" 
	:stripe="true">
</el-table>
```

```js
onPagerSizeChange(size) {
   this.pager.size = size;
   this.pager.currentPage = 1;
   this._getGoodsList();
  },
// 切换页面
onPagerCurrentChange(currentPage) {
   this.pager.currentPage = currentPage;
   this._getGoodsList();
},
```

其中，`this._getGoodsList()`为获取相应数据的异步请求，经验证后台数据均获取正确。

所以，结论只有一个，就是异步获取数据之后，Vue 未更新 `Virtual DOM` 。

最后，发现需要渲染的数据没有加入到 `vm.data()`中，修改后问题解决。

> [!note] 也因此，在这里在此回顾`Vue`响应式原理

## 1 深入响应式原理

> [!tip] [官方文档](https://cn.vuejs.org/v2/guide/reactivity.html)

Vue 最独特的特性之一，是其非侵入性的响应式系统。数据模型仅仅是普通的 JavaScript 对象。而当你修改它们时，**视图会进行更新**。

### 1.1 如何追踪变化

当你把一个普通的 JavaScript 对象传入 Vue 实例作为 `data` 选项，Vue 将遍历此对象所有的 property，并使用 [`Object.defineProperty`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty) 把这些 property 全部转为 [getter/setter](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Working_with_Objects#定义_getters_与_setters)。`Object.defineProperty` 是 ES5 中一个无法 shim 的特性，这也就是 Vue 不支持 IE8 以及更低版本浏览器的原因。

这些 getter/setter 对用户来说是不可见的，但是在内部它们让 Vue 能够追踪依赖，在 property 被访问和修改时通知变更。这里需要注意的是不同浏览器在控制台打印数据对象时对 getter/setter 的格式化并不同，所以建议安装 [vue-devtools](https://github.com/vuejs/vue-devtools) 来获取对检查数据更加友好的用户界面。

每个组件实例都对应一个 **watcher** 实例，它会在组件渲染的过程中把“接触”过的数据 property 记录为依赖。之后当依赖项的 setter 触发时，会通知 watcher，从而使它关联的组件重新渲染。

![](rendering-way.png)

### 1.2 <a name="content">检测变化的注意事项</a>

由于 JavaScript 的限制，Vue **不能检测**数组和对象的变化。尽管如此我们还是有一些办法来回避这些限制并保证它们的响应性。

#### 对于对象

Vue 无法检测 property 的添加或移除。由于 Vue 会在初始化实例时对 property 执行 getter/setter 转化，所以 property 必须在 `data` 对象上存在才能让 Vue 将它转换为响应式的。例如：

```js
var vm = new Vue({
  data:{
    a:1
  }
})

// `vm.a` 是响应式的

vm.b = 2
// `vm.b` 是非响应式的
```

对于已经创建的实例，Vue 不允许动态添加根级别的响应式 property。但是，可以使用 `Vue.set(object, propertyName, value)` 方法向嵌套对象添加响应式 property。例如，对于：

```js
Vue.set(vm.someObject, 'b', 2)
```

您还可以使用 `vm.$set` 实例方法，这也是全局 `Vue.set` 方法的别名：

```js
this.$set(this.someObject,'b',2)
```

有时你可能需要为已有对象赋值多个新 property，比如使用 `Object.assign()` 或 `_.extend()`。但是，这样添加到对象上的新 property 不会触发更新。在这种情况下，你应该用原对象与要混合进去的对象的 property 一起创建一个新的对象。

```js
// 代替 `Object.assign(this.someObject, { a: 1, b: 2 })`
this.someObject = Object.assign({}, this.someObject, { a: 1, b: 2 })
```

#### 对于数组

Vue 不能检测以下数组的变动：

1. 当你利用索引直接设置一个数组项时，例如：`vm.items[indexOfItem] = newValue`
2. 当你修改数组的长度时，例如：`vm.items.length = newLength`

举个例子：

```js
var vm = new Vue({
  data: {
    items: ['a', 'b', 'c']
  }
})
vm.items[1] = 'x' // 不是响应性的
vm.items.length = 2 // 不是响应性的
```

为了解决第一类问题，以下两种方式都可以实现和 `vm.items[indexOfItem] = newValue` 相同的效果，同时也将在响应式系统内触发状态更新：

```js
// Vue.set
Vue.set(vm.items, indexOfItem, newValue)
// Array.prototype.splice
vm.items.splice(indexOfItem, 1, newValue)
```

你也可以使用 [`vm.$set`](https://cn.vuejs.org/v2/api/#vm-set) 实例方法，该方法是全局方法 `Vue.set` 的一个别名：

```js
vm.$set(vm.items, indexOfItem, newValue)
```

为了解决第二类问题，你可以使用 `splice`：

```js
vm.items.splice(newLength)
```

### 1.3 声明响应式 property

由于 Vue 不允许动态添加根级响应式 property，所以你必须在初始化实例前声明所有根级响应式 property，哪怕只是一个空值：

```js
var vm = new Vue({
  data: {
    // 声明 message 为一个空值字符串
    message: ''
  },
  template: '<div>{{ message }}</div>'
})
// 之后设置 `message`
vm.message = 'Hello!'
```

如果你未在 `data` 选项中声明 `message`，Vue 将警告你渲染函数正在试图访问不存在的 property。

这样的限制在背后是有其技术原因的，它消除了在依赖项跟踪系统中的一类边界情况，也使 Vue 实例能更好地配合类型检查系统工作。但与此同时在代码可维护性方面也有一点重要的考虑：`data`对象就像组件状态的结构 (schema)。提前声明所有的响应式 property，可以让组件代码在未来修改或给其他开发人员阅读时更易于理解。

### 1.4 异步更新队列

可能你还没有注意到，Vue 在更新 DOM 时是**异步**执行的。只要侦听到数据变化，Vue 将开启一个队列，并缓冲在同一事件循环中发生的所有数据变更。如果同一个 watcher 被多次触发，只会被推入到队列中一次。这种在缓冲时去除重复数据对于避免不必要的计算和 DOM 操作是非常重要的。然后，在下一个的事件循环“tick”中，Vue 刷新队列并执行实际 (已去重的) 工作。Vue 在内部对异步队列尝试使用原生的 `Promise.then`、`MutationObserver` 和 `setImmediate`，如果执行环境不支持，则会采用 `setTimeout(fn, 0)` 代替。

例如，当你设置 `vm.someData = 'new value'`，该组件不会立即重新渲染。当刷新队列时，组件会在下一个事件循环“tick”中更新。多数情况我们不需要关心这个过程，但是如果你想基于更新后的 DOM 状态来做点什么，这就可能会有些棘手。虽然 Vue.js 通常鼓励开发人员使用“数据驱动”的方式思考，避免直接接触 DOM，但是有时我们必须要这么做。为了在数据变化之后等待 Vue 完成更新 DOM，可以在数据变化之后立即使用 `Vue.nextTick(callback)`。这样回调函数将在 DOM 更新完成后被调用。例如：

```
<div id="example">{{message}}</div>
var vm = new Vue({
  el: '#example',
  data: {
    message: '123'
  }
})
vm.message = 'new message' // 更改数据
vm.$el.textContent === 'new message' // false
Vue.nextTick(function () {
  vm.$el.textContent === 'new message' // true
})
```

在组件内使用 `vm.$nextTick()` 实例方法特别方便，因为它不需要全局 `Vue`，并且回调函数中的 `this` 将自动绑定到当前的 Vue 实例上：

```
Vue.component('example', {
  template: '<span>{{ message }}</span>',
  data: function () {
    return {
      message: '未更新'
    }
  },
  methods: {
    updateMessage: function () {
      this.message = '已更新'
      console.log(this.$el.textContent) // => '未更新'
      this.$nextTick(function () {
        console.log(this.$el.textContent) // => '已更新'
      })
    }
  }
})
```

因为 `$nextTick()` 返回一个 `Promise` 对象，所以你可以使用新的 [ES2017 async/await](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/async_function) 语法完成相同的事情：

```
methods: {
  updateMessage: async function () {
    this.message = '已更新'
    console.log(this.$el.textContent) // => '未更新'
    await this.$nextTick()
    console.log(this.$el.textContent) // => '已更新'
  }
}
```

### 1.5 <a name="solution">Vue 给对象添加属性</a>

在开发过程中，我们时常会遇到这样一种情况：当 `vue` 的 `data` 里边声明或者已经赋值过的对象或者数组（数组里边的值是对象）时，向对象中添加新的属性，**如果更新此属性的值，是不会更新视图的。**

<span style="color:red;">根据官方文档定义：如果在实例创建之后添加新的属性到实例上，它不会触发视图更新。</span>

受现代 JavaScript 的限制 (以及废弃 Object.observe)，Vue 不能检测到对象属性的添加或删除。由于 Vue 会在初始化实例时对属性执行 `getter/setter` 转化过程，所以属性**必须在 data 对象上存在才能让 Vue 转换它，这样才能让它是响应的。**

看以下实例：

```vue
<template>
     <div>
    <p @click="addd(obj)">{{obj.d}}</p>
    <p @click="adde(obj)"> {{obj.e}}</p>
</div>
</template>

 <script>
  export default {
      data(){
            return {
                obj:{}
            }
      },
      mounted() {
        this.obj = {d: 0};
        this.obj.e = 0;
        console.log('after--', this.obj);
      },
     methods: {
        addd(item) {
            item.d = item.d + 1;
            console.log('item--',item);
        },
        adde(item) {
            item.e = item.e + 1;
            console.log('item--',item);
        }
       }
  }
 </scirpt>  
```

可以看出`d属性`是有**get 和 set方法**的，而新增的e属性是没有的

```js
// 点击触发3次addd，点击触发3次adde,页面效果及控制台信息如下
3
0
```

```js
// 此时触发1次addd,页面效果如下：
4
3
```

由此可以看出，更新新增属性e，是不会更新视图，但是会改变其值，当更新原有属性d时会更新视图，同时将新增的属性e的值也更新到视图里边

#### 解决方案

`官方定义` 中的解决方法在上文中已经给出   ----> <a href="#content">检测变化的注意事项</a>

有时你想向已有对象上添加一些属性，例如使用 `Object.assign()` 或 `_.extend()` 方法来添加属性。

但是，添加到对象上的新属性不会触发更新。在这种情况下可以创建一个新的对象，让它包含原对象的属性和新的属性：

```js
// 代替 `Object.assign(this.obj, { a: 1, e: 2 })`
this.obj= Object.assign({}, this.obj, { a: 1, e: 2 })
```

上述实例解决如下：**在 `mounted()` 中动态添加全局对象属性**

![](problem-3.png)

```js
// 点击触发3次addd，点击触发3次adde,页面效果及控制台信息如下：
3
3
```

## 2 Problems To Collect

### 2.1 Vue异步获取数据后初始化数据不能及时更新

- 钩子函数尽量使用mounted来完成初始化函数，根据vue的生命周期尽量不要用mounted之前的
- 对于可能要改变的值，最好直接写到data{}中
- 如果还不能实时更新，通过vue的官方`$set`方法可以实现手动设置
- 一些特殊set方法，比如其他js框架的set方法，会和vue的方法冲突造成数据不能同步

### 2.2 Vue Watch的两个Demo

**Demo1**

```xml
<template>
  <div>
    <el-input v-model="demo"></el-input>
    {{value}}
  </div>
</template>
<script>
  export default {
    name: 'index',
    data() {
      return {
        demo: '',
        value: ''
      };
    },
    watch: {
      demo(val) {
        this.value = this.demo;
      }
    }
  };
</script>
```

**Demo2**

下面这个例子中，如果`watch`监测的是一个对象的话，直接使用`watch`是不行的，此时我们可以借助于`computed`计算属性来完成。

```xml
<template>
  <div>
    <el-input v-model="demo.name"></el-input>
    {{value}}
  </div>
</template>
<script>
  export default {
    name: 'index',
    data() {
      return {
        demo: {
          name: ''
        },
        value: ''
      };
    },
    computed: {
      newName() {
        return this.demo.name;
      }
    },
    watch: {
      newName(val) {
        this.value = val;
      }
    }
  };
</script>
```

**Demo3**

数组的变化，不需要深度watch

```html
<div id="app">
  <input type="text" v-model="childrens.name" />
  <input type="text" v-model="lastName" />
</div>

<script type="text/javascript">
  var vm = new Vue( {
    el: '#app',
    data: {
      childrens: {
        name: '小强',
        age: 20,
        sex: '男'
      },
      tdArray:["1","2"],
      lastName:"张三"
    },
    watch:{
      childrens:{
        handler:function(val,oldval){
          console.log(val.name)
        },
        deep:true//对象内部的属性监听，也叫深度监听
      },
      'childrens.name':function(val,oldval){
        console.log(val+"aaa")
      },//键路径必须加上引号
      lastName:function(val,oldval){
        console.log(this.lastName)
      }
    },//以V-model绑定数据时使用的数据变化监测
  } );
  vm.$watch("lastName",function(val,oldval){
    console.log(val)
  })//主动调用$watch方法来进行数据监测
</script>
</body>
```

### 2.3 Vue `el-input` 的事件中未及时触发数据动态渲染

> [!bug] 2020/11/4
>
> 问题是这样的：这个使用的 `element-ui` 输入框，要求其输入必须为浮点数字（数字和点），而非除数字以外的字符。
>
> Bug出现在其可以用中文输入法输入字符并停留，未及时触发相应的 `@input` 事件和 `@keyup`事件 

![](problem-1.png)

处理过程中，尝试了所有可能的方法，比如

**①使用 `this.$set()` 方法，<a href="#solution">参考此处</a>**

**②使用 `vm.$forceUpdate()`**，[官方文档](https://cn.vuejs.org/v2/api/#vm-forceUpdate)用处不大，顾名思义主要目的就是**强制更新渲染DOM**，然并卵……

**③**最后实在不行，想着在 `update` 之前就把多余字符串过滤了。于是**添加 `beforeUpdate()` 方法，进行补充过滤**

![](problem-2.png)

> （……是时候看看 `Vue` 源码了~~~）
>
> BUG----2020/11/5
>
> 问题同样应该还是数据不及时更新的问题，这次的解决方案仅仅是：

**①为一个组件的事件 `@select` 添加 `.native` ，解决了数据未同步的问题**


### 2.4 Vue 中与 `$set` 相对应的 `$delete`

vue给对象新增属性，对于一般的对象新增属性，只需要对象新增属性赋值操作就可以啦，但是不会触发视图更新。

```vue
<template>
  <div>
     <div class="box">
       <span>姓名： {{infos.name}}</span>
       <span>{{infos.message}}</span>
       <button @click="addtooltip">查看信息</button>
     </div>
  </div>
</template>

<script>
  export default {
    name: "module1",
    data() {
      return {
        infos: {
          name: '张三'，
          age: 24
        }
      }
    },
    methods:{
       addtooltip() {
          this.infos.message = '出生于四川遂宁';
       }
    }
  }
</script>
```

而在我们点击“查看信息”按钮时，看到页面并没有显示，而打印`this.infos` 就有`message`字段，所以

> 实例创建后添加属性，并不会触发视图更新
> 这时候需要使用 vue中 **$set** 方法,既可以新增属性，又可更新视图

```js
this.$set(this.infos, "message",  "出生于四川遂宁")
```

或者如果是全局就使用这种

```js
var vm = new Vue({..})
vm.set(this.data, "key", value)
```

![](set.jpg)

#### vue删除对象中某个属性同理，使用delete

```js
delete this.data.key
```

或者

```js
var vm = new Vue({..})
vm.delete(this.info, "age")
```

![](delete.jpg)



# 六 Vue.config.js 注解

> [!note] `Vue` 官方 `CLI` [配置参考](https://cli.vuejs.org/zh/config/#%E5%85%A8%E5%B1%80-cli-%E9%85%8D%E7%BD%AE)：官方给出的文档很全面

> vue-cli3 脚手架搭建完成后，项目目录中没有 vue.config.js 文件，需要手动创建

`vue.config.js` 是一个可选的配置文件，如果项目的 (和 `package.json` 同级的) 根目录中存在这个文件，那么它会被 `@vue/cli-service` 自动加载。你也可以使用 `package.json` 中的 `vue` 字段，但是注意这种写法需要你严格遵照 JSON 的格式来写。

这个文件应该导出一个包含了选项的对象：

```js
// vue.config.js
module.exports = {
  // 选项...
}
```

## 1 配置选项示例

### 示例一

```js
// Vue.config.js 配置选项
module.exports = {
    // 选项
    //  基本路径
    publicPath: "./",
    //  构建时的输出目录
    outputDir: "dist",
    //  放置静态资源的目录
    assetsDir: "static",
    //  html 的输出路径
    indexPath: "index.html",
    //文件名哈希
    filenameHashing: true,
    //用于多页配置，默认是 undefined
    pages: {
        index: {
            // page 的入口文件
            entry: 'src/index/main.js',
            // 模板文件
            template: 'public/index.html',
            // 在 dist/index.html 的输出文件
            filename: 'index.html',
            // 当使用页面 title 选项时，
            // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
            title: 'Index Page',
            // 在这个页面中包含的块，默认情况下会包含
            // 提取出来的通用 chunk 和 vendor chunk。
            chunks: ['chunk-vendors', 'chunk-common', 'index']
        },
        // 当使用只有入口的字符串格式时，
        // 模板文件默认是 `public/subpage.html`
        // 如果不存在，就回退到 `public/index.html`。
        // 输出文件默认是 `subpage.html`。
        subpage: 'src/subpage/main.js'
    },
    //  是否在保存的时候使用 `eslint-loader` 进行检查。
    lintOnSave: true,
    //  是否使用带有浏览器内编译器的完整构建版本
    runtimeCompiler: false,
    //  babel-loader 默认会跳过 node_modules 依赖。
    transpileDependencies: [ /* string or regex */ ],
    //  是否为生产环境构建生成 source map？
    productionSourceMap: true,
    //  设置生成的 HTML 中 <link rel="stylesheet"> 和 <script> 标签的 crossorigin 属性。
    crossorigin: "",
    //  在生成的 HTML 中的 <link rel="stylesheet"> 和 <script> 标签上启用 Subresource Integrity (SRI)。
    integrity: false,
    //  调整内部的 webpack 配置
    configureWebpack: () => {}, //(Object | Function)
    chainWebpack: () => {},
    // 配置 webpack-dev-server 行为。
    devServer: {
        open: process.platform === 'darwin',
        host: '0.0.0.0',
        port: 8080,
        https: false,
        hotOnly: false,
        // 查阅 https://github.com/vuejs/vue-docs-zh-cn/blob/master/vue-cli/cli-service.md#配置代理
        proxy: {
            '/api': {
                target: "http://app.rmsdmedia.com",
                changeOrigin: true,
                secure: false,
                pathRewrite: {
                    "^/api": ""
                }
            },
            '/foo': {
                target: '<other_url>'
            }
        }, // string | Object
        before: app => {}
    },
    // CSS 相关选项
    css: {
        // 将组件内的 CSS 提取到一个单独的 CSS 文件 (只用在生产环境中)
        // 也可以是一个传递给 `extract-text-webpack-plugin` 的选项对象
        extract: true,
        // 是否开启 CSS source map？
        sourceMap: false,
        // 为预处理器的 loader 传递自定义选项。比如传递给
        // Css-loader 时，使用 `{ Css: { ... } }`。
        loaderOptions: {
            css: {
                // 这里的选项会传递给 css-loader
            },
            postcss: {
                // 这里的选项会传递给 postcss-loader
            }
        },
        // 为所有的 CSS 及其预处理文件开启 CSS Modules。
        // 这个选项不会影响 `*.vue` 文件。
        modules: false
    },
    // 在生产环境下为 Babel 和 TypeScript 使用 `thread-loader`
    // 在多核机器下会默认开启。
    parallel: require('os').cpus().length > 1,
    // PWA 插件的选项。
    // 查阅 https://github.com/vuejs/vue-docs-zh-cn/blob/master/vue-cli-plugin-pwa/README.md
    pwa: {},
    // 三方插件的选项
    pluginOptions: {
        // ...
    }
}
```

### 示例二(简化)

```js
module.exports = {
	// publicPath:process.env.NODE_ENV === 'production' ? '/vue_workspac/aihuhuproject/' : '/',

	//基本路径
    publicPath: './',//默认的'/'是绝对路径，如果不确定在根路径，改成相对路径'./'
    // 输出文件目录
    outputDir: 'dist',
    assetsDir:'static',
    indexPath:'index.html',
    // eslint-loader 是否在保存的时候检查
    lintOnSave: true,
    // 生产环境是否生成 sourceMap 文件
    productionSourceMap: false,
    // css相关配置
    css: {
        // 是否使用css分离插件 ExtractTextPlugin
        extract: true,
        // 开启 CSS source maps?
        sourceMap: false,
    },
    // webpack-dev-server 相关配置
    devServer: {
        open: false,//open 在devServer启动且第一次构建完成时，自动用我们的系统的默认浏览器去打开要开发的网页
        host: '0.0.0.0',//默认是 localhost。如果你希望服务器外部可访问，指定如下 host: '0.0.0.0'，设置之后之后可以访问ip地址
        port: 8080,
        hot:true,//hot配置是否启用模块的热替换功能，devServer的默认行为是在发现源代码被变更后，通过自动刷新整个页面来做到事实预览，开启hot后，将在不刷新整个页面的情况下通过新模块替换老模块来做到实时预览。
        https: false,
        hotOnly: false,// hot 和 hotOnly 的区别是在某些模块不支持热更新的情况下，前者会自动刷新页面，后者不会刷新页面，而是在控制台输出热更新失败
        proxy: {
            '/': {
                target: 'http://xxxx:8080', //目标接口域名
                secure: false, //false为http访问，true为https访问
                changeOrigin: true, //是否跨域
                pathRewrite: {
                    '^/': '/' //重写接口
                }
            }
    	}, // 设置代理
    	before: app => {}
    },
    // 第三方插件配置
    pluginOptions: {
    // ...
    }
};
```

### 示例三

```js
const path = require("path");
const resolve = function(dir) {
    return path.join(__dirname, dir);
};
module.exports = {
    publicPath: "./",
    outputDir: "dist",
    assetsDir: "static",
    lintOnSave: false, // 是否开启eslint保存检测
    productionSourceMap: false, // 是否在构建生产包时生成sourcdeMap
    chainWebpack: config => {
        config.resolve.alias
            .set("@", resolve("src"))
            .set("@", resolve("src/views"))
            .set("@", resolve("src/components"))
            .set("@", resolve("src/common"))
            .set("@", resolve("src/utils"))
            .set("@", resolve("src/service")); /* 别名配置 */
        config.optimization.runtimeChunk("single");
    },
    devServer: {
        // host: "localhost",
        /* 本地ip地址 */
        host: "localhost",
        port: "10000",
        hot: true,
        /* 自动打开浏览器 */
        open: true,
        overlay: {
            warning: false,
            error: true
        },
        /* 跨域代理 */
        proxy: {
            "/item": {
                /* 目标代理服务器地址 */
                target: "http://localhost:80", //localhost:80/api/item/category/list
                // target: "http://192.168.1.102:8888", //
                /* 允许跨域 */
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    "^/item": "/api/item"
                }
            },
            "/upfile": {
                /* 目标代理服务器地址 */
                target: "http://localhost:80", //localhost:80/api/item/category/list
                // target: "http://192.168.1.102:8888", //
                /* 允许跨域 */
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    "^/upfile": "/api/upfile"
                }
            },
            /*"/upload": {
                /!* 目标代理服务器地址 *!/
                target: "http://localhost:8082", //localhost:80/api/item/category/list
                // target: "http://192.168.1.102:8888", //
                /!* 允许跨域 *!/
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    "^/upload": "/upload"
                }
            },*/
        }

    }
};
```

### 示例四

```js
const path = require("path");
const UglifyPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  publicPath: "./", // 基本路径
  outputDir: "dist", // 输出文件目录
  lintOnSave: true, // eslint-loader 是否在保存的时候检查
  assetsDir: "static", //放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
  pages: undefined, // 以多页模式构建应用程序。
  runtimeCompiler: false, // 是否使用包含运行时编译器的 Vue 构建版本
  // 是否为 Babel 或 TypeScript 使用 thread-loader。该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建，在适当的时候开启几个子进程去并发的执行压缩
  parallel: require("os").cpus().length > 1,
  productionSourceMap: false, // 生产环境是否生成 sourceMap 文件，一般情况不建议打开
  // webpack配置
  //对内部的 webpack 配置进行更细粒度的修改 https://github.com/neutrinojs/webpack-chain see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  chainWebpack: config => {
  },
  //调整 webpack 配置 https://cli.vuejs.org/zh/guide/webpack.html#%E7%AE%80%E5%8D%95%E7%9A%84%E9%85%8D%E7%BD%AE%E6%96%B9%E5%BC%8F
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
      config.mode = 'production'
    } else {
      // 为开发环境修改配置...
      config.mode = 'development'
    }
    Object.assign(config, {
      // 开发生产共同配置
      resolve: {
        alias: {
          '@': path.resolve(__dirname, './src'),
          '@c': path.resolve(__dirname, './src/components'),
          '@p': path.resolve(__dirname, './src/pages')
        } // 别名配置
      }
    })
  },
  css: {
    // 启用 CSS modules
    modules: false,
    // 是否使用css分离插件
    extract: true,
    // 开启 CSS source maps，一般不建议开启
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {
      sass: {
        prependData: `@import "@/styles/global.scss";`
      },
    }
  },
  pwa: {}, // PWA 插件相关配置
  // webpack-dev-server 相关配置 https://webpack.js.org/configuration/dev-server/
  devServer: {
    // host: 'localhost',
    host: "0.0.0.0",
    port: 8000, // 端口号
    https: false, // https:{type:Boolean}
    open: true, //配置自动启动浏览器  http://172.11.11.22:8888/rest/XX/
    hotOnly: true, // 热更新
    // proxy: 'http://localhost:8000'   // 配置跨域处理,只有一个代理
    proxy: {
      //配置自动启动浏览器
      "/XX/*": {
        target: "http://172.16.68.134:8089",
        changeOrigin: true,
        // ws: true,//websocket支持
        secure: false
      },
      "/XX2/*": {
        target: "http://172.16.68.134:8089",
        changeOrigin: true,
        //ws: true,//websocket支持
        secure: false
      }
    }
  },
  // 利用splitChunks将每个依赖包单独打包，在生产环境下配置
  configureWebpack:config => {
    // 开启gzip压缩
    if (process.env.NODE_ENV === 'production') {
      config.plugins.push(new CompressionWebpackPlugin({
        algorithm: 'gzip',
        test: /\.js$|\.html$|\.json$|\.css/,
        threshold: 10240,
        minRatio: 0.8
      }));
      // 开启分离js
      config.optimization = {
        runtimeChunk: 'single',
        splitChunks: {
          chunks: 'all',
          maxInitialRequests: Infinity,
          minSize: 20000, // 依赖包超过20000bit将被单独打包
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name (module) {
                // get the name. E.g. node_modules/packageName/not/this/part.js
                // or node_modules/packageName
                const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
                // npm package names are URL-safe, but some servers don't like @ symbols
                return `${packageName.replace('@', '')}`
              }
            }
          }
        },
        minimizer: [new UglifyPlugin({
          uglifyOptions: {
            compress: {
              warnings: false,
              drop_console: true, // console
              drop_debugger: false,
              pure_funcs: ['console.log'] // 移除console
            }
          }
        })]
      };
      // 取消webpack警告的性能提示
      config.performance = {
        hints:'warning',
            //入口起点的最大体积
            maxEntrypointSize: 50000000,
            //生成文件的最大体积
            maxAssetSize: 30000000,
            //只给出 js 文件的性能提示
            assetFilter: function(assetFilename) {
          return assetFilename.endsWith('.js');
        }
      }
    }
  },
  // 第三方插件配置 https://www.npmjs.com/package/vue-cli-plugin-style-resources-loader
  pluginOptions: {}
};
```

### 示例五（Fuchuang可用）

```js
// vue.config.js
// eslint-disable-next-line
const path = require('path');
// eslint-disable-next-line
const TerserPlugin = require('terser-webpack-plugin');

const webpack = require('./node_modules/webpack');
// eslint-disable-next-line
const webpackBundleAnalyzer = require('./node_modules/webpack-bundle-analyzer');

const devServer = {
  proxy: {
    '/mock': {
      target: 'http://localhost:3000', // 请求到/mock/list 会到代理到请求 http://localhost:3000/mock/list
      // ws:true,
      // changeOrigin: true,
      pathRewrite: { '/mock': '' }, // 如果你不想始终传递 /mock ，则需要重写路径：
      // secure: false, // 默认情况下，不接受运行在 HTTPS 上，且使用了无效证书的后端服务器。如果你想要接受，修改配置为false
    },
  },
  port:8080,
  compress: true,
  disableHostCheck: true,
};
  

module.exports = {
  // 网站的目录，默认在域名根目录 TODO 当使用子域名时，打包时加上子域名
  // Type:String,Default:'/'
  publicPath: process.env.NODE_ENV === 'production' ? '/fuchuang-web/' : '/fuchuang-web/',

  // 输出的目录
  // Type:String,Default:"dist"
  // 相当于webpack中output.path
  outputDir: `dist`,

  // 静态资源img,js,css,font的目录，相对于outputDir
  // Type:String,Default:''
  // 相当于webpack中output.publicPath
  assetsDir: 'assets/',

  // index.html的目录,相对于outputDir
  // Type:String, Default:''
  indexPath: 'index.html',

  // 文件是否需要带hash
  // Type:Boolean,Default:true
  filenameHashing: true,

  // multi-page模式,配置各个页面
  // Type:Object,Default:{}
  // pages: {
  //   index: {
  //     // page入口
  //     entry: 'src/pages/index/index.js',

  //     // 页面的html模板
  //     template: 'public/index.html',

  //     // 在dist目录中输出的名字
  //     filename: 'index.html',

  //     // 页面的title
  //     // 当使用 title 选项时，template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
  //     title: '91卡吧',

  //     // 在这个页面中包含的块，默认情况下会包含
  //     // 提取出来的通用 chunk 和 vendor chunk。
  //     // chunks: ['chunk-vendors', 'chunk-common', 'index'],

  //     // 当使用只有入口的字符串格式时，
  //     // 模板会被推导为 `public/subpage.html`
  //     // 并且如果找不到的话，就回退到 `public/index.html`。
  //     // 输出文件名会被推导为 `subpage.html`。
  //     // subpage: 'src/subpage/main.js',

  //   },

  // },
  // 当在 multi-page 模式下构建时，webpack 配置会包含不一样的插件
  // (这时会存在多个 html-webpack-plugin 和 preload-webpack-plugin 的实例)。
  // 如果你试图修改这些插件的选项，请确认运行 vue inspect。

  // 保存时用eslint纠正
  // Type:Boolean,Default:true
  // 设置为true:lint错误会被输出为编译警告，不会导致编译失败
  // lintOnSave: process.env.NODE_ENV !== 'production',
  lintOnSave: true,

  // 是否使用包含运行时编译器的Vue构建版本
  // 设置为true,则可以在Vue组件中使用template选项，应用增大10kb
  // Type:Boolean,Default:false
  runtimeCompiler: false,

  // 默认情况下 babel-loader 会忽略所有 node_modules 中的文件。如果你想要通过 Babel 显式转译一个依赖，可以在这个选项中列出来。
  // Type:Array<string | RegExp>,Default:[]
  transpileDependencies: [],

  // 生产环境是否需要sourceMap
  // Type:Boolean,Default:false,
  productionSourceMap: false,

  // 设置生成的 HTML 中 <link rel="stylesheet"> 和 <script> 标签的 crossorigin 属性。
  // Type:String,Default:undefined,
  crossorigin: undefined,

  // 如果你构建后的文件是部署在 CDN 上的，启用该选项可以提供额外的安全性。
  // 当启用 SRI 时，preload resource hints 会被禁用(chrome的bug会下载两次)
  // Type:Boolean,Default:false
  integrity: false,

  // Type:Object|Function
  // 如果是obj,会被webpack-merge合并
  // 如果这个值是一个函数，则会接收被解析的配置作为参数。该函数及可以修改配置并不返回任何东西，也可以返回一个被克隆或合并过的配置版本。
  chainWebpack: (config) => {
    // config.resolve.alias
    //   .set('mui', path.resolve(__dirname, './src/assets/mui/js/mui.js'));
    console.log('config.output.path :>> ', config.output.path);
    return config;
    // config.module.rule('vue')
    //   .use('vue-loader')
    //   .loader('vue-loader')
    //   .tap((options) => {
    //     options.test = 1;
    //     return options;
    //   });
  },
  devServer,

  // configureWebpack: (config) => {
  //   if (process.env.NODE_ENV === 'production') {
  //     // 为生产环境修改配置...
  //   } else {
  //     // 为开发环境修改配置...
  //   }
  // },

/*  configureWebpack: smp.wrap(
    {

      output: {
        // filename: 'manifest.js',
        chunkFilename: '[name].[chunkhash:8].js',
      },

      devtool: process.env.NODE_ENV === 'production' ? 'none' : 'cheap-module-eval-source-map',

      plugins: [
        new webpack.ProvidePlugin({
        // $: 'jquery',
        // jQuery: 'jquery',
        // 'window.jQuery': 'jquery',
        // 'window.$': 'jquery',
        // QRCode: 'QRCode',
        }),
        // new webpackBundleAnalyzer.BundleAnalyzerPlugin(
        // {
        //   analyzerMode: 'server', // server , static, disabled
        //   analyzerHost: '127.0.0.1',
        //   analyzerPort: 'auto',
        //   reportFilename: 'report.html',
        //   defaultSizes: 'parsed',
        //   openAnalyzer: true, // Automatically open report in default browser
        //   generateStatsFile: true, // true , false
        //   statsFilename: 'stats.json',
        //   statsOptions: {}, // null , {object}:https://webpack.js.org/configuration/stats/
        //   logLevel: 'info'
        // }
        // ),
      ],
      externals: {
      // jquery: 'jQuery',
      // QRCode: 'QRCode',
      },
      optimization: {
        splitChunks: {
          // chunks(chunk) {

          // }, // 必须三选一： "initial" | "all"(推荐) | "async" (默认就是async)
          chunks: 'all', // 必须三选一： "initial" | "all"(推荐) | "async" (默认就是async)
          minSize: 30000, // 最小尺寸，30000
          // minRemainingSize: 0,
          // maxSize: 0,
          // minChunks: 1, // 最小 chunk ，默认1
          // maxAsyncRequests: 5, // 最大异步请求数， 默认5
          // maxInitialRequests: 3, // 最大初始化请求书，默认3
          // automaticNameDelimiter: '~', // 打包分隔符
          // name(module, chunks, cacheGroupKey) {

          // }, // 打包后的名称，此选项可接收 function
          cacheGroups: {
            commons: {
              priority: 10,
              name: 'commons',
              chunks: 'initial', //  (默认是async) ：initial、async和all
              minChunks: 2, // 在分割之前，这个代码块最小应该被引用的次数（译注：保证代码块复用性，默认配置的策略是不需要多次引用也可以被分割）
              minSize: 0, // 默认是30000：形成一个新代码块最小的体积
              // maxAsyncRequests: 5, // 默认是5：按需加载时候最大的并行请求数。
              // maxInitialRequests: 3, // 默认是3：一个入口最大的并行请求数
              enforce: true,
            },
            vendor: { // key 为entry中定义的 入口名称
              chunks: 'initial', // 必须三选一： "initial" | "all" | "async"(默认就是async)
              test: /node_modules/, // 正则规则验证，如果符合就提取 chunk
              name: 'vendor', // 要缓存的 分隔出来的 chunk 名称
              // minSize: 30000,
              // minChunks: 1,
              enforce: true,
              priority: 10,
            // maxAsyncRequests: 5, // 最大异步请求数， 默认1
            // maxInitialRequests: 3, // 最大初始化请求书，默认1
            // reuseExistingChunk: true, // 可设置是否重用该chunk
            },
            // default: {
            //   minChunks: 2,
            //   priority: -20,
            //   reuseExistingChunk: true
            // }
          },
        },
        runtimeChunk: {
          name: 'manifest',
        },
        // eslint-disable-next-line
        minimizer: [
          new TerserPlugin({
            extractComments: true,
            cache: true,
            parallel: true,
            sourceMap: true, // Must be set to true if using source-maps in production
            terserOptions: {
            // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
              compress: {
                drop_console: false,
              },
            },
            // minify: (file) => {
            //   // https://github.com/mishoo/UglifyJS2#minify-options
            //   const uglifyJsOptions = {
            //     /!* your `uglify-js` package options *!/
            //     compress: {
            //       drop_console: true,
            // },
            //   };

          //   return Uglify.minify(file, uglifyJsOptions);
          // },
          }),
        ],
        minimize: true,
        mergeDuplicateChunks: true,
      },
    },
  ),*/
  // Type:Function
  // 是一个函数，会接收一个基于 webpack-chain 的 ChainableConfig 实例。允许对内部的 webpack 配置进行更细粒度的修改。
  // chainWebpack() {},

  css: {

    // 默认情况下，只有 *.module.[ext] 结尾的文件才会被视作 CSS Modules 模块
    // 设置为 true 后你就可以去掉文件名中的 .module 并将所有的 *.(css|scss|sass|less|styl(us)?) 文件视为 CSS Modules 模块。
    // Type:Boolean,Default:false
    modules: false,

    //
    // Type:Object|Boolean,Default:生产环境true,开发环境false
    // extract: false,
    // extract:{},

    // css的sourceMap,开启影响性能
    // Type:Boolean,Default:false,
    sourceMap: false,

    // Type:Object,Default:{}
    // loaderOptions: {
    //   css: {
    //     // 这里的选项会传递给css-loader
    //   },
    //   postcss: {
    //     // 这里的选项会传递给postcss-loader
    //   },
    //   sass: {
    //     // 这里的选项会传递给sass-loader
    //   },
    //   less: {
    //     // 这里的选项会传递给less-loader
    //   },
    //   stylus: {
    //     // 这里的选项会传递给stylus-loader
    //   },
    // },
  },
};
```



## 2 配置项解读

### 2.1 publicPath

- Type: `string`

- Default: `'/'`

  部署应用包时的基本 URL。用法和 webpack 本身的 `output.publicPath` 一致，但是 Vue CLI 在一些其他地方也需要用到这个值，所以**请始终使用 `publicPath` 而不要直接修改 webpack 的 `output.publicPath`**。

  默认情况下，Vue CLI 会假设你的应用是被部署在一个域名的根路径上，例如 `https://www.my-app.com/`。如果应用被部署在一个子路径上，你就需要用这个选项指定这个子路径。例如，如果你的应用被部署在 `https://www.my-app.com/my-app/`，则设置 `publicPath` 为 `/my-app/`。

  这个值也可以被设置为空字符串 (`''`) 或是相对路径 (`'./'`)，这样所有的资源都会被链接为相对路径，这样打出来的包可以被部署在任意路径，也可以用在类似 Cordova hybrid 应用的文件系统中。

  相对 publicPath 的限制： 相对路径的 `publicPath` 有一些使用上的限制。在以下情况下，应当避免使用相对 `publicPath`:

  - 当使用基于 HTML5 `history.pushState` 的路由时；
  - 当使用 `pages` 选项构建多页面应用时。

  这个值在开发环境下同样生效。如果你想把开发服务器架设在根路径，你可以使用一个条件式的值：

  ```js
  module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
      ? '/production-sub-path/'
      : '/'
  }
  ```

### 2.2 outputDir

- Type: `string`

- Default: `'dist'`

当运行 `vue-cli-service build` 时生成的生产环境构建文件的目录。注意目标目录在构建之前会被清除 (构建时传入 `--no-clean` 可关闭该行为)。

> [!tip] 请始终使用 `outputDir` 而不要修改 webpack 的 `output.path`。

### 2.3 assetsDir

- Type: `string`

- Default: `''`

放置生成的静态资源 (js、css、img、fonts) 的 (相对于 `outputDir` 的) 目录。

> [!tip] 从生成的资源覆写 filename 或 chunkFilename 时，`assetsDir` 会被忽略。

### 2.4 indexPath

- Type: `string`

- Default: `'index.html'`

指定生成的 `index.html` 的输出路径 (相对于 `outputDir`)。也可以是一个绝对路径。

### 2.5 filenameHashing

- Type: `boolean`

- Default: `true`

默认情况下，生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存。然而，这也要求 index 的 HTML 是被 Vue CLI 自动生成的。如果你无法使用 Vue CLI 生成的 index HTML，你可以通过将这个选项设为 `false` 来关闭文件名哈希。

### 2.6 pages

- Type: `Object`

- Default: `undefined`

在 multi-page 模式下构建应用。每个“page”应该有一个对应的 JavaScript 入口文件。其值应该是一个对象，对象的 key 是入口的名字，value 是：

  - 一个指定了 `entry`, `template`, `filename`, `title` 和 `chunks` 的对象 (除了 `entry` 之外都是可选的)；
  - 或一个指定其 `entry` 的字符串。

  ```js
  module.exports = {
    pages: {
      index: {
        // page 的入口
        entry: 'src/index/main.js',
        // 模板来源
        template: 'public/index.html',
        // 在 dist/index.html 的输出
        filename: 'index.html',
        // 当使用 title 选项时，
        // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
        title: 'Index Page',
        // 在这个页面中包含的块，默认情况下会包含
        // 提取出来的通用 chunk 和 vendor chunk。
        chunks: ['chunk-vendors', 'chunk-common', 'index']
      },
      // 当使用只有入口的字符串格式时，
      // 模板会被推导为 `public/subpage.html`
      // 并且如果找不到的话，就回退到 `public/index.html`。
      // 输出文件名会被推导为 `subpage.html`。
      subpage: 'src/subpage/main.js'
    }
  }
  ```

> [!tip] 当在 multi-page 模式下构建时，webpack 配置会包含不一样的插件 (这时会存在多个 `html-webpack-plugin` 和 `preload-webpack-plugin` 的实例)。如果你试图修改这些插件的选项，请确认运行 `vue inspect`。

### 2.7 lintOnSave

- Type: `boolean` | `'warning'` | `'default'` | `'error'`

- Default: `'default'`

是否在开发环境下通过 [eslint-loader](https://github.com/webpack-contrib/eslint-loader) 在每次保存时 lint 代码。这个值会在 [`@vue/cli-plugin-eslint`](https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint) 被安装之后生效。

设置为 `true` 或 `'warning'` 时，`eslint-loader` 会将 lint 错误输出为编译警告。默认情况下，警告仅仅会被输出到命令行，且不会使得编译失败。

如果你希望让 lint 错误在开发时直接显示在浏览器中，你可以使用 `lintOnSave: 'default'`。这会强制 `eslint-loader` 将 lint 错误输出为编译错误，同时也意味着 lint 错误将会导致编译失败。

设置为 `error` 将会使得 `eslint-loader` 把 lint 警告也输出为编译错误，这意味着 lint 警告将会导致编译失败。

或者，你也可以通过设置让浏览器 overlay 同时显示警告和错误：

  ```js
  // vue.config.js
  module.exports = {
    devServer: {
      overlay: {
        warnings: true,
        errors: true
      }
    }
  }
  ```

  当 `lintOnSave` 是一个 truthy 的值时，`eslint-loader` 在开发和生产构建下都会被启用。如果你想要在生产构建时禁用 `eslint-loader`，你可以用如下配置：

  ```js
  // vue.config.js
  module.exports = {
    lintOnSave: process.env.NODE_ENV !== 'production'
  }
  ```

### 2.8 runtimeCompiler

- Type: `boolean`

- Default: `false`

是否使用包含运行时编译器的 Vue 构建版本。设置为 `true` 后你就可以在 Vue 组件中使用 `template`选项了，但是这会让你的应用额外增加 10kb 左右。

> 更多细节可查阅：[Runtime + Compiler vs. Runtime only](https://cn.vuejs.org/v2/guide/installation.html#运行时-编译器-vs-只包含运行时)。

### 2.9 transpileDependencies

- Type: `Array<string | RegExp>`

- Default: `[]`

默认情况下 `babel-loader` 会忽略所有 `node_modules` 中的文件。如果你想要通过 Babel 显式转译一个依赖，可以在这个选项中列出来。

### 2.10 productionSourceMap

- Type: `boolean`

- Default: `true`

如果你不需要生产环境的 source map，可以将其设置为 `false` 以加速生产环境构建。

### 2.11 crossorigin

- Type: `string`

- Default: `undefined`

设置生成的 HTML 中 `<link rel="stylesheet">` 和 `<script>` 标签的 `crossorigin` 属性。

需要注意的是该选项仅影响由 `html-webpack-plugin` 在构建时注入的标签 - 直接写在模版 (`public/index.html`) 中的标签不受影响。

> 更多细节可查阅: [CORS settings attributes](https://developer.mozilla.org/zh-CN/docs/Web/HTML/CORS_settings_attributes)

### 2.12 integrity

- Type: `boolean`

- Default: `false`

在生成的 HTML 中的 `<link rel="stylesheet">` 和 `<script>` 标签上启用 [Subresource Integrity](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity)(SRI)。如果你构建后的文件是部署在 CDN 上的，启用该选项可以提供额外的安全性。

需要注意的是该选项仅影响由 `html-webpack-plugin` 在构建时注入的标签 - 直接写在模版 (`public/index.html`) 中的标签不受影响。

另外，当启用 SRI 时，preload resource hints 会被禁用，因为 [Chrome 的一个 bug](https://bugs.chromium.org/p/chromium/issues/detail?id=677022) 会导致文件被下载两次。


## 3 配置项解读（webpack相关）

### 3.1 configureWebpack

- Type: `Object | Function`

如果这个值是一个对象，则会通过 [webpack-merge](https://github.com/survivejs/webpack-merge) 合并到最终的配置中。

如果这个值是一个函数，则会接收被解析的配置作为参数。该函数既可以修改配置并不返回任何东西，也可以返回一个被克隆或合并过的配置版本。

> 更多细节可查阅：[配合 webpack > 简单的配置方式](https://cli.vuejs.org/zh/guide/webpack.html#简单的配置方式)

### 3.2 chainWebpack

- Type: `Function`

是一个函数，会接收一个基于 [webpack-chain](https://github.com/mozilla-neutrino/webpack-chain) 的 `ChainableConfig` 实例。允许对内部的 webpack 配置进行更细粒度的修改。

> 更多细节可查阅：[配合 webpack > 链式操作](https://cli.vuejs.org/zh/guide/webpack.html#链式操作-高级)

### 3.3 css.modules

从 v4 起已弃用，请使用[`css.requireModuleExtension`](https://cli.vuejs.org/zh/config/#css-requireModuleExtension)。 在 v3 中，这个选项含义与 `css.requireModuleExtension` 相反。

### 3.4 css.requireModuleExtension

- Type: `boolean`

- Default: `true`

默认情况下，只有 `*.module.[ext]` 结尾的文件才会被视作 CSS Modules 模块。设置为 `false` 后你就可以去掉文件名中的 `.module` 并将所有的 `*.(css|scss|sass|less|styl(us)?)` 文件视为 CSS Modules 模块。

> [!tip]
> 如果你在 `css.loaderOptions.css` 里配置了自定义的 CSS Module 选项，则 `css.requireModuleExtension` 必须被显式地指定为 `true` 或者 `false`，否则我们无法确定你是否希望将这些自定义配置应用到所有 CSS 文件中。

>   更多细节可查阅：[配合 CSS > CSS Modules](https://cli.vuejs.org/zh/guide/css.html#css-modules)

### 3.5 css.extract

- Type: `boolean | Object`

- Default: 生产环境下是 `true`，开发环境下是 `false`

是否将组件中的 CSS 提取至一个独立的 CSS 文件中 (而不是动态注入到 JavaScript 中的 inline 代码)。

同样当构建 Web Components 组件时它总是会被禁用 (样式是 inline 的并注入到了 shadowRoot 中)。

当作为一个库构建时，你也可以将其设置为 `false` 免得用户自己导入 CSS。

提取 CSS 在开发环境模式下是默认不开启的，因为它和 CSS 热重载不兼容。然而，你仍然可以将这个值显性地设置为 `true` 在所有情况下都强制提取。

### 3.6 css.sourceMap

- Type: `boolean`

- Default: `false`

是否为 CSS 开启 source map。设置为 `true` 之后可能会影响构建的性能。

### 3.7 css.loaderOptions

- Type: `Object`

- Default: `{}`

向 CSS 相关的 loader 传递选项。例如：

  ```js
  module.exports = {
    css: {
      loaderOptions: {
        css: {
          // 这里的选项会传递给 css-loader
        },
        postcss: {
          // 这里的选项会传递给 postcss-loader
        }
      }
    }
  }
  ```

支持的 loader 有：

  - [css-loader](https://github.com/webpack-contrib/css-loader)
  - [postcss-loader](https://github.com/postcss/postcss-loader)
  - [sass-loader](https://github.com/webpack-contrib/sass-loader)
  - [less-loader](https://github.com/webpack-contrib/less-loader)
  - [stylus-loader](https://github.com/shama/stylus-loader)

  另外，也可以使用 `scss` 选项，针对 `scss` 语法进行单独配置（区别于 `sass` 语法）。

>   更多细节可查阅：[向预处理器 Loader 传递选项](https://cli.vuejs.org/zh/guide/css.html#向预处理器-loader-传递选项)

> [!tip]
>  相比于使用 `chainWebpack` 手动指定 loader 更推荐上面这样做，因为这些选项需要应用在使用了相应 loader 的多个地方。

### 3.8 devServer

- Type: `Object`

  [所有 `webpack-dev-server` 的选项](https://webpack.js.org/configuration/dev-server/)都支持。注意：

  - 有些值像 `host`、`port` 和 `https` 可能会被命令行参数覆写。
  - 有些值像 `publicPath` 和 `historyApiFallback` 不应该被修改，因为它们需要和开发服务器的 [publicPath](https://cli.vuejs.org/zh/config/#publicpath) 同步以保障正常的工作。

### 3.9 devServer.proxy

- Type: `string | Object`

如果你的前端应用和后端 API 服务器没有运行在同一个主机上，你需要在开发环境下将 API 请求代理到 API 服务器。这个问题可以通过 `vue.config.js` 中的 `devServer.proxy` 选项来配置。

 `devServer.proxy` 可以是一个指向开发环境 API 服务器的字符串：

  ```js
  module.exports = {
    devServer: {
      proxy: 'http://localhost:4000'
    }
  }
  ```

  这会告诉开发服务器将任何未知请求 (没有匹配到静态文件的请求) 代理到`http://localhost:4000`。

  如果你想要更多的代理控制行为，也可以使用一个 `path: options` 成对的对象。完整的选项可以查阅 [http-proxy-middleware](https://github.com/chimurai/http-proxy-middleware#proxycontext-config) 。

  ```js
  module.exports = {
    devServer: {
      proxy: {
        '/api': {
          target: '<url>',
          ws: true,
          changeOrigin: true
        },
        '/foo': {
          target: '<other_url>'
        }
      }
    }
  }
  ```

### 3.10 parallel

- Type: `boolean`

- Default: `require('os').cpus().length > 1`

是否为 Babel 或 TypeScript 使用 `thread-loader`。该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建。

### 3.11 pwa

- Type: `Object`

向 [PWA 插件](https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa)传递选项。

### 3.12 pluginOptions

- Type: `Object`

这是一个不进行任何 schema 验证的对象，因此它可以用来传递任何第三方插件选项。


# 七 带你用vue撸后台系列

> [!tip]
> [原文传送门](https://juejin.im/post/6844903476661583880#heading-0)
> 大佬的完整项目 [github地址](https://github.com/PanJiaChen/vue-element-admin)


# 八 Vue 踩过的坑点

![](vue.png)

## 1 获取地址参数

### 1.1 使用路由获取页面参数

**在路由中设置**`path`：

```js
{
    path: '/detail/:id/',
    name: 'detail',
    component: detail,
    meta: {
        title: '详情'
    }
}
```

获取参数

```js
let id = this.$route.params.id
```

**备注:** 

1、参数名需要保持一致 

2、如果路由中没有传参（`http://192.168.1.12:8080/#/detail`），会报错，页面无法显示，正常页面为 `http://192.168.1.12:8080/#/detail/234`

**如果有的参数可传可不传**	传参例如：`http://192.168.1.12:8080/#/detail/?id=123`    

获取的时候：

```
let id = this.$route.query.id
```

这样即使取不到参数，页面也不会报错

### 1.2 使用Js获取页面参数 -- Location.href


如果是在普通js文件中，想获取url后面的参数，可以新建一个工具类，utils.js：

```js
/* eslint-disable */
export default{
    getUrlKey: function (name) {
        return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null
    }
}
```

在其他需要获取参数的js中引入

```js
import Vue from 'vue'
import utils from '../../assets/scripts/utils'
// Vue.prototype.$utils = utils // main.js中全局引入
let id = utils.getUrlKey('id')
console.log()
```

**也可以引入 `vue` 插件： `qs`**：利用插件快速获取url中的查询参数

```js
// 安装
npm i qs 
// 引入
import qs from 'qs'

// 方法一：将对象序列化，多个对象之间用&拼接，转换成查询字符串
qs.stringify()	
// 方法二：将序列化的内容拆分成一个个单一的对象，转换成json对象
qs.parse() 
```

**另外，对于中文字符传入 `url` 中时，会出现乱码情况，此时使用 内置函数 `decodeURI` 即可解码**


## 2 实现一段时间请求一次接口（轮询）

**需要注意的一点是  `setTimeOut` 和 `setInterval` 的使用**

**一般都会使用setInterval，但要注意单纯使用它会导致页面卡死**

解决方法如下：

```
window.setInterval(() => {
  setTimeout(fun, 0)
}, 30000)
```

**解释**：`setInterval`不会清除定时器队列，每重复执行1次都会导致定时器叠加，最终卡死你的网页。
但是`setTimeout`是自带清除定时器的。

#### 下面是我使用的方法：

在`mounted`中调用

```js
mounted() {

  this.$socket.emit('connect', 1);
  this.$socket.emit('LIST_EVENT', {
   type: 1,
   storeId: this.storeId,
   data: {}
  });

  this.getListData();
  this.updatedData();
 },
```

`updateData()`中定义了轮询

```js
methods: {

  updatedData() {
   setInterval(()=>{
     setTimeout(this.getListData, 0)
   }, 180000);
  },

  getListData() {
   this.$socket.emit('LIST_EVENT', {
     type: 3,
     storeId: this.storeId,
     data: {}
   });
  }
 }
```

<br>

## 3 Vue 页面指令

### 3.1 `v-loading` 加载

使用`v-loading`在接口为请求到数据之前，显示加载中，直到请求到数据后消失。

```jsx
//全局loading
<template>
    <div v-loading="loading"> </div>
</template>
```

在data 中定义初始化， `loading: false`，同时在`mounted()`中将 `this.loading`设置为true,再去请求接口

在接口的回调函数中，将 `this.loading` 设为`false`，到达效果。

如果写在`template`下的顶层元素上的话，就不会触发全屏`loading`

```jsx
//局部loading
<template>
    <div> 
        <section v-loading="loading"></section>
    </div>
</template>
```

### 3.2 `v-cloak` 处理屏幕闪动

可以使用 `v-cloak` 指令设置样式，这些样式会在 Vue 实例编译结束时，从绑定的 HTML 元素上被移除。

当网络较慢，网页还在加载 Vue.js ，而导致 Vue 来不及渲染，这时页面就会显示出 Vue 源代码。我们可以使用 `v-cloak` 指令来解决这一问题。

下面的代码会在页面初始化的一瞬间展示出 `vue源代码` ：

```vue
// html
<div id="app">
    {{context}}
</div>

// js
<script>
    var app = new Vue({
        el: '#app',
        data: {
            context:'互联网头部玩家钟爱的健身项目'
        }
    });
</script>
```

使用 `v-cloak` 解决：

```vue
// html
<div id="app" v-cloak>
    {{context}}
</div>

// css
[v-cloak]{
    display: none;
}
```

在简单项目中，使用  v-cloak 指令是解决屏幕闪动的好方法。

但在大型、工程化的项目中（`webpack`、`vue-router`）只有一个空的 div 元素，元素中的内容是通过路由挂载来实现的，这时我们就不需要用到 v-cloak 指令。

3、`v-model` d

<br>

## 4 Vue中的事件

### 4.1 Vue 键盘事件

```js
@keydown（键盘按下时触发）
@keypress(键盘按住时触发)
@keyup(键盘弹起)
```

获取按键的键码 `e.keyCode`

```js
@keyup.13   按回车键
@keyup.enter 回车
@keyup.up   上键
@keyup.down  下键
@keyup.left   左键
@keyup.right   右键
@keyup.delete   删除键
```

#### @input事件 

input 事件 结合了 keyup事件 和 change事件, 会在 keyup 时判断值是否发生变化, 变化了则触发该事件

### 4.2 模拟事件

```js
// 模拟点击事件
this.$refs.refName.$el.click();
// 模拟失去焦点事件
this.$refs.refName.blur();
```

#### 获取焦点

```vue
<input v-model="inputvalue"  ref="inputVal"/>
<button @click="addItem">提交</button>

 <script>
 var todolistApp = new Vue({
     el:'#todolistHome',
     data:{
         inputvalue:"",
         list:[],
         picFocusStatus: true
     },
     methods:{
         addItem:function(){
             //然后调用focus方法
             this.$nextTick(() =>{
             	this.$refs.inputVal.focus()
             })
         }
     }
 })
 </script>
```

### 4.3 在 Vue 事件函数中的传值

**一种常见的方法**就是在事件函数中显式声明 `$event`

```js
@click="run($event)"
```

**另一种方法是利用箭头函数**，代码如下：

```vue
// 默认值 + 自定义值
<el-autocomplete
	v-model="scoped.row.goodsName"
	@select="(value) => handleTypeFromName(value, scoped.$index)">
</el-autocomplete>

<script>
methods: {
    handleTypeFromName(val, index) {
        ......
    },
}
</script>
```

### 4.4 滥用事件和修饰符导致的Bug

下面的 `Bug` 来自于公司后台系统，算是一个小 `Bug`，不清楚写这段代码的人在想啥。

大概描述就是：只允许输入数字的输入框，可以在中文输入法状态下输入字母

![](bug-1.png)

![](bug-2.png)

为了修改这个 `Bug`，我最开始用了最省事的办法：

```js
beforeUpdate() {
    if (this.selectGoodsList.length > 0) {
      const valueX = this.selectGoodsList[this.xyPositionGoodsIndex].xPosition;
      const valueY = this.selectGoodsList[this.xyPositionGoodsIndex].yPosition;
      const patMustNumber = /\D/g;
      if (valueX !== null && valueX !== '' && valueX !== undefined) {
        this.selectGoodsList[this.xyPositionGoodsIndex]
            .xPosition = String(valueX).replace(patMustNumber, '');
      }
      if (valueY !== null && valueY !== '' && valueY !== undefined) {
        this.selectGoodsList[this.xyPositionGoodsIndex]
            .yPosition = String(valueY).replace(patMustNumber, '');
      }
    }
  },
```

虽然能解决问题，但没有从根本上解决问题。

**究其原因，需要了解两个修饰符 <a href="#native">`.native`</a> 和<a href="#number">`.number`</a> ，以及 `v-model` 的实现原理、上面提到的事件传值**

> 具体原因没有去定位，猜测应该是 `native` 使用不当或者是 `v-model` 与 `input` 事件处理冲突
>
> 还有一点是，去确认 `keyup/keydown` 事件是否存在

#### `v-model` 的实现原理

`v-model` 其实是个语法糖，它实际上是做了两步动作：

**1、绑定数据value**

**2、触发输入事件input**

也就是说，v-model等同于：

```vue
<template>
  <div id="app">
    {{username}} <br/>
    <input type="text" :value="username" @input="username=$event.target.value">
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return {
      username:''
    }
  }
}
</script>
```

明白了这一点非常有用，我们可以在自定义的 `input组件` 中使用它：

```vue
<template>
  <div id="app">
    {{username}} <br/>
    <my-input type="text" v-model="username"></my-input>
  </div>
</template>

<script>
import myinput from './components/myinput'
export default {
  name: 'App',
  components:{'my-input': myinput},
  data(){
    return {
      username:''
    }
  }
}
</script>
```

**myinput.vue：**

```vue
<template>
    <div class="my-input">
        <input type="text" @input="handleInput"/>
    </div>
</template>

<script>
    export default {
        name: "myinput",
        props:{
            value:{ //获取父组件的数据value
                type:String,
                default:''
            }
        },
        methods:{
            handleInput(e){
                this.$emit('input',e.target.value) //触发父组件的input事件
            }
        }
    }
</script>
```

**解决输入框输入限制问题的示例**

![](bug3.png)

![](bug4.png)

<br>

## 5  Vue中使用定时器

Js中定时器有两种，一个是循环执行**setInterval**，另一个是定时执行**setTimeout**

**要注意：在页面销毁的时候清除掉**

### 5.1 循环执行（setInterval）

顾名思义，循环执行就是设置一个时间间隔，每过一段时间都会执行一次这个方法,直到这个定时器被销毁掉

用法是**setInterval**（“方法名或方法”，“延时”）， 第一个参数为方法名或者方法，注意为方法名的时候不要加括号,第二个参数为时间间隔

```js
<template>
  <section>
    <h1>hello world~</h1>
  </section>
</template>
<script>
  export default {
    data() {
      return {
        timer: '',
        value: 0
      };
    },
    methods: {
      get() {
        this.value ++;
        console.log(this.value);
      }
    },
    mounted() {
      this.timer = setInterval(this.get, 1000);
    },
    beforeDestroy() {
      clearInterval(this.timer);
    }
  };
</script>
```

### 5.2 定时执行（setTimeout）

定时执行**setTimeout**是设置一个时间，等待时间到达的时候只执行一次，但是执行完以后定时器还在，只是没有运行

用法是**setTimeout**(“方法名或方法”, “延时”); 第一个参数为方法名或者方法，注意为方法名的时候不要加括号,第二个参数为时间间隔

```js
<template>
  <section>
    <h1>hello world~</h1>
  </section>
</template>
<script>
  export default {
    data() {
      return {
        timer: '',
        value: 0
      };
    },
    methods: {
      get() {
        this.value ++;
        console.log(this.value);
      }
    },
    mounted() {
      this.timer = setTimeout(this.get, 1000);
    },
    beforeDestroy() {
      clearTimeout(this.timer);
    }
  };
</script>
```

### 5.3 在 `promise` 中使用 `setTimeout` 

先看下面两对代码的区别：

```js
function getData() {
	return new Promise((resolve, reject) => {
	  setTimeout(resolve('hello'), 2000)
	})
}
getData().then(res => {
  console.log(res)
})
// 立马输出 hello
```

```js
// code2

function getData() {
	return new Promise((resolve, reject) => {
	  setTimeout(resolve, 2000, 'hello')
	})
}
getData().then(res => {
  console.log(res)
})
// 2s后输出hello
```

这个差异就是 **`func()` 和 `func` 的区别，`setTimeout` 的第一个参数是 `func`，如果用 `func()` 相当于其返回值为第一个参数**

这个地方应该是一个函数 `func` ，如果你传的是 `func()` ，代码解析器执行到此处的时候，就会立即执行这个函数，起不到延时的效果了

#### 常见的使用场景

**实现一个 sleep 函数**

```js
// 1s 后执行的代码
const sleep = (time) => {
  return new Promise(resolve => setTimeout(resolve, time))
}

sleep(1000).then(() => {
  // 这里写你的操作
})

// 代码延时
const sleep = (time) => {
  return new Promise(resolve => setTimeout(resolve, time))
}

async function sleepAsync() {
  console.log('1')
  let res = await sleep(1000)
  console.log('2')
  return res
}

sleepAsync()
```

## 6 Vue 中的修饰符

### <a name="native">.native 修饰符</a>

在某个组件的根元素上监听一个原生事件。可以使用 `v-on` 的修饰符 `.native` 

**通俗点讲**：就是在父组件中给子组件绑定一个原生的事件，就将子组件变成了普通的HTML标签，不加`. native`事件是无法触发的。

可以理解为该修饰符的作用就是把一个vue组件转化为一个普通的HTML标签，并且该修饰符对普通HTML标签是没有任何作用的。

`native `在 `Vue.js` 官方的大致意思是监听自定义标签根标签的事件，将原生事件绑定到组件上，比如 `a标签` 可以直接绑定原生事件，但是如果你通过自定义封装了button标签，起成了名字myself-abutton，这时候绑定事件就需要加上 `native` 了，下面写一个简单的例子方便理解：

#### 例子

四个按钮，分别是普通标签不加 `native` 和加 `native`，自定义标签不加 `native` 和加 `native`

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <title>JS Bin</title>
<script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.0.3/vue.js"></script> 
</head>
<body>
<div id="app">
  <button @click="add('1')">普通的html标签，不包含native的按钮</button><br/>
  <button @click.native="add('2')">普通的html标签，包含native的按钮</button><br/>
  <myself-button @click="add('3')"/></myself-button><br/>
  <myself-button @click.native="add('4')"/></myself-button>
  <div>
</body>
  <script>
    Vue.component('myself-button', {
        template: `<button>我是自定义的标签</button>`
    });
    var vm=new Vue({
      el:"#app",
      data:{},
      methods:{
        add:function(obj){
          console.log(obj+'我触发了');
        },
      }
    });
  </script>
</html>
```

![](native.png)

**也就是说，不恰当使用即会导致错误！**

### `.stop` 修饰符

可以用来**阻止冒泡事件的发生**

```html
<a v-on:click.stop="doThis"></a>
```

### `v-model`的修饰符

#### 1、`.lazy `修饰符

v-model 指令默认会在 input 事件中加载输入框中的数据（中文输入法中输入拼音的过程除外）。我们可以使用 `.lazy` 懒加载修饰符，让其只在 change 事件中再加载输入框中的数据。

```xml
// html：
<div id="app">
    <input type="text" v-model.lazy="content" placeholder="请输入" value="初始值">
    <p>输入框：{{content}}</p>
</div>
```

```csharp
// js
var app = new Vue({
    el: '#app',
    data: {
        content: ''
    }
});
```

效果：![](xiushifu-lazy.webp)

使用 `.lazy` 懒加载修饰符之后，只有在输入框失去焦点或者按回车键时才会更新 content 值

#### <a name="number">2、`.number` 修饰符</a>

输入框输入的内容，即使是数字，默认也是 string 类型

在此，我们可以使用 `.number` 修饰符让其转换为 number 类型——

```xml
// html：
<div id="app2">
    <input type="number" v-model.number="content" placeholder="请输入" >
    <p>输入值：{{content}}，输入类型：{{typeof content}}</p>
</div>
```

```csharp
// js：
var app2 = new Vue({
    el: '#app2',
    data: {
        content: 1
    }
});
```

> **问题**：表单验证正则匹配数字，但输入汉字仍然通过
>
> **原因**：`.numbe`r会将input里的值用`parseFloat()`转化，这样用正则匹配数字后，输入的即使是：`123四五六`；也不会报错，因为`123四五六`被转换成了`123`

#### 3、`.trim` 修饰符

使用 ·.trim` 修饰符可以自动过滤掉输入框的首尾空格。

```xml
// html：
<div id="app3">
    <input type="text" v-model.trim="content" placeholder="请输入" value="初始值">
    <p>输入框：{{content}}</p>
</div>
```

```csharp
// js：
var app3 = new Vue({
    el: '#app3',
    data: {
        content: ''
    }
});
```

#### 4、`.sync` 修饰符

这个修饰符就是 `vue` 封装，子组件要修改父组件传过来的动态值的语法糖，省去了父组件需要写的方法，但是子组件 `emit` 时要加上 `update`

官方解释：↓

在有些情况下，我们可能需要对一个 `prop` 进行“双向绑定”。不幸的是，真正的双向绑定会带来维护上的问题，因为子组件可以修改父组件，且在父组件和子组件都没有明显的改动来源。

```vue
// 这里父组件，要给子组件传一个title的值
<template>
    <div>  
        <t-title :title.sync="fatherTitle"></t-title>
    </div>
</template>
<script>
import tTitle from './blocks/list';
export default {
    name: 'test1',
    components: {  tTitle },
    data() {
        return {
            fatherTitle: '父组件给的标题'
        };
    },
}
</script>
```

这时候当我们在子组件内部的方法想去修改这个标题

```vue
// 子组件
<template>
    <div>
        <h3>{{ title }}</h3>
        <button @click="changeTitle">改变</button>
    </div>
</template>
<script>
export default {
    props:{
        title: {type: String, default: '默认值11'}
    },
    methods: {
        changeTitle() {
            this.$emit("update:title", "子组件要改自己的标题");
        }
    }
};
</script>
 
// 这里关键就是emit里的参数要写成'update'+ ':' +'要修改的props'
// 这样就可以了，父组件就不要再去写个方法接受这个值然后再去改传的参数
```



## 7 `vue` 中集成其他库

### 7.1 引入 font-awesome

#### 全局引入

```csharp
npm install font-awesome --save
```

 在入口 `js` 引入

```csharp
import  'font-awesome/css/font-awesome.min.css' 
```

使用

```html
<i class="fa fa-camera-retro"></i>
```

#### 字体文件引入

从官网下载了相应的字体文件，并放置在项目目录里

```css
@font-face {

 font-family: 'FontAwesome';
 src: url('./fonts/fontawesome-webfont.eot?v=4.2.0');
 src: url('./fonts/fontawesome-webfont.eot?#iefix&v=4.2.0') format('embedded-opentype'), url('./fonts/fontawesome-webfont.woff?v=4.2.0') format('woff'), url('./fonts/fontawesome-webfont.ttf?v=4.2.0') format('truetype'), url('./fonts/fontawesome-webfont.svg?v=4.2.0#fontawesomeregular') format('svg');

 font-weight: normal;
 font-style: normal
}

.fa {
     display: inline-block;
     font: normal normal normal 14px/1 FontAwesome;
     font-size: inherit;
     text-rendering: auto;
     -webkit-font-smoothing: antialiased;
     -moz-osx-font-smoothing: grayscale
}
```

**另外，发现了一种解决 `<i class="fa fa-xxx"></i>` 不能正确显示相应图标的解决方法**

如下例：

```css
.fa-user:before {
 	content: "\f007"
}

.fa-edit:before,.fa-pencil-square-o:before {
	content: "\f044"
}

.fa-sign-out:before {
 	content: "\f08b"
}
```

![](font-awesome.png)

### 7.2 引入 Lodash

> 参考 [简书](https://www.jianshu.com/p/907e8a0ee5d7)

**安装**

```markdown
npm i lodash -S
```

**引入及使用——方法一**

```js
// main.js
import lodash from 'lodash';

// 页面中
import { cloneDeep } from 'lodash';
```

**引入及使用——方法二**

```js
// main.js
import _ from 'lodash'
Vue.prototype._ = _

// 使用
this._.debounce(this.handleClick,1000,false)
```

**引入及使用——方法三**

```
// 引入
let _ = require('lodash')

// 使用
_.debounce(this.handleClick,1000,false)
```

### 7.3 引入 Axios

**安装**

```bash
npm install axios --save
```

**引入**

```js
// 在使用时引入axios，下面再 http.js 中引入
import axios from "axios"; 

// 也可以全局注册依赖
import axios from ‘axios’
Vue.prototype.$axios = axios

//全局注册，使用方法为: this.$axios
```

### 7.4 [引入 Dayjs](https://www.npmjs.com/package/dayjs)

**安装**

```bash
npm install dayjs --save
```

**引入**

```js
import dayjs from 'dayjs'
Vue.prototype.$dayjs = dayjs
```

<br/>

## 8 Vue 中导出文件 `get&post`

导出文件最简单的方式就是 get 请求，代码如下：

```js
toDownload() {
	window.open(`${this.serverUrl}/report/downloadReportTemplate`);
}
```

`post` 请求的如下：

```js
exportReport(index) {
    this.$http.post.exportReportPost(this.tableData[index].id, {
    	responseType: 'blob'
    }).then((res) => {
        // console.log('响应状态', res);
        let blob = new Blob([res], {type: "application/force-download"})
        // console.log(blob);
        let fileReader = new FileReader();
        fileReader.readAsDataURL(blob);
        fileReader.onload = (e) => {
            let a = document.createElement('a');
            a.download = `检测明细.xlsx`;
            a.href = e.target.result;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    }).catch(err => {
    	console.log(err);
    })
}
```

## 9 Vue 用 `import` 引入的函数

在页面中使用到的非库函数，必须在 `methods` 中定义，否则为未找到：

```js
import { formatDate, formatDateTime } from '@/filters/formatDate'
// utils
methods: {
	formatDate(val) {
        return formatDate(val);
    },
    formatDateTime(val) {
        return formatDateTime(val);
    },
}
```

## 10 vue Props类型及默认值

```js
props: {
    demoString: {
        type: String,
        default: ''
    },
    demoNumber: {
        type: Number,
        default: 0
    },
    demoBoolean: {
        type: Boolean,
        default: true
    },
    demoArray: {
        type: Array,
        default: () => []
    },
    demoObject: {
        type: Object,
        default: () => ({})
    },
    demoFunction: {
        type: Function,
        default: function () { }
    }
}
```

其中，默认值为对象时，不能写成

```js
demoObject: {
    type: Object,
    default: () => { }
}
```

## 11 Vue 动态引入图片地址

在 `vue` 动态引入图片地址时出现报错

```js
Error in created hook: "Error: Cannot find module '../../assets/images/ver6/details/1_2/1_2.png'"
```

都知道动态绑定图片是像这么写的：

```vue
<img :src="detailPic" alt="">
```

**问题就在于 `detailPic` 的值是什么？**

```vue
// 直接用src是无效的，需要使用v-bind动态加载,src应该是变量
<img :src="../assets/product2.jpg">

——> 给变量用 路径字符串赋值之后，即 detailPic = "../assets/product2.jpg"
<img :src="detailPic">

// 图片仍然无法加载出来，需要使用require才可以
detailPic = require("../assets/product2.jpg");
<img :src="detailPic">

——> 此时，就会出现写在开头的报错
报错原因是找不到相应 moulde,真正原因是 require 的参数格式应该是 path
```

> 答案来自原文[此处](https://blog.csdn.net/hzxonlineok/article/details/96307270)

### 解决办法一：背景图方式

```vue
<div :style="{backgroundImage: 'url(' + imgPath + ')'}"></div>
```

### 解决办法二：静态图片的方式

把图片放到 `src` 同级的 `static` 目录，比如图片放在 `static/a.png`

> `build/build.js` 文件中有一段代码是把 static 目录拷贝到 dist/static

### 解决办法三：正确使用 `require`

关于es6的require添加动态变化的路径，直接静态写死是不会有错误的：

```js
let imgUrl = require('../images/a.png');
```

但是如果尝试：

```js
var imgUrl = "../images/b.jpg";
let img = require(imgUrl);

// 或者这样：
require(`../../assets/images/${showAllExpended?'unfold':'up'}.png`)
```

那就只能凉凉的报错咯**（因为require它是打包工具所需要的标识，你搞成运行时通过变量去定义的话，它就没办法打包了)**

而 `require` 里的正确的格式必须是 `path`

```js
var imgUrl = "a";
let img = require('../images/'+imgUrl+'.jpg');

// 或者
var imgUrl = "b.jpeg";
let img = require('../images/'+imgUrl);

// 个人代码
 this.detailPic = require('../../assets/' + this.detailPngPath);
```

## 12 Vue 动态添加样式

**注意：**

1、凡是有 `-` 的 `style` 属性名都要变成驼峰式，比如 `font-size` 要变成`fontSize`

2、除了绑定值，其他的属性名的值要用引号括起来，比如`backgroundColor:'#00a2ff'`，而不是 `backgroundColor:#00a2ff`

### 【对象】

```js
html :style="{ color: activeColor, fontSize: fontSize + 'px' }"
html :style="{color:(index==0?conFontColor:'#000')}"
```

### 【数组】

```js
html :style="[baseStyles, overridingStyles]"
html :style="[{color:(index==0?conFontColor:'#000')},{fontSize:'20px'}]"
```

### 【三目运算符】

```js
html :style="{color:(index==0?conFontColor:'#000')}"
html :style="[{color:(index==0?conFontColor:'#000')},{fontSize:'20px'}]"
```

### 【多重值】

此时，浏览器会根据运行支持情况进行选择

```js
html :style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }"
```

### 【绑定data对象】

```js
html :style="styleObject"

data() {
	return{
		styleObject: {
			color: 'red',
			fontSize: '13px'
		}  
	}
}
```

## 13 Vue 渲染函数 & JSX

> [!tip] [vue 官网的渲染函数的解读](https://cn.vuejs.org/v2/guide/render-function.html)
> [基础](https://cn.vuejs.org/v2/guide/render-function.html#基础)

Vue 推荐在绝大多数情况下使用模板来创建你的 HTML。然而在一些场景中，你真的需要 JavaScript 的完全编程的能力。这时你可以用**渲染函数**，它比模板更接近编译器。

让我们深入一个简单的例子，这个例子里 `render` 函数很实用。假设我们要生成一些带锚点的标题：

```html
<h1>
  <a name="hello-world" href="#hello-world">
    Hello world!
  </a>
</h1>
```

对于上面的 HTML，你决定这样定义组件接口：

```vue
<anchored-heading :level="1">Hello world!</anchored-heading>
```

当开始写一个只能通过 `level` prop 动态生成标题 (heading) 的组件时，你可能很快想到这样实现：

```vue
<script type="text/x-template" id="anchored-heading-template">
  <h1 v-if="level === 1">
    <slot></slot>
  </h1>
  <h2 v-else-if="level === 2">
    <slot></slot>
  </h2>
  <h3 v-else-if="level === 3">
    <slot></slot>
  </h3>
  <h4 v-else-if="level === 4">
    <slot></slot>
  </h4>
  <h5 v-else-if="level === 5">
    <slot></slot>
  </h5>
  <h6 v-else-if="level === 6">
    <slot></slot>
  </h6>
</script>
Vue.component('anchored-heading', {
  template: '#anchored-heading-template',
  props: {
    level: {
      type: Number,
      required: true
    }
  }
})
```

这里用模板并不是最好的选择：不但代码冗长，而且在每一个级别的标题中重复书写了 `<slot></slot>`，在要插入锚点元素时还要再次重复。

虽然模板在大多数组件中都非常好用，但是显然在这里它就不合适了。那么，我们来尝试使用 `render` 函数重写上面的例子：

```js
Vue.component('anchored-heading', {
  render: function (createElement) {
    return createElement(
      'h' + this.level,   // 标签名称
      this.$slots.default // 子节点数组
    )
  },
  props: {
    level: {
      type: Number,
      required: true
    }
  }
})
```

看起来简单多了！这样代码精简很多，但是需要非常熟悉 Vue 的实例 property。在这个例子中，你需要知道，向组件中传递不带 `v-slot` 指令的子节点时，比如 `anchored-heading` 中的 `Hello world!`，这些子节点被存储在组件实例中的 `$slots.default` 中。如果你还不了解，**在深入渲染函数之前推荐阅读[实例 property API](https://cn.vuejs.org/v2/api/#实例-property)。**

