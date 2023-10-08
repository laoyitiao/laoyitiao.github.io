import{_ as p,j as o,o as t,g as c,k as e,h as a,Q as l,s}from"./chunks/framework.4e7d56ce.js";const B=JSON.parse('{"title":"第05讲：大厂面试题：得心应手应对OOM的疑难杂症","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/099-深入浅出 Java 虚拟机文档/(1029) 第05讲：大厂面试题：得心应手应对 OOM 的疑难杂症.md","filePath":"posts/backEnd/099-深入浅出 Java 虚拟机文档/(1029) 第05讲：大厂面试题：得心应手应对 OOM 的疑难杂症.md","lastUpdated":1696682708000}'),r={name:"posts/backEnd/099-深入浅出 Java 虚拟机文档/(1029) 第05讲：大厂面试题：得心应手应对 OOM 的疑难杂症.md"},E=l("",9),i=l("",8),y=s("p",null,"有两个注意点：",-1),d=s("ul",null,[s("li",null,"我们这里说的是活跃的引用，而不是对象，对象是不能作为 GC Roots 的。"),s("li",null,'GC 过程是找出所有活对象，并把其余空间认定为"无用"；而不是找出所有死掉的对象，并回收它们占用的空间。所以，哪怕 JVM 的堆非常的大，基于 tracing 的 GC 方式，回收速度也会非常快。')],-1),h=s("h3",{id:"引用级别",tabindex:"-1"},[a("引用级别 "),s("a",{class:"header-anchor",href:"#引用级别","aria-label":'Permalink to "引用级别"'},"​")],-1),u=s("p",null,"接下来的一道面试题就有意思多了：能够找到 Reference Chain 的对象，就一定会存活么？",-1),g=s("p",null,'我在面试的时候，经常会问这些问题，比如"弱引用有什么用处"？令我感到奇怪的是，即使是一些工作多年的 Java 工程师，对待这个问题也是一知半解，错失了很多机会。',-1),_=s("p",null,"对象对于另外一个对象的引用，要看关系牢靠不牢靠，可能在链条的其中一环，就断掉了。",-1),f=l("",38),b=s("p",null,"可以看到除了程序计数器，其他区域都有OOM溢出的可能。但是最常见的还是发生在堆上。",-1),v=s("p",null,"所以 OOM 到底是什么引起的呢？有几个原因：",-1),A=s("ul",null,[s("li",null,"内存的容量太小了，需要扩容，或者需要调整堆的空间。"),s("li",null,"错误的引用方式，发生了内存泄漏。没有及时的切断与 GC Roots 的关系。比如线程池里的线程，在复用的情况下忘记清理 ThreadLocal 的内容。"),s("li",null,"接口没有进行范围校验，外部传参超出范围。比如数据库查询时的每页条数等。"),s("li",null,"对堆外内存无限制的使用。这种情况一旦发生更加严重，会造成操作系统内存耗尽。")],-1),C=s("p",null,"典型的内存泄漏场景，原因在于对象没有及时的释放自己的引用。比如一个局部变量，被外部的静态集合引用。",-1),F=s("p",null,"你在平常写代码时，一定要注意这种情况，千万不要为了方便把对象到处引用。即使引用了，也要在合适时机进行手动清理。关于这部分的问题根源排查，我们将在实践课程中详细介绍。",-1),O=s("h3",{id:"小结",tabindex:"-1"},[a("小结 "),s("a",{class:"header-anchor",href:"#小结","aria-label":'Permalink to "小结"'},"​")],-1),m=s("p",null,"你可以注意到 GC Roots 的专业叫法，就是可达性分析法。另外，还有一种叫作引用计数法的方式，在判断对象的存活问题上，经常被提及。",-1),j=s("p",null,"因为有循环依赖的硬伤，现在主流的 JVM，没有一个是采用引用计数法来实现 GC 的，所以我们大体了解一下就可以。引用计数法是在对象头里维护一个 counter 计数器，被引用一次数量 +1，引用失效记数 -1。计数器为 0 时，就被认为无效。你现在可以忘掉引用计数的方式了。",-1),M=s("p",null,"本课时，我们详细介绍了 GC Roots 都包含哪些内容。HostSpot 采用 tracing 的方式进行 GC，内存回收的速度与处于 living 状态的对象数量有关。",-1),k=s("p",null,"这部分涉及的内容较多，如果面试被问到，你可以采用白话版的方式进行介绍，然后举例深入。",-1),R=s("p",null,"接下来，我们了解到四种不同强度的引用类型，尤其是软引用和虚引用，在平常工作中使用还是比较多的。这里面最不常用的就是虚引用，但是它引申出来的 Cleaner 类，是用来替代 finalizer 方法的，这是一个比较重要的知识点。",-1),D=s("p",null,"本课时最后讨论了几种典型的 OOM 场景，你可能现在对其概念比较模糊。接下来的课时，我们将详细介绍几个常见的垃圾回收算法，然后对这些 OOM 的场景逐个击破。",-1);function x(S,q,w,P,J,V){const n=o("Image");return t(),c("div",null,[E,e(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/62/12/CgpOIF4heVuAPrWVAACK3qrA9-0011.png"}),a(),i,e(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/62/13/Cgq2xl4hefWAWKFZAAMwndGjScg437.png"}),a(),y,d,h,u,g,_,e(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/62/13/Cgq2xl4hehyAEx1JAABb83OQ5S0469.png"}),a(),f,e(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/62/13/Cgq2xl4hepeAAwhWAAJfLYUzaPI499.png"}),a(),b,e(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/62/13/Cgq2xl4heqWAZMlOAAA-Cqk2QcM143.png"}),a(),v,A,C,e(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/62/13/Cgq2xl4hesWATlosAAJxxYIdMjs057.png"}),a(),F,O,m,j,M,k,R,D])}const T=p(r,[["render",x]]);export{B as __pageData,T as default};
