import{_ as o,j as e,o as t,g as c,k as l,h as n,Q as p,s}from"./chunks/framework.a0d18f64.js";const N=JSON.parse('{"title":"17SSR：使用React.j开发Serverle服务端渲染应用","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/玩转 Serverless 架构_文档/(6045) 17  SSR：使用 React.j 开发 Serverle 服务端渲染应用.md","filePath":"posts/backEnd/玩转 Serverless 架构_文档/(6045) 17  SSR：使用 React.j 开发 Serverle 服务端渲染应用.md","lastUpdated":1696682708000}'),r={name:"posts/backEnd/玩转 Serverless 架构_文档/(6045) 17  SSR：使用 React.j 开发 Serverle 服务端渲染应用.md"},E=p("",8),y=s("p",null,"传统服务端渲染架构",-1),i=s("p",null,"对前端工程师来说，要实现一个服务端渲染应用，通常面临着一些问题：",-1),d=s("ul",null,[s("li",null,[s("p",null,"部署服务端渲染应用需要购买服务器，并配置服务器环境，要对服务器进行运维；")]),s("li",null,[s("p",null,"需要关注业务量，考虑有没有高并发场景、服务器有没有扩容机制；")]),s("li",null,[s("p",null,"需要实现负载均衡、流量控制等复杂后端能力等。")])],-1),F=s("p",null,"开篇我也提到，而且是服务端的工作，很多前端同学都不擅长，好在有了 Serverless。",-1),u=s("p",null,"用 Serverless 做服务端渲染，就是将以往的每个路由，都拆分为一个个函数，再在 FaaS 上部署对应的函数，这样用户请求的 path，对应的就是每个单独的函数。通过这种方式，就将运维操作转移到了 FaaS 平台，前端同学开发服务端渲染应用，就再也不用关心服务端程序的运维部署了。并且在 FaaS 平台中运行的函数，天然具有弹性伸缩的能力，你也不用担心流量波峰波谷了。",-1),m=s("p",null,"基于 Serverless 的服务选渲染架构",-1),C=s("p",null,"如图所示，FaaS 函数接收请求后直接执行代码渲染出 HTML 并返回给浏览器，这是最基本的架构，虽然它可以满足大部分场景，但要追求极致的性能，你通常要加入缓存。",-1),g=s("p",null,"进阶版基于 Serverless 的服务端渲染架构",-1),D=s("p",null,"首先我们会使用 CDN 做缓存，基于 CDN 的缓存可以减少函数执行次数，进而避免函数冷启动带来的性能损耗。如果 CDN 中没有 SSR HTML 页面的缓存，则继续由网关处理请求，网关再去触发函数执行。",-1),A=s("p",null,"函数首先会判读缓存数据库中是否有 SSR HTML 的缓存，如果有直接返回；如果没有再渲染出 HTML 并返回。基于数据库的缓存，可以减少函数渲染 HTML 的时间，从而页面加载提升性能。",-1),v=s("p",null,"讲了这么多，具体怎么基于 Serverless 实现一个服务端渲染应用呢？",-1),h=s("h3",{id:"实现一个-serverless-的服务端渲染应用",tabindex:"-1"},[n("实现一个 Serverless 的服务端渲染应用 "),s("a",{class:"header-anchor",href:"#实现一个-serverless-的服务端渲染应用","aria-label":'Permalink to "实现一个 Serverless 的服务端渲染应用"'},"​")],-1),q=s("p",null,"在 16 讲中，我们实现了一个内容管理系统的 Restful API，但没有前端界面，所以今天我们的目标就基于 Serverless 实现一个内容管理系统的前端界面（如图所示）。",-1),B=p("",25),f=p("",17),_=p("",11),x=p("",5);function S(b,k,T,w,I,j){const a=e("Image");return t(),c("div",null,[E,l(a,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image/M00/94/3B/Ciqc1GAXxlCABEjhAAGFmUrRE68475.png"}),n(),y,i,d,F,u,l(a,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image/M00/94/46/CgqCHmAXxluARkcHAAF-S8PNwUE730.png"}),n(),m,C,l(a,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image/M00/94/3B/Ciqc1GAXxmOATGYqAAGjC4CgYTw981.png"}),n(),g,D,A,v,h,q,l(a,{alt:"ssr.gif",src:"https://s0.lgstatic.com/i/image/M00/94/3B/Ciqc1GAXxoiANTROADtU9yybMQY209.gif"}),n(),B,l(a,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image/M00/94/46/CgqCHmAXx1WAV0BxAAM5rls-jc4377.png"}),n(),f,l(a,{alt:"Drawing 5.png",src:"https://s0.lgstatic.com/i/image/M00/94/3B/Ciqc1GAXx3GADE4AAAO-vJ2TBH0389.png"}),n(),_,l(a,{alt:"玩转 Serverless 架构17金句.png",src:"https://s0.lgstatic.com/i/image6/M00/04/7F/CioPOWAsxEeANlL-AAEkPyzgS2s711.png"}),n(),x])}const R=o(r,[["render",S]]);export{N as __pageData,R as default};
