import{_ as p,j as l,o,g as r,k as n,s as a,h as t,Q as e}from"./chunks/framework.b3d8e22e.js";const G=JSON.parse('{"title":"Trace ID ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/098-讲带你搞懂 SkyWalking文档/(1732) 第12讲：剖析 Trace 在 SkyWalking 中的落地实现方案（上）.md","filePath":"posts/backEnd/098-讲带你搞懂 SkyWalking文档/(1732) 第12讲：剖析 Trace 在 SkyWalking 中的落地实现方案（上）.md","lastUpdated":1696417798000}'),c={name:"posts/backEnd/098-讲带你搞懂 SkyWalking文档/(1732) 第12讲：剖析 Trace 在 SkyWalking 中的落地实现方案（上）.md"},i=a("p",null,"通过前面几课时的学习，我们已经了解 SkyWalking Agent 启动的基本流程、插件增强代码的基本逻辑以及核心 BootService 实现的功能。从本课时开始，我们将深入分析 SkyWalking Agent 中 Trace 相关的基础组件。",-1),E=a("p",null,"在 04 课时中我们介绍了 OpenTracing 的基本概念，SkyWalking 中 Trace 的相关概念以及实现类与 OpenTracing 中的概念基本类似，像 Trace、Span、Tags、Logs 等核心概念，在 SkyWalking Agent 中都有对应实现，只是在细微实现上略有区别的，其中最重要的是： SkyWalking 的设计在 Trace 级别和 Span 级别之间加了一个 Segment 概念，用于表示一个服务实例内的 Span 集合。",-1),y=a("h3",{id:"trace-id",tabindex:"-1"},[t("Trace ID "),a("a",{class:"header-anchor",href:"#trace-id","aria-label":'Permalink to "Trace ID"'},"​")],-1),g=a("p",null,"在分布式链路追踪系统中，用户请求的处理过程会形成一条 Trace 。Trace ID 作为 Trace 数据的唯一标识，在面对海量请求的时候，需要保证其唯一性。与此同时，还要保证生成 Trace ID 不会带来过多开销，所以在业务场景中依赖数据库（自增键或是类似 Meituan-Dianping/Leaf 的 ID 生成方式）都不适合 Trace 的场景。",-1),S=a("p",null,"这种要求快速、高性能生成唯一 ID 的需求场景，一般会将 snowflake 算法与实际的场景集合进行改造。",-1),d=a("blockquote",null,[a("p",null,"snowflake 算法是 Twitter 开源的分布式 ID 生成算法 。snowflake 算法的核心思想是将一个 ID（long类型）的 64 个 bit 进行切分，其中使用 41 个 bit 作为毫秒数，10 个 bit 作为机器的 ID（ 5 个 bit 记录数据中心的 ID，5 个 bit 记录机器的 ID ），12 bit 作为毫秒内的自增 ID，还有一个 bit 位永远是 0。snowflake 算法生成的 ID 结构如下图所示：")],-1),T=e(`<blockquote><p>snowflake 算法的好处是 ID 可以直接靠算法在内存中产生，内存内的锁控制并发，不需依赖 MySQL 这样的外部依赖，无维护成本。缺点就是每个机器节点在每毫秒内只可以产生 4096 个 ID，超出这个范围就会溢出。另外，如果机器回拨了时间，就会生成重复的 ID。</p></blockquote><p>ID 类是 SkyWalking 中对全局唯一标识的抽象，其生成策略与 snowflake 算法类似。SkyWalking ID 由三个 long 类型的字段（part1、part2、part3）构成，分别记录了 ServiceInstanceId、Thread ID 和 Context 生成序列。Context 生成序列的格式是：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">\${时间戳} </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">10000</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> 线程自增序列([</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">9999</span><span style="color:#E1E4E8;">])</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">\${时间戳} </span><span style="color:#D73A49;">*</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">10000</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> 线程自增序列([</span><span style="color:#005CC5;">0</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">9999</span><span style="color:#24292E;">])</span></span></code></pre></div><p>ID 对象序列化之后的格式是将 part1、part2、part3 三部分用&quot;.&quot;分割连接起来 ：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">\${ServiceInstanceId}.\${Thread ID}.(\${时间戳} </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">10000</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> 线程自增序列([</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">9999</span><span style="color:#E1E4E8;">]))</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">\${ServiceInstanceId}.\${Thread ID}.(\${时间戳} </span><span style="color:#D73A49;">*</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">10000</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> 线程自增序列([</span><span style="color:#005CC5;">0</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">9999</span><span style="color:#24292E;">]))</span></span></code></pre></div><p>GlobalIdGenerator 是 Agent 中用来生成全局唯一 ID 的基础工具类，在 generate() 方法中的实现如下：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> ID </span><span style="color:#B392F0;">generate</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// THREAD_ID_SEQUENCE是 ThreadLocal&lt;IDContext&gt;类型，即每个线程</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 维护一个 IDContext对象</span></span>
<span class="line"><span style="color:#E1E4E8;">    IDContext context </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> THREAD_ID_SEQUENCE.</span><span style="color:#B392F0;">get</span><span style="color:#E1E4E8;">(); </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ID</span><span style="color:#E1E4E8;">(SERVICE_INSTANCE_ID, </span><span style="color:#6A737D;">// service_intance_id</span></span>
<span class="line"><span style="color:#E1E4E8;">        Thread.</span><span style="color:#B392F0;">currentThread</span><span style="color:#E1E4E8;">().</span><span style="color:#B392F0;">getId</span><span style="color:#E1E4E8;">(), </span><span style="color:#6A737D;">// 当前线程的ID</span></span>
<span class="line"><span style="color:#E1E4E8;">        context.</span><span style="color:#B392F0;">nextSeq</span><span style="color:#E1E4E8;">() </span><span style="color:#6A737D;">// 线程内生成的序列号</span></span>
<span class="line"><span style="color:#E1E4E8;">    );</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> ID </span><span style="color:#6F42C1;">generate</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// THREAD_ID_SEQUENCE是 ThreadLocal&lt;IDContext&gt;类型，即每个线程</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 维护一个 IDContext对象</span></span>
<span class="line"><span style="color:#24292E;">    IDContext context </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> THREAD_ID_SEQUENCE.</span><span style="color:#6F42C1;">get</span><span style="color:#24292E;">(); </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ID</span><span style="color:#24292E;">(SERVICE_INSTANCE_ID, </span><span style="color:#6A737D;">// service_intance_id</span></span>
<span class="line"><span style="color:#24292E;">        Thread.</span><span style="color:#6F42C1;">currentThread</span><span style="color:#24292E;">().</span><span style="color:#6F42C1;">getId</span><span style="color:#24292E;">(), </span><span style="color:#6A737D;">// 当前线程的ID</span></span>
<span class="line"><span style="color:#24292E;">        context.</span><span style="color:#6F42C1;">nextSeq</span><span style="color:#24292E;">() </span><span style="color:#6A737D;">// 线程内生成的序列号</span></span>
<span class="line"><span style="color:#24292E;">    );</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>IDContext.nextSeq() 方法的实现如下，其中 timestamp() 方法在返回时间戳的时候，会处理时间回拨的场景（使用 Random 随机生成一个时间戳），nextThreadSeq() 方法的返回值在 [0 , 9999] 这个范围内循环：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">long</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">nextSeq</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">timestamp</span><span style="color:#E1E4E8;">() </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">10000</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">nextThreadSeq</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">private</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">long</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">nextSeq</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">timestamp</span><span style="color:#24292E;">() </span><span style="color:#D73A49;">*</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">10000</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">nextThreadSeq</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>GlobalIdGenerator 不仅用于生成 Trace ID ，其他需要唯一 ID 的地方也会通过其 nextSeq() 方法生成。</p><p>SkyWalking 中使用 DistributedTraceId 类来抽象 Trace ID，其中封装了一个 ID 类型的字段。DistributedTraceId 有两个实现类，如下图所示：</p>`,11),D=e('<p>其中，NewDistirbutedTraceId 负责生成新 Trace ID，请求刚刚进入系统时，会创建 NewDistirbutedTraceId 对象，其构造方法内部会调用 GlobalIdGenerator.generate() 方法生成 ID 对象。</p><p>PropagatedTraceId 负责处理 Trace 传播过程中的 TraceId。PropagatedTraceId 的构造方法接收一个 String 类型参数（也就是在跨进程传播时序列化后的 Trace ID），解析之后得到 ID 对象。</p><p>在后面的介绍中还会涉及另一个与 Trace ID 相关的类 ------ DistributedTraceIds，它表示多个 Trace ID 的集合，其底层封装了一个 LinkedList&lt;DistributedTraceId&gt; 集合，用于记录相关的 Trace ID。</p><h3 id="tracesegment" tabindex="-1">TraceSegment <a class="header-anchor" href="#tracesegment" aria-label="Permalink to &quot;TraceSegment&quot;">​</a></h3><p>在 SkyWalking 中，TraceSegment 是一个介于 Trace 与 Span 之间的概念，它是一条 Trace 的一段，可以包含多个 Span。在微服务架构中，一个请求基本都会涉及跨进程（以及跨线程）的操作，例如， RPC 调用、通过 MQ 异步执行、HTTP 请求远端资源等，处理一个请求就需要涉及到多个服务的多个线程。TraceSegment 记录了一个请求在一个线程中的执行流程（即 Trace 信息）。将该请求关联的 TraceSegment 串联起来，就能得到该请求对应的完整 Trace。</p><p>下面我们先来介绍 TraceSegment 的核心字段：</p><ul><li><strong>traceSegmentId（ID 类型）</strong>：TraceSegment 的全局唯一标识，是由前面介绍的 GlobalIdGenerator 生成的。</li><li><strong>refs（List&lt;TraceSegmentRef&gt; 类型）</strong>：它指向父 TraceSegment。在我们常见的 RPC 调用、HTTP 请求等跨进程调用中，一个 TraceSegment 最多只有一个父 TraceSegment，但是在一个 Consumer 批量消费 MQ 消息时，同一批内的消息可能来自不同的 Producer，这就会导致 Consumer 线程对应的 TraceSegment 有多个父 TraceSegment 了，当然，该 Consumer TraceSegment 也就属于多个 Trace 了。</li><li><strong>relatedGlobalTraces（DistributedTraceIds 类型）</strong>：记录当前 TraceSegment 所属 Trace 的 Trace ID。</li><li><strong>spans（List&lt;AbstractTracingSpan&gt; 类型）</strong>：当前 TraceSegment 包含的所有 Span。</li><li><strong>ignore（boolean 类型）</strong>：ignore 字段表示当前 TraceSegment 是否被忽略。主要是为了忽略一些问题 TraceSegment（主要是对只包含一个 Span 的 Trace 进行采样收集）。</li><li><strong>isSizeLimited（boolean 类型）</strong>：这是一个容错设计，例如业务代码出现了死循环 Bug，可能会向相应的 TraceSegment 中不断追加 Span，为了防止对应用内存以及后端存储造成不必要的压力，每个 TraceSegment 中 Span 的个数是有上限的（默认值为 300），超过上限之后，就不再添加 Span了。</li></ul><p>下图展示了一个 TraceSegment 的核心结构：</p>',8),_=a("h3",{id:"span",tabindex:"-1"},[t("Span "),a("a",{class:"header-anchor",href:"#span","aria-label":'Permalink to "Span"'},"​")],-1),A=a("p",null,"TraceSegment 是由多个 Span 构成的，AbstractSpan 抽象类是 SkyWalking 对 Span 概念的抽象，下图是 Span 的继承关系：",-1),m=e(`<p>首先需要明确的是，我们最终直接使用的 Span 分为 3 类：</p><ul><li><strong>EntrySpan</strong>：当请求进入服务时会创建 EntrySpan 类型的 Span，它也是 TraceSegment 中的第一个 Span。例如，HTTP 服务、RPC 服务、MQ-Consumer 等入口服务的插件在接收到请求时都会创建相应的 EntrySpan。</li><li><strong>LocalSpan</strong>：它是在本地方法调用时可能创建的 Span 类型，在后面介绍 @Trace 注解的时候我们还会看到 LocalSpan。</li><li><strong>ExitSpan</strong>：当请求离开当前服务、进入其他服务时会创建 ExitSpan 类型的 Span。例如， Http Client 、RPC Client 发起远程调用或是 MQ-producer 生产消息时，都会产生该类型的 Span。</li></ul><p>下面我们按照 Span 的继承结构，自顶层接口开始逐个向下介绍。首先，AsyncSpan 接口定义了一个异步 Span 的基本行为：</p><ul><li><strong>prepareForAsync() 方法</strong>：Span 在当前线程结束了，但是未被彻底关闭，依然是存活的。</li><li><strong>asyncFinish()方法</strong>：当前 Span 真正关闭。它与 prepareForAsync() 方法成对出现。</li></ul><p>这两个方法在异步框架的插件中会见到。</p><p>AbstractSpan 也是一个接口，其中定义了 Span 的基本行为，其中的方法比较重要：</p><ul><li><strong>getSpanId() 方法</strong>：用来获得当前 Span 的 ID，Span ID 是一个 int 类型的值，在其所属的 TraceSegment 中唯一，在创建 Span 对象时生成，从 0 开始自增。</li><li><strong>setOperationName()/setOperationId() 方法</strong>：用来设置 operation 名称（或 operation ID），这两个信息是互斥的。它们在 AbstractSpan 的具体实现（即 AbstractTracingSpan）中，分别对应 operationId 和 operationName 两个字段，两者只能有一个字段有值。</li></ul><p>operationName 即前文介绍的 EndpointName，可以是任意字符串，例如，在 Tomcat 插件中 operationName 就是 URI 地址，Dubbo 插件中 operationName 为 URL + 接口方法签名。</p><ul><li><strong>setComponent() 方法</strong>：用于设置组件类型。它有两个重载，在 AbstractTracingSpan 实现中，有 componentId 和 componentName 两个字段，两个重载分别用于设置这两个字段。在 ComponentsDefine 中可以找到 SkyWalking 目前支持的组件类型。</li><li><strong>setLayer() 方法</strong>：用于设置 SpanLayer，也就是当前 Span 所处的位置。SpanLayer 是个枚举，可选项有 DB、RPC_FRAMEWORK、HTTP、MQ、CACHE。</li><li><strong>tag(AbstractTag, String) 方法</strong>：用于为当前 Span 添加键值对的 Tags。一个 Span 可以有多个 Tags。AbstractTag 中不仅包含了 String 类型的 Key 值，还包含了 Tag 的 ID 以及 canOverwrite 标识。AbstractTracingSpan 实现通过维护一个 List&lt;TagValuePair&gt; 集合（tags 字段）来记录 Tag 信息，TagValuePair 中则封装了 AbstractTag 类型的 Key 以及 String 类型的 Value。</li><li><strong>log() 方法</strong>：用于向当前 Span 中添加 Log，一个 Span 可以包含多条日志。在 AbstractTracingSpan 实现中通过维护一个 List&lt;LogDataEntity&gt; 集合（logs 字段）来记录 Log。LogDataEntity 会记录日志的时间戳以及 KV 信息，以异常日志为例，其中就会包含一个 Key 为&quot;stack&quot;的 KV，其 value 为异常堆栈。</li><li><strong>start() 方法</strong>：开启 Span，其中会设置当前 Span 的开始时间以及调用层级等信息。</li><li><strong>isEntry() 方法</strong>：判断当前是否是 EntrySpan。EntrySpan 的具体实现后面详细介绍。</li><li><strong>isExit() 方法</strong>：判断当前是否是 ExitSpan。ExitSpan 的具体实现后面详细介绍。</li><li><strong>ref() 方法</strong>：用于设置关联的 TraceSegment 。</li></ul><p>AbstractTracingSpan 实现了 AbstractSpan 接口，定义了一些 Span 的公共字段，其中的部分字段在介绍 AbstractSpan 接口时已经提到了，下面简单介绍一下前面未涉及的字段含义：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">protected</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> spanId; </span><span style="color:#6A737D;">// span的ID</span></span>
<span class="line"><span style="color:#F97583;">protected</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> parentSpanId; </span><span style="color:#6A737D;">// 记录父Span的ID</span></span>
<span class="line"><span style="color:#F97583;">protected</span><span style="color:#E1E4E8;"> List&lt;</span><span style="color:#F97583;">TagValuePair</span><span style="color:#E1E4E8;">&gt; tags; </span><span style="color:#6A737D;">// 记录Tags的集合</span></span>
<span class="line"><span style="color:#F97583;">protected</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">long</span><span style="color:#E1E4E8;"> startTime, endTime; </span><span style="color:#6A737D;">// Span的起止时间</span></span>
<span class="line"><span style="color:#F97583;">protected</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">boolean</span><span style="color:#E1E4E8;"> errorOccurred </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">false</span><span style="color:#E1E4E8;">; </span><span style="color:#6A737D;">// 标识该Span中是否发生异常</span></span>
<span class="line"><span style="color:#F97583;">protected</span><span style="color:#E1E4E8;"> List&lt;</span><span style="color:#F97583;">TraceSegmentRef</span><span style="color:#E1E4E8;">&gt; refs; </span><span style="color:#6A737D;">// 指向所属TraceSegment</span></span>
<span class="line"><span style="color:#6A737D;">// context字段指向TraceContext，TraceContext与当前线程绑定，与TraceSegment</span></span>
<span class="line"><span style="color:#6A737D;">// 一一对应</span></span>
<span class="line"><span style="color:#F97583;">protected</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">volatile</span><span style="color:#E1E4E8;"> AbstractTracerContext context;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">protected</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> spanId; </span><span style="color:#6A737D;">// span的ID</span></span>
<span class="line"><span style="color:#D73A49;">protected</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> parentSpanId; </span><span style="color:#6A737D;">// 记录父Span的ID</span></span>
<span class="line"><span style="color:#D73A49;">protected</span><span style="color:#24292E;"> List&lt;</span><span style="color:#D73A49;">TagValuePair</span><span style="color:#24292E;">&gt; tags; </span><span style="color:#6A737D;">// 记录Tags的集合</span></span>
<span class="line"><span style="color:#D73A49;">protected</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">long</span><span style="color:#24292E;"> startTime, endTime; </span><span style="color:#6A737D;">// Span的起止时间</span></span>
<span class="line"><span style="color:#D73A49;">protected</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">boolean</span><span style="color:#24292E;"> errorOccurred </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">false</span><span style="color:#24292E;">; </span><span style="color:#6A737D;">// 标识该Span中是否发生异常</span></span>
<span class="line"><span style="color:#D73A49;">protected</span><span style="color:#24292E;"> List&lt;</span><span style="color:#D73A49;">TraceSegmentRef</span><span style="color:#24292E;">&gt; refs; </span><span style="color:#6A737D;">// 指向所属TraceSegment</span></span>
<span class="line"><span style="color:#6A737D;">// context字段指向TraceContext，TraceContext与当前线程绑定，与TraceSegment</span></span>
<span class="line"><span style="color:#6A737D;">// 一一对应</span></span>
<span class="line"><span style="color:#D73A49;">protected</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">volatile</span><span style="color:#24292E;"> AbstractTracerContext context;</span></span></code></pre></div><p>AbstractTracingSpan 中提供的方法也比较简单，基本都是上述字段的 getter/setter 方法，这些方法不再展开赘述。这里需要注意两个方法：</p><ul><li><strong>finish(TraceSegment) 方法</strong>：该方法会关闭当前 Span ，具体行为是用 endTime 字段记录当前时间，并将当前 Span 记录到所属 TraceSegment 的 spans 集合中。</li><li><strong>transform() 方法</strong>：该方法会在 Agent 上报 TraceSegment 数据之前调用，它会将当前 AbstractTracingSpan 对象转换成 SpanObjectV2 对象。SpanObjectV2 是在 proto 文件中定义的结构体，后面 gRPC 上报 TraceSegment 数据时会将其序列化。</li></ul><p>StackBasedTracingSpan 在继承 AbstractTracingSpan 存储 Span 核心数据能力的同时，还引入了栈的概念，这种 Span 可以多次调用 start() 方法和 end() 方法，但是两者调用次数必须要配对，类似出栈和入栈的操作。</p><p>下面以 EntrySpan 为例说明为什么需要&quot;栈&quot;这个概念，EntrySpan 表示的是一个服务的入口 Span，是 TraceSegment 的第一个 Span，出现在服务提供方的入口，例如，Dubbo Provider、Tomcat、Spring MVC，等等。 那么为什么 EntrySpan 继承 StackBasedTracingSpan 呢？ 从前面对 SkyWalking Agent 的分析来看，Agent 插件只会拦截指定类的指定方法并对其进行增强，例如，Tomcat、Spring MVC 等插件的增强逻辑中就包含了创建 EntrySpan 的逻辑（后面在分析具体插件实现的时候，会看到具体的实现代码）。很多 Web 项目会同时使用到这两个插件，难道一个 TraceSegment 要有两个 EntrySpan 吗？显然不行。</p><p>SkyWalking 的处理方式是让 EntrySpan 继承了 StackBasedTracingSpan，多个插件同时使用时，整个架构如下所示：</p>`,16),u=a("p",null,"其中，请求相应的 EntrySpan 处理流程如下：",-1),h=a("ol",null,[a("li",null,"当请求经过 Tomcat 插件时（即图中 ① 处），会创建 EntrySpan 并第一次调用 start() 方法，启动该 EntrySpan。")],-1),I=a("p",null,"在 start() 方法中会有下面几个操作：",-1),C=a("ol",null,[a("li",null,"将 stackDepth 字段（定义在 StackBasedTracingSpan 中）加 1，stackDepth 表示当前所处的插件栈深度 。"),a("li",null,"更新 currentMaxDepth 字段（定义在 EntrySpan 中），currentMaxDepth 会记录该EntrySpan 到达过的插件栈的最深位置。"),a("li",null,"此时第一次启动 EntrySpan 时会更新 startTime 字段，记录请求开始时间。")],-1),k=a("p",null,"此时插件栈（这是为了方便理解而虚拟出来一个栈结构，实际上只有 stackDepth、currentMaxDepth 两个字段，并不会用到栈结构，也不会记录请求经过的插件）的状态如下图所示：",-1),b=a("ol",null,[a("li",null,"当请求经过 Spring MVC 插件时（即图中 ② 处），不会再创建新的 EntrySpan 了，而重新调用该 EntrySpan 的 start() 方法，其中会继续将 stackDepth 以及 currentMaxDepth 字段加 1 。注意，再次调用 start() 方法时不会更新 startTime 字段了，因为请求已经开始处理了。此时插件栈的状态如下图：")],-1),F=a("ol",{start:"2"},[a("li",null,"当请求经过业务逻辑处理完成之后，开始进入 Spring MVC 插件的后置处理逻辑时（即图中 ③ 处），会第 1 次调用 EntrySpan.finish() 方法，其中会将 stackDepth 减 1，即 Spring MVC 插件出栈，此时插件栈的状态如下图：")],-1),x=a("ol",{start:"3"},[a("li",null,"最后进入 Tomcat 插件的后置处理逻辑（即图中 ④ 处），其中会第 2 次调用 finish() 方法，此时 stackDepth 再次减 1，此时 stackDepth 减到了 0 ，整个插件栈已经空了，会调用父类 AbstractTracingSpan 的 finish() 方法将当前 EntrySpan 添加到关联的 TraceSegment 中。")],-1),v=a("p",null,"这里需要注意两个点，一是在调用 start() 方法时，会将之前设置的 component、Tags、Log 等信息全部清理掉（startTime不会清理），上例中请求到 Spring MVC 插件之前（即 ② 处之前）设置的这些信息都会被清理掉。二是 stackDepth 与 currentMaxDepth 不相等时（上例中 ③ 处），无法记录上述字段的信息。通过这两点，我们知道 EntrySpan 实际上只会记录最贴近业务侧的 Span 信息。",-1),f=a("p",null,'StackBasedTracingSpan 除了将"栈"概念与 EntrySpan 结合之外，还添加了 peer（以及 peerId）字段来记录远端地址，在发送远程调用时创建的 ExitSpan 会将该记录用于对端地址。',-1),V=a("p",null,'ExitSpan 表示的是出口 Span，如果在一个调用栈里面出现多个插件嵌套的场景，也需要通过"栈"的方式进行处理，与上述逻辑类似，只会在第一个插件中创建 ExitSpan，后续调用的 ExitSpan.start() 方法并不会更新 startTime，只会增加栈的深度。当然，在设置 Tags、Log 等信息时也会进行判断，只有 stackDepth 为 1 的时候，才会能正常写入相应字段。也就是说，ExitSpan 中只会记录最贴近当前服务侧的 Span 信息。',-1),B=a("p",null,"一个 TraceSegment 可以有多个 ExitSpan，例如，Dubbo A 服务在处理一个请求时，会调用 Dubbo B 服务，在得到响应之后，会紧接着调用 Dubbo C 服务，这样，该 TraceSegment 就有了两个完全独立的 ExitSpan。",-1),L=a("p",null,"LocalSpan 则比较简单，它表示一个本地方法调用。LocalSpan 直接继承了 AbstractTracingSpan，由于它未继承 StackBasedTracingSpan，所以也不能 start 或 end 多次，在后面介绍 @Trace 注解的相关实现时，还会看到 LocalSpan 的身影。",-1);function M(P,q,N,R,w,W){const s=l("Image");return o(),r("div",null,[i,E,y,g,S,d,n(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/0F/64/Ciqah16VfwaAEYUXAAC78xKXneM112.png"}),T,n(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/88/7B/Cgq2xl6VfwaAB4GAAAFOERcgywg625.png"}),D,n(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/02/36/CgoCgV6VfwaAEtowAADhKpdKuG0436.png"}),_,A,n(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/0F/64/Ciqah16VfwaAJq2eAAZosgpl-BI763.png"}),m,n(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/88/7B/Cgq2xl6VfwaAd0xmAACgHgi81uw389.png"}),u,h,I,C,k,n(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/02/36/CgoCgV6VfwaAWkKiAAAqvVnOln8393.png"}),b,n(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/0F/64/Ciqah16VfwaANG0kAABAG6dzBaI841.png"}),F,n(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/88/7B/Cgq2xl6VfweAXIYCAAAtlNICZdM619.png"}),x,v,f,V,B,L])}const O=p(c,[["render",M]]);export{G as __pageData,O as default};
