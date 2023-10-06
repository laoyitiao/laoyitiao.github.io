import{_ as e,j as o,o as t,g as c,k as a,s,h as l,Q as p}from"./chunks/framework.b3d8e22e.js";const hs=JSON.parse('{"title":"深度优先搜索（Depth-First Search / DFS） ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/037_300分钟搞定数据结构与算法/(33) 第05讲：深度与广度优先搜索.md","filePath":"posts/backEnd/037_300分钟搞定数据结构与算法/(33) 第05讲：深度与广度优先搜索.md","lastUpdated":1696417798000}'),i={name:"posts/backEnd/037_300分钟搞定数据结构与算法/(33) 第05讲：深度与广度优先搜索.md"},E=s("p",null,"这节课重点学习深度优先搜索算法（简称为 DFS）和广度优先搜索算法（简称为 BFS）。",-1),r=s("p",null,"DFS 和 BFS 经常在算法面试题当中出现，在整个算法面试知识点中所占的比重非常大。应用最多的地方就是对图进行遍历，树也是图的一种。",-1),y=s("h6",{id:"深度优先搜索-depth-first-search-dfs",tabindex:"-1"},[l("深度优先搜索（Depth-First Search / DFS） "),s("a",{class:"header-anchor",href:"#深度优先搜索-depth-first-search-dfs","aria-label":'Permalink to "深度优先搜索（Depth-First Search / DFS）"'},"​")],-1),d=s("p",null,"深度优先搜索，从起点出发，从规定的方向中选择其中一个不断地向前走，直到无法继续为止，然后尝试另外一种方向，直到最后走到终点。就像走迷宫一样，尽量往深处走。",-1),h=s("p",null,"DFS 解决的是连通性的问题，即，给定两个点，一个是起始点，一个是终点，判断是不是有一条路径能从起点连接到终点。起点和终点，也可以指的是某种起始状态和最终的状态。问题的要求并不在乎路径是长还是短，只在乎有还是没有。有时候题目也会要求把找到的路径完整的打印出来。",-1),u=s("h6",{id:"dfs-遍历",tabindex:"-1"},[l("DFS 遍历 "),s("a",{class:"header-anchor",href:"#dfs-遍历","aria-label":'Permalink to "DFS 遍历"'},"​")],-1),g=s("p",null,"例题：假设我们有这么一个图，里面有A、B、C、D、E、F、G、H 8 个顶点，点和点之间的联系如下图所示，对这个图进行深度优先的遍历。",-1),m=s("h3",{id:"解题思路",tabindex:"-1"},[l("解题思路 "),s("a",{class:"header-anchor",href:"#解题思路","aria-label":'Permalink to "解题思路"'},"​")],-1),_=s("p",null,"必须依赖栈（Stack），特点是后进先出（LIFO）。",-1),f=s("br",null,null,-1),A=s("p",null,"第一步，选择一个起始顶点，例如从顶点 A 开始。把 A 压入栈，标记它为访问过（用红色标记），并输出到结果中。",-1),B=s("p",null,"第二步，寻找与 A 相连并且还没有被访问过的顶点，顶点 A 与 B、D、G 相连，而且它们都还没有被访问过，我们按照字母顺序处理，所以将 B 压入栈，标记它为访问过，并输出到结果中。",-1),k=s("p",null,"第三步，现在我们在顶点 B 上，重复上面的操作，由于 B 与 A、E、F 相连，如果按照字母顺序处理的话，A 应该是要被访问的，但是 A 已经被访问了，所以我们访问顶点 E，将 E 压入栈，标记它为访问过，并输出到结果中。",-1),b=s("p",null,"第四步，从 E 开始，E 与 B、G 相连，但是B刚刚被访问过了，所以下一个被访问的将是G，把G压入栈，标记它为访问过，并输出到结果中。",-1),x=s("p",null,"第五步，现在我们在顶点 G 的位置，由于与 G 相连的顶点都被访问过了，类似于我们走到了一个死胡同，必须尝试其他的路口了。所以我们这里要做的就是简单地将 G 从栈里弹出，表示我们从 G 这里已经无法继续走下去了，看看能不能从前一个路口找到出路。",-1),C=s("p",null,"可以看到，每次我们在考虑下一个要被访问的点是什么的时候，如果发现周围的顶点都被访问了，就把当前的顶点弹出。",-1),z=s("p",null,"第六步，现在栈的顶部记录的是顶点 E，我们来看看与 E 相连的顶点中有没有还没被访问到的，发现它们都被访问了，所以把 E 也弹出去。",-1),I=s("p",null,"第七步，当前栈的顶点是 B，看看它周围有没有还没被访问的顶点，有，是顶点 F，于是把 F 压入栈，标记它为访问过，并输出到结果中。",-1),S=s("p",null,"第八步，当前顶点是 F，与 F 相连并且还未被访问到的点是 C 和 D，按照字母顺序来，下一个被访问的点是 C，将 C 压入栈，标记为访问过，输出到结果中。",-1),F=s("p",null,"第九步，当前顶点为 C，与 C 相连并尚未被访问到的顶点是 H，将 H 压入栈，标记为访问过，输出到结果中。",-1),D=s("p",null,"第十步，当前顶点是 H，由于和它相连的点都被访问过了，将它弹出栈。",-1),q=s("p",null,"第十一步，当前顶点是 C，与 C 相连的点都被访问过了，将 C 弹出栈。",-1),v=s("p",null,"第十二步，当前顶点是 F，与 F 相连的并且尚未访问的点是 D，将 D 压入栈，输出到结果中，并标记为访问过。",-1),j=s("p",null,"第十三步，当前顶点是 D，与它相连的点都被访问过了，将它弹出栈。以此类推，顶点 F，B，A 的邻居都被访问过了，将它们依次弹出栈就好了。最后，当栈里已经没有顶点需要处理了，我们的整个遍历结束。",-1),V=s("h6",{id:"例题分析一",tabindex:"-1"},[l("例题分析一 "),s("a",{class:"header-anchor",href:"#例题分析一","aria-label":'Permalink to "例题分析一"'},"​")],-1),M=s("p",null,"给定一个二维矩阵代表一个迷宫，迷宫里面有通道，也有墙壁，通道由数字 0 表示，而墙壁由 -1 表示，有墙壁的地方不能通过，那么，能不能从 A 点走到 B 点。",-1),O=s("p",null,"从 A 开始走的话，有很多条路径通往 B，例如下面两种。",-1),w=p("",33),P=s("p",null,"从各方向到达该点所需要的步数都更多，则不再尝试。",-1),T=p("",17),N=s("h3",{id:"解题思路-2",tabindex:"-1"},[l("解题思路 "),s("a",{class:"header-anchor",href:"#解题思路-2","aria-label":'Permalink to "解题思路"'},"​")],-1),L=s("p",null,"依赖队列（Queue），先进先出（FIFO）。",-1),K=s("br",null,null,-1),G=s("p",null,"一层一层地把与某个点相连的点放入队列中，处理节点的时候正好按照它们进入队列的顺序进行。",-1),H=s("p",null,"第一步，选择一个起始顶点，让我们从顶点 A 开始。把 A 压入队列，标记它为访问过（用红色标记）。",-1),Y=s("p",null,"第二步，从队列的头取出顶点 A，打印输出到结果中，同时将与它相连的尚未被访问过的点按照字母大小顺序压入队列，同时把它们都标记为访问过，防止它们被重复地添加到队列中。",-1),Z=s("p",null,"第三步，从队列的头取出顶点 B，打印输出它，同时将与它相连的尚未被访问过的点（也就是 E 和 F）压入队列，同时把它们都标记为访问过。",-1),U=s("p",null,"第四步，继续从队列的头取出顶点 D，打印输出它，此时我们发现，与 D 相连的顶点 A 和 F 都被标记访问过了，所以就不要把它们压入队列里。",-1),Q=s("p",null,"第五步，接下来，队列的头是顶点 G，打印输出它，同样的，G 周围的点都被标记访问过了。我们不做任何处理。",-1),X=s("p",null,"第六步，队列的头是 E，打印输出它，它周围的点也都被标记为访问过了，我们不做任何处理。",-1),R=s("p",null,"第七步，接下来轮到顶点 F，打印输出它，将 C 压入队列，并标记 C 为访问过。",-1),J=s("p",null,"第八步，将 C 从队列中移出，打印输出它，与它相连的 H 还没被访问到，将 H 压入队列，将它标记为访问过。",-1),W=s("p",null,"第九步，队列里只剩下 H 了，将它移出，打印输出它，发现它的邻居都被访问过了，不做任何事情。",-1),$=s("p",null,"第十步，队列为空，表示所有的点都被处理完毕了，程序结束。",-1),ss=s("h6",{id:"例题分析一-1",tabindex:"-1"},[l("例题分析一 "),s("a",{class:"header-anchor",href:"#例题分析一-1","aria-label":'Permalink to "例题分析一"'},"​")],-1),ns=s("p",null,"运用广度优先搜索的算法在迷宫中寻找最短的路径。",-1),as=s("h3",{id:"解题思路-3",tabindex:"-1"},[l("解题思路 "),s("a",{class:"header-anchor",href:"#解题思路-3","aria-label":'Permalink to "解题思路"'},"​")],-1),ls=s("p",null,"搜索的过程如下。",-1),ps=p("",32),es=p("",14);function os(ts,cs,is,Es,rs,ys){const n=o("Image");return t(),c("div",null,[E,r,y,d,h,u,g,a(n,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/43/CgotOV2IkYuANIhxAAB2CBZsYLQ484.png"}),m,_,f,A,a(n,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/23/CgoB5l2IkYyAAZhkABsNRVtft9s555.gif"}),B,a(n,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/23/CgoB5l2IkYyAHhJWACv4GjTZRBQ760.gif"}),k,a(n,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/43/CgotOV2IkYyAO9LVACEhHBdbKfc149.gif"}),b,a(n,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/23/CgoB5l2IkYyAc3T6ACUuR_5lcvw842.gif"}),x,a(n,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/43/CgotOV2IkYyAYBQ4AA7A5yscltI499.gif"}),C,z,a(n,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/23/CgoB5l2IkYyAe__KABAUImf6ENE708.gif"}),I,a(n,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/43/CgotOV2IkY2ACNi3AEWj2_BWcsM296.gif"}),S,a(n,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/43/CgotOV2IkY2ABY_CAD5yLy-V6CM016.gif"}),F,a(n,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/23/CgoB5l2IkY2AHiebAEZJ2pzOuiQ289.gif"}),D,a(n,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/43/CgotOV2IkY6AMrbOAC9gCtQSDyg193.gif"}),q,a(n,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/43/CgotOV2IkZCAb7O6ACq7mfesvtU046.gif"}),v,a(n,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/23/CgoB5l2IkZGAcNsZACm2oC7I53I299.gif"}),j,a(n,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/23/CgoB5l2IkZKAUYofADryI0IEla8177.gif"}),V,M,a(n,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/23/CgoB5l2IkZOAZAaTAAEnEYY55UA254.png"}),O,a(n,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/43/CgotOV2IkZmAUAsQAOl9ssa2zxE177.gif"}),a(n,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/43/CgotOV2IkZ6AEp2BAOF4o1jndN0409.gif"}),w,a(n,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/43/CgotOV2IkaSAJZTIAOVn4eGgEXc393.gif"}),P,a(n,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/43/CgotOV2IkamAazS1ANB4kNxFNT4453.gif"}),T,a(n,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/24/CgoB5l2IkamAcHHCAAB2vDyOBsk961.png"}),N,L,K,G,H,a(n,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/24/CgoB5l2IkaqAMe91ACG_XqSE0yA958.gif"}),Y,a(n,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/24/CgoB5l2IkayAaGfVAETtH2VWV-A751.gif"}),Z,a(n,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/24/CgoB5l2Ika-AOPRWAHRFIVXcPQI792.gif"}),U,a(n,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/24/CgoB5l2IkbGAMV2kAC8Ltvwuc5g827.gif"}),Q,a(n,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/44/CgotOV2IkbKAceIeADfsJWqxiZA916.gif"}),X,a(n,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/24/CgoB5l2IkbOACo8JABbKDt0EN50653.gif"}),R,a(n,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/44/CgotOV2IkbWATgK5ACuDZM3dEJw749.gif"}),J,a(n,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/44/CgotOV2IkbaAW9IfACOEixVhbyA516.gif"}),W,a(n,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/44/CgotOV2IkbeAHpX6AB3ZQSZ7XbM801.gif"}),$,ss,ns,as,ls,a(n,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/44/CgotOV2IkbuAIX0lAHdOXp_zsxE546.gif"}),ps,a(n,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/24/CgoB5l2IkcCAWjRjALszKfUEV7A310.gif"}),a(n,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/24/CgoB5l2IkcOAd-giAItzJVPUNUM375.gif"}),a(n,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/44/CgotOV2IkcaAI78RAHjv2Tul3JY991.gif"}),es])}const us=e(i,[["render",os]]);export{hs as __pageData,us as default};
