import{_ as d,j as l,o as r,g as o,k as i,h as s,Q as t,s as e}from"./chunks/framework.cfb14fe0.js";const y=JSON.parse('{"title":"第16讲：常用的缓存组件Redi是如何运行的？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/300分钟吃透分布式缓存_文档/(175) 第16讲：常用的缓存组件Redi是如何运行的？.md","filePath":"posts/backEnd/300分钟吃透分布式缓存_文档/(175) 第16讲：常用的缓存组件Redi是如何运行的？.md","lastUpdated":1696682708000}'),p={name:"posts/backEnd/300分钟吃透分布式缓存_文档/(175) 第16讲：常用的缓存组件Redi是如何运行的？.md"},_=t("",17),R=t("",8),c=e("p",null,"主进程中，除了主线程处理网络 IO 和命令操作外，还有 3 个辅助 BIO 线程。这 3 个 BIO 线程分别负责处理，文件关闭、AOF 缓冲数据刷新到磁盘，以及清理对象这三个任务队列。",-1),h=e("p",null,"Redis 在启动时，会同时启动这三个 BIO 线程，然后 BIO 线程休眠等待任务。当需要执行相关类型的后台任务时，就会构建一个 bio_job 结构，记录任务参数，然后将 bio_job 追加到任务队列尾部。然后唤醒 BIO 线程，即可进行任务执行。",-1),n=e("h6",{id:"redis-持久化",tabindex:"-1"},[s("Redis 持久化 "),e("a",{class:"header-anchor",href:"#redis-持久化","aria-label":'Permalink to "Redis 持久化"'},"​")],-1),m=e("p",null,"Redis 的持久化是通过 RDB 和 AOF 文件进行的。RDB 只记录某个时间点的快照，可以通过设置指定时间内修改 keys 数的阀值，超过则自动构建 RDB 内容快照，不过线上运维，一般会选择在业务低峰期定期进行。RDB 存储的是构建时刻的数据快照，内存数据一旦落地，不会理会后续的变更。而 AOF，记录是构建整个数据库内容的命令，它会随着新的写操作不断进行追加操作。由于不断追加，AOF 会记录数据大量的中间状态，AOF 文件会变得非常大，此时，可以通过 bgrewriteaof 指令，对 AOF 进行重写，只保留数据的最后内容，来大大缩减 AOF 的内容。",-1),u=t("",11);function A(b,k,v,O,g,B){const a=l("Image");return r(),o("div",null,[_,i(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/99/ED/CgotOV2lPF-AZ1LCAAEXirWDhew753.png"}),s(),R,i(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/99/ED/CgotOV2lPF-AZtVrAABZ5Cio_aE709.png"}),s(),c,h,n,m,i(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/99/CD/CgoB5l2lPF-AAIcAAAAhBE0bnp4350.png"}),s(),u])}const P=d(p,[["render",A]]);export{y as __pageData,P as default};
