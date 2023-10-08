import{_ as e,j as t,o as p,g as l,k as _,h as i,Q as s,s as o}from"./chunks/framework.4e7d56ce.js";const q=JSON.parse('{"title":"加餐3：分布式服务考点梳理+高频面试题","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/分布式技术原理与实战45讲_文档/(1920) 加餐3：分布式服务考点梳理 + 高频面试题.md","filePath":"posts/backEnd/分布式技术原理与实战45讲_文档/(1920) 加餐3：分布式服务考点梳理 + 高频面试题.md","lastUpdated":1696682708000}'),n={name:"posts/backEnd/分布式技术原理与实战45讲_文档/(1920) 加餐3：分布式服务考点梳理 + 高频面试题.md"},r=s('<h1 id="加餐3-分布式服务考点梳理-高频面试题" tabindex="-1">加餐3：分布式服务考点梳理+高频面试题 <a class="header-anchor" href="#加餐3-分布式服务考点梳理-高频面试题" aria-label="Permalink to &quot;加餐3：分布式服务考点梳理+高频面试题&quot;">​</a></h1><p>本课时我将和你回顾一下该模块的核心内容，并且一起梳理一下面试中分布式服务的高频考点。</p><h3 id="如何考察分布式服务" tabindex="-1">如何考察分布式服务 <a class="header-anchor" href="#如何考察分布式服务" aria-label="Permalink to &quot;如何考察分布式服务&quot;">​</a></h3><p>在整个分布式课程中，分布式服务是大部分工程师实际开发中应用最多的，也是面试中经常出现的一个热点。</p><p>在分布式服务部分的面试中，面试官通常会围绕&quot;服务治理&quot;的各个场景进行提问，考察候选人对微服务和服务治理各个环节的掌握程度。分布式服务这部分内容涉及的比较广，有非常丰富的内涵和外延知识。本课程只是带你描述了一些核心领域的知识点，剩下的内容，还需要你在平时的工作和学习中多多积累。</p><p>我们在课程中提到了 Spring Cloud 和 Dubbo 两个技术栈，这两大技术栈是目前大部分公司进行服务治理的选择。当然，一些公司使用的是 Thrift 和 gRPC 等服务框架，但是应用比例要小很多，在实际的面试中，通常会选择一个服务治理的技术栈来展开提问，对候选人进行考察。</p><p>下面我以 Dubbo 技术栈为例，整理了一些分布式服务相关的问题，来模拟实际的面试场景。这些问题都是比较基础的，你可以作为对照，检测一下掌握程度：</p><ul><li><p>为什么需要 Dubbo？</p></li><li><p>Dubbo 的主要应用场景？</p></li><li><p>Dubbo 的核心功能？</p></li><li><p>Dubbo 服务注册与发现的流程？</p></li><li><p>Dubbo 的服务调用流程？</p></li><li><p>Dubbo 支持哪些协议，每种协议的应用场景、优缺点？</p></li><li><p>Dubbo 有些哪些注册中心？</p></li><li><p>Dubbo 如何实现服务治理？</p></li><li><p>Dubbo 的注册中心集群挂掉，如何正常消费？</p></li><li><p>Dubbo 集群提供了哪些负载均衡策略？</p></li><li><p>Dubbo 的集群容错方案有哪些？</p></li><li><p>Dubbo 支持哪些序列化方式？</p></li></ul><p>需要你注意的是，即使开发框架不同，但是在服务治理中关注的功能是一致的，如果你应用的是另外的分布式服务框架，可以把关键词做一些替换，比如 Spring Cloud 的主要应用场景、Spring Cloud 的核心功能，同样可以用来考察自己对整体技术栈的掌握程度。</p><h3 id="微服务技术栈梳理" tabindex="-1">微服务技术栈梳理 <a class="header-anchor" href="#微服务技术栈梳理" aria-label="Permalink to &quot;微服务技术栈梳理&quot;">​</a></h3><p>下面我分别展开 Dubbo 和 Spring Cloud 这两大微服务技术栈，并且简单描绘了一张知识点思维导图，你可以对照这张图片，查漏补缺进行针对性的学习。</p>',11),b=o("p",null,"对 Spring Cloud 和 Dubbo 两大技术栈的掌握，重在深入而不是只能泛泛而谈。举个例子，Dubbo 在不同业务场景时，如何选择集群容错策略和不同的线程模型，又如何配置不同的失败重试机制呢？",-1),u=o("p",null,"Dubbo 为什么选择通过 SPI 来实现服务扩展，又对 Java 原生的 SPI 机制做了哪些调整呢？这些应用细节都要针对性地了解，才能在系统设计时避免各种问题。",-1),c=o("p",null,"除了上层的技术组件之外，微服务底层的技术支撑也要去了解一下，比如 Docker 容器化相关知识，容器内隔离是如何实现的，JVM 对容器资源限制的理解，以及可能产生的问题，还有容器如何调度等。",-1),d=o("p",null,"继续扩展，你可以思考一下，为什么现在很多企业选择 Golang 作为主要的开发语言，其中一个原因，就和 Go 语言部署和构建快速，占用容器资源小有关系。",-1),h=o("p",null,"在技术之外，微服务设计常用的 DDD（领域驱动设计）思路，开发中的设计模式，也要有一定的理解和掌握。",-1);function D(m,g,f,S,k,C){const a=t("Image");return p(),l("div",null,[r,_(a,{alt:"2.5.png",src:"https://s0.lgstatic.com/i/image6/M00/01/FB/Cgp9HWAcrWuAdI1HAAFj_J9LpQM944.png"}),i(),b,u,c,d,h])}const T=e(n,[["render",D]]);export{q as __pageData,T as default};
