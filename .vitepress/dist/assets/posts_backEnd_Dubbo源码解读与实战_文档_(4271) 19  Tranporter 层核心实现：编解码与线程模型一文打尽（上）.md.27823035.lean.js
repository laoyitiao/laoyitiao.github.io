import{_ as o,j as e,o as t,g as r,k as l,h as n,s,Q as p}from"./chunks/framework.b3d8e22e.js";const w=JSON.parse('{"title":"AbstractPeer 抽象类 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/Dubbo源码解读与实战_文档/(4271) 19  Tranporter 层核心实现：编解码与线程模型一文打尽（上）.md","filePath":"posts/backEnd/Dubbo源码解读与实战_文档/(4271) 19  Tranporter 层核心实现：编解码与线程模型一文打尽（上）.md","lastUpdated":1696417798000}'),c={name:"posts/backEnd/Dubbo源码解读与实战_文档/(4271) 19  Tranporter 层核心实现：编解码与线程模型一文打尽（上）.md"},E=s("p",null,[n("在"),s("a",{href:"https://kaiwu.lagou.com/course/courseInfo.htm?courseId=393#/detail/pc?id=4269",target:"_blank",rel:"noreferrer"},"第 17 课时"),n("中，我们详细介绍了 dubbo-remoting-api 模块中 Transporter 相关的核心抽象接口，本课时将继续介绍 dubbo-remoting-api 模块的其他内容。这里我们依旧从 Transporter 层的 RemotingServer、Client、Channel、ChannelHandler 等核心接口出发，介绍这些核心接口的实现。")],-1),y=s("h3",{id:"abstractpeer-抽象类",tabindex:"-1"},[n("AbstractPeer 抽象类 "),s("a",{class:"header-anchor",href:"#abstractpeer-抽象类","aria-label":'Permalink to "AbstractPeer 抽象类"'},"​")],-1),i=s("p",null,"首先，我们来看 AbstractPeer 这个抽象类，它同时实现了 Endpoint 接口和 ChannelHandler 接口，如下图所示，它也是 AbstractChannel、AbstractEndpoint 抽象类的父类。",-1),d=p("",12),u=p("",11),F=p("",16),A=s("p",null,"NettyServer 模型",-1),C=s("h4",{id:"核心-channelhandler",tabindex:"-1"},[n("核心 ChannelHandler "),s("a",{class:"header-anchor",href:"#核心-channelhandler","aria-label":'Permalink to "核心 ChannelHandler"'},"​")],-1),h=s("p",null,"下面我们来逐个看看这四个 ChannelHandler 的核心功能。",-1),D=s("p",null,[n("首先是"),s("strong",null,"decoder 和 encoder"),n("，它们都是 NettyCodecAdapter 的内部类，如下图所示，分别继承了 Netty 中的 ByteToMessageDecoder 和 MessageToByteEncoder：")],-1),g=p("",6),b=s("p",null,"NettyServerHandler 继承关系图",-1),v=s("p",null,"在 NettyServerHandler 中有 channels 和 handler 两个核心字段。",-1),_=s("ul",null,[s("li",null,"channels（Map<String,Channel>集合）：记录了当前 Server 创建的所有 Channel，从下图中可以看到，连接创建（触发 channelActive() 方法）、连接断开（触发 channelInactive()方法）会操作 channels 集合进行相应的增删。")],-1),m=s("ul",null,[s("li",null,"handler（ChannelHandler 类型）：NettyServerHandler 内几乎所有方法都会触发该 Dubbo ChannelHandler 对象（如下图）。")],-1),T=p("",5),B=s("p",null,"也就是说，NettyServerHandler 会将数据委托给这个 ChannelHandler。",-1),S=s("p",null,"到此为止，Server 这条继承线就介绍完了。你可以回顾一下，从 AbstractPeer 开始往下，一路继承下来，NettyServer 拥有了 Endpoint、ChannelHandler 以及RemotingServer多个接口的能力，关联了一个 ChannelHandler 对象以及 Codec2 对象，并最终将数据委托给这两个对象进行处理。所以，上层调用方只需要实现 ChannelHandler 和 Codec2 这两个接口就可以了。",-1),x=s("h3",{id:"总结",tabindex:"-1"},[n("总结 "),s("a",{class:"header-anchor",href:"#总结","aria-label":'Permalink to "总结"'},"​")],-1),I=s("p",null,"本课时重点介绍了 Dubbo Transporter 层中 Server 相关的实现。",-1),P=s("p",null,"首先，我们介绍了 AbstractPeer 这个最顶层的抽象类，了解了 Server、Client 和 Channel 的公共属性。接下来，介绍了 AbstractEndpoint 抽象类，它提供了编解码等 Server 和 Client 所需的公共能力。最后，我们深入分析了 AbstractServer 抽象类以及基于 Netty 4 实现的 NettyServer，同时，还深入剖析了涉及的各种组件，例如，ExecutorRepository、NettyServerHandler 等。",-1);function k(N,R,L,U,f,H){const a=e("Image");return t(),r("div",null,[E,y,i,l(a,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image/M00/58/F3/Ciqc1F9wb8eAHyD_AAFkwn8xp18694.png"}),n(),d,l(a,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image/M00/58/F3/Ciqc1F9wb-iAMAgtAACJWi59iSc812.png"}),n(),u,l(a,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image/M00/58/FE/CgqCHl9wcBeAYMZ1AABRTGzl5uY627.png"}),n(),F,l(a,{alt:"5.png",src:"https://s0.lgstatic.com/i/image/M00/59/E4/Ciqc1F9y4LaAIHSsAADBytWDQ3U695.png"}),n(),A,C,h,D,l(a,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image/M00/58/FE/CgqCHl9wcESANfPCAABDUdzhtNU066.png"}),g,l(a,{alt:"Drawing 5.png",src:"https://s0.lgstatic.com/i/image/M00/58/F3/Ciqc1F9wcFKAQQZ3AAB282frbWw282.png"}),n(),b,v,_,l(a,{alt:"Drawing 6.png",src:"https://s0.lgstatic.com/i/image/M00/58/F3/Ciqc1F9wcFuABJWsAAaIoTwCIA0958.png"}),m,l(a,{alt:"Drawing 7.png",src:"https://s0.lgstatic.com/i/image/M00/58/FE/CgqCHl9wcGOAE_ykAAFvy5a4X58367.png"}),T,l(a,{alt:"Drawing 8.png",src:"https://s0.lgstatic.com/i/image/M00/58/F3/Ciqc1F9wcGuADQi3AAD6EEURlNU871.png"}),B,S,l(a,{alt:"6.png",src:"https://s0.lgstatic.com/i/image/M00/59/E4/Ciqc1F9y4MyAR8XLAABTLdOZqrc228.png"}),x,I,P])}const q=o(c,[["render",k]]);export{w as __pageData,q as default};
