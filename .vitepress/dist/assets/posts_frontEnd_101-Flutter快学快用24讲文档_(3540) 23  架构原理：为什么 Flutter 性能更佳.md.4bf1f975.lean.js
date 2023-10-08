import{_ as e,j as o,o as t,g as r,k as l,h as a,Q as p,s}from"./chunks/framework.a0d18f64.js";const v=JSON.parse('{"title":"23架构原理：为什么Flutter性能更佳","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/101-Flutter快学快用24讲文档/(3540) 23  架构原理：为什么 Flutter 性能更佳.md","filePath":"posts/frontEnd/101-Flutter快学快用24讲文档/(3540) 23  架构原理：为什么 Flutter 性能更佳.md","lastUpdated":1696682708000}'),c={name:"posts/frontEnd/101-Flutter快学快用24讲文档/(3540) 23  架构原理：为什么 Flutter 性能更佳.md"},y=p("",6),i=s("p",null,"图1 系统 UI 界面绘制原理",-1),E=s("p",null,"从图 1 我们可以看到，一个界面显示出来，首先是经过了 CPU 的数据计算，然后将数据发送给到 GPU， GPU 再根据相应的数据绘制成像素界面，然后放入帧缓存区中，最终显示器定时从帧缓存区获取帧数据显示在显示器上。",-1),d=s("p",null,"在上面的渲染实现过程中，需要进行 CPU 和 GPU 之间的通信。因此，如何调度 GPU 是一个比较关键的点，目前有一套规范叫作 OpenGL，开发者可以通过这套规范，更方便、更高效地调用 GPU进行界面渲染。Android 和iOS 系统都在系统层面实现了这套功能，将其分别封装成 SDK API。而在 Flutter 中也实现了这套规则，也就是应用 OpenGL 规范封装了一套 Dart API，因此 Flutter 的渲染原理和 Android 以及 iOS 是一致的，所以在性能上基本没有区别。",-1),u=s("p",null,"了解了 Flutter 渲染原理以后，我们再来看看目前比较常用的两个跨端框架的渲染原理。",-1),h=s("h4",{id:"其他跨端技术框架渲染原理",tabindex:"-1"},[a("其他跨端技术框架渲染原理 "),s("a",{class:"header-anchor",href:"#其他跨端技术框架渲染原理","aria-label":'Permalink to "其他跨端技术框架渲染原理"'},"​")],-1),F=s("p",null,"目前比较常见的两个跨端技术框架，分别是 ReactNative 和 Weex。它们在原理上非常相近，因此这里单独介绍 ReactNative 的原理。我们先来看下图 2 的一个技术架构。",-1),g=p("",12),_=p("",13),C=p("",22);function m(b,f,A,P,D,k){const n=o("Image");return t(),r("div",null,[y,l(n,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image/M00/46/CD/CgqCHl9GHCiAcll1AABzhn4c_Mc466.png"}),a(),i,E,d,u,h,F,l(n,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image/M00/46/CD/CgqCHl9GHD6AMhMQAACUmX1O0GA575.png"}),a(),g,l(n,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image/M00/46/C2/Ciqc1F9GHHWARkxZAAJL5Wf7xQQ911.png"}),a(),_,l(n,{alt:"image (2).png",src:"https://s0.lgstatic.com/i/image/M00/46/E5/CgqCHl9GQHCAKO25AAEzFRZSEzw956.png"}),a(),C])}const R=e(c,[["render",m]]);export{v as __pageData,R as default};
