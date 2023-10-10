import{_ as p,j as l,o as e,g as r,k as n,h as t,Q as a,s}from"./chunks/framework.cfb14fe0.js";const O=JSON.parse('{"title":"07如何基于流量回放实现读服务的自动化测试回归？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/23讲搞定后台架构实战_文档/(6132) 07  如何基于流量回放实现读服务的自动化测试回归？.md","filePath":"posts/backEnd/23讲搞定后台架构实战_文档/(6132) 07  如何基于流量回放实现读服务的自动化测试回归？.md","lastUpdated":1696682708000}'),_={name:"posts/backEnd/23讲搞定后台架构实战_文档/(6132) 07  如何基于流量回放实现读服务的自动化测试回归？.md"},c=a("",15),i=s("p",null,"图 1：新老版本的接口未变架构图",-1),g=s("h4",{id:"整体架构",tabindex:"-1"},[t("整体架构 "),s("a",{class:"header-anchor",href:"#整体架构","aria-label":'Permalink to "整体架构"'},"​")],-1),h=s("p",null,"下图 2 是读服务的自动化测试回归的整体架构：",-1),d=a("",5),u=a("",6),A=s("p",null,"图 4：单独进程的日志收集架构图",-1),q=s("p",null,"采用单独进程后，业务应用需要按上述格式将出入参日志打印到指定文件。单独的数据收集进程只需要对此文件进行监控并将变化数据发送至 MQ 即可。在操作系统里，可以单独对进程设置资源占用的限制。为了保证业务应用不被日志采集所影响，可以对采集进程设置内存、CPU 等限制，并配置资源占用报警等。",-1),E=s("h4",{id:"数据回放",tabindex:"-1"},[t("数据回放 "),s("a",{class:"header-anchor",href:"#数据回放","aria-label":'Permalink to "数据回放"'},"​")],-1),T=s("p",null,[t("有了上面的出入参之后，便可以在测试时进行回放了。"),s("strong",null,"数据回放主要的作用是基于日志里记录的接口信息"),t(" （"),s("strong",null,"HTTP 便为域名"),t(" ）"),s("strong",null,"和入参，去实时调用被测系统，并存储实时回放返回的出参信息"),t("。整体架构如下图 5 所示：")],-1),y=s("p",null,"图 5：实时数据回放架构图",-1),m=s("p",null,"实时回放时，如果是 HTTP 形式的接口，采用主流的 HTTP 客户端即可。如果是 RPC 形式接口，需要使用该 RPC 框架提供的能够调用任意被测接口的客户端。",-1),C=s("h4",{id:"差异对比",tabindex:"-1"},[t("差异对比 "),s("a",{class:"header-anchor",href:"#差异对比","aria-label":'Permalink to "差异对比"'},"​")],-1),P=s("p",null,"在完成了数据回放后，便可以对回放产生的结果数据与预期数据（比如收集日志里的出参）进行比较。数据对比有很多形式，比如基于二进制校验和、基于文本等。二进制校验和的方式只是告诉你数据是否整体一致，而不会展示具体哪里不一致。即使展示了，但因为是二进制，人工也无法查看。",-1),F=s("p",null,"此处数据对比采用文本形式，先将数据转换为 JSON 格式，再进行对比。使用文本格式，可以看到数据整体不一致，以及具体是何处导致的不一致。如下图 6 所示：",-1),b=a("",8),S=s("p",null,"图 7：离线回放模式架构图",-1),f=s("p",null,"采用离线回放的好处是，减少了对于线上老版本的调用量，避免对线上产生影响也节约了资源。但存在一个问题，如果后台存储中的数据已经发生了变化，此时就不能使用收集的日志里的出参。因为从新版本实时查出的数据与历史收集的日志数据已经不准了。",-1),V=s("p",null,[s("strong",null,"2. 实时回放模式")],-1),B=s("p",null,"为了解决离线回放模式里，因为数据变化导致收集的日志里的出参无效问题，可以采用实时回放的模式，如下图 8 所示的架构图。上述架构在收集的日志里，只记录入参而不记录出参，收集流程见下图 8 中的标记 3。",-1),k=s("p",null,"图 8：基于录制的实时回放模式",-1),I=s("p",null,"实时回放的模式会在上图 8 中的标记 4，研发或测试手动触发回放功能后，使用入参实时的调用新老版本的被测应用，并对比双方返回的出参，通过此方式可以规避数据变更的问题。",-1),X=s("p",null,[s("strong",null,"3. 无录制的实时回放模式")],-1),R=s("p",null,"不管是离线回放还是实时回放都存在一个问题，我们是对接口的入参进行录制（存储至 NoSQL 里，如上图 8 里的 HBase）再回放的。因存储容量有限，只能存储一定数量的数据，很多日志用例可能会被丢弃。这就可能导致有些重要场景会被漏测。针对这个问题，可以采用无录制的实时回放模式，架构如下图 9 所示：",-1),x=a("",9);function H(M,N,v,D,Q,L){const o=l("Image");return e(),r("div",null,[c,n(o,{alt:"图片1.png",src:"https://s0.lgstatic.com/i/image2/M01/0A/55/CgpVE2ARc56AKIqpAADtscMceoA827.png"}),t(),i,g,h,n(o,{alt:"图片2.png",src:"https://s0.lgstatic.com/i/image2/M01/0A/53/Cip5yGARc7aACfA0AAIMwOOGQVI827.png"}),t(),d,n(o,{alt:"图片3.png",src:"https://s0.lgstatic.com/i/image2/M01/0A/55/CgpVE2ARc9aAdHQhAAELiU70Zfc439.png"}),t(),u,n(o,{alt:"图片4.png",src:"https://s0.lgstatic.com/i/image2/M01/0A/53/Cip5yGARc-yAbjpsAAEZL1bjU_w752.png"}),t(),A,q,E,T,n(o,{alt:"图片5.png",src:"https://s0.lgstatic.com/i/image2/M01/0A/55/CgpVE2ARc_6AWu0pAAFrgZC6HL8292.png"}),t(),y,m,C,P,F,n(o,{alt:"Drawing 5.png",src:"https://s0.lgstatic.com/i/image2/M01/0A/29/Cip5yGAQ_r-AfWupAAAOp8hsAVE657.png"}),t(),b,n(o,{alt:"图片6.png",src:"https://s0.lgstatic.com/i/image2/M01/0A/55/CgpVE2ARdCOAAgraAAFIWdI1x2o148.png"}),t(),S,f,V,B,n(o,{alt:"图片7.png",src:"https://s0.lgstatic.com/i/image2/M01/0A/55/CgpVE2ARdDqAe5eqAAIf2ntzUx8420.png"}),t(),k,I,X,R,n(o,{alt:"图片8.png",src:"https://s0.lgstatic.com/i/image2/M01/0A/53/Cip5yGARdEyAHxHYAAHfXL_5x5Y385.png"}),t(),x])}const j=p(_,[["render",H]]);export{O as __pageData,j as default};
