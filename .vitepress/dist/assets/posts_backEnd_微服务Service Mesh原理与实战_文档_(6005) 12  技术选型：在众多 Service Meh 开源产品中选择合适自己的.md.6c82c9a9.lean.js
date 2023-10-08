import{_ as o,j as a,o as t,g as n,k as i,h as s,Q as l,s as e}from"./chunks/framework.a0d18f64.js";const K=JSON.parse('{"title":"12技术选型：在众多ServiceMeh开源产品中选择合适自己的","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/微服务Service Mesh原理与实战_文档/(6005) 12  技术选型：在众多 Service Meh 开源产品中选择合适自己的.md","filePath":"posts/backEnd/微服务Service Mesh原理与实战_文档/(6005) 12  技术选型：在众多 Service Meh 开源产品中选择合适自己的.md","lastUpdated":1696682708000}'),h={name:"posts/backEnd/微服务Service Mesh原理与实战_文档/(6005) 12  技术选型：在众多 Service Meh 开源产品中选择合适自己的.md"},c=l("",42),p=e("p",null,"NGINX Service Mesh 架构图",-1),d=e("h4",{id:"traefik-mesh",tabindex:"-1"},[s("Traefik Mesh "),e("a",{class:"header-anchor",href:"#traefik-mesh","aria-label":'Permalink to "Traefik Mesh"'},"​")],-1),g=e("p",null,[s("Traefik Mesh 由 Go 语言编写的开源网关系统 Traefik 演进而来，与其他提到的 Mesh 解决方案不同，"),e("strong",null,"Taeafik Mesh 将 Sidecar 部署在了 Kubernetes Node 节点上"),s("。这样的好处是在同一个 Node 节点上的 Pod，可以共享一个 Sidecar，不用为每个 Pod 单独分配 Sidecar 资源，从而达到节省资源的目的，同时相对于在 Pod 的 Container 里部署 Sidecar，这样也方便升级维护。")],-1),_=e("p",null,"但这种做法也有缺点，资源隔离性不好，容易相互影响，比如同一个 Node 节点上某个服务出现了问题，从而占用了更多的资源，其他的 Pod 可能就没有资源可用了。",-1),u=e("p",null,"Traefik Mesh 架构图",-1),S=e("h4",{id:"consul-connect",tabindex:"-1"},[s("Consul Connect "),e("a",{class:"header-anchor",href:"#consul-connect","aria-label":'Permalink to "Consul Connect"'},"​")],-1),v=e("p",null,"Consul Connect 是 HashiCorp 公司开源的 Service Mesh 解决方案，需要和 Consul 绑定使用，同样采用 Envoy 作为数据面，Consul Connect 充当控制面的角色。",-1),M=e("p",null,"Consul Connect 架构图",-1),m=e("h4",{id:"gcp-traffic-director",tabindex:"-1"},[s("GCP Traffic Director "),e("a",{class:"header-anchor",href:"#gcp-traffic-director","aria-label":'Permalink to "GCP Traffic Director"'},"​")],-1),P=e("p",null,[s("Traffic Director 是Google Cloud Platform（谷歌云平台）提供的 Service Mesh 解决方案，"),e("strong",null,"同时支持虚拟机和容器环境"),s("。它使用 Envoy 作为数据面，通过 xDS API 与数据面进行通信。")],-1),k=e("p",null,[s("Traffic Director 通过"),e("strong",null,"集中化的健康检查"),s("代替了 Envoy 内置网格的健康检查方式，这样做的好处是减少了网格健康检查带来的服务压力，但需要注意的是集中式的健康检查无法处理网络分区故障的问题。")],-1),f=e("p",null,"Traffic Director 架构图",-1),b=e("h3",{id:"总结",tabindex:"-1"},[s("总结 "),e("a",{class:"header-anchor",href:"#总结","aria-label":'Permalink to "总结"'},"​")],-1),C=e("p",null,"这一讲我主要介绍了 Service Mesh 中的诸多解决方案，通过今天的内容，相信你已经了解到 Istio 并不是 Service Mesh 中唯一的解决方案。另外，你需要注意的是 Istio 其实只是 Service Mesh 中的控制面实现，其数据面使用了 Envoy。其实，在诸多开源解决方案中，都使用了 Envoy 作为数据面，比如 Consul、Connnet、Kuma 等。",-1),T=e("p",null,"下面我们通过一张对比表格进一步总结上述解决方案的特点：",-1),I=e("p",null,"本讲内容到这里就结束了，下一讲我会讲解最常用的数据面 Envoy，Envoy 特性丰富，支持多种协议代理、多种负载均衡策略，它拥有着丰富的服务治理功能，下一讲我们都会一一介绍。",-1),A=e("p",null,"结合今天学习的内容，如果让你选择，根据公司现有的情况，你会选择哪种 Service Mesh 解决方案呢。欢迎在留言区和我分享你的观点，我们下一讲再见！",-1);function N(x,q,E,y,G,D){const r=a("Image");return t(),n("div",null,[c,i(r,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image/M00/91/C1/Ciqc1GAPkTuAI9qkAAFRd_frjBQ269.png"}),s(),p,d,g,_,i(r,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image2/M01/09/B4/CgpVE2APkUeAJgTwAACV4xlXkAY740.png"}),s(),u,S,v,i(r,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image2/M01/09/B2/Cip5yGAPkVOAbJG1AAF-LOUj7H0281.png"}),s(),M,m,P,k,i(r,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image2/M01/09/B4/CgpVE2APkV2ABiA_AACPWphx1FM106.png"}),s(),f,b,C,T,i(r,{alt:"1-1.png",src:"https://s0.lgstatic.com/i/image/M00/91/E3/CgqCHmAP1DiAEeobAAHFe0eUSUk269.png"}),s(),I,A])}const L=o(h,[["render",N]]);export{K as __pageData,L as default};
