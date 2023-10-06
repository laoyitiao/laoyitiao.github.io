import{_ as e,j as l,o as i,g as r,k as o,s as t,h as a,Q as n}from"./chunks/framework.b3d8e22e.js";const K=JSON.parse('{"title":"哈希碰撞的情况 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/097-数据结构精讲：从原理到实战文档/(533) 第 07 讲：哈希碰撞的本质及解决方式.md","filePath":"posts/backEnd/097-数据结构精讲：从原理到实战文档/(533) 第 07 讲：哈希碰撞的本质及解决方式.md","lastUpdated":1696417798000}'),_={name:"posts/backEnd/097-数据结构精讲：从原理到实战文档/(533) 第 07 讲：哈希碰撞的本质及解决方式.md"},c=t("p",null,'你好，我是你的数据结构课老师蔡元楠，欢迎进入第 07 课时的内容"哈希碰撞的本质及解决方式"。',-1),g=t("p",null,"通过前两讲的学习，相信你已经清楚地理解了哈希函数的概念以及它的应用了，那么这一讲我们一起学习一下，通过哈希函数产生了哈希碰撞，应该如何处理？在学习完哈希碰撞的解决方式之后，我们就可以完整地认识哈希表这种数据结构了。最后，我会带你来了解一个哈希表的常用高级应用------BloomFilter。",-1),p=t("h3",{id:"哈希碰撞的情况",tabindex:"-1"},[a("哈希碰撞的情况 "),t("a",{class:"header-anchor",href:"#哈希碰撞的情况","aria-label":'Permalink to "哈希碰撞的情况"'},"​")],-1),d=t("p",null,[a("先来看看哈希表的定义，在概念上"),t("strong",null,"哈希表可以定义为是一个根据键（Key）而直接访问在内存中存储位置的值（Value）的数据结构"),a("。这里所说的键就是指哈希函数的输入，而这里的值并不是指哈希值，而是指我们想要保存的值。")],-1),h=t("p",null,"在现实中， 想要有一个完美的哈希函数，将输入值转换成哈希值而不产生哈希碰撞基本是不可能的，所以哈希表在通过键来访问存储位置的值的时候，是根据我们处理哈希碰撞来决定它自身操作的。那下面我们就以一个具体例子来说明一下，不同的哈希碰撞其解决方式所带来的底层存储键值对操作的差异。",-1),A=t("p",null,"我们假设存储哈希表的底层数据结构是一个大小为 3 的数组，我们还是以保存好友电话号码为例，这个哈希表的键是我们好友的名字，哈希表的值是这个好友的电话号码。刚开始的时候，因为这个数据结构并没有存储任何信息，所以数据结构内存结构图如下图所示：",-1),m=t("p",null,"假设第一个输入的键值对是（Tom：123456），表示好友的名字叫 Tom，电话号码为 123456。我们同时假设 Tom 这个字符串在通过哈希函数之后的所产生的哈希值是 0，此时可以把 123456 这个值放在以哈希值为索引的地方，内存结构如下图所示：",-1),u=n("",4),F=t("p",null,"现在我们继续输入第三个键值对（Mike：000111）到哈希表中。假设 Mike 这个输入通过哈希函数产生的哈希值还是 0，按照线性探测的方法，先来看看下一个索引为 1 的地址，它已经被使用了，所以继续往下遍历到索引为 2 的地址，发现还未被使用，此时可以把 Mike 的电话号码存放在这里，内存结构如下图所示：",-1),T=t("p",null,"这时候你已经发现了，保存键值对的数组已经满了，如果再有新的元素插入的话，就无法保存新的键值对了。一般的做法是将这个数组扩容，比如，再创建一个新的数组，其大小为原来数组大小的两倍，然后把原来数组的内容复制过去，如果采用这种做法的话，这时的内存结构图如下所示：",-1),C=t("p",null,[a("当然了，一般哈希表并不会等到这个数组满了之后再进行扩容，其实底层数据结构会维护一个叫做"),t("strong",null,"负载因子（Load Factor）"),a(" 的数据，"),t("strong",null,"负载因子可以被定义为是哈希表中保存的元素个数 / 哈希表中底层数组的大小"),a("。当这个负载因子过大时，则表示哈希表底层数组所保存的元素已经很多了，所剩下的未被使用过的数组位置会很少，同时产生哈希碰撞的概率会很高，这并不是我们想看到的。所以一般来说，在负载因子的值超过一定值的时候，底层的数组就得需要进行扩容了，像在 Java 的 JDK 中，都会把负载因子的默认值设为 0.75 （"),t("a",{href:"https://github.com/AdoptOpenJDK/openjdk-jdk11/blob/999dbd4192d0f819cb5224f26e9e7fa75ca6f289/src/java.base/share/classes/java/util/HashMap.java#L68",target:"_blank",rel:"noreferrer"},"源码地址"),a("）。")],-1),k=t("p",null,"采用这种线性探测的好处是算法非常简单，但它也有自身的缺点。因为每次遇到哈希碰撞的时候都只是往下一个元素地址检测是否有未被使用的位置存在，所以有可能会导致一种叫做**哈希聚集（Primary Clustering）**的现象。我们来看看刚刚例子的内存结构图：",-1),B=n("",6),b=t("p",null,"同样假设第一个输入的键值对是（Tom：123456），表示好友的名字为 Tom，电话号码为 123456。同时假设 Tom 这个字符串在通过哈希函数之后所产生的哈希值是 0，因为 0 这个索引位置并未使用，所以我们创建一个新的链表节点，将键值对的值保存在这个新节点中，而 0 这个索引位置的值就是指向新节点的地址，内存结构如下图所示：",-1),S=t("p",null,"紧接着，我们输入第二个键值对（Jack：456789），同时假设 Jack 这个字符串在通过哈希函数之后所产生的哈希值也是 0，而因为索引为 0 的位置已经存放一个值了，也就表示这时候产生了哈希碰撞。但是没关系，我们只需要再创建一个新的链表节点，将这个键值对的值保存在新节点中，然后将这新节点插入索引 0 位置链表的结尾，内存结构如下图所示：",-1),M=n("",4),f=t("p",null,"我们把元素经过两次哈希函数之后所对应的哈希值的位置设为 1，此时需要判断元素 c 是否在黑名单中，需要将 c 也进行两次哈希函数运算，得到的结果如下图所示：",-1),I=t("p",null,"你会发现 c 在经过哈希函数映射之后有一个哈希值对应的位置结果为 0，那就表示 c 这个元素一定不在黑名单中。此时我们再来还需要判断元素 d 是否在黑名单中，需要将 d 也进行两次哈希函数运算，得到的结果如下图所示：",-1),E=t("p",null,"你会发现 d 在经过哈希函数映射之后有两个哈希值所对应的位置结果都为 1，但是我们只能判断 d 这个元素有可能在黑名单中。所以这里存在一个误判率，也就是说即便经过 N 个哈希函数之后哈希值对应位置的结果都为 1 了，但这个元素不一定真的存在集合中。",-1),P=t("p",null,"误判率的公式如下：",-1),q=t("p",null,"其中，m 表示位数组里位的个数，n 表示已经存储在集合里的元素个数，k 表示哈希函数的个数。",-1),x=t("p",null,'OK，这节课就讲到这里啦，下一课时我将分享"哈希表在 Facebook 和 Pinterest 中的应用"，记得按时来听课哈。',-1);function J(O,V,D,N,v,j){const s=l("Image");return i(),r("div",null,[c,g,p,d,h,A,o(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/5F/AA/CgpOIF4S9uCAADN6AACBSlRvBDw274.png"}),m,o(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/5F/AA/Cgq2xl4S9uCANFsdAADjXsBokQ8872.png"}),u,o(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/5F/B3/CgpOIF4TEsCAM8n-AAFclA9vhSE668.png"}),F,o(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/5F/B4/Cgq2xl4TE0uAQnzhAAGu1jRK9CQ347.png"}),T,o(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/5F/B4/Cgq2xl4TE1qAOkLkAAH6uShz_HU909.png"}),C,k,o(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/5F/B4/Cgq2xl4TE2-AZI17AAH6uShz_HU092.png"}),B,o(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/5F/AA/CgpOIF4S9uGACi2GAACBSlRvBDw955.png"}),b,o(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/5F/B3/CgpOIF4TE8aAdSy3AAFUVqJs-ug917.png"}),S,o(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/5F/B4/Cgq2xl4TE-GAFEa7AAEb10piq9U866.png"}),M,o(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/5F/B3/CgpOIF4TFBWAB1-xAAGB73IvLoM907.png"}),f,o(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/5F/B4/CgpOIF4TFCSAJcFdAAGg_VokQZ0660.png"}),I,o(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/5F/B4/Cgq2xl4TFDCAMnWuAAH8Acfy2Nc684.png"}),E,P,o(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/5F/AA/CgpOIF4S9uKAMJj6AAAJSj-VsAw292.png"}),q,x])}const G=e(_,[["render",J]]);export{K as __pageData,G as default};
