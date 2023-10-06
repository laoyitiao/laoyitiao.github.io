import{_ as e,j as n,o as i,g as _,k as a,Q as o,s as t,h as l}from"./chunks/framework.b3d8e22e.js";const W=JSON.parse('{"title":"学前知识 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/devops/111-运维高手的36项修炼文档/(1577) 第32课：浅析多可用区容灾、多活到两地三中心的架构.md","filePath":"posts/devops/111-运维高手的36项修炼文档/(1577) 第32课：浅析多可用区容灾、多活到两地三中心的架构.md","lastUpdated":1696417798000}'),c={name:"posts/devops/111-运维高手的36项修炼文档/(1577) 第32课：浅析多可用区容灾、多活到两地三中心的架构.md"},p=o("",8),r=o("",11),h=t("p",null,"所以，DNS 服务本身的高可用大企业通常会把自己的权威 DNS 分多个地域并结合 DNS 主从的高可用架构模式，如图DNS服务节点部署到不同地域的AZ（可用区），一个地域 AZ 中的 DNS 出现问题以后，其他地域的权威 DNS 仍能够正常进行解析，后端启用一套配置和数据服务源，主要用作配置文件、DNS 数据文件的同步分发。",-1),d=t("p",null,"大企业 DNS 服务更加要求支撑海量并发及抵抗 DDOS 等恶意攻击抵御能力，则会结合一些全局性的负载均衡方案，如本套课程课时 34 介绍的 Anycast，使用 anycast + DNS 分地域部署，从入口层打散用户的流量请求，并且根据 Anycast 的协议，实现动态的融灾，增强整体可用性。",-1),S=t("h3",{id:"dns-解析的高可用模式",tabindex:"-1"},[l("DNS 解析的高可用模式 "),t("a",{class:"header-anchor",href:"#dns-解析的高可用模式","aria-label":'Permalink to "DNS 解析的高可用模式"'},"​")],-1),A=t("p",null,"除了 DNS 服务本身的高可用模式外，接下来再讲一讲 DNS 解析的高可用模式。",-1),D=t("h4",{id:"轮巡的解析模式",tabindex:"-1"},[l("轮巡的解析模式 "),t("a",{class:"header-anchor",href:"#轮巡的解析模式","aria-label":'Permalink to "轮巡的解析模式"'},"​")],-1),g=t("p",null,"第一种需要介绍的就是 DNS 的解析模式也就是轮巡的解析模式，服务端给客户端同时返回多个 AZ记录的解析。这样的好处是可以降低提供访问服务端（RS1、RS2）的压力。",-1),m=t("p",null,"这种模式实现起来相对简单，我们只需要配置的同一个域名的多条 A 解析记录就可以实现。",-1),N=t("p",null,"缺点就是它是基于轮巡的模式来进解析，维度不能够做到更细致化，无法提供一个智能的，如：基于用户地域的流量解析模式。",-1),u=t("h4",{id:"智能-dns",tabindex:"-1"},[l("智能 DNS "),t("a",{class:"header-anchor",href:"#智能-dns","aria-label":'Permalink to "智能 DNS"'},"​")],-1),B=t("p",null,"如果考虑解决这样的问题，我们可以考虑使用的第 2 套方案-智能 DNS，它会动态地判断访问者的来源，根据不同的访问者的来源的 IP 地址和来分来了解他具体的地域，同时返回给用户针对地域特定的 IP地址。",-1),C=t("p",null,"如在这张图里面，我们会看到一个在广州的用户，在请求 DNS 的时候，DNS 会判断用户所在的区域，如果在广州的话，就会返回用户我们网站在广州部署的真实节点服务IP，这个时候用户拿到的 IP 就是请求广州的 AZ 可用区的后台服务。",-1),L=t("p",null,"同样，在北京的用户去请求 DNS 之后，返回的是北京这边真实的后台服务 IP 地址，这样就可以把不同地域的用户就调度到离用户最近的一组 AZ 服务节点上去，这样对于服务端而言，就可以尽可能地打散用户的请求，降低后台服务压力。对客户端而言，这可以降低用户的延迟，提高网站的访问体验。",-1),M=t("p",null,"智能 DNS 的美中不足之处在于需要自建难度较大，且成本也需要更大的投入，所以对于小企业可能会更多地采用一些第三方服务或者是一些公有的服务。",-1),y=t("p",null,[l("结合DNS的高可用再来讲讲AZ故障时候切换原理，单个可用区（AZ1），如图中假设对外网站服务域名是 "),t("a",{href:"http://www.jasonc.com",target:"_blank",rel:"noreferrer"},"www.jesonc.com"),l("，如果可用区 1（AZ1） 出现整体的故障，这个时候我就可以把这个域名解析成 2.2.2.2这个对外 IP 地址，用户就去请求 AZ2，这样就完成了通过 DNS 进行切换。")],-1),Z=t("p",null,"其实我们能遇到可用区 IDC 整个挂掉的可能性并不多，通常是一个可用区中内部有一部分服务出现问题，比如这张图里，假设内部中的 LB（负载均衡）调用我们的 DB（数据库），这里出现了问题，我们考虑通过 DNS 去做整体切换代价是比较大的，所以我们可以考虑需要在局部进行这样的切换，这时我们就可以通过 LB 切换到可用区 2（AZ2）中的 DB。",-1),Q=t("p",null,"这种设计需要在底层网络把多个可用区的 IP 在网络层进行多可用区的分发，使得 LB 能够在多可用区中动态地通过 VIP 的方式飘移，这个是在底层网络以及 LB 的设计里面需要去考虑的。",-1),P=t("p",null,"另外这里切换的例子中，对于数据库考虑如何保障数据的一致性，不会有数据的丢失，对于数据库这一层里它的高可用应该如何去设计，接下来我们拿 MySQL 进行举例讲解。",-1),I=t("h3",{id:"数据层-mysql-服务高可用设计",tabindex:"-1"},[l("数据层-MySQL 服务高可用设计 "),t("a",{class:"header-anchor",href:"#数据层-mysql-服务高可用设计","aria-label":'Permalink to "数据层-MySQL 服务高可用设计"'},"​")],-1),b=t("p",null,"这里我给你再介绍一下 MySQL 的一个主从同步原理，我们看到这样的一张图：",-1),q=t("p",null,"数据首先写入的是 MySQL 主库，主库除了把数据写入到库中，同时以 Binlog 方式记录日志。而从库只需要启动 IO 线程，IO 线程实现从主库里面取出 Binlog 日志，拿到本地以后，写到从库里面的 relay log，从库的另外一个 SQL 线程，SQL 线程是专门用来负责读取本地 relay log 的，并且在读取完以后会写入本地的数据库里。这样我们就可以看到 MySQL 的主从同步原理，就是通过 Binlog 的日志方式进行主从之间的数据同步。主库里面做了什么样的更改和写入操作，从库里通过 relay log 同时能够进行同步更改。",-1),f=t("h4",{id:"mysql-灾备模式",tabindex:"-1"},[l("MySQL 灾备模式 "),t("a",{class:"header-anchor",href:"#mysql-灾备模式","aria-label":'Permalink to "MySQL 灾备模式"'},"​")],-1),F=t("p",null,"MySQL 灾备模式也是基于这样数据同步机制应用在多AZ间，并作 MySQL 数据主从同步模式，我们来看这样一张图：",-1),x=t("p",null,"AZ2 里 DB 是主库，那么在 AZ1 的数据库为从库。正常服务时数据往主 AZ2的数据库里面写入或者读取，从库（AZ1 的 DB） 只以 Binlog 的方式同步主库数据。",-1),T=t("p",null,"当 AZ2 出现问题以后，可以通过前端的负载均衡（LB）、数据库代理（Proxy）或者应用进行数据库的读写切换，我们将流量切换到 AZ1 的库作读取。",-1),k=t("p",null,"当可用区域AZ2重新恢复后，整个集群是需要重做主从的，需要重新建立主从模式，当然我们可以通过一些自动化的方式和一些开源工具来自动修复。",-1),w=t("p",null,"这是在灾备模式下面可以看到的原理，还是可以基于 Binlog 这样的数据同步机制方式，我们要尽可能地保障它的网络延迟更低（尽量在 1 到 2 毫秒的延迟范围）。",-1),V=t("h4",{id:"lb-高可用模式",tabindex:"-1"},[l("LB 高可用模式 "),t("a",{class:"header-anchor",href:"#lb-高可用模式","aria-label":'Permalink to "LB 高可用模式"'},"​")],-1),j=t("p",null,"如果要设计高可用的双活模式（两个可用区域都要同时对外提供服务），这个时候则要求两个 DB 之间要相互进行数据同步，也就是 AZ2 的数据要同步给 AZ1，AZ1 里面的 DB 发生数据更改之后要同步给 AZ2，所以这个时候我们需要考虑如何进行同步设计。",-1),v=t("p",null,"通常通过 MySQL 源生的 Binlog 方式是很难去实现的，就算实现起来也会有很大的问题（如：数据写入回环）。这时我们会考虑自己去研发一些工具来做，其中的原理我这里画了一张图：",-1),O=t("p",null,"这里有 MySQL1 和 MySQL2，假设两个 MySQL 在不同的可用区，那么在 MySQL1 里面，如果要写入数据的话，会在本地生成 Binlog。这个时候自研一个同步的进程（ 如：Rsync SQL），它会去读取 MySQL1 里面的 Binlog 日志，并且把 Binlog 做反向解析，原始 Binlog 日志是二进制的，解析成一个 SQL 语句，再同步操作 MySQL2 。有了这样一层机制，就可以使得数据库数据发生更改时作到双向的同步。",-1),R=t("p",null,"自研这样一套程序的时候，实际上不仅要考虑 Binlog 的 SQL 解析，还需要考虑 AZ 的重复数据同步的问题，比如数据同步到 AZ1 以后，AZ1 可能又会同步到 AZ2 里面，这样就会造成回环重复写入。为了避免这样的问题，也需要在 Rsync SQL 这个自研进程里面考虑用一些解决方案（如设置标签等）解决重复同步的问题。",-1);function G(H,E,J,K,Y,$){const s=n("Image");return i(),_("div",null,[p,a(s,{alt:"图片1.png",src:"https://s0.lgstatic.com/i/image/M00/21/D6/CgqCHl7rFF6AB9o4AAD3jaiMYWY086.png"}),r,a(s,{alt:"图片2.png",src:"https://s0.lgstatic.com/i/image/M00/21/CA/Ciqc1F7rFGiAamGsAADMZ_Do6Hw638.png"}),h,d,S,A,D,g,a(s,{alt:"图片3.png",src:"https://s0.lgstatic.com/i/image/M00/21/CA/Ciqc1F7rFHWAVow1AAB_xrJfBtc736.png"}),m,N,u,B,a(s,{alt:"图片4.png",src:"https://s0.lgstatic.com/i/image/M00/21/CA/Ciqc1F7rFICAa4bmAACZpZXhT7w370.png"}),C,L,M,y,Z,a(s,{alt:"图片5.png",src:"https://s0.lgstatic.com/i/image/M00/21/CB/Ciqc1F7rFKuAIh18AADhYGjMa4A896.png"}),a(s,{alt:"图片6.png",src:"https://s0.lgstatic.com/i/image/M00/21/D6/CgqCHl7rFLqAZj9sAAEFhoTsCWc953.png"}),Q,P,I,b,a(s,{alt:"Drawing 6.png",src:"https://s0.lgstatic.com/i/image/M00/21/B4/CgqCHl7q--GAeXj5AAH_coBsrgQ277.png"}),q,f,F,a(s,{alt:"图片7.png",src:"https://s0.lgstatic.com/i/image/M00/21/CB/Ciqc1F7rFOOAIJnUAADuIjCU_lk506.png"}),x,T,k,w,V,j,a(s,{alt:"图片8.png",src:"https://s0.lgstatic.com/i/image/M00/21/CB/Ciqc1F7rFNeALR7JAADoCYCXSD8254.png"}),v,a(s,{alt:"图片9.png",src:"https://s0.lgstatic.com/i/image/M00/21/CB/Ciqc1F7rFQGAPgQGAAB3kxrpM60329.png"}),O,R])}const X=e(c,[["render",G]]);export{W as __pageData,X as default};
