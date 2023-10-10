import{_ as l,j as p,o as r,g as t,k as n,h as e,s,Q as o}from"./chunks/framework.cfb14fe0.js";const V=JSON.parse('{"title":"第20讲：深入剖析Configuration插件，实现可插拔接入多种配置中心","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/098-讲带你搞懂 SkyWalking文档/(1738) 第20讲：深入剖析 Configuration 插件，实现可插拔接入多种配置中心.md","filePath":"posts/backEnd/098-讲带你搞懂 SkyWalking文档/(1738) 第20讲：深入剖析 Configuration 插件，实现可插拔接入多种配置中心.md","lastUpdated":1696682708000}'),i={name:"posts/backEnd/098-讲带你搞懂 SkyWalking文档/(1738) 第20讲：深入剖析 Configuration 插件，实现可插拔接入多种配置中心.md"},c=s("h1",{id:"第20讲-深入剖析configuration插件-实现可插拔接入多种配置中心",tabindex:"-1"},[e("第20讲：深入剖析Configuration插件，实现可插拔接入多种配置中心 "),s("a",{class:"header-anchor",href:"#第20讲-深入剖析configuration插件-实现可插拔接入多种配置中心","aria-label":'Permalink to "第20讲：深入剖析Configuration插件，实现可插拔接入多种配置中心"'},"​")],-1),y=s("p",null,"在前面的课时中，我们深入介绍了 SkyWalking OAP 服务的核心架构和启动流程，以及 Module、ModuleProvider、Service 等核心接口的功能。SkyWalking OAP 采用了微内核 + 插件的架构，各个插件模块的开发、接入非常方便，只需实现 ModuleDefine 以及 ModuleProvider 即可，然后由微内核通过 SPI 技术扫描加载并实例化使用。",-1),E=s("p",null,"在本课时，将重点介绍 Configuration 模块的基本原理，还会分析依赖 ZooKeeper 作为配置中心的相关插件实现。",-1),g=s("h3",{id:"configuration-api-模块",tabindex:"-1"},[e("configuration-api 模块 "),s("a",{class:"header-anchor",href:"#configuration-api-模块","aria-label":'Permalink to "configuration-api 模块"'},"​")],-1),d=s("p",null,"configuration-api 模块定义了 Configuration 模块的核心功能和扩展框架，位于 server-configuration 模块之中，具体位置如下图所示：",-1),h=s("p",null,"上图可以看到，除了 configuration-api 模块之外，server-configuration 中还有支持各种配置中心的子模块，例如，configuration-zookeeper 依赖 ZooKeeper 管理配置信息，configuration-etcd 依赖 etcd 管理配置信息等。",-1),C=s("p",null,"在默认 application.yml 配置文件中可以看到 Configuration 插件模块的相关配置信息，如下图所示：",-1),u=s("p",null,"首先来看 configuration-api 模块，在其 resource 目录下有两个 SPI 配置文件，分别指定 ModuleDefine 实现类和 ModuleProvider 实现类，如下图所示：",-1),_=o(`<p>其中指定的 ModeDefine 实现类为 ConfigurationModule（对应名称为 configuration），通过其 services() 方法可以知道，需要其关联的所有 ModuleProvider 需要提供DynamicConfigurationService 这个 Service 接口的实现：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">Class</span><span style="color:#E1E4E8;">[] </span><span style="color:#B392F0;">services</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">Class</span><span style="color:#E1E4E8;">[] {DynamicConfigurationService.class};</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">Class</span><span style="color:#24292E;">[] </span><span style="color:#6F42C1;">services</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">Class</span><span style="color:#24292E;">[] {DynamicConfigurationService.class};</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>DynamicConfigurationService 接口中只定义了一个 registerConfigChangeWatcher 方法，用于注册 ConfigChangeWatcher 这个监听器：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">interface</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">DynamicConfigurationService</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">extends</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Service</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">registerConfigChangeWatcher</span><span style="color:#E1E4E8;">(ConfigChangeWatcher </span><span style="color:#FFAB70;">watcher</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">interface</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">DynamicConfigurationService</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">extends</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Service</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">registerConfigChangeWatcher</span><span style="color:#24292E;">(ConfigChangeWatcher </span><span style="color:#E36209;">watcher</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>根据底层依赖的配置中心不同，DynamicConfigurationService 接口有不同的实现类，如下图所示，其中一个实现是在 NoneConfigurationProvider 中定义的匿名类（该实现为空实现）。</p>`,5),f=s("p",null,'NoneConfigurationProvider 是 configuration-api 模块中提供的 ModuleProvider 实现类，也是 configuration-api 模块在 SPI 文件中指定的 ModuleProvider 实现类，其 name() 方法返回的 ModuleProvider 名称为 "none"，其余方法都是空实现。',-1),A=s("p",null,"所以，按照 application.yml 的默认配置，OAP 使用的就是 NoneConfigurationProvider，在 OAP 服务启动之后，没有任何监听配置修改的能力。",-1),F=s("h3",{id:"zookeeper-基础速读",tabindex:"-1"},[e("Zookeeper 基础速读 "),s("a",{class:"header-anchor",href:"#zookeeper-基础速读","aria-label":'Permalink to "Zookeeper 基础速读"'},"​")],-1),v=s("p",null,"在开始分析 configuration-zookeeper 模块之前，我们需要先了解一些 ZooKeeper 的基础知识。Apache ZooKeeper 是一个针对分布式系统的、可靠的、可扩展的协调服务，通常作为统一命名服务、统一配置管理、分布式集群管理（注册中心）、分布式锁服务、Leader 选举服务等角色出现。",-1),m=s("h4",{id:"基本概念",tabindex:"-1"},[e("基本概念 "),s("a",{class:"header-anchor",href:"#基本概念","aria-label":'Permalink to "基本概念"'},"​")],-1),k=s("p",null,"ZooKeeper 本身也是一个分布式应用程序，下图展示了 ZooKeeper 集群的核心架构。",-1),Z=s("ul",null,[s("li",null,[s("strong",null,"Client"),e("：分布式应用中的一个节点，通过 ZkClient 或是其他 ZooKeeper 客户端与 ZooKeeper 集群中的一个 Server 实例维持长连接，并定时发送心跳。Client 可以主动查询或操作 ZooKeeper 集群中的数据，也可以在某些 ZooKeeper 节点上添加监听，当被监听的节点发生变化时，会通过长连接通知 Client。")]),s("li",null,[s("strong",null,"Leader 节点"),e("：负责整个 ZooKeeper 集群的写操作，保证集群内事务处理的顺序性。同时，还要负责整个集群中所有 Follower 节点与 Observer 节点的数据同步。")]),s("li",null,[s("strong",null,"Follower 节点"),e("：用于接收 Client 读请求并向 Client 返回结果。Follower 节点并不处理写请求，而是转发到 Leader 节点完成写入操作。Follower 节点还会参与 Leader 节点的选举。")]),s("li",null,[s("strong",null,"Observer"),e("：Observer 节点不会参与 Leader 节点的选举，其他功能与 Follower 节点相同。引入Observer 角色的目的是增加 ZooKeeper 集群读操作的吞吐量，如果单纯依靠增加 Follower 节点，那么 ZooKeeper 集群的写能力会大大降低，因为 ZooKeeper 写数据时需要Leader 将写操作同步给半数以上的 Follower 节点。引入 Observer 节点使得 ZooKeeper 集群在写能力不降低的情况下，大大提升了读操作的吞吐量。")])],-1),P=s("p",null,'下图展示了 ZooKeeper 树型的存储结构。ZooKeeper 节点称为 ZNode 。每个 ZNode 有一个名称标识，并用 "/" 分隔，这与文件系统的目录树一样。ZooKeeper 树中的每个节点可以拥有子节点。',-1),D=o("<p>ZNode 节点类型有如下四种：</p><ul><li><strong>持久节点</strong>：节点创建后，会一直存在，不会因创建该节点的 Client 会话失效而删除。</li><li><strong>持久顺序节点</strong>：基本特性与持久节点一致，创建节点的过程中，ZooKeeper 会在其名字后自动追加一个单调增长的数字后缀，作为新的节点名。</li><li><strong>临时节点</strong>：创建该节点的 Client 的会话失效后，该节点会被自动删除。另外，在临时节点下面不能创建子节点。</li><li><strong>临时顺序节点</strong>：基本特性与临时节点一致，创建节点的过程中，ZooKeeper 会在其名字后自动追加一个单调增长的数字后缀，作为新的节点名。</li></ul><p>每个 ZNode 都维护着一个 stat 结构，其中记录了该 ZNode 的元数据，其中包括版本号、操作控制列表（ACL）、时间戳和数据长度等信息，如下表所示：</p>",3),K=o('<p>我们除了可以通过 Client 对 ZNode 进行增删改查等基本操作，还可以注册 Watcher 监听 ZNode 节点中数据的变化，以及其子节点的变化。一旦监听的数据有变化，则相应的 Watcher 即被触发。Watcher 有如下特点。</p><ul><li><strong>主动推送</strong>：Watcher 被触发时，由 ZooKeeper 集群主动将更新推送给客户端，而不需要客户端轮询。</li><li><strong>一次性</strong>：数据变化时，Watcher 只会被触发一次。如果客户端想得到后续更新的通知，必须要在 Watcher 被触发后重新注册一个 Watcher。</li><li><strong>可见性</strong>：如果一个客户端在读请求中附带 Watcher，Watcher 被触发的同时再次读取数据，客户端在得到 Watcher 消息之前肯定不可能看到更新后的数据。换句话说，更新通知先于更新结果。</li><li><strong>顺序性</strong>：如果多个更新触发了多个 Watcher ，那 Watch 被触发的顺序与更新顺序一致。</li></ul><h4 id="基本工作原理概述" tabindex="-1">基本工作原理概述 <a class="header-anchor" href="#基本工作原理概述" aria-label="Permalink to &quot;基本工作原理概述&quot;">​</a></h4><p>ZooKeeper 集群中三种角色的节点（Leader、Follower、Observer）都可以处理 Client 的读请求，因为每个节点都保存了相同的数据副本，直接进行读取即可返回给 Client。</p><p>对于写请求，如果 Client 请求的是 Follower 节点或 Observer 节点，则写请求将会被转发到 Leader 节点。下面是 Leader 处理写请求的流程：</p><ol><li>Leader 节点接收写请求后，会为写请求赋予一个全局唯一的 zxid（64 位自增 id），通过 zxid 的大小比较就可以实现写操作的顺序一致性。</li><li>Leader 通过先进先出队列（会给每个 Follower 节点都创建一个队列，保证发送的顺序性）将带有 zxid 的消息作为一个提案（proposal）分发给所有 Follower 节点。</li><li>当 Follower 节点接收到 proposal 之后，会先将 proposal 写到本地事务日志，写事务成功后再向 Leader 节点回一个 ACK 响应。</li><li>当 Leader 节点接收到过半 Follower 的 ACK 响应之后，Leader 节点就向所有 Follower 节点发送 COMMIT 命令，并在本地执行提交。</li><li>当 Follower 收到消息的 COMMIT 命令之后也会提交操作，写操作到此完成。</li></ol><p>下图展示了写操作的核心流程：</p>',7),W=o('<p>上面写请求处理中，如果发生 Leader 节点宕机，整个 ZooKeeper 集群可能处于如下两种状态：</p><ul><li>当 Leader 节点收到半数以上 Follower 节点的 ACK 响应之后，向各个 Follower 节点广播 COMMIT 命令，同时也会在本地执行 COMMIT 并向连接的客户端进行响应。如果在各个 Follower 在收到 COMMIT 命令前 Leader 就宕机了，导致剩下的服务器并没有执行这条消息。</li><li>当 Leader 节点生成 proposal 之后就宕机了，而其他 Follower 并没有收到此 proposal（或者只有一小部分 Follower 节点收到了这条 proposal），那么此次写操作就是执行失败的。</li></ul><p>因此，在 Leader 宕机后，ZooKeeper 会快速的进行 Leader 重新选举。ZooKeeper 对新 Leader 有如下两个要求：</p><ol><li>对于原 Leader 已经提交了的 proposal，新 Leader 必须能够广播并提交。</li><li>对于原 Leader 还未广播或只部分广播成功的 proposal，新 Leader 能够通知原 Leader 和已经同步了的 Follower 删除从而保证集群数据的一致性。</li></ol><p>ZooKeeper 选主使用的是 ZAB 协议，如果展开介绍的话内容会非常多，这里通过一个示例简单介绍 ZooKeeper 选主的大致流程：</p><p>当前集群中有 5 个 ZooKeeper 节点构成，sid 分别为 1，2，3，4，5。zxid 分别为 10，10，9，9，8，此时，sid 为 1 的节点是 Leader 节点。实际上，zxid 包含了 epoch 和自增计数器两部分。epoch 是纪元的意思，标识当前 Leader 周期，每次选举时 epoch 部分都会递增，这就防止了网络隔离之后，原始 Leader 重新连入集群造成不必要的重新选举。该示例中假设各个节点的 epoch 都相同。</p><p>某一时刻，节点 1 的服务器宕机了，ZooKeeper 集群开始进行选主。由于无法检测到集群中其他节点的状态信息（处于 Looking 状态），因此每个节点都将自己作为被选举的对象来进行投票。于是 sid 为 2、3、4、5 的节点，投票情况分别为（2，10）、（3，9）、（4，9）、（5，8），同时各个节点也会接收到来自其他节点的投票（这里以（sid，zxid）的形式来标识一次投票信息）。</p><ul><li>对于节点 2 来说，接收到（3，9）、（4，9）、（5，8）的投票，对比后发现自己的 zxid 最大，因此不需要做任何投票变更。</li><li>对于节点 3 来说，接收到（2，10）、（4，9）、（5，8）的投票，对比后由于 2 的 zxid 比自己的 zxid 要大，因此需要更改投票，改投（2，10），并将改投后的票发给其他节点。</li><li>对于节点 4 来说，接收到（2，10）、（3，9）、（5，8）的投票，对比后由于 2 的 zxid 比自己的 zxid 要大，因此需要更改投票，改投（2，10），并将改投后的票发给其他节点。</li><li>对于节点 5 来说，也是一样，最终改投（2，10）。</li></ul><p>经过第二轮投票后，集群中的每个节点都会再次收到其他机器的投票，然后开始统计投票，如果有过半的节点投了同一个节点，则该节点成为新的 Leader，这里显然是节点 2 成为新 Leader节点。</p><p>Leader 节点此时会将 epoch 值加 1，并将新生成的 epoch 分发给各个 Follower 节点。各个 Follower 节点收到全新的 epoch 后，返回 ACK 给 Leader 节点，并带上各自最大的 zxid 和历史事务日志。Leader 选出最大的 zxid，并更新自身历史事务日志，示例中的节点 2 无需更新。Leader 节点紧接着会将最新的事务日志同步给集群中所有的 Follower 节点，只有当半数 Follower 同步成功，这个准 Leader 节点才能成为正式的 Leader 节点开始工作。</p><p>到此为止，ZooKeeper 中涉及的基本概念以及 ZooKeeper 集群基本工作原理就介绍完了。</p><h4 id="初识-apache-curator" tabindex="-1">初识 Apache Curator <a class="header-anchor" href="#初识-apache-curator" aria-label="Permalink to &quot;初识 Apache Curator&quot;">​</a></h4><p>介绍完 ZooKeeper 的基本概念以及工作原理之后，我们了解一下 ZooKeeper Client 的相关内容。</p><p>ZooKeeper 官方提供的客户端支持了一些基本操作，例如，创建会话、创建节点、读取节点、更新数据、删除节点和检查节点是否存在等等，但在实际开发中只有这些简单功能是根本不够的。而且，ZooKeeper 本身的一些 API 也存在不足，例如：</p><ul><li>ZooKeeper 的 Watcher 是一次性的，每次触发之后都需要重新进行注册。</li><li>会话超时之后没有实现自动重连的机制。</li><li>ZooKeeper 提供的异常非常烦琐，对新手开发来说，非常不友好。</li><li>只提供了简单的 byte[] 数组的接口，没有提供基本类型以及对象级别的序列化。</li><li>创建节点时如果节点存在抛出异常，需要自行检查节点是否存在。</li><li>删除节点无法实现级联删除。</li></ul><p>常见的第三方开源 ZooKeeper 客户端有 ZkClient 和 Apache Curator。ZkClient 是在 ZooKeeper 原生 API 接口的基础上进行了包装，虽然 ZkClient 解决了 ZooKeeper 原生 API 接口的很多问题，提供了非常简洁的 API 接口，实现了会话超时自动重连的机制，解决了 Watcher 反复注册等问题，但其缺陷也非常明显。例如，文档不全、重试机制难用、异常全部转换成了 RuntimeException、没有足够的参考示例等等。</p><p>Apache Curator 是 Apache 基金会提供的一款 ZooKeeper Client，提供了一套易用性和可读性更强的 Fluent 风格的客户端 API ，可以帮助我们快速搭建稳定可靠的 ZK 客户端程序，其定位正如 Apache Curator 官网上的一句话：Guava to Java what Curator is to Zk。</p><p>下面表展示了 Curator 提供的 jar 包：</p>',18),S=s("p",null,"在下一课时介绍 configuration-zookeeper 模块实现时，就会使用到 Apache Curator 的相关内容。",-1),b=s("h3",{id:"基于-zookeeper-的配置管理",tabindex:"-1"},[e("基于 ZooKeeper 的配置管理 "),s("a",{class:"header-anchor",href:"#基于-zookeeper-的配置管理","aria-label":'Permalink to "基于 ZooKeeper 的配置管理"'},"​")],-1),T=s("p",null,"虽然 configuration-api 模块提供的 NoneConfigurationProvider 没有监听配置变更的能力，但却定义了 ConfigWatcherRegister 以及 AbstractConfigurationProvider 两个抽象类，方便依赖其他配置中心的模块进行扩展。",-1),w=s("p",null,"ConfigWatcherRegister 继承了DynamicConfigurationService 接口，如下图所示，依赖 ZooKeeper、Nacos 等配置中心的实现都继承了该抽象类。",-1),L=o(`<p>在 ConfigWatcherRegister 实现的 registerConfigChangeWatcher() 方法中，会将 ConfigChangeWatcher 记录到 Register 中。其中，ConfigChangeWatcher 是对配置变更的监听器，在 Register 底层维护了一个 Map， Key 为 ConfigChangeWatcher 的名称，Value 是 ConfigChangeWatcher 监听器本身。例如，在 SkyWalking 统计慢查询的时候，根据存储类型从 DBLatencyThresholdsAndWatcher 处获取相应的慢查询阈值，这里的 DBLatencyThresholdsAndWatcher 就继承了 ConfigChangeWatcher，在配置发生变更时，会通知 DBLatencyThresholdsAndWatcher 更新其自身的缓存。</p><p>在 ConfigWatcherRegister 的 start() 方法中，会启动一个后台线程轮训（默认周期 60 秒）依赖的配置中心拉取最新的配置，具体的拉取实现在 readConfig() 这个抽象方法中，由子类提供具体实现。拉取最新配置之后，会遍历全部的 ConfigChangeWatcher（其中记录了旧的配置值），比较新旧两个值，如果发现配置值发生变化，就会调用 notify() 方法通知 ConfigChangeWatcher 监听器，该逻辑位于 configSync() 方法之中。</p><p>再来看 AbstractConfigurationProvider 抽象类，它继承了 ModuleProvider，在 prepare() 方法中会初始化 ConfigWatcherRegister：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">prepare</span><span style="color:#E1E4E8;">(){</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 初始化ConfigWatcherRegister，这里的initConfigReader()是个抽象方法，</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 具体使用哪个 ConfigWatcherRegister 实现类由子类决定。</span></span>
<span class="line"><span style="color:#E1E4E8;">    configWatcherRegister </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">initConfigReader</span><span style="color:#E1E4E8;">(); </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">registerServiceImplementation</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">      DynamicConfigurationService.class, configWatcherRegister);</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">prepare</span><span style="color:#24292E;">(){</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 初始化ConfigWatcherRegister，这里的initConfigReader()是个抽象方法，</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 具体使用哪个 ConfigWatcherRegister 实现类由子类决定。</span></span>
<span class="line"><span style="color:#24292E;">    configWatcherRegister </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">initConfigReader</span><span style="color:#24292E;">(); </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">registerServiceImplementation</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">      DynamicConfigurationService.class, configWatcherRegister);</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>在其 notifyAfterCompleted() 方法实现中，会调用 ConfigWatcherRegister 的 start() 方法启动后台轮训线程。</p><p>AbstractConfigurationProvider 的子类如下图所示：</p>`,6),R=o(`<p>这里我们关注一下 ZookeeperConfigurationProvider，该实现类位于configuration-zookeeper 模块，该模块的 SPI 文件中定义的 ModuleProvider 实现类也是 ZookeeperConfigurationProvider，在其实现的 initConfigReader() 方法中使用的是 ZookeeperConfigWatcherRegister。</p><p>在 ZookeeperConfigWatcherRegister 的构造方法中会初始化 CuratorFramework 这个 ZooKeeper 客户端连接指定的 ZooKeeper 集群：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ZookeeperConfigWatcherRegister</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">       ZookeeperServerSettings settings) throws Exception {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">super</span><span style="color:#E1E4E8;">(settings.</span><span style="color:#B392F0;">getPeriod</span><span style="color:#E1E4E8;">()); </span><span style="color:#6A737D;">// 监听周期</span></span>
<span class="line"><span style="color:#E1E4E8;">    prefix </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> settings.</span><span style="color:#B392F0;">getNameSpace</span><span style="color:#E1E4E8;">() </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;/&quot;</span><span style="color:#E1E4E8;">; </span><span style="color:#6A737D;">// ZK节点的前缀</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 根据配置创建重试策略</span></span>
<span class="line"><span style="color:#E1E4E8;">    RetryPolicy retryPolicy </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ExponentialBackoffRetry</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">          settings.</span><span style="color:#B392F0;">getBaseSleepTimeMs</span><span style="color:#E1E4E8;">(), settings.</span><span style="color:#B392F0;">getMaxRetries</span><span style="color:#E1E4E8;">());</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 根据配置指定的地址，创建CuratorFramework客户端</span></span>
<span class="line"><span style="color:#E1E4E8;">    CuratorFramework client </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> CuratorFrameworkFactory.</span><span style="color:#B392F0;">newClient</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">        settings.</span><span style="color:#B392F0;">getHostPort</span><span style="color:#E1E4E8;">(), retryPolicy);</span></span>
<span class="line"><span style="color:#E1E4E8;">    client.</span><span style="color:#B392F0;">start</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 创建PathChildrenCache</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.childrenCache </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">PathChildrenCache</span><span style="color:#E1E4E8;">(client, </span></span>
<span class="line"><span style="color:#E1E4E8;">         settings.</span><span style="color:#B392F0;">getNameSpace</span><span style="color:#E1E4E8;">(), </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.childrenCache.</span><span style="color:#B392F0;">start</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ZookeeperConfigWatcherRegister</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">       ZookeeperServerSettings settings) throws Exception {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">super</span><span style="color:#24292E;">(settings.</span><span style="color:#6F42C1;">getPeriod</span><span style="color:#24292E;">()); </span><span style="color:#6A737D;">// 监听周期</span></span>
<span class="line"><span style="color:#24292E;">    prefix </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> settings.</span><span style="color:#6F42C1;">getNameSpace</span><span style="color:#24292E;">() </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;/&quot;</span><span style="color:#24292E;">; </span><span style="color:#6A737D;">// ZK节点的前缀</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 根据配置创建重试策略</span></span>
<span class="line"><span style="color:#24292E;">    RetryPolicy retryPolicy </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ExponentialBackoffRetry</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">          settings.</span><span style="color:#6F42C1;">getBaseSleepTimeMs</span><span style="color:#24292E;">(), settings.</span><span style="color:#6F42C1;">getMaxRetries</span><span style="color:#24292E;">());</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 根据配置指定的地址，创建CuratorFramework客户端</span></span>
<span class="line"><span style="color:#24292E;">    CuratorFramework client </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> CuratorFrameworkFactory.</span><span style="color:#6F42C1;">newClient</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">        settings.</span><span style="color:#6F42C1;">getHostPort</span><span style="color:#24292E;">(), retryPolicy);</span></span>
<span class="line"><span style="color:#24292E;">    client.</span><span style="color:#6F42C1;">start</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 创建PathChildrenCache</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.childrenCache </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">PathChildrenCache</span><span style="color:#24292E;">(client, </span></span>
<span class="line"><span style="color:#24292E;">         settings.</span><span style="color:#6F42C1;">getNameSpace</span><span style="color:#24292E;">(), </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.childrenCache.</span><span style="color:#6F42C1;">start</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>这里的重试策略参数、ZK 节点前缀、ZooKeeper 集群地址等一系列配置信息来自 ZookeeperServerSettings 这个 ModuleConfig 接口实现类，在本课时开始的 application.yml 截图中可以找到相应的配置。</p><p>通过 CuratorFrameworkFactory 工厂类可以创建 CuratorFramework 对象，它是 curator-framework 包中的核心对象，调用其 start() 方法即可开启与 ZooKeeper 集群的会话。</p><p>PathChildrenCache 是 curator-recipes 中提供的一个缓存工具类，它会将指定路径下的全部子节点信息缓存到本地，并且监听这些子节点的变化。当监听到子节点的变更事件时，会将变更结果更新到本地缓存之中。另外，我们可以向 PathChildrenCache 中添加 Listener 监听数据变化。</p><p>ZookeeperConfigWatcherRegister 对 readConfig() 这个抽象方法的实现也比较简单，直接从这个 PathChildrenCache 缓存中读取最新数据并整理成 ConfigTable 对象返回即可，60s 的定时轮训线程会执行 configSync() 方法之中完成新旧配置值的比较并通知相应的 ConfigWatcherRegister 对象。</p><h3 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h3><p>本课时重点介绍了 SkyWalking 中提供的 Configuration 模块。首先介绍了configuration-api 模块的实现，在不需要动态修改配置的时候，可以直接使用该模块。之后简单介绍了 ZooKeeper 的基本概念和工作原理，以及 configuration-zookeeper 模块依赖 ZooKeeper 实现动态配置变更的核心实现。</p>`,9);function B(M,x,I,N,q,z){const a=p("Image");return r(),t("div",null,[c,y,E,g,d,n(a,{alt:"image.png",src:"https://s0.lgstatic.com/i/image/M00/09/D7/CgqCHl688siAJ017AABzT6xvdZs551.png"}),e(),h,C,n(a,{alt:"image (1).png",src:"https://s0.lgstatic.com/i/image/M00/09/D7/CgqCHl688tKAUWu8AApG54vhCNQ135.png"}),e(),u,n(a,{alt:"image (2).png",src:"https://s0.lgstatic.com/i/image/M00/09/D7/CgqCHl688tuAWXXyAAIN0mNeddY662.png"}),e(),_,n(a,{alt:"image (3).png",src:"https://s0.lgstatic.com/i/image/M00/09/D7/CgqCHl688viAJ8OZAABFqb4k60Q765.png"}),e(),f,A,F,v,m,k,n(a,{alt:"image (4).png",src:"https://s0.lgstatic.com/i/image/M00/09/D7/CgqCHl688u-AVrZ3AAHsBQjob44191.png"}),e(),Z,P,n(a,{alt:"image (5).png",src:"https://s0.lgstatic.com/i/image/M00/09/D7/Ciqc1F688wqAJsJtAAHIFtKaGSg850.png"}),e(),D,n(a,{alt:"image (6).png",src:"https://s0.lgstatic.com/i/image/M00/09/D8/Ciqc1F688xKAHcQCAAU-W9Rr--g899.png"}),e(),K,n(a,{alt:"image (7).png",src:"https://s0.lgstatic.com/i/image/M00/09/D8/CgqCHl688x6Ab-hWAAPUPfOGKLE909.png"}),e(),W,n(a,{alt:"sw.png",src:"https://s0.lgstatic.com/i/image/M00/09/D8/CgqCHl6888eAY4NZAADf6Jd0NXg990.png"}),e(),S,b,T,w,n(a,{alt:"ConfigWatcherRegister.png",src:"https://s0.lgstatic.com/i/image/M00/09/D8/Ciqc1F688y-AT0Y0AAGEZhYxBWc264.png"}),e(),L,n(a,{alt:"AbstractConfigurationProvider继承关系.png",src:"https://s0.lgstatic.com/i/image/M00/09/D8/Ciqc1F688zqAE5J_AAGK-TTe0o8616.png"}),e(),R])}const H=l(i,[["render",B]]);export{V as __pageData,H as default};
