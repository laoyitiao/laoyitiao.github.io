import{_ as r,j as _,o as p,g as n,k as o,h as a,Q as s,s as t}from"./chunks/framework.4e7d56ce.js";const N=JSON.parse('{"title":"01为什么说云原生重构了互联网产品开发模式？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/Go 微服务实战 38 讲_文档/(3799) 01  为什么说云原生重构了互联网产品开发模式？.md","filePath":"posts/backEnd/Go 微服务实战 38 讲_文档/(3799) 01  为什么说云原生重构了互联网产品开发模式？.md","lastUpdated":1696682708000}'),i={name:"posts/backEnd/Go 微服务实战 38 讲_文档/(3799) 01  为什么说云原生重构了互联网产品开发模式？.md"},l=s('<h1 id="_01为什么说云原生重构了互联网产品开发模式" tabindex="-1">01为什么说云原生重构了互联网产品开发模式？ <a class="header-anchor" href="#_01为什么说云原生重构了互联网产品开发模式" aria-label="Permalink to &quot;01为什么说云原生重构了互联网产品开发模式？&quot;">​</a></h1><p><strong>云原生</strong>（Cloud Native）这个概念最早是由 Pivotal 公司的 Matt Stine 提出的。发展至今，云原生架构已然成为互联网行业的技术热点，并在很大程度上推动了 IT 成本的降低和企业的发展。不过为便于你更好地理解和学习这部分内容，在本节课的开始，我们就先来快速了解下相关的架构演进及其设计思想。</p><p>在云原生架构之前（即传统非云原生应用），底层平台负责向上层应用服务提供基本运行资源，而应用则需要满足业务需求和非业务需求，比如 PHP 开发中是采用 Openstack 或者 VMware vSphere 等虚拟化技术为 LMAP（Linux+MySQL+ Apache+PHP）应用提供硬件资源。</p><p>在 SOA、微服务时代，部分功能会以<strong>后端服务</strong>的方式存在，在应用中被简化为面向客户端的调用代码，然后应用将这些功能连同自身的业务实现代码一起打包，比如 Java 的 jar 包。而云的出现，不但提供了各种资源，还提供了基础设施、中间件等各种能力，从而使得应用专注于业务需求的实现。</p><p>随着云原生技术理念在行业内进一步实践发展，云原生架构完成了 IT 架构在云计算时代的进化升级。对企业而言，新旧 IT 架构的转型与企业数字化的迫切需求也为云原生技术提供了很好的契机，使得云原生技术在行业内的应用持续深化。</p><h3 id="云计算的前世今生" tabindex="-1">云计算的前世今生 <a class="header-anchor" href="#云计算的前世今生" aria-label="Permalink to &quot;云计算的前世今生&quot;">​</a></h3><p>云原生和云计算有着千丝万缕的联系，因此在介绍云原生之前，我们先看看过去几十年间云计算的发展演进历程，它大致分为三个阶段：<strong>虚拟化的出现</strong> 、<strong>虚拟化在云计算中的应用</strong> 以及<strong>容器化的出现</strong>。</p>',7),c=t("h4",{id:"阶段1-虚拟化技术",tabindex:"-1"},[a("阶段1：虚拟化技术 "),t("a",{class:"header-anchor",href:"#阶段1-虚拟化技术","aria-label":'Permalink to "阶段1：虚拟化技术"'},"​")],-1),h=t("p",null,"云计算与计算机相伴而生，起源可以追溯到 60 多年前，但直到 2000 年前后，云计算的基础------虚拟化技术才逐渐发展成熟。",-1),d=t("p",null,"那什么是虚拟化技术呢？具体来说，就是表示将计算机资源划分成逻辑组的技术。注意，由此生成的仅仅是一个逻辑的视图。通过虚拟化技术，我们就可以在同一台物理机器上运行多个虚拟机，进而发挥物理硬件的最大效用。",-1),g=t("h4",{id:"阶段2-虚拟机的市场化应用",tabindex:"-1"},[a("阶段2：虚拟机的市场化应用 "),t("a",{class:"header-anchor",href:"#阶段2-虚拟机的市场化应用","aria-label":'Permalink to "阶段2：虚拟机的市场化应用"'},"​")],-1),u=t("p",null,"在虚拟化技术成熟之后，云计算市场才真正出现。2006 年，亚马逊 AWS 公开发布 S3 存储服务、SQS 消息队列及 EC2 虚拟机服务，正式宣告了现代云计算的到来。针对云服务消费者的不同需求，主要有三种云服务模型： IaaS、PaaS 和 SaaS（如下图）。",-1),S=s('<ul><li><p>IaaS（Infrastructure-as-a-Service，基础设施即服务），是云服务的最底层，主要提供一些基础资源。</p></li><li><p>PaaS（Platform-as-a-service，平台即服务），提供软件部署平台，其抽象了硬件和操作系统细节，使得应用可以无缝地扩展。开发者只需要关注自己的业务逻辑，不需要关注底层。</p></li><li><p>SaaS（Software-as-a-service，软件即服务），是指软件的开发、管理、部署都交给第三方，提供商会为企业搭建信息化所需要的所有网络基础设施及软件、硬件运作平台。企业不需要关心技术问题，拿来即用。</p></li></ul><h4 id="阶段3-容器化和容器编排的兴起" tabindex="-1">阶段3：容器化和容器编排的兴起 <a class="header-anchor" href="#阶段3-容器化和容器编排的兴起" aria-label="Permalink to &quot;阶段3：容器化和容器编排的兴起&quot;">​</a></h4><p><strong>容器化本质上就是虚拟化的改进版本</strong>，这种技术允许多个应用程序驻留在同一个服务器中。不过这二者之间也是有区别的，虚拟化是在硬件级别分离应用程序，而容器化则是在操作系统级别分离硬件程序。</p><p>我们知道Docker 对云计算领域产生了深远的影响，从虚拟机到容器，整个云计算市场发生了一次重大变革。后续随着 Kubernetes 的成熟，以及它和 Docker 的融合，云计算进入 Kubernetes 时代。PaaS 技术的主流路线也逐渐过渡到 &quot;Kubernetes + Docker&quot;，并于 2018 年左右开始占据统治地位。</p>',4),P=s('<p>总体来说，在这过去的二十年间，云计算几乎重新定义了整个行业的格局。越来越多的企业开始降低对 IT 基础设施的直接资本投入，不再倾向于维护自建的数据中心，而是开始通过上云的方式来获取更强大的计算和存储能力，这使得公司（尤其是初创公司）可以更快地实践业务想法并迅速推送到市场。</p><h3 id="云原生到底是什么" tabindex="-1">云原生到底是什么 <a class="header-anchor" href="#云原生到底是什么" aria-label="Permalink to &quot;云原生到底是什么&quot;">​</a></h3><p>你可以对比篮球比赛来理解，篮球比赛分为上半场和下半场，在这里云原生就是云计算的 <strong>&quot;下半场&quot;</strong>。在这&quot;下半场&quot;中，是否上云已经很少被提及了，因为云的概念已经渗入到各行各业了，特别是 2017 年以后，云计算技术已然成为企业发展&quot;战术&quot;的一部分了。</p><p>近几年，云原生不仅火而且还有点被过度消费，很多软件都打着云原生的旗号。但究其本质，云原生本身并不能称为是一种架构，<strong>它首先是一种基础设施</strong>，运行在其上的应用称作云原生应用，只有符合云原生设计哲学的应用架构才叫云原生应用架构。</p><p>鉴于云原生的重要性，在讲解云原生的具体定义之前，我们首先介绍下云原生出现的背景以及它背后的诉求，这样你才能知其然并知其所以然。</p><h4 id="云原生出现的背景" tabindex="-1">云原生出现的背景 <a class="header-anchor" href="#云原生出现的背景" aria-label="Permalink to &quot;云原生出现的背景&quot;">​</a></h4><p>移动互联网时代是业务高速发展的时期，不同于传统的应用，移动互联网提供了新的用户体验，即以移动端为中心，通过软件对各行各业进行渗透。在巨大的用户基数下，快速变更和不断创新的需求给软件开发方式带来巨大推动力，传统软件开发方式受到巨大挑战。面对业务的快速迭代以及团队规模的不断扩大，降低沟通协作成本并加快产品的交付速度、为用户呈现更好的体验是各个互联网公司都在努力的方向。</p><p>在这样的背景下，微服务和云原生的概念开始流行。系统架构与团队的组织架构密切相关（如下图所示），其实半个世纪前提出的康威定律------组织内人与人的沟通方式决定了他们如何参与系统设计------也早就说明了这一点，这奠定了微服务架构的理论基础。通过服务的拆分，每个小团队对应一个服务，增加了内聚性，减少了开会的频次，提高了沟通效率。快速交付意味着更新的频次也高了，更新也容易造成服务的故障问题，这时更新与高可用之间需要权衡。而云原生架构的基础设施和工具可以减少更新导致的故障问题，保证服务的高可用。</p>',8),A=s('<p>几大互联网巨头的团队组织架构</p><h4 id="云原生解决了哪些问题" tabindex="-1">云原生解决了哪些问题 <a class="header-anchor" href="#云原生解决了哪些问题" aria-label="Permalink to &quot;云原生解决了哪些问题&quot;">​</a></h4><p>企业在数字化转型中普遍面临 IT 系统架构缺乏弹性、业务交付周期长、运维效率低、高可靠性低等痛点和挑战。具体来说，主要有以下的诉求：</p><ul><li><p>产品快速迭代，更快的上线速度；</p></li><li><p>系统的高可用，故障时能够自动恢复与回滚；</p></li><li><p>快速解决问题，细致的故障探测和发现；</p></li><li><p>避免雪崩，故障时能自动隔离；</p></li><li><p>系统的弹性伸缩，简便快速的水平扩容。</p></li></ul><p>将软件迁移到云上是应对这些挑战的自然演化方式，在过去二十年间，IaaS 、PaaS 和 SaaS 让应用的构建和部署越来越轻、越来越快，而底层基础设施和平台则越来越强大，以不同形态的云对上层应用提供强力支撑。云计算的第一个浪潮是关于成本和业务敏捷性，这使得云计算的基础设施更加廉价。</p><p>很多企业倾向于使用微服务架构来开发应用。微服务开发快速，职责单一，能够更快速地被客户所采纳。同时，这些应用能够通过快速迭代的方式得到进化，并赢得客户的认可。而云原生可以打通微服务开发、测试、部署、发布的整个流程环节，所以企业可以通过云原生的一系列技术，如基于容器的敏捷基础设施、微服务架构、DevOps 等解决企业面临的那些 IT 痛点，满足其背后的诉求。</p><h4 id="不断更新的云原生定义" tabindex="-1">不断更新的云原生定义 <a class="header-anchor" href="#不断更新的云原生定义" aria-label="Permalink to &quot;不断更新的云原生定义&quot;">​</a></h4><p>自从云原生被提出以来，云原生的定义就一直在持续地更新，这也说明了云原生的概念随着技术的发展而不断地被深刻认知。</p><p>作为云原生应用的提出者，Matt Stine 于 2015 年在其《迁移到云原生应用架构》一书中探讨了云原生应用架构的几个主要特征：<strong>符合 12 因素应用、面向微服务架构、敏捷架构、基于 API 的协作和抗脆弱性</strong>。</p><p>Pivotal公司推出了 Pivotal Cloud Foundry 云原生应用平台和 Spring 开源 Java 开发框架，成为云原生应用架构中的先驱者和探路者。在 <a href="https://pivotal.io/cloud-native" target="_blank" rel="noreferrer">Pivotal 的官方网站</a>上，对云原生的介绍主要包括 4 个要点：<strong>DevOps、持续集成、微服务架构和容器化</strong>（如下图所示）。</p>',10),T=s('<p>云原生计算基金会（CNCF）最开始（2015 年成立之初）对云原生的定义则包含<strong>应用容器化、面向微服务架构和应用支持容器的编排调度</strong>这三个方面。</p><p>发展到 2018 年，云原生生态不断壮大， Cloud Native Landscape 中的云原生项目涉及领域也不断变大，同时 CNCF 基金会中的会员以及容纳的项目越来越多。</p><p>显然之前的定义已经和当前的景观图不符，为了实现云原生生态的发展，CNCF 于 2018 年 6 月通过了对<strong>云原生</strong> 重新定义的提案，<a href="https://github.com/cncf/toc/blob/master/DEFINITION.md" target="_blank" rel="noreferrer">v1.0 版本</a>定义如下：</p><blockquote><p>云原生技术有利于各组织在公有云、私有云和混合云等新型动态环境中，构建和运行可弹性扩展的应用。云原生的代表技术包括容器、服务网格、微服务、不可变基础设施和声明式API。</p><p>这些技术能够构建容错性好、易于管理和便于观察的松耦合系统。结合可靠的自动化手段，云原生技术使工程师能够轻松地对系统作出频繁和可预测的重大变更。</p><p>云原生计算基金会（CNCF）致力于培育和维护一个厂商中立的开源生态系统，来推广云原生技术。我们通过将最前沿的模式民主化，让这些创新为大众所用。</p></blockquote><p>这个定义不同于以往的严谨定义，并未深挖云原生的实质。CNCF 是一个厂商中立的组织，因此 CNCF 主要目的在于形成云原生工具生态，更加侧重工程实践。</p><p>上面定义所述的五个代表技术，基本都和 k8s 有关联。k8s 是云原生基金会的第一个孵化项目，事实上是在围绕 k8s 建立云原生生态。其中，容器是 k8s 的底层引擎；服务网格则是建立在 k8s 上的针对请求的扩展功能；不可变基础设施是现代运维的基石；声明式 API 是 k8s 的编码方式；微服务是一种软件架构，云原生中的微服务扩大了云原生的版图。</p><h3 id="小结" tabindex="-1">小结 <a class="header-anchor" href="#小结" aria-label="Permalink to &quot;小结&quot;">​</a></h3><p>云原生，并不是一种具体的技术或者框架，而是一类思想的集合，其中的技术要点包括服务网格、微服务和容器化（如容器化 Docker）等；管理要点则包括 DevOps、康威定律等。因此，可以说<strong>云原生在一定层面上重构了互联网产品的开发模式</strong>。</p><p>本节课我们主要从云原生的发展史开始介绍云计算、虚拟化、容器化等技术，随后又结合云原生出现的背景介绍了云原生的定义。云原生应用可充分利用云平台服务优势，平台提供了简单快捷的扩展能力并与硬件解耦，这就提供了更大的灵活性、弹性和跨云环境的可移植性。</p><p>那学习完本节课，你可以用自己的语言描述云原生的概念吗？欢迎你在留言区分享你的想法。</p>',10);function m(C,b,k,q,I,f){const e=_("Image");return p(),n("div",null,[l,o(e,{alt:"图片1.png",src:"https://s0.lgstatic.com/i/image/M00/29/7D/Ciqc1F762ziAHuPyAAEDvHR95jI135.png"}),a(),c,h,d,g,u,o(e,{alt:"图片2.png",src:"https://s0.lgstatic.com/i/image/M00/29/89/CgqCHl7620WARg_4AAFa_-oH-Pw054.png"}),a(),S,o(e,{alt:"图片3.png",src:"https://s0.lgstatic.com/i/image/M00/29/7D/Ciqc1F7621KAJgi9AAf4x6W-WfQ660.png"}),a(),P,o(e,{alt:"图片4.png",src:"https://s0.lgstatic.com/i/image/M00/29/89/CgqCHl76212AIf6_AAJ3AU_sRA0131.png"}),a(),A,o(e,{alt:"图片5.png",src:"https://s0.lgstatic.com/i/image/M00/29/7D/Ciqc1F7623SAasktAAVF1I6KGhQ459.png"}),a(),T])}const D=r(i,[["render",m]]);export{N as __pageData,D as default};
