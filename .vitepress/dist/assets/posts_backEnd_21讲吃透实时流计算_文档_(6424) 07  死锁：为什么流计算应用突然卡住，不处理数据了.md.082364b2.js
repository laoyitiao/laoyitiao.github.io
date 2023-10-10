import{_ as l,j as t,o as e,g as c,k as o,h as a,Q as p,s}from"./chunks/framework.cfb14fe0.js";const S=JSON.parse('{"title":"07死锁：为什么流计算应用突然卡住，不处理数据了","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/21讲吃透实时流计算_文档/(6424) 07  死锁：为什么流计算应用突然卡住，不处理数据了.md","filePath":"posts/backEnd/21讲吃透实时流计算_文档/(6424) 07  死锁：为什么流计算应用突然卡住，不处理数据了.md","lastUpdated":1696682708000}'),r={name:"posts/backEnd/21讲吃透实时流计算_文档/(6424) 07  死锁：为什么流计算应用突然卡住，不处理数据了.md"},E=p('<h1 id="_07死锁-为什么流计算应用突然卡住-不处理数据了" tabindex="-1">07死锁：为什么流计算应用突然卡住，不处理数据了 <a class="header-anchor" href="#_07死锁-为什么流计算应用突然卡住-不处理数据了" aria-label="Permalink to &quot;07死锁：为什么流计算应用突然卡住，不处理数据了&quot;">​</a></h1><p>今天，我们来讨论一个非常有趣的话题，也就是流计算系统中的死锁问题。</p><p>在第 06 课时，我们讲解了 CompletableFuture 这个异步编程类的工作原理，并用它实现了一个流计算应用。为了流计算应用不会出现 OOM 问题，我们还专门使用 BackPressureExecutor 执行器，实现了反向压力的功能。</p><p>另外，我们在 05 课时已经讲过，描述一个流计算过程使用的是 DAG，也就是&quot;有向无环图&quot;。对于&quot;有向&quot;，我们知道这是代表着流数据的流向。而&quot;无环&quot;又是指什么呢？为什么一定要是&quot;无环&quot;？</p><p>其实之所以要强调&quot;无环&quot;，是因为在流计算系统中，当&quot;有环&quot;和&quot;反向压力&quot;一起出现时，流计算系统将会出现&quot;死锁&quot;问题。而程序一旦出现&quot;死锁&quot;，那除非人为干预，否则程序将一直停止执行，也就是我们常说的&quot;卡死&quot;。这在生产环境是绝对不能容忍的。</p><p>所以，我们今天将重点分析流计算系统中的&quot;死锁&quot;问题。</p><h3 id="为什么流计算过程不能有环" tabindex="-1">为什么流计算过程不能有环 <a class="header-anchor" href="#为什么流计算过程不能有环" aria-label="Permalink to &quot;为什么流计算过程不能有环&quot;">​</a></h3><p>我们从一个简单的流计算过程开始，这个流计算过程的 DAG 如下图 1 所示。</p>',8),y=p(`<p>DAG 描述了一个最简单的流计算过程，步骤 A 的输出给步骤 B 进行处理。</p><p>这个流计算过程用 CompletableFuture 实现非常简单。如下所示（<a href="https://github.com/alain898/realtime_stream_computing_course/blob/main/course07/src/main/java/com/alain898/course/realtimestreaming/course07/deadlock/DeadLockDemo.java" target="_blank" rel="noreferrer">请参考完整代码</a>）：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">ExecutorService AExecutor </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">BackPressureExecutor</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#9ECBFF;">&quot;AExecutor&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">10</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">ExecutorService BExecutor </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">BackPressureExecutor</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#9ECBFF;">&quot;BExecutor&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">10</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">AtomicLong itemCounter </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">AtomicLong</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">0L</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">String </span><span style="color:#B392F0;">stepA</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    String item </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> String.</span><span style="color:#B392F0;">format</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;item%d&quot;</span><span style="color:#E1E4E8;">, itemCounter.</span><span style="color:#B392F0;">getAndDecrement</span><span style="color:#E1E4E8;">());</span></span>
<span class="line"><span style="color:#E1E4E8;">    logger.</span><span style="color:#B392F0;">info</span><span style="color:#E1E4E8;">(String.</span><span style="color:#B392F0;">format</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;stepA item[%s]&quot;</span><span style="color:#E1E4E8;">, item));</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> item;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">stepB</span><span style="color:#E1E4E8;">(String item) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    logger.</span><span style="color:#B392F0;">info</span><span style="color:#E1E4E8;">(String.</span><span style="color:#B392F0;">format</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;stepB item[%s]&quot;</span><span style="color:#E1E4E8;">, item));</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">sleep</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">10</span><span style="color:#E1E4E8;">); </span><span style="color:#6A737D;">// 睡眠一会，故意让 stepB 处理得比 stepA 慢</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">demo1</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">while</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">!</span><span style="color:#E1E4E8;">Thread.</span><span style="color:#B392F0;">currentThread</span><span style="color:#E1E4E8;">().</span><span style="color:#B392F0;">isInterrupted</span><span style="color:#E1E4E8;">()) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        CompletableFuture</span></span>
<span class="line"><span style="color:#E1E4E8;">                .</span><span style="color:#B392F0;">supplyAsync</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">this</span><span style="color:#F97583;">::</span><span style="color:#E1E4E8;">stepA, </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.AExecutor)</span></span>
<span class="line"><span style="color:#E1E4E8;">                .</span><span style="color:#B392F0;">thenAcceptAsync</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">this</span><span style="color:#F97583;">::</span><span style="color:#E1E4E8;">stepB, </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.BExecutor);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">ExecutorService AExecutor </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">BackPressureExecutor</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#032F62;">&quot;AExecutor&quot;</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">10</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">ExecutorService BExecutor </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">BackPressureExecutor</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#032F62;">&quot;BExecutor&quot;</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">10</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">AtomicLong itemCounter </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">AtomicLong</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">0L</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">String </span><span style="color:#6F42C1;">stepA</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    String item </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> String.</span><span style="color:#6F42C1;">format</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;item%d&quot;</span><span style="color:#24292E;">, itemCounter.</span><span style="color:#6F42C1;">getAndDecrement</span><span style="color:#24292E;">());</span></span>
<span class="line"><span style="color:#24292E;">    logger.</span><span style="color:#6F42C1;">info</span><span style="color:#24292E;">(String.</span><span style="color:#6F42C1;">format</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;stepA item[%s]&quot;</span><span style="color:#24292E;">, item));</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> item;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">stepB</span><span style="color:#24292E;">(String item) {</span></span>
<span class="line"><span style="color:#24292E;">    logger.</span><span style="color:#6F42C1;">info</span><span style="color:#24292E;">(String.</span><span style="color:#6F42C1;">format</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;stepB item[%s]&quot;</span><span style="color:#24292E;">, item));</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">sleep</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">10</span><span style="color:#24292E;">); </span><span style="color:#6A737D;">// 睡眠一会，故意让 stepB 处理得比 stepA 慢</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">demo1</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">while</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">!</span><span style="color:#24292E;">Thread.</span><span style="color:#6F42C1;">currentThread</span><span style="color:#24292E;">().</span><span style="color:#6F42C1;">isInterrupted</span><span style="color:#24292E;">()) {</span></span>
<span class="line"><span style="color:#24292E;">        CompletableFuture</span></span>
<span class="line"><span style="color:#24292E;">                .</span><span style="color:#6F42C1;">supplyAsync</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">this</span><span style="color:#D73A49;">::</span><span style="color:#24292E;">stepA, </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.AExecutor)</span></span>
<span class="line"><span style="color:#24292E;">                .</span><span style="color:#6F42C1;">thenAcceptAsync</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">this</span><span style="color:#D73A49;">::</span><span style="color:#24292E;">stepB, </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.BExecutor);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>上面的代码中，步骤 A 和步骤 B 使用了两个不同的执行器，即 AExecutor 和 BExecutor 。并且为了避免 OOM 问题，我们使用的执行器都是带反向压力功能的 BackPressureExecutor。</p><p>上面的程序运行起来没有任何问题。即便我们明确通过 sleep 函数，让 stepB 的处理速度只有 stepA 的十分之一，上面的程序都能够长时间的稳定运行（stepA 和 stepB 会不断打印出各自的处理结果，并且绝不会出现 OOM 问题）。</p><p>到此为止，一切都非常符合我们的预期。</p><p>但是现在，我们需要对图 1 的 DAG 稍微做点变化，让 B 在处理完后，将其结果重新输入给自己再处理一次。这种处理逻辑，在实际开发中也会经常遇到，比如 B 在处理失败时，就将处理失败的任务，重新添加到自己的输入队列，从而实现失败重试的功能。</p><p>修改后的 DAG 如下图所示。</p>`,8),i=p(`<p>很明显，上面的 DAG 在步骤 B 上形成了一个&quot;环&quot;，因为有一条从 B 开始的有向线段，重新指向了 B 自己。相应的，前面的代码也需要稍微做点调整，改成下面的方式：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">demo1</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">while</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">!</span><span style="color:#E1E4E8;">Thread.</span><span style="color:#B392F0;">currentThread</span><span style="color:#E1E4E8;">().</span><span style="color:#B392F0;">isInterrupted</span><span style="color:#E1E4E8;">()) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        CompletableFuture</span></span>
<span class="line"><span style="color:#E1E4E8;">                .</span><span style="color:#B392F0;">supplyAsync</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">this</span><span style="color:#F97583;">::</span><span style="color:#E1E4E8;">stepA, </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.AExecutor)</span></span>
<span class="line"><span style="color:#E1E4E8;">                .</span><span style="color:#B392F0;">thenApplyAsync</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">this</span><span style="color:#F97583;">::</span><span style="color:#E1E4E8;">stepB, </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.BExecutor)</span></span>
<span class="line"><span style="color:#E1E4E8;">                .</span><span style="color:#B392F0;">thenApplyAsync</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">this</span><span style="color:#F97583;">::</span><span style="color:#E1E4E8;">stepB, </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.BExecutor);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">demo1</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">while</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">!</span><span style="color:#24292E;">Thread.</span><span style="color:#6F42C1;">currentThread</span><span style="color:#24292E;">().</span><span style="color:#6F42C1;">isInterrupted</span><span style="color:#24292E;">()) {</span></span>
<span class="line"><span style="color:#24292E;">        CompletableFuture</span></span>
<span class="line"><span style="color:#24292E;">                .</span><span style="color:#6F42C1;">supplyAsync</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">this</span><span style="color:#D73A49;">::</span><span style="color:#24292E;">stepA, </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.AExecutor)</span></span>
<span class="line"><span style="color:#24292E;">                .</span><span style="color:#6F42C1;">thenApplyAsync</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">this</span><span style="color:#D73A49;">::</span><span style="color:#24292E;">stepB, </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.BExecutor)</span></span>
<span class="line"><span style="color:#24292E;">                .</span><span style="color:#6F42C1;">thenApplyAsync</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">this</span><span style="color:#D73A49;">::</span><span style="color:#24292E;">stepB, </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.BExecutor);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>上面的代码中，我们增加了一次 thenApplyAsync 调用，用于将 stepB 的输出重新作为其输入。需要注意的是，由于第二次 stepB 调用后没有再设置后续步骤，所以，虽然 DAG 上&quot;有环&quot;，但 stepB 并不会形成死循环。</p><p>上面这段代码，初看起来并没什么问题，毕竟就是简单地新增了一个&quot;重试&quot;的效果嘛。但是，如果你实际运行上面这段代码就会发现，只需要运行不到 1 秒钟，上面这段程序就会&quot;卡&quot;住，之后控制台会一动不动，没有一条日志打印出来。</p><p>这是怎么回事呢？事实上这就是因为程序已经&quot;死锁&quot;了！</p><h3 id="流计算过程死锁分析" tabindex="-1">流计算过程死锁分析 <a class="header-anchor" href="#流计算过程死锁分析" aria-label="Permalink to &quot;流计算过程死锁分析&quot;">​</a></h3><p>说到&quot;死锁&quot;，你一定会想到&quot;锁&quot;的使用。一般情况下之所以会出现&quot;死锁&quot;，主要是因为我们使用锁的方式不对，比如使用了不可重入锁，或者使用多个锁时出现了交叉申请锁的情况。这种情况下出现的&quot;死锁&quot;问题，我们确确实实看到了&quot;锁&quot;的存在。</p><p>但当我们在使用流计算编程时，你会发现，&quot;流&quot;的编程方式已经非常自然地避免了&quot;锁&quot;的使用，也就是说我们并不会在&quot;流&quot;处理的过程中用到&quot;锁&quot;。这是因为，当使用&quot;流&quot;时，被处理的对象依次从上游流到下游。当对象在流到某个步骤时，它是被这个步骤的线程唯一持有，因此不存在对象竞争的问题。</p><p>但这是不是就说流计算过程中不会出现&quot;死锁&quot;问题呢？不是的。最直接的例子就是前面的代码，我们根本就没有用到&quot;锁&quot;，但它还是出现了&quot;死锁&quot;的问题。</p><p>所以，为什么会出现&quot;死锁&quot;呢？这里就需要我们仔细分析下了。下面的图 3 描绘了图 2 中的流计算过程之所以会发生死锁的原因。</p>`,10),u=s("p",null,'在图 3 中，整个流计算过程有 A 和 B 这两个步骤，并且具备"反向压力"能力。这时候，如果 A 的输出已经将 B 的输入队列占满，而 B 的输出又需要重新流向 B 的输入队列，那么由于"反向压力"的存在，B 会一直等到其输入队列有空间可用。而 B 的输入队列又因为 B 在等待，永远也不会有空间被释放，所以 B 会一直等待下去。同时，A 也会因为 B 的输入队列已满，由于反向压力的存在，它也只能不停地等待下去。',-1),A=s("p",null,'如此一来，整个流计算过程就形成了一个死锁，A 和 B 两个步骤都会永远等待下去，这样就出现了我们前边看到的程序"卡"住现象。',-1),_=s("h3",{id:"形成-环-的原因",tabindex:"-1"},[a('形成"环"的原因 '),s("a",{class:"header-anchor",href:"#形成-环-的原因","aria-label":'Permalink to "形成"环"的原因"'},"​")],-1),F=s("p",null,'在图 2 所示的 DAG 中，我们是因为需要让 stepB 失败重试，所以"随手"就让 stepB 将其输出重新作为输入重新执行一次。这姑且算是一种比较特殊的需求吧。',-1),h=s("p",null,'但在实际开发过程中，我们的业务逻辑明显是可以分为多个依次执行的步骤，用 DAG 画出来时，也是"无环"的。但在写代码时，有时候一不小心，也会无意识地将一个本来无环的 DAG，实现成了有环的过程。下面图 4 就说明了这种情况。',-1),m=p('<p>在图 4 中，业务逻辑本来是 A 到 B 到 C 这样的&quot;无环&quot;图，<strong>结果由于我们给这三个不同的步骤，分配了同一个执行器 executor，实际实现的流计算过程就成了一个&quot;有环&quot;的过程</strong>。</p><p>在这个&quot;有环&quot;的实现中，只要任意一个步骤的处理速度比其他步骤慢，就会造成执行器的输入队列占满。一旦输入队列占满，由于反向压力的存在，各个步骤的输出就不能再输入到队列中。最终，所有执行步骤将会阻塞，也就形成了死锁，整个系统也被&quot;卡&quot;死。</p><h3 id="如何避免死锁" tabindex="-1">如何避免死锁 <a class="header-anchor" href="#如何避免死锁" aria-label="Permalink to &quot;如何避免死锁&quot;">​</a></h3><p>所以，我们在流计算过程中，应该怎样避免死锁呢？其实很简单，有三种方法。</p><p>一是<strong>不使用反向压力功能</strong>。只需要我们不使用反向压力功能，即使业务形成&quot;环&quot;了，也不会死锁，因为每个步骤只需要将其输出放到输入队列中，不会发生阻塞等待，所以就不会死锁了。但很显然，这种方法禁止使用。毕竟，没有反向压力功能，就又回到 OOM 问题了，这是万万不可的！</p><p>二是<strong>避免业务流程形成&quot;环&quot;</strong>。这个方法最主要的作用，是指导我们在设计业务流程时，不要将业务流程设计成&quot;有环&quot;的了。否则如果系统有反向压力功能的话，容易出现类似于图 3 的死锁问题。</p><p>三是<strong>千万不要让多个步骤使用相同的队列或执行器</strong>。这个是最容易忽略的问题，特别是一些对异步编程和流计算理解不深的开发人员，最容易给不同的业务步骤分配相同的队列或执行器，在不知不觉中就埋下了死锁的隐患。</p><p>总的来说，在流计算过程中，反向压力功能是必不可少的，<strong>为了避免&quot;死锁&quot;的问题，流计算过程中的任何一个步骤，它的输出绝不能再重新流回作为它的输入</strong>。</p><p>只需要注意以上几点，你就可以放心大胆地使用&quot;流&quot;式编程了，而且不用考虑&quot;锁&quot;的问题。由于没有了竞态问题，这既可以简化你编程的过程，也可以给程序带来显著的性能提升。</p><h3 id="小结" tabindex="-1">小结 <a class="header-anchor" href="#小结" aria-label="Permalink to &quot;小结&quot;">​</a></h3><p>今天，我们分析了流计算过程中的死锁问题。这是除 OOM 问题外，另一个需要尤其注意的问题。</p><p>我们之前说过，&quot;流&quot;的本质是&quot;异步&quot;的，并且你可以看到，我们今天实现描述流计算过程的 DAG 时，用的就是 CompletableFuture 这个异步编程框架。所以，其实流计算的这种死锁问题，在其他&quot;异步&quot;场景下也会出现。</p><p>如果你需要使用其他编程语言或其他异步编程框架（比如 Node.js 中的 async 和 await）进行程序开发的话，一定要注意以下问题：</p><ul><li><p>这个异步框架支持反向压力？没有不支持的话，是如何处理 OOM 问题的？</p></li><li><p>这个异步框架会发生死锁吗？如果会死锁的话，是如何处理死锁问题的？</p></li></ul><p>那么，你在以往的异步编程过程中，有没有遇到过死锁的问题呢？你可以将你遇到的问题，写在留言区！</p><blockquote><p>本课时精华：</p></blockquote>',16),q=s("p",null,[s("a",{href:"https://github.com/alain898/realtime_stream_computing_course",target:"_blank",rel:"noreferrer"},"点击此链接查看本课程所有课时的源码")],-1),B=s("hr",null,null,-1),d=s("p",null,"[",-1),C=s("p",null,[a("]("),s("a",{href:"https://kaiwu.lagou.com/data_enhancement.html?utm_source=lagouedu&utm_medium=zhuanlan&utm_campaign=%E5%A4%A7%E6%95%B0%E6%8D%AE%E5%BC%80%E5%8F%91%E9%AB%98%E8%96%AA%E8%AE%AD%E7%BB%83%E8%90%A5#/index",target:"_blank",rel:"noreferrer"},"https://kaiwu.lagou.com/data_enhancement.html?utm_source=lagouedu&utm_medium=zhuanlan&utm_campaign=大数据开发高薪训练营#/index"),a(")"),s("br"),s("a",{href:"https://kaiwu.lagou.com/data_enhancement.html?utm_source=lagouedu&utm_medium=zhuanlan&utm_campaign=%E5%A4%A7%E6%95%B0%E6%8D%AE%E5%BC%80%E5%8F%91%E9%AB%98%E8%96%AA%E8%AE%AD%E7%BB%83%E8%90%A5#/index",target:"_blank",rel:"noreferrer"},"PB 级企业大数据项目实战 + 拉勾硬核内推，5 个月全面掌握大数据核心技能。点击链接，全面赋能！")],-1);function g(D,x,b,k,f,T){const n=t("Image");return e(),c("div",null,[E,o(n,{alt:"image (2).png",src:"https://s0.lgstatic.com/i/image6/M00/03/B1/Cgp9HWAfi2KATSaEAAE2mmZy--s849.png"}),a(),y,o(n,{alt:"image (3).png",src:"https://s0.lgstatic.com/i/image6/M00/03/AF/CioPOWAfi2yAJoUSAAEjy8tdsAA410.png"}),a(),i,o(n,{alt:"image (4).png",src:"https://s0.lgstatic.com/i/image6/M00/03/AF/CioPOWAfi3WAaLyaAAH5vr_30vk488.png"}),a(),u,A,_,F,h,o(n,{alt:"image (5).png",src:"https://s0.lgstatic.com/i/image6/M00/03/AF/CioPOWAfi32AX5a1AAL9Aqk2D9Y454.png"}),a(),m,o(n,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image2/M01/0C/91/Cip5yGAY-4CAZ6B8AAiqciZrqLg086.png"}),a(),q,B,d,o(n,{alt:"image (3).png",src:"https://s0.lgstatic.com/i/image2/M01/0C/98/CgpVE2AZCKKAa8TbAAUCrlmIuEw611.png"}),a(),C])}const P=l(r,[["render",g]]);export{S as __pageData,P as default};
