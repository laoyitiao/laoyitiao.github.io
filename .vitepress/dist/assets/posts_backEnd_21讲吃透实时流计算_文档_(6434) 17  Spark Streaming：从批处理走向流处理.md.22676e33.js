import{_ as a,o as s,g as n,Q as p}from"./chunks/framework.f949202b.js";const g=JSON.parse('{"title":"Spark Streaming ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/21讲吃透实时流计算_文档/(6434) 17  Spark Streaming：从批处理走向流处理.md","filePath":"posts/backEnd/21讲吃透实时流计算_文档/(6434) 17  Spark Streaming：从批处理走向流处理.md","lastUpdated":null}'),t={name:"posts/backEnd/21讲吃透实时流计算_文档/(6434) 17  Spark Streaming：从批处理走向流处理.md"},o=p(`<p>今天，我们还是从<strong>系统架构、流的描述、流的处理、流的状态、消息处理可靠性</strong>这五个方面对 Spark Streaming 进行分析和讲解。</p><h3 id="spark-streaming" tabindex="-1">Spark Streaming <a class="header-anchor" href="#spark-streaming" aria-label="Permalink to &quot;Spark Streaming&quot;">​</a></h3><p>说到 Spark Streaming，还得从 Spark 谈起。如今在大数据的世界里，Spark 早已是众所周知的大数据处理和分析框架。Spark 在其诞生之初，由于采用内存计算和 DAG 简化处理流程的原因，使得大数据处理性能得到显著提升，一下子就将传统大数据批处理框架 Hadoop MapReduce 比了下去，取而代之成为大数据领域最耀眼的明星框架。</p><p>后来随着流计算技术的兴起，Spark 在批处理领域取得巨大成功之后，也开始将其触角延伸到流计算领域，于是诞生了 Spark Streaming。Spark Streaming 是一种建立在 Spark 批处理技术上的流计算框架，它提供了可扩展、高吞吐和错误容忍的流数据处理功能。</p><p>我们从 Spark Streaming 的系统架构中，就能看到 Spark Streaming 流计算技术和 Spark 批处理技术，这两者之间一脉相承的关系。</p><h3 id="系统架构" tabindex="-1">系统架构 <a class="header-anchor" href="#系统架构" aria-label="Permalink to &quot;系统架构&quot;">​</a></h3><p>下面的图 1 描述了 Spark Streaming 的工作原理。</p><p><img src="https://s0.lgstatic.com/i/image6/M01/20/52/CioPOWBS_7eAXRqXAAGiz_WNEU8237.png" alt="Drawing 1.png"></p><p>从上面的图 1 可以看出，当 Spark Streaming 接收到流数据时，先是将其切分成一个个的 RDD（Resilient Distributed Datasets，弹性分布式数据集），每个 RDD 实际是一个小的块数据。然后，这些 RDD 块数据再由 Spark 引擎进行各种处理。最后，处理完的结果同样是以一个个的 RDD 块数据依次输出。</p><p>所以，<strong>Spark Streaming 本质上是将流数据分成一段段块数据后，进行连续不断地批处理</strong>。</p><h3 id="流的描述" tabindex="-1">流的描述 <a class="header-anchor" href="#流的描述" aria-label="Permalink to &quot;流的描述&quot;">​</a></h3><p>接下来，我们就来看看在 Spark Streaming 中如何描述一个流计算过程。</p><p>由于 Spark Streaming 是构建在 Spark 之上，而 Spark 的核心是一个针对 RDD 块数据做批处理的执行引擎。所以 Spark Streaming 在描述流时，采用了&quot;模版&quot;的概念。具体如下图 2 所示。</p><p><img src="https://s0.lgstatic.com/i/image6/M00/20/52/CioPOWBS_-6Aa4RJAAJLOFofOxM909.png" alt="Drawing 3.png"></p><p>上面的图 2 说明了 Spark Streaming 是如何描述流计算过程的，具体如下：</p><ul><li><p>首先是 RDD。它是 Spark 引擎的核心概念，代表了一个数据集合，是 Spark 进行数据处理的计算单元。</p></li><li><p>然后是 DStream。它是 Spark Streaming 对流的抽象，代表了连续数据流。<strong>在 Spark Streaming 系统内部，DStream 是同一类 RDD 的模板</strong>，因而我们也可以将 DStream 视为由同一类 RDD 组成的序列，每个 RDD 代表了一段间隔内的流数据。</p></li><li><p>然后是 Transformation。它代表了 Spark Streaming 对 DStream（也就是同一类 RDD） 的处理逻辑。目前， DStream 提供了很多 Transformation 相关 API，包括 map、flatMap、filter、reduce、union、join、transform 和 updateStateByKey 等。通过这些 API，可以对 DStream 做各种转换，从而将一个数据流变为另一个数据流。</p></li><li><p>接着是 DStreamGraph。它是 Spark Streaming 对流计算过程的描述，也就是 DAG。<strong>在 Spark Streaming 系统内部，DStreamGraph 代表了 RDD 处理过程 DAG 的模板</strong>。DStream 通过 Transformation 可以连接成 DStreamGraph，这就相当于用&quot;点&quot;和&quot;线&quot;画成 DAG 的过程。</p></li><li><p>最后是 Output Operations。它是 Spark Streaming 将 DStream 输出到控制台、数据库或文件系统等外部系统的操作。目前，DStream 支持的 Output Operations 包括 print、saveAsTextFiles、saveAsObjectFiles、saveAsHadoopFiles 和 foreachRDD。由于这些操作会触发外部系统访问，所以 DStream 各种转化的执行实际上是由这些操作触发的。</p></li></ul><p>从上面 Spark Streaming 的概念可以看出，对应到我们在模块二中讨论过的流计算框架组成，DStreamGraph 对应了 DAG，DStream 相当于 DAG 中的&quot;队列&quot;， 而 Transformation 和 Output Operations 则相当于执行任务的&quot;节点&quot;。</p><h3 id="流的处理" tabindex="-1">流的处理 <a class="header-anchor" href="#流的处理" aria-label="Permalink to &quot;流的处理&quot;">​</a></h3><p>接下来，我们再来看 Spark Streaming 中的流是怎么被处理的。与 Storm 类似，我们从<strong>流的输入、流的处理、流的输出和反向压力四个方面</strong>来讨论。</p><p>首先是<strong>流的输入</strong>。Spark Streaming 提供了三种创建输入数据流的方式。</p><ul><li><p>一是基础数据源，通过 StreamingContext 的相关 API，直接构建输入数据流。这类 API 通常是从 socket、文件或内存中构建输入数据流，比如 socketTextStream、textFileStream、queueStream 等。</p></li><li><p>二是高级数据源，通过外部工具类从 Kafka、Flume、Kinesis 等消息中间件或消息源构建输入数据流。</p></li><li><p>三是自定义数据源，当用户实现了 org.apache.spark.streaming.receiver 抽象类时，就可以实现一个自定义的数据源了。</p></li></ul><p>由于 Spark Streaming 是用 DStream 来表示数据流，所以输入数据流也表示为 DStream。下面的代码（<a href="https://github.com/alain898/realtime_stream_computing_course/blob/main/course17/src/main/java/com/alain898/course/realtimestreaming/course17/sparkstreaming/WordCountExample.java?fileGuid=xxQTRXtVcqtHK6j8" target="_blank" rel="noreferrer">本课时完整代码请参考这里</a>）演示了从 TCP 连接中构建文本数据输入流的过程。</p><div class="language-java vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">SparkConf conf </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">SparkConf</span><span style="color:#E1E4E8;">().</span><span style="color:#B392F0;">setMaster</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;local[2]&quot;</span><span style="color:#E1E4E8;">).</span><span style="color:#B392F0;">setAppName</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;WordCountExample&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">JavaStreamingContext jssc </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">JavaStreamingContext</span><span style="color:#E1E4E8;">(conf, Durations.</span><span style="color:#B392F0;">seconds</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">));</span></span>
<span class="line"><span style="color:#E1E4E8;">JavaReceiverInputDStream&lt;</span><span style="color:#F97583;">String</span><span style="color:#E1E4E8;">&gt; lines </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> jssc.</span><span style="color:#B392F0;">socketTextStream</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;localhost&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">9999</span><span style="color:#E1E4E8;">);</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">SparkConf conf </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">SparkConf</span><span style="color:#24292E;">().</span><span style="color:#6F42C1;">setMaster</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;local[2]&quot;</span><span style="color:#24292E;">).</span><span style="color:#6F42C1;">setAppName</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;WordCountExample&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">JavaStreamingContext jssc </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">JavaStreamingContext</span><span style="color:#24292E;">(conf, Durations.</span><span style="color:#6F42C1;">seconds</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">));</span></span>
<span class="line"><span style="color:#24292E;">JavaReceiverInputDStream&lt;</span><span style="color:#D73A49;">String</span><span style="color:#24292E;">&gt; lines </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> jssc.</span><span style="color:#6F42C1;">socketTextStream</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;localhost&quot;</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">9999</span><span style="color:#24292E;">);</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>在上面的代码中，我们用 socketTextStream 创建了一个从本地 9999 端口接收文本数据的输入流。</p><p>然后是<strong>流的处理</strong>。Spark Streaming 对流的处理，是通过 DStream 的各种转化操作 API 完成。DStream 的转换操作大体上包含了三类。</p><ul><li><p><strong>第一类是常用的流式处理操作</strong>，比如 map、filter、reduce、count、transform 等。</p></li><li><p><strong>第二类是流数据状态相关的操作</strong>，比如 union、join、cogroup、window 等。</p></li><li><p><strong>第三类则是流信息状态相关的操作</strong>，目前有 updateStateByKey 和 mapWithState。</p></li></ul><p>下面是一个对 DStream 进行转化处理的例子。</p><div class="language-java vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// 将每一行分割成单词，然后统计单词出现次数</span></span>
<span class="line"><span style="color:#E1E4E8;">JavaDStream&lt;</span><span style="color:#F97583;">String</span><span style="color:#E1E4E8;">&gt; words </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> lines.</span><span style="color:#B392F0;">flatMap</span><span style="color:#E1E4E8;">(x </span><span style="color:#F97583;">-&gt;</span><span style="color:#E1E4E8;"> Arrays.</span><span style="color:#B392F0;">asList</span><span style="color:#E1E4E8;">(x.</span><span style="color:#B392F0;">split</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot; &quot;</span><span style="color:#E1E4E8;">)).</span><span style="color:#B392F0;">iterator</span><span style="color:#E1E4E8;">());</span></span>
<span class="line"><span style="color:#E1E4E8;">JavaPairDStream&lt;</span><span style="color:#F97583;">String</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">Integer</span><span style="color:#E1E4E8;">&gt; pairs </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> words.</span><span style="color:#B392F0;">mapToPair</span><span style="color:#E1E4E8;">(s </span><span style="color:#F97583;">-&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> Tuple2&lt;&gt;(s, </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">));</span></span>
<span class="line"><span style="color:#E1E4E8;">JavaPairDStream&lt;</span><span style="color:#F97583;">String</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">Integer</span><span style="color:#E1E4E8;">&gt; wordCounts </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> pairs.</span><span style="color:#B392F0;">reduceByKey</span><span style="color:#E1E4E8;">((i1, i2) </span><span style="color:#F97583;">-&gt;</span><span style="color:#E1E4E8;"> i1 </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> i2);</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// 将每一行分割成单词，然后统计单词出现次数</span></span>
<span class="line"><span style="color:#24292E;">JavaDStream&lt;</span><span style="color:#D73A49;">String</span><span style="color:#24292E;">&gt; words </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> lines.</span><span style="color:#6F42C1;">flatMap</span><span style="color:#24292E;">(x </span><span style="color:#D73A49;">-&gt;</span><span style="color:#24292E;"> Arrays.</span><span style="color:#6F42C1;">asList</span><span style="color:#24292E;">(x.</span><span style="color:#6F42C1;">split</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot; &quot;</span><span style="color:#24292E;">)).</span><span style="color:#6F42C1;">iterator</span><span style="color:#24292E;">());</span></span>
<span class="line"><span style="color:#24292E;">JavaPairDStream&lt;</span><span style="color:#D73A49;">String</span><span style="color:#24292E;">, </span><span style="color:#D73A49;">Integer</span><span style="color:#24292E;">&gt; pairs </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> words.</span><span style="color:#6F42C1;">mapToPair</span><span style="color:#24292E;">(s </span><span style="color:#D73A49;">-&gt;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> Tuple2&lt;&gt;(s, </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">));</span></span>
<span class="line"><span style="color:#24292E;">JavaPairDStream&lt;</span><span style="color:#D73A49;">String</span><span style="color:#24292E;">, </span><span style="color:#D73A49;">Integer</span><span style="color:#24292E;">&gt; wordCounts </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> pairs.</span><span style="color:#6F42C1;">reduceByKey</span><span style="color:#24292E;">((i1, i2) </span><span style="color:#D73A49;">-&gt;</span><span style="color:#24292E;"> i1 </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> i2);</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>在上面的代码中，先将从 socket 中读出的文本流 lines ，对每行文本分词后，用 flatMap 转化为单词流 words。然后用 mapToPair 将单词流 words 转化为计数元组流 pairs。最后，以单词为分组进行数量统计，通过 reduceByKey 转化为单词计数流 wordCounts。</p><p>接下来是<strong>流的输出</strong>。Spark Streaming 允许 DStream 输出到外部系统，这是通过 DStream 的各种输出操作完成的。DStream 的输出操作可以将数据输出到控制台、文件系统或数据库等。</p><p>目前 DStream 的输出操作有 print、saveAsTextFiles、saveAsHadoopFiles 和 foreachRDD 等。其中 foreachRDD 是一个通用的 DStream 输出接口，用户可以通过 foreachRDD 自定义各种 Spark Streaming 输出方式。下面的例子演示了将单词计数流打印到控制台。</p><div class="language-java vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">wordCounts.</span><span style="color:#B392F0;">print</span><span style="color:#E1E4E8;">();</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">wordCounts.</span><span style="color:#6F42C1;">print</span><span style="color:#24292E;">();</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>最后是<strong>反向压力</strong>。早期版本 Spark 不支持反向压力，但从 Spark 1.5 版本开始，Spark Streaming 也引入了反向压力功能，这是不是正说明了反向压力功能对流计算系统的必要性！默认情况下 Spark Streaming 的反向压力功能是关闭的。当要使用反向压力功能时，需要将 spark.streaming.backpressure.enabled 设置为 true。</p><p>整体而言，Spark 的反向压力借鉴了工业控制中 PID 控制器的思路，其工作原理如下。</p><ul><li><p>首先，当 Spark 在处理完每批数据时，统计每批数据的处理结束时间、处理时延、等待时延、处理消息数等信息。</p></li><li><p>然后，根据统计信息估计处理速度，并将这个估计值通知给数据生产者。</p></li><li><p>最后，数据生产者根据估计出的处理速度，动态调整生产速度，最终使得生产速度与处理速度相匹配。</p></li></ul><h3 id="流的状态" tabindex="-1">流的状态 <a class="header-anchor" href="#流的状态" aria-label="Permalink to &quot;流的状态&quot;">​</a></h3><p>接下来，我们再来看 Spark Streaming 中流的状态问题。Spark Streaming 关于流的状态管理，也是在 DStream 提供的转化操作中实现的。</p><p>我们先来看<strong>流数据状态</strong>。由于 DStream 本身就是将数据流分成 RDD 做批处理，所以 Spark Streaming 天然就需要对数据进行缓存和状态管理。换言之，组成 DStream 的一个个 RDD，就是一种流数据状态。DStream 提供了一些 window 相关的 API，实现了对流数据的窗口管理，并基于窗口实现了 count 和 reduce 这两类聚合功能。另外，DStream 还提供了union、join 和 cogroup 三种在多个流之间进行关联操作的 API。以上窗口和关联操作相关的 API，也属于 Spark 对流数据状态的支持。</p><p>说完流数据状态，我们再来看<strong>流信息状态</strong>。DStream 的 updateStateByKey 和 mapWithState 操作提供了流信息状态管理的方法。updateStateByKey 和 mapWithState 都可以基于 key 来记录历史信息，并在新的数据到来时，对这些信息进行更新。</p><p>不同的是，updateStateByKey 会返回记录的所有历史信息，而 mapWithState 只会返回处理当前一批数据时更新的信息。就好像，前者是在返回一个完整的直方图，而后者则只返回直方图中发生变化的柱条。</p><p>由此可见， mapWithState 比 updateStateByKey 的性能会优越很多。而且从功能上讲，如果不是用于报表生成的场景，大多数实时流计算应用中，使用 mapWithState 也会更合适。</p><h3 id="消息处理可靠性" tabindex="-1">消息处理可靠性 <a class="header-anchor" href="#消息处理可靠性" aria-label="Permalink to &quot;消息处理可靠性&quot;">​</a></h3><p>最后，我们来看下 Spark Streaming 中消息处理可靠性的问题。Spark Streaming 对消息可靠性的保证，是由数据接收、数据处理和数据输出共同决定的。从 1.2 版本开始，Spark 引入 WAL（write ahead logs）机制，可以将接收的数据先保存到错误容忍的存储上。当打开 WAL 机制后，再配合可靠的数据接收器（比如 Kafka），Spark Streaming 能够提供&quot;至少一次&quot;的消息接收。从 1.3 版本开始，Spark 又引入了 Kafka Direct API，进而可以实现&quot;精确一次&quot;的消息接收。</p><p>由于 Spark Streaming 对数据的处理是基于 RDD 完成，而 RDD 提供了&quot;精确一次&quot;的消息处理。所以在数据处理部分，Spark Streaming 天然具备&quot;精确一次&quot;的消息可靠性保证。</p><p>但是，Spark Streaming 的数据输出部分目前只具备&quot;至少一次&quot;的可靠性保证。也就是说，经过处理后的数据，可能会被多次输出到外部系统。</p><p>在一些场景下，这个不会有什么问题。比如输出数据是保存到文件系统，重复发送的结果只是覆盖掉之前写过一遍的数据。</p><p>但是在另一些场景下，比如需要根据输出增量更新数据库，那就需要做一些额外的去重处理了。一种可行的方法是，在各个 RDD 中新增一个唯一标志符来表示这批数据，然后在写入数据库时，使用这个唯一标志符来检查数据之前是否写入过。当然，这时写入数据库的动作需要使用事务来保证完整性了。</p><h3 id="小结" tabindex="-1">小结 <a class="header-anchor" href="#小结" aria-label="Permalink to &quot;小结&quot;">​</a></h3><p>总的来说，Spark Streaming 作为一种<strong>从批处理框架发展而来的流计算框架</strong> ，代表了大数据领域的<strong>两种趋势</strong> 。一是，<strong>部分原本用批处理完成的任务，正逐渐转向由流处理来完成</strong> 。二是，这种 <strong>&quot;流&quot;&quot;批&quot;一体的框架越来越成为主流</strong>，毕竟用一个框架完成两种不同类型的计算任务，会极大地简化系统的复杂程度。</p><p>但是，Spark Streaming 这种将流数据按批处理的方式，还是存在一定的问题。问题主要是，Spark Streaming 将数据从流数据划分为 RDD 块数据时，时间间隔不能设置得太短，目前比较典型的最小时间间隔是 100 毫秒。这就意味着，Spark Streaming 处理流数据的时间延迟，最少会是 100 毫秒。</p><p>这对于实时要求更加严苛的场景是不适用的，同时这也意味着 Spark Streaming 并不能按逐条的方式，对流数据进行处理。这点需要你在实际开发过程中尤其注意，看你的业务场景是否可以接受 100 毫秒以上的延迟，以及是否不需要逐事件处理。</p><p>最后留一个小作业，如何分别使用 Spark Streaming 的流数据状态 API 和流信息状态 API 实现&quot;过去 24 小时同一种商品的交易总金额&quot;这种计算呢？可以将你的想法和问题在留言区写下来，我看到后会进行分析和解答。</p><p>下面是本课时的脑图，以帮助你理解。</p><p><img src="https://s0.lgstatic.com/i/image6/M00/20/52/CioPOWBTABeAf-AEABKJEPt9vJE024.png" alt="Drawing 4.png"></p>`,54),e=[o];function r(l,c,i,E,S,y){return s(),n("div",null,e)}const u=a(t,[["render",r]]);export{g as __pageData,u as default};
