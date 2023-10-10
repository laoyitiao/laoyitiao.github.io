import{_ as o,j as e,o as t,g as r,k as l,h as n,Q as p,s}from"./chunks/framework.cfb14fe0.js";const ks=JSON.parse('{"title":"06树：如何深度运用树的遍历？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/数据结构与算法面试宝典_文档/(6695) 06  树：如何深度运用树的遍历？.md","filePath":"posts/backEnd/数据结构与算法面试宝典_文档/(6695) 06  树：如何深度运用树的遍历？.md","lastUpdated":1696682708000}'),c={name:"posts/backEnd/数据结构与算法面试宝典_文档/(6695) 06  树：如何深度运用树的遍历？.md"},E=p("",13),y=p("",22),i=s("p",null,"输出: true",-1),A=s("p",null,[n("【"),s("strong",null,"分析"),n(" 】二叉搜索树的定义，"),s("strong",null,"本质上就是一个前序遍历"),n("。因此，可以利用前序遍历的思路来解决这道题。")],-1),g=p("",7),u=p("",22),F=s("p",null,'然后，我们收获了一种思路------"影子"二叉树；一个模板------如何判断相同的树。',-1),d=s("h4",{id:"例-2-目标和的所有路径",tabindex:"-1"},[n("例 2：目标和的所有路径 "),s("a",{class:"header-anchor",href:"#例-2-目标和的所有路径","aria-label":'Permalink to "例 2：目标和的所有路径"'},"​")],-1),h=s("p",null,[n("【"),s("strong",null,"题目"),n("】给定一棵二叉树，一个目标值。请输出所有路径，需要满足根结点至叶子结点之和等于给定的目标值。")],-1),D=s("p",null,"输入：target = 9",-1),C=s("p",null,"输出：[[5,4], [5,3,1]]",-1),b=s("p",null,[s("strong",null,"解释"),n("：从根结点到叶子结点形成的路径有 3 条：[5, 4], [5, 3, 1], [5, 3, 2]，其中只有 [5, 4], [5, 3, 1] 形成的和为 9。")],-1),B=s("p",null,[n("【"),s("strong",null,"分析"),n(" 】这是一道来自"),s("strong",null,"头条"),n("的面试题目。首先题目要求从根结点出发，最后到达叶子结点。因此，从遍历的顺序上来说，符合前序遍历。")],-1),_=s("p",null,[n("【"),s("strong",null,"模拟"),n("】那么接下来我们进行一轮模拟，过程如下所示：")],-1),m=p("",21),f=p("",6),T=s("ul",null,[s("li",null,[s("p",null,"Step 1. 左子树作为一个整体放到左边；然后把根结点放到中间；最后把右子树作为一个整体放右边。")]),s("li",null,[s("p",null,"Step 2. 接着再把左子树展开。")]),s("li",null,[s("p",null,"Step 3. 最后再把右子树展开，此时我们就得到了最终中序遍历的结果。")])],-1),v=s("p",null,"经过上述过程的拆解和分析，有助于帮助你理解中序遍历。但是仍然要注意输出结点的顺序，结点真正输出顺序如下图所示：",-1),k=p("",15),q=p("",15),x=p("",10),N=s("p",null,"b）当结点 1 删除之后，左子树的根结点为 2，需要设置 root.left 指向结点 2。如下图所示：",-1),S=s("p",null,"c）当结点 1 删除之后，左子树根结点变成 2，需要设置 root.left 指向结点 2。如下图所示：",-1),V=p("",7),R=s("p",null,"在删除 1 之后，都需要返回 null。",-1),j=s("p",null,[n("b）如果被删除的结点有左子树。那么需要从"),s("strong",null,"左子树中找到最大值"),n(" ，然后与当前结点进行值"),s("strong",null,"交换"),n(" 。最后"),s("strong",null,"再在左子树中删除 value"),n("。步骤如下：")],-1),O=p("",6),P=p("",19),I=s("h3",{id:"后序遍历",tabindex:"-1"},[n("后序遍历 "),s("a",{class:"header-anchor",href:"#后序遍历","aria-label":'Permalink to "后序遍历"'},"​")],-1),H=s("p",null,"接下来我们看一下后序遍历。后序遍历的顺序：",-1),L=s("ol",null,[s("li",null,[s("p",null,"左子树")]),s("li",null,[s("p",null,"右子树")]),s("li",null,[s("p",null,"根结点")])],-1),X=s("p",null,"这里我们同样采用一种**概括处理的思路，**不再按照课本上一步一步演示的方式。下图是我们处理的步骤：",-1),M=s("ul",null,[s("li",null,[s("p",null,"Step 1. 左子树作为一个整体放到左边，右子树作为一个整体放右边。")]),s("li",null,[s("p",null,"Step 2. 再把左子树展开。")]),s("li",null,[s("p",null,"Step 3. 接着把右子树展开。")]),s("li",null,[s("p",null,"Step 4. 最后放上根结点。")])],-1),G=s("p",null,[n("这样有助于帮助你理解后序遍历。但是仍然要"),s("strong",null,"注意输出结点的顺序"),n("。结点真正输出顺序如下图所示（红色表示顺序）：")],-1),K=p("",19),Q=s("p",null,[n("如上图所示：如果满足 lmax < x 并且 x < rmin，那么可以认为这棵树是二叉搜索树。注意，"),s("strong",null,"我们是先拿到了左子树与右子树的信息，然后再利用这个信息做出判断"),n("。这样的操作符合后序遍历的要求。")],-1),w=s("p",null,[n("【"),s("strong",null,"画图"),n("】这里我们拿一棵二叉搜索树来画图演示步骤，动图如下：")],-1),W=s("p",null,"Step 1. 想要判断根结点是否大于左子树，小于右子树。但是此时还没有拿到左右子树的信息，于是分别去拿左子树/右子树的信息。",-1),J=s("p",null,"Step 2. 观察左子树.可以发现 1 < 2， 并且 2 < 3，左子树是一棵二叉搜索树，此外我们还得到了左子树的范围 [1, 3]。",-1),U=s("p",null,"Step 3. 然后再看右子树，可以发现 5 < 6 并且 6 < 7，右子树是一棵二叉搜索树，此外我们还得到了右子树的范围 [5, 7]。",-1),Y=s("p",null,"Step 4. 分别得到左右子树的信息之后，我们将这个信息替换掉原来的子树，然后再比较 lmax = 3 < 4 并且 4 < rmin = 5，因此这棵树是一棵有效的二叉搜索树。",-1),Z=s("p",null,[n("【"),s("strong",null,"技巧"),n("】在利用后序遍历处理这道题目的时候，还需要考虑空结点带来的麻烦，如下图所示：")],-1),z=s("p",null,"我们在处理结点 4 的时候，右子树的范围比较容易确定 [5, 5]。但是左子树是一棵空树，返回什么范围给结点 4 合适呢？有什么办法可以比较好地避免用 if/else 去判断空结点呢？",-1),$=s("p",null,[n("这里给你介绍一个"),s("strong",null,"技巧：用 [Long.MAX_VALUE, Long.MIN_VALUE]表示一个空区间"),n(" ，也就是"),s("strong",null,"下界是一个最大的数，上界是一个最小的数"),n("。")],-1),ss=s("p",null,"下面我们利用动图演示一下为什么在这种情况下可以工作（画图时分别用 -inf 取代最小值，用inf 取代最大值）：",-1),ns=p("",12),as=s("p",null,[n("如果我们再深入思考一下，就会发现，后序遍历的时候有个"),s("strong",null,"特点"),n(" ："),s("strong",null,"想要验证"),n(" 一棵树是否是二叉搜索树，后序遍历的"),s("strong",null,"返回值"),n("却是整棵树的信息。")],-1),ls=s("p",null,"这里画图来表示一下：",-1),ps=s("p",null,[n('有点"'),s("strong",null,"项庄舞剑，意在沛公"),n('"的味道。那么我们再对后序遍历做一个小结，如下图所示：')],-1),os=s("p",null,"完成总结后，我们再通过一道题目，加深对这个考点的理解。",-1),es=s("h4",{id:"例-6-最低公共祖先",tabindex:"-1"},[n("例 6：最低公共祖先 "),s("a",{class:"header-anchor",href:"#例-6-最低公共祖先","aria-label":'Permalink to "例 6：最低公共祖先"'},"​")],-1),ts=s("p",null,[n("【"),s("strong",null,"题目"),n("】给定一棵二叉树，和两个在树上的结点，返回这两个结点的最低公共祖先。比如 [5,3] 两个结点的最低公共祖先是结点 6。")],-1),rs=p("",3),cs=s("p",null,"Case 2：根结点为 q，另外一个结点 p 在子树里，反之亦然。如下图所示：",-1),Es=s("p",null,[n("这里你可能会想，如果"),s("strong",null,"左子树"),n("找到 2 个结点怎么办？比如下图展示的情况：")],-1),ys=p("",5),is=p("",15),As=s("p",null,"虽然我们只介绍了两个结点的后序遍历解法，但你也可以开阔思路来试一下多叉树的题目。",-1),gs=s("p",null,[n("我们再归纳一下"),s("strong",null,"后序遍历的思路"),n(" ，可以"),s("strong",null,'总结为 8 个字"项庄舞剑，意在沛公"'),n("，如下图所示：")],-1),us=s("ul",null,[s("li",null,[s("p",null,'子树的信息：即如何定义函数的返回值。可以巧妙记为"项庄是谁？"。')]),s("li",null,[s("p",null,'信息的处理：如何利用子树返回的信息，得到我们最终想要的结论，可以巧妙地记为"如何得到沛公？"。')])],-1),Fs=s("h3",{id:"总结与延伸",tabindex:"-1"},[n("总结与延伸 "),s("a",{class:"header-anchor",href:"#总结与延伸","aria-label":'Permalink to "总结与延伸"'},"​")],-1),ds=s("p",null,"经过前面几讲的学习，我们马上就要和二叉树说再见了，回到知识层面，我再把本讲重点介绍，且需要你掌握的内容总结在一张思维导图中，如下图所示：",-1),hs=s("p",null,"除去知识的扩展，你还要学会浓缩和简化，抓住三种遍历的核心。我同样为你总结了一张思维导图：",-1),Ds=p("",7);function Cs(bs,Bs,_s,ms,fs,Ts){const a=e("Image");return t(),r("div",null,[E,l(a,{alt:"1.gif",src:"https://s0.lgstatic.com/i/image6/M00/1F/3F/CioPOWBRtI-AItMYAAjasV3sa24039.gif"}),n(),y,l(a,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image6/M00/1F/42/Cgp9HWBRtKeAYSGpAACZpTIXfU0084.png"}),n(),i,A,l(a,{alt:"11.gif",src:"https://s0.lgstatic.com/i/image6/M01/21/38/CioPOWBUIueAOJfcAAdhS5BAUGo971.gif"}),n(),g,l(a,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image6/M00/1F/3F/CioPOWBRtNGAeo22AACebFDJtSc681.png"}),n(),u,l(a,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image6/M00/1F/3F/CioPOWBRtOmAcCa2AADXoM_tlx4996.png"}),n(),F,d,h,D,l(a,{alt:"Drawing 5.png",src:"https://s0.lgstatic.com/i/image6/M00/1F/3F/CioPOWBRtPWAR1otAACA-Iu2vmU954.png"}),n(),C,b,B,_,l(a,{alt:"3.gif",src:"https://s0.lgstatic.com/i/image6/M01/1F/42/Cgp9HWBRtQqAeOlzAA3wDEKa3P4970.gif"}),n(),m,l(a,{alt:"Drawing 7.png",src:"https://s0.lgstatic.com/i/image6/M01/1F/43/Cgp9HWBRtRmAU_NjAAEAKqKMPsY246.png"}),n(),f,l(a,{alt:"4.gif",src:"https://s0.lgstatic.com/i/image6/M01/1F/43/Cgp9HWBRtSuAPkajAAkCntnG56c613.gif"}),n(),T,v,l(a,{alt:"2021319-12844.png",src:"https://s0.lgstatic.com/i/image6/M00/21/3A/CioPOWBUI-qAV1MZAACWlNh4bls274.png"}),n(),k,l(a,{alt:"Drawing 10.png",src:"https://s0.lgstatic.com/i/image6/M01/1F/43/Cgp9HWBRtUiAJEr9AAC21ET_Iqs675.png"}),n(),q,l(a,{alt:"Drawing 11.png",src:"https://s0.lgstatic.com/i/image6/M01/1F/43/Cgp9HWBRtVWASUJoAAD2XJCLLgQ425.png"}),n(),x,l(a,{alt:"Drawing 12.png",src:"https://s0.lgstatic.com/i/image6/M00/1F/43/Cgp9HWBRtWWAIxSJAABkVgPnF_o374.png"}),n(),N,l(a,{alt:"Drawing 13.png",src:"https://s0.lgstatic.com/i/image6/M01/1F/40/CioPOWBRtW2AARGtAAB29vC847A588.png"}),n(),S,l(a,{alt:"Drawing 14.png",src:"https://s0.lgstatic.com/i/image6/M01/1F/40/CioPOWBRtXaALQrkAAB3-_72MrY558.png"}),n(),V,l(a,{alt:"Drawing 15.png",src:"https://s0.lgstatic.com/i/image6/M00/1F/40/CioPOWBRtYOAaCxfAABz2q7dEO8442.png"}),n(),R,j,l(a,{alt:"5.gif",src:"https://s0.lgstatic.com/i/image6/M00/1F/43/Cgp9HWBRtZiAEkBKAAanEhq-SYE408.gif"}),n(),O,l(a,{alt:"6.gif",src:"https://s0.lgstatic.com/i/image6/M00/1F/40/CioPOWBRtbCAEv1OAAXuSoTT_wY014.gif"}),n(),P,l(a,{alt:"Drawing 18.png",src:"https://s0.lgstatic.com/i/image6/M00/1F/40/CioPOWBRtcGAHdsVAAD8g3mqZEQ373.png"}),n(),I,H,L,X,l(a,{alt:"7.gif",src:"https://s0.lgstatic.com/i/image6/M00/1F/43/Cgp9HWBRtc6AUcUpAAoB4AbuqCg073.gif"}),n(),M,G,l(a,{alt:"Drawing 20.png",src:"https://s0.lgstatic.com/i/image6/M00/1F/43/Cgp9HWBRtdmAVCQTAACWpvqFKDQ011.png"}),n(),K,l(a,{alt:"Drawing 21.png",src:"https://s0.lgstatic.com/i/image6/M00/1F/43/Cgp9HWBRte6AGgSSAANZYCc0W0I359.png"}),n(),Q,w,l(a,{alt:"12.gif",src:"https://s0.lgstatic.com/i/image6/M01/21/38/CioPOWBUIwGAAv3NAAp9VZSO5a4731.gif"}),n(),W,J,U,Y,Z,l(a,{alt:"Drawing 23.png",src:"https://s0.lgstatic.com/i/image6/M01/1F/40/CioPOWBRtgKAIBrtAABQgHb3MVg861.png"}),n(),z,$,ss,l(a,{alt:"9.gif",src:"https://s0.lgstatic.com/i/image6/M01/1F/43/Cgp9HWBRtheAAqTpAAqrC7nn9cs642.gif"}),n(),ns,l(a,{alt:"Drawing 25.png",src:"https://s0.lgstatic.com/i/image6/M01/1F/40/CioPOWBRtiyAGHC7AACr9Dp8WWE577.png"}),n(),as,ls,l(a,{alt:"Drawing 26.png",src:"https://s0.lgstatic.com/i/image6/M01/1F/43/Cgp9HWBRtjaACs7TAABq6h1DLRQ985.png"}),n(),ps,l(a,{alt:"Drawing 27.png",src:"https://s0.lgstatic.com/i/image6/M01/1F/40/CioPOWBRtj6AF94_AAC54hdOUJs668.png"}),n(),os,es,ts,l(a,{alt:"Drawing 28.png",src:"https://s0.lgstatic.com/i/image6/M01/1F/40/CioPOWBRtkaAE0QsAADAh6zPbnk294.png"}),n(),rs,l(a,{alt:"Drawing 29.png",src:"https://s0.lgstatic.com/i/image6/M01/1F/40/CioPOWBRtlCAbdR9AARsIH_iZJY236.png"}),n(),cs,l(a,{alt:"Drawing 30.png",src:"https://s0.lgstatic.com/i/image6/M01/1F/43/Cgp9HWBRtlmAcMP0AAJsaaiXrk4163.png"}),n(),Es,l(a,{alt:"Drawing 31.png",src:"https://s0.lgstatic.com/i/image6/M01/1F/44/Cgp9HWBRtmKADj4gAAKGC_G6FjM242.png"}),n(),ys,l(a,{alt:"10.gif",src:"https://s0.lgstatic.com/i/image6/M01/1F/40/CioPOWBRtm-AabKNAAto4bxyLyY509.gif"}),n(),is,l(a,{alt:"Drawing 33.png",src:"https://s0.lgstatic.com/i/image6/M01/1F/40/CioPOWBRtoqAPZ6tAADozszBVY4858.png"}),n(),As,gs,l(a,{alt:"Drawing 34.png",src:"https://s0.lgstatic.com/i/image6/M01/1F/40/CioPOWBRtpGAUxzZAADV23ElNds459.png"}),n(),us,Fs,ds,l(a,{alt:"Drawing 35.png",src:"https://s0.lgstatic.com/i/image6/M01/1F/40/CioPOWBRtp2ACQ-ZAAKKPaNyzjs632.png"}),n(),hs,l(a,{alt:"Drawing 36.png",src:"https://s0.lgstatic.com/i/image6/M01/1F/40/CioPOWBRtqWAL6DXAADFeBomwio444.png"}),n(),Ds])}const qs=o(c,[["render",Cs]]);export{ks as __pageData,qs as default};
