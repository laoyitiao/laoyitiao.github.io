import{_ as n,j as p,o as s,g as i,k as o,Q as e,s as t,h as _}from"./chunks/framework.b3d8e22e.js";const k=JSON.parse('{"title":"何谓精准测试 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/devops/112-高效敏捷测试文档/(1615) 第30讲：代码依赖性分析与精准测试.md","filePath":"posts/devops/112-高效敏捷测试文档/(1615) 第30讲：代码依赖性分析与精准测试.md","lastUpdated":1696417798000}'),l={name:"posts/devops/112-高效敏捷测试文档/(1615) 第30讲：代码依赖性分析与精准测试.md"},r=e('<p>你好，我是敏捷测试专栏讲师朱少民，欢迎进入第 30 讲&quot;代码依赖性分析与精准测试&quot;。</p><p>在传统的开发模式中，产品上市前都会做一次完整的回归测试，在这个阶段项目会严格控制代码的改动，担心会引入重大缺陷，这种<strong>全量的回归测试</strong>的工作量就会很大，而且其中有一部分测试用例的执行是没必要的、是一种浪费，这是因为被测试的这部分没有受到影响。如果在测试过程中发现了不得不修复的缺陷，那么在代码修改后就只能凭测试人员的经验选取有限数量的测试用例来做 针对性的回归测试，选取很少的测试用例，风险比较大，而且缺少科学依据。</p><p>在敏捷开发里可没有这么长的时间留给回归测试，每一次迭代中可通过持续的自动化测试进行回归测试，即<strong>面向业务的系统级别测试</strong>。自动化测试带来的好处之一就是可以加大回归测试的频率和力度。但就像我在第 28 讲中分析敏捷测试风险时说的，敏捷测试的主要风险之一是自动化测试的有效性，包括日益庞大的自动化测试用例集维护起来比较困难、发现缺陷的能力弱、执行时间长等问题。比如一个线上的软件系统，研发团队紧急修复了一个缺陷，等着发布，却需要起码几个小时的回归测试。</p><p>那么，如何提高自动化测试的有效性，进而提高敏捷测试的效率呢？精准测试技术在这方面提供了很好的解决方案。</p><h4 id="何谓精准测试" tabindex="-1">何谓精准测试 <a class="header-anchor" href="#何谓精准测试" aria-label="Permalink to &quot;何谓精准测试&quot;">​</a></h4><p><strong>精准测试</strong>是一种软件测试分析技术，借助算法和工具，自动建立测试用例和软件代码之间的可视化追溯，同时分析代码依赖性，从而基于影响的代码，精准选择受影响的测试（用例），最大程度地优化要执行的测试范围。精准测试可以实现的功能包括：统计测试用例集的代码覆盖率、优化测试范围、迅速定位软件缺陷，以及分析和改进软件架构设计和代码结构等。</p><p>精准测试的基本过程（实现的原理）：</p><ul><li>借助代码覆盖率分析技术，建立代码和测试用例的映射关系，为每一个测试用例和代码的方法/代码块建立对应关系；</li><li>对代码进行依赖性分析，了解代码的类、方法或代码块之间的相互关联或调用关系；</li><li>拿到新的软件版本，和上一个软件版本做 Code Diff，确定哪些代码被改动了；</li><li>基于代码和测试用例的映射关系和代码依赖关系，就能确定受影响的测试（用例）；</li><li>执行受影响的测试（用例）。</li></ul><p>首先，当某个测试用例开始执行时，被测系统被驱动运行，程序内部代码执行逻辑和测试数据就会被记录并同步进行计算和分析，然后就可以得到测试用例和代码之间的映射关系。</p><p>基于用例和代码之间的映射关系，精准测试可以自动发现还没有被测试用例覆盖的代码，提醒研发人员补充新的测试用例；当某些代码发生改动，自动筛选出需要执行的回归测试用例。这就是精准测试的含义：<strong>既不多测，也不少测；软件实现了什么，就测什么；改了哪儿，就测哪儿。</strong></p><p><strong>精准测试可以实现软件缺陷的迅速定位</strong>。对于黑盒测试中发现的缺陷，测试人员一般会提供基于业务的功能性描述，然后配合开发人员重现缺陷、分析定位问题，这个过程往往会花费很多时间才能定位到引入缺陷的代码。而精准测试根据测试用例和代码之间的映射关系，如果测试用例执行失败，可以追溯到可疑代码块。这种数据化的沟通方式可以有效提高缺陷定位和修复的效率，从而提高了研发团队的工作效率。</p><p><strong>精准测试旨在提升测试效率</strong>，是对现有的黑盒测试技术的补充，在软件测试过程中加入监听、数据收集和分析，可以配合人工在设计用例、执行用例的过程中进行数据采集、计算和分析，也可以和自动化测试系统进行对接。精准测试对于缩短自动化测试时间有帮助，对手工的回归测试（虽然在敏捷中建议用自动化方式来完成）甚至探索式测试有更大帮助。</p><h4 id="如何建立代码和用例的映射关系" tabindex="-1">如何建立代码和用例的映射关系 <a class="header-anchor" href="#如何建立代码和用例的映射关系" aria-label="Permalink to &quot;如何建立代码和用例的映射关系&quot;">​</a></h4><p>精准测试的核心是建立测试用例和代码之间的映射关系，通过记录每个测试用例在执行过程中对应的程序内部的执行细节，可以追踪到方法或代码块级别。如果测试人员关注某个方法或者代码块，它也可以追溯出测试过这段代码的测试用例，如图 1 所示。</p>',14),c=e(`<p>通过从测试用例到代码的正向追溯，当测试用例在执行过程中发现软件缺陷时，可以直接定位到缺陷所在的代码，包括系统测试中难复现的缺陷，因此可以帮助开发人员快速修复缺陷。</p><p>通过从代码到测试用例的反向追溯，可以进行软件不同版本之间的代码差异化分析，从而得到代码修改部分所影响的测试范围，以确定回归测试中包含的测试用例。如果新的版本中有新增的代码，则会自动提示研发人员补充新的测试用例来覆盖。</p><p>实现用例和代码的关联需要在用例执行时获取到被测应用在代码级别的方法调用链。下面就来介绍一下具体的实现技术。</p><h4 id="代码依赖性分析" tabindex="-1">代码依赖性分析 <a class="header-anchor" href="#代码依赖性分析" aria-label="Permalink to &quot;代码依赖性分析&quot;">​</a></h4><p>代码之间的依赖关系是比较复杂的，当执行一个测试用例时，从被测系统的代码层次来看，是调用了一系列的方法。软件代码的依赖关系包括：</p><ul><li>系统功能模块内部方法之间的直接调用、参数传递等；</li><li>系统功能模块之间的接口调用，包括同步调用和异步调用等；</li><li>对外部系统的调用和依赖关系；</li><li>关系型数据库中数据对象之间的关联、存储过程的互相调用等，比如方法之间共用数据表。</li></ul><p><strong>精准测试技术通过程序插桩的方式获取方法或代码块的依赖关系</strong>，即在保证被测系统原有逻辑完整性的基础上，在程序中插入批量的探针，当测试用例驱动程序运行时，通过探针抛出程序运行的特征数据，然后对这些数据进行分析，可以获得程序的控制流和数据流信息，包括方法调用链数据。</p><p>对于 Java 应用，主流的调用链分析技术是通过 Java Agent（也叫 Java 探针）以字节码注入的方式获取程序方法级别的调用链关系，比如代码覆盖率分析工具 Jacoco。在精准测试中，你可以使用 Byte Buddy 这样的工具包，自己编写 Java Agent，也可以基于一些成熟的获取应用调用链的开源工具开发自己团队的精准测试框架，比如 Pinpoint、SkyWalking 等。</p><p>以 Pinpoint 为例，Pinpoint 用于大型分布式系统的全链路监控，可以获取不同服务之间、服务与数据库、服务内部的方法等调用关系。不需要修改服务的代码即可加载 Agent，从而实现无侵入式的调用链采集。其核心还是基于 JVM 的 Java Agent 机制，通过在被测服务的启动命令中添加 JVM 参数来指定 pinpoint agent 加载路径。如下所示：</p><pre><code>-javaagent:/home1/irteam/apps/pinpoint-agent/current/pinpoint-bootstrap-1.8.3.jar
-Dpinpoint.applicationName=ApiGateway
-Dpinpoint.agentId=apigw01
</code></pre><p>下面是来自 pintpoint 官网的一个例子，图 2 显示了服务 API Gateway 在一次调用中服务之间的调用链，以及和数据库、第三方应用的调用关系。图 3 显示了服务内部代码级别的调用关系，可以细化到方法级别。</p>`,11),g=t("p",null,'另外，精准测试技术可以帮助研发人员理解并优化软件架构设计。软件架构要尽量做到"高内聚、低耦合"。尽量把相关功能内聚到一个模块，减少模块之间的关联和依赖。如果代码之间的依赖度高、模块之间的耦合性强，一个方法的改动影响到的方法或功能模块就会很多，识别出的测试范围就会很大，这样就失去了精准测试的意义。',-1),d=e('<p>精准测试技术可以根据收集到的数据建立一个软件系统关系图并且可视化的呈现出来，包括方法之间、系统模块之间、和外部系统之间的调用关系，以及数据库。研发人员可以清楚的了解代码之间的依赖关系，并据此进行系统架构和代码结构的优化，尽量降低耦合性。</p><h4 id="代码的变更分析" tabindex="-1">代码的变更分析 <a class="header-anchor" href="#代码的变更分析" aria-label="Permalink to &quot;代码的变更分析&quot;">​</a></h4><p>实现回归测试用例集的精准选择离不开对代码进行变更分析，就是通过新的软件版本和上一个软件版本的对比，获取新的软件版本中有哪些代码变更，然后根据差异选择测试用例或补充新的测试用例。</p><p>代码分析工具包括一些代码管理工具自带的命令对源代码进行对比，比如 SVN-diff、git-diff等。另外，IDA Pro 是一款交互式的反汇编软件，可以对软件版本的二进制文件进行差异分析，不仅比较代码本身的差异，而且还可以比较编译时引入的第三方代码库、编译参数及开关引起的差异。</p><h4 id="测试用例集如何优化" tabindex="-1">测试用例集如何优化 <a class="header-anchor" href="#测试用例集如何优化" aria-label="Permalink to &quot;测试用例集如何优化&quot;">​</a></h4><p><strong>优化黑盒测试用例集</strong>：精准测试通过代码覆盖率的统计及等价类划分功能，自动发现测试用例集中的冗余部分以及需要补充的测试用例。如果两个测试用例属于同一等价类，那么其中一个测试用例就是冗余的，可以删除。对于有大量脚本的自动化测试集，据此进行优化，从而降低对自动化用例的维护成本。</p><p>对应的精准测试过程如图 5 所示：首先执行每个自动化测试用例，通过代码依赖性分析获取测试用例和方法之间的对应关系，以及方法之间的调用关系，然后给出测试范围优化建议。同时，在此基础上建立一个知识库，为回归测试范围的优化提供基础。知识库包括两部分内容：<strong>测试用例和方法之间的映射关系，方法之间的调用关系</strong>。</p>',7),h=t("p",null,[t("strong",null,"自动筛选回归测试用例集"),_("：通过代码变更分析以及用来存储用例和代码映射关系的知识库，就可以为新提交的软件版本智能的筛选回归测试用例。")],-1),A=t("p",null,"首先分析新的软件版本有哪些变更，根据已经建立的知识库，计算出改动的代码影响到哪些功能，需要执行哪些测试用例，这样就可以减少针对每个版本的自动化测试用例集，缩短自动化测试的运行时间，过程如图 6 所示。",-1),u=t("p",null,"不少公司的研发团队根据精准测试的技术理论开发了自己的技术框架，实现了测试用例和代码的可视化的双向追溯、回归测试用例集的自动筛选甚至是智能选取、代码覆盖率分析、缺陷定位，以及测试用例聚类分析、与自动化测试平台的集成等功能。",-1),m=t("p",null,"今天这一讲到这里就结束了，总结一下这一讲的重点。",-1),C=t("p",null,"精准测试是一种新的软件测试分析技术，借助算法和工具，自动建立测试用例和软件代码之间的可视化追溯，实现测试范围的优化和缺陷的迅速定位。",-1),f=t("p",null,"用例和代码之间的映射关系是精准测试的技术核心。从用例到代码的正向追溯可以迅速定位缺陷并帮助改进软件架构设计和代码结构；从代码到用例的反向追溯可以帮助优化测试范围、自动筛选回归测试用例。",-1),T=t("p",null,"代码依赖性分析是实现用例和代码之间关联的基础。",-1),P=t("p",null,"最后留一个思考题给你：测试技术的选择是上下文驱动的，你认为精准测试技术适合你所在的团队及正在开发的产品/项目吗？理由是什么？",-1);function q(I,V,S,b,v,x){const a=p("Image");return s(),i("div",null,[r,o(a,{alt:"1.png",src:"https://s0.lgstatic.com/i/image3/M01/0A/92/CgoCgV6oCEaARed9AAI55Mr0iLE557.png"}),c,o(a,{alt:"2.png",src:"https://s0.lgstatic.com/i/image3/M01/0A/93/CgoCgV6oCI2AIxYEAAHjB4xRFMY476.png"}),o(a,{alt:"3.png",src:"https://s0.lgstatic.com/i/image3/M01/17/C1/Ciqah16oCJOATRg8AAK-1yrCObk977.png"}),g,o(a,{alt:"4.png",src:"https://s0.lgstatic.com/i/image3/M01/17/C1/Ciqah16oCKCAM0e5AADOws9R6ts220.png"}),d,o(a,{alt:"5.png",src:"https://s0.lgstatic.com/i/image3/M01/17/C2/Ciqah16oCM-AeIIaAAFtu9r-Dc0012.png"}),h,A,o(a,{alt:"6.png",src:"https://s0.lgstatic.com/i/image3/M01/17/C2/Ciqah16oCNeAf_DLAAE5cxnRBOs611.png"}),u,m,C,f,T,P])}const D=n(l,[["render",q]]);export{k as __pageData,D as default};
