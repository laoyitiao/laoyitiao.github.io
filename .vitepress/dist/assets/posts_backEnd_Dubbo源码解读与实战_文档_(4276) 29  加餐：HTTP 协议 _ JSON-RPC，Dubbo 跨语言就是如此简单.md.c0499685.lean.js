import{_ as o,j as e,o as t,g as r,k as l,h as n,s,Q as p}from"./chunks/framework.a0d18f64.js";const H=JSON.parse('{"title":"29加餐：HTTP协议+JSON-RPC，Dubbo跨语言就是如此简单","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/Dubbo源码解读与实战_文档/(4276) 29  加餐：HTTP 协议 + JSON-RPC，Dubbo 跨语言就是如此简单.md","filePath":"posts/backEnd/Dubbo源码解读与实战_文档/(4276) 29  加餐：HTTP 协议 + JSON-RPC，Dubbo 跨语言就是如此简单.md","lastUpdated":1696682708000}'),c={name:"posts/backEnd/Dubbo源码解读与实战_文档/(4276) 29  加餐：HTTP 协议 + JSON-RPC，Dubbo 跨语言就是如此简单.md"},E=s("h1",{id:"_29加餐-http协议-json-rpc-dubbo跨语言就是如此简单",tabindex:"-1"},[n("29加餐：HTTP协议+JSON-RPC，Dubbo跨语言就是如此简单 "),s("a",{class:"header-anchor",href:"#_29加餐-http协议-json-rpc-dubbo跨语言就是如此简单","aria-label":'Permalink to "29加餐：HTTP协议+JSON-RPC，Dubbo跨语言就是如此简单"'},"​")],-1),y=s("p",null,"在前面课时介绍 Protocol 和 Invoker 实现时，我们重点介绍了 AbstractProtocol 以及 DubboInvoker 实现。其实，Protocol 还有一个实现分支是 AbstractProxyProtocol，如下图所示：",-1),i=p("",37),F=s("p",null,"dubbo-remoting-http 模块位置",-1),u=s("p",null,"dubbo-remoting-http 模块的入口是 HttpBinder 接口，它被 @SPI 注解修饰，是一个扩展接口，有三个扩展实现，默认使用的是 JettyHttpBinder 实现，如下图所示：",-1),d=s("p",null,"JettyHttpBinder 继承关系图",-1),v=s("p",null,"HttpBinder 接口中的 bind() 方法被 @Adaptive 注解修饰，会根据 URL 的 server 参数选择相应的 HttpBinder 扩展实现，不同 HttpBinder 实现返回相应的 HttpServer 实现。HttpServer 的继承关系如下图所示：",-1),A=p("",7),g=p("",14);function D(C,S,h,B,b,m){const a=e("Image");return t(),r("div",null,[E,y,l(a,{alt:"Lark20201103-162545.png",src:"https://s0.lgstatic.com/i/image/M00/67/57/CgqCHl-hFBOAU2UWAAFM9gWuXAk914.png"}),n(),i,l(a,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image/M00/67/4C/Ciqc1F-hFD-ATNiiAABhOjw9PMM486.png"}),n(),F,u,l(a,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image/M00/67/4C/Ciqc1F-hFEaAUtnPAABBFL3GfzE890.png"}),n(),d,v,l(a,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image/M00/67/57/CgqCHl-hFFSAApv5AABUwFas2rw795.png"}),n(),A,l(a,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image/M00/67/57/CgqCHl-hFGCARUTkAABNZnY-dJg331.png"}),n(),g])}const q=o(c,[["render",D]]);export{H as __pageData,q as default};
