import{_ as e,j as l,o as t,g as r,k as p,h as a,s,Q as o}from"./chunks/framework.a0d18f64.js";const G=JSON.parse('{"title":"12如何把可视化监控也做得酷炫？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/devops/047_说透性能测试/(6163) 12  如何把可视化监控也做得酷炫？.md","filePath":"posts/devops/047_说透性能测试/(6163) 12  如何把可视化监控也做得酷炫？.md","lastUpdated":1696682708000}'),c={name:"posts/devops/047_说透性能测试/(6163) 12  如何把可视化监控也做得酷炫？.md"},i=s("h1",{id:"_12如何把可视化监控也做得酷炫",tabindex:"-1"},[a("12如何把可视化监控也做得酷炫？ "),s("a",{class:"header-anchor",href:"#_12如何把可视化监控也做得酷炫","aria-label":'Permalink to "12如何把可视化监控也做得酷炫？"'},"​")],-1),d=s("p",null,"前面两讲分别讲解了硬件监控、链路监控以及相关的报警机制。一些同学在学习硬件监控的过程中可以发现，命令行操作反馈迅速及时，指哪儿打哪儿，非常灵活便捷，但并不是所有同学都需要或者都有权限直接在服务器上进行操作。而且很多中大型互联网公司是大型的服务集群，通过命令行去发现每台服务器的问题并不现实，所以很多企业都会采用大屏的图形化监控。在页面上根据自己的需要进行条件筛选，这样不仅简单、清晰、直观，而且能够很方便地向团队成员传递监控的实时信息。",-1),y=s("p",null,"所以作为一位优秀的性能测试工程师，你不仅仅需要掌握命令行监控是如何操作的，也需要了解监控大屏是如何制作的，二者可以说是相互补充的。",-1),E=s("p",null,"这一讲我们就来讲解可视化监控，你可以认为它是一节实操课，需要提前准备好你的服务器环境（推荐 CentOS 7.0），跟着我的步骤一步步进行就可以完成酷炫的监控报表。",-1),g=s("h3",{id:"命令行和图形化界面展示对比",tabindex:"-1"},[a("命令行和图形化界面展示对比 "),s("a",{class:"header-anchor",href:"#命令行和图形化界面展示对比","aria-label":'Permalink to "命令行和图形化界面展示对比"'},"​")],-1),h=s("p",null,"对于初学者而言，你可能并不能从上述文字中感受到命令行和图形化界面展示的区别，那么我用两张图来对比下。",-1),_=s("p",null,"图 1：命令行方式",-1),u=o("",11),m=o("",14),v=o("",17),A=s("p",null,"图 5：Promethues 成功安装示意图",-1),b=s("h4",{id:"第三步是安装-grafana",tabindex:"-1"},[a("第三步是安装 Grafana "),s("a",{class:"header-anchor",href:"#第三步是安装-grafana","aria-label":'Permalink to "第三步是安装 Grafana"'},"​")],-1),x=s("p",null,"这部分第 03 讲已经讲解过，我们就不再赘述，安装完成 Grafana 之后，添加 Prometheus 数据源，测试并保存即可。",-1),f=s("p",null,"图 6：Grafana 添加 Promethues 数据源",-1),F=s("p",null,[a("接着导入官方提供的"),s("strong",null,"展示模板"),a(" 就可以，"),s("a",{href:"https://grafana.com/dashboards/8919",target:"_blank",rel:"noreferrer"},"点击链接"),a("。你可以自行选择相应的版本进行下载，也可以直接填写模板 ID，导入完成之后，便可以看到大屏了，示意图如下：")],-1),C=o("",15),D=o("",5),k=o("",6);function P(q,T,S,B,j,M){const n=l("Image");return t(),r("div",null,[i,d,y,E,g,h,p(n,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image6/M01/02/F0/Cgp9HWAeQEGAH4ObAAIZnEuEI9M121.png"}),a(),_,p(n,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image6/M01/02/F0/Cgp9HWAeQEiAEWf_AAXTN9yw9Y0063.png"}),a(),u,p(n,{alt:"图片2.png",src:"https://s0.lgstatic.com/i/image6/M01/04/6F/Cgp9HWArp46AD24-AABjRPJ8pcA864.png"}),a(),m,p(n,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image6/M01/02/F0/Cgp9HWAeQHCARf2SAAAPsbMo84s659.png"}),a(),v,p(n,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image6/M01/02/ED/CioPOWAeQH2AP6pBAABkNC-TloM735.png"}),a(),A,b,x,p(n,{alt:"Drawing 5.png",src:"https://s0.lgstatic.com/i/image6/M01/02/F0/Cgp9HWAeQIiAJMERAACXSmGUo8w948.png"}),a(),f,F,p(n,{alt:"Drawing 6.png",src:"https://s0.lgstatic.com/i/image6/M01/02/ED/CioPOWAeQJOAU5eUAAOCvFyaK3E786.png"}),a(),C,p(n,{alt:"Drawing 7.png",src:"https://s0.lgstatic.com/i/image6/M01/02/ED/CioPOWAeQKGAUMGKAAAem_X3hX0515.png"}),a(),D,p(n,{alt:"Drawing 8.png",src:"https://s0.lgstatic.com/i/image6/M01/02/F0/Cgp9HWAeQMKAP1owAAJD8a1CZnw412.png"}),a(),k])}const I=e(c,[["render",P]]);export{G as __pageData,I as default};
