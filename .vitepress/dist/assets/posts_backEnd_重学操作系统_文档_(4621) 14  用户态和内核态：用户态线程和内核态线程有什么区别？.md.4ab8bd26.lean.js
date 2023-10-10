import{_ as r,j as p,o as s,g as l,k as o,h as a,Q as n,s as t}from"./chunks/framework.cfb14fe0.js";const I=JSON.parse('{"title":"14用户态和内核态：用户态线程和内核态线程有什么区别？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/重学操作系统_文档/(4621) 14  用户态和内核态：用户态线程和内核态线程有什么区别？.md","filePath":"posts/backEnd/重学操作系统_文档/(4621) 14  用户态和内核态：用户态线程和内核态线程有什么区别？.md","lastUpdated":1696682708000}'),i={name:"posts/backEnd/重学操作系统_文档/(4621) 14  用户态和内核态：用户态线程和内核态线程有什么区别？.md"},_=n("",13),h=n("",10),c=n("",24),d=t("h4",{id:"一对一-one-to-one",tabindex:"-1"},[a("一对一（One to One） "),t("a",{class:"header-anchor",href:"#一对一-one-to-one","aria-label":'Permalink to "一对一（One to One）"'},"​")],-1),g=t("p",null,"该模型为每个用户态的线程分配一个单独的内核态线程，在这种情况下，每个用户态都需要通过系统调用创建一个绑定的内核线程，并附加在上面执行。 这种模型允许所有线程并发执行，能够充分利用多核优势，Windows NT 内核采取的就是这种模型。但是因为线程较多，对内核调度的压力会明显增加。",-1),m=t("h4",{id:"多对多-many-to-many",tabindex:"-1"},[a("多对多（Many To Many） "),t("a",{class:"header-anchor",href:"#多对多-many-to-many","aria-label":'Permalink to "多对多（Many To Many）"'},"​")],-1),u=t("p",null,"这种模式下会为 n 个用户态线程分配 m 个内核态线程。m 通常可以小于 n。一种可行的策略是将 m 设置为核数。这种多对多的关系，减少了内核线程，同时也保证了多核心并发。Linux 目前采用的就是该模型。",-1),T=t("h4",{id:"两层设计-two-level",tabindex:"-1"},[a("两层设计（Two Level） "),t("a",{class:"header-anchor",href:"#两层设计-two-level","aria-label":'Permalink to "两层设计（Two Level）"'},"​")],-1),b=t("p",null,"这种模型混合了多对多和一对一的特点。多数用户态线程和内核线程是 n 对 m 的关系，少量用户线程可以指定成 1 对 1 的关系。",-1),q=n("",13);function P(A,C,f,x,k,S){const e=p("Image");return s(),l("div",null,[_,o(e,{alt:"Lark20201023-165439.png",src:"https://s0.lgstatic.com/i/image/M00/62/97/CgqCHl-Sm3mAG_x-AAC5MxhOcCc621.png"}),a(),h,o(e,{alt:"2.png",src:"https://s0.lgstatic.com/i/image/M00/62/8B/Ciqc1F-SmgGAJVo6AAFL0OwiOWE251.png"}),a(),c,o(e,{alt:"4.png",src:"https://s0.lgstatic.com/i/image/M00/62/96/CgqCHl-SmhGAfpLmAAD_dFRlK_o009.png"}),a(),d,g,o(e,{alt:"5.png",src:"https://s0.lgstatic.com/i/image/M00/62/96/CgqCHl-SmhyAF5x4AADdzPHEVjg818.png"}),a(),m,u,o(e,{alt:"6.png",src:"https://s0.lgstatic.com/i/image/M00/62/96/CgqCHl-Smj2AUNBFAAEUlu4ZjIY978.png"}),a(),T,b,o(e,{alt:"1.png",src:"https://s0.lgstatic.com/i/image/M00/62/8B/Ciqc1F-SmieAL_v4AAFMiFmCAbM160.png"}),a(),q])}const O=r(i,[["render",P]]);export{I as __pageData,O as default};
