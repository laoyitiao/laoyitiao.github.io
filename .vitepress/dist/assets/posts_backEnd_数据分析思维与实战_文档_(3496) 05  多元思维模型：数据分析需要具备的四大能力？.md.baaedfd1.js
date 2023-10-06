import{_ as l,j as i,o as e,g as t,k as o,h as r,Q as p}from"./chunks/framework.b3d8e22e.js";const P=JSON.parse('{"title":"背景 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/数据分析思维与实战_文档/(3496) 05  多元思维模型：数据分析需要具备的四大能力？.md","filePath":"posts/backEnd/数据分析思维与实战_文档/(3496) 05  多元思维模型：数据分析需要具备的四大能力？.md","lastUpdated":1696417798000}'),_={name:"posts/backEnd/数据分析思维与实战_文档/(3496) 05  多元思维模型：数据分析需要具备的四大能力？.md"},n=p('<p>今天我讲一下多元思维模型。</p><p>本节课内容一共分为四部分：</p><ul><li><p>背景；</p></li><li><p>中观能力；</p></li><li><p>微观能力；</p></li><li><p>宏观能力。</p></li></ul><h3 id="背景" tabindex="-1">背景 <a class="header-anchor" href="#背景" aria-label="Permalink to &quot;背景&quot;">​</a></h3><p>目前在整个数据分析行业中，大部分同学偏数据库和机器学习，又或是学计算机专业出身，所以会造成一种行业错觉------会点技术、会点 PPT 就可以做数据分析，感觉门槛比较低；有时候觉得自己做出的分析报告，别人能很快的发现问题，自己也认可，但就是不知道如何避免；有时候针对某个问题，有些人总是能有很多想法，但自己却不知道怎么理解；有些人职业发展的很顺利，而自己却始终有瓶颈。</p><p>其实这些困惑都非常正常，所以这一节课的目的就是告诉你，到底掌握好哪些能力才能够成为一名优秀的数据分析师，这也是后面所有课程的一个基础。这一节课会有一点点抽象，但是你要好好学。</p><p>先给出数据分析的多元思维模型，就是从中观、微观、宏观三个角度去出发。</p><ul><li><p>中观能力：中观能力是真正的专业度，看你是否能够发现其他数据分析师在分析中的问题。这个专业度不单指你的技术，而是需要你长期总结和思考。</p></li><li><p>微观能力：微观能力指有效沟通力+快速发散收敛力，看你是否能够从业务的交流中发现问题，找到方向，很多同学都还没意识到这一点。</p></li><li><p>宏观能力：宏观能力是洞见性的全局观，能够从社会事件和整个行业发展中找到业务的决策方向，这是极难的能力，同时平台和天赋缺一不可。</p></li></ul><p>怎么获得这些能力呢？我逐一来讲。</p><h3 id="中观能力" tabindex="-1">中观能力 <a class="header-anchor" href="#中观能力" aria-label="Permalink to &quot;中观能力&quot;">​</a></h3><p>中观能力指专业度，包括技术理解、逻辑性、价值点三个点。中观能力是反映分析师基本功怎么样、套路熟不熟练、思考到不到位的一种标准。</p><ol><li><p>技术理解：指对分析时用到的技术理解是否到位，是停留在理论阶段还是在实践阶段。很多同学看了很多数据分析的书籍，理论说起来无所不知，但在实践过程中还是遇到很多坑。</p></li><li><p>逻辑性：指对整体思考的逻辑性是否欠缺。</p></li><li><p>价值点：强调价值，你做出来的分析价值在哪。如果现在你是决策者，你敢不敢立马规划落地。</p></li></ol><p>中观能力的提升相对比较容易，基本上就是从他人那里获得有效反馈，所以你做出的分析一定要获得高手的反馈，让他指出一些不足或建议，然后多实践。</p><h4 id="_1-技术理解" tabindex="-1">（1）技术理解 <a class="header-anchor" href="#_1-技术理解" aria-label="Permalink to &quot;（1）技术理解&quot;">​</a></h4><p>在数据处理中经常用到数据标准化方法，比如常见的 MAX-MIN （最大最小值）方法、Z-score （z 分数）方法、指数对数法。但这只是理论上的方法，你需要理解到数据标准化的本质目的是去除量纲、量级的差异性，才能在业务中有效地利用。</p><p>举例：对于 to B 的金融公司来说，除了头部的大客户（前期资源），剩下的都是中小客户（后期拓展）。大客户和小客户需按照每天的交易额来区分，所以需要我们对交易额及用户进行建模。这时就要用到数据标准化，以 MAX-MIN 方法为例，如果直接用这种方法，会造成除了头部几个数据有数值外，其他基本都是 0。到与业务方沟通时，业务方 Leader 会觉得你这个方法很有问题。数据非常稀疏，无论是可用性还是理解性都很困难。</p><p>所以，有两个解法：</p><ol><li><p>对客户进行先分群，再用 MAX-MIN 进行标准化；</p></li><li><p>以 90% 中位数替代 MAX，消除头部影响，让数据变得不那么稀疏。</p></li></ol><p>实际上所有的技术都是为了让业务更加方便，更加高效，而不是让人很困惑，这就是技术理解。</p><h4 id="_2-逻辑性" tabindex="-1">（2）逻辑性 <a class="header-anchor" href="#_2-逻辑性" aria-label="Permalink to &quot;（2）逻辑性&quot;">​</a></h4><p>关于逻辑性，我举一个资讯类 App 的真实案例：数据分析师在研究最近一个月的数据，发现所有与留存相关的因素中，留存和自媒体文章下发的占比存在高度相关性。于是就建议业务方多下发自媒体文章，业务方觉得这个点很好，还真的做了。结果是刚开始几天留存是微涨，后续却大跌。</p><p>你觉得这个案例的问题出在哪 ？</p><p>其实相关性是一种基于向量的伴随关系，不代表直接的因果关系（但确实是因果关系的一种可能性），也就是说留存和自媒体文章下发的占比是一种伴随关系，而不是因果关系。留存的影响因素非常多，不仅仅是因为某一两个指标就能很好地提升留存。</p><p>上述例子后来复盘发现，最近刚好是因为有一些重大热点导致留存提升，而这些重大热点文章是以自媒体文章为主，最终造成了自媒体文章下发占比能提升留存的假象。</p><p>所以分析师的逻辑性非常重要，每一环节的推导必须要讲究严谨性，不能有侥幸心理。</p><h4 id="_3-价值点" tabindex="-1">（3）价值点 <a class="header-anchor" href="#_3-价值点" aria-label="Permalink to &quot;（3）价值点&quot;">​</a></h4><p>价值点，强调你做的所有分析一定要有价值点。</p><p>我曾经见到一个同学，竟然在业务分析报告里面用到了大量的复杂公式，最后还画了一张非常复杂的技术图，在会议上大家都不好意思反驳他。后来问了业务方，得到的反馈是，整个分析报告用了两个月时间，看似解决了很多技术痛点，但是对业务提升没意义，因为听完不知道怎么去落地。</p><p>在数据分析过程中，有些是避免不了的描述性统计，你要快速解决，切记不要耽误时间。而对于指导性、预测性的分析，最花时间也是价值最大。你一定要利用好有效时间找到价值点，即使这个价值点只有 1 个。请注意：有没有价值不是分析师说了算，而是业务方说了算，有些点很好但暂时无法落地，就先不要管它。</p><p>中观能力能体现分析师的专业度，基本上就是多沉淀、多思考、多反馈、多总结。</p><h3 id="微观能力" tabindex="-1">微观能力 <a class="header-anchor" href="#微观能力" aria-label="Permalink to &quot;微观能力&quot;">​</a></h3><p>我们先看下微观能力的背景。</p><p>在中观能力相同的情况下，有些分析师总是表现的比其他分析师更加优秀，比如：</p><ul><li><p>针对某个问题，总是能产生很多想法，找到切入点------很有想象力；</p></li><li><p>业务方如果遇到问题就会优先找他，而他总是能在最短的时间内给业务方一个较好的答复------有解决问题的能力；</p></li><li><p>对于数据有更好的敏感度，能够第一个发现数据问题并给出解法------敏感度高；</p></li><li><p>会议上，总是能提出自己的独到观点，让别人觉得他很聪明------快速发现提问；</p></li><li><p>总是能很好的知道业务在干啥，而他的视角又一直是高于业务，所有人都认可------有高维视角。</p></li></ul><p>这些都是分析师微观能力的表现，始于经验，终于沉淀，注重点点滴滴，思维高度活跃，总是能找到一些线索。微观能力是反映分析师平时的微观体感怎么样，作为一名分析师，你必须能发现很多业务方发现不到的点，然后从数据上给出策略建议。</p><p>具体怎么样做到这一点呢？</p><p>首先要知道业务是怎么想的，怎么做的，然后从中发现问题或者切入点，具体来说就是有效沟通能力和快速发散、收敛能力。</p><ol><li><p>有效沟通能力：指在与业务方核心人员沟通时，要从谈话中快速捕捉到有用信息（说者无心听者有意）。</p></li><li><p>快速发散、收敛能力：收敛能力基于沟通中的有效信息，快速提炼总结找到最好的分析切入点。</p></li></ol><p>所谓的好奇心或者说想象力，都不是凭空产生的。回归到数据分析本质，只有和相关业务方多沟通，从他们那里获取有效信息，再自身提炼加工（多学习、思考），才是可落地的&quot;天马行空&quot;。这就是优秀分析师厉害的地方（快速捕捉、提炼、找到问题、解决问题）。</p><h4 id="_1-有效沟通能力" tabindex="-1">（1）有效沟通能力 <a class="header-anchor" href="#_1-有效沟通能力" aria-label="Permalink to &quot;（1）有效沟通能力&quot;">​</a></h4><p>有效沟通能力有两个技巧。</p><ul><li><strong>技巧 1：黄金思维圈法则</strong></li></ul><p>在了解业务的情况下，反问业务方为何要做这件事，基本上，业务方都会有一个很具体的回答，往往都能在这里找到切入点。</p><p>举例：顺丰科技最近在做一个类似锦鲤的活动，业务方要分析师给出活动带来的新增用户数。</p><p>这个时候分析师要先体验下这个活动，并且让业务方介绍下活动，同时要问业务方为何要这个数。</p><p>熟悉这些之后，发现这个活动本身没有特别的拉新点，活动本质是促进老用户活跃。所以建议业务对促活进行深入分析，一旦这样就已经高于业务视角了。</p><p>多问为何要做这件事，往往就能找到问题的本质，解法自然就多。</p><ul><li><strong>技巧 2：做一些准备工作再沟通</strong></li></ul><p>在与业务沟通中，如果没有提前准备一些业务知识和数据，整个过程就是业务在主导，你还怎么发现问题呢？</p><p>举例：爱奇艺 App 最近新上线了某功能，业务方拉各方参加会议，讨论下这个功能下一步的玩法。</p><p>实际工作中，分析师都不一定知道会议主题，或者知道主题没有思考就去参加会议。可想而知整个讨论，只能了解一些基础信息外，无法获得有效信息。会议是一个很好的公共场合，也是分析师证明自己独特视角的地方，所以沟通前一定做好准备，这样不仅没有浪费会议时间，还能让别人觉得你很厉害。</p><h4 id="_2-快速发散、收敛能力" tabindex="-1">（2）快速发散、收敛能力 <a class="header-anchor" href="#_2-快速发散、收敛能力" aria-label="Permalink to &quot;（2）快速发散、收敛能力&quot;">​</a></h4><p>发散：指对于某一个全新业务问题，跟业务沟通之后，分析师想法很多。</p><p>收敛：在众多想法中，快速找到当前做哪个比较实际、合理，并且知道如何做的深入。</p><p>举例：在制定公司级 KPI 的时候，业务分析师需要预估下一年，年中的 MAU 和 DAU 。</p><p>该问题有多种解法：时间序列、行业环境、渠道分析都可以作为切入点。最终觉得渠道分析切入点会更加合理。</p><p>MAU = MAU 新用户+ MAU 老用户</p><p>MAU 新用户=明年渠道侧每个月能够带来的新增量多少（这个与明年预算高度相关）</p><p>MAU 老用户=MAU 上月新次月老（基于渠道）+MAU 上月老次月老（历史数据）+MAU 回流（历史数据）</p><ul><li><p>新次月老：上月新增用户次月老用户</p></li><li><p>老次月老：上月老用户次月老用户</p></li></ul><p>其实渠道这个切入点是分析师从市场部无意捕获到的，后来提炼了下，觉得非常合理。对于全新问题，没有固定答案，分析师需要做的就是快速给出一个有依据的解法即可。</p><p>这就是快速发散收敛能力的培养，总结一下：</p><ol><li><p>要尽可能多地和业务方核心人员，特别是业务 Leader 沟通，有些业务 Leader 非常优秀，看他们是如何思考理解业务的；</p></li><li><p>多看一些心理学、社交学、经济学、记忆力类、科普类的书籍，这些书籍对你微观能力的培养非常有好处；</p></li><li><p>刻意练习，慢慢地养成习惯，一定要把心静下来去做事情，相信自己一定能够把微观能力培养好。</p></li></ol><h3 id="宏观能力" tabindex="-1">宏观能力 <a class="header-anchor" href="#宏观能力" aria-label="Permalink to &quot;宏观能力&quot;">​</a></h3><p>宏观能力是指能够把当前业务与实际社会热点、行业风口联系起来，提前预判，获得更好的决策。宏观能力非常难，如果做好了，基本就是顶级 CEO 了，大部分同学都还没机会接触到这一层面，因为它需要你有一定的决策权。</p><p>比如互联网金融监管政策的加强，对平台型理财公司是一种灾难级的影响，优秀的分析师总是会去定期观察政府行业的动态，提前预判一些敏感信息。而这种敏感度只有多看新闻联播和财经类的节目才能慢慢培养好。</p><p>我们看一下网信办跟资讯类 App 这样的社会热点事件，跟业务高度相关的时间序列，如下图所示：</p>',67),s=p('<p>（网信办与资讯类 App 的时间序列）</p><p>2017 年 10 月 26 日，网信办（负责互联网信息服务管理）召开宣贯十九大大会，宣贯十九大精神。一周之后，网信办深入互联网企业，向京东、百度进行企业调研。一个多月之后，网信办整改今日头条，部分频道下线，今日头条用户流失严重。如果当时头条有一些敏感性，在事件发生的一个月之前就应该认识到问题，做一些补救措施应该还没这么严重。</p><p>作为今日头条的竞品------UC 浏览器，同样没有认识到问题的严重性，或者说心存侥幸。2018 年 2 月 1 日，广东网信办整改 UC ，那段时期 UC 的用户流失非常严重。这就可以看出宏观热点事件对业务影响巨大，所以优秀的分析师一定要保持这种高度的敏感性。</p><h3 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h3><p>今天的课程就是讲解中观、微观、宏观能力。</p><ul><li><p>中观能力在公司都会学习一些，只要获得一些反馈再优化即可。</p></li><li><p>微观能力特别注重平时的微观体感，所以分析时一定要有静下来的决心，注重套路的真实落地过程，从不同的业务方捕捉、提炼、沉淀，这是一个长期的训练。</p></li><li><p>对于宏观，你需要关注行业内的动态，像新闻联播、财经类节目都是重要的数据源。</p></li></ul><p>另外多说一句，公司的 CEO 其实是顶级数据分析师这个角色，所以分析师这个天花板非常高，发展空间也非常大。</p>',7);function h(d,c,u,A,m,b){const a=i("Image");return e(),t("div",null,[n,o(a,{alt:"image",src:"https://s0.lgstatic.com/i/image/M00/1F/AA/CgqCHl7nI-qAIv6KAAGb4IyT8dE827.png"}),r(),s])}const f=l(_,[["render",h]]);export{P as __pageData,f as default};
