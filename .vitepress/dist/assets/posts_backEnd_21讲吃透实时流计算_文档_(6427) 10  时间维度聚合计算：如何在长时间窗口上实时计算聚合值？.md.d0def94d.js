import{_ as p,j as t,o as e,g as c,k as a,h as o,Q as l,s}from"./chunks/framework.cfb14fe0.js";const h=JSON.parse('{"title":"10时间维度聚合计算：如何在长时间窗口上实时计算聚合值？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/21讲吃透实时流计算_文档/(6427) 10  时间维度聚合计算：如何在长时间窗口上实时计算聚合值？.md","filePath":"posts/backEnd/21讲吃透实时流计算_文档/(6427) 10  时间维度聚合计算：如何在长时间窗口上实时计算聚合值？.md","lastUpdated":1696682708000}'),r={name:"posts/backEnd/21讲吃透实时流计算_文档/(6427) 10  时间维度聚合计算：如何在长时间窗口上实时计算聚合值？.md"},y=l(`<h1 id="_10时间维度聚合计算-如何在长时间窗口上实时计算聚合值" tabindex="-1">10时间维度聚合计算：如何在长时间窗口上实时计算聚合值？ <a class="header-anchor" href="#_10时间维度聚合计算-如何在长时间窗口上实时计算聚合值" aria-label="Permalink to &quot;10时间维度聚合计算：如何在长时间窗口上实时计算聚合值？&quot;">​</a></h1><p>今天，我们来讨论实时流计算中第二类非常常见的算法，即时间维度聚合值的计算。</p><p>在<a href="https://kaiwu.lagou.com/course/courseInfo.htm?courseId=614#/detail/pc?id=6426" target="_blank" rel="noreferrer">09 课中</a>，我们在讨论流数据操作中的聚合 Reduce 操作时，就用到过时间窗口的概念。当时我们的思路是将流数据划分成一个个的滑动窗口，然后在每个窗口内进行聚合计算。这种做法实际上与传统关系型数据库，在实现聚合计算时使用的算法相同。</p><p>但是今天，我们要讨论的&quot;时间维度聚合值计算&quot;，则有了两个非常严格的限制：</p><ol><li><p>需要实时计算返回；</p></li><li><p>时间窗口很长且数据量很大。</p></li></ol><p>由于这两个限制的存在，现在我们则不得不采用另外一种与 <a href="https://kaiwu.lagou.com/course/courseInfo.htm?courseId=614#/detail/pc?id=6426" target="_blank" rel="noreferrer">09 课时</a>中的 Reduce 操作截然不同的思路和方法。而究其原因，一方面，当业务需要实时返回，尤其是要求每条数据在毫秒内返回时，就不再适合使用类似于每次滑动 1 秒的滑动窗口了；另一方面，当窗口非常长，并且数据量很大时，采用窗口计算的方式既需要保存大量数据，还需要对窗口内的数据进行全量计算，这样就不能够实现实时的效果了。</p><p>那我们究竟该如何在&quot;长时间窗口且数据量很大&quot;的情况下，实现&quot;时间维度聚合值&quot;的&quot;实时计算&quot;呢？这就是我们接下来要详细讨论的问题。</p><h3 id="实时计算时间维度聚合值的难点是什么" tabindex="-1">实时计算时间维度聚合值的难点是什么？ <a class="header-anchor" href="#实时计算时间维度聚合值的难点是什么" aria-label="Permalink to &quot;实时计算时间维度聚合值的难点是什么？&quot;">​</a></h3><p>按时间维度对数据进行聚合，是非常常见的计算问题。比如你是一个公司的老板，你想知道公司这个月的运营情况，你肯定是问这个月的销售额和成本各是多少，而不会去问每一笔买卖。</p><p>实际开发工作也如此，大部分数据系统的主要工作就是对数据做各种维度的聚合运算，比如计数（count）、求和（sum）、均值（avg）、方差（variance）、最小（min）、最大（max）等。而&quot;流数据&quot;作为一种数据系统，也是如此。</p><p>以风控场景为例，我们经常需要计算一些时间维度聚合特征。比如&quot;过去一周在相同设备上交易次数&quot;&quot;过去一天同一用户的交易总金额&quot;&quot;过去一周同一用户在同一 IP C 段的申请贷款次数&quot;等。如果用 SQL 描述上面的统计量，分别如下：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;"># 过去一周在相同设备上交易次数</span></span>
<span class="line"><span style="color:#E1E4E8;">SELECT </span><span style="color:#B392F0;">COUNT</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;">) FROM stream</span></span>
<span class="line"><span style="color:#E1E4E8;">WHERE event_type </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;transaction&quot;</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">AND timestamp </span><span style="color:#F97583;">&gt;=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1530547200000</span><span style="color:#E1E4E8;"> and timestamp </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1531152000000</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">GROUP BY device_id;</span></span>
<span class="line"><span style="color:#E1E4E8;"># 过去一天同一用户的总交易金额</span></span>
<span class="line"><span style="color:#E1E4E8;">SELECT </span><span style="color:#B392F0;">SUM</span><span style="color:#E1E4E8;">(amount) FROM stream</span></span>
<span class="line"><span style="color:#E1E4E8;">WHERE event_type </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;transaction&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">AND timestamp </span><span style="color:#F97583;">&gt;=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1531065600000</span><span style="color:#E1E4E8;"> and timestamp </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1531152000000</span></span>
<span class="line"><span style="color:#E1E4E8;">GROUP BY user_id;</span></span>
<span class="line"><span style="color:#E1E4E8;"># 过去一周同一用户在同一IP C段申请贷款次数</span></span>
<span class="line"><span style="color:#E1E4E8;">SELECT </span><span style="color:#B392F0;">COUNT</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;">) FROM stream </span></span>
<span class="line"><span style="color:#E1E4E8;">WHERE event_type </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;loan_application&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">AND timestamp </span><span style="color:#F97583;">&gt;=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1530547200000</span><span style="color:#E1E4E8;"> and timestamp </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1531152000000</span></span>
<span class="line"><span style="color:#E1E4E8;">GROUP BY ip_seg24;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;"># 过去一周在相同设备上交易次数</span></span>
<span class="line"><span style="color:#24292E;">SELECT </span><span style="color:#6F42C1;">COUNT</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">*</span><span style="color:#24292E;">) FROM stream</span></span>
<span class="line"><span style="color:#24292E;">WHERE event_type </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;transaction&quot;</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">AND timestamp </span><span style="color:#D73A49;">&gt;=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1530547200000</span><span style="color:#24292E;"> and timestamp </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1531152000000</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">GROUP BY device_id;</span></span>
<span class="line"><span style="color:#24292E;"># 过去一天同一用户的总交易金额</span></span>
<span class="line"><span style="color:#24292E;">SELECT </span><span style="color:#6F42C1;">SUM</span><span style="color:#24292E;">(amount) FROM stream</span></span>
<span class="line"><span style="color:#24292E;">WHERE event_type </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;transaction&quot;</span></span>
<span class="line"><span style="color:#24292E;">AND timestamp </span><span style="color:#D73A49;">&gt;=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1531065600000</span><span style="color:#24292E;"> and timestamp </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1531152000000</span></span>
<span class="line"><span style="color:#24292E;">GROUP BY user_id;</span></span>
<span class="line"><span style="color:#24292E;"># 过去一周同一用户在同一IP C段申请贷款次数</span></span>
<span class="line"><span style="color:#24292E;">SELECT </span><span style="color:#6F42C1;">COUNT</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">*</span><span style="color:#24292E;">) FROM stream </span></span>
<span class="line"><span style="color:#24292E;">WHERE event_type </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;loan_application&quot;</span></span>
<span class="line"><span style="color:#24292E;">AND timestamp </span><span style="color:#D73A49;">&gt;=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1530547200000</span><span style="color:#24292E;"> and timestamp </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1531152000000</span></span>
<span class="line"><span style="color:#24292E;">GROUP BY ip_seg24;</span></span></code></pre></div><p>上面的这些 SQL 让我们很容易想到关系型数据库。关系型数据库在执行上面这类 SQL 时，如果没有构建索引，执行引擎就会遍历整个表，过滤出符合条件的记录，然后按 GROUP BY 指定的字段对数据分组并进行聚合运算。</p><p>而当我们面对的是&quot;流数据&quot;时，应该怎样实现这类聚合计算呢？一种简单的策略，是复用上面用关系型数据库实现聚合运算时的方法。</p><p>当数据到来时，先把它保存到缓冲区，然后遍历窗口内的所有数据，过滤出符合指定条件的事件，并进行计数或求和等聚合运算，最后输出聚合结果。</p><p>但是大多数情况下，将这种简单的方式运用在实时流计算中，十有八九会遇到<strong>性能问题</strong>。</p><p>这是因为，<strong>如果将每条消息都保存在缓冲区中，当窗口较长、数据量较大时，会需要占用很多内存。而且每次的计算需要遍历所有的数据，这无疑会消耗过多的计算资源，同时还增加了计算所耗的时间。</strong></p><p>因此，我们需要尽可能地<strong>降低计算复杂度，并且只保留必要的聚合信息，而不需要保存所有原始数据</strong>。</p><p>非常幸运的是，对于各种聚合类型的运算，我们都能够找到一个（或者一组）指标，用于记录聚合后的结果。比如，对于 count 计算这个指标是&quot;记录数&quot;，对于 sum 计算这个指标是&quot;总和&quot;，对于 avg 计算这组指标是&quot;总和&quot;和&quot;记录数&quot;，对于 min 计算这个指标是&quot;最小值&quot;，对于 max 计算这个指标是&quot;最大值&quot;。</p><p>如果我们用<strong>寄存器</strong> 来记录这些指标，那么我们会发现计算每种任务都只需要使用少数几个<strong>寄存器</strong>即可，这就给我们提供了极大的优化空间。</p><p>下面，我们以 count 计算来讲解下优化后算法的工作原理。下图 1 是优化后算法的原理图。</p>`,21),E=s("p",null,'在上面的图 1 中，我们以计算"过去一周在相同设备上交易次数"为例。由于是要计算"过去一周"的时间范围，所以我们将每个窗口设置为 1 天。换言之，图 1 中的窗口 1、窗口 2 和窗口 3 ，都各自代表了 1 天的时间长度。在窗口 1 中，首先出现的是设备 1 上的交易事件，所以我们分配一个名字（对应 Redis 里的 key）为"设备1.窗口1.count寄存器"的寄存器，来记录设备 1 在窗口 1 内交易事件发生的次数。这个 count 寄存器的初始值是 0，每当窗口 1 内来了一个设备 1 上的交易事件时，我们就将这个 count 寄存器的值加 1。这样，当窗口 1 结束时，"设备1.窗口1.count寄存器"的值，就变为了 2。同样，对于其他设备和其他窗口的交易事件，也用相同的方式，分配对应设备和窗口的寄存器，并在每次交易事件到来时，将寄存器的值加 1 。',-1),i=s("p",null,'通过上面的方法，最终我们就可以得到各个设备在各个窗口内的交易次数了。而由于我们的计算目标是"过去一周在相同设备上交易次数"，且每个窗口代表 1 天，所以只需要将连续 7 个窗口内寄存器值读取出来后，累加起来即可得到最终结果了。',-1),d=s("p",null,"以上就是使用寄存器实现 count 计算的整体思路。同样，对于 sum、avg、variance、min、max 等其他类型的时间维度聚合值，都可以按照这种思路来进行计算，只需要先设计好需要使用的寄存器即可。",-1),u=s("p",null,"下面的表 1 就总结了在采用寄存器方法计算各种聚合值时，所需要的寄存器以及各个寄存器的含义。",-1),_=l(`<p>以上列举的都是我们在平时开发过程中，经常会用到的聚合值。对于其他类型的聚合值，比如偏度（skewness）、峰度（kurtosis）等，通过数学公式转化，也都可以找到对应需要记录的指标，这里就不再展开了。</p><h3 id="如何实现时间维度聚合计算" tabindex="-1">如何实现时间维度聚合计算 <a class="header-anchor" href="#如何实现时间维度聚合计算" aria-label="Permalink to &quot;如何实现时间维度聚合计算&quot;">​</a></h3><p>上面说明了时间维度聚合值计算的整体思路。那具体应该怎样实现呢？这里我使用 Redis 并结合伪代码的方式来详细讲解下。</p><p>与前面讲解 count 计算原理时一样，我们要计算的时间维度聚合值还是&quot;过去一周在相同设备上交易次数&quot;。</p><p>针对这种计数查询，非常适合用 Redis 的 INCR 指令。INCR 是 Redis 中经常会被使用到的指令，它可以对存储在指定键的数值进行&quot;原子加一&quot;，并返回加一后的结果。</p><p>这里我们将 7 天的时间窗口划分为 7 个小窗口，每个小窗口代表 1 天。在每个小窗口内，分配一个 key 用来记录这个窗口的事件数。 key 的格式如下：</p><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#FDAEB7;font-style:italic;">$</span><span style="color:#E1E4E8;">event_type.</span><span style="color:#FDAEB7;font-style:italic;">$</span><span style="color:#E1E4E8;">device_id.</span><span style="color:#FDAEB7;font-style:italic;">$</span><span style="color:#E1E4E8;">window_unit.</span><span style="color:#FDAEB7;font-style:italic;">$</span><span style="color:#E1E4E8;">window_index</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#B31D28;font-style:italic;">$</span><span style="color:#24292E;">event_type.</span><span style="color:#B31D28;font-style:italic;">$</span><span style="color:#24292E;">device_id.</span><span style="color:#B31D28;font-style:italic;">$</span><span style="color:#24292E;">window_unit.</span><span style="color:#B31D28;font-style:italic;">$</span><span style="color:#24292E;">window_index</span></span></code></pre></div><p>其中，&quot;$event_type&quot;表示事件类型，&quot;$device_id&quot;表示设备 id，&quot;$window_unit&quot;表示时间窗口单元，&quot;$window_index&quot;表示时间窗口索引。</p><p>比如，对于&quot;device_id&quot;为&quot;d000001&quot;的设备，如果在时间戳为&quot;1532496076032&quot;的时刻更新窗口，则计算如下：</p><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#FDAEB7;font-style:italic;">$</span><span style="color:#E1E4E8;">event_type </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> transaction</span></span>
<span class="line"><span style="color:#FDAEB7;font-style:italic;">$</span><span style="color:#E1E4E8;">device_id </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> d000001</span></span>
<span class="line"><span style="color:#FDAEB7;font-style:italic;">$</span><span style="color:#E1E4E8;">window_unit </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">86400000</span><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;"># 时间窗口单元为1天，即86400000毫秒</span></span>
<span class="line"><span style="color:#FDAEB7;font-style:italic;">$</span><span style="color:#E1E4E8;">window_index </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1532496076032</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">$</span><span style="color:#E1E4E8;">window_unit </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">17737</span><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># 用时间戳除以时间窗口单元，得到时间窗口索引</span></span>
<span class="line"><span style="color:#FDAEB7;font-style:italic;">$</span><span style="color:#E1E4E8;">key </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">$</span><span style="color:#E1E4E8;">event_type.</span><span style="color:#FDAEB7;font-style:italic;">$</span><span style="color:#E1E4E8;">device_id.</span><span style="color:#FDAEB7;font-style:italic;">$</span><span style="color:#E1E4E8;">window_unit.</span><span style="color:#FDAEB7;font-style:italic;">$</span><span style="color:#E1E4E8;">window_index</span></span>
<span class="line"><span style="color:#E1E4E8;">redis.incr(</span><span style="color:#FDAEB7;font-style:italic;">$</span><span style="color:#E1E4E8;">key)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#B31D28;font-style:italic;">$</span><span style="color:#24292E;">event_type </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> transaction</span></span>
<span class="line"><span style="color:#B31D28;font-style:italic;">$</span><span style="color:#24292E;">device_id </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> d000001</span></span>
<span class="line"><span style="color:#B31D28;font-style:italic;">$</span><span style="color:#24292E;">window_unit </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">86400000</span><span style="color:#24292E;">  </span><span style="color:#6A737D;"># 时间窗口单元为1天，即86400000毫秒</span></span>
<span class="line"><span style="color:#B31D28;font-style:italic;">$</span><span style="color:#24292E;">window_index </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1532496076032</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">/</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">$</span><span style="color:#24292E;">window_unit </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">17737</span><span style="color:#24292E;">    </span><span style="color:#6A737D;"># 用时间戳除以时间窗口单元，得到时间窗口索引</span></span>
<span class="line"><span style="color:#B31D28;font-style:italic;">$</span><span style="color:#24292E;">key </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">$</span><span style="color:#24292E;">event_type.</span><span style="color:#B31D28;font-style:italic;">$</span><span style="color:#24292E;">device_id.</span><span style="color:#B31D28;font-style:italic;">$</span><span style="color:#24292E;">window_unit.</span><span style="color:#B31D28;font-style:italic;">$</span><span style="color:#24292E;">window_index</span></span>
<span class="line"><span style="color:#24292E;">redis.incr(</span><span style="color:#B31D28;font-style:italic;">$</span><span style="color:#24292E;">key)</span></span></code></pre></div><p>上面的伪代码描述了使用 Redis 的 INCR 指令更新某个窗口的计数。我们将更新操作和查询操作分开进行，因此这里只需更新一个小窗口的计数值，而不需要更新整个窗口上所有小窗口的计数值。</p><p>当查询 7 天窗口内的总计数值时，我们对 7 个子时间窗口内的计数做查询并汇总。计算如下：</p><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#FDAEB7;font-style:italic;">$</span><span style="color:#E1E4E8;">event_type </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> transaction</span></span>
<span class="line"><span style="color:#FDAEB7;font-style:italic;">$</span><span style="color:#E1E4E8;">device_id </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> d000001</span></span>
<span class="line"><span style="color:#FDAEB7;font-style:italic;">$</span><span style="color:#E1E4E8;">window_unit </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">86400000</span><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;"># 时间窗口单元为1天，即86400000毫秒</span></span>
<span class="line"><span style="color:#FDAEB7;font-style:italic;">$</span><span style="color:#E1E4E8;">window_index </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1532496076032</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">$</span><span style="color:#E1E4E8;">window_unit </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">17737</span><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># 用时间戳除以时间窗口单元，得到当前时间窗口索引</span></span>
<span class="line"><span style="color:#79B8FF;">sum</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span></span>
<span class="line"><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">$</span><span style="color:#E1E4E8;">i </span><span style="color:#F97583;">in</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">range</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">7</span><span style="color:#E1E4E8;">):</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#FDAEB7;font-style:italic;">$</span><span style="color:#E1E4E8;">window_index </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">$</span><span style="color:#E1E4E8;">window_index </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">$</span><span style="color:#E1E4E8;">i</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#FDAEB7;font-style:italic;">$</span><span style="color:#E1E4E8;">key </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">$</span><span style="color:#E1E4E8;">event_type.</span><span style="color:#FDAEB7;font-style:italic;">$</span><span style="color:#E1E4E8;">device_id.</span><span style="color:#FDAEB7;font-style:italic;">$</span><span style="color:#E1E4E8;">window_unit.</span><span style="color:#FDAEB7;font-style:italic;">$</span><span style="color:#E1E4E8;">window_index</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">sum</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+=</span><span style="color:#E1E4E8;"> redis.get(</span><span style="color:#FDAEB7;font-style:italic;">$</span><span style="color:#E1E4E8;">key)</span></span>
<span class="line"><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">sum</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#B31D28;font-style:italic;">$</span><span style="color:#24292E;">event_type </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> transaction</span></span>
<span class="line"><span style="color:#B31D28;font-style:italic;">$</span><span style="color:#24292E;">device_id </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> d000001</span></span>
<span class="line"><span style="color:#B31D28;font-style:italic;">$</span><span style="color:#24292E;">window_unit </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">86400000</span><span style="color:#24292E;">  </span><span style="color:#6A737D;"># 时间窗口单元为1天，即86400000毫秒</span></span>
<span class="line"><span style="color:#B31D28;font-style:italic;">$</span><span style="color:#24292E;">window_index </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1532496076032</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">/</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">$</span><span style="color:#24292E;">window_unit </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">17737</span><span style="color:#24292E;">    </span><span style="color:#6A737D;"># 用时间戳除以时间窗口单元，得到当前时间窗口索引</span></span>
<span class="line"><span style="color:#005CC5;">sum</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span></span>
<span class="line"><span style="color:#D73A49;">for</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">$</span><span style="color:#24292E;">i </span><span style="color:#D73A49;">in</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">range</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">0</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">7</span><span style="color:#24292E;">):</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#B31D28;font-style:italic;">$</span><span style="color:#24292E;">window_index </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">$</span><span style="color:#24292E;">window_index </span><span style="color:#D73A49;">-</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">$</span><span style="color:#24292E;">i</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#B31D28;font-style:italic;">$</span><span style="color:#24292E;">key </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">$</span><span style="color:#24292E;">event_type.</span><span style="color:#B31D28;font-style:italic;">$</span><span style="color:#24292E;">device_id.</span><span style="color:#B31D28;font-style:italic;">$</span><span style="color:#24292E;">window_unit.</span><span style="color:#B31D28;font-style:italic;">$</span><span style="color:#24292E;">window_index</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">sum</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+=</span><span style="color:#24292E;"> redis.get(</span><span style="color:#B31D28;font-style:italic;">$</span><span style="color:#24292E;">key)</span></span>
<span class="line"><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">sum</span></span></code></pre></div><p>在上面的伪代码中，用 Redis 的 GET 指令，查询了过去 7 个子时间窗口，也就是过去 7 天每天的计数，然后将这些计数值汇总，就得到了我们想要的&quot;过去一周在相同设备上交易次数&quot;这个特征值。</p><h3 id="寄存器方案的不足之处" tabindex="-1">寄存器方案的不足之处 <a class="header-anchor" href="#寄存器方案的不足之处" aria-label="Permalink to &quot;寄存器方案的不足之处&quot;">​</a></h3><p>虽然说，采用寄存器的方案，极大减少了内存的使用量，也降低了计算的复杂度，但是这种方案依旧存在问题。由于采用了&quot;寄存器&quot;来记录聚合计算的中间值，也就涉及&quot;状态&quot;的存储问题。</p><p>或许乍看之下我们会觉得，寄存器嘛，无非存储一个数字而已，又能够占用多少空间呢？但稍微仔细分析下就会发现问题了。</p><p>我们为变量的每个可能的值都分配了一个或一组寄存器，虽然寄存器的个数不多，比如在表 1 中使用寄存器最多的方差也就用了 3 个寄存器。当我们进行聚合分析的变量具有一个较低的&quot;势&quot;时（&quot;势&quot;是集合论中用来描述一个集合所含元素数量的概念。比如集合 S={A, B, C}有 3 个元素，那么它的势就是 3。集合包含的元素数量越多，其势越大），那么一切都尚且安好。</p><p>但是，实际的情况是，我们<strong>用于分组聚合时的分组变量，往往具有比原本预想高得多的势</strong>。比如统计&quot;用户每天的登入次数&quot;，那全中国有十四亿人口！再比如需要统计&quot;每个 IP 访问网站的次数&quot;，那全球有四十多亿 IP ！再加上，有时候我们需要聚合的是一些复合变量，比如统计&quot;过去一周同一用户在同一IP C段申请贷款次数&quot;，这种情况如果严格按照理论值计算，需要采用笛卡尔积，那将是天文数字了。</p><p>所以，至少我们不能指望将这些状态都存放在本地内存里。通常，我们<strong>需要将这些寄存器状态保存到外部存储器，比如 Redis 、 Apache Ignite 或本地磁盘中</strong>。并且，我们还需要为这些状态设置过期时间（TTL），将过期的状态清理掉，一方面为新的状态腾出空间，另一方面也避免了占据空间的无限增长。</p><p>&quot;状态&quot;存储其实是一个非常重要的问题，而且在后面讨论其他几类算法时，也都会涉及有关&quot;状态&quot;存储的问题。所以，这里我只是先将&quot;状态&quot;存储问题和初步解决思路给了出来，在后面的课时中我们还会针对流计算中的&quot;状态&quot;问题做专门讨论。</p><h3 id="小结" tabindex="-1">小结 <a class="header-anchor" href="#小结" aria-label="Permalink to &quot;小结&quot;">​</a></h3><p>今天，我们讨论了实时流计算中第二类算法问题，即时间维度聚合值的计算。</p><p>应该说，正是因为&quot;实时计算&quot;和&quot;长周期窗口&quot;这两个前提条件，共同决定了我们必须采取&quot;寄存器&quot;的方式，来优化时间维度聚合值的算法。而&quot;寄存器&quot;的引入，则使得流计算变成了&quot;有状态&quot;的系统，这也直接导致了各种开源流计算框架专门引入&quot;状态存储&quot;相关的功能，并提供了对应的 API 编程接口。</p><p>所以，以后你在使用诸如 Flink、Spark Streaming 这样的流计算框架，遇到状态相关的 API 时，一定要清楚它们为何而来，并将它们灵活地用于你的业务实现中。</p><p>最后，我们今天是用 Redis 实现的&quot;过去一周在相同设备上交易次数&quot;，那如果是使用 Flink 来实现这个时间维度聚合值计算，你会怎么做呢？注意要求是针对每一个交易事件进行计算，并将计算结果附加到交易事件上组成新的事件，最后再将这个新事件作为流数据输出。另外，计算过程中，你可以使用 Fastjson 库的 JSONObject 对象表示事件。思考并试验下，可以将你的思路或问题写在留言区！</p><p>下面是本课时内容的脑图，可以帮助你理解。</p>`,27);function F(D,q,A,B,g,m){const n=t("Image");return e(),c("div",null,[y,a(n,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image6/M00/05/04/CioPOWAvgBmAGg9WAAV6cVzpv38832.png"}),o(),E,i,d,u,a(n,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image6/M00/05/04/CioPOWAvgCKADPo6AACBcbpagaQ422.png"}),o(),_,a(n,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image6/M00/05/04/CioPOWAvgDeAIb17AAiMLSymHYg627.png"})])}const C=p(r,[["render",F]]);export{h as __pageData,C as default};
