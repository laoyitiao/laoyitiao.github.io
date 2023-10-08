import{_ as o,j as l,o as r,g as c,k as e,h as n,Q as p,s}from"./chunks/framework.4e7d56ce.js";const A=JSON.parse('{"title":"第19讲：Oberver的作用与Follow有哪些不同？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/ZooKeeper源码分析与实战_文档/(3149) 第19讲：Oberver 的作用与 Follow 有哪些不同？.md","filePath":"posts/backEnd/ZooKeeper源码分析与实战_文档/(3149) 第19讲：Oberver 的作用与 Follow 有哪些不同？.md","lastUpdated":1696682708000}'),t={name:"posts/backEnd/ZooKeeper源码分析与实战_文档/(3149) 第19讲：Oberver 的作用与 Follow 有哪些不同？.md"},E=p('<h1 id="第19讲-oberver的作用与follow有哪些不同" tabindex="-1">第19讲：Oberver的作用与Follow有哪些不同？ <a class="header-anchor" href="#第19讲-oberver的作用与follow有哪些不同" aria-label="Permalink to &quot;第19讲：Oberver的作用与Follow有哪些不同？&quot;">​</a></h1><p>在上个课时中，我们学习了 ZooKeeper 集群中 Follow 服务器的作用。在 ZooKeeper 集群服务运行的过程中，Follow 服务器主要负责处理来自客户端的非事务性请求，其中大部分是处理客户端发起的查询会话等请求。而在 ZooKeeper 集群中，Leader 服务器失效时，会在 Follow 集群服务器之间发起投票，最终选举出一个 Follow 服务器作为新的 Leader 服务器。</p><p>除了 Leader 和 Follow 服务器，ZooKeeper 集群中还有一个 Observer 服务器。在 ZooKeeper 集群中，Observer 服务器对于提升整个 ZooKeeper 集群运行的性能具有至关重要的作用。而本课时，我们就开始学习什么是 Observer 服务器，以及它在 ZooKeeper 集群中都做了哪些工作。</p><h3 id="observer-介绍" tabindex="-1">Observer 介绍 <a class="header-anchor" href="#observer-介绍" aria-label="Permalink to &quot;Observer 介绍&quot;">​</a></h3><p>在 ZooKeeper 集群服务运行的过程中，Observer 服务器与 Follow 服务器具有一个相同的功能，那就是负责处理来自客户端的诸如查询数据节点等非事务性的会话请求操作。但与 Follow 服务器不同的是，<strong>Observer 不参与 Leader 服务器的选举工作，也不会被选举为 Leader 服务器</strong>。</p><p>在前面的课程中，我们或多或少有涉及 Observer 服务器，当时我们把 Follow 服务器和 Observer 服务器统称为 Learner 服务器。你可能会觉得疑惑，Observer 服务器做的事情几乎和 Follow 服务器一样，那么为什么 ZooKeeper 还要创建一个 Observer 角色服务器呢？</p><p>要想解释这个问题，就要从 ZooKeeper 技术的发展过程说起，最早的 ZooKeeper 框架如下图所示，可以看到，其中是不存在 Observer 服务器的。</p>',7),y=s("p",null,"在早期的 ZooKeeper 集群服务运行过程中，只有 Leader 服务器和 Follow 服务器。不过随着 ZooKeeper 在分布式环境下的广泛应用，早期模式的设计缺点也随之产生，主要带来的问题有如下几点：",-1),i=s("ol",null,[s("li",null,[s("p",null,"随着集群规模的变大，集群处理写入的性能反而下降。")]),s("li",null,[s("p",null,"ZooKeeper 集群无法做到跨域部署")])],-1),d=s("p",null,"其中最主要的问题在于，当 ZooKeeper 集群的规模变大，集群中 Follow 服务器数量逐渐增多的时候，ZooKeeper 处理创建数据节点等事务性请求操作的性能就会逐渐下降。这是因为 ZooKeeper 集群在处理事务性请求操作时，要在 ZooKeeper 集群中对该事务性的请求发起投票，只有超过半数的 Follow 服务器投票一致，才会执行该条写入操作。",-1),u=s("p",null,"正因如此，随着集群中 Follow 服务器的数量越来越多，一次写入等相关操作的投票也就变得越来越复杂，并且 Follow 服务器之间彼此的网络通信也变得越来越耗时，导致随着 Follow 服务器数量的逐步增加，事务性的处理性能反而变得越来越低。",-1),F=s("p",null,"为了解决这一问题，在 ZooKeeper 3.6 版本后，ZooKeeper 集群中创建了一种新的服务器角色，即 Observer------观察者角色服务器。Observer 可以处理 ZooKeeper 集群中的非事务性请求，并且不参与 Leader 节点等投票相关的操作。这样既保证了 ZooKeeper 集群性能的扩展性，又避免了因为过多的服务器参与投票相关的操作而影响 ZooKeeper 集群处理事务性会话请求的能力。",-1),b=s("p",null,"在引入 Observer 角色服务器后，一个 ZooKeeper 集群服务在部署的拓扑结构，如下图所示：",-1),v=p(`<p>在实际部署的时候，因为 Observer 不参与 Leader 节点等操作，并不会像 Follow 服务器那样频繁的与 Leader 服务器进行通信。因此，可以将 Observer 服务器部署在不同的网络区间中，这样也不会影响整个 ZooKeeper 集群的性能，也就是所谓的跨域部署。</p><h3 id="底层实现" tabindex="-1">底层实现 <a class="header-anchor" href="#底层实现" aria-label="Permalink to &quot;底层实现&quot;">​</a></h3><p>介绍完 Observer 的作用和原理后，接下来我们再从底层代码的角度去分析一下 ZooKeeper 是如何实现一个 Observer 服务器的。</p><p>首先，在我们平时开发 ZooKeeper 服务的时候，如果想让某个服务器以 Observer 角色运行，需要在该服务器的运行配置文件 zoo.cfg 文件中添加 peerType 属性。如下面的代码所示，将该服务器的 peerType 属性设置为 observer 。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">peerType</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">observer</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">peerType</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">observer</span></span></code></pre></div><p>而当 ZooKeeper 集群服务开始运行的时候，首先调用 ObserverZooKeeperServer 类，来实例化 ZooKeeper 集群中每个 Observer 服务器，并初始化调用链等相关操作。如下面的代码所示：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">ObserverZooKeeperServer</span><span style="color:#E1E4E8;">(FileTxnSnapLog logFactory, QuorumPeer self, ZKDatabase zkDb) throws IOException {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">super</span><span style="color:#E1E4E8;">(logFactory, self.tickTime, self.minSessionTimeout, self.maxSessionTimeout, zkDb, self);</span></span>
<span class="line"><span style="color:#E1E4E8;">    LOG.</span><span style="color:#B392F0;">info</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;syncEnabled =&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> syncRequestProcessorEnabled);</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">ObserverZooKeeperServer</span><span style="color:#24292E;">(FileTxnSnapLog logFactory, QuorumPeer self, ZKDatabase zkDb) throws IOException {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">super</span><span style="color:#24292E;">(logFactory, self.tickTime, self.minSessionTimeout, self.maxSessionTimeout, zkDb, self);</span></span>
<span class="line"><span style="color:#24292E;">    LOG.</span><span style="color:#6F42C1;">info</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;syncEnabled =&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> syncRequestProcessorEnabled);</span></span></code></pre></div><p>而在 ObserverZooKeeperServer 类的 commitRequest 函数中，就设置了与 Follow 角色不同的实现方式。如下面的代码所示，Observer 不会接收网络中的 Proposal 请求，不会像 Follow 一样，在 Proposal 阶段就获得 Leader 服务器发送的变更数据。Observer 服务器是从 INFORM 数据包中获得变更的数据，在 commitRequest 函数的内部实现中，提交执行来自 INFORM 数据包中的事务操作。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">commitRequest</span><span style="color:#E1E4E8;">(Request request) {     </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (syncRequestProcessorEnabled) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// Write to txnlog and take periodic snapshot</span></span>
<span class="line"><span style="color:#E1E4E8;">        syncProcessor.</span><span style="color:#B392F0;">processRequest</span><span style="color:#E1E4E8;">(request);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    commitProcessor.</span><span style="color:#B392F0;">commit</span><span style="color:#E1E4E8;">(request);</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">commitRequest</span><span style="color:#24292E;">(Request request) {     </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (syncRequestProcessorEnabled) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// Write to txnlog and take periodic snapshot</span></span>
<span class="line"><span style="color:#24292E;">        syncProcessor.</span><span style="color:#6F42C1;">processRequest</span><span style="color:#24292E;">(request);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    commitProcessor.</span><span style="color:#6F42C1;">commit</span><span style="color:#24292E;">(request);</span></span></code></pre></div><h3 id="inform-消息" tabindex="-1">INFORM 消息 <a class="header-anchor" href="#inform-消息" aria-label="Permalink to &quot;INFORM 消息&quot;">​</a></h3><p>了解 Observer 服务器的底层实现过程后，我们再来介绍一下 INFORM 消息。Observer 不会接收来自 Leader 服务器提交的投票请求，且不会接收网络中的 Proposal 请求信息，只会从网络中接收 INFORM 类型的信息包。</p><p>而 INFORM 信息的内部只包含已经被 Cmmit 操作过的投票信息，因为 Observer 服务器只接收已经被提交处理的 Proposal 请求，不会接收未被提交的会话请求。这样就从底层信息的角度隔离了 Observer 参与投票操作，进而使 Observer 只负责查询等相关非事务性操作，保证扩展多个 Observer 服务器时不会对 ZooKeeper 集群写入操作的性能产生影响。</p><h3 id="observer-处理链" tabindex="-1">Observer 处理链 <a class="header-anchor" href="#observer-处理链" aria-label="Permalink to &quot;Observer 处理链&quot;">​</a></h3><p>接下来，我们再来看一下 Observer 服务器处理一次会话请求的底层实现过程。与 Leader 和 Follow 服务器一样，在处理一条来自客户单的会话请求时， Observer 同样采用的是处理链的设计方式。在这个 Observer 处理链上，主要定义了三个处理器，处理器的执行顺序分别是 ObserverRequestProcessor 处理器、CommitProcessor 处理器以及 FinalRequestProcessor 处理器。</p><p>在 ObserverRequestProcessor 处理器中，首先判断客户端请求的会话类型，将所有事务性的会话请求交给 Leader 服务器处理，如下面的代码所示。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">run</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">try</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">while</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">!</span><span style="color:#E1E4E8;">finished) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                Request request </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> queuedRequests.</span><span style="color:#B392F0;">take</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">               	...</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#F97583;">switch</span><span style="color:#E1E4E8;"> (request.type) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#F97583;">case</span><span style="color:#E1E4E8;"> OpCode.sync</span><span style="color:#F97583;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">                    zks.pendingSyncs.</span><span style="color:#B392F0;">add</span><span style="color:#E1E4E8;">(request);</span></span>
<span class="line"><span style="color:#E1E4E8;">                    zks.</span><span style="color:#B392F0;">getObserver</span><span style="color:#E1E4E8;">().</span><span style="color:#B392F0;">request</span><span style="color:#E1E4E8;">(request);</span></span>
<span class="line"><span style="color:#E1E4E8;">                    </span><span style="color:#F97583;">break</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#F97583;">case</span><span style="color:#E1E4E8;"> OpCode.create</span><span style="color:#F97583;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#F97583;">case</span><span style="color:#E1E4E8;"> OpCode.create2</span><span style="color:#F97583;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#F97583;">case</span><span style="color:#E1E4E8;"> OpCode.createTTL</span><span style="color:#F97583;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#F97583;">case</span><span style="color:#E1E4E8;"> OpCode.createContainer</span><span style="color:#F97583;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#F97583;">case</span><span style="color:#E1E4E8;"> OpCode.delete</span><span style="color:#F97583;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#F97583;">case</span><span style="color:#E1E4E8;"> OpCode.deleteContainer</span><span style="color:#F97583;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#F97583;">case</span><span style="color:#E1E4E8;"> OpCode.setData</span><span style="color:#F97583;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#F97583;">case</span><span style="color:#E1E4E8;"> OpCode.reconfig</span><span style="color:#F97583;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#F97583;">case</span><span style="color:#E1E4E8;"> OpCode.setACL</span><span style="color:#F97583;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#F97583;">case</span><span style="color:#E1E4E8;"> OpCode.multi</span><span style="color:#F97583;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#F97583;">case</span><span style="color:#E1E4E8;"> OpCode.check</span><span style="color:#F97583;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">                    zks.</span><span style="color:#B392F0;">getObserver</span><span style="color:#E1E4E8;">().</span><span style="color:#B392F0;">request</span><span style="color:#E1E4E8;">(request);</span></span>
<span class="line"><span style="color:#E1E4E8;">                    </span><span style="color:#F97583;">break</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">               	...</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">        } </span></span>
<span class="line"><span style="color:#E1E4E8;">        ...</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">run</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">try</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">while</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">!</span><span style="color:#24292E;">finished) {</span></span>
<span class="line"><span style="color:#24292E;">                Request request </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> queuedRequests.</span><span style="color:#6F42C1;">take</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">               	...</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#D73A49;">switch</span><span style="color:#24292E;"> (request.type) {</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#D73A49;">case</span><span style="color:#24292E;"> OpCode.sync</span><span style="color:#D73A49;">:</span></span>
<span class="line"><span style="color:#24292E;">                    zks.pendingSyncs.</span><span style="color:#6F42C1;">add</span><span style="color:#24292E;">(request);</span></span>
<span class="line"><span style="color:#24292E;">                    zks.</span><span style="color:#6F42C1;">getObserver</span><span style="color:#24292E;">().</span><span style="color:#6F42C1;">request</span><span style="color:#24292E;">(request);</span></span>
<span class="line"><span style="color:#24292E;">                    </span><span style="color:#D73A49;">break</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#D73A49;">case</span><span style="color:#24292E;"> OpCode.create</span><span style="color:#D73A49;">:</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#D73A49;">case</span><span style="color:#24292E;"> OpCode.create2</span><span style="color:#D73A49;">:</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#D73A49;">case</span><span style="color:#24292E;"> OpCode.createTTL</span><span style="color:#D73A49;">:</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#D73A49;">case</span><span style="color:#24292E;"> OpCode.createContainer</span><span style="color:#D73A49;">:</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#D73A49;">case</span><span style="color:#24292E;"> OpCode.delete</span><span style="color:#D73A49;">:</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#D73A49;">case</span><span style="color:#24292E;"> OpCode.deleteContainer</span><span style="color:#D73A49;">:</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#D73A49;">case</span><span style="color:#24292E;"> OpCode.setData</span><span style="color:#D73A49;">:</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#D73A49;">case</span><span style="color:#24292E;"> OpCode.reconfig</span><span style="color:#D73A49;">:</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#D73A49;">case</span><span style="color:#24292E;"> OpCode.setACL</span><span style="color:#D73A49;">:</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#D73A49;">case</span><span style="color:#24292E;"> OpCode.multi</span><span style="color:#D73A49;">:</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#D73A49;">case</span><span style="color:#24292E;"> OpCode.check</span><span style="color:#D73A49;">:</span></span>
<span class="line"><span style="color:#24292E;">                    zks.</span><span style="color:#6F42C1;">getObserver</span><span style="color:#24292E;">().</span><span style="color:#6F42C1;">request</span><span style="color:#24292E;">(request);</span></span>
<span class="line"><span style="color:#24292E;">                    </span><span style="color:#D73A49;">break</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">               	...</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">        } </span></span>
<span class="line"><span style="color:#24292E;">        ...</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>之后调用 CommitProcessor 处理器，将该条会话放入到 queuedRequests 请求等待队列中。并唤醒相关线程进行会话处理。queuedRequests 队列实现了 BlockingQueue 阻塞队列：<strong>当 queuedRequests 队列容器已满，生产者线程会被阻塞，直到队列未满；当队列容器为空时，消费者线程会被阻塞，直至队列非空时为止。</strong> 这就形成了一个消费者---生产者模式的处理方式。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">processRequest</span><span style="color:#E1E4E8;">(Request request) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (stopped) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (LOG.</span><span style="color:#B392F0;">isDebugEnabled</span><span style="color:#E1E4E8;">()) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        LOG.</span><span style="color:#B392F0;">debug</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;Processing request:: &quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> request);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    queuedRequests.</span><span style="color:#B392F0;">add</span><span style="color:#E1E4E8;">(request);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">wakeup</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">processRequest</span><span style="color:#24292E;">(Request request) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (stopped) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (LOG.</span><span style="color:#6F42C1;">isDebugEnabled</span><span style="color:#24292E;">()) {</span></span>
<span class="line"><span style="color:#24292E;">        LOG.</span><span style="color:#6F42C1;">debug</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;Processing request:: &quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> request);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    queuedRequests.</span><span style="color:#6F42C1;">add</span><span style="color:#24292E;">(request);</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">wakeup</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>在将会话请求放入到等待处理队列后，CommitProcessor 处理器的 run 方法从该队列中取出要处理的会话请求，然后解析会话请求中的请求服务器 zxid、请求事务信息 txn、请求头信息 hdr 等，并封装成 requeset 对象，然后传递给下一个处理器 FinalRequestProcessor。FinalRequestProcessor 处理器中会根据请求的类型，最终执行相关的操作。</p><h3 id="结束" tabindex="-1">结束 <a class="header-anchor" href="#结束" aria-label="Permalink to &quot;结束&quot;">​</a></h3><p>本课时我们学习了在 ZooKeeper 集群服务运行过程中 Observer 服务器的作用和功能。</p><p>与 Follow 服务器一样，他们都可以处理 ZooKeeper 集群中的非事务性会话请求，不同之处在于，Observer 不参与 ZooKeeper 集群中 Leader 服务器的选举以及事务性会话处理的投票工作。</p><p>这里给你留一个思考题：利用 Observer 服务器的这一特性，在平时的生产环境中，我们可以采用什么样的方式，来提高 ZooKeeper 集群服务的性能呢？所谓的跨域部署最常见的就是将 ZooKeeper 集群中的物理机器部署在不同的地域或机房中。</p>`,23);function h(O,q,g,_,C,m){const a=l("Image");return r(),c("div",null,[E,e(a,{alt:"image (3).png",src:"https://s0.lgstatic.com/i/image/M00/2E/C9/Ciqc1F8FnKWAQEJJAADU9xFvIIU685.png"}),n(),y,i,d,u,F,b,e(a,{alt:"image (4).png",src:"https://s0.lgstatic.com/i/image/M00/2E/C9/Ciqc1F8FnLGAKhD0AAE5oGBLTTQ439.png"}),n(),v])}const k=o(t,[["render",h]]);export{A as __pageData,k as default};
