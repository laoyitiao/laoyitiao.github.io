import{_ as o,j as p,o as t,g as r,k as e,h as n,s,Q as l}from"./chunks/framework.cfb14fe0.js";const N=JSON.parse('{"title":"第21讲：Cluter插件剖析，你想要的集群模式它都有","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/098-讲带你搞懂 SkyWalking文档/(1739) 第21讲：Cluter 插件剖析，你想要的集群模式它都有.md","filePath":"posts/backEnd/098-讲带你搞懂 SkyWalking文档/(1739) 第21讲：Cluter 插件剖析，你想要的集群模式它都有.md","lastUpdated":1696682708000}'),c={name:"posts/backEnd/098-讲带你搞懂 SkyWalking文档/(1739) 第21讲：Cluter 插件剖析，你想要的集群模式它都有.md"},i=s("h1",{id:"第21讲-cluter插件剖析-你想要的集群模式它都有",tabindex:"-1"},[n("第21讲：Cluter插件剖析，你想要的集群模式它都有 "),s("a",{class:"header-anchor",href:"#第21讲-cluter插件剖析-你想要的集群模式它都有","aria-label":'Permalink to "第21讲：Cluter插件剖析，你想要的集群模式它都有"'},"​")],-1),y=s("p",null,"在上一课时中介绍的 ConfigurationModule 是一个非常基础的 Module，在后续介绍 CoreModule、TraceModule 时，都会看到它们的 requireModule 集合都包含了 ConfigurationModule。",-1),E=s("p",null,"本课时将介绍 Cluster 模块，该模块也是非常基础的模块，被很多其他模块依赖。我们重点介绍支持单机模式 cluster-standalone-plugin 模块，以及依赖 Zookeeper 的 cluster-zookeeper-plugin 模块。",-1),d=s("h4",{id:"clustermodule",tabindex:"-1"},[n("ClusterModule "),s("a",{class:"header-anchor",href:"#clustermodule","aria-label":'Permalink to "ClusterModule"'},"​")],-1),u=s("p",null,"在 application.yml 配置文件中，我们可以看到 ClusterModule 相关的配置，如下图所示，其中包含了多个 Cluster 实现模块的配置。",-1),g=s("p",null,"全部 Cluster 模块使用的 ModuleDefine 实现类 ------ ClusterModule 位于在 server-core 这个模块中，如下图所示，在 server-core 模块的 SPI 文件中指定了多个 ModuleDefine 实现，其中就包含 ClusterModule。",-1),C=l("",8),v=s("p",null,'这里的 cluster-standalone-plugin 模块实现了单机模式，在其 ModuleProvider SPI 文件中指定的实现类是 ClusterModuleStandaloneProvider，其 name() 方法固定返回 "standalone" 字符串，与 application.yml 配置文件对应。requireModules() 方法返回空数组，表示不依赖其他任何 Module。',-1),F=s("p",null,"在 prepare() 方法中，ClusterModuleStandaloneProvider 会创建 StandaloneManager 实例。StandaloneManager 同时实现了 ClusterNodesQuery 接口和 ClusterRegister 接口，如下图所示：",-1),m=s("p",null,"StandaloneManager 中只有一个 RemoteInstance 类型字段（isSelf 标识始终为 true，表示当前 OAP 服务本身），其 registerRemote() 方法和 queryRemoteNodes() 方法都是操作这一个 RemoteInstance 字段，这样就实现了简单的单机模式。",-1),h=s("h4",{id:"curator-x-discovery-扩展库",tabindex:"-1"},[n("curator-x-discovery 扩展库 "),s("a",{class:"header-anchor",href:"#curator-x-discovery-扩展库","aria-label":'Permalink to "curator-x-discovery 扩展库"'},"​")],-1),A=s("p",null,"在开始介绍 cluster-zookeeper-plugin 模块之前，需要先了解其中使用到的 curator-x-discovery 依赖的功能。",-1),D=s("p",null,"为了避免 curator-recipes 包过于膨胀，Curator 将很多其他解决方案都拆出来了，作为单独的一个包，命名方式就是 curator-x-*，例如：curator-x-discovery、curator-x-rpc。",-1),S=s("p",null,"在 SkyWalking 中的 cluster-zookeeper-plugin 模块就使用了 curator-x-discovery 这个包。curator-x-discovery 扩展包是一个服务发现的解决方案。在 ZooKeeper 中，我们可以使用临时节点（Ephemeral Node）实现一个服务注册机制。当服务启动后在 ZooKeeper 的指定 Path 下创建临时节点，服务断掉与 ZooKeeper 的会话之后，其相应的临时节点就会被删除。这个 curator-x-discovery 扩展包抽象了这种功能，并提供了一套简单的 API 来实现服务发现机制。curator-x-discovery 扩展包的核心概念如下：",-1),_=s("ul",null,[s("li",null,[s("strong",null,"ServiceInstance"),n("：ServiceInstance 是 curator-x-discovery 扩展包对服务实例的抽象，ServiceInstance 由 name、id、address、port 以及一个可选的 payload 属性构成。ServiceInstance 序列化并存储在 ZooKeeper 中的方式如下：")])],-1),I=l("",10),k=l("",6);function B(P,b,R,f,M,q){const a=p("Image");return t(),r("div",null,[i,y,E,d,u,e(a,{alt:"image.png",src:"https://s0.lgstatic.com/i/image/M00/0D/1C/CgqCHl7DfzqATV7pAAh1tLrZ7LM755.png"}),n(),g,e(a,{alt:"image (1).png",src:"https://s0.lgstatic.com/i/image/M00/0D/1C/CgqCHl7Df0WAE6O_AAD50Wj3J5s903.png"}),n(),C,e(a,{alt:"image (2).png",src:"https://s0.lgstatic.com/i/image/M00/0D/1C/CgqCHl7Df0-AR9JyAACONLeNTKc436.png"}),n(),v,F,e(a,{alt:"Stand继承关系.png",src:"https://s0.lgstatic.com/i/image/M00/0D/1C/CgqCHl7Df1eAfuKAAACNtX-84Gk841.png"}),n(),m,h,A,D,S,_,e(a,{alt:"image (3).png",src:"https://s0.lgstatic.com/i/image/M00/0D/1C/CgqCHl7Df3eAbSd8AADHccHcE1Q389.png"}),n(),I,e(a,{alt:"image (4).png",src:"https://s0.lgstatic.com/i/image/M00/0D/1C/CgqCHl7Df4SAOjbZAACJzD-Vox4797.png"}),n(),k])}const Z=o(c,[["render",B]]);export{N as __pageData,Z as default};
