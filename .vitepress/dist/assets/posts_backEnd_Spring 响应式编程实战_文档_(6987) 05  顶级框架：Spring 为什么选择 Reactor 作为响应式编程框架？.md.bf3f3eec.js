import{_ as p,j as l,o as t,g as e,k as n,h as o,Q as s}from"./chunks/framework.b3d8e22e.js";const m=JSON.parse('{"title":"响应式流的主流实现框架 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/Spring 响应式编程实战_文档/(6987) 05  顶级框架：Spring 为什么选择 Reactor 作为响应式编程框架？.md","filePath":"posts/backEnd/Spring 响应式编程实战_文档/(6987) 05  顶级框架：Spring 为什么选择 Reactor 作为响应式编程框架？.md","lastUpdated":1696417798000}'),c={name:"posts/backEnd/Spring 响应式编程实战_文档/(6987) 05  顶级框架：Spring 为什么选择 Reactor 作为响应式编程框架？.md"},r=s(`<p>在前面的课时中，我分别介绍了响应式流规范以及 Spring 框架中的响应式编程技术，也提到了响应式编程框架 Project Reactor。Reactor 是响应式领域中具有代表性的类库，实现了响应式流规范，同时已经成为 Spring 框架生态系统的重要组成部分。</p><p>今天这一讲，我们就先来分析响应式流的主流实现框架，并探讨 Reactor 中的基础组件。</p><h3 id="响应式流的主流实现框架" tabindex="-1">响应式流的主流实现框架 <a class="header-anchor" href="#响应式流的主流实现框架" aria-label="Permalink to &quot;响应式流的主流实现框架&quot;">​</a></h3><p>正如我在&quot;02 | 背压机制：响应式流为什么能够提高系统的弹性&quot;中所介绍的，在 Java 领域，目前响应式流的开发库包括 RxJava、Akka、Vert.x 和 Project Reactor 等。这里重点对 RxJava 和 Project Reactor 进行展开描述。</p><p>说起 RxJava，我们先来讨论它的前缀 Rx。这里的 Rx 代表的是响应式扩展 Reactive Extensions，实际上它最早诞生于微软的 .NET 平台，用来构建高性能的应用系统，其内部集成了异步数据序列的事件驱动编程。后来，Java 领域也充分借鉴了这一编程模型，诞生了 RxJava 框架，RxJava 可以说是响应式编程得以大规模应用的先驱，推动了一大批针对不同语言的响应式编程框架，这些编程框架同样都以 Rx 作为前缀，例如 RxSwift、RxRuby、RxGo，RxScale、RxKotlin 等。</p><p>RxJava 从最初的 1.x 发展到现在的 3.x 版本，各个版本之间变化较大。而从 2.x 版本开始，就对原有的 API 按照响应式流规范进行了重构，并提供了独立的背压功能。RxJava 应用广泛，例如，在 Netflix 的微服务套件中，熔断器 Hystrix、客户端负载均衡器 Ribbon、API 网关 Zuul 等常用组件中都使用到了 RxJava。除此之外，在以 Android 为代表的 UI 交互开发领域，RxJava 也普遍受到开发人员的欢迎。可以说，其他 Rx 开发库的兴起很大程度上归功于 RxJava 的发展。</p><p>聊完 RxJava，我们再来看 Reactor。相较于 RxJava，Reactor 诞生在响应式流规范制定之后，所以从一开始就是严格按照响应式流规范设计并实现了它的 API，这也是 Spring 选择它作为默认响应式编程框架的核心原因。</p><p>在发展过程中，Reactor 同样经历到从 1.X 到目前 3.X 的演进历程。Reactor 库自早期版本以来已经发展了很多，目前最新的 3.X 版本以 Java 8 作为基线，可以说已经成为业界最先进的响应式库。</p><p>RxJava 和 Reactor 二者对比来说，虽然 RxJava 诞生得更早，但 Reactor 应该更有前途。为什么这样说，因为它的开发更活跃，并得到了 Pivotal 公司的大力支持。从 API 角度看，这些库都非常相似，也都提供了一大批非常实用的操作符来简化开发过程。但既然 Spring 5 选择了 Reactor，就让我们来学习它吧。</p><h3 id="project-reactor-框架" tabindex="-1">Project Reactor 框架 <a class="header-anchor" href="#project-reactor-框架" aria-label="Permalink to &quot;Project Reactor 框架&quot;">​</a></h3><p>Reactor 框架可以单独使用。和集成其他第三方库一样，如果想要在代码中引入 Reactor，要做的事情就是在 Maven 的 pom 文件中添加如下依赖包。</p><div class="language-xml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">xml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">dependency</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">groupId</span><span style="color:#E1E4E8;">&gt;io.projectreactor&lt;/</span><span style="color:#85E89D;">groupId</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">artifactId</span><span style="color:#E1E4E8;">&gt;reactor-core&lt;/</span><span style="color:#85E89D;">artifactId</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">dependency</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">	 </span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">dependency</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">groupId</span><span style="color:#E1E4E8;">&gt;io.projectreactor&lt;/</span><span style="color:#85E89D;">groupId</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">artifactId</span><span style="color:#E1E4E8;">&gt;reactor-test&lt;/</span><span style="color:#85E89D;">artifactId</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">scope</span><span style="color:#E1E4E8;">&gt;test&lt;/</span><span style="color:#85E89D;">scope</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">dependency</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">dependency</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">groupId</span><span style="color:#24292E;">&gt;io.projectreactor&lt;/</span><span style="color:#22863A;">groupId</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">artifactId</span><span style="color:#24292E;">&gt;reactor-core&lt;/</span><span style="color:#22863A;">artifactId</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">dependency</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">	 </span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">dependency</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">groupId</span><span style="color:#24292E;">&gt;io.projectreactor&lt;/</span><span style="color:#22863A;">groupId</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">artifactId</span><span style="color:#24292E;">&gt;reactor-test&lt;/</span><span style="color:#22863A;">artifactId</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">scope</span><span style="color:#24292E;">&gt;test&lt;/</span><span style="color:#22863A;">scope</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">dependency</span><span style="color:#24292E;">&gt;</span></span></code></pre></div><p>其中 reactor-core 包含了 Reactor 的核心功能，而 reactor-test 则提供了支持测试的相关工具类。在本讲的后续内容中，我将从 Reactor 框架所提供的异步数据序列入手，引出该框架所提供的 Flux 和 Mono 这两个核心编程组件以及相关的操作符。最后，作为响应式流的核心，我们也会对它所具备的背压机制进行讨论。</p><h4 id="reactor-异步数据序列" tabindex="-1">Reactor 异步数据序列 <a class="header-anchor" href="#reactor-异步数据序列" aria-label="Permalink to &quot;Reactor 异步数据序列&quot;">​</a></h4><p>响应式流规范的基本组件是一个异步的数据序列，在 Reactor 框架中，我们可以把这个异步数据序列表示成如下形式。</p>`,15),E=s('<p>图 1 Reactor 框架异步序列模型</p><p>上图中的异步序列模型从语义上可以用如下公式表示。</p><div class="language-xml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">xml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">	onNext x 0..N [onError | onComplete]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">	onNext x 0..N [onError | onComplete]</span></span></code></pre></div><p>显然，以上公式中包含了三种消息通知，分别对应在异步数据序列执行过程中的三种不同数据处理场景，其中：</p><ul><li><p>onNext 表示正常的包含元素的消息通知；</p></li><li><p>onComplete 表示序列结束的消息通知；</p></li><li><p>onError 表示序列出错的消息通知。</p></li></ul><p>结合上一讲的内容，当触发这些消息通知时，异步序列的订阅者中对应的这三个同名方法将被调用。正常情况下，onNext() 和 onComplete() 方法都应该被调用，用来正常消费数据并结束序列。如果没有调用 onComplete() 方法就会生成一个无界数据序列，在业务系统中，这通常是不合理的。而 onError() 方法只有序列出现异常时才会被调用。</p><p>基于上述异步数据序列，Reactor 框架提供了两个核心组件来发布数据，分别是 Flux 和 Mono 组件。这两个组件可以说是应用程序开发过程中最基本的编程对象。</p><h4 id="flux-和-mono-组件" tabindex="-1">Flux 和 Mono 组件 <a class="header-anchor" href="#flux-和-mono-组件" aria-label="Permalink to &quot;Flux 和 Mono 组件&quot;">​</a></h4><p>Flux 代表的是一个包含 0 到 n 个元素的异步序列，Reactor 官网给出了它的示意图，如下所示。</p>',9),y=s(`<p>图 2 Flux 组件（来自 Reactor 官网）</p><p>上图中的&quot;operator&quot;代表的是操作符，红色的叉号代表异常，而最后的一个符号则代表序列正常结束。显然，序列的三种消息通知都适用于 Flux。在详细介绍 Flux的构建和使用方法之前，我们先通过一段简短的代码来演示使用 Flux 的方法，如下所示。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> Flux</span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;">Account</span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">getAccounts</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        List&lt;</span><span style="color:#F97583;">Account</span><span style="color:#E1E4E8;">&gt; accountList </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> ArrayList&lt;&gt;();</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">        Account account </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Account</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        account.</span><span style="color:#B392F0;">setId</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">1L</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">        account.</span><span style="color:#B392F0;">setAccountCode</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;DemoCode&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">        account.</span><span style="color:#B392F0;">setAccountName</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;DemoName&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">        accountList.</span><span style="color:#B392F0;">add</span><span style="color:#E1E4E8;">(account);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> Flux.</span><span style="color:#B392F0;">fromIterable</span><span style="color:#E1E4E8;">(accountList);</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">private</span><span style="color:#24292E;"> Flux</span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;">Account</span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">getAccounts</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">        List&lt;</span><span style="color:#D73A49;">Account</span><span style="color:#24292E;">&gt; accountList </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> ArrayList&lt;&gt;();</span></span>
<span class="line"><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">        Account account </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Account</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        account.</span><span style="color:#6F42C1;">setId</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">1L</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        account.</span><span style="color:#6F42C1;">setAccountCode</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;DemoCode&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        account.</span><span style="color:#6F42C1;">setAccountName</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;DemoName&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        accountList.</span><span style="color:#6F42C1;">add</span><span style="color:#24292E;">(account);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> Flux.</span><span style="color:#6F42C1;">fromIterable</span><span style="color:#24292E;">(accountList);</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>在以上代码中，我们通过 Flux.fromIterable() 方法构建了 Flux<code>&lt;Account&gt;</code> 对象并进行返回，Flux.fromIterable() 是构建 Flux 的一种常用方法，我会在下一讲和你进一步讨论。</p><p>我们再来看一个 Web 层组件的代码示例，如下所示。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#F97583;">GetMapping</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;/accounts&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> Flux</span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;">Account</span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">getAccountList</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        Flux&lt;</span><span style="color:#F97583;">Account</span><span style="color:#E1E4E8;">&gt; accounts</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> accountService.</span><span style="color:#B392F0;">getAccounts</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> accounts;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">@</span><span style="color:#D73A49;">GetMapping</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;/accounts&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> Flux</span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;">Account</span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">getAccountList</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">        Flux&lt;</span><span style="color:#D73A49;">Account</span><span style="color:#24292E;">&gt; accounts</span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> accountService.</span><span style="color:#6F42C1;">getAccounts</span><span style="color:#24292E;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> accounts;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>在这个 Controller 提供的 &quot;/accounts&quot; 的端点中，我们调用了 Service 层方法返回了一个 Account 对象列表，它的数据类型也是 Flux<code>&lt;Account&gt;</code>。</p><p>介绍完 Flux 之后，我们再来看 Reactor 所提供的 Mono 组件。Mono 数据序列中只包含 0 个或 1 个元素，如下图所示。</p>`,8),i=s(`<p>图 3 Mono 组件（来自 Reactor 官网）</p><p>与 Flux 组件一样，我们同样通过一个服务层的方法来演示 Mono 组件的用法，示例代码如下。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> Mono</span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;">Account</span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">getAccountById</span><span style="color:#E1E4E8;">(Long id) { </span></span>
<span class="line"><span style="color:#E1E4E8;">        Account account </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Account</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        account.</span><span style="color:#B392F0;">setId</span><span style="color:#E1E4E8;">(id);</span></span>
<span class="line"><span style="color:#E1E4E8;">        account.</span><span style="color:#B392F0;">setAccountCode</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;DemoCode&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">        account.</span><span style="color:#B392F0;">setAccountName</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;DemoName&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">        accountList.</span><span style="color:#B392F0;">add</span><span style="color:#E1E4E8;">(account);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> Mono.</span><span style="color:#B392F0;">just</span><span style="color:#E1E4E8;">(account);</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">private</span><span style="color:#24292E;"> Mono</span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;">Account</span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">getAccountById</span><span style="color:#24292E;">(Long id) { </span></span>
<span class="line"><span style="color:#24292E;">        Account account </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Account</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        account.</span><span style="color:#6F42C1;">setId</span><span style="color:#24292E;">(id);</span></span>
<span class="line"><span style="color:#24292E;">        account.</span><span style="color:#6F42C1;">setAccountCode</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;DemoCode&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        account.</span><span style="color:#6F42C1;">setAccountName</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;DemoName&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        accountList.</span><span style="color:#6F42C1;">add</span><span style="color:#24292E;">(account);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> Mono.</span><span style="color:#6F42C1;">just</span><span style="color:#24292E;">(account);</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>可以看到，这里首先构建一个 Account 对象，然后通过 Mono.just() 方法返回一个 Mono 对象。Mono.just() 方法是构建 Mono 的最常见用法之一，我们同样在下一讲中会对其进一步介绍。</p><p>同样，Web 层组件获取 Mono<code>&lt;Account&gt;</code> 对象的示例端点如下所示。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#F97583;">GetMapping</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;/accounts/{id}&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> Mono</span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;">Account</span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">getAccountById</span><span style="color:#E1E4E8;">(@</span><span style="color:#F97583;">PathVariable</span><span style="color:#E1E4E8;"> Long id) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    Mono&lt;</span><span style="color:#F97583;">Account</span><span style="color:#E1E4E8;">&gt; account </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> accountService.</span><span style="color:#B392F0;">getAccountById</span><span style="color:#E1E4E8;">(id);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> account;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">@</span><span style="color:#D73A49;">GetMapping</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;/accounts/{id}&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> Mono</span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;">Account</span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">getAccountById</span><span style="color:#24292E;">(@</span><span style="color:#D73A49;">PathVariable</span><span style="color:#24292E;"> Long id) {</span></span>
<span class="line"><span style="color:#24292E;">    Mono&lt;</span><span style="color:#D73A49;">Account</span><span style="color:#24292E;">&gt; account </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> accountService.</span><span style="color:#6F42C1;">getAccountById</span><span style="color:#24292E;">(id);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> account;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>显然，某种程度上可以把 Mono 看作是 Flux 的一种特例，而两者之间也可以进行相互的转换和融合。如果你有两个 Mono 对象，那么把它们合并起来就能获取一个 Flux 对象。除此之外，把一个 Flux 转换成 Mono 对象也有很多办法，例如对一个 Flux 对象中所包含的元素进行计数操作就能得到一个 Mono 对象。而这里合并和计数就是针对数据流的一种操作。Reactor 中提供了一大批非常实用的操作符来简化这些操作的开发过程。</p><h4 id="操作符" tabindex="-1">操作符 <a class="header-anchor" href="#操作符" aria-label="Permalink to &quot;操作符&quot;">​</a></h4><p>操作符并不是响应式流规范的一部分，但为了改进响应式代码的可读性并降低开发成本，Reactor 库中的 API 提供了一组丰富的操作符，这些操作符为响应式流规范提供了最大的附加值。操作符的执行效果如下所示。</p>`,9),u=s('<p>图 4 Reactor 中操作符示意图</p><p>在 Reactor 中，可以把操作符分成转换、过滤、组合、条件、数学、日志、调试等几大类，每一类中都提供了一批有用的操作符。尤其是针对转换场景，操作符非常健全。在这个模块的接下来几讲中，我会详细介绍。</p><p>下面再来说说背压处理。</p><h4 id="背压处理" tabindex="-1">背压处理 <a class="header-anchor" href="#背压处理" aria-label="Permalink to &quot;背压处理&quot;">​</a></h4><p>背压是所有响应式编程框架所必须要考虑的核心机制，Reactor 框架支持所有常见的背压传播模式，包括以下几种。</p><ul><li><p>纯推模式：这种模式下，订阅者通过 subscription.request(Long.MAX_VALUE) 请求有效无限数量的元素。</p></li><li><p>纯拉模式：这种模式下，订阅者通过 subscription.request(1) 方法在收到前一个元素后只请求下一个元素。</p></li><li><p>推-拉混合模式：这种模式下，当订阅者有实时控制需求时，发布者可以适应所提出的数据消费速度。</p></li></ul><p>基于这些背压传播模式，在 Reactor 框架中，针对背压有以下四种处理策略。</p><ul><li><p>BUFFER：代表一种缓存策略，缓存消费者暂时还无法处理的数据并放到队列中，这时候使用的队列相当于是一种无界队列。</p></li><li><p>DROP：代表一种丢弃策略，当消费者无法接收新的数据时丢弃这个元素，这时候相当于使用了有界丢弃队列。</p></li><li><p>LATEST：类似于 DROP 策略，但让消费者只得到来自上游组件的最新数据。</p></li><li><p>ERROR：代表一种错误处理策略，当消费者无法及时处理数据时发出一个错误信号。</p></li></ul><p>Reactor 使用了一个枚举类型 OverflowStrategy 来定义这些背压处理策略，并提供了一组对应的 onBackpressureBuffer、onBackpressureDrop、onBackpressureLatest 和 onBackpressureError 操作符来设置背压，分别对应上述四种处理策略。</p><p>为了更好地展示操作符的语义和效果，从这一讲开始，我将引入弹珠图（Marble Diagram）。弹珠图能将数据流的转换以可视化方式呈现出来，它们对于描述操作符的行为非常有效，因此在 RxJava 或 Reactor 等响应式编程框架中，几乎所有的操作符都包含带有对应的弹珠图的说明。在我们课程的后续内容中也将大量使用弹珠图。实际上你在本讲前面的 Flux 和 Mono 组件中已经看到了弹珠图，而 Reactor 官网给出的 onBackpressureBuffer 操作符的弹珠图如下所示。</p>',10),d=s('<p>图 5 onBackpressureBuffer 操作符示意图（来自 Reactor 官网）</p><p>onBackpressureBuffer 操作符有很多种可以选择的配置项，我们可以用来灵活控制它的行为。</p><h3 id="小结与预告" tabindex="-1">小结与预告 <a class="header-anchor" href="#小结与预告" aria-label="Permalink to &quot;小结与预告&quot;">​</a></h3><p>针对响应式流规范，业界存储了一批优秀的实现框架，而 Spring 默认集成的 Project Reactor 框架就是这其中的代表。Reactor 框架中最核心的就是代表异步数据序列的 Mono 和 Flux 组件，通过今天内容的介绍，我们对这两个组件有了一个初步的认识。同时，我们还介绍了 Reactor 中的操作符组件以及针对不同场景的背压处理机制。</p><p>这里给你留一道思考题：你能简要描述 Reactor 中 Flux 和 Mono 组件的区别吗？</p><p>既然有了 Flux 和 Mono 对象，那么我们如何来创建它们呢？这就是下一讲要介绍的内容，我们不见不散。</p><blockquote><p>点击链接，获取课程相关代码↓↓↓<br><a href="https://github.com/lagoueduCol/ReactiveProgramming-jianxiang.git?fileGuid=xxQTRXtVcqtHK6j8" target="_blank" rel="noreferrer">https://github.com/lagoueduCol/ReactiveProgramming-jianxiang.git</a></p></blockquote>',7);function g(A,_,F,h,x,R){const a=l("Image");return t(),e("div",null,[r,n(a,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image6/M00/26/8D/CioPOWBbFBCAQDDNAACGnB65zn8934.png"}),o(),E,n(a,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image6/M00/26/91/Cgp9HWBbFCaAPHNNAAIMnXsm0_I218.png"}),o(),y,n(a,{alt:"Drawing 5.png",src:"https://s0.lgstatic.com/i/image6/M00/26/8D/CioPOWBbFDmAOLiVAAFp-asMTcw575.png"}),o(),i,n(a,{alt:"Drawing 7.png",src:"https://s0.lgstatic.com/i/image6/M00/26/8E/CioPOWBbFEmABfrGAADTAAE8mv4005.png"}),o(),u,n(a,{alt:"Drawing 9.png",src:"https://s0.lgstatic.com/i/image6/M00/26/91/Cgp9HWBbFFWAC8VCAANwlTGCS1U790.png"}),o(),d])}const C=p(c,[["render",g]]);export{m as __pageData,C as default};
