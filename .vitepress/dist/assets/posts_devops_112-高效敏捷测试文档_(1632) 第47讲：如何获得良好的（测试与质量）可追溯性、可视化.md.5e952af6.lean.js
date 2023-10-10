import{_ as o,j as n,o as r,g as l,k as e,h as t,s as a,Q as i}from"./chunks/framework.cfb14fe0.js";const Y=JSON.parse('{"title":"第47讲：如何获得良好的（测试与质量）可追溯性、可视化","description":"","frontmatter":{},"headers":[],"relativePath":"posts/devops/112-高效敏捷测试文档/(1632) 第47讲：如何获得良好的（测试与质量）可追溯性、可视化.md","filePath":"posts/devops/112-高效敏捷测试文档/(1632) 第47讲：如何获得良好的（测试与质量）可追溯性、可视化.md","lastUpdated":1696682708000}'),_={name:"posts/devops/112-高效敏捷测试文档/(1632) 第47讲：如何获得良好的（测试与质量）可追溯性、可视化.md"},c=a("h1",{id:"第47讲-如何获得良好的-测试与质量-可追溯性、可视化",tabindex:"-1"},[t("第47讲：如何获得良好的（测试与质量）可追溯性、可视化 "),a("a",{class:"header-anchor",href:"#第47讲-如何获得良好的-测试与质量-可追溯性、可视化","aria-label":'Permalink to "第47讲：如何获得良好的（测试与质量）可追溯性、可视化"'},"​")],-1),p=a("p",null,"上一讲介绍了如何度量和评估测试工作的质量，以及对测试过程进行量化管理。实现量化管理不仅要有度量体系，要实现度量指标的可视化才够完美，对于产品质量的评估也是如此，这就离不开一个数据统计、分析的呈现平台。",-1),h=a("p",null,"测试用例和缺陷需要测试管理系统进行跟踪管理。在此基础上实现三者之间的可追溯性，就能更容易解决需求变更、回归测试范围确定、质量评估等一系列重要的问题。",-1),d=a("p",null,"下面首先介绍测试管理系统。",-1),g=a("h3",{id:"测试管理系统",tabindex:"-1"},[t("测试管理系统 "),a("a",{class:"header-anchor",href:"#测试管理系统","aria-label":'Permalink to "测试管理系统"'},"​")],-1),u=a("p",null,"在测试管理系统中，管理的核心是测试用例和缺陷。一个测试管理系统的构成如图 1 所示。",-1),f=i("",8),m=a("p",null,"图2 需求、测试用例、缺陷之间的映射关系图",-1),b=a("p",null,"在测试管理工具中，测试用例的执行状态需要测试人员手工更新。对于有对应自动化测试脚本的测试用例，理想的状态是可以把自动化测试执行的结果自动同步到测试管理工具，自动更新测试用例的状态------是 Pass 还是 Fail。这可以通过测试管理工具和测试自动化工具的集成来实现，也可以通过测试管理工具和 CI 工具的集成来实现。",-1),A=a("h3",{id:"jira-zephyr-实现可追溯",tabindex:"-1"},[t("Jira + Zephyr 实现可追溯 "),a("a",{class:"header-anchor",href:"#jira-zephyr-实现可追溯","aria-label":'Permalink to "Jira + Zephyr 实现可追溯"'},"​")],-1),B=a("p",null,"Jira 是支持敏捷开发的、常用的项目管理工具，围绕着 Jira 又发展出一批测试用例管理工具。Jira 提供从 Epic 到用户故事的需求管理以及缺陷跟踪。测试用例管理工具和 Jira 的集成可以实现需求、测试用例与缺陷的映射关系。目前有一些测试用例工具以插件的形式和 Jira 进行集成，比如 Zephyr、Xray 等。",-1),C=a("p",null,"Zephyr 是主流的测试用例管理工具之一。Zephyr for Jira 以插件形式运行在 Jira 系统中，其利用了 Jira 的管理界面，可以在 Jira 里生成测试用例并直接关联到 Epic 和用户故事、缺陷。",-1),J=a("p",null,"Zephyr for Jira 可以和多种自动化测试工具集成，将自动化测试的结果自动同步到 Jira 中。可以集成的自动化测试工具包括 SoapUI Pro、Cucumber for Jira、Selenium、JUnit、TestNG 等。",-1),S=a("p",null,"另外，Jira、Zephyr for Jira 还可以和 CI 调度工具 Jenkins 集成，把在持续集成环境中自动运行的自动化测试的结果自动同步到 Jira 中，如图 3 所示。",-1),I=a("p",null,"图3 Jira 和 Jenkins 集成同步测试结果",-1),P=a("p",null,"另外，Zephyr 也提供了独立安装的 Standalone 版本，有单独的管理界面，在测试用例的计划、执行、报告方面的用户体验会更好一些。Zephyr Standalone 也可以通过配置和 Jira 集成，实现需求、测送用例、缺陷的映射关系。图 4 展示了需求和测试用例的双向追溯， 而图 5 则显示了如何在一个失败的测试用例中关联缺陷。",-1),D=a("p",null,"图4 需求和测试用例的双向追溯",-1),M=a("p",null,"图5 关联缺陷到失败的测试用例",-1),T=a("h3",{id:"测试与质量度量的可视化",tabindex:"-1"},[t("测试与质量度量的可视化 "),a("a",{class:"header-anchor",href:"#测试与质量度量的可视化","aria-label":'Permalink to "测试与质量度量的可视化"'},"​")],-1),x=a("p",null,[t("测试结果与软件质量的度量结果以"),a("strong",null,"可视化"),t("的形式呈现出来非常有意义，一方面可以帮助研发团队及时掌握项目及研发进度，并发现项目的瓶颈及风险，理清关键路径，集中解决关键问题，保证项目得以顺利进行。另一方面，也提供给高层领导和其他团队了解目前软件质量状况的窗口。对当前状态有统一的认识，是进一步解决问题的关键。")],-1),w=a("p",null,"如果要实现多项目、多团队、多数据源的测试数据的呈现，研发团队往往会考虑自己开发一个数据呈现平台，从测试管理系统、CI 系统中得到各种测试数据，通过界面呈现出来；也可以借助一些数据统计呈现工具打造综合的可视化面板。下面介绍三种常用工具。",-1),E=a("h4",{id:"基于-sonarqube",tabindex:"-1"},[t("基于 SonarQube "),a("a",{class:"header-anchor",href:"#基于-sonarqube","aria-label":'Permalink to "基于 SonarQube"'},"​")],-1),k=a("p",null,'在第 18 讲介绍静态测试的时候讲过，SonarQube 可以作为代码质量（缺陷）数据呈现工具，其本身还是一个代码静态分析工具，另外还可以和多种代码静态分析工具集成获得更丰富的代码扫描规则。SonarQube 可以度量缺陷、安全性漏洞、代码坏味道和单元测试覆盖率，其 Quality Gate 界面如图 6 所示。如果达到质量要求，那么界面标题栏中会显示"Passed"（A 级）；如果达不到，会按照 B 级、C 级、D 级、E 级列出各种质量问题的数量，并以不同颜色标记，其中 B 级对应的质量问题最轻，E 级对应的质量问题最严重。它还可以把代码规模、复杂度等度量集成到一起，通过一个页面统一呈现出来；还可以单击 Bugs、Coverage 等查看详细内容。',-1),y=a("p",null,"图6 SonarQube 工具中的 Quality Gate 界面图",-1),q=a("h4",{id:"基于-grafana-和-influxdb",tabindex:"-1"},[t("基于 Grafana 和 InfluxDB "),a("a",{class:"header-anchor",href:"#基于-grafana-和-influxdb","aria-label":'Permalink to "基于 Grafana 和 InfluxDB"'},"​")],-1),V=a("p",null,"除了代码质量度量信息的呈现，研发团队还应考虑如何呈现其他测试结果，提供给团队内外成员全面了解当前软件质量的渠道，这些测试包括 BVT、性能测试、自动化回归测试等。第 18 讲还介绍了采用 Grafana 和 InfluxDB 结合可以按照时序呈现持续集成环境中的自动化测试结果，可以通过监控面板按照时间顺序呈现每次持续集成的测试结果，以及自动化回归测试结果。",-1),Z=a("p",null,"例如，Grafana、InfluxDB 和 JMeter 集成可以呈现性能测试的实时统计数据：JMeter 添加 Backend Listener，用于在测试过程中实时发送统计指标数据给时序数据库 Influxdb，配置 Grafana 数据源连接到 Influxdb，就可以得到呈现实时测试数据的可视化看板。如图 7 所示，可以呈现包括累计请求数、累计失败的请求数、吞吐量、响应时间等。",-1),F=a("p",null,"图7 JMeter 性能测试实时统计数据的可视化",-1),G=a("h4",{id:"基于-microsoft-power-bi",tabindex:"-1"},[t("基于 Microsoft Power BI "),a("a",{class:"header-anchor",href:"#基于-microsoft-power-bi","aria-label":'Permalink to "基于 Microsoft Power BI"'},"​")],-1),Q=a("p",null,"Microsoft Power BI 是一款商业的数据可视化工具，通过和测试管理工具的集成，可以用来打造呈现测试结果、质量度量、缺陷报告等数据的综合性的可视化面板。如图 8 所示，在 Power BI 面板中呈现了 Jira 中的缺陷数据统计信息。",-1),v=i("",5),N=a("p",null,"图9 企业级的质量雷达",-1),H=a("p",null,"这一讲主要介绍了两个部分的内容：如何实现需求、测试用例、缺陷的可追溯，以及如何实现测试结果和软件质量度量的可视化。同时介绍了 3 种实现可视化的数据统计呈现工具：SonarQube 专注于代码质量的呈现，另外，还有开源的数据统计呈现工具 Grafana 和商业软件 Microsoft Power BI。",-1);function R(O,z,U,X,$,j){const s=n("Image");return r(),l("div",null,[c,p,h,d,g,u,e(s,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image/M00/1B/F8/CgqCHl7fbQmAfSbfAAC4T7__cec454.png"}),t(),f,e(s,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image/M00/1B/ED/Ciqc1F7fbSSAT4HRAAC2rPfOgok607.png"}),t(),m,b,A,B,C,J,S,e(s,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image/M00/1B/ED/Ciqc1F7fbUmAVOn8AADVif0Mw8s236.png"}),t(),I,P,e(s,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image/M00/1B/ED/Ciqc1F7fbVOABBIbAAc7vvJETEs957.png"}),t(),D,e(s,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image/M00/1B/F9/CgqCHl7fbVuABFhMAAEGBCygHDo536.png"}),t(),M,T,x,w,E,k,e(s,{alt:"Drawing 5.png",src:"https://s0.lgstatic.com/i/image/M00/1B/ED/Ciqc1F7fbXGAHmpTAACVHzyRZVo369.png"}),t(),y,q,V,Z,e(s,{alt:"Drawing 6.png",src:"https://s0.lgstatic.com/i/image/M00/1B/ED/Ciqc1F7fbXmAQrzdAAKZ8A3sLds381.png"}),t(),F,G,Q,e(s,{alt:"Drawing 7.png",src:"https://s0.lgstatic.com/i/image/M00/1B/F9/CgqCHl7fbYiAIIXIAAIK-WWPSYM597.png"}),t(),v,e(s,{alt:"Drawing 8.png",src:"https://s0.lgstatic.com/i/image/M00/1B/ED/Ciqc1F7fbYKARpZ-AAPOo2uvZRM231.png"}),t(),N,H])}const L=o(_,[["render",R]]);export{Y as __pageData,L as default};
