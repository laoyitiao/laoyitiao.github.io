import{_ as a,o as l,g as o,Q as p}from"./chunks/framework.b3d8e22e.js";const b=JSON.parse('{"title":"分级 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/分布式链路追踪实战_文档/(4335) 14  告警处理：怎样才能更好地解决问题？.md","filePath":"posts/backEnd/分布式链路追踪实战_文档/(4335) 14  告警处理：怎样才能更好地解决问题？.md","lastUpdated":1696338709000}'),r={name:"posts/backEnd/分布式链路追踪实战_文档/(4335) 14  告警处理：怎样才能更好地解决问题？.md"},t=p('<p>上一节，我带你了解了怎样创建告警规则并保证其质量。假如说制定规则是事前的准备工作，那么在这一节，我将介绍的告警处理则是事中和事后。由此，告警就形成了一个闭环。</p><p>接下来我会依次按照分级、内部系统结合、告警与人员、处理流程这 4 个方向来介绍告警处理。</p><h3 id="分级" tabindex="-1">分级 <a class="header-anchor" href="#分级" aria-label="Permalink to &quot;分级&quot;">​</a></h3><p>在介绍告警处理之前，我先讲一下分级。我们一般会将告警和故障按照重要程度做一个分级。我们依次来看一下。</p><h4 id="告警分级" tabindex="-1">告警分级 <a class="header-anchor" href="#告警分级" aria-label="Permalink to &quot;告警分级&quot;">​</a></h4><p><strong>告警分级是在告警规则和告警处理中一个比较关键的概念</strong>。如果一个系统中所有的告警都是同一个级别，那么出现问题时，可能会同时出现很多的告警。告警没有分级不光会造成告警过多，还会让你无法区分优先级，无法优先处理重要的问题。</p><p>告警等级和我们在日志中常见的几个等级类似，以拉勾为例，我们目前总共有 3 个等级。</p><ol><li><p><strong>warning</strong>：警告级别。起到简单的通知作用，说明系统当前确实存在一定的错误内容。</p></li><li><p><strong>problem</strong>：问题级别。此时可以认定系统出现了问题，甚至是引发了线上的某些问题，需要及时地修正。</p></li><li><p><strong>critical</strong>：重要级别。此时系统已经出现了较为严重的错误，造成线上大面积的不可用。</p></li></ol><p>通过这三种级别，我们在拉勾就可以在设置告警时将问题分级。不同的等级会有不同的解决方式，相应的处理流程也会有所改变。</p><h4 id="故障分级" tabindex="-1">故障分级 <a class="header-anchor" href="#故障分级" aria-label="Permalink to &quot;故障分级&quot;">​</a></h4><p>在告警分级后，真正告警时，还有故障分级。不同的故障等级，会影响该故障的参与人数和处理流程。在拉勾中，同样也分为 3 个等级，低等级的故障会因为情况的不同而升级。</p><ol><li><p>事件单：通常指出现告警或者故障时，相对比较容易处理的问题，一般和告警分级中的 warning 级别对应。</p></li><li><p>问题单：如果某个事件内容持续出现，并且并没有被处理，事件单就会升级为问题单，然后进一步通知开发人员，直到开发人员的 TL。在告警规则中，problem 级别的告警会直接被认定为问题单。</p></li><li><p>故障单：如果指定的问题依旧没有被处理，此类任务就会再次升级为故障单。故障单一般是系统出现了严重错误，此时影响面相对较广，需要更多的人来参与到问题的处理，及时修复问题。这和告警分级中的 critical 相互对应。</p></li></ol><p>故障的等级不只是由告警分级来判断，也可能是由于长时间没有处理导致的故障升级。公司的开发人员需要意识到，即便是再小的问题也需要有人及时处理。如果问题确实不那么重要，可以考虑增加告警规则的阈值或是干脆关掉这个问题的告警。</p><p>不忽略任何一个细小的问题，只有这样，才能全面提高每一个开发人员的告警及时响应意识。在后面我也会对故障分级的通知方式，处理流程做更多的讲解。</p><p>分级的理念在告警中十分重要，针对不同的告警选择不同的处理方式可以极大地提高问题处理的效率。我也会在后面的内容里反复提到这一点，以加强你对这一概念的印象。</p><h3 id="与内部系统结合" tabindex="-1">与内部系统结合 <a class="header-anchor" href="#与内部系统结合" aria-label="Permalink to &quot;与内部系统结合&quot;">​</a></h3><p>介绍完告警和故障分级，我再将告警系统与内部系统结合来讲。</p><p>一个成熟的团队中，肯定不光有告警系统，还会有很多其他系统，比如上线系统、资产管理系统，这些系统会一起组成一套完整的技术运营平台。一个系统除了自身的功能之外，还要和内部的其他系统相结合，和其他系统共同协作，才能发挥出更多的作用。在告警系统中，我们通常会考虑以下 3 部分内容：<strong>CMDB 集成</strong> 、<strong>通知方式</strong> 、<strong>通知内容</strong>。</p><h4 id="cmdb-集成" tabindex="-1">CMDB 集成 <a class="header-anchor" href="#cmdb-集成" aria-label="Permalink to &quot;CMDB 集成&quot;">​</a></h4><p><strong>CMDB 系统又称为配置管理，它负责存储在 IT 公司中设备的各种信息，比如服务信息、主机信息</strong>。对此系统的介绍有很多，你可以查阅相关的资料，我就不多加赘述。</p><p>这里我主要讲一下告警系统是怎样和它集成的。</p><p>某个服务出现问题时，可以依据 CMDB 中的服务负责人找到对应的开发人员。以刚才提到的服务信息和主机信息为例，告警体系中很多的告警原因都是基于服务或是基于主机的，所以它们会比较重要，我们也会针对某个服务，或是某个主机中的某些信息来进行告警。</p><p>在主机或者服务的配置中，我们一般会录入相关的负责人，比如我负责的拉勾教育，在服务的负责人就包含我和两位运维负责人。当拉勾教育程序出现 HTTP 错误告警时，告警系统就会通过 CMDB 中的服务信息寻找到我和运维负责人，然后依据人员列表，用短信或是其他的形式通知。</p><p>分级是一个成熟的技术团队一定会考虑到的事情，良好的分级可以让问题处理起来事半功倍。在拉勾内部，CMDB 中服务分为 5 个重要等级。重要业务的模块，比如业务的接入服务、基础中的主要流量服务，都可以给出较高的重要等级；对于一些访问量较低，甚至不会影响线上业务的服务则会给较低的重要等级。</p><p>基于这样的概念，也可以将它与告警相结合，比如当 CMDB 中 3 星级以上的服务出现警告级别的告警时，会同时通知项目的主要负责人和负责人的上级，让团队内的人员一同来处理问题。</p><h4 id="通知方式" tabindex="-1">通知方式 <a class="header-anchor" href="#通知方式" aria-label="Permalink to &quot;通知方式&quot;">​</a></h4><p>提到了告警，自然会有如何通知告警这个问题。触发告警，确认联系人后，根据分级的理念，需要根据不同的故障分级选取不同的通知方式，让开发同学感知到风险的等级，最后体现在处理的优先级上。</p><p>依据故障分级的不同，也有不同的通知方式，我们逐一来看。</p><ol><li><p>事件单：当事件单触发后，一般只会通过企业内的沟通协作软件通知，比如常见的钉钉、飞书、企业微信。</p></li><li><p>问题单：此时可能需要用到短信的形式通知相关人员，对比较重要的服务可能会采用电话的形式联系相关的通知人员。</p></li><li><p>故障单：告警系统会电话联系相关的负责人，并且将此服务的主要负责人和运维相关负责人主动拉入线上的群中，让大家共同解决此问题。</p></li></ol><p>通知方式的分级处理可以让团队内的人员根据通知方式的不同了解到问题的严重性。和故障升级一样，如果一段时间内，相关的负责人没有及时解决，同样会对问题的通知方式进行升级。比如在拉勾中，每隔一个小时会进行依次再告警。如果 1 小时未处理，则会进一步告知给对应负责人的直属 TL，2 小时未处理则告知给对应的隔级 TL，并以此规则向上推进，直到告知相关的产品线负责人甚至是 CTO。当然，不同公司的处理方式是不同的，这里仅供参考。</p><h4 id="通知内容" tabindex="-1">通知内容 <a class="header-anchor" href="#通知内容" aria-label="Permalink to &quot;通知内容&quot;">​</a></h4><p>告警提示给开发人员时，显示的内容也很重要。内容上要做到简洁，让通知人员能够快速得知是哪里出现了问题。这就要求尽量不要将告警做得过于复杂，否则在查看问题时可能会因为抓不到重点而拖慢问题的处理效率。</p><p>在告警时，我推荐按照这样的内容来展现：</p><ol><li><p>发生时间：告警发现时的确切时间。</p></li><li><p>发生错误的现象：此次告警主要是具体哪个指标出现了错误，阈值和当前的真实值分别是多少，具体受影响的是哪个服务等等信息。</p></li><li><p>错误详情：通过具体链接的形式，可以告知你如何持续跟进这个问题。一般会直接和当前相关的问题单挂钩，有时也会明确指出相关指标或者错误信息的详细链接，来进行更细一步的查看。</p></li></ol><p>按照这样的展现形式，可以帮助通知的人员了解故障的整体情况，快速响应问题。</p><h3 id="告警与人员" tabindex="-1">告警与人员 <a class="header-anchor" href="#告警与人员" aria-label="Permalink to &quot;告警与人员&quot;">​</a></h3><p>前期的问题处理完后，我们再来看告警处理的主体。</p><p>相关人员接收到告警之后，一般都会立即停下手中的事情，投入到问题的解决和修复中。但如果遇到告警就停下手中的事情，会很影响真正的业务迭代、开发进度。这一点，对于开发和运维团队都是一样的。</p><p>这里我会介绍在 <em><strong>Google SRE</strong></em> 这本书中提到的一种办法，on-call 轮值制度。通过轮值的方式，某一个时间段内只交给具体的某一个人去处理线上的问题，这样负责的人可以集中自己的注意力，也不会影响到其他开发人员的工作进度。我们来具体看一下这个制度讲了什么。</p><h4 id="on-call-人员" tabindex="-1">on-call 人员 <a class="header-anchor" href="#on-call-人员" aria-label="Permalink to &quot;on-call 人员&quot;">​</a></h4><p>一般每个团队中至少有一个人负责处理一段时间内的问题，这个时间可能是一天也可能是一周，一般由团队内部决定。这个人员需要了解一定的业务，可以找到问题原因。当出现问题时能够帮忙协助定位或者寻找相关的负责人，能跟进故障并解决问题。</p><p>一般在执行 on-call 时会提前安排好顺序，并规定好执行的时间。如果遇上非工作日，也要尽可能地保证通讯畅通，能够及时响应问题。如果有事，无法处理 on-call 的工作，需要提前和组内打好招呼，调整 on-call 的时间。</p><p>对于 on-call 人员，也需要有一定的补偿机制，如果处理问题花费的时间太长，则可以根据情况给予一定的调休、奖金补贴等。on-call 人员是人，不是冰冷的机器，让团队内的人员感受到温度，遇到问题时才会有更强的凝聚力。</p><h4 id="on-call-处理内容" tabindex="-1">on-call 处理内容 <a class="header-anchor" href="#on-call-处理内容" aria-label="Permalink to &quot;on-call 处理内容&quot;">​</a></h4><p>on-call 的开发或者运维人员，主要负责对生产环境中当前出现或即将出现的问题进行风险评估，并跟进问题、找出原因，最终解决问题。一般对于紧急的故障问题，要求 5 分钟内响应，非紧急的内容则是 30 分钟。</p><p>告警发生时，系统也会将告警内容一同发送给 on-call 工程师。on-call 工程师接收到内容之后，需要在规定时间内对产生的问题做出确认。如果有必要，可以联系其他工程师，一同来协助定位和解决问题。</p><p>问题出现后，如果当时轮值的人员是你，你就需要一直跟进问题直到结束整个流程，不能因为轮值的时间过了就甩手给其他人。因为你是一直跟进问题的人，你最终要将整个事件通过成文的形式记录到文档中，让后面的 on-call 人员遇到相似的问题时，可以找到类似的解决方案。</p><h3 id="处理流程" tabindex="-1">处理流程 <a class="header-anchor" href="#处理流程" aria-label="Permalink to &quot;处理流程&quot;">​</a></h3><p>告警处理的主体接收到告警后，就来到了告警该如何处理的问题上了。这就是我在接下来要讲的内容，处理流程。</p><p>告警发出之后，一般会涉及告警系统和人员处理，这也是在一个告警的事中和事后里，主要的参与者和处理者。</p><h4 id="告警系统" tabindex="-1">告警系统 <a class="header-anchor" href="#告警系统" aria-label="Permalink to &quot;告警系统&quot;">​</a></h4><p>告警系统主要负责跟进和记录整个告警流程，它一般有 5 个功能，分别是<strong>汇总数据</strong> 、<strong>可视化</strong> 、<strong>可操作性</strong> 、<strong>跟进日志</strong> 和<strong>可搜索性</strong>。</p><ol><li><p><strong>汇总数据</strong>：汇总此次告警中出现的所有相关数据，方便开发或者运维人员了解当时的情况，发现问题的原因，比如给出出错时的数据链路、相关统计指标和机器日志。</p></li><li><p><strong>可视化</strong>：通过可视化的形式将处理流程中的时间节点、操作人、内容等数据都展现出来。</p></li><li><p><strong>可操作性</strong>：对告警提供的故障单有一定的可操作性，比如确认问题状态，处理中还是处理结束，处理的内容是怎么样的。</p></li><li><p><strong>跟进日志</strong>：通过日志的形式展现每一步操作、跟进时间和处理进度，让后续的复盘或者问题跟进变得更加容易。</p></li><li><p><strong>可搜索</strong>：对每次出现的问题，都有可搜索的能力，比如针对具体指标中出现的问题，服务出现过的问题，都可以通过一定的关键字来检索到之前是否可能出现过，浏览过往的记录可以帮助开发和运维人员更好地解决问题。</p></li></ol><p>一个好的告警系统可以辅助开发或者运维人员发现问题，解决问题。无论是事前的观测、告警，事中的协助排查问题，还是事后的过程记录和汇总，将告警做到闭环，才是我们最终的目的。</p><h4 id="人员处理" tabindex="-1">人员处理 <a class="header-anchor" href="#人员处理" aria-label="Permalink to &quot;人员处理&quot;">​</a></h4><p>在人员处理上，一般我们会对故障的级别做出不同的响应、处理方式。这里主要对非重要级别和重要级别这两种不同的级别做说明。</p><h5 id="非重要级别告警" tabindex="-1">非重要级别告警 <a class="header-anchor" href="#非重要级别告警" aria-label="Permalink to &quot;非重要级别告警&quot;">​</a></h5><p>接收到非重要级别的告警后，一般要根据重要级别确认告警内容是由于短暂的问题导致的异常信息，还是会向更严重的级别发展。当天需要给出响应的解决办法，并跟进后续的改进。</p><p>在此次告警处理完成后，可以记录问题出现的原因和如何恢复的。对于此次告警，后续会有哪些改进措施来避免此类问题。</p><h5 id="重要级别告警" tabindex="-1">重要级别告警 <a class="header-anchor" href="#重要级别告警" aria-label="Permalink to &quot;重要级别告警&quot;">​</a></h5><p>对于重要级别的告警，首先要记住的就是，<strong>不要慌乱</strong>。如果一直保持在紧张的状态会影响你处理问题的效率。</p><p>此时，相关的项目负责人、on-call 值班人员和运维会聚集在一起，参与问题的处理。明确好每个参与人员在此次故障恢复中的作用是很重要的，一般可以有以下的两个比较关键的角色。</p><ol><li><p>事故总控负责人：负责把握此次故障的整体进度，协调人力资源来处理此次告警。在处理完成后汇总整体流程，完成最终的故障复盘、后续跟进等工作。一般来说，负责人是 on-call 值班人员、项目负责人或是运维负责人，他是整个故障中流程跟进最重要的人员。</p></li><li><p>问题处理团队：负责问题的整体处理，与总控人员在事件中都全程参与问题原因的发现和故障的解决。这个团队可能是相关业务的开发团队，也有可能是运维团队。</p></li></ol><p>在故障处理时，我们一般会遵循 5 个步骤，聚集、紧急恢复、发现、确认并处理、复盘。</p><ol><li><p><strong>聚集参与者</strong>：将相关的 on-call 值班人员、项目负责人、运维部分人员聚集到一起，无论是通过线上还是线下的方式，尽可能让大家可以保持联系，减少沟通时的成本。</p></li><li><p><strong>紧急恢复，保留现场</strong>：确认最近一段时间内相关的项目是否有上线，或者相关依赖或者组件有无更新的情况，如果有进行类似的行为则进行回滚操作，并且将服务中某台主机的服务进程进行快照操作，以保留现场，方便问题的排查，比如 Java 进程可以进行 jstack、jmap 等操作。一般大多数的错误可能都是由于上线时或者流量大导致的，大多时间都可以及时解决。</p></li><li><p><strong>发现原因</strong>：基于现场的数据，结合我们在可观测性中观察的链路、日志和指标数据，来帮助你发现问题的原因。</p></li><li><p><strong>确认解决方案并实施</strong>：发现问题的原因之后，就要对问题开始修复和处理了。一般来说，重要级别告警的问题都要当天紧急修复然后上线，如果无法解决，则要给出问题的解决办法和预计的修复完成时间。</p></li><li><p><strong>事故复盘</strong>：完成故障处理后，负责人要叫上所有参与人员，对故障进行一次复盘。在复盘时，要形成此次故障的故障单，留存并发送到相关的故障群中，吸取经验，为下一次出现类似的问题提供参考。</p></li></ol><p>在人员处理时，需要记录告警流程中的每一步，从而进行更好的复盘。在复盘时，则需要根据告警系统中的每一个时间节点、操作人员、操作内容等信息做更详细的分析，看是否有更好的优化空间。</p><p>最后复盘形成的故障单中，至少要包含以下几部分内容。</p><ol><li><p>发生时间：问题真正出现的时间点，可以通过查询相关观测数据获得。</p></li><li><p>发现时间：得知问题的时间点，无论是人员反馈还是系统报警。</p></li><li><p>结束时间：告警被处理完成的时间点，将这部分时间减去发生时间，可以得知此次故障范围总计的时长。</p></li><li><p>处理流程：由时间节点和处理内容构成，用于说明事件恢复的整体速度。在复盘时，我们可以在这里看出来哪里流程上还有优化的空间。</p></li><li><p>故障原因：用于描述此次问题发生的主要原因，可以结合告警系统中的数据内容来展示。</p></li><li><p>影响范围：本次故障会导致哪些地方的用户无法访问或是使用流程中有哪些阻碍。</p></li><li><p>后续改进措施：故障处理完成后，后续的跟进也很重要。这部分内容可以帮你了解如何避免类似的问题，如何更快地得知问题，如何降低其发生的概率，或者是如何从根本上解决。这里要列出相关的解决方案、处理人和处理事件节点。这是防止类似问题发生的关键步骤。</p></li></ol><h3 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h3><p>相信通过本课时的学习，你对怎么样更好地处理告警，有了一个新的认识。你所在公司在处理告警时有没有遇到过什么问题呢，你又是如何去解决的？欢迎你在留言区的分享。</p><p>至此，告警体系的讲解就告一段落了。从下一节开始，我将带你了解如何将可观测性运用到你的工作中，有哪些比较好的方案。</p>',71),i=[t];function n(e,s,h,c,d,g){return l(),o("div",null,i)}const u=a(r,[["render",n]]);export{b as __pageData,u as default};
