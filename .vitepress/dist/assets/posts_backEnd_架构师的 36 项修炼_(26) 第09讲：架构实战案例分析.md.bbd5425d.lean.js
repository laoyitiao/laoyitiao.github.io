import{_ as i,j as a,o as s,g as c,k as t,h as e,Q as r,s as o}from"./chunks/framework.cfb14fe0.js";const ao=JSON.parse('{"title":"第09讲：架构实战案例分析","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/架构师的 36 项修炼/(26) 第09讲：架构实战案例分析.md","filePath":"posts/backEnd/架构师的 36 项修炼/(26) 第09讲：架构实战案例分析.md","lastUpdated":1696682708000}'),n={name:"posts/backEnd/架构师的 36 项修炼/(26) 第09讲：架构实战案例分析.md"},_=r("",8),p=o("p",null,"分析上图架构。应用端主要是移动端的应用，通过负载均衡访问 Web 服务器集群，也就是前端集群。前端集群是两台 Nginx 服务器组成的，在 Nginx 再进行一次负载均衡，将用户请求分发到一组应用服务器集群。应用服务器集群按照应用场景分为买家系统、卖家系统、供应链系统以及运营系统四个系统集群，每个系统集群又包含了若干台服务器，所有这些系统都连接到一台 MySQL 服务器上。",-1),h=o("h2",{id:"十万级日订单级别架构",tabindex:"-1"},[e("十万级日订单级别架构 "),o("a",{class:"header-anchor",href:"#十万级日订单级别架构","aria-label":'Permalink to "十万级日订单级别架构"'},"​")],-1),d=o("p",null,'但是这样的系统在几千订单的时候运行还算可以，但是在交易比较活跃、并发比较高的时候，系统就会出现各种问题。在上图示例中，当时的市场总监说"我们的交易越忙，你们的系统越出问题，太邪门了。"当时我们也没敢说什么，技术部悄悄对系统做了一次改进和重构，主要优化系统架构方面。优化后的架构如下图。',-1),A=o("br",null,null,-1),u=o("p",null,"主要优化点之一是在前端使用 CDN 服务，这样用户请求的各种静态资源都通过 CDN 服务返回，而所有的商品图片，再通过一个分布式文件系统进行管理。商品图片的上传和浏览，都由分布式文件系统提供。",-1),m=o("p",null,"在应用服务器集群上又加了一个 Redis 集群。我们前面说过，提升应用系统性能的第一个手段就是使用缓存。Redis 集群的使用，包括前面的 CDN 以及分布式文件系统，极大地缓解了系统在访问高峰期的访问压力。同时我们对 MySQL 数据库还做了一次主从复制的分离，构建了一个一主两从的分布式数据库。两个从服务器，一个从服务器用来给应用服务器用来做读操作服务，另一个从服务器做 SQL 数据分析，有时候也会通过 Sqoop 将数据导出到大数据平台上，做大数据计算。",-1),b=o("p",null,"在十万订单的时候，除了系统交易本身的压力比较大，公司对数据的处理的要求也比较高。除了各种各样的统计分析、竞对分析，还有各市场大区的绩效、具体到每个人的绩效都需要进行统计计算，所以专门搭建了一个大数据平台。在大数据平台上，根据业务数据进行统计分析和运营预测，还根据运营数据进行绩效考核。大数据平台上的数据一部分来自于应用服务器，通过消息队列 Kafka 导入到大数据平台，另一部分数据是来自于 MySQL 从数据库导入到大数据平台。通过这样一次系统重构，系统可以满足十万级日订单的访问压力。",-1),S=o("h2",{id:"百万级日订单级别架构",tabindex:"-1"},[e("百万级日订单级别架构 "),o("a",{class:"header-anchor",href:"#百万级日订单级别架构","aria-label":'Permalink to "百万级日订单级别架构"'},"​")],-1),g=o("p",null,"但是随着业务的进一步的发展，系统的订单量还在快速增长，这时候主要的挑战来自于两个方面。一个方面是随着订单的增长，业务也变得越来越复杂，开发新的功能变得越来越困难，系统的基本功能维护也越来越困难。另一个方面是，虽然经过了主从分离以及部署了多种缓存以后，高峰期的数据访问压力也可以承受了，但是数据库的存储空间难以满足要求。对于一个日订单百万级的系统，年订单量就是数亿，这样大的数据库存储对于 MySQL 而言是难以承受的。",-1),w=o("p",null,"所以我们对系统进行了进一步的重构。这次重构主要是两个方面，如下图。",-1),D=r("",15),F=o("p",null,"Doris 的整体架构包括三个部分。",-1),f=o("ol",null,[o("li",null,[o("p",null,"客户端。Doris 给应用程序提供一个客户端的 SDK 包，客户端可以使用 Doris SDK 进行分布式的数据读写操作，Doris 支持存储 Key Value 这样的 KV 数据结构，跟缓存一样。客户端一方面连接 Doris 集群的控制中心 Administration，从控制中心获得配置信息，主要是获得服务器集群的地址端口、角色等配置信息，另一方面获得路由算法信息。")]),o("li",null,[o("p",null,"Administration。可以通过控制台进行集群的故障管理和扩容管理。")]),o("li",null,[o("p",null,"Data Server 数据存储。Data Server 也是真正的分布式数据存储的地方，Doris 对数据进行分片存储的。根据集群规模、配置信息和算法进行路由计算，计算每个 KV 应该存储的的 Data Server 服务器。Data Server 服务器也和 Administration 服务器进行通信，报告自己的健康状况。应用程序的 KV Client 与 Administration 之间的通讯，只包括配置或者控制信息的通信，不会进行数据通讯，也就是说真正的数据读写操作，只会在 Client 和 Data Server 之间，不需要通过 Administration 进行数据代理。")])],-1),P=o("h2",{id:"doris-数据分区架构与分区算法",tabindex:"-1"},[e("Doris 数据分区架构与分区算法 "),o("a",{class:"header-anchor",href:"#doris-数据分区架构与分区算法","aria-label":'Permalink to "Doris 数据分区架构与分区算法"'},"​")],-1),T=o("p",null,"来看一下 Doris 比较有特点的核心架构设计。Doris 采用路由算法设计，也就是 Doris 的分区算法设计，如下图。",-1),k=o("p",null,"前面课时2的缓存部分中，提到路由分区的几种典型的算法，包括余数哈希以及一致性哈希算法等，其中一致性哈希算法有个重要的特点是使用了虚拟节点进行计算。而 Doris 则创造了一种余数哈希和虚拟节点相结合的哈希算法，如上图所示，也就是在 key 进行路由计算的时候，先针对虚拟节点进行一次余数哈希。这个时候会对一个较大的数进行取模，比如说 10万，对 10万 进行取模，计算得到一个虚拟节点。",-1),C=o("p",null,"然后对虚拟节点和物理节点进行一次关系映射，根据虚拟节点与物理节点之间的关系进行查找，寻找到真正要访问的物理节点，再将数据写入到这台物理服务器上。这种分区算法的设计，相比于一致性哈希有更好的负载平衡特性。",-1),x=o("p",null,"也就是说 key 在不同的物理服务器上的分布更加均衡，同时也更便于进行集群扩容，因为当添加新的物理服务器的时候，如上图右边部分所示，只需要修改虚拟节点和物理服务器之间的映射关系就可以了，将一部分虚拟节点的映射调整到新的物理服务器上。比如说我们加了一个新的物理节点 PN3，那么我们把虚拟节点 VN3 和 VN6 两个虚拟节点的映射调整到 PN3 上，因此这种算法也能够实现和一致性哈希一样的效果，就是添加服务器的时候只影响一小部分数据。",-1),M=o("p",null,"同时这种算法在运维上有一个更大的好处，就是集群扩容的时候，运维调整可以按照虚拟节点进行调整，因为是以虚拟节点为单位重新映射到新的物理节点上。如果存储的时候就是按照虚拟节点为单位进行的存储，比如说一个虚拟节点一个文件，那么进行集群扩容的时候，只需要将虚拟节点对应的文件拷贝到新的服务器上，就可以实现集群扩容了。",-1),V=o("h2",{id:"doris-调用时序",tabindex:"-1"},[e("Doris 调用时序 "),o("a",{class:"header-anchor",href:"#doris-调用时序","aria-label":'Permalink to "Doris 调用时序"'},"​")],-1),q=o("p",null,"接下来看 Doris 调用时序图，如下图。",-1),B=o("p",null,"Doris 调用时序是指，Doris 在架构上，为了保证高可用，将所有的服务器分为多个组，这个组在 Doris 内部也被称为序列，每个序列存储一份数据，数据在写入的时候，每次都在不同的分组，也就是在不同的序列上进行存储，这样保证数据有多个备份存储，保证数据的高可用。",-1),N=o("p",null,"如上图所示，包含有 Doris 客户端 SDK 的应用服务器，先通过 SDK 访问管理中心服务器 Administration 获取集群的信息，以及获取应用的级别，应用的级别决定了数据要写多少个备份，示例中写两个备份，也就是将所有服务器分为两个序列。",-1),v=o("p",null,"SDK 根据这些信息以及刚才的路由算法，进行路由计算，计算在每个分组序列的服务器集群上要访问哪一台服务器。根据计算出来的结果，在每个序列中访问对应的服务器，比如说当前的可用性级别是 2，那么就访问这两个序列中的两台服务器，分别对每个序列中的每台服务器进行并发的数据写入，保证数据至少有两个备份存储。",-1),K=o("h2",{id:"doris-高可用架构",tabindex:"-1"},[e("Doris 高可用架构 "),o("a",{class:"header-anchor",href:"#doris-高可用架构","aria-label":'Permalink to "Doris 高可用架构"'},"​")],-1),I=o("p",null,"再看 Doris 的高可用架构，如下图。",-1),E=r("",11),Q=r("",6),U=o("p",null,"上图中，左边是系统吞吐量的性能对比图。红色是使用 Flower 重构后的 TPS 吞吐曲线。蓝色是重构前的阻塞式编程得到的系统的吞吐量特性。我们看到，重构以后 Flower 的吞吐能力是重构前的吞吐能力的两倍。",-1),L=o("p",null,"上图右边这幅图是响应时间对比图。可以看到 Flower 同样表现出较为优异的响应时间特性，特别是在高并发的情况下，越是高并发，Flower 的性能优势越是明显。那么 Flower 是如何显著地提升系统特性的呢？",-1),R=o("h2",{id:"flower-提升系统性能原理",tabindex:"-1"},[e("Flower 提升系统性能原理 "),o("a",{class:"header-anchor",href:"#flower-提升系统性能原理","aria-label":'Permalink to "Flower 提升系统性能原理"'},"​")],-1),y=o("p",null,"如下图，我们看一下 Flower 和传统的阻塞式编程的应用程序运行时有什么不同。",-1),O=r("",9),W=o("p",null,'如上图所示，一个 Actor 向另一个 Actor 进行通讯的时候，当前 Actor 就是一个消息的发送者 Sender，当它想要向另一个 Actor 进行通讯的时候，需要获得另一个 Actor 的 ActorRef，也就是一个"引用"，通过"引用"进行消息通信。而 ActorRef 收到消息以后，会将这个消息放入到 Actor 的 Mailbox 里面去，然后就立即返回了。也就是说一个 Actor 向另一个 Actor 发送消息的时候，不需要另一个 Actor 去真正处理这个消息，只需要将消息发送到目标 Actor 的邮箱 Mailbox 里面就可以了，自己不会被堵塞，可以继续执行自己的操作。而目标 Actor 检查自己的 Mailbox 中是否有消息，如果有消息， Actor 则会从 Mailbox 里面去获取自己消息，之后对消息进行异步的处理，而所有的 Actor 会共享一些线程，这些线程不会有任何的阻塞。',-1),G=o("h2",{id:"flower-核心模块架构",tabindex:"-1"},[e("Flower 核心模块架构 "),o("a",{class:"header-anchor",href:"#flower-核心模块架构","aria-label":'Permalink to "Flower 核心模块架构"'},"​")],-1),H=o("p",null,"如上述，Flower 的核心模块主要是基于 Actor 进行封装的。",-1),J=o("p",null,"每个 Service 会被封装在一个 Actor 里面，然后 Service 可以通过可视化的流程编排进行消息的传送，实现异步非阻塞的调用。下面是 Flower 核心模块的架构图。",-1),Y=o("br",null,null,-1),$=o("h2",{id:"flower-分布式架构",tabindex:"-1"},[e("Flower 分布式架构 "),o("a",{class:"header-anchor",href:"#flower-分布式架构","aria-label":'Permalink to "Flower 分布式架构"'},"​")],-1),X=o("p",null,"同时 Actor 还支持分布式开发，如下图所示，Flower 的 Service 可以远程部署到一个 Service 容器里面，就像我们现在常用的微服务架构一样。Flower 会提供一个独立的 Flower 容器，用于启动一些 Service，这些 Service 在启动以后会向注册中心进行注册，而应用程序可以将这些 Service 进行流程编排，得到一个分布式非阻塞的微服务系统。整体架构和我们课时5讨论的微服务架构很像，主要的区别就是 Flower 的服务是异步的，通过流程编排的方式进行服务调用，而不是接口的方式进行调用。",-1),Z=r("",7);function j(z,oo,eo,lo,to,ro){const l=a("Image");return s(),c("div",null,[_,t(l,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/A3/4B/CgotOV2-U0mAF53OAAINSMa5La8843.png"}),e(),p,h,d,t(l,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/A3/2B/CgoB5l2-U0mAZNLbAAJoBiLgC_k168.png"}),e(),A,u,m,b,S,g,w,t(l,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/A3/4B/CgotOV2-U0mASlTuAALexN14sdY634.png"}),e(),D,t(l,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/A3/2B/CgoB5l2-U0qANU5NAAOpllJww24954.png"}),e(),F,f,P,T,t(l,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/A3/4B/CgotOV2-U0qABHM-AAJIWbX_Tr4770.png"}),e(),k,C,x,M,V,q,t(l,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/A3/2B/CgoB5l2-U0qAbYcRAAEW8VNNGkQ788.png"}),e(),B,N,v,K,I,t(l,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/A3/4B/CgotOV2-U0qAcdbEAAGN2uR0aBc651.png"}),e(),E,t(l,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/A3/2B/CgoB5l2-U0uAQrFPAADbAQumXdo339.png"}),e(),Q,t(l,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/A3/4B/CgotOV2-U0uALMZVAAEma3KG84Q391.png"}),e(),U,L,R,y,t(l,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/A3/2B/CgoB5l2-U0uADqCVAAHxXOH0DP8643.png"}),e(),O,t(l,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/A3/4B/CgotOV2-U0uAOtWMAACmhYolP1Q924.png"}),e(),W,G,H,J,t(l,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/A3/2B/CgoB5l2-U0yAUlqjAAE9YZct6lI506.png"}),e(),Y,$,X,t(l,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/A3/4B/CgotOV2-U0yAc_PTAAE6c4Wbk3E108.png"}),e(),Z])}const so=i(n,[["render",j]]);export{ao as __pageData,so as default};
