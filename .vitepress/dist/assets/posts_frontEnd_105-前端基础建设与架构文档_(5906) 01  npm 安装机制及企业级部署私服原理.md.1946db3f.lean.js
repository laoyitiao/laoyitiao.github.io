import{_ as l,j as e,o as t,g as c,k as a,h as n,Q as o,s}from"./chunks/framework.a0d18f64.js";const S=JSON.parse('{"title":"01npm安装机制及企业级部署私服原理","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/105-前端基础建设与架构文档/(5906) 01  npm 安装机制及企业级部署私服原理.md","filePath":"posts/frontEnd/105-前端基础建设与架构文档/(5906) 01  npm 安装机制及企业级部署私服原理.md","lastUpdated":1696682708000}'),r={name:"posts/frontEnd/105-前端基础建设与架构文档/(5906) 01  npm 安装机制及企业级部署私服原理.md"},i=o("",15),E=o("",15),y=o("",66),m=s("p",null,"nexus 架构示例图",-1),d=s("p",null,"nexus 工作在 client 和外部 npm 之间，并通过 group repository 合并 npm 仓库以及私有仓库，这样就起到了代理转发的作用。",-1),g=s("p",null,'了解了 npm 私服的原理，我们就不畏惧任何"雷区"。这部分我也总结了两个社区上常见的问题。',-1),u=s("p",null,[s("strong",null,"npm 配置作用优先级")],-1),h=s("p",null,"npm 可以通过默认配置帮助我们预设好 npm 对项目的影响动作，但是 npm 的配置优先级需要开发者确认了解。",-1),_=s("p",null,"如下图所示，优先级从左到右依次降低。我们在使用 npm 时需要了解 npm 的设置作用域，排除干扰范围，以免一顿骚操作之后，并没有找到相应的起作用配置。",-1),F=o("",6),k=s("p",null,"各种环节并不复杂，但是却往往被开发者忽略，导致项目中开发受阻或者架构混乱。本课时，我们也深入多处源码内容，希望对你设计一个完整的工程流程机制有所启发。这里我也给大家留一个思考题：cnpm 是什么，它有什么意义？欢迎你在留言区分享你的观点。",-1),v=s("p",null,"关于 npm 和 Yarn 的更多内容，我们将在下一讲中继续进行，欢迎你继续阅读。",-1),b=s("hr",null,null,-1),f=s("p",null,"[",-1),C=s("p",null,[n("]("),s("a",{href:"https://shenceyun.lagou.com/t/mka",target:"_blank",rel:"noreferrer"},"https://shenceyun.lagou.com/t/mka"),n(")")],-1),A=s("p",null,[n("对标阿里P7技术需求 + 每月大厂内推，6 个月助你斩获名企高薪 Offer。"),s("a",{href:"https://shenceyun.lagou.com/t/mka",target:"_blank",rel:"noreferrer"},"点此链接，快来领取！")],-1);function q(B,j,x,D,T,P){const p=e("Image");return t(),c("div",null,[i,a(p,{alt:"068739612.png",src:"https://s0.lgstatic.com/i/image2/M01/02/A9/Cip5yF_axkqAclTFAAJmlxGYSmI551.png"}),n(),E,a(p,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image/M00/84/9D/CgqCHl_TbUSAZ8CsAAF3O01IL9Q887.png"}),n(),y,a(p,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image/M00/84/9D/CgqCHl_Tba6AcJj0AAGPl9HW2qg745.png"}),n(),m,d,g,u,h,_,a(p,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image/M00/84/9D/CgqCHl_TbZCAanocAADUyWa5fV4429.png"}),n(),F,a(p,{alt:"01.png",src:"https://s0.lgstatic.com/i/image2/M01/00/68/CgpVE1_XAHWAOTwZAAa8HJHvldA513.png"}),n(),k,v,b,f,a(p,{alt:"大前端引流.png",src:"https://s0.lgstatic.com/i/image2/M01/00/66/CgpVE1_W_x2AaW0rAAdqMM6w3z0145.png"}),n(),C,A])}const w=l(r,[["render",q]]);export{S as __pageData,w as default};
