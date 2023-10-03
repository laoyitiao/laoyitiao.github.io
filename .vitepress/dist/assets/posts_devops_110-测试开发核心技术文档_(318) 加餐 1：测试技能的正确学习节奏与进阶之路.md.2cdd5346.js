import{_ as p,o as a,g as e,Q as i}from"./chunks/framework.f949202b.js";const m=JSON.parse('{"title":"技术体系架构 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/devops/110-测试开发核心技术文档/(318) 加餐 1：测试技能的正确学习节奏与进阶之路.md","filePath":"posts/devops/110-测试开发核心技术文档/(318) 加餐 1：测试技能的正确学习节奏与进阶之路.md","lastUpdated":null}'),l={name:"posts/devops/110-测试开发核心技术文档/(318) 加餐 1：测试技能的正确学习节奏与进阶之路.md"},t=i('<p>在加餐 1 中我们主要学习测试技能的正确学习节奏与进阶之路。</p><h2 id="技术体系架构" tabindex="-1">技术体系架构 <a class="header-anchor" href="#技术体系架构" aria-label="Permalink to &quot;技术体系架构&quot;">​</a></h2><p><img src="http://s0.lgstatic.com/i/image2/M01/AA/FA/CgoB5l3VDdSAeFyyAAEWVLjqOtY340.png" alt=""></p><p>首先，我们来了解下行业知名公司的技术架构，以阿里云 Aone 平台为例，你可以看到在整个项目的研发中，分为项目、代码、应用、测试、交付、运营六大模块。每个模块下有各自需要负责的工作。</p><p>而测试工作作为核心模块在整个链路中至关重要，我们需要完成测试自动化、持续集成、测试用例等相关的工作，即需要对代码质量负责，又需要对产品功能质量负责，甚至需要对发布到线上环境的产品质量负责。既然测试工作这么重要，那么我们作为测试工程师在整个技术体系中又应该具备什么样的能力呢？接下来我就带你对测试工程师需要掌握的技术栈进行梳理。</p><h2 id="质量保证的核心业务" tabindex="-1">质量保证的核心业务 <a class="header-anchor" href="#质量保证的核心业务" aria-label="Permalink to &quot;质量保证的核心业务&quot;">​</a></h2><p>在质量保证的核心业务中，我简单梳理成这样几大模块，比如。</p><ul><li><p>前台验收测试：Web、App、GUI；</p></li><li><p>前台用户体验测试：性能、安全、耗电量、稳定性；</p></li><li><p>中后台功能测试：SDK、Restful、RPC；</p></li><li><p>中后台非功能测试：性能、安全；</p></li><li><p>流程管理：持续集成、持续交付、DevOps；</p></li><li><p>质量分析：监控平台、数据分析平台、AI辅助平台。</p></li></ul><p>针对以上这 6 个模块，我们需要注意以下内容：</p><ol><li><p>前台验收测试主要测试我们的 Web 页面、用户使用的 App，也包括 PC 桌面级应用，这些都是用户直接操作使用的，我们需要在 UI 层保障产品质量。</p></li><li><p>完成前台用户体验的相关测试，比如我们使用一个应用的时候，性能、安全、稳定性都是最核心的，对于移动 App，耗电量也是需要额外注意的。</p></li><li><p>中后台功能测试，比如我们对外发布一个 SDK，需要对外启动 Restful、RPC 接口，这时我们就需要对接口的功能和安全性负责，就需要一定的测试验收工作。</p></li></ol><p>还有就是流程管理，比如持续集成、持续交付、DevOps。我们需要有能够构建一个核心持续交付流水线的能力。</p><br><p>最后是质量分析，测试需要通过监控平台、数据分析平台分析出产品有多少 Bug，而 Bug 又是如何进行收敛的，也包括监控线上产品质量，出现问题时能够从容应对，及时修复。</p><p>了解了整个质量保证的核心业务后，我们接下来看下测试人员应对这些工作时需要掌握哪些技能，我根据目前互联网行业现状对测试人员进行了一个基础能力的评级梳理。</p><h2 id="第一级-基本编程能力" tabindex="-1">第一级：基本编程能力 <a class="header-anchor" href="#第一级-基本编程能力" aria-label="Permalink to &quot;第一级：基本编程能力&quot;">​</a></h2><p>第一级我们称之为基本编程能力，比如底层语言 Java 和 Go，你必须懂其中一种，虽然不懂底层语言也可以通过面试，但这会成为你日后工作的短板，我个人推荐你掌握 Java 语言，因为国内的一线大厂，比如阿里、腾讯、百度都在使用 Java，而且掌握之后对你个人的技术能力提升帮助也非常大。</p><p>然后是高层语言，高层语言首选 Python，Python 在人工智能、大数据方面都有着不错的应用，而如果你主测前端或移动端，那么 Kotlin 和 Node.js 也是不错的选择。</p><p>而在领域语言，我建议你必须弄懂 Shell、SQL 和 Docker。因为 Shell 是 Linux 系统服务器的主交互界面，所以是你入门必须掌握的基础知识；而 SQL 涉及数据分析、数据提取，在行业应用广泛，也是非常重要的；其次是 Docker，掌握 Docker 主要是为了提升我们的测试工作效率。</p><p>还有一些领域技能需要掌握，比如你需要掌握 Linux、Android、iOS 系统，最后是底层的算法和数据结构，你需要掌握堆栈、链表和二叉树。掌握了这部分知识后一定会在面试中得到加分。</p><p>如果第一级基本编程能力你已经能够达标了，那么恭喜你，你已经能够通过大部分公司的测试面试了，如果你想进入更好的平台或拿到更高的薪资，那么我们进入第二级能力的学习。</p><h2 id="第二级-自动化能力" tabindex="-1">第二级：自动化能力 <a class="header-anchor" href="#第二级-自动化能力" aria-label="Permalink to &quot;第二级：自动化能力&quot;">​</a></h2><p>第二级考察你在测试领域自动化的能力，比如你的前台自动化测试能力，在 Web 端如何使用 Selenium，在 App 端如何使用 Appium，往下层走，在 Android 上如何使用自动化框架 UIAutomator 等，如果你能够深入掌握，你就具备了前台自动化的综合能力。</p><p>然后是服务端接口自动化测试，在 Java 中主要使用 HttpClint，在 Python 中主要使用 Requests。最后就是性能测试，性能测试我们主要以 JMeter 为主，JMeter 是行业里功能齐全、普及率最高的开源框架。</p><p>如果你已经掌握了这几个测试框架，在面试中能够得心应手得回答它们的优缺点，并能够结合公司现有的项目做一定程度上的经验分享，那么你就掌握了第二级自动化测试能力，这一部分会成为你面试中的亮点。</p><h2 id="第三极-测试框架深入理解能力" tabindex="-1">第三极：测试框架深入理解能力 <a class="header-anchor" href="#第三极-测试框架深入理解能力" aria-label="Permalink to &quot;第三极：测试框架深入理解能力&quot;">​</a></h2><p>第三级是深入理解测试框架的能力，这一级能力往往能够在面试中给你带来更高的薪资，如果你已经掌握了这部门知识，那么恭喜你，你已经到达了中高级测试开发工程师的能力，在这一级里你需要掌握如下内容：</p><ul><li><p>Appium的框架原理是什么？有没有做过二次改造？</p></li><li><p>如何并发运行测试用例？测试用例的顺序如何控制？</p></li><li><p>如何自定义 Appium？</p></li><li><p>测试报告如何定制？用例覆盖度如何？</p></li><li><p>跨多端平台的用例如何维护？</p></li><li><p>端到端测试如何做？如何利用 mock 解决 App 数据依赖问题？</p></li><li><p>部门的架构是什么样子的？技术栈用的是什么？</p></li></ul><h2 id="第四级-问题定位白盒测试能力" tabindex="-1">第四级：问题定位白盒测试能力 <a class="header-anchor" href="#第四级-问题定位白盒测试能力" aria-label="Permalink to &quot;第四级：问题定位白盒测试能力&quot;">​</a></h2><p>掌握了第三级后你对测试能力已经理解的非常深入了，如果想要掌握了第四级问题定位白盒测试能力，你不仅需要对基础的测试能力有深入的理解，还需要对产品也有深入的理解，你需要深入研究产品的所有业务逻辑，并运用工具分析逻辑后面的架构和代码。</p><p>我把第四级分为两种能力，第一种叫静态分析能力，比如借助 FindBugs、GCC 等工具分析代码质量并测试代码间的关联关系；第二种叫动态分析能力，比如在业务中，我们能够分析出当前逻辑的调用链是什么样的，线程中的函数是什么样的，掌握了这些你就具备了一定的代码分析和剖析能力。</p><h2 id="第五级-架构与管理能力" tabindex="-1">第五级：架构与管理能力 <a class="header-anchor" href="#第五级-架构与管理能力" aria-label="Permalink to &quot;第五级：架构与管理能力&quot;">​</a></h2><p>第五级架构与管理能力，在这一级你需要具备能够自研或使用现有工具构建持续交付平台和数据分析平台的能力，还有就是对质量管理的要求，包括质量保证流程、文化建设、问题推动与解决的能力等。</p><p><img src="http://s0.lgstatic.com/i/image2/M01/AB/1A/CgotOV3VDkCAYmSWAADTkL00IRM297.png" alt=""></p><p>以上就是作为测试人员应该掌握的五级能力，你可以看到随着你逐级攻克技术难关，也会在行业里变得越来越稀缺，便能在人才市场中得到更多地青睐。</p><p>如果你在攻克技术难关的过程中遇到困难，可以多逛一逛 TesterHome，多参考 BAT 等一线公司的技术栈，多分析同行的资料与文章，多看一看其他公司的招聘信息及时了解行业内对人才的需求，也希望你通过本课程的学习，能够在测试能力上得到提升。</p>',35),o=[t];function r(s,n,_,h,d,c){return a(),e("div",null,o)}const A=p(l,[["render",r]]);export{m as __pageData,A as default};
