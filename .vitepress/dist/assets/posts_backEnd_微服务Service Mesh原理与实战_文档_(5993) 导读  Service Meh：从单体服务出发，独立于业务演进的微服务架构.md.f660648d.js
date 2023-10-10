import{_ as o,j as i,o as n,g as h,k as s,h as r,Q as t,s as e}from"./chunks/framework.cfb14fe0.js";const N=JSON.parse('{"title":"导读ServiceMeh：从单体服务出发，独立于业务演进的微服务架构","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/微服务Service Mesh原理与实战_文档/(5993) 导读  Service Meh：从单体服务出发，独立于业务演进的微服务架构.md","filePath":"posts/backEnd/微服务Service Mesh原理与实战_文档/(5993) 导读  Service Meh：从单体服务出发，独立于业务演进的微服务架构.md","lastUpdated":1696682708000}'),c={name:"posts/backEnd/微服务Service Mesh原理与实战_文档/(5993) 导读  Service Meh：从单体服务出发，独立于业务演进的微服务架构.md"},p=t('<h1 id="导读servicemeh-从单体服务出发-独立于业务演进的微服务架构" tabindex="-1">导读ServiceMeh：从单体服务出发，独立于业务演进的微服务架构 <a class="header-anchor" href="#导读servicemeh-从单体服务出发-独立于业务演进的微服务架构" aria-label="Permalink to &quot;导读ServiceMeh：从单体服务出发，独立于业务演进的微服务架构&quot;">​</a></h1><p>今天我要和你分享的内容是微服务架构的基础知识。正如我在开篇词提到的，学习 Service Mesh，首先要理解微服务架构。理解微服务架构产生的背景和原因，才能进一步抓住微服务架构的痛点，更清晰地认识到 Service Mesh 解决的问题。</p><h3 id="单体服务架构有哪些问题" tabindex="-1">单体服务架构有哪些问题 <a class="header-anchor" href="#单体服务架构有哪些问题" aria-label="Permalink to &quot;单体服务架构有哪些问题&quot;">​</a></h3><p>单体服务，相信大家都有所了解，在我们最初接触 Web 开发，写一些网站或者 App 的时候，大多使用的是单体服务这种后端技术架构。比如在 Web 2.0 时期，最常见的博客系统 WordPress，就是一个著名的单体服务。因为它<strong>所有的功能模块都在一个代码仓库，并且部署在同一个进程内，是一个典型的单体架构。</strong></p><p>事实上，在不需要快速迭代的业务上，单体服务也可以运行得很好，比如一个小的团队维护一个变更速度没那么快的项目，就像 WordPress 和早期的门户网站。但面对如今移动互联网业务的快速迭代，单体服务就显得力不从心了，一个很大的问题就是，<strong>大量复杂的业务冗杂在一个单体应用中，造成了人员沟通成本和发布迭代成本的急剧上升</strong>。</p><p>为了让你更好地理解从单体服务转向微服务的原因，下面我来具体说说单体服务的问题。</p><h4 id="_1-人员协作问题" tabindex="-1">1. 人员协作问题 <a class="header-anchor" href="#_1-人员协作问题" aria-label="Permalink to &quot;1. 人员协作问题&quot;">​</a></h4><p>所有人员都在一个代码仓库开发，当数量超过 10 人时，协作问题就开始凸显了。比如一个新成员，需要在一个庞大的代码仓库中，找到自己负责的模块部分，假如他在改动自己负责的部分的时候，代码组织并不是很好，就很容易涉及其他人写的代码，这个时候就产生了不必要的沟通成本。即便沟通顺利，也容易引起单体应用中其他部分的故障。</p><h4 id="_2-部署问题" tabindex="-1">2. 部署问题 <a class="header-anchor" href="#_2-部署问题" aria-label="Permalink to &quot;2. 部署问题&quot;">​</a></h4><p>除了协作中的问题，还会<strong>产生上线部署效率</strong> 的问题。当不同人员开发的不同模块，同时需要上线时，如果分别将分支代码合并到主干代码，再按照流程上线，就会产生先后顺序的等待时间；如果合并到一起上线，线上功能一旦出问题，就需要<strong>花费大量时间排查是哪个模块出现的问题</strong>。</p><h4 id="_3-架构演进问题" tabindex="-1">3. 架构演进问题 <a class="header-anchor" href="#_3-架构演进问题" aria-label="Permalink to &quot;3. 架构演进问题&quot;">​</a></h4><p>当我们应用中的某个模块，遇到了性能瓶颈，我们希望以另外一种语言重新编写此模块，这个时候单体应用完全无法演进。<strong>如果我们要替换语言，就得重写整个应用</strong>，花费的成本可想而知。</p><h4 id="_4-程序稳定性问题" tabindex="-1">4. 程序稳定性问题 <a class="header-anchor" href="#_4-程序稳定性问题" aria-label="Permalink to &quot;4. 程序稳定性问题&quot;">​</a></h4><p>在单体应用中，某个模块出现 Bug 时，比如因为疏忽造成了 OOM (程序内存不足)，导致程序 panic，这会导致整个网站或者 App 不可用。一个模块的问题，导致了整个应用挂掉，这在生产环境中是无法接受的。</p><p>随着互联网业务的发展，整体业务越来越复杂，以上问题越来越明显，单体服务已经无法应对如此复杂的业务场景了。互联网行业也从架构上逐步开始了服务拆分，进入了 SOA （Service-Oriented Architecture 面向服务的架构）时代。</p><p>在 SOA 时代，比如淘宝网，采用了一种 ESB 总线的技术，就是所有服务的通信需要通过一个集中式的总线服务（可以理解为集中式网关），这大大降低了服务的通信效率并且增加了单点风险。但是随着业务进一步扩大， ESB 总线的弊端逐步凸显，比如每次服务变更节点都需要人工操作，这大大降低了互联网业务的迭代效率。</p><p>微服务和 SOA 一脉相承，而微服务则不再强调传统 SOA 架构里面比较重的 ESB 企业服务总线。</p><h3 id="微服务有哪些优势" tabindex="-1">微服务有哪些优势 <a class="header-anchor" href="#微服务有哪些优势" aria-label="Permalink to &quot;微服务有哪些优势&quot;">​</a></h3><p>微服务是一种开发软件的架构和组织方法，其中软件由通过明确定义的 API 进行通信的小型独立服务组成，这些服务由各个小型独立团队负责。<strong>微服务架构使应用程序更易于扩展、更快开发，从而加速创新并缩短新功能的上市时间</strong>。与单体应用相比，微服务能够更好地满足互联网时代业务快速变化的需要。</p><p>接下来我们看一看微服务相对于单体服务都有哪些优势。</p><h4 id="_1-敏捷开发" tabindex="-1">1. 敏捷开发 <a class="header-anchor" href="#_1-敏捷开发" aria-label="Permalink to &quot;1. 敏捷开发&quot;">​</a></h4><p>一个小的团队，甚至一个人，负责一个或者多个服务，当有新的需求出现，可以快速对这个小型服务做出修改并上线。但是当维护一个庞大的代码仓库构成的单体服务时，即使是一个简单的需求、只修改了一行代码，开发人员也会因为这行代码可能会影响整个应用，而降低部署的频率，从而累计多次代码提交再产生一次新的部署。</p><p>而我们知道两个版本的代码变动越多，产生问题的可能性就越大，甚至造成更严重的线上问题。相比之下，<strong>微服务可以让服务更敏捷地开发上线，这符合现在互联网业务快速迭代的特征</strong>。</p><h4 id="_2-技术自由" tabindex="-1">2. 技术自由 <a class="header-anchor" href="#_2-技术自由" aria-label="Permalink to &quot;2. 技术自由&quot;">​</a></h4><p>微服务团队，可以选择自己喜欢的技术或者语言，并<strong>不需要局限在同一种语言</strong>上。当出现了一种新的语言更适合解决现在的问题，团队可以快速做出反应，用新的语言编写新的服务或者改写旧的服务，不必考虑采用新语言带来的不确定性和成本问题。</p><h4 id="_3-弹性扩缩容" tabindex="-1">3. 弹性扩缩容 <a class="header-anchor" href="#_3-弹性扩缩容" aria-label="Permalink to &quot;3. 弹性扩缩容&quot;">​</a></h4><p>微服务可以<strong>灵活地应对服务的扩缩容问题</strong>。在单体服务中，假设某个接口在高峰期有较大的访问量，需要比平时增加一些机器应对，但我们很难根据 CPU 的水位做出准确的判断，因为所有接口都在一个应用中，而在微服务中做出这种判断要容易得多。</p><h4 id="_4-组织匹配" tabindex="-1">4. 组织匹配 <a class="header-anchor" href="#_4-组织匹配" aria-label="Permalink to &quot;4. 组织匹配&quot;">​</a></h4><p>在技术架构中，这是一个非常重要的概念。任何架构都应该和组织架构相匹配，在康威定律中已经明确地说明了这一点：如果技术架构和组织架构不匹配，会造成严重的跨部门沟通效率问题。随着业务的不断扩大，组织结构肯定会变得更复杂，而单体服务几乎无法配合这种变化。</p><p><strong>微服务架构可以非常好地与组织架构相匹配</strong>，比如一个短视频业务，在业务发展到一定阶段，很自然地会拆分出用户增长部门和内容部门。而我们的微服务架构，也可以将不同的服务拆分到相应的部门中，降低维护和沟通的成本。</p><h3 id="没有银弹" tabindex="-1">没有银弹 <a class="header-anchor" href="#没有银弹" aria-label="Permalink to &quot;没有银弹&quot;">​</a></h3><p><strong>与其他现存的架构和解决方案一样，微服务架构也不是银弹</strong>。当然它解决了单体服务很多问题，但同时也带来了单体服务中一些没有的问题，比如负载均衡、服务治理、服务注册发现、如何拆分服务等，当然其中的大部分问题，都可以通过技术手段解决，但也增加了系统的复杂性。</p><p>下面，我们来进一步了解一下 Service Mesh 架构的演进。</p><p>Service Mesh，中文名叫作服务网格，简单来说就是将可以配置的代理层和服务部署在一起，作为微服务基础设施层接管服务间的流量，并提供通用的服务注册发现、负载均衡、身份验证、精准路由、服务鉴权等基础功能。</p><h3 id="service-mesh-的演进历程" tabindex="-1">Service Mesh 的演进历程 <a class="header-anchor" href="#service-mesh-的演进历程" aria-label="Permalink to &quot;Service Mesh 的演进历程&quot;">​</a></h3><h4 id="sidecar-时代" tabindex="-1">sidecar 时代 <a class="header-anchor" href="#sidecar-时代" aria-label="Permalink to &quot;sidecar 时代&quot;">​</a></h4><p>实际上早在2013年，作为微服务架构的大规模应用方 Netflix， 就发现了微服务架构在跨语言上的问题。Netflix 大量使用 Java 技术栈，但因为公司的业务发展，使用单一技术栈是不现实的。语言总是有特定的应用场景，这个时候 Netflix 发现开发多语言的 SDK 要耗费大量的人力，毕竟 Spring Cloud 里的组件可不是一般的多，为每个语言开发一套，显然得不偿失，所以就想到了 sidecar 模式，把 SDK 里的功能转移到 sidecar 中。</p><p>如下图所示：</p>',38),l=t('<p>Service Mesh sidecar 模式图</p><p>所谓 sidecar， 其实就是一个<strong>部署在本地的代理服务器</strong>，它既接管了入口流量，也接管了出口流量。其实这种模式要追溯到 Web Server 的时代，比如 Nginx + Php-fpm 这种模式，实际上 Nginx 也是充当了 sidecar 的角色，只是通信协议由比较常见的 HTTP ，变成了 FastCGI ，另外 Nginx 只是代理了入口流量，并未代理出口流量。</p><h4 id="初代-service-mesh" tabindex="-1">初代 Service Mesh <a class="header-anchor" href="#初代-service-mesh" aria-label="Permalink to &quot;初代 Service Mesh&quot;">​</a></h4><p>在 sidecar 模式中，就像 Netflix 的初衷一样，它更多的是<strong>为了解决公司非主力语言的 SDK 开发问题</strong> ，<strong>非主力语言通过 sidecar 连接，而主力语言还是通过 SDK 的方式</strong>。</p><p>技术不断发展，人们慢慢意识到统一流量处理模型的重要性，于是诞生了第一代 Service Mesh，其中比较出名的是 Linkerd 和 Envoy。在这一代 Service Mesh 中，已经<strong>不再依赖特定的基础设施</strong> ，最重要的是它的出发点已经不是解决多语言的问题，而是<strong>从统一流量处理模型的角度，形成了一套统一的流量控制的解决方案</strong>。</p><p>但是初代 Service Mesh 有一个致命的问题（其实也一直存在于微服务架构中），就是<strong>缺乏统一的管控手段</strong>，比如 sidecar 的服务治理相关配置文件的维护，可能需要运维手动维护、无法集中管理，因为这个原因，控制面诞生了。</p><h4 id="新一代-service-mesh" tabindex="-1">新一代 Service Mesh <a class="header-anchor" href="#新一代-service-mesh" aria-label="Permalink to &quot;新一代 Service Mesh&quot;">​</a></h4><p>新一代 Service Mesh，就是大家熟知的 Istio 了。它引入了控制面的概念，让 Service Mesh 成为完全体。</p><p>Istio 使用 Envoy 作为数据面，控制面和 Kubernetes 深度绑定，早期版本将流量治理的功能放在 mixer 中，形成了一套完整的 Service Mesh 解决方案。<strong>控制面负责了资源管理、配置下发、证书管理等功能，解决了数据面配置难以管理的问题</strong>。</p><p>讲完了 Service Mesh 的发展史，现在你应该对 Service Mesh 的有了初步的了解。下面我们就来看一下 Service Mesh 到底解决了传统微服务架构中的哪些痛点吧。</p><h3 id="service-mesh-的优势" tabindex="-1">Service Mesh 的优势 <a class="header-anchor" href="#service-mesh-的优势" aria-label="Permalink to &quot;Service Mesh 的优势&quot;">​</a></h3><h4 id="_1-语言无关" tabindex="-1">1.语言无关 <a class="header-anchor" href="#_1-语言无关" aria-label="Permalink to &quot;1.语言无关&quot;">​</a></h4><p>提到 Service Mesh 的优点，或许你最容易想到的就是业务语言无关性了，实际上我们在微服务架构也经常提到这个优点。但是对于传统的微服务架构，Service Mesh 做到了真正的语言无关：<strong>传统的微服务架构要为各种语言开发 SDK ，而 Service Mesh 将 SDK 的功能集成到 sidecar 中，实现了真正的语言无关性</strong>。</p><h4 id="_2-基础设施独立演进" tabindex="-1">2.基础设施独立演进 <a class="header-anchor" href="#_2-基础设施独立演进" aria-label="Permalink to &quot;2.基础设施独立演进&quot;">​</a></h4><p>传统微服务架构中，业务代码和框架/SDK 混合在一起，框架想要升级就会变得非常困难而且被动，当微服务的数量变多时，想要在公司内推动框架的全量升级可谓是&quot;天方夜谭&quot;。而<strong>Service Mesh 架构将框架中和业务无关的通用功能放在 sidecar 中，升级时只要升级 sidecar 就可以了，这样做到了基础设施的独立演进</strong>。</p><p>实际上这种做法也带来了另外一个好处：写框架的时候不用再考虑太多的向后兼容性，降低了编写代码的心智负担。</p><h4 id="_3-可观测性" tabindex="-1">3.可观测性 <a class="header-anchor" href="#_3-可观测性" aria-label="Permalink to &quot;3.可观测性&quot;">​</a></h4><p>可观测性一般包含两个部分：<strong>监控报警和链路追踪</strong>。</p><ul><li><p>监控报警可以通过数据面的 Metrics 集成，无感知地做到系统监控报警，减少了业务和框架的重复工作。</p></li><li><p>至于链路追踪，因为需要通过 header 将 traceid 传递下去，所以还是需要客户端的 SDK 将 traceid 通过 header 传递。不过这个做法也简化了 Trace SDK 的封装。</p></li></ul><h4 id="_4-边缘网关统一" tabindex="-1">4.边缘网关统一 <a class="header-anchor" href="#_4-边缘网关统一" aria-label="Permalink to &quot;4.边缘网关统一&quot;">​</a></h4><p>实际上 sidecar 本身就是一个网关/反向代理，自然可以将以前 Nginx/Kong 之类的系统网关迁移到 sidecar 上来，这样就可以<strong>维护一套统一的代码</strong>。</p><p>更进一步，可以将以前边缘网关的工作，比如鉴权、 trace 初始化等工作下沉到 sidecar 上，进一步<strong>简化系统网关的功能</strong>。</p><h3 id="service-mesh-的基础组件及常见名词" tabindex="-1">Service Mesh 的基础组件及常见名词 <a class="header-anchor" href="#service-mesh-的基础组件及常见名词" aria-label="Permalink to &quot;Service Mesh 的基础组件及常见名词&quot;">​</a></h3><p>Service Mesh 一个最重要的变革，就是引入了数据面和控制面的概念，这个概念也并非 Service Mesh 新创的概念，实际上在 SDN (软件定义网络)中就有了控制面和数据面的概念。在课程正式开始前，我们先简单了解一下控制面和数据面。</p><p><strong>数据面(Data Plane)</strong></p><p>负责数据的转发，一般我们常见的通用网关、Web Server，比如 Nginx、Traefik 都可以认为是数据面的一种。<strong>在 Service Mesh 的开源世界中，Envoy 可以说是最知名的数据面了</strong>。</p><p>另外数据面<strong>并非局限于网关类产品，实际上某些 RPC 框架也可以充当数据面</strong>，比如 gRPC 就已经支持完整的 xDS(数据面和控制面的交互协议)，也可以当作数据面使用。一般我们把负责数据转发的数据面称为 sidecar（边车）。</p><p><strong>控制面(Control Plane)</strong></p><p>通过 xDS 协议对数据面进行配置下发，以控制数据面的行为，比如路由转发、负载均衡、服务治理等配置下发。控制面的出现解决了无论是框架还是数据面、sidecar 都缺乏控制能力的弊端，而且之前只能通过运维批量修改 CONF 来控制数据面、导致规模上升时纯人工维护成本以及大幅度上升的错误概率等问题也得到了很好的解决。</p><p>实际上 Service Mesh 需要的基础组件和传统的微服务没有太大的差别，很多公司选择自研控制面就是为了兼容老版本微服务的基础组件。</p><p>下面我们一起看一下 Service Mesh 的基础组件。</p><p><strong>服务注册中心</strong>：服务间通信的基础组件。服务通过注册自身节点，让调用方服务发现被调方服务节点，以达到服务间点对点通信的目的。</p><p><strong>配置中心</strong>：用于服务的基础配置更新，以达到代码和配置分离的目的。减少服务的发布次数，配置发布可以更快更及时地变更服务。</p><p><strong>API 网关</strong>：通过统一的网关层，收敛服务的统一鉴权层、链路 ID 生成等基础服务，并聚合后端服务为客户端提供 RESTful 接口。另外 API 网关也负责南北向流量(外网入口流量)的流量治理。</p><p><strong>服务治理</strong>：通过限流、熔断等基础组件，杜绝微服务架构出现雪崩的隐患。</p><p><strong>链路追踪</strong>：通过 trace 将整个微服务链路清晰地绘制出来，并进行精准的故障排查，极大地降低了故障排查的难度。</p><p><strong>监控告警</strong>：通过 Prometheus 和 Grafana 这样的基础组件，绘制服务状态监控大盘，针对资源、服务、业务各项指标，做精准的监控报警。</p><p>说完了基础组件，再说一下一些常见的名词解释，便于你理解 Service Mesh。</p><p><strong>Upstream</strong>: 上游服务，如果 A 服务调用 B 服务，在 A 服务的视角来看，B 服务就是上游服务，但是在中文的语境中，经常被叫作&quot;下游服务&quot;。所以在整个课程中，为了避免语言上的歧义，我会直接使用upstream，而不是中文翻译。在中文的语境中，我更喜欢称它为服务端或者被调用方。</p><p><strong>Downstream</strong>: 下游服务，如果 A 服务调用 B 服务，在 B 服务的视角中，A 服务就是下游服务。在中文的语境中，我更喜欢叫客户端或者调用方。</p><p><strong>Endpoint</strong>：指的是服务节点，比如 A 服务有 192.168.2.11 和 192.168.2.12 两个服务节点。</p><p><strong>Cluster</strong>：指的是服务集群，比如 A 服务有 192.168.2.11 和 92.168.2.12 两个服务节点，那么A服务就是 Cluster，也可以直接理解为 Service。</p><p><strong>Node</strong>：在 Kubernetes 语境中，指的是承载 pod 的服务器，但在微服务的语境中，更多的等同于Endpoint。</p><p><strong>Route</strong>：指的是 Service Mesh 中的路由配置，比如 A 服务访问 B 服务，要匹配到一定的规则，比如 header 中要带有服务名(-H servicename:B)，才能够拿到 B 服务的访问方式，通过服务发现或者静态列表访问到 B 服务的节点。</p><p><strong>Listener</strong>：指的是 Service Mesh 的监听端口，通常我们访问 Service Mesh 的数据面，需要知道数据面的监听端口。</p><h3 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h3><p>这一讲我主要讲解了为什么从单体服务演进到微服务以及 Service Mesh 的基础知识（包括演进历程和优点、基础组件等内容 ）。整体来看，如果你的业务还处在一个起步阶段，我个人还是不建议过早地进行微服务拆分，因为架构演进的<strong>一个重要的原则，就是组织架构要和技术架构相匹配</strong>。</p>',47),d=e("p",null,"在起步阶段，单体服务是和组织架构匹配度最高的技术架构，当然一些小的、稳定的服务，可以尝试拆出来，这些服务变化不大、不会造成过多的和人力不匹配的维护成本，当然这也是为应对将来业务发展采用微服务架构的一种准备。而且我们作为技术研发人员，一定要对未来有更充分的准备，比如提前做好微服务相关的技术储备；否则当业务迎来了高速发展，你却不能跟上公司的节奏，结果就可想而知了。",-1),_=e("p",null,"本节内容到这里就结束了，下一个篇章我会详细展开讲解微服务和 Service Mesh 的基础组件。",-1),g=e("p",null,"学习了 Service Mesh 的基础知识后，你觉得 Service Mesh 适合哪些应用场景呢？如果让你结合公司的现状，你会选择传统微服务架构还是 Service Mesh 呢？欢迎在留言区和我分享你的观点。我们下一讲再见。",-1),S=e("hr",null,null,-1),u=e("p",null,"[",-1),v=e("p",null,[r("]("),e("a",{href:"https://shenceyun.lagou.com/t/Mka",target:"_blank",rel:"noreferrer"},"https://shenceyun.lagou.com/t/Mka"),r(")")],-1),m=e("p",null,[e("a",{href:"https://shenceyun.lagou.com/t/Mka",target:"_blank",rel:"noreferrer"},"拉勾背书内推 + 硬核实战技术干货，帮助每位 Java 工程师达到阿里 P7 技术能力。点此链接，快来领取！")],-1);function M(b,q,f,P,x,k){const a=i("Image");return n(),h("div",null,[p,s(a,{alt:"Lark20201221-143013.png",src:"https://s0.lgstatic.com/i/image2/M01/03/A3/Cip5yF_gQQmABXu_AA2cEKASe2E309.png"}),r(),l,s(a,{alt:"Lark20201221-143007.png",src:"https://s0.lgstatic.com/i/image2/M01/03/A5/CgpVE1_gQR-Ac3f6AAF5oHL2Guo835.png"}),r(),d,_,g,S,u,s(a,{alt:"java_高薪训练营.png",src:"https://s0.lgstatic.com/i/image/M00/8B/BD/Ciqc1F_gEFiAcnCNAAhXSgFweBY589.png"}),r(),v,m])}const B=o(c,[["render",M]]);export{N as __pageData,B as default};
