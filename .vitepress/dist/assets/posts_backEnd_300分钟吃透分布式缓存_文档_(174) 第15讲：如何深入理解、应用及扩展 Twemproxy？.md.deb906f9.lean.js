import{_ as a,j as p,o as l,g as n,k as r,h as o,Q as s,s as e}from"./chunks/framework.4e7d56ce.js";const X=JSON.parse('{"title":"第15讲：如何深入理解、应用及扩展Twemproxy？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/300分钟吃透分布式缓存_文档/(174) 第15讲：如何深入理解、应用及扩展 Twemproxy？.md","filePath":"posts/backEnd/300分钟吃透分布式缓存_文档/(174) 第15讲：如何深入理解、应用及扩展 Twemproxy？.md","lastUpdated":1696682708000}'),c={name:"posts/backEnd/300分钟吃透分布式缓存_文档/(174) 第15讲：如何深入理解、应用及扩展 Twemproxy？.md"},i=s("",7),m=e("p",null,"应用前端在请求缓存数据时，直接访问 Twemproxy 的对应端口，然后 Twemproxy 解析命令得到 key，通过 hash 计算后，按照分布策略，将 key 路由到后端资源的分片。在后端资源响应后，再将响应结果返回给对应的 client。",-1),_=e("p",null,"在系统运行中，Twemproxy 会自动维护后端资源服务的状态。如果后端资源服务异常，会自动进行剔除，并定期探测，在后端资源恢复后，再对缓存节点恢复正常使用。",-1),h=e("h6",{id:"组件架构",tabindex:"-1"},[o("组件架构 "),e("a",{class:"header-anchor",href:"#组件架构","aria-label":'Permalink to "组件架构"'},"​")],-1),d=e("p",null,"Twemproxy 是基于 epoll 事件驱动模型开发的，架构如下图所示。它是一个单进程、单线程组件。核心进程处理所有的事件，包括网络 IO，协议解析，消息路由等。Twemproxy 可以监听多个端口，每个端口接受并处理一个业务的缓存请求。Twemproxy 支持 Redis、Memcached 协议，支持一致性 hash 分布、取模分布、随机分布三种分布方案。Twemproxy 通过 YAML 文件进行配置，简单清晰，且便于人肉读写。",-1),x=e("p",null,"Twemproxy 与后端资源通过单个长连接访问，在收到业务大量并发请求后，会通过 pipeline 的方式，将多个请求批量发到后端。在后端资源持续访问异常时，Twemproxy 会将其从正常列表中剔除，并不断探测，待其恢复后再进行请求的路由分发。",-1),T=e("p",null,"Twemproxy 运行中，会持续产生海量请求及响应的消息流，于是开发者精心设计了内存管理机制，尽可能的减少内存分配和复制，最大限度的提升系统性能。Twemproxy 内部，请求和响应都是一个消息，而这个消息结构体，以及消息存放数据的缓冲都是重复使用的，避免反复分配和回收的开销，提升消息处理的性能。为了解决短连接的问题，Twemproxy 的连接也是复用的，这样在面对 PHP client 等短连接访问时，也可以反复使用之前分配的 connection，提升连接性能。",-1),w=e("p",null,"另外，Twemproxy 对消息还采用了 zero copy（即零拷贝）方案。对于请求消息，只在client 接受时读取一次，后续的解析、处理、转发都不进行拷贝，全部共享最初的那个消息缓冲。对于后端的响应也采用类似方案，只在接受后端响应时，读取到消息缓冲，后续的解析、处理及回复 client 都不进行拷贝。通过共享消息体及消息缓冲，虽然 Twemproxy 是单进程/单线程处理，仍然可以达到 6~8w 以上的 QPS。",-1),y=e("h6",{id:"twemproxy-请求及响应",tabindex:"-1"},[o("Twemproxy 请求及响应 "),e("a",{class:"header-anchor",href:"#twemproxy-请求及响应","aria-label":'Permalink to "Twemproxy 请求及响应"'},"​")],-1),u=e("p",null,"接下来看一下 Twemproxy 是如何进行请求路由及响应的。",-1),g=e("p",null,"Twemproxy 监听端口，当有 client 连接进来时，则 accept 新连接，并构建初始化一个 client_conn。当建连完毕，client 发送数据到来时，client_conn 收到网络读事件，则从网卡读取数据，并记入请求消息的缓冲中。读取完毕，则开始按照配置的协议进行解析，解析成功后，就将请求 msg 放入到 client_conn 的 out 队列中。接下来，就对解析的命令 key 进行 hash 计算，并根据分布算法，找到对应 server 分片的连接，即一个 server_conn 结构体，如下图。",-1),A=e("p",null,"如果 server_conn的 in 队列为空，首先对 server_conn 触发一个写事件。然后将 req msg 存入到 server_conn 的 in 队列。Server_conn 在处理写事件时，会对 in 队列中的 req msg 进行聚合，按照 pipeline 的方式批量发送到后端资源。待发送完毕后，将该条请求 msg 从 server_conn 的 in 队列删除，并插入到 out 队列中。",-1),M=e("p",null,"后端资源服务完成请求后，会将响应发送给 Twemproxy。当响应到 Twemproxy 后，对应的 server_conn 会收到 epoll 读事件，则开始读取响应 msg。响应读取并解析后，会首先将server_conn 中，out 队列的第一个 req msg 删除，并将这个 req msg 和最新收到的 rsp msg 进行配对。在 req 和 rsp 匹配后，触发 client_conn 的写事件，如下图。",-1),C=s("",14),b=e("p",null,"而 worker 进程，基于自己独立的 event_base，管理从 master 调度给自己的所有 client 连接。在 client 发送网络请求到达时，进行命令读取、解析，并在进程内的 IO 队列流转，最后将请求打包，pipeline 给后端的 server。",-1),v=e("p",null,"在 server 处理完毕请求，发回响应时。对应 worker 进程，会读取并解析响应，然后批量回复给 client。",-1),P=e("p",null,"通过多进程改造，Twemproxy 的 QPS 可以从 8w 提升到 40w+。业务访问时，需要部署的Twemproxy 的实例数会大幅减少，运维会更加简洁。",-1),k=e("h6",{id:"增加负载均衡",tabindex:"-1"},[o("增加负载均衡 "),e("a",{class:"header-anchor",href:"#增加负载均衡","aria-label":'Permalink to "增加负载均衡"'},"​")],-1),S=e("p",null,"对于多个 Twemproxy 访问，如何进行负载均衡的问题。一般有三种方案。",-1),f=e("p",null,"第一种方案，是在 Twemproxy 和业务访问端之间，再增加一组 LVS，作为负载均衡层，通过 LVS 负载均衡层，你可以方便得增加或减少 Twemproxy 实例，由 LVS 负责负载均衡和请求分发，如下图。",-1),q=e("p",null,"第二种方案，是将 Twemproxy 的 IP 列表加入 DNS。业务 client 通过域名来访问 Twemproxy，每次建连时，DNS 随机返回一个 IP，让连接尽可能均衡。",-1),V=e("p",null,"第三种方案，是业务 client 自定义均衡策略。业务 client 从配置中心或 DNS 获取所有的Twemproxy 的 IP 列表，然后对这些 Twemproxy 进行均衡访问，从而达到负载均衡。",-1),O=e("p",null,"方案一，可以通过成熟的 LVS 方案，高效稳定的支持负载均衡策略，但多了一层，成本和运维的复杂度会有所增加。方案二，只能做到连接均衡，访问请求是否均衡，无法保障。方案三，成本最低，性能也比前面 2 个方案更高效。推荐使用方案三，微博内部也是采用第三种方案。",-1),I=e("h6",{id:"增加配置中心",tabindex:"-1"},[o("增加配置中心 "),e("a",{class:"header-anchor",href:"#增加配置中心","aria-label":'Permalink to "增加配置中心"'},"​")],-1),L=e("p",null,"对于 Twemproxy 配置的维护，可以通过增加一个配置中心服务来解决。将 YAML 配置文件中的所有配置信息，包括后端资源的部署信息、访问信息，以配置的方式存储到配置中心，如下图。",-1),R=e("p",null,"Twemproxy 启动时，首先到配置中心订阅并拉取配置，然后解析并正常启动。Twemproxy 将自己的 IP 和监听端口信息，也注册到配置中心。业务 client 从配置中心，获取Twemproxy 的部署信息，然后进行均衡访问。",-1),E=e("p",null,"在后端资源变更时，直接更新配置中心的配置。配置中心会通知所有 Twemproxy 实例，收到事件通知，Twemproxy 即可拉取最新配置，并调整后端资源的访问，实现在线变更。整个过程自动完成，更加高效和可靠。",-1),D=e("h6",{id:"支持-m-s-l1-多层访问",tabindex:"-1"},[o("支持 M-S-L1 多层访问 "),e("a",{class:"header-anchor",href:"#支持-m-s-l1-多层访问","aria-label":'Permalink to "支持 M-S-L1 多层访问"'},"​")],-1),N=e("p",null,"前面提到，为了应对突发洪水流量，避免硬件局部故障的影响，对 Mc 访问采用了Master-Slave-L1 架构。可以将该缓存架构体系的访问策略，封装到 Twemproxy 内部。实现方案也比较简单。首先在 servers 配置中，增加 Master、Slave、L1 三层，如下图。",-1),B=s("",4),U=e("p",null,"本课时，讲解了大数据时代下大中型互联网系统的特点，访问 Memcached 缓存时的经典问题及应对方案；还讲解了如何通过分拆缓存池、Master-Slave 双层架构，来解决 Memcached 的容量问题、性能瓶颈、连接瓶颈、局部故障的问题，以及 Master-Slave-L1 三层架构，通过多层、多副本 Memcached 体系，来更好得解决突发洪峰流量和局部故障的问题。",-1),Y=e("p",null,"本节课重点学习了基于 Twemproxy 的应用系统架构方案，学习了 Twemproxy 的系统架构和关键技术，学习了 Twemproxy 的部署及配置信息。最后还学习了如何扩展 Twemproxy，从而使 Twemproxy 具有更好的性能、可用性和可运维性。",-1),Q=e("p",null,"可以参考下面的思维导图，对这些知识点进行回顾和梳理。",-1),H=e("p",null,'OK，这节课就讲到这里啦，下一课时我将分享"Redis基本原理"，记得按时来听课哈。好，下节课见，拜拜！',-1),Z=e("br",null,null,-1);function $(z,j,F,G,J,K){const t=p("Image");return l(),n("div",null,[i,r(t,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/99/CC/CgoB5l2lO3yAe8fPAAD79T2nfL4556.png"}),o(),m,_,h,d,r(t,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/99/EC/CgotOV2lO3yAb15JAACUX73nZuE067.png"}),o(),x,T,w,y,u,g,r(t,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/99/CC/CgoB5l2lO3yAH925AAC54TkIVYU700.png"}),o(),A,M,r(t,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/99/EC/CgotOV2lO3yAOj8dAAB6Uhh2F5U672.png"}),o(),C,r(t,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/99/EC/CgotOV2lO3yAApZHAACxEUrIpz8577.png"}),o(),b,v,P,k,S,f,r(t,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/99/CC/CgoB5l2lO32AO_WQAAD00V71n90349.png"}),o(),q,V,O,I,L,r(t,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/99/EC/CgotOV2lO32AZAvhAADFfzUIYUo604.png"}),o(),R,E,D,N,r(t,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/99/CC/CgoB5l2lO32AVIRKAACszZ_Nluc455.png"}),o(),B,r(t,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/99/EC/CgotOV2lO32AZFmuAADIr6HA6UE775.png"}),o(),U,Y,Q,r(t,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/99/CC/CgoB5l2lO32AAYynAADMMM1Tbrw025.png"}),o(),H,Z])}const ee=a(c,[["render",$]]);export{X as __pageData,ee as default};
