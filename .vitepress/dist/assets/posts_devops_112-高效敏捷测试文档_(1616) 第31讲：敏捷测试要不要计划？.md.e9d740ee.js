import{_ as r,j as e,o as p,g as i,k as s,Q as n,s as t,h as l}from"./chunks/framework.b3d8e22e.js";const S=JSON.parse('{"title":"测试计划的价值 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/devops/112-高效敏捷测试文档/(1616) 第31讲：敏捷测试要不要计划？.md","filePath":"posts/devops/112-高效敏捷测试文档/(1616) 第31讲：敏捷测试要不要计划？.md","lastUpdated":1696417798000}'),a={name:"posts/devops/112-高效敏捷测试文档/(1616) 第31讲：敏捷测试要不要计划？.md"},_=n('<p>&quot;<strong>凡事预则立，不预则废</strong> &quot;，没有事先的计划和准备，就不能获得项目的胜利，这充分体现了计划的重要性，没有计划是万万不可的，即使是在敏捷开发模式下，虽然在敏捷宣言中有这样一句&quot;<strong>拥抱变化 胜于 遵循计划</strong>&quot;。但是，敏捷宣言末尾有一行小字，特别提醒我们右边项也是有价值的，即&quot;遵循计划&quot;是有价值的，只是&quot;拥抱变化&quot;更具有价值。</p><p>一方面我们需要写一个简洁的测试计划书，指导后续的测试工作；另一方面计划也是一个过程，正如我们常说的，计划不是一个阶段性的活动，不只是为了写一个计划书，而是贯穿整个研发项目周期的计划过程，所以计划要用&quot;Planning&quot;，强调是一个基于上下文的、不断优化的计划过程。</p><h4 id="测试计划的价值" tabindex="-1">测试计划的价值 <a class="header-anchor" href="#测试计划的价值" aria-label="Permalink to &quot;测试计划的价值&quot;">​</a></h4><p>在敏捷开发中，开发节奏很快，越快的时候越要有计划，否则会更糟糕，&quot;欲速则不达&quot;。在制定计划过程中，让我们系统审视项目可能遇到的问题、尽早地识别出潜在的风险，能够未雨绸缪、防患于未然，对成功完成测试是很有帮助的。</p><p><strong>制定测试计划时，首先迫使我们明确测试目标</strong> ，这个目标不只是测试人员自己确定的测试目标，而是整个团队共同确定的测试目标。明确正确的测试目标自然很重要，<strong>后续所有的测试活动不就是为了达成测试目标吗？也就是目标引导我们后续如何开展测试活动</strong>，而没有目标的测试是多么的可怕。计划往往是评价实施的依据，基于测试计划，可以更好地评价测试做得如何。</p><p><strong>事先制定测试计划，也能帮助我们界定项目的测试范围</strong>，即事先知道哪些要测，哪些可以不测，这是测试估算、资源安排的基础，也是后续测试分析、设计和执行的基础。从这个角度看制定测试计划也是必要的。</p><p><strong>在制定一个计划时，也能帮我们厘清测试的思路</strong> ，制定一个切实可行的测试方案，即解决如何测试的问题，逼着我们思考，反思过去做得不够好的地方，如何在当前项目上进行改进。简洁的测试计划还可以提供历史测试信息和可追溯性，<strong>从而推动测试的改进</strong>。</p><p>如果团队、项目干系人和我们一起评审计划，并一致认可这个测试计划，也就说明计划中所定义的测试范围、所需的资源、所安排的进度等被团队接受，<strong>计划就成为项目干系人之间的一种约定，为后续的具体实施、协作提供了有力的保障</strong>。</p><h4 id="一页纸的测试计划" tabindex="-1">一页纸的测试计划 <a class="header-anchor" href="#一页纸的测试计划" aria-label="Permalink to &quot;一页纸的测试计划&quot;">​</a></h4><p>测试计划有价值，但我们更重要的工作还是测试的分析与设计，例如如何通过分析找出更多的场景，然后设计测试用例或脚本覆盖它们。而且，我们一直强调上下文的变化，我们会根据上下文来调整测试计划。所以，<strong>在敏捷中测试计划要尽可能写的简单，用&quot;一页纸&quot;来体现敏捷测试计划的简单性</strong>。虽然你可以写两页纸、三页纸的计划，不一定只写一页纸的计划，但是你能写一页纸的计划就不要写两页，你能写两页纸的计划就不要写三页，只写下那些有价值的内容，没有价值的内容就不用写。</p><p>那我们想想，哪些内容是测试计划一定要明确的？</p><p><strong>首先，可以省去一些通用的做法、一些惯例</strong>。例如，每次写当前迭代的测试计划时，会从上一个迭代的计划书中复制过来，粘贴到这个计划中，这是在传统软件测试计划编写过程中做的事情，在敏捷测试中就不要做了。有些惯例，比如环境的例行检查、通常的入口/出口准则、上线前要做的例行检查等，都可以把它转化为一些清单（CheckList，检查表）。我们在迭代测试计划中，只记录那些本次迭代特有的内容。</p><p><strong>其次，在敏捷测试计划中，还有哪些项是可以省略掉的</strong>？在传统测试计划中，工作量的估算是基础，特别是项目越大、团队规模就越大，这时会更关注工作量的估算，从而决定需要多少人力；而在敏捷测试中，一方面团队很小、相对稳定，另方面在做发布计划时会有估算，以决定这个需求（如用户故事）是否可以放入当前的迭代中，一旦需求放进迭代中，整个团队就要努力把它做完。即使遇到一些估算不够准确或其他困难，此时迭代周期也不会调整，而是依赖于团队的协作和努力，例如，在前期测试人员可以帮助开发做一些事情，在后期开发可以帮助测试做一些事情。分工不要那么明确，更强调团队的协作和力量，这时，估算不那么重要。在传统测试计划中，进度安排也是很重要的一项，但敏捷中完全有可能省去，因为我们更强调持续测试，在一个迭代中，没有明显的里程碑，即使有，也已成为惯例，因为迭代周期是相对固定、有节奏的。例如，前两天要完成测试需求分析和测试计划、最后一天要完成一个全回归......等已成为惯例，甚至成为流程的一部分，团队遵守就好了，没必要在每个迭代的计划中重复写。</p><p>这样讨论下来，在敏捷测试计划中，必须写下来的一些主要事项有以下 10 个。</p><ul><li><strong>测试目标</strong>：在业务上如何更好地确保已有业务不受影响，以及易用性、性能、安全性、测试覆盖率、测试效率等方面的具体、明确的目标。</li><li><strong>交付内容</strong>：交付哪些有价值的内容给客户？交付哪些功能特性？交付哪些文档、或工作件（如测试计划、自动化脚本等）？可以包括整体的验收标准。</li><li><strong>测试项</strong>：我们将测什么、不测什么？明确要测试的功能、性能、安全性等具体测试任务，以及要做哪些合规性检查、需要测试哪些环境/平台等。</li><li><strong>人员安排</strong>：每一个测试任务都有对应的团队成员负责。</li><li><strong>假定</strong>：有没有一些假定条件？例如，这次待发布的版本只限于特定的用户使用。</li><li><strong>依赖性</strong>：前端发布依赖于后端某个版本的发布，组件之间的依赖性等。</li><li><strong>测试风险</strong>：可能会出什么样的质量问题、可能面对的测试挑战、可能无法覆盖的某些测试点等，涉及人员、测试范围、环境、时间或资源限制等不确定的因素、或潜在的负面影响。</li><li><strong>测试策略</strong>：会采用什么测试策略？采用哪些测试方法或工具？</li><li><strong>测试环境</strong>：会做哪些改变或需要进行哪些新的配置？</li><li><strong>其他</strong>：例如参考哪些文档资料？</li></ul><h4 id="如何编写一页纸的测试计划" tabindex="-1">如何编写一页纸的测试计划 <a class="header-anchor" href="#如何编写一页纸的测试计划" aria-label="Permalink to &quot;如何编写一页纸的测试计划&quot;">​</a></h4><p>在前面的几讲中，我们已经讨论了代码依赖性分析、基于上下文驱动思维的测试分析、基于用户思维的场景挖掘、测试风险识别与分析、测试策略制定，这些工作做好了，测试计划就水到渠成了，剩下的问题就是如何描述这个测试计划。</p><p>之前，我们喜欢用 Word 方式来编写测试计划，但在敏捷测试中，是时候换一种方式来表达了，即如何简洁地呈现出测试计划，团队也方便浏览，只要花上几十分钟甚至几分钟就能看完；如果有问题，也相对容易发现，对于这样的要求，团队自然会想到 WiKi、仪表板、思维导图等方式来表达。</p><p><strong>1.WiKi 方式</strong></p><p>为测试计划创建一个页面，就如同今天的墨客文档、腾讯在线文档，可以引用一个合适的模板（如表格方式的模板），团队成员就可以在相应的地方进行添加、修改等编辑工作，这种方式特别适合团队协作。也可以让之前所设置的测试责任人（Test Owner，TO）角色先完成一个测试计划的初稿，然后再开一个（在线）会议，团队一起快速浏览、评审这个计划，不同团队成员也可以直接在这文档上输入自己的建议或进行修改，最后再由 TO 定稿，并持续维护这个文档。</p><p><strong>2.仪表板格式</strong></p><p>采用仪表板（Dashboard）方式，可以使团队以一种更好的视觉方式、一目了然地查看测试计划，甚至可以加上一些色彩，突出一些重点，将团队成员的视线吸引到某个特定的区域，如测试风险、测试策略等区域，如图 1 所示。</p>',22),g=t("p",null,[t("strong",null,"3.思维导图方式")],-1),c=t("p",null,"创建敏捷测试计划的最好方式，还是思维导图方式，它可以和之前的测试需求分析、风险分析等工作很好地衔接起来。像整理测试项、测试风险等，都是一个先发散、后收敛的过程，可以先头脑风暴，甚至不管对错，先增加内容，然后再删去不合理的内容，增加节点、删除节点这是经常发生的事，而且敏捷测试计划是一个相对变化比较频繁的动态过程、不断完善的迭代过程。",-1),u=t("p",null,[t("strong",null,"思维导图采用了一种直观的视觉方式，可以增强创造性思维和记忆力"),l("，也能体现测试计划编写的思维方式，真正能做到一页纸的测试计划------就是一张图，如图 2 所示。")],-1),d=n("<p>针对测试项、测试风险、测试策略等，可以在思维导图上标注优先级。如果团队成员，不确定某些内容是否可以删除，也可以加注释。针对某个测试风险、测试项、场景的讨论过程中，产生的一些好的想法，也可以及时加注释。有些风险和策略有关系、有些测试项之间有依赖关系，还可以标上这种关系。</p><p>采用思维导图来制定测试计划，不再需要花一整天或好几天来写测试计划，用 2～3 个小时就能完成，团队也更乐意积极参加这种讨论，不仅效率高，而且有趣、互动性强，可以灵活展开、折叠，哪怕在手机上也可以方便浏览，随时添加测试项、删除测试项，随时调整和完善测试计划。也可以贴在墙上、白板上，使测试计划更可见，在每日站会上，结合敏捷测试计划，来审查项目的实际进展。</p><p>这一切，采用思维导图来建立和维护测试计划都是很好的，我甚至发现有些公司已经开发了企业内部的思维导图在线网站，同样可以像 WiKi 那样协作完成测试计划，只是现在不是文字，是一张丰富多彩的图。</p><p>要写出有效的测试计划，团队需要约定一些测试计划制定的原则，比如：</p><ul><li>测试计划必须给出对所交付给客户价值的衡量方法或验证方法；</li><li>测试目标必须明确，符合 SMART 原则等；</li><li>测试项必须列出应用场景，标注优先级；</li><li>测试风险不要多，只要列出 Top 5 的测试风险；</li><li>测试策略能够消除或缓解测试风险，并确保测试目标的实现；</li><li>依赖性、假定等也不可或缺。</li></ul><p>这一讲的内容就到这里了，最后给你出一个思考题：敏捷特别关注价值的交付，上面第一条原则也是&quot;测试计划必须给出对所交付给客户价值的衡量方法或验证方法&quot; ，那么在文中图 1 或图 2 中哪一项能反映这点？是否有改进的空间，更好地给出对所交付给客户价值的衡量方法？欢迎留言讨论。</p>",6);function h(q,m,T,A,f,C){const o=e("Image");return p(),i("div",null,[_,s(o,{alt:"1.png",src:"https://s0.lgstatic.com/i/image/M00/00/EC/CgqCHl6qqvuAbR1ZAAKkBjw9GPA432.png"}),g,c,u,s(o,{alt:"2.png",src:"https://s0.lgstatic.com/i/image/M00/00/EC/Ciqc1F6qqwSAOVARAATsp95XSRs734.png"}),d])}const V=r(a,[["render",h]]);export{S as __pageData,V as default};
