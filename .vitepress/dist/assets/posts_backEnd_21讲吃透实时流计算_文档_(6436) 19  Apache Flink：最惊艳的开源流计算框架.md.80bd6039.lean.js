import{_ as p,j as t,o as e,g as r,k as o,h as s,Q as l,s as a}from"./chunks/framework.cfb14fe0.js";const f=JSON.parse('{"title":"19ApacheFlink：最惊艳的开源流计算框架","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/21讲吃透实时流计算_文档/(6436) 19  Apache Flink：最惊艳的开源流计算框架.md","filePath":"posts/backEnd/21讲吃透实时流计算_文档/(6436) 19  Apache Flink：最惊艳的开源流计算框架.md","lastUpdated":1696682708000}'),c={name:"posts/backEnd/21讲吃透实时流计算_文档/(6436) 19  Apache Flink：最惊艳的开源流计算框架.md"},i=l("",9),E=a("p",null,[s("可以看出，Flink 可以部署在诸如 Yarn、Mesos 和 K8S 等分布式资源管理器上。其整体架构与 Storm 和 Spark Streaming 等分布式流计算框架类似，但与这些流计算框架不同的是，"),a("strong",null,"Flink 明确地把状态管理（尤其是流信息状态管理）纳入到了其系统架构中"),s("。")],-1),y=a("p",null,"在 Flink 计算节点执行任务的过程中，可以将状态保存到本地。通过 checkpoint 机制，再配合诸如 HDFS、S3 和 NFS 这样的分布式文件系统，Flink 在不降低性能的同时，实现了状态的分布式管理。",-1),d=a("h3",{id:"流的描述",tabindex:"-1"},[s("流的描述 "),a("a",{class:"header-anchor",href:"#流的描述","aria-label":'Permalink to "流的描述"'},"​")],-1),F=a("p",null,"接下来，我们再来看看在 Flink 中如何描述一个流计算过程。下面的图 2 展示了 Flink 用于描述流计算过程的 DAG 组成。",-1),u=l("",49),k=l("",8);function h(m,g,S,_,C,A){const n=t("Image");return e(),r("div",null,[i,o(n,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image6/M01/27/A9/CioPOWBdgJuAFv9cAAMbscARMZA482.png"}),s(),E,y,d,F,o(n,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image6/M01/27/A9/CioPOWBdgKiAVR1QAANcMDm_ZVg804.png"}),s(),u,o(n,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image6/M01/27/A9/CioPOWBdgRKAGRhrAAEdy_HlR50807.png"}),s(),k,o(n,{alt:"Drawing 5.png",src:"https://s0.lgstatic.com/i/image6/M01/27/AC/Cgp9HWBdgSCAbnm5ABGgDbOk8_w551.png"})])}const q=p(c,[["render",h]]);export{f as __pageData,q as default};
