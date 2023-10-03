import{_ as p,o as t,g as a,Q as r}from"./chunks/framework.f949202b.js";const d=JSON.parse('{"title":"工程化实践的重要性 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/048_iOS开发进阶/(6653) 开篇词  iOS 架构与开发工程化，让你成为 10x 程序员.md","filePath":"posts/frontEnd/048_iOS开发进阶/(6653) 开篇词  iOS 架构与开发工程化，让你成为 10x 程序员.md","lastUpdated":null}'),o={name:"posts/frontEnd/048_iOS开发进阶/(6653) 开篇词  iOS 架构与开发工程化，让你成为 10x 程序员.md"},e=r('<p>你好，我叫林永坚，在澳洲互联网公司 REA Group 担任 Mobile Tech Lead 一职。作为技术负责人，我主要负责移动端的架构与研发，同时也负责移动团队的建设和推动公司的工程化实践。</p><p>在我所负责的 App 中， realestate.com.au App 是澳洲本土企业流量排名前几的 App，几乎每个在澳洲买房、卖房、租房的人都会使它。在 App Store 上，这款 App 的评分也一直保持在 4.7 星以上。要知道，在 2020 年澳洲排名前 20 的免费 App 只有 8 个能到达 4.7 星。</p><p>现在看这款 App 已经是一个非常成功的产品了，但其实在几年前，我们也面临着重重困境。</p><h3 id="工程化实践的重要性" tabindex="-1">工程化实践的重要性 <a class="header-anchor" href="#工程化实践的重要性" aria-label="Permalink to &quot;工程化实践的重要性&quot;">​</a></h3><p>那是五六年前，我刚加入 REA Group 公司，当时我们的 App 版本发布周期长达 8 个月到一年。</p><p>为什么会这么长呢？因为我们没有好的开发流程和工程化标准。</p><p>举例来说，仅仅在准备发布阶段，由于没有代码管理规范，也缺乏自动化工具的支持，我们都需要专门停止手头工作，用一两个月的时间来准备。比如合并代码，需要手工操作，要花 2周 ~ 4 周；部署测试也是手动，需要 1 周时间；最后再进行回归测试，又要 2 周 ~ 3 周。</p><p>当时因为发布流程十分复杂，人工操作繁重还容易出错，有的同事为了逃避麻烦甚至请了病假。</p><p>虽然我们花那么长时间来准备，但 App 在 App Store 上的评分只有 2.5 星。主要原因是用户体验非常不好，经常崩溃，差不多每 5 个中就有一个用户的 App 会闪退。</p><p>为什么会这样？</p><p>其中一个原因就是没有<strong>统一的代码管理流程</strong>，开发者想要 Push 什么风格的代码都可以。比如，当时就有一名开发者为了学习 Core Data，在一个周末期间把学习的 Core Data 的代码直接 push 到了主分支。</p><p>结果，他的这个 Push 操作让 App 的崩溃率上涨了 10%。事后虽然我们想要补救，但因为这部分代码没有任何架构设计，花了两三年才逐渐把相关代码移除完毕！</p><p>另一个原因就是，代码没有<strong>统一而灵活的系统架构设计与开发模式</strong>。就像前面的那次事故，之所以要花两三年才移除干净，就是因为缺乏面向接口的编码模式，Core Data 的数据对象污染了整个代码库。同时，又因为 App 缺乏分层的架构设计，导致所有逻辑都编写在臃肿的 View Controller 里，单元测试覆盖率几乎为零。可以说，代码库进入几乎没法维护的状态，很多崩溃情况无法修复。</p><p>为了避免同类的事情再次发生，也为了提高效率，我们开始了漫长而十分崎岖的工程化实践之路。最终，App 的崩溃率从 20% 以上下降到 0.01% 以下，App Store 的评分也从 2.5 拉升到 4.7 星。</p><h3 id="为什么有这门课程" tabindex="-1">为什么有这门课程？ <a class="header-anchor" href="#为什么有这门课程" aria-label="Permalink to &quot;为什么有这门课程？&quot;">​</a></h3><p>虽然我们下定决心改变现状，但在开始实施工程化实践的时候还是面临许多困难。</p><p>当时我们想要规范代码管理流程，提高开发、迭代、打包和发布效率，不再纯手动操作，但实际做下来事情千头万绪，既没有明确的工程化目标和方向，市面也没有相关的资料可供参考，只能通过不断试错来推进。</p><p>而且，既然是要进行 iOS 工程化开发，就需要工具支持。但当时不仅相关的工程化、自动化工具稀少，苹果公司所提供的工具链也非常不友好，市面上的 CI（Continuous Integration，持续集成）工具并不支持脚本化和版本管理，很多时候需要人手操作来搭建，且每次 MacOS 或者 Xcode 更新，都需要重新搭建。</p><p>如今四五年过去了， 适用于 iOS 开发的 Swift 语言逐渐成熟，可重用组件的编写以及可扩展架构的设计变得越来越方便；而苹果公司的工具链，特别是支持自动化和工程化的开源工具和在线服务（如 Fastlane、 TravisCI ）也越来越丰富。</p><p>此外，像 GitHub 、GitLab 等代码管理平台的出现，也使我们的开发流程更容易统一和规范。</p><p>但我发现，<strong>还有些 iOS 开发者并没有意识到技术的变化，仍在用纯手工的形式开发和发布 App</strong>。</p><p>另外，虽然过去了很长时间，但市面上有关 iOS 开发的工程化实践资料仍然很少，有的只是介绍如何使用系统 API 来开发一款 iOS App，还有的是介绍各种自动化和工程化工具的使用，并没有连贯起来形成体系。</p><p>为了让你不再像我以前那样一直掉坑填坑，也为了帮助更多的开发者，我结合多年的工程化实践经验，做了这样一门课程。我希望以一个类似朋友圈的 App 为案例，来向你介绍如何在架构和开发 App 的时候进行工程化实践，降低开发门槛和维护成本，同时还能快速迭代与发布。</p><p>之所以选择以<strong>一个开发类似朋友圈的 App 为案例</strong>，是因为该 App 的架构非常通用，它包含了网络访问、 JSON 数据解析、数据存储，以及响应式数据流处理等功能模块。通过它，我们可以把这一套架构应用到各种场景中，例如电商类 App、生活类的房产App、卖车 App，以及社交类短视频 App，等等。</p><h3 id="课程设计与收获" tabindex="-1">课程设计与收获 <a class="header-anchor" href="#课程设计与收获" aria-label="Permalink to &quot;课程设计与收获&quot;">​</a></h3><p>根据实际项目开发流程，我把本课程分为五大部分。</p><p><strong>第一部分：配置与规范</strong></p><p>在这部分，我主要介绍如何定义和配置一套统一的规范，具体包括：搭建统一的开发环境，使用 CocoaPods 统一管理第三方的依赖库，统一 Project 和 Target 的配置，使用 Swiftlint 统一编码规范，以及使用 Git 和 GitHub 来规范源代码管理流程。</p><p>我希望通过这部分的学习，能让你在开发所有的 iOS 项目时更规范。如果你的团队有新成员，它也可以帮助你更好地让新成员接手项目，同时也可以极大减轻团队成员之间的沟通成本。</p><p><strong>第二部分：基础组件设计</strong></p><p>因为基础组件能够帮助功能模块之间解藕，提高可重用性，还能支撑业务功能的快速开发。所以，我将会介绍如何使用极少的工作量来构建一些非常实用的基础组件。这些组件包括：设计规范组件、路由组件、多语言支持组件、动态字体和深色模式的支持组件。除此之外， 我还会介绍如何使用隐藏功能菜单来分离生产环境与研发环境。</p><p><strong>第三部分：架构与实现</strong></p><p>随着 iOS 和 Android 成为移动端的两大霸主，为了兼顾两者，有些公司使用 React Native 或者 Fluter 等非官方方案。而我们则致力于使用官方平台所提供的原生技术，通过一套架构设计，使得开发者可以很方便地在 iOS 和 Android 之间进行业务代码的开发。</p><p>在这一部分，我会为你详细介绍如何使用 BFF 和 MVVM 来设计一套跨平台的架构。</p><p>具体来说，我会详细介绍这套框架中的 iOS 的部分，包括 MVVM 模式中每一层的功能、责任，以及具体的代码实现。同时我还会演示如何通过 TDD 方法来对 MVVM 中每一个功能模块进行单元测试，从而提高代码的质量和有效地降低 App 的崩溃率。</p><p>通过这部分的介绍，我希望你能学会如何<strong>从零开始设计一个符合你团队具体情况的 App</strong>，同时也可以尝试在原有的 App 里面，循序渐进地引入 MVVM 架构来提高代码的灵活性、扩展性和可维护性。</p><p><strong>第四部分：上架与优化</strong></p><p>在这部分我会介绍自动化上架以及上线后优化的一些技巧。比如，如何统一管理证书与描述文件，如何快速交付，如何灵活支持统计分析，如何借助崩溃报告解决线上的 Bug，如何设置远程开关，如何进行A/B 测试，等等。</p><p>我希望你可以在这部分<strong>学会搭建一套自动化的流程</strong>，来实现无人操作打包、签名、分发与上架，有效提升 App 的交付速度。</p><p><strong>第五部分：加餐</strong></p><p>缺乏架构设计的 App 都会遇到一些问题，每当一个新的功能，或者更好的技术栈出现后，想要引进来会带来很多麻烦。</p><p>比如想支持动态字体或者深色模式，由于最初开发时没有考虑到，后来想要加进这些功能时就变得十分麻烦，几乎需要修改整个 App。所以架构设计的可扩展性、灵活性对产品不断迭代尤为重要。</p><p>为了测试架构的灵活性，我就做了一个大胆设想，在不改动任何原有代码的基础上把 UI 层从 UIKit 替换成苹果公司最新的 UI 框架 SwiftUI（下面是 SwiftUI 的实现效果）。在专栏中，我会详细告诉你我是一步步怎么做的。</p><p><img src="https://s0.lgstatic.com/i/image6/M00/0A/95/CioPOWA3b1CAHmUvAJGsb5PxzYc810.gif" alt="Moments.gif"></p><h3 id="讲师寄语" tabindex="-1">讲师寄语 <a class="header-anchor" href="#讲师寄语" aria-label="Permalink to &quot;讲师寄语&quot;">​</a></h3><p>如果你已经在 iOS 开发上有 2~3 年的经验，能读懂系统 API 和使用三方库开发绝大部分的功能，想要自己从头到尾架构设计一个 App；如果你平常需要花很长时间做大量的重复劳动，例如管理证书、打包、签名、部署测试设备和上架，迫切想从中解放出来；如果你想提升自己，彰显技术实力，帮助团队规范开发流程，甚至成为团队的技术负责人......</p><p>那么，这门课非常适合你。</p><p>通过它，你可以掌握一套工程级的 iOS 开发流程。它能让你编写出更高效、易读，易于维护和扩展的代码，同时还能减少大量重复劳动，提高技术工作效率，助你以一当十，成为<strong>10x 程序员。</strong></p><p>在学习上有一个 721 法则，说的是，一个人的能力习得，70%来自实践，20%来自他人，10%来自培训学习。我希望通过这次实战课程，能让你更上一层楼。</p><p><img src="https://s0.lgstatic.com/i/image6/M00/0A/32/Cgp9HWA3DfqAS68IAAUsVkFwlpM721.png" alt="ios 金句.png"></p><hr><p><a href="https://shenceyun.lagou.com/t/mka" target="_blank" rel="noreferrer"><img src="https://s0.lgstatic.com/i/image6/M00/08/77/Cgp9HWA0wqWAI70NAAdqMM6w3z0673.png" alt="Drawing 1.png"></a></p><p><strong>《大前端高薪训练营》</strong></p><p>12 个月打磨，6 个月训练，优秀学员大厂内推，<a href="https://shenceyun.lagou.com/t/mka" target="_blank" rel="noreferrer">点击报名，高薪有你</a>！</p>',54),s=[e];function n(i,_,A,g,l,c){return t(),a("div",null,s)}const S=p(o,[["render",n]]);export{d as __pageData,S as default};
