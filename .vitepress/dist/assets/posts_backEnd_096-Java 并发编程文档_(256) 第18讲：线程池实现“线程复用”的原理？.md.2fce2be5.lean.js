import{_ as l,j as p,o,g as e,k as c,h as a,s,Q as r}from"./chunks/framework.cfb14fe0.js";const B=JSON.parse('{"title":"第18讲：线程池实现“线程复用”的原理？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/096-Java 并发编程文档/(256) 第18讲：线程池实现“线程复用”的原理？.md","filePath":"posts/backEnd/096-Java 并发编程文档/(256) 第18讲：线程池实现“线程复用”的原理？.md","lastUpdated":1696682708000}'),t={name:"posts/backEnd/096-Java 并发编程文档/(256) 第18讲：线程池实现“线程复用”的原理？.md"},E=s("h1",{id:"第18讲-线程池实现-线程复用-的原理",tabindex:"-1"},[a("第18讲：线程池实现“线程复用”的原理？ "),s("a",{class:"header-anchor",href:"#第18讲-线程池实现-线程复用-的原理","aria-label":'Permalink to "第18讲：线程池实现“线程复用”的原理？"'},"​")],-1),y=s("p",null,"在本课时我们主要学习线程复用的原理，以及对线程池的 execute 这个非常重要的方法进行源码解析。",-1),i=s("h3",{id:"线程复用原理",tabindex:"-1"},[a("线程复用原理 "),s("a",{class:"header-anchor",href:"#线程复用原理","aria-label":'Permalink to "线程复用原理"'},"​")],-1),d=s("p",null,"我们知道线程池会使用固定数量或可变数量的线程来执行任务，但无论是固定数量或可变数量的线程，其线程数量都远远小于任务数量，面对这种情况线程池可以通过线程复用让同一个线程去执行不同的任务，那么线程复用背后的原理是什么呢？",-1),F=s("p",null,'线程池可以把线程和任务进行解耦，线程归线程，任务归任务，摆脱了之前通过 Thread 创建线程时的一个线程必须对应一个任务的限制。在线程池中，同一个线程可以从 BlockingQueue 中不断提取新任务来执行，其核心原理在于线程池对 Thread 进行了封装，并不是每次执行任务都会调用 Thread.start() 来创建新线程，而是让每个线程去执行一个"循环任务"，在这个"循环任务"中，不停地检查是否还有任务等待被执行，如果有则直接去执行这个任务，也就是调用任务的 run 方法，把 run 方法当作和普通方法一样的地位去调用，相当于把每个任务的 run() 方法串联了起来，所以线程数量并不增加。',-1),u=s("p",null,"我们首先来复习一下线程池创建新线程的时机和规则：",-1),k=r("",25);function m(h,C,g,f,v,A){const n=p("Image");return o(),e("div",null,[E,y,i,d,F,u,c(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/58/3A/CgpOIF33U12AesvCAAC4vEMOXQ4044.png"}),a(),k])}const _=l(t,[["render",m]]);export{B as __pageData,_ as default};
