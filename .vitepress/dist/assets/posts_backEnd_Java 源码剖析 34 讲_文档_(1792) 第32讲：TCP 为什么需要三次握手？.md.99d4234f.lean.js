import{_ as n,j as i,o as s,g as l,k as a,h as o,s as t,Q as p}from"./chunks/framework.b3d8e22e.js";const V=JSON.parse('{"title":"典型回答 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/Java 源码剖析 34 讲_文档/(1792) 第32讲：TCP 为什么需要三次握手？.md","filePath":"posts/backEnd/Java 源码剖析 34 讲_文档/(1792) 第32讲：TCP 为什么需要三次握手？.md","lastUpdated":1696417798000}'),r={name:"posts/backEnd/Java 源码剖析 34 讲_文档/(1792) 第32讲：TCP 为什么需要三次握手？.md"},P=t("p",null,'TCP 协议是我们每天都在使用的一个网络通讯协议，因为绝大部分的网络连接都是建立在 TCP 协议上的，比如你此刻正在看的这篇文章是建立在 HTTP（Hypertext Transfer Protocol，超文本传送协议） 应用层协议的基础上的，而 HTTP 协议的"底层"则是建立在 TCP 的传输层协议上的。因此可以理解为，你之所以能看到本篇文章就是得益于 TCP 协议的功劳。',-1),T=t("p",null,"我们本课时的面试题是，说一下 TCP 三次握手的执行流程，以及为什么需要三次握手？",-1),c=t("h3",{id:"典型回答",tabindex:"-1"},[o("典型回答 "),t("a",{class:"header-anchor",href:"#典型回答","aria-label":'Permalink to "典型回答"'},"​")],-1),C=t("p",null,"在回答这个问题之前，首先我们需要搞清楚两个概念，第一，什么是 TCP？第二，什么是 TCP 连接？只有搞明白了这两个问题，我们才能彻底搞懂为什么 TCP 需要三次握手？",-1),_=t("h4",{id:"什么是-tcp",tabindex:"-1"},[o("什么是 TCP？ "),t("a",{class:"header-anchor",href:"#什么是-tcp","aria-label":'Permalink to "什么是 TCP？"'},"​")],-1),d=t("p",null,[o("首先来说 TCP（Transmission Control Protocol，传输控制协议）是一个面向连接的、可靠的、基于字节流的传输层协议。从它的概念中我们可以看出 TCP 的三个特点："),t("strong",null,"面向连接、可靠性和面向字节流"),o("。")],-1),h=p("",10),u=p("",27),g=p("",7),m=t("p",null,"TCP 和 UDP 的使用场景",-1),D=t("h3",{id:"小结",tabindex:"-1"},[o("小结 "),t("a",{class:"header-anchor",href:"#小结","aria-label":'Permalink to "小结"'},"​")],-1),S=t("p",null,"本课时我们介绍了 TCP 三个特点：面向连接、可靠性和面向字节流，其中可靠性主要是依赖它的状态记录和根据实际情况调整自身的行为方式。例如，当 TCP 意识到丢包时就会重发此包，这样就保证了通信的可靠性。",-1),q=t("p",null,"TCP 之所以需要三次握手的主要原因是为了防止在网络环境比较差的情况下不会进行无效的连接，同时三次握手可以实现 TCP 初始化序列号的确认工作，TCP 需要初始化一个序列号来保证消息的顺序。如果是两次握手则不能确认序列号是否正常，如果是四次握手的话会浪费系统的资源，因此 TCP 三次握手是最优的解决方案，所以 TCP 连接需要三次握手。",-1),U=t("p",null,"最后我们讲了 UDP 的概念，以及 UDP 和 TCP 的区别，在传输效率要求比较高且对可靠性要求不高的情况下可以使用 UDP，反之则应该使用 TCP。",-1);function A(b,f,k,E,N,x){const e=i("Image");return s(),l("div",null,[P,T,c,C,_,d,a(e,{alt:"image (1).png",src:"https://s0.lgstatic.com/i/image/M00/26/68/CgqCHl7x4AWAIebKAABegWUqA1U920.png"}),o(),h,a(e,{alt:"22.png",src:"https://s0.lgstatic.com/i/image/M00/27/2D/CgqCHl70ccOALHS1AADhgTvLn9Q814.png"}),o(),u,a(e,{alt:"23.png",src:"https://s0.lgstatic.com/i/image/M00/27/2D/CgqCHl70cdGAPLl8AABHUQhxFtY478.png"}),o(),g,a(e,{alt:"image (4).png",src:"https://s0.lgstatic.com/i/image/M00/26/69/CgqCHl7x4EKAW86xAACoPgxtPLM601.png"}),o(),m,D,S,q,U])}const F=n(r,[["render",A]]);export{V as __pageData,F as default};
