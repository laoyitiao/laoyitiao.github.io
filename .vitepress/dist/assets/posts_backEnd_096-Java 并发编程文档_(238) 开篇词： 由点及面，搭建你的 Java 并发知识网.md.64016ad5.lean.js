import{_ as l,j as r,o as e,g,k as s,h as a,s as t,Q as n}from"./chunks/framework.a0d18f64.js";const U=JSON.parse('{"title":"开篇词：由点及面，搭建你的Java并发知识网","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/096-Java 并发编程文档/(238) 开篇词： 由点及面，搭建你的 Java 并发知识网.md","filePath":"posts/backEnd/096-Java 并发编程文档/(238) 开篇词： 由点及面，搭建你的 Java 并发知识网.md","lastUpdated":1696682708000}'),_={name:"posts/backEnd/096-Java 并发编程文档/(238) 开篇词： 由点及面，搭建你的 Java 并发知识网.md"},i=t("h1",{id:"开篇词-由点及面-搭建你的java并发知识网",tabindex:"-1"},[a("开篇词：由点及面，搭建你的Java并发知识网 "),t("a",{class:"header-anchor",href:"#开篇词-由点及面-搭建你的java并发知识网","aria-label":'Permalink to "开篇词：由点及面，搭建你的Java并发知识网"'},"​")],-1),c=t("p",null,"你好，欢迎学习《Java 并发编程核心 78 讲》，我是讲师星星，一线互联网公司资深研发工程师，参与过集团内多个重点项目的设计与开发。",-1),p=t("h6",{id:"扎实的理论基础-宝贵的并发实践经验",tabindex:"-1"},[t("strong",null,"扎实的理论基础，宝贵的并发实践经验"),a(),t("a",{class:"header-anchor",href:"#扎实的理论基础-宝贵的并发实践经验","aria-label":'Permalink to "**扎实的理论基础，宝贵的并发实践经验**"'},"​")],-1),A=t("p",null,"工作期间，因为业务需要，我所开发和负责的场景大多数都是大流量和高并发的，其中有很多是对 Java 并发知识的实际应用。学习如逆旅，从小白成长为并发大神，困难重重，既然不能逃避，那么唯有改变对它的态度。",-1),h=t("p",null,"从一开始面对线程池导致的 OOM 问题的不知所措，到后来可以深入剖析 JUC 源码，并精准定位、复现、修复线上的并发问题，再到现在可以应对千万级流量的业务场景，并预判和发现隐藏在其中的线程安全隐患，这期间，我走过一些弯路，踩过一些坑，也积累了很多宝贵的并发经验。",-1),u=t("p",null,"此外，在对并发问题的逐个解决过程中，在系统的设计和实施过程中，我详细研读了大量的国内外经典并发书籍和资料，把涉及的代码一一落实、验证，并应用到业务里，这期间让我逐渐建立起了完善的 Java 并发知识体系。",-1),d=t("h6",{id:"为什么并发编程这么重要呢",tabindex:"-1"},[t("strong",null,"为什么并发编程这么重要呢"),a(),t("a",{class:"header-anchor",href:"#为什么并发编程这么重要呢","aria-label":'Permalink to "**为什么并发编程这么重要呢**"'},"​")],-1),m=t("p",null,'随着接触和负责的系统越来越复杂，我逐渐发现，无论是对于优秀的系统设计，还是对于程序员的成长提高、职业发展，并发编程都是必须要跨过去的"坎"，而一旦你跨过了这道"坎"，便会豁然开朗，原来一切都如此简单，职业发展也会更上一层楼。',-1),C=n("",5),v=t("br",null,null,-1),J=t("p",null,"你会发现，Java 高级工程师岗位要求中并发编程几乎成为了必须掌握的技能点，而在面经里涉及的并发编程的知识也数不胜数，本专栏各课时涉及的知识点，也正是各大厂 Java 高级工程师面试的高频考题。",-1),D=t("h6",{id:"如何学好并发编程",tabindex:"-1"},[a("如何学好并发编程 "),t("a",{class:"header-anchor",href:"#如何学好并发编程","aria-label":'Permalink to "如何学好并发编程"'},"​")],-1),T=t("p",null,"在此邀请你做一个小测试，看看目录里的问题，你能否回答全面？相信你看到问题后大部分会感觉很熟悉，但要组织答案却又模棱两可，不敢太确定，那么接下来就带你了解如何学好 Java 高并发并攻克这些难题。",-1),L=n("",5),E=t("p",null,"常见的并发工具类数不尽数：例如，线程池、各种 Lock、synchronized 关键字、ConcurrentHashMap、CopyOnWriteArrayList、ArrayBlockingQueue、ThreadLocal、原子类、CountDownLatch、Semaphore，等等，而它们的原理又包括 CAS、AQS、Java 内存模型等等。",-1),S=t("p",null,"从刚才那一长串的名字中可以看出，并发工具的数量很多，而且功能也不尽相同，不容易完全掌握。确实，并发涉及的知识点太琐碎了，大家或多或少都学习过一些并发的知识，但是总感觉一直学不完，东一榔头西一棒槌，很零散，也不知道尽头在哪里，导致学完以后，真正能记住的内容却很少。而且如果学到并发底层原理，就不只涉及 Java 语言，更涉及 JVM、JMM、操作系统、内存、CPU 指令等，令人一头雾水。",-1),b=t("ul",null,[t("li",null,[t("strong",null,"不容易找到清晰易懂的学习资料")])],-1),O=t("p",null,"在我学习的过程中，我总是有一种感受，那就是较少有资料能够把 Java 并发编程讲得非常清楚，例如我们学习一个工具类，希望了解它的诞生背景、使用场景，用法、注意点，最后理解原理，以及它和其他工具类的联系，这一系列的内容其实都是我们需要掌握的。",-1),M=t("p",null,"反观现有的网络相关资料，往往水平参差不齐，真伪难辨，而且经常含有错误，如果我们先入为主地接受了错误的观点，那就得不偿失了。",-1),q=n("",5),V=n("",12);function f(k,P,B,I,x,N){const o=r("Image");return e(),g("div",null,[i,c,p,s(o,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/A5/3E/CgoB5l3DgLOAN9TxAADOl2eK1YA757.png"}),a(),A,s(o,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/A5/3E/CgoB5l3DgLOABnQDAAIty53kLZs981.png"}),a(),h,s(o,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/A5/5E/CgotOV3DgLOAELhuAACPIXhX2bY626.png"}),a(),u,d,m,s(o,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/A5/3E/CgoB5l3DgLOAEMv7AABnabGYURQ993.png"}),a(),C,s(o,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/A5/3E/CgoB5l3DgLOAJbveAAHrokwEb7Y378.png"}),a(),s(o,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/A5/5E/CgotOV3DgLOAXz5wAAG5iaGUShs303.png"}),a(),s(o,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/A5/5E/CgotOV3DgLOALZydAAE1RSJ3cV0452.png"}),a(),s(o,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/A5/3E/CgoB5l3DgLOAU2pxAAGWghflKDM777.png"}),a(),v,s(o,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/A5/5E/CgotOV3DgLOAOLUXAADh5hjW9Ao521.png"}),a(),s(o,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/A5/3E/CgoB5l3DgLOAe7dXAAGloBkIUlw875.png"}),a(),J,D,T,s(o,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/A5/5E/CgotOV3DgLSAHP18AACWVfXCugg682.png"}),a(),L,s(o,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/A5/3E/CgoB5l3DgLSABWlnAAAr88J9c9A926.png"}),a(),E,s(o,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/A5/5E/CgotOV3DgLSABkjiAADTiPdaGcM233.png"}),a(),S,b,O,M,s(o,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/A5/3E/CgoB5l3DgLSAein_AADNovsebTk325.png"}),a(),q,s(o,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/A5/5E/CgotOV3DgLSAGmEWAADo6Lxf6ww652.png"}),a(),V])}const w=l(_,[["render",f]]);export{U as __pageData,w as default};
