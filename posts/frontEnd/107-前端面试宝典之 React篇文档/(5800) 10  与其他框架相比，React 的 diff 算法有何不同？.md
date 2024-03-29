# 10与其他框架相比，React的diff算法有何不同？

diff 算法通常被认为 React 的核心点，在面试中很受重视。之前，关于 diff 算法的问法仅仅停留在"React 的 diff 算法的流程是什么"。但近几年有所变化，问题开始变得多样了，一个比较常见的场景是对比其他框架进行阐述。这一讲我们来一起探讨下这个问题应该如何回答。

### 破题

这个题目虽然有对比，但本质上仍然是一道原理题。根据我们之前学习的方法论，原理题需要按照"**讲概念** ，**说用途** ，**理思路** ，**优缺点** ，**列一遍**"的思路来答题。

针对 React 而言，diff 算法是对**知识深度的考核** 。面试官考察的不仅仅是你会用就可以，更重要的是你在使用中有没有思考，对 diff 算法有没有透彻的理解，这是本题的第一道关卡。对于前端工程师而言，**这是一道能够快速划分** "**内功** "**等级的常见题目。**

而题目中的"其他框架"，则是在考核你知识面的广度。所以你在回答的时候，务必采取"先分类，后讲述"的方式。切忌语无伦次，没有条理、没有区分度、一股脑地表达。而且，你的分类方式还向面试官透露了对知识点的理解度。

那讲到 React，不得不说的其他框架有两个。

* Vue，因为 React 与 Vue 是国内前端中的主流框架。

* 类 React 框架，又被称为 React-like 框架，通常是指 Preact、 inferno 等兼容 React API 的框架，它们与 React 设计相似、 使用相似。

所以该讲我们就拿 Vue 和 Preact 与 React 的 diff 算法进行比较。

### 承题

到这里，我们就清楚了本讲考察的两个重点，可以梳理出这样的一个答题框架：

1. 就 React diff 算法完成"讲概念，说用途，理思路，优缺点，列一遍"的组合拳；

2. 横向对比 React、React-like 框架及 Vue 的 diff 算法。


<Image alt="Drawing 1.png" src="https://s0.lgstatic.com/i/image/M00/8C/55/CgqCHl_qyoCARaC-AABHz3sJYwo329.png"/> 


### 入手

#### Diff 算法

首先主角当然是"diff 算法"，但讨论 diff 算法一定是建立在虚拟 DOM 的基础上的。第 09 讲"Virtual DOM 的工作原理是什么？"讲过，使用虚拟 DOM 而非直接操作真实 DOM 是现代前端框架的一个基本认知。

而 diff 算法探讨的就是虚拟 DOM 树发生变化后，生成 DOM 树更新补丁的方式。它通过对比新旧两株虚拟 DOM 树的变更差异，将更新补丁作用于真实 DOM，以最小成本完成视图更新。


<Image alt="Drawing 3.png" src="https://s0.lgstatic.com/i/image/M00/8C/55/CgqCHl_qyouAAkb9AAB_cmWuZhc920.png"/> 


具体的流程是这样的：

* 真实 DOM 与虚拟 DOM 之间存在一个映射关系。这个映射关系依靠初始化时的 JSX 建立完成；

* 当虚拟 DOM 发生变化后，就会根据差距计算生成 patch，这个 patch 是一个结构化的数据，内容包含了增加、更新、移除等；

* 最后再根据 patch 去更新真实的 DOM，反馈到用户的界面上。


<Image alt="Drawing 4.png" src="https://s0.lgstatic.com/i/image/M00/8C/55/CgqCHl_qypGAZPuGAADYrK9nkJY878.png"/> 


举一个简单易懂的例子：

```java
import React from 'react'

export default class ExampleComponent extends React.Component {
  render() {
    if(this.props.isVisible) {
       return <div className="visible">visbile</div>;
    }
     return <div className="hidden">hidden</div>;
  }
}
```

这里，首先我们假定 ExampleComponent 可见，然后再改变它的状态，让它不可见 。映射为真实的 DOM 操作是这样的，React 会创建一个 div 节点。

```java
 <div class="visible">visbile</div>
```

当把 visbile 的值变为 false 时，就会替换 class 属性为 hidden，并重写内部的 innerText 为 hidden。这样一个**生成补丁** 、**更新差异**的过程统称为 diff 算法。

在整个过程中你需要注意 3 点：**更新时机、遍历算法、优化策略**，这些也是面试官最爱考察的。

**更新时机**

