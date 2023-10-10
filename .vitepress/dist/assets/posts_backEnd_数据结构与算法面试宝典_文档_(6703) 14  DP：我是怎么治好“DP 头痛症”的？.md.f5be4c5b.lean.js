import{_ as o,j as t,o as e,g as r,k as n,h as s,Q as p,s as l}from"./chunks/framework.cfb14fe0.js";const K=JSON.parse('{"title":"14DP：我是怎么治好“DP 头痛症”的？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/数据结构与算法面试宝典_文档/(6703) 14  DP：我是怎么治好“DP 头痛症”的？.md","filePath":"posts/backEnd/数据结构与算法面试宝典_文档/(6703) 14  DP：我是怎么治好“DP 头痛症”的？.md","lastUpdated":1696682708000}'),c={name:"posts/backEnd/数据结构与算法面试宝典_文档/(6703) 14  DP：我是怎么治好“DP 头痛症”的？.md"},E=p("",87),y=l("ul",null,[l("li",null,"如下图所示，第二种，dp[5] 可以通过 dp[3] 得到，值为 3。")],-1),i=p("",12),A=p("",64),d=p("",10),D=l("p",null,"Case 1. 找到某个位置，将 s1, s2 都切成两半，其中 s1 = x + y，而 s2 = c + d，那么我们只需要保证 x 是 c 的扰乱字符串，y 是 d 的扰乱字符串。",-1),u=p("",59),F=p("",5),g=l("h4",{id:"_2-子问题-3",tabindex:"-1"},[s("2. 子问题 "),l("a",{class:"header-anchor",href:"#_2-子问题-3","aria-label":'Permalink to "2. 子问题"'},"​")],-1),h=l("p",null,[s("通过观察最后一步，可以发现它就是在可访问点集 Y 的基础上，通过"),l("strong",null,"加入边"),s("A[n-1] ，然后生成点集 Z。如果引入更早一点的可访问点集 X，可以将点集的扩展顺序表示如下：")],-1),b=p("",22),f=l("p",null,"但是，如果按上图这样操作，就会出错。因为 A[i] = 2 被使用了两次，而题目要求只能使用一次。",-1),C=l("p",null,[s("出现这个问题的原因是"),l("strong",null,"我们无法区分旧有的数，新加入的数"),s("。使用另外一个数组标记旧有的数，新生成的数本质上就与两个集合完成迭代没有区别了。那么有什么办法可以帮助我们区分旧有的数和新生成的数呢？")],-1),m=l("p",null,"如果我们试试从大往小更新呢？从大往小更新主要是基于这样一个条件：",-1),x=l("blockquote",null,[l("p",null,"新生成的数总是要更大一些的。如果我们先让大的数加上了 A[i]，这些更大的数会放在后面，再次遍历，我们总是不会遇到这些新生成的数。")],-1),B=l("p",null,"迭代步骤如下图所示：",-1),_=p("",36),k=p("",21),q=p("",83),P=p("",5),v=p("",11);function j(T,V,N,R,X,H){const a=t("Image");return e(),r("div",null,[E,n(a,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image6/M00/37/60/CioPOWB2zBuAOaffAAB34BpuEyM913.png"}),s(),y,n(a,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image6/M00/37/60/CioPOWB2zCaAHlLsAAB8MadAE-U569.png"}),s(),i,n(a,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image6/M01/37/58/Cgp9HWB2zDKAQUFhAADATI1rcXE556.png"}),s(),A,n(a,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image6/M01/37/58/Cgp9HWB2zFWABT97AABr3D8VE1U754.png"}),s(),d,n(a,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image6/M01/37/58/Cgp9HWB2zGaANoGhAAeB2NdVgKc054.png"}),s(),D,n(a,{alt:"Drawing 5.png",src:"https://s0.lgstatic.com/i/image6/M00/37/61/CioPOWB2zGyAOitSAAeBHGBc82w657.png"}),s(),u,n(a,{alt:"1.gif",src:"https://s0.lgstatic.com/i/image6/M01/37/58/Cgp9HWB2zJmAW8HqAAm_mP67WDc578.gif"}),s(),F,n(a,{alt:"Drawing 7.png",src:"https://s0.lgstatic.com/i/image6/M00/37/61/CioPOWB2zMOAbGNlAABqNw0YfrM582.png"}),s(),g,h,n(a,{alt:"Drawing 8.png",src:"https://s0.lgstatic.com/i/image6/M01/37/58/Cgp9HWB2zMuAH3SUAABi4JG4bTk857.png"}),s(),b,n(a,{alt:"2.gif",src:"https://s0.lgstatic.com/i/image6/M00/37/61/CioPOWB2zN2Af9neAAQiPWUjU6c193.gif"}),s(),f,C,m,x,B,n(a,{alt:"3.gif",src:"https://s0.lgstatic.com/i/image6/M00/37/61/CioPOWB2zPGAEM2YAARohJntves709.gif"}),s(),_,n(a,{alt:"Drawing 11.png",src:"https://s0.lgstatic.com/i/image6/M01/37/58/Cgp9HWB2zQeANJDtAAAi-wCtZjQ178.png"}),s(),k,n(a,{alt:"Drawing 12.png",src:"https://s0.lgstatic.com/i/image6/M00/37/61/CioPOWB2zTyAErOsAACsCnIj2ck114.png"}),s(),q,n(a,{alt:"Drawing 13.png",src:"https://s0.lgstatic.com/i/image6/M00/37/61/CioPOWB2zYiAaRzEAAAr6bp4N30004.png"}),s(),P,n(a,{alt:"Drawing 14.png",src:"https://s0.lgstatic.com/i/image6/M00/37/61/CioPOWB2zZ2AJiVSAARePu3Wkh8895.png"}),s(),v])}const Q=o(c,[["render",j]]);export{K as __pageData,Q as default};
