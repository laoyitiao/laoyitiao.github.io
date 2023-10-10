import{_ as o,j as e,o as t,g as c,k as a,h as l,Q as p,s}from"./chunks/framework.cfb14fe0.js";const C=JSON.parse('{"title":"第63讲：单例模式的双重检查锁模式为什么必须加volatile？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/096-Java 并发编程文档/(301) 第63讲：单例模式的双重检查锁模式为什么必须加 volatile？.md","filePath":"posts/backEnd/096-Java 并发编程文档/(301) 第63讲：单例模式的双重检查锁模式为什么必须加 volatile？.md","lastUpdated":1696682708000}'),r={name:"posts/backEnd/096-Java 并发编程文档/(301) 第63讲：单例模式的双重检查锁模式为什么必须加 volatile？.md"},i=p(`<h1 id="第63讲-单例模式的双重检查锁模式为什么必须加volatile" tabindex="-1">第63讲：单例模式的双重检查锁模式为什么必须加volatile？ <a class="header-anchor" href="#第63讲-单例模式的双重检查锁模式为什么必须加volatile" aria-label="Permalink to &quot;第63讲：单例模式的双重检查锁模式为什么必须加volatile？&quot;">​</a></h1><p>本课时我们主要讲解单例模式的双重检查锁模式为什么必须加 volatile？</p><h3 id="什么是单例模式" tabindex="-1">什么是单例模式 <a class="header-anchor" href="#什么是单例模式" aria-label="Permalink to &quot;什么是单例模式&quot;">​</a></h3><p>单例模式指的是，保证一个类只有一个实例，并且提供一个可以全局访问的入口。</p><h4 id="为什么需要使用单例模式" tabindex="-1">为什么需要使用单例模式 <a class="header-anchor" href="#为什么需要使用单例模式" aria-label="Permalink to &quot;为什么需要使用单例模式&quot;">​</a></h4><p>那么我们为什么需要单例呢？其中**一个理由，那就是为了节省内存、节省计算。**因为在很多情况下，我们只需要一个实例就够了，如果出现更多的实例，反而纯属浪费。</p><p>下面我们举一个例子来说明这个情况，以一个初始化比较耗时的类来说，代码如下所示：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ExpensiveResource</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ExpensiveResource</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        field1 </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">// 查询数据库</span></span>
<span class="line"><span style="color:#E1E4E8;">        field2 </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">// 然后对查到的数据做大量计算</span></span>
<span class="line"><span style="color:#E1E4E8;">        field3 </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">// 加密、压缩等耗时操作</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ExpensiveResource</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ExpensiveResource</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">        field1 </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">// 查询数据库</span></span>
<span class="line"><span style="color:#24292E;">        field2 </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">// 然后对查到的数据做大量计算</span></span>
<span class="line"><span style="color:#24292E;">        field3 </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">// 加密、压缩等耗时操作</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>这个类在构造的时候，需要查询数据库并对查到的数据做大量计算，所以在第一次构造时，我们花了很多时间来初始化这个对象。但是假设数据库里的数据是不变的，我们就可以把这个对象保存在内存中，那么以后开发的时候就可以直接用这同一个实例了，不需要再次构建新实例。如果每次都重新生成新的实例，则会造成更多的浪费，实在没有必要。</p><p>接下来看看需要单例的第二个理由，那就是为了保证结果的正确。**比如我们需要一个全局的计数器，用来统计人数，如果有多个实例，反而会造成混乱。</p><p>另外呢，就是为了方便管理。**很多工具类，我们只需要一个实例，那么我们通过统一的入口，比如通过 getInstance 方法去获取这个单例是很方便的，太多实例不但没有帮助，反而会让人眼花缭乱。</p><p>一般单例模式的类结构如下图所示：有一个私有的 Singleton 类型的 singleton 对象；同时构造方法也是私有的，为了防止他人调用构造函数来生成实例；另外还会有一个 public 的 getInstance 方法，可通过这个方法获取到单例。</p>`,12),E=p(`<h4 id="双重检查锁模式的写法" tabindex="-1">双重检查锁模式的写法 <a class="header-anchor" href="#双重检查锁模式的写法" aria-label="Permalink to &quot;双重检查锁模式的写法&quot;">​</a></h4><p>单例模式有多种写法，我们重点介绍一下和 volatile 强相关的双重检查锁模式的写法，代码如下所示：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Singleton</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">volatile</span><span style="color:#E1E4E8;"> Singleton singleton;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Singleton</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> Singleton </span><span style="color:#B392F0;">getInstance</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (singleton </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">synchronized</span><span style="color:#E1E4E8;"> (Singleton.class) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (singleton </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                    singleton </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Singleton</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">                }</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> singleton;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Singleton</span><span style="color:#24292E;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">volatile</span><span style="color:#24292E;"> Singleton singleton;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Singleton</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> Singleton </span><span style="color:#6F42C1;">getInstance</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (singleton </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">synchronized</span><span style="color:#24292E;"> (Singleton.class) {</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (singleton </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">                    singleton </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Singleton</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">                }</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> singleton;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>在这里我将重点讲解 getInstance 方法，方法中首先进行了一次 if (singleton == null) 的检查，然后是 synchronized 同步块，然后又是一次 if (singleton == null) 的检查，最后是 singleton = new Singleton() 来生成实例。</p><p>我们进行了两次 if (singleton == null) 检查，这就是&quot;双重检查锁&quot;这个名字的由来。这种写法是可以保证线程安全的，假设有两个线程同时到达 synchronized 语句块，那么实例化代码只会由其中先抢到锁的线程执行一次，而后抢到锁的线程会在第二个 if 判断中发现 singleton 不为 null，所以跳过创建实例的语句。再后面的其他线程再来调用 getInstance 方法时，只需判断第一次的 if (singleton == null) ，然后会跳过整个 if 块，直接 return 实例化后的对象。</p><p>这种写法的优点是不仅线程安全，而且延迟加载、效率也更高。</p><p><strong>讲到这里就涉及到了一个常见的问题，面试官可能会问你，&quot;为什么要 double-check？去掉任何一次的 check 行不行？&quot;</strong></p><p>我们先来看第二次的 check，这时你需要考虑这样一种情况，有两个线程同时调用 getInstance 方法，由于 singleton 是空的 ，因此两个线程都可以通过第一重的 if 判断；然后由于锁机制的存在，会有一个线程先进入同步语句，并进入第二重 if 判断 ，而另外的一个线程就会在外面等待。</p><p>不过，当第一个线程执行完 new Singleton() 语句后，就会退出 synchronized 保护的区域，这时如果没有第二重 if (singleton == null) 判断的话，那么第二个线程也会创建一个实例，此时就破坏了单例，这肯定是不行的。</p><p>而对于第一个 check 而言，如果去掉它，那么所有线程都会串行执行，效率低下，所以两个 check 都是需要保留的。</p><h4 id="在双重检查锁模式中为什么需要使用-volatile-关键字" tabindex="-1">在双重检查锁模式中为什么需要使用 volatile 关键字 <a class="header-anchor" href="#在双重检查锁模式中为什么需要使用-volatile-关键字" aria-label="Permalink to &quot;在双重检查锁模式中为什么需要使用 volatile 关键字&quot;">​</a></h4><p>相信细心的你可能看到了，我们在双重检查锁模式中，给 singleton 这个对象加了 volatile 关键字，那**为什么要用 volatile 呢？**主要就在于 singleton = new Singleton() ，它并非是一个原子操作，事实上，在 JVM 中上述语句至少做了以下这 3 件事：</p>`,12),y=s("ul",null,[s("li",null,[s("p",null,"第一步是给 singleton 分配内存空间；")]),s("li",null,[s("p",null,"然后第二步开始调用 Singleton 的构造函数等，来初始化 singleton；")]),s("li",null,[s("p",null,"最后第三步，将 singleton 对象指向分配的内存空间（执行完这步 singleton 就不是 null 了）。")])],-1),g=s("p",null,"这里需要留意一下 1-2-3 的顺序，因为存在指令重排序的优化，也就是说第2 步和第 3 步的顺序是不能保证的，最终的执行顺序，可能是 1-2-3，也有可能是 1-3-2。",-1),h=s("p",null,"如果是 1-3-2，那么在第 3 步执行完以后，singleton 就不是 null 了，可是这时第 2 步并没有执行，singleton 对象未完成初始化，它的属性的值可能不是我们所预期的值。假设此时线程 2 进入 getInstance 方法，由于 singleton 已经不是 null 了，所以会通过第一重检查并直接返回，但其实这时的 singleton 并没有完成初始化，所以使用这个实例的时候会报错，详细流程如下图所示：",-1),_=p('<p>线程 1 首先执行新建实例的第一步，也就是分配单例对象的内存空间，由于线程 1 被重排序，所以执行了新建实例的第三步，也就是把 singleton 指向之前分配出来的内存地址，在这第三步执行之后，singleton 对象便不再是 null。</p><p>这时线程 2 进入 getInstance 方法，判断 singleton 对象不是 null，紧接着线程 2 就返回 singleton 对象并使用，由于没有初始化，所以报错了。最后，线程 1 &quot;姗姗来迟&quot;，才开始执行新建实例的第二步------初始化对象，可是这时的初始化已经晚了，因为前面已经报错了。</p><p>使用了 volatile 之后，相当于是表明了该字段的更新可能是在其他线程中发生的，因此应确保在读取另一个线程写入的值时，可以顺利执行接下来所需的操作。在 JDK 5 以及后续版本所使用的 JMM 中，在使用了 volatile 后，会一定程度禁止相关语句的重排序，从而避免了上述由于重排序所导致的读取到不完整对象的问题的发生。</p><p>到这里关于&quot;为什么要用 volatile&quot; 的问题就讲完了，使用 volatile 的意义主要在于它可以防止避免拿到没完成初始化的对象，从而保证了线程安全。</p><h3 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h3><p>在本课时中我们首先介绍了什么是单例模式，以及为什么需要使用单例模式，然后介绍了双重检查锁模式这种写法，以及面对这种写法时为什么需要 double-check，为什么需要用 volatile？最主要的是为了保证线程安全。</p><blockquote><p>参考：</p><p>小宝马的爸爸 - 梦想的家园《单例模式（Singleton）》：<a href="https://www.cnblogs.com/BoyXiao/archive/2010/05/07/1729376.html" target="_blank" rel="noreferrer">https://www.cnblogs.com/BoyXiao/archive/2010/05/07/1729376.html</a></p><p>Jark&#39;s Blog《如何正确地写出单例模式》：<a href="http://wuchong.me/blog/2014/08/28/how-to-correctly-write-singleton-pattern/" target="_blank" rel="noreferrer">http://wuchong.me/blog/2014/08/28/how-to-correctly-write-singleton-pattern/</a></p><p>Hollis Chuang《为什么我墙裂建议大家使用枚举来实现单例》：<a href="https://www.hollischuang.com/archives/2498" target="_blank" rel="noreferrer">https://www.hollischuang.com/archives/2498</a></p><p>Hollis Chuang《深度分析Java的枚举类型----枚举的线程安全性及序列化问题》：<a href="https://www.hollischuang.com/archives/197" target="_blank" rel="noreferrer">https://www.hollischuang.com/archives/197</a></p></blockquote>',7);function u(d,v,A,f,b,F){const n=e("Image");return t(),c("div",null,[i,a(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/05/B6/Ciqah16BpV-AG9iPAAAf42nvy5s798.png"}),l(),E,a(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/7E/CC/Cgq2xl6BpWCAMBaVAACFIdffjfM852.png"}),l(),y,g,h,a(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/7E/CC/Cgq2xl6BpWCAB6QQAAEKacFd0CE542.png"}),l(),_])}const k=o(r,[["render",u]]);export{C as __pageData,k as default};
