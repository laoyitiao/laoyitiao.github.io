import{_ as s,o as n,g as a,Q as l}from"./chunks/framework.f949202b.js";const b=JSON.parse('{"title":"模式原理分析 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/趣学设计模式_文档/趣学设计模式_文档/(6892) 27  享元模式：如何通过共享对象减少内存加载消耗？.md","filePath":"posts/backEnd/趣学设计模式_文档/趣学设计模式_文档/(6892) 27  享元模式：如何通过共享对象减少内存加载消耗？.md","lastUpdated":null}'),p={name:"posts/backEnd/趣学设计模式_文档/趣学设计模式_文档/(6892) 27  享元模式：如何通过共享对象减少内存加载消耗？.md"},o=l(`<p>在上一讲中，我们介绍了门面模式，门面模式应用广泛，不仅可以在架构设计层面组合不同的子系统来完成庞大功能（比如，电商系统），而且还可以在代码级别用于对象之间的调用解耦。</p><p>今天我们继续学习另外一种结构型模式------享元模式。享元模式的原理和实现都很简单，但是应用场景却相对狭窄，它和现在我们所熟知的缓存模式、池化模式有所联系，却又有不同。学习完今天这一讲后，相信你会找到这个不同之处。</p><p>那么，话不多说，让我们开始今天的学习吧。</p><h3 id="模式原理分析" tabindex="-1">模式原理分析 <a class="header-anchor" href="#模式原理分析" aria-label="Permalink to &quot;模式原理分析&quot;">​</a></h3><p>享元模式的原始定义是：摒弃了在每个对象中保存所有数据的方式，通过共享多个对象所共有的相同状态，从而让我们能在有限的内存容量中载入更多对象。</p><p>从这个定义中你可以发现，享元模式要解决的核心问题就是<strong>节约内存空间</strong> ，使用的办法是<strong>找出相似对象之间的共有特征，然后复用这些特征</strong>。</p><p>我们先来看看 UML 图是如何表示享元模式的，如下图：</p><p><img src="https://s0.lgstatic.com/i/image6/M00/44/F6/Cgp9HWDBuDyAP1OOAAHZvdo_JwA438.png" alt="图片1.png"></p><p>从这个 UML 图中，我们能看出享元模式包含的关键角色有四个。</p><ul><li><p><strong>享元类（Flyweight）</strong>：定义了享元对象需要实现的公共操作方法。在该方法中会使用一个状态作为输入参数，也叫外部状态，由客户端保存，在运行时改变。</p></li><li><p><strong>享元工厂类（Flyweight Factory）</strong>：管理一个享元对象类的缓存池。它会存储享元对象之间需要传递的共有状态，比如，按照大写英文字母来作为状态标识，这种只在享元对象之间传递的方式就叫内部状态。同时，它还提供了一个通用方法 getFlyweight()，主要通过内部状态标识来获取享元对象。</p></li><li><p><strong>可共享的具体享元类（ConcreteFlyweight）</strong>：能够复用享元工厂内部状态并实现享元类公共操作的具体实现类。</p></li><li><p><strong>非共享的具体享元类（UnsharedConcreteFlyweight）</strong>：不复用享元工厂内部状态，但实现享元类的具体实现类。</p></li></ul><p>为帮助你更准确地理解，这里我们稍微拓展一下，简单介绍下内部状态和外部状态。</p><ul><li><p><strong>内部状态</strong>：不会随环境改变而改变的状态，俗称不可变对象。比如，在 Java 中 Integer 对象初始化就是缓存 -127 到 128 的值，无论怎么使用 Integer，这些值都不会变化。</p></li><li><p><strong>外部状态</strong>：随环境改变而改变的状态。通常是某个对象所独有的，不能被共享，因此，也只能由客户端保存。之所以需要外部状态就是因为客户端需要不同的定制化操作。</p></li></ul><p>下面我们再来看看 UML 对应的代码实现：</p><div class="language-java vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">//享元类</span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">interface</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Flyweight</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">operation</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> </span><span style="color:#FFAB70;">state</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#6A737D;">//享元工厂类</span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">FlyweighFactory</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 定义一个池容器</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> Map&lt;</span><span style="color:#F97583;">String</span><span style="color:#E1E4E8;">,</span><span style="color:#F97583;">Flyweight</span><span style="color:#E1E4E8;">&gt; pool </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> HashMap&lt;&gt;();</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">FlyweighFactory</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        pool.</span><span style="color:#B392F0;">put</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;A&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ConcreteFlyweight</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;A&quot;</span><span style="color:#E1E4E8;">));</span><span style="color:#6A737D;">//将对应的内部状态添加进去</span></span>
<span class="line"><span style="color:#E1E4E8;">        pool.</span><span style="color:#B392F0;">put</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;B&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ConcreteFlyweight</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;B&quot;</span><span style="color:#E1E4E8;">));</span></span>
<span class="line"><span style="color:#E1E4E8;">        pool.</span><span style="color:#B392F0;">put</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;C&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ConcreteFlyweight</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;C&quot;</span><span style="color:#E1E4E8;">));</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">//根据内部状态来查找值</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> Flyweight </span><span style="color:#B392F0;">getFlyweight</span><span style="color:#E1E4E8;">(String </span><span style="color:#FFAB70;">key</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (pool.</span><span style="color:#B392F0;">containsKey</span><span style="color:#E1E4E8;">(key)) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;===享元池中有，直接复用，key：&quot;</span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;">key);</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> pool.</span><span style="color:#B392F0;">get</span><span style="color:#E1E4E8;">(key);</span></span>
<span class="line"><span style="color:#E1E4E8;">        } </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">            System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;===享元池中没有，重新创建并复用，key：&quot;</span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;">key);</span></span>
<span class="line"><span style="color:#E1E4E8;">            Flyweight flyweightNew </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ConcreteFlyweight</span><span style="color:#E1E4E8;">(key);</span></span>
<span class="line"><span style="color:#E1E4E8;">            pool.</span><span style="color:#B392F0;">put</span><span style="color:#E1E4E8;">(key,flyweightNew);</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> flyweightNew;</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#6A737D;">//共享的具体享元类</span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ConcreteFlyweight</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">implements</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Flyweight</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> String uniqueKey;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ConcreteFlyweight</span><span style="color:#E1E4E8;">(String </span><span style="color:#FFAB70;">key</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.uniqueKey </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> key;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Override</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">operation</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> </span><span style="color:#FFAB70;">state</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.</span><span style="color:#B392F0;">printf</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;=== 享元内部状态：%s,外部状态：%s%n&quot;</span><span style="color:#E1E4E8;">,uniqueKey,state);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">//非共享的具体享元类</span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">UnsharedConcreteFlyweight</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">implements</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Flyweight</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> String uniqueKey;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">UnsharedConcreteFlyweight</span><span style="color:#E1E4E8;">(String </span><span style="color:#FFAB70;">key</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.uniqueKey </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> key;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Override</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">operation</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> </span><span style="color:#FFAB70;">state</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;=== 使用不共享的对象，内部状态：&quot;</span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;">uniqueKey</span><span style="color:#F97583;">+</span><span style="color:#9ECBFF;">&quot;，外部状态：&quot;</span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;">state);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">输出结果：</span></span>
<span class="line"><span style="color:#F97583;">====</span><span style="color:#E1E4E8;">享元池中有，直接复用，key：A</span></span>
<span class="line"><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> 享元内部状态：A,外部状态：</span><span style="color:#79B8FF;">9</span></span>
<span class="line"><span style="color:#F97583;">====</span><span style="color:#E1E4E8;">享元池中有，直接复用，key：B</span></span>
<span class="line"><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> 享元内部状态：B,外部状态：</span><span style="color:#79B8FF;">8</span></span>
<span class="line"><span style="color:#F97583;">====</span><span style="color:#E1E4E8;">享元池中没有，重新创建并复用，key：D</span></span>
<span class="line"><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> 享元内部状态：D,外部状态：</span><span style="color:#79B8FF;">7</span></span>
<span class="line"><span style="color:#F97583;">====</span><span style="color:#E1E4E8;">创建不共享的对象，key：uX</span></span>
<span class="line"><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> 使用不共享的对象，内部状态：uX，外部状态：</span><span style="color:#79B8FF;">6</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">//享元类</span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">interface</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Flyweight</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">operation</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> </span><span style="color:#E36209;">state</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#6A737D;">//享元工厂类</span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">FlyweighFactory</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 定义一个池容器</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> Map&lt;</span><span style="color:#D73A49;">String</span><span style="color:#24292E;">,</span><span style="color:#D73A49;">Flyweight</span><span style="color:#24292E;">&gt; pool </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> HashMap&lt;&gt;();</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">FlyweighFactory</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">        pool.</span><span style="color:#6F42C1;">put</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;A&quot;</span><span style="color:#24292E;">, </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ConcreteFlyweight</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;A&quot;</span><span style="color:#24292E;">));</span><span style="color:#6A737D;">//将对应的内部状态添加进去</span></span>
<span class="line"><span style="color:#24292E;">        pool.</span><span style="color:#6F42C1;">put</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;B&quot;</span><span style="color:#24292E;">, </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ConcreteFlyweight</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;B&quot;</span><span style="color:#24292E;">));</span></span>
<span class="line"><span style="color:#24292E;">        pool.</span><span style="color:#6F42C1;">put</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;C&quot;</span><span style="color:#24292E;">, </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ConcreteFlyweight</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;C&quot;</span><span style="color:#24292E;">));</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">//根据内部状态来查找值</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> Flyweight </span><span style="color:#6F42C1;">getFlyweight</span><span style="color:#24292E;">(String </span><span style="color:#E36209;">key</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (pool.</span><span style="color:#6F42C1;">containsKey</span><span style="color:#24292E;">(key)) {</span></span>
<span class="line"><span style="color:#24292E;">            System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;===享元池中有，直接复用，key：&quot;</span><span style="color:#D73A49;">+</span><span style="color:#24292E;">key);</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> pool.</span><span style="color:#6F42C1;">get</span><span style="color:#24292E;">(key);</span></span>
<span class="line"><span style="color:#24292E;">        } </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">            System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;===享元池中没有，重新创建并复用，key：&quot;</span><span style="color:#D73A49;">+</span><span style="color:#24292E;">key);</span></span>
<span class="line"><span style="color:#24292E;">            Flyweight flyweightNew </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ConcreteFlyweight</span><span style="color:#24292E;">(key);</span></span>
<span class="line"><span style="color:#24292E;">            pool.</span><span style="color:#6F42C1;">put</span><span style="color:#24292E;">(key,flyweightNew);</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> flyweightNew;</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#6A737D;">//共享的具体享元类</span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ConcreteFlyweight</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">implements</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Flyweight</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> String uniqueKey;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ConcreteFlyweight</span><span style="color:#24292E;">(String </span><span style="color:#E36209;">key</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.uniqueKey </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> key;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Override</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">operation</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> </span><span style="color:#E36209;">state</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">printf</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;=== 享元内部状态：%s,外部状态：%s%n&quot;</span><span style="color:#24292E;">,uniqueKey,state);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">//非共享的具体享元类</span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">UnsharedConcreteFlyweight</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">implements</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Flyweight</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> String uniqueKey;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">UnsharedConcreteFlyweight</span><span style="color:#24292E;">(String </span><span style="color:#E36209;">key</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.uniqueKey </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> key;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Override</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">operation</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> </span><span style="color:#E36209;">state</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;=== 使用不共享的对象，内部状态：&quot;</span><span style="color:#D73A49;">+</span><span style="color:#24292E;">uniqueKey</span><span style="color:#D73A49;">+</span><span style="color:#032F62;">&quot;，外部状态：&quot;</span><span style="color:#D73A49;">+</span><span style="color:#24292E;">state);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">输出结果：</span></span>
<span class="line"><span style="color:#D73A49;">====</span><span style="color:#24292E;">享元池中有，直接复用，key：A</span></span>
<span class="line"><span style="color:#D73A49;">===</span><span style="color:#24292E;"> 享元内部状态：A,外部状态：</span><span style="color:#005CC5;">9</span></span>
<span class="line"><span style="color:#D73A49;">====</span><span style="color:#24292E;">享元池中有，直接复用，key：B</span></span>
<span class="line"><span style="color:#D73A49;">===</span><span style="color:#24292E;"> 享元内部状态：B,外部状态：</span><span style="color:#005CC5;">8</span></span>
<span class="line"><span style="color:#D73A49;">====</span><span style="color:#24292E;">享元池中没有，重新创建并复用，key：D</span></span>
<span class="line"><span style="color:#D73A49;">===</span><span style="color:#24292E;"> 享元内部状态：D,外部状态：</span><span style="color:#005CC5;">7</span></span>
<span class="line"><span style="color:#D73A49;">====</span><span style="color:#24292E;">创建不共享的对象，key：uX</span></span>
<span class="line"><span style="color:#D73A49;">===</span><span style="color:#24292E;"> 使用不共享的对象，内部状态：uX，外部状态：</span><span style="color:#005CC5;">6</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br></div></div><p>这段代码实现非常简单，不过这里你可能会联想到缓存模式，比如，LRU 缓存模式。但这两者是完全不同的设计意图，它们的本质区别在于：<strong>享元模式要解决的问题是节约内存的空间大小，而缓存模式本质上是为了节省时间</strong>。</p><p>回到上面的代码分析中，我们能看出享元模式封装的变化有：</p><ul><li><p>对象内部状态的定义规则，比如，是通过字母共享状态，还是通过固定的数字来共享状态；</p></li><li><p>具体享元对象所实现的公共操作的逻辑。</p></li></ul><p>所以说，<strong>享元模式本质上是通过创建更多的可复用对象的共有特征来尽可能地减少创建重复对象的内存消耗</strong>。</p><h3 id="使用场景分析" tabindex="-1">使用场景分析 <a class="header-anchor" href="#使用场景分析" aria-label="Permalink to &quot;使用场景分析&quot;">​</a></h3><p>一般来讲，享元模式常用的使用场景有以下几种。</p><ul><li><p>系统中存在大量重复创建的对象。比如，同一个商品的展示图片、详情介绍、文字介绍等，当自营商家系统调用或第三方商家调用时，商品系统可以使用同一个对象来节省内存空间。</p></li><li><p>可以使用外部特定的状态来控制使用的对象。比如，使用常用的中文汉字作为读取的标识，读取享元池中共享的多个中文汉字对象。</p></li><li><p>相关性很高并且可以复用的对象。比如，公司的组织结构人员基本信息、网站的分类信息列表等。</p></li></ul><p>在现实中，享元模式最常使用的场景是在<strong>编辑器软件</strong>中，比如，在一个文档中多次出现相同的图片，则只需要创建一个图片对象，通过在应用程序中设置该图片出现的位置，就可以实现该图片在不同地方多次重复显示的效果。</p><p>在 Java 中，享元模式一个常用的场景就是，使用数据类的包装类对象的 valueOf() 方法。比如，使用 Integer.valueOf() 方法时，实际的代码实现中有一个叫 IntegerCache 的静态类，它就是一直缓存了 -127 到 128 范围内的数值，如下代码所示，你可以在 Java JDK 中的 Integer 类的源码中找到这段代码。</p><div class="language-java vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> Integer </span><span style="color:#B392F0;">valueOf</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> i) {</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (i </span><span style="color:#F97583;">&gt;=</span><span style="color:#E1E4E8;"> IntegerCache.low </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> i </span><span style="color:#F97583;">&lt;=</span><span style="color:#E1E4E8;"> IntegerCache.high)</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> IntegerCache.cache[i </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">IntegerCache.low)];</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Integer</span><span style="color:#E1E4E8;">(i);</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> Integer </span><span style="color:#6F42C1;">valueOf</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> i) {</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (i </span><span style="color:#D73A49;">&gt;=</span><span style="color:#24292E;"> IntegerCache.low </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> i </span><span style="color:#D73A49;">&lt;=</span><span style="color:#24292E;"> IntegerCache.high)</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> IntegerCache.cache[i </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">IntegerCache.low)];</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Integer</span><span style="color:#24292E;">(i);</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>你会发现，享元模式本质上在使用时就是找到不可变的特征，并缓存起来，当类似对象使用时从缓存中读取，以达到节省内存空间的目的。比如，在需要承接大流量的系统中使用图片，我们都知道高清图片即便是压缩后占用的内存空间也很大，那么在使用图片时节省内存空间就是首要考虑的设计因素，而享元模式可以很好地帮助我们解决这类问题场景。</p><h3 id="为什么使用享元模式" tabindex="-1">为什么使用享元模式？ <a class="header-anchor" href="#为什么使用享元模式" aria-label="Permalink to &quot;为什么使用享元模式？&quot;">​</a></h3><p>分析完享元模式的原理和使用场景后，我们再来说说使用享元模式的原因，主要有以下两个。</p><p><strong>第一个，减少内存消耗，节省服务器成本。</strong> 比如，当大量商家的商品图片、固定文字（如商品介绍、商品属性）在不同的网页进行展示时，通常不需要重复创建对象，而是可以使用同一个对象，以避免重复存储而浪费内存空间。由于通过享元模式构建的对象是共享的，所以当程序在运行时不仅不用重复创建，还能减少程序与操作系统的 IO 交互次数，大大提升了读写性能。</p><p><strong>第二个，聚合同一类的不可变对象，提高对象复用性。</strong> 比如，Java 中的 Number 对象族类（Integet、Long、Double 等）都是使用了享元模式例子，通过缓存不同范围数值来重复使用相同的数值。</p><h3 id="收益什么-损失什么" tabindex="-1">收益什么？损失什么？ <a class="header-anchor" href="#收益什么-损失什么" aria-label="Permalink to &quot;收益什么？损失什么？&quot;">​</a></h3><p>通过上面的分析，我们可以得出使用享元模式主要有以下优点。</p><ul><li><p><strong>可以极大减少内存中对象的数量，使得相同对象或相似对象在内存中只保存一份。</strong></p></li><li><p><strong>通过封装内存特有的运行状态，达到共享对象之间高效复用的目的。</strong></p></li></ul><p>同样，享元模式也不是万能的，它也有一些缺点。</p><ul><li><p><strong>以时间换空间，间接增加了系统的实现复杂度</strong>。比如，需要分离出内部状态和外部状态，其中，外部状态这个定义比较模糊，也很难统一，而内部状态除了一些常用的常量容易被找到以外，那些更通用的组件对象在不同的业务系统中其实是不容易被找到的，因为不同的人对相似对象的理解并不一致，这就需要对程序员的代码设计实现思维有一定的要求。</p></li><li><p><strong>运行时间更长，对于一些需要快速响应的系统并不合适</strong>。享元模式的目的是节省空间，而没有说需要提供更短的时间，这适合数据类项目的使用，而不适合一些有高并发要求的系统。</p></li></ul><h3 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h3><p>享元模式为共享对象定义了一个很好的结构范例。不过，用好享元模式的<strong>关键在于找到不可变对象</strong>，比如，常用数字、字符等。</p><p>之所以做对象共享而不是对象复制的一个很重要的原因，就在于节省对象占用的内存空间大小。缓存模式和享元模式最大的区别就是：<strong>享元模式强调的是空间效率</strong> ，比如，一个很大的数据模型对象如何尽量少占用内存并提供可复用的能力；而<strong>缓存模式强调的是时间效率</strong>，比如，缓存秒杀的活动数据和库存数据等，数据可能会占用很多内存和磁盘空间，但是得保证在大促活动开始时要能及时响应用户的购买需求。也就是说，两者本质上解决的问题类型是不同的。</p><p>虽然享元模式的应用不如缓存模式多，但是对于超大型数据模式来说，它却是非常有效的优化方法之一。特别是对于现在越来越多的数据系统来说，共享变得更加重要，因为复制虽然时间效率更高，但是空间上可能完全不够。</p><h3 id="课后思考" tabindex="-1">课后思考 <a class="header-anchor" href="#课后思考" aria-label="Permalink to &quot;课后思考&quot;">​</a></h3><p>如果现在有一个超出服务器内存大小的对象需要加载使用，你该怎么使用享元模式进行解决呢？</p><p>欢迎留言分享，我会第一时间给你回复。</p><p>在下一讲，我会接着与你分享&quot;代理模式：如何控制和管理对象的访问？&quot;的相关内容，记得按时来听课！</p>`,42),e=[o];function t(r,c,y,E,i,u){return n(),a("div",null,e)}const g=s(p,[["render",t]]);export{b as __pageData,g as default};
