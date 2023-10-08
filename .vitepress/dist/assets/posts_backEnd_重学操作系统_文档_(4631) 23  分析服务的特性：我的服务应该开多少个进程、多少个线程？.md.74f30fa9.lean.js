import{_ as i,j as s,o as l,g as _,k as p,h as t,Q as o,s as a}from"./chunks/framework.4e7d56ce.js";const N=JSON.parse('{"title":"23分析服务的特性：我的服务应该开多少个进程、多少个线程？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/重学操作系统_文档/(4631) 23  分析服务的特性：我的服务应该开多少个进程、多少个线程？.md","filePath":"posts/backEnd/重学操作系统_文档/(4631) 23  分析服务的特性：我的服务应该开多少个进程、多少个线程？.md","lastUpdated":1696682708000}'),r={name:"posts/backEnd/重学操作系统_文档/(4631) 23  分析服务的特性：我的服务应该开多少个进程、多少个线程？.md"},n=o("",9),c=a("p",null,[t("很多情况下我们没法使用 DMA，比如说你想把一个数组拷贝到另一个数组内，执行的 memcpy 函数内部实现就是一个个 byte 拷贝，这种情况也是一种"),a("strong",null,"CPU 密集的操作"),t("。")],-1),d=a("p",null,"可见，区分是计算密集型还是 I/O 密集型这件事比较复杂。按说查询数据库是一件 I/O 密集型的事情，但是如果存储设备足够好，比如用了最好的固态硬盘阵列，I/O 速度很快，反而瓶颈会在计算上（对缓存的搜索耗时成为主要部分）。因此，需要一些可衡量指标，来帮助我们确认应用的特性。",-1),P=a("h3",{id:"衡量-cpu-的工作情况的指标",tabindex:"-1"},[t("衡量 CPU 的工作情况的指标 "),a("a",{class:"header-anchor",href:"#衡量-cpu-的工作情况的指标","aria-label":'Permalink to "衡量 CPU 的工作情况的指标"'},"​")],-1),C=a("p",null,"我们先来看一下 CPU 关联的指标。如下图所示：CPU 有 2 种状态，忙碌和空闲。此外，CPU 的时间还有一种被偷走的情况。",-1),h=o("",6),g=o("",3),U=o("",8),I=o("",7),u=a("p",null,"上图中是磁盘当前的读写速度以及排行较靠前的进程情况。",-1),A=a("p",null,[t("另外，如果磁盘空间不足，可以用"),a("code",null,"df"),t("指令：")],-1),m=o("",24);function T(O,f,b,q,S,k){const e=s("Image");return l(),_("div",null,[n,p(e,{alt:"5.png",src:"https://s0.lgstatic.com/i/image/M00/71/6A/Ciqc1F--MyKAQSfQAABs29xFyFQ392.png"}),t(),c,d,P,C,p(e,{alt:"7.png",src:"https://s0.lgstatic.com/i/image/M00/71/6A/Ciqc1F--MyyAGUJkAACsJU_MgVg506.png"}),t(),h,p(e,{alt:"2.png",src:"https://s0.lgstatic.com/i/image/M00/71/76/CgqCHl--MzuAVvG-AAMVu_JwSyA231.png"}),t(),g,p(e,{alt:"3.png",src:"https://s0.lgstatic.com/i/image/M00/71/6A/Ciqc1F--M0uAGZ1pAAmKNbPhB9A282.png"}),t(),U,p(e,{alt:"4.png",src:"https://s0.lgstatic.com/i/image/M00/71/76/CgqCHl--M1aALjSiAALKG4QzX18230.png"}),t(),I,p(e,{alt:"1.png",src:"https://s0.lgstatic.com/i/image/M00/71/76/CgqCHl--M2OAJezyAAkRwbdJVmk356.png"}),t(),u,A,p(e,{alt:"6.png",src:"https://s0.lgstatic.com/i/image/M00/71/76/CgqCHl--M22AY0VPAAaPk8du-CY254.png"}),t(),m])}const V=i(r,[["render",T]]);export{N as __pageData,V as default};
