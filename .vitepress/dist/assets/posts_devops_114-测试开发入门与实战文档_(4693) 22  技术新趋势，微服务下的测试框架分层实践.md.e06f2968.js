import{_ as o,j as n,o as l,g as r,k as e,h as a,Q as t,s}from"./chunks/framework.4e7d56ce.js";const x=JSON.parse('{"title":"22技术新趋势，微服务下的测试框架分层实践","description":"","frontmatter":{},"headers":[],"relativePath":"posts/devops/114-测试开发入门与实战文档/(4693) 22  技术新趋势，微服务下的测试框架分层实践.md","filePath":"posts/devops/114-测试开发入门与实战文档/(4693) 22  技术新趋势，微服务下的测试框架分层实践.md","lastUpdated":1696682708000}'),i={name:"posts/devops/114-测试开发入门与实战文档/(4693) 22  技术新趋势，微服务下的测试框架分层实践.md"},c=t('<h1 id="_22技术新趋势-微服务下的测试框架分层实践" tabindex="-1">22技术新趋势，微服务下的测试框架分层实践 <a class="header-anchor" href="#_22技术新趋势-微服务下的测试框架分层实践" aria-label="Permalink to &quot;22技术新趋势，微服务下的测试框架分层实践&quot;">​</a></h1><p>我们知道，没有微服务之前，我们的应用都是单体应用，但是单体应用有如下明显缺点。</p><ul><li>部署成本高， 部署频率低</li></ul><p>由于单体服务只能统一部署，假设单体服务有很多个模块，即使你只改动了其中一个模块，在部署时，你都必须全量部署。而当业务复杂时，部署动辄花费数十分钟，甚至数小时之久，在这段时间内，应用就无法正常对外提供服务，部署的成本非常高。</p><p>正因为部署的成本很高，所以单体服务的部署通常会积累一定的需求后，统一部署，把部署频率降低来减少服务不可用时间，这就导致了单体应用无法适应快速变化的外部环境，以及无法及时响应客户的需求。</p><ul><li>改动影响大，风险高</li></ul><p>在单体服务架构下，无论你是改动一行代码，还是改动多个模块的代码，都要经历重新编译、打包、测试和部署。这样一来，改动的影响就非常大，无论是开发人员还是测试人员，都疲于奔命。如果测试不充分，还会导致服务不可用，发布风险非常大。</p><ul><li>技术债务多，扩展困难</li></ul><p>单体应用由于所有的模块都在一块，会导致模块的边界比较模糊，依赖关系不清晰。并且随着时间的推移，这些相互依赖的地方，逻辑关系越来越难以理顺，逐渐就会变成技术债务。</p><p>单体应用所有模块和功能都耦合在一块，但是这些模块之间，需要的软硬件资源确不尽相同， 单体应用为了保证可用性，必须使得软硬件资源满足每一个模块的需求，这样不仅造成了资源的浪费，还导致了扩展的困难（无法按模块扩展）。</p><p>正是由于这些原因，微服务架构应运而生，而本讲我们就介绍微服务下的分层测试实践，下图是我们这一讲的知识脑图，可供你学习参考。</p>',11),_=s("p",null,"既然是微服务下的分层测试实践，我们就要先搞清楚，什么是微服务？",-1),d=s("h3",{id:"什么是微服务",tabindex:"-1"},[a("什么是微服务？ "),s("a",{class:"header-anchor",href:"#什么是微服务","aria-label":'Permalink to "什么是微服务？"'},"​")],-1),h=s("p",null,"在《课前必读 1 | 敏捷，DevOps，微服务带给测试人员的挑战》这个章节里，我提到过微服务的定义：",-1),u=s("blockquote",null,[s("p",null,"微服务是一种开发软件的架构和组织方法，其中软件由通过明确定义的 API 进行通信的小型独立服务组成，这些服务由各个小型独立团队负责。微服务架构使应用程序更易扩展和更快地开发，从而加速创新并缩短新功能的上市时间。")],-1),g=s("p",null,[a("微服务相对于单体应用来说，最大的不同是微服务"),s("strong",null,"将单体应用拆分，变成一个个的单独功能，每个功能都被称为一项微服务，每个微服务围绕具体的业务，能够单独部署、发布"),a("。各个微服务之间一般通过 RESTFUL 集成。")],-1),E=s("p",null,"下面这个图展示了单体应用和微服务之间的区别：",-1),A=t('<h3 id="微服务之-cap-定理" tabindex="-1">微服务之 CAP 定理 <a class="header-anchor" href="#微服务之-cap-定理" aria-label="Permalink to &quot;微服务之 CAP 定理&quot;">​</a></h3><p>微服务本质上是分布式服务。分布式服务遵循 CAP 定理，即在一个互相连接并共享数据的节点的分布式系统中，当涉及读写操作时，在一致性（Consistence）、可用性（Availability）、分区容错性（Partition Tolerance）三者中， 只能保证两者可用。</p><blockquote><p>C（Consistency）：一致性，即数据一致性。更新操作成功并返回客户端完成后，所有节点在同一时间的数据完全一致，一致性分为强一致性和最终一致性。</p><p>A（Availability）：可用性，即服务的高可用。某个服务瘫痪不影响整个分布式系统的正常运行。</p><p>P（Partition Tolerance）：分区容错性，也叫作分区耐受性。分布式系统在遇到某节点或网络分区故障的时候，仍能够对外提供满足一致性和可用性的服务。</p></blockquote><p>为什么 CAP 同时只能满足两个呢？因为在事务执行过程中，系统其实处于一个不一致的状态，不同的节点的数据并不完全一致。</p><p>CAP 理论有什么作用呢？ 它指导了分布式服务下的系统设计。即在 P（分区容错性）发生的前提下（分区容错性无法避免），A（一致性）和 C（可用性）之间，能选择一个作为系统设计的目标。如果追求 A（一致性），则无法保证所有节点的 C（可用性）；如果追求所有节点的 C（可用性），则无法做到 A（一致性）。</p><h3 id="微服务解决了什么问题" tabindex="-1">微服务解决了什么问题？ <a class="header-anchor" href="#微服务解决了什么问题" aria-label="Permalink to &quot;微服务解决了什么问题？&quot;">​</a></h3><p>我们把单体应用拆解成微服务，会有什么收益呢？ 举个例子来说，单体应用内部是由许多组件组成的，如果一个组件更改了，就不得不更新整个应用。 另外随着业务的发展，组件之间的依赖、复杂度不断增加。此时，一个组件出问题就可能导致整个应用不可用。</p><p><strong>由此可见，微服务首先解决了组件间的互相依赖问题。</strong> 除此之外，微服务还有如下好处。</p><h4 id="_1-独立部署-系统更加健壮" tabindex="-1">1. 独立部署，系统更加健壮 <a class="header-anchor" href="#_1-独立部署-系统更加健壮" aria-label="Permalink to &quot;1. 独立部署，系统更加健壮&quot;">​</a></h4><p>把单体应用拆分为微服务，首当其冲的好处就是独立部署。独立部署，一方面使得部署上线的时间可以缩短，另一方面，一个微服务的不可用， 不会影响到其他的微服务。</p><p>独立部署使得系统的健壮性变强。</p><h4 id="_2-开发技术多元" tabindex="-1">2. 开发技术多元 <a class="header-anchor" href="#_2-开发技术多元" aria-label="Permalink to &quot;2. 开发技术多元&quot;">​</a></h4><p>使用微服务后，微服务之间的访问、调用，可以走统一的 RESTFUL HTTP 协议来通信。只要对外的接口不变，在微服务内部，技术团队可以采用自己最擅长的编程语言、数据库等。而这些是单体应用无法想象的。</p><p>在新技术出现时，微服务可以快速引入小部分升级；但单体应用做不到，技术更新的成本非常高。</p><p>因此微服务使得开发技术更加多元化。</p><h4 id="_3-快速扩展并减少资源浪费" tabindex="-1">3. 快速扩展并减少资源浪费 <a class="header-anchor" href="#_3-快速扩展并减少资源浪费" aria-label="Permalink to &quot;3. 快速扩展并减少资源浪费&quot;">​</a></h4><p>单体应用的扩展，其水平扩展能力非常有限，大部分的扩展依赖垂直扩展。但由于单体应用是一个整体，势必造成资源浪费。比如，有的模块是计算密集型需要更强的 CPU，有的模块是 I/O 密集型需要更大的内存支持，但是由于单体应用无法拆开部署，导致了硬件必须同时满足这两种需求，这就造成了资源的浪费。</p><p>而微服务的水平扩展非常容易，垂直扩展也可以拆分部署，减少了浪费。</p><h4 id="_4-服务之间边界清晰" tabindex="-1">4. 服务之间边界清晰 <a class="header-anchor" href="#_4-服务之间边界清晰" aria-label="Permalink to &quot;4. 服务之间边界清晰&quot;">​</a></h4><p>一般情况下，一个微服务负责提供一个模块功能。我们用订单信息的共享和调用来举例，在没有把这个功能变成一个微服务前，由于各个业务模块都会用到订单信息，那么就可能存在各个业务模块自己去写代码来访问订单信息数据库（通常是通过 DAO 层来拼接 SQL）的情况，这样就造成了代码的重复编写。而且，随着调用的模块增多，你很难知道到底有多少模块存在自己访问订单信息的情况。</p><p>而有了微服务后，订单信息的获取由订单微服务统一提供，这样业务边界就变得非常清晰。</p><h3 id="微服务给测试带来的挑战及解决之道" tabindex="-1">微服务给测试带来的挑战及解决之道 <a class="header-anchor" href="#微服务给测试带来的挑战及解决之道" aria-label="Permalink to &quot;微服务给测试带来的挑战及解决之道&quot;">​</a></h3><p>我们都知道，在软件开发领域，&quot;没有银弹&quot;（No Silver Bullet）是一种普遍共识。 微服务解决了这么多的问题，也势必会带来新的问题。下面我们来看下，微服务带给测试的挑战有哪些。</p><h4 id="_1-测试环境部署困难-服务容器化" tabindex="-1">1. 测试环境部署困难------服务容器化 <a class="header-anchor" href="#_1-测试环境部署困难-服务容器化" aria-label="Permalink to &quot;1. 测试环境部署困难------服务容器化&quot;">​</a></h4><p>想一下这个问题，你的单体应用被拆分成多个微服务，而你只负责其中一个微服务的测试，那么，你如何进行你的测试？</p><p>因为微服务独立部署、独立发布的特性，搭建起一套可用的测试环境变得困难起来。加上微服务导致的技术多元化，有时候需要测试人员为不同语言、不同数据库的服务去搭建各自的环境，从而导致测试成本增加。</p><p>于是，<strong>服务容器化</strong> 应运而生。通过<strong>Docker 容器及镜像</strong>，可以做到环境部署简单，可配置。不仅如此，使用 Docker 镜像部署，保证了开发和测试环境的一致性，避免了由于开发环境和测试环境不一致带来的各种问题。</p><h4 id="_2-微服务下整合测试困难-契约测试" tabindex="-1">2. 微服务下整合测试困难------契约测试 <a class="header-anchor" href="#_2-微服务下整合测试困难-契约测试" aria-label="Permalink to &quot;2. 微服务下整合测试困难------契约测试&quot;">​</a></h4><p>实施微服务后， 你负责测试的微服务可能被其他微服务依赖，而你也可能需要其他微服务提供数据，才能开展你的测试工作。</p><p>但是微服务通常伴随着团队划分，即负责不同微服务的人处于不同的团队。这样， 你们互相不了解对方的业务，在两方微服务需要进行整合，以及联调测试时，测试就变得非常困难。即使你们联调测试通过，在后续业务的开发中，可能各自又更改了微服务对外的接口，那么下次联调测试时，你们互相不知道对方对外服务的接口有改变。那么，测试又是一场噩梦。</p><p>于是，契约测试（Pact）， 特别是消费者驱动的<strong>契约测试</strong>（Consumer-Driven Contracts）应运而生。契约测试是用来验证服务提供方（Provider）和服务消费者（Consumer）彼此之间契约是否(Pact)完备正确的测试活动。</p><p>由于有了契约测试，服务提供方改动契约而导致的测试失败能够立即被发现，这让联调测试不再是噩梦。假若有一天契约改变了，我们也可以通过更换契约文件来保证双方都得到通知，从而避免测试噩梦。</p><h4 id="_3-非功能性测试容易被忽略-全链路压测" tabindex="-1">3. 非功能性测试容易被忽略------全链路压测 <a class="header-anchor" href="#_3-非功能性测试容易被忽略-全链路压测" aria-label="Permalink to &quot;3. 非功能性测试容易被忽略------全链路压测&quot;">​</a></h4><p>单个微服务下的功能测试跟单体应用下的功能测试并没有区别，但微服务整体对外提供服务后，测试人员很容易对非功能性的测试认识不足。</p><p>比如，单个微服务功能、性能都满足要求，但是多个微服务集成为系统整体向外提供服务时，由于可能的网络延迟带来额外的性能开销，可能会使得性能相对于单体应用有所下降。</p><p>另外，由于一条调用链路上的不同微服务能够承受的最大压力不一样，如果微服务没有&quot;降级&quot;&quot;限流&quot;和&quot;熔断&quot;的能力，当某个微服务接收到的请求超出它能够处理的最大强度时，系统就有&quot;雪崩&quot;的可能。</p><p>那么如何保证跨服务调用的可靠性，以及整个系统集成后的性能不受影响呢？全链路压测近年来变得越来越重要，并逐渐演化成为系统性能保驾护航的重要途径。</p><p>要实施<strong>全链路压测</strong>，必须注意以下问题。</p><ul><li><strong>理顺全业务核心链路</strong></li></ul><p>既然是全链路，就需要联合业务相关方，理顺业务逻辑，最终生成从真实用户角度出发，如何使用系统业务的各个操作，并将它们组成一个个的测试链路。</p><p>在实施中，常常将核心业务和非核心业务进行拆分，从核心业务出发，逐渐扩展到非核心业务。</p><ul><li><strong>做好数据模型构建</strong></li></ul><p>实施全链路压测的一大难点便是测试数据模型的构造、数据流量的引入，以及数据的脱敏和隔离。</p><p>在实践中，数据流量的引入往往是从生产环境数据库中获取数据，经过数据的脱敏后进行使用。因为全链路压测一般直接使用生产环境测试，所以还需防止测试数据污染（通常会采用数据隔离，写影子库的方式来避免）。</p><ul><li><strong>做好系统容量规划</strong></li></ul><p>因为全链路压测常常在生产环境运行，而压测会产生大量的流量压力，所以在执行全链路压测之前，必须做好系统容量的规划工作，防止因为测试时忽然增大的流量压力，造成系统不堪重负甚至宕机。</p><p>在实施上，通常全链路压测会从单个接口、单个微服务的基准测试做起，并逐渐扩大到全部微服务。</p><p>全链路压测近年来逐渐演化成一个专门的测试领域，无论其工具选型、技术方案均与常规的测试有所不同，建议大家根据自身业务需求，找到合适自身业务的技术方案。</p><p>而除了性能问题需要关注外，微服务也要关注<strong>幂等测试</strong>。</p><p>以下单扣除金额为例，在复杂的生产环境里，可能发生某个微服务，或者某个接口忽然不可用，导致这一笔金额扣除的业务链没有全部执行完毕，业务的执行在中间的某个过程失败了（业务没走到最终态）。当微服务或者微服务接口恢复提供服务后，这些没走完的请求，应该能继续执行下去，并最终达到最终态。当业务达到最终态后，拿具备相同订单 id 的请求再次发送请求，系统将直接返回结果而不去执行。</p><h4 id="_4-分库分表增大了测试难度-写反向查找函数" tabindex="-1">4. 分库分表增大了测试难度------写反向查找函数 <a class="header-anchor" href="#_4-分库分表增大了测试难度-写反向查找函数" aria-label="Permalink to &quot;4. 分库分表增大了测试难度------写反向查找函数&quot;">​</a></h4><p>虽然单体应用也可以分库分表，但是微服务往往伴随着分库分表，因为每个微服务通常都有自己独立的数据库，那么分库就变成自然的一个操作，而随着业务发展，数据量累积到一定程度，也必然会分库、分表。</p><p>分库分表给测试带来的最大问题是<strong>测试数据的构造和获取变得复杂</strong>。例如在开始测试时创建了一个用户，这个用户根据规则（通常是根据数值取模）创建后，用户的各项信息被存储到了 user_1 这个表；等到用户下单时，系统要根据 user id 去查询当前用户的状态，那么就需要我们反向根据 user id 获取到这个用户所在的表后再进行操作。</p><p>分库分表的算法往往不同，测试人员需要根据分库分表算法写个反向查找函数，或者提供一个服务供其他测试人员调用，这对代码能力有一定要求。</p><blockquote><p>关于如何分库分表，由于细节较多，解释起来所占篇幅较多，我不在此详述。可参考我公众号 iTesting 上发布的文章《<a href="https://mp.weixin.qq.com/s/j5EhS11n1jogHJVyC0jY6A" target="_blank" rel="noreferrer">分库分表小结 - 论QA的自我修养</a>》。</p></blockquote><h4 id="_5-端到端测试变得困难-mock-服务" tabindex="-1">5. 端到端测试变得困难------Mock 服务 <a class="header-anchor" href="#_5-端到端测试变得困难-mock-服务" aria-label="Permalink to &quot;5. 端到端测试变得困难------Mock 服务&quot;">​</a></h4><p>由于微服务的复杂性，在测试阶段，测试环境可能无法拥有与线上系统一样完备的环境以供测试 。特别是当你的服务存在外部 service 依赖、第三方调用、通知的情况时，比如你的服务调用银行接口，在端到端测试时就会因为对方服务无法连通而失败，或者能够连通，但是调用需要收费。此时端到端测试变得困难甚至不可能。</p><p>微服务中往往需要大量的 Mock 来过滤掉与当前任务无关的请求。在测试环境进行端到端测试时，可以使用 Mock 服务过滤无关请求，将重点放在当前微服务本身上。</p><p>关于如何搭建 Mock Server，以及如何利用 Mock Server 进行测试，我将在下一讲《23 | 告别依赖，Mock Server 必杀技》中为大家详细讲解。</p><h4 id="_6-微服务依赖导致上线、回滚困难-分析清楚依赖关系" tabindex="-1">6. 微服务依赖导致上线、回滚困难------分析清楚依赖关系 <a class="header-anchor" href="#_6-微服务依赖导致上线、回滚困难-分析清楚依赖关系" aria-label="Permalink to &quot;6. 微服务依赖导致上线、回滚困难------分析清楚依赖关系&quot;">​</a></h4><p>在微服务实施后，由于相互之间存在依赖，上线和回滚要遵照一定的顺序，否则可能会引发系统崩溃。</p><p>例如，微服务 A 和微服务 B 均是准备上线的新服务。微服务 A 依赖微服务 B，当部署时，必须先部署 B，如果部署顺序错误，比如 A 先上线，就可能会发生，由于 A 找不到 B，而出现 Error 500、404 的情况。</p><p>回滚时也是如此，假设微服务 A 依赖微服务 B，而微服务 B 更新了自己的接口，则微服务 A 必须相应更新，而上线后发现微服务 B 存在严重 Bug 需要回滚。此时，如果 B 直接回滚，A 就会由于接口请求参数不对，导致调用 B 出错。</p><p>所以对于测试人员，一定要了解自己负责的微服务与其他微服务之间的依赖关系。</p><h3 id="微服务下的测试框架分层实践" tabindex="-1">微服务下的测试框架分层实践 <a class="header-anchor" href="#微服务下的测试框架分层实践" aria-label="Permalink to &quot;微服务下的测试框架分层实践&quot;">​</a></h3><p>我在前面章节《<strong>03 | 告别三大误区，别让分层测试欺骗了你！</strong>》中讲过，测试金字塔模型虽然是软件测试中最经典的模型，但根据业务模型的不同，也有不同的变种。 例如，仅仅对于微服务本身，常见的就有如下两种分层模型：</p>',66),q=t(`<p>那么这两种分层模型哪一种好呢？在我看来，采用什么类型的分层模型测试，与你的业务类型有着非常紧密的关系，下面我们详细分析一下。</p><h4 id="_1-纺锤模型" tabindex="-1">1.纺锤模型 <a class="header-anchor" href="#_1-纺锤模型" aria-label="Permalink to &quot;1.纺锤模型&quot;">​</a></h4><p>如果你的项目<strong>与第三方依赖比较多</strong>，或者你的项目本就是基于第三方提供的服务而建立的。那么你就应该使用纺锤模型。</p><p>在纺锤模型中，<strong>最底层 Implementation Detail</strong>是第三方服务的实现细节。针对这部分，其实不在我们的掌控范围内，我们在测试中可以直接忽略。</p><blockquote><p>注意：这不意味着这部分没有人测试。 而是这部分的测试会被第三方自己测试掉。而他们测试所用的策略可能正是我们在 《03 | 告别三大误区，别让分层测试欺骗了你！》所学的经典------测试金字塔分层。</p></blockquote><p>针对<strong>第二层 Integration Test，<strong>主要是测试我们的服务与</strong>第三方接口</strong>之间的连通性和正确性。这部分测试，在我们测试框架中应该属于 API 测试那一层。</p><p>而<strong>最上层 Integrated Test，<strong>这部分的测试其实是</strong>端到端测试</strong>。这部分测试的成功与否，不仅取决于本系统所属的前端和本系统的后端接口的联通和正确性，还取决于本系统的后端和第三方接口的连通性和正确性。当这部分端到端测试出现问题时，需要排查是自己后端的问题还是第三方接口的问题。</p><p>对于这部分端到端的测试，在我们的测试框架分层中，最好与第二层的 API 测试对应起来。比如，我们建立如下的文件结构：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">|--</span><span style="color:#E1E4E8;">e2e</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#F97583;">|--</span><span style="color:#E1E4E8;">test_deposit_e2e</span></span>
<span class="line"><span style="color:#F97583;">|--</span><span style="color:#E1E4E8;">API</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#F97583;">|--</span><span style="color:#E1E4E8;">test_deposit_api</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">|--</span><span style="color:#24292E;">e2e</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#D73A49;">|--</span><span style="color:#24292E;">test_deposit_e2e</span></span>
<span class="line"><span style="color:#D73A49;">|--</span><span style="color:#24292E;">API</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#D73A49;">|--</span><span style="color:#24292E;">test_deposit_api</span></span></code></pre></div><p>在这个结构中，我们针对同一个测试用例，有两个维度的测试：</p><ul><li><p>第一个维度，是 e2e 即端到端测试。例如，当这个测试 test_deposit_e2e 成功时，表明我们的系统和第三方系统<strong>都在正确运行</strong>。</p></li><li><p>第二个维度，是我们的后端与第三方的接口的测试。这个维度的测试，是与第一种维度的测试<strong>一一对应的</strong> 。比如，test_deposit_e2e 的执行，需要调用第三方接口 A，那么在 test_deposit_api 的测试里，我们就针对 A 这个接口进行测试。</p><p>当 test_deposit_api 这个测试成功而 test_deposit_e2e 这个测试失败时，我们知道问题一定出在我们的系统；反之，当 test_deposit_api 失败，我们就要分析，是 A 接口调用出错，还是我们的后端连通 A 接口后，自己内部的逻辑处理出错。</p></li></ul><h4 id="_2-微服务金字塔模型" tabindex="-1">2.微服务金字塔模型 <a class="header-anchor" href="#_2-微服务金字塔模型" aria-label="Permalink to &quot;2.微服务金字塔模型&quot;">​</a></h4><p>当我们的系统业务主要是<strong>自研</strong>且业务模型类似下图时，就合适使用微服务金字塔模型。</p>`,13),y=t(`<p>适用微服务金字图模型的业务图</p><p>我们对照微服务金字塔模型一一讲解：</p><ul><li><p>针对这个业务模型的每一层，都要做<strong>Unit Test</strong>以确保业务功能本身不存在问题；</p></li><li><p>针对这个业务模型不同层次之间或者相同层次不同模块之间的调用，既要做<strong>集成测试</strong> 以验证模块集成后是否达成业务目标，也要做<strong>契约测试</strong>（对应 Component 层），以保障模块之间的调用和更改不会对业务目标产生影响；</p></li><li><p>针对前端页面层，需要从端到端以及探索测试层面来保障系统能够完成业务目标。</p></li></ul><p>相应地，对应我们的测试框架分层来说，我们就需要进行如下分层：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">|--</span><span style="color:#E1E4E8;">e2e</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#F97583;">|--</span><span style="color:#E1E4E8;">test_deposit_e2e</span></span>
<span class="line"><span style="color:#F97583;">|--</span><span style="color:#E1E4E8;">API</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#F97583;">|--</span><span style="color:#E1E4E8;">test_deposit_api</span></span>
<span class="line"><span style="color:#E1E4E8;">       </span><span style="color:#F97583;">|--</span><span style="color:#E1E4E8;">test_deposit_api_step1</span></span>
<span class="line"><span style="color:#E1E4E8;">       </span><span style="color:#F97583;">|--</span><span style="color:#E1E4E8;">test_deposit_api_step2</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">|--</span><span style="color:#24292E;">e2e</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#D73A49;">|--</span><span style="color:#24292E;">test_deposit_e2e</span></span>
<span class="line"><span style="color:#D73A49;">|--</span><span style="color:#24292E;">API</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#D73A49;">|--</span><span style="color:#24292E;">test_deposit_api</span></span>
<span class="line"><span style="color:#24292E;">       </span><span style="color:#D73A49;">|--</span><span style="color:#24292E;">test_deposit_api_step1</span></span>
<span class="line"><span style="color:#24292E;">       </span><span style="color:#D73A49;">|--</span><span style="color:#24292E;">test_deposit_api_step2</span></span></code></pre></div><p>此时，相较于纺锤模型来说，微服务测试金字塔模型对 API 层面的细节有了更仔细的检查。如果说在纺锤模型中，我们不必关心第三方服务接口内部细节；那么在微服务测试金字塔模型里， 我们<strong>需要对 API 层进行更加深入的检查</strong>，例如 test_deposit_api 这个接口对外提供 deposit 服务，但是它的内部，可能包括多个步骤，涉及多个微服务及其接口，因为它们都是我们自身的服务，故必须进行测试。</p><p>&quot;纺锤模型&quot; 和 &quot;微服务金字塔模型&quot;对测试框架的分层来说，主要是一个测试粒度的区别。</p><p>关于微服务模型，还有其他的分层实践，例如测试钻石型和全面测试型等。在我看来，只要是自研的服务和应用，都属于&quot;微服务金字塔模型&quot;这一个范畴，都应该进行全面、深入的测试，而不能只关注于集成测试。</p><h3 id="小结" tabindex="-1">小结 <a class="header-anchor" href="#小结" aria-label="Permalink to &quot;小结&quot;">​</a></h3><p>下面来总结下本讲所学习的内容。</p><p>本讲我从微服务的概念及 CAP 原理出发，详细讲解了微服务的应用带来了哪些好处，以及解决了哪些问题；然后引出了微服务带来的挑战及解决之道；最后我们讨论了在微服务模型下，测试框架分层应该要注意的事项和在不同分层模型下的测试侧重点。</p><p>随着微服务的流行，微服务及微服务下的测试，势必会常常出现在我们的日常工作和面试中，关于微服务的更多基础知识，我们有必要深入了解一下。</p><p>关注微信公众号 iTesting，回复&quot;微服务&quot;，了解更多微服务有关知识。</p><hr><p><a href="https://wj.qq.com/s2/7506053/9b01" target="_blank" rel="noreferrer">课程评价入口，挑选 5 名小伙伴赠送小礼品～</a></p>`,15);function b(P,m,k,C,T,v){const p=n("Image");return l(),r("div",null,[c,e(p,{alt:"图片1.png",src:"https://s0.lgstatic.com/i/image/M00/70/AA/Ciqc1F-7jV-ALIYKAAOuuk-D-8E414.png"}),a(),_,d,h,u,g,E,e(p,{alt:"图片2.png",src:"https://s0.lgstatic.com/i/image/M00/70/B6/CgqCHl-7jWyAJ3NJAAE_kjudS6c251.png"}),a(),A,e(p,{alt:"图片3.png",src:"https://s0.lgstatic.com/i/image/M00/70/AA/Ciqc1F-7jYKAFjdmAAJU0WY6Ppg357.png"}),a(),q,e(p,{alt:"图片4.png",src:"https://s0.lgstatic.com/i/image/M00/70/B6/CgqCHl-7jZOAJbvVAAF5zNx21oU977.png"}),a(),y])}const I=o(i,[["render",b]]);export{x as __pageData,I as default};
