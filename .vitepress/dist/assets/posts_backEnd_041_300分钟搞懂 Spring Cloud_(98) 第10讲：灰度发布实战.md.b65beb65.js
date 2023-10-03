import{_ as e,o as a,g as s,Q as r}from"./chunks/framework.f949202b.js";const v=JSON.parse('{"title":"灰度发布","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/041_300分钟搞懂 Spring Cloud/(98) 第10讲：灰度发布实战.md","filePath":"posts/backEnd/041_300分钟搞懂 Spring Cloud/(98) 第10讲：灰度发布实战.md","lastUpdated":null}'),o={name:"posts/backEnd/041_300分钟搞懂 Spring Cloud/(98) 第10讲：灰度发布实战.md"},p=r('<p>本课时我们主要讲解如何使用 Discovery 进行灰度发布，以及 Discovery 源码分析等内容。</p><h1 id="灰度发布" tabindex="-1">灰度发布 <a class="header-anchor" href="#灰度发布" aria-label="Permalink to &quot;灰度发布&quot;">​</a></h1><p>首先我们来了解什么是灰度发布，灰度发布（又名金丝雀发布）是指在黑与白之间，能够平滑过渡的一种发布方式。在其上可以进行 A/B 测试，即让一部分用户继续使用产品特性 A，另外一部分用户开始使用产品特性 B，如果用户对特性 B 没有什么反对意见，那么逐步扩大范围，把所有用户都迁移到特性 B 上。灰度发布可以保证整体系统的稳定性，在初始灰度时就可以发现、调整问题。</p><p>在很多的开源框架中也有灰度发布的功能，比如配置中心 Apollo 中，对于配置的修改，也可以选择灰度发布，推送到某个指定的节点，如果这个节点使用一段时间没有发生问题，那么就可以推送给全部节点。如果这个节点使用过程中出问题，那么直接回滚这个节点的配置即可，对于其他节点没有任何影响。如果没有灰度发布的功能，一旦改动所有节点都生效，一个节点出问题，所有的节点也都会受影响。</p><p>了解完灰度发布的概念后，那么我们为什么需要灰度发布呢？因为灰度发布可以帮助我们解决以下三大问题。</p><ul><li><strong>灰度发布解决的第一个问题：服务数量多，业务变动频繁，发布</strong> <strong>频繁。</strong></li></ul><p>微服务架构下，拆分出来的服务数量成百上千，互联网的业务又是变动频繁的，一周一迭代很正常，基本上每周都要发布新功能，每次发布涉及的服务数量都比较多。发布过程中难免会出现问题，这个时候就需要考虑如何不影响现有的用户，灰度发布就能解决这个问题。</p><ul><li><strong>灰度发布解决的第二个问题：灰度发布能降低发布失败风险，减少影响范围</strong> <strong>。</strong></li></ul><p>通过灰度发布，先让一部分用户体验新的服务，或者只让测试人员进行测试，等功能正常后再全部发布，这样能降低发布失败带来的影响范围。</p><ul><li><strong>灰度发布解决的第三个问题：当发布出现故障</strong> <strong>时</strong> <strong>，可以快速回滚，不影响用户</strong> <strong>。</strong></li></ul><p>灰度发布只是先发布一部分功能，比如只发布一个节点，而这个节点不会接收正常用户的请求，只会根据灰度的规则来处理指定用户的请求，灰度后如果发现这个节点有问题，那么只需回滚这个节点即可，当然不回滚也没关系，通过灰度策略隔离，也不会影响正常用户。</p><h1 id="灰度发布策略" tabindex="-1">灰度发布策略 <a class="header-anchor" href="#灰度发布策略" aria-label="Permalink to &quot;灰度发布策略&quot;">​</a></h1><p>灰度发布怎么去隔离请求呢，我们会定制一系列的策略来支持，最常见的策略有用户策略，客户端策略，服务策略。</p><ul><li><strong>用户策略</strong></li></ul><p>用户策略指的是对指定的用户进行灰度的转发，比如我想让用户 ID 为 100 的用户访问灰度的服务，这样就可以让指定的用户来体验灰度和测试。</p><ul><li><strong>客户端策略</strong></li></ul><p>客户端策略指的是对于指定的客户端可以让其体验灰度功能，最常见的就是 App 的内测功能了，平时你在用某个 App 时，有时会有消息推送，说你作为我们的优质用户，可以体验最新版的 App 功能，这个时候就相当于是一个内测版本，先让小部分用户去使用，然后观察这部分用户的使用情况，如果没有问题再发布真正的版本。</p><ul><li><strong>服务策略</strong></li></ul><p>服务策略指的是对于指定的服务，可以在发布后将其变成灰度服务，这时不会让正常用户请求到，一般是使用 IP 加上端口的方式来进行的。</p><p>当然还有其他的使用场景，比如线上某个服务出故障，需要花时间排查问题，又不能重启服务，重启意味着现场就被破坏了，这个时候可以将服务通过灰度的方式进行隔离，这样就不会影响正常的请求，然后再对这个服务进行故障的排查。</p><h1 id="discovery-原理" tabindex="-1">Discovery 原理 <a class="header-anchor" href="#discovery-原理" aria-label="Permalink to &quot;Discovery 原理&quot;">​</a></h1><p>Discovery 是基于 Spring Cloud Discovery 服务注册发现、Ribbon 负载均衡、Feign 和 RestTemplate 调用等组件全方位增强的企业级微服务开源解决方案，包括灰度发布、灰度路由、服务隔离等功能。其 GitHub 地址为 <a href="https://github.com/Nepxion/Discovery%E3%80%82" target="_blank" rel="noreferrer">https://github.com/Nepxion/Discovery。</a></p><p>在项目中使用 Discovery 来实现灰度发布非常简单，Discovery 支持多种策略，同时也支持主流的注册中心和配置。</p><p><img src="https://s0.lgstatic.com/i/image3/M01/54/41/Cgq2xl3nXSaAV-vYAAFZZs65xIg434.png" alt=""></p><p>Discovery 是一款功能强大的框架，我们可以用它来实现灰度发布、服务隔离等高级功能。它的实现原理也非常简单，灰度发布最重要的是需要能够识别请求，然后将请求转发到匹配的服务上，说到这里你应该能想到需要怎么去实现了，前面课时中我也有提到过，可以通过 Ribbon 的算法类来实现这些功能。</p><p>除了控制 Ribbon 的路由，还需要将客户端带来的灰度信息一层层传递下去，可以将信息从 HTTP 请求头中带过去。</p><p>从图中我们可以看出 Discovery 对注册中心的支持做得非常好，支持了目前主流的注册中心。有Nacos、Eureka、Redis、Zookeeper。</p><p>对配置中心的支持也同样非常好，支持了 Nacos、Apollo、Redis。可以将灰度发布的规则放入配置中心，修改实时生效。</p><h1 id="discovery-灰度发布实现" tabindex="-1">Discovery 灰度发布实现 <a class="header-anchor" href="#discovery-灰度发布实现" aria-label="Permalink to &quot;Discovery 灰度发布实现&quot;">​</a></h1><p><img src="https://s0.lgstatic.com/i/image3/M01/54/41/CgpOIF3nXSaAB9bRAAE8rktrUyY037.png" alt=""></p><p>首先我们准备三个服务来作为灰度发布的演示，一个 Zuul 网关，一个 article 服务，一个 user 服务。调用流程是网关到 article 服务，article 服务中会调用 user 服务。默认运行中的服务是 V1 版本，当我们增加了新功能，需要发布 V2 版本时，需要对正式的用户不可见，只能让测试访问，等测试没问题后再对正式用户开放，然后停掉 V1 的版本。</p><p>然后，使用 Discovery 需要加入相关的 Maven 依赖，在网关中加入 Zuul、Eureka、Apollo 三个依赖，如果你不需要用配置中心也可以不用 Apollo 的依赖，如果你是其他的注册中心，也可以选择其他的依赖，Discovery 在这块支持得很好。</p><p>在 user 和 article 服务中，也需要加入对应的依赖，如果用了 Hystrix 的线程隔离，还需要加入 Discovery 的 Hystrix 模块依赖，主要是处理线程切换后 ThreadLocal 信息丢失的问题，这个我们在前面的课时中讲解过。</p><p>在实际工作中，线上机器资源是有限的，增加大量的机器会增加公司的成本。所以我们一般在部署新版本时不是重新部署一套，然后将流量切过去，而是将老的服务实例停掉，再替换成新版本的实例。</p><p>假设每个服务 2+ 节点以上，可以通过网关来做灰度发布，因为网关重启的几率小，即使重启仍有 Nginx 可以进行自动剔除。灰度发布的实现主要通过网关路由的内部服务，具体的步骤如下：</p><ol><li><p>首先将需要发布的服务从转发过程中移除，等流量剔除之后再发布。</p></li><li><p>流量剔除之后，直接重新发布这个服务，metadata 中的版本进行升级，默认还是请求老的服务，新的服务通过版本来支持测试请求。</p></li><li><p>测试完成之后，让新的版本接收正常流量，然后部署下一个节点，以此类推。</p></li></ol><p>我们基于 Discovery 来自定义灰度路由策略以满足上面的灰度发布需求。首先定义一个配置实体类，对应的是 Apollo 中的配置信息，我们支持版本和 IP 端口的方式来进行灰度。</p><p>然后通过实现 DiscoveryEnabledStrategy 来决定对应的 Server 是否能够被转发，逻辑很简单，首先判断是否带 n-d-version 这类的请求头，如果有就不往下执行了，以外部带入的为准。最后获取 server 的版本跟配置里的版本进行比较，如果当前 server 的版本在配置里面存在，则说明这个版本是灰度的版本，不能被转发，直接过滤掉。</p><p>IP 端口判断的方式也是一样的，这是在网关中的处理方式，在内部服务中也是一样的处理方式，我这边为了方便就将代码复制了一份过去，大家可以进行简化，抽出来共用。如果我们的 article-service 需要发布新的版本，在发布之前会将元数据中的版本进行升级，然后在配置中心指定这个版本为灰度的版本，这样重新发布后正常请求就不会请求到这个灰度的服务。</p><p>配置内容为：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">grayVersions = {&quot;discovery-article-service&quot;:[&quot;1.01&quot;]}。</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">grayVersions = {&quot;discovery-article-service&quot;:[&quot;1.01&quot;]}。</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p><img src="https://s0.lgstatic.com/i/image3/M01/54/42/CgpOIF3nXlyAMoy6AGFoiuAfQOc234.gif" alt=""></p><p>然后演示下效果，重新启动一个 article-service 的服务，版本为 1.01，然后访问对应的接口，可以看到正常的请求还是可以请求到之前的 article-service，新版本 1.01 由于在配置中心里指定成灰度的版本，所以正常请求是不能访问的，我们可以在请求头中增加 n-d-version 来访问这个灰度的版本，等这个版本没问题后，就将配置中心里的灰度内容去掉，这样就能被正常请求访问了，然后就可以继续发布下一个实例，通过这样的方式就实现了我们的灰度发布功能。</p><h1 id="discovery实现多版本调用隔离" tabindex="-1">Discovery实现多版本调用隔离 <a class="header-anchor" href="#discovery实现多版本调用隔离" aria-label="Permalink to &quot;Discovery实现多版本调用隔离&quot;">​</a></h1><p><img src="https://s0.lgstatic.com/i/image3/M01/54/41/Cgq2xl3nXSeAZMTOAAE2sCaIhPE668.png" alt=""></p><p>多版本隔离调用的使用场景比较多，我给大家介绍一种在工作中一定要会遇到的问题，在互联网公司里面，多个需求并行开发很常见，一个完整的需求需要独立上线，肯定是单独的代码分支。</p><p>在测试环境部署的时候，肯定是一个分支部署一个实例，你的分支是你的功能，我的分支是我的功能，分支之间独立，互不影响。</p><p>由于注册中心是同一个，当两个分支的实例都注册上去后，从网关或者服务中去请求对应接口时，就会基于 Ribbon 的算法来选择对应的实例发起请求，这样也就意味着，A 分支的测试人员，可能会访问 B 分支发布的实例，B 分支的测试人员也有可能会访问 A 分支发布的实例，这样就错乱了。</p><p>需要实现的效果也很简单，就是隔离。通过多版本调用的隔离就可以解决这个问题，两个分支，两个不同的版本，请求可以指定要访问哪个版本，这样就不会出现交叉调用的情况。</p><p>可以直接让对应的客户端在请求头中通过 n-d-version 来指定访问的版本，后端在网关中转发时，或在服务中通过 Feign 和 RestTemplate 调用时，都会根据 n-d-version 的信息来请求对应版本的服务。</p><h1 id="discovery-实现本地复用测试服务" tabindex="-1">Discovery 实现本地复用测试服务 <a class="header-anchor" href="#discovery-实现本地复用测试服务" aria-label="Permalink to &quot;Discovery 实现本地复用测试服务&quot;">​</a></h1><p>开发中会遇到这么一个情况，就是只需要修改一个服务，但是这个服务依赖了其他 3 个服务，导致开发人员本地也要启动那 3 个服务，还要启动一个 Eureka 注册中心。问题显而易见，在依赖过多的情况下，本地需要启动很多无需修改的服务。</p><h2 id="本地复用测试服务-eureka-zone" tabindex="-1">本地复用测试服务-Eureka Zone <a class="header-anchor" href="#本地复用测试服务-eureka-zone" aria-label="Permalink to &quot;本地复用测试服务-Eureka Zone&quot;">​</a></h2><p><img src="https://s0.lgstatic.com/i/image3/M01/54/41/CgpOIF3nXSeAcyxLAAFCuPpRQwE826.png" alt=""></p><p>在 Eureka 中有 region zone 的概念。</p><ul><li><strong>region</strong></li></ul><p>可以简单理解为地理上的分区，比如北京、上海等，没有具体大小的限制。根据项目具体的情况，可以自行合理划分 region。</p><ul><li><strong>zone</strong></li></ul><p>可以简单理解为 region 内的具体机房，比如说 region 划分为北京，然后北京有两个机房，就可以在此 region 之下划分出 zone1、zone2 两个 zone。</p><p>在调用的过程中会优先选择相同的 zone 发起调用，当找不到相同名称的 zone 时会选择其他的 zone 进行调用，我们可以利用这个特性来解决本地需要启动多个服务的问题。</p><p>测试环境中有所有的服务部署，需要将测试环境服务的 zone 改成同一个，这个可以在 Apollo 中指定。</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">eureka.instance.metadata-map.zone=test</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">eureka.instance.metadata-map.zone=test</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>本地开发时，将 Apollo 的环境改成本地开发模式。</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">env=Local</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">env=Local</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>然后再修改本地缓存的配置文件，将你需要修改的那个服务的 zone 改成你自己特有的，只要不跟测试环境一样就行。</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">eureka.instance.metadata-map.zone=local</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">eureka.instance.metadata-map.zone=local</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>如果你要修改 2 个服务，那就改 2 个，这样当你访问修改的服务 A 时，这个服务依赖了 B、C、D 三个服务，B 和 C 本地没有启动，D 服务也是需要修改，在本地启动。D 服务有相同的 zone 就会优先调用本地的 D 服务，B 和 C 找不到相同的 zone 就会选择其他的 zone 进行调用，也就是会调用到测试环境部署的 B 和 C 服务，这样一来就解决了本地部署多个服务的问题。</p><p>测试环境的调用会优先选择测试的 zone 进行调用，所以不会影响测试环境，前提是测试环境的服务都要启动着，不然会调用到开发人员的注册服务上。</p><h2 id="本地复用测试服务-版本指定" tabindex="-1">本地复用测试服务-版本指定 <a class="header-anchor" href="#本地复用测试服务-版本指定" aria-label="Permalink to &quot;本地复用测试服务-版本指定&quot;">​</a></h2><p><img src="https://s0.lgstatic.com/i/image3/M01/54/41/Cgq2xl3nXSeAIiOhAAE940NnPNc596.png" alt=""></p><p>同样的，使用 Discovery 也可以实现这个需求。使用 Discovery 可以在本地测试时通过版本来实现，通过在请求头中指定 n-d-version 的值来控制访问的服务。也就是本地修改的服务，版本需要设置成唯一的，不能跟测试环境冲突，然后不需要修改的服务直接依赖测试环境已有的即可，假如 A 服务是需要修改的，A 服务又依赖了 B 服务，本地不需要启动 B 服务，只需要指定 A 服务的版本为本地刚修改的版本，B 服务的版本为测试环境的版本即可实现服务复用效果。</p><h2 id="本地复用测试服务-ip端口指定" tabindex="-1">本地复用测试服务-IP端口指定 <a class="header-anchor" href="#本地复用测试服务-ip端口指定" aria-label="Permalink to &quot;本地复用测试服务-IP端口指定&quot;">​</a></h2><p><img src="https://s0.lgstatic.com/i/image3/M01/54/41/CgpOIF3nXSeAMhddAAGm0RFoGm4638.png" alt=""></p><p>除了通过版本来实现复用效果，通过 IP+端口的形式也可以，只需要将 n-d-version 改成 n-d-address，然后配置每个服务能够访问的 IP+端口的信息，就能控制这次调用使用哪些服务。</p><p>需要注意的是如果测试环境不在公司的内网里就会存在一个问题，当你本地需要修改服务 C，但是服务 C 是通过服务 B 来调用的，服务 B 没有改动，本地不想启动，这个时候来触发服务 C 的就是测试环境的服务 B，所以必须保证网络通畅，不然测试环境是无法访问到本机服务的。</p><p>好了，关于复用测试服务就讲到这里了，最后再稍微提一下还有一种新的方式来实现复用，这个方式是前几天刚增加的特性。</p><p><strong>环境隔离和路由</strong>。是基于元数据 Metadata 的 env 参数进行隔离，当调用端实例和提供端实例的元数据 Metadata 环境配置值相等才能调用。环境隔离下，调用端实例找不到符合条件的提供端实例，把流量路由到一个通用或者备份环境，有点类似 Eureka 中 Zone 的隔离方式。</p><h1 id="discovery核心源码分析" tabindex="-1">Discovery核心源码分析 <a class="header-anchor" href="#discovery核心源码分析" aria-label="Permalink to &quot;Discovery核心源码分析&quot;">​</a></h1><p>首先来看 Zuul 中如何根据 n-d-version 来选择对应服务实例版本。</p><p>discovery-plugin-strategy-starter-zuul.jar 是 Zuul 相关的代码，我们主要关注过滤器，请求信息的传递是在 AbstractZuulStrategyRouteFilter 中，里面的逻辑主要是将版本、地区等信息添加到请求头中，传递给后端服务。</p><p>真正控制路由转发的是在 discovery-plugin-strategy.jar 中，在 rule 包下是 Ribbon 的算法类，在 DiscoveryEnabledZoneAvoidancePredicate 类的 apply 方法中会对服务实例进行判断，如果返回 false 表示这个服务实例不能被使用，返回 true 表示可以被使用。</p><p>判断主要分为三种类型，一种是版本的判断，一种是区域的判断，一种是地址的判断，对比的信息需要从服务实例中获取，也就是注册中心的元数据中。</p><p>在前面的课时中也讲过，只要控制了 Ribbon，就可以实现很多扩展功能，相信你现在能理解这句话的含义了。</p><p>然后来看下后端服务中如何根据 n-d-version 来选择对应的服务实例版本，其实原理都一样，也是需要通过 Ribbon 的算法来进行控制，我们需要关注的就是如何获取到网关或者其他服务传递过来的请求信息。</p><p>FeignStrategyInterceptor 是 Feign 的拦截器，在里面可以将信息进一步传递给其他被调用的服务，RestTemplateStrategyInterceptor 是 RestTemplate 的拦截器，做的事情也是一样的。</p><p>DefaultCallableWrapper 是用来处理 Hystrix 线程池隔离 ThreadLocal 取值失效的问题，这个在前面的课时中有讲过，你有没有发现，当你学到一个知识点，会发现在很多地方都能使用。或者说你在学习一个开源框架时能够学到这个框架的实现原理，最后这些学到的原理也可以用在其他的场景中。</p><br>',87),i=[p];function t(n,l,c,d,u,g){return a(),s("div",null,i)}const b=e(o,[["render",t]]);export{v as __pageData,b as default};
