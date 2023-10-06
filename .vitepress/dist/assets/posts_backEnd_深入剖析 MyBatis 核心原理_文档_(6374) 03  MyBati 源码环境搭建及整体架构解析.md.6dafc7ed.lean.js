import{_ as n,j as t,o as e,g as c,k as l,h as s,s as a,Q as o}from"./chunks/framework.b3d8e22e.js";const w=JSON.parse('{"title":"MySQL 安装与启动 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/深入剖析 MyBatis 核心原理_文档/(6374) 03  MyBati 源码环境搭建及整体架构解析.md","filePath":"posts/backEnd/深入剖析 MyBatis 核心原理_文档/(6374) 03  MyBati 源码环境搭建及整体架构解析.md","lastUpdated":1696417798000}'),r={name:"posts/backEnd/深入剖析 MyBatis 核心原理_文档/(6374) 03  MyBati 源码环境搭建及整体架构解析.md"},i=o("",5),y=o("",9),d=o("",7),E=o("",6),g=o("",7),_=o("",7),h=o("",9),A=o("",8),u=a("p",null,"git 分支示例图",-1),m=a("p",null,"最后，我打开 IDEA ，选择 Open or Import，导入 MyBatis 源码，如下图所示：",-1),v=a("p",null,"IDEA 导入选项图",-1),M=a("p",null,"导入完成之后，就可以看到 MyBatis 的源码结构，如下图所示：",-1),S=a("p",null,"MyBatis 的源码结构图",-1),b=a("h3",{id:"mybatis-架构简介",tabindex:"-1"},[s("MyBatis 架构简介 "),a("a",{class:"header-anchor",href:"#mybatis-架构简介","aria-label":'Permalink to "MyBatis 架构简介"'},"​")],-1),B=a("p",null,"完成 MyBatis 源码环境搭建之后，我再来带你分析一下 MyBatis 的架构。",-1),D=a("p",null,[s("MyBatis 分为三层架构，分别是"),a("strong",null,"基础支撑层、核心处理层"),s(" 和"),a("strong",null,"接口层"),s("，如下图所示：")],-1),C=o("",8),F=o("",7),k=o("",14),T=o("",11),L={href:"https://shenceyun.lagou.com/t/Mka",target:"_blank",rel:"noreferrer"},q=a("p",null,[a("strong",null,"《Java 工程师高薪训练营》")],-1),f=a("p",null,[s("实战训练+面试模拟+大厂内推，想要提升技术能力，进大厂拿高薪，"),a("a",{href:"https://shenceyun.lagou.com/t/Mka",target:"_blank",rel:"noreferrer"},"点击链接，提升自己"),s("！")],-1);function Q(x,P,I,j,J,V){const p=t("Image");return e(),c("div",null,[i,l(p,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image/M00/8F/DF/CgqCHmAJMb6AeZu1AAK2YtgNDxQ405.png"}),s(),y,l(p,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image/M00/8F/D4/Ciqc1GAJMc6AdFvAAAYzLYzkW_0254.png"}),s(),d,l(p,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image/M00/8F/D4/Ciqc1GAJMduAfkY2AAPds3lRaC8418.png"}),s(),E,l(p,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image2/M01/07/C5/Cip5yGAJMfmAf335AAC2sfPp2nA814.png"}),s(),g,l(p,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image2/M01/07/C5/Cip5yGAJMgWAJCDCAAIMcPd-JbI377.png"}),s(),_,l(p,{alt:"Drawing 5.png",src:"https://s0.lgstatic.com/i/image2/M01/07/C5/Cip5yGAJMgyAXZ2fAAB3LJ1AyKE309.png"}),s(),h,l(p,{alt:"Drawing 6.png",src:"https://s0.lgstatic.com/i/image/M00/8F/D4/Ciqc1GAJMhSAKlYfAAGPfec4aLQ116.png"}),s(),A,l(p,{alt:"Drawing 7.png",src:"https://s0.lgstatic.com/i/image/M00/8F/D4/Ciqc1GAJMh-AA0gYAAEnuAcnHRw585.png"}),s(),u,m,l(p,{alt:"Drawing 8.png",src:"https://s0.lgstatic.com/i/image2/M01/07/C5/Cip5yGAJMiiACTxtAAFCLhvMfwQ983.png"}),s(),v,M,l(p,{alt:"Drawing 9.png",src:"https://s0.lgstatic.com/i/image2/M01/07/C5/Cip5yGAJMjGANU2TAAHo4sj86f8952.png"}),s(),S,b,B,D,l(p,{alt:"Lark20210129-194050.png",src:"https://s0.lgstatic.com/i/image2/M01/0B/1B/CgpVE2AT9G2AXu4RAAM4svUMBPc909.png"}),s(),C,l(p,{alt:"Lark20210129-194053.png",src:"https://s0.lgstatic.com/i/image2/M01/0B/19/Cip5yGAT9HeAabOAAACw3SAaflI907.png"}),s(),F,l(p,{alt:"Lark20210129-194055.png",src:"https://s0.lgstatic.com/i/image2/M01/0B/19/Cip5yGAT9ICAItLcAAHSeuL0ugo137.png"}),s(),k,l(p,{alt:"Lark20210129-194058.png",src:"https://s0.lgstatic.com/i/image2/M01/0B/19/Cip5yGAT9JKAZRtgAAKpY4hLF6U463.png"}),s(),T,a("p",null,[a("a",L,[l(p,{alt:"1.png",src:"https://s0.lgstatic.com/i/image/M00/6D/3E/CgqCHl-s60-AC0B_AAhXSgFweBY762.png"})])]),q,f])}const N=n(r,[["render",Q]]);export{w as __pageData,N as default};
