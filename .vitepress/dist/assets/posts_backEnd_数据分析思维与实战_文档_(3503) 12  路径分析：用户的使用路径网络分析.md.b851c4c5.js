import{_ as t,o,g as u,Q as q}from"./chunks/framework.f949202b.js";const m=JSON.parse('{"title":"路径分析定义 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/数据分析思维与实战_文档/(3503) 12  路径分析：用户的使用路径网络分析.md","filePath":"posts/backEnd/数据分析思维与实战_文档/(3503) 12  路径分析：用户的使用路径网络分析.md","lastUpdated":null}'),p={name:"posts/backEnd/数据分析思维与实战_文档/(3503) 12  路径分析：用户的使用路径网络分析.md"},a=q('<p>今天我主要讲解路径分析。</p><p>本课时内容分为三部分：</p><ul><li><p>路径分析定义；</p></li><li><p>路径分析案例------以美团 APP 为例；</p></li><li><p>路径分析思考。</p></li></ul><h3 id="路径分析定义" tabindex="-1">路径分析定义 <a class="header-anchor" href="#路径分析定义" aria-label="Permalink to &quot;路径分析定义&quot;">​</a></h3><p>我们在讲前面的案例中多次提到了漏斗模型，漏斗模型是非常经典的一种分析方法，但所有的漏斗都是人为假设的，也就是事前假设一条关键路径，事后看关键路径的转化数据。</p><p>随着各类 APP 的功能模块、坑位越来越多，用户的行为越来越分散化，比如很多 APP 不止有一个核心功能，可能有若干个核心功能。这个时候就要在用户的所有操作行为中，发现一些产品设计之初可能不知道、但非常有意思的用户前后行为，这就是路径分析。也就是说，路径分析是基于数据本身发现的，产品可能不太清楚，但是符合用户习惯的路径。</p><ul><li><p><strong>漏斗分析</strong> ：人为设定一条或者若干条漏斗。<strong>先有假设再数据验证</strong>。</p></li><li><p><strong>路径分析</strong> ：基于用户的所有行为，去挖掘出若干条重要的用户路径，通过优化界面交互让产品用起来更加流畅和符合用户习惯，产生更多价值。<strong>先有数据再验证假设</strong>。跟漏斗分析刚好相反。</p></li></ul><p>我们举个例子。</p><p><img src="https://s0.lgstatic.com/i/image/M00/2F/ED/CgqCHl8ID2-ACLGmAAQq7kaVfm4954.png" alt="Drawing 0.png"></p><p>比如对于美团 APP 来说，我们发现它有很多功能，比如&quot;搜索&quot;&quot;美食&quot;&quot;电影演出&quot;&quot;酒店住宿&quot;&quot;休闲娱乐&quot;&quot;外卖&quot;这 5 个 tab，下面还有&quot;家居&quot;等。然后下面有 4 个小模块：&quot;很优惠&quot;&quot;有格调&quot;&quot;秒杀&quot;&quot;周末去哪儿&quot;，再往下翻是&quot;猜你喜欢&quot;，也就是个人推荐，而在底部 button 有&quot;附近&quot;&quot;发现&quot;&quot;订单&quot;&quot;我的&quot;，各个 button 里面又有很多子模块。</p><p>基本上目前市面上大多数 APP 都是这种多坑位，把能做的都做了。在这种情况下，漏斗分析确实完全满足不了日常分析需求，因为漏斗分析相对来说都是人为事先假定的，而且内容比较符合大众认知的习惯，这个时候就要路径分析派上用场了。</p><p>这就是路径分析的背景。</p><h3 id="路径分析过程" tabindex="-1">路径分析过程 <a class="header-anchor" href="#路径分析过程" aria-label="Permalink to &quot;路径分析过程&quot;">​</a></h3><p>那么我们对路径分析的过程进行一个详细的说明。大家在听第二小模块的时候，一定要把美团 APP 多体验几次，后面会涉及大量的界面交互和路径使用，所以各个模块都要认真看几遍。</p><h4 id="日志介绍" tabindex="-1">日志介绍 <a class="header-anchor" href="#日志介绍" aria-label="Permalink to &quot;日志介绍&quot;">​</a></h4><p>我们先说一下日志，因为路径分析实际上都是基于底层日志来做，有些同学可能没有看过公司本身的日志，用户在端内（ APP 内），所有的行为都是以表或者文件存储的，其中记录了用户最详细的行为信息，这就是日志。比如，你打开 APP，实际上在日志里面是有一条记录的，一般都是一行，格式如下图所示：</p><p><img src="https://s0.lgstatic.com/i/image/M00/2F/E2/Ciqc1F8ID3yAEM26AABOB3M97vg824.png" alt="Drawing 1.png"></p><p>首先，对于日志我们怎么看？我们看到中间行与行之间是分段的，这个分段就代表每一条记录。这个日志首先是 Key-Value 格式，就以第一条记录来说，imei 和 ip 中间是以逗号分隔，每一条记录与记录间是行的分割。然后有哪些字段呢？我们有用户的设备号 imei、IP、内存、分辨率、机型、系统，event 和 active 事件、版本、子版本、操作时间 Unix time。</p><p>所以对于分析师来说，要知道自己公司本身底层日志是以什么格式来存储的，不一定是 Key-Value 格式，这块操作更多偏 Linux 命令，基本上分析师都会一些基本的命令，比如查今天的日志大小或者日志的一些字段，那么在这块查一下就行了。如果一个分析师每天大部分时间跟这种底层日志打交道，那一定是有问题的，因为这一块相对比较独立，更多的时候是数据研发工程师或者后台研发本身就应该做的事情。</p><h4 id="日志分析步骤" tabindex="-1">日志分析步骤 <a class="header-anchor" href="#日志分析步骤" aria-label="Permalink to &quot;日志分析步骤&quot;">​</a></h4><p>当我们熟悉了日志的字段以及格式之后，就可以进行路径分析了，因为路径分析本身就是啃日志。路径分析一共分为四个步骤：</p><ol><li><p><strong>筛选</strong> 。第一步是对所有功能用户的量级进行查看，<strong>筛选</strong>出重要功能，因为当前 APP 可能有 100 个子功能，那么到底要看哪些呢？这个时候就要用用户量级来评判了，首先选出这样的功能，找到切入点。</p></li><li><p><strong>日志关联（抽样）</strong> 。第二步，就是对筛选出的功能进行时间序列的<strong>排序</strong> ，比如对于一个用户来说，一天可能有 10 个重要功能，那这 10 个重要功能的先后顺序是什么样子？你要先排序，既然是路径分析，肯定有先后，排完序之后就是日志与日志之间的功能数据的匹配，比如用了 A 功能之后有多少用户用了功能 B？这个就是同一份日志相互间匹配，但是一定是先排序好。然后就是<strong>关联</strong>，对于所有的路径分析，日志关联都是抽样，因为公司的日志可能非常大，如果要做这一步关联，资源是跟不上的，所以抽样就可以了，基本上抽 10 万、 20 万数据就可以。</p></li><li><p><strong>标准化及画图</strong>。第三步就是数据的标准化以及路径画图，因为第二步是相对绝对的数据，比如使用功能 A 的用户是 100 万，然后这 100 万里面有 80 万用了功能 B，实际上还是这种绝对量级的数据，而第三步是让第二步更加可视化以及标准化。</p></li><li><p><strong>启发</strong>。第四步就是在第三步的基础之上，看有没有比较有启发性的路径，大部分公司做路径分析都要从第一步开始，一步一步来做。但是有一些公司在技术层面一二三步已经帮你搞定了，就是底层研发把一二三都已经做了，然后分析师相对来说要轻松，看第四步就可以了，这就比较好。</p></li></ol><p>整个过程不是特别难，但是非常考验耐心，大家可以这样理解，就是你沉浸在日志当中，然后去干各种各样的行为。我们举例子来说，这样比较生动。</p><h5 id="_1-筛选" tabindex="-1">1. 筛选 <a class="header-anchor" href="#_1-筛选" aria-label="Permalink to &quot;1. 筛选&quot;">​</a></h5><p>第一步筛选，对于美团 APP，假设它的主要功能以及功能渗透率的数据如下表所示：</p><p><img src="https://s0.lgstatic.com/i/image/M00/2F/EE/CgqCHl8ID52AEz8MAABcsO2BtOI457.png" alt="Drawing 2.png"></p><p>我们通过这些功能渗透率就发现，&quot;美食&quot;&quot;外卖&quot;&quot;搜索&quot;是三个最大的功能，因为它们的渗透率都很高，达 30% 以上；&quot;电影&quot;和&quot;酒店&quot;这两个重大的 tab 渗透率并不高，也就是表现不是很好；而&quot;周边游/旅游&quot;以及&quot;景点/门票&quot;这两个 tab 位置不是特别好，但表现比较好；而底部的&quot;附近&quot; button 只有 18% 的渗透率，&quot;发现&quot;是 3%，&quot;订单&quot;是 20%，&quot;我的&quot;是 8%。在此基础上，我们就可以进一步筛选出要分析的功能。</p><p><strong>筛选结论：</strong></p><ol><li><p>&quot;美食&quot;&quot;外卖&quot;&quot;搜索&quot;三大功能：需要进一步看之后用户路径，这里就以美食为例；</p></li><li><p>&quot;附近&quot;作为底部第二 button，存在什么问题？可以如何进一步优化？它的渗透率只有 18%，比订单还低；</p></li><li><p>&quot;发现&quot;作为底部第三 button，用户感知度太弱，如何定位该功能价值？我们丝毫不怀疑可能产品想往内容这一块转，但是当前发现的渗透率只有 3%；</p></li><li><p>&quot;订单&quot;功能作为底部第四 button，渗透率竟然有 20%，表现很好，用户进来后干什么？如何进一步优化？</p></li><li><p>&quot;我的&quot;作为底部第五 button，有 8% 的渗透率，我们比较好奇用户进去后干啥。</p></li></ol><p>所以先要找到切入点。</p><p>第一步是找到所有重要功能，然后在这个基础之上，发现有没有一些点比较有意思，找到切入点。本课时后面是以 1/2/4 这三块一个一个展开，其他的大家可以类似地去发散联想具体怎么做就可以了。</p><h5 id="_2-数据进一步关联及标准化" tabindex="-1">2. 数据进一步关联及标准化 <a class="header-anchor" href="#_2-数据进一步关联及标准化" aria-label="Permalink to &quot;2. 数据进一步关联及标准化&quot;">​</a></h5><p>第二步就是数据进一步关联及标准化。刚刚说了，我们会对&quot;美食&quot;&quot;订单&quot;以及&quot;附近&quot;这三个功能进行查看。</p><p><strong>美食</strong></p><p>我们先看&quot;美食&quot;，假设&quot;美食&quot;的原始数据如下表：</p><p><img src="https://s0.lgstatic.com/i/image/M00/2F/EE/CgqCHl8ID7aAdtBpAABoMS-6lmQ235.png" alt="Drawing 4.png"></p><p>这个表格怎么看？首先第一列就是&quot;美食&quot;功能每天的用户数，都是 100 万，&quot;美食&quot;界面如下：</p><p><img src="https://s0.lgstatic.com/i/image/M00/2F/EE/CgqCHl8ID72AGR97AAPfpbHNhGY756.png" alt="Drawing 6.png"></p><p>它是一个很重要的功能，进来之后用户有各种各样的路径，然后我们按照时序来排列，这个 1,2,3,4,5,6 假设是按照先后顺序。</p><p>100 万人当中有 80 万去了&quot;离我最近&quot;。这个&quot;离我最近&quot;是在智能排序这里，进行手动切换之后就是&quot;离我最近&quot;，也就是说有 80 万用户进来之后直接点了&quot;离我最近&quot;。进去之后有 75 万用户进入详情页，比如点这个&quot;百果园&quot;，直接进去的有 75 万，然后 75 万里面有 40 万用户又返回到&quot;离我最近&quot;这个界面，也就是说用户逛了一会儿之后回退。然后 40 万里面又有 30 万用户再进入另外一个详情页，最终这 30 万里面有 20 万下单。这是第一个路径，就是 100 万的美食用户有 80 万用户是走这样一个路径。</p><p>同时第二个路径是 100 万里面有 30 万进入&quot;优惠团购&quot;这里，&quot;优惠团购&quot;里面又是一个界面，然后有 25 万人用了上面的搜索功能，实际上比较奇怪，因为&quot;优惠团购&quot;的界面已经有比较多的商品可以选购了，但是用户用了搜索，然后 25 万的搜索里面又有 20 万的用户进入详情页，然后 20 万里面有 18 万进行下单。这是第二个用户路径。</p><p>第三个用户路径就是 100 万用户里面有只有 5 万用户进入&quot;外卖&quot;，也就是说&quot;外卖&quot;放在美食里面这样一个位置，它的渗透率并不是很高。</p><p>第四个就是&quot;限时秒杀&quot;这一块，100 万用户有 30 万用户进入到这里面，而 30 万用户里面有 28 万点击详情页，跟第一个路径比较像，又进行了回退，进入另外一个详情页再下单，也就是说用户有返回的操作。</p><p>这个就是原始数据，就是对底层日志进行时序排列，然后日志与日志之间相互匹配，之后就是这样一份数据，这样一份 excel 表格。</p><p>那么在这个关联数据的基础之上进行标准化以及画图：</p><p><img src="https://s0.lgstatic.com/i/image/M00/2F/EE/CgqCHl8ID8uAI6eAAACcp_VJkwg406.png" alt="Drawing 7.png"></p><p>真实的过程中，大家不一定要按照这样来画，我这里只是为了说明问题。比如&quot;美食&quot;，这里面 80% 是到&quot;离我最近&quot;，30% 到&quot;优惠团购&quot;，5% 到&quot;外卖&quot;，30% 到&quot;秒杀&quot;，就是上面的转化率，同样的后面每一步都有一个转化率，这个就是这 100 万的美食用户在端内的主要路径。</p><p>当然肯定还有其他路径，比如用户点&quot;夜宵&quot;，但是它的渗透率不是特别高，所以就不说了。这里就是发现一些比较有意思的路径，在这一步，它需要很多的耐心，因为你只能慢慢去看，这个在前期做的时候会非常耽误时间，但是就只能这样，因为所有的人做都是这样的过程，就是你要对业务非常了解。这个是&quot;美食&quot;用户进入&quot;美食&quot;之后的路径。</p><p><strong>附近</strong></p><p>第二步一样，对于&quot;附近&quot;这个模块，用户进来之后，假设他的数据是这样一种形态：</p><p><img src="https://s0.lgstatic.com/i/image/M00/2F/EE/CgqCHl8ID92AIqn8AABU26XAjqQ758.png" alt="Drawing 9.png"></p><p><img src="https://s0.lgstatic.com/i/image/M00/2F/EE/CgqCHl8ID-mAA_HgAAKqZ3SiYxg924.png" alt="Drawing 11.png"></p><p>我们发现，进入&quot;附近&quot;之后，大家看到最大的位置是&quot;享美食&quot;这一块，但是它的用户数只有 10 万，就是都是 50 万用户进来，只有 10 万用户到&quot;享美食&quot;，而&quot;搜索&quot;这一块儿竟然有 30 万，也就是说，更多的用户是通过&quot;搜索&quot;进入另外一个界面，也就是各种各样的店面，然后再进入详情页再下单，是通过这样一条路径来完成的。那么这个是不是就能说明我们当前界面做得并不是特别好？同时对于&quot;享美食&quot;&quot;会生活&quot;&quot;爱玩乐&quot;这三个 tab，理论上它们的点击率相对来说差异比较大，但是数据上面显示，一个 10 万、一个 9 万、一个 8 万，相差并不是很大。那么&quot;享美食&quot;作为最大的曝光界面可能就是出现了比较大的问题，从数据上来看就是这样的一个解释。</p><p><strong>订单</strong></p><p>我们再看一下第三个，就是&quot;订单&quot;。对于&quot;订单&quot;这个功能，首先它的界面是这样：</p><p><img src="https://s0.lgstatic.com/i/image/M00/2F/E3/Ciqc1F8ID_WAYCDNAAJweAjTbbI510.png" alt="Drawing 12.png"></p><p>用户进来之后，上面是&quot;最近订单&quot;的曝光，底部有一个&quot;最近浏览&quot;，就这两块，然后具体数据是：</p><p><img src="https://s0.lgstatic.com/i/image/M00/2F/EE/CgqCHl8ID_6AAiKpAAAk1vz0E80104.png" alt="Drawing 13.png"></p><p>有 50 万的用户进入&quot;订单&quot;这个界面，其中 45 万直接到具体订单详情页，比如 45 万的用户直接点百果园，点进去之后有 40 万直接就退出这个界面了，具体的转化数据就是这个图：</p><p><img src="https://s0.lgstatic.com/i/image/M00/2F/EE/CgqCHl8IEAaAE_ZIAAAdzQcRK7I452.png" alt="Drawing 15.png"></p><p>都是 90%，也就是说，对于&quot;订单&quot;这个界面，用户的目的非常明确，因为 50 万用户进来之后最主要的路径就是这样，其他的都很少。假设数据就是这样，那么我们就要进一步调研，用户进入订单页面目的是什么？如果只是查一查订单，那么我们是不是能在里面做一些相关推荐？&quot;最近浏览&quot;做得太单薄了，而且还是做在外面，实际上用户进入订单详情页之后就直接走了，在最里面就直接走了，而不会返回当前界面。</p><h5 id="_3-基于前面数据-有哪些启发" tabindex="-1">3. 基于前面数据，有哪些启发 <a class="header-anchor" href="#_3-基于前面数据-有哪些启发" aria-label="Permalink to &quot;3. 基于前面数据，有哪些启发&quot;">​</a></h5><p>数据上是这样一个结论，就是围绕一二三，一个是首页的&quot;美食&quot;，一个是&quot;附近&quot;，一个是&quot;订单&quot;，我们有哪些启发呢？因为到第二步实际上只是一个具体的标准化数据以及图，我们有哪些启发？</p><p><img src="https://s0.lgstatic.com/i/image/M00/2F/E3/Ciqc1F8IEBmAZ2VeAACcp_VJkwg984.png" alt="Drawing 17.png"></p><p>首先对于&quot;美食&quot;功能来说，默认的是智能排序，但是 80% 的用户会切换到&quot;离我最近&quot;，这里我的想法是，如果把智能改为综合字眼可能会更好，因为用户对智能可能理解得不是特别深刻，饿了么的精品就是综合排序。同时我们看到，用户第一次进入详情页之后，然后又有用户返回&quot;离我最近&quot;，也就是说用户有一个回退按钮，然后再进入详情页。这里建议在详情页内部增加相关推荐，让用户在里面逛，缩短用户的下单路径，而不要让他回退。</p><p>第二个点就是在&quot;美食&quot;功能中，有 30% 的用户进入&quot;优惠团购&quot;，很明确，这部分用户喜欢占便宜，同时竟然有 83% 用了搜索，因为优惠团购点进去之后，它是一个最大的曝光位置，有很多的店家。但 80% 用户用了搜索，说明当前界面的主动推荐不太准确，需要优化，我们要更好地去揣摩用户的意图。</p><p>同时对于&quot;外卖&quot;这块也一样，外卖放在那个位置不是特别好，可以考虑把它替换掉，可能外卖本身在最外部就有 40% 的流量，而在这里面只有 5%。对于&quot;秒杀&quot;也一样，也有一个回退，那么也可以考虑在详情页里面增加相关推荐。这个就是&quot;美食&quot;功能。</p><p><img src="https://s0.lgstatic.com/i/image/M00/2F/EE/CgqCHl8IECOASNVtAABOsbkmFa0413.png" alt="Drawing 19.png"></p><p>对于&quot;附近&quot;功能，我们发现首先 40% 的用户会回到首页，就是用户进入&quot;附近&quot;这个 button，然后又有 40% 用户立马跳回首页；60% 的用户用搜索，而&quot;享美食&quot;&quot;会生活&quot;&quot;爱玩乐&quot;的渗透率差异不大，&quot;享美食&quot;作为最大曝光界面占比，&quot;附近&quot;整个模块当前问题较大，就是用户进去了，但是你没有很好地满足用户的需求，很多用户就跳出来了，同时你最大的曝光界面没有人点，而是用了搜索为主。</p><p><img src="https://s0.lgstatic.com/i/image/M00/2F/E3/Ciqc1F8IEDGAW36uAAAbNVKLlUA608.png" alt="Drawing 21.png"></p><p>而对于&quot;订单&quot;功能，90% 的用户查看订单后直接退出，可以考虑在订单详情页里面增加更多相关订单内容曝光，当前曝光内容是最近浏览曝光，效果不好，所以要增加用户消费场景。</p><p>那么基于这三个路径，我们就可以做很多事情了。刚刚我们对&quot;美食&quot;&quot;订单&quot;&quot;附近&quot;这三个button做了一些分析，就已经发现了有很多优化点。当我们对其他功能也按照这种方式去分析的时候，就会发现有很多其他的可以改进的地方。</p><p>所以实际上路径分析不难，就是日志跟日志之间匹配，然后去标准化数据，然后去画图，就是这样一个过程。但是路径分析是一件非常消耗体力的活，因为功能可能很多，用户前后行为可能非常多，这就需要分析师对业务非常熟悉，一定要每天都去使用自己的 APP，就是你不能把自己当作一个普通用户，你要把自己当作各类用户都要去体验自己的产品，因为用户在端内的任何行为都是合理的。</p><p>每个产品经理都是负责自己的一小块功能，比如你是专门负责外卖的，而分析师就是最大的产品经理，站在全局的角度去看产品，外卖的产品经理不知道美食板块的数据，分析师是知道的，所以分析师提出某个落地项，既能优化当前功能，又能对其他功能没有负向影响，否则就没意义了，同时还能提升大盘数据。这非常考验综合思考力，就是你提出的某一个落地项，比如做这种 A/B，那么你不能光看最后对你这一小块功能的提升，同时还要看对其他功能有没有影响，只有在这个基础上对大盘有进一步提升，这个时候 A/B 测试才有很好的效果。</p><h3 id="路径分析思考" tabindex="-1">路径分析思考 <a class="header-anchor" href="#路径分析思考" aria-label="Permalink to &quot;路径分析思考&quot;">​</a></h3><p>最后我们看一下对路径分析的思考，路径分析本身整个过程就是这样，更多公司在可视化这一块可能不太一样，有一些公司的可视化会相对来说会更加酷炫。那么路径分析当前还有哪些点可以进一步去做呢？前面我们对美团 APP 的路径分析的举例就到这里，实际上我本身对路径分析也有一些思考。</p><ul><li><p>大家都知道我们刚刚说的所有路径分析都是以功能点的时序整体分析为主，只有指标没有维度，而要想精细化运营，必须要进行维度拆分，如通过不同入口，通过桌面或是通知栏进来的用户，他们的路径分析差异在哪？这就涉及做逻辑分析的时候要进行维度拆解，这是第一个点。</p></li><li><p>第二个就是对于有些 APP，比如携程旅行、小猪短租，用户可能在今天打开 APP 后逛一会儿，然后就走了，过一周后再进来才下单，对于这种用户一天不连续路径，如何进行分析呢？其实这是一个行业难题，我之前去听一个 CEO 讲这一块的时候，也没有很好地解决，无论是进行周期时间段的 session 分析，还是短期画像的分析，效果都一般，这一块大家可以去想一想。</p></li><li><p>第三个就是 PC 端的路径分析和 APP 端的路径分析最大差异在哪，同时 PC 端有没有案例，因为我们本节课就是讲 APP 端，那么这一节课的路径分析本身就要求你对一款产品的功能以及各种路径都要非常熟悉，所以大家一定要去多体验一下美团 APP，我前面提到的美食功能的几个路径以及画图，还有附近、订单等，这样的话大家才能更好地理解这节课的内容。</p></li></ul><p>还是那句话，路径分析是非常实用的，但是在实际工作过程中，很多分析师没有去看用户的行为，这一块如果做好了，对你的用户最终的转化率是非常有帮助的。</p><p>这一节课可能有一点难懂，因为路径分析跟你对 APP 的熟悉度非常有关。今天的课程就到这里，如果你有问题可以在下方留言，同时欢迎你关注我本人的公众号（微信搜索：数据分析学习之道），之后会定期更新原创高质量的数据分析文章，下节课见，谢谢。</p><p><a href="https://wj.qq.com/s2/6894820/1708/" target="_blank" rel="noreferrer">这是课程评价链接，快来帮花木老师评价下吧！</a></p>',80),i=[a];function s(n,l,g,r,e,c){return o(),u("div",null,i)}const _=t(p,[["render",s]]);export{m as __pageData,_ as default};
