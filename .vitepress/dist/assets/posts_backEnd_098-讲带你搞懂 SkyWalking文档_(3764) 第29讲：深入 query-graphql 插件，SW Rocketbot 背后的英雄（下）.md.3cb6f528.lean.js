import{_ as e,j as o,o as r,g as t,k as l,h as n,s,Q as p}from"./chunks/framework.cfb14fe0.js";const P=JSON.parse('{"title":"第29讲：深入query-graphql插件，SWRocketbot背后的英雄（下）","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/098-讲带你搞懂 SkyWalking文档/(3764) 第29讲：深入 query-graphql 插件，SW Rocketbot 背后的英雄（下）.md","filePath":"posts/backEnd/098-讲带你搞懂 SkyWalking文档/(3764) 第29讲：深入 query-graphql 插件，SW Rocketbot 背后的英雄（下）.md","lastUpdated":1696682708000}'),c={name:"posts/backEnd/098-讲带你搞懂 SkyWalking文档/(3764) 第29讲：深入 query-graphql 插件，SW Rocketbot 背后的英雄（下）.md"},y=s("h1",{id:"第29讲-深入query-graphql插件-swrocketbot背后的英雄-下",tabindex:"-1"},[n("第29讲：深入query-graphql插件，SWRocketbot背后的英雄（下） "),s("a",{class:"header-anchor",href:"#第29讲-深入query-graphql插件-swrocketbot背后的英雄-下","aria-label":'Permalink to "第29讲：深入query-graphql插件，SWRocketbot背后的英雄（下）"'},"​")],-1),E=s("h3",{id:"topn-查询",tabindex:"-1"},[n("TopN 查询 "),s("a",{class:"header-anchor",href:"#topn-查询","aria-label":'Permalink to "TopN 查询"'},"​")],-1),i=s("p",null,"在 aggregation.graphqls 和 top-n-records.graphqls 两个 GraphQL Schema 文件中定义了所有关于 TopN 数据的查询，如下图所示：",-1),d=p("",7),u=s("p",null,"简单介绍下这些方法的功能：",-1),g=s("ul",null,[s("li",null,[s("p",null,"getServiceeTopN()/getAllServiceInstanceTopN()/getAllEndpointTopN() 方法：按照 name 参数指定监控维度对所有 Service/ServiceInstance/Endpoint 进行排序并获取 TopN。")]),s("li",null,[s("p",null,"getServiceInstance()/getEndpointTopN() 方法：在 serviceId 参数指定 Service 中，按照 name 参数指定的监控维度对 ServiceInstance/Endpoint 进行排序并获取 TopN。")])],-1),S=s("p",null,"在 SkyWalking Rocketbot 中我们可以看到 Global Top Throughout 的监控，如下图所示：",-1),B=p("",11),F=s("p",null,"该拓扑图中展示的拓扑关系以及调用链上的指标数据是通过 query-graphql-plugin 插件提供的三个 get*Topology() 方法实现的，如下图所示：",-1),m=s("p",null,"在上述拓扑图展示的时候只需要请求 getGlobalTopology() 方法即可，在 TopologyQueryService.getGlobalTopology() 方法中会通过下面两个方法完成查询。",-1),A=s("ul",null,[s("li",null,"loadServerSideServiceRelations() 方法：查询 Index 别名为 service_relation_server_side 的 Index，该类 Index 中只记录了服务端视角的调用关系，并没有记录其他指标信息。在前面示例中，该查询的结果如下图所示：")],-1),D=s("ul",null,[s("li",null,"loadClientSideServiceRelations() 方法：查询 Index 别名为 service_relation_client_side 的 Index，该类 Index 中只记录了客户端视角的调用关系，并没有记录其他指标信息。在前面示例中，该查询的结果如下图所示：")],-1),C=s("p",null,"接下来，TopologyQueryService 会将上述两个查询结果集合进行合并和整理，最终得到一个 Topology 对象。在 Topology 对象中包含两个集合。",-1),T=s("ul",null,[s("li",null,"nodes 集合：包含了拓扑图中所有的节点信息，示例中的结果如下图所示，总共有 3 个节点，分别是 User、demo-webapp、demo-provider：")],-1),_=s("ul",null,[s("li",null,"calls 集合：包含了拓扑图中所有的边（即调用关系），示例中的结果如下图所示，总共有 2 条边，一条边是 User 调用 demo-webapp（即 1_2），另一条边是 demo-webapp 调用 demo-provider（即2_3）：")],-1),h=s("p",null,'在侦察端面板中展示的监控图都是通过 getLinearIntValues() 方法查询相应 Index 实现的，例如上图中侦察端面板中展示的"平均响应时间"监控图，就是查询别名为 service_relation_server_resp_time 的这组 Index 实现的，其中指定了 entity_id 为 "2_3"（即 demo-webapp 调用 demo-provider 的这条调用链路的平均响应时间）。',-1),v=s("p",null,"除了查询完整的拓扑图之外，我们还可以以一个 Service 或 Endpoint 为中心进行拓扑图查询，分别对应前文提到的 getServiceTopology() 方法和 getEndpointTopology() 方法，这两个方法的查询逻辑与 getGlobalTopology() 方法基本类似，主要区别在于添加了 serviceId（或是 endpointId）的查询条件，具体实现不再展开，如果你感兴趣可以翻看一下源码。",-1),I=s("h3",{id:"tracequery",tabindex:"-1"},[n("TraceQuery "),s("a",{class:"header-anchor",href:"#tracequery","aria-label":'Permalink to "TraceQuery"'},"​")],-1),N=s("p",null,'在 SkyWalking Rocketbot 的"追踪"面板中，我们可以查询到所有收集到的 Trace 信息，如下图所示：',-1),Q=s("p",null,"该面板可以分为三个区域，在区域 1 中，我们可以选择 TraceSegment 关联的 Service、ServiceInstance 以及 Endpoint，这些下拉表中的数据是通过前文介绍的 MetadataQuery 查询到的。在区域 2 中展示了 TraceSegment 的简略信息，通过 queryBasicTraces() 方法查询得到，如下图所示。在区域 3 中展示了一条完整 Trace 的详细信息，通过 queryTrace() 方法查询得到，如下图所示。",-1),R=p("",17),b=s("p",null,"query-graphql-plugin 插件的分析就到此结束了，我们下一课时见。",-1);function k(q,O,x,f,L,M){const a=o("Image");return r(),t("div",null,[y,E,i,l(a,{alt:"Drawing 12.png",src:"https://s0.lgstatic.com/i/image/M00/26/46/CgqCHl7xuW2AVBsLAAa7U3_glbg954.png"}),n(),d,l(a,{alt:"Drawing 13.png",src:"https://s0.lgstatic.com/i/image/M00/26/46/CgqCHl7xuYaALcPBAAQkaAzAsZQ746.png"}),n(),u,g,S,l(a,{alt:"Drawing 14.png",src:"https://s0.lgstatic.com/i/image/M00/26/3B/Ciqc1F7xuZKAHD0IAAA25djPgC4804.png"}),n(),B,l(a,{alt:"Drawing 15.png",src:"https://s0.lgstatic.com/i/image/M00/26/46/CgqCHl7xuayAIvTUAAJojFh6YyE235.png"}),n(),F,l(a,{alt:"Drawing 16.png",src:"https://s0.lgstatic.com/i/image/M00/26/3B/Ciqc1F7xubKAVtfzAAC2lq_kx4o043.png"}),n(),m,A,l(a,{alt:"Drawing 17.png",src:"https://s0.lgstatic.com/i/image/M00/26/46/CgqCHl7xubuAU0x0AApr3mz8Xig844.png"}),n(),D,l(a,{alt:"Drawing 18.png",src:"https://s0.lgstatic.com/i/image/M00/26/46/CgqCHl7xucOAKVAYAAcAU9rWAdI587.png"}),n(),C,T,l(a,{alt:"Drawing 19.png",src:"https://s0.lgstatic.com/i/image/M00/26/3B/Ciqc1F7xucuAZ-UvAAiQRLtPrz8281.png"}),n(),_,l(a,{alt:"Drawing 20.png",src:"https://s0.lgstatic.com/i/image/M00/26/3B/Ciqc1F7xudSAYy9DAAzv4IcETLc263.png"}),n(),h,v,I,N,l(a,{alt:"Drawing 21.png",src:"https://s0.lgstatic.com/i/image/M00/26/3B/Ciqc1F7xueKAMOe1AAOBgdOJVb0240.png"}),n(),Q,l(a,{alt:"Drawing 23.png",src:"https://s0.lgstatic.com/i/image/M00/26/3B/Ciqc1F7xue6AFKXNAAEBPbJC8sE357.png"}),n(),R,l(a,{alt:"Drawing 24.png",src:"https://s0.lgstatic.com/i/image/M00/26/47/CgqCHl7xuheAOMFAAATOX_NF5CU262.png"}),n(),b])}const U=e(c,[["render",k]]);export{P as __pageData,U as default};
