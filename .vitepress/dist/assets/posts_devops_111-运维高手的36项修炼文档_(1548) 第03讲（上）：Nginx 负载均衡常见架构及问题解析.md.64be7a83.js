import{_ as s,o as n,g as a,Q as p}from"./chunks/framework.f949202b.js";const h=JSON.parse('{"title":"课前学习提示","description":"","frontmatter":{},"headers":[],"relativePath":"posts/devops/111-运维高手的36项修炼文档/(1548) 第03讲（上）：Nginx 负载均衡常见架构及问题解析.md","filePath":"posts/devops/111-运维高手的36项修炼文档/(1548) 第03讲（上）：Nginx 负载均衡常见架构及问题解析.md","lastUpdated":null}'),e={name:"posts/devops/111-运维高手的36项修炼文档/(1548) 第03讲（上）：Nginx 负载均衡常见架构及问题解析.md"},l=p(`<p>在上一课时我们重点介绍了 Nginx 作为 HTTP 代理网关常见且基本的优化技巧。实际上 Nginx 除了承担代理网关角色外还会应用于 7 层应用上的负载均衡，本课时重点讲解 Nginx 的负载均衡应用架构，及最常见的问题。</p><h1 id="课前学习提示" tabindex="-1">课前学习提示 <a class="header-anchor" href="#课前学习提示" aria-label="Permalink to &quot;课前学习提示&quot;">​</a></h1><h2 id="学前提示" tabindex="-1"><strong>学前提示</strong> <a class="header-anchor" href="#学前提示" aria-label="Permalink to &quot;**学前提示**&quot;">​</a></h2><p>Nginx 作为负载均衡是基于代理模式的基础之上，所以在学习本课时前，你需要对 Nginx 的代理、负载均衡的基本原理及 Nginx 负载均衡配置有基础的了解。有了这个基础以后，学习本课时的内容便会得心应手。</p><h2 id="章节思维导图" tabindex="-1"><strong>章节思维导图</strong> <a class="header-anchor" href="#章节思维导图" aria-label="Permalink to &quot;**章节思维导图**&quot;">​</a></h2><p>这里我先画了一张思维导图，我们来一起看下本课计划讲解哪些内容。</p><br><p><img src="https://s0.lgstatic.com/i/image3/M01/68/66/Cgq2xl5OWo2ASqnDAAEXHWzwSlE436.png" alt=""></p><br><p>首先会来讲一讲 Nginx 作为负载均衡在整体服务架构和网站服务架构里所扮演的角色，其次重点介绍 Nginx 作为负载均衡时遇到的一些常见问题，比如客户端 IP 地址获取问题、域名携带问题 等等。</p><h1 id="nginx-负载均衡应用架构" tabindex="-1">Nginx 负载均衡应用架构 <a class="header-anchor" href="#nginx-负载均衡应用架构" aria-label="Permalink to &quot;Nginx 负载均衡应用架构&quot;">​</a></h1><p>关于 Nginx 负载均衡应用架构在企业应用中主要有两种类型。</p><h2 id="分层入口代理架构" tabindex="-1">分层入口代理架构 <a class="header-anchor" href="#分层入口代理架构" aria-label="Permalink to &quot;分层入口代理架构&quot;">​</a></h2><p><img src="https://s0.lgstatic.com/i/image3/M01/68/73/CgpOIF5OfKmARBsLAAJDi2DWALc170.png" alt=""></p><br><p>第一类是分层入口代理架构（属于相对传统架构），我们可以对整个后台网站服务系统架构做一个分层。大体可以分为用户请求入口层，以及为用户请求提供逻辑处理的服务层和为用户提供真正相关数据的数据层。</p><br><p>如图所示，我们可以发现入口层是最接近用户请求的，所以在这一层中，Nginx 扮演着重要的角色------入口网关，并承担 7 层负载均衡（LB）的功能。如图所示入口层的 Nginx 之前还有一套 LB，LB 层的主要功能是为了 保证 Nginx 本身的高可用、或承担 TCP/IP 负载均衡功能，所以这里整个入口层的负载均衡模式是一个 4 层 LB+7 层 LB（Nginx），这套架构中把与业务服务的相关功能则由 Nginx 来处理。</p><br><p>哪一些业务服务相关功能交给 Nginx 作合适呢？比如在入口层我们会放一些和用户相关的信息，也比如之前讲过的动静分离（及实现分离网站页面的静态元素和动态元素) ，我们知道静态元素没有必要下沉到数据层获取，可以直接通过 Nginx 实现动态和静态的分流并由 Nginx 直接处理。另外，用户的访问控制、反爬虫等规则也是在入口层的 Nginx 实现的。</p><br><p>服务层同样也需要 Nginx ， 来负载均衡实现上层请求应答上的高可用。</p><br><p>分层架构的最后一层是数据层，数据层中 Nginx 同样可以实现负载均衡，但数据层中通常使用的 Nginx 较少见，为什么呢？因为这一层更追求数据调用的效率，比如 Memcache、MySQL 等数据库调用更多是基于底层的协议请求，而非更上层的 HTTP 请求。</p><br><p>但如果如果追求 HTTP 的可靠性、和应用性，是可以借助 Nginx 的负载均衡实现的，如：可Redis 使用 Nginx 做反向代理，通过 Nginx 把前端发送的 HTTP 请求转换成 Redis 协议的请求方式去请求 Redis，这样就完成了 Redis 的反向代理。这种方式，企业可以很好控制Redis的监控、数据的一致性保障、及基于 Hash 算法稳定性保障。</p><br><p>总结一下，Nginx 在分层架构里扮演了一个 7 层应用层负载均衡角色。随着软件架构和系统架构是不断演进变化，我们发现企业开始采用 K8s、Docker 这种轻量化、虚拟化部署；还有很多企业更加倾向于微服务架构，支持 set 化等。在这样的架构下，传统的分层负载均衡模式，促使改进去支持服务注册和发现。这个就是Jeson想介绍的第二种Nginx负载均衡模式。</p><h2 id="服务注册发现代理架构" tabindex="-1">服务注册发现代理架构 <a class="header-anchor" href="#服务注册发现代理架构" aria-label="Permalink to &quot;服务注册发现代理架构&quot;">​</a></h2><p><img src="https://s0.lgstatic.com/i/image3/M01/68/66/Cgq2xl5OWquAOOSKAAKxOrFbX1w188.png" alt=""></p><br><p>如图所示，图中重点列出了 Nginx 在注册发现场景中扮演的角色。同样，我们可以看到整个流量还是通过 Nginx 来做入口网关的，但是重要的一点是 Nginx 需要支持动态的发现和注册后端服务。</p><br><p>注册是指后端的应用程序（如图中的 App1~App4）需要去往前端的中心存储节点里面注册它的应用服务，当注册上报后，Nginx 动态发现并动态生成发现的配置，然后对入口网关代理负载均衡进行分流调整，我们可以发现在基于 K8s 和 Docker 这种部署模式业务入口网关就应用了这种架构。</p><br><p>两种负载均衡应用架构就讲完了，我们会发现两种架构最大的区别是后面一种支持后端服务的注册与发现。</p><br><p>接下来我们回顾下 Nginx 负载均衡配置。</p><h2 id="常用配置" tabindex="-1">常用配置 <a class="header-anchor" href="#常用配置" aria-label="Permalink to &quot;常用配置&quot;">​</a></h2><p>首先，我们先回顾Nginx基础负载均衡配置。</p><br><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">http {</span></span>
<span class="line"><span style="color:#E1E4E8;">        …</span></span>
<span class="line"><span style="color:#E1E4E8;">        upstream app_servers {</span></span>
<span class="line"><span style="color:#E1E4E8;">                 server ip1:port1;</span></span>
<span class="line"><span style="color:#E1E4E8;">                 server ip2:port2;</span></span>
<span class="line"><span style="color:#E1E4E8;">                 server ip3:port3;</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">        server {</span></span>
<span class="line"><span style="color:#E1E4E8;">         …</span></span>
<span class="line"><span style="color:#E1E4E8;">              location / {</span></span>
<span class="line"><span style="color:#E1E4E8;">                      proxy_pass http://app_servers; </span></span>
<span class="line"><span style="color:#E1E4E8;">              }</span></span>
<span class="line"><span style="color:#E1E4E8;">        ….</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">http {</span></span>
<span class="line"><span style="color:#24292E;">        …</span></span>
<span class="line"><span style="color:#24292E;">        upstream app_servers {</span></span>
<span class="line"><span style="color:#24292E;">                 server ip1:port1;</span></span>
<span class="line"><span style="color:#24292E;">                 server ip2:port2;</span></span>
<span class="line"><span style="color:#24292E;">                 server ip3:port3;</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">        server {</span></span>
<span class="line"><span style="color:#24292E;">         …</span></span>
<span class="line"><span style="color:#24292E;">              location / {</span></span>
<span class="line"><span style="color:#24292E;">                      proxy_pass http://app_servers; </span></span>
<span class="line"><span style="color:#24292E;">              }</span></span>
<span class="line"><span style="color:#24292E;">        ….</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><br><p>在这里，将通过 Upstream 配置分发入口请求流量到了后台三个 IP 节点对应的端口服务。</p><br><p>这是一种常见的 Nginx 负载均衡配置，但是这样配置在实际企业应用时会发生一些问题，我们接下来就来讲解如何解决 Nginx 做负载均衡时的常见问题。</p>`,46),r=[l];function i(o,t,c,g,b,E){return n(),a("div",null,r)}const x=s(e,[["render",i]]);export{h as __pageData,x as default};
