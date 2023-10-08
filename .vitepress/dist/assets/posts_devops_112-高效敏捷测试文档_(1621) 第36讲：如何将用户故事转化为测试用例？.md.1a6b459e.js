import{_ as l,j as i,o as a,g as e,k as u,h as q,Q as p,s as t}from"./chunks/framework.a0d18f64.js";const T=JSON.parse('{"title":"第36讲：如何将用户故事转化为测试用例？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/devops/112-高效敏捷测试文档/(1621) 第36讲：如何将用户故事转化为测试用例？.md","filePath":"posts/devops/112-高效敏捷测试文档/(1621) 第36讲：如何将用户故事转化为测试用例？.md","lastUpdated":1696682708000}'),s={name:"posts/devops/112-高效敏捷测试文档/(1621) 第36讲：如何将用户故事转化为测试用例？.md"},r=p('<h1 id="第36讲-如何将用户故事转化为测试用例" tabindex="-1">第36讲：如何将用户故事转化为测试用例？ <a class="header-anchor" href="#第36讲-如何将用户故事转化为测试用例" aria-label="Permalink to &quot;第36讲：如何将用户故事转化为测试用例？&quot;">​</a></h1><p>你好，我是敏捷测试专栏讲师朱少民，欢迎进入第 36 讲&quot;如何将用户故事转化为测试用例？&quot;</p><h4 id="背景" tabindex="-1">背景 <a class="header-anchor" href="#背景" aria-label="Permalink to &quot;背景&quot;">​</a></h4><p>单纯的用户故事是不具有可测试性的，如果让用户故事具有可测试性，这就需要增加验收标准。例如在第 20 讲，我们就举了一个例子说明：</p><blockquote><p>用户故事：</p><p>作为这家购物网站的买家，我要通过商品名称查询历史订单，这样我就能查看某个订单的详细信息。</p></blockquote><p>如果不加验收标准，就会有很多疑问，此时这个用户故事是不可验证的，因此需要为用户故事增加相关的验收标准（Acceptance Criteria，AC）：</p><ol><li>缺省是查询过去一年的历史订单；</li><li>如果没查到，问用户是否选择一个查询的时段，不选择就退出；</li><li>用户可以选择任意的起始时间、结束时间，但起始时间最早不早于 10 年前，跨度不超过 3 年；</li><li>支持模糊查询；</li><li>按匹配度来排序，而不是按时间排序；</li><li>每页最多显示十个记录；</li><li>查到后只显示订单号、商品名称、价格和日期；</li><li>如果想继续看，再点击订单查看详情。</li></ol><p>之后，我们又讨论了 BDD，进一步将用户故事的验收标准转换为场景，那上面这个用户故事如何转变为场景呢？</p><h4 id="转换为场景" tabindex="-1">转换为场景 <a class="header-anchor" href="#转换为场景" aria-label="Permalink to &quot;转换为场景&quot;">​</a></h4><p>用户故事是描述特定用户的行为，而行为是不会发生在真空中的，一定是发生在特定的场景中，而且不同的场景其行为的表现是不一样的。这里，用户角色是&quot;买家&quot;，其行为是：输入某个关键字进行查询。对于这个行为，会有哪些使用场景呢？</p><p>在上面验收标准中，第4～8条看起来不像应用场景，而是对输出提出的要求，即有助于我们建立测试用例的期望结果。但仔细研究后，既然是验证标准，就一定是测试的验证点，其中也是可以转化为应用场景。这就像等价类划分和边界值分析方法，不仅适合系统输入的应用，而且也适合系统输出的应用。更准确地说，从测试充分性看，不仅要覆盖系统输入数据的等价类和边界值，而且要覆盖系统输出结果的等价类和边界值。所以上面的验证标准，可以转换成下列的应用场景：</p><ul><li>只输入关键字，没选择时间段，且查到几项结果；</li><li>只输入关键字，没选择时间段，且查到几项结果，然后点击其中一项，仔细查看内容，最后退出；</li><li>只输入关键字，没选择时间段，且查到几项结果，然后点击其中一项，仔细查看内容，感觉还不是自己所需的结果，返回来，点击结果中的另一项，再仔细查看内容；</li><li>只输入关键字，没选择时间段，且查到很多项的结果；</li><li>只输入关键字，没选择时间段，且没有查询结果；</li><li>输入关键字，并且选择了一个有效的时间段；</li><li>输入关键字，但选择了一个无效的时间段；</li><li>什么都没输，直接点查询。</li></ul><p>这就是&quot;查询&quot;这个动作的应用场景。如果只是进行手工的探索式测试，到这一步就可以了。在执行过程中，测试人员会一边执行一边探索新的应用场景，实际上所执行的测试会超过上面 8 种场景。但如果进行自动化测试，工具还无法按照上面的描述执行测试，或者说，在这样的描述下还无法完成自动化测试脚本的开发。</p><h4 id="场景离测试用例还差一步" tabindex="-1">场景离测试用例还差一步 <a class="header-anchor" href="#场景离测试用例还差一步" aria-label="Permalink to &quot;场景离测试用例还差一步&quot;">​</a></h4><p>那缺少什么呢？</p><p>例如，第一个场景，输入关键字，一定要明确具体的字符串，比如输入&quot;敏捷测试&quot;，查询买&quot;敏捷测试&quot;这一类书的订单。其中还谈到：查到几项结果、查到很多项结果，究竟是多少项内容，还是不清楚，就无法构造已有的订单数据为这项测试服务。上面还谈到选择了一个有效的时间段，究竟是哪一天到哪一天？</p><p>所以，基于&quot;查询&quot;行为而列出场景的话，还不够，需要加上测试数据，才真正生成我们所需的测试用例，开发相应的自动化脚本、实现自动化测试。上面的&quot;敏捷测试&quot;是测试数据，为了测试的充分性，则需要引入等价类划分和边界值分析等方法，确定所需的测试数据集。例如：</p><ul><li>关键字数据，包括&quot;敏捷测试&quot;、&quot;敏捷 测试&quot;、&quot;/敏捷测试&quot;、&quot;\\敏捷测试&quot;、 &quot;|敏捷测试&quot;、&quot;&lt;敏捷测试&gt;&quot;、&quot;&quot;、&quot; &quot;等；</li><li>构造测试数据，使查询的结果正好只有 1 条、10 条、11 条等（主要是验证分页对不对）；</li><li>有效的时间段，包括只有一天、起始时间正好十年、时段正好 3 年等，假定今天是 2020 年 5 月 4 日，那么需要构造这些测试数据，如&quot;2020 年 5 月 1 日～2020 年 5 月 1 日&quot;、 &quot;2010 年 5 月 5 日～2011 年 5 月 1 日&quot;、 &quot;2017 年 5 月 1 日～2020 年 4 月 30 日&quot;等；</li><li>无效的时间段，还是假定今天是 2020 年 5 月 4 日，就需要构造测试数据，如&quot;2020 年 5 月 3 日～2020 年 5 月 1 日&quot;、 &quot;2010 年 5 月 3 日～2011 年 5 月 2 日&quot;、 &quot;2017 年 5 月 1 日～2020 年 5 月 2 日&quot;等。</li></ul><p>这样，之前的场景加上这些测试数据，这个用户故事的测试用例就算真正完成了。经过这样一个过程，就是为了告诉你，其实在敏捷开发中，如果实施良好的 ATDD（验收测试驱动开发），测试用例生成是一件容易的事，测试不应该成为敏捷开发中的瓶颈。虽然之前的调查显示：测试是敏捷开发持续交付的最大瓶颈，那是因为没有推行 ATDD 或 BDD。</p><h4 id="用户故事转化为测试用例的模型" tabindex="-1">用户故事转化为测试用例的模型 <a class="header-anchor" href="#用户故事转化为测试用例的模型" aria-label="Permalink to &quot;用户故事转化为测试用例的模型&quot;">​</a></h4><p>为了更好地说明这个问题，创建了&quot;用户故事转化为测试用例的模型&quot;，如图 1 所示，最顶层是业务需求，可以理解为一个产品的业务需求。一个产品的业务需求可以被分解成业务特性，<strong>特性比 Epic 还大</strong> （根据第 22 讲中图 2 所表述的，但又有人认为 Epic 是产品的完整故事或完整的业务故事）。<strong>但是，如果系统规模不太大、不太复杂，也没有必要分那么多层</strong>，例如之前所介绍的在线教育 App 就没有这么多层，这时可以把 Epic 那一层看作和&quot;特性&quot;是同一层。这样：</p><ul><li>在线教育 App 的需求分解为&quot;课程发现、账户管理、课程购买、课程学习和课程分享&quot;等特性，这个层次可以对应特性团队，即跨职能或称为全功能的团队；</li><li>以&quot;课程学习&quot;特性为例，它可分解为&quot;已购课程管理、课程留言、课程评分、学习笔记、收藏&quot;等用户故事（参考第 34 讲图 1），用户故事就是敏捷开发中需求描述的最基本形式，但仅仅只有用户故事，那是不可测的；</li><li>这里以&quot;已购课程管理&quot;用户故事为例，它可以进一步分解为&quot;从未购买课程、只购买了专栏课程、只购买了视频课程、购买了专栏课程和视频课程......&quot;等一系列场景；只有分别确定了在这些场景下，用户点了&quot;已够&quot;按钮，会呈现什么样的结果，用户故事才具有可测试性；也就是在设计、编程前为每个用户故事加上验收标准，即做到了 ATDD；当以场景作为验收标准时，ATDD 即是行为驱动开发 BDD，虽然到了这个层次，用户故事具有可测试性，但离测试用例还有一步之遥；</li><li>针对每个场景加上测试数据，如只购买了 1、2 门专栏课程。这样，我们就得到所需的测试用例，可以开发相应的自动化测试脚本。</li></ul>',22),_=t("p",null,'从图 1，你也可以感受到，如果功能特性做到 100% 覆盖是根本没有意义的。例如，在线教育 App，我们只要设计 5 个测试用例，为"课程发现、账户管理、课程购买、课程学习和课程分享"中每个特性分配一个测试用例，就做到了功能特性 100% 覆盖，但没有丝毫意义。',-1),n=t("p",null,"所以，我们必须将功能特性进行分解，且分解到不能分解为止，我们再设计测试用例覆盖最后一层的测试点，这样的覆盖率数据就有意义了。从特性、用户故事到场景、测试数据的分解过程，在敏捷开发中就很自然、一气呵成，容易高效地完成测试设计。如果做到了 ATDD/BDD，即当我们做好了敏捷的需求工作------在需求上达成共识且具有可测试性，这时只离测试用例只差一步了，而在此基础上，加上测试数据又相对简单，也就是让敏捷测试变成了一项简单的工作，所以在敏捷开发中，我们应尽力去推动 ATDD 或 BDD 的实施。",-1),c=t("p",null,'这一讲就学到这里，你也可以针对在线教育 App 的另一个特性，比如"账户管理"，完成这样测试设计的过程，以巩固本讲所学的内容。',-1);function d(h,D,m,A,b,f){const o=i("Image");return a(),e("div",null,[r,u(o,{alt:"1.jpg",src:"https://s0.lgstatic.com/i/image/M00/0A/0C/Ciqc1F69IwWASmboAAFkl-ipwoE474.jpg"}),q(),_,n,c])}const k=l(s,[["render",d]]);export{T as __pageData,k as default};
