import{_ as p,j as e,o as t,g as r,k as n,h as s,Q as o,s as l}from"./chunks/framework.a0d18f64.js";const q=JSON.parse('{"title":"第15讲：FlinkStandalone、FlinkonYarn集群构建与应用场景","description":"","frontmatter":{},"headers":[],"relativePath":"posts/devops/042_大数据运维实战/(3086) 第15讲：Flink Standalone、Flink on Yarn 集群构建与应用场景.md","filePath":"posts/devops/042_大数据运维实战/(3086) 第15讲：Flink Standalone、Flink on Yarn 集群构建与应用场景.md","lastUpdated":1696682708000}'),c={name:"posts/devops/042_大数据运维实战/(3086) 第15讲：Flink Standalone、Flink on Yarn 集群构建与应用场景.md"},i=o("",8),y=o("",52),E=o("",4),d=o("",8),k=o("",6),h=l("p",null,"此种模式下创建的 Flink 集群会独占资源，不管有没有 Flink 任务在执行，Yarn 上面的其他任务都无法共享使用这些资源。",-1),g=l("p",null,"（2）Per-Job-Cluster 模式",-1),F=l("p",null,"此模式每次提交 Flink 任务，都会创建一个新的 Flink 集群，每个 Flink 任务之间相互独立、互不影响，管理方便。大致原理如下图所示：",-1),u=o("",22),b=l("p",null,"这里提示在 slave001.cloud 启动了一个 web httpd 36873 端口。还可以看到，由于这个 job 是放到后台运行的，所以，最后还给出了几个提示，告诉我们，怎么关闭这个 job，如果要关闭，推荐使用 yarn shell 命令关闭。",-1),m=l("p",null,"根据上图的提示，通过访问 36873 端口，可以打开 yarn 一个内嵌的 Flink 的 Dashboard，如下图所示：",-1),A=l("p",null,"我们可以通过访问此页面来查看 Flink 任务的运行状态。此时，在 Yarn 的 8080 端口界面下，也可以发现有任务运行，如下图所示：",-1),v=o("",3),D=o("",9),_=l("p",null,"在 Pre-Job-Cluster 模式下，Flink 任务名称变成了 Flink pre-Job Cluster，此任务运行结束后，任务自动退出，占用资源自动释放。",-1),f=l("h3",{id:"总结",tabindex:"-1"},[s("总结 "),l("a",{class:"header-anchor",href:"#总结","aria-label":'Permalink to "总结"'},"​")],-1),C=l("p",null,"本课时主要讲述了 Flink 的应用架构、独立集群的使用以及 Flink on Yarn 模式的使用，其中，Flink on Yarn 模式的使用是本课时讲述的重点，在企业实际应用中，都是以 Yarn 来作为统一的资源管理器，在大数据快速发展和应用的今天，你应该尝试下 Flink 给企业带来的便利和高效。",-1);function j(T,S,M,B,P,Y){const a=e("Image");return t(),r("div",null,[i,n(a,{alt:"image",src:"https://s0.lgstatic.com/i/image/M00/1F/C5/CgqCHl7nNd6AMeXKAAGBwtm077A086.png"}),s(),y,n(a,{alt:"image",src:"https://s0.lgstatic.com/i/image/M00/1F/B5/Ciqc1F7nMn-AUBcpAAEP4EaKlKU780.png"}),s(),E,n(a,{alt:"image",src:"https://s0.lgstatic.com/i/image/M00/1F/B5/Ciqc1F7nMouAbehBAACn_Db-PK0368.png"}),s(),d,n(a,{alt:"image",src:"https://s0.lgstatic.com/i/image/M00/1F/C5/CgqCHl7nNf2ATZpjAALuXapYD0o199.png"}),s(),k,n(a,{alt:"image",src:"https://s0.lgstatic.com/i/image/M00/1F/B9/Ciqc1F7nNgmARH9kAACweKT2y6U225.png"}),s(),h,g,F,n(a,{alt:"image",src:"https://s0.lgstatic.com/i/image/M00/1F/C5/CgqCHl7nNhCAJXT0AADT0HW3bSs714.png"}),s(),u,n(a,{alt:"image",src:"https://s0.lgstatic.com/i/image/M00/1F/B6/Ciqc1F7nMvOAFceWAAB-hvMtNfA437.png"}),s(),b,m,n(a,{alt:"image",src:"https://s0.lgstatic.com/i/image/M00/1F/C1/CgqCHl7nMvyAU3XjAADFzBu0bTU689.png"}),s(),A,n(a,{alt:"image",src:"https://s0.lgstatic.com/i/image/M00/1F/C1/CgqCHl7nMwSASX5OAACTLV3fx_Q143.png"}),s(),v,n(a,{alt:"image",src:"https://s0.lgstatic.com/i/image/M00/1F/C2/CgqCHl7nMw-AAM2oAADY6YPrTFk158.png"}),s(),D,n(a,{alt:"image",src:"https://s0.lgstatic.com/i/image/M00/1F/B6/Ciqc1F7nMyOAArfaAABNBvmrEKc414.png"}),s(),_,f,C])}const H=p(c,[["render",j]]);export{q as __pageData,H as default};
