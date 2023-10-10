import{_ as o,j as e,o as t,g as c,k as l,h as s,s as n,Q as p}from"./chunks/framework.cfb14fe0.js";const _=JSON.parse('{"title":"09存储类型：如何挑选合适的存储插件？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/113-Kubernetes 原理剖析与实战应用文档/(4526) 09  存储类型：如何挑选合适的存储插件？.md","filePath":"posts/backEnd/113-Kubernetes 原理剖析与实战应用文档/(4526) 09  存储类型：如何挑选合适的存储插件？.md","lastUpdated":1696682708000}'),r={name:"posts/backEnd/113-Kubernetes 原理剖析与实战应用文档/(4526) 09  存储类型：如何挑选合适的存储插件？.md"},E=n("h1",{id:"_09存储类型-如何挑选合适的存储插件",tabindex:"-1"},[s("09存储类型：如何挑选合适的存储插件？ "),n("a",{class:"header-anchor",href:"#_09存储类型-如何挑选合适的存储插件","aria-label":'Permalink to "09存储类型：如何挑选合适的存储插件？"'},"​")],-1),y=n("p",null,"在以前玩虚拟机的时代，大家比较少考虑存储的问题，因为在通过底层 IaaS 平台申请虚拟机的时候，大多数情况下，我们都会事先预估好需要的容量，方便虚拟机起来后可以稳定的使用这些存储资源。",-1),i=n("p",null,'但是容器与生俱来就是按照可以"运行在任何地方"（run anywhere）这一想法来设计的，对外部存储有着天然的诉求和依赖，并且由于容器本身的生命周期很短暂，在容器内保存数据是件很危险的事情，所以 Docker 通过挂载 Volume 来解决这一问题，如下图所示。',-1),F=p("",6),u=n("p",null,"为了丰富可以对接的存储后端，Kubernetes 中提供了很多volume plugin可供使用。我将目前的一些 plugins 做了如下的分类，方便你进行初步的了解和比较。",-1),d=n("p",null,"如下图所示，Kubelet 内部调用相应的 plugin 实现，将外部的存储挂载到 Pod 内。类似于CephFS、NFS以及 awsEBS 这一类插件，是需要管理员提前在对应的存储系统中申请好的，Kubernetes 本身其实并不负责这些Volume 的申请。",-1),m=p("",34),C=p("",9);function h(B,g,b,A,v,D){const a=e("Image");return t(),c("div",null,[E,y,i,l(a,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image/M00/55/1E/Ciqc1F9pyf-ATyKeAAA4X7loNvA990.png"}),s(),F,l(a,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image/M00/55/29/CgqCHl9pyhuAVPi9AAGYrUBxa7Y940.png"}),s(),u,l(a,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image/M00/55/1E/Ciqc1F9pyiKAUanvAACt-6jm3jw792.png"}),s(),d,l(a,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image/M00/55/29/CgqCHl9pyiyAavysAAEPwHj90U4290.png"}),s(),m,l(a,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image/M00/55/29/CgqCHl9pylGAMLzrAAC5tLcwqrg002.png"}),s(),C])}const f=o(r,[["render",h]]);export{_ as __pageData,f as default};
