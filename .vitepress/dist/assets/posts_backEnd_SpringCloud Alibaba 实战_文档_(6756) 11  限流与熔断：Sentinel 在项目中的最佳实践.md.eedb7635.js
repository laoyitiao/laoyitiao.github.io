import{_ as o,j as a,o as i,g as p,k as s,h as l,Q as e,s as n}from"./chunks/framework.4e7d56ce.js";const mn=JSON.parse('{"title":"11限流与熔断：Sentinel在项目中的最佳实践","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/SpringCloud Alibaba 实战_文档/(6756) 11  限流与熔断：Sentinel 在项目中的最佳实践.md","filePath":"posts/backEnd/SpringCloud Alibaba 实战_文档/(6756) 11  限流与熔断：Sentinel 在项目中的最佳实践.md","lastUpdated":1696682708000}'),c={name:"posts/backEnd/SpringCloud Alibaba 实战_文档/(6756) 11  限流与熔断：Sentinel 在项目中的最佳实践.md"},r=e(`<h1 id="_11限流与熔断-sentinel在项目中的最佳实践" tabindex="-1">11限流与熔断：Sentinel在项目中的最佳实践 <a class="header-anchor" href="#_11限流与熔断-sentinel在项目中的最佳实践" aria-label="Permalink to &quot;11限流与熔断：Sentinel在项目中的最佳实践&quot;">​</a></h1><p>上一讲我们讲解了微服务的雪崩效应与如何基于 Sentinel 实现初步微服务限流，掌握了部署 Sentinel Dashboard与配置 Sentinel Core 客户端的技巧。本讲咱们继续 Sentinel 这个话题，将更有针对性的讲解 Sentinel 底层的细节与限流、熔断的各种配置方式。</p><p>本讲咱们主要学习三方面内容：</p><ul><li><p>Sentinel 通信与降级背后的技术原理；</p></li><li><p>Sentinel 限流降级的规则配置；</p></li><li><p>Sentinel 熔断降级的规则配置。</p></li></ul><p>下面咱们先开始第一部分。</p><h3 id="sentinel-dashboard通信与降级原理" tabindex="-1">Sentinel Dashboard通信与降级原理 <a class="header-anchor" href="#sentinel-dashboard通信与降级原理" aria-label="Permalink to &quot;Sentinel Dashboard通信与降级原理&quot;">​</a></h3><p>Sentinel Dashboard 是Sentinel的控制端，是新的限流与熔断规则的创建者。当内置在微服务内的 Sentinel Core（客户端）接收到新的限流、熔断规则后，微服务便会自动启用的相应的保护措施。</p><p>按执行流程，Sentinel 的执行流程分为三个阶段：</p><ol><li><p>Sentinel Core 与 Sentinel Dashboard 建立连接；</p></li><li><p>Sentinel Dashboard 向 Sentinel Core 下发新的保护规则；</p></li><li><p>Sentinel Core 应用新的保护规则，实施限流、熔断等动作。</p></li></ol><p><strong>第一步，建立连接。</strong></p><p>Sentine Core 在初始化的时候，通过 application.yml 参数中指定的 Dashboard 的 IP地址，会主动向 dashboard 发起连接的请求。</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">#Sentinel Dashboard通信地址</span></span>
<span class="line"><span style="color:#85E89D;">spring</span><span style="color:#E1E4E8;">: </span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">cloud</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">sentinel</span><span style="color:#E1E4E8;">: </span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">transport</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">dashboard</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">192.168.31.10:9100</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">#Sentinel Dashboard通信地址</span></span>
<span class="line"><span style="color:#22863A;">spring</span><span style="color:#24292E;">: </span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">cloud</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">sentinel</span><span style="color:#24292E;">: </span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">transport</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">dashboard</span><span style="color:#24292E;">: </span><span style="color:#032F62;">192.168.31.10:9100</span></span></code></pre></div><p>该请求是以心跳包的方式定时向 Dashboard 发送，包含 Sentinel Core 的 AppName、IP、端口信息。这里有个重要细节：Sentinel Core为了能够持续接收到来自 Dashboard的数据，会在微服务实例设备上监听 8719 端口，在心跳包上报时也是上报这个 8719 端口，而非微服务本身的 80 端口。</p>`,13),_=n("p",null,"Sentinel Core 向 Dashboard 建立连接",-1),d=n("p",null,"在 Sentinel Dashboard 接收到心跳包后，来自 Sentinel Core的AppName、IP、端口信息会被封装为 MachineInfo 对象放入 ConcurrentHashMap 保存在 JVM的内存中，以备后续使用。",-1),h=n("p",null,[n("strong",null,"第二步，推送新规则。")],-1),u=n("p",null,"如果在 Dashboard 页面中设置了新的保护规则，会先从当前的 MachineInfo 中提取符合要求的微服务实例信息，之后通过 Dashboard内置的 transport 模块将新规则打包推送到微服务实例的 Sentinel Core，Sentinel Core收 到新规则在微服务应用中对本地规则进行更新，这些新规则会保存在微服务实例的 JVM 内存中。",-1),g=n("p",null,"Sentinel Dashboard 向Sentinel Core推送新规则",-1),S=n("p",null,[n("strong",null,"第三步，处理请求。")],-1),A=n("p",null,'Sentinel Core 为服务限流、熔断提供了核心拦截器 SentinelWebInterceptor，这个拦截器默认对所有请求 /** 进行拦截，然后开始请求的链式处理流程，在对于每一个处理请求的节点被称为 Slot（槽），通过多个槽的连接形成处理链，在请求的流转过程中，如果有任何一个 Slot 验证未通过，都会产生 BlockException，请求处理链便会中断，并返回"Blocked by sentinel" 异常信息。',-1),m=e('<p>SentinelWebInterceptor 实施请求拦截与保护</p><p>那这些 Slot 都有什么作用呢？我们需要了解一下，默认 Slot 有7 个，前 3 个 Slot为前置处理，用于收集、统计、分析必要的数据；后 4 个为规则校验 Slot，从Dashboard 推送的新规则保存在&quot;规则池&quot;中，然后对应 Slot 进行读取并校验当前请求是否允许放行，允许放行则送入下一个 Slot 直到最终被 RestController 进行业务处理，不允许放行则直接抛出 BlockException 返回响应。</p><p>以下是每一个 Slot 的具体职责：</p><ul><li><p>NodeSelectorSlot 负责收集资源的路径，并将这些资源的调用路径，以树状结构存储起来，用于根据调用路径来限流降级；</p></li><li><p>ClusterBuilderSlot 则用于存储资源的统计信息以及调用者信息，例如该资源的 RT（运行时间）, QPS, thread count（线程总数）等，这些信息将用作为多维度限流，降级的依据；</p></li><li><p>StatistcSlot 则用于记录，统计不同维度的runtime 信息；</p></li><li><p>SystemSlot 则通过系统的状态，例如CPU、内存的情况，来控制总的入口流量；</p></li><li><p>AuthoritySlot 则根据黑白名单，来做黑白名单控制；</p></li><li><p>FlowSlot 则用于根据预设的限流规则，以及前面 slot 统计的状态，来进行限流；</p></li><li><p>DegradeSlot 则通过统计信息，以及预设的规则，来做熔断降级。</p></li></ul><p>到这里我们理解了 Sentinel 通信与降级背后的执行过程，下面咱们学习如何有效配置 Sentinel 的限流策略。</p><h3 id="sentinel-限流降级的规则配置" tabindex="-1">Sentinel 限流降级的规则配置 <a class="header-anchor" href="#sentinel-限流降级的规则配置" aria-label="Permalink to &quot;Sentinel 限流降级的规则配置&quot;">​</a></h3><h4 id="滑动窗口算法" tabindex="-1">滑动窗口算法 <a class="header-anchor" href="#滑动窗口算法" aria-label="Permalink to &quot;滑动窗口算法&quot;">​</a></h4><p>实现限流降级的核心是如何统计单位时间某个接口的访问量，常见的算法有计数器算法、令牌桶算法、漏桶算法、滑动窗口算法。Sentinel 采用滑动窗口算法来统计访问量。</p><p>滑动窗口算法并不复杂，咱们举例说明：某应用限流控制 1 分钟最多允许 600 次访问。采用滑动窗口算法是将每 1 分钟拆分为 6（变量）个等份时间段，每个时间段为 10 秒，6 个时间段为 1 组在下图用红色边框区域标出，而这个红色边框区域就是滑动窗口。当每产生 1 个访问在对应时间段的计数器自增加 1，当滑动窗口内所有时间段的计数器总和超过 600，后面新的访问将被限流直接拒绝。同时每过 10 秒，滑动窗口向右移动，前面的过期时间段计数器将被作废。</p><p>总结下，滑动窗口算法的理念是将整段时间均分后独立计数再汇总统计，滑动窗口算法被广泛应用在各种流控场景中，请你理解它的实现过程。</p>',10),b=n("p",null,"滑动窗口算法",-1),E=n("h4",{id:"基于-sentinel-dashboard-的限流设置",tabindex:"-1"},[l("基于 Sentinel Dashboard 的限流设置 "),n("a",{class:"header-anchor",href:"#基于-sentinel-dashboard-的限流设置","aria-label":'Permalink to "基于 Sentinel Dashboard 的限流设置"'},"​")],-1),C=n("p",null,'在 Sentinel Dashboard 中"簇点链路",找到需要限流的 URI，点击"+流控"进入流控设置。小提示，sentinel-dashboard 基于懒加载模式，如果在簇点链路没有找到对应的 URI，需要先访问下这个功能的功能后对应的 URI 便会出现。',-1),P=n("p",null,"流控设置界面",-1),y=n("p",null,"流控规则项目说明主要有以下几点。",-1),D=n("ul",null,[n("li",null,[n("p",null,'资源名：要流控的 URI，在 Sentinel 中 URI 被称为"资源"；')]),n("li",null,[n("p",null,"针对来源：默认 default 代表所有来源，可以针对某个微服务或者调用者单独设置；")]),n("li",null,[n("p",null,"阈值类型：是按每秒访问数量（QPS）还是并发数（线程数）进行流控；")]),n("li",null,[n("p",null,"单机阈值：具体限流的数值是多少。")])],-1),k=n("p",null,"默认流控规则",-1),B=n("p",null,'点击对话框中的"高级选项"，就会出现更为详细的设置项。',-1),T=n("p",null,"其中流控模式是指采用什么方式进行流量控制。Sentinel支持三种模式：直接、关联、链路，下面咱们分别讲解这三种模式。",-1),q=n("ul",null,[n("li",null,[n("strong",null,"直接模式：")])],-1),M=n("p",null,'以下图为例，当 List 接口 QPS 超过 1个时限流，浏览器会出现"Blocked by Sentinel"。',-1),I=n("p",null,"流控模式-直接",-1),W=n("ul",null,[n("li",null,[n("strong",null,"关联模式：")])],-1),x=n("p",null,'如下图所示，当同 List 接口关联的update 接口 QPS 超过 1 时，再次访问List 接口便会响应"Blocked by Sentinel"。',-1),f=n("p",null,"流控模式-关联",-1),O=n("ul",null,[n("li",null,[n("strong",null,"链路模式：")])],-1),Q=n("p",null,[l('链路模式相对复杂，我们举例说明，现在某公司开发了一个单机的电商系统，为了满足完成"下订单"的业务，程序代码会依次执行'),n("strong",null,"订单创建方法->减少库存方法->微信支付方法->短信发送"),l("方法。方法像链条一样从前向后依次执行，这种执行的链条被称为调用链路，而链路模式限流就是为此而生。")],-1),V=n("p",null,"以下图为例，在某个微服务中 List 接口，会被 Check 接口调用。在另一个业务，List 接口也会被 Scan 接口调用。",-1),L=n("p",null,"调用链路",-1),U=n("p",null,'但如果按下图配置，将入口资源设为"/check"，则只会针对 check 接口的调用链路生效。当访问 check 接口的QPS 超过 1 时，List 接口就会被限流。而另一条链路从 scan 接口到List 接口的链路则不会受到任何影响。链路模式与关联模式最大的区别是 check 接口与 List 接口必须是在同一个调用链路中才会限流，而关联模式是任意两个资源只要设置关联就可以进行限流。',-1),N=e("<p>流控模式-链路</p><p>讲完了直接、关联、链路三种流控模式，下面咱们聊一聊高级选项中的&quot;流控效果&quot;。</p><p>流控效果是指在达到流控条件后，对当前请求如何进行处理。流控效果有三种：<strong>快速失败</strong> 、<strong>Warm UP（预热）</strong> 、<strong>排队等待</strong>。</p><ul><li><strong>快速失败：</strong></li></ul><p>快速失败是指流浪当过限流阈值后，直接返回响应并抛出 BlockException，快速失败是最常用的处理形式。如下图所示，当 List 接口每秒 QPS 超过 1 时，可以直接抛出&quot;Blocked By Sentinel&quot;异常。</p>",5),R=n("p",null,"流控效果-快速失败",-1),Y=n("ul",null,[n("li",null,[n("strong",null,"Warm Up（预热）：")])],-1),v=n("p",null,"Warm Up 用于应对瞬时大并发流量冲击。当遇到突发大流量 Warm Up 会缓慢拉升阈值限制，预防系统瞬时崩溃，这期间超出阈值的访问处于队列等待状态，并不会立即抛出 BlockException。",-1),F=n("p",null,"如下图所示，List 接口平时单机阈值 QPS 处于低水位：默认为 1000/3 (冷加载因子)≈333，当瞬时大流量进来，10 秒钟内将 QPS 阈值逐渐拉升至 1000，为系统留出缓冲时间，预防突发性系统崩溃。",-1),H=e("<p>流控效果-Warm Up</p><ul><li><strong>排队等待：</strong></li></ul><p>排队等待是采用匀速放行的方式对请求进行处理。如下所示，假设现在有100个请求瞬间进入，那么会出现以下几种情况：</p><ol><li><p>单机 QPS 阈值=1，代表每 1 秒只能放行 1 个请求，其他请求队列等待，共需 100 秒处理完毕；</p></li><li><p>单机 QPS 阈值=4，代表 250 毫秒匀速放行 1 个请求，其他请求队列等待，共需 25 秒处理完毕；</p></li><li><p>单机 QPS 阈值=200，代表 5 毫秒匀速放行一个请求，其他请求队列等待，共需 0.5 秒处理完毕；</p></li><li><p>如果某一个请求在队列中处于等待状态超过 2000 毫秒，则直接抛出 BlockException。</p></li></ol><p>注意，匀速队列只支持 QPS 模式，且单机阈值不得大于 1000。</p>",5),w=e('<p>流控效果-排队等待</p><p>讲到这，我为你讲解了从滑动窗口统计流量到 Sentinel Dashboard 如何进行流控配置。下面咱们再来讲解 Sentinel的熔断降级策略。</p><h3 id="sentinel-熔断降级的规则配置" tabindex="-1">Sentinel 熔断降级的规则配置 <a class="header-anchor" href="#sentinel-熔断降级的规则配置" aria-label="Permalink to &quot;Sentinel 熔断降级的规则配置&quot;">​</a></h3><h4 id="什么是熔断" tabindex="-1">什么是熔断？ <a class="header-anchor" href="#什么是熔断" aria-label="Permalink to &quot;什么是熔断？&quot;">​</a></h4><p>先说现实中的股市熔断机制。2016 年 1 月 4 日，A 股遇到史上首次熔断，沪指开盘后跌幅超过 5%，直接引发熔断。三家股市交易所暂停交易15分钟，但恢复交易之后股市继续下跌，三大股市交易所暂停交易至闭市。通过现象可以看<strong>出熔断是一种保护机制</strong>，当事物的状态达到某种&quot;不可接受&quot;的情况时，便会触发&quot;熔断&quot;。在股市中，熔断条件就是大盘跌幅超过 5%，而熔断的措施便是强制停止交易 15 分钟，之后尝试恢复交易，如仍出现继续下跌，便会再次触发熔断直接闭市。但假设 15分钟后，大盘出现回涨，便认为事故解除继续正常交易。这是现实生活中的熔断，如果放在软件中也是一样的。</p><p>微服务的熔断是指在某个服务接口在执行过程中频繁出现故障的情况，我们便认为这种状态是&quot;不可接受&quot;的，立即对当前接口实施熔断。在规定的时间内，所有送达该接口的请求都将直接抛出 BlockException，在熔断期过后新的请求进入看接口是否恢复正常，恢复正常则继续运行，仍出现故障则再次熔断一段时间，以此往复直到服务接口恢复。</p><p>下图清晰的说明了 Sentinel的熔断过程：</p><ol><li><p>设置熔断的触发条件，当某接口超过20%的请求访问出现故障，便启动熔断；</p></li><li><p>在熔断状态下，若干秒内所有该接口的请求访问都会直接抛出BlockException拒绝访问。</p></li><li><p>熔断器过后，下一次请求重新访问接口，当前接口为&quot;半开状态&quot;，后续处理以下分两种情况。</p></li></ol><ul><li><p>当前请求被有效处理，接口恢复到正常状态。</p></li><li><p>当前请求访问出现故障，接口继续熔断。</p></li></ul>',9),j=n("p",null,"Sentinel 熔断机制",-1),J=n("h4",{id:"基于sentineldashboard的熔断设置",tabindex:"-1"},[n("strong",null,"基于SentinelDashboard的熔断设置"),l(),n("a",{class:"header-anchor",href:"#基于sentineldashboard的熔断设置","aria-label":'Permalink to "**基于SentinelDashboard的熔断设置**"'},"​")],-1),K=n("p",null,"Sentinel Dashboard可以设置三种不同的熔断模式：慢调用比例、异常比例、异常数，下面我们分别讲解：",-1),z=n("ul",null,[n("li",null,'慢调用比例是指当接口在1秒内"慢处理"数量超过一定比例，则触发熔断。')],-1),$=n("p",null,"熔断模式-慢调用比例",-1),X=n("p",null,'结合上图的设置，介绍下"慢调用比例"熔断规则。',-1),Z=n("ul",null,[n("li",null,"异常比例是指 1 秒内按接口调用产生异常的比例（异常调用数/总数量）触发熔断。")],-1),G=n("p",null,"熔断模式-异常比例",-1),nn=n("p",null,'结合上图的设置，介绍下"异常比例"熔断规则。',-1),ln=n("ul",null,[n("li",null,"异常数是指在 1 分钟内异常的数量超过阈值则触发熔断。")],-1),tn=n("p",null,"熔断模式-异常数",-1),sn=n("p",null,'结合上图的设置，介绍下"异常数"熔断规则。',-1),en=n("p",null,"以上就是三种熔断模式的介绍，熔断相对流控配置比较简单，只需要设置熔断检查开启条件与触发熔断条件即可。讲到这关于限流与熔断的配置暂时告一段落，下面对本讲内容进行下总结。",-1),on=n("h3",{id:"小结与预告",tabindex:"-1"},[l("小结与预告 "),n("a",{class:"header-anchor",href:"#小结与预告","aria-label":'Permalink to "小结与预告"'},"​")],-1),an=n("p",null,"本讲咱们介绍了三部分内容，第一部分讲解了 Sentinel Dashboard 与 Sentinel Core的通信机制与执行原理，了解 Sentinel Core 是通过拦截器实现了限流与熔断；第二部分讲解了滑动窗口算法与 Dashboard 流控配置的每一种情况；第三部分讲解了熔断机制与 Dashboard 的熔断配置。",-1),pn=n("p",null,"这里留一个讨论话题：假如你遇到像春运 12306 热门车次购票这种高并发场景，为了保证应用的稳定和用户的体验，我们要采取哪些措施呢？可以把你的经验写在评论中，咱们一起探讨。",-1),cn=n("p",null,"下一讲，将进入生产集群保护这个话题，看 Sentinel 是如何对整个服务集群实施保护的。",-1);function rn(_n,dn,hn,un,gn,Sn){const t=a("Image");return i(),p("div",null,[r,s(t,{alt:"图片1.png",src:"https://s0.lgstatic.com/i/image6/M00/26/25/CioPOWBarxyAfxg4AAEytt3cAkM947.png"}),l(),_,d,h,u,s(t,{alt:"图片22.png",src:"https://s0.lgstatic.com/i/image6/M00/26/28/Cgp9HWBaryuANUd3AAFKoecEXLU156.png"}),l(),g,S,A,s(t,{alt:"图片2.png",src:"https://s0.lgstatic.com/i/image6/M00/26/25/CioPOWBarziAOzV2AAFkVrbLros829.png"}),l(),m,s(t,{alt:"图片4.png",src:"https://s0.lgstatic.com/i/image6/M00/26/25/CioPOWBar0iAFl_9AASda6g75YE021.png"}),l(),b,E,C,s(t,{alt:"图片5.png",src:"https://s0.lgstatic.com/i/image6/M00/26/28/Cgp9HWBar1OAG6JAAAKivJHK_-k419.png"}),l(),P,y,D,s(t,{alt:"图片6.png",src:"https://s0.lgstatic.com/i/image6/M00/26/28/Cgp9HWBar16Abbz2AAOQnjLspDY532.png"}),l(),k,B,T,q,M,s(t,{alt:"图片7.png",src:"https://s0.lgstatic.com/i/image6/M00/26/28/Cgp9HWBar4CARQwVAAEmI2EpwUs844.png"}),l(),I,W,x,s(t,{alt:"图片8.png",src:"https://s0.lgstatic.com/i/image6/M00/26/25/CioPOWBar4qAaeVSAAEgPLPCgYU751.png"}),l(),f,O,Q,V,s(t,{alt:"图片99.png",src:"https://s0.lgstatic.com/i/image6/M00/26/28/Cgp9HWBar5qAQ8kxAAB6_MghZFM405.png"}),l(),L,U,s(t,{alt:"图片9.png",src:"https://s0.lgstatic.com/i/image6/M01/26/25/CioPOWBar6SAU6wQAAFdYOUQcEQ336.png"}),l(),N,s(t,{alt:"图片11.png",src:"https://s0.lgstatic.com/i/image6/M01/26/29/Cgp9HWBar7CAPY7AAAGALPdbIwo406.png"}),l(),R,Y,v,F,s(t,{alt:"图片12.png",src:"https://s0.lgstatic.com/i/image6/M01/26/25/CioPOWBar76AYECLAAKiRTkN46w430.png"}),l(),H,s(t,{alt:"图片13.png",src:"https://s0.lgstatic.com/i/image6/M01/26/25/CioPOWBar8mAA3X_AAFbifYRYio573.png"}),l(),w,s(t,{alt:"图片14.png",src:"https://s0.lgstatic.com/i/image6/M01/26/25/CioPOWBar9OAT7iIAADpMfE3-dw738.png"}),l(),j,J,K,z,s(t,{alt:"图片15.png",src:"https://s0.lgstatic.com/i/image6/M01/26/25/CioPOWBar92AAT0jAAHYZ6NDKjQ113.png"}),l(),$,X,s(t,{alt:"图片18.png",src:"https://s0.lgstatic.com/i/image6/M01/26/25/CioPOWBar-qACeUjAALQjoYzEvE265.png"}),l(),Z,s(t,{alt:"图片16.png",src:"https://s0.lgstatic.com/i/image6/M01/26/29/Cgp9HWBar_SAOTw9AAFxRASYnnE809.png"}),l(),G,nn,s(t,{alt:"图片19.png",src:"https://s0.lgstatic.com/i/image6/M01/26/26/CioPOWBar_6AXJmYAAK3pfImZs4903.png"}),l(),ln,s(t,{alt:"图片17.png",src:"https://s0.lgstatic.com/i/image6/M01/26/29/Cgp9HWBasAmAO9LnAAFiqbTOxTs071.png"}),l(),tn,sn,s(t,{alt:"图片20.png",src:"https://s0.lgstatic.com/i/image6/M00/26/26/CioPOWBasBOAY3wPAALTmvi2q7s202.png"}),l(),en,on,an,pn,cn])}const bn=o(c,[["render",rn]]);export{mn as __pageData,bn as default};
