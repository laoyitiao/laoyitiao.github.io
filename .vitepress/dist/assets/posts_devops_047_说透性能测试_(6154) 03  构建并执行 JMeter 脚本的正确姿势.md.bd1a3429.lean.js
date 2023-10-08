import{_ as e,j as o,o as t,g as r,k as l,h as a,Q as p,s}from"./chunks/framework.4e7d56ce.js";const z=JSON.parse('{"title":"03构建并执行JMeter脚本的正确姿势","description":"","frontmatter":{},"headers":[],"relativePath":"posts/devops/047_说透性能测试/(6154) 03  构建并执行 JMeter 脚本的正确姿势.md","filePath":"posts/devops/047_说透性能测试/(6154) 03  构建并执行 JMeter 脚本的正确姿势.md","lastUpdated":1696682708000}'),c={name:"posts/devops/047_说透性能测试/(6154) 03  构建并执行 JMeter 脚本的正确姿势.md"},i=p("",9),E=p("",17),y=p("",14),_=p("",6),d=p("",4),h=s("p",null,"图 5：报错信息",-1),g=s("p",null,"客户端的日志只是我们需要关注的点之一，排查错误的根因还需要结合服务端的报错日志，一般来说服务端的报错日志都有相关的平台记录和查询，比较原始的方式也可以根据服务器的路径找相关日志。",-1),u=s("p",null,[a("我们再来看第二个问题："),s("strong",null,"看不到综合场景下的每个接口的实时处理能力"),a("。")],-1),f=s("p",null,"我个人认为原生的实时查看结果是有些鸡肋的，如果想实时且直观地看到每个接口的处理能力，我比较推荐 JMeter+InfluxDB+Grafana 的方式，基本流程如下图所示：",-1),m=p("",13),A=s("p",null,"图 7：添加 Backkend Listenner",-1),D=s("p",null,"（2）Backend Listener implementation 中选择第二项（如下图所示）。",-1),b=s("p",null,"图 8：Backend Listener implementation",-1),x=s("p",null,[a('（3）配置 InfluxDB URL，示例"'),s("a",{href:"http://127.0.0.1:8086/write?db=jmeter",target:"_blank",rel:"noreferrer"},"http://127.0.0.1:8086/write?db=jmeter"),a('"；IP 为实际 InfluxDB 地址的 IP，DB 的值是 InfluxDB 中创建的库名字（如下图所示）。')],-1),q=p("",9),C=s("p",null,"图 10：Grafana 界面",-1),F=s("h4",{id:"数据源配置",tabindex:"-1"},[a("数据源配置 "),s("a",{class:"header-anchor",href:"#数据源配置","aria-label":'Permalink to "数据源配置"'},"​")],-1),I=s("p",null,"为什么要配置数据源呢，简单来说就是 Grafana 需要获取数据去展示，数据源的配置就是告诉你去哪里找数据，配置安装的 InfluxDB 地址和端口号，如下图所示：",-1),T=s("p",null,"图 11：配置地址和端口号",-1),B=s("p",null,"然后输入 InfluxDB 中写入的数据库名字，如下图所示：",-1),v=s("p",null,"图 12：数据库名字",-1),k=s("p",null,"输入完成之后可以 Save & Test，如出现以下示意图即配置成功：",-1),M=s("p",null,"图 13：配置成功",-1),G=s("h4",{id:"导入-jmeter-模板",tabindex:"-1"},[a("导入 JMeter 模板 "),s("a",{class:"header-anchor",href:"#导入-jmeter-模板","aria-label":'Permalink to "导入 JMeter 模板"'},"​")],-1),P=s("p",null,[a("为了达到更好的展示效果，Grafana 官网提供了针对性的展示模版。先下载 "),s("a",{href:"HTTPS://Grafana.com/Grafana/dashboards?search=InfluxDB",target:"_blank",rel:"noreferrer"},"JMeter 模板"),a("，然后再导入 Grafana。")],-1),S=s("p",null,"图 14：导入 JMeter 模板",-1),w=s("p",null,"配置完成后，运行 JMeter 脚本。如果在界面右上方下拉选择 5s，则每 5s 更新一次：",-1),J=s("p",null,"图 15：运行 JMeter 脚本",-1),j=s("p",null,"如上图便是完成了实时压测情况下运行结果的实时展示图，你可以以此为基础，进行多接口的数据采集，相应增加脚本里的 Backend Listener 插件，区分不同的 application name 名称，你会看到不同的接口数据都进入 influxdb 数据库中。并且 Grafana 从 Edit 中进入， 你可以根据不同的 application name 修改 SQL 来区分展示。",-1),V=s("p",null,"图 16：编辑 Grafana",-1),R=s("h3",{id:"总结",tabindex:"-1"},[a("总结 "),s("a",{class:"header-anchor",href:"#总结","aria-label":'Permalink to "总结"'},"​")],-1),N=s("p",null,"这一讲我们主要介绍了构建和执行性能测试脚本时的一些注意事项，总结了目前业内使用 JMeter 常见的方法。你不仅需要知道这些常见的手段，也需要知道为什么要这么做，这么做有什么好处，同样随着实际采集数据指标的增高，这些做法可能还会存在哪些缺陷或者注意点，如果上述内容你都能考虑清楚了，相信你也就掌握工具了。",-1),H=s("p",null,"以上我讲到的内容，希望你可以动手实践，也许你在实践的过程中会踩一些坑，不过没关系，欢迎来评论区交流，我会和你分享我的经验和见解。",-1),U=s("p",null,"下一讲我带你走进 JMeter 的二次开发，它其实并没有你想象中那么难，到时见！",-1);function L(O,Y,X,$,K,Q){const n=o("Image");return t(),r("div",null,[i,l(n,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image/M00/8D/6D/CgqCHl_-p9GABuguAABBUSnBL1I633.png"}),a(),E,l(n,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image/M00/8D/6D/CgqCHl_-p-SAVYK0AAGf14hnG0w748.png"}),a(),y,l(n,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image/M00/8D/6D/CgqCHl_-p_GATU1yAACmJ7JsOJs941.png"}),a(),_,l(n,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image/M00/8D/6D/CgqCHl_-p_yAeoEUAACugfrmrq0387.png"}),a(),d,l(n,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image2/M01/05/48/Cip5yF_-qAaAX8ChAADQYOI-pf0391.png"}),a(),h,g,u,f,l(n,{alt:"Lark20210113-183606.png",src:"https://s0.lgstatic.com/i/image/M00/8D/73/CgqCHl_-zTuAMf2DAABpdYPtYUw826.png"}),a(),m,l(n,{alt:"Drawing 6.png",src:"https://s0.lgstatic.com/i/image2/M01/05/48/Cip5yF_-qB6AfHs5AAC0sfc1PXk340.png"}),a(),A,D,l(n,{alt:"Drawing 7.png",src:"https://s0.lgstatic.com/i/image2/M01/05/48/Cip5yF_-qCeAbgnDAABvAV5R0ZE972.png"}),a(),b,x,l(n,{alt:"Drawing 8.png",src:"https://s0.lgstatic.com/i/image2/M01/05/48/Cip5yF_-qC6AJwqYAADAf5IPUoI636.png"}),a(),q,l(n,{alt:"Drawing 9.png",src:"https://s0.lgstatic.com/i/image2/M01/05/48/Cip5yF_-qD2AKS4tAAB2Nrw_SqU315.png"}),a(),C,F,I,l(n,{alt:"Drawing 10.png",src:"https://s0.lgstatic.com/i/image2/M01/05/48/Cip5yF_-qEWADsLAAAA3aGGImVo621.png"}),a(),T,B,l(n,{alt:"Drawing 11.png",src:"https://s0.lgstatic.com/i/image2/M01/05/48/Cip5yF_-qFCABo-uAABwZqAxu-0952.png"}),a(),v,k,l(n,{alt:"Drawing 12.png",src:"https://s0.lgstatic.com/i/image2/M01/05/4A/CgpVE1_-qFeAUOatAAA-H-XTdm0808.png"}),a(),M,G,P,l(n,{alt:"Drawing 13.png",src:"https://s0.lgstatic.com/i/image/M00/8D/6D/CgqCHl_-qGCAG68rAABPyrMBy0M066.png"}),a(),S,w,l(n,{alt:"Drawing 14.png",src:"https://s0.lgstatic.com/i/image/M00/8D/62/Ciqc1F_-qGiAX-znAAD8972KlRs589.png"}),a(),J,j,l(n,{alt:"Drawing 15.png",src:"https://s0.lgstatic.com/i/image/M00/8D/6D/CgqCHl_-qHCABegiAAAtFFIYLCc365.png"}),a(),V,R,N,H,U])}const Z=e(c,[["render",L]]);export{z as __pageData,Z as default};
