import{_ as n,j as e,o as t,g as r,k as l,h as p,s,Q as o}from"./chunks/framework.cfb14fe0.js";const C=JSON.parse('{"title":"06分布式系统中，如何回答锁的实现原理？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/架构设计面试精讲_文档/(6055) 06  分布式系统中，如何回答锁的实现原理？.md","filePath":"posts/backEnd/架构设计面试精讲_文档/(6055) 06  分布式系统中，如何回答锁的实现原理？.md","lastUpdated":1696682708000}'),c={name:"posts/backEnd/架构设计面试精讲_文档/(6055) 06  分布式系统中，如何回答锁的实现原理？.md"},i=s("h1",{id:"_06分布式系统中-如何回答锁的实现原理",tabindex:"-1"},[p("06分布式系统中，如何回答锁的实现原理？ "),s("a",{class:"header-anchor",href:"#_06分布式系统中-如何回答锁的实现原理","aria-label":'Permalink to "06分布式系统中，如何回答锁的实现原理？"'},"​")],-1),E=s("p",null,"上一讲，我讲了分布系统的事务一致性，今天这一讲，我想带你了解分布式系统中与锁有关的面试问题。",-1),y=s("h3",{id:"案例背景",tabindex:"-1"},[p("案例背景 "),s("a",{class:"header-anchor",href:"#案例背景","aria-label":'Permalink to "案例背景"'},"​")],-1),d=s("p",null,"分布式锁是解决协调分布式系统之间，同步访问共享资源的一种方式。详细来讲：在分布式环境下，多个系统在同时操作共享资源（如写数据）时，发起操作的系统通常会通过一种方式去协调其他系统，然后获取访问权限，得到访问权限后才可以写入数据，其他系统必须等待权限释放。",-1),u=o("",21),_=o("",29),g=o("",19);function h(q,A,k,R,F,v){const a=e("Image");return t(),r("div",null,[i,E,y,d,l(a,{alt:"22.png",src:"https://s0.lgstatic.com/i/image/M00/8D/67/CgqCHl_-esuAcq7vAAFRjfl0DJE878.png"}),p(),u,l(a,{alt:"23.png",src:"https://s0.lgstatic.com/i/image/M00/8D/5C/Ciqc1F_-euqAGDKSAAMBFlwOlu0123.png"}),p(),_,l(a,{alt:"24.png",src:"https://s0.lgstatic.com/i/image2/M01/05/43/Cip5yF_-ewGAUSb5AAFrhs6QnWo499.png"}),p(),g])}const m=n(c,[["render",h]]);export{C as __pageData,m as default};
