import{_ as l,j as p,o as s,g as n,k as e,h as t,Q as r,s as a}from"./chunks/framework.cfb14fe0.js";const A=JSON.parse('{"title":"23如何保障分布式系统的高可用性？（下）","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/Go 微服务实战 38 讲_文档/(3818) 23  如何保障分布式系统的高可用性？（下）.md","filePath":"posts/backEnd/Go 微服务实战 38 讲_文档/(3818) 23  如何保障分布式系统的高可用性？（下）.md","lastUpdated":1696682708000}'),i={name:"posts/backEnd/Go 微服务实战 38 讲_文档/(3818) 23  如何保障分布式系统的高可用性？（下）.md"},h=r("",9),_=a("p",null,"漏桶算法示意图",-1),d=a("p",null,"例如，系统中用户注册的瓶颈是 100 QPS，即 1 秒钟最多只能同时注册 100 人，如果注册人数过多就会出现未知的错误。此时就可以采用漏桶算法，保证每秒钟系统中同时注册的人数不超过 100 人。",-1),c=a("p",null,[a("strong",null,"令牌桶算法"),t(" 则是一个存放固定容量令牌的桶，按照固定速率往桶里添加令牌。桶中存放的令牌数有最大上限，超出之后就被丢弃。一般来说"),a("strong",null,"令牌桶内令牌数量上限就是系统负载能力的上限"),t("，不建议超过太多。当流量或者网络请求到达时，每个请求都要获取一个令牌，如果能够从令牌桶中获取到令牌，请求将被系统处理，被获取到的令牌也会从令牌桶中移除；如果获取不到令牌，该请求就要被限流，要么直接丢弃，要么在缓冲区等待（如下图所示）。令牌桶限制了请求流量的平均流入速率，令牌以一定的速率添加到桶内，只要桶里有足够的令牌，所有的请求就能流入系统中被处理，这能够应对一定程度的突发巨量流量。")],-1),u=r("",36);function g(q,m,b,P,f,k){const o=p("Image");return s(),n("div",null,[h,e(o,{alt:"图片2.png",src:"https://s0.lgstatic.com/i/image/M00/50/1F/CgqCHl9h0AqAfC4PAACNthY5lZQ664.png"}),t(),_,d,c,e(o,{alt:"图片3.png",src:"https://s0.lgstatic.com/i/image/M00/50/14/Ciqc1F9h0BaANqlVAACr8W_zBko547.png"}),t(),u])}const C=l(i,[["render",g]]);export{A as __pageData,C as default};
