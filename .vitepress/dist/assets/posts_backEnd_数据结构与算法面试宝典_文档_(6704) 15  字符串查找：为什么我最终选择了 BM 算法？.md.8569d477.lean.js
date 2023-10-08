import{_ as o,j as e,o as t,g as c,k as l,h as n,Q as p,s}from"./chunks/framework.a0d18f64.js";const Qs=JSON.parse('{"title":"15 字符串查找：为什么我最终选择了BM算法？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/数据结构与算法面试宝典_文档/(6704) 15  字符串查找：为什么我最终选择了 BM 算法？.md","filePath":"posts/backEnd/数据结构与算法面试宝典_文档/(6704) 15  字符串查找：为什么我最终选择了 BM 算法？.md","lastUpdated":1696682708000}'),r={name:"posts/backEnd/数据结构与算法面试宝典_文档/(6704) 15  字符串查找：为什么我最终选择了 BM 算法？.md"},E=p("",15),y=p("",38),i=p("",8),A=s("p",null,"进行第 2 轮比较时，会在 main[1] 处比较 ('b' != 'a') 失败。如下图所示：",-1),u=s("p",null,"进行第 3 轮比较时，会在 main[4] 处比较 ('d' != 'a') 失败。如下图所示：",-1),F=s("p",null,"接下来，进行第 4 轮比较时，会在 main[3] 处比较 ('b' != 'a')失败。如下图所示：",-1),D=s("p",null,[n("进行第 5 轮比较时，会在 main[4] 处比较 ('d' != 'a') 失败。凡是比较失败下标小于 4 的情况，"),s("strong",null,"都是无效比较（比如第 2 轮，第 4 轮）"),n("。因为这种比较还没有跑到 main[4] 就挂了（第 2 轮挂在 main[1]，第 4 轮挂在 main[3]）。")],-1),b=p("",5),g=s("p",null,'到这里，就可以发现 PMT 表的作用了。我们先给出 sub="ababc" 字符串的 PMT 表，如下所示：',-1),h=p("",2),C=p("",13),d=s("p",null,"那么就形成了 next 数组。既然有了这样一个数组，比较的代码就可以更改 2 个匹配失败的地方，如下图所示：",-1),B=p("",8),m=s("p",null,"我们很快可以发现，暴力的比较过程，和我们最开始的字符串暴力算法非常类似。",-1),_=s("blockquote",null,[s("p",null,"优化暴力算法的思路就是跳过一些无效比较。")],-1),q=s("p",null,[s("strong",null,"第二阶段：跳过无效比较方法 1")],-1),f=s("p",null,"那么这里是否可以跳过一些无效比较呢？（提示，借助 PMT 的思路）",-1),j=s("p",null,'很快，我们应该可以发现，在第 2 轮比较的时候，当得到已经匹配的字符串为 "ab" 时，PMT["ab"] = 0。此时，下一轮比较的时候，应该直接从 j = 0 开始。也就是如下图所示的地方：',-1),x=s("p",null,'我们可以直接把第 3 轮给跳过。所以当我们计算 PMT["ababc"] 的时候，需要依赖P MT["ab"]。这就形成了一个子问题。',-1),P=s("p",null,[s("strong",null,"第三阶段：跳过无效比较方法 2")],-1),S=s("p",null,[n("首先我们看一种"),s("strong",null,"运气好"),n("的情况：")],-1),T=p("",4),v=s("p",null,"但是，如果存在这种更长的情况。导致的结果就是：绿色线框中的内容肯定是相等的。",-1),M=s("p",null,'如果绿色线框中的内容相等，那么 "abab" 的前后缀的最长匹配长度就是 3。这样与我们给定的条件矛盾。',-1),k=s("p",null,[n("实际上，就算是"),s("strong",null,"运气差"),n(" 的时候，我们也只需要："),s("strong",null,"直接延伸一位就可以了"),n("。这种情况也是可以用完全一样的反证法来证明。那么如下图所示，我们可以把第 1 轮直接跳过。")],-1),w=p("",4),Q=p("",25),N=s("p",null,"这里我们需要给出两个定义：",-1),V=s("ul",null,[s("li",null,[s("p",null,[n("匹配失败时，当 i 停住不动的时候，称为一个"),s("strong",null,"失配点；")])]),s("li",null,[s("p",null,"当遇到一个失配点时，j 会往回跑，那么会有不同的往回跑的步数。")])],-1),L=s("p",null,"那么时间复杂度可以写成如下：O(N + sum(每个失配点 x 每个失配点j往回跑的次数))。那么最差情况如下图所示：",-1),H=s("p",null,"此时失配点只有 N / M 个，每次失配之后，j 要往回跑 M 次。所以最差情况下时间复杂度为 O(N + M)，而空间复杂度为 O(M)。",-1),K=s("h4",{id:"kmp-的优化",tabindex:"-1"},[n("KMP 的优化 "),s("a",{class:"header-anchor",href:"#kmp-的优化","aria-label":'Permalink to "KMP 的优化"'},"​")],-1),R=s("p",null,"相信你已经理解了前面介绍的 PMT 对暴力算法进行优化的原理，其核心就是跳过无效地比较。那么，我们再看一下，是不是可以在 KMP 的基础上跳过更多的无效比较呢？",-1),G=s("p",null,"假设有如下比较失败的情况：",-1),I=s("p",null,"我们已经跳过了比较失败的情况，不过可以发现，每次回退，其实都是反复地用 'b' 和' c' 字符进行比较。实际这里上可以进行如下优化：",-1),W=p("",7),O=s("p",null,[n("实际上，我们肉眼可见的是，"),s("strong",null,"字符 'c' 并不出现在 sub 字符串"),n("，所以我们没有必要一直回退。一种更好的办法是：将 sub 字符串推到 'c' 字符的后面。")],-1),X=p("",7),J=s("p",null,[n("首先比较 'S' != 'E'，那么需要把 sub 字符串移动到 'S' 的后面。因为 'S' 从来没有出现在 sub 字符串，所以 'S' 就是一个"),s("strong",null,"坏字符"),n("。")],-1),Y=s("p",null,[n("注意："),s("strong",null,"坏字符"),n(" 指的是"),s("strong",null,"匹配失败"),n("的 main 字符串中对应的那个字符，而不是说没有在 sub 字符串里面出现的字符。")],-1),U=s("h5",{id:"_2-第-2-步",tabindex:"-1"},[n("2. 第 2 步 "),s("a",{class:"header-anchor",href:"#_2-第-2-步","aria-label":'Permalink to "2. 第 2 步"'},"​")],-1),Z=s("p",null,"'P' != 'E'，此时 'P' 是一个坏字符，但是出现在 sub 中。那么我们移动 sub 字符串，让两个字符串在 'P' 字符这里对齐，移动的距离为 2。",-1),z=s("p",null,[n('由第 1 步和第 2 步，可以得到一个"'),s("strong",null,"坏字符"),n('"规则：')],-1),$=s("blockquote",null,[s("p",null,"当匹配失败的时候，移动距离 = 坏字符的位置 - sub 中的上一次出现位置。")],-1),ss=s("p",null,'注意：这里"坏字符的位置"指的是坏字符在匹配失败的时候，在 sub 字符串中的下标。举 2 个例子：',-1),ns=s("p",null,"例 1：在第 1 步比较失败之后，我们移动 7 步。如下图所示：",-1),as=s("p",null,"例 2：在第 2 步比较失败之后，我们移动 4 步。如下图所示：",-1),ls=s("p",null,"当 'P' != 'E' 时，坏字符对应 sub 中的比较位置为 6，而在 sub[6] 之前出现的 'P' 字符下标为 4，所以移动距离为 6 - 4 = 2。",-1),ps=s("h5",{id:"_3-第-3-步",tabindex:"-1"},[n("3. 第 3 步 "),s("a",{class:"header-anchor",href:"#_3-第-3-步","aria-label":'Permalink to "3. 第 3 步"'},"​")],-1),os=s("p",null,"移动之后，我们依然从尾部开始比较。一直向前移动，如下图所示：",-1),es=s("p",null,[n("由于我们是从后往前进行比较，比较成功的字符串都是位于 sub 字符串的尾部（即后缀），所以可以把这些"),s("strong",null,"比较成功的后缀子串称为好后缀（good suffix）"),n("。")],-1),ts=s("p",null,'因此，"E", "LE", "PLE", "MPLE" 都是好后缀。',-1),cs=s("h5",{id:"_4-第-4-步",tabindex:"-1"},[n("4. 第 4 步 "),s("a",{class:"header-anchor",href:"#_4-第-4-步","aria-label":'Permalink to "4. 第 4 步"'},"​")],-1),rs=p("",6),Es=s("p",null,[n('2）如果已匹配字符串的"好后缀"'),s("strong",null,"出现在 sub 的头部"),n("，那么只需要重新对齐就可以了。")],-1),ys=s("p",null,"3） 如果 1）2）都不满足，那么直接跳过这段已匹配字符串。",-1),is=s("p",null,"这里我需要特别地说明一下：",-1),As=s("ul",null,[s("li",null,[s("p",null,"处理的时候，必须从 1）、2）、3）依次处理；")]),s("li",null,[s("p",null,'情况 1）只需要出现在 sub 子串中，而情况 2）中的"好后缀"必须要是 sub 字符串的前缀；')]),s("li",null,[s("p",null,'在处理情况 2）的时候，如果有很多个好后缀串，我们总是让"好后缀"更长的优先。')])],-1),us=s("p",null,"再回到例子中，看一下应该如何移动：",-1),Fs=p("",8),Ds=s("p",null,[s("strong",null,"因为没有好后缀可供使用。向后移动 6 - 4 = 2 位"),n("。")],-1),bs=s("h5",{id:"_7-第-7-步",tabindex:"-1"},[n("7. 第 7 步 "),s("a",{class:"header-anchor",href:"#_7-第-7-步","aria-label":'Permalink to "7. 第 7 步"'},"​")],-1),gs=s("p",null,"匹配成功！不过，我们在进行编辑器中的文本搜索时，实际上还会继续往后面搜索。",-1),hs=s("h4",{id:"suffix-和-prefix",tabindex:"-1"},[n("suffix 和 prefix "),s("a",{class:"header-anchor",href:"#suffix-和-prefix","aria-label":'Permalink to "suffix 和 prefix"'},"​")],-1),Cs=s("p",null,'前面我们介绍了关于坏字符的移动距离的计算，下面再看一下"好后缀规则"下的移动距离。这里需要引入两个数组，suffix 和 prefix。我们先看 suffix。',-1),ds=s("p",null,'对于 sub = "ABCABCABC" 而言，suffix[4] 表示的含义如下图所示：',-1),Bs=p("",13),ms=s("p",null,[n("匹配失败的时候，直接看 main 字符串"),s("strong",null,[n("对齐之后，"),s("strong",null,"紧接着的那个字符。比如当 'u' != 'e' 的时候，立马去看字符 'i'，我们称为"),n("Target Char")]),n("。")],-1),_s=s("p",null,"由于 sub 中不存在字符 i，所以会移动 7 步（下面我们讲这个步数的计算）。",-1),qs=s("p",null,[n("再接着比较 'n' != 's'，那么会去看"),s("strong",null,"Target Char"),n("字符 'r'，而 'r' 字符在 search 中的位置为 3。")],-1),fs=p("",11),js=p("",9);function xs(Ps,Ss,Ts,vs,Ms,ks){const a=e("Image");return t(),c("div",null,[E,l(a,{alt:"1.gif",src:"https://s0.lgstatic.com/i/image6/M00/38/73/CioPOWB5P6uAddtOAA7mSiBVGWI035.gif"}),n(),y,l(a,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image6/M00/38/73/CioPOWB5QFiAGzZHAAC2m7Ugm-M073.png"}),n(),i,l(a,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image6/M00/38/6B/Cgp9HWB5QGCAL-PeAABRB-3sg1A408.png"}),n(),A,l(a,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image6/M00/38/73/CioPOWB5QGaAREh8AABjgONJpHI860.png"}),n(),u,l(a,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image6/M00/38/6B/Cgp9HWB5QGuAX8j3AAB17551o7U749.png"}),n(),F,l(a,{alt:"Drawing 5.png",src:"https://s0.lgstatic.com/i/image6/M00/38/73/CioPOWB5QHGAcpfwAACIBm3EAW8556.png"}),n(),D,l(a,{alt:"Drawing 6.png",src:"https://s0.lgstatic.com/i/image6/M00/38/73/CioPOWB5QHaALdrWAACXBtrxa4M862.png"}),n(),b,l(a,{alt:"Drawing 7.png",src:"https://s0.lgstatic.com/i/image6/M00/38/73/CioPOWB5QICAPtTuAACqqyQ-ciM844.png"}),n(),g,l(a,{alt:"Drawing 8.png",src:"https://s0.lgstatic.com/i/image6/M00/38/6B/Cgp9HWB5QIeAV7aKAABL7SL_5OU219.png"}),n(),h,l(a,{alt:"Drawing 9.png",src:"https://s0.lgstatic.com/i/image6/M00/38/73/CioPOWB5QI2AKF-nAADJ-97QTzc223.png"}),n(),C,l(a,{alt:"Drawing 10.png",src:"https://s0.lgstatic.com/i/image6/M00/38/73/CioPOWB5QJqAfjCyAABkH6Y4HOM290.png"}),n(),d,l(a,{alt:"Drawing 11.png",src:"https://s0.lgstatic.com/i/image6/M00/38/73/CioPOWB5QKKAetH8AAJlv9cWcGE540.png"}),n(),l(a,{alt:"Drawing 12.png",src:"https://s0.lgstatic.com/i/image6/M00/38/6B/Cgp9HWB5QKeAALkDAAJVrPPGvYQ122.png"}),n(),B,l(a,{alt:"Drawing 13.png",src:"https://s0.lgstatic.com/i/image6/M00/38/73/CioPOWB5QLOAFbsEAAB2TT7CNTY592.png"}),n(),m,_,q,f,j,l(a,{alt:"Drawing 14.png",src:"https://s0.lgstatic.com/i/image6/M00/38/73/CioPOWB5QLuAC3ytAACjKtED2X4849.png"}),n(),x,P,S,l(a,{alt:"Drawing 15.png",src:"https://s0.lgstatic.com/i/image6/M00/38/6B/Cgp9HWB5QMeAS9AIAABHhoOeG5g985.png"}),n(),T,l(a,{alt:"Drawing 16.png",src:"https://s0.lgstatic.com/i/image6/M00/38/6B/Cgp9HWB5QNOAGRW5AAA-7HVC5zI425.png"}),n(),v,l(a,{alt:"Drawing 17.png",src:"https://s0.lgstatic.com/i/image6/M00/38/73/CioPOWB5QNuAJtqtAABD_6dXDFM955.png"}),n(),M,k,l(a,{alt:"Drawing 18.png",src:"https://s0.lgstatic.com/i/image6/M00/38/73/CioPOWB5QOKATZt1AABfbeG1SPU738.png"}),n(),w,l(a,{alt:"Drawing 19.png",src:"https://s0.lgstatic.com/i/image6/M00/38/73/CioPOWB5QOuALm-zAABJXyKtJGY264.png"}),n(),Q,l(a,{alt:"Drawing 20.png",src:"https://s0.lgstatic.com/i/image6/M00/38/73/CioPOWB5QP2ATikgAAH2l05J4wU268.png"}),n(),N,V,L,l(a,{alt:"Drawing 21.png",src:"https://s0.lgstatic.com/i/image6/M00/38/6B/Cgp9HWB5QQWAZrkbAAEDgTWXTyg728.png"}),n(),H,K,R,G,l(a,{alt:"Drawing 22.png",src:"https://s0.lgstatic.com/i/image6/M00/38/73/CioPOWB5QQyAQ3jiAACDRobq3aA249.png"}),n(),I,l(a,{alt:"Drawing 23.png",src:"https://s0.lgstatic.com/i/image6/M00/38/6B/Cgp9HWB5QRaAYmd1AAB7MCW-NSg749.png"}),n(),W,l(a,{alt:"Drawing 24.png",src:"https://s0.lgstatic.com/i/image6/M00/38/73/CioPOWB5QR6AZkqYAACDRobq3aA070.png"}),n(),O,l(a,{alt:"Drawing 25.png",src:"https://s0.lgstatic.com/i/image6/M00/38/6B/Cgp9HWB5QSaAFuqPAABMef1SYNI911.png"}),n(),X,l(a,{alt:"Drawing 26.png",src:"https://s0.lgstatic.com/i/image6/M00/38/6B/Cgp9HWB5QTuAAxHVAABGdtl_7Ic614.png"}),n(),J,Y,U,l(a,{alt:"Drawing 27.png",src:"https://s0.lgstatic.com/i/image6/M00/38/6B/Cgp9HWB5QUuAbJcCAABGmQa8J_A368.png"}),n(),Z,z,$,ss,ns,l(a,{alt:"Drawing 28.png",src:"https://s0.lgstatic.com/i/image6/M00/38/74/CioPOWB5QVOAAH-hAABWb2U0530631.png"}),n(),as,l(a,{alt:"Drawing 29.png",src:"https://s0.lgstatic.com/i/image6/M00/38/6B/Cgp9HWB5QVmAaw64AABgRFsWqnk546.png"}),n(),ls,ps,l(a,{alt:"Drawing 30.png",src:"https://s0.lgstatic.com/i/image6/M00/38/6B/Cgp9HWB5QWaAId0BAABGNnt_aAw360.png"}),n(),os,l(a,{alt:"2.gif",src:"https://s0.lgstatic.com/i/image6/M00/38/74/CioPOWB5QXCAayNtAARqUBiF940832.gif"}),n(),es,ts,cs,l(a,{alt:"Drawing 32.png",src:"https://s0.lgstatic.com/i/image6/M00/38/6B/Cgp9HWB5QX-AM9tFAABGlFYAmqg000.png"}),n(),rs,l(a,{alt:"Drawing 33.png",src:"https://s0.lgstatic.com/i/image6/M00/38/74/CioPOWB5QYmARtNHAAGCi8OvLlY072.png"}),n(),Es,l(a,{alt:"Drawing 34.png",src:"https://s0.lgstatic.com/i/image6/M00/38/6B/Cgp9HWB5QZ2AJntAAAGM1re0xjY259.png"}),n(),ys,l(a,{alt:"Drawing 35.png",src:"https://s0.lgstatic.com/i/image6/M00/38/74/CioPOWB5QaWACK40AAFjz2byyDg692.png"}),n(),is,As,us,l(a,{alt:"Drawing 36.png",src:"https://s0.lgstatic.com/i/image6/M00/38/6B/Cgp9HWB5QayADbP-AABsnb2-qKk052.png"}),n(),Fs,l(a,{alt:"Drawing 37.png",src:"https://s0.lgstatic.com/i/image6/M00/38/74/CioPOWB5QbyARSHQAABGLfmtWkE937.png"}),n(),Ds,bs,l(a,{alt:"Drawing 38.png",src:"https://s0.lgstatic.com/i/image6/M00/38/6B/Cgp9HWB5QdGAM3DwAABGM2GWvYg665.png"}),n(),gs,hs,Cs,ds,l(a,{alt:"Drawing 39.png",src:"https://s0.lgstatic.com/i/image6/M00/38/74/CioPOWB5QdqALgv7AAGpVfCu-Kc071.png"}),n(),Bs,l(a,{alt:"Drawing 40.png",src:"https://s0.lgstatic.com/i/image6/M00/38/6B/Cgp9HWB5QeyALQzIAAD1qwlBJsQ639.png"}),n(),ms,_s,l(a,{alt:"Drawing 41.png",src:"https://s0.lgstatic.com/i/image6/M00/38/74/CioPOWB5QfyANDuBAADvdZ_1hE0462.png"}),n(),qs,l(a,{alt:"Drawing 42.png",src:"https://s0.lgstatic.com/i/image6/M00/38/74/CioPOWB5QgOAAU_dAACZ8A8Y2do628.png"}),n(),fs,l(a,{alt:"Drawing 43.png",src:"https://s0.lgstatic.com/i/image6/M00/38/74/CioPOWB5QgyABaGxAAFjfJB6Wpo335.png"}),n(),js])}const Ns=o(r,[["render",xs]]);export{Qs as __pageData,Ns as default};
