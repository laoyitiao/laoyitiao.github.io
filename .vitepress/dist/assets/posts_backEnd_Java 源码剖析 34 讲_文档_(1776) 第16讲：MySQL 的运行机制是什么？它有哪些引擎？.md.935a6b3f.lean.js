import{_ as o,j as t,o as p,g as c,k as e,Q as l,s as a,h as s}from"./chunks/framework.b3d8e22e.js";const b=JSON.parse('{"title":"典型回答 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/Java 源码剖析 34 讲_文档/(1776) 第16讲：MySQL 的运行机制是什么？它有哪些引擎？.md","filePath":"posts/backEnd/Java 源码剖析 34 讲_文档/(1776) 第16讲：MySQL 的运行机制是什么？它有哪些引擎？.md","lastUpdated":1696417798000}'),r={name:"posts/backEnd/Java 源码剖析 34 讲_文档/(1776) 第16讲：MySQL 的运行机制是什么？它有哪些引擎？.md"},i=l("",8),_=a("p",null,[a("strong",null,"当输入正确密码之后可以连接到数据库了"),s(`，如果密码输入错误，则会提示"Access denied for user 'xxx'@'xxx' (using password: YES)"密码错误信息，如下图所示：`)],-1),y=a("p",null,[a("strong",null,"当连接服务器端成功之后就可以正常的执行 SQL 命令了"),s(" ，MySQL 服务器拿到 SQL 命令之后，"),a("strong",null,"会使用 MySQL 的分析器解析 SQL 指令，同时会根据语法分析器验证 SQL 指令"),s('，查询 SQL 指令是否满足 MySQL 的语法规则。如果不支持此语法，则会提示"SQL syntax"语法错误信息。')],-1),d=a("p",null,[a("strong",null,"当分析器验证并解析 SQL 命令之后，会进入优化器阶段，执行生成计划，并设置相应的索引；当上面的这些步骤都执行完之后，就进入了执行器阶段，并开始正式执行 SQL 命令"),s(" 。同样在执行命令之前，它会先对你的执行命令进行权限查询，看看是否有操作某个表的权限，如果有相应的权限，执行器就去调用 MySQL 数据库引擎提供的接口，"),a("strong",null,"执行相应的命令；如果是非查询操作会记录对应的操作日志，再命令执行完成之后返回结果给客户端"),s("，这就是整个 MySQL 操作的完整流程。")],-1),h=a("p",null,"需要注意的是，如果执行的是 select 语句并且是 MySQL 8.0 之前的版本的话，则会去 MySQL 的查询缓存中查看之前是否有执行过这条 SQL；如果缓存中可以查到，则会直接返回查询结果，这样查询性能就会提升很高。",-1),S=a("p",null,"整个 SQL 的执行流程，如下图所示：",-1),u=a("p",null,"我们可以使用 SHOW ENGINES 命令来查看 MySQL 数据库使用的存储引擎，如下图所示：",-1),M=l("",28);function g(E,L,Q,m,q,A){const n=t("Image");return p(),c("div",null,[i,e(n,{alt:"image.png",src:"https://s0.lgstatic.com/i/image/M00/00/F1/Ciqc1F6qtjOARs11AABEmyDSuJs566.png"}),_,e(n,{alt:"image (1).png",src:"https://s0.lgstatic.com/i/image/M00/00/F1/CgqCHl6qtjqAHetRAAB0dQvpF6k199.png"}),y,d,h,S,e(n,{alt:"Java面试 16.png",src:"https://s0.lgstatic.com/i/image/M00/01/27/CgqCHl6r0YyAaKAIAAFBbmI8vwQ529.png"}),u,e(n,{alt:"image (3).png",src:"https://s0.lgstatic.com/i/image/M00/00/F1/CgqCHl6qtn2Ac9jLAAGz-uccw7E865.png"}),M])}const k=o(r,[["render",g]]);export{b as __pageData,k as default};
