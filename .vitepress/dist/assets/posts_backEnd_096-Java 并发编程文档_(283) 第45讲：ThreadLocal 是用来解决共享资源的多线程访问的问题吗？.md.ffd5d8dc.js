import{_ as s,o as a,g as n,Q as l}from"./chunks/framework.cfb14fe0.js";const h=JSON.parse('{"title":"第45讲：ThreadLocal是用来解决共享资源的多线程访问的问题吗？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/096-Java 并发编程文档/(283) 第45讲：ThreadLocal 是用来解决共享资源的多线程访问的问题吗？.md","filePath":"posts/backEnd/096-Java 并发编程文档/(283) 第45讲：ThreadLocal 是用来解决共享资源的多线程访问的问题吗？.md","lastUpdated":1696682708000}'),p={name:"posts/backEnd/096-Java 并发编程文档/(283) 第45讲：ThreadLocal 是用来解决共享资源的多线程访问的问题吗？.md"},o=l(`<h1 id="第45讲-threadlocal是用来解决共享资源的多线程访问的问题吗" tabindex="-1">第45讲：ThreadLocal是用来解决共享资源的多线程访问的问题吗？ <a class="header-anchor" href="#第45讲-threadlocal是用来解决共享资源的多线程访问的问题吗" aria-label="Permalink to &quot;第45讲：ThreadLocal是用来解决共享资源的多线程访问的问题吗？&quot;">​</a></h1><p>本课时主要讲解一个问题：ThreadLocal 是不是用来解决共享资源的多线程访问的。</p><p>这是一个常见的面试问题，如果被问到了 ThreadLocal，则有可能在你介绍完它的作用、注意点等内容之后，再问你：ThreadLocal 是不是用来解决共享资源的多线程访问的呢？假如遇到了这样的问题，其思路一定要清晰。这里我给出一个参考答案。</p><h3 id="面试时被问到应如何回答" tabindex="-1">面试时被问到应如何回答 <a class="header-anchor" href="#面试时被问到应如何回答" aria-label="Permalink to &quot;面试时被问到应如何回答&quot;">​</a></h3><p>这道题的答案很明确------不是，ThreadLocal 并不是用来解决共享资源问题的。虽然 ThreadLocal 确实可以用于解决多线程情况下的线程安全问题，但其资源并不是共享的，而是每个线程独享的。所以这道题其实是有一定陷阱成分在内的。</p><p>ThreadLocal 解决线程安全问题的时候，相比于使用&quot;锁&quot;而言，换了一个思路，把资源变成了各线程独享的资源，非常巧妙地避免了同步操作。具体而言，它可以在 initialValue 中 new 出自己线程独享的资源，而多个线程之间，它们所访问的对象本身是不共享的，自然就不存在任何并发问题。这是 ThreadLocal 解决并发问题的最主要思路。</p><p>如果我们把放到 ThreadLocal 中的资源用 static 修饰，让它变成一个共享资源的话，那么即便使用了 ThreadLocal，同样也会有线程安全问题。比如我们对第 44 讲中的例子进行改造，如果我们在 SimpleDateFormat 之前加上一个 static 关键字来修饰，并且把这个静态对象放到 ThreadLocal 中去存储的话，代码如下所示：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ThreadLocalStatic</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> ExecutorService threadPool </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> Executors.</span><span style="color:#B392F0;">newFixedThreadPool</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">16</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> SimpleDateFormat dateFormat </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">SimpleDateFormat</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;mm:ss&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">String</span><span style="color:#E1E4E8;">[] </span><span style="color:#FFAB70;">args</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">throws</span><span style="color:#E1E4E8;"> InterruptedException {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> i </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">; i </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1000</span><span style="color:#E1E4E8;">; i</span><span style="color:#F97583;">++</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> finalI </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> i;</span></span>
<span class="line"><span style="color:#E1E4E8;">            threadPool.</span><span style="color:#B392F0;">submit</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Runnable</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">                @</span><span style="color:#F97583;">Override</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">run</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">                    String date </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ThreadLocalStatic</span><span style="color:#E1E4E8;">().</span><span style="color:#B392F0;">date</span><span style="color:#E1E4E8;">(finalI);</span></span>
<span class="line"><span style="color:#E1E4E8;">                    System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(date);</span></span>
<span class="line"><span style="color:#E1E4E8;">                }</span></span>
<span class="line"><span style="color:#E1E4E8;">            });</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">        threadPool.</span><span style="color:#B392F0;">shutdown</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> String </span><span style="color:#B392F0;">date</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> </span><span style="color:#FFAB70;">seconds</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        Date date </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Date</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">1000</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;"> seconds);</span></span>
<span class="line"><span style="color:#E1E4E8;">        SimpleDateFormat dateFormat </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> ThreadSafeFormatter.dateFormatThreadLocal.</span><span style="color:#B392F0;">get</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> dateFormat.</span><span style="color:#B392F0;">format</span><span style="color:#E1E4E8;">(date);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ThreadSafeFormatter</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> ThreadLocal&lt;</span><span style="color:#F97583;">SimpleDateFormat</span><span style="color:#E1E4E8;">&gt; dateFormatThreadLocal </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> ThreadLocal&lt;</span><span style="color:#F97583;">SimpleDateFormat</span><span style="color:#E1E4E8;">&gt;() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        @</span><span style="color:#F97583;">Override</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">protected</span><span style="color:#E1E4E8;"> SimpleDateFormat </span><span style="color:#B392F0;">initialValue</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> ThreadLocalStatic.dateFormat;</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ThreadLocalStatic</span><span style="color:#24292E;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> ExecutorService threadPool </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> Executors.</span><span style="color:#6F42C1;">newFixedThreadPool</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">16</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> SimpleDateFormat dateFormat </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">SimpleDateFormat</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;mm:ss&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">String</span><span style="color:#24292E;">[] </span><span style="color:#E36209;">args</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">throws</span><span style="color:#24292E;"> InterruptedException {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> i </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">; i </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1000</span><span style="color:#24292E;">; i</span><span style="color:#D73A49;">++</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> finalI </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> i;</span></span>
<span class="line"><span style="color:#24292E;">            threadPool.</span><span style="color:#6F42C1;">submit</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Runnable</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">                @</span><span style="color:#D73A49;">Override</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">run</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">                    String date </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ThreadLocalStatic</span><span style="color:#24292E;">().</span><span style="color:#6F42C1;">date</span><span style="color:#24292E;">(finalI);</span></span>
<span class="line"><span style="color:#24292E;">                    System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(date);</span></span>
<span class="line"><span style="color:#24292E;">                }</span></span>
<span class="line"><span style="color:#24292E;">            });</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">        threadPool.</span><span style="color:#6F42C1;">shutdown</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> String </span><span style="color:#6F42C1;">date</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> </span><span style="color:#E36209;">seconds</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        Date date </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Date</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">1000</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">*</span><span style="color:#24292E;"> seconds);</span></span>
<span class="line"><span style="color:#24292E;">        SimpleDateFormat dateFormat </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> ThreadSafeFormatter.dateFormatThreadLocal.</span><span style="color:#6F42C1;">get</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> dateFormat.</span><span style="color:#6F42C1;">format</span><span style="color:#24292E;">(date);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ThreadSafeFormatter</span><span style="color:#24292E;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> ThreadLocal&lt;</span><span style="color:#D73A49;">SimpleDateFormat</span><span style="color:#24292E;">&gt; dateFormatThreadLocal </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> ThreadLocal&lt;</span><span style="color:#D73A49;">SimpleDateFormat</span><span style="color:#24292E;">&gt;() {</span></span>
<span class="line"><span style="color:#24292E;">        @</span><span style="color:#D73A49;">Override</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">protected</span><span style="color:#24292E;"> SimpleDateFormat </span><span style="color:#6F42C1;">initialValue</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> ThreadLocalStatic.dateFormat;</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>那么在多线程中去获取这个资源并且同时使用的话，同样会出现时间重复的问题，运行结果如下。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#79B8FF;">00</span><span style="color:#F97583;">:</span><span style="color:#79B8FF;">15</span></span>
<span class="line"><span style="color:#79B8FF;">00</span><span style="color:#F97583;">:</span><span style="color:#79B8FF;">15</span></span>
<span class="line"><span style="color:#79B8FF;">00</span><span style="color:#F97583;">:</span><span style="color:#79B8FF;">05</span></span>
<span class="line"><span style="color:#79B8FF;">00</span><span style="color:#F97583;">:</span><span style="color:#79B8FF;">16</span></span>
<span class="line"><span style="color:#E1E4E8;">...</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#005CC5;">00</span><span style="color:#D73A49;">:</span><span style="color:#005CC5;">15</span></span>
<span class="line"><span style="color:#005CC5;">00</span><span style="color:#D73A49;">:</span><span style="color:#005CC5;">15</span></span>
<span class="line"><span style="color:#005CC5;">00</span><span style="color:#D73A49;">:</span><span style="color:#005CC5;">05</span></span>
<span class="line"><span style="color:#005CC5;">00</span><span style="color:#D73A49;">:</span><span style="color:#005CC5;">16</span></span>
<span class="line"><span style="color:#24292E;">...</span></span></code></pre></div><p>可以看出，00:15 被多次打印了，发生了线程安全问题。也就是说，如果我们需要放到 ThreadLocal 中的这个对象是共享的，是被 static 修饰的，那么此时其实根本就不需要用到 ThreadLocal，即使用了 ThreadLocal 并不能解决线程安全问题。</p><p>相反，我们对于这种共享的变量，如果想要保证它的线程安全，应该用其他的方法，比如说可以使用 synchronized 或者是加锁等其他的方法来解决线程安全问题，而不是使用 ThreadLocal，因为这不是 ThreadLocal 应该使用的场景。</p><p>这个问题回答到这里，可能会引申出下面这个问题。</p><h4 id="threadlocal-和-synchronized-是什么关系" tabindex="-1">ThreadLocal 和 synchronized 是什么关系 <a class="header-anchor" href="#threadlocal-和-synchronized-是什么关系" aria-label="Permalink to &quot;ThreadLocal 和 synchronized 是什么关系&quot;">​</a></h4><p>面试官可能会问：你既然说 ThreadLocal 和 synchronized 它们两个都能解决线程安全问题，那么 ThreadLocal 和 synchronized 是什么关系呢？</p><p>我们先说第一种情况。当 ThreadLocal 用于解决线程安全问题的时候，也就是把一个对象给每个线程都生成一份独享的副本的，在这种场景下，ThreadLocal 和 synchronized 都可以理解为是用来保证线程安全的手段。例如，在第 44 讲 SimpleDateFormat 的例子中，我们既使用了 synchronized 来达到目的，也使用了 ThreadLocal 作为实现方案。但是效果和实现原理不同：</p><ul><li>ThreadLocal 是通过让每个线程独享自己的副本，避免了资源的竞争。</li><li>synchronized 主要用于临界资源的分配，在同一时刻限制最多只有一个线程能访问该资源。</li></ul><p>相比于 ThreadLocal 而言，synchronized 的效率会更低一些，但是花费的内存也更少。在这种场景下，ThreadLocal 和 synchronized 虽然有不同的效果，不过都可以达到线程安全的目的。</p><p>但是对于 ThreadLocal 而言，它还有不同的使用场景。比如当 ThreadLocal 用于让多个类能更方便地拿到我们希望给每个线程独立保存这个信息的场景下时（比如每个线程都会对应一个用户信息，也就是 user 对象），在这种场景下，ThreadLocal 侧重的是避免传参，所以此时 ThreadLocal 和 synchronized 是两个不同维度的工具。</p><p>以上就是本课时的内容。</p><p>在本课时中，首先介绍了 ThreadLocal 是不是用来解决共享资源的多线程访问的问题的，答案是&quot;不是&quot;，因为对于 ThreadLocal 而言，每个线程中的资源并不共享；然后我们又介绍了 ThreadLocal 和 synchronized 的关系。</p>`,21),e=[o];function t(c,r,E,y,i,d){return a(),n("div",null,e)}const m=s(p,[["render",t]]);export{h as __pageData,m as default};
