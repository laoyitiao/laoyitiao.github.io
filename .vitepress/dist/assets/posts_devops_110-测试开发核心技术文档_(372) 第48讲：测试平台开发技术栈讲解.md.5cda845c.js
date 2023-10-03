import{_ as a,o as t,g as p,Q as i}from"./chunks/framework.f949202b.js";const u=JSON.parse('{"title":"为什么需要开发测试平台 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/devops/110-测试开发核心技术文档/(372) 第48讲：测试平台开发技术栈讲解.md","filePath":"posts/devops/110-测试开发核心技术文档/(372) 第48讲：测试平台开发技术栈讲解.md","lastUpdated":null}'),e={name:"posts/devops/110-测试开发核心技术文档/(372) 第48讲：测试平台开发技术栈讲解.md"},r=i('<p>本课时我们开始进入平台开发技术栈的学习。</p><h3 id="为什么需要开发测试平台" tabindex="-1">为什么需要开发测试平台 <a class="header-anchor" href="#为什么需要开发测试平台" aria-label="Permalink to &quot;为什么需要开发测试平台&quot;">​</a></h3><p>我们先看下为什么需要测试开发平台，通常我们在公司里会使用大量的开源测试工具和云平台，常见的开源工具如 Appium、Selenium、Requests，常见的测试平台如 Jenkins、SonarQube 等。当这些平台无法满足公司需求的时候，我们就需要进行定制或重新开发，通常情况下我不建议你直接盲目地重复造轮子，如果已有的开源测试平台可以满足需求，就使用已有的开源项目，然后围绕开源项目进行功能的增强和改造。只有当行业里现有平台无法满足需求时，我们才考虑重新开发一个平台。</p><p>第二点是我们还需要整合公司内部的多套平台，做内容和流程的整合。同时公司可能也会有一些特殊的定制需求，这时我们就可以去开发一个测试平台了。</p><p>在开发平台之前，大家一定要切记，不要轻易地去重复造轮子，因为这是一个非常大的坑，填坑需要非常多的人力成本，所以一定要谨慎地去评估第一条，一定要确认没有已有的开源平台可以支撑，我们才需要重新去做一个新的。</p><h3 id="常见的测试平台开发模式" tabindex="-1">常见的测试平台开发模式 <a class="header-anchor" href="#常见的测试平台开发模式" aria-label="Permalink to &quot;常见的测试平台开发模式&quot;">​</a></h3><p>既然需求和场景都有了，接下来我们看下常见的测试平台如何开发，首先在整个行业里开发方式分为两类：</p><ul><li><p>大一统模式，这方面有经典的技术，比如 Django、Rails、各种框架，这类框架入门比较容易，上手比较简单，它是大一统的，前端、后端都可以整合到这各平台进行开发，所以更新、维护也会非常的方便。它通常会使用模板技术去渲染前端界面，比如 Django 在 Python 里面就是一个非常好的工具，可以帮我们快速地构建出一个小测试平台，特别适合一些简单的项目场景。</p></li><li><p>前后端分离模式，这种模式第一适合多人协作，第二适合多个技术栈进行整合的场景。在这种情况下，前端与后端的逻辑会有严格的分工，后端的会通过接口，比如 JSON 接口，对外提供服务能力；而前端整合多个平台，把各个平台所提供的接口全部整合进来，并且使用 SPA 框架来完成关键流程的定义。后端框架既可以是小型的 API 框架，比如 Flask，也可以是大型的 Web 开发框架，比如 Django。</p></li></ul><p>具体使用哪一种技术看公司的需要，如果是单人维护，你可以使用 Django；如果是多人维护，尤其是既涉及前端、后端，又涉及分工，建议你使用前后端分离的模式进行开发，这个时候你就可以借助 SPA 框架设计出更灵活的场景。当然这两种模式技术上不是完全独立的，也可以使用 大一统模式的 Django 作为后端框架。</p><h3 id="常用技术架构与组件" tabindex="-1">常用技术架构与组件 <a class="header-anchor" href="#常用技术架构与组件" aria-label="Permalink to &quot;常用技术架构与组件&quot;">​</a></h3><p>接下来，我们来看一下常用的技术架构与对应的组件。</p><p>比如前端技术架构，我们可以使用什么框架来完成用户的交互呢？比如我们可以使用 Bootstrap 框架，阿里的 Antd，以及前端的框架 Vue、React。</p><p>除此之外还包括后端的框架，比如 Django、Flask、Spring Boot。</p><p>然后是数据的存储，当我们有了一个框架，有用户行为，就会自然沉淀下数据，比如我们的测试用例、测试的结果，就需要用数据库进行存储，通常我会用 MySQL、ES、Neo4j 等。</p><p>通常我们会有一些任务执行过程，比如需要定期执行、异步执行，这些执行模式不是实时的，那我们就需要任务调度的架构，这方面也有很多工具，我推荐使用开源的测试平台 Jenkins，Jenkins 可以帮我们管理大部分的任务调度，Jenkins 的功能其实非常强大。</p><p>还有就是数据报表，比如 Echarts、Vega、Kibana、Grafana，我们可以利用这些成熟的数据渲染报表框架，帮我们去设计数据分析功能。</p><h3 id="前端技术架构解析" tabindex="-1">前端技术架构解析 <a class="header-anchor" href="#前端技术架构解析" aria-label="Permalink to &quot;前端技术架构解析&quot;">​</a></h3><p>接下来，看一下每个技术栈具体的技术。</p><h4 id="前台设计" tabindex="-1">前台设计 <a class="header-anchor" href="#前台设计" aria-label="Permalink to &quot;前台设计&quot;">​</a></h4><p>首先是前台设计，我们可以使用 Bootstrap、Semantic-ui、Antd 帮我们设计出非常优美的框架，通常我们不会设计得过于酷炫，而是追求简约和简洁，这样可以让使用者更关注内在的业务。可以参考 gitlab、github、sonarqube 等平台的设计。</p><p>前端 JS 和 UI 框架的内容结合到一起，也有一些非常成熟的框架，比如 Vutify、Element UI。</p><h4 id="测试平台案例" tabindex="-1">测试平台案例 <a class="header-anchor" href="#测试平台案例" aria-label="Permalink to &quot;测试平台案例&quot;">​</a></h4><p><img src="https://s0.lgstatic.com/i/image/M00/21/EC/CgqCHl7rIU-AfUHqAAIMxqc0U6g441.png" alt="Drawing 1.png"></p><p>这是我们公司自己开发的一个平台的案例。你可以看到这个平台有顶栏、边栏，边栏里面有菜单，右侧有具体的数据列表，加上一些快捷菜单，还包括各种导航功能。</p><h3 id="后端技术架构解析" tabindex="-1">后端技术架构解析 <a class="header-anchor" href="#后端技术架构解析" aria-label="Permalink to &quot;后端技术架构解析&quot;">​</a></h3><p>然后我们再来看一下后端技术架构。</p><h4 id="后端开发框架" tabindex="-1">后端开发框架 <a class="header-anchor" href="#后端开发框架" aria-label="Permalink to &quot;后端开发框架&quot;">​</a></h4><p>后端技术架构通常会使用两种风格的技术栈，第一种叫迷你型的 API 框架，常见的比如 Python 的 Flask 和 Java 的 Sparkjava。还有一类是大而全的框架，比如 Python 的 Django 和 Java 的 Spring Boot 全家桶。</p><p><strong>Python Flask 框架</strong></p><p><img src="https://s0.lgstatic.com/i/image/M00/21/E0/Ciqc1F7rIWSAbEDkAAJ9gPbZqCU673.png" alt="Drawing 3.png"></p><p>我们来看一下 Python 的 Flask 框架，非常简单，只需通过这样的几行代码，你就可以创建出一个后端的 http 接口。通常有一些非常小的功能组件，我们会独立使用 Flask 来进行开发，完成这个功能，最后通过 SPA 前端页面调用这个接口就可以了。</p><p><strong>Sparkjava 框架</strong></p><p><img src="https://s0.lgstatic.com/i/image/M00/21/E1/Ciqc1F7rIXKAdj5aAAJud9gTe3c328.png" alt="Drawing 4.png"></p><p>Java 里面也有一个非常便捷的功能，比如 Sparkjava ，也是几行代码就可以帮你创建出一个接口，是非常便捷的。</p><p>除了这两个框架之外，如果你的功能非常多，那你就使用 Django、Spring Boot 这种大的 Web 开发平台。</p><h3 id="任务调度管理设计" tabindex="-1">任务调度管理设计 <a class="header-anchor" href="#任务调度管理设计" aria-label="Permalink to &quot;任务调度管理设计&quot;">​</a></h3><p><img src="https://s0.lgstatic.com/i/image/M00/21/EC/CgqCHl7rIXqAHQE_AAGAKsDd_pg380.png" alt="Drawing 5.png"></p><p>我们再来看任务调度，前面我推荐过 Jenkins，它的功能非常的强大，它支持异步的任务调度，可以说是任务调度里面最强大的框架，在这方面，我建议你直接与这个平台做一个整合，而不需要从零开发。</p><h3 id="关系型数据库、搜索系统、图数据库的应用场景" tabindex="-1">关系型数据库、搜索系统、图数据库的应用场景 <a class="header-anchor" href="#关系型数据库、搜索系统、图数据库的应用场景" aria-label="Permalink to &quot;关系型数据库、搜索系统、图数据库的应用场景&quot;">​</a></h3><p>除此之外，我们还会用到数据存储，通常我们会遇到这样几个场景。</p><ul><li><p>关系型数据库，比如用户、项目、用例之间的关系，这种数据我们就需要通过关系型数据库。</p></li><li><p>需要进行批量的检索的数据，比如我们的源代码、大量的数据，我们会存到搜索系统里面来进行检索。</p></li><li><p>图数据库的应用场景。通常它是网状数据的关系管理，比如代码的函数调用关系，我们就放到图数据库。</p></li></ul><h3 id="数据库" tabindex="-1">数据库 <a class="header-anchor" href="#数据库" aria-label="Permalink to &quot;数据库&quot;">​</a></h3><p>数据库方面，分为这几个类型给大家推荐几个技术栈。</p><ul><li><p>关系型数据库，就是 MySQL、PostgreSql，通常 MySQL 是使用最多的。</p></li><li><p>非关系数据库，比如 Redis、RethinkDB、MongDB，通常我们把用于加速以及非常大的非关系数据存储在这里。</p></li><li><p>搜索引擎，我们使用 ElasticSearch 就可以解决。</p></li><li><p>图数据库，所有函数调用关系我们可以使用 Neo4J。</p></li></ul><h3 id="数据分析与数据展现技术" tabindex="-1">数据分析与数据展现技术 <a class="header-anchor" href="#数据分析与数据展现技术" aria-label="Permalink to &quot;数据分析与数据展现技术&quot;">​</a></h3><p>除了这些技术之外，我们有了数据存储了，自然需要对数据做分析和展现。</p><p><img src="https://s0.lgstatic.com/i/image/M00/21/EC/CgqCHl7rIYiAQgk2AAIQ_HrdbcI983.png" alt="Drawing 6.png"></p><p>我们可以使用可视化的框架，比如，百度的 EChart、D3.js、Vega、yWorks 等各种各样的 H5 的图形渲染控件来帮我们做分析。除了每一个 UI 的绘图组件之外，还有一些通用的数据分析平台，比如 Kibana、Grafana，也可以把这些平台直接整合进来。</p><p><img src="https://s0.lgstatic.com/i/image/M00/21/EC/CgqCHl7rIY-AO-aJAARE4YDaHDY691.png" alt="Drawing 7.png"></p><p>比如 Grafana，支持调用各种各样的数据来帮你定制报表。</p><p><img src="https://s0.lgstatic.com/i/image/M00/21/EC/CgqCHl7rIZiAE9EFAAZw_pECgxY908.png" alt="Drawing 8.png"></p><p>这个是 Kibana，可以检索 ElasticSearch 图形的各种区别，也可以给你渲染出一些非常酷炫的数据报表。</p><p><img src="https://s0.lgstatic.com/i/image/M00/21/E1/Ciqc1F7rIaKAWon2AAID1W6XV0M544.png" alt="Drawing 9.png"></p><p><img src="https://s0.lgstatic.com/i/image/M00/21/ED/CgqCHl7rIaiAYRzJAARn_nkkfHQ563.png" alt="Drawing 10.png"></p><p>还有允许定制的测试的进展分析、漏测分析，我们都可以基于已有的数据，汇集出这样的数据报表。</p><p><img src="https://s0.lgstatic.com/i/image/M00/21/E1/Ciqc1F7rIbSAfRvpAAIAmqFTz4I200.png" alt="Drawing 11.png"></p><p>函数调用关系，我们可以使用 Neo4J 把网状数据检索出来，还包括页面跳转关系，我们都可以用 Neo4J 进行存储。</p><h3 id="sonarqube-测试平台示例" tabindex="-1">Sonarqube 测试平台示例 <a class="header-anchor" href="#sonarqube-测试平台示例" aria-label="Permalink to &quot;Sonarqube 测试平台示例&quot;">​</a></h3><p><img src="https://s0.lgstatic.com/i/image/M00/21/ED/CgqCHl7rIbyAAO8SAAGgeLlkMKw385.png" alt="Drawing 12.png"></p><p>我们来看一下行业里面已有的开源平台怎么使用。</p><p>比如行业里面使用的一个非常知名的平台 Sonarqube，它是一个代码审计平台。这个平台前台有一个基本的用户交互界面。后台使用的是关系数据库 MySQL，后来的版本使用了PostgreSQL（简称 PG）。它的大数据检索使用 ElasticSearch，把大量数据放在里面来进行检索，这是一个比较典型的架构。</p><p>关于测试平台开发所需要的技术栈我就讲解到这里，你可以研究一下技术栈，看一下哪些技术适合你的公司，然后进行研发。</p>',62),n=[r];function o(s,l,g,h,c,d){return t(),p("div",null,n)}const q=a(e,[["render",o]]);export{u as __pageData,q as default};
