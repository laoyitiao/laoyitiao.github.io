import{_ as p,j as o,o as t,g as c,k as l,h as n,s,Q as e}from"./chunks/framework.cfb14fe0.js";const X=JSON.parse('{"title":"加餐3：SkyWalkingOAP存储体系剖析","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/098-讲带你搞懂 SkyWalking文档/(3430) 加餐3：SkyWalking OAP 存储体系剖析.md","filePath":"posts/backEnd/098-讲带你搞懂 SkyWalking文档/(3430) 加餐3：SkyWalking OAP 存储体系剖析.md","lastUpdated":1696682708000}'),r={name:"posts/backEnd/098-讲带你搞懂 SkyWalking文档/(3430) 加餐3：SkyWalking OAP 存储体系剖析.md"},i=s("h1",{id:"加餐3-skywalkingoap存储体系剖析",tabindex:"-1"},[n("加餐3：SkyWalkingOAP存储体系剖析 "),s("a",{class:"header-anchor",href:"#加餐3-skywalkingoap存储体系剖析","aria-label":'Permalink to "加餐3：SkyWalkingOAP存储体系剖析"'},"​")],-1),E=s("p",null,"前面的课时提到，SkyWalking OAP 底层支持 ElasticSearch、H2、MySQL 等多种持久化存储，同时也支持读取其他分布式链路追踪系统的数据，例如，jaeger（Uber 开源的分布式跟踪系统）、zipkin（Twitter 开源的分布式跟踪系统）。下图展示了 OAP 提供的针对不同持久化存储的插件模块：",-1),y=s("p",null,"在 server-core 模块中对整个 OAP 的持久化有一个整体的抽象，具体位置如下图所示，而上述这些插件都是在此基础上扩展实现的：",-1),g=s("p",null,'首先，OAP 存储了两种类型的数据：时间相关的数据和非时间相关的数据（与"时序"这个专有名词区分一下）。注册到 OAP 集群的 Service、ServiceInstance 以及同步的 EndpointName、NetworkAddress 都是非时间相关的数据，一个稳定的服务产生的这些数据是有限的，我们可以用几个固定的 ES 索引（或数据库表）来存储这些数据。',-1),d=s("p",null,"而像 JVM 监控等都属于时间相关的数据，它们的数据量会随时间流逝而线性增加。如果将这些时间相关的数据存储到几个固定的 ES 索引中，就会导致这些 ES 索引（或数据库表）非常大，这种显然是不能落地的。既然一个 ES 索引（或数据库表）存不下，一般会考虑切分，常见的切分方式按照时间窗口以及 DownSampling 进行切分。",-1),m=s("p",null,'这里简单介绍一下 DownSampling 这个概念。DownSampling（翻译为"向下采样"或是"降采样"）是降低数据采样率或分辨率的过程。这里通过一个示例进行说明，假设 Agent 每隔一分钟进行一次 JVM Old GC 时间的采样，并发送到 Skywalking OAP 集群，一小时之后，我们可以到 60 个点（Timestamp 和 Value 构成一个点），在一张二维图（横轴是时间戳，纵轴是 Old GC 耗时）上将这些点连接起来，可以绘制出该 JVM 实例在这一小时内的 Old GC 监控曲线。',-1),A=s("p",null,"假设我们查询该 JVM 实例跨度为一周的 Old GC 监控，将获得 10080 个点，监控图中点与点之间的距离会变得非常密。此时，就可以通过 DownSampling 的方式，将一个时间范围内的多个监控数据点聚合成单个点，从而减少需要绘制的点的个数。这里我们可以按照小时为时间窗口，计算一小时内 60 点的平均值，作为该小时的 DownSampling 聚合结果。下图为 13:00 ~ 14:00 以及 14:00 ~ 15:00 两小时的 DownSampling 示意图，经过 DownSampling 之后，一周的监控数据只有 168 个点了。",-1),_=s("p",null,"另外，Trace 也是时间相关的数据，其数据量会随时间不断增加，但不具备可聚合的特性。",-1),u=s("h3",{id:"model-与-es-索引",tabindex:"-1"},[n("Model 与 ES 索引 "),s("a",{class:"header-anchor",href:"#model-与-es-索引","aria-label":'Permalink to "Model 与 ES 索引"'},"​")],-1),S=s("p",null,"明确了 OAP 要存储的数据特性，我们回到 server-core 模块继续分析。常见的 ORM 框架会将数据中的表结构映射成 Java 类，表中的一个行数据会映射成一个 Java Bean 对象，在 OAP 的存储抽象中也有类似的操作。SkyWalking 会将 [Metric + DownSampling] 对应的一系列 ES 索引与一个 Model 对象进行映射，下图展示了 instance_jvm_old_gc_time 这个 Metric（指标）涉及的全部 ES 索引以及对应的 Model 对象：",-1),C=e("",4),D=s("p",null,"在 CoreModuleProvider 启动过程中，会扫描 @Stream 注解，创建相应的 Model 对象，并由 StorageModels 统一管理（底层维护了 List 集合）。 @Stream 扫描过程后面介绍，这里只需知道 @Stream 中会包含 Model 需要的信息即可。StorageModels 同时实现了 IModelSetter、IModelGetter、IModelOverride 三个 Service 接口，如下图所示。",-1),h=e("",6),F=e("",6),M=s("p",null,"可以看到模板中指定的别名与 Model.name 是相同的，在后续查询操作中，我们可以直接通过别名查询该模板匹配的全部索引，但是写入时还是要明确指定具体索引名称的。",-1),k=s("p",null,"另一个点是索引名称的时间后缀。在 TimeBucket 工具类中会根据指定的 DownSampling 将毫秒级时间进行整理，得到相应的时间窗口，如下图所示：",-1),T=e("",6),I=s("ul",null,[s("li",null,[s("p",null,[s("strong",null,"Metrics"),n("：所有监控指标的顶级抽象，其中定义了一个 timeBucket 字段（long类型），它是所有监控指标的公共字段，用于表示该监控点所处的时间窗口。另外，timeBucket 字段被 @Column 注解标记，在 OAP 启动时会被扫描到转换成 Model 中的 ModelColumn，在初始化 ES 索引时就会创建相应的 Field。Metrics 抽象类中还定义了计算监控数据的一些公共方法：")]),s("ul",null,[s("li",null,[s("p",null,"calculate() 方法：大部分 Metrics 都会有一个 value 字段来记录该监控点的值，例如，CountMetrics 中的 value 字段记录了时间窗口内事件的次数，MaxLongMetrics 中的 value 字段记录时间窗口内的最大值。calculate() 方法就是用来计算该 value 值。")]),s("li",null,[s("p",null,"combine() 方法：合并两个监控点。对于不同含义的监控数据，合并方式也有所不同，例如，CountMetrics 中 combine() 方法的实现是将两个监控点的值进行求和；MaxLongMetrics 中 combine() 方法的实现是取两个监控点的最大值。")])])]),s("li",null,[s("p",null,[s("strong",null,"Record"),n("：抽象了所有记录类型的数据，其子类如下图所示。其中 SegmentRecord 对应的是 TraceSegment 数据、AlarmRecord 对应一条告警、TopNDatabaseStatement 对应一条慢查询记录，这些数据都是一条条的记录。")])])],-1),v=e("",6),b=s("p",null,"GRPCClient 底层会与指定地址创建 gRPC ManagedChannel 连接，在后面的课程中会看到， OAP 节点之间的通信就是依赖 GRPCClient 实现的。",-1),O=s("p",null,"JDBCHikariCPClient 底层封装了 HikariCP 连接池，对外提供了 execute()、executeQuery() 等执行 SQL 语句的方法。",-1),B=s("p",null,"library-client 模块相对独立，如果同学们在实际开发中需要封装 ElasticSearch 客户端或是 JDBC 客户端，都可以直接拿来使用。",-1),P=s("p",null,"虽然 ElasticSearchClient 对 RestHighLevelClient 的通用操作进行了封装，但如果上层逻辑直接使用，还是必须了解 RestHighLevelClient 的相关概念，所以在实践中会针对业务封装出一套 DAO 层。在 DAO 层会完成业务概念与存储概念的转换，如下图所示：",-1),N=s("p",null,"SkyWalking OAP 也提供了DAO 层抽象，如下图所示，大致可以分为三类：Receiver DAO、Cache DAO、Query DAO。",-1),w=s("ul",null,[s("li",null,[s("strong",null,"Receiver DAO 接口"),n("：在各个 receiver 模块接收到 Agent 上报的 Metrics 数据、Trace 数据以及注册请求的时候，会通过 Receiver DAO 将数据持久化到底层存储，具体的接口如下图所示：")])],-1),x=e("",2),R=s("p",null,"另外，在 CoreModule 中还会启动 CacheUpdateTimer，其中会启动一个后台线程，定期更新 ServiceInventoryCache 缓存。",-1),f=s("ul",null,[s("li",null,[s("strong",null,"Query DAO 接口"),n("：Query DAO 接口负责支撑 query 模块处理 SkyWalking Rocketbot 发来的查询请求，接口参数更加贴近用户请求参数。下图展示了所有 Query DAO 接口，从接口名称即可看出查询的是哪些数据。")])],-1),q=s("p",null,"SkyWalking OAP 中 DAO 层的整体架构以及核心接口就介绍完了。",-1),L=s("h3",{id:"数据-ttl",tabindex:"-1"},[n("数据 TTL "),s("a",{class:"header-anchor",href:"#数据-ttl","aria-label":'Permalink to "数据 TTL"'},"​")],-1),V=s("p",null,"前文提到，Metrics、Trace 等（时间相关的数据）对应的 ES 索引都是按照时间进行切分的，随着时间的推移，ES 索引会越来越多。为了解决这个问题，SkyWalking 只会在 ES 中存储一段时间内的数据，CoreModuleProvider 会启动 DataTTLKeeperTimer 定时清理过期数据。",-1),W=s("p",null,"在 DataTTLKeeperTimer 中会启动一个后台线程，每 5 分钟执行一次清理操作，具体执行步骤如下：",-1),G=s("ol",null,[s("li",null,"通过 ClusterNodesQuery 查询到当前 OAP 集群中全部节点列表，如果当前节点为列表中第一个节点，才能继续执行后续的清理操作。这就保证不会出现多个 OAP 节点并发执行清理任务。"),s("li",null,"从 IModelGetter 中拿到全部 Model 对象，根据 Model 数据的 DownSampling 计算每个 Model 保留 ES 索引的范围。这里使用到了 StorageTTL 接口，其中会根据每个 Model 不同的 DownSampling 返回相应的 TTLCalculator，如下图所示：")],-1),H=e("",6);function j(J,Q,U,K,Y,z){const a=o("Image");return t(),c("div",null,[i,E,l(a,{alt:"image001.png",src:"https://s0.lgstatic.com/i/image/M00/11/F6/Ciqc1F7M1mOAdkinAAUHgWAh2x8972.png"}),n(),y,l(a,{alt:"image003.png",src:"https://s0.lgstatic.com/i/image/M00/11/F6/Ciqc1F7M1nCAO5cwAAKxM_2j59I530.png"}),n(),g,d,m,A,l(a,{alt:"image005.png",src:"https://s0.lgstatic.com/i/image/M00/11/F6/Ciqc1F7M1nyAFfhMAAP8mBituI8522.png"}),n(),_,u,S,l(a,{alt:"image007.png",src:"https://s0.lgstatic.com/i/image/M00/12/02/CgqCHl7M1qqAWJwzAAJI_qj62kA075.png"}),n(),l(a,{alt:"image009.png",src:"https://s0.lgstatic.com/i/image/M00/12/02/CgqCHl7M1rCAF_BRAAIjEdyxGKM865.png"}),n(),l(a,{alt:"image011.png",src:"https://s0.lgstatic.com/i/image/M00/11/F6/Ciqc1F7M1riAbapoAAIgfkX2Ecw638.png"}),n(),l(a,{alt:"image013.png",src:"https://s0.lgstatic.com/i/image/M00/12/02/CgqCHl7M1saAc6guAAIMU20bW9s987.png"}),n(),C,l(a,{alt:"image015.png",src:"https://s0.lgstatic.com/i/image/M00/11/F7/Ciqc1F7M1tWAGod6AAXHbG78X9I245.png"}),n(),D,l(a,{alt:"image017.png",src:"https://s0.lgstatic.com/i/image/M00/12/02/CgqCHl7M1uGAFsn_AAHpuk8RDn4882.png"}),n(),h,l(a,{alt:"image019.png",src:"https://s0.lgstatic.com/i/image/M00/11/F7/Ciqc1F7M1vSAKUcCAACnS4z1sy0205.png"}),n(),F,l(a,{alt:"image021.png",src:"https://s0.lgstatic.com/i/image/M00/11/F7/Ciqc1F7M1wGAI3qgAACMKwr5nRI057.png"}),n(),M,k,l(a,{alt:"image023.png",src:"https://s0.lgstatic.com/i/image/M00/12/02/CgqCHl7M1yCAbH7cAAmLbCfxgJc857.png"}),n(),T,l(a,{alt:"image025.png",src:"https://s0.lgstatic.com/i/image/M00/11/F7/Ciqc1F7M1y2AAEnMAACsBUVPIcg418.png"}),n(),I,l(a,{alt:"image027.png",src:"https://s0.lgstatic.com/i/image/M00/12/03/CgqCHl7M1ziAUV3lAADO8_KdBjs730.png"}),n(),v,l(a,{alt:"image029.png",src:"https://s0.lgstatic.com/i/image/M00/11/F7/Ciqc1F7M10iAQOQeAACK78d1tQw384.png"}),n(),b,O,B,P,l(a,{alt:"image031.png",src:"https://s0.lgstatic.com/i/image/M00/11/F7/Ciqc1F7M11iAEBxFAAGikNTBius816.png"}),n(),N,l(a,{alt:"image033.png",src:"https://s0.lgstatic.com/i/image/M00/11/F7/Ciqc1F7M12iAYJt9AAIIw288AD4900.png"}),n(),w,l(a,{alt:"image035.png",src:"https://s0.lgstatic.com/i/image/M00/11/F7/Ciqc1F7M13SAGmxvAADxT4960Jo386.png"}),n(),x,l(a,{alt:"image037.png",src:"https://s0.lgstatic.com/i/image/M00/11/F7/Ciqc1F7M132AMFlHAACbaBYDnW8720.png"}),n(),R,f,l(a,{alt:"image039.png",src:"https://s0.lgstatic.com/i/image/M00/11/F7/Ciqc1F7M14eAfVPdAABls_BG5tE854.png"}),n(),q,L,V,W,G,l(a,{alt:"image041.png",src:"https://s0.lgstatic.com/i/image/M00/11/F7/Ciqc1F7M15KASkiEAABTiYqEwqw229.png"}),n(),H])}const Z=p(r,[["render",j]]);export{X as __pageData,Z as default};
