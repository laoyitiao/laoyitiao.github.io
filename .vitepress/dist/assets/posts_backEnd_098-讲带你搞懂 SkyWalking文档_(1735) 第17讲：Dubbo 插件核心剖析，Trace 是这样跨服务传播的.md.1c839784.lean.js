import{_ as p,j as e,o as t,g as r,k as l,h as n,s,Q as o}from"./chunks/framework.cfb14fe0.js";const T=JSON.parse('{"title":"第17讲：Dubbo插件核心剖析，Trace是这样跨服务传播的","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/098-讲带你搞懂 SkyWalking文档/(1735) 第17讲：Dubbo 插件核心剖析，Trace 是这样跨服务传播的.md","filePath":"posts/backEnd/098-讲带你搞懂 SkyWalking文档/(1735) 第17讲：Dubbo 插件核心剖析，Trace 是这样跨服务传播的.md","lastUpdated":1696682708000}'),c={name:"posts/backEnd/098-讲带你搞懂 SkyWalking文档/(1735) 第17讲：Dubbo 插件核心剖析，Trace 是这样跨服务传播的.md"},E=s("h1",{id:"第17讲-dubbo插件核心剖析-trace是这样跨服务传播的",tabindex:"-1"},[n("第17讲：Dubbo插件核心剖析，Trace是这样跨服务传播的 "),s("a",{class:"header-anchor",href:"#第17讲-dubbo插件核心剖析-trace是这样跨服务传播的","aria-label":'Permalink to "第17讲：Dubbo插件核心剖析，Trace是这样跨服务传播的"'},"​")],-1),y=s("p",null,"今天我们进入 Dubbo 插件核心剖析的学习。",-1),i=s("h4",{id:"dubbo-架构剖析",tabindex:"-1"},[n("Dubbo 架构剖析 "),s("a",{class:"header-anchor",href:"#dubbo-架构剖析","aria-label":'Permalink to "Dubbo 架构剖析"'},"​")],-1),F=s("p",null,"Dubbo 是 Alibaba 开源的分布式服务框架，在前面的课时中，我们搭建的 demo-webapp 示例就是通过 Dubbo 实现远程调用 demo-provider 项目中 HelloService 服务的。通过前面 demo 示例的演示，你可能已经大概了解 Dubbo 的架构，如下图所示：",-1),u=s("p",null,"这里简单说明一下上图中各个步骤与 Demo 示例之间的关系：",-1),C=s("ol",null,[s("li",null,"demo-provider 项目所在的 Container 容器启动，初始化其中的服务。demo-provider 启动之后，作为服务的提供方（Dubbo Provider），Dubbo 框架会将其暴露的服务地址注册到注册中心（Registry，即示例中的 Zookeeper）。"),s("li",null,"demo-webapp 启动之后，作为服务的消费者（Dubbo Consumer），可以在注册中心处订阅关注的服务地址。"),s("li",null,"注册中心在收到订阅之后，会将 Dubbo Provider 的地址列表发送给 Dubbo Consumer，同时与 Dubbo Consumer 维持长连接。如果后续 Dubbo Provider 的地址列表发生变化，注册中心会实时将变更后的地址推送给 Dubbo Consumer。"),s("li",null,"在 Dubbo Consumer 从注册中心拿到 Dubbo Provider 的地址列表之后，会根据一定的负载均衡方式，从地址列表中选择一个 Dubbo Provider，与其建立网络连接，并发起 RPC 请求，调用其暴露的服务。"),s("li",null,"在 Dubbo Consumer 和 Dubbo Provider 运行的过程中，我们可以将调用时长、调用次数等监控信息定时发送到监控中心（Monitor）处进行统计，从而实现监控服务状态的能力。Monitor 在上述架构中不是必须存在的。")],-1),b=s("p",null,"了解了 Dubbo 框架顶层的运行逻辑之后，我们进一步深入了解一下 Dubbo 框架架构。Dubbo 最大的特点是按照分层的方式来进行架构的，这种方式可以使各个层之间的耦合降到最低。从服务模型的角度来看，Dubbo 采用的是一种非常简单的模型，要么是提供方提供服务，要么是消费者消费服务，基于这一点可以抽象出服务提供方（Provider）和服务消费方（Consumer）两个角色。如下图所示，图左侧蓝色部分为 Dubbo Consumer 相关接口和实现类，右边绿色部分为 Dubbo Provider 相关的接口和实现类， 位于中轴线上的为双方都用到的接口：",-1),D=o("",3),g=o("",7),v=s("p",null,"在 getActivateExtension() 方法中，不是直接使用 SPI 方式加载 Filter 实现，中间还会有其他的过程，比如：",-1),A=s("ul",null,[s("li",null,"根据 Filter 上注解标注的 group 值确定它是工作在 Consumer 端还是 Provider 端。"),s("li",null,"根据用户配置开启或关闭某些特定的 Filter。"),s("li",null,"结合 Filter 默认优先级以及用户配置的优先级进行排序。")],-1),d=o("",13),m=s("h4",{id:"总结",tabindex:"-1"},[n("总结 "),s("a",{class:"header-anchor",href:"#总结","aria-label":'Permalink to "总结"'},"​")],-1),x=s("p",null,"本课时结合了 demo 示例，介绍了 Dubbo 框架远程调用的基本运行原理，并进一步介绍了 Dubbo 框架的 10 层结构。之后，重点介绍了 Dubbo 中 Filter 的工作原理以及 MonitorFilter 的相关实现。最后，结合上述基础知识分析了 SkyWalking Dubbo 插件的核心原理及实现。",-1);function k(h,_,R,I,S,B){const a=e("Image");return t(),r("div",null,[E,y,i,F,l(a,{alt:"image (12).png",src:"https://s0.lgstatic.com/i/image/M00/02/8A/Ciqc1F6xg_2AezlaAAlvM3IJlyE080.png"}),n(),u,C,b,l(a,{alt:"image.png",src:"https://s0.lgstatic.com/i/image/M00/02/8A/CgqCHl6xhB6Ac8xeAAUdCw2BNJU591.png"}),n(),D,l(a,{alt:"image (1).png",src:"https://s0.lgstatic.com/i/image/M00/02/8A/CgqCHl6xhHyATgFyAAcdl8xbycM744.png"}),n(),g,l(a,{alt:"使用Dubbo Filter链表的地方.png",src:"https://s0.lgstatic.com/i/image/M00/02/8A/CgqCHl6xhLWAf_qVAAD_d-gi4bI785.png"}),n(),v,A,l(a,{alt:"image (2).png",src:"https://s0.lgstatic.com/i/image/M00/02/8A/CgqCHl6xhMiAekQOAADLuNv3QQ4506.png"}),n(),d,l(a,{alt:"image (3).png",src:"https://s0.lgstatic.com/i/image/M00/02/8B/Ciqc1F6xhReAQwqkAAKW-g53Uqc000.png"}),n(),m,x])}const P=p(c,[["render",k]]);export{T as __pageData,P as default};
