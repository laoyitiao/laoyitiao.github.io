import{_ as o,j as e,o as t,g as c,k as a,h as s,Q as p,s as l}from"./chunks/framework.cfb14fe0.js";const x=JSON.parse('{"title":"05Vite实现：从源码分析出发，构建bundlele开发工程","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/105-前端基础建设与架构文档/(5910) 05  Vite 实现：从源码分析出发，构建 bundlele 开发工程.md","filePath":"posts/frontEnd/105-前端基础建设与架构文档/(5910) 05  Vite 实现：从源码分析出发，构建 bundlele 开发工程.md","lastUpdated":1696682708000}'),r={name:"posts/frontEnd/105-前端基础建设与架构文档/(5910) 05  Vite 实现：从源码分析出发，构建 bundlele 开发工程.md"},E=p("",14),y=p("",18),i=p("",20),d=p("",14),u=p("",7),F=p("",7),g=l("p",null,"Vite 实现 HMR 流程图",-1),v=l("h3",{id:"总结",tabindex:"-1"},[s("总结 "),l("a",{class:"header-anchor",href:"#总结","aria-label":'Permalink to "总结"'},"​")],-1),m=l("p",null,"这一讲我们聚焦 Vite 实现，分析了如何利用 ESM，构建一个 bundleless 风格的现代化开发工程方案。源码内容较多，也涉及一定工程化架构设计内容，但 Vite 实现流程清晰，易读性高，是源码阅读类很好的资源。",-1),h=l("p",null,[s("事实上，Vite 依赖优化的灵感来自 "),l("a",{href:"https://www.snowpack.dev/",target:"_blank",rel:"noreferrer"},"Snowpack"),s("，这类 bundleless 工具也代表着一种新趋势、新方向。我认为，技术功底是很重要的一方面，而技术敏感度的培养也非常关键。希望与你共勉！")],-1),A=l("p",null,"到此，新编译工具理念------Vite 我们就介绍到这里。接下来我们将进入代码降级编译环节的学习，我们下一讲再见。",-1);function D(b,f,C,_,S,k){const n=e("Image");return t(),c("div",null,[E,a(n,{alt:"Lark20201225-174521.png",src:"https://s0.lgstatic.com/i/image/M00/8C/18/Ciqc1F_ltOCAMzS3AAHqGo5sIeo562.png"}),s(),a(n,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image2/M01/03/A7/Cip5yF_gX_iAUku7AAK-5yeYi0A500.png"}),s(),y,a(n,{alt:"Lark20201225-174524.png",src:"https://s0.lgstatic.com/i/image/M00/8C/18/Ciqc1F_ltQGAaQZkAAXD68sxUe4161.png"}),s(),i,a(n,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image/M00/8B/C6/Ciqc1F_gYEGAL6S2AASUUhepUGQ785.png"}),s(),d,a(n,{alt:"Lark20201225-174527.png",src:"https://s0.lgstatic.com/i/image2/M01/03/FB/Cip5yF_ltUqAV2zLAADo9NOnOvk745.png"}),s(),a(n,{alt:"Lark20201225-174517.png",src:"https://s0.lgstatic.com/i/image/M00/8C/18/Ciqc1F_ltVCAEgT6AAERxP80SRw964.png"}),s(),u,a(n,{alt:"Drawing 6.png",src:"https://s0.lgstatic.com/i/image/M00/8B/C7/Ciqc1F_gZk-AeTAnAAK2AAgChPQ413.png"}),s(),a(n,{alt:"Drawing 7.png",src:"https://s0.lgstatic.com/i/image/M00/8B/D2/CgqCHl_gZlWAHmvqAAgRairyZ98357.png"}),s(),F,a(n,{alt:"Lark20201225-175233.png",src:"https://s0.lgstatic.com/i/image2/M01/03/FD/CgpVE1_ltm6AN8nCAAMSQ8AjILg631.png"}),s(),g,v,m,h,A])}const q=o(r,[["render",D]]);export{x as __pageData,q as default};
