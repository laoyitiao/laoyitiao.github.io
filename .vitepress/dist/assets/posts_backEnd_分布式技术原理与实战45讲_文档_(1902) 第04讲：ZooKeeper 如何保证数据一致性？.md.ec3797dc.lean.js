import{_ as l,j as p,o as s,g as i,k as a,h as o,Q as t,s as e}from"./chunks/framework.cfb14fe0.js";const E=JSON.parse('{"title":"第04讲：ZooKeeper如何保证数据一致性？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/分布式技术原理与实战45讲_文档/(1902) 第04讲：ZooKeeper 如何保证数据一致性？.md","filePath":"posts/backEnd/分布式技术原理与实战45讲_文档/(1902) 第04讲：ZooKeeper 如何保证数据一致性？.md","lastUpdated":1696682708000}'),n={name:"posts/backEnd/分布式技术原理与实战45讲_文档/(1902) 第04讲：ZooKeeper 如何保证数据一致性？.md"},d=t("",11),_=t("",19),b=e("br",null,null,-1),c=e("p",null,"Zab 协议的实现也类似，每当有一个新的 Leader 选举出现时，就会从这个 Leader 服务器上取出其本地日志中最大事务的 Zxid，并从中读取 epoch 值，然后加 1，以此作为新的周期 ID。总结一下，高 32 位代表了每代 Leader 的唯一性，低 32 位则代表了每代 Leader 中事务的唯一性。",-1),h=e("h2",{id:"zab-流程分析",tabindex:"-1"},[o("Zab 流程分析 "),e("a",{class:"header-anchor",href:"#zab-流程分析","aria-label":'Permalink to "Zab 流程分析"'},"​")],-1),Z=e("p",null,"Zab 的具体流程可以拆分为消息广播、崩溃恢复和数据同步三个过程，下面我们分别进行分析。",-1),u=e("br",null,null,-1),g=e("h3",{id:"消息广播",tabindex:"-1"},[o("消息广播 "),e("a",{class:"header-anchor",href:"#消息广播","aria-label":'Permalink to "消息广播"'},"​")],-1),m=e("p",null,"在 ZooKeeper 中所有的事务请求都由 Leader 节点来处理，其他服务器为 Follower，Leader 将客户端的事务请求转换为事务 Proposal，并且将 Proposal 分发给集群中其他所有的 Follower。",-1),L=e("br",null,null,-1),x=e("p",null,"完成广播之后，Leader 等待 Follwer 反馈，当有过半数的 Follower 反馈信息后，Leader 将再次向集群内 Follower 广播 Commit 信息，Commit 信息就是确认将之前的 Proposal 提交。",-1),P=e("br",null,null,-1),A=e("p",null,"这里的 Commit 可以对比 SQL 中的 COMMIT 操作来理解，MySQL 默认操作模式是 autocommit 自动提交模式，如果你显式地开始一个事务，在每次变更之后都要通过 COMMIT 语句来确认，将更改提交到数据库中。",-1),S=e("br",null,null,-1),T=e("p",null,"Leader 节点的写入也是一个两步操作，第一步是广播事务操作，第二步是广播提交操作，其中过半数指的是反馈的节点数 >=N/2+1，N 是全部的 Follower 节点数量。",-1),F=e("br",null,null,-1),k=e("p",null,"消息广播的过程描述可以参考下图：",-1),C=e("br",null,null,-1),f=t("",16),K=t("",20),q=t("",18);function w(v,I,z,V,D,M){const r=p("Image");return s(),i("div",null,[d,a(r,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/0C/DF/Ciqah16O5QyAB4rJAAEiJ-4T3bE046.png"}),o(),_,a(r,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/85/F5/Cgq2xl6O5QyAeZqMAAB5C-BWbeI425.png"}),o(),b,c,h,Z,u,a(r,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/0C/DF/Ciqah16O5QyADv0LAAA84x9hlQc078.png"}),o(),g,m,L,x,P,A,S,T,F,k,C,a(r,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/85/F5/Cgq2xl6O5Q2ASjMpAAHdAdF67vE736.png"}),o(),f,a(r,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/85/F8/Cgq2xl6O5-SASu1cAABBzFJh3s0114.png"}),o(),K,a(r,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/0C/DF/Ciqah16O5Q2AL03bAADZjhkw3ys031.png"}),o(),q])}const O=l(n,[["render",w]]);export{E as __pageData,O as default};
