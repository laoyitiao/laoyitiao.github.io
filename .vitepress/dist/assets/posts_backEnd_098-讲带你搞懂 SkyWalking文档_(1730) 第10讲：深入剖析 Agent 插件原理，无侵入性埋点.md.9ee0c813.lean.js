import{_ as o,j as e,o as t,g as c,k as a,h as s,Q as p,s as l}from"./chunks/framework.cfb14fe0.js";const _=JSON.parse('{"title":"第10讲：深入剖析Agent插件原理，无侵入性埋点","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/098-讲带你搞懂 SkyWalking文档/(1730) 第10讲：深入剖析 Agent 插件原理，无侵入性埋点.md","filePath":"posts/backEnd/098-讲带你搞懂 SkyWalking文档/(1730) 第10讲：深入剖析 Agent 插件原理，无侵入性埋点.md","lastUpdated":1696682708000}'),r={name:"posts/backEnd/098-讲带你搞懂 SkyWalking文档/(1730) 第10讲：深入剖析 Agent 插件原理，无侵入性埋点.md"},E=p("",11),y=l("p",null,"这仅仅是一个简单的示例，在有的开源组件或类库中，不同版本中同名类的功能和结构已经发生了翻天覆地的变化。要通过一个 SkyWalking Agent 插件完成对一个开源组件所有版本的增强，是非常难实现的，即使勉强能够实现，该插件的实现也会变的非常臃肿，扩展性也会成问题。",-1),i=l("p",null,"SkyWalking 怎么解决这个问题呢？回到 MySQL 示例，SkyWalking 为每个版本的 mysql-connector-java.jar 提供了不同版本的插件，这些插件的 witnessClass() 方法返回值不同，具体返回的是对应版本 mysql-connector-java.jar 所特有的一个类，如下表所示：",-1),d=p("",4),h=p("",44),C=p("",6),F=p("",10),g=l("h3",{id:"总结",tabindex:"-1"},[s("总结 "),l("a",{class:"header-anchor",href:"#总结","aria-label":'Permalink to "总结"'},"​")],-1),A=l("p",null,"本课时深入介绍了 Agent 插件增强目标类的实现，这是 Agent 最核心功能，其中深入分析了增强静态方法、构造方法、实例方法的原理，以及插件如何让目标实例对象实现 EnhanceInstance 接口，如何为目标实例对象添加新字段等。为了帮助你更好的理解，在分析的过程中还以 mysql-8.x-plugin 插件为例将上述核心逻辑串连起来。",-1);function u(D,I,m,b,B,M){const n=e("Image");return t(),c("div",null,[E,a(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/84/1A/Cgq2xl6MPj2AU2eYAAApRprNPxs507.png"}),s(),y,i,a(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/0B/04/Ciqah16MPj2AVwefAABSICn8OOA333.png"}),s(),d,a(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/84/1A/Cgq2xl6MPj2AJ6ODAADEpCb6bgs755.png"}),s(),h,a(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/0B/04/Ciqah16MPj6AWNsiAABSl6fhydc390.png"}),s(),C,a(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/84/1A/Cgq2xl6MPj6AdwW_AABSs_M53Tk880.png"}),s(),F,a(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/0B/04/Ciqah16MPj6ACCrQAAETGCYTq30304.png"}),s(),g,A])}const S=o(r,[["render",u]]);export{_ as __pageData,S as default};
