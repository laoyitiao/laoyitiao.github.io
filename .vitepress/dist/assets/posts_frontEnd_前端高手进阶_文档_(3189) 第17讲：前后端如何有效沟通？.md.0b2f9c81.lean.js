import{_ as o,j as e,o as t,g as c,k as p,h as n,Q as l,s}from"./chunks/framework.cfb14fe0.js";const w=JSON.parse('{"title":"第17讲：前后端如何有效沟通？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/前端高手进阶_文档/(3189) 第17讲：前后端如何有效沟通？.md","filePath":"posts/frontEnd/前端高手进阶_文档/(3189) 第17讲：前后端如何有效沟通？.md","lastUpdated":1696682708000}'),r={name:"posts/frontEnd/前端高手进阶_文档/(3189) 第17讲：前后端如何有效沟通？.md"},E=l("",43),y=s("p",null,"REST 风格的树结构 API",-1),i=s("p",null,"GraphQL 中不同类型之间的关联关系通过图来表示。下面是一张通过 GraphQL 工具生成的示例图，描述了不同类型之间的关系。",-1),u=s("p",null,"GraphQL Voyager 示例图",-1),q=s("p",null,[n('虽然 GraphQL 的设计理念和 REST 有较大差别，而且还上升到了"语言"层面，但核心概念其实就两个：'),s("strong",null,"查询语句和模式"),n("，分别对应 API 的调用者和提供者。")],-1),F=s("p",null,"GraphQL 的查询语句提供了 3 种操作：查询（Query）、变更（Mutation）和订阅（Subscription）。查询是最常用的操作，变更操作次之，订阅操作则使用场景就比较少了。",-1),d=s("p",null,"下面重点介绍一下查询操作中 3 个常用的高级功能。",-1),g=s("h4",{id:"别名-aliases",tabindex:"-1"},[n("别名（Aliases） "),s("a",{class:"header-anchor",href:"#别名-aliases","aria-label":'Permalink to "别名（Aliases）"'},"​")],-1),h=s("p",null,"别名看上去是一个锦上添花的功能，但在开发中也会起到非常重要的作用。考虑一个场景，前端通过请求 GET /user/:uid 获取一个关于用户信息的 JSON 对象，并使用了返回结果中的 name 字段。如果后端调整了接口数据，将 name 字段改成了 username，那么对于前端来说只能被动地修改代码；而如果使用 GraphQL，只需要修改查询的别名即可。",-1),C=s("p",null,"下面是一个使用别名将 GitHub GraphQL API 的 createdAt 改为 createdTime 的代码示例。",-1),m=s("h4",{id:"片段-fragments",tabindex:"-1"},[n("片段（Fragments） "),s("a",{class:"header-anchor",href:"#片段-fragments","aria-label":'Permalink to "片段（Fragments）"'},"​")],-1),_=s("p",null,'如果我们在查询中有重复的数据结构，可以通过片段来对它们进行抽象。下面是一个使用 GitHub GraphQL API 来查询当前仓库第一位 star 用户和最后一位 star 用户的例子。将 StargazerEdge 类型的部分字段抽取成了 Fragment，然后在查询中通过扩展符"..."来使用。',-1),B=s("h4",{id:"内省-introspection",tabindex:"-1"},[n("内省（Introspection） "),s("a",{class:"header-anchor",href:"#内省-introspection","aria-label":'Permalink to "内省（Introspection）"'},"​")],-1),A=s("p",null,"调用 REST API 非常依赖文档，但 GraphQL 则不需要，因为它提供了一个内省系统来描述后端定义的类型。比如我要通过 GitHub GraphQL API 来查询某个仓库的 star 数量，可以先通过查询 __schema 字段来向 GraphQL 询问哪些类型是可用的。因为每个查询的根类型总是有 __schema 字段的。",-1),v=s("p",null,"__schema 查询根类型",-1),b=s("p",null,"通过搜索和查看描述信息 description 字段可以发现，其提供了一个 Repository 类型。",-1),T=s("p",null,'在返回的模式中找到 "Repository" 类型定义',-1),S=s("p",null,"然后再通过 __type 来查看 Repository 类型的字段，找到和 star 有关的 stargazers 字段描述，发现这个字段属于 StargazerConnection 类型，以此类推继续查找，后面的嵌套子类型查找过程就不一一截图了。",-1),D=s("p",null,"通过 __type 查找 Repository 类型字段",-1),P=s("p",null,"最终通过下面的查询语句获得了第一页的查询结果。",-1),k=l("",17);function f(R,I,G,L,Q,j){const a=e("Image");return t(),c("div",null,[E,p(a,{alt:"6.png",src:"https://s0.lgstatic.com/i/image/M00/36/07/Ciqc1F8WoxOAdBPEAACqLbjGIac092.png"}),n(),y,i,p(a,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image/M00/36/12/CgqCHl8Wo1WAearCAANIR7MjhAg120.png"}),n(),u,q,F,d,g,h,C,p(a,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image/M00/36/13/CgqCHl8Wo1-AA9T0AABKgupgzvE288.png"}),n(),m,_,p(a,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image/M00/36/07/Ciqc1F8Wo2eAWQKRAABuxFd9qHg398.png"}),n(),B,A,p(a,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image/M00/36/07/Ciqc1F8Wo2-AT2HWAACaIf1oGHY694.png"}),n(),v,b,p(a,{alt:"Drawing 5.png",src:"https://s0.lgstatic.com/i/image/M00/36/07/Ciqc1F8Wo32ARrwHAAAO3toZwNE658.png"}),n(),T,S,p(a,{alt:"Drawing 6.png",src:"https://s0.lgstatic.com/i/image/M00/36/13/CgqCHl8Wo4aAR-jZAACPhMdzzyI323.png"}),n(),D,P,p(a,{alt:"Drawing 7.png",src:"https://s0.lgstatic.com/i/image/M00/36/13/CgqCHl8Wo46Act65AAB9YZfeB7U087.png"}),n(),k])}const O=o(r,[["render",f]]);export{w as __pageData,O as default};
