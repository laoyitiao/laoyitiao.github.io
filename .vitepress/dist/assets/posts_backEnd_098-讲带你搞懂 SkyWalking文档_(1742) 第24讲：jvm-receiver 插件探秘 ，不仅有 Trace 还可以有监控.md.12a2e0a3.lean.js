import{_ as p,j as o,o as t,g as c,k as l,h as n,s,Q as e}from"./chunks/framework.cfb14fe0.js";const O=JSON.parse('{"title":"第24讲：jvm-receiver插件探秘，不仅有Trace还可以有监控","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/098-讲带你搞懂 SkyWalking文档/(1742) 第24讲：jvm-receiver 插件探秘 ，不仅有 Trace 还可以有监控.md","filePath":"posts/backEnd/098-讲带你搞懂 SkyWalking文档/(1742) 第24讲：jvm-receiver 插件探秘 ，不仅有 Trace 还可以有监控.md","lastUpdated":1696682708000}'),r={name:"posts/backEnd/098-讲带你搞懂 SkyWalking文档/(1742) 第24讲：jvm-receiver 插件探秘 ，不仅有 Trace 还可以有监控.md"},i=s("h1",{id:"第24讲-jvm-receiver插件探秘-不仅有trace还可以有监控",tabindex:"-1"},[n("第24讲：jvm-receiver插件探秘，不仅有Trace还可以有监控 "),s("a",{class:"header-anchor",href:"#第24讲-jvm-receiver插件探秘-不仅有trace还可以有监控","aria-label":'Permalink to "第24讲：jvm-receiver插件探秘，不仅有Trace还可以有监控"'},"​")],-1),E=s("p",null,"在第 11 课时中，我介绍了 Agent 中 JVMService 的核心原理，它会定期通过 JMX 获取 JVM 监控信息，然后通过 JVMMetricReportService 这个 gRPC 接口上报到后端 OAP 集群。",-1),y=s("p",null,"本节课我将深入分析 SkyWalking OAP 对 JVM 监控数据的处理。",-1),d=s("h3",{id:"jvmmetricreportservicehandler",tabindex:"-1"},[n("JVMMetricReportServiceHandler "),s("a",{class:"header-anchor",href:"#jvmmetricreportservicehandler","aria-label":'Permalink to "JVMMetricReportServiceHandler"'},"​")],-1),g=s("p",null,"在 SkyWalking OAP 提供了 jvm-receiver-plugin 插件用于接收 Agent 发送的 JVMMetric 。jvm-receiver-plugin 插件的 SPI 配置文件中指定的 ModuleDefine 实现是 JVMModule（名称为 receiver-jvm），ModuleProvider 实现是 JVMModuleProvider（名称为 default）。在 JVMModuleProvider 的 start() 方法中会将 JVMMetricReportServiceHandler 注册到 GRPCServer 中。JVMMetricReportServiceHandler 实现了 JVMMetric.proto 文件中定义的 JVMMetricReportService gRPC 接口，其 collect() 方法负责处理 JVMMetric 对象。",-1),u=s("p",null,"首先，会通过 TimeBucket 工具类整理对齐每个 JVMMetric 所在的时间窗口，TimeBucket 会根据指定的 DownSampling 精度生成不同格式的时间窗口，如下图所示：",-1),h=e("",5),m=e("",8),C=e("",10),D=e("",7),v=e("",10),F=e("",15),A=e("",17),M=s("p",null,"与前文介绍的 MetricsAggregateWorker 处理流程类似，MetricsPersistentWorker 在接收到 Metrics 数据的时候先将其暂存到 DataCarrier 中，然后由后续 Consumer 线程消费。",-1),k=s("br",null,null,-1),b=s("p",null,"Consumer 线程实际上调用的是 PersistenceWorker.onWork() 方法，PersistenceWorker是 MetricsPersistentWorker 的父类，继承关系如下图所示：",-1),P=e("",14),S=s("p",null,"JVMMetricReportServiceHandler 在收到 JVM Metrics 请求时，由 DispatcherManager 对 JVMMetric 进行分类（ CPU、Memory、MemoryPool、GC 四类）并转换成相应的 Source 对象，接下来根据 Source 类型查找相应的 SourceDispatcher 集合进行处理。",-1),B=s("p",null,"在 SourceDispatcher 中会将监控数据再次拆分，转换单一维度的 Metrics 对象，例如，在 ServiceInstanceJVMGCDispatcher 中会将 GC 监控拆分成 Old GC Time、Old GC Count、New GC Time、New GC Count 四类。之后，SourceDispatcher 会将 Metrics 对象传递给 MetricsStreamProcessor 中的 worker 进行处理。",-1),_=s("p",null,"MetricsAggregateWorker 通过 MergeDataCache 对 Metrics 数据进行暂存以及简单聚合。",-1),I=s("p",null,"MetricsRemoteWorker 通过底层的 RemoteSenderService 将 Metrics 数据送到 OAP 集群中的其他远端节点。",-1),W=s("p",null,"MetricsTransWorker 会将 Metrics 数据复制多份，转发到各个 DownSampling 对应的 MetricsPersistentWorker 中实现持久化。",-1),w=s("p",null,"MetricsPersistentWorker 会先将数据缓存在 MergeDataCache 中，当缓存数据量到达一定阈值，执行批量写入（或更新） ElasticSearch 操作，批量操作是通过 High Level Client 中的 BulkProcessor 实现的。",-1);function T(G,f,J,V,q,R){const a=o("Image");return t(),c("div",null,[i,E,y,d,g,u,l(a,{alt:"image (5).png",src:"https://s0.lgstatic.com/i/image/M00/18/79/Ciqc1F7YtnGAMAYGAAJwEbFWmzY337.png"}),n(),h,l(a,{alt:"image (6).png",src:"https://s0.lgstatic.com/i/image/M00/18/79/Ciqc1F7YtoOABepsAAEMFZwAVUo208.png"}),n(),m,l(a,{alt:"image (7).png",src:"https://s0.lgstatic.com/i/image/M00/18/79/Ciqc1F7Ytp6AYxkTAAE2IyTdv1A381.png"}),n(),C,l(a,{alt:"image (8).png",src:"https://s0.lgstatic.com/i/image/M00/18/85/CgqCHl7YtreATj7GAARBmbdpdkw991.png"}),n(),D,l(a,{alt:"image (9).png",src:"https://s0.lgstatic.com/i/image/M00/18/7A/Ciqc1F7Yts6AUU4bAABZiou-upc728.png"}),n(),v,l(a,{alt:"image (10).png",src:"https://s0.lgstatic.com/i/image/M00/18/7A/Ciqc1F7YtumAfQZeAAFcY5KP8TM078.png"}),n(),F,l(a,{alt:"image (11).png",src:"https://s0.lgstatic.com/i/image/M00/18/86/CgqCHl7YtwqAOhwEAAGQdRPvCuM193.png"}),n(),A,l(a,{alt:"image (12).png",src:"https://s0.lgstatic.com/i/image/M00/18/7A/Ciqc1F7YtziAPKFvAAFUA42eQDc822.png"}),n(),M,k,b,l(a,{alt:"image (13).png",src:"https://s0.lgstatic.com/i/image/M00/18/86/CgqCHl7Yt0SAW_XHAAGAflXWY6Q440.png"}),n(),P,l(a,{alt:"image (14).png",src:"https://s0.lgstatic.com/i/image/M00/18/7B/Ciqc1F7Yt2OAJnGpAABb_jqSXp0511.png"}),n(),S,B,_,I,W,w])}const L=p(r,[["render",T]]);export{O as __pageData,L as default};
