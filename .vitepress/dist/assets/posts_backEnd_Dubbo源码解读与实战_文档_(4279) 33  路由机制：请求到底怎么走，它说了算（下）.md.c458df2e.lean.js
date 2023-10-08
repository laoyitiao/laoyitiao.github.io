import{_ as p,j as e,o as t,g as r,k as l,h as n,s,Q as o}from"./chunks/framework.4e7d56ce.js";const z=JSON.parse('{"title":"33路由机制：请求到底怎么走，它说了算（下）","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/Dubbo源码解读与实战_文档/(4279) 33  路由机制：请求到底怎么走，它说了算（下）.md","filePath":"posts/backEnd/Dubbo源码解读与实战_文档/(4279) 33  路由机制：请求到底怎么走，它说了算（下）.md","lastUpdated":1696682708000}'),c={name:"posts/backEnd/Dubbo源码解读与实战_文档/(4279) 33  路由机制：请求到底怎么走，它说了算（下）.md"},E=s("h1",{id:"_33路由机制-请求到底怎么走-它说了算-下",tabindex:"-1"},[n("33路由机制：请求到底怎么走，它说了算（下） "),s("a",{class:"header-anchor",href:"#_33路由机制-请求到底怎么走-它说了算-下","aria-label":'Permalink to "33路由机制：请求到底怎么走，它说了算（下）"'},"​")],-1),y=s("p",null,"在上一课时，我们介绍了 Router 接口的基本功能以及 RouterChain 加载多个 Router 的实现，之后介绍了 ConditionRouter 这个类对条件路由规则的处理逻辑以及 ScriptRouter 这个类对脚本路由规则的处理逻辑。本课时我们继续上一课时的内容，介绍剩余的三个 Router 接口实现类。",-1),i=s("h3",{id:"filerouterfactory",tabindex:"-1"},[n("FileRouterFactory "),s("a",{class:"header-anchor",href:"#filerouterfactory","aria-label":'Permalink to "FileRouterFactory"'},"​")],-1),u=s("p",null,[s("strong",null,"FileRouterFactory 是 ScriptRouterFactory 的装饰器"),n(" ，其扩展名为 file，FileRouterFactory 在 ScriptRouterFactory 基础上"),s("strong",null,"增加了读取文件的能力"),n("。我们可以将 ScriptRouter 使用的路由规则保存到文件中，然后在 URL 中指定文件路径，FileRouterFactory 从中解析到该脚本文件的路径并进行读取，调用 ScriptRouterFactory 去创建相应的 ScriptRouter 对象。")],-1),g=s("p",null,"下面我们来看 FileRouterFactory 对 getRouter() 方法的具体实现，其中完成了 file 协议的 URL 到 script 协议 URL 的转换，如下是一个转换示例，首先会将 file:// 协议转换成 script:// 协议，然后会添加 type 参数和 rule 参数，其中 type 参数值根据文件后缀名确定，该示例为 js，rule 参数值为文件内容。",-1),d=o("",10),F=s("p",null,"不同状态的 Provider 节点",-1),R=s("p",null,"为了解决上述问题，我们可以针对每个需求分别独立出一套测试环境，但是这个方案会占用大量机器，前期的搭建成本以及后续的维护成本也都非常高。",-1),A=s("p",null,"下面是一个通过 Tag 方式实现环境隔离的架构图，其中，需求 1 对 Provider 2 的请求会全部落到有需求 1 标签的 Provider 上，其他 Provider 使用稳定测试环境中的 Provider；需求 2 对 Provider 4 的请求会全部落到有需求 2 标签的 Provider 4 上，其他 Provider 使用稳定测试环境中的 Provider。",-1),v=s("p",null,"依赖 Tag 实现的测试环境隔离方案",-1),C=s("p",null,"在一些特殊场景中，会有 Tag 降级的场景，比如找不到对应 Tag 的 Provider，会按照一定的规则进行降级。如果在 Provider 集群中不存在与请求 Tag 对应的 Provider 节点，则默认将降级请求 Tag 为空的 Provider；如果希望在找不到匹配 Tag 的 Provider 节点时抛出异常的话，我们需设置 request.tag.force = true。",-1),D=s("p",null,[n("如果请求中的 request.tag 未设置，只会匹配 Tag 为空的 Provider，也就是说即使集群中存在可用的服务，若 Tag 不匹配也就无法调用。一句话总结，"),s("strong",null,"携带 Tag 的请求可以降级访问到无 Tag 的 Provider，但不携带 Tag 的请求永远无法访问到带有 Tag 的 Provider"),n("。")],-1),T=s("h4",{id:"tagrouter",tabindex:"-1"},[n("TagRouter "),s("a",{class:"header-anchor",href:"#tagrouter","aria-label":'Permalink to "TagRouter"'},"​")],-1),k=s("p",null,"下面我们再来看 TagRouter 的具体实现。在 TagRouter 中持有一个 TagRouterRule 对象的引用，在 TagRouterRule 中维护了一个 Tag 集合，而在每个 Tag 对象中又都维护了一个 Tag 的名称，以及 Tag 绑定的网络地址集合，如下图所示：",-1),_=s("p",null,"TagRouter、TagRouterRule、Tag 与 address 映射关系图",-1),h=s("p",null,[n("另外，在 TagRouterRule 中还维护了 addressToTagnames、tagnameToAddresses 两个集合（都是 Map<String, List"),s("code",null,"<String>"),n("> 类型），分别记录了 Tag 名称到各个 address 的映射以及 address 到 Tag 名称的映射。在 TagRouterRule 的 init() 方法中，会根据 tags 集合初始化这两个集合。")],-1),m=s("p",null,"了解了 TagRouterRule 的基本构造之后，我们继续来看 TagRouter 构造 TagRouterRule 的过程。TagRouter 除了实现了 Router 接口之外，还实现了 ConfigurationListener 接口，如下图所示：",-1),f=o("",6),B=s("p",null,"TagRouterRule 结构图",-1),b=s("p",null,"除了上图展示的几个集合字段，TagRouterRule 还从 AbstractRouterRule 抽象类继承了一些控制字段，后面介绍的 ConditionRouterRule 也继承了 AbstractRouterRule。",-1),P=o("",10),I=s("p",null,"CacheableRouterFactory 继承关系图",-1),U=s("p",null,[n("ServiceRouterFactory 创建的 Router 实现是 ServiceRouter，与 ServiceRouter 类似的是 AppRouter，"),s("strong",null,"两者都继承了 ListenableRouter 抽象类"),n("（虽然 ListenableRouter 是个抽象类，但是没有抽象方法留给子类实现），继承关系如下图所示：")],-1),S=o("",11);function L(N,M,q,K,Y,x){const a=e("Image");return t(),r("div",null,[E,y,i,u,g,l(a,{alt:"2.png",src:"https://s0.lgstatic.com/i/image/M00/6E/C9/Ciqc1F-zkA2AduheAAGQTzCOwl8784.png"}),n(),d,l(a,{alt:"3.png",src:"https://s0.lgstatic.com/i/image/M00/6E/D4/CgqCHl-zkBuACzVCAABuM5-1_s4317.png"}),n(),F,R,A,l(a,{alt:"4.png",src:"https://s0.lgstatic.com/i/image/M00/6E/D4/CgqCHl-zkCyANtuuAADgH2I1upA475.png"}),n(),v,C,D,T,k,l(a,{alt:"5.png",src:"https://s0.lgstatic.com/i/image/M00/6E/D5/CgqCHl-zkEGALTHPAADFZZM7Y2A139.png"}),n(),_,h,m,l(a,{alt:"6.png",src:"https://s0.lgstatic.com/i/image/M00/6E/C9/Ciqc1F-zkEyAMNXQAAF_oit25-o273.png"}),n(),f,l(a,{alt:"1.png",src:"https://s0.lgstatic.com/i/image/M00/6E/C9/Ciqc1F-zkF6AHgUEAAE3K8dR6QQ826.png"}),n(),B,b,l(a,{alt:"9.png",src:"https://s0.lgstatic.com/i/image/M00/6E/D5/CgqCHl-zkGmAYDBMAAFODGWwRfo125.png"}),n(),P,l(a,{alt:"8.png",src:"https://s0.lgstatic.com/i/image/M00/6E/C9/Ciqc1F-zkHqAH3diAAGWl6aQJy8860.png"}),n(),I,U,l(a,{alt:"7.png",src:"https://s0.lgstatic.com/i/image/M00/6E/C9/Ciqc1F-zkISAPopjAAH9Njd3pOE049.png"}),n(),S])}const V=p(c,[["render",L]]);export{z as __pageData,V as default};
