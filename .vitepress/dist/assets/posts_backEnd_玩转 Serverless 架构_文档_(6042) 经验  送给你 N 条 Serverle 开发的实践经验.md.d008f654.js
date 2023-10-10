import{_ as a,j as n,o as l,g as o,k as p,h as e,Q as t,s as r}from"./chunks/framework.cfb14fe0.js";const S=JSON.parse('{"title":"经验送给你N条Serverle开发的实践经验","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/玩转 Serverless 架构_文档/(6042) 经验  送给你 N 条 Serverle 开发的实践经验.md","filePath":"posts/backEnd/玩转 Serverless 架构_文档/(6042) 经验  送给你 N 条 Serverle 开发的实践经验.md","lastUpdated":1696682708000}'),c={name:"posts/backEnd/玩转 Serverless 架构_文档/(6042) 经验  送给你 N 条 Serverle 开发的实践经验.md"},E=t(`<h1 id="经验送给你n条serverle开发的实践经验" tabindex="-1">经验送给你N条Serverle开发的实践经验 <a class="header-anchor" href="#经验送给你n条serverle开发的实践经验" aria-label="Permalink to &quot;经验送给你N条Serverle开发的实践经验&quot;">​</a></h1><p>今天我想和你分享自己在工作中总结的一些 Serverless 实践经验。</p><p>我在开篇词中提到，Serverless 比较新，还处于飞速发展的阶段，业界对 Serverless 的经验输出还比较少，更不用说大型项目的实践经验了。这让很多同学在用 Serverless 时无经验可循，在架构设计和代码开发时很容易踩坑。</p><p>虽然我在 09~14 中从性能、安全、成本几个角度带你详细了解了 Serverless 的实践经验，但是并没有全面总结过这些内容，所以在&quot;开发进阶篇&quot;的最后一讲，我想从这几个角度，对前面的知识点做个总结，提炼出 Serverless 应用开发的最佳实践，让你&quot;温故而知新&quot;。</p><h3 id="怎么提升开发质量" tabindex="-1">怎么提升开发质量 <a class="header-anchor" href="#怎么提升开发质量" aria-label="Permalink to &quot;怎么提升开发质量&quot;">​</a></h3><p>怎么提升开发质量，让应用代码更 Serverless 化？我提炼了 7 条经验。</p><ul><li><strong>使用代码描述基础设施</strong></li></ul><p>在使用 Serverless 时，你经常会用到很多云服务，比如网关、VPC、数据库、角色权限等，如果每次手动去控制台创建这些云服务资源，很容易出错，还不方便扩展。所以建议你用代码的方式描述这些资源，这样当代码更新时也能同步更新云资源，这种技术方案也被称为&quot;基础设施即代码（Infrastructure as Code，IaC）&quot;。基于 IaC，你可以很方便地自动化管理云资源（包括创建、更新和删除）。</p><p>比较流行的开源的 IaC 方案是 <a href="https://www.terraform.io/" target="_blank" rel="noreferrer">terraform</a>，它支持 AWS、Google Cloud、阿里云等多种云平台，另外云厂商也会有自己的 IaC 能力，比如 AWS <a href="https://aws.amazon.com/cn/serverless/sam/" target="_blank" rel="noreferrer">SAM</a> 和阿里云<a href="https://www.aliyun.com/product/ros" target="_blank" rel="noreferrer">资源编排</a>：</p><ol><li><p>如果业务中使用多云，建议你用 terraform；</p></li><li><p>如果你主要用国内的云（比如阿里云），使用资源编排更方便，因为 terraform 没有国内源，国内云厂商对其支持也没有国外云厂商完善。</p></li></ol><ul><li><strong>将业务逻辑抽离到入口函数之外</strong></li></ul><p>在入口函数中只应该处理函数参数，不应该处理业务逻辑。把业务逻辑抽离到入口函数之外，可以降低代码和云服务的耦合度，并且入口函数之外的代码还能在容器重用时被重复利用，不用重新初始化（这一点是我在&quot;03｜基础入门：编写你的第一个 Serverless 应用&quot;和&quot;08｜单元测试：Serverless 应用如何进行单元测试？&quot;中反复提及的）。</p><p>好的例子：</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// 初始化数据库连接</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">connection</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">await</span><span style="color:#E1E4E8;"> mysql.</span><span style="color:#B392F0;">createConnection</span><span style="color:#E1E4E8;">({host:</span><span style="color:#9ECBFF;">&#39;localhost&#39;</span><span style="color:#E1E4E8;">, user: </span><span style="color:#9ECBFF;">&#39;root&#39;</span><span style="color:#E1E4E8;">, database: </span><span style="color:#9ECBFF;">&#39;test&#39;</span><span style="color:#E1E4E8;">});</span></span>
<span class="line"><span style="color:#6A737D;">// 查询用户信息</span></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">getUser</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">name</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> [</span><span style="color:#79B8FF;">rows</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">fields</span><span style="color:#E1E4E8;">] </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">await</span><span style="color:#E1E4E8;"> connection.</span><span style="color:#B392F0;">execute</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;SELECT * FROM \`table\` WHERE \`name\` = ?&#39;</span><span style="color:#E1E4E8;">, [name]);</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> rows;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#79B8FF;">exports</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">handler</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">async</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">event</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">callback</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">name</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> event.user.name;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">res</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">await</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">getUser</span><span style="color:#E1E4E8;">(name);</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> res;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// 初始化数据库连接</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">connection</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">await</span><span style="color:#24292E;"> mysql.</span><span style="color:#6F42C1;">createConnection</span><span style="color:#24292E;">({host:</span><span style="color:#032F62;">&#39;localhost&#39;</span><span style="color:#24292E;">, user: </span><span style="color:#032F62;">&#39;root&#39;</span><span style="color:#24292E;">, database: </span><span style="color:#032F62;">&#39;test&#39;</span><span style="color:#24292E;">});</span></span>
<span class="line"><span style="color:#6A737D;">// 查询用户信息</span></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">getUser</span><span style="color:#24292E;">(</span><span style="color:#E36209;">name</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> [</span><span style="color:#005CC5;">rows</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">fields</span><span style="color:#24292E;">] </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">await</span><span style="color:#24292E;"> connection.</span><span style="color:#6F42C1;">execute</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;SELECT * FROM \`table\` WHERE \`name\` = ?&#39;</span><span style="color:#24292E;">, [name]);</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> rows;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#005CC5;">exports</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">handler</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">async</span><span style="color:#24292E;"> (</span><span style="color:#E36209;">event</span><span style="color:#24292E;">, </span><span style="color:#E36209;">callback</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">name</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> event.user.name;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">res</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">await</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">getUser</span><span style="color:#24292E;">(name);</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> res;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>不好的例子：</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#79B8FF;">exports</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">handler</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">async</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">event</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">callback</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">name</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> event.user.name;</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#6A737D;">// 初始化数据库连接</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">connection</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">await</span><span style="color:#E1E4E8;"> mysql.</span><span style="color:#B392F0;">createConnection</span><span style="color:#E1E4E8;">({host:</span><span style="color:#9ECBFF;">&#39;localhost&#39;</span><span style="color:#E1E4E8;">, user: </span><span style="color:#9ECBFF;">&#39;root&#39;</span><span style="color:#E1E4E8;">, database: </span><span style="color:#9ECBFF;">&#39;test&#39;</span><span style="color:#E1E4E8;">});</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 查询用户信息</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> [</span><span style="color:#79B8FF;">rows</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">fields</span><span style="color:#E1E4E8;">] </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">await</span><span style="color:#E1E4E8;"> connection.</span><span style="color:#B392F0;">execute</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;SELECT * FROM \`table\` WHERE \`name\` = ?&#39;</span><span style="color:#E1E4E8;">, [name]);</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> rows;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#005CC5;">exports</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">handler</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">async</span><span style="color:#24292E;"> (</span><span style="color:#E36209;">event</span><span style="color:#24292E;">, </span><span style="color:#E36209;">callback</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">name</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> event.user.name;</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#6A737D;">// 初始化数据库连接</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">connection</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">await</span><span style="color:#24292E;"> mysql.</span><span style="color:#6F42C1;">createConnection</span><span style="color:#24292E;">({host:</span><span style="color:#032F62;">&#39;localhost&#39;</span><span style="color:#24292E;">, user: </span><span style="color:#032F62;">&#39;root&#39;</span><span style="color:#24292E;">, database: </span><span style="color:#032F62;">&#39;test&#39;</span><span style="color:#24292E;">});</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 查询用户信息</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> [</span><span style="color:#005CC5;">rows</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">fields</span><span style="color:#24292E;">] </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">await</span><span style="color:#24292E;"> connection.</span><span style="color:#6F42C1;">execute</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;SELECT * FROM \`table\` WHERE \`name\` = ?&#39;</span><span style="color:#24292E;">, [name]);</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> rows;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>你可以看到，在不好的例子中，初始化数据库连接的业务逻辑就放在了入口函数中，这样不利于代码维护。</p><ul><li><strong>函数单一职责</strong></li></ul><p>每个函数只负责一件事情，这样才更方便扩展。比如，你的函数里面有 switch 语句，那就说明你的函数不是单一职责，一个函数负责多件事情的问题在于：扩展时会扩展多个业务功能，而不是单一功能，这样会浪费资源。函数职责单一后，方便你对其编写单源测试，这涉及 08 讲的内容。</p><ul><li><strong>函数不能调用其他函数</strong></li></ul><p>我看到很多经验不足的同学经常在一个函数中调用另一个函数，这样做会让函数执行成本翻倍，还会导致函数间逻辑耦合。函数与函数间的调用，本质上是函数通信问题，如果两个函数需要通信，我建议你使用消息队列或事件总线等方案。</p><ul><li><strong>为异步函数设置调用目标</strong></li></ul><p>异步函数执行过程是异步的，你无法立即知道执行结果，所以要为异步函数设置异步调用目标，以保存执行结果，并对异常情况进行处理。关于函数的异步调用以及调用目标，我在&quot;04 | 运行原理： Serverless 应用是怎么运行的？&quot;中提及过。</p><ul><li><strong>编写详细的测试用例</strong></li></ul><p>测试是保障应用质量和稳定性的重要手段，所以建议你为应用编写详细的单元测试和集成测试（关于怎么编写单元测试，我在 08 讲中也详细讲解了）。</p><ul><li><strong>避免使用基于连接的服务</strong></li></ul><p>基于连接的服务主要是 RDS 数据库等，建立连接会带来额外的冷启动耗时，并且要在内存中维护连接池。</p><p>Serverless 应用由于无状态的特点，并不适合使用连接，因为代码执行完毕后运行环境就会被销毁，所以可能经常要初始化连接，它比较适合的是使用服务，比如直接通过 Restful API 去访问数据库等服务，这也是为什么 DynamoDB、表格存储等在 Serverless 中很受欢迎。</p><h3 id="怎么提升应用性能" tabindex="-1">怎么提升应用性能 <a class="header-anchor" href="#怎么提升应用性能" aria-label="Permalink to &quot;怎么提升应用性能&quot;">​</a></h3><p>作为开发者，我们肯定不满足只完成业务功能，在完成基本代码开发后，还会关注应用性能，毕竟性能越好，用户体验也就越好。所以我总结了提升应用性能的 5 条建议。</p><ul><li><strong>为函数设置合适的内存大小</strong></li></ul><p>函数执行所需内存是预先指定的。通常在一定范围内，内存越大执行速度越快，但到达某个阈值后，内存增长就不会再带来性能的增长了。并且随着内存增加，代码执行所消耗的成本也是线性增加的。</p><p>所以你要为函数选择合适的内存，你可以通过链路追踪或一些开源产品分析函数性能并找到最佳内存，具体怎么分析和确定最佳内存，我在 &quot;09｜性能优化：如何提升 Serverless 应用的性能？&quot;中提到过。</p><ul><li><strong>选择合适的编程语言</strong></li></ul><p>不同编程语言的运行性能有所不同。通常来说，Node.js、Python 等解释型语言会比 Java、.NET 等编译型语言性能更好，主要是编译型语言冷启动耗时更长。并且函数执行时间越长，成本也越高。</p><p>所以，如果你的应用对延迟非常敏感，容易引发频繁的冷启动，建议你选择解释型语言。如果应用对性能要求不高，也没有流量波峰波谷，建议你选择最熟悉的编程语言。</p><ul><li><strong>优化代码</strong></li></ul><p>影响函数性能的因素主要有冷启动和代码逻辑及其依赖。虽然不同业务代码逻辑不同，但一些优化方案是通用的，主要就是利用容器重用，最大程度减少冷启动与代码初始化耗时，比如：</p><ul><li><p>初始化后，将代码中引用到的任何外部配置或依赖性存储下来；</p></li><li><p>减少每次调用时变量、对象的重新初始化，比如可以通过全局变量、静态变量、单例等来实现；</p></li><li><p>重复利用上次函数调用期间建立的连接，如 HTTP、数据库等。</p></li><li><p><strong>使用链路追踪分析应用性能</strong></p></li></ul><p>为了了解应用中各个组件（包括一个或多个函数以及依赖的服务）的性能，建议你使用链路追踪去分析应用的性能，通过链路追踪可以观察函数冷启动和代码执行各个阶段的执行时间，通过适当的配置后，还能追踪各个依赖项执行耗时。大部分云厂商也都有自己的链路追踪服务，比如 AWS X-Ray 和阿里云链路追踪，此外也还有一些开源的链路追踪产品。如果你没有定制化需求，我比较推荐你直接使用云厂商提供的链路追踪云服务，因为云厂商自己的产品通常配套使用更方便。</p><ul><li><strong>减小代码的体积</strong></li></ul><p>代码体积越小，冷启动耗时越短，函数性能越高。代码体积包括我们编写的代码以及代码依赖，在部署函数时需要将代码和依赖打包部署到 Serverless FaaS 平台。通常 FaaS 平台都对函数代码都有大小限制，一般为 50MB，因为体积越大冷启动耗时越长。所以建议你精简代码体积，尤其是精简依赖的大小，要避免部署不必要的依赖。比如 Node.js 应用，你可以使用 Webpack 来精简代码及依赖的体积。</p><h3 id="怎么增强系统稳定性" tabindex="-1">怎么增强系统稳定性 <a class="header-anchor" href="#怎么增强系统稳定性" aria-label="Permalink to &quot;怎么增强系统稳定性&quot;">​</a></h3><p>对线上应用来说，稳定性甚至比性能更重要。应用不稳定，性能再好也没用。当然，基于 Serverless 的应用，云厂商会负责计算、网络、存储等资源的稳定性，并且应用本身具备自动弹性伸缩能力，所以你面临的稳定性挑战要比传统应用少很多。但你还是可以通过架构上的一些优化，进一步提升应用稳定性。</p><ul><li><strong>通过多地域部署实现多地域容灾</strong></li></ul><p>如果你的应用对可用性要求很高，你可以多地域部署应用，这样一个地域服务不可用，可以切换到其他地域。此外你的应用也可能因法律合规要求，必须多地域部署，比如你的应用即有美国用户也有中国用户，美国的数据不允许存储在中国，你就要在美国也部署应用。</p><p>多地域部署的复杂性主要在于：函数以及依赖的各种云服务都要多地域部署。比如你的应用依赖了数据库，则在美国部署应用，函数、触发器和数据库等都必须部署在美国。如果手动维护这些资源，就变得很麻烦，所以我建议你用 IaC 的方式来管理云上资源。</p><ul><li><strong>通过多可用区实现单地域高可用</strong></li></ul><p>一个地域通常会有多个可用区。假设你的应用部署在公网，没有使用 VPC，函数实例就是分布在多个可用区的，FaaS 平台可能在任意一个可用区执行你的函数。但如果你使用 VPC，则执行函数的可用区取决于其交换机对应的可用区。一个 VPC 可以创建多个交换机，每个交换机只能指定一个可用区，函数通过交换机来访问其他服务。所以在 VPC 内的函数，如果要实现高可用，建议你为函数指定多个不同可用区的交换机。这样一个可用区出故障，函数还可以在其他可用区执行。</p><ul><li><strong>使用日志服务记录应用日志</strong></li></ul><p>日志是我们监控应用运行状态和排查问题的重要依据。传统应用是部署在服务器上的，你可以登录服务器查看日志。但 Serverless 应用屏蔽了服务器，所以就要使用云厂商提供的日志服务来集中记录应用日志，比如 AWS CloudWatch Logs、阿里云日志服务。通过日志服务，可以更方便进行日志索引、查询和处理。</p><p>对于 Restful API，建议你针对每个请求和响应都打印日志，这样更方便排查问题。</p><ul><li><strong>设定应用指标和监控</strong></li></ul><p>除了基本的业务指标外，Serverless 应用的指标还包括函数调用次数、执行时间、代码出错次数等，你需要为这些指标设置监控报警。</p><h3 id="怎么保障应用安全" tabindex="-1">怎么保障应用安全 <a class="header-anchor" href="#怎么保障应用安全" aria-label="Permalink to &quot;怎么保障应用安全&quot;">​</a></h3><p>关于如何提升 Serverless 应用的安全性，我在 &quot;11｜安全生产（一）：Serverless 安全的主要风险是什么？&quot;和 &quot;12 | 安全生产（二）：如何提高 Serverless 应用的安全性？&quot;中详细地带你了解过了，这里我想再强调一些重点内容，并对其他同学容易出现的问题简单说明和补充一下。</p><ul><li><strong>不要相信任何用户输入</strong></li></ul><p>由于 Serverless 的输入源更多，不仅包含用户输入，还有触发器输入，所以攻击方式和手段越来越多也越复杂，所以你不能相信任何用户输入，建议你过滤任何的用户输入。</p><ul><li><strong>正确地处理程序异常</strong></li></ul><p>虽然 Serverless 函数的声明周期通常很短暂，执行完毕就释放，可以降低程序异常带来的风险。但仍然建议你正确处理程序的异常，并且在生产环境中避免打印错误栈，不然日志泄漏后可能会带来安全隐患。</p><ul><li><strong>对云上敏感数据进行加密</strong></li></ul><p>为了避免数据泄漏，建议你对云上的存储的敏感数据以及需要传输的敏感数据进行加密，比如数据库账号秘密、机密文件等。</p><ul><li><strong>为用户和角色配置最小的权限</strong></li></ul><p>你的云账号下可能会有多个子用户和角色，建议你为用户和角色配置最小的权限，这样不仅可以避免用户或角色越权，还可以减少访问凭证泄漏后的风险。</p><ul><li><strong>为函数设置最小执行权限</strong></li></ul><p>为了避免函数权限过大访问不必要的云服务，带来安全风险，所以要为函数设置最小的执行权限。</p><ul><li><strong>在代码中使用临时访问凭证</strong></li></ul><p>你的代码中不应该使用任何长期的访问凭证，而应该使用函数执行角色的临时访问凭证。临时访问凭证可以直接从执行上下文中获取，比如：</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#79B8FF;">module</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">exports</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">handler</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">event</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">context</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">callback</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 获取临时访问凭证</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">accessKeyId</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> context.credentials.accessKeyId;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">accessKeySecret</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> context.credentials.accessKeySecret;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">securityToken</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> context.credentials.securityToken;</span></span>
<span class="line"><span style="color:#E1E4E8;">};</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#005CC5;">module</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">exports</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">handler</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> (</span><span style="color:#E36209;">event</span><span style="color:#24292E;">, </span><span style="color:#E36209;">context</span><span style="color:#24292E;">, </span><span style="color:#E36209;">callback</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 获取临时访问凭证</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">accessKeyId</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> context.credentials.accessKeyId;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">accessKeySecret</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> context.credentials.accessKeySecret;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">securityToken</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> context.credentials.securityToken;</span></span>
<span class="line"><span style="color:#24292E;">};</span></span></code></pre></div><ul><li><strong>记录云上操作及资源变化</strong></li></ul><p>为了方便排查问题、监控资源变化和资源配置变更，建议你使用操作审计和配置审计监控来监控云上操作及资源变化。</p><h3 id="怎么优化应用成本" tabindex="-1">怎么优化应用成本 <a class="header-anchor" href="#怎么优化应用成本" aria-label="Permalink to &quot;怎么优化应用成本&quot;">​</a></h3><p>作为团队 Leader，在进行技术选型时，除了要考虑开发效率、应用性能、稳定性和安全性几个方面，还要考虑技术成本。毕竟大部分情况下，我们开发的软件最终都是要追求商业价值。所以我在&quot;13｜成本优化：Serverless 真的省钱吗？&quot;这一讲中专门讲了成本相关的话题，这里我再重点总结其中的 5 条建议。</p><ul><li><strong>提升函数性能</strong></li></ul><p>因为 Serverless 应用是按执行次数和执行时消耗的内存等资源计费。因此函数性能越高，执行时间越短，成本也就越低。</p><ul><li><strong>为函数设置超时时间</strong></li></ul><p>为了避免函数因异常而无限运行，所以要为函数设置超时时间。因为 FaaS 是按执行时间计费的，函数执行时间越长费用越多，为函数设置合适的超时时间，可以避免产生不必要的费用。</p><ul><li><strong>选择合适的云服务</strong></li></ul><p>Serverless 应用往往依赖很多云服务，比如事件源、消息队列、数据库等，根据你的应用需求，比如请求规模、数据量、延迟等，使用不同云服务的架构总成本，不同云服务的成本可能会有较大差异。在进行架构设计时，要综合考虑应用需求与成本，进而决定使用何种云服务。比如数据库，通常 MySQL 数据库没有自动伸缩能力，而表格存储可以自动扩容，且 MySQL 是按实例付费，而表格存储是按请求量付费，所以对于请求量比较小的业务，选择表格存储成本更低。</p><ul><li><strong>选择合适的计费方式</strong></li></ul><p>通常 FaaS 平台的付费方式有按量付费和预付费。按量付费就是按实际函数执行次数和消耗的资源计费，预付费则与传统付费方式类似，预先支付费用购买资源生成函数实例。你可以根据应用特点选择合适的付费方式。比如你的应用流量具有周期性，有时候流量很大，有时候流量又很少，这时就适合按量付费。如果你的应用流量一直很平稳，则预付费可能成本更低。</p><ul><li><strong>关注 FaaS 和 BaaS 等云服务的总成本</strong></li></ul><p>对 Serverless 应用进行成本分析很容易陷入的误区就是，只考虑了 FaaS 的成本而忽略了 BaaS 的成本。所以你在进行成本分析和成本优化时，一定要将应用运行所依赖的 FaaS 和 BaaS 以及其他云服务都包含在内。</p><h3 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h3><p>这一讲我分享了在开发 Serverless 应用过程中的一些实践经验。</p><ul><li><p><strong>开发：</strong> 你需要根据 Serverless 应用的特点，按照 Serverless 的思维编写 Serverless 代码。</p></li><li><p><strong>性能：</strong> Serverless 的性能优化核心在于减少冷启动耗时。</p></li><li><p><strong>稳定性：</strong> 你可以通过多地域多可用区部署进一步提升稳定性，并通过日志服务等记录应用日志并配置监控报警指标。</p></li><li><p><strong>安全：</strong> Serverless 应用的安全风险主要是攻击面和攻击方式越来越复杂，所以需要对用户输入进行过滤、对云上数据进行加密、对用户和角色权限进行管控、对资源操作和变更进行监控。</p></li><li><p><strong>成本：</strong> Serverless 的成本包括 FaaS 成本以及依赖的云服务成本，你可以从这两方面进一步进行成本优化。</p></li></ul>`,86),y=r("p",null,"最后，关于如何更好地进行 Serverless 应用开发，我也还在持续探索中，所以这一讲的作业是：你还知道哪些 Serverless 的实践经验呢？欢迎在留言区分享，我们下一讲见。",-1);function i(u,F,d,g,v,h){const s=n("Image");return l(),o("div",null,[E,p(s,{alt:"Serverless 实践经验 - 竖-01.png",src:"https://s0.lgstatic.com/i/image6/M00/02/2C/Cgp9HWAc-YOAWaxcAAYd9jKtOg0867.png"}),e(),y])}const A=a(c,[["render",i]]);export{S as __pageData,A as default};
