import{_ as r,j as e,o as n,g as _,k as p,h as o,s as t,Q as s}from"./chunks/framework.b3d8e22e.js";const R=JSON.parse('{"title":"什么是监控 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/23讲搞定后台架构实战_文档/(6145) 20  如何通过监控快速发现问题？.md","filePath":"posts/backEnd/23讲搞定后台架构实战_文档/(6145) 20  如何通过监控快速发现问题？.md","lastUpdated":1696417798000}'),l={name:"posts/backEnd/23讲搞定后台架构实战_文档/(6145) 20  如何通过监控快速发现问题？.md"},i=t("p",null,[o('前三讲基于"'),t("strong",null,"防备上游、做好自己、怀疑下游"),o('"的准则，讲解了如何通过系统设计、部署，以及代码编写的方式来构建一个更加高可用的后台系统。')],-1),g=t("p",null,"基于上述三个准则提出的方案可以预防部分问题，但百密一疏，即使我们做了很多防护措施，仍无法保证绝对安全，避免问题发生。此时作为系统的负责人，你需要在第一时间，也就是用户感知前发现问题。",-1),c=t("p",null,[o("发现问题的方法便是"),t("strong",null,"监控"),o("，本讲将介绍如何设计微服务的监控，帮助你在日常系统维护时，更快地、自动地发现问题。")],-1),h=t("h3",{id:"什么是监控",tabindex:"-1"},[o("什么是监控 "),t("a",{class:"header-anchor",href:"#什么是监控","aria-label":'Permalink to "什么是监控"'},"​")],-1),d=t("p",null,"监控是指对被监控体的运行状态数据进行持续地审查，并设置运行状态数据不符合要求的阈值，对不符合阈值的运行状态主动报警的一种方式。被监控体的运行状态数据通常以如下图 1 中 XY 轴的格式进行展示。",-1),u=s("",5),m=s("",9),P=t("p",null,"图 3：性能监控图",-1),A=t("h4",{id:"_3-可用率监控",tabindex:"-1"},[o("3. 可用率监控 "),t("a",{class:"header-anchor",href:"#_3-可用率监控","aria-label":'Permalink to "3. 可用率监控"'},"​")],-1),T=t("p",null,[o("可用率里的被监控体是在指定时间里，代码执行成功的占比。假设在指定时间间隔里，代码运行了 100 次，其中 99 次"),t("strong",null,"经过判断"),o("都为成功，那么在可用率监控图里 Y 轴显示的值即为 99%，具体格式可以参考下图 4 所示：")],-1),b=t("p",null,"图 4：可用率监控图",-1),f=t("p",null,'讲述"确定某一方法在执行时是否成功"时，我使用了"经过判断"这一描述。这里使用相对抽象的描述，是因为在不同的场景下，判断某一个方法执行是否成功的准则不同。同样的执行结果，在某些场景里被认为是成功，在某些场景里则认为是失败。接下来，在可用率的小节将详细描述这些场景及对应的规则。',-1),q=t("h3",{id:"如何通过监控发现微服务的问题",tabindex:"-1"},[o("如何通过监控发现微服务的问题 "),t("a",{class:"header-anchor",href:"#如何通过监控发现微服务的问题","aria-label":'Permalink to "如何通过监控发现微服务的问题"'},"​")],-1),k=t("p",null,[o('这里我仍基于"'),t("a",{href:"https://kaiwu.lagou.com/course/courseInfo.htm?courseId=595#/detail/pc?id=6142",target:"_blank",rel:"noreferrer"},"第 17 讲"),o('"里介绍的微服务骨架图，如下图 5 所示，从微服务的入口、微服务自身及微服务的依赖这三个方面，讲解如何应用上述三种监控方式，以及对应的一些最佳实践准则，从而发现微服务里的各种潜在问题。')],-1),C=s("",41),I=s("",14);function x(S,V,M,B,D,L){const a=e("Image");return n(),_("div",null,[i,g,c,h,d,p(a,{alt:"图片1.png",src:"https://s0.lgstatic.com/i/image6/M01/1A/79/CioPOWBLZgaAMLn3AACBiekGm_4489.png"}),o(),u,p(a,{alt:"图片2.png",src:"https://s0.lgstatic.com/i/image6/M01/1A/7D/Cgp9HWBLZiKAT1GWAACPbOwvyDg209.png"}),o(),m,p(a,{alt:"图片3.png",src:"https://s0.lgstatic.com/i/image6/M01/1A/7D/Cgp9HWBLZkSAWvD5AAEUJGfQQZI875.png"}),o(),P,A,T,p(a,{alt:"图片4.png",src:"https://s0.lgstatic.com/i/image6/M01/1A/7A/CioPOWBLZlKAeiL4AABxIkMndI0343.png"}),o(),b,f,q,k,p(a,{alt:"图片5.png",src:"https://s0.lgstatic.com/i/image6/M01/1A/7A/CioPOWBLZl6AQjt2AADlVY40RFw833.png"}),o(),C,p(a,{alt:"图片6.png",src:"https://s0.lgstatic.com/i/image6/M00/1A/7A/CioPOWBLZm6AE7rIAAD2nXxp1g0567.png"}),o(),I])}const N=r(l,[["render",x]]);export{R as __pageData,N as default};
