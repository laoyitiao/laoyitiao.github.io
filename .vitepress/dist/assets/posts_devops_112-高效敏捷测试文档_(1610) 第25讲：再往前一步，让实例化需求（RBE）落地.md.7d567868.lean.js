import{_,j as i,o as e,g as p,k as s,h as o,Q as n,s as l}from"./chunks/framework.b3d8e22e.js";const il=JSON.parse('{"title":"实例化需求的过程 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/devops/112-高效敏捷测试文档/(1610) 第25讲：再往前一步，让实例化需求（RBE）落地.md","filePath":"posts/devops/112-高效敏捷测试文档/(1610) 第25讲：再往前一步，让实例化需求（RBE）落地.md","lastUpdated":1696417798000}'),c={name:"posts/devops/112-高效敏捷测试文档/(1610) 第25讲：再往前一步，让实例化需求（RBE）落地.md"},r=n("",8),a=l("p",null,"图1 需求沟通过程是不断澄清的过程",-1),u=l("br",null,null,-1),d=l("p",null,'我们还是以在线教育 App 的"课程分销"相关的用户故事为例，来讨论需求的实例化。"课程分销"下面有"收益详情"、"现金提成"等用户故事。例如，"收益详情"可以这样描述：',-1),h=l("br",null,null,-1),g=l("br",null,null,-1),A=l("p",null,'而"现金提成"有一条规则，每次提现金额不低于 2 元，而且必须是真实名字，那么其实例化可以描述如下：',-1),m=l("br",null,null,-1),b=l("br",null,null,-1),D=l("p",null,"需求实例化可通过例子来澄清需求，而这些例子也就成为了验证这个需求的测试用例，这可以从上面两张表得到证实，如图 2 所示，所以借助实例化需求，业务（产品）、开发和测试在需求理解上达成共识，没有分歧，从而有利于后续的开发和测试。",-1),C=l("ul",null,[l("li",null,[l("p",null,"基于这个澄清的需求，开发人员去做系统的设计、编程；")]),l("li",null,[l("p",null,"基于这个澄清的需求，测试人员可以直接开发自动化测试脚本。")])],-1),T=l("br",null,null,-1),B=l("p",null,"而且例子总是明确的、完整的和真实的，易于理解。",-1),q=l("br",null,null,-1),I=l("p",null,"图2 需求实例化的作用",-1),E=l("h3",{id:"实例化需求的过程",tabindex:"-1"},[l("strong",null,"实例化需求的过程"),o(),l("a",{class:"header-anchor",href:"#实例化需求的过程","aria-label":'Permalink to "**实例化需求的过程**"'},"​")],-1),M=l("p",null,'清楚了"实例化需求"概念之后，那么如何实现一个需求实例化的过程呢？可以用一张图来描述，如图 3 所示，这个过程从业务目标出发，经过 7 个步骤，最终将业务需求转换为活文档------可执行的测试（自动化脚本），下面就说说这 7 个步骤。',-1),V=l("br",null,null,-1),Y=n("",5),f=l("p",null,"图4 从业务目标导出范围的过程",-1),P=l("p",null,"这个过程，也是一个不断分解、细化的过程，从 Why 开始到 Who、How、What 的过程（简记为 WWHW 过程），涉及产品定位、产品特性、功能设置、Epic 和用户故事之间的映射，以及最终交付哪些价值给用户。",-1),S=l("br",null,null,-1),x=n("",13),k=l("p",null,"图6 提炼的五个需求说明",-1),N=l("br",null,null,-1),W=l("p",null,'（5）**不改变需求而实现自动验证。**要做到这点，需要引入 Mock 技术进行测试、隔离 UI 与业务模型、进行持久化无关的设计、建立统一的应用服务层、在需求说明中尽量避免引入 UI 与存储相关的元素等，这些都是可行的方案。同时，自动验证可用上一讲介绍的基于 BDD 的自动化测试框架，比如 Cucumber、Robot Framework、Behave、Ginkgo、Gauge 等，选择适合自己的工具来实现验证。借助这些工具，只验证系统做的事对不对，而不需要验证系统是怎么做的（这些用例可以在后续自动化测试用例中，而不是在实例化需求验证中），尽量减少测试用例，这和上面"提炼需求说明"是一致的。',-1),v=l("br",null,null,-1),R=l("p",null,"（6）**频繁验证。**这就是本专栏一直倡导的持续集成和持续测试，要做到这点，就必须实现更彻底的自动化，从需求开始实现自动化测试，而且如前面所说，只验证系统做的事对不对，尽量减少测试用例数。而在传统的开发模式下，详尽的需求说明书往往跟不上开发中实际的需求变更，从而导致需求文档和代码之间不同步，研发人员只信任他们的代码，测试人员只信任他们的测试用例，两者又往往分离，导致开发人员和测试人员之间常常发生冲突。现在，需求成为测试，开发人员和测试人员共享相同的测试需求说明，而且可以被频繁验证，以确保需求说明和代码是同步的。如果没有同步，能够及时发现它们之间的差异性，及时修改。这时，开发人员和测试人员对需求也更有信心了，不再只是信任代码。",-1),H=l("br",null,null,-1),U=l("p",null,"图7 频繁的验证需要测试工具支持",-1),F=l("br",null,null,-1),O=l("p",null,[o("（7）"),l("strong",null,"演变成一个文档系统"),o('------需求成了活文档，即基于规范的实例化需求说明和上述图 7 中的工具支持，需求说明就成为组织良好的、规范的、可执行的测试（活文档）。这个可以这么理解，和传统软件开发相反。传统软件开发是基于需求文档开发的自动化测试脚本，现在需求实例化中，是基于自动化测试脚本抽取相关的内容，自动生成 HTML/PDF 格式的需求文本。而且也不需要维护，需要时就生成，所以任何时候，需求文档也不是支离破碎的，可以生成完整的，而且是最新的版本，是"鲜活的"的文档。')],-1),$=l("br",null,null,-1),y=l("p",null,"图8 同时支持需求及其验证的活文档",-1),G=l("br",null,null,-1),L=l("p",null,"这一讲的内容就到这里了，主要讲解了什么是实例化需求，以及如何从业务目标出发，经过 7 个步骤，最终将业务需求转换为活文档。关于具体的内容，你也可以参考市面上唯一一本这方面的图书《实例化需求：团队如何交付正确的软件》。",-1),X=l("br",null,null,-1),j=l("p",null,"最后，给你出一个思考题，如果推行实例化需求，什么样的项目更合适推广？可能会遇到的挑战是什么？欢迎留言讨论。",-1),w=l("br",null,null,-1),K=l("p",null,"到这里，第 4 部分的内容就讲完了，也就意味着本专栏第 4 部分《测试左移更体现敏捷测试的价值》告一段落，关键还是靠你在实际的项目中关注可测试性，实实在在做好需求/设计评审，大力推行 ATDD、BDD 和需求实例化，彻底实现自动化测试。",-1),Q=l("br",null,null,-1),Z=l("p",null,'下一讲将启动第 5 部分"敏捷测试分析与计划"，回归到测试自身的核心内容，我将先带你学习第 26 讲"基于上下文驱动思维的测试分析"。',-1);function z(J,ll,tl,sl,ol,nl){const t=i("Image");return e(),p("div",null,[r,s(t,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/89/DB/Cgq2xl6Ydl2AXPakAAMl8dgqu1o075.png"}),a,u,d,h,s(t,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/03/96/CgoCgV6Ydl2Ad1IeAADNOkkr3IU046.png"}),g,A,m,s(t,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/10/C5/Ciqah16Ydl2AZEI9AAD2qClMiTo612.png"}),b,D,C,T,B,q,s(t,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/10/C5/Ciqah16Ydl6AB-YBAAEvLxfQeVs005.png"}),o(),I,E,M,V,s(t,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/10/C5/Ciqah16Ydl-AN2C8AAh0-4H59yY719.png"}),o(),Y,s(t,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/03/96/CgoCgV6Ydl-ACgzfAAFqpT0lDH8874.png"}),o(),f,P,S,s(t,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/89/DB/Cgq2xl6Ydl-AI9bbAAXFCH9gZ90776.png"}),o(),x,s(t,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/10/C5/Ciqah16YdmCAct96AAFYO_iL4T8655.png"}),o(),k,N,W,v,R,H,s(t,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/03/96/CgoCgV6YdmCAOdB7AAPmgh-cEb0192.png"}),o(),U,F,O,$,s(t,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/89/DB/Cgq2xl6YdmCAExCjAADbXKrgvB0677.png"}),o(),y,G,L,X,j,w,K,Q,Z])}const el=_(c,[["render",z]]);export{il as __pageData,el as default};
