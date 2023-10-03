import{_ as s,o as a,g as n,Q as p}from"./chunks/framework.f949202b.js";const g=JSON.parse('{"title":"DNS 解析优化 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/Android 工程师进阶 34 讲_文档/(1887) 第33讲：对于网络编程，你做过哪些优化？.md","filePath":"posts/frontEnd/Android 工程师进阶 34 讲_文档/(1887) 第33讲：对于网络编程，你做过哪些优化？.md","lastUpdated":null}'),l={name:"posts/frontEnd/Android 工程师进阶 34 讲_文档/(1887) 第33讲：对于网络编程，你做过哪些优化？.md"},e=p(`<p>我们知道网络请求操作是一个 App 的重要组成部分，程序大多数问题都和网络请求有关。这节课我们就来聊聊我在平时开发过程中对于网络优化所做的一些尝试。</p><p>使用 OkHttp 框架后，我们可以通过 EventListener 来查看一次网络请求的详细情况，一次完整的网络请求会包含以下几个步骤：</p><div class="language-java vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">,</span><span style="color:#79B8FF;">000</span><span style="color:#E1E4E8;"> callStart</span></span>
<span class="line"><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">,</span><span style="color:#79B8FF;">027</span><span style="color:#E1E4E8;"> dnsStart</span></span>
<span class="line"><span style="color:#79B8FF;">5</span><span style="color:#E1E4E8;">,</span><span style="color:#79B8FF;">189</span><span style="color:#E1E4E8;"> dnsEnd</span></span>
<span class="line"><span style="color:#79B8FF;">5</span><span style="color:#E1E4E8;">,</span><span style="color:#79B8FF;">359</span><span style="color:#E1E4E8;"> secureConnectStart</span></span>
<span class="line"><span style="color:#79B8FF;">5</span><span style="color:#E1E4E8;">,</span><span style="color:#79B8FF;">907</span><span style="color:#E1E4E8;"> secureConnectEnd</span></span>
<span class="line"><span style="color:#79B8FF;">5</span><span style="color:#E1E4E8;">,</span><span style="color:#79B8FF;">910</span><span style="color:#E1E4E8;"> connectEnd</span></span>
<span class="line"><span style="color:#79B8FF;">5</span><span style="color:#E1E4E8;">,</span><span style="color:#79B8FF;">921</span><span style="color:#E1E4E8;"> connectionAcquired</span></span>
<span class="line"><span style="color:#79B8FF;">5</span><span style="color:#E1E4E8;">,</span><span style="color:#79B8FF;">925</span><span style="color:#E1E4E8;"> requestHeadersStart</span></span>
<span class="line"><span style="color:#79B8FF;">5</span><span style="color:#E1E4E8;">,</span><span style="color:#79B8FF;">930</span><span style="color:#E1E4E8;"> requestHeadersEnd</span></span>
<span class="line"><span style="color:#79B8FF;">5</span><span style="color:#E1E4E8;">,</span><span style="color:#79B8FF;">938</span><span style="color:#E1E4E8;"> responseHeadersStart</span></span>
<span class="line"><span style="color:#79B8FF;">6</span><span style="color:#E1E4E8;">,</span><span style="color:#79B8FF;">181</span><span style="color:#E1E4E8;"> responseHeadersEnd</span></span>
<span class="line"><span style="color:#79B8FF;">6</span><span style="color:#E1E4E8;">,</span><span style="color:#79B8FF;">189</span><span style="color:#E1E4E8;"> responseBodyEnd</span></span>
<span class="line"><span style="color:#79B8FF;">6</span><span style="color:#E1E4E8;">,</span><span style="color:#79B8FF;">233</span><span style="color:#E1E4E8;"> connectionReleased</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#005CC5;">0</span><span style="color:#24292E;">,</span><span style="color:#005CC5;">000</span><span style="color:#24292E;"> callStart</span></span>
<span class="line"><span style="color:#005CC5;">0</span><span style="color:#24292E;">,</span><span style="color:#005CC5;">027</span><span style="color:#24292E;"> dnsStart</span></span>
<span class="line"><span style="color:#005CC5;">5</span><span style="color:#24292E;">,</span><span style="color:#005CC5;">189</span><span style="color:#24292E;"> dnsEnd</span></span>
<span class="line"><span style="color:#005CC5;">5</span><span style="color:#24292E;">,</span><span style="color:#005CC5;">359</span><span style="color:#24292E;"> secureConnectStart</span></span>
<span class="line"><span style="color:#005CC5;">5</span><span style="color:#24292E;">,</span><span style="color:#005CC5;">907</span><span style="color:#24292E;"> secureConnectEnd</span></span>
<span class="line"><span style="color:#005CC5;">5</span><span style="color:#24292E;">,</span><span style="color:#005CC5;">910</span><span style="color:#24292E;"> connectEnd</span></span>
<span class="line"><span style="color:#005CC5;">5</span><span style="color:#24292E;">,</span><span style="color:#005CC5;">921</span><span style="color:#24292E;"> connectionAcquired</span></span>
<span class="line"><span style="color:#005CC5;">5</span><span style="color:#24292E;">,</span><span style="color:#005CC5;">925</span><span style="color:#24292E;"> requestHeadersStart</span></span>
<span class="line"><span style="color:#005CC5;">5</span><span style="color:#24292E;">,</span><span style="color:#005CC5;">930</span><span style="color:#24292E;"> requestHeadersEnd</span></span>
<span class="line"><span style="color:#005CC5;">5</span><span style="color:#24292E;">,</span><span style="color:#005CC5;">938</span><span style="color:#24292E;"> responseHeadersStart</span></span>
<span class="line"><span style="color:#005CC5;">6</span><span style="color:#24292E;">,</span><span style="color:#005CC5;">181</span><span style="color:#24292E;"> responseHeadersEnd</span></span>
<span class="line"><span style="color:#005CC5;">6</span><span style="color:#24292E;">,</span><span style="color:#005CC5;">189</span><span style="color:#24292E;"> responseBodyEnd</span></span>
<span class="line"><span style="color:#005CC5;">6</span><span style="color:#24292E;">,</span><span style="color:#005CC5;">233</span><span style="color:#24292E;"> connectionReleased</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><p>也就是说一次网络请求的操作是从 DNS 解析开始的，然后建立连接并发送数据到服务端，随后读取从服务端返回的数据，最后将连接释放，一次网络请求操作也就结束了。接下来我们就从 DNS 解析开始分析都有哪些方面可以做进一步的优化。</p><h3 id="dns-解析优化" tabindex="-1">DNS 解析优化 <a class="header-anchor" href="#dns-解析优化" aria-label="Permalink to &quot;DNS 解析优化&quot;">​</a></h3><h4 id="安全方面" tabindex="-1">安全方面 <a class="header-anchor" href="#安全方面" aria-label="Permalink to &quot;安全方面&quot;">​</a></h4><p>首先是防劫持，我们可以考虑使用 HttpDns。这里需要注意 HttpDns 只是一个概念，并不是一个现有的开源库。它与传统的 DNS 解析的区别在于 HttpDns 会绕过运营商的 DNS 服务器，直接与 DNS 服务器的 80 端口进行交互，有效地防止了域名劫持。</p><p>目前业内主要由第三方厂商提供实现了 HttpDns 的 SDK，比较普及的是阿里云和腾讯云的 HttpDns Service。但是这两者的使用具有一定的成本：开发者需要在它们的平台注册并获取开发者 key，并且部分服务是收费的。比如关于阿里提供的 SDK 的详细集成步骤可以参考官方介绍：<a href="https://github.com/aliyun/alicloud-android-demo/tree/master/httpdns_android_demo" target="_blank" rel="noreferrer">阿里云HttpDns Demo APP Android版</a>。</p><p>对于普通开发者而言，可以考虑使用七牛云提供的免费的 happy-dns。实现也比较简单，因为 OkHttp 已经预留了设置 Dns 的接口，如下所示：</p><p><img src="https://s0.lgstatic.com/i/image/M00/31/E8/CgqCHl8NWruAKGDtAAKZ0jnzg3Q313.png" alt="Drawing 0.png"></p><p>在接口 Dns 中只有一个方法需要实现------lookup，这个方法返回查找到的服务器地址集合。并且 OkHttp 已经实现了一个默认的 DNS 解析器，也就是图中红框标识的 SYSTEM，它使用 java net 包中的 InetAddress 获取某域名的 IP 地址集合。</p><p>我们可以实现 Dns 接口，使用 Http 的请求方式实现自己的域名解析器，具体实现就是使用七牛云提供的 happy-dns SDK。首先需要添加依赖库：</p><p><img src="https://s0.lgstatic.com/i/image/M00/31/DD/Ciqc1F8NWseAT-qRAAGopWQJJdk020.png" alt="Drawing 1.png"></p><p>然后在自己实现的 Dns 类中，使用如下方式实现：</p><p><img src="https://s0.lgstatic.com/i/image/M00/31/DD/Ciqc1F8NWtiAcSarAAXhhcWSncY098.png" alt="Drawing 2.png"></p><p>这样我们就可以在安全方面做到防劫持的功能了。</p><h4 id="速度方面" tabindex="-1">速度方面 <a class="header-anchor" href="#速度方面" aria-label="Permalink to &quot;速度方面&quot;">​</a></h4><p>关于 DNS 解析的速度优化方面，我们可以从以下几个方面进行突破：</p><ul><li><strong>IP 直连方式</strong></li></ul><p>IP 直连方式经常会针对不同的开发环境使用，比如针对在 qa、staging 测试环境下，可以直接配置 IP 白名单，跳过 DNS 解析流程，但这样同样需要实现 OkHttp 的 Dns 接口，如下所示：</p><p><img src="https://s0.lgstatic.com/i/image/M00/31/E8/CgqCHl8NWuWAUVw8AARDZIMsUzQ440.png" alt="Drawing 3.png"></p><p>听说有的一线互联网公司也会在线上版本采用这种方式，但是这种方式开发成本较高。因为 IP 列表是维护在本地，因此需要建立一套 IP 地址的更新机制。另外 IP 直连方式摒弃了 HTTPS 的安全机制，由于 HTTPS 要求证书绑定域名，因此客户端需要增加额外的代码改造，具体参考：<a href="https://blog.csdn.net/github_34613936/article/details/51490032" target="_blank" rel="noreferrer">https信任证书的三种方式</a>。</p><ul><li><strong>DNS 解析超时</strong></li></ul><p>当我们在做网络请求时，如果网络设备切换路由，访问网络出现长时间无响应，很久之后会抛出 UnknownHostException，并且我们在 OkHttp 中设置的 connectTimeout 属性对 DNS 的解析不起作用。这种情况我们可以在自定义的 Dns 类中做超时判断，如下所示：</p><p><img src="https://s0.lgstatic.com/i/image/M00/31/DD/Ciqc1F8NWvCAUC-MAAOYHr_p3YA810.png" alt="Drawing 4.png"></p><p>更具体的分析可以参考：<a href="https://blog.csdn.net/quwei3930921/article/details/85336552" target="_blank" rel="noreferrer">Android笔记之解决OkHttp解析dns超时时间无法设置的问题</a>。</p><h3 id="网络请求缓存优化" tabindex="-1">网络请求缓存优化 <a class="header-anchor" href="#网络请求缓存优化" aria-label="Permalink to &quot;网络请求缓存优化&quot;">​</a></h3><p>实际上有时在做网络请求数据可达优化的时候，经常会不可避免地与本地持久化绑定在一起。比如当一次网络请求失败时，我们需要将这次请求保存在本地，并尝试重新发送；或者请求数据成功，我们需要将数据缓存在本地，当下一次请求数据展示 UI 之前，先将缓存中的数据展示到页面，只有当新的请求返回数据之后，再次刷新页面。</p><p>一般的做法是创建一个数据库 Entity 类，并根据自家公司的业务逻辑设置公共参数，通常都会有 user_id、更新时间 update_time 等，如下所示：</p><p><img src="https://s0.lgstatic.com/i/image/M00/31/E8/CgqCHl8NWvqAa6c6AAKHO9HwxlA228.png" alt="Drawing 5.png"></p><p>上图中 key 表示缓存的标识，插入请求都是根据 key 操作；value 字段用来保存网络请求的数据，当网络请求成功后，将数据以 JSON 字符串的格式缓存到数据库中，如下所示：</p><p><img src="https://s0.lgstatic.com/i/image/M00/31/E8/CgqCHl8NWwGAcwIKAAIvUFTgrIk684.png" alt="Drawing 6.png"></p><p>解释说明：</p><ul><li><p>图中 1 处构建 HttpDataCache 类，并设置公共参数；</p></li><li><p>图中 2 处将网络请求数据转化为 JSON 字符串格式；</p></li><li><p>图中 3 处执行数据库操作，将网络请求数据缓存到本地数据库中。</p></li></ul><p>后续当我们再次执行相同 key 的网络请求时，就可以先将本地数据库中的数据展示到页面，并进行异步请求操作刷新页面。</p><p><img src="https://s0.lgstatic.com/i/image/M00/31/E8/CgqCHl8NWwqAQMQlAAFFFewQO9M971.png" alt="Drawing 7.png"></p><h3 id="幂等性" tabindex="-1">幂等性 <a class="header-anchor" href="#幂等性" aria-label="Permalink to &quot;幂等性&quot;">​</a></h3><p>HTTP 方法的幂等性是指一次和多次请求某一个资源应该具有同样的副作用。举一个例子：当我们点外卖付款时，服务端扣款成功后发送给客户端一条扣款成功的消息，但是如果此时由于网络问题，客户端并没有成功接收到此消息，用户就有可能认为没有付款成功，甚至是尝试再次付款。</p><p>幂等性就是为了解决这种问题，但是它属于代码设计层面的技巧，并不是一个实体方法或者开源库。实现幂等性需要客户端和服务端协同合作实现。比如原始的付款方法如下：</p><div class="language-java vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">boolean</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">pay</span><span style="color:#E1E4E8;">(user_id, amount);</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">boolean</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">pay</span><span style="color:#24292E;">(user_id, amount);</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>上述方法代表从账户 user_id 中扣除 amount 数量的金额，多次操作就会造成同一个 user_id 账户被扣款多次。可以通过以下方式将付款方式实现幂等：</p><div class="language-java vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">create_pay_ticker</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#F97583;">boolean</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">idempotent_pay</span><span style="color:#E1E4E8;">(ticket_id, account_id, amount)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">int</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">create_pay_ticker</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#D73A49;">boolean</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">idempotent_pay</span><span style="color:#24292E;">(ticket_id, account_id, amount)</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>create_pay_ticket 的语义是获取一个服务器端生成的唯一的处理号 ticket_id，它将用于标识后续的操作。idempotent_pay 和 pay 的区别在于关联了一个 ticket_id，一个 ticket_id 表示的操作至多只会被处理一次，这样库款的操作就符合幂等性了，客户端就可以放心地多次调用。</p><p>实际上很多 HTTP 请求方法自身就符合幂等性，具体可以参考：<a href="https://www.cnblogs.com/weidagang2046/archive/2011/06/04/idempotence.html" target="_blank" rel="noreferrer">理解HTTP幂等性</a>。</p><h3 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h3><p>这节课主要介绍了平时我在项目中关于网络优化的几个方向，主要包含以下几点：</p><ol><li><p>DNS 解析优化，分安全性和速度提升两方面。</p></li><li><p>网络请求数据缓存，对于请求返回的数据需要缓存到本地数据库中。实际上，在某些场景中对于请求对象 Request 自身也需要做缓存操作。比如&quot;发送埋点&quot;的请求，这样请求失败就将其保存到本地数据库中，当 App 重启或者重新接收到连接网络的时候，重新尝试发送之前失败的请求。</p></li><li><p>最后向你介绍了幂等性，幂等性并不是一个非常大众化的概念，很多开发者甚至没有听说过这个概念。但是在网络架构设计中却是一个比较重要的原则。</p></li></ol><p>由于整个网络相关的知识体系太过庞大，无法在一篇文章中全部覆盖。后续如果有机会或许会重新出一个专题，主要针对性讲解 Android 网络相关知识。</p>`,48),o=[e];function t(r,c,i,d,E,y){return a(),n("div",null,o)}const h=s(l,[["render",t]]);export{g as __pageData,h as default};
