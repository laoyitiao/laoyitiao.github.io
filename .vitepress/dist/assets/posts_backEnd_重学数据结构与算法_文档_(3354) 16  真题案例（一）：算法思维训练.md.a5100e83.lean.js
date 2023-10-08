import{_ as o,j as e,o as t,g as r,k as l,h as n,Q as p,s}from"./chunks/framework.4e7d56ce.js";const T=JSON.parse('{"title":"16真题案例（一）：算法思维训练","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/重学数据结构与算法_文档/(3354) 16  真题案例（一）：算法思维训练.md","filePath":"posts/backEnd/重学数据结构与算法_文档/(3354) 16  真题案例（一）：算法思维训练.md","lastUpdated":1696682708000}'),c={name:"posts/backEnd/重学数据结构与算法_文档/(3354) 16  真题案例（一）：算法思维训练.md"},E=p("",36),y=p("",24),i=s("p",null,'接着，每个可能的起点字符，都应该同时出现在字符串 a 和 b 中，例如"1"就是一个可能的起点。如果以"1"作为起点，那么它后面的字符就是阶段，显然下个阶段就是 a[1] = 3 和 b[1] = 2。而此时的状态就是当前的公共子串，即 "1"。',-1),F=s("p",null,'决策的结果是，下一个阶段是否进入到公共子串中。很显然 a[1] 不等于 b[1]，因此决策的结果是不进入。这也同时命中了终止条件。如果以"3"起点，则因为它之后的 a[2] 等于 b[3]，则决策结果是进入到公共子串。',-1),g=s("p",null,'因此状态转移方程 s~k+1~ = u~k~(s~k~)，含义是在"3"的状态下决策"4"进入子串，结果得到"34"。我们的目标是寻找最大的公共子串，因此可以用从 1 开始的数字定义距离（子串的长度）。具体步骤如下：',-1),A=s("p",null,"对于每个可能的起点，距离都是 1 （不可能的起点置为 0，图中忽略未写）。则有：",-1),d=s("p",null,"接着利用状态转移方程，去寻找最优子结构。也就是，如果 b[i] = a[j]，则 m[i,j] = m[i-1,j-1] + 1。含义为，如果决策结果是相等，则状态增加一个新的字符，进行更新。可以得到：",-1),u=p("",7),D=s("p",null,"随后的 17～26 行，我们从矩阵 m 中，找到了最大值为 3，在字符串 b 中的索引值为 4（此时 index 为 5，但别忘了我们之前额外定义了一行/一列的全零向量）。",-1),C=s("p",null,'最后，27～30 行，我们根据终点字符串索引值 4 和最大公共子串长度 3，就能找到最大公共子串在 b 中的 2～4 的位置。即 "345"。',-1),m=s("h3",{id:"总结",tabindex:"-1"},[n("总结 "),s("a",{class:"header-anchor",href:"#总结","aria-label":'Permalink to "总结"'},"​")],-1),_=s("p",null,[n("这一课时中，我们对例题做了详细的分析和讲解，重点其实是训练你的算法思维。为了检验你的学习成果，我们基于斐波那契数列的例题，再给出一个"),s("strong",null,"思考题，题目如下"),n("：")],-1),h=s("p",null,[s("strong",null,"如果现在是个线上实时交互的系统。客户端输入 x，服务端返回斐波那契数列中的第 x 位。那么，这个问题使用上面的解法是否可行"),n("。")],-1),b=s("p",null,"这里给你一个小提示，既然我这么问，答案显然是不可行的。如果不可行，原因是什么呢？我们又该如何解决？注意，题目中给出的是一个实时系统。当用户提交了 x，如果在几秒内没有得到系统响应，用户就会卸载 App 啦。",-1);function B(f,x,q,v,S,k){const a=e("Image");return t(),r("div",null,[E,l(a,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image/M00/2E/C4/CgqCHl8Fi6eAVyX3AAAnk9vJF3c337.png"}),n(),y,l(a,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image/M00/2E/C1/Ciqc1F8Fkz6APcxAAAAepje1Jv8882.png"}),n(),i,F,g,A,l(a,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image/M00/2E/CC/CgqCHl8Fk3OAO0i4AAAfVRzJAfw184.png"}),n(),d,l(a,{alt:"Drawing 6.png",src:"https://s0.lgstatic.com/i/image/M00/2E/CD/CgqCHl8Fk32AEA7dAAAgSbzrdRM560.png"}),n(),u,l(a,{alt:"Drawing 6.png",src:"https://s0.lgstatic.com/i/image/M00/2E/CD/CgqCHl8Fk32AEA7dAAAgSbzrdRM560.png"}),n(),D,C,m,_,h,b])}const P=o(c,[["render",B]]);export{T as __pageData,P as default};
