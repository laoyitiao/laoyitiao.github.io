import{_ as r,j as e,o as a,g as p,s as t,k as _,h as n,Q as o}from"./chunks/framework.b3d8e22e.js";const D=JSON.parse('{"title":"凤凰项目：一个 IT 运维的传奇故事 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/devops/112-高效敏捷测试文档/(1587) 第02讲：通过案例全面比较传统测试与敏捷测试.md","filePath":"posts/devops/112-高效敏捷测试文档/(1587) 第02讲：通过案例全面比较传统测试与敏捷测试.md","lastUpdated":1696417798000}'),g={name:"posts/devops/112-高效敏捷测试文档/(1587) 第02讲：通过案例全面比较传统测试与敏捷测试.md"},c=o('<p>这一讲的内容我想通过一个例子来全面比较一下传统测试与敏捷测试的区别，这个例子来自一本书------《凤凰项目：一个 IT 运维的传奇故事》。这是由美国的三位 DevOps 专家撰写的一本关于 IT 运维的小说。有人说，在 IT 咨询业，没读过这本书都不好意思跟人家谈 DevOps。</p><br><p>别急，我们这一讲的重点的确不是 DevOps，而是比较传统测试与敏捷测试，一千个人眼里有一千个哈姆雷特，尽管大家对 DevOps 有不同的理解，但是，你要知道，<strong>DevOps 其实是敏捷开发向 IT 运维的自然延伸，它的原则和实践与敏捷开发是一致的</strong>。从测试的角度看，这也是帮助我们理解敏捷测试的一本非常不错的书。</p><h3 id="凤凰项目-一个-it-运维的传奇故事" tabindex="-1">凤凰项目：一个 IT 运维的传奇故事 <a class="header-anchor" href="#凤凰项目-一个-it-运维的传奇故事" aria-label="Permalink to &quot;凤凰项目：一个 IT 运维的传奇故事&quot;">​</a></h3><p>考虑到不是每个人都读过这本书，我先来介绍一下这本书讲了一个什么故事。</p><br><p>故事发生在美国一家历史悠久的汽车配件制造公司，有几年出现了经营困难，被竞争对手不断超越，公司经历了几轮裁员，但是情况还是没有好转。公司最大的竞争对手已经开始宣传它们可以提供客户在线定制汽车的业务，而公司的 IT 系统却满足不了这样的需求。为了扭转局面，公司把希望押在一个 IT 系统架构改造项目上------&quot;凤凰项目&quot;。取这个名字就有凤凰涅槃重生的意思，可见对于公司是至关重要的。</p><br><p>这个项目需要对公司线下门店、网上商店销售系统和后台订单处理系统进行改造，但是已经难产了两年，预算大大超支。这个项目涉及三个主要部门：研发、IT 运维和零售业务部门，测试是研发部门的下属部门。研发部门负责新系统的软件开发，测试部门负责测试，IT 运维部门负责搭建测试环境、生产环境以及新系统的部署，零售业务部门负责网上商店及线下门店的销售业务。</p><br><p>从以往合作来看，研发和运维部门关系紧张，经常互相甩锅。站在运维部门的角度看，开发部门每次都不考虑运维部署新系统需要花的时间，而且把项目时间都占用了，根本没有时间做测试。每次都是仓促上线部署，软件产品不稳定，质量很差，用户体验当然也不好。IT 部门甚至不得不靠每隔一小时重启一次服务器让系统得以运行。</p><br><p>针对凤凰项目，运维部门迟迟拿不到关于产品和测试系统配置的具体技术参数，和需要的基础架构信息。而从开发的角度看，运维部门很少派人参加项目会议，从 IT 那儿拿到信息反馈往往要等上好几个星期，测试环境和生产环境部署需要的时间太长，而且经常不一致，导致上线后各种问题。</p><br><p>可以说，凤凰项目是一个特别典型的 IT 项目，基本上囊括了现实中所有的项目问题：项目延期，代码质量低下，开发 / 测试 / 生产环境不一致，工期不考虑测试和部署，没时间测试，上线后每天救火，部门间不合作，出了问题互相指责，等等。</p><br><p>故事的主人公比尔本来是一名 IT 总监，临危受命成为负责整个 IT 运维的副总裁。上任之初他可以说是焦头烂额，到处扑火，还经历了一次愤然辞职。幸运的是，在困难之际出现了一位高人------艾瑞克，他有可能成为公司董事会的成员，精通精益生产，练就独门绝技&quot;三步工作法&quot;。在艾瑞克的传授指点下，比尔奇迹般的完成了任务，不仅顺利地完成了 IT 系统的改造任务，而且引入了新的工作模式，让 IT 运维部门、开发部门、测试部门、业务部门协同工作实现了持续构建、持续交付、持续反馈，也帮助公司实现了销售额大增，顺利度过难关。</p><h3 id="三步工作法" tabindex="-1">三步工作法 <a class="header-anchor" href="#三步工作法" aria-label="Permalink to &quot;三步工作法&quot;">​</a></h3><p>让我们先来看看这神奇的&quot;三步工作法&quot;。</p><br><p><strong>第一步，流动原则</strong>，建立开发到 IT 运维的快速工作流。减小批量大小，通过内建质量杜绝向下游传递缺陷，缩短代码从变更到上线所需的时间，同时还提高服务的质量和可靠性。</p><br><p><strong>第二步，反馈原则</strong>，在技术价值流的每个阶段，包括产品管理、开发、测试、信息安全和运维，在所有工作执行的过程中，建立快速的反馈闭环。这中间包括创建自动化的构建、集成和测试过程，以便尽早检测出那些可能导致缺陷的代码变更，避免返工。</p><br><p><strong>第三步，持续学习与实验原则</strong>，建立学习型组织和质量文化，既鼓励探索、反复实践，又能够把个人经验转化为组织的财富。</p><br><p>简单的说就是持续交付、持续反馈、持续学习，是不是和敏捷很相似？所以说，精益、敏捷、DevOps，本质上是异曲同工。</p><br><p>这本书里给出的目标是在生产环境一天完成十个部署，在现在来看是一个很低的目标，但是要知道这本书是 2013 年出版的，在当时，大部分 IT 部门是每季度甚至每年完成一个部署。你可能认为故事里描述的项目改造后的情况太理想了，不太可能在短短几个月时间里发生这么大的变化。故事当然是经过艺术加工的，是生活的浓缩和提炼，而且现实中很难遇到像艾瑞克这样的高人，多数情况下还得靠自救和不断试错。</p><h3 id="凤凰项目改造前后对比" tabindex="-1">凤凰项目改造前后对比 <a class="header-anchor" href="#凤凰项目改造前后对比" aria-label="Permalink to &quot;凤凰项目改造前后对比&quot;">​</a></h3><p>那么现在，让我们来总结一下凤凰项目改造前后和测试有关的变化，基于变化，相信你能体会到传统测试与敏捷测试之区别。</p>',31),i={id:"",tabindex:"-1"},d=t("a",{class:"header-anchor",href:"#","aria-label":'Permalink to "<Image alt="" src="https://s0.lgstatic.com/i/image3/M01/6A/69/CgpOIF5U_aqAU2S_AAhDX6e2DEQ785.png"/>"'},"​",-1),T=o("<p>传统测试和敏捷测试的区别</p><p>最后，我们再对传统测试和敏捷测试的区别进行一个系统性的总结。</p><br><p>（1）传统测试更强调<strong>测试的独立性</strong> ，将&quot;开发人员&quot;和&quot;测试人员&quot;角色分得比较清楚。而敏捷测试可以有专职的测试人员，也可以是全民测试，即在敏捷测试中，可以没有&quot;测试人员&quot;角色，强调整个<strong>团队对测试负责</strong>。</p><br><p>（2）传统测试具有明显的<strong>阶段性</strong> ，从需求评审、设计评审、单元测试到集成测试、系统测试等，从测试计划、测试设计再到测试执行、测试报告，一个阶段一个阶段往前推进，但敏捷测试更强调<strong>持续测试</strong>、持续的质量反馈，没有明确的阶段性界限。</p><br><p>（3）传统测试强调测试的<strong>计划性</strong> ，而敏捷测试更强调测试的<strong>速度和适应性</strong>，侧重计划的不断调整以适应需求的变化。</p><br><p>（4）传统测试强调测试是由**&quot;验证&quot;和&quot;确认&quot;** 两种活动构成的，而敏捷测试没有这种区分，始终以<strong>用户需求为中心</strong>，每时每刻不离用户需求，将验证和确认统一起来。</p><br><p>（5）传统测试<strong>关注测试文档</strong> ，包括测试计划、测试用例、缺陷报告和测试报告等，要求严格遵守文档模板，强调测试文档评审的流程与执行等，而敏捷测试更<strong>关注产品</strong> 本身，关注可以交付的客户价值。敏捷测试中，强调<strong>面对面的沟通、协作</strong>，强调持续质量反馈、缺陷预防。</p><br><p>（6）传统测试<strong>鼓励自动化测试</strong> ，但自动化测试的成功与否对测试没有致命的影响，但敏捷测试的<strong>基础就是自动化测试</strong>，敏捷测试是具有良好的自动化测试框架支撑的快速测试。</p><br><p>最后，给你出一道思考题：基于凤凰项目改造前后对比的那张表，是不是说明他们实现了从传统测试到敏捷测试的成功转型？是否可以更进一步去看看这本书，理解他们为什么能转型成功，欢迎留言讨论。</p>",16);function h(l,I,b,u,q,m){const s=e("Image");return a(),p("div",null,[c,t("h3",i,[_(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/6A/69/CgpOIF5U_aqAU2S_AAhDX6e2DEQ785.png"}),n(),d]),T])}const f=r(g,[["render",h]]);export{D as __pageData,f as default};
