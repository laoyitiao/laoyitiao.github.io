import{_ as n,j as o,o as r,g as p,k as t,h as a,Q as i,s as e}from"./chunks/framework.4e7d56ce.js";const q=JSON.parse('{"title":"24未来展望：中间件Meh化的可行性","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/微服务Service Mesh原理与实战_文档/(6017) 24  未来展望：中间件 Meh 化的可行性.md","filePath":"posts/backEnd/微服务Service Mesh原理与实战_文档/(6017) 24  未来展望：中间件 Meh 化的可行性.md","lastUpdated":1696682708000}'),l={name:"posts/backEnd/微服务Service Mesh原理与实战_文档/(6017) 24  未来展望：中间件 Meh 化的可行性.md"},c=i("",40),h=i("",11),_=e("p",null,"同步 OpenFaaS 调用图",-1),d=e("p",null,"那么，在 FaaS 中有没有更好的解决方案呢？我们来看 OpenFaaS 中的异步方案。",-1),S=e("p",null,[e("strong",null,"异步")],-1),u=e("p",null,[a("在 OpenFaaS 中， OpenFaaS 将请求作为事件直接放入 NATS 这个队列系统中，对于使用者来说，他并不需要关心这是否是一个异步调用。这个调用的编程方式，依然是 HTTP 的方式，只是 OpenFaaS Gateway 自动将此次 HTTP 调用放入了 NATS 队列中，通过 queue-worker这个进程进行队列消费，再通过 HTTP 请求 Generate Statement 服务的方式触发此次服务调用，"),e("strong",null,"用看起来同步的方式完成了整个异步调用"),a("。")],-1),v=e("p",null,"OpenFaaS 异步调用图",-1),g=e("p",null,"通过下图我们可以更直观地了解整个运行过程。",-1),F=e("p",null,[a("在这个架构中，使用者无须关心甚至无须感知 NATS 队列系统，对于使用者来说，这看起来就是一次普通的 HTTP 服务调用。而 PDF 生成服务的编写者，也不需要处理复杂的队列消费，对于他来说，也和其他同步服务一样，提供一个简单的 HTTP 服务接口就可以了。FaaS 架构"),e("strong",null,"让队列系统和业务解耦"),a("，可以让队列系统完全交给基础架构团队维护，甚至未来可以随意更换其他的开源队列系统。")],-1),M=e("p",null,"至此，Service Mesh 在 FaaS 场景中的应用我们就讲完了。下面我们来做一个简单的总结。",-1),m=e("h3",{id:"总结",tabindex:"-1"},[a("总结 "),e("a",{class:"header-anchor",href:"#总结","aria-label":'Permalink to "总结"'},"​")],-1),P=e("p",null,"这一讲我介绍了 Service Mesh 在未来的展望，包括中间件 Mesh 化和 FaaS 中 Service Mesh 的作用。在云原生的大趋势下， Service Mesh 已经成为云原生的基础组件，未来云原生架构中的很多场景都会看到 Service Mesh 的应用。",-1),A=e("p",null,"本讲内容总结如下：",-1),T=e("p",null,"通过这一讲，相信你已经了解了 Envoy 在数据库中间件 Mesh 化中做出的一些尝试，也清楚了 FaaS 的开源架构之一------Knative 就是通过集成 Istio 来为 FaaS 产品提供强大的路由转发能力。",-1),b=e("p",null,"结合今天的内容，你能谈一谈自己对 Service Mesh 未来的发展方向和演进趋势吗？欢迎在留言区和我分享你的观点。",-1),K=e("p",null,"今天内容到这里就结束了，下一讲我们将迎来专栏的结束语 ：Service Mesh 会是微服务演进的终极方向吗？作为结束语，我除了讲解相关知识，也想和你分享一下自己的心路历程。我们下一讲再见。",-1);function R(k,f,I,E,C,O){const s=o("Image");return r(),p("div",null,[c,t(s,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image6/M00/16/B7/Cgp9HWBG4P-AFQzZAAFOLVdbxMk069.png"}),a(),h,t(s,{alt:"image (7).png",src:"https://s0.lgstatic.com/i/image6/M00/17/F4/CioPOWBIXc-AQeVHAAO1JrBGh-k128.png"}),a(),_,d,S,u,t(s,{alt:"image (8).png",src:"https://s0.lgstatic.com/i/image6/M00/17/F8/Cgp9HWBIXeSAIKrRAAW1muIBZHo599.png"}),a(),v,g,t(s,{alt:"image (11).png",src:"https://s0.lgstatic.com/i/image6/M01/17/F4/CioPOWBIXfqANn-vAAObuUHa1s0115.png"}),a(),F,M,m,P,A,t(s,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image6/M00/16/B7/Cgp9HWBG4SqAPJUBAAGt3f2z_2M257.png"}),a(),T,b,K])}const B=n(l,[["render",R]]);export{q as __pageData,B as default};
