import{_ as p,j as l,o,g as e,k as t,h as n,Q as r,s}from"./chunks/framework.b3d8e22e.js";const D=JSON.parse('{"title":"访问配置中心中的配置项 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/Spring Cloud 原理与实战_文档/(4763) 18  配置集成：如何访问配置中心中的配置信息？.md","filePath":"posts/backEnd/Spring Cloud 原理与实战_文档/(4763) 18  配置集成：如何访问配置中心中的配置信息？.md","lastUpdated":1696417798000}'),c={name:"posts/backEnd/Spring Cloud 原理与实战_文档/(4763) 18  配置集成：如何访问配置中心中的配置信息？.md"},E=r("",58),y=s("p",null,"Spring Cloud Config 客户端访问服务端配置代码执行流程图（红色背景为客户端组件，绿色背景为服务端组件）",-1),i=s("h3",{id:"小结与预告",tabindex:"-1"},[n("小结与预告 "),s("a",{class:"header-anchor",href:"#小结与预告","aria-label":'Permalink to "小结与预告"'},"​")],-1),u=s("p",null,"沿着上一课时的内容，本课时关注于如何使用 Spring Cloud Config Client 组件来访问位于配置服务器中的配置信息。我们通过引入 @Value 注解以及 @ConfigurationProperties 注解来实现了这一目标。同样的，我们发现使用这些注解非常简单方便，Spring Cloud Config 为我们自动屏蔽了所有内部的复杂实现逻辑。但对于你来说，还是结合本课时中给出的源码级的原理分析来深入背后的理解底层机制。",-1),g=s("p",null,"这里给你留一道思考题：为什么在类路径中添加了 Spring Cloud Config Client 组件之后，业务系统就能自动获取位于服务器端的配置信息呢？",-1),d=s("p",null,"在介绍完 Spring Cloud Config Client 组件之后，关于 Spring Cloud Config 我们还有一个核心的问题没有回答，即一旦位于配置服务器中的配置信息发生变更时，如何让各个客户端保持同步更新呢？这就是下一课时需要讨论的内容。",-1);function F(C,h,v,A,S,f){const a=l("Image");return o(),e("div",null,[E,t(a,{alt:"Lark20201119-171509.png",src:"https://s0.lgstatic.com/i/image/M00/6F/A4/CgqCHl-2N7yAbh1uAAGwzgZ2zng454.png"}),n(),y,i,u,g,d])}const b=p(c,[["render",F]]);export{D as __pageData,b as default};
