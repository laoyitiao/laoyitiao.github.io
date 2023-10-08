import{_ as l,j as e,o as t,g as r,k as o,h as n,Q as p,s}from"./chunks/framework.4e7d56ce.js";const R=JSON.parse('{"title":"01Dubbo源码环境搭建：千里之行，始于足下","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/Dubbo源码解读与实战_文档/(4257) 01  Dubbo 源码环境搭建：千里之行，始于足下.md","filePath":"posts/backEnd/Dubbo源码解读与实战_文档/(4257) 01  Dubbo 源码环境搭建：千里之行，始于足下.md","lastUpdated":1696682708000}'),c={name:"posts/backEnd/Dubbo源码解读与实战_文档/(4257) 01  Dubbo 源码环境搭建：千里之行，始于足下.md"},E=p("",6),i=p("",14),y=s("p",null,"下面我们就来简单介绍一下这些核心模块的功能，至于详细分析，在后面的课时中我们还会继续讲解。",-1),u=s("ul",null,[s("li",null,[s("strong",null,"dubbo-common 模块："),n(" Dubbo 的一个公共模块，其中有很多工具类以及公共逻辑，例如课程后面紧接着要介绍的 Dubbo SPI 实现、时间轮实现、动态编译器等。")])],-1),b=s("ul",null,[s("li",null,[s("strong",null,"dubbo-remoting 模块："),n(" Dubbo 的远程通信模块，其中的子模块依赖各种开源组件实现远程通信。在 dubbo-remoting-api 子模块中定义该模块的抽象概念，在其他子模块中依赖其他开源组件进行实现，例如，dubbo-remoting-netty4 子模块依赖 Netty 4 实现远程通信，dubbo-remoting-zookeeper 通过 Apache Curator 实现与 ZooKeeper 集群的交互。")])],-1),d=s("ul",null,[s("li",null,[s("strong",null,"dubbo-rpc 模块："),n(" Dubbo 中对远程调用协议进行抽象的模块，其中抽象了各种协议，依赖于 dubbo-remoting 模块的远程调用功能。dubbo-rpc-api 子模块是核心抽象，其他子模块是针对具体协议的实现，例如，dubbo-rpc-dubbo 子模块是对 Dubbo 协议的实现，依赖了 dubbo-remoting-netty4 等 dubbo-remoting 子模块。 dubbo-rpc 模块的实现中只包含一对一的调用，不关心集群的相关内容。")])],-1),g=s("ul",null,[s("li",null,[s("p",null,[s("strong",null,"dubbo-cluster 模块："),n(" Dubbo 中负责管理集群的模块，提供了负载均衡、容错、路由等一系列集群相关的功能，最终的目的是将多个 Provider 伪装为一个 Provider，这样 Consumer 就可以像调用一个 Provider 那样调用 Provider 集群了。")])]),s("li",null,[s("p",null,[s("strong",null,"dubbo-registry 模块："),n(" Dubbo 中负责与多种开源注册中心进行交互的模块，提供注册中心的能力。其中， dubbo-registry-api 子模块是顶层抽象，其他子模块是针对具体开源注册中心组件的具体实现，例如，dubbo-registry-zookeeper 子模块是 Dubbo 接入 ZooKeeper 的具体实现。")])])],-1),D=s("ul",null,[s("li",null,[s("p",null,[s("strong",null,"dubbo-monitor 模块："),n(" Dubbo 的监控模块，主要用于统计服务调用次数、调用时间以及实现调用链跟踪的服务。")])]),s("li",null,[s("p",null,[s("strong",null,"dubbo-config 模块："),n(" Dubbo 对外暴露的配置都是由该模块进行解析的。例如，dubbo-config-api 子模块负责处理 API 方式使用时的相关配置，dubbo-config-spring 子模块负责处理与 Spring 集成使用时的相关配置方式。有了 dubbo-config 模块，用户只需要了解 Dubbo 配置的规则即可，无须了解 Dubbo 内部的细节。")])])],-1),m=s("ul",null,[s("li",null,[s("strong",null,"dubbo-metadata 模块："),n(" Dubbo 的元数据模块（本课程后续会详细介绍元数据的内容）。dubbo-metadata 模块的实现套路也是有一个 api 子模块进行抽象，然后其他子模块进行具体实现。")])],-1),F=s("ul",null,[s("li",null,[s("strong",null,"dubbo-configcenter 模块："),n(" Dubbo 的动态配置模块，主要负责外部化配置以及服务治理规则的存储与通知，提供了多个子模块用来接入多种开源的服务发现组件。")])],-1),v=p("",13),C=p("",5),A=p("",9),h=p("",23);function f(_,S,B,k,q,P){const a=e("Image");return t(),r("div",null,[E,o(a,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image/M00/38/AD/CgqCHl8eRaCAW4-LAAB7_C-aKWA601.png"}),n(),i,o(a,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image/M00/38/A2/Ciqc1F8eRcOAdzNmAADHxcenG7I722.png"}),n(),y,u,o(a,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image/M00/38/AD/CgqCHl8eRfWANQSTAAHowsC6F8s134.png"}),n(),b,o(a,{alt:"Drawing 5.png",src:"https://s0.lgstatic.com/i/image/M00/38/A2/Ciqc1F8eRgCAR30EAABc4PYop3w206.png"}),n(),d,o(a,{alt:"Drawing 6.png",src:"https://s0.lgstatic.com/i/image/M00/38/A2/Ciqc1F8eRguAA8jOAABqHomePJk138.png"}),n(),g,o(a,{alt:"Drawing 7.png",src:"https://s0.lgstatic.com/i/image/M00/38/AD/CgqCHl8eRhWANEiTAAB2ATuQ2vc619.png"}),n(),D,o(a,{alt:"Drawing 8.png",src:"https://s0.lgstatic.com/i/image/M00/38/AD/CgqCHl8eRhyAVJ43AAAaPAwMeQ4525.png"}),n(),m,o(a,{alt:"Drawing 9.png",src:"https://s0.lgstatic.com/i/image/M00/38/AD/CgqCHl8eRiSAPFIYAABXCRqgsNA891.png"}),n(),F,o(a,{alt:"Drawing 10.png",src:"https://s0.lgstatic.com/i/image/M00/38/AD/CgqCHl8eRiuAM7LfAAA9BmMR2zY483.png"}),n(),v,o(a,{alt:"Drawing 11.png",src:"https://s0.lgstatic.com/i/image/M00/38/AE/CgqCHl8eRlWAPwvCAACx42Xn9Dk409.png"}),n(),C,o(a,{alt:"Drawing 12.png",src:"https://s0.lgstatic.com/i/image/M00/38/AE/CgqCHl8eRmKAT8LjAADV8C5fM8E391.png"}),n(),A,o(a,{alt:"Drawing 13.png",src:"https://s0.lgstatic.com/i/image/M00/38/A3/Ciqc1F8eRnuAWnTAAAE7eBUfEoA405.png"}),n(),h])}const I=l(c,[["render",f]]);export{R as __pageData,I as default};
