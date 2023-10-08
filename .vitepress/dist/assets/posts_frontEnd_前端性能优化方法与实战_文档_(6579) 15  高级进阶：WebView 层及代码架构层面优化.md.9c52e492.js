import{_ as p,j as e,o as l,g as o,k as t,h as a,Q as c,s}from"./chunks/framework.4e7d56ce.js";const k=JSON.parse('{"title":"15高级进阶：WebView层及代码架构层面优化","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/前端性能优化方法与实战_文档/(6579) 15  高级进阶：WebView 层及代码架构层面优化.md","filePath":"posts/frontEnd/前端性能优化方法与实战_文档/(6579) 15  高级进阶：WebView 层及代码架构层面优化.md","lastUpdated":1696682708000}'),r={name:"posts/frontEnd/前端性能优化方法与实战_文档/(6579) 15  高级进阶：WebView 层及代码架构层面优化.md"},i=c(`<h1 id="_15高级进阶-webview层及代码架构层面优化" tabindex="-1">15高级进阶：WebView层及代码架构层面优化 <a class="header-anchor" href="#_15高级进阶-webview层及代码架构层面优化" aria-label="Permalink to &quot;15高级进阶：WebView层及代码架构层面优化&quot;">​</a></h1><p>上一讲我介绍了图片骨架屏和 SSR 这两种优化方案，它主要聚焦于白屏优化，接下来这一讲我将介绍 WebView 层面的优化和前端架构性能方面的调优。</p><p>为什么是这两个方面呢？首先 WebView 是我们经常使用到的工具，在我们开发 App 过程中起到非常重要的载体作用，甚至我还曾见过专门招聘 WebView 开发工程师的信息。而前端架构的某些因素也会严重影响我们的前端性能体验，所以，这一讲我就重点来介绍下它们。</p><h3 id="webview-性能优化" tabindex="-1">WebView 性能优化 <a class="header-anchor" href="#webview-性能优化" aria-label="Permalink to &quot;WebView 性能优化&quot;">​</a></h3><p>WebView 是一个基于 WebKit 引擎、展现 Web 页面的控件， App 打开 WebView 的第一步不是请求连接，而是启动浏览器内核。这意味着，在浏览器端，我们输入地址就开始请求加载页面，但在 App 内，我们还需要先初始化 WebView 然后才能请求和加载。</p><p>这会造成什么结果呢？同一个页面，在 App 端外反而比端内打开速度更快。因为在 App 内，WebView 还需要先进行初始化，这需要时间，且这个初始化时间还和 WebView 类型有关。其中 Android 下只有一个 WebView，而iOS 下却分 UIWebView 和 WKWebView。以我们 iOS 端使用的 UIWebView 为例，需要 400ms 左右，如果是 WKWebView，时间会更短，但基本也会占首屏时间的 30%左右。</p><p>怎么解决这个问题呢？这就需要进行 WebView 优化了， 一般它的优化包括资源缓存、并行初始化、资源预加载和数据接口请求优化，以及更换 WebView 内核等。</p><p>其中缓存选用方面比较简单，直接选用的浏览器默认缓存。而更换 WebView 内核，往往会因为需要进行灰度处理，必须一段时间内（通常几个月）并行两套 WebView 方案，很容易出现系统性风险，比如修改一个严重 Bug 后，前端工程师不知道用户端什么时候生效。所以，在这里，我着重介绍下 WebView 优化里面的<strong>并行初始化、资源预加载、数据接口请求优化</strong>三个方案。</p><h4 id="并行初始化" tabindex="-1">并行初始化 <a class="header-anchor" href="#并行初始化" aria-label="Permalink to &quot;并行初始化&quot;">​</a></h4><p>所谓并行初始化，是指用户在进入 App 时，系统就创建 WebView 和加载模板，这样 WebView 初始化和 App 启动就可以并行进行了，这大大减少了用户等待时间。</p><p>如果是使用 native 开发的应用，根据用户在首页的访问路径，选择初始化策略，操作体验会更好。以携程 App 为例，假设用户进入首页后，停留在西双版纳自由行区域，直接加载 WebView 和模板，两者同时运行，此时首屏主要工作就变成加载接口请求数据和渲染模板部分的工作了。</p><p>为了减少 WebView 再次初始化的时间，我们可以在使用完成后不进行注销，将里面数据清空，放进 WebView 池子里面，下次使用时，直接拿过来注入数据使用即可。注意，使用时，要对 WebView 池子进行容量限制，避免出现内存问题。</p><p>另外还需注意一点，由于初始化过程本身就需要时间，我们如果直接把它放到 UI 线程，会导致打开页面卡死甚至 ANR（Application Not Responding，应用无响应），所以，我建议将初始化过程放到子线程中，初始化结束后才添加到 View 树中。</p><h4 id="资源预加载" tabindex="-1">资源预加载 <a class="header-anchor" href="#资源预加载" aria-label="Permalink to &quot;资源预加载&quot;">​</a></h4><p>资源预加载，是指提前在初始化的 WebView 里面放置一个静态资源列表，后续加载东西时，由于这部分资源已经被强缓存了，页面显示速度会更快。那么，要预加载的静态资源一般可以放哪些呢？</p><ul><li><p>一定时间内（如 1 周）不变的外链；</p></li><li><p>一些基础框架，多端适配的 JS（如 adapter.js），性能统计的 JS（如 perf.js）或者第三方库（如 vue.js）；</p></li><li><p>基础布局的 CSS 如 base.css。</p></li></ul><p>一般在 App 启动时，系统就加载一个带有通用资源模版的 HTML 页面，虽然这些静态资源不经常变化，但如果变化呢？怎么避免因变化导致 App 频繁发布版本的麻烦呢？</p><p>一个办法是通过静态资源预加载后台进行管理。具体的话，我们不需要从 0 到 1 搭建，只需要在离线包后台添加一个栏目即可。</p><p>在业务接入预加载功能时，前端工程师通过静态资源预加载后台发布出一个静态资源列表页，然后把它的 URL 提供给 App，App 启动时会对这个 URL 下页面中的静态资源进行预加载。之后，前端工程师就可以查看静态资源的编号 ID、URL 和类型，进行删除、添加等管理操作。</p><p>不要小看这一点，通过这种做法，我们手机列表页 13 个文件缓存后，首屏时间从 1050ms 降低到了 900ms。</p><h4 id="数据接口请求优化" tabindex="-1">数据接口请求优化 <a class="header-anchor" href="#数据接口请求优化" aria-label="Permalink to &quot;数据接口请求优化&quot;">​</a></h4><p>数据接口请求优化，主要是通过同域名策略和客户端代理数据请求来实现。</p><p>其中，同域名策略是指前端页面和资源加载，尽量和 App 使用的数据接口在同一个域名下，这样域名对应的 DNS 解析出来的 IP，由于已经在系统级别上被缓存过了，大大降低了加载时间。</p><p>比如，58 App 客户端请求域名主要集中在 api.58.com，请求完这个地址后，DNS 将会被系统缓存，而前端资源的请求地址在 i.58.com，打开 WebView 后，由于请求了不同的地址，还需要重新去 DNS 服务器去查询 i.58.com 对应的 IP，而如果前端也改到 api.58.com后，DNS 查询的时间可以从原来的将近 80ms 降低到几 ms。</p><p>客户端代理数据请求，则是指把前端的数据请求拦截起来，通过客户端去发送数据请求。因为正常的页面加载顺序是，前端在 HTML，CSS，JS 拉取下来之后才开始由 JS 发起前端的 ajax 请求，获取到数据后程序才开始进行填充。而我们通过客户端代理数据请求，可以把前端的 ajax 请求提前到与页面加载同时进行，由客户端请求数据，等 H5 加载完毕，直接向客户端索要即可。如此一来，便缩短了总体的页面加载时间。</p><p>注意，这里的数据拦截环节，<strong>Android 端可以重写WebViewClient的shouldInterceptRequest 方法，iOS 端没有类似的方法，只能通过私有 API 方案、自定义协议方案和 LocalWebServer 来实现</strong>。</p><h3 id="前端架构性能调优" tabindex="-1">前端架构性能调优 <a class="header-anchor" href="#前端架构性能调优" aria-label="Permalink to &quot;前端架构性能调优&quot;">​</a></h3><p>前端架构性能优化，是指通过在前端开发、编译、打包发布环节所作的优化，以此来提升前端性能的方案。因为我们比较关注首屏时间，对这方面贡献比较大的是开发和打包发布这两个环节，所以接下来我着重介绍下 Vue 开发过程中的长列表性能优化和 webpack 打包分析层面的优化。</p><h4 id="长列表性能优化" tabindex="-1">长列表性能优化 <a class="header-anchor" href="#长列表性能优化" aria-label="Permalink to &quot;长列表性能优化&quot;">​</a></h4><p>一般，Vue 会借助 Object.defineProperty 这个 ES5 规范的方法，对数据进行劫持，即通过在某个对象上定义一个新属性或者修改一个属性，实现视图响应数据的变化。</p><p>这会造成什么影响呢？</p><p>在一些纯展示的场景里面，比如电商列表页面，如果还允许 Vue 劫持我们的数据，会花费很多的组件初始化时间。这种情况下，怎么做呢？可以使用 Object.freeze 冻结这个对象从而避免修改。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">export </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> { </span></span>
<span class="line"><span style="color:#E1E4E8;">  data</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> ({ goodsList</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> [] }), </span></span>
<span class="line"><span style="color:#E1E4E8;">  async </span><span style="color:#B392F0;">created</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> goodsList </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> await </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.$service.</span><span style="color:#B392F0;">get</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;/getGoodsList&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.goodsList </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> Object.</span><span style="color:#B392F0;">freeze</span><span style="color:#E1E4E8;">(goodsList); </span></span>
<span class="line"><span style="color:#E1E4E8;">  } </span></span>
<span class="line"><span style="color:#E1E4E8;">};</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">export </span><span style="color:#D73A49;">default</span><span style="color:#24292E;"> { </span></span>
<span class="line"><span style="color:#24292E;">  data</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> ({ goodsList</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> [] }), </span></span>
<span class="line"><span style="color:#24292E;">  async </span><span style="color:#6F42C1;">created</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> goodsList </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> await </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.$service.</span><span style="color:#6F42C1;">get</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;/getGoodsList&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.goodsList </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> Object.</span><span style="color:#6F42C1;">freeze</span><span style="color:#24292E;">(goodsList); </span></span>
<span class="line"><span style="color:#24292E;">  } </span></span>
<span class="line"><span style="color:#24292E;">};</span></span></code></pre></div><p>以前面提到的列表页面优化为例。我先定义一个 goodsList 的空对象，通过 async 将 created 钩子函数的返回值（也就是一个商品列表）封装成一个异步 Promise 对象，然后在 created 钩子函数中向 getGoodsList 接口获取数据。</p><p>其中，Vue 的生命周期里对外暴露的 created 钩子，表示 Vue 实例被创建但还没有渲染到浏览器的阶段；await 表示当拿到返回的数据结果后，Vue 实例才会通过 Object.freeze 把 goodsList 结果冻结，即 goodsList 对象展示过程中，数据变化时，视图将不再更新。</p><p>通过以上步骤，最终提升商品列表页的性能。</p><h4 id="打包优化" tabindex="-1">打包优化 <a class="header-anchor" href="#打包优化" aria-label="Permalink to &quot;打包优化&quot;">​</a></h4><p>打包优化方面，我们可以通过 webpack 插件来完成。 wepack 输出的代码可读性较差，而且文件比较大，我们很难了解打包后的情况，更别说如何优化了。为了直观分析打包结果，我们可以使用一个 webpack 插件------webpack-bundle-analyzer，通过它可以对打包结果进行可视化分析。</p><p>具体怎么实现呢？</p><p>我们在 wepack 中加入以下代码来实现打包分析。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">module.exports </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// vue-cli3 提供的一种高级技巧，链式操作</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">chainWebpack</span><span style="color:#E1E4E8;"> (config) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 意思只在打包时起作用</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (p<wbr>rocess.env.NODE_ENV </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;production&#39;</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      config.</span><span style="color:#B392F0;">plugin</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;webpack-bundle-analyzer&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">        .</span><span style="color:#B392F0;">use</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">require</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;webpack-bundle-analyzer&#39;</span><span style="color:#E1E4E8;">).BundleAnalyzerPlugin)</span></span>
<span class="line"><span style="color:#E1E4E8;">        .</span><span style="color:#B392F0;">end</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  }  </span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">module.exports </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// vue-cli3 提供的一种高级技巧，链式操作</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">chainWebpack</span><span style="color:#24292E;"> (config) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 意思只在打包时起作用</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (p<wbr>rocess.env.NODE_ENV </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;production&#39;</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">      config.</span><span style="color:#6F42C1;">plugin</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;webpack-bundle-analyzer&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">        .</span><span style="color:#6F42C1;">use</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">require</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;webpack-bundle-analyzer&#39;</span><span style="color:#24292E;">).BundleAnalyzerPlugin)</span></span>
<span class="line"><span style="color:#24292E;">        .</span><span style="color:#6F42C1;">end</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  }  </span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>这里面 chainWebpack 是 vue3 提供的一种高级操作------链式操作，通过它可以快捷完成一些方法的调用。代码中添加 p<wbr>rocess.env.NODE_ENV === &#39;production&#39;是为了让代码只在打包时起作用。</p><p>做完以上操作后，运行 npm run build --report，即可后生成一个分析报告。</p>`,43),E=s("p",null,"当我们拿着鼠标在上面滑动时，就可以看到整个包的组成部分，以及每部分的信息。一般我们可以找内容比较大的方面，然后分析原因进行优化。",-1),y=s("p",null,"比如，有次游戏业务发现打包目录超过了10MB，仔细定位发现是有些 game.map 的文件打包上来了。虽然 game.map 文件便于我们开发时调解 bug，准确定位错误的位置，但在这里却影响了我们的性能体验。找到原因后，解决它也很简单了，直接在打包时，关闭 sourcemap，即在配置文件中增加productionSourceMap:false 就可以了。",-1),d=s("h3",{id:"小结",tabindex:"-1"},[a("小结 "),s("a",{class:"header-anchor",href:"#小结","aria-label":'Permalink to "小结"'},"​")],-1),b=s("p",null,"好了，以上就是 WebView 性能优化和代码架构层的优化，这里面有一些注意事项。WebView 会占用一定的内存，如果使用 WebView 缓存池进行优化，会出现内存占用多的问题，我们可以将 WebView 放到独立进程中，避免内存泄漏。当然，WebView 独立进程的话，就需要解决进程间调用问题，一般可以直接使用 Aidl 来解决。",-1),u=s("p",null,"下面给你留一个问题：",-1),h=s("blockquote",null,[s("p",null,"目前你一般对 WebView 进行哪些方面的优化？")],-1),_=s("p",null,"欢迎在评论区和我沟通，下一讲我将介绍预请求、预加载及预渲染机制方面的内容。",-1);function w(g,V,W,m,F,A){const n=e("Image");return l(),o("div",null,[i,t(n,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image6/M00/31/1F/Cgp9HWBsJq2AXSKWAAfeHG3LQqY567.png"}),a(),E,y,d,b,u,h,_])}const v=p(r,[["render",w]]);export{k as __pageData,v as default};
