import{_ as n,j as l,o as t,g as r,k as e,h as a,Q as p,s}from"./chunks/framework.a0d18f64.js";const D=JSON.parse('{"title":"第24讲：ZooKeeper在Kafka和Dubbo中的工业级实现案例分析","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/ZooKeeper源码分析与实战_文档/(3154) 第24讲：ZooKeeper 在 Kafka 和 Dubbo 中的工业级实现案例分析.md","filePath":"posts/backEnd/ZooKeeper源码分析与实战_文档/(3154) 第24讲：ZooKeeper 在 Kafka 和 Dubbo 中的工业级实现案例分析.md","lastUpdated":1696682708000}'),c={name:"posts/backEnd/ZooKeeper源码分析与实战_文档/(3154) 第24讲：ZooKeeper 在 Kafka 和 Dubbo 中的工业级实现案例分析.md"},i=p('<h1 id="第24讲-zookeeper在kafka和dubbo中的工业级实现案例分析" tabindex="-1">第24讲：ZooKeeper在Kafka和Dubbo中的工业级实现案例分析 <a class="header-anchor" href="#第24讲-zookeeper在kafka和dubbo中的工业级实现案例分析" aria-label="Permalink to &quot;第24讲：ZooKeeper在Kafka和Dubbo中的工业级实现案例分析&quot;">​</a></h1><p>在前面的课程中，我们学习了如何使用 ZooKeeper 实现分布式 ID 生成器，以及负载均衡的分布式环境下常用的解决方案。为了更进一步地提高用 ZooKeeper 解决问题的能力，我们再来分析一下在主流开源框架中如何使用 ZooKeeper。本节课主要选择业界最为流行的两个框架，一个是 RPC 框架 Dubbo，另一个是分布式发布订阅消息系统 Kafka。下面我们先来分析这两个框架都分别利用 ZooKeeper 解决了哪些问题。</p><h3 id="dubbo-与-zookeeper" tabindex="-1">Dubbo 与 ZooKeeper <a class="header-anchor" href="#dubbo-与-zookeeper" aria-label="Permalink to &quot;Dubbo 与 ZooKeeper&quot;">​</a></h3><h4 id="dubbo-实现过程" tabindex="-1">Dubbo 实现过程 <a class="header-anchor" href="#dubbo-实现过程" aria-label="Permalink to &quot;Dubbo 实现过程&quot;">​</a></h4><p>Dubbo 是阿里巴巴开发的一套开源的技术框架，<strong>是一款高性能、轻量级的开源 Java RPC 框架</strong>。它提供了三大核心能力：</p><ul><li><p>面向接口的远程方法调用</p></li><li><p>智能容错和负载均衡</p></li><li><p>服务自动注册和发现</p></li></ul><p>其中，远程方法调用是 Dubbo 最为核心的功能点。因为一个分布式系统是由分布在不同网络区间或节点上的计算机或服务，通过彼此之间的信息传递进行协调工作的系统。因此<strong>跨机器或网络区间的通信是实现分布式系统的核心</strong>。而 Dubbo 框架可以让我们像调用本地方法一样，调用不同机器或网络服务上的线程方法。</p><p>下图展示了整个 Dubbo 服务的连通过程。整个服务的调用过程主要分为<strong>服务的消费端</strong> 和<strong>服务的提供方</strong>。首先，服务的提供方向 Registry 注册中心注册所能提供的服务信息，接着服务的消费端会向 Registry 注册中心订阅该服务，注册中心再将服务提供者地址列表返回给消费者。如果有变更，注册中心将基于长连接将变更数据推送给消费者，从而通过服务的注册机制实现远程过程调用。</p>',8),E=s("h4",{id:"zookeeper-注册中心",tabindex:"-1"},[a("ZooKeeper 注册中心 "),s("a",{class:"header-anchor",href:"#zookeeper-注册中心","aria-label":'Permalink to "ZooKeeper 注册中心"'},"​")],-1),y=s("p",null,[a("通过上面的介绍，我们不难发现在整个 Dubbo 框架的实现过程中，"),s("strong",null,"注册中心是其中最为关键的一点，它保证了整个 PRC 过程中服务对外的透明性"),a("。而 Dubbo 的注册中心也是通过 ZooKeeper 来实现的。")],-1),d=s("p",null,"如下图所示，在整个 Dubbo 服务的启动过程中，服务提供者会在启动时向 /dubbo/com.foo.BarService/providers 目录写入自己的 URL 地址，这个操作可以看作是一个 ZooKeeper 客户端在 ZooKeeper 服务器的数据模型上创建一个数据节点。服务消费者在启动时订阅 /dubbo/com.foo.BarService/providers 目录下的提供者 URL 地址，并向 /dubbo/com.foo.BarService/consumers 目录写入自己的 URL 地址。该操作是通过 ZooKeeper 服务器在 /consumers 节点路径下创建一个子数据节点，然后再在请求会话中发起对 /providers 节点的 watch 监控。",-1),g=s("h3",{id:"kafka-与-zookeeper",tabindex:"-1"},[a("Kafka 与 ZooKeeper "),s("a",{class:"header-anchor",href:"#kafka-与-zookeeper","aria-label":'Permalink to "Kafka 与 ZooKeeper"'},"​")],-1),k=s("p",null,"接下来我们再看一下 ZooKeeper 在另一个开源框架 Kafka 中的应用。Kafka 是一种高吞吐量的分布式发布订阅消息系统，它可以处理消费者在网站中的所有动作流数据，经常用来解决大量数据日志的实时收集以及 Web 网站上用户 PV 数统计和访问记录等。我们可以把 Kafka 看作是一个数据的高速公路，利用这条公路，数据可以低延迟、高效地从一个地点到达另一个地点。",-1),u=s("h4",{id:"kafka-实现过程",tabindex:"-1"},[a("Kafka 实现过程 "),s("a",{class:"header-anchor",href:"#kafka-实现过程","aria-label":'Permalink to "Kafka 实现过程"'},"​")],-1),h=s("p",null,"在介绍 ZooKeeper 在 Kafka 中如何使用之前，我们先来简单地了解一下 Kafka 的一些关键概念，以便之后的学习。如下图所示，整个 Kafka 的系统架构主要由 Broker、Topic、Partition、Producer、Consumer、Consumer Group 这几个核心概念组成，下面我们来分别进行介绍。",-1),b=p('<p><strong>Broker</strong></p><p>Kafka 也是一个分布式的系统架构，因此在整个系统中存在多台机器，它将每台机器定义为一个 Broker。</p><p><strong>Topic</strong></p><p>Kafka 的主要功能是发送和接收消息，作为一个高效的消息管道，它存在于不同的系统中。Kafka 内部，将接收到的无论何种类型的消息统一定义为 Topic 类，可以将 Topic 看作是消息的容器。</p><p><strong>Partition</strong></p><p>Partition 是分区的意思，与 Topic 概念相似，它也是存放消息的容器。不过 Partition 主要是物理上的分区，而 Topic 表示消息的逻辑分区。</p><p><strong>Producer</strong></p><p>Producer 是消息的生产者，整个 Kafka 系统遵循的是生产者和消费者模式，消息会从生产者流通到接收者。</p><p><strong>Consumer 和 Consumer Group</strong></p><p>Consumer 即消费者，是 Kafka 框架内部对信息对接收方的定义。Consumer Group 会将消费者分组，然后按照不同的种类进行管理。</p><p>在整个 Kafka 服务的运行过程中，信息首先通过 producer 生产者提交给 Kafka 服务器上的 Topics 消息容器。在消息容器的内部，又会根据当前系统磁盘情况选择对应的物理分区进行存储，而每台服务分区可能对应一台或多台 Broker 服务器，之后 Broker 服务器再将信息推送给 Consumer。</p><h4 id="zookeeper-的作用" tabindex="-1">Zookeeper 的作用 <a class="header-anchor" href="#zookeeper-的作用" aria-label="Permalink to &quot;Zookeeper 的作用&quot;">​</a></h4><p>介绍完 Kafka 的相关概念和服务运行原理后，接下来我们学习 ZooKeeper 在 Kafka 框架下的应用。在 Kafka 中 ZooKeeper 几乎存在于每个方面，如下图所示，Kafka 会将我们上面介绍的流程架构存储为一个 ZooKeeper 上的数据模型。</p>',13),K=p(`<p>由于 Broker 服务器采用分布式集群的方式工作，那么在服务的运行过程中，难免出现某台机器因异常而关闭的状况。为了保证整个 Kafka 集群的可用性，需要在系统中监控整个机器的运行情况。而 Kafka 可以通过 ZooKeeper 中的数据节点，将网络中机器的运行统计存储在数据模型中的 brokers 节点下。</p><p>在 Kafka 的 Topic 信息注册中也需要使用到 ZooKeeper ，在 Kafka 中同一个Topic 消息容器可以分成多个不同片，而这些分区既可以存在于一台 Broker 服务器中，也可以存在于不同的 Broker 服务器中。</p><p>而在 Kafka 集群中，每台 Broker 服务器又相对独立。为了能够读取这些以分布式方式存储的分区信息，Kafka 会将这些分区信息在 Broker 服务器中的对应关系存储在 ZooKeeper 数据模型的 topic 节点上，每一个 topic 在 ZooKeeper 数据节点上都会以 /brokers/topics/[topic] 的形式存在。当 Broker 服务器启动的时候，会首先在 /brokers/topics 节点下创建自己的 Broker_id 节点，并将该服务器上的分区数量存储在该数据节点的信息中。之后 ，在系统运行的过程中，通过统计 /brokers/topics 下的节点信息，就能知道对应的 Broker 分区情况。</p><h3 id="整合-zookeeper-到自己的系统" tabindex="-1">整合 ZooKeeper 到自己的系统 <a class="header-anchor" href="#整合-zookeeper-到自己的系统" aria-label="Permalink to &quot;整合 ZooKeeper 到自己的系统&quot;">​</a></h3><h4 id="在-java-中使用-zookeeper" tabindex="-1">在 Java 中使用 ZooKeeper <a class="header-anchor" href="#在-java-中使用-zookeeper" aria-label="Permalink to &quot;在 Java 中使用 ZooKeeper&quot;">​</a></h4><p>通过上面的介绍，我们大致了解了比较流行的开源框架是如何利用 ZooKeeper 解决自身问题的。接下来我们学习如何在自己的项目中使用 ZooKeeper。这里我们以比较流行的 springboot 框架为例。如下面代码所示，要想在 SpringBoot 框架中使用 ZooKeeper，首先要在工程的 pom 文件中引入对应的包。</p><p>我们在 dependency 引用配置中添加了版本为 3.6.1 的 org.apache.zookeeper 开发包。通过这个配置，我们的工程就可以使用 ZooKeeper 的相关功能了。</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">dependency</span><span style="color:#E1E4E8;">&gt; </span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#79B8FF;">groupId</span><span style="color:#E1E4E8;">&gt;org.apache.zookeeper&lt;/</span><span style="color:#79B8FF;">groupId</span><span style="color:#E1E4E8;">&gt; </span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#79B8FF;">artifactId</span><span style="color:#E1E4E8;">&gt;zookeeper&lt;/</span><span style="color:#79B8FF;">artifactId</span><span style="color:#E1E4E8;">&gt;   </span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">version</span><span style="color:#E1E4E8;">&gt;3.6.1&lt;/</span><span style="color:#85E89D;">version</span><span style="color:#E1E4E8;">&gt; </span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">dependency</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">dependency</span><span style="color:#24292E;">&gt; </span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#005CC5;">groupId</span><span style="color:#24292E;">&gt;org.apache.zookeeper&lt;/</span><span style="color:#005CC5;">groupId</span><span style="color:#24292E;">&gt; </span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#005CC5;">artifactId</span><span style="color:#24292E;">&gt;zookeeper&lt;/</span><span style="color:#005CC5;">artifactId</span><span style="color:#24292E;">&gt;   </span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">version</span><span style="color:#24292E;">&gt;3.6.1&lt;/</span><span style="color:#22863A;">version</span><span style="color:#24292E;">&gt; </span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">dependency</span><span style="color:#24292E;">&gt;</span></span></code></pre></div><p>在项目开发 ZooKeeper 服务的时候，往往都会编写大量 ZooKeeper 客户端代码，去请求 ZooKeeper 服务端来完成相关的业务处理。而 ZooKeeper 自带的客户端使用起来不是很便利。之前我们学习过 Curator 框架，该框架被誉为 ZooKeeper 客户端中的瑞士军刀。利用该框架可以大大提高我们开发 ZooKeeper 服务的效率，因此，在项目开发中也推荐你来使用。</p><p>与上面介绍的相同，要想在项目中使用 Curator，首先需要将 Curator 引入到项目中，如下图所示，我们通过在 pom 文件中添加 dependency 来完成。首先，在配置中添加 4.0.0 版本的 org.apache.curator 包，其中包含了 Curator 的基础功能。之后添加的 curator-recipes 包，其中包括了重入锁、读写锁、Leader 选举设置等高级操作功能。把这三个包引用到工程后，整个 springboot 工程就可以利用 ZooKeeper 进行开发了。</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;"> &lt;</span><span style="color:#85E89D;">dependency</span><span style="color:#E1E4E8;">&gt; </span></span>
<span class="line"><span style="color:#E1E4E8;">   &lt;</span><span style="color:#79B8FF;">groupId</span><span style="color:#E1E4E8;">&gt;org.apache.curator&lt;/</span><span style="color:#79B8FF;">groupId</span><span style="color:#E1E4E8;">&gt; </span></span>
<span class="line"><span style="color:#E1E4E8;">   &lt;</span><span style="color:#79B8FF;">artifactId</span><span style="color:#E1E4E8;">&gt;curator-framework&lt;/</span><span style="color:#79B8FF;">artifactId</span><span style="color:#E1E4E8;">&gt; </span></span>
<span class="line"><span style="color:#E1E4E8;">   &lt;</span><span style="color:#85E89D;">version</span><span style="color:#E1E4E8;">&gt;4.0.0&lt;/</span><span style="color:#85E89D;">version</span><span style="color:#E1E4E8;">&gt; </span></span>
<span class="line"><span style="color:#E1E4E8;">   &lt;/</span><span style="color:#85E89D;">dependency</span><span style="color:#E1E4E8;">&gt; </span></span>
<span class="line"><span style="color:#E1E4E8;"> &lt;</span><span style="color:#85E89D;">dependency</span><span style="color:#E1E4E8;">&gt; </span></span>
<span class="line"><span style="color:#E1E4E8;"> &lt;</span><span style="color:#85E89D;">dependency</span><span style="color:#E1E4E8;">&gt; </span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#79B8FF;">groupId</span><span style="color:#E1E4E8;">&gt;org.apache.curator&lt;/</span><span style="color:#79B8FF;">groupId</span><span style="color:#E1E4E8;">&gt; </span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#79B8FF;">artifactId</span><span style="color:#E1E4E8;">&gt;curator-recipes&lt;/</span><span style="color:#79B8FF;">artifactId</span><span style="color:#E1E4E8;">&gt; </span></span>
<span class="line"><span style="color:#E1E4E8;">     &lt;</span><span style="color:#85E89D;">version</span><span style="color:#E1E4E8;">&gt;4.0.0&lt;/</span><span style="color:#85E89D;">version</span><span style="color:#E1E4E8;">&gt; </span></span>
<span class="line"><span style="color:#E1E4E8;"> &lt;/</span><span style="color:#85E89D;">dependency</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;"> &lt;</span><span style="color:#22863A;">dependency</span><span style="color:#24292E;">&gt; </span></span>
<span class="line"><span style="color:#24292E;">   &lt;</span><span style="color:#005CC5;">groupId</span><span style="color:#24292E;">&gt;org.apache.curator&lt;/</span><span style="color:#005CC5;">groupId</span><span style="color:#24292E;">&gt; </span></span>
<span class="line"><span style="color:#24292E;">   &lt;</span><span style="color:#005CC5;">artifactId</span><span style="color:#24292E;">&gt;curator-framework&lt;/</span><span style="color:#005CC5;">artifactId</span><span style="color:#24292E;">&gt; </span></span>
<span class="line"><span style="color:#24292E;">   &lt;</span><span style="color:#22863A;">version</span><span style="color:#24292E;">&gt;4.0.0&lt;/</span><span style="color:#22863A;">version</span><span style="color:#24292E;">&gt; </span></span>
<span class="line"><span style="color:#24292E;">   &lt;/</span><span style="color:#22863A;">dependency</span><span style="color:#24292E;">&gt; </span></span>
<span class="line"><span style="color:#24292E;"> &lt;</span><span style="color:#22863A;">dependency</span><span style="color:#24292E;">&gt; </span></span>
<span class="line"><span style="color:#24292E;"> &lt;</span><span style="color:#22863A;">dependency</span><span style="color:#24292E;">&gt; </span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#005CC5;">groupId</span><span style="color:#24292E;">&gt;org.apache.curator&lt;/</span><span style="color:#005CC5;">groupId</span><span style="color:#24292E;">&gt; </span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#005CC5;">artifactId</span><span style="color:#24292E;">&gt;curator-recipes&lt;/</span><span style="color:#005CC5;">artifactId</span><span style="color:#24292E;">&gt; </span></span>
<span class="line"><span style="color:#24292E;">     &lt;</span><span style="color:#22863A;">version</span><span style="color:#24292E;">&gt;4.0.0&lt;/</span><span style="color:#22863A;">version</span><span style="color:#24292E;">&gt; </span></span>
<span class="line"><span style="color:#24292E;"> &lt;/</span><span style="color:#22863A;">dependency</span><span style="color:#24292E;">&gt;</span></span></code></pre></div><h4 id="在-python-中使用-zookeeper" tabindex="-1">在 Python 中使用 ZooKeeper <a class="header-anchor" href="#在-python-中使用-zookeeper" aria-label="Permalink to &quot;在 Python 中使用 ZooKeeper&quot;">​</a></h4><p>Python 作为一门跨平台开发语言，在数据科学、微服务、服务端开发中都有很广泛的应用。可能很多开发者是使用 Python 来进行业务开发的，下面我们介绍一下在 Python 项目中如何使用 ZooKeeper 服务。要想在 Python 中使用 ZooKeeper 服务，我们首先要在 Python 的运行环境中安装 kazoo 包。</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">pip install kazoo</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">pip install kazoo</span></span></code></pre></div><h4 id="连接-zookeeper-服务器" tabindex="-1">连接 ZooKeeper 服务器 <a class="header-anchor" href="#连接-zookeeper-服务器" aria-label="Permalink to &quot;连接 ZooKeeper 服务器&quot;">​</a></h4><p>安装完 kazoo 包后，我们可以着手在 Python 项目中使用 ZooKeeper 服务了。首先连接 ZooKeeper 服务器，如下面的代码所示，在代码中引入 KazooClient 包，它的作用和上面介绍的 Curator 一样，主要提供 ZooKeeper 客户端的操作功能。之后调用 KazooClient 函数并传入服务器地址来创建服务器连接会话，再调用 create 函数来创建数据节点。</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">from kazoo.client </span><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> KazooClient </span></span>
<span class="line"><span style="color:#E1E4E8;">zk = KazooClient(hosts=</span><span style="color:#9ECBFF;">&#39;127.0.0.1:2181&#39;</span><span style="color:#E1E4E8;">) </span></span>
<span class="line"><span style="color:#E1E4E8;">zk.start() </span></span>
<span class="line"><span style="color:#E1E4E8;">zk.create(</span><span style="color:#9ECBFF;">&quot;/pyzk/study/node&quot;</span><span style="color:#E1E4E8;">, b</span><span style="color:#9ECBFF;">&quot;a value&quot;</span><span style="color:#E1E4E8;">)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">from kazoo.client </span><span style="color:#D73A49;">import</span><span style="color:#24292E;"> KazooClient </span></span>
<span class="line"><span style="color:#24292E;">zk = KazooClient(hosts=</span><span style="color:#032F62;">&#39;127.0.0.1:2181&#39;</span><span style="color:#24292E;">) </span></span>
<span class="line"><span style="color:#24292E;">zk.start() </span></span>
<span class="line"><span style="color:#24292E;">zk.create(</span><span style="color:#032F62;">&quot;/pyzk/study/node&quot;</span><span style="color:#24292E;">, b</span><span style="color:#032F62;">&quot;a value&quot;</span><span style="color:#24292E;">)</span></span></code></pre></div><p>在日常开发工作中，无论是在 SpringBoot 框架下使用 Java 语言开发项目，还是使用 Pyhton 语言进行开发，使用 ZooKeeper 服务的方式基本一样，都是先要引入相关的 ZooKeeper 包，之后调用相关的客户端函数来完成业务相关的创建工作。</p><h3 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h3><p>本课时我们主要介绍了 ZooKeeper 在开源框架中的使用情况，其中，我们重点讲解了 Kafka 框架和 Dubbo 框架。Kafka 作为一个开源的分布式消息服务，会利用 ZooKeeper 实现对集群 Broker 服务器的运行情况统计等。而 Dubbo 则会利用 ZooKeeper 实现一个注册机制，以保证服务的透明性。</p><p>在实际的生产中 ZooKeeper 还能解决很多其他的问题，而这些问题本质上都是围绕分布式环境下一致性、可用性和分区容错性这三个分布式环境问题产生的。</p><p>这里给你留一个作业：试着使用 ZooKeeper 来解决在你在工作中遇到的问题，并尝试提升系统的安全性和稳定性。</p>`,22);function _(f,C,Z,m,v,z){const o=l("Image");return t(),r("div",null,[i,e(o,{alt:"1.png",src:"https://s0.lgstatic.com/i/image/M00/37/B6/Ciqc1F8ah0qASFC-AAELMLv7sPQ672.png"}),a(),E,y,d,e(o,{alt:"2.png",src:"https://s0.lgstatic.com/i/image/M00/37/B6/Ciqc1F8ah1WAW9KEAAIW9hNPw3Y360.png"}),a(),g,k,e(o,{alt:"3.png",src:"https://s0.lgstatic.com/i/image/M00/37/C1/CgqCHl8ah16Ac117AAKJOqYuJ28381.png"}),a(),u,h,e(o,{alt:"4.png",src:"https://s0.lgstatic.com/i/image/M00/37/B6/Ciqc1F8ah26APMkMAAH5xDJ2qz0508.png"}),a(),b,e(o,{alt:"5.png",src:"https://s0.lgstatic.com/i/image/M00/37/C1/CgqCHl8ah3iASZ2-AAEGN0oprwQ428.png"}),a(),K])}const B=n(c,[["render",_]]);export{D as __pageData,B as default};
