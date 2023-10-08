import{_ as l,j as t,o as e,g as r,k as p,h as a,Q as o,s}from"./chunks/framework.a0d18f64.js";const O=JSON.parse('{"title":"09流数据操作：最基本的流计算功能","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/21讲吃透实时流计算_文档/(6426) 09  流数据操作：最基本的流计算功能.md","filePath":"posts/backEnd/21讲吃透实时流计算_文档/(6426) 09  流数据操作：最基本的流计算功能.md","lastUpdated":1696682708000}'),c={name:"posts/backEnd/21讲吃透实时流计算_文档/(6426) 09  流数据操作：最基本的流计算功能.md"},E=o("",17),y=o("",7),i=o("",8),u=o("",10),g=o("",10),F=o("",9),d=o("",7),m=s("p",null,"到此为止，我们讨论了过滤 filter、映射 map、展开映射 flatMap、聚合 reduce、关联 join、分组key by、遍历 foreach 这 7 个通用的流数据操作 API。这 7 个 API 是最基础的流式编程接口，几乎所有的开源流计算框架都提供了这些 API 的实现，而其他功能更丰富的 API 也会构建在这些方法基础之上。",-1),h=s("h3",{id:"流数据操作-api-总结",tabindex:"-1"},[a("流数据操作 API 总结 "),s("a",{class:"header-anchor",href:"#流数据操作-api-总结","aria-label":'Permalink to "流数据操作 API 总结"'},"​")],-1),_=s("p",null,"最后，为了更加清晰地理解流数据操作，我这里用一个表格对今天讲到的各个 API 做了一个比较和总结。",-1),q=s("h3",{id:"小结",tabindex:"-1"},[a("小结 "),s("a",{class:"header-anchor",href:"#小结","aria-label":'Permalink to "小结"'},"​")],-1),A=s("p",null,"今天，我们讨论了使用流计算技术可以解决的第一类算法问题，即流数据操作。",-1),C=s("p",null,'应该说，今天讲解的流数据操作 API ，既是流计算系统的基本功能，也是实现更复杂算法和功能的基础。在日常开发中，我们经常会使用到流数据操作。比如，大数据领域有个专门的岗位就是"ETL 工程师"，对于"ETL 工程师"而言，他们不可避免地会用到今天所讨论的这些 API 。',-1),S=s("p",null,"目前，有一些开源流计算框架（比如 Flink），直接提供了更方便好用的 SQL 来实现流数据操作，这当然是非常好的新功能。但它们在经过 SQL 层的解析后，最终也会对应到今天所讨论的这些相对底层的 API 。所以，如果你以前没有接触过这类流式编程 API 的话，今天的内容就需要好好理解下了。因为这些 API 以后你会经常用到，而且需要灵活地运用。",-1),T=s("p",null,"最后留一个小问题，你知道在 Flink 中都有哪几种 join 操作，以及每一种 join 操作的设计意图是怎样的呢？可以将你的想法或问题发表在留言区，我看到后会进行解答，或者在后面的课程中进一步补充说明。",-1),b=s("p",null,"下面是本课时的内容脑图，以便于你理解。",-1);function f(v,B,k,D,P,x){const n=t("Image");return e(),r("div",null,[E,p(n,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image6/M01/05/07/Cgp9HWAvf1qAcRb8AAENOHxBcHQ755.png"}),a(),y,p(n,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image6/M01/05/03/CioPOWAvf2qAW8uJAAHMY4fCT-Q209.png"}),a(),i,p(n,{alt:"Drawing 5.png",src:"https://s0.lgstatic.com/i/image6/M01/05/03/CioPOWAvf3aAA-07AAH_kitdggw058.png"}),a(),u,p(n,{alt:"Drawing 7.png",src:"https://s0.lgstatic.com/i/image6/M01/05/03/CioPOWAvf4-AHrPQAAHqzk0v5gA065.png"}),a(),g,p(n,{alt:"Drawing 9.png",src:"https://s0.lgstatic.com/i/image6/M01/05/04/CioPOWAvf56AaJv2AALzmOldYwg865.png"}),a(),F,p(n,{alt:"Drawing 11.png",src:"https://s0.lgstatic.com/i/image6/M01/05/04/CioPOWAvf6mACztZAAF2AbsUBQA253.png"}),a(),d,p(n,{alt:"Drawing 13.png",src:"https://s0.lgstatic.com/i/image6/M01/05/04/CioPOWAvf7OAXhqWAADDFypCNHs425.png"}),a(),m,h,_,p(n,{alt:"Drawing 14.png",src:"https://s0.lgstatic.com/i/image6/M01/05/07/Cgp9HWAvf8CAVqn_AAX2Q37EfZU278.png"}),a(),q,A,C,S,T,b,p(n,{alt:"Drawing 16.png",src:"https://s0.lgstatic.com/i/image6/M00/05/07/Cgp9HWAvf8qAeloIAAfFRT7ijAs781.png"})])}const j=l(c,[["render",f]]);export{O as __pageData,j as default};
