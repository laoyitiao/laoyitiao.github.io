import{_ as n,j as e,o as _,g as p,k as o,h as a,s as t,Q as l}from"./chunks/framework.b3d8e22e.js";const B=JSON.parse('{"title":"链路依赖的全貌 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/23讲搞定后台架构实战_文档/(6135) 10  如何利用依赖管控来提升写服务的性能和可用性？.md","filePath":"posts/backEnd/23讲搞定后台架构实战_文档/(6135) 10  如何利用依赖管控来提升写服务的性能和可用性？.md","lastUpdated":1696417798000}'),i={name:"posts/backEnd/23讲搞定后台架构实战_文档/(6135) 10  如何利用依赖管控来提升写服务的性能和可用性？.md"},r=t("p",null,"本模块的前几讲讨论了在存储上如何分库分表、如何构建无状态存储集群，来打造一个高可用的、支持海量数据存储的写业务的系统架构。",-1),c=t("p",null,"在写业务的系统架构里，除了需要关注存储上的高可用，写链路上的各项外部依赖的管控同样十分重要。因为即使存储的高可用做好了，也可能会因为外部依赖的不可用进而导致系统故障。比如写链路上依赖的某一个接口性能抖动或者接口故障，都会导致你的系统不可用。对于此问题，本讲将介绍一个提升写服务性能和可用性的升级架构方案，详细讲解如何对写链路依赖进行精细化管控。",-1),h=t("h3",{id:"链路依赖的全貌",tabindex:"-1"},[a("链路依赖的全貌 "),t("a",{class:"header-anchor",href:"#链路依赖的全貌","aria-label":'Permalink to "链路依赖的全貌"'},"​")],-1),d=t("p",null,"完成一个写请求时，不仅需要依赖存储，大部分场景还需要依赖各种外部第三方提供的接口。比如：",-1),g=t("ol",null,[t("li",null,[t("p",null,"当你发布一条微博，在数据存储至数据库前，不仅需要依赖用户模块校验用户的有效性、还需要依赖安全过滤非法内容等；")]),t("li",null,[t("p",null,"在创建订单时，同样是先要校验用户有效性、再校验用户的收货地址合法性，以及获取最新价格、扣减库存、扣减支付金额等。完成上述的校验和数据获取，最后一步才是写存储。")])],-1),u=t("p",null,"其他的写场景，比如发布短视频、发布博客等亦是如此。上述几种场景的架构如下图 1 所示：",-1),m=l("",7),A=t("p",null,"图 2：串行改并行的架构方案图",-1),P=t("p",null,[a("如果一个依赖接口的性能为 10ms，以串行执行的方式，请求完所有外部依赖就需要 200ms（10ms*20）。但改为并行执行后，只需要 10ms 即可完成。上述情况中，我们假设每个接口的性能都是 10ms，但在实际场景中并没有这么精确的数字，有的外部依赖可能快一点、有的可能慢一点。"),t("strong",null,"实际并行执行的耗时，等于最慢的那个接口的性能"),a("。")],-1),T=t("p",null,[a("全部外部依赖的接口都可以并行是一种理想情况。"),t("strong",null,"接口能否并行执行有一个前置条件，即两个接口间没有任何依赖关系"),a("，如果 A 接口执行的前置条件是需要 B 接口返回的数据才能执行，那么这两个接口则不能并行执行。按相互依赖梳理后的并行执行方案如下图 3 所示。对于并行中存在相互依赖的场景，并行化后的性能等于最长子串（下图 3 中红色框）的性能总和。")],-1),x=t("p",null,"图 3：并行中需串行执行的架构方式",-1),b=t("h3",{id:"依赖后置化",tabindex:"-1"},[a("依赖后置化 "),t("a",{class:"header-anchor",href:"#依赖后置化","aria-label":'Permalink to "依赖后置化"'},"​")],-1),k=t("p",null,[a("此外，"),t("strong",null,"虽然整个链路上会有较多外部接口，但大部分场景里，很多接口都是可以后置化的"),a("。后置化是指当接口里的业务流程处理完成并返回给用户之后，后置去处理一些非重要且对实时性无要求的场景。")],-1),q=t("p",null,"比如在提交订单后，用户只需要查看订单是否下单成功，以及对应的价格、商品和数量是否正确。而对于商品的详细描述信息、所归属的商家名称等信息并不会特别关心，如果在提单的同时还需要获取这些用户不太关心的信息，会给整个提单的性能和可用率带来非常大的影响。鉴于这种情况，可以在提单后异步补齐这些仅供展示的信息。",-1),M=t("p",null,"采用依赖后置化后，需要增加一个异步 Worker 进行数据补齐。架构如下图 4 所示：",-1),f=l("",7),C=t("p",null,"图 5：超时导致请求线程阻塞问题",-1),I=t("p",null,[a("在设置依赖的接口的超时阈值时，很多时候为了简便快速，大家都习惯设置一个不会太大，但下游接口实际执行时间远小于它的值，比如设置 3s 或者 5s。"),t("strong",null,'我建议在设置此值时，通过系统上线后的性能监控图进行设置，设置超时时间等于 Max 的性能值，依据数据说话而不是"拍脑袋"做决定'),a("。")],-1),S=t("p",null,[t("strong",null,"如果你依赖的下游接口毛刺特别严重，表现就是它的接口性能的 Max 和 TP999，或与 TP99 相差特别大"),a("，比如 TP999 在 200ms 左右，但 Max 在 3~5s 左右，如下图 6 所展示的情况：")],-1),N=l("",18);function V(E,W,H,D,F,v){const s=e("Image");return _(),p("div",null,[r,c,h,d,g,u,o(s,{alt:"图片1.png",src:"https://s0.lgstatic.com/i/image6/M01/04/03/CioPOWAgF4uAFY0PAAGYgvGkvxM216.png"}),a(),m,o(s,{alt:"图片2.png",src:"https://s0.lgstatic.com/i/image6/M01/04/05/Cgp9HWAgF5uADEYqAAHPmy1gS2k649.png"}),a(),A,P,T,o(s,{alt:"图片3.png",src:"https://s0.lgstatic.com/i/image6/M01/04/05/Cgp9HWAgF6mALm44AAINQaAXDIE637.png"}),a(),x,b,k,q,M,o(s,{alt:"图片4.png",src:"https://s0.lgstatic.com/i/image6/M01/04/03/CioPOWAgF7yAaOdrAAHWbNrl_pA443.png"}),a(),f,o(s,{alt:"图片5.png",src:"https://s0.lgstatic.com/i/image6/M01/04/05/Cgp9HWAgF8-ACkizAAE1akqDVL0240.png"}),a(),C,I,S,o(s,{alt:"图片6.png",src:"https://s0.lgstatic.com/i/image6/M01/04/05/Cgp9HWAgF-GAIDHIAAGMBvu8NCs996.png"}),a(),N])}const R=n(i,[["render",V]]);export{B as __pageData,R as default};
