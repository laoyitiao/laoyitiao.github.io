import{_ as i,j as S,o as d,g,k as h,h as a,s as r,Q as n}from"./chunks/framework.4e7d56ce.js";const V=JSON.parse('{"title":"02顶级项目：ShardingSphere是一款什么样的Apache开源软件？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/ShardingSphere 核心原理精讲_文档/(3561) 02  顶级项目：ShardingSphere 是一款什么样的 Apache 开源软件？.md","filePath":"posts/backEnd/ShardingSphere 核心原理精讲_文档/(3561) 02  顶级项目：ShardingSphere 是一款什么样的 Apache 开源软件？.md","lastUpdated":1696682708000}'),t={name:"posts/backEnd/ShardingSphere 核心原理精讲_文档/(3561) 02  顶级项目：ShardingSphere 是一款什么样的 Apache 开源软件？.md"},p=r("h1",{id:"_02顶级项目-shardingsphere是一款什么样的apache开源软件",tabindex:"-1"},[a("02顶级项目：ShardingSphere是一款什么样的Apache开源软件？ "),r("a",{class:"header-anchor",href:"#_02顶级项目-shardingsphere是一款什么样的apache开源软件","aria-label":'Permalink to "02顶级项目：ShardingSphere是一款什么样的Apache开源软件？"'},"​")],-1),s=r("p",null,"本课时将为你讲解 ShardingSphere 是一款什么样的 Apache 开源软件。",-1),o=r("p",null,"在上一课时中，我详细分析了分库分表的表现形式以及分片架构的解决方案和代表性框架。可以看到，ShardingSphere 同时实现了客户端分片和代理服务器组件，并提供了分布式数据库的相关功能特性。作为一款优秀的开源软件，ShardingSphere 能够取得目前的成就也不是一蹴而就，下面我们先来回顾一下 ShardingSphere 的发展历程。",-1),l=r("h3",{id:"shardingsphere-的发展历程-从-sharding-jdbc-到-apache-顶级项目",tabindex:"-1"},[a("ShardingSphere 的发展历程：从 Sharding-JDBC 到 Apache 顶级项目 "),r("a",{class:"header-anchor",href:"#shardingsphere-的发展历程-从-sharding-jdbc-到-apache-顶级项目","aria-label":'Permalink to "ShardingSphere 的发展历程：从 Sharding-JDBC 到 Apache 顶级项目"'},"​")],-1),c=r("p",null,"说到 ShardingSphere 的起源，我们不得不提 Sharding-JDBC 框架，该框架是一款起源于当当网内部的应用框架，并于 2017 年初正式开源。从 Sharding-JDBC 到 Apache 顶级项目，ShardingSphere 的发展经历了不同的演进阶段。纵观整个 ShardingSphere 的发展历史，我们可以得到时间线与阶段性里程碑的演进过程图：",-1),_=r("p",null,"从版本发布角度，我们也可以进一步梳理 ShardingSphere 发展历程中主线版本与核心功能之间的演进关系图：",-1),C=r("p",null,"基于 GitHub 上星数的增长轨迹，也可以从另一个维度很好地反映出 ShardingSphere 的发展历程：",-1),u=n("",7),A=r("p",null,"Sharding-JDBC 与 JDBC 规范的兼容性示意图",-1),B=r("p",null,[a("在实际开发过程中，Sharding-JDBC 以 JAR 包的形式提供服务。"),r("strong",null,[a("开发人员可以使用"),r("strong",null,[r("strong",null,"这个")]),a(" JAR 包直连数据库，无需额外的部署和依赖管理")]),a("。在应用 Sharding-JDBC 时，需要注意到 Sharding-JDBC 背后依赖的是一套完整而强大的分片引擎：")],-1),m=r("p",null,"由于 Sharding-JDBC 提供了一套与 JDBC 规范完全一致的 API，所以它可以很方便地与遵循 JDBC 规范的各种组件和框架进行无缝集成。例如，用于提供数据库连接的 DBCP、C3P0 等数据库连接池组件，以及用于提供对象-关系映射的 Hibernate、MyBatis 等 ORM 框架。当然，作为一款支持多数据库的开源框架，Sharding-JDBC 支持 MySQL、Oracle、SQLServer 等主流关系型数据库。",-1),D=r("h4",{id:"sharding-proxy",tabindex:"-1"},[a("Sharding-Proxy "),r("a",{class:"header-anchor",href:"#sharding-proxy","aria-label":'Permalink to "Sharding-Proxy"'},"​")],-1),J=r("p",null,"ShardingSphere 中的 Sharding-Proxy 组件定位为一个透明化的数据库代理端，所以它是代理服务器分片方案的一种具体实现方式。在代理方案的设计和实现上，Sharding-Proxy 同样充分考虑了兼容性。",-1),P=r("p",null,"Sharding-Proxy 所提供的兼容性首先体现在对异构语言的支持上，为了完成对异构语言的支持，Sharding-Proxy 专门对数据库二进制协议进行了封装，并提供了一个代理服务端组件。其次，从客户端组件上讲，针对目前市面上流行的 Navicat、MySQL Command Client 等客户端工具，Sharding-Proxy 也能够兼容遵循 MySQL 和 PostgreSQL 协议的各类访问客户端。当然，和 Sharding-JDBC 一样，Sharding-Proxy 也支持 MySQL 和 PostgreSQL 等多种数据库。",-1),x=r("p",null,"接下来，我们看一下 Sharding-Proxy 的整体架构。对于应用程序而言，这种代理机制是完全透明的，可以直接把它当作 MySQL 或 PostgreSQL 进行使用：",-1),b=r("p",null,"总结一下，我们可以直接把 Sharding-Proxy 视为一个数据库，用来代理后面分库分表的多个数据库，它屏蔽了后端多个数据库的复杂性。同时，也看到 Sharding-Proxy 的运行同样需要依赖于完成分片操作的分片引擎以及用于管理数据库的治理组件。",-1),q=r("p",null,"虽然 Sharding-JDBC 和 Sharding-Proxy 具有不同的关注点，但事实上，我们完全可以将它们整合在一起进行使用，也就是说这两个组件之间也存在兼容性。",-1),y=r("p",null,"前面已经介绍过，我们使用 Sharding-JDBC 的方式是在应用程序中直接嵌入 JAR 包，这种方式适合于业务开发人员。而 Sharding-Proxy 提供静态入口以及异构语言的支持，适用于需要对分片数据库进行管理的中间件开发和运维人员。基于底层共通的分片引擎，以及数据库治理功能，可以混合使用 Sharding-JDBC 和 Sharding-Proxy，以便应对不同的应用场景和不同的开发人员：",-1),k=n("",8),T=n("",31);function f(M,L,Q,E,N,R){const e=S("Image");return d(),g("div",null,[p,s,o,l,c,h(e,{alt:"1.png",src:"https://s0.lgstatic.com/i/image/M00/2B/C0/CgqCHl7-6OWAVF7WAACmgRfIB7Y558.png"}),a(),_,h(e,{alt:"2.png",src:"https://s0.lgstatic.com/i/image/M00/22/10/Ciqc1F7rSMqAGrqLAABmt5OcOuc557.png"}),a(),C,h(e,{alt:"3.png",src:"https://s0.lgstatic.com/i/image/M00/22/1C/CgqCHl7rSNaAE3gNAADqRUDMk-w922.png"}),a(),u,h(e,{alt:"4.png",src:"https://s0.lgstatic.com/i/image/M00/22/1C/CgqCHl7rSOuAXZt6AAC4cmjERnk488.png"}),a(),A,B,h(e,{alt:"5.png",src:"https://s0.lgstatic.com/i/image/M00/22/1C/CgqCHl7rSPSAUJHuAADsN1Pqjqs981.png"}),a(),m,D,J,P,x,h(e,{alt:"6.png",src:"https://s0.lgstatic.com/i/image/M00/22/1C/CgqCHl7rSQKAC1u6AADoQEq6hys890.png"}),a(),b,q,y,h(e,{alt:"7.png",src:"https://s0.lgstatic.com/i/image/M00/22/11/Ciqc1F7rSRCAS66OAAECtLTiErU161.png"}),a(),k,h(e,{alt:"8.png",src:"https://s0.lgstatic.com/i/image/M00/22/1C/CgqCHl7rSSCAcY4sAABRDnG4TnQ180.png"}),a(),T])}const O=i(t,[["render",f]]);export{V as __pageData,O as default};
