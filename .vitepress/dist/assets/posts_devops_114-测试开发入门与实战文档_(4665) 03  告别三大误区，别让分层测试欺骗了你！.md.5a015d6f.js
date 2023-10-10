import{_ as p,j as s,o as i,g as r,k as a,h as o,s as t,Q as n}from"./chunks/framework.cfb14fe0.js";const F=JSON.parse('{"title":"03告别三大误区，别让分层测试欺骗了你！","description":"","frontmatter":{},"headers":[],"relativePath":"posts/devops/114-测试开发入门与实战文档/(4665) 03  告别三大误区，别让分层测试欺骗了你！.md","filePath":"posts/devops/114-测试开发入门与实战文档/(4665) 03  告别三大误区，别让分层测试欺骗了你！.md","lastUpdated":1696682708000}'),l={name:"posts/devops/114-测试开发入门与实战文档/(4665) 03  告别三大误区，别让分层测试欺骗了你！.md"},u=t("h1",{id:"_03告别三大误区-别让分层测试欺骗了你",tabindex:"-1"},[o("03告别三大误区，别让分层测试欺骗了你！ "),t("a",{class:"header-anchor",href:"#_03告别三大误区-别让分层测试欺骗了你","aria-label":'Permalink to "03告别三大误区，别让分层测试欺骗了你！"'},"​")],-1),_=t("p",null,'上一节我们讨论了"自动化测试框架设计原则"，通过学习你应该对自动化测试框架的设计有了一定了解。',-1),c=t("p",null,'今天我们来聊聊，"分层测试"的概念、发展和误区，以及其实施原则。',-1),h=t("h3",{id:"分层测试-是什么",tabindex:"-1"},[o('"分层测试"是什么？ '),t("a",{class:"header-anchor",href:"#分层测试-是什么","aria-label":'Permalink to ""分层测试"是什么？"'},"​")],-1),d=t("p",null,'"分层测试"其实并不是一个专业名称，它只是国内互联网从业者约定俗成的一个叫法。它来自专业名称"Test Pyramid"，也就是我们常说的"测试金字塔"，是 Martin Fowler 在 2012 年提出的一个概念。',-1),q=n('<p>测试金字塔图 1</p><p>&quot;测试金字塔&quot;将软件测试分为不同的粒度，强调了<strong>不同粒度的自动化测试在整个自动化测试中的占比应该不同</strong>，旨在指导我们如何使用不同类型的自动化测试来实现软件测试价值的最大化。</p><p>它有如下原则：</p><ul><li><p>分粒度来写自动化测试；</p></li><li><p>越是高层次，自动化测试的占比应该越少。</p></li></ul><p>如测试金字塔图1 所示，越是底层的测试，比如单元测试（Unit Test），测试耗费的时间就越少，花费的成本就越小，越往上层，测试所需的时间就越多，成本就越高，在&quot;测试金字塔&quot;模型中，UI 测试是性价比最低的一个测试类型。所以，我们说&quot;测试金字塔&quot;模型揭露了测试速度、测试成本和自动化测试类型三者之间的关系。</p><p>它最开始只有 Unit、Service 和 UI 这三个粒度，这三个粒度像是把自动化测试分为了三个不同层次，所以行业内我们将它叫作 &quot;分层测试&quot;。</p><p>那么，&quot;测试金字塔&quot;的每一层各有什么含义呢？</p><ul><li><p><strong>Unit 层（单元测试层）</strong></p><p>单元测试层位于&quot;测试金字塔&quot;的最底层。主要关注函数，类级别的测试；单元测试之间相互没有依赖，是独立的，可重复执行的；单元测试的执行时间最短，成本最低；在实践中，大约有 70% 的测试用例都是单元测试。</p></li><li><p><strong>Service 层（服务层）</strong></p><p>服务层位于&quot;测试金字塔&quot;的中间层。主要关注模块本身，模块与模块集成的接口， 子系统本身， 各个子系统之间的测试；Server 层的测试可涉及框架、数据库、第三方服务等；在实践中，大约有 20% 的测试用例是测试。</p></li><li><p><strong>UI 层</strong></p><p>UI 层位于&quot;测试金字塔&quot;的最上层。 关注从用户角度看， 整个系统的表现和交互；UI 层的测试通常通过操作页面对象来执行；耗时最长，成本最高。在实践中，UI 层的测试大约占比 10% 左右。</p></li></ul><h3 id="分层测试-的发展" tabindex="-1">&quot;分层测试&quot;的发展 <a class="header-anchor" href="#分层测试-的发展" aria-label="Permalink to &quot;&quot;分层测试&quot;的发展&quot;">​</a></h3><p>在实践中，&quot;测试金字塔&quot;逐渐更加细化，形成了如下的样子：</p>',10),g=n('<p>测试金字塔图 2</p><p>测试金字图1 中，原本的 Service 层进一步细分为组件测试（Component Test）、集成测试（Integration Test）和 API 接口测试（API Testing）。</p><p>而原本顶部的 UI 层，则被 E2E（End To End）测试取代，E2E 测试和 UI 测试的区别是：UI 测试的重点在于产品或系统的 UI 部分；E2E 则更关注整个产品或者系统的行为是否正确，显然 E2E 能更加准确地描述测试活动的重心。</p><p>此外，还在顶部另加了一个 Exploratory Test（探索性测试）。探索性测试不是随机测试，探索性测试一般会设定一个测试目标，然后根据测试执行者对系统的了解，从某一个点出发，围绕着测试目标，同时进行测试用例的设计和执行工作，当前探索性测试一般采用手工测试的方式来进行。</p><p>至此，测试的&quot;分层&quot;已经很详细了，那每一层具体测试哪些内容，由哪些人负责执行呢？</p><ul><li><p><strong>Unit（单元测试）层：</strong> 由于测试的都是具体的方法和类。所以一般由开发自测。</p></li><li><p><strong>Component Test（组件测试）：</strong> 这部分是 Unit 层的组装，多个 unit 组成一个 Component。对于一个组件来说，其输入可能是独立的，那么可由测试人员测试，也可能依赖别的组件提供，这时通常需要开发来提供 Mock。</p></li><li><p><strong>Integration Test（集成测试）：</strong> 把多个 Component（组件）形成一个子系统或者系统，集成测试分自顶向下集成和自底向上集成，集成测试一般由测试人员来完成。</p></li><li><p><strong>API Test（接口测试）：</strong> API 通常是指两个子系统直接通过 API 进行通信（当然不同模块间的通信也会通过 API 来进行），接口测试一般由测试人员来完成。</p></li><li><p><strong>E2E 测试：</strong> 关注系统的交互和 UI 的展现，通常由测试人员完成。</p></li><li><p><strong>探索性测试：</strong> 由测试人员手工完成。</p></li></ul><p>总而言之，&quot;测试金字塔&quot;模型指导我们在进行测试时， 应该投入大量精力到运行速度更快，成本更低的 Unit 测试（单元测试）中；应该投入一部分精力到 Server 测试中（即组件测试和API测试）；在测试速度更慢，成本更高的 UI 层面的测试里，我们只需投入最小精力即可。</p><h3 id="分层测试-的误区" tabindex="-1">&quot;分层测试&quot;的误区 <a class="header-anchor" href="#分层测试-的误区" aria-label="Permalink to &quot;&quot;分层测试&quot;的误区&quot;">​</a></h3><p>&quot;测试金字塔模型&quot;（以下称&quot;分层测试&quot;）是&quot;银弹&quot;吗？是不是无论什么系统，都可以采用分层测试？分层测试又有哪些误区呢？</p><h4 id="误区-1-分层测试一定是顺序的。" tabindex="-1">误区 1：分层测试一定是顺序的。 <a class="header-anchor" href="#误区-1-分层测试一定是顺序的。" aria-label="Permalink to &quot;误区 1：分层测试一定是顺序的。&quot;">​</a></h4><p>很多同学在分层实践中都会陷入这个误区，特别是对分层测试不了解的同学，看着分层测试的图就想当然认为分层测试是有顺序的。即测试首先从单元测试开始，等所有的单元测试都做完后，才会开始 Service 层的测试（组件测试、集成测试和 API 测试），而 E2E 测试一定是在最后执行。</p><p><strong>实际上，分层测试并没有规定每一层测试的先后顺序，在实践中，每一层的测试是没有执行先后顺序的，是可以同时运行的。</strong></p><h4 id="误区-2-不能跨层执行测试。" tabindex="-1">误区 2：不能跨层执行测试。 <a class="header-anchor" href="#误区-2-不能跨层执行测试。" aria-label="Permalink to &quot;误区 2：不能跨层执行测试。&quot;">​</a></h4><p>有的同学认为，既然分层分得这么清晰，是不是意味着不能在这一层执行其他层的测试呢？</p><blockquote><p>比如不能在 Service 层进行 E2E 测试，同样也不能在 E2E 层调用 API。</p></blockquote><p>这是不对的。</p><p>分层测试并没有这样的限制。实际上跨层测试是很经常的事情，比如我们在 E2E 测试时调用接口来迅速构造数据，或者使用 Mock 绕过某些非目标测试场景。</p><p>还有，特别针对前端的验证来说，比如针对 UI 的验证，可以下沉到 Component 层（组件层）来尽早验证。举例来说，假设你的前端项目采用了 React、Vue、Spa 等 Web 技术，那么，利用这些框架提供的工具在 Component 层（组件层）针对 UI 进行测试是非常普遍的。</p><h4 id="误区-3-分层后-单元测试越多越好-ui-测试越少越好。" tabindex="-1">误区 3：分层后，单元测试越多越好，UI 测试越少越好。 <a class="header-anchor" href="#误区-3-分层后-单元测试越多越好-ui-测试越少越好。" aria-label="Permalink to &quot;误区 3：分层后，单元测试越多越好，UI 测试越少越好。&quot;">​</a></h4><p>答案也对也不对。对，是因为理论上越底层的测试发现问题的成本越低，我们应该多做单元测试；不对，是因为现实往往比理论更复杂。</p><p>举例来说，假设你的应用是一个跟第三方系统集成的项目（比如对接第三方支付接口）。那么因为第三方接口已经完成，在这个项目中，单元测试已经不用做，且不在你的掌握范围内。这时测试应该把关注点放在 E2E 层，以穷举业务场景的方式，来尽可能多地进行测试，以满足需求。</p><p>所以你需要根据项目，合理选择需要实施哪种层次的测试，这才是正确做法。</p><h3 id="分层测试-的最佳实施原则" tabindex="-1">&quot;分层测试&quot;的最佳实施原则 <a class="header-anchor" href="#分层测试-的最佳实施原则" aria-label="Permalink to &quot;&quot;分层测试&quot;的最佳实施原则&quot;">​</a></h3><p>&quot;分层测试&quot;讲了这么多，有没有好的实践供参考呢？当然有啦，以下就是我总结的分层测试实施原则。</p><h4 id="_1-不要重复测试" tabindex="-1">1. 不要重复测试 <a class="header-anchor" href="#_1-不要重复测试" aria-label="Permalink to &quot;1. 不要重复测试&quot;">​</a></h4><p>重复测试是指，同样一个检查点，在 Unit 层有测试用例，在 Service 层也有测试用例，在 E2E 测试里也有覆盖。</p><p>在实践中，太多人尝试在每一层里尽可能穷尽所有功能的测试验证。这是不对的，理想的情况是，每一个层次的测试用例集合起来，正好是最小的，能覆盖所有需求的测试集。</p><p>重复测试坏处在于，如果有改动，那么就要改动 3 次，并且还增加了脚本维护时间，测试成本非常高。</p><h4 id="_2-测试尽量下沉" tabindex="-1">2. 测试尽量下沉 <a class="header-anchor" href="#_2-测试尽量下沉" aria-label="Permalink to &quot;2. 测试尽量下沉&quot;">​</a></h4><p>测试尽量下沉，是指能在单元测试层覆盖的，尽量在单元测试层覆盖。测试下沉的好处是如果你的测试&quot;失败&quot;了，你清楚地知道哪行代码有问题；而如果 E2E 测试失败了，你要花费更多精力才能找到出错的代码行。</p><p>测试下沉并不意味着测试脚本写完就算了，它是一个动态的过程。举例来说，假设你发现某一条 E2E 测试发现了一个功能性 Bug，这意味着你的单元测试某处缺失。这时，你需要把针对这个 Bug 的检查下沉到单元测试层，并且删除掉 E2E 层的测试。</p><p>总之，你需要多写单元测试。</p><h4 id="_3-根据业务特性-测试合理分层" tabindex="-1">3. 根据业务特性，测试合理分层 <a class="header-anchor" href="#_3-根据业务特性-测试合理分层" aria-label="Permalink to &quot;3. 根据业务特性，测试合理分层&quot;">​</a></h4><p>测试合理分层有两个含义。</p><p><strong>第一个就是合理选择分层模型。</strong></p><p>比如如果是前端占比比较多的测试，你可能选择&quot;奖杯模型&quot;；如果是针对微服务的测试，你可能选择&quot;纺锤模型&quot;。</p><p><strong>第二个是合理选择在哪一层编写你的测试用例。</strong></p><p>假设你需要做一个用户交易历史分页展示的功能，你在单元测试时发现了一个边界值的问题------数据量大到分页超过 1000 页时，程序会出错。</p><p>从用户的操作习惯看，数据量根本达不到 1000 页，那么你永远走不到 E2E 层这一步，此时你的测试应该放在单元测试层。</p><p>相反，假设如果你的业务流程限定死了，这个分页不可能达到 1000 页，那么这个单元测试就存在&quot;过量测试&quot;的问题，应该从单元测试层移除，转而在 E2E 层根据业务逻辑编写测试用例。</p><h3 id="课外小知识" tabindex="-1">课外小知识 <a class="header-anchor" href="#课外小知识" aria-label="Permalink to &quot;课外小知识&quot;">​</a></h3><p>除文中介绍的&quot;测试金字塔&quot;模型之外，&quot;测试金字塔&quot;模型针对不同的系统还有不同的演化。</p><p>针对只有前端的项目，&quot;测试金字塔&quot;可能只包含 Unit 单元测试和 UI 测试 / E2E 测试，也可以加入对静态资源（Static files）的检查和集成测试（Integration Test），从而演变成奖杯模型（Testing Trophy）。</p>',43),m=t("p",null,"奖杯模型（Testing Trophy）",-1),E=t("p",null,'针对微服务项目，还可以演变成一个仅仅关注集成测试的"纺锤模型"。',-1),I=t("p",null,"纺锤模型",-1),b=t("p",null,"这些演化的模型，感兴趣的同学可以自行去搜索了解。",-1),A=t("h3",{id:"小结",tabindex:"-1"},[o("小结 "),t("a",{class:"header-anchor",href:"#小结","aria-label":'Permalink to "小结"'},"​")],-1),P=t("p",null,'最后，总结一下本节课的重点内容，本课时我们详细介绍了"分层测试"，也就是"测试金字塔"模型的概念、发展和误区，以及其实施原则。',-1),T=t("p",null,'"分层测试"是一个很好的自动化测试理论，当前大家形成的"多做单元测试，少做 UI 测试"的共识，就是基于"分层测试"的理论指导。但是在实际应用中，我们也需要根据实际情况去选择合适的分层模型。',-1),U=t("p",null,'毕竟，一切测试都是基于风险的，生搬硬套"分层测试"并不能保证你的项目一定会成功。正如我们刚刚提及适用于微服务项目的纺锤模型，在测试时就需要多关注集成测试，而不必要把单元测试的比重放很高。',-1),f=t("hr",null,null,-1),k=t("p",null,[t("a",{href:"https://shenceyun.lagou.com/t/eka",target:"_blank",rel:"noreferrer"},'"测试开发工程师名企直推营" 入口，免费领取 50G 资料包')],-1);function C(S,x,v,M,N,V){const e=s("Image");return i(),r("div",null,[u,_,c,h,d,a(e,{alt:"Lark20200921-111541.png",src:"https://s0.lgstatic.com/i/image/M00/53/0B/Ciqc1F9oGwuAf7eEAADRNGd88dM364.png"}),o(),q,a(e,{alt:"middle_img_68fc11b1-aa06-4aca-8a41-c55969c3006g.png",src:"https://s0.lgstatic.com/i/image/M00/6F/CA/Ciqc1F-3MASAcurLAADEq8NbZZM937.png"}),o(),g,a(e,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image/M00/50/1A/Ciqc1F9h1zGAE4WdAAKOCpCAbNo838.png"}),o(),m,E,a(e,{alt:"image (1).png",src:"https://s0.lgstatic.com/i/image/M00/50/F5/Ciqc1F9kKceAH2RCAAKIDtnMDvI800.png"}),o(),I,b,A,P,T,U,f,k])}const B=p(l,[["render",C]]);export{F as __pageData,B as default};
