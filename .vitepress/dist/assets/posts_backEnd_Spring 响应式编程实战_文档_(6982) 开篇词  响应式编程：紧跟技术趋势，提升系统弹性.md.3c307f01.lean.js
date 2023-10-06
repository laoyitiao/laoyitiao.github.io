import{_ as i,j as r,o as a,g as _,k as e,h as n,s as t,Q as s}from"./chunks/framework.b3d8e22e.js";const H=JSON.parse('{"title":"响应式编程具有什么技术优势？ ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/Spring 响应式编程实战_文档/(6982) 开篇词  响应式编程：紧跟技术趋势，提升系统弹性.md","filePath":"posts/backEnd/Spring 响应式编程实战_文档/(6982) 开篇词  响应式编程：紧跟技术趋势，提升系统弹性.md","lastUpdated":1696417798000}'),p={name:"posts/backEnd/Spring 响应式编程实战_文档/(6982) 开篇词  响应式编程：紧跟技术趋势，提升系统弹性.md"},l=t("p",null,"你好，我是鉴湘，拥有 10 年以上大型 Java EE 和分布式系统的构建和优化经验，曾带领百人团队完成基于 Spring 家族技术体系的亿级用户规模互联网应用系统的建设工作，对基于 Spring 框架进行系统开发和维护有着丰富的实战经验，目前在一家创业企业任 CTO。",-1),g=t("p",null,"从业生涯中，我曾经带过不少项目。无论是传统电商类系统，还是智能终端平台，都面临着大流量、高并发的访问请求。在各种请求压力下，系统可能会出现一系列可用性问题，但作为系统的设计者，我们需要保证其拥有即时的响应性，如何时刻确保系统具有应对请求压力的弹性，成为一个非常现实且棘手的问题。",-1),c=t("p",null,[n("经典的服务隔离、限流、降级以及熔断等机制，能够在一定程度上实现系统的弹性。但我通过对比了更多可选的技术体系之后，发现了构建系统弹性的一种崭新的解决方案，那就是"),t("strong",null,"响应式编程"),n("。")],-1),d=t("h3",{id:"响应式编程具有什么技术优势",tabindex:"-1"},[n("响应式编程具有什么技术优势？ "),t("a",{class:"header-anchor",href:"#响应式编程具有什么技术优势","aria-label":'Permalink to "响应式编程具有什么技术优势？"'},"​")],-1),h=t("p",null,[t("strong",null,"响应式编程打破了传统的同步阻塞式编程模型，基于响应式数据流和背压机制实现了异步非阻塞式的网络通信、数据访问和事件驱动架构，能够减轻服务器资源之间的竞争关系，从而提高服务的响应能力"),n("。")],-1),u=t("p",null,"可以设想一下，当系统中存在的服务 A 需要访问服务 B 时，在服务 A 发出请求之后，执行线程会等待服务 B 的返回，这段时间该线程就是阻塞的，整个过程的 CPU 利用效率低下，很多时间线程被浪费在了 I/O 阻塞上，见下图：",-1),S=t("p",null,"服务 A 和服务 B 的交互过程图",-1),m=t("p",null,"更进一步，当你执行数据访问时，数据库的执行操作也面临着同样的阻塞式问题，整个请求链路的各个环节都会导致资源的浪费，从而降低系统弹性。而引入响应式编程技术，可以很好地解决这种问题。",-1),b=t("p",null,"说到这里，你可能会问，如何来应用响应式编程技术呢？它的开发过程是不是很有难度？",-1),A=t("p",null,[n("完全不用担心，因为 Spring 5 的正式发布，带来了响应式编程的全新发展时期。"),t("strong",null,"响应式编程是Spring 5版本中引入的最大变革，也是 Spring 目前重点推广的技术体系"),n("。Spring 5 中内嵌了响应式 Web 框架、响应式数据访问、响应式消息通信等多种响应式组件，从而极大简化了响应式应用程序的开发过程和难度。")],-1),C=t("h3",{id:"你为什么需要学习这门课程",tabindex:"-1"},[n("你为什么需要学习这门课程？ "),t("a",{class:"header-anchor",href:"#你为什么需要学习这门课程","aria-label":'Permalink to "你为什么需要学习这门课程？"'},"​")],-1),P=t("p",null,"当下，随着微服务架构的不断发展以及各种中间件技术的日益成熟，响应式编程所提供的异步非阻塞式编程模型非常适合用来构建技术驱动的服务化架构体系。",-1),f=t("p",null,"同时，各种新型互联网应用得到了高速发展，在各种流量压力之下，掌握应对这种压力相关技术的开发人员和架构师成为稀缺人才，被行业争抢。",-1),x=s("",8),R=s("",3),T=t("p",null,[n("此外，各个响应式编程核心组件以及基于 Spring 框架的实现方式，我都会按照完整的案例分析给出详细的代码实现方案，方便你进行学习和改造。课程配套代码，你可以在"),t("a",{href:"https://github.com/lagoueduCol/ReactiveProgramming-jianxiang.git?fileGuid=xxQTRXtVcqtHK6j8",target:"_blank",rel:"noreferrer"},"https://github.com/lagoueduCol/ReactiveProgramming-jianxiang.git"),n("进行下载。")],-1),k=t("h3",{id:"讲师寄语",tabindex:"-1"},[n("讲师寄语 "),t("a",{class:"header-anchor",href:"#讲师寄语","aria-label":'Permalink to "讲师寄语"'},"​")],-1),B=t("p",null,"在现代互联网应用系统开发过程中，即时响应是可用性和实用性的基石。如何使得系统具有弹性和伸缩性是一大挑战，我们需要引入新的架构模式和编程技术，以满足不断增长的对便捷高效服务的需求。而响应式编程代表的就是这样一种全新的编程模型，也是目前 Spring 家族框架中主推的一项技术体系。",-1),N=t("p",null,'对于开发者来说，掌握响应式编程将成为你实现自我提升的一个"契机"，能够让你脱颖而出，获取更多从事系统架构和优化，以及获取心仪大厂的 Offer 的机会。',-1),V=t("p",null,"最后，欢迎你在留言区分享相关经历和经验，我也将和你共同探讨，一起向前！",-1);function W(D,E,j,v,G,M){const o=r("Image");return a(),_("div",null,[l,g,c,d,h,u,e(o,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image6/M01/21/30/CioPOWBUG6KATK1_AACXEb1VXVw840.png"}),n(),S,m,b,A,C,P,f,e(o,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image6/M00/21/34/Cgp9HWBUG7WAFLQMAApLFtP4RU8441.png"}),n(),x,e(o,{alt:"Drawing 5.png",src:"https://s0.lgstatic.com/i/image6/M01/21/31/CioPOWBUG8GANZDnAAEppRV0il4397.png"}),n(),R,e(o,{alt:"Drawing 6.png",src:"https://s0.lgstatic.com/i/image6/M00/21/34/Cgp9HWBUG8uALiz3AAQqPoZFejk244.png"}),T,k,B,N,V])}const I=i(p,[["render",W]]);export{H as __pageData,I as default};
