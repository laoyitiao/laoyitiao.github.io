import{_ as e,o as r,g as s,Q as p}from"./chunks/framework.f949202b.js";const m=JSON.parse('{"title":"物理机时代 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/玩转 Serverless 架构_文档/(6029) 01  前因后果：Serverle 架构兴起的必然因素是什么？.md","filePath":"posts/backEnd/玩转 Serverless 架构_文档/(6029) 01  前因后果：Serverle 架构兴起的必然因素是什么？.md","lastUpdated":null}'),a={name:"posts/backEnd/玩转 Serverless 架构_文档/(6029) 01  前因后果：Serverle 架构兴起的必然因素是什么？.md"},l=p('<p>今天是我们第一节课，我想和你聊一聊 Serverless 架构兴起的原因。</p><p>Serverless 是最近几年业界很火的技术名词，你可以在国内外各种技术大会上看到它的身影，主流云服务商也不断地推出 Serverless 相关的云产品和新功能（比如 AWS Lambda、阿里云函数计算、腾讯云云函数），各种关于 Serverless 的商业和开源产品也层出不穷（比如 Serverless Framework、OpenFaaS、kubeless）。</p><p>在这个背景下，我们开始使用 Serverless 的产品，愿意用它来解决实际问题，比如用 Serverless 技术实现自动化运维、开发小程序、开发服务端应用。</p><p><strong>那你是否思考过 Serverless 为什么这么火呢，换句话说，Serverless 架构兴起的必然因素是什么？</strong> 了解这部分知识，可以让你更好地学习和使用 Serverless，接下来我们就带着这个问题学习今天的内容。</p><p>说到 Serverless，就不得不说云计算，因为云计算的发展史就是 Serverless 的兴起史。纵观<strong>云计算的历史，我们可以将其分为物理机时代、虚拟机时代、容器时代、Serverless 时代</strong>，所以接下来，就让我们深入云计算的发展史，去寻找 Serverless 架构兴起的必然因素。</p><h3 id="物理机时代" tabindex="-1">物理机时代 <a class="header-anchor" href="#物理机时代" aria-label="Permalink to &quot;物理机时代&quot;">​</a></h3><p><img src="https://s0.lgstatic.com/i/image2/M01/03/E8/CgpVE1_kTlqASiEcAAFnAFtU2HU531.png" alt="图片1.png"><br> 物理机时代发展历程</p><p>其实，云计算的概念可以追溯到 60 多年前，最早的说法是图中的&quot;分时操作系统&quot;，也就是通过时间片轮转的方式把一个操作系统给多个用户使用。同时还在发展的是虚拟化技术，也就是把一台物理机隔离为多台虚拟机，这样就能把一个硬件给多个用户使用。</p><p>1997 年，Ramnath Chellapa 教授把云计算定义成&quot;一种新的计算范式，其中计算的边界将由经济原理决定，而不仅仅是技术限制&quot;，通俗来讲就是，云计算不只是虚拟化技术，还是云服务商提供计算资源，使用者购买计算资源。</p><p>总的来说，在 2000 年之前，互联网刚刚兴起，<strong>而云计算还处于理论阶段，也就是物理机时代</strong>。如果这个时候你想在创业，开发一个电商网站，上线就需要经过以下步骤：</p><ul><li><p>购买一台服务器（物理机）；</p></li><li><p>找个机房并给服务器通上电、连上网线；</p></li><li><p>在服务器上安装操作系统；</p></li><li><p>在服务器上安装数据库和网站环境；</p></li><li><p>部署网站；</p></li><li><p>测试；</p></li><li><p>这时你的网站架构是单机版的单体架构，数据库、应用、Nginx 等服务全都在一台你自己管理的服务器上。</p></li></ul><p><img src="https://s0.lgstatic.com/i/image2/M01/03/E7/Cip5yF_kTmqAaWsbAAso8KYY52c713.png" alt="图片2.png"><br> 物理机时代网站部署架构</p><p>但是网站上线之后，你将会遇到各种各样的问题，一旦停电，就会导致网络中断，服务器也会停机，那网站就没办法访问了，用户不能再买买买。于是为了避免断电、断网，你大概率会选择把服务器托管到电信机房，那里停电的概率低很多，但是每个月得多付一些租金。</p><p>可是没想到半年后，问题又出现了，服务器 CPU 烧毁了！这不是简单换一台服务器就能解决的事情，原来服务器上的数据如何迁移？新的环境如何与原来保持一致？怎么保证网站持续可用，各种问题接连而至......</p><p>总的来说，物理机时代，网站上线和稳定运行面临的最大问题就是服务器等硬件问题，你既要购买服务器，还要承担服务器的场地、电力、网络等开销，并且还需负责服务器的维护。<strong>好在随后几年随着虚拟化技术逐渐成熟，云计算逐渐进入虚拟机时代，这也给我们带来了希望。</strong></p><h3 id="虚拟机时代" tabindex="-1">虚拟机时代 <a class="header-anchor" href="#虚拟机时代" aria-label="Permalink to &quot;虚拟机时代&quot;">​</a></h3><p><img src="https://s0.lgstatic.com/i/image2/M01/03/E8/CgpVE1_kTnSAKGKvAAH0WbMrVNg381.png" alt="图片3.png"><br> 虚拟机时代发展历程</p><p>上图是虚拟机发展历程中的重要节点。其中一个重要里程碑之一就是 2001 年 VMWare 带来的针对 x86 服务器的虚拟化产品，使虚拟化技术逐渐普及。对云厂商来说，通过虚拟化技术，它可以把一台物理机分割成多台虚拟机提供给多用户使用，充分利用硬件资源，而且创建速度和弹性也远超物理机。对于开发者来说，就不用再买硬件了，直接在云平台买虚拟机，成本更低了。</p><p><strong>2001 年之后，虚拟化技术日渐成熟，</strong> 因此也出现了很多基于虚拟化的云厂商和产品（开篇我也提到了）。最初云厂商都是卖硬件，AWS 的 EC2、阿里云 ECS、Azure Virtual Machines，这种云计算形态也被叫作 IaaS（基础设施即服务）。后面随着业务形态发展，云厂商发现可以抽象出一些通用的平台，比如中间件、数据库等，于是就把这些功能做成服务，也放在云上去卖，这就是 PaaS（平台即服务）。</p><p><strong>那有了 IaaS 之后，你就可以把电商网站迁移到虚拟机上了，</strong> 再也不用担心断电断网和硬件故障。不过，当你的电商网站越做越强，用户越来越多，数据库每天都有几千万条数据写入，数据库性能很快就会达到瓶颈，就会出现用户因付款太慢放弃付款的情况；除此之外，每天也有上百万图片存到磁盘，磁盘也快要耗尽了。如果网站出现崩溃，就直接导致用户流失，甚至资损。</p><p>好在作为专业的技术人员，我们已经对云计算了如指掌，为了避免这些问题，基于 IaaS 和 PaaS 重新设计了网站架构：</p><p><img src="https://s0.lgstatic.com/i/image2/M01/03/E8/CgpVE1_kTn2AeXnYABSdMxS0Ddo391.png" alt="图片4.png"><br> 虚拟机时代网站部署架构</p><p>为了降低服务器负载，我们把数据库迁移到了云厂商提供的云数据库上，把图片存储迁移到对象存储：</p><ul><li><p>云数据库有专门的服务器，并且还提供了备份容灾，比自己在服务器上安装数据库更稳性能更强。</p></li><li><p>对象存储能无限扩容，不用担心磁盘不够了。</p></li></ul><p>这样一来，服务器就只负责处理用户的请求，把计算和存储分离开来，既降低了系统负载，也提升了数据安全性。并且单机应用升级为了集群应用，通过负载均衡，会把用户流量均匀分配到每台服务器上。</p><p><strong>不过在服务器扩容的过程中，你还是会遇到一些麻烦。</strong> 比如购买服务器时，会发现之前服务器型号没有了，只有新的型号，并且每次新扩容一台服务器，都需要在上面初始化软件环境和配置，还需要保证所有服务器运行环境一致，这是个非常复杂还容易出错的工作。</p><p>总的来说，虚拟机可以让你不用关心底层硬件，但是如果能让我们不用关心运行环境就更好了。<strong>于是，容器技术诞生了。</strong></p><h3 id="容器时代" tabindex="-1">容器时代 <a class="header-anchor" href="#容器时代" aria-label="Permalink to &quot;容器时代&quot;">​</a></h3><p><img src="https://s0.lgstatic.com/i/image2/M01/03/E8/CgpVE1_kToWARsK1AAF3_oNUZVE232.png" alt="图片5.png"><br> 容器时代发展历程</p><p><strong>2013 年 Docker 的发布，代表着容器技术替代了虚拟化技术，云计算进入容器时代。</strong> 容器就是把代码和运行环境打包在一起，这样代码就可以在任何地方运行。有了容器技术，你在服务器上部署的就不再是应用了，而是容器。当容器多了的时候，如何管理就成了一个问题，于是出现了容器编排技术，比如 2014 年 Google 开源的 Kubernetes。</p><p>基于容器，你部署网站的方式也有了改变：</p><ul><li><p>搭建 Kubernetes 集群；</p></li><li><p>构建容器镜像；</p></li><li><p>部署镜像。</p></li></ul><p>你的网站部署架构也演进得更现代化了：</p><p><img src="https://s0.lgstatic.com/i/image2/M01/03/E7/Cip5yF_kTo2ASrz9AAi8F5WTUZQ237.png" alt="图片6.png"><br> 容器时代网站部署架构</p><p>你不仅使用了容器，你还使用了 Kubernetes 来做管理容器集群。基于 Kubernetes 和云厂商提供的弹性能力，你可以实现网站的自动弹性伸缩。这样在流量洪峰到来时，就可以自动弹出更多的资源；当流量低谷时，自动释放多余的资源。</p><p>想到这儿，你多多少少有些兴奋，但时间一久，问题也随之出现。因为你需要去规划节点和 Pod 的 CPU、内存、磁盘等资源，需要编写复杂的 YAML 去部署 Pod、服务，需要经常排查 Pod 出现的异常，需要学习专业的运维知识，<strong>渐渐地，你好像变成了 Kubernetes 运维工程师，</strong> 如果能完全不关心运维，只专注于产品的开发就好了，这样能节省很多时间，以更快的速度完成产品迭代上线。</p><p>而且你也没想到，由于提前准备不够充分，双十一来的时候，零点的订单量远超预期，网站又崩了！集群虽然感知到了需要弹出更多的资源，但由于服务器弹出需要一定时间，没来得及应对这种瞬时流量，要是能够支持秒级弹性就好了。<strong>于是，Serverless 时代来临了。</strong></p><h3 id="serverless-时代" tabindex="-1">Serverless 时代 <a class="header-anchor" href="#serverless-时代" aria-label="Permalink to &quot;Serverless 时代&quot;">​</a></h3><p><img src="https://s0.lgstatic.com/i/image2/M01/03/E8/CgpVE1_kTpSAK_EgAAD8YeiJPZk736.png" alt="图片7.png"><br> Serverless 时代发展历程</p><p>在我看来，Serverless 是指构建和运行不需要服务器管理的一种概念。前面三种电商网站部署的方式，都属于 Serverful 的架构，它就像使用低级的汇编语言编程。而 Serverless 的架构就像使用 Python 这样的高级语言进行编程。比如 c = a + b 这样简单的表达式，如果用汇编描述，就必须先选择几个寄存器，把值加载到寄存器，进行数学计算，再存储结果。这就好比今天在 Serverful 的架构下，开发首先需要分配或找到可用的资源，然后加载代码和数据，再执行计算，将计算的结果存储起来，最后还需要管理资源的释放。</p><p>对于 Serverless，目前我们得到的还是一个比较抽象的概念，这是因为这项技术尚处于发展阶段。现阶段关于 Serverless 的实现主要是基于 FaaS（函数即服务） 和 BaaS （后端即服务）的方案。</p><ul><li><p>FaaS 提供了运行函数代码的能力，并且具有自动弹性伸缩。基于 FaaS，我们应用的组成就不再是集众多功能于一身的集合体，而是一个个独立的函数。每个函数实现各自的业务逻辑，由这些函数组成复杂的应用。</p></li><li><p>BaaS 是将后端能力封装成了服务，并以接口的形式提供服务。比如数据库、文件存储等。通过 BaaS 平台的接口，我们运行在 FaaS 中的函数就能调用各种后端服务，进而以更低开发成本实现复杂的业务逻辑。</p></li></ul><p>基于 Serverless，<strong>我们的电商网站部署架构就演变为了下面这样：</strong></p><p><img src="https://s0.lgstatic.com/i/image2/M01/03/E7/Cip5yF_kTp2AOUW_ABVeKCaUwYU699.png" alt="图片8.png"><br> Serverless 时代部署架构图</p><p>我们通过网关承接用户流量，并将流量转发到在 FaaS 平台运行的函数中。每个函数都是一个特定的接口，实现单一业务逻辑。并且基于 BaaS 实现复杂业务功能。而函数本身，也还可以调用其他微服务。基于这样的架构，我们就完全不用关心运维，并且 FaaS 平台的弹性伸缩能力，就能实现业务的秒级弹性。</p><p>总的来说，基于 Serverless开发者就只需要关心业务逻辑的开发。进行应用部署时也不再需要关心服务器，不需要关心后续的运维，应用也天然具备了弹性伸缩的能力，并且实现了按需使用，按量付费，也更能进一步节省成本。</p><h3 id="小结" tabindex="-1">小结 <a class="header-anchor" href="#小结" aria-label="Permalink to &quot;小结&quot;">​</a></h3><p>通过上面的学习，相信你对云计算的发展历程，也是 Serverless 的兴起过程有了一个大概的了解。让我们再围绕网站的部署架构进行简单的回顾。</p><ul><li><p>物理机时代：2000 年之前，我们需要通过物理机部署网站。</p></li><li><p>虚拟机时代：2000 年之后，虚拟化技术发展成熟，云计算行业蓬勃发展，我们可以基于 IaaS 和 PaaS 部署应用，提高稳定性。</p></li><li><p>容器时代：2013 年云计算进入容器时代，我们可以通过容器技术打包应用及运行依赖，不用关心运行环境。</p></li><li><p>Serverless 时代：最近几年，云计算进入 Serverless 时代，我们不再需要关心服务器，应用也天然具有弹性。</p></li></ul><p>纵观云计算的发展史，从物理机到虚拟机，从 IaaS、PaaS 到 FaaS，从容器到 Serverless，都是一个去服务器的一个过程。有了 IaaS，我们不需要关注物理机；有了 PaaS，我们不需要关注操作系统；有了容器，我们不需要关心运行环境；而 Serverless 技术的出现，能够让我们不再关心传统的运维工作，让我们更专注于业务的实现，把时间精力花在更有意义的事情上，让我们以更快的速度、更低的成本完成应用的开发迭代，进而创造出更大的价值。而这也正是 Serverless 架构兴起的必然因素。</p><p><img src="https://s0.lgstatic.com/i/image/M00/8C/12/CgqCHl_kcRCAcyqiAAFbdq9wbQM393.png" alt="Lark20201224-184403.png"></p><p>另外，我希望你学完今天的内容可以对云计算的发展历史有了初步的了解，对 Serverless 架构的兴起过程也有初步的认识。</p><p>今天的作业是希望你能在课下做功课，总结一下，IaaS、PaaS、SaaS、FaaS、BaaS 它们到底是什么，有什么区别？这会帮你更好地理解今天的内容，欢迎在留言区与我互动。当然了，我今天只是简单地提了一下 Serverless 是什么，还未对它的概念展开来讲解，下一节课，我会深入剖析Serverless的含义，我们下节课见。</p>',53),t=[l];function i(o,n,S,g,_,c){return r(),s("div",null,t)}const h=e(a,[["render",i]]);export{m as __pageData,h as default};
