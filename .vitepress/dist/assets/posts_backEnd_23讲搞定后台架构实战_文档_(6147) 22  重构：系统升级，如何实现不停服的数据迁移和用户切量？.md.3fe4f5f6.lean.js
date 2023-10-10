import{_ as l,j as e,o as n,g as r,k as t,h as s,Q as o,s as a}from"./chunks/framework.cfb14fe0.js";const I=JSON.parse('{"title":"22  重构：系统升级，如何实现不停服的数据迁移和用户切量？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/23讲搞定后台架构实战_文档/(6147) 22  重构：系统升级，如何实现不停服的数据迁移和用户切量？.md","filePath":"posts/backEnd/23讲搞定后台架构实战_文档/(6147) 22  重构：系统升级，如何实现不停服的数据迁移和用户切量？.md","lastUpdated":1696682708000}'),c={name:"posts/backEnd/23讲搞定后台架构实战_文档/(6147) 22  重构：系统升级，如何实现不停服的数据迁移和用户切量？.md"},i=o("",8),_=a("p",null,"图 1：纯代码的升级重构对比图",-1),d=a("p",null,[a("strong",null,"包含存储和代码的重构升级"),s("是指在上述纯代码之外，将原有架构里的存储也一起升级。存储升级有两种形式。")],-1),h=a("p",null,[a("strong",null,"第一种是将存储类型进行升级"),s("，比如将数据库升级为缓存，将原有的读接口从数据库切换至缓存。做此类存储类型升级的目的是提升微服务的性能，我们在模块二中曾介绍，同样的硬件配置下，缓存比数据库至少快一个量级。不同类型的存储升级架构如下图 2 所示：")],-1),u=a("p",null,"图 2：不同类型的存储升级架构对比图",-1),g=a("p",null,"可以看到升级后，原有的代码从 V1 升级到 V2。同时，存储从读写都使用数据库，升级为写操作使用数据库，读操作使用缓存的架构。",-1),E=a("p",null,[a("strong",null,"第二种是将一个表结构的存储升级为同类型存储的另外一个更加合理的表结构"),s("。此类升级常见于系统构建时，为了快速满足业务需求，在时间紧张的情况下，简单快速地设计了不是特别合理的表结构。比如原有的表结构采用了一张宽表存储所有的数据，包含一对多的数据都进行冗余存储。升级重构时，需要采用更加合理的表结构存储数据，以便未来能够快速响应业务的发展。它的重构升级架构如下图 3 所示，升级后，原有微服务的读写都将切换至新的表结构的存储里。")],-1),A=o("",13),y=o("",10),m=o("",14),q=o("",17);function b(T,V,k,f,P,C){const p=e("Image");return n(),r("div",null,[i,t(p,{alt:"图片1.png",src:"https://s0.lgstatic.com/i/image6/M00/21/A7/CioPOWBUjveANiCOAACPMgksUBQ511.png"}),s(),_,d,h,t(p,{alt:"图片2.png",src:"https://s0.lgstatic.com/i/image6/M00/21/AA/Cgp9HWBUjwGAIN-xAADR3q2poyQ727.png"}),s(),u,g,E,t(p,{alt:"图片3.png",src:"https://s0.lgstatic.com/i/image6/M00/21/AA/Cgp9HWBUjwyAZrKlAAERKL2P1pM506.png"}),s(),A,t(p,{alt:"图片4.png",src:"https://s0.lgstatic.com/i/image6/M00/21/A7/CioPOWBUjxmAWAQMAAE5qu1FxGw202.png"}),s(),y,t(p,{alt:"图片5.png",src:"https://s0.lgstatic.com/i/image6/M00/21/A7/CioPOWBUjyuANz6WAAG2PZJJrtk548.png"}),s(),m,t(p,{alt:"图片6.png",src:"https://s0.lgstatic.com/i/image6/M00/21/AA/Cgp9HWBUj3WAOTKjAAC95tcdKOg976.png"}),s(),q])}const S=l(c,[["render",b]]);export{I as __pageData,S as default};
