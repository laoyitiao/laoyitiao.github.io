import{_ as o,j as e,o as r,g as t,k as l,h as a,Q as n,s}from"./chunks/framework.4e7d56ce.js";const P=JSON.parse('{"title":"第13讲：SparkStandalone模式的构建以及Spark与Yarn的整合","description":"","frontmatter":{},"headers":[],"relativePath":"posts/devops/042_大数据运维实战/(3084) 第13讲：Spark Standalone 模式的构建以及 Spark 与 Yarn 的整合.md","filePath":"posts/devops/042_大数据运维实战/(3084) 第13讲：Spark Standalone 模式的构建以及 Spark 与 Yarn 的整合.md","lastUpdated":1696682708000}'),c={name:"posts/devops/042_大数据运维实战/(3084) 第13讲：Spark Standalone 模式的构建以及 Spark 与 Yarn 的整合.md"},E=n("",5),y=n("",58),i=n("",19),d=n("",22),k=n("",7),F=s("p",null,'从上图可以看到，master 选择了"worker-20200601142643-172.16.213.138-33869"这个节点来运行 driver 程序，点开这个节点连接，页面拉到最后，如下图所示：',-1),h=s("p",null,"上图显示的是已经完成的 driver 程序，查看第一个 driver，点开 Logs 列下面的 stdout 链接，如下图所示，这就是上面命令的执行结果。",-1),u=s("p",null,"下面分析下完全集群模式下，Spark 任务的执行过程，叙述如下：",-1),C=s("ul",null,[s("li",null,"任务提交后，此客户端（slave002）会生成一个 SparkSubmit 进程，此进程会在应用程序提交给集群之后就退出；"),s("li",null,"Master 会在集群中选择一个 Worker 节点生成一个子进程 DriverWrapper 来启动 driver 程序，该 DriverWrapper 进程会占用 Worker 节点的一个 core；"),s("li",null,"driver 程序运行起来后，就会在其他 work 节点启动 CoarseGrainedExecutorBackend 进程，此进程用来创建和维护 Executor，CoarseGrainedExecutorBackend 和 Executor 是一对一的关系；"),s("li",null,"Executor创建起来后，就开始处理 Task 对象，Executor 内部通过线程池的方式来完成 Task 的计算；"),s("li",null,"所有任务执行完成，CoarseGrainedExecutorBackend 进程自动退出。")],-1),g=s("h3",{id:"总结",tabindex:"-1"},[a("总结 "),s("a",{class:"header-anchor",href:"#总结","aria-label":'Permalink to "总结"'},"​")],-1),S=s("p",null,"本课时主要讲解了 Spark 独立集群的部署以及 spark-sql、spark-shell 和 Spark-Submit 的使用，最后还分析了每种使用方式在 Spark 内部的执行流程，了解这些内部执行流程，对于故障排除和性能调优非常重要。",-1);function A(v,m,_,b,x,D){const p=e("Image");return r(),t("div",null,[E,l(p,{alt:"1.png",src:"https://s0.lgstatic.com/i/image/M00/1B/14/Ciqc1F7eFeyAVscGAAHpX-ShiyY637.png"}),a(),y,l(p,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image/M00/1B/13/CgqCHl7eCEWAIQYkAAF6TniV8_Y016.png"}),a(),i,l(p,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image/M00/1B/08/Ciqc1F7eCKCAJB2VAAGkrRokxa8933.png"}),a(),d,l(p,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image/M00/1B/08/Ciqc1F7eCPaAYt3xAAGOaN-9t_k453.png"}),a(),k,l(p,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image/M00/1B/08/Ciqc1F7eCRWAExIQAAH3sX9VMy8453.png"}),a(),F,l(p,{alt:"Drawing 5.png",src:"https://s0.lgstatic.com/i/image/M00/1B/08/Ciqc1F7eCS2ACYQ7AADtGJZDP44063.png"}),a(),h,l(p,{alt:"Drawing 6.png",src:"https://s0.lgstatic.com/i/image/M00/1B/14/CgqCHl7eCSaAeDFsAACjualC02g847.png"}),a(),u,C,g,S])}const R=o(c,[["render",A]]);export{P as __pageData,R as default};
