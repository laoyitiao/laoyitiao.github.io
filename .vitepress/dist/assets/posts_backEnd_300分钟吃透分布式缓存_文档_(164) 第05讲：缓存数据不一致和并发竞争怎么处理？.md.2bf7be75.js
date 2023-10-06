import{_ as s,j as o,o as n,g as i,k as t,Q as _,s as a,h as l}from"./chunks/framework.b3d8e22e.js";const E=JSON.parse('{"title":"数据不一致 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/300分钟吃透分布式缓存_文档/(164) 第05讲：缓存数据不一致和并发竞争怎么处理？.md","filePath":"posts/backEnd/300分钟吃透分布式缓存_文档/(164) 第05讲：缓存数据不一致和并发竞争怎么处理？.md","lastUpdated":1696417798000}'),r={name:"posts/backEnd/300分钟吃透分布式缓存_文档/(164) 第05讲：缓存数据不一致和并发竞争怎么处理？.md"},h=_('<br><br><p>你好，我是你的缓存老师陈波，欢迎进入第5课时&quot;缓存数据相关的经典问题&quot;。</p><br><h6 id="数据不一致" tabindex="-1">数据不一致 <a class="header-anchor" href="#数据不一致" aria-label="Permalink to &quot;数据不一致&quot;">​</a></h6><h6 id="问题描述" tabindex="-1">问题描述 <a class="header-anchor" href="#问题描述" aria-label="Permalink to &quot;问题描述&quot;">​</a></h6><p>七大缓存经典问题的第四个问题是数据不一致。同一份数据，可能会同时存在 DB 和缓存之中。那就有可能发生，DB 和缓存的数据不一致。如果缓存有多个副本，多个缓存副本里的数据也可能会发生不一致现象。</p><h6 id="原因分析" tabindex="-1">原因分析 <a class="header-anchor" href="#原因分析" aria-label="Permalink to &quot;原因分析&quot;">​</a></h6><p>不一致的问题大多跟缓存更新异常有关。比如更新 DB 后，写缓存失败，从而导致缓存中存的是老数据。另外，如果系统采用一致性 Hash 分布，同时采用 rehash 自动漂移策略，在节点多次上下线之后，也会产生脏数据。缓存有多个副本时，更新某个副本失败，也会导致这个副本的数据是老数据。</p><h6 id="业务场景" tabindex="-1">业务场景 <a class="header-anchor" href="#业务场景" aria-label="Permalink to &quot;业务场景&quot;">​</a></h6><p>导致数据不一致的场景也不少。如下图所示，在缓存机器的带宽被打满，或者机房网络出现波动时，缓存更新失败，新数据没有写入缓存，就会导致缓存和 DB 的数据不一致。缓存 rehash 时，某个缓存机器反复异常，多次上下线，更新请求多次 rehash。这样，一份数据存在多个节点，且每次 rehash 只更新某个节点，导致一些缓存节点产生脏数据。</p>',11),c=a("h6",{id:"解决方案",tabindex:"-1"},[l("解决方案 "),a("a",{class:"header-anchor",href:"#解决方案","aria-label":'Permalink to "解决方案"'},"​")],-1),d=a("p",null,"要尽量保证数据的一致性。这里也给出了 3 个方案，可以根据实际情况进行选择。",-1),p=a("ul",null,[a("li",null,[a("p",null,"第一个方案，cache 更新失败后，可以进行重试，如果重试失败，则将失败的 key 写入队列机服务，待缓存访问恢复后，将这些 key 从缓存删除。这些 key 在再次被查询时，重新从 DB 加载，从而保证数据的一致性。")]),a("li",null,[a("p",null,"第二个方案，缓存时间适当调短，让缓存数据及早过期后，然后从 DB 重新加载，确保数据的最终一致性。")]),a("li",null,[a("p",null,"第三个方案，不采用 rehash 漂移策略，而采用缓存分层策略，尽量避免脏数据产生。")])],-1),u=a("h6",{id:"数据并发竞争",tabindex:"-1"},[l("数据并发竞争 "),a("a",{class:"header-anchor",href:"#数据并发竞争","aria-label":'Permalink to "数据并发竞争"'},"​")],-1),m=a("h6",{id:"问题描述-1",tabindex:"-1"},[l("问题描述 "),a("a",{class:"header-anchor",href:"#问题描述-1","aria-label":'Permalink to "问题描述"'},"​")],-1),k=a("p",null,"第五个经典问题是数据并发竞争。互联网系统，线上流量较大，缓存访问中很容易出现数据并发竞争的现象。数据并发竞争，是指在高并发访问场景，一旦缓存访问没有找到数据，大量请求就会并发查询 DB，导致 DB 压力大增的现象。",-1),b=a("p",null,"数据并发竞争，主要是由于多个进程/线程中，有大量并发请求获取相同的数据，而这个数据 key 因为正好过期、被剔除等各种原因在缓存中不存在，这些进程/线程之间没有任何协调，然后一起并发查询 DB，请求那个相同的 key，最终导致 DB 压力大增，如下图。",-1),g=a("h6",{id:"业务场景-1",tabindex:"-1"},[l("业务场景 "),a("a",{class:"header-anchor",href:"#业务场景-1","aria-label":'Permalink to "业务场景"'},"​")],-1),A=a("p",null,"数据并发竞争在大流量系统也比较常见，比如车票系统，如果某个火车车次缓存信息过期，但仍然有大量用户在查询该车次信息。又比如微博系统中，如果某条微博正好被缓存淘汰，但这条微博仍然有大量的转发、评论、赞。上述情况都会造成该车次信息、该条微博存在并发竞争读取的问题。",-1),f=a("h6",{id:"解决方案-1",tabindex:"-1"},[l("解决方案 "),a("a",{class:"header-anchor",href:"#解决方案-1","aria-label":'Permalink to "解决方案"'},"​")],-1),D=a("p",null,"要解决并发竞争，有 2 种方案。",-1),B=a("ul",null,[a("li",null,"方案一是使用全局锁。如下图所示，即当缓存请求 miss 后，先尝试加全局锁，只有加全局锁成功的线程，才可以到 DB 去加载数据。其他进程/线程在读取缓存数据 miss 时，如果发现这个 key 有全局锁，就进行等待，待之前的线程将数据从 DB 回种到缓存后，再从缓存获取。")],-1),x=a("ul",null,[a("li",null,"方案二是，对缓存数据保持多个备份，即便其中一个备份中的数据过期或被剔除了，还可以访问其他备份，从而减少数据并发竞争的情况，如下图。")],-1),P=a("p",null,'OK，这节课就讲到这里，下一课时我会分享"缓存特殊 key 相关的经典问题"，记得按时来听课哈。好，下节课见，拜拜！',-1),q=a("br",null,null,-1);function C(M,S,V,N,y,I){const e=o("Image");return n(),i("div",null,[h,t(e,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/99/91/CgotOV2kSMqAD3YHAACfCilWo20043.png"}),c,d,p,t(e,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/99/71/CgoB5l2kSMqANNv_AAClEDDnPXA676.png"}),u,m,k,b,t(e,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/99/91/CgotOV2kSMuAGIj2AAC0Yxgja7M817.png"}),g,A,f,D,B,t(e,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/99/91/CgotOV2kSMuAdSrvAAFZWFDAGz8863.png"}),x,t(e,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/99/71/CgoB5l2kSMuAaRY2AAC4IIqMZZQ216.png"}),P,q])}const v=s(r,[["render",C]]);export{E as __pageData,v as default};
