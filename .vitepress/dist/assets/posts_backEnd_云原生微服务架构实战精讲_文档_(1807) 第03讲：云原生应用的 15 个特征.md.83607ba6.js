import{_ as o,j as h,o as i,g as n,k as r,h as t,Q as a}from"./chunks/framework.cfb14fe0.js";const I=JSON.parse('{"title":"第03讲：云原生应用的15个特征","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/云原生微服务架构实战精讲_文档/(1807) 第03讲：云原生应用的 15 个特征.md","filePath":"posts/backEnd/云原生微服务架构实战精讲_文档/(1807) 第03讲：云原生应用的 15 个特征.md","lastUpdated":1696682708000}'),l={name:"posts/backEnd/云原生微服务架构实战精讲_文档/(1807) 第03讲：云原生应用的 15 个特征.md"},s=a('<h1 id="第03讲-云原生应用的15个特征" tabindex="-1">第03讲：云原生应用的15个特征 <a class="header-anchor" href="#第03讲-云原生应用的15个特征" aria-label="Permalink to &quot;第03讲：云原生应用的15个特征&quot;">​</a></h1><p>本课时我将带你学习云原生应用。</p><br><p>微服务架构只是一种软件架构风格，并不限制所采用的实现技术，开发团队可以自由选择最合适的技术来实现。在第 01 课时介绍微服务架构的时候，提到了微服务架构实现最大的挑战是它的复杂度，这些复杂度是微服务架构本身天然所具备的，是每个微服务架构应用绕不开的难题。在实现微服务架构时，开发团队当然希望把全部的精力放在实现业务逻辑上，而不是应对微服务架构自身的复杂度，这就意味着，需要选择能够帮助应对这些复杂性的平台和工具。云原生（Cloud Native）应用就是微服务架构的最佳实现方式。</p><h1 id="云原生应用的概念" tabindex="-1">云原生应用的概念 <a class="header-anchor" href="#云原生应用的概念" aria-label="Permalink to &quot;云原生应用的概念&quot;">​</a></h1><p>顾名思义，云原生应用的概念由云和原生两个部分组成，云在这里指的是云平台，也就是<strong>平台即服务</strong>（Platform as a Service，PaaS）；原生应用指的是专门针对云平台而设计和实现的，充分利用了云平台的特性。应用的微服务可以专注于实现业务逻辑，而把微服务架构的复杂度交给云平台来解决。</p><br><p><strong>原生</strong>这个词在软件开发中有它独特的含义。原生通常意味着高效和难以移植。原生意味着针对特定的平台而设计，可以充分利用平台的特性，因此运行起来非常高效；同样意味着与特定平台的深度绑定，很难移植到其他平台。云原生应用同样具有这两个特征，对于云原生应用来说，难移植并不是一个问题，毕竟迁移到云平台之后，不会再想迁移回去。</p><h1 id="云原生应用的特征" tabindex="-1">云原生应用的特征 <a class="header-anchor" href="#云原生应用的特征" aria-label="Permalink to &quot;云原生应用的特征&quot;">​</a></h1><p>与其他应用相比，总结起来，云原生应用有如下 15 个特征。</p><h2 id="单一代码库" tabindex="-1">单一代码库 <a class="header-anchor" href="#单一代码库" aria-label="Permalink to &quot;单一代码库&quot;">​</a></h2><p>**云原生应用必须有单一的代码库，并在版本管理系统中进行追踪。**单一代码库可以是一个代码仓库，也可以是共享同一根目录的多个代码仓库，其重要性在于每一个代码提交（Commit）都会对应一个不可变的构建版本。在每次代码提交之后，持续集成流程会被触发，最终产生一系列的应用容器镜像，这就在代码提交和构建版本之间建立了一对``一的对应关系，这种一对一的关系保证了每个构建版本都是可追踪的，可以比较不同版本之间的代码变化。</p><br><p>对于微服务架构的应用来说，每个应用由多个服务组成，这些服务应该由单一的代码库进行管理，这保证了构建版本的稳定性。如果一个改动涉及到多个服务，则这个改动应该在一次代码提交中完成对所有相关服务的修改；如果服务的代码分散在多个代码库中，则一个改动会被分成多个代码提交，每个代码提交都会触发一次持续集成流程，产生对应服务的构建版本，这些服务的构建版本只包含了部分改动，是不完整的。在应用部署时，有的服务可能包含了部分改动，而有的服务则没有，这使得部署的应用实际上是不能工作的。因此，微服务架构的应用应该使用单一代码库。</p><h2 id="api-优先" tabindex="-1">API 优先 <a class="header-anchor" href="#api-优先" aria-label="Permalink to &quot;API 优先&quot;">​</a></h2><p>**云原生应用应该采用 API 优先的设计策略。**微服务架构的应用使用公开 API 来作为服务的对外接口，API 屏蔽了服务的内部实现细节。API 优先的设计策略指的是在设计阶段，应该首先设计 API 并确定 API 的细节。API 的设计过程需要多个团队的参与，包括 API 的实现者和可能的使用者，这些团队在充分讨论中最终完成 API 的定义。API 可以使用 OpenAPI 规范描述，从该规范中可以生成 API 文档和进行测试的模拟服务器。</p><br><p>API 优先的策略保证了 API 的稳定性，同时可以减少不必要的后期修改。因为 API 是服务之间的接口，修改 API 就意味着相关的内部实现、测试用例和 API 的使用者都需要进行修改，如果在应用开发中出现了必须修改 API 的情况，那造成的影响是很大的。API 优先确保了尽可能减少在开发中对 API 进行修改。</p><br><p>API 优先的另外一个好处是可以提高开发效率。API 确定之后，可以利用工具生成文档和模拟服务器，API 的使用者可以根据文档来编写使用 API 的代码。利用 Swagger 这样的工具，甚至可以直接生成访问 API 的代码。测试人员可以编写 API 相关的测试用例，并用模拟服务器运行测试。不同的团队可以并行工作，从而提高效率。</p><h2 id="依赖管理" tabindex="-1">依赖管理 <a class="header-anchor" href="#依赖管理" aria-label="Permalink to &quot;依赖管理&quot;">​</a></h2><p><strong>云原生应用应该管理自己的依赖</strong>，Java 开发人员对依赖管理应该并不陌生，常用的 Java 构建工具 Maven 和 Gradle 都提供了依赖管理的支持。在开发过程中，只需要利用构建工具的支持即可；在管理依赖时，则需要区分应用自带的依赖和运行环境提供的依赖。云原生应用通常会包含全部所需的依赖，尤其是以容器形式运行的应用，典型的例子是微服务的 REST API。云原生应用会自带嵌入式的 Tomcat 这样的服务器来提供 HTTP 服务。</p><h2 id="设计、构建、发布和运行" tabindex="-1">设计、构建、发布和运行 <a class="header-anchor" href="#设计、构建、发布和运行" aria-label="Permalink to &quot;设计、构建、发布和运行&quot;">​</a></h2><p><strong>云原生应用应该有完整的设计、构建、发布和运行流程</strong>，如下图所示。</p><br>',25),d=a('<h3 id="设计" tabindex="-1">设计 <a class="header-anchor" href="#设计" aria-label="Permalink to &quot;设计&quot;">​</a></h3><p>设计在云原生应用的开发中必不可少。传统应用通常采用瀑布式的开发流程，瀑布式的开发流程中会分配足够的时间进行设计。云原生应用一般采用敏捷软件开发流程，但是这并不意味着设计变得不再重要，只不过设计过程变成了一个迭代的过程，而且每次设计的范围较小，通常只需要对某些新特性进行设计。</p><h3 id="构建" tabindex="-1">构建 <a class="header-anchor" href="#构建" aria-label="Permalink to &quot;构建&quot;">​</a></h3><p>构建阶段从单一代码库中创建出带版本号的二进制工件，构建过程通常由持续集成服务器来完成，每个构建都必须有唯一不变的版本号，构建出来的二进制工件也是不可变的。这就保证了同一个构建版本在经过测试之后，被部署的版本与测试过的版本保持一致。</p><h3 id="发布" tabindex="-1">发布 <a class="header-anchor" href="#发布" aria-label="Permalink to &quot;发布&quot;">​</a></h3><p>把构建出来的工件推送到云平台之上，就得到了一个发布版本，发布版本中包含与部署环境相关的配置信息。云原生应用在部署时，通常有开发、测试和生产 3 个环境，在每个环境上的配置信息都不尽相同。发布版本也是不可变的，有唯一的发布号。每一个构建版本都可能对应多个发布版本。</p><h3 id="运行" tabindex="-1">运行 <a class="header-anchor" href="#运行" aria-label="Permalink to &quot;运行&quot;">​</a></h3><p>运行阶段在云平台之上运行应用，运行的方式取决于云平台，可以是虚拟机或容器。云平台负责管理应用的运行，包括监控应用运行状态、处理失败的情况和动态水平扩展等。</p><h2 id="代码、配置和凭据" tabindex="-1">代码、配置和凭据 <a class="header-anchor" href="#代码、配置和凭据" aria-label="Permalink to &quot;代码、配置和凭据&quot;">​</a></h2><p>代码、配置和凭据是云原生应用开发中创建的三种不同类型的实体。代码包括源代码和相关资源文件；配置是与部署环境相关的配置信息，通常以 XML、YAML、JSON 或属性文件的形式出现，配置中包含的信息包括第三方服务的连接方式、数据库连接信息和应用自身的配置属性等；凭据指的是密码、私钥和 API 密钥等敏感信息。</p><br><p>代码和配置的区别在于，代码不会随着部署环境而变化，而配置则相反。在实践中，应该尽可能把配置从应用中分离出来，进行外部化管理，构建出来的二进制工件中不包含任何配置信息，实际的配置值在部署时根据环境来确定。在运行时，一般使用环境变量来传递配置值，还可以使用类似 Spring Cloud Config 这样的专门配置服务器来管理配置值。凭据都应该从源代码仓库中删除。</p><h2 id="日志" tabindex="-1">日志 <a class="header-anchor" href="#日志" aria-label="Permalink to &quot;日志&quot;">​</a></h2><p>日志是应用开发中不可或缺的部分。与传统应用不同的是，云原生应用并不需要对日志的输出方式进行很多配置，只是简单地把日志写到标准输出流（stdout）和标准错误流（stderr）。日志的收集和处理由云平台上的其他服务来提供，这把应用开发人员从日志管理相关的任务中解放出来。云平台上的日志管理服务非常多，开源的典型实现包括 Elastic 技术栈（ElasticSearch + LogStash + Kibana）和 Fluentd。</p><h2 id="随时可丢弃" tabindex="-1">随时可丢弃 <a class="header-anchor" href="#随时可丢弃" aria-label="Permalink to &quot;随时可丢弃&quot;">​</a></h2><p>**云原生应用的生命周期可能是短暂的，随时可能被终止。**云平台可能会随时启动和停止应用的实例，这就要求云原生应用的启动和停止速度都要非常快。当应用的负载突然增大时，可以快速地启动新的实例来处理请求；当应用的实例出现问题时，可以快速启动一个新的实例作为替代。快速停止应用和快速启动应用一样重要，快速停止应用保证了资源可以被及时释放。</p><h2 id="支撑服务" tabindex="-1">支撑服务 <a class="header-anchor" href="#支撑服务" aria-label="Permalink to &quot;支撑服务&quot;">​</a></h2><p>云原生应用的运行离不开支撑服务。支撑服务是一个宽泛的概念，包括数据库、消息中间件、缓存、用户认证和授权、存储等。连接这些支撑服务的配置信息应该被抽离出来，在运行时根据部署环境提供实际值。</p><h2 id="环境等同" tabindex="-1">环境等同 <a class="header-anchor" href="#环境等同" aria-label="Permalink to &quot;环境等同&quot;">​</a></h2><p><strong>云原生应用的不同部署环境</strong> <strong>应该</strong> **是等同的。**开发、测试和生产环境之间不应该有差异，环境的等同性保证了云原生应用可以快速的进行部署，这一特征与构建工件的不变性是相辅相成的，两者缺一不可。有了这两个特征之后，每一个唯一版本的构建工件可以被依次部署到不同的环境，在测试环境上经过测试的版本，可以直接部署到生产环境。我们可以确定应用在生产环境上的行为与测试环境中一样。</p><h2 id="管理任务" tabindex="-1">管理任务 <a class="header-anchor" href="#管理任务" aria-label="Permalink to &quot;管理任务&quot;">​</a></h2><p>云原生应用运行中可能会需要执行一些管理任务，比如生成报表或者执行一次性的数据查询等，这些任务通常并不属于业务流程的一部分，更多的是为了管理和运维的需要。这些任务在执行中会用到云原生应用所依赖的支撑服务，对于这些任务，应该创建独立的应用，并在同样的云平台上运行。对于定期执行的任务，可以充分利用云平台的支持，比如，Kubernetes 提供了对定时任务（CronJob）的支持。</p><br><p>以生成报表为例，可以创建一个独立的应用来读取数据库并生成报表，该应用可以有自己独立的容器镜像。如果报表生成是手动触发的，该应用应该独立运行，并提供一个 API 接口来允许外部触发。如果报表生成是定期的，应用部署时可以创建相应的定时任务来运行容器，在容器启动时自动生成报表，生成完毕之后，容器运行结束。下图说明了这两种触发方式的区别，圆角矩形的边框表示应用的边界。</p><br>',25),p=a('<h2 id="端口绑定" tabindex="-1">端口绑定 <a class="header-anchor" href="#端口绑定" aria-label="Permalink to &quot;端口绑定&quot;">​</a></h2><p>云原生应用在运行时并不负责管理实际的端口绑定，而是由云平台统一管理。比如，一个基于 Spring Boot 的微服务应用通常在 8080 端口运行 HTTP 服务，当应用运行在云平台上时，这个端口只是虚拟机或容器内的端口，并不是外部用户或其他服务访问时的实际端口。云平台对网络进行统一管理，负责分配实际的端口，云平台同时提供了相应的机制来发现访问服务的实际地址和端口。</p><h2 id="无状态进程" tabindex="-1">无状态进程 <a class="header-anchor" href="#无状态进程" aria-label="Permalink to &quot;无状态进程&quot;">​</a></h2><p>**云原生应用应该是无状态的。**所有的状态信息都应该从应用中抽离出来，并保存在支撑服务中，比如数据库中。正因为应用是无状态的，才可以由云平台快速的启动和停止，并进行垂直或水平扩展。</p><h2 id="并发性" tabindex="-1">并发性 <a class="header-anchor" href="#并发性" aria-label="Permalink to &quot;并发性&quot;">​</a></h2><p>云原生应用使用水平扩展来并发运行多个实例，使用负载均衡来把请求分配到某个实例进行处理。</p><h2 id="遥测数据" tabindex="-1">遥测数据 <a class="header-anchor" href="#遥测数据" aria-label="Permalink to &quot;遥测数据&quot;">​</a></h2><p>云原生应用需要收集一系列遥测数据，包括应用性能指标、运行状态和日志等，这些遥测数据，对于云平台和应用来说同等重要。云平台可以用性能指标来进行自动水平扩展，比如，Kubernetes 支持 Pod 的自动水平扩展，当 CPU 的利用率超过预定的阈值时，会自动启动新的 Pod 来处理请求。性能指标分成两类：一类是业务无关的，比如请求的数量、请求的处理速度、以及平均的请求处理时间等；第二类是业务相关的，需要应用根据业务需求进行收集，比如处理的订单数量和不同商品的销售情况等。云原生应用通常会创建仪表盘来实时展示整体的运行状态，方便运维人员进行监控。</p><h2 id="认证和授权" tabindex="-1">认证和授权 <a class="header-anchor" href="#认证和授权" aria-label="Permalink to &quot;认证和授权&quot;">​</a></h2><p>云原生应用应该是安全的，安全应该在应用的设计阶段就充分考虑。在实现中，可以使用基于角色的访问控制（RBAC）来保护 API，已经有大量的开源框架来帮助实现认证和授权。</p><br><p>在理想情况下，云原生应用应该具备上述全部 15 个特征，但是在实际的开发中，不一定能够做到。开发团队可以根据需要，选择对应用最重要的特征来实现。</p><h1 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h1><p>本课时对云原生应用的15个特征都做了详细的介绍。这些特征有些比较好实现，有些则相对较难一些。在实际的开发中，应该尽可能让自己的云原生应用满足这些特征。</p><br>',15);function c(_,P,b,u,A,q){const e=h("Image");return i(),n("div",null,[s,r(e,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/02/6B/Ciqah156_QSAfQBzAABOU7Y65d4141.png"}),t(),d,r(e,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/7B/81/Cgq2xl56_QSAWystAACJk5oFHN0431.png"}),t(),p])}const f=o(l,[["render",c]]);export{I as __pageData,f as default};
