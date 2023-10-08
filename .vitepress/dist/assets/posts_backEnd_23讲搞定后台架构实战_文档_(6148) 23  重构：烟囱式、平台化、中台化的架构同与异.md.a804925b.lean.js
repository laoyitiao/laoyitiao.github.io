import{_,j as a,o as n,g as e,k as s,h as l,s as t,Q as o}from"./chunks/framework.a0d18f64.js";const Z=JSON.parse('{"title":"23重构：烟囱式、平台化、中台化的架构同与异","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/23讲搞定后台架构实战_文档/(6148) 23  重构：烟囱式、平台化、中台化的架构同与异.md","filePath":"posts/backEnd/23讲搞定后台架构实战_文档/(6148) 23  重构：烟囱式、平台化、中台化的架构同与异.md","lastUpdated":1696682708000}'),i={name:"posts/backEnd/23讲搞定后台架构实战_文档/(6148) 23  重构：烟囱式、平台化、中台化的架构同与异.md"},c=t("h1",{id:"_23重构-烟囱式、平台化、中台化的架构同与异",tabindex:"-1"},[l("23重构：烟囱式、平台化、中台化的架构同与异 "),t("a",{class:"header-anchor",href:"#_23重构-烟囱式、平台化、中台化的架构同与异","aria-label":'Permalink to "23重构：烟囱式、平台化、中台化的架构同与异"'},"​")],-1),r=t("p",null,"上一讲里，我们介绍了两大类型的系统升级重构方案，还介绍了如何进行重构版本的上线，以及如何平滑地完成新老版本切换的方案。在本讲里，将会具体介绍如何判断系统发展到什么阶段需要重构，以及如何实施重构。",-1),h=t("h3",{id:"系统稳定性的重构升级",tabindex:"-1"},[l("系统稳定性的重构升级 "),t("a",{class:"header-anchor",href:"#系统稳定性的重构升级","aria-label":'Permalink to "系统稳定性的重构升级"'},"​")],-1),d=t("p",null,"简单、通用的微服务架构如下图 1 所示，它包含一个应用服务和一个数据库作为存储。",-1),g=o("",8),u=t("p",null,"图 2：纯代码升级重构",-1),m=t("p",null,"完成纯代码的重构后，在日常维护中，当你发现有以下问题时，可以考虑进行包含存储的重构。",-1),A=t("ol",null,[t("li",null,[t("p",null,"随着业务的发展，微服务的流量由每秒几百的 QPS 上升至上千或上万的 QPS 时，可以将微服务的存储从数据库升级为缓存，以便有效应用业务增长带来的流量。")]),t("li",null,[t("p",null,"业务或者运营需要对数据库中的四五张表进行聚合（join）分页查询，而数据库面对这些繁杂查询性能会变得非常差。此时可以将微服务的存储从数据库升级为 ElasticSearch，进而满足多维度的富查询。")])],-1),Q=t("p",null,"上述这两类便为包含存储的重构升级，第一个是从数据库升级到缓存，第二个是从数据库升级到 ElasticSearch。它们的架构如下图 3 所示：",-1),P=t("p",null,"图 3：包含存储的架构升级",-1),b=t("h3",{id:"烟囱式到平台化的重构升级",tabindex:"-1"},[l("烟囱式到平台化的重构升级 "),t("a",{class:"header-anchor",href:"#烟囱式到平台化的重构升级","aria-label":'Permalink to "烟囱式到平台化的重构升级"'},"​")],-1),C=t("p",null,"完成上述两种重构之后，接下来就需要思考什么时候进行另一种存储类型均为数据库存储，但表结构不同的重构了。",-1),T=t("p",null,"在介绍具体实施步骤前，咱们先来聊聊：什么是烟囱式架构。",-1),B=t("p",null,"这里以即时通信作为讨论案例。在 PC 时代，QQ 在即时通信市场的占有率是绝对领先者，相信你也使用过。从技术的抽象层面来看，QQ 主要提供消息发送和消息接收的功能，消息可以是图片、表情、文字、视频、语音等内容。支撑 QQ 消息发送和接收的简版架构如下图 4 所示：",-1),S=t("p",null,"图 4：简版的消息发送和接收架构图",-1),f=t("ul",null,[t("li",null,[t("p",null,"图中编号 1 的模块为安装在电脑里的 QQ 客户端，它主要给用户提供可视化的聊天界面，以及发送和接收其他用户的消息。")]),t("li",null,[t("p",null,"编号为 2 的模块为网络接入层，它主要的作用是维护和客户端的网络连接，负责解析客户端发送到服务端的消息和推送其他用户发送的消息给到指定的客户端。在接收和发送消息时，接入层需基于 QQ 自有的数据协议进行消息内容的解码和编码。")]),t("li",null,[t("p",null,"编号为 3 的是数据接收模块，它对外提供保存消息的 RPC 接口，并由编号 2 的网络接入层在接收到客户端消息的时候调用。接收模块接收到消息后，会将消息保存至存储中并通知编号 4 的消息发送模块。")]),t("li",null,[t("p",null,"编号为 4 的是消息发送模块，它接收到通知后，会读取存储中的待发送消息并进行一定的逻辑处理，然后调用网络接入层进行消息的发送。")])],-1),q=t("p",null,"关于即时通信后续的发展，你应该就有亲身感受了。为了抓住移动互联网的发展浪潮，腾讯又推出了即时通信的王者级应用：微信。从产品上看，微信和 QQ 在定位、应用界面设计、附加功能设计等方面存在差异。但抽象地从技术和核心功能上分析，两者的功能均是给用户提供消息发送和消息接收。因此，在技术实现上，微信研发团队也需要建设和上述图 4 类似的提供消息发送和接收的技术架构，如下图 5 所示：",-1),k=t("p",null,"图 5：简版的微信消息发送和接收的架构图",-1),M=t("p",null,"从图 5 中不难发现，除了编号 1 的微信 App 和编号 2 的网络接入层模块与图 4 有差异，其余各模块的功能基本上与图 4 类似。网络接入层之所以有差异，是因为接入层需要进行通信协议的解析，而 QQ 和微信的网络通信协议是根据各自的客户端进行定制的，因此会有格式上的差异。",-1),x=t("p",null,"除了微信外，现在大部分在线游戏也都提供了即时通信的能力。因此，游戏团队也需要按上述类似的架构实现自己的消息发送和接收业务系统。",-1),I=t("p",null,"类似上述介绍的这种模式：即系统架构大体上类似，其中只有个别模块存在差异，但各个研发团队还是从零开始建设全部模块的方式，称为烟囱式架构。为了方便你理解，我把QQ、微信以及游戏语音的架构放在一张图中，如下图 6 所示：",-1),O=t("p",null,"图 6：即时通信的烟囱式架构示意图",-1),V=t("p",null,"从上图可以看出，烟囱式架构是一种象形比喻，各个业务研发团队（如 QQ、微信、游戏语音团队）维护了一个类似烟囱式的、包含重复模块的系统架构。除了即时通信这个案例，还有很多其他会产生烟囱式架构的场景，比如电商，电商除了 PC、App、M 页面版本，现在还有很多购物场景，比如自动贩卖机、微信里的分享链接、小程序等。在实现上，如果他们的研发团队是封闭地进行自研，那么也会产生如下图 7 所示的电商版烟囱式架构。",-1),W=t("p",null,"图 7：电商版烟囱式架构示意图",-1),E=t("p",null,"经过前面的分析，烟囱式架构存在的问题其实已经比较明显了，即存在大量的模块重复，进而导致人力重复、成本增加。此时，为了解决这个问题，便可以启动本小节开头提到的升级重构：均为数据库存储，但表结构不同的重构了。",-1),H=t("p",null,"以上述消息接收模块为例，它包含了一个代码进程和对应的消息存储（假设为 MySQL）。为了解决此模块的重复，可以合并 QQ、微信和游戏语音里此模块的代码。同时在前期设计时，各个业务只考虑自己的消息格式，所以它们的数据库的表结构是偏定制的，无法直接被复用，因此在重构时，还需要设计一套全新的、兼容原有三个版本的数据库。此时消息接收模块的重构架构如下图 8 所示：",-1),N=t("p",null,"图 8：消息接收模块融合架构图（三个模块+数据库合并成一个）",-1),D=t("p",null,"完成上述模块的重构融合升级之后，消息发送模块也可以进行类似的融合重构。当所有的可复用模块均完成升级重构后，上述三个不同的即时通信软件的架构演化成如下图 9 的形态：",-1),F=o("",10),R=o("",8),J=o("",11);function v(U,G,j,$,K,L){const p=a("Image");return n(),e("div",null,[c,r,h,d,s(p,{alt:"图片1.png",src:"https://s0.lgstatic.com/i/image6/M01/26/B5/Cgp9HWBbP06ATdOgAACmvFgM-Dw740.png"}),l(),g,s(p,{alt:"图片2.png",src:"https://s0.lgstatic.com/i/image6/M01/26/B2/CioPOWBbP12ATomqAACTvnJY2As342.png"}),l(),u,m,A,Q,s(p,{alt:"图片3.png",src:"https://s0.lgstatic.com/i/image6/M00/26/B6/Cgp9HWBbP6OAZOisAADmMmCz6J0621.png"}),l(),P,b,C,T,B,s(p,{alt:"图片4.png",src:"https://s0.lgstatic.com/i/image6/M00/26/B3/CioPOWBbP7CAdBehAAFmUNm5RpI937.png"}),l(),S,f,q,s(p,{alt:"图片5.png",src:"https://s0.lgstatic.com/i/image6/M00/26/B6/Cgp9HWBbP7uAYaF0AAF7mapJsGU225.png"}),l(),k,M,x,I,s(p,{alt:"图片6.png",src:"https://s0.lgstatic.com/i/image6/M00/26/B6/Cgp9HWBbP8WAKZU6AAFex-HgCk8597.png"}),l(),O,V,s(p,{alt:"图片7.png",src:"https://s0.lgstatic.com/i/image6/M00/26/B3/CioPOWBbP86ACUfOAAFXx1TWKa0359.png"}),l(),W,E,H,s(p,{alt:"图片8.png",src:"https://s0.lgstatic.com/i/image6/M00/26/B3/CioPOWBbP9eAJ1hYAAGr-fh2HoA956.png"}),l(),N,D,s(p,{alt:"图片9.png",src:"https://s0.lgstatic.com/i/image6/M00/26/B6/Cgp9HWBbP-GAQTebAAFAqGJp7Fs627.png"}),l(),F,s(p,{alt:"图片10.png",src:"https://s0.lgstatic.com/i/image6/M00/26/B6/Cgp9HWBbP-uAI4BRAAEObVlLIO0115.png"}),l(),R,s(p,{alt:"图片11.png",src:"https://s0.lgstatic.com/i/image6/M01/26/B7/Cgp9HWBbP_SAHBnMAAHObPWvZgE837.png"}),l(),J])}const w=_(i,[["render",v]]);export{Z as __pageData,w as default};
