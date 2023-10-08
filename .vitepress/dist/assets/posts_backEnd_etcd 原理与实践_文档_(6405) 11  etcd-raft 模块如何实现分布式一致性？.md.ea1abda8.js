import{_ as l,j as e,o as t,g as r,k as n,h as s,Q as p,s as o}from"./chunks/framework.a0d18f64.js";const C=JSON.parse('{"title":"11etcd-raft模块如何实现分布式一致性？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/etcd 原理与实践_文档/(6405) 11  etcd-raft 模块如何实现分布式一致性？.md","filePath":"posts/backEnd/etcd 原理与实践_文档/(6405) 11  etcd-raft 模块如何实现分布式一致性？.md","lastUpdated":1696682708000}'),c={name:"posts/backEnd/etcd 原理与实践_文档/(6405) 11  etcd-raft 模块如何实现分布式一致性？.md"},E=p(`<h1 id="_11etcd-raft模块如何实现分布式一致性" tabindex="-1">11etcd-raft模块如何实现分布式一致性？ <a class="header-anchor" href="#_11etcd-raft模块如何实现分布式一致性" aria-label="Permalink to &quot;11etcd-raft模块如何实现分布式一致性？&quot;">​</a></h1><p>上一讲我们介绍了etcd 读写操作的底层实现，但关于 etcd 集群如何实现分布式数据一致性并没有详细介绍。在分布式环境中，常用<strong>数据复制</strong>来避免单点故障，实现多副本，提高服务的高可用性以及系统的吞吐量。</p><p>etcd 集群中的多个节点不可避免地会出现相互之间数据不一致的情况。但不管是同步复制、异步复制还是半同步复制，都会存在可用性或者一致性的问题。我们一般会使用<strong>共识算法</strong>来解决多个节点数据一致性的问题，常见的共识算法有 Paxos和Raft。ZooKeeper 使用的是 ZAB 协议，etcd 使用的共识算法就是Raft。</p><p>etcd-raft 模块是 etcd中解决分布式一致性的模块，这一讲我们就结合源码具体分析这部分内容。</p><h3 id="etcdraft-对外提供的接口" tabindex="-1">etcdraft 对外提供的接口 <a class="header-anchor" href="#etcdraft-对外提供的接口" aria-label="Permalink to &quot;etcdraft 对外提供的接口&quot;">​</a></h3><p>raft 库对外提供了一个 Node 接口，由 raft/node.go 中的 node结构体实现，Node 接口需要实现的函数包括：Tick、Propose、Ready、Step 等。</p><p>我们重点需要了解 Ready 接口，该接口将返回类型为 Ready 的 channel，该通道表示当前时间点的channel。应用层需要关注该 channel，当发生变更时，其中的数据也将会进行相应的操作。其他的函数对应的功能如下：</p><ul><li><p>Tick：时钟，触发选举或者发送心跳；</p></li><li><p>Propose：通过 channel 向 raft StateMachine 提交一个 Op，提交的是本地 MsgProp 类型的消息；</p></li><li><p>Step：节点收到 Peer 节点发送的 Msg 时会通过该接口提交给 raft 状态机，Step 接口通过 recvc channel向raft StateMachine 传递 Msg；</p></li></ul><p>然后是 raft 算法的实现，node 结构体实现了 Node 接口，其定义如下：</p><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">type</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">node</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">struct</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">propc      </span><span style="color:#F97583;">chan</span><span style="color:#E1E4E8;"> msgWithResult</span></span>
<span class="line"><span style="color:#E1E4E8;">recvc      </span><span style="color:#F97583;">chan</span><span style="color:#E1E4E8;"> pb.Message</span></span>
<span class="line"><span style="color:#E1E4E8;">confc      </span><span style="color:#F97583;">chan</span><span style="color:#E1E4E8;"> pb.ConfChangeV2</span></span>
<span class="line"><span style="color:#E1E4E8;">confstatec </span><span style="color:#F97583;">chan</span><span style="color:#E1E4E8;"> pb.ConfState</span></span>
<span class="line"><span style="color:#E1E4E8;">readyc     </span><span style="color:#F97583;">chan</span><span style="color:#E1E4E8;"> Ready</span></span>
<span class="line"><span style="color:#E1E4E8;">advancec   </span><span style="color:#F97583;">chan</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">struct</span><span style="color:#E1E4E8;">{}</span></span>
<span class="line"><span style="color:#E1E4E8;">tickc </span><span style="color:#F97583;">chan</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">struct</span><span style="color:#E1E4E8;">{}</span></span>
<span class="line"><span style="color:#E1E4E8;">done       </span><span style="color:#F97583;">chan</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">struct</span><span style="color:#E1E4E8;">{}</span></span>
<span class="line"><span style="color:#E1E4E8;">stop       </span><span style="color:#F97583;">chan</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">struct</span><span style="color:#E1E4E8;">{}</span></span>
<span class="line"><span style="color:#E1E4E8;">status     </span><span style="color:#F97583;">chan</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">chan</span><span style="color:#E1E4E8;"> Status</span></span>
<span class="line"><span style="color:#E1E4E8;">rn </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;">RawNode</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">type</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">node</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">struct</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">propc      </span><span style="color:#D73A49;">chan</span><span style="color:#24292E;"> msgWithResult</span></span>
<span class="line"><span style="color:#24292E;">recvc      </span><span style="color:#D73A49;">chan</span><span style="color:#24292E;"> pb.Message</span></span>
<span class="line"><span style="color:#24292E;">confc      </span><span style="color:#D73A49;">chan</span><span style="color:#24292E;"> pb.ConfChangeV2</span></span>
<span class="line"><span style="color:#24292E;">confstatec </span><span style="color:#D73A49;">chan</span><span style="color:#24292E;"> pb.ConfState</span></span>
<span class="line"><span style="color:#24292E;">readyc     </span><span style="color:#D73A49;">chan</span><span style="color:#24292E;"> Ready</span></span>
<span class="line"><span style="color:#24292E;">advancec   </span><span style="color:#D73A49;">chan</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">struct</span><span style="color:#24292E;">{}</span></span>
<span class="line"><span style="color:#24292E;">tickc </span><span style="color:#D73A49;">chan</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">struct</span><span style="color:#24292E;">{}</span></span>
<span class="line"><span style="color:#24292E;">done       </span><span style="color:#D73A49;">chan</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">struct</span><span style="color:#24292E;">{}</span></span>
<span class="line"><span style="color:#24292E;">stop       </span><span style="color:#D73A49;">chan</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">struct</span><span style="color:#24292E;">{}</span></span>
<span class="line"><span style="color:#24292E;">status     </span><span style="color:#D73A49;">chan</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">chan</span><span style="color:#24292E;"> Status</span></span>
<span class="line"><span style="color:#24292E;">rn </span><span style="color:#D73A49;">*</span><span style="color:#24292E;">RawNode</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>这个结构体会在后面经常用到。</p><p>在 raft/raft.go 中还有两个核心数据结构：</p><ul><li><p>Config，封装了与 raft 算法相关的配置参数，公开用于外部调用。</p></li><li><p>raft，具体实现 raft 算法的结构体。</p></li></ul><h3 id="节点状态" tabindex="-1">节点状态 <a class="header-anchor" href="#节点状态" aria-label="Permalink to &quot;节点状态&quot;">​</a></h3><p>下面我们来看看 raft StateMachine 的状态机转换，实际上就是 raft 算法中各种角色的转换。每个 raft 节点，可能具有以下三种状态中的一种。</p><ul><li><p><strong>Candidate</strong>：候选人状态，该状态意味着将进行一次新的选举。</p></li><li><p><strong>Follower</strong>：跟随者状态，该状态意味着选举结束。</p></li><li><p><strong>Leader</strong>：领导者状态，选举出来的节点，所有数据提交都必须先提交到 Leader 上。</p></li></ul><p>每一个状态都有其对应的状态机，每次收到一条提交的数据时，都会根据其不同的状态将消息输入到不同状态的状态机中。同时，在进行 tick 操作时，每种状态对应的处理函数也是不一样的。</p><p>因此 raft 结构体中将不同的状态及其不同的处理函数，独立出来几个成员变量：</p><ul><li><p>state，保存当前节点状态；</p></li><li><p>tick 函数，每个状态对应的 tick 函数不同；</p></li><li><p>step，状态机函数，同样每个状态对应的状态机也不相同。</p></li></ul><h3 id="状态转换" tabindex="-1">状态转换 <a class="header-anchor" href="#状态转换" aria-label="Permalink to &quot;状态转换&quot;">​</a></h3><p>我们接着看 etcd raft 状态转换。etcd-raft StateMachine 封装在 raft机构体中，其状态转换如下图：</p>`,21),y=p('<p>etcd raft 状态转换示意图</p><p>raft 状态转换的接口都在 raft.go 中，其定义如下：</p><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">func</span><span style="color:#E1E4E8;"> (r </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;">raft) </span><span style="color:#B392F0;">becomeFollower</span><span style="color:#E1E4E8;">(term </span><span style="color:#F97583;">uint64</span><span style="color:#E1E4E8;">, lead </span><span style="color:#F97583;">uint64</span><span style="color:#E1E4E8;">)</span></span>\n<span class="line"><span style="color:#F97583;">func</span><span style="color:#E1E4E8;"> (r </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;">raft) </span><span style="color:#B392F0;">becomePreCandidate</span><span style="color:#E1E4E8;">()</span></span>\n<span class="line"><span style="color:#F97583;">func</span><span style="color:#E1E4E8;"> (r </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;">raft) </span><span style="color:#B392F0;">becomeCandidate</span><span style="color:#E1E4E8;">()</span></span>\n<span class="line"><span style="color:#F97583;">func</span><span style="color:#E1E4E8;"> (r </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;">raft) </span><span style="color:#B392F0;">becomeLeader</span><span style="color:#E1E4E8;">()</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">func</span><span style="color:#24292E;"> (r </span><span style="color:#D73A49;">*</span><span style="color:#24292E;">raft) </span><span style="color:#6F42C1;">becomeFollower</span><span style="color:#24292E;">(term </span><span style="color:#D73A49;">uint64</span><span style="color:#24292E;">, lead </span><span style="color:#D73A49;">uint64</span><span style="color:#24292E;">)</span></span>\n<span class="line"><span style="color:#D73A49;">func</span><span style="color:#24292E;"> (r </span><span style="color:#D73A49;">*</span><span style="color:#24292E;">raft) </span><span style="color:#6F42C1;">becomePreCandidate</span><span style="color:#24292E;">()</span></span>\n<span class="line"><span style="color:#D73A49;">func</span><span style="color:#24292E;"> (r </span><span style="color:#D73A49;">*</span><span style="color:#24292E;">raft) </span><span style="color:#6F42C1;">becomeCandidate</span><span style="color:#24292E;">()</span></span>\n<span class="line"><span style="color:#D73A49;">func</span><span style="color:#24292E;"> (r </span><span style="color:#D73A49;">*</span><span style="color:#24292E;">raft) </span><span style="color:#6F42C1;">becomeLeader</span><span style="color:#24292E;">()</span></span></code></pre></div><p>raft 在不同的状态下，是如何驱动 raft StateMachine 状态机运转的呢？答案是etcd 将 raft 相关的所有处理都抽象为了 Msg，通过 Step 接口处理：</p><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">func</span><span style="color:#E1E4E8;"> (r </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;">raft) </span><span style="color:#B392F0;">Step</span><span style="color:#E1E4E8;">(m pb.Message) </span><span style="color:#F97583;">error</span><span style="color:#E1E4E8;"> {</span><span style="color:#9ECBFF;">``</span></span>\n<span class="line"><span style="color:#E1E4E8;">r.</span><span style="color:#79B8FF;">step</span><span style="color:#E1E4E8;">(r, m)</span></span>\n<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">func</span><span style="color:#24292E;"> (r </span><span style="color:#D73A49;">*</span><span style="color:#24292E;">raft) </span><span style="color:#6F42C1;">Step</span><span style="color:#24292E;">(m pb.Message) </span><span style="color:#D73A49;">error</span><span style="color:#24292E;"> {</span><span style="color:#032F62;">``</span></span>\n<span class="line"><span style="color:#24292E;">r.</span><span style="color:#005CC5;">step</span><span style="color:#24292E;">(r, m)</span></span>\n<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>这里的step是一个<strong>回调函数</strong> ，根据不同的状态会设置不同的回调函数来驱动 raft，这个回调函数 stepFunc 就是在<code>becomeXX()</code>函数完成的设置：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">type raft struct {</span></span>\n<span class="line"><span style="color:#E1E4E8;">...</span></span>\n<span class="line"><span style="color:#E1E4E8;">step stepFunc</span></span>\n<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">type raft struct {</span></span>\n<span class="line"><span style="color:#24292E;">...</span></span>\n<span class="line"><span style="color:#24292E;">step stepFunc</span></span>\n<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>step 回调函数有如下几个值，注意其中 stepCandidate 会处理 PreCandidate 和 Candidate 两种状态：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">func </span><span style="color:#B392F0;">stepFollower</span><span style="color:#E1E4E8;">(r </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;">raft, m pb.Message) error</span></span>\n<span class="line"><span style="color:#E1E4E8;">func </span><span style="color:#B392F0;">stepCandidate</span><span style="color:#E1E4E8;">(r </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;">raft, m pb.Message) error</span></span>\n<span class="line"><span style="color:#E1E4E8;">func </span><span style="color:#B392F0;">stepLeader</span><span style="color:#E1E4E8;">(r </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;">raft, m pb.Message) error</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">func </span><span style="color:#6F42C1;">stepFollower</span><span style="color:#24292E;">(r </span><span style="color:#D73A49;">*</span><span style="color:#24292E;">raft, m pb.Message) error</span></span>\n<span class="line"><span style="color:#24292E;">func </span><span style="color:#6F42C1;">stepCandidate</span><span style="color:#24292E;">(r </span><span style="color:#D73A49;">*</span><span style="color:#24292E;">raft, m pb.Message) error</span></span>\n<span class="line"><span style="color:#24292E;">func </span><span style="color:#6F42C1;">stepLeader</span><span style="color:#24292E;">(r </span><span style="color:#D73A49;">*</span><span style="color:#24292E;">raft, m pb.Message) error</span></span></code></pre></div><p>这几个函数的实现其实就是对各种 Msg 进行处理，这里就不详细展开了。我们来看一下 raft 消息的类型及其定义。</p><h4 id="raft-消息" tabindex="-1">raft 消息 <a class="header-anchor" href="#raft-消息" aria-label="Permalink to &quot;raft 消息&quot;">​</a></h4><p><strong>raft 算法本质上是一个大的状态机</strong>，任何的操作例如选举、提交数据等，最后都被封装成一个消息结构体，输入到 raft 算法库的状态机中。</p><p>在 raft/raftpb/raft.proto 文件中，定义了 raft 算法中传输消息的结构体。raft 算法其实由好几个协议组成，etcd-raft 将其统一定义在了 Message 结构体之中，以下总结了该结构体的成员用途：</p><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// 位于 raft/raftpb/raft.pb.go:295</span></span>\n<span class="line"><span style="color:#F97583;">type</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Message</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">struct</span><span style="color:#E1E4E8;"> {</span></span>\n<span class="line"><span style="color:#E1E4E8;">Type             MessageType </span><span style="color:#9ECBFF;">`protobuf:&quot;varint,1,opt,name=type,enum=raftpb.MessageType&quot; json:&quot;type&quot;`</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">// 消息类型</span></span>\n<span class="line"><span style="color:#E1E4E8;">To               </span><span style="color:#F97583;">uint64</span><span style="color:#E1E4E8;">      </span><span style="color:#9ECBFF;">`protobuf:&quot;varint,2,opt,name=to&quot; json:&quot;to&quot;`</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">// 消息接收者的节点ID</span></span>\n<span class="line"><span style="color:#E1E4E8;">From             </span><span style="color:#F97583;">uint64</span><span style="color:#E1E4E8;">      </span><span style="color:#9ECBFF;">`protobuf:&quot;varint,3,opt,name=from&quot; json:&quot;from&quot;`</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">// 消息发送者的节点 ID</span></span>\n<span class="line"><span style="color:#E1E4E8;">Term             </span><span style="color:#F97583;">uint64</span><span style="color:#E1E4E8;">      </span><span style="color:#9ECBFF;">`protobuf:&quot;varint,4,opt,name=term&quot; json:&quot;term&quot;`</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">// 任期 ID</span></span>\n<span class="line"><span style="color:#E1E4E8;">LogTerm          </span><span style="color:#F97583;">uint64</span><span style="color:#E1E4E8;">      </span><span style="color:#9ECBFF;">`protobuf:&quot;varint,5,opt,name=logTerm&quot; json:&quot;logTerm&quot;`</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">// 日志所处的任期 ID</span></span>\n<span class="line"><span style="color:#E1E4E8;">Index            </span><span style="color:#F97583;">uint64</span><span style="color:#E1E4E8;">      </span><span style="color:#9ECBFF;">`protobuf:&quot;varint,6,opt,name=index&quot; json:&quot;index&quot;`</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">// 日志索引 ID，用于节点向 Leader 汇报自己已经commit的日志数据 ID</span></span>\n<span class="line"><span style="color:#E1E4E8;">Entries          []Entry     </span><span style="color:#9ECBFF;">`protobuf:&quot;bytes,7,rep,name=entries&quot; json:&quot;entries&quot;`</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">// 日志条目数组</span></span>\n<span class="line"><span style="color:#E1E4E8;">Commit           </span><span style="color:#F97583;">uint64</span><span style="color:#E1E4E8;">      </span><span style="color:#9ECBFF;">`protobuf:&quot;varint,8,opt,name=commit&quot; json:&quot;commit&quot;`</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">// 提交日志索引</span></span>\n<span class="line"><span style="color:#E1E4E8;">Snapshot         Snapshot    </span><span style="color:#9ECBFF;">`protobuf:&quot;bytes,9,opt,name=snapshot&quot; json:&quot;snapshot&quot;`</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">// 快照数据</span></span>\n<span class="line"><span style="color:#E1E4E8;">Reject           </span><span style="color:#F97583;">bool</span><span style="color:#E1E4E8;">        </span><span style="color:#9ECBFF;">`protobuf:&quot;varint,10,opt,name=reject&quot; json:&quot;reject&quot;`</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">// 是否拒绝</span></span>\n<span class="line"><span style="color:#E1E4E8;">RejectHint       </span><span style="color:#F97583;">uint64</span><span style="color:#E1E4E8;">      </span><span style="color:#9ECBFF;">`protobuf:&quot;varint,11,opt,name=rejectHint&quot; json:&quot;rejectHint&quot;`</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">// 拒绝同步日志请求时返回的当前节点日志 ID，用于被拒绝方快速定位到下一次合适的同步日志位置</span></span>\n<span class="line"><span style="color:#E1E4E8;">Context          []</span><span style="color:#F97583;">byte</span><span style="color:#E1E4E8;">      </span><span style="color:#9ECBFF;">`protobuf:&quot;bytes,12,opt,name=context&quot; json:&quot;context,omitempty&quot;`</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">// 上下文数据</span></span>\n<span class="line"><span style="color:#E1E4E8;">XXX_unrecognized []</span><span style="color:#F97583;">byte</span><span style="color:#E1E4E8;">      </span><span style="color:#9ECBFF;">`json:&quot;-&quot;`</span></span>\n<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// 位于 raft/raftpb/raft.pb.go:295</span></span>\n<span class="line"><span style="color:#D73A49;">type</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Message</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">struct</span><span style="color:#24292E;"> {</span></span>\n<span class="line"><span style="color:#24292E;">Type             MessageType </span><span style="color:#032F62;">`protobuf:&quot;varint,1,opt,name=type,enum=raftpb.MessageType&quot; json:&quot;type&quot;`</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">// 消息类型</span></span>\n<span class="line"><span style="color:#24292E;">To               </span><span style="color:#D73A49;">uint64</span><span style="color:#24292E;">      </span><span style="color:#032F62;">`protobuf:&quot;varint,2,opt,name=to&quot; json:&quot;to&quot;`</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">// 消息接收者的节点ID</span></span>\n<span class="line"><span style="color:#24292E;">From             </span><span style="color:#D73A49;">uint64</span><span style="color:#24292E;">      </span><span style="color:#032F62;">`protobuf:&quot;varint,3,opt,name=from&quot; json:&quot;from&quot;`</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">// 消息发送者的节点 ID</span></span>\n<span class="line"><span style="color:#24292E;">Term             </span><span style="color:#D73A49;">uint64</span><span style="color:#24292E;">      </span><span style="color:#032F62;">`protobuf:&quot;varint,4,opt,name=term&quot; json:&quot;term&quot;`</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">// 任期 ID</span></span>\n<span class="line"><span style="color:#24292E;">LogTerm          </span><span style="color:#D73A49;">uint64</span><span style="color:#24292E;">      </span><span style="color:#032F62;">`protobuf:&quot;varint,5,opt,name=logTerm&quot; json:&quot;logTerm&quot;`</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">// 日志所处的任期 ID</span></span>\n<span class="line"><span style="color:#24292E;">Index            </span><span style="color:#D73A49;">uint64</span><span style="color:#24292E;">      </span><span style="color:#032F62;">`protobuf:&quot;varint,6,opt,name=index&quot; json:&quot;index&quot;`</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">// 日志索引 ID，用于节点向 Leader 汇报自己已经commit的日志数据 ID</span></span>\n<span class="line"><span style="color:#24292E;">Entries          []Entry     </span><span style="color:#032F62;">`protobuf:&quot;bytes,7,rep,name=entries&quot; json:&quot;entries&quot;`</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">// 日志条目数组</span></span>\n<span class="line"><span style="color:#24292E;">Commit           </span><span style="color:#D73A49;">uint64</span><span style="color:#24292E;">      </span><span style="color:#032F62;">`protobuf:&quot;varint,8,opt,name=commit&quot; json:&quot;commit&quot;`</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">// 提交日志索引</span></span>\n<span class="line"><span style="color:#24292E;">Snapshot         Snapshot    </span><span style="color:#032F62;">`protobuf:&quot;bytes,9,opt,name=snapshot&quot; json:&quot;snapshot&quot;`</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">// 快照数据</span></span>\n<span class="line"><span style="color:#24292E;">Reject           </span><span style="color:#D73A49;">bool</span><span style="color:#24292E;">        </span><span style="color:#032F62;">`protobuf:&quot;varint,10,opt,name=reject&quot; json:&quot;reject&quot;`</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">// 是否拒绝</span></span>\n<span class="line"><span style="color:#24292E;">RejectHint       </span><span style="color:#D73A49;">uint64</span><span style="color:#24292E;">      </span><span style="color:#032F62;">`protobuf:&quot;varint,11,opt,name=rejectHint&quot; json:&quot;rejectHint&quot;`</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">// 拒绝同步日志请求时返回的当前节点日志 ID，用于被拒绝方快速定位到下一次合适的同步日志位置</span></span>\n<span class="line"><span style="color:#24292E;">Context          []</span><span style="color:#D73A49;">byte</span><span style="color:#24292E;">      </span><span style="color:#032F62;">`protobuf:&quot;bytes,12,opt,name=context&quot; json:&quot;context,omitempty&quot;`</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">// 上下文数据</span></span>\n<span class="line"><span style="color:#24292E;">XXX_unrecognized []</span><span style="color:#D73A49;">byte</span><span style="color:#24292E;">      </span><span style="color:#032F62;">`json:&quot;-&quot;`</span></span>\n<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>Message结构体相关的数据类型为 MessageType，MessageType 有 19 种。当然，并不是所有的消息类型都会用到上面定义的Message结构体中的所有字段，因此其中有些字段是Optinal的。</p><p>我将其中常用的协议（即不同的消息类型）的用途总结成如下的表格：</p>',16),i=p('<p>上表列出了消息的类型对应的功能、消息接收者的节点 ID 和消息发送者的节点 ID。在收到消息之后，根据消息类型检索此表，可以帮助我们理解 raft 算法的操作。</p><h3 id="选举流程" tabindex="-1">选举流程 <a class="header-anchor" href="#选举流程" aria-label="Permalink to &quot;选举流程&quot;">​</a></h3><p>raft 一致性算法实现的关键有 Leader 选举、日志复制和安全性限制。Leader 故障后集群能快速选出新 Leader，集群只有Leader 能写入日志， Leader 负责复制日志到 Follower 节点，并强制 Follower 节点与自己保持相同。</p><p>raft 算法的第一步是<strong>选举出 Leader</strong>，即使在 Leader 出现故障后也需要快速选出新 Leader，下面我们来梳理一下选举的流程。</p><h4 id="发起选举" tabindex="-1">发起选举 <a class="header-anchor" href="#发起选举" aria-label="Permalink to &quot;发起选举&quot;">​</a></h4><p>发起选举对节点的状态有限制，很显然只有在<strong>Candidate 或者 Follower 状态</strong>下的节点才有可能发起一个选举流程，而这两种状态的节点，其对应的tick 函数为 raft.tickElection 函数，用来发起选举和选举超时控制。发起选举的流程如下。</p><ul><li><p>节点启动时都以Follower 启动，同时随机生成自己的选举超时时间。</p></li><li><p>在Follower的tickElection 函数中，当选举超时，节点向自己发送 MsgHup 消息。</p></li><li><p>在状态机函数 raft.Step函数中，收到 MsgHup 消息之后，节点首先判断当前有没有 apply 的配置变更消息，如果有就忽略该消息。</p></li><li><p>否则进入 campaign 函数中进行选举：首先将任期号增加 1，然后广播给其他节点选举消息，带上的其他字段，包括：节点当前的最后一条日志索引（Index 字段）、最后一条日志对应的任期号（LogTerm 字段）、选举任期号（Term 字段，即前面已经进行 +1 之后的任期号）、Context 字段（目的是告知这一次是否是 Leader 转让类需要强制进行选举的消息）。</p></li><li><p>如果在一个选举超时期间内，发起新的选举流程的节点，得到了超过半数的节点投票，那么状态就切换到 Leader 状态。<strong>成为 Leader的同时，Leader 将发送一条 dummy 的 append 消息</strong>，目的是提交该节点上在此任期之前的值。</p></li></ul><p>在上述流程中，之所以每个节点随机选择自己的超时时间，是为了<strong>避免有两个节点同时进行选举</strong> ，此时没有任何一个节点会赢得半数以上的投票，从而导致这一轮选举失败，继续进行下一轮选举。在第三步，判断是否有 apply 配置变更消息，其原因在于，当<strong>有配置更新的情况下不能进行选举操作</strong>，即要保证每一次集群成员变化时只能变化一个，不能多个集群成员的状态同时发生变化。</p><h4 id="参与选举" tabindex="-1">参与选举 <a class="header-anchor" href="#参与选举" aria-label="Permalink to &quot;参与选举&quot;">​</a></h4><p>当收到任期号大于当前节点任期号的消息，且该消息类型如果是选举类的消息（类型为 prevote 或者 vote）时，节点会做出以下判断。</p><ul><li><p>首先判断该消息是否为强制要求进行选举的类型（context 为 campaignTransfer，表示进行 Leader转让）。</p></li><li><p>判断当前是否在租约期内，满足的条件包括：checkQuorum 为 true、当前节点保存的 Leader 不为空、没有到选举超时。</p></li></ul><p>如果不是强制要求选举，且在租约期内，就忽略该选举消息，这样做是为了避免出现那些分裂集群的节点，频繁发起新的选举请求。</p><ul><li><p>如果不是忽略选举消息的情况，除非是 prevote 类的选举消息，否则在收到其他消息的情况下，该节点都切换为 Follower 状态。</p></li><li><p>此时需要针对投票类型中带来的其他字段进行处理，同时满足日志新旧的判断和参与选举的条件。</p></li></ul><p>只有在同时满足以上两个条件的情况下，才能同意该节点的选举，否则都会被拒绝。这种做法可以保证最后选出来的新 Leader 节点，其日志都是最新的。</p><h3 id="日志复制" tabindex="-1">日志复制 <a class="header-anchor" href="#日志复制" aria-label="Permalink to &quot;日志复制&quot;">​</a></h3><p>选举好 Leader 后，Leader在收到 put 提案时，如何将提案复制给其他 Follower 呢？</p><p>我们回顾一下前面讲的 etcd 读写请求的处理流程。并结合下图说明日志复制的流程：</p>',17),d=p("<p>日志复制的流程图 ①</p><ul><li><p>收到客户端请求之后，etcd Server 的 KVServer 模块会向 raft 模块提交一个类型为 MsgProp 的提案消息。</p></li><li><p>Leader节点在本地添加一条日志，其对应的命令为<code>put foo bar</code>。此步骤只是添加一条日志，并没有提交，<strong>两个索引值还指向上一条日志</strong>。</p></li><li><p>Leader 节点向集群中其他节点广播 AppendEntries 消息，带上 put 命令。</p></li></ul><p>第二步中，两个索引值分别为 committedIndex和appliedIndex，图中有标识。committedIndex 存储最后一条提交日志的索引，而 appliedIndex 存储的是最后一条应用到状态机中的日志索引值。两个数值满足<strong>committedIndex 大于等于 appliedIndex</strong>，这是因为一条日志只有被提交了才能应用到状态机中。</p><p>接下来我们看看 Leader 如何将日志数据复制到 Follower 节点。</p>",4),u=p('<p>日志复制的流程图 ②</p><ul><li><p>Follower 节点收到 AppendEntries 请求后，与 Leader 节点一样，在本地添加一条新的日志，此时日志也没有提交。</p></li><li><p>添加成功日志后，Follower 节点向 Leader 节点应答 AppendEntries 消息。</p></li><li><p>Leader 节点汇总 Follower 节点的应答。当Leader 节点收到半数以上节点的 AppendEntries 请求的应答消息时，表明 <code>put foo bar</code> 命令成功复制，可以进行日志提交。</p></li><li><p>Leader 修改本地 committed 日志的索引，指向最新的存储<code>put foo bar</code>的日志，因为还没有应用该命令到状态机中，所以 appliedIndex 还是保持着上一次的值。</p></li></ul><p>当这个命令提交完成之后，命令就可以提交给应用层了。</p><ul><li><p>此时修改 appliedIndex的值，与 committedIndex 的值相等。</p></li><li><p>Leader 节点在后续发送给 Follower 的 AppendEntries 请求中，总会带上最新的 committedIndex 索引值。</p></li><li><p>Follower 收到AppendEntries 后会修改本地日志的 committedIndex 索引。</p></li></ul><p>至此，日志复制的过程在集群的多个节点之间就完成了。</p><h3 id="小结" tabindex="-1">小结 <a class="header-anchor" href="#小结" aria-label="Permalink to &quot;小结&quot;">​</a></h3><p>这一讲我们主要介绍了 etcd-raft 模块实现分布式一致性的原理，并且通过 raftexample 了解了 raft 模块的使用方式和过程。接着重点介绍了选举流程和日志复制的过程。</p><p>本讲内容总结如下：</p>',8),f=o("p",null,[s("除此之外，etcd 还有安全性限制，以保证日志选举和日志复制的正确性，比如 raft 算法中，并不是所有节点都能成为 Leader。一个节点要想成为 Leader，需要得到集群中半数以上节点的投票，而一个节点会投票给另一个节点，其中一个充分条件是："),o("strong",null,"进行选举的节点，其日志需要比本节点的日志更新"),s("。此外还有判断日志的新旧以及提交前面任期的日志条目等措施。")],-1),g=o("p",null,"学习完这一讲，我给大家留一个问题，哪些情况下会出现选举超时且没有任何一个节点成为 Leader？欢迎你在留言区和我分享你的观点。下一讲，我们将介绍 etcd 存储多版本控制 MVCC 如何实现。",-1);function h(m,F,q,b,A,_){const a=e("Image");return t(),r("div",null,[E,n(a,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image6/M01/0F/10/Cgp9HWA9EIqAVw9QAABJGq2-dl4448.png"}),s(),y,n(a,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image6/M01/0F/10/Cgp9HWA9EJ2ABd9rAAO37xDchBs024.png"}),s(),i,n(a,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image6/M01/0F/0D/CioPOWA9ELSAZR1_AACDc7CHoj4319.png"}),s(),d,n(a,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image6/M00/0F/0E/CioPOWA9ENOAQLFKAAB3Zn9Qj4Q619.png"}),s(),u,n(a,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image6/M00/0F/0E/CioPOWA9ENyARGJxAAG3ZxiXwp0220.png"}),s(),f,g])}const v=l(c,[["render",h]]);export{C as __pageData,v as default};
