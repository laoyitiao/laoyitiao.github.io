import{_ as o,j as e,o as t,g as c,k as p,h as s,Q as l,s as a}from"./chunks/framework.cfb14fe0.js";const W=JSON.parse('{"title":"12性能分析：性能影响的关键路径以及优化策略","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/Node.js 应用开发实战_文档/(6794) 12  性能分析：性能影响的关键路径以及优化策略.md","filePath":"posts/frontEnd/Node.js 应用开发实战_文档/(6794) 12  性能分析：性能影响的关键路径以及优化策略.md","lastUpdated":1696682708000}'),r={name:"posts/frontEnd/Node.js 应用开发实战_文档/(6794) 12  性能分析：性能影响的关键路径以及优化策略.md"},E=l("",24),y=l("",15),i=l("",8),F=l("",9),d=a("p",null,"这一对比可以非常清晰地看到，相对于标准服务，CPU 耗时服务在各方面（平均耗时、最低耗时、最大耗时以及失败率）都差很多，在性能上两者是有比较大的落差的，如果我们不知道是因为 MD5 影响到 CPU 计算导致的，那么就需要分析 CPU 耗时的情况了。",-1),h=a("p",null,"接下来我们打开 Chrome JavaScript Profiler 工具，可以看到如图 3 所示的结果。",-1),A=l("",16),C=a("p",null,"拿到压测数据后，同样按照 CPU 分析方法，可以看到如图 4 所示的性能分析结果。",-1),g=l("",9),u=a("p",null,"从结果看也是存在一定损耗的，具体在哪方面影响到性能，同样用 Chrome 工具载入该服务采集的 CPU 信息，如图 5 所示。",-1),D=l("",8),v=l("",10),B=l("",10),_=l("",4),k=a("p",null,[s("从结果看已经和标准的数据非常接近，因此"),a("strong",null,"在 Node.js 开发过程中，要特别注意文件读取，避免相同文件的重复读取"),s("。从表格 8 中的异步和缓存数据对比来看，通过缓存的处理优化，就可以在 QPS 上从 18353.39 提升至 35058.79，有 91% 以上的性能提升。")],-1),b=a("h3",{id:"总结",tabindex:"-1"},[s("总结 "),a("a",{class:"header-anchor",href:"#总结","aria-label":'Permalink to "总结"'},"​")],-1),f=a("p",null,"学完本讲，你应该要掌握两个工具的应用，对于服务端研发来说这些工具是非常重要的，我希望你能深入去实践应用这两个工具。其次了解 3 种影响性能因素的优化策略，同时在日常开发中，应尽量避免影响性能的代码逻辑。",-1),m=a("p",null,"那你在实际的工作中，是如何提升性能的呢，欢迎在评论区分享你的经验。",-1),w=a("p",null,'这一讲就讲完了，下一讲将讲解"常见网络攻击以及防护策略"，到时见~',-1),q=a("hr",null,null,-1),P=a("p",null,"[",-1),T=a("p",null,[s("]("),a("a",{href:"https://shenceyun.lagou.com/t/mka",target:"_blank",rel:"noreferrer"},"https://shenceyun.lagou.com/t/mka"),s(")")],-1),S=a("p",null,[a("strong",null,"《大前端高薪训练营》")],-1),j=a("p",null,[s("对标阿里 P7 技术需求 + 每月大厂内推，6 个月助你斩获名企高薪 Offer。"),a("a",{href:"https://shenceyun.lagou.com/t/mka",target:"_blank",rel:"noreferrer"},"点击链接"),s("，快来领取！")],-1);function x(I,L,M,R,N,O){const n=e("Image");return t(),c("div",null,[E,p(n,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image6/M00/34/08/CioPOWBwD02Ab_ffAAK5Evk7rNM190.png"}),s(),y,p(n,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image6/M01/33/FF/Cgp9HWBwD1yAaayGAAO16nRrzQQ497.png"}),s(),i,p(n,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image6/M00/34/08/CioPOWBwD2aAAtjKAABBXwAaJE8675.png"}),s(),F,p(n,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image6/M00/34/08/CioPOWBwD3SAIEtvAABS4dW-YPo314.png"}),s(),d,h,p(n,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image6/M00/34/08/CioPOWBwD3uADtMhAAMNNH1bIOY973.png"}),s(),A,p(n,{alt:"Drawing 5.png",src:"https://s0.lgstatic.com/i/image6/M00/34/00/Cgp9HWBwD4-AFJLoAABlk46DdAs957.png"}),s(),C,p(n,{alt:"Drawing 6.png",src:"https://s0.lgstatic.com/i/image6/M01/34/00/Cgp9HWBwD5mAFR0WAAHjSmqkmd0847.png"}),s(),g,p(n,{alt:"Drawing 7.png",src:"https://s0.lgstatic.com/i/image6/M00/34/08/CioPOWBwD6SAOvwRAAB4GHKuanE270.png"}),s(),u,p(n,{alt:"Drawing 8.png",src:"https://s0.lgstatic.com/i/image6/M00/34/00/Cgp9HWBwD6yATYtxAAHRgb9iz4o952.png"}),s(),D,p(n,{alt:"Drawing 9.png",src:"https://s0.lgstatic.com/i/image6/M01/34/00/Cgp9HWBwD7aAKWHYAABelIOMBeE096.png"}),s(),v,p(n,{alt:"Drawing 10.png",src:"https://s0.lgstatic.com/i/image6/M00/34/00/Cgp9HWBwD8GACAFLAABqJCdynds886.png"}),s(),B,p(n,{alt:"Drawing 11.png",src:"https://s0.lgstatic.com/i/image6/M00/34/00/Cgp9HWBwD8qATRwGAABrIJLpIKs046.png"}),s(),_,p(n,{alt:"Drawing 12.png",src:"https://s0.lgstatic.com/i/image6/M00/34/08/CioPOWBwD9KAICB5AAB9TVaRLF4498.png"}),s(),k,b,f,m,w,q,P,p(n,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image6/M00/12/FA/CioPOWBBrAKAAod-AASyC72ZqWw233.png"}),s(),T,S,j])}const H=o(r,[["render",x]]);export{W as __pageData,H as default};
