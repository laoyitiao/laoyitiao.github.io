import{_ as p,j as o,o as t,g as r,k as e,h as a,s,Q as l}from"./chunks/framework.b3d8e22e.js";const q=JSON.parse('{"title":"RoutingStatementHandler ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/深入剖析 MyBatis 核心原理_文档/(6387) 16  StatementHandler：参数绑定、SQL 执行和结果映射的奠基者.md","filePath":"posts/backEnd/深入剖析 MyBatis 核心原理_文档/(6387) 16  StatementHandler：参数绑定、SQL 执行和结果映射的奠基者.md","lastUpdated":1696417798000}'),c={name:"posts/backEnd/深入剖析 MyBatis 核心原理_文档/(6387) 16  StatementHandler：参数绑定、SQL 执行和结果映射的奠基者.md"},E=s("p",null,[s("strong",null,"StatementHandler 接口是 MyBatis 中非常重要的一个接口"),a("，其实现类完成 SQL 语句执行中最核心的一系列操作，这也是后面我们要介绍的 Executor 接口实现的基础。")],-1),y=s("p",null,"StatementHandler 接口的定义如下图所示：",-1),i=s("p",null,"StatementHandler 接口中定义的方法",-1),d=s("p",null,"可以看到，其中提供了创建 Statement 对象（prepare() 方法）、为 SQL 语句绑定实参（parameterize() 方法）、执行单条 SQL 语句（query() 方法和 update() 方法）、批量执行 SQL 语句（batch() 方法）等多种功能。",-1),u=s("p",null,"下图展示了 MyBatis 中提供的所有 StatementHandler 接口实现类，以及它们的继承关系：",-1),m=l("",13),S=l("",35),F={href:"https://shenceyun.lagou.com/t/Mka",target:"_blank",rel:"noreferrer"},g=s("p",null,[s("strong",null,"《Java 工程师高薪训练营》")],-1),A=s("p",null,[a("实战训练+面试模拟+大厂内推，想要提升技术能力，进大厂拿高薪，"),s("a",{href:"https://shenceyun.lagou.com/t/Mka",target:"_blank",rel:"noreferrer"},"点击链接，提升自己"),a("！")],-1);function h(D,b,C,H,B,P){const n=o("Image");return t(),r("div",null,[E,y,e(n,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image6/M00/1F/5B/Cgp9HWBRyPSAPnqwAADa0tXnYqQ008.png"}),a(),i,d,u,e(n,{alt:"图片3.png",src:"https://s0.lgstatic.com/i/image6/M00/1F/64/Cgp9HWBR0IaAXG4BAAGLvM_7w1Y255.png"}),a(),m,e(n,{alt:"图片4.png",src:"https://s0.lgstatic.com/i/image6/M00/1F/64/Cgp9HWBR0HmAAYIQAAE2FEB8sfU102.png"}),a(),S,s("p",null,[s("a",F,[e(n,{alt:"1.png",src:"https://s0.lgstatic.com/i/image/M00/6D/3E/CgqCHl-s60-AC0B_AAhXSgFweBY762.png"})])]),g,A])}const v=p(c,[["render",h]]);export{q as __pageData,v as default};
