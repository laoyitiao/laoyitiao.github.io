import{_ as p,j as s,o as _,g as c,k as r,h as a,Q as t,s as e}from"./chunks/framework.cfb14fe0.js";const f=JSON.parse('{"title":"第14讲：如何实现服务注册与发现？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/分布式技术原理与实战45讲_文档/(1914) 第14讲：如何实现服务注册与发现？.md","filePath":"posts/backEnd/分布式技术原理与实战45讲_文档/(1914) 第14讲：如何实现服务注册与发现？.md","lastUpdated":1696682708000}'),i={name:"posts/backEnd/分布式技术原理与实战45讲_文档/(1914) 第14讲：如何实现服务注册与发现？.md"},n=t("",10),l=t("",12),d=e("p",null,"如果连续多次心跳不能够发现服务，那么 Eureka Server 就会将这个服务节点从服务注册表中移除，各个服务之间会通过注册中心的注册信息来实现调用。",-1),h=e("p",null,"Euerka 在 Spring Cloud 中广泛应用，目前社区中集成的是 1.0 版本，在后续的版本更新中，Netflix 宣布 Euerka 2.0 闭源，于是开源社区中也出现了许多新的服务发现组件，比如 Spring Cloud Alibaba Nacos。",-1),u=e("h4",{id:"nacos",tabindex:"-1"},[a("Nacos "),e("a",{class:"header-anchor",href:"#nacos","aria-label":'Permalink to "Nacos"'},"​")],-1),b=e("p",null,"Nacos 是阿里巴巴推出来的一个开源项目，提供了服务注册和发现功能，使用 Nacos 可以方便地集成 Spring Cloud 框架。如果正在使用 Eureka 或者 Consul，可以通过少量的代码就能迁移到 Nacos 上。",-1),m=e("p",null,"Nacos 的应用和 Eureka 类似，独立于系统架构，需要部署 Nacos Server。除了服务注册和发现之外，Nacos 还提供了配置管理、元数据管理和流量管理等功能，并且提供了一个可视化的控制台管理界面。",-1),k=t("",11);function g(C,S,E,N,A,P){const o=s("Image");return _(),c("div",null,[n,r(o,{alt:"image (12).png",src:"https://s0.lgstatic.com/i/image/M00/0E/A7/Ciqc1F7GKL2AdvDaAAGP_eJ6zd0194.png"}),a(),l,r(o,{alt:"image (13).png",src:"https://s0.lgstatic.com/i/image/M00/0E/B3/CgqCHl7GKNCAURouAAFzGomu7Gs531.png"}),a(),d,h,u,b,m,r(o,{alt:"image (14).png",src:"https://s0.lgstatic.com/i/image/M00/0E/A7/Ciqc1F7GKNyASZrcAAY4CF3B8qE355.png"}),a(),k])}const q=p(i,[["render",g]]);export{f as __pageData,q as default};
