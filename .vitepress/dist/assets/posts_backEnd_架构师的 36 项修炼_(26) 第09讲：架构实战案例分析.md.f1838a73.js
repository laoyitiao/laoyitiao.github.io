import{_ as i,j as a,o as s,g as c,k as t,h as e,Q as r,s as o}from"./chunks/framework.4e7d56ce.js";const ao=JSON.parse('{"title":"第09讲：架构实战案例分析","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/架构师的 36 项修炼/(26) 第09讲：架构实战案例分析.md","filePath":"posts/backEnd/架构师的 36 项修炼/(26) 第09讲：架构实战案例分析.md","lastUpdated":1696682708000}'),n={name:"posts/backEnd/架构师的 36 项修炼/(26) 第09讲：架构实战案例分析.md"},_=r('<h1 id="第09讲-架构实战案例分析" tabindex="-1">第09讲：架构实战案例分析 <a class="header-anchor" href="#第09讲-架构实战案例分析" aria-label="Permalink to &quot;第09讲：架构实战案例分析&quot;">​</a></h1><p>本课时的主题是架构案例分享，通过案例分析来加深对前面所学内容的理解。下面将分析三种不同的系统架构案例。</p><ol><li><p>分析初创互联网公司的架构演化案例，看一个小的系统架构是如何演化成一个较为成熟的、能够承受百万级订单的互联网系统架构。</p></li><li><p>分析一个分布式存储的架构案例，看如何去设计一个分布式存储系统，底层存储系统的架构是如何设计的。</p></li><li><p>分析一个反应式编程框架的架构案例，看开发框架的架构是如何设计的。</p></li></ol><p>这三类系统架构是三种比较典型的架构设计，对设计的要求很不一样，对架构师能力的考验也不太相同。了解这三种不同的架构设计，可以对架构师的工作有一个比较全面的认知。</p><h1 id="初创互联网公司架构演化案例" tabindex="-1">初创互联网公司架构演化案例 <a class="header-anchor" href="#初创互联网公司架构演化案例" aria-label="Permalink to &quot;初创互联网公司架构演化案例&quot;">​</a></h1><p>首先看初创互联网公司架构演化案例。</p><h2 id="万级日订单级别架构" tabindex="-1">万级日订单级别架构 <a class="header-anchor" href="#万级日订单级别架构" aria-label="Permalink to &quot;万级日订单级别架构&quot;">​</a></h2><p>如下图，这是一个真实的校园互联网电商系统的架构。在早期的时候，每天处理 1万 左右的用户订单，这时候的系统架构如图所示，还是比较简单的。</p>',8),p=o("p",null,"分析上图架构。应用端主要是移动端的应用，通过负载均衡访问 Web 服务器集群，也就是前端集群。前端集群是两台 Nginx 服务器组成的，在 Nginx 再进行一次负载均衡，将用户请求分发到一组应用服务器集群。应用服务器集群按照应用场景分为买家系统、卖家系统、供应链系统以及运营系统四个系统集群，每个系统集群又包含了若干台服务器，所有这些系统都连接到一台 MySQL 服务器上。",-1),h=o("h2",{id:"十万级日订单级别架构",tabindex:"-1"},[e("十万级日订单级别架构 "),o("a",{class:"header-anchor",href:"#十万级日订单级别架构","aria-label":'Permalink to "十万级日订单级别架构"'},"​")],-1),d=o("p",null,'但是这样的系统在几千订单的时候运行还算可以，但是在交易比较活跃、并发比较高的时候，系统就会出现各种问题。在上图示例中，当时的市场总监说"我们的交易越忙，你们的系统越出问题，太邪门了。"当时我们也没敢说什么，技术部悄悄对系统做了一次改进和重构，主要优化系统架构方面。优化后的架构如下图。',-1),A=o("br",null,null,-1),u=o("p",null,"主要优化点之一是在前端使用 CDN 服务，这样用户请求的各种静态资源都通过 CDN 服务返回，而所有的商品图片，再通过一个分布式文件系统进行管理。商品图片的上传和浏览，都由分布式文件系统提供。",-1),m=o("p",null,"在应用服务器集群上又加了一个 Redis 集群。我们前面说过，提升应用系统性能的第一个手段就是使用缓存。Redis 集群的使用，包括前面的 CDN 以及分布式文件系统，极大地缓解了系统在访问高峰期的访问压力。同时我们对 MySQL 数据库还做了一次主从复制的分离，构建了一个一主两从的分布式数据库。两个从服务器，一个从服务器用来给应用服务器用来做读操作服务，另一个从服务器做 SQL 数据分析，有时候也会通过 Sqoop 将数据导出到大数据平台上，做大数据计算。",-1),b=o("p",null,"在十万订单的时候，除了系统交易本身的压力比较大，公司对数据的处理的要求也比较高。除了各种各样的统计分析、竞对分析，还有各市场大区的绩效、具体到每个人的绩效都需要进行统计计算，所以专门搭建了一个大数据平台。在大数据平台上，根据业务数据进行统计分析和运营预测，还根据运营数据进行绩效考核。大数据平台上的数据一部分来自于应用服务器，通过消息队列 Kafka 导入到大数据平台，另一部分数据是来自于 MySQL 从数据库导入到大数据平台。通过这样一次系统重构，系统可以满足十万级日订单的访问压力。",-1),S=o("h2",{id:"百万级日订单级别架构",tabindex:"-1"},[e("百万级日订单级别架构 "),o("a",{class:"header-anchor",href:"#百万级日订单级别架构","aria-label":'Permalink to "百万级日订单级别架构"'},"​")],-1),g=o("p",null,"但是随着业务的进一步的发展，系统的订单量还在快速增长，这时候主要的挑战来自于两个方面。一个方面是随着订单的增长，业务也变得越来越复杂，开发新的功能变得越来越困难，系统的基本功能维护也越来越困难。另一个方面是，虽然经过了主从分离以及部署了多种缓存以后，高峰期的数据访问压力也可以承受了，但是数据库的存储空间难以满足要求。对于一个日订单百万级的系统，年订单量就是数亿，这样大的数据库存储对于 MySQL 而言是难以承受的。",-1),w=o("p",null,"所以我们对系统进行了进一步的重构。这次重构主要是两个方面，如下图。",-1),D=r('<ul><li>微服务拆分</li></ul><p>一方面是做了一个微服务方面的重构拆分，将可复用的一些业务拆分为独立的微服务，进行分布式部署，供应用系统调用，典型的就是用户服务、商品服务、订单服务、红包服务等。以前红包作为一个功能，在各个应用系统中可能都有涉及，买家需要使用红包，卖家要发放红包，而运营系统也可能发放系统级的红包，而这些红包的功能在各个子系统都有存在，所以对红包功能进行维护修改的时候，可能在很多个系统都要进行相关的代码变更和维护。产品经理需要跟几个系统开发团队进行合作，开发一个功能一不小心就可能会产生Bug。</p><p>重构以后，红包服务作为一个独立的功能，独立部署，其他的所有系统都通过远程调用的方式访问红包服务。红包的发放使用，以及红包的各种记录都通过红包服务进行管理，其他的应用只需要调用服务接口就可以了。如果要修改红包服务相关的功能，进行业务变更，那么大多数情况下只需要修改红包服务就可以。这样使业务系统开发变得更加的简单，因为红包功能相对比较集中，也更容易实施和落地。</p><ul><li>数据库冷热分离</li></ul><p>另一方面是，对数据库在原来的主从分离的基础上又做了一次冷热分离。因为我们刚才提到经过主从分离后的数据库，读写访问压力已经可以接受，这时候，主要压力来自于订单的持续不断增长和数据表记录的不断扩展，带来的存储方面的压力。而订单的一个特点是当订单已经完成，订单状态被关闭以后，订单就是只读的。这个时候只需要能够对订单提供查询、读服务就可以了，无需为它提供事务性写操作，那么我们就可以从比较宝贵的 MySQL 数据库资源中，把这些已经关闭了的订单分离出来，存储到更容易进行分步式存储的其他的 NoSQL 系统上。</p><p>当时我们选择了 MongoDB 作为订单数据的冷存储。每天夜里运行批处理任务，执行一个冷订单备份的迁移操作，将已经关闭一个月以上的订单数据，从 MySQL 数据库中迁移到了 MongoDB 中。而订单服务在进行订单操作的时候，所有的写操作依然访问 MySQL 数据库。对于读操作，如果要是查询一个月以内的订单，也还是访问 MySQL 从数据库，而如果是需要查询一个月以上的订单，那么就访问 MongoDB 数据库就好了。</p><p>通过这样一个冷热分离来设计数据库，只存储最近一个月的数据，存储访问的压力、数据存储的压力大大的减轻。</p><p>以上就是一个校园电商的互联网创业项目，在 2015 年的时候，这个项目快速发展，一年之内进行了三轮融资，融资规模从几十万美元到几千万美元，系统也由一开始的一个较为简单的系统，在一年之内进行了三次架构重构，演化成这样一个较为复杂功能较为齐全的系统架构。</p><h1 id="分布式存储系统-doris-架构案例" tabindex="-1">分布式存储系统 Doris 架构案例 <a class="header-anchor" href="#分布式存储系统-doris-架构案例" aria-label="Permalink to &quot;分布式存储系统 Doris 架构案例&quot;">​</a></h1><p>再看一个分布式存储系统 Doris 的架构案例。上面是一个互联网应用系统整体的架构，而应用系统是由各种各样的系统组件组成的，它包括业务组件，也包括一些技术组件。比如说像分布式数据存储这样的存储技术组件，那么这些分布式系统技术组件自身又是如何进行架构设计的呢？</p><h2 id="doris-设计目标" tabindex="-1">Doris 设计目标 <a class="header-anchor" href="#doris-设计目标" aria-label="Permalink to &quot;Doris 设计目标&quot;">​</a></h2><p>Doris 是一个典型的分布式存储系统，它的设计目标如下。</p><ol><li><p>进行海量的数据存储，也就是说可以在大规模服务器的集群上进行数据存储，可以进行透明的集群管理。</p></li><li><p>要求能够线性伸缩，当集群存储资源不足的时候，可以很容易地添加服务器到集群中，对集群进行平滑的扩容。</p></li><li><p>系统要高可用，要能够自动的容错和故障转移，当集群出现服务器宕机故障的时候，不会影响系统的读写，更不会出现数据丢失的情况。</p></li><li><p>同时要高性能，要在高并发的情况下，依然保持较低的响应时间。</p></li><li><p>还要具备灵活的扩展能力，可以很方便地扩展新功能。</p></li><li><p>要有较低的运维成本。可以在无需运维工程师的支持下进行集群的扩容、监控和故障管理。</p></li></ol><h2 id="doris-的整体架构" tabindex="-1">Doris 的整体架构 <a class="header-anchor" href="#doris-的整体架构" aria-label="Permalink to &quot;Doris 的整体架构&quot;">​</a></h2><p>如下图，来看 Doris 的整体架构。</p>',15),F=o("p",null,"Doris 的整体架构包括三个部分。",-1),f=o("ol",null,[o("li",null,[o("p",null,"客户端。Doris 给应用程序提供一个客户端的 SDK 包，客户端可以使用 Doris SDK 进行分布式的数据读写操作，Doris 支持存储 Key Value 这样的 KV 数据结构，跟缓存一样。客户端一方面连接 Doris 集群的控制中心 Administration，从控制中心获得配置信息，主要是获得服务器集群的地址端口、角色等配置信息，另一方面获得路由算法信息。")]),o("li",null,[o("p",null,"Administration。可以通过控制台进行集群的故障管理和扩容管理。")]),o("li",null,[o("p",null,"Data Server 数据存储。Data Server 也是真正的分布式数据存储的地方，Doris 对数据进行分片存储的。根据集群规模、配置信息和算法进行路由计算，计算每个 KV 应该存储的的 Data Server 服务器。Data Server 服务器也和 Administration 服务器进行通信，报告自己的健康状况。应用程序的 KV Client 与 Administration 之间的通讯，只包括配置或者控制信息的通信，不会进行数据通讯，也就是说真正的数据读写操作，只会在 Client 和 Data Server 之间，不需要通过 Administration 进行数据代理。")])],-1),P=o("h2",{id:"doris-数据分区架构与分区算法",tabindex:"-1"},[e("Doris 数据分区架构与分区算法 "),o("a",{class:"header-anchor",href:"#doris-数据分区架构与分区算法","aria-label":'Permalink to "Doris 数据分区架构与分区算法"'},"​")],-1),T=o("p",null,"来看一下 Doris 比较有特点的核心架构设计。Doris 采用路由算法设计，也就是 Doris 的分区算法设计，如下图。",-1),k=o("p",null,"前面课时2的缓存部分中，提到路由分区的几种典型的算法，包括余数哈希以及一致性哈希算法等，其中一致性哈希算法有个重要的特点是使用了虚拟节点进行计算。而 Doris 则创造了一种余数哈希和虚拟节点相结合的哈希算法，如上图所示，也就是在 key 进行路由计算的时候，先针对虚拟节点进行一次余数哈希。这个时候会对一个较大的数进行取模，比如说 10万，对 10万 进行取模，计算得到一个虚拟节点。",-1),C=o("p",null,"然后对虚拟节点和物理节点进行一次关系映射，根据虚拟节点与物理节点之间的关系进行查找，寻找到真正要访问的物理节点，再将数据写入到这台物理服务器上。这种分区算法的设计，相比于一致性哈希有更好的负载平衡特性。",-1),x=o("p",null,"也就是说 key 在不同的物理服务器上的分布更加均衡，同时也更便于进行集群扩容，因为当添加新的物理服务器的时候，如上图右边部分所示，只需要修改虚拟节点和物理服务器之间的映射关系就可以了，将一部分虚拟节点的映射调整到新的物理服务器上。比如说我们加了一个新的物理节点 PN3，那么我们把虚拟节点 VN3 和 VN6 两个虚拟节点的映射调整到 PN3 上，因此这种算法也能够实现和一致性哈希一样的效果，就是添加服务器的时候只影响一小部分数据。",-1),M=o("p",null,"同时这种算法在运维上有一个更大的好处，就是集群扩容的时候，运维调整可以按照虚拟节点进行调整，因为是以虚拟节点为单位重新映射到新的物理节点上。如果存储的时候就是按照虚拟节点为单位进行的存储，比如说一个虚拟节点一个文件，那么进行集群扩容的时候，只需要将虚拟节点对应的文件拷贝到新的服务器上，就可以实现集群扩容了。",-1),V=o("h2",{id:"doris-调用时序",tabindex:"-1"},[e("Doris 调用时序 "),o("a",{class:"header-anchor",href:"#doris-调用时序","aria-label":'Permalink to "Doris 调用时序"'},"​")],-1),q=o("p",null,"接下来看 Doris 调用时序图，如下图。",-1),B=o("p",null,"Doris 调用时序是指，Doris 在架构上，为了保证高可用，将所有的服务器分为多个组，这个组在 Doris 内部也被称为序列，每个序列存储一份数据，数据在写入的时候，每次都在不同的分组，也就是在不同的序列上进行存储，这样保证数据有多个备份存储，保证数据的高可用。",-1),N=o("p",null,"如上图所示，包含有 Doris 客户端 SDK 的应用服务器，先通过 SDK 访问管理中心服务器 Administration 获取集群的信息，以及获取应用的级别，应用的级别决定了数据要写多少个备份，示例中写两个备份，也就是将所有服务器分为两个序列。",-1),v=o("p",null,"SDK 根据这些信息以及刚才的路由算法，进行路由计算，计算在每个分组序列的服务器集群上要访问哪一台服务器。根据计算出来的结果，在每个序列中访问对应的服务器，比如说当前的可用性级别是 2，那么就访问这两个序列中的两台服务器，分别对每个序列中的每台服务器进行并发的数据写入，保证数据至少有两个备份存储。",-1),K=o("h2",{id:"doris-高可用架构",tabindex:"-1"},[e("Doris 高可用架构 "),o("a",{class:"header-anchor",href:"#doris-高可用架构","aria-label":'Permalink to "Doris 高可用架构"'},"​")],-1),I=o("p",null,"再看 Doris 的高可用架构，如下图。",-1),E=r('<p>当服务器有不可用时，Doris 是如何保证整个集群依然可以提供高可用的读写服务的呢？Doris 的高可用，主要解决两种问题。一种问题就是当系统临时出现故障的时候，比如说内存、网卡的临时损坏需要进行更换，或者是说程序升级发布需要临时停机，这些情况下系统如何保证高可用。另一种是系统永久失效，比如说硬盘损坏，上面的数据全部丢失，或者服务器过保需要下架，需要彻底更换服务器。这种情况下，系统如何保证高可用。</p><p>对前一种系统临时停机进行维护，这种情况叫做临时失效。Doris 主要解决方案是在系统临时失效的时候，应用程序依然保证多份写入。在进行临时实效维护的时候，只在其中一个序列的服务器上进行失效维护，另一个序列的服务器保证正常使用，而数据依然多份写入，正常序列的集群上的服务器依然正常读写，对已经失效的服务器，启动一个临时节点，进行备份写入，保证数据仍然是多份写入。</p><p>当过一段时间系统发布完成，服务器硬件更换完毕，失效系统重新启动，恢复运行以后，这时系统写入的时候会将数据写入到恢复中的服务节点，但是因为这段时间失效期间的数据是不完整的，所以读取只从原来正常的服务器上读取，正在恢复的服务器不读数据，同时将失效期间写入到临时备份节点的数据，迁移到正在恢复的服务器上，直到备份节点中的数据全部恢复完成。两个序列的服务器数据完全一致，这个时候系统恢复到正常。系统同时向两个服务器写入，而随机挑一台服务器进行读取。</p><p>与之相对，如果服务器永久下架，或者是硬盘损坏导致数据永久丢失，那么就无法通过临时时效节点进行数据恢复。解决的办法也比较暴力，直接将正常服务器中的数据，完整地拷贝一份到一台新服务器，代替损坏的物理服务器，就可以了。</p><h1 id="反应式编程框架-flower-架构案例" tabindex="-1">反应式编程框架 Flower 架构案例 <a class="header-anchor" href="#反应式编程框架-flower-架构案例" aria-label="Permalink to &quot;反应式编程框架 Flower 架构案例&quot;">​</a></h1><p>下面来看软件编程框架的架构设计案例。</p><p>除了上述系统这种整体的架构设计，还有一类架构，就是用来解决应用程序如何进行程序开发的。应用程序开发的时候，通常需要依赖各种编程框架进行开发，那么编程框架本身的设计会影响到开发的日常工作，大家日常开发中使用的各种 MVC 框架、ORM 框架，都是用来解决如何进行应用程序编程这些关键问题的。那么编程框架本身又是如何进行架构设计的，如何开发出来的？</p><p>目前反应式编程越来越流行，我们介绍一个反应式编程框架的架构设计案例------Flower。</p><p>Flower 是一个构建在 Akka 上的反应式编程框架，开发者只需要针对每一个细粒度的业务，开发一个 Service 服务，将这些 Service 服务，按照业务流程进行可视化的编排，就可以得到一个反应式的系统。</p><h2 id="反应式系统特性" tabindex="-1">反应式系统特性 <a class="header-anchor" href="#反应式系统特性" aria-label="Permalink to &quot;反应式系统特性&quot;">​</a></h2><p>所谓反应式系统，包括以下四个方面的特性。</p>',11),Q=r('<br><ol><li><p>即时响应，应用的调用者可以即时得到响应，无需等到整个应用程序执行完毕，也就是说应用调用是非阻塞的。</p></li><li><p>回弹性，当应用程序部分功能失效的时候，应用系统本身能够进行自我修复，保证正常运行，保证响应，不会出现系统崩溃和宕机。</p></li><li><p>弹性，能够对应用负载压力做出响应，能够自动伸缩以适应应用负载压力，根据压力自动调整自身的处理能力，或者根据自身的处理能力，调整进入系统中的访问请求数量。</p></li><li><p>消息驱动，功能模块之间、服务之间，通过消息进行驱动，完成服务的流程。</p></li></ol><h2 id="flower-设计目标" tabindex="-1">Flower 设计目标 <a class="header-anchor" href="#flower-设计目标" aria-label="Permalink to &quot;Flower 设计目标&quot;">​</a></h2><p>Flower 框架的设计目标是，开发者可以无需关注反应式的编程细节，就可以得到一个反应式的系统。目前主流的反应式编程框架有 RxJava、 webflux 等。但是这些反应式编程框架，基本上都是基于函数式编程。Flower 允许大家使用传统的命令式编程的方法，构建反应式的系统，可以更好地兼容以往的代码，使开发者有更低的使用门槛，同时也有更强大的系统特性。</p><h2 id="flower-重构前后性能对比" tabindex="-1">Flower 重构前后性能对比 <a class="header-anchor" href="#flower-重构前后性能对比" aria-label="Permalink to &quot;Flower 重构前后性能对比&quot;">​</a></h2><p>来看使用 Flower 对一个系统进行反应式编程重构前后的性能对比，如下图。</p>',6),U=o("p",null,"上图中，左边是系统吞吐量的性能对比图。红色是使用 Flower 重构后的 TPS 吞吐曲线。蓝色是重构前的阻塞式编程得到的系统的吞吐量特性。我们看到，重构以后 Flower 的吞吐能力是重构前的吞吐能力的两倍。",-1),L=o("p",null,"上图右边这幅图是响应时间对比图。可以看到 Flower 同样表现出较为优异的响应时间特性，特别是在高并发的情况下，越是高并发，Flower 的性能优势越是明显。那么 Flower 是如何显著地提升系统特性的呢？",-1),R=o("h2",{id:"flower-提升系统性能原理",tabindex:"-1"},[e("Flower 提升系统性能原理 "),o("a",{class:"header-anchor",href:"#flower-提升系统性能原理","aria-label":'Permalink to "Flower 提升系统性能原理"'},"​")],-1),y=o("p",null,"如下图，我们看一下 Flower 和传统的阻塞式编程的应用程序运行时有什么不同。",-1),O=r('<p>图中，上部分是传统的应用程序运行期的线程特性示意图；下部分是 Flower 运行期的线程特性示意图。传统的阻塞式编程，针对每个用户请求创建一个线程，整个线程在用户的请求服务周期内都是完全被独占的。任何引起请求操作的阻塞，都会导致整个线程的阻塞。</p><p>我们看到，对于一个高并发的应用系统，同时总是有很多个用户请求到达系统的 Web 容器，Web 容器为每一个请求分配一个用户线程去进行处理，而容器能够启动的用户线程数目是有限的。如果当前所有的容器线程都已经被用完了，这时候还有新的用户请求到达，请求就会被阻塞在应用服务器，等待前面的线程释放。</p><p>而线程在运行期会遇到各种阻塞情况，导致线程无法执行下去。比较典型的就是访问数据库，一个用户程序，想要访问数据库，必须要获得数据库的连接，而数据库的连接数相对用户线程数是比较少的。当数据库连接用完以后，线程请求获得数据库连接的时候就会被阻塞。而对于得到了数据库连接的线程，去访问数据库的时候，当它将数据库操作请求发送以后，数据库在远程进行数据处理的时候，当前的线程依然会被阻塞。这些被阻塞的线程既无法去响应其他的用户操作，也无法完成自己的工作，只能白白地消耗系统的资源。如果遇到某种情况，比如说数据库因为某个慢查询而响应比较慢，那么大量的用户线程都会堆积阻塞在数据访问这里无法得到释放，响应时间变长。而新的请求又会不断到达，不断消耗系统资源，最后可能会导致系统崩溃。</p><p>下面的 Flower 是如何解决这个问题的？</p><p>对 Flower 而言，只需要有限的几个线程，就可以完成全部的用户请求操作。当并发用户到达应用服务器的时候，Flower 只需要极少的容器线程就可以处理所有的并发用户请求。这个线程并不会执行真正的业务操作，它只是将用户的请求变为请求对象以后，将请求对象异步交给 Flower 的 Service 去处理，自身立刻就返回。因为容器线程不做太多的工作，所以极少的线程就可以满足高并发的用户的请求，用户的请求不会被阻塞，不会因为线程不够而无法处理。</p><p>用户请求交给 Flower 的 Service 对象以后，Service 之间依然是使用异步的消息通讯的方式进行调用，Service 之间也不会直接进行阻塞式的调用。一个 Service 完成业务逻辑处理计算以后，会返回一个处理结果，这个结果以消息的方式异步发送给它的下一个 Service，Service 之间使用了 AKKA Actor 进行消息通信，也是只需要有限的几个线程就可以完成大量的 Service 处理和消息传输。</p><p>上面提到 Web 应用主要的线程阻塞，是因为数据库的访问导致的线程阻塞。Flower 支持异步数据库驱动，用户请求数据库的时候，将请求提交给异步数据库驱动，立刻就返回，不会阻塞当前线程，异步数据库访问连接远程的数据库，进行真正的数据库操作，得到结果以后，将结果以异步回调的方式发送给 Flower 的 Service 进行进一步的处理，这个时候依然不会有线程被阻塞。也就是说使用 Flower 开发的系统，在一个典型的 Web 应用中，几乎没有任何地方会被阻塞，所有的线程都可以被不断复用，有限的线程就可以完成大量的并发用户请求，从而极大地提高了系统的吞吐能力，也极大地提高了系统的响应时间。</p><h2 id="akka-actor" tabindex="-1">AKKA Actor <a class="header-anchor" href="#akka-actor" aria-label="Permalink to &quot;AKKA Actor&quot;">​</a></h2><p>刚才说过，Flower Service 是基于 AKKA Actor 进行通信的，那么 AKKA Actor 又是如何实现异步的消息通信的呢？下面是 AKKA Actor 架构图。</p>',9),W=o("p",null,'如上图所示，一个 Actor 向另一个 Actor 进行通讯的时候，当前 Actor 就是一个消息的发送者 Sender，当它想要向另一个 Actor 进行通讯的时候，需要获得另一个 Actor 的 ActorRef，也就是一个"引用"，通过"引用"进行消息通信。而 ActorRef 收到消息以后，会将这个消息放入到 Actor 的 Mailbox 里面去，然后就立即返回了。也就是说一个 Actor 向另一个 Actor 发送消息的时候，不需要另一个 Actor 去真正处理这个消息，只需要将消息发送到目标 Actor 的邮箱 Mailbox 里面就可以了，自己不会被堵塞，可以继续执行自己的操作。而目标 Actor 检查自己的 Mailbox 中是否有消息，如果有消息， Actor 则会从 Mailbox 里面去获取自己消息，之后对消息进行异步的处理，而所有的 Actor 会共享一些线程，这些线程不会有任何的阻塞。',-1),G=o("h2",{id:"flower-核心模块架构",tabindex:"-1"},[e("Flower 核心模块架构 "),o("a",{class:"header-anchor",href:"#flower-核心模块架构","aria-label":'Permalink to "Flower 核心模块架构"'},"​")],-1),H=o("p",null,"如上述，Flower 的核心模块主要是基于 Actor 进行封装的。",-1),J=o("p",null,"每个 Service 会被封装在一个 Actor 里面，然后 Service 可以通过可视化的流程编排进行消息的传送，实现异步非阻塞的调用。下面是 Flower 核心模块的架构图。",-1),Y=o("br",null,null,-1),$=o("h2",{id:"flower-分布式架构",tabindex:"-1"},[e("Flower 分布式架构 "),o("a",{class:"header-anchor",href:"#flower-分布式架构","aria-label":'Permalink to "Flower 分布式架构"'},"​")],-1),X=o("p",null,"同时 Actor 还支持分布式开发，如下图所示，Flower 的 Service 可以远程部署到一个 Service 容器里面，就像我们现在常用的微服务架构一样。Flower 会提供一个独立的 Flower 容器，用于启动一些 Service，这些 Service 在启动以后会向注册中心进行注册，而应用程序可以将这些 Service 进行流程编排，得到一个分布式非阻塞的微服务系统。整体架构和我们课时5讨论的微服务架构很像，主要的区别就是 Flower 的服务是异步的，通过流程编排的方式进行服务调用，而不是接口的方式进行调用。",-1),Z=r('<p>如果你对 Flower 感兴趣，可以通过上图底部的 GitHub 地址得到 Flower 的源代码，目前 Flower 已经在一些项目中得到应用，你可以将 Flower 应用到你的项目中，也欢迎你参与到 Flower 的开发中来。任何关于 Flower 的问题，你可以通过 GitHub 和我交流。</p><h2 id="总结回顾" tabindex="-1">总结回顾 <a class="header-anchor" href="#总结回顾" aria-label="Permalink to &quot;总结回顾&quot;">​</a></h2><p>本节课主要讨论了三种不同的系统架构案例。</p><ol><li><p>互联网应用系统架构，看一个互联网应用系统的架构是如何设计的，如何利用各种各样的分布式技术，构建一个分布式互联网系统。</p></li><li><p>分布式数据库的架构设计案例，它的架构考量点主要是什么，一个分布式的数据库如何实现高可用、高性能、可伸缩等一系列的分布式特性的。</p></li><li><p>编程框架的架构设计，开发工程师每天在编程的时候都要使用编程框架进行开发。那么架构师除了要做这种整体的架构，还要考虑如何为开发工程师去设计一个易用强大的编程框架。这里我们以一个反应式微服务编程框架 fFower 为例，简单介绍了反应式编程以及编程框架架构应该考虑的一些方面。</p></li></ol><p>开始部分说过，软件架构就是关于整体与部分的关系设计，以及关键细节的设计。第一个案例主要是整体与部分的关系如何设计，而第二、三个案例则是关键的技术细节设计，一个系统里最核心的组成部分如何进行设计的。整体应用系统的架构设计可以通过经验和学习获得，关键技术细节的设计则需要对计算机基础的扎实掌握和自身编程能力的不断强化才能做好。</p><p>如何成为一个优秀的架构师，如何不断训练提升自己，如何做好架构师这个角色，处理好工作中的各种问题。对于这些问题，下一课时将会分享相关经验。</p><br>',7);function j(z,oo,eo,lo,to,ro){const l=a("Image");return s(),c("div",null,[_,t(l,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/A3/4B/CgotOV2-U0mAF53OAAINSMa5La8843.png"}),e(),p,h,d,t(l,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/A3/2B/CgoB5l2-U0mAZNLbAAJoBiLgC_k168.png"}),e(),A,u,m,b,S,g,w,t(l,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/A3/4B/CgotOV2-U0mASlTuAALexN14sdY634.png"}),e(),D,t(l,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/A3/2B/CgoB5l2-U0qANU5NAAOpllJww24954.png"}),e(),F,f,P,T,t(l,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/A3/4B/CgotOV2-U0qABHM-AAJIWbX_Tr4770.png"}),e(),k,C,x,M,V,q,t(l,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/A3/2B/CgoB5l2-U0qAbYcRAAEW8VNNGkQ788.png"}),e(),B,N,v,K,I,t(l,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/A3/4B/CgotOV2-U0qAcdbEAAGN2uR0aBc651.png"}),e(),E,t(l,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/A3/2B/CgoB5l2-U0uAQrFPAADbAQumXdo339.png"}),e(),Q,t(l,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/A3/4B/CgotOV2-U0uALMZVAAEma3KG84Q391.png"}),e(),U,L,R,y,t(l,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/A3/2B/CgoB5l2-U0uADqCVAAHxXOH0DP8643.png"}),e(),O,t(l,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/A3/4B/CgotOV2-U0uAOtWMAACmhYolP1Q924.png"}),e(),W,G,H,J,t(l,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/A3/2B/CgoB5l2-U0yAUlqjAAE9YZct6lI506.png"}),e(),Y,$,X,t(l,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/A3/4B/CgotOV2-U0yAc_PTAAE6c4Wbk3E108.png"}),e(),Z])}const so=i(n,[["render",j]]);export{ao as __pageData,so as default};
