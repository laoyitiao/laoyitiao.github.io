import{_ as l,j as o,o as n,g as r,k as a,h as i,Q as s,s as t}from"./chunks/framework.b3d8e22e.js";const v=JSON.parse('{"title":"服务器部署例子 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/097-数据结构精讲：从原理到实战文档/(559) 第 18讲：高并发数据结构在 Intagram 与 Twitter 中的应用.md","filePath":"posts/backEnd/097-数据结构精讲：从原理到实战文档/(559) 第 18讲：高并发数据结构在 Intagram 与 Twitter 中的应用.md","lastUpdated":1696417798000}'),_={name:"posts/backEnd/097-数据结构精讲：从原理到实战文档/(559) 第 18讲：高并发数据结构在 Intagram 与 Twitter 中的应用.md"},p=s("",17),c=t("br",null,null,-1),d=t("p",null,"这种方法非常的直观和简单，但是却有一个致命的缺点，那就是当我们改变机器数量的时候，有很多数据的哈希运算结果将会改变。这种情况发生在，当我们的服务器压力过大想要扩充服务器数量的时候；又或者是服务器数量已经很充足，公司想要节省开支而减少服务器数量的时候。",-1),h=t("br",null,null,-1),g=t("p",null,"我们来举个简单的例子看看当发生这种情况时后台的数据会有什么样的变化。",-1),u=t("br",null,null,-1),m=t("p",null,"当服务器数量还是 3 的时候，编号在前 10 的数据，经过哈希运算后保存数据的机器如下表所示：",-1),b=t("br",null,null,-1),T=t("br",null,null,-1),A=t("p",null,"如果我们需要增加一个服务器，也就是机器数量变成 4 的时候，编号在前 10 的数据，经过哈希运算后保存数据的机器如下表所示：",-1),D=t("br",null,null,-1),I=s("",9),C=s("",8),E=t("br",null,null,-1),w=t("p",null,"数据映射到环中的位置如下表所示：",-1),k=t("br",null,null,-1),P=t("br",null,null,-1),q=t("br",null,null,-1),N=t("p",null,"根据上面的算法，将所有映射好的数据按顺时针保存到相应的机器节点中，就是说将 Data 1 和 Data 2 放到 Node A 中，Data 3 和 Data 4 放到 Node B 中，Data 5 和 Data 6 放到 Node C 中。",-1),f=t("br",null,null,-1),M=t("p",null,"如果这个时候我们需要添加一个新的机器 Node D，映射到环上后的位置如下所示：",-1),S=t("br",null,null,-1),B=s("",14);function V(x,K,O,F,Q,R){const e=o("Image");return n(),r("div",null,[p,a(e,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/6D/E2/Cgq2xl5ePyKATcCBAAAzdnzmfEA225.png"}),c,d,h,g,u,m,b,a(e,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/6D/E1/CgpOIF5eP0iAK2IlAABLkmXIPwQ677.png"}),i(),T,A,D,a(e,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/6D/E2/CgpOIF5eP-qAM80jAABMtsiYhKk386.png"}),i(),I,a(e,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/6D/E2/CgpOIF5eQBqAExy4AACDJT3LYV8511.png"}),C,a(e,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/6D/E2/Cgq2xl5eQGGAbUzBAAAu3TPwDpk565.png"}),i(),E,w,k,a(e,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/6D/E2/CgpOIF5eQHOAQU7HAAB6dVZWkok346.png"}),P,a(e,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/6D/E3/Cgq2xl5eQIqAF4ytAAEEHYHBeFQ133.png"}),q,N,f,M,S,a(e,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/6D/E2/CgpOIF5eQKCAYgHhAAA34pEyWzs606.png"}),a(e,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/6D/E3/CgpOIF5eQKmACKs7AAEN1blx-Co190.png"}),B])}const y=l(_,[["render",V]]);export{v as __pageData,y as default};
