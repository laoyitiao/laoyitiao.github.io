import{_ as o,j as t,o as e,g as r,k as a,Q as l,s,h as p}from"./chunks/framework.b3d8e22e.js";const k=JSON.parse('{"title":"高内聚、低耦合：职责分离的目标 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/趣学设计模式_文档/(6872) 11  职责原则：如何在代码设计中实现职责分离？.md","filePath":"posts/backEnd/趣学设计模式_文档/(6872) 11  职责原则：如何在代码设计中实现职责分离？.md","lastUpdated":1696417798000}'),c={name:"posts/backEnd/趣学设计模式_文档/(6872) 11  职责原则：如何在代码设计中实现职责分离？.md"},E=l('<p>在面向对象编程中，你是不是经常听到&quot;要实现代码间的职责分离&quot;，但是具体什么样的代码才算得上是清晰的职责分离，似乎却又总是模糊不清。比如：</p><ul><li><p>代码模块越多职责越清晰？</p></li><li><p>按照需求来分配职责就是职责分离？</p></li><li><p>模块化就是职责分离？</p></li></ul><p>实际上，你要想写出&quot;职责分离&quot;的代码，单从字面含义是很难下手的，因为业界并没有统一的通用标准。比如，什么是职责分离？为什么职责分离很重要？具体如何实现职责分离？</p><p>所以，今天我们就一起带着这些问题来学习与理解职责分离。</p><h3 id="高内聚、低耦合-职责分离的目标" tabindex="-1">高内聚、低耦合：职责分离的目标 <a class="header-anchor" href="#高内聚、低耦合-职责分离的目标" aria-label="Permalink to &quot;高内聚、低耦合：职责分离的目标&quot;">​</a></h3><p>什么是职责？在《敏捷软件开发：原则、模式与实践》这本书中，把&quot;职责&quot;定义为&quot;变化的原因&quot;。如果你能够想到多于一个的动机去改变一个类，那么这个类就具有多于一个的职责。</p><p>那什么是职责分离？为了更好地理解职责分离，我们先从一个熟悉而又陌生的概念讲起，那就是内聚。</p><p>这里我们结合一个例子来说明一下，如下图所示：</p>',8),y=s("p",null,'在该图中，模块按照相对小的功能进行划分（数字表示，比如模块 1），这里我们假设业务领域已经被分析为有三个不同的功能，并放在了一个模块内（叫"我的模块"），其中，模块 A、B、C 之间没有什么共同的职责，分别在独立的数据上运行。',-1),i=s("p",null,"你有没有一种有种曾相似的感觉？没错，常见的 Controller+Service+Dao 里的各种功能多是这样的组织形式，看上去很漂亮的结构，但实际上却是最混乱的，俗称大泥球结构，这也是内聚度很低的一种模式。",-1),F=s("p",null,'观察上面的关系图你会发现，八个模块都依赖着"我的模块"。在这种情况下，如果想要在系统中的其他模块使用功能 A、B 或 C，那么调用就会依赖整个"我的模块"，这显然导致了太多的依赖，大大降低了可维护性。',-1),u=s("p",null,"那么，为了提高内聚性，我们就应该对功能进行分离，如下图所示：",-1),d=s("p",null,"很明显，现在每个模块的依赖比原来少了很多，模块 A、B、C 之间没有直接的关系，并且模块 3 是唯一一个依赖模块 A 和模块 C 的模块。这样带来的好处是，当我们依赖 A 或 B 或 C 时，能够清晰地知道它们依赖了哪些模块，也就是下次修改代码时影响的模块有哪些，将变更风险控制在有限范围内。这样才算是做到了真正的高内聚，也就是各个模块专注于自己最重要的某个职责，并建立起与其他模块之间清晰的界限。",-1),g=s("p",null,[p("所以说，"),s("strong",null,"内聚本质上表示的是系统内部的各个部分对同一个问题的专注程度，以及这些部分彼此之间联系的紧密性"),p("。")],-1),q=s("p",null,"你可能也注意到，对同一个问题的专注程度才是判断内聚高低的标准，而职责分离只是实现高内聚的一种方法而已。",-1),A=l(`<p>那么，现在我们就可以来回答&quot;什么是职责分离&quot;这个问题了。简单来说，<strong>职责分离就是将不同变化原因引起的类或方法修改行为拆分到不同类或方法里去。</strong></p><h3 id="职责分离的重要性" tabindex="-1">职责分离的重要性 <a class="header-anchor" href="#职责分离的重要性" aria-label="Permalink to &quot;职责分离的重要性&quot;">​</a></h3><p>那为什么职责分离很重要呢？我总结了下，主要有三点原因。</p><p><strong>第一点，直接对问题进行对象建模，方便厘清构建逻辑</strong>。在面向对象编程中，通常都会建议你将现实中的事物或问题翻译成对象，这样更&quot;拟人化&quot;，也能更好地进行编码实现，就好比让每一个代码模块能够像人一样具备自己的属性和行为，只需要指定特定的职责就能让各自模块运行良好，而不是像面向过程编程那样把所有的功能都放在一起。比如，针对商品属性相关的问题，我们可以建立商品基本信息对象、赠品信息对象、活动商品对象等各类对象，然后通过不同的职责关联统一起来，这样在修改时就能通过清晰的职责边界来理解代码逻辑关系了。</p><p><strong>第二点，将问题分解为各种职责，更有利于系统的测试、调试和维护</strong>。比如，开发一个电商系统，你一定不会把所有的系统（订单、物流、商品、支付）都放在一起，因为这样不仅不利于理解系统，而且其中任何一个子系统的代码修改都会影响到别的系统。除此之外，职责分离不够的系统，测试起来也会非常痛苦，因为每一次的修改不敢保证不会影响别的系统，那么就需要测试相关联的系统，这样大大降低了交付效率，同时还会因为测试不充分而出现线上问题。</p><p><strong>第三点，提高系统的可扩展性</strong>。虽然可扩展性是现代软件设计的必选项之一，但是很多系统在前期时间紧、任务重的情况下几乎都会放弃一部分扩展性，于是矛盾就出现了，系统已经上线，但用户需求却不断变化，这时如果需要添加一些新东西，那么你就需要改动所有没有清晰划分职责的地方，这样势必影响系统的运行。但如果做好了职责划分，那么你就只需要改动具有相应职责的类，而不会影响到系统的其他部分，这样不仅能提高系统的可扩展性，还降低了代码修改引入风险的概率。</p><h3 id="职责分离的时机" tabindex="-1">职责分离的时机 <a class="header-anchor" href="#职责分离的时机" aria-label="Permalink to &quot;职责分离的时机&quot;">​</a></h3><p>在编码实现中，职责分离的时机大致有三个：</p><ul><li><p>命名太过于笼统；</p></li><li><p>改动代码后的测试规模很大；</p></li><li><p>类和方法过大。</p></li></ul><p>下面我们就来详细说明下。</p><p>首先，<strong>命名太过于笼统时是职责分离的好时机。</strong> 你一定希望类、方法和其他对象（包、服务等）的命名能够直接反映出它们的作用，同时还要足够简短，方便记忆。如果命名过长或表述模糊，通常可能是因为类或方法包含的职责过多而无法筛选出职责的优先级，这样的类随着修改越多，问题出现的概率也越高。这时就是进行职责分离的好时机，通过将不同职责拆分出来，就能很好地限定问题范围，即便出现问题需要修改也只是在限定范围内修改，不会影响到其他模块。</p><p>其次，<strong>如果每次修改代码都要重新进行一次全量测试，那么这也是进行职责分离的好时机</strong>。&quot;修改一处影响全部&quot;可以说是开发和测试都不愿意面对的情况之一，这说明代码耦合性高、内聚度低。换句话说就是，代码中的职责过多，彼此之间相互影响。这时可以通过修改代码处的职责来进行代码重构，找出合适的职责进行分离，逐步减小全量测试的范围，这样就能减少职责之间的相互干扰。</p><p>最后，<strong>遇见超大类或方法也是一个时机。</strong> 绝大多数情况下，超大的类或方法都是职责划分不清导致的代码过度耦合（当然，有的算法实现本身就很复杂，进而导致出现超长的方法，这种情况不在这次的讨论范围内）。比如，当一个类包含了太多的其他类时，可以用一个简单的原则来判断职责是否过多，那就是：能否拆分出来更多的子类？如果不能，那么这个类很可能就是高内聚的，职责比较单一；如果能，那么这个类还不够内聚，职责还有多余的。</p><h3 id="如何通过职责分离实现高内聚" tabindex="-1">如何通过职责分离实现高内聚 <a class="header-anchor" href="#如何通过职责分离实现高内聚" aria-label="Permalink to &quot;如何通过职责分离实现高内聚&quot;">​</a></h3><p>职责分离更多的是一种设计思想和编程技巧，主要的理念就是将模糊笼统的问题拆分为多个清晰单一的问题。而<strong>实现职责分离的核心技巧就在于寻找互相不重合的的职责</strong>。</p><p>这里我们演示一个通过分离职责实现真正内聚的例子，如下面的反转字符串的处理程序代码所示：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Application</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">process</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">String</span><span style="color:#E1E4E8;">[] </span><span style="color:#FFAB70;">words</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> i </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">; i </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;"> words.length; i</span><span style="color:#F97583;">++</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            String arg </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> j </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> words[i].</span><span style="color:#B392F0;">length</span><span style="color:#E1E4E8;">(); j </span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">; j</span><span style="color:#F97583;">--</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                arg</span><span style="color:#F97583;">+=</span><span style="color:#E1E4E8;">words[i].</span><span style="color:#B392F0;">substring</span><span style="color:#E1E4E8;">(j</span><span style="color:#F97583;">-</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">,j);</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">            System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(arg);</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (words.length </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">){</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (words[</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">].</span><span style="color:#B392F0;">toLowerCase</span><span style="color:#E1E4E8;">().</span><span style="color:#B392F0;">equals</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;hello&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">                    </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> words[</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">].</span><span style="color:#B392F0;">toLowerCase</span><span style="color:#E1E4E8;">().</span><span style="color:#B392F0;">equals</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;world&quot;</span><span style="color:#E1E4E8;">)){</span></span>
<span class="line"><span style="color:#E1E4E8;">                System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;...bingo&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">String</span><span style="color:#E1E4E8;">[] </span><span style="color:#FFAB70;">args</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">process</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">String</span><span style="color:#E1E4E8;">[]{</span><span style="color:#9ECBFF;">&quot;test&quot;</span><span style="color:#E1E4E8;">,</span><span style="color:#9ECBFF;">&quot;is&quot;</span><span style="color:#E1E4E8;">,</span><span style="color:#9ECBFF;">&quot;a&quot;</span><span style="color:#E1E4E8;">,</span><span style="color:#9ECBFF;">&quot;mighty,hahaah,world&quot;</span><span style="color:#E1E4E8;">});</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">process</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">String</span><span style="color:#E1E4E8;">[]{</span><span style="color:#9ECBFF;">&quot;hello&quot;</span><span style="color:#E1E4E8;">,</span><span style="color:#9ECBFF;">&quot;world&quot;</span><span style="color:#E1E4E8;">});</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Application</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">process</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">String</span><span style="color:#24292E;">[] </span><span style="color:#E36209;">words</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> i </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">; i </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;"> words.length; i</span><span style="color:#D73A49;">++</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">            String arg </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> j </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> words[i].</span><span style="color:#6F42C1;">length</span><span style="color:#24292E;">(); j </span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">; j</span><span style="color:#D73A49;">--</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">                arg</span><span style="color:#D73A49;">+=</span><span style="color:#24292E;">words[i].</span><span style="color:#6F42C1;">substring</span><span style="color:#24292E;">(j</span><span style="color:#D73A49;">-</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">,j);</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">            System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(arg);</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (words.length </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2</span><span style="color:#24292E;">){</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (words[</span><span style="color:#005CC5;">0</span><span style="color:#24292E;">].</span><span style="color:#6F42C1;">toLowerCase</span><span style="color:#24292E;">().</span><span style="color:#6F42C1;">equals</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;hello&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">                    </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> words[</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">].</span><span style="color:#6F42C1;">toLowerCase</span><span style="color:#24292E;">().</span><span style="color:#6F42C1;">equals</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;world&quot;</span><span style="color:#24292E;">)){</span></span>
<span class="line"><span style="color:#24292E;">                System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;...bingo&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">String</span><span style="color:#24292E;">[] </span><span style="color:#E36209;">args</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">process</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">String</span><span style="color:#24292E;">[]{</span><span style="color:#032F62;">&quot;test&quot;</span><span style="color:#24292E;">,</span><span style="color:#032F62;">&quot;is&quot;</span><span style="color:#24292E;">,</span><span style="color:#032F62;">&quot;a&quot;</span><span style="color:#24292E;">,</span><span style="color:#032F62;">&quot;mighty,hahaah,world&quot;</span><span style="color:#24292E;">});</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">process</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">String</span><span style="color:#24292E;">[]{</span><span style="color:#032F62;">&quot;hello&quot;</span><span style="color:#24292E;">,</span><span style="color:#032F62;">&quot;world&quot;</span><span style="color:#24292E;">});</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>这是一段非常简单的代码，代码的功能是：接收命令行的任意字符串参数，然后反转每个字符，并检查反转后的字符是否为&quot;hello world&quot;，如果是，则打印一条信息。</p><p>虽然这段代码很短，但是它的内聚性非常差。为什么呢？你可以从 process () 方法看出问题所在，process() 这个名称并没有告诉你方法实现了什么操作，而如果要以正规方式命名这个方法，通常会出现类似于这样的名称：reverseCharactersAndTestHelloWorld()，前面我们也说了，命名太过于笼统的通常就是内聚性较差的信号。</p><p>继续阅读代码，你也会发现，process() 方法要做的职责太多了，并且这些事情彼此又并不相关。</p><p>那么，我们该如何通过职责分离来优化代码呢？直接看代码，如下所示：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ApplicationOpt</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">process</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">String</span><span style="color:#E1E4E8;">[] </span><span style="color:#FFAB70;">words</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> i </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">; i </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;"> words.length; i</span><span style="color:#F97583;">++</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#B392F0;">reversecharacters</span><span style="color:#E1E4E8;">(words[i]);</span></span>
<span class="line"><span style="color:#E1E4E8;">            System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(words[i]);</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#B392F0;">isHelloWorld</span><span style="color:#E1E4E8;">(words)) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;...bingo&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> String </span><span style="color:#B392F0;">reversecharacters</span><span style="color:#E1E4E8;">(String </span><span style="color:#FFAB70;">forward</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        String reverse </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> j </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> forward.</span><span style="color:#B392F0;">length</span><span style="color:#E1E4E8;">(); j </span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">; j</span><span style="color:#F97583;">--</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            reverse </span><span style="color:#F97583;">+=</span><span style="color:#E1E4E8;"> forward.</span><span style="color:#B392F0;">substring</span><span style="color:#E1E4E8;">(j </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">, j);</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> reverse;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">boolean</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">isHelloWorld</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">String</span><span style="color:#E1E4E8;">[] </span><span style="color:#FFAB70;">names</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (names.length </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">){</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (names[</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">].</span><span style="color:#B392F0;">toLowerCase</span><span style="color:#E1E4E8;">().</span><span style="color:#B392F0;">equals</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;hello&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">                    </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> names[</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">].</span><span style="color:#B392F0;">toLowerCase</span><span style="color:#E1E4E8;">().</span><span style="color:#B392F0;">equals</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;world&quot;</span><span style="color:#E1E4E8;">)){</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">false</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">String</span><span style="color:#E1E4E8;">[] </span><span style="color:#FFAB70;">args</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        ApplicationOpt myApp </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ApplicationOpt</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        myApp.</span><span style="color:#B392F0;">process</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">String</span><span style="color:#E1E4E8;">[]{</span><span style="color:#9ECBFF;">&quot;test&quot;</span><span style="color:#E1E4E8;">,</span><span style="color:#9ECBFF;">&quot;is&quot;</span><span style="color:#E1E4E8;">,</span><span style="color:#9ECBFF;">&quot;a&quot;</span><span style="color:#E1E4E8;">,</span><span style="color:#9ECBFF;">&quot;mighty,hahaah,world&quot;</span><span style="color:#E1E4E8;">});</span></span>
<span class="line"><span style="color:#E1E4E8;">        myApp.</span><span style="color:#B392F0;">process</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">String</span><span style="color:#E1E4E8;">[]{</span><span style="color:#9ECBFF;">&quot;hello&quot;</span><span style="color:#E1E4E8;">,</span><span style="color:#9ECBFF;">&quot;world&quot;</span><span style="color:#E1E4E8;">});</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ApplicationOpt</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">process</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">String</span><span style="color:#24292E;">[] </span><span style="color:#E36209;">words</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> i </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">; i </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;"> words.length; i</span><span style="color:#D73A49;">++</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6F42C1;">reversecharacters</span><span style="color:#24292E;">(words[i]);</span></span>
<span class="line"><span style="color:#24292E;">            System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(words[i]);</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#6F42C1;">isHelloWorld</span><span style="color:#24292E;">(words)) {</span></span>
<span class="line"><span style="color:#24292E;">            System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;...bingo&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> String </span><span style="color:#6F42C1;">reversecharacters</span><span style="color:#24292E;">(String </span><span style="color:#E36209;">forward</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        String reverse </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> j </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> forward.</span><span style="color:#6F42C1;">length</span><span style="color:#24292E;">(); j </span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">; j</span><span style="color:#D73A49;">--</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">            reverse </span><span style="color:#D73A49;">+=</span><span style="color:#24292E;"> forward.</span><span style="color:#6F42C1;">substring</span><span style="color:#24292E;">(j </span><span style="color:#D73A49;">-</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">, j);</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> reverse;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">boolean</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">isHelloWorld</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">String</span><span style="color:#24292E;">[] </span><span style="color:#E36209;">names</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (names.length </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2</span><span style="color:#24292E;">){</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (names[</span><span style="color:#005CC5;">0</span><span style="color:#24292E;">].</span><span style="color:#6F42C1;">toLowerCase</span><span style="color:#24292E;">().</span><span style="color:#6F42C1;">equals</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;hello&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">                    </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> names[</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">].</span><span style="color:#6F42C1;">toLowerCase</span><span style="color:#24292E;">().</span><span style="color:#6F42C1;">equals</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;world&quot;</span><span style="color:#24292E;">)){</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">false</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">String</span><span style="color:#24292E;">[] </span><span style="color:#E36209;">args</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        ApplicationOpt myApp </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ApplicationOpt</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        myApp.</span><span style="color:#6F42C1;">process</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">String</span><span style="color:#24292E;">[]{</span><span style="color:#032F62;">&quot;test&quot;</span><span style="color:#24292E;">,</span><span style="color:#032F62;">&quot;is&quot;</span><span style="color:#24292E;">,</span><span style="color:#032F62;">&quot;a&quot;</span><span style="color:#24292E;">,</span><span style="color:#032F62;">&quot;mighty,hahaah,world&quot;</span><span style="color:#24292E;">});</span></span>
<span class="line"><span style="color:#24292E;">        myApp.</span><span style="color:#6F42C1;">process</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">String</span><span style="color:#24292E;">[]{</span><span style="color:#032F62;">&quot;hello&quot;</span><span style="color:#24292E;">,</span><span style="color:#032F62;">&quot;world&quot;</span><span style="color:#24292E;">});</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>这时，当你再读 process() 方法时，读到的是一系列步骤，每个步骤都由一个方法来实现，你也能很快区分每个方法具体负责的职责是什么。如果字符的反转不正确，你会知道去 reversecharacters() 方法里查找 Bug，因为反转字符的职责已明确分配给了合适的方法，而且只有这个方法执行这个操作。</p><p>虽然这个例子很简单，但是它给我们一个很重要的启示：<strong>按照职责进行分离能帮助我们转移对问题的关注点</strong> 。关注点其实就是用户关注的核心点，比如，例子中如果不分配职责，关注点就是处理字符串，但是处理字符串有很多方法和步骤，关注点太笼统了。而一旦开始尝试分离职责，你就会发现关注点发生了转移，也就是问题范围变小了。不过，在很多编码实现过程中，又很容易省略这个&quot;转移&quot;。因为哪怕是抽取一个方法，都会多耗费写代码的时间，而很多人实际上不愿意花这个时间，想等到有时间时再来优化。可等真的有时间时却发现代码逻辑千丝万缕，职责多到超出想象，根本优化不动。所以说，<strong>分离职责是一种将复杂问题拆分成可解决问题的有效方法</strong>。</p><h3 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h3><p>学习职责分离最重要的是要理解是什么原因引起了代码变化。搞清楚变化的原因，比一拿着需求就开始编码更为重要。</p><p>在编码过程中，我们很多人总以为按照功能需求分配好了职责，代码就能按照职责运行了，但实际上可能一开始连职责都分配错了。比如，我现在对一些维护项目做 Code Review 时，还会偶尔遇见超大的类和方法，其中 90% 的维护人员给的理由都是不想到处跳转寻找代码，只修改一个文件更方便维护。但修改一个文件不代表不影响其他文件，因为变化的原因没有被真正找出来，这样错误的认知到后期常常都是要付出惨痛代价的。</p><p>在程序设计中，分配职责的常常是人，而人在大多时候是无法做到精准分配的，甚至会出现重复或错误的分配。<strong>只有有意识地进行职责分离，才能提高代码的可维护性</strong>。</p><p>这里还需要说明的是，虽然高内聚常和低耦合一起被提及，但是在我看来，高内聚不一定都是低耦合，比如，订单与商品系统，可能只是因为联系特别紧密，才需要强耦合在一起，你不能说订单系统下单成功，商品系统却说故障了没有商品，这是不行的。另外，低内聚也可能是低耦合，比如，针对一个上传文件功能，你开发了 100 个模块，每个模块和另一个模块只有一个链接，但整体功能和关系却可能异常复杂。</p><p>所以，你在应用职责分离原则时，要把握好拆分的力度，尽量朝着单一职责的目标去做，但如果实在不好做，那么控制在有限范围内就好。</p>`,30),C=s("h3",{id:"课后思考",tabindex:"-1"},[p("课后思考 "),s("a",{class:"header-anchor",href:"#课后思考","aria-label":'Permalink to "课后思考"'},"​")],-1),h=s("p",null,"学习了职责原则后，你觉得在日常的开发编码中，什么情况下最容易做职责分离？什么情况下最难做？",-1),_=s("p",null,"欢迎留言分享，我会第一时间给你回复。",-1),B=s("p",null,'在下一讲，我会接着与你分享"面向对象原则：面向对象编程框架到底长什么样？"的相关内容，记得按时来听课！',-1);function D(m,w,v,S,b,f){const n=t("Image");return e(),r("div",null,[E,a(n,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image6/M00/37/9E/CioPOWB3-nyAQDkTAACdLcm5p6E692.png"}),y,i,F,u,a(n,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image6/M00/37/9E/CioPOWB3-oSAanL9AAFTcHjT6eo491.png"}),d,g,q,a(n,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image6/M00/37/9E/CioPOWB3-o-AdUj4AAXk1X0cnpc956.png"}),A,a(n,{alt:"Drawing 5.png",src:"https://s0.lgstatic.com/i/image6/M00/37/9D/Cgp9HWB4CH-ATPMCAAX84O2cK4I008.png"}),C,h,_,B])}const T=o(c,[["render",D]]);export{k as __pageData,T as default};
