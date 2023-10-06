import{_ as o,j as e,o as t,g as r,k as p,h as a,Q as l,s}from"./chunks/framework.b3d8e22e.js";const B=JSON.parse('{"title":"ShardingTransactionManagerEngine ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/ShardingSphere 核心原理精讲_文档/(3586) 27  分布式事务：如何理解 ShardingSphere 中对分布式事务的抽象过程？.md","filePath":"posts/backEnd/ShardingSphere 核心原理精讲_文档/(3586) 27  分布式事务：如何理解 ShardingSphere 中对分布式事务的抽象过程？.md","lastUpdated":1696417798000}'),c={name:"posts/backEnd/ShardingSphere 核心原理精讲_文档/(3586) 27  分布式事务：如何理解 ShardingSphere 中对分布式事务的抽象过程？.md"},E=l("",35),y=l("",23),i=s("h4",{id:"_2-seataatshardingtransactionmanager",tabindex:"-1"},[a("2.SeataATShardingTransactionManager "),s("a",{class:"header-anchor",href:"#_2-seataatshardingtransactionmanager","aria-label":'Permalink to "2.SeataATShardingTransactionManager"'},"​")],-1),g=s("p",null,"介绍完 XAShardingTransactionManager 之后，我们来看上图中 ShardingTransactionManager 接口的另一个实现类 SeataATShardingTransactionManager。因为基于不同技术体系和工作原理，所以 SeataATShardingTransactionManager 中的实现方法也完全不同，让我们来看一下。",-1),d=s("p",null,[a("在介绍 SeataATShardingTransactionManager 之前，我们同样有必要对 Seata 本身做一些展开。与 XA 不同，"),s("strong",null,"Seata 框架"),a("中一个分布式事务包含三种角色，除了 XA 中同样具备的 TransactionManager（TM）和 ResourceManager（RM） 之外，还存在一个事务协调器 TransactionCoordinator (TC)，维护全局事务的运行状态，负责协调并驱动全局事务的提交或回滚。")],-1),u=s("p",null,"其中，TM 是一个分布式事务的发起者和终结者，TC 负责维护分布式事务的运行状态，而 RM 则负责本地事务的运行。",-1),F=s("p",null,"Seata 的整体架构图如下所示：",-1),h=s("p",null,"Seata 分布式事务组成结构图（来自 Seata 官网）",-1),A=s("p",null,"基于Seata 框架，一个分布式事务的执行流程包含如下五个步骤：",-1),S=l("",8);function T(D,C,M,v,b,m){const n=e("Image");return t(),r("div",null,[E,p(n,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image/M00/4E/E8/Ciqc1F9fO8mADc8eAAClhM8LyC0111.png"}),a(),y,p(n,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image/M00/4E/E9/Ciqc1F9fO-GALidCAABl39blOv8975.png"}),i,g,d,u,F,p(n,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image/M00/4E/E9/Ciqc1F9fO-uAZyMCAAEoW9aLAuQ436.png"}),a(),h,A,p(n,{alt:"Drawing 5.png",src:"https://s0.lgstatic.com/i/image/M00/4E/E9/Ciqc1F9fO_WAHRyqAACL8p3Fa_E119.png"}),S])}const f=o(c,[["render",T]]);export{B as __pageData,f as default};
