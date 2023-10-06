import{_ as e,j as p,o as l,g as r,k as n,s as a,Q as t,h as o}from"./chunks/framework.b3d8e22e.js";const R=JSON.parse('{"title":"破题 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/107-前端面试宝典之 React篇文档/(5799) 09  Virtual DOM 的工作原理是什么？.md","filePath":"posts/frontEnd/107-前端面试宝典之 React篇文档/(5799) 09  Virtual DOM 的工作原理是什么？.md","lastUpdated":1696417798000}'),c={name:"posts/frontEnd/107-前端面试宝典之 React篇文档/(5799) 09  Virtual DOM 的工作原理是什么？.md"},i=t('<p>在面试中，&quot;Virtual DOM 的工作原理是什么？&quot;是经常会被问到的问题。这讲我将带你一起探讨下这个问题应该如何作答。</p><h3 id="破题" tabindex="-1">破题 <a class="header-anchor" href="#破题" aria-label="Permalink to &quot;破题&quot;">​</a></h3><p>这同样是一个&quot;是什么&quot;的题目。在经过前面多次讲解该类型题后，你应该可以条件反射地想到 &quot;讲说理列&quot; 这个方法论了。那么，初步的答题框架就有了，接下来只需要填空就行了。</p><p>再回过头来聊聊<strong>Virtual DOM</strong> ，简称<strong>VDOM</strong> ，也被称为<strong>虚拟 DOM</strong> 。在<a href="https://kaiwu.lagou.com/course/courseInfo.htm?courseId=566#/detail/pc?id=5792" target="_blank" rel="noreferrer">第 02 讲&quot;为什么 React 要用 JSX？&quot;</a>中，我们提到，为了更便捷高效地使用声明式开发组件，引入了 XML 语法结构的 JSX。JSX 经过编译后会生成类似 React.creatElement 函数包裹标签及属性。那么这里的 React.creatElement 函数所返回的就是一个虚拟 DOM。虚拟 DOM 并不是只有 React 才有，只是经过 React 的发扬光大，变得很是流行。同样 Vue 从 1.0 升级到 2.0，最大的变化就是引入了虚拟 DOM。那虚拟 DOM 为什么能够引起关注，触发流行呢？这是我们在答题时不可回避的点。</p><h3 id="承题" tabindex="-1">承题 <a class="header-anchor" href="#承题" aria-label="Permalink to &quot;承题&quot;">​</a></h3><p>根据以上的分析，初步的答题框架出来了：基础部分仍然是&quot;讲说理列&quot;，除此之外，我希望你能加入这个核心点的回答，即引发流行的原因。</p>',6),E=t(`<p>当然，在面试中，面试官问到的所有知识点，不可能全都是你知道的内容。这里我们就需要学会推理，即编程开发在答题时应该有自己的<strong>逻辑性</strong>，通过已知的内容推理出未知的内容。</p><h3 id="入手" tabindex="-1">入手 <a class="header-anchor" href="#入手" aria-label="Permalink to &quot;入手&quot;">​</a></h3><p>在正式谈论虚拟 DOM 之前，需要先聊一下虚拟 DOM 的由来，以及它是如何出现在 React 中的。</p><h4 id="_1-历史" tabindex="-1">1. 历史 <a class="header-anchor" href="#_1-历史" aria-label="Permalink to &quot;1. 历史&quot;">​</a></h4><p>React 的原型是 XHP，该框架于 2010 年开源。Facebook 创建 XHP 的目的主要有两点。</p><ul><li><p><strong>简化前端开发</strong>，按照现在流行的说法叫后端赋能，让后端开发人员能够快速交付页面。</p></li><li><p><strong>避免跨站点脚本攻击</strong> ，也就是常说的 XSS， Facebook 拥有庞大的站点，很容易因为一处暴露 XSS 而造成整体风险。XSS 不会直接攻击网页，而是通过嵌入 JavaScript 代码的方式，将恶意攻击附加到用户的请求中来攻击用户。它可以被用作窃取用户信息，或者恶意增删用户的一些资料。而 XHP 的优势就在于可以<strong>默认启用 XSS 保护</strong>。</p></li></ul><p>所有的页面在 XHP 中构建完成，并没有直接的 HTML，都是通过<strong>转义的方式</strong>生成的。这样的过程确保可以在 XHP 中写出安全的静态页面，但如果需要构建动态的网页应用（国内一般称之为 H5 网站），就会有一些问题了。 这意味着，一旦状态发生更改，网页就需要重新渲染，从而丢失之前网页中的信息。Facebook 团队很早就意识到，这个问题对于页面性能和用户体验来说是十分糟糕的。这就使他们产生了思考：为什么仅仅因为状态改变，就不得不重新渲染整个页面？</p><p>在 2011 年，Facebook 的工程师 Jordan Walke 开始研究能使这个过程更为高效、用户体验更为合理的原型方案。这就出现了 React 最初的构想：不再基于 XHP，而是基于 JavaScript 的用户界面构建库。大神非常高效，仅仅几个月后就完成了 React 的开发工作，并用于 Facebook 主站的&quot;赞&quot;与评论功能。</p><p>但这个时期的 React 必须基于 Facebook 背后的研发工具链才能工作。将其剥离开来的契机是 Instagram 团队希望能在它们的产品中使用 React。当时是 2012 年，Facebook 才完成 Instagram 的收购，Instagram 希望在技术栈上向 Facebook 进行取经，即使用 React 技术栈。也正因为 Instagram 的这个请求，使得 React 得以从 Facebook 内部的技术栈中剥离出来，成为之后开源的基础。</p><p>2013 年 5 月，Facebook 正式宣布开源 React 。</p><p>回顾这段历史，你会发现 Facebook 一开始的初衷就是<strong>简化前端开发</strong> 、<strong>防止 XSS</strong>。它的解决方案也很粗暴，即不要直接操作 DOM，而是通过虚拟 DOM 规避风险。因为直接操作 DOM 可能会带来 XSS 的风险，也可能因为技术水平的限制，带来性能问题。如果你心爱的东西不喜欢有人去触碰，最好的方法就是把它封起来，与使用者相隔离，因此有了今天所看到的虚拟 DOM。</p><p>在日常的工作中，我们经常会提到虚拟 DOM，但是很多人对它并没有一个清晰的认识。写了很久 React 的你，是不是也会经常疑惑，它究竟长什么样子呢？</p><h4 id="_2-推理" tabindex="-1">2. 推理 <a class="header-anchor" href="#_2-推理" aria-label="Permalink to &quot;2. 推理&quot;">​</a></h4><p>要知道编程最有意思的地方是<strong>逻辑的严密性</strong>，即便我们并没有直接阅读源码，也是可以去推理它的结构。所以在面试中即便遇到了知识盲区，也不要急。</p><p>先整理下之前学过的关于虚拟 DOM 的内容。</p><ul><li>在 JSX 的使用中，JSX 所描述的结构，会转译成 React.createElement 函数，大致像这样：</li></ul><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// JSX 描述</span></span>
<span class="line"><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;">input type</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;button&quot;</span><span style="color:#F97583;">/&gt;</span></span>
<span class="line"><span style="color:#6A737D;">// Babel 转译后</span></span>
<span class="line"><span style="color:#E1E4E8;">React.</span><span style="color:#B392F0;">createElement</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;input&#39;</span><span style="color:#E1E4E8;">, { type</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;button&quot;</span><span style="color:#E1E4E8;"> })</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// JSX 描述</span></span>
<span class="line"><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;">input type</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;button&quot;</span><span style="color:#D73A49;">/&gt;</span></span>
<span class="line"><span style="color:#6A737D;">// Babel 转译后</span></span>
<span class="line"><span style="color:#24292E;">React.</span><span style="color:#6F42C1;">createElement</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;input&#39;</span><span style="color:#24292E;">, { type</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;button&quot;</span><span style="color:#24292E;"> })</span></span></code></pre></div><ul><li>React 会持有一棵虚拟 DOM 树，在状态变更后，会触发虚拟 DOM 树的修改，再以此为基础修改真实 DOM。</li></ul><p>根据上面的已知条件，可以很快地得出结论：React.createElement 返回的结果应该是一个 JavaScript Object。由于是树结构，所以一定包含一个 children 字段，来建立与子级的关联关系。所以可以推测出它的结构像下面这样：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// 想象中的结构</span></span>
<span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">  tag</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;input&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  props</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    type</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;button&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  children</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> []</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// 想象中的结构</span></span>
<span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">  tag</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;input&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  props</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    type</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;button&#39;</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  children</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> []</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>基于基本认知，React 有两个函数：</p><ul><li><p>diff 函数，去<strong>计算</strong>状态变更前后的虚拟 DOM 树差异；</p></li><li><p>渲染函数，<strong>渲染</strong>整个虚拟 DOM 树或者处理差异点。</p></li></ul><p>现在是不是有些理解为什么 React 与 ReactDOM 是两个库了？正是由于计算与渲染的分工。在日常的开发中，就像下面的代码案例一样，需要同时引入 React 与 ReactDOM 两个库：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> React from &#39;react&#39;;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> ReactDOM from &#39;react</span><span style="color:#FDAEB7;font-style:italic;">-</span><span style="color:#E1E4E8;">dom&#39;;</span></span>
<span class="line"><span style="color:#E1E4E8;">ReactDOM.</span><span style="color:#B392F0;">render</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;">h1</span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;">hi</span><span style="color:#F97583;">!&lt;/</span><span style="color:#E1E4E8;">h2</span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;">, document.</span><span style="color:#B392F0;">getElementById</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;root&#39;</span><span style="color:#E1E4E8;">));</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> React from &#39;react&#39;;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> ReactDOM from &#39;react</span><span style="color:#B31D28;font-style:italic;">-</span><span style="color:#24292E;">dom&#39;;</span></span>
<span class="line"><span style="color:#24292E;">ReactDOM.</span><span style="color:#6F42C1;">render</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;">h1</span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;">hi</span><span style="color:#D73A49;">!&lt;/</span><span style="color:#24292E;">h2</span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;">, document.</span><span style="color:#6F42C1;">getElementById</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;root&#39;</span><span style="color:#24292E;">));</span></span></code></pre></div><p>其中 React 主要的工作是组件实现、更新调度等计算工作；而 ReactDOM 提供了在网页上渲染的基础。</p><p>也正因为这样的拆分，当 React 向 iOS、Android 开发时，只需要通过 React Native 提供 Native 层的元素渲染即可完成。</p><h4 id="_3-优势" tabindex="-1">3. 优势 <a class="header-anchor" href="#_3-优势" aria-label="Permalink to &quot;3. 优势&quot;">​</a></h4><p>如果将前面的内容稍加整理，可以得出虚拟 DOM 有这样几个优势：</p><ul><li><p>性能优越；</p></li><li><p>规避 XSS；</p></li><li><p>可跨平台。</p></li></ul><p>但这样的答案是有问题的。因为在谈论优势时一定要讨论它的<strong>边界</strong>。</p><p>有经验的面试官可能会这样问：&quot;虚拟 DOM 一定比真实的 DOM 操作性能更高吗？&quot;其实不是，如果只修改一个按钮的文案，那么虚拟 DOM 的操作无论如何都不可能比真实的 DOM 操作更快。所以一定要回到<strong>具体的场景</strong>进行探讨。</p><p>如果大量的直接操作 DOM 则容易引起<strong>网页性能的下降</strong>，这时 React 基于虚拟 DOM 的 diff 处理与批处理操作，可以降低 DOM 的操作范围与频次，提升页面性能。在这样的场景下虚拟 DOM 就比较快，那什么场景下虚拟 DOM 慢呢？首次渲染或微量操作，虚拟 DOM 的渲染速度就会比真实 DOM 更慢。</p><p>那虚拟 DOM 一定可以<strong>规避 XSS</strong>吗？虚拟 DOM 内部确保了字符转义，所以确实可以做到这点，但 React 存在风险，因为 React 留有 dangerouslySetInnerHTML API 绕过转义。</p><p>没有虚拟 DOM 不能实现<strong>跨平台</strong> 吗？比如 NativeScript 没有虚拟 DOM 层 ，它是通过提供兼容原生 API 的 JS API 实现跨平台开发。那虚拟 DOM 的优势在哪里？实际上它的优势在于<strong>跨平台的成本更低</strong>。在 React Native 之后，前端社区从虚拟 DOM 中体会到了跨平台的无限前景，所以在后续的发展中，都借鉴了虚拟 DOM。比如：社区流行的小程序同构方案，在构建过程中会提供类似虚拟 DOM 的结构描述对象，来支撑多端转换。</p><h4 id="_4-缺点" tabindex="-1">4. 缺点 <a class="header-anchor" href="#_4-缺点" aria-label="Permalink to &quot;4. 缺点&quot;">​</a></h4><p>社区公认虚拟 DOM 的缺点有两个。</p><ul><li><p><strong>内存占用较高</strong>。因为当前网页的虚拟 DOM 包含了真实 DOM 的完整信息，而且由于是 Object，其内存占用肯定会有所上升。</p></li><li><p><strong>无法进行极致优化</strong>。 虽然虚拟 DOM 足以应对绝大部分应用的性能需求，但在一些性能要求极高的应用中，虚拟 DOM 无法进行针对性的极致优化，比如实现类似 Google Earth 的场景。</p></li></ul><h3 id="答题" tabindex="-1">答题 <a class="header-anchor" href="#答题" aria-label="Permalink to &quot;答题&quot;">​</a></h3><blockquote><p>虚拟 DOM 的<strong>工作原理</strong>是通过 JS 对象模拟 DOM 的节点。在 Facebook 构建 React 初期时，考虑到要提升代码抽象能力、避免人为的 DOM 操作、降低代码整体风险等因素，所以引入了虚拟 DOM。</p><p>虚拟 DOM 在<strong>实现上</strong>通常是 Plain Object，以 React 为例，在 render 函数中写的 JSX 会在 Babel 插件的作用下，编译为 React.createElement 执行 JSX 中的属性参数。</p><p>React.createElement 执行后会返回一个 Plain Object，它会描述自己的 tag 类型、props 属性以及 children 情况等。这些 Plain Object 通过树形结构组成一棵虚拟 DOM 树。当状态发生变更时，将变更前后的虚拟 DOM 树进行差异比较，这个过程称为 diff，生成的结果称为 patch。计算之后，会渲染 Patch 完成对真实 DOM 的操作。</p><p>虚拟 DOM 的<strong>优点</strong>主要有三点：改善大规模 DOM 操作的性能、规避 XSS 风险、能以较低的成本实现跨平台开发。</p><p>虚拟 DOM 的<strong>缺点</strong>在社区中主要有两点。</p><p>内存占用较高，因为需要模拟整个网页的真实 DOM。</p><p>高性能应用场景存在难以优化的情况，类似像 Google Earth 一类的高性能前端应用在技术选型上往往不会选择 React。</p></blockquote><p>整理下答题内容，可以绘制出如下的知识导图。</p>`,40),y=t('<h3 id="进阶" tabindex="-1">进阶 <a class="header-anchor" href="#进阶" aria-label="Permalink to &quot;进阶&quot;">​</a></h3><p><strong>除了渲染页面，虚拟 DOM 还有哪些应用场景？</strong></p><p>这个问题考验面试者的想象力。通常而言，我们只是将虚拟 DOM 与渲染绑定在一起，但实际上虚拟 DOM 的应用更为广阔。比如，只要你记录了真实 DOM 变更，它甚至可以应用于<strong>埋点统计</strong> 与<strong>数据记录</strong> 等。可以往这个方向回答，具体案例可以参考 <a href="https://github.com/rrweb-io/rrweb" target="_blank" rel="noreferrer">rrweb</a>。</p><h3 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h3><p>学完本讲，你可以掌握关于虚拟 DOM 的常规知识点，但有一点没有详细探讨，就是虚拟 DOM 的 diff 究竟是怎么计算的。在下一讲，我将会与你探讨这个问题。</p><hr>',6),g={href:"https://shenceyun.lagou.com/t/mka",target:"_blank",rel:"noreferrer"},d=a("p",null,"《大前端高薪训练营》",-1),h=a("p",null,[o("对标阿里 P7 技术需求 + 每月大厂内推，6 个月助你斩获名企高薪 Offer。"),a("a",{href:"https://shenceyun.lagou.com/t/mka",target:"_blank",rel:"noreferrer"},"点击链接"),o("，快来领取！")],-1);function u(D,_,O,M,b,m){const s=p("Image");return l(),r("div",null,[i,n(s,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image2/M01/03/E9/Cip5yF_kW-SAOjZHAABUt-IaE0c622.png"}),E,n(s,{alt:"虚拟DOM工作原理.png",src:"https://s0.lgstatic.com/i/image/M00/8C/05/Ciqc1F_kXCaAJS7GAACbWvarErs717.png"}),y,a("p",null,[a("a",g,[n(s,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image/M00/72/94/Ciqc1F_EZ0eANc6tAASyC72ZqWw643.png"})])]),d,h])}const k=e(c,[["render",u]]);export{R as __pageData,k as default};
