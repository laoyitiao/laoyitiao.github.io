import{_ as p,j as e,o,g as t,k as a,Q as l,s,h as c}from"./chunks/framework.b3d8e22e.js";const V=JSON.parse('{"title":"Redux 背后的架构思想------认识 Flux 架构 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/046_深入浅出搞定 React/(4865) 18  揭秘 Redux 设计思想与工作原理（上）.md","filePath":"posts/frontEnd/046_深入浅出搞定 React/(4865) 18  揭秘 Redux 设计思想与工作原理（上）.md","lastUpdated":1696417798000}'),r={name:"posts/frontEnd/046_深入浅出搞定 React/(4865) 18  揭秘 Redux 设计思想与工作原理（上）.md"},E=l("",9),y=l("",7),i=s("p",null,"除了允许用户通过 View 层交互来触发流程以外，MVC 架构还有另外一种形式，即允许用户通过直接触发 Controller 逻辑来触发流程，这种模式下的架构关系如下图所示：",-1),u=s("p",null,"在 MVC 应用中，会涉及这 3 个部分：",-1),d=s("ul",null,[s("li",null,[s("p",null,"Model（模型），程序需要操作的数据或信息；")]),s("li",null,[s("p",null,"View（视图），用户界面；")]),s("li",null,[s("p",null,"Controller（控制器），用于连接 View 和 Model，管理 Model 与 View 之间的逻辑。")])],-1),A=s("p",null,"原则上来说，三者的关系应该像上图一样，用户操作 View 后，由 Controller 来处理逻辑（或者直接触发 Controller 的逻辑），经过 Controller 将改变应用到 Model 中，最终再反馈到 View 上。在这个过程中，数据流应该是单向的。",-1),F=s("p",null,[s("strong",null,"事实上，在许多服务端的 MVC 应用中，数据流确实能够保持单向。但是在前端场景下，实际的 MVC 应用要复杂不少，前端应用/框架往往出于交互的需要，允许 View 和 Model 直接通信"),c("。此时的架构关系就会变成下图这样：")],-1),h=s("p",null,"这就允许了双向数据流的存在。当业务复杂度较高时，数据流会变得非常混乱，出现类似下图这种情况：",-1),D=s("p",null,"图中我们的示例只有一个 Controller，但考虑到一个应用中还可能存在多个 Controller，实际的情况应该比上图还要复杂得多（尽管图示本身已经够复杂了）。",-1),x=s("p",null,'在如此复杂的依赖关系下，再小的项目变更也将伴随着不容小觑的风险------或许一个小小的改动，就会对整个项目造成"蝴蝶效应"般的巨大影响。如此混乱的修改来源，将会使得我们连 Bug 排查都无从下手，因为你很难区分出一个数据的变化到底是由哪个 Controller 或者哪个 View 引发的。',-1),_=s("p",null,"此时再回头看下 Flux 的架构模式，你应该多少能感受到其中的妙处。这里我们再来回顾一下 Flux 中的数据流模式，请看下图：",-1),g=l("",12),b=l("",5),C=l("",15),f=l("",7);function R(S,m,q,B,w,T){const n=e("Image");return o(),t("div",null,[E,a(n,{alt:"图片1.png",src:"https://s0.lgstatic.com/i/image/M00/7E/D2/CgqCHl_PX4iAVQDeAABqpNRcHXQ065.png"}),y,a(n,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image/M00/7E/C5/CgqCHl_PVeKAMZaHAACLXZ2Co3Q900.png"}),i,a(n,{alt:"Drawing 5.png",src:"https://s0.lgstatic.com/i/image/M00/7E/BA/Ciqc1F_PVe2AaJt5AACCt5hpXUM704.png"}),u,d,A,F,a(n,{alt:"Drawing 7.png",src:"https://s0.lgstatic.com/i/image/M00/7E/BA/Ciqc1F_PVfWAMialAACIyVXJabE467.png"}),h,a(n,{alt:"Drawing 11.png",src:"https://s0.lgstatic.com/i/image/M00/7E/C5/CgqCHl_PVgWAcAkZAAFInClVHRM354.png"}),D,x,_,a(n,{alt:"图片1.png",src:"https://s0.lgstatic.com/i/image/M00/7E/D2/CgqCHl_PX5mAYUWaAABqpNRcHXQ626.png"}),g,a(n,{alt:"Drawing 13.png",src:"https://s0.lgstatic.com/i/image/M00/7E/C6/CgqCHl_PVh-ATfOGAAB089LdYcY341.png"}),b,a(n,{alt:"Drawing 14.png",src:"https://s0.lgstatic.com/i/image/M00/7E/C6/CgqCHl_PVieAeMfAAABARscWp8o305.png"}),C,a(n,{alt:"Drawing 15.png",src:"https://s0.lgstatic.com/i/image/M00/7E/BB/Ciqc1F_PVkCAST4AAAJfMvoaI4Q803.png"}),f])}const v=p(r,[["render",R]]);export{V as __pageData,v as default};
