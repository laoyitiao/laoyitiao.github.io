import{_ as t,o,g as r,Q as s}from"./chunks/framework.cfb14fe0.js";const c=JSON.parse('{"title":"06监控指标：如何通过分析数据快速定位系统隐患？（下）","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/分布式链路追踪实战_文档/(4327) 06  监控指标：如何通过分析数据快速定位系统隐患？（下）.md","filePath":"posts/backEnd/分布式链路追踪实战_文档/(4327) 06  监控指标：如何通过分析数据快速定位系统隐患？（下）.md","lastUpdated":1696682708000}'),n={name:"posts/backEnd/分布式链路追踪实战_文档/(4327) 06  监控指标：如何通过分析数据快速定位系统隐患？（下）.md"},a=s('<h1 id="_06监控指标-如何通过分析数据快速定位系统隐患-下" tabindex="-1">06监控指标：如何通过分析数据快速定位系统隐患？（下） <a class="header-anchor" href="#_06监控指标-如何通过分析数据快速定位系统隐患-下" aria-label="Permalink to &quot;06监控指标：如何通过分析数据快速定位系统隐患？（下）&quot;">​</a></h1><p>上一节课我介绍了监控指标中的<strong>端上访问</strong> 和<strong>应用程序</strong> ，端上访问是指从网页或者 App 中访问，应用程序是指接收到端上请求后的业务处理程序。这一课时，我将带你了解监控指标中的另外两个指标，<strong>组件</strong> 和<strong>机器信息</strong>。</p><h3 id="组件" tabindex="-1">组件 <a class="header-anchor" href="#组件" aria-label="Permalink to &quot;组件&quot;">​</a></h3><p>组件在开发中是必不可少的内容，它们既是数据最终存储的位置，也是数据中转的地方。组件的好坏，很大程度决定了我们应用程序的好坏。在&quot;05 课时 | 监控指标：如何通过分析数据快速定位系统隐患？（上）&quot;中，我介绍了&quot;组件协作资源&quot;，里面讲到了数据库、队列和缓存资源中常见的指标，这里我再补充一个&quot;网关层&quot;。我们来看看这 4 个资源中的组件在运行之后，又有哪些需要监控的指标。</p><h4 id="数据库" tabindex="-1">数据库 <a class="header-anchor" href="#数据库" aria-label="Permalink to &quot;数据库&quot;">​</a></h4><p>数据库的种类很多，比如传统的关系型数据库，还有现在比较常用的 NoSQL，都有着相当丰富的实现方式。因为它们各自的实现方式不同，所以其需要监控的指标也不同。我会列举一些它们之间相对通用的一些功能中的指标信息，一般这些指标出现问题时，会极大地影响到接口的性能。</p><ol><li><p><strong>QPS</strong>：每秒查询次数。可以说每个数据库都会涉及查询请求。通过观测这个指标，我们可以很快了解到系统对数据库的查询量，以及是否需要优化查询语句。</p></li><li><p><strong>查询耗时</strong> ：查询耗时可以了解到系统的查询效率是否处于正常的区间，如果出现了&quot;<strong>慢查询</strong>&quot;现象，可以及时地处理，比如 MySQL 中可以通过增加索引来解决部分查询效率的问题，ElasticSearch 则需要筛选出查询慢的语句再逐个优化。</p></li><li><p><strong>TPS</strong>：每秒事务数。这里一般指的是对数据的添加/删除/修改操作的处理速度。TPS 不同于 QPS，它涉及修改数据，因为大多数的数据库在设计时的初衷都是以查询为主，所以 TPS 在处理时会花费更多的时间。</p></li><li><p><strong>主从延迟数</strong> ：主从的架构可以说是很多数据库都会有的一种集群方式，主从架构中有许多实现方式是基于<strong>从机器</strong> 到<strong>主机器</strong>上同步数据的方式来完成的，比如 MySQL。所以同步时的主从延迟数是一个十分关键的指标。延迟数高说明业务系统在读取数据时，如果恰好读到了延迟比较高的数据节点，此时系统有可能出现错误。</p></li><li><p><strong>连接数</strong>：如果业务系统与数据库的连接达到了一定的数量，则可能造成数据库处理缓慢。因此，资源的连接数也是一个很重要的指标，一般这个指标和这个数据库的最大连接数会有一个的对比，通过这个对比可以体现出这个数据库的资源分配是否均衡。</p></li><li><p><strong>数据量</strong>：如果数据库中单个表的数据量大于某个数值，同样会出现性能问题，比如阿里巴巴在《Java 开发手册》中规定，单表超过 500 万条数据后就要分库分表处理。一个表的数据量过大会影响查询、插入的效率，这个规定同样适用于当下的很多数据库。</p></li><li><p><strong>VM 监控</strong>：某些组件是基于某些语言开发的，因此它们还会有相对应开发语言的指标监控，比如 ElasticSearch 基于 Java 开发，所以还要监控 JVM 的信息。</p></li></ol><p>除了以上这些，肯定还有很多我没有提到的指标。每个数据库不同的实现方式会细化出更多有独特性的统计指标。我所讲到的这 7 个，在各个数据库中拥有共通性，并且它们可以帮助我们初步认定一些问题的原因。</p><h4 id="队列" tabindex="-1">队列 <a class="header-anchor" href="#队列" aria-label="Permalink to &quot;队列&quot;">​</a></h4><p>在&quot;05 课时&quot;中我对队列有过介绍了，它通常用来处理异步和大量的任务，队列中需要监控的通用指标一般有以下 4 个：</p><ol><li><p><strong>Lag</strong>：目前待消费的数据量的大小。如果这个值持续增长并且过大，则说明消费者的能力已经不能够满足生产者的生产速度了。这时候一般会考虑减少生产者生产的内容，或者加快消费者速度，如果可以的话加机器来运行也不失是一个好的选择。</p></li><li><p><strong>发送数量</strong>：生产者生产数据的内容大小。如果这个值增长的速度越快则代表生成内容的数量越多。如果值突然飙升得比较高，也应该注意，是否存在无用内容的发送。</p></li><li><p><strong>消费数量</strong>：消费端消费生产者内容的数量。一般的队列中间件中都会有分区的概念，通过消费数量可以清楚看到每个分区的消费情况，如果出现了某个分区消费数量明显不足的情况，则需要针对某个分区的消费实例做特殊观察。</p></li><li><p><strong>分区数</strong>：一般在 1 个 topic 中，我们会将数据分区来提高并行消费的速度，这个分区的数量就是分区数。分区数同样是一个很关键的概念，如果一个 topic 的分区数相对较少，说明可以交给消费者消费的线程数也不多。</p></li></ol><h4 id="缓存" tabindex="-1">缓存 <a class="header-anchor" href="#缓存" aria-label="Permalink to &quot;缓存&quot;">​</a></h4><p>缓存如我之前所讲的，也是一个十分重要的部分，如果正确使用它则可以减少部分数据库查询的压力，从而提升我们接口的响应性能，缓存中也有十分多的关键指标：</p><ol><li><p><strong>响应时间</strong>：说到缓存中的关键指标，首先就要说到响应时间。一般这个指标的值都很低，因为缓存大多数时候是存储在内存中的。如果这个值偏高，说明使用方或者缓存出现了问题，这时就需要从更细的维度跟踪问题的原因了。</p></li><li><p><strong>缓存命中率</strong> ：命中率其实就是请求中<strong>查询到数据的请求</strong> 除<strong>请求总数</strong>，最终获得的百分比。百分比越高说明命中率越高，程序也会有更好的性能；如果命中率相对较低，则要考虑是否是写法出现了问题，或者是这个内容适不适合使用缓存。如果不适合的话可以考虑不用缓存，因为引入了一个新的组件，会增加运维和开发的成本。</p></li><li><p><strong>网络延迟时间</strong>：对缓存来说，如果交互中出现了较高的延迟会影响到业务系统，因为缓存一般的调用频率都不低，如果延迟较高的话，会影响接口的性能，所以保证网络延迟低也是一个很关键因素。</p></li><li><p><strong>已使用内存</strong>：缓存一般是存储在内存中的，所以对于内存的使用量有严格的要求，如果没有满足要求，缓存系统会执行淘汰策略，比如 LRU。执行淘汰策略之后可能会导致缓存命中率下降，而如果内存使用过高，缓存系统则被系统 kill。</p></li><li><p><strong>资源链接</strong>：除了与数据库，业务系统还会与缓存系统有链接的情况，所以我们也需要监控它们的链接情况。我们常被用作缓存的 Redis，它其实也是一种 KV 类型的 NoSQL 数据库。</p></li><li><p><strong>缓存数量</strong>：数据库中已有的缓存数量也是一个很好的指标。如果出现了使用内存达到配置阈值，导致缓存使用了一定的算法来淘汰缓存。通过缓存数量也可以清楚地看到我们系统中新增的缓存或是被移除缓存的数量对比，了解我们的系统是否是一直在有效地利用缓存提高性能。</p></li></ol><h4 id="网关层" tabindex="-1">网关层 <a class="header-anchor" href="#网关层" aria-label="Permalink to &quot;网关层&quot;">​</a></h4><p>我在&quot;02 | 系统日志：何以成为保障稳定性的关键？&quot;这一课时中介绍过网关层。请求从客户端过来，一般会先经过网关层，由网关层统一接收管理所有的请求。因此，在网关层也有一些指标是可以监控的：</p><ol><li><p><strong>请求相关</strong>：同我在&quot;05 课时&quot;中讲应用程序中的指标时一样，在网关层你也需要关注 QPS、状态码、请求耗时等信息。网关层里往往会记录请求整体的执行情况。这里的数据肯定是最全、最准的。</p></li><li><p><strong>错误数</strong>：如果网关层出现了错误请求信息，由于网关层是高于应用层的，所以应用层中的请求一般是由网关层转发，信息根本不会进入应用层。所以当在网关层出现错误数飙升的问题时，在应用层可能根本无法定位问题的原因。</p></li><li><p><strong>请求处理</strong>：网关层有相关的请求处理机制，所以监控请求处理相关的数据也十分关键，比如总请求数、正处于&quot;读&quot;状态的请求数、正处于&quot;写&quot;状态的请求数、正在排队的请求数。如果出现大量的排队现象，则说明网关层已经处理不过来了，这时候一般可以通过增加网关机器来解决。</p></li></ol><h3 id="机器信息" tabindex="-1">机器信息 <a class="header-anchor" href="#机器信息" aria-label="Permalink to &quot;机器信息&quot;">​</a></h3><p>最后我们来说说机器的统计信息。机器的处理性能如果不够好，会直接影响服务的运行情况，毕竟服务是依托机器运行。机器信息的指标可以按照组成部分，分为以下几个：</p><ol><li><p><strong>CPU</strong> ：CPU 的运行情况肯定是应用程序中最重要的。我们一般会比较关注 <strong>CPU 的整体使用率</strong> ，然后再细分为<strong>系统侧</strong> 、<strong>用户侧</strong> 的使用率。同样，我们也会关注系统的 <strong>Load 情况</strong>，如果 Load 值越高说明系统承受的处理任务越多，系统执行也会更缓慢。</p></li><li><p><strong>内存</strong> ：内存的大小会影响程序的可使用内存空间，除了<strong>重内存使用程序</strong> 。内存中我们也会关注<strong>内存的整体使用率</strong> ，以及 <strong>swap 区的使用率</strong>。一般我不太建议使用 swap 区，因为它会利用磁盘的空间来代替内存，而这可能会影响到程序的使用性能。如果 swap 区的使用率较高，可以考虑将其关闭，通过升级内存来提高程序性能。</p></li><li><p><strong>磁盘</strong> ：在一般的应用程序中，磁盘更多的是用于<strong>日志记录</strong> 和<strong>临时缓存文件记录</strong>。同 CPU 和内存一样，关注磁盘的使用率即可。</p></li><li><p><strong>网络</strong> ：网络情况可以说是现在应用中的重中之重，无论是链接组件还是微服务中的 RPC，到处都有服务器之间的通信。一般我们会更关注<strong>出/入流量</strong> ，如果当到达网卡限制的大小后，则一般只能考虑扩容服务来解决，因为网卡的提升是有限的。在此之外，我们还会监控<strong>网络丢包率</strong> 、<strong>连接错误数</strong>等信息，这些信息可以帮助我们的程序在网络出现问题时，判断是否是网卡的原因。</p></li><li><p><strong>I/O</strong> ：在 Linux 平台中，任何的网络请求、消息或是其他内容都是基于文件来构成的，所以 I/O 在 Linux 中无处不在。我们会更关注 I/O 的<strong>文件读取/写入中的速度</strong> 、<strong>耗时</strong> 、<strong>次数</strong> 等信息，这些都是最能直观体现出写入和读取速度的内容。同时我们还会关注<strong>使用率（util）</strong>，如果磁盘的使用率过高，则说明应用对磁盘的使用量很大，很有可能会因为磁盘的问题而导致应用程序上的问题。</p></li><li><p><strong>句柄</strong> ：随着 I/O 的使用，我们也需要关注句柄的<strong>使用量</strong>。如果程序中出现了资源流未关闭的情况，则有可能会导致句柄数激增，最终导致句柄耗尽，影响程序执行。在&quot;04 | 统计指标：&#39;五个九&#39;对系统稳定的意义？&quot;这一课时中，我就说到了之前我们就曾出现过因 HTTP 中流未关闭，使句柄耗尽，导致程序无法再次发起 HTTP 请求。</p></li></ol><h3 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h3><p>至此，对监控指标的介绍就告一段落了，从用户侧到服务器，我向你介绍端上访问、应用程序、组件、机器信息中需要监控的指标以及常见的问题状况及解决办法，希望能对你的工作有一定的帮助。那么，你认为在组件和机器中还有哪些你经常关注的指标？</p><p>指标是保证系统稳定不可或缺的一环，它同日志一样，在每个端都有很多的指标数据。下一节，我将讲解&quot;如何编写出更了解系统的指标&quot;，带你定制你自己的可观测系统。</p>',23),l=[a];function g(i,p,e,_,h,u){return o(),r("div",null,l)}const q=t(n,[["render",g]]);export{c as __pageData,q as default};
