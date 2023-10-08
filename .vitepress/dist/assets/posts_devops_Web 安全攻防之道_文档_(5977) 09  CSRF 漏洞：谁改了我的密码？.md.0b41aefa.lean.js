import{_ as o,j as e,o as t,g as c,k as l,h as n,s,Q as p}from"./chunks/framework.a0d18f64.js";const J=JSON.parse('{"title":"09CSRF漏洞：谁改了我的密码？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/devops/Web 安全攻防之道_文档/(5977) 09  CSRF 漏洞：谁改了我的密码？.md","filePath":"posts/devops/Web 安全攻防之道_文档/(5977) 09  CSRF 漏洞：谁改了我的密码？.md","lastUpdated":1696682708000}'),r={name:"posts/devops/Web 安全攻防之道_文档/(5977) 09  CSRF 漏洞：谁改了我的密码？.md"},E=s("h1",{id:"_09csrf漏洞-谁改了我的密码",tabindex:"-1"},[n("09CSRF漏洞：谁改了我的密码？ "),s("a",{class:"header-anchor",href:"#_09csrf漏洞-谁改了我的密码","aria-label":'Permalink to "09CSRF漏洞：谁改了我的密码？"'},"​")],-1),y=s("p",null,'上一讲我介绍了 SQL 注入这种常见而又危害严重的漏洞，相信你对它已经有了一定的认识。这一讲我来介绍下被 OWASP 组织列为十大 Web 漏洞威胁之一的 CSRF（跨站请求伪造）漏洞。因为有"跨站"二字，不少人将它与 XSS 混为一谈，但其实它们的原理并不相同。',-1),i=s("p",null,"本讲我会从 CSRF 漏洞的产生原理、攻击手法、检测方法和防御手段这 4 个方面出发，全面地介绍 CSRF 漏洞，带你领略 CSRF 的危害，并能够自主挖掘和防御此类漏洞。",-1),F=s("h3",{id:"什么是-csrf-漏洞",tabindex:"-1"},[n("什么是 CSRF 漏洞 "),s("a",{class:"header-anchor",href:"#什么是-csrf-漏洞","aria-label":'Permalink to "什么是 CSRF 漏洞"'},"​")],-1),u=s("p",null,"CSRF（Cross Site Request Forgery，跨站请求伪造，也叫 XSRF）漏洞是由于未校验请求来源，导致攻击者可在第三方站点发起 HTTP 请求，并以受害者的目标网站登录态（cookie、session 等）请求，从而执行一些敏感的业务功能操作，比如更改密码、修改个人资料、关注好友。",-1),d=s("p",null,"用张时序图来解释会更清楚一些，我把常用的攻击方式也画了上去，如下图所示：",-1),h=s("p",null,"图 1：CSRF 跨站请求伪造原理",-1),C=s("p",null,"从以上可以得知，CSRF 比较依赖业务功能。有时虽然存在 CSRF 但并没有实际危害，也不能算是真正意义上的 CSRF 漏洞。比如常规的登录账号功能，如果你不知道密码就无法登录，而如果知道了，那还需要构造 CSRF 请求吗？如果是为了实现多次登录失败，令目标账号暂时无法登录，那么也不需要用 CSRF。",-1),g=s("p",null,"如果是一些发消息、发微博的功能，那同样可以产生蠕虫效果，新浪和腾讯微博就曾发生过好多次此类 CSRF 蠕虫漏洞。",-1),_=p("",8),A=s("p",null,"图 3：DVWA CSRF 题目",-1),f=s("p",null,[n("输入密码提交的同时抓包。此处我直接用 Chrome 的 Network 功能（在《"),s("a",{href:"https://kaiwu.lagou.com/course/courseInfo.htm?courseId=585#/detail/pc?id=5968",target:"_blank",rel:"noreferrer"},"01 | 武器库：常用的渗透测试工具"),n("》中介绍过）：")],-1),S=p("",5),D=p("",5),m=p("",25),k=s("p",null,"图 7：BurpSuite 的 CSRF PoC 生成功能",-1),b=s("h3",{id:"防御-csrf",tabindex:"-1"},[n("防御 CSRF "),s("a",{class:"header-anchor",href:"#防御-csrf","aria-label":'Permalink to "防御 CSRF"'},"​")],-1),q=s("p",null,"防御 CSRF 的关键思路就是令请求参数不可预测，所以常用的方法就是在敏感操作请求上使用 POST 代替 GET，然后添加验证码或 Token 进行验证。",-1),v=s("p",null,"这里不推荐 referer（即请求头中的来源地址）限制方法，因为通过 javascript:// 伪协议就能以空 referer 的形式发起请求，很容易绕过限制。如果你直接禁止空 referer，一些移动 App 上的请求又可能无法完成，因为移动 App 上的 http/https 请求经常是空 referer。",-1),B=s("h4",{id:"验证码",tabindex:"-1"},[n("验证码 "),s("a",{class:"header-anchor",href:"#验证码","aria-label":'Permalink to "验证码"'},"​")],-1),$=s("p",null,"在一些重要的敏感操作上设置验证码（短信、图片等等），比如更改密码（此场景下也可要求输入原密码，这也是不可预测值）、修改个人资料等操作时。",-1),T=p("",22);function R(N,O,P,x,w,I){const a=e("Image");return t(),c("div",null,[E,y,i,F,u,d,l(a,{alt:"mAhxP8R84x3uK3ig__thumbnail.jpg",src:"https://s0.lgstatic.com/i/image/M00/8D/ED/Ciqc1GABMr-AHqkcAADt9MaFOrw521.jpg"}),n(),h,C,g,l(a,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image2/M01/04/CE/Cip5yF_2g_yAUoRXAAFpA1BKnYQ265.png"}),n(),_,l(a,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image2/M01/04/CE/Cip5yF_2hAeAApf4AABiUbYWPr8607.png"}),n(),A,f,l(a,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image2/M01/04/CE/Cip5yF_2hA-AM63XAADlUkAUtF0820.png"}),n(),S,l(a,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image2/M01/04/D0/CgpVE1_2hBiALUGsAAQ2XWTdSOE628.png"}),n(),D,l(a,{alt:"Drawing 5.png",src:"https://s0.lgstatic.com/i/image/M00/8C/F6/CgqCHl_2hCCAEyT6AABwbigIZJo638.png"}),n(),m,l(a,{alt:"Drawing 6.png",src:"https://s0.lgstatic.com/i/image/M00/8C/F6/CgqCHl_2hDCAOdX2AACjLNgquog527.png"}),n(),k,b,q,v,B,$,l(a,{alt:"Drawing 7.png",src:"https://s0.lgstatic.com/i/image/M00/8C/EB/Ciqc1F_2hGWAGo1QAABWmNbVgkE652.png"}),n(),T,l(a,{alt:"Lark20210111-155827.png",src:"https://s0.lgstatic.com/i/image/M00/8D/40/CgqCHl_8BT6AdNcCAAVd875SC3U237.png"})])}const K=o(r,[["render",R]]);export{J as __pageData,K as default};
