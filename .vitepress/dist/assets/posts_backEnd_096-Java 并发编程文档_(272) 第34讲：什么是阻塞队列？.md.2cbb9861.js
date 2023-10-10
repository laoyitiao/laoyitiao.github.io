import{_ as l,j as t,o as p,g as c,k as n,h as e,Q as o,s}from"./chunks/framework.cfb14fe0.js";const S=JSON.parse('{"title":"第34讲：什么是阻塞队列？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/096-Java 并发编程文档/(272) 第34讲：什么是阻塞队列？.md","filePath":"posts/backEnd/096-Java 并发编程文档/(272) 第34讲：什么是阻塞队列？.md","lastUpdated":1696682708000}'),r={name:"posts/backEnd/096-Java 并发编程文档/(272) 第34讲：什么是阻塞队列？.md"},i=o('<h1 id="第34讲-什么是阻塞队列" tabindex="-1">第34讲：什么是阻塞队列？ <a class="header-anchor" href="#第34讲-什么是阻塞队列" aria-label="Permalink to &quot;第34讲：什么是阻塞队列？&quot;">​</a></h1><p>在本课时中我们主要讲解一下什么是阻塞队列。</p><h3 id="阻塞队列的作用" tabindex="-1">阻塞队列的作用 <a class="header-anchor" href="#阻塞队列的作用" aria-label="Permalink to &quot;阻塞队列的作用&quot;">​</a></h3><p>阻塞队列，也就是 BlockingQueue，它是一个接口，如代码所示：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">interface</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">BlockingQueue</span><span style="color:#E1E4E8;">&lt;</span><span style="color:#F97583;">E</span><span style="color:#E1E4E8;">&gt; </span><span style="color:#F97583;">extends</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Queue</span><span style="color:#E1E4E8;">&lt;</span><span style="color:#F97583;">E</span><span style="color:#E1E4E8;">&gt;{...}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">interface</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">BlockingQueue</span><span style="color:#24292E;">&lt;</span><span style="color:#D73A49;">E</span><span style="color:#24292E;">&gt; </span><span style="color:#D73A49;">extends</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Queue</span><span style="color:#24292E;">&lt;</span><span style="color:#D73A49;">E</span><span style="color:#24292E;">&gt;{...}</span></span></code></pre></div><p>BlockingQueue 继承了 Queue 接口，是队列的一种。Queue 和 BlockingQueue 都是在 Java 5 中加入的。</p><p>BlockingQueue 是线程安全的，我们在很多场景下都可以利用线程安全的队列来优雅地解决我们业务自身的线程安全问题。比如说，使用生产者/消费者模式的时候，我们生产者只需要往队列里添加元素，而消费者只需要从队列里取出它们就可以了，如图所示：</p>',7),u=s("p",null,"在图中，左侧有三个生产者线程，它会把生产出来的结果放到中间的阻塞队列中，而右侧的三个消费者也会从阻塞队列中取出它所需要的内容并进行处理。因为阻塞队列是线程安全的，所以生产者和消费者都可以是多线程的，不会发生线程安全问题。",-1),d=s("p",null,'既然队列本身是线程安全的，队列可以安全地从一个线程向另外一个线程传递数据，所以我们的生产者/消费者直接使用线程安全的队列就可以，而不需要自己去考虑更多的线程安全问题。这也就意味着，考虑锁等线程安全问题的重任从"你"转移到了"队列"上，降低了我们开发的难度和工作量。',-1),_=s("p",null,"同时，队列它还能起到一个隔离的作用。比如说我们开发一个银行转账的程序，那么生产者线程不需要关心具体的转账逻辑，只需要把转账任务，如账户和金额等信息放到队列中就可以，而不需要去关心银行这个类如何实现具体的转账业务。而作为银行这个类来讲，它会去从队列里取出来将要执行的具体的任务，再去通过自己的各种方法来完成本次转账。",-1),h=s("p",null,"这样就实现了具体任务与执行任务类之间的解耦，任务被放在了阻塞队列中，而负责放任务的线程是无法直接访问到我们银行具体实现转账操作的对象的，实现了隔离，提高了安全性。",-1),E=s("h3",{id:"主要并发队列关系图",tabindex:"-1"},[e("主要并发队列关系图 "),s("a",{class:"header-anchor",href:"#主要并发队列关系图","aria-label":'Permalink to "主要并发队列关系图"'},"​")],-1),y=o('<p>上图展示了 Queue 最主要的实现类，可以看出 Java 提供的线程安全的队列（也称为并发队列）分为<strong>阻塞队列</strong> 和<strong>非阻塞队列</strong>两大类。</p><p>阻塞队列的典型例子就是 BlockingQueue 接口的实现类，BlockingQueue 下面有 6 种最主要的实现，分别是 ArrayBlockingQueue、LinkedBlockingQueue、SynchronousQueue、DelayQueue、PriorityBlockingQueue 和 LinkedTransferQueue，它们各自有不同的特点，对于这些常见的阻塞队列的特点，我们会在第 36 课时中展开说明。</p><p>非阻塞并发队列的典型例子是 ConcurrentLinkedQueue，这个类不会让线程阻塞，利用 CAS 保证了线程安全。</p><p>我们可以根据需要自由选取阻塞队列或者非阻塞队列来满足业务需求。</p><p>还有一个和 Queue 关系紧密的 Deque 接口，它继承了 Queue，如代码所示：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">interface</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Deque</span><span style="color:#E1E4E8;">&lt;</span><span style="color:#F97583;">E</span><span style="color:#E1E4E8;">&gt; </span><span style="color:#F97583;">extends</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Queue</span><span style="color:#E1E4E8;">&lt;</span><span style="color:#F97583;">E</span><span style="color:#E1E4E8;">&gt; {</span><span style="color:#6A737D;">//...}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">interface</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Deque</span><span style="color:#24292E;">&lt;</span><span style="color:#D73A49;">E</span><span style="color:#24292E;">&gt; </span><span style="color:#D73A49;">extends</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Queue</span><span style="color:#24292E;">&lt;</span><span style="color:#D73A49;">E</span><span style="color:#24292E;">&gt; {</span><span style="color:#6A737D;">//...}</span></span></code></pre></div><p>Deque 的意思是双端队列，音标是 [dek]，是 double-ended-queue 的缩写，它从头和尾都能添加和删除元素；而普通的 Queue 只能从一端进入，另一端出去。这是 Deque 和 Queue 的不同之处，Deque 其他方面的性质都和 Queue 类似。</p><h3 id="阻塞队列的特点" tabindex="-1">阻塞队列的特点 <a class="header-anchor" href="#阻塞队列的特点" aria-label="Permalink to &quot;阻塞队列的特点&quot;">​</a></h3><p>阻塞队列区别于其他类型的队列的最主要的特点就是&quot;阻塞&quot;这两个字，所以下面重点介绍阻塞功能：阻塞功能使得生产者和消费者两端的能力得以平衡，当有任何一端速度过快时，阻塞队列便会把过快的速度给降下来。实现阻塞最重要的两个方法是 take 方法和 put 方法。</p><h4 id="take-方法" tabindex="-1">take 方法 <a class="header-anchor" href="#take-方法" aria-label="Permalink to &quot;take 方法&quot;">​</a></h4><p>take 方法的功能是获取并移除队列的头结点，通常在队列里有数据的时候是可以正常移除的。可是一旦执行 take 方法的时候，队列里无数据，则阻塞，直到队列里有数据。一旦队列里有数据了，就会立刻解除阻塞状态，并且取到数据。过程如图所示：</p>',11),g=s("h4",{id:"put-方法",tabindex:"-1"},[e("put 方法 "),s("a",{class:"header-anchor",href:"#put-方法","aria-label":'Permalink to "put 方法"'},"​")],-1),k=s("p",null,"put 方法插入元素时，如果队列没有满，那就和普通的插入一样是正常的插入，但是如果队列已满，那么就无法继续插入，则阻塞，直到队列里有了空闲空间。如果后续队列有了空闲空间，比如消费者消费了一个元素，那么此时队列就会解除阻塞状态，并把需要添加的数据添加到队列中。过程如图所示：",-1),A=s("p",null,"以上过程中的阻塞和解除阻塞，都是 BlockingQueue 完成的，不需要我们自己处理。",-1),b=s("h4",{id:"是否有界-容量有多大",tabindex:"-1"},[e("是否有界（容量有多大） "),s("a",{class:"header-anchor",href:"#是否有界-容量有多大","aria-label":'Permalink to "是否有界（容量有多大）"'},"​")],-1),Q=s("p",null,"此外，阻塞队列还有一个非常重要的属性，那就是容量的大小，分为有界和无界两种。",-1),m=s("p",null,"无界队列意味着里面可以容纳非常多的元素，例如 LinkedBlockingQueue 的上限是 Integer.MAX_VALUE，约为 2 的 31 次方，是非常大的一个数，可以近似认为是无限容量，因为我们几乎无法把这个容量装满。",-1),D=s("p",null,"但是有的阻塞队列是有界的，例如 ArrayBlockingQueue 如果容量满了，也不会扩容，所以一旦满了就无法再往里放数据了。",-1),v=s("p",null,"以上就是本课时的全部内容，本课时讲解了什么是阻塞队列，首先我们讲解了阻塞队列的作用；然后看了 Java 8 中的并发队列，分为阻塞队列和非阻塞队列，并且在阻塞队列中有 6 种常见的实现；最后我们看了阻塞队列的特点，包括 take 方法、put 方法和是否有界。",-1);function B(f,q,C,x,F,P){const a=t("Image");return p(),c("div",null,[i,n(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/62/7D/Cgq2xl4le8SAYKHDAABbO_HZa9c237.png"}),e(),u,d,_,h,E,n(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/62/7D/Cgq2xl4le9SAL6enAAGpXZi8Wcg079.jpg"}),e(),y,n(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/62/7D/Cgq2xl4le_eAafhbAABp-t8dt_8312.png"}),e(),g,k,n(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/62/7D/CgpOIF4lfAyAC4zxAAB1UtAAltk817.png"}),e(),A,b,Q,m,D,v])}const V=l(r,[["render",B]]);export{S as __pageData,V as default};
