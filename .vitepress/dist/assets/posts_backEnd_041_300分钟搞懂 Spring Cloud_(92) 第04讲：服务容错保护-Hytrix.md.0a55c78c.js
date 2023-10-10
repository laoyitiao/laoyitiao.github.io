import{_ as r,j as e,o as l,g as n,k as i,h as s,s as t,Q as o}from"./chunks/framework.cfb14fe0.js";const mt=JSON.parse('{"title":"第04讲：服务容错保护-Hytrix","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/041_300分钟搞懂 Spring Cloud/(92) 第04讲：服务容错保护-Hytrix.md","filePath":"posts/backEnd/041_300分钟搞懂 Spring Cloud/(92) 第04讲：服务容错保护-Hytrix.md","lastUpdated":1696682708000}'),d={name:"posts/backEnd/041_300分钟搞懂 Spring Cloud/(92) 第04讲：服务容错保护-Hytrix.md"},c=t("h1",{id:"第04讲-服务容错保护-hytrix",tabindex:"-1"},[s("第04讲：服务容错保护-Hytrix "),t("a",{class:"header-anchor",href:"#第04讲-服务容错保护-hytrix","aria-label":'Permalink to "第04讲：服务容错保护-Hytrix"'},"​")],-1),h=t("p",null,"本课时我们主要学习：服务雪崩产生的原因及解决方案、Hystrix 工作原理及配置、监控方式等内容。",-1),m=t("h6",{id:"服务雪崩",tabindex:"-1"},[s("服务雪崩 "),t("a",{class:"header-anchor",href:"#服务雪崩","aria-label":'Permalink to "服务雪崩"'},"​")],-1),p=t("p",null,"微服务架构下，会存在服务之间相互依赖调用的情况，当某个服务不可用时，很容易因为服务之间的依赖关系使故障扩大，甚至造成整个系统不可用的情况，这种现象称为服务雪崩效应。",-1),_=o('<p>如上图所示，为服务雪崩效应发生的过程，首先是服务正常状态，当客户端对服务 A 发起请求，服务 A 依赖了服务 B，服务 B 又依赖了服务 C，当所有服务都处于正常状态时，整个请求链路是通畅的，结果会很快返回给客户端。</p><p>如果这时服务 C 发生故障或出现性能问题，就会出现延迟，刚开始时延迟较小，随着时间的推移，延迟会越来越大，服务 B 对服务 C 的调用就会堵塞，服务 C 此时已经疲惫不堪。</p><p>由于请求都堵在服务 C 上，服务 B 作为调用方，却迟迟等不到服务 C 的结果，服务 A 对服务 B 的请求又源源不断的发送过来，最终导致服务 B 的资源耗尽，从正常状态变成不正常状态，再也无法及时响应服务 A 的请求结果。</p><p>依此类推，最终服务 A 也会被拖垮，导致整个系统不可用，这个过程就是服务雪崩效应。如果能从最开始的小问题进行预防，就不会出现后面的级联效果，本课时的主要内容就是讲解如何通过服务的容错降级来保证系统的可用性。</p><h6 id="产生原因" tabindex="-1">产生原因 <a class="header-anchor" href="#产生原因" aria-label="Permalink to &quot;产生原因&quot;">​</a></h6><p>我们从两个方面来分析服务雪崩产生的原因：</p><ul><li><p>服务提供者</p></li><li><p>服务消费者</p></li></ul><p>起因肯定是服务提供者出了问题才导致后面的雪崩问题，在实际应用中无法预料服务提供者可能会出现什么样的问题，我们只能分析一些比较常见的问题。</p><p>比如说代码的 Bug 问题，由于某些代码问题导致 CPU 飙升，将资源耗尽等，比如服务器出现问题，磁盘出问题，导致数据读写特别慢，一下就拉高了响应时间。比如说某个新来的同事对业务不太熟悉，写了个查询的 SQL 语句，join 了多个表，并且没用到索引，出现慢 SQL。又比如请求量太大了，已经超出了系统本身的承受能力。</p><p>从服务消费者这方面来分析的话，主要表现在同步调用等待结果导致资源耗尽，还有就是自己即是服务消费者，同时也是服务提供者。</p><h2 id="解决方案" tabindex="-1">解决方案 <a class="header-anchor" href="#解决方案" aria-label="Permalink to &quot;解决方案&quot;">​</a></h2><p>既然分析了一些比较常见的会导致服务雪崩的问题，那么就需要出对应的策略来解决这些问题。正所谓兵来将挡水来土掩，有问题一定要解决。</p><p>服务提供者方面，对于这种请求量超出承受能力的问题，我们可以进行扩容来支持高并发或者进行限流，自己能处理多少请求就处理多少，处理不了的请求直接拒绝，这样才不会将自己拖垮。</p><p>对于代码的 Bug 问题，我们可以通过测试、Code Review 等方式来避免，对于慢 SQL 这种问题，我们需要去做数据库性能优化。对于服务器硬件故障问题，我们可以加大运维粒度，通过监控等手段来提前预防。</p><p>服务消费者方面，我们需要做的就是资源隔离，快速失败，这也是最有效的方式，当我们发现被调用方迟迟不响应出现问题的时候，就不要再继续发起调用请求了，此时应该停止，等待被调用方恢复后再发起调用，你可能会说，那我是不是在每个调用的地方都要做一些逻辑处理并判断要不要发起调用，如果你有这种想法就太小看 Spring Cloud 的生态圈了，我们只需要使用 Hystrix 就能轻松搞定这种场景。</p><h6 id="hystrix" tabindex="-1">Hystrix <a class="header-anchor" href="#hystrix" aria-label="Permalink to &quot;Hystrix&quot;">​</a></h6><p>Hystrix 是由 Netflix 发布的针对微服务分布式系统的熔断保护中间件，相当于电路中的保险丝，它的关注度也非常高，在 GitHub 上已经有超过 18000 颗星，也经过了 Netflix 线上大规模流量的验证，性能非常稳定。</p><p>在微服务架构下，很多服务都相互依赖，如果不能对依赖的服务进行隔离，那么服务本身也有可能发生故障，Hystrix 通过 HystrixCommand 对调用进行隔离，这样可以阻止故障的连锁反应，能够快速失败并迅速恢复服务或者进行回退并优雅降级。</p><p>Spring Cloud 将原生 Hystrix 整合进来，提供了最简洁的使用方式，并且跟 Feign、Zuul 等组件做了集成，极大的降低了使用的难度。</p><h6 id="设计原则" tabindex="-1">设计原则 <a class="header-anchor" href="#设计原则" aria-label="Permalink to &quot;设计原则&quot;">​</a></h6>',20),y=t("p",null,"这里总结了 Hystrix 的 5 条设计原则，首先我们看看第一条设计原则避免线程耗尽，由于被调用方出现问题，调用方无法及时获取响应结果，而一直在发送请求，最终会耗尽所有线程的资源。",-1),x=t("p",null,"快速失败指的是当被调用方出现问题后，调用方发起的请求可以快速失败并返回，这样就不用一直阻塞住，同时也释放了线程资源。",-1),u=t("p",null,"支持回退指的是在失败后，我们可以让用户有回退的逻辑，比如获取备用数据，从缓存中获取数据，记录日志等操作。",-1),g=t("p",null,"资源隔离是设计原则里最重要的，当你的服务依赖了 A、B、C 三个服务，当只有 C 服务出问题的时候，如果没做隔离，最终也会发生雪崩效应，导致整个服务不可用，如果我们进行了资源隔离，A、B、C 三个服务都是相互隔离的，即使 C 服务出问题了，那也不影响 A 和 B。这其实就跟不要把所有的鸡蛋放进一个篮子里是一样的道理。",-1),H=t("p",null,"近实时监控也非常重要，它能帮助我们了解整个系统目前的状态，有哪些服务有问题，当前流量有多大，出问题后及时告警等。",-1),C=t("h6",{id:"容错实现",tabindex:"-1"},[s("容错实现 "),t("a",{class:"header-anchor",href:"#容错实现","aria-label":'Permalink to "容错实现"'},"​")],-1),A=t("p",null,"前面我们讲了 Hystrix 的一些设计原则，这些原则实际就是为了解决遇到的问题。那么要解决这些问题，就必须去实现这些设计，你现在看到的脑图是我简单整理的一些实现点。",-1),b=t("p",null,"封装请求会将用户的操作进行统一封装，统一封装的目的在于进行统一控制。",-1),P=t("p",null,"资源隔离会将对应的资源按照指定的类型进行隔离，比如线程池和信号量，详细的隔离机制会在后面进行讲解。",-1),f=t("p",null,"失败回退其实是一个备用的方案，就是说当请求失败后，有没有备用方案来满足这个请求的需求。Hystrix 中会让用户去自定义备用方案。",-1),B=t("p",null,"断路器这个是最核心的，断路器决定了请求是否需要真正的执行，如果断路器处于打开的状态，那么所有请求都将失败，执行回退逻辑。如果断路器处于关闭状态，那么请求将会被正常执行，断路器的原理后面会进行讲解。",-1),K=t("p",null,"指标监控会对请求的生命周期进行监控，请求是成功了，还是失败了，是超时了，还是被拒绝了，都会被监控起来。",-1),T=t("h6",{id:"工作原理",tabindex:"-1"},[s("工作原理 "),t("a",{class:"header-anchor",href:"#工作原理","aria-label":'Permalink to "工作原理"'},"​")],-1),k=o('<p>这张图是 Hystrix 在 GitHub 主页上提供的，详细的展示了 Hystrix 的工作原理。通过此图可以看出，整个工作流程分为 9 个主要步骤。</p><p>第 1 步是构建一个 HystrixCommand 或者 HystrixObservableCommand 对象，将请求包装到 Command 对象中。第 2 步就是执行构建好的命令。第 3 步是判断当前请求是否有缓存，如果在缓存中就直接返回缓存的内容。</p><p>第 4 步是判断断路器是否处于打开的状态，如果是打开状态，那么 Hystrix 就不再会去执行命令，直接跳到第 8 步，获取 fallback 方法，执行 fallback 逻辑，也就是前面我们的讲的回退逻辑。</p><p>如果断路器没有打开，那么继续执行第 5 步，判断是否能够执行该命令，如果是线程池隔离模式，会判断线程池队列的容量，如果是信号量隔离模式，会判断信号量的值是否已经被使用完。</p><p>如果线程池和信号量都已经满了，那么同样请求不会再执行，会直接跳到第 8 步。</p><p>如果容量满足执行条件，那么继续第 6 步，执行 HystrixObservableCommand.construct() 或者 HystrixCommand.run() 方法，正在执行的请求逻辑就封装在 construct() 或者 run() 方法中。</p><p>在执行过程中，如果出现异常或超时，会直接到第 8 步，执行成功就返回结果，需要注意的是执行的结果会将数据上报给断路器，断路器会根据上报的数据来判断断路器是否打开。到此为止，整个 Hystrix 的工作便完成了。</p><h6 id="hystrix-使用" tabindex="-1">Hystrix 使用 <a class="header-anchor" href="#hystrix-使用" aria-label="Permalink to &quot;Hystrix 使用&quot;">​</a></h6><p>Hystrix 的使用主要有三种方式，分别是 HystrixCommand 注解方式，在 Feign 中使用，以及在 Zuul 中使用，本课时主要讲解 HystrixCommand 注解方式的使用，Feign 和 Zuul 的集成使用会在后面对应的课时中进行讲解。</p><br><p>首先我们需要在 pom 中增加 spring-cloud-starter-netflix-hystrix 的依赖，然后在启动类上增加 @EnableHystrix 注解，HystrixCommand 注解作用于方法上，哪个方法想要使用 Hystrix 来进行保护，就在这个方法上增加 HystrixCommand 注解。</p><br>',12),S=t("p",null,"HystrixCommand 都有默认的配置，我们可以手动指定配置信息，比如 commandKey、groupKey、fallbackMethod 等。",-1),M=t("br",null,null,-1),E=t("p",null,"最简便的配置方式还是统一将配置信息放入配置文件中进行管理，我们可以为 HystrixCommand 设置一个 commandKey，然后在配置文件中为这个 commandKey 指定对应的配置信息。比如我们配置 getUser 这个 commandKey 的超时时间和隔离方式，在配置文件中增加",-1),D=t("p",null,"hystrix.command.getUser.execution.isolation.thread.timeoutInMilliseconds = 3000",-1),V=t("p",null,"hystrix.command.getUser.execution.isolation.strategy = SEMAPHORE",-1),O=t("p",null,"这 2 行代码即可。",-1),q=t("br",null,null,-1),I=t("p",null,"我们来调用下 user-service 的接口，将 user-service 接口稍微改造下，休眠 10 秒钟后再返回，这样的话我们在调用的时候需要等待 10 秒钟才能得到返回结果，如果在高并发场景下，很多请求就会阻塞在这里，这种场景下我们需要超时、快速失败等机制来避免资源耗尽的问题，所以我们使用了 Hystrix 来解决这个问题，我们在 get 方法上增加了 HystrixCommand 注解，设置了超时时间为 3 秒钟，如果 3 秒钟还没返回结果，那么该请求就会超时，执行 fallback 方法中的逻辑返回给调用方。",-1),N=t("h2",{id:"hystrix-配置",tabindex:"-1"},[s("Hystrix 配置 "),t("a",{class:"header-anchor",href:"#hystrix-配置","aria-label":'Permalink to "Hystrix 配置"'},"​")],-1),v=t("p",null,"Hystrix 的配置项比较多，在这里整理了几个比较常用的配置，所有的配置基本上都有默认值，如果我们需要调整这些配置，可以参考 PPT 中给出的链接。",-1),L=t("p",null,"隔离策略，我们需要根据不同的场景来选择合适的策略，可选择的策略有线程和信号量。命令执行的超时时间，这个只对线程隔离有效，信号量隔离不支持超时，当命令执行的时间超过了我们设定的时间，那么就会超时。",-1),U=t("p",null,"信号量隔离需要给信号量设定一个值，这个值表示最大的并发请求数量，超出这个数量就会拒绝请求，很多人在做压力测试的时候没有去调整该配置，压测时发现性能上不去，这就是没仔细看文档的后果。",-1),G=t("p",null,"断路器开关的控制这个也挺常用的，在某些场景下，我们可能需要手动进行降级，这个时候就可以将断路器强制打开，这样就会拒绝所有请求。",-1),F=t("p",null,"如果使用线程隔离方式，需要调整好线程池的参数，否则跟信号量一样，并发量大的时候性能上不去。设置最大的线程数，默认为 10，然后就是队列的大小，这决定了能够堆积多少个请求。但请求也不能一直堆积，所以我们还需要设置一个阈值来进行拒绝。",-1),j=t("h2",{id:"hystrix-监控",tabindex:"-1"},[s("Hystrix 监控 "),t("a",{class:"header-anchor",href:"#hystrix-监控","aria-label":'Permalink to "Hystrix 监控"'},"​")],-1),R=t("p",null,"在 Hystrix 的设计原则中我们提到了近实时监控，Hystrix 会实时记录所有 HystrixCommand 的执行信息，其中有每秒执行了多少次请求，多少次是成功的，多少次是失败的等信息。",-1),Z=t("p",null,"这些信息我们可以通过 Hystrix Dashboard 来进行图形化的展示，能够更直观的看出系统当前的运行状态。",-1),w=t("p",null,"在 Hystrix Dashboard 主页面，我们可以输入需要监控的 Stream 地址，Stream 地址会输出监控的原始数据，Dashboard 就是将这些数据图形化展示。",-1),Q=t("p",null,"这张图是 Hystrix 官方提供的，通过 Dashboard 将请求的情况展示出来，每一块都是一个Command，Command 区域背景色的圆圈越大表示流量越大，绿色的数字表示请求成功的短路的计数，当断路器处于打开状态时，被拦截的请求就是短路的数量。黄色的数字表示超时的请求数，紫色数字表示请求被拒绝的数量。红色的数字表示请求失败的数量。",-1),Y=t("br",null,null,-1),J=t("p",null,"下面我们自己来搭建一个 Hystrix 的 Dashboard，首先需要创建一个单独的 hystrix-dashboard 的项目，加入 spring-cloud-starter-netflix-hystrix-dashboard 的依赖，启动类上增加 @EnableHystrixDashboard 注解，这些都是固定的老套路，相信大家都已经轻车熟路了。",-1),X=t("br",null,null,-1),$=t("p",null,"启动项目，在浏览器中访问，就可以看到 Dashboard 的主页了。需要对项目进行监控，首先要有对应的 Stream 地址，Stream 产生数据源，我们在被监控的项目中加入 spring-boot-starter-actuator，只有加入了 actuator 才能暴露出 hystrix.stream 端点，访问下 hystrix.stream 端点，可以看到一直在输出内容 ping:，这个时候证明没有监控数据产生，我们访问下之前添加了 HystrixCommand 的方法，这样就会产生监控数据了，然后再看下 hystrix.stream 你会发现，已经有数据在不断输出了。",-1),z=t("p",null,"然后我们将这个 hystrix.steam 的地址输入到 Dashboard 的主页中，点击 monitor 按钮，就可以看到对应的图形化页面了。",-1),W=t("h2",{id:"hystrixcommand原理",tabindex:"-1"},[s("@HystrixCommand原理 "),t("a",{class:"header-anchor",href:"#hystrixcommand原理","aria-label":'Permalink to "@HystrixCommand原理"'},"​")],-1),tt=t("p",null,"使用 HystrixCommand 注解确实比较方便，这样我们就不用自己去将请求包装成 Command 执行，将这个包装的过程交给框架内部处理，这也是框架存在的价值。",-1),st=t("p",null,"HystrixCommand 注解的原理其实很简单，在 Hystrix 中有一个 HystrixCommandAspect 专门负责将加了 HystrixCommand 的方法在执行时进行包装。我们打开 HystrixCommandAspect 的源码，可以看到加入了 HystrixCommand 和 HystrixCollapser 两个注解，内部就是获取 Method、判断、包装，最后执行。",-1),at=t("h2",{id:"hystrix-隔离方式",tabindex:"-1"},[s("Hystrix 隔离方式 "),t("a",{class:"header-anchor",href:"#hystrix-隔离方式","aria-label":'Permalink to "Hystrix 隔离方式"'},"​")],-1),it=o('<p>Hystrix 支持线程池和信号量两种隔离方式，线程池隔离是当用户请求到 A 服务后，A 服务需要调用其他服务，这个时候可以为不同的服务创建独立的线程池，假如 A 需要调用 B 和 C，那么可以创建 2 个独立的线程池，将调用 B 服务的线程丢入到一个线程池，将调用 C 服务的线程丢入到另一个线程池，这样就起到隔离效果，就算其中某个线程池请求满了，无法处理请求了，对另一个线程池也没有影响。</p><p>信号量隔离就比较简单了，信号量就是一个计数器，比如初始化值是 100，那么每次请求过来的时候就会减 1，当信号量计数为 0 的时候，请求就会被拒绝，等之前的请求处理完成后，信号量会加 1，同时也起到了限流的作用，这就是信号量隔离，信号量隔离是在请求主线程中执行的。</p><p>线程池隔离的特点是 Command 运行在独立的线程池中，可以支持超时，是单独的线程，支持异步。信号量隔离运行在调用的主线程中，不支持超时，只能同步调用。</p><h6 id="hystrix-使用小经验" tabindex="-1">Hystrix 使用小经验 <a class="header-anchor" href="#hystrix-使用小经验" aria-label="Permalink to &quot;Hystrix 使用小经验&quot;">​</a></h6><p>Hystrix 的使用还是比较简单的，很多工作框架都已经帮我们实现好了，但在实际使用中，我们还是会遇到很多问题，我总结了一些 Hystrix 使用中的小经验，在这边分享给你，这些对你在面试中也很有帮助，如果你只说用了 HystrixCommand 注解，却说不出其他经验，面试效果可想而知，如果你能说出最基本的使用，还能说自己在工作中遇到了一些什么样的问题，然后怎么去解决的，总结了以下几点经验，详细的讲给面试官听，强势扭转面试局势。</p><ul><li>配置可以对接配置中心进行动态调整。</li></ul><p>Hystrix 的配置项非常多，在前面我建议大家只设置一个 CommandKey，其他的都在配置中进行指定，不要在注解中写上所有的配置，这种方式可行，但是不是最好的，因为它只能在代码中修改。像很多配置，我们都会根据当时的流量情况来进行调整，如果不对接配置中心，这个工作太难了。其实 Hystrix 内部默认使用 Archaius 来实现的动态配置， Archaius 是 Netflix 的配置框架，也可以直接用 Archaius 来动态管理 Hystrix 的配置信息。</p><ul><li>回退逻辑中可以手动埋点或者通过输出日志进行告警。</li></ul><p>当请求失败或者超时，会执行回退逻辑，如果有大量的回退，则证明某些服务出问题了，这个时候我们可以在回退的逻辑中进行埋点操作，上报数据给监控系统，也可以输出回退的日志，统一由日志收集的程序去进行处理，这些方式都可以将问题暴露出去，然后通过实时数据分析进行告警操作，当然这只是一个入口，对 Hystrix 进行监控的方式有很多种，我们可以扩展 Hystrix 的插件进行数据收集，也可以分析 Hystrix.stream 端点的数据来进行告警。</p><ul><li>用了线程池隔离模式再用 ThreadLocal 会有坑。</li></ul><p>一个请求进来，这时是容器的线程在负责执行，对于同一个线程传递上下文 ThreadLocal 是没有问题的，当我们用了线程池隔离模式的时候，被隔离的方法会包装成一个 Command 丢入到独立的线程池中进行执行，这个时候就是从 A 线程切换到了 B 线程，ThreadLocal 的数据就会丢失，这个问题的解决方案也有多种，可以参考 PPT 中我给的博客链接，这是我之前写的解决方案。</p><ul><li>网关中尽量用信号量隔离。</li></ul><p>之所以建议在网关中用信号量隔离，是因为网关是所有请求的入口，路由的服务数量会很多，几十个到上百个都有可能，如果用线程池隔离，那么需要创建上百个独立的线程池，开销太大了。用信号量隔离开销就小很多，还能起到限流的作用。</p><ul><li>插件机制可以实现很多扩展。</li></ul><p>Hystrix 提供了插件机制，可以通过插件来改变 Hystrix 的行为，比如我们可以使用事件通知的插件来做一些数据收集和告警的工作，可以使用配置插件来改变配置的默认行为，目前默认是 Archaius，我们可以将其改变成其他的配置组件。可以使用并发插件来改变线程池的行为，可以对 Callable 进行装饰，来解决 ThreadLocal 跨线程传递的问题。</p><ul><li>Hystrix 各种超时配置方式。</li></ul><p>Hystrix 中用的最多的配置可能就是超时时间，可以配置全局的默认超时时间，那么在 HystrixCommand、Feign 以及 Zuul 中超时时间怎么配置呢？最核心的点在于你需要知道Hystrix CommandKey 是怎么生成的，知道了 CommandKey，就可以对 CommandKey 进行超时的配置，由于时间关系，就不具体展开讲解了，我之前写了一篇详细的文章，大家可以参考下，链接在 PPT 中。</p><ul><li>commandKey、groupKey、threadPoolKey 的使用。</li></ul><p>在使用 HystrixCommand 注解的时候，我们会配置 commandKey、groupKey、threadPoolKey，当然这些也可以不用配置，因为有默认值。commandKey 表示这个请求被封装成了 Command 去执行，commandKey 就是这个 command 的名称，我们可以给指定的 commandKey 进行参数的配置。比如 commandKey1 的超时时间我们设置成 3 秒，commandKey2 的超时时间我们可以设置成 10 秒。</p><p>groupKey 是将一组 command 进行分组，groupKey 就是组的名称，同时如果没有设置 threadPoolKey 的话，那么线程池的名称会用 groupKey。</p><p>threadPoolKey 是线程池的名称，多个 command的threadPoolKey 相同，那么会使用同一个线程池。建议大家手动配置一个简短的、友好的 threadPoolKey，同时使用 threadPoolKey 来对 command 进行线程池隔离的划分。</p><br><br>',23);function ot(rt,et,lt,nt,dt,ct){const a=e("Image");return l(),n("div",null,[c,h,m,p,i(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/97/EB/CgoB5l2gPgGAPtZNAAD-3MAo7Ls234.png"}),s(),_,i(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/98/0A/CgotOV2gPgGAP-qzAABk99lb2oU443.png"}),s(),y,x,u,g,H,C,A,i(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/97/EB/CgoB5l2gPgGAF353AAFVH3psdO4196.png"}),s(),b,P,f,B,K,T,i(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/98/0A/CgotOV2gPgGATT0XAAHyJjjmin8233.png"}),s(),k,i(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/97/EB/CgoB5l2gPgGAH62HADl1HsI091U613.gif"}),s(),S,M,i(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/98/0A/CgotOV2gPgKAZIURACtoJYAvTTw625.gif"}),s(),E,D,V,O,q,i(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/97/EB/CgoB5l2gPgKAfQCjADH_ydrSTn0846.gif"}),s(),I,N,i(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/98/0A/CgotOV2gPgKAYjAMAABpYDXLwZU519.png"}),s(),v,L,U,G,F,j,i(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/97/EB/CgoB5l2gPgOAFuD2AAKErrJy9zw955.png"}),s(),R,Z,w,i(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/98/0A/CgotOV2gPgOAW-YXAAMjhG4LmRc939.png"}),s(),Q,Y,i(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/97/EB/CgoB5l2gPgOAUaGgABtwVk03hhA570.gif"}),s(),J,X,i(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/98/0A/CgotOV2gPgOAaIiIAFXv_KctB6A050.gif"}),s(),$,z,W,tt,st,at,i(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/97/EB/CgoB5l2gPgOANzYWAAEMqTCDefI937.png"}),s(),it])}const pt=r(d,[["render",ot]]);export{mt as __pageData,pt as default};
