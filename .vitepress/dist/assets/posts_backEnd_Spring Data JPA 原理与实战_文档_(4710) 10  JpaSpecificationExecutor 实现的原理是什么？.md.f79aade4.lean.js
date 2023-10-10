import{_ as o,j as e,o as t,g as c,k as p,h as a,Q as l,s}from"./chunks/framework.cfb14fe0.js";const P=JSON.parse('{"title":"10JpaSpecificationExecutor实现的原理是什么？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/Spring Data JPA 原理与实战_文档/(4710) 10  JpaSpecificationExecutor 实现的原理是什么？.md","filePath":"posts/backEnd/Spring Data JPA 原理与实战_文档/(4710) 10  JpaSpecificationExecutor 实现的原理是什么？.md","lastUpdated":1696682708000}'),r={name:"posts/backEnd/Spring Data JPA 原理与实战_文档/(4710) 10  JpaSpecificationExecutor 实现的原理是什么？.md"},E=l("",16),y=l("",5),i=l("",12),F=l("",11),u=l("",2),d=s("p",null,"如上图所示，我们加入 groupyBy 某个字段，SQL 也会有相应的变化。那么我们再来看第三个参数。",-1),g=s("h4",{id:"criteriabuilder-cb",tabindex:"-1"},[a("CriteriaBuilder cb "),s("a",{class:"header-anchor",href:"#criteriabuilder-cb","aria-label":'Permalink to "CriteriaBuilder cb"'},"​")],-1),A=s("p",null,"CriteriaBuilder 是用来构建 CritiaQuery 的构建器对象，其实就相当于条件或者条件组合，并以 Predicate 的形式返回。它基本上提供了所有常用的方法，如下所示：",-1),D=s("p",null,"我们直接通过此类的 Structure 视图就可以看到都有哪些方法。其中，and、any 等用来做查询条件的组合；类似 between、equal、exist、ge、gt、isEmpty、isTrue、in 等用来做查询条件的查询，类似下图的一些方法。",-1),C=l("",8),m=s("p",null,"从图中我们可以看得出来：",-1),h=s("ol",null,[s("li",null,[s("p",null,"JpaSpecificationExecutor 和 JpaRepository 是平级接口，而它们对应的实现类都是 SimpleJpaRepository；")]),s("li",null,[s("p",null,"Specification 被 ExampleSpecification 和 JpaSpecificationExector 使用，用来创建查询；")]),s("li",null,[s("p",null,"Predicate 是 JPA 协议里面提供的查询条件的根基；")]),s("li",null,[s("p",null,"SimpleJpaRepository 利用 EntityManager 和 criteria 来实现由 JpaSpecificationExector 组合的 query。")])],-1),B=s("p",null,"那么我们再直观地看一下 JpaSpecificationExecutor 接口里面的方法 findAll 对应的 SimpleJpaRepository 里面的实现方法 findAl，我们通过工具可以很容易地看到相应的实现方法，如下所示：",-1),b=s("p",null,"你要知道，得到 TypeQuery 就可以直接操作JPA协议里面相应的方法了，那么我们看下 getQuery（spec，pageable）的实现过程。",-1),S=s("p",null,"之后一步一步 debug 就可以了。",-1),f=l("",28);function v(q,_,k,x,T,j){const n=e("Image");return t(),c("div",null,[E,p(n,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image/M00/5E/C7/Ciqc1F-Hw4GAVwjvAACBlHuTFN0497.png"}),a(),y,p(n,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image/M00/5E/C7/Ciqc1F-Hw4uAGaD2AADHMlVN_q0440.png"}),a(),i,p(n,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image/M00/5E/C7/Ciqc1F-Hw5SAeoXKAAMzN3mF_8I181.png"}),a(),F,p(n,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image/M00/5E/C7/Ciqc1F-Hw6uAJmdyAALVLoSlnLQ418.png"}),a(),u,p(n,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image/M00/5E/D2/CgqCHl-Hw7SAYWLnAAEIg0u_SOc872.png"}),a(),d,g,A,p(n,{alt:"Drawing 5.png",src:"https://s0.lgstatic.com/i/image/M00/5E/C7/Ciqc1F-Hw7yAZgOYAASXGLn8fS0352.png"}),a(),D,p(n,{alt:"Drawing 6.png",src:"https://s0.lgstatic.com/i/image/M00/5E/D3/CgqCHl-Hw8KAS41dAAKQ7MNjups722.png"}),a(),C,p(n,{alt:"Drawing 7.png",src:"https://s0.lgstatic.com/i/image/M00/5E/C7/Ciqc1F-Hw9KAPLUnAAEGAy5X1Y8192.png"}),a(),m,h,B,p(n,{alt:"Drawing 8.png",src:"https://s0.lgstatic.com/i/image/M00/5E/D3/CgqCHl-Hw9uAHAiHAAFZTdcBw2Y564.png"}),a(),b,p(n,{alt:"Drawing 9.png",src:"https://s0.lgstatic.com/i/image/M00/5E/C7/Ciqc1F-Hw-qAcTArAACqAeHRq3M302.png"}),a(),S,p(n,{alt:"Drawing 10.png",src:"https://s0.lgstatic.com/i/image/M00/5E/D3/CgqCHl-Hw_KAU1wCAAW1BokuNt8728.png"}),a(),f])}const U=o(r,[["render",v]]);export{P as __pageData,U as default};