更新时机就是触发更新、进行差异对比的时机。根据前面的章节内容可以知道，更新发生在setState、Hooks 调用等操作以后。此时，树的结点发生变化，开始进行比对。那这里涉及一个问题，即两株树如何对比差异?

这里就需要使用遍历算法。

**遍历算法**

遍历算法是指沿着某条搜索路线，依次对树的每个节点做访问。通常分为两种：深度优先遍历和广度优先遍历。

* 深度优先遍历，是从根节点出发，沿着左子树方向进行纵向遍历，直到找到叶子节点为止。然后回溯到前一个节点，进行右子树节点的遍历，直到遍历完所有可达节点。

* 广度优先遍历，则是从根节点出发，在横向遍历二叉树层段节点的基础上，纵向遍历二叉树的层次。

React 选择了哪一种遍历方式呢？它的 diff 算法采用了深度优先遍历算法。因为广度优先遍历可能会导致组件的生命周期时序错乱，而深度优先遍历算法就可以解决这个问题。

**优化策略**

优化策略是指 React 对 diff 算法做的优化手段。

虽然深度优先遍历保证了组件的生命周期时序不错乱，但传统的 diff 算法也带来了一个严重的性能瓶颈，复杂程度为 O(n\^3)(后期备注上角标)，其中 n 表示树的节点总数。正如计算机科学中常见的优化方案一样，React 用了一个非常经典的手法将复杂度降低为 O(n)，也就是[分治](https://leetcode-cn.com/tag/divide-and-conquer/)，即通过"分而治之"这一巧妙的思想分解问题。

具体而言， React 分别从**树** 、**组件** 及**元素**三个层面进行复杂度的优化，并诞生了与之对应的策略。

**策略一** ：**忽略节点跨层级操作场景，提升比对效率**。

这一策略需要进行**树比对**，即对树进行分层比较。树比对的处理手法是非常"暴力"的，即两棵树只对同一层次的节点进行比较，如果发现节点已经不存在了，则该节点及其子节点会被完全删除掉，不会用于进一步的比较，这就提升了比对效率。

**策略二** ：**如果组件的 class 一致** ，**则默认为相似的树结构** ，**否则默认为不同的树结构**。

在组件比对的过程中：

* 如果组件是同一类型则进行树比对；

* 如果不是则直接放入补丁中。

只要父组件类型不同，就会被重新渲染。这也就是为什么

shouldComponentUpdate、PureComponent 及 React.memo 可以提高性能的原因。

**策略三：同一层级的子节点** ，**可以通过标记 key 的方式进行列表对比**。

元素比对主要发生在同层级中，通过**标记节点操作**生成补丁。节点操作包含了插入、移动、删除等。其中节点重新排序同时涉及插入、移动、删除三个操作，所以效率消耗最大，此时策略三起到了至关重要的作用。

通过标记 key 的方式，React 可以直接移动 DOM 节点，降低内耗。操作代码如下：

```java
<ul>
  <li key="a">a</li>
  <li key="b">b</li>
  <li key="c">c</li>
  <li key="d">d</li>
</ui>
```

以上是 React Diff 算法最基本的内容，除此以外，由于 React 16 引入**Fiber 设计**，所以我们还需要了解 Fiber 给 diff 算法带来的影响。

Fiber 机制下节点与树分别采用 FiberNode 与 FiberTree 进行重构。FiberNode 使用了双链表的结构，可以直接找到兄弟节点与子节点，使得整个更新过程可以随时暂停恢复。FiberTree 则是通过 FiberNode 构成的树。

Fiber 机制下，整个更新过程由 current 与 workInProgress 两株树双缓冲完成。当 workInProgress 更新完成后，通过修改 current 相关指针指向的节点，直接抛弃老树，虽然非常简单粗暴，却非常合理。

这些就是 React 中 diff 算法的回答要点，我们再来看看其他框架需要掌握什么。

#### 其他框架

**Preact**

在众多的 React-like 框架中，**Preact 适用范围最广，生命力最强**。它以仅 3kb 的小巧特点应用于对体积追求非常极致的场景。也正因为体积受限，Preact 在 diff 算法上做了裁剪。

以下 Preact 的 diff 算法的图示，可以看到它将 diff 分为了三个类型：Fragment、Component 及 DOM Node。


<Image alt="Drawing 6.png" src="https://s0.lgstatic.com/i/image/M00/8C/4A/Ciqc1F_qyqeAWvpYAAEVYxYrQis686.png"/> 


* Fragment 对应 React 的树比较；

* Component 对应组件比较，它们在原理上是相通的，所以这里我们不再赘述；

* 最大的不同在于 DOM Node 这一层，Preact 并没有 Patch 的过程，而是直接更新 DOM 节点属性。

**Vue**

Vue 2.0 因为使用了 [snabbdom](https://github.com/snabbdom/snabbdom/tree/8079ba78685b0f0e0e67891782c3e8fb9d54d5b8)，所以整体思路与 React 相同。但在元素对比时，如果新旧两个元素是同一个元素，且没有设置 key 时，snabbdom 在 diff 子元素中会一次性对比**旧节点** 、**新节点** 及它们的**首尾元素** 四个节点，以及**验证列表**是否有变化。Vue 3.0 整体变化不大，依然没有引入 Fiber 等设计，也没有时间切片等功能。

### 答题

> 在回答有何不同之前，首先需要说明下什么是 diff 算法。
>
> diff 算法是指生成更新补丁的方式，主要应用于虚拟 DOM 树变化后，更新真实 DOM。所以 diff 算法一定存在这样一个过程：触发更新 → 生成补丁 → 应用补丁。
>
> React 的 diff 算法，触发更新的时机主要在 state 变化与 hooks 调用之后。此时触发虚拟 DOM 树变更遍历，采用了深度优先遍历算法。但传统的遍历方式，效率较低。为了优化效率，使用了分治的方式。将单一节点比对转化为了 3 种类型节点的比对，分别是树、组件及元素，以此提升效率。
>
> 树比对：由于网页视图中较少有跨层级节点移动，两株虚拟 DOM 树只对同一层次的节点进行比较。
>
> 组件比对：如果组件是同一类型，则进行树比对，如果不是，则直接放入到补丁中。
>
> 元素比对：主要发生在同层级中，通过标记节点操作生成补丁，节点操作对应真实的 DOM 剪裁操作。
>
> 以上是经典的 React diff 算法内容。自 React 16 起，引入了 Fiber 架构。为了使整个更新过程可随时暂停恢复，节点与树分别采用了 FiberNode 与 FiberTree 进行重构。fiberNode 使用了双链表的结构，可以直接找到兄弟节点与子节点。
>
> 整个更新过程由 current 与 workInProgress 两株树双缓冲完成。workInProgress 更新完成后，再通过修改 current 相关指针指向新节点。
>
> 然后拿 Vue 和 Preact 与 React 的 diff 算法进行对比。
>
> Preact 的 Diff 算法相较于 React，整体设计思路相似，但最底层的元素采用了真实 DOM 对比操作，也没有采用 Fiber 设计。Vue 的 Diff 算法整体也与 React 相似，同样未实现 Fiber 设计。
>
> 然后进行横向比较，React 拥有完整的 Diff 算法策略，且拥有随时中断更新的时间切片能力，在大批量节点更新的极端情况下，拥有更友好的交互体验。
>
> Preact 可以在一些对性能要求不高，仅需要渲染框架的简单场景下应用。
>
> Vue 的整体 diff 策略与 React 对齐，虽然缺乏时间切片能力，但这并不意味着 Vue 的性能更差，因为在 Vue 3 初期引入过，后期因为收益不高移除掉了。除了高帧率动画，在 Vue 中其他的场景几乎都可以使用防抖和节流去提高响应性能。


<Image alt="Diff 算法1.png" src="https://s0.lgstatic.com/i/image2/M01/04/31/CgpVE1_q2zGAe9UzAACKAZViwbM237.png"/> 
  

这里需要注意的是：对比过程中切忌踩一捧一，容易引发面试官反感。

### 进阶

**学习原理的目的就是应用。那如何根据 React diff 算法原理优化代码呢？** 这个问题其实按优化方式逆向回答即可。
> 根据 diff 算法的设计原则，应尽量避免跨层级节点移动。
>
> 通过设置唯一 key 进行优化，尽量减少组件层级深度。因为过深的层级会加深遍历深度，带来性能问题。
>
> 设置 shouldComponentUpdate 或者 React.pureComponet 减少 diff 次数。

### 总结

diff 算法一直在 React 中处于核心的位置，所以本讲讲到的内容，你一定要掌握。如果你有什么问题或者想法，欢迎留言与我互动。

在下一讲，我会为你讲述 React 的渲染流程，下节课见！

*** ** * ** ***

[
<Image alt="Drawing 2.png" src="https://s0.lgstatic.com/i/image/M00/72/94/Ciqc1F_EZ0eANc6tAASyC72ZqWw643.png"/> 
](https://shenceyun.lagou.com/t/mka)

《大前端高薪训练营》

对标阿里 P7 技术需求 + 每月大厂内推，6 个月助你斩获名企高薪 Offer。[点击链接](https://shenceyun.lagou.com/t/mka)，快来领取！

