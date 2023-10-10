import{_ as o,j as t,o as e,g as c,k as n,h as a,Q as l,s}from"./chunks/framework.cfb14fe0.js";const H=JSON.parse('{"title":"16 分布式事务：AlibabaSeata如何实现分布式事务","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/SpringCloud Alibaba 实战_文档/(6761) 16  分布式事务：Alibaba Seata 如何实现分布式事务.md","filePath":"posts/backEnd/SpringCloud Alibaba 实战_文档/(6761) 16  分布式事务：Alibaba Seata 如何实现分布式事务.md","lastUpdated":1696682708000}'),r={name:"posts/backEnd/SpringCloud Alibaba 实战_文档/(6761) 16  分布式事务：Alibaba Seata 如何实现分布式事务.md"},i=l(`<h1 id="_16-分布式事务-alibabaseata如何实现分布式事务" tabindex="-1">16 分布式事务：AlibabaSeata如何实现分布式事务 <a class="header-anchor" href="#_16-分布式事务-alibabaseata如何实现分布式事务" aria-label="Permalink to &quot;16 分布式事务：AlibabaSeata如何实现分布式事务&quot;">​</a></h1><p>上一讲咱们了解了 APM 系统与 SkyWalking 的配置使用方法。本讲咱们要解决分布式事务这一技术难题，这一讲咱们将介绍三方面内容：</p><ul><li><p>讲解分布式事务的解决方案；</p></li><li><p>介绍 Alibaba Seata 分布式事务中间件；</p></li><li><p>分析 Seata 的 AT 模式实现原理。</p></li></ul><h3 id="分布式事务的解决方案" tabindex="-1">分布式事务的解决方案 <a class="header-anchor" href="#分布式事务的解决方案" aria-label="Permalink to &quot;分布式事务的解决方案&quot;">​</a></h3><p>下面咱们先聊一下为什么会产生分布式事务。咱们举个例子，某线上商城会员在购买商品的同时产生相应的消费积分，消费积分在下一次购物时可以抵用现金。这个业务的逻辑如果放在以前的单点应用是很简单的，如下所示。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">开启数据库事务</span></span>
<span class="line"><span style="color:#E1E4E8;">创建订单</span></span>
<span class="line"><span style="color:#E1E4E8;">会员积分增加</span></span>
<span class="line"><span style="color:#E1E4E8;">商品库存减少</span></span>
<span class="line"><span style="color:#E1E4E8;">提交数据库事务</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">开启数据库事务</span></span>
<span class="line"><span style="color:#24292E;">创建订单</span></span>
<span class="line"><span style="color:#24292E;">会员积分增加</span></span>
<span class="line"><span style="color:#24292E;">商品库存减少</span></span>
<span class="line"><span style="color:#24292E;">提交数据库事务</span></span></code></pre></div><p>在这个过程中，因为程序操作的是单点数据库，所以在一个数据库事务中便可完成所有操作，利用数据库事务自带的原子性保证了所有数据要么全部处理成功，要么全部回滚撤销。但是放在以微服务为代表的分布式架构下问题就没那么简单了，我们来看一下示意图。</p>`,7),E=l('<p>分布式架构下调用关系图</p><p>可以看到，商城应用作为业务的发起者分别向订单、会员、库存服务发起了调用，而这些服务又拥有自己独立的数据存储，因为在物理上各个数据库服务器都是独立的，每一个步骤的操作都会创建独立的事务，这就意味着在分布式处理时无法通过单点数据库利用一个事务保证数据的完整性，我们必须引入某种额外的机制来协调多个事务要么全部提交、要么全部回滚，以此保证数据的完整性，这便是&quot;分布式事务&quot;的由来。</p><p>在分布式架构中有两种经典的分布式事务解决方案：<strong>二阶段提交（2PC</strong> ）与<strong>三阶段提交（3PC）</strong>。</p><h4 id="二阶段提交" tabindex="-1">二阶段提交 <a class="header-anchor" href="#二阶段提交" aria-label="Permalink to &quot;二阶段提交&quot;">​</a></h4><p>首先咱们分析下二阶段提交的处理过程，下面是二阶段提交中的<strong>第一个阶段：事务预处理阶段。</strong></p>',5),y=s("p",null,"2PC 阶段一：事务预处理阶段",-1),d=s("p",null,[a('可以看到，相比单点事务，分布式事务中增加了一个新的角色：事务协调者（Coordinator），它的职责就是协调各个分支事务的开启与提交、回滚的处理。以上图为例，当商城应用订单创建后，首先事务协调者会向各服务下达"处理本地事务"的通知，所谓本地事务就是每个服务应该做的事情，如订单服务中负责创建新的订单记录；会员服务负责增加会员的积分；库存服务负责减少库存数量。在这个阶段，被操作的所有数据都处于未提交（uncommit）的状态，会被排它锁锁定。当本地事务都处理完成后，会通知事务协调者"本地事务处理完毕"。当事务协调者陆续收到订单、会员、库存服务的处理完毕通知后，便进入"'),s("strong",null,"阶段二：提交阶段"),a('"。')],-1),_=s("p",null,"2PC 阶段二：提交阶段",-1),A=s("p",null,'在提交阶段，事务协调者会向每一个服务下达提交命令，每个服务收到提交命令后在本地事务中对阶段一未提交的数据执行 Commit 提交以完成数据最终的写入，之后服务便向事务协调者上报"提交成功"的通知。当事务协调者收到所有服务"提交成功"的通知后，就意味着一次分布式事务处理已完成。',-1),g=s("p",null,'这便是二阶段提交的正常执行过程，但假设在阶段一有任何一个服务因某种原因向事务协调者上报"事务处理失败"，就意味着整体业务处理出现问题，阶段二的操作就自动改为回滚（Rollback）处理，将所有未提交的数据撤销，使数据还原以保证完整性。',-1),h=s("p",null,"对于二阶段提交来说，它有一个致命问题，当阶段二某个服务因为网络原因无法收到协调者下达的提交命令，则未提交的数据就会被长时间阻塞，可能导致系统崩溃。",-1),u=s("p",null,"二阶段提交的缺陷",-1),C=s("p",null,'以上图为例，假如在提交阶段，库存服务实例与事务协调者之间断网。提交指令无法下达，这会导致库存中的"飞科剃须刀"商品库存记录会长期处于未提交的状态，因为这条记录被数据库排他锁长期独占，之后再有其他线程要访问"飞科剃须刀"库存数据，该线程就会长期处于阻塞状态，随着阻塞线程的不断增加，库存服务会面临崩溃的风险。',-1),S=s("p",null,'那这个问题要怎么解决呢？其实只要在服务这一侧增加超时机制，过一段时间被锁定的"飞科剃须刀"数据因超时自动执行提交操作，释放锁定资源。尽管这样做会导致数据不一致，但也比线程积压导致服务崩溃要好，出于此目的，三阶段提交（3PC）便应运而生。',-1),T=s("h4",{id:"三阶段提交",tabindex:"-1"},[a("三阶段提交 "),s("a",{class:"header-anchor",href:"#三阶段提交","aria-label":'Permalink to "三阶段提交"'},"​")],-1),b=s("p",null,[a('三阶段提交实质是将二阶段中的提交阶段拆分为"'),s("strong",null,"预提交阶段"),a(' "与"'),s("strong",null,"提交阶段"),a('"，同时在服务端都引入超时机制，保证数据库资源不会被长时间锁定。下面是三阶段提交的示意流程：')],-1),F=s("p",null,"3PC 阶段一：事务预处理阶段",-1),D=s("ul",null,[s("li",null,[s("strong",null,"阶段一：事务预处理阶段。")])],-1),m=s("p",null,"3PC 的事务预处理阶段与 2PC 是一样的，用于处理本地事务，锁定数据库资源，当所有服务返回成功后，进入阶段二。",-1),P=l('<p>3PC 阶段二：预提交阶段</p><ul><li><strong>阶段二：预提交阶段。</strong></li></ul><p>预提交阶段只是一个询问机制，以确认所有服务都已准备好，同时在此阶段协调者和参与者都设置了超时时间以防止出现长时间资源锁定。当阶段二所有服务返回&quot;可以提交&quot;，进入阶段三&quot;提交阶段&quot;。</p><ul><li><strong>阶段三：提交阶段。</strong></li></ul><p>3PC 的提交阶段与 2PC 的提交阶段是一致的，在每一个数据库中执行提交实现数据的资源写入，如果协调者与服务通信中断导致无法提交，在服务端超时后在也会自动执行提交操作来保证资源释放。</p><p>通过对比我们发现，三阶段提交是二阶段提交的优化版本，主要通过加入预提交阶段引入了超时机制，让数据库资源不会被长期锁定，但这也会带来一个新问题，数据一致性也很可能因为超时后的强制提交被破坏，对于这个问题各大软件公司都在各显神通，常见的做法有：增加异步的数据补偿任务、日终跑批前的数据补偿、更完善的业务数据完整性的校验代码、引入数据监控及时通知人工补录这些都是不错的补救措施。</p><p>讲到这，相比你对 2PC 与 3PC 的分布式事务方案应该有了初步的了解，这里我还是要强调下，无论是 2PC 与 3PC 都是一种方案，是一种宏观的设计。如果要落地就要依托具体的软件产品，在 Java 开源领域能够提供完善的分布式事务解决方案的产品并不多，比较有代表性的产品有 ByteTCC、TX-LCN、EasyTransaction、Alibaba Seata，其中无论从成熟度、厂商背景、更新频度、社区活跃度各维度比较，Alibaba Seata都是数一数二的分布式事务中间件产品，本讲后面的内容将围绕Alibaba Seata的AT模式展开，探讨Alibaba Seata是如何实现自动化的分布式事务处理的。</p><h3 id="alibaba-seata-分布式事务中间件" tabindex="-1">Alibaba Seata 分布式事务中间件 <a class="header-anchor" href="#alibaba-seata-分布式事务中间件" aria-label="Permalink to &quot;Alibaba Seata 分布式事务中间件&quot;">​</a></h3><p>Alibaba Seata 是一款开源的分布式事务解决方案，致力于在微服务架构下提供高性能和简单易用的分布式事务服务。它的官网是<a href="http://seata.io/?fileGuid=xxQTRXtVcqtHK6j8" target="_blank" rel="noreferrer">http://seata.io/</a>,截止到目前 Seata 在 GitHub 已有 18564 star，最新版本已迭代到 1.4.0，阿里多年的技术沉淀让 Seata 的内部版本平稳渡过了多次双 11 的考验。2019 年 1 月为了打造更加完善的技术生态和普惠技术成果，Seata 正式宣布对外开源，未来 Seata 将以社区共建的形式帮助其技术更加可靠与完备，按官方的说法Seata目前已具备了在生产环境使用的条件。</p>',9),q=s("p",null,"Seata 提供了多种分布式事务的解决方案，包含 AT 模式、TCC 模式、SAGA 模式以及 XA 模式。其中 AT 模式提供了最简单易用且无侵入的事务处理机制，通过自动生成反向 SQL 实现事务回滚。从 AT 模式入手使用，使我们理解分布式事务处理机制是非常好的学习办法。",-1),v=s("p",null,"Seata 的特色功能",-1),k=s("p",null,"AT 模式是 Seata 独创的模式，它是基于 2PC 的方案，核心理念是利用数据库 JDBC 加上 Oracle、MySQL 自带的事务方式来对我们分布式事务进行管理。说起来有点晦涩，下边我就结合这张 AT 模式方案图给大家介绍，在 Seata 中关于分布式事务到底需要哪些组件，以及他们都起到了什么样的职能。",-1),M=l('<p>Seata 组件图</p><p>通过Seata组件图我们可以看到三个组成部分：</p><ul><li><p><strong>第一个是事务协调者（TC）</strong>，它的作用是维护全局和分支事务的状态，驱动全局事务提交或者回滚，这正是前面讲解 2PC 或者 3PC 方案时提到的事务协调者组件的具体实现，TC 由 SEATA 官方提供。</p></li><li><p><strong>第二个是事务管理器（TM）</strong>，事务管理器用于定义全局事务的范围，开始全局事务提交或者回滚全局事务都是由 TM 来决定。</p></li><li><p><strong>第三个是资源管理器（RM）</strong>，他用于管理分支事务处理的资源，并且报告分支事务的状态，并驱动分支事务提交或者回滚。</p></li></ul><p>这些概念可能有些晦涩，我们通过前面商城会员采购积分的例子进行讲解。</p><h3 id="seata-at-模式执行过程" tabindex="-1">Seata AT 模式执行过程 <a class="header-anchor" href="#seata-at-模式执行过程" aria-label="Permalink to &quot;Seata AT 模式执行过程&quot;">​</a></h3>',5),R=l(`<p>创建订单调用逻辑</p><p>这里我先给出商城应用中会员采购业务的伪代码。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">会员采购(){</span></span>
<span class="line"><span style="color:#E1E4E8;">    订单服务.创建订单();</span></span>
<span class="line"><span style="color:#E1E4E8;">    积分服务.增加积分();</span></span>
<span class="line"><span style="color:#E1E4E8;">    库存服务.减少库存();</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">会员采购(){</span></span>
<span class="line"><span style="color:#24292E;">    订单服务.创建订单();</span></span>
<span class="line"><span style="color:#24292E;">    积分服务.增加积分();</span></span>
<span class="line"><span style="color:#24292E;">    库存服务.减少库存();</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>在会员采购方法中，需要分别执行<strong>创建订单、增加积分、减少库存</strong>三个步骤完成业务，对于&quot;会员采购&quot;来说方法执行成功，则代表这个全局分布式事务需要提交，如果中间过程出错，则需要全局回滚，这个业务方法本身就决定了全局提交、回滚的时机以及决定了哪些服务需要参与业务处理，因此商城应用的会员采购方法就充当起事务管理器（TM）的角色。</p><p>而与之对应的在订单服务中创建订单、会员服务中增加积分、库存服务减少库存这些实际产生的数据处理的服务模块，则被称为资源管理器（RM)。</p><p>最后就是由Seata提供的Seata-Server中间件则提供事务协调者（TC）这个角色，实施全局事务1的提交、回滚命令下发。</p><p>为了方便理解，我画了时序图介绍 Seata 的执行过程。</p>`,7),O=l(`<p>Seata 时序图</p><p>第一步，在商城应用（TM）与三个服务（RM）启动后自动向事务协调者Seata-Server（TC）进行注册，让 TC 知晓各个组件的详细信息。</p><p>第二步，当会员购物时会执行 TM 的&quot;会员采购&quot;方法，当进入方法前 Seata 为 TM 提供的客户端会自动生效，向 TC 发出开启全局事务的请求。</p><p>第三步，会员采购方法开始执行，会依次执行 3 个服务的新增订单、增加积分、减少库存，在请求送往新的 RM 时，都会向 TC 注册新的分支事务。这些分支事务在处理时不但向业务表写入数据，还会自动向 Seata 强制要求的 UNDO_LOG 回滚日志表写入回滚 SQL 日志。</p><p>以新增订单事务为例：新增订单时执行的 SQL 语句如下：</p><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">INSERT INTO</span><span style="color:#E1E4E8;"> order(id,...) </span><span style="color:#F97583;">values</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">1001</span><span style="color:#E1E4E8;">,...)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">INSERT INTO</span><span style="color:#24292E;"> order(id,...) </span><span style="color:#D73A49;">values</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">1001</span><span style="color:#24292E;">,...)</span></span></code></pre></div><p>与之对应的，Seata 的回滚日志是基于 SQL 反向生成，新增订单创建了 1001 订单，那 Seata会对 SQL 进行解析生成反向的回滚 SQL 日志保存在 UNDO_LOG 表，如下所示：</p><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">DELETE</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">FROM</span><span style="color:#E1E4E8;"> order </span><span style="color:#F97583;">WHERE</span><span style="color:#E1E4E8;"> id </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1001</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">DELETE</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">FROM</span><span style="color:#24292E;"> order </span><span style="color:#D73A49;">WHERE</span><span style="color:#24292E;"> id </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1001</span></span></code></pre></div><p>与之类似会员积分会生成加积分的业务 SQL 以及减积分的回滚 SQL。</p><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">#加积分</span></span>
<span class="line"><span style="color:#F97583;">UPDATE</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">FROM</span><span style="color:#E1E4E8;"> points </span><span style="color:#F97583;">SET</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">point</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">180</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">20</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">WHERE</span><span style="color:#E1E4E8;"> mid </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">182</span></span>
<span class="line"><span style="color:#E1E4E8;">#UNDO_LOG表中的减积分SQL</span></span>
<span class="line"><span style="color:#F97583;">UPDATE</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">FROM</span><span style="color:#E1E4E8;"> points </span><span style="color:#F97583;">SET</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">point</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">200</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">20</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">WHERE</span><span style="color:#E1E4E8;"> mid </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">182</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">#加积分</span></span>
<span class="line"><span style="color:#D73A49;">UPDATE</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">FROM</span><span style="color:#24292E;"> points </span><span style="color:#D73A49;">SET</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">point</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">180</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">20</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">WHERE</span><span style="color:#24292E;"> mid </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">182</span></span>
<span class="line"><span style="color:#24292E;">#UNDO_LOG表中的减积分SQL</span></span>
<span class="line"><span style="color:#D73A49;">UPDATE</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">FROM</span><span style="color:#24292E;"> points </span><span style="color:#D73A49;">SET</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">point</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">200</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">-</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">20</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">WHERE</span><span style="color:#24292E;"> mid </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">182</span></span></code></pre></div><p>第四步，当 RM 的分支事务执行成功后，会自动向 TC 上报分支事务处理成功。</p><p>第五步，当会员采购方法正确执行，所有 RM 也向 TC 上报分支事务处理成功，在&quot;会员采购&quot;方法退出前，TM 内置的 Seata 客户端会向 TC 自动发起&quot;提交全局事务&quot;请求。TC 收到&quot;提交全局事务&quot;请求，向所有 RM 下达提交分支事务的命令，每一个 RM 在收到提交命令后，会删除之前保存在 UNDO_LOG 表中的回滚日志。</p><p>但是事情总会有意外，假设某个 RM 分支事务处理失败，此时 TM 便不再向 TC 发起&quot;提交全局事务&quot;，转而发送&quot;回滚全局事务&quot;，TC 收到后，通知所有之前已处理成功的 RM 执行回滚 SQL 将数据回滚。</p><p>比如 1001 订单在第三步&quot;减少库存&quot;时发现库存不足导致库存服务预处理失败，那全局回滚时第一步订单服务会自动执行删除 1001 订单的回滚 SQL。</p><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">DELETE</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">FROM</span><span style="color:#E1E4E8;"> order </span><span style="color:#F97583;">WHERE</span><span style="color:#E1E4E8;"> id </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1001</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">DELETE</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">FROM</span><span style="color:#24292E;"> order </span><span style="color:#D73A49;">WHERE</span><span style="color:#24292E;"> id </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1001</span></span></code></pre></div><p>以及第二步积分服务会自动执行减少积分的回滚 SQL。</p><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">UPDATE</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">FROM</span><span style="color:#E1E4E8;"> points </span><span style="color:#F97583;">SET</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">point</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">200</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">20</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">WHERE</span><span style="color:#E1E4E8;"> mid </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">182</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">UPDATE</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">FROM</span><span style="color:#24292E;"> points </span><span style="color:#D73A49;">SET</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">point</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">200</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">-</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">20</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">WHERE</span><span style="color:#24292E;"> mid </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">182</span></span></code></pre></div><p>Seata AT模式就是通过执行反向 SQL 达到数据还原的目的，当反向 SQL 执行后便自动从 UNDO_LOG 表中删除。这便是 Seata AT 模式的大致执行过程，在这个过程中我们发现 Seata AT 模式设计的巧妙之处，Seata 为了能做到无侵入的自动实现全局事务提交与回滚，它在 TM端利用了类似于&quot;Spring 声明式事务&quot;的设计，在进入 TM 方法前通知 TC 开启全局事务，在成功执行后自动提交全局事务，执行失败后进行全局回滚。同时在 RM 端也巧妙的采用了 SQL 解析技术自动生成了反向的回滚 SQL 来实现数据还原。</p><p>在这我也思考过，为什么 Seata 要生成反向 SQL，而不是利用数据库自带的排他锁机制处理呢？翻阅资料后理解到它的设计意图，如果采用排它锁机制会导致数据资源被锁死，可能会产生大量的数据资源阻塞，进而存在应用崩溃的风险。而生成反向 SQL 的方案则是在预处理阶段事务便已提交，不会出现长时间数据资源锁定的情况，这样能有效提高并发量。但这样做也有弊端，在研究时发现 Seata 是工作在&quot;读未提交&quot;的隔离级别，高并发环境下容易产生脏读、幻读的情况，这也是需要特别注意的地方。</p><h3 id="小结与预告" tabindex="-1">小结与预告 <a class="header-anchor" href="#小结与预告" aria-label="Permalink to &quot;小结与预告&quot;">​</a></h3><p>本讲我们首先针对分布式事务的 2PC 与 3PC 方案进行讲解，了解了分布式事务的执行过程与两者之间的区别；之后咱们认识了 Alibaba 出品的分布式事务中间件 Seata，最后通过电商会员采购的案例讲解了 Seata AT 模式的处理过程，让我们对 Seata 有了初步了解。在后面的实践篇，我们将本节偏理论的内容进行落地实现，看通过代码如何使用 Seata 处理分布式事务。</p><p>这里我为你留一道讨论题：既然分布式事务相比单点式事务要复杂得多，在项目中有什么好办法可以规避分布式事务呢？欢迎你把自己的想法写在评论区和大家一起分享。</p><p>下一讲我们讲解 Spring Cloud Alibaba 体系下的消息队列中间件 Alibaba RocketMQ，看通过 RocketMQ 如何解决服务间异步通信的问题。</p>`,23);function Q(B,L,W,N,f,V){const p=t("Image");return e(),c("div",null,[i,n(p,{alt:"图片1.png",src:"https://s0.lgstatic.com/i/image6/M00/31/3A/CioPOWBsQPKAN4wTAAEBb9VqWsQ374.png"}),a(),E,n(p,{alt:"图片2.png",src:"https://s0.lgstatic.com/i/image6/M00/31/3A/CioPOWBsQQCARCHWAAFYFUA6lfU789.png"}),a(),y,d,n(p,{alt:"图片3.png",src:"https://s0.lgstatic.com/i/image6/M01/31/32/Cgp9HWBsQQ-AO4-SAAEqPzPTZ7w364.png"}),a(),_,A,g,h,n(p,{alt:"图片4.png",src:"https://s0.lgstatic.com/i/image6/M00/31/3A/CioPOWBsQUSADeWqAAEyyNR7o8E788.png"}),a(),u,C,S,T,b,n(p,{alt:"图片5.png",src:"https://s0.lgstatic.com/i/image6/M01/31/32/Cgp9HWBsQVCAZH3SAAFYFUA6lfU014.png"}),a(),F,D,m,n(p,{alt:"图片6.png",src:"https://s0.lgstatic.com/i/image6/M00/31/3A/CioPOWBsQWqABC-IAAEeBWGqOLQ853.png"}),a(),P,n(p,{alt:"Drawing 6.png",src:"https://s0.lgstatic.com/i/image6/M00/2C/C1/CioPOWBlidqAOQe-AASTbag_bO0476.png"}),a(),q,n(p,{alt:"Drawing 7.png",src:"https://s0.lgstatic.com/i/image6/M01/2C/C1/CioPOWBlieOAReN5AADg3SbfFhE124.png"}),a(),v,k,n(p,{alt:"Drawing 8.png",src:"https://s0.lgstatic.com/i/image6/M01/2C/C1/CioPOWBlieyAWtXpAAF71Z7iu4s460.png"}),a(),M,n(p,{alt:"图片1.png",src:"https://s0.lgstatic.com/i/image6/M01/31/32/Cgp9HWBsQXmAElvTAAEBb9VqWsQ307.png"}),a(),R,n(p,{alt:"图片7.png",src:"https://s0.lgstatic.com/i/image6/M01/31/32/Cgp9HWBsQYmAcXTtAAFjr2n0qsc325.png"}),a(),O])}const U=o(r,[["render",Q]]);export{H as __pageData,U as default};
