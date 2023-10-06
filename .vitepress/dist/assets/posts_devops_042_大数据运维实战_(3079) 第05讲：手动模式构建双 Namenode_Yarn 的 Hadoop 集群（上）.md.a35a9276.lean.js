import{_ as p,j as e,o as t,g as c,k as n,Q as l,s,h as o}from"./chunks/framework.b3d8e22e.js";const K=JSON.parse('{"title":"双 NameNode 实现原理与应用架构 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/devops/042_大数据运维实战/(3079) 第05讲：手动模式构建双 Namenode+Yarn 的 Hadoop 集群（上）.md","filePath":"posts/devops/042_大数据运维实战/(3079) 第05讲：手动模式构建双 Namenode+Yarn 的 Hadoop 集群（上）.md","lastUpdated":1696417798000}'),r={name:"posts/devops/042_大数据运维实战/(3079) 第05讲：手动模式构建双 Namenode+Yarn 的 Hadoop 集群（上）.md"},E=l("",17),y=s("p",null,"由图可知，JournalNode 集群可以几乎实时的去 NameNode 上拉取元数据，然后保存元数据到 JournalNode 集群；同时，处于 standby 状态的 NameNode 也会实时的去 JournalNode 集群上同步 JNS 数据，通过这种方式，就实现了两个 NameNode 之间的数据同步。",-1),i=s("p",null,"那么，JournalNode 集群内部是如何实现的呢？",-1),d=s("p",null,"两个 NameNode 为了数据同步，会通过一组称作 JournalNodes 的独立进程进行相互通信。当 Active 状态的 NameNode 元数据有任何修改时，会告知大部分的 JournalNodes 进程。同时，Standby 状态的 NameNode 也会读取 JNs 中的变更信息，并且一直监控 EditLog （事务日志）的变化，并把变化应用于自己的命名空间。Standby 可以确保在集群出错时，元数据状态已经完全同步了。",-1),h=s("p",null,"下图是 JournalNode 集群的内部运行架构图。",-1),F=s("p",null,"由图可知，JN1、JN2、JN3 等是 JournalNode 集群的节点，QJM（Qurom Journal Manager）的基本原理是用 2N+1 台 JournalNode 存储 EditLog，每次写数据操作有 N/2+1 个节点返回成功，那么本次写操作才算成功，保证数据高可用。当然这个算法所能容忍的是最多有 N 台机器挂掉，如果多于 N 台挂掉，算法就会失效。",-1),D=s("p",null,"ANN 表示处于 Archive 状态的 NameNode，SNN 表示处于 Standbye 状态的 NameNode，QJM 从 ANN 读取数据写入 EditLog 中，然后 SNN 从 EditLog 中读取数据，进而应用到自身。",-1),A=s("h4",{id:"_4-双-namenode-高可用-hadoop-集群架构",tabindex:"-1"},[o("4. 双 NameNode 高可用 Hadoop 集群架构 "),s("a",{class:"header-anchor",href:"#_4-双-namenode-高可用-hadoop-集群架构","aria-label":'Permalink to "4. 双 NameNode 高可用 Hadoop 集群架构"'},"​")],-1),m=s("p",null,"作为 Hadoop 的第二个版本，Hadoop2.x 最大的变化是 NameNode 可实现高可用，以及计算资源管理器 Yarn。本课时我们将重点介绍下如何构建一个线上高可用的 Hadoop 集群系统，这里有两个重点，一是 NameNode 高可用的构建，二是资源管理器 Yarn 的实现，通过 Yarn 实现真正的分布式计算和多种计算框架的融合。",-1),u=s("p",null,"下图是一个高可用的 Hadoop 集群运行原理图。",-1),g=s("p",null,"此架构主要解决了两个问题，一是 NameNode 元数据同步问题，二是主备 NameNode 切换问题，由图可知，解决主、备 NameNode 元数据同步是通过 JournalNode 集群来完成的，而解决主、备 NameNode 切换可通过 ZooKeeper 来完成。",-1),b=s("p",null,"ZooKeeper 是一个独立的集群，在两个 NameNode 上还需要启动一个 failoverController（zkfc）进程，该进程作为 ZooKeeper 集群的客户端存在，通过 zkfc 可以实现与 ZooKeeper 集群的交互和状态监测。",-1),_=s("h3",{id:"双-namenode-yarn-构建-hdfs-高可用-hadoop-集群过程",tabindex:"-1"},[o("双 NameNode + Yarn 构建 HDFS 高可用 Hadoop 集群过程 "),s("a",{class:"header-anchor",href:"#双-namenode-yarn-构建-hdfs-高可用-hadoop-集群过程","aria-label":'Permalink to "双 NameNode + Yarn 构建 HDFS 高可用 Hadoop 集群过程"'},"​")],-1),v=s("h4",{id:"_1-部署前主机、软件功能、磁盘存储规划",tabindex:"-1"},[o("1. 部署前主机、软件功能、磁盘存储规划 "),s("a",{class:"header-anchor",href:"#_1-部署前主机、软件功能、磁盘存储规划","aria-label":'Permalink to "1. 部署前主机、软件功能、磁盘存储规划"'},"​")],-1),k=s("p",null,"双 NameNode 的 Hadoop 集群环境涉及到的角色有 Namenode、datanode、resourcemanager、nodemanager、historyserver、ZooKeeper、JournalNode 和 zkfc，这些角色可以单独运行在一台服务器上，也可以将某些角色合并在一起运行在一台机器上。",-1),N=s("p",null,"一般情况下，NameNode 服务要独立部署，这样两个 NameNode 就需要两台服务器，而 datanode 和 nodemanager 服务建议部署在一台服务器上，resourcemanager 服务跟 NameNode 类似，也建议独立部署在一台服务器上，而 historyserver 一般和 resourcemanager 服务放在一起。ZooKeeper 和 JournalNode 服务是基于集群架构的，因此至少需要 3 个集群节点，即需要 3 台服务器，不过 ZooKeeper 和 JournalNode 集群可以放在一起，共享 3 台服务器资源。最后，zkfc 是对 NameNode 进行资源仲裁的，所以它必须和 NameNode 服务运行在一起，这样 zkfc 就不需要占用独立的服务器了。",-1),f=s("p",null,"本着节约成本、优化资源、合理配置的原则，下面的部署通过 5 台独立的服务器来实现，操作系统均采用 Centos7.7 版本，每个服务器主机名、IP 地址以及功能角色如下表所示：",-1),C=s("p",null,"由表可知，namenodemaster 和 yarnserver 是作为 NameNode 的主、备两个节点，同时 yarnserver 还充当了 ResourceManager 和 JobHistoryServer 的角色。如果服务器资源充足，可以将 ResourceManager 和 JobHistoryServer 服务放在一台独立的机器上。",-1),H=s("p",null,"此外，slave001、slave002 和 slave003 三台主机上部署了 ZooKeeper 集群、JournalNode 集群，还充当了 DataNode 和 NodeManager 的角色。",-1),B=s("p",null,"在软件部署上，每个软件采用的版本如下表所示：",-1),O=l("",57);function q(z,S,P,j,M,x){const a=e("Image");return t(),c("div",null,[E,n(a,{alt:"01.png",src:"https://s0.lgstatic.com/i/image/M00/07/4E/CgqCHl65FrmAJkEYAADp0NN0xGw607.png"}),y,i,d,h,n(a,{alt:"02.png",src:"https://s0.lgstatic.com/i/image/M00/07/4E/CgqCHl65FsmAReOgAACOMp8vfYQ648.png"}),F,D,A,m,u,n(a,{alt:"03.png",src:"https://s0.lgstatic.com/i/image/M00/07/55/Ciqc1F65G7aAKwckAADqfdUc2EA969.png"}),g,b,_,v,k,N,f,n(a,{alt:"图片1.png",src:"https://s0.lgstatic.com/i/image/M00/07/55/CgqCHl65G9OAUprTAADj0vKtWPY235.png"}),C,H,B,n(a,{alt:"图片2.png",src:"https://s0.lgstatic.com/i/image/M00/07/56/CgqCHl65G-SAIyUlAABHEvoc-ZI303.png"}),O])}const T=p(r,[["render",q]]);export{K as __pageData,T as default};
