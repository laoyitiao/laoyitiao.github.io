import{_ as o,j as a,o as n,g as c,k as i,h as s,s as e,Q as t}from"./chunks/framework.b3d8e22e.js";const T=JSON.parse('{"title":"Service Mesh 背后的诉求 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/Go 微服务实战 38 讲_文档/(3803) 05  为什么说 Service Meh 是下一代微服务架构？.md","filePath":"posts/backEnd/Go 微服务实战 38 讲_文档/(3803) 05  为什么说 Service Meh 是下一代微服务架构？.md","lastUpdated":1696417798000}'),h={name:"posts/backEnd/Go 微服务实战 38 讲_文档/(3803) 05  为什么说 Service Meh 是下一代微服务架构？.md"},_=e("p",null,'在前面第 2 课时我们介绍过，Service Mesh（服务网格） 是云原生的代表技术之一，并且在后面的组件案例实践中，Service Mesh 也是其中的"主角"，因此我们非常有必要重点介绍下 Service Mesh 的诞生背景、相关特性以及三种常见的开源组件。',-1),p=e("h3",{id:"service-mesh-背后的诉求",tabindex:"-1"},[s("Service Mesh 背后的诉求 "),e("a",{class:"header-anchor",href:"#service-mesh-背后的诉求","aria-label":'Permalink to "Service Mesh 背后的诉求"'},"​")],-1),l=e("p",null,"一种技术的出现必然是有各种推动的因素，Service Mesh 也一样，它的出现就得益于微服务架构的发展。那 Service Mesh 出现时，其背后的诉求是什么呢？",-1),d=e("h4",{id:"_1-微服务架构的复杂性",tabindex:"-1"},[s("1. 微服务架构的复杂性 "),e("a",{class:"header-anchor",href:"#_1-微服务架构的复杂性","aria-label":'Permalink to "1. 微服务架构的复杂性"'},"​")],-1),S=e("p",null,"在微服务架构中，应用系统往往被拆分成很多个微服务（可以多达成百上千），数量庞大的微服务实例使得服务治理具有一定的挑战，比如说常见的服务注册、服务发现、服务实例的负载均衡，以及为了保护服务器实现熔断、重试等基础功能。除此之外，应用程序中还加上了大量的非功能性代码。",-1),v=t("",19),g=e("p",null,"边车",-1),M=e("p",null,"在模式库中，Sidecar 模式的定义是：将应用程序的组件部署到单独的进程或容器中以提供隔离和封装。这种模式还可以使应用程序由异构组件和技术组成。",-1),u=e("p",null,'在 Sidecar 模式中，"边车"与父应用程序（即业务服务）是两个独立的进程，二者生命周期相同，同时被创建和退出。"边车"附加到业务服务，并为应用提供支持功能，如微服务架构中的基本通信。Service Mesh 一般的架构如下图所示：',-1),m=t("",9),b=t("",12);function I(k,q,A,C,y,P){const r=a("Image");return n(),c("div",null,[_,p,l,d,S,i(r,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image/M00/32/9C/CgqCHl8OniqAaOpTAABLWy0eR68344.png"}),s(),v,i(r,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image/M00/32/92/Ciqc1F8OnrqAWCmyAAWNZlJGJJQ859.png"}),s(),g,M,u,i(r,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image/M00/32/92/Ciqc1F8OnsOAa3MVAABY1memBaA509.png"}),s(),m,i(r,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image/M00/32/92/Ciqc1F8OntCAXtNNAARr5zliZpw986.png"}),s(),b])}const E=o(h,[["render",I]]);export{T as __pageData,E as default};
