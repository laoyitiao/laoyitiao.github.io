import{_ as p,j as l,o as s,g as n,k as o,h as e,Q as r,s as a}from"./chunks/framework.4e7d56ce.js";const T=JSON.parse('{"title":"01自动化测试框架知多少：概述、构成及常用框架类型","description":"","frontmatter":{},"headers":[],"relativePath":"posts/devops/114-测试开发入门与实战文档/(4663) 01  自动化测试框架知多少：概述、构成及常用框架类型.md","filePath":"posts/devops/114-测试开发入门与实战文档/(4663) 01  自动化测试框架知多少：概述、构成及常用框架类型.md","lastUpdated":1696682708000}'),i={name:"posts/devops/114-测试开发入门与实战文档/(4663) 01  自动化测试框架知多少：概述、构成及常用框架类型.md"},_=r('<h1 id="_01自动化测试框架知多少-概述、构成及常用框架类型" tabindex="-1">01自动化测试框架知多少：概述、构成及常用框架类型 <a class="header-anchor" href="#_01自动化测试框架知多少-概述、构成及常用框架类型" aria-label="Permalink to &quot;01自动化测试框架知多少：概述、构成及常用框架类型&quot;">​</a></h1><p>通过前面课时的学习和讨论，我想你对于测试开发工程师的技术等级划分，以及日常工作都已经有所了解了。</p><p>那么，当你拿到你的第一个测试开发新手任务------测试框架开发之后，应该从何入手呢？</p><p>俗话说&quot;万丈高楼平地起&quot;，对于测试框架来说，<strong>最致命的问题就是，投入使用后才发现框架结构不清晰，设计不合理，从而导致测试框架不可扩展、无法迁移，</strong> 可见测试框架有多么重要。</p><p>比如，我之前带过一个徒弟，他第一次写测试框架时，把本应该属于框架基础的查找待运行测试的功能放在了与业务耦合的 Page 类里，而且在查找文件的时候，其针对文件路径的处理又没有用操作系统分隔符，而是直接用的Windows 上的文件分隔符。</p><p>当时我问了两个问题：</p><ul><li><p>如果我们换一个项目，想要用你的框架，可以直接用吗？</p></li><li><p>我现在的测试要换到 Mac 系统上去做，你的框架还能正常运行吗？</p></li></ul><p>很显然，他的第一次尝试不够成功，不过这也说明了测试框架的设计是有一定规律可循的。那么，有哪些规律需要遵守呢？不急，这事儿我放在下一讲和你说，这一讲我想先来跟你聊聊什么是测试框架，它有哪些构成，以及常见的类型有哪些，这些是你进入下一讲内容之前必须要掌握的知识。</p><h3 id="自动化测试框架的引入" tabindex="-1">自动化测试框架的引入 <a class="header-anchor" href="#自动化测试框架的引入" aria-label="Permalink to &quot;自动化测试框架的引入&quot;">​</a></h3><p>我认为，测试框架好比工具箱，其作用是可以<strong>便捷、高效</strong>地完成测试工作。而测试框架的引入，往往不是一蹴而就的，好的测试框架都是在实践中逐渐演化而来的。</p><p>下面我讲一个不那么恰当但很形象的&quot;猩猩吃甜点&quot;的例子，向你讲解测试框架的引入流程，并以此说明测试框架的作用。</p>',11),g=r('<p>&quot;吃甜点&quot;这件小事，从毫无章法，变成一件有流程、有仪式感、让人会感到幸福的事，&quot;木条&quot;在其中起了很重要的作用；同样地，让测试变得更加规范化、流程化、效率化，&quot;测试框架&quot;在其中也起了很大的作用。</p><p>那么，测试框架有哪些构成呢？下面我来为你一一讲解。</p><h3 id="自动化测试框架的构成" tabindex="-1">自动化测试框架的构成 <a class="header-anchor" href="#自动化测试框架的构成" aria-label="Permalink to &quot;自动化测试框架的构成&quot;">​</a></h3><p>一个成熟的测试框架主要由 4 部分组成：基础模块、管理模块、运行模块和统计模块，接下来我将逐一讲解。</p><h4 id="_1-基础模块" tabindex="-1">1. 基础模块 <a class="header-anchor" href="#_1-基础模块" aria-label="Permalink to &quot;1. 基础模块&quot;">​</a></h4><p>如果把自动化测试框架比作一辆汽车，那么自动化测试基础模块就是那四只轮胎，没有它们，这辆汽车寸步难行，它们一般包括如下部分。</p><ul><li><p><strong>底层核心驱动库：</strong> 一般指用于操作被测试应用程序的第三方库，例如在 Web 端的 Selenium/WebDriver。</p></li><li><p><strong>可重用的组件：</strong> 一般用来降低开发成本，常见的有时间处理模块、登录模块等。</p></li><li><p><strong>对象库：</strong> 存储被测试对象的仓库。在实际应用中，常常将页面进行分组，把一个页面上的所有对象放到一个类里，也就是 Page Object 模式。</p></li><li><p><strong>配置文件：</strong> 包括测试环境的配置和应用程序的配置。<strong>测试环境配置</strong> ，指的是一个功能从开发代码完成到上线，往往要经过几个测试环境的测试，测试环境的配置能够减少环境切换成本；<strong>应用程序配置</strong>，主要包括被测试程序的一些配置，利用配置文件，可以做到在不更改代码的情况下覆盖相同程序的不同程序配置。</p></li></ul><h4 id="_2-管理模块" tabindex="-1">2. 管理模块 <a class="header-anchor" href="#_2-管理模块" aria-label="Permalink to &quot;2. 管理模块&quot;">​</a></h4><p>自动化测试管理模块就好比汽车的内饰和外观，它对测试框架的使用操作体验有着直接影响，一般可分为测试数据管理和测试文件管理两部分。</p><ul><li><strong>测试数据管理</strong></li></ul><p>测试数据存放的文件是否跟测试用例强绑定，以及测试数据是否容易替换、是否和测试框架耦合等，这些都决定着测试框架的&quot;内饰&quot;好坏。</p><p>测试数据，一般指测试用例用到的各种测试数据，它们是为了验证业务正确性而构造的，每一条测试用例一般对应着一组或多组测试数据，测试数据创建一般分为实时创建和事先创建。</p><p><strong>实时创建，</strong> 是在测试代码运行时才生成的测试数据。其好处有：测试数据是和测试代码耦合的，测试人员不需要关心其创建过程和业务调用链，通常用在测试的公用功能上。例如，给用户绑定银行卡以方便后续支付等。而坏处则是如果调用链太长，耗时会比较久。</p><p><strong>事先创建，</strong> 是指测试代码运行前就准备好数据文件。其好处是数据拿来即用，几乎不耗费时间，由于没有业务调用，所以这在一定程度上减少了调用失败的风险；坏处则是数据文件本身需要维护，以保持可用性和正确性。</p><p>测试数据在测试中非常重要，它关系到你的测试是否有效，测试框架要做到对测试数据有效管理。</p><ul><li><strong>测试文件管理</strong></li></ul><p>测试文件管理就好比汽车的颜色和外观，决定着第一印象，所以测试框架的文件结构应该清晰有序、一目了然。</p><p>比如，一个测试用例应该对应建立三个文件，分别是：Page 类文件（xxxPage，根据 PO 模型）、测试类文件（testxxxPage）和对象库文件（xxxPageYml）。</p><p>这三个文件共同描述了一个完整的测试用例，当你看到一个 Page 类时，就应该做到它还有一个对应的测试类。</p><p>测试文件的结构清晰有助于他人理解测试框架的设计思想，更有利于测试框架的维护和推广。</p><h4 id="_3-运行模块" tabindex="-1">3. 运行模块 <a class="header-anchor" href="#_3-运行模块" aria-label="Permalink to &quot;3. 运行模块&quot;">​</a></h4><p>自动化测试运行模块是测试框架的发动机，它主要用于测试用例的组织和运行，一般包括如下部分。</p><ul><li><p><strong>测试用例调度，驱动机制。</strong> 测试框架应能按需组织，调度测试用例生成、执行。举例来说，测试框架可以在运行时根据使用者给定的 Tag 动态挑选要运行的测试用例，并把它们调度执行（可以顺序执行，也可以并发执行，还可以远程执行）。</p></li><li><p><strong>错误恢复机制。</strong> 由于测试环境、测试程序、测试代码存在各种不确定因素，测试框架应该具备一定的错误恢复机制。在测试用例执行中，引起错误的类型一般可分为<strong>代码/运行导致的错误</strong> 和<strong>环境/依赖导致的错误</strong>，测试框架应该能够识别这两种错误并给予相应的处理。</p></li><li><p><strong>持续集成支持。</strong> 测试框架应该能够和 CI 系统低成本集成，包括通过用户输入参数指定运行环境、测试结束后自动生成测试报告等。</p></li></ul><h4 id="_4-统计模块" tabindex="-1">4. 统计模块 <a class="header-anchor" href="#_4-统计模块" aria-label="Permalink to &quot;4. 统计模块&quot;">​</a></h4><p>自动化测试统计模块，就相当于汽车的品质和口碑。好的统计模块，不仅能告诉你当前的测试有没有 Bug，还能分析软件质量随着时间的演变情况，这是测试框架的质量体现。</p><p>自动化测试统计模块一般包括如下两部分：</p><ul><li><p><strong>测试报告。</strong> 测试报告应该全面，包括测试用例条数统计、测试用例成功/失败百分比、测试用例总执行时间等总体信息。其中，对于单条测试用例，还应该包括测试用例 ID、测试用例运行结果、测试用例运行时间、测试用例所属模块、测试失败时刻系统截图、测试的日志等信息。</p></li><li><p><strong>日志模块。</strong> 测试框架应该包括完善的日志文件，方便出错时进行排查和定位。</p></li></ul><h3 id="常用的测试框架类型" tabindex="-1">常用的测试框架类型 <a class="header-anchor" href="#常用的测试框架类型" aria-label="Permalink to &quot;常用的测试框架类型&quot;">​</a></h3><p>测试框架有很多类型，比较常见的有以下四类。</p><h4 id="_1-模块化测试框架" tabindex="-1">1. 模块化测试框架 <a class="header-anchor" href="#_1-模块化测试框架" aria-label="Permalink to &quot;1. 模块化测试框架&quot;">​</a></h4><p>模块化测试框架是利用 OOP 思想和 PO 模式改造而来的框架。</p><p>模块化测试框架把整个测试分为多个模块，模块化有以下几个特征：</p><ul><li><p>我们将一个业务或者一个页面成为一个 Page 对象；</p></li><li><p>这个 Page 对象，我们以一个 Page 类来表示它；</p></li><li><p>这个 Page 类里存放有所有这个 Page所属的页面对象、元素操作；</p></li><li><p>页面对象和元素操作组成一个个的测试类方法，供测试用例层调用。</p></li></ul><p>简单来说，<strong>使用了 PO 模式的框架就可以叫作模块化测试框架</strong>。</p><ul><li><p>模块化测试框架的<strong>好处</strong>在于方便维护，你的测试用例可以由不同模块的不同对象组成；</p></li><li><p><strong>坏处</strong>在于你需要非常了解你的系统及这些模块是如何划分的，才能在测试脚本里自如地使用，否则你就会陷入重复定义模块对象的循环里。</p></li></ul><h4 id="_2-数据驱动框架" tabindex="-1">2. 数据驱动框架 <a class="header-anchor" href="#_2-数据驱动框架" aria-label="Permalink to &quot;2. 数据驱动框架&quot;">​</a></h4><p>数据驱动框架主要解决了<strong>测试数据的</strong>问题。</p><p>在测试中，我们常常需要为同一个测试逻辑，构造不同的测试数据以满足业务需求，这些测试数据可以保存在测试代码里，也可以保存在外部文件里（包括 Excel、File、DB）。</p><p>数据驱动框架的<strong>精髓</strong>在于，输入 M 组数据，框架会自动构造出 M 个测试用例，并在测试结果中把每一个测试用例的运行结果独立展示出来。</p><p>在 Python 架构里，最出名的数据驱动框架就是 DDT。</p><blockquote><p>这个后续我会在第 11 和 12 课时的&quot;DDT：博采众长，数据驱动的秘诀&quot;详细介绍并实现。</p></blockquote><h4 id="_3-关键字驱动框架" tabindex="-1">3. 关键字驱动框架 <a class="header-anchor" href="#_3-关键字驱动框架" aria-label="Permalink to &quot;3. 关键字驱动框架&quot;">​</a></h4><p>关键字驱动其实就是把一系列代码操作封装成一个关键字（这个关键字其实是函数名），在测试里，可以通过使用组合关键字的方式来生成测试用例，而不去关心这个关键字是如何运作的。</p><p>关键字的一个典型应用是将登录操作封装为关键字 Login，之后在后续代码里，有关 Login的操作，就仅需调用这个关键字 Login，而不必又重新进行一次登录操作。</p><p>关键字在领域里的最佳应用典范我认为是<strong>BDD</strong>（行为驱动开发），它甚至被当成一种独立的敏捷软件开发技术来使用。</p><h4 id="_4-混合模型" tabindex="-1">4. 混合模型 <a class="header-anchor" href="#_4-混合模型" aria-label="Permalink to &quot;4. 混合模型&quot;">​</a></h4><p>需要注意的是，没有任何规定要求你的测试框架要属于以上某种类型，因为测试框架的存在不是为了分类型，而是为了更好地测试。</p><p>所以在工作中，我们常常需要糅合不同框架模型，我们将这种模式的测试框架称为混合模型。混合模型可以包含模块化框架，也可以使用数据驱动，或者使用 BDD 模式。</p><h3 id="小结" tabindex="-1">小结 <a class="header-anchor" href="#小结" aria-label="Permalink to &quot;小结&quot;">​</a></h3><p>这一讲，我们讨论了自动化测试框架的一些基本概念和类型，就像大猩猩使用工具提升吃饭效率一样，测试框架的引入能大大提升测试效率；也讲解了自动化测试框架的基础组成部分，有助你在后续的框架设计中，更全面地评估你的测试框架水平；最后介绍了测试框架的类型，助于你辨别，融合不同的测试框架类型，设计出更合适的测试框架。</p><p>为了便于你理解，我把本节的内容做了一个脑图，供你查阅。</p>',51),h=a("p",null,"最后给你留个思考题：你认为，一个测试框架最具竞争力的地方，应该是哪个部分呢？欢迎你在下方留言区与大家分享讨论。",-1),c=a("hr",null,null,-1),u=a("p",null,[a("a",{href:"https://shenceyun.lagou.com/t/eka",target:"_blank",rel:"noreferrer"},'"测试开发工程师名企直推营" 入口，免费领取 50G 资料包')],-1);function d(q,m,P,b,x,f){const t=l("Image");return s(),n("div",null,[_,o(t,{alt:"2.png",src:"https://s0.lgstatic.com/i/image/M00/4D/32/Ciqc1F9ZyfmAdk-6AAETgnqFtrY709.png"}),e(),o(t,{alt:"1.png",src:"https://s0.lgstatic.com/i/image/M00/4D/2F/Ciqc1F9ZxsuAbeA1AAQi68P0Ibk588.png"}),e(),g,o(t,{alt:"image (2).png",src:"https://s0.lgstatic.com/i/image/M00/4D/35/CgqCHl9ZwXKAdvTmAAGKcfF0v8c323.png"}),e(),h,c,u])}const D=p(i,[["render",d]]);export{T as __pageData,D as default};
