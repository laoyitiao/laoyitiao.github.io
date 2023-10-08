import{_ as n,j as o,o as r,g as p,k as s,h as e,s as a,Q as t}from"./chunks/framework.4e7d56ce.js";const Ma=JSON.parse('{"title":"第07讲：Java内存模型与线程","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/Android 工程师进阶 34 讲_文档/(1861) 第07讲：Java 内存模型与线程.md","filePath":"posts/frontEnd/Android 工程师进阶 34 讲_文档/(1861) 第07讲：Java 内存模型与线程.md","lastUpdated":1696682708000}'),i={name:"posts/frontEnd/Android 工程师进阶 34 讲_文档/(1861) 第07讲：Java 内存模型与线程.md"},h=a("h1",{id:"第07讲-java内存模型与线程",tabindex:"-1"},[e("第07讲：Java内存模型与线程 "),a("a",{class:"header-anchor",href:"#第07讲-java内存模型与线程","aria-label":'Permalink to "第07讲：Java内存模型与线程"'},"​")],-1),c=a("br",null,null,-1),d=a("p",null,"本课时我们将进入 Java 内存模型的学习。",-1),_=a("br",null,null,-1),u=a("p",null,"Java 内存模型一词翻译自 Java Memory Model，简称 JMM，它所描述的是多线程并发、CPU 缓存等方面的内容，这里需要注意不要将它与课时 01 讲到的 JVM 内存结构混淆。",-1),b=a("h1",{id:"为什么有-java-内存模型",tabindex:"-1"},[e("为什么有 Java 内存模型 "),a("a",{class:"header-anchor",href:"#为什么有-java-内存模型","aria-label":'Permalink to "为什么有 Java 内存模型"'},"​")],-1),g=a("p",null,"网上大多数文章在介绍 JMM 时，都会引用《深入理解 Java 虚拟机》中的一张图，如下：",-1),C=a("br",null,null,-1),v=a("br",null,null,-1),m=a("p",null,"上图描述的意思是，在每一个线程中，都会有一块内部的工作内存（working memory）。这块工作内存保存了主内存共享数据的拷贝副本。在第 1 课时中，我们了解到在 JVM 内存结构中有一块线程独享的内存空间------虚拟机栈，所以这里我们会自然而然的将线程工作内存理解为虚拟机栈。",-1),A=a("br",null,null,-1),P=a("p",null,[e("实际上，这种理解是不准确的！虚拟机栈和线程的工作内存并不是一个概念。在 Java 线程中并不存在所谓的工作内存（working memory），"),a("strong",null,"它只是对 CPU"),e(),a("strong",null,"寄存器和高速缓存的抽象描述"),e("。")],-1),f=a("h2",{id:"cpu-普及",tabindex:"-1"},[e("CPU 普及 "),a("a",{class:"header-anchor",href:"#cpu-普及","aria-label":'Permalink to "CPU 普及"'},"​")],-1),q=a("p",null,"你可能会感到奇怪，怎么突然又扯到 CPU 了？作为一个程序员，尤其是 Java 程序员，我们都应该知道线程是 CPU 调度的最小单位，线程中的字节码指令最终都是在 CPU 中执行的。CPU在执行的时候，免不了要和各种数据打交道，而 Java 中所有数据都是存放在主内存（RAM）当中的，这一过程可以参考下图：",-1),x=a("br",null,null,-1),k=a("br",null,null,-1),y=a("p",null,"随着 CPU 技术的发展，CPU 的执行速度越来越快，但内存的技术并没有太大的变化，所以在内存中读取和写入数据的过程和 CPU 的执行速度比起来差距会越来越大，也就是上图中箭头部分。CPU 对主内存的访问需要等待较长的时间，这样就体现不出 CPU 超强运算能力的优势了。",-1),J=a("br",null,null,-1),V=a("p",null,'因此，为了"压榨"处理性能，达到"高并发"的效果，在 CPU 中添加了高速缓存 （cache）来作为缓冲。',-1),U=a("br",null,null,-1),B=a("br",null,null,-1),M=a("p",null,"在执行任务时，CPU 会先将运算所需要使用到的数据复制到高速缓存中，让运算能够快速进行，当运算完成之后，再将缓存中的结果刷回（flush back）主内存，这样 CPU 就不用等待主内存的读写操作了。",-1),T=a("br",null,null,-1),E=a("p",null,[e("一切看起来很美好，但是问题也随之而来。每个处理器都有自己的高速缓存，同时又共同操作同一块主内存，当多个处理器同时操作主内存时，可能导致数据不一致，这就是是"),a("strong",null,"缓存一致性"),e(" 问题。")],-1),I=a("h2",{id:"缓存一致性问题",tabindex:"-1"},[e("缓存一致性问题 "),a("a",{class:"header-anchor",href:"#缓存一致性问题","aria-label":'Permalink to "缓存一致性问题"'},"​")],-1),S=a("p",null,"现在市面上的手机通常有两个或者多个 CPU，其中一些 CPU 还有多核。每个 CPU 在某一时刻都能运行一个线程，这就意味着，如果你的 Java 程序是多线程的，那么就有可能存在多个线程在同一时刻被不同的CPU执行的情况。",-1),N=a("br",null,null,-1),j=a("p",null,"比如我们有如下一段代码：",-1),F=a("br",null,null,-1),w=t("",32),D=a("br",null,null,-1),K=a("p",null,"可以看出，虽然在 C1 和 C2 的缓存中，分别修改了 x 和 y 的值，但是并未将它们刷新回主内存中，这就是缓存一致性问题。",-1),z=a("h2",{id:"指令重排",tabindex:"-1"},[e("指令重排 "),a("a",{class:"header-anchor",href:"#指令重排","aria-label":'Permalink to "指令重排"'},"​")],-1),O=a("p",null,"除了缓存一致性问题，还存在另外一种硬件问题，也比较重要：为了使 CPU 内部的运算单元能够尽量被充分利用，处理器可能会对输入的字节码指令进行重排序处理，也就是处理器优化。除了 CPU 之外，很多编程语言的编译器也会有类似的优化，比如 Java虚拟机的即时编译器（JIT）也会做指令重排。",-1),R=a("br",null,null,-1),$=a("p",null,"以下面的代码为例：",-1),G=a("br",null,null,-1),Q=a("p",null,"编译之后的字节码指令如下：",-1),W=a("br",null,null,-1),Z=a("br",null,null,-1),H=a("br",null,null,-1),L=a("br",null,null,-1),X=a("br",null,null,-1),Y=a("p",null,"可以看出在上述指令中，有两处指令表达的是同样的语义，并且指令 7 并不依赖指令 2 和指令 3。在这种情况下，CPU 会对指令的顺序做优化，如下：",-1),aa=a("br",null,null,-1),ea=a("br",null,null,-1),la=a("p",null,"从 Java 语言的角度看这层优化就是：",-1),sa=a("br",null,null,-1),ta=a("br",null,null,-1),na=a("p",null,"也就是说在 CPU 层面，有时候代码并不会严格按照 Java 文件中的顺序去执行。再看一下之前 r1/r2 的实例，刚才我们分析会有 3 种情况发生，其实在极端情况下，还会出现第 4 种情况：",-1),oa=a("blockquote",null,[a("p",null,"r1 = 2，r2 = 1")],-1),ra=a("p",null,"线程 p2 中的代码经过 CPU 优化之后，会被重排序为：",-1),pa=a("br",null,null,-1),ia=a("br",null,null,-1),ha=a("p",null,"经过优化之后，p2 线程将 x 赋值为 2，这时 CPU 将时间片段分配给线程 p1，线程 p1 在执行过程中，将 r1 赋值为 x，此时 x = 2，所以 r1 的值为 2。然后将 y 赋值为 1，此时 CPU 再将时间片段重新分配给 p2。",-1),ca=a("br",null,null,-1),da=a("p",null,"代码回到 p2 中，将 y 值赋值给 r2，此时 y = 1，所以 r2 = 1，整个过程如下图所示：",-1),_a=a("br",null,null,-1),ua=t("",19),ba=t("",41),ga=a("br",null,null,-1),Ca=a("h2",{id:"使用synchronized关键字修饰操作",tabindex:"-1"},[e("使用synchronized关键字修饰操作 "),a("a",{class:"header-anchor",href:"#使用synchronized关键字修饰操作","aria-label":'Permalink to "使用synchronized关键字修饰操作"'},"​")],-1),va=a("br",null,null,-1),ma=a("p",null,"通过以上两种方式，都可以使 setValue 和 getValue 符合 happens-before 原则------当在某一线程中调用 setValue 后，再在其他线程中调用 getValue 获取的值一定是 1。",-1),Aa=a("h1",{id:"总结",tabindex:"-1"},[e("总结 "),a("a",{class:"header-anchor",href:"#总结","aria-label":'Permalink to "总结"'},"​")],-1),Pa=a("p",null,"本课时我们主要介绍了以下几点：",-1),fa=a("ul",null,[a("li",null,[a("p",null,"Java 内存模型的来源：主要是因为 CPU 缓存和指令重排等优化会造成多线程程序结果不可控。")]),a("li",null,[a("p",null,"Java 内存模型是什么：本质上它就是一套规范，在这套规范中有一条最重要的 happens-before 原则。")]),a("li",null,[a("p",null,"最后介绍了 Java 内存模型的使用，其中简单介绍了两种方式：volatile 和 synchronized。其实除了这两种方式，Java 还提供了很多关键字来实现 happens-before 原则，后续课时中将会详细介绍。")])],-1);function qa(xa,ka,ya,Ja,Va,Ua){const l=o("Image");return r(),p("div",null,[h,c,d,_,u,b,g,C,s(l,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/0F/5C/Ciqah16VdfyAKW4PAADwKkKf3ho258.png"}),e(),v,m,A,P,f,q,x,s(l,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/88/72/Cgq2xl6VddeAEMpoAAB8hyBTG6s068.png"}),e(),k,y,J,V,U,s(l,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/0F/5B/Ciqah16VddeAQQn6AACp-HxFwfo279.png"}),e(),B,M,T,E,I,S,N,j,F,s(l,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/88/72/Cgq2xl6VddeAJK0xAACKS-ON00w242.png"}),e(),w,s(l,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/88/72/Cgq2xl6VddiAO02sAAAe6xTnBlI145.png"}),e(),D,K,z,O,R,$,G,s(l,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/88/72/Cgq2xl6VddiAFch6AAANXK2e6Ic978.png"}),e(),Q,W,s(l,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/88/72/Cgq2xl6Vdk2ADgOkAAEolgP7ZVw813.png"}),e(),Z,H,L,X,Y,aa,s(l,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/0F/5B/Ciqah16VddmAMhEsAAGv_L-gOOI288.png"}),e(),ea,la,sa,s(l,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/88/72/Cgq2xl6VddmAe3StAACvXj7iPyM456.png"}),e(),ta,na,oa,ra,pa,s(l,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/88/72/Cgq2xl6VdnCAI0SsAAEI1td3ZTw250.png"}),e(),ia,ha,ca,da,_a,s(l,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/0F/5B/Ciqah16VddqAPWm2AAF1DtJNPU4827.png"}),e(),ua,s(l,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/88/72/Cgq2xl6VddqAHxY1AABNG3yvW-c927.png"}),e(),ba,s(l,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/0F/5C/Ciqah16VdruAD-KcAABUSaeaBRs555.png"}),e(),ga,Ca,s(l,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/0F/5B/Ciqah16VddqAZjI3AABvL6kb5Nk043.png"}),e(),va,ma,Aa,Pa,fa])}const Ta=n(i,[["render",qa]]);export{Ma as __pageData,Ta as default};
