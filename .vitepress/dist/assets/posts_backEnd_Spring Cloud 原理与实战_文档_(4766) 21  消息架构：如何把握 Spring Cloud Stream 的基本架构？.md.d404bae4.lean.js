import{_ as p,j as o,o as e,g as t,k as l,h as n,s,Q as r}from"./chunks/framework.a0d18f64.js";const V=JSON.parse('{"title":"21消息架构：如何把握SpringCloudStream的基本架构？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/Spring Cloud 原理与实战_文档/(4766) 21  消息架构：如何把握 Spring Cloud Stream 的基本架构？.md","filePath":"posts/backEnd/Spring Cloud 原理与实战_文档/(4766) 21  消息架构：如何把握 Spring Cloud Stream 的基本架构？.md","lastUpdated":1696682708000}'),c={name:"posts/backEnd/Spring Cloud 原理与实战_文档/(4766) 21  消息架构：如何把握 Spring Cloud Stream 的基本架构？.md"},i=s("h1",{id:"_21消息架构-如何把握springcloudstream的基本架构",tabindex:"-1"},[n("21消息架构：如何把握SpringCloudStream的基本架构？ "),s("a",{class:"header-anchor",href:"#_21消息架构-如何把握springcloudstream的基本架构","aria-label":'Permalink to "21消息架构：如何把握SpringCloudStream的基本架构？"'},"​")],-1),u=s("p",null,"上一课时中，我们介绍了事件驱动架构的基本原理，以及 Spring 中对消息传递机制的抽象和对应的开发框架。要想在 SpringHealth 案例系统中添加消息发送和接收的效果有很多种实现方法，我们完全可以直接使用诸如 RabbitMQ、Kafka 等消息中间件来实现消息传递，这种解决方案的主要问题在于需要开发人员考虑不同框架的使用方式以及框架之间存在的功能差异性。而 Spring Cloud Stream 则不同，它在内部整合了多款主流的消息中间件，为开发人员提供了一个平台型解决方案，从而屏蔽各个消息中间件在技术实现上的差异。在今天的内容中，我将首先介绍 Spring Cloud Stream 的基本架构，并给出它与目前主流的各种消息中间件之间的整合机制。",-1),E=s("h3",{id:"spring-cloud-stream-基本架构",tabindex:"-1"},[n("Spring Cloud Stream 基本架构 "),s("a",{class:"header-anchor",href:"#spring-cloud-stream-基本架构","aria-label":'Permalink to "Spring Cloud Stream 基本架构"'},"​")],-1),d=s("p",null,"Spring Cloud Stream 对整个消息发布和消费过程做了高度抽象，并提供了一系列核心组件。我们先介绍通过 Spring Cloud Stream 构建消息传递机制的基本工作流程。区别于直接使用 RabbitMQ、Kafka 等消息中间件，Spring Cloud Stream 在消息生产者和消费者之间添加了一种桥梁机制，所有的消息都将通过 Spring Cloud Stream 进行发送和接收，如下图所示：",-1),g=r("",25),y=s("p",null,"消息发布-订阅模型示意图",-1),S=s("ul",null,[s("li",null,"消费者组")],-1),h=s("p",null,"设计消费者组（Consumer Group）的目的是应对集群环境下的多服务实例问题。显然，如果采用发布-订阅模式就会导致一个服务的不同实例都消费到了同一条消息。为了解决这个问题，Spring Cloud Stream 中提供了消费者组的概念。一旦使用了消费组，一条消息就只能被同一个组中的某一个服务实例所消费。消费者的基本结构如下图所示（其中虚线表示不会发生的消费场景）：",-1),m=s("p",null,"消费者组结构示意图",-1),_=s("ul",null,[s("li",null,"消息分区")],-1),C=s("p",null,"假如我们希望相同的消息都被同一个微服务实例来处理，但又有多个服务实例组成了负载均衡结构，那么通过上述的消费组概念仍然不能满足要求。针对这一场景，Spring Cloud Stream 又引入了消息分区（Partition）的概念。引入分区概念的意义在于，同一分区中的消息能够确保始终是由同一个消费者实例进行消费。尽管消息分区的应用场景并没有那么广泛，但如果想要达到类似的效果，Spring Cloud Stream 也为我们提供了一种简单的实现方案，消息分区的基本结构如下图所示：",-1),b=s("p",null,"消息分区结构示意图",-1),k=s("h4",{id:"binder-与消息中间件",tabindex:"-1"},[n("Binder 与消息中间件 "),s("a",{class:"header-anchor",href:"#binder-与消息中间件","aria-label":'Permalink to "Binder 与消息中间件"'},"​")],-1),F=s("p",null,"Binder 组件本质上是一个中间层，负责与各种消息中间件的交互。目前，Spring Cloud Stream 中集成的消息中间件包括 RabbitMQ和Kafka。在具体介绍如何使用 Spring Cloud Stream 进行消息发布和消费之前，我们先来结合消息传递机制给出 Binder 对这两种不同消息中间件的整合方式。",-1),A=s("ul",null,[s("li",null,"RabbitMQ")],-1),f=s("p",null,"RabbitMQ 是 AMQP（Advanced Message Queuing Protocol，高级消息队列协议）协议的典型实现框架。在 RabbitMQ 中，核心概念是交换器（Exchange）。我们可以通过控制交换器与队列之间的路由规则来实现对消息的存储转发、点对点、发布-订阅等消息传递模型。在一个 RabbitMQ 中可能会存在多个队列，交换器如果想要把消息发送到具体某一个队列，就需要通过两者之间的绑定规则来设置路由信息。路由信息的设置是开发人员操控 RabbitMQ 的主要手段，而路由过程的执行依赖于消息头中的路由键（Routing Key）属性。交换器会检查路由键并结合路由算法来决定将消息路由到哪个队列中去。下图就是交换器与队列之间的路由关系图：",-1),M=s("p",null,"RabbitMQ 中交换器与队列的路由关系图",-1),v=s("p",null,"可以看到一条来自生产者的消息通过交换器中的路由算法可以发送给一个或多个队列，从而分别实现点对点和发布订阅功能。同时，我们基于上图也不难得出消费者组的实现方案。因为 RabbitMQ 里每个队列是被消费者竞争消费的，所以指定同一个组的消费者消费同一个队列就可以实现消费者组。",-1),B=s("ul",null,[s("li",null,"Kafka")],-1),P=s("p",null,"从架构上讲，在 Kafka 中，生产者使用推模式将消息发布到服务器，而消费者使用拉模式从服务器订阅消息。在 Kafka 中还使用到了 Zookeeper，其作用在于实现服务器与消费者之间的负载均衡，所以启动 Kafka 之前必须确保 Zookeeper 正常运行。同时，Kafka 也实现了消费者组机制，如下图所示：",-1),q=s("p",null,"Kafka 消费者分组",-1),O=s("p",null,"可以看到多个消费者构成了一种组结构，消息只能传输给某个组中的某一个消费者。也就是说，Kafka 中消息的消费具有显式的分布式特性，天生就内置了 Spring Cloud Stream 中的消费组概念。",-1),I=s("p",null,"在 SpringHealth 案例中，我们将同时基于 RabbitMQ 和 Kafka 来展示 Spring Cloud Stream 的各项功能特性。",-1),D=s("h3",{id:"小结与预告",tabindex:"-1"},[n("小结与预告 "),s("a",{class:"header-anchor",href:"#小结与预告","aria-label":'Permalink to "小结与预告"'},"​")],-1),T=s("p",null,"Spring Cloud Stream 是 Spring Cloud 中针对消息处理的一款平台型框架，该框架的核心优势在于在内部集成了 RabbitMQ、Kafka 等主流消息中间件，而对外则提供了统一的 API 接入层。通过今天的课程，我们知道 Spring Cloud Stream 是通过 Binder 来实现了这一目标。同时，针对消息处理场景下的消费者分组、消息分区等需求，该框架也内置了抽象层并完成与不同消息中间件之间的整合。",-1),K=s("p",null,"这里给你留一道思考题：在 Spring Cloud Stream 中，消费者组和消费分区分别用于解决什么应用场景？",-1),Q=s("p",null,"在明确了 Spring Cloud Stream 的基本架构之后，在接下来的两个课时中，我们将介绍如何使用它来实现消息发布者和消费者的详细步骤和方法。",-1);function R(U,x,H,N,j,w){const a=o("Image");return e(),t("div",null,[i,u,E,d,l(a,{alt:"图片1.png",src:"https://s0.lgstatic.com/i/image/M00/73/90/Ciqc1F_GFU2Ae0qTAAHKrvTf9sk254.png"}),n(),g,l(a,{alt:"图片2.png",src:"https://s0.lgstatic.com/i/image/M00/73/90/Ciqc1F_GFXqAPudEAAHBljDWmY4700.png"}),n(),y,S,h,l(a,{alt:"图片3.png",src:"https://s0.lgstatic.com/i/image/M00/73/90/Ciqc1F_GFYKAOmpjAAHSXAgoO8s789.png"}),n(),m,_,C,l(a,{alt:"图片4.png",src:"https://s0.lgstatic.com/i/image/M00/73/9C/CgqCHl_GFY-Acs5MAAHDDsj-fd8866.png"}),n(),b,k,F,A,f,l(a,{alt:"图片5.png",src:"https://s0.lgstatic.com/i/image/M00/73/9C/CgqCHl_GFZiAJmwzAAKqP6viw60190.png"}),n(),M,v,B,P,l(a,{alt:"图片6.png",src:"https://s0.lgstatic.com/i/image/M00/73/9C/CgqCHl_GFaOANReSAAKuXoszyk4239.png"}),n(),q,O,I,D,T,K,Q])}const J=p(c,[["render",R]]);export{V as __pageData,J as default};
