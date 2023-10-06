import{_ as l,j as o,o as e,g as t,k as a,Q as n,s as p}from"./chunks/framework.b3d8e22e.js";const v=JSON.parse('{"title":"String 的 substring 方法 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/Java 性能优化实战 21 讲_文档/(4187) 10  案例分析：大对象复用的目标和注意点.md","filePath":"posts/backEnd/Java 性能优化实战 21 讲_文档/(4187) 10  案例分析：大对象复用的目标和注意点.md","lastUpdated":1696417798000}'),r={name:"posts/backEnd/Java 性能优化实战 21 讲_文档/(4187) 10  案例分析：大对象复用的目标和注意点.md"},c=n("",8),E=p("p",null,"如上图所示，当我们需要一个子字符串的时候，substring 生成了一个新的字符串，这个字符串通过构造函数的 Arrays.copyOfRange 函数进行构造。",-1),y=p("p",null,"这个函数在 JDK7 之后是没有问题的，但在 JDK6 中，却有着内存泄漏的风险，我们可以学习一下这个案例，来看一下大对象复用可能会产生的问题。",-1),i=n("",19),g=n("",21),d=n("",8),u=n("",24);function h(F,_,C,A,m,b){const s=o("Image");return e(),t("div",null,[c,a(s,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image/M00/40/CB/CgqCHl8zkSuAJiz1AAXioe0G9Vc058.png"}),E,y,a(s,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image/M00/40/CB/CgqCHl8zkTWAcVQ4AAEesZzLTVo509.png"}),i,a(s,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image/M00/40/CB/CgqCHl8zkWGABcIuAADyGLJaQ44758.png"}),g,a(s,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image/M00/40/C0/Ciqc1F8zkZWAKUhuAACFphHz8XU285.png"}),d,a(s,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image/M00/40/CB/CgqCHl8zkaGALD0uAADj7bx0YMY053.png"}),u])}const B=l(r,[["render",h]]);export{v as __pageData,B as default};
