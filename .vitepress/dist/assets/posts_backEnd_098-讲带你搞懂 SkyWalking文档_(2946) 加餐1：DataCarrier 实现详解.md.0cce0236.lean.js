import{_ as o,j as e,o as t,g as r,k as l,h as n,s,Q as p}from"./chunks/framework.4e7d56ce.js";const x=JSON.parse('{"title":"加餐1：DataCarrier实现详解","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/098-讲带你搞懂 SkyWalking文档/(2946) 加餐1：DataCarrier 实现详解.md","filePath":"posts/backEnd/098-讲带你搞懂 SkyWalking文档/(2946) 加餐1：DataCarrier 实现详解.md","lastUpdated":1696682708000}'),c={name:"posts/backEnd/098-讲带你搞懂 SkyWalking文档/(2946) 加餐1：DataCarrier 实现详解.md"},E=s("h1",{id:"加餐1-datacarrier实现详解",tabindex:"-1"},[n("加餐1：DataCarrier实现详解 "),s("a",{class:"header-anchor",href:"#加餐1-datacarrier实现详解","aria-label":'Permalink to "加餐1：DataCarrier实现详解"'},"​")],-1),y=s("p",null,"在开始介绍 Trace 相关 BootService 实现以及 Trace 数据的收集和发送之前，我们需要了解另一个关键的组件 ------ DataCarrier 。DataCarrier 是一个轻量级的生产者-消费者模式的实现库， SkyWalking Agent 在收集到 Trace 数据之后，会先写入到 DataCarrier 中的缓存，然后由后台线程定时发送到后端的 OAP。其实，在多数涉及网络传输的场景中都会使用这种设计：先在本地缓存数据，然后聚合，最后定时批量发送。",-1),i=s("p",null,"DataCarrier 之前是一个单独的项目，现在并入 SkyWalking 之中作为一个独立的子模块存在，具体位置如下图所示：",-1),u=p("",13),d=p("",4),C=p("",4),D=p("",4),A=p("",5),F=s("h4",{id:"idriver-实现剖析",tabindex:"-1"},[n("IDriver 实现剖析 "),s("a",{class:"header-anchor",href:"#idriver-实现剖析","aria-label":'Permalink to "IDriver 实现剖析"'},"​")],-1),h=s("p",null,"IDriver 接口会将前文介绍的 IConsumer 消费者以及 ConsumerThread 线程或 MultipleChannelsConsumer 线程按照一定的消费模式集成到一起，提供更加简单易用的 API。",-1),g=s("p",null,"IDriver 接口的继承关系如下图所示，其中依赖 ConsumerThread 的实现是 ConsumerDriver ，依赖 MultipleChannelsConsumer 的实现是 BulkConsumerPool ：",-1),m=p("",11),f=s("p",null,"下图的 consume() 方法重载则是依赖传入的 BulkConsumePool 实现数据消费能力的（注意，这里不会新建 BulkConsumePool）：",-1),B=s("p",null,"这里传入的 BulkConsumePool 对象一般统一维护在 ConsumerPoolFactory 中。ConsumerPoolFactory 是通过枚举方式实现的单例类，其底层维护了一个 Map<String, ConsumerPool> 集合，其中 Key 就是 BulkConsumePool 的名称，后面会看到大量通过名称在 ConsumerPoolFactory 中查找 BulkConsumePool 对象的场景。",-1),_=s("h4",{id:"总结",tabindex:"-1"},[n("总结 "),s("a",{class:"header-anchor",href:"#总结","aria-label":'Permalink to "总结"'},"​")],-1),b=s("p",null,"本课时主要介绍了 DataCarrier 这个轻量级的生产者-消费者模式的实现库，首先介绍了 DataCarrier 最底层的数据存储组件 Buffer 和 Channels 以及相关的填充策略，接下来深入分析了 DataCarrier 提供的消费者接口以及两种消费模型，最后介绍了 IDriver 接口和 DataCarrier 门面类提供的 API 实现。",-1);function v(T,k,I,L,S,P){const a=e("Image");return t(),r("div",null,[E,y,i,l(a,{alt:"sw1.png",src:"https://s0.lgstatic.com/i/image3/M01/8B/D8/Cgq2xl6enDGAd7mqAAF-K97sPzE781.png"}),n(),u,l(a,{alt:"sw2.png",src:"https://s0.lgstatic.com/i/image3/M01/8B/D9/Cgq2xl6enRKAKlx5AAAlHmaDotA329.png"}),n(),d,l(a,{alt:"sw3.png",src:"https://s0.lgstatic.com/i/image3/M01/05/95/CgoCgV6enVKAMtBMAABQyIHkIPs184.png"}),n(),C,l(a,{alt:"sw4.png",src:"https://s0.lgstatic.com/i/image3/M01/8B/DA/Cgq2xl6enYSAPp8SAADKo6QU_14981.png"}),n(),D,l(a,{alt:"sw5.png",src:"https://s0.lgstatic.com/i/image3/M01/05/95/CgoCgV6eneaAei7OAACQCaME7Fk880.png"}),n(),A,l(a,{alt:"sw6.png",src:"https://s0.lgstatic.com/i/image3/M01/8B/DA/Cgq2xl6enhKADPe-AAIoMSB90P4701.png"}),n(),F,h,g,l(a,{alt:"sw7.png",src:"https://s0.lgstatic.com/i/image3/M01/05/95/CgoCgV6enimAbhHkAAIykJeqP-I840.png"}),n(),m,l(a,{alt:"sw8.png",src:"https://s0.lgstatic.com/i/image3/M01/12/C5/Ciqah16enoiAAR34AABZQEoOOp8211.png"}),n(),f,l(a,{alt:"sw9.png",src:"https://s0.lgstatic.com/i/image3/M01/05/96/CgoCgV6enpaAGX-EAAAccs9p1lw523.png"}),n(),B,_,b])}const w=o(c,[["render",v]]);export{x as __pageData,w as default};
