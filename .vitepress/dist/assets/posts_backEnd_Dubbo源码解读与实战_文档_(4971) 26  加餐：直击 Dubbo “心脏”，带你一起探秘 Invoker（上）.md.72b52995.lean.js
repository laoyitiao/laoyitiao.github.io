import{_ as o,j as e,o as t,g as c,k as l,h as n,s,Q as p}from"./chunks/framework.4e7d56ce.js";const x=JSON.parse('{"title":"26加餐：直击Dubbo“心脏”，带你一起探秘Invoker（上）","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/Dubbo源码解读与实战_文档/(4971) 26  加餐：直击 Dubbo “心脏”，带你一起探秘 Invoker（上）.md","filePath":"posts/backEnd/Dubbo源码解读与实战_文档/(4971) 26  加餐：直击 Dubbo “心脏”，带你一起探秘 Invoker（上）.md","lastUpdated":1696682708000}'),r={name:"posts/backEnd/Dubbo源码解读与实战_文档/(4971) 26  加餐：直击 Dubbo “心脏”，带你一起探秘 Invoker（上）.md"},E=s("h1",{id:"_26加餐-直击dubbo-心脏-带你一起探秘invoker-上",tabindex:"-1"},[n("26加餐：直击Dubbo“心脏”，带你一起探秘Invoker（上） "),s("a",{class:"header-anchor",href:"#_26加餐-直击dubbo-心脏-带你一起探秘invoker-上","aria-label":'Permalink to "26加餐：直击Dubbo“心脏”，带你一起探秘Invoker（上）"'},"​")],-1),y=s("p",null,"在前面课时介绍 DubboProtocol 的时候我们看到，上层业务 Bean 会被封装成 Invoker 对象，然后传入 DubboProtocol.export() 方法中，该 Invoker 被封装成 DubboExporter，并保存到 exporterMap 集合中缓存。",-1),i=s("p",null,"在 DubboProtocol 暴露的 ProtocolServer 收到请求时，经过一系列解码处理，最终会到达 DubboProtocol.requestHandler 这个 ExchangeHandler 对象中，该 ExchangeHandler 对象会从 exporterMap 集合中取出请求的 Invoker，并调用其 invoke() 方法处理请求。",-1),d=s("p",null,"DubboProtocol.protocolBindingRefer() 方法则会将底层的 ExchangeClient 集合封装成 DubboInvoker，然后由上层逻辑封装成代理对象，这样业务层就可以像调用本地 Bean 一样，完成远程调用。",-1),h=s("h3",{id:"深入-invoker",tabindex:"-1"},[n("深入 Invoker "),s("a",{class:"header-anchor",href:"#深入-invoker","aria-label":'Permalink to "深入 Invoker"'},"​")],-1),u=s("p",null,"首先，我们来看 AbstractInvoker 这个抽象类，它继承了 Invoker 接口，继承关系如下图所示：",-1),v=p("",34),A=p("",8);function F(b,D,g,I,C,T){const a=e("Image");return t(),c("div",null,[E,y,i,d,h,u,l(a,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image/M00/61/07/Ciqc1F-Oq-uAdi4nAABRchTw_kQ666.png"}),n(),v,l(a,{alt:"Lark20201023-161312.png",src:"https://s0.lgstatic.com/i/image/M00/62/8F/CgqCHl-SkLWAaPzTAACgt5rmWHg530.png"}),n(),A])}const L=o(r,[["render",F]]);export{x as __pageData,L as default};
