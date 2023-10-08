import{_ as i,o as e,g as l,Q as a}from"./chunks/framework.4e7d56ce.js";const R=JSON.parse('{"title":"加餐6：分布式缓存考点梳理+高频面试题","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/分布式技术原理与实战45讲_文档/(1942) 加餐6：分布式缓存考点梳理 + 高频面试题.md","filePath":"posts/backEnd/分布式技术原理与实战45讲_文档/(1942) 加餐6：分布式缓存考点梳理 + 高频面试题.md","lastUpdated":1696682708000}'),p={name:"posts/backEnd/分布式技术原理与实战45讲_文档/(1942) 加餐6：分布式缓存考点梳理 + 高频面试题.md"},s=a('<h1 id="加餐6-分布式缓存考点梳理-高频面试题" tabindex="-1">加餐6：分布式缓存考点梳理+高频面试题 <a class="header-anchor" href="#加餐6-分布式缓存考点梳理-高频面试题" aria-label="Permalink to &quot;加餐6：分布式缓存考点梳理+高频面试题&quot;">​</a></h1><p>你好，欢迎来到分布式缓存模块的加餐环节，本课时我将和你一起梳理面试中分布式缓存的高频考点，做到温故知新。</p><h3 id="分布式缓存在面试中如何考察" tabindex="-1">分布式缓存在面试中如何考察 <a class="header-anchor" href="#分布式缓存在面试中如何考察" aria-label="Permalink to &quot;分布式缓存在面试中如何考察&quot;">​</a></h3><p>对缓存和数据库的考察，一直都是业务开发同学在面试中的核心问题，特别是缓存部分，随着大部分公司业务规模的增加，缓存的应用越来越重要。我偶尔会和身边的同事调侃：如何应对高并发？答案是加一层缓存，如果不够，就再加一层缓存。</p><p>缓存在分布式场景下的应用，比单机情况下更加复杂，除了常见的缓存雪崩、缓存穿透的预防，还要额外考虑缓存数据之间的一致性，缓存节点的负载均衡，缓存的监控和优化等。在面试中，对分布式缓存的考察一般有两种方式：</p><ul><li><p>通过实际场景来考察对缓存设计和应用的理解；</p></li><li><p>直接考察常用的缓存组件，比如 Redis、Memcached、Tair。</p></li></ul><p>面试官通常会通过一个实际场景，结合常用的缓存组件，进行 System Design 相关方面的考察。下面我梳理了部分分布式缓存的高频考点，希望可以帮助你提纲挈领，体系化地去学习相关知识。</p><h4 id="缓存如何应用" tabindex="-1">缓存如何应用 <a class="header-anchor" href="#缓存如何应用" aria-label="Permalink to &quot;缓存如何应用&quot;">​</a></h4><ul><li><p>缓存雪崩、缓存穿透如何理解？</p></li><li><p>如何在业务中避免相关问题？</p></li><li><p>如何保证数据库与缓存的一致性？</p></li><li><p>如何进行缓存预热？</p></li></ul><h4 id="缓存的高可用" tabindex="-1">缓存的高可用 <a class="header-anchor" href="#缓存的高可用" aria-label="Permalink to &quot;缓存的高可用&quot;">​</a></h4><ul><li><p>缓存集群如何失效？</p></li><li><p>一致性哈希有哪些应用？</p></li><li><p>缓存如何监控和优化热点 key？</p></li></ul><h4 id="redis-应用" tabindex="-1">Redis 应用 <a class="header-anchor" href="#redis-应用" aria-label="Permalink to &quot;Redis 应用&quot;">​</a></h4><ul><li><p>Redis 有哪些数据结构？</p></li><li><p>Redis 和 Memcached 有哪些区别？</p></li><li><p>单线程的 Redis 如何实现高性能读写？</p></li><li><p>Redis 支持事务吗？</p></li><li><p>Redis 的管道如何实现？</p></li><li><p>Redis 有哪些失效策略？</p></li><li><p>Redis 的主从复制如何实现？</p></li><li><p>Redis 的 Sentinel 有哪些应用？</p></li><li><p>Redis 集群有哪几种方式？</p></li><li><p>Redis 和 memcached 什么区别？</p></li><li><p>Redis 的集群模式如何实现？</p></li><li><p>Redis 的 key 是如何寻址的？</p></li><li><p>Redis 的持久化底层如何实现？</p></li><li><p>Redis 过期策略都有哪些？</p></li><li><p>缓存与数据库不一致怎么办？</p></li><li><p>Redis 常见的性能问题和解决方案？</p></li><li><p>使用 Redis 如何实现异步队列？</p></li><li><p>Redis 如何实现延时队列?</p></li></ul><p>以上的这些问题，都是面试中非常高频的，你可以进行一个模拟面试，考察自己对这部分知识的掌握程度，有一部分问题在专栏中已经介绍过了，比如缓存集群、缓存一致性、缓存负载均衡等，专栏没有涉及的，可以作为一份索引，帮助你有针对性地学习。</p><p>今天的内容就到这里了，也欢迎你留言分享自己的面试经验，和大家一起讨论。</p>',15),t=[s];function d(_,r,o,n,c,h){return e(),l("div",null,t)}const m=i(p,[["render",d]]);export{R as __pageData,m as default};
