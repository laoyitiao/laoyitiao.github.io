import{_ as s,j as r,o as e,g as n,k as o,h as p,Q as i,s as t}from"./chunks/framework.b3d8e22e.js";const k=JSON.parse('{"title":"货运平台需求描述 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/Go 微服务实战 38 讲_文档/(3807) 09  案例：货运平台应用的微服务划分.md","filePath":"posts/backEnd/Go 微服务实战 38 讲_文档/(3807) 09  案例：货运平台应用的微服务划分.md","lastUpdated":1696417798000}'),a={name:"posts/backEnd/Go 微服务实战 38 讲_文档/(3807) 09  案例：货运平台应用的微服务划分.md"},_=i("",16),g=i("",8),c=i("",9),h=t("p",null,"货运上下文数据项模型图",-1),u=t("p",null,"在上图中，引用类的实体和值对象来自其他上下文。货运实体有货运单 ID 这个唯一标识，它由货物实体、货运记录值对象、货运路线实体的引用、起始码头实体的引用、目的地码头实体的引用、寄货人实体和费用等组成，其中货运记录值对象记录了货物在多个码头中的流转过程，货物实体记录了需要运送货物的相关信息。",-1),d=t("p",null,[p("货运上下文关注的实体为码头，主要对外提供码头的管理功能。"),t("strong",null,"码头上下文"),p("的建模如下图所示，码头实体包括码头的承载量、可容纳的货物类型、码头地址等属性。")],-1),m=t("p",null,"码头上下文数据项模型图",-1),A=t("p",null,[t("strong",null,"货运许可上下文"),p("的聚合根为货运路线，主要解决货运路线的管理和选择问题，建模如下所示：")],-1),T=i("",16);function D(S,C,f,P,I,b){const l=r("Image");return e(),n("div",null,[_,o(l,{alt:"1.png",src:"https://s0.lgstatic.com/i/image/M00/3A/23/Ciqc1F8hKQSAZzh5AAEb3TIG-EU163.png"}),p(),g,o(l,{alt:"2.png",src:"https://s0.lgstatic.com/i/image/M00/3A/2F/CgqCHl8hKWmAFEEaAAL1_BQzatI363.png"}),p(),c,o(l,{alt:"3.png",src:"https://s0.lgstatic.com/i/image/M00/3A/3D/CgqCHl8hMnGAMGm2AAEc4JPei6k235.png"}),p(),h,u,d,o(l,{alt:"4.png",src:"https://s0.lgstatic.com/i/image/M00/3A/32/Ciqc1F8hMn-ASEukAAD7oCiluUA103.png"}),p(),m,A,o(l,{alt:"5.png",src:"https://s0.lgstatic.com/i/image/M00/3A/32/Ciqc1F8hMo6ARTg3AAF28dFOibM561.png"}),p(),T])}const E=s(a,[["render",D]]);export{k as __pageData,E as default};
