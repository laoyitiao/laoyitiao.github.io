import{_ as i,j as n,o as s,g as r,k as o,h as a,Q as t,s as e}from"./chunks/framework.a0d18f64.js";const R=JSON.parse('{"title":"09日志型存储：为什么选择它作为底层存储？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/24讲吃透分布式数据库_文档/(6305) 09  日志型存储：为什么选择它作为底层存储？.md","filePath":"posts/backEnd/24讲吃透分布式数据库_文档/(6305) 09  日志型存储：为什么选择它作为底层存储？.md","lastUpdated":1696682708000}'),c={name:"posts/backEnd/24讲吃透分布式数据库_文档/(6305) 09  日志型存储：为什么选择它作为底层存储？.md"},_=t("",18),l=e("p",null,"最后，我再为你详细介绍一下刷盘的流程。",-1),d=e("p",null,"首先定义几种角色，如下表所示。",-1),h=t("",17),m=e("p",null,"其中，数据表按照大小进行合并，较小的数据表逐步合并为较大的数据表。第一层保存的是系统内最小的数据表，它们是刚刚从内存表中刷新出来的。合并过程就是将低层较小的数据表合并为高层较大的数据表的过程。Apache Cassandra 使用过这种合并策略。",-1),L=e("p",null,"该策略的优点是比较简单，容易实现。但是它的空间放大性很差，合并时层级越高该问题越严重。比如有两个 5GB 的文件需要合并，那么磁盘至少要保留 10GB 的空间来完成这次操作，可想而知此种容量压力是巨大的，必然会造成系统不稳定。",-1),S=e("p",null,"那么有没有什么策略能缓解空间放大呢？答案就是 Leveled Compaction。",-1),k=e("h4",{id:"leveled-compaction",tabindex:"-1"},[a("Leveled Compaction "),e("a",{class:"header-anchor",href:"#leveled-compaction","aria-label":'Permalink to "Leveled Compaction"'},"​")],-1),g=e("p",null,"如名称所示，该策略是将数据表进行分层，按照编号排成 L0 到 Ln 这样的多层结构。L0 层是从内存表刷盘产生的数据表，该层数据表中间的 key 是可以相交的；L1 层及以上的数据，将 Size-Tiered Compaction 中原本的大数据表拆开，成为多个 key 互不相交的小数据表，每层都有一个最大数据量阈值，当到达该值时，就出发合并操作。每层的阈值是按照指数排布的，例如 RocksDB 文档中介绍了一种排布：L1 是 300MB、L2 是 3GB、L3 是 30GB、L4 为 300GB。",-1),M=e("p",null,"该策略如下图所示。",-1),u=t("",19);function C(T,A,b,q,P,f){const p=n("Image");return s(),r("div",null,[_,o(p,{alt:"1.png",src:"https://s0.lgstatic.com/i/image6/M01/04/5F/Cgp9HWAqWPaAI1cVAAF0GY8NUFc418.png"}),a(),l,d,o(p,{alt:"2.png",src:"https://s0.lgstatic.com/i/image6/M00/04/5F/Cgp9HWAqWQKAYYdQAAChiD3W3lQ653.png"}),a(),h,o(p,{alt:"3.png",src:"https://s0.lgstatic.com/i/image6/M01/04/5C/CioPOWAqWQ6AH7acAACcL3NKUVQ048.png"}),a(),m,L,S,k,g,M,o(p,{alt:"4.png",src:"https://s0.lgstatic.com/i/image6/M01/04/5F/Cgp9HWAqWRmAPoPlAACQe1Ek6yI202.png"}),a(),u])}const y=i(c,[["render",C]]);export{R as __pageData,y as default};
