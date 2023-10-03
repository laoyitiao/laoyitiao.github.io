import{_ as a,o as s,g as p,Q as l}from"./chunks/framework.f949202b.js";const E=JSON.parse('{"title":"破题 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/107-前端面试宝典之 React篇文档/(5791) 01  你真的了解 React 吗？.md","filePath":"posts/frontEnd/107-前端面试宝典之 React篇文档/(5791) 01  你真的了解 React 吗？.md","lastUpdated":null}'),t={name:"posts/frontEnd/107-前端面试宝典之 React篇文档/(5791) 01  你真的了解 React 吗？.md"},o=l(`<p>你真的了解 React 吗？我们在面试中往往涉及 React 时，第一个问题就是&quot;解释 React 是什么&quot;。解释一种技术是什么，在面试中也是非常常见的引起 话题的题目。所以本讲我就带你通过讲解&quot;如何解释 React 是什么&quot;，让你掌握这一类概念题在面试中的解答技巧。</p><h3 id="破题" tabindex="-1">破题 <a class="header-anchor" href="#破题" aria-label="Permalink to &quot;破题&quot;">​</a></h3><p>&quot;如何解释 React 是什么？&quot;还有一种常见的问法是这样的：&quot;谈一谈你对 React 的理解&quot;。</p><p>这个题目看似很容易，却很不好回答，因为大部分人拿到这个问题首先会&quot;线性思考&quot;，即一种直线的、单向的思维方式，表现为：想到哪儿讲到哪儿，缺乏全盘考虑。然后凭直觉作答，这样显然是不行的。可以看看这样一个在面试中很常见的场景。</p><blockquote><p>面试官：如何解释 React 是什么？</p><p>应聘同学：React 是一个库。</p><p>面试官：对，能再补充一点吗？</p><p>应聘同学：React 的特点是声明式、组件化、一次学习随处编写。</p><p>面试官：还有再补充的吗？</p><p>应聘同学：React 的原理是......</p></blockquote><p>很显然，在这个场景中，你已经失去了主动权，不断地被外界推着往前走。甚至最后你已经不是在回答 React 是什么了，而是跑到另外一个问题去了。看似简单的提问其实不仅能反映出你对 React 的了解程度，还能反映出你在工作中的状态以及思考问题的思路：</p><ul><li><p>你是出现一个问题解决一个问题，不断被外界推着线性往前走；</p></li><li><p>还是能够高屋建瓴地思考全局。</p></li></ul><p>你在工作中是不是也有类似的感觉？比如刚接触新技术的时候和变成熟手之后会有些不同的认知与感悟。就像老话说的一样：</p><blockquote><p>参禅之初，看山是山，看水是水；禅有悟时，看山不是山，看水不是水；禅中彻悟，看山仍然山，看水仍然是水。</p></blockquote><p>所以本题同样考察了你对 React 的理解度，是否有&quot;看山水&quot;的那种变化。理解到了这一层意思，那么就完成了破题的第一步。但仅到这一步仍然是不够的，还需要在表达上有方法论的支持。</p><p>就像开篇所描述的场景：对概念很熟，对知识点也很了解，相关工具不知道用了多少次了，但面试的时候，突然整个人就拧巴了， 不知道怎么讲。那就是因为缺少相应的方法论，所以才会出现知道是什么，而无法清晰地表达的情况。<strong>所以我们既要重视知识本身，也要重视表达方法。</strong></p><p>对待这类概念题，讲究一个四字口诀&quot;<strong>讲说理列</strong>&quot;，即&quot;讲概念，说用途，理思路，优缺点，列一遍&quot; 。</p><ul><li><p>讲概念：用简洁的话说清楚该技术是什么。最好能用一句话描述。</p></li><li><p>说用途：描述该技术的用途。能够具体结合适合场景，拓展性的描述。</p></li><li><p>理思路：梳理该技术的核心思路或运作流程。这个地方可深可浅，如果对其有足够深入的了解，建议详细地展开说明。</p></li><li><p>优缺点，列一遍：对该技术栈的优缺点进行列举。列举优缺点肯定有与其他技术方案横向对比的过程，那么在这个过程中，切忌刻意地踩一捧一，容易引发面试官的反感。</p></li></ul><p>这是本题第二个重要点，即表达的技巧，也是本专栏的一个重要主题：不只是梳理知识，更要学会如何回答问题。</p><p>破题是一个思维发散的过程，接下来需要把上面思考的内容收一下。</p><h3 id="承题" tabindex="-1">承题 <a class="header-anchor" href="#承题" aria-label="Permalink to &quot;承题&quot;">​</a></h3><p>现在从上面&quot;碎碎念&quot;的思考中整理一下信息，即采用非线性的结构化模式阐述答案。基于上面我们说到的&quot;四字口诀&quot;这一表达技巧的基础上，就非常容易延伸出我们作答的大体框架。</p><ul><li><p>讲概念需要讲什么？讲技术本质。</p></li><li><p>说用途是说什么？说使用场景。</p></li><li><p>理思路是理什么？理核心技术思路。</p></li><li><p>列优缺点是列什么？是通过对比调研业界流行的技术方案，去发掘 React 的独特优势，去找出 React 的缺点。</p></li></ul><p><img src="https://s0.lgstatic.com/i/image/M00/72/A0/CgqCHl_EZ8qAQr-eAACBpQpuhis827.png" alt="Drawing 1.png"><br> 知识导图</p><h3 id="入手" tabindex="-1">入手 <a class="header-anchor" href="#入手" aria-label="Permalink to &quot;入手&quot;">​</a></h3><p>根据以上的分析，接下来我带你一一进行拆解。</p><h4 id="概念" tabindex="-1">概念 <a class="header-anchor" href="#概念" aria-label="Permalink to &quot;概念&quot;">​</a></h4><p>回归本质，React 是一个网页 UI 框架。当然这样一个随处可见的回答并不能令人满意，我们需要回顾历史去寻找答案。</p><p>React 诞生于 jQuery、AngularJS 与 Backbone.js 相继流行的时代。<strong>jQuery 诞生于 2005 年，浏览器兼容性是当时最大的问题。<strong>为了解决这个问题， jQuery 封装 DOM 操作，提供样式选择器，封装了 AJAX、链式操作等大量基础函数。但从如今的视角来看，jQuery 并没有解决代码如何组织的问题，甚至</strong>不能称之为框架，本质上它只是一个工具函数合集</strong>。</p><p>因为无论是从 jQuery 输入端，还是输出端来看，一切都是混沌的。HTML、CSS、JavaScript 就像原料一样送入 jQuery 搅拌机，拌着拌着拌出一个网页。你会发现并没有一个可以称之为模式的方式将这些原料有序地组合在一起，因为这并不是 jQuery 能够解决的问题。</p><p><img src="https://s0.lgstatic.com/i/image/M00/72/A0/CgqCHl_EZ-GASOvLAAColjE_COU357.png" alt="Drawing 3.png"><br> jQuery 代码组织方式</p><p>当然，这段时间网页还不够复杂，效果还不需要做得很酷炫。然而当 PC 的性能越来越好，页面变得越来越复杂，前端的工程也开始庞大了起来。<strong>如何组织代码结构，如何有效提升复用率，开始成为大家亟待解决的问题。</strong></p><p><strong>2009年，AngularJS 横空出世，带着 Java 开发的先进经验闯入了前端的世界中。</strong> 它不仅引入了 MVC 的思想，还强行灌入了 controller、$scope、service 等一系列概念。如同 Spring Boot，AngularJS 提供了一揽子全家桶解决方案，从底层开始深度封装，向上提供了路由、双向绑定、指令、组件等框架特性。</p><p>AngularJS 的分层设计是齐全且优秀的，覆盖了整个 Web 开发的方方面面。MVC 它有，数据绑定它有，前端路由它有，表单校验它有，设计模式它也有，内容多到像一本百科全书。如下图所示。</p><p><img src="https://s0.lgstatic.com/i/image/M00/72/A0/CgqCHl_EZ-2AaA3VAADybjxzNnA353.png" alt="Drawing 5.png"><br> AngularJS 分层设计图</p><p>但也正是因为它庞大复杂的概念，你在使用 AngularJS 进行开发的时候，需要编写大量的面条代码，你会感觉自己并不是在写前端，而是在写 AngularJS。jQuery 时代和 AngularJS 时代，一个最明显的区别在于，jQuery 时代是与浏览器斗争，而 AngularJS 时代，更像是与 AngularJS 斗争。代码如何组织是清晰了，可数不清的概念，让 AngularJS 看起来更像一个披着前端皮的 Java 框架。甚至会有人感慨，这一切值得吗？</p><p>当然也有值得的地方，AngularJS 的双向绑定就是当时最大的特色。双向绑定在中后台网页开发中极大地提升了开发效率。中后台页面几乎全是列表与表单，双向绑定使值与视图动态可以自动更新，节约了几乎一半以上手动编写代码的时间。</p><p>时间继续往前走，<strong>来到了 2010 年，如果你希望自己的代码有序地组织起来，又不想陷入 Angular.js 无穷无尽的概念中，那么 Backbone.js 就是一个很好的选择</strong>。它并没有像 AngularJS 那样带来大量概念，还考虑到了两个方面：</p><ul><li><p><strong>与前代的亲和性</strong>，只要你懂 jQuery，你就可以继续快乐地写前端代码，而不需要再学习一种语言；</p></li><li><p><strong>它考虑了代码的组织性</strong>，引入了基础 MVC 的概念，同时提供集合与前端路由的封装，补齐了 jQuery 无序的短板。</p></li></ul><p>所以对于初学者而言， Backbone.js 非常友好，甚至一度流行。选择 Backbone.js 的最主要原因是<strong>它使前端项目工程化的成本足够低</strong>。这个&quot;低&quot;不光是指开发人员的学习成本低，还有改造成本低，因为大量的 jQuery 存量项目都可以尝试迁移。</p><p><img src="https://s0.lgstatic.com/i/image/M00/72/95/Ciqc1F_EaAiAaC-uAAC9WCoWxxk994.png" alt="Drawing 7.png"><br> Backbone 的结构图</p><p>回顾历史会发现，前端项目在不断地工程化，同时也不断地发展出新的概念。但这两个问题还是难以解决：</p><ul><li><p>与后端不同的是前端主要以 UI 组件为基础，需要一个可以使组件复用的开发方案，过去常见的复用方案是拼装模板；</p></li><li><p>前端工程越来越庞杂，组件作为基本单位应该是可以通过编写单元测试来维持稳定性的。</p></li></ul><p>基于过去的模式，要做到这两点是非常困难的。你会发现过去的框架通常是从页面的维度去思考，然后零星装上 jQuery 的各种小插件。</p><p>初次接触 React 的同学会发现，开发 React 的思维模式是完全不同的，概念也极为简单。如果用一个非常简洁的公式来表达，那就是：</p><blockquote><p>View = fn(props)</p></blockquote><p>这个公式表达了给定相同的输入状态， 函数总是会生成一致的组件。只有做到输入与输出恒定，那么它才是可测的。</p><p>其次 fn 内部也可以是无数个组件构成的。React 中只有组件，没有页面，没有控制器，也没用模型。没有页面？那就用组件组合生成一个页面，没有控制器，那就用组件充当控制器。就像搭建乐高玩具一样。</p><p>当然 React 的变量会更多一些，将 state 和 context 考虑进去，那也是可以表达的：</p><blockquote><p>View = fn(props, state, context)</p></blockquote><p>从实际编码上来讲，fn 可能是一个类组件，也可能是纯函数组件，也可能在函数中产生影响 UI 生成的副作用，比如直接操作 DOM 或者绑定事件等。经典公式总是会展示理想情况，就像 E=mc² 简化了大量的外界干扰因素，但这不妨碍它表达了一个结论，即在 React 中只需要关心两件事：数据与组件。</p><p>那为什么会把基本单位定位于组件呢？如果对设计模式有印象的话，你是否还记得&quot;组合优于继承&quot;的铁律？即在构建 UI 视图时，组合组件始终是最优的解决方案。</p><p>而 React 是通过组件化的方式解决视图层开发复用的问题，本质是一个组件化框架。</p><h4 id="用途" tabindex="-1">用途 <a class="header-anchor" href="#用途" aria-label="Permalink to &quot;用途&quot;">​</a></h4><p>React 的用途当然是<strong>构建视图啦。由于 React 虚拟 DOM 的关系，在适用场景上远比传统框架更为广泛：</strong></p><ul><li><p>首先无论是 PC 网页还是移动端网页，都是完全支持的；</p></li><li><p>其次由于 React Native，也可以用于开发 iOS 与 Android 应用；</p></li><li><p>还有 React 360 可以开发 VR 应用；</p></li><li><p>冷门儿的如 ink，也可以使用 React 开发命令行应用。</p></li></ul><p>React 的生态极大地丰富了其使用场景。</p><h4 id="核心思路" tabindex="-1">核心思路 <a class="header-anchor" href="#核心思路" aria-label="Permalink to &quot;核心思路&quot;">​</a></h4><p><strong>React 的核心思路有三点，分别是声明式、组件化与通用性</strong>（官方称之为：一次学习，随处编写）。</p><p><strong>声明式</strong></p><p><strong>声明式编程的优势在于直观，可以做到一目了然，也便于组合。</strong></p><p>如果是命令式编程，那么会是这样：</p><div class="language-java vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// HTML</span></span>
<span class="line"><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;">div class</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;block&quot;</span><span style="color:#F97583;">&gt;&lt;/</span><span style="color:#E1E4E8;">div</span><span style="color:#F97583;">&gt;</span></span>
<span class="line"><span style="color:#6A737D;">// JS</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> block </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">$</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;.block&#39;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">block.</span><span style="color:#B392F0;">css</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;color&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&#39;red&#39;</span><span style="color:#E1E4E8;">);</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// HTML</span></span>
<span class="line"><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;">div class</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;block&quot;</span><span style="color:#D73A49;">&gt;&lt;/</span><span style="color:#24292E;">div</span><span style="color:#D73A49;">&gt;</span></span>
<span class="line"><span style="color:#6A737D;">// JS</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> block </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">$</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;.block&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">block.</span><span style="color:#6F42C1;">css</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;color&#39;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&#39;red&#39;</span><span style="color:#24292E;">);</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>如果是 React，则会这样写：</p><div class="language-java vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> Block </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> (props) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;">div style</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">{ { color</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;red&#39;</span><span style="color:#E1E4E8;"> }}</span><span style="color:#F97583;">&gt;&lt;/</span><span style="color:#E1E4E8;">div</span><span style="color:#F97583;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> Block </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> (props) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;">div style</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">{ { color</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;red&#39;</span><span style="color:#24292E;"> }}</span><span style="color:#D73A49;">&gt;&lt;/</span><span style="color:#24292E;">div</span><span style="color:#D73A49;">&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>相较于上面的写法，Block 不仅结构上更容易阅读，而且更容易与其他组件代码进行组合。</p><p><strong>组件化</strong></p><p><strong>组件化可以降低系统间功能的耦合性，提高功能内部的聚合性</strong>。对前端工程化及代码复用有极大的好处。React 组件化最大的区别在于没有使用模板进行编写，而是采用了声明式的 JSX。</p><p><strong>通用性</strong></p><p>这就要说到 React 的虚拟 DOM。React 将 DOM 抽象为虚拟 DOM，开发者并不会直接操作 DOM。正因为有这样一层封装，使得 React 不再局限于 Web 开发，而能走向更宽广的平台，出现更繁荣的生态。无论是 Native、VR 还是 Shell 命令，只要兼容虚拟 DOM 层，那么都可以直接运行 React。详细内容可以查阅第 09 讲。</p><h4 id="优缺点" tabindex="-1">优缺点 <a class="header-anchor" href="#优缺点" aria-label="Permalink to &quot;优缺点&quot;">​</a></h4><p>其实核心设计思路就是 React 的优点：声明式、组件化与通用性。</p><p><strong>当然 React 也有缺点，</strong> 由于 React 并不是一个一揽子框架，比如路由一类的功能，React 团队更希望交给社区来解决。所以导致在技术选型与学习使用上有比较高的成本。但也正因为社区蓬勃发展，非官方的一揽子解决方案还是有的，比如 DvaJS、React-coat 等填补了生态位的缺失。所以 React 也是一个使用者上限与下限差距极大的框架。</p><h3 id="答题" tabindex="-1">答题 <a class="header-anchor" href="#答题" aria-label="Permalink to &quot;答题&quot;">​</a></h3><p>经过以上的梳理，我们可以尝试答题了。</p><blockquote><p>React 是一个网页 UI 框架，通过组件化的方式解决视图层开发复用的问题，本质是一个组件化框架。</p><blockquote><p>它的核心设计思路有三点，分别是声明式、组件化与 通用性。</p><p>声明式的优势在于直观与组合。</p><p>组件化的优势在于视图的拆分与模块复用，可以更容易做到高内聚低耦合。</p><p>通用性在于一次学习，随处编写。比如 React Native，React 360 等， 这里主要靠虚拟 DOM 来保证实现。</p><p>这使得 React 的适用范围变得足够广，无论是 Web、Native、VR，甚至 Shell 应用都可以进行开发。这也是 React 的优势。</p><p>但作为一个视图层的框架，React 的劣势也十分明显。它并没有提供完整的一揽子解决方 案，在开发大型前端应用时，需要向社区寻找并整合解决方案。虽然一定程度上促进了社区的繁荣，但也为开发者在技术选型和学习适用上造成了一定的成本。</p></blockquote></blockquote><p>回答到这里基本就差不多了，但在面试的时候，我们可以尝试拿到更多的主动性，即补充类似如下的回答：</p><ul><li><p>承接在优势后，可以再谈一下自己对于 React 优化的看法（详细内容可参考模块四）、对虚拟 DOM 的看法（详细内容可参考第 09 讲）；</p></li><li><p>向自己主导过的 React 项目上引导，谈一谈 React 相关的工程架构与设计模式（详细内容可参考第 18 讲）。</p></li></ul><p>整体的面试时间总是固定的，所以如果有机会的话，尽可能展示你最熟悉的知识点和最丰富的实践案例。</p><h3 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h3><p>本讲主要讲解了&quot;如何解释 React 是什么&quot;这样一个看似简单却又很难解释的问题。&quot;如何解释 React 是什么？&quot;反映了面试者对 React 的认知水平，常用来快速划分面试者层次。通过这一讲你可以掌握 React 的核心设计思考，了解与其他框架的区别，更重要的是使用非线性的结构化思考模式来回答考官的这一类问题，这一点比答案本身更重要。</p><p>在本讲中提到了&quot;声明式&quot;这样一个概念，那 React 在组件中是如何展现&quot;声明式&quot;的呢？接下来的 02 讲我们会讲这个问题。</p><p><a href="https://shenceyun.lagou.com/t/mka" target="_blank" rel="noreferrer"><img src="https://s0.lgstatic.com/i/image/M00/72/94/Ciqc1F_EZ0eANc6tAASyC72ZqWw643.png" alt="Drawing 2.png"></a></p><p>《大前端高薪训练营》</p><p>对标阿里 P7 技术需求 + 每月大厂内推，6 个月助你斩获名企高薪 Offer。<a href="https://shenceyun.lagou.com/t/mka" target="_blank" rel="noreferrer">点击链接</a>，快来领取！</p>`,80),n=[o];function e(r,c,i,u,g,y){return s(),p("div",null,n)}const h=a(t,[["render",e]]);export{E as __pageData,h as default};
