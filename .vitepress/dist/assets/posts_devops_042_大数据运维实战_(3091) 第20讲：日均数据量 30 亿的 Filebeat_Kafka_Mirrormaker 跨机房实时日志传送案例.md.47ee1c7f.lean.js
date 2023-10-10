import{_ as o,j as e,o as r,g as t,k as l,h as a,Q as p,s}from"./chunks/framework.cfb14fe0.js";const C=JSON.parse('{"title":"第20讲：日均数据量30亿的Filebeat+Kafka+Mirrormaker跨机房实时日志传送案例","description":"","frontmatter":{},"headers":[],"relativePath":"posts/devops/042_大数据运维实战/(3091) 第20讲：日均数据量 30 亿的 Filebeat+Kafka+Mirrormaker 跨机房实时日志传送案例.md","filePath":"posts/devops/042_大数据运维实战/(3091) 第20讲：日均数据量 30 亿的 Filebeat+Kafka+Mirrormaker 跨机房实时日志传送案例.md","lastUpdated":1696682708000}'),c={name:"posts/devops/042_大数据运维实战/(3091) 第20讲：日均数据量 30 亿的 Filebeat+Kafka+Mirrormaker 跨机房实时日志传送案例.md"},i=p("",11),y=s("p",null,"从图中可以看出，MirrorMaker 位于源 Kafka 集群和目标 Kafka 集群之间，MirrorMaker 从源 Kafka 集群消费数据，此时 MirrorMaker 是一个 Consumer；接着，Kafka 将消费过来的数据直接通过网络传输到目标的 Kafka 集群中，此时 MirrorMaker 是一个 Producer。在实际的使用中，源 Kafka 集群和目标 Kafka 集群可以在不同的网络中，也可以跨广域网，此时的 MirrorMaker 就是一个 Kafka 集群的镜像，实现了数据的实时同步和异地备份。",-1),E=s("p",null,"在实际的使用中，MirrorMaker 可以和目标 Kafka 集群运行在一起，也可以将 MirrorMaker 单独运行在一个独立的机器上。根据我们的使用经验，MirrorMaker 单独运行在一台机器上性能更加稳定。",-1),k=s("h3",{id:"实时日志传输架构",tabindex:"-1"},[a("实时日志传输架构 "),s("a",{class:"header-anchor",href:"#实时日志传输架构","aria-label":'Permalink to "实时日志传输架构"'},"​")],-1),u=s("p",null,"上面提到了 Filebeat 加双 Kafka 集群，然后通过 Kafka MirrorMaker 在两个 Kafka 集群之间同步数据的应用架构。我们的 App 服务器有 20 台，每台都安装 Filebeat，然后指定要收集的日志，而两个 Kafka 集群，都采用 6 个节点构建，MirrorMaker 分布式部署在 3 个节点上。整个实时日志传输架构如下图所示：",-1),f=p("",27),m=p("",9);function d(F,A,D,g,h,_){const n=e("Image");return r(),t("div",null,[i,l(n,{alt:"6.png",src:"https://s0.lgstatic.com/i/image/M00/2B/C8/Ciqc1F7-_leALHMZAADu46coWFk590.png"}),a(),y,E,k,u,l(n,{alt:"7.png",src:"https://s0.lgstatic.com/i/image/M00/2B/C8/Ciqc1F7-_mOAV8jJAAI6p1ez7Zc179.png"}),a(),f,l(n,{alt:"8.png",src:"https://s0.lgstatic.com/i/image/M00/2B/C8/Ciqc1F7-_pKAF4RAAABpI2OKlhc572.png"}),a(),m])}const M=o(c,[["render",d]]);export{C as __pageData,M as default};
