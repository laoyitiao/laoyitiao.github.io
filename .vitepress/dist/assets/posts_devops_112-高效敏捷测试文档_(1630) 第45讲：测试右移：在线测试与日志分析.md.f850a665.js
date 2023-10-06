import{_ as i,j as l,o as n,g as _,k as e,Q as s,s as t,h as o}from"./chunks/framework.b3d8e22e.js";const v=JSON.parse('{"title":"混沌工程：基于故障注入的测试 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/devops/112-高效敏捷测试文档/(1630) 第45讲：测试右移：在线测试与日志分析.md","filePath":"posts/devops/112-高效敏捷测试文档/(1630) 第45讲：测试右移：在线测试与日志分析.md","lastUpdated":1696417798000}'),p={name:"posts/devops/112-高效敏捷测试文档/(1630) 第45讲：测试右移：在线测试与日志分析.md"},r=s('<p>到这里，你已经学习了敏捷测试专栏的 6 个模块，从敏捷测试的概念和文化、测试基础设施、再到敏捷测试的分析与计划、设计与执行，并且也讲解了测试左移。从这一讲将进入第 7 个模块，也是本专栏的最后一个模块------敏捷测试的收尾与改进。收尾只是针对即将交付的这一版软件来说，实际上，只要有新的版本发布，就会进入新的测试周期。在收尾过程中，既需要关注上线版本的运行情况、及时修复严重缺陷，又要收集和分析用户反馈和线上数据，为下一个版本的缺陷预防做准备。同时，团队也需要在实践中不断地反思和总结，持续地改进测试过程。</p><p>在这个模块的开篇要介绍的是测试右移。<strong>测试右移指的是软件发布之后的在线测试</strong>------在产品运行环境上进行测试（Testing in Production，TiP），ThoughtWorks Martin Fowler 2017 在其博客上有一篇文章专门介绍了 TiP。如果软件产品作为服务（SaaS）部署在研发公司自己的数据中心或者公有云上，在上线部署后，依然可以监控并分析系统的行为，有问题可以快速修复，并且像 A/B（易用性）测试、性能测试、安全监控等都可以在线进行。</p><p>但因为是在真实的生产环境中，数据也是真实的，所以在线测试就不能为所欲为，更多的是监控产品的应用过程，通过日志来分析系统的行为，发现软件的问题。同时，通过日志分析也可以获得用户行为相关的信息，为进一步提升用户体验提供依据。虽然这不能算是测试，但也是为了改进产品质量，也深具价值。</p><h3 id="混沌工程-基于故障注入的测试" tabindex="-1">混沌工程：基于故障注入的测试 <a class="header-anchor" href="#混沌工程-基于故障注入的测试" aria-label="Permalink to &quot;混沌工程：基于故障注入的测试&quot;">​</a></h3><p>每年一些云平台都会发生一些不同类型的线上故障，其中阿里云对于其在 2018 年 6 月 27 日线上故障的<a href="https://yq.aliyun.com/articles/603866" target="_blank" rel="noreferrer">说明</a>中写道：&quot;这一功能在测试环境验证中并未发生问题，从上线自动化运维系统后，触发了一个未知代码 bug&quot;。由此可见对于大规模、高复杂度的服务器系统来讲，仅仅是在测试环境进行测试就已经无法满足质量需求了，如何在产品环境下进行测试必将会在现在及未来云时代中占据重要位置。</p><p>随着云平台越来越庞大、越来越复杂，普通的测试用例已经很难满足高可用的需求了，所以基于故障注入的<strong>测试（Failure Injection Testing，FIT）</strong> 也越来越重要。其中 Netflix 甚至在其产品环境中大规模的使用 FIT，而不仅仅是在测试环境中。Netflix 在其官方博客中发表了多篇关于 FIT 的文章，宣传其在产品环境中做了大量的 FIT 及其收益。在未来越来越复杂的云服务时代，对于一个追求质量的系统，FIT 肯定是必不可少的。</p><p>关于混沌工程，可以参考 Netflix 公司编写的电子书 Chaos Engineering，也可以参考阿里开源混沌工程工具 ChaosBlade，如图 1 所示。</p>',7),c=t("p",null,[o("图1 混沌实验概貌（源自："),t("a",{href:"https://github.com/chaosblade-io/",target:"_blank",rel:"noreferrer"},"https://github.com/chaosblade-io/"),o("）")],-1),h=t("h3",{id:"在线性能测试",tabindex:"-1"},[o("在线性能测试 "),t("a",{class:"header-anchor",href:"#在线性能测试","aria-label":'Permalink to "在线性能测试"'},"​")],-1),d=t("p",null,"软件系统经过了研发过程中的性能测试，在研发环境中满足了性能需求。但是，庞大的用户群体、跨地区/跨国家的用户访问、数以万计的移动端设备种类和型号等生产环境中的真实场景，在研发环境中不可能全面覆盖。在线性能测试是指借助监控工具，监控系统性能的实际数据，因为是真实数据，比研发环境中通过工具产生负载得到的测试结果更客观，更有分析价值。",-1),g=t("p",null,"另外，对于规模较小的互联网公司，一个新产品上线时用户比较少，对于性能的要求不会太高，一般情况下用户数量是逐渐增加的。在研发环境中做完整的性能测试费钱又费时，可以考虑在系统上线后进行性能测试------在线性能监控，发现性能瓶颈、内存泄露等问题，实现持续测试、持续调优。这样不仅可以让公司节省一大笔开支，也赢得了快速发布的时间。",-1),A=t("p",null,"图2 在线性能监控流程",-1),u=t("p",null,"在线性能监控系统需要监控的点很多，包括前端、应用服务器、中间件、Web 服务器、队列、缓存、数据库、网络等。要监控的性能指标也很多，比如用户关心的页面加载时间、用户输入响应时间，业务角度需要关心的系统吞吐量、并发用户数，技术角度需要关心的内存、CPU 使用情况等。对于微服务架构的分布式软件系统，还需要通过追踪微服务调用链分析并定位链路上的性能瓶颈。",-1),m=t("p",null,"前面提到过的在线性能监控工具包括： AppDynamics、Datadog、DynaTrace、New Relic、CollectD、StatsD 等。还有分布式系统的链路及性能监控工具 SkyWalking、PinPoint 等。",-1),B=t("h3",{id:"在线安全监控",tabindex:"-1"},[o("在线安全监控 "),t("a",{class:"header-anchor",href:"#在线安全监控","aria-label":'Permalink to "在线安全监控"'},"​")],-1),T=t("p",null,"在研发阶段可以完成代码的静态分析、安全性功能验证、渗透测试等。产品上线后，通过监控、检查发现系统的安全性漏洞并及时修正也是一项重要的工作，这样的工作可以看作是系统安全性的在线测试。就是为了保障软件系统操作的合规性和数据的安全性，运用各种技术手段实时收集软件系统运行过程中的状态、数据的危险变更、用户操作活动等信息，以便集中记录、分析和报警。",-1),b=t("p",null,"实现在线安全监控需要建立一套相对完整的运维安全监控与审计框架，如图 3 所示，具备监控、审计、预防、恢复和支撑等功能。",-1),f=s('<p>图3 系统运维安全监控与审计框架图</p><p>在线的安全性测试重点关注 4 个方面：</p><ul><li>身份认证、授权、访问控制、不可抵赖等，已做到软件系统之内，经过之前的安全性功能测试和渗透测试，在运维环境中还可以进一步得到验证，这就是&quot;审计&quot;；</li><li>审计，对用户名、访问时间、操作、访问的资源地址等信息进行审计，判断这些信息是否符合规范和要求，有没有越权或其他不安全的资源访问等；</li><li>入侵检测，有没有一些用户越过访问控制机制进入到系统内部，包括访问者的 IP 地址、用户名、时间、频率等进行检测，如频率过高，就发出警报并暂时冻结该用户的访问；</li><li>整体检验，结合审计结果、入侵检测信息、资源访问日志等进行综合性判断，当前系统整体运行是否安全，如果不安全，则系统发出通知并启动安全保护模式。</li></ul><h3 id="a-b-测试" tabindex="-1">A/B 测试 <a class="header-anchor" href="#a-b-测试" aria-label="Permalink to &quot;A/B 测试&quot;">​</a></h3><p>关于 A/B 测试的市场成功案例有很多。我们先来看看其中一个改动直观但结果对比明显的例子，以帮助你理解什么是 A/B 测试。</p><p>Fab 是一家在线电商，原来的购物车造型是图 4 中的老版本 A，和我们今天线上购物的体验一样，用户浏览商品时可以通过点击购物车把商品放进去。产品经理设计了两个新的方案 B1、B2，期望新的方案能够提高购物车的点击率，也就是转化率。</p><p>公司把集成的两个新方案的软件版本都发布到了线上和老版本同时运行，等价、随机选取同一地区的用户使用这三个版本中的一个，然后在线监控该地区用户转化率。运行一段时间后，得到的结果是：相比老版本 A， 新的版本 B1 和 B2 都不同程度地提升了转化率，B1 提升了 49%，B2 提升了 15%。因此，Fab 公司最终选择了方案 B1，向所有用户发布集成了 B1 的软件版本。今天在其网站上看到的购物车的样子就是纯文字&quot;Add To Cart&quot;的设计方案，这就是 A/B 测试。</p>',7),C=t("p",null,"图4 购物车的 A/B 测试案例",-1),P=t("p",null,"更为典型的 A/B 测试往往只发布一个新版本 B 和老版本 A 进行比较。亚马逊也针对购物车做过大量的 A/B 测试；Google 也会做很多 A/B 测试，在 Google 的搜索页面，广告位左移几个像素，都很有可能会带来营收增长。虽然不能用理论解释，但也更加证实了 A/B 测试的价值。只有 A/B 测试才能告诉我们，产品新功能上线后究竟会有怎样的影响，并且用事实帮助人们做出正确的决定。",-1),q=t("p",null,"要做好A/B 测试，需要考虑随机流量的选择以及好的统计工具以保证试验结果的准确性。相比企业自己实施 A/B 测试，可以考虑使用第三方的 A/B 测试服务，将不同的方案通过第三方平台发布给用户，然后自由调整试验流量，根据数据反馈分析方案的好坏。",-1),I=t("p",null,"A/B 测试是一个持续的实验过程------快速轻量的进行迭代，每次尽量不要做复杂的大量改动的测试，这样便于追查原因，进行快速优化，然后再迭代、再优化，不断提高用户体验，不断增加公司的盈利。",-1),S=t("h3",{id:"流量回放技术",tabindex:"-1"},[o("流量回放技术 "),t("a",{class:"header-anchor",href:"#流量回放技术","aria-label":'Permalink to "流量回放技术"'},"​")],-1),k=t("p",null,"流量回放技术是指对线上真实流量数据导入到测试环境中，并借助特定技术进行回放，用来验证新开发的功能是否有问题。 在第 17 讲（下）我曾经介绍过影子测试，即采用了流量回放技术，具体过程如图 5 所示。核心业务的升级改造必须确保万无一失，因此利用真实的线上流量在测试环境中先进行验证再发布到生产环境中是比较稳妥的方式。另外，流量回放还可以用于在测试环境中对系统进行压力测试。GoReplay 是具有流量回放功能的开源工具。",-1),D=s('<p>图5 影子测试中的流量回放技术</p><h3 id="日志分析获得用户数据" tabindex="-1">日志分析获得用户数据 <a class="header-anchor" href="#日志分析获得用户数据" aria-label="Permalink to &quot;日志分析获得用户数据&quot;">​</a></h3><p>A/B 测试可以看作是日志分析应用的一个实例，安全性测试也是通过日志审查发现存在的安全性漏洞。不仅如此，现在早已是大数据时代，数据产品化的趋势日益明显，企业也更加依赖数据驱动业务增长。通过对在线日志进行分析可以获得大量有价值的用户数据，帮助企业有效地改善产品的用户体验，提高用户满意度，进而帮助企业提高收入。</p><p>在这里举一个例子，大家都已经习惯使用在线 App 购物，你应该已经发现了，如果搜索过某类商品，当你下次再进入 App 的时候，页面上呈现的往往是你搜索过的同类商品。你知道是怎么实现的吗？在背后发挥作用的是<strong>个性化推荐系统</strong>。</p><p>推荐系统的核心就是利用大数据处理系统对用户的行为数据进行监测、收集和分析。用户对商品的点击、浏览、收藏、加购物车和购买等行为在用户与商品之间形成行为数据，这些都记录在用户购物路径日志中，对日志数据进行分析并结合用户的个人信息（性别、年龄、喜好等），就能够了解用户的个人偏好及购物习惯，然后筛选出符合条件的商品，并对结果进行排序，呈现给用户。</p><p>推荐系统的目标是通过推荐用户有购买意愿的商品，给用户最好的体验，提升下单转化率，并且增强用户黏性。几乎每一个互联网公司都在应用个性化推荐系统向用户推送新闻、广告、视频等，并取得了巨大的收益，推荐系统被认为是互联网的基石系统之一。</p><p>线上可以获得各种各样的日志，有系统输出的日志、程序的日志、数据库的日志、前端的日志等，而且日志数量巨大，需要借助工具来处理和分析。对于分布式架构的软件系统，日志的处理可以借助 Hadoop、Storm、Spark 等大数据处理的框架。另外，还有具体的日志分析工具，如商业的 Splunk 工具。开源的首选 ELK，其代表 3 个开源工具 ElasticSearch、Logstash、Kibana 组合而成的软件栈，分别实现了自动搜索与索引、日志收集、可视化展现等功能。</p><p>日志分析再进一步就是利用 AI 技术来收集用户反馈，进行数据挖掘、客户情绪分析、客户焦点分析等。比如，数据挖掘和机器学习在推荐系统里就得到了最广泛的应用，根据 AI 算法训练模型，让机器知道用户的偏好，对推送的内容进行筛选、排序，从而形成个性化的推荐。</p><h3 id="关于用户体验度量" tabindex="-1">关于用户体验度量 <a class="header-anchor" href="#关于用户体验度量" aria-label="Permalink to &quot;关于用户体验度量&quot;">​</a></h3><p>很多人认为产品的用户体验是无法度量的，因为体验是一种主观感受。而《用户体验度量：收集、分析与呈现》（第2版）这本书提出：用户体验也是可以度量的，即<strong>具有可测试性</strong>，而且是建立在一套可靠的测试体系上。这本书介绍了 4 种常见的用户体验度量类型：</p><ul><li><strong>绩效度量类</strong>，针对用户使用产品完成一个特定任务的情况进行度量，具体度量类型包括任务完成度、完成任务所需要的时间、任务过程中所出现的过失等；</li><li><strong>基于问题的度量</strong>，对发现的可用性问题进行度量，比如对问题的严重性进行评估；</li><li><strong>自我报告度量</strong>，即用户的直接反馈，来自用户的评论、用户对产品的有效性、易用性、易学性及满意度的评分等；</li><li><strong>行为和生理度量</strong>，收集用户在使用产品时的情感体验也是可测量到的行为和情绪变化，度量方法包括眼动追踪、情感投入和紧张情绪，这需要用到技术类的测试方法，包括眼动追踪技术、情感计算技术等。</li></ul><p>总之，这本书提供了一套科学完善的度量体系，值得一读，A/B 测试、推荐系统都可以在这本书里找到理论依据。 根据用户体验度量的结果，企业就可以获得关于用户体验的可靠信息，比如用户会推荐这个产品吗？和竞品相比，这个产品的用户体验如何？ 并根据这些信息做出合理的决策。</p><p>从测试左移 ATDD/BDD，以业务驱动测试，再到测试右移，在线测试、在线监控，收集和分析用户反馈，再输入到下一个软件版本的需求中，形成闭环，充分提升产品的业务价值。</p><p>最后总结一下这一讲的内容：</p><ul><li>介绍了测试右移的概念，以及其中的在线性能测试、在线安全监控、A/B 测试等；</li><li>还简单介绍了混沌工程、在线回放技术在测试中的应用；</li><li>还通过互联网行业广泛应用的推荐系统讲解了通过在线日志获取用户数据的价值和数据分析工具；</li><li>最后推荐了一本书《用户体验度量：收集、分析与呈现》。</li></ul><p>今天留给你的思考题是：在哪些情况下不能用在线性能测试代替研发阶段的性能测试呢？</p>',16);function x(F,N,V,E,y,Y){const a=l("Image");return n(),_("div",null,[r,e(a,{alt:"image1.png",src:"https://s0.lgstatic.com/i/image/M00/18/89/CgqCHl7YuZyALEzwAAaKhCFB9GU062.png"}),c,h,d,g,e(a,{alt:"image2.png",src:"https://s0.lgstatic.com/i/image/M00/18/89/CgqCHl7YuaWAWJYLAABh3ufIELk803.png"}),A,u,m,B,T,b,e(a,{alt:"image3.png",src:"https://s0.lgstatic.com/i/image/M00/18/89/CgqCHl7YubCAYmFqAAIMp3ffAU8204.png"}),f,e(a,{alt:"image4.png",src:"https://s0.lgstatic.com/i/image/M00/18/7D/Ciqc1F7YubyAYZKGAAIC7eOSiVo236.png"}),C,P,q,I,S,k,e(a,{alt:"image5.png",src:"https://s0.lgstatic.com/i/image/M00/18/7D/Ciqc1F7YuceAPZ8AAAJBUgwHqEI400.png"}),D])}const G=i(p,[["render",x]]);export{v as __pageData,G as default};
