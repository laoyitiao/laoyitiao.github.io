import{_ as o,j as a,o as i,g as p,k as s,h as l,Q as e,s as n}from"./chunks/framework.4e7d56ce.js";const mn=JSON.parse('{"title":"11限流与熔断：Sentinel在项目中的最佳实践","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/SpringCloud Alibaba 实战_文档/(6756) 11  限流与熔断：Sentinel 在项目中的最佳实践.md","filePath":"posts/backEnd/SpringCloud Alibaba 实战_文档/(6756) 11  限流与熔断：Sentinel 在项目中的最佳实践.md","lastUpdated":1696682708000}'),c={name:"posts/backEnd/SpringCloud Alibaba 实战_文档/(6756) 11  限流与熔断：Sentinel 在项目中的最佳实践.md"},r=e("",13),_=n("p",null,"Sentinel Core 向 Dashboard 建立连接",-1),d=n("p",null,"在 Sentinel Dashboard 接收到心跳包后，来自 Sentinel Core的AppName、IP、端口信息会被封装为 MachineInfo 对象放入 ConcurrentHashMap 保存在 JVM的内存中，以备后续使用。",-1),h=n("p",null,[n("strong",null,"第二步，推送新规则。")],-1),u=n("p",null,"如果在 Dashboard 页面中设置了新的保护规则，会先从当前的 MachineInfo 中提取符合要求的微服务实例信息，之后通过 Dashboard内置的 transport 模块将新规则打包推送到微服务实例的 Sentinel Core，Sentinel Core收 到新规则在微服务应用中对本地规则进行更新，这些新规则会保存在微服务实例的 JVM 内存中。",-1),g=n("p",null,"Sentinel Dashboard 向Sentinel Core推送新规则",-1),S=n("p",null,[n("strong",null,"第三步，处理请求。")],-1),A=n("p",null,'Sentinel Core 为服务限流、熔断提供了核心拦截器 SentinelWebInterceptor，这个拦截器默认对所有请求 /** 进行拦截，然后开始请求的链式处理流程，在对于每一个处理请求的节点被称为 Slot（槽），通过多个槽的连接形成处理链，在请求的流转过程中，如果有任何一个 Slot 验证未通过，都会产生 BlockException，请求处理链便会中断，并返回"Blocked by sentinel" 异常信息。',-1),m=e("",10),b=n("p",null,"滑动窗口算法",-1),E=n("h4",{id:"基于-sentinel-dashboard-的限流设置",tabindex:"-1"},[l("基于 Sentinel Dashboard 的限流设置 "),n("a",{class:"header-anchor",href:"#基于-sentinel-dashboard-的限流设置","aria-label":'Permalink to "基于 Sentinel Dashboard 的限流设置"'},"​")],-1),C=n("p",null,'在 Sentinel Dashboard 中"簇点链路",找到需要限流的 URI，点击"+流控"进入流控设置。小提示，sentinel-dashboard 基于懒加载模式，如果在簇点链路没有找到对应的 URI，需要先访问下这个功能的功能后对应的 URI 便会出现。',-1),P=n("p",null,"流控设置界面",-1),y=n("p",null,"流控规则项目说明主要有以下几点。",-1),D=n("ul",null,[n("li",null,[n("p",null,'资源名：要流控的 URI，在 Sentinel 中 URI 被称为"资源"；')]),n("li",null,[n("p",null,"针对来源：默认 default 代表所有来源，可以针对某个微服务或者调用者单独设置；")]),n("li",null,[n("p",null,"阈值类型：是按每秒访问数量（QPS）还是并发数（线程数）进行流控；")]),n("li",null,[n("p",null,"单机阈值：具体限流的数值是多少。")])],-1),k=n("p",null,"默认流控规则",-1),B=n("p",null,'点击对话框中的"高级选项"，就会出现更为详细的设置项。',-1),T=n("p",null,"其中流控模式是指采用什么方式进行流量控制。Sentinel支持三种模式：直接、关联、链路，下面咱们分别讲解这三种模式。",-1),q=n("ul",null,[n("li",null,[n("strong",null,"直接模式：")])],-1),M=n("p",null,'以下图为例，当 List 接口 QPS 超过 1个时限流，浏览器会出现"Blocked by Sentinel"。',-1),I=n("p",null,"流控模式-直接",-1),W=n("ul",null,[n("li",null,[n("strong",null,"关联模式：")])],-1),x=n("p",null,'如下图所示，当同 List 接口关联的update 接口 QPS 超过 1 时，再次访问List 接口便会响应"Blocked by Sentinel"。',-1),f=n("p",null,"流控模式-关联",-1),O=n("ul",null,[n("li",null,[n("strong",null,"链路模式：")])],-1),Q=n("p",null,[l('链路模式相对复杂，我们举例说明，现在某公司开发了一个单机的电商系统，为了满足完成"下订单"的业务，程序代码会依次执行'),n("strong",null,"订单创建方法->减少库存方法->微信支付方法->短信发送"),l("方法。方法像链条一样从前向后依次执行，这种执行的链条被称为调用链路，而链路模式限流就是为此而生。")],-1),V=n("p",null,"以下图为例，在某个微服务中 List 接口，会被 Check 接口调用。在另一个业务，List 接口也会被 Scan 接口调用。",-1),L=n("p",null,"调用链路",-1),U=n("p",null,'但如果按下图配置，将入口资源设为"/check"，则只会针对 check 接口的调用链路生效。当访问 check 接口的QPS 超过 1 时，List 接口就会被限流。而另一条链路从 scan 接口到List 接口的链路则不会受到任何影响。链路模式与关联模式最大的区别是 check 接口与 List 接口必须是在同一个调用链路中才会限流，而关联模式是任意两个资源只要设置关联就可以进行限流。',-1),N=e("",5),R=n("p",null,"流控效果-快速失败",-1),Y=n("ul",null,[n("li",null,[n("strong",null,"Warm Up（预热）：")])],-1),v=n("p",null,"Warm Up 用于应对瞬时大并发流量冲击。当遇到突发大流量 Warm Up 会缓慢拉升阈值限制，预防系统瞬时崩溃，这期间超出阈值的访问处于队列等待状态，并不会立即抛出 BlockException。",-1),F=n("p",null,"如下图所示，List 接口平时单机阈值 QPS 处于低水位：默认为 1000/3 (冷加载因子)≈333，当瞬时大流量进来，10 秒钟内将 QPS 阈值逐渐拉升至 1000，为系统留出缓冲时间，预防突发性系统崩溃。",-1),H=e("",5),w=e("",9),j=n("p",null,"Sentinel 熔断机制",-1),J=n("h4",{id:"基于sentineldashboard的熔断设置",tabindex:"-1"},[n("strong",null,"基于SentinelDashboard的熔断设置"),l(),n("a",{class:"header-anchor",href:"#基于sentineldashboard的熔断设置","aria-label":'Permalink to "**基于SentinelDashboard的熔断设置**"'},"​")],-1),K=n("p",null,"Sentinel Dashboard可以设置三种不同的熔断模式：慢调用比例、异常比例、异常数，下面我们分别讲解：",-1),z=n("ul",null,[n("li",null,'慢调用比例是指当接口在1秒内"慢处理"数量超过一定比例，则触发熔断。')],-1),$=n("p",null,"熔断模式-慢调用比例",-1),X=n("p",null,'结合上图的设置，介绍下"慢调用比例"熔断规则。',-1),Z=n("ul",null,[n("li",null,"异常比例是指 1 秒内按接口调用产生异常的比例（异常调用数/总数量）触发熔断。")],-1),G=n("p",null,"熔断模式-异常比例",-1),nn=n("p",null,'结合上图的设置，介绍下"异常比例"熔断规则。',-1),ln=n("ul",null,[n("li",null,"异常数是指在 1 分钟内异常的数量超过阈值则触发熔断。")],-1),tn=n("p",null,"熔断模式-异常数",-1),sn=n("p",null,'结合上图的设置，介绍下"异常数"熔断规则。',-1),en=n("p",null,"以上就是三种熔断模式的介绍，熔断相对流控配置比较简单，只需要设置熔断检查开启条件与触发熔断条件即可。讲到这关于限流与熔断的配置暂时告一段落，下面对本讲内容进行下总结。",-1),on=n("h3",{id:"小结与预告",tabindex:"-1"},[l("小结与预告 "),n("a",{class:"header-anchor",href:"#小结与预告","aria-label":'Permalink to "小结与预告"'},"​")],-1),an=n("p",null,"本讲咱们介绍了三部分内容，第一部分讲解了 Sentinel Dashboard 与 Sentinel Core的通信机制与执行原理，了解 Sentinel Core 是通过拦截器实现了限流与熔断；第二部分讲解了滑动窗口算法与 Dashboard 流控配置的每一种情况；第三部分讲解了熔断机制与 Dashboard 的熔断配置。",-1),pn=n("p",null,"这里留一个讨论话题：假如你遇到像春运 12306 热门车次购票这种高并发场景，为了保证应用的稳定和用户的体验，我们要采取哪些措施呢？可以把你的经验写在评论中，咱们一起探讨。",-1),cn=n("p",null,"下一讲，将进入生产集群保护这个话题，看 Sentinel 是如何对整个服务集群实施保护的。",-1);function rn(_n,dn,hn,un,gn,Sn){const t=a("Image");return i(),p("div",null,[r,s(t,{alt:"图片1.png",src:"https://s0.lgstatic.com/i/image6/M00/26/25/CioPOWBarxyAfxg4AAEytt3cAkM947.png"}),l(),_,d,h,u,s(t,{alt:"图片22.png",src:"https://s0.lgstatic.com/i/image6/M00/26/28/Cgp9HWBaryuANUd3AAFKoecEXLU156.png"}),l(),g,S,A,s(t,{alt:"图片2.png",src:"https://s0.lgstatic.com/i/image6/M00/26/25/CioPOWBarziAOzV2AAFkVrbLros829.png"}),l(),m,s(t,{alt:"图片4.png",src:"https://s0.lgstatic.com/i/image6/M00/26/25/CioPOWBar0iAFl_9AASda6g75YE021.png"}),l(),b,E,C,s(t,{alt:"图片5.png",src:"https://s0.lgstatic.com/i/image6/M00/26/28/Cgp9HWBar1OAG6JAAAKivJHK_-k419.png"}),l(),P,y,D,s(t,{alt:"图片6.png",src:"https://s0.lgstatic.com/i/image6/M00/26/28/Cgp9HWBar16Abbz2AAOQnjLspDY532.png"}),l(),k,B,T,q,M,s(t,{alt:"图片7.png",src:"https://s0.lgstatic.com/i/image6/M00/26/28/Cgp9HWBar4CARQwVAAEmI2EpwUs844.png"}),l(),I,W,x,s(t,{alt:"图片8.png",src:"https://s0.lgstatic.com/i/image6/M00/26/25/CioPOWBar4qAaeVSAAEgPLPCgYU751.png"}),l(),f,O,Q,V,s(t,{alt:"图片99.png",src:"https://s0.lgstatic.com/i/image6/M00/26/28/Cgp9HWBar5qAQ8kxAAB6_MghZFM405.png"}),l(),L,U,s(t,{alt:"图片9.png",src:"https://s0.lgstatic.com/i/image6/M01/26/25/CioPOWBar6SAU6wQAAFdYOUQcEQ336.png"}),l(),N,s(t,{alt:"图片11.png",src:"https://s0.lgstatic.com/i/image6/M01/26/29/Cgp9HWBar7CAPY7AAAGALPdbIwo406.png"}),l(),R,Y,v,F,s(t,{alt:"图片12.png",src:"https://s0.lgstatic.com/i/image6/M01/26/25/CioPOWBar76AYECLAAKiRTkN46w430.png"}),l(),H,s(t,{alt:"图片13.png",src:"https://s0.lgstatic.com/i/image6/M01/26/25/CioPOWBar8mAA3X_AAFbifYRYio573.png"}),l(),w,s(t,{alt:"图片14.png",src:"https://s0.lgstatic.com/i/image6/M01/26/25/CioPOWBar9OAT7iIAADpMfE3-dw738.png"}),l(),j,J,K,z,s(t,{alt:"图片15.png",src:"https://s0.lgstatic.com/i/image6/M01/26/25/CioPOWBar92AAT0jAAHYZ6NDKjQ113.png"}),l(),$,X,s(t,{alt:"图片18.png",src:"https://s0.lgstatic.com/i/image6/M01/26/25/CioPOWBar-qACeUjAALQjoYzEvE265.png"}),l(),Z,s(t,{alt:"图片16.png",src:"https://s0.lgstatic.com/i/image6/M01/26/29/Cgp9HWBar_SAOTw9AAFxRASYnnE809.png"}),l(),G,nn,s(t,{alt:"图片19.png",src:"https://s0.lgstatic.com/i/image6/M01/26/26/CioPOWBar_6AXJmYAAK3pfImZs4903.png"}),l(),ln,s(t,{alt:"图片17.png",src:"https://s0.lgstatic.com/i/image6/M01/26/29/Cgp9HWBasAmAO9LnAAFiqbTOxTs071.png"}),l(),tn,sn,s(t,{alt:"图片20.png",src:"https://s0.lgstatic.com/i/image6/M00/26/26/CioPOWBasBOAY3wPAALTmvi2q7s202.png"}),l(),en,on,an,pn,cn])}const bn=o(c,[["render",rn]]);export{mn as __pageData,bn as default};
