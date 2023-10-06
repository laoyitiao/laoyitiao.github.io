import{_ as o,j as e,o as t,g as c,k as l,h as a,Q as p,s}from"./chunks/framework.b3d8e22e.js";const q=JSON.parse('{"title":"典型回答 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/Java 源码剖析 34 讲_文档/(1791) 第31讲：如何保证接口的幂等性？常见的实现方案有哪些？.md","filePath":"posts/backEnd/Java 源码剖析 34 讲_文档/(1791) 第31讲：如何保证接口的幂等性？常见的实现方案有哪些？.md","lastUpdated":1696417798000}'),r={name:"posts/backEnd/Java 源码剖析 34 讲_文档/(1791) 第31讲：如何保证接口的幂等性？常见的实现方案有哪些？.md"},E=p(`<p>幂等性问题是面试中常见的面试问题，也是分布式系统最常遇到的问题之一。在说幂等性之前，我们先来看一种情况，假如老王在某电商平台进行购物，付款的时候不小心手抖了一下，连续点击了两次支付，但此时服务器没做任何验证，于是老王账户里面的钱被扣了两次，这显然对当事人造成了一定的经济损失，并且还会让用户丧失对平台的信任。而<strong>幂等性问题</strong>说的就是如何防止接口的重复无效请求。</p><p>我们本课时的面试题是，什么是幂等性？如何保证接口的幂等性？</p><h3 id="典型回答" tabindex="-1">典型回答 <a class="header-anchor" href="#典型回答" aria-label="Permalink to &quot;典型回答&quot;">​</a></h3><p>幂等性最早是数学里面的一个概念，后来被用于计算机领域，用于表示任意多次请求均与一次请求执行的结果相同，也就是说对于一个接口而言，无论调用了多少次，最终得到的结果都是一样的。比如以下代码：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">IdempotentExample</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 变量</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> count </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 非幂等性方法</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">addCount</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        count</span><span style="color:#F97583;">++</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 幂等性方法</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">printCount</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(count);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">IdempotentExample</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 变量</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> count </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 非幂等性方法</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">addCount</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">        count</span><span style="color:#D73A49;">++</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 幂等性方法</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">printCount</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(count);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>对于变量 count 来说，如果重复调用 addCount() 方法的话，会一直累加 count 的值，因为 addCount() 方法就是非幂等性方法；而 printCount() 方法只是用来打印控制台信息的。因此，它无论调用多少次结果都是一样的，所以它是幂等性方法。</p><p>知道了幂等性的概念，那如何保证幂等性呢？</p><p>幂等性的实现方案通常分为以下几类：</p><ul><li><p>前端拦截</p></li><li><p>使用数据库实现幂等性</p></li><li><p>使用 JVM 锁实现幂等性</p></li><li><p>使用分布式锁实现幂等性</p></li></ul><p>下面我们分别来看它们的具体实现过程。</p><h4 id="_1-前端拦截" tabindex="-1">1. 前端拦截 <a class="header-anchor" href="#_1-前端拦截" aria-label="Permalink to &quot;1. 前端拦截&quot;">​</a></h4><p>前端拦截是指通过 Web 站点的页面进行请求拦截，比如在用户点击完&quot;提交&quot;按钮后，我们可以把按钮设置为不可用或者隐藏状态，避免用户重复点击。</p><p>执行效果如下图所示：</p>`,13),y=p(`<p>按钮点击效果图</p><p>核心的实现代码如下：</p><div class="language-xml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">xml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    function subCli(){</span></span>
<span class="line"><span style="color:#E1E4E8;">        // 按钮设置为不可用</span></span>
<span class="line"><span style="color:#E1E4E8;">        document.getElementById(&quot;btn_sub&quot;).disabled=&quot;disabled&quot;;</span></span>
<span class="line"><span style="color:#E1E4E8;">        document.getElementById(&quot;dv1&quot;).innerText = &quot;按钮被点击了~&quot;;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">body</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">style</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;margin-top: 100px;margin-left: 100px;&quot;</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">input</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">id</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;btn_sub&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">type</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;button&quot;</span><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">value</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot; 提 交 &quot;</span><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">onclick</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;subCli()&quot;</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">id</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;dv1&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">style</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;margin-top: 80px;&quot;</span><span style="color:#E1E4E8;">&gt;&lt;/</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">body</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">script</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    function subCli(){</span></span>
<span class="line"><span style="color:#24292E;">        // 按钮设置为不可用</span></span>
<span class="line"><span style="color:#24292E;">        document.getElementById(&quot;btn_sub&quot;).disabled=&quot;disabled&quot;;</span></span>
<span class="line"><span style="color:#24292E;">        document.getElementById(&quot;dv1&quot;).innerText = &quot;按钮被点击了~&quot;;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">script</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">body</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">style</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;margin-top: 100px;margin-left: 100px;&quot;</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">input</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">id</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;btn_sub&quot;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">type</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;button&quot;</span><span style="color:#24292E;">  </span><span style="color:#6F42C1;">value</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot; 提 交 &quot;</span><span style="color:#24292E;">  </span><span style="color:#6F42C1;">onclick</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;subCli()&quot;</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">div</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">id</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;dv1&quot;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">style</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;margin-top: 80px;&quot;</span><span style="color:#24292E;">&gt;&lt;/</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">body</span><span style="color:#24292E;">&gt;</span></span></code></pre></div><p>但前端拦截有一个致命的问题，如果是懂行的程序员或者黑客可以直接绕过页面的 JS 执行，直接模拟请求后端的接口，这样的话，我们前端的这些拦截就不能生效了。因此除了前端拦截一部分正常的误操作之外，后端的验证必不可少。</p><h4 id="_2-数据库实现" tabindex="-1">2. 数据库实现 <a class="header-anchor" href="#_2-数据库实现" aria-label="Permalink to &quot;2. 数据库实现&quot;">​</a></h4><p>数据库实现幂等性的方案有三个：</p><ul><li><p>通过悲观锁来实现幂等性</p></li><li><p>通过唯一索引来实现幂等性</p></li><li><p>通过乐观锁来实现幂等性</p></li></ul><h4 id="_3-jvm-锁实现" tabindex="-1">3. JVM 锁实现 <a class="header-anchor" href="#_3-jvm-锁实现" aria-label="Permalink to &quot;3. JVM 锁实现&quot;">​</a></h4><p>JVM 锁实现是指通过 JVM 提供的内置锁如 Lock 或者是 synchronized 来实现幂等性。使用 JVM 锁来实现幂等性的一般流程为：首先通过 Lock 对代码段进行加锁操作，然后再判断此订单是否已经被处理过，如果未处理则开启事务执行订单处理，处理完成之后提交事务并释放锁，执行流程如下图所示：</p>`,9),i=s("p",null,"JVM 锁执行流程图",-1),d=s("p",null,"JVM 锁存在的最大问题在于，它只能应用于单机环境，因为 Lock 本身为单机锁，所以它就不适应于分布式多机环境。",-1),u=s("h4",{id:"_4-分布式锁实现",tabindex:"-1"},[a("4. 分布式锁实现 "),s("a",{class:"header-anchor",href:"#_4-分布式锁实现","aria-label":'Permalink to "4. 分布式锁实现"'},"​")],-1),F=s("p",null,"分布式锁实现幂等性的逻辑是，在每次执行方法之前先判断是否可以获取到分布式锁，如果可以，则表示为第一次执行方法，否则直接舍弃请求即可，执行流程如下图所示：",-1),h=p('<p>分布式锁执行流程图</p><p>需要注意的是分布式锁的 key 必须为业务的唯一标识，我们通常使用 Redis 或者 ZooKeeper 来实现分布式锁；如果使用 Redis 的话，则用 set 命令来创建和获取分布式锁，执行示例如下：</p><div class="language-powershell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">powershell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#79B8FF;">127.0</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">0.1</span><span style="color:#E1E4E8;">:</span><span style="color:#79B8FF;">6379</span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> set lock true ex </span><span style="color:#79B8FF;">30</span><span style="color:#E1E4E8;"> nx</span></span>\n<span class="line"><span style="color:#E1E4E8;">OK </span><span style="color:#6A737D;"># 创建锁成功</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#005CC5;">127.0</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">0.1</span><span style="color:#24292E;">:</span><span style="color:#005CC5;">6379</span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> set lock true ex </span><span style="color:#005CC5;">30</span><span style="color:#24292E;"> nx</span></span>\n<span class="line"><span style="color:#24292E;">OK </span><span style="color:#6A737D;"># 创建锁成功</span></span></code></pre></div><p>其中，ex 是用来设置超时时间的；而 nx 是 not exists 的意思，用来判断键是否存在。如果返回的结果为&quot;OK&quot;，则表示创建锁成功，否则表示重复请求，应该舍弃。更多关于 Reids 实现分布式的内容可以查看第 20 课时的内容。</p><h3 id="考点分析" tabindex="-1">考点分析 <a class="header-anchor" href="#考点分析" aria-label="Permalink to &quot;考点分析&quot;">​</a></h3><p>幂等性问题看似&quot;高大上&quot;其实说白了就是如何避免重复请求提交的问题，出于安全性的考虑，我们必须在前后端都进行幂等性验证，同时幂等性问题在日常工作中又特别常见，解决的方案也有很多，但考虑到分布式系统情况，我们应该优先使用分布式锁来实现。</p><p>和此知识点相关的面试题还有以下这些：</p><ul><li><p>幂等性需要注意什么问题？</p></li><li><p>实现幂等性的关键步骤有哪些？</p></li><li><p>说一说数据库实现幂等性的执行细节？</p></li></ul><h3 id="知识扩展" tabindex="-1">知识扩展 <a class="header-anchor" href="#知识扩展" aria-label="Permalink to &quot;知识扩展&quot;">​</a></h3><h4 id="_1-幂等性注意事项" tabindex="-1">1. 幂等性注意事项 <a class="header-anchor" href="#_1-幂等性注意事项" aria-label="Permalink to &quot;1. 幂等性注意事项&quot;">​</a></h4><p>幂等性的实现与判断需要消耗一定的资源，因此不应该给每个接口都增加幂等性判断，要根据实际的业务情况和操作类型来进行区分。例如，我们在进行查询操作和删除操作时就无须进行幂等性判断。查询操作查一次和查多次的结果都是一致的，因此我们无须进行幂等性判断。删除操作也是一样，删除一次和删除多次都是把相关的数据进行删除（这里的删除指的是条件删除而不是删除所有数据），因此也无须进行幂等性判断。</p><h4 id="_2-幂等性的关键步骤" tabindex="-1">2. 幂等性的关键步骤 <a class="header-anchor" href="#_2-幂等性的关键步骤" aria-label="Permalink to &quot;2. 幂等性的关键步骤&quot;">​</a></h4><p>实现幂等性的关键步骤分为以下三个：</p><ul><li><p>每个请求操作必须有唯一的 ID，而这个 ID 就是用来表示此业务是否被执行过的关键凭证，例如，订单支付业务的请求，就要使用订单的 ID 作为幂等性验证的 Key；</p></li><li><p>每次执行业务之前必须要先判断此业务是否已经被处理过；</p></li><li><p>第一次业务处理完成之后，要把此业务处理的状态进行保存，比如存储到 Redis 中或者是数据库中，这样才能防止业务被重复处理。</p></li></ul><h4 id="_3-数据库实现幂等性" tabindex="-1">3. 数据库实现幂等性 <a class="header-anchor" href="#_3-数据库实现幂等性" aria-label="Permalink to &quot;3. 数据库实现幂等性&quot;">​</a></h4><p>使用数据库实现幂等性的方法有三种：</p><ul><li><p>通过悲观锁来实现幂等性</p></li><li><p>通过唯一索引来实现幂等性</p></li><li><p>通过乐观锁来实现幂等性</p></li></ul><p>接下来我们分别来看这些实现方式的具体执行过程。</p><p><strong>① 悲观锁</strong></p><p>使用悲观锁实现幂等性，一般是配合事务一起来实现，在没有使用悲观锁时，我们通常的执行过程是这样的，首先来判断数据的状态，执行 SQL 如下：</p><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">select</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">status</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> table_name </span><span style="color:#F97583;">where</span><span style="color:#E1E4E8;"> id</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&#39;xxx&#39;</span><span style="color:#E1E4E8;">;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">select</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">status</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> table_name </span><span style="color:#D73A49;">where</span><span style="color:#24292E;"> id</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&#39;xxx&#39;</span><span style="color:#24292E;">;</span></span></code></pre></div><p>然后再进行添加操作：</p><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">insert into</span><span style="color:#E1E4E8;"> table_name (id) </span><span style="color:#F97583;">values</span><span style="color:#E1E4E8;"> (</span><span style="color:#9ECBFF;">&#39;xxx&#39;</span><span style="color:#E1E4E8;">);</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">insert into</span><span style="color:#24292E;"> table_name (id) </span><span style="color:#D73A49;">values</span><span style="color:#24292E;"> (</span><span style="color:#032F62;">&#39;xxx&#39;</span><span style="color:#24292E;">);</span></span></code></pre></div><p>最后再进行状态的修改：</p><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">update</span><span style="color:#E1E4E8;"> table_name </span><span style="color:#F97583;">set</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">status=</span><span style="color:#9ECBFF;">&#39;xxx&#39;</span><span style="color:#E1E4E8;">;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">update</span><span style="color:#24292E;"> table_name </span><span style="color:#D73A49;">set</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">status=</span><span style="color:#032F62;">&#39;xxx&#39;</span><span style="color:#24292E;">;</span></span></code></pre></div><p>但这种情况因为是非原子操作，所以在高并发环境下可能会造成一个业务被执行两次的问题，当一个程序在执行中时，而另一个程序也开始状态判断的操作。因为第一个程序还未来得及更改状态，所以第二个程序也能执行成功，这就导致一个业务被执行了两次。</p><p>在这种情况下我们就可以使用悲观锁来避免问题的产生，实现 SQL 如下所示：</p><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">begin</span><span style="color:#E1E4E8;">;  # </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">.开始事务</span></span>\n<span class="line"><span style="color:#F97583;">select</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> table_name </span><span style="color:#F97583;">where</span><span style="color:#E1E4E8;"> id</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&#39;xxx&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">update</span><span style="color:#E1E4E8;">; # </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">.查询状态</span></span>\n<span class="line"><span style="color:#F97583;">insert into</span><span style="color:#E1E4E8;"> table_name (id) </span><span style="color:#F97583;">values</span><span style="color:#E1E4E8;"> (</span><span style="color:#9ECBFF;">&#39;xxx&#39;</span><span style="color:#E1E4E8;">); # </span><span style="color:#79B8FF;">3</span><span style="color:#E1E4E8;">.添加操作</span></span>\n<span class="line"><span style="color:#F97583;">update</span><span style="color:#E1E4E8;"> table_name </span><span style="color:#F97583;">set</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">status=</span><span style="color:#9ECBFF;">&#39;xxx&#39;</span><span style="color:#E1E4E8;">; # </span><span style="color:#79B8FF;">4</span><span style="color:#E1E4E8;">.更改操作</span></span>\n<span class="line"><span style="color:#F97583;">commit</span><span style="color:#E1E4E8;">; # </span><span style="color:#79B8FF;">5</span><span style="color:#E1E4E8;">.提交事务</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">begin</span><span style="color:#24292E;">;  # </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">.开始事务</span></span>\n<span class="line"><span style="color:#D73A49;">select</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">*</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> table_name </span><span style="color:#D73A49;">where</span><span style="color:#24292E;"> id</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&#39;xxx&#39;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">update</span><span style="color:#24292E;">; # </span><span style="color:#005CC5;">2</span><span style="color:#24292E;">.查询状态</span></span>\n<span class="line"><span style="color:#D73A49;">insert into</span><span style="color:#24292E;"> table_name (id) </span><span style="color:#D73A49;">values</span><span style="color:#24292E;"> (</span><span style="color:#032F62;">&#39;xxx&#39;</span><span style="color:#24292E;">); # </span><span style="color:#005CC5;">3</span><span style="color:#24292E;">.添加操作</span></span>\n<span class="line"><span style="color:#D73A49;">update</span><span style="color:#24292E;"> table_name </span><span style="color:#D73A49;">set</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">status=</span><span style="color:#032F62;">&#39;xxx&#39;</span><span style="color:#24292E;">; # </span><span style="color:#005CC5;">4</span><span style="color:#24292E;">.更改操作</span></span>\n<span class="line"><span style="color:#D73A49;">commit</span><span style="color:#24292E;">; # </span><span style="color:#005CC5;">5</span><span style="color:#24292E;">.提交事务</span></span></code></pre></div><p>在实现的过程中需要注意以下两个问题：</p><ul><li><p>如果使用的是 MySQL 数据库，必须选用 innodb 存储引擎，因为 innodb 支持事务；</p></li><li><p>id 字段一定要是主键或者是唯一索引，不然会锁表，影响其他业务执行。</p></li></ul><p><strong>② 唯一索引</strong></p><p>我们可以创建一个唯一索引的表来实现幂等性，在每次执行业务之前，先执行插入操作，因为唯一字段就是业务的 ID，因此如果重复插入的话会触发唯一约束而导致插入失败。在这种情况下（插入失败）我们就可以判定它为重复提交的请求。</p><p>唯一索引表的创建示例如下：</p><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">CREATE</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">TABLE</span><span style="color:#E1E4E8;"> `</span><span style="color:#B392F0;">table_name</span><span style="color:#E1E4E8;">` (</span></span>\n<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">`id`</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">NOT NULL</span><span style="color:#E1E4E8;"> AUTO_INCREMENT,</span></span>\n<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">`orderid`</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">varchar</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">32</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">NOT NULL</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">DEFAULT</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;&#39;</span><span style="color:#E1E4E8;"> COMMENT </span><span style="color:#9ECBFF;">&#39;唯一id&#39;</span><span style="color:#E1E4E8;">,</span></span>\n<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">PRIMARY KEY</span><span style="color:#E1E4E8;"> (</span><span style="color:#9ECBFF;">`id`</span><span style="color:#E1E4E8;">),</span></span>\n<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">UNIQUE</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">KEY</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">`uq_orderid`</span><span style="color:#E1E4E8;"> (</span><span style="color:#9ECBFF;">`orderid`</span><span style="color:#E1E4E8;">) COMMENT </span><span style="color:#9ECBFF;">&#39;唯一约束&#39;</span></span>\n<span class="line"><span style="color:#E1E4E8;">) ENGINE</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">InnoDB;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">CREATE</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">TABLE</span><span style="color:#24292E;"> `</span><span style="color:#6F42C1;">table_name</span><span style="color:#24292E;">` (</span></span>\n<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">`id`</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">NOT NULL</span><span style="color:#24292E;"> AUTO_INCREMENT,</span></span>\n<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">`orderid`</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">varchar</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">32</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">NOT NULL</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">DEFAULT</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;&#39;</span><span style="color:#24292E;"> COMMENT </span><span style="color:#032F62;">&#39;唯一id&#39;</span><span style="color:#24292E;">,</span></span>\n<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">PRIMARY KEY</span><span style="color:#24292E;"> (</span><span style="color:#032F62;">`id`</span><span style="color:#24292E;">),</span></span>\n<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">UNIQUE</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">KEY</span><span style="color:#24292E;"> </span><span style="color:#032F62;">`uq_orderid`</span><span style="color:#24292E;"> (</span><span style="color:#032F62;">`orderid`</span><span style="color:#24292E;">) COMMENT </span><span style="color:#032F62;">&#39;唯一约束&#39;</span></span>\n<span class="line"><span style="color:#24292E;">) ENGINE</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">InnoDB;</span></span></code></pre></div><p><strong>③ 乐观锁</strong></p><p>乐观锁是指在执行数据操作时（更改或添加）进行加锁操作，其他时间不加锁，因此相比于整个执行过程都加锁的悲观锁来说，它的执行效率要高很多。</p><p>乐观锁可以通过版本号来实现，例如以下 SQL：</p><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">update</span><span style="color:#E1E4E8;"> table_name </span><span style="color:#F97583;">set</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">version=version+</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">where</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">version=</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">update</span><span style="color:#24292E;"> table_name </span><span style="color:#D73A49;">set</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">version=version+</span><span style="color:#005CC5;">1</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">where</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">version=</span><span style="color:#005CC5;">0</span><span style="color:#24292E;">;</span></span></code></pre></div><h3 id="小结" tabindex="-1">小结 <a class="header-anchor" href="#小结" aria-label="Permalink to &quot;小结&quot;">​</a></h3><p>幂等性不但可以保证程序正常执行，还可以杜绝一些垃圾数据以及无效请求对系统资源的消耗。本课时我们讲了幂等性的 6 种实现方式，包括前端拦截、数据库悲观锁实现、数据唯一索引实现、数据库乐观锁实现、JVM 锁实现，以及分布式锁的实现等方案，其中前端拦截无法防止懂行的人直接绕过前端进行模拟请求的操作。因此后端一定要实现幂等性处理，推荐的做法是使用分布式锁来实现，这样的解决方案更加通用。</p>',40);function _(g,C,b,A,v,D){const n=e("Image");return t(),c("div",null,[E,l(n,{alt:"11111111111111111111.gif",src:"https://s0.lgstatic.com/i/image/M00/26/CC/CgqCHl7y9-yAHTg2AAICT3yhluA522.gif"}),a(),y,l(n,{alt:"2.png",src:"https://s0.lgstatic.com/i/image/M00/26/CF/CgqCHl7y-zKACO1KAADpJreXpQQ297.png"}),a(),i,d,u,F,l(n,{alt:"1.png",src:"https://s0.lgstatic.com/i/image/M00/26/C3/Ciqc1F7y-z6AVFbTAAB5lCnzVDg343.png"}),a(),h])}const x=o(r,[["render",_]]);export{q as __pageData,x as default};
