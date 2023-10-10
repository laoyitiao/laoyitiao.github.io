import{_ as r,j as i,o as g,g as _,k as n,h as t,Q as l,s as o}from"./chunks/framework.cfb14fe0.js";const v=JSON.parse('{"title":"第49讲：敏捷过程的反思与持续改进","description":"","frontmatter":{},"headers":[],"relativePath":"posts/devops/112-高效敏捷测试文档/(1634) 第49讲：敏捷过程的反思与持续改进.md","filePath":"posts/devops/112-高效敏捷测试文档/(1634) 第49讲：敏捷过程的反思与持续改进.md","lastUpdated":1696682708000}'),e={name:"posts/devops/112-高效敏捷测试文档/(1634) 第49讲：敏捷过程的反思与持续改进.md"},a=l('<h1 id="第49讲-敏捷过程的反思与持续改进" tabindex="-1">第49讲：敏捷过程的反思与持续改进 <a class="header-anchor" href="#第49讲-敏捷过程的反思与持续改进" aria-label="Permalink to &quot;第49讲：敏捷过程的反思与持续改进&quot;">​</a></h1><h3 id="专栏内容回顾与总结" tabindex="-1">专栏内容回顾与总结 <a class="header-anchor" href="#专栏内容回顾与总结" aria-label="Permalink to &quot;专栏内容回顾与总结&quot;">​</a></h3><p>时间过得很快，陪伴大家快四个月了，终于来到最后一讲的内容了。这一讲将回顾一下过去 48 讲主要聊了些什么？如果把 48 讲的标题全都过一遍，估计这一讲的时间就差不多用完了，所以咱们就只能快速回顾一下七大模块。</p><ul><li><strong>基础</strong>：澄清什么是敏捷测试，侧重讨论了敏捷测试的思维方式、流程，并定义了一个新的敏捷测试四象限，相信对你会很有启发，并能领会敏捷测试的本质。</li><li><strong>人与组织</strong>：从测试和质量这样的视角去探讨敏捷团队的各种形态和所具有的精神、文化与协作，包括敏捷中专职的测试人员、Test Owner 等职责，以及如何构建有质量意识的学习型团队等。</li><li><strong>基础设施</strong>：是敏捷测试做得又快又好的基础之一，借助虚拟化、容器、自动化测试等技术支持持续测试，并将静态测试、自动部署与 CI/CD、DevOps 等集成起来，实现持续交付。</li><li><strong>测试左移</strong>：测试要做得又快又好，测试的左移是不可少的。在传统测试中也做需求评审、设计评审，在敏捷中更应该提倡 ATDD、BDD 和需求实例化，将需求转化为可执行的活文档------需求是可执行的自动化脚本，在时间轴上是最彻底的自动化测试。</li><li><strong>分析与计划</strong>：不论采用什么先进技术，也不论测试是否左移，测试的分析与计划依旧是测试最重要的工作之一、也是测试设计和执行的基础。这一部分针对这一主题进行了全方位的探讨，从上下文驱动思维、分析技能、风险、策略、代码依赖性分析、探索式测试、SBTM 等维度介绍其方法和优秀实践。</li><li><strong>设计与执行</strong>：敏捷测试也一样，最终要落地。例如，如何面对用户故事来完成测试的设计、如何彻底地实现自动化测试？单元测试必须 TDD 吗？如何做到质量和效率的平衡、质效合一？这些都是本模块要回答的问题，并提供了很好的解决方案办法或策略。</li><li><strong>收尾与改进</strong>，测试右移、测试工作评估、测试可视化、敏捷测试优秀实践等。</li></ul><p>如果这些内容学好了，你就掌握了敏捷测试的思想、方法及其实践，可以成为一名真正的敏捷测试&quot;绝地武士&quot;；如果团队在这些方面做好了，敏捷测试不再是形似而神不似，就能实现高效的敏捷测试。</p><p><strong>反思与改进分析</strong>无论是学习和工作，都是无止境的，也正如敏捷模式中所提倡的，每个迭代之后要反思，反思自己理解不透、做得不好的地方，然后采取行动去改进。如何衡量敏捷测试做得好不好呢？可以从不同的维度去分析，比如本专栏侧重讲解的维度如下：</p><ul><li>敏捷测试的思维方式、质量文化；</li><li>团队的技术能力、测试能力、沟通协作能力等；</li><li>敏捷测试的流程，流程常常也是一个改进的维度，产品就是基于这个流程被研发出来的；</li><li>基础设施，是否拥有良好的自动化测试？是否很好的支持 CI/CD、持续测试？</li><li>测试左移和右移是否到位？</li><li>测试的分析是否到位、测试计划是否简捷有效？</li><li>测试的设计和执行是否满足或适合敏捷测试的诉求？</li></ul><p>为此，你可以建一个评估团队敏捷测试水平的雷达图，给每一个维度去打分，无论是 5 分制还是 10 分制，了解自己团队所处的位置，从而发现团队在某些维度的弱势，有针对性地改进。如图 1 所示，从六个维度去评估自己团队的敏捷测试水平，发现团队、测试左移两项比较弱，得分只有 3.0，刚及格，就可以给自己的团队设定一个新的目标------提升自己团队的敏捷思维能力和技术能力，做好测试左移工作，特别是 ATDD，在开发前细化用户故事验收标准，并和开发、产品、业务人员评审验收标准，达成共识。</p><p>更有人建议要将敏捷测试分得更细，分为 20 个领域，如图 2 所示。这样也许会更好，分解得越细，就越明确，比如自动化测试能力、探索式测试能力、反馈速度、可跟踪性等，的确需要我们关注，但&quot;任务&quot;、&quot;库&quot;有些含糊，或者说敏捷的特征不显著。</p>',9),p=o("p",null,"图1 评估团队敏捷测试水平的雷达图",-1),c=l("<p>图2 团队敏捷测试水平需要评估的各个方面</p><p>在敏捷实施过程中，也可以按照&quot;守&quot;、&quot;破&quot;、&quot;离&quot;三个阶段来实施和改进。</p><ul><li>首先，严格按照专栏中所说的各种流程、方法和要求来实施敏捷测试，即先&quot;<strong>固守</strong>&quot;人们已探索出来的优秀实践，即使不理解，也照搬照抄，按照成熟的方法实施，那些方法和实践是经过实践和探索总结出来的，经过了实践的检验。</li><li>在实施一段之后，慢慢能领会为什么这样做的背后原因，再结合自己团队的实际情况，进行局部的&quot;<strong>突破</strong>&quot; 和创新，提升敏捷测试水平。</li><li>经过不断实践、创新、再实践，慢慢形成自己一套完整的敏捷测试方法和实践，熟练运用，这里所讲的内容慢慢就感觉不存在了，彻底 &quot;<strong>脱离</strong>&quot; 了别人的框架和方法。此时的敏捷测试已是神似，如同练武之人所说，达到了&quot;手中无剑、心中有剑&quot;的境界。</li></ul><p><strong>数据驱动改进</strong>没有度量就不知道自己身处什么位置，如果想改进，就必须进行度量，例如第 46、47 讲中所讨论的内容，过程改进离不开度量，有了数据，就可以更准确、客观地知道问题在哪里。我们采取了改进措施之后，基于度量数据，才能知道这些改进措施有没有发挥作用、发挥了多大作用，准确、客观地了解是否得到了改进。数据驱动改进，一般要做好下面 5 个方面的事情：</p><ul><li>做好测试过程、产品质量相关的<strong>数据收集</strong>；</li><li>做好数据的<strong>抽取与分析</strong>，包括测试充分性、测试效率等分析工作；</li><li>度量结果的数据<strong>可视化呈现</strong>；</li><li>随着敏捷测试改进的不断深入，度量指标会更多、更细，<strong>完善度量指标体系</strong>；</li><li>更深入的<strong>数据挖掘</strong>，找出更有价值的数据。</li></ul><p>微软公司也提倡数据驱动的质量管理，强调从业务价值相关数据开始分析，深入到用户体验分析，包括用户的价值、易用性分析等，最终驱动构建健康的系统------良好的性能、可用性、可靠性等。为此，建立了一个数据驱动质量模型，如图 3 所示。</p>",6),u=l("<p>图3 微软公司的数据驱动质量模型图</p><p><strong>PDCA 循环</strong> 改进不能三天打鱼两天晒网，而是要持续改进。P<strong>DCA 就是一个用于持续改进的简单但有效的模型</strong> ，代表由四个部分&quot;<strong>计划</strong> （<strong>P</strong> lan）、<strong>执行</strong> （<strong>D</strong> o）、<strong>检查</strong> （<strong>C</strong> heck）和<strong>行动</strong> （<strong>A</strong>ction）&quot;构成的一个循环过程，如图 4 所示。</p><ul><li><strong>计划（P）</strong>，分析敏捷测试目前现状，发现测试过程中存在的主要问题，找出问题产生的根本原因，制定测试过程改进的目标，形成覆盖测试不同维度的改进计划，包括改进的方法、所需资源、面临的风险与挑战、采取的策略、时间表等。</li><li><strong>执行（D）</strong>，执行是计划的履行和实现，按计划去落实具体的对策，实施测试过程的监控和度量数据的收集，使活动按预期设想前进，努力达到计划所设定的目标。</li><li><strong>检查（C）</strong>，对执行后效果的评估，并经常进行内部审核、过程评审、文档评审、产品评审等活动，但实际上，检查自始至终伴随着实施过程，不断收集（测试要素、关键质量特性等）数据的过程，并通过数据分析、结果度量来完成检查。检查方法，一般在计划中就基本确定下来了，即在实施前经过了策划。</li><li><strong>行动（A）</strong>，检查完结果后，要采取措施，即总结成功的经验、吸取失败的教训，改善流程、提升人员能力、开发新的工具等。行动是 PDCA 循环的升华过程，没有行动就不可能有提高。</li></ul>",3),A=l("<p>图4 PDCA 也适合敏捷测试的改进</p><p>在 PDCA 循环中，检查是承上启下的重要一环，是自我完善机制的关键所在。没有检查就无法发现问题，改进就无从谈起，只是这种检查，最好要依据客观的数据，即上面所说的度量。</p><p><strong>PDCA 循环方法是闭合的，同时具有螺旋上升的必然趋势</strong>。PDCA 循环告诉我们，只有经过周密的策划才能付诸实施，实施的过程必须受控，对实施过程进行检查的信息要经过数据分析形成结果，检查的结果必须支持过程的改进。处置得当才能起到防止相似问题的再次发生，以达到预防的效果。例如，标准要求建立的预防机制：对测试、评审、监控中发现的软件缺陷，除及时纠正外，还需要针对产生的原因制定纠正措施，对纠正措施的评审、实施的监控及实施后的效果进行验证或确认，达到预防缺陷的目的，改进过程或体系，进而保证持续、稳定的开发高质量的产品。</p><p><strong>根因分析</strong> 在改进过程中，一定会遇到问题，那就要进行<strong>根因分析</strong>（Root-cause Analysis），找到问题产生的根本原因，进而制定策略或采取措施消除根本原因，彻底解决问题。每当彻底解决了一个问题，我们就前进了一步。如果只是解决了表面问题，类似的问题还会发生，这样解决问题的话，就没有进步。根因分析可以分为三个步骤：</p><ul><li>识别是什么问题，比如是遗漏的缺陷还是客户新的需求？</li><li>找出造成问题的根本原因，例如，为什么遗漏缺陷？可能是缺少测试用例，也有可能是有用例没有被执行；如果是缺少测试用例，那又是为什么呢？可能回答，想不到？那为什么想不到，是缺少知识还是没有认真对待？一般问五次 &quot;为什么&quot; 就可以找到根本原因。这是最简单的办法，还有鱼骨图（因果树）、决策表、FMEA 等方法，图 5 就是根因分析之鱼骨图法的一个示例。</li><li>找到解决问题的方法、措施，然后实施解决方案，解决问题。</li></ul>",5),D=o("p",null,"图5 用鱼骨图法进行根因分析的示例图",-1),h=o("p",null,"在敏捷测试中，每个迭代之后团队都需要反思，反思整个迭代过程中做得不够好的地方，然后一起讨论如何改进，借助数据、PDCA 和根因分析等工具持续改进，日复一日、年复一年，团队就在不知不觉中快速地成长起来。",-1),d=o("p",null,[t("专栏内容到这里就接近尾声了，要和大家说再见的时候了，倒是依依不舍。写这个专栏前后历时 4 个月，虽然时间非常紧张，但还是几经修改，总想把最新、最好的理念和技术带给你。"),o("strong",null,'"终身学习、终身成长"作为共勉的座右铭，留给你，也留给我'),t("。")],-1),q=o("p",null,"如果你觉得课程不错，从中有所收获的话，不要忘了推荐给身边的朋友哦，希望大家都有所提高、不断成长，谢谢！",-1);function C(T,m,P,S,V,I){const s=i("Image");return g(),_("div",null,[a,n(s,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image/M00/1D/84/CgqCHl7h942AH5zQAAEYVV71d04404.png"}),t(),p,n(s,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image/M00/1D/84/CgqCHl7h95aAa26vAAQn9r6lhu8140.png"}),t(),c,n(s,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image/M00/1D/79/Ciqc1F7h97KAYl_iAAGvt1PPQ3c213.png"}),t(),u,n(s,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image/M00/1D/79/Ciqc1F7h976AUoiSAADoFEYVMRA153.png"}),t(),A,n(s,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image/M00/1D/85/CgqCHl7h98yAe-UuAAQpAJ4qj_s717.png"}),t(),D,h,d,q])}const N=r(e,[["render",C]]);export{v as __pageData,N as default};
