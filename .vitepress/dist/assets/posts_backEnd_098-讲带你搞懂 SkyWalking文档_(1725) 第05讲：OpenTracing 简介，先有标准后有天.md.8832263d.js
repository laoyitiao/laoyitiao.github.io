import{_ as p,j as o,o as s,g as r,k as e,h as n,s as a,Q as l}from"./chunks/framework.4e7d56ce.js";const v=JSON.parse('{"title":"第05讲：OpenTracing简介，先有标准后有天","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/098-讲带你搞懂 SkyWalking文档/(1725) 第05讲：OpenTracing 简介，先有标准后有天.md","filePath":"posts/backEnd/098-讲带你搞懂 SkyWalking文档/(1725) 第05讲：OpenTracing 简介，先有标准后有天.md","lastUpdated":1696682708000}'),i={name:"posts/backEnd/098-讲带你搞懂 SkyWalking文档/(1725) 第05讲：OpenTracing 简介，先有标准后有天.md"},g=a("h1",{id:"第05讲-opentracing简介-先有标准后有天",tabindex:"-1"},[n("第05讲：OpenTracing简介，先有标准后有天 "),a("a",{class:"header-anchor",href:"#第05讲-opentracing简介-先有标准后有天","aria-label":'Permalink to "第05讲：OpenTracing简介，先有标准后有天"'},"​")],-1),c=a("p",null,"自从 Google Dapper 的论文发布之后，各大互联网公司和开源社区开发的分布式链路追踪产品百花齐放，同时也给使用者带来了一个问题，各个分布式链路追踪产品的 API 并不兼容，如果用户在各个产品之间进行切换，成本非常高。",-1),_=a("br",null,null,-1),S=a("p",null,"而 OpenTracing 就完美的解决了这个问题，OpenTracing 通过提供平台无关、厂商无关的 API，帮助开发人员能够方便地添加（或更换）追踪系统。",-1),h=a("h1",{id:"trace-简介",tabindex:"-1"},[n("Trace 简介 "),a("a",{class:"header-anchor",href:"#trace-简介","aria-label":'Permalink to "Trace 简介"'},"​")],-1),d=a("p",null,"一个 Trace 代表一个事务、请求或是流程在分布式系统中的执行过程。OpenTracing 中的一条 Trace 被认为是一个由多个 Span 组成的有向无环图（ DAG 图），一个 Span 代表系统中具有开始时间和执行时长的逻辑单元，Span 一般会有一个名称，一条 Trace 中 Span 是首尾连接的。",-1),u=a("br",null,null,-1),T=a("br",null,null,-1),b=a("p",null,"上图展示了分布式系统中一次客户端请求的全过程，虽然这种可视化图形对于查看各组件的组合关系是有用的，但是它不能很好显示组件的调用时间、先后关系、是串行还是并行等信息，如果想要展现更复杂的调用关系，该图会更加复杂。",-1),m=a("br",null,null,-1),C=a("p",null,"如果将此次客户端请求的处理流程看作一条 Trace，其中每一次调用，无论是 HTTP 调用、RPC 调用、存储访问还是我们比较关注的本地方法调用，都可以成为一个 Span，通常如下图所示：",-1),x=a("br",null,null,-1),A=l('<br><p>图中每个色块都是一个 Span，我们可以清晰的看到，请求在进入后端 load balancer 之后，首先会调用 authorization 服务处理，然后调用 billing 服务处理，最后执行 resource 服务，其中 container start-up 和 storage allocation 两步操作是并行执行的。</p><h1 id="span-简介" tabindex="-1">Span 简介 <a class="header-anchor" href="#span-简介" aria-label="Permalink to &quot;Span 简介&quot;">​</a></h1><p>Span 代表系统中具有开始时间和执行时长的逻辑单元，Span 之间通过嵌套或者顺序排列建立逻辑因果关系。</p><br><p>每个 Span 中可以包含以下的信息：</p><ul><li><p><strong>操作名称</strong>：例如访问的具体 RPC 服务，访问的 URL 地址等；</p></li><li><p><strong>起始时间</strong> <strong>；</strong></p></li><li><p><strong>结束时间</strong> <strong>；</strong></p></li><li><p><strong>Span Tag</strong>：一组键值对构成的 Span 标签集合，其中键必须为字符串类型，值可以是字符串、bool 值或者数字；</p></li><li><p><strong>Span Log</strong>：一组 Span 的日志集合；</p></li><li><p><strong>SpanContext</strong> ：Trace 的全局上下文信息；</p></li><li><p><strong>References</strong>：Span 之间的引用关系，下面详细说明 Span 之间的引用关系；</p></li></ul><p>在一个 Trace 中，一个 Span 可以和一个或者多个 Span 间存在因果关系。目前，OpenTracing 定义了 ChildOf 和 FollowsFrom 两种 Span 之间的引用关系。这两种引用类型代表了子节点和父节点间的直接因果关系。</p><ul><li><p><strong>ChildOf 关系</strong> **：**一个 Span 可能是一个父级 Span 的孩子，即为 ChildOf 关系。下面这些情况会构成 ChildOf 关系：</p><ul><li><p>一个 HTTP 请求之中，被调用的服务端产生的 Span，与发起调用的客户端产生的 Span，就构成了 ChildOf 关系；</p></li><li><p>一个 SQL Insert 操作的 Span，和 ORM 的 save 方法的 Span 构成 ChildOf 关系。</p></li></ul></li></ul><br><p>很明显，上述 ChildOf 关系中的父级 Span 都要等待子 Span 的返回，子 Span 的执行时间影响了其所在父级 Span 的执行时间，父级 Span 依赖子 Span 的执行结果。除了串行的任务之外，我们的逻辑中还有很多并行的任务，它们对应的 Span 也是并行的，这种情况下一个父级 Span 可以合并所有子 Span 的执行结果并等待所有并行子 Span 结束。</p><br><p>下图展示了上述两种 ChildOf 关系 的 Span：</p><br>',14),O=a("br",null,null,-1),f=a("ul",null,[a("li",null,[a("strong",null,"FollowsFrom 关系"),n(" **：**在分布式系统中，一些上游系统（父节点）不以任何方式依赖下游系统（子节点）的执行结果，例如，上游系统通过消息队列向下游系统发送消息。这种情况下，下游系统对应的子 Span 和上游系统对应的父级 Span 之间是 FollowsFrom 关系。下图展示了一些可能的 FollowsFrom 关系：")])],-1),I=a("br",null,null,-1),k=a("br",null,null,-1),F=a("p",null,"下面的示例 Trace 是由 8 个 Span 组成，其中 Span A 和 Span C 之间是 ChildOf 关系，Span F 和 Span G 之间是 FollowsFrom 关系：",-1),P=a("br",null,null,-1),B=a("h1",{id:"logs-简介",tabindex:"-1"},[n("Logs 简介 "),a("a",{class:"header-anchor",href:"#logs-简介","aria-label":'Permalink to "Logs 简介"'},"​")],-1),E=a("p",null,[n("每个 Span 可以进行多次 Logs 操作，每一次 Logs 操作，都需要带一个时间戳，以及一个可选的附加信息。在前文搭建的环境中，请求 "),a("a",{href:"http://localhost:8000/err",target:"_blank",rel:"noreferrer"},"http://localhost:8000/err"),n(" 得到的 Trace 中就会通过 Logs 记录异常堆栈信息，如下图所示，其中不仅包括异常的堆栈信息，还包括了一些说明性的键值对信息：")],-1),L=a("br",null,null,-1),q=a("h1",{id:"tags-简介",tabindex:"-1"},[n("Tags 简介 "),a("a",{class:"header-anchor",href:"#tags-简介","aria-label":'Permalink to "Tags 简介"'},"​")],-1),V=a("p",null,"每个 Span 可以有多个键值对形式的 Tags，Tags 是没有时间戳的，只是为 Span 添加一些简单解释和补充信息。下图展示了前文示例中 Tags 的信息：",-1),z=a("br",null,null,-1),D=l('<h1 id="spancontext-和-baggage" tabindex="-1">SpanContext 和 Baggage <a class="header-anchor" href="#spancontext-和-baggage" aria-label="Permalink to &quot;SpanContext 和 Baggage&quot;">​</a></h1><p>SpanContext 表示进程边界，在跨进调用时需要将一些全局信息，例如，TraceId、当前 SpanId 等信息封装到 Baggage 中传递到另一个进程（下游系统）中。</p><br><p>Baggage 是存储在 SpanContext 中的一个键值对集合。它会在一条 Trace 中全局传输，该 Trace 中的所有 Span 都可以获取到其中的信息。</p><br><p>需要注意的是，由于 Baggage 需要跨进程全局传输，就会涉及相关数据的序列化和反序列化操作，如果在 Baggage 中存放过多的数据，就会导致序列化和反序列化操作耗时变长，使整个系统的 RPC 的延迟增加、吞吐量下降。</p><br><p>虽然 Baggage 与 Span Tags 一样，都是键值对集合，但两者最大区别在于 Span Tags 中的信息不会跨进程传输，而 Baggage 需要全局传输。因此，OpenTracing 要求实现提供 Inject 和 Extract 两种操作，SpanContext 可以通过 Inject 操作向 Baggage 中添加键值对数据，通过 Extract 从 Baggage 中获取键值对数据。</p><h1 id="核心接口语义" tabindex="-1">核心接口语义 <a class="header-anchor" href="#核心接口语义" aria-label="Permalink to &quot;核心接口语义&quot;">​</a></h1><p>OpenTracing 希望各个实现平台能够根据上述的核心概念来建模实现，不仅如此，OpenTracing 还提供了核心接口的描述，帮助开发人员更好的实现 OpenTracing 规范。</p><ul><li><strong>Span 接口</strong></li></ul><p>Span接口必须实现以下的功能：</p><ul><li><p><strong>获取关联的 SpanContext</strong>：通过 Span 获取关联的 SpanContext 对象。</p></li><li><p><strong>关闭（Finish）Span</strong>：完成已经开始的 Span。</p></li><li><p><strong>添加 Span Tag</strong>：为 Span 添加 Tag 键值对。</p></li><li><p>**添加 Log：**为 Span 增加一个 Log 事件。</p></li><li><p>**添加 Baggage Item：**向 Baggage 中添加一组键值对。</p></li><li><p>**获取 Baggage Item：**根据 Key 获取 Baggage 中的元素。</p></li><li><p><strong>SpanContext 接口</strong></p></li></ul><p>SpanContext 接口必须实现以下功能，用户可以通过 Span 实例或者 Tracer 的 Extract 能力获取 SpanContext 接口实例。</p><ul><li><p><strong>遍历 Baggage 中全部的 KV</strong>。</p></li><li><p><strong>Tracer 接口</strong></p></li></ul><p>Tracer 接口必须实现以下功能：</p><ul><li><p>**创建 Span：**创建新的 Span。</p></li><li><p><strong>注入 SpanContext</strong>：主要是将跨进程调用携带的 Baggage 数据记录到当前 SpanContext 中。</p></li><li><p><strong>提取 SpanContext</strong> ，主要是将当前 SpanContext 中的全局信息提取出来，封装成 Baggage 用于后续的跨进程调用。</p></li></ul><h1 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h1><p>本课时主要介绍了 Trace、Span、Logs、Tags、SpanContext 等 OpenTracing 规范的核心概念，还介绍了 OpenTracing 规范定义的核心接口的功能。SkyWalking 作为 OpenTracing 的实现之一，了解 OpenTracing 的核心概念可以更好的帮助理解 SkyWalking 的实现。</p>',19);function M(R,N,y,W,w,G){const t=o("Image");return s(),r("div",null,[g,c,_,S,h,d,u,e(t,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/77/FE/Cgq2xl5zIEeAIG1BAABPpgHQZkc045.png"}),n(),T,b,m,C,x,e(t,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/77/FD/CgpOIF5zIEeAHos0AAAZLZRufhU976.png"}),n(),A,e(t,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/77/FD/CgpOIF5zIEeANSJ1AAAvjIyS4ac173.png"}),n(),O,f,I,e(t,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/77/FE/Cgq2xl5zIEeAP7J6AAAieIn1LW8813.png"}),n(),k,F,P,e(t,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/77/FD/CgpOIF5zIEiACY7bAAHw5sz9rVs412.png"}),n(),B,E,L,e(t,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/77/FE/Cgq2xl5zIEiAGoMzAAVtWur3mGc633.png"}),n(),q,V,z,e(t,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/77/FD/CgpOIF5zIEiAOAr-AAH8CUUmFf8447.png"}),n(),D])}const U=p(i,[["render",M]]);export{v as __pageData,U as default};
