import{_ as t,o as r,g as o,Q as i}from"./chunks/framework.f949202b.js";const h=JSON.parse('{"title":"Spring Boot 介绍","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/041_300分钟搞懂 Spring Cloud/(89) 第01讲：夯实基础-Spring Boot.md","filePath":"posts/backEnd/041_300分钟搞懂 Spring Cloud/(89) 第01讲：夯实基础-Spring Boot.md","lastUpdated":null}'),p={name:"posts/backEnd/041_300分钟搞懂 Spring Cloud/(89) 第01讲：夯实基础-Spring Boot.md"},a=i('<p>欢迎来到第 1 课时&quot;夯实基础-Spring Boot&quot;，这一课时主要包含以下内容：</p><ul><li><p>Spring Boot 的基本介绍；</p></li><li><p>Spring Boot 的使用；</p></li><li><p>Spring Boot 配置管理；</p></li><li><p>Spring Boot Starter 自定义；</p></li><li><p>Spring Boot 监控等多个方面的内容。</p></li></ul><h1 id="spring-boot-介绍" tabindex="-1">Spring Boot 介绍 <a class="header-anchor" href="#spring-boot-介绍" aria-label="Permalink to &quot;Spring Boot 介绍&quot;">​</a></h1><h3 id="spring-boot-基础介绍" tabindex="-1">Spring Boot 基础介绍 <a class="header-anchor" href="#spring-boot-基础介绍" aria-label="Permalink to &quot;Spring Boot 基础介绍&quot;">​</a></h3><p>众所周知，Spring Boot 是由 Pivotal 团队提供的全新框架，并于 2014 年 4 月发布第一个版本，其设计目的是用来简化 Spring 应用的搭建，以及开发过程。Spring Boot 有以下特点：</p><ul><li><p>Spring Boot 通过简单的步骤就可以创建一个 Spring 应用。</p></li><li><p>Spring Boot 为 Spring 整合第三方框架提供了开箱即用功能。</p></li><li><p>Spring Boot 的核心思想是约定大于配置。</p></li></ul><p>使用 Spring Boot 可以大大简化开发模式，提高开发效率。我对 Spring Boot 的评价就一句话：Java 开发者的福音。</p><h3 id="spring-boot-解决的问题" tabindex="-1">Spring Boot 解决的问题 <a class="header-anchor" href="#spring-boot-解决的问题" aria-label="Permalink to &quot;Spring Boot 解决的问题&quot;">​</a></h3><p>在没接触 Spring Boot 之前，使用 Spring 进行开发时，经常会遇到以下问题。</p><ul><li><p>搭建后端框架时需要手动添加框架的 Maven 配置，会涉及很多 XML 配置文件，增加了搭建项目框架的难度和时间成本。</p></li><li><p>无论是本地调试还是线上部署，都需要首先安装 Tomcat，然后将项目编译成 war 包，部署到 Tomcat 中，这样非常不方便。</p></li><li><p>应用监控做的比较简单，通常都是通过一个没有任何逻辑的接口来判断应用的存活状态。</p></li></ul><h3 id="spring-boot-亮点" tabindex="-1">Spring Boot 亮点 <a class="header-anchor" href="#spring-boot-亮点" aria-label="Permalink to &quot;Spring Boot 亮点&quot;">​</a></h3><p>随着 Spring Boot 的出现，轻松解决了上面的这些问题，我们下面来看看为什么 Spring Boot 可以解决这些问题。</p><p>主要是因为 Spring Boot 的 4 个亮点，分别是自动装配、内嵌容器、应用监控、Starter 包简化框架集成难度。</p><ul><li><p>自动装配：Spring Boot 会根据某些规则对所有配置的 Bean 进行初始化。可以减少了很多重复性的工作。比如使用 MongoDB 时，只需要在 pom.xml 中加入 MongoDB 的 Starter 包，然后配置 MongoDB 的连接信息，就可以直接使用 MongoTemplate 自动装配来操作数据库了。</p></li><li><p>内嵌容器：Spring Boot 应用程序可以不用部署到外部容器中，比如 Tomcat。Spring Boot 应用程序可以直接通过 Maven 命令编译成可执行的 jar 包，通过 java-jar 命令启动即可，非常方便。</p></li><li><p>应用监控：Spring Boot 中自带监控功能 Actuator，可以实现对程序内部运行情况进行监控，比如 Bean 加载情况、环境变量、日志信息、线程信息等。当然也可以自定义跟业务相关的监控，通过Actuator 的端点信息进行暴露。</p></li><li><p>Starter 包简化框架集成难度：将 Bean 的自动装配逻辑封装在 Starter 包内部，同时也简化了 Maven Jar 包的依赖，对框架的集成只需要加入一个 Starter 包的配置，降低了烦琐配置的出错几率。</p></li></ul><h3 id="spring-boot-常用-starter-包" tabindex="-1">Spring Boot 常用 Starter 包 <a class="header-anchor" href="#spring-boot-常用-starter-包" aria-label="Permalink to &quot;Spring Boot 常用 Starter 包&quot;">​</a></h3><p>Spring Boot 的 Starter 包有很多，几乎覆盖了 Java 领域的大部分框架，这里列举几个常用的 Starter 包。</p><ul><li><p>spring-boot-starter-web：用于快速构建基于 Spring MVC 的 Web 项目。</p></li><li><p>spring-boot-starter-data-redis：用于快速整合并操作 Redis。</p></li><li><p>spring-boot-starter-data-mongodb：用于对 MongoDB 的集成。</p></li><li><p>spring-boot-starter-data-jpa：用于操作 MySQL。</p></li><li><p>spring-boot-starter-activemq：用于操作 ActiveMQ。</p></li></ul><p>除了这些比较常用的 Starter 包之外，还有很多是你在工作中需要使用的，这里不再赘述，请你课下参考官方文档查询。</p><h1 id="spring-boot-使用" tabindex="-1">Spring Boot 使用 <a class="header-anchor" href="#spring-boot-使用" aria-label="Permalink to &quot;Spring Boot 使用&quot;">​</a></h1><h3 id="spring-boot-项目创建" tabindex="-1">Spring Boot 项目创建 <a class="header-anchor" href="#spring-boot-项目创建" aria-label="Permalink to &quot;Spring Boot 项目创建&quot;">​</a></h3><p>Spring Boot 的项目创建方式分为两种：</p><ol><li><p>首先创建一个 Maven 项目，然后手动往这个 Maven 项目中添加 Spring Boot 需要的依赖；</p></li><li><p>通过官方脚手架页面创建 Spring Boot 项目。</p></li></ol><p>相比于第一种方式，方式二降低了学习难度，也是目前最简单的创建方式。</p><p><img src="http://s0.lgstatic.com/i/image2/M01/8B/B8/CgoB5l16CcGASwhHAACb19MWf5Y813.png" alt=""></p><p>进入页面后，你可以选择即将创建项目的类型是 Maven 或是 Gradle, 以及开发语言，Spring Boot 版本，依赖的 Starter 等信息，最后生成项目，下载到本地，然后导入开发工具中。</p><p>如果你不想在官方提供的网站中创建项目，也可以在开发工具中创建项目，下面我们搭建一个 Spring Boot 的 Web 后端服务。</p><p><img src="http://s0.lgstatic.com/i/image2/M01/8B/C0/CgoB5l16F5CANbFZAMhzV5onKV0396.gif" alt=""></p><p>首先，我们需要通过脚手架创建一个 Spring Boot 项目并导入开发工具中，这里使用的是 STS, 当然你也可以选择自己熟悉的工具，比如 IDEA。</p><p>这里事先创建好了一个 Spring Boot 项目，然后将项目导入了开发工具 STS 中。查看项目的 pom.xml 文件，parent 节点配置了 Spring Boot 的信息，指定了版本为 2.1.6.RELEASE，并且依赖了 spring-boot-starter-web。</p><p><img src="http://s0.lgstatic.com/i/image2/M01/8B/C0/CgoB5l16F7yAfj3KAINssw4qZtI832.gif" alt=""></p><p>第二步，需要对项目进行配置，配置都在 application.properties 中进行添加，配置 Tomcat 的端口信息，令 server.port=8082，也可以不用配置，默认是 8080 端口。</p><p><img src="http://s0.lgstatic.com/i/image2/M01/8B/E0/CgotOV16F8KAMXJ_AGVdCQqkM-0530.gif" alt=""></p><p>第三步，需要编写 RestController，开发业务接口，这里简单以 hello 接口为例，然后返回一个字符串。</p><p><img src="http://s0.lgstatic.com/i/image2/M01/8B/C0/CgoB5l16F-iASQEGAQ-_KSlfEgg265.gif" alt=""></p><p>第四步，在 Spring Boot 中只需要执行启动类中的 Main 方法启动项目即可，启动后可以看到控制台输出 Tomcat started on port，显示当前服务的端口号，在浏览器中访问 <a href="http://localhost:8082/hello%EF%BC%8C%E5%B0%B1%E5%8F%AF%E4%BB%A5%E7%9C%8B%E5%88%B0%E6%88%91%E4%BB%AC%E5%9C%A8%E6%8E%A5%E5%8F%A3%E4%B8%AD%E8%BF%94%E5%9B%9E%E7%9A%84%E5%86%85%E5%AE%B9%E4%BA%86%E3%80%82" target="_blank" rel="noreferrer">http://localhost:8082/hello，就可以看到我们在接口中返回的内容了。</a></p><h3 id="spring-boot-编译打包" tabindex="-1">Spring Boot 编译打包 <a class="header-anchor" href="#spring-boot-编译打包" aria-label="Permalink to &quot;Spring Boot 编译打包&quot;">​</a></h3><p>通过上面这个简单的示列，相信你一定体会到了 Spring Boot 的简便性，不要着急，我们继续来学习 Spring Boot 的其他功能，相信你一定会对 Spring Boot 这个框架爱不释手。</p><br><p>对 Spring Boot 项目进行打包，首先需要配置一个 spring-boot-maven-plugin 打包插件，在 configuration 节点中添加 mainClass 节点，指定程序的启动类。</p><br><p><img src="http://s0.lgstatic.com/i/image2/M01/8B/C3/CgoB5l16IDyAJGK5ADq0_nQL4t8907.gif" alt=""></p><p>配置完成后就可以通过 Maven 的命令进行编译打包了，最简单的方式是直接用开发工具自带的 Maven 插件进行编译，选中项目，单击右键，可以看到 Run As 菜单，选中 Maven Build 选项，输入编译的命令 clean package，编译后，进入项目源码的 target 目录，可以看到打包好了的可执行的 jar 包，部署的时候直接用这个 jar 部署启动即可。</p><br><p>这里需要注意，在开发工具中只是给大家演示 Spring Boot 的打包过程，在公司中都有专门的部署平台来负责拉代码，编译，打包，最后发布到对应的机器上。</p><h3 id="spring-boot配置管理" tabindex="-1">Spring Boot配置管理 <a class="header-anchor" href="#spring-boot配置管理" aria-label="Permalink to &quot;Spring Boot配置管理&quot;">​</a></h3><p>在实际工作中我们无法避免如何区分多环境的问题，开发环境连接的是开发环境的数据库，测试环境连接的是测试环境的数据库，等等，不同环境下的配置信息是不一样的。如果我们只有一个配置文件，意味着每次在发布前都需要手动修改配置文件为当前发布环境，这样非常不方便，而且也很容易出错。</p><br><p>而在 Spring Boot 中解决这个问题非常简单，我们可以为每个环境定义一个配置文件，最后通过 spring.profiles.active 来激活对应的配置文件。</p><br><p><img src="http://s0.lgstatic.com/i/image2/M01/8B/E0/CgotOV16GBaAGEOiAH_Dc2S7jJ0705.gif" alt=""></p><p>首先在 resources 目录下创建一个 application-dev.properties，配置 server.port=8082。</p><br><p><img src="http://s0.lgstatic.com/i/image2/M01/8B/C0/CgoB5l16GBeAVp78AIMD4WizaMw065.gif" alt=""></p><p>然后再创建一个 application-test.properties，配置 server.port=8083，现在相当于有 dev 和 test 两个环境的配置。</p><br><p><img src="http://s0.lgstatic.com/i/image2/M01/8B/C3/CgoB5l16HdGAEcguADyOblBXdxk142.gif" alt=""></p><p>那么该使用哪个环境下的配置取决于 spring.profiles.active 的值，在默认的 application.properties 中配置 spring.profiles.active=dev，启动项目，可以看到当前的端口是 8082，再次将 spring.profiles.active=dev 改成 test，启动项目，端口变成 8083，这样我们就可以做到在不同环境下使用不同的配置了。</p><p>在后面的课时中会讲解通过配置中心的方式来集中管理配置信息，通过配置中心来区分多环境，在配置中心修改的配置会实时推送到应用内，可以不用重启，非常方便。</p><p>我记得刚工作时，在第一家公司接触的项目都是基于 SSH 搭建的，项目中的配置信息也是存储在 properties 属性文件中的，不同的是读取配置用的是手动封装的 PropertiesUtils 工具类。使用工具类可以指定你要读取的文件和对应的 Key。</p><p>我们在用官方提供的脚手架创建 Spring Boot 项目后，会默认在项目的 resources 目录下生成一个 application.properties 配置文件，项目中所有配置内容都可以放在这个文件中，这时我们是否还需要使用 PropertiesUtils 这种工具类来读取配置文件的内容呢？</p><br><p>答案是完全不需要，在 Spring Boot 中读取配置内容有以下三种方式：</p><ul><li><p>Environment</p></li><li><p>@Value</p></li><li><p>@ConfigurationProperties</p></li></ul><p>第一种方式：Environment。</p><p><img src="http://s0.lgstatic.com/i/image2/M01/8B/E0/CgotOV16GGiADV0UANCdt_kBzKo893.gif" alt=""></p><p>Environment 用于管理当前的应用环境信息，定义了获取 Profile 的方法，同时继承了 PropertyResolver，PropertyResolver 提供了属性访问的相关方法。</p><br><p>所以我们通过 Environment 的 getProperty() 方法读取指定配置 Key 的内容。</p><br><p>在 Controller 中注入 Environment 的实例，通过 getProperty 就可以获取对应的 Key 的属性值。</p><p>第二种方式：@Value注解。</p><br><p><img src="http://s0.lgstatic.com/i/image2/M01/8B/C0/CgoB5l16GHiAP27rAMoepDQ1FXI596.gif" alt=""></p><p>在注解中指定配置 Key，直接可以将属性值注入到该字段中。</p><br><p>在 Controller 中定义一个 port 字段，在 port 上使用 @Value 注入当前项目的端口值，冒号后面是在无值的情况下给的默认值，避免没配置值的报错问题。</p><br><p><img src="http://s0.lgstatic.com/i/image2/M01/8B/C3/CgoB5l16HeyABtn8AE5Ic7f5ZlA175.gif" alt=""></p><p>第三种方式：@ConfigurationProperties。</p><br><p>前面我们讲解了通过 Environment 和 @Value 注解的方式来读取配置文件中的属性值，这两种方式都是对单独的属性进行读取，使用的时候也都是散落在各个类中，然后很多场景下，我们需要有一组配置，都是服务于某个功能或者业务的，比如数据源的配置：spring.datasource.url、spring.datasource.username，这些配置我们希望能够集中管理和使用，这个时候可以使用 @ConfigurationProperties 注解将属性值注入到实体类中。</p><p><img src="http://s0.lgstatic.com/i/image2/M01/8B/C0/CgoB5l16GHyAHUb1ANhD9ySCkrI105.gif" alt=""></p><p>这里定义了一个 User 的实体类，并定义了 name 字段和对应的 get、set 方法，在类上添加 @Configuration 和 @ConfigurationProperties(prefix=&quot;spring&quot;) 注解，并指定前缀为 spring。</p><p>然后在配置文件中填加 spring.name 的配置，spring.name 将会自动注入 User 实体中，由于 User 类添加了 @Configuration 注解，我们在使用时可以直接通过 @Autowired 进行注入，然后就可以访问 User 类的 getName 方法获取 name 的值了。</p><br><p><img src="http://s0.lgstatic.com/i/image2/M01/8B/E0/CgotOV16GIaAIfPXACGjQ0529lk579.gif" alt=""></p><p>最后我们在浏览器中访问 config 接口，可以看到三种方式分别读取的配置内容。</p><p>此时你是不是会感慨一句，Spring Boot 真方便。其实我们使用框架就是为了提高开发效率，框架的职责就是将一些通用的功能封装好，方便使用。你会发现框架随着时间的推移会变得越来越简单，这个简单不是说框架提供的能力简单，而是对使用者来说使用越来越简单，复杂的都在框架内部实现了。</p><h2 id="spring-boot-starter-自定义" tabindex="-1">Spring Boot Starter 自定义 <a class="header-anchor" href="#spring-boot-starter-自定义" aria-label="Permalink to &quot;Spring Boot Starter 自定义&quot;">​</a></h2><p>Starter 包可以说是 Spring Boot 中的核心功能，Starter 的出现，简化了很多工作，在Spring Cloud 中我们也会接触到各种的 Starter，除了使用官方提供的 Starter 包之外，我们也会遇到需要自定义 Starter 的场景。所以需要了解 Starter 的构建原理，以及能够自己动手构建一个 Starter，这样在集成的 Starter 包报错时，能够去分析错误，以及解决错误，正所谓知己知彼，才能百战百胜。</p><p>这里总结了自定义一个 Starter 需要的6个步骤：</p><ol><li><p>创建 Starter 项目；</p></li><li><p>项目创建完后定义 Starter 需要的配置（Properties）类，比如数据库的连接信息；</p></li><li><p>编写自动配置类，自动配置类就是获取配置，根据配置来自动装配 Bean；</p></li><li><p>编写 spring.factories 文件加载自动配置类，Spring 启动的时候会扫描 spring.factories 文件，指定文件中配置的类；</p></li><li><p>编写配置提示文件 spring-configuration-metadata.json（不是必须的），在添加配置的时候，我们想要知道具体的配置项是什么作用，可以通过编写提示文件来提示；</p></li><li><p>最后就是使用，在项目中引入自定义 Starter 的 Maven 依赖，增加配置值后即可使用。</p></li></ol><p>以上是我总结出来定义 Starter 包需要执行的步骤，接下来我们根据上面的步骤来看下实际的代码部分怎么编写。</p><br><p><img src="http://s0.lgstatic.com/i/image2/M01/8B/E3/CgotOV16HfaAI3bcAGA3upBSYqM629.gif" alt=""></p><p>首先我们需要创建一个 springboot-starter-demo 的 Spring Boot 项目，并依赖 spring-boot-starter-web，lombok 是用来简化 get、set 方法的类库，需要在开发工具中安装插件，spring-boot-configuration-processor 这个是专门配合@ConfigurationProperties 注解来使用的。</p><p>接着编写配置类，也就是自定义的 Starter 需要的配置信息，直接使用 @ConfigurationProperties 来注入配置信息。</p><p><img src="http://s0.lgstatic.com/i/image2/M01/8B/E5/CgotOV16JqeAV7NkAClhxNljPA4771.gif" alt=""></p><p>配置完信息后，就需要开始进行自动装配工作了，新建一个 UserAutoConfigure 类，用于装配 UserClient，类上添加 @EnableConfigurationProperties 注解，作用是启用 @ConfigurationProperties 注解的类，否则无法读取到配置信息。</p><p>通过 @Bean 注解构建一个 UserClient，将配置信息通过 UserClient 的构造函数传入。</p><p>UserClient 中定义了一个 getName 方法，用于读取配置中的值。</p><br><p><img src="http://s0.lgstatic.com/i/image2/M01/8B/C3/CgoB5l16Hp-AZy8aAGR-zCc9Gc8937.gif" alt=""></p><p>接下来需要让自动装配的类生效，很多 Starter 只要在 pom.xml 中依赖了，项目启动的时候就会自动装配，这是因为在项目的 resource 下的 META-INF 目录中有一个 spring.factories 文件，里面指定了需要被装配的类。</p><br><p>我们也需要创建一个 spring.factories，里面指定我们的装配类 UserAutoConfigure。</p><br><br><p>配置提示不是必须的，为了让使用体验更好，最好是编写一个 spring-configuration-metadata.json 文件，这样使用时就知道你的 Starter 有哪些配置，以及配置项的含义和默认值了。</p><p>提示文件内容的格式也很简单，就是一个 json 数据，properties 中配置每个属性的信息，name 表示属性的名称，type 表示属性的数据类型，defaultValue 表示默认值。</p><br><p><img src="http://s0.lgstatic.com/i/image2/M01/8B/C3/CgoB5l16HtiAEZE3AC6E2sTHc-4083.gif" alt=""></p><p>如果你不知道怎么编写，或者想知道其他更多的提示内容编写方式，可以通过查看 Spring Boot 自带的配置来参考编写。我们找到项目中 spring-boot-autoconfigure 这个 jar, 找到 spring-configuration-metadata.json 文件，可以看到里面定义了很多配置属性的提示信息。</p><br><p><img src="http://s0.lgstatic.com/i/image2/M01/8B/E3/CgotOV16HvWAUv8UAFBYdAsnN2Y247.gif" alt=""></p><p>最后一步，我们需要在使用的项目中加入我们自定义的 Starter 的依赖，然后在配置文件中增加配置 spring.user.name，这样就完成了整个流程。</p><br><p><img src="http://s0.lgstatic.com/i/image2/M01/8B/C3/CgoB5l16HwWAURJJAEi-bnY39_0581.gif" alt=""></p><p>项目在启动的时候会自动构建 UserClient，我们可以编写一个 Controller 来验证一下效果，在 Controller 中可以直接注入 UserClient，然后调用 getName 方法，这个方法返回的就是我们刚刚配置的值。就相当于你只依赖了一个 Starter，然后加了一些配置，就可以直接使用 UserClient，关于 UserClient 怎么构建的你不需要关心，逻辑都封装在 Starter 内部，降低了使用难度。</p><br><p><img src="http://s0.lgstatic.com/i/image2/M01/8B/E3/CgotOV16HweAcDlpAF9VpJeeMRQ119.gif" alt=""></p><p>在某些场景下，我们的 Starter 不需要被依赖就开启自动装配，而是需要使用者进行手动的开启，为了满足这个需求，我们需要去掉 spring.factories，大部分手动开启都是通过在启动类上加一个注解来开启某个功能，我们同样也可以定义一个开启 UserClient 的注解 @EnableUserClient。</p><p>最核心的点在于使用了 @Import 注解来导入我们的自动配置类，这样只有使用者在启动类上增加了 @EnableUserClient 注解，然后通过 @Import 导入自动配置类，开启自动装配工作。</p><br><p><img src="http://s0.lgstatic.com/i/image2/M01/8B/E3/CgotOV16HwKALWE1AHNGVxBJkVI623.gif" alt=""></p><p>需求总是多样化的，假如你的 Starter 自动装配，需要装配很多内容，但里面的某些内容需要进一步的满足某些条件才进行初始化，这个时候我们往往会通过配置的方式来指定需不需要开启装配。</p><br><p>可以使用 @ConditionalOnProperty 注解来实现，作用是当配置中某个属性的值满足条件才开启装配，我们定义一个 spring.user.enabled=true 的配置项，如果配置中没有 spring.user.enabled 配置或者没有等于 true, 那么 UserClient 将不会进行装配。将配置中的 spring.user.enabled 去掉，你会发现启动的时候报错了，项目中注入了 UserClient，但是 UserClient 并没有创建。</p><h1 id="spring-boot-监控" tabindex="-1">Spring Boot 监控 <a class="header-anchor" href="#spring-boot-监控" aria-label="Permalink to &quot;Spring Boot 监控&quot;">​</a></h1><h3 id="spring-boot-actuator" tabindex="-1">Spring Boot actuator <a class="header-anchor" href="#spring-boot-actuator" aria-label="Permalink to &quot;Spring Boot actuator&quot;">​</a></h3><p>健康监控在项目部署时是必不可少的一个环节，强大的监控能够帮助我们及时发现应用程序故障。</p><p>我见过很多项目中通过自己编写一个接口的方式来判断当前应用是否健康，其实就是返回一个字符串，只要这个接口能正常返回就认为当前应用是健康状态。</p><p>这种方式存在很大的问题，当数据库在运行过程中出问题，这个自定义的健康检查接口只是返回一个固定的内容而已，不会去对数据库进行操作，是无法感知数据库是否正常，如果数据库都不正常了，那么当前应用在检测的时候还处于一个正常的状态，这样就失去了检测的意义。也无法快速及时的通过监控来发现问题，监控不是万能的，监控就是作为辅助你的一个工具而已，能够在发生问题时，及时将这个情况通知到对应的负责人。</p><p>Spring Boot 中提供了一个用于监控和管理自身应用信息的模块，它就是 spring-boot-starter-actuator。</p><p>通过集成 actuator 可以将 Spring Boot 应用本身的一些信息通过 HTTP 或 JMX 的方式暴露出去，可以让第三方的监控工具拉取这些信息，进行信息的管理，查看，监控和告警。</p><br><p><img src="http://s0.lgstatic.com/i/image2/M01/8B/C3/CgoB5l16HxWAXRe-ACFqVH78k3Y399.gif" alt=""></p><p>下面我们将 actuator 整合到 Spring Boot 中，整合的过程非常简单，这就是 Spring Boot 自带的魅力，只需要在项目的 pom.xml 文件中增加 spring-boot-starter-actuator 的依赖就可以将 actuator 整合到 Spring Boot 项目中。</p><br><p><img src="http://s0.lgstatic.com/i/image2/M01/8B/E2/CgotOV16HAOARrhIAI1UMPi_4Kc713.gif" alt=""></p><p>然后我们启动下项目, 访问 actuator/health 这个端点，可以看到返回了 status为UP，证明当前健康状态是正常的，如果 status 为 DOWN 那就是不健康的状态。</p><br><p>Spring Boot actuator 中内置了很多 Endpoint，也就是端点信息，刚刚访问的 health 就是一个端点。这里列举了几个常用的端点信息：</p><p>/actuator/health 查看应用健康指标，health 端点能够及时反馈出当前应用的监控状态，health的值默认是当前磁盘的使用情况，同时也支持对很对框架的健康状态反馈。</p><br><p>讲到这里想必大家都应该清楚了 health 端点的原理，当我们需要在自己的项目中结合业务本身做一些健康监控时，可以实现自己的 HealthIndicator。</p><p>Spring Boot 中集成的框架基本上都有自己的 HealthIndicator，在这些框架出问题后，/health 能够及时反馈健康信息，这也是前面我们提到自定义接口返回固定的内容来做检测所欠缺的部分。</p><br><p><img src="http://s0.lgstatic.com/i/image2/M01/8B/E3/CgotOV16HzeAS0fdADQaFXwau68863.gif" alt=""></p><p>如果我们需要加入一些其他的判断来决定应用的监控状态时，可以继承 AbstractHealthIndicator 类，实现自己的 HealthIndicator。具体需要实现 doHealthCheck 方法，在 doHealthCheck 中进行健康状态的判断，健康状态使用 builder.up() 表示，不健康使用 builder.down() 方法表示，未知的状态使用 builder.unknown() 方法表示，应用已停止服务使用 builder.outOfService() 方法表示。</p><br><p><img src="http://s0.lgstatic.com/i/image2/M01/8B/C2/CgoB5l16G9uAbVYEAHy-CeWcRWg801.gif" alt=""></p><p>如果需要展示详细的信息，可以使用 withDetail 方法来添加详细信息，这样在访问 /health 端点时就可以显示这些详细信息了，前提是需要打开这个详情展示的功能，默认是关闭的，我们可以通过配置management.endpoint.health.show-details=ALWAYS 开启。</p><br><p><img src="http://s0.lgstatic.com/i/image2/M01/8B/E2/CgotOV16G-CAfpHfAFvvUPKrgJE402.gif" alt=""></p><p>自定义完成后，我们启动项目，访问一下actuator/health端点，可以看到自定义的信息。</p><p>/actuator/beans 查看 bean 及其关系列表，其他的端点也是一样的访问方式，不做过多讲解。更多端点的信息请参考官方文档。</p><br><p><img src="http://s0.lgstatic.com/i/image2/M01/8B/C3/CgoB5l16H0KAXtw_AD9Zu3LQPW8808.gif" alt=""></p><p>需要注意的是 Spring Boot1 版本和 Spring Boot2 版本对 actuator 的访问路径和默认暴露都不太一样，我们这里是 Spring Boot2 的版本，所有开放的端点的路径都以 /actuator 开头，默认很多端点是不开放的，我们可以通过配置 management.endpoints.web.exposure.include=* 暴露全部的端点。</p><p>上面这些端点都是actuator中内置的，在实际工作中，你会有自定义端点的需求，比如说你封装了某个框架，这个时候你需要有检查这个框架健康的端点，健康检查我们可以扩展已有的 /health 端点来实现。除了健康检查，你可能还需要一个能够展示框架内部一些信息的端点。</p><br><p><img src="http://s0.lgstatic.com/i/image2/M01/8B/C3/CgoB5l16H0iAVqguADsKdZyzlXg815.gif" alt=""></p><p>自定义端点也是非常简单的，只需要一个 @Endpoint 注解就可以实现，我们来实现一个名称为 springcloud 的端点，创建一个类，增加 @Endpoint(id = &quot;springcloud&quot;) 注解，指定 id 为 springcloud，这个类需要被 Spring 管理，我们加上 @Component 注解，然后定义一个用于展示信息的方法，返回类型可以自定义，这里定义一个 Map 返回，Map 中增加一个 title 的 Key，value 为 springcloud，最后一步需要在方法上增加 @ReadOperation 注解，大功告成。</p><p>启动项目，访问actuator/springcloud，就这么简单的几步，轻松的自定义了一个端点。</p><h3 id="spring-boot-admin" tabindex="-1">Spring Boot Admin <a class="header-anchor" href="#spring-boot-admin" aria-label="Permalink to &quot;Spring Boot Admin&quot;">​</a></h3><p>目前所有的端点信息都是通过 HTTP 访问的，数据也是 Json 格式的，如果直接通过这些数据来查看某些指标不是很直观，这时我们可以通过 Spring Boot Admin 来对 actuator 信息进行管理。</p><p>Spring Boot Admin 是一个开源的 Web 项目，用于管理和监控 Spring Boot 应用程序的运行状态。在 Spring Boot 项目中可以通过集成 Spring Boot Admin Client 向 Spring Boot Admin Server 进行注册，这样我们就可以在Spring Boot Admin Server 统一管理 Spring Boot 应用。</p><p>Spring Boot Admin 主要功能点：</p><ul><li><p>显示应用程序的监控状态</p></li><li><p>应用程序上下线监控</p></li><li><p>查看 JVM 和线程信息</p></li><li><p>可视化的查看日志及下载日志文件</p></li><li><p>动态切换日志级别</p></li><li><p>HTTP 请求信息跟踪等实用功能</p></li><li><p>将 actuator 提供的数据进行可视化</p></li></ul><br><p><img src="http://s0.lgstatic.com/i/image2/M01/8B/E3/CgotOV16H1GAWLFkAEFaRNGGwc8148.gif" alt=""></p><p>接下来体验一下 Spring Boot Admin，首先我们需要创建一个 Spring Boot 项目，我这里创建了一个 Spring Boot Admin 的项目，然后在 pom 中加入 spring-boot-admin-starter-server</p><p>的依赖。然后创建一个启动类，在启动类上增加 @EnableAdminServer 的注解，启用 Spring Boot Admin Server。</p><p>启动项目后，访问 <a href="http://localhost:8080" target="_blank" rel="noreferrer">http://localhost:8080</a>，这就是 Spring Boot Admin 的主页面，目前没有服务注册上来。</p><br><p><img src="http://s0.lgstatic.com/i/image2/M01/8B/C3/CgoB5l16H1OAAdE6ADSt7V6hKic032.gif" alt=""></p><p>刚刚介绍的时候有讲过，Spring Boot 项目需要集成 Spring Boot Admin Client 向 Spring Boot Admin Server 进行注册，那我们就在项目中增加 spring-boot-admin-starter-client 的依赖，光增加依赖可不行，需要用户必须得知道注册到哪里去了，所以我们需要在配置文件中指定 Spring Boot Admin Server 的地址才行，配置为 spring.boot.admin.client.url=<a href="http://localhost:8080" target="_blank" rel="noreferrer">http://localhost:8080</a></p><br><p><img src="http://s0.lgstatic.com/i/image2/M01/8B/C2/CgoB5l16G1mASUWEAF93SfdZYCk697.gif" alt=""></p><p>启动 Spring Boot 项目后，可以看到 Spring Boot Admin Server 中已经有服务注册上来了，可以清楚的知道应用的名称和 IP 端口信息，应用名称是默认的，可以在配置文件中通过 spring.application.name 来自定义名称。</p><br><p>点击服务信息进去查看详情，左边是对应的功能菜单，右边是数据展示的页面。Detail 中有健康信息、线程信息、JVM 内存等信息，都通过图形的方式展示，一目了然。</p><p>除了这些还有 Log、Web、Cache 等管理功能，由于时间关系，就不带你一一体验了，课后你可以自己去实际操作下。</p><h1 id="spring-boot常用功能点" tabindex="-1">Spring Boot常用功能点 <a class="header-anchor" href="#spring-boot常用功能点" aria-label="Permalink to &quot;Spring Boot常用功能点&quot;">​</a></h1><p>在 Spring Boot 中，还有一些比较常用的功能点，选取了几个常用的简单介绍下。</p><h3 id="替换内置-tomcat-容器" tabindex="-1">替换内置 Tomcat 容器 <a class="header-anchor" href="#替换内置-tomcat-容器" aria-label="Permalink to &quot;替换内置 Tomcat 容器&quot;">​</a></h3><p>第一个是怎么去替换内置的 Tomcat 容器</p><p>spring-boot-starter-web 中默认自带的容器是 Tomcat，如果想要替换成 Jetty 也是非常简单的。</p><p>首先需要排除 spring-boot-starter-web 包中的 Tomcat，然后单独增加对应容器的依赖，比如我们加入 Jetty，就需要增加 spring-boot-starter-jetty 的配置。然后重启项目，可以看到控制台输出的是 Jetty started on port 的内容，证明内置容器已经被成功替换成了 Jetty。替换成其他容器步骤也是一样。</p><h3 id="容器的参数配置" tabindex="-1">容器的参数配置 <a class="header-anchor" href="#容器的参数配置" aria-label="Permalink to &quot;容器的参数配置&quot;">​</a></h3><p>第二个是容器的参数如何配置</p><p>以前使用外部的 Tomcat，参数的调整都是在 Tomcat 的 server.xml 中进行配置，在 Spring Boot 中，内置容器的参数可以在 application 配置文件中进行指定，不同容器的参数配置有对应的前缀，server.tomcat 就是配置 Tomcat 的参数，server.jetty 就是配置 Jetty 的参数。</p><h3 id="启动监听" tabindex="-1">启动监听 <a class="header-anchor" href="#启动监听" aria-label="Permalink to &quot;启动监听&quot;">​</a></h3><p>第三个是启动监听</p><p>很多时候，我们需要在程序启动后，回调一些方法来处理某些事情，比如初始化本地缓存。这种场景我们可以使用 CommandLineRunner 和 ApplicationRunner 两个监听接口来实现。</p><p>CommandLineRunner 和 ApplicationRunner 本质上是一样的，不同的就是 ApplicationRunner 对方法的参数进行了封装。</p><h3 id="filter-的注册" tabindex="-1">Filter 的注册 <a class="header-anchor" href="#filter-的注册" aria-label="Permalink to &quot;Filter 的注册&quot;">​</a></h3><p>第四个是Filter的注册</p><p>Filter的注册有两种方式，一种是直接用 @WebFilter 注解，另一种是通过 FilterRegistrationBean 进行注册。</p><br><h6 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h6><p><img src="http://s0.lgstatic.com/i/image2/M01/8B/C5/CgoB5l16KS-AaroPAAM--cSCVG0340.png" alt=""></p><p>在这一课时我们主要巩固了 Spring Boot 的基础知识，主要包括 Spring Boot 的基础介绍，解决的问题，以及亮点和常用的 Starter 包，并手把手的带你创建了 Spring Boot 项目，并学会了打包编译和配置管理，还自定义了 Spring Boot Starter 包，添加了自定义的 Spring Boot actuator 监控，并学习了使用了开源的 Spring Boot Admin Web 项目，了解了 Spring Boot 的常用功能点。</p>',204),e=[a];function n(l,g,s,c,m,B){return r(),o("div",null,e)}const b=t(p,[["render",n]]);export{h as __pageData,b as default};
