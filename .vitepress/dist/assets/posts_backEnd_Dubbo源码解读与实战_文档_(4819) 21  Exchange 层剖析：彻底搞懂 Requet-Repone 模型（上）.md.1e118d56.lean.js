import{_ as e,j as o,o as t,g as c,k as n,h as a,Q as p,s as l}from"./chunks/framework.b3d8e22e.js";const T=JSON.parse('{"title":"Request 和 Response ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/Dubbo源码解读与实战_文档/(4819) 21  Exchange 层剖析：彻底搞懂 Requet-Repone 模型（上）.md","filePath":"posts/backEnd/Dubbo源码解读与实战_文档/(4819) 21  Exchange 层剖析：彻底搞懂 Requet-Repone 模型（上）.md","lastUpdated":1696417798000}'),r={name:"posts/backEnd/Dubbo源码解读与实战_文档/(4819) 21  Exchange 层剖析：彻底搞懂 Requet-Repone 模型（上）.md"},E=p("",10),y=l("p",null,"ExchangeChannel 接口",-1),i=l("p",null,"其中，request() 方法负责发送请求，从图中可以看到这里有两个重载，其中一个重载可以指定请求的超时时间，返回值都是 Future 对象。",-1),u=p("",23),F=l("p",null,"ChannelHandler 继承关系总览图",-1),D=l("p",null,"HeaderExchangeHandler 作为一个装饰器，其 connected()、disconnected()、sent()、received()、caught() 方法最终都会转发给上层提供的 ExchangeHandler 进行处理。这里我们需要聚焦的是 HeaderExchangeHandler 本身对 Request 和 Response 的处理逻辑。",-1),d=p("",13);function h(g,A,C,f,R,m){const s=o("Image");return t(),c("div",null,[E,n(s,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image/M00/5A/32/Ciqc1F90Q-OAE4K1AADklLgEs0k481.png"}),a(),y,i,n(s,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image/M00/5A/3D/CgqCHl90Q_SAIt4sAAAzhH5TZiw571.png"}),a(),u,n(s,{alt:"Lark20201013-153600.png",src:"https://s0.lgstatic.com/i/image/M00/5D/D2/Ciqc1F-FWUqAVkr0AADiEwO4wK4124.png"}),a(),F,D,n(s,{alt:"Lark20201013-153557.png",src:"https://s0.lgstatic.com/i/image/M00/5D/D2/Ciqc1F-FWVeAbsckAAGeD-_NNHc225.png"}),a(),d])}const x=e(r,[["render",h]]);export{T as __pageData,x as default};
