import{_ as l,j as e,o as t,g as r,k as n,Q as p,s,h as o}from"./chunks/framework.b3d8e22e.js";const N=JSON.parse('{"title":"通过 Helm 一键安装 Prometheus 和 Grafana ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/113-Kubernetes 原理剖析与实战应用文档/(4534) 17  案例实战：教你快速搭建 Kubernete 监控平台.md","filePath":"posts/backEnd/113-Kubernetes 原理剖析与实战应用文档/(4534) 17  案例实战：教你快速搭建 Kubernete 监控平台.md","lastUpdated":1696417798000}'),c={name:"posts/backEnd/113-Kubernetes 原理剖析与实战应用文档/(4534) 17  案例实战：教你快速搭建 Kubernete 监控平台.md"},E=p("",1),y=p("",25),F=p("",9),i=p("",2),C=p("",9),m=s("p",null,"按照上述图示点进来，你就可以看到已经配置好的各个 Dashboard：",-1),u=s("p",null,[o("这些都是"),s("code",null,"prometheus-community/kube-prometheus-stack"),o("这个 Chart 预先配置好的，基本上包括我们对 Kubernetes 的各项监控大盘，你可以随意点击几个 Dashboard 进行了解。")],-1),h=p("",5),d=s("h4",{id:"各节点的监控指标",tabindex:"-1"},[o("各节点的监控指标 "),s("a",{class:"header-anchor",href:"#各节点的监控指标","aria-label":'Permalink to "各节点的监控指标"'},"​")],-1),B=s("p",null,"各个节点承载着 Pod 的运行，因此对各个节点的监控至关重要，比如节点的 CPU 使用率、内存使用率、平均工作负载等。你可以通过上面 Chart 预配置好的 Node dashboard 来查看：",-1),g=p("",4),k=s("p",null,[o("在此不做太多介绍，可以通过"),s("a",{href:"https://grafana.com/docs/grafana/latest/alerting/create-alerts/",target:"_blank",rel:"noreferrer"},"官方文档"),o("来设置你的 Alert。")],-1),b=s("h3",{id:"写在最后",tabindex:"-1"},[o("写在最后 "),s("a",{class:"header-anchor",href:"#写在最后","aria-label":'Permalink to "写在最后"'},"​")],-1),_=s("p",null,"在这一小节，我们介绍了快速搭建基于 Prometheus + Grafana 的 Kubernetes 监控体系。当然安装的方式有很多，今天这里只写了最方便、最快捷的方式。Chart 里预先配置了多个 Dashboard，方便你开箱即用。",-1),A=s("p",null,"如果你对本节课有什么想法或者疑问，欢迎你在留言区留言，我们一起讨论。",-1);function f(D,v,P,T,S,R){const a=e("Image");return t(),r("div",null,[E,n(a,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image/M00/61/14/CgqCHl-OrgyAPH_iAAFeouU_wAY811.png"}),y,n(a,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image/M00/61/09/Ciqc1F-OrkWAXJsQAAEHWw6G6rM837.png"}),F,n(a,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image/M00/61/14/CgqCHl-OrlyAf9PiAAW6ru2bHZI707.png"}),i,n(a,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image/M00/61/14/CgqCHl-OrmeAXd8PABEbqH6I_pE362.png"}),C,n(a,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image/M00/61/14/CgqCHl-OroiAZBPUABgqqawSub0949.png"}),m,n(a,{alt:"Drawing 5.png",src:"https://s0.lgstatic.com/i/image/M00/61/14/CgqCHl-OrpKAG4VoAAs8370oK_k082.png"}),u,n(a,{alt:"Drawing 6.png",src:"https://s0.lgstatic.com/i/image/M00/61/14/CgqCHl-OrtSASkD9ABXvtUrLlxI610.png"}),h,n(a,{alt:"Drawing 7.png",src:"https://s0.lgstatic.com/i/image/M00/61/14/CgqCHl-Oru-AevJ5AB_ZvYnlO60668.png"}),d,B,n(a,{alt:"Drawing 8.png",src:"https://s0.lgstatic.com/i/image/M00/61/09/Ciqc1F-OrvaARKZ2ABNH_bHh8sg135.png"}),g,n(a,{alt:"Drawing 9.png",src:"https://s0.lgstatic.com/i/image/M00/61/14/CgqCHl-Orv6ACQ9XAAqhwgoMegs538.png"}),k,b,_,A])}const q=l(c,[["render",f]]);export{N as __pageData,q as default};
