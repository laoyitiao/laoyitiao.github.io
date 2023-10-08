import{_ as t,o as a,g as p,Q as l}from"./chunks/framework.a0d18f64.js";const h=JSON.parse('{"title":"08工匠精神：熟悉APM产品的能力是RD的分内之事","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/应用性能分析实战_文档/(7057) 08  工匠精神：熟悉 APM 产品的能力是 RD 的分内之事.md","filePath":"posts/backEnd/应用性能分析实战_文档/(7057) 08  工匠精神：熟悉 APM 产品的能力是 RD 的分内之事.md","lastUpdated":1696682708000}'),i={name:"posts/backEnd/应用性能分析实战_文档/(7057) 08  工匠精神：熟悉 APM 产品的能力是 RD 的分内之事.md"},e=l('<h1 id="_08工匠精神-熟悉apm产品的能力是rd的分内之事" tabindex="-1">08工匠精神：熟悉APM产品的能力是RD的分内之事 <a class="header-anchor" href="#_08工匠精神-熟悉apm产品的能力是rd的分内之事" aria-label="Permalink to &quot;08工匠精神：熟悉APM产品的能力是RD的分内之事&quot;">​</a></h1><p>这一讲我将带你横向回顾下模块一各个章节的关键知识点，并简单铺垫下之后的章节。</p><p>在前面的章节，我带你学习了 7 个 APM 开源产品的学习方案和落地实践。由于章节有限，很可能课程所讲述的 APM 产品没有命中你们的选型。但没有关系，APM 协议与存储模型，以及关键模块的设计都大同小异，我会在接下来的章节中继续与你分享。</p><p>今天这一课时，我会围绕以下四个问题展开，告诉你&quot;熟悉 APM 产品的能力是每个开发人员的分内之事&quot;这一道理。</p><ul><li><p>需要部署全部 APM 产品吗？</p></li><li><p>部署前对 APM 如何选型？</p></li><li><p>APM 是如何体现工匠精神的？</p></li><li><p>如何高效学习 APM？</p></li></ul><h3 id="服务集群需要部署全部-apm-产品吗" tabindex="-1">服务集群需要部署全部 APM 产品吗？ <a class="header-anchor" href="#服务集群需要部署全部-apm-产品吗" aria-label="Permalink to &quot;服务集群需要部署全部 APM 产品吗？&quot;">​</a></h3><p>在学习任何一门新技术前，我们都会想要通过简短的&quot;白话&quot;，来了解这门技术是什么。所以在深度钻研 APM 前，让我们先回答&quot;APM 到底是什么&quot;这个问题。</p><blockquote><p>你可以结合日常所接触的 APM 产品，以及前面章节对热门 APM 的学习进行几分钟思考，心中先有份自己的答案。</p></blockquote><p>那我给出的答案是：APM 是应用性能管理（Application Performance Management）的缩写。从宏观角度上看，面向解决产品（对用户）体验不好的行为，都可以称为 APM，因此 APM 涉及的范畴非常广泛。大到前 7 个课时所讲述的 APM 各个领域的优秀开源产品，小到一线开发人员通过规范应用日志来提升定位问题的效率，这些都是在进行 APM 的建设。</p><p>APM 生态如此庞杂，为了让 APM 产品的功能建设更有目的性，也让问题定位时挑选 APM 产品更有针对性，所以 APM 细分了很多的领域。由于细分领域太多，下面我针对前面章节提及的APM 产品，来讲述这些产品都涉及哪些 APM 领域：</p><table><thead><tr><th style="text-align:center;">APM 产品</th><th>涉及的 APM 领域</th></tr></thead><tbody><tr><td style="text-align:center;">Apache SkyWalking</td><td>* 指标监控 * 集群拓扑  * 链路追踪 * 性能剖析 * 日志监控 * 集中报警</td></tr><tr><td style="text-align:center;">点评 CAT</td><td>* 指标监控  * 链路追踪（不推荐使用）  * BI 监控（不推荐使用） * 集中报警</td></tr><tr><td style="text-align:center;">Alibaba Arthas</td><td>* 性能剖析 * 在线故障排查 * JVM 监控</td></tr><tr><td style="text-align:center;">Alibaba Sentinel</td><td>* 集群可用性 * 流量可塑性</td></tr><tr><td style="text-align:center;">Java VisualVM</td><td>* 性能剖析 * 在线故障排查 * JVM 监控</td></tr><tr><td style="text-align:center;">Kibana</td><td>* 应用日志可视化</td></tr><tr><td style="text-align:center;">Grafana</td><td>* 监控数据可视化 * 集中报警</td></tr></tbody></table><p>可以看到，这些 APM 产品间涉及的领域都是有交集的，由于每个领域的生态都很大，所以每个 APM 产品对每个领域的实现是截然不同的，有足够的差异化。<strong>但具体到领域某个点的实现原理上却是大同小异</strong>，所以懂得原理可以让我们对 APM 的相应领域一通百通；并且熟悉差异化的产品实现可以让我们在定位问题时，能够挑选到合适的工具去剖析问题。</p><p>以<strong>性能剖析</strong>领域中的线程剖析为例，我们体会下上面这段话。</p><ol><li><p>Apache SkyWalking</p><ul><li><p>通过链路追踪页面获取慢链路的 Endpoint；</p></li><li><p>再通过性能剖析页面上的输入框，描述你要剖析的 Endpoint；</p></li><li><p>最后 SkyWalking 会通过抽样展示这个 Endpoint 关联的线程堆栈信息。</p></li><li></li></ul><blockquote><p>Endpoint（端点），SkyWalking 通过端点这个术语来定位要剖析的线程，你可以简单认为是请求，在&quot;15 | 数据磐石：APM 收集端的存储模型&quot;中我会再详细讲述。</p></blockquote></li><li><p><strong>Alibaba Arthas</strong></p><ul><li><p>通过日志上的数据面板（dashboard）命令或线程（thread）命令，获取想要 Dump 的线程 ID；</p></li><li><p>再通过线程命令，追加线程 ID 参数获取线程的堆栈信息；</p></li><li><p>最后通过各种在线故障排查命令，从而去诊断问题。</p></li></ul></li><li><p><strong>Java VisualVM</strong></p><ul><li><p>通过应用服务使用日志框架中打印的线程名称，或 VisualVM 可视化客户端的线程选项卡展示的应用名称，从而获取线程实时工作状态；</p></li><li><p>再通过线程名称，使用 Threads intspector 插件获取线程的堆栈信息；</p></li><li><p>最后使用各种插件进行问题诊断。</p></li></ul></li></ol><p>综上，产品呈现上的差异造就了不尽相同的使用场景，但原理上都是通过一定的手段（滑动窗口、线程名称、线程 ID）去找到线程，对线程进行 Dump，最终得到堆栈信息。<strong>通过对底层原理的组合封装，就可以构造出十八般兵器</strong>。</p><p><strong>那我们的服务集群需要部署全部的 APM 产品吗？答案是否定的。</strong></p><p>过多 APM 产品在运维上，会给 SRE 带来大量的维护工作量；在提效上，一线开发人员在日常需求开发之余，需要抽出更多时间去学习各种 APM 产品；从全局角度看，多数人基本会学一个忘一个，更别提学以致用了。</p><p><strong>所以这时候更需要去精简 APM，在部署前注重选型，在落地后注重本地化建设。</strong> 本地化建设我会在之后的章节详细与你讨论，这里我主要讲述下部署前的选型。</p><h3 id="部署前对-apm-如何选型" tabindex="-1">部署前对 APM 如何选型？ <a class="header-anchor" href="#部署前对-apm-如何选型" aria-label="Permalink to &quot;部署前对 APM 如何选型？&quot;">​</a></h3><p>选型我也建议使用竞品分析法，但竞品分析需要建立在了解自身的需求和一定程度的掌握 APM产品的基础上。</p><ul><li><p><strong>了解自身需求</strong>，你可以根据调查问卷收集和故障积累，来分析出内部诉求那些 APM 领域的产品；</p></li><li><p>之后通过本专栏的学习以及网上博客的<strong>竞品分析</strong>，你就可以开展选型方案了。</p></li></ul><p>以下有一些我总结的实践，方便你避坑。</p><h4 id="_1-不正确的选型思路" tabindex="-1">1.不正确的选型思路 <a class="header-anchor" href="#_1-不正确的选型思路" aria-label="Permalink to &quot;1.不正确的选型思路&quot;">​</a></h4><ul><li><p><strong>囫囵吞枣式选型 ×</strong></p><p>忽略自己的需求和忽略 APM 产品涉及的领域进行竞品分析，网上的博客也不胜枚举。比如将点评 CAT 与 Apache SkyWalking 进行对比就不合适。两个产品虽然涉及领域存在部分交集，但在部署方式、关键技术栈、核心领域的实现上却大相径庭。随便选出一个差异点就开始进行选型对比，这是一种错误行为，这种情况并不适合做竞品分析。</p></li></ul><p>所以反过来，使用 Apache SkyWalking 和 Pinpoint 进行竞品分析就很有代表性，从 Agent 的接入方式、轻量级内核、插件化生态的对比，到链路跟踪模型、仪表盘指标都有相似的地方。这种情况就比较适合开展竞品分析，并最终确定适合自身的选型。</p><ul><li><p><strong>性能主导式选型 ×</strong></p><p>选型追求极致的性能，这种选型思路也是不可取的。就国内现状，所有的应用服务几乎都是运行在中水位线以下；随着现阶段的服务上云化，应用服务的部署会获得更多弹性。<strong>所以现阶段 APM 选型应更注重产品能力而非性能指标</strong>。</p></li></ul><p>而且目前活跃的 APM 产品几乎都有 Apache、Alibaba 等顶级社区的背书，其质量我也不需要过多赘述。所以我们选型时的关注点要适合当下，并着眼未来的进行。</p><ul><li><p><strong>完全自建型 ×</strong></p><p>每个产品都不是完美无缺的，正因为这样我们才可以动手参与社区共建。也正是这样，才会有更多人和我一样，从中得到成长成为 Apache 和 Alibaba Committer，这个成长路径也是本专栏我要和你分享的内容之一。说回来，我也看过很多自建型的 APM，即使有专业性的团队，也绕不开首次落地实践过长、被质疑闭门造车这两个问题。</p></li></ul><h4 id="_2-比较好的选型思路" tabindex="-1">2.比较好的选型思路 <a class="header-anchor" href="#_2-比较好的选型思路" aria-label="Permalink to &quot;2.比较好的选型思路&quot;">​</a></h4><ul><li><strong>量化历史包袱 √</strong></li></ul><p>比如好多月都没有上线老项目、老架构了，这些老项目表象上看依然在为企业带来收益。但由于长期不迭代，就会出现维护人员薄弱的情况。这时便没人能评估应用服务接入 APM 后会不会出现问题，以及接入 APM 带来的收益。</p><p>这些具备历史包袱的项目是影响 APM 选型的重要指标之一，因为应用集群接入 APM 覆盖度越高、数据完整度就越高，报警定位就会更准确。</p><p>为了解决这些老项目的接入难题，我通过<strong>量化老项目各个指标</strong> 的手段，来<strong>确定选型 APM 的正确性</strong>。</p><p>如果你负责的集群也存在同样的历史包袱问题，你可以参考我的实践。</p><ol><li><p>通过发布平台或脚本，计算出应用最后的发布时间。时间越久远，接入 APM 的收益就越小。你可以抽取采样几个时间节点来绘制出历史项目的分布。</p></li><li><p>通过编译，分析出是否支持编译发布和依赖框架的明细。对不支持编译发布的老服务选型，我推荐 Agent 类型的 APM 产品；依赖框架的明细，方便我们确定是否还要做二次框架适配。</p></li></ol><ul><li><strong>分析社区文化 √</strong></li></ul><p>各个产品的社区地位对其产品的选型应用广度，发挥着越来越重要的作用。在 2018 年时，虽然 SkyWalking 的影响力和产品用户案例相较于 Pinpoint 有些差距。</p><p>但由于 SkyWalking 发源于国内，并非常注重国内社区活跃度的建设，无论是社区群、开发者大会、路演等都远超 Pinpoint。所以当时贝壳找房选型 SkyWalking，其社区文化起到了很重要的作用。</p><h3 id="apm-工程师的工匠精神" tabindex="-1">APM：工程师的工匠精神 <a class="header-anchor" href="#apm-工程师的工匠精神" aria-label="Permalink to &quot;APM：工程师的工匠精神&quot;">​</a></h3><p>通过对 APM 产品的学习，以及本地化的选型实践，相信你对 APM 的理解又加深了。这时让我们再思考一个问题：APM 重要吗？重要程度有多少？</p><p>我认为 APM 非常重要，参与工程建设的每个人都被期望有工匠精神。在开发过程中，每次迭代优化的 APM 指标都是追求卓越的体现；在出现问题时，能使用 APM 产品剥丝抽茧地解决线上问题也都是专业能力的体现。</p><p>随着职级和责任的变大，我们更需要学会利用 APM 避免线上故障带来的损失，从而孵化出更加优化的服务。</p><h3 id="如何高效学习-apm" tabindex="-1">如何高效学习 APM？ <a class="header-anchor" href="#如何高效学习-apm" aria-label="Permalink to &quot;如何高效学习 APM？&quot;">​</a></h3><p>既然 APM 对于一线开发人员如此重要，那我们如何高效学习 APM 呢？一条很好的建议是：无论何时，都不要&quot;无目的&quot;地学习源码。</p><blockquote><p>这种错误的学习认知，其背后逻辑是认为指读了（或是调试了）源码的每一行就能成为专家，而实则不是。</p></blockquote><p>可能你对 APM 产品的源码接触较少，不清楚 APM 的复杂度，那我举个深有体会的例子。作为后端开发工程师，SSM 框架中的 Spring 框架你再熟悉不过了。虽然熟悉 APM 的用户量相较熟悉 Spring 框架的用户量有一定差距，但是 APM 与 Spring 生态的复杂度绝对是一个量级的。</p><blockquote><p>以 SkyWalking 为例，SkyWalking 具有十几个子项目，每个项目有几十个模块，每个模块又有着上万行的代码。作为顶级开源社区出品，并师出名门，代码质量肯定不需要赘述。</p></blockquote><p>那你应该如何学习这些海量代码呢？你可以在运维应用服务过程中，有意识地去学习 APM。无论是使用 APM 定位线上问题，还是修复 APM 产品的 Bug，以及增加 APM 产品特性来开发源码，这些都是非常好的学习源码的机会。</p><p>我就是通过这种方式学习的，经过近三年的积累，我向社区提交了上百次的代码，也让更多社区伙伴加入了我的源码设计思想讨论。</p><p>如果你也按照这个方法进行源码学习，你也是在对社区做贡献。同时，你的代码也会得到更多优化机会，最终在兼容性方面会得到更高维度的考量、提升。</p><h3 id="小结与思考" tabindex="-1">小结与思考 <a class="header-anchor" href="#小结与思考" aria-label="Permalink to &quot;小结与思考&quot;">​</a></h3><p>今天的课程，我带你整体复盘了&quot;模块一 APM 产品落地实战&quot;中的 APM 产品。让你直接认识到&quot;对原理的组合封装，便能产生功能各异的 APM 产品形态&quot;这一本质。</p><p>但线上部署过多 APM 产品不仅会增加企业负担，还会让一线开发人员定位问题的效率下降。所以我们需要根据自身诉求进行竞品分析，最终选型出适合自身的 APM 系统。</p><p>APM 是日常避免线上故障的&quot;兵器&quot;，更是一线开发人员必备的技能，那我们需要如何学习 APM 呢?</p><p>一个非常好的方式，就是在日常迭代过程中沉淀遇到的线上问题，将问题暴露出的 APM 的不足之处，通过代码的形式提交到社区。让社区或版本方能结合你的实际场景精进源码。这样经过长时间的积累，你慢慢也就具备了举一反三的能力，能更好地掌握 APM 的设计思路了。</p><p>请问你有过 APM 的竞品分析经历吗？如果有，欢迎你将你的竞品分析案例，以及对最终选型的思考，在下方留言区与我们分享，期待与你讨论～</p>',56),o=[e];function n(r,A,P,M,s,d){return a(),p("div",null,o)}const _=t(i,[["render",n]]);export{h as __pageData,_ as default};
