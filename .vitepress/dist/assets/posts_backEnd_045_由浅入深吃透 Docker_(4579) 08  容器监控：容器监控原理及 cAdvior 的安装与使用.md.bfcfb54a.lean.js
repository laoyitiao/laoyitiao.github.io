import{_ as l,j as r,o as e,g as t,k as n,h as o,Q as p,s}from"./chunks/framework.cfb14fe0.js";const S=JSON.parse('{"title":"08容器监控：容器监控原理及cAdvior的安装与使用","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/045_由浅入深吃透 Docker/(4579) 08  容器监控：容器监控原理及 cAdvior 的安装与使用.md","filePath":"posts/backEnd/045_由浅入深吃透 Docker/(4579) 08  容器监控：容器监控原理及 cAdvior 的安装与使用.md","lastUpdated":1696682708000}'),c={name:"posts/backEnd/045_由浅入深吃透 Docker/(4579) 08  容器监控：容器监控原理及 cAdvior 的安装与使用.md"},y=p("",25),E=s("p",null,"图1 cAdvisor 首页",-1),F=s("p",null,"cAdvisor 不仅可以监控容器的资源使用情况，还可以监控主机的资源使用情况。下面我们就先看下它是如何查看主机资源使用情况的。",-1),C=s("h4",{id:"使用-cadvisor-查看主机监控",tabindex:"-1"},[o("使用 cAdvisor 查看主机监控 "),s("a",{class:"header-anchor",href:"#使用-cadvisor-查看主机监控","aria-label":'Permalink to "使用 cAdvisor 查看主机监控"'},"​")],-1),i=s("p",null,[o("访问 "),s("a",{href:"http://localhost:8080/containers/",target:"_blank",rel:"noreferrer"},"http://localhost:8080/containers/"),o(" 地址，在首页可以看到主机的资源使用情况，包含 CPU、内存、文件系统、网络等资源，如下图所示。")],-1),A=s("p",null,"图2 主机 CPU 使用情况",-1),m=s("h4",{id:"使用-cadvisor-查看容器监控",tabindex:"-1"},[o("使用 cAdvisor 查看容器监控 "),s("a",{class:"header-anchor",href:"#使用-cadvisor-查看容器监控","aria-label":'Permalink to "使用 cAdvisor 查看容器监控"'},"​")],-1),D=s("p",null,[o("如果你想要查看主机上运行的容器资源使用情况，可以访问 "),s("a",{href:"http://localhost:8080/docker/",target:"_blank",rel:"noreferrer"},"http://localhost:8080/docker/"),o("，这个页面会列出 Docker 的基本信息和运行的容器情况，如下图所示。")],-1),B=s("p",null,"图3 Docker 容器",-1),d=s("p",null,"在上图中的 Subcontainers 下会列出当前主机上运行的所有容器，点击其中一个容器即可查看该容器的详细运行状态，如下图所示。",-1),u=p("",37);function _(g,v,h,k,b,w){const a=r("Image");return e(),t("div",null,[y,n(a,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image/M00/56/18/Ciqc1F9rCXSAQEwLAADKlh0at8o307.png"}),o(),E,F,C,i,n(a,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image/M00/56/23/CgqCHl9rCX2ANrtaAADIGkeKKPc100.png"}),o(),A,m,D,n(a,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image/M00/56/18/Ciqc1F9rCZyAN8hYAAGAOL1FGcg401.png"}),o(),B,d,n(a,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image/M00/56/23/CgqCHl9rCaWAVSLVAAGGy2lTMqY130.png"}),o(),u])}const f=l(c,[["render",_]]);export{S as __pageData,f as default};
