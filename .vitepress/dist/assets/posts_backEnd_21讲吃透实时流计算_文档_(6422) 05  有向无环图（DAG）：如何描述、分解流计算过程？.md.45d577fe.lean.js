import{_ as o,j as e,o as t,g as c,k as l,h as a,Q as p,s}from"./chunks/framework.4e7d56ce.js";const L=JSON.parse('{"title":"05有向无环图（DAG）：如何描述、分解流计算过程？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/21讲吃透实时流计算_文档/(6422) 05  有向无环图（DAG）：如何描述、分解流计算过程？.md","filePath":"posts/backEnd/21讲吃透实时流计算_文档/(6422) 05  有向无环图（DAG）：如何描述、分解流计算过程？.md","lastUpdated":1696682708000}'),r={name:"posts/backEnd/21讲吃透实时流计算_文档/(6422) 05  有向无环图（DAG）：如何描述、分解流计算过程？.md"},E=p("",8),y=s("p",null,"我们可以看到，Spark 是这样将 DAG 解析为最终执行的任务的。首先，DAG 被分解成一系列有依赖关系的并行计算任务集合。然后，这些任务集合被提交到 Spark 集群，再由分配的线程，执行具体的每一个任务。",-1),i=s("p",null,[a("看完 Spark，我们再来看另外一个最近更加火爆的流计算框架 Flink。在 Flink中，我们是采用了 JobGraph 这个概念，来描述流计算的过程的。下图 2 是 Flink 将 JobGraph 分解为运行时的任务的过程，这幅图来自 "),s("a",{href:"https://ci.apache.org/projects/flink/flink-docs-stable/internals/job_scheduling.html",target:"_blank",rel:"noreferrer"},"Flink 的官方文档"),a("。")],-1),u=s("p",null,"我们很容易看出，左边的 JobGraph 不就是 DAG 有向无环图嘛！其中 JobVertex A 到 JobVertex D，以及表示它们之间依赖关系的有向线段，共同构成了 DAG 有向无环图。这个 DAG 被分解成右边一个个并行且有依赖关系的计算节点，这相当于原始 DAG 的并行化版本。之后在运行时，就是按照这个并行化版本的 DAG 分配线程并执行计算任务。",-1),A=s("blockquote",null,[s("p",null,"上面介绍的两种流计算框架具体是怎样解析 DAG 的，在本课时你可以暂时不必关心这些细节，只需要知道业界一般都是采用 DAG 来描述流计算过程即可。像其他的一些开源流计算框架，比如 Storm 和 Samza 也有类似的 DAG 概念，这里因为篇幅原因就不一一详细讲解了。")],-1),F=s("p",null,"综合这些实例我们可以看出，在业界大家通常都是用 DAG 来描述流计算过程的。",-1),g=s("h3",{id:"用-dag-描述流计算过程",tabindex:"-1"},[a("用 DAG 描述流计算过程 "),s("a",{class:"header-anchor",href:"#用-dag-描述流计算过程","aria-label":'Permalink to "用 DAG 描述流计算过程"'},"​")],-1),d=s("p",null,"所以，接下来我们实现自己的流计算框架，也同样采用了 DAG（有向无环图）来描述流的执行过程。如下图 3 所示。",-1),D=p("",7),_=s("p",null,'在上面的图 4 中，假设风控事件先是存放在 Kafka 消息队列里。现在，我们先用两个"接收"节点，将消息从 Kafka 中拉取出来。然后，发送给一个"解码"节点，将事件反序列化为 JSON 对象。接下来，根据风控模型定义的特征向量，将这个 JSON 对象进行"特征分解"为需要并行执行的"特征计算"任务。当所有"特征计算"完成后，再将所有结果"聚合"起来，这样就构成了完整的特征向量。最后，我们就可以将包含了特征向量的事件，"输出"到下游的风险评分模块。',-1),h=s("p",null,"很显然，这里我们采用的是前面所说的第二种 DAG 含义，即并行化的 DAG。",-1),b=s("p",null,"接下来，我们就需要看具体如何，实现这个并行化的 DAG 。看着图 4 这个 DAG，我们很容易想到，可以给每个节点分配一个线程，来执行具体的计算任务。而在节点之间，就用队列（Queue） ，来作为线程之间传递数据的载体。",-1),m=s("p",null,"具体而言，就是类似于下图 5 所描述的过程。一组线程从其输入队列中取出数据进行处理，然后输出给下游的输入队列，供下游的线程继续读取并处理。",-1),f=p("",36),v=s("p",null,[s("a",{href:"https://github.com/alain898/realtime_stream_computing_course",target:"_blank",rel:"noreferrer"},"点击此链接查看本课程所有课时的源码")],-1),S=s("hr",null,null,-1),k=s("p",null,"[",-1),O=s("p",null,[a("]("),s("a",{href:"https://kaiwu.lagou.com/data_enhancement.html?utm_source=lagouedu&utm_medium=zhuanlan&utm_campaign=%E5%A4%A7%E6%95%B0%E6%8D%AE%E5%BC%80%E5%8F%91%E9%AB%98%E8%96%AA%E8%AE%AD%E7%BB%83%E8%90%A5#/index",target:"_blank",rel:"noreferrer"},"https://kaiwu.lagou.com/data_enhancement.html?utm_source=lagouedu&utm_medium=zhuanlan&utm_campaign=大数据开发高薪训练营#/index"),a(")"),s("br"),s("a",{href:"https://kaiwu.lagou.com/data_enhancement.html?utm_source=lagouedu&utm_medium=zhuanlan&utm_campaign=%E5%A4%A7%E6%95%B0%E6%8D%AE%E5%BC%80%E5%8F%91%E9%AB%98%E8%96%AA%E8%AE%AD%E7%BB%83%E8%90%A5#/index",target:"_blank",rel:"noreferrer"},"PB 级企业大数据项目实战 + 拉勾硬核内推，5 个月全面掌握大数据核心技能。点击链接，全面赋能！")],-1);function C(B,q,G,J,N,j){const n=e("Image");return t(),c("div",null,[E,l(n,{alt:"image.png",src:"https://s0.lgstatic.com/i/image6/M00/02/2F/Cgp9HWAc--2AD29fAAOC1fcCvJs949.png"}),a(),y,i,l(n,{alt:"image (1).png",src:"https://s0.lgstatic.com/i/image6/M00/02/2F/Cgp9HWAc-_mAEvHbAANW6uPlqnY883.png"}),a(),u,A,F,g,d,l(n,{alt:"image (2).png",src:"https://s0.lgstatic.com/i/image6/M00/02/2D/CioPOWAc_AOAHrYbAAFx54c59dg877.png"}),a(),D,l(n,{alt:"image (3).png",src:"https://s0.lgstatic.com/i/image6/M00/02/2D/CioPOWAc_A2AfzRxAAG1wSYqV_w448.png"}),a(),_,h,b,m,l(n,{alt:"image (4).png",src:"https://s0.lgstatic.com/i/image6/M00/02/30/Cgp9HWAc_BmAAbMoAAFM6I1NDu8273.png"}),a(),f,l(n,{alt:"image (5).png",src:"https://s0.lgstatic.com/i/image6/M01/02/30/Cgp9HWAc_D2AH5D7AANT7LSD3VY713.png"}),a(),v,S,k,l(n,{alt:"image (3).png",src:"https://s0.lgstatic.com/i/image2/M01/0C/98/CgpVE2AZCKKAa8TbAAUCrlmIuEw611.png"}),a(),O])}const T=o(r,[["render",C]]);export{L as __pageData,T as default};
