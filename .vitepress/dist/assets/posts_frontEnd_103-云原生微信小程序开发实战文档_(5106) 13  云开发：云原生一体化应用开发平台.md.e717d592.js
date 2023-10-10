import{_,j as s,o as n,g as i,k as p,h as t,Q as o,s as a}from"./chunks/framework.cfb14fe0.js";const I=JSON.parse('{"title":"13云开发：云原生一体化应用开发平台","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/103-云原生微信小程序开发实战文档/(5106) 13  云开发：云原生一体化应用开发平台.md","filePath":"posts/frontEnd/103-云原生微信小程序开发实战文档/(5106) 13  云开发：云原生一体化应用开发平台.md","lastUpdated":1696682708000}'),l={name:"posts/frontEnd/103-云原生微信小程序开发实战文档/(5106) 13  云开发：云原生一体化应用开发平台.md"},r=o('<h1 id="_13云开发-云原生一体化应用开发平台" tabindex="-1">13云开发：云原生一体化应用开发平台 <a class="header-anchor" href="#_13云开发-云原生一体化应用开发平台" aria-label="Permalink to &quot;13云开发：云原生一体化应用开发平台&quot;">​</a></h1><p>你好，我是冠宇，从这个模块开始，就由我带着你一起学习。</p><p>在开篇词中，俊鹏讲到云开发诞生的背后动力是困扰前端开发者们的一个核心问题：对后端的依赖。<strong>那云开发到底怎么去优化和解决这个问题的呢？</strong> 这就是我们今天这节课要讨论的话题。</p><p>通过探讨这个问题，你能深刻认识到云开发到底是什么，并通过一些实际场景了解云开发在应用中发挥的作用。当然，你可以把这一讲当作整个模块的总纲，先从宏观上建立整体的认知，再深入细节，掌握后面的知识，比如怎么设计简单易用的云开发函数。</p><h3 id="云开发的角色-后端服务" tabindex="-1">云开发的角色：后端服务 <a class="header-anchor" href="#云开发的角色-后端服务" aria-label="Permalink to &quot;云开发的角色：后端服务&quot;">​</a></h3><p>云开发其实是一种后端服务，和服务器所扮演的角色类似，都是服务端角色。不过云开发把服务所需要的一些资源（比如计算、存储、消息推送等）封装打包，以方便开发者使用。整体上讲，云开发包括了云函数、云数据库、云存储、云托管等一些基础服务资源，以及云上的各种扩展能力（比如图像处理、客服服务等）。</p><p><strong>在调用方式上，</strong> 云开发的使用方法和前端开发差不多，它将触手可及的各种资源以接口 SDK 的形式给到开发者。举个例子，如果开发微信小程序，需要存储用户的个人数据以方便应用业务，你可以用云开发的接口把数据存入数据库，这个接口并不是 URL 地址，而是一个函数方法（function），举例如下：</p>',7),c=a("p",null,"如果你想对这些数据进行一些复杂的处理（比如对数据做分析，生成报表）涉及其他的数据，可以把处理的逻辑放到云开发云函数中进行，而云函数也可以在小程序中用函数方法（function）的形式调用，举例如下：",-1),d=a("p",null,"再深一步，如果你的微信小程序想存储一些文件，也可以直接使用云开发接口，调用上传文件，文件可以同时被小程序端和云函数端获取到，方便应用功能的开发，举例如下：",-1),h=o('<p>以上在开发小程序时所用到的数据库、云函数、云存储都是云开发提供的资源：</p><ul><li><p>云函数是独立的计算资源，通过触发执行逻辑运算或者资源处理，最终返回结果；</p></li><li><p>数据库是遵循 Mongo 协议的非关系型数据库，可以直接通过各种 API 进行调用处理；</p></li><li><p>云存储是云开发提供的专门的存储空间，有基础 API 进行文件管理。</p></li></ul><p>而这些基础服务资源（数据库、云函数、云存储）都被整合到一套接口调用标准中，根据这套标准以及适用端场景，会产生各种 SDK，分别专注于客户端、云函数端、管理端等进行资源统筹和处理。</p><p>上述内容中，微信小程序的例子里提到的函数方法（function），其实是云开发微信小程序　SDK 提供的，而 SDK 在微信小程序中其实也是使用请求 URL 的方法（wx.request）实现的服务发送和接收。</p><p>你可能觉得没什么，把一些云服务的 URL 通过模块手段包装做一个 SDK 并不是很难。但真是这样的吗？要探究这个问题就不得不提云原生的概念了。</p><h3 id="如何理解微信云原生的后端云服务" tabindex="-1">如何理解微信云原生的后端云服务？ <a class="header-anchor" href="#如何理解微信云原生的后端云服务" aria-label="Permalink to &quot;如何理解微信云原生的后端云服务？&quot;">​</a></h3><p>很多同学对&quot;原生&quot;的理解是：初始的、未经修饰的、最初的，第一出现且未经任何外力、内力改变的个体。放到 App 开发上，原生开发就意味着用系统底层的能力，没有中间层的包装，性能更加优秀。</p><p>而在微信小程序上更接近于原生开发是因为很多小程序的系统能力或者组件，是以微信客户端的名义直接向系统发起调用，所以在通信中间没有过多的损耗数据和操作。而 WEB 网页开发就不是原生，因为所有的组件渲染和系统能力的使用都由浏览器提供或转发，此应用的性能完全取决于浏览器的性能。</p><p>以上是我们站在客户端角度来讨论原生，**那么在后端服务上，为什么也有原生呢？**我们以微信小程序的登录举例。</p><p>微信为了保证微信小程序体系的安全性，所有用户的小程序并不是直接请求的开发者服务器，而是通过微信服务器进行转发，这也就意味着，维系用户身份经常使用的 cookie 和 session 无法正常运作。那怎么让服务器知道它所接收的请求是由哪个用户发出的呢？另外怎么判断接收到的请求是否来自真实用户呢？</p><p>于是就有了以下的登录体系：</p>',11),g=a("p",null,[t("没有云开发的时候，所有开发者都是按照这个体系进行用户验证的，由于安全性等因素，微信服务器与开发者服务器无法互相信任，所以这一系列登录的步骤非常繁杂。"),a("strong",null,"那云开发在这里是如何做的呢？")],-1),m=a("p",null,"首先微信服务器和云开发服务本身做了互相信任，并且从小程序端的调用一直到云开发服务都是采用和微信一致的私有链路，安全性有很大的保证。",-1),A=a("p",null,"在链路安全的情况下，微信小程序直接在这个链路内天然地嵌入用户身份认证。也就是说，当小程序调用云开发云函数时，会自带用户的 openid，天然地鉴权。",-1),u=a("p",null,"如此一来，开发者就不用做上图的登录体系就可以直接拿到用户身份了。请你切身感受一下，这是不是原生云服务（也即云原生）？一切自成一体，小程序直接到云开发。",-1),T=o('<p>如果你仍然有自己的后端支撑体系，可以直接从云开发的云函数进行转接，整体效率会比使用传统登录方式高效得多。</p><p>由于云开发和微信之间做了链路上的打通，使得原本因为身份识别而构建的请求没有了实质上的意义。所以对于开发者而言，使用云开发就意味着不需要为打通微信生态做更多的开发投入。</p><p>对于微信而言，微信服务链路是直接对接到云开发的服务链路中，并不会和开发者资源直接接触，而云开发的计算服务资源并不会脱离微信的生态规范，所以开发者在云开发中做任何的转发服务都不会对微信本身服务链路造成威胁和损伤。</p><p>当然，云开发云原生的体验还不止于此，你将在本课程中感受云调用，开放数据免鉴权的魅力，真正走进云原生。</p><p>如果你只是一个前端开发者，不具备成型的后端支撑体系，云开发易于使用的后端服务会像调用API 一样简单，你将会进一步向全栈开发迈进。</p><h3 id="不止于微信小程序" tabindex="-1">不止于微信小程序 <a class="header-anchor" href="#不止于微信小程序" aria-label="Permalink to &quot;不止于微信小程序&quot;">​</a></h3><p>当然，除了微信小程序之外，云开发也在原生支持多端平台以及应用，甚至可以跨端跨平台统一提供服务，每一个端都和微信小程序一样有专业成熟的 SDK 用于管理和调用资源，比如适用于 QQ 小程序的 QQ-SDK；适合 WEB 网页开发的 JS-SDK 等。</p><p>如果你不满足 SDK 调用的方式，可以使用云开发原生的云接入，直接将云开发服务通过 HTTP 方式进行外发。如果深度了解你还会发现，云函数不仅仅能用来计算，还可以用来渲染页面以及其他更多的地方，比如封装成 URL 接口，页面转发等。</p><p>如果你觉得云开发的云函数、数据库、存储资源太分散，这种开发模式太超前，使用传统技术栈的后台服务的你，难以承担云函数改造成本。你可以用云开发的云托管服务快速迁移存量业务，同时支持东西向通信微服务和服务常驻。</p><p>云开发除了原生支持微信小程序，还原生支持更多平台和端应用，你可以通过访问<a href="https://console.cloud.tencent.com/tcb/env/index?action=CreateAndDeployCloudBaseProject&amp;appUrl=https%3A%2F%2Fgithub.com%2FTCloudBase%2FWEB-TodoList-framework&amp;appName=Todo" target="_blank" rel="noreferrer">这个链接</a>，一键部署一个 WEB 版本的待办事项应用，直观感受在 WEB 中是如何做登录鉴权的原生支持的。</p><p>以前，我们做 WEB 应用的时候，总是在登录鉴权方面花费很大的心力，但是还是会出现各种各样，防不胜防的安全漏洞。云开发将登录鉴权能力以 SDK 的形式提供给开发者直接使用，你只需要专注于业务逻辑就可以了，而有关于登录安全和用户鉴别方面，云开发都做了最优解。</p>',11),D=o('<p>除了很常见的用户名登录之外，云开发在还集成了短信验证码登录、邮件登录、微信公众号登录、微信开放平台登录、匿名登录等多种登录方式。这其中有很大一部分都与身份提供者本身做了原生的链路优化，比如微信体系登录，在开发者的视角下，只需要 SDK 调用即可，不用去关系配置以及令牌获取方面的问题。</p><h3 id="小结" tabindex="-1">小结 <a class="header-anchor" href="#小结" aria-label="Permalink to &quot;小结&quot;">​</a></h3><p>今天这节课，我们认识了云开发是后端服务的角色，并进一步理解原生化云服务对应用开发带来的方便和高效。通过今天的学习我希望你能够掌握以下几点：</p><ul><li><p>了解云开发的基础能力以及可应用的场景；</p></li><li><p>理解和掌握云开发如何进行原生的登录鉴权；</p></li><li><p>了解其他端云开发的支持情况。</p></li></ul><p>总的来说，学完今天的内容后，我更希望你通过深度理解微信小程序以及小程序·云开发，来向多端云开发体系进行探索和进步。也期待你可以在云开发多端支持和跨平台应用中有所理解和提升。</p><p>今天的作业就是参照<a href="https://developers.weixin.qq.com/miniprogram/dev/wxcloud/basis/getting-started.html" target="_blank" rel="noreferrer">微信官方文档</a>，对云开发的能力进行初步学习，在之后的内容中，我将带你更深层次地学习云开发各项能力。</p>',6);function S(f,C,P,q,E,b){const e=s("Image");return n(),i("div",null,[r,p(e,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image/M00/7E/A5/Ciqc1F_PRjWAEAHzAADH4c8i-fw334.png"}),t(),c,p(e,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image/M00/7E/B0/CgqCHl_PRjyAc4fxAADIrj_69iQ863.png"}),t(),d,p(e,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image/M00/7E/A5/Ciqc1F_PRkKAOqD3AADBYbUP4qQ686.png"}),t(),h,p(e,{alt:"image (5).png",src:"https://s0.lgstatic.com/i/image/M00/81/C7/CgqCHl_Rmt-Aa8OlAACADvbau6U263.png"}),t(),g,m,A,u,p(e,{alt:"image (6).png",src:"https://s0.lgstatic.com/i/image/M00/81/BC/Ciqc1F_RmuaALILWAABd-c3EkSc118.png"}),t(),T,p(e,{alt:"小程序13-金句.png",src:"https://s0.lgstatic.com/i/image/M00/8B/DE/CgqCHl_hcl-AZ1-ZAADvoFXLLs0740.png"}),t(),D])}const k=_(l,[["render",S]]);export{I as __pageData,k as default};
