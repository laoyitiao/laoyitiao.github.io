import{_ as s,o as n,g as p,Q as a}from"./chunks/framework.f949202b.js";const g=JSON.parse('{"title":"知识回顾 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/Node.js 应用开发实战_文档/(6797) 15  理论先行：高并发设计必须学的知识点有哪些？.md","filePath":"posts/frontEnd/Node.js 应用开发实战_文档/(6797) 15  理论先行：高并发设计必须学的知识点有哪些？.md","lastUpdated":null}'),l={name:"posts/frontEnd/Node.js 应用开发实战_文档/(6797) 15  理论先行：高并发设计必须学的知识点有哪些？.md"},o=a(`<p>前面几讲我们学习的性能相关的知识点，都是基于单个接口或者单个服务，从这一讲开始，我们将从系统层面设计高并发的系统，所以掌握单个接口技术性能相关的知识远远不够，你还要拓展更多的知识点，比如服务器内核配置、单机单服务部署和多机多服务部署、多机器负载均衡策略以及如何做并行压测等。</p><p>那么今天，我就先带你回顾一下前面第 1、6、7、8 和 9 讲的设计要点，然后在此基础上，带你学习一些需要进一步实践的相关知识。</p><h3 id="知识回顾" tabindex="-1">知识回顾 <a class="header-anchor" href="#知识回顾" aria-label="Permalink to &quot;知识回顾&quot;">​</a></h3><p>对于单个服务或者单个接口，我们学习了在 Node.js 中要着重注意的 5 个高性能点。</p><ol><li><p>主线程避阻塞，特别是一些复杂 CPU 密集计算型，最好的方式是交由其他进程处理，减少当前服务进程的阻塞；</p></li><li><p>多进程 cluster 模式的应用，充分利用多核服务器，能够在单台机器启用多个进程进行负载均衡，提升服务的稳定性；</p></li><li><p>在 I/O 方面要注重缓存的应用，本地缓存优先、其次共享内存、最后再是数据库（能用本地缓存的尽量用，不能用本地缓存的考虑共享内存，如果共享内存也不行，那么就需要使用数据库，而数据库可以优先考虑 MongoDB 内存查询效率更高的数据库，最后再考虑 MySQL，如果遇到必须查询或者写 MySQL 时，可以用延迟队列方式）；</p></li><li><p>过载保护策略，提升服务的稳定性，在服务过载时，保住部分用户的请求链路，以免影响所有用户；</p></li><li><p>工具自动化，单接口单服务性能保证，在上线前至少保证代码没有性能异常问题。</p></li></ol><p>以上是我们之前学习的一部分知识，其中会涉及应用细节，比如在缓存方面我们不仅仅要考虑缓存数据，还应该考虑存储过期的问题；又比如过载保护，什么样的过载参数适合我们当前服务，这些都需要你进行实践应用，去沉淀和总结。</p><h3 id="高并发知识" tabindex="-1">高并发知识 <a class="header-anchor" href="#高并发知识" aria-label="Permalink to &quot;高并发知识&quot;">​</a></h3><p>除了上述知识点，我认为你还需要掌握以下 5 个关键的知识点：</p><ol><li><p>微服务拆分、独立系统、可扩展、可分流；</p></li><li><p>机器内核网络配置；</p></li><li><p>单机单服务和单机多服务；</p></li><li><p>多机器部署负载均衡；</p></li><li><p>并行压测。</p></li></ol><p>接下来我带你学习每个技术点的核心部分。</p><h4 id="微服务拆分" tabindex="-1">微服务拆分 <a class="header-anchor" href="#微服务拆分" aria-label="Permalink to &quot;微服务拆分&quot;">​</a></h4><p>微服务拆分要分阶段来进行，在项目初期，微服务拆分建议在项目中去进行，其核心是 Controller 、 Model 以及 Service 的代码按项目区分，比如可以按照下面这种方式。</p><p><img src="https://s0.lgstatic.com/i/image6/M01/39/F2/Cgp9HWB9TpyAJjg1AABwcxUmgzs211.png" alt="Drawing 0.png"><br> 图 1 项目拆分方式</p><p>在项目初期，流量并发并不高，该方式比较好维护，但随着项目流量以及功能越来越多，就应该考虑微服务拆分。主要是按照业务功能进行拆分（这里你要注意，基础服务模块在 Node.js 中最好不要拆分为服务，而应该拆分为模块，模块调用的方式肯定比网路性能更高）。</p><p>在业务功能较复杂时，拆分出独立的项目有这样几个好处：</p><ol><li><p>便于扩展和后期维护；</p></li><li><p>能够独立部署，针对流量不同的业务，独立安排部署；</p></li><li><p>功能解藕、服务安全、减少相互影响，避免一个业务承载压力过大，导致所有服务异常；</p></li><li><p>多人协作开发模式清晰，可以按照功能模块进行团队人力划分，这样既清晰又便于团队合作管理；</p></li></ol><p>既然有这些优点，那么我们应该如何去做微服务拆分呢？</p><p>最简单的方式，就是将图 1 中的模块按照文件模块进行拆分，其他保持不变。假设 user 模块流量较大，那么我们就需要单独拆分这个模块到一个项目，其他的部分我们复制一份。</p><p>上面这种方式固然是比较简单的，但是问题来了，我们很多基础模块都复制了一份，以后怎么去维护，项目越多发现维护成本会越来越高，那么有没有更好的方式来处理呢？</p><p>我们需要将通用的部分进行整合，然后不同的部分进行拆分，比如上面的项目结构，可以拆分出这样的结构。</p><p><img src="https://s0.lgstatic.com/i/image6/M01/39/F2/Cgp9HWB9TqSALKcMAACWOU_LikA525.png" alt="Drawing 1.png"><br> 图 2 拆分方式</p><p>图 2 中 common 为我们公共部分，main 为流量较小项目，user 则为一个独立的比较大流量的模块，这样就可以做到单独拆分并且公用。现网发布时，如果发布的是 user 服务，则只发布 common 和 user，如果发布 main 服务，则只发布 common 和 main。这样就可以做到既复用又独立的方式。</p><p>当然微服务拆分也会让开发者的开发模式更为复杂，团队协作沟通成本更高。</p><h4 id="机器内核网络配置" tabindex="-1">机器内核网络配置 <a class="header-anchor" href="#机器内核网络配置" aria-label="Permalink to &quot;机器内核网络配置&quot;">​</a></h4><p>微服务拆分是基于一种框架的解决方案，能降低耦合提升单个服务的处理能力，但不能实质性的提升整体服务的并发处理能力，而服务器内核的网络配置却在一定程度上可以提升并发处理能力。关于机器内核网络配置，这里会涉及几个比较关键的内核配置（请注意，一般情况下请勿修改内核配置，要修改也请运维比较专业的人员进行配置）。</p><p>我们来看下调优 TCP 相关的一些参数。具体配置在 /etc/sysctl.conf 文件中，或者也可以创建新配置文件，比如 /etc/sysctl.d/99-tuning.conf ，然后运行sysctl -p，让内核装载这个配置。</p><div class="language-haskell vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">haskell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">net</span><span style="color:#F97583;">.</span><span style="color:#E1E4E8;">ipv4</span><span style="color:#F97583;">.</span><span style="color:#E1E4E8;">ip_local_port_range</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">&#39;1024 65000&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">net</span><span style="color:#F97583;">.</span><span style="color:#E1E4E8;">ipv4</span><span style="color:#F97583;">.</span><span style="color:#E1E4E8;">tcp_tw_reuse</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&#39;1&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">net</span><span style="color:#F97583;">.</span><span style="color:#E1E4E8;">ipv4</span><span style="color:#F97583;">.</span><span style="color:#E1E4E8;">tcp_fin_timeout</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">&#39;15&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">net</span><span style="color:#F97583;">.</span><span style="color:#E1E4E8;">core</span><span style="color:#F97583;">.</span><span style="color:#E1E4E8;">netdev_max_backlog</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">&#39;4096&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">net</span><span style="color:#F97583;">.</span><span style="color:#E1E4E8;">core</span><span style="color:#F97583;">.</span><span style="color:#E1E4E8;">rmem_max</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">&#39;16777216&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">net</span><span style="color:#F97583;">.</span><span style="color:#E1E4E8;">core</span><span style="color:#F97583;">.</span><span style="color:#E1E4E8;">somaxconn</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">&#39;4096&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">net</span><span style="color:#F97583;">.</span><span style="color:#E1E4E8;">core</span><span style="color:#F97583;">.</span><span style="color:#E1E4E8;">wmem_max</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">&#39;16777216&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">net</span><span style="color:#F97583;">.</span><span style="color:#E1E4E8;">ipv4</span><span style="color:#F97583;">.</span><span style="color:#E1E4E8;">tcp_max_syn_backlog</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">&#39;20480&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">net</span><span style="color:#F97583;">.</span><span style="color:#E1E4E8;">ipv4</span><span style="color:#F97583;">.</span><span style="color:#E1E4E8;">tcp_max_tw_buckets</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">&#39;400000&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">net</span><span style="color:#F97583;">.</span><span style="color:#E1E4E8;">ipv4</span><span style="color:#F97583;">.</span><span style="color:#E1E4E8;">tcp_no_metrics_save</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&#39;1&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">net</span><span style="color:#F97583;">.</span><span style="color:#E1E4E8;">ipv4</span><span style="color:#F97583;">.</span><span style="color:#E1E4E8;">tcp_rmem</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">&#39;4096 </span><span style="color:#79B8FF;">87380</span><span style="color:#E1E4E8;"> 16777216&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">net</span><span style="color:#F97583;">.</span><span style="color:#E1E4E8;">ipv4</span><span style="color:#F97583;">.</span><span style="color:#E1E4E8;">tcp_syn_retries</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&#39;2&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">net</span><span style="color:#F97583;">.</span><span style="color:#E1E4E8;">ipv4</span><span style="color:#F97583;">.</span><span style="color:#E1E4E8;">tcp_synack_retries</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&#39;2&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">net</span><span style="color:#F97583;">.</span><span style="color:#E1E4E8;">ipv4</span><span style="color:#F97583;">.</span><span style="color:#E1E4E8;">tcp_wmem</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">&#39;4096 </span><span style="color:#79B8FF;">65536</span><span style="color:#E1E4E8;"> 16777216&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">vm</span><span style="color:#F97583;">.</span><span style="color:#E1E4E8;">min_free_kbytes</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">&#39;65536&#39;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">net</span><span style="color:#D73A49;">.</span><span style="color:#24292E;">ipv4</span><span style="color:#D73A49;">.</span><span style="color:#24292E;">ip_local_port_range</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">&#39;1024 65000&#39;</span></span>
<span class="line"><span style="color:#24292E;">net</span><span style="color:#D73A49;">.</span><span style="color:#24292E;">ipv4</span><span style="color:#D73A49;">.</span><span style="color:#24292E;">tcp_tw_reuse</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&#39;1&#39;</span></span>
<span class="line"><span style="color:#24292E;">net</span><span style="color:#D73A49;">.</span><span style="color:#24292E;">ipv4</span><span style="color:#D73A49;">.</span><span style="color:#24292E;">tcp_fin_timeout</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">&#39;15&#39;</span></span>
<span class="line"><span style="color:#24292E;">net</span><span style="color:#D73A49;">.</span><span style="color:#24292E;">core</span><span style="color:#D73A49;">.</span><span style="color:#24292E;">netdev_max_backlog</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">&#39;4096&#39;</span></span>
<span class="line"><span style="color:#24292E;">net</span><span style="color:#D73A49;">.</span><span style="color:#24292E;">core</span><span style="color:#D73A49;">.</span><span style="color:#24292E;">rmem_max</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">&#39;16777216&#39;</span></span>
<span class="line"><span style="color:#24292E;">net</span><span style="color:#D73A49;">.</span><span style="color:#24292E;">core</span><span style="color:#D73A49;">.</span><span style="color:#24292E;">somaxconn</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">&#39;4096&#39;</span></span>
<span class="line"><span style="color:#24292E;">net</span><span style="color:#D73A49;">.</span><span style="color:#24292E;">core</span><span style="color:#D73A49;">.</span><span style="color:#24292E;">wmem_max</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">&#39;16777216&#39;</span></span>
<span class="line"><span style="color:#24292E;">net</span><span style="color:#D73A49;">.</span><span style="color:#24292E;">ipv4</span><span style="color:#D73A49;">.</span><span style="color:#24292E;">tcp_max_syn_backlog</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">&#39;20480&#39;</span></span>
<span class="line"><span style="color:#24292E;">net</span><span style="color:#D73A49;">.</span><span style="color:#24292E;">ipv4</span><span style="color:#D73A49;">.</span><span style="color:#24292E;">tcp_max_tw_buckets</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">&#39;400000&#39;</span></span>
<span class="line"><span style="color:#24292E;">net</span><span style="color:#D73A49;">.</span><span style="color:#24292E;">ipv4</span><span style="color:#D73A49;">.</span><span style="color:#24292E;">tcp_no_metrics_save</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&#39;1&#39;</span></span>
<span class="line"><span style="color:#24292E;">net</span><span style="color:#D73A49;">.</span><span style="color:#24292E;">ipv4</span><span style="color:#D73A49;">.</span><span style="color:#24292E;">tcp_rmem</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">&#39;4096 </span><span style="color:#005CC5;">87380</span><span style="color:#24292E;"> 16777216&#39;</span></span>
<span class="line"><span style="color:#24292E;">net</span><span style="color:#D73A49;">.</span><span style="color:#24292E;">ipv4</span><span style="color:#D73A49;">.</span><span style="color:#24292E;">tcp_syn_retries</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&#39;2&#39;</span></span>
<span class="line"><span style="color:#24292E;">net</span><span style="color:#D73A49;">.</span><span style="color:#24292E;">ipv4</span><span style="color:#D73A49;">.</span><span style="color:#24292E;">tcp_synack_retries</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&#39;2&#39;</span></span>
<span class="line"><span style="color:#24292E;">net</span><span style="color:#D73A49;">.</span><span style="color:#24292E;">ipv4</span><span style="color:#D73A49;">.</span><span style="color:#24292E;">tcp_wmem</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">&#39;4096 </span><span style="color:#005CC5;">65536</span><span style="color:#24292E;"> 16777216&#39;</span></span>
<span class="line"><span style="color:#24292E;">vm</span><span style="color:#D73A49;">.</span><span style="color:#24292E;">min_free_kbytes</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">&#39;65536&#39;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><p>这里重点说下几个配置。</p><ul><li><p><strong>ip_local_port_range：</strong> 如果在请求高并发时，会导致端口不够用，因此需要调整范围，但是你要注意，范围并不是越小越好，如果从 1024 开始，也可能会与系统相关的进程服务端口冲突，从而导致请求失败。</p></li><li><p><strong>net.ipv4.tcp_tw_reuse：</strong> 当服务器要在大量 TCP 连接之间切换时，会产生大量处于TIME_WAIT 状态的连接。TIME_WAIT意味着连接本身是关闭的，但资源没有释放，将net_ipv4_tcp_tw_reuse 设置为 1 是让内核在安全时尽量回收连接，这比重新建立新连接便宜得多。</p></li><li><p><strong>net.ipv4.tcp_fin_timeout：</strong> 这是处于 TIME_WAIT状态的连接在回收前必须等待的最小时间，改小它可以加快回收，当然也不是越小越好，如果太小比如设置5，可能会导致 TCP 连接异常。</p></li></ul><p>如果需要对其他的配置进行改动，希望大家在改动前大家先深入去了解 Linux 内核参数的作用，它的改动范围以及所带来的影响面，这部分改动如果出现问题，可能会出现一些难以定位的现网问题。</p><h4 id="单机单服务和单机多服务" tabindex="-1">单机单服务和单机多服务 <a class="header-anchor" href="#单机单服务和单机多服务" aria-label="Permalink to &quot;单机单服务和单机多服务&quot;">​</a></h4><p>Node.js 服务在部署时，需要分 2 种情况：</p><ul><li><p>单机只部署一个 Node.js 服务；</p></li><li><p>单机上部署多个 Node.js 服务。</p></li></ul><p>我们分别看一下这两者需要注意的细节。</p><p><strong>单机单服务</strong></p><p>单机单服务适合并发较大、功能底层的服务，比如Node.js 做业务网关时，就适合单机单服务。因为网关并发一般较大，需要非常严谨地了解当前承担的并发和性能。而单机单服务则可以非常精准的了解性能数据，不会被外界因素干扰。</p><p>在应用这种服务时，你要按照机器核数来启用进程数，等于或者小于核数（最好是小于核数），避免在并发较高时，占满 CPU ，从而影响机器性能，系统资源无法调度，那样就非常危险。</p><p><strong>单机多服务</strong></p><p>单机多服务适合于多个业务服务，但这多个业务并发相对不高，比如应用 Node.js 做一些活动或者通用中台服务时。该情况不利于判断当前服务启用的进程数，需要根据具体的业务判断。</p><p>假设我们在一台 16 核机器上部署 2 个服务，一个并发较高，一个并发较低，但是两者经过分析，并发高的 10 核就可以满足到要求，而并发低的只需要 4 核就足够。这种情况就不会有太大的风险，因为加起来 14 核，也不会影响到性能问题。但两者加起来如果超出 16 核，比如并发低的需要 8 核才能满足业务，就要考虑两者在什么场景下是否存在同时并发的压力，如果存在并发压力就应该考虑将两者分到不同机器上，而不是同一台机器上，或者增加机器来满足当前业务场景。</p><p>如果一台机器上有 4 个服务呢？分析方法还是和上面相似，按照以下几个步骤来评判。</p><ol><li><p>判断 4 个服务加起来是否超出当前 CPU 总核数；</p></li><li><p>不超出不会有影响，超出时则判断多个服务是否会在同时最大并发数，或者最大并发的服务加起来是否会超出当前 CPU 核数；</p></li><li><p>多个服务最大并发不会超出 CPU 核数时，则可以合并部署；</p></li><li><p>多个服务最大并发会超出 CPU 核数时，就需要考虑拆分服务出去，或者增加机器，减少 CPU 核数占用，比如原来是 6 核 2 台机器，现在增加了 2 台机器，可以 3 核 4 台机器，虽然这种方法计算不够准确，但是可以这样参考。</p></li></ol><p>实际开发过程中监控和性能告警是非常重要的，当 CPU 长期处于高负荷时，一定是需要告警的，我们才能知道是否需要进一步扩容或者性能优化提升。</p><h4 id="多机器部署负载均衡" tabindex="-1">多机器部署负载均衡 <a class="header-anchor" href="#多机器部署负载均衡" aria-label="Permalink to &quot;多机器部署负载均衡&quot;">​</a></h4><p>上面我介绍的是单机注意的细节，接下来我们再来看一下多机器的负载均衡方案。后台服务一般都有个独立 IP:PORT ，如果有域名，一般会选择用 Nginx 作为负载均衡的服务，没有域名的话，多个服务之间调用。多服务之间调用，就需要使用到一个叫作名字服务的功能，该功能主要是使用方可以通过一个字符串名字，随机获取一个可用的 IP:PORT 配置；</p><p><img src="https://s0.lgstatic.com/i/image6/M01/39/F2/Cgp9HWB9Tx6AUefLAADCvjmrv30935.png" alt="Drawing 2.png"><br> 图 3 负载均衡方法</p><p>图 3 就是一个负载均衡的方案，对于域名访问按照刚才所说可以使用 Nginx，而对于服务间调用则使用名字服务。这种方案，可以适配我们现在的绝大不多数后台多服务的负载均衡方案，因此对于 Node.js 来说，我们实际开发中负载均衡也是使用这套方案。</p><h4 id="并行压测" tabindex="-1">并行压测 <a class="header-anchor" href="#并行压测" aria-label="Permalink to &quot;并行压测&quot;">​</a></h4><p>如果我们服务使用了刚才上面所介绍的多服务负载均衡的方案，那么我们就需要去学习一种新的方案来评估服务承载能力。接下来我们就来学习一下，怎么有效地评估服务承载的情况。</p><p><strong>1</strong>. 首先应用 clinicjs 压测工具，检测单个接口是否存在性能问题；</p><p><strong>2</strong>. 计算当前服务所应该承担的最大并发情况，我们用一个渐进性的表格来分析，如表格 1。</p><p><img src="https://s0.lgstatic.com/i/image6/M00/3A/65/CioPOWB_g7eAJW_sAABOZsdm58g189.png" alt="image.png"><br> 表格 1 预测并发压力方式</p><p>比如我们当前 DAU 1000 万，最高在线人数 12% ，因此最高的在线人数 120 万，而按照秒来计算的话，我们用当前数除以 60 就是每秒，但是由于不是严格除以 60 ，我们需要乘以 5 来确保安全，最后 10% 的在线用户会使用到该服务，所以该服务最大并发数是 1万 QPS。</p><p>假设我们有 4 台服务器，按照平均分配的话，那么每台机器处理并发数大概是 2500 的 QPS 。</p><p>得到 1 万的结论后，我们再细分接口的并发数，得到一个像表格 2 的结论。</p><p><img src="https://s0.lgstatic.com/i/image6/M00/3A/65/CioPOWB_g8CAIJSsAABEY3NwObM047.png" alt="image (1).png"><br> 表格 2 并发结论</p><p><strong>3</strong>. 拿到表格 2 结论后，就可以联合的压测以上 4 个接口了，分别按照 1000 、200 、1000 和 300 的并发去压测；</p><p><strong>4</strong>. 压测后就可以得出当前服务的情况，接下来就需要进行多台机器联合压测，在现网一般情况下是无法 4 台同时摘除压测的，可以考虑在现网比较空闲的时段，使用 2 台进行压测进一步分析是否满足要求；</p><p><strong>5</strong>. 如果单台机器涉及多服务，那么则需要将多个服务进行联合压测，才能真实的得到现网的负载承受能力。</p><p>这里就不详细的实践压测细节了，压测这部分还需要你自己多进行学习和深入掌握。</p><h3 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h3><p>总的来说，这一讲也是我之前使用 Node.js 开发沉淀下来的一些经验，你在学习本讲时，着重了解这些知识点即可，在实际应用过程中再来逐个参考，我这里所介绍的也是一个参考项，真正实际应用过程中还需要你和项目组的同事一起讨论。</p><p>这一讲，我提到了并行压测，今天的作业就是：希望你应用 wrk 来实现一个联合压测工具，可行的话可以在评论区分享给后面的同学。下一讲我们将实现一个通用的透传类的 Node.js 服务，也就是一个简单版本的业务网关服务。</p>`,63),e=[o];function t(r,c,E,i,y,_){return n(),p("div",null,e)}const d=s(l,[["render",t]]);export{g as __pageData,d as default};
