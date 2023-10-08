import{_ as e,j as r,o as _,g as i,k as s,h as o,Q as a,s as t}from"./chunks/framework.4e7d56ce.js";const tt=JSON.parse('{"title":"01追本溯源：究竟什么样的架构才是微服务架构？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/Spring Cloud 原理与实战_文档/(4746) 01  追本溯源：究竟什么样的架构才是微服务架构？.md","filePath":"posts/backEnd/Spring Cloud 原理与实战_文档/(4746) 01  追本溯源：究竟什么样的架构才是微服务架构？.md","lastUpdated":1696682708000}'),l={name:"posts/backEnd/Spring Cloud 原理与实战_文档/(4746) 01  追本溯源：究竟什么样的架构才是微服务架构？.md"},p=a("",3),g=a("",5),c=t("p",null,"电商系统的典型领域划分示意图",-1),h=t("p",null,[o("另一方面，服务建模本质上是一个为了满足业务需求，并通过技术手段将这些业务需求转换为可实现服务的过程。服务围绕业务能力建模，而业务能力往往体现的是一种"),t("strong",null,"分层结构"),o("。")],-1),d=t("p",null,[o("按照我的经验，我们可以把业务体系中的服务分成如下几种类型："),t("strong",null,"基础服务、通用服务、定制服务"),o(" 和"),t("strong",null,"其他服务"),o("等。这里，我们同样给出基于电商场景的业务服务分层示例图，如下所示：")],-1),u=a("",5),A=t("p",null,"微服务架构八大技术体系图",-1),m=t("p",null,"上图中的每个技术体系都非常重要，下面来对它们分别展开介绍。",-1),C=t("h4",{id:"_1-服务通信",tabindex:"-1"},[o("1. 服务通信 "),t("a",{class:"header-anchor",href:"#_1-服务通信","aria-label":'Permalink to "1. 服务通信"'},"​")],-1),S=t("p",null,[o("网络通信是任何分布式系统的基础组件。网络通信本身涉及面很广，对于微服务架构而言，我们关注的是"),t("strong",null,"网络连接模式"),o(" 、"),t("strong",null,"I/O 模型"),o(" 和"),t("strong",null,"服务调用方式"),o("。")],-1),T=a("",7),b=t("p",null,"服务注册中心的作用",-1),D=t("p",null,"服务注册中心是保存服务调用所需的路由信息的存储仓库，也是服务提供者和服务消费者进行交互的媒介，充当着服务注册和发现服务器的作用。诸如 Dubbo、Spring Cloud 等主流的微服务框架都基于 Zookeeper、Eureka 等分布式系统协调工具构建了服务注册中心。",-1),I=t("h4",{id:"_3-服务路由",tabindex:"-1"},[o("3.服务路由 "),t("a",{class:"header-anchor",href:"#_3-服务路由","aria-label":'Permalink to "3.服务路由"'},"​")],-1),k=t("p",null,"我们现在已经通过注册中心构建了一个多服务的集群化环境中，当客户端请求到达集群，如何确定由哪一台服务器进行请求响应呢？这就是服务路由问题。可以认为负载均衡是最常见的一种路由方案，常见的客户端/服务器端负载均衡技术都可以完成服务路由。Spring Cloud 等主流的微服务框架也都内置了 Ribbon 等客户端负载均衡组件。",-1),P=t("p",null,"注册中心与负载均衡结构示意图",-1),q=t("p",null,"另一方面，负载均衡的出发点更多的是提供服务分发而不是解决路由问题，常见的静态、动态负载均衡算法也无法实现精细化的路由管理。这时候我们就可以采用路由规则。路由规则常见的实现方案是白名单或黑名单，即把需要路由的服务地址信息（如服务 IP）放入可以控制是否可见的路由池中进行路由。同样，路由规则也是微服务开发框架的一项常见功能。",-1),f=t("h4",{id:"_4-服务容错",tabindex:"-1"},[o("4.服务容错 "),t("a",{class:"header-anchor",href:"#_4-服务容错","aria-label":'Permalink to "4.服务容错"'},"​")],-1),x=t("p",null,"对于分布式环境中的服务而言，服务在自身失败引发生错误的同时，还会因为依赖其他服务而导致失败。除了比较容易想到和实现的超时、重试和异步解耦等手段之外，我们需要考虑针对各种场景的容错机制。",-1),M=t("p",null,"服务容错常见技术",-1),w=t("p",null,"业界存在一批与服务容错相关的技术组件，包括以失效转移 Failover 为代表的集群容错策略，以线程隔离、进程隔离为代表的服务隔离机制，以滑动窗口、令牌桶算法为代表的服务限流机制，以及服务熔断机制。而从技术实现方式上看，在 Spring Cloud 中，这些机制部分包含在下面要介绍的服务网关中，而另一部分则被提炼成单独的开发框架，例如专门用于实现服务熔断的 Spring Cloud Circuit Breaker 组件。",-1),F=t("h4",{id:"_5-服务网关",tabindex:"-1"},[o("5.服务网关 "),t("a",{class:"header-anchor",href:"#_5-服务网关","aria-label":'Permalink to "5.服务网关"'},"​")],-1),V=t("p",null,"服务网关也叫 API 网关，封装了系统内部架构，为每个客户端提供一个定制的 API。在微服务架构中，服务网关的核心要点是，所有的客户端和消费端都通过统一的网关接入微服务，在网关层处理所有的非业务功能。",-1),B=t("p",null,"服务网关的功能",-1),E=t("p",null,"在功能设计上，服务网关在完成客户端与服务器端报文格式转换的同时，它可能还具有身份验证、监控、缓存、请求管理、静态响应处理等功能。另一方面，也可以在网关层制定灵活的路由策略。针对一些特定的 API，我们需要设置白名单、路由规则等各类限制。在本课程中，我们会基于 Netflix Zuul 和 Spring Cloud Gateway 这两种网关对这些功能分别展开介绍。",-1),G=t("h4",{id:"_6-服务配置",tabindex:"-1"},[o("6.服务配置 "),t("a",{class:"header-anchor",href:"#_6-服务配置","aria-label":'Permalink to "6.服务配置"'},"​")],-1),N=t("p",null,"在微服务架构中，考虑到服务数量和配置信息的分散性，一般都需要引入配置中心的设计思想和相关工具。与注册中心一样，配置中心也是微服务架构中的基础组件，其目的也是对服务进行统一管理，区别在于配置中心管理的对象是配置信息而不是服务的实例信息。",-1),O=t("p",null,"配置中心与注册中心结构示意图",-1),R=t("p",null,"为了满足以上要求，配置中心通常需要依赖分布式协调机制，即通过一定的方法确保配置信息在分布式环境中的各个服务中能得到实时、一致的管理。可以采用诸如 Zookeeper 等主流的开源分布式协调框架来构建配置中心。当然，像 Spring Cloud 也提供了专门的配置中心实现工具 Spring Cloud Config。",-1),H=t("h4",{id:"_7-服务安全",tabindex:"-1"},[o("7.服务安全 "),t("a",{class:"header-anchor",href:"#_7-服务安全","aria-label":'Permalink to "7.服务安全"'},"​")],-1),v=t("p",null,"在对微服务架构的学习过程中，服务安全是一块非常重要但又容易被忽视的内容。一般意义上的访问安全性，都是围绕认证和授权这两个核心概念来展开的。也就是说我们首先需要确定用户身份，然后再确定这个用户是否有访问指定资源的权限。站在单个微服务的角度讲，我们系统每次服务访问都能与授权服务器进行集成以便获取访问 Token。站在多个服务交互的角度讲，我们需要确保 Token 在各个微服务之间的有效传播。另一方面，服务内部，我们可以使用不同的访问策略限制服务资源的访问。",-1),y=t("p",null,"基于 Token 机制的服务安全结构图",-1),Z=t("p",null,"在实现微服务安全访问上，我们通常使用 OAuth2 协议来实现对服务访问的授权机制，使用 JWT 技术来构建轻量级的认证体系。Spring 家族也提供了 Spring Security 和 Spring Cloud Security 框架来完整这些组件的构建。",-1),W=t("h4",{id:"_8-服务监控",tabindex:"-1"},[o("8.服务监控 "),t("a",{class:"header-anchor",href:"#_8-服务监控","aria-label":'Permalink to "8.服务监控"'},"​")],-1),L=t("p",null,"在微服务架构中，当服务数量达到一定量级时，我们难免会遇到两个核心问题。一个是如何管理服务之间的调用关系？另一个是如何跟踪业务流的处理过程和结果？这就需要构建分布式服务跟踪机制。",-1),Q=a("",8);function X($,z,j,J,K,U){const n=r("Image");return _(),i("div",null,[p,s(n,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image/M00/53/00/Ciqc1F9oF2eAWmXfAABGIP6n67s572.png"}),o(),g,s(n,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image/M00/53/0D/CgqCHl9oGBeAbTgHAABTRP2uDhA258.png"}),o(),c,h,d,s(n,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image/M00/53/0D/CgqCHl9oGB-AXhkpAABlm8xE9Ik898.png"}),o(),u,s(n,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image/M00/53/0E/CgqCHl9oGEeAdhDIAABR73xIec0986.png"}),o(),A,m,C,S,s(n,{alt:"Lark20200921-134148.png",src:"https://s0.lgstatic.com/i/image/M00/53/5D/CgqCHl9oPTWAez40AADTRo_y76k143.png"}),o(),T,s(n,{alt:"Drawing 5.png",src:"https://s0.lgstatic.com/i/image/M00/53/04/Ciqc1F9oGIiAKS7dAAAqT5bZobI453.png"}),o(),b,D,I,k,s(n,{alt:"Drawing 6.png",src:"https://s0.lgstatic.com/i/image/M00/53/04/Ciqc1F9oGKyAXomhAAA9IT15qWs245.png"}),o(),P,q,f,x,s(n,{alt:"Drawing 7.png",src:"https://s0.lgstatic.com/i/image/M00/53/0F/CgqCHl9oGLWAQitXAAA0rxepH8Q195.png"}),o(),M,w,F,V,s(n,{alt:"Drawing 8.png",src:"https://s0.lgstatic.com/i/image/M00/53/0F/CgqCHl9oGL6AO4hWAAAzBiIrSeo449.png"}),o(),B,E,G,N,s(n,{alt:"Drawing 9.png",src:"https://s0.lgstatic.com/i/image/M00/53/04/Ciqc1F9oGMaADBItAAAzv7Gk5Fo598.png"}),o(),O,R,H,v,s(n,{alt:"Drawing 10.png",src:"https://s0.lgstatic.com/i/image/M00/53/04/Ciqc1F9oGNiAaweRAAA6Qs55-Zs129.png"}),o(),y,Z,W,L,s(n,{alt:"Lark20200922-134031.png",src:"https://s0.lgstatic.com/i/image/M00/54/C0/CgqCHl9pjmmADR8HAAFHbsfR22k537.png"}),o(),Q])}const ot=e(l,[["render",X]]);export{tt as __pageData,ot as default};
