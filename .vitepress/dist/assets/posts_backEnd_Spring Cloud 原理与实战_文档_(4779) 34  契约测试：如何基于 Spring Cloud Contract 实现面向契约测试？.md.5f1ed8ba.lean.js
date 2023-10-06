import{_ as o,j as t,o as e,g as r,k as l,h as n,s,Q as p}from"./chunks/framework.b3d8e22e.js";const f=JSON.parse('{"title":"什么是 Spring Cloud Contract？ ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/Spring Cloud 原理与实战_文档/(4779) 34  契约测试：如何基于 Spring Cloud Contract 实现面向契约测试？.md","filePath":"posts/backEnd/Spring Cloud 原理与实战_文档/(4779) 34  契约测试：如何基于 Spring Cloud Contract 实现面向契约测试？.md","lastUpdated":1696417798000}'),c={name:"posts/backEnd/Spring Cloud 原理与实战_文档/(4779) 34  契约测试：如何基于 Spring Cloud Contract 实现面向契约测试？.md"},i=s("p",null,"在上一课时中，我们介绍了组件级别的测试方案和实现方法。组件级别的测试关注于单个微服务的内部，而今天要介绍的面向契约测试则是一种服务级别的测试方法，关注于整个微服务系统中的数据和状态传递过程。Spring Cloud Contract 是 Spring Cloud 中专门用于实现面向契约测试的开发框架，对面向契约的端到端测试过程进行了抽象和提炼，并梳理出一套完整的解决方案。让我们一起来看一下。",-1),E=s("h3",{id:"什么是-spring-cloud-contract",tabindex:"-1"},[n("什么是 Spring Cloud Contract？ "),s("a",{class:"header-anchor",href:"#什么是-spring-cloud-contract","aria-label":'Permalink to "什么是 Spring Cloud Contract？"'},"​")],-1),u=s("p",null,"在引入 Spring Cloud Contract 之前，我们需要先明确在测试领域中另一个非常重要的概念，即 Stub，也就是打桩。Stub 与 Mock 经常被混淆，因为他们都可以用来替代真实的依赖对象，从而实现对测试对象的隔离效果。然而，Stub 和 Mock 的区别也非常明显，从类的实现方式上看，Stub 必须有一个显式的类实现，这个实现类需要提供被替代对象的所有逻辑，即使是不需要关注的方法也至少要给出空实现。而 Mock 则不同，它只需要实现自己感兴趣的方法即可，这点在上一课时中已经得到了体现。",-1),y=s("p",null,"回到 SpringHealth 案例系统，我们来看基于 Stub 的测试场景，如下图所示：",-1),d=p("",8),g=p("",37);function q(h,m,b,v,C,S){const a=t("Image");return e(),r("div",null,[i,E,u,y,l(a,{alt:"图片1.png",src:"https://s0.lgstatic.com/i/image2/M01/05/5A/Cip5yF__uIuAbLcFAAHK4CP0YMY943.png"}),n(),d,l(a,{alt:"图片2.png",src:"https://s0.lgstatic.com/i/image2/M01/05/5C/CgpVE1__uKyACLiNAAJkLYEm61s912.png"}),n(),g])}const T=o(c,[["render",q]]);export{f as __pageData,T as default};
