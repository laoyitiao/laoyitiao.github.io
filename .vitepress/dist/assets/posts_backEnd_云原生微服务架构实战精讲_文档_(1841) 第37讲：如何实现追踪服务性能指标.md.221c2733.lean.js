import{_ as l,j as o,o as e,g as t,k as a,Q as n,s as p,h as r}from"./chunks/framework.b3d8e22e.js";const m=JSON.parse('{"title":"性能指标数据 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/云原生微服务架构实战精讲_文档/(1841) 第37讲：如何实现追踪服务性能指标.md","filePath":"posts/backEnd/云原生微服务架构实战精讲_文档/(1841) 第37讲：如何实现追踪服务性能指标.md","lastUpdated":1696417798000}'),c={name:"posts/backEnd/云原生微服务架构实战精讲_文档/(1841) 第37讲：如何实现追踪服务性能指标.md"},E=n("",12),y=n("",14),i=n("",35),d=p("p",null,"当在 Jaeger 的界面搜索痕迹时，会发现每一个查询请求，实际上对应的是 3 条痕迹，每条痕迹中只包含两个跨度，如下图所示。这是因为 Istio 的服务代理在记录跨度时，只知道当前请求的来源和目的地。在没有跨度上下文把这些服务调用串联起来的情况下，每个服务调用都会被当成独立的痕迹。",-1),F=n("",12),u=n("",3),g=p("h3",{id:"总结",tabindex:"-1"},[r("总结 "),p("a",{class:"header-anchor",href:"#总结","aria-label":'Permalink to "总结"'},"​")],-1),h=p("p",null,"性能指标数据和服务追踪是微服务架构中两个很重要的功能，在开发和运维中都起着重要的作用。通过本课时的学习，你可以了解到如何使用 Istio 提供的 Prometheus 和 Grafana 组件来查看应用的性能指标，还可以了解到如何为应用添加分布式追踪的功能，包括在服务内部添加自定义的追踪信息。",-1);function C(A,b,v,_,B,T){const s=o("Image");return e(),t("div",null,[E,a(s,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image/M00/36/9F/CgqCHl8X4FqAUqD0AAIGlZTiMr0929.png"}),y,a(s,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image/M00/36/9F/CgqCHl8X4ISACHhnAANIm5WxE3M425.png"}),i,a(s,{alt:"5.png",src:"https://s0.lgstatic.com/i/image/M00/36/A9/Ciqc1F8X9WeASYVRAABoS7Kr6lk678.png"}),d,a(s,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image/M00/36/94/Ciqc1F8X4KyAIYt5AAG66uhEe1w882.png"}),F,a(s,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image/M00/36/94/Ciqc1F8X4RCAPkBkAAI2pgeGv9I243.png"}),u,a(s,{alt:"Drawing 5.png",src:"https://s0.lgstatic.com/i/image/M00/36/A0/CgqCHl8X4R6APFv-AAMEAMNViJw037.png"}),g,h])}const D=l(c,[["render",C]]);export{m as __pageData,D as default};
