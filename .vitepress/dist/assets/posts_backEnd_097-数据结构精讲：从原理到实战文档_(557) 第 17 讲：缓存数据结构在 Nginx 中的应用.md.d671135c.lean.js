import{_ as o,j as r,o as a,g as i,k as n,h as s,Q as l,s as t}from"./chunks/framework.cfb14fe0.js";const G=JSON.parse('{"title":"第17讲：缓存数据结构在Nginx中的应用","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/097-数据结构精讲：从原理到实战文档/(557) 第 17 讲：缓存数据结构在 Nginx 中的应用.md","filePath":"posts/backEnd/097-数据结构精讲：从原理到实战文档/(557) 第 17 讲：缓存数据结构在 Nginx 中的应用.md","lastUpdated":1696682708000}'),_={name:"posts/backEnd/097-数据结构精讲：从原理到实战文档/(557) 第 17 讲：缓存数据结构在 Nginx 中的应用.md"},c=l("",13),p=t("p",null,"紧接着应用又访问了 B 和 C，我们按照从左到右由新到旧的顺序来表示缓存中存储的数据，如下图所示：",-1),g=t("br",null,null,-1),d=t("br",null,null,-1),h=t("p",null,"也就是说在最左边的数据 C 是我们最新放入缓存中的数据，最右边的 A 是我们最早放入缓存中的数据。",-1),u=t("br",null,null,-1),b=t("p",null,"当应用需要再次访问 A 的时候，应用不需要去硬盘中读取了，可以直接从缓存中读取，而此时的缓存如下图所示，也就是说，数据 B 变成了最早访问的数据：",-1),A=t("br",null,null,-1),m=t("br",null,null,-1),T=t("p",null,"此时，应用需要访问数据 D，而缓存中已经保存满了 3 个数据，我们必须将最老的数据剔除，也就是剔除掉 B。现在的缓存如下图所示：",-1),S=t("br",null,null,-1),k=l("",16),x=t("br",null,null,-1),C=t("p",null,"我们来再举例说明一下几个关键操作在融合了哈希表和双向链表后的时间复杂度。",-1),N=t("br",null,null,-1),f=t("p",null,"假设应用再次需要访问数据 C，我们需要先判断缓存中是否已经保存过这个数据了，此时只需要从哈希表中查看，发现 C 已经存在，通过哈希表的值我们可以直接定位到 C 节点在链表中的位置，再将这个节点移动到双向链表的链表头，这个操作的时间复杂度为 O(1)，内存图如下所示：",-1),R=t("br",null,null,-1),q=t("br",null,null,-1),B=t("p",null,"如果应用需要访问数据 B，我们还是需要判断缓存中是否已经保存过这个数据了，通过哈希表可以发现并不存在，而缓存中的数据已经满了，所以需要剔除最旧的数据 A，也就是保存在双向链表链表尾的节点。因为维护了尾节点，我们可以在 O(1) 的时间内找到它，同时将哈希表中的数据也删除掉。现在的尾节点则指向了 D，而链表头则指向了新加入的节点 B，内存如下图所示：",-1),I=t("br",null,null,-1),P=l("",11),M=t("br",null,null,-1),O=t("p",null,"根据这种思想，在插入一个字符串的时候，会按照字母顺序将每一个字母作为 Trie 树的节点保存起来。在查找字符串是否存在的时候，只需要顺着 Trie 树的根节点从上至下往下搜索便可了。当然了，Trie 树的每一个节点可以不单单保存一个字母，可以根据应用的需求来增加其他的值。",-1),D=t("br",null,null,-1),L=t("p",null,"Trie 树的应用十分广泛，比如说常见的 DNS 反向解析，也就是通过一个 IP 地址到域名的解析，同样会用到 Trie 树。因为 IP 地址从理论上，每一部分都是由 0 到 255 组成的，这里面有着相当多的共同前缀，如果使用 Trie 树来进行 DNS 反向解析的话，则可以节省大量的内存空间。",-1);function U(v,V,E,X,Q,j){const e=r("Image");return a(),i("div",null,[c,n(e,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/6B/67/Cgq2xl5Xk4OAc3vtAAAGaDEZR5A794.png"}),s(),p,g,n(e,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/6B/67/CgpOIF5Xk6mAE2MnAAAQlXcQH1g787.png"}),s(),d,h,u,b,A,n(e,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/6B/67/Cgq2xl5Xk7aAPNTKAAAQuwd5a3s766.png"}),s(),m,T,S,n(e,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/6B/67/CgpOIF5Xk7-AD7JTAAAQQU5zfcc548.png"}),s(),k,n(e,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/6B/68/Cgq2xl5Xk8mAVUdFAADFQg9YG3M766.png"}),s(),x,C,N,f,R,n(e,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/6B/67/CgpOIF5Xk9WABIaLAADAek4dhaM770.png"}),s(),q,B,I,n(e,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/6B/68/Cgq2xl5Xk-WAcjC5AAC5qnIthPY316.png"}),s(),P,n(e,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/6B/67/CgpOIF5Xk_WAbnGYAAFM21nVHHQ453.png"}),s(),M,O,D,L])}const H=o(_,[["render",U]]);export{G as __pageData,H as default};
