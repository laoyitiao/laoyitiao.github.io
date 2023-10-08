import{_ as a,j as o,o as l,g as s,k as n,h as t,Q as i,s as r}from"./chunks/framework.a0d18f64.js";const x=JSON.parse('{"title":"03案例驱动：如何通过实战案例来学习SpringCloud框架？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/Spring Cloud 原理与实战_文档/(4748) 03  案例驱动：如何通过实战案例来学习 Spring Cloud 框架？.md","filePath":"posts/backEnd/Spring Cloud 原理与实战_文档/(4748) 03  案例驱动：如何通过实战案例来学习 Spring Cloud 框架？.md","lastUpdated":1696682708000}'),p={name:"posts/backEnd/Spring Cloud 原理与实战_文档/(4748) 03  案例驱动：如何通过实战案例来学习 Spring Cloud 框架？.md"},g=i("",8),_=r("p",null,"SpringHealth 的子域",-1),h=r("p",null,"为了演示起见，这里我们对每个子域所包含的内容尽量做了简化。所以，对每一个子域都只提取一个微服务作为示例。基于以上分析，我们可以把 SpringHealth 划分成三个微服务，即 user-service、device-service 和 intervention-service。下图展示了 SpringHealth 的基本架构，在图中，intervention-service 需要基于 REST 风格完成与 user-service 和 device-service 服务之间的远程交互。",-1),u=i("",17),d=r("p",null,"SpringHealth 服务列表",-1),c=r("h4",{id:"_2-服务数据",tabindex:"-1"},[t("2. 服务数据 "),r("a",{class:"header-anchor",href:"#_2-服务数据","aria-label":'Permalink to "2. 服务数据"'},"​")],-1),S=r("p",null,'关于微服务架构中各种数据的管理策略，业界也存在两大类不同的观点。一种观点是采用传统的集中式数据管理，即把所有数据存放在一个数据库中，然后通过专业的 DBA 进行统一管理。而站在服务独立性的角度讲，根据"**追本溯源：究竟什么样的架构才是微服务架构？"**中的讨论，微服务开发团队应该是全职能团队，所以微服务架构崇尚把数据也嵌入到微服务内部，由开发人员自己来进行管理。因此，在案例中，我们针对三个业务服务，也将建立独立的三个数据库，数据库的访问信息通过配置中心进行集中管理，如下图所示：',-1),C=r("p",null,"服务级别的独立数据库示意图",-1),m=r("h3",{id:"springhealth-代码工程",tabindex:"-1"},[t("SpringHealth：代码工程 "),r("a",{class:"header-anchor",href:"#springhealth-代码工程","aria-label":'Permalink to "SpringHealth：代码工程"'},"​")],-1),k=r("p",null,[t("虽然案例中的各个服务在物理上都是独立的微服务，但从整个系统而言，需要相互协作构成一个完整的微服务系统。也就是说，服务运行时上存在一定的依赖性。我们结合系统架构对 SpringHealth 的运行方式进行梳理，梳理的基本方法就是按照服务列表构建独立服务，并"),r("strong",null,"基于注册中心来管理它们之间的依赖关系"),t("，如下图所示：")],-1),A=i("",11);function b(H,f,v,T,q,E){const e=o("Image");return l(),s("div",null,[g,n(e,{alt:"Lark20200924-161905.png",src:"https://s0.lgstatic.com/i/image/M00/57/0F/Ciqc1F9sVt6AS2EvAAGEBoJRu5w931.png"}),t(),_,h,n(e,{alt:"Lark20200924-161917.png",src:"https://s0.lgstatic.com/i/image/M00/57/1A/CgqCHl9sVwqAPd3jAADSSbJlmag192.png"}),t(),u,n(e,{alt:"Lark20200924-161922.png",src:"https://s0.lgstatic.com/i/image/M00/57/0F/Ciqc1F9sVymAMXh-AAEaj_t9r5g097.png"}),t(),d,c,S,n(e,{alt:"Lark20200924-161924.png",src:"https://s0.lgstatic.com/i/image/M00/57/1B/CgqCHl9sV0GAflMuAAEgBy_HDhM795.png"}),t(),C,m,k,n(e,{alt:"Lark20200924-161926.png",src:"https://s0.lgstatic.com/i/image/M00/57/10/Ciqc1F9sV0uATNWEAADLl6S2WeE336.png"}),t(),A])}const V=a(p,[["render",b]]);export{x as __pageData,V as default};
