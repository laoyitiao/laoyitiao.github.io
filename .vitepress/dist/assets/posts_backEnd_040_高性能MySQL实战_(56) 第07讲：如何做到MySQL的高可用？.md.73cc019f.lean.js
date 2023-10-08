import{_ as p,j as s,o,g as r,k as t,h as a,Q as i,s as l}from"./chunks/framework.4e7d56ce.js";const Ml=JSON.parse('{"title":"第07讲：如何做到MySQL的高可用？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/040_高性能MySQL实战/(56) 第07讲：如何做到MySQL的高可用？.md","filePath":"posts/backEnd/040_高性能MySQL实战/(56) 第07讲：如何做到MySQL的高可用？.md","lastUpdated":1696682708000}'),n={name:"posts/backEnd/040_高性能MySQL实战/(56) 第07讲：如何做到MySQL的高可用？.md"},M=i("",8),_=l("p",null,"高可用性的指标，主要有可用性（也就是平时所说的几个 9）、平均故障间隔 MTBF、平均恢复时间 MTTR 三个部分。",-1),c=l("h2",{id:"可用性",tabindex:"-1"},[a("可用性 "),l("a",{class:"header-anchor",href:"#可用性","aria-label":'Permalink to "可用性"'},"​")],-1),h=l("p",null,'根据 HA 计算的值，业务常用的描述方法是"系统的可用性达到几个 9"。这"几个 9"就表示可用水平，正如下图所示，9 越多意味着可用性越高。常说的"5 个 9"意味着系统每年故障时间小于 5.3 分钟，其计算方式也很简单：系统 1 年内服务中断维护了 5 分钟，HA = 1 年/(1 年+5 分钟) = 99.999% 。',-1),A=l("p",null,"其中的 1 年就是 MTBF，表示平均故障间隔；5 分钟就是 MTTR，平均修复时间。",-1),u=l("h2",{id:"mtbf-和-mttr",tabindex:"-1"},[a("MTBF 和 MTTR "),l("a",{class:"header-anchor",href:"#mtbf-和-mttr","aria-label":'Permalink to "MTBF 和 MTTR"'},"​")],-1),S=l("p",null,"MTBF（全称是Mean Time Between Failures，即平均故障间隔），是指系统在运行期间的平均连续无故障时间，提升 MTBF 就意味着减少故障出现的次数，加大系统正常运行的服务时长。其计算公式如下图所示，是最近一次故障时间 down time − 上一次故障修复时的时间 uptime。",-1),d=l("br",null,null,-1),m=i("",49),g=l("p",null,"很明显，MMM Monitor 是单点判断的，存在单点故障的问题。这里总结下优缺点，如下图所示。虽然这类集群的缺点很致命，它无法解决网络抖动导致的数据冲突和错乱问题；但它好在部署简单。",-1),y=l("h2",{id:"mha",tabindex:"-1"},[a("MHA "),l("a",{class:"header-anchor",href:"#mha","aria-label":'Permalink to "MHA"'},"​")],-1),T=l("p",null,"接着来看业内常用的 MHA 架构，MHA 为了保证 Master 的高可用，通常会部署一个 Standby 角色的 Master。在 MySQL 故障切换过程中，MHA 能做到在 0~30 秒内自动完成数据库的故障切换操作，并且在进行故障切换的过程中，MHA 能最大程度的保证数据的一致性，以达到真正意义上的高可用。",-1),L=l("p",null,"如下图，整个 MHA 架构分为 MHA Manager 节点和 MHA Node 节点，其中 MHA Manager 节点是单点部署，MHA Node 节点是部署在每个需要监控的 MySQL 集群节点上的。MHA Manager 会定时探测集群中的 Master 节点，当 Master 出现故障时，它可以自动将最新数据的 Standby Master 或 Slave 提升为新的 Master，然后将其他的 Slave 重新指向新的 Master。",-1),Q=l("p",null,"MHA 相比 MMM 架构而言，能支持延迟数据补偿（最大保证）、支持半同步和 GTID 新特性，同时工具集更为强大，能做健康检查、集群节点挂载等运维工作。但是 MHA 存在单点判断、数据丢失的问题，这些问题也促成各个公司基于 MHA 进行二次开发和功能完善。",-1),P=l("p",null,"如下图，一主两从的 MHA 集群，正常情况下集群运行良好。但仍需要考虑一种故障场景，当 Manager 出现 Crash 时碰巧 Master 出现故障，这时候集群就无法正常的发起切换，Standby Master 也无法接管集群正常对外提供的服务，应用服务受损。",-1),b=l("p",null,"这种故障更极端的情况是，Manager 和 Master 在一个机架位或一个交互机下，当机架位出现故障时需要人工切换集群。而当交互机出现网络隔离时，Manager 和 Master 形成内部网（即网络分区），那此时 Standby、Slave、应用程序是无法正常访问 Master 节点的。这里也体现出 Manager 单点判断的不合理性，合理的判断机制应该是多点判断，例如使用分布式集群节点发起投票进行决策（可以参考 Redis Sentienl 的处理机制）。",-1),C=l("p",null,"MHA Manager 和 MMM Monitor 一样，都没有 watch dog 守护进程，存在单点故障的问题。",-1),B=l("p",null,"再来看下脑裂和数据丢失的场景，如下图。",-1),k=l("p",null,"首先是集群脑裂，当一部分应用程序 Client 和 Master 形成内部网络，而 Manager、Slave、Standby 及其他 Client 端组成内部网络时。首先集群的复制状态中断，两边数据不一致。其次 Manager 会认为 Master 已经 Crash，会发起故障切换，例如将 Standby Master 提升为新主库，将 Slave 自动 change master 挂载到 Standby Master 节点下形成新的数据库集群。这时候集群一分为二，出现集群脑裂的故障。",-1),R=l("p",null,"其次是数据丢失，同样当出现 Master 和 Standby（最新的 Slave）节点所处的服务器Crash 或组成内部网时，Manager 只能提升为 Slave（数据非最新，存在延迟），并为新 Master 提供服务，这就导致数据丢失。虽然 MHA 可以使用半同步复制来保证数据安全，但是半同步复制在网络抖动时同样是会存在退化为异步复制的风险。",-1),V=l("p",null,"MHA 作者承诺最大程度上保证数据的一致性，但故障切换过程中存在数据丢失的风险。",-1),f=l("h2",{id:"mha-arksentinel",tabindex:"-1"},[a("MHA+Arksentinel "),l("a",{class:"header-anchor",href:"#mha-arksentinel","aria-label":'Permalink to "MHA+Arksentinel"'},"​")],-1),I=l("p",null,"由于 MySQL 高可用架构方案单点判断的弊端，受到 Redis sentinel 的启发，极数云舟提出了基于分布式监控哨兵集群的 MySQL 高可用守护系统，我们对分布式监控哨兵集群就行了全新研发，目的是分布式监控哨兵集群对数据库集群进行故障检测和自动切换，跨机房的高可用切换，延迟数据自动补齐，秒级完成故障检测和切换等功能。",-1),D=l("p",null,"Arksentinel 是一个分布式监控哨兵集群，如下图所示，可以监控整个数据库集群的运行状况，实现系统监控、故障发现、故障自切换等功能。",-1),v=l("br",null,null,-1),q=l("br",null,null,-1),K=l("p",null,"Arksentinel 通常在不同机房、不同机柜、不同交换机下部署 3~5 节点，每个节点对数据库集群节点进行监控，当集群的数据库节点发生宕机或不可达时，Arksentinel 使用类 Paxos/Raft 算法发起故障投票，确定 Master 出现故障时自动发起切换，将可用的最新从库提升为主库，完成故障转移的功能。",-1),H=l("br",null,null,-1),x=i("",10),N=i("",6),E=i("",7),G=i("",6),F=l("p",null,"对于 MySQL 而言，实现共享存储的分布式数据库有 Amazon Aurora、极数云舟 ArkDB 和阿里云 PolarDB，借助 MySQL 插件式引擎的架构，将数据存储节点（Engine 层）构建在一个分布式存储系统之上，上游 MySQL Server 节点共享同一份数据。最快的理解方式是使用原生 MySQL Server，实现一个分布式的存储引擎，例如将 InnoDB 存储引擎层构建在分布式存储系统之上。由于上游使用的是原生 MySQL Server，可以 100% 兼容原生 MySQL，对于应用程序而言无需进行代码修改即可无缝迁移。这类架构是分布式存储数据库，并没有分布式事务处理，使用的还是 MySQL Server 原生事务。通过分布式存储拥有的数据多副本、快照备份及恢复等功能特性保证数据存储节点的高可用性。",-1),O=l("p",null,"下图是 Amazon Aurora 的实现架构图，它使用了专门的 S3 存储及 RDS 组件，为了方便讲解，我们以 ArkDB 的架构为例讲解这类共享存储的 MySQL 高可用集群的实现方式。",-1),J=l("p",null,"首先是接入层，采用数据库中间件为业务端提供统一的对外访问入口，其 100% 兼容 MySQL 语法和原生协议的特性，对于应用程序而言，访问数据库中间件跟访问原生 MySQL 的方式是一样的。接入层的主要职责是负责用户权限认证、接收并转发 SQL 访问请求，提供透明读写分离、负载均衡、连接数限制统计及连接池支持等。",-1),w=l("p",null,"其次是计算层，对应 MySQL Server 层，简单理解计算层就是原生的 MySQL Server，不一样的是 Aurora 等公有云服务当前支持的最高版本是 MySQL 5.7，ArkDB 支持的版本是 MySQL 8.0；计算层为数据库接入层，负责响应客户端链接和权限验证，接收并处理 SQL 请求，包含连接管理、权限验证、分析器、优化器和执行器等。MySQL Server 为无状态节点，自身不存储数据，可以快速无限水平扩展，同时通过操作 MySQL Server 节点，实现整个数据库机器的高可用切换。在 MySQL Server 层处理 SQL 请求的时候，需要适当的内存和 CPU 资源，对存储则无要求。",-1),X=l("p",null,"最后是存储层，对于 MySQL Engine 层，以 ArkDB 为准，存储层 ArkDB Engine 负责数据存储和读取，底层采用分布式存储。每个数据存储单位默认存储 3 个副本，副本间的数据保持强一致性和容灾。ArkDB Engine 负责存储数据并实现数据共享。上层 Server 节点访问 ArkDB Engine 同一份数据。ArkDB Engine 支持根据业务访问策略对数据存储分级，用户可以根据预算、性能指标、容量请求、访问场景按需使用不同的存储硬件，同时针对闪存卡进行软硬件结合优化。",-1),z=i("",16),U=i("",17),Z=l("h1",{id:"总结回顾",tabindex:"-1"},[a("总结回顾 "),l("a",{class:"header-anchor",href:"#总结回顾","aria-label":'Permalink to "总结回顾"'},"​")],-1),j=l("p",null,"下面来回顾一下本节课的知识，首先我们从什么是高可用、MySQL 如何提升 MTBF、MySQL 如何降低 MTTR、避免单点失效、基础软硬件避免单点失效、MySQL 高可用架构选型及演进、故障转移和故障恢复、拓展：MySQL 管理的革命等方面进行了学习。其中对于 MySQL 高可用架构选型及演进进行了重点的深入的介绍。",-1),Y=l("br",null,null,-1),$=l("br",null,null,-1),W=l("p",null,"通过学习本课时内容，你需要对构建 MySQL 高可用有总体的认识，需要知道去思考哪些细节点。MySQL 高可用架构需要不断的积累经验并实践，实践才能出真知，好的架构是根据实际场景演进而来的。",-1),ll=l("p",null,"下一课时，将分享如何搭建稳固的 MySQL 运维体系。",-1),al=l("br",null,null,-1);function el(tl,il,pl,sl,ol,rl){const e=s("Image");return o(),r("div",null,[M,t(e,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/89/48/CgoB5l12Kt-ARuuKAAAXUvypir8961.png"}),a(),_,c,h,t(e,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/89/68/CgotOV12Kt-AaksiAABW0I7flOA723.png"}),a(),A,u,S,d,t(e,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/89/48/CgoB5l12Kt-AMwSpAABYZ7wuoT0152.png"}),a(),m,t(e,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/89/68/CgotOV12Kt-AZCnzAAEMf1gh5I4969.png"}),a(),g,t(e,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/89/48/CgoB5l12KuCATvcmAABciE0J_Jw079.png"}),a(),y,T,L,t(e,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/89/68/CgotOV12KuCAHY3zAABCkRv6FzM895.png"}),a(),Q,P,t(e,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/89/48/CgoB5l12KuCATDoPAAA2MVVZKss299.png"}),a(),b,C,B,t(e,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/89/68/CgotOV12KuCAbuB4AABOoEdThsk565.png"}),a(),k,R,V,f,I,D,v,t(e,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/89/48/CgoB5l12KuCAe9UwAAB64eDhFRA040.png"}),a(),q,K,H,t(e,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/89/68/CgotOV12KuCAN8fuAABujt3Phzs364.png"}),a(),x,t(e,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/89/48/CgoB5l12KuGAX-6IAAD3SKUBz0U208.png"}),a(),N,t(e,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/89/68/CgotOV12KuGANfPsAAFhy0z3BwY428.png"}),a(),E,t(e,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/89/48/CgoB5l12KuGALf-cAAGuHVmMkHs743.png"}),a(),G,t(e,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/89/68/CgotOV12KuGAYRWUAAB1m4gWCqI505.png"}),a(),F,O,t(e,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/89/68/CgotOV12KuGAKdrfAADLQ_q2BfU641.png"}),a(),J,t(e,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/89/48/CgoB5l12KuKAHjTnAADLPn99ByA736.png"}),a(),w,t(e,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/89/68/CgotOV12KuKAfVFUAADLa7Il3eg908.png"}),a(),X,t(e,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/89/48/CgoB5l12KuKAQZZbAADLvEioLhc882.png"}),a(),z,t(e,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/89/68/CgotOV12KuKAe_HOAABl-wRATa0772.png"}),a(),U,t(e,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/89/48/CgoB5l12KuKALVmmAACJhmrtz7g094.png"}),a(),Z,j,Y,t(e,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/89/68/CgotOV12KuKAOZqTAAA607PieN0507.png"}),a(),$,W,ll,al])}const _l=p(n,[["render",el]]);export{Ml as __pageData,_l as default};
