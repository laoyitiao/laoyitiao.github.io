import{_ as p,j as l,o as s,g as o,k as t,h as n,Q as a}from"./chunks/framework.4e7d56ce.js";const _=JSON.parse('{"title":"17AngularReactVue三大前端框架的设计特色","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/108-前端进阶笔记文档/(7213) 17  AngularReactVue 三大前端框架的设计特色.md","filePath":"posts/frontEnd/108-前端进阶笔记文档/(7213) 17  AngularReactVue 三大前端框架的设计特色.md","lastUpdated":1696682708000}'),r={name:"posts/frontEnd/108-前端进阶笔记文档/(7213) 17  AngularReactVue 三大前端框架的设计特色.md"},c=a('<h1 id="_17angularreactvue三大前端框架的设计特色" tabindex="-1">17AngularReactVue三大前端框架的设计特色 <a class="header-anchor" href="#_17angularreactvue三大前端框架的设计特色" aria-label="Permalink to &quot;17AngularReactVue三大前端框架的设计特色&quot;">​</a></h1><p>在前面第 10 讲中，我介绍了前端框架中的核心能力------模板引擎。其实，除了模板引擎以外，前端框架还提供了很多其他的能力，比如性能优化相关、状态管理相关等。现如今，虽然各式各样的框架层出不穷，但目前稳定排行在前的基本上是这三大热门框架 Angular/React/Vue（排名不分先后）。</p><p>对于不同的前端框架来说，各自的设计原理和解决方案都有所不同，开发者可根据自身需要选择合适的前端框架。</p><p>今天，我们就来看一下 Angular/React/Vue 三个框架之间的区别、各自的特点和适用场景等</p><h3 id="angular-react-vue-框架对比" tabindex="-1">Angular/React/Vue 框架对比 <a class="header-anchor" href="#angular-react-vue-框架对比" aria-label="Permalink to &quot;Angular/React/Vue 框架对比&quot;">​</a></h3><p>Angular 是一个<strong>应用设计框架与开发平台</strong>，用于创建高效、复杂、精致的单页面应用，提供了前端项目开发较完整的解决方案。</p><p>与此相对，React/Vue 则专注于<strong>构建用户界面</strong>，在一定程度上来说是一个 JavaScript 库，不能称之为框架。</p><p>由于 React/Vue 都提供了配套的页面应用解决方案和工具库，因此我们常常将它们作为前端框架与 Angular放在一起比较。</p><p>实际上，三个框架的关系可以简单用这样的公式表达。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">Angular </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> React</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">Vue </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> 路由库（react</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">router</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">vue</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">router） </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> 状态管理（Redux</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">Flux</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">Mobx</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">Vuex） </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> 脚手架</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">构建（create</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">react</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">app</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">Vue CLI</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">Webpack） </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> ...</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">Angular </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> React</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">Vue </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> 路由库（react</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">router</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">vue</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">router） </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> 状态管理（Redux</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">Flux</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">Mobx</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">Vuex） </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> 脚手架</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">构建（create</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">react</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">app</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">Vue CLI</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">Webpack） </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> ...</span></span></code></pre></div><p>我们先来看看 Angular。</p><h3 id="angular" tabindex="-1">Angular <a class="header-anchor" href="#angular" aria-label="Permalink to &quot;Angular&quot;">​</a></h3><p>Angular 最初的设计是针对大型应用进行的，上手成本较高，因为开发者需要掌握一些对前端开发来说较陌生的概念，其中包括依赖注入、模块化、脏检查、AOT 等设计。</p><h4 id="依赖注入" tabindex="-1">依赖注入 <a class="header-anchor" href="#依赖注入" aria-label="Permalink to &quot;依赖注入&quot;">​</a></h4><p>依赖注入并不是由 Angular 提出的，它是基于依赖倒置的设计原则设计出来的一套机制。</p><p>在项目中，依赖注入体现为：项目提供了这样一个注入机制，其中有人负责提供服务、有人负责消耗服务，通过注入机制搭建了提供服务与消费服务之间的接口。对于消费者来说，无须关心服务是否已经被创建并初始化，依赖注入机制会保证服务的可用性。</p><p>在这样的机制下，开发者只需要关注如何使用服务，至于这个服务内部的实现是怎样的、它是什么时候被初始化的、它又依赖了怎样的其他服务，都交给了依赖注入机制来处理，不需要操心。</p><p>Angular 提供的便是这样一套依赖注入系统，可以及时创建和交付所依赖的服务。Angular 通过依赖注入来帮你更容易地将应用逻辑分解为服务，并让这些服务可用于各个组件中。这便是 Angular 中的依赖注入设计。</p><p>前面提到，Angular 的设计是针对大型应用的，使用依赖注入可以轻松地将各个模块进行解耦，模块与模块之间不会有过多的依赖，可以轻松解决大型应用中模块难以管理的难题。所以在 Angular 中，依赖注入配合模块化组织能达到更好的效果。</p><h4 id="模块化组织" tabindex="-1">模块化组织 <a class="header-anchor" href="#模块化组织" aria-label="Permalink to &quot;模块化组织&quot;">​</a></h4><p>Angular 模块把组件、指令和管道打包成内聚的功能块，每个模块聚焦一个特性区域、业务领域、工作流或通用工具。</p><p>所以我们可以用Angular 模块来自行聚焦某一个领域的功能模块，也可以使用 Angular 封装好的一些功能模块，像表单模块 FormModule、路由模块 RouterModule、Http 模块，等等。</p><p>通过依赖注入的方式，我们可以直接在需要的地方引入这些模块并使用。模块的组织结构为树状结构，不同层级的模块功能组成了完整的应用。通过树状的方式来，依赖注入系统可高效地对服务进行创建和销毁，管理各个模块之间的依赖关系。</p><p>其中，脏检查机制也由于模块化组织的设计，被诟病的性能问题得以解决。</p><h4 id="状态更新-脏检查机制" tabindex="-1">状态更新：脏检查机制 <a class="header-anchor" href="#状态更新-脏检查机制" aria-label="Permalink to &quot;状态更新：脏检查机制&quot;">​</a></h4><p>什么是脏检查呢？在 Angular 中，触发视图更新的时机来自常见的事件如用户交互（点击、输入等）、定时器、生命周期等，大概的过程如下：</p><ol><li><p>在上述时机被触发后，Angular会计算数据的新值和旧值是否有差异；</p></li><li><p>若有差异，Angular 会更新页面，并触发下一次的脏检查；</p></li><li><p>直到新旧值之间不再有差异，或是脏检查的次数达到设定阈值，才会停下来。</p></li></ol><p>由于并不是直接监听数据的变动，同时每一次更新页面之后，很可能还会引起新的值改变，这导致脏检查的效率很低，还可能会导致死循环。虽然 AngularJS 有阈值控制，但也无法避免脏检查机制所导致的低效甚至性能问题。</p><p>脏检查机制在设计上存在的性能问题一直被大家诟病，在 Angular2+ 中引入了模块化组织来解决这个问题。由于应用的组织类是树结构的，脏检查会从根组件开始，自上而下对树上的所有子组件进行检查。相比 AngularJS 中的带有环的结构，这样的单向数据流效率更高，而且容易预测，性能上也有不少的提升。除了模块化组织之外，Angular2+ 同时还引入了 NgZone，提升了脏检查的性能。</p><p>在 Angular 中除了对脏检查机制进行了性能优化，还提供了其他的优化手段，AOT 编译便是其中一种。</p><h4 id="用-aot-进行编译" tabindex="-1">用 AOT 进行编译 <a class="header-anchor" href="#用-aot-进行编译" aria-label="Permalink to &quot;用 AOT 进行编译&quot;">​</a></h4><p>我们先来介绍下 AOT 编译和 JIT 编译。</p><ul><li><p>JIT 编译：在浏览器中运行时编译，视图需要花很长时间才能渲染出来，导致运行期间的性能损耗。</p></li><li><p>AOT 编译（预编译）：在构建时编译，使得页面渲染更快，可提高应用性能。</p></li></ul><p>Angular 提供了预编译（AOT）能力，无须等待应用首次编译，以及通过预编译的方式移除不需要的库代码、减少体积，还可以提早检测模板错误。</p><p>到此，我介绍了 Angular 中的依赖注入、模块化组织、脏检查机制、AOT 编译，这些是 Angular框架设计中比较核心的概念和解决方案。</p><p>除此之外，Angular提供了完备的结构和规范，新加入的成员能很快地通过复制粘贴完成功能的开发。好的架构设计，能让高级程序员和初入门的程序员写出相似的代码，Angular 通过严格的规范约束，提升了项目的维护体验。</p><p>由于 Angular 目标是提供大而全的解决方案，因此相比 Angular，React和 Vue则更专注于用户界面的构建和优化，我们继续来看一下 React。</p><h3 id="react" tabindex="-1">React <a class="header-anchor" href="#react" aria-label="Permalink to &quot;React&quot;">​</a></h3><p>React 和 Vue 都是专注于构建用户界面的 JavaSctipt 库，它们不强制引入很多工程类的功能，也没有过多的强侵入性的概念、语法糖和设计，因此它们相对 Angular 最大的优势是轻量。</p><p>而对比 Vue，React 最大的优点是灵活，对原生 JavaScript 的侵入性弱（没有过多的模板语法），不需要掌握太多的API 也可以很好地使用。</p><p>React的哲学是：React 是用JavaScript 构建快速响应的大型 Web应用程序的首选方式。</p><p>接下来，我们来看看React 中的一些核心设计和特色，首选便是虚拟 DOM的设计。</p><h4 id="虚拟-dom" tabindex="-1">虚拟 DOM <a class="header-anchor" href="#虚拟-dom" aria-label="Permalink to &quot;虚拟 DOM&quot;">​</a></h4><p>虚拟 DOM 方案的出现，主要为了解决前端页面频繁渲染过程中的性能问题。该方案最初由 React 提出，如今随着机器性能的提升、框架之间的相互借鉴等，在其他框架（比如 Vue）中也都有使用。</p><p>虚拟 DOM的设计，大概可分成 3 个过程，下面我们分别来看看。</p><p><strong>1. 用JavaScript 对象模拟 DOM 树，得到一棵虚拟 DOM 树。</strong></p><p>不知道你是否仔细研究过 DOM 节点对象，一个真正的DOM 元素非常庞大，拥有很多的属性值。一个 DOM 节点包括特别多的属性、元素和事件对象，但实际上我们会用到的可能只有其中很小一部分，比如节点内容、元素位置、样式、节点的添加删除等方法。</p><p>所以，我们通过用 JavaScript 对象来表示 DOM 元素的方式，该对象仅包括常用的这些属性方法和节点关系，这样就可以大大降低对象内存、虚拟 DOM 差异对比的计算量等。</p><p><strong>2. 当页面数据变更时，生成新的虚拟 DOM 树，比较新旧两棵虚拟 DOM 树的差异。</strong></p><p>当我们用 JavaScript 对象来模拟 DOM 节点之后，可以构造出虚拟 DOM 树。</p><p>当发生状态变更的时候，可以重新构造一棵新的 JavaScript 对象 DOM 树。通过将新的模拟 DOM 树和旧的模拟 DOM 树进行比较，得到两棵树的差异，并记录下来。在比较之后，我们可以获得这样的差异：</p><ul><li><p>需要替换掉原来的节点；</p></li><li><p>移动、删除、新增子节点；</p></li><li><p>修改了节点的属性；</p></li><li><p>对于文本节点的文本内容改变。</p></li></ul>',52),u=a('<p>如图所示，我们对比了两棵基于<code>&lt;div&gt;</code>元素的DOM 树，得到的差异有：</p><ul><li><p>p 元素插入了一个 span 元素子节点；</p></li><li><p>原先的文本节点挪到了 span 元素子节点下面；</p></li></ul><p>经过差异对比之后，我们能获得一组差异记录，接下来我们需要使用它。</p><p><strong>3. 把差异应用到真正的 DOM 树上</strong></p><p>要实现最终的页面渲染，需要进行一些 JavaScript 操作，将差异应用到真正的DOM 树上，例如节点的替换、移动、删除，文本内容的改变等。</p><p>使用这样的方式来更新页面，可以将页面的DOM 变更范围减到最小，同时通过将多个状态变更合并计算，可以降低页面的更新频率。因此，使用虚拟 DOM，可以有效降低浏览器计算和性能。</p><p>虽然虚拟 DOM 解决了页面被频繁更新和渲染带来的性能问题，但传统虚拟 DOM 依然有以下性能瓶颈：</p><ul><li><p>在单个组件内部依然需要遍历该组件的整个虚拟 DOM 树；</p></li><li><p>在一些组件整个模版内只有少量动态节点的情况下，这些遍历都是性能的浪费；</p></li><li><p>递归遍历和更新逻辑容易导致 UI 渲染被阻塞，用户体验下降。</p></li></ul><p>对此，React 框架也有进行相应的优化：<strong>使用任务调度来控制状态更新的计算和渲染</strong>。</p><h4 id="状态更新-任务调度" tabindex="-1">状态更新：任务调度 <a class="header-anchor" href="#状态更新-任务调度" aria-label="Permalink to &quot;状态更新：任务调度&quot;">​</a></h4><p>React 中使用协调器（Reconciler）与渲染器（Renderer）来优化页面的渲染性能。</p><p>在 React 里，可以使用<code>ReactDOM.render</code>/<code>this.setState</code>/<code>this.forceUpdate</code>/<code>useState</code>等方法来触发状态更新，这些方法共用一套状态更新机制，该更新机制主要由两个步骤组成。</p><ol><li><strong>找出变化的组件，每当有更新发生时，协调器会做如下工作：</strong></li></ol><ul><li><p>调用组件<code>render</code>方法将 JSX 转化为虚拟 DOM；</p></li><li><p>进行虚拟 DOM Diff 并找出变化的虚拟 DOM；</p></li><li><p>通知渲染器。</p></li></ul><ol start="2"><li><strong>渲染器接到协调器通知，将变化的组件渲染到页面上。</strong></li></ol><p>在 React15 及以前，协调器创建虚拟 DOM 使用的是递归的方式，该过程是无法中断的。这会导致 UI 渲染被阻塞，造成卡顿。</p><p>为此，React16 中新增了调度器（Scheduler），调度器能够把可中断的任务切片处理，能够调整优先级，重置并复用任务。调度器会根据任务的优先级去分配各自的过期时间，在过期时间之前按照优先级执行任务，可以在不影响用户体验的情况下去进行计算和更新。</p><p>通过这样的方式，React 可在浏览器空闲的时候进行调度并执行任务，篇幅关系这里不再展开。</p><p><strong>虚拟DOM和任务调度的状态更新机制</strong>，是 React 中性能优化的两个重要解决方案。</p><p>除了性能优化以外，React 的出现同时带来了特别棒的理念和设计，包括 jsx、函数式编程、Hooks等。其中，函数式编程的无副作用等优势向来被很多程序员所推崇，Hooks 的出现更是将 React 的函数式编程理念推向了更高峰。</p><p>相比于 Angular，React 的入门门槛要低很多，但提到简单易学，就不得不说到 Vue了。</p><h3 id="vue" tabindex="-1">Vue <a class="header-anchor" href="#vue" aria-label="Permalink to &quot;Vue&quot;">​</a></h3><p>Vue 最大的特点是上手简单，框架的设计和文档对新手极其友好。但这并不代表它只是个简单的框架，当你需要实现一些更加深入的自定义功能时（比如自定义组件、自定义指令、JSX 等），你会发现它也提供了友好的支持能力。</p><p>很多人会认为 Vue 只是把 Angular 和 React 的优势结合，但 Vue 也有自身的设计和思考特色。这里，我们同样介绍一下 Vue 的设计特点。</p><h4 id="虚拟-dom-1" tabindex="-1">虚拟 DOM <a class="header-anchor" href="#虚拟-dom-1" aria-label="Permalink to &quot;虚拟 DOM&quot;">​</a></h4><p>前面我们在介绍 React的虚拟 DOM时，提到传统虚拟 DOM的性能瓶颈，Vue 3.0 同样为此做了些优化。</p><p>在 Vue 3.0 中，虚拟 DOM通过动静结合的模式来进行突破：</p><ul><li><p>通过模版静态分析生成更优化的虚拟 DOM 渲染函数，将模版切分为块（<code>if</code>/<code>for</code>/<code>slot</code>)；</p></li><li><p>更新时只需要直接遍历动态节点，虚拟 DOM的更新性能与模版大小解耦，变为与动态节点的数量相关。</p></li></ul><p>可以简单理解为，虚拟 DOM 的更新从以前的整体作用域调整为树状作用域，树状的结构会带来算法的简化以及性能的提升。</p><h4 id="状态更新-getter-setter、proxy" tabindex="-1">状态更新： getter/setter、Proxy <a class="header-anchor" href="#状态更新-getter-setter、proxy" aria-label="Permalink to &quot;状态更新： getter/setter、Proxy&quot;">​</a></h4><p>在 Vue 3.0 以前，Vue中状态更新实现主要依赖了<code>getter/setter</code>，在数据更新的时候就执行了模板更新、<code>watch</code>、<code>computed</code>等一些工作。</p><p>相比于之前的<code>getter/setter</code>监控数据变更，Vue 3.0 将会是基于<code>Proxy</code>的变动侦测，通过代理的方式来监控变动，整体性能会得到优化。当我们给某个对象添加了代理之后，就可以改变一些原有的行为，或是通过钩子的方式添加一些处理，用来触发界面更新、其他数据更新等也是可以的。</p><p>对比 Angular，Vue 更加轻量、入门容易。对比 React，Vue 则更专注于模板相关，提供了便利和易读的模板语法，开发者熟练掌握这些语法之后，可快速高效地搭建起前端页面。同时，Vue也在不断地进行自我演化，这些我们也能从 Vue 3.0 的响应式设计、模块化架构、更一致的API 设计等设计中观察到。</p><h3 id="小结" tabindex="-1">小结 <a class="header-anchor" href="#小结" aria-label="Permalink to &quot;小结&quot;">​</a></h3><p>前端框架很大程度地提升了前端的开发效率，同时提供了各种场景下的解决方案，使得前端开发可以专注于快速拓展功能和业务实现。</p><p>今天我主要介绍了如今比较热门的三个前端框架：Angular/React/Vue。其中，Angular 属于适合大型前端项目的&quot;大而全&quot;的框架，而 React/Vue 则是轻量灵活的库，它们各有各的设计特点。</p><p>对于框架的升级，React 选择了渐进兼容的技术方案，而 Angular/Vue 都曾经历过&quot;断崖式&quot;的版本升级。</p><p>最后，希望你可以思考下：Angular/Vue 在版本升级过程中，为了更彻底地抛弃历史债务而选择了不兼容，这样的做法你们是怎么看待的呢？在我们的业务开发过程中，是否也会存在这样的情况呢？</p>',38);function i(d,g,h,A,E,y){const e=l("Image");return s(),o("div",null,[c,t(e,{alt:"image.png",src:"https://s0.lgstatic.com/i/image6/M01/41/CE/Cgp9HWCuGOGAJPh4AABjO4iTOhE480.png"}),n(),u])}const O=p(r,[["render",i]]);export{_ as __pageData,O as default};
