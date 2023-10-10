import{_ as s,j as i,o as l,g as p,k as r,h as e,Q as t,s as a}from"./chunks/framework.cfb14fe0.js";const V=JSON.parse('{"title":"21知识串讲：如何取得性能和可扩展性的平衡？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/24讲吃透分布式数据库_文档/(6935) 21  知识串讲：如何取得性能和可扩展性的平衡？.md","filePath":"posts/backEnd/24讲吃透分布式数据库_文档/(6935) 21  知识串讲：如何取得性能和可扩展性的平衡？.md","lastUpdated":1696682708000}'),n={name:"posts/backEnd/24讲吃透分布式数据库_文档/(6935) 21  知识串讲：如何取得性能和可扩展性的平衡？.md"},c=t("",16),d=t("",22),h=a("p",null,"我们可以看到 ANY 级别实际上对应了最终一致性。Cassandra 使用了反熵那一讲提到的暗示切换技术来保障写入的数据的可靠，也就是写入节点一旦失败，数据会暂存在暗示切换队列中，等到节点恢复后数据可以被还原出来。",-1),_=a("h4",{id:"读一致性",tabindex:"-1"},[e("读一致性 "),a("a",{class:"header-anchor",href:"#读一致性","aria-label":'Permalink to "读一致性"'},"​")],-1),u=a("p",null,"对于读操作，一致性级别指定了返回数据之前必须有多少个副本节点响应这个读查询。这里同样给你整理了一个表格。",-1),P=a("p",null,"Cassandra 在读取的时候使用了读修复来修复副本上的过期数据，该修复过程是一个后台线程，故不会阻塞读取。",-1),m=a("p",null,"以上就是 Apache Cassandra 实现可调节一致性的一些细节。AWS 的 DynamoDB、Azure 的 CosmosDB 都有类似的可调节一致性供用户进行选择。你可以比照 Cassandra 的模式和这些数据库的文档进行学习。",-1),x=a("h3",{id:"总结",tabindex:"-1"},[e("总结 "),a("a",{class:"header-anchor",href:"#总结","aria-label":'Permalink to "总结"'},"​")],-1),A=a("p",null,[a("strong",null,"分布式系统是分布式数据库的核心，它与存储引擎相互配合共同实现了完整的分布式数据库的功能"),e("。存储引擎一般影响数据库的写入，也就是数据库的性能，它决定了数据库到底能多快地处理数据。同时，分布式系统处理节点直接的通信，也就是数据库的扩展性，它决定了数据库的扩展能力和数据容量。故两者需要相互配合，同时在设计使用数据库时，可以在它们之间进行一定的取舍，从而达到高效利用各种资源的目的。")],-1),D=a("p",null,"分布式系统这个模块，我们介绍了分布式数据库经常使用的知识点，特别是事务、一致性和共识是本模块的核心，希望你能好好掌握。",-1),T=a("p",null,"下一模块我们就进入实际案例中，我将分门别类地为你介绍市面中典型的分布式数据库。利用课程中的知识来分析它们，从而更好地帮助你去使用它们。",-1),f=a("p",null,"感谢学习，我们下一讲再见。",-1);function b(g,C,B,q,k,S){const o=i("Image");return l(),p("div",null,[c,r(o,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image6/M00/26/7C/CioPOWBbAfyAX5EPAAHEn31cNYM835.png"}),e(),d,r(o,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image6/M00/26/7C/CioPOWBbAgqAAj2MAACioCvzYAU571.png"}),e(),h,_,u,r(o,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image6/M00/26/7C/CioPOWBbAhKAF13EAACR3twAd-Q592.png"}),e(),P,m,x,A,D,T,f])}const I=s(n,[["render",b]]);export{V as __pageData,I as default};
