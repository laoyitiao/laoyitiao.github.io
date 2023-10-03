import{_ as p,o as e,g as a,Q as i}from"./chunks/framework.f949202b.js";const _=JSON.parse('{"title":"小程序在思考什么 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/108-前端进阶笔记文档/(7207) 11  为什么小程序特立独行？.md","filePath":"posts/frontEnd/108-前端进阶笔记文档/(7207) 11  为什么小程序特立独行？.md","lastUpdated":null}'),t={name:"posts/frontEnd/108-前端进阶笔记文档/(7207) 11  为什么小程序特立独行？.md"},o=i('<p>这几年小程序突然火了起来，其用完就走、无须安装的便捷设计吸引了越来越多的用户愿意使用。用户的热度加上微信给小程序提供的顶级流量入口，也吸引了不少前端开发者的加入。</p><p>但当前端开发者带着固有的认知进行小程序开发的时候，却发现很多地方都行不通，比如页面元素无法获取，只能通过<code>setData</code>更新页面，还有各种浏览器接口都无法正常使用。所以，很多人都难以理解，认为小程序偏偏特立独行为难开发者，其实很大程度上是<strong>因为小程序基于安全和管控考虑下的设计</strong>。</p><p>那么，究竟是出于怎样的考虑，小程序才被设计成这样？它到底又做了怎样的事情，来尝试解决以上问题呢？今天，我来带你重新认识下小程序。</p><h3 id="小程序在思考什么" tabindex="-1">小程序在思考什么 <a class="header-anchor" href="#小程序在思考什么" aria-label="Permalink to &quot;小程序在思考什么&quot;">​</a></h3><p>在微信 App 里，小程序直接开放给所有用户使用，这意味着可能有十几亿人会用到这个工具。面对如此大的流量入口，吸引了很多有心人的眼球。</p><p>当年互联网还不成熟的时候，许多网页开发没有做好 XSS 和 CSRF 这样的漏洞保护，导致出现用户账户被盗用、财产被转移等问题。对于小程序来说，<strong>不仅需要对各种小程序进行内容的管控，同样需要给用户和开发者提供有安全保障的环境</strong>。</p><h4 id="小程序如何保障用户安全" tabindex="-1">小程序如何保障用户安全 <a class="header-anchor" href="#小程序如何保障用户安全" aria-label="Permalink to &quot;小程序如何保障用户安全&quot;">​</a></h4><p>我们知道，在 Web 开发中，开发者可以使用 JavaScript 脚本来操作 DOM，这意味着恶意攻击者同样可以通过注入 JavaScript 脚本的方式来操控用户的页面。前面提到的 XSS 攻击便是利用了这样的漏洞，从而危害用户和网站的安全。</p><p>除此之外，有些恶意的开发者也可能想要从小程序中盗取用户信息。比如，小程序提供了<code>&lt;open-data&gt;</code>组件，用于无须授权的情况下可展示用户的敏感信息（昵称、头像、性别、地理位置等），如果开发者直接通过 DOM API 获取到这些信息，意味着只要用户打开了这个小程序，在未授权的情况下自己的相关信息就会被盗取。</p><p>对于微信来说，这些都是非常危险又不可控的问题，如果可以从平台的角度解决，就可以保障用户和商户小程序的安全。在此基础上，小程序提出了<strong>双线程设计</strong>。</p><p>在介绍小程序的双线程设计之前，我们先来思考一下上面提到的安全问题要怎么避免。</p><p>我们能看到，很多风险都来自 JavaScript 脚本对网页中 DOM 的访问和操作。想要解决这个风险就得将 JavaScript 代码放置在没有浏览器环境的沙箱环境中运行。</p><p>沙箱环境听起来很复杂，但其实前端开发者经常接触到：除了浏览器环境以外，JavaScript 还会被运行在 Node.js 环境中。Node.js 是基于 Chrome V8 引擎的 JavaScript 运行环境，该环境中不存在 DOM API、<code>window</code>、<code>document</code>等对象 API 和全局对象，因此也更无操作 DOM 节点一说。</p><p>小程序也是同样的思路，<strong>它使用 iOS 内置的 JavaScriptCore 框架和在 Android 的 JSCore 引擎（最初为腾讯 x5 内核，后来是 V8 引擎），提供了一个没有浏览器相关接口的环境，用于 JavaScript 脚本的执行</strong>。</p><p>在这样的环境里，开发者无法使用浏览器相关的 API 来改变页面内容、获取敏感信息、随意跳转页面，当然也无法对用户进行恶意的攻击了。也正因为如此，在小程序里，是不存在 XSS 风险的，开发者无须主动进行防范，用户更是可以安心使用。</p><p>以上就是小程序双线程设计的背景，下面我们来看一下小程序的双线程是怎样设计的。</p><h4 id="小程序的双线程设计" tabindex="-1">小程序的双线程设计 <a class="header-anchor" href="#小程序的双线程设计" aria-label="Permalink to &quot;小程序的双线程设计&quot;">​</a></h4><p>上面我们提到，小程序中使用了沙箱环境来运行 JavaScript 代码，在这个环境中无法进行一些 DOM 操作。那么，开发者如何更新页面内容、控制页面的展示呢？答案是使用<code>setData()</code>。</p><p>为什么使用<code>setData()</code>可以更新页面内容呢？这是因为在小程序中，界面渲染相关任务则是由单独的 WebView 线程来完成。也就是说，在小程序中，JavaScript 脚本的执行和界面渲染不在一个线程中。</p><p>当我们在 JavaScript 中使用<code>setData()</code>更新数据的时候，实际上这些数据会通过客户端进行跨线程通信，然后传递到 WebView 页面中，WebView 页面则根据约定的规则来更新到页面中，过程如下图所示。</p><p><img src="https://s0.lgstatic.com/i/image6/M01/3D/8A/CioPOWCU8cuAIFXRAABYguwpGhg390.png" alt="图片4.png"></p><p>由于 WebView 页面中获取到的只是类似 JSON 格式的数据，不存在执行 JavaScript 脚本的情况。因此有效地防范了 XSS 攻击，也防止了开发者恶意爬取用户敏感信息。</p><p>现在，我们能看到，<strong>小程序中分为渲染层（由 WebView 线程管理）和逻辑层（由客户端 JavaScript 解释引擎线程管理）</strong>：</p><p><img src="https://s0.lgstatic.com/i/image6/M01/3D/81/Cgp9HWCU8cGAF4EuAAEIQVjlx_Y079.png" alt="图片2.png"></p><p>这就是小程序的双线程设计。显然，它带来了一些好处：</p><ol><li><p>可以防止恶意攻击者的 XSS 攻击；</p></li><li><p>可以防止开发者恶意盗取用户敏感信息；</p></li><li><p>提升页面加载性能。</p></li></ol><p>关于第 3 点，我们在第 1 讲的时候就讲过，在浏览器中 GUI 渲染线程负责渲染浏览器界面 HTML 元素，JavaScript 引擎线程主要负责处理 JavaScript 脚本程序。它们之间是互斥的关系，当 JavaScript 引擎执行时，GUI 线程会被挂起。而在小程序中，由于 JavaScript 的执行和页面渲染不在一个页面中，因此也不存在阻塞的问题，页面加载得以更加流畅。</p><h4 id="小程序开发者的痛点" tabindex="-1">小程序开发者的痛点 <a class="header-anchor" href="#小程序开发者的痛点" aria-label="Permalink to &quot;小程序开发者的痛点&quot;">​</a></h4><p>虽然小程序的双线程设计解决了用户安全的问题，但同时也给开发者带来了一些问题：</p><ol><li><p>在浏览器中可以运行的 DOM、BOM 等对象和 API，都无法在小程序中使用；</p></li><li><p>小程序的一些 API 使用方式与浏览器不一致（请求、缓存等）；</p></li><li><p>逻辑层和渲染层的通信依赖客户端进行通信，当通信过于频繁的场景可能导致性能问题。</p></li></ol><p>其中，第 1 点和第 2 点导致前端开发者无法将 Web 页面直接在小程序中复用，同时需要掌握小程序自身的 API 才能熟练地进行开发。这意味着进行小程序开发有门槛和学习成本，因此开发者体验并不会很好。</p><p>关于第 3 点，页面进行大数据和高频率的<code>setData()</code>时，会出现页面卡顿的问题。因此在强交互的场景下，用户体验会很糟糕。</p><p>在这样的种种情况下，我们跑在浏览器中的代码，如果想要在小程序中运行，必须要做很多兼容处理，甚至需要重新开发来实现。</p><p>那为什么一定要使用小程序呢，直接用 H5 不好吗？这是因为小程序有微信流量，微信平台提供给小程序的流量对很多开发者来说都是不愿舍弃的。因此即使无法进行从网页开发到小程序开发的平滑过渡，很多开发者依然选择了进行小程序开发。</p><p>其实小程序也做了不少的尝试去抹平小程序和 Web 的差距，从而提升小程序的开发体验，比如这些措施。</p><ol><li><p>提供了<a href="https://github.com/Tencent/kbone?fileGuid=xxQTRXtVcqtHK6j8" target="_blank" rel="noreferrer">Kbone</a>解决方案，用于支持让 Web 项目同时运行在小程序端和 Web 端。Kbone 通过使用适配层的方式，模拟了一套可运行在小程序中的浏览器对象，提供了基础的 DOM/BOM API，因此 Web 应用可通过 Kbone 运行在小程序中。</p></li><li><p>由于原生组件的引入带来的渲染层级无法控制的问题，通过提供同屏渲染的方式来让开发者更好地控制组件样式。</p></li><li><p>开发者工具提供了丰富的调试能力，也提供了体验评分等功能，来引导开发者如何进行项目优化。</p></li></ol><p>除了这些，小程序还做了很多事情来提升用户体验，我们一起来看一下。</p><h3 id="小程序如何提升用户体验" tabindex="-1">小程序如何提升用户体验 <a class="header-anchor" href="#小程序如何提升用户体验" aria-label="Permalink to &quot;小程序如何提升用户体验&quot;">​</a></h3><p>目前，主流的 App 主要有 3 种，它们对应了 3 种渲染模式：</p><ol><li><p>Native App，使用了 Native（纯客户端原生技术）渲染；</p></li><li><p>Web App，使用了 WebView（纯 Web 技术）渲染；</p></li><li><p>Hybrid App，使用了 WebView+原生组件（Hybrid 技术）渲染。</p></li></ol><p>小程序使用的是 WebView + 原生组件，即 Hybrid 方式。显然，这种方式结合了 Native 和 Webview 的一些优势，让开发者既可以享受 Webview 页面的低门槛和在线更新，又可以使用部分流畅的 Native 原生组件，同时通过代码包上传、审核、发布的方式来对内容进行管控。</p><p>那么，使用了 Hybrid 渲染模式的小程序，带来了哪些提升用户体验的优势呢？</p><h4 id="引入原生组件提升用户交互体验" tabindex="-1">引入原生组件提升用户交互体验 <a class="header-anchor" href="#引入原生组件提升用户交互体验" aria-label="Permalink to &quot;引入原生组件提升用户交互体验&quot;">​</a></h4><p>我们知道，小程序中每一次逻辑层和渲染层的通信，都需要经过 Native，这意味着一次的用户的交互过程会带来四次的通信：</p><ol><li><p>渲染层 → Native（点击事件）；</p></li><li><p>Native → 逻辑层（点击事件）；</p></li><li><p>逻辑层 → Native（setData）；</p></li><li><p>Native → 渲染层（setData）。</p></li></ol><p>对于这种强交互的场景，小程序引入了原生组件，过程如下图所示。</p><p><img src="https://s0.lgstatic.com/i/image6/M01/3D/38/Cgp9HWCTkgmAIwqfAABQ6TN2pEc640.png" alt="Drawing 2.png"></p><p>我们可以看到，引入原生组件之后，原生组件可以直接和逻辑层通信，有效地减少逻辑层和渲染层的频繁通信问题。像<code>&lt;input&gt;</code>、<code>&lt;textarea&gt;</code>这些频繁交互的输入框组件，以及画布<code>&lt;canvas&gt;</code>组件、地图<code>&lt;map&gt;</code>这样交互复杂的组件，直接使用 Native 原生组件的方式既减少了客户端通信，也减轻了渲染层的工作。</p><p>引入原生组件的方式提升用户在小程序中频繁操作场景下的交互体验，依赖了 Native 技术的能力。除了这些，小程序在运行机制（包括启动和加载）上也结合客户端做了不少的体验优化工作，我们一起来看一下。</p><h4 id="通过页面预渲染减少启动和加载耗时" tabindex="-1">通过页面预渲染减少启动和加载耗时 <a class="header-anchor" href="#通过页面预渲染减少启动和加载耗时" aria-label="Permalink to &quot;通过页面预渲染减少启动和加载耗时&quot;">​</a></h4><p>前面我们介绍了小程序的双线程设计，你应该知道在小程序里 JavaScript 代码运行在逻辑层中，页面渲染的逻辑则运行在 WebView 渲染层中。</p><p>我们重新来看这张图：</p><p><img src="https://s0.lgstatic.com/i/image6/M01/3D/81/Cgp9HWCU8bGAcKpBAAEIQVjlx_Y616.png" alt="图片2.png"></p><p>我们能看到渲染层里有多个 WebView，这是因为在小程序中为了方便用户可快速地前进和回退，存在着多个界面，而每个界面都是一个单独的 WebView 线程，因此会有多个 WebView。</p><p>这和小程序的启动和加载有什么关系呢？</p><p>首先，在小程序启动之前，客户端会提前准备好一个 WebView，用于快速展示小程序首页。同时，在每次这个准备好的 WebView 被小程序使用和渲染时，客户端也都会提前准备好一个新的 WebView。因此，开发者在调用<code>wx.navigateTo</code>时，用户可以很快看到新的页面。</p><p>除了 WebView 的准备，小程序在启动和加载过程中，客户端还做了这些工作。</p><ol><li><p>基于 JavaScript 编写的基础库，会被提前内置在客户端中。基础库提供了小程序运行的基础能力，包括渲染机制相关基础代码、封装后的内置组件、逻辑层基础 API 等，因此小程序在启动时，都会先注入基础库代码。</p></li><li><p>当用户打开小程序后，客户端开始下载业务代码，同时会在本地创建内置的基础 UI 组件，初始化小程序的首页。此时，小程序展示的是客户端提供的固定的启动界面。</p></li><li><p>步骤 2 准备完成后，客户端就会开始注入业务代码并运行。</p></li></ol><p>最后，我们再来梳理下小程序的启动过程。</p><ul><li><p>启动前：提前准备好一个 WebView 页面，并进行初始化，在初始化过程中会注入小程序基础库，以提供小程序运行的基础环境。</p></li><li><p>用户打开小程序：下载业务代码，同时初始化小程序的首页，当业务代码下载完成后，开始运行业务代码。</p></li></ul><p>这个过程可以用一张图来表示。</p><p><img src="https://s0.lgstatic.com/i/image6/M01/3D/81/Cgp9HWCU8aGANgXoAADYUH1epEU088.png" alt="图片1.png"></p><p>我们可以看到，微信小程序通过基础库的内置、页面的预渲染、小程序加载时提供友好的交互界面等方式，使小程序可以尽快地加载，给到用户更好的体验。除此之外，小程序还通过使用缓存、热启动机制、提供分包加载和数据预拉取等方式，同样减少了用户的等待时间。</p><h3 id="小结" tabindex="-1">小结 <a class="header-anchor" href="#小结" aria-label="Permalink to &quot;小结&quot;">​</a></h3><p>或许对于一份工作来说，开发者只想简单快速地完成项目开发。但对于一位前端来说，小程序的设计中有很多值得学习的内容，正如我们今天所介绍的：</p><ul><li><p>为了保障用户的安全，提出了双线程的设计（渲染层由 WebView 线程管理、逻辑层由客户端 JavaScript 解释引擎线程管理）；</p></li><li><p>为了减少小程序和 Web 开发的差异，提供了 Knone 解决方案；</p></li><li><p>为了降低开发者的门槛，提供了功能丰富的开发者工具，提供了小程序优化的解决方案；</p></li><li><p>为了提升用户体验，小程序结合客户端的能力引入了原生组件，并优化了小程序的启动和加载过程。</p></li></ul><p>小程序之所以这么特殊，并不是为了特立独行，而是为了从平台的角度来提供给开发者和用户更好的体验和安全保障。</p><p>其实，小程序的设计远不止于此。如果你继续深挖，可以看到里面还有虚拟 DOM 的设计、Shadow DOM 模型、自定义组件的渲染过程等，同时还有小程序在载入、启动、更新版本等各种流程中的一些机制。除此之外，小程序和 Serverless 的结合极大地降低了开发者的门槛，同时也降低了开发成本，带来了友好的开发体验。</p><p>小程序中的很多设计都可以作为参考，比如页面预渲染的设计可以在提升首屏加载速度时作为参考。你是否也想到在哪些场景下可以参考的设计吗？或者你认为小程序是否还有更好的优化方案呢？欢迎在留言区说说你的想法。</p>',69),l=[o];function r(c,n,s,d,h,b){return e(),a("div",null,l)}const S=p(t,[["render",r]]);export{_ as __pageData,S as default};
