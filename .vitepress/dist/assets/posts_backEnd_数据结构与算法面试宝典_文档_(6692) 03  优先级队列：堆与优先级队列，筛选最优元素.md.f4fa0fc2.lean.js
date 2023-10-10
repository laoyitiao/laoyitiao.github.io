import{_ as o,j as e,o as t,g as r,k as a,h as s,Q as p,s as l}from"./chunks/framework.cfb14fe0.js";const V=JSON.parse('{"title":"03优先级队列：堆与优先级队列，筛选最优元素","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/数据结构与算法面试宝典_文档/(6692) 03  优先级队列：堆与优先级队列，筛选最优元素.md","filePath":"posts/backEnd/数据结构与算法面试宝典_文档/(6692) 03  优先级队列：堆与优先级队列，筛选最优元素.md","lastUpdated":1696682708000}'),c={name:"posts/backEnd/数据结构与算法面试宝典_文档/(6692) 03  优先级队列：堆与优先级队列，筛选最优元素.md"},E=p("",3),y=p("",6),i=l("p",null,[s("如果"),l("strong",null,"根比左右子结点都要小"),s("，那么称为**小堆，**如下图所示：")],-1),A=p("",8),g=l("p",null,[l("em",null,"注意：这里的下标是从 0 开始的。")],-1),F=l("p",null,[s("接下来，我们将通过具体的题目将堆的操作代码"),l("strong",null,"模板化"),s("。")],-1),u=l("h4",{id:"堆的操作",tabindex:"-1"},[s("堆的操作 "),l("a",{class:"header-anchor",href:"#堆的操作","aria-label":'Permalink to "堆的操作"'},"​")],-1),D=l("p",null,[s("堆的操作实际上只有两种："),l("strong",null,"下沉和上浮"),s("，如下图所示：")],-1),h=p("",8),d=p("",2),C=p("",9),B=p("",2),_=p("",31),b=p("",21),k=p("",14),m=p("",27),f=p("",19),v=p("",24),P=p("",13),S=p("",29),q=p("",7);function T(Q,j,H,w,I,N){const n=e("Image");return t(),r("div",null,[E,a(n,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image6/M00/13/46/CioPOWBB95iADDnqAACK2SKwkGM125.png"}),s(),y,a(n,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image6/M01/13/49/Cgp9HWBB96aAYBPuAADIgr8zVTQ525.png"}),s(),i,a(n,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image6/M01/13/46/CioPOWBB966AG3lGAADMrGaqmms247.png"}),s(),A,a(n,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image6/M01/13/49/Cgp9HWBB97mANuA0AAEuXuRD7OM444.png"}),s(),g,F,u,D,a(n,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image6/M01/13/46/CioPOWBB98KAGCi1AACNPdvPhX0284.png"}),s(),h,a(n,{alt:"1.gif",src:"https://s0.lgstatic.com/i/image6/M01/13/46/CioPOWBB99OAQTpJAAGapaZWoyM328.gif"}),s(),d,a(n,{alt:"2.gif",src:"https://s0.lgstatic.com/i/image6/M01/13/46/CioPOWBB996AJuAmAACoyw2YoTY998.gif"}),s(),C,a(n,{alt:"3.gif",src:"https://s0.lgstatic.com/i/image6/M01/13/49/Cgp9HWBB9-6AO_sXAAF4Rim8-h4328.gif"}),s(),B,a(n,{alt:"4.gif",src:"https://s0.lgstatic.com/i/image6/M01/13/46/CioPOWBB9_yAMrYIAACvs1tCxn0334.gif"}),s(),_,a(n,{alt:"5.gif",src:"https://s0.lgstatic.com/i/image6/M01/13/49/Cgp9HWBB-CCAHNSQAAiT0tDfClw811.gif"}),s(),b,a(n,{alt:"6.gif",src:"https://s0.lgstatic.com/i/image6/M01/13/46/CioPOWBB-DmADf7pACpCmKnHs-c177.gif"}),s(),k,a(n,{alt:"Drawing 11.png",src:"https://s0.lgstatic.com/i/image6/M00/13/46/CioPOWBB-FeAA31IAADlOdvhaHc020.png"}),s(),m,a(n,{alt:"Drawing 12.png",src:"https://s0.lgstatic.com/i/image6/M00/13/49/Cgp9HWBB-GWAals1AACz-cwh5A0701.png"}),s(),f,a(n,{alt:"7.gif",src:"https://s0.lgstatic.com/i/image6/M00/13/49/Cgp9HWBB-IeAcgVAABQeZUJ0g7s661.gif"}),s(),v,a(n,{alt:"Drawing 14.png",src:"https://s0.lgstatic.com/i/image6/M00/13/46/CioPOWBB-LyAd-I8AACuBAvv24c185.png"}),s(),P,a(n,{alt:"8.gif",src:"https://s0.lgstatic.com/i/image6/M00/13/46/CioPOWBB-NWATbp5ABcZWJEFfns318.gif"}),s(),S,a(n,{alt:"Drawing 16.png",src:"https://s0.lgstatic.com/i/image6/M00/13/4A/Cgp9HWBB-QCAcvk-AADd5wNIZG0008.png"}),s(),q])}const x=o(c,[["render",T]]);export{V as __pageData,x as default};
