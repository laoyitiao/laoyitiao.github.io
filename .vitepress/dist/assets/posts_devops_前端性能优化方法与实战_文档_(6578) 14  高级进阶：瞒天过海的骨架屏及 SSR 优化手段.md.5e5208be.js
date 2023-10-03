import{_ as s,o as n,g as a,Q as p}from"./chunks/framework.f949202b.js";const m=JSON.parse('{"title":"使用骨架屏方案优化页面性能 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/devops/前端性能优化方法与实战_文档/(6578) 14  高级进阶：瞒天过海的骨架屏及 SSR 优化手段.md","filePath":"posts/devops/前端性能优化方法与实战_文档/(6578) 14  高级进阶：瞒天过海的骨架屏及 SSR 优化手段.md","lastUpdated":null}'),l={name:"posts/devops/前端性能优化方法与实战_文档/(6578) 14  高级进阶：瞒天过海的骨架屏及 SSR 优化手段.md"},e=p(`<p>前面我已经提到过，骨架屏和 SSR 在首屏优化方面有较好的效果，骨架屏可以使用户预期到接下来要展示的内容和结构，让用户觉得页面加载快了，而 SSR 则可以白屏时间大幅缩短。</p><p>那么具体该怎么实现骨架屏和 SSR 呢？在实际工作当中如何落地操作呢？这一讲我们就来详细介绍下。</p><h3 id="使用骨架屏方案优化页面性能" tabindex="-1">使用骨架屏方案优化页面性能 <a class="header-anchor" href="#使用骨架屏方案优化页面性能" aria-label="Permalink to &quot;使用骨架屏方案优化页面性能&quot;">​</a></h3><p>为了让骨架屏内容和页面结构更类似，提升用户体验，我们一般采用的是<strong>图片骨架屏</strong>。</p><h4 id="图片骨架屏的实现" tabindex="-1">图片骨架屏的实现 <a class="header-anchor" href="#图片骨架屏的实现" aria-label="Permalink to &quot;图片骨架屏的实现&quot;">​</a></h4><p>想要了解如何实现，我们先来看一下图片骨架屏的加载流程。在 App 业务功能设计时，设计师会针对这个页面制作一张离线包的图片，在 WebView 启动时，客户端把这张图片覆盖在页面上，页面开始进入请求资源的流程。当页面 WebView 加载完成或者前端页面通知客户端加载完成时，客户端通过渐变动画隐藏这张图片，将准备好的页面展现给用户。</p><p>所以，如果想要实现骨架屏，大致有这么几步。</p><p>第一步：先让 UI 设计师设计一张当前页面对应离线包的图，作为骨架屏展示图片。</p><p>第二步，在业务需求开发过程中，前端工程师拿到图后，把这张图片上传到 CDN 上面。</p><p>第三步，在客户端代码，增加启动时读取图片骨架屏的配置文件。如下面代码所示。</p><div class="language-java vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// 传入设备分辨率ratioWidth:400, ratioHeight:500</span></span>
<span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#9ECBFF;">&quot;code&quot;</span><span style="color:#F97583;">:</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#6A737D;">// code 是0 代表请求成功   -1 代表图片骨架屏功能关闭</span></span>
<span class="line"><span style="color:#9ECBFF;">&quot;data&quot;</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;m.58.com/enjoy-given/eg/index.html&quot;</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#9ECBFF;">&quot;rege&quot;</span><span style="color:#F97583;">:</span><span style="color:#9ECBFF;">&#39;#/content/index&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#9ECBFF;">&quot;routes&quot;</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#9ECBFF;">&quot;#/content/index&quot;</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#9ECBFF;">&quot;downloadUrl&quot;</span><span style="color:#F97583;">:</span><span style="color:#9ECBFF;">&#39;https://m.58.com/pic.png?400*500&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#9ECBFF;">&quot;imgName&quot;</span><span style="color:#F97583;">:</span><span style="color:#9ECBFF;">&#39;pic.png&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#9ECBFF;">&quot;id&quot;</span><span style="color:#F97583;">:</span><span style="color:#9ECBFF;">&#39;10001&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">		  }</span></span>
<span class="line"><span style="color:#E1E4E8;">	  } </span></span>
<span class="line"><span style="color:#E1E4E8;">	},</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">&quot;msg&quot;</span><span style="color:#F97583;">:</span><span style="color:#9ECBFF;">&quot;&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// 传入设备分辨率ratioWidth:400, ratioHeight:500</span></span>
<span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#032F62;">&quot;code&quot;</span><span style="color:#D73A49;">:</span><span style="color:#005CC5;">0</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#6A737D;">// code 是0 代表请求成功   -1 代表图片骨架屏功能关闭</span></span>
<span class="line"><span style="color:#032F62;">&quot;data&quot;</span><span style="color:#D73A49;">:</span><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;m.58.com/enjoy-given/eg/index.html&quot;</span><span style="color:#D73A49;">:</span><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#032F62;">&quot;rege&quot;</span><span style="color:#D73A49;">:</span><span style="color:#032F62;">&#39;#/content/index&#39;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#032F62;">&quot;routes&quot;</span><span style="color:#D73A49;">:</span><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#032F62;">&quot;#/content/index&quot;</span><span style="color:#D73A49;">:</span><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#032F62;">&quot;downloadUrl&quot;</span><span style="color:#D73A49;">:</span><span style="color:#032F62;">&#39;https://m.58.com/pic.png?400*500&#39;</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#032F62;">&quot;imgName&quot;</span><span style="color:#D73A49;">:</span><span style="color:#032F62;">&#39;pic.png&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#032F62;">&quot;id&quot;</span><span style="color:#D73A49;">:</span><span style="color:#032F62;">&#39;10001&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">		  }</span></span>
<span class="line"><span style="color:#24292E;">	  } </span></span>
<span class="line"><span style="color:#24292E;">	},</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">&quot;msg&quot;</span><span style="color:#D73A49;">:</span><span style="color:#032F62;">&quot;&quot;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div><p>首先是传入设备分辨率，比如 400 * 500，然后设置状态码 code。code 是 0 代表成功，-1 代表关闭图片骨架屏功能。 data 对象是具体的数据，m.58.com/enjoy-given/eg/index.html 是对应的页面 URL，骨架屏那个图片的地址是<a href="https://m.58.com/pic.png?400%5C*500%E3%80%82" target="_blank" rel="noreferrer">https://m.58.com/pic.png?400\\*500。</a></p><p>当用户打开 WebView 时，客户端对 URL 进行解析，取得该 URL 对应的 host 和pathname，然后将这两个数据分别与 data 和 routes 中的数据做比较。</p><p>如果都匹配上，说明要展示骨架屏，此时可根据 routes下面的 id 和 imgName 获取到对应的图片文件。当三个字符串拼起来，即zzSkeleton + id +imgName，就可获得最终的图片名字。其中 zzSkeleton 就是一个字符串， ID 我设置成 10001，imgName 表示具体的图片名称，比如代码中的 pic.png，最终图片名称为 &quot;zzSkeleton10001pic.pn&quot;。</p><p>在实现过程中要注意以下三点。</p><p>第一，注意区分首次使用和二次使用。首次使用的话，客户端遍历上述配置文件，下载数据中对应图片即可；二次使用时，需要拿当前的配置文件对比之前的配置文件，如果图片名称不同，需要下载新的图片。</p><p>第二，需要客户端在内存中建立图片，以加快图片骨架屏的加载速度。</p><p>第三，图片骨架屏展示过程中会出现拉伸问题。这是因为分辨率不同造成的，我们可以让 App</p><p>在获取配置文件时，加上当前页面的分辨率，这样接口会根据分辨率返回最合适的图片。</p><p>以上是具体的实现方案，在实际当中，我们该如何借助它来进行性能优化呢？</p><h4 id="使用及注意事项" tabindex="-1">使用及注意事项 <a class="header-anchor" href="#使用及注意事项" aria-label="Permalink to &quot;使用及注意事项&quot;">​</a></h4><p>首先<strong>骨架屏方案，非常适合资源加载时间长的页面</strong>，比如列表页的首屏内容有很多个数据接口、筛选项、精选数据、列表数据等，这时候一定要用骨架屏。而对于一些 SSR 页面，因为白屏阶段比较短，可用可不用。</p><p>骨架屏使用起来比较简单，前端工程师只要在开发项目时，让 UI 对应出一个骨架图的图片，然后上传到 CDN，并给出页面路径和文件路径，生成配置文件给客户端，客户端根据配置加载骨架屏即可。</p><p>不过在实操时需要注意两点：</p><ul><li><p>骨架屏中的内容结构，应该只是首屏的内容结构，不是整个页面的内容结构，反之会造成骨架图体积过大，加载骨架屏图片时间过长的问题；</p></li><li><p>骨架屏的问题，比如骨架屏代码异常加载时没有展示，或者展示时间过长，因为它不会影响白屏时间，我们很难发现。所以骨架屏什么时候展示和什么时候销毁，客户端要<strong>以日志形式记录</strong>下来，上传到性能监控平台，这样定期去看一下日志，则可以发现问题。</p></li></ul><h3 id="使用-ssr-方案优化页面性能" tabindex="-1">使用 SSR 方案优化页面性能 <a class="header-anchor" href="#使用-ssr-方案优化页面性能" aria-label="Permalink to &quot;使用 SSR 方案优化页面性能&quot;">​</a></h3><p>一般来说，一个 Web 页面的渲染主要由客户端或者浏览器端来完成，大致过程是：客户端先从服务端请求到 index.html，然后加载脚本文件，Web 应用通过 ajax 请求到页面数据，并把相应的数据填充到模板，最终形成完整的页面来呈现给用户。</p><p>SSR（Server Side Rende，服务端渲染） 则把数据请求（也就是前面提到 ajax 请求）放在了服务端，服务端收到返回结果时，把数据填充到模板形成完整的页面，由服务器端把渲染完成的完整页面返回给客户端。这样减少了一些客户端到服务器端的数据接口请求，加快了首屏展现速度。</p><h4 id="ssr-的实现及使用" tabindex="-1">SSR 的实现及使用 <a class="header-anchor" href="#ssr-的实现及使用" aria-label="Permalink to &quot;SSR 的实现及使用&quot;">​</a></h4><p>如何实现 SSR 呢？我们选用了 nuxt.js 方案。</p><p>为什么选择它？因为手机业务迭代开发速度比较快，我们希望将 SSR 开发的一些配置都能够封装起来，让前端工程师介入成本降低。由于目前业界移动端使用 Vue 的比较多，所以寻找能和它配套的方案可以大大降低接入成本。而 Nuxt.js 正是这种方案，它是一款基于 Vue 的 SSR 开源框架，使用 Webpack 和 Node.js 进行封装，其中预设了开发服务端渲染应用所需要的各种配置。</p><p>具体到开发方面，官网文档介绍得比较详细，通过脚手架 npx 即可创建一个项目，然后进入 service-life目录，运行npm run dev，即可看到页面效果。</p><div class="language-java vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">npx create</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">nuxt</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">app service</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">life</span></span>
<span class="line"><span style="color:#E1E4E8;">cd service</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">life</span></span>
<span class="line"><span style="color:#E1E4E8;">npm run dev</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">npx create</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">nuxt</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">app service</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">life</span></span>
<span class="line"><span style="color:#24292E;">cd service</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">life</span></span>
<span class="line"><span style="color:#24292E;">npm run dev</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>接下来我们来看如何在项目中接入 SSR 方案。因为移动端我们经常使用 Vue CSR ，和 Vue CSR 一致的地方（如 client 的 webpack 配置，项目基础结构等），在这里我就不过多介绍了，重点放在不同点上。</p><p>首先，一些基础要求要满足。一是如果没引入 Vuerouter、Vuex 和 axios，则需要引入，确保客户端拿到的数据和客户端一致。二是由于服务端也需要接收 URL，然后传递给 vue 程序进行处理，所以要做好跨平台的路由配置，具体可使用 Vuerouter。三是数据端也需要跨平台库，对应的技术是 axios + vuex。</p><p>其次，我们需要为 webpack 提供两个打包入口文件， client 端和 server 端各一份。</p><p>由于用户在客户端每次访问 vue 时，都是一个新的上下文，但在用户访问服务端时，用于服务端渲染的 Node.js 启动后就一直在运行。也就是说，每一个用户请求处理都在同一个应用上下文中进行。为了确保不串数据，需要为每次 SSR 请求，创建全新的 app、store 和 router。</p><p>然后，我们重构组件的数据获取方式，在页面开发渲染之前，利用服务端进程，做好数据获取和解析工作，然后把状态和数据存存储于 store 中。</p><p>这里面需要注意的是，SSR 应用在挂载（mount）到客户端应用程序之前，需要获取到与服务器端应用程序完全相同的数据。否则，客户端应用程序会因为使用与服务器端应用程序不同的状态，导致混合失败。</p><h4 id="白屏时间-100ms-的-ssr-优化" tabindex="-1">白屏时间 100ms 的 SSR 优化 <a class="header-anchor" href="#白屏时间-100ms-的-ssr-优化" aria-label="Permalink to &quot;白屏时间 100ms 的 SSR 优化&quot;">​</a></h4><p>做好上述工作后，我们白屏时间基本可以达到 200ms（标准是 300ms）。之后，我们还可以做一些升级优化，确保白屏时间达到 100ms 以内。具体来说，可以实施以下两个方面的工作：</p><ul><li><p><strong>利用服务端的性能优势，尽量在服务端完成资源加载、首屏切分等工作</strong></p></li><li><p><strong>利用服务端统一缓存机制，对数据接口、页面和组件做缓存</strong></p></li></ul><p>怎么理解呢？</p><p>第一，服务端渲染的最大优势，就是后端服务性能要远高于手机，所以请求数据接口和渲染时，耗时会更短。以我们手机业务列表页为例，CSR 下面渲染需要 600ms，到了 SSR下，渲染只需要 300ms。为此，我们可以把很多原本客户端做到的事情挪到了服务端，比如模块文件加载，首屏切分等。</p><p>第二，服务器端缓存与客户端最大不同是，服务端属于统一公用，也就是说，只要某一个用户访问过一次，后续所有用的访问都可以使用这份缓存。我们可以利用这一特点，采用 LRU（Least Recently Used，最近最少使用缓存机制）和 Redis 做好缓存功能，降低白屏时间。</p><p>具体来说，LRU 属于页面级缓存，对于数据统一性页面（有别于千人千面数据的页面），利用 LRU-Cache 可以缓存当前请求的数据资源。为了降低缓存的颗粒度，提高缓存的服用行，我们还可以用它来对渲染后的 vue 组件进行缓存。</p><p>而使用 Redis 可以对跨页面的数据接口进行缓存，将整体渲染时间再减少 100ms。为什么呢？因为 SSR 应用程序部署在多服务、多进程下，该进程下的缓存并不是共享的，这就造成缓存命中效率低下，而使用 Redis 可以解决这个问题，进而更好实现跨页面数据缓存（关联上跨云接口缓存这里，呼应主题）。</p><p>在实施过程中，还要注意以下几点：</p><p>第一，前端工程师因为对后端服务了解不多，在实际开发中可能会出现一些问题，例如我们之前遇到的，在服务端取后端数据接口时，取到的订单信息直接展示在页面源码中，导致乌云系统爆出了一个安全漏洞。所以建议你系统学习一些服务端安全知识，避免类似问题出现。</p><p>第二，在 SSR 服务出现高并发问题后，服务扩容是一种解决方案，但前端工程师对这方面并不擅长（如估算服务 QPS），容易出现问题。怎么办呢？一方面可以让运维和后端工程师一起协助，另外一方面也要做好 CSR 的降级，一旦遇到问题，可以快速降级。</p><h3 id="小结" tabindex="-1">小结 <a class="header-anchor" href="#小结" aria-label="Permalink to &quot;小结&quot;">​</a></h3><p><img src="https://s0.lgstatic.com/i/image6/M00/32/C2/Cgp9HWBuXziAAA4DAAI6QH-dulY404.png" alt="溪风的思维导图14.png"></p><p>好了，以上就是骨架屏和 SSR 性能优化方案。在实际当中，你可能会问了：SSR 说了这么多优点，为什么没全量普及，替代掉 CSR？</p><p>这是因为， SSR 需要你对后端知识，尤其是 Node.js 知识有很好地把握，且具备一定的数据接口设计规划和设计能力，但许多前端工程师很容易忽视这方面的学习。还有，SSR 渲染进行的页面，一些事件还在绑定中，有可能会出现操作没反应的情形；一些环境变量（如 window、document ）获取不到，稍不注意也会遇到内存泄漏的问题。</p><p>当然，这些对于白屏 100ms 的效果实现，都是非常值得的，而且前者可以通过提前安排Node.js 服务端开发相关培训来解决，后者可以通过整理一份 SSR 开发规范，将一步步蹚过的坑和宝贵经验沉淀下来。</p><p>下面给你留一个思考题：</p><blockquote><p>SSR 方案和前面提到离线化方案有什么区别？</p></blockquote><p>可以写到下面的留言区哦。接下来我们将进入下一讲 ------ WebView 层及代码架构层面优化。</p>`,58),o=[e];function t(r,c,i,u,y,E){return n(),a("div",null,o)}const b=s(l,[["render",t]]);export{m as __pageData,b as default};
