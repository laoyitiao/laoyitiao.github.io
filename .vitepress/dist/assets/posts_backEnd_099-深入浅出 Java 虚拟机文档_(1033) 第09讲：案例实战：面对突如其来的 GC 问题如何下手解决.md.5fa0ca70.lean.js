import{_ as p,j as e,o as t,g as o,k as n,s,Q as l,h as i}from"./chunks/framework.b3d8e22e.js";const ms=JSON.parse('{"title":"GC 日志输出 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/099-深入浅出 Java 虚拟机文档/(1033) 第09讲：案例实战：面对突如其来的 GC 问题如何下手解决.md","filePath":"posts/backEnd/099-深入浅出 Java 虚拟机文档/(1033) 第09讲：案例实战：面对突如其来的 GC 问题如何下手解决.md","lastUpdated":1696417798000}'),r={name:"posts/backEnd/099-深入浅出 Java 虚拟机文档/(1033) 第09讲：案例实战：面对突如其来的 GC 问题如何下手解决.md"},c=s("p",null,"本课时我们主要从一个实战案例入手分析面对突如其来的 GC 问题该如何下手解决。",-1),_=s("br",null,null,-1),u=s("p",null,"想要下手解决 GC 问题，我们首先需要掌握下面这三种问题。",-1),g=s("ul",null,[s("li",null,[s("p",null,"如何使用 jstat 命令查看 JVM 的 GC 情况？")]),s("li",null,[s("p",null,"面对海量 GC 日志参数，如何快速抓住问题根源？")]),s("li",null,[s("p",null,"你不得不掌握的日志分析工具。")])],-1),E=s("p",null,"工欲善其事，必先利其器。我们前面课时讲到的优化手段，包括代码优化、扩容、参数优化，甚至我们的估算，都需要一些支撑信息加以判断。",-1),d=s("br",null,null,-1),h=l("",50),A=s("br",null,null,-1),O=s("p",null,"如果在 GC 前，有线程迟迟进入不了 safepoint，那么整个 JVM 都在等待这个阻塞的线程，会造成了整体 GC 的时间变长。",-1),C=s("br",null,null,-1),m=s("p",null,"所以呢，并不是只有 GC 会挂起 JVM，进入 safepoint 的过程也会。这个概念，如果你有兴趣可以自行深挖一下，一般是不会出问题的。",-1),G=s("br",null,null,-1),T=s("p",null,"如果面试官问起你在项目中都使用了哪些打印 GC 日志的参数，上面这些信息肯定是不很好记忆。你需要进行以下总结。比如：",-1),b=s("br",null,null,-1),y=s("p",null,'"我一般在项目中输出详细的 GC 日志，并加上可读性强的 GC 日志的时间戳。特别情况下我还会追加一些反映对象晋升情况和堆详细信息的日志，用来排查问题。另外，OOM 时自动 Dump 堆栈，我一般也会进行配置"。',-1),P=s("h2",{id:"gc-日志的意义",tabindex:"-1"},[i("GC 日志的意义 "),s("a",{class:"header-anchor",href:"#gc-日志的意义","aria-label":'Permalink to "GC 日志的意义"'},"​")],-1),q=s("p",null,"我们首先看一段日志，然后简要看一下各个阶段的意义。",-1),X=s("br",null,null,-1),v=l("",7),J=l("",16),V=s("br",null,null,-1),M=s("p",null,"我们可以从图中看到堆的使用情况。",-1),k=s("br",null,null,-1),S=s("p",null,"（2）关键信息",-1),D=s("p",null,"从图中我们可以看到一些性能的关键信息。",-1),f=s("p",null,"吞吐量：98.6%（一般超过 95% 就 ok 了）；",-1),I=s("p",null,"最大延迟：230ms，平均延迟：42.8ms；",-1),L=s("p",null,"延迟要看服务的接受程度，比如 SLA 定义 50ms 返回数据，上面的最大延迟就会有一点问题。本服务接近 99% 的停顿在 100ms 以下，可以说算是非常优秀了。",-1),$=s("br",null,null,-1),R=s("br",null,null,-1),j=s("p",null,"你在看这些信息的时候，一定要结合宿主服务器的监控去看。比如 GC 发生期间，CPU 会突然出现尖锋，就证明 GC 对 CPU 资源使用的有点多。但多数情况下，如果吞吐量和延迟在可接受的范围内，这些对 CPU 的超额使用是可以忍受的。",-1),F=s("br",null,null,-1),x=s("p",null,"（3）交互式图表",-1),N=s("br",null,null,-1),w=s("br",null,null,-1),H=s("p",null,"可以对有问题的区域进行放大查看，图中表示垃圾回收后的空间释放，可以看到效果是比较好的。",-1),B=s("br",null,null,-1),U=s("p",null,"（4）G1 的时间耗时",-1),Y=s("br",null,null,-1),K=s("br",null,null,-1),W=s("p",null,"如图展示了 GC 的每个阶段花费的时间。可以看到平均耗时最长的阶段，就是 Concurrent Mark 阶段，但由于是并发的，影响并不大。随着时间的推移，YoungGC 竟然达到了 136485 次。运行 5 天，光花在 GC 上的时间就有 2 个多小时，还是比较可观的。",-1),Q=s("br",null,null,-1),z=s("p",null,"（5）其他",-1),Z=s("br",null,null,-1),ss=s("br",null,null,-1),as=s("p",null,"如图所示，整个 JVM 创建了 100 多 T 的数据，其中有 2.4TB 被 promoted 到老年代。",-1),ns=s("p",null,"另外，还有一些 safepoint 的信息等，你可以自行探索。",-1),ls=s("br",null,null,-1),ps=s("p",null,"那到底什么样的数据才是有问题的呢？gceasy 提供了几个案例。比如下面这个就是停顿时间明显超长的 GC 问题。",-1),es=s("br",null,null,-1),ts=s("br",null,null,-1),os=s("p",null,"下面这个是典型的内存泄漏。",-1),is=s("br",null,null,-1),rs=l("",20),cs=l("",37),_s=l("",13);function us(gs,Es,ds,hs,As,Os){const a=e("Image");return t(),o("div",null,[c,_,u,g,E,d,n(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/64/AC/CgpOIF49MRaAYy5hAAAxaKab220724.jpg"}),h,n(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/64/AC/Cgq2xl49MRaAZaFKAABeSE1hLTg491.jpg"}),A,O,C,m,G,T,b,y,P,q,X,n(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/64/AC/CgpOIF49MRaAUrVfAAFWihJ6jwk874.jpg"}),v,n(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/64/AC/Cgq2xl49MRaAWpU-AAAUzFIkYlk730.jpg"}),J,n(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/64/AC/CgpOIF49MRaACSuzAABDthdVxTk570.jpg"}),V,M,k,S,D,f,I,L,$,n(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/64/AC/Cgq2xl49MReAI98WAABRPqHhDjE672.jpg"}),R,j,F,x,N,n(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/64/AC/CgpOIF49MReAcKfGAABakc1dRtA053.jpg"}),w,H,B,U,Y,n(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/64/AC/Cgq2xl49MReAf_DdAACM8OnUC_I541.jpg"}),K,W,Q,z,Z,n(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/64/AC/CgpOIF49MReAL2goAAB6BiE3imA217.jpg"}),ss,as,ns,ls,ps,es,n(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/64/AC/Cgq2xl49MReAQIQ_AABZPnGfj9s030.jpg"}),ts,os,is,n(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/64/AC/CgpOIF49MReAQHswAABgRmmPU5k549.jpg"}),rs,n(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/64/AC/Cgq2xl49MReAUqsJAABSeq9EGOY088.jpg"}),cs,n(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/64/AC/CgpOIF49MReAa5QEAAAoiL0gjR4706.jpg"}),_s])}const Gs=p(r,[["render",us]]);export{ms as __pageData,Gs as default};
