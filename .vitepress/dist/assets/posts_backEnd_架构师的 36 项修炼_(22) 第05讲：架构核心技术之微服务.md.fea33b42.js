import{_ as s,j as i,o as n,g as r,k as o,h as t,s as a,Q as l}from"./chunks/framework.a0d18f64.js";const K=JSON.parse('{"title":"第05讲：架构核心技术之微服务","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/架构师的 36 项修炼/(22) 第05讲：架构核心技术之微服务.md","filePath":"posts/backEnd/架构师的 36 项修炼/(22) 第05讲：架构核心技术之微服务.md","lastUpdated":1696682708000}'),h={name:"posts/backEnd/架构师的 36 项修炼/(22) 第05讲：架构核心技术之微服务.md"},p=a("h1",{id:"第05讲-架构核心技术之微服务",tabindex:"-1"},[t("第05讲：架构核心技术之微服务 "),a("a",{class:"header-anchor",href:"#第05讲-架构核心技术之微服务","aria-label":'Permalink to "第05讲：架构核心技术之微服务"'},"​")],-1),c=a("p",null,"本课时我们来学习微服务。",-1),d=l('<br><p>本课时主要包括如下内容。</p><ul><li><p>单体系统的困难：编译部署困难、数据库连接耗尽、服务复用困难、新增业务困难。</p></li><li><p>微服务框架：Dubbo 和 Spring Cloud，微服务的架构策略。</p></li><li><p>微服务模式：事件溯源、查询与命令职责分离 CQRS、断路器、超时。</p></li><li><p>微服务最佳实践。</p></li></ul><h1 id="单体系统的困难" tabindex="-1">单体系统的困难 <a class="header-anchor" href="#单体系统的困难" aria-label="Permalink to &quot;单体系统的困难&quot;">​</a></h1><p>在微服务出现之前，互联网应用系统主要是单体系统，也就是说一个网站的整个系统由一个应用构成。如果是 Java，就打包成一个 war 包，一个 war 包包含整个应用系统，系统更新的时候，即使只是更新其中极小的一部分，也要重新打包整个 war 包，发布整个系统。</p><p>这样的单体系统面临的挑战主要是什么呢？</p><h2 id="编译、部署困难" tabindex="-1"><strong>编译、部署困难</strong> <a class="header-anchor" href="#编译、部署困难" aria-label="Permalink to &quot;**编译、部署困难**&quot;">​</a></h2><p>随着网站的业务不断发展，系统会变得越来越庞大，最后变成一个巨无霸的系统。</p><p>在我曾经工作过的公司，单个应用可能有几个 G 大，这对于网站开发工程师来说，开发编译和部署都是非常困难的。在开发的过程中，即使只改了庞大系统中的一行代码，也必须把完整的网站系统重新打包，才能做测试。这会经历漫长的编译过程：出去抽一支烟回来一看，在编译；又去喝了一杯水回来，还在编译；再去趟厕所，回来还在编译。好不容易编译结束了，如果某个配置项错误导致编译失败，又得重来一次，浪费大半天的时间。这样的单体系统对于开发部署和测试都是非常困难的。</p><h2 id="代码分支管理困难" tabindex="-1">代码分支管理困难 <a class="header-anchor" href="#代码分支管理困难" aria-label="Permalink to &quot;代码分支管理困难&quot;">​</a></h2><p>因为单体应用非常庞大，所以代码模块也是由多个团队共同维护的。但最后还是要编译成一个单体应用，统一发布。这就要求把各个团队的代码 merge 在一起，这个过程很容易发生代码冲突。而 merge 的时候又是网站要进行发布的时候，发布过程本来就复杂，再加上代码 merge 带来的问题，各种情况纠缠在一起，极易出错。所以，在单体应用时代每一次网站发布都需要搞到深更半夜。</p><h2 id="数据库连接耗尽" tabindex="-1">数据库连接耗尽 <a class="header-anchor" href="#数据库连接耗尽" aria-label="Permalink to &quot;数据库连接耗尽&quot;">​</a></h2><p>对于一个巨型的应用而言。因为有大量的用户进行访问，所以必须把应用部署到大规模的服务器集群上。然后每个应用都需要与数据库建立连接，大量的应用服务器连接到数据库，会对数据库的连接产生巨大的压力，某些情况下甚至会耗尽数据库的连接。</p><h2 id="新增业务困难" tabindex="-1">新增业务困难 <a class="header-anchor" href="#新增业务困难" aria-label="Permalink to &quot;新增业务困难&quot;">​</a></h2><p>巨无霸单体应用的另一个挑战是新增业务困难。因为所有的业务都耦合在一个单一的大系统里，通常随着时间的发展，这个系统会变得非常的复杂，里面的各种结构也非常乱，想要维护这样一个系统是非常困难和复杂的。很多工程师入职公司半年，都还不能熟悉业务，因为业务太过庞大和复杂，经常会出各种错误。所以就会出现这种现象：熟悉系统的老员们工忙得要死，加班加点干活，不熟悉系统的新员工们一帮忙就出乱，跟着加班加点干活。整个公司热火朝天地干活，但最后还是常常出故障，新的功能迟迟不能上线。</p><h2 id="发布困难" tabindex="-1">发布困难 <a class="header-anchor" href="#发布困难" aria-label="Permalink to &quot;发布困难&quot;">​</a></h2><p>因为一个 war 包包含了所有的代码，进行新版本发布的时候，发布代码跟自己的开发的代码一点关系没有，但是因为 war 包包含了自己的代码，为了以防万一，也不得不跟着发布值班。结果真正更新代码功能的只有几个人，而整个部门都要跟着加班。常常出现，到了深夜，有代码更新的同事汗流浃背进行代码冲突处理和修复发布 bug，没有代码更新的同事陪着聊天、打瞌睡、打游戏，这种情况。</p><h1 id="微服务架构" tabindex="-1">微服务架构 <a class="header-anchor" href="#微服务架构" aria-label="Permalink to &quot;微服务架构&quot;">​</a></h1><p>解决上述问题的主要手段是将一个单体的巨无霸系统，根据模块以及复用的粒度进行拆分，拆分成多个可以独立部署的分布式服务。应用通过远程访问调用的方式，使用这些服务，构成一个系统。但是由于它的核心服务是在其他的服务器上分布部署的，本身的业务逻辑可以变得比较简单，这样就把一个巨无霸系统单体应用拆成了若干个可复用的服务，利用较少的逻辑代码就可以组成一个应用系统。</p><h2 id="soa-架构" tabindex="-1">SOA 架构 <a class="header-anchor" href="#soa-架构" aria-label="Permalink to &quot;SOA 架构&quot;">​</a></h2><p>这样的设计思路其实并不是在互联网时代才出现的。在早期的时候，就有人提出了 SOA 面向服务的体系架构。如下图所示，在面向服务的体系架构里面，服务的提供者向注册中心注册自己的服务，而服务的使用者向注册中心去发现服务。发现服务以后，根据服务注册中心提供的访问接口和访问路径对服务发起请求，由服务的提供者完成请求返回结果给调用者。现在的微服务或者分布式服务，其实也是 SOA 架构的一种实现。但是在早期的 SOA 架构实践中，服务的注册与服务的调用都非常复杂，服务调用效率也比较低。</p>',21),_=a("h2",{id:"微服务架构-1",tabindex:"-1"},[t("微服务架构 "),a("a",{class:"header-anchor",href:"#微服务架构-1","aria-label":'Permalink to "微服务架构"'},"​")],-1),u=a("p",null,"后来在互联网时代的微服务中，人们简化了 SOA 架构中的调用规范和服务规范，形成了我们现在所熟悉的分布式微服务架构。",-1),b=a("p",null,"如下图，所谓的微服务架构就是将一个单体的巨无霸系统拆分成一组可复用的服务，基于这些服务构成的应用系统。图中左边是早期的单体应用系统架构，里面的各个模块互相调用、耦合，所有的系统和模块打包在一起，最后组成一个庞大的巨无霸系统。右边是微服务架构，根据服务的粒度和可复用的级别，对服务进行拆分，以独立部署服务的方式，对外提供服务调用。而应用系统也按照用途和场景的不同，依赖这些可复用的服务，进行逻辑组合，构建成自己的业务系统。",-1),g=a("p",null,"通过这样一种方式，系统变得比较简单，复用级别也比较高，同时也解决了前面提出的单体巨无霸的几个重要问题。因为每一个服务或是应用系统，代码都比较简单，所以编译和部署、开发和测试，都比较简单和快速。而且这些服务都是独立维护和部署的，它的代码分支也是独立的，不会和其他的代码分支一起进行管理，减少了代码冲突的可能性。发布的时候，也是每个服务独立发布，只要做好服务的版本控制和接口兼容，应用系统不需要跟随服务一起更新发布。",-1),m=a("p",null,"在微服务体系中，连接数据库的是具体的服务，应用系统不需要自己去连接数据库，只需要调用组合服务，对服务进行编排。所以对数据库的连接也相对比以前更少一些。最主要的是当需要开发新业务的时候，使用这种方式不需要对原有的单体系统进行各种重构和代码修改，只需要开发一个新的业务系统，组合调用现有的微服务，就可以组合出来一个新的产品功能，可以快速开发新产品。",-1),A=a("h2",{id:"dubbo",tabindex:"-1"},[t("Dubbo "),a("a",{class:"header-anchor",href:"#dubbo","aria-label":'Permalink to "Dubbo"'},"​")],-1),P=a("p",null,"目前一些典型的微服务框架本身的架构是如何设计的？",-1),q=a("p",null,"先看 Dubbo 架构。Dubbo 是阿里开源的，比较早也比较有影响力的一个分布式微服务框架。如下图所示，在 Dubbo 架构中，最核心的模块有 3 个部分，一个是服务的提供者，一个是服务的消费者，还有一个是服务的注册中心。",-1),S=a("p",null,"服务的提供者顾名思义就是微服务的具体提供者，通过微服务容器对外提供服务。而服务的消费者就是应用系统或是其他的微服务。",-1),k=a("p",null,"应用系统通过组合多个微服务，构成自己的业务逻辑，实现自己的产品功能。具体过程是服务的提供者程序在 Dubbo 的服务容器中启动，服务管理容器向服务注册中心进行注册，声明服务提供者所要提供的接口参数和规范，并且注册自己所在服务器的 IP 地址和端口，如下图所示。",-1),C=a("p",null,"而服务的消费者如果想要调用某个服务，只需依赖服务提供者的接口进行编程。而服务接口通过 Dubbo 框架的代理访问机制，调用 Dubbo 的服务框架客户端，服务框架客户端会根据服务接口声明，去注册中心查找对应的服务提供者启动在哪些服务器上，并且将这个服务器列表返回给客户端。客户端根据某种负载均衡策略，选择某一个服务器通过远程通讯模块发送具体的服务调用请求。",-1),f=a("p",null,"服务调用请求，通过 Dubbo 底层自己的远程通讯模块，也就是 RPC 调用方式，将请求发送到服务的提供者服务器，服务提供者服务器收到请求以后，将该请求发送给服务提供者程序，完成服务的执行，并将服务执行处理结果通过远程调用通讯模块 RPC 返回给服务消费者客户端，服务消费者客户端将结果返回给服务调用程序，从而完成远程服务的调用，获得服务处理的结果。",-1),x=a("p",null,"Dubbo 使用 Java 进行开发，并且通过服务接口的方式对消费者提供服务，所以它的服务调用方式比较简单，可以透明地进行远程微服务调用。服务消费者程序，可以无感知地进行远程微服务调用，对开发者相对比较友好。",-1),D=a("h2",{id:"spring-cloud",tabindex:"-1"},[t("Spring Cloud "),a("a",{class:"header-anchor",href:"#spring-cloud","aria-label":'Permalink to "Spring Cloud"'},"​")],-1),T=a("p",null,"另一种目前比较热门的微服务框架是 Spring Cloud。Spring Cloud 微服务框架组件跟 Dubbo 类似，也是由服务的消费者、服务的提供者和注册中心组成。如下图所示，Spring cloud 的服务提供者通过 Spring Boot 启动，然后向服务注册中心 Eureka Server 进行注册，而服务的消费者通过一个 Zuul 网关访问 Eureka Server 进行服务的发现，获得自己想要调用的远程服务对应的服务地址。获得地址以后，通过 HTTP 的方式向远程的服务提供者发起调用请求。服务提供者完成服务处理后，将处理结果通过 HTTP 返回。从而实现了远程的微服务调用。",-1),B=a("p",null,"Spring Cloud 还包含了一组服务调用监控组件，主要是 Hystrix，通过 Hystrix 可以监控服务调用，还在此基础上实现了熔断、降级、超时管理等一系列高可用策略。",-1),O=a("h2",{id:"微服务架构策略",tabindex:"-1"},[t("微服务架构策略 "),a("a",{class:"header-anchor",href:"#微服务架构策略","aria-label":'Permalink to "微服务架构策略"'},"​")],-1),R=a("p",null,"对微服务架构而言，技术现在其实比较成熟。使用什么样的技术去实现一个微服务，本身并没有太多的困难。构建一个微服务架构最困难的还是服务治理，也就是业务划分。策略要点如图所示。",-1),E=a("p",null,"一个微服务包含的功能有哪些？服务的边界是什么？服务之间的依赖关系如何？这些关键的问题决定了服务的复用程度，维护的难易程度，开发的便利程度。所以设计微服务架构的时候，首先要关注的是业务，业务要先行，理顺业务模块之间的边界和依赖，做好服务治理和调用依赖管理。",-1),v=a("p",null,"微服务技术是微服务架构的手段，而不是目的。微服务最主要的目的还是实现服务治理------如何划分和管理服务。首先要有独立的功能模块，然后才有分布式的服务。也就是说在软件设计的时候，软件功能模块之间的依赖关系就要清晰、合理、规范、便于维护、便于扩展，便于实现新的功能。服务之间的依赖关系要清晰、参数要简单、耦合关系要少。设计好这样的模块化结构以后，将这些设计好的模块，拆分成独立的微服务进行部署和调用，就可以构建一个良好的微服务系统。如果模块本身就是混乱的、耦合严重的、边界不清晰的、关系复杂的，那么，把它们拆分成独立的微服务进行部署，只会使事情变得更加复杂。",-1),I=a("p",null,"所以进行微服务架构设计之初，就要先做好业务模块的设计和规划。同时，对于那些业务耦合比较严重、逻辑复杂多变的系统，进行微服务重构的时候，也要特别谨慎。如果做不好模块的划分和耦合管理。那么，宁可晚一点进行微服务架构重构，也不要仓促上马，以免最后带来巨大的损失。要使用微服务架构的时候，一定要搞清楚实施微服务的目的究竟是什么，是为了业务复用，是为了开发边界清晰，是为了分布式集群提升性能，还是仅仅想要使用微服务？目的一定要清楚。",-1),J=a("p",null,"跟其他技术不同，微服务具有强业务属性，业务如果本身结构混乱，目标不清晰，仓促使用微服务，可能会使整个系统变得更加复杂和难以控制。所以在使用微服务前，最重要的是要先明确自己的需求：我们到底想用微服务达到什么样的目的？需求清晰了，再去考虑具体的方案和技术。这也是使用大多数技术的时候应有的方法和思路。",-1),Q=a("p",null,"如下图所示，最重要的是需求。在日常工作中，我们要根据需求去考虑具体的价值，再根据价值构建我们的设计原则，根据原则寻找最佳实践，最后根据实践去选择最合适的工具。按这样的方式去选择技术做架构设计才是比较成熟和高效的。如果相反，先找到一个工具，然后用工具硬往上套需求，只会导致技术也没用好，业务也没做好，所有人都疲惫不堪，事情变得一团糟，最后还可能反过来怪技术没用。",-1),V=l('<h1 id="微服务的使用模式" tabindex="-1">微服务的使用模式 <a class="header-anchor" href="#微服务的使用模式" aria-label="Permalink to &quot;微服务的使用模式&quot;">​</a></h1><p>下面来看可供参考的几种微服务的使用模式。</p><h2 id="事件溯源" tabindex="-1">事件溯源 <a class="header-anchor" href="#事件溯源" aria-label="Permalink to &quot;事件溯源&quot;">​</a></h2><p>第一是事件溯源，因为微服务的调用过程会比较复杂，调用链路可能会比较长。如果某个微服务调用出错，如何进行管理和监控？使用事件溯源这种模式是一种解决办法。</p><p>所谓的事件溯源是指将用户的请求处理过程，每一次的状态变化都记录到事件日志中，并按照时间序列进行持久化的存储，也就是说，把所有的变更操作都按日志的方式，按时间化序列进行记录。</p><p>使用事件溯源的好处有如下两点。</p><ul><li>可以精确地复现用户的状态变化。</li></ul><p>用户执行了哪些操作，使它成为现在这样一种状况，然后通过事件溯源的方式，追溯以往的操作和动作，从而进行复核和审计。当用户投诉的时候，当状态不一致的时候，可以通过事件溯源中的日志进行审计和查找。</p><ul><li>可以有效监控用户的状态变化，并在此基础上实现分布式的事务。</li></ul><p>我们传统的事务使用数据库事务进行实现，可以将多个数据库操作统一提交，或者统一回滚，保持数据的一致性，但是在分布式状况下，对数据的操作是分布在多个独立部署的服务进行处理。这个时候就无法使用数据库的事务进行管理。</p><p>那么，如何在这种情况下实行分布式系统的事务？</p><p>事件溯源是一种办法。因为事件溯源将所有的数据变更都按日志的方式记录起来，所以如果日志不完整，我们就知道事务不完整，可以对事务进行重组或者补偿操作，从而使数据变得一致。</p><h2 id="命令与查询职责隔离-cqrs" tabindex="-1">命令与查询职责隔离（CQRS） <a class="header-anchor" href="#命令与查询职责隔离-cqrs" aria-label="Permalink to &quot;命令与查询职责隔离（CQRS）&quot;">​</a></h2><p>这种模式在服务接口层面将查询操作（也就是读操作）和命令操作（也就是写操作）隔离开来，在服务层实现读写分离。</p><p>使用 CQRS 模式，主要的好处是可以有更清晰的领域模型，根据操作的方式不同，使用不同的领域模型。还可以分别进行读写优化，从而实现更好的性能。</p><p>我们知道在读操作中主要使用的优化方式是缓存操作。那么，我们可以将接口层面的查询操作即读操作，尽量多地通过缓存来返回。而写操作也就是命令操作，主要的性能优化方式是使用消息队列。那么，我们可以将数据的更新操作，尽量通过消息队列，通过异步化的方式进行处理，以改善性能。</p><p>因为使用 CQRS 查询和命令分离的方式，我们可以在接口层面上使用不同的优化手段。查询操作不会修改数据库，那么所有来自于查询接口的服务，可以统一连接到只读数据库中，防止误操作破坏数据，可以更好地保护数据，同时使用 CQRS，还可以更好地实现刚才的事件溯源机制。因为查询操作是无须进行事件溯源的，所有的事件溯源都可以统一设置在命令服务接口上。</p><h2 id="断路器" tabindex="-1">断路器 <a class="header-anchor" href="#断路器" aria-label="Permalink to &quot;断路器&quot;">​</a></h2><p>使用微服务的时候，你还需要关注一个事情：服务的不可用。</p><p>当某个服务实例出现故障的时候，它的响应延迟或者失败率增加的时候，继续调用这个服务实例会导致请求者阻塞。请求阻塞以后会导致资源消耗增加，最后可能会导致请求者也失败和崩溃，进而出现服务的级联崩溃，也就是服务请求者的请求者也失败，最后会导致整个系统全部失败，即雪崩现象。</p><p>在这种情况下，可以使用断路器对故障服务进行隔离。断路器有三种状态：关闭、打开、半开。当服务出现故障的时候，通过断路器阻断对故障服务实例的调用，避免它的故障扩散开来。在 Spring Cloud 中可以使用 Hystrix 实现断路器。</p><h2 id="超时" tabindex="-1">超时 <a class="header-anchor" href="#超时" aria-label="Permalink to &quot;超时&quot;">​</a></h2><p>还有一件需要关注的事情是：微服务调用的超时机制如何设置。</p><p>如果使用统一的超时设置，那么当下游调用者超时的时候，上游调用者一定也已经超时了，因为服务调用是阻塞的。所以，下游调用的超时一定会反应在上游调用者上。因此在设置超时的时候，要设置上游调用者的超时时间大于下游调用者的超时时间之和，相同的超时设置是没有意义的，如下图所示。</p>',24),M=a("br",null,null,-1),L=a("h1",{id:"总结回顾",tabindex:"-1"},[t("总结回顾 "),a("a",{class:"header-anchor",href:"#总结回顾","aria-label":'Permalink to "总结回顾"'},"​")],-1),N=a("p",null,"首先，之所以要使用微服务，是因为传统的单体巨无霸系统带来的挑战和困难，包括编译和部署的困难、连接的困难、打包代码冲突的困难，以及复用的困难、新增业务的困难。",-1),w=a("p",null,"而具体的微服务框架基本上都是由三个核心部分组成的：服务的提供者、服务的调用者和服务的注册中心。服务的提供者向注册中心注册自己的服务，而服务的调用者通过注册中心发现服务，并进行远程调用。",-1),y=a("p",null,"另外，很多微服务架构中还包括一个监控者的角色，通过监控者进行服务的管理和流量的控制。",-1),H=a("p",null,"使用微服务最重要的是做好业务的模块化设计，模块之间要低耦合，高聚合，模块之间的依赖关系要清晰简单。只有这样的模块化设计，才能够构建出良好的微服务架构。如果系统本身就是一团遭，强行将它们拆分在不同的微服务里，只会使系统变得更加混乱。",-1),F=a("p",null,"使用微服务的时候，有几个重要的使用模式，需要关注：一个是事件溯源，一个是命令与查询隔离，还有一个是断路器以及关于超时如何进行设置。",-1),G=a("p",null,"本课时内容到这里结束，下一课时将会讲解高性能的系统架构。",-1);function $(X,Z,j,z,U,W){const e=i("Image");return n(),r("div",null,[p,c,o(e,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/89/D5/CgoB5l13JL6AA3PDAAJgEBDy948831.png"}),t(),d,o(e,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/21/CgoB5l13XFuAJnqQAAGRIgov63M066.png"}),t(),_,u,b,o(e,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/89/F5/CgotOV13JL6AQIB7AAQuqpCR5Ns064.png"}),t(),g,m,A,P,q,o(e,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/89/D5/CgoB5l13JL6AOLBoAAFOGse3TxA656.png"}),t(),S,k,C,f,x,D,T,o(e,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/21/CgoB5l13XGWAObX2AAO4kBq0A-0497.png"}),t(),B,O,R,o(e,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/89/D5/CgoB5l13JL-AbPegAAFtvsEp67I735.png"}),t(),E,v,I,J,Q,o(e,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/89/D5/CgoB5l13JL-AZaBoAABZolkvp1o958.png"}),t(),V,o(e,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/0A/CgoB5l13TbyALL87AABEVzYnfn8013.png"}),t(),M,L,N,w,y,H,F,G])}const aa=s(h,[["render",$]]);export{K as __pageData,aa as default};
