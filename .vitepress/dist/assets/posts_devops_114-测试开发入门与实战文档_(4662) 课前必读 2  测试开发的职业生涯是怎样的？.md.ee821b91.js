import{_ as s,j as a,o as e,g as n,k as p,h as o,s as t,Q as l}from"./chunks/framework.cfb14fe0.js";const v=JSON.parse('{"title":"课前必读2测试开发的职业生涯是怎样的？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/devops/114-测试开发入门与实战文档/(4662) 课前必读 2  测试开发的职业生涯是怎样的？.md","filePath":"posts/devops/114-测试开发入门与实战文档/(4662) 课前必读 2  测试开发的职业生涯是怎样的？.md","lastUpdated":1696682708000}'),i={name:"posts/devops/114-测试开发入门与实战文档/(4662) 课前必读 2  测试开发的职业生涯是怎样的？.md"},g=t("h1",{id:"课前必读2测试开发的职业生涯是怎样的",tabindex:"-1"},[o("课前必读2测试开发的职业生涯是怎样的？ "),t("a",{class:"header-anchor",href:"#课前必读2测试开发的职业生涯是怎样的","aria-label":'Permalink to "课前必读2测试开发的职业生涯是怎样的？"'},"​")],-1),_=t("p",null,"通过开篇词和第一篇课前必读，你应该对整个软件测试行业的来龙去脉有了比较清晰的了解，也明白了当下最潮流的开发技术是如何一步步被引入项目中的。",-1),h=t("p",null,"另外，随着开发生产效率的提升，如何在越来越快的交付周期内保障质量，已经成为一件越来越有挑战的事。此时，你不得不做出改变了。",-1),c=t("h3",{id:"一个典型的敏捷开发测试流程",tabindex:"-1"},[o("一个典型的敏捷开发测试流程 "),t("a",{class:"header-anchor",href:"#一个典型的敏捷开发测试流程","aria-label":'Permalink to "一个典型的敏捷开发测试流程"'},"​")],-1),u=t("p",null,"为了详细讲解不同阶段或职位（Title）的测试开发所做的工作有哪些不同，我以当前流行的敏捷模式下的软件开发测试生命周期为例来讲解。",-1),d=t("blockquote",null,[t("p",null,"流程较为复杂，建议你点开视频，通过动图同步我的流程讲解过程。")],-1),q=l('<p>开发测试流程图</p><p>如上图所示，你可以看到，一个软件产品的立项是从<strong>软件产品规划</strong> （图片顶部）开始的，一般我们根据业务目标把规划的软件产品需求项，基于实际情况（业务目标、公司战略等）拆分为多个 Backlog 进行进一步细化，即 <strong>Backlog Grooming</strong>。</p><p>细化之后的需求按照<strong>优先级和发布规划</strong> ，会分为<strong>多个 Sprint</strong> 进行开发、测试、上线。在每一个 Sprint 内，需求会被拆分为一个个的开发和测试任务，开发人员完成 <strong>Task 开发</strong>后，就进行自测。</p><p>自测没问题，通过提交 Pull Request 的方式，请求提交代码到 Master 分支（这个动作对应于<strong>提交测试</strong>），请求提交后，代码托管平台比如 GitHub、GitLab 等会触发由 Pull Request 引起的自动构建。之后，自动构建会引导持续集成平台，把开发提交的最新代码打包成可用的测试版本。</p><p>同时，开发通过更改 Jira Task 状态的方式（或者平台自动更改 Jira 状态、开发邮件/口头通知等方式），提醒测试人员进行测试验证。</p><p>软件测试版本生成后，有两个测试内容会同时进行：</p><ul><li><p>持续集成平台会触发预设的测试脚本进行自动化测试验证（一般是整个产品的主流程冒烟测试）；</p></li><li><p>测试人员根据获取到的软件测试版本，针对开发提交的 Task 进行测试（主要针对新功能，手工执行的方式居多）。</p></li></ul><p>测试人员在进行人工验证时， 先根据测试计划和之前准备的测试脚本进行冒烟测试（主要关注点在于本测试组负责的业务模块）。</p><p>冒烟测试通过后，再进行功能、性能、安全等方面的<strong>测试验证</strong> （也就是图中 Sprint 这个模块内的蓝色的<strong>测试验证</strong>部分，这是测试人员花费最多时间的地方）。测试人员进行测试验证的依据来自测试计划的制定和细化， 这部分工作通常由项目立项开始，至 Sprint Grooming 后，开发提测之前结束。</p><p>如果测试验证<strong>不通过</strong> ，测试失败的结果会被反馈给开发，Pull Request 不会被 Approve，开发人员会修复问题，再次提交 Pull Request 流程；反之，如果测试验证<strong>通过</strong>，会通知开发人员测试已经通过（这相当于 Approve 之前开发提交的 Pull Request），然后开发就会合并代码到 Master 分支。合并会再次触发新一轮的持续集成流程，如此循环往复。</p><p>合并进入 Master 分支的代码，通过自动测试验证后，就会被发布到指定<strong>测试环境</strong>，测试人员会将自动化脚本在此环境进行新一轮的测试验证，直至没问题后，会依次经历几个测试环境的验证，最终被持续部署平台采用蓝绿部署、灰度发布、滚动发布等方式部署上线。</p><p>OK，了解了一个典型的敏捷开发测试流程后，接下来，我们看一下不同阶段的测试人员在这一流程中分别担任怎样的作用。</p><h3 id="测试开发、资深测试开发、测试专家的不同工作职责" tabindex="-1">测试开发、资深测试开发、测试专家的不同工作职责 <a class="header-anchor" href="#测试开发、资深测试开发、测试专家的不同工作职责" aria-label="Permalink to &quot;测试开发、资深测试开发、测试专家的不同工作职责&quot;">​</a></h3><p>为了方便你理解，我按照测试开发的不同阶段在上面的流程图中标记了不同的颜色。</p><h4 id="_1-蓝色-初级测试开发" tabindex="-1">1. 蓝色------初级测试开发 <a class="header-anchor" href="#_1-蓝色-初级测试开发" aria-label="Permalink to &quot;1. 蓝色------初级测试开发&quot;">​</a></h4><p>从功能测试转为测试开发，你的工作内容会包括帮助功能测试人员编写测试工具及测试框架，进而来提升功能测试的效率，也就是通过开发手段让功能测试变得更简单、快捷。</p><p>这一阶段的目的纯粹是助力功能测试，减少人工重复劳动，缩短测试周期。该阶段的测试开发仅仅<strong>聚焦在开发</strong>这个纯粹的事情上。</p><p>举例来说，你通过编写自动化工具/框架，把本应该是手工执行的工作转换为机器自动运行；通过编写造数平台（Data Platform），让构造测试数据变得比以往更为简单。</p><p><strong>所以，判断一个测试开发是否合格的标准，是看他能否让功能测试更省力。</strong></p><h4 id="_2-橙色和绿色-资深测试开发" tabindex="-1">2. 橙色和绿色------资深测试开发 <a class="header-anchor" href="#_2-橙色和绿色-资深测试开发" aria-label="Permalink to &quot;2. 橙色和绿色------资深测试开发&quot;">​</a></h4><p>资深测试开发不再局限于开发本身，而是<strong>从流程出发</strong>，检测公司整个软件开发周期中，哪个部分耗时最长，哪个部分最复杂，哪个部分最容易出错；然后资深测试开发就要改造现有流程，通过详尽分析、仔细论证，把最复杂、最容易出错的部分流程自动化掉，纳入当前的持续集成流水线中去。</p><p>这一阶段的测试开发，已经不满足于完成功能测试提出的开发需求，而是通过自己的开发技能，把测试各个阶段的任务有机地结合起来，经过消化后重新组织输出。</p><p>比如，以前公司没有持续集成、持续部署平台，代码打包都是开发或者测试人工去操作的，那么资深测试开发就要和整个开发团队合作，建立并完善这些流程。再比如，以前测试流水线没有建立，自动化测试脚本需要人工触发执行，那么，资深测试开发就需要把这些流程整合。</p><p><strong>因此，判断一个资深测试开发是否合格的标准，是要看他的技术产出是否能融入公司的技术体系中去</strong> 。换言之，就是要看<strong>功能测试的工作是否严重依赖他的产出</strong>：如果测试开发停工，那么功能测试就会很痛苦，甚至也被迫停工。</p><p>需要注意的是，这一阶段资深测试开发的产出，肯定非常贴切公司的情况，但未必符合其他公司的情况，或者未必跟业界的主流情况一致。</p><h4 id="_3-红色-测试架构师或者测试专家" tabindex="-1">3. 红色------测试架构师或者测试专家 <a class="header-anchor" href="#_3-红色-测试架构师或者测试专家" aria-label="Permalink to &quot;3. 红色------测试架构师或者测试专家&quot;">​</a></h4><p>可以看到，这一部分的测试开发重点已经不是测试本身了，而在于<strong>整个软件开发全流程的梳理</strong> 。从项目立项开始，测试架构师就要规划当前的测试框架需要何种裁剪才能保证本项目顺利发布，并且在项目最开始阶段，通过<strong>测试左移</strong>的手段，对需求、开发技术方案进行分析，在保证可测试性的前提下，把公司现有的测试手段完美嵌入整个开发生命周期中。</p><p>在项目发布后，通过<strong>测试右移</strong>的手段，对生产系统进行监控，对系统本身或业务本身的各种线上情况进行分析，找出薄弱点，反查整个开发测试流程中的短板，然后补齐，从而保证产品的高质量和业务的高可用性。</p><p><strong>判断一个测试架构师或者测试专家是否合格的标准，是看他能否在某个领域全部或者部分重新定义测试活动、测试顺序</strong>。换言之，这一阶段的工作产出，不仅仅适用于本公司，放到其他公司也可以，从方法论上来说，应该是普适的。</p><p><strong>围绕以上三个测试角色，我们简要总结下：</strong></p><ul><li><p><strong>测试开发</strong> ，即<strong>提升</strong>测试活动的效率，通过技术手段帮助功能测试工程师提升测试效率；</p></li><li><p><strong>资深测试开发</strong> ，即<strong>重构</strong>测试活动，技术产出完全融入公司的技术体系；</p></li><li><p><strong>测试专家/测试架构师</strong> ，即<strong>重新定义</strong>测试活动，输出普适的测试方法论。</p></li></ul><h3 id="你应该做怎样的职业生涯规划" tabindex="-1">你应该做怎样的职业生涯规划？ <a class="header-anchor" href="#你应该做怎样的职业生涯规划" aria-label="Permalink to &quot;你应该做怎样的职业生涯规划？&quot;">​</a></h3><p>正如我在 <strong>&quot;开篇词 | 功能测试转测试开发的正确姿势&quot;</strong> 所言，软件测试职业规划不外乎以下两种：</p><ul><li><p>凭借技术优势走向管理之路；</p></li><li><p>专注技术深耕，成为专才。</p></li></ul><p>这两条路线几乎是共识，那么如何知道自己更合适哪条路线呢？很多同学希望我提供完整的职业生涯路线做参考，但我觉得这样并不具备指导意义，因为只有你才真正了解自己的所长和兴趣。</p><p>倒是那些促使你做出职业选择的问题，反而可以帮助你决策，比如：</p><ul><li><p>面对任务时，你更愿意多人协作还是独立完成？</p></li><li><p>碰见问题时，你更倾向于了解其工作原理还是解决就好？</p></li><li><p>跨团队合作时，你更乐于去制定计划还是执行计划？</p></li><li><p>向上汇报时，你更关注业务结果还是技术方向/深度？</p></li><li><p>你是否常常会关注团队其他成员在做什么？团队/个人有何 KPI？</p></li></ul><p>在这些问题中，你可能会发现自己更具备&quot;管理&quot;属性，或者发现自己对技术有着专业执着，那么&quot;职业生涯路线应该如何选择&quot;这个答案便不言而喻。</p><h3 id="小结" tabindex="-1">小结 <a class="header-anchor" href="#小结" aria-label="Permalink to &quot;小结&quot;">​</a></h3><p>其实不管是技术路线也好，管理路线也罢，职业生涯的根本都是要保持自己的核心竞争力，你必须建立自己在小组、在部门、在公司的技术优势，然后才有获得认可的机会，而作为软件测试人员，<strong>测试开发</strong>技能几乎是你保持技术优势的最大法宝。</p><p>看到这里，你可能会更深刻地意识到，作为功能测试，如果你现在还不做出改变，那么你在整个软件开发测试周期里能做的事情就太少了，可替换性太高了！不仅如此，你的职业生涯也将会因为没有技术优势而变得艰难。</p><p><strong>只有转型测试开发，提升自己的技术深度和广度，才能更深入地参与到产品的各个阶段，做出更多的贡献，同时实现自己的个人目标。</strong></p><p>这也是我整个课程的初衷，希望它能够带你打开测试开发的大门。</p><hr><p><a href="https://shenceyun.lagou.com/t/eka" target="_blank" rel="noreferrer">&quot;测试开发工程师名企直推营&quot; 入口，免费领取 50G 资料包</a></p>',45);function m(b,f,k,P,x,T){const r=a("Image");return e(),n("div",null,[g,_,h,c,u,d,p(r,{alt:"图片1.png",src:"https://s0.lgstatic.com/i/image/M00/4D/57/CgqCHl9Z5q6ACiZGAAJyO_8p-F4315.png"}),o(),q])}const A=s(i,[["render",m]]);export{v as __pageData,A as default};
