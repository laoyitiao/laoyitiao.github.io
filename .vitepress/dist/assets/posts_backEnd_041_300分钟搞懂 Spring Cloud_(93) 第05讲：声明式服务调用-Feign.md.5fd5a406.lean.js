import{_ as o,j as a,o as r,g as s,k as n,h as t,Q as l,s as e}from"./chunks/framework.b3d8e22e.js";const Fe=JSON.parse('{"title":"Feign 基础知识 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/041_300分钟搞懂 Spring Cloud/(93) 第05讲：声明式服务调用-Feign.md","filePath":"posts/backEnd/041_300分钟搞懂 Spring Cloud/(93) 第05讲：声明式服务调用-Feign.md","lastUpdated":1696417798000}'),g={name:"posts/backEnd/041_300分钟搞懂 Spring Cloud/(93) 第05讲：声明式服务调用-Feign.md"},c=l("",13),p=l("",21),d=e("p",null,"在使用 feign 时，我们会定义对应的接口类，在接口类上使用 Feign 自带的注解来标识 HTTP 的请求参数信息，当调用接口对应的方法时，Feign 内部会基于面向接口的动态代理方式生成实现类，将请求调用委托到动态代理实现类，负责动态代理的组件是 InvocationHandlerFactory。",-1),_=e("p",null,"根据 Contract 规则，解析接口类的注解信息，翻译成 Feign 内部能识别的信息。Feign 默认有一套自己的协议规范，我们也可以自定义其他的规范来进行扩展，在 Spring Cloud OpenFeign中就扩展了 SpringMvcContract，这样做的目的是为了降低学习和使用成本，客户端和服务端使用同一个接口定义，发布成 SDK 给调用方使用。",-1),u=e("p",null,"MethodHandler 在执行的时候会生成 Request 对象，在构建 Request 对象的时候会为其设置拦截器，交由 Client 执行前记录一些日志，Client 执行完成后也记录一些日志，然后使 Decoder 进行相应结果的解码操作，并返回结果。",-1),h=e("h6",{id:"feign-的使用",tabindex:"-1"},[t("Feign 的使用 "),e("a",{class:"header-anchor",href:"#feign-的使用","aria-label":'Permalink to "Feign 的使用"'},"​")],-1),F=e("h6",{id:"原生-api",tabindex:"-1"},[t("原生 API "),e("a",{class:"header-anchor",href:"#原生-api","aria-label":'Permalink to "原生 API"'},"​")],-1),C=e("p",null,"这段代码是我从 Feign 的 GitHub 主页上摘下来的，通过这个简单的示列我们可以感受到 Feign调用 API 的简便性。",-1),A=e("p",null,"这是一个 GET 请求的示列，定义了一个 GitHub 的接口，接口中定义了一个查询的方法和参数。在方法上有 @RequestLine 注解，定义了请求类型和请求的 URI，URI 中有对应的参数占位符，返回值是集合，集合中是对应的返回结构对象。",-1),m=e("p",null,"我们通过 Feign 的 builder 模式构建了 GitHub 接口对象后，就可以直接通过 GiuHub 接口对象调用里面的 contributors 方法，然后可以得到返回结果。Feign 的这种方式就跟 Dubbo 中的调用方式是一样的，就像调用本地方法一样。",-1),b=e("p",null,"使用原生的 Feign 来调用 API，只需要通过特定的注解来描述调用的 API 信息，这些信息的请求方式可以是 GET 或者 POST 等，请求参数是什么？请求的地址是什么? 把这些信息定义好后就可以直接使用这个定好了的接口来调用对应的远程 API。",-1),P=e("h6",{id:"自带注解",tabindex:"-1"},[t("自带注解 "),e("a",{class:"header-anchor",href:"#自带注解","aria-label":'Permalink to "自带注解"'},"​")],-1),f=e("p",null,"通过前面的示列我们感受到了 Feign 的简便性，通过定义接口，加几个注解就可以轻松完成 API的远程调用，Feign 中自带的注解跟我们平时使用 Spring MVC 的注解不一样，除了前面我们提到的 @RequestLine 注解，Feign 中还有很多其他内置的注解，我整理了一个表格，表格中就是Feign 中内置的注解以及它们的作用。",-1),I=e("p",null,"RequestLine 前面已经讲过了，用来定义请求类型和请求的 URI，Param 是用来做参数映射的，Headers 是用来做请求头映射的，QueryMap 是用来接收多个参数的，最常见的就是将多个参数封装在一个实体类中，然后就可以用 QueryMap 来修饰。HeaderMap 可以将请求头映射成一个 Map 对象，Body 可以定义一个数据模板，通过 @Param 解析对应的表达式，最终替换成完成的请求体。",-1),T=e("h6",{id:"spring-cloud",tabindex:"-1"},[t("Spring Cloud "),e("a",{class:"header-anchor",href:"#spring-cloud","aria-label":'Permalink to "Spring Cloud"'},"​")],-1),S=e("p",null,"原生的 Feign 在使用层面已经很方便了，但是在 Spring Cloud 体系中却不那么适用，所以官方团队在 Feign 的基础上进行扩展，推出了 spring-cloud-openfeign，目的是能够让广大的开发者在 Spring Cloud 体系中使用 Feign 变得更加简单。",-1),H=e("p",null,"首先我们开发的 API 都用的是 Spring MVC 的注解，比如 RequestMapping 等，Feign 的注解是单独的一套，所以我们编写调用 Client 接口时，需要根据已有的接口来编写，在 spring-cloud-openfeign 中，实现了 Spring MVC 的一套注解，调用方 Client 接口中的注解和 API 方可以一致，非常方便。",-1),R=e("p",null,"下面我们来体验下 Spring Cloud 中 Feign 的简便性，在 Spring Cloud 中使用 Feign 主要有三步。",-1),B=e("ol",null,[e("li",null,[e("p",null,"需要在启动类加 @EnableFeignClients 启用 Feign。")]),e("li",null,[e("p",null,"可以定义 Feign 的调用客户端了，需要在接口上增加 @FeignClient 注解。")]),e("li",null,[e("p",null,"可以直接通过客户端访问接口。")])],-1),U=e("p",null,"下面来实际操作一下，创建一个 UserRemoteClient，定义一个 getUser 方法，getUser 方法上的注解跟服务提供方一致即可。然后在接口上增加一个 @FeignClient 的注解，value 指定为服务提供方的服务名称，也就是 Eureka 中的服务名。然后看下启动类，需要增加@EnableFeignClients 注解开启 Feign 的装配。在使用的地方直接注入 UserRemoteClient，然后调用 getUser 方法就可以获取到远程的数据了。",-1),x=e("h6",{id:"feign-整合-hystrix",tabindex:"-1"},[t("Feign 整合 Hystrix "),e("a",{class:"header-anchor",href:"#feign-整合-hystrix","aria-label":'Permalink to "Feign 整合 Hystrix"'},"​")],-1),k=e("p",null,"在 pom 中增加 spring-cloud-starter-netflix-hystrix 的依赖，然后在配置文件中开启 Feign 对 Hystrix 的支持，配置 feign.hystrix.enabled=true。",-1),y=e("p",null,"然后为我们的 Feign Client 增加 Fallback，新建一个 UserRemoteClientFallbackFactory，实现 FallbackFactory 接口，泛型传入我们的 Feign Client。在 create 方法中创建 UserRemoteClient 并编写回退逻辑。",-1),M=e("p",null,"最后需要在 @FeignClient 注解中指定我们的 FallbackFactory 类，这样才能让这个 Feign Client应用我们的回退逻辑。",-1),E=e("p",null,"访问 getUser 接口测试下，将对应的服务先停止，然后我们就可以看到相应的回退内容了。",-1),q=e("p",null,"FallbackFactory 回退需要知道异常信息，还有一种回退方式是不知道异常信息，创建一个 UserRemoteClientFallback 实现我们的 UserRemoteClient，重写 getUser 方法，然后在 @FeignClient 注解中指定 fallback 即可。",-1),G=e("h6",{id:"feign-的配置-代码方式",tabindex:"-1"},[t("Feign 的配置-代码方式 "),e("a",{class:"header-anchor",href:"#feign-的配置-代码方式","aria-label":'Permalink to "Feign 的配置-代码方式"'},"​")],-1),v=e("p",null,"Feign 的配置在代码中可以指定，我们可以为每个 Feign Client 创建一个单独的配置类，在类中配置对应的信息，比如我们要改变日志的级别，可以配置一个 Logger.Level 的 Bean、访问对应的接口，可以在控制台看见详细的调用日志输出。前提是日志的级别必须为 Debug。还需要在 @FeignClient 注解中进行配置类的指定。",-1),V=e("h6",{id:"feign-的配置-配置文件方式",tabindex:"-1"},[t("Feign 的配置-配置文件方式 "),e("a",{class:"header-anchor",href:"#feign-的配置-配置文件方式","aria-label":'Permalink to "Feign 的配置-配置文件方式"'},"​")],-1),D=e("p",null,"更灵活的配置方式应该是放入配置文件中，建议你在工作中将配置都放入配置文件中，那么 Feign 在配置文件中如何进行配置呢？",-1),O=l("",5),L=e("p",null,"因为 Spring Cloud Open Feign 中支持继承的特性，我们可以将 API 的定义提取出来封装成一个单独的接口，给 API 的实现方和调用方共用，在一定程度上简化了重复的代码。",-1),N=e("p",null,"我们定义了一个 UserFeignRemoteClient 的接口，加了 @FeignClient 注解，这个接口就变成了一个 Feign 的 Client。接口中我们定义了 getUser 方法，指定了访问的 URI。",-1),Q=e("p",null,"再创建一个 UserController，增加 RestController 注解，并且实现了上面定义的 UserFeignRemoteClient 接口，实现了 getUser 方法。",-1),K=e("p",null,"使用的地方只要注入 UserFeignRemoteClient 就可以使用 getUser 方法，UserController 中也不用重复定义 API 的 URI 等信息，当接口的 URI 发生变化时，提供方和使用方用的都是一个共用的接口，两边不会出现不一致的情况，这就是继承特性带来的好处。",-1),Y=e("h6",{id:"继承特性-方式二",tabindex:"-1"},[t("继承特性-方式二 "),e("a",{class:"header-anchor",href:"#继承特性-方式二","aria-label":'Permalink to "继承特性-方式二"'},"​")],-1),j=e("p",null,"上面的继承方式是我简化之后的，其实在 Spring Cloud Open Feign 的文档中，给出的继承示列还要多一个类，第一步是抽出一个公共的接口，比如我们这边的 UserService，UserService 中定义了要实现的 API 的方法。",-1),w=e("p",null,"在 UserController 中还是一样，需要实现 UserService，然后创建一个UserFeignRemoteClient，UserFeignRemoteClient 中需要继承 UserService，不同点在于之前是将 API 的方法定义在 UserFeignRemoteClient 中，然后 Controller 中实现UserFeignRemoteClient。现在 API 方法的定义是一个独立的 UserService 接口，Controller 和 Feign Client 都是需要实现或者继承 UserService 的接口，使用方式是一样的。",-1),z=e("h6",{id:"拦截器",tabindex:"-1"},[t("拦截器 "),e("a",{class:"header-anchor",href:"#拦截器","aria-label":'Permalink to "拦截器"'},"​")],-1),J=e("p",null,"Feign 中提供了拦截器机制，我们可以添加自己的拦截器来实现某些场景下的需求。BasicAuth 在 Feign 中默认提供了拦截器，我们只需要配置一下就可以使用，如果我们需要自定义拦截器，可以参考 BasicAuth 的代码，只要实现 RequestInterceptor 接口，在 apply 方法中编写你自己的逻辑就可以了，通过 RequestTemplate 可以进行很多操作，比如添加指定的请求头信息，这个可以用在服务间传递某些信息的时候。",-1),$=e("h6",{id:"get-请求多参数传递",tabindex:"-1"},[t("GET 请求多参数传递 "),e("a",{class:"header-anchor",href:"#get-请求多参数传递","aria-label":'Permalink to "GET 请求多参数传递"'},"​")],-1),Z=l("",7),X=e("p",null,"Feign 中提供了异常的解码器，但我们也可以自定义异常解码器，自定义异常解码器可以用于内部服务之间调用的异常传递。比如说 A 服务调用 B 服务，B 服务中出现异常后，会由 B 服务中的全局异常处理器进行处理，然后返回给 A 服务的数据格式是固定的 code 是多少，message 是什么。",-1),W=e("p",null,"在 A 服务中，我们就可以通过 B 服务返回的 code 码来做对应的判断，调用是成功了，还是失败了。一般内部服务之间为了简便性，希望跟调用本地方法一样，当被调用方抛出异常后，调用方也能感知到对应的异常，这个时候可以在异常解码器中获取异常信息，然后转换成对应的异常对象返回。",-1),ee=e("h6",{id:"feign-源码分析",tabindex:"-1"},[t("Feign-源码分析 "),e("a",{class:"header-anchor",href:"#feign-源码分析","aria-label":'Permalink to "Feign-源码分析"'},"​")],-1),ie=e("p",null,"首先来看下 Feign 执行请求的源码，从 Feign 这个类开始，通过 Feign 类提供的 Builder 模式，我们可以构建出一个 Feign Client，通过这个 Client 就可以调用远程的 API，看下 Builder 类中的参数信息，如 Logger、Client。",-1),ne=e("p",null,"接下来看下 target 方法，target 是最终生成代理类的方法，首先会进入 build 方法，在 build 中创建了 ReflectiveFeign 对象，最终调用的是 newInstance 方法，解析出 MethodHandler，然后创建 InvocationHandler 生成代理类，接着查看 SynchronousMethodHandler 类，在 invoke 方法中就是调用远程 API 的逻辑，创建一个 RequestTemplate，然后根据 RequestTemplate 获取对应的Request 记录日志，然后交由 client 执行，得到 response、decode 进行解码。这就是一个大致的整体流程，想要仔细的了解内部的实现细节，课后可以深入的去了解这段代码。",-1),te=e("p",null,"然后看下 Feign 中是如何集成 Hystrix，打开源码 FeignClientsConfiguration 类，在HystrixFeignConfiguration 对 Feign.Builder 进行了重新定义，返回的是 HystrixFeign.builder()",-1),le=e("p",null,"进入 HystrixFeign.builder 中可以看到继承了 Feign 的 Builder，增加了 Hystrix的SetterFactory",-1),oe=e("p",null,"，看下 build 方法里，对 invocationHandlerFactory 进行了重写，在 create 的时候返回的是 HystrixInvocationHandler，HystrixInvocationHandler 中在 invoke 的时候会将请求包装成 HystrixCommand 去执行，这里就自然的集成了 Hystrix。",-1),ae=e("br",null,null,-1),re=e("br",null,null,-1);function se(ge,ce,pe,de,_e,ue){const i=a("Image");return r(),s("div",null,[c,n(i,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/9B/86/CgotOV2oGbmAMIEfAAFD417806k525.png"}),p,n(i,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/9B/66/CgoB5l2oGbmACVdMAACewrpciZo953.png"}),d,_,u,h,F,n(i,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/9B/86/CgotOV2oGbmAGk9hAAEqjsNnfEc049.png"}),C,A,m,b,P,n(i,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/9B/66/CgoB5l2oGbmAAxxlAACsHadsFYk931.png"}),f,I,T,S,H,n(i,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/9B/87/CgotOV2oGvSAB6lzACuH262SK0o630.gif"}),R,B,n(i,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/9B/87/CgotOV2oGu2AYbCzAD5-YgFFrj0939.gif"}),U,x,n(i,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/9B/67/CgoB5l2oGuCAdFnGAA6QDTT4wB4893.gif"}),k,n(i,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/9B/87/CgotOV2oGtiAUD-yABz3qehaijk305.gif"}),y,M,n(i,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/9B/67/CgoB5l2oGr6AGh27ADHEa_iaFU8088.gif"}),E,q,G,v,V,D,n(i,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/9B/86/CgotOV2oGbqAQfgPAAFRayo3xS8984.png"}),O,n(i,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/9B/66/CgoB5l2oGbqAcCubAAD1tEMB1xw892.png"}),L,N,Q,K,Y,n(i,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/9B/86/CgotOV2oGbuASp8GAAC5YoZgIl0061.png"}),j,w,z,n(i,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/9B/66/CgoB5l2oGbuAIUQoAAC9NEkPsms617.png"}),J,$,n(i,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/9B/86/CgotOV2oGbuAG632AACHzF9lMXk706.png"}),Z,n(i,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/9B/66/CgoB5l2oGbuAFUvrAADJtR7jdKs966.png"}),X,W,ee,n(i,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/9B/67/CgoB5l2oGpiAEY_oABwyiU6L1t0316.gif"}),ie,n(i,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/9B/67/CgoB5l2oGomATcVTAErP1s9Xx08760.gif"}),t(),ne,n(i,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/9B/67/CgoB5l2oGlKAYPhyADyseZWK2iI541.gif"}),te,le,oe,ae,re])}const Ce=o(g,[["render",se]]);export{Fe as __pageData,Ce as default};
