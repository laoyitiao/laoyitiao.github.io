import{_ as l,j as o,o as p,g as e,k as a,Q as t,s,h as r}from"./chunks/framework.b3d8e22e.js";const B=JSON.parse('{"title":"什么叫\\"侵入\\"？什么叫\\"无侵入\\"？ ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/应用性能分析实战_文档/(7060) 11  资源节点树：通过 Sentinel 无侵入实现流量链生成规则.md","filePath":"posts/backEnd/应用性能分析实战_文档/(7060) 11  资源节点树：通过 Sentinel 无侵入实现流量链生成规则.md","lastUpdated":1696417798000}'),c={name:"posts/backEnd/应用性能分析实战_文档/(7060) 11  资源节点树：通过 Sentinel 无侵入实现流量链生成规则.md"},i=t(`<p>前两个课时，我们重点围绕 SkyWalking 进行了原理解析。讲完了 SkyWalking，接下来我们就进入 Sentinel。</p><p>这一讲开始，我将用两个课时围绕 Sentinel 的技术骨架展开，来带你学习它的原理。今天我们先学习 APM 系统的无侵入实现的通用设计，以及 Sentinel 的资源节点树实现原理。</p><h3 id="什么叫-侵入-什么叫-无侵入" tabindex="-1">什么叫&quot;侵入&quot;？什么叫&quot;无侵入&quot;？ <a class="header-anchor" href="#什么叫-侵入-什么叫-无侵入" aria-label="Permalink to &quot;什么叫&quot;侵入&quot;？什么叫&quot;无侵入&quot;？&quot;">​</a></h3><p>在学习 Sentinel，讨论无侵入监控时，你可能会问：Sentinel 不是&quot;无侵入&quot;的啊，接入 Sentinel 是需要引入客户端 jar 包的？</p><blockquote><p>其实 Sentinel 是体感&quot;无侵入&quot;，而代码&quot;侵入&quot;的，其原因我慢慢解答。</p></blockquote><p><strong>目前很多说法是：像 SkyWalking 这种 APM 工具，通过探针实现字节码增强的方式才叫作&quot;无侵入&quot;，这样的理解是错误的。</strong></p><p>通过《09 | Opentracing 解密：Dapper 说它是树，SkyWalking 说它是图》，我们知道 APM 工具的实现方案有两种：一种是黑盒方案，另一种是标记方案。当今开源的 APM 工具都是使用标记方案实现，所以<strong>对应用服务是有侵入的</strong>。</p><p>而&quot;侵入&quot;的意思是：APM 客户端工具会向应用服务内部织入监控代码，这一点我们可以通过对应用服务进行远程调试，或是对 Class 文件进行反解析来证实。</p><p><strong>那之所以有同学会有&quot;只有 SkyWalking 这类通过探针实现的 APM 工具才是无侵入&quot;的错觉，归根结底是使用 APM 产品时的不同&quot;体感&quot;所致。</strong></p><p>再结合前面课程，我们可以将侵入度按照不同&quot;体感&quot;，划分为以下两种。</p><ul><li><p>第一种以 SkyWalking 为代表的零接入&quot;体感&quot;的 APM 工具。</p><p>它们使用探针实现字节码增强技术，解决了织入监控代码难的问题（对比其他工具，它可以在不实现监控框架暴露的拦截器或过滤器的情况下，在任意地方织入监控代码）。通过面向切面的思想，使用线程本地变量在任务线程的生命周期中完成监控标记的无侵入传递。</p></li><li><p>第二种以 Sentinel 为代表的低侵入&quot;体感&quot;的 APM 工具。</p><p>由于无法使用字节码增强技术，所以织入代码只能通过框架暴露的拦截器或过滤器实现监控代码的织入。但这种方式依然可以使用与第一种方式一样的通过面向切面的思想，使用线程本地变量在任务线程的生命周期中完成监控标记无侵入传递。接入监控时，显式地引入客户端 jar 包，即可完成接入。</p></li></ul><table><thead><tr><th style="text-align:center;"></th><th><strong>零接入&quot;体感&quot;</strong></th><th style="text-align:center;"><strong>低侵入&quot;体感&quot;</strong></th></tr></thead><tbody><tr><td style="text-align:center;">代表工具</td><td>SkyWalking</td><td style="text-align:center;">Sentinel</td></tr><tr><td style="text-align:center;">侵入度比较</td><td>相比更低</td><td style="text-align:center;">相比较高</td></tr><tr><td style="text-align:center;">如何实现监控代码织入</td><td><strong>使用探针字节码技术</strong> （直接解决织入监控代码难题）</td><td style="text-align:center;">（由于没有字节码增强技术） <strong>只能通过框架暴露的拦截器或</strong> <strong>过滤器实现监控代码的织入</strong></td></tr><tr><td style="text-align:center;">通用度</td><td>较不通用</td><td style="text-align:center;">更通用</td></tr><tr><td style="text-align:center;">核心思想</td><td>通过 AOP 面向切面思想，使用线程本地变量 在任务线程的生命周期中，完成监控标记无侵入传递</td><td style="text-align:center;"></td></tr></tbody></table><p>对比两种方式，虽然第二种在接入效率上有些欠缺，但它是变通的。它将企业内部所有服务接入统一的脚手架，通过脚手架基建绕过一线开发来引入 APM 工具的客户端，从而降低侵入&quot;体感&quot;。这与 SRE 通过在应用服务的启动命令中，增加探针参数来绕过一线开发管理 APM 客户端思想是一致的。</p><blockquote><p>具体的实践方案可以参考<a href="https://start.aliyun.com/bootstrap.html?fileGuid=xxQTRXtVcqtHK6j8" target="_blank" rel="noreferrer">阿里云 Java 脚手架</a>，在依赖组件中添加 Sentinel，即可在新项目的脚手架基建中增加 Sentinel 的流量管控。</p></blockquote><p><strong>再回看 APM 有关侵入的问题，我们可以清晰地将其总结为两句话：</strong></p><ul><li><p><strong>APM 工具都会侵入应用服务，只不过织入监控代码的技术方案有所不同；</strong></p></li><li><p><strong>通过 AOP 思想，使用线程本地变量实现监控任务线程的生命周期，这种方式就是释放一线开发人员编写监控代码的无侵入方案。</strong></p></li></ul><p>Sentinel 也是&quot;无侵入&quot;的 APM 工具这个问题就解开了。那根据上面总结的第一句话，你是不是又对 APM 工具织入的监控代码产生兴趣了呢？接下来，我就以&quot;织入监控代码是如何构建资源树结构&quot;为主题，与你详解通用框架监控方案。</p><h3 id="监控示例-sentinel-资源树构建的基本原理" tabindex="-1">监控示例：Sentinel 资源树构建的基本原理 <a class="header-anchor" href="#监控示例-sentinel-资源树构建的基本原理" aria-label="Permalink to &quot;监控示例：Sentinel 资源树构建的基本原理&quot;">​</a></h3><p>正式开讲前，我们先来熟悉下<strong>聚合搜索工具</strong>的示例项目。聚合搜索工具的核心伪代码，如下所示：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Controller</span><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> Response </span><span style="color:#B392F0;">mergeSearch</span><span style="color:#E1E4E8;">(String </span><span style="color:#FFAB70;">param</span><span style="color:#E1E4E8;">){</span></span>
<span class="line"><span style="color:#E1E4E8;">    baidu </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">search</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;https://www.baidu.com/s?wd=&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> param);</span></span>
<span class="line"><span style="color:#E1E4E8;">    google </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">search</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;https://www.google.com/search?q=&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> param);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> baidu </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> google;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> Response </span><span style="color:#B392F0;">search</span><span style="color:#E1E4E8;">(String </span><span style="color:#FFAB70;">param</span><span style="color:#E1E4E8;">){</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> OkHttpClient.</span><span style="color:#B392F0;">get</span><span style="color:#E1E4E8;">(param);</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Controller</span><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> Response </span><span style="color:#6F42C1;">mergeSearch</span><span style="color:#24292E;">(String </span><span style="color:#E36209;">param</span><span style="color:#24292E;">){</span></span>
<span class="line"><span style="color:#24292E;">    baidu </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">search</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;https://www.baidu.com/s?wd=&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> param);</span></span>
<span class="line"><span style="color:#24292E;">    google </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">search</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;https://www.google.com/search?q=&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> param);</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> baidu </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> google;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> Response </span><span style="color:#6F42C1;">search</span><span style="color:#24292E;">(String </span><span style="color:#E36209;">param</span><span style="color:#24292E;">){</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> OkHttpClient.</span><span style="color:#6F42C1;">get</span><span style="color:#24292E;">(param);</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>聚合搜索服务可以同时将多个搜索引擎的搜索数据聚合起来。比如，用户对聚合搜索服务输入关键词 APM，那聚合搜索服务会将 baidu 和 google 搜索出来的结果，聚合返回给用户。</p><h4 id="_1-接入-skywalking" tabindex="-1">1.接入 SkyWalking <a class="header-anchor" href="#_1-接入-skywalking" aria-label="Permalink to &quot;1.接入 SkyWalking&quot;">​</a></h4><p>通过在启动命令中，增加 SkyWalking 探针参数，将<strong>聚合搜索服务</strong>接入 SkyWalking 后，我们可以观测到如下两张拓扑图和追踪链路图。</p><p>通过如下的拓扑图，我们可以清晰看到用户通过聚合搜索服务，访问量 baidu 和 google 站点。</p>`,24),E=s("p",null,"通过 SkyWalking 的链路图，我们可以清晰看到聚合搜索的调用顺序。",-1),y=s("h4",{id:"_2-接入-sentinel",tabindex:"-1"},[r("2.接入 Sentinel "),s("a",{class:"header-anchor",href:"#_2-接入-sentinel","aria-label":'Permalink to "2.接入 Sentinel"'},"​")],-1),g=s("p",null,"通过在 pom 文件中，引入并配置 Sentinel 的 webmvc 和 okhttp 适配器的客户端 jar 包，将聚合服务接入 Sentinel 后，我们会得到如下的簇点链路图：",-1),d=s("p",null,"综上可以看到，两个 APM 产品虽然接入方式不同，但一线开发人员都不需要编写任何监控代码，且两个 APM 工具的链路形态基本一致。",-1),u=s("p",null,"它们织入的监控的流程，如图中红色标识所示：",-1),_=t('<p>Sentinel 的监控流程与 Spring AOP 思想一致，通过 Spring MVC 和 OkHttp 框架暴露出的拦截器，对流量进行面向切面监控。只不过在监控过程中，使用了线程本地变量存储了监控信息，当请求再次被拦截时，识别线程本地变量存储的监控信息，构建出资源树。</p><p>这就是 Sentinel 资源树构建的基本原理，总的来说，还是很好理解的。</p><h3 id="sentinel-技术骨架" tabindex="-1">Sentinel 技术骨架 <a class="header-anchor" href="#sentinel-技术骨架" aria-label="Permalink to &quot;Sentinel 技术骨架&quot;">​</a></h3><p>学习基本原理入门后，我们再回来学习 Sentinel 的技术骨架，Sentinel 对流量的管控是通过<strong>责任链设计模式</strong>实现的。</p><blockquote><p>责任链设计模式是：将定义规则的对象根据指定顺序连成一条链，实现定义规则对象间的解耦，请求按照指定顺序被处理，直到有规则被匹配到为止。</p></blockquote><p>Sentinel 就是使用责任链设计模式实现了<strong>功能插槽链</strong>（Slot chain），如下图所示：</p>',6),h=t(`<p>每个被管控的资源，都会创建一系列的功能插槽链，每个功能插槽都有自己的职责，官方提供了 7 个不同职责的插槽链。今天的课程只讲解第一个功能插槽 NodeSelectorSlot，它的职责是构建资源节点树。</p><blockquote><p>关于 Sentinel 的技术骨架的更多内容，你可回顾<a href="https://kaiwu.lagou.com/course/courseInfo.htm?courseId=729#/detail/pc?id=7053&amp;fileGuid=xxQTRXtVcqtHK6j8" target="_blank" rel="noreferrer">《04 | 流量卫士：Alibaba Sentinel 时刻守卫流量健康》</a>，深入了解更多设计原理。</p></blockquote><h4 id="nodeselectorslot-示例" tabindex="-1">NodeSelectorSlot 示例 <a class="header-anchor" href="#nodeselectorslot-示例" aria-label="Permalink to &quot;NodeSelectorSlot 示例&quot;">​</a></h4><p>NodeSelectorSlot 是负责收集请求所关联的资源节点的路径，将这些节点资源的调用路径，以树状结构存储起来。</p><p>我们先看下官方的接入示例代码，学习下 Sentinel 的几个核心对象，接入示例代码如下：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">  ContextUtil.</span><span style="color:#B392F0;">enter</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;entrance1&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;appA&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">  Entry nodeA </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> SphU.</span><span style="color:#B392F0;">entry</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;nodeA&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (nodeA </span><span style="color:#F97583;">!=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    nodeA.</span><span style="color:#B392F0;">exit</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  ContextUtil.</span><span style="color:#B392F0;">exit</span><span style="color:#E1E4E8;">();</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">  ContextUtil.</span><span style="color:#6F42C1;">enter</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;entrance1&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;appA&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">  Entry nodeA </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> SphU.</span><span style="color:#6F42C1;">entry</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;nodeA&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (nodeA </span><span style="color:#D73A49;">!=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    nodeA.</span><span style="color:#6F42C1;">exit</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  ContextUtil.</span><span style="color:#6F42C1;">exit</span><span style="color:#24292E;">();</span></span></code></pre></div><p>上述代码中，ContextUtil.enter 会在线程本地变量中创建一个名为&quot;entrance 1&quot;的上下文（Context）。上下文对象维护着当前调用链的元数据，其重要的属性如下。</p><ol><li><p>name：用于标识上下文的名称，如接入示例代码中的 entrance 1。</p></li><li><p>entranceNode：当前调用链路的入口节点。节点有 4 种类型，它们有着继承关系。</p><ul><li><p>EntranceNode 继承 DefaultNode：表示一棵资源节点树的入口节点，通过此节点可以获取所有子节点。</p></li><li><p>DefaultNode 继承 StatisticNode：节点中，存储着指定上下文相关的统计信息，当一个上下文对象被多次调用 SphU.entry 方法时，该节点就会关联多个叶子节点。</p></li><li><p>ClusterNode 继承 StatisticNode：节点中，存储着资源总体运行的是统计信息，包括响应时间、线程数等，相同资源贡献一个 ClusterNode 节点。</p></li></ul></li><li><p>curEntry：当前调用链路的当前资源节点。</p></li><li><p>origin：当前调用链路的调用源名称。</p></li></ol><p>接入示例的第一行代码中的&quot;appA&quot;就是调用源标识；紧接着通过 SphU.entry 请求一个 token，如果此时方法执行成功，就代表当前流量未达到被限制的阈值，可以被放行去执行之后的业务代码；在执行完业务代码后，调用 nodeA.exit 和 ContextUtil.exit 方法去告诉 Sentinel 当前监控点可以退出。</p><p>上述示例代码会在内存中，生成如下树形结构：</p>`,10),A=t(`<p>默认的机器节点关联着 EntranceNode 节点 Entrance 1，Entrance 1 节点关联着 DefaultNode 节点 nodeA。</p><p>当示例代码中追加了 entrance 2 上下文时，代码如下所示：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">ContextUtil.</span><span style="color:#B392F0;">enter</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;entrance2&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;appA&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">  nodeA </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> SphU.</span><span style="color:#B392F0;">entry</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;nodeA&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (nodeA </span><span style="color:#F97583;">!=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    nodeA.</span><span style="color:#B392F0;">exit</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  ContextUtil.</span><span style="color:#B392F0;">exit</span><span style="color:#E1E4E8;">();</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">ContextUtil.</span><span style="color:#6F42C1;">enter</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;entrance2&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;appA&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">  nodeA </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> SphU.</span><span style="color:#6F42C1;">entry</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;nodeA&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (nodeA </span><span style="color:#D73A49;">!=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    nodeA.</span><span style="color:#6F42C1;">exit</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  ContextUtil.</span><span style="color:#6F42C1;">exit</span><span style="color:#24292E;">();</span></span></code></pre></div><p>内存中的树形结构就会变成：</p>`,4),q=s("p",null,"默认的机器节点关联着两个 EntranceNode 节点：Entrance 1 和 Entrance 2，Entrance 1 和 Entrance 2 节点又分别关联着自己的 DefaultNode 节点 nodeA。需要注意的是，DefaultNode 由资源 ID 和输入的名称来决定唯一性。",-1),C=s("p",null,"现在回到我们课程示例的聚合搜索的节点树构建过程。",-1),S=s("p",null,"当监控搜索工具接收到用户发来的请求时，在 Spring-MVC 适配器中通过 ContextUtil.enter 和 SphU.entry 方法，在内存中生成上下文对象，如下：",-1),F=s("p",null,"上下文存储的当前节点，关联的节点树只有一个搜索入口方法的节点，且当前节点的父节点和子节点都是空。",-1),k=s("p",null,"当请求流量在聚合搜索工具项目中准备搜索 baidu 资源时，在 OkHttp 拦截器会执行 SphU.entry 方法，此时在内存中生上下文对象，如下：",-1),m=s("p",null,"当接收到 baidu 搜索的响应后，请求流量在聚合搜索工具项目中准备搜索 google 资源时，在 OkHttp 拦截器会同样执行 SphU.entry 方法，此时在内存中生上下文对象，如下：",-1),b=t('<p>构造出来的资源节点树，由父节点 Spring-MVC 适配器生成，两个子节点由 OkHttp 适配器生成。在任务线程的生命周期中，开发人员不需要编写任何监控代码，Sentinel 在任务线程的生命周期，通过使用线程本地变量完成资源节点树的构建。</p><h3 id="小结与思考" tabindex="-1">小结与思考 <a class="header-anchor" href="#小结与思考" aria-label="Permalink to &quot;小结与思考&quot;">​</a></h3><p>本节课，我首先带你学习了有关 APM 的工具的通用监控方案。</p><p>关于如何织入监控代码，一种方式是实现监控框架的拦截器类织入，另一种方式是通过探针字节码技术实现织入。前者较为通用，后者侵入度较低。但无论使用哪种方式，其核心思想都是借鉴 AOP 思想，通过在线程本地变量中记录监控标记，无侵入实现监控任务线程的生命周期。</p><p>接下来，又我通过聚合搜索工具项目，以及伪代码和流程图，讲述了监控代码的织入位置。最后又回到了 Sentinel 技术骨架，Sentinel 技术骨架使用<strong>责任链设计模式</strong> 实现。本节课讲述了<strong>功能插槽 NodeSelectorSlot</strong> 使用线程本地变量，将<strong>流量构建资源节点树</strong>的过程。</p><p>不难发现，线程本地变量在监控场景中是必定会用到的技术，但是在业务需求开发中，我们使用线程本地变量的情况却少之又少。那么你知道为什么吗？欢迎在评论区写下你的思考，期待与你讨论。</p>',6);function x(D,P,M,v,T,f){const n=o("Image");return p(),e("div",null,[i,a(n,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image6/M00/3C/86/CioPOWCKhvSAA1Y4AAFSXRAbAPM344.png"}),E,a(n,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image6/M01/3C/7D/Cgp9HWCKhvuAerrVAAEERiqw56A771.png"}),y,g,a(n,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image6/M01/3C/7D/Cgp9HWCKhwqAa6RgAAIjrJ0VPww951.png"}),d,u,a(n,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image6/M00/3C/86/CioPOWCKhxKAbsJzAALa-MhIbU0965.png"}),_,a(n,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image6/M01/3C/7D/Cgp9HWCKhx2AYh8QAAbUg8otm8U872.png"}),h,a(n,{alt:"Drawing 5.png",src:"https://s0.lgstatic.com/i/image6/M00/3C/86/CioPOWCKhyeAaqifAACbga2uEV4102.png"}),A,a(n,{alt:"Drawing 6.png",src:"https://s0.lgstatic.com/i/image6/M00/3C/86/CioPOWCKhy2ATLj3AADDp5GzECs155.png"}),q,C,a(n,{alt:"Drawing 7.png",src:"https://s0.lgstatic.com/i/image6/M01/3C/7D/Cgp9HWCKhzaAZSAzAAIVgLMIdH0640.png"}),S,a(n,{alt:"Drawing 8.png",src:"https://s0.lgstatic.com/i/image6/M00/3C/86/CioPOWCKh0CAZy3ZAADRJhoYYm4469.png"}),F,k,a(n,{alt:"Drawing 9.png",src:"https://s0.lgstatic.com/i/image6/M01/3C/7D/Cgp9HWCKh0eALa6DAADn0KaM4g4144.png"}),m,a(n,{alt:"Drawing 10.png",src:"https://s0.lgstatic.com/i/image6/M01/3C/7D/Cgp9HWCKh0-AdllgAAFfk0vnIW4014.png"}),b])}const N=l(c,[["render",x]]);export{B as __pageData,N as default};
