import{_ as n,j as _,o as l,g as p,k as t,s as a,h as s,Q as o}from"./chunks/framework.b3d8e22e.js";const v=JSON.parse('{"title":"合理使用缓存对象","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/架构师的 36 项修炼/(19) 第02讲：架构核心技术之分布式缓存（下）.md","filePath":"posts/backEnd/架构师的 36 项修炼/(19) 第02讲：架构核心技术之分布式缓存（下）.md","lastUpdated":1696417798000}'),i={name:"posts/backEnd/架构师的 36 项修炼/(19) 第02讲：架构核心技术之分布式缓存（下）.md"},c=a("h2",{id:"通读缓存",tabindex:"-1"},[s("通读缓存 "),a("a",{class:"header-anchor",href:"#通读缓存","aria-label":'Permalink to "通读缓存"'},"​")],-1),h=a("p",null,"上面讲到的代理缓存、反向代理缓存、CDN 缓存，都是通读缓存。它代理了用户的请求，也就是说用户在访问数据的时候，总是要通过通读缓存。",-1),r=a("p",null,"当通读缓存中有需要访问的数据的时候，直接就把这个数据返回；如果没有，再由通读缓存向真正的数据提供者发出请求。其中重要的一点是客户端连接的是通读缓存，而不是生成响应的原始服务器，客户端并不知道真正的原始服务器在哪里，不会直接连接原始服务器，而是由通读缓存进行代理。",-1),d=a("h2",{id:"旁路缓存",tabindex:"-1"},[s("旁路缓存 "),a("a",{class:"header-anchor",href:"#旁路缓存","aria-label":'Permalink to "旁路缓存"'},"​")],-1),m=a("p",null,"和通读缓存相对应的叫作旁路缓存。前面提到的 key、value 这样的对象缓存就属于旁路缓存。旁路缓存和通读缓存不同。旁路缓存是客户端先访问旁路缓存中是否有自己想要的数据，如果旁路缓存中没有需要的数据，那么由客户端自己去访问真正的数据服务提供者，获取数据。客户端获得数据以后，会自己把这个数据写入到旁路缓存中，这样下一次或者其他客户端去读取旁路缓存的时候就可以获得想要的数据了。",-1),u=a("p",null,"在这里插入讲解一下各种介质数据访问的延迟，以便对数据的存储、缓存的特性以及数据的访问延迟有一个感性的认识。",-1),A=o("",17),k=a("p",null,"分布式对象缓存是系统架构中比较重要的一部分内容。所谓的分布式对象缓存是指对象缓存以一个分布式集群的方式对外提供服务，多个应用系统使用同一个分布式对象缓存提供的缓存服务。这里的缓存服务器是由多台服务器组成的，这些服务器共同构成了一个集群对外提供服务。所以使用分布式对象缓存的一个重要问题就是，数据进行读写操作的时候，如何找到正确的缓存服务器进行读写操作。如果第一次写入数据的时候写入的是 A 服务器，但是数据进行缓存读操作的时候访问的是 B 服务器，就不能够正确地查找到数据，缓存也就没有了效果。",-1),g=a("p",null,"那么，如何才能找到正确的缓存服务器呢？以 Memcached 服务器集群为例，我们来看一下分布式对象的缓存模型，如下图。",-1),b=a("p",null,"当需要进行分布式缓存访问的时候，依然是以 Key、value 这样的数据结构进行访问。如上图所示的例子中就是 BEIJING 作为 Key，一个 DATA 数据作为它的 value。当需要进行分布式对象访问的时候，应用程序需要使用分布式对象缓存的客户端 SDK。比如说 Memcached 提供的一个客户端 API 程序进行访问，客户端 API 程序会使用自己的路由算法进行路由选择，选择其中的某一台服务器，找到这台服务器的 IP 地址和端口以后，通过通讯模块和相对应的服务器进行通信。",-1),P=a("p",null,"因为进行路由选择的时候，就是使用缓存对象的 key 进行计算。下一次使用相同的 key 使用相同路由算法进行计算的时候，算出来的服务器依然还是前面计算出来的这个服务器。所以通过这种方法可以访问到正确的服务器进行数据读写。服务器越多，提供的缓存空间就越大，实现的缓存效果也就越好。通过集群的方式，提供了更多的缓存空间。",-1),D=a("p",null,"那么，路由算法又是如何进行服务器路由选择的？主要算法依然是上面讲到的哈希表的路由算法，也就是取模算法。",-1),f=a("p",null,"比如说，我们这里缓存服务器集群中有 3 台服务器，key 的哈希值对 3 取模得到的余数一定在 0、1、2 三个数据之间，那么每一个数字都对应着一台服务器，根据这个数字查找对应的服务器 IP 地址就可以了。使用余数取模这种方式进行路由计算非常简单，但这种算法也有一个问题，就是当服务器进行扩容的时候，比如说我们当前的服务器集群有 3 台服务器，如果我们 3 台服务器不够用了，需要添加 1 台服务器，这个时候对 3 取模就会变成对 4 去取模，导致的后果就是以前对 3 取模的时候写入的数据，对 4 取模的时候可能就查找不到了。",-1),x=a("p",null,"上面也讲过缓存雪崩的情况，实际上如果使用取模算法进行服务器添加，因为除数的变化会导致和缓存雪崩一样的后果，也就是说前面写入缓存服务器集群中的缓存数据，添加了 1 台服务器后很多数据都找不到了，类似于雪崩，最后会导致整个服务器集群都崩溃。",-1),S=a("p",null,"我们添加服务器的主要目的是提高它的处理能力，但是不正确的操作可能会导致整个集群都失效。解决这个问题的主要手段是使用一致性哈希算法。",-1),C=a("h1",{id:"一致性哈希算法",tabindex:"-1"},[s("一致性哈希算法 "),a("a",{class:"header-anchor",href:"#一致性哈希算法","aria-label":'Permalink to "一致性哈希算法"'},"​")],-1),E=a("p",null,"一致性哈希和余数哈希不同，一致性哈希首先是构建一个一致性哈希环的结构。一致性哈希环的大小是 0～2 的 32 次方减 1，实际上就是我们计算机中无符号整型值的取值范围，这个取值范围的 0 和最后一个值 2 的 32 次方减 1 首尾相连，就构成了一个一致性哈希环，如下图所示。",-1),N=o("",15);function T(q,y,V,B,I,M){const e=_("Image");return l(),p("div",null,[c,h,r,d,m,t(e,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/89/D9/CgotOV13ExOAP6m3AAB1BADrv1M771.png"}),u,t(e,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/89/B9/CgoB5l13ExOAQ4DyAADxZOykZ5k976.png"}),A,t(e,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/89/D9/CgotOV13ExSAWhCFAACFNPzM4Q8959.png"}),k,g,t(e,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/18/CgoB5l13V3yAaDSfAACw9us7nBY044.png"}),b,P,D,f,x,S,C,E,t(e,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/89/D9/CgotOV13ExWAGFH2AACSu5nTgAw967.png"}),N])}const $=n(i,[["render",T]]);export{v as __pageData,$ as default};
