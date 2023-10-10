import{_ as p,j as e,o as t,g as c,k as l,h as n,Q as o,s}from"./chunks/framework.cfb14fe0.js";const B=JSON.parse('{"title":"19深入MyBati内核与业务逻辑的桥梁——接口层","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/深入剖析 MyBatis 核心原理_文档/(7016) 19  深入 MyBati 内核与业务逻辑的桥梁——接口层.md","filePath":"posts/backEnd/深入剖析 MyBatis 核心原理_文档/(7016) 19  深入 MyBati 内核与业务逻辑的桥梁——接口层.md","lastUpdated":1696682708000}'),r={name:"posts/backEnd/深入剖析 MyBatis 核心原理_文档/(7016) 19  深入 MyBati 内核与业务逻辑的桥梁——接口层.md"},i=o('<h1 id="_19深入mybati内核与业务逻辑的桥梁——接口层" tabindex="-1">19深入MyBati内核与业务逻辑的桥梁——接口层 <a class="header-anchor" href="#_19深入mybati内核与业务逻辑的桥梁——接口层" aria-label="Permalink to &quot;19深入MyBati内核与业务逻辑的桥梁——接口层&quot;">​</a></h1><p>在前面的课时中，我们已经详细介绍了 MyBatis 的内核，其中涉及了 MyBatis 的初始化、SQL 参数的绑定、SQL 语句的执行、各类结果集的映射等，MyBatis 为了简化业务代码调用内核功能的成本，就为我们封装了一个接口层。</p><p>这一讲我们就来重点看一下 MyBatis 接口层的实现以及其中涉及的设计模式。</p><h3 id="策略模式" tabindex="-1">策略模式 <a class="header-anchor" href="#策略模式" aria-label="Permalink to &quot;策略模式&quot;">​</a></h3><p>在 MyBatis 接口层中用到了经典设计模式中的策略模式，所以这里我们就先来介绍一下策略模式相关的知识点。</p><p>我们在编写业务逻辑的时候，可能有很多方式都可以实现某个具体的功能。例如，按照购买次数对一个用户购买的全部商品进行排序，从而粗略地得知该用户复购率最高的商品，我们可以使用多种排序算法来实现这个功能，例如，归并排序、插入排序、选择排序等。在不同的场景中，我们需要根据不同的输入条件、数据量以及运行时环境，选择不同的排序算法来完成这一个功能。很多同学可能在实现这个逻辑的时候，会用 if...else... 的硬编码方式来选择不同的算法，但这显然是不符合&quot;开放-封闭&quot;原则的，当需要添加新的算法时，只能修改这个 if...else...代码块，添加新的分支，这就破坏了代码原有的稳定性。</p><p>在策略模式中，我们会<strong>将每个算法单独封装成不同的算法实现类</strong>（这些算法实现类都实现了相同的接口），每个算法实现类就可以被认为是一种策略实现，我们只需选择不同的策略实现来解决业务问题即可，这样每种算法相对独立，算法内的变化边界也就明确了，新增或减少算法实现也不会影响其他算法。</p><p>如下是策略模式的核心类图，其中 StrategyUser 是算法的调用方，维护了一个 Strategy 对象的引用，用来选择具体的算法实现。</p>',8),y=o('<p>策略模式的核心类图</p><h3 id="sqlsession" tabindex="-1">SqlSession <a class="header-anchor" href="#sqlsession" aria-label="Permalink to &quot;SqlSession&quot;">​</a></h3><p><strong>SqlSession是MyBatis对外提供的一个 API 接口，整个MyBatis 接口层也是围绕 SqlSession接口展开的</strong>，SqlSession 接口中定义了下面几类方法。</p><ul><li><p>select*() 方法：用来执行查询操作的方法，SqlSession 会将结果集映射成不同类型的结果对象，例如，selectOne() 方法返回单个 Java 对象，selectList()、selectMap() 方法返回集合对象。</p></li><li><p>insert()、update()、delete() 方法：用来执行 DML 语句。</p></li><li><p>commit()、rollback() 方法：用来控制事务。</p></li><li><p>getMapper()、getConnection()、getConfiguration() 方法：分别用来获取接口对应的 Mapper 对象、底层的数据库连接和全局的 Configuration 配置对象。</p></li></ul><p>如下图所示，MyBatis 提供了两个 SqlSession接口的实现类，同时提供了SqlSessionFactory 工厂类来创建 SqlSession 对象。</p>',5),E=s("p",null,"SqlSessionFactory 接口与 SqlSession 接口的实现类",-1),S=s("p",null,[n("默认情况下，"),s("strong",null,"我们在使用 MyBatis 的时候用的都是 DefaultSqlSession 这个默认的 SqlSession 实现"),n("。DefaultSqlSession 中维护了一个 Executor 对象，通过它来完成数据库操作以及事务管理。DefaultSqlSession 在选择使用哪种 Executor 实现的时候，使用到了策略模式：DefaultSqlSession 扮演了策略模式中的 StrategyUser 角色，Executor 接口扮演的是 Strategy 角色，Executor 接口的不同实现则对应 StrategyImpl 的角色。")],-1),u=s("p",null,"另外，DefaultSqlSession 还维护了一个 dirty 字段来标识缓存中是否有脏数据，它在执行 update() 方法修改数据时会被设置为 true，并在后续参与事务控制，决定当前事务是否需要提交或回滚。",-1),q=s("p",null,"下面接着来看 DefaultSqlSession 对 SqlSession 接口的实现。DefaultSqlSession 为每一类数据操作方法提供了多个重载，尤其是 select*() 操作，而且这些 select*() 方法的重载之间有相互依赖的关系，如下图所示：",-1),F=o(`<p>select() 方法之间的调用关系</p><p>通过上图我们可以清晰地看到，所有 select*() 方法最终都是通过调用 Executor.query() 方法执行 select 语句、完成数据查询操作的，之所以有不同的 select*() 重载，主要是对结果对象的需求不同。例如，我们使用 selectList() 重载时，希望返回的结果对象是一个 List集合；使用 selectMap() 重载时，希望查询到的结果集被转换成 Map 类型集合返回；至于select() 重载，则会由 ResultHandler 来处理结果对象。</p><p>DefaultSqlSession 中的 insert()、update()、delete() 等修改数据的方法以及 commit()、rollback() 等事务管理的方法，同样也有多个重载，它们最终也是委托到Executor 中的同名方法，完成数据修改操作以及事务管理操作的。</p><p>在事务管理的相关方法中，DefaultSqlSession 会根据 dirty 字段以及 autoCommit 字段（是否自动提交事务）、用户传入的 force参数（是否强制提交事务）共同决定是否提交/回滚事务，这部分逻辑位于 isCommitOrRollbackRequired() 方法中，具体实现如下：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">boolean</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">isCommitOrRollbackRequired</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">boolean</span><span style="color:#E1E4E8;"> force) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">!</span><span style="color:#E1E4E8;">autoCommit </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> dirty) </span><span style="color:#F97583;">||</span><span style="color:#E1E4E8;"> force;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">private</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">boolean</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">isCommitOrRollbackRequired</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">boolean</span><span style="color:#24292E;"> force) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">!</span><span style="color:#24292E;">autoCommit </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> dirty) </span><span style="color:#D73A49;">||</span><span style="color:#24292E;"> force;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h3 id="defaultsqlsessionfactory" tabindex="-1">DefaultSqlSessionFactory <a class="header-anchor" href="#defaultsqlsessionfactory" aria-label="Permalink to &quot;DefaultSqlSessionFactory&quot;">​</a></h3><p><strong>DefaultSqlSessionFactory 是MyBatis中用来创建DefaultSqlSession 的具体工厂实现</strong>。通过 DefaultSqlSessionFactory 工厂类，我们可以有两种方式拿到 DefaultSqlSession对象。</p><p>第一种方式是通过数据源获取数据库连接，然后在其基础上创建 DefaultSqlSession 对象，其核心实现位于 openSessionFromDataSource() 方法，具体实现如下：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// 获取Environment对象</span></span>
<span class="line"><span style="color:#F97583;">final</span><span style="color:#E1E4E8;"> Environment environment </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> configuration.</span><span style="color:#B392F0;">getEnvironment</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#6A737D;">// 获取TransactionFactory对象</span></span>
<span class="line"><span style="color:#F97583;">final</span><span style="color:#E1E4E8;"> TransactionFactory transactionFactory </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">getTransactionFactoryFromEnvironment</span><span style="color:#E1E4E8;">(environment);</span></span>
<span class="line"><span style="color:#6A737D;">// 从数据源中创建Transaction</span></span>
<span class="line"><span style="color:#E1E4E8;">tx </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> transactionFactory.</span><span style="color:#B392F0;">newTransaction</span><span style="color:#E1E4E8;">(environment.</span><span style="color:#B392F0;">getDataSource</span><span style="color:#E1E4E8;">(), level, autoCommit);</span></span>
<span class="line"><span style="color:#6A737D;">// 根据配置创建Executor对象</span></span>
<span class="line"><span style="color:#F97583;">final</span><span style="color:#E1E4E8;"> Executor executor </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> configuration.</span><span style="color:#B392F0;">newExecutor</span><span style="color:#E1E4E8;">(tx, execType);</span></span>
<span class="line"><span style="color:#6A737D;">// 在Executor的基础上创建DefaultSqlSession对象</span></span>
<span class="line"><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">DefaultSqlSession</span><span style="color:#E1E4E8;">(configuration, executor, autoCommit);</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// 获取Environment对象</span></span>
<span class="line"><span style="color:#D73A49;">final</span><span style="color:#24292E;"> Environment environment </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> configuration.</span><span style="color:#6F42C1;">getEnvironment</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#6A737D;">// 获取TransactionFactory对象</span></span>
<span class="line"><span style="color:#D73A49;">final</span><span style="color:#24292E;"> TransactionFactory transactionFactory </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">getTransactionFactoryFromEnvironment</span><span style="color:#24292E;">(environment);</span></span>
<span class="line"><span style="color:#6A737D;">// 从数据源中创建Transaction</span></span>
<span class="line"><span style="color:#24292E;">tx </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> transactionFactory.</span><span style="color:#6F42C1;">newTransaction</span><span style="color:#24292E;">(environment.</span><span style="color:#6F42C1;">getDataSource</span><span style="color:#24292E;">(), level, autoCommit);</span></span>
<span class="line"><span style="color:#6A737D;">// 根据配置创建Executor对象</span></span>
<span class="line"><span style="color:#D73A49;">final</span><span style="color:#24292E;"> Executor executor </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> configuration.</span><span style="color:#6F42C1;">newExecutor</span><span style="color:#24292E;">(tx, execType);</span></span>
<span class="line"><span style="color:#6A737D;">// 在Executor的基础上创建DefaultSqlSession对象</span></span>
<span class="line"><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">DefaultSqlSession</span><span style="color:#24292E;">(configuration, executor, autoCommit);</span></span></code></pre></div><p>第二种方式是上层调用方直接提供数据库连接，并在该数据库连接之上创建 DefaultSqlSession 对象，这种创建方式的核心逻辑位于 openSessionFromConnection() 方法中，核心实现如下：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">boolean</span><span style="color:#E1E4E8;"> autoCommit;</span></span>
<span class="line"><span style="color:#F97583;">try</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 获取事务提交方式</span></span>
<span class="line"><span style="color:#E1E4E8;">    autoCommit </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> connection.</span><span style="color:#B392F0;">getAutoCommit</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">} </span><span style="color:#F97583;">catch</span><span style="color:#E1E4E8;"> (SQLException </span><span style="color:#FFAB70;">e</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    autoCommit </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#6A737D;">// 获取Environment对象、TransactionFactory</span></span>
<span class="line"><span style="color:#F97583;">final</span><span style="color:#E1E4E8;"> Environment environment </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> configuration.</span><span style="color:#B392F0;">getEnvironment</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#F97583;">final</span><span style="color:#E1E4E8;"> TransactionFactory transactionFactory </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">getTransactionFactoryFromEnvironment</span><span style="color:#E1E4E8;">(environment);</span></span>
<span class="line"><span style="color:#6A737D;">// 通过Connection对象创建Transaction</span></span>
<span class="line"><span style="color:#F97583;">final</span><span style="color:#E1E4E8;"> Transaction tx </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> transactionFactory.</span><span style="color:#B392F0;">newTransaction</span><span style="color:#E1E4E8;">(connection);</span></span>
<span class="line"><span style="color:#6A737D;">// 创建Executor对象</span></span>
<span class="line"><span style="color:#F97583;">final</span><span style="color:#E1E4E8;"> Executor executor </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> configuration.</span><span style="color:#B392F0;">newExecutor</span><span style="color:#E1E4E8;">(tx, execType);</span></span>
<span class="line"><span style="color:#6A737D;">// 创建DefaultSqlSession对象</span></span>
<span class="line"><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">DefaultSqlSession</span><span style="color:#E1E4E8;">(configuration, executor, autoCommit);</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">boolean</span><span style="color:#24292E;"> autoCommit;</span></span>
<span class="line"><span style="color:#D73A49;">try</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 获取事务提交方式</span></span>
<span class="line"><span style="color:#24292E;">    autoCommit </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> connection.</span><span style="color:#6F42C1;">getAutoCommit</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">} </span><span style="color:#D73A49;">catch</span><span style="color:#24292E;"> (SQLException </span><span style="color:#E36209;">e</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    autoCommit </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#6A737D;">// 获取Environment对象、TransactionFactory</span></span>
<span class="line"><span style="color:#D73A49;">final</span><span style="color:#24292E;"> Environment environment </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> configuration.</span><span style="color:#6F42C1;">getEnvironment</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#D73A49;">final</span><span style="color:#24292E;"> TransactionFactory transactionFactory </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">getTransactionFactoryFromEnvironment</span><span style="color:#24292E;">(environment);</span></span>
<span class="line"><span style="color:#6A737D;">// 通过Connection对象创建Transaction</span></span>
<span class="line"><span style="color:#D73A49;">final</span><span style="color:#24292E;"> Transaction tx </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> transactionFactory.</span><span style="color:#6F42C1;">newTransaction</span><span style="color:#24292E;">(connection);</span></span>
<span class="line"><span style="color:#6A737D;">// 创建Executor对象</span></span>
<span class="line"><span style="color:#D73A49;">final</span><span style="color:#24292E;"> Executor executor </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> configuration.</span><span style="color:#6F42C1;">newExecutor</span><span style="color:#24292E;">(tx, execType);</span></span>
<span class="line"><span style="color:#6A737D;">// 创建DefaultSqlSession对象</span></span>
<span class="line"><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">DefaultSqlSession</span><span style="color:#24292E;">(configuration, executor, autoCommit);</span></span></code></pre></div><h3 id="sqlsessionmanager" tabindex="-1">SqlSessionManager <a class="header-anchor" href="#sqlsessionmanager" aria-label="Permalink to &quot;SqlSessionManager&quot;">​</a></h3><p>通过前面的 SqlSession 继承关系图我们可以看到，SqlSessionManager 同时实现了 SqlSession 和 SqlSessionFactory 两个接口，也就是说，它<strong>同时具备操作数据库的能力和创建SqlSession的能力</strong>。</p><p>首先来看 SqlSessionManager <strong>创建SqlSession的实现</strong> 。它与 DefaultSqlSessionFactory 的主要区别是：DefaultSqlSessionFactory 在一个线程多次获取 SqlSession 的时候，都会创建不同的 SqlSession对象；SqlSessionManager 则有<strong>两种模式</strong>，一种模式与 DefaultSqlSessionFactory 相同，另一种模式是 SqlSessionManager 在内部维护了一个 ThreadLocal 类型的字段（localSqlSession）来记录与当前线程绑定的 SqlSession 对象，同一线程从 SqlSessionManager 中获取的 SqlSession 对象始终是同一个，这样就减少了创建 SqlSession 对象的开销。</p><p>无论哪种模式，SqlSessionManager 都可以看作是 SqlSessionFactory 的装饰器，我们可以在 SqlSessionManager 的构造方法中看到，其中会传入一个 SqlSessionFactory 对象。</p><p>如果使用第一种模式，我们可以直接调用 SqlSessionManager.openSession() 方法，其底层直接调用被装饰的 SqlSessionFactory 对象创建 SqlSession 对象并返回。如果使用第二种模式，则需要调用 startManagedSession() 方法为当前线程绑定 SqlSession 对象，这里的 SqlSession 对象也是由被装饰的SqlSessionFactory 创建的，该模式的核心实现位于 startManagedSession() 方法中，具体实现如下：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">startManagedSession</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 调用底层被装饰的SqlSessionFactory创建SqlSession对象，并绑定到localSqlSession字段中</span></span>
<span class="line"><span style="color:#E1E4E8;">    localSqlSession.</span><span style="color:#B392F0;">set</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">openSession</span><span style="color:#E1E4E8;">());</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">startManagedSession</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 调用底层被装饰的SqlSessionFactory创建SqlSession对象，并绑定到localSqlSession字段中</span></span>
<span class="line"><span style="color:#24292E;">    localSqlSession.</span><span style="color:#6F42C1;">set</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">openSession</span><span style="color:#24292E;">());</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>与当前线程绑定完成之后，我们就可以<strong>通过SqlSessionManager实现的SqlSession接口方法进行数据库操作</strong>了，这些数据操作底层都是调用 sqlSessionProxy 这个 SqlSession 代理实现的。</p><p>SqlSessionManager 中的 sqlSessionProxy 字段指向了一个通过 JDK 动态代理创建的代理类，其中使用的 InvocationHandler 实现是 SqlSessionManager 的内部类 SqlSessionInterceptor。SqlSessionInterceptor 在成功拦截目标方法之后，会首先通过 localSqlSession 字段检查当前线程是否已经绑定了 SqlSession，如果绑定了，则直接使用绑定的 SqlSession；如果没有绑定，则通过 openSession() 方法创建新 SqlSession 完成数据库操作。具体实现如下：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> Object </span><span style="color:#B392F0;">invoke</span><span style="color:#E1E4E8;">(Object proxy, Method method, </span><span style="color:#F97583;">Object</span><span style="color:#E1E4E8;">[] args) throws Throwable {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 尝试从localSqlSession变量中获取当前线程绑定的SqlSession对象</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">final</span><span style="color:#E1E4E8;"> SqlSession sqlSession </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> SqlSessionManager.this.localSqlSession.</span><span style="color:#B392F0;">get</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (sqlSession </span><span style="color:#F97583;">!=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">try</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// 当前线程已经绑定了SqlSession，直接使用即可</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> method.</span><span style="color:#B392F0;">invoke</span><span style="color:#E1E4E8;">(sqlSession, args);</span></span>
<span class="line"><span style="color:#E1E4E8;">        } </span><span style="color:#F97583;">catch</span><span style="color:#E1E4E8;"> (Throwable </span><span style="color:#FFAB70;">t</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">throw</span><span style="color:#E1E4E8;"> ExceptionUtil.</span><span style="color:#B392F0;">unwrapThrowable</span><span style="color:#E1E4E8;">(t);</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    } </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 通过openSession()方法创建新SqlSession对象</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">try</span><span style="color:#E1E4E8;"> (SqlSession autoSqlSession </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">openSession</span><span style="color:#E1E4E8;">()) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">try</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#6A737D;">// 通过新建的SqlSession对象完成数据库操作</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#F97583;">final</span><span style="color:#E1E4E8;"> Object result </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> method.</span><span style="color:#B392F0;">invoke</span><span style="color:#E1E4E8;">(autoSqlSession, args);</span></span>
<span class="line"><span style="color:#E1E4E8;">                autoSqlSession.</span><span style="color:#B392F0;">commit</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> result;</span></span>
<span class="line"><span style="color:#E1E4E8;">            } </span><span style="color:#F97583;">catch</span><span style="color:#E1E4E8;"> (Throwable </span><span style="color:#FFAB70;">t</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                autoSqlSession.</span><span style="color:#B392F0;">rollback</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#F97583;">throw</span><span style="color:#E1E4E8;"> ExceptionUtil.</span><span style="color:#B392F0;">unwrapThrowable</span><span style="color:#E1E4E8;">(t);</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> Object </span><span style="color:#6F42C1;">invoke</span><span style="color:#24292E;">(Object proxy, Method method, </span><span style="color:#D73A49;">Object</span><span style="color:#24292E;">[] args) throws Throwable {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 尝试从localSqlSession变量中获取当前线程绑定的SqlSession对象</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">final</span><span style="color:#24292E;"> SqlSession sqlSession </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> SqlSessionManager.this.localSqlSession.</span><span style="color:#6F42C1;">get</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (sqlSession </span><span style="color:#D73A49;">!=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">try</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// 当前线程已经绑定了SqlSession，直接使用即可</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> method.</span><span style="color:#6F42C1;">invoke</span><span style="color:#24292E;">(sqlSession, args);</span></span>
<span class="line"><span style="color:#24292E;">        } </span><span style="color:#D73A49;">catch</span><span style="color:#24292E;"> (Throwable </span><span style="color:#E36209;">t</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">throw</span><span style="color:#24292E;"> ExceptionUtil.</span><span style="color:#6F42C1;">unwrapThrowable</span><span style="color:#24292E;">(t);</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    } </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 通过openSession()方法创建新SqlSession对象</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">try</span><span style="color:#24292E;"> (SqlSession autoSqlSession </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">openSession</span><span style="color:#24292E;">()) {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">try</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#6A737D;">// 通过新建的SqlSession对象完成数据库操作</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#D73A49;">final</span><span style="color:#24292E;"> Object result </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> method.</span><span style="color:#6F42C1;">invoke</span><span style="color:#24292E;">(autoSqlSession, args);</span></span>
<span class="line"><span style="color:#24292E;">                autoSqlSession.</span><span style="color:#6F42C1;">commit</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> result;</span></span>
<span class="line"><span style="color:#24292E;">            } </span><span style="color:#D73A49;">catch</span><span style="color:#24292E;"> (Throwable </span><span style="color:#E36209;">t</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">                autoSqlSession.</span><span style="color:#6F42C1;">rollback</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#D73A49;">throw</span><span style="color:#24292E;"> ExceptionUtil.</span><span style="color:#6F42C1;">unwrapThrowable</span><span style="color:#24292E;">(t);</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>SqlSessionManager中的 select*()、insert()、update() 等数据操作都依赖于 sqlSessionProxy 代理对象，而 commit()、rollback()、close() 方法等事务相关的操作，都是直接通过 localSqlSession 字段判断当前线程使用哪个 SqlSession。这里以 commit() 方法简单说明一下：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">commit</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 获取当前线程绑定的SqlSession对象</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">final</span><span style="color:#E1E4E8;"> SqlSession sqlSession </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> localSqlSession.</span><span style="color:#B392F0;">get</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (sqlSession </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">) { </span><span style="color:#6A737D;">// 如果当前未绑定SqlSession对象，则不能用SqlSessionManager来控制事务</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">throw</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">SqlSessionException</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;Error:  Cannot commit.  No managed session is started.&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 如果当前线程绑定了SqlSession，则可以通过SqlSessionManager来提交事务</span></span>
<span class="line"><span style="color:#E1E4E8;">  sqlSession.</span><span style="color:#B392F0;">commit</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">commit</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 获取当前线程绑定的SqlSession对象</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">final</span><span style="color:#24292E;"> SqlSession sqlSession </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> localSqlSession.</span><span style="color:#6F42C1;">get</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (sqlSession </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">) { </span><span style="color:#6A737D;">// 如果当前未绑定SqlSession对象，则不能用SqlSessionManager来控制事务</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">throw</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">SqlSessionException</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;Error:  Cannot commit.  No managed session is started.&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 如果当前线程绑定了SqlSession，则可以通过SqlSessionManager来提交事务</span></span>
<span class="line"><span style="color:#24292E;">  sqlSession.</span><span style="color:#6F42C1;">commit</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h3 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h3><p>这一讲我们重点介绍了 MyBatis 中接口层的核心实现。MyBatis 接口层是基于前面课时介绍的核心处理层和基础支撑层对使用方提供的 API 接口，也就是我们在生产中最直接、最常用的接口。</p><p>这里我们首先介绍了 MyBatis 接口层使用到的策略模式这一经典设计模式的知识点，然后讲解了 SqlSession 接口的核心定义以及它的默认实现------ DefaultSqlSession，接下来还分析了用于创建 DefaultSqlSession 对象的工厂类------DefaultSqlSessionFactory，最后阐述了同时实现了 SqlSession 接口和 SqlSessionFactory 接口的 SqlSessionManager 实现类的核心原理。</p><p>下一讲，我将为你详细讲解 MyBatis 的插件体系，了解如何扩展和修改 MyBatis 内核的功能，记得按时来听课！</p><hr><p>[</p>`,28),g=s("p",null,[n("]("),s("a",{href:"https://shenceyun.lagou.com/t/Mka",target:"_blank",rel:"noreferrer"},"https://shenceyun.lagou.com/t/Mka"),n(")")],-1),d=s("p",null,[s("strong",null,"《Java 工程师高薪训练营》")],-1),m=s("p",null,[n("实战训练+面试模拟+大厂内推，想要提升技术能力，进大厂拿高薪，"),s("a",{href:"https://shenceyun.lagou.com/t/Mka",target:"_blank",rel:"noreferrer"},"点击链接，提升自己"),n("！")],-1);function D(h,A,_,f,v,C){const a=e("Image");return t(),c("div",null,[i,l(a,{alt:"图片2.png",src:"https://s0.lgstatic.com/i/image6/M01/27/B6/CioPOWBdmRKAZosJAAEAw6jnBB8920.png"}),n(),y,l(a,{alt:"图片1.png",src:"https://s0.lgstatic.com/i/image6/M01/27/B6/CioPOWBdmQiAIatQAAFZND8WjFQ155.png"}),n(),E,S,u,q,l(a,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image6/M00/24/72/Cgp9HWBYb-iAKkKeAADz5INxXLw311.png"}),n(),F,l(a,{alt:"1.png",src:"https://s0.lgstatic.com/i/image/M00/6D/3E/CgqCHl-s60-AC0B_AAhXSgFweBY762.png"}),n(),g,d,m])}const M=p(r,[["render",D]]);export{B as __pageData,M as default};
