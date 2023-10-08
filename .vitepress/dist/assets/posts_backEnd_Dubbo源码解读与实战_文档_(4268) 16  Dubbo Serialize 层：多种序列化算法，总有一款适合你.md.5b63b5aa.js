import{_ as o,j as e,o as t,g as c,k as p,h as a,Q as l,s}from"./chunks/framework.a0d18f64.js";const j=JSON.parse('{"title":"16DubboSerialize层：多种序列化算法，总有一款适合你","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/Dubbo源码解读与实战_文档/(4268) 16  Dubbo Serialize 层：多种序列化算法，总有一款适合你.md","filePath":"posts/backEnd/Dubbo源码解读与实战_文档/(4268) 16  Dubbo Serialize 层：多种序列化算法，总有一款适合你.md","lastUpdated":1696682708000}'),r={name:"posts/backEnd/Dubbo源码解读与实战_文档/(4268) 16  Dubbo Serialize 层：多种序列化算法，总有一款适合你.md"},E=l(`<h1 id="_16dubboserialize层-多种序列化算法-总有一款适合你" tabindex="-1">16DubboSerialize层：多种序列化算法，总有一款适合你 <a class="header-anchor" href="#_16dubboserialize层-多种序列化算法-总有一款适合你" aria-label="Permalink to &quot;16DubboSerialize层：多种序列化算法，总有一款适合你&quot;">​</a></h1><p>通过前面课时的介绍，我们知道一个 RPC 框架需要通过网络通信实现跨 JVM 的调用。既然需要网络通信，那就必然会使用到序列化与反序列化的相关技术，Dubbo 也不例外。下面我们从 Java 序列化的基础内容开始，介绍一下常见的序列化算法，最后再分析一下 Dubbo 是如何支持这些序列化算法的。</p><h3 id="java-序列化基础" tabindex="-1">Java 序列化基础 <a class="header-anchor" href="#java-序列化基础" aria-label="Permalink to &quot;Java 序列化基础&quot;">​</a></h3><p>Java 中的序列化操作一般有如下四个步骤。</p><p>第一步，被序列化的对象需要实现 Serializable 接口，示例代码如下：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Student</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">implements</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Serializable</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">final</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">long</span><span style="color:#E1E4E8;"> serialVersionUID </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1L</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> String name;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> age;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">transient</span><span style="color:#E1E4E8;"> StudentUtil studentUtil;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Student</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">implements</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Serializable</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">final</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">long</span><span style="color:#24292E;"> serialVersionUID </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1L</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> String name;</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> age;</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">transient</span><span style="color:#24292E;"> StudentUtil studentUtil;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>在这个示例中我们可以看到<strong>transient 关键字</strong> ，它的作用就是：<strong>在对象序列化过程中忽略被其修饰的成员属性变量</strong>。一般情况下，它可以用来修饰一些非数据型的字段以及一些可以通过其他字段计算得到的值。通过合理地使用 transient 关键字，可以降低序列化后的数据量，提高网络传输效率。</p><p>第二步，生成一个序列号 serialVersionUID，这个序列号不是必需的，但还是建议你生成。serialVersionUID 的字面含义是序列化的版本号，只有序列化和反序列化的 serialVersionUID 都相同的情况下，才能够成功地反序列化。如果类中没有定义 serialVersionUID，那么 JDK 也会随机生成一个 serialVersionUID。如果在某些场景中，你希望不同版本的类序列化和反序列化相互兼容，那就需要定义相同的 serialVersionUID。</p><p>第三步，根据需求决定是否要重写 writeObject()/readObject() 方法，实现自定义序列化。</p><p>最后一步，调用 java.io.ObjectOutputStream 的 writeObject()/readObject() 进行序列化与反序列化。</p><p>既然 Java 本身的序列化操作如此简单，那为什么市面上还依旧出现了各种各样的序列化框架呢？因为这些<strong>第三方序列化框架的速度更快、序列化的效率更高，而且支持跨语言操作</strong>。</p><h3 id="常见序列化算法" tabindex="-1">常见序列化算法 <a class="header-anchor" href="#常见序列化算法" aria-label="Permalink to &quot;常见序列化算法&quot;">​</a></h3><p>为了帮助你快速了解 Dubbo 支持的序列化算法，我们这里就对其中常见的序列化算法进行简单介绍。</p><p><strong>Apache Avro 是一种与编程语言无关的序列化格式</strong>。Avro 依赖于用户自定义的 Schema，在进行序列化数据的时候，无须多余的开销，就可以快速完成序列化，并且生成的序列化数据也较小。当进行反序列化的时候，需要获取到写入数据时用到的 Schema。在 Kafka、Hadoop 以及 Dubbo 中都可以使用 Avro 作为序列化方案。</p><p><strong>FastJson 是阿里开源的 JSON 解析库，可以解析 JSON 格式的字符串</strong>。它支持将 Java 对象序列化为 JSON 字符串，反过来从 JSON 字符串也可以反序列化为 Java 对象。FastJson 是 Java 程序员常用到的类库之一，正如其名，&quot;快&quot;是其主要卖点。从官方的测试结果来看，FastJson 确实是最快的，比 Jackson 快 20% 左右，但是近几年 FastJson 的安全漏洞比较多，所以你在选择版本的时候，还是需要谨慎一些。</p><p><strong>Fst（全称是 fast-serialization）是一款高性能 Java 对象序列化工具包</strong>，100% 兼容 JDK 原生环境，序列化速度大概是JDK 原生序列化的 4~10 倍，序列化后的数据大小是 JDK 原生序列化大小的 1/3 左右。目前，Fst 已经更新到 3.x 版本，支持 JDK 14。</p><p><strong>Kryo 是一个高效的 Java 序列化/反序列化库</strong>，目前 Twitter、Yahoo、Apache 等都在使用该序列化技术，特别是 Spark、Hive 等大数据领域用得较多。Kryo 提供了一套快速、高效和易用的序列化 API。无论是数据库存储，还是网络传输，都可以使用 Kryo 完成 Java 对象的序列化。Kryo 还可以执行自动深拷贝和浅拷贝，支持环形引用。Kryo 的特点是 API 代码简单，序列化速度快，并且序列化之后得到的数据比较小。另外，Kryo 还提供了 NIO 的网络通信库------KryoNet，你若感兴趣的话可以自行查询和了解一下。</p><p><strong>Hessian2 序列化是一种支持动态类型、跨语言的序列化协议</strong>，Java 对象序列化的二进制流可以被其他语言使用。Hessian2 序列化之后的数据可以进行自描述，不会像 Avro 那样依赖外部的 Schema 描述文件或者接口定义。Hessian2 可以用一个字节表示常用的基础类型，这极大缩短了序列化之后的二进制流。需要注意的是，在 Dubbo 中使用的 Hessian2 序列化并不是原生的 Hessian2 序列化，而是阿里修改过的 Hessian Lite，它是 Dubbo 默认使用的序列化方式。其序列化之后的二进制流大小大约是 Java 序列化的 50%，序列化耗时大约是 Java 序列化的 30%，反序列化耗时大约是 Java 序列化的 20%。</p><p><strong>Protobuf（Google Protocol Buffers）是 Google 公司开发的一套灵活、高效、自动化的、用于对结构化数据进行序列化的协议</strong>。但相比于常用的 JSON 格式，Protobuf 有更高的转化效率，时间效率和空间效率都是 JSON 的 5 倍左右。Protobuf 可用于通信协议、数据存储等领域，它本身是语言无关、平台无关、可扩展的序列化结构数据格式。目前 Protobuf提供了 C++、Java、Python、Go 等多种语言的 API，gRPC 底层就是使用 Protobuf 实现的序列化。</p><h3 id="dubbo-serialization" tabindex="-1">dubbo-serialization <a class="header-anchor" href="#dubbo-serialization" aria-label="Permalink to &quot;dubbo-serialization&quot;">​</a></h3><p>Dubbo 为了支持多种序列化算法，单独抽象了一层 Serialize 层，在整个 Dubbo 架构中处于最底层，对应的模块是 dubbo-serialization 模块。 dubbo-serialization 模块的结构如下图所示：</p>`,21),y=l(`<p>dubbo-serialization-api 模块中定义了 Dubbo 序列化层的核心接口，其中最核心的是 Serialization 这个接口，它是一个扩展接口，被 @SPI 接口修饰，默认扩展实现是 Hessian2Serialization。Serialization 接口的具体实现如下：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#F97583;">SPI</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;hessian2&quot;</span><span style="color:#E1E4E8;">) </span><span style="color:#6A737D;">// 被@SPI注解修饰，默认是使用hessian2序列化算法</span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">interface</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Serialization</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 每一种序列化算法都对应一个ContentType，该方法用于获取ContentType</span></span>
<span class="line"><span style="color:#E1E4E8;">    String </span><span style="color:#B392F0;">getContentType</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 获取ContentType的ID值，是一个byte类型的值，唯一确定一个算法</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">byte</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">getContentTypeId</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 创建一个ObjectOutput对象，ObjectOutput负责实现序列化的功能，即将Java</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 对象转化为字节序列</span></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Adaptive</span></span>
<span class="line"><span style="color:#E1E4E8;">    ObjectOutput </span><span style="color:#B392F0;">serialize</span><span style="color:#E1E4E8;">(URL </span><span style="color:#FFAB70;">url</span><span style="color:#E1E4E8;">, OutputStream </span><span style="color:#FFAB70;">output</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">throws</span><span style="color:#E1E4E8;"> IOException;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 创建一个ObjectInput对象，ObjectInput负责实现反序列化的功能，即将</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 字节序列转换成Java对象</span></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Adaptive</span></span>
<span class="line"><span style="color:#E1E4E8;">    ObjectInput </span><span style="color:#B392F0;">deserialize</span><span style="color:#E1E4E8;">(URL </span><span style="color:#FFAB70;">url</span><span style="color:#E1E4E8;">, InputStream </span><span style="color:#FFAB70;">input</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">throws</span><span style="color:#E1E4E8;"> IOException;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">@</span><span style="color:#D73A49;">SPI</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;hessian2&quot;</span><span style="color:#24292E;">) </span><span style="color:#6A737D;">// 被@SPI注解修饰，默认是使用hessian2序列化算法</span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">interface</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Serialization</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 每一种序列化算法都对应一个ContentType，该方法用于获取ContentType</span></span>
<span class="line"><span style="color:#24292E;">    String </span><span style="color:#6F42C1;">getContentType</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 获取ContentType的ID值，是一个byte类型的值，唯一确定一个算法</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">byte</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">getContentTypeId</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 创建一个ObjectOutput对象，ObjectOutput负责实现序列化的功能，即将Java</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 对象转化为字节序列</span></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Adaptive</span></span>
<span class="line"><span style="color:#24292E;">    ObjectOutput </span><span style="color:#6F42C1;">serialize</span><span style="color:#24292E;">(URL </span><span style="color:#E36209;">url</span><span style="color:#24292E;">, OutputStream </span><span style="color:#E36209;">output</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">throws</span><span style="color:#24292E;"> IOException;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 创建一个ObjectInput对象，ObjectInput负责实现反序列化的功能，即将</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 字节序列转换成Java对象</span></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Adaptive</span></span>
<span class="line"><span style="color:#24292E;">    ObjectInput </span><span style="color:#6F42C1;">deserialize</span><span style="color:#24292E;">(URL </span><span style="color:#E36209;">url</span><span style="color:#24292E;">, InputStream </span><span style="color:#E36209;">input</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">throws</span><span style="color:#24292E;"> IOException;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>Dubbo 提供了多个 Serialization 接口实现，用于接入各种各样的序列化算法，如下图所示：</p>`,3),i=l(`<p>这里我们<strong>以默认的 hessian2 序列化方式为例</strong>，介绍 Serialization 接口的实现以及其他相关实现。 Hessian2Serialization 实现如下所示：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Hessian2Serialization</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">implements</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Serialization</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">byte</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">getContentTypeId</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> HESSIAN2_SERIALIZATION_ID; </span><span style="color:#6A737D;">// hessian2的ContentType ID</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> String </span><span style="color:#B392F0;">getContentType</span><span style="color:#E1E4E8;">() { </span><span style="color:#6A737D;">// hessian2的ContentType</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;x-application/hessian2&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> ObjectOutput </span><span style="color:#B392F0;">serialize</span><span style="color:#E1E4E8;">(URL </span><span style="color:#FFAB70;">url</span><span style="color:#E1E4E8;">, OutputStream </span><span style="color:#FFAB70;">out</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">throws</span><span style="color:#E1E4E8;"> IOException { </span><span style="color:#6A737D;">// 创建ObjectOutput对象</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Hessian2ObjectOutput</span><span style="color:#E1E4E8;">(out);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> ObjectInput </span><span style="color:#B392F0;">deserialize</span><span style="color:#E1E4E8;">(URL </span><span style="color:#FFAB70;">url</span><span style="color:#E1E4E8;">, InputStream </span><span style="color:#FFAB70;">is</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">throws</span><span style="color:#E1E4E8;"> IOException { </span><span style="color:#6A737D;">// 创建ObjectInput对象</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Hessian2ObjectInput</span><span style="color:#E1E4E8;">(is);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Hessian2Serialization</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">implements</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Serialization</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">byte</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">getContentTypeId</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> HESSIAN2_SERIALIZATION_ID; </span><span style="color:#6A737D;">// hessian2的ContentType ID</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> String </span><span style="color:#6F42C1;">getContentType</span><span style="color:#24292E;">() { </span><span style="color:#6A737D;">// hessian2的ContentType</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;x-application/hessian2&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> ObjectOutput </span><span style="color:#6F42C1;">serialize</span><span style="color:#24292E;">(URL </span><span style="color:#E36209;">url</span><span style="color:#24292E;">, OutputStream </span><span style="color:#E36209;">out</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">throws</span><span style="color:#24292E;"> IOException { </span><span style="color:#6A737D;">// 创建ObjectOutput对象</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Hessian2ObjectOutput</span><span style="color:#24292E;">(out);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> ObjectInput </span><span style="color:#6F42C1;">deserialize</span><span style="color:#24292E;">(URL </span><span style="color:#E36209;">url</span><span style="color:#24292E;">, InputStream </span><span style="color:#E36209;">is</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">throws</span><span style="color:#24292E;"> IOException { </span><span style="color:#6A737D;">// 创建ObjectInput对象</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Hessian2ObjectInput</span><span style="color:#24292E;">(is);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>Hessian2Serialization 中的 serialize() 方法创建的 ObjectOutput 接口实现为 Hessian2ObjectOutput，继承关系如下图所示：</p>`,3),u=s("p",null,"在 DataOutput 接口中定义了序列化 Java 中各种数据类型的相应方法，如下图所示，其中有序列化 boolean、short、int、long 等基础类型的方法，也有序列化 String、byte[] 的方法。",-1),b=s("p",null,"ObjectOutput 接口继承了 DataOutput 接口，并在其基础之上，添加了序列化对象的功能，具体定义如下图所示，其中的 writeThrowable()、writeEvent() 和 writeAttachments() 方法都是调用 writeObject() 方法实现的。",-1),F=l(`<p>Hessian2ObjectOutput 中会封装一个 Hessian2Output 对象，需要注意，这个对象是 ThreadLocal 的，与线程绑定。在 DataOutput 接口以及 ObjectOutput 接口中，序列化各类型数据的方法都会委托给 Hessian2Output 对象的相应方法完成，实现如下：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Hessian2ObjectOutput</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">implements</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ObjectOutput</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> ThreadLocal&lt;</span><span style="color:#F97583;">Hessian2Output</span><span style="color:#E1E4E8;">&gt; OUTPUT_TL </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> ThreadLocal.</span><span style="color:#B392F0;">withInitial</span><span style="color:#E1E4E8;">(() </span><span style="color:#F97583;">-&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 初始化Hessian2Output对象</span></span>
<span class="line"><span style="color:#E1E4E8;">        Hessian2Output h2o </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Hessian2Output</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">);        h2o.</span><span style="color:#B392F0;">setSerializerFactory</span><span style="color:#E1E4E8;">(Hessian2SerializerFactory.SERIALIZER_FACTORY);</span></span>
<span class="line"><span style="color:#E1E4E8;">        h2o.</span><span style="color:#B392F0;">setCloseStreamOnClose</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> h2o;</span></span>
<span class="line"><span style="color:#E1E4E8;">    });</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">final</span><span style="color:#E1E4E8;"> Hessian2Output mH2o;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Hessian2ObjectOutput</span><span style="color:#E1E4E8;">(OutputStream </span><span style="color:#FFAB70;">os</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        mH2o </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> OUTPUT_TL.</span><span style="color:#B392F0;">get</span><span style="color:#E1E4E8;">(); </span><span style="color:#6A737D;">// 触发OUTPUT_TL的初始化</span></span>
<span class="line"><span style="color:#E1E4E8;">        mH2o.</span><span style="color:#B392F0;">init</span><span style="color:#E1E4E8;">(os);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">writeObject</span><span style="color:#E1E4E8;">(Object </span><span style="color:#FFAB70;">obj</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">throws</span><span style="color:#E1E4E8;"> IOException {</span></span>
<span class="line"><span style="color:#E1E4E8;">        mH2o.</span><span style="color:#B392F0;">writeObject</span><span style="color:#E1E4E8;">(obj);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    ... </span><span style="color:#6A737D;">// 省略序列化其他类型数据的方法</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Hessian2ObjectOutput</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">implements</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ObjectOutput</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> ThreadLocal&lt;</span><span style="color:#D73A49;">Hessian2Output</span><span style="color:#24292E;">&gt; OUTPUT_TL </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> ThreadLocal.</span><span style="color:#6F42C1;">withInitial</span><span style="color:#24292E;">(() </span><span style="color:#D73A49;">-&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 初始化Hessian2Output对象</span></span>
<span class="line"><span style="color:#24292E;">        Hessian2Output h2o </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Hessian2Output</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">null</span><span style="color:#24292E;">);        h2o.</span><span style="color:#6F42C1;">setSerializerFactory</span><span style="color:#24292E;">(Hessian2SerializerFactory.SERIALIZER_FACTORY);</span></span>
<span class="line"><span style="color:#24292E;">        h2o.</span><span style="color:#6F42C1;">setCloseStreamOnClose</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">true</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> h2o;</span></span>
<span class="line"><span style="color:#24292E;">    });</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">final</span><span style="color:#24292E;"> Hessian2Output mH2o;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Hessian2ObjectOutput</span><span style="color:#24292E;">(OutputStream </span><span style="color:#E36209;">os</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        mH2o </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> OUTPUT_TL.</span><span style="color:#6F42C1;">get</span><span style="color:#24292E;">(); </span><span style="color:#6A737D;">// 触发OUTPUT_TL的初始化</span></span>
<span class="line"><span style="color:#24292E;">        mH2o.</span><span style="color:#6F42C1;">init</span><span style="color:#24292E;">(os);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">writeObject</span><span style="color:#24292E;">(Object </span><span style="color:#E36209;">obj</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">throws</span><span style="color:#24292E;"> IOException {</span></span>
<span class="line"><span style="color:#24292E;">        mH2o.</span><span style="color:#6F42C1;">writeObject</span><span style="color:#24292E;">(obj);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    ... </span><span style="color:#6A737D;">// 省略序列化其他类型数据的方法</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>Hessian2Serialization 中的 deserialize() 方法创建的 ObjectInput 接口实现为 Hessian2ObjectInput，继承关系如下所示：</p>`,3),A=s("p",null,"Hessian2ObjectInput 具体的实现与 Hessian2ObjectOutput 类似：在 DataInput 接口中实现了反序列化各种类型的方法，在 ObjectInput 接口中提供了反序列化 Java 对象的功能，在 Hessian2ObjectInput 中会将所有反序列化的实现委托为 Hessian2Input。",-1),D=s("p",null,"了解了 Dubbo Serialize 层的核心接口以及 Hessian2 序列化算法的接入方式之后，你就可以亲自动手，去阅读其他序列化算法对应模块的代码。",-1),O=s("h3",{id:"总结",tabindex:"-1"},[a("总结 "),s("a",{class:"header-anchor",href:"#总结","aria-label":'Permalink to "总结"'},"​")],-1),d=s("p",null,"在本课时，我们首先介绍了 Java 序列化的基础知识，帮助你快速了解序列化和反序列化的基本概念。然后，介绍了常见的序列化算法，例如，Arvo、Fastjson、Fst、Kryo、Hessian、Protobuf 等。最后，深入分析了 dubbo-serialization 模块对各个序列化算法的接入方式，其中重点说明了 Hessian2 序列化方式。",-1),_=s("p",null,"关于本课时，你若还有什么疑问或想法，欢迎你留言跟我分享。",-1);function g(h,S,C,v,I,m){const n=e("Image");return t(),c("div",null,[E,p(n,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image/M00/4F/68/Ciqc1F9gbIiAdyaqAAB4bHnToKs832.png"}),a(),y,p(n,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image/M00/4F/74/CgqCHl9gbJKAFOslAAFjEeB7nf0890.png"}),a(),i,p(n,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image/M00/4F/74/CgqCHl9gbOiAG_1mAABH4c18z9c011.png"}),a(),u,p(n,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image/M00/4F/69/Ciqc1F9gbO6AExKqAAB_Dm_zMt0793.png"}),a(),b,p(n,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image/M00/4F/74/CgqCHl9gbPOATpsmAABH5ZuVc6E438.png"}),a(),F,p(n,{alt:"Drawing 5.png",src:"https://s0.lgstatic.com/i/image/M00/4F/74/CgqCHl9gbQ6AXSDeAABIcO3u8aY906.png"}),a(),A,D,O,d,_])}const H=o(r,[["render",g]]);export{j as __pageData,H as default};
