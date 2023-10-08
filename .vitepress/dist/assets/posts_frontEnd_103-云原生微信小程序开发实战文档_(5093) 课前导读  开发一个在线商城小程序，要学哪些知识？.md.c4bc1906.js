import{_ as n,j as s,o as r,g as p,k as o,h as t,s as e,Q as _}from"./chunks/framework.a0d18f64.js";const V=JSON.parse('{"title":"课前导读开发一个在线商城小程序，要学哪些知识？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/103-云原生微信小程序开发实战文档/(5093) 课前导读  开发一个在线商城小程序，要学哪些知识？.md","filePath":"posts/frontEnd/103-云原生微信小程序开发实战文档/(5093) 课前导读  开发一个在线商城小程序，要学哪些知识？.md","lastUpdated":1696682708000}'),l={name:"posts/frontEnd/103-云原生微信小程序开发实战文档/(5093) 课前导读  开发一个在线商城小程序，要学哪些知识？.md"},i=e("h1",{id:"课前导读开发一个在线商城小程序-要学哪些知识",tabindex:"-1"},[t("课前导读开发一个在线商城小程序，要学哪些知识？ "),e("a",{class:"header-anchor",href:"#课前导读开发一个在线商城小程序-要学哪些知识","aria-label":'Permalink to "课前导读开发一个在线商城小程序，要学哪些知识？"'},"​")],-1),c=e("p",null,"你好，在开篇词中，我提到在课程的最后会完成一个在线商场小程序，为了完成它，你要做什么准备呢？今天我们就先用一个小程序开发案例一起领略一下整个开发流程，这样一来你就能有针对地去学习后面的内容了。",-1),h=e("p",null,[t("这个小程序的需求是做一个"),e("strong",null,"基础的在线商城小程序，"),t(" 包含基础的商品展示功能、购物车功能、订单下单收货功能，同时还要支持微信支付，整个开发流程如图所示。")],-1),d=e("h3",{id:"掌握基本的开发技能",tabindex:"-1"},[t("掌握基本的开发技能 "),e("a",{class:"header-anchor",href:"#掌握基本的开发技能","aria-label":'Permalink to "掌握基本的开发技能"'},"​")],-1),m=e("p",null,"首先，你要实现需求的基础部分，开发微信小程序中一系列商城页面，包括商品列表、商品详情、购物车、订单中心等页面。",-1),g=e("p",null,"如果你有一定的 Web 网页开发基础，你会觉得这很容易，因为可以用原生 HTML 和 CSS 来实现这一系列的页面，也可以借助框架轻松地实现。但将所熟悉的 Web 网页开发搬移到小程序中，真的会如你所愿吗？",-1),u=e("p",null,[t("如果按照"),e("a",{href:"https://developers.weixin.qq.com/miniprogram/dev/framework/",target:"_blank",rel:"noreferrer"},"微信小程序的开发文档标准"),t("开发完这些内容，你就会发现小程序表现得并不好，元素较多，加载混乱的页面，在配置较低的手机机型中运行将变得异常卡顿。这是因为你没有理解小程序的运行原理，把一些错误用法堆在了一起，比如频繁地调用数据同步、页面样式混乱、加载过程无序。")],-1),f=e("p",null,[t('那怎么才能消除卡顿，提升小程序的运行质量呢？我相信你带着这个问题去学习第一讲"'),e("strong",null,'双线程模型：为什么小程序不用浏览器的线程模型？"将会有很大的收获和提升。')],-1),A=e("p",null,[t("在微信小程序的页面开发完毕之后，我们进入需求开发的第二步：后端服务开发。在后端服务开发中，商城小程序需要有完整的用户体系以保证能够顺利完成商品的交付流程，那怎么有效界定用户身份?都有哪些方法用来构建业务身份体系，保障小程序能够按照需求执行权限管控呢？"),e("strong",null,'关于这一点，你会在第二讲，"授权模型： 小程序的用户体系与 OAuth 规范"中找到答案。')],-1),E=e("p",null,"除此之外，在开发这个小程序的过程中，你还会遇到多个页面用到同一个展示内容。比如商品内容展示，既需要在购物车中展示，也需要在订单中心展示。",-1),b=_('<p>如何有效利用相同展示内容，进行统一维护和管理，就需要组件化思维了。你可以在第三讲中了解这一点，更好的领悟背后的组件化思维。</p><h3 id="高效地进行团队协作开发" tabindex="-1">高效地进行团队协作开发 <a class="header-anchor" href="#高效地进行团队协作开发" aria-label="Permalink to &quot;高效地进行团队协作开发&quot;">​</a></h3><p>掌握小程序的基本开发技能并不是全部，你还要考虑到如果开发小程序的并不是自己，而是一个团队，那就要处理研发过程中的一系列协作问题。因为当开发者从个人上升到群体层面时，即使再小的产品也需要引入工程化的思维来进行有效管理，避免冲突和效率低下。</p><p>在第5讲中，会挑选一些环节来重点介绍微信小程序研发流程规范，比如如何管理 npm 模块；如何使用预处理器编写模块化的样式等。这样一来你会更加熟悉适合微信小程序的研发体系。</p><p>除此之外，还要在关键的节点检验开发是否符合产品需求标准，这就需要团队进行高效率的测试，测试是间接提升产品竞争力的必要手段，第6讲，你会学习到如何更有效地测试小程序的 UI 和交互，更进一步，还会学习到如何借助一些工具实现测试的自动化。</p><p>产品正式上线后，运行数据以及各种能够追溯问题的日志都会成为你修正产品问题的关键，这就好比空难调查最核心的数据就是来自黑匣子。这就需要一个产品具备一个强大的数据监控记录体系，你将会在第7讲学习到这些。</p><p>在产品从研发到测试，最终上线运行的这一过程中，将会随着产品功能的迭代升级变成一个个闭环操作。在敏捷开发模式下，这一闭环过程会非常频繁，如何使用自动化的工具辅助开发团队实现这一闭环过程，就是第8讲所要表达的内容。</p><h3 id="合理使用微信小程序生态" tabindex="-1">合理使用微信小程序生态 <a class="header-anchor" href="#合理使用微信小程序生态" aria-label="Permalink to &quot;合理使用微信小程序生态&quot;">​</a></h3><p>我们在项目的开发过程中，一定会用到微信生态能力。比如用户在商城下单成功时，会发送一条微信消息给用户自身，用来确认系统已经开始处理订单。</p><p>我们可以使用微信小程序自身的订阅消息来实现这个功能，而这就是微信小程序生态的能力。我们在开发项目的过程中，要合理高效地使用微信小程序生态，有效地赋能项目。</p><p>第三模块主要从微信小程序生态出发，介绍常用到的微信小程序生态能力，并剖析其使用场景，为项目开发提供更加成熟实用的解决方案，让你清楚掌握这些能力应该用在哪里，怎么用。</p><p>第9讲主要讲怎么用云开发、云调用更加方便地使用微信的开放数据能力。第10讲会讲解怎么合理有效地提高小程序用户留存。除此之外，如果你的小程序的数据比较大，在首次加载时网络总会出现延迟等待，而11讲就针对性地讲解怎么用数据预取，提升加载速度。12讲主要讨论在线小程序如何进行升级，小程序的更新策略究竟如何运作。</p><h3 id="云端一体化后端服务" tabindex="-1">云端一体化后端服务 <a class="header-anchor" href="#云端一体化后端服务" aria-label="Permalink to &quot;云端一体化后端服务&quot;">​</a></h3><p>一般我们的小程序离不开后端服务，在商城项目中，你需要请求后端服务加载商品列表、商品详情；同时也需要后端服务来维持购物车列表以及处理订单，最终微信支付也是在后端服务的支持下才可以完成的。</p><p>如果你用传统的后端服务架构运行一个服务器来支持，则意味着你的团队需要专门的运维人员去维护服务器，否则随着业务量的激增，后端服务随时有宕机的风险。</p><p>当你的团队中没有多余的人力进行服务运维工作，并且还需要进行其他产品的研发时，人力资源就显得捉襟见肘了。</p><p>此时，你可以通过系统学习第四模块有效解决这个窘困的局面。第四模块的云开发是云端一体化的后端服务，有效的免运维、高可用，能够很大程度的节约成本，增加开发效率。</p><p>13 讲将带你学习和理解云开发的基本知识，以及能力的布局。</p><p>在你有一个整体的认知之后，将带你学习云开发的各项云端能力，包括数据库、函数、存储等基本能力，以及监控、告警等可用性保障措施。</p><p><strong>在夯实基础之后，我们就会迎来最后的实战项目，</strong> 你将在原始项目中改造或新增，完善整个项目直到运行。通过项目课程中的一些建议，串联起课程前四个模块所学习到的知识点，应用性学习会使得学习效率大为提升。</p><p>如果你准备好了，就正式进入学习吧！</p><hr><p><strong>《大前端高薪训练营》</strong></p><p>拉勾直推机会+硬核实战干货，6个月助你轻松斩获高薪 offer。<a href="https://kaiwu.lagou.com/fe_enhancement.html?utm_source=lagouedu&amp;utm_medium=zhuanlan&amp;utm_campaign=%E5%A4%A7%E5%89%8D%E7%AB%AF%E9%AB%98%E8%96%AA%E8%AE%AD%E7%BB%83%E8%90%A5" target="_blank" rel="noreferrer">点此链接，快来领取！</a></p>',24);function k(q,x,B,C,P,T){const a=s("Image");return r(),p("div",null,[i,c,h,o(a,{alt:"11112222.png",src:"https://s0.lgstatic.com/i/image/M00/66/BE/CgqCHl-fvMeAW9XFAABuTUoH0gk934.png"}),t(),d,m,o(a,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image/M00/65/44/Ciqc1F-acE6AVl1gAAj-QL0GESA079.png"}),t(),g,u,f,A,E,o(a,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image/M00/65/45/Ciqc1F-acG2AQ4pmAAGCMmp49X8378.png"}),t(),b])}const v=n(l,[["render",k]]);export{V as __pageData,v as default};
