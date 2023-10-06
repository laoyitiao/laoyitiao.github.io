import{_ as r,j as s,o as n,g as a,k as g,Q as t}from"./chunks/framework.b3d8e22e.js";const b=JSON.parse('{"title":"告警的作用 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/分布式链路追踪实战_文档/(4333) 12  系统告警：快速感知业务隐藏问题.md","filePath":"posts/backEnd/分布式链路追踪实战_文档/(4333) 12  系统告警：快速感知业务隐藏问题.md","lastUpdated":1696417798000}'),e={name:"posts/backEnd/分布式链路追踪实战_文档/(4333) 12  系统告警：快速感知业务隐藏问题.md"},p=t('<p>上一节我带你认识了黑/白盒监控，我们现在的观测体系都是围绕着黑/白盒展开的。在<strong>模块二</strong>里，我将带你了解告警体系与可观测性。这节作为模块二的第一节，我会先向你介绍系统告警是怎么感知业务中的问题的。</p><h3 id="告警的作用" tabindex="-1">告警的作用 <a class="header-anchor" href="#告警的作用" aria-label="Permalink to &quot;告警的作用&quot;">​</a></h3><p>在没有告警的时候，我们一般是人工定期地查看相关的指标或者链路数据，再去程序上确认。<strong>虽然人工也能监控，但有时还是难以判定是否真的出现了问题</strong>，因为某一个单独的指标的上升或下降并不代表系统出现了错误。</p><p><strong>即便是确认了问题，没有一个完善的处理流程，也很难规定这种问题具体该如何处理</strong>，比如针对某个具体的问题应该做什么；出现问题后，运维人员又应该怎么通知开发人员去寻找问题的原因。除此之外，还有 2 个人工监控无法避免的难题。</p><p><strong>一个是无法保证 24 小时都有人监控</strong>。因为涉及人工，所以肯定不可能保证 24 小时都有人盯着指标。会存在有事情走开，或者忘记查看的情况。</p><p><strong>另一个是人工成本高</strong>。项目上线后，让开发人员定时定点地观看业务指标数据是不现实的，因为开发人员还会涉及其他业务的开发工作。</p><p>基于以上的问题，告警就是一个有效的解决方案，<strong>它可以早于用户发现且及时地定位、反馈问题，再通过告警的规则和流程规范进行有效的处理</strong>。我们通过以下 4 点来看告警的主要作用。</p><ol><li><p><strong>通过监控数据，可以早于用户发现问题</strong>。告警系统通过对数据进行监控，可以在出现问题时，第一时间告知给相关项目的开发人员。开发人员可以在问题反馈之前，通过告警查看问题的原因，然后将问题解决。这样的方式能极大地提高了用户的使用体验，降低用户流失的风险。</p></li><li><p><strong>通过聚合相关的指标快速定位问题</strong>。运维人员发现问题后，可以通过告警将指标等相关的内容，聚合显示给开发人员，让开发人员快速定位到问题产生的根本原因，而不是像无头苍蝇一样在数据海里翻找。</p></li><li><p><strong>制定个性化的告警规则</strong> 。通过告警系统，无论你是业务的开发人员还是运维人员，都可以去根据数据来源制定自己的告警规则，而不仅是参考现有数据。<strong>开发人员可以自定义指标和内容进行告警，让告警和真正的实际业务结合起来</strong> ；<strong>运维人员也可以更好地管理和制定符合公司的服务指标监控</strong>。</p></li><li><p><strong>制定告警规范</strong>。告警的流程和规范是在告警之后运维和开发人员共同协定完成的，比如告警后的处理流程怎么样规范化，如何查看历史的错误情况以避免问题的再次发生。当数据确实产生了告警之后，运维和开发人员只需要遵循这样的规范，问题的处理也会变得快捷高效。</p></li></ol><h3 id="告警数据来源" tabindex="-1">告警数据来源 <a class="header-anchor" href="#告警数据来源" aria-label="Permalink to &quot;告警数据来源&quot;">​</a></h3><p>通过上面的介绍，相信你对告警的作用有了一个完整的认识。告警中的数据一般源于我们的监控系统。通过对数据的统一聚合计算、分析，到达一定阈值后告警会自动触发。</p><p>那告警有哪些数据来源？这是我下面会讲到的内容。我会以&quot;<strong>11 | 黑/白盒监控：系统功能与结构稳定的根基</strong>&quot;中的黑/白盒来对这些数据来源分类讲解，这样更能让你分清数据来源。如下图所示：</p>',11),l=t('<h4 id="黑盒" tabindex="-1">黑盒 <a class="header-anchor" href="#黑盒" aria-label="Permalink to &quot;黑盒&quot;">​</a></h4><p>在黑盒监控中，我们更偏向于以系统使用者，或者是对系统完全未知的状态下去观察整个系统，所以告警来源可以从<strong>端口状态</strong> 、<strong>证书检测</strong> 、<strong>服务探活</strong> 、<strong>拨测</strong> 、<strong>端到端的功能检测</strong>这几个方面入手，我们依次了解一下。</p><ol><li><p><strong>端口状态</strong> ：<strong>通过观测端口的运行情况快速感知到程序是否在真实地运行</strong>。当出现这类问题时，一般都会第一时间告警，因为在业务场景中，系统无时无刻不在和其他系统进行着通信操作，如果端口出现了问题，会造成很严重的后果。</p></li><li><p><strong>证书检测</strong> ：<strong>通过检测证书快速感知证书服务是否可用</strong>。现在 HTTPS 技术十分成熟，它能对数据起到很好的保护作用，可以说是一个网站的根基。现在的请求一般都是基于 HTTPS 的，如果证书出现问题时，应该及时处理，证书不可用会导致各个端上都无法发送和处理请求。</p></li><li><p><strong>服务探活</strong> ：<strong>保证业务系统或者第三方组件处在可用状态</strong>。如果处在不可用状态，可能是端口存在，但是服务一直处在&quot;假死&quot;的状态，这一般是在和一些第三方组件交互时出现问题导致的。</p></li><li><p><strong>拨测</strong> ：<strong>目前互联网中都会有的一个服务质量的检测工具</strong> 。通过多个不同地区的节点打开网站，从而获取不同地区对网站的访问速度。这其中就包含了我之前在&quot;<strong>05 | 监控指标：如何通过分析数据快速定位系统隐患？（上）</strong>&quot;中介绍的端上访问的通用指标。假如拨测时发现某些地区访问我们网站会出现拦截、禁止访问等状态，这时就需要运维人员去和相关地区的服务商联系，看是哪里出现了问题。</p></li><li><p><strong>端到端功能检测</strong> ：<strong>通过场景、流程化的方式调用业务，检测业务是否处在可用的状态</strong>。它是基于我们业务功能的检测机制，一般会有专门的测试开发团队来完成。如果端到端功能检测显示某个操作有问题，说明在业务场景中，用户执行这个操作时会出现问题。通过端到端的检测，开发人员可以快速定位到问题的具体操作流程，甚至可以深入到接口级别。此时再结合白盒中的数据，可以快速定位到问题的产生原因。</p></li></ol><p>黑盒中的告警大部分运维人员接触比较多，也有像端到端的检测方案是需要业务人员接入的。当出现黑盒类型的告警时，一定要第一时间恢复，因为它们和真实的业务关联最为严密。虽然一般不会出现太多的问题，但如果出现了问题都是比较严重的问题，比如端口问题会导致整个服务不可用，拨测告警证明某些地区存在无法访问的问题。</p><h4 id="白盒" tabindex="-1">白盒 <a class="header-anchor" href="#白盒" aria-label="Permalink to &quot;白盒&quot;">​</a></h4><p>白盒监控是在业务系统中是最为常用的。在白盒监控中，数据来源相对较多，但基本都逃不出我之前在可观测中讲到的 3 个组成部分：日志、指标、链路追踪。通过这 3 个部分，你可以全面并且完整地了解到告警的内容和问题产生的原因。在排查问题时，通常都是将白盒作为查看问题和指出错误原因的重要方式。</p><h5 id="日志" tabindex="-1">日志 <a class="header-anchor" href="#日志" aria-label="Permalink to &quot;日志&quot;">​</a></h5><p>日志应该是开发人员在发生故障后第一个想到的内容。日志中通常记录着当时的异常堆栈信息，开发人员一般也会在异常时把当时相关的参数信息，或是数据流转时的关键数据记录下来。发生错误的时候，可以将链路追踪中的数据内容和每个应用节点中的日志内容结合起来查看。</p><p>在真实的场景中，我们一般会将日志文件收集到统一的日志平台，并且提供十分方便的查询能力，比如通过日志内容和关键词来搜索。通过在收集过程中筛选或者收集后检索，我们可以对符合条件的日志内容进行告警。</p><h5 id="统计指标" tabindex="-1">统计指标 <a class="header-anchor" href="#统计指标" aria-label="Permalink to &quot;统计指标&quot;">​</a></h5><p>统计指标可以说是监控告警中的重中之重。在之前的课时中，我对指标做了很详细的介绍。告警的大部分数据都是源于统计指标，比如 MySQL 调用耗时，这一指标的增加会对数据查询造成影响。通过统计指标可以很清晰地看到当前实时的运行情况，无论是接口耗时，还是流量情况，都可以参考我在&quot;<strong>11 课时</strong>&quot;讲到的黄金指标。</p><p>在真实的场景中，我们一般会将统计指标聚合到一个系统中，然后设定一定的阈值规则来告警。比如我们可以把接口的 HTTP 请求时间超过 1s 认定为一个规则，当请求时间超过 1s 时系统就会自动告警。当然，实际操作时会比这个复杂，我会在下一课时对这部分重点介绍。</p><h5 id="链路追踪" tabindex="-1">链路追踪 <a class="header-anchor" href="#链路追踪" aria-label="Permalink to &quot;链路追踪&quot;">​</a></h5><p>最后介绍可观测系统中三大支柱的最后一个，链路追踪。它可以帮助我们在分析问题时，从全局的角度来审视整个链路，确认具体是哪个环节中出现了问题，具体的产生原因是什么。</p><p>同我在&quot;<strong>10 | 链路分析：除了观测链路，还能做什么？</strong>&quot;这一课时中所讲的一样，在白盒中，链路追踪也可以分析出服务、实例、端点这 3 个维度的指标。它们可能是基于操作名称，也可能是基于某个 tag 值，我们可以通过这些方式进行检索。</p><p>在真实的场景中，我们一般会采取和统计指标相同的策略，即设定阈值。对于符合某些阈值的数据查询出相关的链路数据，再告知具体的业务开发人员进行优化。比如某个 HTTP 接口出现了大量的 500 错误，此时就需要检索出这个接口中出现 500 错误的链路数据，并且将数据信息统一告警告知给业务开发人员来处理。</p><h3 id="故障分类" tabindex="-1">故障分类 <a class="header-anchor" href="#故障分类" aria-label="Permalink to &quot;故障分类&quot;">​</a></h3><p>了解了告警的数据来源之后，我们来看一下当告警出现后，通常有哪几类故障。</p><p>将故障分类可以帮助运维人员和开发人员，根据不同的故障类型选择不同的处理方案，也可以根据不同的类型来制定更有针对性的告警阈值。一般来说，故障可以分为<strong>错误</strong> 、<strong>延迟</strong> 、<strong>流量</strong> 和<strong>资源</strong>这 4 个类别，我们依次了解下。</p><ol><li><p><strong>错误类</strong> ：<strong>某个组件、服务或者接口出现执行错误</strong>。这类错误比较直观，一般日志中都会有对应的错误详情。但需要注意的是，错误类的故障有时只能代表表象，并不能代表真正发生的原因。比如接口执行超时，此时就需要更细致地观察这个执行链路里下游的延迟原因。</p></li><li><p><strong>延迟类</strong> ：<strong>服务之间的通信耗时，或者是服务本身的耗时</strong>。这类错误一般需要结合具体的内容来看，比如 MySQL 出现了慢 SQL，此时就需要定位具体的 SQL 再进行优化。如果突然出现类似的告警，通常是系统出现问题的前兆，要多加注意。</p></li><li><p><strong>流量类</strong> ：<strong>服务本身所承担的访问压力</strong>。一般这一类型的故障更多的说明的是目前产生的现象，通过这些我们可以看到当前服务的请求情况，比如 QPS 突然的大幅下跌上涨，服务调用量突然掉到 0。</p></li><li><p><strong>资源类</strong> ：<strong>组件或者基础服务中的资源使用情况</strong>。通过这部分数据，我们可以看出是哪些资源出现了问题，再然后寻找问题的原因，比如机器中的 CPU 使用率突然升高，我们可以去 CPU 中寻找；Dubbo 中的执行线程数突然增多，我们可以去查看是否有请求堆积。</p></li></ol><p>通过这 4 个故障分类，我想你应该也可以将你所遇到故障划分到这几类中。但你在划分的时候也许会遇到一个问题，就是这 4 类故障通常不会单独出现，很多时候会彼此之间组合发生。比如表象上是某个接口出现了高延迟的现象，但底层的原因可能是某个系统的资源数使用不足导致的。</p><p>你觉不觉得它和我在&quot;<strong>11 课时</strong>&quot;中讲到的黄金指标类似？黄金指标分为错误、延迟、流量和饱和度，其实我们在告警时也是基于这几类指标展开的。</p><h3 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h3><p>通过这一课时的学习，我相信你对监控告警有了一个感性的认识。前面我带你了解了我们为什么需要告警，告警的数据可能从哪里来，告警一般可以分为几类。那你在生产环境中遇到过什么样棘手的告警呢？它们又都是什么类型的故障呢？欢迎你在留言区分享。</p><p>下一节，我将带你了解怎么样创建更好的告警规则，保证告警的质量。</p>',25);function i(_,h,d,c,u,q){const o=s("Image");return n(),a("div",null,[p,g(o,{alt:"图片5.png",src:"https://s0.lgstatic.com/i/image/M00/4C/48/CgqCHl9XUfOAGsMiAADIVAIT-XA746.png"}),l])}const P=r(e,[["render",i]]);export{b as __pageData,P as default};
