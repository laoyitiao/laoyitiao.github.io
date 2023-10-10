import{_ as o,j as t,o as e,g as c,k as l,h as a,s,Q as p}from"./chunks/framework.cfb14fe0.js";const O=JSON.parse('{"title":"11分布式服务链路监控以及报警方案","description":"","frontmatter":{},"headers":[],"relativePath":"posts/devops/047_说透性能测试/(6162) 11  分布式服务链路监控以及报警方案.md","filePath":"posts/devops/047_说透性能测试/(6162) 11  分布式服务链路监控以及报警方案.md","lastUpdated":1696682708000}'),r={name:"posts/devops/047_说透性能测试/(6162) 11  分布式服务链路监控以及报警方案.md"},y=s("h1",{id:"_11分布式服务链路监控以及报警方案",tabindex:"-1"},[a("11分布式服务链路监控以及报警方案 "),s("a",{class:"header-anchor",href:"#_11分布式服务链路监控以及报警方案","aria-label":'Permalink to "11分布式服务链路监控以及报警方案"'},"​")],-1),i=s("p",null,"上一讲我们主要讲解了硬件的命令行资源监控，相信你已经学会了通过命令行的方式查看硬件瓶颈。",-1),E=s("p",null,[a("那我提一个问题，为什么会有硬件瓶颈呢？或者我说得更直白一点，如果服务器上没有应用还会造成硬件瓶颈吗？显然是不会的，所以我想向你传递一个观点："),s("strong",null,"呈现出来的硬件瓶颈绝大多数是表象问题"),a("，我们往往需要在系统应用上寻找问题的根因。而寻找系统问题的根因，对于系统链路监控也是必不可少的，所以这一讲我将带你学习如何进行基于系统链路的监控。")],-1),g=s("h3",{id:"为什么要链路监控",tabindex:"-1"},[a("为什么要链路监控？ "),s("a",{class:"header-anchor",href:"#为什么要链路监控","aria-label":'Permalink to "为什么要链路监控？"'},"​")],-1),d=s("p",null,"随着微服务的流行，链路监控越来越受重视。微服务架构是根据业务进行拆分，对外统一暴露API 接口，而内部可能是分布式服务、分布式对象存储等，如图 1 所示。",-1),A=p("",11),u=p("",6),h=p("",11),_=p("",4),k=s("p",null,"图 3：服务部署图",-1),F=p("",12),D=s("p",null,"（2）在打开的机器人详情页面点击添加按钮，如下图所示：",-1),m=s("p",null,"（3）在打开的添加机器人页面输入机器人名字，选择要接收报警的钉钉群 ，设置机器人头像。根据需要勾选安全设置等就可以，点击完成之后，在页面拷贝出 Webhook 地址保存好，向这个地址发送 HTTP POST 请求，设置的 SkyWalking 钉钉报警群便能收到钉钉报警消息，如下图所示：",-1),v=s("p",null,'配置好之后我们可以看到设置报警的钉钉群"SkyWalking 钉钉报警"出现了报警机器人消息，如下图所示：',-1),C=p("",13),S=s("p",null,"图 5：业务报错图",-1),b=s("p",null,"图 6：钉钉报警图",-1),q=s("h3",{id:"总结",tabindex:"-1"},[a("总结 "),s("a",{class:"header-anchor",href:"#总结","aria-label":'Permalink to "总结"'},"​")],-1),T=s("p",null,"这一讲主要讲解了关于 SkyWalking 的使用背景以及价值，在实操层面讲解了 SkyWalking 是如何追踪监控中出现的错误，并且把出现的错误通过钉钉通知给相关人员，相信通过这一讲的学习，你也对微服务下的报警方案会有一个更深刻的认识。",-1),W=s("p",null,"这里你需要思考下，你所在的公司是如何进行链路监控的？你觉得有什么优点和缺点？欢迎在交流区留下你的答案。",-1),P=s("p",null,"下一讲我将带你学习如何玩转可视化监控，如何把监控大屏做得酷炫！",-1);function f(B,j,x,w,M,I){const n=t("Image");return e(),c("div",null,[y,i,E,l(n,{alt:"金句模板 titel 无阴影版本.png",src:"https://s0.lgstatic.com/i/image6/M00/04/35/CioPOWAkcfaAJEm5AAEmKUDxE0Q409.png"}),a(),g,d,l(n,{alt:"1shangchuan.png",src:"https://s0.lgstatic.com/i/image6/M00/04/35/CioPOWAkcOeAJyX6AAH4oq8oV4s515.png"}),a(),A,l(n,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image6/M00/02/ED/CioPOWAeP5uAc_faAAPptpn_1oo892.png"}),a(),u,l(n,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image6/M00/02/ED/CioPOWAeP6iABnf7AACwQCQbs98587.png"}),a(),h,l(n,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image6/M00/02/ED/CioPOWAeP7aAEe_mAAIEY3gT-2w743.png"}),a(),_,l(n,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image6/M00/02/EF/Cgp9HWAeP8KAOwR0AADQLStdVOY719.png"}),a(),k,l(n,{alt:"Drawing 5.png",src:"https://s0.lgstatic.com/i/image6/M00/02/ED/CioPOWAeP8qALzJFAAMUz2rcn3k246.png"}),a(),F,l(n,{alt:"Drawing 6.png",src:"https://s0.lgstatic.com/i/image6/M00/02/EF/Cgp9HWAeP9WAKr2zAALfMHmtwh8462.png"}),a(),D,l(n,{alt:"Drawing 7.png",src:"https://s0.lgstatic.com/i/image6/M00/02/ED/CioPOWAeP9qALHMNAAF-M44iggo590.png"}),a(),m,l(n,{alt:"Drawing 8.png",src:"https://s0.lgstatic.com/i/image6/M00/02/EF/Cgp9HWAeP-GAcQSLAAFB0-TVf6w116.png"}),a(),v,l(n,{alt:"Drawing 9.png",src:"https://s0.lgstatic.com/i/image6/M00/02/EF/Cgp9HWAeP-qAURZCAAENpzpscRo136.png"}),a(),C,l(n,{alt:"Drawing 10.png",src:"https://s0.lgstatic.com/i/image6/M01/02/ED/CioPOWAeP_mAAJfMAAOa59AALCQ026.png"}),a(),S,l(n,{alt:"Drawing 11.png",src:"https://s0.lgstatic.com/i/image6/M01/02/EF/Cgp9HWAeQACAcTuwAAF2CS5plp8418.png"}),a(),b,q,T,W,P])}const U=o(r,[["render",f]]);export{O as __pageData,U as default};
