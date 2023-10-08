import{_ as n,j as r,o as i,g as l,k as o,h as t,Q as e,s}from"./chunks/framework.a0d18f64.js";const N=JSON.parse('{"title":"第07讲：哈希碰撞的本质及解决方式","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/097-数据结构精讲：从原理到实战文档/(533) 第 07 讲：哈希碰撞的本质及解决方式.md","filePath":"posts/backEnd/097-数据结构精讲：从原理到实战文档/(533) 第 07 讲：哈希碰撞的本质及解决方式.md","lastUpdated":1696682708000}'),_={name:"posts/backEnd/097-数据结构精讲：从原理到实战文档/(533) 第 07 讲：哈希碰撞的本质及解决方式.md"},c=e("",7),p=s("p",null,"假设第一个输入的键值对是（Tom：123456），表示好友的名字叫 Tom，电话号码为 123456。我们同时假设 Tom 这个字符串在通过哈希函数之后的所产生的哈希值是 0，此时可以把 123456 这个值放在以哈希值为索引的地方，内存结构如下图所示：",-1),g=e("",4),h=s("p",null,"现在我们继续输入第三个键值对（Mike：000111）到哈希表中。假设 Mike 这个输入通过哈希函数产生的哈希值还是 0，按照线性探测的方法，先来看看下一个索引为 1 的地址，它已经被使用了，所以继续往下遍历到索引为 2 的地址，发现还未被使用，此时可以把 Mike 的电话号码存放在这里，内存结构如下图所示：",-1),d=s("p",null,"这时候你已经发现了，保存键值对的数组已经满了，如果再有新的元素插入的话，就无法保存新的键值对了。一般的做法是将这个数组扩容，比如，再创建一个新的数组，其大小为原来数组大小的两倍，然后把原来数组的内容复制过去，如果采用这种做法的话，这时的内存结构图如下所示：",-1),A=s("p",null,[t("当然了，一般哈希表并不会等到这个数组满了之后再进行扩容，其实底层数据结构会维护一个叫做"),s("strong",null,"负载因子（Load Factor）"),t(" 的数据，"),s("strong",null,"负载因子可以被定义为是哈希表中保存的元素个数 / 哈希表中底层数组的大小"),t("。当这个负载因子过大时，则表示哈希表底层数组所保存的元素已经很多了，所剩下的未被使用过的数组位置会很少，同时产生哈希碰撞的概率会很高，这并不是我们想看到的。所以一般来说，在负载因子的值超过一定值的时候，底层的数组就得需要进行扩容了，像在 Java 的 JDK 中，都会把负载因子的默认值设为 0.75 （"),s("a",{href:"https://github.com/AdoptOpenJDK/openjdk-jdk11/blob/999dbd4192d0f819cb5224f26e9e7fa75ca6f289/src/java.base/share/classes/java/util/HashMap.java#L68",target:"_blank",rel:"noreferrer"},"源码地址"),t("）。")],-1),m=s("p",null,"采用这种线性探测的好处是算法非常简单，但它也有自身的缺点。因为每次遇到哈希碰撞的时候都只是往下一个元素地址检测是否有未被使用的位置存在，所以有可能会导致一种叫做**哈希聚集（Primary Clustering）**的现象。我们来看看刚刚例子的内存结构图：",-1),u=e("",6),T=s("p",null,"同样假设第一个输入的键值对是（Tom：123456），表示好友的名字为 Tom，电话号码为 123456。同时假设 Tom 这个字符串在通过哈希函数之后所产生的哈希值是 0，因为 0 这个索引位置并未使用，所以我们创建一个新的链表节点，将键值对的值保存在这个新节点中，而 0 这个索引位置的值就是指向新节点的地址，内存结构如下图所示：",-1),F=s("p",null,"紧接着，我们输入第二个键值对（Jack：456789），同时假设 Jack 这个字符串在通过哈希函数之后所产生的哈希值也是 0，而因为索引为 0 的位置已经存放一个值了，也就表示这时候产生了哈希碰撞。但是没关系，我们只需要再创建一个新的链表节点，将这个键值对的值保存在新节点中，然后将这新节点插入索引 0 位置链表的结尾，内存结构如下图所示：",-1),C=e("",4),b=s("p",null,"我们把元素经过两次哈希函数之后所对应的哈希值的位置设为 1，此时需要判断元素 c 是否在黑名单中，需要将 c 也进行两次哈希函数运算，得到的结果如下图所示：",-1),k=s("p",null,"你会发现 c 在经过哈希函数映射之后有一个哈希值对应的位置结果为 0，那就表示 c 这个元素一定不在黑名单中。此时我们再来还需要判断元素 d 是否在黑名单中，需要将 d 也进行两次哈希函数运算，得到的结果如下图所示：",-1),S=s("p",null,"你会发现 d 在经过哈希函数映射之后有两个哈希值所对应的位置结果都为 1，但是我们只能判断 d 这个元素有可能在黑名单中。所以这里存在一个误判率，也就是说即便经过 N 个哈希函数之后哈希值对应位置的结果都为 1 了，但这个元素不一定真的存在集合中。",-1),B=s("p",null,"误判率的公式如下：",-1),f=s("p",null,"其中，m 表示位数组里位的个数，n 表示已经存储在集合里的元素个数，k 表示哈希函数的个数。",-1),M=s("p",null,'OK，这节课就讲到这里啦，下一课时我将分享"哈希表在 Facebook 和 Pinterest 中的应用"，记得按时来听课哈。',-1);function q(I,P,E,x,V,J){const a=r("Image");return i(),l("div",null,[c,o(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/5F/AA/CgpOIF4S9uCAADN6AACBSlRvBDw274.png"}),t(),p,o(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/5F/AA/Cgq2xl4S9uCANFsdAADjXsBokQ8872.png"}),t(),g,o(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/5F/B3/CgpOIF4TEsCAM8n-AAFclA9vhSE668.png"}),t(),h,o(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/5F/B4/Cgq2xl4TE0uAQnzhAAGu1jRK9CQ347.png"}),t(),d,o(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/5F/B4/Cgq2xl4TE1qAOkLkAAH6uShz_HU909.png"}),t(),A,m,o(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/5F/B4/Cgq2xl4TE2-AZI17AAH6uShz_HU092.png"}),t(),u,o(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/5F/AA/CgpOIF4S9uGACi2GAACBSlRvBDw955.png"}),t(),T,o(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/5F/B3/CgpOIF4TE8aAdSy3AAFUVqJs-ug917.png"}),t(),F,o(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/5F/B4/Cgq2xl4TE-GAFEa7AAEb10piq9U866.png"}),t(),C,o(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/5F/B3/CgpOIF4TFBWAB1-xAAGB73IvLoM907.png"}),t(),b,o(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/5F/B4/CgpOIF4TFCSAJcFdAAGg_VokQZ0660.png"}),t(),k,o(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/5F/B4/Cgq2xl4TFDCAMnWuAAH8Acfy2Nc684.png"}),t(),S,B,o(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/5F/AA/CgpOIF4S9uKAMJj6AAAJSj-VsAw292.png"}),t(),f,M])}const O=n(_,[["render",q]]);export{N as __pageData,O as default};
