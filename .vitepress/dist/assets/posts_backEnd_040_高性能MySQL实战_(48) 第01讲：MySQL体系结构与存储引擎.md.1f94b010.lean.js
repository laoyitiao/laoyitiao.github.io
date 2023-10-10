import{_ as t,j as a,o as r,g as p,k as n,h as e,s as o,Q as i}from"./chunks/framework.cfb14fe0.js";const oo=JSON.parse('{"title":"第01讲：MySQL体系结构与存储引擎","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/040_高性能MySQL实战/(48) 第01讲：MySQL体系结构与存储引擎.md","filePath":"posts/backEnd/040_高性能MySQL实战/(48) 第01讲：MySQL体系结构与存储引擎.md","lastUpdated":1696682708000}'),s={name:"posts/backEnd/040_高性能MySQL实战/(48) 第01讲：MySQL体系结构与存储引擎.md"},_=o("h1",{id:"第01讲-mysql体系结构与存储引擎",tabindex:"-1"},[e("第01讲：MySQL体系结构与存储引擎 "),o("a",{class:"header-anchor",href:"#第01讲-mysql体系结构与存储引擎","aria-label":'Permalink to "第01讲：MySQL体系结构与存储引擎"'},"​")],-1),d=o("h6",{id:"mysql-体系结构",tabindex:"-1"},[e("MySQL 体系结构 "),o("a",{class:"header-anchor",href:"#mysql-体系结构","aria-label":'Permalink to "MySQL 体系结构"'},"​")],-1),c=o("p",null,'大家好，从这一课时我们开始正式进入 MySQL 的课程学习，本课时将讲解"MySQL 体系结构与存储引擎"。',-1),h=o("br",null,null,-1),S=o("p",null,"课程内容包括 MySQL 数据库的体系结构、MySQL 支持的存储引擎，InnoDB 能够取代 MyISAM 的原因和 InnoDB 几大核心特性。重点会介绍 InnoDB 存储的原理和特点，以 MySQL 5.6 版本为例介绍 MySQL 体系的结构组成，以及 MySQL 5.7 版本和 MySQL 8.0 版本做了哪些优化和改进。",-1),u=o("br",null,null,-1),M=o("p",null,"先看 MySQL 数据库的体系结构，如下图所示。",-1),y=i("",13),b=o("p",null,"①通过客户端/服务器通信协议与 MySQL 建立连接。",-1),I=o("p",null,"②查询缓存，这是 MySQL 的一个可优化查询的地方，如果开启了 Query Cache 且在查询缓存过程中查询到完全相同的 SQL 语句，则将查询结果直接返回给客户端；如果没有开启Query Cache 或者没有查询到完全相同的 SQL 语句则会由解析器进行语法语义解析，并生成解析树。",-1),A=o("p",null,"③预处理器生成新的解析树。",-1),B=o("p",null,"④查询优化器生成执行计划。",-1),f=o("p",null,"⑤查询执行引擎执行 SQL 语句，此时查询执行引擎会根据 SQL 语句中表的存储引擎类型，以及对应的 API 接口与底层存储引擎缓存或者物理文件的交互情况，得到查询结果，由MySQL Server 过滤后将查询结果缓存并返回给客户端。若开启了 Query Cache，这时也会将SQL 语句和结果完整地保存到 Query Cache 中，以后若有相同的 SQL 语句执行则直接返回结果。",-1),g=o("br",null,null,-1),L=o("p",null,"你也可以思考， INSERT 和 UPDATE 语句的执行流程是怎么样的，有哪些不同，来加深理解。当然，这类 DML 语句的执行过程可能会复杂一些。",-1),m=o("h6",{id:"存储引擎概述",tabindex:"-1"},[e("存储引擎概述 "),o("a",{class:"header-anchor",href:"#存储引擎概述","aria-label":'Permalink to "存储引擎概述"'},"​")],-1),D=o("p",null,"存储引擎是 MySQL 中具体与文件打交道的子系统，它是根据 MySQL AB 公司提供的文件访问层抽象接口定制的一种文件访问机制，这种机制就叫作存储引擎，下面是一些常用的存储引擎，有远古时期的 MyISAM、支持事务的 InnoDB、内存类型的 Memory、归档类型的 Archive、列式存储的 Infobright，以及一些新兴的存储引擎，以 RocksDB 为底层基础的 MyRocks 和 RocksDB，和以分形树索引组织存储的 TokuDB，当然现在还有极数云舟出品的分布式存储引擎 ArkDB，如下图所示。",-1),Q=o("p",null,"在 MySQL 5.6 版本之前，默认的存储引擎都是 MyISAM，但 5.6 版本以后默认的存储引擎就是 InnoDB 了。",-1),P=o("br",null,null,-1),T=o("p",null,"InnoDB 存储引擎的具体架构如下图所示。上半部分是实例层（计算层），位于内存中，下半部分是物理层，位于文件系统中。",-1),C=o("br",null,null,-1),k=i("",14),R=i("",17),V=o("br",null,null,-1),E=o("p",null,"接下来重点在功能和性能上对比 InnoDB 和 MyISAM。",-1),x=o("h6",{id:"功能对比",tabindex:"-1"},[e("功能对比 "),o("a",{class:"header-anchor",href:"#功能对比","aria-label":'Permalink to "功能对比"'},"​")],-1),O=o("p",null,"InnoDB 和 MyISAM 的功能对比如下图所示。",-1),q=i("",2),N=o("h2",{id:"性能对比",tabindex:"-1"},[e("性能对比 "),o("a",{class:"header-anchor",href:"#性能对比","aria-label":'Permalink to "性能对比"'},"​")],-1),F=o("p",null,"在性能对比上，InnoDB 也完胜 MyISAM，如下图所示。",-1),U=i("",7),v=i("",7),w=o("br",null,null,-1),G=o("br",null,null,-1),z=o("br",null,null,-1),K=o("br",null,null,-1);function H($,j,J,W,Z,Y){const l=a("Image");return r(),p("div",null,[_,d,c,h,S,u,M,n(l,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/EF/CgoB5l14ySKAdxe1AAo6wxtiDO8081.png"}),e(),y,n(l,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8B/0F/CgotOV14ySKAMxohAAH2VHcAzkE612.png"}),e(),b,I,A,B,f,g,L,m,D,n(l,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8B/0F/CgotOV14ySKAdS_UAAOuxOt5yHc274.png"}),e(),Q,P,T,C,n(l,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/EF/CgoB5l14ySOAT9VMAASFWIacodo791.png"}),e(),k,n(l,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8B/0F/CgotOV14ySOAck4ZAAItjZ-RV6o006.png"}),e(),R,n(l,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8B/0F/CgotOV14ySOAEhdFAAN3vQs9Cxc211.png"}),e(),V,E,x,O,n(l,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/EF/CgoB5l14ySOAS58YAAE8GVVK6Y8854.png"}),e(),q,n(l,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8B/0F/CgotOV14ySOAdnlgAAO_KRVPJz0877.png"}),e(),N,F,n(l,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8B/0F/CgotOV14ySSATuS8AALBl7EhXx4697.png"}),e(),U,n(l,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8B/0F/CgotOV14ySSANcbzAAgkmMU20Z4553.png"}),e(),v,n(l,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8B/0F/CgotOV14ySSATUGFAANLPCpEobA998.png"}),e(),w,G,z,K])}const eo=t(s,[["render",H]]);export{oo as __pageData,eo as default};
