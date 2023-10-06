import{_ as n,j as e,o,g as i,k as l,Q as t,s,h as a}from"./chunks/framework.b3d8e22e.js";const D=JSON.parse('{"title":"云函数的运行机制 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/103-云原生微信小程序开发实战文档/(5108) 15  KISS：怎么设计简单易用的云开发函数？.md","filePath":"posts/frontEnd/103-云原生微信小程序开发实战文档/(5108) 15  KISS：怎么设计简单易用的云开发函数？.md","lastUpdated":1696417798000}'),c={name:"posts/frontEnd/103-云原生微信小程序开发实战文档/(5108) 15  KISS：怎么设计简单易用的云开发函数？.md"},_=t(`<p>今天我想跟你分享怎么设计简单易用的云开发函数。</p><p>我在 13 讲提到过，云开发是云原生一体化的应用开发平台，主要为产品应用提供完备的后端服务。与传统的后端服务一样，云开发的云函数为后端业务处理提供了计算能力，开发者只需要提供业务函数有关的代码文件，当有请求时，云函数会自动将这些文件装载到一个计算资源容器中，按照开发者编写的规则进行处理，最终返回结果给请求方。下面是一个简单的云函数例子：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">exports.main </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">async</span><span style="color:#E1E4E8;"> (event, context) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;这是来自云开发的消息&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">exports.main </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">async</span><span style="color:#24292E;"> (event, context) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;这是来自云开发的消息&#39;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>在例子中，云函数执行 exports.main 函数，接收的参数 event 是请求方发送过来的，与业务处理有关的必要信息（请求方自定义），函数主体直接 return 一串字符串，返回请求方一句话。</p><p>在整个过程中，开发者只需要关心业务相关的代码文件（也就是上述实例的相关业务代码），不用关心怎么接收请求，装载实例等。</p><p>而且，云函数使用的是事件触发模型，请求方每一次调用云函数，就触发了一次云函数调用事件，云函数平台就会新建或复用已有的云函数实例来处理这次调用。这与传统的后端服务有很大不同，因为云开发云函数是以实例来运行的，也就是说，一个云函数与其他云函数之间是独立运行的，云函数之间无法互相获取信息，甚至同一个云函数在不同时间、不同请求方调用执行时，也无法与其他存在的同一云函数实例通信，它们之间只能通过统一的存储空间进行配合，比如数据存入数据库、云存储中。</p>`,6),r=s("p",null,"可是我们在开发一个完整的产品应用时，会让多个云函数同时存在并独立运作，以支撑应用运行时各种业务请求。比如，一个简单的应用登录页面，就需要登录、注册、忘记密码三个云函数进行支持。但云函数相对独立的特性，会让很多开发者在写业务逻辑时，无意将云函数写得特别臃肿，最终降低云函数的执行效率，从而增加产品操作的延迟、后期维护的负担。",-1),d=s("p",null,"所以为了提高云函数执行效率，让后期维护变得有效，我们推崇 KISS 原则，也就是 Keep It Simple & Stupid。所以这一讲，我从提升云函数效率角度出发，通过剖析云函数运行机制来讲解优化点（让云函数保持热启动状态、缩小云函数文件的大小等）让你更好地把握云函数的特性，从而合理使用云函数。",-1),h=t('<h3 id="云函数的运行机制" tabindex="-1">云函数的运行机制 <a class="header-anchor" href="#云函数的运行机制" aria-label="Permalink to &quot;云函数的运行机制&quot;">​</a></h3><p>在我看来，掌握云函数的启动运行原理之后，我们才能自底向上地优化云函数。在云函数被请求方调用而开始运行时，具体的顺序如下：</p><ul><li><p>用户发起请求，请求发送到云开发的后台；</p></li><li><p>云开发后台的调度器将请求分发给下方的执行的 Worker 、容器；</p></li><li><p>容器创建环境、下载代码；</p></li><li><p>执行代码；</p></li><li><p>返回执行结果。</p></li></ul><p>其中 1~3 步都是由云开发团队负责优化的，我们只需要在第 4 步进行优化就可以了，这样一来，我们对整个云函数的优化就变成了对函数代码的优化。<strong>从流程上看的确如此，我们再横向看一下。</strong></p><p>云函数会根据角色的不同，被请求的频次也不一样，比如页面刷新的云函数 A 和提交数据的云函数 B，从业务角度来讲，肯定是 A 请求频次远远高于 B 的。那么对于不同请求频次的云函数，云开发的调度系统会有什么具体的表现呢？我们来看一下更细致的运行原理。</p>',5),g=t('<p>在云开发云函数中，我们可以按照路径把云函数分为三种类型。</p><ul><li><p>冷启动：这类云函数通常是很长时间没有请求，或者刚刚创建完毕，根本不存在运行实例，所以这类云函数在请求时就要先创建容器，再下载代码部署，最后才能执行。耗时最长。</p></li><li><p>温启动：这类云函数可能有一段时间没有请求，或者是开发者更新了代码。在执行时直接下载部署代码就可以运行了。耗时中等。</p></li><li><p>热启动：这类云函数一直处于活跃状态，请求来临时不需要创建容器和下载代码，就可以直接执行，耗时最短。</p></li></ul><p>由此可见，当函数不需要创建容器、下载代码、直接请求函数就可以完成执行，显然比要创建容器或要下载代码的温启动和冷启动速度更快，<strong>所以你要想提升云函数的运作效率，就要想办法将云函数始终保持热启动状态。</strong></p><h3 id="让云函数保持热启动状态" tabindex="-1">让云函数保持热启动状态 <a class="header-anchor" href="#让云函数保持热启动状态" aria-label="Permalink to &quot;让云函数保持热启动状态&quot;">​</a></h3><p>让云函数保持热启动状态，就需要保持云函数的活跃性，也就是始终有频繁的调用请求。我们尝试让云函数的每一次调用都走热启动（设置每秒调用一次云函数），看看云函数执行耗时的变化。</p>',5),u=s("p",null,"从图中可以看到，函数的执行时间从第一次（冷启动）的 1.2s 降低到了 200ms左右，性能提升了 80%，我们仅仅提升了函数的调用频次（由十几分钟 1 次提升到 1 秒 1 次），就可以提升函数的调用性能，这就是热启动带给我们的价值。",-1),m=s("p",null,"所以，如果你希望业务应用中，后端服务的云函数需要保持较高的响应速度，以支撑一些特殊的业务场景（抽奖、抢购），则可以使用此方法（预热云函数使其热启动）来提升云函数响应速度。具体操作是：借助云函数提供的定时触发器，定期唤起你的容器，从而为你的云函数容器保活，确保函数时刻被热启动。",-1),E=s("h3",{id:"缩小云函数文件的大小",tabindex:"-1"},[a("缩小云函数文件的大小 "),s("a",{class:"header-anchor",href:"#缩小云函数文件的大小","aria-label":'Permalink to "缩小云函数文件的大小"'},"​")],-1),A=s("p",null,"我刚刚提到，云函数的启动流程中，第三步是创建容器和下载代码，我们无法优化创建容器和下载代码的过程，但我们可以控制和优化代码本身，因为代码是我们自己编写的。",-1),S=s("p",null,[a("在下载部署速度相同的情况下，代码的体积越大，所耗费的时间就越长。所以你可以通过缩小代码来提升代码的下载部署速度，进而整体提升云函数的执行速度。"),s("strong",null,"来做个测试："),a(" 创建两个函数，两个函数的代码完全一致，不同的是，在实验组的函数中，加入了一个 temp 变量的声明，这个变量的值是一个非常长的字符串，会让两个函数的大小分别是 68K 和 4K。")],-1),y=s("p",null,"接下来，我们看看二者的执行时间。",-1),T=s("p",null,"我们发现，在前几次执行中，大体积函数运行时间要大于小体积函数，也就是说在性能上会略慢几毫秒，而后续不断重复调用，在多次执行之后，云函数变成热启动状态，所以并没有下载部署代码这个步骤了，函数之间的差距也越来越小，几乎可以忽视。",-1),f=s("p",null,[s("strong",null,"由此我们可以得出结论"),a("：函数文件的大小，从一定程度上决定了云函数的执行速度。")],-1),C=s("p",null,"所以，在编写云函数过程中，你要尽量避免出现无意义的冗余代码，有代码注释也尽量将注释去掉，压缩函数体积。这个原理和浏览器加载 js 等资源文件的情况特别相似，都是通过减少文件体积来降低加载的时间从而提升性能。",-1),k=s("h3",{id:"削减不需要的-package",tabindex:"-1"},[a("削减不需要的 Package "),s("a",{class:"header-anchor",href:"#削减不需要的-package","aria-label":'Permalink to "削减不需要的 Package"'},"​")],-1),I=s("p",null,[a("除了缩减业务代码之外，通常为了业务代码编写而引入的各种 npm 包也是需要重点改进的对象。很多开发者都会使用 npm 包提升开发速度和开发便捷性。云开发云函数虽然也会针对 Node Modules 做一些缓存机制的优化，但依然存在下载时间差。"),s("strong",null,"我们来做一个实验"),a("：一个云函数中没有安装任何依赖，另外一个云函数安装了很多依赖，两者逻辑都一样，都是直接返回同一个字符串。")],-1),P=s("p",null,"实验结果如下：",-1),b=t('<p>我们发现，前三次是因为涉及依赖包的下载问题，所以时长大小对比特别明显，从第四次开始，二者的区别就不大了，云函数中因为依赖已经完成了缓存，所以可以直接使用缓存来完成函数的执行。</p><p>由此可见，在云函数中只保留必要的依赖，去掉无用的依赖，在使用依赖时，尽可能选择够用且体积小的依赖，以简化云函数的整体体积。</p><p>讲到这儿，我们已经对云函数的运行机制中的一些可优化点做了一些梳理和拆解，我再总结一下：</p><ul><li><p>让云函数保持热启动状态，通过提前预热云函数提升在业务来临时的执行效率；</p></li><li><p>缩小云函数文件的大小，降低云函数在下载代码时的耗时；</p></li><li><p>削减不需要的 Package，降低云函数在依赖 Package 时的耗时。</p></li></ul><p>另外，如果你想实质性地降低云函数的执行时间，必须改造云函数代码逻辑，因为代码逻辑本身决定了云函数的执行路径，也决定了云函数的执行时间长短。</p><h3 id="kiss" tabindex="-1">KISS <a class="header-anchor" href="#kiss" aria-label="Permalink to &quot;KISS&quot;">​</a></h3><p>在设计云函数时，要遵循简单的原则，也就是一个函数尽量只解决一个关键的问题。比如商品的添加、删除功能，尽可能用两个独立的云函数实现相应的功能，而不要用一个云函数直接构建两个功能。这样的好处是：</p><ul><li><p>便于定位和调试问题；</p></li><li><p>在一定程度上减少了中间的判断逻辑，节约了执行时间。</p></li></ul><p>在大多数情况下，云函数中一定会用到云开发的数据库，那么如何通过优化数据库的操作，来降低云函数的执行时长，也是关键的一环（关于数据库的优化部分在上一讲已经讲到了，在这里不再阐述）。再有一点，云函数内尽量不要出现过多重复的代码，可以通过抽象将重复代码转化为子函数，一方面可以有效地降低代码体积，另一方面对日后维护工作会有实质性的帮助。</p><p>总的来说，你要根据自身的业务设计云函数，你可以遵循以下 3 个原则。</p><ul><li><p>云函数的执行流程尽量减少分支数量：过多的判断导致大量的分支流程，会使云函数代码冗余，因为每次执行只使用了其中一个分支，其他的分支被浪费了。</p></li><li><p>云函数的代码尽可能采用最简单的设计：可以通过合理使用一些设计原则（比如开闭原则、接口隔离原则等），将复杂的代码逻辑变得简单，高效处理才可以有效降低时间成本。</p></li><li><p>对于可以同步的流程，尽量同步来触发启动：如果云函数中的一些流程无前后因果关系，比如请求操作和数据库操作并没有前后关系，就可以使用 Promise.all 来并发请求。</p></li></ul><h3 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h3><p>本节我们主要讲了云函数的运行机制，并根据运行机制为你介绍了 4 个可优化提升云函数建议。总的来说云函数是云开发的基本计算能力，在应用开发中不可获。很多情况下，相同功能的应用，执行效率的差别更多可能出现在云函数的执行效率上。所以你要尽可能秉承 KISS 原则，来处理优化云函数的执行逻辑代码，同时配合运行机制的一些优化点，提升性能。</p><p>除了云函数的优化之外，云函数还具有一些高级能力，可在一些情况下减轻你的代码负担。比如，云函数的高级日志，可以免除你在云函数中维护日志管理，专注于应用业务实现，更多的能力你可以参考官方文档。</p><p>本节课留一个作业：复现本节的两个云函数例子，体会一下云函数的创建和执行过程，我们下一讲见。</p>',15);function B(x,q,v,F,V,K){const p=e("Image");return o(),i("div",null,[_,l(p,{alt:"image (5).png",src:"https://s0.lgstatic.com/i/image2/M01/03/9C/CgpVE1_fibiAB8UAAABWcKo7iuc145.png"}),r,d,l(p,{alt:"小程序15-金句.png",src:"https://s0.lgstatic.com/i/image/M00/8B/DE/CgqCHl_hcqyAFwF2AADslRrjIDQ601.png"}),h,l(p,{alt:"image (6).png",src:"https://s0.lgstatic.com/i/image2/M01/03/9A/Cip5yF_ficGAfz0oAAB0418U21I249.png"}),g,l(p,{alt:"image (7).png",src:"https://s0.lgstatic.com/i/image/M00/8B/B9/Ciqc1F_ficmANfYTAAGpbbH212I351.png"}),u,m,E,A,S,y,l(p,{alt:"image (8).png",src:"https://s0.lgstatic.com/i/image/M00/8B/B9/Ciqc1F_fic-AMPjeAAG2W-NRJYg068.png"}),T,f,C,k,I,P,l(p,{alt:"image (9).png",src:"https://s0.lgstatic.com/i/image/M00/8B/C4/CgqCHl_fieiAO7HuAAFCQJQSnqs650.png"}),b])}const M=n(c,[["render",B]]);export{D as __pageData,M as default};
