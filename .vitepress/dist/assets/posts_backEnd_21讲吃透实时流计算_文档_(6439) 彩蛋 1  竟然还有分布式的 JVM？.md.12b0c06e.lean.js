import{_ as o,j as e,o as t,g as c,k as l,h as n,s,Q as p}from"./chunks/framework.4e7d56ce.js";const B=JSON.parse('{"title":"彩蛋1竟然还有分布式的JVM？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/21讲吃透实时流计算_文档/(6439) 彩蛋 1  竟然还有分布式的 JVM？.md","filePath":"posts/backEnd/21讲吃透实时流计算_文档/(6439) 彩蛋 1  竟然还有分布式的 JVM？.md","lastUpdated":1696682708000}'),r={name:"posts/backEnd/21讲吃透实时流计算_文档/(6439) 彩蛋 1  竟然还有分布式的 JVM？.md"},E=s("h1",{id:"彩蛋1竟然还有分布式的jvm",tabindex:"-1"},[n("彩蛋1竟然还有分布式的JVM？ "),s("a",{class:"header-anchor",href:"#彩蛋1竟然还有分布式的jvm","aria-label":'Permalink to "彩蛋1竟然还有分布式的JVM？"'},"​")],-1),y=s("p",null,"经过前面的 21 讲，我们应该说是自底向上、从理论到实践，对实时流计算技术有了一个系统的理解。我们在分析和对比了四种不同的开源流计算框架后，认为 Flink 是当前最好的开源流计算框架。",-1),i=s("p",null,"不过今天，我们会从另外一个有趣的角度来分析 Flink，也就是将 Flink 视为一个分布式的 JVM。你会发现，通过这种认识方式，我们对 Flink 和分布式计算甚至还有微服务的理解，会更上一个层次。",-1),F=s("h3",{id:"冯诺依曼结构计算机",tabindex:"-1"},[n("冯诺依曼结构计算机 "),s("a",{class:"header-anchor",href:"#冯诺依曼结构计算机","aria-label":'Permalink to "冯诺依曼结构计算机"'},"​")],-1),u=s("p",null,"要说分布式的 JVM，得先从单节点的 JVM（Java 虚拟机）说起。单节点的 JVM，说白了就是一个冯诺依曼结构的计算机，也就是下面图 1 所示的系统。",-1),g=s("p",null,"在上面图 1 展示的冯诺依曼结构计算机中，计算机由三个部分构成，即 CPU、内存和 I/O（输入/输出）设备。其中，CPU 在执行计算任务时，主要是通过运算器从内存读写数据。在 CPU 需要访问磁盘（属于I/O设备的一种）时，它并非自己直接访问磁盘上的数据，而是先通过控制器控制 I/O 设备驱动程序，将磁盘上的数据加载到内存，然后再由运算器读写内存上的数据。",-1),k=s("p",null,[n("所以总的来说，在冯诺依曼结构计算机中，"),s("strong",null,"CPU 在进行计算时，最主要的数据交互对象是内存"),n("，而磁盘在其中的作用只是进行数据的持久化存储。")],-1),d=s("h3",{id:"分布式的jvm",tabindex:"-1"},[n("分布式的JVM "),s("a",{class:"header-anchor",href:"#分布式的jvm","aria-label":'Permalink to "分布式的JVM"'},"​")],-1),m=s("p",null,"我们在第 19 课时讨论 Flink 时，曾讲到过 Flink 的系统架构如下图 2 所示。",-1),C=p("",13),D=p("",28);function A(S,h,_,b,v,f){const a=e("Image");return t(),c("div",null,[E,y,i,F,u,l(a,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image6/M00/2D/98/CioPOWBmuEKAOzgSAADv-UrCfQc202.png"}),n(),g,k,d,m,l(a,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image6/M01/2D/90/Cgp9HWBmuEqAFK1KAATU6j9m7Co746.png"}),n(),C,l(a,{alt:"Drawing 5.png",src:"https://s0.lgstatic.com/i/image6/M01/2D/90/Cgp9HWBmuFuAV1KsAAOEeGmEB8w354.png"}),n(),D,l(a,{alt:"Drawing 7.png",src:"https://s0.lgstatic.com/i/image6/M00/2D/98/CioPOWBmuHqAEEMlAAUQi-Szj68618.png"})])}const O=o(r,[["render",A]]);export{B as __pageData,O as default};
