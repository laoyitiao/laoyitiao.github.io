import{_ as p,o as r,g as i,Q as n}from"./chunks/framework.f949202b.js";const _=JSON.parse('{"title":"Spring Cloud 核心功能 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/Spring Cloud 原理与实战_文档/(4780) 总结  以终为始：微服务架构总结和展望.md","filePath":"posts/backEnd/Spring Cloud 原理与实战_文档/(4780) 总结  以终为始：微服务架构总结和展望.md","lastUpdated":null}'),o={name:"posts/backEnd/Spring Cloud 原理与实战_文档/(4780) 总结  以终为始：微服务架构总结和展望.md"},g=n('<p>终于到了课程的最后一讲。今天，我们将对整个微服务架构和 Spring Cloud 进行总结和展望。Spring Cloud 是业界领先的一款微服务开发框架，提供了多项核心功能，帮忙我们构建完整的分布式服务开发解决方案。作为针对 Spring Cloud 的一门系统化课程，在课程的最后，我们还是先来总结整个课程中所介绍的 Spring Cloud 核心功能，然后梳理我在写作过程中的一些思考和心得。最后，我们还将引出 Spring Cloud 未来发展的演进方向。</p><h3 id="spring-cloud-核心功能" tabindex="-1">Spring Cloud 核心功能 <a class="header-anchor" href="#spring-cloud-核心功能" aria-label="Permalink to &quot;Spring Cloud 核心功能&quot;">​</a></h3><p>Spring Cloud 是 Spring 家族中的核心开发框架。如果你访问 Spring 的官方网站（<a href="https://spring.io/" target="_blank" rel="noreferrer">https://spring.io/</a>），就会对 Spring 家族中的技术体系有一个宏观了解。在 Spring 的主页中，展示了下面这张图：</p><p><img src="https://s0.lgstatic.com/i/image/M00/8F/0F/CgqCHmAGnIaAVoQUAACRuk5Qiko727.png" alt="Drawing 0.png"><br> Spring 家族技术体系（来自 Spring 官网）</p><p>在上图中，这里罗列了 Spring 家族的七大核心技术体系，排在第一位的就是微服务架构，而在Spring 家族中提供微服务开发解决方案的就是 Spring Cloud。Spring Cloud 构建在 Spring Boot 基础之上，它的整体架构图如下所示：</p><p><img src="https://s0.lgstatic.com/i/image/M00/8F/0F/CgqCHmAGnI6AYQo4AAA1B5IapO8788.png" alt="Drawing 1.png"><br> Spring Cloud 与微服务整体架构图（来自 Spring 官网）</p><p>技术组件的完备性是 Spring Cloud 框架的主要优势，它集成了业界一大批知名的微服务开发组件。Spring Cloud 的核心组件如下图所示：</p><p><img src="https://s0.lgstatic.com/i/image/M00/8F/04/Ciqc1GAGnJWATwDmAAL0w96R-zg577.png" alt="Lark20210119-164634.png"><br> Spring Cloud 核心功能组件</p><p>可以看到，基于 Spring Boot 的开发便利性，Spring Cloud 巧妙地简化了微服务系统基础设施的开发过程，包含上图中所展示的服务发现注册、API网关、配置中心、消息总线、负载均衡、熔断器、数据监控等。</p><h3 id="spring-cloud-课程总结" tabindex="-1">Spring Cloud 课程总结 <a class="header-anchor" href="#spring-cloud-课程总结" aria-label="Permalink to &quot;Spring Cloud 课程总结&quot;">​</a></h3><p>总结完所介绍的 Spring Cloud 各项核心功能，我们再来总结整个课程所讲解内容的特色和与其他课程之间的差异化。这里，我也整理了本课程的三大亮点。</p><p>本课程的一大亮点在于介绍了完整的微服务系统开发技术体系。通过学习本课程，你可以全面掌握基于 Spring Cloud 的微服务系统开发技术组件，这其中包括注册中心、配置中心、链路跟踪等基础组件，也包括服务安全性管理和微服务测试等专项主题。</p><p>本课程的第二大亮点在于提供了深入的微服务组件实现原理分析。通过学习本课程，帮助你在掌握 Spring Cloud 框架应用的基础上，深入理解核心技术组件的实现原理，做到知其然而知其所以然。本课程中对注册中心、客户端负载均衡、API网关、熔断器、配置自动更新等主题开展源码级的原理分析和讲解。</p><p>本课程的另一个亮点在于提供了完整的案例代码来介绍 Spring Cloud 中的各大核心组件。这个案例系统足够简单，可以让你从零开始就能理解和掌握其中的各项知识点。但这个案例系统又足够完整，涉及的各个核心功能我们都提供了相关的配置项和示例代码，供你在日常开发过程中进行参考。</p><p>整个课程从平时的积累，到酝酿到启动再到上线也经历了小半年的时间，伴随着这个过程，我把 Spring Cloud 的部分源代码系统地梳理了一遍，并对内部的设计思想和实现原理也做了一些提炼和总结。总体而言，Spring Cloud 是一款代码质量非常高的开源框架，其中关于 Spring 和 Spring Boot 框架的集成、与 Netflix OSS 等外部开源框架的整合，以及 Spring Cloud 自建的配置中心 Spring Cloud Config 和消息通信组件 Spring Cloud Stream 等诸多功能都给我留下了深刻的印象，使我受益良多。相信对于坚持学习到今天的你而言也是一样。</p><h3 id="spring-cloud-的发展和演进" tabindex="-1">Spring Cloud 的发展和演进 <a class="header-anchor" href="#spring-cloud-的发展和演进" aria-label="Permalink to &quot;Spring Cloud 的发展和演进&quot;">​</a></h3><p>最后，我们来对 Spring Cloud 的发展做一些展望。这里重点讲两点。</p><p>首当其冲的，我们来讨论一下 Spring Cloud 的生态系统。目前，在 Spring 官网上已经存在将近 30 个以 Spring Cloud 命名的子项目，包含我们课程中介绍到的 Spring Cloud Commons、Spring Cloud Netflix、Spring Cloud Config、Spring Cloud Gateway、Spring Cloud Stream、Spring Cloud Security 等，也包括课程中没有提到但同样非常有用的 Spring Cloud Function、Spring Cloud Bus 和 Spring Cloud Kubernetes 等。随着技术体系的不断发展，相信这个列表会越来越多。而我们课程中所提到的一些组件，也可能会单独剥离出来形成独立的子项目，这方面比较典型的就是用于实现熔断器的 Spring Cloud Circuit Breaker。</p><p>在 Spring Cloud 生态系统中，我们也不得不提一下 Spring Cloud Alibaba，这是阿里巴巴基于 Spring Cloud 专门开发的一套完整的微服务开发框架。在这套框架中，使用 Sentinel 实现流量控制和服务降级、使用 Nacos 实现服务注册/发现以及分布式配置中心、使用 RocketMQ 实现了消息通信架构以及基于 Seata 实现了分布式事务功能。同时，基于阿里巴巴现有的 Dubbo 框架，Spring Cloud Alibaba 还扩展了服务与服务之间调用的通信协议。整体而言，Spring Cloud Alibaba 值得你进行深入学习和应用。</p><p>另一方面，我们来看一下 Spring Cloud 与 Spring 框架的演进过程。目前 Spring 已经演进到 5.X 版本，随着 Spring 5 的正式发布，我们引来了响应式编程（Reactive Programming）的全新发展时期。Spring 5 中内嵌了与数据管理相关的响应式数据访问、与系统集成相关的响应式消息通信以及与 Web 服务相关的响应式 Web 框架等多种响应式组件，从而极大简化了响应式应用程序的开发过程和难度。下图展示了响应式编程的技术栈与传统的 Servlet 技术栈之间的对比：</p><p><img src="https://s0.lgstatic.com/i/image2/M01/06/F0/CgpVE2AGnKaAKU7_AAHMAtG9fS4245.png" alt="Lark20210119-164629.png"><br> 响应式编程技术栈与 Servlet 技术栈之间的对比图（来自 Spring 官网）</p><p>可以看到，上图左侧为基于 Spring Webflux 的技术栈，右侧为基于 Spring MVC 的技术栈。我们知道传统的 Spring MVC 构建在 Java EE 的 Servlet 标准之上，该标准本身就是阻塞式和同步的。而 Spring WebFlux 基于响应式流，因此可以用来构建异步非阻塞的服务。</p><p>WebFlux 等响应式编程技术的兴起为微服务架构的发展提供了一个很好的场景。我们知道在一个微服务系统中，存在数十乃至数百个独立的微服务，它们相互通信以完成复杂的业务流程。这个过程势必涉及大量的 I/O 操作。I/O 操作，尤其是阻塞式 I/O 操作就会整体增加系统的延迟并降低吞吐量。如果能够在复杂的流程中集成非阻塞、异步通信机制，我们就可以高效处理跨服务之间的网络请求。针对这种场景，WebFlux 也是一种非常有效的解决方案。让我们期待响应式编程技术与微服务之间更加紧密的结合。</p><p>至此，整个《Spring Cloud 原理与实战》课程就全部介绍完毕了。最后，祝我们在各自的岗位上能够更上一层楼！</p>',24),l=[g];function a(t,S,e,d,u,C){return r(),i("div",null,l)}const c=p(o,[["render",a]]);export{_ as __pageData,c as default};
