import{_ as o,j as l,o as r,g as c,k as e,h as n,Q as p,s}from"./chunks/framework.cfb14fe0.js";const A=JSON.parse('{"title":"第19讲：Oberver的作用与Follow有哪些不同？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/ZooKeeper源码分析与实战_文档/(3149) 第19讲：Oberver 的作用与 Follow 有哪些不同？.md","filePath":"posts/backEnd/ZooKeeper源码分析与实战_文档/(3149) 第19讲：Oberver 的作用与 Follow 有哪些不同？.md","lastUpdated":1696682708000}'),t={name:"posts/backEnd/ZooKeeper源码分析与实战_文档/(3149) 第19讲：Oberver 的作用与 Follow 有哪些不同？.md"},E=p("",7),y=s("p",null,"在早期的 ZooKeeper 集群服务运行过程中，只有 Leader 服务器和 Follow 服务器。不过随着 ZooKeeper 在分布式环境下的广泛应用，早期模式的设计缺点也随之产生，主要带来的问题有如下几点：",-1),i=s("ol",null,[s("li",null,[s("p",null,"随着集群规模的变大，集群处理写入的性能反而下降。")]),s("li",null,[s("p",null,"ZooKeeper 集群无法做到跨域部署")])],-1),d=s("p",null,"其中最主要的问题在于，当 ZooKeeper 集群的规模变大，集群中 Follow 服务器数量逐渐增多的时候，ZooKeeper 处理创建数据节点等事务性请求操作的性能就会逐渐下降。这是因为 ZooKeeper 集群在处理事务性请求操作时，要在 ZooKeeper 集群中对该事务性的请求发起投票，只有超过半数的 Follow 服务器投票一致，才会执行该条写入操作。",-1),u=s("p",null,"正因如此，随着集群中 Follow 服务器的数量越来越多，一次写入等相关操作的投票也就变得越来越复杂，并且 Follow 服务器之间彼此的网络通信也变得越来越耗时，导致随着 Follow 服务器数量的逐步增加，事务性的处理性能反而变得越来越低。",-1),F=s("p",null,"为了解决这一问题，在 ZooKeeper 3.6 版本后，ZooKeeper 集群中创建了一种新的服务器角色，即 Observer------观察者角色服务器。Observer 可以处理 ZooKeeper 集群中的非事务性请求，并且不参与 Leader 节点等投票相关的操作。这样既保证了 ZooKeeper 集群性能的扩展性，又避免了因为过多的服务器参与投票相关的操作而影响 ZooKeeper 集群处理事务性会话请求的能力。",-1),b=s("p",null,"在引入 Observer 角色服务器后，一个 ZooKeeper 集群服务在部署的拓扑结构，如下图所示：",-1),v=p("",23);function h(O,q,g,_,C,m){const a=l("Image");return r(),c("div",null,[E,e(a,{alt:"image (3).png",src:"https://s0.lgstatic.com/i/image/M00/2E/C9/Ciqc1F8FnKWAQEJJAADU9xFvIIU685.png"}),n(),y,i,d,u,F,b,e(a,{alt:"image (4).png",src:"https://s0.lgstatic.com/i/image/M00/2E/C9/Ciqc1F8FnLGAKhD0AAE5oGBLTTQ439.png"}),n(),v])}const k=o(t,[["render",h]]);export{A as __pageData,k as default};
