import{_,j as s,o as n,g as l,k as e,h as o,Q as r,s as a}from"./chunks/framework.a0d18f64.js";const v=JSON.parse('{"title":"第57讲：什么是指令重排序？为什么要重排序？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/096-Java 并发编程文档/(295) 第57讲：什么是指令重排序？为什么要重排序？.md","filePath":"posts/backEnd/096-Java 并发编程文档/(295) 第57讲：什么是指令重排序？为什么要重排序？.md","lastUpdated":1696682708000}'),p={name:"posts/backEnd/096-Java 并发编程文档/(295) 第57讲：什么是指令重排序？为什么要重排序？.md"},c=r("",9),d=a("br",null,null,-1),i=a("p",null,'图中左侧是 3 行 Java 代码，右侧是这 3 行代码可能被转化成的指令。可以看出 a = 100 对应的是 Load a、Set to 100、Store a，意味着从主存中读取 a 的值，然后把值设置为 100，并存储回去，同理， b = 5 对应的是下面三行 Load b、Set to 5、Store b，最后的 a = a + 10，对应的是 Load a、Set to 110、Store a。如果你仔细观察，会发现这里有两次"Load a"和两次"Store a"，说明存在一定的重排序的优化空间。',-1),h=a("br",null,null,-1),b=a("p",null,"经过重排序之后，情况如下图所示：",-1),u=a("br",null,null,-1),m=r("",22);function S(q,f,g,P,k,C){const t=s("Image");return n(),l("div",null,[c,e(t,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/75/87/CgpOIF5vI8yAE1n_AACnC3UQ3xM235.png"}),o(),d,i,h,b,u,e(t,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/75/87/Cgq2xl5vI8yAfRpUAACP4YXZ3sg831.png"}),o(),m])}const A=_(p,[["render",S]]);export{v as __pageData,A as default};
