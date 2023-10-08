import{_ as p,j as l,o as c,g as o,k as n,h as s,Q as t,s as a}from"./chunks/framework.a0d18f64.js";const I=JSON.parse('{"title":"08纵览全局：etcd的架构是什么样的？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/etcd 原理与实践_文档/(6402) 08  纵览全局：etcd 的架构是什么样的？.md","filePath":"posts/backEnd/etcd 原理与实践_文档/(6402) 08  纵览全局：etcd 的架构是什么样的？.md","lastUpdated":1696682708000}'),r={name:"posts/backEnd/etcd 原理与实践_文档/(6402) 08  纵览全局：etcd 的架构是什么样的？.md"},i=t(`<h1 id="_08纵览全局-etcd的架构是什么样的" tabindex="-1">08纵览全局：etcd的架构是什么样的？ <a class="header-anchor" href="#_08纵览全局-etcd的架构是什么样的" aria-label="Permalink to &quot;08纵览全局：etcd的架构是什么样的？&quot;">​</a></h1><p>从这一讲开始，我们将深入 etcd 组件的内部，进一步了解其架构以及核心功能实现的原理。了解 etcd 的实现原理，能够帮助我们日常使用etcd 时更加得心应手，遇到问题能更快地排查定位。</p><p>今天我们先从整体上介绍 etcd 组件的架构，了解etcd 内部各个模块之间的交互，总览 etcd。</p><h3 id="etcd-项目结构" tabindex="-1">etcd 项目结构 <a class="header-anchor" href="#etcd-项目结构" aria-label="Permalink to &quot;etcd 项目结构&quot;">​</a></h3><p>在介绍 etcd 整体的架构之前，我们先来看一下 etcd 项目代码的目录结构：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">$ tree</span></span>
<span class="line"><span style="color:#E1E4E8;">.</span></span>
<span class="line"><span style="color:#E1E4E8;">├── auth</span></span>
<span class="line"><span style="color:#E1E4E8;">├── build</span></span>
<span class="line"><span style="color:#E1E4E8;">├── client</span></span>
<span class="line"><span style="color:#E1E4E8;">├── clientv3</span></span>
<span class="line"><span style="color:#E1E4E8;">├── contrib</span></span>
<span class="line"><span style="color:#E1E4E8;">├── embed</span></span>
<span class="line"><span style="color:#E1E4E8;">├── etcdctl</span></span>
<span class="line"><span style="color:#E1E4E8;">├── etcdmain</span></span>
<span class="line"><span style="color:#E1E4E8;">├── etcdserver</span></span>
<span class="line"><span style="color:#E1E4E8;">├── functional</span></span>
<span class="line"><span style="color:#E1E4E8;">├── hack</span></span>
<span class="line"><span style="color:#E1E4E8;">├── integration</span></span>
<span class="line"><span style="color:#E1E4E8;">├── lease</span></span>
<span class="line"><span style="color:#E1E4E8;">├── logos</span></span>
<span class="line"><span style="color:#E1E4E8;">├── mvcc</span></span>
<span class="line"><span style="color:#E1E4E8;">├── pkg</span></span>
<span class="line"><span style="color:#E1E4E8;">├── proxy</span></span>
<span class="line"><span style="color:#E1E4E8;">├── raft</span></span>
<span class="line"><span style="color:#E1E4E8;">├── scripts</span></span>
<span class="line"><span style="color:#E1E4E8;">├── security</span></span>
<span class="line"><span style="color:#E1E4E8;">├── tests</span></span>
<span class="line"><span style="color:#E1E4E8;">├── tools</span></span>
<span class="line"><span style="color:#E1E4E8;">├── vendor</span></span>
<span class="line"><span style="color:#E1E4E8;">├── version</span></span>
<span class="line"><span style="color:#E1E4E8;">└── wal</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">$ tree</span></span>
<span class="line"><span style="color:#24292E;">.</span></span>
<span class="line"><span style="color:#24292E;">├── auth</span></span>
<span class="line"><span style="color:#24292E;">├── build</span></span>
<span class="line"><span style="color:#24292E;">├── client</span></span>
<span class="line"><span style="color:#24292E;">├── clientv3</span></span>
<span class="line"><span style="color:#24292E;">├── contrib</span></span>
<span class="line"><span style="color:#24292E;">├── embed</span></span>
<span class="line"><span style="color:#24292E;">├── etcdctl</span></span>
<span class="line"><span style="color:#24292E;">├── etcdmain</span></span>
<span class="line"><span style="color:#24292E;">├── etcdserver</span></span>
<span class="line"><span style="color:#24292E;">├── functional</span></span>
<span class="line"><span style="color:#24292E;">├── hack</span></span>
<span class="line"><span style="color:#24292E;">├── integration</span></span>
<span class="line"><span style="color:#24292E;">├── lease</span></span>
<span class="line"><span style="color:#24292E;">├── logos</span></span>
<span class="line"><span style="color:#24292E;">├── mvcc</span></span>
<span class="line"><span style="color:#24292E;">├── pkg</span></span>
<span class="line"><span style="color:#24292E;">├── proxy</span></span>
<span class="line"><span style="color:#24292E;">├── raft</span></span>
<span class="line"><span style="color:#24292E;">├── scripts</span></span>
<span class="line"><span style="color:#24292E;">├── security</span></span>
<span class="line"><span style="color:#24292E;">├── tests</span></span>
<span class="line"><span style="color:#24292E;">├── tools</span></span>
<span class="line"><span style="color:#24292E;">├── vendor</span></span>
<span class="line"><span style="color:#24292E;">├── version</span></span>
<span class="line"><span style="color:#24292E;">└── wal</span></span></code></pre></div><p>可以看到，etcd 的包还是挺多的，有二十多个。接下来我们来具体分析下其中每一个包的职责定义，整理之后如下表所示：</p>`,7),d=a("p",null,[s("etcd 核心的模块有 lease、mvcc、raft、etcdserver，其余都是辅助的功能。其中 "),a("strong",null,"etcdserver 是其他模块的整合"),s("。")],-1),E=a("h3",{id:"etcd-整体架构",tabindex:"-1"},[s("etcd 整体架构 "),a("a",{class:"header-anchor",href:"#etcd-整体架构","aria-label":'Permalink to "etcd 整体架构"'},"​")],-1),_=a("p",null,"接下来，我们看看etcd 的整体架构。我在上面的etcd 项目总览中提到了 etcd 中核心的几个模块，我们使用分层的方式来描绘 etcd 的架构图，如下所示：",-1),g=t('<ul><li><p><strong>客户端层</strong> ：包括 clientv3 和 etcdctl 等客户端。用户通过命令行或者客户端调用提供了 RESTful 风格的API，降低了 etcd的使用复杂度。除此之外，客户端层的负载均衡（etcd V3.4 版本的客户端默认使用的是 Round-robin，即轮询调度）和节点间故障转移等特性，提升了etcd 服务端的高可用性。<strong>需要注意的是，etcd V3.4之前版本的客户端存在负载均衡的 Bug，如果第一个节点出现异常，访问服务端时也可能会出现异常，建议进行升级。</strong></p></li><li><p><strong>API 接口层</strong> ：API 接口层提供了客户端访问服务端的通信协议和接口定义，以及服务端节点之间相互通信的协议，我将会在下一讲重点讲解 etcd的通信接口。etcd 有 V3和V2 两个版本。etcd V3 使用gRPC 作为消息传输协议；对于之前的V2 版本，etcd 默认使用HTTP/1.x 协议。对于不支持 gRPC的客户端语言，etcd 提供 JSON的grpc-gateway。通过 grpc-gateway 提供 RESTful 代理，转换 HTTP/JSON 请求为 gRPC 的 Protocol Buffer 格式的消息。这部分内容我们在 <a href="https://kaiwu.lagou.com/course/courseInfo.htm?courseId=613&amp;sid=20-h5Url-0#/detail/pc?id=6399" target="_blank" rel="noreferrer">05 讲&quot;gRPC 代理模式：实现可伸缩的 etcd API&quot;</a>具体做了讲解，这里我们就不再展开了。</p></li><li><p><strong>etcd Raft 层</strong> ：负责 Leader 选举和日志复制等功能，除了与本节点的 etcd Server 通信之外，还与集群中的其他 etcd 节点进行交互，实现<strong>分布式一致性数据同步</strong>的关键工作。</p></li><li><p><strong>逻辑层</strong>：etcd 的业务逻辑层，包括鉴权、租约、KVServer、MVCC 和 Compactor 压缩等核心功能特性。</p></li><li><p><strong>etcd 存储</strong>：实现了快照、预写式日志 WAL（Write Ahead Log）。etcd V3 版本中，使用 BoltDB 来持久化存储集群元数据和用户写入的数据。</p></li></ul><p>下面我们看一下 etcd 各个模块之间的交互过程。</p><h3 id="etcd-交互总览" tabindex="-1">etcd 交互总览 <a class="header-anchor" href="#etcd-交互总览" aria-label="Permalink to &quot;etcd 交互总览&quot;">​</a></h3><p>我们通过学习 etcd 服务端处理客户端的写请求的过程，展示 etcd 内部各个模块之间的交互。首先通过命令行工具 etcdctl 写入键值对：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">etcdctl </span><span style="color:#F97583;">--</span><span style="color:#E1E4E8;">endpoints http</span><span style="color:#F97583;">:</span><span style="color:#6A737D;">//127.0.0.1:2379 put foo bar</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">etcdctl </span><span style="color:#D73A49;">--</span><span style="color:#24292E;">endpoints http</span><span style="color:#D73A49;">:</span><span style="color:#6A737D;">//127.0.0.1:2379 put foo bar</span></span></code></pre></div><p>下图中展示了 etcd 处理一个客户端请求涉及的模块和流程。</p>',6),y=t("<p>从上至下依次为客户端 → API 接口层 → etcd Server → etcd raft 算法库。我们根据请求处理的过程，将 etcd Server 和 etcd raft 算法库单独说明。</p><ul><li><p><strong>etcd Server</strong>：接收客户端的请求，在上述的etcd 项目代码中对应etcdserver 包。请求到达 etcd Server 之后，经过 KVServer 拦截，实现诸如日志、Metrics 监控、请求校验等功能。etcd Server 中的raft模块，用于与 etcd-raft 库进行通信。applierV3 模块封装了 etcd V3 版本的数据存储；WAL 用于写数据日志，WAL中保存了任期号、投票信息、已提交索引、提案内容等，etcd 根据 WAL 中的内容在启动时恢复，以此实现集群的数据一致性。</p></li><li><p><strong>etcdraft</strong>：etcd 的raft 库。raftLog 用于管理 raft 协议中单个节点的日志，都处于内存中。raftLog 中还有两种结构体 unstable和storage，unsable 中存储不稳定的数据，表示还没有 commit，而 storage中都是已经被 commit 了的数据。这两种结构体分别用于不同步骤的存储，我们将在下面的交互流程中介绍。除此之外，raft 库更重要的是负责与集群中的其他 etcd Server进行交互，实现分布式一致性。</p></li></ul><p>在上图中，客户端请求与 etcd 集群交互包括如下两个步骤：</p><ul><li><p>首先是写数据到 etcd 节点中；</p></li><li><p>其次是当前的 etcd 节点与集群中的其他 etcd 节点之间进行通信，确认存储数据成功之后回复客户端。</p></li></ul><p>请求流程可划分为以下的子步骤：</p>",5),u=t("<ul><li><p>客户端通过负载均衡算法选择一个 etcd 节点，发起 gRPC 调用；</p></li><li><p>etcd Server 收到客户端请求；</p></li><li><p>经过 gRPC 拦截、Quota 校验，Quota 模块用于校验 etcd db 文件大小是否超过了配额；</p></li><li><p>接着 KVServer 模块将请求发送给本模块中的raft，这里负责与 etcd raft模块进行通信；</p></li><li><p>发起一个提案，命令为<code>put foo bar</code>，即使用put 方法将 foo 更新为 bar；</p></li><li><p>在raft 中会将数据封装成 raft 日志的形式提交给 raft模块；</p></li><li><p>raft模块会首先保存到 raftLog 的 unstable 存储部分；</p></li><li><p>raft模块通过raft 协议与集群中其他 etcd 节点进行交互。</p></li></ul><p>需要注意的是，在 raft 协议中写入数据的 etcd 必定是 leader 节点，如果客户端提交数据到非 leader 节点时，该节点需要将请求转发到 etcd leader 节点处理。</p><p>我们继续来看相应的应答步骤，流程如下：</p>",3),h=t('<ul><li><p>提案通过 RaftHTTP 网络模块转发，集群中的其他节点接收到该提案；</p></li><li><p>在收到提案之后，集群中其他节点向 leader 节点应答&quot;我已经接收这条日志数据&quot;；</p></li><li><p>Leader收到应答之后，统计应答的数量，当满足超过集群半数以上节点，应答接收成功；</p></li><li><p>etcd raft算法模块构造 Ready 结构体，用来通知 etcd Server 模块，该日志数据已经被 commit；</p></li><li><p>etcd Server 中的 raft 模块（交互图中有标识），收到 Ready 消息后，会将这条日志数据写入到 WAL 模块中；</p></li><li><p>正式通知 etcd Server 该提案已经被 commit；</p></li><li><p>etcd Server 调用 applierV3 模块，将日志写入持久化存储中；</p></li><li><p>etcd Server 应答客户端该数据写入成功；</p></li><li><p>etcd Server 调用 etcd raft 库，将这条日志写入到 raftLog 模块中的 storage。</p></li></ul><p>上述过程中，提案经过网络转发，<strong>当多数etcd 节点持久化日志数据成功并进行应答，提案的状态会变成已提交</strong>。</p><p>在应答某条日志数据是否已经 commit 时，为什么 etcd raft 模块首先写入到 WAL 模块中？这是因为该过程仅仅添加一条日志，一方面开销小，速度会很快；另一方面，如果在后面 applierV3 写入失败，etcd 服务端在重启的时候也可以根据 WAL 模块中的日志数据进行恢复。etcd Server 从 raft 模块获取已提交的日志条目，由 applierV3 模块通过 MVCC 模块执行提案内容，更新状态机。</p><p>整个过程中，etcd raft 模块中的 raftLog 数据在内存中存储，在服务重启后失效；客户端请求的数据则被持久化保存到 WAL 和 applierV3 中，不会在重启之后丢失。</p><h3 id="小结" tabindex="-1">小结 <a class="header-anchor" href="#小结" aria-label="Permalink to &quot;小结&quot;">​</a></h3><p>这一讲我们主要介绍了 etcd 整体的架构。首先通过 etcd 项目结构，介绍了各个包的用途，并介绍了其中核心的包；接着基于分层的方式，绘制了 etcd 分层架构图，结合图介绍了各个模块的作用；最后通过客户端写入 etcd 服务端的请求，理解 etcd 各个模块交互的过程。</p><p>本讲内容总结如下：</p>',7),f=a("p",null,"本课时通过总览 etcd 的架构，将其重要的模块标识出来，如 etcd raft 模块、WAL、applierV3、Quota 等模块，也为我们下面具体介绍 etcd 的原理做一个铺垫。",-1),A=a("p",null,"学习完本课时，从上述 etcd 各个模块的交互过程，你知道有哪些方式保证了 etcd 写请求保证分布式一致性？欢迎你在留言区和我分享你的学习收获。",-1),m=a("p",null,"下一讲，我们将开始学习 etcd 的 API 接口层，看看 etcd 定义了哪些 API 接口并进行实践。",-1);function v(S,T,b,C,P,V){const e=l("Image");return c(),o("div",null,[i,n(e,{alt:"2021218-16644.png",src:"https://s0.lgstatic.com/i/image6/M00/04/BD/CioPOWAuMueATk02AAE0xMg7j9w742.png"}),s(),d,E,_,n(e,{alt:"2021218-16649.png",src:"https://s0.lgstatic.com/i/image6/M00/04/C0/Cgp9HWAuMvWARHxgAACMKTNJgfw845.png"}),s(),g,n(e,{alt:"2021222-135212.png",src:"https://s0.lgstatic.com/i/image6/M00/07/3C/Cgp9HWAzS5qAINI_AAE7hCmxS4Q375.png"}),s(),y,n(e,{alt:"2021218-16654.png",src:"https://s0.lgstatic.com/i/image6/M01/04/BD/CioPOWAuMxqAE23xAAG11qxl4bc031.png"}),s(),u,n(e,{alt:"2021218-16657.png",src:"https://s0.lgstatic.com/i/image6/M01/04/BD/CioPOWAuMyOAayYSAAIQ_bDBEtQ032.png"}),s(),h,n(e,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image6/M01/04/C0/Cgp9HWAuM0GALYYpAAE6O5BEmoM273.png"}),s(),f,A,m])}const R=p(r,[["render",v]]);export{I as __pageData,R as default};
