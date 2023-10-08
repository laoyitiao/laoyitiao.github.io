import{_ as o,j as e,o as c,g as t,k as l,h as n,Q as p,s}from"./chunks/framework.a0d18f64.js";const J=JSON.parse('{"title":"第12讲：有哪6种常见的线程池？什么是Java8的ForkJoinPool？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/096-Java 并发编程文档/(250) 第12讲：有哪 6 种常见的线程池？什么是 Java8 的 ForkJoinPool？.md","filePath":"posts/backEnd/096-Java 并发编程文档/(250) 第12讲：有哪 6 种常见的线程池？什么是 Java8 的 ForkJoinPool？.md","lastUpdated":1696682708000}'),r={name:"posts/backEnd/096-Java 并发编程文档/(250) 第12讲：有哪 6 种常见的线程池？什么是 Java8 的 ForkJoinPool？.md"},E=p("",5),y=p("",21),i=s("p",null,"总结上述的五种线程池，我们以核心线程数、最大线程数，以及线程存活时间三个维度进行对比，如表格所示。",-1),d=s("p",null,"第一个线程池 FixedThreadPool，它的核心线程数和最大线程数都是由构造函数直接传参的，而且它们的值是相等的，所以最大线程数不会超过核心线程数，也就不需要考虑线程回收的问题，如果没有任务可执行，线程仍会在线程池中存活并等待任务。",-1),F=s("p",null,"第二个线程池 CachedThreadPool 的核心线程数是 0，而它的最大线程数是 Integer 的最大值，线程数一般是达不到这么多的，所以如果任务特别多且耗时的话，CachedThreadPool 就会创建非常多的线程来应对。",-1),h=s("p",null,"同理，你可以课后按照同样的方法来分析后面三种线程池的参数，来加深对知识的理解。",-1),u=s("h3",{id:"forkjoinpool",tabindex:"-1"},[n("ForkJoinPool "),s("a",{class:"header-anchor",href:"#forkjoinpool","aria-label":'Permalink to "ForkJoinPool"'},"​")],-1),C=p("",5),g=s("p",null,"在计算 f(4) 时需要首先计算出 f(2) 和 f(3)，而同理，计算 f(3) 时又需要计算 f(1) 和 f(2)，以此类推。",-1),k=p("",9),A=s("p",null,"ForkJoinPool 线程池内部除了有一个共用的任务队列之外，每个线程还有一个对应的双端队列 deque，这时一旦线程中的任务被 Fork 分裂了，分裂出来的子任务放入线程自己的 deque 里，而不是放入公共的任务队列中。如果此时有三个子任务放入线程 t1 的 deque 队列中，对于线程 t1 而言获取任务的成本就降低了，可以直接在自己的任务队列中获取而不必去公共队列中争抢也不会发生阻塞（除了后面会讲到的 steal 情况外），减少了线程间的竞争和切换，是非常高效的。",-1),_=s("p",null,'我们再考虑一种情况，此时线程有多个，而线程 t1 的任务特别繁重，分裂了数十个子任务，但是 t0 此时却无事可做，它自己的 deque 队列为空，这时为了提高效率，t0 就会想办法帮助 t1 执行任务，这就是"work-stealing"的含义。',-1),v=s("p",null,'双端队列 deque 中，线程 t1 获取任务的逻辑是后进先出，也就是LIFO（Last In Frist Out），而线程 t0 在"steal"偷线程 t1 的 deque 中的任务的逻辑是先进先出，也就是FIFO（Fast In Frist Out），如图所示，图中很好的描述了两个线程使用双端队列分别获取任务的情景。你可以看到，使用 "work-stealing" 算法和双端队列很好地平衡了各线程的负载。',-1),b=s("p",null,"最后，我们用一张全景图来描述 ForkJoinPool 线程池的内部结构，你可以看到 ForkJoinPool 线程池和其他线程池很多地方都是一样的，但重点区别在于它每个线程都有一个自己的双端队列来存储分裂出来的子任务。ForkJoinPool 非常适合用于递归的场景，例如树的遍历、最优路径搜索等场景。",-1);function T(f,D,P,B,m,x){const a=e("Image");return c(),t("div",null,[E,l(a,{alt:"",src:"https://s0.lgstatic.com/i/image2/M01/AF/A0/CgotOV3kzoeARRniAAAwS8Pup4A734.png"}),n(),y,l(a,{alt:"",src:"https://s0.lgstatic.com/i/image2/M01/AF/80/CgoB5l3kzomAckv5AAAxf6FCPco696.png"}),n(),i,d,F,h,u,l(a,{alt:"",src:"https://s0.lgstatic.com/i/image2/M01/AF/A0/CgotOV3kzomAflZxAAB99x9-MzI241.png"}),n(),C,l(a,{alt:"",src:"https://s0.lgstatic.com/i/image2/M01/AF/80/CgoB5l3kzoqAZgXiAACbX2rJCR4889.png"}),n(),g,l(a,{alt:"",src:"https://s0.lgstatic.com/i/image2/M01/AF/A0/CgotOV3kzoqAUlPyAADYOKK1PgM516.png"}),n(),k,l(a,{alt:"",src:"https://s0.lgstatic.com/i/image2/M01/AF/80/CgoB5l3kzouAdfLfAAARK97hw4g233.png"}),n(),A,l(a,{alt:"",src:"https://s0.lgstatic.com/i/image2/M01/B0/57/CgotOV3nFTCAKmNtAAES7A18i8M873.png"}),n(),_,v,l(a,{alt:"",src:"https://s0.lgstatic.com/i/image2/M01/B0/37/CgoB5l3nFSOAFOkbAABvJKvhTKk938.png"}),n(),b])}const w=o(r,[["render",T]]);export{J as __pageData,w as default};
