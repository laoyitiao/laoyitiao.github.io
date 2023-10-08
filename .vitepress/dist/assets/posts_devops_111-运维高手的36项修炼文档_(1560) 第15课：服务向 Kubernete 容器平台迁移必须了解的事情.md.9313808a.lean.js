import{_ as o,j as t,o as p,g as c,k as e,h as a,Q as l,s}from"./chunks/framework.a0d18f64.js";const os=JSON.parse('{"title":"第15课：服务向Kubernete容器平台迁移必须了解的事情","description":"","frontmatter":{},"headers":[],"relativePath":"posts/devops/111-运维高手的36项修炼文档/(1560) 第15课：服务向 Kubernete 容器平台迁移必须了解的事情.md","filePath":"posts/devops/111-运维高手的36项修炼文档/(1560) 第15课：服务向 Kubernete 容器平台迁移必须了解的事情.md","lastUpdated":1696682708000}'),i={name:"posts/devops/111-运维高手的36项修炼文档/(1560) 第15课：服务向 Kubernete 容器平台迁移必须了解的事情.md"},r=l("",12),d=s("br",null,null,-1),_=s("p",null,"以上就是在迁移到 K8S 之前所需要重点考虑的第一个问题，如何解决呢？就需要将业务服务做到本地无状态化，这里我画了一张图。",-1),h=s("p",null,"当请求到达业务服务后，业务服务会把这部分有状态的信息数据存储到一个公共的服务组件里去，而不是放在业务服务本地资源的空间里，比如我们可以把数据存储在数据库、消息队列、分布式存储里。",-1),u=s("h3",{id:"业务日志收集排查",tabindex:"-1"},[a("业务日志收集排查 "),s("a",{class:"header-anchor",href:"#业务日志收集排查","aria-label":'Permalink to "业务日志收集排查"'},"​")],-1),S=s("br",null,null,-1),b=s("p",null,"第二个问题，当程序从非 K8S 架构迁移到 K8S 架构后，对于日志的收集也是我们需要关注的问题，在 Linux 的开源系统环境下，传统的收集方式是首先通过 Syslog 协议，然后通过 Linux 系统上的 Syslog-d 或者 Rsyslog 日志服务对业务日志进行收集。这里我画了一张图，这张图显示的是在传统收集方式和非 K8S 架构下，对日志常用的收集方式。",-1),E=s("br",null,null,-1),m=s("p",null,"我们看到在这样一种架构下，对日志的收集有几个特点，第 1 个特点就是收集的业务节点是固定的某一节点。",-1),g=s("br",null,null,-1),P=s("p",null,"但是当程序迁移到 K8S 架构下后，日志的收集会遇到一个很大的问题，因为容器上的业务日志可能会随时飘移，这就导致 K8S 所有 node 节点上的日志、目录路径和信息会动态地增加和减少。这个时候我们会采用一种新的日志收集工具来通配 K8S 架构下的模式，这时常用到工具有ELK 、EFK。",-1),K=s("br",null,null,-1),y=s("p",null,"EFK 是个什么样的架构呢？E 表示 Elasticsearch，它是一个搜索存储日志引擎，既可以进行日志的存储，也可以进行日志的检索，是一个非常强大的工具。K 表示 Kibana，它是 Elasticsearch 的界面化展示。有了这两个东西，我们相当于有了一套后端日志的检索和展示平台。相比之前方式重要的区别在于端日志收集方式，Rsyslog 是非 K8S 架构下常用到的日志收集器，那么在 K8S 架构里，工具常用 filebeat 或者 fluent。相比 Rsyslog，这两个搜集组件支持对日志路径、名字的通配，我们不用关心某个具体的日志，它们可以通配某一级目录或者是某一个目录的所有通配日志名称。",-1),v=s("br",null,null,-1),C=l("",43),M=s("br",null,null,-1),f=s("p",null,"第 1 步需要将应用封装到容器里，这里我画了一张图，它把业务、环境和系统整体打包到一个容器镜像里面去。最底层还是一个 OS 操作系统层（可以选择 CentOS、Ubuntu、Alpine） ，Alpine 是官方最小化的 Linux 镜像。",-1),A=s("br",null,null,-1),k=s("p",null,"第 2 层是程序代码所需要依赖的一些环境。如果是 Java 服务的话，这里就需要依赖 Java 的解析器，比如 OpenJDK 和 OrackeJDK，Servlet 容器是 Tomcat 还是其他的服务。",-1),q=s("br",null,null,-1),T=s("p",null,"最上层就是代码。",-1),V=s("br",null,null,-1),O=s("p",null,"这些所有内容整体构成需要打包成容器镜像.",-1),J=s("h3",{id:"步骤二-pv-pvc-持久化数据",tabindex:"-1"},[a("步骤二：PV/PVC 持久化数据 "),s("a",{class:"header-anchor",href:"#步骤二-pv-pvc-持久化数据","aria-label":'Permalink to "步骤二：PV/PVC 持久化数据"'},"​")],-1),x=s("br",null,null,-1),L=s("p",null,"第 2 步就是我刚讲到的 PV 或者 PVC 的数据持久化。我们知道容器中存取的都是临时数据， Pod 的内部数据可能会因为重启而丢失，所以我们要把这些需要共享到存储块的内容，比如说网站服务里用户所上传的一些图片文件，或者是需要多个程序共享的一些数据文件和日志文件，都可以通过集中化的方式存储到容器外部，这通常需要通过 PV 或者 PVC 来建立数据持久化。",-1),D=s("h3",{id:"步骤三-configmap-secret-配置",tabindex:"-1"},[a("步骤三：ConfigMap/Secret 配置 "),s("a",{class:"header-anchor",href:"#步骤三-configmap-secret-配置","aria-label":'Permalink to "步骤三：ConfigMap/Secret 配置"'},"​")],-1),R=s("p",null,"第 3 步就是应用程序所需要的相关配置，它可以通过 K8S 的 ConfigMap 或 Secret，把这些应用程序所需要的一些配置，以 key-value 的形式传递到 Container（容器）里面 。",-1),B=s("h3",{id:"步骤四-封装-pod",tabindex:"-1"},[a("步骤四：封装 Pod "),s("a",{class:"header-anchor",href:"#步骤四-封装-pod","aria-label":'Permalink to "步骤四：封装 Pod"'},"​")],-1),Q=s("p",null,"第 4 步是封装 Pod，考虑容器如何容器封装到的 Pod 里。我们需要考虑这样几个因素，首先要避免单 Pod 故障，所以在创建 Pod 时一定要考虑多个副本。其次，Pod 一般都有 Liveness 和 Readiness 的健康检查配置，所以我们在 Pod 里配置对象的时候，先要提前定义好，以便 K8S 能够更精确的检测到你的 Pod 是否正常。另外，我们需要了解这个业务的一些耦合性，通常一个 Pod 里面是一个容器，但是也有对耦合性要求非常高的，举个例子，一些游戏类客户，有可能会在一个 Pod 里启用两个 Container，也就是两个容器，一个跑业务，另外一个跑本地缓存。这样就可以做到两个容器在一个 Pod 里面共享 namespase。",-1),I=s("br",null,null,-1),Y=s("br",null,null,-1),j=s("p",null,"对于数据要求紧密的业务，我们可能需要这么做。所以在 Pod 、容器、业务这三个方面，需要提前做好规划。另外，我们需要来根据实际情况选择生成 Pod 的 Controller，包括 Deployment、DaemonSet、StatefulSet、Job、CronJob 等相关类型，你可以去了解 K8S 相关的 Controller。",-1),N=s("h3",{id:"步骤五-配置-service",tabindex:"-1"},[a("步骤五：配置 Service "),s("a",{class:"header-anchor",href:"#步骤五-配置-service","aria-label":'Permalink to "步骤五：配置 Service"'},"​")],-1),U=s("br",null,null,-1),W=s("p",null,"第 5 步是配置 Service。Service 使得 Pod 可以提供内部访问方式，对外能够抽象成一个对象，也就是 Service 这个对象。集群内部可以直接使用 Service Name 进行通信，这就是 Service 的作用。我们看一下这个图。",-1),F=s("h3",{id:"步骤六-配置-ingress",tabindex:"-1"},[a("步骤六：配置 Ingress "),s("a",{class:"header-anchor",href:"#步骤六-配置-ingress","aria-label":'Permalink to "步骤六：配置 Ingress"'},"​")],-1),H=s("p",null,"第 6 步是配置 Ingress。Ingress 可以暴露内部的服务给外部，所以它常承担是 7 层反向代理和负载均衡的作用。当把内部服务暴露到外部的时候就会用到 Ingress 这个对象，",-1),$=s("br",null,null,-1),w=s("br",null,null,-1),G=s("p",null,"在做完 Ingress 后，把服务迁移到 K8S 集群的步骤基本上就已经完成了，这是一个通用的6个步骤。",-1);function z(X,Z,ss,as,ns,es){const n=t("Image");return p(),c("div",null,[r,e(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/0B/16/Ciqah16MTOCAHEBfAAPnCtCdK5Y628.png"}),a(),d,_,h,u,e(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/0B/16/Ciqah16MTOCAQCSAAAKhbPhNDg4966.png"}),a(),S,b,E,m,g,P,K,y,v,e(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/0B/16/Ciqah16MTOGAGl1PAAPqPWzdVpo519.png"}),a(),C,e(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/0B/16/Ciqah16MTOKAMC3nAADut5Hn2xI668.png"}),a(),M,f,A,k,q,T,V,O,J,e(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/0B/16/Ciqah16MTOKAFeWAAALlWm1EIKQ939.png"}),a(),x,L,D,R,B,Q,I,e(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/0B/16/Ciqah16MTOKAfz10AAHg6mVlC2E229.png"}),a(),Y,j,N,e(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/0B/16/Ciqah16MTOOAXFDwAAL8KTjCLf4820.png"}),a(),U,W,F,H,$,e(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/0B/16/Ciqah16MTOOABerKAAQ882_XZBc624.png"}),a(),w,G])}const ts=o(i,[["render",z]]);export{os as __pageData,ts as default};
