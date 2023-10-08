import{_ as e,j as i,o as n,g as l,k as t,h as p,Q as o,s as a}from"./chunks/framework.4e7d56ce.js";const M=JSON.parse('{"title":"14错误侦测：如何保证分布式系统稳定？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/24讲吃透分布式数据库_文档/(6309) 14  错误侦测：如何保证分布式系统稳定？.md","filePath":"posts/backEnd/24讲吃透分布式数据库_文档/(6309) 14  错误侦测：如何保证分布式系统稳定？.md","lastUpdated":1696682708000}'),_={name:"posts/backEnd/24讲吃透分布式数据库_文档/(6309) 14  错误侦测：如何保证分布式系统稳定？.md"},r=o("",21),c=a("p",null,"图 1 模拟两个连续心跳访问",-1),h=a("p",null,"上面的图模拟了两个连续心跳访问，节点 1 发送 ping 包，在规定的时间内节点 2 返回了 pong 包。从而节点 1 判断节点 2 是存活的。但在现实场景中经常会发生图 2 所示的情况。",-1),d=a("p",null,"图 2 现实场景下的心跳访问",-1),g=a("p",null,"可以看到节点 1 发送 ping 后，节点没有在规定时间内返回 pong，此时节点 1 又发送了另外的 ping。此种情况表明，节点 2 存在延迟情况。偶尔的延迟在分布式场景中是极其常见的，故基于超时的心跳检测算法需要设置一个超时总数阈值。当超时次数超过该阈值后，才判断远程节点是离线状态，从而避免偶尔产生的延迟影响算法的准确性。",-1),u=a("p",null,"由上面的描述可知，基于超时的心跳检测法会为了调高算法的准确度，从而牺牲算法的效率。那有没有什么办法能改善算法的效率呢？下面我就要介绍一种不基于超时的心跳检测算法。",-1),m=a("h4",{id:"不基于超时",tabindex:"-1"},[p("不基于超时 "),a("a",{class:"header-anchor",href:"#不基于超时","aria-label":'Permalink to "不基于超时"'},"​")],-1),A=a("p",null,"不基于超时的心跳检测算法是基于异步系统理论的。它保存一个全局节点的心跳列表，上面记录了每一个节点的心跳状态，从而可以直观地看到系统中节点的健康度。由此可知，该算法除了可以提高检测的效率外，还可以非常容易地获得所有节点的健康状态。那么这个全局列表是如何生成的呢？下图展示了该列表在节点之间的流转过程。",-1),b=a("p",null,"图 3 全局列表在节点之间的流转过程",-1),q=a("p",null,"由图可知，该算法需要生成一个节点间的主要路径，该路径就是数据流在节点间最常经过的一条路径，该路径同时要包含集群内的所有节点。如上图所示，这条路径就是从节点 1 经过节点 2，最后到达节点 3。",-1),f=a("p",null,"算法开始的时候，节点首先将自己记录到表格中，然后将表格发送给节点 2；节点 2 首先将表格中的节点 1 的计数器加 1，然后将自己记录在表格中，而后发送给节点 3；节点 3 如节点 2 一样，将其中的所有节点计数器加 1，再把自己记录进去。一旦节点 3 发现所有节点全部被记录了，就停止这个表格的传播。",-1),P=a("p",null,"在一个真实的环境中，节点不是如例子中那样是线性排布的，而很可能是一个节点会与许多节点连接。这个算法的一个优点是，即使两个节点连接偶尔不通，只要这个远程节点可以至少被一个节点访问，它就有机会被记录在列表中。",-1),k=a("p",null,"这个算法是不基于超时设计的，故可以很快获取集群内的失败节点。并可以知道节点的健康度是由哪些节点给出的判断。但是它同时存在需要压制异常计算节点的问题，这些异常记录的计数器会将一个正常的节点标记为异常，从而使算法的精准度下降。",-1),x=a("p",null,"那么有没有方法能提高对于单一节点的判断呢？现在我就来介绍一种间接的检测方法。",-1),T=a("h4",{id:"间接检测",tabindex:"-1"},[p("间接检测 "),a("a",{class:"header-anchor",href:"#间接检测","aria-label":'Permalink to "间接检测"'},"​")],-1),B=a("p",null,"间接检测法可以有效提高算法的稳定性。它是将整个网络进行分组，我们不需要知道网络中所有节点的健康度，而只需要在子网中选取部分节点，它们会告知其相邻节点的健康状态。",-1),C=o("",22);function G(w,D,N,S,E,V){const s=i("Image");return n(),l("div",null,[r,t(s,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image6/M00/0B/97/Cgp9HWA4wn-ACDStAABEuFgWB6c085.png"}),p(),c,h,t(s,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image6/M00/0B/94/CioPOWA4woqAFrAbAABF2-Jmi34588.png"}),p(),d,g,u,m,A,t(s,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image6/M00/0B/94/CioPOWA4wpWAZg3ZAABADm-xENc006.png"}),p(),b,q,f,P,k,x,T,B,t(s,{alt:"Drawing 6.png",src:"https://s0.lgstatic.com/i/image6/M00/0B/97/Cgp9HWA4wp2AffksAABafzwFuLM251.png"}),p(),C])}const W=e(_,[["render",G]]);export{M as __pageData,W as default};
