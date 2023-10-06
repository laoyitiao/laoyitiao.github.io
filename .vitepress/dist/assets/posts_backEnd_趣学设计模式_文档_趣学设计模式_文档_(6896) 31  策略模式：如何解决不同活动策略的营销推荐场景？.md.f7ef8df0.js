import{_ as a,j as l,o as p,g as o,k as e,Q as s}from"./chunks/framework.b3d8e22e.js";const A=JSON.parse('{"title":"模式原理分析 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/趣学设计模式_文档/趣学设计模式_文档/(6896) 31  策略模式：如何解决不同活动策略的营销推荐场景？.md","filePath":"posts/backEnd/趣学设计模式_文档/趣学设计模式_文档/(6896) 31  策略模式：如何解决不同活动策略的营销推荐场景？.md","lastUpdated":1696417798000}'),t={name:"posts/backEnd/趣学设计模式_文档/趣学设计模式_文档/(6896) 31  策略模式：如何解决不同活动策略的营销推荐场景？.md"},c=s('<p>在上一讲中，我们学习了模板方法模式。模板方法模式能帮助我们进行公有方法的抽取，起到快速复用和扩展的作用。今天，我们接着学习另外一种可以快速复用和扩展代码的行为型模式：策略模式。</p><p>策略模式在实际的开发中很常用，最常见的应用场景是<strong>利用它来替换过多的 if-else 嵌套的逻辑判断</strong>。除此之外，它还能结合工厂模式给客户端提供非常灵活的使用体验。</p><p>那么，话不多说，让我们开始今天的课程吧。</p><h3 id="模式原理分析" tabindex="-1">模式原理分析 <a class="header-anchor" href="#模式原理分析" aria-label="Permalink to &quot;模式原理分析&quot;">​</a></h3><p>策略模式的原始定义是：定义一系列算法，封装每个算法，并使它们可以互换。策略让算法独立于使用它的客户端而变化。</p><p>在这个定义中，策略模式明确表示应当<strong>由客户端自己决定在什么样的情况下使用哪些具体的策略</strong>。也就是说，服务端是作为一个策略的整体调控者，具体选择运行哪些策略其实是要交给客户端来决定的。比如，压缩文件的时候，你应该会提供一系列的不同压缩策略，比如，gzip、zip 等，至于客户端在什么时候使用 gzip，由客户端自行去决定。同时，gzip 还可以被替换为其他的压缩策略。</p><p>我们来看看策略模式 UML 图的结构：</p>',7),r=s(`<p>从该 UML 图中，我们能看出策略模式包含了三个关键角色。</p><ul><li><p><strong>上下文信息类</strong>（Context）：用于存放和执行需要使用的具体策略类以及客户端调用的逻辑。</p></li><li><p><strong>抽象策略类</strong>（Strategy）：定义策略的共有方法。</p></li><li><p><strong>具体策略类</strong>（StrategyA 等）：实现抽象策略类定义的共有方法。</p></li></ul><p>下面我们再来看看 UML 对应的代码实现：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Context</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">request</span><span style="color:#E1E4E8;">(Strategy </span><span style="color:#FFAB70;">s</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        s.</span><span style="color:#B392F0;">operation</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">interface</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Strategy</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">operation</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">StrategyA</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">implements</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Strategy</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Override</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">operation</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;=== 执行策略 A ......&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">StrategyB</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">implements</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Strategy</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Override</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">operation</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;=== 执行策略 B ......&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Context</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">request</span><span style="color:#24292E;">(Strategy </span><span style="color:#E36209;">s</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        s.</span><span style="color:#6F42C1;">operation</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">interface</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Strategy</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">operation</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">StrategyA</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">implements</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Strategy</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Override</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">operation</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;=== 执行策略 A ......&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">StrategyB</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">implements</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Strategy</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Override</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">operation</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;=== 执行策略 B ......&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>从上面的代码实现我们能看出，<strong>策略模式的本质就是通过上下文信息类来作为中心控制单元，对不同的策略进行调度分配。</strong></p><h3 id="使用场景分析" tabindex="-1">使用场景分析 <a class="header-anchor" href="#使用场景分析" aria-label="Permalink to &quot;使用场景分析&quot;">​</a></h3><p>策略模式常见的使用场景有以下几种。</p><ul><li><p>系统中需要动态切换几种算法的场景。</p></li><li><p>使用多重的条件选择语句来实现的业务场景。</p></li><li><p>只希望客户端选择已经封装好的算法场景而不用关心算法实现细节。</p></li><li><p>分离使用策略和创建策略的场景。</p></li></ul><p>为了帮助你更好地理解策略模式的使用场景，下面我们还是通过一个简单的例子来演示说明。在日常的网上购物中，我们都希望购买到价格实惠的商品，而网站通常也会定期搞一些促销活动，比如，满 XXX 元减 XX 元、N 折扣、M 元秒杀等。这些活动通常是运营部门来制定的，运营希望能通过商品编号来推荐不同的促销活动。这时，作为系统的开发者，我们就需要开发针对一系列的营销策略进行推荐的系统功能。</p><p>那具体该怎么来实现呢？</p><p>首先，我们来定义策略 API------PromotionStrategy，每一种促销策略的算法都要实现该接口。该接口有一个 recommand 方法，接收并返回一个 int 对象，返回的就是推荐后可以参加的促销活动。实际上，推荐返回的可能是一个活动对象，这里我用简单的数字代替。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">interface</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">PromotionStrategy</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 返回1 代表 可以参加 满减活动</span></span>
<span class="line"><span style="color:#6A737D;">     * 返回2 代表 可以参加 N折优惠活动</span></span>
<span class="line"><span style="color:#6A737D;">     * 返回3 代表 可以参加 M元秒杀活动</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">recommand</span><span style="color:#E1E4E8;">(String </span><span style="color:#FFAB70;">skuId</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">interface</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">PromotionStrategy</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 返回1 代表 可以参加 满减活动</span></span>
<span class="line"><span style="color:#6A737D;">     * 返回2 代表 可以参加 N折优惠活动</span></span>
<span class="line"><span style="color:#6A737D;">     * 返回3 代表 可以参加 M元秒杀活动</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">recommand</span><span style="color:#24292E;">(String </span><span style="color:#E36209;">skuId</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>接下来，我们有三个类实现了 PromotionStrategy 接口，分别代表满减策略、N 折扣优惠活动策略和 M 元秒杀活动策略，类分别是 FullReduceStrategy、NPriceDiscountStrategy 和 MSpikeStrategy。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">FullReduceStrategy</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">implements</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">PromotionStrategy</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Override</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">recommand</span><span style="color:#E1E4E8;">(String </span><span style="color:#FFAB70;">skuId</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;=== 执行 满减活动&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">//推荐算法和逻辑写这里</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">NPriceDiscountStrategy</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">implements</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">PromotionStrategy</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Override</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">recommand</span><span style="color:#E1E4E8;">(String </span><span style="color:#FFAB70;">skuId</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;=== 执行 N 折扣优惠活动&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">//推荐算法和逻辑写这里</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">MSpikeStrategy</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">implements</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">PromotionStrategy</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Override</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">recommand</span><span style="color:#E1E4E8;">(String </span><span style="color:#FFAB70;">skuId</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;=== 执行 M 元秒杀活动&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">//推荐算法和逻辑写这里</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">3</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">FullReduceStrategy</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">implements</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">PromotionStrategy</span><span style="color:#24292E;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Override</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">recommand</span><span style="color:#24292E;">(String </span><span style="color:#E36209;">skuId</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;=== 执行 满减活动&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">//推荐算法和逻辑写这里</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">NPriceDiscountStrategy</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">implements</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">PromotionStrategy</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Override</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">recommand</span><span style="color:#24292E;">(String </span><span style="color:#E36209;">skuId</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;=== 执行 N 折扣优惠活动&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">//推荐算法和逻辑写这里</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">MSpikeStrategy</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">implements</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">PromotionStrategy</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Override</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">recommand</span><span style="color:#24292E;">(String </span><span style="color:#E36209;">skuId</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;=== 执行 M 元秒杀活动&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">//推荐算法和逻辑写这里</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">3</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>现在我们可以动手实现促销推荐的上下文信息类 Promotional，这里是存储和使用策略的地方。类中有一个 recommand 方法，用于执行推荐策略。它的构造函数有一个 PromotionStrategy 参数，可以在运行期间使用该参数决定使用哪种促销策略。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Promotional</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">final</span><span style="color:#E1E4E8;"> PromotionStrategy strategy;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Promotional</span><span style="color:#E1E4E8;">(PromotionStrategy </span><span style="color:#FFAB70;">strategy</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.strategy </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> strategy;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">recommand</span><span style="color:#E1E4E8;">(String </span><span style="color:#FFAB70;">skuId</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        strategy.</span><span style="color:#B392F0;">recommand</span><span style="color:#E1E4E8;">(skuId);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Promotional</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">final</span><span style="color:#24292E;"> PromotionStrategy strategy;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Promotional</span><span style="color:#24292E;">(PromotionStrategy </span><span style="color:#E36209;">strategy</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.strategy </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> strategy;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">recommand</span><span style="color:#24292E;">(String </span><span style="color:#E36209;">skuId</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        strategy.</span><span style="color:#6F42C1;">recommand</span><span style="color:#24292E;">(skuId);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>最后，我们通过一个简单的单元测试代码来看下具体的运行结果。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Client</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">String</span><span style="color:#E1E4E8;">[] </span><span style="color:#FFAB70;">args</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        Promotional fullReducePromotional </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Promotional</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">FullReduceStrategy</span><span style="color:#E1E4E8;">());</span></span>
<span class="line"><span style="color:#E1E4E8;">        fullReducePromotional.</span><span style="color:#B392F0;">recommand</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;1122334455&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">        Promotional nPriceDiscountPromotional </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Promotional</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">NPriceDiscountStrategy</span><span style="color:#E1E4E8;">());</span></span>
<span class="line"><span style="color:#E1E4E8;">        nPriceDiscountPromotional.</span><span style="color:#B392F0;">recommand</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;6677889900&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">        Promotional mSpikePromotional </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Promotional</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">MSpikeStrategy</span><span style="color:#E1E4E8;">());</span></span>
<span class="line"><span style="color:#E1E4E8;">        mSpikePromotional.</span><span style="color:#B392F0;">recommand</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;11335577&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#6A737D;">//输出结果</span></span>
<span class="line"><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> 执行 满减活动</span></span>
<span class="line"><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> 执行 n折扣优惠活动</span></span>
<span class="line"><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> 执行 m元秒杀活动</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Client</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">String</span><span style="color:#24292E;">[] </span><span style="color:#E36209;">args</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        Promotional fullReducePromotional </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Promotional</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">FullReduceStrategy</span><span style="color:#24292E;">());</span></span>
<span class="line"><span style="color:#24292E;">        fullReducePromotional.</span><span style="color:#6F42C1;">recommand</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;1122334455&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        Promotional nPriceDiscountPromotional </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Promotional</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">NPriceDiscountStrategy</span><span style="color:#24292E;">());</span></span>
<span class="line"><span style="color:#24292E;">        nPriceDiscountPromotional.</span><span style="color:#6F42C1;">recommand</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;6677889900&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        Promotional mSpikePromotional </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Promotional</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">MSpikeStrategy</span><span style="color:#24292E;">());</span></span>
<span class="line"><span style="color:#24292E;">        mSpikePromotional.</span><span style="color:#6F42C1;">recommand</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;11335577&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#6A737D;">//输出结果</span></span>
<span class="line"><span style="color:#D73A49;">===</span><span style="color:#24292E;"> 执行 满减活动</span></span>
<span class="line"><span style="color:#D73A49;">===</span><span style="color:#24292E;"> 执行 n折扣优惠活动</span></span>
<span class="line"><span style="color:#D73A49;">===</span><span style="color:#24292E;"> 执行 m元秒杀活动</span></span></code></pre></div><p>以上代码演示了一个使用策略模式的基本流程，在实际的开发中，策略类可能会包含复杂的逻辑，这里就不再展开详细讲述了。</p><h3 id="为什么使用策略模式" tabindex="-1">为什么使用策略模式？ <a class="header-anchor" href="#为什么使用策略模式" aria-label="Permalink to &quot;为什么使用策略模式？&quot;">​</a></h3><p>分析完策略模式的原理和使用场景后，我们再来说说使用策略模式的原因，主要有以下三个。</p><p><strong>第一个，为了提升代码的可维护性。</strong> 在实际开发中，有许多算法可以实现某一功能，如查找、排序等，通过 if-else 等条件判断语句来进行选择非常方便。但是这就会带来一个问题：当在这个算法类中封装了大量查找算法时，该类的代码就会变得非常复杂，维护也会突然就变得非常困难。虽然策略模式看上去比较笨重，但实际上在每一次新增策略时都通过新增类来进行隔离，短期虽然不如直接写 if-else 来得效率高，但长期来看，维护单一的简单类耗费的时间其实远远低于维护一个超大的复杂类。</p><p><strong>第二个，为了动态快速地替换更多的算法。</strong> 从上面的分析你会发现，策略模式最大的作用在于分离使用算法的逻辑和算法自身实现的逻辑，这样就意味着当我们想要优化算法自身的实现逻辑时就变得非常便捷，一方面可以采用最新的算法实现逻辑，另一方面可以直接弃用旧算法而采用新算法。使用策略模式能够很方便地进行替换。</p><p><strong>第三个，为了应对需要频繁更换策略的场景。</strong> 比如，用户推荐类场景。特别是对于一些 C 端产品来说，在获取了用户的反馈数据后，会根据用户的特性制定不同的运营策略，这时如果采用 if-else 的方式编码，那么每一次的策略变化都会导致系统代码的修改，从运营的角度看是不可接受的，而采用策略模式就能很容易地解决这个问题。</p><h3 id="收益什么-损失什么" tabindex="-1">收益什么？损失什么？ <a class="header-anchor" href="#收益什么-损失什么" aria-label="Permalink to &quot;收益什么？损失什么？&quot;">​</a></h3><p>通过上面的分析，我们可以得出使用策略模式主要有以下几个优点。</p><ul><li><p><strong>提供良好的代码扩展性。</strong> 每一个策略都是对应生成一个新的具体策略类，满足开闭原则，同时满足里氏替换原则，可以任意替换相同的策略，这样用户可以在不修改原有系统的基础上选择算法或行为，同时也可以灵活地增加新的算法或行为。</p></li><li><p><strong>提供了一种管理多个不同算法策略的办法。</strong> 策略模式提供了一种很好的思路，可以将算法的实现和使用算法的代码隔离开来，这样就能很好地管理不同的算法。</p></li><li><p><strong>提供使用组合替换继承的办法。</strong> 策略模式使用组合的方式来替代继承，避免了子类出现异常而影响父类。</p></li><li><p><strong>能够降低使用多重条件（if-else）嵌套语句的理解难度。</strong> 在实际的开发中，使用 if-else 是非常常见的编程方法，但是随着业务逻辑变得越来越复杂，如果一味地增加 if-else，会让代码变得非常难以理解和维护，使用策略模式则能避免这些问题的出现。</p></li><li><p><strong>在运行时动态切换算法，提升代码灵活性。</strong> 由于策略模式将算法的选择权交给了客户端，那么客户端可以根据自身的需求灵活地切换算法。</p></li></ul><p>同样，策略模式也不是万能的，它也有一些缺点。</p><ul><li><p><strong>客户端的学习成本变高。</strong> 虽然策略模式让客户端自行决定使用哪一个策略，看上去很自由，但实际上隐含着客户必须要知道所有的策略才能做选择的事实。一旦新增或修改策略，客户端都需要知道。</p></li><li><p><strong>具体策略类的数量会剧增，增加维护成本。</strong> 由于每一个策略都对应一个具体策略类，所以当策略比较庞大时，需要维护的类数量也会激增。</p></li><li><p><strong>不如函数式编程简洁。</strong> 现在有很多编程语言都支持函数式------允许在一组匿名函数中实现不同版本的算法。对于一些小型的策略来说，使用函数式编程就能解决问题，但使用策略模式反而过于复杂。</p></li></ul><h3 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h3><p>策略模式最大的用处是能在运行时改变代码的算法行为，同时给使用者提供一种可以根据情况来选择算法的途径。</p><p>虽然策略模式是一个比较容易理解和使用的设计模式，但是却增加了使用者的难度，因为你可能需要在了解了所有的策略后才能做出决策。即便是类似排序这样简单的算法，不同使用者的选择也可能完全不同，如果交给使用者来选择，就意味着使用者需要了解不同排序算法的优劣，才能更好地做出选择。</p><p>不过，<strong>策略模式对算法起到了很好的封装作用</strong>，通过使用算法和创建算法的分离，将算法实现的复杂性放到了子类去解决。同时，策略模式还可以随时进行替换，对于一些老旧的算法，可以很方便地进行替换和升级。</p><h3 id="课后思考" tabindex="-1">课后思考 <a class="header-anchor" href="#课后思考" aria-label="Permalink to &quot;课后思考&quot;">​</a></h3><p>在你所参与过的项目中，都是怎样使用策略模式的？有没有替换策略模式的其他办法？欢迎你在留言区与我分享。</p><p>在下一讲，我会接着与你分享&quot;状态模式&quot;的相关内容，记得按时来听课！</p>`,36);function E(y,i,F,u,d,g){const n=l("Image");return p(),o("div",null,[c,e(n,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image6/M00/47/FC/Cgp9HWDS7MWASWCCAABHonUvg7A429.png"}),r])}const D=a(t,[["render",E]]);export{A as __pageData,D as default};
