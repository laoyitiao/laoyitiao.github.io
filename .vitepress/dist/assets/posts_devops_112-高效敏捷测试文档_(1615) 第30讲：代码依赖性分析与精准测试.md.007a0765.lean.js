import{_ as p,j as s,o as i,g as _,k as e,h as a,Q as n,s as t}from"./chunks/framework.a0d18f64.js";const M=JSON.parse('{"title":"第30讲：代码依赖性分析与精准测试","description":"","frontmatter":{},"headers":[],"relativePath":"posts/devops/112-高效敏捷测试文档/(1615) 第30讲：代码依赖性分析与精准测试.md","filePath":"posts/devops/112-高效敏捷测试文档/(1615) 第30讲：代码依赖性分析与精准测试.md","lastUpdated":1696682708000}'),l={name:"posts/devops/112-高效敏捷测试文档/(1615) 第30讲：代码依赖性分析与精准测试.md"},r=n("",15),c=n("",11),g=t("p",null,'另外，精准测试技术可以帮助研发人员理解并优化软件架构设计。软件架构要尽量做到"高内聚、低耦合"。尽量把相关功能内聚到一个模块，减少模块之间的关联和依赖。如果代码之间的依赖度高、模块之间的耦合性强，一个方法的改动影响到的方法或功能模块就会很多，识别出的测试范围就会很大，这样就失去了精准测试的意义。',-1),d=n("",7),h=t("p",null,[t("strong",null,"自动筛选回归测试用例集"),a("：通过代码变更分析以及用来存储用例和代码映射关系的知识库，就可以为新提交的软件版本智能的筛选回归测试用例。")],-1),u=t("p",null,"首先分析新的软件版本有哪些变更，根据已经建立的知识库，计算出改动的代码影响到哪些功能，需要执行哪些测试用例，这样就可以减少针对每个版本的自动化测试用例集，缩短自动化测试的运行时间，过程如图 6 所示。",-1),A=t("p",null,"不少公司的研发团队根据精准测试的技术理论开发了自己的技术框架，实现了测试用例和代码的可视化的双向追溯、回归测试用例集的自动筛选甚至是智能选取、代码覆盖率分析、缺陷定位，以及测试用例聚类分析、与自动化测试平台的集成等功能。",-1),m=t("p",null,"今天这一讲到这里就结束了，总结一下这一讲的重点。",-1),C=t("p",null,"精准测试是一种新的软件测试分析技术，借助算法和工具，自动建立测试用例和软件代码之间的可视化追溯，实现测试范围的优化和缺陷的迅速定位。",-1),f=t("p",null,"用例和代码之间的映射关系是精准测试的技术核心。从用例到代码的正向追溯可以迅速定位缺陷并帮助改进软件架构设计和代码结构；从代码到用例的反向追溯可以帮助优化测试范围、自动筛选回归测试用例。",-1),T=t("p",null,"代码依赖性分析是实现用例和代码之间关联的基础。",-1),P=t("p",null,"最后留一个思考题给你：测试技术的选择是上下文驱动的，你认为精准测试技术适合你所在的团队及正在开发的产品/项目吗？理由是什么？",-1);function q(I,V,b,x,S,k){const o=s("Image");return i(),_("div",null,[r,e(o,{alt:"1.png",src:"https://s0.lgstatic.com/i/image3/M01/0A/92/CgoCgV6oCEaARed9AAI55Mr0iLE557.png"}),a(),c,e(o,{alt:"2.png",src:"https://s0.lgstatic.com/i/image3/M01/0A/93/CgoCgV6oCI2AIxYEAAHjB4xRFMY476.png"}),a(),e(o,{alt:"3.png",src:"https://s0.lgstatic.com/i/image3/M01/17/C1/Ciqah16oCJOATRg8AAK-1yrCObk977.png"}),a(),g,e(o,{alt:"4.png",src:"https://s0.lgstatic.com/i/image3/M01/17/C1/Ciqah16oCKCAM0e5AADOws9R6ts220.png"}),a(),d,e(o,{alt:"5.png",src:"https://s0.lgstatic.com/i/image3/M01/17/C2/Ciqah16oCM-AeIIaAAFtu9r-Dc0012.png"}),a(),h,u,e(o,{alt:"6.png",src:"https://s0.lgstatic.com/i/image3/M01/17/C2/Ciqah16oCNeAf_DLAAE5cxnRBOs611.png"}),a(),A,m,C,f,T,P])}const D=p(l,[["render",q]]);export{M as __pageData,D as default};
