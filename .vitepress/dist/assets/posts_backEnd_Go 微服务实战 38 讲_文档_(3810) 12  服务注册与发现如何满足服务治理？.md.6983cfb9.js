import{_ as o,o as e,g as r,Q as t}from"./chunks/framework.f949202b.js";const _=JSON.parse('{"title":"什么是服务注册与发现 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/Go 微服务实战 38 讲_文档/(3810) 12  服务注册与发现如何满足服务治理？.md","filePath":"posts/backEnd/Go 微服务实战 38 讲_文档/(3810) 12  服务注册与发现如何满足服务治理？.md","lastUpdated":null}'),s={name:"posts/backEnd/Go 微服务实战 38 讲_文档/(3810) 12  服务注册与发现如何满足服务治理？.md"},p=t('<p>在单体应用向微服务架构演进的过程中，原本的巨石型应用会按照业务需求被拆分成多个微服务，每个微服务会提供特定的功能，并可能依赖于其他的微服务。每个微服务实例都可以动态部署，服务实例之间的调用通过轻量级的远程调用方式（HTTP、消息队列等）实现，它们之间通过预先定义好的接口进行访问。</p><p>由于服务实例是动态部署的，每个服务实例的地址和服务信息都可能动态变化，这就势必需要<strong>一个中心化的组件对各个服务实例的信息进行管理</strong>，该组件管理了各个部署好的服务实例元数据，包括服务名、IP 地址、端口号、服务描述和服务状态等。</p><h3 id="什么是服务注册与发现" tabindex="-1">什么是服务注册与发现 <a class="header-anchor" href="#什么是服务注册与发现" aria-label="Permalink to &quot;什么是服务注册与发现&quot;">​</a></h3><p>服务注册与发现由两部分组成：①<strong>服务注册</strong> ，指服务实例在启动时将自身信息注册到服务注册与发现中心，并在运行时通过心跳等方式向服务注册与发现中心汇报自身服务状态；②<strong>服务发现</strong>，指服务实例根据服务名向服务注册与发现中心请求其他服务实例信息，用于进行接下来的远程调用。</p><p>下面我们就来介绍服务注册与发现中心的职责以及分布式系统中数据同步的基本原理 CAP。</p><h4 id="_1-服务注册与发现中心的职责" tabindex="-1">1. 服务注册与发现中心的职责 <a class="header-anchor" href="#_1-服务注册与发现中心的职责" aria-label="Permalink to &quot;1. 服务注册与发现中心的职责&quot;">​</a></h4><p>随着应用架构向微服务架构迁移，服务数量不断增加，再加上动态部署动态扩展的特性，就使得服务地址和端口在运行时是随时可变的。对此，我们需要<strong>一个额外的中心化组件统一管理动态部署的微服务应用的服务实例元数据</strong> ，我们一般称该中心化组件为<strong>服务注册与发现中心</strong>。</p><p>服务注册与发现中心主要有以下的职责：</p><ul><li><p><strong>管理</strong>当前注册到服务注册与发现中心的微服务实例元数据信息，包括服务实例的服务名、IP 地址、端口号、服务描述和服务状态等；</p></li><li><p>与注册到服务注册与发现中心的微服务实例<strong>维持心跳</strong>，定期检查注册表中的服务实例是否在线，并剔除无效服务实例信息；</p></li><li><p><strong>提供服务发现能力</strong>，为服务调用方提供服务提供方的服务实例元数据。</p></li></ul><p>通过服务注册与发现中心，可以很方便地管理系统中动态变化的服务实例信息。与此同时，它也可能成为系统的瓶颈和故障点。因为服务之间的调用信息来自服务注册与发现中心，当它不可用时，服务之间的调用可能就无法正常进行了。因此，服务注册与发现中心一般会<strong>集群化部署</strong>，以提供高可用性和高稳定性。</p><h4 id="_2-分布式中的-cap-理论" tabindex="-1">2. 分布式中的 CAP 理论 <a class="header-anchor" href="#_2-分布式中的-cap-理论" aria-label="Permalink to &quot;2. 分布式中的 CAP 理论&quot;">​</a></h4><p>从本质上来讲，微服务应用属于分布式系统的一种落地实践，而分布式系统最大的难点是处理各个节点之间数据状态的一致性。即使是倡导无状态的 HTTP RESTful API 请求，在处理多服务实例情况下的修改数据状态请求，也是需要通过数据库或者分布式缓存等外部系统维护数据的一致性。</p><p><strong>CAP 原理就是描述分布式系统下节点数据同步的基本定理</strong> 。该原理由加州大学的 Eric Brewer 教授提出，分别指 <strong>Consistency（一致性）</strong> 、<strong>Availability（可用性）</strong> 和 <strong>Partition tolerance（分区容忍性）</strong>。其具体含义如下：</p><ul><li><p>Consistency，指数据一致性，表示一个系统的数据信息（包括备份数据）在同一时刻都是一致的。在分布式系统下，同一份数据可能存在于多个不同的实例中，在数据强一致性的要求下，对其中一份数据的修改必须同步到它的所有备份中。在数据同步的任何时候，都需要保证所有对该份数据的请求将返回同样的状态。</p></li><li><p>Availability，指服务可用性，要求服务在接收到客户端请求后，都能够给出响应。服务可用性考量的是系统的可用性，要求系统在高并发情况下和部分节点宕机的情况下，系统整体依然能够响应客户端的请求。</p></li><li><p>Partition tolerance，指分区容忍性。在分布式系统中，不同节点之间是通过网络进行通信。基于网络的不可靠性，位于不同网络分区的服务节点可能会通信失败，如果系统能够容忍这种情况，说明它是满足分区容忍性的。如果系统不能够满足分区容忍性，那么将会限制分布式系统的扩展性，即服务节点的部署数量和地区都会受限，这就违背了分布式系统设计的初衷，所以一般来讲<strong>分布式系统都会满足 P，也就是分区容忍性</strong>。</p></li></ul><p>另外，Eric Brewer 认为，这<strong>三个指标最多同时满足两个</strong>。基于分布式系统的基本特质，P（分区容忍性）是必须要满足的，所以接下来需要考虑满足 C（数据一致性）还是 A（服务可用性）。在类似银行之类对金额数据要求强一致性的系统中，要优先考虑满足 C（数据一致性）；而在类似大众网页之类的系统中，用户对网页版本的新旧不会有特别的要求，在这种场景下 A（服务可用性）会高于 C（数据一致性）。</p><h3 id="如何选择服务注册与发现框架" tabindex="-1">如何选择服务注册与发现框架 <a class="header-anchor" href="#如何选择服务注册与发现框架" aria-label="Permalink to &quot;如何选择服务注册与发现框架&quot;">​</a></h3><p>随着近几年微服务框架的高速发展，目前业界已经开源出了大量优秀的服务注册与发现组件，比如 Consul、Etcd、ZooKeeper 等。它们之间各有千秋，在组件选型时你可以根据自身业务的需要进行选择和改造。</p><p>接下来我们就来介绍下 Consul、Etcd 和 ZooKeeper 这三个组件，最后再将三者进行对比，给出你一些选择的依据。</p><h4 id="_1-consul" tabindex="-1">1. Consul <a class="header-anchor" href="#_1-consul" aria-label="Permalink to &quot;1. Consul&quot;">​</a></h4><p>Consul 由 HashiCorp 开源，是支持多个平台的分布式高可用系统。Consul 采用 Go 开发，主要用于分布式系统的服务发现与配置，它满足 CP 特性。Consul 是分布式、高可用和可横向扩展的，提供以下主要特性：</p><ul><li><p><strong>服务发现</strong>。可以使用 HTTP 或者 DNS 的方式将服务实例的元数据注册到 Consul，通过 Consul 发现所依赖服务的元数据列表。</p></li><li><p><strong>健康检查</strong>。Consul 提供定时的健康检查机制，定时请求注册到 Consul 中的服务实例提供的健康检查接口，将异常返回的服务实例标记为&quot;不健康&quot;。</p></li><li><p><strong>Key/Value</strong>。Consul 提供了 Key/Value 存储功能，可以通过简单的 HTTP 接口进行使用。</p></li><li><p><strong>多数据中心</strong>。Consul 使用 Raft 算法来保证数据一致性，提供了开箱即用的多数据中心功能。</p></li></ul><p>服务实例与 Consul 的交互如下图所示：</p><p><img src="https://s0.lgstatic.com/i/image/M00/3E/CF/CgqCHl8tP0uAfPqfAAC1xfaVTwQ927.png" alt="1.png"></p><p>Consul 的交互图</p><p>通过该图，我们可以看到 Consul 实现服务注册与发现中心的调用过程如下：</p><ul><li><p>Producer 在启动之初会通过 /register 接口将自己的服务实例元数据注册到 Consul 中；</p></li><li><p>Consul 通过 Producer 提供的健康检查接口 /health 定时检查 Producer 的服务实例状态；</p></li><li><p>Consumer 请求 Consul 的接口获取 Producer 服务的元数据；</p></li><li><p>Consumer 从 Consul 中返回的 Producer 服务实例元数据列表中选择合适的服务实例，并使用其配置的 IP 和端口信息发起服务调用，如上图中 Consumer 调用 Producer 的 /service 接口。</p></li></ul><p><strong>Consul 是一个高可用的分布式系统，支持多数据中心部署</strong> 。一个 Consul 集群由多个部署和运行了 Consul Agent 的节点组成。Consul 集群中主要存在两种角色：<strong>Server</strong> 和 <strong>Client</strong>。Consul 使用 Gossip 协议来管理成员和广播消息到集群。每个 Consul Agent 负责对本地的服务进行监控检查，并将查询请求转发到 Server 中进行处理。Consul 的架构图如下所示：</p><p><img src="https://s0.lgstatic.com/i/image/M00/3E/CE/CgqCHl8tP0OAVC4_AAIBrjsMQhU949.png" alt="2.png"></p><p>Consul 的架构图</p><p>简言之，作为一个开箱即用、高可用分布式服务发现和配置系统，Consul 可以很方便地为微服务的服务治理提供强有力的支持。在后面的课时中，我会带你实现一个 Consul 的客户端，将我们自身的 Web 服务注册到 Consul 中，以供其他服务或者网关调用。</p><h4 id="_2-etcd" tabindex="-1">2. Etcd <a class="header-anchor" href="#_2-etcd" aria-label="Permalink to &quot;2. Etcd&quot;">​</a></h4><p>Etcd 是基于 HTTP 协议的分布式 key/Value 存储系统，由 CoreOS 开源，采用 Go 语言编写，主要用于服务发现和配置共享。Ectd 的经典应用场景有：</p><ul><li><p><strong>Key/Value 存储</strong>。Etcd 支持 HTTP RESTful API，提供强一致性、高可用的数据存储能力。</p></li><li><p><strong>服务发现</strong>。通过在 Etcd 中注册某个服务的目录，服务实例连接 Etcd 并在目录下发布对应 IP 和 Port 以供调用方使用，可以有效实现服务注册与发现的功能。</p></li><li><p><strong>消息发布与订阅</strong>。通过 Etcd 的 Watcher 机制，可以使订阅者订阅他们关心的目录。当消息发布者修改被监控的目录内容时，可以将变化实时通知给订阅者。</p></li></ul><p><img src="https://s0.lgstatic.com/i/image/M00/3E/C3/Ciqc1F8tPziAYhqKAAEAhU7bg8o874.png" alt="3.png"></p><p>Etcd 工作原理图</p><p>Etcd 集群中的节点提供两种模式，分别为：</p><ul><li><p>Proxy 模式。该模式下的 Etcd 节点会作为一个反向代理，把客户端的请求转发给可用的 Etcd Peer 集群。Proxy 没有加入 Etcd 的一致性集群中，不会降低集群的写入性能。</p></li><li><p>Peer 模式。该模式下的节点提供数据存储和同步的能力。Peer 之间通过 Raft 协议进行 Leader 选举和保持数据强一致性，通常建议部署奇数个节点提供高可用的集群能力。</p></li></ul><p>相对于其他的组件来讲，Etcd 更为轻量级，部署简单，支持 HTTP 接口。它为服务发现提供一个稳定且高可用的消息注册仓库，可以有力支撑微服务的协同工作。</p><h4 id="_3-zookeeper" tabindex="-1">3. ZooKeeper <a class="header-anchor" href="#_3-zookeeper" aria-label="Permalink to &quot;3. ZooKeeper&quot;">​</a></h4><p>ZooKeeper 是一个开源的分布式系统协调服务，目前由 Apache 基金会维护，采用 Java 语言开发。ZooKeeper 将分布式系统中那些复杂且易出错的服务封装为简单高效的接口，意在帮助开发人员高效地解决分布式系统中的一致性问题。</p><p>ZooKeeper 底层只提供了两个功能：<strong>管理客户端提交的数据</strong> 和<strong>为客户端程序提供数据节点的监听服务</strong>。它是一个典型的分布式数据一致性解决方案，基于 ZooKeeper 可以实现服务发现与注册、消息发布与订阅、分布式协调与通知、分布式锁、Leader 选举、集群管理和分布式队列等诸多功能。</p><p>ZooKeeper 集群中 Server 主要存在三种角色，分别为 Leader、Follower 和 Observer，ZooKeeper 的架构如下所示：</p><p><img src="https://s0.lgstatic.com/i/image/M00/3E/CE/CgqCHl8tPyuAatSlAAFFUL1erYw800.png" alt="4.png"></p><p>ZooKeeper 架构图</p><p>ZooKeeper 使用独特的 ZAB 协议来保证集群内数据的一致性。ZAB 协议基于 Paxos 算法设计，是一种崩溃可恢复的原子消息广播协议，主要包含以下两种形式：</p><ul><li><p><strong>崩溃恢复模式</strong>。在服务启动或者 Leader 服务器离线时，为了选举出新的 Leader，集群会进入到崩溃恢复模式。当通过投票选举了新的 Leader 后，集群中 Follower 会与新的 Leader 进行状态同步。当集群中有半数以上的服务器完成同步，集群将进入到消息广播模式。</p></li><li><p><strong>消息广播模式</strong>。ZAB 协议使用一个类似于二阶段提交的原子广播协议进行消息广播，它不要求 Follower 节点都返回 ACK 才完成一致性事务，而是只需要半数以上即可提交并完成一个事务广播。</p></li></ul><p>ZooKeeper 为分布式系统提供协调服务，能够有效地支持微服务架构的服务注册和发现机制。同时 ZooKeeper 中提供的其他数据一致性解决方案，能够有力支撑微服务中分布式业务的开发。</p><h4 id="_4-组件对比" tabindex="-1">4. 组件对比 <a class="header-anchor" href="#_4-组件对比" aria-label="Permalink to &quot;4. 组件对比&quot;">​</a></h4><p>以上介绍的三种服务注册与发现组件在业界都已经有了广泛的应用，在很多大公司的项目中都能看到它们的身影，比如 ZooKeeper 在 Hadoop 体系中发挥了极其重要的分布式协调作用。下面我们就从特性方面比较它们的异同：</p><p><img src="https://s0.lgstatic.com/i/image/M00/3E/C3/Ciqc1F8tPxCAT_4RAADBzRFlUA0352.png" alt="5.png"></p><p>从<strong>软件的生态</strong>来看，Consul 是以服务发现和配置作为主要功能目标，附带提供了 Key/Value 存储，相对于 Etcd 和 ZooKeeper 来讲业务范围较小，更适合于服务注册与发现。</p><p>Etcd 和 ZooKeeper 都是通用的分布式一致性存储系统，被应用于分布式系统的协调工作中，使用范围抽象，具体的业务场景需要开发人员自主实现，如服务发现、分布式锁等。另外，ZooKeeper 具备广大的周边生态，在分布式系统中得到了广泛的使用；而 Etcd 以简单易用的特性吸引了大量开发人员，在目前火热的 Kubernetes 中也有应用。</p><p>而仅从<strong>服务注册与发现组件的需求</strong>来看，选择 Consul 作为服务注册与发现中心能够取得更好的效果；如果系统存在其他分布式一致性协作需求，比如分布式事务、分布式 Leader 选举、分布式锁等，选择 Etcd 和 ZooKeeper 反而能够提供更多的服务支持。</p><h3 id="小结" tabindex="-1">小结 <a class="header-anchor" href="#小结" aria-label="Permalink to &quot;小结&quot;">​</a></h3><p>本课时我们主要介绍了服务注册与发现的原理，以及常用的几种服务注册与发现组件。服务注册与发现在微服务架构中是各个微服务之间的协调者，因此掌握服务注册与发现的基本原理，正确使用服务注册与发现组件对于我们开发微服务非常重要。纸上得来终觉浅，绝知此事要躬行，在接下来的课时中，我们就会基于 Consul 来实现 Go 微服务的服务注册与发现。</p><p>关于分布式注册与发现，你有遇到过哪些坑？欢迎你在留言区和我分享。</p>',56),l=[p];function n(a,i,c,g,u,d){return e(),r("div",null,l)}const h=o(s,[["render",n]]);export{_ as __pageData,h as default};
