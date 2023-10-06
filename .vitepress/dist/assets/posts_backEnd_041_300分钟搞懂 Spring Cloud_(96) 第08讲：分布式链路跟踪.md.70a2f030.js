import{_ as p,j as l,o as n,g as o,k as t,Q as r,s as a,h as i}from"./chunks/framework.b3d8e22e.js";const P=JSON.parse('{"title":"分布式链路跟踪使用场景 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/041_300分钟搞懂 Spring Cloud/(96) 第08讲：分布式链路跟踪.md","filePath":"posts/backEnd/041_300分钟搞懂 Spring Cloud/(96) 第08讲：分布式链路跟踪.md","lastUpdated":1696417798000}'),s={name:"posts/backEnd/041_300分钟搞懂 Spring Cloud/(96) 第08讲：分布式链路跟踪.md"},c=r('<p>本课时我们主要讲解：分布式链路跟踪的使用场景，以及如何实现分布式链路跟踪等内容。</p><h6 id="分布式链路跟踪使用场景" tabindex="-1">分布式链路跟踪使用场景 <a class="header-anchor" href="#分布式链路跟踪使用场景" aria-label="Permalink to &quot;分布式链路跟踪使用场景&quot;">​</a></h6><p>近年来，随着微服务架构的流行，很多公司都走上了微服务拆分之路。从而使系统变得越来越复杂，原本单体的系统被拆成很多个服务，每个服务之间通过轻量级的 HTTP 协议进行交互。</p><p>单体架构时，一个请求的调用链路非常清晰，一般由负载均衡器，比如 Nginx。将调用方的请求转发到后端服务，后端服务进行业务处理后返回给调用方。而当架构变成微服务架构时，可能带来一系列的问题，我总结了三个比较重要的分享给你。</p><h6 id="接口响应慢-怎么排查" tabindex="-1"><strong>接口响应慢，怎么排查？</strong> <a class="header-anchor" href="#接口响应慢-怎么排查" aria-label="Permalink to &quot;**接口响应慢，怎么排查？**&quot;">​</a></h6><p>一个请求往往需要调用多个服务，而当接口响应比较慢时，我们无法知道是哪个服务出现了问题，在什么地方比较耗时，只有通过链路跟踪，将整个请求的链路信息收集起来，才可以知道请求在哪个环节耗时较长，从而快速发现接口响应慢的问题，并及时解决。</p><h6 id="服务间的依赖关系如何查看" tabindex="-1"><strong>服务间的依赖关系如何查看？</strong> <a class="header-anchor" href="#服务间的依赖关系如何查看" aria-label="Permalink to &quot;**服务间的依赖关系如何查看？**&quot;">​</a></h6><p>服务之间都存在相互调用的情况，如果不做梳理工作，随着时间的推移，整个调用关系将会变成一张蜘蛛网，梳理调用关系可以让我们在前期将服务之间的关系整理清楚，当需要对一个服务做改动时，可以明确的知道影响的范围。链路跟踪会将请求的链路信息记录起来，通过这些信息可以分析出服务之间的依赖关系，并且可以绘制出可视化的依赖关系图。</p><h6 id="请求贯穿多个服务-如何将日志串起来" tabindex="-1"><strong>请求贯穿多个服务，如何将日志串起来？</strong> <a class="header-anchor" href="#请求贯穿多个服务-如何将日志串起来" aria-label="Permalink to &quot;**请求贯穿多个服务，如何将日志串起来？**&quot;">​</a></h6><p>记录详细的日志能够方便我们排查问题，在微服务架构下，一个请求经过了 N 个服务，输出 N 条日志，我们需要将日志统一收集起来，而存在的问题是日志是在各个服务节点中输出的，当服务器时间不一致时，是无法获得正确的日志顺序的，最严重的是不知道这些日志间的关系，不知道某个请求对应的日志有哪些。链路跟踪会产生 tradeId，tradeId 会贯穿整个请求，将所有日志串联起来。</p><h6 id="分布式链路跟踪" tabindex="-1">分布式链路跟踪 <a class="header-anchor" href="#分布式链路跟踪" aria-label="Permalink to &quot;分布式链路跟踪&quot;">​</a></h6>',11),h=r('<br><p>谷歌在公开论文中介绍了内部使用的 Dapper 监控系统，Dapper 是为了收集更多的复杂分布式系统的行为信息而设计的，然后将信息呈现给 Google 的开发者们。这样的分布式系统有一个特殊的好处，因为那些大规模的低端服务器，作为互联网服务的载体，是一个特殊的经济划算的平台。想要在这个上下文中理解分布式系统的行为，就需要监控那些横跨了不同的应用、不同的服务器之间的关联动作。</p><p>分布式链路跟踪原理在于如何能将请求经过的服务节点都关联起来，当一个请求从客户端到达网关后，相当于是第一个入口，这时就需要生成一个唯一的 ID，作为这次请求的标识。从网关到达服务 A 后，肯定是需要将请求 ID 传递到服务 A 中的，这样才能将网关到服务 A 的请求关联起来，依次类推，后面会经过多层服务，都需要将信息一层层传递。当然在每一层都需要将数据进行上报、统一存储、展示等操作。</p><p>从我们对这个需求的理解来看，链路跟踪并不是很复杂，而复杂的点在于如何实现这一套跟踪框架，就拿请求信息传递这件事来说，服务之间交互，有的用的是 Feign 调用接口，有的用的是 RestTemplate 调用接口，要想将信息传递到下游服务，那么必须得扩展这些调用的框架才可以。</p><h6 id="链路跟踪核心概念" tabindex="-1">链路跟踪核心概念 <a class="header-anchor" href="#链路跟踪核心概念" aria-label="Permalink to &quot;链路跟踪核心概念&quot;">​</a></h6><ul><li><strong>Span</strong></li></ul><p>基本工作单元，例如，发送 RPC 请求是一个新的 Span，发送 HTTP 请求是一个新的 Span，内部方法调用也是一个新的 Span。</p><ul><li><strong>Trace</strong></li></ul><p>一次分布式调用的链路信息，每次调用链路信息都会在请求入口处生成一个 TraceId。</p><ul><li><strong>Annotation</strong></li></ul><p>用于记录事件的信息。在 Annotation 中会有 CS、SR、SS、CR 这些信息，下面分别介绍下这些信息的作用。</p><ul><li><strong>CS</strong></li></ul><p>也就是 Client Sent，客户端发起一个请求，这个 Annotation 表示 Span 的开始。</p><ul><li><strong>SR</strong></li></ul><p>也就是 Server Received，服务器端获得请求并开始处理它，用 SR 的时间戳减去 CS 的时间戳会显示网络延迟时间。</p><ul><li><strong>SS</strong></li></ul><p>也就是 Server Sent，在请求处理完成时将响应发送回客户端，用 SS 的间戳减去 SR 的时间戳会显示服务器端处理请求所需的时间。</p><ul><li><strong>CR</strong></li></ul><p>也就是 Client Received，表示 Span 的结束，客户端已成功从服务器端收到响应，用 CR 的时间戳减去 CS 的时间戳就可以知道客户端从服务器接收响应所需的全部时间。</p><h6 id="请求追踪过程分解" tabindex="-1">请求追踪过程分解 <a class="header-anchor" href="#请求追踪过程分解" aria-label="Permalink to &quot;请求追踪过程分解&quot;">​</a></h6><p>下面我们来分解请求追踪的过程，看看在请求中 Trace 和 Span 是怎么产生的，需要传递哪些信息等。</p>',21),S=r('<br><p>首先当一个请求访问 SERVICE1 时，这时是没有 Trace 和 Span 的，然后会生成 Trace 和 Span，如图所示生成的 Trace ID 是 X，Span ID 是 A。</p><p>接着 SERVICE1 请求 SERVICE2，这是一次远程请求，会生成一个新的 Span，Span ID 为 B，Trace ID 不变还是 X。Span B 处于 CS 状态。</p><p>当请求到达 SERVICE2 后，Trade ID 和 Span ID 就被传递过来了，这时，SERVICE2 有内部操作，又生成了一个新的 Span，Span ID 为 C，Trace ID 不变还是 X。</p><p>SERVICE2 处理完后向 SERVICE3 发起请求，同时产生新的 Span，Span ID 为 D，Span D 处于 CS 状态，SERVICE3 接收到请求后，Span D 处于 SR 状态，同时 SERVICE3 内部操作也会产生新的 Span，Span ID 为 E。</p><p>当 SERVICE3 处理完后，需要将结果响应给调用方，这时 Span D 就处于 SS 的状态，当 SERVICE2 收到响应后，Span ID 为 D 的 Span 就是 CR 状态，表示 Span 已经结束了。</p><p>后面就不再分析了，原理是一样的，一次请求会经过多个服务，会产生多个 Span，但是 Trace ID 只有一个的，这样才能将整个请求链路串联起来。最重要的是所有的数据都会存储起来，才能让我们去厘清调用链，以及每个环节所消耗的时间。</p><h6 id="spring-cloud-sleuth-介绍" tabindex="-1">Spring Cloud Sleuth 介绍 <a class="header-anchor" href="#spring-cloud-sleuth-介绍" aria-label="Permalink to &quot;Spring Cloud Sleuth 介绍&quot;">​</a></h6><p>Spring Cloud Sleuth 是一种分布式的服务链路跟踪解决方案，通过使用 Spring Cloud Sleuth 可以让我们快速定位某个服务的问题，以及厘清服务间的依赖关系。</p><p>Sleuth 可以添加链路信息到日志中，这样的好处是可以统一将日志进行收集展示，并且可以根据链路的信息将日志进行串联。</p><p>Sleuth 中的链路数据可直接上报给 Zipkin，在 Zipkin 中就可以直接查看调用关系和每个服务的耗时情况。</p><p>Sleuth 中内置了很多框架的埋点，比如：Zuul、Feign、Hystrix、RestTemplate 等。正因为有了这些框架的埋点，链路信息才能一直往下传递。</p><h6 id="zipkin-介绍" tabindex="-1">Zipkin 介绍 <a class="header-anchor" href="#zipkin-介绍" aria-label="Permalink to &quot;Zipkin 介绍&quot;">​</a></h6>',13),u=r('<br><p>Zipkin 是 Twitter 的一个开源项目，是一个致力于收集所有服务监控数据的分布式跟踪系统，它提供了收集数据和查询数据两大接口服务。有了 Zipkin 我们就可以很直观地查看调用链，并且可能很方便看出服务之间的调用关系，以及调用耗费的时间。</p><p>Zipkin 有四个组件：Collector，Storage，Search，Web UI。</p><ul><li><strong>Collector</strong></li></ul><p>是 Zipkin 的数据收集器，链路跟踪的数据到达 Zipkin 收集器，收集器会进行数据验证、存储。</p><ul><li><strong>Storage</strong></li></ul><p>是存储组件，Zipkin 默认是在内存中存储数据，内存存储是为了方便用户体验，真实使用中必须要将数据落地。支持 Elasticsearch 和 MySQL 等存储方式。</p><ul><li><strong>Search</strong></li></ul><p>是 Zipkin 的查询 API，当链路跟踪的数据被存储后，我们需要查询这些数据。Search 组件提供了简单的 JSON API，用于查找和检索数据。这个 API 的主要使用者是 Web UI。</p><ul><li><strong>Web UI</strong></li></ul><p>提供了可视化的操作界面，让我们能够方便，直观地查询链路跟踪的数据。</p><p>下面来看下 Zipkin 的整个工作流程，从图中我们可以看出，链路跟踪的信息会通过 Transport 传递给 ZIpkin 的 Collector，Transport 支持的方式有 HTTP 和 MQ 进行传输。</p><p>Collector 收到数据后会进行存储，API 是负责数据查询，给 UI 提供服务，用户就可以在 UI 上查看链路信息。</p><h6 id="sleuth关联整个请求链路日志" tabindex="-1">Sleuth关联整个请求链路日志 <a class="header-anchor" href="#sleuth关联整个请求链路日志" aria-label="Permalink to &quot;Sleuth关联整个请求链路日志&quot;">​</a></h6><p>当我们的一个请求涉及多个服务时，服务中输出的日志是散落在各个服务器上的，这时我们会用日志收集程序来收集日志进行统一存储，然后展示，常见的方案有 ELK。</p><p>如果不对日志进行处理，就算将所有服务的日志统一收集起来，也无法帮助我们快速找到想要的信息，最直接的一个问题是日志顺序，以及日志之间的关系，比如说想找到某一次请求所有相关的日志，其他请求的日志并不需要，要实现这两个需求，那么每条日志中就必须有内容能够关联起来，Spring Cloud Sleuth 就可以轻松解决这个问题。</p><p>集成 Spring Cloud Sleuth 后，会在原始的日志中加上一些链路的信息，总共有四个字段，分别是 application name、traceId、spanId、export。</p><ul><li><strong>application name</strong></li></ul><p>应用的名称，也就是 application.properties 中的spring.application.name 参数配置的属性。</p><ul><li><strong>traceId</strong></li></ul><p>为请求分配唯一请求号，用来标识一条请求链路。</p><ul><li><strong>spanId</strong></li></ul><p>表示基本的工作单元，一个请求可以包含多个步骤，每个步骤都拥有自己的spanId。一个请求包含一个 TraceId 和多个 SpanId。</p><ul><li><strong>export</strong></li></ul><p>布尔类型。表示是否要将该信息输出到 Zipkin 进行收集和展示。</p><p>有了这些信息后，就可以在日志收集时，将这些信息拆分成单独的字段来进行存储，然后根据 tradeId 进行查询，就可以找到这个请求的整体日志。</p>',26),d=a("p",null,"我们先将 Spring Cloud Sleuth 集成到项目中，还是之前的步骤，先要增加 Maven 依赖 spring-cloud-starter-sleuth。所有项目中都需要增加，比如我们这边有三个服务，网关、文章、用户。",-1),_=a("p",null,"在网关的过滤器中进行日志输出，在文章服务的接口中也进行日志输出，文章服务中会调用用户服务接口，在用户服务接口里也会输出日志。",-1),g=a("p",null,"分别启动三个服务，通过网关访问文章服务的接口，这样三个服务的日志都会输出，我们可以看到在日志信息中增加了一些额外的信息，也就是 INFO 后面中括号里的内容。",-1),T=a("h6",{id:"使用-zipkin-展示链路跟踪数据",tabindex:"-1"},[i("使用 Zipkin 展示链路跟踪数据 "),a("a",{class:"header-anchor",href:"#使用-zipkin-展示链路跟踪数据","aria-label":'Permalink to "使用 Zipkin 展示链路跟踪数据"'},"​")],-1),b=a("p",null,[i("Zipkin 的部署非常简单，将 Zipkin Server 的 jar 包下载到本地，然后通过 java -jar 命令启动就可以了。更多部署方式可以参考官方文档："),a("a",{href:"https://zipkin.io/pages/quickstart.html",target:"_blank",rel:"noreferrer"},"https://zipkin.io/pages/quickstart.html")],-1),C=r('<p>Zipkin Server 部署好后在我们的项目中增加 Zipkin 的 Maven 的依赖，然后配置 Zipkin server 的地址，这样就可以将链路信息发送到 Zipkin 中进行展示了。</p><p>访问接口，进行测试，可以看到 Zipkin Server 中已经有刚刚的请求信息了。</p><h6 id="抽样采集数据" tabindex="-1">抽样采集数据 <a class="header-anchor" href="#抽样采集数据" aria-label="Permalink to &quot;抽样采集数据&quot;">​</a></h6><p>实际使用中可能调用了 10 次接口，但是 Zipkin 中只有一条数据，这是因为收集信息是有一定比例的，这并不是 bug。</p><p>Zipkin 中的数据条数与调用接口次数默认比例是 10：1，当然我们也可以通过修改配置来改变这个比例值：</p><p>spring.sleuth.sampler.probability=1.0</p><p>之所以有这样的一个配置，是因为在高并发下，如果所有数据都采集，数据量就太大了，采用抽样的方法可以减少一部分数据量，特别是对于 HTTP 方式发送采集数据，如果全部采集会对性能有很大的影响。</p><h6 id="rabbitmq-代替-http-发送调用链数据" tabindex="-1">RabbitMQ 代替 HTTP 发送调用链数据 <a class="header-anchor" href="#rabbitmq-代替-http-发送调用链数据" aria-label="Permalink to &quot;RabbitMQ 代替 HTTP 发送调用链数据&quot;">​</a></h6><p>虽然有基于采样的收集方式，但是数据的发送如果采用 HTTP 对性能还是有影响的。如果</p><p>Zipkin 的服务端在重启或者挂掉时，那么将丢失部分采集数据。为了解决这些问题，我们</p><p>将集成 RabbitMQ 来发送采集数据，利用消息队列来提高发送性能，保证数据不丢失。</p><p>到这里集成就已经完成了，记得删除之前配置的 spring.zipkin.base-url。因为我们现在使用 RabbitMQ 来发送数据了，所以就不需要这个配置了。</p><p>数据发送方已经采用 RabbitMQ 来发送调用链数据，但是 Zipkin Server 并不知道 RabbitMQ 的信息，所以我们在启动 Zipkin 服务的时候需要指定 RabbitMQ 的信息。</p><p>java -DRABBIT_ADDRESSES=192.168.10.124:5672 -DRABBIT_USER=yinjihuan -DRABBIT_PASSWORD=123456 -jar zipkin.jar</p><h6 id="elasticsearch-存储调用链数据" tabindex="-1">Elasticsearch 存储调用链数据 <a class="header-anchor" href="#elasticsearch-存储调用链数据" aria-label="Permalink to &quot;Elasticsearch 存储调用链数据&quot;">​</a></h6><p>目前我们收集的数据都是存在 Zipkin 服务的内存中的，服务重启这些数据就没了， 我们需要将这些数据持久化。我们可以将其存储在 MySQL 中，因为实际使用中数据量可能会比较大，所以 MySQL 并不是一种很好的选择，可以选择用 Elasticsearch 来存储数据，Elasticsearch 在搜索方面有先天的优势。</p><p>启动 Zipkin 的时候指定存储类型为 ES，指定 ES 的 URL 信息：</p><p>java -DSTORAGE_TYPE=elasticsearch -DES_HOSTS=<a href="http://localhost:9200" target="_blank" rel="noreferrer">http://localhost:9200</a> -jar zipkin.jar</p><h6 id="手动埋点检测性能" tabindex="-1">手动埋点检测性能 <a class="header-anchor" href="#手动埋点检测性能" aria-label="Permalink to &quot;手动埋点检测性能&quot;">​</a></h6><p>异步执行和远程调用都会新开启一个 Span，如果我们想监控本地方法的耗时时间，可以采用埋点的方式监控本地方法，就是开启一个新的 Span。</p><p>定义一个 saveLog 的方法，用来模拟业务操作，Sleep 了 200 毫秒后，访问接口，我们再去 Zipkin 中查看，可以看到多了 saveLog 这个 Span，也可以看到 saveLog 的时间。</p><h6 id="hystrix埋点分析" tabindex="-1">Hystrix埋点分析 <a class="header-anchor" href="#hystrix埋点分析" aria-label="Permalink to &quot;Hystrix埋点分析&quot;">​</a></h6><p>在 SleuthHystrixAutoConfiguration 中，会自动装配 SleuthHystrixConcurrencyStrategy。SleuthHystrixConcurrencyStrategy 构造函数中会取出所有的插件信息，然后重置，再重新注册，ConcurrencyStrategy 注册的就是当前类。</p><p>然后通过 wrapCallable 装饰返回 TraceCallable，在 TraceCallable 中进行埋点。</p><p>在 Zuul 课时中，讲到了自定义 Ribbon 的算法类来控制选取 Server 的逻辑，其中有提到在算法类中获取 Request 对象只能在信号量隔离的模式下使用，线程隔离获取的 Request 对象为空，这是因为 RequestContext 是基于 ThreadLocal 来实现的，ThreadLocal 跨线程后将无法获取。</p><p>今天我们来讲第二种方案，之所以要在这里讲解是因为链路跟踪也会遇到同样的问题，那就是跟踪的信息会在服务间进行传递，如果逻辑被 Hystrix 包起来，那么线程就变了，跟踪的信息怎么传递到 Hystrix Command 内部呢？跟 Ribbon 的算法类是同一个问题，刚刚带大家看了 Sleuth 中 Hystrix 的埋点，为什么 Sleuth 中能做到，我们结合代码来分析下原理。</p><p>在 Hystrix 课时中我讲过 Hystrix 有插件机制，可以通过扩展插件来实现扩展的功能，比如我们可以扩展并发插件来实现 Hystrix 获取 ThreadLocal 中的值。</p><p>自定义一个 ZuulHystrixConcurrencyStrategy，继承了 HystrixConcurrencyStrategy。构造函数中还是重新注册了插件。</p><p>重点在 wrapCallable 方法，在 wrapCallable 中返回了一个 ZuulCallable，这个时候会从 RequestContext 中获取当前的 Request 对象，然后通过 ZuulCallable 的构造函数传递过去。</p><p>Hystrix 在执行的时候，会获取 wrapCallable 返回的 Callable 进行执行，这样就会执行 ZuulCallable 中的 call 方法，在 call 方法中，我们将之前传过来的 Request 对象重新 set 给 RequestContext。这样在 Hystrix 中就能获取到之前的 Request 了，也就是在这个地方做了一个值传递的操作。</p><h6 id="服务之间的信息传递" tabindex="-1">服务之间的信息传递 <a class="header-anchor" href="#服务之间的信息传递" aria-label="Permalink to &quot;服务之间的信息传递&quot;">​</a></h6><p>跟踪信息需要在服务之间进行传递，相关的代码我们可以打开 TracingFilter 进行查看，比如我们访问 Zuul 的接口，这时会在 TracingFilter 中会先去获取 TraceContext，如果没获取到则表示是第一次请求，需要生成 Trace 信息，然后设置到 HttpRequest 中。当请求到达 article 服务时，同样会进入 TracingFilter，这时 Trace 已经存在了，接收存储到 ThreadLocal 中，当 article 服务中去调用 user 服务的接口时，这个时候如果用 RestTemplate 来调用，会有对应的逻辑来处理，比如可以在 RestTemplate 的拦截器中获取 Trace 信息传递到下个服务中，如果用 Feign 来调用，也可以用 Feign 的拦截器来传递 Trace 信息，这样信息就可以在服务之间进行传递了。</p><p>如果我们自己需要实现一些信息的传递，也可以采用过滤器和拦截器的方式来进行处理，这样的好处在于统一进行处理，可以封装成单独的库，不需要开发人员关心。</p><br>',34);function k(I,A,R,m,q,E){const e=l("Image");return n(),o("div",null,[c,t(e,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/AA/56/CgotOV3TXSmAClJKAAGdgZ3eA9U538.png"}),h,t(e,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/AA/36/CgoB5l3TXSqAAotuAARIqATiaa4975.png"}),S,t(e,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/AA/56/CgotOV3TXSqAJOtrAAFNEaemXPk128.png"}),u,t(e,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/AA/36/CgoB5l3TXSuAJtylAB7oLXdZLaQ101.gif"}),d,t(e,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/AA/56/CgotOV3TXS2AY3HtADWu7OWUIKk284.gif"}),_,g,T,b,t(e,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/AA/36/CgoB5l3TXS2AJvfvADC2b2_Bh14854.gif"}),C])}const Z=p(s,[["render",k]]);export{P as __pageData,Z as default};
