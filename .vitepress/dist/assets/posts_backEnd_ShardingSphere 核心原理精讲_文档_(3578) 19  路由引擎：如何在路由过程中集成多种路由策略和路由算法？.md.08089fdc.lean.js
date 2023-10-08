import{_ as o,j as e,o as t,g as r,k as l,h as a,Q as p,s}from"./chunks/framework.4e7d56ce.js";const q=JSON.parse('{"title":"19路由引擎：如何在路由过程中集成多种路由策略和路由算法？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/ShardingSphere 核心原理精讲_文档/(3578) 19  路由引擎：如何在路由过程中集成多种路由策略和路由算法？.md","filePath":"posts/backEnd/ShardingSphere 核心原理精讲_文档/(3578) 19  路由引擎：如何在路由过程中集成多种路由策略和路由算法？.md","lastUpdated":1696682708000}'),c={name:"posts/backEnd/ShardingSphere 核心原理精讲_文档/(3578) 19  路由引擎：如何在路由过程中集成多种路由策略和路由算法？.md"},E=p("",6),y=p("",4),i=s("p",null,"ShardingAlgorithm 子接口和实现类图",-1),g=s("p",null,[a("请注意，ShardingStrategy 与 ShardingAlgorithm 之间并不是一对一的关系。"),s("strong",null,"在一个 ShardingStrategy 中，可以同时使用多个 ShardingAlgorithm 来完成具体的路由执行策略"),a("。因此，我们具有如下所示的类层结构关系图：")],-1),d=p("",64),h=s("p",null,"ShardingStrategy 相关类的包结构",-1),u=s("p",null,"而所有的 ShardingAlgorithm 相关类则位于 sharding-core-api 工程的 org.apache.shardingsphere.api.sharding 包下：",-1),S=p("",4),F=s("p",null,"ShardingStrategyConfiguration 相关类的包结构",-1),A=s("br",null,null,-1),C=s("p",null,"这样，通过对路由引擎的介绍，我们又接触到了一大批 ShardingSphere 中的源代码。",-1),m=s("p",null,"至此，关于 ShardingSphere 路由引擎部分的内容基本都介绍完毕。作为总结，我们在《17 | 路由引擎：如何理解分片路由核心类 ShardingRouter 的运作机制？》中所给出的时序图中添加了 ShardingStrategy 和 ShardingAlgorithm 部分的内容，如下所示：",-1),D=s("h3",{id:"从源码解析到日常开发",tabindex:"-1"},[a("从源码解析到日常开发 "),s("a",{class:"header-anchor",href:"#从源码解析到日常开发","aria-label":'Permalink to "从源码解析到日常开发"'},"​")],-1),v=s("p",null,[a("在我们设计软件系统的过程中，面对复杂业务场景时，"),s("strong",null,"职责分离"),a("始终是需要考虑的一个设计点。ShardingSphere 对于分片策略的设计和实现很好地印证了这一观点。")],-1),b=s("p",null,"分片策略在 ShardingSphere 中实际上是一个比较复杂的概念，但通过将分片的具体算法分离出去并提炼 ShardingAlgorithm 接口，并构建 ShardingStrategy 和 ShardingAlgorithm 之间一对多的灵活关联关系，我们可以更好地把握整个分片策略体系的类层结构，这种职责分离机制同样可以应用与日常开发过程中。",-1),f=s("h3",{id:"小结与预告",tabindex:"-1"},[a("小结与预告 "),s("a",{class:"header-anchor",href:"#小结与预告","aria-label":'Permalink to "小结与预告"'},"​")],-1),V=s("p",null,"承接上一课时的内容，今天我们全面介绍了 ShardingSphere 中的五大分片策略和四种分片算法以及它们之间的组合关系。",-1),_=s("p",null,"ShardingSphere 路由引擎中执行路由的过程正是依赖于这些分片策略和分片算法的功能特性。当然，作为一款具有高扩展性的开源框架，我们也可以基于自身的业务需求，实现特定的分片算法并嵌入到具体的分片策略中。",-1),B=s("p",null,"这里给你留一道思考题：ShardingSphere 中分片策略与分片算法之间是如何协作的？ 欢迎你在留言区与大家讨论，我将一一点评解答。",-1),R=s("p",null,"在路由引擎的基础上，下一课时将进入 ShardingSphere 分片引擎的另一个核心阶段，即改写引擎。",-1);function N(T,k,I,H,w,x){const n=e("Image");return t(),r("div",null,[E,l(n,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image/M00/42/E5/Ciqc1F86ZlmARCBiAAEMHwjkZPk259.png"}),a(),y,l(n,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image/M00/42/E5/Ciqc1F86ZmSAaVqsAACWpLDZQm8610.png"}),a(),i,g,l(n,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image/M00/42/E5/Ciqc1F86Zm-AE3bOAACLylkVuks873.png"}),a(),d,l(n,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image/M00/42/F1/CgqCHl86Zp-AOn75AAII97S_QVE429.png"}),a(),h,u,l(n,{alt:"Drawing 5.png",src:"https://s0.lgstatic.com/i/image/M00/42/F1/CgqCHl86ZqeAEn76AAGjHlgYljM135.png"}),a(),S,l(n,{alt:"Drawing 6.png",src:"https://s0.lgstatic.com/i/image/M00/42/F1/CgqCHl86ZrGAJLi5AADslitwfjk537.png"}),a(),F,A,C,m,l(n,{alt:"Drawing 7.png",src:"https://s0.lgstatic.com/i/image/M00/42/F1/CgqCHl86ZrmAcGiLAADURjzyD4w363.png"}),a(),D,v,b,f,V,l(n,{alt:"Drawing 9.png",src:"https://s0.lgstatic.com/i/image/M00/42/F1/CgqCHl86ZsaAQx7cAABspIBuz1Y073.png"}),a(),_,B,R])}const L=o(c,[["render",N]]);export{q as __pageData,L as default};
