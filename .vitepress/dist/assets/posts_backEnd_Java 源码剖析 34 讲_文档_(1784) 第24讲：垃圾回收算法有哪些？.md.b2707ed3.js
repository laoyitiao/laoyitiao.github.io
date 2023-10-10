import{_ as o,j as e,o as t,g as c,k as l,h as n,Q as p,s}from"./chunks/framework.cfb14fe0.js";const q=JSON.parse('{"title":"第24讲：垃圾回收算法有哪些？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/Java 源码剖析 34 讲_文档/(1784) 第24讲：垃圾回收算法有哪些？.md","filePath":"posts/backEnd/Java 源码剖析 34 讲_文档/(1784) 第24讲：垃圾回收算法有哪些？.md","lastUpdated":1696682708000}'),r={name:"posts/backEnd/Java 源码剖析 34 讲_文档/(1784) 第24讲：垃圾回收算法有哪些？.md"},E=p(`<h1 id="第24讲-垃圾回收算法有哪些" tabindex="-1">第24讲：垃圾回收算法有哪些？ <a class="header-anchor" href="#第24讲-垃圾回收算法有哪些" aria-label="Permalink to &quot;第24讲：垃圾回收算法有哪些？&quot;">​</a></h1><p>说到 Java 虚拟机不得不提的一个词就是 <strong>&quot;垃圾回收&quot;（GC，Garbage Collection）</strong>，而垃圾回收的执行速度则影响着整个程序的执行效率，所以我们需要知道更多关于垃圾回收的具体执行细节，以便为我们选择合适的垃圾回收器提供理论支持。</p><p>我们本课时的面试题是，如何判断一个对象是否&quot;死亡&quot;？垃圾回收的算法有哪些？</p><h3 id="典型回答" tabindex="-1">典型回答 <a class="header-anchor" href="#典型回答" aria-label="Permalink to &quot;典型回答&quot;">​</a></h3><p>垃圾回收器首先要做的就是，判断一个对象是存活状态还是死亡状态，死亡的对象将会被标识为垃圾数据并等待收集器进行清除。</p><p>判断一个对象是否为死亡状态的常用算法有两个：引用计数器算法和可达性分析算法。</p><p><strong>引用计数算法（Reference Counting）</strong> 属于垃圾收集器最早的实现算法了，它是指在创建对象时关联一个与之相对应的计数器，当此对象被使用时加 1，相反销毁时 -1。当此计数器为 0 时，则表示此对象未使用，可以被垃圾收集器回收。</p><p>引用计数算法的优缺点很明显，其优点是垃圾回收比较及时，实时性比较高，只要对象计数器为 0，则可以直接进行回收操作；而缺点是无法解决循环引用的问题，比如以下代码：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">CustomOne</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> CustomTwo two;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> CustomTwo </span><span style="color:#B392F0;">getCustomTwo</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> two;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">setCustomTwo</span><span style="color:#E1E4E8;">(CustomTwo </span><span style="color:#FFAB70;">two</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.two </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> two;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">CustomTwo</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> CustomOne one;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> CustomOne </span><span style="color:#B392F0;">getCustomOne</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> one;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">setCustomOne</span><span style="color:#E1E4E8;">(CustomOne </span><span style="color:#FFAB70;">one</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.one </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> one;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">RefCountingTest</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">String</span><span style="color:#E1E4E8;">[] </span><span style="color:#FFAB70;">args</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        CustomOne one </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">CustomOne</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        CustomTwo two </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">CustomTwo</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        one.</span><span style="color:#B392F0;">setCustomTwo</span><span style="color:#E1E4E8;">(two);</span></span>
<span class="line"><span style="color:#E1E4E8;">        two.</span><span style="color:#B392F0;">setCustomOne</span><span style="color:#E1E4E8;">(one);</span></span>
<span class="line"><span style="color:#E1E4E8;">        one </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">        two </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">CustomOne</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> CustomTwo two;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> CustomTwo </span><span style="color:#6F42C1;">getCustomTwo</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> two;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">setCustomTwo</span><span style="color:#24292E;">(CustomTwo </span><span style="color:#E36209;">two</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.two </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> two;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">CustomTwo</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> CustomOne one;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> CustomOne </span><span style="color:#6F42C1;">getCustomOne</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> one;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">setCustomOne</span><span style="color:#24292E;">(CustomOne </span><span style="color:#E36209;">one</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.one </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> one;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">RefCountingTest</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">String</span><span style="color:#24292E;">[] </span><span style="color:#E36209;">args</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        CustomOne one </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">CustomOne</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        CustomTwo two </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">CustomTwo</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        one.</span><span style="color:#6F42C1;">setCustomTwo</span><span style="color:#24292E;">(two);</span></span>
<span class="line"><span style="color:#24292E;">        two.</span><span style="color:#6F42C1;">setCustomOne</span><span style="color:#24292E;">(one);</span></span>
<span class="line"><span style="color:#24292E;">        one </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">        two </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>即使 one 和 two 都为 null，但因为循环引用的问题，两个对象都不能被垃圾收集器所回收。</p><p><strong>可达性分析算法（Reachability Analysis）</strong> 是目前商业系统中所采用的判断对象死亡的常用算法，它是指从对象的起点（GC Roots）开始向下搜索，如果对象到 GC Roots 没有任何引用链相连时，也就是说此对象到 GC Roots 不可达时，则表示此对象可以被垃圾回收器所回收，如下图所示：</p>`,11),y=s("p",null,"当确定了对象的状态之后（存活还是死亡）接下来就是进行垃圾回收了，垃圾回收的常见算法有以下几个：",-1),i=s("ul",null,[s("li",null,[s("p",null,"标记-清除算法；")]),s("li",null,[s("p",null,"标记-复制算法；")]),s("li",null,[s("p",null,"标记-整理算法。")])],-1),u=s("p",null,[s("strong",null,"标记-清除（Mark-Sweep）算法"),n("属于最早的垃圾回收算法，它是由标记阶段和清除阶段构成的。标记阶段会给所有的存活对象做上标记，而清除阶段会把没有被标记的死亡对象进行回收。而标记的判断方法就是前面讲的引用计数算法和可达性分析算法。")],-1),F=s("p",null,"标记-清除算法的执行流程如下图所示：",-1),C=s("p",null,"从上图可以看出，标记-清除算法有一个最大的问题就是会产生内存空间的碎片化问题，也就是说标记-清除算法执行完成之后会产生大量的不连续内存，这样当程序需要分配一个大对象时，因为没有足够的连续内存而导致需要提前触发一次垃圾回收动作。",-1),d=s("p",null,[s("strong",null,"标记-复制算法"),n("是标记-清除算法的一个升级，使用它可以有效地解决内存碎片化的问题。它是指将内存分为大小相同的两块区域，每次只使用其中的一块区域，这样在进行垃圾回收时就可以直接将存活的东西复制到新的内存上，然后再把另一块内存全部清理掉。这样就不会产生内存碎片的问题了，其执行流程如下图所示：")],-1),h=s("p",null,"标记-复制的算法虽然可以解决内存碎片的问题，但同时也带来了新的问题。因为需要将内存分为大小相同的两块内存，那么内存的实际可用量其实只有原来的一半，这样此算法导致了内存的可用率大幅降低了。",-1),m=s("p",null,[s("strong",null,"标记-整理算法"),n("的诞生晚于标记-清除算法和标记-复制算法，它也是由两个阶段组成的：标记阶段和整理阶段。其中标记阶段和标记-清除算法的标记阶段一样，不同的是后面的一个阶段，标记-整理算法的后一个阶段不是直接对内存进行清除，而是把所有存活的对象移动到内存的一端，然后把另一端的所有死亡对象全部清除，执行流程图如下图所示：")],-1),A=p(`<h3 id="考点分析" tabindex="-1">考点分析 <a class="header-anchor" href="#考点分析" aria-label="Permalink to &quot;考点分析&quot;">​</a></h3><p>本题目考察的是关于垃圾收集的一些理论算法问题，都属于概念性的问题，只要深入理解之后还是挺容易记忆的。和此知识点相关的面试题还有这些：</p><ul><li><p>Java 中可作为 GC Roots 的对象有哪些？</p></li><li><p>说一下死亡对象的判断细节？</p></li></ul><h3 id="知识扩展" tabindex="-1">知识扩展 <a class="header-anchor" href="#知识扩展" aria-label="Permalink to &quot;知识扩展&quot;">​</a></h3><h4 id="gc-roots" tabindex="-1">GC Roots <a class="header-anchor" href="#gc-roots" aria-label="Permalink to &quot;GC Roots&quot;">​</a></h4><p>在 Java 中可以作为 GC Roots 的对象，主要包含以下几个：</p><ul><li><p>所有被同步锁持有的对象，比如被 synchronize 持有的对象；</p></li><li><p>字符串常量池里的引用（String Table）；</p></li><li><p>类型为引用类型的静态变量；</p></li><li><p>虚拟机栈中引用对象；</p></li><li><p>本地方法栈中的引用对象。</p></li></ul><h4 id="死亡对象判断" tabindex="-1">死亡对象判断 <a class="header-anchor" href="#死亡对象判断" aria-label="Permalink to &quot;死亡对象判断&quot;">​</a></h4><p>当使用可达性分析判断一个对象不可达时，并不会直接标识这个对象为死亡状态，而是先将它标记为&quot;待死亡&quot;状态再进行一次校验。校验的内容就是此对象是否重写了 finalize() 方法，如果该对象重写了 finalize() 方法，那么这个对象将会被存入到 F-Queue 队列中，等待 JVM 的 Finalizer 线程去执行重写的 finalize() 方法，在这个方法中如果此对象将自己赋值给某个类变量时，则表示此对象已经被引用了。因此不能被标识为死亡状态，其他情况则会被标识为死亡状态。</p><p>以上流程对应的示例代码如下：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">FinalizeTest</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 需要状态判断的对象</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> FinalizeTest Hook </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Override</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">protected</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">finalize</span><span style="color:#E1E4E8;">() </span><span style="color:#F97583;">throws</span><span style="color:#E1E4E8;"> Throwable {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">super</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">finalize</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;执行了 finalize 方法&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">        FinalizeTest.Hook </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">String</span><span style="color:#E1E4E8;">[] </span><span style="color:#FFAB70;">args</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">throws</span><span style="color:#E1E4E8;"> InterruptedException {</span></span>
<span class="line"><span style="color:#E1E4E8;">        Hook </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">FinalizeTest</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 卸载对象，第一次执行 finalize()</span></span>
<span class="line"><span style="color:#E1E4E8;">        Hook </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.</span><span style="color:#B392F0;">gc</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        Thread.</span><span style="color:#B392F0;">sleep</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">500</span><span style="color:#E1E4E8;">); </span><span style="color:#6A737D;">// 等待 finalize() 执行</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (Hook </span><span style="color:#F97583;">!=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;存活状态&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">        } </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">            System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;死亡状态&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 卸载对象，与上一次代码完全相同</span></span>
<span class="line"><span style="color:#E1E4E8;">        Hook </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.</span><span style="color:#B392F0;">gc</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        Thread.</span><span style="color:#B392F0;">sleep</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">500</span><span style="color:#E1E4E8;">); </span><span style="color:#6A737D;">// 等待 finalize() 执行</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (Hook </span><span style="color:#F97583;">!=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;存活状态&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">        } </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">            System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;死亡状态&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">FinalizeTest</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 需要状态判断的对象</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> FinalizeTest Hook </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Override</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">protected</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">finalize</span><span style="color:#24292E;">() </span><span style="color:#D73A49;">throws</span><span style="color:#24292E;"> Throwable {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">super</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">finalize</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;执行了 finalize 方法&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        FinalizeTest.Hook </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">String</span><span style="color:#24292E;">[] </span><span style="color:#E36209;">args</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">throws</span><span style="color:#24292E;"> InterruptedException {</span></span>
<span class="line"><span style="color:#24292E;">        Hook </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">FinalizeTest</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 卸载对象，第一次执行 finalize()</span></span>
<span class="line"><span style="color:#24292E;">        Hook </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">        System.</span><span style="color:#6F42C1;">gc</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        Thread.</span><span style="color:#6F42C1;">sleep</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">500</span><span style="color:#24292E;">); </span><span style="color:#6A737D;">// 等待 finalize() 执行</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (Hook </span><span style="color:#D73A49;">!=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">            System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;存活状态&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        } </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">            System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;死亡状态&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 卸载对象，与上一次代码完全相同</span></span>
<span class="line"><span style="color:#24292E;">        Hook </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">        System.</span><span style="color:#6F42C1;">gc</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        Thread.</span><span style="color:#6F42C1;">sleep</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">500</span><span style="color:#24292E;">); </span><span style="color:#6A737D;">// 等待 finalize() 执行</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (Hook </span><span style="color:#D73A49;">!=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">            System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;存活状态&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        } </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">            System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;死亡状态&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>上述代码的执行结果为：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">执行了 finalize 方法</span></span>
<span class="line"><span style="color:#E1E4E8;">存活状态</span></span>
<span class="line"><span style="color:#E1E4E8;">死亡状态</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">执行了 finalize 方法</span></span>
<span class="line"><span style="color:#24292E;">存活状态</span></span>
<span class="line"><span style="color:#24292E;">死亡状态</span></span></code></pre></div><p>从结果可以看出，卸载了两次对象，第一次执行了 finalize() 方法，成功地把自己从待死亡状态拉了回来；而第二次同样的代码却没有执行 finalize() 方法，从而被确认为了死亡状态，这是因为<strong>任何对象的 finalize() 方法都只会被系统调用一次</strong>。</p><p>虽然可以从 finalize() 方法中把自己从死亡状态&quot;拯救&quot;出来，但是不建议这样做，因为所有对象的 finalize() 方法只会执行一次。因此同样的代码可能产生的结果是不同的，这样就给程序的执行带来了很大的不确定性。</p><h3 id="小结" tabindex="-1">小结 <a class="header-anchor" href="#小结" aria-label="Permalink to &quot;小结&quot;">​</a></h3><p>本课时讲了对象状态判断的两种算法：引用计数算法和可达性分析算法。其中引用计数算法无法解决循环引用的问题，因此对于绝大多数的商业系统来说使用的都是可达性分析算法；同时还讲了垃圾回收的三种算法：标记-清除算法、标记-复制算法、标记-整理算法，其中，标记-清除算法会带来内存碎片的问题，而标记-复制算法会降低内存的利用率。所以，标记-整理算法算是一个不错的方案。</p>`,17);function g(_,D,B,b,v,w){const a=e("Image");return t(),c("div",null,[E,l(a,{alt:"image (4).png",src:"https://s0.lgstatic.com/i/image/M00/14/70/Ciqc1F7Q3giAKu5UAAClt3UMheE300.png"}),n(),y,i,u,F,l(a,{alt:"image (5).png",src:"https://s0.lgstatic.com/i/image/M00/14/7B/CgqCHl7Q3hOAHBq0AABM8DvzlGU761.png"}),n(),C,d,l(a,{alt:"image (6).png",src:"https://s0.lgstatic.com/i/image/M00/14/7B/CgqCHl7Q3h6ATzDEAABQETkptLk639.png"}),n(),h,m,l(a,{alt:"image (7).png",src:"https://s0.lgstatic.com/i/image/M00/14/7B/CgqCHl7Q3ieAYV5FAABLfGQH4UE403.png"}),n(),A])}const f=o(r,[["render",g]]);export{q as __pageData,f as default};
