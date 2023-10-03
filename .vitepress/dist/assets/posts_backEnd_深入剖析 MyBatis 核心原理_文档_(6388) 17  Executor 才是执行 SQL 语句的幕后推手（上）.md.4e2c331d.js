import{_ as s,o as a,g as n,Q as l}from"./chunks/framework.f949202b.js";const m=JSON.parse('{"title":"模板方法模式 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/深入剖析 MyBatis 核心原理_文档/(6388) 17  Executor 才是执行 SQL 语句的幕后推手（上）.md","filePath":"posts/backEnd/深入剖析 MyBatis 核心原理_文档/(6388) 17  Executor 才是执行 SQL 语句的幕后推手（上）.md","lastUpdated":null}'),p={name:"posts/backEnd/深入剖析 MyBatis 核心原理_文档/(6388) 17  Executor 才是执行 SQL 语句的幕后推手（上）.md"},e=l(`<p>这一讲我们开始介绍 MyBatis 中的另一个核心接口------ Executor 接口。在 Executor 接口的实现过程中，MyBatis 使用了<strong>装饰器模式</strong> 和<strong>模板方法模式</strong> 这两种经典的设计模式，在前面的<a href="https://kaiwu.lagou.com/course/courseInfo.htm?courseId=612&amp;sid=20-h5Url-0&amp;buyFrom=2&amp;pageId=1pz4#/detail/pc?id=6380&amp;fileGuid=xxQTRXtVcqtHK6j8" target="_blank" rel="noreferrer">《09 | 基于 MyBatis 缓存分析装饰器模式的最佳实践》</a>这一讲中，我们已经详细分析过装饰器模式的实现细节和优缺点，今天我们就一起来看一下模板方法模式的相关内容，这些都是理解 Executor 接口的基础。</p><h3 id="模板方法模式" tabindex="-1">模板方法模式 <a class="header-anchor" href="#模板方法模式" aria-label="Permalink to &quot;模板方法模式&quot;">​</a></h3><p>在我们开发业务逻辑的时候，可能会遇到流程复杂的逻辑，而这个复杂逻辑本身是可以拆解成多个小的行为，这些小的行为本身可能根据业务场景的不同而有所变化。</p><p>这里我们以转账流程为例，如下图所示，整个转账流程是固定的，但是&quot;验证密码&quot;&quot;验证余额&quot;和&quot;扣除金额&quot;这三步针对不同的银行卡，要调用不同银行的接口去完成。</p><p><img src="https://s0.lgstatic.com/i/image6/M01/1F/5C/Cgp9HWBRybGAVCakAADpGtj3zWY699.png" alt="Drawing 0.png"><br> 不同银行卡转账流程示意图</p><p>为了让整个复杂流程的代码具有更好的扩展性，我们一般会使用模板方法模式来处理。</p><p>在模板方法模式中，我们可以将复杂流程中每个步骤的边界确定下来，然后由一个&quot;模板方法&quot;定义每个步骤的执行流程，每个步骤对应着一个方法，这些方法也被称为&quot;基本方法&quot;。模板方法按照业务逻辑依次调用上述基本方法，来实现完整的复杂流程。</p><p><strong>模板方法模式会将模板方法以及不需要随业务场景变化的基本方法放到父类中实现，随业务场景变化的基本方法会被定义为抽象方法，由子类提供真正的实现。</strong></p><p>下图展示了模板方法模式的核心类，其中 template() 方法是我们上面描述的模板方法，part1() 方法和 part3() 方法是逻辑不变的基本方法实现，而 part2()、part4() 方法是两个随场景变化的基本方法。</p><p><img src="https://s0.lgstatic.com/i/image6/M01/1F/59/CioPOWBRybmACYSWAAVsA89p6H4687.png" alt="Drawing 1.png"><br> 模板方法模式示意图</p><p>我们可以<strong>通过模板方法控制整个流程的走向以及其中固定不变的步骤，子类来实现流程的某些变化细节</strong>，这就实现了&quot;变化与不变&quot;的解耦，也实现了&quot;整个流程与单个步骤&quot;的解耦。当业务需要改变流程中某些步骤的具体行为时，直接添加新的子类即可实现，这也非常符合&quot;开放-封闭&quot;原则。另外，模板方法模式能够充分利用面向对象的多态特性，在系统运行时再选择一种具体子类来执行完整的流程，这也从另一个角度提高了系统的灵活性。</p><h3 id="executor-接口" tabindex="-1">Executor 接口 <a class="header-anchor" href="#executor-接口" aria-label="Permalink to &quot;Executor 接口&quot;">​</a></h3><p>介绍完模板方法模式之后，我们开始介绍 Executor 这个核心接口。</p><p>首先来看 Executor 接口定义的核心方法，如下图所示，Executor 接口定义了数据库操作的基本方法，其中 query*() 方法、update() 方法、flushStatement() 方法是执行 SQL 语句的基础方法，commit() 方法、rollback() 方法以及 getTransaction() 方法与事务的提交/回滚相关，clearLocalCache() 方法、createCacheKey() 方法与缓存有关。</p><p><img src="https://s0.lgstatic.com/i/image6/M01/1F/59/CioPOWBRycSAIT9sAAIepMCg8VA941.png" alt="Drawing 2.png"><br> Executor 接口结构图</p><p>MyBatis 中有多个 Executor 接口的实现类，如下图所示：</p><p><img src="https://s0.lgstatic.com/i/image6/M01/20/4C/CioPOWBS-s2AUysXAAFqkAUOqx0880.png" alt="图片1.png"><br> Executor 接口继承关系图</p><p>该图中的 CachingExecutor 是 Executor 的装饰器实现，在其他 Executor 实现的基础上添加了缓存的功能；BaseExecutor 实现了 Executor 接口的全部方法，主要定义了这些方法的核心流程（也就是模板方法），然后由子类进行具体实现。</p><h3 id="baseexecutor" tabindex="-1">BaseExecutor <a class="header-anchor" href="#baseexecutor" aria-label="Permalink to &quot;BaseExecutor&quot;">​</a></h3><p>BaseExecutor 使用模板方法模式实现了 Executor 接口中的方法，其中，不变的部分是事务管理和缓存管理两部分的内容，由 BaseExecutor 实现；变化的部分则是具体的数据库操作，由 BaseExecutor 子类实现，涉及 doUpdate()、doQuery()、doQueryCursor() 和 doFlushStatement() 这四个方法。</p><p>下面我们会从缓存和事务两个角度来讲解 BaseExecutor 的核心实现。</p><h4 id="_1-一级缓存" tabindex="-1">1. 一级缓存 <a class="header-anchor" href="#_1-一级缓存" aria-label="Permalink to &quot;1. 一级缓存&quot;">​</a></h4><p>数据库作为 OLTP 系统中的核心资源之一，是性能优化的重点关注对象，在设计、开发以及后期运维时，我们都会采取多种手段减少数据库压力，其中<strong>使用缓存是一种比较常用且有效的优化数据库读写效率的手段</strong>。</p><p>缓存方案之所以备受开发者青睐，主要是因为多数缓存都是基于内存或&quot;内存+磁盘&quot;的存储结构，数据读取效率远远高于数据库，在缓存有效的时候，能够帮助数据库分担大量读压力，从而降低数据库 QPS，提高整个系统性能。从可用性的角度来看，当数据库发生故障的时候，缓存因为保存全部或部分数据，可以继续响应部分读请求，这在某种意义上就提高了程序的可用性。</p><p>很多持久层框架默认都提供了基于 JVM 堆内存的缓存实现，MyBatis 也不例外。MyBatis 缓存分为一级缓存和二级缓存，这里我们先重点来看一级缓存的内容。</p><p><strong>MyBatis 中的一级缓存是会话级缓存</strong>，创建一个 SqlSession 对象就表示开启一次与数据库的会话，会话生命周期与 SqlSession 的生命周期一致。在一次会话中，我们可能多次执行相同的查询语句，如果没有缓存，每次查询都会请求到数据库，这样就会浪费数据库资源。</p><p>为了避免上述资源浪费问题，BaseExecutor 会给每个 SqlSession 对象关联一个 Cache 对象，也就是&quot;一级缓存&quot;。在使用 SqlSession 对象进行查询的时候，会先访问一级缓存，看看是否已经缓存了结果对象，如果存在，则直接返回一级缓存中的结果对象，这也就是我们常说的&quot;命中缓存&quot;。如果未命中缓存，则会击穿到数据库，一级缓存会将数据库返回的查询结果对象缓存起来，等待后续请求使用。MyBatis 中的一级缓存默认处于开启状态，也推荐用户开启一级缓存。</p><p>下面来看 BaseExecutor 与一级缓存的相关实现。在 BaseExecutor 中维护了两个 PerpetualCache 对象，分别是 localCache 字段和 localOutputParameterCache 字段，其中 localOutputParameterCache 只用来缓存存储过程的输出参数，localCache 会用来缓存其他查询方式的结果对象。</p><p>在 BaseExecutor.query() 方法中，定义了<strong>查询操作</strong>的核心流程，其中也包含了查询一级缓存和填充一级缓存的操作，其具体核心步骤如下。</p><ul><li><p>创建 CacheKey 对象，该部分逻辑在 createCacheKey() 方法中实现。这里创建的 CacheKey 对象主要包含五个部分：MappedStatement 的 id、RowBounds 中的 offset 和 limit 信息、SQL 语句（包含&quot;?&quot;占位符）、用户传递的实参信息以及 Environment ID。</p></li><li><p>使用 CacheKey 查询一级缓存。如果缓存命中，则直接返回缓存的结果对象；如果缓存未命中，则调用 doQuery() 方法完成数据库查询操作，同时将结果对象记录到一级缓存中。</p></li><li><p>除了上述查询缓存、数据库等操作之外，query() 方法最后还会处理嵌套查询的缓存。在这一步中，BaseExecutor 会遍历全部嵌套查询对应的 DeferredLoad 对象，并通过 load() 方法从 localCache 中获取嵌套查询的对象，填充到外层对象的相应属性中。</p></li></ul><p>下面来看 query() 方法的核心逻辑：</p><div class="language-java vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;">E</span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> List</span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;">E</span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">query</span><span style="color:#E1E4E8;">(MappedStatement ms, Object parameter, RowBounds rowBounds, ResultHandler resultHandler, CacheKey key, BoundSql boundSql) throws SQLException {</span></span>
<span class="line"><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (queryStack </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> ms.</span><span style="color:#B392F0;">isFlushCacheRequired</span><span style="color:#E1E4E8;">()) {</span></span>
<span class="line"><span style="color:#6A737D;">// 非嵌套查询，并且&lt;select&gt;标签配置的flushCache属性为true时，才会清空一级缓存</span></span>
<span class="line"><span style="color:#6A737D;">// 注意：flushCache配置项会影响一级缓存中结果对象存活时长</span></span>
<span class="line"><span style="color:#B392F0;">clearLocalCache</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">List&lt;</span><span style="color:#F97583;">E</span><span style="color:#E1E4E8;">&gt; list;</span></span>
<span class="line"><span style="color:#F97583;">try</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">queryStack</span><span style="color:#F97583;">++</span><span style="color:#E1E4E8;">; </span><span style="color:#6A737D;">// 增加查询层数</span></span>
<span class="line"><span style="color:#6A737D;">// 查询一级缓存</span></span>
<span class="line"><span style="color:#E1E4E8;">list </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> resultHandler </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">?</span><span style="color:#E1E4E8;"> (List</span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;">E</span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;">) localCache.</span><span style="color:#B392F0;">getObject</span><span style="color:#E1E4E8;">(key) </span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (list </span><span style="color:#F97583;">!=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#6A737D;">// 对存储过程出参的处理：如果命中一级缓存，则获取缓存中保存的输出参数，</span></span>
<span class="line"><span style="color:#6A737D;">// 然后记录到用户传入的实参对象中</span></span>
<span class="line"><span style="color:#B392F0;">handleLocallyCachedOutputParameters</span><span style="color:#E1E4E8;">(ms, key, parameter, boundSql);</span></span>
<span class="line"><span style="color:#E1E4E8;">} </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#6A737D;">// queryFromDatabase()方法内部首先会在localCache中设置一个占位符，然后调用doQuery()方法完成数据库查询，并得到映射后的结果对象, doQuery()方法是</span></span>
<span class="line"><span style="color:#6A737D;">// 一个抽象方法，由BaseExecutor的子类具体实现</span></span>
<span class="line"><span style="color:#E1E4E8;">list </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">queryFromDatabase</span><span style="color:#E1E4E8;">(ms, parameter, rowBounds, resultHandler, key, boundSql);</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">} </span><span style="color:#F97583;">finally</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">queryStack</span><span style="color:#F97583;">--</span><span style="color:#E1E4E8;">; </span><span style="color:#6A737D;">// 当前查询完成，查询层数减少</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (queryStack </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">) {  </span><span style="color:#6A737D;">// 完成嵌套查询的填充</span></span>
<span class="line"><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> (DeferredLoad deferredLoad </span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> deferredLoads) {</span></span>
<span class="line"><span style="color:#E1E4E8;">deferredLoad.</span><span style="color:#B392F0;">load</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">deferredLoads.</span><span style="color:#B392F0;">clear</span><span style="color:#E1E4E8;">(); </span><span style="color:#6A737D;">// 清空deferredLoads集合</span></span>
<span class="line"><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (configuration.</span><span style="color:#B392F0;">getLocalCacheScope</span><span style="color:#E1E4E8;">() </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> LocalCacheScope.STATEMENT) {</span></span>
<span class="line"><span style="color:#6A737D;">// 根据配置决定是否清空localCache</span></span>
<span class="line"><span style="color:#B392F0;">clearLocalCache</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> list;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;">E</span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> List</span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;">E</span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">query</span><span style="color:#24292E;">(MappedStatement ms, Object parameter, RowBounds rowBounds, ResultHandler resultHandler, CacheKey key, BoundSql boundSql) throws SQLException {</span></span>
<span class="line"><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (queryStack </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> ms.</span><span style="color:#6F42C1;">isFlushCacheRequired</span><span style="color:#24292E;">()) {</span></span>
<span class="line"><span style="color:#6A737D;">// 非嵌套查询，并且&lt;select&gt;标签配置的flushCache属性为true时，才会清空一级缓存</span></span>
<span class="line"><span style="color:#6A737D;">// 注意：flushCache配置项会影响一级缓存中结果对象存活时长</span></span>
<span class="line"><span style="color:#6F42C1;">clearLocalCache</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">List&lt;</span><span style="color:#D73A49;">E</span><span style="color:#24292E;">&gt; list;</span></span>
<span class="line"><span style="color:#D73A49;">try</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">queryStack</span><span style="color:#D73A49;">++</span><span style="color:#24292E;">; </span><span style="color:#6A737D;">// 增加查询层数</span></span>
<span class="line"><span style="color:#6A737D;">// 查询一级缓存</span></span>
<span class="line"><span style="color:#24292E;">list </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> resultHandler </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">?</span><span style="color:#24292E;"> (List</span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;">E</span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;">) localCache.</span><span style="color:#6F42C1;">getObject</span><span style="color:#24292E;">(key) </span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (list </span><span style="color:#D73A49;">!=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#6A737D;">// 对存储过程出参的处理：如果命中一级缓存，则获取缓存中保存的输出参数，</span></span>
<span class="line"><span style="color:#6A737D;">// 然后记录到用户传入的实参对象中</span></span>
<span class="line"><span style="color:#6F42C1;">handleLocallyCachedOutputParameters</span><span style="color:#24292E;">(ms, key, parameter, boundSql);</span></span>
<span class="line"><span style="color:#24292E;">} </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#6A737D;">// queryFromDatabase()方法内部首先会在localCache中设置一个占位符，然后调用doQuery()方法完成数据库查询，并得到映射后的结果对象, doQuery()方法是</span></span>
<span class="line"><span style="color:#6A737D;">// 一个抽象方法，由BaseExecutor的子类具体实现</span></span>
<span class="line"><span style="color:#24292E;">list </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">queryFromDatabase</span><span style="color:#24292E;">(ms, parameter, rowBounds, resultHandler, key, boundSql);</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">} </span><span style="color:#D73A49;">finally</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">queryStack</span><span style="color:#D73A49;">--</span><span style="color:#24292E;">; </span><span style="color:#6A737D;">// 当前查询完成，查询层数减少</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (queryStack </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">) {  </span><span style="color:#6A737D;">// 完成嵌套查询的填充</span></span>
<span class="line"><span style="color:#D73A49;">for</span><span style="color:#24292E;"> (DeferredLoad deferredLoad </span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> deferredLoads) {</span></span>
<span class="line"><span style="color:#24292E;">deferredLoad.</span><span style="color:#6F42C1;">load</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">deferredLoads.</span><span style="color:#6F42C1;">clear</span><span style="color:#24292E;">(); </span><span style="color:#6A737D;">// 清空deferredLoads集合</span></span>
<span class="line"><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (configuration.</span><span style="color:#6F42C1;">getLocalCacheScope</span><span style="color:#24292E;">() </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> LocalCacheScope.STATEMENT) {</span></span>
<span class="line"><span style="color:#6A737D;">// 根据配置决定是否清空localCache</span></span>
<span class="line"><span style="color:#6F42C1;">clearLocalCache</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#D73A49;">return</span><span style="color:#24292E;"> list;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br></div></div><p>通过对 query() 这个核心方法的分析，我们可以看到其中有两处影响一级缓存中结果对象生命周期的配置：一个是 <code>&lt;select&gt;</code> 标签的 flushCache 配置，它决定了一条 select 语句执行之前是否会清除一级缓存；另一个是全局的 localCacheScope 配置，它决定了一级缓存的生命周期是语句级别的（STATEMENT）还是 SqlSession 级别的（SESSION），默认值是 SqlSession 级别的。</p><p>除了上述两个配置会影响缓存数据的生命周期之外，修改操作也会清空缓存，涉及以下展示的 commit()、rollback()、update() 方法：</p><p><img src="https://s0.lgstatic.com/i/image6/M00/1F/5C/Cgp9HWBRykSAb6pcAAF-EFg4WfE845.png" alt="Drawing 4.png"><br> clearLocalCache() 方法调用位置</p><p>为了保持一级缓存与数据库的一致性，这些修改数据的操作需要清空一级缓存，因为执行修改操作之后，数据库中存储的数据已更新，如果一级缓存的内容不更新的话，就会与数据库中的数据不一致，成为&quot;脏数据&quot;。</p><h4 id="_2-事务管理" tabindex="-1">2. 事务管理 <a class="header-anchor" href="#_2-事务管理" aria-label="Permalink to &quot;2. 事务管理&quot;">​</a></h4><p>现在我们知道 commit()、rollback() 方法在提交和回滚事务之前会清空一级缓存，那 BaseExecutor 是如何管理事务的呢？这里我们就简单介绍一下事务管理相关的内容。</p><p>在 BaseExecutor 中维护了一个 Transaction 对象（transaction 字段）来<strong>控制事务</strong>。首先来看 getConnection() 方法，它底层会通过 Transaction.getConnection() 方法获取数据库连接，用于创建 Statement、PreparedStatement 等对象。</p><p>再来看 commit() 方法和 rollback() 方法，分别依赖 Transaction.commit() 方法和 Transaction.rollback() 方法来<strong>提交和回滚事务</strong>。从 commit() 方法和 rollback() 方法中我们可以看到，在清理一级缓存和提交/回滚事务之间，BaseExecutor 还会执行 flushStatements() 方法，这个方法主要是处理批处理场景，其中会调用 doFlushStatements() 来处理通过 batch() 写入的多条 SQL 语句。</p><h3 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h3><p>在这一讲，我们首先一起学习了 Executor 接口使用到的模板方法模式的基础知识，然后介绍了 Executor 接口的核心方法以及它的继承结构，最后深入分析了 BaseExecutor 中各个模板方法是如何控制查询数据、修改数据等操作的流程，其中涉及了一级缓存以及事务管理的相关知识点。</p><p>下一讲，我们将深入 BaseExecutor 各个实现类中，分析这些核心流程中各个基本方法是如何实现的，记得按时来听课。</p><hr><p><a href="https://shenceyun.lagou.com/t/Mka" target="_blank" rel="noreferrer"><img src="https://s0.lgstatic.com/i/image/M00/6D/3E/CgqCHl-s60-AC0B_AAhXSgFweBY762.png" alt="1.png"></a></p><p><strong>《Java 工程师高薪训练营》</strong></p><p>实战训练+面试模拟+大厂内推，想要提升技术能力，进大厂拿高薪，<a href="https://shenceyun.lagou.com/t/Mka" target="_blank" rel="noreferrer">点击链接，提升自己</a>！</p>`,47),o=[e];function t(r,c,E,y,i,u){return a(),n("div",null,o)}const b=s(p,[["render",t]]);export{m as __pageData,b as default};
