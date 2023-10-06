import{_ as o,j as e,o as t,g as c,k as l,h as a,Q as p,s}from"./chunks/framework.b3d8e22e.js";const B=JSON.parse('{"title":"什么是迪米特法则 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/趣学设计模式_文档/趣学设计模式_文档/(6870) 09  最少原则：如何实现“最少知识”代码？.md","filePath":"posts/backEnd/趣学设计模式_文档/趣学设计模式_文档/(6870) 09  最少原则：如何实现“最少知识”代码？.md","lastUpdated":1696417798000}'),r={name:"posts/backEnd/趣学设计模式_文档/趣学设计模式_文档/(6870) 09  最少原则：如何实现“最少知识”代码？.md"},E=p(`<p>在实际的软件开发中，我们经常会写下面这样的代码：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">final</span><span style="color:#E1E4E8;"> String outputDir </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> ctxt.</span><span style="color:#B392F0;">getOptions</span><span style="color:#E1E4E8;">().</span><span style="color:#B392F0;">getScratchDir</span><span style="color:#E1E4E8;">().</span><span style="color:#B392F0;">getAbsolutePath</span><span style="color:#E1E4E8;">();</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">final</span><span style="color:#24292E;"> String outputDir </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> ctxt.</span><span style="color:#6F42C1;">getOptions</span><span style="color:#24292E;">().</span><span style="color:#6F42C1;">getScratchDir</span><span style="color:#24292E;">().</span><span style="color:#6F42C1;">getAbsolutePath</span><span style="color:#24292E;">();</span></span></code></pre></div><p>代码看上去没有太大的问题，但实际上其中任意一个方法发生变化时，这段代码都需要修改。因为调用是依赖的每一个细节，不仅增加了耦合，也使代码结构僵化。</p><p><strong>迪米特法则正是为了避免对象间出现这样过多的细节依赖而被提出来</strong>，所以今天我们就来一起了解下迪米特法则带给我们的一些启示。</p><h3 id="什么是迪米特法则" tabindex="-1">什么是迪米特法则 <a class="header-anchor" href="#什么是迪米特法则" aria-label="Permalink to &quot;什么是迪米特法则&quot;">​</a></h3><p><strong>迪米特法则（Law of Demeter，简称 LoD）</strong> 是由 Ian Holland 于 1987 年提出来的，它的核心原则是：</p><ul><li><p><strong>一个类只应该与它直接相关的类通信</strong>；</p></li><li><p><strong>每一个类应该知道自己需要的最少知识</strong>。</p></li></ul><p>换句话说，在面向对象编程中，它要求任何一个对象（O）的方法（m），只应该调用以下对象：</p><ul><li><p>对象（O）自身；</p></li><li><p>通过方法（m）的参数传入的对象；</p></li><li><p>在方法（m）内创建的对象；</p></li><li><p>组成对象（O）的对象；</p></li><li><p>在方法（m）的范围内，可让对象（O）访问的全局变量。</p></li></ul><p>前面 <a href="https://kaiwu.lagou.com/course/courseInfo.htm?courseId=710&amp;sid=20-h5Url-0&amp;buyFrom=2&amp;pageId=1pz4#/detail/pc?id=6864&amp;fileGuid=xxQTRXtVcqtHK6j8" target="_blank" rel="noreferrer">03</a> 讲我们讲过的<strong>分层架构，其实就可以被认为是迪米特法则在架构设计上的一种具体体现</strong>。在分层架构中，每一层的模块只能调用自己层中的模块，跳过某一层直接调用另一层中的模块其实就是违反了分层架构的原则。</p><p>虽然迪米特法则符合封装的原理，但是却和聚合原则相冲突，因为对象需要尽可能少地考虑其他对象，不能轻易地和其他对象自由组合。</p><h3 id="如何实现满足迪米特法则的代码" tabindex="-1">如何实现满足迪米特法则的代码 <a class="header-anchor" href="#如何实现满足迪米特法则的代码" aria-label="Permalink to &quot;如何实现满足迪米特法则的代码&quot;">​</a></h3><p>下面我们通过一个经典案例来看下如何去实现满足迪米特法则的代码。</p><p>假设一个在超市购物的场景：顾客选好商品后，到收银台找收银员结账。这里我们定义一个顾客类（Customer）、收银员类（PaperBoy ）、钱包类（Wallet ），示例代码如下：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">//顾客</span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Customer</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> String firstName;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> String lastName;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> Wallet myWallet;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> String </span><span style="color:#B392F0;">getFirstName</span><span style="color:#E1E4E8;">(){</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> firstName;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> String </span><span style="color:#B392F0;">getLastName</span><span style="color:#E1E4E8;">(){</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> lastName;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> Wallet </span><span style="color:#B392F0;">getWallet</span><span style="color:#E1E4E8;">(){</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> myWallet;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#6A737D;">//钱包类</span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Wallet</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">float</span><span style="color:#E1E4E8;"> value;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">float</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">getTotalMoney</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> value;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">setTotalMoney</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">float</span><span style="color:#E1E4E8;"> </span><span style="color:#FFAB70;">newValue</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        value </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> newValue;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">addMoney</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">float</span><span style="color:#E1E4E8;"> </span><span style="color:#FFAB70;">deposit</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        value </span><span style="color:#F97583;">+=</span><span style="color:#E1E4E8;"> deposit;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">subtractMoney</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">float</span><span style="color:#E1E4E8;"> </span><span style="color:#FFAB70;">debit</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        value </span><span style="color:#F97583;">-=</span><span style="color:#E1E4E8;"> debit;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#6A737D;">//收银员</span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Paperboy</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">charge</span><span style="color:#E1E4E8;">(Customer </span><span style="color:#FFAB70;">myCustomer</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">float</span><span style="color:#E1E4E8;"> </span><span style="color:#FFAB70;">payment</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        payment </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">2f</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">        Wallet theWallet </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> myCustomer.</span><span style="color:#B392F0;">getWallet</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (theWallet.</span><span style="color:#B392F0;">getTotalMoney</span><span style="color:#E1E4E8;">() </span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> payment) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            theWallet.</span><span style="color:#B392F0;">subtractMoney</span><span style="color:#E1E4E8;">(payment);</span></span>
<span class="line"><span style="color:#E1E4E8;">        } </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">//钱不够的处理</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">//顾客</span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Customer</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> String firstName;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> String lastName;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> Wallet myWallet;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> String </span><span style="color:#6F42C1;">getFirstName</span><span style="color:#24292E;">(){</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> firstName;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> String </span><span style="color:#6F42C1;">getLastName</span><span style="color:#24292E;">(){</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> lastName;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> Wallet </span><span style="color:#6F42C1;">getWallet</span><span style="color:#24292E;">(){</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> myWallet;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#6A737D;">//钱包类</span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Wallet</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">float</span><span style="color:#24292E;"> value;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">float</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">getTotalMoney</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> value;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">setTotalMoney</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">float</span><span style="color:#24292E;"> </span><span style="color:#E36209;">newValue</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        value </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> newValue;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">addMoney</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">float</span><span style="color:#24292E;"> </span><span style="color:#E36209;">deposit</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        value </span><span style="color:#D73A49;">+=</span><span style="color:#24292E;"> deposit;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">subtractMoney</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">float</span><span style="color:#24292E;"> </span><span style="color:#E36209;">debit</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        value </span><span style="color:#D73A49;">-=</span><span style="color:#24292E;"> debit;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#6A737D;">//收银员</span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Paperboy</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">charge</span><span style="color:#24292E;">(Customer </span><span style="color:#E36209;">myCustomer</span><span style="color:#24292E;">, </span><span style="color:#D73A49;">float</span><span style="color:#24292E;"> </span><span style="color:#E36209;">payment</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        payment </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2f</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">        Wallet theWallet </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> myCustomer.</span><span style="color:#6F42C1;">getWallet</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (theWallet.</span><span style="color:#6F42C1;">getTotalMoney</span><span style="color:#24292E;">() </span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> payment) {</span></span>
<span class="line"><span style="color:#24292E;">            theWallet.</span><span style="color:#6F42C1;">subtractMoney</span><span style="color:#24292E;">(payment);</span></span>
<span class="line"><span style="color:#24292E;">        } </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">//钱不够的处理</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>这里我们看一下当顾客开始进行结账操作（charge()）时，整段代码的具体实现逻辑是怎样的。</p><ul><li><p>收银员算出商品总价后说：&quot;拿出钱包交给我！&quot;</p></li><li><p>顾客将钱包递给收银员，收银员开始检查钱包里的钱是否够支付。</p></li><li><p>如果钱够了，收银员拿出相应的钱并退还钱包给顾客；如果钱不够，收银员告诉顾客钱不够需要想办法。</p></li></ul><p>虽然这个场景在现实中不会发生，但是对于这里的收银员类 PaperBoy 来说，直接调用 Wallet 显然是不满足迪米特法则的，因为 Wallet 是属于 Customer 的内部成员------组成对象（O）的对象。</p><p>当我们理解了迪米特法则后，要考虑的就应该是<strong>如何减少顾客和收银员之间的直接耦合</strong> 。而这里，<strong>通过钱这个要素来作为中间层进行解耦</strong>就是非常合适的选择。所以，在考虑收银员的角色时，就不应该去管钱包里的钱够不够，而应该是负责判断有没有收到足够的钱；同时，对于顾客角色，应该让他自己管好自己的钱包，只负责判断要支付多少钱。这样，顾客和收银员就不会因为钱包的职责划分不清而耦合在一起了。</p><p>接下来，我们来看看如何修改代码。</p><p>首先，我们将顾客&quot;获取钱包&quot;的动作修改为&quot;支付账单&quot;，代码修改前后对比如下图：</p>`,21),y=p(`<p>将 getWallet() 方法重构为 pay() 方法</p><p>这里我们将顾客支付这个动作封装成方法 pay 单独拆出来，并将收银员对于钱是否足够的判断动作交还给顾客，如下所示：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">float</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">pay</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">float</span><span style="color:#E1E4E8;"> bill) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (myWallet </span><span style="color:#F97583;">!=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (myWallet.</span><span style="color:#B392F0;">getTotalMoney</span><span style="color:#E1E4E8;">() </span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> bill) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                myWallet.</span><span style="color:#B392F0;">subtractMoney</span><span style="color:#E1E4E8;">(bill);</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> bill;</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">float</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">pay</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">float</span><span style="color:#24292E;"> bill) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (myWallet </span><span style="color:#D73A49;">!=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (myWallet.</span><span style="color:#6F42C1;">getTotalMoney</span><span style="color:#24292E;">() </span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> bill) {</span></span>
<span class="line"><span style="color:#24292E;">                myWallet.</span><span style="color:#6F42C1;">subtractMoney</span><span style="color:#24292E;">(bill);</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> bill;</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span></code></pre></div><p>其次，再将收银员&quot;获取顾客钱包&quot;的动作，修改为&quot;收取顾客支付的钱并和账单比对&quot;，代码对比如下图：</p>`,4),i=p(`<p>charge() 方法中的关注点发生改变</p><p>这里收银员的动作就从获取钱包变为根据收到的钱进行判断的动作，如下所示：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">PaperBoy</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">charge</span><span style="color:#E1E4E8;">(Customer </span><span style="color:#FFAB70;">myCustomer</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">float</span><span style="color:#E1E4E8;"> </span><span style="color:#FFAB70;">payment</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        payment </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">2f</span><span style="color:#E1E4E8;">; </span><span style="color:#6A737D;">// &quot;我要收取2元!&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">float</span><span style="color:#E1E4E8;"> paidAmount </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> myCustomer.</span><span style="color:#B392F0;">pay</span><span style="color:#E1E4E8;">(payment);</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (paidAmount </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> payment) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// 说声谢谢，欢迎下次光临</span></span>
<span class="line"><span style="color:#E1E4E8;">        } </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// 可以稍后再来</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">PaperBoy</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">charge</span><span style="color:#24292E;">(Customer </span><span style="color:#E36209;">myCustomer</span><span style="color:#24292E;">, </span><span style="color:#D73A49;">float</span><span style="color:#24292E;"> </span><span style="color:#E36209;">payment</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        payment </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2f</span><span style="color:#24292E;">; </span><span style="color:#6A737D;">// &quot;我要收取2元!&quot;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">float</span><span style="color:#24292E;"> paidAmount </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> myCustomer.</span><span style="color:#6F42C1;">pay</span><span style="color:#24292E;">(payment);</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (paidAmount </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> payment) {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// 说声谢谢，欢迎下次光临</span></span>
<span class="line"><span style="color:#24292E;">        } </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// 可以稍后再来</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>到此，我们就利用迪米特法则顺利地实现了代码的解耦。</p><p>你发现没，使用迪米特法则后，<strong>不仅降低了代码的耦合，还提高了代码的重用性</strong>。即使未来顾客不想用现金支付，改用微信支付、找朋友代付等，都不会影响收银员的行为。</p><h3 id="应用迪米特法则时需要注意的问题" tabindex="-1">应用迪米特法则时需要注意的问题 <a class="header-anchor" href="#应用迪米特法则时需要注意的问题" aria-label="Permalink to &quot;应用迪米特法则时需要注意的问题&quot;">​</a></h3><p>虽然应用迪米特法则有很多好处，但是迪米特法则因为<strong>太过于关注局部的简化</strong>，而容易导致别的问题出现。</p><p><strong>问题一：容易为了简化局部而忽略整体的简化。</strong> 迪米特法则在优化局部时很有效，因为会做一定程度的信息隐藏，但同时这也是它最大的劣势。因为太过于关注每个类之间的直接关系，往往会让更大类之间的关系变得复杂，比如，容易造成超大类。在类对象中加入很多其他类，这样并没有违反迪米特法则（与直接相关的类耦合，没有关注职责分离），但是随着其他类与更多类发生耦合后，最开始的类的关系其实已经变得非常庞大了。</p><p><strong>问题二：拆分时容易引入很多过小的中间类和方法。</strong> 迪米特法则本质上是在对类和方法做隔离，虽然它判断的标准是对象间的直接关系，但是对这个直接关系并没有一个非常好的衡量标准，在实际的开发中，基本上是依据程序员自己的经验来进行判断。于是，我们经常能在代码里看见一些接口的实现功能只是调用了另一个方法的情况，这其实就是因为过多的隔离带来的中间适配，适配就会产生很多中间类和方法，甚至有的方法没有任何逻辑，只是做了一次数据透传，为的就是避免直接耦合。</p><p><strong>问题三：不同模块之间的消息传递效率可能会降低。</strong> 比如，分层架构就是典型的例子，当 Controller 层想要调用 DAO 层的模块时，如果遵循迪米特法则，保持层之间密切联系，那么就意味着需要跨越很多中间层中的模块才行，这样消息传递效率自然会变低。</p><h3 id="扩展-面向切面编程-aop" tabindex="-1">扩展：面向切面编程（AOP） <a class="header-anchor" href="#扩展-面向切面编程-aop" aria-label="Permalink to &quot;扩展：面向切面编程（AOP）&quot;">​</a></h3><p>我们都知道，面向切面编程（Aspect Oriented Programming，简称 AOP）在面试中是高频问题之一，尤其对于 Java 程序员来说，AOP 不仅是 Spring 框架的核心功能，还是在业务中降低耦合性的有效手段之一。</p><p><strong>面向切面编程，简单来说，就是可以在不修改已有程序代码功能的前提下给程序动态添加功能的一种技术。</strong></p><p>如果说迪米特法则是在<strong>程序设计时（静态）</strong> 降低代码耦合的方法的话，那么面向切面编程就是在<strong>程序运行期间（动态）</strong> 降低代码耦合的方法。比如，我们熟知的在 Spring 框架中大量使用的 AspectJ 工具就是面向切面编程的一种最佳实践。</p><p>不过，这里尤其要注意，面向切面编程（AOP）和面向对象编程（OOP）虽然最终想要达到的目的相同，都是降低代码耦合性，但关注点却是截然不同的。这也是很多人在面试或设计时容易搞混淆的地方。</p><p>这里我们结合具体的例子来说明一下。对&quot;会员用户&quot;这个业务单元进行封装时，使用 OOP 思想，你会自然建立一个&quot;Member&quot;类，并在其中封装会员用户对应的属性和行为；而如果使用 AOP 思想，你会发现使用&quot;Member&quot;无法统一属性和行为，因为不同的会员可能有不同的偏好属性和行为。同样，对于&quot;性能统计&quot;这个统一的动作来说，使用 AOP 会很方便，而使用 OOP 封装又会变成每一个类都要加一个性能统计的动作，变得过于累赘。</p><p>从以上例子你可能已经发现，面向切面编程（AOP）和面向对象编程（OOP）这两种设计思想有着本质的差异。OOP 强调对象内在的自洽性，更适合<strong>业务功能</strong> ，比如商品、订单、会员。而对于<strong>统一的行为动作</strong>，如日志记录、性能统计、权限控制、事务处理等，使用 AOP 则更合适，通过关注系统本身的行为，而不去影响功能业务逻辑的实现和演进。</p><h3 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h3><p><strong>迪米特法则又叫最少知识原则</strong> ，核心思想是<strong>通过减少和不必要的类进行通信来降低代码耦合</strong>，在编程中可以用来指导对象间如何正确地协作。</p><p>不过在我看来，在真实的软件开发中，你<strong>应该将迪米特法则作为一个参考原则而不是绝对原则，因为有时过度低耦合反而会带来更多的问题</strong>。比如，只有一个人维护的项目，却硬要搞成几十个微服务模块的模块设计，结果不仅导致维护复杂性增高，而且系统也会变得更脆弱。降低耦合可以作为一个演进的目标，但不能每时每刻都要求做到低耦合。</p>`,20),u=s("p",null,[a("除了不过度使用迪米特法则外，你在学习它时还要抓住另一个关键词："),s("strong",null,"最少知识"),a("。最少知识，可以说是提升执行效率最好的方法之一，因为有时知道的信息越多，反而决策越困难，执行效率也越低，所以有时你得控制自己在设计对象时的知识范围，避免过多知识引起不必要的耦合发生。")],-1),g=s("h3",{id:"课后思考",tabindex:"-1"},[a("课后思考 "),s("a",{class:"header-anchor",href:"#课后思考","aria-label":'Permalink to "课后思考"'},"​")],-1),F=s("p",null,"迪米特法则虽然能够有效降低代码耦合，但是有时却会增加很多不必要的中间类，你知道有什么设计模式是它的具体实现吗？",-1),d=s("p",null,"欢迎留言分享，我会第一时间给你回复。",-1),A=s("p",null,'在下一讲，我会接着与你分享"表达原则：如何让源代码成为一种逻辑线索？"的相关内容，记得按时来听课！',-1);function m(_,h,D,b,C,v){const n=e("Image");return t(),c("div",null,[E,l(n,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image6/M00/33/10/CioPOWBut06AebM0AAFHWNOSQK0109.png"}),a(),y,l(n,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image6/M01/33/08/Cgp9HWBut1aACv0sAAEPvcHMt_s946.png"}),a(),i,l(n,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image6/M00/33/10/CioPOWBut3WATH18AAXclhpQmms828.png"}),u,g,F,d,A])}const P=o(r,[["render",m]]);export{B as __pageData,P as default};
