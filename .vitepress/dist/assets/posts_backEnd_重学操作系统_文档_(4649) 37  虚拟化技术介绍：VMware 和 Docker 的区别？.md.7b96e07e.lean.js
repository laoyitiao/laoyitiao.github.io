import{_ as s,j as n,o as i,g as p,k as a,h as e,Q as t,s as r}from"./chunks/framework.4e7d56ce.js";const w=JSON.parse('{"title":"37虚拟化技术介绍：VMware和Docker的区别？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/重学操作系统_文档/(4649) 37  虚拟化技术介绍：VMware 和 Docker 的区别？.md","filePath":"posts/backEnd/重学操作系统_文档/(4649) 37  虚拟化技术介绍：VMware 和 Docker 的区别？.md","lastUpdated":1696682708000}'),c={name:"posts/backEnd/重学操作系统_文档/(4649) 37  虚拟化技术介绍：VMware 和 Docker 的区别？.md"},l=t("",16),_=t("",9),g=r("p",null,[e("在第二种设计当中，虚拟机本身也作为一个进程。它和操作系统中执行的其他进程并没有太大的区别。但是"),r("strong",null,"为了提升性能，有一部分 Hypervisor 程序会作为内核中的驱动执行"),e(" 。"),r("strong",null,"当虚拟机操作系统（Guest OS）执行程序的时候，会通过 Hypervisor 实现世界切换"),e("。因此，虽然和 Type-1 虚拟机有一定的区别，但是从本质上来看差距不大，同样是需要二进制翻译技术和虚拟化技术。")],-1),h=r("h4",{id:"hyper-v",tabindex:"-1"},[e("Hyper-V "),r("a",{class:"header-anchor",href:"#hyper-v","aria-label":'Permalink to "Hyper-V"'},"​")],-1),d=r("p",null,"随着虚拟机的发展，现在也出现了很多混合型的虚拟机，比如微软的 Hyper-v 技术。从下图中你会看到，虚拟机的管理程序（Parent Partition）及 Windows 的核心程序，都会作为一个虚拟化的节点，拥有一个自己的 VMBus，并且通过 Hypervisor 实现虚拟化。",-1),u=r("p",null,"在 Hyper-V 的架构当中不存在一个主的操作系统。实际上，用户开机之后就在使用虚拟机，Windows 通过虚拟机执行。在这种架构下，其他的虚拟机，比如用 VMware 管理的虚拟机也可以复用这套架构。当然，你也可以直接把 Linux 安装在 Hyper-V 下，只不过安装过程没有 VMWare 傻瓜化，其实也是很不错的选择。",-1),k=r("h3",{id:"容器-container",tabindex:"-1"},[e("容器（Container） "),r("a",{class:"header-anchor",href:"#容器-container","aria-label":'Permalink to "容器（Container）"'},"​")],-1),m=r("p",null,[r("strong",null,"虚拟机虚拟的是计算机，容器虚拟的是执行环境"),e("。每个容器都是一套独立的执行环境，如下图所示，容器直接被管理在操作系统之内，并不需要一个虚拟机监控程序。")],-1),V=t("",12);function M(y,D,P,T,A,b){const o=n("Image");return i(),p("div",null,[l,a(o,{alt:"Lark20210127-174143.png",src:"https://s0.lgstatic.com/i/image/M00/92/54/CgqCHmARNXqAXohgAACmFoEZ15k793.png"}),e(),_,a(o,{alt:"Lark20210127-174145.png",src:"https://s0.lgstatic.com/i/image/M00/92/49/Ciqc1GARNYSAKM46AADCxGGyD4s927.png"}),e(),g,h,d,a(o,{alt:"Lark20210127-174148.png",src:"https://s0.lgstatic.com/i/image/M00/92/49/Ciqc1GARNYuAUFMRAAF9ae1ZQyE404.png"}),e(),u,k,m,a(o,{alt:"Lark20210127-174137.png",src:"https://s0.lgstatic.com/i/image/M00/92/49/Ciqc1GARNZOAM0V8AAExEgSEXPg097.png"}),e(),V])}const C=s(c,[["render",M]]);export{w as __pageData,C as default};
