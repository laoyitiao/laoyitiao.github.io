import{_ as e,j as o,o as r,g as t,k as l,h as a,Q as p,s}from"./chunks/framework.a0d18f64.js";const j=JSON.parse('{"title":"09｜性能优化：如何提升Serverle应用的性能？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/玩转 Serverless 架构_文档/(6037) 09｜性能优化：如何提升 Serverle 应用的性能？.md","filePath":"posts/backEnd/玩转 Serverless 架构_文档/(6037) 09｜性能优化：如何提升 Serverle 应用的性能？.md","lastUpdated":1696682708000}'),c={name:"posts/backEnd/玩转 Serverless 架构_文档/(6037) 09｜性能优化：如何提升 Serverle 应用的性能？.md"},i=p("",9),E=s("p",null,"函数的启动过程示意图",-1),y=s("p",null,[a("从图中你可以发现，冷启动需要经过多个步骤，耗时比较长。"),s("strong",null,"那实际上冷启动时间到底有多长呢？"),a(" 你可以借助链路追踪工具，比如 AWS 的 "),s("a",{href:"https://aws.amazon.com/cn/xray/",target:"_blank",rel:"noreferrer"},"X-Ray"),a("、阿里云的"),s("a",{href:"https://www.aliyun.com/product/xtrace",target:"_blank",rel:"noreferrer"},"链路追踪"),a("。Lambda、函数计算等 FaaS 平台也都集成了链路追踪功能，通过链路追踪你可以查询函数冷启动耗时、执行时间，进行诊断和分析 Serverless 应用的性能。")],-1),_=s("p",null,"下面是我创建的一个函数的调用链路图：",-1),d=p("",7),h=s("p",null,"100 个请求，并发 1 （charles 设置）",-1),F=s("p",null,"发起请求后得到的结果如下：",-1),g=s("p",null,"100 个请求，并发 1 （测试结果）",-1),u=s("p",null,"在这个测试结果中，第一个请求耗时 770ms（我在这份代码的响应体中返回了 requestId，根据 requestId 在链路追踪中查询到第一个请求确实是冷启动）。而后面的请求都只耗时 40 ms左右，通过链路追踪分析确定都是热启动。可能对于某些性能要求不高的场景来说，在这 100 个请求中，只有一个请求是冷启动，影响的用户是 1%，是可以忍受的。",-1),A=s("p",null,[s("strong",null,"那如果用户并发访问会怎么样呢？"),a(" 毕竟用户行为是不可预测的，不可能总是串行访问。因此，让我们再来模拟发起 100 个请求，并发为 10 的情况，看一下会发生什么：")],-1),m=s("p",null,"100 个请求，并发 10 （charles 设置）",-1),S=p("",18),C=s("p",null,"假设有 3 个并发请求同时需要处理，当函数并发为 1 时，FaaS 平台就会生成 3 个函数实例来处理这 3 个请求，每个函数实例处理一个请求，需要经过 3 次冷启动。当函数并发为 10，则只会生成一个函数实例来处理 3 个并发请求。",-1),v=s("p",null,"单实例单并发的情况下，函数实例只能同时处理一个请求，处理完毕才能处理下一个请求。",-1),P=s("p",null,"而单实例多并发，函数实例则可以同时处理多个请求。",-1),b=p("",9),T=p("",9);function f(q,D,B,k,N,I){const n=o("Image");return r(),t("div",null,[i,l(n,{alt:"图片1.png",src:"https://s0.lgstatic.com/i/image2/M01/06/96/CgpVE2AFehKABm9NAAPbR0FktI8010.png"}),a(),E,y,_,l(n,{alt:"image.png",src:"https://s0.lgstatic.com/i/image2/M01/06/94/Cip5yGAFejSARHsrAAJ37M2V_VY768.png"}),a(),d,l(n,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image/M00/8E/AC/CgqCHmAFQDGAFPLlAACdpnqR27w892.png"}),a(),h,F,l(n,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image2/M01/06/8F/CgpVE2AFQDmAVrrxAALO5iFN2RY126.png"}),a(),g,u,A,l(n,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image2/M01/06/8F/CgpVE2AFQE6AJEBXAADLKr84zKo250.png"}),a(),m,l(n,{alt:"Drawing 5.png",src:"https://s0.lgstatic.com/i/image2/M01/06/8D/Cip5yGAFQFaAPfJDAALhBhSRm5k514.png"}),a(),S,l(n,{alt:"Drawing 6.png",src:"https://s0.lgstatic.com/i/image/M00/8E/AC/CgqCHmAFQGOAalPEAAKfjpk2TGQ796.png"}),a(),C,v,l(n,{alt:"Drawing 7.png",src:"https://s0.lgstatic.com/i/image/M00/8E/AC/CgqCHmAFQG6AZtARAAFLIxd18bA584.png"}),a(),P,l(n,{alt:"Drawing 8.png",src:"https://s0.lgstatic.com/i/image2/M01/06/8F/CgpVE2AFQHeADlNcAAEArS4tH6M355.png"}),a(),b,l(n,{alt:"Drawing 9.png",src:"https://s0.lgstatic.com/i/image2/M01/06/8D/Cip5yGAFQIqAX7ykAACYovlO0ak428.png"}),a(),T])}const x=e(c,[["render",f]]);export{j as __pageData,x as default};
