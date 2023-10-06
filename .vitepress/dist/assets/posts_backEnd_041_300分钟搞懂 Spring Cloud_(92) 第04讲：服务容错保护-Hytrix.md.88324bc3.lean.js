import{_ as r,j as e,o as l,g as n,k as a,s as t,h as i,Q as o}from"./chunks/framework.b3d8e22e.js";const ht=JSON.parse('{"title":"服务雪崩 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/041_300分钟搞懂 Spring Cloud/(92) 第04讲：服务容错保护-Hytrix.md","filePath":"posts/backEnd/041_300分钟搞懂 Spring Cloud/(92) 第04讲：服务容错保护-Hytrix.md","lastUpdated":1696417798000}'),d={name:"posts/backEnd/041_300分钟搞懂 Spring Cloud/(92) 第04讲：服务容错保护-Hytrix.md"},c=t("p",null,"本课时我们主要学习：服务雪崩产生的原因及解决方案、Hystrix 工作原理及配置、监控方式等内容。",-1),h=t("h6",{id:"服务雪崩",tabindex:"-1"},[i("服务雪崩 "),t("a",{class:"header-anchor",href:"#服务雪崩","aria-label":'Permalink to "服务雪崩"'},"​")],-1),m=t("p",null,"微服务架构下，会存在服务之间相互依赖调用的情况，当某个服务不可用时，很容易因为服务之间的依赖关系使故障扩大，甚至造成整个系统不可用的情况，这种现象称为服务雪崩效应。",-1),p=o("",20),_=t("p",null,"这里总结了 Hystrix 的 5 条设计原则，首先我们看看第一条设计原则避免线程耗尽，由于被调用方出现问题，调用方无法及时获取响应结果，而一直在发送请求，最终会耗尽所有线程的资源。",-1),y=t("p",null,"快速失败指的是当被调用方出现问题后，调用方发起的请求可以快速失败并返回，这样就不用一直阻塞住，同时也释放了线程资源。",-1),x=t("p",null,"支持回退指的是在失败后，我们可以让用户有回退的逻辑，比如获取备用数据，从缓存中获取数据，记录日志等操作。",-1),u=t("p",null,"资源隔离是设计原则里最重要的，当你的服务依赖了 A、B、C 三个服务，当只有 C 服务出问题的时候，如果没做隔离，最终也会发生雪崩效应，导致整个服务不可用，如果我们进行了资源隔离，A、B、C 三个服务都是相互隔离的，即使 C 服务出问题了，那也不影响 A 和 B。这其实就跟不要把所有的鸡蛋放进一个篮子里是一样的道理。",-1),g=t("p",null,"近实时监控也非常重要，它能帮助我们了解整个系统目前的状态，有哪些服务有问题，当前流量有多大，出问题后及时告警等。",-1),H=t("h6",{id:"容错实现",tabindex:"-1"},[i("容错实现 "),t("a",{class:"header-anchor",href:"#容错实现","aria-label":'Permalink to "容错实现"'},"​")],-1),C=t("p",null,"前面我们讲了 Hystrix 的一些设计原则，这些原则实际就是为了解决遇到的问题。那么要解决这些问题，就必须去实现这些设计，你现在看到的脑图是我简单整理的一些实现点。",-1),A=t("p",null,"封装请求会将用户的操作进行统一封装，统一封装的目的在于进行统一控制。",-1),b=t("p",null,"资源隔离会将对应的资源按照指定的类型进行隔离，比如线程池和信号量，详细的隔离机制会在后面进行讲解。",-1),P=t("p",null,"失败回退其实是一个备用的方案，就是说当请求失败后，有没有备用方案来满足这个请求的需求。Hystrix 中会让用户去自定义备用方案。",-1),f=t("p",null,"断路器这个是最核心的，断路器决定了请求是否需要真正的执行，如果断路器处于打开的状态，那么所有请求都将失败，执行回退逻辑。如果断路器处于关闭状态，那么请求将会被正常执行，断路器的原理后面会进行讲解。",-1),B=t("p",null,"指标监控会对请求的生命周期进行监控，请求是成功了，还是失败了，是超时了，还是被拒绝了，都会被监控起来。",-1),K=t("h6",{id:"工作原理",tabindex:"-1"},[i("工作原理 "),t("a",{class:"header-anchor",href:"#工作原理","aria-label":'Permalink to "工作原理"'},"​")],-1),T=o("",12),k=t("p",null,"HystrixCommand 都有默认的配置，我们可以手动指定配置信息，比如 commandKey、groupKey、fallbackMethod 等。",-1),S=t("br",null,null,-1),M=t("p",null,"最简便的配置方式还是统一将配置信息放入配置文件中进行管理，我们可以为 HystrixCommand 设置一个 commandKey，然后在配置文件中为这个 commandKey 指定对应的配置信息。比如我们配置 getUser 这个 commandKey 的超时时间和隔离方式，在配置文件中增加",-1),E=t("p",null,"hystrix.command.getUser.execution.isolation.thread.timeoutInMilliseconds = 3000",-1),D=t("p",null,"hystrix.command.getUser.execution.isolation.strategy = SEMAPHORE",-1),V=t("p",null,"这 2 行代码即可。",-1),O=t("br",null,null,-1),q=t("p",null,"我们来调用下 user-service 的接口，将 user-service 接口稍微改造下，休眠 10 秒钟后再返回，这样的话我们在调用的时候需要等待 10 秒钟才能得到返回结果，如果在高并发场景下，很多请求就会阻塞在这里，这种场景下我们需要超时、快速失败等机制来避免资源耗尽的问题，所以我们使用了 Hystrix 来解决这个问题，我们在 get 方法上增加了 HystrixCommand 注解，设置了超时时间为 3 秒钟，如果 3 秒钟还没返回结果，那么该请求就会超时，执行 fallback 方法中的逻辑返回给调用方。",-1),I=t("h2",{id:"hystrix-配置",tabindex:"-1"},[i("Hystrix 配置 "),t("a",{class:"header-anchor",href:"#hystrix-配置","aria-label":'Permalink to "Hystrix 配置"'},"​")],-1),N=t("p",null,"Hystrix 的配置项比较多，在这里整理了几个比较常用的配置，所有的配置基本上都有默认值，如果我们需要调整这些配置，可以参考 PPT 中给出的链接。",-1),v=t("p",null,"隔离策略，我们需要根据不同的场景来选择合适的策略，可选择的策略有线程和信号量。命令执行的超时时间，这个只对线程隔离有效，信号量隔离不支持超时，当命令执行的时间超过了我们设定的时间，那么就会超时。",-1),L=t("p",null,"信号量隔离需要给信号量设定一个值，这个值表示最大的并发请求数量，超出这个数量就会拒绝请求，很多人在做压力测试的时候没有去调整该配置，压测时发现性能上不去，这就是没仔细看文档的后果。",-1),U=t("p",null,"断路器开关的控制这个也挺常用的，在某些场景下，我们可能需要手动进行降级，这个时候就可以将断路器强制打开，这样就会拒绝所有请求。",-1),G=t("p",null,"如果使用线程隔离方式，需要调整好线程池的参数，否则跟信号量一样，并发量大的时候性能上不去。设置最大的线程数，默认为 10，然后就是队列的大小，这决定了能够堆积多少个请求。但请求也不能一直堆积，所以我们还需要设置一个阈值来进行拒绝。",-1),F=t("h2",{id:"hystrix-监控",tabindex:"-1"},[i("Hystrix 监控 "),t("a",{class:"header-anchor",href:"#hystrix-监控","aria-label":'Permalink to "Hystrix 监控"'},"​")],-1),j=t("p",null,"在 Hystrix 的设计原则中我们提到了近实时监控，Hystrix 会实时记录所有 HystrixCommand 的执行信息，其中有每秒执行了多少次请求，多少次是成功的，多少次是失败的等信息。",-1),R=t("p",null,"这些信息我们可以通过 Hystrix Dashboard 来进行图形化的展示，能够更直观的看出系统当前的运行状态。",-1),Z=t("p",null,"在 Hystrix Dashboard 主页面，我们可以输入需要监控的 Stream 地址，Stream 地址会输出监控的原始数据，Dashboard 就是将这些数据图形化展示。",-1),w=t("p",null,"这张图是 Hystrix 官方提供的，通过 Dashboard 将请求的情况展示出来，每一块都是一个Command，Command 区域背景色的圆圈越大表示流量越大，绿色的数字表示请求成功的短路的计数，当断路器处于打开状态时，被拦截的请求就是短路的数量。黄色的数字表示超时的请求数，紫色数字表示请求被拒绝的数量。红色的数字表示请求失败的数量。",-1),Q=t("br",null,null,-1),Y=t("p",null,"下面我们自己来搭建一个 Hystrix 的 Dashboard，首先需要创建一个单独的 hystrix-dashboard 的项目，加入 spring-cloud-starter-netflix-hystrix-dashboard 的依赖，启动类上增加 @EnableHystrixDashboard 注解，这些都是固定的老套路，相信大家都已经轻车熟路了。",-1),J=t("br",null,null,-1),X=t("p",null,"启动项目，在浏览器中访问，就可以看到 Dashboard 的主页了。需要对项目进行监控，首先要有对应的 Stream 地址，Stream 产生数据源，我们在被监控的项目中加入 spring-boot-starter-actuator，只有加入了 actuator 才能暴露出 hystrix.stream 端点，访问下 hystrix.stream 端点，可以看到一直在输出内容 ping:，这个时候证明没有监控数据产生，我们访问下之前添加了 HystrixCommand 的方法，这样就会产生监控数据了，然后再看下 hystrix.stream 你会发现，已经有数据在不断输出了。",-1),$=t("p",null,"然后我们将这个 hystrix.steam 的地址输入到 Dashboard 的主页中，点击 monitor 按钮，就可以看到对应的图形化页面了。",-1),z=t("h2",{id:"hystrixcommand原理",tabindex:"-1"},[i("@HystrixCommand原理 "),t("a",{class:"header-anchor",href:"#hystrixcommand原理","aria-label":'Permalink to "@HystrixCommand原理"'},"​")],-1),W=t("p",null,"使用 HystrixCommand 注解确实比较方便，这样我们就不用自己去将请求包装成 Command 执行，将这个包装的过程交给框架内部处理，这也是框架存在的价值。",-1),tt=t("p",null,"HystrixCommand 注解的原理其实很简单，在 Hystrix 中有一个 HystrixCommandAspect 专门负责将加了 HystrixCommand 的方法在执行时进行包装。我们打开 HystrixCommandAspect 的源码，可以看到加入了 HystrixCommand 和 HystrixCollapser 两个注解，内部就是获取 Method、判断、包装，最后执行。",-1),st=t("h2",{id:"hystrix-隔离方式",tabindex:"-1"},[i("Hystrix 隔离方式 "),t("a",{class:"header-anchor",href:"#hystrix-隔离方式","aria-label":'Permalink to "Hystrix 隔离方式"'},"​")],-1),at=o("",23);function it(ot,rt,et,lt,nt,dt){const s=e("Image");return l(),n("div",null,[c,h,m,a(s,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/97/EB/CgoB5l2gPgGAPtZNAAD-3MAo7Ls234.png"}),p,a(s,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/98/0A/CgotOV2gPgGAP-qzAABk99lb2oU443.png"}),_,y,x,u,g,H,C,a(s,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/97/EB/CgoB5l2gPgGAF353AAFVH3psdO4196.png"}),A,b,P,f,B,K,a(s,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/98/0A/CgotOV2gPgGATT0XAAHyJjjmin8233.png"}),T,a(s,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/97/EB/CgoB5l2gPgGAH62HADl1HsI091U613.gif"}),k,S,a(s,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/98/0A/CgotOV2gPgKAZIURACtoJYAvTTw625.gif"}),M,E,D,V,O,a(s,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/97/EB/CgoB5l2gPgKAfQCjADH_ydrSTn0846.gif"}),q,I,a(s,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/98/0A/CgotOV2gPgKAYjAMAABpYDXLwZU519.png"}),N,v,L,U,G,F,a(s,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/97/EB/CgoB5l2gPgOAFuD2AAKErrJy9zw955.png"}),j,R,Z,a(s,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/98/0A/CgotOV2gPgOAW-YXAAMjhG4LmRc939.png"}),w,Q,a(s,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/97/EB/CgoB5l2gPgOAUaGgABtwVk03hhA570.gif"}),Y,J,a(s,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/98/0A/CgotOV2gPgOAaIiIAFXv_KctB6A050.gif"}),X,$,z,W,tt,st,a(s,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/97/EB/CgoB5l2gPgOANzYWAAEMqTCDefI937.png"}),at])}const mt=r(d,[["render",it]]);export{ht as __pageData,mt as default};
