import{_ as s,j as i,o as n,g as h,k as l,h as a,s as t,Q as o}from"./chunks/framework.cfb14fe0.js";const ht=JSON.parse('{"title":"第07讲：高可用系统架构设计","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/架构师的 36 项修炼/(24) 第07讲：高可用系统架构设计.md","filePath":"posts/backEnd/架构师的 36 项修炼/(24) 第07讲：高可用系统架构设计.md","lastUpdated":1696682708000}'),_={name:"posts/backEnd/架构师的 36 项修炼/(24) 第07讲：高可用系统架构设计.md"},c=t("h1",{id:"第07讲-高可用系统架构设计",tabindex:"-1"},[a("第07讲：高可用系统架构设计 "),t("a",{class:"header-anchor",href:"#第07讲-高可用系统架构设计","aria-label":'Permalink to "第07讲：高可用系统架构设计"'},"​")],-1),p=t("p",null,"本课时讲解高可用系统架构，如下图所示，本课时内容主要包括 3 个部分。",-1),r=o("",13),d=t("h2",{id:"故障处理流程和故障时间",tabindex:"-1"},[a("故障处理流程和故障时间 "),t("a",{class:"header-anchor",href:"#故障处理流程和故障时间","aria-label":'Permalink to "故障处理流程和故障时间"'},"​")],-1),u=t("p",null,"再看一般互联网应用的故障处理流程和故障时间的确定，如下图。",-1),A=t("p",null,"首先是故障的开始，故障的开始时间是客服报告故障的时间点，或者是监控系统发现故障的时间点，如果客服收到了投诉，说系统不可用，这个时候就开始计算故障时间。或者监控系统发现，用户访问量或者是订单量因系统故障而出现了大幅的下跌，那么监控系统监控到的故障时间点就是故障的开始时间。",-1),P=t("p",null,"确定了故障以后，就把故障提交给相关部门的接口人，接口人再把故障现象发送给相关的责任人，责任人接手故障后，进行故障排查和处理。处理完毕以后系统重新启动，或者是代码重新发布上线以后，重新确认系统指标正常或者是功能恢复正常，确认故障处理完毕，这个时间就是故障的结束时间。",-1),g=t("p",null,"我们刚才用来计算故障分的故障时间，就是用这个故障结束时间减去开始时间，就是故障时间。这个时间通常以秒为单位，故障处理整个过程是争分夺秒的。故障结束以后，通常要开一个故障复盘会，检讨故障产生的原因，亡羊补牢，避免下次出现类似的故障，同时也要对引起故障的原因进行责任划分，扣除相关责任者的故障分计入绩效考核。",-1),m=o("",10),b=t("p",null,"HTTP 重定向负载均衡的优点是它的设计比较简单，最简单的 HTTP 重定向负载均衡服务器，可能只需要几十行代码就可以完成。但是它的缺点是，用户完成一次访问需要两次请求数据中心，一次请求负载均衡服务器，一次是请求应用服务器；另一个问题是因为响应要重定向到真正的应用服务器，所以需要把应用服务器的 IP 地址暴露给外部用户，这样可能会导致安全性的问题。",-1),T=t("ul",null,[t("li",null,"DNS 负载均衡")],-1),C=t("p",null,"另一种实现负载均衡的策略是 DNS 负载均衡。我们知道浏览器访问我们数据中心的时候，通常是用域名进行访问，HTTP 协议则必须知道 IP 地址才能建立通信连接，那么域名是如何转换成 IP 地址的呢？就是通过 DNS 服务器来完成。当用户从浏览器发起发起 HTTP 请求的时候，他输入域名，首先要到 DNS 域名服务器进行域名解析，解析得到 IP 地址以后，用户才能够根据 IP 地址建立 HTTP 连接，访问真正的数据中心的应用服务器，那么就可以在 DNS 域名解析的时候进行负载均衡，不同的浏览器进行解析的时候，返回不同的 IP 地址，从而实现负载均衡。工作原理如下图所示。",-1),I=t("p",null,"目前主要的 DNS 服务商和 DNS 软件都支持 DNS 域名解析负载均衡。DNS 域名解析负载均衡的主要问题有两个方面。一方面它依然是要将 Web 服务器的 IP 地址暴露给浏览器，产生安全问题。另一方面，很多时候，DNS 域名解析服务器是在互联网应用系统之外的一个服务器，它由域名解析服务商提供，不在我们的控制范围之内，所以当我们的服务器不可用的时候，DNS 域名解析服务器并不知道，它依然会将用户请求分发过来。而且域名解析并不是每一次请求都进行解析的，即使我们去域名解析服务商的机器上去更新了域名解析对应的 IP 列表，这个更新也不会立即生效，依然会有大量的请求到达我们的应用服务器。那么这些已经宕机的、不可用的服务器就无法完成用户的需求，在用户看起来就是我们的系统不可用。",-1),N=t("p",null,"虽然 DNS 域名解析负载均衡有这样的一些问题，但是在实践中大型互联网系统几乎都使用域名解析负载均衡，主要原因是在于，这些大型互联网系统，比如像淘宝、Facebook、百度这些系统，根据域名解析出来的 IP 地址，并不是真正的 Web 服务器 IP 地址，是负载均衡服务器的 IP 地址，也就是说这些大型互联网系统，它们都采用了两级负载均衡机制，DNS 域名解析进行一次负载均衡解析出来的 IP 地址是负载均衡服务器的 IP 地址，然后由负载均衡服务器，再做一次负载均衡，将用户的请求分发到应用服务器，这样的话，我们的应用服务器的 IP 地址就不会暴露出去。同时由于负载均衡服务器通常是比较高可用的，也不存在应用程序发布的问题，所以很少有可用性方面的问题。",-1),S=t("ul",null,[t("li",null,"反向代理负载均衡")],-1),q=t("p",null,"负载均衡的另外一种实现是反向代理负载均衡。我们前面提到用户请求到达数据中心以后，最先到达的就是反向代理服务器。反向代理服务器，除了可以提供请求的缓存功能以外，还可以进行负载均衡，将用户的请求分发到不同的服务器上面去。反向代理是工作在 HTTP 协议层上的一个服务器，所以它代理的也是 HTTP 的请求和响应。而 HTTP 协议相对说来，作为互联网第七层的一个协议，它的协议比较重，效率比较低，所以反向代理负载均衡通常用在小规模的互联网系统上，只有几台或者十几台服务器的规模。工作原理如图所示。",-1),k=t("ul",null,[t("li",null,"IP 层负载均衡（四层负载均衡）")],-1),f=t("p",null,"如果规模再大一点的集群，通常就不会再使用反向代理服务器进行负载均衡。在七层网络通讯之下的另外一种负载均衡方法是在 IP 层进行负载均衡，IP 层是网络通讯协议的第四层，所以有时候叫四层负载均衡。它的主要工作原理是当用户的请求到达负载均衡服务器以后，负载均衡服务器会拿到 TCP/IP 的数据包，对数据包的 IP 地址进行转换，修改 IP 地址，将其修改为 Web 服务器的 IP 地址，然后把数据包重新发送出去。如下图所示。",-1),M=t("p",null,"因为 IP 地址已经是 Web 服务器的 IP 地址，所以这个数据包会重新路由到应用服务器上，以此来实现负载均衡。IP 层负载均衡，比我们刚才提到的工作在第七层的反向代理负载均衡效率要高得多。但是它依然有一个缺陷，就是不管是请求还是响应的数据包都要通过负载均衡服务器进行 IP 地址转换，才能够正确地进行数据分发，或者正确地响应到用户的客户端浏览器。请求的数据通常比较小，一个 URL 或者是一个简单的表单，但是响应的数据不管是 HTML 还是图片，JS、CSS 这样的资源文件通常都会比较大，因此负载均衡服务器会成为响应数据的流量瓶颈。",-1),D=t("ul",null,[t("li",null,"数据链路层负载均衡")],-1),x=t("p",null,"为了解决这个问题，将负载均衡的数据传输，再往下放一层，放到了数据链路层，实现数据链路层的负载均衡。在这一层上，负载均衡服务器并不修改数据包的 IP 地址，而是修改网卡的 MAC 地址。而应用服务器和负载均衡服务器都使用相同的虚拟 IP 地址，这样 IP 路由就不会受到影响，但是网卡会根据自己的 MAC 地址选择负载均衡发送到自己的网卡的数据包，交给对应的应用服务器去处理，处理结束以后，当他把响应的数据包发送到网络上的时候，因为 IP 地址没有修改过，所以这个响应会直接到达用户的浏览器，而不会再经过负载均衡服务器。工作原理如下图所示。",-1),V=t("p",null,"这种通信方式我们从上图看是一个三角形，所以也被形象地称为三角模式。数据链路层的负载均衡是目前大型互联网系统中使用得最多的负载均衡方案。在 Linux 内核中也支持数据链路层负载均衡，也就是说可以用一台 Linux 服务器去配置实现数据链路层负载均衡，通过负载均衡实现应用服务器的高可用。",-1),H=t("h2",{id:"数据库复制与失效转移",tabindex:"-1"},[a("数据库复制与失效转移 "),t("a",{class:"header-anchor",href:"#数据库复制与失效转移","aria-label":'Permalink to "数据库复制与失效转移"'},"​")],-1),E=t("p",null,"数据库的高可用要比应用服务器复杂很多，因为应用服务器是无状态的，请求可以分发到任何一台服务器去处理，而数据库上必须存储有正确的数据才能将请求分发给它。对于数据库的高可用，通常是使用数据库复制与失效转移来完成的。我们在分布式数据库存储这一讲中提到过 MySQL 的主主复制，以及 MySQL 的主从复制。",-1),B=t("p",null,"因为有数据复制，所以用户请求可以访问到不同的从服务器上，当某一台从服务器宕机的时候，系统的读操作不会受到影响，实现数据库读操作高可用。而如果实现了主主复制，那么当主服务器宕机的时候，写请求连接到另外一台主服务器上，实现数据库的写操作高可用，而数据库部署的时候，可以同时部署如下图所示这样的主主复制和主从复制，也就是实现数据库的读写都高可用。",-1),Q=t("h2",{id:"消息队列隔离",tabindex:"-1"},[a("消息队列隔离 "),t("a",{class:"header-anchor",href:"#消息队列隔离","aria-label":'Permalink to "消息队列隔离"'},"​")],-1),O=t("p",null,"系统高可用的另一种策略是使用消息队列实现异步解耦，即消息队列隔离。我们在分布式消息队列一讲中也提到过这种架构方式的高可用。",-1),L=t("p",null,"一方面，消息的生产者和消费者通过消息队列进行隔离，那么如果消费者出现故障的时候，生产者可以继续向消息队列发送消息，而不会感知到消费者的故障，等消费者恢复正常以后再去到消息队列中消费消息，所以从用户处理的视角看，系统一直是可用的。",-1),W=o("",18),y=t("h2",{id:"自动化监控",tabindex:"-1"},[a("自动化监控 "),t("a",{class:"header-anchor",href:"#自动化监控","aria-label":'Permalink to "自动化监控"'},"​")],-1),Z=t("p",null,"还有一种是自动化监控。系统在线上运行的时候，必须要实时的监控系统的各项指标，包括业务指标和技术指标。业务指标包括用户访问量、订单量、查询量这些主要的业务指标，技术指标包括 CPU、磁盘、内存的使用率等。通过这些指标可以实时监控业务是否正常，系统是否正常。如果指标不正常，通过监控报警的手段，通知相关的人员，还可以在自动化监控的基础上去，触发自动化的运维工具，进行自动化的系统修复。",-1),v=t("h2",{id:"预发布",tabindex:"-1"},[a("预发布 "),t("a",{class:"header-anchor",href:"#预发布","aria-label":'Permalink to "预发布"'},"​")],-1),G=t("p",null,"高可用运维的另一种手段是预发布。虽然在系统上线之前，系统在代码更新以后，要经过测试才会上线，但是还有一些情况在测试环境是无法复现的。比如对第三方服务的调用，数据库结构的变更，以及一些线上的配置参数变更等等，只有线上才能够发现。",-1),F=t("p",null,"但是一旦发布到线上以后，如果有这些问题，就会导致系统不可用，解决方法就是进行预发布。在线上的服务器集群里面有一台服务器，是专门的预发布服务器，这台服务器不配置在负载均衡服务器，也就是说外部的用户是无法访问到这台服务器的，但是这台服务器跟其它的应用服务器，使用的配置、连接的数据库、连接的第三方服务都是完全一样的，它是一个完全线上的一个服务器，而这个服务器只有内部的工程师才可以访问到。",-1),U=t("p",null,"在系统发布的时候，先发布到这台预发布服务器上，然后工程师通过域名绑定的方式，直接访问这台服务器，进行一些关键的业务操作，看系统是否正常。如果正常，那么就将代码同步到其它的服务器上，这时候外部服务器才能够访问到最新的代码。如果发现问题，那么就可以重新进行修复。这个问题虽然是线上的，但是并不会影响到外部用户的使用。预发布的工作原理如下图。",-1),X=t("br",null,null,-1),j=t("h2",{id:"灰度发布",tabindex:"-1"},[a("灰度发布 "),t("a",{class:"header-anchor",href:"#灰度发布","aria-label":'Permalink to "灰度发布"'},"​")],-1),w=t("p",null,"对于大型互联网系统，虽然有前面的各种保障措施，但还是可能发生上线以后用户报告出现故障，对于用户报告的故障或者监控到的故障，就需要对系统进行回滚到原来的代码，系统退回到前一个版本。但是对于大型互联网系统而言，它的服务器特别多，可能有数万台服务器，这个时候即使是进行系统回滚，也可能要花很长的时间。这段时间系统一直处于某种不可用的故障状态。",-1),J=t("p",null,"为了避免上述情况，大型互联网系统，会使用一种灰度发布的手段，也就是说每天都只发布一部分服务器，如果出现问题，那么只需要回滚这一部分服务器就可以。发布以后观察一天，第二天再发布一部分服务器。如果没有故障报告，那么就继续发布，如果有故障报告就进行回滚，减少故障的影响力和影响时间。灰度发布流程如下图。",-1),K=t("h1",{id:"总结回顾",tabindex:"-1"},[a("总结回顾 "),t("a",{class:"header-anchor",href:"#总结回顾","aria-label":'Permalink to "总结回顾"'},"​")],-1),R=t("p",null,"系统可用性是通过可用性指标来进行衡量的。当我们说一个系统 4 个 9 可用的时候，就是指这个系统 99.99% 的时间都是可用的，也就意味着一年中的不可用时间只占 53 分钟。",-1),$=t("p",null,"为了对故障进行管理和考核，很多互联网企业还引入了故障分这样一个手段。保障系统高可用的主要策略有应用服务器的负载均衡、数据库的备份与失效转移、消息队列隔离，限流、降级以及异地多活的多机房架构。",-1),z=t("p",null,"除了这些高可用的架构策略，还通过一系列的自动化手段，实现运维的高可用，包括自动化测试、自动化监控，预发布以及灰度发布这些手段。",-1),Y=t("p",null,"本课时内容至此结束，下一课时讲解系统的安全架构。",-1);function tt(at,et,lt,ot,st,it){const e=i("Image");return n(),h("div",null,[c,p,l(e,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/0A/CgotOV13NhmAVDZqAAKvYM6OQbU322.png"}),a(),r,l(e,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/89/EA/CgoB5l13NhqAQliEAAGwFa789CA502.png"}),a(),d,u,l(e,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/0A/CgotOV13NhqAWGCwAACuAh5Hf2k657.png"}),a(),A,P,g,l(e,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/2A/CgotOV13Tg6ASyqaAAMdZZQxLNA225.png"}),a(),m,l(e,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/2A/CgotOV13TjWAcbwLAAOWnFopnts060.png"}),a(),b,T,C,l(e,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/89/EA/CgoB5l13NhuAay7PAANuWKPiFK8545.png"}),a(),I,N,S,q,l(e,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/2B/CgotOV13TleAGkEbAAMjmfjdqT4222.png"}),a(),k,f,l(e,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/2B/CgotOV13ToGAOH4DAANP56h82n8245.png"}),a(),M,D,x,l(e,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/89/EA/CgoB5l13NhuABboPAANF16k_Zus646.png"}),a(),V,H,E,B,l(e,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/42/CgotOV13XS-ABhWJAAXmqw3pev8732.png"}),a(),Q,O,L,l(e,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/89/EA/CgoB5l13NhyAZztaAACvmUe0VZI668.png"}),a(),W,l(e,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/0A/CgotOV13NhyADh9_AACC0HK0g6k701.png"}),a(),y,Z,l(e,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/22/CgoB5l13XWCAMVCMAAXGZAuzLs8203.png"}),a(),v,G,F,U,l(e,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/23/CgoB5l13XaiAV3hlAAV3nLAn3Pg963.png"}),a(),X,j,w,J,l(e,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/89/EA/CgoB5l13Nh2AMDiGAAEHM7DJ1so485.png"}),a(),K,R,$,z,Y])}const _t=s(_,[["render",tt]]);export{ht as __pageData,_t as default};
