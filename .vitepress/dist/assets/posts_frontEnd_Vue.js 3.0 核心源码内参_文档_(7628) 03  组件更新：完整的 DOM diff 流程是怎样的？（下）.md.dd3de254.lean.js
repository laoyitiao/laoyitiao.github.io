import{_ as o,j as e,o as t,g as c,k as a,Q as l,s,h as p}from"./chunks/framework.b3d8e22e.js";const L=JSON.parse('{"title":"同步头部节点 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/Vue.js 3.0 核心源码内参_文档/(7628) 03  组件更新：完整的 DOM diff 流程是怎样的？（下）.md","filePath":"posts/frontEnd/Vue.js 3.0 核心源码内参_文档/(7628) 03  组件更新：完整的 DOM diff 流程是怎样的？（下）.md","lastUpdated":1696417798000}'),r={name:"posts/frontEnd/Vue.js 3.0 核心源码内参_文档/(7628) 03  组件更新：完整的 DOM diff 流程是怎样的？（下）.md"},E=l("",7),y=l("",6),i=l("",8),F=l("",6),A=l("",9),D=l("",7),d=s("p",null,"此时的结果：i 是 2，e1 是 4，e2 是 3。",-1),C=s("p",null,"接着从尾部同步节点：",-1),g=s("p",null,"此时的结果：i 是 2，e1 是 2，e2 是 1，满足删除条件，因此删除子节点中的多余节点：",-1),u=l("",8),h=s("p",null,"我们还是从同步头部节点开始，用图的方式演示这一过程。",-1),B=s("p",null,"首先从头部同步节点：",-1),_=s("p",null,"同步头部节点后的结果：i 是 2，e1 是 7，e2 是 7。",-1),q=s("p",null,"接着从尾部同步节点：",-1),k=l("",10),m=s("p",null,"如果选择了 [1, 2, 4, 5] 作为递增子序列，那么在倒序遍历的过程中，遇到 5、4、2、1 不动，遇到 6、3 移动即可，如下图所示：",-1),b=l("",10),v=l("",11),x=l("",9),I=s("p",null,"可以看到新子序列中的新节点 i 被挂载，旧子序列中的节点 e 移动到了 c 节点前面，至此，我们就在已知旧子节点 DOM 结构和 vnode、新子节点 vnode 的情况下，求解出生成新子节点的 DOM 的更新、移动、删除、新增等系列操作，并且以一种较小成本的方式完成 DOM 更新。",-1),f=s("p",null,"我们知道了子节点更新调用的是 patch 方法， Vue.js 正是通过这种递归的方式完成了整个组件树的更新。",-1),S=s("p",null,"核心 diff 算法中最复杂就是求解最长递增子序列，下面我们再来详细学习一下这个算法。",-1),T=s("h4",{id:"最长递增子序列",tabindex:"-1"},[p("最长递增子序列 "),s("a",{class:"header-anchor",href:"#最长递增子序列","aria-label":'Permalink to "最长递增子序列"'},"​")],-1),w=s("p",null,'求解最长递增子序列是一道经典的算法题，多数解法是使用动态规划的思想，算法的时间复杂度是 O(n^2^)，而 Vue.js 内部使用的是维基百科提供的一套"贪心 + 二分查找"的算法，贪心算法的时间复杂度是 O(n)，二分查找的时间复杂度是 O(logn)，所以它的总时间复杂度是 O(nlogn)。',-1),j=s("p",null,"单纯地看代码并不好理解，我们用示例来看一下这个子序列的求解过程。",-1),V=s("p",null,"假设我们有这个样一个数组 arr：[2, 1, 5, 3, 6, 4, 8, 9, 7]，求解它最长递增子序列的步骤如下：",-1),M=l("",8),P=s("p",null,"从 result 最后一个元素 9 对应的索引 7 开始回溯，可以看到 p[7] = 6，p[6] = 5，p[5] = 3，p[3] = 1，所以通过对 p 的回溯，得到最终的 result 值是 [1, 3 ,5 ,6 ,7]，也就找到最长递增子序列的最终索引了。这里要注意，我们求解的是最长子序列索引值，它的每个元素其实对应的是数组的下标。对于我们的例子而言，[2, 1, 5, 3, 6, 4, 8, 9, 7] 的最长子序列是 [1, 3, 4, 8, 9]，而我们求解的 [1, 3 ,5 ,6 ,7] 就是最长子序列中元素在原数组中的下标所构成的新数组。",-1),O=s("h2",{id:"总结",tabindex:"-1"},[p("总结 "),s("a",{class:"header-anchor",href:"#总结","aria-label":'Permalink to "总结"'},"​")],-1),N=s("p",null,"这两节课我们主要分析了组件的更新流程，知道了 Vue.js 的更新粒度是组件级别的，并且 Vue.js 在 patch 某个组件的时候，如果遇到组件这类抽象节点，在某些条件下也会触发子组件的更新。",-1),G=s("p",null,"对于普通元素节点的更新，主要是更新一些属性，以及它的子节点。子节点的更新又分为多种情况，其中最复杂的情况为数组到数组的更新，内部又根据不同情况分成几个流程去 diff，遇到需要移动的情况还要去求解子节点的最长递增子序列。",-1),z=s("p",null,"整个更新过程还是利用了树的深度遍历，递归执行 patch 方法，最终完成了整个组件树的更新。",-1),R=s("p",null,"下面，我们通过一张图来更加直观感受组件的更新流程：",-1),K=s("p",null,"最后，给你留一道思考题目，我们使用 v-for 编写列表的时候 key 能用遍历索引 index 表示吗，为什么？欢迎你在留言区与我分享。",-1),H=s("blockquote",null,[s("p",null,[s("strong",null,"本节课的相关代码在源代码中的位置如下：")]),s("p",null,"packages/runtime-core/src/renderer.ts")],-1);function Q(J,Y,W,X,$,U){const n=e("Image");return t(),c("div",null,[E,a(n,{alt:"111.png",src:"https://s0.lgstatic.com/i/image/M00/33/86/CgqCHl8QHwmAHuQrAAB7807ZTzY864.png"}),y,a(n,{alt:"图片2.png",src:"https://s0.lgstatic.com/i/image/M00/32/C3/Ciqc1F8OxNCAbTueAABtqP8l5JI050.png"}),i,a(n,{alt:"图片3.png",src:"https://s0.lgstatic.com/i/image/M00/32/C3/Ciqc1F8OxN6AMzbfAACPna55Fmk255.png"}),F,a(n,{alt:"图片4.png",src:"https://s0.lgstatic.com/i/image/M00/32/C3/Ciqc1F8OxO2AffFhAACJ52ATnwQ480.png"}),A,a(n,{alt:"图片5.png",src:"https://s0.lgstatic.com/i/image/M00/32/CF/CgqCHl8OxQKAd7fjAACNTHXEkuQ335.png"}),D,a(n,{alt:"图片6.png",src:"https://s0.lgstatic.com/i/image/M00/32/C4/Ciqc1F8OxQ-ADmRcAACCSIpni8Y429.png"}),d,C,a(n,{alt:"图片7.png",src:"https://s0.lgstatic.com/i/image/M00/32/C4/Ciqc1F8OxRqANXzyAACGFb9dacI061.png"}),g,a(n,{alt:"图片8.png",src:"https://s0.lgstatic.com/i/image/M00/32/CF/CgqCHl8OxSeAMW8gAACCvYcKESo055.png"}),u,a(n,{alt:"图片9.png",src:"https://s0.lgstatic.com/i/image/M00/32/C4/Ciqc1F8OxT6AVycJAAClkNghf-k681.png"}),h,B,a(n,{alt:"图片10.png",src:"https://s0.lgstatic.com/i/image/M00/32/CF/CgqCHl8OxUyAaCXvAAC6Lv79hSs090.png"}),_,q,a(n,{alt:"图片11.png",src:"https://s0.lgstatic.com/i/image/M00/32/C4/Ciqc1F8OxVeAYV_ZAADCIt6XIHI609.png"}),k,a(n,{alt:"图片12.png",src:"https://s0.lgstatic.com/i/image/M00/32/CF/CgqCHl8OxWOAKRnGAAAzjDtkQJI201.png"}),m,a(n,{alt:"图片13.png",src:"https://s0.lgstatic.com/i/image/M00/32/CF/CgqCHl8OxW6APB5gAAAshOjdgMY518.png"}),b,a(n,{alt:"图片14.png",src:"https://s0.lgstatic.com/i/image/M00/32/D0/CgqCHl8OxciAQJ6GAADhf7zD47s944.png"}),v,a(n,{alt:"图片15.png",src:"https://s0.lgstatic.com/i/image/M00/32/D0/CgqCHl8OxdeAVdPEAAEh9JAOZ_E654.png"}),x,a(n,{alt:"图片16.png",src:"https://s0.lgstatic.com/i/image/M00/32/C5/Ciqc1F8OxeiAIp0WAAFBcsdATCI981.png"}),I,f,S,T,w,j,V,a(n,{alt:"序列_05.gif",src:"https://s0.lgstatic.com/i/image/M00/32/DC/Ciqc1F8O342ATpU7AMfwii64x74028.gif"}),M,a(n,{alt:"图片17.png",src:"https://s0.lgstatic.com/i/image/M00/32/C5/Ciqc1F8OxgOALDcQAABERFRRNqo370.png"}),P,O,N,G,z,R,a(n,{alt:"1.png",src:"https://s0.lgstatic.com/i/image/M00/32/CB/Ciqc1F8OyzuASuJ7AAHSjr5SVlc999.png"}),K,H])}const ss=o(r,[["render",Q]]);export{L as __pageData,ss as default};
