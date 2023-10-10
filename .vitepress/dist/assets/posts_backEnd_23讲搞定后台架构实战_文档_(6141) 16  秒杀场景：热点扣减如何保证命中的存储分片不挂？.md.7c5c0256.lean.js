import{_ as a,j as n,o as l,g as _,k as r,h as o,Q as s,s as t}from"./chunks/framework.cfb14fe0.js";const Q=JSON.parse('{"title":"16秒杀场景：热点扣减如何保证命中的存储分片不挂？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/23讲搞定后台架构实战_文档/(6141) 16  秒杀场景：热点扣减如何保证命中的存储分片不挂？.md","filePath":"posts/backEnd/23讲搞定后台架构实战_文档/(6141) 16  秒杀场景：热点扣减如何保证命中的存储分片不挂？.md","lastUpdated":1696682708000}'),p={name:"posts/backEnd/23讲搞定后台架构实战_文档/(6141) 16  秒杀场景：热点扣减如何保证命中的存储分片不挂？.md"},i=s("",11),c=t("p",null,"图 1：基于数据库+缓存的热点扣减现状",-1),u=t("p",null,[o('可以看到，秒杀与热点扣减所带来技术问题是一样的------所有的热点请求均命中同一个存储分片。那为什么不能直接复用"'),t("a",{href:"https://kaiwu.lagou.com/course/courseInfo.htm?courseId=595#/detail/pc?id=6131",target:"_blank",rel:"noreferrer"},"第 06 讲"),o('"介绍的"通过增加缓存副本以及使用本地缓存"的方式来应对呢？')],-1),g=t("p",null,"下面我们来具体分析一下这其中的原因。",-1),h=t("p",null,[o("首先，扣减是写请求，即每一次请求都会修改当前商品对应的总数量，且当商品数量扣减为零或当前剩余商品数量小于当次要扣减的数量时，均会返还失败。"),t("strong",null,'而"'),o(),t("a",{href:"https://kaiwu.lagou.com/course/courseInfo.htm?courseId=595#/detail/pc?id=6131",target:"_blank",rel:"noreferrer"},"第 06 讲"),t("strong",null,'"热点查询里的缓存副本或者本地缓存里的商品数量均是原始分片的数据镜像'),o("，不能被拿来进行扣减的，否则就会出现数据错乱，甚至超卖的现象。对应的架构示图如下图 2 所示：")],-1),d=t("p",null,"图 2：副本的镜像架构图",-1),m=t("p",null,"其次，本地缓存里的数据是非持久化数据，易丢失。即使将本地缓存持久化至宿主机的磁盘，也会因磁盘故障、不满足 ACID 等原因而导致数据丢失。",-1),A=t("h3",{id:"如何应对秒杀流量",tabindex:"-1"},[o("如何应对秒杀流量？ "),t("a",{class:"header-anchor",href:"#如何应对秒杀流量","aria-label":'Permalink to "如何应对秒杀流量？"'},"​")],-1),f=t("p",null,"既然不能采用热点查询里的方案，只能使用缓存单分片来应对秒杀的流量，但单分片能够支持的流量是有上限。当流量超过上限后如何处理呢？",-1),I=t("p",null,'可以从秒杀的业务上进行分析，你会发现虽然秒杀带来的热点扣减请求非常大，但每次参与秒杀的商品数量是有限的，可能就几百个或者上千个，而热点扣减的流量可能达到上百万。通过简单地计算可以得出，秒杀到商品的概率只有 0.1%，其中 99% 的扣减请求都是"陪跑"的。',-1),k=t("p",null,[o('这些"陪跑"的请求对于使用者来说可能只是一次简单的点击，但很可能会把正在运行的扣减服务打挂。此时，我们可以对这些瞬间量非常大的"陪跑"请求进行一些前置处理，降低"陪跑"请求的瞬间请求量，或者降低它们对于系统的冲击，此方式就叫作流'),t("strong",null,"量削峰"),o("。体现在流量监控上如下图 3 所示：")],-1),T=s("",6),P=t("p",null,"图 4：基于限流的架构图",-1),w=t("p",null,[t("strong",null,"限流在实现上有两种方式，一种是集中式，另外一种是单机式"),o("。集中式是指设置一个总的限流阈值，并将此值存储在一个单独的限流应用中。所有的扣减应用在接收到请求后，均采用远程请求此限流应用的方式，来判断当前是否达到限流值。它的架构如下图 5 所示：")],-1),b=s("",4),q=s("",10),S=t("p",null,"图 7：兜底架构图",-1),C=t("p",null,"在部署的所有扣减应用里，通过上图中编号为 0 的配置中心推送每台机器需要负责的每个缓存分片的限流值（单分片最大承载值/扣减应用机器数），在扣减应用中，按上述推送值，给每一个缓存分片设置一个限流器。",-1),D=t("p",null,"此方案需要扣减应用和缓存中间件有一定的耦合性，即扣减应用需要判断当前请求隶属于哪一个缓存分片。实现上，具体隶属于哪个缓存分片，可以通过缓存中间件提供的路由算法工具来计算。获取到分片标识号后，就可以获取到此标识对应的限流器，然后再进行限流即可。",-1),V=t("p",null,"通过上述方式，即使出现流量超预期，兜底策略既保障了秒杀业务可正常运行，同时又保障了系统不会被打挂。",-1),E=t("p",null,[t("strong",null,"最后进行的削峰是，售完的商品需前置拦截。"),o(' 秒杀商品会在瞬间售完，后续所有的请求都会返回无货。对于已经无货的商品，可以采用"'),t("a",{href:"https://kaiwu.lagou.com/course/courseInfo.htm?courseId=595#/detail/pc?id=6131",target:"_blank",rel:"noreferrer"},"第 06 讲"),o('"里的方案，将商品已经无货的标记记录在本地缓存里。在秒杀扣减前，先在本地缓存进行判断，如果无货直接返回即可。架构如下图 8 所示：')],-1),M=t("p",null,"图 8：无货前置拦截",-1),N=t("h4",{id:"水平扩展架构升级",tabindex:"-1"},[o("水平扩展架构升级 "),t("a",{class:"header-anchor",href:"#水平扩展架构升级","aria-label":'Permalink to "水平扩展架构升级"'},"​")],-1),W=t("p",null,"通过上述几种限流的组合，便可以应对秒杀的热点流量了。但上述的方式会牺牲一定的用户体验，比如按一定比例过滤用户请求、按缓存分片维度过滤用户请求等。",-1),B=t("p",null,"我们可以在上述方案的基础上，做一定的升级来减少有损体验。升级后的架构如下图 9 所示：",-1),x=s("",7),H=s("",4),O=t("p",null,"图 11：单独部署的秒杀部署（增加对比正常的扣减）",-1),K=t("h3",{id:"总结",tabindex:"-1"},[o("总结 "),t("a",{class:"header-anchor",href:"#总结","aria-label":'Permalink to "总结"'},"​")],-1),R=t("p",null,"本讲在本模块前几讲的基础上，介绍了四种限流拦截策略，以及除了限流之外，可以实现水平扩展架构升级的方案。",-1),U=t("p",null,"除了上述方案外，还可以在部署架构、系统隔离、前端静态资源前置等方面进行升级改造来应对热点扣减。",-1),v=t("p",null,[o("最后，留一道观察题，"),t("strong",null,"你在秒杀抢购商品时，是否遇到过提示你已经无货，后续稍等几秒又抢到的场景呢"),o("？可以参考本讲的内容，思考下背后的原因。")],-1),G=t("p",null,"这一讲就到这里，感谢你学习本次课程，接下来我们将学习17 | 如何设计一锤子买卖的 SDK？再见。",-1);function L(X,y,J,$,j,z){const e=n("Image");return l(),_("div",null,[i,r(e,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image6/M01/0B/93/CioPOWA4wPCAKMjTAAF6vuqhWKk327.png"}),o(),c,u,g,h,r(e,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image6/M00/0B/97/Cgp9HWA4wQqAINH1AAH9ydtzMDA272.png"}),o(),d,m,A,f,I,k,r(e,{alt:"图片3.png",src:"https://s0.lgstatic.com/i/image6/M01/0B/95/CioPOWA4w6uAR_LXAAGD5bN8krE357.png"}),o(),T,r(e,{alt:"Drawing 7.png",src:"https://s0.lgstatic.com/i/image6/M00/0B/97/Cgp9HWA4wSOAF2RPAAGl-zh_Aiw066.png"}),o(),P,w,r(e,{alt:"Drawing 9.png",src:"https://s0.lgstatic.com/i/image6/M01/0B/94/CioPOWA4wSyAfNSVAAIAvc3bbD4761.png"}),o(),b,r(e,{alt:"Drawing 11.png",src:"https://s0.lgstatic.com/i/image6/M01/0B/94/CioPOWA4wTaAXGa8AAICLkEJ8a4313.png"}),o(),q,r(e,{alt:"Drawing 13.png",src:"https://s0.lgstatic.com/i/image6/M00/0B/97/Cgp9HWA4wU-AX2-2AAKSYsVmHTA435.png"}),o(),S,C,D,V,E,r(e,{alt:"Drawing 15.png",src:"https://s0.lgstatic.com/i/image6/M00/0B/94/CioPOWA4wV2AOnDOAAL0Vg4hu-I779.png"}),o(),M,N,W,B,r(e,{alt:"Drawing 17.png",src:"https://s0.lgstatic.com/i/image6/M00/0B/97/Cgp9HWA4wWeAAPlZAAIlxwcW9Cg417.png"}),o(),x,r(e,{alt:"Drawing 19.png",src:"https://s0.lgstatic.com/i/image6/M00/0B/97/Cgp9HWA4wXaAIjLyAAHREXnoOmk671.png"}),o(),H,r(e,{alt:"Drawing 21.png",src:"https://s0.lgstatic.com/i/image6/M00/0B/97/Cgp9HWA4wYGAM7OEAAFLlz1Is9c411.png"}),o(),O,K,R,U,v,G])}const Y=a(p,[["render",L]]);export{Q as __pageData,Y as default};
