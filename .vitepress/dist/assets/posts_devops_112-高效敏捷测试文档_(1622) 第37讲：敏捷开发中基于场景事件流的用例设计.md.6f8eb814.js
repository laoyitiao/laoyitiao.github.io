import{_ as t,o,g as p,Q as s}from"./chunks/framework.f949202b.js";const d=JSON.parse('{"title":"事件流图 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/devops/112-高效敏捷测试文档/(1622) 第37讲：敏捷开发中基于场景事件流的用例设计.md","filePath":"posts/devops/112-高效敏捷测试文档/(1622) 第37讲：敏捷开发中基于场景事件流的用例设计.md","lastUpdated":null}'),i={name:"posts/devops/112-高效敏捷测试文档/(1622) 第37讲：敏捷开发中基于场景事件流的用例设计.md"},a=s('<p>前面介绍了从用户故事、场景到测试用例的分解或设计的过程，它主要为单个用户故事的测试设计服务的，但这是不够的，还需要在业务层次、针对整个系统进行端到端的测试，才能更好地确保软件系统的质量。</p><p>针对整个系统进行端到端的测试方法就是本讲所要讨论的基于场景的用例设计或基于事件流的用例设计，而且这样的方法也很适合敏捷这样环境下的快速测试，适合探索式测试。只是在启动一个探索式测试 session 之前，事先列出所有的场景，基于场景及其组合，画出事件流图。然后基于<strong>事件流图</strong> 就可以生成<strong>端到端</strong>（E2E）的测试用例，甚至都不需要生成测试用例，即对着事件流图进行探索式测试。</p><h4 id="事件流图" tabindex="-1">事件流图 <a class="header-anchor" href="#事件流图" aria-label="Permalink to &quot;事件流图&quot;">​</a></h4><p>现在就来介绍一下事件流图，要能画事件流，先要理解什么是事件流。事件流可以理解为由多个处理操作构成的、有先后次序的某一业务事件的操作流程，同一事件不同的触发顺序和处理结果形成不同的事件流。事件流一般分为基本流、扩展流和异常流，如图 1 所示：</p><ul><li><strong>基本流</strong>，程序从开始执行直到成功结束所经过的最短路径，或者说，事件处理过程一切顺利，正常结束；</li><li><strong>扩展流</strong>，一个扩展流可能从基本流或另一扩展流开始，在特定条件下偏离基本流，执行额外的一些环节，然后重新加入基本流中；</li><li><strong>异常流</strong>，一个异常流可能从基本流或另一扩展流开始，在特定条件下偏离基本流，出现异常，无法再加入基本流、无法完成事件的处理就终止过程。</li></ul><p>事件流图就是描述某项业务不同事件处理的流程，以事件为结点，如图 1 所示。通过有方向的箭头来表示事件处理的先后次序以及事件之间的交互关系，而且基本流作为事件流图的主干线，而扩展流、异常流作为事件流图的分支。</p><p><img src="https://s0.lgstatic.com/i/image/M00/0A/6F/Ciqc1F6-EjWARB5fAAGuc70uwDc373.png" alt="image1.png"></p><h4 id="在敏捷测试中的应用" tabindex="-1">在敏捷测试中的应用 <a class="header-anchor" href="#在敏捷测试中的应用" aria-label="Permalink to &quot;在敏捷测试中的应用&quot;">​</a></h4><p>在敏捷测试设计中，可以将特性或 Epic 描述的需求转化为事件流，相当于完成业务流程的分析，能够梳理出一些场景，从而产生事件流图的分支------<strong>扩展流</strong> 、<strong>异常流</strong>。为了尽可能生成所有的事件流，对梳理出的场景可以进行可能的组合，从而产生可能存在的事件流。</p><p>例如，以在线教育 App 的&quot;课程购买&quot;为例，它涉及&quot;余额支付、微信支付、支付宝支付、拼团购买、礼券、优惠码&quot;等多个用户故事。在上一讲中，侧重对每个用户故事进行测试，现在则是对&quot;课程购买&quot;这个特性进行完整的业务测试，把这些用户故事串起来进行测试。更准确地说，先将把每个用户故事遇到的场景列出来，然后不是将用户故事串起来，而是将用户故事的某些场景串起来，形成新的扩展流和异常流。而基本流则是选择要购买的课程，然后选择支付方式、支付相应的费用，一切顺利，购买到课程。</p><p>而在这过程中，可能会遇到网络问题、余额不足而需要充值，或者不是遇到问题，而是有礼券或优惠码可以用。礼券一般可以用在各个课程中，以抵扣部分课程费用，而优惠码一般和课程绑定，免费购买课程。</p><p>基于实际业务和以上因素的考虑，可以绘制出事件流图。图 2 是一个简化的版本，实际情况可能更复杂，比如课程优惠期购买、拼团购买、点击他人分享链接之后购买等场景。</p><p><img src="https://s0.lgstatic.com/i/image/M00/0A/6F/CgqCHl6-Ej6AAoWTAAJ6EbVSudI167.png" alt="image2.png"></p><p>事件流图完成之后，就可以生成测试用例了，即遍历根节点&quot;开始&quot;到所有叶节点&quot;结束&quot;的路径。遇到循环的话，其路径可能是无限的，这时，如果质量要求不高，可以考虑完成一次完整的循环；如果质量要求高，则完成 2 次或更多次的循环，保证更高的测试充分性。</p><p>像图 1 这样的事件流图，可以生成图 3 所示那样的从根节点到叶节点的 E2E 测试用例，从左边基本流开始、然后是扩展流、最后到右边异常流。这里没有列出所有的测试用例，扩展流由图中间的 5 条测试用例再加上&quot;登录、注册、余额不足换一种支付方式&quot;等 3 条，总共是 8 条扩展测试用例，异常由图中右边两条用例再加上&quot;密码输错多次&quot;，共 3 条。所以，总共有 12 条（1+8+3）测试用例。</p><p><img src="https://s0.lgstatic.com/i/image/M00/0A/6F/Ciqc1F6-Ek6AXIfqAAPVUKpGq-M576.png" alt="image3.png"></p><p>这里还没有考虑测试数据，比如课程优惠折扣、大额度充值、大数据量、异常值等测试数据。</p><p>事件流依赖于场景的挖掘，下一讲会讨论&quot;场景挖掘&quot;，这里就不再深入讨论。同时，我们也可以设想，如何让场景进行更有意义的组合，从而产生更多的场景。例如，将&quot;课程优惠期购买、拼团购买、点击他人分享链接之后购买&quot;等不同的场景进行组合，就会增加一些新的场景，比如：</p><ul><li>课程优惠期 + 拼团购买</li><li>点击他人分享链接 + 拼团购买</li><li>课程优惠期 + 点击他人分享链接 + 拼团组合购买</li></ul><p>如果再结合事件处理的流程，可以再丰富事件流图，然后会设计出业务覆盖更充分的 E2E 测试用例。</p><h4 id="状态图与有限状态机" tabindex="-1">状态图与有限状态机 <a class="header-anchor" href="#状态图与有限状态机" aria-label="Permalink to &quot;状态图与有限状态机&quot;">​</a></h4><p>之前，我们可能学过功能图方法，它也是一种动态方法（基于输入域的方法可以看做是静态的方法） ，但功能图的本质是<strong>状态图</strong> ，认为程序的运行可以看做是在不同状态之间不断迁移的过程，比如在线教育 App 的课程购买就是在&quot;等待输入、登录成功、等待选择、等待支付、支付成功......&quot;等一系列状态之间进行切换。状态图不同于<strong>事件流图</strong>，事件流图的核心是事件处理的流程，和业务流程图、活动图更接近。</p><p>而<strong>状态图</strong>的核心是软件系统所处的各种状态及其之间的迁移，也可以看做是业务流程状态化。从一个状态迁移到另一个状态可能是由时间、消息触发的，也可能是由事件触发的，但状态图关注点还是状态，特别是对嵌入式系统或状态明显的控制程序，适合采用状态图，比如电梯控制程序，如图 4 所示。</p><p><img src="https://s0.lgstatic.com/i/image/M00/0A/C6/CgqCHl6-cCaAAiLeAACLGCB-8_0697.png" alt="1.png"></p><p>状态图有对应的数学模型------有限状态机（Finite State Machine，FSM）、扩展有限状态机（Extended Finite State Machine，EFSM）等。例如，有限状态机可以描述成 5 元组，即 Q、Σ、δ、q0、F，其中：</p><ul><li>Q = 有限状态的集合</li><li>Σ = 有限、非空的输入字母表</li><li>δ = 一系列转换函数，完成状态的迁移</li><li>q0 = 初始状态</li><li>F = 可接受（或最终）状态的集合</li></ul><p>这是不是很像图灵机了？这样基于数学模型就可以进行类似定理证明那样的工作，即用形式化方法进行验证，确保程序百分之百是对的，这对像电梯控制程序、发动机控制程序、核电站控制程序等性命攸关的关键性软件是非常必要的。但它已经不是我们通常所说的测试，日常工作中的测试只是实验，不是数学证明。</p><p>扩展有限状态机模型是对有限机状态模型的一个扩展，它在 FSM 模型的基础上增加了变量、操作以及状态迁移的前置条件，它被描述成 6 元组。基于 EFSM 测试的输入应该包含两个部分：<strong>测试输入序列及其包含的变量值（输入数据）</strong>。手工选取这些测试数据的工作十分繁琐，一般需要采用自动选取的方法，如聚类方法、二叉树遍历算法和分段梯度最优下降算法等，从而极大地提高实际测试工作的效率。</p><p>最后出一个思考题，之前了解活动图吗？活动图和事件流图有什么区别？它们在软件测试设计中有什么不同的价值吗？作为提示，活动图有角色、泳道、分支、合并等。</p>',29),e=[a];function n(l,r,_,g,c,u){return o(),p("div",null,e)}const h=t(i,[["render",n]]);export{d as __pageData,h as default};
