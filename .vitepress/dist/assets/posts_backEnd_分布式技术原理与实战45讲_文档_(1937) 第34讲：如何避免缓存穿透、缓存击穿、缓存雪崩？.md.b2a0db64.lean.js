import{_ as s,j as o,o as i,g as r,k as _,h as e,s as a,Q as p}from"./chunks/framework.4e7d56ce.js";const C=JSON.parse('{"title":"第34讲：如何避免缓存穿透、缓存击穿、缓存雪崩？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/分布式技术原理与实战45讲_文档/(1937) 第34讲：如何避免缓存穿透、缓存击穿、缓存雪崩？.md","filePath":"posts/backEnd/分布式技术原理与实战45讲_文档/(1937) 第34讲：如何避免缓存穿透、缓存击穿、缓存雪崩？.md","lastUpdated":1696682708000}'),n={name:"posts/backEnd/分布式技术原理与实战45讲_文档/(1937) 第34讲：如何避免缓存穿透、缓存击穿、缓存雪崩？.md"},l=a("h1",{id:"第34讲-如何避免缓存穿透、缓存击穿、缓存雪崩",tabindex:"-1"},[e("第34讲：如何避免缓存穿透、缓存击穿、缓存雪崩？ "),a("a",{class:"header-anchor",href:"#第34讲-如何避免缓存穿透、缓存击穿、缓存雪崩","aria-label":'Permalink to "第34讲：如何避免缓存穿透、缓存击穿、缓存雪崩？"'},"​")],-1),c=a("p",null,"设计缓存系统不得不考虑的问题是缓存穿透、缓存击穿与失效时的雪崩效应，同时，关于这几种问题场景的认识及解决方案，也是面试中的高频考点。今天的内容，可以说是缓存应用的三板斧，下面我们一起来分析一下缓存应用中的这几个热门问题。",-1),h=a("h3",{id:"缓存穿透",tabindex:"-1"},[e("缓存穿透 "),a("a",{class:"header-anchor",href:"#缓存穿透","aria-label":'Permalink to "缓存穿透"'},"​")],-1),d=a("p",null,"先来看一下缓存穿透，顾名思义，是指业务请求穿过了缓存层，落到持久化存储上。在大多数场景下，我们应用缓存是为了承载前端业务请求，缓存被击穿以后，如果请求量比较大，则会导致数据库出现风险。",-1),m=p("",10),u=p("",13),A=p("",11);function g(T,b,f,q,P,k){const t=o("Image");return i(),r("div",null,[l,c,h,d,_(t,{alt:"2.png",src:"https://s0.lgstatic.com/i/image/M00/3A/D3/Ciqc1F8ihZ-Aff7hAAAp1R6rHNs300.png"}),e(),m,_(t,{alt:"3.png",src:"https://s0.lgstatic.com/i/image/M00/3A/DE/CgqCHl8ihaqARq0qAAAyh2IYhog754.png"}),e(),u,_(t,{alt:"4.png",src:"https://s0.lgstatic.com/i/image/M00/3A/D3/Ciqc1F8ihbyAf1UxAABgpe_3O54337.png"}),e(),A])}const S=s(n,[["render",g]]);export{C as __pageData,S as default};
