import{_ as o,j as e,o as t,g as c,k as l,h as a,s,Q as p}from"./chunks/framework.a0d18f64.js";const B=JSON.parse('{"title":"第30讲：ConcurrentHahMap在Java7和8有何不同？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/096-Java 并发编程文档/(264) 第30讲：ConcurrentHahMap 在 Java7 和 8 有何不同？.md","filePath":"posts/backEnd/096-Java 并发编程文档/(264) 第30讲：ConcurrentHahMap 在 Java7 和 8 有何不同？.md","lastUpdated":1696682708000}'),r={name:"posts/backEnd/096-Java 并发编程文档/(264) 第30讲：ConcurrentHahMap 在 Java7 和 8 有何不同？.md"},E=s("h1",{id:"第30讲-concurrenthahmap在java7和8有何不同",tabindex:"-1"},[a("第30讲：ConcurrentHahMap在Java7和8有何不同？ "),s("a",{class:"header-anchor",href:"#第30讲-concurrenthahmap在java7和8有何不同","aria-label":'Permalink to "第30讲：ConcurrentHahMap在Java7和8有何不同？"'},"​")],-1),y=s("p",null,"在 Java 8 中，对于 ConcurrentHashMap 这个常用的工具类进行了很大的升级，对比之前 Java 7 版本在诸多方面都进行了调整和变化。不过，在 Java 7 中的 Segment 的设计思想依然具有参考和学习的价值，所以在很多情况下面试官都会问你：ConcurrentHashMap 在 Java 7 和 Java 8 中的结构分别是什么？它们有什么相同点和不同点？所以本课时就对 ConcurrentHashMap 在这两个版本的特点和性质进行对比和介绍。",-1),i=s("h3",{id:"java-7-版本的-concurrenthashmap",tabindex:"-1"},[a("Java 7 版本的 ConcurrentHashMap "),s("a",{class:"header-anchor",href:"#java-7-版本的-concurrenthashmap","aria-label":'Permalink to "Java 7 版本的 ConcurrentHashMap"'},"​")],-1),F=s("p",null,"我们首先来看一下 Java 7 版本中的 ConcurrentHashMap 的结构示意图：",-1),h=s("p",null,"从图中我们可以看出，在 ConcurrentHashMap 内部进行了 Segment 分段，Segment 继承了 ReentrantLock，可以理解为一把锁，各个 Segment 之间都是相互独立上锁的，互不影响。相比于之前的 Hashtable 每次操作都需要把整个对象锁住而言，大大提高了并发效率。因为它的锁与锁之间是独立的，而不是整个对象只有一把锁。",-1),A=s("p",null,"每个 Segment 的底层数据结构与 HashMap 类似，仍然是数组和链表组成的拉链法结构。默认有 0~15 共 16 个 Segment，所以最多可以同时支持 16 个线程并发操作（操作分别分布在不同的 Segment 上）。16 这个默认值可以在初始化的时候设置为其他值，但是一旦确认初始化以后，是不可以扩容的。",-1),D=s("h3",{id:"java-8-版本的-concurrenthashmap",tabindex:"-1"},[a("Java 8 版本的 ConcurrentHashMap "),s("a",{class:"header-anchor",href:"#java-8-版本的-concurrenthashmap","aria-label":'Permalink to "Java 8 版本的 ConcurrentHashMap"'},"​")],-1),u=s("p",null,"在 Java 8 中，几乎完全重写了 ConcurrentHashMap，代码量从原来 Java 7 中的 1000 多行，变成了现在的 6000 多行，所以也大大提高了源码的阅读难度。而为了方便我们理解，我们还是先从整体的结构示意图出发，看一看总体的设计思路，然后再去深入细节。",-1),d=p("",27),C=p("",12);function v(b,f,k,g,m,_){const n=e("Image");return t(),c("div",null,[E,y,i,F,l(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/61/20/CgpOIF4b3hKAfFsTAAG5MQvpc-w836.png"}),a(),h,A,D,u,l(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/61/21/Cgq2xl4b3oCAAFxPAAGZw5NzqtE099.png"}),a(),d,l(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/61/21/Cgq2xl4b3kGAVZgMAAG5MQvpc-w153.png"}),a(),l(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/61/21/Cgq2xl4b3l6Ae_CiAAGZw5NzqtE956.png"}),a(),C])}const J=o(r,[["render",v]]);export{B as __pageData,J as default};
