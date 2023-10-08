import{_ as e,j as _,o as n,g as r,k as o,h as p,Q as s,s as t}from"./chunks/framework.a0d18f64.js";const N=JSON.parse('{"title":"03如何使用简洁的架构实现高性能读服务？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/23讲搞定后台架构实战_文档/(6128) 03  如何使用简洁的架构实现高性能读服务？.md","filePath":"posts/backEnd/23讲搞定后台架构实战_文档/(6128) 03  如何使用简洁的架构实现高性能读服务？.md","lastUpdated":1696682708000}'),l={name:"posts/backEnd/23讲搞定后台架构实战_文档/(6128) 03  如何使用简洁的架构实现高性能读服务？.md"},i=s("",13),c=t("p",null,"图 1：分层架构的读服务",-1),h=t("p",null,"但在实际的应用中，通过监控图可以发现此种架构下，读服务性能的平均值离 TP99 或 TP999 有较大的差距，通常在一倍以上。另外，性能的毛刺也比较多。产生这种情况有以下两个原因。",-1),g=t("ul",null,[t("li",null,[t("p",null,"一方面是因为采用分层架构之后，网络传输相比不分层的架构多了一倍。")]),t("li",null,[t("p",null,"另一方面，读服务的业务逻辑都比较简单，性能主要消耗在网络传输上。因此，请求查询的数据越少，性能越好，假设为 10ms；数据多时，性能则较差，假设为 50ms。当叠加上分层架构，性能就会翻倍。比如数据少时，从 10ms 变成 20ms；数据多时，从 50ms 变成 100ms。分层后，数据的多与少带来的性能差距达到了 80ms，这也是产生毛刺差的原因。")])],-1),d=t("p",null,"因此，为了提高查询的性能减少毛刺同时降低部署机器的数量，可以将水平拆分的数据访问层代码工程保留独立，但在实际编译时，直接编译到读服务里。以 Java 举例，直接将数据访问层编译为 JAR 包并由读服务进行依赖。这样在部署时，它们在同一个进程里，去掉网络传输升级后的架构如下图 2 所示：",-1),u=t("p",null,"图 2：内嵌的读服务架构",-1),m=t("p",null,"在实际的案例中，当进行此项升级后。性能有了较明显变化，TP999 基本降了一半，平均性能降了 20%~30% 。下图 3 展示了一个大致效果图，你可以感受一下：",-1),A=s("",6),T=s("",10),q=s("",14),P=s("",13);function S(b,E,k,C,V,f){const a=_("Image");return n(),r("div",null,[i,o(a,{alt:"后台架构03-01.png",src:"https://s0.lgstatic.com/i/image2/M01/05/4E/CgpVE1_-wsKAWnpuAAEex8Z-iKE288.png"}),p(),c,h,g,d,o(a,{alt:"后台架构03-02.png",src:"https://s0.lgstatic.com/i/image2/M01/05/4E/CgpVE1_-wtiAaRpBAADdmuBNJ3g815.png"}),p(),u,m,o(a,{alt:"后台架构03-03.png",src:"https://s0.lgstatic.com/i/image2/M01/05/4E/CgpVE1_-wt-AcXaSAAEV5CdwEDo686.png"}),p(),A,o(a,{alt:"后台架构03-04.png",src:"https://s0.lgstatic.com/i/image/M00/8D/71/CgqCHl_-wueADhWyAAHEiP6SVNs042.png"}),p(),T,o(a,{alt:"Lark20210113-183227.png",src:"https://s0.lgstatic.com/i/image2/M01/05/4F/CgpVE1_-zOeAFrAkAAE8o488Rnw822.png"}),p(),q,o(a,{alt:"Lark20210113-183234.png",src:"https://s0.lgstatic.com/i/image2/M01/05/4E/Cip5yF_-zPCAZNO6AAFv5tD1TrU481.png"}),p(),P])}const D=e(l,[["render",S]]);export{N as __pageData,D as default};
