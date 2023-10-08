import{_ as r,j as e,o as n,g as _,k as p,h as t,Q as s,s as o}from"./chunks/framework.a0d18f64.js";const B=JSON.parse('{"title":"20如何通过监控快速发现问题？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/23讲搞定后台架构实战_文档/(6145) 20  如何通过监控快速发现问题？.md","filePath":"posts/backEnd/23讲搞定后台架构实战_文档/(6145) 20  如何通过监控快速发现问题？.md","lastUpdated":1696682708000}'),i={name:"posts/backEnd/23讲搞定后台架构实战_文档/(6145) 20  如何通过监控快速发现问题？.md"},l=s("",6),g=s("",5),c=s("",9),h=o("p",null,"图 3：性能监控图",-1),d=o("h4",{id:"_3-可用率监控",tabindex:"-1"},[t("3. 可用率监控 "),o("a",{class:"header-anchor",href:"#_3-可用率监控","aria-label":'Permalink to "3. 可用率监控"'},"​")],-1),u=o("p",null,[t("可用率里的被监控体是在指定时间里，代码执行成功的占比。假设在指定时间间隔里，代码运行了 100 次，其中 99 次"),o("strong",null,"经过判断"),t("都为成功，那么在可用率监控图里 Y 轴显示的值即为 99%，具体格式可以参考下图 4 所示：")],-1),m=o("p",null,"图 4：可用率监控图",-1),P=o("p",null,'讲述"确定某一方法在执行时是否成功"时，我使用了"经过判断"这一描述。这里使用相对抽象的描述，是因为在不同的场景下，判断某一个方法执行是否成功的准则不同。同样的执行结果，在某些场景里被认为是成功，在某些场景里则认为是失败。接下来，在可用率的小节将详细描述这些场景及对应的规则。',-1),A=o("h3",{id:"如何通过监控发现微服务的问题",tabindex:"-1"},[t("如何通过监控发现微服务的问题 "),o("a",{class:"header-anchor",href:"#如何通过监控发现微服务的问题","aria-label":'Permalink to "如何通过监控发现微服务的问题"'},"​")],-1),T=o("p",null,[t('这里我仍基于"'),o("a",{href:"https://kaiwu.lagou.com/course/courseInfo.htm?courseId=595#/detail/pc?id=6142",target:"_blank",rel:"noreferrer"},"第 17 讲"),t('"里介绍的微服务骨架图，如下图 5 所示，从微服务的入口、微服务自身及微服务的依赖这三个方面，讲解如何应用上述三种监控方式，以及对应的一些最佳实践准则，从而发现微服务里的各种潜在问题。')],-1),q=s("",41),b=s("",14);function f(k,C,I,x,S,V){const a=e("Image");return n(),_("div",null,[l,p(a,{alt:"图片1.png",src:"https://s0.lgstatic.com/i/image6/M01/1A/79/CioPOWBLZgaAMLn3AACBiekGm_4489.png"}),t(),g,p(a,{alt:"图片2.png",src:"https://s0.lgstatic.com/i/image6/M01/1A/7D/Cgp9HWBLZiKAT1GWAACPbOwvyDg209.png"}),t(),c,p(a,{alt:"图片3.png",src:"https://s0.lgstatic.com/i/image6/M01/1A/7D/Cgp9HWBLZkSAWvD5AAEUJGfQQZI875.png"}),t(),h,d,u,p(a,{alt:"图片4.png",src:"https://s0.lgstatic.com/i/image6/M01/1A/7A/CioPOWBLZlKAeiL4AABxIkMndI0343.png"}),t(),m,P,A,T,p(a,{alt:"图片5.png",src:"https://s0.lgstatic.com/i/image6/M01/1A/7A/CioPOWBLZl6AQjt2AADlVY40RFw833.png"}),t(),q,p(a,{alt:"图片6.png",src:"https://s0.lgstatic.com/i/image6/M00/1A/7A/CioPOWBLZm6AE7rIAAD2nXxp1g0567.png"}),t(),b])}const D=r(i,[["render",f]]);export{B as __pageData,D as default};
