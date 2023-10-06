import{_ as o,j as i,o as n,g as _,k as l,Q as a,s as t,h as e}from"./chunks/framework.b3d8e22e.js";const z=JSON.parse('{"title":"信息收集 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/devops/112-高效敏捷测试文档/(1619) 加餐2：敏捷测试分析与计划的案例.md","filePath":"posts/devops/112-高效敏捷测试文档/(1619) 加餐2：敏捷测试分析与计划的案例.md","lastUpdated":1696417798000}'),p={name:"posts/devops/112-高效敏捷测试文档/(1619) 加餐2：敏捷测试分析与计划的案例.md"},r=a('<p>这一讲是第 5 部分&quot;敏捷测试分析与计划&quot;加餐的内容，利用前面学到的测试分析和测试计划的知识，从信息收集到测试分析、测试策略制定，一步步制定出测试计划。案例仍然沿用了在线教育 App 第二次迭代的软件开发项目，也就是 App 2.0，项目背景请参考第 34 讲中的介绍。</p><p>这一讲的目标是为 App 2.0 制定一个测试计划，在这之前需要做的工作包括以下几个步骤：</p><ul><li>基于启发式测试策略的分析模型进行测试分析，收集项目的上下文信息；</li><li>根据项目目标和质量要求制定测试目标；</li><li>根据上下文信息，完成测试需求分析，明确测试范围，包括功能性和非功能性的测试；</li><li>根据收集的项目上下文信息进行风险分析，识别出 Top 5 的测试风险并制定预防/处理措施；</li><li>制定基于风险的测试策略；</li><li>基于测试目标和测试策略等内容制定出测试计划。</li></ul><h4 id="信息收集" tabindex="-1">信息收集 <a class="header-anchor" href="#信息收集" aria-label="Permalink to &quot;信息收集&quot;">​</a></h4><p>首先我采用在第 26、29 讲中的启发式测试策略的分析方法，从产品元素、质量标准、项目因素、可用的测试技术四个方面收集并分别进行归纳整理，如图 1 所示。在归纳整理过程中，聚焦 2.0 版本会发生哪些变化（和 1.0 版本比较），了解到变化主要发生在<strong>质量标准</strong> 和<strong>项目因素</strong>这两个部分，比如质量标准中要考虑用户大幅提升之后对性能提出的要求，而项目因素引入了更多的测试风险，比如单元测试覆盖率只有 40%，还有开发和测试人员都有人员变动等。</p>',5),c=t("p",null,"从测试分析中得到项目的目标是在 4 周内如期交付 App 2.0，包括 7 个新的用户故事，对于安全性、稳定性、兼容性、耗电量、流量等方面的质量要求和 App 1.0 相同。结合其他的因素，比如目前的测试自动化率、时间和人员的情况，可以制定如图 2 所示的测试目标。在这个图里，测试目标按照四项测试子目标分别给出具体的目标，这四项子目标分别是：单元测试、功能测试、性能测试和其他的专项回归测试。",-1),d=a('<h4 id="测试分析-测试范围" tabindex="-1">测试分析------测试范围 <a class="header-anchor" href="#测试分析-测试范围" aria-label="Permalink to &quot;测试分析------测试范围&quot;">​</a></h4><p>通过测试分析过程中收集的信息，可以得出如下测试范围：</p><ul><li><strong>新功能特性</strong>，包括 7 个用户故事的功能以及功能之间的交互；</li><li><strong>新版本的专项测试</strong>，新的软件包的升级/安装/启动/卸载；</li><li><strong>已有功能的回归测试</strong>，验证已有功能是否受到新的改动带来的影响；</li><li><strong>功能性的专项回归测试</strong>，交叉事件测试、弱网络测试、边界测试；</li><li><strong>非功能性的回归测试</strong>，包括兼容性、性能、安全性、易用性、耗电量、网络流量等。</li></ul><p>如图 3 所示，测试范围按照测试项进行了划分。</p>',4),g=t("h4",{id:"测试分析-风险分析和控制",tabindex:"-1"},[e("测试分析------风险分析和控制 "),t("a",{class:"header-anchor",href:"#测试分析-风险分析和控制","aria-label":'Permalink to "测试分析------风险分析和控制"'},"​")],-1),h=t("p",null,"根据测试分析的结果应用第 28 讲的知识，分析测试风险并制定预防/处理措施，如图 4 所示。这里识别出 Top 5 的测试风险分别为：",-1),A=t("ul",null,[t("li",null,"单元测试的代码覆盖率低导致代码质量低；"),t("li",null,"用户界面需求变更导致测试自动化率降低；"),t("li",null,"需要兼容的手机/型号/分辨率种类太多；"),t("li",null,"手工专项回归测试任务重；"),t("li",null,"新加入的测试人员探索式测试经验不多。")],-1),m=t("h4",{id:"基于风险的测试策略",tabindex:"-1"},[e("基于风险的测试策略 "),t("a",{class:"header-anchor",href:"#基于风险的测试策略","aria-label":'Permalink to "基于风险的测试策略"'},"​")],-1),u=t("p",null,"根据测试范围分析和风险分析的结果，接下来就可以为 App2.0 制定测试策略了，如图 5 所示。",-1),C=t("p",null,"因为是在 App1.0 的基础上制定测试策略，所以重点是针对 App 2.0 的测试目标以及存在的测试风险在测什么、怎么测方面提出应对措施。比如，针对单元测试代码覆盖率低的问题，应该确保高优先级的用户故事的单元测试覆盖率达标，并且加强接口自动化测试。",-1),f=t("h4",{id:"测试计划",tabindex:"-1"},[e("测试计划 "),t("a",{class:"header-anchor",href:"#测试计划","aria-label":'Permalink to "测试计划"'},"​")],-1),P=t("p",null,"现在我们就可以制定出如图 4 所示的测试计划了。前面已经制定出了测试目标、测试项、测试风险和测试策略，几乎已经覆盖率测试计划中的所有关键内容。在此基础上，又添加了关于人员安排、测试交付物，以及测试依赖等内容，最后的测试计划如图 6 所示。",-1),T=t("p",null,"从上面测试计划制定过程中，首先要明确测试目标，后续测试分析、测试策略都是为了更好地实现测试目标。其次，在这过程中，我们采用思维导图的方式，很好地支持发散性思维和系统性思维的运用，一气呵成，快速完成测试计划中几个关键环节：测试范围的确定、测试风险分析、测试策略制定直至最后测试计划的制定。而且，测试计划中的每一项内容都标注了优先级，体现了基于风险的测试策略在敏捷测试中是不可缺少的，有助于我们更高效地完成测试。",-1),q=t("p",null,"这里受篇幅所限，但希望这些内容有着良好的参考价值，对你未来做好敏捷测试计划有所帮助。",-1);function S(I,b,k,x,v,N){const s=i("Image");return n(),_("div",null,[r,l(s,{alt:"1.png",src:"https://s0.lgstatic.com/i/image/M00/04/5C/CgqCHl6z6rqAe-5rAAKfNO7DFlQ612.png"}),c,l(s,{alt:"2.png",src:"https://s0.lgstatic.com/i/image/M00/04/5C/CgqCHl6z6tCAP2pLAAGnHKOkSAU154.png"}),d,l(s,{alt:"3.png",src:"https://s0.lgstatic.com/i/image/M00/04/5C/Ciqc1F6z6vmAPWxIAAIeCIgPE9g663.png"}),g,h,A,l(s,{alt:"4.png",src:"https://s0.lgstatic.com/i/image/M00/04/5C/Ciqc1F6z6zSAZAEIAAQnEHiL9Zk585.png"}),m,u,l(s,{alt:"5.png",src:"https://s0.lgstatic.com/i/image/M00/04/5C/CgqCHl6z60eAd7vfAAIJfaFCqKw399.png"}),C,f,P,l(s,{alt:"6.png",src:"https://s0.lgstatic.com/i/image/M00/04/5C/CgqCHl6z61SAP_hJAANvDjSeyLs744.png"}),T,q])}const E=o(p,[["render",S]]);export{z as __pageData,E as default};
