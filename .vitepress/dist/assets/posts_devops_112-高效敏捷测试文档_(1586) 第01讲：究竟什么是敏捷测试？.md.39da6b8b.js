import{_ as e,j as a,o as l,g as r,k as i,h as o,s as t,Q as s}from"./chunks/framework.cfb14fe0.js";const v=JSON.parse('{"title":"第01讲：究竟什么是敏捷测试？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/devops/112-高效敏捷测试文档/(1586) 第01讲：究竟什么是敏捷测试？.md","filePath":"posts/devops/112-高效敏捷测试文档/(1586) 第01讲：究竟什么是敏捷测试？.md","lastUpdated":1696682708000}'),n={name:"posts/devops/112-高效敏捷测试文档/(1586) 第01讲：究竟什么是敏捷测试？.md"},u=t("h1",{id:"第01讲-究竟什么是敏捷测试",tabindex:"-1"},[o("第01讲：究竟什么是敏捷测试？ "),t("a",{class:"header-anchor",href:"#第01讲-究竟什么是敏捷测试","aria-label":'Permalink to "第01讲：究竟什么是敏捷测试？"'},"​")],-1),_=t("p",null,'2013 年，在 InfoQ 发表了相同标题的文章，但这篇文章是全新而作。在回答"究竟什么是敏捷测试"之前，我先问一个问题：你了解敏捷开发吗？',-1),c=t("br",null,null,-1),d=t("p",null,'虽然我听不到你的回答，但还是先提醒你回忆一下著名的敏捷宣言和 12 项敏捷开发原则，带着这些回忆或过去的思考，来听听我下面给你讲的案例，在听的过程中，你可以去审视这个案例，来判断哪些符合敏捷价值观，哪些又违反了敏捷开发原则，最后我们一起来分析案例，并回答"究竟什么是敏捷测试"。',-1),h=t("h2",{id:"从传统测试转型到敏捷测试的案例",tabindex:"-1"},[o("从传统测试转型到敏捷测试的案例 "),t("a",{class:"header-anchor",href:"#从传统测试转型到敏捷测试的案例","aria-label":'Permalink to "从传统测试转型到敏捷测试的案例"'},"​")],-1),q=t("p",null,"这个案例来自一家国内的公司，这家公司的产品主要是基于 Android 系统的智能终端。故事发生在 6 年前，即 2013 年，这家公司的软件研发部门在这一年开始了一系列面向敏捷测试的尝试。",-1),b=t("br",null,null,-1),m=t("p",null,"先给大家介绍一下案例背景，公司的软件研发部门下属有四个开发部门和一个庞大的测试部门，其中，一个负责各种研发工具开发的部门也隶属于测试部门。开发人员和测试人员比例几乎是 1:1，开发部门的职责是按照负责的功能模块划分的，而测试部门负责软件系统级别的所有测试，包括功能测试、性能测试、安全性测试、可靠性测试、兼容性测试等。当时采用的是传统的瀑布式开发模式，即 V 模型，代码编写和产品测试被明确地分成了两个阶段，如图 1 所示：",-1),g=t("br",null,null,-1),f=s('<p>图1 软件研发的 V 模型</p><br><h3 id="_1-持续集成的尝试" tabindex="-1"><strong>1. 持续集成的尝试</strong> <a class="header-anchor" href="#_1-持续集成的尝试" aria-label="Permalink to &quot;**1. 持续集成的尝试**&quot;">​</a></h3><p>这里所用到的工具包括：分布式的代码版本控制工具 Git + 代码审查工具 Gerrit + 持续集成工具 Jenkins + 自研的基于 Monkey Runner 的自动化测试框架。基于 Git + Gerrit + Jenkins，开发部门已经实现了代码的自动构建。</p><br><p>希望达到的目标是代码提交后完成自动构建、自动部署和自动化测试，并且自动生成测试报告。在实施过程中，工具链没有问题，自动构建和自动部署也没有问题，问题就出在自动化测试上。</p><br><p>一个产品的手工测试用例大概是 1000 个，但是能转化为自动化脚本并且放在集成环境里执行的用例，在很长时间内只有 100 多个，只实现了版本验证，即我们通常所说的&quot;冒烟测试&quot;。这意味着，当开发人员提交代码，触发的自动化测试达到的覆盖率非常有限，即使这个集成环境能够支持持续验证，所有人都觉得很鸡肋。</p><br><h3 id="_2-测试前移和组织架构的尝试" tabindex="-1"><strong>2. 测试前移和组织架构的尝试</strong> <a class="header-anchor" href="#_2-测试前移和组织架构的尝试" aria-label="Permalink to &quot;**2. 测试前移和组织架构的尝试**&quot;">​</a></h3><p>当时对测试前移的定义是在软件编码阶段就进行测试，而不是等到开发结束以后才开始测试。简单的说就是<strong>边开发边测试，期望通过这个缩短产品开发周期</strong>。</p><br><p>（1）第一阶段</p><p>开发部门按照 Scrum Team 进行划分，按照 3:1 的比例招聘了测试工程师。一开始没想明白他们到底需要什么样的测试人员，所以招来的基本上都是手工测试，看不懂代码的居多。</p><br><p>他们在 Scrum Team 里的主要工作包括：手工测试；一遍遍按照开发的要求复现 bug；给开发人员打杂，比如给终端更新一个新版本、找找开发想要验证的硬件型号，等等。而在项目早期，产品硬件不到位或者软件集成到一起不工作时，手工测试则没法进行。</p><br><p>（2）第二阶段</p><p>领导们本来希望通过敏捷模式可以减少测试人员的数量，但事与愿违，测试部门专门负责系统测试的人员并没有减少，反而在开发部门内部又多了几十名测试。原因在于两拨人马用的测试方式都差不多，人多了，无非体现在报的 bug 多了，测试部门看重的是需求的覆盖率，人自然减不下来。</p><br><p>所以，在一次改组中，领导宣布所有的测试人员都转到测试部门，要求测试部门减掉相应数量的测试外包。Scrum Team 可以向测试部门要求按 3:1 的比例配备测试人员。测试部门能够了解 Scrum Team 的测试范围，减少了重复测试。改组之后，人数倒是减下来了，但是仍然以手工测试为主，因为组织架构的变更，开发和测试经常因为谁对开发阶段的测试说了算而争论不休，开发和测试变得更加泾渭分明，关系更紧张了。</p><br><p>（3）第三阶段</p><p>经过一段时间的运行，觉得这样不行，不符合敏捷团队的特征，又决定把负责开发阶段测试的人员转到开发部门。良好的转变是：每个 Scrum Team 开始由一名资深测试工程师担任 Test Owner，负责制定测试策略和测试计划，以及协调开发测试与系统测试之间的安排。开发部门也开始对开发阶段的测试工程师进行开发能力的培养。</p><br><h3 id="_3-单元测试的尝试" tabindex="-1"><strong>3. 单元测试的尝试</strong> <a class="header-anchor" href="#_3-单元测试的尝试" aria-label="Permalink to &quot;**3. 单元测试的尝试**&quot;">​</a></h3><p>一开始单元测试的覆盖率几乎是 0，开发人员只管写代码和修复测试人员提交的缺陷。由于持续集成和测试前移的不成功，大家认为开发部门应该要求开发人员做单元测试，以代码覆盖率衡量单元测试的结果。开发也答应做，但是整整一年未见成效，原因是：忙，没有单元测试的经验和技能。</p><br><h3 id="_4-测试能力更新的尝试" tabindex="-1"><strong>4. 测试能力更新的尝试</strong> <a class="header-anchor" href="#_4-测试能力更新的尝试" aria-label="Permalink to &quot;**4. 测试能力更新的尝试**&quot;">​</a></h3><p>测试部门意识到自动化的重要性，但是部门只有 5% 的工程师负责自动化测试。经过层层申请，公司同意采取末位淘汰制替换 10% 的手工测试工程师。通过内部转岗、外部招聘，以及员工培训的多种方式，在一年之后自动化测试工程师的比例终于达到了 25%。团队开始搭建统一的自动化测试框架。自动化测试在 API 和 UI 测试的覆盖率终于看到明显提高，但是在整体需求覆盖率上也没有超过 30%，而且单元测试的缺失依然是硬伤，没有开发人员的参与，测试总在 UI 层折腾，当然是事倍功半。</p><br><p>从这个例子可以看出，这家公司的研发部门从传统测试转型到敏捷测试的过程中，并不清楚什么是真正的敏捷测试，而是摸着石头过河，不断尝试，每走一步都很艰难，而且走了不少弯路，最后还没有达到敏捷测试的彼岸，更不用说，产品的质量和测试的效率得到显著的提升。</p><h2 id="什么是敏捷测试" tabindex="-1">什么是敏捷测试 <a class="header-anchor" href="#什么是敏捷测试" aria-label="Permalink to &quot;什么是敏捷测试&quot;">​</a></h2><p>那究竟什么是敏捷测试呢？可以肯定的是，<strong>&quot;敏捷测试&quot;既不是一种测试方法，也不是一种测试方式，而是为了适应敏捷开发而特别设计的一套完整的软件测试解决方案</strong> 。这个解决方案应该**能够支持持续交付，**涵盖所需的、正确的价值观、思维方式、测试流程、一系列优秀的测试实践和更合适的测试环境、自动化测试框架和工具。敏捷测试可以采用目前已有的各种测试方式、方法，以及传统测试相比侧重有所不同，但主要的差别还是价值观、测试思维方式、流程和实践等。</p><br><p>敏捷测试应该具有&quot;敏捷宣言&quot;所倡导的价值观，为此我们可以按照&quot;敏捷宣言&quot;的格式，写出如下的&quot;敏捷测试宣言&quot;：</p><ul><li><p>与开发协作测试 胜于 测试分工与测试工具</p></li><li><p>可运行的测试脚本 胜于 写在纸上的测试用例</p></li><li><p>从客户角度来理解测试需求 胜于 从已定义的需求来判定测试结果</p></li><li><p>基于上下文及时调整测试策略 胜于 遵守测试计划</p></li></ul><br><p>敏捷测试强调&quot;与开发协作&quot;、&quot;自动化测试&quot;、&quot;客户思维&quot;和&quot;动态的测试策略调整&quot;更具有价值。</p><br><p>那我们回过头来，再看看上面的案例，至少第 1、2 条，他们没做到：测试人员没有得到足够的重视和尊重，开发和测试协作不够，而是：</p><ul><li><p>有一段时间还存在独立的测试部门，&quot;开发和测试变得更加泾渭分明，关系更紧张了&quot;</p></li><li><p>&quot;没有开发人员的参与，测试总在 UI 层折腾，当然是事倍功半&quot;</p></li><li><p>&quot;触发的自动化测试达到的覆盖率非常有限&quot;</p></li><li><p>......</p></li></ul><br><p>在转型初期，没有加强相关测试人员的培训，甚至都不知道敏捷模式对测试人员的要求，招进来的测试人员不合格。在执行过程中，缺乏测试策略，没有强调从客户的需求出发和动态地调整测试策略。</p><br><p>敏捷开发还有 12 项原则，上面案例中的团队有没有一条一条地、针对性地去对照着做？虽然敏捷开发 12 项原则似乎没有谈到测试，但测试是整个软件研发的一部分，自然也要遵守这些原则，适应敏捷开发的基本要求，例如：</p><ul><li><p>如何支撑或协助&quot;持续不断地、尽早交付有价值的软件&quot;？</p></li><li><p>如何拥抱变化------&quot;欣然面对需求变化，即使在开发后期也一样&quot;</p></li><li><p>......</p></li></ul><p>只有遵守这些原则，才能获得顺应敏捷开发的正确姿势，也只有采用敏捷开发的优秀实践，如测试驱动开发，并和开发紧密协作，测试才不会成为敏捷开发的&quot;绊脚石&quot;。</p><br><p>基于敏捷开发的 12 项原则，我制定了下列 8 项敏捷测试原则：</p><ul><li><p>尽早和持续地开展测试</p></li><li><p>基于风险的测试策略是必须的</p></li><li><p>测试计划、设计和执行力求简单</p></li><li><p>能及时完成对软件质量全面评估</p></li><li><p>软件本身是测试研究和分析最主要的对象</p></li><li><p>在满足所要求的质量，测试进行得越快越好</p></li><li><p>对测试技术精益求精</p></li><li><p>不断反思，持续优化测试流程与设计</p></li></ul><br><p>这些原则，在后面介绍的敏捷测试流程、实践中将会逐步地体现出来，到时再详细讲解。</p><br><p>由于篇幅有限，今天就谈到这里。如果觉得还不是很明白或者不过瘾，客官别急，后续我还会继续和你讨论敏捷测试的特点、敏捷测试思维方式和敏捷测试流程等，相信在看完或听完后面三讲的内容之后，就能更彻底地理解什么是敏捷测试。</p><br><p>最后，给你出一道思考题：上面我列了 8 条敏捷测试原则，你能否基于敏捷价值观和敏捷开发原则，再追加 1～4 条敏捷测试原则吗？欢迎留言讨论。</p>',57);function k(P,T,x,S,I,A){const p=a("Image");return l(),r("div",null,[u,_,c,d,h,q,b,m,g,i(p,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/6A/69/Cgq2xl5U_SWAPGwrAAEd98tsIuM845.png"}),o(),f])}const N=e(n,[["render",k]]);export{v as __pageData,N as default};
