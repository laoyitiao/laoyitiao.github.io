import{_,j as n,o as r,g as p,k as e,h as o,Q as s,s as t}from"./chunks/framework.cfb14fe0.js";const G=JSON.parse('{"title":"第13讲：用图来表达更为复杂的数据关系","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/097-数据结构精讲：从原理到实战文档/(550) 第 13 讲：用图来表达更为复杂的数据关系.md","filePath":"posts/backEnd/097-数据结构精讲：从原理到实战文档/(550) 第 13 讲：用图来表达更为复杂的数据关系.md","lastUpdated":1696682708000}'),l={name:"posts/backEnd/097-数据结构精讲：从原理到实战文档/(550) 第 13 讲：用图来表达更为复杂的数据关系.md"},i=s("",12),c=t("p",null,"再看下面这个例子，其是一个无向图的例子。我们可以看到，所有的边都是没有方向的，也就是说点和点之间的关系是对称的。无向图在生活中也是非常常见的，比如在前面提到的交通网络，上海如果能通向北京的话，那北京也是能到达上海的。",-1),h=t("p",null,"实际上有向图是比无向图更常用的图的类型。因为你可以把无向的边理解成同时由两个有向边组成。事实上我们在实现无向图的时候也经常用两条边来实现。比如说在微博上，如果你关注了 A，并且 A 也关注了你，我们就可以把你和 A 的关系看作是一条无向的边。",-1),d=t("p",null,"图的边也可以有权重。比如下图这个例子就是一个有权重的图，你可以看到 0 和 2 的边有权重 7，而 2 和 3 的边权重为 3。权重在网络关系中也很常见。比如在交通网络中，假设北京去上海的交通费用是 1000 元，而上海去武汉的交通费用是 2000 元；再比如在商品交易网络中，如果把世界上所有的商品做成一个图，商品与商品之间的交易价格定义成边，那么如果要用人民币购买口罩，则可能是 10 元人民币，但如果用人民币兑换成美元，则需要 7 元人民币。",-1),V=s("",9),g=t("ol",{start:"2"},[t("li",null,"邻接链表法")],-1),u=t("p",null,"邻接链表法则是不一样的思路了，它的核心思想是把每一个节点所指向的点给存储起来。",-1),A=t("p",null,"比如还是同样一个图 V0 - V4，如果我们用邻接链表法表达的话，则需要一个含有 5 个元素的数组，用来存储这样 5 个节点；然后每个节点所指向的点都会维护在一个链表中。比如在这个例子中，V0 指向了 V1、V4、V2 三个节点，那么在内存中就会有从 0 指向 1 接着指向 2、4 类似这样的一个链表。同理我们看 V4 指向了 V0 和 V2，则在内存中就要维护一个 4→0→2 的单向链表。",-1),m=s("",6);function k(q,T,S,b,f,B){const a=n("Image");return r(),p("div",null,[i,e(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/65/59/Cgq2xl5BVkSAWP36AAEjCn5VmzQ618.png"}),o(),c,e(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/65/59/CgpOIF5BVkSAG9MkAABexB1FVIo662.png"}),o(),h,d,e(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/65/59/Cgq2xl5BVkSAGnWEAAAW6SHyYGw159.png"}),o(),V,e(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/65/59/CgpOIF5BVkWAV0E_AABB0dqcNnI164.png"}),o(),g,u,A,e(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/65/59/Cgq2xl5BVkWALWSlAABJu_H6JdU851.png"}),o(),m])}const x=_(l,[["render",k]]);export{G as __pageData,x as default};
