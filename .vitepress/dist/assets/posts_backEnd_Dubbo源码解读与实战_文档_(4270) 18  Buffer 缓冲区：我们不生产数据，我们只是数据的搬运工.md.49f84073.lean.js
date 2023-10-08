import{_ as e,j as o,o as t,g as r,k as l,h as s,s as n,Q as p}from"./chunks/framework.a0d18f64.js";const _=JSON.parse('{"title":"18Buffer缓冲区：我们不生产数据，我们只是数据的搬运工","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/Dubbo源码解读与实战_文档/(4270) 18  Buffer 缓冲区：我们不生产数据，我们只是数据的搬运工.md","filePath":"posts/backEnd/Dubbo源码解读与实战_文档/(4270) 18  Buffer 缓冲区：我们不生产数据，我们只是数据的搬运工.md","lastUpdated":1696682708000}'),c={name:"posts/backEnd/Dubbo源码解读与实战_文档/(4270) 18  Buffer 缓冲区：我们不生产数据，我们只是数据的搬运工.md"},y=n("h1",{id:"_18buffer缓冲区-我们不生产数据-我们只是数据的搬运工",tabindex:"-1"},[s("18Buffer缓冲区：我们不生产数据，我们只是数据的搬运工 "),n("a",{class:"header-anchor",href:"#_18buffer缓冲区-我们不生产数据-我们只是数据的搬运工","aria-label":'Permalink to "18Buffer缓冲区：我们不生产数据，我们只是数据的搬运工"'},"​")],-1),E=n("p",null,"Buffer 是一种字节容器，在 Netty 等 NIO 框架中都有类似的设计，例如，Java NIO 中的ByteBuffer、Netty4 中的 ByteBuf。Dubbo 抽象出了 ChannelBuffer 接口对底层 NIO 框架中的 Buffer 设计进行统一，其子类如下图所示：",-1),i=p("",5),f=p("",14),d=p("",9),u=n("p",null,"ChannelBufferInputStream 底层封装了一个 ChannelBuffer，其实现 InputStream 接口的 read*() 方法全部都是从 ChannelBuffer 中读取数据。ChannelBufferInputStream 中还维护了一个 startIndex 和一个endIndex 索引，作为读取数据的起止位置。ChannelBufferOutputStream 与 ChannelBufferInputStream 类似，会向底层的 ChannelBuffer 写入数据，这里就不再展开，你若感兴趣的话可以参考源码进行分析。",-1),B=n("p",null,[s("最后要介绍 ChannelBuffers 这个"),n("strong",null,"门面类"),s("，下图展示了 ChannelBuffers 这个门面类的所有方法：")],-1),h=p("",7);function C(F,A,g,b,D,x){const a=o("Image");return t(),r("div",null,[y,E,l(a,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image/M00/55/0F/CgqCHl9pudyACkPPAABei6G8kSc033.png"}),s(),i,l(a,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image/M00/55/04/Ciqc1F9pugWAMFoIAABVU01bqiI007.png"}),s(),f,l(a,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image/M00/55/0F/CgqCHl9puiWABaDpAACaisslR0Q430.png"}),s(),d,l(a,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image/M00/55/04/Ciqc1F9puj2AXLalAALcfencKx0331.png"}),s(),u,B,l(a,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image/M00/55/10/CgqCHl9pukOAT_8kAACo0xRQ2po574.png"}),s(),h])}const m=e(c,[["render",C]]);export{_ as __pageData,m as default};
