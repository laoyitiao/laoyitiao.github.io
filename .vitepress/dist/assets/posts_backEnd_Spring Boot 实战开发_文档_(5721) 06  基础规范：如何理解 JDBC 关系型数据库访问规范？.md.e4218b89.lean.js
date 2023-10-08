import{_ as o,j as e,o as t,g as c,k as p,h as n,s,Q as l}from"./chunks/framework.4e7d56ce.js";const V=JSON.parse('{"title":"06基础规范：如何理解JDBC关系型数据库访问规范？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/Spring Boot 实战开发_文档/(5721) 06  基础规范：如何理解 JDBC 关系型数据库访问规范？.md","filePath":"posts/backEnd/Spring Boot 实战开发_文档/(5721) 06  基础规范：如何理解 JDBC 关系型数据库访问规范？.md","lastUpdated":1696682708000}'),r={name:"posts/backEnd/Spring Boot 实战开发_文档/(5721) 06  基础规范：如何理解 JDBC 关系型数据库访问规范？.md"},E=s("h1",{id:"_06基础规范-如何理解jdbc关系型数据库访问规范",tabindex:"-1"},[n("06基础规范：如何理解JDBC关系型数据库访问规范？ "),s("a",{class:"header-anchor",href:"#_06基础规范-如何理解jdbc关系型数据库访问规范","aria-label":'Permalink to "06基础规范：如何理解JDBC关系型数据库访问规范？"'},"​")],-1),y=s("p",null,"从今天开始，我们将进入 Spring Boot 另一个核心技术体系的讨论，即数据访问技术体系。无论是互联网应用还是传统软件，对于任何一个系统而言，数据的存储和访问都是不可缺少的。",-1),i=s("p",null,"数据访问层的构建可能会涉及多种不同形式的数据存储媒介，本课程关注的是最基础也是最常用的数据存储媒介，即关系型数据库，针对关系型数据库，Java 中应用最广泛的就是 JDBC 规范，今天我们将对这个经典规范展开讨论。",-1),d=s("p",null,"JDBC 是 Java Database Connectivity 的全称，它的设计初衷是提供一套能够应用于各种数据库的统一标准，这套标准需要不同数据库厂家之间共同遵守，并提供各自的实现方案供 JDBC 应用程序调用。",-1),u=s("p",null,"作为一套统一标准，JDBC 规范具备完整的架构体系，如下图所示：",-1),D=l("",18),F=s("p",null,"DataSource 类层结构图",-1),S=s("p",null,"其中，DataSource 是官方定义的获取 Connection 的基础接口，XADataSource 用来在分布式事务环境下实现 Connection 的获取，而 ConnectionPoolDataSource 是从连接池 ConnectionPool 中获取 Connection 的接口。",-1),C=s("p",null,"所谓的 ConnectionPool 相当于预先生成一批 Connection 并存放在池中，从而提升 Connection 获取的效率。",-1),h=s("p",null,"请注意 DataSource 接口同时还继承了一个 Wrapper 接口。从接口的命名上看，我们可以判断该接口起到一种包装器的作用。事实上，因为很多数据库供应商提供了超越标准 JDBC API 的扩展功能，所以 Wrapper 接口可以把一个由第三方供应商提供的、非 JDBC 标准的接口包装成标准接口。",-1),g=s("p",null,"以 DataSource 接口为例，如果我们想自己实现一个定制化的数据源类 MyDataSource，就可以提供一个实现了 Wrapper 接口的 MyDataSourceWrapper 类来完成包装和适配，如下图所示：",-1),A=s("p",null,"通过 Wrapper 接口扩展 JDBC 规范示意图",-1),B=s("p",null,"在 JDBC 规范中，除了 DataSource 之外，Connection、Statement、ResultSet 等核心对象也都继承了这个 Wrapper 接口。",-1),m=s("p",null,"作为一种基础组件，它同样不需要开发人员自己实现 DataSource，因为业界已经存在了很多优秀的实现方案，如 DBCP、C3P0 和 Druid 等。",-1),v=s("p",null,"例如 Druid 提供了 DruidDataSource，它不仅提供了连接池的功能，还提供了诸如监控等其他功能，它的类层结构如下图所示：",-1),_=l("",25),b=s("p",null,"基于 JDBC 规范进行数据库访问的开发流程图",-1),x=s("p",null,"针对前面所介绍的代码示例，我们明确地将基于 JDBC 规范访问关系型数据库的操作分成两大部分：一部分是准备和释放资源以及执行 SQL 语句，另一部分则是处理 SQL 执行结果。",-1),L=s("p",null,'而对于任何数据访问而言，前者实际上都是重复的。在上图所示的整个开发流程中，事实上只有"处理 ResultSet "部分的代码需要开发人员根据具体的业务对象进行定制化处理。这种抽象为整个执行过程提供了优化空间。诸如 Spring 框架中 JdbcTemplate 这样的模板工具类就应运而生了，我们会在 07 讲中会详细介绍这个模板工具类。',-1),q=s("h3",{id:"小结与预告",tabindex:"-1"},[n("小结与预告 "),s("a",{class:"header-anchor",href:"#小结与预告","aria-label":'Permalink to "小结与预告"'},"​")],-1),Q=s("p",null,"JDBC 规范是 Java EE 领域中进行数据库访问的标准规范，在业界应用非常广泛。今天的课程中，我们分析了该规范的核心编程对象，并梳理了使用 JDBC 规范访问数据库的开发流程。希望你能熟练掌握这部分知识，因为熟练掌握 JDBC 规范是我们理解后续内容的基础。",-1),P=s("p",null,"这里给你留一道思考题：在使用 JDBC 规范时，开发人员主要应用哪些编程对象完成对数据库的访问？",-1),J=s("p",null,"尽管 JDBC 规范非常经典，但其所提供的 API 过于面向底层，对于开发人员来说并不友好。因此 07 讲中，我们将引入 Spring 框架中提供的 JdbcTemplate 模板工具类来简化 JDBC 规范的使用方法。",-1);function w(k,j,f,M,R,I){const a=e("Image");return t(),c("div",null,[E,y,i,d,u,p(a,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image/M00/78/46/CgqCHl_J3f2AMaTEAADODtTLjeA995.png"}),n(),D,p(a,{alt:"图片3.png",src:"https://s0.lgstatic.com/i/image2/M01/05/2A/CgpVE1_9BRyALcLiAACsqMysPwQ396.png"}),n(),F,S,C,h,g,p(a,{alt:"图片4.png",src:"https://s0.lgstatic.com/i/image6/M01/39/CE/Cgp9HWB8_iWABX6dAAC2_bCPSoQ200.png"}),n(),A,B,m,v,p(a,{alt:"图片5.png",src:"https://s0.lgstatic.com/i/image2/M01/05/2A/CgpVE1_9BS-AEQNBAABgakhN868633.png"}),n(),_,p(a,{alt:"Drawing 10.png",src:"https://s0.lgstatic.com/i/image/M00/78/3B/Ciqc1F_J3jmANBxqAADebgJ5BdU438.png"}),n(),b,x,L,q,Q,P,J])}const W=o(r,[["render",w]]);export{V as __pageData,W as default};
