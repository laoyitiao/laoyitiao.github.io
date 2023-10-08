import{_ as n,j as s,o as l,g as p,k as r,h as t,Q as o,s as e}from"./chunks/framework.a0d18f64.js";const J=JSON.parse('{"title":"第09讲：快速部署开发环境与框架","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/云原生微服务架构实战精讲_文档/(1813) 第09讲：快速部署开发环境与框架.md","filePath":"posts/backEnd/云原生微服务架构实战精讲_文档/(1813) 第09讲：快速部署开发环境与框架.md","lastUpdated":1696682708000}'),i={name:"posts/backEnd/云原生微服务架构实战精讲_文档/(1813) 第09讲：快速部署开发环境与框架.md"},c=o(`<h1 id="第09讲-快速部署开发环境与框架" tabindex="-1">第09讲：快速部署开发环境与框架 <a class="header-anchor" href="#第09讲-快速部署开发环境与框架" aria-label="Permalink to &quot;第09讲：快速部署开发环境与框架&quot;">​</a></h1><p>本课时将介绍&quot;快速部署开发环境与框架&quot;相关的内容。</p><br><p>在前面的课时中，我们对云原生微服务架构相关的背景知识进行了介绍，接下来的课时将进入到实际的微服务开发中。本课时作为微服务开发相关的第一个课时，将着重介绍如何准备本地开发环境，以及对示例应用中用到的框架、第三方库和工具进行介绍。</p><h2 id="开发必备" tabindex="-1">开发必备 <a class="header-anchor" href="#开发必备" aria-label="Permalink to &quot;开发必备&quot;">​</a></h2><p>开发必备指的是开发环境所必须的。</p><h3 id="java" tabindex="-1">Java <a class="header-anchor" href="#java" aria-label="Permalink to &quot;Java&quot;">​</a></h3><p>示例应用的微服务是基于 Java 8 开发的。虽然 Java 14 已经发布，示例应用仍然采用较旧的 Java 8 版本，这是因为该版本的使用仍然很广泛，并且在 Java 8 之后添加的新功能对示例应用的作用不大。如果没有安装 JDK 8，建议你去 <a href="https://adoptopenjdk.net/" target="_blank" rel="noreferrer">AdoptOpenJDK</a> 网站下载 OpenJDK 8 的安装程序。在 MacOS 和 Linux 上，可以用 <a href="https://sdkman.io/" target="_blank" rel="noreferrer">SDKMAN!</a> 来安装 JDK 8 和管理不同版本的 JDK。</p><br><p>下面是 java -version 的输出结果：</p><br><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">openjdk version &quot;1.8.0_242&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">OpenJDK Runtime Environment (AdoptOpenJDK)(build 1.8.0_242-b08)</span></span>
<span class="line"><span style="color:#E1E4E8;">OpenJDK 64-Bit Server VM (AdoptOpenJDK)(build 25.242-b08, mixed mode)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">openjdk version &quot;1.8.0_242&quot;</span></span>
<span class="line"><span style="color:#24292E;">OpenJDK Runtime Environment (AdoptOpenJDK)(build 1.8.0_242-b08)</span></span>
<span class="line"><span style="color:#24292E;">OpenJDK 64-Bit Server VM (AdoptOpenJDK)(build 25.242-b08, mixed mode)</span></span></code></pre></div><h3 id="maven" tabindex="-1">Maven <a class="header-anchor" href="#maven" aria-label="Permalink to &quot;Maven&quot;">​</a></h3><p>示例应用使用的构建工具是 Apache Maven，你可以手动安装 Maven 3.6，或使用 IDE 中自带的 Maven 来构建项目。MacOS 和 Linux 上推荐使用 <a href="https://brew.sh/" target="_blank" rel="noreferrer">HomeBrew</a> 来安装，Windows 上推荐使用 <a href="https://chocolatey.org/" target="_blank" rel="noreferrer">Chocolatey</a> 来安装。</p><h3 id="集成开发环境" tabindex="-1">集成开发环境 <a class="header-anchor" href="#集成开发环境" aria-label="Permalink to &quot;集成开发环境&quot;">​</a></h3><p>一个好的集成开发环境可以极大的提高开发人员的生产力。在 IDE 方面，主要是 IntelliJ IDEA 和 Eclipse 两个选择；在 IDE 的选择上，两者并没有太大的区别，我自己使用的 IntelliJ IDEA 社区版 2020。</p><h3 id="docker" tabindex="-1">Docker <a class="header-anchor" href="#docker" aria-label="Permalink to &quot;Docker&quot;">​</a></h3><p>本地开发环境需要使用 Docker 来运行应用所需的支撑服务，包括数据库和消息中间件等。通过 Docker，解决了不同软件服务的安装问题，使得开发环境的配置变得非常简单。从另外一个方面来说，应用的生产运行环境是 Kubernetes，其也是使用容器化部署的，这样就保证了开发环境和生产环境的一致性。为了简化本地开发流程，在本地环境上使用 Docker Compose 来进行容器编排。</p><br><p>根据开发环境的操作系统的不同，安装 Docker 的方式也不相同。一共有 3 种不同的 Docker 产品可以用来安装 Docker，分别是 Docker Desktop、Docker Toolbox 和 Docker Engine，下表给出了这 3 个产品的适用平台。对 MacOS 和 Windows 来说，如果版本支持，则应该优先安装 Docker Desktop，然后再考虑 Docker Toolbox。</p><br>`,21),h=e("br",null,null,-1),k=e("p",null,"Docker Desktop 产品由很多组件组成，包括 Docker Engine、Docker 命令行客户端、Docker Compose、Notary、Kubernetes 和 Credential Helper。Docker Desktop 的优势在于直接使用操作系统提供的虚拟化支持，可以提供更好的集成，除此之外，Docker Desktop 还提供了图形化的管理界面。大部分时候，我们都是通过 docker 命令行来操作 Docker。如果 docker -v 命令可以显示正确的版本信息，就说明 Docker Desktop 安装成功。",-1),b=e("br",null,null,-1),d=e("p",null,"下图给出了 Docker Desktop 的版本信息。",-1),u=e("br",null,null,-1),_=e("br",null,null,-1),g=e("p",null,"Docker Toolbox 是 Docker Desktop 之前的产品。Docker Toolbox 使用 VirtualBox 进行虚拟化，对系统的要求较低。Docker Toolbox 由 Docker Machine、Docker 命令行客户端、Docker Compose、Kitematic 和 Docker Quickstart 终端组成。安装完成之后，通过 Docker Quickstart 启动一个终端来执行 docker 命令。",-1),D=e("br",null,null,-1),m=e("p",null,"下图是 Docker Quickstart 终端的运行效果。",-1),f=e("br",null,null,-1),A=o('<br><p>在 Linux 上，我们只能直接安装 Docker Engine，同时还需要手动安装 Docker Compose。</p><br><p>Docker Desktop 和 Docker Toolbox 在使用上有一个显著的区别。Docker Desktop 上运行的容器可以使用当前开发环境主机上的网络，容器暴露的端口，可以使用 localhost 来访问；Docker Toolbox 上运行的容器，实际上运行在 VirtualBox 的一个虚拟机之上，需要通过虚拟机的 IP 地址来访问。我们可以在 Docker Quickstart 启动的终端上通过 docker-machine ip 命令来获取到该 IP 地址，如 192.168.99.100。容器暴露的端口，需要使用这个 IP 地址来访问，这个 IP 地址不是固定不变的。推荐的做法是在 hosts 文件中添加名为 dockervm 的主机名，并指向这个 IP 地址。在访问容器中的服务时，总是使用 dockervm 这个主机名。当虚拟机的 IP 地址改变时，只需要更新 hosts 文件即可。</p><h3 id="kubernetes" tabindex="-1">Kubernetes <a class="header-anchor" href="#kubernetes" aria-label="Permalink to &quot;Kubernetes&quot;">​</a></h3><p>在部署应用时，我们需要一个可用的 Kubernetes 集群，一般有 3 种方式创建 Kubernetes 集群。</p><br><p>第一种方式是<strong>使用云平台来创建</strong>。很多云平台都提供了对 Kubernetes 的支持，由云平台来负责 Kubernetes 集群的创建和管理，只需要通过 Web 界面或命令行工具就可以快速创建 Kubernetes 集群。使用云平台的好处是省时省力，但是开销较大。</p><br><p>第二种方式是<strong>在虚拟机或物理裸机上安装 Kubernetes 集群</strong>。虚拟机可以是云平台提供的，也可以是自己创建和管理的，使用自己维护的物理裸机集群也是可以的。有非常多的开源 Kubernetes 安装工具可供使用，如 <a href="https://rancher.com/docs/rke/latest/en/" target="_blank" rel="noreferrer">RKE</a>、<a href="https://github.com/kubernetes-sigs/kubespray" target="_blank" rel="noreferrer">Kubespray</a>、<a href="https://github.com/kubicorn/kubicorn" target="_blank" rel="noreferrer">Kubicorn</a> 等。这种方式的好处是开销比较小，不足之处是需要前期的安装和后期的维护。</p><br><p>第三种方式是<strong>在本地开发环境上安装 Kubernetes</strong>。Docker Desktop 已经自带 Kubernetes，只需要启用即可，除此之外，还可以安装 <a href="https://minikube.sigs.k8s.io/" target="_blank" rel="noreferrer">Minikube</a>。这种方式的好处是开销最低并且高度可控，不足之处是会占用本地开发环境的大量资源。</p><br><p>在上述三种方式中，云平台的方式适合于生产环境的部署。对于测试和交付准备（Staging）环境来说，则可以选择云平台，也可以从开销的角度选择自己搭建环境。本地开发环境上的 Kubernetes 在很多时候也是必须的。</p><br><p>在本地开发环境中，Docker Desktop 的 Kubernetes 需要手动启用。对于 Minikube，可以参考<a href="https://minikube.sigs.k8s.io/docs/start/" target="_blank" rel="noreferrer">官方文档</a>来进行安装。两者的区别在于，Docker Desktop 自带的 Kubernetes 版本一般会落后几个小版本。如下图所示，勾选&quot;Enable Kubernetes&quot;选项，可以启动 Kubernetes 集群。Docker Desktop 自带的 Kubernetes 版本是 1.15.5，而目前最新的 Kubernetes 版本是 1.18。</p><br>',17),v=o('<h2 id="框架与第三方库" tabindex="-1">框架与第三方库 <a class="header-anchor" href="#框架与第三方库" aria-label="Permalink to &quot;框架与第三方库&quot;">​</a></h2><p>示例应用会用到一些框架和第三方库，下面对它们进行简单的介绍。</p><h3 id="spring-框架和-spring-boot" tabindex="-1">Spring 框架和 Spring Boot <a class="header-anchor" href="#spring-框架和-spring-boot" aria-label="Permalink to &quot;Spring 框架和 Spring Boot&quot;">​</a></h3><p>Java 应用开发很难离开 Spring 框架。Spring Boot 也是目前 Java 开发微服务的流行选择之一，关于 Spring 和 Spring Boot 的介绍，不在本专栏的范围之内。示例应用的微服务会用到 Spring 框架中的一些子项目，包括 Spring Data JPA、Spring Data Redis 和 Spring Security 等。</p><h3 id="eventuate-tram" tabindex="-1">Eventuate Tram <a class="header-anchor" href="#eventuate-tram" aria-label="Permalink to &quot;Eventuate Tram&quot;">​</a></h3><p>Eventuate Tram 是示例应用使用的事务性消息框架，事务性消息模式在保持数据的一致性上有重要作用。Eventuate Tram 提供了对事务性消息模式的支持，还包括对异步消息传递的支持。Eventuate Tram 与 PostgreSQL、Kafka 进行集成。</p><h3 id="axon-服务器与框架" tabindex="-1">Axon 服务器与框架 <a class="header-anchor" href="#axon-服务器与框架" aria-label="Permalink to &quot;Axon 服务器与框架&quot;">​</a></h3><p>示例应用也使用了事件源和 CQRS 技术，事件源实现使用的是 Axon 服务器和 Axon 框架。Axon 服务器提供了事件的存储；Axon 框架则连接 Axon 服务器，并提供了 CQRS 支持。</p><h2 id="支撑服务与工具" tabindex="-1">支撑服务与工具 <a class="header-anchor" href="#支撑服务与工具" aria-label="Permalink to &quot;支撑服务与工具&quot;">​</a></h2><p>示例应用的支撑服务是运行时所必须的，相关的工具则是开发中可能会用到的。</p><h3 id="apache-kafka-和-zookeeper" tabindex="-1">Apache Kafka 和 ZooKeeper <a class="header-anchor" href="#apache-kafka-和-zookeeper" aria-label="Permalink to &quot;Apache Kafka 和 ZooKeeper&quot;">​</a></h3><p>示例应用在不同的微服务之间使用异步消息来保证数据的最终一致性，因此需要使用消息中间件。Apache Kafka 作为示例应用中使用的消息中间件，ZooKeeper 是运行 Kafka 必须的。</p><h3 id="postgresql" tabindex="-1">PostgreSQL <a class="header-anchor" href="#postgresql" aria-label="Permalink to &quot;PostgreSQL&quot;">​</a></h3><p>示例应用的某些微服务使用关系型数据库来存储数据。在众多的关系型数据库中，PostgreSQL 被选择作为示例应用中某些微服务的数据库。</p><h3 id="数据库管理工具" tabindex="-1">数据库管理工具 <a class="header-anchor" href="#数据库管理工具" aria-label="Permalink to &quot;数据库管理工具&quot;">​</a></h3><p>在开发中，我们可能需要查看关系型数据库中的数据。有很多 PostgreSQL 的客户端可供使用，包括 <a href="https://dbeaver.io/" target="_blank" rel="noreferrer">DBeaver</a>、<a href="https://www.pgadmin.org/" target="_blank" rel="noreferrer">pgAdmin 4</a>、<a href="https://omnidb.org/en/" target="_blank" rel="noreferrer">OmniDB</a> 等，还可以使用 IDE 的插件，比如 IntelliJ IDEA 上的 <a href="https://plugins.jetbrains.com/plugin/1800-database-navigator" target="_blank" rel="noreferrer">Database Navigator</a> 插件。</p><h3 id="postman" tabindex="-1">Postman <a class="header-anchor" href="#postman" aria-label="Permalink to &quot;Postman&quot;">​</a></h3><p>在开发和测试中，我们经常需要发送 HTTP 请求来测试 REST 服务，与测试 REST 服务相关的工具很多，常用的有 <a href="https://www.postman.com/" target="_blank" rel="noreferrer">Postman</a>、<a href="https://insomnia.rest/" target="_blank" rel="noreferrer">Insomnia</a> 和 <a href="https://install.advancedrestclient.com/install" target="_blank" rel="noreferrer">Advanced REST Client</a> 等。我推荐使用 Postman，是因为它可以直接导入 OpenAPI 规范文件，并生成相应的 REST 请求模板。由于我们的微服务采用 API 优先的设计方式，每个微服务的 API 都有相应的 OpenAPI 规范文件。在开发时，我们只需要把 OpenAPI 文件导入 Postman，就可以开始测试了，省去了手动创建请求的工作。</p><h2 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h2><p>在讲解实战之前，我们首先需要准备本地的开发环境。本课时首先介绍了如何安装和配置 Java、Maven、集成开发环境、Docker 和 Kubernetes；接着对示例应用中用到的框架和第三方库进行了简要介绍；最后介绍了示例应用所使用的支撑服务，以及开发中需要用到的工具。</p><br>',21);function K(q,P,x,E,S,T){const a=s("Image");return l(),p("div",null,[c,r(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/0F/DF/Ciqah16WpAGAU2o3AABJTqMWa54909.png"}),t(),h,k,b,d,u,r(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/88/F5/Cgq2xl6WpAKALcy0AAQafh63aM4363.png"}),t(),_,g,D,m,f,r(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/02/B1/CgoCgV6WpAKASDK5AAB84CacY5w047.png"}),t(),A,r(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/0F/DF/Ciqah16WpAKAfxTcAAUWZVpIgs8956.png"}),t(),v])}const C=n(i,[["render",K]]);export{J as __pageData,C as default};
