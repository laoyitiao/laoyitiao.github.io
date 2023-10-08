import{_ as o,j as a,o as i,g as n,k as _,h as l,Q as p,s as t}from"./chunks/framework.4e7d56ce.js";const Z=JSON.parse('{"title":"01一探究竟：从架构的演变看微服务化架构","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/SpringCloud Alibaba 实战_文档/(6746) 01  一探究竟：从架构的演变看微服务化架构.md","filePath":"posts/backEnd/SpringCloud Alibaba 实战_文档/(6746) 01  一探究竟：从架构的演变看微服务化架构.md","lastUpdated":1696682708000}'),e={name:"posts/backEnd/SpringCloud Alibaba 实战_文档/(6746) 01  一探究竟：从架构的演变看微服务化架构.md"},c=p('<h1 id="_01一探究竟-从架构的演变看微服务化架构" tabindex="-1">01一探究竟：从架构的演变看微服务化架构 <a class="header-anchor" href="#_01一探究竟-从架构的演变看微服务化架构" aria-label="Permalink to &quot;01一探究竟：从架构的演变看微服务化架构&quot;">​</a></h1><p>本节课，让我们一起来了解到底什么才是微服务。</p><h3 id="什么是微服务架构" tabindex="-1">什么是微服务架构 <a class="header-anchor" href="#什么是微服务架构" aria-label="Permalink to &quot;什么是微服务架构&quot;">​</a></h3><p>首先，到底什么是微服务呢？微服务名词出现的历史其实并不久远。2011 年的 5 月份，威尼斯附近的一个软件架构师的研讨会上，微服务的概念第一次被人提起，但当时并没有给出微服务明确的定义。随着技术的发展，在 2014 年的 3 月份，由詹姆斯里维斯和他的伙伴马丁福乐在博客中发表了一篇关于微服务特点的文章。这篇文章对微服务概念定义进行了明确。</p><p>下面我们来看一下什么是真正的微服务。</p><blockquote><p>所谓微服务架构风格是一种将单机应用程序开发为一组小型服务的方法，每个小服务运行在自己的进程中，并以轻量级的机制来进行通信。这些服务围绕着业务能力所建立，并且由完全自动化的部署机构独立部署，这些服务的集中管理只有最低限度，可以用不同的编程语言编写并使用不同的数据库存储技术。</p></blockquote><p>以上就是关于微服务的定义，或许这个描述太过学术， 那我通过讲解架构的演化历史来帮助你了解微服务架构。要知道任何架构都不是一蹴而就的，每一种架构其实都是为了解决以往我们业务所产生的痛点而设计的。</p><h3 id="垂直划分的分布式应用具有哪些问题" tabindex="-1">垂直划分的分布式应用具有哪些问题？ <a class="header-anchor" href="#垂直划分的分布式应用具有哪些问题" aria-label="Permalink to &quot;垂直划分的分布式应用具有哪些问题？&quot;">​</a></h3><p>要弄清楚微服务架构，首先我们要看以往的分布式架构到底有哪些问题。</p><p>在早期构建分布式应用时，多系统间协作其实是一件比较困难的事情。我们来看下面这张图：</p>',10),r=p("<p>普惠金融借款流程</p><p>这是我带领开发的一个项目，主要负责普惠金融的借款服务，按照业务职能主要包含了 4 部分，分别是<strong>借款人门户网站</strong> 、<strong>信审风控系统</strong> 、<strong>贷后系统</strong> 以及<strong>催收系统</strong>。</p><p>具体的业务流程是：</p><ol><li><p>借款人门户负责收集借款人的需求；</p></li><li><p>将借款人的信息送入信审和风控系统，风控进行评估；</p></li><li><p>如果满足借款要求，则将这些信息发给贷后系统来进行实际的放款操作；</p></li><li><p>最后在实际的分期还款过程中，通知借款人定期还款。</p></li></ol><p>这个过程中可以看到我们把 1 个完整的业务流程拆解成 4 个子系统，每个子系统有独立的团队来进行维护，因为没有统一的标准，便衍生出一系列的后续问题，我们来看一下。</p><p><strong>首先，系统间通信困难。</strong> 假如信审系统需要向贷后系统发送一个调用请求，通过 WebService 来实现，在 WebService 跨进程调用时，需要双方持有相同的传输对象才可以完成数据的交互。但如果服务的提供者，他将接口以及传输对象进行升级后，而客户端没有及时更新的话，此时便会因为对象的状态不一致导致传输失败的情况。要知道在互联网机构，接口的升级与扩展可能是一件频繁发生的事情，如果这类问题一再出现，必然会影响系统的稳定性和团队的协作，这是第一个问题。</p>",6),h=t("p",null,"强一致性的跨进程通信方式",-1),g=t("p",null,[t("strong",null,"其次，是系统的内部复杂度对外暴露。"),l(" 假如信审系统目前需要访问贷后系统，贷后系统为了高可用的要求，提供了 IP 为 10 和 11 的两个节点，作为信审系统客户端持有了这两个静态的 IP 地址。但随着业务的发展，贷后系统的负载越来越大，此时作为贷后系统集群加入了额外的两个节点，它们分别是 12 和 13。如何通知信审系统额外扩展这两个新加入的节点呢？因为在原始并没有设计这样的动态扩展的机制，所以我们必须手动配置信审系统的 IP 列表，以及重启应用才可以做到。这就相当于信审系统必须了解贷后系统每一台服务器的实际运行情况，这显然就增加了两个系统之间的耦合，提高了项目维护的难度。")],-1),u=t("p",null,"缺少动态发现机制",-1),d=t("p",null,[t("strong",null,"第三，系统间的调用关系复杂。"),l(" 假设我们有 6 个不同的应用，如果没有提前规划，软件工程师想梳理清系统间的调用关系会非常困难。这里我们急需一种技术帮助我们梳理清系统间的调用关系。")],-1),A=t("p",null,"难以梳理的调用关系",-1),m=t("p",null,[t("strong",null,"第四，过度的重复建设。"),l(" 在公司进行项目开发时，因为是每一个团队负责独立的系统，而这些系统往往需要一些通用的底层设施。例如：用户认证与权限控制、黑名单白名单、流量控制与系统异常的处理以及系统参数的配置管理等模块。而这些模块在每一个子系统中都要重复的进行开发，这显然是一件费时费力的事情，不利于数据的集中管理。")],-1),T=t("p",null,[t("strong",null,'第五，"大一统"的架构设计。'),l(" 所谓大一统架构设计，是指很多公司希望采用一套统一的架构来适应公司各个不同职能的子系统。比如，之前所有的系统是将数据统一存放在性能强大的 Oracle 数据库集群中。但这里有一个弊端，作为借款人门户系统，需要对用户开放大量的全文检索。如果你对数据检索技术有了解，会明白Oracle这种关系型数据库并不擅长全文检索功能，实际应交给Elasticsearch全文检索引擎进行处理。")],-1),P=t("p",null,"对于借款人门户网站的需求，需要额外引入 Elasticsearch 集群。因为新的集群是借款人门户网站专用的，所以理应由借款人门户的团队来独立管理与维护。此时你会发现，Elasticsearch对于其他的子系统是没有意义的，但因为大一统的架构设计约束，其他系统也必须要支持 Elasticsearch，这显然是不合理的。",-1),C=p('<p>大一统架构的弊端</p><p>以上的五点弊端，只是传统的分布式架构中的一个缩影。其他问题当然还有很多在这儿我就不一一列举。</p><h3 id="微服务架构又是如何解决这些问题的" tabindex="-1">微服务架构又是如何解决这些问题的 <a class="header-anchor" href="#微服务架构又是如何解决这些问题的" aria-label="Permalink to &quot;微服务架构又是如何解决这些问题的&quot;">​</a></h3><p>当我们引入微服务架构后，是如何解决这些问题的呢？</p><p>微服务的特点有三个：</p><ul><li><p>构建基于业务、可重用、职责明确的小型服务；</p></li><li><p>统一的通信标准，轻量级的通信协议，通常这里的通信协议是指的 RESTful；</p></li><li><p>可独立运行，独立存储由独立团队进行维护。</p></li></ul><p>以上是微服务三个具体的特点。如果放在刚才的业务流程中，具体会变成什么样子呢？</p><p>当微服务改造以后，我们的架构会变成这个样子。</p>',8),b=t("p",null,"微服务架构",-1),S=t("p",null,"我们将原有的各个子系统中的核心的服务进行了抽象形成服务层，而在服务层中又可以按照是否与业务相关，分为业务服务层和基础服务层。",-1),O=t("p",null,"其中业务服务层是原有各个子系统中抽象出来的可以被充分重用的服务模块，原有借款人门户中普惠金融的业务逻辑可以剥离为普惠金融服务，同时由专门的团队对其进行维护。作为服务，它有着独立的 Oracle 数据库进行存储，相类似的贷后催收也都有相应的服务来进行支撑，拥有独立的团队以及独立的数据存储。",-1),E=t("p",null,"而在最下方的基础服务层，则是抽象出一个与业务无关的底层的基础设施。例如数据同步服务、配置中心服务、全文检索服务它都是面向所有服务对外暴露的。",-1),W=t("p",null,"以上就是改造后的微服务架构。那么，分布式系统传统的问题是如何通过微服务架构解决的，咱们分别来看。",-1),f=t("p",null,"首先，微服务架构提供了轻松而统一的进程间通信标准。以信审与贷后系统的通信为例，之前采用 WebService，要求客户端和服务端必须持有相同的通信对象。在改为 RESTful 通信后，RESTful 是基于 HTTP 协议的轻量级通信方式。它并不强制要求客户端一定持有通信对象，可以使用 Java 中的 HttpClient或者 OkHttp 组件，发起标准的 HTTP 请求就可以通信，返回的数据也是标准的 JSON 结构。对于这样的通信形式，在我们实际使用时，如果单纯由服务端进行了响应数据的扩展，在后续通信时是并不强制要求调用端必须对代码进行升级，服务端与调用端是彼此兼容的。",-1),I=t("p",null,"RESTful 消息通信",-1),q=t("p",null,"其次，屏蔽分布式应用的应用复杂度，假设贷后服务额外增加了两个节点，对于微服务架构来说，它有一个关键组件名为注册中心，下面是具体的执行顺序：",-1),N=t("ol",null,[t("li",null,[t("p",null,"信审服务和贷后服务，它在启动时会将服务可用的节点的 IP 以及相应状态在注册中心中进行登记。")]),t("li",null,[t("p",null,"当信审服务向贷后服务发起调用通知之前，首先信审服务从注册中心中获取贷后服务可用的 IP 列表。")]),t("li",null,[t("p",null,"信审服务根据某种负载均衡规则，向具体的节点发起 HTTP 请求来完成业务的处理。")])],-1),k=t("p",null,"因为所有的 IP 地址以及节点的状态都是由注册中心来维护的，所以信审服务作为使用者，是不需要了解贷后服务有具体哪些节点的。这就有效地降低了分布式应用之间的耦合，提高了程序的可维护性。",-1),V=t("p",null,'基于"注册中心"的动态发现机制',-1),x=t("p",null,"第三，内建链路跟踪体系。在传统的分布式应用中，要梳理服务间的调用关系，实际是一件很烦琐的事情。到了微服务体系下，这个问题就很好解决。因为微服务标准中提供了链路跟踪的技术实现。以当前为例，有三个服务 A、B、C，如图所示，ABC 三个服务之间的调用顺序以及调用时长一目了然。通过可视化的形式，可以直观了解服务间的通信过程以及通信的状态，帮助我们对程序进行进一步的管理。",-1),F=t("p",null,"内建链路跟踪体系",-1),H=t("p",null,"第四，是减少重复建设，基础数据管理更加集中。在微服务体系中，这里有一个用户认证中心的服务，其本意在前端应用实际发起请求前，对用户的身份和权限来进行判断。不同系统用户认证的过程都是类似的，我们把它抽象出一个通用的用户认证中心，这样做不但可以减少每一个子系统的重复建设，还可以将用户这个信息来进行集中的统一存储。",-1),M=t("p",null,"第五，更有弹性的架构设计。假如借款人门户需要全文检索的支持，那么与之对应的普惠金融服务中，便可以为其专门增加 Elasticsearch 来进行支持。对于某一个服务加入新的特性，并不影响其他服务的运行。",-1),R=t("p",null,'"专物专用"的弹性架构',-1),D=t("p",null,'之后随着业务的不断演化，其他服务假如也需要 Elasticsearch 全文检索的话，这时我们便可以进行进一步抽象。剥离出"全文检索服务"基础服务，来为其他服务提供支撑。因为在微服务架构中，我们采用了统一的标准来进行开发，所以它的升级改造工作难度比较小。',-1),v=p('<p>下沉为基础服务</p><p>可以看到引入微服务后因为有了统一的分布式应用标准，以往的分布式系统各种问题都可以得到较好的解决。</p><h3 id="小结与预告" tabindex="-1">小结与预告 <a class="header-anchor" href="#小结与预告" aria-label="Permalink to &quot;小结与预告&quot;">​</a></h3><p>微服务架构是目前构建互联网应用的主流解决方案，本节课我们总结了微服务的三大特点：</p><ul><li><p>基于业务、可重用的、职责明确的小型服务。</p></li><li><p>统一的通信标准，轻量级的通信协议。</p></li><li><p>可独立运行，独立存储由独立团队进行维护。</p></li></ul><p>与此同时，还通过案例分析的方式讲解了微服架构解决了哪些传统分布式应用的弊端。</p><p>这里给你留一道思考题：《人月神话》一书中反复提到&quot;世界上没有银弹&quot;，任何架构都有自己的缺点。请你思考，在引入微服务架构后会产生哪些新的问题呢？</p><p>在下一课时，我们将对微服务在设计与实践过程中会遇到哪些新问题展开讨论，并逐一通过技术或者管理手段解决这些新问题。</p>',8);function J(L,B,U,$,j,w){const s=a("Image");return i(),n("div",null,[c,_(s,{alt:"图1.png",src:"https://s0.lgstatic.com/i/image6/M01/10/F9/Cgp9HWA_OW-AZJbhAAGZWbtCuSQ943.png"}),l(),r,_(s,{alt:"图片2.png",src:"https://s0.lgstatic.com/i/image6/M00/10/F4/CioPOWA_N2OAc95sAACj_UNwcrw681.png"}),l(),h,g,_(s,{alt:"图片3.png",src:"https://s0.lgstatic.com/i/image6/M00/10/F8/Cgp9HWA_N3SATerXAADi8b-0LtA082.png"}),l(),u,d,_(s,{alt:"图片44.png",src:"https://s0.lgstatic.com/i/image6/M01/10/F9/Cgp9HWA_OTuAT5ihAAHZoAL3Uxk197.png"}),l(),A,m,T,P,_(s,{alt:"图片55.png",src:"https://s0.lgstatic.com/i/image6/M01/10/F6/CioPOWA_OemAcGCOAAI92RtDt9A848.png"}),l(),C,_(s,{alt:"图片66.png",src:"https://s0.lgstatic.com/i/image6/M01/10/F6/CioPOWA_Oi2AJ7oiAAL95Nq2PtE806.png"}),l(),b,S,O,E,W,f,_(s,{alt:"图片7.png",src:"https://s0.lgstatic.com/i/image6/M01/10/F8/Cgp9HWA_ODyAV1VUAABaLpR_z64885.png"}),l(),I,q,N,k,_(s,{alt:"图片8.png",src:"https://s0.lgstatic.com/i/image6/M00/10/F5/CioPOWA_OEuAcWRPAADA0Dabxj4550.png"}),l(),V,x,_(s,{alt:"图片99.png",src:"https://s0.lgstatic.com/i/image6/M01/10/F5/CioPOWA_OJuAKPe5AAXrNxdJPCw112.png"}),l(),F,H,M,_(s,{alt:"图片1010.png",src:"https://s0.lgstatic.com/i/image6/M01/10/F5/CioPOWA_OOuAWpniAALL5r1FvmE743.png"}),l(),R,D,_(s,{alt:"图片1111.png",src:"https://s0.lgstatic.com/i/image6/M01/10/F9/Cgp9HWA_OPiAcNzeAAL1emX2qEE826.png"}),l(),v])}const z=o(e,[["render",J]]);export{Z as __pageData,z as default};
