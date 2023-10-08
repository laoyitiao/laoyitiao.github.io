import{_ as l,j as o,o as e,g as t,k as p,h as n,s,Q as c}from"./chunks/framework.4e7d56ce.js";const L=JSON.parse('{"title":"第51讲：如何利用CompletableFuture实现“旅游平台”问题？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/096-Java 并发编程文档/(289) 第51讲：如何利用 CompletableFuture 实现“旅游平台”问题？.md","filePath":"posts/backEnd/096-Java 并发编程文档/(289) 第51讲：如何利用 CompletableFuture 实现“旅游平台”问题？.md","lastUpdated":1696682708000}'),r={name:"posts/backEnd/096-Java 并发编程文档/(289) 第51讲：如何利用 CompletableFuture 实现“旅游平台”问题？.md"},E=s("h1",{id:"第51讲-如何利用completablefuture实现-旅游平台-问题",tabindex:"-1"},[n("第51讲：如何利用CompletableFuture实现“旅游平台”问题？ "),s("a",{class:"header-anchor",href:"#第51讲-如何利用completablefuture实现-旅游平台-问题","aria-label":'Permalink to "第51讲：如何利用CompletableFuture实现“旅游平台”问题？"'},"​")],-1),y=s("p",null,"本课时我们主要讲解如何利用 CompletableFuture 实现旅游平台问题。",-1),i=s("h3",{id:"旅游平台问题",tabindex:"-1"},[n("旅游平台问题 "),s("a",{class:"header-anchor",href:"#旅游平台问题","aria-label":'Permalink to "旅游平台问题"'},"​")],-1),F=s("p",null,"什么是旅游平台问题呢？如果想要搭建一个旅游平台，经常会有这样的需求，那就是用户想同时获取多家航空公司的航班信息。比如，从北京到上海的机票钱是多少？有很多家航空公司都有这样的航班信息，所以应该把所有航空公司的航班、票价等信息都获取到，然后再聚合。由于每个航空公司都有自己的服务器，所以分别去请求它们的服务器就可以了，比如请求国航、海航、东航等，如下图所示：",-1),u=s("h3",{id:"串行",tabindex:"-1"},[n("串行 "),s("a",{class:"header-anchor",href:"#串行","aria-label":'Permalink to "串行"'},"​")],-1),d=s("p",null,"一种比较原始的方式是用串行的方式来解决这个问题。",-1),h=s("p",null,"比如我们想获取价格，要先去访问国航，在这里叫作 website 1，然后再去访问海航 website 2，以此类推。当每一个请求发出去之后，等它响应回来以后，我们才能去请求下一个网站，这就是串行的方式。",-1),D=s("p",null,"这样做的效率非常低下，比如航空公司比较多，假设每个航空公司都需要 1 秒钟的话，那么用户肯定等不及，所以这种方式是不可取的。",-1),C=s("h3",{id:"并行",tabindex:"-1"},[n("并行 "),s("a",{class:"header-anchor",href:"#并行","aria-label":'Permalink to "并行"'},"​")],-1),A=s("p",null,"接下来我们就对刚才的思路进行改进，最主要的思路就是把串行改成并行，如下图所示：",-1),m=s("p",null,"我们可以并行地去获取这些机票信息，然后再把机票信息给聚合起来，这样的话，效率会成倍的提高。",-1),g=s("p",null,'这种并行虽然提高了效率，但也有一个缺点，那就是会"一直等到所有请求都返回"。如果有一个网站特别慢，那么你不应该被那个网站拖累，比如说某个网站打开需要二十秒，那肯定是等不了这么长时间的，所以我们需要一个功能，那就是有超时的获取。',-1),B=s("h3",{id:"有超时的并行获取",tabindex:"-1"},[n("有超时的并行获取 "),s("a",{class:"header-anchor",href:"#有超时的并行获取","aria-label":'Permalink to "有超时的并行获取"'},"​")],-1),b=s("p",null,"下面我们就来看看下面这种有超时的并行获取的情况。",-1),w=c("",25);function k(I,T,_,S,v,P){const a=o("Image");return e(),t("div",null,[E,y,i,F,p(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/6D/26/CgpOIF5c0buAO8NTAABvjMfQrLA070.png"}),n(),u,d,p(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/6D/27/CgpOIF5c0t-AQ8b-AAB6FEgKj0Q005.png"}),n(),h,D,C,A,p(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/6D/27/CgpOIF5c0vyAN-_5AAE8NqcuyL8450.png"}),n(),m,g,B,b,p(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/6D/28/Cgq2xl5c0xaASO8FAAFKHNM1bu8607.png"}),n(),w])}const f=l(r,[["render",k]]);export{L as __pageData,f as default};
