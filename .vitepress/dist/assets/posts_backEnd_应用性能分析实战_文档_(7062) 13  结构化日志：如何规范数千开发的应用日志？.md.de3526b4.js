import{_ as o,j as n,o as t,g as e,k as p,h as l,Q as s}from"./chunks/framework.a0d18f64.js";const C=JSON.parse('{"title":"13结构化日志：如何规范数千开发的应用日志？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/应用性能分析实战_文档/(7062) 13  结构化日志：如何规范数千开发的应用日志？.md","filePath":"posts/backEnd/应用性能分析实战_文档/(7062) 13  结构化日志：如何规范数千开发的应用日志？.md","lastUpdated":1696682708000}'),r={name:"posts/backEnd/应用性能分析实战_文档/(7062) 13  结构化日志：如何规范数千开发的应用日志？.md"},c=s(`<h1 id="_13结构化日志-如何规范数千开发的应用日志" tabindex="-1">13结构化日志：如何规范数千开发的应用日志？ <a class="header-anchor" href="#_13结构化日志-如何规范数千开发的应用日志" aria-label="Permalink to &quot;13结构化日志：如何规范数千开发的应用日志？&quot;">​</a></h1><p>在无法远程调试和网络环境隔离等条件下，<strong>应用日志</strong> 可以说是我们追查线上各种疑难杂症的<strong>第一手资料</strong>。</p><p>好的日志（或是日志埋点）衍生出的 APM 系统，可以让我们具备一种&quot;洞察力&quot;，即先于用户发现问题、定位问题、解决问题；而无规范的应用日志，则会让线上日志五花八门，严重降低线上第一手资料的质量。</p><p>从&quot;低头写日志代码&quot;到&quot;抬头写日志&quot;，对于每个 RD 来说，这是一种势在必行的改变。这里&quot;抬头写日志&quot;，意思是写出的日志能更好地融入 APM 生态，并更符合日志规范。这样在定位问题时，才能根据日志做到有的放矢，笃定而行。</p><p>所以这一讲，我将以用户订单下单的业务场景为例，教你如何将原始日志改造为结构化日志，并与你分享日志规范化在融入 APM 生态时的踩坑故事与心得经验。其中，框架日志矩阵法和日志码是重点，它们是最能规范数千 RD 编写应用日志的技术手段。</p><h3 id="为什么需要结构化日志" tabindex="-1">为什么需要结构化日志？ <a class="header-anchor" href="#为什么需要结构化日志" aria-label="Permalink to &quot;为什么需要结构化日志？&quot;">​</a></h3><p>在项目迭代过程中，我们会在代码的必要位置打印日志。比如订单系统，我们会在用户下单的核心代码块，增加 try-catch 去捕获下单逻辑的异常；并在 catch 代码块中，使用 LOGGER.error 方法记录异常日志。</p><p>当 RD 上线忘记创建线上表的时候，异常日志是这样的：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">timestamp [thread</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">id] ERROR Class </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;"> Table </span><span style="color:#9ECBFF;">&#39;local.dual_1&#39;</span><span style="color:#E1E4E8;"> doesn</span><span style="color:#9ECBFF;">&#39;t exist</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">timestamp [thread</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">id] ERROR Class </span><span style="color:#D73A49;">-</span><span style="color:#24292E;"> Table </span><span style="color:#032F62;">&#39;local.dual_1&#39;</span><span style="color:#24292E;"> doesn</span><span style="color:#032F62;">&#39;t exist</span></span></code></pre></div><h4 id="_1-结构化日志前" tabindex="-1">1.结构化日志前 <a class="header-anchor" href="#_1-结构化日志前" aria-label="Permalink to &quot;1.结构化日志前&quot;">​</a></h4><p>起初，我们会将 ERROR 类型的日志单独放在一个日志文件中，然后通过脚本监听 ERROR 日志文件的增量；当 ERROR 增加时，触发报警；随后 RD 登录堡垒机去搜索日志，从而定位问题。如果公司有安全审计的规范，还要填写工单，拜托 OP（运维专员）去帮忙日志脱敏后下载到本地，才能开始定位问题。</p><p>总体来说，这个流程十分原始。</p><p>为了解决这个问题，我们会引入 APM 项目 ELK 来处理和分析日志。ELK 具备可视化日志功能，团队成员在接收报警后，只需要登录 ELK，就都可以看到异常日志。</p><p>但是，针对上面的 Case，如果不对日志进行改造，贸然引入 ELK，不仅无法发挥出 ELK 的能力，还会带来更多问题。</p><ul><li><p>这个异常日志是由什么应用服务打印的？以及应用的负责人是谁？</p></li><li><p>日志看不懂，找开发的 RD 时，不知道如何快速对齐解决问题的单点瓶颈。</p></li><li><p>日志记不全，不知道引起异常的 SQL 是什么，以及 DB 集群是哪个。</p></li><li><p>......</p></li></ul><h4 id="_2-结构化日志后" tabindex="-1">2.结构化日志后 <a class="header-anchor" href="#_2-结构化日志后" aria-label="Permalink to &quot;2.结构化日志后&quot;">​</a></h4><p>我们的解决办法是将原来的原始日志改造为结构化日志。顾名思义，结构化日志，即日志是具有结构的。以上面 CASE 的改造为例，结构化后的日志为：</p><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">{ </span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#79B8FF;">&quot;application_id&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;order&quot;</span><span style="color:#E1E4E8;">, </span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#79B8FF;">&quot;log_type&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;mysql_fail&quot;</span><span style="color:#E1E4E8;">, </span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#79B8FF;">&quot;trace_id&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;snow_001&quot;</span><span style="color:#E1E4E8;">, </span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#79B8FF;">&quot;error_msg&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;Table &#39;local.dual_1&#39; doesn&#39;t exist&quot;</span><span style="color:#E1E4E8;">, </span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#79B8FF;">&quot;sql&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;select &#39;str&#39; from dual_1&quot;</span><span style="color:#E1E4E8;">, </span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#79B8FF;">&quot;latency&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;10&quot;</span><span style="color:#E1E4E8;">, </span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#79B8FF;">&quot;local_ip&quot;</span><span style="color:#E1E4E8;">:</span><span style="color:#9ECBFF;">&quot;127.0.0.1&quot;</span><span style="color:#E1E4E8;">, </span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#79B8FF;">&quot;remote_ip&quot;</span><span style="color:#E1E4E8;">:</span><span style="color:#9ECBFF;">&quot;localhost&quot;</span><span style="color:#E1E4E8;">, </span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#79B8FF;">&quot;remote_port&quot;</span><span style="color:#E1E4E8;">:</span><span style="color:#9ECBFF;">&quot;3306&quot;</span><span style="color:#E1E4E8;">, </span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#79B8FF;">&quot;db_name&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;local&quot;</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">{ </span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#005CC5;">&quot;application_id&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;order&quot;</span><span style="color:#24292E;">, </span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#005CC5;">&quot;log_type&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;mysql_fail&quot;</span><span style="color:#24292E;">, </span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#005CC5;">&quot;trace_id&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;snow_001&quot;</span><span style="color:#24292E;">, </span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#005CC5;">&quot;error_msg&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;Table &#39;local.dual_1&#39; doesn&#39;t exist&quot;</span><span style="color:#24292E;">, </span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#005CC5;">&quot;sql&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;select &#39;str&#39; from dual_1&quot;</span><span style="color:#24292E;">, </span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#005CC5;">&quot;latency&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;10&quot;</span><span style="color:#24292E;">, </span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#005CC5;">&quot;local_ip&quot;</span><span style="color:#24292E;">:</span><span style="color:#032F62;">&quot;127.0.0.1&quot;</span><span style="color:#24292E;">, </span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#005CC5;">&quot;remote_ip&quot;</span><span style="color:#24292E;">:</span><span style="color:#032F62;">&quot;localhost&quot;</span><span style="color:#24292E;">, </span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#005CC5;">&quot;remote_port&quot;</span><span style="color:#24292E;">:</span><span style="color:#032F62;">&quot;3306&quot;</span><span style="color:#24292E;">, </span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#005CC5;">&quot;db_name&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;local&quot;</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>结构化日志可以让团队所有人快速拉齐信息水平，ELK 中展示的异常日志，便很容易被理解：</p><ul><li><p>异常日志（error_msg）&quot;Table &#39;local.dual_1&#39; doesn&#39;t exist&quot; 是由应用（application_id）订单系统（order）引起的；</p></li><li><p>应用节点（local_ip）127.0.0.1 使用 SQL&quot;select &#39;str&#39; from dual_1&quot; 调用localhost:3306（remote_ip:remote_port）集群；</p></li><li><p>可以使用全局链路 ID（trace_id）snow_001 来跟踪此异常对上下游造成的影响。</p></li></ul><p>你看，日志经过结构化处理，不仅可以降低沟通成本，还能提高每个人对问题的认知，最终帮助定位问题提效。</p><h3 id="如何将原始日志改造为结构化日志" tabindex="-1">如何将原始日志改造为结构化日志？ <a class="header-anchor" href="#如何将原始日志改造为结构化日志" aria-label="Permalink to &quot;如何将原始日志改造为结构化日志？&quot;">​</a></h3><p>首先我们看上面的 Case，结构化日志就是以 JSON 为结构输出，结构化后的日志会更亲和 ELK 的处理和分析。</p><p>以用户订单下单的业务场景为例，如下图所示。</p><ul><li><p><strong>App</strong>：用户通过手机 App 进行下单请求，会在 App 上生成相应的埋点日志。</p></li><li><p><strong>Nginx</strong>：请求经过 Nginx 会记录访问日志，然后根据请求的路由规则，专访到相应的应用服务器。</p></li><li><p><strong>应用服务</strong>：应用服务器 HTTP 框架记录本次请求的分析信息；下单代码块会记录本次请求在代码块中的运行过程；ORM 框架日志会记录本次操作引起的数据变更。</p></li></ul>`,25),i=s('<p>用户下单业务场景流程图</p><p>接下来，我会根据订单服务用户下订单的场景，来详细讲述结构化日志应该如何拆分，以及拆分后的每种日志又是如何实现结构化的。</p><h4 id="_1-日志的拆分" tabindex="-1">1.日志的拆分 <a class="header-anchor" href="#_1-日志的拆分" aria-label="Permalink to &quot;1.日志的拆分&quot;">​</a></h4><p>用户通过手机 App 进行下单操作，引发的日志会拆分为&quot;用户下单业务场景流程图&quot;中所示的那 5 类：</p><ul><li><p>用户操作行为的埋点日志</p></li><li><p>Nginx 路由请求的日志</p></li><li><p>HTTP 框架接口提供者日志</p></li><li><p>核心业务下单日志</p></li><li><p>ORM 框架操作数据库日志</p></li></ul><p>可以看出，日志的拆分就是把不同作用的日志，存储到相应的日志文件里面。</p><p>拆分带来的好处是在我们定位线上问题的时候就会清晰很多：</p><ul><li><p>比如，我们在进行数据库的性能分析时，可以以 ORM 框架操作数据库的日志为根据；</p></li><li><p>然后，再通过进程 ID、TraceID 或是毫秒级的时间戳，关联到核心业务日志；</p></li><li><p>接着，通过 HTTP 框架接口提供者日志和 Nginx 路由请求的日志，查询出返回给调用者的信息是什么；</p></li><li><p>最后，根据用户操作行为的埋点日志解决线上问题。</p></li></ul><p>在这样的拆分过程中，我们将日志分为了 5 类；而对于这 5 类日志，我们又可以从编写日志的用户角度将其分为两类：</p><ul><li><p>基础架构组 RD 编写的<strong>框架日志</strong></p></li><li><p>负责应用迭代 RD 编写的<strong>业务日志</strong></p></li></ul><p>接下来我展开讲解一下。</p><h4 id="_2-框架日志" tabindex="-1">2.框架日志 <a class="header-anchor" href="#_2-框架日志" aria-label="Permalink to &quot;2.框架日志&quot;">​</a></h4><p>对于用户通过手机 App 进行下单操作已发的上述 5 类日志，其中：</p><ul><li><p>用户操作行为的埋点日志</p></li><li><p>Nginx 路由请求的日志</p></li><li><p>HTTP 框架接口提供者日志</p></li><li><p>ORM 框架操作数据库日志</p></li></ul><p>这 4 类属于框架日志，它们一般由基础架构 RD 负责完成。</p><p>在开发过程中，如果项目组内每个开发人员都能编写风格统一的日志，那么在运维处理问题时，就非常容易让每个人都参与进来，将力量拧成一股绳；反之，则各自为战。</p><p>那如何将日志风格统一呢？就需要让每个场景的日志都具备这个场景的标准属性，就像表达方式中的&quot;主谓宾定状补&quot;一样，一句话便拆分出明确意义的属性。这样在理解时，就可以更精准、有目的性地知道主语是谁、谓语是哪个。</p><p>接下来，我们看一下如何做到让结构化框架日志的每个日志属性都有意义，让其关键信息尽可能少遗漏呢？你可以使用日志矩阵法，去梳理框架日志是否全备。</p><p><strong>【框架日志矩阵法】</strong></p><p>通过矩阵法可以评估和决策日志框架记录得是否符合预期，以 HTTP 框架和 ORM 框架为例：</p><ul><li><p>Y 代表需要任何情况都需要记录该字段；</p></li><li><p>O 代表需要在特定的情况下无须人为介入，会记录该字段，如发生慢查；</p></li><li><p>D 代表需要在动态开启 DEBUG 时，记录该字段；</p></li><li><p>橙色代表从系统资源中获取；</p></li><li><p>黄色代表从框架对象中获取。</p></li></ul>',21),u=s('<p>框架日志矩阵法，可以清晰地让原始日志变为规范的结构化日志：</p><ul><li><p>定位问题时，明确结构化日志中 JSON 每个属性的作用；</p></li><li><p>定位问题后，我们需要及时复盘结构化框架日志的属性是否有缺失，若有缺失需及时复盘和迭代框架日志矩阵。</p></li></ul><h4 id="_3-业务日志" tabindex="-1">3.业务日志 <a class="header-anchor" href="#_3-业务日志" aria-label="Permalink to &quot;3.业务日志&quot;">​</a></h4><p>在刚刚介绍 5 大类日志中，除 4 大框架日志外，被&quot;落单&quot;的核心业务下单日志，就是接下来我要讲解的<strong>业务日志</strong>了，它由负责应用迭代的 RD 完成。</p><p>以我的实践经验，100 行的业务代码，至少会有 1 处关键业务日志。当项目迭代 2 年以上，代码量超过 10 万行时，那项目就至少会有 1000 处关键业务日志。</p><p>当线上出现问题时，RD 会根据业务日志现场，也就是核心业务日志去翻看代码，然后从代码视角来解释现场。当项目的交接和新人的加入时，新接手项目的 RD 会逐渐对原始日志产生理解偏差，所以这种方式也不友好、高效。具体原因如下：</p><ul><li><p>时效低，因为没有使用日志码；</p></li><li><p>由于代码编写的风格不同，RD 也很难理解前人写的原始代码。</p></li></ul><p>而如果我们使用<strong>日志码</strong>和异常规范，就可以从原始作者视角来解释日志，并且可以形成业务日志资产。</p><p><strong>【日志码】</strong></p><p>日志码就是在 RD 定义核心日志时，需要<strong>对日志信息指定相应的日志码</strong>。日志码的指定，解决了代码的日志信息不能书写很多，且需要上线才能完成迭代等问题。</p><p>当日志信息指定了日志码后，日志信息的角色是简单的代码逻辑阐述。</p><ul><li><p>比如，[A0001] 用户 uid:001 下单失败的原因，账户已被冻结。那我们根据标准的日志码，定义更详细的日志信息和线上问题跟进手册。</p></li><li><p>再比如，日志码 A0001 首次上线时，原始开发成员对 A0001 日志码进行解释，随着项目的运行，值班成员只需对 A0001 相关的工单进行关联。这样向上出现问题时，我们就可以通过日志码快速解决线上问题。</p></li></ul><p>这里给你几个日志码指定时的<strong>建议</strong>。</p><ul><li><p>以目前国内微服务化和中台化的应用形态，3~5 年项目就会重构，代码至多有几十万行为依据，日志码可以有首位 1 个字母 + 4 个数字组成。首字母代表应用系统代码块的业务类型，递增数字代表日志码的增量。</p></li><li><p>日志码的指定可以解决线上日志的可追溯性问题，降低沟通成本。所以项目的日志码字典最好在项目初期就建立，并且业务日志相关的代码块迭代时，以及值班发现相关代码块出现问题时，都要对日志码进行迭代，这样才能发挥出日志码的价值。</p></li><li><p>日志码字典的维护，应该面向可量化监控设计。比如 A0001 代表用户下单时，资金冻结。那当 A0001 日志码超过一定量时，是否可以预测出相关联的上下游系统需要做出的必要调整动作。</p></li></ul><h3 id="日志规范化踩坑-如何无侵入式地实现异步日志框架与分布式链路集成" tabindex="-1">日志规范化踩坑：如何无侵入式地实现异步日志框架与分布式链路集成？ <a class="header-anchor" href="#日志规范化踩坑-如何无侵入式地实现异步日志框架与分布式链路集成" aria-label="Permalink to &quot;日志规范化踩坑：如何无侵入式地实现异步日志框架与分布式链路集成？&quot;">​</a></h3><p>应用服务使用异步日志减少资源开销已是当下的常态，使用异步日志集成 APM 是有改造成本的，那如何让落地方案最优呢？接下来，我将结合异步日志框架原理和无侵入集成 APM 的落地方案，与你分享我的踩坑、填坑的经历。</p><h4 id="_1-引入异步日志框架" tabindex="-1">1.引入异步日志框架 <a class="header-anchor" href="#_1-引入异步日志框架" aria-label="Permalink to &quot;1.引入异步日志框架&quot;">​</a></h4><p>随着日志的规范化落地，改造后的打印结构化日志也带来了更大的性能开销。所以，为了提高日志的性能，我们会<strong>引入异步日志框架</strong>来解决此问题。</p><p>以 Log4j2 中的异步日志为例，主线程打印日志的代码并不会立刻将日志打印到磁盘上，而是将日志信息保存到异步队列。由异步队列定时、批量地将日志信息从队列中拉取出，一起打印到日志文件中，从而提高打印日志的性能。</p><p>业务线程、日志线程打印日志流程你可以参考下面的流程图：</p>',20),E=s('<h4 id="_2-解决分布式链路集成问题" tabindex="-1">2.解决分布式链路集成问题 <a class="header-anchor" href="#_2-解决分布式链路集成问题" aria-label="Permalink to &quot;2.解决分布式链路集成问题&quot;">​</a></h4><p>而引入异步日志框架的同时，如果不对日志框架进行修改，就会造成与 APM 的分布式链路系统无法集成。</p><p>原因是在异步框架流程的两处，无法获取存在主线程 Thread Local 中的分布式链路信息，所以解决的两个关键点是：</p><ul><li><p>在 1 处获取必要的主线程 Thread Local 中的分布式链路信息；</p></li><li><p>在 2 处改为从 LogEvent 事件获取分布式链路信息进行打印。</p></li></ul><p>这个说起来很简单，但是现实的日志框架并没有给我们一些关键的拦截点，来实现这些代码的织入。而在主线程手动写入分布式链路信息，显然会带来很大的开发投入，而且保证 100% 编写正确的有效手段也很少。</p><p>所以我通过<strong>字节码增强技术</strong> ，无侵入地实现了异步日志框架与分布式链路集成的功能，你可以参考我在 Apache SkyWalking 的这个<a href="https://github.com/apache/skywalking/pull/2750?fileGuid=xxQTRXtVcqtHK6j8" target="_blank" rel="noreferrer">Merge Request</a>进行更深入的学习。</p><h3 id="小结与思考" tabindex="-1">小结与思考 <a class="header-anchor" href="#小结与思考" aria-label="Permalink to &quot;小结与思考&quot;">​</a></h3><p>让集群中每个应用的日志都按照统一的规范进行编写，是每个团队在扩大过程中，都要解决的难题。</p><p>本讲使用<strong>结构化日志</strong>来实现规范化，这是一种普遍被认可的记录日志的方式。</p><ul><li><p>当线上出现问题时，它能让更多人可以根据规范的日志现场，去参与问题的定位；</p></li><li><p>并且在定位问题时，规范的日志可以减少沟通成本，提升解决问题的协作效率，避免日志过度个性化带来的&quot;信息孤岛&quot;等问题。</p></li></ul><p>围绕结构化日志，我还讲解了框架日志及框架<strong>日志矩阵法</strong> ，还有业务日志及<strong>日志码</strong>，这两大知识点，它们是实现开发人员日志规范化的基石，在提升应用日志专业化的重要手段。需要你反复吃透。</p><p>那么，你的团队有没有在应用服务中使用过类似日志码的&quot;各种码&quot;呢？如接口设计中，必不可少的错误码等。</p><p>你有想过这些&quot;各种码&quot;是如何联动的吗？我们又应该如何管理、治理这些码呢？你可以将你的思考与设计写在留言区，与大家讨论。</p>',13);function _(q,y,d,h,g,F){const a=n("Image");return t(),e("div",null,[c,p(a,{alt:"3.png",src:"https://s0.lgstatic.com/i/image6/M01/47/6B/Cgp9HWDQXNOAG8t7AAB0MsqNutA799.png"}),l(),i,p(a,{alt:"2.png",src:"https://s0.lgstatic.com/i/image6/M01/47/6B/Cgp9HWDQXLyAfmYnAAEyqvIit-E782.png"}),l(),u,p(a,{alt:"1.png",src:"https://s0.lgstatic.com/i/image6/M01/47/6B/Cgp9HWDQXJ-Ae4MNAABzDeoGUms470.png"}),l(),E])}const b=o(r,[["render",_]]);export{C as __pageData,b as default};
