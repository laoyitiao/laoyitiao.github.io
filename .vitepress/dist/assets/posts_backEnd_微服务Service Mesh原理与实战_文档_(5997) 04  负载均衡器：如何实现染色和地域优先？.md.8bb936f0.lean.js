import{_ as r,j as s,o as l,g as p,k as t,h as o,s as e,Q as n}from"./chunks/framework.b3d8e22e.js";const y=JSON.parse('{"title":"节点染色 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/微服务Service Mesh原理与实战_文档/(5997) 04  负载均衡器：如何实现染色和地域优先？.md","filePath":"posts/backEnd/微服务Service Mesh原理与实战_文档/(5997) 04  负载均衡器：如何实现染色和地域优先？.md","lastUpdated":1696417798000}'),i={name:"posts/backEnd/微服务Service Mesh原理与实战_文档/(5997) 04  负载均衡器：如何实现染色和地域优先？.md"},c=e("p",null,"今天我要和你分享的内容是负载均衡中的进阶知识：如何实现节点染色、地域优先访问，以及如何根据后端节点的负载情况，进行动态的加权负载均衡。",-1),_=e("h3",{id:"节点染色",tabindex:"-1"},[o("节点染色 "),e("a",{class:"header-anchor",href:"#节点染色","aria-label":'Permalink to "节点染色"'},"​")],-1),h=e("p",null,"节点染色，简单来说就是把某一类节点打上相同的标签，然后负载均衡器根据标签来分发流量。",-1),d=e("p",null,"在微服务架构中，染色有很多作用，比如金丝雀发布、A/B测试、故障演练、流量区分，都可以通过染色来实现。",-1),g=e("p",null,"那么具体我们应该如何操作呢？",-1),u=e("p",null,[o("首先我们需要"),e("strong",null,"在网关层，根据 header 信息或者权重对流量进行染色"),o("。比如在客户端的某些版本中写入染色的 header，就像 X-TAG=canary；也可以在网关层对流量按照比例分流，比如 1% 的流量打上金丝雀的标签进行灰度测试。")],-1),m=e("p",null,"另外在注册中心也需要写入对应的 MetaData 信息，用于在负载均衡层进行流量的过滤。比如在注册中心的 MetaData 信息中定义 lb_tags 的字段，数据为 [stage:canary, v:1.2]，在 LB 进行匹配的时候，带有金丝雀 header 的请求，就会请求到 lb_tags 包含 canary 的节点上面。",-1),b=e("p",null,"节点染色操作示意图（绿色箭头表示 prod 流量，红色箭头表示 canary 流量）",-1),A=e("p",null,"另外我们也需要考虑没有匹配到对应节点时的降级策略，参考 Envoy 中的配置，一般有如下几种：",-1),P=n("",26),q=n("",19),f={href:"https://shenceyun.lagou.com/t/Mka",target:"_blank",rel:"noreferrer"},z=e("p",null,[e("a",{href:"https://shenceyun.lagou.com/t/Mka",target:"_blank",rel:"noreferrer"},"拉勾背书内推 + 硬核实战技术干货，帮助每位 Java 工程师达到阿里 P7 技术能力。点此链接，快来领取！")],-1);function k(C,S,E,v,M,x){const a=s("Image");return l(),p("div",null,[c,_,h,d,g,u,m,t(a,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image2/M01/04/34/CgpVE1_q6-aAAHwgAAEhSA1g7Rg541.png"}),o(),b,A,t(a,{alt:"Lark20201229-184907.png",src:"https://s0.lgstatic.com/i/image/M00/8C/52/Ciqc1F_rCcyAfF6dAACsBN_vS9I347.png"}),P,t(a,{alt:"Lark20201229-184910.png",src:"https://s0.lgstatic.com/i/image/M00/8C/52/Ciqc1F_rCbuAFwVzAAA8uDAb-4U656.png"}),q,e("p",null,[e("a",f,[t(a,{alt:"java_高薪训练营.png",src:"https://s0.lgstatic.com/i/image/M00/8B/BD/Ciqc1F_gEFiAcnCNAAhXSgFweBY589.png"})])]),z])}const N=r(i,[["render",k]]);export{y as __pageData,N as default};
