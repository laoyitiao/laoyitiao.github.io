import{_ as p,j as e,o,g as c,k as n,h as s,s as a,Q as t}from"./chunks/framework.4e7d56ce.js";const C=JSON.parse('{"title":"第46讲：多个ThreadLocal在Thread中的threadlocal里是怎么存储的？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/096-Java 并发编程文档/(284) 第46讲：多个 ThreadLocal 在 Thread 中的 threadlocal 里是怎么存储的？.md","filePath":"posts/backEnd/096-Java 并发编程文档/(284) 第46讲：多个 ThreadLocal 在 Thread 中的 threadlocal 里是怎么存储的？.md","lastUpdated":1696682708000}'),r={name:"posts/backEnd/096-Java 并发编程文档/(284) 第46讲：多个 ThreadLocal 在 Thread 中的 threadlocal 里是怎么存储的？.md"},E=a("h1",{id:"第46讲-多个threadlocal在thread中的threadlocal里是怎么存储的",tabindex:"-1"},[s("第46讲：多个ThreadLocal在Thread中的threadlocal里是怎么存储的？ "),a("a",{class:"header-anchor",href:"#第46讲-多个threadlocal在thread中的threadlocal里是怎么存储的","aria-label":'Permalink to "第46讲：多个ThreadLocal在Thread中的threadlocal里是怎么存储的？"'},"​")],-1),y=a("p",null,"本课时我们主要分析一下在 Thread 中多个 ThreadLocal 是怎么存储的。",-1),d=a("h3",{id:"thread、-threadlocal-及-threadlocalmap-三者之间的关系",tabindex:"-1"},[s("Thread、 ThreadLocal 及 ThreadLocalMap 三者之间的关系 "),a("a",{class:"header-anchor",href:"#thread、-threadlocal-及-threadlocalmap-三者之间的关系","aria-label":'Permalink to "Thread、 ThreadLocal 及 ThreadLocalMap 三者之间的关系"'},"​")],-1),h=a("p",null,"在讲解本课时之前，先要搞清楚 Thread、 ThreadLocal 及 ThreadLocalMap 三者之间的关系。我们用最直观、最容易理解的图画的方式来看看它们三者的关系：",-1),i=t("",30),T=a("p",null,"但是 ThreadLocalMap 解决 hash 冲突的方式是不一样的，它采用的是线性探测法。如果发生冲突，并不会用链表的形式往下链，而是会继续寻找下一个空的格子。这是 ThreadLocalMap 和 HashMap 在处理冲突时不一样的点。",-1),u=a("p",null,"以上就是本节课的内容。",-1),L=a("p",null,"在本节课中，我们主要分析了 Thread、 ThreadLocal 和 ThreadLocalMap 这三个非常重要的类的关系。用图画的方式表明了它们之间的关系：一个 Thread 有一个 ThreadLocalMap，而 ThreadLocalMap 的 key 就是一个个的 ThreadLocal，它们就是用这样的关系来存储并维护内容的。之后我们对于 ThreadLocal 的一些重要方法进行了源码分析。",-1),F=a("blockquote",null,[a("p",null,"注：第一张图片来自网络，未能找到原始出处，原作者若看到，欢迎联系，将进行标注。")],-1);function g(v,M,_,m,A,b){const l=e("Image");return o(),c("div",null,[E,y,d,h,n(l,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/67/E8/Cgq2xl5M5a6ADeCKAABC52ZxZCk238.png"}),s(),i,n(l,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/67/E8/CgpOIF5M5mqAPY_GAABqhQqH5zw536.png"}),s(),T,u,L,F])}const D=p(r,[["render",g]]);export{C as __pageData,D as default};
