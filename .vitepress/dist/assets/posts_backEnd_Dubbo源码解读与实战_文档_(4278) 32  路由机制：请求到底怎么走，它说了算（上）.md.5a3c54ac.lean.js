import{_ as p,j as t,o as e,g as r,k as l,h as s,Q as o,s as n}from"./chunks/framework.cfb14fe0.js";const m=JSON.parse('{"title":"32路由机制：请求到底怎么走，它说了算（上）","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/Dubbo源码解读与实战_文档/(4278) 32  路由机制：请求到底怎么走，它说了算（上）.md","filePath":"posts/backEnd/Dubbo源码解读与实战_文档/(4278) 32  路由机制：请求到底怎么走，它说了算（上）.md","lastUpdated":1696682708000}'),c={name:"posts/backEnd/Dubbo源码解读与实战_文档/(4278) 32  路由机制：请求到底怎么走，它说了算（上）.md"},E=o("",15),y=n("p",null,"RouterFactory 继承关系图",-1),i=n("p",null,[s("下面我们就来深入介绍下每个 RouterFactory 实现类以及对应的 Router 实现对象。"),n("strong",null,"Router 决定了一次 Dubbo 调用的目标服务，Router 接口的每个实现类代表了一个路由规则"),s("，当 Consumer 访问 Provider 时，Dubbo 根据路由规则筛选出合适的 Provider 列表，之后通过负载均衡算法再次进行筛选。Router 接口的继承关系如下图所示：")],-1),u=o("",25),F=o("",4),d=n("p",null,"whenCondition 集合示意图",-1),g=n("p",null,[s("同理，parseRule() 方法解析上述表达式 "),n("code",null,"=>"),s(" 之后的规则得到的 thenCondition 集合，如下图所示：")],-1),h=o("",18);function A(C,v,D,R,B,k){const a=t("Image");return e(),r("div",null,[E,l(a,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image/M00/6B/ED/CgqCHl-qOLWAf_G5AACv9PqZOrc667.png"}),s(),y,i,l(a,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image/M00/6B/E2/Ciqc1F-qOL2AAXYIAACMVPC1qW0732.png"}),s(),u,l(a,{alt:"2.png",src:"https://s0.lgstatic.com/i/image/M00/6D/97/CgqCHl-uM9aALLGaAAFMMnXRAPw685.png"}),s(),F,l(a,{alt:"3.png",src:"https://s0.lgstatic.com/i/image/M00/6D/8B/Ciqc1F-uM-OABiPoAADt1lcbl7U975.png"}),s(),d,g,l(a,{alt:"1.png",src:"https://s0.lgstatic.com/i/image/M00/6D/97/CgqCHl-uM-6AXnrOAAB6hJLFL50095.png"}),s(),h])}const b=p(c,[["render",A]]);export{m as __pageData,b as default};
