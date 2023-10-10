import{_ as l,j as p,o as s,g as n,k as e,h as t,Q as r,s as a}from"./chunks/framework.cfb14fe0.js";const A=JSON.parse('{"title":"23如何保障分布式系统的高可用性？（下）","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/Go 微服务实战 38 讲_文档/(3818) 23  如何保障分布式系统的高可用性？（下）.md","filePath":"posts/backEnd/Go 微服务实战 38 讲_文档/(3818) 23  如何保障分布式系统的高可用性？（下）.md","lastUpdated":1696682708000}'),i={name:"posts/backEnd/Go 微服务实战 38 讲_文档/(3818) 23  如何保障分布式系统的高可用性？（下）.md"},h=r('<h1 id="_23如何保障分布式系统的高可用性-下" tabindex="-1">23如何保障分布式系统的高可用性？（下） <a class="header-anchor" href="#_23如何保障分布式系统的高可用性-下" aria-label="Permalink to &quot;23如何保障分布式系统的高可用性？（下）&quot;">​</a></h1><p>在上一篇文章中，我们首先介绍了系统可用性的相关概念------系统故障的必现性以及系统可用性指标，然后还详细说明了两种常用于提高分布式系统可用性的设计------冗余设计和熔断设计。</p><p><strong>冗余设计</strong> 是通过多点部署的方式来提高系统的故障容错率，在故障发生时可以进行故障转移，从而避免单点故障，但它同样带来了多节点数据一致性的挑战，增加了系统设计的复杂性。<strong>熔断设计</strong>在服务提供方不可用时保护服务调用方的资源，减少服务调用方中无用的远程调用，但在系统出现瞬时巨量流量时却也无能为力。对此我们就需要使用限流设计和降级设计来保护服务提供方，进而保证服务提供方在大量访问流量冲击时依然能稳定提供服务。</p><p>因此接下来我们就详细介绍下其他高可用设计和方案，包括限流设计、降级设计、无状态设计和重试设计等，希望能进一步加深你对如何设计高可用分布式系统的理解。</p><h3 id="限流设计" tabindex="-1">限流设计 <a class="header-anchor" href="#限流设计" aria-label="Permalink to &quot;限流设计&quot;">​</a></h3><p>熔断设计保护的是服务调用者，即上游服务的可用性，对于下游服务提供者，考虑到自身服务实例的负载能力，同样需要限流设计保护自己不被过量的流量冲垮。一般来讲有以下的限流策略：</p><ul><li><p><strong>拒绝服务</strong>，把多出来的请求拒绝掉。一般来说，好的限流系统在经受流量暴增情况时，会暂时拒绝周期时间内请求数量最大的客户端，这样可以在一定程度上把一些不正常的或者是带有恶意的高并发访问挡在&quot;门外&quot;。</p></li><li><p><strong>服务降级</strong>，关闭或是把后端做降级处理，释放资源给主流程服务以支持更多的请求。降级有很多方式，一种是把一些不重要的服务给停掉，把 CPU、内存或是数据的资源让给更重要的功能；一种是数据接口只返回部分关键数据，减少数据查询处理链路；还有更快的一种是直接返回预设的缓存或者静态数据，不需要经过复杂的业务查询处理获取数据，从而能够响应更多的用户请求。</p></li><li><p><strong>优先级请求</strong>，是指将目前系统的资源分配给优先级更高的用户，优先处理权限更高的用户的请求。</p></li><li><p><strong>延时处理</strong>，在这种情况下，一般来说会使用缓冲队列来缓冲大量的请求，系统根据自身负载能力异步消费队列中的请求。如果该队列也满了，那么就只能拒绝用户请求。使用缓冲队列只是为了减缓压力，一般用于应对瞬时大量的流量削峰。</p></li><li><p><strong>弹性伸缩</strong>，采用自动化运维的方式对相应的服务做自动化的伸缩。这种方案需要应用性能监控系统，能够感知到目前最繁忙的服务，并自动伸缩它们；还需要一个快速响应的自动化发布、部署和服务注册的运维系统。如果系统的处理压力集中在数据库这类不易自动扩容的外部服务，服务弹性伸缩意义不大。</p></li></ul><p>限流设计最主要的思想是保证系统处理自身承载能力内的请求访问，拒绝或者延缓处理过量的流量，而这种思想主要依赖于它的限流算法。那接下来我们介绍两种常用的限流算法：漏桶算法和令牌桶算法。</p><p><strong>漏桶算法</strong>是网络世界中流量整形或速率限制时经常使用的一种算法，它的主要目的是控制数据进入系统的速率，平滑对系统的突发流量，为系统提供一个稳定的请求流量。如下图所示，水先流进漏桶（表示请求进入系统），而后以恒定速率流出（表示系统处理请求）。无论水龙头流入的水有多大，漏桶中的水总是以恒定的速率流出，这样就保证了系统不会处理超过自身负载能力的请求。当访问流量过大时漏桶中就会积水，如果水太多了就会溢出，此时溢出的请求将会被拒绝。当出现突发巨量流量时，溢出漏桶的请求也会被拒绝。</p>',9),_=a("p",null,"漏桶算法示意图",-1),d=a("p",null,"例如，系统中用户注册的瓶颈是 100 QPS，即 1 秒钟最多只能同时注册 100 人，如果注册人数过多就会出现未知的错误。此时就可以采用漏桶算法，保证每秒钟系统中同时注册的人数不超过 100 人。",-1),c=a("p",null,[a("strong",null,"令牌桶算法"),t(" 则是一个存放固定容量令牌的桶，按照固定速率往桶里添加令牌。桶中存放的令牌数有最大上限，超出之后就被丢弃。一般来说"),a("strong",null,"令牌桶内令牌数量上限就是系统负载能力的上限"),t("，不建议超过太多。当流量或者网络请求到达时，每个请求都要获取一个令牌，如果能够从令牌桶中获取到令牌，请求将被系统处理，被获取到的令牌也会从令牌桶中移除；如果获取不到令牌，该请求就要被限流，要么直接丢弃，要么在缓冲区等待（如下图所示）。令牌桶限制了请求流量的平均流入速率，令牌以一定的速率添加到桶内，只要桶里有足够的令牌，所有的请求就能流入系统中被处理，这能够应对一定程度的突发巨量流量。")],-1),u=r('<p>令牌桶算法示意图</p><h3 id="其他设计与方案" tabindex="-1">其他设计与方案 <a class="header-anchor" href="#其他设计与方案" aria-label="Permalink to &quot;其他设计与方案&quot;">​</a></h3><p>限流方案在处理巨量瞬时流量时，大多数时候会拒绝掉系统无法处理的过量流量，服务的处理能力并没有过多改变，这就可能会导致拒绝掉一些关键业务请求的尴尬情况发生。而<strong>降级设计</strong>能够暂时提高系统某些关键服务的处理能力，从而承载更多的请求访问，当然它会牺牲其他次要功能的资源。除了上述详细介绍的几个设计方案外，还有无状态、幂等性、超时、重试等多种提高系统可用性的设计方案，我们接下来就对它们一一介绍，但限于篇幅，这里就只进行简要的介绍。</p><h4 id="降级设计" tabindex="-1">降级设计 <a class="header-anchor" href="#降级设计" aria-label="Permalink to &quot;降级设计&quot;">​</a></h4><p>在应对大流量冲击时，可以尝试对请求的处理流程进行裁剪，去除或者异步化非关键流程的次要功能，保证主流程功能正常运转。</p><p>一般来说，降级时可以暂时&quot;牺牲&quot;的有：</p><ul><li><p><strong>降低一致性</strong>。从数据强一致性变成最终一致性，比如说原本数据实时同步方式可以降级为异步同步，从而系统有更多的资源处理响应更多请求。</p></li><li><p><strong>关闭非关键服务</strong>。关闭不重要功能的服务，从而释放出更多的资源。</p></li><li><p><strong>简化功能</strong>。把一些功能简化掉，比如，简化业务流程，或是不再返回全量数据，只返回部分数据。也可以使用缓存的方式，返回预设的缓存数据或者静态数据，不执行具体的业务数据查询处理。</p></li></ul><h4 id="无状态设计" tabindex="-1">无状态设计 <a class="header-anchor" href="#无状态设计" aria-label="Permalink to &quot;无状态设计&quot;">​</a></h4><p>在分布式系统设计中，倡导使用无状态化的方式设计开发服务模块。这里&quot;无状态&quot;的意思是指对于功能相同的服务模块，在服务内部不维护任何的数据状态，只会根据请求中携带的业务数据从外部服务比如数据库、分布式缓存中查询相关数据进行处理，这样能够保证请求到任意服务实例中处理结果都是一致的。</p><p>无状态设计的服务模块可以简单通过多实例部署的方式进行横向扩展，各服务实例完全对等，可以有效提高服务集群的吞吐量和可用性。但是如此一来，服务处理的性能瓶颈就可能出现在提供数据状态一致性的外部服务中。</p><h4 id="幂等性设计" tabindex="-1">幂等性设计 <a class="header-anchor" href="#幂等性设计" aria-label="Permalink to &quot;幂等性设计&quot;">​</a></h4><p>幂等性设计是指系统对于相同的请求，一次和多次请求获取到的结果都是一样的。幂等性设计对分布式系统中的超时重试、系统恢复有重要的意义，它能够保证重复调用不会产生错误，保证系统的可用性。一般我们认为声明为幂等性的接口或者服务出现调用失败是常态，由于幂等性的原因，调用方可以在调用失败后放心进行重新请求。</p><p>举个简单的例子，在一笔订单的支付中，订单服务向支付服务请求支付接口，由于网络抖动或者其他未知的因素导致请求没能及时返回，那么此时订单服务并不了解此次支付是否成功。如果支付接口是幂等性的，那我们就可以放心使用同一笔订单号重新请求支付，如果上次支付请求已经成功，将会返回支付成功；如果上次支付请求未成功，将会重新进行金额扣费。这样就能保证请求的正确进行，避免重复扣费的错误。</p><h4 id="超时设计" tabindex="-1">超时设计 <a class="header-anchor" href="#超时设计" aria-label="Permalink to &quot;超时设计&quot;">​</a></h4><p>鉴于目前网络传播的不稳定性，在服务调用的过程中，很容易出现网络包丢失的现象。如果在服务调用者发起调用请求处理结果时出现网络丢包，在请求结果返回之前，服务调用者的调用线程会一直被操作系统挂起；或者服务提供者处理时间过长，迟迟没返回结果，服务调用者的调用线程也会被同样挂起。当服务调用者中出现大量的这样被挂起的服务调用时，服务调用者中的线程资源就可能被耗尽，导致服务调用者无法创建新的线程处理其他请求。这时就需要超时设计了。</p><p>超时设计是指给服务调用添加一个超时计时器，在超时计时器到达之后，调用结果还没返回，就由服务调用者主动结束调用，关闭连接，释放资源。通过超时设计能够有效减少系统等待时间过长的服务调用，使服务调用者有更多的资源处理其他请求，提高可用性。但是需注意的是，要根据下游服务的处理和响应能力合理设置超时时间的长短，过短将会导致服务调用者难以获取到处理结果，过长将会导致超时设计失去意义。</p><h4 id="重试设计" tabindex="-1">重试设计 <a class="header-anchor" href="#重试设计" aria-label="Permalink to &quot;重试设计&quot;">​</a></h4><p>在很多时候，由于网络不可靠或者服务提供者宕机，服务调用者的调用很可能会失败。如果此时服务调用者中存在一定的重试机制，就能够在一定程度上减少服务失败的概率，提高服务可用性。</p><p>比如业务系统在某次数据库请求中，由于临时的网络原因，数据请求超时了，如果业务系统中具备一定的超时重试机制，根据请求参数再次向数据库请求数据，就能正常获取到数据，完成业务处理流程，避免该次业务处理失败。</p><p>使用重试设计的时候需要注意以下问题：</p><ul><li><p><strong>待重试的服务接口是否为幂等性</strong>。对于某些超时请求，请求可能在服务提供者中执行成功了，但是返回结果却在网络传输中丢失了，此时若重复调用非幂等性服务接口就很可能会导致额外的系统错误。</p></li><li><p><strong>服务提供者是否只是临时不可用</strong>。对于无法快速恢复的服务提供者或者网络无法立即恢复的情况下，盲目的重试只会使情况更加糟糕，无脑地消耗服务调用方的 CPU 、线程和网络 IO 资源，过多的重试请求甚至可能会把不稳定的服务提供者打垮。在这种情况下建议你结合熔断设计对服务调用方进行保护。</p></li></ul><h4 id="接口缓存" tabindex="-1">接口缓存 <a class="header-anchor" href="#接口缓存" aria-label="Permalink to &quot;接口缓存&quot;">​</a></h4><p>接口缓存是应对大并发量请求，降低接口响应时间，提高系统吞吐量的有效手段。基本原理是在系统内部，对于某部分请求参数和请求路径完成相同的请求结果进行缓存，在周期时间内，这部分相同的请求结果将会直接从缓存中读取，减少业务处理过程的负载。</p><p>最简单的例子是在一些在线大数据查询系统中，查询系统会将周期时间内系统查询条件相同的查询结果进行缓存，加快访问速度。</p><p>但接口缓存同样有着它不适用的场景。接口缓存牺牲了数据的强一致性，因为它返回的过去某个时间节点的数据缓存，并非实时数据，这对于实时性要求高的系统并不适用。另外，接口缓存加快的是相同请求的请求速率，这对于请求差异化较大的系统同样无能为力，过多的缓存反而会大量浪费系统内存等资源。</p><h4 id="实时监控和度量" tabindex="-1">实时监控和度量 <a class="header-anchor" href="#实时监控和度量" aria-label="Permalink to &quot;实时监控和度量&quot;">​</a></h4><p>由于分布式中服务节点众多，问题的定位变得异常复杂，对此建议对每台服务器资源使用情况和服务实例的性能指标进行实时监控和度量。最常见的方式是健康检查，通过定时调用服务提供给健康检查接口判断服务是否可用。</p><p>目前业内也有开源的监控系统 Prometheus，它监控各个服务实例的运行指标，并根据预设的阈值自动报警，及时通知相关开发运维人员进行处理。</p><h4 id="常规化维护" tabindex="-1">常规化维护 <a class="header-anchor" href="#常规化维护" aria-label="Permalink to &quot;常规化维护&quot;">​</a></h4><p>定期清理系统的无用代码，及时进行代码评审，处理代码中 bad smell，对于无状态服务可以定期重启服务器减少内存碎片和防止内存泄漏......这些都是非常有效的提高系统可用性的运维手段。</p><h3 id="小结" tabindex="-1">小结 <a class="header-anchor" href="#小结" aria-label="Permalink to &quot;小结&quot;">​</a></h3><p>虽然在分布式系统中，由于系统的复杂性，在很大程度上加大了服务错误的可能性，但是也有足够的方案保证系统可用性。</p><p>紧接着上一课时，这节课我们介绍了其他的提高分布式系统可用性的设计与方案，包括：</p><ul><li><p>限流设计如何保证系统能够承受着巨量瞬时流量的冲击；</p></li><li><p>其他设计与方案中的降级设计保障系统主要功能可用、接口缓存提高服务响应速率，等等。</p></li></ul><p>通过这两个课时的学习，相信你已经了解了可用性对分布式系统的重要性，以及常用的提高系统可用性的设计与方案。在系统运行过程中，无论是系统内部还是系统外部依赖都极可能出现故障导致不可用。在这种情况下，你就需要时时考虑在故障情况下如何保证系统的基本可用性，采用多种设计防止故障的产生或者在故障出现之后如何恢复和可用。希望在接下来的设计开发工作中，你能够有意识地想起这两个课时中介绍的高可用设计与方案，努力打造一个高可用的系统。</p><p>最后，你工作中遇到的分布式系统还有其他问题吗？你当时是如何解决的呢？采用了哪些高可用的设计？欢迎你在留言区和我分享。</p>',36);function g(q,m,b,P,f,k){const o=p("Image");return s(),n("div",null,[h,e(o,{alt:"图片2.png",src:"https://s0.lgstatic.com/i/image/M00/50/1F/CgqCHl9h0AqAfC4PAACNthY5lZQ664.png"}),t(),_,d,c,e(o,{alt:"图片3.png",src:"https://s0.lgstatic.com/i/image/M00/50/14/Ciqc1F9h0BaANqlVAACr8W_zBko547.png"}),t(),u])}const C=l(i,[["render",g]]);export{A as __pageData,C as default};
