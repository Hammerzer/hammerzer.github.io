---
title: Cocos上路
description: Cocos 引擎入门干货，记录学习与实操核心要点。
urlname: cocos-start
date: 2020-12-10
tags:
  - Cocos
  - 游戏引擎
categories:
  - 游戏开发
draft: false
---


> [!note] 新手上路，请注意避让！
> 
> [技术文档](https://www.cocos.com/docs)
> 
> [cocos账号中心](https://account.cocos.com/#/game/game_list)
> 
> [演示案例](https://cocos-creator.github.io/example-cases/)
> 
> [演示案例——摘星星](http://fbdemos.leanapp.cn/star-catcher/)
> 
> [bilibili教程](https://www.bilibili.com/video/BV1sA411Y7x4?p=2)    [教程文件下载](http://afanihao.cn/)
> 
> [Cocos API](https://docs.cocos.com/creator/api/zh/)
> 
> [事件系统](https://www.jianshu.com/p/cfb524ecce31?utm_campaign=maleskine...&utm_content=note&utm_medium=seo_notes&utm_source=recommendation)
> 
> [Cocos 中文社区](https://forum.cocos.org/)

# 现场感悟

### 2020/12/25

​		这是一个相对成熟的游戏引擎（？），也是，可能比其他的好很多，但是毕竟是人烟稀少的土地，遇到的问题轻则头疼绕道，重则直接嗝屁，都是巴戈，真想口吐芬芳

### 2021/1/19

​		真的是吐了，这个游戏引擎莫名其妙出现巴戈，然后莫名其妙地重启之后消失，有咩有考虑过，中间的这个过程让宝宝好痛苦，绝对是一种被玩弄的感觉。

​		而且，出现巴戈的 `sourceMap` 提示根本没有办法溯源，去搜索相应的报错信息也是一无所获，这个社区真的可以说没有！再做两三个游戏就塞`Goodbye`了.

​		记住，出现异常报错之后：先重启，先重启，先重启引擎！！！

![](cocos-bug1.png)

### 2021/1/22

针对异常的报错，可以排查是否出现如下的问题：

- 重启引擎能否解决
- 在某个节点上，是否绑定了正确的脚本

## 翻车现场

> `copy` 一波官方文档，说实话，官方文档写的很接地气，但是总有一些坑，让我掉进去了 `-_-`
>
> 总之，下面是官方文档的补充坑点

# 一、缓动系统

## 链式 API

`cc.tween` 的每一个 API 都会在内部生成一个 action，并将这个 action 添加到内部队列中，在 API 调用完后会再返回自身实例，这样就可以通过链式调用的方式来组织代码。

`cc.tween` 在调用 start 时会将之前生成的 action 队列重新组合生成一个 cc.sequence 队列，所以 `cc.tween` 的链式结构是依次执行每一个 API 的，也就是会执行完一个 API 再执行下一个 API。

```js
cc.tween(this.node)
    // 0s 时，node 的 scale 还是 1
    .to(1, { scale: 2 })
    // 1s 时，执行完第一个 action，scale 为 2
    .to(1, { scale: 3 })
    // 2s 时，执行完第二个 action，scale 为 3
    .start()
    // 调用 start 开始执行 cc.tween
```

## 设置缓动属性

`cc.tween` 提供了两个设置属性的 API：

- `to`：对属性进行绝对值计算，最终的运行结果即是设置的属性值，即改变到某个值。
- `by`：对属性进行相对值计算，最终的运行结果是设置的属性值加上开始运行时节点的属性值，即变化值。

```js
cc.tween(node)
  .to(1, {scale: 2})      // node.scale === 2
  .by(1, {scale: 2})      // node.scale === 4 (2 + 2)
  .by(1, {scale: 1})      // node.scale === 5
  .to(1, {scale: 2})      // node.scale === 2
  .start()
```

## 支持缓动任意对象的任意属性

```js
let obj = { a: 0 }
cc.tween(obj)
  .to(1, { a: 100 })
  .start()
```

## 同时执行多个属性

```js
cc.tween(this.node)
    // 同时对 scale, position, rotation 三个属性缓动
    .to(1, { scale: 2, position: cc.v2(100, 100), rotation: 90 })
    .start()
```

## easing

你可以使用 easing 来使缓动更生动，`cc.tween` 针对不同的情况提供了多种使用方式。

```js
// 传入 easing 名字，直接使用内置 easing 函数
cc.tween().to(1, { scale: 2 }, { easing: 'sineOutIn'})

// 使用自定义 easing 函数
cc.tween().to(1, { scale: 2 }, { easing: t => t*t; })

// 只对单个属性使用 easing 函数
// value 必须与 easing 或者 progress 配合使用
cc.tween().to(1, { scale: 2, position: { value: cc.v3(100, 100, 100), easing: 'sineOutIn' } })
```

Easing 类型说明可参考 [API 文档](https://docs.cocos.com/creator/api/zh/classes/Easing.html)。

## 自定义 progress

相对于 easing，自定义 progress 函数可以更自由的控制缓动的过程。

```js
// 对所有属性自定义 progress
cc.tween().to(1, { scale: 2, rotation: 90 }, {
  progress: (start, end, current, ratio) => {
    return start + (end - start) * ratio;
  }
})

// 对单个属性自定义 progress
cc.tween().to(1, {
  scale: 2,
  position: {
    value: cc.v3(),
    progress: (start, end, current, t) => {
      // 注意，传入的属性为 cc.Vec3，所以需要使用 Vec3.lerp 进行插值计算
      return start.lerp(end, t, current);
    }
  }
})
```

## 复制缓动

clone 函数会克隆一个当前的缓动，并接受一个 target 作为参数。

```js
// 先创建一个缓动作为模板
let tween = cc.tween().to(4, { scale: 2 })

// 复制 tween，并使用节点 Canvas/cocos 作为 target
tween.clone(cc.find('Canvas/cocos')).start()
// 复制 tween，并使用节点 Canvas/cocos2 作为 target
tween.clone(cc.find('Canvas/cocos2')).start()
```

## 插入其他的缓动到队列中

你可以事先创建一些固定的缓动，然后通过组合这些缓动形成新的缓动来减少代码的编写。

```js
let scale = cc.tween().to(1, { scale: 2 })
let rotate = cc.tween().to(1, { rotation: 90})
let move = cc.tween().to(1, { position: cc.v3(100, 100, 100)})

// 先缩放再旋转
cc.tween(this.node).then(scale).then(rotate)
// 先缩放再移动
cc.tween(this.node).then(scale).then(move)
```

## 并行执行缓动

`cc.tween` 在链式执行时是按照 sequence 的方式来执行的，但是在编写复杂缓动的时候可能会需要同时并行执行多个队列，`cc.tween`提供了 parallel 接口来满足这个需求。

```js
let t = cc.tween;
t(this.node)
    // 同时执行两个 cc.tween
    .parallel(
        t().to(1, { scale: 2 }),
        t().to(2, { position: cc.v2(100, 100) })
    )
    .call(() => {
        console.log('All tweens finished.')
    })
    .start()
```

## 回调

```js
cc.tween(this.node)
    .to(2, { rotation: 90})
    .to(1, { scale: 2})
    // 当前面的动作都执行完毕后才会调用这个回调函数
    .call(() => { cc.log('This is a callback') })
    .start()
```

## 重复执行

repeat/repeatForever 函数会将  <span style="color:red;font-weight:bold;">前一个</span>   action 作为作用对象。但是如果有参数提供了其他的 action 或者 tween，则 repeat/repeatForever 函数会将传入的 action 或者 tween 作为作用对象。

```js
cc.tween(this.node)
    .by(1, { scale: 1 })
    // 对前一个 by 重复执行 10次
    .repeat(10)
    // 最后 node.scale === 11
    .start()

// 也可以这样用
cc.tween(this.node)
    .repeat(10,
        cc.tween().by(1, { scale: 1 })
    )
    .start()

// 一直重复执行下去， 注意该  repeatForever() 只会重复最后一个 tween
cc.tween(this.node)
    .by(1, { scale: 1 })
    .repeatForever()
    .start()
```

## 延迟执行

```js
cc.tween(this.node)
    // 延迟 1s
    .delay(1)
    .to(1, { scale: 2 })
    // 再延迟 1s
    .delay(1)
    .to(1, { scale: 3 })
    .start()
```

# 二、定时器

首先，先创建一个指向某个组件的变量，变量名为 component。

> 其中 component 属于

**1、开始一个计时器**

```js
 component.schedule(function() {
     // 这里的 this 指向 component
     this.doSomething();
 }, 5);
```

上面这个计时器将每隔 5s 执行一次。

**2、更灵活的计时器**

```js
 // 以秒为单位的时间间隔
 var interval = 5;
 // 重复次数
 var repeat = 3;
 // 开始延时
 var delay = 10;
 component.schedule(function() {
     // 这里的 this 指向 component
     this.doSomething();
 }, interval, repeat, delay);
```

上面的计时器将在 10 秒后开始计时，每 5 秒执行一次回调，执行 3 + 1 次。

**3、只执行一次的计时器（快捷方式）**

```js
 component.scheduleOnce(function() {
     // 这里的 this 指向 component
     this.doSomething();
 }, 2);
```

上面的计时器将在两秒后执行一次回调函数，之后就停止计时。

**4、取消计时器**

开发者可以使用回调函数本身来取消计时器：

```js
 this.count = 0;
 this.callback = function () {
     if (this.count === 5) {
         // 在第六次执行回调时取消这个计时器
         this.unschedule(this.callback);
     }
     this.doSomething();
     this.count++;
 }
 component.schedule(this.callback, 1);
```

**注意**：组件的计时器调用回调时，会将回调的 `this` 指定为组件本身，因此回调中可以直接使用 `this`。

下面是 Component 中所有关于计时器的函数：

- `schedule`：开始一个计时器
- `scheduleOnce`：开始一个只执行一次的计时器
- `unschedule`：取消一个计时器
- `unscheduleAllCallbacks`：取消这个组件的所有计时器

这些 API 的详细描述都可以在 [Component API](https://docs.cocos.com/creator/api/zh/classes/Component.html) 文档中找到。

除此之外，如果需要每一帧都执行一个函数，请直接在 Component 中添加 `update` 函数，这个函数将默认被每帧调用，这在 [生命周期文档](https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html#update) 中有详细描述。

**注意：`cc.Node` 不包含计时器相关 API**



## 冷知识

### 1、构建时的参数含义

**MD5 cache：**使用creator构建web平台时为了使用玩家可以及时更新修改，可以使用MD5 cache功能，便会在构建出来的文件名称中加上 `md5` 值。

值得注意的是，若使用 `build-templates`，需要保证不带 MD5 值，因为在模板 `index.js` 中把 `mian.js` 路径和名称是写死的。

### 2、 加载远程资源

> [官方文档 ](http://docs.cocos.com/creator/manual/zh/scripting/dynamic-load-resources.html#%E5%8A%A0%E8%BD%BD%E8%BF%9C%E7%A8%8B%E8%B5%84%E6%BA%90%E5%92%8C%E8%AE%BE%E5%A4%87%E8%B5%84%E6%BA%90)中是这样说的
>
> 查找了相关动态加载的文档如下：
>
> [Cocos Creator 资源管理AssetManager](https://blog.csdn.net/qq_43287088/article/details/107172955)
>
> [细谈cocos中sprite、texture和SpriteFrame](https://blog.csdn.net/weixin_36760331/article/details/85766057)
>
> 本人在使用过程中，`vscode` 一直报错，后来功能却可以正常是实现

```js
// 远程 url 带图片后缀名
var remoteUrl = "http://unknown.org/someres.png";
cc.assetManager.loadRemote(remoteUrl, function (err, texture) {
    // Use texture to create sprite frame
});

// 远程 url 不带图片后缀名，此时必须指定远程图片文件的类型
remoteUrl = "http://unknown.org/emoji?id=124982374";
cc.assetManager.loadRemote(remoteUrl, {ext: '.png'}, function () {
    // Use texture to create sprite frame
});

// 用绝对路径加载设备存储内的资源，比如相册
var absolutePath = "/dara/data/some/path/to/image.png"
cc.assetManager.loadRemote(absolutePath, function () {
    // Use texture to create sprite frame
});

// 远程音频
remoteUrl = "http://unknown.org/sound.mp3";
cc.assetManager.loadRemote(remoteUrl, function (err, audioClip) {
    // play audio clip
});

// 远程文本
remoteUrl = "http://unknown.org/skill.txt";
cc.assetManager.loadRemote(remoteUrl, function (err, textAsset) {
    // use string to do something
});
```

**个人的需求**：

加载远程 `url` 不带图片后缀名，获取图片之后动态替换原图片

<u>但是，如果远程 `url` 带图片后缀，绝对不可再次声明图片后缀</u>

```js
cc.assetManager.loadRemote(res['couponQRCode'], {ext: '.png'}, (err, texture) => {
    // Use texture to create sprite frame
    const sp = new cc.SpriteFrame(texture); // 这个地方一直报错 类型错误
    this.gameEnd.getChildByName('rewards').getChildByName('qrcode').getComponent(cc.Sprite).spriteFrame = sp;
});
```


