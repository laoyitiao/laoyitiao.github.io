import{_ as o,j as t,o as e,g as c,k as p,h as n,s,Q as l}from"./chunks/framework.4e7d56ce.js";const j=JSON.parse('{"title":"10代码拆分和按需加载：缩减bundleize，把性能做到极致","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/105-前端基础建设与架构文档/(5915) 10  代码拆分和按需加载：缩减 bundle ize，把性能做到极致.md","filePath":"posts/frontEnd/105-前端基础建设与架构文档/(5915) 10  代码拆分和按需加载：缩减 bundle ize，把性能做到极致.md","lastUpdated":1696682708000}'),r={name:"posts/frontEnd/105-前端基础建设与架构文档/(5915) 10  代码拆分和按需加载：缩减 bundle ize，把性能做到极致.md"},E=s("h1",{id:"_10代码拆分和按需加载-缩减bundleize-把性能做到极致",tabindex:"-1"},[n("10代码拆分和按需加载：缩减bundleize，把性能做到极致 "),s("a",{class:"header-anchor",href:"#_10代码拆分和按需加载-缩减bundleize-把性能做到极致","aria-label":'Permalink to "10代码拆分和按需加载：缩减bundleize，把性能做到极致"'},"​")],-1),y=s("p",null,"这一讲，我们将对代码拆分和按需加载这一话题进行解析。",-1),i=s("p",null,"随着 Webpack 等构建工具的能力越来越强，开发者在构建阶段可以随心所欲打造项目流程，代码拆分和按需加载技术在业界曝光量也越来越高。事实上，代码拆分和按需加载的设计决定着工程化构建的结果，这将直接影响应用的性能表现，因为合理的加载时机和代码拆分能够使初始代码体积更小，页面加载更快。因此，如何合理设计代码拆分和按需加载，是对一个项目架构情况的直接考量。",-1),u=s("p",null,"下面我们从代码拆分和按需加载的场景入手，一同体会这一技术手段的必要性和业务价值。",-1),d=s("h3",{id:"代码拆分和按需加载场景",tabindex:"-1"},[n("代码拆分和按需加载场景 "),s("a",{class:"header-anchor",href:"#代码拆分和按需加载场景","aria-label":'Permalink to "代码拆分和按需加载场景"'},"​")],-1),F=s("p",null,"我们来看一个案例。如下图所示场景：点击左图播放按钮后，页面出现视频列表浮层（如右侧图所示，类似单页应用，视频列表仍为同一页面）。视频列表浮层包含了滚动处理、视频播放等多项复杂逻辑，因此这个浮层对应的脚本在页面初始化时，不需要被加载。那么在工程上，我们需要对视频浮层脚本单独进行拆分，和初始化脚本进行分离。当用户点击浮层触发按钮后，执行某一单独部分脚本的请求。",-1),m=l("",84),h=l("",12),D=l("",5),A=s("p",null,"在实际工作中，我希望你能利用本节内容，并结合项目实际情况，排查代码拆分和按需加载是否合理；如果有不合理之处，可以动手实践、实验，进行论证。",-1),q=s("p",null,'本节内容既有理论内容，又有工程实践，只要你有"庖丁解牛"的决心，相信很快就有"入木三分"的理解。',-1);function C(g,k,b,f,v,B){const a=t("Image");return e(),c("div",null,[E,y,i,u,d,F,p(a,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image/M00/8D/42/Ciqc1F_9Bu2AB133AAluXVg4Mlw240.png"}),n(),m,p(a,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image2/M01/05/28/Cip5yF_9BziALsMpAAFUvdp7KoQ251.png"}),n(),h,p(a,{alt:"Lark20210112-163942.png",src:"https://s0.lgstatic.com/i/image/M00/8D/58/CgqCHl_9YFqAKybyAAGp092kEyI435.png"}),n(),D,p(a,{alt:"Lark20210112-163852.png",src:"https://s0.lgstatic.com/i/image2/M01/05/34/CgpVE1_9YDyAVOWwAAel8VpUNt4885.png"}),n(),A,q])}const S=o(r,[["render",C]]);export{j as __pageData,S as default};
