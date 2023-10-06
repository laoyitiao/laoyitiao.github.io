import{_ as l,j as e,o as t,g as r,k as a,s,h as o,Q as p}from"./chunks/framework.b3d8e22e.js";const K=JSON.parse('{"title":"Session 是什么？ ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/Spring Data JPA 原理与实战_文档/(4722) 22  Seion 的 open-in-view 对事务的影响是什么？.md","filePath":"posts/backEnd/Spring Data JPA 原理与实战_文档/(4722) 22  Seion 的 open-in-view 对事务的影响是什么？.md","lastUpdated":1696417798000}'),c={name:"posts/backEnd/Spring Data JPA 原理与实战_文档/(4722) 22  Seion 的 open-in-view 对事务的影响是什么？.md"},i=s("p",null,"你好，欢迎来到第 22 讲，今天我们来学习 Session 的相关内容。",-1),E=s("p",null,"当我们使用 Spring Boot 加 JPA 的时候，会发现 Spring 帮我们新增了一个 spring.jpa.open-in-view 的配置，但是 Hibernate 本身却没有这个配置，不过其又是和 Hibernate 中的 Session 相关的，因此还是很重要的内容，所以这一讲我们来学习一下。",-1),y=s("p",null,"由于 Session 不是 JPA 协议规定的，所以官方对于这方面的资料比较少，从业者只能根据个人经验和源码来分析它的本质，那么接下来我就以我个人的经验为你介绍这部分的概念。首先了解 Session 是什么。",-1),g=s("h3",{id:"session-是什么",tabindex:"-1"},[o("Session 是什么？ "),s("a",{class:"header-anchor",href:"#session-是什么","aria-label":'Permalink to "Session 是什么？"'},"​")],-1),d=s("p",null,"我们通过一个类的关系图来回顾一下，看看 Session 在什么样的位置上。",-1),u=s("p",null,"其中，SessionImpl 是 Hibernate 实现 JPA 协议的 EntityManager 的一种实现方式，即实现类；而 Session 是 Hibernate 中的概念，完全符合 EntityManager 的接口协议，同时又完成了 Hibernate 的特殊实现。",-1),A=s("p",null,"在 Spring Data JPA 的框架中，我们可以狭隘地把 Session 理解为 EntityManager，因为其对于 JPA 的任何操作都是通过 EntityManager 的接口进行的，我们可以把 Session 里面的复杂逻辑当成一个黑盒子。即使 SessionImpl 能够实现 Hibernate 的 Session 接口，但如果我们使用的是 Spring Data JPA，那么实现再多的接口也和我们没有任何关系。",-1),F=s("p",null,"除非你不用 JPA 的接口，直接用 Hibernate 的 Navite 来实现，但是我不建议你这么做，因为过程太复杂了。那么 SessionImpl 对使用 JPA 体系的人来说，它主要解决了什么问题呢？",-1),C=s("h3",{id:"sessionimpl-解决了什么问题",tabindex:"-1"},[o("SessionImpl 解决了什么问题？ "),s("a",{class:"header-anchor",href:"#sessionimpl-解决了什么问题","aria-label":'Permalink to "SessionImpl 解决了什么问题？"'},"​")],-1),_=s("p",null,"我们通过源码来看一下，请看下面这张图。",-1),h=p("",11),D=s("p",null,"我们可以发现，OpenEntityManagerInViewInterceptor 实现了 WebRequestInterceptor 的接口中的两个方法：",-1),I=s("ol",null,[s("li",null,[s("p",null,"public void preHandle(WebRequest request) 方法，里面实现了在每次的 Web MVC 请求之前，通过 createEntityManager 方法创建 EntityManager 和 EntityManagerHolder 的逻辑；")]),s("li",null,[s("p",null,"public void afterCompletion(WebRequest request, @Nullable Exception ex) 方法，里面实现了在每次 Web MVC 的请求结束之后，关闭 EntityManager 的逻辑。")])],-1),S=s("p",null,"我们如果继续看 createEntityManager 方法的实现，还会找到如下关键代码。",-1),v=s("p",null,"上图可以看到，我们通过 SessionFactoryImpl 中的 createEntityManager() 方法，创建了一个 EntityManager 的实现 Session；通过拦截器创建了 EntityManager 事务处理逻辑，默认是 Join 类型（即有事务存在会加入）；而 builder.openSession() 逻辑就是 new SessionImpl(sessionFactory, this)。",-1),T=s("p",null,"所以这个时候可以知道，通过 open-in-view 配置的拦截器，会帮我们的每个请求都创建一个 SessionImpl 实例；而 SessionImpl 里面存储了整个 PersistenceContext 和各种事务连接状态，可以判断出来 Session 的实例对象比较大。",-1),b=s("p",null,"并且，我们打开 spring.jap.open-in-view=true 会发现，如果一个请求处理的逻辑比较耗时，牵涉到的对象比较多，这个时候就比较考验我们对 jvm 的内存配置策略了，如果配置不好就会经常出现内存溢出的现象。因此当处理比较耗时的请求和批量处理请求的时候，需要考虑到这一点。",-1),M=s("p",null,"到这里，经常看源码的同学就应该会好奇了，都有哪些时候需要调用 openSession 呢？那是不是也可以知道 EntityManager(Session) 的打开时机了？",-1),q=s("h4",{id:"entitymanager-session-的打开时机及扩展场景",tabindex:"-1"},[o("EntityManager(Session) 的打开时机及扩展场景 "),s("a",{class:"header-anchor",href:"#entitymanager-session-的打开时机及扩展场景","aria-label":'Permalink to "EntityManager(Session) 的打开时机及扩展场景"'},"​")],-1),m=s("p",null,"我们通过 IDEA 开发者工具，直接点击右键查 public Session createEntityManager() 此方法被使用到的地方即可，如下图所示。",-1),O=p("",18),N=p("",4),f=p("",23),B=p("",16),w=p("",6),L=s("p",null,"从日志中可以看到，当我们执行完 save(u2)，事务提交之后，做一些耗时操作的时候，发现此时整个 Session 生命周期是没有持有数据库连接的，也就是事务结束之后就进行了释放，这样大大提高了数据库连接的利用率，即使大量请求也不会造成数据库连接不够用。",-1),P=s("p",null,"下面是我的一些 Hrkari 数据源连接池下， DB 连接获得的时间参考值。",-1),R=s("p",null,"其中，对连接的池的持有情况如下图所示，这是正常情况，几乎监控不到 DB 连接不够用的情况。",-1),k=s("p",null,"对 DB 连接利用率的监控，如下图所示，连接的 Creation、Acquire 基本上是正常的，但是连接的 Usage>500ms 就有些不正常了，说明里面有一些耗时操作。",-1),j=p("",18);function V(H,U,Q,x,J,Y){const n=e("Image");return t(),r("div",null,[i,E,y,g,d,a(n,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image/M00/71/66/Ciqc1F--J7aAPxYpAAApgD8vr5o823.png"}),u,A,F,C,_,a(n,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image/M00/71/66/Ciqc1F--J7-AcywEAAYEtGdc-RE017.png"}),h,a(n,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image/M00/71/71/CgqCHl--J86AIwh6AATgTHk0WxE893.png"}),D,I,S,a(n,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image/M00/71/71/CgqCHl--J9yANzVgAAMLiLh9kQQ355.png"}),v,T,b,M,q,m,a(n,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image/M00/71/71/CgqCHl--J-SAFH9yAAUc9mOMYYk555.png"}),O,a(n,{alt:"Drawing 5.png",src:"https://s0.lgstatic.com/i/image/M00/71/71/CgqCHl--KAKAWO2aAAL2Xu59B5I687.png"}),N,a(n,{alt:"Drawing 6.png",src:"https://s0.lgstatic.com/i/image/M00/71/66/Ciqc1F--KAuAQPOwAATpoE3jbT0924.png"}),f,a(n,{alt:"Drawing 7.png",src:"https://s0.lgstatic.com/i/image/M00/71/71/CgqCHl--KCuAcIttAANGE2zTL8g522.png"}),B,a(n,{alt:"Drawing 8.png",src:"https://s0.lgstatic.com/i/image/M00/71/66/Ciqc1F--KEGAOpmsAAFjWvgQG2M712.png"}),w,a(n,{alt:"Drawing 9.png",src:"https://s0.lgstatic.com/i/image/M00/71/72/CgqCHl--KFqAEpxiAAGZnguqMBM395.png"}),L,P,R,a(n,{alt:"Drawing 10.png",src:"https://s0.lgstatic.com/i/image/M00/71/72/CgqCHl--KGKAUrM_AAGuA1rvXks679.png"}),k,a(n,{alt:"Drawing 11.png",src:"https://s0.lgstatic.com/i/image/M00/71/66/Ciqc1F--KGiAQnscAAFqjef-KBY275.png"}),j])}const z=l(c,[["render",V]]);export{K as __pageData,z as default};
