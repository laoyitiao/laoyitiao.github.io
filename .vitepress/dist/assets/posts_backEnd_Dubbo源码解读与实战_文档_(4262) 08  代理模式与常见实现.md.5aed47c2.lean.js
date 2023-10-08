import{_ as o,j as e,o as t,g as c,k as l,h as n,s,Q as p}from"./chunks/framework.4e7d56ce.js";const x=JSON.parse('{"title":"08代理模式与常见实现","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/Dubbo源码解读与实战_文档/(4262) 08  代理模式与常见实现.md","filePath":"posts/backEnd/Dubbo源码解读与实战_文档/(4262) 08  代理模式与常见实现.md","lastUpdated":1696682708000}'),r={name:"posts/backEnd/Dubbo源码解读与实战_文档/(4262) 08  代理模式与常见实现.md"},E=s("h1",{id:"_08代理模式与常见实现",tabindex:"-1"},[n("08代理模式与常见实现 "),s("a",{class:"header-anchor",href:"#_08代理模式与常见实现","aria-label":'Permalink to "08代理模式与常见实现"'},"​")],-1),y=s("p",null,"动态代理机制在 Java 中有着广泛的应用，例如，Spring AOP、MyBatis、Hibernate 等常用的开源框架，都使用到了动态代理机制。当然，Dubbo 中也使用到了动态代理，在后面开发简易版 RPC 框架的时候，我们还会参考 Dubbo 使用动态代理机制来屏蔽底层的网络传输以及服务发现的相关实现。",-1),i=s("p",null,"本课时我们主要从基础知识开始讲起，首先介绍代理模式的基本概念，之后重点介绍 JDK 动态代理的使用以及底层实现原理，同时还会说明 JDK 动态代理的一些局限性，最后再介绍基于字节码生成的动态代理。",-1),F=s("h3",{id:"代理模式",tabindex:"-1"},[n("代理模式 "),s("a",{class:"header-anchor",href:"#代理模式","aria-label":'Permalink to "代理模式"'},"​")],-1),d=s("p",null,"代理模式是 23 种面向对象的设计模式中的一种，它的类图如下所示：",-1),u=p("",36),C=p("",19);function D(A,g,b,h,v,B){const a=e("Image");return t(),c("div",null,[E,y,i,F,d,l(a,{alt:"image (2).png",src:"https://s0.lgstatic.com/i/image/M00/44/E8/CgqCHl8_hxqAY6vaAAGcUb0A8A4971.png"}),n(),u,l(a,{alt:"image (3).png",src:"https://s0.lgstatic.com/i/image/M00/44/E8/CgqCHl8_h1uAcXB-AAKCT9cNDBw713.png"}),n(),C])}const q=o(r,[["render",D]]);export{x as __pageData,q as default};
