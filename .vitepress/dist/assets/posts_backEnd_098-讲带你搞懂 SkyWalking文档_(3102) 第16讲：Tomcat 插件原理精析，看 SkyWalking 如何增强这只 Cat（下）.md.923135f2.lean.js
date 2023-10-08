import{_ as e,j as o,o as t,g as r,k as n,h as a,Q as l,s as p}from"./chunks/framework.a0d18f64.js";const B=JSON.parse('{"title":"第16讲：Tomcat插件原理精析，看SkyWalking如何增强这只Cat（下）","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/098-讲带你搞懂 SkyWalking文档/(3102) 第16讲：Tomcat 插件原理精析，看 SkyWalking 如何增强这只 Cat（下）.md","filePath":"posts/backEnd/098-讲带你搞懂 SkyWalking文档/(3102) 第16讲：Tomcat 插件原理精析，看 SkyWalking 如何增强这只 Cat（下）.md","lastUpdated":1696682708000}'),c={name:"posts/backEnd/098-讲带你搞懂 SkyWalking文档/(3102) 第16讲：Tomcat 插件原理精析，看 SkyWalking 如何增强这只 Cat（下）.md"},E=l("",12),y=p("p",null,"此时请求没有与任何 Trace 关联，也就不会携带 ContextCarrier 请求头，beforeMethod() 方法中会创建全新的 TracingContext 以及 EntrySpan。",-1),i=p("ol",{start:"2"},[p("li",null,"tomcat-7.x-8.x-plugin 插件被嵌套在其他插件之后的场景，如下图所示：")],-1),d=p("p",null,"此时请求在经过其他插件的时候，已经创建了关联的 TracingContext 以及 EntrySpan，beforeMethod() 方法无需创建 TracingContext，只需重新调用 EntrySpan 的 start() 方法即可。",-1),C=p("ol",{start:"3"},[p("li",null,"Tomcat 作为下游系统被其他系统调用的场景，如下图所示：")],-1),g=l("",6),u=p("p",null,"先来看序列化过程，ContextCarrier.items() 方法会根据 ACTIVE_V2_HEADER 配置以及 ACTIVE_V1_HEADER 配置决定当前 Agent 支持哪个版本的格式（也可以同时支持），下图展示了在同时支持 V1、V2 两个版本序列化格式时，ContextCarrier.items() 方法创建的 CarrierItem 链表：",-1),F=l("",16),h=l("",4),A=l("",5),m=l("",4),D=p("p",null,"当请求经过所有的 Pipeline-Valve 的处理之后，Tomcat 会将返回的结果交给 Connector，Connector 会通过底层的 Socket 连接将响应结果返回给用户。",-1),v=p("p",null,"理清 Tomcat 架构之后，本课时的第 2 部分深入介绍了 tomcat-7.x-8.x-plugin 插件对 StandardHostValve 中 invoke() 方法的增强，同时还深入讲解了 ContextCarrier 同时支持多个序列化版本的实现原理。最后介绍了 forward 跳转、redirect 跳转的原理，以及 tomcat-7.x-8.x-plugin 插件对 forward 跳转的处理。",-1);function S(x,_,T,b,k,I){const s=o("Image");return t(),r("div",null,[E,n(s,{alt:"1.png",src:"https://s0.lgstatic.com/i/image/M00/00/AF/CgqCHl6qTfmAEU6RAAC170V3ef8022.png"}),a(),y,i,n(s,{alt:"2.png",src:"https://s0.lgstatic.com/i/image/M00/00/AF/CgqCHl6qTheAD0FbAADiLfWhOis706.png"}),a(),d,C,n(s,{alt:"3.png",src:"https://s0.lgstatic.com/i/image/M00/00/AF/CgqCHl6qTi-AFnZOAADQxYkP_ok501.png"}),a(),g,n(s,{alt:"4.png",src:"https://s0.lgstatic.com/i/image/M00/00/BB/CgqCHl6qZFmASH0MAABQy3R7qxw376.png"}),a(),u,n(s,{alt:"image (3).png",src:"https://s0.lgstatic.com/i/image/M00/00/BB/Ciqc1F6qZHCAW4yoAAFesp2L980140.png"}),a(),F,n(s,{alt:"image (4).png",src:"https://s0.lgstatic.com/i/image/M00/00/BB/CgqCHl6qZNuANBrFAAHuLLyTujQ360.png"}),a(),h,n(s,{alt:"image (5).png",src:"https://s0.lgstatic.com/i/image/M00/00/BC/CgqCHl6qZcmAJZYZAAGM2VAIvQ8947.png"}),a(),A,n(s,{alt:"image (6).png",src:"https://s0.lgstatic.com/i/image/M00/00/BC/CgqCHl6qZkKAB_A5AABVHOMz99A638.png"}),a(),m,n(s,{alt:"image (7).png",src:"https://s0.lgstatic.com/i/image/M00/00/BC/CgqCHl6qZmuASJgqAAHvghToaYo778.png"}),a(),D,v])}const R=e(c,[["render",S]]);export{B as __pageData,R as default};
