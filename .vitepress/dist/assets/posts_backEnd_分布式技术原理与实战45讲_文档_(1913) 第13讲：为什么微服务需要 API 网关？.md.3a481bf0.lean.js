import{_ as p,j as o,o as r,g as n,k as l,h as e,Q as i,s as a}from"./chunks/framework.a0d18f64.js";const q=JSON.parse('{"title":"第13讲：为什么微服务需要API网关？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/分布式技术原理与实战45讲_文档/(1913) 第13讲：为什么微服务需要 API 网关？.md","filePath":"posts/backEnd/分布式技术原理与实战45讲_文档/(1913) 第13讲：为什么微服务需要 API 网关？.md","lastUpdated":1696682708000}'),s={name:"posts/backEnd/分布式技术原理与实战45讲_文档/(1913) 第13讲：为什么微服务需要 API 网关？.md"},d=i("",10),u=a("p",null,"在微服务架构下，每个服务都是独立部署，如果直接调用，系统设计可能是这样的：",-1),_=a("p",null,"各个调用端单独去发起连接，会出现很多问题，比如不容易监控调用流量，出现问题不好确定来源，服务之间调用关系混乱等。",-1),c=a("h4",{id:"如何解决这个局面呢",tabindex:"-1"},[e("如何解决这个局面呢 "),a("a",{class:"header-anchor",href:"#如何解决这个局面呢","aria-label":'Permalink to "如何解决这个局面呢"'},"​")],-1),h=a("p",null,"针对这些问题，一个常用的解决方案是使用 API 服务网关。在微服务设计中，需要隔离内外部调用，统一进行系统鉴权、业务监控等，API 服务网关是一个非常合适的切入口。",-1),P=a("p",null,"通过引入 API 网关这一角色，可以高效地实现微服务集群的输出，节约后端服务开发成本，减少上线风险，并为服务熔断、灰度发布、线上测试等提供解决方案。",-1),A=i("",20);function g(I,m,S,C,b,x){const t=o("Image");return r(),n("div",null,[d,l(t,{alt:"1.png",src:"https://s0.lgstatic.com/i/image/M00/0D/57/Ciqc1F7DuLWALZMDAAB1i-97j1c184.png"}),e(),u,l(t,{alt:"2.png",src:"https://s0.lgstatic.com/i/image/M00/0D/57/Ciqc1F7DuNqAJXtiAAC4PwBmfM0342.png"}),e(),_,c,h,P,l(t,{alt:"3.png",src:"https://s0.lgstatic.com/i/image/M00/0D/63/CgqCHl7DuPuAH-1AAAE28Z6XTRo611.png"}),e(),A])}const T=p(s,[["render",g]]);export{q as __pageData,T as default};
