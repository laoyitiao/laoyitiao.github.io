import{_ as o,j as e,o as t,g as c,k as l,h as s,Q as p,s as n}from"./chunks/framework.4e7d56ce.js";const K=JSON.parse('{"title":"19 最小体力消耗路径：如何突破经典题型，掌握解题模板？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/数据结构与算法面试宝典_文档/(6708) 19  最小体力消耗路径：如何突破经典题型，掌握解题模板？.md","filePath":"posts/backEnd/数据结构与算法面试宝典_文档/(6708) 19  最小体力消耗路径：如何突破经典题型，掌握解题模板？.md","lastUpdated":1696682708000}'),r={name:"posts/backEnd/数据结构与算法面试宝典_文档/(6708) 19  最小体力消耗路径：如何突破经典题型，掌握解题模板？.md"},E=p("",9),y=p("",10),i=p("",11),F=n("p",null,"根据上述分析，题目就可以转换成我们非常熟悉的题目：",-1),A=n("blockquote",null,[n("p",null,"给定图的点和边，以及出发点和终点，找出一条路径，使得这条路径上边的权重的最大值尽可能最小。输出这个最小值。")],-1),D=n("h3",{id:"特点-1-连通性",tabindex:"-1"},[s("特点 1：连通性 "),n("a",{class:"header-anchor",href:"#特点-1-连通性","aria-label":'Permalink to "特点 1：连通性"'},"​")],-1),C=n("p",null,"题目要求找一个最小的值 ans，并且出发点和终点必须在一条路径上，这条路径上所有的边的权重都 <= ans。",-1),g=n("p",null,"那么反过来说，如果我们把权重大于 ans 的边都删除，出发点与终点的这条路径仍然是存在的。",-1),d=n("p",null,"既然如此，那么我们采用如下动图所示的方式应该也可以工作：",-1),h=p("",18),u=n("p",null,"如果我们分别用 -1 表示 NO，0 表示 OK。那么问题转变成下面这样：",-1),B=p("",15),f=p("",7),m=p("",20),b=n("p",null,"Step 0. 首先我们有一些离散的点， 此时还没有加入任何边。",-1),x=n("p",null,[s("Step 1. 把"),n("strong",null,"所有的边"),s(" 加入图中。只有一部分点（绿色）会在这一轮迭代中得到"),n("strong",null,"最终的"),s("src 出发的最短路径。")],-1),_=n("blockquote",null,[n("p",null,[s("注意：有一些点，经过这一轮的操作之后，虽然会与出发点 src 连通，但并没有得到"),n("strong",null,"最终"),s("最短路径，在图中我们就没有画出这些点与 src 的连线。")])],-1),v=n("p",null,[s("此时，我们可以再次从绿色点（因为它们已经是"),n("strong",null,"最终的"),s("最短路径了）出发，如果再次利用所有的边，应该可以再更新一波，得到一些新的最短路径的点。")],-1),k=n("p",null,"Step 2. 再次把所有的边加入图中，得到第二波最短路径的点（紫色）。",-1),w=p("",32),q=n("h3",{id:"思考题",tabindex:"-1"},[s("思考题 "),n("a",{class:"header-anchor",href:"#思考题","aria-label":'Permalink to "思考题"'},"​")],-1),R=n("p",null,[s("给定一个包含非负整数的"),n("code",null,"m x n"),s("网格"),n("code",null,"grid"),s("，请找出一条从左上角到右下角的路径，使得路径上的数字总和为最小。")],-1),T=n("p",null,[n("strong",null,"说明："),s(" 每次只能向下或者向右移动一步。")],-1),j=p("",7);function V(M,S,N,P,Q,I){const a=e("Image");return t(),c("div",null,[E,l(a,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image6/M00/3C/9A/CioPOWCLbuSAJ2gJAAPuzNBJ23A021.png"}),s(),y,l(a,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image6/M00/3C/9A/CioPOWCLbuuAUw3wAABvcGwSSqs667.png"}),s(),i,l(a,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image6/M00/3C/9A/CioPOWCLbvSAD3NzAAB-KL3zX7g895.png"}),s(),F,A,D,C,g,l(a,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image6/M01/3C/91/Cgp9HWCLbvuAHbqbAATbsJyOIcc083.png"}),s(),d,l(a,{alt:"1.gif",src:"https://s0.lgstatic.com/i/image6/M00/3C/9A/CioPOWCLbwOAWL-qAAv2KyBnV5o934.gif"}),s(),h,l(a,{alt:"Drawing 5.png",src:"https://s0.lgstatic.com/i/image6/M01/3C/91/Cgp9HWCLbxKAEgdXAAA4xI3NFuI649.png"}),s(),u,l(a,{alt:"Drawing 6.png",src:"https://s0.lgstatic.com/i/image6/M00/3C/9A/CioPOWCLbyKAejCRAAA2P_x4DC8327.png"}),s(),B,l(a,{alt:"Drawing 7.png",src:"https://s0.lgstatic.com/i/image6/M00/3C/9A/CioPOWCLbyyALJXRAAA2NUdivXw497.png"}),s(),f,l(a,{alt:"Drawing 8.png",src:"https://s0.lgstatic.com/i/image6/M00/3C/9A/CioPOWCLbzOAbNdGAACu5sMfhbM647.png"}),s(),m,l(a,{alt:"Drawing 9.png",src:"https://s0.lgstatic.com/i/image6/M00/3C/9B/CioPOWCLclCAcTHPAACthA1b_fY994.png"}),s(),b,l(a,{alt:"Drawing 10.png",src:"https://s0.lgstatic.com/i/image6/M00/3C/9B/CioPOWCLcluAc9DMAADTk0wp1dQ877.png"}),s(),x,_,v,l(a,{alt:"Drawing 11.png",src:"https://s0.lgstatic.com/i/image6/M01/3C/92/Cgp9HWCLcmKAARFYAADrQRM28nQ863.png"}),s(),k,l(a,{alt:"Drawing 12.png",src:"https://s0.lgstatic.com/i/image6/M00/3C/9B/CioPOWCLcmmAPC1XAAD3iedUdk4707.png"}),s(),w,l(a,{alt:"Drawing 13.png",src:"https://s0.lgstatic.com/i/image6/M01/3C/92/Cgp9HWCLcnuABwKAAADpTh1CXZI925.png"}),s(),q,R,T,l(a,{alt:"Drawing 14.png",src:"https://s0.lgstatic.com/i/image6/M00/3C/9B/CioPOWCLcoSATajPAAEcd1cL5m8325.png"}),s(),j])}const H=o(r,[["render",V]]);export{K as __pageData,H as default};
