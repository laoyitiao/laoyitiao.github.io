import{_ as l,j as n,o as e,g as r,k as p,h as t,Q as a,s}from"./chunks/framework.a0d18f64.js";const V=JSON.parse('{"title":"17如何向面试官证明你做的系统是高性能的？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/架构设计面试精讲_文档/(6067) 17  如何向面试官证明你做的系统是高性能的？.md","filePath":"posts/backEnd/架构设计面试精讲_文档/(6067) 17  如何向面试官证明你做的系统是高性能的？.md","lastUpdated":1696682708000}'),i={name:"posts/backEnd/架构设计面试精讲_文档/(6067) 17  如何向面试官证明你做的系统是高性能的？.md"},c=a("",10),_=s("p",null,"延迟和吞吐量，是衡量软件系统最常见的两个指标。",-1),g=s("ul",null,[s("li",null,[s("p",null,[s("strong",null,"吞吐量"),t("（系统处理请求的速率）：反映单位时间内处理请求的能力（单位一般是TPS或QPS）。")])]),s("li",null,[s("p",null,[s("strong",null,"延迟"),t("（响应时间）：从客户端发送请求到接收响应的时间（单位一般是ms、s）。")])])],-1),u=s("p",null,[t("一般来说，"),s("strong",null,"延迟和吞吐量既互斥，又不绝对的互斥"),t("，你可以通过性能压测分别绘制吞吐量和延迟的曲线图：")],-1),d=a("",7),h=s("p",null,"，无法反映系统的真实情况。因为耗时 100 s 的请求也许是异常请求，正常请求的平均时间仍是 1 秒，而 TP99 就比较能反映真实情况，因为 TP99 就可以达到 1 秒。",-1),P=s("p",null,'对初中级研发工程师来说，回答"吞吐率、延迟、TP 99（TP 99 比较有代表性）"这三个指标就够了，但如果你应聘高级研发工程师，还要站在系统全链路的角度上思考问题，从端到端的角度思考系统的性能指标（也就是从架构师的视角分析系统）。',-1),T=s("h3",{id:"案例解答",tabindex:"-1"},[t("案例解答 "),s("a",{class:"header-anchor",href:"#案例解答","aria-label":'Permalink to "案例解答"'},"​")],-1),m=s("h4",{id:"用架构师的视角分析系统性能指标",tabindex:"-1"},[t("用架构师的视角分析系统性能指标 "),s("a",{class:"header-anchor",href:"#用架构师的视角分析系统性能指标","aria-label":'Permalink to "用架构师的视角分析系统性能指标"'},"​")],-1),A=s("p",null,"架构师视角说白了就是系统的全链路视角，我们从前端请求流程开始，来讲解一次请求链路会涉及哪些前后端性能指标。",-1),E=a("",32),C=s("h3",{id:"总结",tabindex:"-1"},[t("总结 "),s("a",{class:"header-anchor",href:"#总结","aria-label":'Permalink to "总结"'},"​")],-1),S=s("p",null,"对于怎么评估系统高性能，你可以从系统的吞吐量、延迟以及 TP 99，这三个指标出发回答面试官提出的问题。而对于高级研发工程师，不仅仅要了解后端的性能指标，还有对全链路的性能指标有所了解。",-1),b=s("p",null,"另外，在实际生产环境，还会涉及 CDN 加速、ISP 路由策略、边缘计算等一系列网络工程层面的性能优化指标，这里展开的内容相对较多，你可以自己课下学习。总的来说，你要在大脑里先建立起整个请求的链路蓝图，熟悉每个环节的性能损耗。",-1),q=s("p",null,"今天的作业是：对于我们常用的系统或中间件，你能说出它们的性能指标吗？欢迎在留言区分享你的看法，下一讲我将从架构师的角度分析系统高性能是如何设计的，其中会涉及从产品到架构，从前端到后端具体的性能优化技术。",-1);function y(f,k,D,N,F,I){const o=n("Image");return e(),r("div",null,[c,p(o,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image6/M00/09/8C/CioPOWA2H8qAC-PfAAAEsxBVbwY511.png"}),t(),_,g,u,p(o,{alt:"image (9).png",src:"https://s0.lgstatic.com/i/image6/M00/0A/1F/Cgp9HWA2_ZuAHdfgAAA1WOvYXBI512.png"}),t(),d,p(o,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image6/M01/09/8C/CioPOWA2IE-AQq34AAAFrvhSBV4194.png"}),t(),h,P,T,m,A,p(o,{alt:"image (10).png",src:"https://s0.lgstatic.com/i/image6/M00/0A/1F/Cgp9HWA2_bWARBegAABGgCuF23Q624.png"}),t(),E,p(o,{alt:"图片1.png",src:"https://s0.lgstatic.com/i/image6/M01/0A/1C/CioPOWA2_caAfX8HAADVumEYCPE554.png"}),t(),C,S,b,q])}const B=l(i,[["render",y]]);export{V as __pageData,B as default};
