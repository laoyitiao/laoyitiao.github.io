import{_ as p,j as a,o as l,g as n,k as s,s as t,Q as o,h as i}from"./chunks/framework.b3d8e22e.js";const W=JSON.parse('{"title":"DevOps 的测试 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/devops/112-高效敏捷测试文档/(1599) 第14讲：基于 DevOp 的测试基础设施构成.md","filePath":"posts/devops/112-高效敏捷测试文档/(1599) 第14讲：基于 DevOp 的测试基础设施构成.md","lastUpdated":1696417798000}'),r={name:"posts/devops/112-高效敏捷测试文档/(1599) 第14讲：基于 DevOp 的测试基础设施构成.md"},_=t("p",null,'2009 年 6月，在美国 San Jose 第二届 Velocity 大会上 "10+ Deploys Per Day: Dev and Ops Cooperation at Flickr"的这个演讲，成为 DevOps 开始被引用的标志性事件。',-1),c=t("br",null,null,-1),u=t("p",null,"最初，DevOps 被定义为一组用于促进开发、运维和 QA 部门之间沟通、协作与整合的解决方案，它强调自动化软件交付和基础设施变更的过程，以帮助组织快速、频繁和可靠地发布软件，并提高软件的操作性能和质量保证。",-1),g=t("br",null,null,-1),d=o('<p>图 1 DevOps 示意图</p><br><p>后来，DevOps 被视为敏捷或 CI/CD 的自然延伸，从研发周期向右扩展到部署、运维，不仅打通研发的&quot;需求、开发与测试&quot;各个环节，还像图 1 所示的那样打通了&quot;研发&quot;与&quot;运维&quot;之间的壁垒。在软件构建、集成、测试、发布、部署和基础设施管理中大力提倡自动化和监控，构建了贯穿产品研发、交付、部署和运维等完整生命周期的工具链。DevOps 的目标是缩短软件开发周期，增加部署频率，实现可靠的发布。</p><br><p>如果说敏捷研发模式是推倒&quot;开发&quot;与&quot;测试&quot;之间无形的墙，那么 DevOps 就推倒了整个&quot;研发&quot;与&quot;运维&quot;之间无形的墙，这个说法你可以参照第 8 讲图 1 的说明。</p><br><p>所以，这里的&quot;Dev&quot;涵盖了整个研发，包括开发、测试（Test）、产品等角色。我个人认为：不存在 TestOps，最好也不要用 DevQAOps 和 DevSecOps。因为之前质量保证（QA）、安全性（Security）等内容也都融于 Dev 和 Operation，并不是 Dev 或者 Operation 之前没有质量保证或安全，但现在DevOps需要有，而只是 Dev 和 Operation 之间打通了，QA 和 Security 自然也从原来的&quot;贯穿整个软件研发生命周期&quot;转换到&quot;贯穿整个软件生命周期&quot;，所以不能将测试、QA 和安全性从 DevOps 中分离出来，而且测试和开发也不能隔离。</p><br><p>下面就是围绕这样的概念和理解来讨论基于 DevOps 的测试基础设施。</p><br><p>DevOps 的另一个核心点就是追求软件全生命周期的自动化，即在原来自动化构建、自动化集成的基础上进行自动化部署、自动化运维、自动化收集和分析用户的反馈等，从而实现自动化的闭环。</p><br><p>其中，自动化测试仍然是重要的一环，只是不再局限于研发环境的自动化测试，它涵盖了部署验证、生产环境设置验证、在线测试与监控的自动化实现，即通常所说的&quot;测试右移&quot;。如果这部分验证和测试跟不上，测试就将成为 DevOps 的瓶颈，系统运维就会存在极大风险，而我们都知道运维质量对用户的影响更为直接、更为重要。</p><h3 id="devops-的测试" tabindex="-1"><strong>DevOps 的测试</strong> <a class="header-anchor" href="#devops-的测试" aria-label="Permalink to &quot;**DevOps 的测试**&quot;">​</a></h3><p>那么，DevOps 的测试和非 DevOps 的测试有什么区别呢？</p><br><p>如果没有 DevOps，就如同第 12 讲中所说的，敏捷只做到了 CI/CD，从产品概念和定义开始到产品交付过程中可以做到持续交付。而如果实施了 DevOps，就意味着向运维延伸，将对 SaaS 这类软件服务是非常好的，意味着真正可以形成闭环，如图 2 所示。</p><br>',18),h=o('<p>图 2 在 2005 年设计的软件研发与运维质量保证全流程图</p><br><p>虽然 2005 年还没有 DevOps 概念，但由于 WebEx、SalesForce 等公司就是为 SaaS 而生的，从诞生那天起就拥有了&quot;软件即服务&quot;的基因，自然会更早地实施今天才流行的 DevOps 实践。</p><br><p>从图 2 可以看出，在交付之后，测试还有许多工作要做，包括：</p><ul><li><p><strong>在线测试</strong> ，如易用性A/B 测试（类似于&quot;蓝绿部署&quot;）、性能测试（如图 2 的性能基准度量）、安全性监测、可靠性测试（如在线故障注入：混沌工程）等；</p></li><li><p><strong>部署验证</strong> ，类似构建CI验证所执行的 BVT，但这里侧重验证部署和设置是否正确；</p></li><li><p><strong>灾备的在线演练</strong> ，虽然这样的演练风险比较大，但需要找到一个特定的时间盒，验证系统是否具有故障转移能力，能否达到高可用性；</p></li><li><p><strong>客户反馈</strong> ，包括在线客户反馈的数据分析、系统后台的日志分析等。</p></li></ul><br><p>这里虽然没有提到灰度发布（类似的概念还有&quot;金丝雀发布&quot;等），但从流量万分之一、千分之一开始逐步扩大产品分发（部署）的范围，也相当于让用户帮忙做测试，属于过去&quot;Alpha 测试&quot;和&quot;Beta 测试&quot;的概念。在敏捷中，我们只是希望这样的过程更快、更持续，比如做到一键部署、一键回滚等。</p><h3 id="devops-测试基础设施" tabindex="-1"><strong>DevOps 测试基础设施</strong> <a class="header-anchor" href="#devops-测试基础设施" aria-label="Permalink to &quot;**DevOps 测试基础设施**&quot;">​</a></h3><p>清楚了 DevOps 模式下所增加的测试工作之后，我们是不是可以接受&quot;生产环境&quot;成为测试基础设施的一部分，甚至是最重要的一部分？</p><br><p>所以在 DevOps 模式下，我们将测试环境从研发的 CI/CD 环境扩展到准生产环境、甚至到生产环境，从而<strong>构成一个贯穿研发和运维的、完整的</strong> <strong>DevOps</strong> <strong>测试基础设施</strong>。</p><br><p>为此，我们先重温一下第 12 讲的 CI/CD 环境设置（见第 12 讲图4），当时我们已经将 8 类工具集成起来了，包括代码管理、版本构建、CI 调度、自动部署、配置管理、代码静态分析、单元测试和版本验证等工具，差不多覆盖了咱们日常测试工作中会遇到的各类工具。如果我们构造上述的 DevOps 测试基础设施，这些工具是否足够呢？</p><br><p>这种情况下，自然就不够了。因为环境的基础架构和规模都发生较大的变化，环境中也存在大量的用户数据和系统运行日志，而且线上测试需要小心翼翼，往往采用被动方式做测试，即进行监控，收集数据进行分析来发现问题。</p><br><p>所以，这时的重点在于如何有效管理测试数据（包括系统运行日志），以及监控系统运行状态、性能，并基于大数据和人工智能等技术进行分析，以获得系统的可靠性、性能和用户体验的信息。发现这方面问题并进行系统优化，这其实也是 DevOps 的价值所在。关于在线测试、性能监控和日志分析等具体内容，我们将会在第 45 讲中进行详细的讨论。</p><br><p>根据上述讨论，我们在第 12 讲 CI/CD 环境的基础上，再增加 8 类工具（合起来是16类工具），这些工具也在我们需要熟悉和掌握的范围之内：</p><ul><li><p>基础架构类，如 CloudFormation、OpenStack 等；</p></li><li><p>容器类工具，如 Docker、Rocket、ElasticBox 等；</p></li><li><p>资源编排管理工具，如 Kubernetes（K8S）、Apache Mesos、Swarm 等；</p></li><li><p>微服务平台，如 OpenShift、Cloud Foundry、Mesosphere 等；</p></li><li><p>日志管理，如 Elastic Stack（ElasticSearch、Logstash、Kibana 和 Beats）、Logentries、Splunk 等；</p></li><li><p>系统监控、警告 &amp; 分析，如 Prometheus、Icinga 2、Nagios Core、Zabbix、Cacti、Zookeeper 等；</p></li><li><p>性能监控，如 AppDynamics、Datadog、DynaTrace、New Relic、CollectD、StatsD 等；</p></li><li><p>知识管理和沟通协作类工具，如 MediaWiki、Confluence、Zoom 等。</p></li></ul><br><p>在 DevOps 下，配置也需要验证，所以像 Puppet 和 Chef 分别使用 RSpec-puppet 和 Kitchen 来作为各自的测试框架支持其配置的验证，下面是 RSpec-puppet 测试脚本的一个简单示例。</p><br>',24),D=t("h3",{id:"基础设施即代码",tabindex:"-1"},[t("strong",null,"基础设施即代码"),i(),t("a",{class:"header-anchor",href:"#基础设施即代码","aria-label":'Permalink to "**基础设施即代码**"'},"​")],-1),b=t("p",null,'在今天的测试基础环境中，一些硬件也已被"云资源"的概念所代替，以物理基础架构实现"云化"（如同我们常说的"软件定义硬件"）。按 AWS（Amazon Web Services，亚马逊云计算、云平台服务）术语来说，它们可以是 EC2 实例、ELB（负载均衡器）、Lambda 函数和 S3 存储桶等资源。',-1),v=t("br",null,null,-1),q=t("p",null,'使用工具来进行手工操作必然会成为快速部署和运维配置等步骤的瓶颈，所以"基础设施即代码（Infrastructure as a Code，IaC）"这个概念被提出来了，将基础设施以配置文件的方式纳入版本管理，以达到更灵活和更快捷的操作，这种通过类似代码的方式来自动地完成所有运维操作，也可以理解成一切皆为 API，如图 3 所示。',-1),C=t("br",null,null,-1),A=o('<p>图 3 基于统一的 Restful 接口完成测试平台的管理</p><br><p>为了区分普通的 CI / CD 工具，将这种 IaC 类工具的特征概括为以下三点。</p><ul><li><p><strong>版本控制</strong> ：这显然是将基础结构、配置、容器和管道持久化作为代码最重要的部分。该工具的配置文件应具有可读性和版本控制性的语法，所以不能采用大型虚拟机镜像那样的二进制文件。</p></li><li><p><strong>模块化</strong> ：最好的代码是可复用的，所以支持&quot;模块化&quot;的工具也要具备复用性，且能实现模块的参数化。</p></li><li><p><strong>可实例化或可部署</strong> ：该工具必须能够将代码（它可以是管道、配置的实例、容器或对云基础架构的更改）输入并部署到环境中，这样的工具必须是纯脚本的，而且是全自动的，不需要手工操作或配置。</p></li></ul><br><p>从这个角度来过滤工具，只有下列这些工具符合 IaC 类工具：</p><ul><li><p>&quot;基础架构即代码&quot;工具，适用于基础架构流程，如 Terraform、CloudFormation 等；</p></li><li><p>&quot;配置即代码&quot;工具，用于配置管理，有 Chef、Puppet、Ansible 和 SaltStack；</p></li><li><p>&quot;容器即代码&quot;工具，用于应用程序容器化，只有 Docker、Kubernetes 等；</p></li><li><p>&quot;管道即代码&quot;工具，用于持续集成和交付，Jenkins 还不能算，只有 Drone.io 和 ConcourseCI 算。</p></li></ul><br><p>由于篇幅有限，无法逐个进行介绍，而且在下一讲我们会谈到容器，它将会涵盖&quot;容器即代码&quot;工具，第 17 讲我会详细介绍基于管道部署的内容，包括具有云基础架构能力的 Terraform 工具。下面我们就以 Testinfra 工具为例，讨论如何针对基础设施进行验证。</p><h3 id="testinfra" tabindex="-1"><strong>TestInfra</strong> <a class="header-anchor" href="#testinfra" aria-label="Permalink to &quot;**TestInfra**&quot;">​</a></h3><p>Testinfra 是一个功能强大的库，可用于编写测试以验证基础设施的状态。为了提高测试基础设施的运维效率，Testinfra 和 Molecule、Serverspec 等类似，可以通过与工具无关的描述方式来验证基础设施的正确性，并能与 Ansible 、Nagios 或 unittest 集成，这样，基于 Testinfra 这类工具的自动化测试（如直接从 Nagios 主控节点上运行测试），不仅是流行的系统监控解决方案，能够及时捕获意外并触发监控系统上的警报，还能实现 IaC（架构即代码） 验证的解决方案。</p><br><p>Testinfra 可以使用 Molecule 开发 Ansible 角色过程中添加测试关键组件，也可以和虚拟机管理工具 Vagrant、CI 工具 Jenkins/KitchenCI 等集成起来，轻松完成 DevOps 模式下的全自动化流水线式的验证。下面是一个简单的 TestInfra 脚本示例。</p><br>',14),I=t("br",null,null,-1),O=t("p",null,"这里 TestInfra 连接 ssh 服务器，还可以增加配置和身份识别，例如：",-1),T=t("br",null,null,-1),m=t("br",null,null,-1),S=t("p",null,"如果未通过 --ssh-identity-file 标志提供 ssh 身份文件，那么 testinfra 将尝试使用 ansible_ssh_private_key_file 和 ansible_private_key_file，并使用具有 ansible_ssh_pass 变量的 ansible_user 来确保安全的连接。Testinfra 还为 Ansible 提供了可用于测试的 API，这使得我们能够在测试中运行 Ansible 动作，并且能够轻松检查动作的状态，比如可以报告 Ansible 远程主机上执行动作时所发生的变化。",-1),f=t("br",null,null,-1),k=o('<br><p>TestInfra 还可以连接 docker，如下所示：</p><br><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">$ py.test --hosts=&#39;docker://[user@]container_id_or_name&#39;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">$ py.test --hosts=&#39;docker://[user@]container_id_or_name&#39;</span></span></code></pre></div><br><p>下面这里展示了 TestInfra 支持脚本参数化的处理过程：</p><br>',7),E=t("br",null,null,-1),P=t("p",null,"同时，TestInfra 也支持和单元测试框架（如 unittest）集成：",-1),x=t("br",null,null,-1),M=o("<br><p>那么这一讲的主要内容就介绍到这里，我们来总结一下这讲所学的内容：</p><ul><li><p>DevOps 可以被看作是敏捷或 CI/CD 的自然延伸，不仅推倒了&quot;研发&quot;与&quot;运维&quot;之间无形的墙，而且提倡在软件构建、集成、测试、发布到运维全生命周期的自动化实现；特别说明这里的&quot;Dev&quot;是指整个研发，包括开发、测试、产品等；</p></li><li><p>介绍了在 DevOps 模式下，测试右移所要做的工作，包括灰度发布、在线测试、部署验证、灾备的在线演练和客户反馈等；</p></li><li><p>在原有 CI/CD 环境的基础上，再增加 8 类工具，构建完整的 DevOps 测试基础设施；</p></li><li><p>侧重讨论更为灵活和高效的&quot;基础设施即代码&quot;概念及其应用，这样基础设施环境也可以做到<strong>版本控制、模块化和实例化</strong> ，从而引出基础架构即代码、配置即代码、容器即代码和管道即代码等 <strong>4 类这样的工具</strong>；</p></li><li><p>快速地介绍了验证基础设施状态的测试库 Testinfra。</p></li></ul><p>为了增强我们之间的互动，给你出一个思考题：你了解 Serverspec 吗？它和 TestInfra 相比，优势和劣势有哪些？</p>",4);function y(V,N,F,B,R,Q){const e=a("Image");return l(),n("div",null,[_,c,u,g,s(e,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/76/E2/CgpOIF5xgtaAD9FmAAL8M7N_k9g676.png"}),d,s(e,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/76/E2/CgpOIF5xgvKABaOpAAIXcFpSMxQ489.png"}),h,s(e,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/76/E3/CgpOIF5xgwGAcIHPAAJItLUUPNY122.png"}),D,b,v,q,C,s(e,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/76/E3/CgpOIF5xgw6Aden0AAFbA64S5eM791.png"}),A,s(e,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/76/E3/CgpOIF5xgxuAOODZAAEh0Ej5WBM944.png"}),I,O,T,s(e,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/76/E3/Cgq2xl5xgyaAW-abAAC1ghSIuuY955.png"}),m,S,f,s(e,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/76/E3/Cgq2xl5xgzWAPwa8AADjsw4GsHQ745.png"}),k,s(e,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/76/E3/Cgq2xl5xg0KAPM1fAAIMeW7CIcE667.png"}),E,P,x,s(e,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/76/E3/CgpOIF5xg06AeDL9AAI_lDIwC2Q851.png"}),M])}const w=p(r,[["render",y]]);export{W as __pageData,w as default};
