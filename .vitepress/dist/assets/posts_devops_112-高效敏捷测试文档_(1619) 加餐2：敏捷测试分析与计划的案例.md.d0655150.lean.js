import{_ as o,j as i,o as n,g as _,k as l,h as s,Q as e,s as t}from"./chunks/framework.4e7d56ce.js";const z=JSON.parse('{"title":"加餐2：敏捷测试分析与计划的案例","description":"","frontmatter":{},"headers":[],"relativePath":"posts/devops/112-高效敏捷测试文档/(1619) 加餐2：敏捷测试分析与计划的案例.md","filePath":"posts/devops/112-高效敏捷测试文档/(1619) 加餐2：敏捷测试分析与计划的案例.md","lastUpdated":1696682708000}'),r={name:"posts/devops/112-高效敏捷测试文档/(1619) 加餐2：敏捷测试分析与计划的案例.md"},p=e("",6),c=t("p",null,"从测试分析中得到项目的目标是在 4 周内如期交付 App 2.0，包括 7 个新的用户故事，对于安全性、稳定性、兼容性、耗电量、流量等方面的质量要求和 App 1.0 相同。结合其他的因素，比如目前的测试自动化率、时间和人员的情况，可以制定如图 2 所示的测试目标。在这个图里，测试目标按照四项测试子目标分别给出具体的目标，这四项子目标分别是：单元测试、功能测试、性能测试和其他的专项回归测试。",-1),h=e("",4),d=t("h4",{id:"测试分析-风险分析和控制",tabindex:"-1"},[s("测试分析------风险分析和控制 "),t("a",{class:"header-anchor",href:"#测试分析-风险分析和控制","aria-label":'Permalink to "测试分析------风险分析和控制"'},"​")],-1),g=t("p",null,"根据测试分析的结果应用第 28 讲的知识，分析测试风险并制定预防/处理措施，如图 4 所示。这里识别出 Top 5 的测试风险分别为：",-1),A=t("ul",null,[t("li",null,"单元测试的代码覆盖率低导致代码质量低；"),t("li",null,"用户界面需求变更导致测试自动化率降低；"),t("li",null,"需要兼容的手机/型号/分辨率种类太多；"),t("li",null,"手工专项回归测试任务重；"),t("li",null,"新加入的测试人员探索式测试经验不多。")],-1),m=t("h4",{id:"基于风险的测试策略",tabindex:"-1"},[s("基于风险的测试策略 "),t("a",{class:"header-anchor",href:"#基于风险的测试策略","aria-label":'Permalink to "基于风险的测试策略"'},"​")],-1),u=t("p",null,"根据测试范围分析和风险分析的结果，接下来就可以为 App2.0 制定测试策略了，如图 5 所示。",-1),C=t("p",null,"因为是在 App1.0 的基础上制定测试策略，所以重点是针对 App 2.0 的测试目标以及存在的测试风险在测什么、怎么测方面提出应对措施。比如，针对单元测试代码覆盖率低的问题，应该确保高优先级的用户故事的单元测试覆盖率达标，并且加强接口自动化测试。",-1),f=t("h4",{id:"测试计划",tabindex:"-1"},[s("测试计划 "),t("a",{class:"header-anchor",href:"#测试计划","aria-label":'Permalink to "测试计划"'},"​")],-1),q=t("p",null,"现在我们就可以制定出如图 4 所示的测试计划了。前面已经制定出了测试目标、测试项、测试风险和测试策略，几乎已经覆盖率测试计划中的所有关键内容。在此基础上，又添加了关于人员安排、测试交付物，以及测试依赖等内容，最后的测试计划如图 6 所示。",-1),P=t("p",null,"从上面测试计划制定过程中，首先要明确测试目标，后续测试分析、测试策略都是为了更好地实现测试目标。其次，在这过程中，我们采用思维导图的方式，很好地支持发散性思维和系统性思维的运用，一气呵成，快速完成测试计划中几个关键环节：测试范围的确定、测试风险分析、测试策略制定直至最后测试计划的制定。而且，测试计划中的每一项内容都标注了优先级，体现了基于风险的测试策略在敏捷测试中是不可缺少的，有助于我们更高效地完成测试。",-1),T=t("p",null,"这里受篇幅所限，但希望这些内容有着良好的参考价值，对你未来做好敏捷测试计划有所帮助。",-1);function b(S,k,x,I,v,N){const a=i("Image");return n(),_("div",null,[p,l(a,{alt:"1.png",src:"https://s0.lgstatic.com/i/image/M00/04/5C/CgqCHl6z6rqAe-5rAAKfNO7DFlQ612.png"}),s(),c,l(a,{alt:"2.png",src:"https://s0.lgstatic.com/i/image/M00/04/5C/CgqCHl6z6tCAP2pLAAGnHKOkSAU154.png"}),s(),h,l(a,{alt:"3.png",src:"https://s0.lgstatic.com/i/image/M00/04/5C/Ciqc1F6z6vmAPWxIAAIeCIgPE9g663.png"}),s(),d,g,A,l(a,{alt:"4.png",src:"https://s0.lgstatic.com/i/image/M00/04/5C/Ciqc1F6z6zSAZAEIAAQnEHiL9Zk585.png"}),s(),m,u,l(a,{alt:"5.png",src:"https://s0.lgstatic.com/i/image/M00/04/5C/CgqCHl6z60eAd7vfAAIJfaFCqKw399.png"}),s(),C,f,q,l(a,{alt:"6.png",src:"https://s0.lgstatic.com/i/image/M00/04/5C/CgqCHl6z61SAP_hJAANvDjSeyLs744.png"}),s(),P,T])}const E=o(r,[["render",b]]);export{z as __pageData,E as default};
