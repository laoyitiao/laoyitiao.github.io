import{_ as o,j as a,o as i,g as r,k as s,h as n,Q as e,s as l}from"./chunks/framework.4e7d56ce.js";const gl=JSON.parse('{"title":"第18讲：增加自动的静态测试和测试报告生成功能","description":"","frontmatter":{},"headers":[],"relativePath":"posts/devops/112-高效敏捷测试文档/(1603) 第18讲：增加自动的静态测试和测试报告生成功能.md","filePath":"posts/devops/112-高效敏捷测试文档/(1603) 第18讲：增加自动的静态测试和测试报告生成功能.md","lastUpdated":1696682708000}'),_={name:"posts/devops/112-高效敏捷测试文档/(1603) 第18讲：增加自动的静态测试和测试报告生成功能.md"},u=e("",28),c=l("p",null,"图 1 IDEA 中添加代码分析工具的插件",-1),p=l("br",null,null,-1),h=l("p",null,"在 IDEA 中选择需要分析的源文件和分析工具，就可以得到如图 2 所示的代码分析结果。",-1),d=l("br",null,null,-1),A=l("p",null,"图 2 代码分析结果",-1),b=l("br",null,null,-1),g=l("p",null,"SonarLint 一般作为 IDE 的插件，用于开发人员进行本地的代码分析，以便在编程中及时发现问题、及时修改，以确保代码 push 到代码库前的代码质量，如图 3 所示。",-1),m=l("br",null,null,-1),C=l("p",null,"图3 IDEA 中的 SonarLint 插件",-1),S=l("br",null,null,-1),v=l("p",null,"SonarLint 可以和 SonarQube 集成，从而拥有更加丰富的代码规则集，而且在代码扫描分析完之后，其测试结果会上传到 SonarQube 服务器上，如图 4 所示，它以直观的可视化界面来展现代码质量及单元测试覆盖率。双击显示页面上的某个数字，就可以查看具体的信息等内容。",-1),I=l("br",null,null,-1),k=l("p",null,"图 4 SonarQube 的测试报告",-1),E=l("br",null,null,-1),P=l("p",null,"静态分析工具和 CI 调度工具的集成让静态测试成为持续集成的一部分，如果我们要让静态测试和 Jenkins 集成，就需要用到 SonarQube Scanners，实现代码自动扫描并上传报告到 SonarQube，这也是目前比较主流的应用方式。也就是说， SonarQube Scanners 依据 SonarQube 服务器中的代码规则库进行远程代码分析，而且可以和构建工具 Gradle、Maven、Azure DevOps 等集成。",-1),f=l("br",null,null,-1),q=l("p",null,"图 5 就描述了这种 CI 环境中代码分析的工作流程。开发人员在本地开发代码并利用 SonarLint 进行实时代码分析，然后将代码 push 到代码仓库中，触发持续构建，之后采用 SonarQube Scanners 进行代码分析，持续集成结束后将代码分析结果发布到 SonarQube 服务器以呈现测试报告。SonarQube 服务器将代码规则集和分析结果存储在数据库中，缺陷则提交给开发人员。",-1),D=l("br",null,null,-1),M=l("p",null,"图 5 SonarQube 在 CI 环境中的集成",-1),J=l("br",null,null,-1),x=l("p",null,"下面是 Jenkins 流水线脚本示例，构建过程包括编译、部署、单元测试、代码覆盖率分析等，这些过程完成之后，Jenkins 会自动调用 sonarQube Scanners 执行代码静态测试，测试报告会自动上传到 sonaQube 的界面上。",-1),T=l("br",null,null,-1),B=l("h3",{id:"自动化测试报告的自动生成",tabindex:"-1"},[l("strong",null,"自动化测试报告的自动生成"),n(),l("a",{class:"header-anchor",href:"#自动化测试报告的自动生成","aria-label":'Permalink to "**自动化测试报告的自动生成**"'},"​")],-1),Q=l("p",null,"除了单元测试和代码静态测试，BVT、回归测试、性能测试等自动化测试也可以在 CI 环境中自动触发测试活动并生成测试报告。",-1),L=l("br",null,null,-1),G=l("p",null,"下面的 Jenkins 流水线脚本给出了调用 Robot Framework 进行自动化测试的示例。当然，你需要在 Jenkins 里安装相应的 Robot Framework 插件。",-1),y=l("br",null,null,-1),R=e("",10),V=l("p",null,"图 6 Grafana 展示的代码覆盖率",-1),U=l("br",null,null,-1),F=l("p",null,"顺便提一下，Grafana 的功能还不止如此，把它集成在部署流水线中，可以帮助我们实时呈现、监控 Kubernetes 容器集群的负载情况，包括集群 Pod、CPU、内存和外部存储等使用状态，如图 7 所示。",-1),N=l("br",null,null,-1),H=l("p",null,"图7 Grafana 监控 Kubernetes 集群负载",-1),K=l("br",null,null,-1),w=l("p",null,"另一款比较优秀的测试报告框架是 Allure2，它可以提供如图 8 所示的比较美观的测试结果概览，而且可以查看每个测试用例的测试结果、测试用例的描述等。",-1),O=l("br",null,null,-1),Y=l("p",null,"图 8 Allure 生成的测试报告 Overview",-1),j=l("br",null,null,-1),$=l("p",null,"下面的 Jenkins 流水线脚本给出了自动化回归测试之后 Allure 自动生成的测试报告示例。脚本定义只有在测试失败时才会用邮件通知相关人员，但每次都会生成 Allure 测试报告，Allure 报告的链接会显示在 Jenkins 管理界面上。具体的配置方法你可以自己学习。",-1),z=l("br",null,null,-1),W=l("p",null,"用户自定义的测试报告",-1),X=l("br",null,null,-1),Z=l("p",null,"只要把 Allure 这样的测试报告框架和 CI 环境进行集成，就可以自动生成比较美观的测试报告。如果团队需要自定义的测试报告以满足进一步的需求，Allure 还可以提供与自动化测试框架的集成，通过在测试脚本中添加 Allure 注解比如 @Story、@Issue、@Attachment，来实现测试报告的定制，这些功能包括关联用户故事、关联测试用例、定义测试用例级别、关联缺陷、为失败用例添加 UI 界面的截图等。",-1),ll=l("br",null,null,-1),nl=l("p",null,"另外还有 ExtentReports，它也是一款可以和多个自动化测试框架集成，从而实现定制化测试报告的框架。图 9 展示了 ExtendReport 和测试框架集成后生成的自定义 HTML 报告，来自我公众号里的一篇文章，介绍了基于 Spock 的测试自动化框架，有兴趣的可以去看看。",-1),tl=l("br",null,null,-1),sl=l("p",null,"图 9 ExtentReports 生成的自定义测试报告",-1),el=l("br",null,null,-1),ol=l("p",null,"这部分内容就介绍到这里了，下面我简单总结一下这一讲的内容：",-1),al=l("ul",null,[l("li",null,[l("p",null,"代码的静态测试可以有效提高代码质量，合适的静态测试工具有 PMD、Splint、Pylint 或 SonarLint；")]),l("li",null,[l("p",null,"静态测试工具与 CI 环境集成后可以自动生成代码分析报告并让结果和缺陷信息可视化；")]),l("li",null,[l("p",null,"介绍了 3 种测试报告框架，即 Allure、ExtendReport 和 Grafana，前两个和自动化测试框架集成可以实现用户自定义的测试报告。")])],-1),il=l("br",null,null,-1),rl=l("p",null,"最后给你留两道思考题：你还知道有哪些用于生成测试报告的开源框架吗？平时希望生成怎样的测试报告？欢迎留言参与讨论。",-1);function _l(ul,cl,pl,hl,dl,Al){const t=a("Image");return i(),r("div",null,[u,s(t,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/05/23/Ciqah16AvieAft73AADPVYiKwUg514.png"}),n(),c,p,h,d,s(t,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/05/23/Ciqah16AviiAdvyKAAELJ5v86Co281.png"}),n(),A,b,g,m,s(t,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/7E/39/Cgq2xl6AviiAKMaeAAJ6hTL99ng438.png"}),n(),C,S,v,I,s(t,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/7E/39/Cgq2xl6AvimAYF4BAAELbdU3ETU137.png"}),n(),k,E,P,f,q,D,s(t,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/7E/39/Cgq2xl6AvimAOcjCAASt_kuThWs092.png"}),n(),M,J,x,T,s(t,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/7E/39/Cgq2xl6AvimAUz-BAACa5ZrHQ-c997.png"}),n(),B,Q,L,G,y,s(t,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/7E/39/Cgq2xl6AviqADvvNAAClklEV7qc899.png"}),n(),R,s(t,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/7E/39/Cgq2xl6AviqAOdXiAAG6JALlcjA393.png"}),n(),V,U,F,N,s(t,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/7E/39/Cgq2xl6AviqAB8atAAIxqkaMWHU812.png"}),n(),H,K,w,O,s(t,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/05/23/Ciqah16AviuAClenAAHgLVTjfcM818.png"}),n(),Y,j,$,z,s(t,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/05/23/Ciqah16AviuAKHc6AABC1w1PSY0716.png"}),n(),W,X,Z,ll,nl,tl,s(t,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/05/23/Ciqah16AviuARYU3AAYdFBOKgrQ197.png"}),n(),sl,el,ol,al,il,rl])}const ml=o(_,[["render",_l]]);export{gl as __pageData,ml as default};
