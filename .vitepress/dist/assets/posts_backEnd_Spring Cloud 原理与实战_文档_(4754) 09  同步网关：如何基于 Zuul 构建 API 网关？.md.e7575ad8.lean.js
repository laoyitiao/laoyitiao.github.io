import{_ as e,j as o,o as t,g as r,k as p,h as a,s,Q as l}from"./chunks/framework.b3d8e22e.js";const C=JSON.parse('{"title":"什么是 API 网关？ ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/Spring Cloud 原理与实战_文档/(4754) 09  同步网关：如何基于 Zuul 构建 API 网关？.md","filePath":"posts/backEnd/Spring Cloud 原理与实战_文档/(4754) 09  同步网关：如何基于 Zuul 构建 API 网关？.md","lastUpdated":1696417798000}'),c={name:"posts/backEnd/Spring Cloud 原理与实战_文档/(4754) 09  同步网关：如何基于 Zuul 构建 API 网关？.md"},i=s("p",null,[a("今天我们开始讨论 Spring Cloud 中的另一个核心技术组件，"),s("strong",null,"API 网关"),a("。")],-1),u=s("p",null,"我们先来简单介绍 API 网关的基本结构，然后给出 Spring Cloud 中关于 API 网关的解决方案。今天的内容重点是介绍如何使用 Zuul 这一特定工具来构建 API 网关的实现过程。",-1),E=s("h3",{id:"什么是-api-网关",tabindex:"-1"},[a("什么是 API 网关？ "),s("a",{class:"header-anchor",href:"#什么是-api-网关","aria-label":'Permalink to "什么是 API 网关？"'},"​")],-1),y=s("p",null,"在微服务架构中，API 网关（也叫服务网关）的出现有其必然性。通常，单个微服务提供的 API 粒度与客户端请求的粒度不一定完全匹配。多个服务之间通过对细粒度 API 的聚合才能满足客户端的要求。更为重要的是，网关能够起到客户端与微服务之间的隔离作用。随着业务需求的变化和时间的演进，网关背后的各个微服务的划分和实现可能需要做相应的调整和升级。这种调整和升级应该实现对客户端透明，如下所示：",-1),d=l("",2),h=l("",53);function v(g,b,k,q,_,A){const n=o("Image");return t(),r("div",null,[i,u,E,y,p(n,{alt:"Lark20201020-175149.png",src:"https://s0.lgstatic.com/i/image/M00/61/17/CgqCHl-Os0qAGZryAABHtvSGSm8333.png"}),a(),d,p(n,{alt:"Lark20201020-175156.png",src:"https://s0.lgstatic.com/i/image/M00/61/0C/Ciqc1F-Os1SAHbuIAABCdN3hS7M839.png"}),a(),h])}const f=e(c,[["render",v]]);export{C as __pageData,f as default};
