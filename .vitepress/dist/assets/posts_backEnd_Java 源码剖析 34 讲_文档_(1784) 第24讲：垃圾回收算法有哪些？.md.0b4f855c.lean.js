import{_ as o,j as e,o as t,g as c,k as a,Q as p,s,h as l}from"./chunks/framework.b3d8e22e.js";const q=JSON.parse('{"title":"典型回答 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/Java 源码剖析 34 讲_文档/(1784) 第24讲：垃圾回收算法有哪些？.md","filePath":"posts/backEnd/Java 源码剖析 34 讲_文档/(1784) 第24讲：垃圾回收算法有哪些？.md","lastUpdated":1696417798000}'),r={name:"posts/backEnd/Java 源码剖析 34 讲_文档/(1784) 第24讲：垃圾回收算法有哪些？.md"},E=p("",10),y=s("p",null,"当确定了对象的状态之后（存活还是死亡）接下来就是进行垃圾回收了，垃圾回收的常见算法有以下几个：",-1),i=s("ul",null,[s("li",null,[s("p",null,"标记-清除算法；")]),s("li",null,[s("p",null,"标记-复制算法；")]),s("li",null,[s("p",null,"标记-整理算法。")])],-1),u=s("p",null,[s("strong",null,"标记-清除（Mark-Sweep）算法"),l("属于最早的垃圾回收算法，它是由标记阶段和清除阶段构成的。标记阶段会给所有的存活对象做上标记，而清除阶段会把没有被标记的死亡对象进行回收。而标记的判断方法就是前面讲的引用计数算法和可达性分析算法。")],-1),F=s("p",null,"标记-清除算法的执行流程如下图所示：",-1),C=s("p",null,"从上图可以看出，标记-清除算法有一个最大的问题就是会产生内存空间的碎片化问题，也就是说标记-清除算法执行完成之后会产生大量的不连续内存，这样当程序需要分配一个大对象时，因为没有足够的连续内存而导致需要提前触发一次垃圾回收动作。",-1),d=s("p",null,[s("strong",null,"标记-复制算法"),l("是标记-清除算法的一个升级，使用它可以有效地解决内存碎片化的问题。它是指将内存分为大小相同的两块区域，每次只使用其中的一块区域，这样在进行垃圾回收时就可以直接将存活的东西复制到新的内存上，然后再把另一块内存全部清理掉。这样就不会产生内存碎片的问题了，其执行流程如下图所示：")],-1),h=s("p",null,"标记-复制的算法虽然可以解决内存碎片的问题，但同时也带来了新的问题。因为需要将内存分为大小相同的两块内存，那么内存的实际可用量其实只有原来的一半，这样此算法导致了内存的可用率大幅降低了。",-1),m=s("p",null,[s("strong",null,"标记-整理算法"),l("的诞生晚于标记-清除算法和标记-复制算法，它也是由两个阶段组成的：标记阶段和整理阶段。其中标记阶段和标记-清除算法的标记阶段一样，不同的是后面的一个阶段，标记-整理算法的后一个阶段不是直接对内存进行清除，而是把所有存活的对象移动到内存的一端，然后把另一端的所有死亡对象全部清除，执行流程图如下图所示：")],-1),A=p("",17);function g(_,D,B,b,v,w){const n=e("Image");return t(),c("div",null,[E,a(n,{alt:"image (4).png",src:"https://s0.lgstatic.com/i/image/M00/14/70/Ciqc1F7Q3giAKu5UAAClt3UMheE300.png"}),y,i,u,F,a(n,{alt:"image (5).png",src:"https://s0.lgstatic.com/i/image/M00/14/7B/CgqCHl7Q3hOAHBq0AABM8DvzlGU761.png"}),C,d,a(n,{alt:"image (6).png",src:"https://s0.lgstatic.com/i/image/M00/14/7B/CgqCHl7Q3h6ATzDEAABQETkptLk639.png"}),h,m,a(n,{alt:"image (7).png",src:"https://s0.lgstatic.com/i/image/M00/14/7B/CgqCHl7Q3ieAYV5FAABLfGQH4UE403.png"}),A])}const f=o(r,[["render",g]]);export{q as __pageData,f as default};
