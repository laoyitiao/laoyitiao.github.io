import{_ as n,j as r,o as p,g as l,k as i,h as a,Q as o,s as e}from"./chunks/framework.a0d18f64.js";const W=JSON.parse('{"title":"第07讲（上）：必会框架-Spring全家桶","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/036_32个Java面试必考点/(9) 第07讲（上）：必会框架 - Spring全家桶.md","filePath":"posts/backEnd/036_32个Java面试必考点/(9) 第07讲（上）：必会框架 - Spring全家桶.md","lastUpdated":1696682708000}'),s={name:"posts/backEnd/036_32个Java面试必考点/(9) 第07讲（上）：必会框架 - Spring全家桶.md"},c=o('<h1 id="第07讲-上-必会框架-spring全家桶" tabindex="-1">第07讲（上）：必会框架-Spring全家桶 <a class="header-anchor" href="#第07讲-上-必会框架-spring全家桶" aria-label="Permalink to &quot;第07讲（上）：必会框架-Spring全家桶&quot;">​</a></h1><p>本课时主要介绍 Java 中常用的应用框架，重点讲解如下三部分内容。</p><ol><li><p>Spring 框架中的主要知识点；</p></li><li><p>NIO 框架 Netty 以及基于 Netty 实现的主流 RPC 框架 Motan、Dubbo 和 gRPC；</p></li><li><p>ORM 框架 MyBatis。</p></li></ol><h6 id="常用框架汇总" tabindex="-1">常用框架汇总 <a class="header-anchor" href="#常用框架汇总" aria-label="Permalink to &quot;常用框架汇总&quot;">​</a></h6><p>先来看常用框架的知识点汇总，如下图所示。</p><br>',6),_=o('<p>如上图所示，左上方是 Spring 系列。很多研发人员把 Spring 看作心目中最好的 Java 项目，没有之一。Spring 系列包含非常多的项目，可以满足 Java 开发中的方方面面。那么来看几个常用的 Spring 框架。</p><h6 id="spring" tabindex="-1">Spring <a class="header-anchor" href="#spring" aria-label="Permalink to &quot;Spring&quot;">​</a></h6><p>Spring Framework，也就是我们常说的 Spring 框架，包括了 IoC 依赖注入，Context 上下文、 Bean 管理、SpringMVC 等众多功能模块，其他 Spring 项目比如 Spring Boot 也会依赖 Spring 框架。</p><p>Spring Boot 的目标是简化 Spring 应用和服务的创建、开发与部署，简化了配置文件，使用嵌入式 Web 服务器，含有诸多开箱即用的微服务功能，可以和 Spring Cloud 联合部署。Spring Boot 的核心思想是约定大于配置，应用只需要很少的配置即可，简化了应用开发模式。</p><p>Spring Data 是一个数据访问及操作的工具集，封装了多种数据源的操作能力，包括：JDBC、Redis、MongoDB 等。</p><p>Spring Cloud 是一套完整的微服务解决方案，是一系列不同功能的微服务框架的集合。Spring Cloud 基于 Spring Boot，简化了分布式系统的开发，集成了服务发现、配置管理、消息总线、负载均衡、断路器、数据监控等各种服务治理能力。比如sleuth提供了全链路追踪能力，Netflix套件提供了hystrix熔断器、zuul网关等众多的治理组件。config 组件提供了动态配置能力，bus组件支持使用 RabbitMQ、Kafka、ActiveMQ 等消息队列，实现分布式服务之间的事件通信。</p><p>Spring Security 用于快速构建安全的应用程序和服务，在 Spring Boot 和 Spring Security OAuth2 的基础上，可以快速实现常见安全模型，如单点登录，令牌中继和令牌交换。这里可以了解一下 OAuth2 授权机制和 JWT 认证方式。OAuth2 是一种授权机制，规定了完备的授权、认证流程。JWT 全称是 JSON Web Token，是一种把认证信息包含在 token 中的认证实现，OAuth2 授权机制中就可以应用 JWT 来作为认证的具体实现方法。</p><h6 id="struts" tabindex="-1">Struts <a class="header-anchor" href="#struts" aria-label="Permalink to &quot;Struts&quot;">​</a></h6><p>Struts 是曾经非常火爆的 Web 组合 SSH 中的控制层。我们知道 Web 服务一般都采用 MVC 分层模型构建，就是 Model 层负责内部数据模型，Controller 负责请求的分发控制，View 层负责返回给用户展示的视图。Struts 实现的就是其中控制层的角色。</p><p>Struts 采用 Filter 实现，针对类进行拦截，每次请求就会创建一个 Action。不过使用 Struts 的 SSH 组合已经逐渐被使用 SpringMVC 的 SSM 组合代替，也就是 SpringMVC+Spring+MyBatis的组合，一方面原因是由于 Struts 对几次安全漏洞的处理，让大家对 Struts 的信心受到影响；另一方面，SpringMVC 更加灵活，不需要额外配置，不存在和 Spring 整合等问题，使用更加方便。所以建议以 SSM 框架的学习为主。</p><h6 id="orm" tabindex="-1">ORM <a class="header-anchor" href="#orm" aria-label="Permalink to &quot;ORM&quot;">​</a></h6><p>ORM 就是对象关系匹配，解决面向对象与关系数据库存在的互不匹配的问题。简单来说，就是把关系数据库中的数据转换成面向对象程序中的对象。常用的 ORM 框架有 Hibernate 和 MyBatis，也就是 SSH 组合和 SSM 组合中的 H 与 M。</p><br><p>来看一下 Hibernate 和 MyBatis 的特点和区别。</p><ul><li><p>Hibernate 对数据库结构提供了完整的封装，实现了 POJO 对象与数据库表之间的映射，能够自动生成并执行 SQL 语句。只要定义了 POJO 到数据库表的映射关系，就可以通过 Hibernate 提供的方法完成数据库操作。Hibernate 符合 JPA 规范，就是 Java 持久层 API。</p></li><li><p>MyBatis 通过映射配置文件，将 SQL 所需的参数和返回的结果字段映射到指定对象，MyBatis 不会自动生成 SQL，需要自己定义 SQL 语句，不过更方便对 SQL 语句进行优化。</p></li></ul><br><p>总结起来，Hibernate 配置要比 MyBatis 复杂的多，学习成本也比 MyBatis 高。MyBatis，简单、高效、灵活，但是需要自己维护 SQL；Hibernate 功能强大、全自动、适配不同数据库，但是非常复杂，灵活性稍差。</p><p>Netty 是一个高性能的异步事件驱动的网络通信框架，Netty 对 JDK 原生 NIO 进行封装，简化了网络服务的开发。</p><p>另外，同类型的框架还有 MINA、Grizzly，不过目前使用得相对较少，一般不会在面试题目中出现，可以作为兴趣简单了解。</p><h6 id="rpc" tabindex="-1">RPC <a class="header-anchor" href="#rpc" aria-label="Permalink to &quot;RPC&quot;">​</a></h6><p>RPC 服务，Motan、Dubbo、gRPC 都是比较常用的高性能 RPC 框架，可以提供完善的服务治理能力，Java 版本的通信层都是基于前面提到的 Netty 实现。</p><h6 id="其他" tabindex="-1">其他 <a class="header-anchor" href="#其他" aria-label="Permalink to &quot;其他&quot;">​</a></h6><p>此外，Jersy 和 RESTEasy 都是可以快速开发 RESTful 服务的框架。与 SpringMVC 相比，这两个框架都是基于 JAX-RS 标准，而 SpringMVC 基于 Servlet，使用自己构建的 API，是两个不同的标准。</p><p>Shiro 框架是一个与 Spring Security 类似的开源的权限管理框架，用于访问授权、认证、加密及会话管理。能够支持单机与分布式 session 管理。相比 Security，Shiro更加简单易用。</p><h6 id="详解-spring-框架" tabindex="-1">详解 Spring 框架 <a class="header-anchor" href="#详解-spring-框架" aria-label="Permalink to &quot;详解 Spring 框架&quot;">​</a></h6><p>对于 Spring 框架，讲解中涉及的流程与实现默认都是基于最新的 5.x 版本。先来看 Spring 中的几个重要概念。</p><h6 id="ioc" tabindex="-1">IoC <a class="header-anchor" href="#ioc" aria-label="Permalink to &quot;IoC&quot;">​</a></h6><p>IoC，也就是控制反转，如下图，拿公司招聘岗位来举例。假设一个公司有产品、研发、测试等岗位。如果是公司根据岗位要求，逐个安排人选，如图中向下的箭头，这是正向流程。如果反过来，不用公司来安排候选人，而是由第三方猎头来匹配岗位和候选人，然后进行推荐，如图中向上的箭头，这就是控制反转。</p><br>',29),S=e("p",null,"在 Spring 中，对象的属性是由对象自己创建的，就是正向流程；如果属性不是对象创建，而是由 Spring 来自动进行装配，就是控制反转。这里的 DI 也就是依赖注入，就是实现控制反转的方式。正向流程导致了对象于对象之间的高耦合，IoC 可以解决对象耦合的问题，有利于功能的复用，能够使程序的结构变得非常灵活。",-1),h=e("h6",{id:"context-和-bean",tabindex:"-1"},[a("Context 和 Bean "),e("a",{class:"header-anchor",href:"#context-和-bean","aria-label":'Permalink to "Context 和 Bean"'},"​")],-1),g=e("p",null,"Spring 进行 IoC 实现时使用的两个概念：Context 上下文和 Bean。如下图所示，所有被 Spring 管理的、由 Spring 创建的、用于依赖注入的对象，就叫作一个 Bean。Spring 创建并完成依赖注入后，所有 Bean 统一放在一个叫作 Context 的上下文中进行管理。",-1),B=e("br",null,null,-1),d=e("h6",{id:"aop",tabindex:"-1"},[a("AOP "),e("a",{class:"header-anchor",href:"#aop","aria-label":'Permalink to "AOP"'},"​")],-1),u=e("p",null,"AOP，就是面向切面编程。如下图所示，一般我们的程序执行流程是从 Controller 层调用 Service 层、然后 Service 层调用 DAO 层访问数据，最后在逐层返回结果。这个是图中向下箭头所示的按程序执行顺序的纵向处理。",-1),C=e("br",null,null,-1),b=e("p",null,"但是，我们思考这样一个问题，一个系统中会有多个不同的服务，例如用户服务、商品信息服务等等，每个服务的Controller层都需要验证参数，都需要处理异常，如果按照图中红色的部分，对不同服务的纵向处理流程进行横切，在每个切面上完成通用的功能，例如身份认证、验证参数、处理异常等等、这样就不用在每个服务中都写相同的逻辑了，这就是 AOP 思想解决的问题。AOP 以功能进行划分，对服务顺序执行流程中的不同位置进行横切，完成各服务共同需要实现的功能。",-1),A=e("h6",{id:"组件",tabindex:"-1"},[a("组件 "),e("a",{class:"header-anchor",href:"#组件","aria-label":'Permalink to "组件"'},"​")],-1),P=e("p",null,"再来看到 Spring 框架，下图中列出了 Spring 框架主要包含的组件。这张图来自 Spring4.x 的文档。目前最新的 5.x 版本中右面的 Portlet 组件已经被废弃掉，同时增加了用于异步响应式处理的 WebFlux 组件。这里不需要对所有的组件都详细了解，只需要重点了解最常用的几个组件实现，以及知道每个组件用来实现哪一类功能就可以了。",-1),y=e("br",null,null,-1),x=e("p",null,"图中红框框住的是比较重要的组件，Core 组件是 Spring 所有组件的核心；Bean 组件和 Context 组件我刚才提到了，是实现 IoC 和依赖注入的基础；AOP 组件用来实现面向切面编程；Web 组件包括 SpringMVC，是 Web 服务的控制层实现。",-1),m=e("h6",{id:"动态代理和静态代理",tabindex:"-1"},[a("动态代理和静态代理 "),e("a",{class:"header-anchor",href:"#动态代理和静态代理","aria-label":'Permalink to "动态代理和静态代理"'},"​")],-1),T=e("p",null,"接下来是 Spring 中机制和概念相关的知识点，如下图所示。",-1),f=e("br",null,null,-1),M=o('<br><p>AOP 的实现是通过代理模式，在调用对象的某个方法时，执行插入的切面逻辑。实现的方式有动态代理，也叫运行时增强，比如 JDK 代理、CGLIB；静态代理是在编译时进行织入或类加载时进行织入，比如 AspectJ。关于 AOP 还需要了解一下对应的 Aspect、pointcut、advice 等注解和具体使用方式。</p><h6 id="placeholder-动态替换" tabindex="-1">PlaceHolder 动态替换 <a class="header-anchor" href="#placeholder-动态替换" aria-label="Permalink to &quot;PlaceHolder 动态替换&quot;">​</a></h6><p>PlaceHolder 动态替换主要需要了解替换发生的时间，是在 Bean Definition 创建完成后，Bean 初始化之前，是通过 BeanFactoryPostProcessor 接口实现的。主要实现方式有 PropertyPlaceholderConfigurer 和 PropertySourcesPlaceholderConfigurer。这两个类实现逻辑不一样，Spring Boot 使用 PropertySourcesPlaceholderConfigurer 实现。</p><h6 id="事务" tabindex="-1">事务 <a class="header-anchor" href="#事务" aria-label="Permalink to &quot;事务&quot;">​</a></h6><p>事务，需要了解 Spring 中对事务规定的隔离类型和事务传播类型。这里要知道事务的隔离级别是由具体的数据库来实现的，在数据库部分会作详细介绍。事务的传播类型，可以重点了解最常用的 REQUIRED 和 SUPPORTS类型。</p><h6 id="核心接口-类" tabindex="-1">核心接口/类 <a class="header-anchor" href="#核心接口-类" aria-label="Permalink to &quot;核心接口/类&quot;">​</a></h6><p>再来看图右上方需要重点掌握的核心类。</p><ul><li><p>ApplicationContext 保存了 IoC 的整个应用上下文，可以通过其中的 BeanFactory 获取到任意到 Bean；</p></li><li><p>BeanFactory 主要的作用是根据 Bean Definition 来创建具体的 Bean；</p></li><li><p>BeanWrapper 是对 Bean 的包装，一般情况下是在 Spring IoC 内部使用，提供了访问 Bean 的属性值、属性编辑器注册、类型转换等功能，方便 IoC 容器用统一的方式来访问 Bean 的属性；</p></li><li><p>FactoryBean 通过 getObject 方法返回实际的 Bean 对象，例如 Motan 框架中 referer 对 service 的动态代理就是通过 FactoryBean 来实现的。</p></li></ul><h6 id="scope" tabindex="-1">Scope <a class="header-anchor" href="#scope" aria-label="Permalink to &quot;Scope&quot;">​</a></h6><p>Bean 的 Scope 是指 Bean 的作用域，默认情况下是单例模式，这也是使用最多的一种方式；多例模式，即每次从 BeanFactory 中获取 Bean 都会创建一个新的 Bean。Request、Session、Global-session 是在 Web 服务中使用的 Scope。</p><ul><li><p>Request 每次请求都创建一个实例；</p></li><li><p>Session 是在一个会话周期内保证只有一个实例；</p></li><li><p>Global-session 在 5.x 版本中已经不再使用，同时增加了 Application 和 Websocket 两种Scope，分别保证在一个 ServletContext 与一个 WebSocket 中只创建一个实例。</p></li></ul><br><p>还可以了解一下 Spring 的事件机制，知道 Spring 定义的五种标准事件，了解如何自定义事件和实现对应的 ApplicationListener 来处理自定义事件。</p><h6 id="应用" tabindex="-1">应用 <a class="header-anchor" href="#应用" aria-label="Permalink to &quot;应用&quot;">​</a></h6><p>下面来看 Spring 应用相关的知识点，如下图所示。</p><br>',17),I=o('<p>首先要熟练掌握常用注解的使用。</p><ol><li><p>类型类的注解，包括 Controller、Service 等，可以重点了解一下 Component 和 Bean 注解的区别：</p><ol><li><p>@Component 注解在类上使用表明这个类是个组件类，需要 Spring 为这个类创建 Bean。</p></li><li><p>@Bean 注解使用在方法上，告诉 Spring 这个方法将会返回一个 Bean 对象，需要把返回的对象注册到 Spring 的应用上下文中。</p></li></ol></li><li><p>设置类注解可以重点了解 @Autowire 和 @Qualifier 以及 byType、byName 等不同的自动装配机制。</p></li><li><p>Web 类主要以了解为主，关注 @RequestMapping、@GetMapping、@PostMapping 等路径匹配注解，以及 @PathVariable、@RequestParam 等参数获取注解。</p></li><li><p>功能类的注解，包括 @ImportResource 引用配置、@ComponentScan 注解自动扫描、@Transactional 事务注解等等，这里不一一介绍了。</p></li></ol><p>如上图右边所示，Spring 应用部分，还需要了解配置 Spring 的几种方式：XML 文件配置、注解配置和使用 API 进行配置。</p><p>自动装配机制需要了解按类型匹配进行自动装配，按 Bean 名称进行自动装配，构造器中的自动装配和自动检测等主要的四种方式。</p><p>最后还可以了解一下 List、Set、Map 等集合类属性的配置方式以及内部 Bean 的使用。</p><h6 id="context-初始化流程" tabindex="-1">Context 初始化流程 <a class="header-anchor" href="#context-初始化流程" aria-label="Permalink to &quot;Context 初始化流程&quot;">​</a></h6><p>如下图所示，左侧是三种类型的 Context：</p><ul><li><p>XML 配置方式的 Context；</p></li><li><p>Spring Boot 的 Context；</p></li><li><p>Web 服务的 Context。</p></li></ul><br>',9),O=o('<br><p>不论哪种 Context，创建后都会调用到 AbstractApplicationContext 类的 refresh 方法，流程如下。</p><br><ol><li><p>首先对刷新进行准备，包括设置开始时间、设置激活状态、初始化 Context 环境中的占位符，这个动作根据子类的需求由子类来执行，然后验证是否缺失必要的 properties。</p></li><li><p>刷新并获得内部的 Bean Factory。</p></li><li><p>对 BeanFactory 进行准备工作，比如设置类加载器和后置处理器、配置不进行自动装配的类型、注册默认的环境 Bean。</p></li><li><p>为 Context 的子类提供后置处理 BeanFactory 的扩展能力。如果子类想在 Bean 定义加载完成后，开始初始化上下文之前做一些特殊逻辑，可以复写这个方法。</p></li><li><p>执行 Context 中注册的 Bean Factory 后缀处理器。这里有两种后置处理器，一种是可以注册 Bean 的后缀处理器，另一种是针对 BeanFactory 进行处理的后置处理器。执行的顺序是，先按优先级执行可注册 Bean 的处理器，在按优先级执行针对 BeanFactory的处理器。对 Spring Boot 来说，这一步会进行注解 Bean Definition 的解析。流程如图右侧所示，由 ConfigurationClassPostProcessor 触发、由 ClassPathBeanDefinitionScanner 解析并注册到 BeanFactory。</p></li><li><p>按优先级顺序在 BeanFactory 中注册 Bean的后缀处理器，Bean 后置处理器可以在 Bean 初始化前、后执行处理。</p></li><li><p>初始化消息源，消息源用来支持消息的国际化。</p></li><li><p>初始化应用事件广播器。事件广播器用来向 ApplicationListener 通知各种应用产生的事件，是一个标准的观察者模式。</p></li><li><p>是留给子类的扩展步骤，用来让特定的 Context 子类初始化其他的 Bean。</p></li><li><p>把实现了 ApplicationListener 的 Bean 注册到事件广播器，并对广播器中的早期未广播事件进行通知。</p></li><li><p>冻结所有 Bean 描述信息的修改，实例化非延迟加载的单例 Bean。</p></li><li><p>完成上下文的刷新工作，调用 LifecycleProcessor 的 onFresh() 方法以及发布 ContextRefreshedEvent 事件。</p></li><li><p>在 finally 中，执行第十三步，重置公共的缓存，比如 ReflectionUtils 中的缓存、 AnnotationUtils 中的缓存等等；</p></li></ol><br><p>至此，Spring 的 Context 初始化完成。由于篇幅和时间的关系，这里介绍了最主要的主流程，建议课后阅读源码来复习这个知识点，补全细节。</p><h6 id="bean-生命周期" tabindex="-1">Bean 生命周期 <a class="header-anchor" href="#bean-生命周期" aria-label="Permalink to &quot;Bean 生命周期&quot;">​</a></h6><p>面试中经常问到 Bean 的生命周期，如下图，我们先看绿色的部分，Bean 的创建过程。</p><br>',9),q=o('<br><ol><li><p>调用 Bean 的构造方法创建 Bean；</p></li><li><p>通过反射调用 setter 方法进行属性的依赖注入；</p></li><li><p>如果实现 BeanNameAware 接口的话，会设置 Bean 的 name；</p></li><li><p>如果实现了 BeanFactoryAware，会把 BeanFactory 设置给 Bean；</p></li><li><p>如果实现了 ApplicationContextAware，会给 Bean 设置 ApplictionContext；</p></li><li><p>如果实现了 BeanPostProcessor 接口，则执行前置处理方法；</p></li><li><p>实现了 InitializingBean 接口的话，执行 afterPropertiesSet 方法；</p></li><li><p>执行自定义的 init 方法；</p></li><li><p>执行 BeanPostProcessor 接口的后置处理方法。</p></li></ol><br><p>以上就完成了 Bean 的创建过程。而在使用完 Bean 需要销毁时，会先执行 DisposableBean 接口的 destroy 方法，然后在执行自定义的 destroy 方法。这部分也建议阅读源码加深理解。</p><h6 id="扩展接口" tabindex="-1">扩展接口 <a class="header-anchor" href="#扩展接口" aria-label="Permalink to &quot;扩展接口&quot;">​</a></h6><p>在对 Spring 进行定制化功能扩展时，可以选择一些扩展点，如下图所示。</p><br>',7),R=o('<ul><li><p>BeanFactoryPostProcessor 是 BeanFactory 后置处理器，支持在 BeanFactory 标准初始化完成后，对 BeanFactory 进行一些额外处理。讲 Context 初始化流程时介绍过，这时所有的 Bean 的描述信息已经加载完毕，但是还没有进行 Bean 初始化。例如前面提到的 PropertyPlaceholderConfigurer，就是在这个扩展点上对 Bean 属性中的占位符进行替换。</p></li><li><p>BeanDefinitionRegistryPostProcessor，它扩展自BeanFactoryPostProcessor，在执行 BeanFactoryPostProcessor 的功能前，提供了可以添加 Bean Definition 的能力，允许在初始化一般 Bean 前，注册额外的 Bean。例如可以在这里根据 Bean 的 Scope 创建一个新的代理 Bean。</p></li><li><p>BeanPostProcessor，提供了在 Bean 初始化之前和之后插入自定义逻辑的能力。与 BeanFactoryPostProcessor 的区别是处理的对象不同，BeanFactoryPostProcessor 是对 BeanFactory 进行处理，BeanPostProcessor 是对 Bean 进行处理。</p></li></ul><p>上面这三个扩展点，可以通过实现 Ordered 和PriorityOrdered 接口来指定执行顺序。实现 PriorityOrdered 接口的 processor 会先于实现 Ordered 接口的执行。</p><ul><li><p>ApplicationContextAware，可以获得 ApplicationContext 及其中的 Bean，当需要在代码中动态获取 Bean 时，可以通过实现这个接口来实现。</p></li><li><p>InitializingBean，可以在 Bean 初始化完成，所有属性设置完成后执行特定逻辑，例如对自动装配对属性进行验证等。</p></li><li><p>DisposableBean，用于在 Bean 被销毁前执行特定的逻辑，例如做一些回收工作等。</p></li><li><p>ApplicationListener，用来监听 Spring 的标准应用事件或者自定义事件。</p></li></ul><h6 id="spring-boot" tabindex="-1">Spring Boot <a class="header-anchor" href="#spring-boot" aria-label="Permalink to &quot;Spring Boot&quot;">​</a></h6><p>下面来看 Spring Boot 相关的知识点，如下图所示。</p><br>',6),k=o("<p>首先是 Spring Boot 启动流程的主要步骤：</p><ol><li><p>要配置 Environment。</p></li><li><p>准备 Context 上下文，包括执行 ApplicationContext 的后置处理、初始化 Initializer、通知Listener 处理 ContextPrepared 和 ContextLoaded 事件。</p></li><li><p>执行 refreshContext，也就是前面介绍过的 AbstractApplicationContext 类的 refresh 方法。</p></li></ol><br><p>然后要知道在 Spring Boot 中有两种上下文，一种是 bootstrap, 另外一种是 application。其中，bootstrap 是应用程序的父上下文，会先于 applicaton 加载。bootstrap 主要用于从额外的资源来加载配置信息，还可以在本地外部配置文件中解密属性。bootstrap 里面的属性会优先加载，默认也不能被本地相同配置覆盖。</p><p>再来看 Spring Boot 的注解。</p><br><p>需要知道 @SpringBootApplication 包含了 @ComponentScan、@EnableAutoConfiguration、@SpringBootConfiguration 三个注解，而 @SpringBootConfiguration 注解包含了 @Configuration 注解。也就是 Spring Boot 的自动配置功能。@Conditional 注解就是控制自动配置的生效条件的注解，例如 Bean 或 Class 存在、不存在时进行配置，当满足条件时进行配置等。</p><p>最后，了解一下 Spring Boot 的几个特色模块。</p><ul><li><p>Starter 是 Spring Boot 提供的无缝集成功能的一种方式，使用某个功能时开发者不需要关注各种依赖库的处理，不需要具体的配置信息，由 Spring Boot 自动配置进行 Bean的创建。例如需要使用 Web 功能时，只需要在依赖中引入 Spring-boot-starter-web 即可。</p></li><li><p>Actuator 是用来对应用程序进行监视和管理，通过 RESTful API 请求来监管、审计、收集应用的运行情况。</p></li><li><p>DevTools 提供了一系列开发工具的支持，来提高开发效率。例如热部署能力等。</p></li><li><p>CLI 就是命令行接口，是一个命令行工具，支持使用 Groovy 脚本，可以快速搭建 Spring 原型项目。</p></li></ul><br>",10);function V(E,D,F,N,v,J){const t=r("Image");return p(),l("div",null,[c,i(t,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/C6/CgoB5l14puyAas0oAABAOzPMKjQ128.png"}),a(),_,i(t,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/E6/CgotOV14puyAODLyAAAnwOuTkEk368.png"}),a(),S,h,g,B,i(t,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/C6/CgoB5l14puyAWtEwAAA9kZ-6cDw595.png"}),a(),d,u,C,i(t,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/E6/CgotOV14puyAUnRTAAAlyBIiwZM437.png"}),a(),b,A,P,y,i(t,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/C6/CgoB5l14puyAXsN8AAB-CNBQpnQ843.png"}),a(),x,m,T,f,i(t,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/E6/CgotOV14puyAZTSdAAGNifGMENk298.png"}),a(),M,i(t,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/C6/CgoB5l14puyAK0COAAGd_8jLTtQ986.png"}),a(),I,i(t,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/E6/CgotOV14puyAX4lxAACLbBAfsE8470.png"}),a(),O,i(t,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/C6/CgoB5l14puyAAa1gAABPP0lufvQ678.png"}),a(),q,i(t,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/E6/CgotOV14puyAOsrSAAB6eiNuRJY924.png"}),a(),R,i(t,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/C6/CgoB5l14puyAX-52AAFrldgEgbY662.png"}),a(),k])}const Q=n(s,[["render",V]]);export{W as __pageData,Q as default};
