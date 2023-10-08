import{_ as l,j as i,o,g as s,k as p,h as a,Q as r,s as e}from"./chunks/framework.a0d18f64.js";const C=JSON.parse('{"title":"结束彩蛋：资深前端工程师培养计划","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/102-Webpack原理与实践文档/(2273) 结束彩蛋：资深前端工程师培养计划.md","filePath":"posts/frontEnd/102-Webpack原理与实践文档/(2273) 结束彩蛋：资深前端工程师培养计划.md","lastUpdated":1696682708000}'),c={name:"posts/frontEnd/102-Webpack原理与实践文档/(2273) 结束彩蛋：资深前端工程师培养计划.md"},n=r('<h1 id="结束彩蛋-资深前端工程师培养计划" tabindex="-1">结束彩蛋：资深前端工程师培养计划 <a class="header-anchor" href="#结束彩蛋-资深前端工程师培养计划" aria-label="Permalink to &quot;结束彩蛋：资深前端工程师培养计划&quot;">​</a></h1><p>今天我们一起聊聊大前端时代下的前端进阶之路。</p><p>可能你会问：为什么要聊这个话题？</p><p>原因很简单，时值当下，作为一名合格的前端开发人员，我相信你一定会有一个很明显的感觉：前端并没有想象的那么简单。越来越多的人开始称呼我们这个行业为&quot;大前端&quot;。</p><p>之所以称之为大前端，自然是因为前端的职责越来越重要，战场越来越多样，应用也越来越复杂。但是从目前的实际情况来看，很多人对前端的认识还是停留在网页开发的阶段。</p><p>所以我想在我们 Webpack 专栏的最后，跟你分享下我所理解的大前端时代：盘点当下的技术热点和趋势，以此来了解当下的前端开发者到底应该如何持续学习，才能更从容地应对行业的发展。也希望你能够通过我们今天介绍的内容，得到一点启发，真正意义上理解前端开发，做到从&quot;新手入坑&quot;到&quot;华丽转身&quot;的蜕变。</p><h3 id="纵观前端发展" tabindex="-1">纵观前端发展 <a class="header-anchor" href="#纵观前端发展" aria-label="Permalink to &quot;纵观前端发展&quot;">​</a></h3><p>在介绍具体的内容之前，按照我一贯的风格，我们先来简单了解一下&quot;历史&quot;。还是那句话：读史使人明智。</p><p>最早期，所有人对前端的认知：就是用 HTML + CSS + JavaScript 完成网页切图。当时的前端只是 Web 开发的附属品，绝大多数情况都是处于被后端开发人员驱动的状态。</p>',9),_=r('<p>而现如今，前端主导整个应用的开发已经成为常态。伴随着这种状态的变迁，前端技术在这些年也发生了翻天覆地的变化，核心技术不再局限于 HTML、CSS、JavaScript 本身。</p><p>举个例子，十年前 jQuery 几乎绝对性的垄断了 JavaScript 库生态，而十年后的今天，我们都在喊着 <em>You don&#39;t need jQuery</em>。现阶段的前端已经不再是往页面上引入几个库、调用几个函数就能满足应用开发需求的状态。如今，前端都拥有自己的工程，独立的发挥空间。</p><p>不仅如此，从传统的前端发展到现在的大前端，前端的边界正在变得越来越宽泛，前端开发也慢慢趋向于泛客户端开发。</p><p>现如今，当我们聊起前端，听到的大多是各种框架、Node.js、Serverless、泛客户端之类的话题。我把这些内容总结了一下，大致分为以下这几点：</p><ul><li>层出不穷的框架和工具；</li><li>各式各样的载体（客户端）；</li><li>蓄势待发的云开发（Serverless）；</li><li>无所不能的全栈；</li><li>开发岗位的周边软技能。</li></ul><blockquote><p>P.S. 泛客户端指的是各种各样的客户端载体，例如移动 App、H5、公众号、小程序等等。</p></blockquote><p>当然，这并不是说，作为现阶段的&quot;入局者&quot;，你只需要学习这些内容。这里的前提是假设你已经满足了一个前端开发者的常规技能要求：</p><ul><li>HTML + CSS + JavaScript；</li><li>AJAX 基本的前后端数据交互；</li><li>了解基本的 Node.js（NPM、CommonJS）；</li><li>Vue.js / React 开发简单的 Web 应用；</li><li>了解一些 Web 开发中的基础概念。</li></ul><h3 id="热点趋势盘点" tabindex="-1">热点趋势盘点 <a class="header-anchor" href="#热点趋势盘点" aria-label="Permalink to &quot;热点趋势盘点&quot;">​</a></h3><p>言归正传，接下来我们具体聊聊我眼中大前端的热点趋势。希望深处前端行业的你，能够从中获得些许持续学习的思路和方向。</p><h4 id="typescript" tabindex="-1">TypeScript <a class="header-anchor" href="#typescript" aria-label="Permalink to &quot;TypeScript&quot;">​</a></h4><p>你应该知道，JavaScript 是一门弱类型而且还是动态类型的语言，语言本身的类型系统是非常薄弱的，甚至可以说 JavaScript 根本就没有类型系统。</p><p>这样的特征就决定了 JavaScript 并不适合开发大型企业级应用，因为在大型应用开发过程中，我们的代码会非常复杂，开发周期也会特别长。这种情况下没有一个强大的类型系统，我们的开发成本和维护成本都会非常高。</p><p>为了弥补 JavaScript 类型系统的不足，微软公司推出了 TypeScript 编程语言。</p><p>TypeScript 是一门基于 JavaScript 基础之上的编程语言，很多时候我们都在说它是一个 JavaScript 的超集（扩展集）。</p><p>所谓超集，其实就是在 JavaScript 原有的基础之上多了一些扩展特性。多出来的主要就是：</p><ul><li>一套更强大的类型系统；</li><li>对 ECMAScript 新特性的支持；</li></ul>',17),S=r('<p>这也就是说，使用 TypeScript 过后，我们开发者在开发过程中可以直接使用 TypeScript 所提供的新特性，以及 TypeScript 中更强大的类型系统去完成开发工作。然后将其编译为能在生产环境中直接运行的 JavaScript 代码。</p><p>那 TypeScript 的意义也就很明显了：</p><ul><li>类型系统可以帮我们避免开发过程中有可能出现的类型异常，提高编码的效率，以及代码的可靠程度。</li><li>ECMAScript 几年迭代了很多非常有用的新功能，但是在很多陈旧的环境中都会出现兼容问题。TypeScript 支持自动转换这些新特性，所以我们可以立即去使用它们。</li></ul><p>即便我们不需要类型系统，通过 TypeScript 去使用 ECMAScript 的新特性也是一个很好的选择。因为 TypeScript 最终可以选择编译到最低 ES3 版本的代码，所以兼容性非常好。</p><p>因为 TypeScript 最终都是编译为 JavaScript。所以任何一种使用 JavaScript 开发的应用程序，都可以使用 TypeScript 开发。例如浏览器应用，Node.js 应用，React Native，或者是 Electron 桌面应用。</p><p>目前很多大型开源项目都已经开始采用 TypeScript 开发，最知名的自然是 Google 的 Angular 框架。另外，Vue.js 从 3.0 版本开始，也会使用 TypeScript 取代之前的 JavaScript + Flow。</p><p>慢慢地你会发现 TypeScript 已经成为前端领域中的第二语言。如果你开发的是小项目需要灵活自由，那么自然选择 JavaScript。相反如果你开发的是长周期的大型项目，所有人都会建议你选择 TypeScript。</p><p>当然，再美好的东西也都会有缺点，TypeScript 最大的缺点就是语言本身多了很多概念，例如接口、泛型、枚举等等，这些概念会增加我们的学习成本。不过好在 TypeScript 属于渐进式的语言，即便我们什么特性都不知道，也可以立马按照 JavaScript 标准语法去编写 TypeScript 代码，然后了解一个特性再使用一个特性。</p><p>再者就是对于周期短的小型项目，TypeScript 可能会增加一些开发成本，因为我们要额外编写很多的类型声明。但是如果是一个长期维护的大型项目，这些成本不算什么。纵观全局，TypeScript 整体带来的优势足以抵消它的劣势。</p><h4 id="服务端渲染" tabindex="-1">服务端渲染 <a class="header-anchor" href="#服务端渲染" aria-label="Permalink to &quot;服务端渲染&quot;">​</a></h4><p>目前主流的前端框架都是采用客户端渲染（CSR）的模式工作的，所谓客户端渲染，指的就是从服务器发回来的 HTML 中并没有页面内容，所有的内容都是等到页面中的 JavaScript 代码执行完成过后，动态创建出来的。大体过程我们可以参考下图：</p>',11),u=e("p",null,"这种客户端渲染模式的弊端显而易见：",-1),h=e("ul",null,[e("li",null,'页面的"白屏"时间更长，用户体验不好；'),e("li",null,"HTML 中无内容，SEO 不友好。")],-1),d=e("p",null,"针对客户端渲染模式的问题，服务端渲染（SSR）就能够很好地加以解决。SSR 大体过程可以参考下图：",-1),T=r('<p>相比于客户端渲染，服务端渲染就是在服务端多做了一些额外的工作：传统客户端渲染模式，在服务端接收到请求过后，只需要找到对应的 HTML 静态文件返回给客户端即可；而服务端渲染模式下，服务端接收到请求过后，会先执行一遍对应的 JavaScript，让页面在服务端先渲染一遍，然后将渲染的结果发送给客户端。所以客户端接收到的就是渲染过后的 HTML，自然也就没有上述问题。</p><p>目前主流的前端框架，比如 React、Vue.js、Angular 都有对应的服务端渲染方案，不过如果直接原生实现服务端渲染，那么需要你掌握的内容会比较多，也比较杂，其中的很多概念也会比较难理解。很多时候我们会选择直接使用一些集成式的服务端渲染框架，比如 Next.js 或者 Nuxt.js。</p><h4 id="serverless" tabindex="-1">Serverless <a class="header-anchor" href="#serverless" aria-label="Permalink to &quot;Serverless&quot;">​</a></h4><p>Serverless 是一种架构模式，翻译过来应该叫作无服务器架构。近几年被推向了风口浪尖，背后的原因除了一些人的 &quot;盲从&quot;，更为重要的是 Serverless 确实带来了一种全新的开发体验：对于使用 Serverless 架构进行开发的项目，开发者最明显的感受就是更关注应用的业务本身，不必再去过多关心服务器和运行平台的一系列问题。</p><p>传统情况下，我们开发一个 Web 应用，除了需要考虑业务本身，还需要考虑很多其他方面的东西，比如：服务器的操作系统、虚拟机、硬件资源配置、运行环境版本等等。如果你经历过这种模式下的应用初次部署，一定会头皮发麻。而且不仅初次配置麻烦，后期维护成本也很高，比如定期更新环境、清理缓存之类的。这让我想起了以前的一句玩笑话：一天 8 小时，6 小时折腾服务器。</p><p>再到后来，我们的服务逐渐切换到了云服务器上，在这种情况下，基本上不用关心太多的服务器底层维护问题，我们更多地是考虑运行环境的维护，这使得维护成本大大降低。</p><p>再到以后，我们可能会逐渐切换到 Serverless 架构上。无服务器，并不是真的没有服务器，只是开发人员眼中不需要关注服务器。开发人员只需要按照一定的要求完成开发工作，剩下的所有事情全部交给 Serverless 容器完成。</p><p>可能你会好奇：Serverless 真的有这么神奇吗？没有服务器，如何将应用运行起来呢？</p><p>其实也没有特别神奇，你仔细想想，我们的应用主要由两大块组成，分别是逻辑与存储。Serverless 中就通过两种方式解决了这两块的需求，分别是：</p><ul><li>函数即服务，Function as a Service，FaaS；</li><li>后端即服务，Backend as a Service，BaaS。</li></ul><p>其中 FaaS 中的函数指的就是计算函数，通俗一点描述，你可以理解为，你写了一个实现业务的函数，然后把这个函数丢给容器，容器就会自动把这个函数映射到一个服务上面，然后你就可以直接通过 HTTP 调用这个服务接口，也就是调用这个函数了。</p><p>而 BaaS 相对综合一点，它提供了一系列后端常用服务，比如数据或文件的存储、消息推送、账户系统等等。</p><p>结合这两点完全就可覆盖我们应用中绝大多数业务功能的开发，这就是 Serverless。它的优势十分明显：</p><ul><li>不需要再考虑什么物理机/虚拟机，结合工作流的情况下，代码提交自动部署，直接运行；</li><li>没有服务器，维护成本自然大大降低，安全性稳定性更高；</li><li>都是弹性伸缩云，硬件资源需要多少分配多少，不用担心性能问题；</li><li>大多数 Serverless 服务商的计价方式都是按使用情况（如流量、CPU 占用）来收费；</li></ul><p>总之，Serverless 必将大势所趋。</p><h4 id="flutter-移动-app-开发" tabindex="-1">Flutter 移动 App 开发 <a class="header-anchor" href="#flutter-移动-app-开发" aria-label="Permalink to &quot;Flutter 移动 App 开发&quot;">​</a></h4><p>Flutter 是 Google 2018 年公开发布的一个移动 App 开发方案，通过 Flutter 前端开发者就能够开发出真正意义上的原生 App。</p><p>在此之前，前端面对移动 App 开发需求都是通过 H5 + WebView + JsBridge 的方式，或者 React Native 框架实现。这些方式虽说都能够实现移动 App 开发，但是都存在这样或者那样的问题，最明显的表现就是体验还是达不到原生实现的效果，性能上有所欠缺。</p><p>H5 的性能问题不用多说，始终是 Web 平台，相比于原生根本不在一条起跑线。而像 RN 这种方案，性能上最大的弊端在于 RN 项目最终打包的结构还是一个 JS bundle，也就是说还是需要到运行阶段才能够去解析 JavaScript（JIT）。</p><p>Flutter 就是一个纯原生的开发方案，采用的是静态编译（AOT），也可以叫作提前编译。一个 Flutter 项目编译后的结果就是原生应用，相比于即时编译（JIT）性能自然有显著提升。</p><p>Flutter 甚至还是一个跨平台方案，因为在 2019 年 Flutter 宣布支持 Web 平台，这标志着 Flutter 已经全面支持所有平台。详细内容可以参考 <a href="https://flutter.dev" target="_blank" rel="noreferrer">Flutter 官网</a>。</p><p>当然，Flutter 的缺点同样明显：Flutter 平台采用的编程语言是 Google 推出的 <a href="https://dart.dev" target="_blank" rel="noreferrer">Dart</a>，而非 JavaScript 或者 TypeScript，所以学习成本相对高一点。我个人认为没有选择 JavaScript 或者 TypeScript 的原因有两点：</p><ul><li>JavaScript 类型系统的不足；</li><li>吃了 Java 的亏，涨了个教训。</li></ul><h4 id="多端统一开发方案" tabindex="-1">多端统一开发方案 <a class="header-anchor" href="#多端统一开发方案" aria-label="Permalink to &quot;多端统一开发方案&quot;">​</a></h4><p>随着这两年各种各样小程序或者快应用平台的诞生，互联网应用的载体种类（客户端形式）越来越多。由于这些不同平台的开发方式类似而又不完全相同，所以就产生了一个新的问题：开发人员要为不同的平台单独维护一个项目，这对于开发者而言需要关注的内容就会更多，学习成本也就更高。</p><p>目前前端行业中已经出现了一些很成熟的多端统一开发方案，例如 <a href="https://taro.aotu.io" target="_blank" rel="noreferrer">Taro</a>、<a href="https://uniapp.dcloud.io" target="_blank" rel="noreferrer">uni-app</a>。在这类方案下，开发者只需要编写一套代码，就可以直接发布在 iOS、Android 或是各类小程序平台中，大大降低了开发和维护的成本。</p><p>对于这类方案，一来我们应该掌握它们，以此应对层出不穷的客户端形式；二来我们也应该尝试去理解它们的实现原理，这会帮助我们更好地应对以后的开发工作。</p><h3 id="写在最后" tabindex="-1">写在最后 <a class="header-anchor" href="#写在最后" aria-label="Permalink to &quot;写在最后&quot;">​</a></h3><p>总之，不要给自己的学习设立边界，顺着主线，趁年轻多学习一点东西总是好的。</p><p>古人有一句老话 :&quot; 学源于思&quot;，意思是说，学问是从思考中得来的。所以除了学习，还有一点也是我经常强调的，就是多思考为什么，这也是我成长过程中最大的收获，正是因为养成了勤于思考的习惯，我才能看到更多别人没有关注到的细节，才能解决别人解决不了的问题。</p><p>最后我也想借此机会介绍一下我们正在做的这个「大前端高薪训练营」。</p><p>这个培养计划主要针对咱们前端在职人群，初衷就是为了把我的所学和心得跟大家分享，帮助大家能够更加系统地掌握大前端的知识体系。在经过一套完整的前端在职人员市场调研后，我和我的团队就开始投入到大前端高薪训练营的研发中，内容涵盖：</p><ul><li>前端工程化；</li><li>核心框架的原理与进阶；</li><li>Node.js 开发；</li><li>泛客户端开发；</li><li>大量行业技术和解决方案。</li></ul><p>研发这套课程的目的就是为了帮助你有针对性地获取前端知识、开阔学习思路，让你对未来前端领域的发展有更广阔的认识，从而获得更多的提升机会，得到一份更好的工作或者更高的报酬。同时作为技术人，我也希望你能养成持续学习的习惯，时刻保持对新技术的敏感度和好奇心，阶段性的规划出自己的学习计划。</p><p>现在还有活动，拉勾有百万补贴计划，为本专栏的读者预留了20个名额，希望你能学有所获，我在训练营等你。</p><p>点击链接：<br><a href="https://kaiwu.lagou.com/fe_enhancement.html" target="_blank" rel="noreferrer">https://kaiwu.lagou.com/fe_enhancement.html</a> 了解更多详情。</p>',36),v=e("p",null,"最后送给你一句话：奋斗勇担当，学习正当时。",-1);function m(A,q,b,f,g,J){const t=i("Image");return o(),s("div",null,[n,p(t,{alt:"",src:"https://s0.lgstatic.com/i/image/M00/17/99/Ciqc1F7XUlGALT8XAACvOB8a5t8185.png"}),a(),_,p(t,{alt:"",src:"https://s0.lgstatic.com/i/image/M00/17/99/Ciqc1F7XUluARVBdAAEW3jxAR7w079.png"}),a(),S,p(t,{alt:"",src:"https://s0.lgstatic.com/i/image/M00/17/A4/CgqCHl7XUmaABendAALcfRvkfcg376.png"}),a(),u,h,d,p(t,{alt:"",src:"https://s0.lgstatic.com/i/image/M00/17/A4/CgqCHl7XUm6APed4AAMTz0CqJ7s937.png"}),a(),T,p(t,{alt:"",src:"https://s0.lgstatic.com/i/image/M00/17/99/Ciqc1F7XUn6AbC_LAAomitrnym0658.png"}),a(),v])}const k=l(c,[["render",m]]);export{C as __pageData,k as default};
