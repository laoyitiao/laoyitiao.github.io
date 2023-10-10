import{_ as n,j as o,o as i,g as c,k as a,h as e,s as t}from"./chunks/framework.cfb14fe0.js";const D=JSON.parse('{"title":"第40讲：持续集成体系","description":"","frontmatter":{},"headers":[],"relativePath":"posts/devops/110-测试开发核心技术文档/(363) 第40讲：持续集成体系.md","filePath":"posts/devops/110-测试开发核心技术文档/(363) 第40讲：持续集成体系.md","lastUpdated":1696682708000}'),l={name:"posts/devops/110-测试开发核心技术文档/(363) 第40讲：持续集成体系.md"},r=t("h1",{id:"第40讲-持续集成体系",tabindex:"-1"},[e("第40讲：持续集成体系 "),t("a",{class:"header-anchor",href:"#第40讲-持续集成体系","aria-label":'Permalink to "第40讲：持续集成体系"'},"​")],-1),_=t("p",null,"本课时我们开始进入持续集成的学习。",-1),p=t("h4",{id:"开发模型",tabindex:"-1"},[e("开发模型 "),t("a",{class:"header-anchor",href:"#开发模型","aria-label":'Permalink to "开发模型"'},"​")],-1),d=t("p",null,"首先，我们来看下持续集成概念诞生的背景，在很多年前行业中通常采用一种 WaterFall 瀑布流式的开发模型，在 WaterFall 模式下我们会严格按照设计、开发、测试、打包构建，以及最后部署上线的瀑布式流程。虽然每个阶段都有着严格的交付路径，但等到最后上线部署你会发现存在大量的 Bug，但此时再去 Fix Bug 成本就会非常的高。",-1),h=t("p",null,"为了解决这样的问题，行业里改造了这个模型，开始采用敏捷开发模型。敏捷开发模型要求我们小步快跑、快速迭代，它会在每个阶段里设置小的迭代循环，虽然在小的迭代循环里也会发现一些 Bug，但是可以及时地对 Bug 进行修复，然后再进入下一个阶段，通过这个办法就可以尽早地发现 Bug，降低 Fix Bug 的成本，同时也可以让你的项目变得更容易控制，还可以加快产品的迭代速度。",-1),g=t("h4",{id:"持续集成",tabindex:"-1"},[e("持续集成 "),t("a",{class:"header-anchor",href:"#持续集成","aria-label":'Permalink to "持续集成"'},"​")],-1),m=t("p",null,"敏捷开发模型中涉及一个非常重要的概念就是持续集成，持续集成最早是在 06 年由我们前面课时介绍过的马丁福勒提出，核心是在一个开发过程中需要开发者不断的集成代码，每天进行集成，每次提交代码都可以通过构建发现问题，从而能够更早地把问题解决掉。",-1),u=t("p",null,"那么持续集成具有什么优点呢？首先你要明白持续集成并不能帮你减少 Bug，而是可以帮助你更早更快地解决问题，它的特点是每完成一点更新就集成到对应的分支，可以快速发现问题、定位问题，如果不经常集成，而分支或主干又在不断更新，会导致以后集成的难度变大，甚至难以集成，而采用持续集成就可以解决。",-1),A=t("h4",{id:"持续集成流程",tabindex:"-1"},[e("持续集成流程 "),t("a",{class:"header-anchor",href:"#持续集成流程","aria-label":'Permalink to "持续集成流程"'},"​")],-1),B=t("p",null,"接下来我们看下持续集成的正常工作流程，首先开发工程师会不断提交代码到 Git 仓库，当开发把代码提交到代码管理仓库后，持续集成服务器会检测到代码的变更，一旦发现代码变更便会自动化构建，构建完成之后进入自动化测试，最后自动化打包，这就是整个流程。在持续集成环境中你可以使用 Jenkins 等工具进行持续集成，也可以使用 Maven、gradle 等完成项目的构建，同时还会伴有单元测试、代码静态分析、代码审计、代码版本管理等，这就是持续集成的整体流程。",-1),C=t("h4",{id:"持续集成、持续交付、持续部署",tabindex:"-1"},[e("持续集成、持续交付、持续部署 "),t("a",{class:"header-anchor",href:"#持续集成、持续交付、持续部署","aria-label":'Permalink to "持续集成、持续交付、持续部署"'},"​")],-1),f=t("p",null,"接下来，我们看下持续集成、持续交付、持续部署这三者的区别，如图所示，从图中我们可以发现，从开发、构建到测试，如果整个阶段频繁地进行集成、测试，这个阶段就称之为 CI 持续集成。如果还包括测试、打包部署到测试环境等临时环境，这样的流程就称之为持续部署，通过 Dvelop 就可以把最新的代码一步到位部署到某个环境中，现在国内大部分公司都已经采用了持续交付。除了部署到发布环境、测试环境外，如果还可以直接部署到线上环境，就称之为持续部署，持续部署需要更严格的保障措施，比如线上监控、回滚、灰度发布机制等。",-1),k=t("p",null,"综上所述，我们发现 CI 负责完成最小的集成，CD 负责完成最新代码的发布，而持续部署要求我们能够持续地部署到线上环境，而在实际生产环境中，想要完成这样的流程需要对团队、团队的技术栈完成一定的改造。",-1),b=t("h4",{id:"持续集成管理工具",tabindex:"-1"},[e("持续集成管理工具 "),t("a",{class:"header-anchor",href:"#持续集成管理工具","aria-label":'Permalink to "持续集成管理工具"'},"​")],-1),x=t("p",null,"持续集成有非常多的管理工具，在这里我推荐你使用 Jenkins，大家可以在维基百科中查看相关的总结，这份总结中把目前行业里流行的各种各样的工具进行了统计和分析，你可以发现其中 Jenkins 是功能最全的，使用人群基数最大的，当然随着技术的发展进步，除 Jenkins 之外，还会涌现出越来越多的优秀的持续集成工具。",-1),q=t("p",null,"为什么 Jenkins 可以得到广大开发者的青睐呢？是因为它具有以下优势。",-1),M=t("p",null,"首先，Jenkins 是一个历史悠久的开源项目，同时开发人群使用度，插件机制都非常完善，是目前行业中使用最广泛的持续集成平台。",-1);function J(P,v,W,F,H,N){const s=o("Image");return i(),c("div",null,[r,_,p,a(s,{alt:"1.png",src:"https://s0.lgstatic.com/i/image/M00/08/4B/CgqCHl66coKAYq1KAAWlORDMJxE300.png"}),e(),d,h,g,a(s,{alt:"2.png",src:"https://s0.lgstatic.com/i/image/M00/08/4B/Ciqc1F66coqAO8d0AAWruoL246c967.png"}),e(),m,a(s,{alt:"3.png",src:"https://s0.lgstatic.com/i/image/M00/08/4B/CgqCHl66cpKAUoG0AAO7c03HBYg271.png"}),e(),u,A,a(s,{alt:"4.png",src:"https://s0.lgstatic.com/i/image/M00/08/4B/Ciqc1F66cpuAUG-1AATdPsuNiWA879.png"}),e(),B,C,a(s,{alt:"5.png",src:"https://s0.lgstatic.com/i/image/M00/08/4B/Ciqc1F66cqWAczw7AANWKAlLm_g201.png"}),e(),f,k,b,a(s,{alt:"6.png",src:"https://s0.lgstatic.com/i/image/M00/08/4B/CgqCHl66cq-AUI3JAAY-UYu4_D8326.png"}),e(),x,a(s,{alt:"7.png",src:"https://s0.lgstatic.com/i/image/M00/08/4B/CgqCHl66creATpMnAAURg5NimbA179.png"}),e(),q,a(s,{alt:"8.png",src:"https://s0.lgstatic.com/i/image/M00/08/4B/CgqCHl66cr-AfzMsAARZjtoWH7g102.png"}),e(),M])}const I=n(l,[["render",J]]);export{D as __pageData,I as default};
