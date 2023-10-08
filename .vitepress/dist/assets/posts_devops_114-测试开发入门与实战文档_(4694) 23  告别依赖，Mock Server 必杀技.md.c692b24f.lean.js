import{_ as l,j as e,o as t,g as r,k as n,h as o,s,Q as p}from"./chunks/framework.4e7d56ce.js";const w=JSON.parse('{"title":"23告别依赖，MockServer必杀技","description":"","frontmatter":{},"headers":[],"relativePath":"posts/devops/114-测试开发入门与实战文档/(4694) 23  告别依赖，Mock Server 必杀技.md","filePath":"posts/devops/114-测试开发入门与实战文档/(4694) 23  告别依赖，Mock Server 必杀技.md","lastUpdated":1696682708000}'),c={name:"posts/devops/114-测试开发入门与实战文档/(4694) 23  告别依赖，Mock Server 必杀技.md"},y=s("h1",{id:"_23告别依赖-mockserver必杀技",tabindex:"-1"},[o("23告别依赖，MockServer必杀技 "),s("a",{class:"header-anchor",href:"#_23告别依赖-mockserver必杀技","aria-label":'Permalink to "23告别依赖，MockServer必杀技"'},"​")],-1),i=s("p",null,"在上一课时，我们详细了解了微服务下的测试分层实践，也讲解了微服务给测试带来的挑战。你会发现，其中最重要的一条挑战，便是微服务独立开发、独立部署这一特性。由于各个微服务都是独立开发和部署，增大了微服务联调测试时的难度。",-1),E=s("p",null,[o("在实践中，大部分微服务被拆分到不同的小型开发和测试团队。而各个团队由于各自的KPI导向不同，势必会产生对同一个Task， 两个团队设定有不同的优先级。这样就导致了"),s("strong",null,"开发节奏不一致， 联调测试变得更加困难了"),o("。")],-1),u=s("p",null,[o("那么，对于相互有依赖的微服务，当我方已经接近完成，而对方尚未开始或仍在进行的情况下，我方该如何进行测试就成了一个不得不解决的问题。"),s("strong",null,"这也是本讲我们要解决的问题：如何搭建 Mock Server 破除环境依赖。")],-1),k=s("p",null,"下图是本讲的知识脑图，可供你学习参考。",-1),h=p("",22),d=s("p",null,'（2）在弹出来的"Create New"选项中点击 Mock Server 。',-1),v=s("p",null,'（3）Postman支持"Create a new API"或者"Use collection from this workspace"两种方式来创建 Mock Server。',-1),g=s("p",null,'简单起见，我们选择"Create a new API"。在下图中我们选择请求方法，可以是 GET、POST、UPDATE，也可以是 DELETE，也就是我们常说的增删查改。然后输入请求路径，需要返回的 HTTP 响应码，以及响应的 Body，可以模拟多个 API 接口。全部设置好后点击下一步。',-1),F=s("p",null,"（4）然后，你将看到下图 4 个需要配置的地方。",-1),q=s("ul",null,[s("li",null,[s("p",null,"输入 Mock Server 的名称。")]),s("li",null,[s("p",null,"选择一个环境（可选），通常我们的测试环境有好几个，你可以配置使用不同的测试环境。")]),s("li",null,[s("p",null,"是否要将 Mock Server 设为私有。")]),s("li",null,[s("p",null,"是否将 Mock Server 的 URL 保存为环境变量。")])],-1),_=s("p",null,"等你都配置好后，单击下一步继续。",-1),m=s("p",null,"（5）当你看到如下界面，说明配置成功。此时你的简易版 Mock Server 就生成了。记录下生成的 URL，然后在你的测试中调用相应的 URL 地址即可。",-1),M=p("",12),S=p("",35);function C(A,D,b,T,P,B){const a=e("Image");return t(),r("div",null,[y,i,E,u,k,n(a,{alt:"图片1.png",src:"https://s0.lgstatic.com/i/image/M00/71/5D/Ciqc1F--FzGAXZ6WAAMdoZK9qV4023.png"}),o(),h,n(a,{alt:"图片2.png",src:"https://s0.lgstatic.com/i/image/M00/71/68/CgqCHl--Fx6ARgtQAAJ9oo1jikM473.png"}),o(),d,n(a,{alt:"图片3.png",src:"https://s0.lgstatic.com/i/image/M00/71/5D/Ciqc1F--FzyAMKe3AAJtlj-EnM4677.png"}),o(),v,g,n(a,{alt:"图片4.png",src:"https://s0.lgstatic.com/i/image/M00/71/69/CgqCHl--F0WATe6SAAIT0U9K5xI725.png"}),o(),F,n(a,{alt:"图片5.png",src:"https://s0.lgstatic.com/i/image/M00/71/5D/Ciqc1F--F02AUHoXAAI1JkHHCBM654.png"}),o(),q,_,m,n(a,{alt:"图片6.png",src:"https://s0.lgstatic.com/i/image/M00/71/5D/Ciqc1F--F1WAG2HEAAIVgTJq3fU557.png"}),o(),M,n(a,{alt:"Drawing 5.png",src:"https://s0.lgstatic.com/i/image/M00/70/B7/CgqCHl-7kfKAPZUaAAG9yxU5oGo024.png"}),o(),S])}const I=l(c,[["render",C]]);export{w as __pageData,I as default};
