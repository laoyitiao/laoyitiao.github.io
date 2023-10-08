import{_ as l,j as o,o as p,g as r,k as n,h as s,Q as t,s as e}from"./chunks/framework.4e7d56ce.js";const F=JSON.parse('{"title":"16无包构建：盘点那些No-bundle的构建方案","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/104-前端工程化精讲文档/(4430) 16  无包构建：盘点那些 No-bundle 的构建方案.md","filePath":"posts/frontEnd/104-前端工程化精讲文档/(4430) 16  无包构建：盘点那些 No-bundle 的构建方案.md","lastUpdated":1696682708000}'),i={name:"posts/frontEnd/104-前端工程化精讲文档/(4430) 16  无包构建：盘点那些 No-bundle 的构建方案.md"},c=t("",12),u=e("p",null,'从示例中可以看到，在没有任何构建工具处理的情况下，在页面中引入带有 type="module" 属性的 script，浏览器就会在加载入口模块时依次加载了所有被依赖的模块。下面我们就来深入了解一下这种基于浏览器加载 JS 模块的技术的细节。',-1),d=e("h3",{id:"基于浏览器的-js-模块加载功能",tabindex:"-1"},[s("基于浏览器的 JS 模块加载功能 "),e("a",{class:"header-anchor",href:"#基于浏览器的-js-模块加载功能","aria-label":'Permalink to "基于浏览器的 JS 模块加载功能"'},"​")],-1),h=e("p",null,"从 caniuse 网站中可以看到，目前大部分主流的浏览器都已支持 JavaScript modules 这一特性，如下图所示：",-1),y=t("",13),g=e("p",null,"可以看到，运行示例代码后，在浏览器中只引入了 src/main.js 这一个入口模块，但是在网络面板中却依次加载了若干依赖模块，包括外部模块 vue 和 css。依赖图如下：",-1),m=t("",39);function E(b,v,_,f,k,q){const a=o("Image");return p(),r("div",null,[c,n(a,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image/M00/59/D5/CgqCHl9yo46AYuszAANDvM6jRMk647.png"}),s(),u,d,h,n(a,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image/M00/59/CA/Ciqc1F9yo5aADhYKAAMTR4GJTG8708.png"}),s(),y,n(a,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image/M00/59/D5/CgqCHl9yo-mAWrIzAAOaSZguuaM643.png"}),s(),g,n(a,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image/M00/59/CA/Ciqc1F9yo_GAWATTAACYUvrJKL4148.png"}),s(),m])}const x=l(i,[["render",E]]);export{F as __pageData,x as default};
