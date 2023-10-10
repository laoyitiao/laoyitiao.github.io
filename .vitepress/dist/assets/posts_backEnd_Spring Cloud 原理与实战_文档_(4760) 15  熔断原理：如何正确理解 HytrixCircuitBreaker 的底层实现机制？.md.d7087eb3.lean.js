import{_ as o,j as e,o as t,g as r,k as l,h as n,Q as p,s}from"./chunks/framework.cfb14fe0.js";const P=JSON.parse('{"title":"15熔断原理：如何正确理解HytrixCircuitBreaker的底层实现机制？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/Spring Cloud 原理与实战_文档/(4760) 15  熔断原理：如何正确理解 HytrixCircuitBreaker 的底层实现机制？.md","filePath":"posts/backEnd/Spring Cloud 原理与实战_文档/(4760) 15  熔断原理：如何正确理解 HytrixCircuitBreaker 的底层实现机制？.md","lastUpdated":1696682708000}'),c={name:"posts/backEnd/Spring Cloud 原理与实战_文档/(4760) 15  熔断原理：如何正确理解 HytrixCircuitBreaker 的底层实现机制？.md"},E=p("",17),y=p("",27),i=p("",8),u=s("p",null,"window 操作符示意图（来自 Reactor 官网）",-1),d=s("p",null,"以上图为例，我们看到有 5 个元素从流中输入，然后我们对其进行开窗操作（窗口大小为 3），这样输入流就变成了两个输出流。",-1),C=s("ul",null,[s("li",null,[s("strong",null,"flatMap 操作符。")])],-1),F=s("p",null,"flatMap，也就是拉平并转化。与常见的 map 不同，flatMap 操作符把输入流中的每个元素转换成另一个流，再把这些转换之后得到的流元素进行合并。flapMap 操作符示意图如下图所示：",-1),m=s("p",null,"flapMap 操作符示意图（来自 Reactor 官网）",-1),g=s("p",null,"例如，我们对 1 和 5 使用 flatMap 操作，转换的逻辑是返回它们的平方值并进行合并，这样通过 flatMap 操作符之后这两个元素就变成了 1 和 25。",-1),h=s("ul",null,[s("li",null,[s("strong",null,"reduce 操作符。")])],-1),A=s("p",null,"reduce 操作符对流中包含的所有元素进行累积计算，该操作符示意图见下图所示：",-1),B=s("p",null,"reduce 操作符示意图（来自 Reactor 官网）",-1),k=s("p",null,"上图中的具体累积操作通常也是通过一个函数来实现。例如，假如这个函数为一个求和函数，那么对 1 到 10 的数字进行求和时，reduce 操作符的运行结果即为 55。",-1),b=s("p",null,"具备了这些基础知识之后，让我们回到 Hystrix 的 HealthCountsStream 类。",-1),v=s("h4",{id:"healthcountsstream",tabindex:"-1"},[n("HealthCountsStream "),s("a",{class:"header-anchor",href:"#healthcountsstream","aria-label":'Permalink to "HealthCountsStream"'},"​")],-1),x=s("p",null,"我们首先来看一下 HealthCountsStream 类的类层结构，如下图所示：",-1),D=p("",16);function H(_,T,f,S,O,R){const a=e("Image");return t(),r("div",null,[E,l(a,{alt:"图片1.png",src:"https://s0.lgstatic.com/i/image/M00/6C/2B/CgqCHl-qaVeAPjoDAAGi61XW-lA326.png"}),n(),y,l(a,{alt:"图片2.png",src:"https://s0.lgstatic.com/i/image/M00/6C/20/Ciqc1F-qaXCACCVhAAFxRYCoxk8884.png"}),n(),i,l(a,{alt:"图片3.png",src:"https://s0.lgstatic.com/i/image/M00/6C/2B/CgqCHl-qaYCAFzIcAAMR9rxJnM0280.png"}),n(),u,d,C,F,l(a,{alt:"图片4.png",src:"https://s0.lgstatic.com/i/image/M00/6C/20/Ciqc1F-qaY-ADEiHAAIH-Hu23tg037.png"}),n(),m,g,h,A,l(a,{alt:"图片5.png",src:"https://s0.lgstatic.com/i/image/M00/6C/20/Ciqc1F-qaZmAavNWAAKEDkEs9hw282.png"}),n(),B,k,b,v,x,l(a,{alt:"图片6.png",src:"https://s0.lgstatic.com/i/image/M00/6C/2B/CgqCHl-qaaeAdcTgAANQkzIcceY943.png"}),n(),D])}const I=o(c,[["render",H]]);export{P as __pageData,I as default};
