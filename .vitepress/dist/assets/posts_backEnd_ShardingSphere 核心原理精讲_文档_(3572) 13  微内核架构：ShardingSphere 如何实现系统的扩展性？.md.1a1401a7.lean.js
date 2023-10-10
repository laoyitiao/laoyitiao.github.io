import{_ as e,j as o,o as r,g as t,k as l,h as s,Q as p,s as n}from"./chunks/framework.cfb14fe0.js";const k=JSON.parse('{"title":"13微内核架构：ShardingSphere如何实现系统的扩展性？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/ShardingSphere 核心原理精讲_文档/(3572) 13  微内核架构：ShardingSphere 如何实现系统的扩展性？.md","filePath":"posts/backEnd/ShardingSphere 核心原理精讲_文档/(3572) 13  微内核架构：ShardingSphere 如何实现系统的扩展性？.md","lastUpdated":1696682708000}'),c={name:"posts/backEnd/ShardingSphere 核心原理精讲_文档/(3572) 13  微内核架构：ShardingSphere 如何实现系统的扩展性？.md"},E=p("",8),y=n("p",null,"微内核架构模式为这种实现扩展性的思路提供了架构设计上的支持，ShardingSphere 基于微内核架构实现了高度的扩展性。在介绍如何实现微内核架构之前，我们先对微内核架构的具体组成结构和基本原理做简要的阐述。",-1),i=n("h4",{id:"什么是微内核架构-1",tabindex:"-1"},[s("什么是微内核架构？ "),n("a",{class:"header-anchor",href:"#什么是微内核架构-1","aria-label":'Permalink to "什么是微内核架构？"'},"​")],-1),d=n("p",null,[s("从组成结构上讲， "),n("strong",null,"微内核架构包含两部分组件：内核系统和插件"),s(" 。这里的内核系统通常提供系统运行所需的最小功能集，而插件是独立的组件，包含自定义的各种业务代码，用来向内核系统增强或扩展额外的业务能力。在 ShardingSphere 中，前面提到的分布式主键就是插件，而 ShardingSphere 的运行时环境构成了内核系统。")],-1),g=n("p",null,[s("那么这里的插件具体指的是什么呢？这就需要我们明确两个概念，一个概念就是经常在说的 "),n("strong",null,"API"),s(" ，这是系统对外暴露的接口。而另一个概念就是 "),n("strong",null,"SPI"),s("（Service Provider Interface，服务提供接口），这是插件自身所具备的扩展点。就两者的关系而言，API 面向业务开发人员，而 SPI 面向框架开发人员，两者共同构成了 ShardingSphere 本身。")],-1),F=p("",15),S=p("",22),h=n("p",null,"SQLParserEntry 实现类图",-1),C=n("p",null,"我们先来看针对 MySQL 的代码工程 shardingsphere-sql-parser-mysql，在 META-INF/services 目录下，我们找到了一个 org.apache.shardingsphere.sql.parser.spi.SQLParserEntry 文件:",-1),u=n("p",null,"MySQL 代码工程中的 SPI 配置",-1),v=n("p",null,"可以看到这里指向了 org.apache.shardingsphere.sql.parser.MySQLParserEntry 类。再来到 Oracle 的代码工程 shardingsphere-sql-parser-oracle，在 META-INF/services 目录下，同样找到了一个 org.apache.shardingsphere.sql.parser.spi.SQLParserEntry 文件：",-1),A=p("",12),D=p("",13);function f(I,P,_,B,T,b){const a=o("Image");return r(),t("div",null,[E,l(a,{alt:"image.png",src:"https://s0.lgstatic.com/i/image/M00/39/0C/CgqCHl8esVaAVlUFAACJmGjQZDA482.png"}),s(),y,i,d,l(a,{alt:"image (1).png",src:"https://s0.lgstatic.com/i/image/M00/39/0C/CgqCHl8esWOAJ-5cAACfxz06p_E616.png"}),s(),g,l(a,{alt:"image (2).png",src:"https://s0.lgstatic.com/i/image/M00/39/01/Ciqc1F8esXOADonEAACE9HEUTJc298.png"}),s(),F,l(a,{alt:"image (3).png",src:"https://s0.lgstatic.com/i/image/M00/39/01/Ciqc1F8esYqAdXABAADVVh6mYnA926.png"}),s(),S,l(a,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image/M00/38/CB/Ciqc1F8ed26ANXCOAAArBJH3uDs890.png"}),s(),h,C,l(a,{alt:"Drawing 5.png",src:"https://s0.lgstatic.com/i/image/M00/38/D7/CgqCHl8ed3aABqWdAABTnSG89Jg177.png"}),s(),u,v,l(a,{alt:"Drawing 6.png",src:"https://s0.lgstatic.com/i/image/M00/38/CB/Ciqc1F8ed4GABKlZAABTzlYzJvc755.png"}),s(),A,l(a,{alt:"Drawing 7.png",src:"https://s0.lgstatic.com/i/image/M00/38/D9/CgqCHl8eekGAa88DAABIbz4-Q20783.png"}),s(),D])}const L=e(c,[["render",f]]);export{k as __pageData,L as default};
