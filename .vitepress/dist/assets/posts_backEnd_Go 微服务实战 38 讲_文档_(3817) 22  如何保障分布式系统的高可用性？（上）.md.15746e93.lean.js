import{_ as s,j as n,o as p,g as _,k as r,s as e,h as a,Q as o}from"./chunks/framework.b3d8e22e.js";const M=JSON.parse('{"title":"故障不可避免 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/Go 微服务实战 38 讲_文档/(3817) 22  如何保障分布式系统的高可用性？（上）.md","filePath":"posts/backEnd/Go 微服务实战 38 讲_文档/(3817) 22  如何保障分布式系统的高可用性？（上）.md","lastUpdated":1696417798000}'),l={name:"posts/backEnd/Go 微服务实战 38 讲_文档/(3817) 22  如何保障分布式系统的高可用性？（上）.md"},i=e("p",null,"高可用性是我们经常提到的名词，指系统提供的服务要始终可用，无论是系统内部运行出现故障，还是系统的外部依赖出现问题，甚至遇到系统硬件损坏、停电等致命性打击，系统都要保证基本可用。",-1),g=e("p",null,"因此，高可用系统关注用户使用体验，并且通过降低系统出现故障的概率，以及缩短系统因突发故障导致的宕机时间，减轻了开发运维人员的工作。",-1),c=e("p",null,"目前，主流的互联网产品都采用了大量手段来保证系统可用性，比如淘宝在双十一时会采用限流和降级设计等手法，来保证系统能够承受住秒杀活动时产生的巨量瞬时流量；再比如，Kafka 采用冗余设计将消息备份到多个不同的 Broker 中，来避免消息丢失等。",-1),u=e("p",null,[a("那么，为了让你对系统可用性有更直观的认识，我首先带你了解分布式系统中故障不可避免的原因，然后再来介绍衡量系统可用性的"),e("strong",null,"指标"),a("，最后介绍目前常用的高可用性设计，以帮助你学习后面的项目案例实践打下理论基础。希望通过本节课的学习，你能够对如何设计高可用性系统有个整体的认知。")],-1),d=e("h3",{id:"故障不可避免",tabindex:"-1"},[a("故障不可避免 "),e("a",{class:"header-anchor",href:"#故障不可避免","aria-label":'Permalink to "故障不可避免"'},"​")],-1),T=e("p",null,"高可用性是指系统提供的服务要始终可用，然而故障不可避免，特别是在分布式系统下，面对不可控的用户流量和机房环境，系统故障将会显得更加复杂和不可预测。",-1),h=e("p",null,"在大规模的分布式系统中，各个模块之间存在错综复杂的依赖调用关系，比如前端服务依赖于后端服务获取业务处理数据，后端服务依赖于数据库进行数据持久化处理，如果任一环节出现问题，都有可能导致雪崩式、多米诺骨牌式故障，甚至可以断言故障的出现成了常态。",-1),k=o("",9),m=o("",8),A=o("",7),C=o("",7);function E(S,P,b,q,v,f){const t=n("Image");return p(),_("div",null,[i,g,c,u,d,T,h,r(t,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image/M00/4D/BB/Ciqc1F9bJVWAGXzAAACmPXf6Gkw951.png"}),k,r(t,{alt:"Lark20200911-181411.png",src:"https://s0.lgstatic.com/i/image/M00/4D/E3/CgqCHl9bTpyAJGKxAAELzFEHw78546.png"}),m,r(t,{alt:"Lark20200911-181407.png",src:"https://s0.lgstatic.com/i/image/M00/4D/E3/CgqCHl9bTq2AVQZgAADxs8PW6qM628.png"}),A,r(t,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image/M00/4D/C7/CgqCHl9bJX6AYR6WAACD8asiP4k125.png"}),C])}const V=s(l,[["render",E]]);export{M as __pageData,V as default};
