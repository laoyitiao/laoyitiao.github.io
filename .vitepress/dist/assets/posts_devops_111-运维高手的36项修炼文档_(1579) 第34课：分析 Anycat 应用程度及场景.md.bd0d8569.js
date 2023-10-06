import{_ as e,j as c,o,g as _,k as a,s as t,h as n,Q as l}from"./chunks/framework.b3d8e22e.js";const V=JSON.parse('{"title":"单播、组播、广播 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/devops/111-运维高手的36项修炼文档/(1579) 第34课：分析 Anycat 应用程度及场景.md","filePath":"posts/devops/111-运维高手的36项修炼文档/(1579) 第34课：分析 Anycat 应用程度及场景.md","lastUpdated":1696417798000}'),p={name:"posts/devops/111-运维高手的36项修炼文档/(1579) 第34课：分析 Anycat 应用程度及场景.md"},i=t("p",null,"在前面的课程里我们有提过 Anycast 这个概念，本课时我们来重点讲解一下什么是 Anycast，它的优势是什么以及对应的案例介绍。",-1),d=t("h3",{id:"单播、组播、广播",tabindex:"-1"},[n("单播、组播、广播 "),t("a",{class:"header-anchor",href:"#单播、组播、广播","aria-label":'Permalink to "单播、组播、广播"'},"​")],-1),A=t("p",null,"在讲 Anycast 之前，我们先来了解一下网络通信里常见的几种通信形式。",-1),h=t("p",null,"第一种通信模式就是单播，单播是一对一的通信模式，两个实体之间相互间通信，如下图所示：",-1),r=t("p",null,"在这张图中，会看到有多个圆圈，每个圆圈代表一个实体，红色和绿色圆圈之间的箭头表示红色和绿色在进行一对一的通信。单播是在网络协议或服务里大多会采用的一种传播方式，这个是非常常见的。举个例子，这种形式就好比一个人和另外一个人在进行对话。",-1),g=t("p",null,"第二种通信模式就是组播，组播是一对多的模式，通过使用一个组播地址将数据在同一时间以高效的方式发往处于 TCP/IP 网络上的多个接收者。我们看到下面这张图：",-1),y=t("p",null,'可以看到，图中有一个红色的节点，它同时发给了三个绿色的实体节点，这就是组播的通信形式。这种模式就好比你在大街上大喊一声"美女"，这个时候就会有一大群女性回头看你。',-1),m=t("p",null,"第三个通信模式就是广播，它属于一对所有的模式，广播里的每一台主机发送出去的信号都会无条件的复制和转发，通常这种使用模式需要限制在局域网内部进行应用。好比今天公司发一个通知，告诉大家全体可以休息半天，所以大家都会比较高兴。",-1),S=t("h3",{id:"任播",tabindex:"-1"},[n("任播 "),t("a",{class:"header-anchor",href:"#任播","aria-label":'Permalink to "任播"'},"​")],-1),C=t("p",null,"接下来我们来讲任播是什么样子的。首先我们来总结一下单播和组播。对于单播来说，我们会发现网络地址和网络节点是一对一的关系，通信也是一对一的关系。而组播和广播就不一样，它们的网络地址和对应的网络节点存在一对多的关系，并且通信过程也是一对多的关系，接收者有多个节点，并且同时进行通信。",-1),D=t("p",null,[n("任播则区别于单播和组播，它则是网络地址和网络节点有一对多的关系，但在通信过程中却保持着一对一的关系，"),t("strong",null,"注意，这里是指在同一时刻的时候，保持一对一的关系，所以它结合了单播和组播两者的特点"),n("。网络地址和网络节点存在一对多的关系，但是通信过程中却保持着一对一的关系。任播模式通常应用在更大范围或者全局性网络架构中，大公网或者大规模网络架构中才应用到的一种任播方式。")],-1),u=l('<p>了解了它的接入模式之后接下来我们来具体介绍一下任播的优势。任播的优势是这样的：</p><p>第一个优势是就近访问，它提高了访问的速度。因为它可以有多组接入地址，用户可以基于接入的入口，选择最近的接入节点，从而减少用户请求上的延迟。</p><p>第二个优势就是它分担流量，提供了负载均衡的功能，因为任播同时有多种接收地址，那么不同地区的用户可以选择不同地区的接入节点，这样就分担了负载流量。</p><p>第三个优势就是容灾调度了，因为同样是有多组地址，结合 BGP 一些全局路由的动态协议，这时如果单个节点出现了故障，就能够动态地进行容灾，切换到其他的正常结点。</p><p>第四个优势在于它能够防止大流量攻击，我们知道在企业中想要在后端来防止这种大流量攻击是比较难的。即使是做流量清洗也有一定的局限性，更需要基于一套全局性的负载均衡，在接入用户更贴近的一层使用anycast就能够有效地防御，并阻止大流量的攻击。</p><p>接下来我们结合它的优势来介绍一个 Anycast 的应用案例。</p><h3 id="anycast-应用案例介绍" tabindex="-1">Anycast 应用案例介绍 <a class="header-anchor" href="#anycast-应用案例介绍" aria-label="Permalink to &quot;Anycast 应用案例介绍&quot;">​</a></h3><p>第一个应用案例是在局域网内部自建一套分布式 DNS 系统。在公网 DNS 同样也可以结合 Anycast +BGP 来做 DNS 的公网分布式系统，在公网更多的企业会选择购买一些第三方服务，局域网的 DNS 系统和公网的 DNS 这两套系统和anycast结合模式，它们在原理上几乎是一致的。</p><p>我们来介绍一下在局域网内部自建这套 Anycast，结合 OSPF 的方式来构建一个分布式的 DNS 系统。那么为什么要选择 DNS 系统？我们知道，DNS 是企业的核心业务应用，如果 DNS 出现了故障，那么企业里面的绝大部分业务都会受到影响，所以我们要尽量减少 DNS 的压力，把 DNS 做到分布式，同时利用 Anycast 这种全局性的负载均衡允许用户就近进行接入，同时又结合 OSPF 这种最短路径优先的协议，使得它不仅能够提供网络中的动态路由，还能够实现给用户节点分配最短有效请求路径。</p><p>我们来看下面这张图：</p>',10),N=t("p",null,"在这张图中，我们把一个企业的 DNS 系统部署三套服务端，都可以同时提供域名解析的服务，分别有 A、B、C 3 台，对外发布的地址都是 10.10.10.10（任播地址）。而在客户端的系统里配置它的 DNS 解析，只需要配置为这个对外发布的 Anycast 接入地址（10.10.10.10）。",-1),P=t("p",null,"在用户和服务端进行通信的时候，中间会经过路由设备及核心设备，这个路径在用户角度可选择三条访问路径，都可以去请求后端的 DNS 服务，对于用户来说，他只需要请求这个地址就好了，但是实际上，通过网络层的 Anycast 接入，结合 OSPF，就实现用户可以在三条接入路径里面判断出一条和用户最近的接入路径，这个时候用户就通过最短的这条路径，去请求 DNS 服务。如果这条 DNS 出现了故障，同时结合 OSPF 服务的容灾能力，动态感知路由的能力来同时更新这个路由模式，使得用户在请求服务端的时候，可以通过其他两条路径去进行请求，这样同样不会影响用户的访问。",-1),B=t("p",null,"这就是在局域网内部构建一个分布式 DNS 系统的案例介绍。另外一个案例介绍围绕业务系统介绍，常见的有一些全球游戏业务，通常游戏的业务模式是分布在全球的，并且要求通信很低的延迟，从而让用户有很好游戏体验。另外，游戏的服务商通常也容易成为黑客以及一些黑产的攻击对象，通常会发起 DDOS 的流量攻击，所以通常需要考虑结合全局性的 Anycast 进行接入。",-1),f=t("p",null,"我们来看下面这张图：",-1),T=t("p",null,"假设这里面有一个游戏业务，并且它覆盖到全球的用户，那么可以对外发布的 Anycast IP 为 100.100.100.100 这个 IP，同时在四个地区：香港、美西、日本还有韩国来发布，那么不同地区的用户都是访问这个地址，由于是 Anycast 的任播地址，运营商这一层自动接入到了最近节点，如香港用户接入香港的接入节点，接入到香港节点以后，然后数据链路走到公司自己内部的骨干专线网线路，使得用户可以走最优的一段路径，通过公司内部的跨国界骨干网方式实现降低延迟、增强数据包安全性，最后直接访问到后端的服务节点。",-1),q=t("p",null,"这样的模式就使得用户能够通过选择最短的路径，同时结合 BGP 协议走到自己的核心骨干网链路里。",-1),b=t("p",null,"在这种模式，同样结合了 Anycast+ BGP 协议，大公司（像国内的 BAT ）通常选择自建自己骨干网专线网，而小公司需要使用第三方服务，或者是购买公有云的服务，来方面的获取 Anycast + 骨干网接入能力。",-1);function k(v,x,F,H,I,M){const s=c("Image");return o(),_("div",null,[i,d,A,h,a(s,{alt:"图片1.png",src:"https://s0.lgstatic.com/i/image/M00/26/C2/CgqCHl7y7AaAWhCJAADaSjK7P-4901.png"}),r,g,a(s,{alt:"图片2.png",src:"https://s0.lgstatic.com/i/image/M00/26/C2/CgqCHl7y7BeAPQ_tAAEXgA5hLBQ539.png"}),y,m,a(s,{alt:"图片3.png",src:"https://s0.lgstatic.com/i/image/M00/26/B7/Ciqc1F7y7CWADPR8AAFAo4N1AMU000.png"}),S,C,D,a(s,{alt:"图片4.png",src:"https://s0.lgstatic.com/i/image/M00/26/C2/CgqCHl7y7C6ATeCAAAFmj3UsAXs135.png"}),u,a(s,{alt:"图片5.png",src:"https://s0.lgstatic.com/i/image/M00/26/C2/CgqCHl7y7DeASsvgAAHdnr6HsEg948.png"}),N,P,B,f,a(s,{alt:"图片6.png",src:"https://s0.lgstatic.com/i/image/M00/26/C2/CgqCHl7y7D-Adho3AAE5bgT68nk297.png"}),T,q,b])}const E=e(p,[["render",k]]);export{V as __pageData,E as default};
