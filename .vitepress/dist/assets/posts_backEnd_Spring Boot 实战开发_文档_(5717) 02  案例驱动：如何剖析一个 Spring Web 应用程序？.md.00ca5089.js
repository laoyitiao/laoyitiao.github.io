import{_ as l,j as e,o as t,g as r,k as p,h as n,s,Q as o}from"./chunks/framework.b3d8e22e.js";const L=JSON.parse('{"title":"Spring MVC VS Spring Boot ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/Spring Boot 实战开发_文档/(5717) 02  案例驱动：如何剖析一个 Spring Web 应用程序？.md","filePath":"posts/backEnd/Spring Boot 实战开发_文档/(5717) 02  案例驱动：如何剖析一个 Spring Web 应用程序？.md","lastUpdated":1696417798000}'),c={name:"posts/backEnd/Spring Boot 实战开发_文档/(5717) 02  案例驱动：如何剖析一个 Spring Web 应用程序？.md"},i=s("p",null,"在 01 讲中，我们提到 Spring 家族具备很多款开源框架，开发人员可以基于这些开发框架实现各种 Spring 应用程序。在 02 讲中，我们无意对所有这些 Spring 应用程序的类型和开发方式过多展开，而是主要集中在基于 Spring Boot 开发面向 Web 场景的服务，这也是互联网应用程序最常见的表现形式。在介绍基于 Spring Boot 的开发模式之前，让我们先将它与传统的 Spring MVC 进行简单对比。",-1),E=s("h3",{id:"spring-mvc-vs-spring-boot",tabindex:"-1"},[n("Spring MVC VS Spring Boot "),s("a",{class:"header-anchor",href:"#spring-mvc-vs-spring-boot","aria-label":'Permalink to "Spring MVC VS Spring Boot"'},"​")],-1),g=s("p",null,"在典型的 Web 应用程序中，前后端通常采用基于 HTTP 协议完成请求和响应，开发过程中需要完成 URL 地址的映射、HTTP 请求的构建、数据的序列化和反序列化以及实现各个服务自身内部的业务逻辑，如下图所示：",-1),y=s("p",null,"HTTP 请求响应过程",-1),d=s("p",null,"我们先来看基于 Spring MVC 完成上述开发流程所需要的开发步骤，如下图所示：",-1),u=s("p",null,"基于 Spring MVC 的 Web 应用程序开发流程",-1),S=s("p",null,"上图中包括使用 web.xml 定义 Spring 的 DispatcherServlet、完成启动 Spring MVC 的配置文件、编写响应 HTTP 请求的 Controller 以及将服务部署到 Tomcat Web 服务器等步骤。事实上，基于传统的 Spring MVC 框架开发 Web 应用逐渐暴露出一些问题，比较典型的就是配置工作过于复杂和繁重，以及缺少必要的应用程序管理和监控机制。",-1),_=s("p",null,"如果想优化这一套开发过程，有几个点值得我们去挖掘，比方说减少不必要的配置工作、启动依赖项的自动管理、简化部署并提供应用监控等。而这些优化点恰巧推动了以 Spring Boot 为代表的新一代开发框架的诞生，基于 Spring Boot 的开发流程见下图：",-1),h=s("p",null,"基于 Spring Boot 的 Web 应用程序开发流程",-1),b=s("p",null,"从上图中可以看到，它与基于 Spring MVC 的开发流程在配置信息的管理、服务部署和监控等方面有明显不同。作为 Spring 家族新的一员，Spring Boot 提供了令人兴奋的特性，这些特性的核心价值在于确保了开发过程的简单性，具体体现在编码、配置、部署、监控等多个方面。",-1),m=s("p",null,"首先，Spring Boot 使编码更简单。我们只需要在 Maven 中添加一项依赖并实现一个方法就可以提供微服务架构中所推崇的 RESTful 风格接口。",-1),A=s("p",null,"其次，Spring Boot 使配置更简单。它把 Spring 中基于 XML 的功能配置方式转换为 Java Config，同时提供了 .yml 文件来优化原有基于 .properties 和 .xml 文件的配置方案，.yml 文件对配置信息的组织更为直观方便，语义也更为强大。同时，基于 Spring Boot 的自动配置特性，对常见的各种工具和框架均提供了默认的 starter 组件来简化配置。",-1),C=s("p",null,"最后，在部署方案上，Spring Boot 也创造了一键启动的新模式。Spring Boot 部署包结构参考下图：",-1),B=s("p",null,"Spring Boot部署包结构",-1),v=s("p",null,"从图中我们可以看到，相较于传统模式下的 war 包，Spring Boot 部署包既包含了业务代码和各种第三方类库，同时也内嵌了 HTTP 容器。这种包结构支持 java --jar application.jar 方式的一键启动，不需要部署独立的应用服务器，通过默认内嵌 Tomcat 就可以运行整个应用程序。",-1),F=s("p",null,'最后，基于 Spring Boot 新提供的 Actuator 组件，开发和运维人员可以通过 RESTful 接口获取应用程序的当前运行时状态并对这些状态背后的度量指标进行监控和报警。例如可以通过"/env/{name}"端点获取系统环境变量、通过"/mapping"端点获取所有 RESTful 服务、通过"/dump"端点获取线程工作状态以及通过"/metrics/{name}"端点获取 JVM 性能指标等。',-1),k=s("h3",{id:"剖析一个-spring-web-应用程序",tabindex:"-1"},[n("剖析一个 Spring Web 应用程序 "),s("a",{class:"header-anchor",href:"#剖析一个-spring-web-应用程序","aria-label":'Permalink to "剖析一个 Spring Web 应用程序"'},"​")],-1),q=s("p",null,"针对一个基于 Spring Boot 开发的 Web 应用程序，其代码组织方式需要遵循一定的项目结构。在 02 讲中，如果不做特殊说明，我们都将使用 Maven 来管理项目工程中的结构和包依赖。一个典型的 Web 应用程序的项目结构如下图所示：",-1),D=o('<p>Spring Boot Web 项目结构图</p><p>在上图中，有几个地方需要特别注意，我也在图中做了专门的标注，分别是包依赖、启动类、控制器类以及配置，让我们讲此部分内容分别做一些展开。</p><h4 id="包依赖" tabindex="-1">包依赖 <a class="header-anchor" href="#包依赖" aria-label="Permalink to &quot;包依赖&quot;">​</a></h4><p>Spring Boot 提供了一系列 starter 工程来简化各种组件之间的依赖关系。以开发 Web 服务为例，我们需要引入 spring-boot-starter-web 这个工程，而这个工程中并没有具体的代码，只是包含了一些 pom 依赖，如下所示：</p><ul><li><p>org.springframework.boot:spring-boot-starter</p></li><li><p>org.springframework.boot:spring-boot-starter-tomcat</p></li><li><p>org.springframework.boot:spring-boot-starter-validation</p></li><li><p>com.fasterxml.jackson.core:jackson-databind</p></li><li><p>org.springframework:spring-web</p></li><li><p>org.springframework:spring-webmvc</p></li></ul><p>可以看到，这里包括了传统 Spring MVC 应用程序中会使用到的 spring-web 和 spring-webmvc 组件，因此 Spring Boot 在底层实现上还是基于这两个组件完成对 Web 请求响应流程的构建。</p><p>如果我们使用 Spring Boot 2.2.4 版本，你会发现它所依赖的 Spring 组件都升级到了 5.X 版本，如下图所示：</p>',7),f=o(`<p>Spring Boot 2.2.4 版本的包依赖示意图</p><p>在应用程序中引入 spring-boot-starter-web 组件就像引入一个普通的 Maven 依赖一样，如下所示。</p><div class="language-xml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">xml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">dependency</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        &lt;</span><span style="color:#85E89D;">groupId</span><span style="color:#E1E4E8;">&gt;org.springframework.boot&lt;/</span><span style="color:#85E89D;">groupId</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        &lt;</span><span style="color:#85E89D;">artifactId</span><span style="color:#E1E4E8;">&gt;spring-boot-starter-web&lt;/</span><span style="color:#85E89D;">artifactId</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">dependency</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">dependency</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">        &lt;</span><span style="color:#22863A;">groupId</span><span style="color:#24292E;">&gt;org.springframework.boot&lt;/</span><span style="color:#22863A;">groupId</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">        &lt;</span><span style="color:#22863A;">artifactId</span><span style="color:#24292E;">&gt;spring-boot-starter-web&lt;/</span><span style="color:#22863A;">artifactId</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">dependency</span><span style="color:#24292E;">&gt;</span></span></code></pre></div><p>一旦 spring-boot-starter-web 组件引入完毕，我们就可以充分利用 Spring Boot 提供的自动配置机制开发 Web 应用程序。</p><h4 id="启动类" tabindex="-1">启动类 <a class="header-anchor" href="#启动类" aria-label="Permalink to &quot;启动类&quot;">​</a></h4><p>使用 Spring Boot 的最重要的一个步骤是创建一个 Bootstrap 启动类。Bootstrap 类结构简单且比较固化，如下所示：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> org.springframework.boot.SpringApplication;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> org.springframework.boot.autoconfigure.SpringBootApplication;</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#F97583;">SpringBootApplication</span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">HelloApplication</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">String</span><span style="color:#E1E4E8;">[] </span><span style="color:#FFAB70;">args</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        SpringApplication.</span><span style="color:#B392F0;">run</span><span style="color:#E1E4E8;">(HelloApplication.class, args);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> org.springframework.boot.SpringApplication;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> org.springframework.boot.autoconfigure.SpringBootApplication;</span></span>
<span class="line"><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">@</span><span style="color:#D73A49;">SpringBootApplication</span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">HelloApplication</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">String</span><span style="color:#24292E;">[] </span><span style="color:#E36209;">args</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        SpringApplication.</span><span style="color:#6F42C1;">run</span><span style="color:#24292E;">(HelloApplication.class, args);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>显然，这里引入了一个全新的注解 @SpringBootApplication。在 Spring Boot 中，添加了该注解的类就是整个应用程序的入口，一方面会启动整个 Spring 容器，另一方面也会自动扫描代码包结构下的 @Component、@Service、@Repository、@Controller 等注解并把这些注解对应的类转化为 Bean 对象全部加载到 Spring 容器中。</p><h4 id="控制器类" tabindex="-1">控制器类 <a class="header-anchor" href="#控制器类" aria-label="Permalink to &quot;控制器类&quot;">​</a></h4><p>Bootstrap 类为我们提供了 Spring Boot 应用程序的入口，相当于应用程序已经有了最基本的骨架。接下来我们就可以添加 HTTP 请求的访问入口，表现在 Spring Boot 中也就是一系列的 Controller 类。这里的 Controller 与 Spring MVC 中的 Controller 在概念上是一致的，一个典型的 Controller 类如下所示：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#F97583;">RestController</span></span>
<span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#F97583;">RequestMapping</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">value</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;accounts&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">AccountController</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Autowired</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> AccountService accountService;</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">GetMapping</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">value</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;/{accountId}&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> Account </span><span style="color:#B392F0;">getAccountById</span><span style="color:#E1E4E8;">(@</span><span style="color:#F97583;">PathVariable</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;accountId&quot;</span><span style="color:#E1E4E8;">) Long </span><span style="color:#FFAB70;">accountId</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        Account account </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> accountService.</span><span style="color:#B392F0;">getAccountById</span><span style="color:#E1E4E8;">(accountId);</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> account;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">@</span><span style="color:#D73A49;">RestController</span></span>
<span class="line"><span style="color:#24292E;">@</span><span style="color:#D73A49;">RequestMapping</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">value</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;accounts&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">AccountController</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Autowired</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> AccountService accountService;</span></span>
<span class="line"><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">GetMapping</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">value</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;/{accountId}&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> Account </span><span style="color:#6F42C1;">getAccountById</span><span style="color:#24292E;">(@</span><span style="color:#D73A49;">PathVariable</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;accountId&quot;</span><span style="color:#24292E;">) Long </span><span style="color:#E36209;">accountId</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        Account account </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> accountService.</span><span style="color:#6F42C1;">getAccountById</span><span style="color:#24292E;">(accountId);</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> account;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>请注意，以上代码中包含了 @RestController、@RequestMapping 和 @GetMapping 这三个注解。其中，@RequestMapping 用于指定请求地址的映射关系，@GetMapping 的作用等同于指定了 GET 请求的 @RequestMapping 注解，而 @RestController 注解是传统 Spring MVC 中所提供的 @Controller 注解的升级版，相当于就是 @Controller 和 @ResponseEntity 注解的结合体，会自动使用 JSON 实现序列化/反序列化操作。</p><h4 id="配置文件" tabindex="-1">配置文件 <a class="header-anchor" href="#配置文件" aria-label="Permalink to &quot;配置文件&quot;">​</a></h4><p>我们注意到，在 src/main/resources 目录下存在一个 application.yml 文件，这就是 Spring Boot 中的主配置文件。例如，我们可以将如下所示的端口、服务名称以及数据库访问等配置信息添加到这个配置文件中：</p><div class="language-xml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">xml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">server:</span></span>
<span class="line"><span style="color:#E1E4E8;">  port: 8081</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">spring:</span></span>
<span class="line"><span style="color:#E1E4E8;">  application:</span></span>
<span class="line"><span style="color:#E1E4E8;">    name: orderservice </span></span>
<span class="line"><span style="color:#E1E4E8;">  datasource:</span></span>
<span class="line"><span style="color:#E1E4E8;">    driver-class-name: com.mysql.cj.jdbc.Driver</span></span>
<span class="line"><span style="color:#E1E4E8;">    url: jdbc:mysql://127.0.0.1:3306/appointment</span></span>
<span class="line"><span style="color:#E1E4E8;">    username: root</span></span>
<span class="line"><span style="color:#E1E4E8;">    password: root</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">server:</span></span>
<span class="line"><span style="color:#24292E;">  port: 8081</span></span>
<span class="line"><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">spring:</span></span>
<span class="line"><span style="color:#24292E;">  application:</span></span>
<span class="line"><span style="color:#24292E;">    name: orderservice </span></span>
<span class="line"><span style="color:#24292E;">  datasource:</span></span>
<span class="line"><span style="color:#24292E;">    driver-class-name: com.mysql.cj.jdbc.Driver</span></span>
<span class="line"><span style="color:#24292E;">    url: jdbc:mysql://127.0.0.1:3306/appointment</span></span>
<span class="line"><span style="color:#24292E;">    username: root</span></span>
<span class="line"><span style="color:#24292E;">    password: root</span></span></code></pre></div><p>事实上，Spring Boot 提供了强大的自动配置机制，如果没有特殊的配置需求，开发人员完全可以基于 Spring Boot 内置的配置体系完成诸如数据库访问相关配置信息的自动集成。</p><h3 id="案例驱动-springcss" tabindex="-1">案例驱动：SpringCSS <a class="header-anchor" href="#案例驱动-springcss" aria-label="Permalink to &quot;案例驱动：SpringCSS&quot;">​</a></h3><p>介绍完了基于 Spring Boot 创建一个 Web 应用的基本流程之后，我们将引出本课程的案例系统 SpringCSS，这里的 CSS 是对客户服务系统 Customer Service System 的简称。客服服务是电商、健康类业务场景中非常常见的一种业务场景，我们将通过构建一个精简但又完整的系统来展示 Spring Boot 相关设计理念和各项技术组件。</p><p>现实场景下的客户服务业务逻辑一般都非常复杂，而案例系统的目的在于演示技术实现过程，不在于介绍具体业务逻辑。所以，我们对案例的业务流程做了高度的简化，但涉及的各项技术都可以直接应用到日常开发过程中。</p><h4 id="springcss-整体架构" tabindex="-1">SpringCSS 整体架构 <a class="header-anchor" href="#springcss-整体架构" aria-label="Permalink to &quot;SpringCSS 整体架构&quot;">​</a></h4><p>在 SpringCSS 中，存在一个 customer-service，这是一个 Spring Boot 应用程序，也是整个案例系统中的主体服务。在该服务中，我们可以将采用经典的分层架构，即将服务分成 Web 层、Service 层和 Repository 层。</p><p>在客服系统中，我们知道其核心业务是生成客户工单。为此，customer-service 一般会与用户服务 account-service 进行交互，但因为用户账户信息的更新属于低频事件，所以我们设计的实现方式是 account-service 通过消息中间件的方式将用户账户变更信息主动推送给 customer--service，从而完成用户信息的获取操作。而针对 order-service，其定位是订单系统，customer-service 也需要从该服务中查询订单信息。SpringCSS 的整个系统交互过程如下图所示：</p>`,22),T=o('<p>SpringCSS 系统的整体架构图</p><p>在上图中，引出了构建 SpringCSS 的多项技术组件，在后续课程中我们会对这些技术组件做专题介绍。</p><h4 id="从案例实战到原理剖析" tabindex="-1">从案例实战到原理剖析 <a class="header-anchor" href="#从案例实战到原理剖析" aria-label="Permalink to &quot;从案例实战到原理剖析&quot;">​</a></h4><p>更进一步，通过案例帮你完成基于 Spring Boot 框架构建 Web 应用程序是 02 讲的一大目标，但也不是唯一目标。作为扩展，希望我们通过对优秀开源框架的学习，掌握各个核心组件背后的运行机制，进而深入理解架构的实现原理。</p><p>在本专栏中，我们将通过熟悉源码，剖析 Spring Boot 中核心组件的工作原理，典型的场景包括 Spring Boot 的自动配置实现原理、数据库访问实现原理、HTTP 远程调用实现原理等。</p><p>通过源码级的深入剖析学习上述核心组件的实现原理时，你可以掌握系统架构设计和实现过程中的方法和技巧，并指导日常的开发工作。</p><h3 id="小结与预告" tabindex="-1">小结与预告 <a class="header-anchor" href="#小结与预告" aria-label="Permalink to &quot;小结与预告&quot;">​</a></h3><p>案例分析是掌握一个框架应用方式的最好方法。本课程是一款以案例驱动的 Spring Boot 应用程序开发课程，今天我们主要针对一个典型的 Spring Boot Web 应用程序的组织结构和开发方式进行了详细介绍，并引出了贯穿整个课程体系的 SpringCSS 案例系统。</p><p>这里给你留一道思考题：在实现基于 Spring Boot 的 Web 应用程序时，开发人员的开发工作涉及哪几个方面？</p><p>从 03 讲开始，我们就将基于 SpringCSS 案例来解析 Spring Boot 框架，首当其冲的是它的配置体系。</p>',10),w={href:"https://shenceyun.lagou.com/t/Mka",target:"_blank",rel:"noreferrer"},M=s("p",null,[s("strong",null,"《Java 工程师高薪训练营》")],-1),I=s("p",null,[n("实战训练+面试模拟+大厂内推，想要提升技术能力，进大厂拿高薪，"),s("a",{href:"https://shenceyun.lagou.com/t/Mka",target:"_blank",rel:"noreferrer"},"点击链接，提升自己"),n("！")],-1);function V(P,W,x,R,H,j){const a=e("Image");return t(),r("div",null,[i,E,g,p(a,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image/M00/70/96/CgqCHl-7WIiAQimVAABHwO_CPqU821.png"}),n(),y,d,p(a,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image/M00/70/96/CgqCHl-7WI2AaDcrAABBSHVyAdE329.png"}),n(),u,S,_,p(a,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image/M00/70/8A/Ciqc1F-7WJeAHD-nAABRAXax5k4419.png"}),n(),h,b,m,A,C,p(a,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image/M00/70/8A/Ciqc1F-7WKCALlK_AAAvL2X5nlU081.png"}),n(),B,v,F,k,q,p(a,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image/M00/70/96/CgqCHl-7WKuAE6hIAABP4_ORBpU588.png"}),n(),D,p(a,{alt:"Drawing 5.png",src:"https://s0.lgstatic.com/i/image/M00/70/8A/Ciqc1F-7WLOAHBZ_AABP1erBa_k988.png"}),n(),f,p(a,{alt:"Drawing 6.png",src:"https://s0.lgstatic.com/i/image/M00/70/96/CgqCHl-7WMKAR1x_AACL4oIyVgU534.png"}),n(),T,s("p",null,[s("a",w,[p(a,{alt:"1.png",src:"https://s0.lgstatic.com/i/image/M00/6D/3E/CgqCHl-s60-AC0B_AAhXSgFweBY762.png"})])]),M,I])}const J=l(c,[["render",V]]);export{L as __pageData,J as default};
