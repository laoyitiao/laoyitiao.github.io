import{_ as l,j as p,o as _,g as n,k as o,h as t,Q as e,s as a}from"./chunks/framework.a0d18f64.js";const D=JSON.parse('{"title":"10 如何利用依赖管控来提升写服务的性能和可用性？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/23讲搞定后台架构实战_文档/(6135) 10  如何利用依赖管控来提升写服务的性能和可用性？.md","filePath":"posts/backEnd/23讲搞定后台架构实战_文档/(6135) 10  如何利用依赖管控来提升写服务的性能和可用性？.md","lastUpdated":1696682708000}'),r={name:"posts/backEnd/23讲搞定后台架构实战_文档/(6135) 10  如何利用依赖管控来提升写服务的性能和可用性？.md"},i=e("",7),c=e("",7),h=a("p",null,"图 2：串行改并行的架构方案图",-1),d=a("p",null,[t("如果一个依赖接口的性能为 10ms，以串行执行的方式，请求完所有外部依赖就需要 200ms（10ms*20）。但改为并行执行后，只需要 10ms 即可完成。上述情况中，我们假设每个接口的性能都是 10ms，但在实际场景中并没有这么精确的数字，有的外部依赖可能快一点、有的可能慢一点。"),a("strong",null,"实际并行执行的耗时，等于最慢的那个接口的性能"),t("。")],-1),g=a("p",null,[t("全部外部依赖的接口都可以并行是一种理想情况。"),a("strong",null,"接口能否并行执行有一个前置条件，即两个接口间没有任何依赖关系"),t("，如果 A 接口执行的前置条件是需要 B 接口返回的数据才能执行，那么这两个接口则不能并行执行。按相互依赖梳理后的并行执行方案如下图 3 所示。对于并行中存在相互依赖的场景，并行化后的性能等于最长子串（下图 3 中红色框）的性能总和。")],-1),m=a("p",null,"图 3：并行中需串行执行的架构方式",-1),u=a("h3",{id:"依赖后置化",tabindex:"-1"},[t("依赖后置化 "),a("a",{class:"header-anchor",href:"#依赖后置化","aria-label":'Permalink to "依赖后置化"'},"​")],-1),A=a("p",null,[t("此外，"),a("strong",null,"虽然整个链路上会有较多外部接口，但大部分场景里，很多接口都是可以后置化的"),t("。后置化是指当接口里的业务流程处理完成并返回给用户之后，后置去处理一些非重要且对实时性无要求的场景。")],-1),P=a("p",null,"比如在提交订单后，用户只需要查看订单是否下单成功，以及对应的价格、商品和数量是否正确。而对于商品的详细描述信息、所归属的商家名称等信息并不会特别关心，如果在提单的同时还需要获取这些用户不太关心的信息，会给整个提单的性能和可用率带来非常大的影响。鉴于这种情况，可以在提单后异步补齐这些仅供展示的信息。",-1),T=a("p",null,"采用依赖后置化后，需要增加一个异步 Worker 进行数据补齐。架构如下图 4 所示：",-1),x=e("",7),b=a("p",null,"图 5：超时导致请求线程阻塞问题",-1),k=a("p",null,[t("在设置依赖的接口的超时阈值时，很多时候为了简便快速，大家都习惯设置一个不会太大，但下游接口实际执行时间远小于它的值，比如设置 3s 或者 5s。"),a("strong",null,'我建议在设置此值时，通过系统上线后的性能监控图进行设置，设置超时时间等于 Max 的性能值，依据数据说话而不是"拍脑袋"做决定'),t("。")],-1),q=a("p",null,[a("strong",null,"如果你依赖的下游接口毛刺特别严重，表现就是它的接口性能的 Max 和 TP999，或与 TP99 相差特别大"),t("，比如 TP999 在 200ms 左右，但 Max 在 3~5s 左右，如下图 6 所展示的情况：")],-1),C=e("",18);function f(M,S,I,V,N,E){const s=p("Image");return _(),n("div",null,[i,o(s,{alt:"图片1.png",src:"https://s0.lgstatic.com/i/image6/M01/04/03/CioPOWAgF4uAFY0PAAGYgvGkvxM216.png"}),t(),c,o(s,{alt:"图片2.png",src:"https://s0.lgstatic.com/i/image6/M01/04/05/Cgp9HWAgF5uADEYqAAHPmy1gS2k649.png"}),t(),h,d,g,o(s,{alt:"图片3.png",src:"https://s0.lgstatic.com/i/image6/M01/04/05/Cgp9HWAgF6mALm44AAINQaAXDIE637.png"}),t(),m,u,A,P,T,o(s,{alt:"图片4.png",src:"https://s0.lgstatic.com/i/image6/M01/04/03/CioPOWAgF7yAaOdrAAHWbNrl_pA443.png"}),t(),x,o(s,{alt:"图片5.png",src:"https://s0.lgstatic.com/i/image6/M01/04/05/Cgp9HWAgF8-ACkizAAE1akqDVL0240.png"}),t(),b,k,q,o(s,{alt:"图片6.png",src:"https://s0.lgstatic.com/i/image6/M01/04/05/Cgp9HWAgF-GAIDHIAAGMBvu8NCs996.png"}),t(),C])}const H=l(r,[["render",f]]);export{D as __pageData,H as default};
