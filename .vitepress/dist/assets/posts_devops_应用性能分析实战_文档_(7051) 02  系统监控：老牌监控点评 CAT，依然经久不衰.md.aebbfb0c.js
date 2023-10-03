import{_ as a,o as t,g as e,Q as r}from"./chunks/framework.f949202b.js";const b=JSON.parse('{"title":"CAT 凭什么称为\\"老牌监控\\"？ ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/devops/应用性能分析实战_文档/(7051) 02  系统监控：老牌监控点评 CAT，依然经久不衰.md","filePath":"posts/devops/应用性能分析实战_文档/(7051) 02  系统监控：老牌监控点评 CAT，依然经久不衰.md","lastUpdated":null}'),o={name:"posts/devops/应用性能分析实战_文档/(7051) 02  系统监控：老牌监控点评 CAT，依然经久不衰.md"},p=r('<p>这一讲我将带领你学习点评<a href="https://github.com/dianping/cat?fileGuid=xxQTRXtVcqtHK6j8" target="_blank" rel="noreferrer">CAT（Central Application Tracking）</a>，为什么会以&quot;老牌&quot;和&quot;经久不衰&quot;来形容点评 CAT 呢？</p><p>首先，从时间上看，CAT 首个开源版本是在 2012 年，此时期与 APM 相关重大事件有：</p><ul><li><p>Google 公司发布<a href="https://ai.google/research/pubs/pub36356?fileGuid=xxQTRXtVcqtHK6j8" target="_blank" rel="noreferrer">《Dapper 论文》</a>；</p></li><li><p>紧随其后，Naver 公司发布开源无侵入 APM 系统<a href="https://github.com/pinpoint-apm/pinpoint?fileGuid=xxQTRXtVcqtHK6j8" target="_blank" rel="noreferrer">Pinpoint</a>；</p></li><li><p>Twitter 公司发布开源 APM 系统<a href="https://github.com/openzipkin/zipkin?fileGuid=xxQTRXtVcqtHK6j8" target="_blank" rel="noreferrer">Zipkin</a>，Zipkin 是 Spring Cloud 分布式追踪系统<a href="https://github.com/spring-cloud/spring-cloud-sleuth?fileGuid=xxQTRXtVcqtHK6j8" target="_blank" rel="noreferrer">Spring-Cloud-Sleuth</a>的解决方案。</p></li></ul><p>听到 Dapper、Pinpoint 和 Zipkin 的时候，你会觉得 CAT 已经是上个年代的 APM 产品了。但其实 CAT 的时间渊源更早，它的核心设计思路源自 2000 年初 eBay 的内源 APM 产品 CAL（Centralized Application Logging），所以在时间轴上看 CAT 是足够老牌的。</p><p>其次，从<a href="https://github.com/dianping/cat/issues/753?fileGuid=xxQTRXtVcqtHK6j8" target="_blank" rel="noreferrer">已登记的落地案例</a>上来看，CAT 从开源初期至今，在国内已经经历了非常多公司的复杂场景和海量流量的考验了。目前 CAT 在国内有数百家企业的部署案例，代码的变动被上千名开发人员关注，社区收到了上万人点赞，在 APM 的 Java 系统监控领域位居 TOP 1，算是一个经久不衰的 APM 产品。</p><p>这一课时，我将结合 CAT 的产品设计与落地经验，来详细讲述 CAT 是如何指导线程优化方法论落地的，又是如何解决互联网企业普遍存在的<strong>线程资源过度浪费</strong>问题的。</p><h3 id="cat-凭什么称为-老牌监控" tabindex="-1">CAT 凭什么称为&quot;老牌监控&quot;？ <a class="header-anchor" href="#cat-凭什么称为-老牌监控" aria-label="Permalink to &quot;CAT 凭什么称为&quot;老牌监控&quot;？&quot;">​</a></h3><p>点评 CAT 是使用 Java 开发实现的实时应用监控平台，起初专为大规模 Java 微服务集群提供实时监控报警场景打造。时至今日的 CAT 3.0 版本，客户端除了支持 Java 语言外，还支持 C/C++、Python、Go、Node.js 等语言。</p><p>Java 客户端通过使用框架暴露出的拦截器或过滤器，实现框架的性能监控（如<a href="https://github.com/dianping/cat/blob/master/integration/apache-dubbo/src/main/java/net/dubboclub/catmonitor/CatTransaction.java?fileGuid=xxQTRXtVcqtHK6j8" target="_blank" rel="noreferrer">实现 Apache Dubbo 的过滤器</a>）。然后应用服务在代码中引入 CAT 客户端和相关<a href="https://github.com/dianping/cat/tree/master/integration?fileGuid=xxQTRXtVcqtHK6j8" target="_blank" rel="noreferrer">埋点集成方案</a>即可完成接入；而服务端又由两个模块组成，负责收集分析客户端数据的<strong>收集器模块</strong> 和负责给用户提供报表展示的<strong>控制端模块</strong>。</p><p>所以如下图所示，总的来说 CAT 产品架构是由三个模块组成，架构设计非常清晰：</p><ul><li><p>Cat-client 提供给应用以及中间层埋点的底层 SDK</p></li><li><p>Cat-consumer 用于实时分析从客户端提供的数据（收集器模块）</p></li><li><p>Cat-home 作为给用户提供展示的控制端（控制端模块）</p></li></ul><p><img src="https://s0.lgstatic.com/i/image6/M00/2B/D0/CioPOWBkQ-6AdTI0AAZoO3d0pao592.png" alt="图片2.png"></p><p>基于以上原理，所以 CAT 有两大特色优势，那就是代码段监控报表非常实时，并且客户端性能消耗低。接下来，我就这两大优势展开讲解。</p><h4 id="_1-实时的代码段监控报表" tabindex="-1">1.实时的代码段监控报表 <a class="header-anchor" href="#_1-实时的代码段监控报表" aria-label="Permalink to &quot;1.实时的代码段监控报表&quot;">​</a></h4><p>CAT 提供了非常丰富的报表，应用服务简单接入 CAT 客户端后，我们就可以通过 CAT 服务端全方位地监控应用集群了。</p><p>CAT 报表功能如下：<br><img src="https://s0.lgstatic.com/i/image6/M00/2B/C7/Cgp9HWBkRGqAOxYzAAVdMqcLP_0738.png" alt="图片1.png"></p><h4 id="_2-客户端性能损耗低" tabindex="-1">2. 客户端性能损耗低 <a class="header-anchor" href="#_2-客户端性能损耗低" aria-label="Permalink to &quot;2. 客户端性能损耗低&quot;">​</a></h4><p>根据我在贝壳找房的实战经验，以及参考网上的实践文章，总结下来 CAT 客户端对 Java 进程的性能损耗，相对于其他 APM 产品是最低的，且被监控应用服务性能消耗可以做到忽略不计。</p><p>在没有自定义埋点的接入方式下，在线上 IDC 机房环境，性能消耗指标参考如下：</p><p><img src="https://s0.lgstatic.com/i/image6/M00/2B/D0/CioPOWBkRHyANaX0AAF_Icr-jYY364.png" alt="图片3.png"></p><h3 id="落地实践要点" tabindex="-1">落地实践要点 <a class="header-anchor" href="#落地实践要点" aria-label="Permalink to &quot;落地实践要点&quot;">​</a></h3><p>由于 CAT 的生命周期非常长，所以部分 APM 功能已相对过时。接下来的落地实践，我会从 CAT 擅长和不擅长这两方面来阐述落地实践。</p><h4 id="_1-建议所有应用服务接入-cat" tabindex="-1">1.建议所有应用服务接入 CAT <a class="header-anchor" href="#_1-建议所有应用服务接入-cat" aria-label="Permalink to &quot;1.建议所有应用服务接入 CAT&quot;">​</a></h4><p>由于 CAT 的性能消耗极低，我建议客户端所有应用服务全部接入 CAT。</p><p>但在接入前，需要先梳理企业应用服务集群目前使用的框架是否都被 <a href="https://github.com/dianping/cat/blob/master/integration/README.md?fileGuid=xxQTRXtVcqtHK6j8" target="_blank" rel="noreferrer">CAT 官方埋点支持列表</a>支持。如果没有，我建议企业内部偏向基础架构的团队，统一完成自建框架的埋点，服务端至少采用两台独立的物理机实现灾备部署。</p><p>在接入后，要持续迭代应用服务在 CAT 控制端对相关报警阈值配置。</p><h4 id="_2-不建议使用-cat-分布式链路追踪功能" tabindex="-1">2.不建议使用 CAT 分布式链路追踪功能 <a class="header-anchor" href="#_2-不建议使用-cat-分布式链路追踪功能" aria-label="Permalink to &quot;2.不建议使用 CAT 分布式链路追踪功能&quot;">​</a></h4><p>CAT 分布式链路跟踪功能，强烈不建议使用，主要问题出现在以下两方面：</p><ul><li><p><strong>&quot;树形&quot;模型无法追踪批处理框架的链路</strong></p><p>CAT 使用 ROOT、PARENT 和 CHILD 三个参数实现了分布式链路跟踪的&quot;树形&quot;模型，而&quot;树形&quot;模型是<strong>无法绘制分布式集群中存在批处理框架的链路</strong> 的。</p><p>即使不需要追踪批处理框架的链路，CAT 分布式链路跟踪代码也需要让每个 RD 理解跟踪模型，然后分布式跟踪的上下游都需要去进行手动埋点才可以实现。</p></li><li><p><strong>报表展示效果不理想，且过时</strong></p><p>CAT 分布式链路追踪展示，可通过 Transaction 报表的 logview 视图查看。个人觉得其展示效果相较 SkyWalking、Zipkin 的分布式链路追踪视图存在明显差距。</p></li></ul><p>综上所述，CAT 的分布式链路跟踪并没有给 CAT 产品整体上锦上添花；而且分布式链路跟踪的&quot;树形&quot;模型会让 RD 陷入思维定式，其学习成本较高，且手动埋点的落地方案也会非常难以实施。</p><blockquote><p>分布式链路跟踪的解决方案，我会在《14 | 互通有无：如何设计跨语言的 APM 交互协议》和《21 | 高维思考：通过监控 Case，彻底悟透 OpenTracing》中详细讲述。</p></blockquote><h3 id="线程优化" tabindex="-1">线程优化 <a class="header-anchor" href="#线程优化" aria-label="Permalink to &quot;线程优化&quot;">​</a></h3><p>刚刚我们学习了 CAT 的 Heartbeat 报表，此报表展示了应用服务的<a href="https://github.com/alibaba/p3c?fileGuid=xxQTRXtVcqtHK6j8" target="_blank" rel="noreferrer">JVM 相关指标</a>，可以看到官方 JVM Thread 相关指标很笼统，缺少对框架线程池的监控。</p><p>接下来我将根据 Java 线程模型，通过定制化改造 Heartbeat 报表的 JVM Thread 相关指标，快速实现应用服务线程优化方法论的落地，最终达到<strong>优化进程占用资源、提高资源利用率、避免 OOM</strong>的效果。</p><h4 id="_1-为什么要进行线程优化" tabindex="-1">1.为什么要进行线程优化？ <a class="header-anchor" href="#_1-为什么要进行线程优化" aria-label="Permalink to &quot;1.为什么要进行线程优化？&quot;">​</a></h4><ul><li><p>从软件资源角度：Java 进程内是通过多线程技术处理完成消费者请求，多线程需要调用 JVM 资源，而 JVM 资源又需要 GC 来持续维护可用。从应用视角看，线程的优化可以优化 JVM 资源，从而减少 GC。</p></li><li><p>从硬件资源角度：每个节点有线程上限，过多的线程会影响 CPU 的并行度，而节省进程就是节省资源，这样可以实现一个节点资源运行多个进程，降低硬件成本。</p></li><li><p>从可用性角度：非预期的 GC 导致应用节点不能按照预期响应消费者，造成应用服务不可用。</p></li></ul><p>所以我们说，线程的优化是最关键的一环。说到线程优化，这可是 Java 程序员面试老生常谈，工作中却无人问津的问题了。</p><h4 id="_2-使用线程的正确姿势" tabindex="-1">2.使用线程的正确姿势 <a class="header-anchor" href="#_2-使用线程的正确姿势" aria-label="Permalink to &quot;2.使用线程的正确姿势&quot;">​</a></h4><p>如果你对这个问题还是有些懵，那我们先回顾下应用服务有哪些<strong>使用线程不正确的方式</strong>。</p><p><img src="https://s0.lgstatic.com/i/image6/M00/2B/D0/CioPOWBkRIyAS2C7AAEGyLvMKVs815.png" alt="图片4.png"></p><blockquote><p>如果你还想了解更多不正确使用线程的方式，可以参考<a href="https://github.com/alibaba/p3c?fileGuid=xxQTRXtVcqtHK6j8" target="_blank" rel="noreferrer">《阿里巴巴 Java 开发手册》</a>。</p></blockquote><p>对应这三个不正确的线程使用方式，我们<strong>总结下正确使用方式是：</strong></p><ul><li><p><strong>使用线程池去管理线程；</strong></p></li><li><p><strong>线程的命名需要有意义；</strong></p></li><li><p><strong>任务线程的数量需要与工作线程挂钩，且需要考虑极端情况，如故障重启。</strong></p></li></ul><p>除了以上三种使用方式，线程优化还面临着其他难题，需要更细致的工具去帮助我们监控，这时便需要对 CAT 进行改造了。</p><h4 id="_3-cat-改造" tabindex="-1">3.CAT 改造 <a class="header-anchor" href="#_3-cat-改造" aria-label="Permalink to &quot;3.CAT 改造&quot;">​</a></h4><p>为了让 Heartbeat 报表支持更细的框架线程粒度监控，我们需要掌握 CAT 的监控线程实现原理。Heartbeat 功能采集线程通过 Java ThreadMXBean 获取进程中的线程信息，然后以一分钟为周期，持续上报到服务端。</p><p>原理很简单，比如我们要监控 Apache Dubbo 的核心线程和活跃线程数，只需要在<a href="https://github.com/dianping/cat/blob/03cc9d2f95f6ec912e4c523ae338dce9554d4df2/cat-client/src/main/java/com/dianping/cat/status/StatusInfoCollector.java#L301?fileGuid=xxQTRXtVcqtHK6j8" target="_blank" rel="noreferrer">此处代码</a>增加前缀&quot;DubboServerHandler-&quot;，即可监控 Apache Dubbo 的核心线程，然后遍历所有的线程，通过获取运行状态或者非等待状态的线程，就可以统计出活跃线程数。</p><p>其他框架也是如此，只要线程名称有意义，即可快速通过 CAT 完成监控。</p><h4 id="_4-优化实战" tabindex="-1">4.优化实战 <a class="header-anchor" href="#_4-优化实战" aria-label="Permalink to &quot;4.优化实战&quot;">​</a></h4><p>如果你的团队没有对负责应用服务进行过专门的线程优化，那我可以肯定地告诉你，此应用服务存在大量的内置框架（Apache Dubbo、Netty）的过度线程使用，这些<strong>框架滥用线程</strong>的形式通常会分为以下两种情况。</p><p>第一种：线程池使用一个较大的固定值。例如 Apache Dubbo 为例，服务提供者的默认线程数为 200 的 Fixed 的线程池。</p><p>第二种：和 CPU 核心数挂钩的线程池。非常典型的代码Runtime.getRuntime().availableProcessors()*2 获取硬件环境可用的 CPU 核心数 2 倍作为线程池个数，例如 Redisson。</p><p><strong>1）数量优化</strong></p><p><strong>第一种</strong>，框架使用线程池的方式显然就不合理。通过 CAT 改造，可以监控 Apache Dubbo 的线程数，你会发现一般的应用服务只用了十几个线程。</p><p>我建议，可以根据高峰和一定的未来预估来适当缩小线程池，并且考虑将线程池类型由 Fixed 改为 Cache，实现减少项目的启动时间和不必要的线程池数量。</p><blockquote><p>关于 Apache Dubbo 的线程池改造，你可详见<a href="http://dubbo.apache.org/zh/docs/v2.7/user/examples/thread-model/?fileGuid=xxQTRXtVcqtHK6j8" target="_blank" rel="noreferrer">Apache Dubbo 线程模型</a>。</p></blockquote><p><strong>第二种</strong>，主要会在公司使用 IDC 机房，采取物理机多进程混合部署的方式，会存在线程滥用过多的情况。</p><p>以 Redis 客户端 Redisson 为例，Redisson 客户端使用 Netty 与 Redis 集群通讯，默认的 Netty threads 为 0，这种配置会形成线程数与 CPU 核心数挂钩。</p><p>以常规的 IDC 机房节点 CPU 的核心数为 40 为例，那 Redisson 使用 Netty 的线程数就是 80 个。通过改造后的 CAT 查看线程数会发现，Redisson 的使用 Netty 的活跃线程数不会超过 10（10 已是非常高了，常规业务的应用服务，不会超过 5）。通过改造，一个使用 Java 进程单从 Redisson 框架就可以少用 70 个线程。</p><p>对于常规的微服务进程，基本都会用到的框架有 HTTP Server、HTTP Client、JDBC、RPC Framework、MQ 和 NoSQL，我们可以自底向上，将每个应用服务的各个框架优化任务分配到各个成员。然后自顶向下，通过 CAT 的持续跟进优化，看是否达到了预期。</p><p>综上，通过对上面两种情况的优化，我们的节点资源会得到显著释放。上面的优化显然是对线程的<strong>数量</strong>进行优化，但线程的优化远不仅此。</p><p><strong>2）体积优化</strong></p><p>从另一个角度看，我们还可以对单个线程的<strong>体积</strong>进行优化，根据国内 Java 进程线上运行的现状，基本都是在使用 Java 6 以上版本和在 64 位的操作系统上运行。</p><p>所以线程栈默认大小为 1M，原因参见<a href="https://www.oracle.com/java/technologies/javase/vmoptions-jsp.html?fileGuid=xxQTRXtVcqtHK6j8" target="_blank" rel="noreferrer">Oracle VM Options</a>，首先 1M 对于线程栈来说本身就非常充裕，其次随着项目微服务化带来的应用服务拆分，和框架更多的使用异步线程的设计，线程栈相对于早年的垂直单体应用的线程栈也缩小了很多。</p><p>所以我们可以适当缩小线程栈到 512k 以下，在应用服务使用较多线程时，优化的效果会非常明显。</p><h3 id="小结与思考" tabindex="-1">小结与思考 <a class="header-anchor" href="#小结与思考" aria-label="Permalink to &quot;小结与思考&quot;">​</a></h3><p>今天的课程，我首先带你从产品视角学习了 CAT 擅长的 APM 领域及其优点，包括代码段监控报表实时、客户端性能消耗低这两大优点；也带你学习了 CAT 不擅长的 APM 领域，如分布式链路跟踪、业务监控等。</p><p>然后通过 CAT 针对框架更细粒度线程监控改造，快速实现线程优化方法论的落地。希望你通过今天的学习，可以掌握 CAT 的学习路径，并能在实际的工作中做到学以致用。</p><p>下面给你留一个思考题：你是否有过垂直单体应用拆分为微服务的经历？那拆分前后，有哪些原因造成了微服务需要更多的硬件资源呢？</p><p>请参考本文分享的<strong>线程优化</strong>实践案例，检查应用服务是否存在其他资源滥用的情况？是否可以通过 CAT 监控出这些问题？</p><p>你可以在留言区写下你思考的场景和优化思路，期待与你讨论。</p>',71),i=[p];function n(l,s,c,h,u,g){return t(),e("div",null,i)}const A=a(o,[["render",n]]);export{b as __pageData,A as default};
