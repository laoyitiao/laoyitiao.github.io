import{_ as o,j as e,o as t,g as r,k as l,h as s,Q as p,s as n}from"./chunks/framework.4e7d56ce.js";const g=JSON.parse('{"title":"12网络模型：剖析Docker网络实现及Libnetwork底层原理","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/045_由浅入深吃透 Docker/(4583) 12  网络模型：剖析 Docker 网络实现及 Libnetwork 底层原理.md","filePath":"posts/backEnd/045_由浅入深吃透 Docker/(4583) 12  网络模型：剖析 Docker 网络实现及 Libnetwork 底层原理.md","lastUpdated":1696682708000}'),c={name:"posts/backEnd/045_由浅入深吃透 Docker/(4583) 12  网络模型：剖析 Docker 网络实现及 Libnetwork 底层原理.md"},y=p("",47),E=p("",25),i=n("h3",{id:"结语",tabindex:"-1"},[s("结语 "),n("a",{class:"header-anchor",href:"#结语","aria-label":'Permalink to "结语"'},"​")],-1),d=n("p",null,[s("我上面有说到 Libnetwork 的工作流程是完全围绕 CNM 的三个要素进行的，CNM 制定标准之初不仅仅是为了单台主机上的容器互通，更多的是为了定义跨主机之间的容器通信标准。但是后来由于 Kubernetes 逐渐成为了容器编排的标准，而 Kubernetes 最终选择了 CNI 作为容器网络的定义标准（具体原因可以参考"),n("a",{href:"https://kubernetes.io/blog/2016/01/why-kubernetes-doesnt-use-libnetwork/",target:"_blank",rel:"noreferrer"},"这里"),s("），很遗憾 CNM 最终没有成为跨主机容器通信的标准，但是CNM 却为推动容器网络标准做出了重大贡献，且 Libnetwork 也是 Docker 的默认网络实现，提供了单独使用 Docker 容器时的多种网络接入功能。")],-1),C=n("p",null,"那你知道 libnetwork 除了我讲的四种网络模式外，还有什么网络模式吗？思考后，把你的想法写在留言区。",-1);function F(k,b,f,B,u,h){const a=e("Image");return t(),r("div",null,[y,l(a,{alt:"Lark20200929-162853.png",src:"https://s0.lgstatic.com/i/image/M00/59/ED/Ciqc1F9y8IKAa-1NAABjDM-2kBk665.png"}),s(),E,l(a,{alt:"Lark20200929-162901.png",src:"https://s0.lgstatic.com/i/image/M00/59/ED/Ciqc1F9y8HGAaH1iAAClKDUq5FY736.png"}),s(),i,d,C])}const A=o(c,[["render",F]]);export{g as __pageData,A as default};
