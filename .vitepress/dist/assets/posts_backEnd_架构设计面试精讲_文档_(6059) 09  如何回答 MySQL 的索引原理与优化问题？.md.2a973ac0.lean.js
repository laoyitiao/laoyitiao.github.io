import{_ as o,j as e,o as t,g as r,k as n,h as l,Q as p,s}from"./chunks/framework.b3d8e22e.js";const I=JSON.parse('{"title":"案例背景 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/架构设计面试精讲_文档/(6059) 09  如何回答 MySQL 的索引原理与优化问题？.md","filePath":"posts/backEnd/架构设计面试精讲_文档/(6059) 09  如何回答 MySQL 的索引原理与优化问题？.md","lastUpdated":1696417798000}'),c={name:"posts/backEnd/架构设计面试精讲_文档/(6059) 09  如何回答 MySQL 的索引原理与优化问题？.md"},E=p("",18),y=p("",7),i=p("",6),_=p("",27),d=p("",7),A=p("",15),F=s("p",null,"区分度就是某个字段 column 不同值的个数除以表的总行数，比如性别的区分度就很小，不适合建立索引或不适合排在联合索引列的靠前的位置，而 uuid 这类字段就比较适合做索引或排在联合索引列的靠前的位置。",-1),u=s("h3",{id:"总结",tabindex:"-1"},[l("总结 "),s("a",{class:"header-anchor",href:"#总结","aria-label":'Permalink to "总结"'},"​")],-1),T=s("p",null,"今天，我们讲了 MySQL 的索引原理，介绍了 InnoDB 为什么会采用 B+Tree 结构。因为 B+Tree 能够减少单次查询的磁盘访问次数，做到查询效率最大化。另外，我们还讲了如何查看 SQL 的执行计划，从而找到索引失效的问题，并有针对性的做索引优化。",-1),h=s("p",null,"最后，我总结一些你容易在面试中被问到的，索引的使用原则：",-1),g=s("p",null,"另外，你在了解索引优势的同时，也要了解索引存在的问题：索引会带来数据的写入延迟，引入额外的空间消耗；在海量数据下，想要通过索引提升查询效率也是有限的。",-1),B=s("p",null,"所以此时你还要考虑其他的方案，比如读写分离、分库分表等设计方案（这些内容我会在11、12讲带你了解）。",-1),L=s("p",null,"最后，感谢你的阅读，我们下一讲见。",-1);function D(C,m,S,M,b,q){const a=e("Image");return t(),r("div",null,[E,n(a,{alt:"1.png",src:"https://s0.lgstatic.com/i/image/M00/92/35/Ciqc1GARAb2AeSnCAAF73_MTZck998.png"}),l(),y,n(a,{alt:"2.png",src:"https://s0.lgstatic.com/i/image2/M01/0A/2A/Cip5yGARAfSAAeR4AAJlafpM_D0118.png"}),l(),i,n(a,{alt:"3.png",src:"https://s0.lgstatic.com/i/image2/M01/0A/2D/CgpVE2ARAp2AKn1rAAuwHY1j7B4280.png"}),l(),_,n(a,{alt:"4.png",src:"https://s0.lgstatic.com/i/image/M00/92/41/CgqCHmARAz-AEslxAAFQoCZRpY4822.png"}),l(),d,n(a,{alt:"5.png",src:"https://s0.lgstatic.com/i/image/M00/92/41/CgqCHmARBA-AQThqAAE5tk3towI139.png"}),A,n(a,{alt:"6.png",src:"https://s0.lgstatic.com/i/image/M00/92/36/Ciqc1GARBC6AOagLAACKmpN6OcM499.png"}),F,u,T,h,n(a,{alt:"7修改.png",src:"https://s0.lgstatic.com/i/image2/M01/0A/8B/CgpVE2ASL8GAcyLgAAKaTC7eoBA481.png"}),g,B,L])}const Q=o(c,[["render",D]]);export{I as __pageData,Q as default};
