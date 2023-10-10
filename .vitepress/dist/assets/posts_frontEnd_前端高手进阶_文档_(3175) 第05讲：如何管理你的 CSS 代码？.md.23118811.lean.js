import{_ as o,j as e,o as t,g as c,k as l,h as a,Q as p,s}from"./chunks/framework.cfb14fe0.js";const x=JSON.parse('{"title":"第05讲：如何管理你的CSS代码？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/前端高手进阶_文档/(3175) 第05讲：如何管理你的 CSS 代码？.md","filePath":"posts/frontEnd/前端高手进阶_文档/(3175) 第05讲：如何管理你的 CSS 代码？.md","lastUpdated":1696682708000}'),r={name:"posts/frontEnd/前端高手进阶_文档/(3175) 第05讲：如何管理你的 CSS 代码？.md"},i=p("",11),E=p("",4),y=s("p",null,"从目录名称上不难猜测，各个组件代码通过文件夹区分，点击其中的 alert 文件夹查看也确实如此，组件相关的代码、测试代码、demo 示例、样式文件、描述文档都在里面。",-1),d=s("p",null,"至于全局样式和公共样式则在 /components/style 目录下：",-1),g=s("p",null,"其中包括 4 个目录：",-1),u=s("ul",null,[s("li",null,"color/，颜色相关的变量与函数；"),s("li",null,"core/，全局样式，根标签样式、字体样式等；"),s("li",null,"mixins/，样式生成函数；"),s("li",null,"themes/，主题相关的样式变量。")],-1),F=s("p",null,'将组件代码及相关样式放在一起，开发的时候修改会很方便。 但在组件目录 /comnponents 下设置 style 目录存放全局和公共样式，在逻辑上就有些说不通了，这些"样式"文件并不是一个单独的"组件"。再看 style 目录内部结构，相对于设置单独的 color 目录来管理样式中的颜色，更推荐像 Bootstrap 一样设立专门的目录或文件来管理变量。',-1),h=s("p",null,[a("最后来看看依赖 Vue.js 实现的热门 UI 库 "),s("a",{href:"https://github.com/ElemeFE/element",target:"_blank",rel:"noreferrer"},"element 2.13.1"),a(" 的目录结构。项目根路径下的 packages 目录按组件划分目录来存放其源码，但和 ant-design 不同的是，组件样式文件并没有和组件代码放在一起。下图是 /packages 目录下的部分内容。")],-1),m=s("p",null,"element 将样式文件统一放入了 /packages/theme-chalk 目录下，目录部分内容如下图所示：",-1),_=p("",8),A=p("",12),b=p("",34);function C(D,v,B,S,f,k){const n=e("Image");return t(),c("div",null,[i,l(n,{alt:"image (9).png",src:"https://s0.lgstatic.com/i/image/M00/11/12/Ciqc1F7Lg2KAL_EGAABIIQsIyiQ803.png"}),a(),E,l(n,{alt:"image (10).png",src:"https://s0.lgstatic.com/i/image/M00/11/1D/CgqCHl7Lg2qAA71pAAA-LE1MpA8895.png"}),a(),y,l(n,{alt:"image (11).png",src:"https://s0.lgstatic.com/i/image/M00/11/12/Ciqc1F7Lg3KACdLvAAAhZ58r7rs506.png"}),a(),d,l(n,{alt:"image (12).png",src:"https://s0.lgstatic.com/i/image/M00/11/1D/CgqCHl7Lg3iAW5XnAABJl9DhW5U953.png"}),a(),g,u,F,h,l(n,{alt:"image (13).png",src:"https://s0.lgstatic.com/i/image/M00/11/1D/CgqCHl7Lg4GALTUpAAA1dlUb1Vo822.png"}),a(),m,l(n,{alt:"image (14).png",src:"https://s0.lgstatic.com/i/image/M00/11/12/Ciqc1F7Lg4iAEEjuAABKZlcUAZw345.png"}),a(),_,l(n,{alt:"image (15).png",src:"https://s0.lgstatic.com/i/image/M00/11/12/Ciqc1F7Lg5CAFS5jAAB-ZPy2xPc135.png"}),a(),A,l(n,{alt:"image (16).png",src:"https://s0.lgstatic.com/i/image/M00/11/1E/CgqCHl7Lg5qAeYYDAAA8eZ2PEKM297.png"}),a(),b])}const M=o(r,[["render",C]]);export{x as __pageData,M as default};
