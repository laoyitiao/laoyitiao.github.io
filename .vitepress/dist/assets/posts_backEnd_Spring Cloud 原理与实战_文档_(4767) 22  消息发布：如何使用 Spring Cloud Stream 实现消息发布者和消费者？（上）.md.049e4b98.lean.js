import{_ as e,j as o,o as r,g as t,k as p,h as n,s,Q as l}from"./chunks/framework.b3d8e22e.js";const x=JSON.parse('{"title":"设计 SpringHealth 中的消息发布场景 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/Spring Cloud 原理与实战_文档/(4767) 22  消息发布：如何使用 Spring Cloud Stream 实现消息发布者和消费者？（上）.md","filePath":"posts/backEnd/Spring Cloud 原理与实战_文档/(4767) 22  消息发布：如何使用 Spring Cloud Stream 实现消息发布者和消费者？（上）.md","lastUpdated":1696417798000}'),c={name:"posts/backEnd/Spring Cloud 原理与实战_文档/(4767) 22  消息发布：如何使用 Spring Cloud Stream 实现消息发布者和消费者？（上）.md"},E=s("p",null,"从上一课时的内容中，我们对 Spring Cloud Stream 的基本架构有了全面的了解。今天，就让我们回到案例，来看看如何使用 Spring Cloud Stream 来完成消息发布者和消费者的构建。",-1),i=s("h3",{id:"设计-springhealth-中的消息发布场景",tabindex:"-1"},[n("设计 SpringHealth 中的消息发布场景 "),s("a",{class:"header-anchor",href:"#设计-springhealth-中的消息发布场景","aria-label":'Permalink to "设计 SpringHealth 中的消息发布场景"'},"​")],-1),y=s("p",null,"在《消息驱动：如何理解 Spring 中对消息处理机制的抽象过程？》课时中，我们已经给出了在 SpringHealth 案例系统中应用消息处理机制的一个典型场景。类似 SpringHealth 这样的系统中的用户信息变动并不会太频繁，所以很多时候我们会想到通过缓存系统来存放用户信息。而一旦用户信息发生变化，user-service 可以发送一个事件，给到相关的订阅者并更新缓存信息，如下图所示：",-1),d=s("p",null,"用户信息更新场景中的事件驱动架构",-1),u=s("p",null,"一般而言，事件在命名上通常采用过去时态以表示该事件所代表的动作已经发生。所以，我们把这里的用户信息变更事件命名为 UserInfoChangedEvent。通常，我们也会建议使用一个独立的事件消费者来订阅这个事件，就像上图中的 consumer-service1 一样。但为了保持 SpringHealth 系统的简单性，我们不想再单独构建一个微服务，而是选择把事件订阅和消费的相关功能同样放在了 intervention-service 中，如下图所示：",-1),g=s("p",null,"简化之后的用户信息更新场景处理流程",-1),h=s("p",null,"接下来我们关注于上图中的事件发布者 user-service。在 user-service 中需要设计并实现使用 Spring Cloud Stream 发布消息的各个组件，包括 Source、Channel 和 Binder。我们围绕 UserInfoChangedEvent 事件给出 user-service 内部的整个实现流程，如下图所示：",-1),v=l("",43),b=l("",5),C=s("p",null,"用户账户更新流程图",-1),F=s("p",null,"在上图中，我们看到 user-service 异步发送的 UserInfoChangedEvent 事件会被消费，该消息的处理器 UserInfoChangedSink 所消费，然后 UserInfoChangedSink 将更新后的用户账户信息进行缓存以供 intervertion-service 使用。显然，UserInfoChangedSink 是整个流程的关键。至于如何实现这个 UserInfoChangedSink，我们放在下一课时中进行详细展开并给出代码示例。",-1),m=s("h3",{id:"小结与预告",tabindex:"-1"},[n("小结与预告 "),s("a",{class:"header-anchor",href:"#小结与预告","aria-label":'Permalink to "小结与预告"'},"​")],-1),A=s("p",null,"今天，我们基于用户信息更新这一特定业务场景，介绍了使用 Spring Cloud Stream 来完成对 SpringHealth 系统中消息发布消费流程的建模，并提供了针对消息发布者的实现过程。可以看到，只要理解了 Spring Cloud Stream 的基本架构，使用该框架发送消息的开发更多的是配置工作。",-1),f=s("p",null,"这里给你留一道思考题：在 Spring Cloud Stream 配置不同的 Binder 时，有哪些公共配置项，又有哪些是针对具体消息中间件的特定配置项？",-1),S=s("p",null,"下一课时将继续讨论基于 Spring Cloud Stream 的开发过程，我们关注于消息消费者的实现，以及自定义消息通道、消费者分组以及消息分区等高级主题的实现方式。",-1);function U(I,B,k,D,_,q){const a=o("Image");return r(),t("div",null,[E,i,y,p(a,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image/M00/76/EF/CgqCHl_IvYmAAdzPAABKd1VzQCI715.png"}),n(),d,u,p(a,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image/M00/76/E4/Ciqc1F_IvgSAQ-k8AABA--dRdWc848.png"}),n(),g,h,p(a,{alt:"3.png",src:"https://s0.lgstatic.com/i/image/M00/76/EF/CgqCHl_IvjSAX_W6AAHB35Qu21g693.png"}),n(),v,p(a,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image/M00/76/F0/CgqCHl_IvlKADfCXAAA8UAK4iIs978.png"}),n(),b,p(a,{alt:"5.png",src:"https://s0.lgstatic.com/i/image/M00/76/F0/CgqCHl_IvmGADKwmAAFJvHum5Z8651.png"}),n(),C,F,m,A,f,S])}const M=e(c,[["render",U]]);export{x as __pageData,M as default};
