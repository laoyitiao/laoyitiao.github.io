import{_ as s,j as n,o as l,g as p,k as o,Q as r,s as a,h as t}from"./chunks/framework.b3d8e22e.js";const S=JSON.parse('{"title":"什么是性能测试方案？ ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/devops/047_说透性能测试/(6160) 09  如何制定一份有效的性能测试方案？.md","filePath":"posts/devops/047_说透性能测试/(6160) 09  如何制定一份有效的性能测试方案？.md","lastUpdated":1696417798000}'),i={name:"posts/devops/047_说透性能测试/(6160) 09  如何制定一份有效的性能测试方案？.md"},_=r('<p>上一讲我们学习了性能测试的场景，并且明确了每个场景的核心意义，这一讲我将带你学习如何做好一份性能测试方案，相信你对测试方案这个概念并不陌生，那如何做好一份性能测试方案呢？这个方案能解决什么问题呢？这一讲我们来一起探索。</p><h3 id="什么是性能测试方案" tabindex="-1">什么是性能测试方案？ <a class="header-anchor" href="#什么是性能测试方案" aria-label="Permalink to &quot;什么是性能测试方案？&quot;">​</a></h3><p>性能测试方案，通俗一点说就是<strong>指导你进行性能测试的文档</strong>，包含测试目的、测试方法、测试场景、环境配置、测试排期、测试资源、风险分析等内容。一份详细的性能测试方案可以帮助项目成员明确测试计划和手段，更好地控制测试流程。</p><h4 id="性能测试方案的要点以及解决的问题" tabindex="-1">性能测试方案的要点以及解决的问题 <a class="header-anchor" href="#性能测试方案的要点以及解决的问题" aria-label="Permalink to &quot;性能测试方案的要点以及解决的问题&quot;">​</a></h4><ul><li><p>为测试活动做计划，每项测试活动的对象、范围、方法、进度和预期结果会更透明化。</p></li><li><p>制定出有效的性能测试模型，能够排查出性能问题，从而更符合真实场景。</p></li><li><p>确定测试所需要的人力、时间和资源，以保证其可获得性、有效性。</p></li><li><p>预估和消除性能测试活动存在的风险，降低由不可能消除的风险所带来的损失。</p></li></ul><h3 id="测试方案需要包含哪些内容" tabindex="-1">测试方案需要包含哪些内容？ <a class="header-anchor" href="#测试方案需要包含哪些内容" aria-label="Permalink to &quot;测试方案需要包含哪些内容？&quot;">​</a></h3><p>性能测试方案是在你正式进行性能测试之前的工作，通过前几讲的学习你已经知道了性能方案中的必备内容。</p><h4 id="_1-制定性能测试目的" tabindex="-1">1.制定性能测试目的 <a class="header-anchor" href="#_1-制定性能测试目的" aria-label="Permalink to &quot;1.制定性能测试目的&quot;">​</a></h4><p>性能测试目的是你做一次测试首先要考虑的内容。是要完成既定的指标，还是验证超卖问题，抑或是验证并发下的稳定性问题。如果是验证指标，你的指标如何制定，拿到业务访问数据如何转化成为性能测试模型，在<a href="https://kaiwu.lagou.com/course/courseInfo.htm?courseId=600#/detail/pc?id=6158" target="_blank" rel="noreferrer">《07 | 你真的知道如何制定性能测试的目标吗？》</a>中已经说得比较详细了。</p><h4 id="_2-性能测试场景梳理" tabindex="-1">2.性能测试场景梳理 <a class="header-anchor" href="#_2-性能测试场景梳理" aria-label="Permalink to &quot;2.性能测试场景梳理&quot;">​</a></h4><p>对于性能测试有哪些场景，每种场景的目的是什么，<a href="https://kaiwu.lagou.com/course/courseInfo.htm?courseId=600#/detail/pc?id=6159" target="_blank" rel="noreferrer">《08 | 性能测试场景的分类和意义》</a>已经给了你答案，你需要根据性能测试的目的进行场景的设计。</p><p>那除了这些，性能测试方案还需要包含哪些内容呢？</p><h4 id="_3-确定被测业务的部署架构" tabindex="-1">3.确定被测业务的部署架构 <a class="header-anchor" href="#_3-确定被测业务的部署架构" aria-label="Permalink to &quot;3.确定被测业务的部署架构&quot;">​</a></h4><p>被测的业务部署架构是什么意思呢，简单来说就是被测服务涉及哪些<strong>组件</strong>，每个组件部署在哪些服务器上，服务器的配置是怎样的。你需要画一个部署架构示意图，有了这张图，才能知道如何做到全貌监控，以及遇到问题从哪些服务入手。</p><p>我用一个自己画的架构示意图来说明这个问题，如下图所示，这是一个经典的链路：从客户端发起到服务端，服务端从代理层到应用层，最后到数据层。需要注意的是，你需要明确被测的环境里的各个服务有多少节点，比如客户层的压测机节点有几台，分别在哪个网段。同理我们可以去调研服务层和数据层的节点。</p>',15),h=r('<h4 id="_4-对测试数据进行调研" tabindex="-1">4.对测试数据进行调研 <a class="header-anchor" href="#_4-对测试数据进行调研" aria-label="Permalink to &quot;4.对测试数据进行调研&quot;">​</a></h4><p>关于测试数据调研，包含了非常多的内容，对于业务测试来说<strong>数据调研</strong>就是获取必要的参数来满足既定的场景可以跑通。那对于性能测试来说，需要做哪些方面的数据调研呢，我带你一一解读。</p><p><strong>（1）数据库基础数据量分析</strong></p><p>数据库的基础数据量就是<strong>目前线上数据库实际的数据量</strong>，为什么要统计基础数据量呢？很多公司往往有独立的性能测试环境，但是数据库的数据量与线上相比差距较大，可能出现一条 SQL 在性能测试环境执行很快，但上了生产却会很慢的问题。这就导致测试觉得该测的都测了，但上了生产还是会有问题出现。</p><p>这种问题可能会因为<strong>索引缺失</strong>以及性能环境数据量较少而不能将问题暴露出来，所以在性能测试环境下的数据量一定要和生产上一致。为了达到这个目的，有的公司可以将生产数据脱敏后备份，有的则需要你自己写脚本来根据业务规则批量造数据。</p><p><strong>（2）压测增量数据分析</strong></p><p>除了数据库的基础数据量，我们也需要考虑一轮性能测试下来会<strong>增加多少数据量</strong> 。往往增加的数据量最终落到数据库，可能会经过各种中间件如 Redis、Mq 等，所以涉及的链路可能存在数据量的激增，所以这方面需要根据增加情况制定相应的<strong>兜底方案</strong>。</p><p><strong>（3）参数化的数据分析</strong></p><p>关于参数化，我相信你已经通过<a href="https://kaiwu.lagou.com/course/courseInfo.htm?courseId=600&amp;sid=20-h5Url-0#/detail/pc?id=6153" target="_blank" rel="noreferrer">《02 | JMeter 参数化策略》</a>有了深入的了解。在这里，我还想抛出一道思考题，如何参数化订单号，你可以分别从读写接口两个层面写出你的思考或者实践。</p><p><strong>（4）冷热数据的分析</strong></p><p>以我的从业经历来讲，能够在方案阶段考虑到<strong>冷热数据分布</strong>的公司并不多，往往都是从性能测试结果的一些异常点或者实际产线出现的问题去追溯。接下来我就带你了解下什么是冷热数据，以及如果不对其进行分析可能会带来什么影响。</p><ul><li><p><strong>冷数据</strong>是指没有经常被访问的数据，通常情况下将其存放到数据库中，读写效率相对较低。</p></li><li><p><strong>热数据</strong>是经常被用户访问的数据，一般会放在缓存中。</p></li></ul><p>在性能测试的过程中，被频繁访问的冷数据会转变为热数据。如果参数化数据量比较少，持续压测会让 TPS 越来越高。而在实际大促情况下，往往有千万级的用户直接访问，但大多都是冷数据，会存在处理能力还没达到压测结果的指标，系统就出现问题的情况。所以在需求调研时，你也需要考虑数据会不会被缓存，缓存时间多久的问题。</p><h4 id="_5-业务规则的调研" tabindex="-1">5.业务规则的调研 <a class="header-anchor" href="#_5-业务规则的调研" aria-label="Permalink to &quot;5.业务规则的调研&quot;">​</a></h4><p>对于性能测试而言，业务规则的了解也是不可或缺的。一些公司的性能测试组在进行压测时，业务线的测试也需要协助支持压测的进行，由此可以体现业务的重要性。</p><p>对业务的充分了解不仅可以帮助你提高写脚本的效率，也可以帮助你构造更为真实的性能测试场景。举个简单的例子，你模拟下单的时候是否考虑商品属性，比如是单一商品还是套餐商品，下单的时候购物车里有几件商品，这些都会影响性能测试的结果。</p><h4 id="_6-测试监控的内容确认" tabindex="-1">6.测试监控的内容确认 <a class="header-anchor" href="#_6-测试监控的内容确认" aria-label="Permalink to &quot;6.测试监控的内容确认&quot;">​</a></h4><p>监控是你做性能测试的重点内容之一，一旦出现问题，第一反应就是<strong>查监控</strong> ，关于监控管理建设我在<a href="https://kaiwu.lagou.com/course/courseInfo.htm?courseId=600&amp;sid=20-h5Url-0#/detail/pc?id=6152" target="_blank" rel="noreferrer">《01 | JMeter 的核心概念》</a>中也有所陈述。对于性能测试方案，不仅需要罗列清楚你所需要的监控工具和访问方式，同时也需要层次分明地传递你监控的内容。对我来说做监控最基本的一个关键词：<strong>全</strong>。</p><p>怎么去理解&quot;全&quot;呢？先举一个典型的例子，有时候做一个新的项目，询问支持的同学有没有部署监控，他们说已经部署了，但等你真正使用的时候发现只监控了一台应用服务器的 CPU。这个例子我相信大多数人都似曾相识，所以我说的全，至少包含两个方面：</p><ul><li><p>涉及所有服务器；</p></li><li><p>涉及服务器基础监控，包括 CPU、磁盘、内存、网络等。</p></li></ul><p>硬件资源的监控只能算一个层面。那完成一次性能测试都需要监控什么呢，我用一个导图给你做一个概览。</p>',21),c=a("p",null,[t("监控还有个很重要的点是"),a("strong",null,"设置阈值来报警"),t("，无论是线上和线下的性能测试，报警功能都是必需的。因为通过人工的观察，往往不能以最快的速度发现问题。一旦能够及时报警，涉及的人员就可以快速响应，尽可能降低风险。")],-1),d=a("h4",{id:"_7-性能测试排期涉及的人员",tabindex:"-1"},[t("7.性能测试排期涉及的人员 "),a("a",{class:"header-anchor",href:"#_7-性能测试排期涉及的人员","aria-label":'Permalink to "7.性能测试排期涉及的人员"'},"​")],-1),g=a("p",null,[t("一般来说测试是上线前的最后一道关卡，也是发现问题的重要角色，所以项目上的风险会在测试阶段集中爆发。性能测试作为测试中的一部分，也会面临类似问题，这也考验你的项目管理能力。而且性能测试需要"),a("strong",null,"大量的数据和专门的环境"),t("，这部分的工作内容和资源需要更多支持，所以在你的性能测试方案中，首先要标明开展的阶段和日期，还要明确主负责人和协调人员。在此基础上还需要面对面 check 和落实。")],-1),u=a("p",null,"你可以参考如下的表格，具体的内容需要根据公司的情况来确定。这些任务并不是从上到下依次执行，可能存在并行的情况，比如某一些公司环境是由运维人员统一部署，这部分内容就可以和性能测试需求分析一起进行。",-1),m=a("h3",{id:"总结",tabindex:"-1"},[t("总结 "),a("a",{class:"header-anchor",href:"#总结","aria-label":'Permalink to "总结"'},"​")],-1),f=a("p",null,"关于如何打造性能测试方案就讲到这里了，通过本讲的学习，你已经了解了做一份性能测试方案的基本要素和关键点。性能测试方案对于一些公司来说可能只是一份流程化的文档，但对于测试个人来说，这部分内容可以体现出你的思考和计划。尤其对于性能测试新手来说，一定要充分思考每项的意义，这样你才能快速提升。",-1),b=a("p",null,"在参数化的数据分析部分，我抛出的一个思考题，你可以着重考虑下，有任何问题都可以给我留言。",-1),k=a("p",null,"接下来我将带你进入专栏的下半阶段，下一讲我们一起来进行监控部署的实操。",-1);function q(P,A,I,x,T,C){const e=n("Image");return l(),p("div",null,[_,o(e,{alt:"1-shangchuan.png",src:"https://s0.lgstatic.com/i/image6/M01/00/9D/Cgp9HWAaZMiALIK2AADJeLZ_6Lc496.png"}),h,o(e,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image/M00/92/37/Ciqc1GARCG-AN3DWAACM6ml91Mg409.png"}),c,d,g,u,o(e,{alt:"3shangchuan.png",src:"https://s0.lgstatic.com/i/image6/M00/00/9B/CioPOWAaZIaAM1wjAACn_XcIGUo811.png"}),m,f,b,k])}const N=s(i,[["render",q]]);export{S as __pageData,N as default};
