import{_ as s,j as e,o,g as r,k as t,h as l,s as i,Q as a}from"./chunks/framework.a0d18f64.js";const U=JSON.parse('{"title":"第01讲：同九义，为何SkyWalking一枝独秀？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/098-讲带你搞懂 SkyWalking文档/(1721) 第01讲：同九义，为何 SkyWalking 一枝独秀？.md","filePath":"posts/backEnd/098-讲带你搞懂 SkyWalking文档/(1721) 第01讲：同九义，为何 SkyWalking 一枝独秀？.md","lastUpdated":1696682708000}'),p={name:"posts/backEnd/098-讲带你搞懂 SkyWalking文档/(1721) 第01讲：同九义，为何 SkyWalking 一枝独秀？.md"},g=i("h1",{id:"第01讲-同九义-为何skywalking一枝独秀",tabindex:"-1"},[l("第01讲：同九义，为何SkyWalking一枝独秀？ "),i("a",{class:"header-anchor",href:"#第01讲-同九义-为何skywalking一枝独秀","aria-label":'Permalink to "第01讲：同九义，为何SkyWalking一枝独秀？"'},"​")],-1),_=i("p",null,"随着互联网时代的发展，很多企业为了快速响应业务的变化，开始使用微服务架构。微服务架构的系统常常被切分为多个独立的子系统并以集群的方式部署在数十甚至成百上千的机器上。",-1),c=i("br",null,null,-1),k=i("p",null,"虽然微服务架构带来更大的灵活性、更高的开发效率等等一系列好处，但是同样也面临着很多问题。为掌握系统的运行状态，确保系统正常对外提供服务，需要一些手段去监控系统，以了解系统行为，分析系统的性能，或在系统出现故障时，能发现问题、记录问题并发出告警，从而帮助运维人员发现问题、定位问题。也可以根据监控数据发现系统瓶颈，提前感知故障，预判系统负载能力等。",-1),S=i("br",null,null,-1),d=i("p",null,"这里简单以一个电商网站的单机架构与微服务架构进行对比，说明微服务架构中需要解决的一些问题。",-1),u=i("br",null,null,-1),A=i("br",null,null,-1),h=i("p",null,"图中展示了单机架构下的电商平台，用户使用浏览器发起请求访问电商系统，电商系统会直接从后端的数据库存储中查询相应的用户数据、订单数据、商品信息，以及库存数据等进行展示。当系统出现性能下降、异常信息的问题时，运维人员可以直接去电商系统中查看相应的日志或是系统监控，就基本可以定位到问题。",-1),y=i("br",null,null,-1),P=i("p",null,"下图展示了现实中微服务架构下的电商系统，整个电商系统被拆分成了很多子服务，每个子服务都是以集群的方式对外提供服务。当用户通过浏览器/手机 App 浏览商城的时候，请求会首先到达接入层 API 集群中的一个实例，该实例会通过 RPC 请求库存服务、商品服务、订单服务、用户服务，查询底层的存储，获取相应的数据，最终形成完整的响应结果返回给用户。",-1),b=i("br",null,null,-1),T=i("br",null,null,-1),M=i("p",null,"群无法支撑现在的访问量时，整个电商系统对外表现的性能就会下降，而用户请求涉及的服务和服务实例比较多，要查找到这个问题就需要浏览多个服务和机器的日志，步骤非常繁琐，所以说微服务架构下的问题定位变得比较困难。",-1),m=i("br",null,null,-1),W=i("p",null,"在定位到这个问题之后，我们可能考虑要给商品服务集群进行扩容，计算扩容多少台机器、新增部署多少个实例，都是需要相应的数据做支撑的，而不是凭开发和运维人员的直觉。为了解决微服务架构系统面临的上述挑战，APM 系统应运而生。",-1),C=i("h1",{id:"logging-metrics-tracing",tabindex:"-1"},[l("Logging&Metrics&Tracing "),i("a",{class:"header-anchor",href:"#logging-metrics-tracing","aria-label":'Permalink to "Logging\\&Metrics\\&Tracing"'},"​")],-1),E=i("p",null,"微服务系统的监控主要包含以下三个方面：",-1),I=i("br",null,null,-1),f=a("",7),v=i("br",null,null,-1),O=i("p",null,"一种更有效的展现方式就是下图这样，这是一个典型的 trace 视图，这种展现方式增加显示了执行时间的上下文，相关服务间的层次关系，进程或者任务的串行或并行调用关系。这样的视图有助于发现系统调用的关键路径。通过关注关键路径的执行过程，开发团队就可以专注于优化路径中的关键服务，最大幅度的提升系统性能。例如下图中，我们可以看到请求串行的调用了授权服务、订单服务以及资源服务，在资源服务中又并行的执行了三个子任务。我们还可以看到，在这整个请求的生命周期中，资源服务耗时是最长的。",-1),q=i("br",null,null,-1),V=a("",12),N=a("",5),L=a("",7);function x(J,R,D,F,w,B){const n=e("Image");return o(),r("div",null,[g,_,c,k,S,d,u,t(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/6E/3E/CgpOIF5fMbaAYJFNAACF5FQCSZg598.png"}),l(),A,h,y,P,b,t(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/6E/3E/Cgq2xl5fMbaARPc6AAF9cLLO7pM785.png"}),l(),T,M,m,W,C,E,I,t(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/6E/3E/CgpOIF5fMbeAVBbiAAKBOtXrJgg411.png"}),l(),f,t(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/6E/3E/Cgq2xl5fMbeAIKO2AABvAar2e5E122.png"}),l(),v,O,q,t(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/6E/3E/CgpOIF5fMbeACGYWAABqbqP7vns698.png"}),l(),V,t(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/6E/3E/Cgq2xl5fMbiAd3tdAAa1Trt-kIg886.png"}),l(),N,t(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/6E/3E/CgpOIF5fMbiAIwXlAADOeLbrwsU997.png"}),l(),L])}const H=s(p,[["render",x]]);export{U as __pageData,H as default};
