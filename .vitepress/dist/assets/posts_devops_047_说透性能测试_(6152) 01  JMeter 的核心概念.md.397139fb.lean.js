import{_ as e,j as o,o as t,g as r,k as p,h as a,Q as l,s}from"./chunks/framework.cfb14fe0.js";const R=JSON.parse('{"title":"01JMeter的核心概念","description":"","frontmatter":{},"headers":[],"relativePath":"posts/devops/047_说透性能测试/(6152) 01  JMeter 的核心概念.md","filePath":"posts/devops/047_说透性能测试/(6152) 01  JMeter 的核心概念.md","lastUpdated":1696682708000}'),c={name:"posts/devops/047_说透性能测试/(6152) 01  JMeter 的核心概念.md"},i=l("",13),y=s("p",null,"图 1：设置图 A",-1),E=l("",15),d=s("p",null,"图 3：设置图 C",-1),h=s("p",null,"我们来通过运行展示一下。",-1),_=s("p",null,"图 4：生成线程数",-1),g=s("p",null,"我使用了监听器中的用表格查看结果插件。通过这组数据可以看到，每秒产生了 2 个新的线程，合计在 5 秒内完成。",-1),u=s("h3",{id:"组件和元件",tabindex:"-1"},[a("组件和元件 "),s("a",{class:"header-anchor",href:"#组件和元件","aria-label":'Permalink to "组件和元件"'},"​")],-1),A=s("p",null,"了解了线程、循环和 Ramp-Up，接着来聊聊组件和元件。",-1),T=s("h4",{id:"组件和元件的关系",tabindex:"-1"},[a("组件和元件的关系 "),s("a",{class:"header-anchor",href:"#组件和元件的关系","aria-label":'Permalink to "组件和元件的关系"'},"​")],-1),m=s("p",null,"要解释组件首先就要说元件。我们看图 4 中的 HTTP 请求，其实这就是一个实际的元件。同样作为元件的还可以是 JDBC 请求、Java 请求等，这一类元件我们统一称为取样器，也就是组件。我用一个示意图来表示组件和元件的关系：",-1),F=l("",7),C=s("p",null,"图 6：组件顺序",-1),M=s("p",null,"搞懂了组件顺序，你在测试前准备脚本生成参数化数据时，就可以在前置处理器中寻找相关元件；在要提取接口返回的数据，就可以在后置处理器中寻找相关插件，而不是在其他地方寻找数据，浪费时间。",-1),v=s("p",null,"我经常看到有的测试人员在需要在后置处理器中使用 BeanShell PostProcesor 的时候，错误地用了前置处理器中的 Beanshell PreProcessor，导致系统报错，无法实现预期的功能，甚至是测试无法进行下去。",-1),J=s("h4",{id:"元件作用域",tabindex:"-1"},[a("元件作用域 "),s("a",{class:"header-anchor",href:"#元件作用域","aria-label":'Permalink to "元件作用域"'},"​")],-1),b=s("p",null,"以上说的都是组件相关的东西，这里就来看看元件作用域。我们先来看一张图：",-1),D=s("p",null,"图 7：结果树 1、2、3",-1),P=s("p",null,'在图中可以看到，我在不同位置放了 3 个一样的元件"查看结果树"（为了方便区分，我分别标记了 1、2、3）。运行后发现，查看结果树 1（图 8）里面显示了 HTTP1 和 HTTP2，而插件结果树 2 里只有 HTTP1，查看结果树 3 里面只有 HTTP2。',-1),B=l("",11),k=l("",9);function S(f,j,q,H,V,x){const n=o("Image");return t(),r("div",null,[i,p(n,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image2/M01/04/AF/Cip5yF_1Ha-ADn1PAABkFOXpDRg902.png"}),a(),y,p(n,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image2/M01/04/B1/CgpVE1_1HbmATgMeAACJsBol0Mc903.png"}),a(),E,p(n,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image2/M01/04/AF/Cip5yF_1HcyABzDxAABletIULYA933.png"}),a(),d,h,p(n,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image2/M01/04/B1/CgpVE1_1HdKAeBVLAAG5WhpVanI202.png"}),a(),_,g,u,A,T,m,p(n,{alt:"图片2.png",src:"https://s0.lgstatic.com/i/image/M00/8C/F5/CgqCHl_2gVaAEnd0AACHVOgTgLo426.png"}),a(),F,p(n,{alt:"图片1.png",src:"https://s0.lgstatic.com/i/image/M00/8C/F5/CgqCHl_2gWOAcj4PAADsoHDndjA019.png"}),a(),C,M,v,J,b,p(n,{alt:"Drawing 5.png",src:"https://s0.lgstatic.com/i/image2/M01/04/AF/Cip5yF_1He-ALsdzAACx-Dpj8Qo799.png"}),a(),D,P,p(n,{alt:"Drawing 6.png",src:"https://s0.lgstatic.com/i/image2/M01/04/B1/CgpVE1_1HfyAP0epAAA7IET5M00253.png"}),a(),B,p(n,{alt:"图片3.png",src:"https://s0.lgstatic.com/i/image/M00/8C/F6/CgqCHl_2gXGAX4J2AAB_Vvcgr6E022.png"}),a(),k])}const N=e(c,[["render",S]]);export{R as __pageData,N as default};
