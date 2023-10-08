import{_ as o,j as e,o as t,g as r,k as l,h as s,Q as p,s as n}from"./chunks/framework.4e7d56ce.js";const U=JSON.parse('{"title":"05链表：如何利用“假头、新链表、双指针”解决链表题？（下）","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/数据结构与算法面试宝典_文档/(6694) 05  链表：如何利用“假头、新链表、双指针”解决链表题？（下）.md","filePath":"posts/backEnd/数据结构与算法面试宝典_文档/(6694) 05  链表：如何利用“假头、新链表、双指针”解决链表题？（下）.md","lastUpdated":1696682708000}'),c={name:"posts/backEnd/数据结构与算法面试宝典_文档/(6694) 05  链表：如何利用“假头、新链表、双指针”解决链表题？（下）.md"},E=p("",14),y=p("",5),i=p("",8),A=p("",5),d=p("",22),g=p("",20),u=p("",10),D=p("",29),h=n("p",null,[n("strong",null,"情况 2"),s("：链表长度等于 k。此时需要删除倒数第 k 个结点，也就是旧链表的 head 结点。")],-1),m=n("p",null,"当 front 指针先走完 k 步之后，back 指针刚好位于 dummy 结点。而 dummy 结点就是倒数第 k+1 个结点，那么此时可以直接通过 back 指针删除它后面的结点（刚好是 head，也就是倒数第 k 个）。",-1),F=n("p",null,[n("strong",null,"情况 3"),s("：链表长度大于 k。back 指针刚好位于倒数第 k+1 个结点，此时可以直接通过 back 指针删除它后面的结点（刚好是倒数第 k 个)。")],-1),b=n("p",null,"我们发现：情况 2 和情况 3 实际上都是用 back 指针来删除后面的结点。因此，这两种情况可以一起处理。",-1),_=p("",6),B=p("",15),k=n("p",null,[s("2.当有"),n("strong",null,"奇数"),s(" 个结点，"),n("strong",null,"s2 是最后一个结点"),s(" ，此时 s1 指针位于前半部分的最后，"),n("strong",null,"直接返回 s1"),s("即可。")],-1),C=p("",6),L=p("",8),f=n("p",null,[s("【"),n("strong",null,"分析"),s("】首先，如果链表中存在环，只用一个指针遍历肯定是永无止境的，这一个指针会在环里面打转。因此，我们可以再次利用双指针，s1，s2 两个指针都从链表头开始，s1 指针表示每次只往前走一步，s2 指针则是每次只往前走两步。那么链表最终只有两种情况：")],-1),x=n("p",null,[n("strong",null,"1"),s(".s1 == s2，这个时候链表存在环；")],-1),N=n("p",null,[n("strong",null,"2"),s(".s1 != s2，这个时候链表不存在环。")],-1),v=p("",8),T=n("p",null,[s("这里我还想给你留一个"),n("strong",null,"小问题"),s("：在寻找链表环的过程中，对于两种特殊情况，我们实际上进行了特殊判断，那么有没有什么办法可以避免这种特殊的断呢？")],-1),P=n("p",null,"小提示：想想我们之前学习过的假头。",-1),S=n("p",null,"老规矩，希望你尝试思考并把想法写在留言区，期待和你一起讨论。另外，我也会根据大家的留言反馈，不定时输出加餐内容，比如练习题详解、留言区问题点评等。",-1),q=n("p",null,[s("【"),n("strong",null,"扩展"),s("】在面试中，伴随着链表环问题的，往往还有后招：如果链表中存在环，能不能把形成环的那个结点找出来？")],-1),w=n("p",null,"我们可以把这个问题转化成一个数学问题。我们一起看一下下面这张图：",-1),j=p("",13),I=p("",8);function W(V,O,M,J,R,H){const a=e("Image");return t(),r("div",null,[E,l(a,{alt:"1.gif",src:"https://s0.lgstatic.com/i/image6/M01/1A/58/Cgp9HWBLPB-ADUhLAA5duiC4Cn0341.gif"}),s(),y,l(a,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image6/M01/1A/55/CioPOWBLPCqAFbDdAAEIj8hvRD4018.png"}),s(),i,l(a,{alt:"2.gif",src:"https://s0.lgstatic.com/i/image6/M00/1A/58/Cgp9HWBLPDmACYnZABNjwPGgFOE315.gif"}),s(),A,l(a,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image6/M00/1A/56/CioPOWBLPEiANaaFAAGpHYE1Luw914.png"}),s(),d,l(a,{alt:"3.gif",src:"https://s0.lgstatic.com/i/image6/M00/1A/56/CioPOWBLPFmAUvWfABh66BN8Jpo146.gif"}),s(),g,l(a,{alt:"4.gif",src:"https://s0.lgstatic.com/i/image6/M00/1A/56/CioPOWBLPHmASuS0ABO8i1nbo5k731.gif"}),s(),u,l(a,{alt:"Drawing 6.png",src:"https://s0.lgstatic.com/i/image6/M00/1A/59/Cgp9HWBLPIuABvdjAAIdeUzaIaE820.png"}),s(),D,l(a,{alt:"Drawing 7.png",src:"https://s0.lgstatic.com/i/image6/M00/1A/56/CioPOWBLPJiAJuL5AACldcUHsSo093.png"}),s(),h,m,l(a,{alt:"Drawing 8.png",src:"https://s0.lgstatic.com/i/image6/M00/1A/5A/Cgp9HWBLPKGAed19AADYq0JsnnQ189.png"}),s(),F,l(a,{alt:"Drawing 9.png",src:"https://s0.lgstatic.com/i/image6/M00/1A/5A/Cgp9HWBLPKmAX36bAADfNLuJxK4304.png"}),s(),b,l(a,{alt:"Drawing 10.png",src:"https://s0.lgstatic.com/i/image6/M00/1A/5A/Cgp9HWBLPLCAIVQrAADfNLuJxK4542.png"}),s(),_,l(a,{alt:"Drawing 11.png",src:"https://s0.lgstatic.com/i/image6/M00/1A/5A/Cgp9HWBLPL2AMjj9AACVkYTuuog333.png"}),s(),B,l(a,{alt:"Drawing 12.png",src:"https://s0.lgstatic.com/i/image6/M00/1A/57/CioPOWBLPOWAC7-qAADDfwOq_28981.png"}),s(),k,l(a,{alt:"Drawing 13.png",src:"https://s0.lgstatic.com/i/image6/M00/1A/5B/Cgp9HWBLPOuAGwrJAADd3JbVNuk045.png"}),s(),C,l(a,{alt:"Drawing 14.png",src:"https://s0.lgstatic.com/i/image6/M01/1A/5B/Cgp9HWBLPPiAZ1ICAACcFHDKHnU280.png"}),s(),L,l(a,{alt:"image.png",src:"https://s0.lgstatic.com/i/image6/M00/1D/11/Cgp9HWBPHjeAJc-1AACG-G5vmvk152.png"}),s(),f,x,l(a,{alt:"Drawing 16.png",src:"https://s0.lgstatic.com/i/image6/M01/1A/58/CioPOWBLPQ-ARKeiAABYprWvhEY284.png"}),s(),N,l(a,{alt:"Drawing 17.png",src:"https://s0.lgstatic.com/i/image6/M01/1A/58/CioPOWBLPRyAebn8AABOBQ3Pto0204.png"}),s(),v,l(a,{alt:"Drawing 18.png",src:"https://s0.lgstatic.com/i/image6/M01/1A/5B/Cgp9HWBLPS2AWdvLAACf7D3G1jI099.png"}),s(),T,P,S,q,l(a,{alt:"Drawing 19.png",src:"https://s0.lgstatic.com/i/image6/M01/1A/58/CioPOWBLPTWAavliAAC_v6RSPzw758.png"}),s(),w,l(a,{alt:"Drawing 20.png",src:"https://s0.lgstatic.com/i/image6/M01/1A/58/CioPOWBLPTuAR6wcAACC03BCByU232.png"}),s(),j,l(a,{alt:"图片1.png",src:"https://s0.lgstatic.com/i/image6/M01/3E/39/CioPOWCYmIWAFXX4AASqbS526bc322.png"}),s(),I])}const G=o(c,[["render",W]]);export{U as __pageData,G as default};
