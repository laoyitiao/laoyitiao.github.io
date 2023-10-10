import{_ as p,j as o,o as e,g as t,k as l,h as n,Q as c,s}from"./chunks/framework.cfb14fe0.js";const q=JSON.parse('{"title":"第68讲：发生死锁必须满足哪4个条件？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/096-Java 并发编程文档/(306) 第68讲：发生死锁必须满足哪 4 个条件？.md","filePath":"posts/backEnd/096-Java 并发编程文档/(306) 第68讲：发生死锁必须满足哪 4 个条件？.md","lastUpdated":1696682708000}'),r={name:"posts/backEnd/096-Java 并发编程文档/(306) 第68讲：发生死锁必须满足哪 4 个条件？.md"},E=c("",11),y=s("p",null,"第 3 个是不剥夺条件，在我们这个代码程序中，JVM 并不会主动把某一个线程所持有的锁剥夺，所以也满足不剥夺条件。",-1),i=s("p",null,"第 4 个是循环等待条件，可以看到在我们的例子中，这两个线程都想获取对方已持有的资源，也就是说线程 1 持有 o1 去等待 o2，而线程 2 则是持有 o2 去等待 o1，这是一个环路，此时就形成了一个循环等待。",-1),F=s("p",null,"可以看出，在我们的例子中确实满足这 4 个必要条件，今后我们就可以从这 4 个发生死锁的必要条件出发，来解决死锁的问题，只要破坏任意一个条件就可以消除死锁，这也是我们后面要讲的解决死锁策略中重点要考虑的内容。",-1),d=s("h3",{id:"总结",tabindex:"-1"},[n("总结 "),s("a",{class:"header-anchor",href:"#总结","aria-label":'Permalink to "总结"'},"​")],-1),u=s("p",null,[n("以上就是本课时的内容，我们总结一下，在本课时主要介绍了要想发生死锁，必须满足的 4 个条件，分别是"),s("strong",null,"互斥条件、请求与保持条件、不剥夺条件"),n(" 和"),s("strong",null,"循环等待条件"),n("；同时还分析了在上一课时中必然发生死锁的例子，可以看到，在这个例子中确实满足了这 4 个条件。")],-1);function h(A,D,_,g,C,B){const a=o("Image");return e(),t("div",null,[E,l(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/86/7A/Cgq2xl6QD3GAEKqKAABp_iGU_Q0930.png"}),n(),y,l(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/00/35/CgoCgV6QD3KAJC8yAAAkJAqDk2E601.png"}),n(),i,l(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/0D/63/Ciqah16QD3KAEABeAAAPMS_B-t0547.png"}),n(),F,d,u])}const b=p(r,[["render",h]]);export{q as __pageData,b as default};
