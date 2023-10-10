import{_ as o,j as s,o as e,g as _,k as l,h as a,Q as i,s as p}from"./chunks/framework.cfb14fe0.js";const D=JSON.parse('{"title":"08游戏：游戏行业的ROI和付费率是怎么算的？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/数据分析思维与实战_文档/(3499) 08  游戏：游戏行业的 ROI 和付费率是怎么算的？.md","filePath":"posts/backEnd/数据分析思维与实战_文档/(3499) 08  游戏：游戏行业的 ROI 和付费率是怎么算的？.md","lastUpdated":1696682708000}'),n={name:"posts/backEnd/数据分析思维与实战_文档/(3499) 08  游戏：游戏行业的 ROI 和付费率是怎么算的？.md"},r=i('<h1 id="_08游戏-游戏行业的roi和付费率是怎么算的" tabindex="-1">08游戏：游戏行业的ROI和付费率是怎么算的？ <a class="header-anchor" href="#_08游戏-游戏行业的roi和付费率是怎么算的" aria-label="Permalink to &quot;08游戏：游戏行业的ROI和付费率是怎么算的？&quot;">​</a></h1><p>今天我以欢乐斗地主游戏为例介绍一下游戏行业的数据分析。</p><p>本节课内容分为四部分：</p><ul><li><p>背景；</p></li><li><p>指标口径；</p></li><li><p>用户流失分析；</p></li><li><p>用户付费分析。</p></li></ul><h3 id="背景" tabindex="-1">背景 <a class="header-anchor" href="#背景" aria-label="Permalink to &quot;背景&quot;">​</a></h3><p>在前面两课时，我介绍了互联网和金融的数据思维，其实游戏行业兼具互联网与金融数据思维。我之前体验了狼人杀和欢乐斗地主两款 App，因为个人抵抗力比较差，每天都玩到很晚，对我的工作和生活都有一定影响，最后决定把它们删了，不玩了。所以游戏行业用户两极分化比较严重：要么快速流失，要么玩的时间就很长。</p><p>因此本节课重点围绕两个目标：</p><ul><li><p>尽量让用户晚点流失------流失分析</p></li><li><p>让花时间的用户多变现------商业分析</p></li></ul><p>我们先来看看欢乐斗地主 App 的界面，如下图所示。</p>',9),c=p("p",null,'在上图界面的右侧，有经典、排位、残局、比赛的坑位，点进去之后是对应玩法。最右下角的有一个"商城" button （小人推着小推车），点击进去之后如下图所示。',-1),g=i('<p>这是欢乐斗地主 App 最重要的界面，后面的讲解我会围绕这些图片来展开。</p><h3 id="指标口径" tabindex="-1">指标口径 <a class="header-anchor" href="#指标口径" aria-label="Permalink to &quot;指标口径&quot;">​</a></h3><p>第二个模块是指标口径，指标口径包括常规指标和商业化指标。</p><h4 id="常规指标" tabindex="-1">常规指标 <a class="header-anchor" href="#常规指标" aria-label="Permalink to &quot;常规指标&quot;">​</a></h4><p>常规指标包含四类：</p><p>1、 <strong>DAU、WAU、MAU</strong></p><p>DAU、WAU、MAU 分别指产品的日活、周活以及月活。对于任何产品，首先要看用户规模，用户规模是一个亿还是五千万，要有具体的数值。</p><p>2、 <strong>留存率</strong></p><p>留存率一般是看次留、7 留、30 留存率。留存率是一个比例，反映产品的联系程度。以次留率为例，次留率等于第一天打开欢乐斗地主并且第二天也打开欢乐斗地主的人数除以第一天打开欢乐斗地主的人数。</p><p>比如，第一天打开欢乐斗地主 App 的有 1000 人，第二天这 1000 人里面又有 800人打开了App，那么它的次留率为：800/1000*100=80%。</p><p>3、 <strong>渗透率</strong></p><p>每个产品都有很多子功能，每个子功能的渗透率等于该模块的使用人数除以该产品的日活。</p><p>比如，欢乐斗地主 App 的昨日 DAU 为 1000 人，昨日有 900 人点击&quot;商城&quot;。</p><p>那么&quot;商城&quot;渗透率为： 900 / 1000*100=90%。</p><p>4、 <strong>转化率</strong></p><p>转化率针对某个连贯路径。它等于使用下一个节点的用户数除以使用上一个节点的用户数。</p><p>比如，欢乐斗地主打开APP（1000 人）--- 进入房间（800 人）--- 参加比赛（700 人）。</p><ul><li><p>进入房间的转化率=800/1000*100=80%</p></li><li><p>参加比赛转化率=700/800*100=87.5%</p></li></ul><h4 id="商业化指标" tabindex="-1">商业化指标 <a class="header-anchor" href="#商业化指标" aria-label="Permalink to &quot;商业化指标&quot;">​</a></h4><p>商业化指标有三个概念。</p><p>1、 <strong>ARPU：代表一个时间段内的用户平均收入</strong></p><p>ARPU= 付费金额 / 活跃人数</p><p>比如，欢乐斗地主付费总金额 200w，活跃人数 100w，用户平均收入 2元。</p><p>2、 <strong>CPM、CPC</strong></p><p>CPM 是千次曝光的成本。</p><p>CPM=（广告投入总额 / 所投广告的展示数）*1000</p><p>比如，某广告主在欢乐斗地主的闪屏界面投入一个广告 10w，共展示 1000w 次，那么 CPM=10。</p><p>CPC 是每个点击用户的成本。</p><p>CPC= 广告投入总额 / 所投广告带来的点击用户数</p><p>比如，某广告主在欢乐斗地主里面投了一个闪屏广告 100w，共产生点击 50w，那么 CPC=2。</p><p>3、 <strong>ROI：代表投资回报率</strong></p><p>ROI= 收入 / 支出= ARPU*用户 数/ 所有支出</p><p>比如，双 11 在欢乐斗地主内部投放一个广告100w，最终带来收入200w，那么 ROI=2。</p><h3 id="用户流失分析" tabindex="-1">用户流失分析 <a class="header-anchor" href="#用户流失分析" aria-label="Permalink to &quot;用户流失分析&quot;">​</a></h3><p>第三个模块是用户的流失分析，行业内把一个月内不使用产品的用户定义为流失用户。实际上，不同产品形态的用户行为差异非常大，像住宿类 App 是低频高价值用户，而欢乐斗地主 7 天不上线可能就已经流失，所以要合理定义流失用户。对于流失用户，发现的越早越好，在这里会出现不太好定义用户流失的情况，比如你先定义 30 天用户不来即为流失，结果到 30 天的时候，大量用户回流。</p><p>如何合理定义流失用户，我们可以参考用户流失的周期，本质上等于回流率的确定，一旦用户回流率稳定，就可以定义这个时间段的天数为用户流失周期。</p><p><strong>用户回流率 = 回流用户数 / 流失用户数 = 某个周期内的流失用户数在周期结束后又回来了 / 某个周期内的流失用户数</strong></p><p>所以，根据这个公式按照枚举法，周期天数 = 1,2,...,30，然后分别计算回流率，一旦回流率趋于收敛，该周期就是流失周期。</p><p>比如，我定义 1 天不来就为流失，然后按照公式会得出一个回流率数值，然后我再定义 2 天不来就为流失，又得出一个回流率数值。以此类推，到 60 天就会有 60 个回流率数值，这些回流率对应的 60 个点就可以画出一条曲线。这条曲线在什么时间段趋于平缓，那这个周期就是一个合理的流失周期。</p><p>举个例子，假设欢乐斗地主 App 它的流失数据，如下图所示。</p>',40),h=p("p",null,"我们根据以上数据用周期和回流率来画一条曲线，如下图所示。",-1),A=p("p",null,"由上图曲线可知，在第 7 天（ 0.05 水位线）回流率趋于稳定，所以可以把 7 天定义为流失周期。假如用户 7 天不上线即定义为流失用户，这样就会有很大说服力。",-1),d=p("p",null,"流失周期确定后，我们要进行用户的流失分析，对于游戏行业的用户流失分析，即有其他行业的类似套路，也有一些差异点。",-1),u=p("ul",null,[p("li",null,[p("strong",null,"类似套路：看用户在流失前最后一步干了什么，是什么导致用户体验差而流失。")])],-1),m=p("p",null,"以欢乐斗地主为例，用户最后一步行为类型，如下图所示。",-1),q=i('<p>由上图可知，这里有 40% 用户是在比赛房间里流失，有 30% 用户是在做任务时流失，有 20% 用户是在商城里流失，还有 40% 是其他原因。最后一步行为到退出游戏的一个时长有多少秒呢，有 10s、30s 、20s、 5s，基于这些数据我们来分析一下。</p><p>在比赛房间用户流失最严重，然后对比赛房间进行拆解，看看到底是哪个行为占比很高。是在经典模式还是在残局模式，还是在正式的比赛过程中，然后进一步往下拆解。</p><p>对于在任务中的流失，可以看出用户做任务时花了 30s，然后就退出了游戏。这个时间是不是太长，在这个过程中用户是不是遇到什么困惑？</p><p>同样对于商城花了 20s，用户在商城里面基本上就是买东西，这里要看用户到底是纠结价格还是其他。你可以基于以上数据进行猜测，然后通过其他数据来验证。</p><p>这就是类似套路方法，我们再看下差异点方法。</p><ul><li><strong>差异点：作为一款非常复杂，需要花用户大量时间的 App，数据分析师要想研究好用户为何流失，也必须要去很深入<strong><strong>地</strong></strong>玩游戏，找到游戏中的快感和痛点，跟其他玩家多交流，否则就是脱离业务。</strong></li></ul><p>经过多轮的游戏体验和玩家交流，发现以下几个问题比较严重：</p><ol><li><p>每天就送 2 次 3000 欢乐豆，基本上几分钟就输完了，没有找到游戏的兴奋点以及赢的快感，所以用户觉得没意思；</p></li><li><p>一旦欢乐豆积累很多之后，输的会非常快，让人很气愤；</p></li><li><p>感觉作弊机制比较严重，有合伙坑人的可能性；</p></li><li><p>任务越来越多，越来越看不懂。可以直接换欢乐豆的活动越来越少，头衔玩法好鸡肋；</p></li><li><p>商城内的欢乐豆好贵，没有 1 元试用。</p></li></ol><p>所以对于游戏分析（特别是网游），要结合游戏深入体验和初步数据一起分析，才能有明显效果。</p><h3 id="用户付费分析" tabindex="-1">用户付费分析 <a class="header-anchor" href="#用户付费分析" aria-label="Permalink to &quot;用户付费分析&quot;">​</a></h3><p>第四模块是用户付费分析，因为游戏行业前期投入较大，本身迭代比较快，所以对付费变现有非常高的要求。</p><p>在付费分析上，整体思路如下：</p><ol><li><p>以付费金额分布和付费模块为切入点；</p></li><li><p>根据 1 确定未来重点是在高、中、低哪个群体；</p></li><li><p>进行 A/B 测试，并每天看收入情况。</p></li></ol><p>欢乐斗地主的付费分布有三张饼图，如下图所示。</p>',14),C=p("p",null,"第一张图是用户付费金额的分布占比，我们发现大部分用户都是愿意付 3元、10元 ，这部分用户占比 90% 。",-1),P=p("p",null,'第二张图是付费等级的分布，我们发现当用户在"短工""长工""细户"等级时变化都不明显，但是到"贫农"等级时立马上升到了 9%，这代表用户在"贫农"这个等级的付费意愿非常关键。下一个节点是"富农"等级，占比为 22%，从 11% 的"中农"直接跳到22%的"富农"，这代表"富农"又是另外一个节点。',-1),T=p("p",null,"第三张图是付费模块的分布，欢乐斗地主的商城有各种付费方式，而这里面最主要的是以欢乐豆为主，占比为 70%，而钻石却只有 25%，其他占比就更少。",-1),I=p("p",null,"基于这样一个数据，我们可以做出哪些分析？",-1),b=p("p",null,"这里为何没有 5 元的付费金额？商城界面如下图左侧所示。第一个坑位是 36000 豆，30 个钻石，也就是 3 元。然后我点击第二个坑位 75600 豆（60钻石）后，你可以看到它提示钻石不足，如下图右侧所示：",-1),f=i('<p>提示是否用 10 元充值 100 钻石，充值成功后自动购买 75600 豆。而对于上图左侧的第三个坑位 132000 豆，我点击后提示也一样。这代表第二个坑位，它本身是一个人为的 bug，因为这会导致用户肯定买第三个而不会去买第二个。因为第二个坑位 10 元只能充 75600 豆，第三个坑位可以用 10 元充 132000 豆。</p><p>在上图左侧中，明显没有 5 元付费的坑位。再看界面，这里有 8 个坑位的位置但只用了 7 个坑位，明显严重浪费一个坑位。这里可以加一个 5 元的付费坑位，不要小看一个坑位，每个坑位都会产生点击及付费转化。</p><p>总的来说欢乐斗地主 App 无论是信息还是坑位都出现较大问题，只能说产品功能没有体验到位，主要表现在以下几个方面：</p><ol><li><p>当前用户付费金额以 3元、10元为主，超过10元比较敏感；</p></li><li><p>&quot;贫农&quot;和&quot;富农&quot;是两个重要付费等级节点；</p></li><li><p>商城以欢乐豆充值为主，钻石不多。</p></li></ol><p>针对用户群及 App 问题，我们可以做出以下猜想分析：</p><ol><li><p>直接结论：当前 App 的用户群对钱很敏感，高端用户并不多，并且高端群体整体价值也不大。</p></li><li><p>数据结论：在未付费用户中，必然存在一部分群体欢乐豆少于 3000 无法游戏，同时也去了商城查看，但未消费，所以这部分用户需要想办法转化进来。</p></li><li><p>体验结论：玩游戏都是有兴奋点的，兴奋点是多久，用户在什么级别时最想充值？</p></li></ol><p>因此结合 1、2、3，是否可以做出以下优化。</p><ul><li><p>推出 0.99 元 15000 欢乐豆，限额卡片。同时在首页界面提示充值 9.5 折，进一步让用户觉得有便宜可占。</p></li><li><p>对于日活中少欢乐豆的用户，可以多送几次欢乐豆，让他体验时长久一点，先兴奋起来。</p></li><li><p>当用户在&quot;贫农&quot;和&quot;富农&quot;等级左右时，加强付费引导，满足其成就感。</p></li></ul><h3 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h3><p>总结下今天的课程，游戏行业非常注重收入，数据分析师需要每天看收入数据，所做的各种分析都要和收入挂钩。除了互联网的分析方法，游戏行业更加注重分析师的深度体验，单纯的数据只能解决交互式的失误，而不能让游戏变得更好玩，所以分析师最大的价值是让用户玩得更爽，只有到这一步，才能实现真正的增长。</p><p>今天的课程就到这里，如果你有问题可以在下方留言，同时欢迎你关注我本人的公众号（微信搜索：数据分析学习之道），之后会定期更新原创高质量的数据分析文章。</p>',11);function k(R,S,E,U,O,w){const t=s("Image");return e(),_("div",null,[r,l(t,{alt:"image (20).png",src:"https://s0.lgstatic.com/i/image/M00/26/E5/CgqCHl7zFCGAPsLlAAwP20q7LAA433.png"}),a(),c,l(t,{alt:"image (21).png",src:"https://s0.lgstatic.com/i/image/M00/26/D9/Ciqc1F7zFCqAR8xIAAk2ChLwL7c187.png"}),a(),g,l(t,{alt:"image (22).png",src:"https://s0.lgstatic.com/i/image/M00/26/DA/Ciqc1F7zFNGAf3U1AAEfk-2FI8s038.png"}),a(),h,l(t,{alt:"image (23).png",src:"https://s0.lgstatic.com/i/image/M00/26/DA/Ciqc1F7zFNmAEid3AABQLU4XgwQ188.png"}),a(),A,d,u,m,l(t,{alt:"image (24).png",src:"https://s0.lgstatic.com/i/image/M00/26/E5/CgqCHl7zFOSALkmYAADO5UHj4LI110.png"}),a(),q,l(t,{alt:"image (25).png",src:"https://s0.lgstatic.com/i/image/M00/26/E5/CgqCHl7zFPeASXyIAAC2WEDCSOw710.png"}),a(),C,P,T,I,b,l(t,{alt:"image (26).png",src:"https://s0.lgstatic.com/i/image/M00/26/E5/CgqCHl7zFQGAUckwAAa63X1cdN4661.png"}),a(),f])}const M=o(n,[["render",k]]);export{D as __pageData,M as default};
