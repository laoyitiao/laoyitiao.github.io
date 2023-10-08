import{_ as o,j as e,o as c,g as t,k as p,h as n,Q as l,s}from"./chunks/framework.4e7d56ce.js";const N=JSON.parse('{"title":"20升级改造：老项目升级到微服务的重构策略","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/SpringCloud Alibaba 实战_文档/(6765) 20  升级改造：老项目升级到微服务的重构策略.md","filePath":"posts/backEnd/SpringCloud Alibaba 实战_文档/(6765) 20  升级改造：老项目升级到微服务的重构策略.md","lastUpdated":1696682708000}'),r={name:"posts/backEnd/SpringCloud Alibaba 实战_文档/(6765) 20  升级改造：老项目升级到微服务的重构策略.md"},i=l('<h1 id="_20升级改造-老项目升级到微服务的重构策略" tabindex="-1">20升级改造：老项目升级到微服务的重构策略 <a class="header-anchor" href="#_20升级改造-老项目升级到微服务的重构策略" aria-label="Permalink to &quot;20升级改造：老项目升级到微服务的重构策略&quot;">​</a></h1><p>前一讲我们分析了在微服务架构下，如何通过多级缓存提升静态资源与数据的访问性能。本讲咱们谈一谈技术每一个公司都要面对的问题：如何将公司陈旧的单体应用改造升级为微服务架构。</p><p>本文咱们介绍六条改造策略：</p><ul><li><p>严禁 Big Bang（一步到位）；</p></li><li><p>尽早体现价值；</p></li><li><p>优先分离做前后端；</p></li><li><p>新功能构建成微服务；</p></li><li><p>利用 Spring AOP 开发低侵入的胶水代码；</p></li><li><p>基于 MQ 构建反腐层。</p></li></ul><p>开始之前，我们先来分析下为什么要进行微服务化改造。在项目发展初期或者规模不大的时候，架构师和程序员主要关注是如何快速交付商业价值，很多项目开始时并没有经过架构层面的精细打磨，也没有考虑架构的延展性。在紧迫的工期下，所有人员都在关注如何尽快实现业务代码，这是在中国乃至全世界中小型软件公司的通病。在这种背景下，大量粗糙的单体式、伪分布式的应用程序被开发出来，这些软件模块间的调用关系盘根错节，在长年累月的更新迭代中，代码变得臃肿不堪，任何一个微小的改动都可能&quot;牵一发动全身&quot;，甚至公司内没有一个人可以梳理清模块间的调用关系，这种软件产品对于整个公司都是一场噩梦。</p>',5),E=l('<p>难以维护的软件架构</p><p>随着微服务架构日渐成熟，以 Spring Cloud 为代表的技术生态大行其道，很多软件公司希望通过对单体系统进行微服务化改造来提高整体质量，但是在落地过程中就会遇到大量新问题，比如：</p><ul><li><p>改造是一步到位还是逐渐迭代？</p></li><li><p>微服务拆分的粒度是什么？</p></li><li><p>如何保证数据一致性？</p></li><li><p>新老交替过程中如何不影响公司业务进展？</p></li><li><p>......</p></li></ul><p>由此衍生的新问题会成为改造过程中的风险，幸运的是我们可以工作开发&quot;绞杀者应用程序（Strangler Application）&quot;让单体应用从容自然的完成微服务的升级改造。下面咱们先来了解什么是绞杀者应用程序。</p><h3 id="绞杀者应用程序" tabindex="-1"><strong>绞杀者应用程序</strong> <a class="header-anchor" href="#绞杀者应用程序" aria-label="Permalink to &quot;**绞杀者应用程序**&quot;">​</a></h3><p>所谓绞杀者应用程序的想法来自绞杀式藤蔓，这些藤蔓在雨林中生长，他们围绕树木生成，甚至有时会杀死树木。绞杀者应用程序是一个由微服务组成的新应用程序，通过将新功能作为服务，并逐渐从单体应用中提取服务来实现。随着时间的推移，越来越多单体应用内的功能被逐渐剥离为独立的微服务，最终达到消灭单体应用的目的。绞杀者应用程序最大的好处是，升级改造过程中并不需要推翻原有的代码，而是在新老更迭的过程中一步步完成微服务架构的升级改造。</p>',6),y=l('<p>绞杀单体应用</p><p>绞杀者应用的重构过程往往需要数月乃至数年，我以前在中国顶级的普惠金融机构从事架构设计工作，这家机构的普惠金融核心业务线从立项重构到完成绞杀历经 28 个月，从基本的用户管理到高级的定价模型都遵循相同的策略一步步处理，过程中也保证了公司业务的正常开展。</p><p>下面我就来介绍几个重要的改造策略：</p><h3 id="严禁-big-bang-一步到位" tabindex="-1">严禁 Big Bang（一步到位） <a class="header-anchor" href="#严禁-big-bang-一步到位" aria-label="Permalink to &quot;严禁 Big Bang（一步到位）&quot;">​</a></h3><p>在我和同行沟通时发现，特别多的架构师、项目经理是强迫症晚期，当一个微服务改造立项后，总想着搞点大事情，看到以前单体代码特别不顺眼，于是调用人力物力，从数据库表到应用代码全部推翻重来，希望让整个项目脱胎换骨，好在老板面前能体现他的工作能力。但在我看来，这是风险极高的做法，很可能以失败告终，你花费数月甚至数年复制现有功能来实现业务今天的需要。正如 Martin Fowler 所说：&quot;推到重写的唯一保证，就是彻底搞砸一切&quot;。正确的做法是逐步重构你的单体应用，采用绞杀者应用策略，将应用变为单体与微服务的混合状态，随着时间增加一点点蚕食掉单体应用。</p><h3 id="尽早地体现价值" tabindex="-1">尽早地体现价值 <a class="header-anchor" href="#尽早地体现价值" aria-label="Permalink to &quot;尽早地体现价值&quot;">​</a></h3><p>逐步重构微服务的一个重要好处是立即获得投资回报。我们还是通过案例分析，假设你有 1 个月时间重构&quot;普惠金融业务线&quot;的某一个模块，你会选择剥离&quot;用户与授权管理&quot;模块还是选择&quot;信审风控&quot;模块呢？传统的软件理论肯定会告诉你应该打好基础，先从用户管理这些基础模块做起。但从另一个维度来说，你的工作是要产生价值的，如果重构以后新的信审风控能更有效、更准确地为客户经理提供决策依据，那你的工作价值就能立即体现出来。</p><p>所以在排期时应按价值的重要性进行排序，优先解决公司的痛点，尽快体现出你们的工作成果。</p><h3 id="优先分离做前后端" tabindex="-1">优先分离做前后端 <a class="header-anchor" href="#优先分离做前后端" aria-label="Permalink to &quot;优先分离做前后端&quot;">​</a></h3><p>在实施重构改造时，优先要完成应用与业务逻辑的分离。在原本单体应用中，基于经典的分层理论将程序分为四层：表示层、控制层、业务逻辑层、数据访问层。前面两层表示层与控制层，我们拆解为应用前端，业务逻辑与数据访问拆解为服务后端。应用前端与服务后端在物理上进行切割，中间采用 RESTful API 进行通信，应用前端的职责就是负责与用户交互，服务后端只暴露细粒度的 RESTful API 提供业务处理接口。</p><p>这样做有两大好处，首先，它使得前后端独立部署、扩展与维护，尤其是表示层在快速迭代部署时并不影响后端功能，可以轻松进行 A/B 测试。其次，后端分离后采用 RESTful 方式暴露接口，这与微服务的设计要求是一致的，这位未来的微服务剥离工作打下良好基础。</p>',11),d=s("p",null,"前后端分离策略",-1),_=s("h3",{id:"新功能构建成微服务",tabindex:"-1"},[n("新功能构建成微服务 "),s("a",{class:"header-anchor",href:"#新功能构建成微服务","aria-label":'Permalink to "新功能构建成微服务"'},"​")],-1),g=s("p",null,"在系统改造的过程中，业务部门也会提出许多全新的需求，对于这些新需求我们首先要做的是将其剥离成新的微服务，以此遏制老系统的野蛮生长。我们举例说明：业务部门提出新要求，希望参考京东商城提供多维度、条件丰富的商品查询系统，来替代原本简陋的关键字查询。",-1),u=s("p",null,"京东商城商品检索页",-1),A=s("p",null,'对于这种新功能，在改造过程中首先要将其构建为新的"产品检索"微服务，而不应再为单体应用添加代码。如图所示：',-1),h=s("p",null,"新功能构建成微服务",-1),S=s("p",null,"在原本服务后端不变的前提下，额外引入 Spring Cloud 微服务体系，我们在前端向后端访问时增加了 API Gateway 网关，该网关对前端访问的 URL 进行路由。如果前端访问 search 接口，则请求被重定向到新创建的商品检索微服务，通过 ElasticSearch 这种专用的全文检索引擎提供更高级的查询功能；而访问其他 URL 时则将请求转发到原本的服务后端进行处理。",-1),v=s("p",null,[n("在这个过程中，还有一个重要原则："),s("strong",null,"数据源不允许混用"),n("。商品数据保存在 MySQL 数据库，但绝不允许让微服务直接访问 MySQL 的数据，因为在未来的很长时间，单体应用与微服务是混合运行的，如果出现数据源的交叉访问，稍有不注意便会出现数据问题，因此两端的数据源应完全隔离。正确的做法是引入 Alibaba Canal 做数据源同步，Canal 是阿里巴巴旗下的开源项目，纯 Java 开发。基于数据库增量日志解析，提供增量数据订阅&消费，可自动实现从 MySQL 数据源向其他数据源同步数据的任务。")],-1),C=s("p",null,"Alibaba Canal",-1),F=s("p",null,"前面我们将全新功能单独构建为微服务，在网关层面进行 URL 的转发，但这种情况太过理想，毕竟更多的情况是在原有单体代码中，剥离一部分成为独立的微服务，在这个过程中既要减少对原始代码的修改，又要实现微服务的远程调用。",-1),P=s("p",null,"在以前项目中我们运用 Spring AOP 技术良好地解决了这个问题。Spring AOP 称为面向切面编程，Spring 框架底层通过 Java 动态代理或者 CGLib 技术，允许 Java 程序在运行时自动生成代理类，实现在不修改源码的前提下对应用进行动态拦截与扩展。",-1),b=s("p",null,"为了方便理解，我们还是通过案例讲解。",-1),m=l(`<p>京东商品页</p><p>以京东的 iPhone11 为例，这个页面的数据其实来自多张数据表，商品标题来自商品基础信息表，而价格信息则来自活动价格表。商品的基础信息相对稳定，而价格数据随着时间在不断变化。</p><p>在单体应用时，因为所有数据都存在同一个 MySQL 数据库，获取数据时处理是很简单的，下面是我给出的伪代码。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#F97583;">Service</span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">GoodsService</span><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Resource</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> GoodsDao goodsDao;</span></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Resource</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> PriceService priceService; </span><span style="color:#6A737D;">//定价服务类</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> Map </span><span style="color:#B392F0;">selectGoods</span><span style="color:#E1E4E8;">(Long </span><span style="color:#FFAB70;">skuId</span><span style="color:#E1E4E8;">){</span></span>
<span class="line"><span style="color:#E1E4E8;">        Goods goods </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> goodsDao.</span><span style="color:#B392F0;">findById</span><span style="color:#E1E4E8;">(skuId);</span><span style="color:#6A737D;">//从本地查询商品基本信息</span></span>
<span class="line"><span style="color:#E1E4E8;">        Price price </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> priceService.</span><span style="color:#B392F0;">findByGoodsId</span><span style="color:#E1E4E8;">(skuId);</span><span style="color:#6A737D;">//在定价服务查询商品定价</span></span>
<span class="line"><span style="color:#E1E4E8;">        ... </span><span style="color:#6A737D;">//组织Map对象省略</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">@</span><span style="color:#D73A49;">Service</span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">GoodsService</span><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Resource</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> GoodsDao goodsDao;</span></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Resource</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> PriceService priceService; </span><span style="color:#6A737D;">//定价服务类</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> Map </span><span style="color:#6F42C1;">selectGoods</span><span style="color:#24292E;">(Long </span><span style="color:#E36209;">skuId</span><span style="color:#24292E;">){</span></span>
<span class="line"><span style="color:#24292E;">        Goods goods </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> goodsDao.</span><span style="color:#6F42C1;">findById</span><span style="color:#24292E;">(skuId);</span><span style="color:#6A737D;">//从本地查询商品基本信息</span></span>
<span class="line"><span style="color:#24292E;">        Price price </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> priceService.</span><span style="color:#6F42C1;">findByGoodsId</span><span style="color:#24292E;">(skuId);</span><span style="color:#6A737D;">//在定价服务查询商品定价</span></span>
<span class="line"><span style="color:#24292E;">        ... </span><span style="color:#6A737D;">//组织Map对象省略</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>可以看到在单体应用时，所有的调用都在 JVM 进程内完成。</p><p>但是随着业务发展，定价表数据量越来越大，业务逻辑也越发复杂，我们希望剥离出独立的&quot;定价服务&quot;，将原本进程内调用变为 RESTful 远程通信，还要对原始代码尽可能少做修改。</p>`,6),B=l(`<p>改造前后对比</p><p>如果你了解 Spring AOP，便不难想到利用 Around 环绕通知便可轻松实现从本地调用到远程访问的修改。这里只需额外定义一个切面类，伪代码如下：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#F97583;">Component</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;priceServiceAspect&quot;</span><span style="color:#E1E4E8;">) </span><span style="color:#6A737D;">//声明Bean Id</span></span>
<span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#F97583;">Aspect</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">//定义切面类</span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">PriceServiceAspect</span><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Resource</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> PriceServiceFeignClient priceServiceFeignClient;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">//利用环绕通知实现对PriceService.findByGoodsId的动态代理</span></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Around</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;execution(* com.lagou..PriceService.findByGoodsId(..)&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> Object </span><span style="color:#B392F0;">selectGoods</span><span style="color:#E1E4E8;">(ProceedingJoinPoint </span><span style="color:#FFAB70;">joinPoint</span><span style="color:#E1E4E8;">){</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">//通过OpenFeign客户端向定价服务发起远程请求，替代JVM本地访问</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> priceServiceFeignClient.</span><span style="color:#B392F0;">selectGoods</span><span style="color:#E1E4E8;">((Long)joinPoint.</span><span style="color:#B392F0;">getArgs</span><span style="color:#E1E4E8;">()[</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">]);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">@</span><span style="color:#D73A49;">Component</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;priceServiceAspect&quot;</span><span style="color:#24292E;">) </span><span style="color:#6A737D;">//声明Bean Id</span></span>
<span class="line"><span style="color:#24292E;">@</span><span style="color:#D73A49;">Aspect</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">//定义切面类</span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">PriceServiceAspect</span><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Resource</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> PriceServiceFeignClient priceServiceFeignClient;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">//利用环绕通知实现对PriceService.findByGoodsId的动态代理</span></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Around</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;execution(* com.lagou..PriceService.findByGoodsId(..)&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> Object </span><span style="color:#6F42C1;">selectGoods</span><span style="color:#24292E;">(ProceedingJoinPoint </span><span style="color:#E36209;">joinPoint</span><span style="color:#24292E;">){</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">//通过OpenFeign客户端向定价服务发起远程请求，替代JVM本地访问</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> priceServiceFeignClient.</span><span style="color:#6F42C1;">selectGoods</span><span style="color:#24292E;">((Long)joinPoint.</span><span style="color:#6F42C1;">getArgs</span><span style="color:#24292E;">()[</span><span style="color:#005CC5;">0</span><span style="color:#24292E;">]);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>在上面的伪代码片段中，在 selectGoods 调用 PriceService.findByGoodsId 方法时，会自动进入 PriceServiceAspect 切面类，该切面类会拦截 PriceService.findByGoodsId 方法的执行，不再进行本地调用，而是通过 Spring Cloud OpenFeign 客户端向定价服务发起 RESTful 请求并得到定价结果。因为 Spring AOP 是无侵入的，所以对于原本的 GoodsService 代码无须做任何调整就可将 PriceService.findByGoodsId 方法转为远程访问。</p><p>以上了数据查询时利用 Spring AOP 实现零侵入改造，对于这种只读的查询操作改造是非常轻松的，但如果涉及事务处理问题就会变得非常复杂。</p><p>以新增商品为例，在单体应用时利用进程内事务便可保证数据一致性，例如：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">开启事务;</span></span>
<span class="line"><span style="color:#E1E4E8;">新增商品基础数据;</span></span>
<span class="line"><span style="color:#E1E4E8;">新增商品价格数据;</span></span>
<span class="line"><span style="color:#E1E4E8;">提交事务;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">开启事务;</span></span>
<span class="line"><span style="color:#24292E;">新增商品基础数据;</span></span>
<span class="line"><span style="color:#24292E;">新增商品价格数据;</span></span>
<span class="line"><span style="color:#24292E;">提交事务;</span></span></code></pre></div><p>当我们将&quot;定价服务&quot;剥离为独立的服务后，因为跨进程调用会导致原本进程内事务失效，这就强制要求引入分布式事务来保证数据的一致性，尽管前面我们学习过 Seata 的 AT 模式可以在较少修改的前提下自动实现分布式事务，但这也不可避免的要求额外部署 Seata-Server 集群，这也必然导致架构复杂度的增加。那有没有更简单的做法呢？其实我们变通一下，在开始切分微服务时，在不确定外界依赖的情况下可以将微服务粒度做的粗一些，极力避免分布式事务的产生就可以了。如当前案例，商品信息本身是内聚的，价格只是商品实体的一个属性，因此在设计之初我们可以剥离出粗粒度的&quot;商品服务&quot;，将商品管理与定价策略内聚合在一起，就可以避免分布式事务。</p>`,8),D=s("p",null,"粗粒度切分策略",-1),q=s("h3",{id:"基于-mq-构建反腐层",tabindex:"-1"},[n("基于 MQ 构建反腐层 "),s("a",{class:"header-anchor",href:"#基于-mq-构建反腐层","aria-label":'Permalink to "基于 MQ 构建反腐层"'},"​")],-1),I=s("p",null,"构建反腐层实现应用隔离",-1),T=s("p",null,'随着改造的持续进行，我们在单体应用中额外增加了大量 Spring AOP 切面类，这样做虽然对原始代码改动较小，但基于 OpenFeign 直接面向微服务调用本身就破坏了单体应用与微服务间的隔离原则，这也是需要极力避免的。因此我们可以再进一步，将 OpenFeign 的 RESTful 调用改为利用 MQ 实现消息的"发布/订阅"，让单体应用与微服务持续解耦。这个引入 MQ 中间层的解耦策略，在微服务改造中被称为"反腐层"。通过反腐层，服务后端无须关注具体是哪个微服务实例消费数据，OpenFeign 也不再越界访问微服务，同时因为 MQ 自带特性，还赋予了应用消息追溯、流控等额外特性，可谓一举多得。',-1),f=s("h3",{id:"小结与预告",tabindex:"-1"},[n("小结与预告 "),s("a",{class:"header-anchor",href:"#小结与预告","aria-label":'Permalink to "小结与预告"'},"​")],-1),M=s("p",null,"本讲我为你分享了了微服务重构改造的六条改造策略，分别是：严禁 Big Bang、尽早且频繁的体现价值、优先分离做前后端、新功能构建成微服务、利用 Spring AOP 开发低侵入的胶水代码、基于 MQ 构建反腐层，希望你在认真思考后可以把这些策略运用在项目中。",-1),k=s("p",null,"下一讲，我们将学习在微服务架构下构建统一的用户认证与授权方案。",-1);function G(R,O,V,j,Q,x){const a=e("Image");return c(),t("div",null,[i,p(a,{alt:"图片1.png",src:"https://s0.lgstatic.com/i/image6/M00/37/93/Cgp9HWB39feAdlNiAAIp2aSa9g0359.png"}),n(),E,p(a,{alt:"图片2.png",src:"https://s0.lgstatic.com/i/image6/M01/37/94/Cgp9HWB39gKAczsuAAGd5m0vEdU064.png"}),n(),y,p(a,{alt:"图片3.png",src:"https://s0.lgstatic.com/i/image6/M01/37/9C/CioPOWB39g6AY7B5AAG9fyjusXo878.png"}),n(),d,_,g,p(a,{alt:"图片4.png",src:"https://s0.lgstatic.com/i/image6/M01/37/94/Cgp9HWB39hqAJ2KGAAzmjL7gLTI408.png"}),n(),u,A,p(a,{alt:"图片5.png",src:"https://s0.lgstatic.com/i/image6/M01/37/94/Cgp9HWB39iSASdBQAAKM5Xy28YM076.png"}),n(),h,S,v,p(a,{alt:"图片6.png",src:"https://s0.lgstatic.com/i/image6/M01/37/94/Cgp9HWB39i6AX9z9AANA-aFaAl8976.png"}),n(),C,F,P,b,p(a,{alt:"图片7.png",src:"https://s0.lgstatic.com/i/image6/M01/37/9C/CioPOWB39jmAJG5AAA7C62vvthc690.png"}),n(),m,p(a,{alt:"图片8.png",src:"https://s0.lgstatic.com/i/image6/M01/37/94/Cgp9HWB39kaAahWJAAM5QR3NV-I669.png"}),n(),B,p(a,{alt:"图片9.png",src:"https://s0.lgstatic.com/i/image6/M01/37/94/Cgp9HWB39liAKIV_AAKjF5cQ3KA462.png"}),n(),D,q,p(a,{alt:"图片10.png",src:"https://s0.lgstatic.com/i/image6/M01/37/9C/CioPOWB39mCAMrMRAAIqG54rPHQ175.png"}),n(),I,T,f,M,k])}const J=o(r,[["render",G]]);export{N as __pageData,J as default};
