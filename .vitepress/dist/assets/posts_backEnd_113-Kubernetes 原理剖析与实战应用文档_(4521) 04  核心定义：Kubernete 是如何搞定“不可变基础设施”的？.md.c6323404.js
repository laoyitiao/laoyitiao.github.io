import{_ as s,o as a,g as n,Q as p}from"./chunks/framework.f949202b.js";const b=JSON.parse('{"title":"怎么理解不可变基础设施？ ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/113-Kubernetes 原理剖析与实战应用文档/(4521) 04  核心定义：Kubernete 是如何搞定“不可变基础设施”的？.md","filePath":"posts/backEnd/113-Kubernetes 原理剖析与实战应用文档/(4521) 04  核心定义：Kubernete 是如何搞定“不可变基础设施”的？.md","lastUpdated":null}'),l={name:"posts/backEnd/113-Kubernetes 原理剖析与实战应用文档/(4521) 04  核心定义：Kubernete 是如何搞定“不可变基础设施”的？.md"},o=p(`<p>在上一节课，我们已经了解了 Kubernetes 集群的搭建方式。从现在开始，我们就要跟 Kubernetes 集群打交道了。本节课我们会学习 Kubernetes 中最重要、也最核心的对象------Pod。</p><p>在了解 Pod 之前，我们先来看一下CNCF 官方是怎么定义云原生的。</p><blockquote><p>云原生技术有利于各组织在公有云、私有云和混合云等新型动态环境中，构建和运行可弹性扩展的应用。云原生的代表技术包括容器、服务网格、微服务、<strong>不可变基础设施</strong> 和声明式API。</p><p>这些技术能够构建容错性好、易于管理和便于观察的松耦合系统。结合可靠的自动化手段，云原生技术使工程师能够轻松地对系统作出频繁和可预测的重大变更。</p></blockquote><p>有没有注意到，云原生的代表技术里面提到了一个概念------不可变基础设施（Immutable Infrastructure）。其他的代表技术，像容器、微服务等概念早已深入人心，声明式 API 我们在第一讲 Kubernetes 的前世今生中也有所提及。那么这个不可变基础设施到底是什么含义，又与我们今天要讲的 Pod 有什么关系？</p><h3 id="怎么理解不可变基础设施" tabindex="-1">怎么理解不可变基础设施？ <a class="header-anchor" href="#怎么理解不可变基础设施" aria-label="Permalink to &quot;怎么理解不可变基础设施？&quot;">​</a></h3><p><strong>不可变基础设施</strong> ，这个名词最早由 Chad Fowler 于 2013 年在他的文章&quot;<a href="http://chadfowler.com/2013/06/23/immutable-deployments.html" target="_blank" rel="noreferrer">Trash Your Servers and Burn Your Code: Immutable Infrastructure and Disposable Components</a>*&quot;*中提出来。随后，Docker 带来的&quot;容器革命&quot;以及 Kubernetes 引领的&quot;云原生时代&quot;，让不可变基础设施这个概念变得越来越流行。</p><p>这里的基础设施，我们可以理解为服务器、虚拟机或者是容器。</p><p>跟不可变基础设施相对的，我们称之为<strong>可变基础设施</strong>。在以往传统的开发运维体系中，软件开发完成后，需要工程师或管理员通过SSH 连接到他们的服务器上，然后进行一些脚本安装、deb/rpm 包的安装工作，并逐个机器地调整对应的配置参数及文件。后续还会根据需要对该环境进行不断更改，比如 kernel 升级、配置更新、打补丁等。</p><p>随着这种类似变更的操作越来越多，没有人能弄清楚这个环境具体经历了哪些操作，而后续的变更也经常会遇到各种意想不到的诡异事情，比如软件包的循环依赖、参数的配置不一致、版本漂移等问题。</p><p>基础设施会变得越来越脆弱、敏感，一些小的改动都有可能引发大的不可预知的结果，这令广大开发者和环境管理员异常抓狂，他们需要凭借自己丰富的技术积累，耗费大量的时间去排查解决。正如我们 01 课时所说，云计算的出现降低了环境标准化的成本，但是业务的交付管理成本依然很高。</p><p>通常来说，这种可变基础设施会导致以下问题：</p><ul><li><p>持续的变更修改给服务运行态引入过多的中间态，增加了不可预知的风险；</p></li><li><p>故障发生时，难以及时快速构建出新的服务副本；</p></li><li><p>不易标准化，交付运维过程异常痛苦，虽然可以通过 Ansible、Puppet 等部署工具进行交付，但是也很难保证对底层各种异构的环境支持得很好，还有随时会出现的版本漂移问题。比如你可能经常遇到的，某个软件包几个月之前安装还能够正常运行，现在到一个新环境安装后，竟然无法正常工作了。</p></li></ul><p>不可变基础设施则是另一种思路，部署完成以后，便成为一种只读状态，不可对其进行任何更改。如果需要更新或修改，就使用新的环境或服务器去替代旧的。不可变基础设施带来了更一致、更可靠、更可预测的设计理念，可以缓解或完全避免可变基础设施中遇到的各种常见问题。</p><p>同时，借助容器技术我们可以自动化地构建出不可变的、可版本化管理的、可一致性交付的应用服务体系，这里包括了标准化实例、运行环境等。还可以依赖持续部署系统，进行应用服务的自动化部署更新，加快迭代和部署效率。</p><p><strong>Kubernetes 中的不可变基础设施就是 Pod</strong>。</p><h3 id="pod-是什么" tabindex="-1">Pod 是什么 <a class="header-anchor" href="#pod-是什么" aria-label="Permalink to &quot;Pod 是什么&quot;">​</a></h3><p>Pod 由一个或多个容器组成，如下图所示。Pod 中的容器不可分割，会作为一个整体运行在一个 Node 节点上，也就是说 Pod 是你在 Kubernetes 中可以创建和部署的最原子化的单位。</p><p><img src="https://s0.lgstatic.com/i/image/M00/4A/31/CgqCHl9QuZeAeFxvAAtms5EcUcs313.png" alt="image (19).png"></p><p>（<a href="https://github.com/kubernetes/website/blob/master/content/en/docs/tutorials/kubernetes-basics/public/images/module_03_pods.svg" target="_blank" rel="noreferrer">https://github.com/kubernetes/website/blob/master/content/en/docs/tutorials/kubernetes-basics/public/images/module_03_pods.svg</a>）</p><p>同一个 Pod 中的容器共享网络、存储资源。</p><ul><li><p>每个 Pod 都会拥有一个独立的网络空间，其内部的所有容器都共享网络资源，即 IP 地址、端口。内部的容器直接通过 localhost 就可以通信。</p></li><li><p>Pod 可以挂载多个共享的存储卷（Volume），这时内部的各个容器就可以访问共享的 Volume 进行数据的读写。</p></li></ul><p>既然一个 Pod 内支持定义多个容器，是不是意味着我可以任意组合，甚至将无关紧要的容器放进来都无所谓？不！这不是我们推荐的方式，也不是使用 Pod 的正确打开方式。</p><p>通常来说，如果在一个 Pod 内有多个容器，那么这几个容器最好是密切相关的，且可以共享一些资源的，比如网络、存储等。</p><p>我们来看看<a href="https://kubernetes.io/zh/docs/concepts/workloads/pods/#pod-%E6%80%8E%E6%A0%B7%E7%AE%A1%E7%90%86%E5%A4%9A%E4%B8%AA%E5%AE%B9%E5%99%A8" target="_blank" rel="noreferrer">官方文档中给的一个例子</a>。这个 Pod 里面运行了两个容器 File Puller 和 Web Server。其中 File Puller 负责定期地从外部 Content Manager 同步内容，更新到挂载的共享存储卷（Volume）中，而 Web Server 只负责对外提供访问服务。两个容器之间通过共享的存储卷共享数据。</p><p><img src="https://s0.lgstatic.com/i/image/M00/4A/31/CgqCHl9QuaWAHvj5AACaJbulm4c584.png" alt="image (20).png"></p><p>（<a href="https://d33wubrfki0l68.cloudfront.net/aecab1f649bc640ebef1f05581bfcc91a48038c4/728d6/images/docs/pod.svg" target="_blank" rel="noreferrer">https://d33wubrfki0l68.cloudfront.net/aecab1f649bc640ebef1f05581bfcc91a48038c4/728d6/images/docs/pod.svg</a>）</p><p>类似这样紧密耦合的业务容器，就比较适合放置在同一个 Pod 中，可以保证很高的通信效率。</p><p>一般来说，在一个 Pod 内运行多个容器，比较适应于以下这些场景。</p><ul><li><p>容器之间会发生文件交换等，上面提到的例子就是这样。一个写文件，一个读文件。</p></li><li><p>容器之间需要本地通信，比如通过 localhost 或者本地的 Socket。这种方式有时候可以简化业务的逻辑，因为此时业务就不用关心另外一个服务的地址，直接本地访问就可以了。</p></li><li><p>容器之间需要发生频繁的 RPC 调用，出于性能的考量，将它们放在一个 Pod 内。</p></li><li><p>希望为应用添加其他功能，比如日志收集、监控数据采集、配置中心、路由及熔断等功能。这时候可以考虑利用边车模式（Sidecar Pattern），既不需要改动原始服务本身的逻辑，还能增加一系列的功能。比如 Fluentd 就是利用边车模式注入一个对应 log agent 到 Pod 内，用于日志的收集和转发。 Istio 也是通过在 Pod 内放置一个 Sidecar 容器，来进行无侵入的服务治理。</p></li></ul><h3 id="pod-背后的设计理念" tabindex="-1">Pod 背后的设计理念 <a class="header-anchor" href="#pod-背后的设计理念" aria-label="Permalink to &quot;Pod 背后的设计理念&quot;">​</a></h3><p>看完上面 Pod 的存在形式，你也许会有下面两个疑问。</p><h4 id="_1-为什么-kubernetes-不直接管理容器-而用-pod-来管理呢" tabindex="-1">1. 为什么 Kubernetes 不直接管理容器，而用 Pod 来管理呢？ <a class="header-anchor" href="#_1-为什么-kubernetes-不直接管理容器-而用-pod-来管理呢" aria-label="Permalink to &quot;1. 为什么 Kubernetes 不直接管理容器，而用 Pod 来管理呢？&quot;">​</a></h4><p>直接管理一个容器看起来更简单，但为了能够更好地管理容器，Kubernetes 在容器基础上做了更高层次的抽象，即 Pod。</p><p>因为使用一个新的逻辑对象 Pod 来管理容器，可以在不重载容器信息的基础上，添加更多的属性，而且也方便跟容器运行时进行解耦，兼容度高。比如：</p><ul><li><p>存活探针（Liveness Probe）可以从应用程序的角度去探测一个进程是否还存活着，在容器出现问题之前，就可以快速检测到问题；</p></li><li><p>容器启动后和终止前可以进行的操作，比如，在容器停止前，可能需要做一些清理工作，或者不能马上结束进程；</p></li><li><p>定义了容器终止后要采取的策略，比如始终重启、正常退出才重启等；</p></li></ul><p>这些能力我们会在下一节课&quot; 05 Pod：最小调度单元的使用进阶及实践&quot;中逐一介绍。</p><h4 id="_2-为什么要允许一个-pod-内可以包含多个容器" tabindex="-1">2. 为什么要允许一个 Pod 内可以包含多个容器？ <a class="header-anchor" href="#_2-为什么要允许一个-pod-内可以包含多个容器" aria-label="Permalink to &quot;2. 为什么要允许一个 Pod 内可以包含多个容器？&quot;">​</a></h4><p>再回答这个问题之前，我们思考一下另外一个问题 &quot;为什么不直接在单个容器里运行多个程序？&quot;。</p><p><strong>由于容器实际上是一个&quot;单进程&quot;的模型</strong>，这点非常重要。因为如果你在容器里启动多个进程，这将会带来很多麻烦。不仅它们的日志记录会混在一起，它们各自的生命周期也无法管理。毕竟只有一个进程的 PID 可以为 1，如果 PID 为 1 的进程这个时候挂了，或者说失败退出了，那么其他几个进程就会自然而然地成为&quot;孤儿&quot;，无法管理，也无法回收资源。</p><p>很多公司在刚开始容器化改造的时候，都会这么去使用容器，把容器当作 VM 来使用，有时候也叫作<strong>富容器模式</strong>。这其实是一种非常不好的尝试，也不符合不可变基础设施的理念。我们可以接受将富容器当作容器化改造的一个短暂的过渡形态，但不能将其作为改造的终态。后续，还需要进一步对这些富容器进行拆分、解耦。</p><p>看到这里，第二个问题的答案已经呼之欲出了。用一个 Pod 管理多个容器，既能够保持容器之间的隔离性，还能保证相关容器的环境一致性。使用粒度更小的容器，不仅可以使应用间的依赖解耦，还便于使用不同技术栈进行开发，同时还可以方便各个开发团队复用，减少重复造轮子。</p><h3 id="如何声明一个-pod" tabindex="-1">如何声明一个 Pod <a class="header-anchor" href="#如何声明一个-pod" aria-label="Permalink to &quot;如何声明一个 Pod&quot;">​</a></h3><p>在 Kubernetes 中，所有对象都可以通过一个相似的 API 模板来描述，即元数据 （metadata）、规范（spec）和状态（status）。这种方式也是从 Borg 吸取的经验，避免过多的 API 定义设计，不利于统一和对接。Kubernetes 有了这种统一风格的 API 定义，方便了通过 REST 接口进行开发和管理。</p><h4 id="元数据-metadata" tabindex="-1">元数据（metadata） <a class="header-anchor" href="#元数据-metadata" aria-label="Permalink to &quot;元数据（metadata）&quot;">​</a></h4><p>metadata 中一般要包含如下 3 个对该对象至关重要的元信息：namespace（命名空间）、name（对象名）和 uid（对象 ID）。</p><ul><li><p>namespace是 Kubernetes 中比较重要的一个概念，是对一组资源和对象的抽象集合，namespace 主要用于逻辑上的隔离。Kubernetes 中有几个内置的 namespace：</p><ul><li><p><strong>default</strong>，这是默认的缺省命名空间；</p></li><li><p><strong>kube-system</strong>，主要是部署集群最关键的核心组件，比如一般会将 CoreDNS 声明在这个 namespace 中；</p></li><li><p><strong>kube-public</strong>，是由 kubeadm 创建出来的，主要是保存一些集群 bootstrap 的信息，比如 token 等；</p></li><li><p><strong>kube-node-lease</strong>，是从 v1.12 版本开始开发的，到 v1.14 版本变为 beta 可用版本，在 v1.17 的时候已经正式 GA 了，它要用于 node 汇报心跳（我们在第一节课已经解释过了心跳的概念），每一个节点都会有一个对应的 Lease 对象。</p></li></ul></li><li><p>对象名比较好理解，就是用来标识对象的名称，在 namespace 内具有唯一性，在不同的 namespace 下，可以创建相同名字的对象。</p></li><li><p>uid 是由系统自动生成的，主要用于 Kubernetes 内部标识使用，比如某个对象经历了删除重建，单纯通过名字是无法判断该对象的新旧，这个时候就可以通过 uid 来进行唯一确定。</p></li></ul><p>当然， Kubernetes 中并不是所有对象都是 namespace 级别的，还有一些对象是集群级别的，并不需要 namespace 进行隔离，比如 Node 资源等。</p><p>除此以外，还可以在 metadata 里面用各种标签 （labels）和注释（annotations）来标识和匹配不同的对象，比如用户可以用标签<code>env=dev</code>来标识开发环境，用<code>env=testing</code>来标识测试环境。我们会在后面的课程中，具体介绍 labels 和 annotations 的一些用途以及它们扮演的角色。</p><h4 id="规范-spec" tabindex="-1">规范 （Spec） <a class="header-anchor" href="#规范-spec" aria-label="Permalink to &quot;规范 （Spec）&quot;">​</a></h4><p>在 Spec 中描述了该对象的详细配置信息，即用户希望的状态（Desired State）。Kubernetes 中的各大组件会根据这个配置进行一系列的操作，将这种定义从&quot;抽象&quot;变为&quot;现实&quot;，我们称之为调和（Reconcile）。用户不需要过度关心怎么达到终态，也不用参与。</p><h4 id="状态-status" tabindex="-1">状态（Status） <a class="header-anchor" href="#状态-status" aria-label="Permalink to &quot;状态（Status）&quot;">​</a></h4><p>在这个字段里面，包含了该对象的一些状态信息，会由各个控制器定期进行更新。也是不同控制器之间进行相互通信的一个渠道。在 Kubernetes 中，各个组件都是分布式部署的，围绕着 kube-apiserver 进行通信，那么不同组件之间进行信息同步，就可以通过 status 进行。像 Node 的 status 就记录了该节点的一些状态信息，其他的控制器，就可以通过 status 知道该 Node 的情况，做一些操作，比如节点宕机修复、可分配资源等。</p><p>现在我们来看一个 Pod 的 API 长什么样子。</p><h4 id="一个-pod-的真实例子" tabindex="-1">一个 Pod 的真实例子 <a class="header-anchor" href="#一个-pod-的真实例子" aria-label="Permalink to &quot;一个 Pod 的真实例子&quot;">​</a></h4><p>下面是我用 Yaml 写的一个 Pod 定义，我做了注释让你一目了然：</p><div class="language-yaml vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#85E89D;">apiVersion</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">v1</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">#指定当前描述文件遵循v1版本的Kubernetes API</span></span>
<span class="line"><span style="color:#85E89D;">kind</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">Pod</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">#我们在描述一个pod</span></span>
<span class="line"><span style="color:#85E89D;">metadata</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">twocontainers</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">#指定pod的名称</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">namespace</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">default</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">#指定当前描述的pod所在的命名空间</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">labels</span><span style="color:#E1E4E8;">: </span><span style="color:#6A737D;">#指定pod标签</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">app</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">twocontainers</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">annotations</span><span style="color:#E1E4E8;">: </span><span style="color:#6A737D;">#指定pod注释</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">version</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">v0.5.0</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">releasedBy</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">david</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">purpose</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">demo</span></span>
<span class="line"><span style="color:#85E89D;">spec</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">containers</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  - </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">sise</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">#容器的名称</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">image</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">quay.io/openshiftlabs/simpleservice:0.5.0</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">#创建容器所使用的镜像</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">ports</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    - </span><span style="color:#85E89D;">containerPort</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">9876</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">#应用监听的端口</span></span>
<span class="line"><span style="color:#E1E4E8;">  - </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">shell</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">#容器的名称</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">image</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">centos:7</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">#创建容器所使用的镜像</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">command</span><span style="color:#E1E4E8;">: </span><span style="color:#6A737D;">#容器启动命令</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#9ECBFF;">&quot;bin/bash&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#9ECBFF;">&quot;-c&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#9ECBFF;">&quot;sleep 10000&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#22863A;">apiVersion</span><span style="color:#24292E;">: </span><span style="color:#032F62;">v1</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">#指定当前描述文件遵循v1版本的Kubernetes API</span></span>
<span class="line"><span style="color:#22863A;">kind</span><span style="color:#24292E;">: </span><span style="color:#032F62;">Pod</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">#我们在描述一个pod</span></span>
<span class="line"><span style="color:#22863A;">metadata</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">twocontainers</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">#指定pod的名称</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">namespace</span><span style="color:#24292E;">: </span><span style="color:#032F62;">default</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">#指定当前描述的pod所在的命名空间</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">labels</span><span style="color:#24292E;">: </span><span style="color:#6A737D;">#指定pod标签</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">app</span><span style="color:#24292E;">: </span><span style="color:#032F62;">twocontainers</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">annotations</span><span style="color:#24292E;">: </span><span style="color:#6A737D;">#指定pod注释</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">version</span><span style="color:#24292E;">: </span><span style="color:#032F62;">v0.5.0</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">releasedBy</span><span style="color:#24292E;">: </span><span style="color:#032F62;">david</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">purpose</span><span style="color:#24292E;">: </span><span style="color:#032F62;">demo</span></span>
<span class="line"><span style="color:#22863A;">spec</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">containers</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">sise</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">#容器的名称</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">image</span><span style="color:#24292E;">: </span><span style="color:#032F62;">quay.io/openshiftlabs/simpleservice:0.5.0</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">#创建容器所使用的镜像</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">ports</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    - </span><span style="color:#22863A;">containerPort</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">9876</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">#应用监听的端口</span></span>
<span class="line"><span style="color:#24292E;">  - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">shell</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">#容器的名称</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">image</span><span style="color:#24292E;">: </span><span style="color:#032F62;">centos:7</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">#创建容器所使用的镜像</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">command</span><span style="color:#24292E;">: </span><span style="color:#6A737D;">#容器启动命令</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">&quot;bin/bash&quot;</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">&quot;-c&quot;</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">&quot;sleep 10000&quot;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br></div></div><p>你可以通过 kubectl 命令在集群中创建这个 Pod。kubectl 的功能比较强大、也比较灵活。我们会在后面的课程中，慢慢会看到 kubectl 的各种使用方法。</p><div class="language-java vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">$ kubectl create </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">f .</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">twocontainers.yaml</span></span>
<span class="line"><span style="color:#E1E4E8;">kubectl get pods</span></span>
<span class="line"><span style="color:#E1E4E8;">NAME                      READY     STATUS    RESTARTS   AGE</span></span>
<span class="line"><span style="color:#E1E4E8;">twocontainers             </span><span style="color:#79B8FF;">2</span><span style="color:#F97583;">/</span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">       Running   </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">          7s</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">$ kubectl create </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">f .</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">twocontainers.yaml</span></span>
<span class="line"><span style="color:#24292E;">kubectl get pods</span></span>
<span class="line"><span style="color:#24292E;">NAME                      READY     STATUS    RESTARTS   AGE</span></span>
<span class="line"><span style="color:#24292E;">twocontainers             </span><span style="color:#005CC5;">2</span><span style="color:#D73A49;">/</span><span style="color:#005CC5;">2</span><span style="color:#24292E;">       Running   </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">          7s</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>创建出来后，稍微等待一下，我们就可以看到，该 Pod 已经运行成功了。现在我们可以通过 exec 进入<code>shell</code>这个容器，来访问<code>sise</code>服务：</p><div class="language-shell vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">$</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">kubectl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">exec</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">twocontainers</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-c</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">shell</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-i</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-t</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">bash</span></span>
<span class="line"><span style="color:#E1E4E8;">[root@twocontainers /]# curl -s localhost:9876/info</span></span>
<span class="line"><span style="color:#E1E4E8;">{</span><span style="color:#B392F0;">&quot;host&quot;</span><span style="color:#79B8FF;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;localhost:9876&quot;,</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;version&quot;:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;0.5.0&quot;,</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;from&quot;:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;127.0.0.1&quot;}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">$</span><span style="color:#24292E;"> </span><span style="color:#032F62;">kubectl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">exec</span><span style="color:#24292E;"> </span><span style="color:#032F62;">twocontainers</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-c</span><span style="color:#24292E;"> </span><span style="color:#032F62;">shell</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-i</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-t</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--</span><span style="color:#24292E;"> </span><span style="color:#032F62;">bash</span></span>
<span class="line"><span style="color:#24292E;">[root@twocontainers /]# curl -s localhost:9876/info</span></span>
<span class="line"><span style="color:#24292E;">{</span><span style="color:#6F42C1;">&quot;host&quot;</span><span style="color:#005CC5;">:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;localhost:9876&quot;,</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;version&quot;:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;0.5.0&quot;,</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;from&quot;:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;127.0.0.1&quot;}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h3 id="写在最后" tabindex="-1">写在最后 <a class="header-anchor" href="#写在最后" aria-label="Permalink to &quot;写在最后&quot;">​</a></h3><p>Pod 是 Kubernetes 项目中实现&quot;容器设计模式&quot;的最佳实践之一，也是 Kubernetes 进行复杂应用编排的基础依赖。引入 Pod 主要基于可管理性和资源共享的目的，希望你能够仔细理解和揣摩 Pod 的这种设计思想，对今后的容器化改造颇有受益。</p><p>我们在后续的课程中会逐渐接触到更为复杂、弹性的应用。下一节课，我将带你实践 Pod。如果你对本节课有什么想法或者疑问，欢迎你在留言区留言，我们一起讨论。</p>`,63),e=[o];function t(r,c,E,i,y,u){return a(),n("div",null,e)}const m=s(l,[["render",t]]);export{b as __pageData,m as default};
