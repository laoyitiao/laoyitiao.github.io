import{_ as n,j as r,o as _,g as l,k as a,h as o,Q as s,s as e}from"./chunks/framework.4e7d56ce.js";const L=JSON.parse('{"title":"第22讲：基于ZooKeeper命名服务的应用：分布式ID生成器","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/ZooKeeper源码分析与实战_文档/(3152) 第22讲：基于 ZooKeeper 命名服务的应用：分布式 ID 生成器.md","filePath":"posts/backEnd/ZooKeeper源码分析与实战_文档/(3152) 第22讲：基于 ZooKeeper 命名服务的应用：分布式 ID 生成器.md","lastUpdated":1696682708000}'),p={name:"posts/backEnd/ZooKeeper源码分析与实战_文档/(3152) 第22讲：基于 ZooKeeper 命名服务的应用：分布式 ID 生成器.md"},D=s("",5),i=s("",13),I=e("p",null,"在接收一段 ID 编码后，客户端会将该编码存储在内存中。在本机需要使用 ID 编码时，会首先使用内存中的 ID 编码。如果内存中的 ID 编码已经完全被占用，则再重新向编码服务器获取。",-1),c=e("p",null,"在 TDDL 框架的内部实现中，通过分批获取 ID 编码的方式，减少了客户端访问服务器的频率，避免了网络波动所造成的影响，并减轻了服务器的内存压力。不过 TDDL 是高度依赖底层数据库的实现方式，不能作为一个独立的分布式 ID 生成器对外提供服务。",-1),d=e("h3",{id:"实现方式",tabindex:"-1"},[o("实现方式 "),e("a",{class:"header-anchor",href:"#实现方式","aria-label":'Permalink to "实现方式"'},"​")],-1),h=e("p",null,"上面介绍的几种策略，有的和底层编码耦合比较大，有的又局限在某一具体的使用场景下，并不满足作为分布式环境下一个公共 ID 生成器的要求。接下来我们就利用目前学到的 ZooKeeper 知识，动手实现一个真正的分布式 ID 生成器。",-1),g=e("p",null,[o("首先，我们通过 ZooKeeper 自身的客户端和服务器运行模式，来实现一个分布式网络环境下的 ID 请求和分发过程。"),e("strong",null,"每个需要 ID 编码的业务服务器可以看作是 ZooKeeper 的客户端"),o("。ID 编码生成器可以作为 ZooKeeper 的服务端。客户端通过发送请求到 ZooKeeper 服务器，来获取编码信息，服务端接收到请求后，发送 ID 编码给客户端。")],-1),u=e("p",null,"在代码层面的实现中，如上图所示。我们可以利用 ZooKeeper 数据模型中的顺序节点作为 ID 编码。客户端通过调用 create 函数创建顺序节点。服务器成功创建节点后，会响应客户端请求，把创建好的节点信息发送给客户端。客户端用数据节点名称作为 ID 编码，进行之后的本地业务操作。",-1),m=e("p",null,"通过上面的介绍，我们发现，使用 ZooKeeper 实现一个分布式环境下的公用 ID 编码生成器很容易。利用 ZooKeeper 中的顺序节点特性，很容易使我们创建的 ID 编码具有有序的特性。并且我们也可以通过客户端传递节点的名称，根据不同的业务编码区分不同的业务系统，从而使编码的扩展能力更强。",-1),k=e("p",null,[o("虽然使用 ZooKeeper 的实现方式有这么多优点，但也会有一些潜在的问题。其中最主要的是，"),e("strong",null,"在定义编码的规则上还是强烈依赖于程序员自身的能力和对业务的深入理解"),o("。很容易出现因为考虑不周，造成设置的规则在运行一段时间后，无法满足业务要求或者安全性不够等问题。为了解决这个问题，我们继续学习一个比较常用的编码算法------snowflake 算法。")],-1),f=e("h4",{id:"snowflake-算法",tabindex:"-1"},[o("snowflake 算法 "),e("a",{class:"header-anchor",href:"#snowflake-算法","aria-label":'Permalink to "snowflake 算法"'},"​")],-1),Z=e("p",null,"snowflake 算法是 Twitter 公司开源的一种用来生成分布式 ID 编码的算法。如下图所示，通过 snowflake 算法生成的编码是一个 64 位的长整型值。在 snowflake 算法中，是通过毫秒数、机器 ID",-1),K=e("p",null,"毫秒流水号、符号位这几个元素生成最终的编码。",-1),T=e("p",null,"在计算编码的过程中，首先获取机器的毫秒数，并存储为 41 位，之后查询机器的工作 ID，存储在后面的 10 位字节中。剩余的 12 字节就用来存储毫秒内的流水号和表示位符号值 0。",-1),b=e("p",null,[o("从图中可以看出，"),e("strong",null,"snowflake 算法最主要的实现手段就是对二进制数位的操作"),o("。从性能上说，这个算法理论上每秒可以生成 400 多万个 ID 编码，完全满足分布式环境下，对系统高并发的要求。因此，在平时的开发过程中，也尽量使用诸如 snowflake 这种业界普遍采用的分布式 ID 生成算法，避免自己闭门造车导致的性能或安全风险。")],-1),A=e("h3",{id:"总结",tabindex:"-1"},[o("总结 "),e("a",{class:"header-anchor",href:"#总结","aria-label":'Permalink to "总结"'},"​")],-1),U=e("p",null,[o("通过本课时的学习，我们掌握了什么是分布式的 ID 生成器，以及如何利用 ZooKeeper 实现一个 ID 生成器。ID 编码作为一个标识符，具有全局唯一的特性。利用这种特性，我们可以在分布式系统下实现很多功能，比如数据库的分区符号以及商城订单编号等。注意，在分布式等复杂的应用环境中，要设计一个编码生成器，我们需要考虑生成编码的"),e("strong",null,"唯一性、安全性、递增性以及扩展性。")],-1),q=e("p",null,"在本节课中，我们通过 ZooKeeper 实现了一个编码生成器，其主要原理是利用数据模型中顺序节点的特性。在具体的实现中也比较简单，并没有使用特定的算法实现 ID 编码。",-1),w=e("p",null,"这里给你留一个作业：结合上面介绍的 snowflake 算法，实现一个更加高效的编码服务器。",-1);function P(x,C,S,E,M,N){const t=r("Image");return _(),l("div",null,[D,a(t,{alt:"1.png",src:"https://s0.lgstatic.com/i/image/M00/34/29/CgqCHl8RWyyAP_5_AACcEDVnsPc537.png"}),o(),i,a(t,{alt:"2.png",src:"https://s0.lgstatic.com/i/image/M00/34/1E/Ciqc1F8RWzqAT1UwAACcwktuN0M073.png"}),o(),I,c,d,h,g,a(t,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image/M00/34/18/CgqCHl8RTBGAB7QNAAAvwu3rspw007.png"}),o(),u,m,k,f,Z,K,a(t,{alt:"3.png",src:"https://s0.lgstatic.com/i/image/M00/34/1E/Ciqc1F8RW0aAMpWeAACkxZm34vQ563.png"}),o(),T,b,A,U,q,w])}const v=n(p,[["render",P]]);export{L as __pageData,v as default};
