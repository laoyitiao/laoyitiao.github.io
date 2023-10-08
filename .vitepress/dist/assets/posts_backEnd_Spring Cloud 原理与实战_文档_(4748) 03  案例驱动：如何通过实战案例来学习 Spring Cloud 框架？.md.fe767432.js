import{_ as a,j as o,o as l,g as s,k as n,h as t,Q as i,s as r}from"./chunks/framework.4e7d56ce.js";const x=JSON.parse('{"title":"03案例驱动：如何通过实战案例来学习SpringCloud框架？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/Spring Cloud 原理与实战_文档/(4748) 03  案例驱动：如何通过实战案例来学习 Spring Cloud 框架？.md","filePath":"posts/backEnd/Spring Cloud 原理与实战_文档/(4748) 03  案例驱动：如何通过实战案例来学习 Spring Cloud 框架？.md","lastUpdated":1696682708000}'),p={name:"posts/backEnd/Spring Cloud 原理与实战_文档/(4748) 03  案例驱动：如何通过实战案例来学习 Spring Cloud 框架？.md"},g=i('<h1 id="_03案例驱动-如何通过实战案例来学习springcloud框架" tabindex="-1">03案例驱动：如何通过实战案例来学习SpringCloud框架？ <a class="header-anchor" href="#_03案例驱动-如何通过实战案例来学习springcloud框架" aria-label="Permalink to &quot;03案例驱动：如何通过实战案例来学习SpringCloud框架？&quot;">​</a></h1><p>今天我们为大家讲解一些实战案例，从而学习 Spring Cloud 框架。</p><p>在物联网和智能穿戴式设备日益发达的当下，试想一下这样的日常场景，患者通过智能手环、便携式脉诊仪等一些智能穿戴式设备检测自身的各项健康信息，然后把这些健康信息实时上报到云平台，云平台检测到用户健康信息中的异常情况时会通过人工或自动的方式进行一定的健康干预，从而确保用户健康得到保证。这是大健康领域非常典型的一个业务场景，也是我们案例的来源。</p><h3 id="springhealth-案例驱动" tabindex="-1">SpringHealth：案例驱动 <a class="header-anchor" href="#springhealth-案例驱动" aria-label="Permalink to &quot;SpringHealth：案例驱动&quot;">​</a></h3><p>在本课程中，我们将基于上述应用场景，通过构建一个精简但又完整的系统来展示微服务架构相关的设计理念和各项技术组件，这个案例系统称为<strong>SpringHealth</strong>。表现的是现实场景下健康地干预，过程非常复杂。而我们案例的目的在于演示从业务领域分析到系统架构设计再到系统实现的整个过程，不在于介绍具体业务逻辑。所以，案例在业务领域建模上做了高度抽象和简化，但所涉及的各项技术都可以直接应用到日常开发过程中。</p><p>按照在&quot;追本溯源：究竟什么样的架构才是微服务架构？&quot;中所介绍的微服务架构的基本要素，服务建模是案例分析的第一步。服务建模包括<strong>子域与界限上下文的划分</strong> 以及<strong>服务拆分和集成策略的确定</strong>。SpringHealth 包含的业务场景比较简单，用户佩戴着各种穿戴式设备，云平台中的医护人员可以根据这些设备上报的健康信息生成健康干预。而在生成健康干预的过程中，我们需要对设备本身以及用户信息进行验证。从领域建模的角度进行分析，我们可以把该系统分成三个子域，即：</p><ul><li><p><strong>用户（User）子域</strong>，用于用户管理，用户可以通过注册成为系统用户，同时也可以修改或删除用户信息，并提供用户信息有效性验证的入口。</p></li><li><p><strong>设备（Device）子域</strong>，用于设备管理，医护人员可以查询某个用户的某款穿戴式设备以便获取设备的详细信息，同时基于设备获取当前的健康信息。</p></li><li><p><strong>健康干预（Intervention）子域</strong>，用于健康干预管理，医护人员可以根据用户当前的健康信息生成对应的健康干预。当然，也可以查询自己所提交健康干预的当前状态。</p></li></ul><p>从子域的分类上讲，用户子域比较明确，显然应该作为一种通用子域。而健康干预是 SpringHealth 的核心业务，所以应该是核心子域。至于设备子域，在这里比较倾向于归为支撑子域，如下图所示：</p>',8),_=r("p",null,"SpringHealth 的子域",-1),h=r("p",null,"为了演示起见，这里我们对每个子域所包含的内容尽量做了简化。所以，对每一个子域都只提取一个微服务作为示例。基于以上分析，我们可以把 SpringHealth 划分成三个微服务，即 user-service、device-service 和 intervention-service。下图展示了 SpringHealth 的基本架构，在图中，intervention-service 需要基于 REST 风格完成与 user-service 和 device-service 服务之间的远程交互。",-1),u=i('<p>SpringHealth 服务交互模型</p><p>以上述三个服务构成了 SpringHealth 的业务主体，属于业务微服务。而围绕构建一个完整的微服务系统，我们还需要引入其他很多服务，这些服务从不同的角度为实现微服务架构提供支持。让我们继续来提炼 SpringHealth 中的其他服务。</p><h3 id="springhealth-服务设计" tabindex="-1">SpringHealth：服务设计 <a class="header-anchor" href="#springhealth-服务设计" aria-label="Permalink to &quot;SpringHealth：服务设计&quot;">​</a></h3><p>纵观整个 SpringHealth 系统，除了前面介绍的三个业务微服务之外，实际上更多的服务来自非业务性的基础设施类服务。在开始代码实现之前，我们也先需要对案例中的服务划分、依赖关系以及数据管理等方面进行设计。</p><h4 id="_1-服务列表" tabindex="-1">1. 服务列表 <a class="header-anchor" href="#_1-服务列表" aria-label="Permalink to &quot;1. 服务列表&quot;">​</a></h4><p>当我们采用 Spring Cloud 构建完整的微服务技术解决方案时，部分技术组件需要通过独立服务的形式进行运作，具体包括：</p><ul><li><strong>注册中心服务</strong></li></ul><p>在本课程中，我们将采用 Spring Cloud Netflix 中的 Eureka 来构建用于服务发现和服务注册的注册中心。Eureka 同时具备<strong>服务器端组件</strong> 和<strong>客户端组件</strong>，其中客户端组件内嵌在各个业务微服务中，而服务器端组件则是独立的，所以需要构建一个 Eureka 服务。我们将这个服务命名为 eureka-server。</p><ul><li><strong>配置中心服务</strong></li></ul><p>与 Eureka 一样，基于 Spring Cloud Config 构建的配置中心同样存在服务器端组件和客户端组件，其中的服务器端组件也需要构建一<strong>个独立的配置服务</strong>。我们将这个服务命名为 config-server。</p><ul><li><strong>API网关服务</strong></li></ul><p>对于网关服务而言，无论是使用 Spring Cloud Netflix 中的 Zuul 还是 Spring 自建的 Spring Cloud Gateway，都需要构建一个独立的服务来承接各种<strong>路由、安全和监控等功能</strong>。针对这两款工具，我们建立两个独立的 zuul-server 和 gateway-server 服务，并根据需要分别采用其中的一个服务进行运行。</p><ul><li><strong>安全授权服务</strong></li></ul><p>接下来的一个基础设施类服务就是安全授权服务。如果我们采用 Spring Cloud Security 所提供的 OAuth2 协议，那就需要构建一个<strong>独立的 OAuth2 授权服务</strong>来生成服务访问所需要的 Token 信息。我们把这个服务命名为 auth-server。</p><ul><li><strong>Zipkin 服务</strong></li></ul><p>案例中最后一个基础设施类服务是 Zipkin 服务，这个服务并不是必需的，而是取决于我们是否需要对服务访问链路进行<strong>可视化展示</strong>。在本课程中，我们将通过可视化的方式展示服务链路，因此将构建一个独立的 zipkin-server 服务。</p><p>回到案例，这样整个 SpringHealth 的所有服务如下表所示。对于基础设施类服务，命名上我们统一以 -server 来结尾，而对于业务服务，则使用的是 -service 后缀。</p>',17),d=r("p",null,"SpringHealth 服务列表",-1),c=r("h4",{id:"_2-服务数据",tabindex:"-1"},[t("2. 服务数据 "),r("a",{class:"header-anchor",href:"#_2-服务数据","aria-label":'Permalink to "2. 服务数据"'},"​")],-1),S=r("p",null,'关于微服务架构中各种数据的管理策略，业界也存在两大类不同的观点。一种观点是采用传统的集中式数据管理，即把所有数据存放在一个数据库中，然后通过专业的 DBA 进行统一管理。而站在服务独立性的角度讲，根据"**追本溯源：究竟什么样的架构才是微服务架构？"**中的讨论，微服务开发团队应该是全职能团队，所以微服务架构崇尚把数据也嵌入到微服务内部，由开发人员自己来进行管理。因此，在案例中，我们针对三个业务服务，也将建立独立的三个数据库，数据库的访问信息通过配置中心进行集中管理，如下图所示：',-1),C=r("p",null,"服务级别的独立数据库示意图",-1),m=r("h3",{id:"springhealth-代码工程",tabindex:"-1"},[t("SpringHealth：代码工程 "),r("a",{class:"header-anchor",href:"#springhealth-代码工程","aria-label":'Permalink to "SpringHealth：代码工程"'},"​")],-1),k=r("p",null,[t("虽然案例中的各个服务在物理上都是独立的微服务，但从整个系统而言，需要相互协作构成一个完整的微服务系统。也就是说，服务运行时上存在一定的依赖性。我们结合系统架构对 SpringHealth 的运行方式进行梳理，梳理的基本方法就是按照服务列表构建独立服务，并"),r("strong",null,"基于注册中心来管理它们之间的依赖关系"),t("，如下图所示：")],-1),A=i('<p>基于注册中心的服务运行时依赖关系图</p><p>在介绍案例的具体代码实现之前，我们也先对所使用的框架工具和对应的版本进行一定的约定。在课程中，使用的 Spring Cloud 是 Hoxton 系列版本。我们将统一使用 Maven 来组织每个工程的代码结构和依赖管理。本案例的代码统一维护在 GitHub 上，详细地址为：<a href="https://github.com/tianyilan12/springcloud-demo" target="_blank" rel="noreferrer">https://github.com/tianyilan12/springcloud-demo</a>。基于这个案例，关于如何基于 Spring Cloud 构建微服务架构的各项核心技术都会在得到详细的体现。</p><h3 id="案例之外-从案例实战到原理剖析" tabindex="-1">案例之外：从案例实战到原理剖析 <a class="header-anchor" href="#案例之外-从案例实战到原理剖析" aria-label="Permalink to &quot;案例之外：从案例实战到原理剖析&quot;">​</a></h3><p>更进一步，通过案例帮你完成基于 Spring Cloud 框架构建微服务系统是本课程的一大目标，但并不是唯一目标。作为扩展，我们希望通过对优秀开源框架的学习，掌握微服务核心组件背后的运行机制，从而深入理解分布式系统以及微服务架构的实现原理。</p><p>在本课程中，我们将通过源码解析来剖析 Spring Cloud 中核心组件的工作原理，典型的场景包括以下几点：</p><ul><li><p><strong>服务治理原理剖析</strong>。服务治理的原理剖析涉及两大块内容，一块是构建 Eureka 服务器以及使用 Eureka 客户端的实现机制，另一块则是客户端负载均衡组件 Ribbon 的基本架构和实现原理。</p></li><li><p><strong>服务网关原理剖析</strong>。服务网关中，我们选择基于 Zuul 网关的设计思想、功能组件以及路由机制来对它的实现原理进行详细的展开。</p></li><li><p><strong>服务容错原理剖析</strong>。针对服务容错，我们选择以 Hystrix 为基础，来分析 HystrixCircuitBreaker 核心类的底层实现原理以及基于滑动窗口实现数据采集的运行机制。</p></li><li><p><strong>服务配置原理剖析</strong>。在掌握 Spring Cloud Config 的配置中心应用方式的基础上，我们将重点关注服务器端和客户端的底层交互机制，以及配置信息自动更新的工作原理。</p></li><li><p><strong>事件通信原理剖析</strong>。作为集成了 RabbitMQ 和 Kafka 这两款主流消息中间件的 Spring Cloud Stream 框架，我们的关注点在于它对消息集成过程的抽象以及集成过程的实现原理。</p></li></ul><p>在通过源码级的深入剖析来学习上述核心组件的实现原理时，你可以掌握系统架构设计和实现过程中的方法和技巧，并指导日常的开发工作。</p><h3 id="小结" tabindex="-1">小结 <a class="header-anchor" href="#小结" aria-label="Permalink to &quot;小结&quot;">​</a></h3><p>案例分析是掌握一个框架应用方式的最好方法。本课程是一款以案例驱动的 Spring Cloud 微服务架构开发课程，今天我们就对课程中使用到的 SpringHealth 案例进行了详细的分析和设计，并提炼了所需的完整服务器列表。</p><p>这里给你留一道思考题：在使用 Spring Cloud 时，一个完整的微服务架构需要构建哪些必要的独立服务？</p><p>从下一课时开始，我们就将基于这个案例来解析 Spring Cloud，首当其冲的是服务治理的解决方案。</p>',11);function b(H,f,v,T,q,E){const e=o("Image");return l(),s("div",null,[g,n(e,{alt:"Lark20200924-161905.png",src:"https://s0.lgstatic.com/i/image/M00/57/0F/Ciqc1F9sVt6AS2EvAAGEBoJRu5w931.png"}),t(),_,h,n(e,{alt:"Lark20200924-161917.png",src:"https://s0.lgstatic.com/i/image/M00/57/1A/CgqCHl9sVwqAPd3jAADSSbJlmag192.png"}),t(),u,n(e,{alt:"Lark20200924-161922.png",src:"https://s0.lgstatic.com/i/image/M00/57/0F/Ciqc1F9sVymAMXh-AAEaj_t9r5g097.png"}),t(),d,c,S,n(e,{alt:"Lark20200924-161924.png",src:"https://s0.lgstatic.com/i/image/M00/57/1B/CgqCHl9sV0GAflMuAAEgBy_HDhM795.png"}),t(),C,m,k,n(e,{alt:"Lark20200924-161926.png",src:"https://s0.lgstatic.com/i/image/M00/57/10/Ciqc1F9sV0uATNWEAADLl6S2WeE336.png"}),t(),A])}const V=a(p,[["render",b]]);export{x as __pageData,V as default};
