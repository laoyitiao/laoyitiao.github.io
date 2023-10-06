import{_ as o,j as t,o as e,g as c,k as l,Q as p,s,h as a}from"./chunks/framework.b3d8e22e.js";const W=JSON.parse('{"title":"代码分层架构是什么 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/趣学设计模式_文档/趣学设计模式_文档/(6864) 03  分层思维：为什么要做代码分层架构？.md","filePath":"posts/backEnd/趣学设计模式_文档/趣学设计模式_文档/(6864) 03  分层思维：为什么要做代码分层架构？.md","lastUpdated":1696417798000}'),r={name:"posts/backEnd/趣学设计模式_文档/趣学设计模式_文档/(6864) 03  分层思维：为什么要做代码分层架构？.md"},i=p("",4),E=s("p",null,"其中，最为经典的软件架构就是分层架构，也就是将软件系统进行分层，现在几乎已经成为每个程序员最熟悉的思考模式之一。不过，分层架构越是流行，我们的设计越容易僵化。这背后到底有哪些值得我们深思的地方呢？",-1),y=s("p",null,"所以，今天我就从架构角度来聊聊为什么代码要做分层、主要用于解决什么问题，以及存在优势和劣势有哪些。",-1),_=s("h3",{id:"代码分层架构是什么",tabindex:"-1"},[a("代码分层架构是什么 "),s("a",{class:"header-anchor",href:"#代码分层架构是什么","aria-label":'Permalink to "代码分层架构是什么"'},"​")],-1),u=s("p",null,[a("要想彻底理解"),s("strong",null,"代码分层架构"),a(" ，就得从"),s("strong",null,"软件部署分层架构"),a("说起。首先我们来看一下常见的互联网软件部署分层架构，如下图所示：")],-1),g=p("",4),d=s("p",null,"我们能明显看到，MVC 分层架构是作用于程序本身的，程序作为一个整体被发布在服务器上运行使用。而类似 DB 里也有自己的分层架构，这里我们重点介绍应用程序中的代码分层架构，其他架构就不展开讨论了。",-1),h=s("p",null,"那么问题来了，什么是代码分层架构呢？",-1),T=s("p",null,[s("strong",null,'代码分层架构就是将软件"元素"（代码）按照"层"（代码关系）的方式组织起来的一种结构。')],-1),A=s("p",null,[s("strong",null,"分层架构核心的原则是：当请求或数据从外部传递过来后，必须是从上一层传递给下一层"),a("。如下图，一个来自 View 层的数据，必须先通过 Controller 层、Model 层后，才能最终到达数据库层。")],-1),C=s("p",null,[a('那么你可能会问："为什么不让 View 层的请求直接到达数据库呢？"这是因为会造成'),s("strong",null,"新的代码耦合，增加代码的复杂度"),a("。比如说，View 层直接调用 Model 层的组件，当 Model 层上的组件有变化时（比如， SQL 或逻辑修改），既会影响 Controller 层组件的使用，也会影响 View 层组件的使用（可参考下面的示意图）。")],-1),F=p("",10),m=s("p",null,"这个流程图代表了我们对最初始问题的分层拆分：先创建 HTTP 连接，然后向服务器发送一串字符串，最后关闭 HTTP 连接。",-1),P=s("p",null,'于是，原先的"如何通过 HTTP 向服务器发送字符串"的问题就变成了三个新层次的子问题：',-1),B=s("ul",null,[s("li",null,[s("p",null,"如何创建 HTTP 连接？")]),s("li",null,[s("p",null,"如何发送字符串？")]),s("li",null,[s("p",null,"如何关闭连接？")])],-1),D=s("p",null,"首先，在思考如何创建 HTTP 连接这个问题的过程中，你会发现，要想通过 HTTP 发送消息，至少得打开 HTTP 连接，建立 HTTP 会话，并使用 TCP 协议，这样才能通过网络发送数据。",-1),b=s("p",null,"接着，你又发现，当成功解决了这个问题后，发送字符串和关闭 HTTP 连接还有更多的问题需要解决，于是，你开始一步一步地去分解......最后的分解结果如下图所示：",-1),q=p("",26),S=s("h3",{id:"课后思考",tabindex:"-1"},[a("课后思考 "),s("a",{class:"header-anchor",href:"#课后思考","aria-label":'Permalink to "课后思考"'},"​")],-1),H=s("p",null,"除了分层架构外，你还熟悉哪些其他架构设计模式？有哪些优势和劣势？欢迎你在留言区与我分享。",-1),f=s("p",null,"在下一讲，我会接着和你分享如何用软件工程方法解决开发难题的相关内容，这用到了工程思维，在开发中也很是重要，记得按时来听课。",-1);function R(V,w,k,I,x,M){const n=t("Image");return e(),c("div",null,[i,l(n,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image6/M00/20/53/CioPOWBTAR6AE5_TAAYR2DR14T8759.png"}),E,y,_,u,l(n,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image6/M00/20/53/CioPOWBTAS2ACFHmAAJr8ZVP6AQ135.png"}),g,l(n,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image6/M00/20/53/CioPOWBTATWAVRQtAAMPRgLdi1U528.png"}),d,h,T,A,l(n,{alt:"Drawing 6.png",src:"https://s0.lgstatic.com/i/image6/M00/20/53/CioPOWBTAT2ALtPrAAcIY76Nrg8579.png"}),C,l(n,{alt:"Drawing 8.png",src:"https://s0.lgstatic.com/i/image6/M00/20/57/Cgp9HWBTAUWAAkVpAAZvbMiI5k8828.png"}),F,l(n,{alt:"Drawing 10.png",src:"https://s0.lgstatic.com/i/image6/M00/20/57/Cgp9HWBTAWCAQs0-AAC9nZ19hIM259.png"}),m,P,B,D,b,l(n,{alt:"Drawing 12.png",src:"https://s0.lgstatic.com/i/image6/M00/20/53/CioPOWBTAVeAe3_iAALi7XlJ35Y011.png"}),q,l(n,{alt:"Drawing 13.png",src:"https://s0.lgstatic.com/i/image6/M01/20/57/Cgp9HWBTAYOAd887AAXbJxXr52U705.png"}),S,H,f])}const v=o(r,[["render",R]]);export{W as __pageData,v as default};
