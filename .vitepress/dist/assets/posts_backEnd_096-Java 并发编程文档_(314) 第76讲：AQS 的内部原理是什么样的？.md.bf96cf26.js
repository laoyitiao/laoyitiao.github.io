import{_ as t,j as n,o as e,g as o,k as p,Q as s}from"./chunks/framework.b3d8e22e.js";const S=JSON.parse('{"title":"AQS 内部原理解析 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/096-Java 并发编程文档/(314) 第76讲：AQS 的内部原理是什么样的？.md","filePath":"posts/backEnd/096-Java 并发编程文档/(314) 第76讲：AQS 的内部原理是什么样的？.md","lastUpdated":1696417798000}'),l={name:"posts/backEnd/096-Java 并发编程文档/(314) 第76讲：AQS 的内部原理是什么样的？.md"},r=s(`<p>本课时我们主要介绍 AQS 的内部原理是什么样的。</p><h3 id="aqs-内部原理解析" tabindex="-1">AQS 内部原理解析 <a class="header-anchor" href="#aqs-内部原理解析" aria-label="Permalink to &quot;AQS 内部原理解析&quot;">​</a></h3><p>我们对 AQS 进行内部原理解析的话需要抓住重点，因为 AQS 的内部比较复杂，代码很长而且非常不容易读懂，如果我们一上来就一头扎进去读源码，是很难完全掌握它的。所以在本课时中，我们把 AQS 最核心的三个部分作为重点提炼出来，由这三个部分作为切入点，打开 AQS 的大门。</p><p>是哪三大部分呢？AQS 最核心的三大部分就是<strong>状态</strong> 、<strong>队列</strong> 和<strong>期望协作工具类去实现的获取/释放等重要方法</strong>。我们就从这三个部分出发，分别展开讲解。</p><h4 id="state-状态" tabindex="-1">state 状态 <a class="header-anchor" href="#state-状态" aria-label="Permalink to &quot;state 状态&quot;">​</a></h4><p>第一个要讲解的是状态 state，如果我们的 AQS 想要去管理或者想作为协作工具类的一个基础框架，那么它必然要管理一些状态，而这个状态在 AQS 内部就是用 state 变量去表示的。它的定义如下：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * The synchronization state.</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">volatile</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> state;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * The synchronization state.</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#D73A49;">private</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">volatile</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> state;</span></span></code></pre></div><p>而 state 的含义并不是一成不变的，它会<strong>根据具体实现类的作用不同而表示不同的含义</strong>，下面举几个例子。</p><p>比如说在信号量里面，state 表示的是剩余<strong>许可证的数量</strong>。如果我们最开始把 state 设置为 10，这就代表许可证初始一共有 10 个，然后当某一个线程取走一个许可证之后，这个 state 就会变为 9，所以信号量的 state 相当于是一个内部计数器。</p><p>再比如，在 CountDownLatch 工具类里面，state 表示的是<strong>需要&quot;倒数&quot;的数量</strong>。一开始我们假设把它设置为 5，当每次调用 CountDown 方法时，state 就会减 1，一直减到 0 的时候就代表这个门闩被放开。</p><p>下面我们再来看一下 state 在 ReentrantLock 中是什么含义，在 ReentrantLock 中它表示的是<strong>锁的占有情况</strong>。最开始是 0，表示没有任何线程占有锁；如果 state 变成 1，则就代表这个锁已经被某一个线程所持有了。</p><p>那为什么还会变成 2、3、4 呢？为什么会往上加呢？因为 ReentrantLock 是可重入的，同一个线程可以再次拥有这把锁就叫<strong>重入</strong>。如果这个锁被同一个线程多次获取，那么 state 就会逐渐的往上加，state 的值表示重入的次数。在释放的时候也是逐步递减，比如一开始是 4，释放一次就变成了 3，再释放一次变成了 2，这样进行的减操作，即便是减到 2 或者 1 了，都不代表这个锁是没有任何线程持有，只有当它减到 0 的时候，此时恢复到最开始的状态了，则代表现在没有任何线程持有这个锁了。所以，state 等于 0 表示锁不被任何线程所占有，代表这个锁当前是处于释放状态的，其他线程此时就可以来尝试获取了。</p><p>这就是 state 在不同类中不同含义的一个具体表现。我们举了三个例子，如果未来有新的工具要利用到 AQS，它一定也需要利用 state，为这个类表示它所需要的业务逻辑和状态。</p><p>下面我们再来看一下关于 state 修改的问题，因为 state 是会被多个线程共享的，会被并发地修改，所以所有去修改 state 的方法都必须要保证 state 是线程安全的。可是 state 本身它仅仅是被 volatile 修饰的，volatile 本身并不足以保证线程安全，所以我们就来看一下，AQS 在修改 state 的时候具体利用了什么样的设计来保证并发安全。</p><p>我们举两个和 state 相关的方法，分别是 compareAndSetState 及 setState，它们的实现已经由 AQS 去完成了，也就是说，我们直接调用这两个方法就可以对 state 进行线程安全的修改。下面就来看一下这两个方法的源码是怎么实现的。</p><ul><li>先来看一下 compareAndSetState 方法，这是一个我们非常熟悉的 CAS 操作，这个方法的代码，如下所示：</li></ul><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">protected</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">final</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">boolean</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">compareAndSetState</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> expect, </span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> update) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> unsafe.</span><span style="color:#B392F0;">compareAndSwapInt</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">, stateOffset, expect, update);</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">protected</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">final</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">boolean</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">compareAndSetState</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> expect, </span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> update) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> unsafe.</span><span style="color:#6F42C1;">compareAndSwapInt</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">this</span><span style="color:#24292E;">, stateOffset, expect, update);</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>方法里面只有一行代码，即 return unsafe.compareAndSwapInt(this, stateOffset, expect, update)，这个方法我们已经非常熟悉了，它利用了 Unsafe 里面的 CAS 操作，利用 CPU 指令的原子性保证了这个操作的原子性，与之前介绍过的原子类去保证线程安全的原理是一致的。</p><ul><li>接下来看一下 setState 方法的源码，如下所示：</li></ul><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">protected</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">final</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">setState</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> newState) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    state </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> newState;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">protected</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">final</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">setState</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> newState) {</span></span>
<span class="line"><span style="color:#24292E;">    state </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> newState;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>我们可以看到，它去修改 state 值的时候非常直截了当，直接把 state = newState，这样就直接赋值了。你可能会感到困惑，这里并没有进行任何的并发安全处理，没有加锁也没有 CAS，那如何能保证线程安全呢？</p><p>这里就要说到 volatile 的作用了，前面在学习 volatile 关键字的时候，知道了它适用于两种场景，其中一种场景就是，当<strong>对基本类型的变量进行直接赋值时</strong>，如果加了 volatile 就可以保证它的线程安全。注意，这是 volatile 的非常典型的使用场景。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * The synchronization state.</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">volatile</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> state;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * The synchronization state.</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#D73A49;">private</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">volatile</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> state;</span></span></code></pre></div><p>可以看出，state 是 int 类型的，属于基本类型，并且这里的 setState 方法内是对 state 直接赋值的，它不涉及读取之前的值，也不涉及在原来值的基础上再修改，所以我们仅仅利用 volatile 就可以保证在这种情况下的并发安全，这就是 setState 方法线程安全的原因。</p><p>下面我们对 state 进行总结，在 AQS 中有 state 这样的一个属性，是被 volatile 修饰的，会被并发修改，它代表当前工具类的某种状态，在不同的类中代表不同的含义。</p><h4 id="fifo-队列" tabindex="-1">FIFO 队列 <a class="header-anchor" href="#fifo-队列" aria-label="Permalink to &quot;FIFO 队列&quot;">​</a></h4><p>下面我们再来看看 AQS 的第二个核心部分，<strong>FIFO 队列</strong> ，即先进先出队列，这个队列最主要的作用是存储等待的线程。假设很多线程都想要同时抢锁，那么大部分的线程是抢不到的，那怎么去处理这些抢不到锁的线程呢？就得需要有一个队列来存放、管理它们。所以 AQS 的一大功能就是充当线程的&quot;<strong>排队管理器</strong>&quot;。</p><p>当多个线程去竞争同一把锁的时候，就需要用<strong>排队机制</strong>把那些没能拿到锁的线程串在一起；而当前面的线程释放锁之后，这个管理器就会挑选一个合适的线程来尝试抢刚刚释放的那把锁。所以 AQS 就一直在维护这个队列，并把等待的线程都放到队列里面。</p><p>这个队列内部是双向链表的形式，其数据结构看似简单，但是要想维护成一个线程安全的双向队列却非常复杂，因为要考虑很多的多线程并发问题。我们来看一下 AQS 作者 Doug Lea 给出的关于这个队列的一个图示：</p>`,29),c=s('<p>（此图引用自<a href="http://gee.cs.oswego.edu/dl/papers/aqs.pdf" target="_blank" rel="noreferrer">英文文档中的图</a>）</p><p>在队列中，分别用 head 和 tail 来表示头节点和尾节点，两者在初始化的时候都指向了一个空节点。头节点可以理解为&quot;当前持有锁的线程&quot;，而在头节点之后的线程就被阻塞了，它们会等待被唤醒，唤醒也是由 AQS 负责操作的。</p><h4 id="获取-释放方法" tabindex="-1">获取/释放方法 <a class="header-anchor" href="#获取-释放方法" aria-label="Permalink to &quot;获取/释放方法&quot;">​</a></h4><p>下面我们就来看一看 AQS 的第三个核心部分，获取/释放方法。在 AQS 中除了刚才讲过的 state 和队列之外，还有一部分非常重要，那就是<strong>获取和释放相关的重要方法</strong> ，这些方法是协作工具类的<strong>逻辑</strong> 的<strong>具体体现</strong> ，需要每一个协作工具类<strong>自己去实现</strong>，所以在不同的工具类中，它们的实现和含义各不相同。</p><h5 id="获取方法" tabindex="-1">获取方法 <a class="header-anchor" href="#获取方法" aria-label="Permalink to &quot;获取方法&quot;">​</a></h5><p>我们首先来看一下获取方法。获取操作通常会依赖 state 变量的值，根据 state 值不同，协作工具类也会有不同的逻辑，并且在获取的时候也经常会阻塞，下面就让我们来看几个具体的例子。</p><p>比如 ReentrantLock 中的 lock 方法就是其中一个&quot;获取方法&quot;，执行时，如果发现 state 不等于 0 且当前线程不是持有锁的线程，那么就代表这个锁已经被其他线程所持有了。这个时候，当然就获取不到锁，于是就让该线程进入阻塞状态。</p><p>再比如，Semaphore 中的 acquire 方法就是其中一个&quot;获取方法&quot;，作用是获取许可证，此时能不能获取到这个许可证也取决于 state 的值。如果 state 值是正数，那么代表还有剩余的许可证，数量足够的话，就可以成功获取；但如果 state 是 0，则代表已经没有更多的空余许可证了，此时这个线程就获取不到许可证，会进入阻塞状态，所以这里同样也是和 state 的值相关的。</p><p>再举个例子，CountDownLatch 获取方法就是 await 方法（包含重载方法），作用是&quot;等待，直到倒数结束&quot;。执行 await 的时候会判断 state 的值，如果 state 不等于 0，线程就陷入阻塞状态，直到其他线程执行倒数方法把 state 减为 0，此时就代表现在这个门闩放开了，所以之前阻塞的线程就会被唤醒。</p><p>我们总结一下，&quot;获取方法&quot;在不同的类中代表不同的含义，但往往<strong>和 state 值相关</strong> ，也经常会让线程进入<strong>阻塞</strong>状态，这也同样证明了 state 状态在 AQS 类中的重要地位。</p><h5 id="释放方法" tabindex="-1">释放方法 <a class="header-anchor" href="#释放方法" aria-label="Permalink to &quot;释放方法&quot;">​</a></h5><p>释放方法是站在获取方法的对立面的，通常和刚才的获取方法配合使用。我们刚才讲的获取方法可能会让线程阻塞，比如说获取不到锁就会让线程进入阻塞状态，但是释放方法通常是<strong>不会阻塞线程</strong>的。</p><p>比如在 Semaphore 信号量里面，释放就是 release 方法（包含重载方法），release() 方法的作用是去释放一个许可证，会让 state 加 1；而在 CountDownLatch 里面，释放就是 countDown 方法，作用是倒数一个数，让 state 减 1。所以也可以看出，在不同的实现类里面，他们对于 state 的操作是截然不同的，需要由每一个协作类根据自己的逻辑去具体实现。</p><h3 id="拓展阅读" tabindex="-1">拓展阅读 <a class="header-anchor" href="#拓展阅读" aria-label="Permalink to &quot;拓展阅读&quot;">​</a></h3><p>下面我们再进行一些拓展阅读，本课时是把 AQS 的核心结构拎出来讲解的，对于了解 AQS 内部结构有很大好处，但是并不足以包含 AQS 的全貌。如果有兴趣进一步深入理解 AQS ，可以选择学习相关的拓展资源：</p><ul><li>第一个资源是 AQS 作者本人 Doug Lea 所写的一篇论文，这篇论文自然是非常宝贵的学习资料，<a href="http://gee.cs.oswego.edu/dl/papers/aqs.pdf" target="_blank" rel="noreferrer">请点击这里查看</a>；</li><li>第二个是来自 Javadoop 博客对于 AQS 的源码分析的文章，感兴趣的话也可以阅读，<a href="https://javadoop.com/post/AbstractQueuedSynchronizer" target="_blank" rel="noreferrer">请点击这里查看</a>。</li></ul><h3 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h3><p>本课时我们介绍了 AQS 最重要的三个部分。第一个是 state，它是一个数值，在不同的类中表示不同的含义，往往代表一种状态；第二个是一个队列，该队列用来存放线程；第三个是&quot;获取/释放&quot;的相关方法，需要利用 AQS 的工具类根据自己的逻辑去实现。</p>',18);function i(d,y,E,h,u,A){const a=n("Image");return e(),o("div",null,[r,p(a,{alt:"插图1.png",src:"https://s0.lgstatic.com/i/image/M00/00/5D/Ciqc1F6pW3CAHYjKAACSEPDrUoc078.png"}),c])}const _=t(l,[["render",i]]);export{S as __pageData,_ as default};
