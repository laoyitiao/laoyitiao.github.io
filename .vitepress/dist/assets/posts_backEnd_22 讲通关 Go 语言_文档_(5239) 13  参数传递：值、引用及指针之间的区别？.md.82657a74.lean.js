import{_ as o,j as e,o as t,g as c,k as p,h as n,Q as l,s}from"./chunks/framework.b3d8e22e.js";const b=JSON.parse('{"title":"修改参数 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/22 讲通关 Go 语言_文档/(5239) 13  参数传递：值、引用及指针之间的区别？.md","filePath":"posts/backEnd/22 讲通关 Go 语言_文档/(5239) 13  参数传递：值、引用及指针之间的区别？.md","lastUpdated":1696417798000}'),r={name:"posts/backEnd/22 讲通关 Go 语言_文档/(5239) 13  参数传递：值、引用及指针之间的区别？.md"},y=l("",35),E=l("",42),i=s("p",null,"(各种类型的零值)",-1),d=s("h3",{id:"总结",tabindex:"-1"},[n("总结 "),s("a",{class:"header-anchor",href:"#总结","aria-label":'Permalink to "总结"'},"​")],-1),m=s("p",null,[n("在 Go 语言中，"),s("strong",null,"函数的参数传递只有值传递"),n("，而且传递的实参都是原始数据的一份拷贝。如果拷贝的内容是值类型的，那么在函数中就无法修改原始数据；如果拷贝的内容是指针（或者可以理解为引用类型 map、chan 等），那么就可以在函数中修改原始数据。")],-1),F=s("p",null,"所以我们在创建一个函数的时候，要根据自己的真实需求决定参数的类型，以便更好地服务于我们的业务。",-1),u=s("p",null,"这节课中，我讲解 chan 的时候没有举例，你自己可以自定义一个有 chan 参数的函数，作为练习题。",-1),g=s("p",null,'下节课我将介绍"内存分配：new 还是 make？什么情况下该用谁？"记得来听课！',-1);function h(C,f,q,v,k,B){const a=e("Image");return t(),c("div",null,[y,p(a,{alt:"go语言13金句.png",src:"https://s0.lgstatic.com/i/image2/M01/04/33/Cip5yF_q72OAUnC-AACn4vk4lVU354.png"}),n(),E,p(a,{alt:"112.png",src:"https://s0.lgstatic.com/i/image/M00/80/61/Ciqc1F_QqlyAItQJAABQMWd6pSU650.png"}),n(),i,d,m,p(a,{alt:"Lark20201209-184447.png",src:"https://s0.lgstatic.com/i/image/M00/80/6C/CgqCHl_QqryAEqYQAAVkYmbnDIM013.png"}),F,u,g])}const D=o(r,[["render",h]]);export{b as __pageData,D as default};
