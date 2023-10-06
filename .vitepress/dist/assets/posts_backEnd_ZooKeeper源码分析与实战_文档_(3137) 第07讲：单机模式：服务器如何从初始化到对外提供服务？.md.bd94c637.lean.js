import{_ as o,j as e,o as t,g as r,k as n,s,h as p,Q as l}from"./chunks/framework.b3d8e22e.js";const K=JSON.parse('{"title":"启动准备实现 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/ZooKeeper源码分析与实战_文档/(3137) 第07讲：单机模式：服务器如何从初始化到对外提供服务？.md","filePath":"posts/backEnd/ZooKeeper源码分析与实战_文档/(3137) 第07讲：单机模式：服务器如何从初始化到对外提供服务？.md","lastUpdated":1696417798000}'),c={name:"posts/backEnd/ZooKeeper源码分析与实战_文档/(3137) 第07讲：单机模式：服务器如何从初始化到对外提供服务？.md"},E=s("p",null,"本课时我们开始学习 ZooKeeper 服务器的启动管理与初始化相关的内容。",-1),y=s("p",null,"通过基础篇的学习我们已经掌握了 ZooKeeper 相关的基础知识，今天我们就开始进阶篇中的第一节课，本节课主要通过对单机版的 ZooKeeper 中的启动与服务的初始化过程进行分析，来学习 ZooKeeper 服务端相关的处理知识。现在我们就开始深入到服务器端看一看 ZooKeeper 是如何从初始化到对外提供服务的。",-1),i=s("h3",{id:"启动准备实现",tabindex:"-1"},[p("启动准备实现 "),s("a",{class:"header-anchor",href:"#启动准备实现","aria-label":'Permalink to "启动准备实现"'},"​")],-1),d=s("p",null,"在 ZooKeeper 服务的初始化之前，首先要对配置文件等信息进行解析和载入。也就是在真正开始服务的初始化之前需要对服务的相关参数进行准备，而 ZooKeeper 服务的准备阶段大体上可分为启动程序入口、zoo.cfg 配置文件解析、创建历史文件清理器等，如下图所示：",-1),g=l("",10),F=l("",15),v=s("h3",{id:"总结",tabindex:"-1"},[p("总结 "),s("a",{class:"header-anchor",href:"#总结","aria-label":'Permalink to "总结"'},"​")],-1),u=s("p",null,"本课时是我们进阶篇阶段的第一课，在整个进阶篇中，我们主要从 ZooKeeper 服务内部的实现逻辑来学习 ZooKeeper 中的相关知识，而本课时从单机版服务器的启动，到对外提供服务的整个过程，逐步分析 ZooKeeper 实现的每个步骤，理解 ZooKeeper 服务器的初始化、配置解析、服务实例化等过程对我们日后在工作中分析排查 ZooKeeper 产生的相关问题以及提高 ZooKeeper 服务器的稳定性或性能都有很大的帮助。",-1),h=s("p",null,"通过本课时的学习我们知道了 ZooKeeper 服务单机版启动的关键步骤，下面我们来思考这个问题：在我们启动单机版服务器的时候，如果 ZooKeeper 服务通过 zoo.cfg 配置文件的相关参数，利用 FileTxnSnapLog 类来实现相关数据的本地化存储。那么我们在日常的开发维护中，如何才能知道当前存储 ZooKeeper 相关数据的磁盘容量应该设置多大的空间才能满足当前业务的发展？如何才能尽量减少磁盘空间的浪费？",-1),D=s("p",null,"我们可以通过 DatadirCleanupManager 类来对历史文件进行清理以避免太多的历史数据占据磁盘空间造成不必要的浪费。",-1);function A(_,f,k,C,S,b){const a=e("Image");return t(),r("div",null,[E,y,i,d,n(a,{alt:"image (5).png",src:"https://s0.lgstatic.com/i/image/M00/12/F2/Ciqc1F7OQ_uAU5yzAABbrnOyALM516.png"}),g,n(a,{alt:"image (6).png",src:"https://s0.lgstatic.com/i/image/M00/12/FD/CgqCHl7ORB-AdNM1AABRbvNSlEE886.png"}),F,n(a,{alt:"image (7).png",src:"https://s0.lgstatic.com/i/image/M00/12/FD/CgqCHl7ORDiAIMqzAABBGUvvhFU739.png"}),v,u,h,D])}const Z=o(c,[["render",A]]);export{K as __pageData,Z as default};
