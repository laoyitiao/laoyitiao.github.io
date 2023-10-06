import{_ as p,j as l,o,g as e,k as n,s,Q as t}from"./chunks/framework.b3d8e22e.js";const M=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/096-Java 并发编程文档/(269) 第31讲：为什么 Map 桶中超过 8 个才转为红黑树？.md","filePath":"posts/backEnd/096-Java 并发编程文档/(269) 第31讲：为什么 Map 桶中超过 8 个才转为红黑树？.md","lastUpdated":1696417798000}'),c={name:"posts/backEnd/096-Java 并发编程文档/(269) 第31讲：为什么 Map 桶中超过 8 个才转为红黑树？.md"},r=s("p",null,"这一课时我们主要讲解为什么 Map 的桶中超过 8 个才转为红黑树？",-1),E=s("p",null,'JDK 1.8 的 HashMap 和 ConcurrentHashMap 都有这样一个特点：最开始的 Map 是空的，因为里面没有任何元素，往里放元素时会计算 hash 值，计算之后，第 1 个 value 会首先占用一个桶（也称为槽点）位置，后续如果经过计算发现需要落到同一个桶中，那么便会使用链表的形式往后延长，俗称"拉链法"，如图所示：',-1),y=s("p",null,"图中，有的桶是空的， 比如第 4 个；有的只有一个元素，比如 1、3、6；有的就是刚才说的拉链法，比如第 2 和第 5 个桶。",-1),i=s("p",null,"当链表长度大于或等于阈值（默认为 8）的时候，如果同时还满足容量大于或等于 MIN_TREEIFY_CAPACITY（默认为 64）的要求，就会把链表转换为红黑树。同样，后续如果由于删除或者其他原因调整了大小，当红黑树的节点小于或等于 6 个以后，又会恢复为链表形态。",-1),h=s("p",null,"让我们回顾一下 HashMap 的结构示意图：",-1),d=t("",14),F=s("p",null,"事实上，链表长度超过 8 就转为红黑树的设计，更多的是为了防止用户自己实现了不好的哈希算法时导致链表过长，从而导致查询效率低，而此时转为红黑树更多的是一种保底策略，用来保证极端情况下查询的效率。",-1),u=s("p",null,"通常如果 hash 算法正常的话，那么链表的长度也不会很长，那么红黑树也不会带来明显的查询时间上的优势，反而会增加空间负担。所以通常情况下，并没有必要转为红黑树，所以就选择了概率非常小，小于千万分之一概率，也就是长度为 8 的概率，把长度 8 作为转化的默认阈值。",-1),C=s("p",null,"所以如果平时开发中发现 HashMap 或是 ConcurrentHashMap 内部出现了红黑树的结构，这个时候往往就说明我们的哈希算法出了问题，需要留意是不是我们实现了效果不好的 hashCode 方法，并对此进行改进，以便减少冲突。",-1);function g(_,D,A,m,v,b){const a=l("Image");return o(),e("div",null,[r,E,n(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/61/9A/Cgq2xl4ei_2APvpyAAEKlgaezQg247.png"}),y,i,h,n(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/61/9A/CgpOIF4ejCmAPqZMAAGZw5NzqtE067.png"}),d,n(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/61/9B/Cgq2xl4ejLSAWTp3AADocHClqJ0548.png"}),F,u,C])}const k=p(c,[["render",g]]);export{M as __pageData,k as default};
