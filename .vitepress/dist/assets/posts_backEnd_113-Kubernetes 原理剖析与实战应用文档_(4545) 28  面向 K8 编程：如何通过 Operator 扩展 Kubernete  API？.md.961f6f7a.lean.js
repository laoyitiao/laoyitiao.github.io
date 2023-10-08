import{_ as o,j as l,o as t,g as r,k as e,h as a,Q as p,s}from"./chunks/framework.a0d18f64.js";const P=JSON.parse('{"title":"28面向K8编程：如何通过Operator扩展KuberneteAPI？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/113-Kubernetes 原理剖析与实战应用文档/(4545) 28  面向 K8 编程：如何通过 Operator 扩展 Kubernete  API？.md","filePath":"posts/backEnd/113-Kubernetes 原理剖析与实战应用文档/(4545) 28  面向 K8 编程：如何通过 Operator 扩展 Kubernete  API？.md","lastUpdated":1696682708000}'),c={name:"posts/backEnd/113-Kubernetes 原理剖析与实战应用文档/(4545) 28  面向 K8 编程：如何通过 Operator 扩展 Kubernete  API？.md"},i=p("",9),y=s("p",null,"kube-controller-manager 就是由这样一组控制器组成的。我们以 StatefulSet 为例来简单说明下控制器的具体逻辑。",-1),E=s("p",null,"假设你声明了一个 StatefulSet，并将其副本数设置为 2。kube-controller-manager 中以 goroutine 方式运行的 StatefulSet 控制器在观察 kube-apiserver 的时候，发现了这个新创建的对象，它会先创建一个 index 为 0 的 Pod ，并实时观察这个 Pod 的状态，待其状态变为 Running 后，再创建 index 为 1 的 Pod。后续该控制器会一直观察并维护这些 Pod 的状态，保证 StatefulSet 的有效副本数始终为 2。",-1),u=s("p",null,"所以我们在声明完成 CRD 之后，也需要创建一个控制器，即 Operator，来完成对应的控制逻辑。",-1),d=s("p",null,"了解了 Operator 的概念和控制器模式后，我们来看看 Operator 是如何工作的。",-1),F=s("h3",{id:"kubernetes-operator-是如何工作的",tabindex:"-1"},[a("Kubernetes Operator 是如何工作的 "),s("a",{class:"header-anchor",href:"#kubernetes-operator-是如何工作的","aria-label":'Permalink to "Kubernetes Operator 是如何工作的"'},"​")],-1),b=s("p",null,"Operator 工作的时候采用上述的控制器模式，会持续地观察 Kubernetes 中的自定义对象，即 CR（Custom Resource）。我们通过 CRD 来定义一个对象，CR 则是 CRD 实例化的对象。",-1),h=s("p",null,"Operator 会持续跟踪这些 CR 的变化事件，比如 ADD、UPDATE、DELETE，然后采取一系列操作，使其达到期望的状态。",-1),g=s("p",null,"那么具体的代码层面，整个逻辑又如何实现呢？",-1),k=s("p",null,"下面就是 Operator 代码层面的工作流程图：",-1),C=p("",34);function m(_,B,v,A,f,O){const n=l("Image");return t(),r("div",null,[i,e(n,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image/M00/74/A3/Ciqc1F_HAmyACHLHAAHSt7ZcZoY464.png"}),a(),y,E,u,d,F,b,e(n,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image/M00/74/A3/Ciqc1F_HAnWAZUN3AAGfGj4K8Gw651.png"}),a(),h,g,k,e(n,{alt:"image.png",src:"https://s0.lgstatic.com/i/image/M00/74/ED/CgqCHl_HLoWAHjvEAAPol71Pgh8456.png"}),a(),C])}const D=o(c,[["render",m]]);export{P as __pageData,D as default};
