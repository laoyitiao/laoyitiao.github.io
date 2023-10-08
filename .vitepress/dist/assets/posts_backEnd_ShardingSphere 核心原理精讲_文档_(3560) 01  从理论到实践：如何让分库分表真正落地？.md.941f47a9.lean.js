import{_ as n,j as i,o as l,g as p,k as s,h as a,Q as o,s as t}from"./chunks/framework.4e7d56ce.js";const y=JSON.parse('{"title":"01从理论到实践：如何让分库分表真正落地？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/ShardingSphere 核心原理精讲_文档/(3560) 01  从理论到实践：如何让分库分表真正落地？.md","filePath":"posts/backEnd/ShardingSphere 核心原理精讲_文档/(3560) 01  从理论到实践：如何让分库分表真正落地？.md","lastUpdated":1696682708000}'),_={name:"posts/backEnd/ShardingSphere 核心原理精讲_文档/(3560) 01  从理论到实践：如何让分库分表真正落地？.md"},r=o("",16),h=t("p",null,"先来讨论垂直拆分的应用方式，相比水平拆分，垂直拆分相对比较容易理解和实现。在电商系统中，用户在打开首页时，往往会加载一些用户性别、地理位置等基础数据。对于用户表而言，这些位于首页的基础数据访问频率显然要比用户头像等数据更高。基于这两种数据的不同访问特性，可以把用户单表进行拆分，将访问频次低的用户头像等信息单独存放在一张表中，把访问频次较高的用户信息单独放在另一张表中：",-1),c=t("p",null,[a("从这里可以看到，"),t("strong",null,"垂直分表的处理方式就是将一个表按照字段分成多张表，每个表存储其中一部分字段。"),a(" 在实现上，我们通常会把头像等 blob 类型的大字段数据或热度较低的数据放在一张独立的表中，将经常需要组合查询的列放在一张表中，这也可以认为是分表操作的一种表现形式。")],-1),g=t("p",null,"通过垂直分表能得到一定程度的性能提升，但数据毕竟仍然位于同一个数据库中，也就是把操作范围限制在一台服务器上，每个表还是会竞争同一台服务器中的 CPU、内存、网络 IO 等资源。基于这个考虑，在有了垂直分表之后，就可以进一步引入垂直分库。",-1),d=t("p",null,"对于前面介绍的场景，分表之后的用户信息同样还是跟其他的商品、订单信息存放在同一台服务器中。基于垂直分库思想，这时候就可以把用户相关的数据表单独拆分出来，放在一个独立的数据库中。",-1),m=t("p",null,[a("这样的效果就是垂直分库。从定义上讲，垂直分库是指按照业务将表进行分类，然后分布到不同的数据库上。然后，每个库可以位于不同的服务器上，其核心理念是"),t("strong",null,"专库专用"),a("。而从实现上讲，垂直分库很大程度上取决于业务的规划和系统边界的划分。比如说，用户数据的独立拆分就需要考虑到系统用户体系与其他业务模块之间的关联关系，而不是简单地创建一个用户库就可以了。在高并发场景下，垂直分库能够在一定程度上提升 IO 访问效率和数据库连接数，并降低单机硬件资源的瓶颈。")],-1),u=t("p",null,"从前面的分析中我们不难明白，垂直拆分尽管实现起来比较简单，但并不能解决单表数据量过大这一核心问题。所以，现实中我们往往需要在垂直拆分的基础上添加水平拆分机制。例如，可以对用户库中的用户信息按照用户 ID 进行取模，然后分别存储在不同的数据库中，这就是水平分库的常见做法：",-1),A=o("",3),S=o("",5),C=t("p",null,"可以看到图中的数据库集群中存在一个主库，也存在一个从库，主库和从库之间通过同步机制实现两者数据的一致性。在互联网系统中，普遍认为对数据库读操作的频率要远远高于写操作，所以瓶颈往往出现在读操作上。通过读写分离，就可以把读操作分离出来，在独立的从库上进行。现实中的主从架构，主库和从库的数量，尤其从库的数量都是可以根据数据量的大小进行扩充的。",-1),T=t("p",null,[t("strong",null,"读写分离，主要解决的就是高并发下的数据库访问，也是一种常用的解决方案"),a("。但是跟提升服务器配置一样，并不是终极解决方案。终极的解决方案还是前面介绍的分库分表，按照用户 ID 等规则来拆分库或拆分表。但是，请注意，分库分表与读写分离之间的关系并不是互斥的，而是可以相辅相成的，完全可以在分库分表的基础上引入读写分离机制：")],-1),q=o("",7),D=t("p",null,"在具体实现上，我们通常会将分片规则的处理逻辑打包成一个公共 JAR 包，其他业务开发人员只需要在代码工程中引入这个 JAR 包即可。针对这种方案，因为没有独立的服务器组件，所以也不需要专门维护某一个具体的中间件。然而，这种直接在业务代码中嵌入分片组件的方法也有明显的缺点：",-1),P=t("ul",null,[t("li",null,[t("p",null,"一方面，由于分片逻辑侵入到了业务代码中，业务开发人员在理解业务的基础上还需要掌握分片规则的处理方式，增加了开发和维护成本；")]),t("li",null,[t("p",null,"另一方面，一旦出现问题，也只能依赖业务开发人员通过分析代码来找到原因，而无法把这部分工作抽离出来让专门的中间件团队进行完成。")])],-1),b=t("p",null,"基于以上分析，客户端分片在实现上通常会进一步抽象，把分片规则的管理工作从业务代码中剥离出来，形成单独演进的一套体系。这方面典型的设计思路是重写 JDBC 协议，也就是说在 JDBC 协议层面嵌入分片规则。这样，业务开发人员还是使用与 JDBC 规范完全兼容的一套 API 来操作数据库，但这套 API 的背后却自动完成了分片操作，从而实现了对业务代码的零侵入：",-1),I=t("p",null,"客户端分片结构：重写JDBC协议",-1),k=t("p",null,"这种解决方案的优势在于，分片操作对于业务而言是完全透明的，从而一定程度上实现业务开发人员与数据库中间件团队在职责上的分离。这样，业务开发人员只需要理解 JDBC 规范就可以完成分库分表，开发难度以及代码维护成本得到降低。",-1),F=t("p",null,"对于客户端分片，典型的中间件包括阿里巴巴的 TDDL 以及本课程将要介绍的 ShardingSphere。因为 TDDL 并没有开源，所以无法判断客户端分片的具体实现方案。而对于 ShardingSphere 而言，它是重写 JDBC 规范以实现客户端分片的典型实现框架。",-1),M=t("h4",{id:"代理服务器分片",tabindex:"-1"},[a("代理服务器分片 "),t("a",{class:"header-anchor",href:"#代理服务器分片","aria-label":'Permalink to "代理服务器分片"'},"​")],-1),f=t("p",null,"代理服务器分片的解决方案也比较明确，也就是采用了代理机制，在应用层和数据库层之间添加一个代理层。有了代理层之后，就可以把分片规则集中维护在这个代理层中，并对外提供与 JDBC 兼容的 API 给到应用层。这样，应用层的业务开发人员就不用关心具体的分片规则，而只需要完成业务逻辑的实现：",-1),B=o("",10);function x(V,J,L,N,Q,E){const e=i("Image");return l(),p("div",null,[r,s(e,{alt:"image",src:"https://s0.lgstatic.com/i/image/M00/1F/8C/Ciqc1F7nGACANU7zAADej4U_wPQ598.png"}),a(),h,s(e,{alt:"image",src:"https://s0.lgstatic.com/i/image/M00/1F/8D/Ciqc1F7nGDCARTTCAAC8BTUPGAU300.png"}),a(),c,g,d,s(e,{alt:"image",src:"https://s0.lgstatic.com/i/image/M00/1F/98/CgqCHl7nGD2AVKdWAAFiWjlhmkI041.png"}),a(),m,u,s(e,{alt:"image",src:"https://s0.lgstatic.com/i/image/M00/20/F2/CgqCHl7piT6AICl8AAEF_s70Scc942.png"}),a(),A,s(e,{alt:"image",src:"https://s0.lgstatic.com/i/image/M00/1F/98/CgqCHl7nGFGAXKk0AACCxF6OwYE181.png"}),a(),S,s(e,{alt:"image",src:"https://s0.lgstatic.com/i/image/M00/1F/8D/Ciqc1F7nGF-AaBJ0AACkmf13Mrs619.png"}),a(),C,T,s(e,{alt:"image",src:"https://s0.lgstatic.com/i/image/M00/1F/99/CgqCHl7nGGyALUltAAES1F4HWIA969.png"}),a(),q,s(e,{alt:"image",src:"https://s0.lgstatic.com/i/image/M00/1F/8D/Ciqc1F7nGHqAdJD9AACzVB1hs2Y585.png"}),a(),D,P,b,s(e,{alt:"image",src:"https://s0.lgstatic.com/i/image/M00/1F/99/CgqCHl7nGIaAcKbyAADgC4g1mPo753.png"}),a(),I,k,F,M,f,s(e,{alt:"image",src:"https://s0.lgstatic.com/i/image/M00/1F/8D/Ciqc1F7nGJKABmlgAAD2wWQcUJM917.png"}),a(),B])}const R=n(_,[["render",x]]);export{y as __pageData,R as default};
