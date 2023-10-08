import{_ as r,j as n,o as i,g as a,k as o,h as l,Q as s,s as e}from"./chunks/framework.a0d18f64.js";const J=JSON.parse('{"title":"第15讲：虚拟机技术与容器技术的应用","description":"","frontmatter":{},"headers":[],"relativePath":"posts/devops/112-高效敏捷测试文档/(1600) 第15讲：虚拟机技术与容器技术的应用.md","filePath":"posts/devops/112-高效敏捷测试文档/(1600) 第15讲：虚拟机技术与容器技术的应用.md","lastUpdated":1696682708000}'),p={name:"posts/devops/112-高效敏捷测试文档/(1600) 第15讲：虚拟机技术与容器技术的应用.md"},_=s('<h1 id="第15讲-虚拟机技术与容器技术的应用" tabindex="-1">第15讲：虚拟机技术与容器技术的应用 <a class="header-anchor" href="#第15讲-虚拟机技术与容器技术的应用" aria-label="Permalink to &quot;第15讲：虚拟机技术与容器技术的应用&quot;">​</a></h1><br><p>你好，我是敏捷测试专栏讲师朱少民，欢迎进入第 15 讲&quot;虚拟机技术与容器技术的应用&quot;。</p><br><p>在前面几讲中，我介绍了 CI/CD、DevOps 中的测试基础设施，测试基础设施的搭建离不开计算资源的支持，测试基础设施越庞大，我们对计算资源的需求就越多。早期的计算资源指的是物理上的主机服务器、网络或存储硬件设备；如今的计算资源可以通过虚拟化技术进行&quot;云化&quot;，即将实体资源（如 CPU、内存、硬盘和网络等）抽象成数字的或逻辑的资源，用户可以用更好的组态方式来使用这些资源，使资源分配、获取与管理更高效。</p><br><p>今天这一讲，我来介绍虚拟化技术、容器技术在测试中的应用，比如虚拟化环境中如何优化测试环境的性能、如何实现微服务虚拟化；最后，还会讲到云测试平台的应用。</p><br><p>早期的测试环境都是搭建在一个个物理机器上的，在测试过程中，如果怀疑测试环境有问题，就得从头再装一遍；在测试中发现了缺陷，常常需要在另一套测试环境里重新执行一遍，排除环境不一致带来的问题，因为手工安装方式容易带来不一致性的问题。</p><br><p>为了执行功能的兼容性测试，也需要找到几台机器安装不同的操作系统，耗费不少时间；如果做性能测试，需要把系统部署到多台机器上，一台一台地安装和维护，更加耗时耗力。</p><h3 id="虚拟化技术-虚拟机和容器技术" tabindex="-1"><strong>虚拟化技术------虚拟机和容器技术</strong> <a class="header-anchor" href="#虚拟化技术-虚拟机和容器技术" aria-label="Permalink to &quot;**虚拟化技术------虚拟机和容器技术**&quot;">​</a></h3><p>虚拟机技术的出现是一个很大的进步，能够帮助我们解决上述问题。它是在原有硬件和软件之间又加了一层软件，其核心是 Hypervisor（分层应用程序、虚拟层），对硬件资源进行模拟，模拟的硬件平台又提供了对物理硬件的访问。当服务器启动并执行 Hypervisor 时，它会给每一台虚拟机分配适量的内存、CPU、网络和磁盘，并加载所有虚拟机的客户操作系统（Guest OS）。</p><br><p>每台虚拟机由一组虚化设备构成，各个虚拟机之间的资源是相互隔离的，各个操作系统之间的进程和用户权限也是相互隔离的。如果你需要一台 CPU 4 核、内存 8G、硬盘 60G 的设备，就可以用虚拟机软件定制这样一台虚拟机。在使用中若发现资源不够了，还可以随时调整，只要不超过这台物理机的最大资源能力即可。</p><br><p>这样，虚拟机技术为软件测试解决了两个难题：</p><ul><li><p>通过虚拟机技术，一台物理机可以虚拟出多台服务器，这样就可以安装多个不同的操作系统；</p></li><li><p>只要在一台虚拟机上部署好所需的操作系统和测试环境，就可以制作出镜像文件部署到其他虚拟机上，不用再担心人工部署造成的错误和测试环境不一致的问题，测试环境的恢复也可以用镜像文件来完成，几分钟就可以搞定。</p></li></ul><br><p>另外，虚拟机技术可以大大提高测试服务器的利用率并节省测试环境的维护成本，因为资源可以快速地实现动态分配，物理机器需要的数量也大大减少，需要的机柜、网线、电量则更少。</p><br><p>目前比较流行的虚拟机技术是 X86 平台的 Linux 虚拟机解决方案，主要的软件包括 VMware Workstation、KVM、Virtual Box、Xen 等。</p><br><p>但是在虚拟机的使用过程中，人们逐渐感觉到这种技术的缺点：每个虚拟机都需要一个操作系统，操作系统占用的资源比较大、启动速度慢。在实际的软件运行环境中，我们其实不需要关心操作系统及其依赖环境，有没有什么方法让我们无需关注系统环境的配置，只关注应用系统本身？</p><br><p>这就是容器技术可以解决的问题：在操作系统之上，每个容器内运行一个应用，通过 Linux 的命名空间（NameSpace）技术实现应用之间既相互隔离又相互通信，底层的系统环境可以共享。</p><br>',27),c=s('<p>图1 虚拟机技术和容器技术的比较</p><br><p>Docker 最初是一个开源的容器项目，诞生于 2013 年，现在几乎成了容器的代名词，容器技术最早可以追溯到 1982 年，但一直没有形成一个标准且提供良好的管理工具。而 Docker 真正实现了对应用的打包、分发、部署、运行的全面管理，达到了应用级别的&quot;<strong>一次封装，到处运行</strong>&quot;，所以它成为了事实上的工业标准。</p><br><p>相比虚拟机分钟级别的部署来说，Docker 容器的创建和启动更快，是秒级的部署。Docker 的镜像体积要小很多，对系统资源的占用更少，一台主机上可以安装 10 ~ 20 台虚拟机，但是可以运行几千个、甚至上万个 Docker 容器。另外，Docker 通过 Dockerfile 对容器进行灵活、快速的部署，结合 CI/CD 的其他工具实现了应用级别的持续交付和集群管理，这将在第 17 讲中进一步讲解。</p><br><p>虽然 Docker 和虚拟机相比有很多优点，但并不是说 Docker 一定会取代虚拟机。实际上，它们可以是共生的模式，企业可以把 Docker 部署在物理主机上，也可以部署在虚拟机上。</p><h3 id="sidecar-模式-容器的设计模式" tabindex="-1"><strong>Sidecar 模式------容器的设计模式</strong> <a class="header-anchor" href="#sidecar-模式-容器的设计模式" aria-label="Permalink to &quot;**Sidecar 模式------容器的设计模式**&quot;">​</a></h3><p>目前微服务都会用到容器技术进行部署和管理。每个微服务的主要功能是处理业务逻辑，但是也需要处理一些和业务无关的任务，比如监控容器的工作状态、日志收集等。Sidecar（边车）模式提出了一种新的容器和微服务架构的设计模式，可以实现辅助功能与业务功能的分离：把辅助功能用单独的微服务实现，与实现业务功能的微服务部署在各自的容器中。</p><br><p>Sidecar 容器和业务主容器一起部署在同一个 Kubernetes Pod 里，为业务容器提供辅助功能。这种设计方式有非常明显的优势，将辅助功能与业务功能解耦，业务主容器只需要关注业务的实现，而且 Sidecar 容器可以被多个业务主容器甚至是多个业务系统复用。因此，<strong>Sidecar 的设计模式被认为是下一代微服务架构的关键</strong>。</p><br>',12),u=s('<p>图2 Sidecar 容器设计模式</p><h3 id="虚拟化技术之-numa-和-dpdk" tabindex="-1"><strong>虚拟化技术之 NUMA 和 DPDK</strong> <a class="header-anchor" href="#虚拟化技术之-numa-和-dpdk" aria-label="Permalink to &quot;**虚拟化技术之 NUMA 和 DPDK**&quot;">​</a></h3><p>下面将介绍 Linux 环境下系统性能优化相关的两项技术。如果你负责软件系统的性能测试，或者遇到系统 CPU 占用过高而导致的系统功能异常，你就会用到这些知识点。</p><br><p>首先介绍 <strong>NUMA</strong> （Non-Uniform Memory Access，非一致性内存访问），它是一种支持对主机系统多 CPU 进行集群配置的技术，是现在主机系统的主流 CPU 架构。利用 NUMA 技术，可以把几十个 CPU 组合在一台服务器内，将 CPU 和内存划分到多个节点（node），如图 3 所示。</p><br><p>每个 CPU 都可以访问本节点内的内存，也可以访问其他节点的内存，但是访问自己节点内的内存要快得多，所以，在 NUMA 架构的主机上，系统性能优化的一个方面就是让 CPU 尽量访问自己节点内的内存。</p><br>',8),d=e("p",null,"图3 NUMA 工作示意图",-1),h=e("br",null,null,-1),b=e("p",null,'在虚拟机环境下可以实现同一个虚拟机的所有虚拟 CPU（vCPU）尽可能调度到同一个物理 CPU 上，并且将这个虚拟机的所有"物理内存"尽可能分配给和物理 CPU 属于同一节点的内存，从而有助于提高虚拟机的性能。Linux 提供了一个用于性能调优的工具 Numactl，通过它可以查看系统的 NUMA 状态，可以将一个进程绑定在某个节点上执行。',-1),A=e("br",null,null,-1),g=e("p",null,"下面是一些 numactl 常用的命令：",-1),m=e("br",null,null,-1),D=e("br",null,null,-1),P=e("p",null,"如果是 Linux 系统上的 Docker 环境，默认情况下，容器可以使用的主机 CPU 资源是不受限制的，但是一旦发生容器内程序异常使用 CPU 的情况，很可能把整个主机或虚拟机的 CPU 资源耗尽。可通过 Docker 命令来限制某个容器使用 CPU 的个数，以及使用哪个节点的 CPU 或内存。",-1),C=e("br",null,null,-1),k=s('<br><p>其次介绍 <strong>DPDK</strong> （Data Plane Development Kit），它是一种 X86 平台上报文处理加速技术，在 Linux 虚拟化环境中通过绑定和优化物理网卡驱动，优化了数据包处理的效率，提高 I/O 性能。我们可以从 DPDK 官网下载其安装包进行安装配置，这样就可以让 DPDK 接管网卡。</p><h3 id="服务虚拟化的利器-hoverfly" tabindex="-1"><strong>服务虚拟化的利器------Hoverfly</strong> <a class="header-anchor" href="#服务虚拟化的利器-hoverfly" aria-label="Permalink to &quot;**服务虚拟化的利器------Hoverfly**&quot;">​</a></h3><p>微服务架构是目前最流行的软件架构风格，一个软件系统由多个相互独立的微服务组成，每个微服务可以独立开发、独立部署。微服务之间通过轻量级的交互机制进行通信，比如 HTTP 协议的 Restful API。</p><br><p>微服务之间在业务上存在依赖关系，大多数的业务场景需要多个微服务互相调用来完成。这就给我们的测试带来挑战：当某个微服务所依赖的其它两个微服务处于不稳定或不可用状态时，如何对这个微服务进行测试？</p><br><p>你可以创建 Mock Service 来模拟依赖的两个微服务，然后针对微服务进行单元测试或接口测试，比如像 WireMock 这样的测试框架；你也可以选择 Hoverfly 这样的服务虚拟化工具来模拟依赖服务，服务虚拟化是指用来模拟特定服务行为的技术和方法。</p><br><p>Hoverfly 提供的功能包括：</p><ul><li><p>可以在微服务测试中捕获 / 模拟多个实际服务，不需要自己编写请求和响应的脚本；</p></li><li><p>可以在持续集成环境中替代缓慢和不稳定的外部服务；</p></li><li><p>可以模拟网络延迟，随机故障或速率限制以测试边缘情况；</p></li><li><p>导入 / 导出、共享和编辑 API 模拟数据。</p></li></ul><br>',12),T=e("p",null,"图4 Hoverfly 捕获模式和模拟模式",-1),U=e("br",null,null,-1),M=e("p",null,"当 Hoverfly 处于捕获模式，它可以捕获到服务的请求和响应，并随后导出到一个 .json 文件。把 Hoeverfly 切换到模拟模式，就可以模拟刚才的服务做出响应，如图 4 所示，相关命令如下所示：",-1),S=e("br",null,null,-1),f=e("h3",{id:"molecule-虚拟化技术的自动化测试工具",tabindex:"-1"},[e("strong",null,"Molecule------虚拟化技术的自动化测试工具"),l(),e("a",{class:"header-anchor",href:"#molecule-虚拟化技术的自动化测试工具","aria-label":'Permalink to "**Molecule------虚拟化技术的自动化测试工具**"'},"​")],-1),q=e("p",null,"Molecule 是一个开源的软件工具，可以帮助开发和测试 Ansible 在部署中用到的配置脚本。Ansible 在 Devops 工具链里是一个自动化的部署工具，主 playbook 文件通过调用 roles 目录下的 role，来实现各种灵活多变的部署需求。你可以为每一个微服务的容器创建一个 role，部署的具体任务在 role 里进行定义。Molecule 在虚拟机或容器上为正在运行的 Ansible Role 测试构建脚手架，无需再手工创建这些测试环境。",-1),v=e("br",null,null,-1),x=e("p",null,"图5 Molecule 工作流程",-1),I=e("br",null,null,-1),N=e("p",null,"Molecule 利用 Vagrant、Docker 和 OpenStack 来管理虚拟机或容器，并支持 Serverspec、Testinfra 或 Goss 来运行测试，如图 5 所示。在 sequence facility model 中的默认步骤包括：虚拟机管理、Ansible 语法静态检查、幂等性测试和收敛性测试。",-1),V=e("br",null,null,-1),K=e("p",null,"运行 molecule 的脚本如下所示：",-1),L=e("br",null,null,-1),y=e("br",null,null,-1),H=e("p",null,"运行的测试脚本如下所示：",-1),E=e("br",null,null,-1),R=e("h3",{id:"kubernetes-与测试环境",tabindex:"-1"},[e("strong",null,"Kubernetes 与测试环境"),l(),e("a",{class:"header-anchor",href:"#kubernetes-与测试环境","aria-label":'Permalink to "**Kubernetes 与测试环境**"'},"​")],-1),z=e("p",null,"为了支持大规模的并发业务，企业一般都需要把服务部署到容器集群。Kubernetes（简称 K8s）是目前最具影响力的容器集群管理工具，为容器化的应用提供部署运行、资源调度、服务发现和动态伸缩等一系列完整功能，提高了大规模容器集群管理的便捷性，所以，它可用于部署和管理容器化的测试环境，尤其是性能测试环境和准生产环境。",-1),O=e("br",null,null,-1),X=e("p",null,"Kubernetes 提供的管理能力能够很好的支持业务的可伸缩性（Scalability）。伸缩性是指：如果系统的工作负载增加，只需生成更多容器或者在容器集群中增加更多的节点就可以提高整个集群的处理能力。",-1),F=e("br",null,null,-1),B=s("<p>图6 Kubernetes 容器集群管理</p><br><p>另外，云测试平台是 Kubernetes 进行测试基础设施管理的典型场景。云测试平台是云计算和虚拟化技术在软件测试领域的应用，通过虚拟机、容器技术及容器集群管理工具来搭建测试基础设施，然后按需提供给用户各种测试服务。</p><br><p>目前云测试平台主要支持手机端 App 和 Web 应用的测试，比如兼容性测试、功能测试、性能测试、安全测试等。用户通过浏览器上传被测应用、测试脚本，使用云测试平台提供的测试工具进行测试，测试结束后下载测试结果。</p><br><p>最后，我简单总结一下今天的主要内容：</p><ul><li><p>相比虚拟机，Docker 技术是更加轻量级的虚拟化技术；</p></li><li><p>Sidecar 做为一种新的容器和微服务设计模式，实现了辅助功能对业务功能的解耦，也实现了辅助功能在不同微服务之间的重用；</p></li><li><p>理解 NUMA 技术可以帮助你在 Linux 环境下更好的对系统进行性能优化；</p></li><li><p>在微服务测试中，服务虚拟化的工具 Hoverfly 可以用来模拟多个依赖服务的行为；</p></li><li><p>Molecule 利用虚拟化技术实现对 Ansible 配置信息的自动化测试；</p></li><li><p>Kubernetes 提供的容器集群管理可以用来部署和管理容器化的测试环境。</p></li></ul><br><p>最后留一个思考题：除了手机 App 的测试，你认为将来的云测试平台还可以提供哪些测试服务？</p>",10);function w(G,Q,$,W,Y,j){const t=n("Image");return i(),a("div",null,[_,o(t,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/78/4D/Cgq2xl5ziLmAXVD_AAR2SXmy_Lg464.png"}),l(),c,o(t,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/78/4D/Cgq2xl5ziLmAXQlPAACe6B3-Kg0159.png"}),l(),u,o(t,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/78/4D/Cgq2xl5ziLmAbmF-AABhqE68RKk310.png"}),l(),d,h,b,A,g,m,o(t,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/78/4D/Cgq2xl5ziLqAQfXHAAEmwXU3n98841.png"}),l(),D,P,C,o(t,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/78/4D/Cgq2xl5ziLqATeYlAAGRtugwqus985.png"}),l(),k,o(t,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/78/4D/CgpOIF5ziLqAeAT4AAFUtEcDKpk241.png"}),l(),T,U,M,S,o(t,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/78/4D/CgpOIF5ziLqAAcw_AAEDM6Shcl8178.png"}),l(),f,q,v,o(t,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/78/4D/CgpOIF5ziLuAEcwkAAEHbiMUDBA190.png"}),l(),x,I,N,V,K,L,o(t,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/78/4D/CgpOIF5ziLuAfYddAAAQmZ9UdiA332.png"}),l(),y,H,E,o(t,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/78/4D/CgpOIF5ziLuAVQNcAAH2YU8A0R4613.png"}),l(),R,z,O,X,F,o(t,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/78/4D/CgpOIF5ziLuAE6VXAARbNZRIUic898.png"}),l(),B])}const ee=r(p,[["render",w]]);export{J as __pageData,ee as default};
