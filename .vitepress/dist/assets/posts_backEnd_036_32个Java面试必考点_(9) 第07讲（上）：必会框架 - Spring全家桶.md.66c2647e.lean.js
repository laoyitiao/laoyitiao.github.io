import{_ as n,j as r,o as p,g as l,k as a,s as e,h as o,Q as i}from"./chunks/framework.b3d8e22e.js";const G=JSON.parse('{"title":"常用框架汇总 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/036_32个Java面试必考点/(9) 第07讲（上）：必会框架 - Spring全家桶.md","filePath":"posts/backEnd/036_32个Java面试必考点/(9) 第07讲（上）：必会框架 - Spring全家桶.md","lastUpdated":1696417798000}'),s={name:"posts/backEnd/036_32个Java面试必考点/(9) 第07讲（上）：必会框架 - Spring全家桶.md"},c=e("p",null,"本课时主要介绍 Java 中常用的应用框架，重点讲解如下三部分内容。",-1),_=e("ol",null,[e("li",null,[e("p",null,"Spring 框架中的主要知识点；")]),e("li",null,[e("p",null,"NIO 框架 Netty 以及基于 Netty 实现的主流 RPC 框架 Motan、Dubbo 和 gRPC；")]),e("li",null,[e("p",null,"ORM 框架 MyBatis。")])],-1),S=e("h6",{id:"常用框架汇总",tabindex:"-1"},[o("常用框架汇总 "),e("a",{class:"header-anchor",href:"#常用框架汇总","aria-label":'Permalink to "常用框架汇总"'},"​")],-1),h=e("p",null,"先来看常用框架的知识点汇总，如下图所示。",-1),g=e("br",null,null,-1),B=i("",29),d=e("p",null,"在 Spring 中，对象的属性是由对象自己创建的，就是正向流程；如果属性不是对象创建，而是由 Spring 来自动进行装配，就是控制反转。这里的 DI 也就是依赖注入，就是实现控制反转的方式。正向流程导致了对象于对象之间的高耦合，IoC 可以解决对象耦合的问题，有利于功能的复用，能够使程序的结构变得非常灵活。",-1),u=e("h6",{id:"context-和-bean",tabindex:"-1"},[o("Context 和 Bean "),e("a",{class:"header-anchor",href:"#context-和-bean","aria-label":'Permalink to "Context 和 Bean"'},"​")],-1),C=e("p",null,"Spring 进行 IoC 实现时使用的两个概念：Context 上下文和 Bean。如下图所示，所有被 Spring 管理的、由 Spring 创建的、用于依赖注入的对象，就叫作一个 Bean。Spring 创建并完成依赖注入后，所有 Bean 统一放在一个叫作 Context 的上下文中进行管理。",-1),b=e("br",null,null,-1),A=e("h6",{id:"aop",tabindex:"-1"},[o("AOP "),e("a",{class:"header-anchor",href:"#aop","aria-label":'Permalink to "AOP"'},"​")],-1),P=e("p",null,"AOP，就是面向切面编程。如下图所示，一般我们的程序执行流程是从 Controller 层调用 Service 层、然后 Service 层调用 DAO 层访问数据，最后在逐层返回结果。这个是图中向下箭头所示的按程序执行顺序的纵向处理。",-1),y=e("br",null,null,-1),x=e("p",null,"但是，我们思考这样一个问题，一个系统中会有多个不同的服务，例如用户服务、商品信息服务等等，每个服务的Controller层都需要验证参数，都需要处理异常，如果按照图中红色的部分，对不同服务的纵向处理流程进行横切，在每个切面上完成通用的功能，例如身份认证、验证参数、处理异常等等、这样就不用在每个服务中都写相同的逻辑了，这就是 AOP 思想解决的问题。AOP 以功能进行划分，对服务顺序执行流程中的不同位置进行横切，完成各服务共同需要实现的功能。",-1),m=e("h6",{id:"组件",tabindex:"-1"},[o("组件 "),e("a",{class:"header-anchor",href:"#组件","aria-label":'Permalink to "组件"'},"​")],-1),f=e("p",null,"再来看到 Spring 框架，下图中列出了 Spring 框架主要包含的组件。这张图来自 Spring4.x 的文档。目前最新的 5.x 版本中右面的 Portlet 组件已经被废弃掉，同时增加了用于异步响应式处理的 WebFlux 组件。这里不需要对所有的组件都详细了解，只需要重点了解最常用的几个组件实现，以及知道每个组件用来实现哪一类功能就可以了。",-1),T=e("br",null,null,-1),M=e("p",null,"图中红框框住的是比较重要的组件，Core 组件是 Spring 所有组件的核心；Bean 组件和 Context 组件我刚才提到了，是实现 IoC 和依赖注入的基础；AOP 组件用来实现面向切面编程；Web 组件包括 SpringMVC，是 Web 服务的控制层实现。",-1),I=e("h6",{id:"动态代理和静态代理",tabindex:"-1"},[o("动态代理和静态代理 "),e("a",{class:"header-anchor",href:"#动态代理和静态代理","aria-label":'Permalink to "动态代理和静态代理"'},"​")],-1),O=e("p",null,"接下来是 Spring 中机制和概念相关的知识点，如下图所示。",-1),R=e("br",null,null,-1),k=i("",17),q=i("",9),V=i("",9),E=i("",7),F=i("",6),D=i("",10);function N(v,J,L,W,Q,H){const t=r("Image");return p(),l("div",null,[c,_,S,h,g,a(t,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/C6/CgoB5l14puyAas0oAABAOzPMKjQ128.png"}),B,a(t,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/E6/CgotOV14puyAODLyAAAnwOuTkEk368.png"}),d,u,C,b,a(t,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/C6/CgoB5l14puyAWtEwAAA9kZ-6cDw595.png"}),A,P,y,a(t,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/E6/CgotOV14puyAUnRTAAAlyBIiwZM437.png"}),x,m,f,T,a(t,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/C6/CgoB5l14puyAXsN8AAB-CNBQpnQ843.png"}),M,I,O,R,a(t,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/E6/CgotOV14puyAZTSdAAGNifGMENk298.png"}),k,a(t,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/C6/CgoB5l14puyAK0COAAGd_8jLTtQ986.png"}),q,a(t,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/E6/CgotOV14puyAX4lxAACLbBAfsE8470.png"}),V,a(t,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/C6/CgoB5l14puyAAa1gAABPP0lufvQ678.png"}),E,a(t,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/E6/CgotOV14puyAOsrSAAB6eiNuRJY924.png"}),F,a(t,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/C6/CgoB5l14puyAX-52AAFrldgEgbY662.png"}),D])}const z=n(s,[["render",N]]);export{G as __pageData,z as default};
