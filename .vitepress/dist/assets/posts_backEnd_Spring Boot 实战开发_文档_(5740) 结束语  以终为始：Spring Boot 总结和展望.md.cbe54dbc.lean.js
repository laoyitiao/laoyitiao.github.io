import{_ as i,j as r,o as e,g as a,k as t,h as n,Q as g,s as o}from"./chunks/framework.4e7d56ce.js";const T=JSON.parse('{"title":"结束语以终为始：SpringBoot总结和展望","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/Spring Boot 实战开发_文档/(5740) 结束语  以终为始：Spring Boot 总结和展望.md","filePath":"posts/backEnd/Spring Boot 实战开发_文档/(5740) 结束语  以终为始：Spring Boot 总结和展望.md","lastUpdated":1696682708000}'),s={name:"posts/backEnd/Spring Boot 实战开发_文档/(5740) 结束语  以终为始：Spring Boot 总结和展望.md"},S=g("",27),l=o("p",null,"Spring WebFlux 架构图（来自 Spring 官网）",-1),_=o("p",null,"在图中我们可以看到，上图左侧为基于 Spring Webflux 的技术栈，右侧为基于 Spring MVC 的技术栈。我们知道传统的 Spring MVC 是在 Java EE 的 Servlet 标准之上进行构建的，该标准本身就是阻塞式和同步式。而 Spring WebFlux 基于响应式流进行构建，因此我们可以使用它来构建异步非阻塞的服务。",-1),c=o("p",null,"随着 WebFlux 等响应式编程技术的兴起，它为构建具有即时响应性和回弹性的应用程序提供了一个很好的技术基础。",-1),B=o("p",null,"我们知道一个分布式系统中，可能存在数十乃至数百个独立的 Web 应用程序，它们之间互相通信以完成复杂的业务流程，而这个过程势必涉及大量的 I/O 操作。",-1),d=o("p",null,"一旦涉及 I/O 操作，尤其是阻塞式 I/O 操作将会整体增加系统的延迟并降低吞吐量。如果我们能够在复杂的流程中集成非阻塞、异步通信机制，就可以高效处理跨服务之间的网络请求。针对这种场景，WebFlux 也是一种非常有效的解决方案。",-1),h=o("p",null,"下面我们再来看一下 Spring Boot 2 的另一张官网架构图，如下图所示：",-1),u=o("p",null,"Spring Boot 2 架构图（来自 Spring 官网）",-1),b=o("p",null,"从图中我们可以看到，上图底部将 Spring Data 明确划分为两大类型：一类是支持 JDBC、JPA 和部分 NoSQL 的传统 Spring Data Repository，另一类则是支持 Mongo、Cassandra、Redis、Couchbase 等的响应式 Spring Data Reactive Repository。",-1),m=o("p",null,"这张图背后的意义在于，Spring Boot 可以帮助我们构建从 Web 服务层到数据访问层的全栈式响应式编程技术，从而确保系统的各个环节都具备即时响应性。",-1),A=o("p",null,"未来，让我们一起期待响应式编程技术与 Spring Boot 框架之间更加紧密的整合吧。",-1),W=o("p",null,"至此，整个《Spring Boot 实战开发》课程就全部介绍完毕了。最后，祝大家在各自的岗位上更上一层楼！",-1);function f(C,x,v,k,q,P){const p=r("Image");return e(),a("div",null,[S,t(p,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image6/M00/02/32/Cgp9HWAdAZCAB17fAACQeZA8Cyk925.png"}),n(),l,_,c,B,d,h,t(p,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image6/M00/02/30/CioPOWAdAZ2AMVhnAACWjgTTFkY662.png"}),n(),u,b,m,A,W])}const E=i(s,[["render",f]]);export{T as __pageData,E as default};
