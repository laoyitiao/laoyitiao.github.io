import{_ as p,j as t,o as l,g as r,k as e,h as s,Q as o,s as n}from"./chunks/framework.a0d18f64.js";const v=JSON.parse('{"title":"25稳定基石：带你剖析容器运行时以及CRI原理","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/113-Kubernetes 原理剖析与实战应用文档/(4542) 25  稳定基石：带你剖析容器运行时以及 CRI 原理.md","filePath":"posts/backEnd/113-Kubernetes 原理剖析与实战应用文档/(4542) 25  稳定基石：带你剖析容器运行时以及 CRI 原理.md","lastUpdated":1696682708000}'),c={name:"posts/backEnd/113-Kubernetes 原理剖析与实战应用文档/(4542) 25  稳定基石：带你剖析容器运行时以及 CRI 原理.md"},i=o("",7),E=n("p",null,[s("图 1："),n("a",{href:"https://www.threatstack.com/blog/diving-deeper-into-runtimes-kubernetes-cri-and-shims",target:"_blank",rel:"noreferrer"},"Kubelet 跟容器运行的交互图")],-1),y=n("p",null,"Kubelet 负责跟 kube-apiserver 进行数据同步，获取新的 Pod，并上报本机 Pod 的各个状态数据。Kubelet 通过调用容器运行时的接口完成容器的创建、容器状态的查询等工作。下图就是使用 Docker 作为容器的运行时。",-1),u=o("",14),d=n("p",null,[s("图 3："),n("a",{href:"https://kubernetes.io/blog/2016/12/container-runtime-interface-cri-in-kubernetes/",target:"_blank",rel:"noreferrer"},"Kubelet 与容器运行时的交互"),s(")")],-1),m=n("p",null,"从上图可以看出，新增的 CRI shim 是 Kubelet 和容器运行时之间的交互纽带，Kubelet 只需要跟 CRI shim 进行交互。Kubelet 调用 CRI shim 的接口，CRI shim 响应请求后会调用底层的运行容器时，完成对容器的相关操作。",-1),h=n("p",null,[s("这里我们需要将 Kubelet、CRI shim 以及容器运行时都部署在同一个节点上。一般来说，大多数的容器运行时都默认实现了 CRI 的接口，比如"),n("a",{href:"https://containerd.io/docs/",target:"_blank",rel:"noreferrer"},"containerd"),s("。")],-1),C=n("p",null,"目前 Kubelet 内部内置了对 Docker 的 CRI shim 的实现，见下图：",-1),R=n("p",null,[s("图 4："),n("a",{href:"https://dzone.com/articles/evolution-of-k8s-worker-nodes-cri-o",target:"_blank",rel:"noreferrer"},"Kubelet 内置对 CRI shim 的实现")],-1),b=n("p",null,[s("而对于其他的容器运行时，比如"),n("a",{href:"https://kubernetes.io/zh/docs/setup/production-environment/container-runtimes/#containerd",target:"_blank",rel:"noreferrer"},"containerd"),s("，我们就需要配置 kubelet 的 --container-runtime 参数为 remote，并设置 --container-runtime-endpoint 为对应的容器运行时的监听地址。")],-1),g=n("p",null,[s("Kubernetes 自 v1.10 版本已经完成了和 containerd 1.1版本 的 GA 集成，你可以直接按照"),n("a",{href:"https://kubernetes.io/zh/docs/setup/production-environment/container-runtimes/#containerd",target:"_blank",rel:"noreferrer"},"这份文档"),s("来部署 containerd 作为你的容器运行时。")],-1),S=o("",7);function f(A,F,D,I,P,x){const a=t("Image");return l(),r("div",null,[i,e(a,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image/M00/6F/EA/CgqCHl-3Y6CAIjzjAAEbwUIQ2pI143.png"}),s(),E,y,e(a,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image/M00/6F/DE/Ciqc1F-3Y8OAGglUAAESe6PzHHQ855.png"}),s(),u,e(a,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image/M00/6F/DF/Ciqc1F-3ZBCAfnwJAACHtbND3KI539.png"}),s(),d,m,h,C,e(a,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image/M00/6F/DF/Ciqc1F-3ZBmAdEVFAAAnf6SSCkk798.png"}),s(),R,b,g,e(a,{alt:"Drawing 5.png",src:"https://s0.lgstatic.com/i/image/M00/6F/EA/CgqCHl-3ZCKAA7C9AABJ2r60MV4161.png"}),s(),S])}const q=p(c,[["render",f]]);export{v as __pageData,q as default};
