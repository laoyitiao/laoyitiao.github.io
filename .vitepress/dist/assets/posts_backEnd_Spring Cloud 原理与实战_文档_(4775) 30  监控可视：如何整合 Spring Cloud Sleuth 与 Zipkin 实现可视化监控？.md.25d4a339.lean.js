import{_ as l,j as t,o,g as i,k as p,h as n,Q as e,s}from"./chunks/framework.cfb14fe0.js";const L=JSON.parse('{"title":"30监控可视：如何整合SpringCloudSleuth与Zipkin实现可视化监控？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/Spring Cloud 原理与实战_文档/(4775) 30  监控可视：如何整合 Spring Cloud Sleuth 与 Zipkin 实现可视化监控？.md","filePath":"posts/backEnd/Spring Cloud 原理与实战_文档/(4775) 30  监控可视：如何整合 Spring Cloud Sleuth 与 Zipkin 实现可视化监控？.md","lastUpdated":1696682708000}'),c={name:"posts/backEnd/Spring Cloud 原理与实战_文档/(4775) 30  监控可视：如何整合 Spring Cloud Sleuth 与 Zipkin 实现可视化监控？.md"},r=e("",6),u=s("p",null,"Zipkin 基本结构图（来自 Zipkin 官网）",-1),E=s("p",null,"在上图中，首先我们看到的是日志的收集组件 Collector，接收来自外部传输（Transport）的数据，将这些数据转换为 Zikpin 内部处理的 Span 格式，相当于兼顾数据收集和格式化的功能。这些收集的数据通过存储组件 Storage 进行存储，当前支持 Cassandra、Redis、HBase、MySQL、PostgreSQL、SQLite 等工具，默认存储在内存中。然后，所存储数据可以通过 RESTful API 对外暴露查询接口。更为有用的是，Zipkin 还提供了一套简单的 Web 界面，基于 API 组件的上层应用，可以方便而直观的查询和分析跟踪信息。",-1),d=s("p",null,"在运行过程中，可以通过 Zipkin 获取类似如下图所示的服务调用链路分析效果：",-1),q=e("",13),y=s("p",null,"构建 Zipkin 可视化服务调用链路的三大维度",-1),h=s("p",null,"接下来，我们将分别这三个维度介绍 Zipkin 的强大功能。",-1),g=s("h4",{id:"可视化服务依赖关系",tabindex:"-1"},[n("可视化服务依赖关系 "),s("a",{class:"header-anchor",href:"#可视化服务依赖关系","aria-label":'Permalink to "可视化服务依赖关系"'},"​")],-1),_=s("p",null,"依赖在某种程度上不可避免，但是过多地依赖势必会增加系统复杂性和降低代码维护性，从而成为团队开发的一种阻碍。在微服务系统中一般存在多个服务，服务需要管理相互之间的依赖关系。当系统规模越来越大后，各个业务服务之间的直接依赖和间接依赖关系就会变得十分复杂。我们需要通过一个简洁明了的可视化工具来查看当前服务链路中的依赖关系，Zipkin 就提供了这方面的支持。",-1),k=s("p",null,[n("在 SpringHealth 案例系统中，当我们通过访问 intervention-service 中的 HTTP 端点"),s("a",{href:"http://localhost:5555/springhealth/intervention/interventions/springhealth_admin/device1",target:"_blank",rel:"noreferrer"},"http://localhost:5555/springhealth/intervention/interventions/springhealth_admin/device1"),n("时，下图展示了通过 Zipkin 获取的服务调用依赖关系：")],-1),v=e("",8),m=s("p",null,"Zipkin 可视化服务调用时序的主界面",-1),S=s("p",null,"上图该主界面主体是一个面向查询的操作界面，其中我们需要关注服务名称和端点，因为服务调用链路中的所有服务都会出现在服务名称列表中，同时，针对每个服务，我们也可以选择自身感兴趣的端点信息。同时，我们也发现了多个用于灵活查询的过滤器，包括 TraceId、SpanName、时间访问、调用时长以及标签功能。",-1),C=s("p",null,[n("当然，我们最应该关注的是查询结果。针对某个服务，Zipkin 的查询结果展示了包含该服务的所有调用链路。现在，让我们关注于 user-service 中根据用户名获取用户信息的"),s("a",{href:"http://localhost:5555/springhealth/user/users/username/",target:"_blank",rel:"noreferrer"},"http://localhost:5555/springhealth/user/users/username/"),n("{userName} 端点，Zipkin 上的执行效果图如下所示：")],-1),Z=s("p",null,"Zipkin 服务调用链路明细图界面",-1),b=s("p",null,"当发起这个 HTTP 请求时，该请求会先到达 Zuul 网关，然后再通过路由转发到 userservice。通过观察上图服务之间的调用时序，我们在前面介绍的服务依赖关系的基础上给出了更为明确的服务调用关系。",-1),A=s("p",null,"上图中最重要的就是各个 Span 信息。一个服务调用链路被分解成若干个 Span，每个 Span 代表完整调用链路中的一个可以衡量的部分。我们通过可视化的界面，可以看到整个访问链路的整体时长以及各个 Span 所花费的时间。每个 Span 的时延都已经被量化，并通过背景颜色的深浅来表示时延的大小。注意到这里 userservice 出现了两个 Span，原因在于 userservice 在该请求中还访问了 OAuth2 的授权服务器。",-1),f=s("h4",{id:"可视化服务调用数据",tabindex:"-1"},[n("可视化服务调用数据 "),s("a",{class:"header-anchor",href:"#可视化服务调用数据","aria-label":'Permalink to "可视化服务调用数据"'},"​")],-1),I=s("p",null,'在上图中，我们点击任何一个感兴趣的 Span 就可以获取该 Span 对应的各项服务调用数据明细。例如，我们点击"get /users/username/{username}"这个 Span，Zipkin 会跳转到一个新的页面并显示如下图所示的数据：',-1),T=s("p",null,"Zipkin 中 Span 对应的名称、TraceId 和 SpanId",-1),D=s("p",null,'这里看到了本次调用中用于监控的最重要的元数据 TraceId 和 SpanId，以及代表各个关键事件的 Annotation 可视化长条。点击长条下的"SHOW ALL ANNOTATIONS"按钮，可以得到如下所示的事件明细信息：',-1),N=s("p",null,"Zipkin 中 Span 对应的四个关键事件数据界面",-1),P=s("p",null,"上图展示了针对该 Span 的 cs、sr、ss 和 cr 这四个关键事件数据。对于这个 Span 而言，zuulservice 相当于是 userservice 的客户端，所以 zuulservice 触发了 cs 事件，然后通过 (17.160 -- 2.102)ms 到达了 userservice，以此类推。从这些关键事件数据中可以得出一个结论，即该请求的整个服务响应时间主要取决于 userservice 自身的处理时间。",-1),x=s("p",null,"当然，我们针对这个 Span，也可以获取如所示的标签明细数据：",-1),z=e("",9);function U(w,M,V,j,F,R){const a=t("Image");return o(),i("div",null,[r,p(a,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image2/M01/04/47/Cip5yF_sSf6AO7sOAAAsmdX5mFU432.png"}),n(),u,E,d,p(a,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image2/M01/04/49/CgpVE1_sSgeAKwhCAACtM9bH7wM931.png"}),n(),q,p(a,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image2/M01/04/47/Cip5yF_sShWAETlQAAAyuao3DMc019.png"}),n(),y,h,g,_,k,p(a,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image2/M01/04/49/CgpVE1_sSh2AVJesAAA5oopzibY911.png"}),n(),v,p(a,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image2/M01/04/48/Cip5yF_sSiuAa_zWAABkqhF8VFQ138.png"}),n(),m,S,C,p(a,{alt:"Drawing 5.png",src:"https://s0.lgstatic.com/i/image2/M01/04/48/Cip5yF_sSjOAe2oQAABCtCPP68k747.png"}),n(),Z,b,A,f,I,p(a,{alt:"图片6.png",src:"https://s0.lgstatic.com/i/image/M00/8C/83/CgqCHl_tnS6AQDXdAAGtE02WUpo828.png"}),n(),T,D,p(a,{alt:"Drawing 7.png",src:"https://s0.lgstatic.com/i/image/M00/8C/65/Ciqc1F_sSkWAbGxeAABQkYLlisc594.png"}),n(),N,P,x,p(a,{alt:"Drawing 8.png",src:"https://s0.lgstatic.com/i/image/M00/8C/65/Ciqc1F_sSkyAZfeJAAAwoDw1coE218.png"}),n(),z])}const B=l(c,[["render",U]]);export{L as __pageData,B as default};
