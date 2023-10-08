import{_ as o,j as l,o as n,g as s,k as t,h as p,Q as i,s as a}from"./chunks/framework.4e7d56ce.js";const F=JSON.parse('{"title":"03数据分片：如何存储超大规模的数据？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/24讲吃透分布式数据库_文档/(6299) 03  数据分片：如何存储超大规模的数据？.md","filePath":"posts/backEnd/24讲吃透分布式数据库_文档/(6299) 03  数据分片：如何存储超大规模的数据？.md","lastUpdated":1696682708000}'),r={name:"posts/backEnd/24讲吃透分布式数据库_文档/(6299) 03  数据分片：如何存储超大规模的数据？.md"},_=i("",10),h=i("",13),c=a("p",null,"图 2 哈希分片",-1),d=a("h4",{id:"范围分片",tabindex:"-1"},[p("范围分片 "),a("a",{class:"header-anchor",href:"#范围分片","aria-label":'Permalink to "范围分片"'},"​")],-1),g=a("p",null,"范围分片根据数据值或键空间的范围对数据进行划分，相邻的分片键更有可能落入相同的分片上。每行数据不像哈希分片那样需要进行转换，实际上它们只是简单地被分类到不同的分片上。下图是范围分片的工作原理。",-1),A=i("",32),u=i("",9),T=a("p",null,"图 5 自动分片功能展示",-1),m=a("p",null,"自动分片包含下图所示的四个过程。",-1),S=a("p",null,"图 6 自动分片过程",-1),b=a("p",null,"从图 6 中可以看到，通过该工作量，ShardingShpere 可以支持复杂的基于哈希的自动分片。同时我们也应该看到，没有专业和自动化的弹性扩缩容工具，想要实现自动化分片是非常困难的。",-1),q=a("p",null,"以上就是分片算法的实际案例，使用的是经典的水平分片模式。而目前水平和垂直分片有进一步合并的趋势，下面要介绍的 TiDB 正代表着这种融合趋势。",-1),C=a("h3",{id:"垂直与水平分片融合案例",tabindex:"-1"},[p("垂直与水平分片融合案例 "),a("a",{class:"header-anchor",href:"#垂直与水平分片融合案例","aria-label":'Permalink to "垂直与水平分片融合案例"'},"​")],-1),P=a("p",null,"TiDB 就是一个垂直与水平分片融合的典型案例，同时该方案也是 HATP 融合方案。",-1),D=a("p",null,"其中水平扩展依赖于底层的 TiKV，如下图所示。",-1),k=a("p",null,"图 7 TiKV",-1),f=a("p",null,'TiKV 使用范围分片的模式，数据被分配到 Region 组里面。一个分组保持三个副本，这保证了高可用性（相关内容会在"05 | 一致性与 CAP 模型：为什么需要分布式一致性？"中详细介绍）。当 Region 变大后，会被拆分，新分裂的 Region 也会产生多个副本。',-1),V=a("p",null,"TiDB 的水平扩展依赖于 TiFlash，如下图所示。",-1),x=i("",11);function U(E,I,B,M,N,w){const e=l("Image");return n(),s("div",null,[_,t(e,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image2/M01/05/E8/CgpVE2ABUUmAL3H4AAGTDb7sQOQ568.png"}),p(),h,t(e,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image2/M01/05/E6/Cip5yGABUVOANTI_AACPCvFkQMQ491.png"}),p(),c,d,g,t(e,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image2/M01/05/E6/Cip5yGABUXSATworAABCLehE-pM870.png"}),p(),A,t(e,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image2/M01/05/E6/Cip5yGABUWmAW6olAAECEkYbH8U406.png"}),p(),u,t(e,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image/M00/8E/05/CgqCHmABUYSAb4GHAAQVlwbl-X4314.png"}),p(),T,m,t(e,{alt:"Drawing 5.png",src:"https://s0.lgstatic.com/i/image/M00/8D/F9/Ciqc1GABUY2ACpn4AAM1n2uEO-A067.png"}),p(),S,b,q,C,P,D,t(e,{alt:"Drawing 6.png",src:"https://s0.lgstatic.com/i/image/M00/8D/F9/Ciqc1GABUZWAF6UYAACmuUoCK3Y948.png"}),p(),k,f,V,t(e,{alt:"Drawing 7.png",src:"https://s0.lgstatic.com/i/image/M00/8D/F9/Ciqc1GABUZ-AAH-KAAJGbLaxtiI142.png"}),p(),x])}const v=o(r,[["render",U]]);export{F as __pageData,v as default};
