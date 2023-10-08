import{_ as l,j as n,o as e,g as c,k as p,h as a,Q as o,s}from"./chunks/framework.4e7d56ce.js";const z=JSON.parse('{"title":"05XSS：漏洞的检测与防御","description":"","frontmatter":{},"headers":[],"relativePath":"posts/devops/Web 安全攻防之道_文档/(5973) 05  XSS：漏洞的检测与防御.md","filePath":"posts/devops/Web 安全攻防之道_文档/(5973) 05  XSS：漏洞的检测与防御.md","lastUpdated":1696682708000}'),r={name:"posts/devops/Web 安全攻防之道_文档/(5973) 05  XSS：漏洞的检测与防御.md"},i=o("",21),y=s("p",null,'图 1：设置 DVWA 安全等级为"High"',-1),g=s("p",null,"先在题目中输入前面那串测试字符串去探测下：",-1),h=s("p",null,"图 2：输入测试字符串",-1),S=s("p",null,'在网页中右击菜单，选择"检查"查看源码，直接搜索"12345"，可以看到数据的输出位置：',-1),E=o("",4),d=o("",3),_=o("",4),u=s("p",null,"图 6：成功利用< img>标签执行任意 JS 代码",-1),C=s("p",null,"返回数据如下，输入数据都被完整地解析执行。",-1),m=o("",9),A=o("",4),F=o("",6),b=o("",8),v=s("p",null,"图 11：污点分析流程",-1),X=s("p",null,"以 PHP 源码审计为例，常见的污点 source 有以下这些：",-1),k=s("p",null,"关于 XSS 常见的污点触发位置 sink 有以下这些：",-1),D=o("",14),f=s("h4",{id:"防御-dom-xss",tabindex:"-1"},[a("防御 DOM XSS "),s("a",{class:"header-anchor",href:"#防御-dom-xss","aria-label":'Permalink to "防御 DOM XSS"'},"​")],-1),q=s("p",null,"DOM XSS 是一种特殊的 XSS 类型，前面介绍的一些防御方法并不那么通用，需要根据输出位置做不同的防御方法。同样的，我整理了一份 DOM XSS 防御方案表格，供你参考。",-1),T=s("h4",{id:"httponly-cookie",tabindex:"-1"},[a("Httponly Cookie "),s("a",{class:"header-anchor",href:"#httponly-cookie","aria-label":'Permalink to "Httponly Cookie"'},"​")],-1),B=s("p",null,"如果你在 Cookie 中设置了 HttpOnly 属性，那 JavaScript 脚本将无法读取到 Cookie，这样就能防止通过 XSS 窃取 Cookie，在一定程度上能够减少 XSS 的攻击范围。",-1),P=s("p",null,"用 EditThisCookie 插件看下拉勾网的 Cookie，可以发现其中 JSESSIONID 就开启 HttpOnly。",-1),x=o("",11),M=s("p",null,"常用指令值解释如下：",-1),w=s("p",null,"之前有次测试，发现了一个 XSS 漏洞，但死活利用不成功，搞半天一直没找到原因，后来发现正是 CSP 限制了 JS 资源的加载执行。",-1),N=s("p",null,"我平时测试时喜欢使用 CSP Evaluator 插件查看网站的 CSP 设置情况。Gmail 的 CSP 设置情况如下图所示：",-1),L=s("p",null,"图 13：Gmail 的 CSP 设置",-1),V=s("p",null,"在实际测试 XSS 时，有时也需要注意下 CSP 情况，避免折腾半天也没找到 XSS 利用失败的原因。现在 Google 内部一直在大力推行 CSP，这确实是一种防御 XSS 攻击的有效办法。",-1),O=s("h3",{id:"总结",tabindex:"-1"},[a("总结 "),s("a",{class:"header-anchor",href:"#总结","aria-label":'Permalink to "总结"'},"​")],-1),I=s("p",null,"这一讲我介绍了黑盒测试和白盒测试这两种挖掘 XSS 漏洞的方法，并针对不同的 XSS 情况推荐了不同的防御方案，算是一份 XSS 漏洞修复方案指引。同时，我还介绍了一些在企业中经常用来防御 XSS 攻击的方法：HttpOnly 和 CSP。它们可以有效减少 XSS 攻击带来的危害，但不能单纯依靠它们来防御 XSS，关键还是要避免漏洞的发生。",-1),H=s("p",null,"如果你对 XSS 漏洞的防御方法还有任何疑问，欢迎留言讨论。下一讲，我将带领你踏上 SQL 注入的攻防之路。",-1);function U(j,R,J,W,Q,G){const t=n("Image");return e(),c("div",null,[i,p(t,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image2/M01/03/A3/CgpVE1_gOVSAXGS3AAFuAZ0WAc8505.png"}),a(),y,g,p(t,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image2/M01/03/A3/CgpVE1_gOWGAUjfjAAA_jQElj0I731.png"}),a(),h,S,p(t,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image2/M01/03/A3/CgpVE1_gOWmABQ9EAADPA1r9pjM688.png"}),a(),E,p(t,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image2/M01/03/A3/CgpVE1_gOhSAFncFAAD54yWg-JA197.png"}),a(),d,p(t,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image/M00/8B/CC/CgqCHl_gO6yAc_s3AAGcJQYwIUQ445.png"}),a(),_,p(t,{alt:"Drawing 5.png",src:"https://s0.lgstatic.com/i/image2/M01/03/A4/CgpVE1_gO76AVkj9AAAzp-O1rbU774.png"}),a(),u,C,p(t,{alt:"Drawing 6.png",src:"https://s0.lgstatic.com/i/image2/M01/03/A2/Cip5yF_gO8WAeDzJAAAT9ObloPA103.png"}),a(),m,p(t,{alt:"Drawing 7.png",src:"https://s0.lgstatic.com/i/image/M00/8B/CC/CgqCHl_gO9mAdRs_AABsm8OWsbs654.png"}),a(),A,p(t,{alt:"Drawing 8.png",src:"https://s0.lgstatic.com/i/image/M00/8B/C1/Ciqc1F_gO-SAWQl0AAbouv6er5w361.png"}),a(),F,p(t,{alt:"Drawing 9.png",src:"https://s0.lgstatic.com/i/image/M00/8B/CC/CgqCHl_gO_CARQ8zAARc2hmr8mY249.png"}),a(),b,p(t,{alt:"图片11.png",src:"https://s0.lgstatic.com/i/image/M00/8C/36/Ciqc1F_pfG2AJevWAAGvhSxGKxk804.png"}),a(),v,X,p(t,{alt:"图片14.png",src:"https://s0.lgstatic.com/i/image/M00/8C/36/Ciqc1F_pfHaAfNXbAADXUYehbs4744.png"}),a(),k,p(t,{alt:"图片15.png",src:"https://s0.lgstatic.com/i/image/M00/8C/41/CgqCHl_pfH-AN_QGAAE9xCbnNNc546.png"}),a(),D,p(t,{alt:"图片16.png",src:"https://s0.lgstatic.com/i/image2/M01/04/19/Cip5yF_pfJKAUVygAASq2AlxRQQ453.png"}),a(),f,q,p(t,{alt:"图片17.png",src:"https://s0.lgstatic.com/i/image2/M01/04/1A/CgpVE1_pfJ-AHUeqAAVEa4jRM4U161.png"}),a(),T,B,P,p(t,{alt:"Drawing 11.png",src:"https://s0.lgstatic.com/i/image2/M01/03/A2/Cip5yF_gPDOAXIpRAAHMIeQ0UA0465.png"}),a(),x,p(t,{alt:"图片18.png",src:"https://s0.lgstatic.com/i/image2/M01/04/1B/CgpVE1_pfKyAAExhAAdH-EdHz9I669.png"}),a(),M,p(t,{alt:"图片19.png",src:"https://s0.lgstatic.com/i/image/M00/8C/41/CgqCHl_pfQaAAj0uAAHaIttkJoE538.png"}),a(),w,N,p(t,{alt:"Drawing 12.png",src:"https://s0.lgstatic.com/i/image2/M01/03/A2/Cip5yF_gPEmAfrG1AAEbuo1t3ss905.png"}),a(),L,V,O,I,H,p(t,{alt:"Lark20201228-143535.png",src:"https://s0.lgstatic.com/i/image/M00/8C/36/Ciqc1F_pfMKAawzZAAUhtOcPIMw458.png"})])}const Y=l(r,[["render",U]]);export{z as __pageData,Y as default};
