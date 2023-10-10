import{_ as p,j as n,o as _,g as s,k as i,h as a,s as l,Q as e}from"./chunks/framework.cfb14fe0.js";const f=JSON.parse('{"title":"第04讲：高性能索引该如何设计（下）","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/040_高性能MySQL实战/(53) 第04讲：高性能索引该如何设计（下）.md","filePath":"posts/backEnd/040_高性能MySQL实战/(53) 第04讲：高性能索引该如何设计（下）.md","lastUpdated":1696682708000}'),r={name:"posts/backEnd/040_高性能MySQL实战/(53) 第04讲：高性能索引该如何设计（下）.md"},o=l("h1",{id:"第04讲-高性能索引该如何设计-下",tabindex:"-1"},[a("第04讲：高性能索引该如何设计（下） "),l("a",{class:"header-anchor",href:"#第04讲-高性能索引该如何设计-下","aria-label":'Permalink to "第04讲：高性能索引该如何设计（下）"'},"​")],-1),c=l("h1",{id:"索引使用技巧",tabindex:"-1"},[a("索引使用技巧 "),l("a",{class:"header-anchor",href:"#索引使用技巧","aria-label":'Permalink to "索引使用技巧"'},"​")],-1),d=l("p",null,"接下来聊一聊索引使用技巧的基础知识，这些知识可以帮助你建立高效索引，主要有谓词、过滤因子、基数（Cardinality）、选择率和回表。",-1),h=l("p",null,"先来看谓词。谓词本身就是条件表达式，通俗讲就是过滤字段。如下图中这句SQL语句，可以拆解为下面所示：",-1),u=e("",18),y=e("",9),S=e("",14),L=l("p",null,"创建一个 test 表。 在 a、b、c 上创建索引，执行表中的 SQL 语句，快速定位语句孰好孰坏。",-1),b=l("p",null,"首先分析 key_len， 因为 a、b、c 不允许 NULL 的 varchar(50)，那么，每个字段的 key_len 为 50×4+2=202，整个联合索引的 key_len 为 202×3=606。",-1),m=l("br",null,null,-1),A=e("",17);function C(k,g,T,I,Q,N){const t=n("Image");return _(),s("div",null,[o,c,d,h,i(t,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/01/CgoB5l13RzCAEJe6AAAOrarzVzs759.png"}),a(),u,i(t,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/21/CgotOV13RzCADVtlAAFDgIXElhk146.png"}),a(),y,i(t,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/01/CgoB5l13RzCABUIdAADOdhOY9Zo983.png"}),a(),S,i(t,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/21/CgotOV13RzCAbwmyAAFCo-zJd54422.png"}),a(),L,b,m,i(t,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/01/CgoB5l13RzGAeBmpAAB9U02QtNE841.png"}),a(),A])}const D=p(r,[["render",C]]);export{f as __pageData,D as default};
