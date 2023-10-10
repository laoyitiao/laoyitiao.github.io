import{_ as o,j as p,o as t,g as c,k as l,h as n,s,Q as e}from"./chunks/framework.cfb14fe0.js";const R=JSON.parse('{"title":"10支撑组件：如何实现隐藏菜单，快速测试与验证？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/048_iOS开发进阶/(6663) 10  支撑组件：如何实现隐藏菜单，快速测试与验证？.md","filePath":"posts/frontEnd/048_iOS开发进阶/(6663) 10  支撑组件：如何实现隐藏菜单，快速测试与验证？.md","lastUpdated":1696682708000}'),r={name:"posts/frontEnd/048_iOS开发进阶/(6663) 10  支撑组件：如何实现隐藏菜单，快速测试与验证？.md"},E=s("h1",{id:"_10支撑组件-如何实现隐藏菜单-快速测试与验证",tabindex:"-1"},[n("10支撑组件：如何实现隐藏菜单，快速测试与验证？ "),s("a",{class:"header-anchor",href:"#_10支撑组件-如何实现隐藏菜单-快速测试与验证","aria-label":'Permalink to "10支撑组件：如何实现隐藏菜单，快速测试与验证？"'},"​")],-1),i=s("p",null,"不知道在工作当中，你有没有为了测试和验证开发中的功能，特意为测试和产品经理打包一个特殊版本的 App？或者当多个团队并行开发的时候，为了测试，每个团队都单独打包出不同版本的 App？还有当你想添加某些供内部使用的功能（如清理 Cache），但又不想让 App Store 的用户使用，你是不是又专门打包了一个特殊版本的 App？",-1),y=s("p",null,"每次遇到这些情况，你是不是觉得特麻烦？",-1),d=s("p",null,"其实，这些都可以通过一个内部隐藏功能菜单来解决。在这一讲我就结合我们的 Moments App 来和你介绍下，如何开发了一个隐藏功能菜单，快速实现功能测试和验证。",-1),u=s("p",null,"Moments App 的隐藏菜单",-1),g=s("p",null,"下面是隐藏菜单模块使用到的所有源代码文件。",-1),F=s("p",null,"我把这些模块中使用到的类型分成两大类：",-1),C=s("ul",null,[s("li",null,[s("p",null,[n("用于呈现的 "),s("strong",null,"View"),n("，主要分为 ViewController + Tableview 以及 TableViewCell 两层；")])]),s("li",null,[s("p",null,[n("用于存储配置数据的 "),s("strong",null,"ViewModel"),n("，它分为用于 TableView 的 ViewModel，用于 TableView Section 的 ViewModel 以及用于 TableView Cell 的 ViewModel。")])])],-1),I=s("p",null,"下面是所有类型的分类总揽图，你可以简单看一下，我会在后面进行一一介绍。",-1),M=s("h3",{id:"view",tabindex:"-1"},[n("View "),s("a",{class:"header-anchor",href:"#view","aria-label":'Permalink to "View"'},"​")],-1),m=s("p",null,"下面是 View 部分的所有类型的关系图。",-1),w=e("",15),h=e("",35),A=e("",6),D=e("",9),V=s("h3",{id:"总结",tabindex:"-1"},[n("总结 "),s("a",{class:"header-anchor",href:"#总结","aria-label":'Permalink to "总结"'},"​")],-1),v=s("p",null,"在这一讲中，我向你介绍了如何实现一个隐藏菜单功能，有了这个功能，我们的测试人员和产品经理可以使用这些功能来加速功能的测试与验证。在实现过程，我们把 UI 和配置数据部分进行分离，而且使用了面向协议的编程方式，让这个功能变得灵活且易于可扩展。在实际工作当中，你也可以使用这个模式来快速开发出各种配置页面。",-1),B=e("",5);function S(b,f,T,_,k,P){const a=p("Image");return t(),c("div",null,[E,i,y,d,l(a,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image6/M00/25/25/Cgp9HWBZZJ2AH9MrAAKIA8i2Fmc948.png"}),n(),u,g,l(a,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image6/M00/25/25/Cgp9HWBZZKaAdBs7AAsAbhLBscQ965.png"}),n(),F,C,I,l(a,{alt:"图片20.png",src:"https://s0.lgstatic.com/i/image6/M01/26/78/Cgp9HWBa_RSAdIwEAA0pmTe83Oo125.png"}),n(),M,m,l(a,{alt:"图片19.png",src:"https://s0.lgstatic.com/i/image6/M00/26/75/CioPOWBa_MyAWG4pAAZ-OokPy3k632.png"}),n(),w,l(a,{alt:"图片18.png",src:"https://s0.lgstatic.com/i/image6/M00/26/75/CioPOWBa_K6AYenCAAQfOR83siU591.png"}),n(),h,l(a,{alt:"图片17.png",src:"https://s0.lgstatic.com/i/image6/M01/26/78/Cgp9HWBa_HGAVEN9AANjLQSDkHA044.png"}),n(),A,l(a,{alt:"1.png",src:"https://s0.lgstatic.com/i/image6/M01/26/78/Cgp9HWBa_F2ANOdDAAMyEuhYLPE545.png"}),n(),D,l(a,{alt:"图片1.png",src:"https://s0.lgstatic.com/i/image6/M01/27/9B/CioPOWBdV52AV1OAAAF2RV7abDM895.png"}),n(),V,v,l(a,{alt:"思维导图+二维码.png",src:"https://s0.lgstatic.com/i/image6/M01/26/8B/Cgp9HWBbDhmAB2gcAAUFC1DGm_M896.png"}),n(),B])}const x=o(r,[["render",S]]);export{R as __pageData,x as default};
