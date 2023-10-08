import{_ as l,j as e,o as p,g as o,k as t,h as a,s,Q as c}from"./chunks/framework.4e7d56ce.js";const A=JSON.parse('{"title":"第10讲：ClientCnxn：客户端核心工作类工作原理解析","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/ZooKeeper源码分析与实战_文档/(3140) 第10讲：ClientCnxn：客户端核心工作类工作原理解析.md","filePath":"posts/backEnd/ZooKeeper源码分析与实战_文档/(3140) 第10讲：ClientCnxn：客户端核心工作类工作原理解析.md","lastUpdated":1696682708000}'),r={name:"posts/backEnd/ZooKeeper源码分析与实战_文档/(3140) 第10讲：ClientCnxn：客户端核心工作类工作原理解析.md"},E=s("h1",{id:"第10讲-clientcnxn-客户端核心工作类工作原理解析",tabindex:"-1"},[a("第10讲：ClientCnxn：客户端核心工作类工作原理解析 "),s("a",{class:"header-anchor",href:"#第10讲-clientcnxn-客户端核心工作类工作原理解析","aria-label":'Permalink to "第10讲：ClientCnxn：客户端核心工作类工作原理解析"'},"​")],-1),y=s("p",null,"今天我们开始学习客户端核心工作类的工作原理。",-1),i=s("p",null,"上个课时我们学习了会话的底层实现过程，我们知道会话是在 ZooKeeper 的客户端发起的，而在会话超异常等事件发生时，服务端也会通知给客户端。而我们之所以能够接收到服务端的通知，并向服务端发送请求等操作，是通过 ZooKeeper 客户端实现的。下面我们就深入学习一下客户端核心工作类的实现过程和底层原理。",-1),d=s("h3",{id:"客户端核心类",tabindex:"-1"},[a("客户端核心类 "),s("a",{class:"header-anchor",href:"#客户端核心类","aria-label":'Permalink to "客户端核心类"'},"​")],-1),u=s("p",null,"在 ZooKeeper 客户端的底层实现中，ClientCnxn 类是其核心类，所有的客户端操作都是围绕这个类进行的。ClientCnxn 类主要负责维护客户端与服务端的网络连接和信息交互。",-1),h=s("p",null,"在前面的课程中介绍过，向服务端发送创建数据节点或者添加 Watch 监控等操作时，都会先将请求信息封装成 Packet 对象。那么 Packet 是什么呢？其实** Packet 可以看作是一个 ZooKeeper 定义的，用来进行网络通信的数据结构**，其主要作用是封装了网络通信协议层的数据。而 Packet 内部的数据结构如下图所示：",-1),F=c("",22);function C(g,_,v,q,B,b){const n=e("Image");return p(),o("div",null,[E,y,i,d,u,h,t(n,{alt:"image.png",src:"https://s0.lgstatic.com/i/image/M00/19/3A/CgqCHl7aDQyAEkoJAAB9K_a8-pA768.png"}),a(),F])}const P=l(r,[["render",C]]);export{A as __pageData,P as default};
