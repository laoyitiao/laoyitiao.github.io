import{_ as e,j as o,o as t,g as c,k as a,Q as p,s,h as l}from"./chunks/framework.b3d8e22e.js";const O=JSON.parse('{"title":"字节码结构 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/099-深入浅出 Java 虚拟机文档/(1042) 第17讲：动手实践：从字节码看方法调用的底层实现.md","filePath":"posts/backEnd/099-深入浅出 Java 虚拟机文档/(1042) 第17讲：动手实践：从字节码看方法调用的底层实现.md","lastUpdated":1696417798000}'),i={name:"posts/backEnd/099-深入浅出 Java 虚拟机文档/(1042) 第17讲：动手实践：从字节码看方法调用的底层实现.md"},r=p("",5),E=p("",33),d=p("",21),y=s("br",null,null,-1),h=s("p",null,[l("attach 启动 Java 进程后，可以在 "),s("strong",null,"Class Browser"),l(" 菜单中查看加载的所有类信息。我们在搜索框中输入 "),s("strong",null,"InvokeDemo"),l("，找到要查看的类。")],-1),g=s("br",null,null,-1),u=s("br",null,null,-1),v=s("p",null,[s("strong",null,"@"),l(" 符号后面的，就是具体的内存地址，我们可以复制一个，然后在 "),s("strong",null,"Inspector"),l(" 视图中查看具体的属性，可以"),s("strong",null,"大体"),l("认为这就是类在方法区的具体存储。")],-1),b=s("br",null,null,-1),m=s("br",null,null,-1),_=s("p",null,[l("在 Inspector 视图中，我们找到方法相关的属性 "),s("strong",null,"_methods"),l("，可惜它无法点开，也无法查看。")],-1),k=s("br",null,null,-1),M=p("",5),C=s("br",null,null,-1),A=s("p",null,"我们可以在 Inspect 视图中看到方法所对应的内存信息，这确实是一个 Method 方法的表示。",-1),f=s("br",null,null,-1),S=s("br",null,null,-1),j=s("p",null,"相比较起来，对象就简单了，它只需要保存一个到达 Class 对象的指针即可。我们需要先从对象视图中进入，然后找到它，一步步进入 Inspect 视图。",-1),T=s("br",null,null,-1),I=s("br",null,null,-1),q=s("p",null,"由以上的这些分析，可以得出下面这张图。执行引擎想要运行某个对象的方法，需要先在栈上找到这个对象的引用，然后再通过对象的指针，找到相应的方法字节码。",-1),V=s("br",null,null,-1),L=p("",46),D=p("",17);function w(P,x,H,B,J,F){const n=o("Image");return t(),c("div",null,[r,a(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/6F/98/Cgq2xl5h7KeAAJqIAAC_nqBW9x8213.jpg"}),E,a(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/6F/98/CgpOIF5h7KeAKhUAAAFE99wUPW0675.jpg"}),d,a(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/6F/98/Cgq2xl5h7KeAVTC2AACpnNi6GE0282.jpg"}),y,h,g,a(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/6F/98/CgpOIF5h7KeAQIsAAACaFyeUVPI476.jpg"}),u,v,b,a(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/6F/98/Cgq2xl5h7KiAWuv-AAGcKB6dCE4406.jpg"}),m,_,k,a(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/6F/98/Cgq2xl5h7KiALPruAAD5Er51lCo505.jpg"}),M,a(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/6F/98/Cgq2xl5h7KiARdERAAGRPMESLnI388.jpg"}),C,A,f,a(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/6F/98/CgpOIF5h7KiAHHFPAAGXAWSStVA060.jpg"}),S,j,T,a(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/6F/98/Cgq2xl5h7KmAY-DPAAE7J_7eC4A001.jpg"}),I,q,V,a(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/6F/98/CgpOIF5h7KmAO0npAABUB89jbXE399.jpg"}),L,a(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/6F/98/Cgq2xl5h7KmAKs5YAADn6hIT-L8728.jpg"}),D])}const N=e(i,[["render",w]]);export{O as __pageData,N as default};
