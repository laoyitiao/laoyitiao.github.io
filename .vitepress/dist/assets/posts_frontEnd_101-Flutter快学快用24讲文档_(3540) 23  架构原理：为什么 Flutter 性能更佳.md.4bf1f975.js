import{_ as e,j as o,o as t,g as r,k as l,h as a,Q as p,s}from"./chunks/framework.a0d18f64.js";const v=JSON.parse('{"title":"23架构原理：为什么Flutter性能更佳","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/101-Flutter快学快用24讲文档/(3540) 23  架构原理：为什么 Flutter 性能更佳.md","filePath":"posts/frontEnd/101-Flutter快学快用24讲文档/(3540) 23  架构原理：为什么 Flutter 性能更佳.md","lastUpdated":1696682708000}'),c={name:"posts/frontEnd/101-Flutter快学快用24讲文档/(3540) 23  架构原理：为什么 Flutter 性能更佳.md"},y=p('<h1 id="_23架构原理-为什么flutter性能更佳" tabindex="-1">23架构原理：为什么Flutter性能更佳 <a class="header-anchor" href="#_23架构原理-为什么flutter性能更佳" aria-label="Permalink to &quot;23架构原理：为什么Flutter性能更佳&quot;">​</a></h1><p>本课时将继续深入源码，学习 Flutter 渲染原理，特别是为什么 Flutter 可以保持比较好的性能体验。</p><h3 id="性能优势" tabindex="-1">性能优势 <a class="header-anchor" href="#性能优势" aria-label="Permalink to &quot;性能优势&quot;">​</a></h3><p>在这之前，业内一直都说 Flutter 的性能优于其他的跨端技术框架，并且基本与原生平台体验几乎一样。那么具体是怎么做到的呢？在了解 Flutter的自渲染原理之前，我们就先来看看原生平台 Android 与 iOS 是如何渲染 UI 的。经过前后对比之后，更能体现出其性能与原生几乎无差异的特点。</p><h4 id="ui-渲染基本原理" tabindex="-1">UI 渲染基本原理 <a class="header-anchor" href="#ui-渲染基本原理" aria-label="Permalink to &quot;UI 渲染基本原理&quot;">​</a></h4><p>我们先来讲解一个最基础的知识点，日常我们所看到的 UI 交互界面，操作系统是如何实现的，参考下图 1 的渲染过程。</p>',6),i=s("p",null,"图1 系统 UI 界面绘制原理",-1),E=s("p",null,"从图 1 我们可以看到，一个界面显示出来，首先是经过了 CPU 的数据计算，然后将数据发送给到 GPU， GPU 再根据相应的数据绘制成像素界面，然后放入帧缓存区中，最终显示器定时从帧缓存区获取帧数据显示在显示器上。",-1),d=s("p",null,"在上面的渲染实现过程中，需要进行 CPU 和 GPU 之间的通信。因此，如何调度 GPU 是一个比较关键的点，目前有一套规范叫作 OpenGL，开发者可以通过这套规范，更方便、更高效地调用 GPU进行界面渲染。Android 和iOS 系统都在系统层面实现了这套功能，将其分别封装成 SDK API。而在 Flutter 中也实现了这套规则，也就是应用 OpenGL 规范封装了一套 Dart API，因此 Flutter 的渲染原理和 Android 以及 iOS 是一致的，所以在性能上基本没有区别。",-1),u=s("p",null,"了解了 Flutter 渲染原理以后，我们再来看看目前比较常用的两个跨端框架的渲染原理。",-1),h=s("h4",{id:"其他跨端技术框架渲染原理",tabindex:"-1"},[a("其他跨端技术框架渲染原理 "),s("a",{class:"header-anchor",href:"#其他跨端技术框架渲染原理","aria-label":'Permalink to "其他跨端技术框架渲染原理"'},"​")],-1),F=s("p",null,"目前比较常见的两个跨端技术框架，分别是 ReactNative 和 Weex。它们在原理上非常相近，因此这里单独介绍 ReactNative 的原理。我们先来看下图 2 的一个技术架构。",-1),g=p('<p>图2 ReactNative 技术架构图</p><p>从图 2 ，我们可以非常清晰地看到一点，ReactNative 完全是基于原生平台来进行渲染的，而这之间主要是通过 JSbridge 来通信，将需要渲染的数据通过 JSbridge 传递给原生平台。这样的通信方式在 Flutter 中也有，在我们第 20 课时&quot;原生通信：应用原生平台交互扩充 Flutter 基础能力&quot;中有介绍到，这部分和 ReactNative 比较相近。而两者的最大的区别就在于，<strong>Flutter UI 界面是自渲染的，而 ReactNative 则是通过通信的方式告知原生平台，然后原生平台再绘制出界面。</strong>。</p><p>我们再回到最原始的跨端技术框架 Hybrid ，它是界面上使用 H5 ，其他功能则使用 JSbridge 来调用原生服务，因此并不会使用原生绘制界面，而仅仅只使用了原生平台能力。</p><p>以上就是三种技术框架的对比说明，我们再来总结下三种框架突出解决的问题点，其次也说明当前框架存在的问题点。</p><ul><li><p>Hybrid 是在图 2 中仅仅支持了原生能力，例如相机、存储、日历等，而 UI 交互界面则还是H5，因此不管是体验和性能都是相对较差的。</p></li><li><p>ReactNative为了解决页面性能问题，同样应用 JSbridge 通信方式，将虚拟 DOM 以及页面渲染相关数据，传递给到原生平台，原生平台则根据虚拟 DOM 以及渲染相关数据，绘制出原生体验的界面，这样用户感知上就是原生的界面，但是这个过程中需要进行 JavaScript的代码解析和运行，然后再与原生平台通信，从而有一定的性能损耗。</p></li><li><p>为了解决上述问题，Flutter 进一步优化了这种体验。Flutter 不借助原生的渲染能力，而是自己实现了一套与 Android 和 iOS 一样的渲染原理，从而在性能上与原生平台保持基本一致。不过这里由于目前 Flutter 只是一个 UI 框架，因此在原生功能方面还是需要依赖原生平台，这也是它存在的一些问题。</p></li></ul><h3 id="渲染原理" tabindex="-1">渲染原理 <a class="header-anchor" href="#渲染原理" aria-label="Permalink to &quot;渲染原理&quot;">​</a></h3><p>在了解了 Flutter 渲染原理的特殊性后，我们再具体看下整个绘制流程是如何实现的。上一课时我介绍了三棵树的转化过程，那么接下来就需要进一步去分析如何将三棵树渲染为 UI 交互界面。在介绍下转化的三棵树怎么绘制成 UI 交互界面之前，我们先来了解 vsync 这个概念。</p><h4 id="vsync" tabindex="-1">vsync <a class="header-anchor" href="#vsync" aria-label="Permalink to &quot;vsync&quot;">​</a></h4><p>从图 1 中我们看到视频控制器，会从帧缓存器中获取需要显示的帧数据，并展示在显示器上。显示器有一个刷新频率（比如 60 Hz 或者 120 Hz），代表的意思是显示器会每秒钟获取 60 帧的数据，也就是每隔 1000 ms / 60 = 16.67 ms 从视频控制器中定时获取帧数据。这个就是我们常说的一个概念&quot;<strong>垂直同步信号&quot;（vsync）</strong>。</p><p>Flutter 的自渲染模式也遵循这个原则，因此在Flutter的性能要求上，必须是 UI线程处理时间加上 GPU 绘制时间小于 16.67 ms 才不会出现掉帧现象。掌握了这个 vysnc 概念后，我们再来看看 Flutter 内部逻辑是如何实现的。</p><h4 id="渲染流程" tabindex="-1">渲染流程 <a class="header-anchor" href="#渲染流程" aria-label="Permalink to &quot;渲染流程&quot;">​</a></h4><p>整个绘制过程所涉及的核心函数流程，如图 3 所示。</p>',12),_=p(`<p>图3 绘制整体流程图</p><p>在图 3 的流程中会涉及几个比较重要的函数分别是 scheduleWarmUpFrame 、handleDrawFrame、drawFrame 、flushLayout 、 flushCompositingBits 、 markNeedsPaint 、 flushPaint 、 compositeFrame 和 flushSemantics。接下来我们就先来看下这些函数的作用。</p><h4 id="重要函数" tabindex="-1">重要函数 <a class="header-anchor" href="#重要函数" aria-label="Permalink to &quot;重要函数&quot;">​</a></h4><ul><li><p><strong>scheduleWarmUpFrame</strong>，这个函数的核心是调用 handleBeginFrame和 handleDrawFrame 两个方法。</p></li><li><p><strong>handleDrawFrame</strong>，主要是执行_persistentCallbacks这个回调函数列表，_persistentCallbacks 中存放了很多执行函数，其中存放了最重要的一个函数 RenderBing 的 drawFrame ，该方法主要是通过 WidgetsFlutterBinding 绑定阶段存放在 _persistentCallbacks 中。</p></li><li><p><strong>drawFrame</strong>，在函数中主要执行界面的绘制工作，依次会执行 flushLayout 、 flushCompositingBits、 flushPaint 、 compositeFrame 和 flushSemantics 函数。</p></li><li><p><strong>flushLayout</strong>，更新了所有被标记为&quot;dirty&quot;的 RenderObject 的布局信息。主要的动作发生在 node._layoutWithoutResize() 方法中，该方法中会调用 performLayout() 进行重新布局计算，请注意这里的 performLayout 会根据不同类型的 RenderObject 调用不同的 performLayout 布局方法。该方法还会调用 markNeedsPaint 标记需要重新绘制的RenderObject，源码如下：</p></li></ul><div class="language-dart vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">dart</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">while</span><span style="color:#E1E4E8;"> (_nodesNeedingLayout.isNotEmpty) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">final</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">List</span><span style="color:#E1E4E8;">&lt;</span><span style="color:#79B8FF;">RenderObject</span><span style="color:#E1E4E8;">&gt; dirtyNodes </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> _nodesNeedingLayout;</span></span>
<span class="line"><span style="color:#E1E4E8;">  _nodesNeedingLayout </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;</span><span style="color:#79B8FF;">RenderObject</span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;">[];</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">final</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">RenderObject</span><span style="color:#E1E4E8;"> node </span><span style="color:#F97583;">in</span><span style="color:#E1E4E8;"> dirtyNodes..</span><span style="color:#B392F0;">sort</span><span style="color:#E1E4E8;">((</span><span style="color:#79B8FF;">RenderObject</span><span style="color:#E1E4E8;"> a, </span><span style="color:#79B8FF;">RenderObject</span><span style="color:#E1E4E8;"> b) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> a.depth </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;"> b.depth)) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (node._needsLayout </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> node.owner </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">      node.</span><span style="color:#B392F0;">_layoutWithoutResize</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">while</span><span style="color:#24292E;"> (_nodesNeedingLayout.isNotEmpty) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">final</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">List</span><span style="color:#24292E;">&lt;</span><span style="color:#005CC5;">RenderObject</span><span style="color:#24292E;">&gt; dirtyNodes </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> _nodesNeedingLayout;</span></span>
<span class="line"><span style="color:#24292E;">  _nodesNeedingLayout </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;</span><span style="color:#005CC5;">RenderObject</span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;">[];</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">final</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">RenderObject</span><span style="color:#24292E;"> node </span><span style="color:#D73A49;">in</span><span style="color:#24292E;"> dirtyNodes..</span><span style="color:#6F42C1;">sort</span><span style="color:#24292E;">((</span><span style="color:#005CC5;">RenderObject</span><span style="color:#24292E;"> a, </span><span style="color:#005CC5;">RenderObject</span><span style="color:#24292E;"> b) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> a.depth </span><span style="color:#D73A49;">-</span><span style="color:#24292E;"> b.depth)) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (node._needsLayout </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> node.owner </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">      node.</span><span style="color:#6F42C1;">_layoutWithoutResize</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><ul><li><strong>flushCompositingBits</strong>，主要是循环检查 RenderObject 以及子节点是否需要新建图层，如果需要则 _needsCompositing 属性标记为 true，其次会循环判断父节点，如果父节点需要新的图层，则该标记位也需要设置为 true，如果图层发生了变化，最终也会调用 markNeedsPaint 来进行重新绘制操作，部分源码如下：</li></ul><div class="language-dart vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">dart</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">visitChildren</span><span style="color:#E1E4E8;">((</span><span style="color:#79B8FF;">RenderObject</span><span style="color:#E1E4E8;"> child) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  child.</span><span style="color:#B392F0;">_updateCompositingBits</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (child.needsCompositing)</span></span>
<span class="line"><span style="color:#E1E4E8;">    _needsCompositing </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">});</span></span>
<span class="line"><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (isRepaintBoundary </span><span style="color:#F97583;">||</span><span style="color:#E1E4E8;"> alwaysNeedsCompositing)</span></span>
<span class="line"><span style="color:#E1E4E8;">  _needsCompositing </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (oldNeedsCompositing </span><span style="color:#F97583;">!=</span><span style="color:#E1E4E8;"> _needsCompositing)</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">markNeedsPaint</span><span style="color:#E1E4E8;">();</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">visitChildren</span><span style="color:#24292E;">((</span><span style="color:#005CC5;">RenderObject</span><span style="color:#24292E;"> child) {</span></span>
<span class="line"><span style="color:#24292E;">  child.</span><span style="color:#6F42C1;">_updateCompositingBits</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (child.needsCompositing)</span></span>
<span class="line"><span style="color:#24292E;">    _needsCompositing </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">});</span></span>
<span class="line"><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (isRepaintBoundary </span><span style="color:#D73A49;">||</span><span style="color:#24292E;"> alwaysNeedsCompositing)</span></span>
<span class="line"><span style="color:#24292E;">  _needsCompositing </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (oldNeedsCompositing </span><span style="color:#D73A49;">!=</span><span style="color:#24292E;"> _needsCompositing)</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">markNeedsPaint</span><span style="color:#24292E;">();</span></span></code></pre></div><ul><li><p><strong>markNeedsPaint</strong>，这个方法和 Element 中的 markNeedsBuild 相似，由于当前节点需要重新绘制，因此会循环在父节点上，寻找最近一个 isRepaintBoundary 类型，然后进行绘制，如果父节点一直往上没有找到，则只能绘制当前节点。</p></li><li><p><strong>flushPaint</strong>，循环判断需要更新重绘的 RenderObject 节点，并调用 PaintingContext.repaintCompositedChild 进行重新绘制操作。在repaintCompositedChild中会调用paint 方法，这个方法有点类似 Element 的 update 方法，它会根据不同类型的 RenderObject 调用不同的 paint 方法，比如 custom_paint.dart 又或者 sliver_persistent_header.dart 都实现了自身的 paint 方法，在具体 paint 方法中会调用 canvas api 完成绘制，并递归判断子节点类型，调用不同的 paint 方法完成最终绘制工作，最终生成一棵 Layer Tree，并把绘制指令保存在 Layer 中。</p></li></ul><div class="language-dart vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">dart</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">final</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">RenderObject</span><span style="color:#E1E4E8;"> node </span><span style="color:#F97583;">in</span><span style="color:#E1E4E8;"> dirtyNodes..</span><span style="color:#B392F0;">sort</span><span style="color:#E1E4E8;">((</span><span style="color:#79B8FF;">RenderObject</span><span style="color:#E1E4E8;"> a, </span><span style="color:#79B8FF;">RenderObject</span><span style="color:#E1E4E8;"> b) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> b.depth </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;"> a.depth)) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">assert</span><span style="color:#E1E4E8;">(node._layer </span><span style="color:#F97583;">!=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (node._needsPaint </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> node.owner </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (node._layer.attached) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#79B8FF;">PaintingContext</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">repaintCompositedChild</span><span style="color:#E1E4E8;">(node);</span></span>
<span class="line"><span style="color:#E1E4E8;">    } </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">      node.</span><span style="color:#B392F0;">_skippedPaintingOnLayer</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">for</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">final</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">RenderObject</span><span style="color:#24292E;"> node </span><span style="color:#D73A49;">in</span><span style="color:#24292E;"> dirtyNodes..</span><span style="color:#6F42C1;">sort</span><span style="color:#24292E;">((</span><span style="color:#005CC5;">RenderObject</span><span style="color:#24292E;"> a, </span><span style="color:#005CC5;">RenderObject</span><span style="color:#24292E;"> b) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> b.depth </span><span style="color:#D73A49;">-</span><span style="color:#24292E;"> a.depth)) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">assert</span><span style="color:#24292E;">(node._layer </span><span style="color:#D73A49;">!=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (node._needsPaint </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> node.owner </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (node._layer.attached) {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#005CC5;">PaintingContext</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">repaintCompositedChild</span><span style="color:#24292E;">(node);</span></span>
<span class="line"><span style="color:#24292E;">    } </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">      node.</span><span style="color:#6F42C1;">_skippedPaintingOnLayer</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><ul><li><p><strong>compositeFrame</strong>，将 canvas 绘制好的 scene 信息，转化为二进制像素信息传递给到 GPU ，完成具体的界面渲染操作；</p></li><li><p><strong>flushSemantics</strong>，将渲染对象的语意发送给操作系统，这与 Flutter 绘制流程关系不大。</p></li></ul><p>以上就是非常关键的几个核心函数的介绍，接下来我们看下具体的执行过程。</p><h4 id="流程说明" tabindex="-1">流程说明 <a class="header-anchor" href="#流程说明" aria-label="Permalink to &quot;流程说明&quot;">​</a></h4><p>如下是各个过程中所执行的函数，如图 4 所示。</p>`,13),C=p(`<p>图4 核心绘制流程执行过程</p><p>根据图 3 的整体流程，我们知道在绘制过程中涉及 4 个比较重要的函数，图 4 就分别说明了这四个函数在执行过程中所执行的具体逻辑。</p><ul><li><p>flushLayout，准备布局相关的处理工作，这里会判断是否需要重新布局，调用 performLayout。由于不同基础组件布局相关实现不一样，因此这里会根据不同组件类型调用不同的 performLayout 从而完成布局相关的准备工作。在 performLayout 处理逻辑的最后，还会调用 markNeedsPaint 来标记需要重新绘制的 RenderObject。在 performLayout 中还会执行 markNeedsLayout 用来标记哪些需要进行重新布局，这个会在具体 layout 函数中使用到。</p></li><li><p>flushCompositingBits，准备图层的相关处理逻辑，同样将需要重新绘制的 RenderObject 调用 markNeedsPaint 来标记。</p></li><li><p>flushPaint，将需要进行重新绘制的 RenderObject 调用 paint 方法转化为 Layer tree，这里的 paint 中也会根据 RenderObject 类型不同，调用不同的paint方法，最终再调用 canvas 实现界面绘制。</p></li><li><p>compositeFrame，根据 canvas绘制好的 Layertree，调用 layer.buildScene 方法将 Layertree 转化为 scene 信息，最终再调用 window 的 render 方法，将界面显示给用户。</p></li></ul><p>以上就是绘制的流程说明，基于上述的执行过程，我们再来详细分析下，在编码过程中哪些环节，可以提升性能体验。</p><h3 id="性能优化方向" tabindex="-1">性能优化方向 <a class="header-anchor" href="#性能优化方向" aria-label="Permalink to &quot;性能优化方向&quot;">​</a></h3><p>以上过程中有两个是比较关键的流程，一个是布局，另外一个是绘制。布局过程中会根据 markNeedsLayout函数执行结果来判断是否需要重新布局，另外一个则是根据 markNeedsPaint 结果来判断是否需要重新绘制。那么在这两个函数中，我们平时编码到底应该要注意哪些细节呢？</p><h4 id="markneedspaint" tabindex="-1">markNeedsPaint <a class="header-anchor" href="#markneedspaint" aria-label="Permalink to &quot;markNeedsPaint&quot;">​</a></h4><p>在图 4 过程中的 markNeedsPaint 是一个非常关键的点，这个标记将直接影响到最终的绘制函数 flushPaint 的执行性能，我们来拆解一步步看这个函数：</p><div class="language-dart vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">dart</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">markNeedsPaint</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">assert</span><span style="color:#E1E4E8;">(owner </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">||</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">!</span><span style="color:#E1E4E8;">owner.debugDoingPaint);</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (_needsPaint)</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  _needsPaint </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">/// ...更多代码</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">markNeedsPaint</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">assert</span><span style="color:#24292E;">(owner </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">||</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">!</span><span style="color:#24292E;">owner.debugDoingPaint);</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (_needsPaint)</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  _needsPaint </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">/// ...更多代码</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>首先判断是否已经标记了 _needsPaint 为 true，如果标记了则直接退出。</p><div class="language-dart vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">dart</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">_needsPaint </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (isRepaintBoundary) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">assert</span><span style="color:#E1E4E8;">(() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (debugPrintMarkNeedsPaintStacks)</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">debugPrintStack</span><span style="color:#E1E4E8;">(label</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;markNeedsPaint() called for $</span><span style="color:#79B8FF;">this</span><span style="color:#9ECBFF;">&#39;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }());</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// If we always have our own layer, then we can just repaint</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// ourselves without involving any other nodes.</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">assert</span><span style="color:#E1E4E8;">(_layer </span><span style="color:#F97583;">is</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">OffsetLayer</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (owner </span><span style="color:#F97583;">!=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    owner._nodesNeedingPaint.</span><span style="color:#B392F0;">add</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    owner.</span><span style="color:#B392F0;">requestVisualUpdate</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">_needsPaint </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (isRepaintBoundary) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">assert</span><span style="color:#24292E;">(() {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (debugPrintMarkNeedsPaintStacks)</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">debugPrintStack</span><span style="color:#24292E;">(label</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;markNeedsPaint() called for $</span><span style="color:#005CC5;">this</span><span style="color:#032F62;">&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  }());</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// If we always have our own layer, then we can just repaint</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// ourselves without involving any other nodes.</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">assert</span><span style="color:#24292E;">(_layer </span><span style="color:#D73A49;">is</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">OffsetLayer</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (owner </span><span style="color:#D73A49;">!=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    owner._nodesNeedingPaint.</span><span style="color:#6F42C1;">add</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">this</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    owner.</span><span style="color:#6F42C1;">requestVisualUpdate</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>将该 RenderObject 的 _needsPaint 标记为 true，然后判断是否为 isRepaintBoundary ，那什么是 isRepaintBoundary 呢？</p><p>在 Flutter 中有一个这样的组件 RepaintBoundary ，该组件自带 isRepaintBoundary 属性为 true ，你可以将其他组件使用 RepaintBoundary 来包裹。这个组件代表的是将组件作为一个独立的渲染模块。在上面代码中，如果当前是 isRepaintBoundary 则将当前 RenderObject添加到 nodesNeedingPaint 然后返回即可。</p><div class="language-dart vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">dart</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (parent </span><span style="color:#F97583;">is</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">RenderObject</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">final</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">RenderObject</span><span style="color:#E1E4E8;"> parent </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.parent </span><span style="color:#F97583;">as</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">RenderObject</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  parent.</span><span style="color:#B392F0;">markNeedsPaint</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">assert</span><span style="color:#E1E4E8;">(parent </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.parent);</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">else</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (parent </span><span style="color:#D73A49;">is</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">RenderObject</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">final</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">RenderObject</span><span style="color:#24292E;"> parent </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.parent </span><span style="color:#D73A49;">as</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">RenderObject</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  parent.</span><span style="color:#6F42C1;">markNeedsPaint</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">assert</span><span style="color:#24292E;">(parent </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.parent);</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>如果当前不是 isRepaintBoundary ，则需要往父节点层层寻找，也层层标记 _needsPaint ，导致当前节点上的所有父节点都需要进行 _needsPaint 操作。</p><p>因此这里有一点编码性能考量的点，我们可以将那些频繁需要重绘的组件使用 RepaintBoundary 进行封装，减少当前节点的绘制引发的父节点的重绘操作。在 Flutter 中的大部分基础组件都是使用了 RepaintBoundary 进行包裹的，因此如果你单纯修改某部分组件时是不会引起到父组件的重绘，从而影响性能体验。</p><h4 id="markneedslayout" tabindex="-1">markNeedsLayout <a class="header-anchor" href="#markneedslayout" aria-label="Permalink to &quot;markNeedsLayout&quot;">​</a></h4><p>markNeedsLayout 主要是用来标记是否需要重新布局的，里面的逻辑和 markNeedsPaint 非常相似。同样也是存在性能提升的空间，当对一个组件需要频繁的进行布局调整时，比如需要频繁增删元素的组件，需要频繁调整大小的组件，使用 RelayoutBoundary 来封装将会有一定的性能提升空间。</p><p>如果是自己在写一个基础组件的时候，就要非常注意这点，对于一些频繁改动的点，或者需要频繁进行布局修改的组件，使用 RepaintBoundary 和 RelayoutBoundary进行封装。其次你在性能分析的时候，特别要留意这两个关键的点，当性能出现问题时，可以尝试从这两个点出发去寻找。</p><h3 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h3><p>本课时从操作系统的渲染原理，分析了 Flutter 在性能体验上，为什么优于其他跨端技术框架的。接下来着重介绍了 Flutter核心渲染原理，并从渲染原理中分析后续在编码过程中需要注意的性能优化方向。学完本课时后，你需要掌握 Flutter 渲染核心流程，并且掌握在编码过程中着重注意 RepaintBoundary 和 RelayoutBoundary的使用。</p><p><a href="https://github.com/love-flutter/flutter-column" target="_blank" rel="noreferrer">点击此链接查看本课时源码</a></p>`,22);function m(b,f,A,P,D,k){const n=o("Image");return t(),r("div",null,[y,l(n,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image/M00/46/CD/CgqCHl9GHCiAcll1AABzhn4c_Mc466.png"}),a(),i,E,d,u,h,F,l(n,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image/M00/46/CD/CgqCHl9GHD6AMhMQAACUmX1O0GA575.png"}),a(),g,l(n,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image/M00/46/C2/Ciqc1F9GHHWARkxZAAJL5Wf7xQQ911.png"}),a(),_,l(n,{alt:"image (2).png",src:"https://s0.lgstatic.com/i/image/M00/46/E5/CgqCHl9GQHCAKO25AAEzFRZSEzw956.png"}),a(),C])}const R=e(c,[["render",m]]);export{v as __pageData,R as default};
