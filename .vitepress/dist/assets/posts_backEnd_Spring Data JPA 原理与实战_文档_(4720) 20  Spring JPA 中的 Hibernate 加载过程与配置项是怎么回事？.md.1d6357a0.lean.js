import{_ as l,j as e,o as t,g as r,k as a,s,h as o,Q as p}from"./chunks/framework.b3d8e22e.js";const H=JSON.parse('{"title":"Hibernate 架构分析 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/Spring Data JPA 原理与实战_文档/(4720) 20  Spring JPA 中的 Hibernate 加载过程与配置项是怎么回事？.md","filePath":"posts/backEnd/Spring Data JPA 原理与实战_文档/(4720) 20  Spring JPA 中的 Hibernate 加载过程与配置项是怎么回事？.md","lastUpdated":1696417798000}'),c={name:"posts/backEnd/Spring Data JPA 原理与实战_文档/(4720) 20  Spring JPA 中的 Hibernate 加载过程与配置项是怎么回事？.md"},E=s("p",null,"你好，欢迎来到第 20 讲。前面我们已经学习完了两个模块：基础知识以及高阶用法与实战的内容，不知道你掌握得如何，有疑问的地方一定要留言提问，或者和大家一起讨论，请记住学习的路上你不是一个人在战斗。",-1),i=s("p",null,'那么从这一讲开始，我们进入"模块三：原理与问题排查"知识的学习。这一模块，我将带你了解Hibernate 的加载过程、Session 和事务之间的关系，帮助你知道在遇到 LazyException 以及经典的 N+1 SQL 问题时该如何解决，希望你在工作中可以灵活运用所学知识。',-1),y=s("p",null,"这一讲，我们来分析一下在 Spring Data JPA 的项目下面 Hibernate 的配置参数有哪些，先从 Hibernate 的整体架构进行分析。",-1),_=s("h3",{id:"hibernate-架构分析",tabindex:"-1"},[o("Hibernate 架构分析 "),s("a",{class:"header-anchor",href:"#hibernate-架构分析","aria-label":'Permalink to "Hibernate 架构分析"'},"​")],-1),u=s("p",null,"首先看一下 Hibernate 5.2 版本中，官方提供的架构图。",-1),A=s("p",null,"从架构图上，我们可以知道 Hiberante 实现的 ORM 的接口有两种，一种是 Hiberante 自己的 API 接口；一种是 Java Persistence API 的接口实现。",-1),F=s("p",null,"因为 Hibernate 其实是比 Java Persistence API 早几年发展的，后来才有了 Java 的持久化协议。以我个人的观点来看，随着时间的推移，Hiberante 的实现逻辑可能会逐渐被弱化，由 Java Persistence API 统一对外提供服务。",-1),g=s("p",null,"那么有了这个基础，我们研究 Hibernate 在 Spring Data JPA 里面的作用，得出的结论就是：Hibernate 5.2 是 Spring Data JPA 持久化操作的核心。我们再从类上面具体看一下，关键类的图如下所示：",-1),S=s("p",null,"结合类的关系图来看，Session 接口和 SessionFactory 接口都是 Hibernate 的概念，而 EntityManger 和 EntityManagerFactory 都是 Java Persistence API 协议规定的接口。",-1),C=s("p",null,"不过 HibernateEntityManger 从 Hibernate 5.2 之后就开始不推荐使用了，而是建议直接使用 EntityManager 接口即可。那么我们看看 Hibernate 在 Spring BOOT 里面是如何被加载进去的。",-1),q=s("h3",{id:"hibernate-5-在-spring-boot-2-里面的加载过程",tabindex:"-1"},[o("Hibernate 5 在 Spring Boot 2 里面的加载过程 "),s("a",{class:"header-anchor",href:"#hibernate-5-在-spring-boot-2-里面的加载过程","aria-label":'Permalink to "Hibernate 5 在 Spring Boot 2 里面的加载过程"'},"​")],-1),h=s("p",null,"不同的 Spring Boot 版本，可能加载类的实现逻辑是不一样的，但是分析过程都是相同的。我们先打开 spring.factories 文件，如下图所示，其中可以自动加载 Hibernate 的只有一个类，那就是 HibernateJpaAutoConfiguration。",-1),b=p("",5),D=p("",14),d=p("",10),T=p("",13),R=p("",6),O=p("",6),I=p("",10);function N(B,L,m,P,M,v){const n=e("Image");return t(),r("div",null,[E,i,y,_,u,a(n,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image/M00/6F/45/CgqCHl-08OiAT8tUAAAtx02IC70594.png"}),A,F,g,a(n,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image/M00/6F/45/CgqCHl-08PGACMAWAABkBYWN3EQ292.png"}),S,C,q,h,a(n,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image/M00/6F/3A/Ciqc1F-08PqAOGq1AAPvvo_ZD7w314.png"}),b,a(n,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image/M00/6F/3A/Ciqc1F-08Q6AR-PoAAGybbuAJ7g272.png"}),D,a(n,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image/M00/6F/45/CgqCHl-08RuALMNSAAKTACKebbE349.png"}),d,a(n,{alt:"Drawing 5.png",src:"https://s0.lgstatic.com/i/image/M00/6F/45/CgqCHl-08SmAc9J8AARC3m5NP2o468.png"}),T,a(n,{alt:"Drawing 6.png",src:"https://s0.lgstatic.com/i/image/M00/6F/45/CgqCHl-08UuABFufAAFail5ZuqU603.png"}),R,a(n,{alt:"Drawing 7.png",src:"https://s0.lgstatic.com/i/image/M00/6F/45/CgqCHl-08VmASV72AAJavgahY_A852.png"}),O,a(n,{alt:"Drawing 8.png",src:"https://s0.lgstatic.com/i/image/M00/6F/3A/Ciqc1F-08WGAaqVkAAR8a19UBFQ188.png"}),I])}const j=l(c,[["render",N]]);export{H as __pageData,j as default};
