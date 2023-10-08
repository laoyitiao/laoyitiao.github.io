import{_ as n,j as r,o as p,g as i,k as o,h as t,s as e,Q as a}from"./chunks/framework.4e7d56ce.js";const y=JSON.parse('{"title":"23DevOp：容器化后如何通过DevOp提高协作效能？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/045_由浅入深吃透 Docker/(4594) 23  DevOp：容器化后如何通过 DevOp 提高协作效能？.md","filePath":"posts/backEnd/045_由浅入深吃透 Docker/(4594) 23  DevOp：容器化后如何通过 DevOp 提高协作效能？.md","lastUpdated":1696682708000}'),l={name:"posts/backEnd/045_由浅入深吃透 Docker/(4594) 23  DevOp：容器化后如何通过 DevOp 提高协作效能？.md"},c=e("h1",{id:"_23devop-容器化后如何通过devop提高协作效能",tabindex:"-1"},[t("23DevOp：容器化后如何通过DevOp提高协作效能？ "),e("a",{class:"header-anchor",href:"#_23devop-容器化后如何通过devop提高协作效能","aria-label":'Permalink to "23DevOp：容器化后如何通过DevOp提高协作效能？"'},"​")],-1),D=e("p",null,"提到 DevOps 相信很多人并不陌生，DevOps 作为一个热门的概念，近几年被提及的频率也越来越高。有些人说它是一种方法论，有些人说它是一堆工具，有些人说它是企业的一种管理模式。那么，DevOps 究竟是什么呢？Docker 在 DevOps 中又扮演了什么角色呢？今天，我们就来详细聊聊这个话题。",-1),_=e("h3",{id:"devops-的前生今世",tabindex:"-1"},[t("DevOps 的前生今世 "),e("a",{class:"header-anchor",href:"#devops-的前生今世","aria-label":'Permalink to "DevOps 的前生今世"'},"​")],-1),h=e("p",null,'1964 年，世界上的第一台计算机诞生，那时的计算机主要用于军事领域。计算机的运行离不开程序，那时负责编程的人员被称之为"程序员"。由于那时的程序比较简单，很多工作可以一个人完成，所以早期的计算软件交付流程是这样的：设计---开发---自测---发布---部署---维护。如图 1 所示：',-1),d=e("p",null,'然而，随着计算机的发展和普及，越来越多的人接触到了计算机，这时的计算机也开始逐渐应用于商业领域，市场上出现了越来越多的办公、游戏等"软件"，也有越来越多的人开始从事软件开发这个行业，而这些软件开发者也有了更加专业的称呼"软件开发工程师"。',-1),u=e("p",null,"后来，又随着计算机软件规模的增大，软件也越来越复杂，这时一个人已经无法完成一个软件完整的生命周期管理。一个软件的开发需要各个团队的分工配合，同时职能划分也需要更加细化，整个软件管理流程中除了软件工程师外又增加了测试工程师和运维工程师。",-1),v=e("p",null,"分工之后软件开发流程如下：研发工程师做代码设计和开发，测试工程师做专业的测试工作，运维工程师负责将软件部署并负责维护软件。如图 2 所示：",-1),k=e("p",null,"这种软件开发模式被称为瀑布模型，这种模式将软件生命周期划分为制定计划、需求分析、软件设计、程序编写、软件测试和运行维护等六个基本活动，并且规定了它们自上而下、相互衔接的固定次序，如瀑布流水一样，逐级的下降。",-1),g=e("p",null,'瀑布模型的模式十分理想化，它假定用户需求十分明确，开发时间十分充足，且项目是单向迭代的。但随着互联网的出现，软件迭代速度越来越快，软件开发越来越"敏捷"，这时候大名鼎鼎的"敏捷开发"出现了，敏捷开发把大的时间点变成细小的时间点，快速迭代开发，软件更新速度也越来越快。',-1),O=e("p",null,"敏捷开发对传统的开发、测试、运维模式提出了新的挑战，要求更快的开发速度和更高的软件部署频率。而运维工程师信奉的则是稳定性压倒一切，不希望软件频繁变更而引发新的问题。于是乎，敏捷开发和运维工程师之间的矛盾便诞生了。",-1),b=a("",11),m=a("",16),A=e("p",null,[e("a",{href:"https://git-scm.com/",target:"_blank",rel:"noreferrer"},"Git"),t(" 是一种分布式的版本控制工具， 是目前使用最广泛的 DevOps 工具之一。Git 相比于其他版本控制工具，它可以"),e("strong",null,"实现离线代码提交"),t("，它允许我们提交代码时未连接到 Git 服务器，等到网络恢复再将我们的代码提交到远程服务器。")],-1),q=e("p",null,"Git 非常容易上手，并且占用空间很小，相比于传统的版本控制工具（例如：Subversion、CVS 等）性能非常优秀，它可以帮助我们快速地创建分支，使得团队多人协作开发更加方便。",-1),f=e("p",null,"目前全球最大的在线 Git 代码托管服务是 GitHub，GitHub 提供了代码在线托管服务，可以帮助我们快速地将 DevOps 工作流集成起来。除了 GitHub 外，还有很多在线代码托管服务，例如 GitLab、Bitbucket 等。",-1),C=e("h4",{id:"jenkins",tabindex:"-1"},[t("Jenkins "),e("a",{class:"header-anchor",href:"#jenkins","aria-label":'Permalink to "Jenkins"'},"​")],-1),x=e("p",null,[e("a",{href:"https://www.jenkins.io/",target:"_blank",rel:"noreferrer"},"Jenkins"),t(" 是开源的 CI/CD 构建工具，Jenkins 采用插件化的方式来扩展它的功能，它拥有非常丰富的插件，这些插件可以帮助我们实现构建、部署、自动化等流程。它还拥有强大的生态系统，这些生态系统可以很方便地与 Docker 和 Kubernetes 集成。Jenkins 几乎可以和所有的 DevOps 工具进行集成。")],-1),P=e("h4",{id:"ansible",tabindex:"-1"},[t("Ansible "),e("a",{class:"header-anchor",href:"#ansible","aria-label":'Permalink to "Ansible"'},"​")],-1),V=e("p",null,[e("a",{href:"https://www.ansible.com/",target:"_blank",rel:"noreferrer"},"Ansible"),t(" 是一个配置管理工具。Ansible 可以帮助我们自动完成一些重复的 IT 配置管理，应用程序部署等任务，还可以帮助我们放弃编写繁杂的 shell 脚本，仅仅做一些 YAML 的配置，即可实现任务下发和管理工作。并且 Ansible 的每一行命令都是幂等的，它允许我们多次重复执行相同的脚本并且得到的结果都是一致的。")],-1),w=e("h4",{id:"kubernetes",tabindex:"-1"},[t("Kubernetes "),e("a",{class:"header-anchor",href:"#kubernetes","aria-label":'Permalink to "Kubernetes"'},"​")],-1),T=e("p",null,[e("a",{href:"https://kubernetes.io/",target:"_blank",rel:"noreferrer"},"Kubernetes"),t(" 是当前最流行的容器编排工具之一，Docker 帮助我们解决了容器打包和镜像分发的问题，而 Kubernetes 则帮助我们解决了大批量容器管理和调度的问题，它可以打通从研发到上线的整个流程，使得 DevOps 落地更加简单方便。")],-1),S=e("h3",{id:"结语",tabindex:"-1"},[t("结语 "),e("a",{class:"header-anchor",href:"#结语","aria-label":'Permalink to "结语"'},"​")],-1),G=e("p",null,"DevOps 虽然已经被提及很多年，但是一直没有很好的落地，直到 2013 年 Docker 的诞生，才使得 DevOps 这个理念又重新火了起来，因为 Docker 为我们解决了应用的构建、分发和隔离的问题，才使得 DevOps 落地变得更加简单。",-1),I=e("p",null,"DevOps 提倡小规模和增量的服务发布方式，并且 DevOps 还指导我们尽量避免开发大单体（把所有的功能都集成到一个服务中）应用，这一切，都与 Docker 所能提供的能力十分匹配。因此，Docker 是非常重要的 DevOps 工具。",-1),N=e("p",null,"那么，除了我介绍的这些 DevOps 工具，你还知道其他的 DevOps 工具吗？",-1),M=e("p",null,"下一课时，我将会为你讲解 DevOps 中最重要的流程持续集成与交付。",-1);function B(E,H,J,K,F,j){const s=r("Image");return p(),i("div",null,[c,D,_,h,o(s,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image/M00/6D/A8/CgqCHl-uVieAfOxkAAAwBofBN_Y124.png"}),t(),d,u,v,o(s,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image/M00/6D/9D/Ciqc1F-uVjqANUjJAABEgJx4ezg502.png"}),t(),k,o(s,{alt:"Drawing 5.png",src:"https://s0.lgstatic.com/i/image/M00/6D/9D/Ciqc1F-uVkSAK6G-AABQOfQy504986.png"}),t(),g,O,o(s,{alt:"Drawing 7.png",src:"https://s0.lgstatic.com/i/image/M00/6D/9D/Ciqc1F-uVkuAfwNzAACSxCvT8p8579.png"}),t(),b,o(s,{alt:"Drawing 9.png",src:"https://s0.lgstatic.com/i/image/M00/6D/9D/Ciqc1F-uVmOASObQAAA7V7ib-l8145.png"}),t(),m,o(s,{alt:"Drawing 10.png",src:"https://s0.lgstatic.com/i/image/M00/6D/9D/Ciqc1F-uVomAACq6AAGSnXiZ7Xg745.png"}),t(),A,q,f,C,o(s,{alt:"Drawing 11.png",src:"https://s0.lgstatic.com/i/image/M00/6D/A9/CgqCHl-uVpaAF5u_AACv-5xaZ1E856.png"}),t(),x,P,o(s,{alt:"Drawing 12.png",src:"https://s0.lgstatic.com/i/image/M00/6D/9D/Ciqc1F-uVqKAHHhCAANJIGhWQ_A950.png"}),t(),V,w,o(s,{alt:"Drawing 13.png",src:"https://s0.lgstatic.com/i/image/M00/6D/A9/CgqCHl-uVqmABoq8AAEeX_9ee0Y690.png"}),t(),T,S,G,I,N,M])}const $=n(l,[["render",B]]);export{y as __pageData,$ as default};
