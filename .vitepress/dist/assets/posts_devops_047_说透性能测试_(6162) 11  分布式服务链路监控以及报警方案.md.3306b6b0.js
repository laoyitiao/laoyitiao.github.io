import{_ as s,o as a,g as n,Q as p}from"./chunks/framework.f949202b.js";const u=JSON.parse('{"title":"为什么要链路监控？ ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/devops/047_说透性能测试/(6162) 11  分布式服务链路监控以及报警方案.md","filePath":"posts/devops/047_说透性能测试/(6162) 11  分布式服务链路监控以及报警方案.md","lastUpdated":null}'),l={name:"posts/devops/047_说透性能测试/(6162) 11  分布式服务链路监控以及报警方案.md"},o=p(`<p>上一讲我们主要讲解了硬件的命令行资源监控，相信你已经学会了通过命令行的方式查看硬件瓶颈。</p><p>那我提一个问题，为什么会有硬件瓶颈呢？或者我说得更直白一点，如果服务器上没有应用还会造成硬件瓶颈吗？显然是不会的，所以我想向你传递一个观点：<strong>呈现出来的硬件瓶颈绝大多数是表象问题</strong>，我们往往需要在系统应用上寻找问题的根因。而寻找系统问题的根因，对于系统链路监控也是必不可少的，所以这一讲我将带你学习如何进行基于系统链路的监控。</p><p><img src="https://s0.lgstatic.com/i/image6/M00/04/35/CioPOWAkcfaAJEm5AAEmKUDxE0Q409.png" alt="金句模板 titel 无阴影版本.png"></p><h3 id="为什么要链路监控" tabindex="-1">为什么要链路监控？ <a class="header-anchor" href="#为什么要链路监控" aria-label="Permalink to &quot;为什么要链路监控？&quot;">​</a></h3><p>随着微服务的流行，链路监控越来越受重视。微服务架构是根据业务进行拆分，对外统一暴露API 接口，而内部可能是分布式服务、分布式对象存储等，如图 1 所示。</p><p><img src="https://s0.lgstatic.com/i/image6/M00/04/35/CioPOWAkcOeAJyX6AAH4oq8oV4s515.png" alt="1shangchuan.png"><br> 图 1：微服务架构</p><p>这些组件共同构成了复杂的分布式网络。而分布式系统一旦出现问题，比如一个请求经过多个微服务之后出现了调用失败的问题，或者一个请求经过多个微服务之后 Response 时间过长，但具体是哪个微服务节点的问题我们并不知道。只能去服务器上查看调用经过的每个微服务的日志，当然这种方式的效率是比较低的，相当于人肉运维。</p><p>随着业务体系越来越复杂，加上服务间的相互依赖关系，微服务其中一个节点出现了问题，很可能牵一发而动全身，导致严重的后果。在这样的情况下，分布式链路监控的价值就体现出来了，它可以让你清晰地知道跨服务调用的链路耗时信息、执行方法等，并从整体到局部将信息呈现出来，可以帮助你节约故障排查时间。</p><h3 id="全链路监控选择依据" tabindex="-1">全链路监控选择依据 <a class="header-anchor" href="#全链路监控选择依据" aria-label="Permalink to &quot;全链路监控选择依据&quot;">​</a></h3><p>全链路监控系统有很多，可以从这几方面选择：</p><ul><li><p><strong>探针的性能消耗</strong>，探针是搜集信息的&quot;情报员&quot;，尤其是在多节点情况下，搜集数据的成本会越来越高，监控组件服务的影响应该做到足够小、数据分析快、性能占用小；</p></li><li><p>对代码的<strong>非侵入性</strong>，减少开发的维护成本；</p></li><li><p>监控、分析的维度尽可能多。</p></li></ul><p>目前市面上的全链路监控工具很多，比如 CAT、SkyWalking、Pinpoint 等，对于工具的选型来说最重要的是采样数据对系统的性能消耗足够小、数据分析和展示快、监控的维度尽可能丰富，<strong>简单比较下这几个工具。</strong></p><ul><li><p>CAT：是由美团和携程的同学开发的，通过代码埋点的侵入式方式，对应用日志分析、监控、展示等，不过侵入式的方式会带来开发以及维护成本的增加。</p></li><li><p>SkyWalking：也是由国人开发，目前项目已经提交到 Apache 孵化组织，无侵入性、UI 展示简洁清晰。</p></li><li><p>Pinpoint：由韩国人开发，相对于 SkyWalkingg 提供了更为详尽的链路监控信息，不过数据采集带来的性能损耗相对于 SkyWalking 来说比较大。</p></li></ul><p>综上我将以 SkyWalking 为例给你介绍下链路监控，希望通过介绍，你可以掌握 SkyWalking 的具体使用步骤和链路监控工具可以给我们带来什么好处，通过本讲的学习你也可以自由选择链路监控工具去实践。</p><h3 id="skywalking-的模块分析" tabindex="-1">SkyWalking 的模块分析 <a class="header-anchor" href="#skywalking-的模块分析" aria-label="Permalink to &quot;SkyWalking 的模块分析&quot;">​</a></h3><p>首先来看下 SkyWalking 的组件示意图：</p><p><img src="https://s0.lgstatic.com/i/image6/M00/02/ED/CioPOWAeP5uAc_faAAPptpn_1oo892.png" alt="Drawing 1.png"><br> 图 2：SkyWalking 的组件示意图</p><ul><li><p><strong>Tracing 和 Metric ：</strong> 在应用上采集 Tracing（调用链数据）和 Metric（指标）信息通过 HTTP 或者 gRPC 方式发送数据到 Analysis Platform。</p></li><li><p><strong>Analysis Platform</strong>：数据的采集和计算，将传输的 Tracing 和 Metric 数据进行整合分析，通过 Analysis Core 模块把数据写入相关的数据库中。</p></li><li><p><strong>Storage</strong>：SkyWalking 的存储，支持以 ElasticSearch、MySQL、TiDB 等数据库进行数据存储，其中 ElasticSearch、MySQL 用的居多。</p></li><li><p><strong>SkyWalking UI</strong>：Web 可视化平台，用来展示落地的数据以及图表，比如链路调用、服务结构等。</p></li></ul><h4 id="_1-安装部署过程以及相关的注意事项" tabindex="-1">1.安装部署过程以及相关的注意事项 <a class="header-anchor" href="#_1-安装部署过程以及相关的注意事项" aria-label="Permalink to &quot;1.安装部署过程以及相关的注意事项&quot;">​</a></h4><p>首先下载 <strong>SkyWalking</strong> 安装包并进行解压：</p><div class="language-java vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">wget https</span><span style="color:#F97583;">:</span><span style="color:#6A737D;">//github.com/apache/SkyWalking/archive/v8.0.1.tar.gz</span></span>
<span class="line"><span style="color:#E1E4E8;">tar </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">zxvf v8.</span><span style="color:#FDAEB7;font-style:italic;">0</span><span style="color:#E1E4E8;">.</span><span style="color:#FDAEB7;font-style:italic;">1</span><span style="color:#E1E4E8;">.tar.gz</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">wget https</span><span style="color:#D73A49;">:</span><span style="color:#6A737D;">//github.com/apache/SkyWalking/archive/v8.0.1.tar.gz</span></span>
<span class="line"><span style="color:#24292E;">tar </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">zxvf v8.</span><span style="color:#B31D28;font-style:italic;">0</span><span style="color:#24292E;">.</span><span style="color:#B31D28;font-style:italic;">1</span><span style="color:#24292E;">.tar.gz</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>解压后可以看到如下文件夹：</p><p><img src="https://s0.lgstatic.com/i/image6/M00/02/ED/CioPOWAeP6iABnf7AACwQCQbs98587.png" alt="Drawing 2.png"></p><p>我们讲解下这个主要文件的作用。</p><p>（1）<strong>修改配置文件 config/application.yml</strong>。在这里先进行数据库的配置，我使用当前服务器上的 mysql 来进行存储：</p><div class="language-java vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">    mysql</span><span style="color:#F97583;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    properties</span><span style="color:#F97583;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      jdbcUrl</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> \${SW_JDBC_URL</span><span style="color:#F97583;">:</span><span style="color:#9ECBFF;">&quot;jdbc:mysql://127.0.0.1:3306/swtest&quot;</span><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">      dataSource.user</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> \${SW_DATA_SOURCE_USER</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;">root}</span></span>
<span class="line"><span style="color:#E1E4E8;">      dataSource.password</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> \${SW_DATA_SOURCE_PASSWORD</span><span style="color:#F97583;">:</span><span style="color:#79B8FF;">123456</span><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">    mysql</span><span style="color:#D73A49;">:</span></span>
<span class="line"><span style="color:#24292E;">    properties</span><span style="color:#D73A49;">:</span></span>
<span class="line"><span style="color:#24292E;">      jdbcUrl</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> \${SW_JDBC_URL</span><span style="color:#D73A49;">:</span><span style="color:#032F62;">&quot;jdbc:mysql://127.0.0.1:3306/swtest&quot;</span><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">      dataSource.user</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> \${SW_DATA_SOURCE_USER</span><span style="color:#D73A49;">:</span><span style="color:#24292E;">root}</span></span>
<span class="line"><span style="color:#24292E;">      dataSource.password</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> \${SW_DATA_SOURCE_PASSWORD</span><span style="color:#D73A49;">:</span><span style="color:#005CC5;">123456</span><span style="color:#24292E;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>将上述的配置文件根据自己的数据库实际地址修改，修改完成后进行启动：</p><div class="language-java vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">$ bin</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">oapService.sh</span></span>
<span class="line"><span style="color:#E1E4E8;">SkyWalking OAP started successfully</span><span style="color:#F97583;">!</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">$ bin</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">oapService.sh</span></span>
<span class="line"><span style="color:#24292E;">SkyWalking OAP started successfully</span><span style="color:#D73A49;">!</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>（2）接着来看 SkyWalking UI 的相关配置，由于 SkyWalking UI 的默认端口是 8080，这个端口是很多应用的默认端口，容易产生冲突，你可以修改一下，如下所示：</p><div class="language-java vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;"># 修改webapp</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">webapp.yml</span></span>
<span class="line"><span style="color:#E1E4E8;">server</span><span style="color:#F97583;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  port</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">18080</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;"># 修改webapp</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">webapp.yml</span></span>
<span class="line"><span style="color:#24292E;">server</span><span style="color:#D73A49;">:</span></span>
<span class="line"><span style="color:#24292E;">  port</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">18080</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>然后启动 SkyWalking UI 服务，启动完成后你会看到如下信息：</p><div class="language-java vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">$ bin</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">webappService.sh</span></span>
<span class="line"><span style="color:#E1E4E8;">SkyWalking Web Application started successfully</span><span style="color:#F97583;">!</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">$ bin</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">webappService.sh</span></span>
<span class="line"><span style="color:#24292E;">SkyWalking Web Application started successfully</span><span style="color:#D73A49;">!</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>这里我强烈建议，不管是第一步还是第二步中的 started successfully，都并不意味着真正的启动成功，一般在提示 started successfully 后，还需要去 logs 文件夹下查看相关日志来判断启动过程中是否存在异常。</p><p>UI 界面启动成功后示意图如下：</p><p><img src="https://s0.lgstatic.com/i/image6/M00/02/ED/CioPOWAeP7aAEe_mAAIEY3gT-2w743.png" alt="Drawing 3.png"></p><p>（3）<strong>本地启动微服务</strong>。我 demo 里包含 system、auth、user 等服务，通过配置 SkyWalking Agent 的方式启动服务，示意如下：</p><div class="language-java vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">nohup java </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">server </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">Xms256m </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">Xmx256m </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">Dspring.profiles.active</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">dev </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">Dspring.cloud.nacos.discovery.server</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">addr</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">127.0</span><span style="color:#E1E4E8;">.</span><span style="color:#FDAEB7;font-style:italic;">0</span><span style="color:#E1E4E8;">.</span><span style="color:#FDAEB7;font-style:italic;">1</span><span style="color:#F97583;">:</span><span style="color:#79B8FF;">8848</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">javaagent</span><span style="color:#F97583;">:/</span><span style="color:#E1E4E8;">root</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">apm</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">apache</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">SkyWalking</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">apm</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">bin</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">agent</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">SkyWalking</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">agent.jar</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">agent.service_name</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">cctuser </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">Dspring.cloud.nacos.config.server</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">addr</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">127.0</span><span style="color:#E1E4E8;">.</span><span style="color:#FDAEB7;font-style:italic;">0</span><span style="color:#E1E4E8;">.</span><span style="color:#FDAEB7;font-style:italic;">1</span><span style="color:#F97583;">:</span><span style="color:#79B8FF;">8848</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">jar blade</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">user.jar  </span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> log.file </span><span style="color:#79B8FF;">2</span><span style="color:#F97583;">&gt;&amp;</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&amp;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">nohup java </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">server </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">Xms256m </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">Xmx256m </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">Dspring.profiles.active</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">dev </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">Dspring.cloud.nacos.discovery.server</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">addr</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">127.0</span><span style="color:#24292E;">.</span><span style="color:#B31D28;font-style:italic;">0</span><span style="color:#24292E;">.</span><span style="color:#B31D28;font-style:italic;">1</span><span style="color:#D73A49;">:</span><span style="color:#005CC5;">8848</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">javaagent</span><span style="color:#D73A49;">:/</span><span style="color:#24292E;">root</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">apm</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">apache</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">SkyWalking</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">apm</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">bin</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">agent</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">SkyWalking</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">agent.jar</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">agent.service_name</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">cctuser </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">Dspring.cloud.nacos.config.server</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">addr</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">127.0</span><span style="color:#24292E;">.</span><span style="color:#B31D28;font-style:italic;">0</span><span style="color:#24292E;">.</span><span style="color:#B31D28;font-style:italic;">1</span><span style="color:#D73A49;">:</span><span style="color:#005CC5;">8848</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">jar blade</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">user.jar  </span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> log.file </span><span style="color:#005CC5;">2</span><span style="color:#D73A49;">&gt;&amp;</span><span style="color:#005CC5;">1</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&amp;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>-javaagent 后的启动参数是 SkyWalking 的 agent 配置路径。</p><p>启动本地的微服务成功后，就可以访问服务，同时通过 SkyWalking 监控你可以看到服务部署图以及链路监控等，如下图所示：</p><p><img src="https://s0.lgstatic.com/i/image6/M00/02/EF/Cgp9HWAeP8KAOwR0AADQLStdVOY719.png" alt="Drawing 4.png"><br> 图 3：服务部署图</p><p><img src="https://s0.lgstatic.com/i/image6/M00/02/ED/CioPOWAeP8qALzJFAAMUz2rcn3k246.png" alt="Drawing 5.png"><br> 图 4：链路追踪图</p><p>在我们进行链路追踪后，可能会出现一些超时、访问错误等异常，那我们如何能够更快地收到这些异常信息呢？</p><h4 id="_2-常见的报警方式" tabindex="-1">2.常见的报警方式 <a class="header-anchor" href="#_2-常见的报警方式" aria-label="Permalink to &quot;2.常见的报警方式&quot;">​</a></h4><p>首先很多人想到了报警机制，那我带你了解下常见的几种报警方式。</p><p><strong>（1）短信或者电话报警</strong></p><p>这样的报警方式更适合高级别的报警提醒，用于处理紧急情况。出现级别不高而又频繁地发送短信会让人产生排斥感，而且电话或者短信的报警方式也存在一定的成本。</p><p><strong>（2）邮件报警</strong></p><p>邮件报警更适用于工作时的提醒，但是系统往往是不能区分你是不是在工作，有时候夜间的报警邮件你很难及时关注到，所以说邮件报警也存在一定的局限性。</p><p><strong>（3）钉钉报警</strong></p><p>随着钉钉越来越普及，很多公司都已经使用钉钉。员工在公司需要使用钉钉管理自己的考勤以及进行工作上的沟通，如果将监控报警信息推送到钉钉上其实就很方便的。不过也存在有的企业用的是其他沟通工具，不过对于报警推送到沟通软件上的原理都是类似的，接下来我会以钉钉作为模版来讲解如何进行报警信息的推送。</p><h4 id="_3-如何配置钉钉机器人" tabindex="-1">3.如何配置钉钉机器人？ <a class="header-anchor" href="#_3-如何配置钉钉机器人" aria-label="Permalink to &quot;3.如何配置钉钉机器人？&quot;">​</a></h4><p>（1）<strong>打开机器人管理页面</strong>。以 PC 端为例，打开 PC 端钉钉，进入首页面点击头像，在弹出框里选择机器人管理，打开管理页面后可以选择自定义，如下图所示：</p><p><img src="https://s0.lgstatic.com/i/image6/M00/02/EF/Cgp9HWAeP9WAKr2zAALfMHmtwh8462.png" alt="Drawing 6.png"></p><p>（2）在打开的机器人详情页面点击添加按钮，如下图所示：</p><p><img src="https://s0.lgstatic.com/i/image6/M00/02/ED/CioPOWAeP9qALHMNAAF-M44iggo590.png" alt="Drawing 7.png"></p><p>（3）在打开的添加机器人页面输入机器人名字，选择要接收报警的钉钉群 ，设置机器人头像。根据需要勾选安全设置等就可以，点击完成之后，在页面拷贝出 Webhook 地址保存好，向这个地址发送 HTTP POST 请求，设置的 SkyWalking 钉钉报警群便能收到钉钉报警消息，如下图所示：</p><p><img src="https://s0.lgstatic.com/i/image6/M00/02/EF/Cgp9HWAeP-GAcQSLAAFB0-TVf6w116.png" alt="Drawing 8.png"></p><p>配置好之后我们可以看到设置报警的钉钉群&quot;SkyWalking 钉钉报警&quot;出现了报警机器人消息，如下图所示：</p><p><img src="https://s0.lgstatic.com/i/image6/M00/02/EF/Cgp9HWAeP-qAURZCAAENpzpscRo136.png" alt="Drawing 9.png"></p><p>我们可以用 Linux 命令行工具 curl 快速验证是否可以推送成功，curl 命令行示意如下：</p><div class="language-java vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">[root@</span><span style="color:#F97583;">JD</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">~</span><span style="color:#E1E4E8;">]# curl </span><span style="color:#9ECBFF;">&#39;https://oapi.dingtalk.com/robot/send?access_token=xxxxxxx&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">H </span><span style="color:#9ECBFF;">&#39;CONTENT-TyPE: application/json&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">d </span><span style="color:#9ECBFF;">&#39;{&quot;msgtype&quot;: &quot;text&quot;,&quot;text&quot;: {&quot;content&quot;: &quot;业务报警&quot;}}&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">{</span><span style="color:#9ECBFF;">&quot;errcode&quot;</span><span style="color:#F97583;">:</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">,</span><span style="color:#9ECBFF;">&quot;errmsg&quot;</span><span style="color:#F97583;">:</span><span style="color:#9ECBFF;">&quot;ok&quot;</span><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">[root@</span><span style="color:#D73A49;">JD</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">~</span><span style="color:#24292E;">]# curl </span><span style="color:#032F62;">&#39;https://oapi.dingtalk.com/robot/send?access_token=xxxxxxx&#39;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">H </span><span style="color:#032F62;">&#39;CONTENT-TyPE: application/json&#39;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">d </span><span style="color:#032F62;">&#39;{&quot;msgtype&quot;: &quot;text&quot;,&quot;text&quot;: {&quot;content&quot;: &quot;业务报警&quot;}}&#39;</span></span>
<span class="line"><span style="color:#24292E;">{</span><span style="color:#032F62;">&quot;errcode&quot;</span><span style="color:#D73A49;">:</span><span style="color:#005CC5;">0</span><span style="color:#24292E;">,</span><span style="color:#032F62;">&quot;errmsg&quot;</span><span style="color:#D73A49;">:</span><span style="color:#032F62;">&quot;ok&quot;</span><span style="color:#24292E;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>你可以看到通过 curl 后可以得到基本响应 {&quot;errcode&quot;:0,&quot;errmsg&quot;:&quot;ok&quot;}。</p><h4 id="_4-如何将-skywalking-和钉钉报警完美结合" tabindex="-1">4.如何将 SkyWalking 和钉钉报警完美结合？ <a class="header-anchor" href="#_4-如何将-skywalking-和钉钉报警完美结合" aria-label="Permalink to &quot;4.如何将 SkyWalking 和钉钉报警完美结合？&quot;">​</a></h4><p>上述已经配置完成了钉钉机器人，那如何将 SkyWalking 的报警信息自动推送到钉钉机器人呢？我们可以实现一个接口作为它们沟通的&quot;桥梁&quot;。</p><p>首先在 pom 里面引入相关的 jar 包，如下所示：</p><div class="language-java vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;">dependency</span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;">groupId</span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;">com.aliyun</span><span style="color:#F97583;">&lt;/</span><span style="color:#E1E4E8;">groupId</span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;">artifactId</span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;">alibaba</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">dingtalk</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">service</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">sdk</span><span style="color:#F97583;">&lt;/</span><span style="color:#E1E4E8;">artifactId</span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#F97583;">&lt;/</span><span style="color:#E1E4E8;">dependency</span><span style="color:#F97583;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;">dependency</span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;">groupId</span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;">com.aliyun</span><span style="color:#D73A49;">&lt;/</span><span style="color:#24292E;">groupId</span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;">artifactId</span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;">alibaba</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">dingtalk</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">service</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">sdk</span><span style="color:#D73A49;">&lt;/</span><span style="color:#24292E;">artifactId</span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#D73A49;">&lt;/</span><span style="color:#24292E;">dependency</span><span style="color:#D73A49;">&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>然后自定义 DingTalkUtils 工具类，暴露接口访问路径 /dingdingAlarm。</p><div class="language-java vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#F97583;">RequestMapping</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">value</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;/dingdingAlarm&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">method</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> RequestMethod.POST)</span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">alarm</span><span style="color:#E1E4E8;">(@</span><span style="color:#F97583;">RequestBody</span><span style="color:#E1E4E8;"> List</span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;">AlarmDto</span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> alarmList){</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">//示意代码</span></span>
<span class="line"><span style="color:#E1E4E8;">    alarmList.</span><span style="color:#B392F0;">forEach</span><span style="color:#E1E4E8;">(alarm</span><span style="color:#F97583;">-&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        DingTalkUtils.</span><span style="color:#B392F0;">sendMsg</span><span style="color:#E1E4E8;">(alarm.</span><span style="color:#B392F0;">getAlarmMessage</span><span style="color:#E1E4E8;">());</span></span>
<span class="line"><span style="color:#E1E4E8;">    });</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">@</span><span style="color:#D73A49;">RequestMapping</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">value</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;/dingdingAlarm&quot;</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">method</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> RequestMethod.POST)</span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">alarm</span><span style="color:#24292E;">(@</span><span style="color:#D73A49;">RequestBody</span><span style="color:#24292E;"> List</span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;">AlarmDto</span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> alarmList){</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">//示意代码</span></span>
<span class="line"><span style="color:#24292E;">    alarmList.</span><span style="color:#6F42C1;">forEach</span><span style="color:#24292E;">(alarm</span><span style="color:#D73A49;">-&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        DingTalkUtils.</span><span style="color:#6F42C1;">sendMsg</span><span style="color:#24292E;">(alarm.</span><span style="color:#6F42C1;">getAlarmMessage</span><span style="color:#24292E;">());</span></span>
<span class="line"><span style="color:#24292E;">    });</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p><strong>SkyWalking 告警推送到钉钉</strong></p><p>SkyWalking 提供了告警的配置，我们可以很方便地配置上面暴露的接口。在 SkyWalking 程序包里的 config 文件夹下有个 alarm-settings.yml 文件，该文件专门用来配置相关的报警。在该配置文件中我们可以搜索到 webhooks，把上面暴露的接口写上去就好了。</p><div class="language-java vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;"> webhooks</span><span style="color:#F97583;">:-</span><span style="color:#E1E4E8;">http</span><span style="color:#F97583;">:</span><span style="color:#6A737D;">//ip:port/dingdingAlarm</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;"> webhooks</span><span style="color:#D73A49;">:-</span><span style="color:#24292E;">http</span><span style="color:#D73A49;">:</span><span style="color:#6A737D;">//ip:port/dingdingAlarm</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>接下来我们测试下，比如 auth 服务获取验证码的接口出现错误，我们是可以在 SkyWalking 追踪页面清楚地看到的。同时对于其他相关的业务同学，也都可以在钉钉群收到报警信息，这样的方式在实际工作中非常实用。业务报错图和钉钉报警图如下所示：</p><p><img src="https://s0.lgstatic.com/i/image6/M01/02/ED/CioPOWAeP_mAAJfMAAOa59AALCQ026.png" alt="Drawing 10.png"><br> 图 5：业务报错图</p><p><img src="https://s0.lgstatic.com/i/image6/M01/02/EF/Cgp9HWAeQACAcTuwAAF2CS5plp8418.png" alt="Drawing 11.png"><br> 图 6：钉钉报警图</p><h3 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h3><p>这一讲主要讲解了关于 SkyWalking 的使用背景以及价值，在实操层面讲解了 SkyWalking 是如何追踪监控中出现的错误，并且把出现的错误通过钉钉通知给相关人员，相信通过这一讲的学习，你也对微服务下的报警方案会有一个更深刻的认识。</p><p>这里你需要思考下，你所在的公司是如何进行链路监控的？你觉得有什么优点和缺点？欢迎在交流区留下你的答案。</p><p>下一讲我将带你学习如何玩转可视化监控，如何把监控大屏做得酷炫！</p>`,78),e=[o];function t(r,c,i,y,E,g){return a(),n("div",null,e)}const m=s(l,[["render",t]]);export{u as __pageData,m as default};
