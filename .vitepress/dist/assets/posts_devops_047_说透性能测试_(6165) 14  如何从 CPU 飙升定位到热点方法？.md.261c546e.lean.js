import{_ as o,j as e,o as t,g as c,k as l,h as a,s,Q as p}from"./chunks/framework.cfb14fe0.js";const f=JSON.parse('{"title":"14如何从CPU飙升定位到热点方法？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/devops/047_说透性能测试/(6165) 14  如何从 CPU 飙升定位到热点方法？.md","filePath":"posts/devops/047_说透性能测试/(6165) 14  如何从 CPU 飙升定位到热点方法？.md","lastUpdated":1696682708000}'),r={name:"posts/devops/047_说透性能测试/(6165) 14  如何从 CPU 飙升定位到热点方法？.md"},y=s("h1",{id:"_14如何从cpu飙升定位到热点方法",tabindex:"-1"},[a("14如何从CPU飙升定位到热点方法？ "),s("a",{class:"header-anchor",href:"#_14如何从cpu飙升定位到热点方法","aria-label":'Permalink to "14如何从CPU飙升定位到热点方法？"'},"​")],-1),E=s("p",null,'上一模块我带你学习了如何进行系统监控，相信你已经掌握了监控部署的常见手段，通过监控这双"眼睛"，会帮助你及时发现系统资源异常，那当你发现资源异常时候，是不是觉得已经找到问题了呢？事实上并非如此，绝大多数资源异常只是你看到的表象问题，就好比你发现一个地方着火了，你可以先灭火，但是着火的原因是必须找到的，并制定相关的措施，这样才能有效避免下一次的火情。',-1),i=s("p",null,"对于系统也是这样的，当你发现了资源异常，你需要继续寻找发生问题的根因，所以作为一名专业的性能测试工程师，你也应当具备顺着表象去找问题根因的能力。这一讲我就以最流行的 Java 语言为例，带你学习如何透过现象看本质。",-1),C=s("p",null,[a("对于排查问题，不要只满足于掌握一些排查工具或者命令，你应当对"),s("strong",null,"被测语言以及运行原理"),a("有所了解，这样得出来的结论才可能更全面。")],-1),F=s("p",null,"这一讲我先带你理解 Java 运行过程中的核心概念。首先要明白 Java 代码在哪里运行，一些初学者说是在 idea 或者 eclipse 里面，因为它们是写代码的软件，不过细心的同学会发现，所有的 idea 或者 eclipse 要运行 Java 代码都需要配置 Java 环境，其实 idea 是我们开发的编辑器，而真正运行代码的是 JVM。",-1),d=s("p",null,"什么是 JVM 呢？JVM 是 Java Virtual Machine 的缩写，它是一个独立出来的运行环境，通过这样的环境去进行 Java 代码中各种逻辑运行。",-1),u=s("p",null,'读到这里可能同学有疑问了："我现在接触了很多环境，比如 JVM 运行环境、Docker 运行环境，还有云服务器之类，它们到底是什么关系？"这对于不少人来说，确实是有一定疑惑的，我先用一张图来示意下：',-1),B=p("",7),h=p("",8),_=s("p",null,"我们用一张图来直观地概括下这几个状态的演变：",-1),A=p("",21),g=p("",5),v=p("",6);function T(D,m,I,M,b,P){const n=e("Image");return t(),c("div",null,[y,E,i,C,F,d,u,l(n,{alt:"图片3.png",src:"https://s0.lgstatic.com/i/image6/M00/08/11/CioPOWA0ZKaAbIh2AAB-PIUIVKM063.png"}),a(),B,l(n,{alt:"图片2.png",src:"https://s0.lgstatic.com/i/image6/M00/08/14/Cgp9HWA0ZLeAEBTuAAB3MRGS9mk331.png"}),a(),h,l(n,{alt:"图片1.png",src:"https://s0.lgstatic.com/i/image6/M00/08/11/CioPOWA0ZMuAGHBZAAD2QjCFz1A629.png"}),a(),_,l(n,{alt:"image (8).png",src:"https://s0.lgstatic.com/i/image6/M01/08/14/Cgp9HWA0ZSCAUrpaAAEB4nKOw-Q013.png"}),a(),A,l(n,{alt:"截图 (1).png",src:"https://s0.lgstatic.com/i/image6/M01/08/11/CioPOWA0ZTWAVtq1AAGYPQOM3Jg518.png"}),a(),g,l(n,{alt:"截图 (2) (1).png",src:"https://s0.lgstatic.com/i/image6/M01/08/15/Cgp9HWA0ZeuAUcH3AAVfZsuCukQ819.png"}),a(),v])}const S=o(r,[["render",T]]);export{f as __pageData,S as default};
