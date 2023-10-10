import{_ as o,j as e,o as t,g as c,k as a,h as n,Q as l,s as p}from"./chunks/framework.cfb14fe0.js";const b=JSON.parse('{"title":"18垃圾回收：释放内存，提升浏览器页面性能","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/JavaScript 核心原理精讲_文档/(6191) 18  垃圾回收：释放内存，提升浏览器页面性能.md","filePath":"posts/frontEnd/JavaScript 核心原理精讲_文档/(6191) 18  垃圾回收：释放内存，提升浏览器页面性能.md","lastUpdated":1696682708000}'),r={name:"posts/frontEnd/JavaScript 核心原理精讲_文档/(6191) 18  垃圾回收：释放内存，提升浏览器页面性能.md"},E=l("",20),y=p("p",null,"图中左边部分表示正在使用的内存空间，右边是目前闲置的内存空间。当浏览器开始进行内存的垃圾回收时，JavaScript 的 V8 引擎会将左边的对象检查一遍。如果引擎检测是存活对象，那么会复制到右边的内存空间去；如果不是存活的对象，则直接进行系统回收。当所有左边的内存里的对象没有了的时候，等再有新生代的对象产生时，上面的部分左右对调，这样来循环处理。",-1),i=p("p",null,"如果是顺序放置的那比较好处理，可以按照上面所说的处理方式。但是如果是下图这样零散的场景怎么处理呢？",-1),d=p("p",null,"图中橙色的块代表存活对象，白色地方代表未分配的内存。正常情况下，由于堆内存是连续分配的，但是也有可能出现上图的这种内存分配情况，这种零散的分配情况就造成了内存碎片，会影响比较大的内存对象的放置。",-1),h=p("p",null,"因此这里介绍一个算法 Scavenge，它主要就是解决上图中内存碎片的情况，在通过算法处理过后，内存中对象的排布都会变成下图这个排列方式，请看效果。",-1),_=l("",11),F=l("",21);function g(u,v,A,C,m,D){const s=e("Image");return t(),c("div",null,[E,a(s,{alt:"图片1.png",src:"https://s0.lgstatic.com/i/image6/M01/15/DF/Cgp9HWBFyg-AFat5AACfc1G3XGY909.png"}),n(),y,i,a(s,{alt:"图片2.png",src:"https://s0.lgstatic.com/i/image6/M01/15/DC/CioPOWBFygeAdQcpAABnNfXN7sg370.png"}),n(),d,h,a(s,{alt:"图片3.png",src:"https://s0.lgstatic.com/i/image6/M01/15/DC/CioPOWBFyf2AOkMAAABanoDBiq0058.png"}),n(),_,a(s,{alt:"图片4.png",src:"https://s0.lgstatic.com/i/image6/M00/15/DF/Cgp9HWBFye2AKyNcAABuuRzJxL4095.png"}),n(),F])}const f=o(r,[["render",g]]);export{b as __pageData,f as default};
