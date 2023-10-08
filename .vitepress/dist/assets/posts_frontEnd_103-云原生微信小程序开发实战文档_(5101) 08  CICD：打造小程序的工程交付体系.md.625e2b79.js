import{_ as a,j as n,o as r,g as s,k as l,h as e,Q as i,s as t}from"./chunks/framework.a0d18f64.js";const G=JSON.parse('{"title":"08CICD：打造小程序的工程交付体系","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/103-云原生微信小程序开发实战文档/(5101) 08  CICD：打造小程序的工程交付体系.md","filePath":"posts/frontEnd/103-云原生微信小程序开发实战文档/(5101) 08  CICD：打造小程序的工程交付体系.md","lastUpdated":1696682708000}'),p={name:"posts/frontEnd/103-云原生微信小程序开发实战文档/(5101) 08  CICD：打造小程序的工程交付体系.md"},g=i('<h1 id="_08cicd-打造小程序的工程交付体系" tabindex="-1">08CICD：打造小程序的工程交付体系 <a class="header-anchor" href="#_08cicd-打造小程序的工程交付体系" aria-label="Permalink to &quot;08CICD：打造小程序的工程交付体系&quot;">​</a></h1><p>你好，我是俊鹏，今天我们来学习怎么建设小程序持续集成（Continuous integration，CI）和持续交付（Continuous Delivery，CD）体系。</p><p>CI/CD 没有统一的行业标准，业务类型、团队规模等客观因素都会造成CI/CD最终形态的差异化，比如涉及支付功能的应用在 CI/CD 体系中需要特别注重安全方面的检查和测试。所以这节课我只结合自己的经历以及腾讯 TCB 团队在 CI/CD 领域的实践经验，分享一些具备通用性的方法论和实践模式（差异化的部分你需要根据所做的业务和团队的具体情况动态调整）。</p><p>前面你已经学了怎么使用构建工具优化研发模式，和自动化测试的一些实施方法，这些内容可以帮你提高研发效率和代码质量，相比原始的小程序开发模式有了明显的进步，从手工作坊迈进了工程化的大门，但也只是刚迈过门槛。<strong>仅具备构建体系和自动化测试的开发模式还远未达到工程化的完备形态，接下来就是持续集成和持续交付，我们不妨把它们成为持续化体系。</strong></p><h3 id="小程序持续化体系需要具备哪些环节" tabindex="-1">小程序持续化体系需要具备哪些环节 <a class="header-anchor" href="#小程序持续化体系需要具备哪些环节" aria-label="Permalink to &quot;小程序持续化体系需要具备哪些环节&quot;">​</a></h3><p>小程序的持续化体系包括持续集成和持续交付，<strong>而要搭建持续化体系首先需要清楚它们都是什么。</strong></p><p><strong>首先是持续交付。</strong> 跟持续交付直接相关的是&quot;精益原则&quot;，更早可以追溯到&quot;精益生产&quot;思想。精益生产的目的是减少生产过程中产生的浪费，后来这种思想被带入软件开发领域形成了精益软件开发（Lean software development，简称 LSD）理论。LSD 遵循了 7 个规则：</p>',7),_=t("p",null,'它们被统称为精益原则，精益原则和敏捷开发有很多重合的地方，比如"消除浪费"与最小可行性产品的主旨类似、"尽快发布"与快速迭代的目标一致......事实上，LSD 本来就起源于敏捷社区，部分原则也是从敏捷开发思想中总结而来的。',-1),c=t("p",null,[e("而持续交付是遵循精益原则演变出的一种现实目标，它并不是一种固定的标准或方法，而是一种指导思想。为了实现持续交付不仅需要客观层面的技术平台和工具（比如任务管理平台、源码管理工具等），也依赖主观层面的规范，约束甚至人与人之间的组织关系（比如明确前后端的分工），"),t("strong",null,"所以接下来的内容会涉及技术与人两个角度。")],-1),h=t("p",null,[t("strong",null,"实现持续交付需要持续集成的底层支持。"),e(" 理论上，持续交付包括三个必要因素：持续集成、自动化测试和部署流水线。三者并不是顺序连接的独立环境，而是互相依赖。")],-1),u=t("p",null,[t("strong",null,"持续集成是一种比较模糊的定义（不以交付为目的），"),e(' 指的是每次代码的修改或提交都触发构建和测试，展开来讲又可分为代码版本控制、触发条件规范等细节（这些内容我们下文再讲）。然后代码经过自动化测试之后进入部署和发布环节，这一套完整的流程被称为"部署流水线"：')],-1),C=t("p",null,"部署流水线示意图",-1),d=t("p",null,[e("部署流水线的终点是发布，但是因为小程序的特殊机制，发布体验版或正式版本需要在微信公众平台的管理后台进行人工发布，所以小程序的部署流水线的终点只能是发布小程序的预览版，面向的人群要么是内部的团队，要么是小部分的内测用户，这两类用户都是以测试为目标，"),t("strong",null,'所以可以将小程序的持续交付理解为是"面向测试的"'),e("，通俗一点说就是，小程序的持续交付的产物是提供给测试使用的。")],-1),m=t("p",null,[e("理论上，持续集成最终的构建产出也是面向测试的，然而持续集成本身又包含了单元测试，根据06讲，宏观上前后端的自动化测试都可以理解为各自的单元测试，而微观上前后端各自的自动化测试又可以细分为单元测试、端到端测试和集成测试。这样再去理解小程序的持续交付体系，自动化测试便可以被归拢到持续集成中。"),t("strong",null,"经过调整后的小程序持续交付体系可归纳为下图：")],-1),b=i('<p>小程序持续化体系的基本模式示意图</p><p><strong>接下来就是基于这个模式进行更细化的任务分解和技术选型。</strong></p><h3 id="任务分解和技术选型" tabindex="-1">任务分解和技术选型 <a class="header-anchor" href="#任务分解和技术选型" aria-label="Permalink to &quot;任务分解和技术选型&quot;">​</a></h3><p>根据&quot;小程序持续化体系的基本模式&quot;，你可以大致梳理出完整流程的行进路线：</p><ol><li><p>由开发者提交代码为触发点，先进行自动化测试。</p></li><li><p>自动化测试通过之后，再进行编译和构建。</p></li><li><p>第三步，将构建的产出部署至指定的服务器。</p></li><li><p>最后一步将部署完成的代码进行发布。</p></li></ol><p><strong>这条路线比较清晰，实现的过程中需要从技术与人的角度切入，</strong> 技术在里面的角色是借助合理的工具或平台执行一些自动化任务和流程；人的重要性体现在规范的制定和流程中某些关键环节的决策上，&quot;技术与人&quot;是搭建任何工程体系必备的两个要素，小程序的持续化体系同样如此。比如第一步的自动化测试被触发的方式就需要遵循人制定的规范。</p><p>基于 Git 的源码管理平台都具备一项基本的功能：Webhooks。它的作用是当源码仓库发生某些事件时触发一个事件，这个事件便是持续集成的起点。开发者可以借助一些平台或服务监听（这个平台或服务通常被称为持续集成服务器，我们将其简称为 CI 服务器）Webhooks 的事件，然后根据事件的信息进行后续的任务分发。这个过程中涉及以下工作。</p><ul><li><p><strong>选择源码管理平台</strong>。目前比较流行且稳定的源码管理平台有 Github 、Gitlab 以及国内的码云......国内企业大多选择开源的 Gitlab 进行内部的源码管理，所以我们接下来的内容都以 Gitlab 为例。我们仅仅是将 Gitlab 作为讲解范例，但是讲解的内容并不是只适用于Gitlab，前面讲的这些源码管理平台都支持 Webhook，都适用于我们要搭建的持续化体系。</p></li><li><p><strong>制定触发 Webhooks 的规范</strong> 。可以触发Webhook的事件类型有很多，比如Push、Tag、Merge......选择哪个事件作为触发器并没有绝对统一的标准，每个技术团队会根据业务需求制定不同的规范，这就体现了人在规范制定上的重要性。腾讯 TCB 团队是<strong>将 Master 分支的所有相关事件作为触发持续集成任务的起点</strong>，进而又细分为两个具体事件：Merge Request（合并请求，简称MR）事件以及 Master 分支的 Push 事件，这个过程也会涉及人的工作，包括 MR 的发起和 Code Review（代码审查）。典型的流程是：</p></li></ul><ol><li><p>开发者 A 在 Master 以外的某个分支上编写代码然后提交到 Gitlab。</p></li><li><p>开发者 A 在 Gitlab 上发起 MR ，同时请求开发者 B 进行代码审查。</p></li><li><p>MR 被发起后触发 Webhooks 事件，CI 服务器监听到事件之后拉取分支代码进行自动化测试。测试完成后将结果反馈给 Gitlab，如果测试通过则继续流程，未通过则中断流程。</p></li><li><p>自动化测试通过后，开发者 B 将开发者 A 提交的代码进行审查，如果通过则允许 MR，不通过则打回并中断流程。</p></li><li><p>MR 被允许后开发者 A 或开发者 B（两者都可以）在 Gitlab 上执行 Merge 操作。</p></li><li><p>开发者 A 的分支被 Merge 到 Master 分支之后，再次触发 Webhooks 事件，CI 服务器监听到事件后拉取 Master 分支代码进行编译和构建操作。然后将构建的产出部署到指定服务器，对于小程序来说就是上传至微信的服务器。如果是测试环境，可以通过微信官方提供的<a href="https://developers.weixin.qq.com/miniprogram/dev/devtools/ci.html" target="_blank" rel="noreferrer">miniprogram-ci</a>工具生产预览版的二维码；如果是体验或生产环境则必须由人工在微信管理后台进行手动发布。</p></li><li><p>至此就完成了持续集成和持续交付的整体流程。</p></li></ol><ul><li><strong>搭建 CI 服务器和相关工具</strong>。先提供一台执行自动化任务的机器，物理机或虚拟机均可，从性能的角度考虑最好是物理机；然后搭建一个管理自动化任务的平台，用于监听 Webhooks事件和发起自动化任务，目前比较流行的平台有 Gitlab CI、Jenkins 等，Jenkins 的成熟度和可定制性略优，所以我会以 Jenkins 为例来讲接下来的内容。</li></ul>',10),q=i('<p>小程序的持续化体系流程图</p><p>从图中我们可以看到，Jenkins 上发起了代码扫描、性能评估、自动生成 Tag 等任务。这些是跟业务类型无关的自动化任务，而是从纯技术的角度考虑。代码扫描是为了检测出代码中不符合规范或者涉及安全问题的代码；性能评估是为了发现小程序的性能不佳问题进而及时修复；自动生成 Tag 和 Changelog 能够提高代码的可维护性，以及配合版本回滚策略实现一键回滚。</p><p>根据执行阶段的不同可以将这些任务分为两种。</p><ul><li><p><strong>针对分支：</strong> 包括代码扫描、自动化测试和性能评估。这些任务所处的阶段是在分支被合并到Master 之前，用于评估分支代码的功能、规范、性能等是否符合预期，我们可以将它们统称为&quot;面向测试的&quot;；</p></li><li><p><strong>针对 Master：</strong> 包括构建、自动生成 Changelog 和 Tag。这些任务所处的阶段是分支代码被合并到 Master 之后，用于产出面向部署的代码以及记录当前迭代详情，我们可以将它们统称为&quot;面向部署的&quot;。</p></li></ul><p>面向测试的三个任务主要目的是评估分支代码是否符合预期，自动化测试是从功能的维度评估代码逻辑的正确性；性能评估是我们在 06 讲学习的质量保障的必要手段；代码扫描则是从规范性的角度对代码进行评估，实施的手段通常是借助一些代码静态扫描工具（比如针对 JavaScript 的 ESLint、针对 CSS 的 StyleLint 等），评估的维度又可细分为两方面。</p><ul><li><p><strong>规范：</strong> 任何一个研发团队应该制定统一的代码规范，这样能消除由团队成员个人代码风格造成维护困难问题，通过制定代码规范配置（比如 ESLint 配置）对代码进行静态扫描，暴露出不符合规范的代码风格，提示开发者进行修正；</p></li><li><p><strong>安全：</strong> 任何公开（ Public ）的代码都应该消除安全隐患，比如代码中不应该携带密钥、用户密码、开源项目中不应该有指向内部系统的链接等。在目前的开源大潮下，这项工作尤其重要，业内不乏由于开源代码中携带敏感信息而造成的数据泄露灾难。可用的工具包括<a href="https://dpnishant.github.io/jsprime/" target="_blank" rel="noreferrer">JSPrime</a>、<a href="https://github.com/ajinabraham/nodejsscan" target="_blank" rel="noreferrer">NodeJSScan</a>等等。</p></li></ul><p>面向部署的三项任务中，构建的产出直接作为下一步部署的物料，自动生成 Changelog 和 Tag 则是从提高维护效率的角度考虑。自动生成 Changelog 任务是通过 Git 的 Commit 信息自动创建 Changelog 信息并写入到源码仓库的 Changelog 文件中，原本这项任务是由人工完成，借助工具（比如<a href="https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-cli" target="_blank" rel="noreferrer">conventional-changelog-cli</a>）可以实现自动化，但要提前制定 Git 的 Commit Message 规范。自动生成 Tag 是为了每次部署的版本都可追溯，一方面能够提高代码的可维护性；另一方面也便于版本间的快速切换，比如回滚。</p><p>到目前为止，我们就完成了小程序持续化体系的模块分解，在讲解的过程中顺带提到了一些关键环节的技术选型，我们再系统性地梳理一下。</p><ul><li><p>源码管理平台：Gitlab、Github或码云......</p></li><li><p>CI服务器和自动化任务管理平台：Jenkins、Gitlab CI......</p></li><li><p>部署工具：由于小程序的代码是部署到微信的服务器，目前唯一可用的部署工具是官方提供的<a href="https://developers.weixin.qq.com/miniprogram/dev/devtools/ci.html" target="_blank" rel="noreferrer">miniprogram-ci</a>。</p></li><li><p>其他一些执行具体任务的工具：比如ESLint、JSPrime......这些工具的选择性很广泛，我们就不一一展开讲了。</p></li></ul><h3 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h3><p>持续集成和持续交付不仅能提高小程序的迭代效率，还能够从安全、规范、维护等角度提升代码质量以及研发团队的整体效率。在搭建持续化体系方面，小程序与传统前端项目的主要区别有两点：一是代码部署在微信的服务器；二是发布体验版和正式版必须人工操作。</p><p>第一点决定了小程序的部署必须借助官方提供的<a href="https://developers.weixin.qq.com/miniprogram/dev/devtools/ci.html" target="_blank" rel="noreferrer">miniprogram-ci</a>工具，第二点决定了小程序持续交付的最远触达点是发布小程序的预览版或者也叫开发版，不过微信官方也在不断地迭代工具和生态，未来也不排除可部署体验版甚至正式版的可能性。今天这节课我想强调这样几点：</p><ul><li><p>小程序的开发模式走向工程化，持续化体系是必备的；</p></li><li><p>打造持续化体系需要从技术与人两个角度切入，既要考虑技术实现，也需要人来制定理论规范</p></li></ul><p>我希望通过今天的学习，你能够明确小程序的持续化体系需要具备哪些环节以及技术与人在其中扮演的角色，然后能够将这些知识结合现实工作中你所在团队的具体业务类型，打造适合自己团队的持续化体系。</p><p>今天的课后作业有两个，分别对应我们在讲解持续化体系过程中的两个要素：技术与人。第一个作业是从技术的角度，希望你能够研究 Webhooks 的原理和使用方法；第二作业是从人的角度，希望你去研究目前主流的几种 Git 分支管理方案，包括 Git Flow、Github Flow 和 Gitlab Flow，然后对比它们的差异点，看看哪一种更利于本文讲解的持续集成体系。</p>',15);function A(I,k,f,T,S,D){const o=n("Image");return r(),s("div",null,[g,l(o,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image/M00/71/1B/CgqCHl-86QCAdWI0AAAmB8kFuuA425.png"}),e(),_,c,h,u,l(o,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image/M00/71/1B/CgqCHl-86Q-AE10PAAA9cPsFpbA683.png"}),e(),C,d,m,l(o,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image/M00/71/1B/CgqCHl-86R2AI1r9AAA9jqOVRyc402.png"}),e(),b,l(o,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image/M00/71/1B/CgqCHl-86X6ABiuqAADXtSLQIZ4158.png"}),e(),q])}const v=a(p,[["render",A]]);export{G as __pageData,v as default};
