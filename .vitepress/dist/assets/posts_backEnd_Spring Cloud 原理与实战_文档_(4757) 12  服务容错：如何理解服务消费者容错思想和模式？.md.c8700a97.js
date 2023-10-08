import{_ as o,j as n,o as i,g as l,k as r,h as s,Q as a,s as t}from"./chunks/framework.a0d18f64.js";const Q=JSON.parse('{"title":"12服务容错：如何理解服务消费者容错思想和模式？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/Spring Cloud 原理与实战_文档/(4757) 12  服务容错：如何理解服务消费者容错思想和模式？.md","filePath":"posts/backEnd/Spring Cloud 原理与实战_文档/(4757) 12  服务容错：如何理解服务消费者容错思想和模式？.md","lastUpdated":1696682708000}'),_={name:"posts/backEnd/Spring Cloud 原理与实战_文档/(4757) 12  服务容错：如何理解服务消费者容错思想和模式？.md"},p=a('<h1 id="_12服务容错-如何理解服务消费者容错思想和模式" tabindex="-1">12服务容错：如何理解服务消费者容错思想和模式？ <a class="header-anchor" href="#_12服务容错-如何理解服务消费者容错思想和模式" aria-label="Permalink to &quot;12服务容错：如何理解服务消费者容错思想和模式？&quot;">​</a></h1><p>在介绍完 API 网关之后，我们继续讨论微服务架构中的一个核心话题，即<strong>服务容错</strong> 。相较传统单体系统中的函数级调用，跨进程的远程调用要复杂很多，也更容易出错。今天的内容关注服务容错的<strong>设计理念</strong> 和与其相关的<strong>架构模式</strong>。</p><h3 id="为什么要实现服务容错" tabindex="-1">为什么要实现服务容错？ <a class="header-anchor" href="#为什么要实现服务容错" aria-label="Permalink to &quot;为什么要实现服务容错？&quot;">​</a></h3><p>我们知道，在微服务架构中，服务之间通过跨进程的远程调用来完成交互。假设系统中存在两个微服务，分别是服务 A 和服务 B，其中服务 B 会调用服务 A，如下图所示：</p>',4),c=t("p",null,"服务 B 调用服务 A 示意图",-1),g=t("p",null,"现在，系统出现故障了。首先，服务 A 因为某种原因发生了宕机而变得不可用，这是故障的第一阶段。如下图所示：",-1),d=t("p",null,"服务 A 变得不可用示意图",-1),h=t("p",null,"服务 A 不可用的原因有很多，包括服务器硬件等环境问题，也包括服务自身存在 Bug 等因素。而当访问服务 A 得不到正常的响应时，服务 B 的常见处理方式是通过重试机制来进一步加大对服务 A 的访问流量。这样，服务 B 每进行一次重试就会启动一批线程。我们知道线程的不断创建是需要消耗系统资源的，一旦系统资源被耗尽，服务 B 本身也将变得不可用，这就是事故的第二个阶段：",-1),u=a('<p>服务 B 变得不可用示意图</p><p>我们进一步假设，微服务系统中还存在依赖于服务 B 的服务 C。这样，基于同样的原因，服务 B 的不可用同样会导致服务 C 的不可用。类似的，系统中可能还存在服务 D 等其他服务依赖服务 C......以此类推，最终在以服务 A 为起点的整个调用链路上的所有服务都会变得不可用。这种扩散效应就是所谓的<strong>服务雪崩效应</strong>。</p><p>服务雪崩效应本质上是一种<strong>服务依赖失败</strong>。服务依赖失败较之服务自身失败而言，影响更大，也更加难以发现和处理。因此，服务依赖失败是我们在设计微服务架构中所需要重点考虑的服务可靠性因素。</p><p>显然，应对雪崩效应的切入点不在于服务提供者，而在于服务消费者。我们不能保证所有服务提供者都不会失败，但是我们要想办法确保服务消费者不受已失败的服务提供者的影响，或者说需要将服务消费者所受到的这种影响降到最低，这就是服务<strong>消费者容错</strong>的需求。而为了应对这个需求，业界也存在一些成熟的模式可以进行应用。</p><h3 id="服务容错的模式" tabindex="-1">服务容错的模式 <a class="header-anchor" href="#服务容错的模式" aria-label="Permalink to &quot;服务容错的模式&quot;">​</a></h3><p>消费者容错的常见实现模式包括集群容错、服务隔离、服务熔断和服务回退，如下图所示：</p>',6),C=a('<p>服务容错常见技术</p><p>接下来，我们对上图中的四种服务容错模式进行一一展开。</p><h4 id="集群容错" tabindex="-1">集群容错 <a class="header-anchor" href="#集群容错" aria-label="Permalink to &quot;集群容错&quot;">​</a></h4><p>在介绍服务治理部分内容时，我们提到了<strong>集群</strong> 和<strong>客户端负载均衡</strong> 。从消费者容错的角度讲，负载均衡不失为一种好的容错策略。从设计思想上讲，容错机制的基本要素就是要做到<strong>冗余</strong> ，即某一个服务应该构建多个实例，这样当一个服务实例出现问题时可以重试其他实例。一个集群中的服务本身就是冗余的。而针对不同的重试方式就诞生了一批集群容错策略，常见的包括 <strong>Failover（失效转移）</strong> 、<strong>Failback（失败通知）</strong> 、<strong>Failsafe（失败安全</strong> ）和 <strong>Failfast</strong> （<strong>快速失败</strong>）等。</p><p>这里以最常见、最实用的集群容错策略 Failover 为例展开讨论。Failover 即<strong>失效转移</strong>，当发生服务调用异常时，请求会重新在集群中查找下一个可用的服务提供者实例。如下图所示：</p>',5),A=a('<p>Failover 集群容错策略示意图</p><p>为了防止无限重试，如果采用 Failover 机制，通常会对<strong>失败重试最大次数</strong>进行限制。</p><h4 id="服务隔离" tabindex="-1">服务隔离 <a class="header-anchor" href="#服务隔离" aria-label="Permalink to &quot;服务隔离&quot;">​</a></h4><p>所谓隔离，就是指对资源进行有效的管理，从而避免因为资源不可用、发生失败等情况导致系统中的其他资源也变得不可用。在设计思想上，我们希望在系统发生故障时能够对该故障的传播和影响范围做出有效的控制。服务隔离包括一些常见的隔离思路，以及特定的隔离实现技术框架。在日常开发过程中，我们主要的处理对象还是<strong>线程级别的隔离</strong>。</p><p>要实现线程隔离，简单而主流的做法是使用<strong>线程池（Thread Pool）</strong>。针对不同的业务场景，我们可以设计不同的线程池。因为不同的线程池之间线程是不共享的，所以某个线程池因为业务异常导致资源消耗时，不会将这种资源消耗扩散到其他线程池，从而保证其他服务持续可用。</p><p><strong>服务隔离</strong>的概念比较抽象，接下来我们通过一个实例来进一步介绍它的工作场景。我们知道在 SpringHealth 案例中存在 user-service、device-service 和 intevention-service 这三个微服务。从资源的角度讲，假设这 3 个服务一共能够使用的线程数是 300 个，其他服务调用这三个服务时会共享这 300 个线程，如下图所示：</p>',6),m=t("p",null,"三个微服务共享线程池的场景示意图",-1),S=t("p",null,"在上图中，如果其中的 user-service 不可用, 就会出现线程池里所有线程被这个服务消耗殆尽 从而造成服务雪崩，如下图所示：",-1),T=t("p",null,"没有使用线程池隔离造成的服务雪崩场景示意图",-1),k=t("p",null,"现在，系统中的 300 个线程都被 user-service 所占用，device-service 和 intevention-service 已经分不到任何线程来响应请求。",-1),b=t("p",null,"线程隔离机制的实现方法也很简单，就是为每个服务分配独立的线程池以实现资源隔离，例如我们可以为 3 个服务平均分配 100 个线程，见下图：",-1),B=t("p",null,"使用线程池隔离的场景示意图",-1),q=t("p",null,"在上图中, 当 user-service 不可用时, 最差的情况也就是消耗分配给它的 100 个线程，而其他的线程都还是属于各个微服务中，不会受它的影响。",-1),P=t("p",null,"从服务隔离的角度讲，线程隔离是一种比较细粒度的处理机制。而 Spring Cloud Circuit Breaker 同样对服务隔离提供了不同维度和粒度的支持。",-1),f=t("h4",{id:"服务熔断",tabindex:"-1"},[s("服务熔断 "),t("a",{class:"header-anchor",href:"#服务熔断","aria-label":'Permalink to "服务熔断"'},"​")],-1),F=t("p",null,'讲完服务隔离，接下来我们来看服务熔断。服务熔断的概念来源于日常生活中的电路系统，在电路系统中存在一种熔断器（Circuit Breaker），它的作用就是在电流过大时自动切断电路。在微服务架构中，也存在类似的"熔断器"：当系统中出现某一个异常情况时，能够直接熔断整个服务的请求处理过程。这样可以避免一直等到请求处理完毕或超时，从而避免浪费。',-1),v=t("p",null,"从设计理念上讲，服务熔断也是快速失败的一种具体表现。当服务消费者向服务提供者发起远程调用时，服务熔断器会监控该次调用，如果调用的响应时间过长，服务熔断器就会中断本次调用并直接返回。请注意服务熔断器判断本次调用是否应该快速失败是有状态的，也就是说服务熔断器会把所有的调用结果都记录下来，如果发生异常的调用次数达到一定的阈值，那么服务熔断机制才会被触发，快速失败就会生效；反之，将按照正常的流程执行远程调用。",-1),x=t("p",null,"我们对以上过程进行抽象和提炼，可以得到服务熔断器的基本结构，如下图所示：",-1),I=a('<p>服务熔断器结构示意图</p><p>可以看到，这个结构给出了熔断器在实现上需要考虑的三个状态机。在上图中，我们使用不同的颜色标明了执行熔断的程度：</p><ul><li><p><strong>Closed：</strong> 对于熔断器而言，Closed 状态代表熔断器不进行任何的熔断处理。尽管这个时候人们感觉不到熔断器的存在，但它在背后会对调用失败次数进行积累，到达一定阈值或比例时则自动启动熔断机制。</p></li><li><p><strong>Open：</strong> 一旦对服务的调用失败次数达到一定阈值时，熔断器就会打开，这时候对服务的调用将直接返回一个预定的错误，而不执行真正的网络调用。同时，熔断器内置了一个时间间隔，当处理请求达到这个时间间隔时会进入半熔断状态。</p></li><li><p><strong>Half-Open：</strong> 在半开状态下，熔断器会对通过它的部分请求进行处理，如果对这些请求的成功处理数量达到一定比例则认为服务已恢复正常，就会关闭熔断器，反之就会打开熔断器。</p></li></ul><p>Spring Cloud Circuit Breaker 中同样实现了服务熔断器组件，具备与上图类似的结构和功能。</p><h4 id="服务回退" tabindex="-1">服务回退 <a class="header-anchor" href="#服务回退" aria-label="Permalink to &quot;服务回退&quot;">​</a></h4><p>服务回退（Fallback）的概念类似一种<strong>被动的、临时的处理机制</strong> 。当远程调用发生异常时，服务回退并不是直接抛出异常，而是产生一个另外的处理机制来应对该异常。这相当于执行了另一条路径上的代码或返回一个默认处理结果。而这条路径上的代码或这个默认处理结果并一定满足业务逻辑的实现需求，只是告知服务的消费者当前调用中所存在的问题。显然，服务回退不能解决由异常引起的实际问题，而是一种<strong>权宜之计</strong>。这种权宜之计在处理因为服务依赖而导致的异常时也是一种有效的容错机制。</p><p>在现实环境中，服务回退的实现方式可以很简单，原则上只需要保证异常被捕获并返回一个处理结果即可。但在有些场景下，回退的策略则可以非常复杂，我们可能会从其他服务或数据中获取相应的处理结果，需要具体问题具体分析。</p><p>Spring Cloud Circuit Breaker 支持服务回退，开发人员只需要提供一个自定义回退方法（Fallback Method），就可以非常简单地使用这一机制来支持服务回退。</p><h3 id="spring-cloud-中的服务容错解决方案" tabindex="-1">Spring Cloud 中的服务容错解决方案 <a class="header-anchor" href="#spring-cloud-中的服务容错解决方案" aria-label="Permalink to &quot;Spring Cloud 中的服务容错解决方案&quot;">​</a></h3><p>在前面的内容中，我们已经知道 Spring Cloud 中专门用于提供服务容错功能的 Spring Cloud Circuit Breaker 框架。从命名上看，Spring Cloud Circuit Breaker 是对熔断器的一种抽象，支持不同的熔断器实现方案。在 Spring Cloud Circuit Breaker 中，内置了四种熔断器，如下所示：</p>',10),D=t("p",null,"Spring Cloud Circuit Breaker 中的四种熔断器实现机制",-1),M=t("p",null,"针对以上四种熔断器，Spring Cloud Circuit Breaker 提供了统一的 API。其中 Netflix Hystrix 显然来自 Netflix OSS；Resilience4j 是受 Hystrix 项目启发所诞生的一款新型的容错库；Sentinel 从定位上讲是一款包含了熔断降级功能的高可用流量防护组件；而最后的 Spring Retry 是 Spring 自研的重试和熔断框架。",-1),E=t("h3",{id:"小结与预告",tabindex:"-1"},[s("小结与预告 "),t("a",{class:"header-anchor",href:"#小结与预告","aria-label":'Permalink to "小结与预告"'},"​")],-1),N=t("p",null,"服务容错是微服务架构中值得深入探讨的一个核心话题，本节的内容关注服务容错的一些理论知识，包括服务容错的设计思想，以及相关的实现模式。今天，我们详细探讨了四种服务容错的实现模式，并结合 Spring Cloud 中的 Spring Cloud Circuit Breaker 框架给出了对应的解决方案。",-1),V=t("p",null,"这里给你留一道思考题：在 Spring Cloud Circuit Breaker 中，分别提供了哪些可以用于实现服务容错的实现技术？",-1),H=t("p",null,"在引入了 Spring Cloud Circuit Breaker 框架之后，下一课时我们先来关注第一种服务容错实现框架，即 Netflix 中的 Hystrix。",-1);function R(O,y,z,G,J,$){const e=n("Image");return i(),l("div",null,[p,r(e,{alt:"图片1.png",src:"https://s0.lgstatic.com/i/image/M00/65/3C/Ciqc1F-aaAaAF-pdAAC-S7CthIM956.png"}),s(),c,g,r(e,{alt:"图片2.png",src:"https://s0.lgstatic.com/i/image/M00/65/48/CgqCHl-aaBGARyczAAGrk2396FY269.png"}),s(),d,h,r(e,{alt:"图片3.png",src:"https://s0.lgstatic.com/i/image/M00/65/3D/Ciqc1F-aaB6AOI9LAAKNbr6vP8w792.png"}),s(),u,r(e,{alt:"图片4.png",src:"https://s0.lgstatic.com/i/image/M00/65/3D/Ciqc1F-aaCqAdX5XAACeZuy60tk400.png"}),s(),C,r(e,{alt:"图片5.png",src:"https://s0.lgstatic.com/i/image/M00/65/3D/Ciqc1F-aaDWAJ6C3AAGFMtzWjWs730.png"}),s(),A,r(e,{alt:"图片6.png",src:"https://s0.lgstatic.com/i/image/M00/65/48/CgqCHl-aaD6AREizAAFmbRDmQDg090.png"}),s(),m,S,r(e,{alt:"图片7.png",src:"https://s0.lgstatic.com/i/image/M00/65/48/CgqCHl-aaESAQUZRAACteK33CYI791.png"}),s(),T,k,b,r(e,{alt:"图片8.png",src:"https://s0.lgstatic.com/i/image/M00/65/3D/Ciqc1F-aaEuAM1zFAAHUJoAmO-8574.png"}),s(),B,q,P,f,F,v,x,r(e,{alt:"图片9.png",src:"https://s0.lgstatic.com/i/image/M00/65/48/CgqCHl-aaFaAbhF4AAJes3EgGT8670.png"}),s(),I,r(e,{alt:"图片10.png",src:"https://s0.lgstatic.com/i/image/M00/65/48/CgqCHl-aaF6AMmIgAAChEAOZvc0229.png"}),s(),D,M,E,N,V,H])}const U=o(_,[["render",R]]);export{Q as __pageData,U as default};
