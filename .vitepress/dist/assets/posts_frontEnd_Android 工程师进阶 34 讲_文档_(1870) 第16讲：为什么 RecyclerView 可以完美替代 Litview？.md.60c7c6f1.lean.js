import{_ as o,j as n,o as c,g as s,k as l,h as t,s as e,Q as a}from"./chunks/framework.a0d18f64.js";const ye=JSON.parse('{"title":"第16讲：为什么RecyclerView可以完美替代Litview？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/Android 工程师进阶 34 讲_文档/(1870) 第16讲：为什么 RecyclerView 可以完美替代 Litview？.md","filePath":"posts/frontEnd/Android 工程师进阶 34 讲_文档/(1870) 第16讲：为什么 RecyclerView 可以完美替代 Litview？.md","lastUpdated":1696682708000}'),r={name:"posts/frontEnd/Android 工程师进阶 34 讲_文档/(1870) 第16讲：为什么 RecyclerView 可以完美替代 Litview？.md"},d=e("h1",{id:"第16讲-为什么recyclerview可以完美替代litview",tabindex:"-1"},[t("第16讲：为什么RecyclerView可以完美替代Litview？ "),e("a",{class:"header-anchor",href:"#第16讲-为什么recyclerview可以完美替代litview","aria-label":'Permalink to "第16讲：为什么RecyclerView可以完美替代Litview？"'},"​")],-1),p=e("p",null,"本课时我们学习为什么 RecyclerView 可以完美替代 LI。",-1),_=e("p",null,"RecyclerView 简称 RV， 是作为 ListView 和 GridView 的加强版出现的，目的是在有限的屏幕之上展示大量的内容，因此 RecyclerView 的复用机制的实现是它的一个核心部分。",-1),u=e("p",null,"RV 常规使用方式如下：",-1),h=a("",6),g=e("ul",null,[e("li",null,"图中 1 处，表示在 XML 布局文件中，RV 的宽高被设置为 match_parent 或者具体值，那么直接将 skipMeasure 置为 true，并调用 mLayout（传入的 LayoutManager）的 onMeasure 方法测量自身的宽高即可。"),e("li",null,"图中 2 处，表示在 XML 布局文件中，RV 的宽高设置为 wrap_content，则会执行下面的 dispatchLayoutStep2()，其实就是测量 RecyclerView 的子 View 的大小，最终确定 RecyclerView 的实际宽高。")],-1),V=e("p",null,"注意：",-1),w=e("p",null,[t("在上图代码中还有一个 dispatchLayoutStep1() 方法，这个方法并不是本节课重点介绍内容，但是它跟RV的动画息息相关，详细可以参考： "),e("a",{href:"https://mp.weixin.qq.com/s?__biz=MzU3Mjc5NjAzMw==&mid=2247484487&idx=1&sn=bb0b7de72d20011199dcc140d6925f8e&chksm=fcca39a9cbbdb0bf29a48db16f3e7a019aa3d98da88d60389f79c91cbcf8092bdb6862513191&token=1367838045&lang=zh_CN#rd",target:"_blank",rel:"noreferrer"},"RecyclerView.ItemAnimator实现动画效果")],-1),m=e("h4",{id:"onlayout",tabindex:"-1"},[t("onLayout "),e("a",{class:"header-anchor",href:"#onlayout","aria-label":'Permalink to "onLayout"'},"​")],-1),y=e("p",null,"RV 的 onLayout 方法如下：",-1),A=e("p",null,"很简单，只是调用了一层 dispatchLayout() 方法，此方法具体如下：",-1),R=e("p",null,"如果在 onMeasure 阶段没有执行 dispatchLayoutStep2() 方法去测量子 View，则会在 onLayout 阶段重新执行。",-1),C=e("p",null,"dispatchLayoutStep2() 源码如下：",-1),M=e("p",null,"可以看出，核心逻辑是调用了 mLayout 的 onLayoutChildren 方法。这个方法是 LayoutManager 中的一个空方法，主要作用是测量 RV 内的子 View 大小，并确定它们所在的位置。LinearLayoutManager、GridLayoutManager，以及 StaggeredLayoutManager 都分别复写了这个方法，并实现了不同方式的布局。",-1),H=e("p",null,"以 LinearLayoutManager 的实现为例，展开分析，实现如下 ：",-1),L=e("p",null,"解释说明：",-1),b=e("ol",null,[e("li",null,"在 onLayoutChildren 中调用 fill 方法，完成子 View 的测量布局工作；"),e("li",null,"在 fill 方法中通过 while 循环判断是否还有剩余足够空间来绘制一个完整的子 View；"),e("li",null,"layoutChunk 方法中是子 View 测量布局的真正实现，每次执行完之后需要重新计算 remainingSpace。")],-1),D=e("p",null,"layoutChunk 是一个非常核心的方法，这个方法执行一次就填充一个 ItemView 到 RV，部分代码如下：",-1),f=e("p",null,"说明：",-1),q=e("ul",null,[e("li",null,"图中 1 处从缓存（Recycler）中取出子 ItemView，然后调用 addView 或者 addDisappearingView 将子 ItemView 添加到 RV 中。"),e("li",null,"图中 2 处测量被添加的 RV 中的子 ItemView 的宽高。"),e("li",null,"图中 3 处根据所设置的 Decoration、Margins 等所有选项确定子 ItemView 的显示位置。")],-1),S=e("h4",{id:"ondraw",tabindex:"-1"},[t("onDraw "),e("a",{class:"header-anchor",href:"#ondraw","aria-label":'Permalink to "onDraw"'},"​")],-1),k=e("p",null,"测量和布局都完成之后，就剩下最后的绘制操作了。代码如下：",-1),I=e("p",null,"这个方法很简单，如果有添加 ItemDecoration，则循环调用所有的 Decoration 的 onDraw 方法，将其显示。至于所有的子 ItemView 则是通过 Android 渲染机制递归的调用子 ItemView 的 draw 方法显示到屏幕上。",-1),P=e("p",null,[e("strong",null,"小结"),t("：RV 会将测量 onMeasure 和布局 onLayout 的工作委托给 LayoutManager 来执行，不同的 LayoutManager 会有不同风格的布局显示，这是一种策略模式。用一张图来描述这段过程如下：")],-1),v=e("h3",{id:"缓存复用原理-recycler",tabindex:"-1"},[t("缓存复用原理 Recycler "),e("a",{class:"header-anchor",href:"#缓存复用原理-recycler","aria-label":'Permalink to "缓存复用原理 Recycler"'},"​")],-1),x=e("p",null,"缓存复用是 RV 中另一个非常重要的机制，这套机制主要实现了 ViewHolder 的缓存以及复用。",-1),T=e("p",null,"核心代码是在 Recycler 中完成的，它是 RV 中的一个内部类，主要用来缓存屏幕内 ViewHolder 以及部分屏幕外 ViewHolder，部分代码如下：",-1),E=e("p",null,"Recycler 的缓存机制就是通过上图中的这些数据容器来实现的，实际上 Recycler 的缓存也是分级处理的，根据访问优先级从上到下可以分为 4 级，如下：",-1),F=e("h4",{id:"各级缓存功能",tabindex:"-1"},[t("各级缓存功能 "),e("a",{class:"header-anchor",href:"#各级缓存功能","aria-label":'Permalink to "各级缓存功能"'},"​")],-1),N=e("p",null,"RV 之所以要将缓存分成这么多块，是为了在功能上进行一些区分，并分别对应不同的使用场景。",-1),K=e("p",null,[e("strong",null,"a 第一级缓存 mAttachedScrap&mChangedScrap")],-1),X=e("p",null,"是两个名为 Scrap 的 ArrayList，这两者主要用来缓存屏幕内的 ViewHolder。为什么屏幕内的 ViewHolder 需要缓存呢？做过 App 开发的应该都熟悉下面的布局场景：",-1),O=e("p",null,"通过下拉刷新列表中的内容，当刷新被触发时，只需要在原有的 ViewHolder 基础上进行重新绑定新的数据 data 即可，而这些旧的 ViewHolder 就是被保存在 mAttachedScrap 和 mChangedScrap 中。实际上当我们调用 RV 的 notifyXXX 方法时，就会向这两个列表进行填充，将旧 ViewHolder 缓存起来。",-1),j=e("p",null,[e("strong",null,"b 第二级缓存 mCachedViews")],-1),z=e("p",null,"它用来缓存移除屏幕之外的 ViewHolder，默认情况下缓存个数是 2，不过可以通过 setViewCacheSize 方法来改变缓存的容量大小。如果 mCachedViews 的容量已满，则会根据 FIFO 的规则将旧 ViewHolder 抛弃，然后添加新的 ViewHolder，如下所示：",-1),B=e("p",null,"通常情况下刚被移出屏幕的 ViewHolder 有可能接下来马上就会使用到，所以 RV 不会立即将其设置为无效 ViewHolder，而是会将它们保存到 cache 中，但又不能将所有移除屏幕的 ViewHolder 都视为有效 ViewHolder，所以它的默认容量只有 2 个。",-1),U=e("p",null,[e("strong",null,"c 第三级缓存 ViewCacheExtension")],-1),G=e("p",null,"这是 RV 预留给开发人员的一个抽象类，在这个类中只有一个抽象方法，如下：",-1),J=a("",9),Y=e("p",null,"代码继续往下跟：",-1),W=e("p",null,"可以看出最终调用 tryGetViewHolderForPositionByDeadline 方法来查找相应位置上的ViewHolder，在这个方法中会从上面介绍的 4 级缓存中依次查找：",-1),Z=e("p",null,"如图中红框处所示，如果在各级缓存中都没有找到相应的 ViewHolder，则会使用 Adapter 中的 createViewHolder 方法创建一个新的 ViewHolder。",-1),$=e("h4",{id:"何时将-viewholder-存入缓存",tabindex:"-1"},[t("何时将 ViewHolder 存入缓存 "),e("a",{class:"header-anchor",href:"#何时将-viewholder-存入缓存","aria-label":'Permalink to "何时将 ViewHolder 存入缓存"'},"​")],-1),Q=e("p",null,"接下来看下 ViewHolder 被存入各级缓存的场景。",-1),ee=e("p",null,[e("strong",null,"第一次 layout")],-1),te=e("p",null,"当调用 setLayoutManager 和 setAdapter 之后，RV 会经历第一次 layout 并被显示到屏幕上，如下所示：",-1),ie=e("p",null,"此时并不会有任何 ViewHolder 的缓存，所有的 ViewHolder 都是通过 createViewHolder 创建的。",-1),le=e("p",null,[e("strong",null,"刷新列表")],-1),ae=e("p",null,"如果通过手势下拉刷新，获取到新的数据 data 之后，我们会调用 notifyXXX 方法通知 RV 数据发生改变，这回 RV 会先将屏幕内的所有 ViewHolder 保存在 Scrap 中，如下所示：",-1),oe=e("p",null,"当缓存执行完之后，后续通过 Recycler 就可以从缓存中获取相应 position 的 ViewHolder（姑且称为旧 ViewHolder），然后将刷新后的数据设置到这些 ViewHolder 上，如下所示：",-1),ne=e("p",null,"最后再将新的 ViewHolder 绘制到 RV 上：",-1),ce=e("h3",{id:"总结",tabindex:"-1"},[t("总结 "),e("a",{class:"header-anchor",href:"#总结","aria-label":'Permalink to "总结"'},"​")],-1),se=e("p",null,"这节课我带着你深入分析了 Android RecyclerView 源码中的 2 块核心实现：",-1),re=e("ul",null,[e("li",null,"RecyclerView 是如何经过测量、布局，最终绘制到屏幕上，其中大部分工作是通过委托给 LayoutManager 来实现的。"),e("li",null,"RecyclerView 的缓存复用机制，主要是通过内部类 Recycler 来实现。")],-1),de=e("p",null,"谷歌 Android 团队对 RecyclerView 做了很多优化，导致 RecyclerView 最终的代码极其庞大。这也是为什么当 RecyclerView 出现问题的时候，排查问题的复杂度相对较高。理解 RecyclerView 的源码实现，有助于我们快速定位问题原因、拓展 RecyclerView 功能、提高分析 RecyclerView 性能问题的能力。",-1);function pe(_e,ue,he,ge,Ve,we){const i=n("Image");return c(),s("div",null,[d,p,_,u,l(i,{alt:"image.png",src:"https://s0.lgstatic.com/i/image/M00/09/9D/Ciqc1F68ue6AI3vLAACGhkLqn8M080.png"}),t(),h,l(i,{alt:"image (1).png",src:"https://s0.lgstatic.com/i/image/M00/09/9D/CgqCHl68ufiAe8_uAAV5DJyDB7M094.png"}),t(),g,V,w,m,y,l(i,{alt:"image (2).png",src:"https://s0.lgstatic.com/i/image/M00/09/9D/CgqCHl68ugWAAd26AAC9tEb_ppo563.png"}),t(),A,l(i,{alt:"image (3).png",src:"https://s0.lgstatic.com/i/image/M00/09/9D/CgqCHl68ugyAIYT4AAUpCeyxNoY082.png"}),t(),R,C,l(i,{alt:"image (4).png",src:"https://s0.lgstatic.com/i/image/M00/09/9D/Ciqc1F68uhOAau0zAADCKkMOvDk556.png"}),t(),M,H,l(i,{alt:"image (5).png",src:"https://s0.lgstatic.com/i/image/M00/09/9D/Ciqc1F68uhyAbDK-AAVKbLTTats711.png"}),t(),L,b,D,l(i,{alt:"image (6).png",src:"https://s0.lgstatic.com/i/image/M00/09/9D/Ciqc1F68uiWAUf1UAAXuHvOgyg0072.png"}),t(),f,q,S,k,l(i,{alt:"image (7).png",src:"https://s0.lgstatic.com/i/image/M00/09/9D/CgqCHl68ui6ATOvDAADD582WJrs779.png"}),t(),I,P,l(i,{alt:"image (8).png",src:"https://s0.lgstatic.com/i/image/M00/09/9D/Ciqc1F68ujuAJSpLAACb76c7LSA053.png"}),t(),v,x,T,l(i,{alt:"image (9).png",src:"https://s0.lgstatic.com/i/image/M00/09/9D/Ciqc1F68ukSAZT3uAAD9_pc55Io230.png"}),t(),E,l(i,{alt:"image (10).png",src:"https://s0.lgstatic.com/i/image/M00/09/9D/Ciqc1F68ukuAM0LVAACHb_a34AY925.png"}),t(),F,N,K,X,l(i,{alt:"image (11).png",src:"https://s0.lgstatic.com/i/image/M00/09/9D/CgqCHl68uleADj-bAAkZbbtqexQ425.png"}),t(),O,j,z,l(i,{alt:"mCachedViews.gif",src:"https://s0.lgstatic.com/i/image/M00/09/9D/CgqCHl68umKATRCWAEsI2pK1Mbo977.gif"}),t(),B,U,G,l(i,{alt:"image (12).png",src:"https://s0.lgstatic.com/i/image/M00/09/9D/Ciqc1F68umuAdLe4AACjFw2gqeI470.png"}),t(),J,l(i,{alt:"image (13).png",src:"https://s0.lgstatic.com/i/image/M00/09/9E/CgqCHl68unSAJ7fRAAEcvzM2UaA043.png"}),t(),Y,l(i,{alt:"image (14).png",src:"https://s0.lgstatic.com/i/image/M00/09/9E/CgqCHl68un6AKPaiAADjaBH3UEk983.png"}),t(),W,l(i,{alt:"image (15).png",src:"https://s0.lgstatic.com/i/image/M00/09/9E/Ciqc1F68uoaAefdEAASuYKk5V44193.png"}),t(),Z,$,Q,ee,te,l(i,{alt:"image (16).png",src:"https://s0.lgstatic.com/i/image/M00/09/9E/CgqCHl68upCATZ2cAACZFf9DHQ0775.png"}),t(),ie,le,ae,l(i,{alt:"image (17).png",src:"https://s0.lgstatic.com/i/image/M00/09/9E/CgqCHl68upeAaYMqAAChKtO2D8A471.png"}),t(),oe,l(i,{alt:"image (18).png",src:"https://s0.lgstatic.com/i/image/M00/09/9E/Ciqc1F68up6AKO1yAAChI3xlrRw121.png"}),t(),ne,l(i,{alt:"image (19).png",src:"https://s0.lgstatic.com/i/image/M00/09/9E/CgqCHl68uqSAS-0JAACL6DDqSsw611.png"}),t(),ce,se,re,de])}const Ae=o(r,[["render",pe]]);export{ye as __pageData,Ae as default};
