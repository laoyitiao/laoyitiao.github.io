import{_ as s,j as n,o as c,g as l,k as a,h as e,s as t,Q as r}from"./chunks/framework.a0d18f64.js";const J=JSON.parse('{"title":"第12讲：LSM树在ApacheHBae等存储系统中的应用","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/097-数据结构精讲：从原理到实战文档/(547) 第 12 讲：LSM 树在 Apache HBae 等存储系统中的应用.md","filePath":"posts/backEnd/097-数据结构精讲：从原理到实战文档/(547) 第 12 讲：LSM 树在 Apache HBae 等存储系统中的应用.md","lastUpdated":1696682708000}'),p={name:"posts/backEnd/097-数据结构精讲：从原理到实战文档/(547) 第 12 讲：LSM 树在 Apache HBae 等存储系统中的应用.md"},m=t("h1",{id:"第12讲-lsm树在apachehbae等存储系统中的应用",tabindex:"-1"},[e("第12讲：LSM树在ApacheHBae等存储系统中的应用 "),t("a",{class:"header-anchor",href:"#第12讲-lsm树在apachehbae等存储系统中的应用","aria-label":'Permalink to "第12讲：LSM树在ApacheHBae等存储系统中的应用"'},"​")],-1),_=t("p",null,'你好，我是你的数据结构课老师蔡元楠，欢迎进入第 12 课时的内容"LSM 树在 Apache HBase 等存储系统中的应用"。',-1),g=t("p",null,"在上一讲中，我们一起学习了平衡树和 Log-Structured 结构的基本概念，那么今天我们就来延续上一讲的问题，继续探讨如何优化 Log-Structured 结构，以及通过结合平衡树之后才产生的另外一种数据结构------LSM 树。",-1),i=t("p",null,"首先我们一起来回顾一下在上一讲中所遗留的问题。在通过 Log-Structured 结构设计视频网站浏览次数的功能后，底层的数据结构就如下图所示：",-1),d=t("p",null,"这种方法存在的一个问题，就是当我们不断地添加新数据进去之后，所占用的空间会越来越大，而且遍历整个数据结构的时间也随之越来越长。这时候，我们就可以通过一种叫 Compaction 的方法，把数据合并，Compaction 方法其实也是很多 NoSQL 架构中的一个重要优化过程。下面我就来详细讲讲整个流程。",-1),S=t("h3",{id:"log-structured-结构的优化",tabindex:"-1"},[e("Log-Structured 结构的优化 "),t("a",{class:"header-anchor",href:"#log-structured-结构的优化","aria-label":'Permalink to "Log-Structured 结构的优化"'},"​")],-1),u=t("p",null,"首先，可以定义一个大小为 N 的固定数组，我们称它为 Segment，一个 Segment 最多可以存储 N 个数据，当有第 N+1 个数据需要写入 Log-Structured 结构的时候，我们会创建一个新的 Segment，然后将 N+1 个数据写入到新的 Segment 中。",-1),h=t("p",null,"以下图为示，我们定义一个 Segment 的大小为 16，当 Segment 1 写满了 16 个数据之后，会将新的数据写入到 Segment 2 里。",-1),C=t("p",null,"说到这里，我们的 Log-Structured 结构还是一直在往内存里添加数据，并没有解决最终会消耗完内存的问题。这时候就到 Compaction 大显身手的时候了，在当 Segment 到达一定数量的时候，Compaction 会通过后台的线程，把不同的 Segments 合并在一起，我们以下图为例来说明一下。",-1),L=t("p",null,"假设我们定义当 Segment 的数量到达两个的时候，后台线程就会执行 Compaction 来合并结果。",-1),A=t("p",null,"执行完 Compaction 之后，内部的数据结构图如下图所示：",-1),M=t("p",null,"刚开始的时候，对于视频浏览次数的统计是通过读取 Segment 1 和 Segment 2 来完成的，在 Compaction 完成了之后，对于结果的读取就可以从 Compacted Segment 里面读取了。因为这时候所有的结果已经存放在 Compacted Segment 里面了，所以就可以删除 Segment 1 和 Segment 2 来腾出内存空间了。",-1),B=t("p",null,"整个 Compaction 的过程会不断地递归进行下去，当 Compacted Segment 满了以后，后台线程又可以对 Compacted Segment 进行 Compaction 操作，再次合并所有结果。",-1),b=t("p",null,"你会发现，当采用了这种优化之后，写操作还是可以十分高效地进行下去，同时也不会占用大量的内存空间。",-1),T=t("h3",{id:"sstable-和-lsm-树",tabindex:"-1"},[e("SSTable 和 LSM 树 "),t("a",{class:"header-anchor",href:"#sstable-和-lsm-树","aria-label":'Permalink to "SSTable 和 LSM 树"'},"​")],-1),N=t("p",null,[e("上面所讲到的 Log-Structured 结构的这种 Compaction 优化，其实是 LSM 树的一个基础，在学习 LSM 树之前，我们先来了解一个新的数据结构，即 "),t("strong",null,"SSTable"),e("。SSTable（Sorted String Table）数据结构是在 Log-Structured 结构的基础上，多加了一条规则，就是所有保存在 Log-Structured 结构里的数据都是键值对，并且键必须是字符串，在经过了 Compaction 操作之后，所有的 Compacted Segment 里保存的键值对都必须按照字符排序。")],-1),f=t("p",null,"我们假设现在想利用 Log-Structured 结构来保存一本书里的词频，为了方便说明，把 Segment 的大小设为 4。在刚开始的时候，这个 Log-Structured 结构的内存图如下图所示：",-1),k=t("p",null,"在经过了 Compaction 操作之后，内存图会变成如下图所示：",-1),x=r("",7),D=t("p",null,"如果我们的查询是需要找出所有从 Home 到 No 的数据，那我们就知道，可以从 Compacted Segment 2 到 Compacted Segment 3 里面去寻找这些数据了。",-1),H=t("p",null,"同样的，采用 Lucene 作为后台索引引擎的开源搜索框架，像 ElasticSearch 和 Solr，底层其实运用了 LSM 树。因为搜索引擎的特殊性，有可能会遇到一些情况，那就是：所搜索的词并不在保存的数据里，而想要知道一个数据是否存在 Segment 里面，必须遍历一次整个 Segment，时间开销还并不是最优化的，所以这两个搜索引擎除了采用 LSM 树之外，还会利用另外一个在第 07 讲中所提到的 Bloom Filter 这个数据结构，它可以用来判断一个词是否一定不在保存的数据里面。",-1),I=t("p",null,'OK，这节课就讲到这里啦，下一课时我将分享"用图来表达更为复杂的数据关系"，记得按时来听课哈。',-1);function E(P,q,O,V,F,Q){const o=n("Image");return c(),l("div",null,[m,_,g,i,a(o,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/62/BC/Cgq2xl4o-DqAQElxAAE4TpDNdTY041.png"}),e(),d,S,u,h,a(o,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/62/BC/CgpOIF4o-DuAfdPWAAIDOYAAm9U804.png"}),e(),C,L,a(o,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/62/BC/Cgq2xl4o-DuAOfSTAAHIkRBDV0E283.png"}),e(),A,a(o,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/62/BC/CgpOIF4o-DuAJLesAAJKZsBH2zU484.png"}),e(),M,B,b,T,N,f,a(o,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/62/BC/Cgq2xl4o-DyAHTqbAAD5MzXtGgg203.png"}),e(),k,a(o,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/62/BC/CgpOIF4o-DyAGUkIAAII08Em_5k103.png"}),e(),x,a(o,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/62/BC/Cgq2xl4o-DyAAMmjAAFJNdxBZus633.png"}),e(),D,H,I])}const U=s(p,[["render",E]]);export{J as __pageData,U as default};
