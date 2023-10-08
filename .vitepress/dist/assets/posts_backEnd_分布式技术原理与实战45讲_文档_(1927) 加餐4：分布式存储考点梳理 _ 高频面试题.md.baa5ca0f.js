import{_ as t,j as l,o as p,g as i,k as o,h as _,Q as s,s as a}from"./chunks/framework.a0d18f64.js";const T=JSON.parse('{"title":"加餐4：分布式存储考点梳理+高频面试题","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/分布式技术原理与实战45讲_文档/(1927) 加餐4：分布式存储考点梳理 + 高频面试题.md","filePath":"posts/backEnd/分布式技术原理与实战45讲_文档/(1927) 加餐4：分布式存储考点梳理 + 高频面试题.md","lastUpdated":1696682708000}'),n={name:"posts/backEnd/分布式技术原理与实战45讲_文档/(1927) 加餐4：分布式存储考点梳理 + 高频面试题.md"},r=s('<h1 id="加餐4-分布式存储考点梳理-高频面试题" tabindex="-1">加餐4：分布式存储考点梳理+高频面试题 <a class="header-anchor" href="#加餐4-分布式存储考点梳理-高频面试题" aria-label="Permalink to &quot;加餐4：分布式存储考点梳理+高频面试题&quot;">​</a></h1><p>你好，欢迎来到分布式存储模块的加餐环节，本课时我将和你一起梳理面试中分布式系统的数据库的高频考点，做到温故知新。</p><h3 id="面试中如何考察分布式存储" tabindex="-1">面试中如何考察分布式存储 <a class="header-anchor" href="#面试中如何考察分布式存储" aria-label="Permalink to &quot;面试中如何考察分布式存储&quot;">​</a></h3><p>广义的分布式存储根据不同的应用领域，划分为以下的类别：</p><ul><li><p>分布式协同系统</p></li><li><p>分布式文件系统</p></li><li><p>分布式任务调度框架</p></li><li><p>分布式 NoSQL 存储</p></li><li><p>分布式关系数据库</p></li><li><p>各种消息队列 MQ</p></li><li><p>流式计算框架</p></li></ul><p>当然，这只是一种划分方式，你也可以根据存储数据的特点，将分布式存储系统划分为块存储、对象存储等不同的分类。</p><p>可以看到，分布式存储技术的范围非常大，技术覆盖的广度和深度都很有料，比如分布式协同系统或者各种流计算框架，都可以单独作为一个专栏来进行展开讲解。</p><p>由于篇幅有限，我在分布式存储这个模块里，主要围绕分布式系统下的关系型数据库这一主题，选择了与大部分开发者直接相关的热点内容，包括数据库的读写分离、分库分表存储拆分后的唯一主键问题，以及典型的 NoSQL 数据库应用。另外，简单介绍了 ElasticSearch 技术、倒排索引的实现等。</p><p>和之前一样，我在这里选择了一些热点技术问题，你可以考察一下自己的掌握程度。以分布式场景下的数据库拆分为例，面试官会对你进行下面的考察：</p><ul><li><p>当高并发系统设计时，为什么要分库分表？</p></li><li><p>用过哪些分库分表中间件？</p></li><li><p>不同的分库分表中间件都有什么优点和缺点？</p></li><li><p>如何对数据库进行垂直拆分或水平拆分？</p></li><li><p>如果要设计一个可以动态扩容缩容的分库分表方案，应该如何做？</p></li><li><p>数据库分库分表以后，如何处理设计主键生成器？</p></li><li><p>不同的主键生成方式有什么区别？</p></li></ul><p>上面的问题，都可以在&quot;分布式存储&quot;模块的内容中找到思路，你可以对照本模块学过的知识，整理自己的答案。</p><h3 id="分布式存储有哪些高频考点" tabindex="-1">分布式存储有哪些高频考点 <a class="header-anchor" href="#分布式存储有哪些高频考点" aria-label="Permalink to &quot;分布式存储有哪些高频考点&quot;">​</a></h3><p>上面我提到过，分布式存储包含了非常丰富的技术栈，本模块的内容虽然在实际开发中有着高频应用，但只是分布式存储技术领域中非常小的一部分。在下面这张思维导图中，除了分布式下的关系型数据库之外的内容，我还补充了一些经典分布式存储技术的部分，你可以对照这张思维导图，进行针对性的扩展。</p>',13),c=a("p",null,"以分布式文件系统为例，常见的分布式文件系统有 Google 的 GFS、Hadoop 实现的分布式文件系统 HDFS、Sun 公司推出的 Lustre、淘宝的 TFS、FastDFS 等，这几种存储组件都有各自的应用场景。",-1),d=a("p",null,"比如淘宝的 TFS 适合用于图片等小文件、大规模存储的应用场景，是淘宝专门为了支持电商场景下数以千万的商品图片而开发的；FastDFS 类似 GFS，是一款开源的分布式文件系统，适合各类规模较小的图片和视频网站。",-1),h=a("p",null,"比如流式计算框架，有著名的流式计算三剑客，Storm、Spark 和 Flink，这三个框架基本上覆盖了绝大多数的流式计算业务，适用于不同的大数据处理场景。",-1),u=a("p",null,"今天的内容就到这里了，也欢迎你留言分享自己的面试经验，和大家一起讨论。",-1);function m(S,F,f,k,g,b){const e=l("Image");return p(),i("div",null,[r,o(e,{alt:"思维导图.png",src:"https://s0.lgstatic.com/i/image/M00/4F/8B/Ciqc1F9gjwiAJK0-AADFdnljIls308.png"}),_(),c,d,h,u])}const N=t(n,[["render",m]]);export{T as __pageData,N as default};
