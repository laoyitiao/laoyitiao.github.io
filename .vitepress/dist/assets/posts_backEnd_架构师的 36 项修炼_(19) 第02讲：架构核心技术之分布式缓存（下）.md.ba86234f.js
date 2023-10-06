import{_ as n,j as _,o as l,g as p,k as t,s as a,h as s,Q as o}from"./chunks/framework.b3d8e22e.js";const v=JSON.parse('{"title":"合理使用缓存对象","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/架构师的 36 项修炼/(19) 第02讲：架构核心技术之分布式缓存（下）.md","filePath":"posts/backEnd/架构师的 36 项修炼/(19) 第02讲：架构核心技术之分布式缓存（下）.md","lastUpdated":1696417798000}'),i={name:"posts/backEnd/架构师的 36 项修炼/(19) 第02讲：架构核心技术之分布式缓存（下）.md"},c=a("h2",{id:"通读缓存",tabindex:"-1"},[s("通读缓存 "),a("a",{class:"header-anchor",href:"#通读缓存","aria-label":'Permalink to "通读缓存"'},"​")],-1),h=a("p",null,"上面讲到的代理缓存、反向代理缓存、CDN 缓存，都是通读缓存。它代理了用户的请求，也就是说用户在访问数据的时候，总是要通过通读缓存。",-1),r=a("p",null,"当通读缓存中有需要访问的数据的时候，直接就把这个数据返回；如果没有，再由通读缓存向真正的数据提供者发出请求。其中重要的一点是客户端连接的是通读缓存，而不是生成响应的原始服务器，客户端并不知道真正的原始服务器在哪里，不会直接连接原始服务器，而是由通读缓存进行代理。",-1),d=a("h2",{id:"旁路缓存",tabindex:"-1"},[s("旁路缓存 "),a("a",{class:"header-anchor",href:"#旁路缓存","aria-label":'Permalink to "旁路缓存"'},"​")],-1),m=a("p",null,"和通读缓存相对应的叫作旁路缓存。前面提到的 key、value 这样的对象缓存就属于旁路缓存。旁路缓存和通读缓存不同。旁路缓存是客户端先访问旁路缓存中是否有自己想要的数据，如果旁路缓存中没有需要的数据，那么由客户端自己去访问真正的数据服务提供者，获取数据。客户端获得数据以后，会自己把这个数据写入到旁路缓存中，这样下一次或者其他客户端去读取旁路缓存的时候就可以获得想要的数据了。",-1),u=a("p",null,"在这里插入讲解一下各种介质数据访问的延迟，以便对数据的存储、缓存的特性以及数据的访问延迟有一个感性的认识。",-1),A=o('<p>如上图所示，访问本地内存大概需要 100ns 的时间；使用 SSD 磁盘进行搜索，大概需要 10万ns 时间；数据包在同一个数据中心来回一次的时间，也就是在同一个路由环境里进行一次访问，大概需要 50万ns 时间，也就是 0.5ms；使用非 SSD 磁盘进行一次搜索，大概需要 1000万ns，也就是 10ms 的时间；按顺序从网络中读取 1MB 的数据也是需要 10ms 的时间；按顺序从传统的机械磁盘，即非 SSD 磁盘，读取 1MB 数据，大概需要 30ms 的时间；跨越大西洋进行一次网络数据传输，一个来回大概需要 150ms 的时间。其中，1s 等于 1000ms，等于 10亿ns。</p><h1 id="合理使用缓存对象" tabindex="-1">合理使用缓存对象 <a class="header-anchor" href="#合理使用缓存对象" aria-label="Permalink to &quot;合理使用缓存对象&quot;">​</a></h1><p>缓存虽然效率非常高，使用缓存也非常简单，但是缓存并不是无所不能的，使用缓存的时候需要注意合理使用缓存对象。</p><h2 id="注意频繁修改的数据" tabindex="-1">注意频繁修改的数据 <a class="header-anchor" href="#注意频繁修改的数据" aria-label="Permalink to &quot;注意频繁修改的数据&quot;">​</a></h2><p>缓存数据是为一次写入多次读取准备的，但是如果写入的数据很快就被修改掉了，数据还没来得及读取就已经失效或者更新了，系统的负担就会很重，使用缓存也就没有太多的意义。一般说来，数据的读写比例至少在 2:1 以上，缓存才有意义。</p><h2 id="注意没有热点的访问数据" tabindex="-1">注意没有热点的访问数据 <a class="header-anchor" href="#注意没有热点的访问数据" aria-label="Permalink to &quot;注意没有热点的访问数据&quot;">​</a></h2><p>上面提到缓存是一次写入多次读取的数据，但是如果写入的数据并不会被多次读取，也就是所谓的没有热点，这时候使用缓存也是没有意义的。</p><p>我们常见的、日常使用的数据通常都是有热点的。比如说在淘宝中，那些热门的商品可能会被几百万几千万次的访问，那些冷门的商品可能一次访问都没有，热门商品数据就是有热点的，就需要缓存。在微博中也是，那些微博大V们的微博会被几百万几千万的粉丝访问，他们的微博数据也是有热点的，而那些没有几个粉丝的博主的微博，几乎不会被访问，这些数据是没有热点的。所以缓存存储的就是淘宝上那些热门的商品，微博上那些大V的微博，它们都是有热点的缓存，这些数据都能实现一次写入多次甚至非常多次的读取，这种缓存就有效果。但还是有一些业务场景数据是没有热点的，那么这一类业务场景数据就不需要使用缓存。</p><h2 id="注意数据不一致和脏读" tabindex="-1">注意数据不一致和脏读 <a class="header-anchor" href="#注意数据不一致和脏读" aria-label="Permalink to &quot;注意数据不一致和脏读&quot;">​</a></h2><p>缓存中的数据有可能和主存储数据库中的数据不一致。这个问题主要是通过失效时间来解决的，也就是说这个业务能够容忍的失效时间之内，保持缓存中的数据和数据库中的数据不一致，比如说淘宝的商品数据，如果卖家在对商品的数据进行了编辑，这个时候可能买家是看不到这些被更新过的数据的，可能需要几分钟的时间，比如是 3 分钟，那么 3 分钟之内，卖家编辑的数据买家是看不到的，但这种延迟通常是可以接受的。</p><p>如果某些业务场景对更新非常敏感，必须要实时看到，这个时候就不能够使用失效时间进行缓存过期处理了，可能需要进行失效通知。当数据进行更新的时候，立即清除缓存中的数据，下次访问这个数据的时候，缓存必须要重新从主数据库中去加载，才能够得到最新的数据。</p><h2 id="注意缓存雪崩" tabindex="-1">注意缓存雪崩 <a class="header-anchor" href="#注意缓存雪崩" aria-label="Permalink to &quot;注意缓存雪崩&quot;">​</a></h2><p>因为热点数据主要是从缓存中去读取的，而热点数据是数据访问压力最大的一类数据。这些数据都从缓存中读取，极大地降低了数据库的访问压力。</p><p>而数据库整个系统也是在有缓存的情况下进行设计的，数据库的处理能力是强依赖缓存的。如果缓存忽然崩溃了，那么所有的访问压力就都会传递到数据库上去。数据库不能够承受这样的访问压力，可能也会崩溃。数据库崩溃了以后，应用程序访问不到数据库，请求不断超时，负载压力不断升高，应用程序服务器也会崩溃，最后导致整个网站所有服务器崩溃。这就是缓存雪崩。这种情况下系统甚至无法启动，因为系统启动后，新的访问压力又过来，依然是那么大，还是会崩溃。</p><p>这时候重启缓存也是没有用的，因为重启的话缓存中是没有数据的。我们刚才也讲到，对象缓存是通过加载数据库中的数据并写入到缓存中才有数据的。重新启动的缓存没有数据，它就不能够承担提供数据读操作的能力。所以，对缓存有重点依赖的系统，需要特别关注缓存的可用性。缓存用的部分数据丢失可以到数据库中加载，但是如果全部的缓存数据都丢失了，可能导致整个系统都会崩溃，特别需要注意。</p><h1 id="分布式对象缓存" tabindex="-1">分布式对象缓存 <a class="header-anchor" href="#分布式对象缓存" aria-label="Permalink to &quot;分布式对象缓存&quot;">​</a></h1><p>下面看一下分布式对象缓存，如下图所示。</p>',17),k=a("p",null,"分布式对象缓存是系统架构中比较重要的一部分内容。所谓的分布式对象缓存是指对象缓存以一个分布式集群的方式对外提供服务，多个应用系统使用同一个分布式对象缓存提供的缓存服务。这里的缓存服务器是由多台服务器组成的，这些服务器共同构成了一个集群对外提供服务。所以使用分布式对象缓存的一个重要问题就是，数据进行读写操作的时候，如何找到正确的缓存服务器进行读写操作。如果第一次写入数据的时候写入的是 A 服务器，但是数据进行缓存读操作的时候访问的是 B 服务器，就不能够正确地查找到数据，缓存也就没有了效果。",-1),g=a("p",null,"那么，如何才能找到正确的缓存服务器呢？以 Memcached 服务器集群为例，我们来看一下分布式对象的缓存模型，如下图。",-1),b=a("p",null,"当需要进行分布式缓存访问的时候，依然是以 Key、value 这样的数据结构进行访问。如上图所示的例子中就是 BEIJING 作为 Key，一个 DATA 数据作为它的 value。当需要进行分布式对象访问的时候，应用程序需要使用分布式对象缓存的客户端 SDK。比如说 Memcached 提供的一个客户端 API 程序进行访问，客户端 API 程序会使用自己的路由算法进行路由选择，选择其中的某一台服务器，找到这台服务器的 IP 地址和端口以后，通过通讯模块和相对应的服务器进行通信。",-1),P=a("p",null,"因为进行路由选择的时候，就是使用缓存对象的 key 进行计算。下一次使用相同的 key 使用相同路由算法进行计算的时候，算出来的服务器依然还是前面计算出来的这个服务器。所以通过这种方法可以访问到正确的服务器进行数据读写。服务器越多，提供的缓存空间就越大，实现的缓存效果也就越好。通过集群的方式，提供了更多的缓存空间。",-1),D=a("p",null,"那么，路由算法又是如何进行服务器路由选择的？主要算法依然是上面讲到的哈希表的路由算法，也就是取模算法。",-1),f=a("p",null,"比如说，我们这里缓存服务器集群中有 3 台服务器，key 的哈希值对 3 取模得到的余数一定在 0、1、2 三个数据之间，那么每一个数字都对应着一台服务器，根据这个数字查找对应的服务器 IP 地址就可以了。使用余数取模这种方式进行路由计算非常简单，但这种算法也有一个问题，就是当服务器进行扩容的时候，比如说我们当前的服务器集群有 3 台服务器，如果我们 3 台服务器不够用了，需要添加 1 台服务器，这个时候对 3 取模就会变成对 4 去取模，导致的后果就是以前对 3 取模的时候写入的数据，对 4 取模的时候可能就查找不到了。",-1),x=a("p",null,"上面也讲过缓存雪崩的情况，实际上如果使用取模算法进行服务器添加，因为除数的变化会导致和缓存雪崩一样的后果，也就是说前面写入缓存服务器集群中的缓存数据，添加了 1 台服务器后很多数据都找不到了，类似于雪崩，最后会导致整个服务器集群都崩溃。",-1),S=a("p",null,"我们添加服务器的主要目的是提高它的处理能力，但是不正确的操作可能会导致整个集群都失效。解决这个问题的主要手段是使用一致性哈希算法。",-1),C=a("h1",{id:"一致性哈希算法",tabindex:"-1"},[s("一致性哈希算法 "),a("a",{class:"header-anchor",href:"#一致性哈希算法","aria-label":'Permalink to "一致性哈希算法"'},"​")],-1),E=a("p",null,"一致性哈希和余数哈希不同，一致性哈希首先是构建一个一致性哈希环的结构。一致性哈希环的大小是 0～2 的 32 次方减 1，实际上就是我们计算机中无符号整型值的取值范围，这个取值范围的 0 和最后一个值 2 的 32 次方减 1 首尾相连，就构成了一个一致性哈希环，如下图所示。",-1),N=o('<p>对每个服务器的节点取模，求它的哈希值并把这个哈希值放到环上，所有的服务器都取哈希值放到环上，每一次进行服务器查找路由计算的时候，把 key 也取它的哈希值，取到哈希值以后把 key 放到环上，顺时针查找距离它最近的服务器的节点是哪一个，它的路由节点就是哪一个。通过这种方式也可以实现，key 不变的情况下找到的总是相同的服务器。这种一致性哈希算法除了可以实现像余数哈希一样的路由效果以外，对服务器的集群扩容效果也非常好。</p><p>在一致性哈希环上进行服务器扩容的时候，新增加一个节点不需要改动前面取模算法里的除数，导致最后的取值结果全部混乱，它只需要在哈希环里根据新的服务器节点的名称计算它的哈希值，把哈希值放到这个环上就可以了。放到环上后，它不会影响到原先节点的哈希值，也不会影响到原先服务器在哈希环上的分布，它只会影响到离它最近的服务器，比如上图中 NODE3 是新加入的服务器，那么它只会影响到 NODE1，原先访问 NODE1 的 key 会访问到 NODE3 上，也就是说对缓存的影响是比较小的，它只会影响到缓存里面的一小段。如果缓存中一小部分数据受到了影响，不能够正确的命中，那么可以去数据库中读取，而数据库的压力只要在它的负载能力之内，也不会崩溃，系统就可以正常运行。所以通过一致性哈希算法可以实现缓存服务器的顺利伸缩扩容。</p><p>但是一致性哈希算法有着致命的缺陷。我们知道哈希值其实是一个随机值，把一个随机值放到一个环上以后，可能是不均衡的，也就是说某两个服务器可能距离很近，而和其它的服务器距离很远，这个时候就会导致有些服务器的负载压力特别大，有些服务器的负载压力非常小。同时在进行扩容的时候，比如说加入一个节点 3，它影响的只是节点 1，而我们实际上希望加入一个服务器节点的时候，它能够分摊其它所有服务器的访问压力和数据冲突。</p><p>所以对这个算法需要进行一些改进，改进办法就是使用虚拟节点。也就是说我们这一个服务器节点放入到一致性哈希环上的时候，并不是把真实的服务器的哈希值放到环上，而是将一个服务器虚拟成若干个虚拟节点，把这些虚拟节点的 hash 值放到环上去。在实践中通常是把一个服务器节点虚拟成 200 个虚拟节点，然后把 200 个虚拟节点放到环上。key 依然是顺时针的查找距离它最近的虚拟节点，找到虚拟节点以后，根据映射关系找到真正的物理节点。</p><p>第一，可以解决我们刚才提到的负载不均衡的问题，因为有更多的虚拟节点在环上，所以它们之间的距离总体来说大致是相近的。第二，在加入一个新节点的时候，是加入多个虚拟节点的，比如 200 个虚拟节点，那么加入进来以后环上的每个节点都可能会受到影响，从而分摊原先每个服务器的一部分负载。</p><h1 id="总结回顾" tabindex="-1">总结回顾 <a class="header-anchor" href="#总结回顾" aria-label="Permalink to &quot;总结回顾&quot;">​</a></h1><p>最后，我们总结回顾一下整个关于缓存部分的内容。</p><p>缓存的主要优点是实现方法比较简单，同时提升的效果又非常明显。所以缓存是架构性能优化的一个重要手段。</p><p>影响缓存的主要指标是缓存命中率。影响命中率的几个关键因素是缓存键集合的大小、缓存空间的大小和缓存对象的存在时间，也就是缓存的寿命。缓存的主要类型有代理缓存、反向代理缓存、CDN 缓存，这三类缓存叫作通读缓存。</p><p>客户端使用通读缓存的时候，不需要知道后面真实的数据存储服务器在哪里，只需要访问通读缓存，由通读缓存去访问真正的数据提供服务器。另一类缓存就是旁路缓存。这类缓存就是我们在系统架构中常用的对象缓存。使用旁路缓存的时候，应用程序一方面需要知道缓存，需要连接缓存服务器，通过缓存服务器去查找数据，如果缓存服务器中没有查到数据，那么就自己去连接数据库，从数据库中去查找数据，并且在返回数据以后，还要把这个数据当作缓存写入到缓存服务器中去，以便于下一次读取的时候从缓存中读取。</p><p>缓存虽然对系统性能提升非常明显，但是也还是需要对缓存进行合理的使用，在合适的场景下进行使用。第一点是关注频繁修改的数据，如果一个数据经常被修改，那么使用缓存可能就价值不大；第二点是缓存要有热点，因为缓存的空间总是有限的，只能存储一小部分的数据，如果被访问的数据概率都是一样的，没有热点，数据极有可能写入缓存以后很快又被清除掉了，没有被读取过，体现不出来缓存的价值；还有两点分别是注意缓存雪崩和关注缓存的数据一致性。</p><p>分布式对象缓存是我们分布式架构中用的比较多的一种缓存。使用分布式缓存要注意的是：缓存的路由算法是如何实现的？比较重要的、用的比较广泛的是一致性哈希算法。</p><p>总之，缓存是无处不在的。在整个计算机系统中，在各个地方，只要你能够想得到的，都可以使用缓存来提升性能，甚至应用程序、一段代码中都可以使用缓存。所以我们要多关注缓存的使用，同时也要关注使用缓存的那些注意点。</p><p>缓存是系统性能优化的最重要的手段之一，关于性能优化更多的架构原理和技术方法，请关注课时6。</p><p>下一课时会讲解分布式消息队列。</p>',15);function T(q,y,V,B,I,M){const e=_("Image");return l(),p("div",null,[c,h,r,d,m,t(e,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/89/D9/CgotOV13ExOAP6m3AAB1BADrv1M771.png"}),u,t(e,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/89/B9/CgoB5l13ExOAQ4DyAADxZOykZ5k976.png"}),A,t(e,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/89/D9/CgotOV13ExSAWhCFAACFNPzM4Q8959.png"}),k,g,t(e,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/18/CgoB5l13V3yAaDSfAACw9us7nBY044.png"}),b,P,D,f,x,S,C,E,t(e,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/89/D9/CgotOV13ExWAGFH2AACSu5nTgAw967.png"}),N])}const $=n(i,[["render",T]]);export{v as __pageData,$ as default};
