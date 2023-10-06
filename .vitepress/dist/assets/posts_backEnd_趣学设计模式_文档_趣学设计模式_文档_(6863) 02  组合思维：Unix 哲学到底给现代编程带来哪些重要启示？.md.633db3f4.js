import{_ as a,j as s,o as i,g as r,k as n,Q as p,s as t,h as e}from"./chunks/framework.b3d8e22e.js";const k=JSON.parse('{"title":"Unix 哲学的本质 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/趣学设计模式_文档/趣学设计模式_文档/(6863) 02  组合思维：Unix 哲学到底给现代编程带来哪些重要启示？.md","filePath":"posts/backEnd/趣学设计模式_文档/趣学设计模式_文档/(6863) 02  组合思维：Unix 哲学到底给现代编程带来哪些重要启示？.md","lastUpdated":1696417798000}'),_={name:"posts/backEnd/趣学设计模式_文档/趣学设计模式_文档/(6863) 02  组合思维：Unix 哲学到底给现代编程带来哪些重要启示？.md"},l=p('<p>Unix 操作系统诞生于 20 世纪 60 年代，经过几十年的发展，技术日臻成熟。在这个过程中，Unix 独特的设计哲学和美学也深深地吸引了一大批技术开发人员，他们在维护和使用 Unix 的同时，Unix 也影响了他们的思考方式和看待世界的角度。</p><p>这就引出了我们今天要说的 Unix 哲学。</p><p>什么是 Unix 哲学？简单来说，<strong>Unix 哲学是一套基于 Unix 操作系统顶级开发者们的经验所提出的软件开发的准则和理念</strong>。</p><p>也就是说，Unix 哲学并不是正统的计算机科学理论，它的形成更多是以经验为基础。你一定听说过模块化、解耦、高内聚低耦合这些设计原则，还有类似开源软件和开源社区文化，这些最早都是起源于 Unix 哲学。<strong>可以说 Unix 哲学是过去几十年里对软件行业影响意义最深远的编程文化</strong>。</p><p>所以今天在这一讲，我就来试着剖析下 Unix 哲学都带给我们哪些编程设计上的启示。</p><h3 id="unix-哲学的本质" tabindex="-1">Unix 哲学的本质 <a class="header-anchor" href="#unix-哲学的本质" aria-label="Permalink to &quot;Unix 哲学的本质&quot;">​</a></h3><p>Unix 哲学最早起源于 1978 年，是 Unix 设计者在一次关于如何设计简洁、高效的操作系统服务接口中的思考总结。在随后的几十年间，它逐渐形成了自己独特的编程文化，并发展出了一套影响深远的设计哲学。</p><p>简单来说，早期的 Unix 开发人员将&quot;模块化&quot;和&quot;可重用性&quot;概念引入软件开发实践中，并在程序设计中建立了一套用于开发软件的文化规范。</p><p>不同于传统系统设计理论的自顶向下，Unix 哲学注重实效，立足于丰富的经验，所以说不算是一种正规的设计方法，更像是一门艺术技艺，但是这并不妨碍它的思想精粹在软件行业中发光、发热。</p><p><strong>Unix 设计哲学，主张组合设计，而不是单体设计；主张使用集体智慧，而不是某个人的特殊智慧。</strong></p><p>比如，现在流行的开源文化，最早便是 Unix 技术社区提倡的共享代码文化演化而来的，以至于到后来出现的 Linux，到现在都一直保留着开放源码的传统。正是因为开源代码的缘故，才使得更多的程序员开始去研究 Unix 的设计精髓，并不断实践与发展 Unix 哲学。这体现了强大的<strong>组合思维</strong>的威力。</p><p>所以说，当真正了解了 Unix 哲学后，你会发现今天的很多编程思想和编程方法都是对 Unix 哲学思想的一种传承或演化。</p>',12),g=p('<h3 id="对编程的启示" tabindex="-1">对编程的启示 <a class="header-anchor" href="#对编程的启示" aria-label="Permalink to &quot;对编程的启示&quot;">​</a></h3><p>Unix 哲学发展至今，诞生了无数优秀的设计原则和最佳实践，对整个业界也产生了深远的影响。不过，对于编程来说，最有价值的原则要数 Peter H. Salus 总结的这三条原则：</p><ul><li><p>编写可以做一件事并且做得很好的程序；</p></li><li><p>编写程序以协同工作；</p></li><li><p>编写程序来处理文本流，因为这是一个通用接口。</p></li></ul><p>我将其简单概括为：<strong>简单完备性</strong> 、<strong>组合思维</strong> 和<strong>数据驱动</strong>。这三条原则，几乎涵盖了编程的所有方方面面，即便是在新技术层出不穷的今天，只要你想提升编程的技艺，从这三方面入手，并坚持实践原则，依然会获得很多新的启发。</p><h4 id="启示一-保持简单清晰性-能提升代码质量" tabindex="-1">启示一：保持简单清晰性，能提升代码质量 <a class="header-anchor" href="#启示一-保持简单清晰性-能提升代码质量" aria-label="Permalink to &quot;启示一：保持简单清晰性，能提升代码质量&quot;">​</a></h4><p>Unix 哲学中的&quot;简单原则&quot;，是现在被应用得最多的原则之一（现在我们更习惯称它为&quot;模块化&quot;）。这条原则的大致宗旨就是：<strong>一个程序只做一件事，并做得很好。</strong> 听上去这条原则非常简单，但它实际上却能极大地降低软件复杂度。</p><p>那什么是软件复杂度呢？</p><p>目前，对于软件复杂度的定义尚未统一，我个人认为比较好的定义是 Manny Lehman 教授在软件演进法则中提出的：</p><blockquote><p>软件复杂度（区别于计算复杂度）是对影响软件内部关联关系的属性的描述。</p></blockquote><p>简单来说，就是<strong>代码之间的相互影响越多，软件越复杂</strong>。比如，A 依赖 B，B 依赖 C......一直这样循环下去，程序就会变得非常复杂，也就是我们编程中常说的，如果一个类文件写了上万行代码，那么代码逻辑将会非常难理解。</p><p>软件复杂度一般有以下三个来源。</p><ul><li><p><strong>代码库规模</strong>。这个就与开发工具、编程语言等有关了，不过需要注意，代码行数与复杂度并不呈正相关。比如，Java 语言编写的库通常会比 C++ 的库的代码行数更多（语言特性决定），但不能说 Java 类库就一定比 C++ 的类库更复杂。</p></li><li><p><strong>技术复杂度</strong>。这个指的是不同的编程语言、编译器、服务器架构、操作系统等能够被开发人员理解的难易程度。比如，著名的 Netty 库，对于很多 Java 程序员来说，理解起来就有一定的难度，这就是有一定的技术复杂度。</p></li><li><p><strong>实现复杂度</strong>。不同的编程人员，对于需求的理解不同，在编程时就会有截然不同的编写风格，比如，前端程序员和后端程序员网页分页的代码实现风格就会明显不同。</p></li></ul><p>那么，该如何降低软件复杂度呢？</p><p>虽然复杂度的来源不同，但是我们都可以通过保持简单性来降低复杂度。那如何来保持简单性呢？</p><p>首先，在代码库规模方面，可以<strong>通过减少硬编码来控制代码量</strong>。比如，使用设计模式中的策略模式来替换大量的 if-else 语句，使用通用工具类来减少重复的方法调用。除此之外，还可以利用语言特性来减少代码量，比如，在 Java 8 中使用 lambda 表达式来精简语句。</p><p>其次，对于技术复杂度来说，要想在整体上保持简单性，需要<strong>在设计时就做好技术选型</strong>。换句话说，好的技术选型能够有效控制组件引入技术复杂度的风险。比如，在做系统设计时，引入像 Kafka 这样的消息中间件之前，你需要从系统吞吐量、响应时间要求、业务特性、维护成本等综合维度评估技术复杂度，如果你的系统并不需要复杂的消息中间件，那么就不要引入它，因为一旦引入后，就会面临指派人员学习与维护、出现故障后还要能及时修复等问题。</p><p>最后，就降低实现复杂度而言，可以使用<strong>统一的代码规范</strong>。比如，使用 Google 开源项目的编码规范，里面包含了命名规范、注释格式、代码格式等要求。这样做的好处在于，能快速统一不同开发人员的编程风格，避免在维护代码时耗费时间去适应不同的代码风格。</p><p>所以，Unix 哲学中所说的保持简单性，并不单单是做到更少的代码量，更是在面对不同复杂度来源时也能始终保持简单清晰的指导原则。</p>',18),u=p('<h4 id="启示二-借鉴组合理念-有效应对多变的需求" tabindex="-1">启示二：借鉴组合理念，有效应对多变的需求 <a class="header-anchor" href="#启示二-借鉴组合理念-有效应对多变的需求" aria-label="Permalink to &quot;启示二：借鉴组合理念，有效应对多变的需求&quot;">​</a></h4><p>对于任何一个开发团队来说，最怕遇见的问题莫过于：<strong>不停的需求变更导致不停的代码变更。</strong></p><p>即便你花费了大量的时间，在项目前期做了详细的需求分析和系统的分析设计，依然不能完全阻挡需求的变化，而一旦需求发生变更，那么就意味着开发团队需要加班加点地修改代码。</p><p>事实上，Unix 在设计之初就已经遇见过这些问题，那它是怎么解决的呢？下面我们就来看一下 Unix 那些能够&quot;任意组合&quot;的例子。</p><ul><li><p><strong>所有的命令都可以使用管道来交互。</strong> 这样，所有命令间的交互都只和 STD_IN、STD_OUT 设备相关。于是，就可以使用管道来任意地拼装不同的命令，以完成各式各样的功能。</p></li><li><p><strong>可以任意地替换程序。</strong> 比如，我喜欢 zsh，你喜欢 bash，我们可以各自替换；你喜欢 awk，我不喜欢 awk，也可以替换为 gawk。快速切换到熟悉的程序，每个程序就像一个零件一样，任意插拔。</p></li><li><p><strong>自定义环境变量。</strong> 比如，Java 编译环境有很多版本，你可能用到的有版本 8、11 和 14，通过自定义 JAVA_HOME 环境变量，你就可以快速启用不同的编译环境。</p></li></ul><p>这充分说明了 Unix 哲学的组合思维：<strong>把软件设计成独立组件并能随意地组合，才能真正应对更多变化的需求</strong>。</p><p>然而，在实际工作中，你很多时候可能都只是在做&quot;定制功能驱动&quot;式的程序设计。比如，用户需要一个&quot;上传文件的红色按钮&quot;，你就实现了一个叫&quot;红色上传按钮功能&quot;的组件，过几天变为需要一个&quot;上传文件的绿色按钮&quot;时，你再修改代码满足要求......这不是组合设计，而是直接映射设计，看似用户是需要&quot;上传&quot;这个功能，但实际上用户隐藏了对&quot;不同颜色&quot;的需求。</p><p>很多时候看上去我们是一直在设计不同的程序，实际上对于真正多变的需求，我们并没有做到组合设计，只是通过不断地修改代码来掩饰烂设计罢了。</p><p>要想做到组合设计，Unix 哲学其实给我们提供了两个解决思路。</p><p>第一个是<strong>解耦</strong>。这是 Unix 哲学最核心的原则。代码与代码之间的依赖关系越多，程序就越复杂，只有将大程序拆分成小程序，才能让人容易理解它们彼此之间的关系。也就是我们常说的在设计时应尽量分离接口与实现，程序间应该耦合在某个规范与标准上，而不是耦合在具体代码实现逻辑上。</p><p>第二个是<strong>模块化</strong> 。你可能已经非常熟悉这个词语了，不过模块化还有更深层的含义------<strong>可替换的一致性</strong>。什么叫可替换的一致性？比如，你想使用 Java RPC 协议，可以选择 Dubbo、gRPC 等框架，RPC 协议的本质是一样的，就是远程过程调用，但是实现的组件框架却可以不同，对于使用者来说，只要是支持 Java RPC 协议的框架就行，可随意替换，这是可替换。而不同的框架需要实现同一个功能（远程过程调用）来保持功能的一致性（Dubbo 和 gRPC 的功能是一致的），这是一致性。</p><p>实际上，这两个解决思路就是现在我们常说的<strong>高内聚、低耦合原则：模块内部尽量聚合以保持功能的一致性，模块外部尽量通过标准去耦合</strong>。换句话说，就是提供机制而不是策略，就像上传文件那个例子里，分析时应该找出用户隐含的颜色变化的需求，并抽象出一个可以自定义颜色的功能模块，解耦上传文件模块，最后将颜色变化模块组合到上传文件模块来对外提供使用。这样当用户提出修改颜色时（修改策略），只需要修改自定义颜色模块就行了，而不是连同上传文件的机制也一起修改。</p><h4 id="启示三-重拾数据思维-重构优化程序设计" tabindex="-1">启示三：重拾数据思维，重构优化程序设计 <a class="header-anchor" href="#启示三-重拾数据思维-重构优化程序设计" aria-label="Permalink to &quot;启示三：重拾数据思维，重构优化程序设计&quot;">​</a></h4><p>现如今，各种编程模式、原则、方法、技巧满天飞，我认为都抵不过一条对&quot;数据是什么&quot;的彻底理解。比如，搞清楚如何组织数据结构、如何产生数据、如何处理数据、如何存储数据、如何展示数据、如何删除数据......</p><p>因为再高大上的架构设计，如果系统对数据的组织是混乱的，那么可以轻松预见随着系统的演进，系统必然会变得越来越臃肿和不可控。</p><p>如今，在互联网应用中，绝大多数应用程序都是数据密集型的，而非计算密集型。在数据密集型应用中，<strong>处理数据是主要挑战</strong>，而使用 CPU 计算不是瓶颈，更大的问题来自数据量、数据复杂性以及数据的变更速度。</p><p>你可能经常听到这些词汇：NoSQL、大数据、分布式缓存、最终一致性、ACID、CAP、云计算、MapReduce、实时流处理等。其实，它们无一不是在应对数据带来的挑战。比如，一个购物订单里包含了用户收货地址、支付信息、商品信息、下单时期、物流状态等数据，订单系统需要处理这些数据，并反馈结果给用户，这样来看，一个 Web 请求其实就变成了一次数据流的处理。</p><p>Unix 哲学在出现之初便提出了&quot;<strong>数据驱动编程</strong> &quot;这样一个重要的编程理念。也就是说，<strong>在 Unix 的理念中，编程中重要的是数据结构，而不是算法</strong>。</p><p>当数据结构发生变化时，通常需要对应用程序代码进行修改，比如，添加新数据库字段、修改程序读写字段等。但在大多数应用程序中，代码变更并不是立即完成的。原因有如下：</p><ul><li><p>对于服务端应用程序而言，可能需要执行增量升级，将新版本部署到灰度环境，检查新版本是否正常运行，然后再完成所有的节点部署；</p></li><li><p>对于客户端应用程序来说，升不升级就要看用户的心情了，有些用户可能相当长一段时间里都不会去升级软件。</p></li></ul><p>这就意味着新旧版本的代码以及新旧数据格式可能会在系统中同时共存。这时，处理好数据的兼容性就变得非常重要了。如果不具备数据思维，很可能会假设数据格式的变更不会影响代码变更。</p><p>而 Unix 哲学提出的&quot;<strong>数据驱动编程</strong> &quot;<strong>会把代码和代码作用的数据结构分开，这样在改变程序的逻辑时，就只要编辑数据结构，而不需要修改代码了</strong>。</p><p>这里我举一个与网站数据埋点相关的案例。</p><p>就拿电商网站的网页来说，里面一定有很多商品的链接和购买下单的操作，如果是基于传统事件驱动的设计，我们一般只会处理点击商品链接的响应事件（例如，点击操作后会展示详细商品信息）。但是，我们现在知道，除了正常的功能数据外，还有用户点击的时间数据、点击的总量数据、浏览路径数据等，而这些数据对于网站来说其实才更重要。</p><p>如果你具备&quot;数据驱动编程&quot;的思维，那么你在设计商品购买链接时，就会联想到能否加入用户行为的埋点数据，在编程时会有意识地预留一些接口功能或抽象相关模块，即使对于已经完成功能开发的程序，你也会在日后重构时关注数据埋点的变化。</p><p>可以这么说，最初的&quot;数据驱动编程&quot;看重的只是编写尽可能少的固定代码，然而随着时代的发展，&quot;数据驱动编程&quot;的思想逐渐从优化算法的设计，演化成以解决数据变化为中心的设计方法。</p><h3 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h3><p>Unix 设计哲学强调构建简单、清晰、模块化可扩展和数据驱动的代码。只有这样，代码才可以由其创建者以外的开发人员轻松维护和重新利用。</p><p>Unix 早期创新性地提出了要进行模块化设计的思想改变，这个看似简单的改变，其实经过好长时间的演化后才成为今天的通用准则。所以，我们现在会理所应当地认为写代码就应该模块化、尽量可重用。但其实在软件开发的早期，那时的程序员并不这么认为，模块化在当时也并不很受欢迎，因为那时的计算机硬件很昂贵，在一个系统里集成更多的模块才是最佳选择。</p><p>在我看来，Unix 哲学传达给我们的不只是一种不断在编程中实践验证的理念，还是一种敢于挑战权威不断创新的思考方法。</p>',30),c=t("p",null,"总体来说，Unix 哲学对今天的软件编程依然很有意义，它不只是为我们总结了几个原则，而且还发展出了一套完整的思想体系，影响着一代又一代的开发人员。",-1),x=t("h3",{id:"课后思考",tabindex:"-1"},[e("课后思考 "),t("a",{class:"header-anchor",href:"#课后思考","aria-label":'Permalink to "课后思考"'},"​")],-1),h=t("p",null,"Unix 刚诞生时，便决定舍弃高效率而选择可移植性，那你知道还有哪些技术选择了兼容性而牺牲了性能，最后却在如今这个时代里大放异彩的吗？欢迎你在留言区与我分享。",-1),d=t("p",null,"在下一讲，我会接着和你分享代码分层架构相关的内容，这是分层思维很好的一个实践，记得按时来听课。",-1);function q(U,m,b,P,A,C){const o=s("Image");return i(),r("div",null,[l,n(o,{alt:"设计模式02--金句1.png",src:"https://s0.lgstatic.com/i/image6/M01/1E/00/Cgp9HWBQSM-APnNuAAXveH1cdCo784.png"}),g,n(o,{alt:"设计模式02--金句2.png",src:"https://s0.lgstatic.com/i/image6/M00/1E/00/Cgp9HWBQSOGAFV3nAAX-MyKrlN0182.png"}),u,n(o,{alt:"设计模式02--金句3.png",src:"https://s0.lgstatic.com/i/image6/M00/1E/00/Cgp9HWBQSPKAdZGeAAXzS7kcR0Y570.png"}),c,x,h,d])}const S=a(_,[["render",q]]);export{k as __pageData,S as default};
