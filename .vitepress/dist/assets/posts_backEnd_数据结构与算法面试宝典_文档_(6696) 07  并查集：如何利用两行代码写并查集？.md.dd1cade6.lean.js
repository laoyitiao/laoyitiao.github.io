import{_ as o,j as e,o as t,g as c,k as l,h as n,Q as p,s}from"./chunks/framework.cfb14fe0.js";const As=JSON.parse('{"title":"07并查集：如何利用两行代码写并查集？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/数据结构与算法面试宝典_文档/(6696) 07  并查集：如何利用两行代码写并查集？.md","filePath":"posts/backEnd/数据结构与算法面试宝典_文档/(6696) 07  并查集：如何利用两行代码写并查集？.md","lastUpdated":1696682708000}'),r={name:"posts/backEnd/数据结构与算法面试宝典_文档/(6696) 07  并查集：如何利用两行代码写并查集？.md"},E=p("",11),y=p("",12),i=p("",3),F=p("",3),A=p("",7),D=s("p",null,'如果一旦执行 Find("韦一笑")，那么糖葫芦帮派就会变成大饼帮派。',-1),g=p("",92),d=s("p",null,"通过这个示例，还可以发现，如果不经过交换，虽然 [3, 2] 这两个员工已经坐在一起了，但是不操作，那么 0 号员工和 1 号员工是无法结对编程的。",-1),u=s("p",null,[n("因此，我们可以得到"),s("strong",null,"结论 1：结对的时候，数组中只能偶数下标与奇数下标配比"),n("。比如 A[0] 与 A[1] 结对。不能奇数下标与偶数下标结对，比如 A[1] 与 A[2] 结对。")],-1),C=s("p",null,"接下来我们再看一下 N = 6 的情况， 比如 A = [0, 2, 3, 5, 1, 4]：我们在执行交换的时候，可以这样操作：",-1),h=s("p",null,"所以成功切分出三个配对集合 [0, 1], [3, 2], [5, 4]，需要 2 步。",-1),B=s("p",null,[s("strong",null,"2"),n(" . "),s("strong",null,"规律")],-1),b=s("p",null,"通过前面的模拟，我们还需要进一步的总结规律。将里面没有成功结对的序列看成一条锁链。并且拆分出结对成功的两个元素，独立位于一个环中，并不与别人相扣在一起。",-1),_=s("p",null,"每 1 次操作，交换两个元素，就相当于从锁链中成功拆一个环下来。",-1),x=s("p",null,[n("那么，我们可以得到"),s("strong",null,"结论 2：有 2x 个元素，也就是 x 个环的锁链，就需要 x-1 次操作"),n("。")],-1),v=s("p",null,"至此，我们就将题目成功变成了：给定一个数组，需要找到里面有几条锁链。比如给定数组 A = [6, 4, 5, 2, 3, 7, 0, 1]。",-1),f=s("p",null,"此时应该可以分出两条锁链来，如下图所示：",-1),m=p("",9),q=p("",19),k=p("",12),T=s("p",null,"在面试中，如果你有了并查集的模板，再加上虚拟点的思路，那么快速解决这类问题就轻而易举了。",-1),U=s("h4",{id:"例-5-上网的最小费用",tabindex:"-1"},[n("例 5：上网的最小费用 "),s("a",{class:"header-anchor",href:"#例-5-上网的最小费用","aria-label":'Permalink to "例 5：上网的最小费用"'},"​")],-1),H=s("p",null,[n("【"),s("strong",null,"题目"),n("】园区里面有很多大楼，编号从 1~N。第 i 大楼可以自己花钱买路由器上网，费用为 cost[i-1]，也可以从别的大楼拉一根网线来上网，比如大楼 a 和大楼 b 之间拉网线的费用为 c，表示为一条边 [a, b, c]。输入为每个大楼自己买路由器和拉网线的费用，请问，让所有大楼都能够上网的最小费用是多少？上网具有联通性，只要与能够上网的大楼连通，即可上网。")],-1),N=s("p",null,"输入：cost = [1, 2, 3], edges = [[1,2,100], [2,3,3]]",-1),S=s("p",null,"输出：6",-1),j=s("p",null,[s("strong",null,"解释"),n("：最优方案是 1 号大楼买路由器 cost[0] = 1，2 号楼买路由器 cost[1] = 2，然后和 3 号楼之间可拉一根网线，费用为 3，所以一共花费 6 元。如图（红色部分标记为费用 ）：")],-1),P=s("p",null,[n("【"),s("strong",null,"分析"),n(" 】这是一道"),s("strong",null,"头条"),n("面试中出现过的题目。首先如果不考虑自己买路由器的情况，只依赖给定的边集构建这个图，且要求最小费用，这道题目就和最小生成树一模一样了。可是，这里与最小生成树不一样的地方在于：第 i 大楼可以自己花钱买路由器上网，费用为 cost[i-1]。")],-1),w=s("p",null,'在最小生成树里面，可是没有说"自己买路由"这个操作。那怎么办？我们有什么方法可以转化一下吗？',-1),O=s("p",null,"可以采用加入虚拟点的方法。首先假设有一个结点 0 已经自己买了路由器，花费为 0 元。而其他结点要自己买路由器，本质等价于与结点 0 进行联通。只不过这个网线的费用，就是你自己买路由器的费用。",-1),V=s("p",null,"比如，给定 3 个点，分别自己买路由器的费用为 [1, 2, 3]。那么我们可以把图变成下图这样子：",-1),I=p("",13),R=s("p",null,[n("【"),s("strong",null,"分析"),n("】那么首先我们进行一下模拟。")],-1),K=s("p",null,[s("strong",null,"1"),n(" . "),s("strong",null,"模拟")],-1),M=s("p",null,"变量之间的除法关系，我们需要记录一个链式信息。如果将除法当成一个有向边，然后变量与变量之间的除法就可以看成图结构。比如：",-1),X=s("p",null,"可以表示为下图：",-1),Q=s("p",null,"如果我们将上图进行压缩，那么可以得到下图：",-1),G=s("p",null,"经过压缩之后，可以发现这几个元素之间的关系就变成了下面这个样子：",-1),W=s("ul",null,[s("li",null,[s("p",null,"a = 8 * c")]),s("li",null,[s("p",null,"c = 1 * c")]),s("li",null,[s("p",null,"b = 4 * c")])],-1),Z=s("p",null,"此时，可以得到任意两个变量之间的比值。实际上，这几个数也可以以 a 元素为根，如下图所示：",-1),L=p("",7),z=p("",13),J=s("p",null,"这是我们进行路径压缩的关键。",-1),Y=s("ul",null,[s("li",null,"Union 操作时，注意变量倍数关系的调整。")],-1),$=s("p",null,[n("如果想到了这些，再加上我介绍的并查集的代码模板，那么解决这道面试题也就没什么难度了。以后在面试中，你如果发现题目具有"),s("strong",null,"传递性"),n("的特点，就可以使用并查集进行求解。")],-1),ss=s("h3",{id:"总结",tabindex:"-1"},[n("总结 "),s("a",{class:"header-anchor",href:"#总结","aria-label":'Permalink to "总结"'},"​")],-1),ns=s("p",null,"在本讲中，我介绍了并查集面试时常见的考察点，并且给出了并查集的代码模板。最后我还给你准备了并查集的知识树，面试中并查集相关的问题基本上逃不出这个圈。希望你可以尝试自己对本讲的内容进行梳理，然后再对照下图查缺补漏。",-1),as=s("h3",{id:"思考题",tabindex:"-1"},[n("思考题 "),s("a",{class:"header-anchor",href:"#思考题","aria-label":'Permalink to "思考题"'},"​")],-1),ls=s("p",null,"如果我们把例 5 的变量看成图上的点，变量与变量之间的关系看成是边。一旦构建好了并查集，在 Query 的时候，就可以 O(1) 的时间查询到两个变量之间的代价。那么为什么在图算法中，我们需要用 Floyd 算法求解图中两个点之间的最短路径？",-1),ps=s("p",null,"希望你可以把思考写在留言区，我们一起讨论，如果看到有趣的想法，我也会做成加餐和大家分享。：）",-1),os=s("p",null,"到这里，我们就要与并查集说再见了，接下来我们一起学习 08｜排序：如何利用合并与快排的小技巧，解决算法难题。记得按时来探险。",-1);function es(ts,cs,rs,Es,ys,is){const a=e("Image");return t(),c("div",null,[E,l(a,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image6/M01/21/80/Cgp9HWBUZN2AGezPAABjCi7FK4I525.png"}),n(),y,l(a,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image6/M01/21/7D/CioPOWBUZOaADgCUAABGlTOU4Ak099.png"}),n(),i,l(a,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image6/M01/21/80/Cgp9HWBUZO6APF37AABG3_a_Q6c057.png"}),n(),F,l(a,{alt:"1 (1).gif",src:"https://s0.lgstatic.com/i/image6/M01/21/7D/CioPOWBUZQSANG0HAAUZirp5p1k748.gif"}),n(),A,l(a,{alt:"image.png",src:"https://s0.lgstatic.com/i/image6/M00/23/F4/CioPOWBX_4mAPpHfAABECA7Vc3g627.png"}),n(),D,l(a,{alt:"Drawing 6.png",src:"https://s0.lgstatic.com/i/image6/M01/21/7E/CioPOWBUZgaAOFDCAABeZqcuW0s773.png"}),n(),g,l(a,{alt:"Drawing 7.png",src:"https://s0.lgstatic.com/i/image6/M01/21/7E/CioPOWBUZpeADOaKAADoS6Y44b0977.png"}),n(),d,l(a,{alt:"Drawing 8.png",src:"https://s0.lgstatic.com/i/image6/M01/21/81/Cgp9HWBUZqCAfrFNAACU4aaiqjc231.png"}),n(),u,C,l(a,{alt:"2 (1).gif",src:"https://s0.lgstatic.com/i/image6/M01/21/7E/CioPOWBUZqqADNgZAAU5MW4PWoI242.gif"}),n(),h,B,b,l(a,{alt:"Drawing 10.png",src:"https://s0.lgstatic.com/i/image6/M01/21/81/Cgp9HWBUZrSALzFBAADhm_fwnRk393.png"}),n(),_,l(a,{alt:"Drawing 11.png",src:"https://s0.lgstatic.com/i/image6/M01/21/7E/CioPOWBUZryASSNEAAEb64nhdKE214.png"}),n(),x,v,f,l(a,{alt:"Drawing 12.png",src:"https://s0.lgstatic.com/i/image6/M01/21/7E/CioPOWBUZsWAPW0xAADZQU20JEU856.png"}),n(),m,l(a,{alt:"3.gif",src:"https://s0.lgstatic.com/i/image6/M01/21/81/Cgp9HWBUZteAaZlrABz3L57gQK4855.gif"}),n(),q,l(a,{alt:"Drawing 14.png",src:"https://s0.lgstatic.com/i/image6/M01/21/7E/CioPOWBUZumAF_CYAAA1NGN0dU0625.png"}),n(),k,l(a,{alt:"Drawing 15.png",src:"https://s0.lgstatic.com/i/image6/M01/21/81/Cgp9HWBUZvmACQxmAAC2H_g_eZk099.png"}),n(),T,U,H,N,S,j,l(a,{alt:"Drawing 16.png",src:"https://s0.lgstatic.com/i/image6/M01/21/81/Cgp9HWBUZwOAOXuWAABVP6uBCvA003.png"}),n(),P,w,O,V,l(a,{alt:"Drawing 17.png",src:"https://s0.lgstatic.com/i/image6/M00/21/7E/CioPOWBUZwyAA5MpAABxWS4ICiA231.png"}),n(),I,l(a,{alt:"Drawing 26.png",src:"https://s0.lgstatic.com/i/image6/M00/21/7E/CioPOWBUZx2AJlAhAAB9L5EmBj8559.png"}),n(),R,K,M,l(a,{alt:"Drawing 30.png",src:"https://s0.lgstatic.com/i/image6/M00/21/82/Cgp9HWBUZziAOXBLAAAF8Wyu_as055.png"}),n(),X,l(a,{alt:"Drawing 31.png",src:"https://s0.lgstatic.com/i/image6/M00/21/7E/CioPOWBUZ0OAaHLpAABvAPNQMEI372.png"}),n(),Q,l(a,{alt:"Drawing 32.png",src:"https://s0.lgstatic.com/i/image6/M00/21/7E/CioPOWBUZ02AEcbFAABhq26WhTE347.png"}),n(),G,W,Z,l(a,{alt:"Drawing 33.png",src:"https://s0.lgstatic.com/i/image6/M00/21/82/Cgp9HWBUZ1qASIekAAC-iYLl5-E217.png"}),n(),L,l(a,{alt:"Drawing 34.png",src:"https://s0.lgstatic.com/i/image6/M00/21/82/Cgp9HWBUZ2WAYuNmAADbi_WkYTo775.png"}),n(),z,l(a,{alt:"图片",src:"https://uploader.shimo.im/f/LbdIya2siEFX52pW.png!thumbnail?fileGuid=xxQTRXtVcqtHK6j8"}),n(),J,Y,$,ss,ns,l(a,{alt:"Drawing 38.png",src:"https://s0.lgstatic.com/i/image6/M00/21/82/Cgp9HWBUZ5KACZb3AAEzzay3PAM503.png"}),n(),as,ls,ps,os])}const Ds=o(r,[["render",es]]);export{As as __pageData,Ds as default};
