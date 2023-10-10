import{_ as l,j as p,o as e,g as c,k as n,h as a,s,Q as t}from"./chunks/framework.cfb14fe0.js";const M=JSON.parse('{"title":"05仓库访问：怎样搭建属于你的私有仓库？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/045_由浅入深吃透 Docker/(4576) 05  仓库访问：怎样搭建属于你的私有仓库？.md","filePath":"posts/backEnd/045_由浅入深吃透 Docker/(4576) 05  仓库访问：怎样搭建属于你的私有仓库？.md","lastUpdated":1696682708000}'),r={name:"posts/backEnd/045_由浅入深吃透 Docker/(4576) 05  仓库访问：怎样搭建属于你的私有仓库？.md"},y=s("h1",{id:"_05仓库访问-怎样搭建属于你的私有仓库",tabindex:"-1"},[a("05仓库访问：怎样搭建属于你的私有仓库？ "),s("a",{class:"header-anchor",href:"#_05仓库访问-怎样搭建属于你的私有仓库","aria-label":'Permalink to "05仓库访问：怎样搭建属于你的私有仓库？"'},"​")],-1),E=s("p",null,'在第三课时"镜像使用：Docker 环境下如何配置你的镜像？"里，我介绍了镜像的基本操作和镜像的原理，那么有了镜像，我们应该如何更好地存储和分发镜像呢？答案就是今天的主角------Docker 的镜像仓库。其实我们不仅可以使用公共镜像仓库存储和分发镜像，也可以自己搭建私有的镜像仓库，那在搭建之前，我们先回顾下仓库的基础知识。',-1),i=s("h3",{id:"仓库是什么",tabindex:"-1"},[a("仓库是什么？ "),s("a",{class:"header-anchor",href:"#仓库是什么","aria-label":'Permalink to "仓库是什么？"'},"​")],-1),d=s("p",null,"仓库（Repository）是存储和分发 Docker 镜像的地方。镜像仓库类似于代码仓库，Docker Hub 的命名来自 GitHub，Github 是我们常用的代码存储和分发的地方。同样 Docker Hub 是用来提供 Docker 镜像存储和分发的地方。",-1),F=s("p",null,"有的同学可能经常分不清注册服务器（Registry）和仓库（Repository）的概念。在这里我可以解释下这两个概念的区别：注册服务器是存放仓库的实际服务器，而仓库则可以被理解为一个具体的项目或者目录；注册服务器可以包含很多个仓库，每个仓库又可以包含多个镜像。例如我的镜像地址为 docker.io/centos，docker.io 是注册服务器，centos 是仓库名。 它们之间的关系如图 1 所示。",-1),b=s("p",null,"按照类型，我们将镜像仓库分为公共镜像仓库和私有镜像仓库。",-1),u=s("h3",{id:"公共镜像仓库",tabindex:"-1"},[a("公共镜像仓库 "),s("a",{class:"header-anchor",href:"#公共镜像仓库","aria-label":'Permalink to "公共镜像仓库"'},"​")],-1),g=s("p",null,"公共镜像仓库一般是 Docker 官方或者其他第三方组织（阿里云，腾讯云，网易云等）提供的，允许所有人注册和使用的镜像仓库。",-1),h=s("p",null,"Docker Hub 是全球最大的镜像市场，目前已经有超过 10w 个容器镜像，这些容器镜像主要来自软件供应商、开源组织和社区。大部分的操作系统镜像和软件镜像都可以直接在 Docker Hub 下载并使用。",-1),C=s("p",null,"图 2 Docker Hub 镜像",-1),k=s("p",null,"下面我以 Docker Hub 为例，教你如何使用公共镜像仓库分发和存储镜像。",-1),B=s("h4",{id:"注册-docker-hub-账号",tabindex:"-1"},[a("注册 Docker Hub 账号 "),s("a",{class:"header-anchor",href:"#注册-docker-hub-账号","aria-label":'Permalink to "注册 Docker Hub 账号"'},"​")],-1),f=s("p",null,[a("我们首先访问"),s("a",{href:"https://hub.docker.com/",target:"_blank",rel:"noreferrer"},"Docker Hub"),a("官网，点击注册按钮进入注册账号界面。")],-1),D=s("p",null,"图 3 注册 Docker Hub 账号",-1),v=s("p",null,"注册完成后，我们可以点击创建仓库，新建一个仓库用于推送镜像。",-1),_=t("",56),m=s("p",null,"图 5 Harbor 官网",-1),x=s("p",null,[a("Harbor 的使命是成为 Kubernetes 信任的云原生镜像仓库。 Harbor 需要结合 Kubernetes 才能发挥其最大价值，因此，在这里我就不展开介绍 Harbor 了。如果你对 Harbor 构建企业级镜像仓库感兴趣，可以到它的"),s("a",{href:"https://goharbor.io/",target:"_blank",rel:"noreferrer"},"官网"),a("了解更多。")],-1),A=s("h3",{id:"结语",tabindex:"-1"},[a("结语 "),s("a",{class:"header-anchor",href:"#结语","aria-label":'Permalink to "结语"'},"​")],-1),T=s("p",null,"到此，相信你不仅可以使用公共镜像仓库存储和拉取镜像，还可以自己动手搭建一个私有的镜像仓库。那当你使用 Docker Hub 拉取镜像很慢的时候，你知道如何加快镜像的拉取速度吗？思考后，可以把你的想法写在留言区。",-1);function P(S,I,q,H,$,R){const o=p("Image");return e(),c("div",null,[y,E,i,d,F,n(o,{alt:"Lark20200911-162223.png",src:"https://s0.lgstatic.com/i/image/M00/4D/C7/Ciqc1F9bM-uAI6MDAADk1noY7ic639.png"}),a(),b,u,g,h,n(o,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image/M00/4D/C3/Ciqc1F9bL9yAYd_LAAJW9Q4Ue2w855.png"}),a(),C,k,B,f,n(o,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image/M00/4D/CE/CgqCHl9bL-aABPLiAABcwVxClDY261.png"}),a(),D,v,n(o,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image/M00/4D/C3/Ciqc1F9bL--AYVIKAADWoafHnho359.png"}),a(),_,n(o,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image/M00/4D/CF/CgqCHl9bMHCAFgcMAABNmNOujV4312.png"}),a(),m,x,A,T])}const U=l(r,[["render",P]]);export{M as __pageData,U as default};
