import{_ as n,j as o,o as l,g as p,k as t,h as e,Q as s}from"./chunks/framework.a0d18f64.js";const F=JSON.parse('{"title":"第34讲：如何安装与配置Itio","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/云原生微服务架构实战精讲_文档/(1838) 第34讲：如何安装与配置 Itio.md","filePath":"posts/backEnd/云原生微服务架构实战精讲_文档/(1838) 第34讲：如何安装与配置 Itio.md","lastUpdated":1696682708000}'),i={name:"posts/backEnd/云原生微服务架构实战精讲_文档/(1838) 第34讲：如何安装与配置 Itio.md"},c=s(`<h1 id="第34讲-如何安装与配置itio" tabindex="-1">第34讲：如何安装与配置Itio <a class="header-anchor" href="#第34讲-如何安装与配置itio" aria-label="Permalink to &quot;第34讲：如何安装与配置Itio&quot;">​</a></h1><p>从本课时开始，我们将进入与服务网格相关的模块，并将示例应用部署到 Kubernetes 集群中，该模块将结合示例应用来具体介绍服务网格实现 Istio 的使用。在第 05 课时中已经对服务网格的基本概念进行了介绍，包括服务网格的意义、边车（Sidecar）模式和服务代理等。本课时将先回顾一下服务网格。</p><h3 id="服务网格的意义" tabindex="-1">服务网格的意义 <a class="header-anchor" href="#服务网格的意义" aria-label="Permalink to &quot;服务网格的意义&quot;">​</a></h3><p>对于习惯了开发单体应用的开发人员来说，在迁移到微服务架构的应用开发时，最大的挑战是微服务架构所带来的在开发、部署和运维上的复杂性。从单体应用迁移到多个微服务应用之后，开发团队要考虑的不仅仅是微服务之间的交互，还有统一的日志管理、服务之间的调用追踪、错误处理等。</p><p>不过微服务架构也带来了很多的优势。每个微服务都是独立运行的应用，可以自由选择实现的编程语言或平台，也可以有自己的独立存储。不管是 Java、Node.js 或是 Go，都可以在微服务开发中找到用武之地。这种灵活性对开发人员来说有很强的吸引力，这意味着可以使用最新的技术栈和拥有对产品的自主控制，对提升团队的技术热情和主观能动性非常有好处。</p><p>从开发人员的角度来说，他们一方面希望享受微服务架构带来的好处，另一方面又不希望过多地了解微服务架构本身带来的复杂性的实现细节。在早期微服务架构的实现中，底层的实现细节对代码实现并不是完全透明的。</p><p>比如，在 Netflix 的微服务架构技术栈中，对于其他微服务 API 的调用，需要封装在 Hystrix 的命令对象中，通过这样的方式才能实现服务调用的错误处理、结果缓存和断路器等功能。同样的，当进行服务发现时，也需要与 Eureka 进行交互。</p><p>Kubernetes 的出现，为微服务架构的部署和运行提供了良好的基础，容器化技术使得应用和支撑服务的部署变得简单。同时，Kubernetes 也提供了对服务发现、故障恢复和水平扩展等功能的支持。服务网格的出现则往前更进一步，以透明的方式处理服务之间的 API 调用，调用其他服务的 API 只需要使用标准的客户端发送 REST 或 gRPC 请求即可，并不需要额外的封装。与服务调用相关的功能由服务代理来完成。这意味着开发人员可以关注更少的底层细节，而把更多的精力花在业务逻辑的实现中，从而提高开发效率。</p><p>接下来我们就进入本课时的正题，为你详细讲解 Istio 的相关知识。</p><h3 id="istio-介绍" tabindex="-1">Istio 介绍 <a class="header-anchor" href="#istio-介绍" aria-label="Permalink to &quot;Istio 介绍&quot;">​</a></h3><p>目前已经有一些流行的服务网格实现，Istio 只是其中之一，其他的实现包括 Linkerd 和 Maesh 等。Istio 的优势在于背后有 Google 和 IBM 的支持，且功能强大，使用和配置也相对复杂。随着 1.5 版本把多个微服务整合成单一的应用之后，Istio 的复杂度降低了很多，不同规模的应用都可以使用 Istio。</p><h4 id="_1-核心功能" tabindex="-1">1.核心功能 <a class="header-anchor" href="#_1-核心功能" aria-label="Permalink to &quot;1.核心功能&quot;">​</a></h4><p>Istio 提供了 4 个与服务相关的核心功能，分别是连接（Connect）、安全（Secure）、控制（Control）和观察（Observe）。</p><ul><li><p><strong>连接功能</strong>指的是控制服务之间的流量和 API 调用。只需要简单的配置，就可以实现服务之间的超时处理、自动重试和断路器模式，还可以通过基于百分比的流量分离来实现 A/B 测试、红黑部署和金丝雀发布等。Istio 还提供了错误恢复功能，可以增强服务的健壮性。</p></li><li><p><strong>安全功能</strong>指的是自动保护服务的安全，支持服务之间的身份认证、授权管理和通信加密。Istio 提供了一个证书权威机构（Certificate Authority，CA）来管理密钥和证书。在身份认证方面，Istio 支持双向 TLS 认证，以及基于 JWT 的请求身份认证，并可以与 OpenID Connect 提供者进行集成。在授权管理方面，Istio 支持使用 Kubernetes 的自定义资源来配置授权策略。除此之外，Istio 的审计功能可以记录安全相关的历史操作。</p></li><li><p><strong>控制</strong>指的是通过策略来对服务进行配置。Istio 提供了一系列 Kubernetes 中的自定义资源定义来配置 Istio 的不同组件的行为。</p></li><li><p><strong>观察</strong>指的是服务运行时行为的可见性。Istio 收集的性能指标数据可以监控应用的性能。分布式追踪数据可以查看每个请求在服务之间的调用关系，从而更好地了解服务之间的依赖关系。Istio 可以在日志中记录每个请求的源和目标的元数据。</p></li></ul><h4 id="_2-组件" tabindex="-1">2.组件 <a class="header-anchor" href="#_2-组件" aria-label="Permalink to &quot;2.组件&quot;">​</a></h4><p>Istio 由很多不同的组件组成，如下表所示。</p><table><thead><tr><th><strong>名称</strong></th><th><strong>说明</strong></th></tr></thead><tbody><tr><td>base</td><td>基础组件</td></tr><tr><td>pilot</td><td>服务发现和流量控制</td></tr><tr><td>proxy</td><td>服务代理</td></tr><tr><td>sidecarInjector</td><td>服务代理的边车容器的自动注入</td></tr><tr><td>telemetry</td><td>遥测数据收集</td></tr><tr><td>policy</td><td>策略管理</td></tr><tr><td>citadel</td><td>密钥和证书管理</td></tr><tr><td>nodeagent</td><td>安全相关的节点代理</td></tr><tr><td>galley</td><td>配置管理</td></tr><tr><td>ingressGateway</td><td>入口网关</td></tr><tr><td>egressGateway</td><td>出口网关</td></tr><tr><td>cni</td><td>容器网络接口（Container Network Interface，CNI）插件</td></tr></tbody></table><p>除了这些基本的组件之外，Istio 还提供了一些附加组件，如下所示。</p><table><thead><tr><th>组件</th><th>说明</th></tr></thead><tbody><tr><td>kiali</td><td>仪表盘和用户界面</td></tr><tr><td>grafana</td><td>Grafana 集成</td></tr><tr><td>tracing</td><td>调用追踪</td></tr><tr><td>prometheus</td><td>性能指标数据收集</td></tr></tbody></table><p>在 1.5 版本之前，Istio 控制平面的组件以独立的微服务方式来打包和部署，上面表格中的 pilot、galley、citadel 组件都是独立运行的。这种部署模式造成了 Istio 运维的一些问题，使得多个组件难以维护和管理。从 1.5 版本开始，Istio 改变了之前的打包和部署方式，控制平面的组件被统一成单一的应用，也就是 istiod。只需要一个 Pod 就可以运行 Istio 的全部功能。</p><p>学习过 Istio 的基本概念后，我们就可以开始了解它的组件，并且操作它了。</p><h3 id="istio-安装" tabindex="-1">Istio 安装 <a class="header-anchor" href="#istio-安装" aria-label="Permalink to &quot;Istio 安装&quot;">​</a></h3><p>在本地开发时，可以使用 Minikube 或 Docker Desktop，也可以使用云平台上的 Kubernetes 集群。前提要求是可以使用 kubectl 与 Kubernetes 集群交互。</p><p>在 1.4 版本之前，Istio 使用 Helm 来安装。1.4 版本引入了命令行工具 istioctl 来进行安装和配置。在 Linux 和 MacOS 上，可以使用下面的命令安装 istioctl。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">curl </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">L https</span><span style="color:#F97583;">:</span><span style="color:#6A737D;">//istio.io/downloadIstio | sh -</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">curl </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">L https</span><span style="color:#D73A49;">:</span><span style="color:#6A737D;">//istio.io/downloadIstio | sh -</span></span></code></pre></div><p>当上述命令执行完成之后，会在当前目录创建 istio-1.6.4 文件夹，其中包含了 istioctl 工具、概要配置文件和示例应用。在 Windows 上可以直接从 GitHub 上下载 Istio 的<a href="https://github.com/istio/istio/releases/tag/1.6.4" target="_blank" rel="noreferrer">发布版本</a>。</p><h4 id="_1-配置概要文件" tabindex="-1">1.配置概要文件 <a class="header-anchor" href="#_1-配置概要文件" aria-label="Permalink to &quot;1.配置概要文件&quot;">​</a></h4><p>Istio 包含了很多组件，每个组件都有自己的配置项。为了简化安装，Istio 提供了一些预置的安装配置概要文件，作为安装配置的基础。下面的命令可以列出全部概要文件的名称。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">istioctl profile list</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">istioctl profile list</span></span></code></pre></div><p>不同的概要文件的区别在于默认启用的组件并不相同，如下表所示。</p><table><thead><tr><th><strong>概要文件名称</strong></th><th><strong>启用的组件</strong></th></tr></thead><tbody><tr><td>default</td><td>istiod、ingressGateway、prometheus</td></tr><tr><td>demo</td><td>istiod、ingressGateway、egressGateway、prometheus、grafana、tracing、kaili</td></tr><tr><td>minimal</td><td>istiod</td></tr><tr><td>remote</td><td>ingressGateway</td></tr><tr><td>empty</td><td>无</td></tr><tr><td>preview</td><td>处于试验阶段的预览组件</td></tr></tbody></table><p>下面的命令使用默认的概要文件来安装 Istio，默认安装在名称空间 istio-system 中。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">istioctl install</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">istioctl install</span></span></code></pre></div><p>而下面的命令则使用概要文件 minimal 来安装。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">istioctl install </span><span style="color:#F97583;">--</span><span style="color:#E1E4E8;">set profile</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">minimal</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">istioctl install </span><span style="color:#D73A49;">--</span><span style="color:#24292E;">set profile</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">minimal</span></span></code></pre></div><p>可以使用下面的命令来查看每个概要文件的实际内容。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">istioctl profile dump minimal</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">istioctl profile dump minimal</span></span></code></pre></div><h4 id="_2-修改配置" tabindex="-1">2.修改配置 <a class="header-anchor" href="#_2-修改配置" aria-label="Permalink to &quot;2.修改配置&quot;">​</a></h4><p>在安装 Istio 之后，可以使用 istioctl 来修改配置，只需要使用 &quot;--set&quot; 参数来提供配置文件中不同属性的值即可。比如，下面代码中的命令通过设置 enabled 属性的值，启用了 Istio 的附加组件 Kiali 和 Grafana。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">istioctl install </span><span style="color:#F97583;">--</span><span style="color:#E1E4E8;">set addonComponents.kiali.enabled</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">--</span><span style="color:#E1E4E8;">set addonComponents.grafana.enabled</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">true</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">istioctl install </span><span style="color:#D73A49;">--</span><span style="color:#24292E;">set addonComponents.kiali.enabled</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">true</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">--</span><span style="color:#24292E;">set addonComponents.grafana.enabled</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">true</span></span></code></pre></div><p>如果要修改的配置项很多，通过 &quot;--set&quot; 的方式来传递会变得难以管理，使用 Istio 的自定义资源是更好的做法。下面是进行同样配置的 YAML 文件的内容。</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#85E89D;">apiVersion</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">install.istio.io/v1alpha1</span></span>
<span class="line"><span style="color:#85E89D;">kind</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">IstioOperator</span></span>
<span class="line"><span style="color:#85E89D;">spec</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">addonComponents</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">grafana</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">enabled</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">kiali</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">enabled</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">true</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#22863A;">apiVersion</span><span style="color:#24292E;">: </span><span style="color:#032F62;">install.istio.io/v1alpha1</span></span>
<span class="line"><span style="color:#22863A;">kind</span><span style="color:#24292E;">: </span><span style="color:#032F62;">IstioOperator</span></span>
<span class="line"><span style="color:#22863A;">spec</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">addonComponents</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">grafana</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">enabled</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">kiali</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">enabled</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">true</span></span></code></pre></div><p>通过下面的命令来应用 YAML 文件中的配置。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">istioctl install </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">f custom</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">config.yml</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">istioctl install </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">f custom</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">config.yml</span></span></code></pre></div><h4 id="_3-自定义资源定义" tabindex="-1">3.自定义资源定义 <a class="header-anchor" href="#_3-自定义资源定义" aria-label="Permalink to &quot;3.自定义资源定义&quot;">​</a></h4><p>Istio 使用 Kubernetes 上的操作员（Operator）模式来实现。在安装之后会生成一系列的 Kubernetes 自定义资源定义。对 Istio 的配置，实际上是创建和更新 Istio 的自定义资源。</p><p>通过 kubectl get crd 命令可以查看全部的自定义资源定义，如下面的代码所示。所有以 istio.io 结尾的自定义资源定义都来自 Istio。</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#9ECBFF;">adapters.config.istio.io</span><span style="color:#E1E4E8;">                   </span></span>
<span class="line"><span style="color:#9ECBFF;">attributemanifests.config.istio.io</span><span style="color:#E1E4E8;">         </span></span>
<span class="line"><span style="color:#9ECBFF;">authorizationpolicies.security.istio.io</span><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#9ECBFF;">clusterrbacconfigs.rbac.istio.io</span><span style="color:#E1E4E8;">           </span></span>
<span class="line"><span style="color:#9ECBFF;">destinationrules.networking.istio.io</span><span style="color:#E1E4E8;">       </span></span>
<span class="line"><span style="color:#9ECBFF;">envoyfilters.networking.istio.io</span><span style="color:#E1E4E8;">           </span></span>
<span class="line"><span style="color:#9ECBFF;">gateways.networking.istio.io</span><span style="color:#E1E4E8;">               </span></span>
<span class="line"><span style="color:#9ECBFF;">handlers.config.istio.io</span><span style="color:#E1E4E8;">                   </span></span>
<span class="line"><span style="color:#9ECBFF;">httpapispecbindings.config.istio.io</span><span style="color:#E1E4E8;">        </span></span>
<span class="line"><span style="color:#9ECBFF;">httpapispecs.config.istio.io</span><span style="color:#E1E4E8;">               </span></span>
<span class="line"><span style="color:#9ECBFF;">instances.config.istio.io</span><span style="color:#E1E4E8;">                  </span></span>
<span class="line"><span style="color:#9ECBFF;">istiooperators.install.istio.io</span><span style="color:#E1E4E8;">            </span></span>
<span class="line"><span style="color:#9ECBFF;">peerauthentications.security.istio.io</span><span style="color:#E1E4E8;">      </span></span>
<span class="line"><span style="color:#9ECBFF;">quotaspecbindings.config.istio.io</span><span style="color:#E1E4E8;">          </span></span>
<span class="line"><span style="color:#9ECBFF;">quotaspecs.config.istio.io</span><span style="color:#E1E4E8;">                 </span></span>
<span class="line"><span style="color:#9ECBFF;">rbacconfigs.rbac.istio.io</span><span style="color:#E1E4E8;">                  </span></span>
<span class="line"><span style="color:#9ECBFF;">requestauthentications.security.istio.io</span><span style="color:#E1E4E8;">   </span></span>
<span class="line"><span style="color:#9ECBFF;">rules.config.istio.io</span><span style="color:#E1E4E8;">                      </span></span>
<span class="line"><span style="color:#9ECBFF;">serviceentries.networking.istio.io</span><span style="color:#E1E4E8;">         </span></span>
<span class="line"><span style="color:#9ECBFF;">servicerolebindings.rbac.istio.io</span><span style="color:#E1E4E8;">          </span></span>
<span class="line"><span style="color:#9ECBFF;">serviceroles.rbac.istio.io</span><span style="color:#E1E4E8;">                 </span></span>
<span class="line"><span style="color:#9ECBFF;">sidecars.networking.istio.io</span><span style="color:#E1E4E8;">               </span></span>
<span class="line"><span style="color:#9ECBFF;">templates.config.istio.io</span><span style="color:#E1E4E8;">                  </span></span>
<span class="line"><span style="color:#9ECBFF;">virtualservices.networking.istio.io</span><span style="color:#E1E4E8;">        </span></span>
<span class="line"><span style="color:#9ECBFF;">workloadentries.networking.istio.io</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#032F62;">adapters.config.istio.io</span><span style="color:#24292E;">                   </span></span>
<span class="line"><span style="color:#032F62;">attributemanifests.config.istio.io</span><span style="color:#24292E;">         </span></span>
<span class="line"><span style="color:#032F62;">authorizationpolicies.security.istio.io</span><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#032F62;">clusterrbacconfigs.rbac.istio.io</span><span style="color:#24292E;">           </span></span>
<span class="line"><span style="color:#032F62;">destinationrules.networking.istio.io</span><span style="color:#24292E;">       </span></span>
<span class="line"><span style="color:#032F62;">envoyfilters.networking.istio.io</span><span style="color:#24292E;">           </span></span>
<span class="line"><span style="color:#032F62;">gateways.networking.istio.io</span><span style="color:#24292E;">               </span></span>
<span class="line"><span style="color:#032F62;">handlers.config.istio.io</span><span style="color:#24292E;">                   </span></span>
<span class="line"><span style="color:#032F62;">httpapispecbindings.config.istio.io</span><span style="color:#24292E;">        </span></span>
<span class="line"><span style="color:#032F62;">httpapispecs.config.istio.io</span><span style="color:#24292E;">               </span></span>
<span class="line"><span style="color:#032F62;">instances.config.istio.io</span><span style="color:#24292E;">                  </span></span>
<span class="line"><span style="color:#032F62;">istiooperators.install.istio.io</span><span style="color:#24292E;">            </span></span>
<span class="line"><span style="color:#032F62;">peerauthentications.security.istio.io</span><span style="color:#24292E;">      </span></span>
<span class="line"><span style="color:#032F62;">quotaspecbindings.config.istio.io</span><span style="color:#24292E;">          </span></span>
<span class="line"><span style="color:#032F62;">quotaspecs.config.istio.io</span><span style="color:#24292E;">                 </span></span>
<span class="line"><span style="color:#032F62;">rbacconfigs.rbac.istio.io</span><span style="color:#24292E;">                  </span></span>
<span class="line"><span style="color:#032F62;">requestauthentications.security.istio.io</span><span style="color:#24292E;">   </span></span>
<span class="line"><span style="color:#032F62;">rules.config.istio.io</span><span style="color:#24292E;">                      </span></span>
<span class="line"><span style="color:#032F62;">serviceentries.networking.istio.io</span><span style="color:#24292E;">         </span></span>
<span class="line"><span style="color:#032F62;">servicerolebindings.rbac.istio.io</span><span style="color:#24292E;">          </span></span>
<span class="line"><span style="color:#032F62;">serviceroles.rbac.istio.io</span><span style="color:#24292E;">                 </span></span>
<span class="line"><span style="color:#032F62;">sidecars.networking.istio.io</span><span style="color:#24292E;">               </span></span>
<span class="line"><span style="color:#032F62;">templates.config.istio.io</span><span style="color:#24292E;">                  </span></span>
<span class="line"><span style="color:#032F62;">virtualservices.networking.istio.io</span><span style="color:#24292E;">        </span></span>
<span class="line"><span style="color:#032F62;">workloadentries.networking.istio.io</span></span></code></pre></div><p>与 Istio 的安装和配置相关的是名为 istiooperators.install.istio.io 的自定义资源定义。从本质上来说，配置概要文件是 Istio 提供的自定义资源类型 IstioOperator 的资源定义。在安装之后，可以在 Kubernetes 中看到名为 installed-state 的 IstioOperator 类型的资源，使用下面的命令来查看。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">kubectl get istiooperator </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">n istio</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">system</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">kubectl get istiooperator </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">n istio</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">system</span></span></code></pre></div><h4 id="_4-kubernetes-资源清单" tabindex="-1">4.Kubernetes 资源清单 <a class="header-anchor" href="#_4-kubernetes-资源清单" aria-label="Permalink to &quot;4.Kubernetes 资源清单&quot;">​</a></h4><p>在实际的安装中，IstioOperator 的资源定义会被转换成 Kubernetes 中的不同资源。比如，当启用了 Grafana 组件之后，Istio 会创建 Grafana 对应的 Kubernetes 部署。通过下面的命令可以查看由 istioctl 产生的 Kubernetes 的资源清单。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">istioctl manifest generate </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">f custom</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">config.yml </span><span style="color:#6A737D;">// 从配置文件中生成</span></span>
<span class="line"><span style="color:#E1E4E8;">istioctl manifest generate </span><span style="color:#F97583;">--</span><span style="color:#E1E4E8;">set profile</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">demo </span><span style="color:#6A737D;">// 从概要文件中生成</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">istioctl manifest generate </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">f custom</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">config.yml </span><span style="color:#6A737D;">// 从配置文件中生成</span></span>
<span class="line"><span style="color:#24292E;">istioctl manifest generate </span><span style="color:#D73A49;">--</span><span style="color:#24292E;">set profile</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">demo </span><span style="color:#6A737D;">// 从概要文件中生成</span></span></code></pre></div><p>在每次改变 Istio 的部署之后，可以保存与该部署相对应的资源清单，istioctl 可以比较不同资源清单之间的差异，从而追踪不同安装之间的变化。</p><p>在下面的代码中，对于不同版本的配置文件，生成并保存了对应的资源清单。通过 istioctl manifest diff 命令可以进行比较。</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark has-diff vp-code-dark"><code><span class="line"><span style="color:#9ECBFF;">istioctl manifest generate -f custom-config-v1.yml &gt; istio-v1.yml</span></span>
<span class="line"><span style="color:#9ECBFF;">istioctl manifest generate -f custom-config-v2.yml &gt; istio-v2.yml</span></span>
<span class="line"><span style="color:#9ECBFF;">istioctl manifest diff istio-v1.yml istio-v2.yml</span></span></code></pre><pre class="shiki github-light has-diff vp-code-light"><code><span class="line"><span style="color:#032F62;">istioctl manifest generate -f custom-config-v1.yml &gt; istio-v1.yml</span></span>
<span class="line"><span style="color:#032F62;">istioctl manifest generate -f custom-config-v2.yml &gt; istio-v2.yml</span></span>
<span class="line"><span style="color:#032F62;">istioctl manifest diff istio-v1.yml istio-v2.yml</span></span></code></pre></div><p>那么，在使用 Istio 之前，我们还需要了解什么呢？</p><h3 id="注入边车容器" tabindex="-1">注入边车容器 <a class="header-anchor" href="#注入边车容器" aria-label="Permalink to &quot;注入边车容器&quot;">​</a></h3><p>Istio 有自己的服务代理实现 <a href="https://github.com/istio/proxy" target="_blank" rel="noreferrer">istio-proxy</a>，在 Envoy 的基础上增加了一些功能。为了使用 Istio 提供的功能，Pod 需要以边车容器的形式来运行 Istio 的服务代理。Istio 支持两种不同的方式在 Pod 中注入边车的容器，分别是自动注入和手动注入。</p><p>自动注入的方式并不要求对已有的 Kubernetes 部署进行修改，而是在 Pod 创建时自动进行修改。只需要在名称空间上添加 istio-injection=enabled 标签，那么该名称空间上所创建的 Pod 都会自动注入服务代理的边车容器。</p><p>下面的代码对名称空间 happyride 启用了自动注入。</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#9ECBFF;">kubectl label namespace happyride istio-injection=enabled</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#032F62;">kubectl label namespace happyride istio-injection=enabled</span></span></code></pre></div><p>由于自动注入只在 Pod 创建时生效，在启用了自动注入之后，名称空间中已经运行的 Pod 需要删除并重新创建来应用修改。</p><p>在名称空间已经启用了自动注入的情况下，仍然可以在 Kubernetes 部署中使用注解 sidecar.istio.io/inject 来改变注入行为。这个注解的值可以是 true 或 false。</p><p>在下面代码中的 Kubernetes 部署中，通过使用这个注解，禁用了边车容器的注入。</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#85E89D;">apiVersion</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">apps/v1</span></span>
<span class="line"><span style="color:#85E89D;">kind</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">Deployment</span></span>
<span class="line"><span style="color:#85E89D;">metadata</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">address</span></span>
<span class="line"><span style="color:#85E89D;">spec</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">template</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">metadata</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">annotations</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">sidecar.istio.io/inject</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;false&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#22863A;">apiVersion</span><span style="color:#24292E;">: </span><span style="color:#032F62;">apps/v1</span></span>
<span class="line"><span style="color:#22863A;">kind</span><span style="color:#24292E;">: </span><span style="color:#032F62;">Deployment</span></span>
<span class="line"><span style="color:#22863A;">metadata</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">address</span></span>
<span class="line"><span style="color:#22863A;">spec</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">template</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">metadata</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">annotations</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">sidecar.istio.io/inject</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;false&quot;</span></span></code></pre></div><p>如果不希望使用自动注入，可以对单个 Kubernetes 部署启用注入功能。对于一个部署文件，可以通过下面的命令来产生启用注入之后新的部署文件。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">istioctl kube</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">inject </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">f app.yml</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">istioctl kube</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">inject </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">f app.yml</span></span></code></pre></div><p>生成的新的部署文件可以用 kubectl 来应用。下面的命令在更新部署的声明之后直接应用该部署。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">istioctl kube</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">inject </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">f app.yml </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> kubectl apply </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">f </span><span style="color:#F97583;">-</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">istioctl kube</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">inject </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">f app.yml </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> kubectl apply </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">f </span><span style="color:#D73A49;">-</span></span></code></pre></div><p>在注入边车容器之前，地址管理服务的 Pod 中只包含一个容器。下面的代码显示了 Pod 的状态。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">kubectl get pod </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">l app.kubernetes.io</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">instance</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">address</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">service</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">kubectl get pod </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">l app.kubernetes.io</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">instance</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">address</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">service</span></span></code></pre></div><p>上述命令的执行结果如下所示，其中 1/1 表示只有一个容器。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">NAME                              READY   STATUS    RESTARTS   AGE</span></span>
<span class="line"><span style="color:#E1E4E8;">address</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">service</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">5ffbd7cb4</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">ksng4   </span><span style="color:#79B8FF;">1</span><span style="color:#F97583;">/</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">     Running   </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">          51m</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">NAME                              READY   STATUS    RESTARTS   AGE</span></span>
<span class="line"><span style="color:#24292E;">address</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">service</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">5ffbd7cb4</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">ksng4   </span><span style="color:#005CC5;">1</span><span style="color:#D73A49;">/</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">     Running   </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">          51m</span></span></code></pre></div><p>当注入了 Istio 的边车代理之后，同样命令的执行结果如下所示，其中的 2/2 表示有两个容器，新增的是服务代理的容器，名称为 istio-proxy。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">NAME                              READY   STATUS    RESTARTS   AGE</span></span>
<span class="line"><span style="color:#E1E4E8;">address</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">service</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">5ffbd7cb4</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">nkbnv   </span><span style="color:#79B8FF;">2</span><span style="color:#F97583;">/</span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">     Running   </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">          4m41s</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">NAME                              READY   STATUS    RESTARTS   AGE</span></span>
<span class="line"><span style="color:#24292E;">address</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">service</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">5ffbd7cb4</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">nkbnv   </span><span style="color:#005CC5;">2</span><span style="color:#D73A49;">/</span><span style="color:#005CC5;">2</span><span style="color:#24292E;">     Running   </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">          4m41s</span></span></code></pre></div><p>通过查看 Kubernetes 的部署，可以查看边车注入之后的 Pod 的声明。除了服务代理的容器之外，还有一个名为 istio-init 的初始化容器，该容器的作用是修改 Pod 中网络的 iptables 来启用服务代理。通过 iptables 的设置，发送到服务端口 8080 的数据会被转发到服务代理的 15001 端口。</p><p>边车注入的相关配置保存在 Kubernetes 中的配置表 istio-sidecar-injector 中。通过修改该配置表中的内容，可以对注入的行为进行更细粒度的控制。比如，通过修改属性 neverInjectSelector 的值，可以根据已有的标签来禁用注入行为。</p><p>概念和安装要点都讲完了，下面我们来看一个应用案例吧。</p><h3 id="示例应用" tabindex="-1">示例应用 <a class="header-anchor" href="#示例应用" aria-label="Permalink to &quot;示例应用&quot;">​</a></h3><p>由于对示例应用所部署的名称空间启用了 Istio 的边车容器的自动注入，示例应用中的不同服务都会自动添加服务代理。当示例应用部署在 Kubernetes 上之后，Istio 的服务代理及相关功能会自动生效。下图中的 Kaili 界面展示了乘客界面的 GraphQL API 服务、乘客管理服务和地址管理服务之间的依赖关系。这些信息由 Istio 的服务代理自动进行收集，并不需要对应用本身进行修改。</p>`,81),r=s('<p>通过下面的命令可以访问 Kiali 的界面。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">istioctl dashboard kiali</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">istioctl dashboard kiali</span></span></code></pre></div><p>在下面的课时中，将会对 Istio 所提供的功能进行具体的讲解。</p><h3 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h3><p>服务网格技术可以简化微服务架构应用的开发和运维，Istio 是目前流行的服务网格技术的实现之一。通过本课时的学习，你可以了解到服务网格技术的意义，对 Istio 有基本的了解，并掌握如何安装和配置 Istio 的不同组件。</p><p>对于 Istio 你还有什么想要了解的？欢迎随时留言讨论。</p>',6);function d(y,E,h,g,u,b){const a=o("Image");return l(),p("div",null,[c,t(a,{alt:"kaili.png",src:"https://s0.lgstatic.com/i/image/M00/30/02/CgqCHl8IKP2AawFqAAHOP8AB5dg709.png"}),e(),r])}const k=n(i,[["render",d]]);export{F as __pageData,k as default};
