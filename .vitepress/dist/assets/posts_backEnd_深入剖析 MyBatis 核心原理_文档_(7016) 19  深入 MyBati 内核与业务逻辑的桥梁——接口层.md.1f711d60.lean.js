import{_ as p,j as e,o as t,g as c,k as l,h as n,Q as o,s}from"./chunks/framework.4e7d56ce.js";const B=JSON.parse('{"title":"19深入MyBati内核与业务逻辑的桥梁——接口层","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/深入剖析 MyBatis 核心原理_文档/(7016) 19  深入 MyBati 内核与业务逻辑的桥梁——接口层.md","filePath":"posts/backEnd/深入剖析 MyBatis 核心原理_文档/(7016) 19  深入 MyBati 内核与业务逻辑的桥梁——接口层.md","lastUpdated":1696682708000}'),r={name:"posts/backEnd/深入剖析 MyBatis 核心原理_文档/(7016) 19  深入 MyBati 内核与业务逻辑的桥梁——接口层.md"},i=o("",8),y=o("",5),E=s("p",null,"SqlSessionFactory 接口与 SqlSession 接口的实现类",-1),S=s("p",null,[n("默认情况下，"),s("strong",null,"我们在使用 MyBatis 的时候用的都是 DefaultSqlSession 这个默认的 SqlSession 实现"),n("。DefaultSqlSession 中维护了一个 Executor 对象，通过它来完成数据库操作以及事务管理。DefaultSqlSession 在选择使用哪种 Executor 实现的时候，使用到了策略模式：DefaultSqlSession 扮演了策略模式中的 StrategyUser 角色，Executor 接口扮演的是 Strategy 角色，Executor 接口的不同实现则对应 StrategyImpl 的角色。")],-1),u=s("p",null,"另外，DefaultSqlSession 还维护了一个 dirty 字段来标识缓存中是否有脏数据，它在执行 update() 方法修改数据时会被设置为 true，并在后续参与事务控制，决定当前事务是否需要提交或回滚。",-1),q=s("p",null,"下面接着来看 DefaultSqlSession 对 SqlSession 接口的实现。DefaultSqlSession 为每一类数据操作方法提供了多个重载，尤其是 select*() 操作，而且这些 select*() 方法的重载之间有相互依赖的关系，如下图所示：",-1),F=o("",28),g=s("p",null,[n("]("),s("a",{href:"https://shenceyun.lagou.com/t/Mka",target:"_blank",rel:"noreferrer"},"https://shenceyun.lagou.com/t/Mka"),n(")")],-1),d=s("p",null,[s("strong",null,"《Java 工程师高薪训练营》")],-1),m=s("p",null,[n("实战训练+面试模拟+大厂内推，想要提升技术能力，进大厂拿高薪，"),s("a",{href:"https://shenceyun.lagou.com/t/Mka",target:"_blank",rel:"noreferrer"},"点击链接，提升自己"),n("！")],-1);function D(h,A,_,f,v,C){const a=e("Image");return t(),c("div",null,[i,l(a,{alt:"图片2.png",src:"https://s0.lgstatic.com/i/image6/M01/27/B6/CioPOWBdmRKAZosJAAEAw6jnBB8920.png"}),n(),y,l(a,{alt:"图片1.png",src:"https://s0.lgstatic.com/i/image6/M01/27/B6/CioPOWBdmQiAIatQAAFZND8WjFQ155.png"}),n(),E,S,u,q,l(a,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image6/M00/24/72/Cgp9HWBYb-iAKkKeAADz5INxXLw311.png"}),n(),F,l(a,{alt:"1.png",src:"https://s0.lgstatic.com/i/image/M00/6D/3E/CgqCHl-s60-AC0B_AAhXSgFweBY762.png"}),n(),g,d,m])}const M=p(r,[["render",D]]);export{B as __pageData,M as default};
