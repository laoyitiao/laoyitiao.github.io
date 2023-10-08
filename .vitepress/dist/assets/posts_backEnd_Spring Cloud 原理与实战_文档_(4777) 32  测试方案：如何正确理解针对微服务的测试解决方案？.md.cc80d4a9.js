import{_ as n,j as a,o as i,g as _,k as s,h as t,Q as l,s as e}from"./chunks/framework.4e7d56ce.js";const J=JSON.parse('{"title":"32测试方案：如何正确理解针对微服务的测试解决方案？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/Spring Cloud 原理与实战_文档/(4777) 32  测试方案：如何正确理解针对微服务的测试解决方案？.md","filePath":"posts/backEnd/Spring Cloud 原理与实战_文档/(4777) 32  测试方案：如何正确理解针对微服务的测试解决方案？.md","lastUpdated":1696682708000}'),r={name:"posts/backEnd/Spring Cloud 原理与实战_文档/(4777) 32  测试方案：如何正确理解针对微服务的测试解决方案？.md"},c=l('<h1 id="_32测试方案-如何正确理解针对微服务的测试解决方案" tabindex="-1">32测试方案：如何正确理解针对微服务的测试解决方案？ <a class="header-anchor" href="#_32测试方案-如何正确理解针对微服务的测试解决方案" aria-label="Permalink to &quot;32测试方案：如何正确理解针对微服务的测试解决方案？&quot;">​</a></h1><p>作为整个课程最后一部分内容，我们将讨论微服务架构中的测试解决方案。对于微服务而言，测试是一个难点，也是经常被忽略的一套技术体系。当系统中存在多个微服务时，除了常见的针对单个服务的单元测试和集成测试之外，面对不同服务之间进行交互和集成的场景，我们还需要引入端到端测试来确保服务定义和协议级别的正确性和稳定性。今天，我们就将基于这些测试需求给出针对微服务的测试方案。</p><h3 id="微服务测试的系统方法" tabindex="-1">微服务测试的系统方法 <a class="header-anchor" href="#微服务测试的系统方法" aria-label="Permalink to &quot;微服务测试的系统方法&quot;">​</a></h3><p>测试工作包含很多类型，例如常见的单元测试、集成测试等，本课程无意对这些类型做过多的展开，而是直接抛出在测试微服务架构中需要面对的两个核心问题，即如何验证组件级别的正确性以及如何验证服务级别的正确性。</p><h4 id="如何验证组件级别的正确性" tabindex="-1">如何验证组件级别的正确性？ <a class="header-anchor" href="#如何验证组件级别的正确性" aria-label="Permalink to &quot;如何验证组件级别的正确性？&quot;">​</a></h4><p>验证组件级别正确性的一大难点在于关于组件与组件之间的依赖关系，这里就需要引出测试领域非常重要的一个概念，即 Mock（模拟）。针对测试组件涉及的外部依赖，我们的关注点在于这些组件之间的调用关系以及返回的结果或发生的异常等，而不在于组件内部的执行过程。因此常见的技巧就是使用 Mock 对象来替代真实的依赖对象，从而模拟真实的调用场景。</p><p>例如，在一个通过 Spring Boot 构建的微服务中，Controller 层会访问 Service 层，而 Service 层又会访问 Repository 层，我们对 Controller 层的端点进行验证时，就需要模拟 Service 层组件的功能。同样，对 Service 层组件进行测试时，也需要假定 Repository 层组件的结果是可以获取的，如下所示：</p>',7),p=e("p",null,"微服务中各层组件与 Mock 对象示意图",-1),d=e("p",null,"对于微服务而言，组件级别的验证工作主要在于需要确保服务内部数据和复杂业务流程的正确性，这里的数据来源一般有关系型数据库、各种 Nosql 或垂直化搜索引擎等；而复杂业务流程则主要面向多个内部服务和数据访问组件之间的整合。",-1),h=e("h4",{id:"如何验证服务级别的正确性",tabindex:"-1"},[t("如何验证服务级别的正确性？ "),e("a",{class:"header-anchor",href:"#如何验证服务级别的正确性","aria-label":'Permalink to "如何验证服务级别的正确性？"'},"​")],-1),u=e("p",null,"服务与服务之间的验证工作一般指的是系统测试，涉及整体应用环境在现实场景中的系统测试也被称为是一种端到端（End-to-End）测试。取决于系统中测试的具体内容，端到端测试也存在很多种不同的类型。在微服务架构中，情况可能变得更加复杂。例如，在 SpringHealth 案例系统中，intervention-service 中健康干预信息的生成需要 user-service 和 device-service 之间完成复杂的接口交互，如下图所示：",-1),g=e("p",null,"SpringHealth 中的端到端测试内容",-1),m=e("p",null,"在基于 Spring Cloud 的技术体系中，端到端测试的内容即为各个服务之间基于 RESTful 风格下的 HTTP 远程调用层。为了完成整个业务流程，端到端测试不得不考虑的问题是如何管理服务与服务之间的数据和状态传递。",-1),v=e("p",null,"以上两个问题构成了我们后续两个课时的主体内容，在下一课时中，我们将介绍如何使用 Mock 和注解实施组件级别的测试。而在下一课时中，我们还会给出端到端测试的具体实施方案。其中，组件级别的测试相对比较成熟，而端到端测试则相对复杂，目前有一种测试策略为我们提供了解决方案，这就是面向契约的消费者驱动测试。而在 Spring Cloud 中同样提供了专门用于实现消费者驱动测试的 Spring Cloud Contract 组件。在本课时的剩余内容中，我们有必要对消费者驱动的契约测试的设计理念和系统方法先做相关的介绍。",-1),C=e("h3",{id:"消费者驱动的契约测试",tabindex:"-1"},[t("消费者驱动的契约测试 "),e("a",{class:"header-anchor",href:"#消费者驱动的契约测试","aria-label":'Permalink to "消费者驱动的契约测试"'},"​")],-1),k=e("p",null,"对于任何一个服务所暴露的对外接口，我们都可以把它们归为是一种契约（Contract），即接口的调用者希望通过接口获取某种约定的价值。消费者驱动的契约测试就是基于契约思想而诞生的一种端到端测试方法，该测试方法一经提出已经在微服务架构中得到很好的应用和推广。",-1),S=e("h4",{id:"什么是消费者驱动契约测试",tabindex:"-1"},[t("什么是消费者驱动契约测试？ "),e("a",{class:"header-anchor",href:"#什么是消费者驱动契约测试","aria-label":'Permalink to "什么是消费者驱动契约测试？"'},"​")],-1),A=e("p",null,"在微服务中，当服务没有满足约定，就会对服务之间的交互产生影响。传统的接口测试虽然能够发现并解决部分因为违反接口约定所带来的错误，但这种测试方法本身也会存在一些问题。最典型的场景就在于随着服务的不断迭代，接口也会相应地产生变化，这种变化会导致集成测试结果的不稳定。如下图所示：",-1),b=e("p",null,"接口版本变化导致集成测试失败的场景",-1),f=e("p",null,"上图还是以 SpringHealth 案例系统为例，intervention-service 依赖 user-service 和 device-service。在现有情况下，这三个服务都开发了第一个版本用于支持这种集成关系。根据业务需要，user-service 做了一次服务升级，从版本 1 升到了版本 2，我们就会发现集成测试在这个时候可能发生错误，这种错误就来自于接口的既有约定已被打破。",-1),E=e("p",null,"讲到这里，大家可能已经明白了契约的基本概念，那么一个合理的契约应该包括哪些组成部分呢？显然，契约一方面应该定义其他微服务所期望的数据格式、支持的操作方法以及访问的协议。另一方面，也可以约定调用时延或吞吐量等非功能性约束和条件。",-1),P=e("p",null,"对于服务的提供者和消费者而言，存在不同的契约表现形式。服务提供者契约包含了服务提供者所能提供的所有内容，所以一个服务提供者仅包含一种契约，而且这种契约一般会随着版本的演进而不断变化，正如上图中的 user-service 所示的效果一样。",-1),x=e("p",null,"而消费者契约则不同，一个服务可以存在一个或多个消费者契约。这种契约只包含某个或某些消费者真正在使用的一部分服务定义，并且根据服务消费者的变更而做相应的调整。服务提供者契约和消费者契约之间的这层关系如下图所示：",-1),M=e("p",null,"服务提供者契约和消费者契约的区别",-1),V=e("p",null,"基于上图，这里再引申出一个新的概念，即消费者驱动契约（Consumer Driven Contract，CDC），也就是说从消费者的角度出发驱动交互协议的制定和调整。",-1),T=e("p",null,"现在，关于契约相关的内容我们都介绍完毕了，下面回到对测试工作的讨论，来看一下所谓的消费者驱动的契约测试。消费者驱动的契约测试是针对微服务接口开展的测试，它能验证服务提供者所提供的契约是否满足消费者的期望。对于一个服务提供者而言，每个消费者会根据与其交互场景和上下文的不同产生不同的契约。当这个服务提供者频繁变更时，就应该保证每个消费者依然能够具备正确的消费契约。",-1),D=e("p",null,"消费者驱动的契约测试能够提供一定机制验证提供者所提供的服务能否始终满足契约。因为每个消费者拥有自身的消费者契约，所以我们只需要根据消费者契约编写独立的测试用例，并验证这些契约下服务提供者所暴露出来的那一部分接口即可。这些测试用例仅仅关注契约是否满足期望，而不需要深入测试服务内部的行为，所以测试方式相较集成测试而言具有轻量级的优点，可以在很大程度上降低测试成本。",-1),L=e("p",null,"在服务交互过程中，消费者驱动的契约测试能够帮助服务消费者和提供者验证接口是否已经发生变化。每当服务提供者所暴露的接口发生变更，契约测试就能检测该接口是否仍然和契约所要求的保持一致，如下所示：",-1),I=e("p",null,"服务升级导致契约测试失败示意图",-1),N=e("p",null,"在上图中，对于同一份消费者契约而言，一旦 user-service 所提供的接口从版本 1 上升到版本 2 时，如果新版本升级导致了契约不再满足，那么契约测试就能立即做出验证，从而在开展功能测试之前就能尽早发现错误。",-1),q=e("h3",{id:"如何开展消费者驱动契约测试",tabindex:"-1"},[t("如何开展消费者驱动契约测试？ "),e("a",{class:"header-anchor",href:"#如何开展消费者驱动契约测试","aria-label":'Permalink to "如何开展消费者驱动契约测试？"'},"​")],-1),B=e("p",null,"通过前面内容的介绍，我们实际上明确了消费者驱动契约测试是一个比较复杂的过程，所以不推荐对所有的服务交互过程都实施这种测试方法。在本课程中，我们梳理了如下所示的消费者驱动契约测试实施过程：",-1),O=e("p",null,"消费者驱动契约测试实施步骤",-1),y=e("p",null,"正如前面提到的，并不是所有的业务场景都需要使用消费者驱动契约测试，往往越容易发生变更的业务场景就越需要进行测试，所以上图中的第一个步骤是根据业务需求选择合适的测试场景。一旦明确了场景之后，基于消费者驱动的设计思想，就可以将消费者请求契约化。消费者发送的请求、提供者返回的响应都需要明确记录，并整理成该场景下的契约。然后，测试用例将模型消费者，向真实的服务提供者发送请求。最后，通过获取请求结果，验证提供者的契约是否已经发生变化。",-1),F=e("p",null,"为了实施上述步骤，我们需要选择消费者驱动契约测试工具。作为一个完整的微服务套件，Spring Cloud 也提供了 Spring Cloud Contract 作为消费者驱动契约测试的开发框架。在本课程中，我们将以 Spring Cloud Contract 为例对消费者驱动契约测试工具的使用方式做详细介绍。",-1),H=e("h3",{id:"小结与预告",tabindex:"-1"},[t("小结与预告 "),e("a",{class:"header-anchor",href:"#小结与预告","aria-label":'Permalink to "小结与预告"'},"​")],-1),G=e("p",null,"测试是一套独立的技术体系，需要开发人员充分重视并付诸实践，这点对于微服务架构而言更是如此。在本课程中，我们无意对测试工作面面俱到，而是重点关注于如何确保单个服务的正确性以及如何确保多个服务之间交互的正确性，因此分别提出了组件级别和服务级别的测试方法。在微服务架构中，对于后者而言，还需要引入专门的消费者驱动契约测试体系。",-1),R=e("p",null,"这里给你留一道思考题：消费者驱动的契约测试解决的核心问题是什么？",-1),U=e("p",null,"在介绍完设计理念之后，下一课时我们将先来讨论第一种测试体系，即验证组件级别正确性的测试方法和工程实践。",-1);function $(W,X,j,K,Q,w){const o=a("Image");return i(),_("div",null,[c,s(o,{alt:"Lark20210107-113745.png",src:"https://s0.lgstatic.com/i/image2/M01/04/D8/CgpVE1_2vKeAN0EtAAFXaI3mLMI203.png"}),t(),p,d,h,u,s(o,{alt:"Lark20210107-113749.png",src:"https://s0.lgstatic.com/i/image2/M01/04/D8/CgpVE1_2vLiAFKcVAAEv63_oGWE679.png"}),t(),g,m,v,C,k,S,A,s(o,{alt:"Lark20210107-113752.png",src:"https://s0.lgstatic.com/i/image2/M01/04/D6/Cip5yF_2vMOAEU6pAAGkTIaUvPs984.png"}),t(),b,f,E,P,x,s(o,{alt:"Lark20210107-113755.png",src:"https://s0.lgstatic.com/i/image2/M01/04/D8/CgpVE1_2vQaAYHGzAAGPBri3jXw365.png"}),t(),M,V,T,D,L,s(o,{alt:"Lark20210107-113757.png",src:"https://s0.lgstatic.com/i/image2/M01/04/D8/CgpVE1_2vP2AOS_yAAFlcVWb57o596.png"}),t(),I,N,q,B,s(o,{alt:"Lark20210107-113800.png",src:"https://s0.lgstatic.com/i/image2/M01/04/D6/Cip5yF_2vO6ACiX4AAIhOWL-BOU931.png"}),t(),O,y,F,H,G,R,U])}const Y=n(r,[["render",$]]);export{J as __pageData,Y as default};
