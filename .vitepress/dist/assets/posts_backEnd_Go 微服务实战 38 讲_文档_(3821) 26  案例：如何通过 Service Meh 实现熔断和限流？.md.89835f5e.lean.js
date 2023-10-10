import{_ as o,j as e,o as t,g as c,k as l,h as n,s,Q as p}from"./chunks/framework.cfb14fe0.js";const f=JSON.parse('{"title":"26案例：如何通过ServiceMeh实现熔断和限流？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/Go 微服务实战 38 讲_文档/(3821) 26  案例：如何通过 Service Meh 实现熔断和限流？.md","filePath":"posts/backEnd/Go 微服务实战 38 讲_文档/(3821) 26  案例：如何通过 Service Meh 实现熔断和限流？.md","lastUpdated":1696682708000}'),r={name:"posts/backEnd/Go 微服务实战 38 讲_文档/(3821) 26  案例：如何通过 Service Meh 实现熔断和限流？.md"},E=s("h1",{id:"_26案例-如何通过servicemeh实现熔断和限流",tabindex:"-1"},[n("26案例：如何通过ServiceMeh实现熔断和限流？ "),s("a",{class:"header-anchor",href:"#_26案例-如何通过servicemeh实现熔断和限流","aria-label":'Permalink to "26案例：如何通过ServiceMeh实现熔断和限流？"'},"​")],-1),y=s("p",null,"在前面的课时中，我们分别学习了熔断、限流在服务高可用架构中的重要性和具体使用方式。但是，在具体使用过程中，我们会发现实现熔断和限流的代码和实现业务逻辑的代码耦合在一起，对系统的可维护性产生了不良的影响。",-1),F=s("p",null,"而 Service Mesh 作为下一代的微服务架构，它将服务间的通信从基础设施中抽离出来，还可以替这些业务服务完成熔断和限流等功能，而且完全对业务代码透明，这妥妥地提高了开发效率，因为普通开发者能够更加专注于业务开发。",-1),i=s("p",null,"下面我们就来看一下如何通过Service Mesh 实现熔断和限流。",-1),C=s("p",null,"在前面的第14课时中，我们已经学习了 Service Mesh中Istio 的基础知识，以及如何使用它来进行服务注册和发现，没有学习和稍有遗忘的同学们可以回过去阅读或温习一下。下面我们就直接讲解 Istio 实现熔断和限流的优势、实现案例和相关原理。",-1),B=s("h3",{id:"service-mesh-基本原理和优缺点",tabindex:"-1"},[n("Service Mesh 基本原理和优缺点 "),s("a",{class:"header-anchor",href:"#service-mesh-基本原理和优缺点","aria-label":'Permalink to "Service Mesh 基本原理和优缺点"'},"​")],-1),d=s("p",null,"本课时我们关注的是Istio 数据平面的高性能智能网络代理，它是基于 Envoy 改进的 Istio-Proxy，控制和协调了被代理服务的所有网络通信，同时也负责收集和上报相关的监控数据。也就是说，代理服务跟外界的所有网络请求都会经过该网络代理，所以网络代理可以代替代理服务实现熔断和限流等功能。",-1),h=p("",5),g=p("",34);function u(m,b,v,_,P,T){const a=e("Image");return t(),c("div",null,[E,y,F,i,C,B,d,l(a,{alt:"Istio_service_mesh.png",src:"https://s0.lgstatic.com/i/image/M00/55/EE/CgqCHl9q6yiADTC_AAA05D6oqE0082.png"}),n(),h,l(a,{alt:"istio_and_hystrix.png",src:"https://s0.lgstatic.com/i/image/M00/55/EF/CgqCHl9q61aAEwYWAAB6vty4Sd8250.png"}),n(),g])}const A=o(r,[["render",u]]);export{f as __pageData,A as default};
