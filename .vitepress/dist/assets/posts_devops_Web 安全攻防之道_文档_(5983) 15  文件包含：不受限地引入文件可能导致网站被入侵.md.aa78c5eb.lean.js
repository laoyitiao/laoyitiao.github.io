import{_ as o,j as e,o as t,g as c,k as n,h as s,Q as l,s as a}from"./chunks/framework.a0d18f64.js";const x=JSON.parse('{"title":"15文件包含：不受限地引入文件可能导致网站被入侵","description":"","frontmatter":{},"headers":[],"relativePath":"posts/devops/Web 安全攻防之道_文档/(5983) 15  文件包含：不受限地引入文件可能导致网站被入侵.md","filePath":"posts/devops/Web 安全攻防之道_文档/(5983) 15  文件包含：不受限地引入文件可能导致网站被入侵.md","lastUpdated":1696682708000}'),r={name:"posts/devops/Web 安全攻防之道_文档/(5983) 15  文件包含：不受限地引入文件可能导致网站被入侵.md"},y=l("",12),E=l("",6),i=l("",6),h=l("",21),F=a("p",null,"图 4 利用漏洞读取 /etc/passwd 文件",-1),d=a("h3",{id:"漏洞利用技巧",tabindex:"-1"},[s("漏洞利用技巧 "),a("a",{class:"header-anchor",href:"#漏洞利用技巧","aria-label":'Permalink to "漏洞利用技巧"'},"​")],-1),u=a("p",null,"随着PHP 5.2 之后默认关闭 allow_url_include 配置，也降低了远程文件包含漏洞的出现。但是本地文件包含漏洞的利用方式，很多也适用于远程文件包含漏洞，下面会介绍一些相对通用的利用技巧。",-1),_=a("p",null,"此处漏洞利用的目标仍然是为了获取服务器的 shell 权限，就需要设法在服务器上写入文件，内容自然是一句话等恶意代码内容。但是，我们手上又没有写任意文件的漏洞可利用，只能看看服务器上哪些文件会写入外部用户可控数据，或者其他可执行 PHP 代码的方式。",-1),g=a("p",null,"总结起来，主要有下面几种利用方式。",-1),C=a("h4",{id:"_1-写日志文件",tabindex:"-1"},[s("1.写日志文件 "),a("a",{class:"header-anchor",href:"#_1-写日志文件","aria-label":'Permalink to "1.写日志文件"'},"​")],-1),m=a("p",null,"如果服务器开启访问日志记录的话，那么用户的请求数据就会被记录在日志文件，若我们在地址上包含一句话木马的话，也同样会被记录进去。如果将一句话写在 URL 中常常会被 URL 编码存储，因此需要写 User-Agent 中，其他 HTTP 头默认不会被记录：",-1),A=l("",17),v=l("",11),f=a("p",null,"此处我直接利用 data:// 执行代码，这比远程文件包含中利用方式便捷太多了，比如下面直接系统命令的示例。",-1),$=l("",15),b=l("",20);function k(B,q,D,P,w,S){const p=e("Image");return t(),c("div",null,[y,n(p,{alt:"图片1.png",src:"https://s0.lgstatic.com/i/image2/M01/0C/3C/Cip5yGAX4A2AGQJLAALnh3QheXo648.png"}),s(),E,n(p,{alt:"图片2.png",src:"https://s0.lgstatic.com/i/image/M00/94/50/CgqCHmAX4CWALTY8AAQPl3E0Ay4160.png"}),s(),i,n(p,{alt:"图片3.png",src:"https://s0.lgstatic.com/i/image/M00/94/50/CgqCHmAX4DSAJYH3AAQINnkRH5s611.png"}),s(),h,n(p,{alt:"图片4.png",src:"https://s0.lgstatic.com/i/image2/M01/0C/3C/Cip5yGAX4EmATdfwAAIXYjl0obE125.png"}),s(),F,d,u,_,g,C,m,n(p,{alt:"图片5.png",src:"https://s0.lgstatic.com/i/image/M00/94/45/Ciqc1GAX4FmADM5PAASEhBTUaiw277.png"}),s(),A,n(p,{alt:"图片6.png",src:"https://s0.lgstatic.com/i/image/M00/94/50/CgqCHmAX4HOAWgwcAADxpVOzpUc744.png"}),s(),v,n(p,{alt:"图片8.png",src:"https://s0.lgstatic.com/i/image2/M01/0C/3D/Cip5yGAX4KSAapyBAAPVaA5QE1A158.png"}),s(),f,n(p,{alt:"图片7.png",src:"https://s0.lgstatic.com/i/image2/M01/0C/3D/Cip5yGAX4LqAHITdAAFk7HY8mf8051.png"}),s(),$,n(p,{alt:"图片9.png",src:"https://s0.lgstatic.com/i/image/M00/94/51/CgqCHmAX4MqASFfNAAFRLvvVLVE597.png"}),s(),b])}const H=o(r,[["render",k]]);export{x as __pageData,H as default};
