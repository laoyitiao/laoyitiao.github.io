import{_ as o,j as e,o as t,g as c,k as l,h as s,s as n,Q as p}from"./chunks/framework.4e7d56ce.js";const b=JSON.parse('{"title":"13案例分析：多线程锁的优化","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/Java 性能优化实战 21 讲_文档/(4190) 13  案例分析：多线程锁的优化.md","filePath":"posts/backEnd/Java 性能优化实战 21 讲_文档/(4190) 13  案例分析：多线程锁的优化.md","lastUpdated":1696682708000}'),r={name:"posts/backEnd/Java 性能优化实战 21 讲_文档/(4190) 13  案例分析：多线程锁的优化.md"},E=n("h1",{id:"_13案例分析-多线程锁的优化",tabindex:"-1"},[s("13案例分析：多线程锁的优化 "),n("a",{class:"header-anchor",href:"#_13案例分析-多线程锁的优化","aria-label":'Permalink to "13案例分析：多线程锁的优化"'},"​")],-1),y=n("p",null,[s("我们在上一课时，了解到可以使用 ThreadLocal，来避免 SimpleDateFormat 在并发环境下引起的时间错乱问题。其实还有一种解决方式，就是通过对"),n("strong",null,"parse 方法"),s(" 进行加锁，也能保证日期处理类的正确运行，代码如下图（可见"),n("a",{href:"https://gitee.com/xjjdog/tuning-lagou-res/tree/master/tuning-011/design-pattern",target:"_blank",rel:"noreferrer"},"仓库"),s("）：")],-1),i=p("",16),F=p("",16),d=p("",51),C=p("",28);function h(g,B,u,A,D,k){const a=e("Image");return t(),c("div",null,[E,y,l(a,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image/M00/45/BD/Ciqc1F9DbU6AeoPsAAC8Nn863qc911.png"}),s(),i,l(a,{alt:"1.png",src:"https://s0.lgstatic.com/i/image/M00/45/E9/CgqCHl9Dl-mAHYlWAACjjjqUdwE492.png"}),s(),F,l(a,{alt:"2.png",src:"https://s0.lgstatic.com/i/image/M00/45/DE/Ciqc1F9Dl_uAUOqvAABFvlyPAbE897.png"}),s(),d,l(a,{alt:"3.png",src:"https://s0.lgstatic.com/i/image/M00/45/DE/Ciqc1F9DmBqAEgcKAABk33fmf4k676.png"}),s(),C])}const m=o(r,[["render",h]]);export{b as __pageData,m as default};
