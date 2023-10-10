import{_ as n,j as a,o as _,g as i,k as o,h as e,Q as s,s as l}from"./chunks/framework.cfb14fe0.js";const tl=JSON.parse('{"title":"第41讲：原子类和volatile有什么异同？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/096-Java 并发编程文档/(279) 第41讲：原子类和 volatile 有什么异同？.md","filePath":"posts/backEnd/096-Java 并发编程文档/(279) 第41讲：原子类和 volatile 有什么异同？.md","lastUpdated":1696682708000}'),r={name:"posts/backEnd/096-Java 并发编程文档/(279) 第41讲：原子类和 volatile 有什么异同？.md"},c=s('<h1 id="第41讲-原子类和volatile有什么异同" tabindex="-1">第41讲：原子类和volatile有什么异同？ <a class="header-anchor" href="#第41讲-原子类和volatile有什么异同" aria-label="Permalink to &quot;第41讲：原子类和volatile有什么异同？&quot;">​</a></h1><p>本课时我们主要讲解原子类和 volatile 有什么异同。</p><h2 id="案例-说明-volatile-和原子类的异同" tabindex="-1"><strong>案例</strong> <strong>说明</strong> <strong>volatile</strong> <strong>和原子类的异同</strong> <a class="header-anchor" href="#案例-说明-volatile-和原子类的异同" aria-label="Permalink to &quot;**案例** **说明** **volatile** **和原子类的异同**&quot;">​</a></h2><p>我们首先看一个案例。如图所示，我们有两个线程。</p><br>',5),u=l("br",null,null,-1),h=l("p",null,"在图中左上角可以看出，有一个公共的 boolean flag 标记位，最开始赋值为 true，然后线程 2 会进入一个 while 循环，并且根据这个 flag 也就是标记位的值来决定是否继续执行或着退出。",-1),d=l("br",null,null,-1),p=l("p",null,"最开始由于 flag 的值是 true，所以首先会在这里执行一定时期的循环。然后假设在某一时刻，线程 1 把这个 flag 的值改为 false 了，它所希望的是，线程 2 看到这个变化后停止运行。",-1),g=l("br",null,null,-1),v=l("p",null,"但是这样做其实是有风险的，线程 2 可能并不能立刻停下来，也有可能过一段时间才会停止，甚至在最极端的情况下可能永远都不会停止。",-1),A=l("br",null,null,-1),b=l("p",null,"为了理解发生这种情况的原因，我们首先来看一下 CPU 的内存结构，这里是一个双核的 CPU 的简单示意图：",-1),m=l("br",null,null,-1),C=l("br",null,null,-1),f=l("p",null,"可以看出，线程 1 和线程 2 分别在不同的 CPU 核心上运行，每一个核心都有自己的本地内存，并且在下方也有它们共享的内存。",-1),I=l("br",null,null,-1),T=l("p",null,"最开始它们都可以读取到 flag 为 true ，不过当线程 1 这个值改为 false 之后，线程 2 并不能及时看到这次修改，因为线程 2 不能直接访问线程 1 的本地内存，这样的问题就是一个非常典型的可见性问题。",-1),q=l("br",null,null,-1),P=l("br",null,null,-1),x=l("p",null,"要想解决这个问题，我们只需要在变量的前面加上 volatile 关键字修饰，只要我们加上这个关键字，那么每一次变量被修改的时候，其他线程对此都可见，这样一旦线程 1 改变了这个值，那么线程 2 就可以立刻看到，因此就可以退出 while 循环了。",-1),B=l("br",null,null,-1),k=l("br",null,null,-1),F=l("p",null,"之所以加了关键字之后就就可以让它拥有可见性，原因在于有了这个关键字之后，线程 1 的更改会被 flush 到共享内存中，然后又会被 refresh 到线程 2 的本地内存中，这样线程 2 就能感受到这个变化了，所以 volatile 这个关键字最主要是用来解决可见性问题的，可以一定程度上保证线程安全。",-1),M=l("br",null,null,-1),N=l("p",null,"现在让我们回顾一下很熟悉的多线程同时进行 value++ 的场景，如图所示：",-1),S=l("br",null,null,-1),V=l("br",null,null,-1),J=l("p",null,"如果它被初始化为每个线程都加 1000 次，最终的结果很可能不是 2000。由于 value++ 不是原子的，所以在多线程的情况下，会出现线程安全问题。但是如果我们在这里使用 volatile 关键字，能不能解决问题呢？",-1),E=l("br",null,null,-1),O=l("br",null,null,-1),Q=l("p",null,"很遗憾，答案是即便使用了 volatile 也是不能保证线程安全的，因为这里的问题不单单是可见性问题，还包含原子性问题。",-1),U=l("br",null,null,-1),z=l("p",null,"我们有多种办法可以解决这里的问题，第 1 种是使用 synchronized 关键字，如图所示：",-1),D=l("br",null,null,-1),G=l("br",null,null,-1),R=l("p",null,"这样一来，两个线程就不能同时去更改 value 的数值，保证了 value++ 语句的原子性，并且 synchronized 同样保证了可见性，也就是说，当第 1 个线程修改了 value 值之后，第 2 个线程可以立刻看见本次修改的结果。",-1),$=l("br",null,null,-1),w=l("p",null,"解决这个问题的第 2 个方法，就是使用我们的原子类，如图所示：",-1),H=l("br",null,null,-1),W=s('<br><p>比如用一个 AtomicInteger，然后每个线程都调用它的 incrementAndGet 方法。</p><br><p>在利用了原子变量之后就无需加锁，我们可以使用它的 incrementAndGet 方法，这个操作底层由 CPU 指令保证原子性，所以即便是多个线程同时运行，也不会发生线程安全问题。</p><h2 id="原子类和-volatile-的使用场景" tabindex="-1"><strong>原子类和</strong> <strong>volatile</strong> <strong>的使用场景</strong> <a class="header-anchor" href="#原子类和-volatile-的使用场景" aria-label="Permalink to &quot;**原子类和** **volatile** **的使用场景**&quot;">​</a></h2><p>那下面我们就来说一下原子类和 volatile 各自的使用场景。</p><br><p>我们可以看出，volatile 和原子类的使用场景是不一样的，如果我们有一个可见性问题，那么可以使用 volatile 关键字，但如果我们的问题是一个组合操作，需要用同步来解决原子性问题的话，那么可以使用原子变量，而不能使用 volatile 关键字。</p><br><p>通常情况下，volatile 可以用来修饰 boolean 类型的标记位，因为对于标记位来讲，直接的赋值操作本身就是具备原子性的，再加上 volatile 保证了可见性，那么就是线程安全的了。</p><br><p>而对于会被多个线程同时操作的计数器 Counter 的场景，这种场景的一个典型特点就是，它不仅仅是一个简单的赋值操作，而是需要先读取当前的值，然后在此基础上进行一定的修改，再把它给赋值回去。这样一来，我们的 volatile 就不足以保证这种情况的线程安全了。我们需要使用原子类来保证线程安全。</p>',12);function j(y,L,Z,K,X,Y){const t=a("Image");return _(),i("div",null,[c,o(t,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/64/9F/CgpOIF49B7qAIJThAAB6qxJtvhs898.png"}),e(),u,h,d,p,g,v,A,b,m,o(t,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/64/A0/Cgq2xl49B9GAHIQWAABs3zG_-08605.png"}),e(),C,f,I,T,q,o(t,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/64/A0/Cgq2xl49B-mAArdMAACJefFgK2k906.png"}),e(),P,x,B,o(t,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/64/A0/Cgq2xl49CACANaAbAACTXNZMnjQ802.png"}),e(),k,F,M,N,S,o(t,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/64/9F/CgpOIF49CBeAUzqHAABbWQsq8Q8832.png"}),e(),V,J,E,o(t,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/64/9F/CgpOIF49CCqALcWIAABfoeCHiaA363.png"}),e(),O,Q,U,z,D,o(t,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/64/9F/CgpOIF49CD6AQpviAACRYw_n1i4430.png"}),e(),G,R,$,w,H,o(t,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/64/A0/CgpOIF49Ca2AL79uAACSZRAVJcg684.png"}),e(),W])}const ol=n(r,[["render",j]]);export{tl as __pageData,ol as default};
