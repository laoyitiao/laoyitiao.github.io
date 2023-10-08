import{_ as o,j as e,o as t,g as c,k as l,h as n,s,Q as p}from"./chunks/framework.4e7d56ce.js";const B=JSON.parse('{"title":"30Filter接口，扩展Dubbo框架的常用手段指北","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/Dubbo源码解读与实战_文档/(5194) 30  Filter 接口，扩展 Dubbo 框架的常用手段指北.md","filePath":"posts/backEnd/Dubbo源码解读与实战_文档/(5194) 30  Filter 接口，扩展 Dubbo 框架的常用手段指北.md","lastUpdated":1696682708000}'),r={name:"posts/backEnd/Dubbo源码解读与实战_文档/(5194) 30  Filter 接口，扩展 Dubbo 框架的常用手段指北.md"},E=s("h1",{id:"_30filter接口-扩展dubbo框架的常用手段指北",tabindex:"-1"},[n("30Filter接口，扩展Dubbo框架的常用手段指北 "),s("a",{class:"header-anchor",href:"#_30filter接口-扩展dubbo框架的常用手段指北","aria-label":'Permalink to "30Filter接口，扩展Dubbo框架的常用手段指北"'},"​")],-1),y=s("p",null,"在前面的第 27 课时中，我们介绍了 ProtocolFilterWrapper 的具体实现，这里简单回顾一下。在 buildInvokerChain() 方法中，ProtocolFilterWrapper 会加载 Dubbo 以及应用程序提供的 Filter 实现类，然后构造成 Filter 链，最后通过装饰者模式在原有 Invoker 对象基础上添加执行 Filter 链的逻辑。",-1),i=s("p",null,'Filter 链的组装逻辑设计得非常灵活，其中可以通过"-"配置手动剔除 Dubbo 原生提供的、默认加载的 Filter，通过"default"来代替 Dubbo 原生提供的 Filter，这样就可以很好地控制哪些 Filter 要加载，以及 Filter 的真正执行顺序。',-1),F=s("p",null,[s("strong",null,"Filter 是扩展 Dubbo 功能的首选方案"),n("，并且 Dubbo 自身也提供了非常多的 Filter 实现来扩展自身功能。在回顾了 ProtocolFilterWrapper 加载 Filter 的大致逻辑之后，我们本课时就来深入介绍 Dubbo 内置的多种 Filter 实现类，以及自定义 Filter 扩展 Dubbo 的方式。")],-1),g=s("p",null,"在开始介绍 Filter 接口实现之前，我们需要了解一下 Filter 在 Dubbo 架构中的位置，这样才能明确 Filter 链处理请求/响应的位置，如下图红框所示：",-1),A=p("",43),u=p("",8),d=p("",45);function C(v,D,m,h,S,L){const a=e("Image");return t(),c("div",null,[E,y,i,F,g,l(a,{alt:"Lark20201106-191028.png",src:"https://s0.lgstatic.com/i/image/M00/68/FD/CgqCHl-lLz2APEb2ABSTPPnfqGQ345.png"}),n(),A,l(a,{alt:"Lark20201106-191032.png",src:"https://s0.lgstatic.com/i/image/M00/68/F2/Ciqc1F-lL4eAGvorAAEnucS-mWg399.png"}),n(),u,l(a,{alt:"Lark20201106-191036.png",src:"https://s0.lgstatic.com/i/image/M00/68/FE/CgqCHl-lL4GAWy4JAAFMZJwzrp8801.png"}),n(),d])}const k=o(r,[["render",C]]);export{B as __pageData,k as default};
